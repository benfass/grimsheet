// Grimsheet on the real Owlbear SDK, inside the Owlbear stand-in (tools/obrhost): a GM and a player in one room.
const { chromium } = require('playwright');
const { room, sleep } = require('./room.js');
(async () => {
  const b = await chromium.launch(); const ok = []; const chk = (c, m) => ok.push((c ? 'PASS ' : 'FAIL ') + m);
  const R = await room(b, [{ id: 'g1', name: 'Dana', role: 'GM' }, { id: 'p1', name: 'Ben', role: 'PLAYER' }], {
    init: me => { if (!localStorage.getItem('grimsheet.settings.v1')) localStorage.setItem('grimsheet.settings.v1', JSON.stringify({ diceAnim: false, gmPlays: me.role === 'GM' ? true : null })); } });
  const G = R.seats.g1, P = R.seats.p1;
  await sleep(3000);
  const dana = await G.panel(), ben = await P.panel();
  for (const f of [dana, ben]) await f.waitForFunction(() => window.__T && window.__T.OBRX.ready, null, { timeout: 15000 }).catch(() => { });
  chk(await dana.evaluate(() => window.__T.OBRX.ready && window.__T.OBRX.me.role) === 'GM', 'GM panel connected through the real SDK');
  chk(await ben.evaluate(() => window.__T.OBRX.ready && window.__T.OBRX.me.name) === 'Ben', 'player panel connected');
  chk(R.problems.length === 0, 'start-up: no request refused' + (R.problems.length ? ': ' + JSON.stringify(R.problems.slice(0, 4)) : ''));
  const used = await G.host(() => [...new Set(window.host.log.map(x => x.id))].length);
  chk(used > 15, 'start-up used ' + used + ' kinds of Owlbear request');

  // a token on the map; the player links it from the right-click menu
  await R.act('g1', 'OBR_SCENE_ITEMS_ADD_ITEMS', { items: [R.token('T1', 'Brick token', 450, 450), R.token('G1', 'g', 750, 450), R.token('G2', 'g', 900, 450)] });
  await sleep(500);
  const menu = await P.host(() => window.host.menuFor(['T1']));
  chk(menu.some(m => /link/.test(m.id)), 'player is offered: ' + menu.map(m => m.label).join(' / '));
  const linkId = (menu.find(m => /menu-link$/.test(m.id)) || menu.find(m => /link/.test(m.id)) || {}).id;
  await P.host(id => window.host.clickMenu(id, ['T1']), linkId); await sleep(1500);
  const t1 = R.world.state.items.find(i => i.id === 'T1');
  chk(Object.keys(t1.metadata).some(k => /grimsheet/.test(k)), 'token linked: ' + Object.keys(t1.metadata).join(', '));

  // GM: monsters from the embedded menu, then a token for one from the image picker
  const gmMenu = await G.host(() => window.host.menuFor(['G1', 'G2']));
  const emb = gmMenu.find(m => m.embed);
  chk(!!emb, 'GM is offered the embedded menu: ' + gmMenu.map(m => m.label).join(' / '));
  await G.host(() => window.host.select(['G1', 'G2'])); await G.host(id => window.host.clickMenu(id, ['G1', 'G2']), emb.id); await sleep(900);
  const ef = await G.embed(); await ef.fill('#q', 'gob'); await sleep(300); await ef.click('[data-mon="srd:goblin"]'); await sleep(1200);
  await G.host(() => window.host.closeMenu());
  await dana.click('[data-act=setview][data-v=encounter]'); await sleep(600);
  await dana.click('[data-act=addmon]'); await sleep(200); await dana.fill('#am-q', 'minot'); await sleep(300);
  const mid = await dana.evaluate(() => (document.querySelector('[data-act=amadd]') || {}).dataset.id);
  await dana.click(`[data-act=amadd][data-id="${mid}"]`); await sleep(300); await dana.click('#ovl [data-act=close]').catch(() => { }); await sleep(300);
  await G.host(() => { window.host.pick = 'Minotaur'; });
  const before = R.world.state.items.length;
  await dana.locator('[data-act=montokquick]').last().click(); await sleep(400);
  await dana.click('[data-act=montokpick]'); await sleep(500); await dana.click('[data-act=montokgo]'); await sleep(1500);
  const tok = R.world.state.items.slice(before).find(i => i.type === 'IMAGE');
  chk(!!tok && tok.layer === 'CHARACTER', 'monster token added to the scene and accepted' + (tok ? ': ' + tok.name + ', ' + (tok.image.width / tok.grid.dpi * tok.scale.x) + ' squares' : ''));
  chk((await G.host(() => window.host.lastPicker)).typeHint === 'CHARACTER', 'picker asked for character images');

  // notes: picture from the image picker, an upload, Show to players
  await G.host(() => { window.host.pick = 'Old map'; });
  await dana.click('[data-act=setview][data-v=campaign]'); await sleep(300);
  await dana.click('[data-act=noteadd]'); await sleep(300);
  await dana.click('[data-act=ndpick]'); await sleep(600);
  chk(!!(await dana.$('#nd-drop img')), 'picker opens for a note with no title yet (Owlbear refuses an empty search)');
  await dana.click('[data-act=ndpicx]'); await sleep(200);
  await dana.fill('#nd-title', 'The Map'); await dana.fill('#nd-body', 'X marks it.');
  await dana.click('[data-act=ndpick]'); await sleep(600);
  chk(!!(await dana.$('#nd-drop img')), 'note picture chosen in Owlbear\'s picker');
  const fc = G.page.waitForEvent('filechooser', { timeout: 4000 }).catch(() => null);
  await dana.click('[data-act=ndup]'); const ch = await fc;
  if (ch) { await G.host(() => { window.host.pick = 0; }); await ch.setFiles(__dirname + '/sample.png'); await sleep(1500); }
  const ups = await G.host(() => window.host.uploads);
  chk(ups.length === 1 && ups[0].name === 'The Map', 'upload reached Owlbear and was accepted: ' + JSON.stringify(ups));
  chk(/obrasset/.test(await dana.evaluate(() => (document.querySelector('#nd-drop img') || {}).src || '')), 'uploaded picture is on the note');
  await dana.click('[data-act=notesave]'); await sleep(500);
  await dana.click('[data-act=noteshow]'); await sleep(1800);
  const pop = await P.popover('com.grimsheet/handout');
  chk(!!pop && pop.fits && !pop.moved && Math.abs(pop.rect.left + pop.rect.width / 2 - 650) < 2, 'handout window opened in the middle of the player\'s screen: ' + JSON.stringify(pop && pop.rect));
  chk(!(await G.popover('com.grimsheet/handout')), 'not on the GM\'s screen');
  if (pop) { const hf = await P.pop('com.grimsheet/handout'); await sleep(900); chk((await hf.textContent('#title')) === 'The Map' && !!(await hf.$('#body img.pic')), 'the handout page itself loaded and shows the note');
    await P.page.screenshot({ path: (process.env.SHOTS || require('os').tmpdir()) + '/host-player.png' });
    await hf.click('#x'); await sleep(500); chk(!(await P.popover('com.grimsheet/handout')), 'closing it closes the Owlbear popover'); }
  await G.page.screenshot({ path: (process.env.SHOTS || require('os').tmpdir()) + '/host-gm.png' });
  chk(R.problems.length === 0, 'whole run: no request refused' + (R.problems.length ? ': ' + JSON.stringify(R.problems.slice(0, 5)) : ''));

  // a request Owlbear refuses lands in the debug report
  await dana.evaluate(() => window.__T.OBRX.api.assets.downloadImages(false, 'x', 'TOKEN').catch(() => { })); await sleep(300);
  await dana.evaluate(() => window.__T.openModal('dbg')); await sleep(300);
  const rep = await dana.inputValue('#dbg-text');
  chk(/panel assets\.downloadImages\(false, "x", "TOKEN"\) → typeHint "TOKEN" is not one of/.test(rep), 'debug report has the refused request and the reason');
  chk(R.problems.length === 1 && R.problems[0].id === 'OBR_ASSETS_DOWNLOAD_IMAGES', 'the stand-in refused exactly that one');
  console.log(rep.split('\n').slice(0, 8).join('\n'));
  console.log(ok.join('\n')); console.log('ERRORS', JSON.stringify(ok.filter(x => x.startsWith('FAIL')).concat(R.errors)));
  await b.close();
})();
