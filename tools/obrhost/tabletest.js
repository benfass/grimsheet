// Handout journal, party stash, combat view and moving a character, in the Owlbear stand-in (GM + two players).
const { chromium } = require('playwright');
const { room, sleep } = require('./room.js');
(async () => {
  const b = await chromium.launch(); const ok = []; const chk = (c, m) => ok.push((c ? 'PASS ' : 'FAIL ') + m);
  const R = await room(b, [{ id: 'g1', name: 'Dana', role: 'GM' }, { id: 'p1', name: 'Ben', role: 'PLAYER' }, { id: 'p2', name: 'Cleo', role: 'PLAYER', viewport: { width: 400, height: 820 } }], {
    init: me => { if (!localStorage.getItem('grimsheet.settings.v1')) localStorage.setItem('grimsheet.settings.v1', JSON.stringify({ diceAnim: false, gmPlays: me.role === 'GM' ? true : null })); } });
  const G = R.seats.g1, P = R.seats.p1, Q = R.seats.p2;
  const dana = await G.panel(), ben = await P.panel(), cleo = await Q.panel();
  for (const f of [dana, ben, cleo]) await f.waitForFunction(() => window.__T && window.__T.OBRX.ready, null, { timeout: 15000 }).catch(() => { });
  await sleep(1500);

  // ---- handout journal
  await dana.click('[data-act=setview][data-v=campaign]'); await sleep(300);
  await dana.click('[data-act=noteadd]'); await sleep(300); await dana.fill('#nd-title', 'Letter from Mara'); await dana.fill('#nd-body', 'Meet me at dawn.');
  await dana.click('[data-act=notesave]'); await sleep(400); await dana.click('[data-act=noteshow]'); await sleep(1800);
  for (const S of [P, Q]) { const hf = await S.pop('com.grimsheet/handout'); await sleep(600); await hf.click('#x'); } await sleep(500);
  chk(!(await Q.popover('com.grimsheet/handout')) && !(await P.popover('com.grimsheet/handout')), 'both players got the handout and closed it');
  await ben.click('[data-act=setview][data-v=campaign]'); await sleep(400);
  chk(!!(await ben.$('[data-act=notef][data-v=handouts]')), 'player has a Handouts filter');
  await ben.click('[data-act=notef][data-v=handouts]'); await sleep(300);
  chk((await ben.$$eval('.ncard', x => x.map(n => n.textContent))).some(t => /Letter from Mara/.test(t) && /Handout/.test(t)), 'the handout is listed and marked');
  await ben.click('.ncard [data-act=noteopen]'); await sleep(300);
  await ben.click('[data-act=handoutopen]'); await sleep(1200);
  const pop = await P.popover('com.grimsheet/handout');
  chk(!!pop, 'Open handout reopens the window from the player\'s own panel');
  if (pop) { const f = await P.pop('com.grimsheet/handout'); await sleep(700); chk((await f.textContent('#title')) === 'Letter from Mara', 'window shows it'); await f.click('#x'); }
  chk(!(await G.popover('com.grimsheet/handout')), 'reopening is only on that screen');

  // ---- party stash
  await ben.click('[data-act=setview][data-v=sheet]'); await sleep(400);
  await ben.click('[data-act=stashopen]'); await sleep(400);
  const items = await ben.$$eval('[data-act=stashput]', x => x.map(b => b.closest('.list-i').querySelector('b').textContent));
  chk(items.length > 0, 'Ben can put in: ' + items.slice(0, 4).join(', '));
  const putName = items[0].replace(/^\d+ × /, '');
  const qtyBefore = await ben.evaluate(n => window.__T.C().modules.flatMap(m => m.entries).find(e => e.name === n).item.qty, putName);
  await ben.click('[data-stashput] summary'); await sleep(200);
  await ben.locator('[data-act=stashput]').first().click(); await sleep(900);
  let st = R.world.state.room['com.grimsheet/stash'];
  chk(st && st.items.some(i => i.e.name === putName && i.qty === 1), 'item is in the room stash');
  const qtyAfter = await ben.evaluate(n => { const e = window.__T.C().modules.flatMap(m => m.entries).find(e => e.name === n); return e ? e.item.qty : 0; }, putName);
  chk(qtyAfter === qtyBefore - 1, 'and left Ben\'s sheet (' + qtyBefore + ' → ' + qtyAfter + ')');
  await ben.evaluate(() => { window.__T.C().currency.gp = 50; window.__T.save(); });
  await ben.fill('#st-gp', '20'); await ben.click('[data-act=stashcoin][data-v=put]'); await sleep(900);
  chk(R.world.state.room['com.grimsheet/stash'].coins.gp === 20 && (await ben.evaluate(() => window.__T.C().currency.gp)) === 30, 'coins moved into the stash');
  // Cleo sees it and takes the item and some coins
  await cleo.click('[data-act=setview][data-v=sheet]').catch(() => { }); await sleep(300);
  await cleo.evaluate(() => window.__T.openModal('stash')); await sleep(400);
  chk((await cleo.textContent('.dlg-b')).includes(putName) && (await cleo.textContent('.dlg-b')).includes('20 gp'), 'Cleo sees the stash');
  await cleo.click('[data-act=stashtake]'); await sleep(900);
  chk((await cleo.evaluate(n => window.__T.C().modules.filter(m => m.type === 'inventory').flatMap(m => m.entries).some(e => e.name === n), putName)), 'taken item is in Cleo\'s inventory');
  chk(!R.world.state.room['com.grimsheet/stash'].items.length, 'and gone from the stash');
  await cleo.fill('#st-gp', '25'); await cleo.click('[data-act=stashcoin][data-v=take]'); await sleep(700);
  chk(R.world.state.room['com.grimsheet/stash'].coins.gp === 20, 'can\'t take more coins than the stash has');
  await cleo.fill('#st-gp', '10'); await cleo.click('[data-act=stashcoin][data-v=take]'); await sleep(900);
  chk(R.world.state.room['com.grimsheet/stash'].coins.gp === 10, 'took 10 gp');
  await sleep(500);
  chk((await ben.textContent('.dlg-b')).includes('10 gp') && /Cleo took/.test(await ben.textContent('.dlg-b')), 'Ben\'s open stash updated by itself, with the log');
  await cleo.click('[data-act=close]'); await ben.click('[data-act=close]');
  const roomBytes = JSON.stringify(R.world.state.room).length; chk(roomBytes < 16384, 'room data ' + roomBytes + ' bytes');

  // ---- combat view on Cleo's narrow panel
  await cleo.click('[data-act=setview][data-v=combat]'); await sleep(400);
  chk(!!(await cleo.$('.cv')), 'combat view opens');
  const hp0 = await cleo.evaluate(() => window.__T.C().hp.cur);
  await cleo.fill('#cv-amt', '5'); await cleo.click('[data-act=cvhp][data-v=dmg]'); await sleep(500);
  chk((await cleo.evaluate(() => window.__T.C().hp.cur)) === hp0 - 5, 'damage from the combat view');
  const atk = await cleo.$('.cv-list [data-act=atk]');
  if (atk) { await atk.click(); await sleep(700); }
  chk(!!atk, 'attack buttons in the combat view');
  await Q.page.screenshot({ path: (process.env.SHOTS || require('os').tmpdir()) + '/cv-owlbear.png' });

  // ---- move a character: Ben copies his to the website
  await ben.click('[data-act=modal][data-v=chars]'); await sleep(300);
  await ben.click('[data-act=xferopen]'); await sleep(800);
  const link = await ben.getAttribute('a[data-act=xferdone]', 'href');
  chk(/#take=[A-Za-z0-9_-]{200,}$/.test(link || ''), 'website link carries the character (' + (link || '').length + ' chars)');
  const code = await ben.evaluate(() => window.__T.ui.modal.code);
  const name = await ben.evaluate(() => window.__T.C().name);
  const web = await P.ctx.newPage(); await web.goto(link); await sleep(1500);
  chk((await web.textContent('.dlg-h')).includes('Add this character'), 'website asks to add it');
  await web.click('[data-act=takechar][data-v=copy]'); await sleep(400);
  chk((await web.evaluate(() => window.__T.C().name)) === name && !/#take/.test(web.url()), 'added on the website as ' + name);
  // and a code pasted into Import in another room (Cleo's panel)
  await cleo.evaluate(() => window.__T.openModal('import')); await sleep(300);
  await cleo.fill('#imp-text', code); await cleo.click('[data-act=doimport]'); await sleep(800);
  chk((await cleo.textContent('.dlg-h')).includes('Add this character'), 'Import takes the code');
  await cleo.click('[data-act=takechar]'); await sleep(400);
  chk((await cleo.evaluate(() => window.__T.C().name)) === name, 'Cleo now has ' + name);
  await cleo.evaluate(() => window.__T.openModal('import')); await sleep(300); await cleo.fill('#imp-text', code.slice(0, 200)); await cleo.click('[data-act=doimport]'); await sleep(600);
  chk(/cut short/.test(await cleo.textContent('#imp-err')), 'a cut-off code is explained');

  chk(R.problems.length === 0, 'no request refused' + (R.problems.length ? ': ' + JSON.stringify(R.problems.slice(0, 4)) : ''));
  console.log(ok.join('\n')); console.log('ERRORS', JSON.stringify(ok.filter(x => x.startsWith('FAIL')).concat(R.errors)));
  await b.close();
})();
