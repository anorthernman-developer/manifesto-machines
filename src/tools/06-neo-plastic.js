/*META
{"title":"Neo-Plastic Grid","idea":"A Mondrian composition you can hear: vertical lines are time, horizontal lines are pitch, colours are instruments.","how":"Press PLAY. The playhead sweeps left to right. Each coloured rectangle sounds when the playhead reaches it and lasts as long as it is wide. Red plays your sample, blue is bass, yellow is a bell and black is a drum. Click a rectangle to change its colour (red, yellow, blue, black, white). COMPOSE draws a new grid; + LINE splits the time or pitch again.","fonts":"family=Space+Grotesk:wght@400;700","bpm":100,
"manifesto":{"name":"De Stijl Manifesto I","short":"De Stijl","author":"Theo van Doesburg, Piet Mondrian, Vilmos Huszár, Antony Kok and others","year":"1918","where":"De Stijl magazine, Leiden, November 1918","ideas":["Art should move from the individual to the universal, from the old consciousness of time to the new.","Neo-Plasticism (Mondrian): only straight horizontal and vertical lines, the three primary colours, and the non-colours black, white and grey.","Balance comes from unequal but equivalent parts, never from symmetry."],"quotes":["There is an old and a new consciousness of time."],"system":"Only horizontal and vertical divisions exist. Vertical lines cut time, horizontal lines cut pitch, and the three primaries plus black are the only instruments. Rectangle sizes are durations, so the whole composition is one balanced, unequal grid."},
"design":{"name":"Wim Crouwel","short":"Wim Crouwel","who":"Wim Crouwel ('Mr Gridnik'), co-founder of Total Design","era":"Amsterdam, 1960s to 1970s","hallmarks":["Everything sits on a visible, strict grid","Modular letters built from straight strokes and rounded corners","Calm sans type, lots of white, small coloured accents"],"works":["New Alphabet typeface (1967)","Stedelijk Museum Amsterdam posters and catalogues (1964 to 1985)","Vormgevers poster (1968), with its grid printed on the poster"]}}
*/
/*CSS
:root{--bg:#f4f2ec;--fg:#111;--acc:#d42a20;--bar-font:'Space Grotesk',Arial,sans-serif;--head-font:'Space Grotesk',sans-serif}
#mm-stage{display:grid;grid-template-columns:300px 1fr;background:var(--bg);background-image:linear-gradient(#ddd 1px,transparent 1px),linear-gradient(90deg,#ddd 1px,transparent 1px);background-size:20px 20px}
.side{padding:24px 22px;display:flex;flex-direction:column;gap:16px;font:400 13px/1.45 'Space Grotesk'}
#title{width:256px;height:150px}
.side button{font:700 13px 'Space Grotesk';background:#111;color:#fff;border:0;padding:9px 10px;cursor:pointer;text-align:left}.side button:hover{background:#d42a20}
.key{display:grid;grid-template-columns:20px 1fr;gap:6px 10px;align-items:center}.key i{width:20px;height:20px;border:3px solid #111}
#cv{width:calc(100% - 30px);height:calc(100% - 30px);margin:15px;display:block;cursor:pointer}
*/
/*HTML
<div class="side"><canvas id="title"></canvas><div>Vertical lines cut time. Horizontal lines cut pitch. Only primaries and non-colours are allowed.</div>
<div class="key"><i style="background:#d42a20"></i>red · your sample<i style="background:#1f3f99"></i>blue · bass<i style="background:#f2c600"></i>yellow · bell<i style="background:#111"></i>black · drum</div>
<button id="compose">COMPOSE</button><button id="vline">+ LINE (TIME)</button><button id="hline">+ LINE (PITCH)</button><div id="info"></div></div>
<canvas id="cv"></canvas>
*/
// modular letters on a 4x5 grid, after Crouwel's New Alphabet
const GL = { D: '1110100110011001111 0', E: '11111000111010001111', S: '11111000111100011111', T: '11110110011001100110', I: '01100110011001100110', J: '00110001000110011111', L: '10001000100010001111', '1': '01101110011001100110', '9': '11111001111100011111', '8': '11111001111110011111' };
function drawTitle() { const T = MM.canvas('#title'), g = T.g; g.clearRect(0, 0, T.w, T.h); const u = 9; let x = 0, y = 0;
  [['DE', 0], ['STIJL', 1], ['1918', 2]].forEach(([w, row]) => { x = 0; for (const ch of w) { const s = (GL[ch] || '').replace(' ', ''); for (let k = 0; k < 20; k++) if (s[k] === '1') { g.fillStyle = row === 2 ? '#d42a20' : '#111'; g.beginPath(); g.roundRect(x + (k % 4) * u, row * 6 * u * 0.75 + Math.floor(k / 4) * u * 0.7, u - 2, u * 0.7 - 2, 3); g.fill(); } x += 5 * u; } }); }
const COLS = ['#f4f2ec', '#d42a20', '#f2c600', '#1f3f99', '#111'];
let V = [], Hl = [], cells = {}, cur = -1;
const rnd = (n, min) => { const a = []; while (a.length < n) { const v = Math.round((0.08 + Math.random() * 0.84) * 32) / 32; if (a.every((b) => Math.abs(b - v) >= min)) a.push(v); } return a.sort((a, b) => a - b); };
function compose() { V = rnd(4 + Math.floor(Math.random() * 3), 0.07); Hl = rnd(3 + Math.floor(Math.random() * 3), 0.1); cells = {}; const xs = [0, ...V, 1], ys = [0, ...Hl, 1];
  for (let i = 0; i < xs.length - 1; i++) for (let j = 0; j < ys.length - 1; j++) { const r = Math.random(); cells[i + ',' + j] = r < 0.55 ? 0 : r < 0.68 ? 1 : r < 0.8 ? 2 : r < 0.92 ? 3 : 4; } cells["0," + (ys.length - 2)] = 1; }
