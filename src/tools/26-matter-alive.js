/*META
{"title":"Matter Alive","idea":"Your sample is the ground: throw balls of mud, paint and paper onto its waveform, and every impact plays the sound at that spot.","how":"Press PLAY. The landscape is the waveform of your sample. Click or drag anywhere to throw material onto it (choose MUD, PAINT or PAPER). Each ball falls, bounces on the waveform and plays the sample at the place where it lands, louder for harder hits. Mud is heavy and low and sticks quickly, paint splashes, and paper is light, high and bounces for a long time. Balls leave marks on the ground. SHAKE throws everything back into the air. When everything has settled, the machine throws a little more by itself.","fonts":"family=Bebas+Neue&family=Noto+Sans+JP:wght@400;900","bpm":90,
"manifesto":{"name":"Gutai Art Manifesto","short":"Gutai","author":"Jirō Yoshihara","year":"1956","where":"Geijutsu Shinchō magazine, Tokyo, December 1956, for the Gutai Art Association (founded in Ashiya, 1954)","ideas":["Do not distort materials into illusions: let the material speak and meet the human spirit directly.","Action, body and chance in direct contact with matter, as in Kazuo Shiraga's Challenging Mud (1955) and Saburō Murakami's paper-breaking pieces (1955 to 1956).","Do what has never been done before."],"quotes":["Gutai art does not alter the material. Gutai art imparts life to the material."],"system":"The sample is not edited, filtered or sequenced. It stays as it is, as raw matter, and you bring it to life by throwing other matter at it. Every sound comes from a physical impact."},
"design":{"name":"Yusaku Kamekura","short":"Yusaku Kamekura","who":"Yusaku Kamekura, Japanese graphic designer, nicknamed 'the Boss'","era":"Tokyo, 1950s to 1990s","hallmarks":["A single bold red circle (the sun) above gold rings","Photographs of bodies in motion against black","Big sans type and strong, simple symbols"],"works":["Tokyo 1964 Olympic posters, including the sprinters' start (1962)","Nikon posters (1950s)","Hiroshima Appeals poster (1983)"]}}
*/
/*CSS
:root{--bg:#0b0b0b;--fg:#f4efe4;--acc:#d6001c;--bar-font:'Noto Sans JP',sans-serif;--head-font:'Bebas Neue',sans-serif}
#mm-stage{background:#0b0b0b;overflow:hidden}
#cv{position:absolute;inset:0;width:100%;height:100%;cursor:crosshair;touch-action:none}
.t{position:absolute;left:34px;top:24px;pointer-events:none}.t h1{margin:0;font:400 92px/.85 'Bebas Neue';color:#f4efe4}.t h1 span{color:#c9a45c}.t p{margin:6px 0;font:900 15px 'Noto Sans JP';letter-spacing:.3em;color:#c9a45c}
.m{position:absolute;right:30px;top:30px;display:flex;flex-direction:column;gap:8px}.m button{font:400 30px 'Bebas Neue';border:2px solid #f4efe4;background:none;color:#f4efe4;padding:2px 18px;cursor:pointer}.m button.on{background:#d6001c;border-color:#d6001c}
*/
/*HTML
<canvas id="cv"></canvas><div class="t"><h1>具体<br><span>GUTAI 1956</span></h1><p>物質に生命を</p></div>
<div class="m"><button data-m="0" class="on">MUD</button><button data-m="1">PAINT</button><button data-m="2">PAPER</button><button id="shake">SHAKE</button></div>
*/
const MAT = [{ n: 'mud', r: 18, bounce: 0.25, col: '#6b4a2b', rate: 0.6 }, { n: 'paint', r: 11, bounce: 0.5, col: '#d6001c', rate: 1 }, { n: 'paper', r: 8, bounce: 0.82, col: '#f4efe4', rate: 1.8 }];
let mat = 0, balls = [], marks = [], ground = [], gbuf = null, auto = 0;
MM.$$('.m [data-m]').forEach((b) => (b.onclick = () => { mat = +b.dataset.m; MM.$$('.m [data-m]').forEach((q) => q.classList.toggle('on', q === b)); }));
MM.$('#shake').onclick = () => balls.forEach((b) => { b.vy = -8 - Math.random() * 6; b.vx = (Math.random() - 0.5) * 6; b.rest = 0; });
const C = MM.canvas('#cv');
function gy(x) { const n = ground.length; if (!n) return C.h * 0.75; const i = MM.clamp(Math.floor((x / C.w) * n), 0, n - 1); return C.h * 0.78 - ground[i] * C.h * 0.38; }
function throwAt(x, y) { if (balls.length > 40) balls.shift(); balls.push({ x, y, vx: (Math.random() - 0.5) * 3, vy: 0, m: mat, rest: 0, last: 0 }); }
let lastThrow = 0; MM.drag(C.cv, (x, y, ph) => { if (ph === 'up') return; const t = performance.now(); if (ph === 'down' || t - lastThrow > 90) { lastThrow = t; throwAt(x, y); } });
function impact(b, v) { const B = MM.smp(0, 'loop'), M = MAT[b.m], g = MM.clamp(v / 14, 0.05, 1); MM.play(B, MM.now + 0.01, { offset: MM.clamp(b.x / C.w, 0, 0.98) * B.duration, dur: 0.06 + g * 0.25 * (b.m === 0 ? 1.5 : 1), rate: M.rate * (0.9 + Math.random() * 0.2), gain: g * 0.9, pan: (b.x / C.w - 0.5) * 1.4, fadeOut: 0.03, filter: b.m === 0 ? { type: 'lowpass', freq: 900 } : b.m === 2 ? { type: 'highpass', freq: 1500 } : undefined, send: { rev: b.m === 1 ? 0.3 : 0.1 } });
  if (b.m === 1 && g > 0.3) for (let k = 0; k < 5; k++) marks.push({ x: b.x + (Math.random() - 0.5) * 50 * g, y: gy(b.x) - Math.random() * 10, r: 2 + Math.random() * 6 * g, c: MAT[1].col }); else marks.push({ x: b.x, y: gy(b.x), r: MAT[b.m].r * 0.5 * g, c: MAT[b.m].col }); if (marks.length > 400) marks.splice(0, 50); }
