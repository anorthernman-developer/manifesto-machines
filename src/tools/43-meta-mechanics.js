/*META
{"title":"Für Statik","idea":"A rickety machine of meshing gears: each gear's teeth strike notes, so the gear ratios become polyrhythms, and the machine wobbles because nothing stays still.","how":"Press PLAY. The motor (red) drives a chain of meshing gears. A gear with more teeth turns more slowly, so the ratios between gears create polyrhythms. Every tooth that passes the striker at the top of a gear plays that gear's sound (the big gears play your sample). Click a gear to change its number of teeth. ADD GEAR attaches another to the chain and CRANK sets the motor speed. WOBBLE makes the machine rickety, with loose teeth and slipping timing, because, as Tinguely said, nothing stays still.","fonts":"family=Archivo+Black&family=Archivo:wght@400","bpm":100,
"manifesto":{"name":"Für Statik (For Statics)","short":"Für Statik","author":"Jean Tinguely","year":"1959","where":"leaflets thrown from an aeroplane over Düsseldorf in March 1959","ideas":["Everything moves; stillness does not exist. Stop resisting change and be in time with the moment.","Art as moving, noisy machines (méta-mécaniques), often made of scrap.","Machines that break and even destroy themselves, as in Homage to New York at MoMA (1960)."],"quotes":["Everything moves continuously. Immobility does not exist."],"system":"There is no grid and no pattern, only rotating gears whose ratios produce rhythm. With WOBBLE on, the machine slips and rattles like one of Tinguely's scrap machines."},
"design":{"name":"Armin Hofmann","short":"Armin Hofmann","who":"Armin Hofmann, Swiss designer and teacher at the Basel School of Design","era":"Basel, 1950s to 1980s","hallmarks":["Black and white contrast with very few elements","Dot, line and form studies, with dynamic tension between shapes","Sans type (often Akzidenz or Univers) and a clear hierarchy"],"works":["Graphic Design Manual: Principles and Practice (1965)","Giselle poster for the Basel Freilichtspiele (1959)","Posters for the Basel Stadttheater (1960s)"]}}
*/
/*CSS
:root{--bg:#fff;--fg:#000;--acc:#e30613;--bar-font:'Archivo',sans-serif;--head-font:'Archivo Black',sans-serif}
#mm-stage{background:#fff;overflow:hidden}#cv{position:absolute;inset:0;width:100%;height:100%;cursor:pointer}
.t{position:absolute;left:30px;bottom:22px;font:400 120px/.8 'Archivo Black';color:#000;pointer-events:none;letter-spacing:-.04em}.t span{color:#e30613}
.c{position:absolute;right:30px;top:24px;display:flex;flex-direction:column;gap:8px;width:200px;font:400 12px 'Archivo'}
.c button{font:400 15px 'Archivo Black';background:#000;color:#fff;border:0;padding:8px;cursor:pointer}.c button.on{background:#e30613}
*/
/*HTML
<canvas id="cv"></canvas><div class="t">für<br>stat<span>ik</span></div>
<div class="c">CRANK<input id="cr" type="range" min="0.2" max="3" step="0.01" value="1"><button id="add">ADD GEAR</button><button id="wob">WOBBLE</button></div>
*/
let G = [], crank = 1, wob = false, last = 0;
const TEETH = [8, 12, 16, 6, 10, 20, 5, 14];
function layout() { if (!C) return; let x = 0, y = 0; G.forEach((g, k) => { if (k) { const p = G[k - 1], d = (R(p) + R(g)) * 0.93, a = k % 2 ? 0.45 : -0.45; x += Math.cos(a) * d; y += Math.sin(a) * d; } g.px = x; g.py = y; }); let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9; G.forEach((g) => { x0 = Math.min(x0, g.px - R(g)); x1 = Math.max(x1, g.px + R(g)); y0 = Math.min(y0, g.py - R(g)); y1 = Math.max(y1, g.py + R(g)); }); const ox = C.w * 0.5 - (x0 + x1) / 2, oy = C.h * 0.42 - (y0 + y1) / 2; G.forEach((g) => { g.x = (g.px + ox) / C.w; g.y = (g.py + oy) / C.h; }); }
let C = null;
function addGear(n) { if (G.length >= 7) return MM.toast('The machine is big enough'); G.push({ x: 0.5, y: 0.5, n: n || TEETH[G.length % TEETH.length], ang: 0, lastTooth: 0, f: 0 }); layout(); }
[10, 16, 8, 12].forEach(addGear);
MM.$('#cr').oninput = (e) => (crank = +e.target.value); MM.$('#add').onclick = () => addGear(); MM.$('#wob').onclick = (e) => { wob = !wob; e.target.classList.toggle('on', wob); };
C = MM.canvas('#cv'); function R(g) { const n = G.length || 1; return g.n * Math.min(C.w / (n * 26), C.h * 0.016); }
C.cv.addEventListener('pointerdown', (e) => { const k = G.findIndex((g) => Math.hypot(g.x * C.w - e.offsetX, g.y * C.h - e.offsetY) < R(g)); if (k >= 0) { G[k].n = TEETH[(TEETH.indexOf(G[k].n) + 1) % TEETH.length]; layout(); } });
function strike(g, k, t) { g.f = 1; const pan = g.x * 2 - 1, B = MM.smp(0, 'loop');
  if (g.n >= 14) MM.play(B, t, { offset: (g.lastTooth % g.n) / g.n * B.duration, dur: 0.18, gain: 0.55, rate: 12 / g.n, pan, fadeOut: 0.04 });
  else if (k === 0) MM.play(MM.fb.kick, t, { gain: 0.7 });
  else if (g.n <= 6) MM.noise(t, 0.03, { freq: 3500, q: 5, gain: 0.25, pan });
  else MM.tone(MM.mtof(MM.deg(g.n % 7 + (g.lastTooth % 3), 'minpent', 52)), t, 0.25, { type: 'square', gain: 0.07, cutoff: 1800, pan }); if (wob && Math.random() < 0.15) MM.noise(t + 0.02, 0.05, { freq: 900, q: 2, gain: 0.15, pan }); }
