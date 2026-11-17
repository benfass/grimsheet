// Session pack import in the Owlbear stand-in: preview, import, re-import updates instead of duplicating.
const { chromium } = require('playwright');
const fs = require('fs'), os = require('os');
const { room, sleep } = require('./room.js');
(async () => {
  const b = await chromium.launch(); const ok = []; const chk = (c, m) => ok.push((c ? 'PASS ' : 'FAIL ') + m);
  const R = await room(b, [{ id: 'g1', name: 'Dana', role: 'GM' }, { id: 'p1', name: 'Ben', role: 'PLAYER' }], {
    init: me => { if (!localStorage.getItem('grimsheet.settings.v1')) localStorage.setItem('grimsheet.settings.v1', JSON.stringify({ diceAnim: false, gmPlays: me.role === 'GM' ? false : null })); } });
  const G = R.seats.g1, P = R.seats.p1, dana = await G.panel(), ben = await P.panel();
  for (const f of [dana, ben]) await f.waitForFunction(() => window.__T && window.__T.OBRX.ready, null, { timeout: 15000 }).catch(() => { });
  await sleep(1000);
  const file = __dirname + '/sample-pack.json', pack = JSON.parse(fs.readFileSync(file, 'utf8'));
  const importFile = async (path) => { await dana.click('[data-act=setview][data-v=campaign]').catch(() => { }); await sleep(300); await (await dana.$('#notes-import')).setInputFiles(path); await sleep(700); };
  await importFile(file);
  const prev = await dana.textContent('#ovl');
  chk(/3 notes/.test(prev) && /1 monster(?!s)/.test(prev) && /1 encounter(?!s)/.test(prev), 'preview lists 3 notes, 1 monster, 1 encounter');
  chk(/Bridge Troll Chief \(CR 5\)/.test(prev) && /1 × Bridge Troll Chief, 3 × Goblin, 2 × Wolf/.test(prev), 'monster read, encounter resolved by pack id, SRD id and name');
  chk(/1 handouts stay hidden/.test(prev), 'handout explained');
  await dana.click('[data-act=packgo]'); await sleep(800);
  const st = await dana.evaluate(() => { const T = window.__T, c = JSON.parse(localStorage.getItem('grimsheet.campaign.v1')); const notes = Object.values(c).flatMap(x => x.notes || []); const enc = JSON.parse(localStorage.getItem('grimsheet.encounter.v1')); const encs = Object.values(enc).flatMap(r => Object.values(r.list || {})); return { notes: notes.map(n => [n.title, n.vis, n.type, n.icon, (n.tags || []).join('|')]), best: JSON.parse(localStorage.getItem('grimsheet.bestiary.v1')).map(t => [t.id, t.name, t.hp, t.ac]), encs: encs.map(e => [e.name, e.mons.map(m => m.name).join(','), !!e.note, e.combat.active]) }; });
  chk(st.notes.length === 3 && st.notes.every(n => n[1] === 'me'), 'notes are GM only: ' + JSON.stringify(st.notes.map(n => n[0])));
  chk(st.notes.some(n => n[0] === 'A sealed letter' && /handout/.test(n[4])), 'handout tagged');
  chk(st.best.some(t => t[1] === 'Bridge Troll Chief' && t[2] === 84 && t[3] === 15), 'chief in the bestiary (84 HP, AC 15)');
  const amb = st.encs.find(e => e[0] === 'Bridge ambush');
  chk(amb && amb[1].split(',').length === 6 && amb[2] && !amb[3], 'encounter with 6 monsters and its GM note, not started: ' + (amb && amb[1]));
  chk((await ben.evaluate(() => Object.values(JSON.parse(localStorage.getItem('grimsheet.campaign.v1') || '{}')).flatMap(x => x.notes || []).length)) === 0, 'player got nothing');
  await dana.click('[data-act=setview][data-v=encounter]'); await sleep(400);
  const tab = await dana.$('[data-act=encsel] >> text=Bridge ambush'); if (tab) { await tab.click(); await sleep(300); }
  chk(/GM notes for this encounter/.test(await dana.textContent('#grid')), 'encounter shows its GM notes');
  await dana.click('[data-act=encnote]'); await sleep(200);
  chk(/Stealth 16/.test(await dana.textContent('.enc-note')), 'GM note opens');
  await G.page.screenshot({ path: (process.env.SHOTS || os.tmpdir()) + '/pack-enc.png' });
  // a revised pack: tougher chief, 4 goblins, an edited NPC
  pack.monsters[0].statblock = pack.monsters[0].statblock.replace('Hit Points 84 (8d10 + 40)', 'Hit Points 110 (10d10 + 55)');
  pack.encounters[0].monsters[1].count = 4; pack.notes[1].body += '\nSecret: she owes the chief money.';
  const f2 = os.tmpdir() + '/pack-v2.json'; fs.writeFileSync(f2, JSON.stringify(pack));
  await importFile(f2);
  chk(/1 already here: updated/.test(await dana.textContent('#ovl')) && /3 already here/.test(await dana.textContent('#ovl')), 'preview says they will be updated');
  await dana.click('[data-act=packgo]'); await sleep(800);
  const st2 = await dana.evaluate(() => { const c = JSON.parse(localStorage.getItem('grimsheet.campaign.v1')); const notes = Object.values(c).flatMap(x => x.notes || []); const enc = JSON.parse(localStorage.getItem('grimsheet.encounter.v1')); const encs = Object.values(enc).flatMap(r => Object.values(r.list || {})); return { notes: notes.map(n => [n.title, n.body]), best: JSON.parse(localStorage.getItem('grimsheet.bestiary.v1')).map(t => [t.name, t.hp]), encs: encs.filter(e => e.name === 'Bridge ambush').map(e => e.mons.map(m => m.name + ':' + m.max).join(',')) }; });
  chk(st2.notes.length === 3 && st2.notes.some(n => /owes the chief/.test(n[1])), 'notes updated, not duplicated');
  chk(st2.best.filter(t => t[0] === 'Bridge Troll Chief').length === 1 && st2.best.find(t => t[0] === 'Bridge Troll Chief')[1] === 110, 'chief updated to 110 HP, one copy');
  chk(st2.encs.length === 1 && st2.encs[0].split(',').length === 7 && /Bridge Troll Chief:110/.test(st2.encs[0]), 'one encounter, now 7 monsters, chief at 110: ' + st2.encs[0]);
  // the handout still works with Show to players
  await dana.click('[data-act=setview][data-v=campaign]'); await sleep(300);
  await dana.click('.ncard:has-text("A sealed letter") [data-act=noteopen]'); await sleep(300);
  await dana.click('.ncard:has-text("A sealed letter") [data-act=noteshow]'); await sleep(1800);
  chk(!!(await P.popover('com.grimsheet/handout')), 'pack handout shows to the player');
  // a broken pack
  fs.writeFileSync(os.tmpdir() + '/pack-bad.json', JSON.stringify({ grimsheetSession: 1, id: 'x', name: 'Bad', monsters: [{ id: 'm', statblock: 'just words' }], encounters: [{ id: 'e', name: 'E', monsters: [{ monster: 'Nobody', count: 2 }] }] }));
  await importFile(os.tmpdir() + '/pack-bad.json');
  const bad = await dana.textContent('#ovl');
  chk(/couldn't be read/.test(bad) && /no monster "Nobody"/.test(bad), 'problems are listed before importing');
  chk(R.problems.length === 0, 'no request refused' + (R.problems.length ? ': ' + JSON.stringify(R.problems.slice(0, 3)) : ''));
  console.log(ok.join('\n')); console.log('ERRORS', JSON.stringify(ok.filter(x => x.startsWith('FAIL')).concat(R.errors)));
  await b.close();
})();
