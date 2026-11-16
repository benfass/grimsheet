/* Test driver for the Owlbear stand-in: puts several players in one room.
   const R = await room(browser, [{ id: 'g1', name: 'Dana', role: 'GM' }, { id: 'p1', name: 'Ben', role: 'PLAYER' }]);
   R.seats.g1.page is that player's "Owlbear" (obrhost.html); .panel() / .bg() / .pop(id) / .embed() are Grimsheet's own
   pages inside it, running on the real Owlbear SDK. R.problems lists every request the stand-in refused. */
const W = require('./world.js');
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function room(browser, seats, opt = {}) {
  const base = opt.base || 'http://localhost:8794/', world = W.createWorld(opt.world);
  const R = { world, seats: {}, problems: [], errors: [], sleep };
  const assets = R.assets = {}; let assetN = 0;
  const deliver = async events => { for (const e of events) for (const s of Object.values(R.seats)) { const mine = e.to === '*' || e.to === s.id || (e.to[0] === '!' && e.to.slice(1) !== s.id); if (mine && s.page && !s.page.isClosed()) await s.page.evaluate(x => window.__obrEvent && window.__obrEvent(x), { ev: e.ev, data: e.data }).catch(() => { }); } };
  R.deliver = deliver;
  // act on the room as if another client did it (a token dropped on the map, say)
  R.act = async (seat, id, data) => { const r = world.handle(seat, id, data); await deliver(r.events); return r.result; };
  const text = () => ({ richText: [{ type: 'paragraph', children: [{ text: '' }] }], plainText: '', style: { padding: 8, fontFamily: 'Roboto', fontSize: 24, fontWeight: 400, textAlign: 'CENTER', textAlignVertical: 'BOTTOM', fillColor: 'white', fillOpacity: 1, strokeColor: 'white', strokeOpacity: 1, strokeWidth: 0, lineHeight: 1.5 }, type: 'PLAIN', width: 'AUTO', height: 'AUTO' });
  R.token = (id, name, x, y, more = {}) => Object.assign({ id, type: 'IMAGE', name, visible: true, locked: false, createdUserId: seats[0].id, zIndex: Date.now(), lastModified: new Date().toISOString(), lastModifiedUserId: seats[0].id, position: { x, y }, rotation: 0, scale: { x: 1, y: 1 }, metadata: {}, layer: 'CHARACTER',
    image: { width: 300, height: 300, mime: 'image/png', url: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><circle cx="150" cy="150" r="140" fill="#456"/></svg>') }, grid: { dpi: 300, offset: { x: 150, y: 150 } }, text: text(), textItemType: 'LABEL' }, more);
  for (const s of seats) {
    const ctx = await browser.newContext({ viewport: s.viewport || opt.viewport || { width: 1300, height: 900 } });
    await ctx.route('https://fonts.googleapis.com/**', r => r.fulfill({ body: '', contentType: 'text/css' }));
    if (opt.init) await ctx.addInitScript(opt.init, s);
    await ctx.exposeBinding('__obrWorld', async (src, json) => { const m = JSON.parse(json); try { const r = world.handle(m.seat, m.id, m.data); await deliver(r.events); return JSON.stringify({ result: r.result }); } catch (e) { return JSON.stringify({ error: String(e.message || e) }); } });
    await ctx.exposeBinding('__obrAsset', (src, dataUrl) => { const m = /^data:([^;,]+)(;base64)?,(.*)$/s.exec(dataUrl), id = 'a' + (++assetN); assets[id] = { mime: m[1], body: m[2] ? Buffer.from(m[3], 'base64') : Buffer.from(decodeURIComponent(m[3])) }; return base + 'obrasset/' + id; });
    await ctx.route('**/obrasset/*', r => { const a = assets[r.request().url().split('/').pop()]; return a ? r.fulfill({ body: a.body, contentType: a.mime }) : r.fulfill({ status: 404, body: '' }); });
    await ctx.exposeBinding('__obrProblem', (src, json) => { R.problems.push(JSON.parse(json)); });
    const page = await ctx.newPage(); page.on('pageerror', e => R.errors.push(s.id + ': ' + e.message));
    const seat = R.seats[s.id] = { id: s.id, ctx, page };
    const fr = async sel => { const h = await page.waitForSelector(sel, { state: 'attached', timeout: opt.timeout || 8000 }); return h.contentFrame(); };
    seat.panel = () => fr('#f-action'); seat.bg = () => fr('#f-background'); seat.embed = () => fr('#ctx iframe');
    seat.pop = id => fr('#f-popover-' + id.replace(/[^\w-]/g, '_'));
    seat.host = (fn, arg) => page.evaluate(fn, arg);
    seat.popover = id => page.evaluate(id => { const p = window.host.popovers[id]; return p ? { opts: p.opts, rect: p.rect, fits: p.fits, moved: p.moved } : null; }, id);
    await deliver(world.join(s));
    await page.goto(base + 'obrhost.html?' + new URLSearchParams(Object.assign({ seat: s.id, name: s.name, role: s.role }, s.query || {})));
  }
  R.close = async () => { for (const s of Object.values(R.seats)) await s.ctx.close(); };
  return R;
}
module.exports = { room, sleep };
