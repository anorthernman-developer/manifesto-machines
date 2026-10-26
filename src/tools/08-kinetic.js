/*META
{"title":"Kinetic Rhythms","idea":"Three rotating rods sweep through points in space; every crossing is a note, so rhythm comes from motion, not mass.","how":"Press PLAY. Three rods turn at different speeds. Click anywhere in the circle to add a point and shift-click (or right-click) to remove one. When a rod passes over a point it sounds, with distance from the centre setting pitch. The red rod plays your sample, the black rod a tone and the grey rod a click. Change the speed ratios with the sliders to get polyrhythms.","fonts":"family=Oswald:wght@400;700","bpm":90,
"manifesto":{"name":"The Realistic Manifesto","short":"Realistic Manifesto","author":"Naum Gabo and Antoine Pevsner","year":"1920","where":"printed as a poster for their open-air exhibition, Tverskoy Boulevard, Moscow, 5 August 1920","ideas":["Art must be built on space and time, the real elements of life, not on imitation.","Volume is not mass: depth and space are the material of sculpture, so open constructions replace solid lumps.","Kinetic rhythms, motion itself, become a basic element of art (Gabo's 'Kinetic Construction', 1919 to 1920, was a vibrating steel rod)."],"quotes":["Space and time are the only forms on which life is built and hence art must be constructed."],"system":"Nothing here is a fixed note on a grid. Sound appears only where moving rods meet points in space, so the rhythm is the kinetic rhythm of the construction and you shape it by changing space and speed."},
"design":{"name":"Gustav Klutsis","short":"Gustav Klutsis","who":"Gustav Klutsis, Latvian-Soviet Constructivist designer","era":"Moscow, 1920s to early 1930s","hallmarks":["Dynamic diagonals and photomontage","Red, black and white with bold condensed lettering","Designs for agitprop radio-orator stands and kiosks with loudspeakers"],"works":["Electrification of the Entire Country (1920 photomontage)","Designs for Radio-Orator stands (1922)","Spartakiada posters and postcards (1928)"]}}
*/
/*CSS
:root{--bg:#ece6da;--fg:#141414;--acc:#d01e1e;--bar-font:'Oswald',sans-serif;--head-font:'Oswald',sans-serif}
#mm-stage{background:linear-gradient(118deg,#ece6da 0 62%,#d01e1e 62% 70%,#141414 70%)}
#cv{position:absolute;inset:0;width:100%;height:100%;touch-action:none}
.h{position:absolute;left:30px;top:24px;font:700 84px/.86 'Oswald';text-transform:uppercase;color:#141414;transform:rotate(-8deg);transform-origin:left top;pointer-events:none}
.h span{background:#d01e1e;color:#ece6da;padding:0 8px}
.ctl{position:absolute;right:26px;bottom:20px;color:#ece6da;font:400 14px 'Oswald';letter-spacing:.1em;display:flex;flex-direction:column;gap:8px;text-transform:uppercase}
.ctl input{accent-color:#d01e1e;width:190px}.ctl b{font-size:22px}
*/
/*HTML
<canvas id="cv"></canvas>
<div class="h">Kinetic<br><span>rhythms</span><br>1920</div>
<div class="ctl"><b>rod speeds</b><label>red <input id="s0" type="range" min="1" max="8" step="1" value="2"></label><label>black <input id="s1" type="range" min="1" max="8" step="1" value="3"></label><label>grey <input id="s2" type="range" min="1" max="8" step="1" value="5"></label><span id="ratio"></span></div>
*/
const C = MM.canvas('#cv'); let dots = [], sp = [2, 3, 5], t0 = 0, lastA = [0, 0, 0];
const ROD = [{ col: '#d01e1e', len: 1 }, { col: '#141414', len: 0.85 }, { col: '#8a8a8a', len: 0.65 }];
for (let i = 0; i < 14; i++) dots.push({ a: Math.random() * Math.PI * 2, r: 0.15 + Math.random() * 0.8, flash: 0 });
[0, 1, 2].forEach((k) => (MM.$('#s' + k).oninput = (e) => (sp[k] = +e.target.value)));
const geo = () => { const R = Math.min(C.w, C.h) * 0.44; return { cx: C.w * 0.58, cy: C.h * 0.52, R }; };
function hitAt(x, y) { const { cx, cy, R } = geo(); const dx = x - cx, dy = y - cy; return { a: (Math.atan2(dy, dx) + Math.PI * 2) % (Math.PI * 2), r: Math.hypot(dx, dy) / R }; }
C.cv.addEventListener('contextmenu', (e) => e.preventDefault());
C.cv.addEventListener('pointerdown', (e) => { MM.ensure(); const p = hitAt(e.offsetX, e.offsetY); if (p.r > 1) return; if (e.shiftKey || e.button === 2) { const { R } = geo(); let bi = -1, bd = 1e9; dots.forEach((d, i) => { const dd = Math.hypot(Math.cos(d.a) * d.r - Math.cos(p.a) * p.r, Math.sin(d.a) * d.r - Math.sin(p.a) * p.r); if (dd < bd) { bd = dd; bi = i; } }); if (bi >= 0 && bd * R < 30) dots.splice(bi, 1); } else dots.push({ ...p, flash: 1 }); });
const BAR = () => 60 / MM.bpm * 4;
function angle(k, t) { return (((t - t0) / (BAR() * 2)) * sp[k] * Math.PI * 2) % (Math.PI * 2); }
function sound(k, d, t) { const pitchDeg = Math.floor((1 - d.r) * 12);
  if (k === 0) { const b = MM.smp(0, 'loop'); MM.play(b, t, { offset: (d.a / (Math.PI * 2)) * b.duration * 0.9, dur: 0.18, gain: 0.75, rate: Math.pow(2, (pitchDeg - 6) / 12), fadeOut: 0.04, pan: Math.cos(d.a) * 0.7 }); }
  if (k === 1) MM.tone(MM.mtof(MM.deg(pitchDeg, 'dorian', 50)), t, 0.25, { type: 'triangle', gain: 0.22, pan: Math.cos(d.a) * 0.7, send: { dly: 0.2 } });
  if (k === 2) MM.noise(t, 0.035, { freq: 1500 + (1 - d.r) * 6000, q: 6, gain: 0.35, pan: Math.cos(d.a) * 0.7 }); d.flash = 1; }