MM.init({ bpm: 100, div: 4,
  start() { last = MM.now; },
  tick(now) { const dt = Math.min(0.1, now - last); last = now; let w = crank * 1.6; // motor angular speed (rad/s) for gear 0
    G.forEach((g, k) => { if (k) w = -w * (G[k - 1].n / g.n); const slip = wob ? 1 + Math.sin(now * 3 + k) * 0.15 : 1; g.ang += w * dt * slip; const tooth = Math.floor(Math.abs(g.ang) / (Math.PI * 2 / g.n)); if (tooth !== g.lastTooth) { g.lastTooth = tooth; if (!(wob && Math.random() < 0.12)) strike(g, k, now + 0.03 + (wob ? Math.random() * 0.03 : 0)); } }); },
  draw() { C.fit(); layout(); const g = C.g, w = C.w, h = C.h; g.fillStyle = '#fff'; g.fillRect(0, 0, w, h);
    G.forEach((ge, k) => { const x = ge.x * w + (wob ? Math.sin(performance.now() / 40 + k) * 2 : 0), y = ge.y * h, r = R(ge); g.save(); g.translate(x, y); g.rotate(ge.ang); g.fillStyle = k === 0 ? '#e30613' : '#000'; g.beginPath(); for (let q = 0; q < ge.n * 2; q++) { const a = (q / (ge.n * 2)) * Math.PI * 2, rr = q % 2 ? r * 0.86 : r; g.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } g.fill(); g.fillStyle = '#fff'; g.beginPath(); g.arc(0, 0, r * 0.55, 0, 7); g.fill(); g.fillStyle = k === 0 ? '#e30613' : '#000'; g.beginPath(); g.arc(0, 0, r * 0.12, 0, 7); g.fill(); g.fillRect(-r * 0.04, -r * 0.55, r * 0.08, r * 1.1); g.restore();
      g.fillStyle = ge.f > 0.1 ? '#e30613' : '#000'; g.fillRect(x - 3, y - r - 16 - ge.f * 8, 6, 14); ge.f *= 0.85; g.font = "400 12px 'Archivo'"; g.fillText(ge.n + ' teeth', x - 20, y + r + 16); }); }
});