MM.init({ bpm: 90,
  start() { if (!balls.length) for (let k = 0; k < 6; k++) setTimeout(() => throwAt(C.w * (0.15 + k * 0.14), 60 + Math.random() * 80), k * 280); },
  draw(ts) { C.fit(); const g = C.g, w = C.w, h = C.h, B = MM.smp(0, 'loop'); if (B !== gbuf) { gbuf = B; const p = MM.peaks(B, 220), mx = Math.max(...p, 0.001); ground = p.map((v) => v / mx); }
    g.fillStyle = '#0b0b0b'; g.fillRect(0, 0, w, h); g.fillStyle = '#d6001c'; g.beginPath(); g.arc(w * 0.62, h * 0.33, Math.min(w, h) * 0.2, 0, 7); g.fill();
    g.fillStyle = '#c9a45c'; g.beginPath(); g.moveTo(0, h); for (let x = 0; x <= w; x += 4) g.lineTo(x, gy(x)); g.lineTo(w, h); g.fill();
    marks.forEach((m) => { g.fillStyle = m.c; g.beginPath(); g.arc(m.x, m.y, m.r, 0, 7); g.fill(); });
    if (MM.playing && balls.filter((b) => b.rest <= 50).length < 2 && ts - auto > 900) { auto = ts; const m0 = mat; mat = Math.floor(Math.random() * 3); throwAt(Math.random() * w, 40); mat = m0; }
    if (MM.playing) balls.forEach((b) => { const M = MAT[b.m]; if (b.rest > 50) return; b.vy += 0.35; b.x += b.vx; b.y += b.vy; if (b.x < 0 || b.x > w) { b.vx *= -1; b.x = MM.clamp(b.x, 0, w); }
      const G = gy(b.x) - M.r; if (b.y > G) { const v = Math.abs(b.vy); b.y = G; const sl = (gy(b.x + 3) - gy(b.x - 3)) / 6; b.vx = b.vx * 0.9 + sl * 2; b.vy = -v * M.bounce; if (v > 1.2) impact(b, v); else b.rest++; } });
    balls.forEach((b) => { const M = MAT[b.m]; g.fillStyle = M.col; g.beginPath(); if (b.m === 2) { g.save(); g.translate(b.x, b.y); g.rotate(b.x * 0.05); g.fillRect(-M.r, -M.r * 0.7, M.r * 2, M.r * 1.4); g.restore(); } else { g.arc(b.x, b.y, M.r, 0, 7); g.fill(); } }); }
});
