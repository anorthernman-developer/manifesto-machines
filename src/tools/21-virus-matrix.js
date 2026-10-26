/*META
{"title":"Virus Matrix","idea":"A step grid that is also a living culture: a virus spreads through the pattern each cycle, corrupting the notes it touches.","how":"Press PLAY. Each column is a step and each row is a slice of your sample. Pink cells are healthy notes; green cells are the virus, which plays a mutated, crushed and reversed version of the sound. After every cycle the culture grows: the virus spreads to neighbouring notes and dies after three cycles, and new notes grow back in the gaps. Click to plant notes (click again for the virus, again to clear). INFECT seeds the virus; PATCH heals everything.","fonts":"family=Audiowide&family=Nunito:wght@400;800","bpm":120,
"manifesto":{"name":"A Cyberfeminist Manifesto for the 21st Century","short":"Cyberfeminism","author":"VNS Matrix (Josephine Starrs, Julianne Pierce, Francesca da Rimini, Virginia Barratt)","year":"1991","where":"Adelaide, first shown as a billboard and later in the game-art piece All New Gen (1993)","ideas":["Women hijacking technology from inside, written as a gleeful, bodily, rude text.","The virus as a figure: something inside the system that rewrites it.","Against 'big daddy mainframe': play, saboteurs and slime instead of control."],"quotes":["we are the virus of the new world disorder"],"system":"The pattern is not fixed. A virus lives in it and rewrites it from within, cycle after cycle, so the groove corrupts itself and grows back. You can plant and patch, but you can't stop the culture."},
"design":{"name":"Y2K web aesthetic","short":"Y2K web","who":"The late-1990s and early-2000s look of the web, music videos and electronics","era":"around 1997 to 2004","hallmarks":["Chrome, liquid metal and glossy jelly buttons","Iridescent gradients, lens flares and pixel stars","Wide techno fonts and translucent plastics like the iMac G3"],"works":["Apple iMac G3 in Bondi Blue (1998)","The Designers Republic and Wipeout game graphics (1995 to 1999)","Hype Williams music videos, such as Missy Elliott's The Rain (1997)"]}}
*/
/*CSS
:root{--bg:#c9f1ff;--fg:#14143a;--acc:#ff3fb4;--bar-font:'Nunito',sans-serif;--head-font:'Audiowide',sans-serif}
#mm-stage{background:radial-gradient(circle at 20% 20%,#fff 0,#c9f1ff 25%,#d9c6ff 60%,#9ef7d4 100%);overflow:hidden}
.t{position:absolute;left:30px;top:20px;font:400 54px/1 'Audiowide';background:linear-gradient(180deg,#fff 0,#9aa3b8 45%,#2a2f45 50%,#e8ecf5 100%);-webkit-background-clip:text;color:transparent;-webkit-text-stroke:1px #14143a}
.t small{display:block;font:800 14px 'Nunito';-webkit-text-stroke:0;color:#14143a;letter-spacing:.2em}
#cv{position:absolute;left:30px;right:250px;top:110px;bottom:24px;width:calc(100% - 280px);height:calc(100% - 134px);border-radius:26px;background:rgba(255,255,255,.35);box-shadow:inset 0 2px 12px #fff,0 8px 30px rgba(20,20,60,.25);cursor:pointer}
.side{position:absolute;right:24px;top:110px;width:200px;display:flex;flex-direction:column;gap:14px;font:400 14px 'Nunito'}
.side button{font:400 18px 'Audiowide';border:0;border-radius:30px;padding:14px;cursor:pointer;color:#fff;background:linear-gradient(180deg,#ff9be0 0,#ff3fb4 50%,#c4007f 100%);box-shadow:inset 0 2px 4px #fff8,0 4px 10px #c4007f66}
.side button.g{background:linear-gradient(180deg,#bfffd9 0,#2fd679 50%,#0a8a43 100%)}
#gen{font:400 26px 'Audiowide'}
*/
/*HTML
<div class="t">VIRUS.MATRIX<small>NEW WORLD DISORDER · 1991</small></div><canvas id="cv"></canvas>
<div class="side"><button id="inf" class="g">INFECT</button><button id="pat">PATCH</button><div id="gen">gen 0</div><div id="cnt"></div><div>pink = healthy note<br>green = virus (mutated)<br>the culture grows once per cycle</div></div>
*/
const COLS = 16, ROWS = 8; let G = [], age = [], gen = 0, cur = -1, flash = [];
function reset() { G = Array.from({ length: ROWS }, (_, r) => Array.from({ length: COLS }, (_, c) => (Math.random() < 0.28 ? 1 : 0))); age = G.map((r) => r.map(() => 0)); G[2][5] = 2; G[6][12] = 2; G[0][0] = 1; G[4][8] = 1; flash = G.map((r) => r.map(() => 0)); }
reset();
const C = MM.canvas('#cv');
C.cv.addEventListener('click', (e) => { const r = C.cv.getBoundingClientRect(), c = Math.floor(((e.clientX - r.left) / r.width) * COLS), w = Math.floor(((e.clientY - r.top) / r.height) * ROWS); G[w][c] = (G[w][c] + 1) % 3; age[w][c] = 0; });
MM.$('#inf').onclick = () => { for (let k = 0; k < 3; k++) { const r = Math.floor(Math.random() * ROWS), c = Math.floor(Math.random() * COLS); G[r][c] = 2; age[r][c] = 0; } };
MM.$('#pat').onclick = () => { G = G.map((r) => r.map((v) => (v === 2 ? 1 : v))); };
function grow() { const N = G.map((r) => r.slice()); gen++;
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) { const nb = [[0, 1], [0, -1], [1, 0], [-1, 0]].map(([a, b]) => (G[(r + a + ROWS) % ROWS][(c + b + COLS) % COLS])); const v = nb.filter((x) => x === 2).length, h = nb.filter((x) => x === 1).length;
    if (G[r][c] === 2) { age[r][c]++; if (age[r][c] >= 3) { N[r][c] = 0; age[r][c] = 0; } }
    else if (G[r][c] === 1 && v && Math.random() < 0.35 * v) { N[r][c] = 2; age[r][c] = 0; }
    else if (G[r][c] === 0 && h >= 2 && Math.random() < 0.25) N[r][c] = 1; }
  if (!N.flat().some((x) => x === 2) && Math.random() < 0.5) { N[Math.floor(Math.random() * ROWS)][Math.floor(Math.random() * COLS)] = 2; }
  if (N.flat().filter((x) => x).length < 6) for (let k = 0; k < 8; k++) N[Math.floor(Math.random() * ROWS)][Math.floor(Math.random() * COLS)] = 1; G = N; }