compose();
const C = MM.canvas('#cv');
function hit(x, y) { const xs = [0, ...V, 1], ys = [0, ...Hl, 1]; const i = xs.findIndex((v, k) => x >= v && x < xs[k + 1]), j = ys.findIndex((v, k) => y >= v && y < ys[k + 1]); return [i, j]; }
C.cv.addEventListener('click', (e) => { const r = C.cv.getBoundingClientRect(), [i, j] = hit((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height); const k = i + ',' + j; cells[k] = ((cells[k] || 0) + 1) % 5; });
MM.$('#compose').onclick = compose;
MM.$('#vline').onclick = () => { const old = cells, ov = V.slice(); V = [...V, rnd(1, 0)[0]].sort((a, b) => a - b); const xs = [0, ...V, 1], oxs = [0, ...ov, 1]; cells = {}; for (let i = 0; i < xs.length - 1; i++) { const oi = oxs.findIndex((v, k) => xs[i] >= v && xs[i] < oxs[k + 1]); for (let j = 0; j <= Hl.length; j++) cells[i + ',' + j] = old[oi + ',' + j] || 0; } };
MM.$('#hline').onclick = () => { const old = cells, oh = Hl.slice(); Hl = [...Hl, rnd(1, 0)[0]].sort((a, b) => a - b); const ys = [0, ...Hl, 1], oys = [0, ...oh, 1]; cells = {}; for (let j = 0; j < ys.length - 1; j++) { const oj = oys.findIndex((v, k) => ys[j] >= v && ys[j] < oys[k + 1]); for (let i = 0; i <= V.length; i++) cells[i + ',' + j] = old[i + ',' + oj] || 0; } };
const LOOP = () => 60 / MM.bpm * 8; let t0 = 0, lastCol = -1, pos = 0;
MM.init({ bpm: 100,
  setup() { drawTitle(); },
  start() { t0 = MM.now + 0.05; lastCol = -1; },
  tick(now) { const L = LOOP(), look = now + 0.06; pos = ((look - t0) % L + L) % L / L; const xs = [0, ...V, 1], ys = [0, ...Hl, 1]; const col = xs.findIndex((v, k) => pos >= v && pos < xs[k + 1]);
    if (col !== lastCol && col >= 0) { lastCol = col; cur = col; const dur = (xs[col + 1] - xs[col]) * L;
      for (let j = 0; j < ys.length - 1; j++) { const c = cells[col + ',' + j] || 0; if (!c) continue; const row = ys.length - 2 - j, h = ys[j + 1] - ys[j], gain = 0.15 + h * 0.6, t = look;
        if (c === 1) { const b = MM.smp(0, 'loop'); MM.play(b, t, { offset: (row / (ys.length - 1)) * b.duration * 0.8, dur: Math.min(dur, b.duration), gain: gain + 0.2, fadeOut: 0.05 }); }
        if (c === 2) MM.tone(MM.mtof(MM.deg(row * 2 + 7, 'major', 60)), t, Math.min(dur, 2), { partials: [[1, 1], [2.76, 0.4], [5.4, 0.2]], gain: gain * 0.5, release: 1, send: { rev: 0.3 } });
        if (c === 3) MM.tone(MM.mtof(MM.deg(row, 'major', 36)), t, dur * 0.95, { type: 'triangle', gain: gain * 1.2, cutoff: 900 });
        if (c === 4) { MM.play(MM.fb.kick, t, { gain: 0.8 }); if (dur > 0.5) MM.play(MM.fb.kick, t + dur / 2, { gain: 0.5 }); } } } },
  draw() { C.fit(); const g = C.g, W = C.w, H = C.h, xs = [0, ...V, 1], ys = [0, ...Hl, 1]; g.fillStyle = '#f4f2ec'; g.fillRect(0, 0, W, H);
    for (let i = 0; i < xs.length - 1; i++) for (let j = 0; j < ys.length - 1; j++) { g.fillStyle = COLS[cells[i + ',' + j] || 0]; g.fillRect(xs[i] * W, ys[j] * H, (xs[i + 1] - xs[i]) * W, (ys[j + 1] - ys[j]) * H); if (MM.playing && i === cur && cells[i + ',' + j]) { g.fillStyle = 'rgba(255,255,255,.25)'; g.fillRect(xs[i] * W, ys[j] * H, (xs[i + 1] - xs[i]) * W, (ys[j + 1] - ys[j]) * H); } }
    g.fillStyle = '#111'; V.forEach((v) => g.fillRect(v * W - 5, 0, 10, H)); Hl.forEach((v) => g.fillRect(0, v * H - 5, W, 10)); g.lineWidth = 10; g.strokeRect(0, 0, W, H);
    if (MM.playing) { g.fillStyle = '#d42a20'; g.fillRect(pos * W - 2, 0, 4, H); } MM.$('#info').textContent = `${V.length + 1} durations × ${Hl.length + 1} pitches`; }
});