MM.init({ bpm: 90,
  start() { t0 = MM.now; lastA = [0, 0, 0]; },
  tick(now) { const look = now + 0.05; ROD.forEach((rod, k) => { const a = angle(k, look), pa = lastA[k]; dots.forEach((d) => { if (d.r > rod.len) return; const crossed = pa <= a ? d.a > pa && d.a <= a : d.a > pa || d.a <= a; if (crossed) sound(k, d, look); }); lastA[k] = a; }); },
  draw() { C.fit(); const g = C.g, { cx, cy, R } = geo(), now = MM.now; g.clearRect(0, 0, C.w, C.h);
    g.strokeStyle = '#141414'; g.lineWidth = 1; for (let i = 1; i <= 4; i++) { g.beginPath(); g.arc(cx, cy, R * i / 4, 0, 7); g.stroke(); }
    dots.forEach((d) => { const x = cx + Math.cos(d.a) * d.r * R, y = cy + Math.sin(d.a) * d.r * R; g.fillStyle = d.flash > 0.05 ? '#d01e1e' : '#141414'; g.beginPath(); g.arc(x, y, 7 + d.flash * 10, 0, 7); g.fill(); d.flash *= 0.88; });
    ROD.forEach((rod, k) => { const a = MM.playing ? angle(k, now) : k * 2; g.strokeStyle = rod.col; g.lineWidth = [10, 6, 4][k]; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(a) * R * rod.len, cy + Math.sin(a) * R * rod.len); g.stroke(); });
    g.fillStyle = '#d01e1e'; g.beginPath(); g.arc(cx, cy, 16, 0, 7); g.fill(); MM.$('#ratio').textContent = sp.join(' : '); }
});
