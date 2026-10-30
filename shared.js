/* Grimsheet helpers shared by background.html and gm.html (the panel keeps its own copy). */
window.GS = (function () {
  const GS = {
    VERSION: '1.28.0',
    CH_ROLL: 'com.grimsheet/roll',
    CH_GM: 'com.grimsheet/gm',        // GM ↔ player: hp changes, sheet requests and replies
    CH_LOCAL: 'com.grimsheet/local',  // same browser: GM menu → GM panel
    LINK: 'com.grimsheet/link',
    META: 'com.grimsheet/status',
    BUBBLES: 'com.owlbear-rodeo-bubbles-extension/metadata',
    STORE: 'grimsheet.v1', STATUS: 'grimsheet.status.v1', BG: 'grimsheet.bg.v1',
  };
  GS.read = k => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } };
  GS.write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } };
  GS.uid = () => Math.random().toString(36).slice(2, 10);
  GS.esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // Damage takes temporary HP first; healing from 0 HP clears death saves.
  GS.applyHp = (ch, amount) => {
    const hp = ch.hp, before = hp.cur;
    let text;
    if (amount < 0) {
      let d = -amount; const fromTemp = Math.min(hp.temp || 0, d);
      hp.temp = (hp.temp || 0) - fromTemp; d -= fromTemp; hp.cur = Math.max(0, hp.cur - d);
      text = `${-amount} damage${fromTemp ? ' (' + fromTemp + ' from temp HP)' : ''}`;
    } else {
      hp.cur = Math.min(hp.max, hp.cur + amount);
      if (before <= 0 && hp.cur > 0) ch.death = { s: 0, f: 0 };
      text = `${hp.cur - before} healing`;
    }
    return { text, hp: hp.cur, max: hp.max, temp: hp.temp || 0 };
  };

  // Sheets are sent gzipped and base64-encoded, in parts that stay under Owlbear's 16 kB message limit.
  GS.pack = async obj => {
    const bytes = new TextEncoder().encode(JSON.stringify(obj));
    const gz = new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new CompressionStream('gzip'))).arrayBuffer());
    let s = ''; for (let i = 0; i < gz.length; i += 0x8000) s += String.fromCharCode.apply(null, gz.subarray(i, i + 0x8000));
    return btoa(s);
  };
  GS.unpack = async b64 => {
    const bin = atob(b64), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    const txt = await new Response(new Blob([u]).stream().pipeThrough(new DecompressionStream('gzip'))).text();
    return JSON.parse(txt);
  };
  // attacks waiting for the GM: an attack roll and its damage roll share one id (same as the panel's mergeAttack)
  GS.sumDamage = parts => {
    const ps = Object.entries(parts);
    if (ps.length === 1) { const [w, p] = ps[0]; return Object.assign({}, p, { srcs: [{ what: w === '_' ? '' : w, total: p.total }] }); }
    const byType = {}; let typed = true;
    for (const [, p] of ps) { if (p.byType) for (const [t, v] of Object.entries(p.byType)) byType[t] = (byType[t] || 0) + v; else if (p.types && !p.types.includes(',')) byType[p.types] = (byType[p.types] || 0) + p.total; else typed = false; }
    return { total: ps.reduce((n, [, p]) => n + p.total, 0), types: [...new Set(ps.flatMap(([, p]) => (p.types || '').split(', ').filter(Boolean)))].join(', '), crit: ps.some(([, p]) => p.crit), heal: ps.every(([, p]) => p.heal), rr: ps.map(([, p]) => p.rr).filter(Boolean).join(' · '), byType: typed ? byType : null, srcs: ps.map(([w, p]) => ({ what: w === '_' ? '' : w, total: p.total })) };
  };
  GS.mergeAttack = (list, d) => {
    let c = list.find(x => x.id === d.id);
    if (!c) { c = { id: d.id, from: d.from, who: d.who, attacker: d.attacker, target: d.target, atk: null, dmg: null, save: null, verdict: null }; list.unshift(c); }
    if (d.part === 'area') { c.kind = 'area'; Object.assign(c, { name: d.name, areaLabel: d.areaLabel, itemId: d.itemId, half: !!d.half, keep: !!d.keep, heal: !!d.heal, targets: d.targets || [], excl: d.excl || [], res: c.res || {}, asked: c.asked || {} }); }
    else if (d.part === 'atk') c.atk = { total: d.total, nat: d.nat, crit: !!d.crit, fumble: !!d.fumble, mode: d.mode || 'normal', rr: d.rr || '' };
    else {
      const one = { total: d.total, types: d.types || '', crit: !!d.isCrit, heal: d.part === 'heal', rr: d.rr || '', byType: d.byType || null };
      if (!d.what) c.dparts = {}; c.dparts = c.dparts || {}; c.dparts[d.what || '_'] = one;
      c.dmg = GS.sumDamage(c.dparts);
    }
    if (d.what) { if (d.part === 'atk' || !c.what) c.what = d.what; }
    if (d.key && d.part === 'atk') c.key = d.key; if (d.dmgF) c.dmgF = d.dmgF;
    if (d.save) c.save = d.save;
    if (d.srcMon) c.srcMon = d.srcMon;
    if (d.dist) { c.dist = d.dist; c.range = d.range || ''; c.rangeOk = d.rangeOk; }
    c.at = Date.now();
    return list.slice(0, 30);
  };
  // a player's answer to the GM's request for a saving throw (same as the panel's mergeSaveRes)
  GS.mergeSaveRes = (list, d) => {
    const c = list.find(x => x.id === d.aid); if (!c || !c.save) return list;
    c.res = c.res || {};
    for (const t of c.targets || []) if (t.player === d.from && (!d.char || !t.char || t.char === d.char)) c.res[t.id] = d.total === -99 ? { total: '—', ok: false, by: 'player', note: 'automatic failure' } : { total: d.total, ok: c.save.dc === '' || c.save.dc == null ? null : d.total >= +c.save.dc, nat: d.nat, by: 'player' };
    return list;
  };
  // campaign notes (same rules as the panel): newest edit wins, deletions are remembered
  GS.CAMP = 'grimsheet.campaign.v1'; GS.CH_NOTES = 'com.grimsheet/notes';
  GS.mergeNote = (c, n) => {
    if (!n || !n.id) return false;
    if (c.gone[n.id] && c.gone[n.id] >= n.updated) return false;
    const i = c.notes.findIndex(x => x.id === n.id);
    if (i >= 0 && c.notes[i].updated >= n.updated) return false;
    if (i >= 0) c.notes[i] = n; else c.notes.push(n);
    return true;
  };
  GS.dropNote = (c, id, at) => { c.notes = c.notes.filter(x => x.id !== id || x.updated > at); c.gone[id] = Math.max(c.gone[id] || 0, at); };
  // encounters: one room keeps several (the active one and prepared ones); same as the panel's encRoomOf
  GS.ENCKEY = 'grimsheet.encounter.v1';
  GS.blankEnc = () => ({ tpls: {}, mons: [], pcs: [], groupInit: {}, seq: {}, combat: { active: false, round: 1, turn: null } });
  GS.encRoom = (all, room) => {
    let r = all[room];
    if (!r || !r.multi) { const e = r && r.mons ? r : GS.blankEnc(); e.id = e.id || GS.uid(); e.name = e.name || 'Encounter 1'; r = { multi: 1, active: e.id, order: [e.id], list: { [e.id]: e } }; all[room] = r; }
    r.order = (r.order || []).filter(id => r.list[id]); Object.keys(r.list).forEach(id => { if (!r.order.includes(id)) r.order.push(id); });
    if (!r.list[r.active]) r.active = r.order[0];
    return r;
  };
  GS.encFind = (r, inst) => { for (const e of Object.values(r.list)) { const m = (e.mons || []).find(x => x.id === inst); if (m) return { e, m }; } return null; };
  // room homebrew (same rules as the panel): the GM's pack and players' copies live under HB[room];
  // entries added to a sheet remember where they came from (e.hb = {id, v}) so GM updates can be offered
  GS.HB = 'grimsheet.homebrew.v1'; GS.CH_HB = 'com.grimsheet/homebrew';
  GS.HB_MOD = { item: 'inventory', spell: 'spells', feature: 'features', attack: 'attacks', creature: 'companions' };
  GS.HB_TITLE = { inventory: 'Inventory', spells: 'Spells', features: 'Features & Traits', attacks: 'Attacks', companions: 'Companions' };
  GS.hbKind = e => e.spell ? 'spell' : e.creature ? 'creature' : e.item ? 'item' : e.attack ? 'attack' : 'feature';
  GS.hbPrep = src => { const e = JSON.parse(JSON.stringify(src.e)); e.id = GS.uid(); e.hb = { id: src.id, v: src.updated }; if (e.counter) e.counter.used = 0; return e; };
  GS.hbPlace = (ch, e) => {
    const t = GS.HB_MOD[GS.hbKind(e)];
    let m = (ch.modules || []).find(x => x.type === t && !(ch.hidden || []).includes(x.id)) || (ch.modules || []).find(x => x.type === t);
    if (!m) { m = { id: GS.uid(), type: t, title: GS.HB_TITLE[t], collapsed: false, wide: false, entries: [] }; ch.modules.push(m); }
    ch.hidden = (ch.hidden || []).filter(x => x !== m.id);
    if (t === 'inventory' && !e.item) e.item = { qty: 1, weight: 0, equipped: false };
    m.entries.push(e); return m;
  };
  GS.hbRoom = (all, room) => { const h = all[room] || { items: [] }; h.items = h.items || []; all[room] = h; return h; };
  GS.hbMerge = (h, it) => { if (!it || !it.id) return false; const i = h.items.findIndex(x => x.id === it.id); if (i >= 0 && h.items[i].updated >= it.updated) return false; if (i >= 0) h.items[i] = it; else h.items.push(it); return true; };
  // the GM's list of what players may see: drop the rest; true when something is missing or newer
  GS.hbList = (h, list) => { const m = new Map(list || []); h.items = h.items.filter(x => m.has(x.id)); return [...m].some(([id, at]) => { const x = h.items.find(y => y.id === id); return !x || x.updated < at; }); };
  // players' characters kept by the GM (same as the panel's mergePcb): newest copy per player and character
  GS.PCB = 'grimsheet.pcbackup.v1'; GS.CH_BK = 'com.grimsheet/backup';
  GS.mergePcb = (all, room, d) => {
    const r = all[room] = all[room] || {}, p = r[d.from] = r[d.from] || { owner: d.owner || '', chars: {} };
    p.owner = d.owner || p.owner; const old = p.chars[d.charId];
    if (old && old.changedAt >= d.changedAt) return false;
    p.chars[d.charId] = { name: d.name, cls: d.cls || '', level: d.level || '', changedAt: d.changedAt, data: d.data, at: Date.now() };
    return true;
  };
  GS.chunks = (s, n = 12000) => { const out = []; for (let i = 0; i < s.length; i += n) out.push(s.slice(i, i + n)); return out.length ? out : ['']; };
  GS.load = src => new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
  GS.sdk = async () => { if (window.GrimsheetOBR) return window.GrimsheetOBR; await GS.load('vendor/owlbear-sdk-3.1.0.js'); return window.OwlbearSDK; };
  return GS;
})();
