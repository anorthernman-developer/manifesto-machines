/*META
{"title":"Mould","idea":"A rigid, straight step grid is slowly overgrown by mould, and wherever the mould spreads, the notes bend, drift and grow organic.","how":"Press PLAY. The sequencer starts as a strict rectilinear grid of notes, perfectly straight and in time. Mould grows over it by itself, cell by cell. A mouldy note slides in pitch, drifts in time, swells and sprouts tiny spores (grains of your sample). Click to plant mould spores yourself, or press INVITE MOULD. RULER is the rationalist's tool: it scrapes everything clean and straight again, which the manifesto would not approve of. Turn the cells on and off by clicking with the right button (or Shift-click).","fonts":"family=Cormorant+Garamond:ital,wght@0,500;1,600&family=Cinzel+Decorative:wght@700","bpm":84,
"manifesto":{"name":"Mould Manifesto against Rationalism in Architecture (Verschimmelungsmanifest)","short":"Mould Manifesto","author":"Friedensreich Hundertwasser","year":"1958","where":"read at Seckau Abbey, Austria, in July 1958","ideas":["The straight line and rationalist, functional architecture are inhuman; he called the straight line godless.","Mould and decay are welcome: let moss and mould grow on the rigid surfaces of buildings, to bring them back to life.","People should be free to change their own walls and windows ('the right to the window')."],"quotes":[],"system":"The grid is rationalism. The mould is life: it grows on its own, bending straight, quantised notes into glides, drifts and swells, while the RULER button shows how dull the clean version is."},
"design":{"name":"Alphonse Mucha","short":"Alphonse Mucha","who":"Alphonse Mucha, Czech artist of Art Nouveau","era":"Paris and Prague, 1890s to 1910s","hallmarks":["Flowing, organic 'whiplash' lines, hair and vines","Women framed by circular halos and decorative mosaic panels","Soft pastel and gold palettes, with ornamental lettering"],"works":["Gismonda poster for Sarah Bernhardt (1894 to 1895)","Job cigarette papers poster (1896)","The Seasons decorative panels (1896)"]}}
*/
/*CSS
:root{--bg:#efe3c8;--fg:#4a3b28;--acc:#6f8f4e;--bar-font:'Cormorant Garamond',serif;--head-font:'Cinzel Decorative',serif}
#mm-stage{background:#efe3c8;overflow:hidden}#cv{position:absolute;inset:0;width:100%;height:100%;cursor:copy}
.t{position:absolute;left:50%;top:14px;transform:translateX(-50%);font:700 34px 'Cinzel Decorative';color:#4a3b28;pointer-events:none;text-align:center}.t small{display:block;font:600 italic 17px 'Cormorant Garamond';color:#6f8f4e}
.b{position:absolute;bottom:18px;right:24px;display:flex;gap:8px}.b button{font:600 italic 18px 'Cormorant Garamond';background:#4a3b28;color:#efe3c8;border:0;border-radius:30px;padding:6px 18px;cursor:pointer}.b #inv{background:#6f8f4e}
*/
/*HTML
<canvas id="cv"></canvas><div class="t">Verschimmelung<small>the mould manifesto · 1958</small></div><div class="b"><button id="inv">invite mould</button><button id="rul">ruler</button></div>
*/
const GW = 16, GH = 8; let on = [], mould = [];
for (let x = 0; x < GW; x++) { on[x] = []; mould[x] = []; for (let y = 0; y < GH; y++) { on[x][y] = (x * 3 + y * 5) % 7 === 0 || (y === 0 && x % 4 === 0); mould[x][y] = 0; } }
[[3, 2], [11, 5], [7, 6]].forEach(([x, y]) => (mould[x][y] = 0.5));
const C = MM.canvas('#cv'); const geo = () => { const m = 60, cw = (C.w - 2 * m) / GW, ch = (C.h - 140) / GH; return { m, cw, ch, top: 80 }; };
function seed(x, y, a) { if (mould[x] && mould[x][y] != null) mould[x][y] = Math.min(1, mould[x][y] + a); }
C.cv.addEventListener('contextmenu', (e) => e.preventDefault());
C.cv.addEventListener('pointerdown', (e) => { const G = geo(), x = Math.floor((e.offsetX - G.m) / G.cw), y = Math.floor((e.offsetY - G.top) / G.ch); if (x < 0 || y < 0 || x >= GW || y >= GH) return; if (e.button === 2 || e.shiftKey) on[x][y] = !on[x][y]; else { seed(x, y, 0.6); [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([a, b]) => seed(x + a, y + b, 0.2)); } });
MM.$('#inv').onclick = () => { for (let k = 0; k < 6; k++) seed(Math.floor(Math.random() * GW), Math.floor(Math.random() * GH), 0.5); };
MM.$('#rul').onclick = () => { mould.forEach((c) => c.fill(0)); MM.toast('Scraped clean. Straight, and lifeless.'); };
function grow() { for (let x = 0; x < GW; x++) for (let y = 0; y < GH; y++) { const m = mould[x][y]; if (m > 0.3) { const nx = x + MM.pick([-1, 1, 0, 0]), ny = y + MM.pick([0, 0, -1, 1]); if (Math.random() < 0.08) seed(nx, ny, 0.12); } if (m > 0) mould[x][y] = Math.min(1, m + 0.01); } if (Math.random() < 0.15) seed(Math.floor(Math.random() * GW), Math.floor(Math.random() * GH), 0.1); }
MM.init({ bpm: 84, div: 4,
  step(i, t, sd) { const x = i % GW; if (x === 0) grow(); const B = MM.smp(0, 'texture');
    for (let y = 0; y < GH; y++) { if (!on[x][y]) continue; const m = mould[x][y], f = MM.mtof(MM.deg(GH - 1 - y, 'major', 55)), tt = t + m * (Math.random() - 0.3) * sd * 0.9;
      MM.tone(f * (1 - m * 0.03), tt, sd * (1 + m * 3), { type: m > 0.3 ? 'sine' : 'square', cutoff: 1200 + m * 1500, gain: 0.07 + m * 0.04, attack: 0.005 + m * 0.25, release: 0.1 + m * 0.8, glide: m > 0.2 ? f * (1 + (Math.random() - 0.5) * m * 0.12) : undefined, send: { rev: m * 0.5 } });
      if (m > 0.4) for (let k = 0; k < Math.round(m * 3); k++) MM.play(B, tt + k * 0.06 + Math.random() * 0.05, { offset: Math.random() * B.duration * 0.9, dur: 0.07, rate: 0.5 + m * 1.5, gain: 0.18 * m, pan: Math.random() * 2 - 1, fadeIn: 0.02, fadeOut: 0.03 }); }
    if (x % 8 === 0) MM.play(B, t, { gain: 0.35, rate: 0.75, fadeOut: 0.3, send: { rev: 0.3 } }); },
  draw(ts) { C.fit(); const g = C.g, w = C.w, h = C.h, G = geo(); g.fillStyle = '#efe3c8'; g.fillRect(0, 0, w, h);
    // Mucha whiplash frame
    g.strokeStyle = '#b89b5e'; g.lineWidth = 2; for (let k = 0; k < 3; k++) { g.beginPath(); for (let x = 0; x <= w; x += 8) g.lineTo(x, 62 + Math.sin(x / 70 + k + ts / 3000) * 8 + k * 5); g.stroke(); g.beginPath(); for (let x = 0; x <= w; x += 8) g.lineTo(x, h - 70 + Math.sin(x / 60 + k - ts / 3000) * 8 + k * 5); g.stroke(); }
    const cur = MM.playing ? Math.floor((MM.S.step || 0)) % GW : -1;
    for (let x = 0; x < GW; x++) for (let y = 0; y < GH; y++) { const m = mould[x][y], X = G.m + x * G.cw, Y = G.top + y * G.ch; g.strokeStyle = 'rgba(74,59,40,.35)'; g.lineWidth = 1; g.strokeRect(X, Y, G.cw, G.ch);
      if (on[x][y]) { g.fillStyle = '#4a3b28'; const r = 2 + m * 6; g.beginPath(); g.roundRect ? g.roundRect(X + 5, Y + 5, G.cw - 10, G.ch - 10, r * 2) : g.rect(X + 5, Y + 5, G.cw - 10, G.ch - 10); g.fill(); }
      if (m > 0) { const rnd = MM.rng(x * 13 + y * 7); for (let k = 0; k < 4 + m * 22; k++) { g.fillStyle = `rgba(${90 + rnd() * 40},${130 + rnd() * 40},${60 + rnd() * 20},${0.35 + m * 0.4})`; g.beginPath(); g.arc(X + rnd() * G.cw, Y + rnd() * G.ch, 3 + rnd() * 12 * m, 0, 7); g.fill(); } } }
    if (cur >= 0) { g.fillStyle = 'rgba(111,143,78,.18)'; g.fillRect(G.m + cur * G.cw, G.top, G.cw, GH * G.ch); } }
});