let crush, rev;
MM.init({ bpm: 120, div: 4,
  start() { if (!crush) { crush = MM.crusher(3); const g = MM.ctx.createGain(); g.gain.value = 0.5; crush.connect(g); g.connect(MM.out); } },
  step(i, t, sd) { const c = i % COLS; cur = c; if (c === 0 && i > 0) grow(); const B = MM.smp(0, 'loop'); if (!rev || rev._src !== B) { rev = MM.cloneBuf(B); for (let ch = 0; ch < rev.numberOfChannels; ch++) rev.getChannelData(ch).reverse(); rev._src = B; }
    if (c % 4 === 0) MM.play(MM.fb.kick, t, { gain: 0.6 });
    for (let r = 0; r < ROWS; r++) { const v = G[r][c]; if (!v) continue; flash[r][c] = 1; const off = (r / ROWS) * B.duration;
      if (v === 1) MM.play(B, t, { offset: off, dur: sd * 1.2, gain: 0.5, pan: (r / ROWS - 0.5), fadeOut: 0.02 });
      else { const a = age[r][c]; MM.play(rev, t, { offset: B.duration - off - sd, dur: sd * 0.9, rate: 1 + a * 0.5 + (r % 3) * 0.25, gain: 0.55, dest: crush, pan: -(r / ROWS - 0.5) }); if (a > 0) MM.tone(MM.mtof(48 + r * 3 + a * 7), t, sd * 0.5, { type: 'square', gain: 0.05, cutoff: 5000 }); } } },
  draw(ts) { C.fit(); const g = C.g, w = C.w, h = C.h, cw = w / COLS, ch = h / ROWS; g.clearRect(0, 0, w, h);
    if (MM.playing) { g.fillStyle = 'rgba(255,255,255,.55)'; g.fillRect(cur * cw, 0, cw, h); }
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) { const v = G[r][c], x = c * cw + cw / 2, y = r * ch + ch / 2, R = Math.min(cw, ch) * 0.36 * (1 + flash[r][c] * 0.25); flash[r][c] *= 0.85;
      if (!v) { g.fillStyle = 'rgba(20,20,58,.12)'; g.beginPath(); g.arc(x, y, 3, 0, 7); g.fill(); continue; }
      const grd = g.createRadialGradient(x - R * 0.35, y - R * 0.4, R * 0.1, x, y, R); if (v === 1) { grd.addColorStop(0, '#fff'); grd.addColorStop(0.35, '#ff8ad6'); grd.addColorStop(1, '#c4007f'); } else { grd.addColorStop(0, '#f4fff0'); grd.addColorStop(0.35, '#58f08f'); grd.addColorStop(1, '#077a3a'); }
      g.fillStyle = grd; g.beginPath(); if (v === 2) { for (let k = 0; k < 16; k++) { const a = (k / 16) * Math.PI * 2, rr = R * (k % 2 ? 0.8 : 1.12 + Math.sin(ts / 200 + k) * 0.06); g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } g.closePath(); } else g.arc(x, y, R, 0, 7); g.fill(); }
    MM.$('#gen').textContent = 'gen ' + gen; const f = G.flat(); MM.$('#cnt').textContent = `${f.filter((x) => x === 1).length} healthy · ${f.filter((x) => x === 2).length} infected`; }
});
