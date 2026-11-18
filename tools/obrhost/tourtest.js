// Every tour step that should show does show (Owlbear stand-in: GM and a player with a full sheet).
const { chromium } = require('playwright');
const { room, sleep } = require('./room.js');
(async () => {
  const b = await chromium.launch(); const ok = []; const chk = (c, m) => ok.push((c ? 'PASS ' : 'FAIL ') + m);
  const R = await room(b, [{ id: 'g1', name: 'Dana', role: 'GM' }, { id: 'p1', name: 'Ben', role: 'PLAYER' }], {
    init: me => { if (!localStorage.getItem('grimsheet.settings.v1')) localStorage.setItem('grimsheet.settings.v1', JSON.stringify({ diceAnim: false, gmPlays: me.role === 'GM' ? false : null })); } });
  const dana = await R.seats.g1.panel(), ben = await R.seats.p1.panel();
  for (const f of [dana, ben]) await f.waitForFunction(() => window.__T && window.__T.OBRX.ready, null, { timeout: 15000 }).catch(() => { });
  await sleep(1000);
  // the GM needs a monster for the monster steps
  await dana.click('[data-act=setview][data-v=encounter]'); await sleep(300); await dana.click('[data-act=addmon]'); await sleep(200); await dana.fill('#am-q', 'goblin'); await sleep(300);
  await dana.click('[data-act=amadd]'); await sleep(300); await dana.click('#ovl [data-act=close]').catch(() => { }); await sleep(300);
  const walk = async (f, key) => {
    await f.evaluate(k => { const x = document.createElement('button'); x.dataset.act = 'tour'; x.dataset.v = k; document.body.appendChild(x); x.click(); x.remove(); }, key); await sleep(400); const seen = [];
    for (let i = 0; i < 30; i++) { const t = await f.textContent('#tour .tour-t').catch(() => null); if (!t || (await f.$('#tour[hidden]'))) break; seen.push(t.split('\n')[0].trim()); const nx = await f.$('#tour [data-tour=next], #tour [data-tour=done]'); if (!nx) break; const done = await nx.getAttribute('data-tour') === 'done'; await nx.click(); await sleep(350); if (done) break; }
    return seen;
  };
  const gm = await walk(dana, 'gm');
  for (const t of ['Tokens for monsters', 'Campaign notes', 'Session packs', 'Backups, homebrew and the stash']) chk(gm.some(x => x.startsWith(t)), 'GM tour shows "' + t + '"');
  console.log('GM:', gm.join(' | '));
  await ben.evaluate(() => { const T = window.__T; if (T.C().simple) { T.C().simple = false; T.save(); T.render(); } }); await sleep(300);
  const pl = await walk(ben, 'player');
  for (const t of ['Your character', 'Combat view']) chk(pl.some(x => x.startsWith(t)), 'player tour shows "' + t + '"');
  const ob = await walk(ben, 'owlbear');
  for (const t of ['Party stash', 'Handouts']) chk(ob.some(x => x.startsWith(t)), 'Owlbear tour shows "' + t + '"');
  console.log('player:', pl.join(' | ')); console.log('owlbear:', ob.join(' | '));
  console.log(ok.filter(Boolean).join('\n')); console.log('ERRORS', JSON.stringify(ok.filter(x => x.startsWith('FAIL')).concat(R.errors)));
  await b.close();
})();
