/*META
{"title":"Repurpose Platform","idea":"Steer a vector between four futures and repurpose the machine itself: every corner is a whole groove, and you can always expand the map.","how":"Press PLAY. Drag the cursor around the square. Each corner is a complete groove (FOLK LOOP, FACTORY, NETWORK and POST-WORK) and the music is a weighted blend of all four, recalculated every step. The arrow shows your vector. EXPAND throws all four corners into new, more extreme futures. Your sample is the raw material of every groove, cut up differently in each.","fonts":"family=Orbitron:wght@500;900&family=Chakra+Petch:wght@400;700","bpm":128,
"manifesto":{"name":"#Accelerate: Manifesto for an Accelerationist Politics","short":"#Accelerate","author":"Alex Williams and Nick Srnicek","year":"2013","where":"published online in May 2013, later in the anthology #Accelerate (2014)","ideas":["Rather than reject technology and go back to small local 'folk politics', repurpose existing technical platforms for collective ends.","Distinguishes mere speed from acceleration as navigation: experimenting and steering rather than just going faster.","Recover the ambition to build futures, rather than defend the present."],"quotes":[],"system":"There is no 'faster' button. You navigate: the music is a vector you steer between possible futures, and EXPAND keeps widening the space of options rather than returning to the old loop."},
"design":{"name":"The Designers Republic","short":"The Designers Republic","who":"The Designers Republic, design studio founded by Ian Anderson in Sheffield, 1986","era":"Sheffield, late 1980s to 2000s","hallmarks":["Corporate and consumer signs repurposed as satire, with fake logos and slogans","Dense, hyper-modern layouts in Japanese-inspired fluorescent colours","Electronic music sleeves and video game interfaces"],"works":["Graphics for the video game Wipeout (1995)","Sleeves for Pop Will Eat Itself (late 1980s)","Sleeves for Warp Records artists (1990s)"]}}
*/
/*CSS
:root{--bg:#0a0a0a;--fg:#f2f2f2;--acc:#ff4fa3;--bar-font:'Chakra Petch',sans-serif;--head-font:'Orbitron',sans-serif}
#mm-stage{background:#0a0a0a;overflow:hidden}#cv{position:absolute;inset:0;width:100%;height:100%;touch-action:none;cursor:move}
.t{position:absolute;left:24px;top:20px;font:900 40px/1 'Orbitron';color:#f2f2f2;pointer-events:none}.t small{display:block;font:700 12px 'Chakra Petch';color:#ff4fa3;letter-spacing:.3em}
#ex{position:absolute;right:24px;top:24px;font:900 18px 'Orbitron';background:#c8ff00;color:#0a0a0a;border:0;padding:10px 18px;cursor:pointer}
*/
/*HTML
<canvas id="cv"></canvas><div class="t">#ACCELERATE<small>™ NAVIGATE · DON'T SPEED · 2013</small></div><button id="ex">EXPAND ►</button>
*/
const NAMES = ['FOLK LOOP', 'FACTORY', 'NETWORK', 'POST-WORK'];
function corner(k, e) { const r = MM.rng(k * 99 + e * 7 + 1); const p = (d) => Array.from({ length: 16 }, () => (r() < d ? 1 : 0)); return { kick: k === 0 ? [1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0] : p(0.25 + e * 0.05), hat: p(0.4 + k * 0.1), cut: p(0.3 + e * 0.04), bass: Array.from({ length: 16 }, () => Math.floor(r() * 7)), cutoff: 400 + r() * (2000 + e * 2000), rate: [1, 0.75, 1.5, 0.5][k] * (1 + (r() - 0.5) * e * 0.3), swing: [0.2, 0, 0.05, 0.12][k] }; }
let gen = 0, CS = [0, 1, 2, 3].map((k) => corner(k, 0)), vx = 0.35, vy = 0.45;
MM.$('#ex').onclick = () => { gen++; CS = [0, 1, 2, 3].map((k) => corner(k + gen * 4, gen)); MM.toast('Map expanded: generation ' + gen); };
const C = MM.canvas('#cv'); const box = () => { const s = Math.min(C.w, C.h) * 0.66; return { x: (C.w - s) / 2, y: (C.h - s) / 2 + 20, s }; };
MM.drag(C.cv, (x, y) => { const b = box(); vx = MM.clamp((x - b.x) / b.s, 0, 1); vy = MM.clamp((y - b.y) / b.s, 0, 1); });
const W = () => [(1 - vx) * (1 - vy), vx * (1 - vy), (1 - vx) * vy, vx * vy];
function mix(key, s) { const w = W(); return w.reduce((a, wk, k) => a + wk * CS[k][key][s], 0); }
const mixv = (key) => W().reduce((a, wk, k) => a + wk * CS[k][key], 0);
MM.init({ bpm: 128, div: 4,
  step(i, t, sd) { const s = i % 16, B = MM.smp(0, 'loop'), sw = s % 2 ? mixv('swing') * sd : 0; t += sw;
    if (mix('kick', s) > 0.5) MM.play(MM.fb.kick, t, { gain: 0.9 });
    if (mix('hat', s) > 0.5) MM.play(MM.fb.hat, t, { gain: 0.3, rate: 1 + vx * 0.5 });
    if (mix('cut', s) > 0.45) MM.play(B, t, { offset: ((s * 5 + gen) % 16) / 16 * B.duration, dur: sd * (1 + vy * 2), rate: mixv('rate'), gain: 0.7, filter: { type: 'lowpass', freq: mixv('cutoff') * 2, q: 4 }, pan: (s % 4) / 2 - 0.75 });
    if (s % 2 === 0) { const d = Math.round(mix('bass', s)); MM.tone(MM.mtof(MM.deg(d, 'minor', 33)), t, sd * 1.8, { type: 'sawtooth', gain: 0.14, cutoff: mixv('cutoff'), q: 8 }); } },
  draw(ts) { C.fit(); const g = C.g, w = C.w, h = C.h, b = box(); g.fillStyle = '#0a0a0a'; g.fillRect(0, 0, w, h);
    g.strokeStyle = '#333'; for (let k = 0; k <= 8; k++) { g.beginPath(); g.moveTo(b.x + (k / 8) * b.s, b.y); g.lineTo(b.x + (k / 8) * b.s, b.y + b.s); g.moveTo(b.x, b.y + (k / 8) * b.s); g.lineTo(b.x + b.s, b.y + (k / 8) * b.s); g.stroke(); }
    const cols = ['#c8ff00', '#ff4fa3', '#00e5ff', '#ff8a00'], pos = [[0, 0], [1, 0], [0, 1], [1, 1]], wt = W();
    pos.forEach(([px, py], k) => { const x = b.x + px * b.s, y = b.y + py * b.s; g.fillStyle = cols[k]; g.fillRect(x - 14, y - 14, 28, 28); g.font = "700 13px 'Chakra Petch'"; g.textAlign = px ? 'left' : 'right'; g.fillText(NAMES[k] + ' ' + Math.round(wt[k] * 100) + '%', x + (px ? 22 : -22), y + 5); g.textAlign = 'left'; g.globalAlpha = wt[k] * 0.9; g.strokeStyle = cols[k]; g.lineWidth = 3; g.beginPath(); g.moveTo(x, y); g.lineTo(b.x + vx * b.s, b.y + vy * b.s); g.stroke(); g.globalAlpha = 1; });
    const cx = b.x + vx * b.s, cy = b.y + vy * b.s; g.fillStyle = '#f2f2f2'; g.beginPath(); g.moveTo(cx, cy - 18); g.lineTo(cx + 12, cy + 12); g.lineTo(cx, cy + 5); g.lineTo(cx - 12, cy + 12); g.fill();
    g.font = "500 11px 'Orbitron'"; g.fillStyle = '#ff4fa3'; g.fillText('GEN ' + String(gen).padStart(3, '0') + ' · VECTOR ' + vx.toFixed(2) + ' / ' + vy.toFixed(2), b.x, b.y + b.s + 28); }
});
