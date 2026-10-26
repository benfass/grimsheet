/* Grimsheet helpers shared by background.html and gm.html (the panel keeps its own copy). */
window.GS = (function () {
  const GS = {
    VERSION: '1.3.0',
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
  GS.chunks = (s, n = 12000) => { const out = []; for (let i = 0; i < s.length; i += n) out.push(s.slice(i, i + n)); return out.length ? out : ['']; };
  GS.load = src => new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
  GS.sdk = async () => { if (window.GrimsheetOBR) return window.GrimsheetOBR; await GS.load('vendor/owlbear-sdk-3.1.0.js'); return window.OwlbearSDK; };
  return GS;
})();
