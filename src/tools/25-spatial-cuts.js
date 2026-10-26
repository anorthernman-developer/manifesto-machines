/*META
{"title":"Spatial Cuts","idea":"A painted drone is the canvas; slash it, and each cut opens a window through which your sample comes from the space behind.","how":"Press PLAY to hear the canvas, a flat coloured drone. Drag across the canvas to slash it. Each cut opens a window into space: its length sets how long the loop through it is, its angle sets the pitch, and its height sets where in your sample it looks. The more cuts, the more space and echo come through the surface. Click a cut to close it, and change the canvas colour with the swatches (each colour is a different drone).","fonts":"family=Manrope:wght@300;800&family=Playfair+Display:ital@1","bpm":72,
"manifesto":{"name":"Manifiesto Blanco (White Manifesto)","short":"Manifiesto Blanco","author":"Lucio Fontana, with students at the Academia Altamira","year":"1946","where":"Buenos Aires, 1946; signed by students including Bernardo Arias and Horacio Cazeneuve","ideas":["Art needs a new synthesis of colour, sound, movement, time and space, in step with science.","Leave the canvas and the static image behind for matter in motion.","This led to Spatialism (from 1947) and Fontana's cuts in the canvas (Concetto spaziale, Attese, from 1958)."],"quotes":[],"system":"The surface (the drone) is not the work. The work is what you let through it. Each cut makes sound, space and time come from beyond the surface, so matter, colour and sound move together, as the manifesto asked."},
"design":{"name":"Giovanni Pintori for Olivetti","short":"Pintori / Olivetti","who":"Giovanni Pintori, art director of Olivetti's advertising office","era":"Ivrea and Milan, 1950 to 1967","hallmarks":["Playful abstract shapes, numbers and dots standing for machines and calculation","Flat, bright colours on white or black, with lots of air","Small, elegant type set beside a big image"],"works":["Olivetti Lettera 22 poster (1953)","Olivetti Elettrosumma 22 poster, the cascade of numbers (1956)","Olivetti logotype (1947)"]}}
*/
/*CSS
:root{--bg:#f5f2ea;--fg:#1a1a1a;--acc:#d7261e;--bar-font:'Manrope',sans-serif;--head-font:'Manrope',sans-serif}
#mm-stage{background:#f5f2ea;display:grid;grid-template-columns:1fr 280px}
.cvw{padding:34px;display:flex}#cv{flex:1;width:100%;height:100%;cursor:crosshair;box-shadow:0 18px 40px rgba(0,0,0,.18);touch-action:none}
.side{padding:34px 24px;display:flex;flex-direction:column;gap:14px;font:300 14px/1.5 'Manrope'}
.side h1{font:800 40px/.95 'Manrope';margin:0}.side h1 i{font:italic 400 .7em 'Playfair Display';display:block;color:#d7261e}
.sw{display:flex;gap:8px}.sw b{width:34px;height:34px;border-radius:50%;cursor:pointer;box-shadow:inset 0 0 0 2px #0002}
.dots{display:grid;grid-template-columns:repeat(8,1fr);gap:6px;margin-top:auto}.dots i{aspect-ratio:1;border-radius:50%;background:#1a1a1a}.dots i:nth-child(3n){background:#d7261e}.dots i:nth-child(5n){background:#f0b400}
*/
/*HTML
<div class="cvw"><canvas id="cv"></canvas></div>
<div class="side"><h1>concetto<br>spaziale<i>attese</i></h1><div>Drag to cut the canvas. Click a cut to close it.</div><div class="sw" id="sw"></div><div id="info"></div><div class="dots">%DOTS%</div></div>
*/
MM.$('.dots').innerHTML = '<i></i>'.repeat(24);
const SURF = [{ c: '#c8201b', f: [55, 82.5, 110] }, { c: '#f1ede2', f: [65.4, 98, 130.8] }, { c: '#1c2f6b', f: [49, 73.4, 98] }, { c: '#e3b51f', f: [73.4, 110, 146.8] }, { c: '#141414', f: [41.2, 61.7, 82.4] }];
let surf = 0, cuts = [], drawing = null, drone = null;
SURF.forEach((s, i) => { const b = MM.h('b', { style: 'background:' + s.c }); b.onclick = () => { surf = i; retune(); }; MM.$('#sw').append(b); });
const C = MM.canvas('#cv');
MM.drag(C.cv, (x, y, ph) => { const nx = x / C.cv.clientWidth, ny = y / C.cv.clientHeight; if (ph === 'down') { const hit = cuts.findIndex((c) => distSeg(nx, ny, c) < 0.02); if (hit >= 0) { cuts.splice(hit, 1); drawing = null; return; } drawing = { x0: nx, y0: ny, x1: nx, y1: ny, next: 0, open: 0 }; }
  else if (ph === 'move' && drawing) { drawing.x1 = nx; drawing.y1 = ny; } else if (ph === 'up' && drawing) { if (Math.hypot(drawing.x1 - drawing.x0, drawing.y1 - drawing.y0) > 0.04) { cuts.push(drawing); if (cuts.length > 9) cuts.shift(); } drawing = null; } });
function distSeg(px, py, c) { const dx = c.x1 - c.x0, dy = c.y1 - c.y0, L = dx * dx + dy * dy || 1, t = MM.clamp(((px - c.x0) * dx + (py - c.y0) * dy) / L, 0, 1); return Math.hypot(px - (c.x0 + dx * t), py - (c.y0 + dy * t)); }
function mkDrone() { const c = MM.ctx, g = c.createGain(); g.gain.value = 0; const lp = c.createBiquadFilter(); lp.frequency.value = 700; lp.connect(g); g.connect(MM.out); const os = SURF[surf].f.map((f, k) => { const o = c.createOscillator(); o.type = k ? 'sine' : 'sawtooth'; o.frequency.value = f; const og = c.createGain(); og.gain.value = k ? 0.4 : 0.25; o.connect(og); og.connect(lp); o.start(); return o; }); g.gain.setTargetAtTime(0.25, MM.now, 0.5); return { g, lp, os }; }
function retune() { if (drone) SURF[surf].f.forEach((f, k) => drone.os[k].frequency.setTargetAtTime(f, MM.now, 0.4)); }
MM.init({ bpm: 72,
  start() { drone = mkDrone(); retune(); cuts.forEach((c) => (c.next = 0)); },
  stop() { if (drone) { const d = drone; d.g.gain.setTargetAtTime(0, MM.now, 0.2); setTimeout(() => d.os.forEach((o) => o.stop()), 1200); drone = null; } },
  setup() { cuts.push({ x0: 0.3, y0: 0.22, x1: 0.34, y1: 0.78, next: 0, open: 0 }, { x0: 0.55, y0: 0.3, x1: 0.6, y1: 0.7, next: 0, open: 0 }); },
  tick(now) { if (!drone) return; const B = MM.smp(0, 'loop'), open = cuts.length; drone.lp.frequency.setTargetAtTime(500 + open * 250, now, 0.3); drone.g.gain.setTargetAtTime(0.28 - Math.min(open, 8) * 0.02, now, 0.4);
    cuts.forEach((c) => { if (now + 0.1 < c.next) return; const len = Math.hypot(c.x1 - c.x0, c.y1 - c.y0), ang = Math.atan2(c.y1 - c.y0, c.x1 - c.x0), d = 0.25 + len * 3, t = Math.max(now + 0.03, c.next);
      MM.play(B, t, { offset: MM.clamp((c.y0 + c.y1) / 2, 0, 0.9) * B.duration, dur: Math.min(d, B.duration), rate: Math.pow(2, Math.round(Math.sin(ang) * 7) / 12), gain: 0.45, fadeIn: d * 0.3, fadeOut: d * 0.4, pan: ((c.x0 + c.x1) - 1) * 0.8, send: { rev: 0.6, dly: 0.25 } }); c.next = t + d * 0.9; c.open = 1; }); },
  draw() { C.fit(); const g = C.g, w = C.w, h = C.h; g.fillStyle = SURF[surf].c; g.fillRect(0, 0, w, h);
    const all = drawing ? cuts.concat([drawing]) : cuts; all.forEach((c) => { const mx = (c.x0 + c.x1) / 2 * w, my = (c.y0 + c.y1) / 2 * h, dx = (c.x1 - c.x0) * w, dy = (c.y1 - c.y0) * h, L = Math.hypot(dx, dy), a = Math.atan2(dy, dx), op = 6 + (c.open || 0) * 6; c.open = (c.open || 0) * 0.97;
      g.save(); g.translate(mx, my); g.rotate(a); g.fillStyle = 'rgba(0,0,0,.35)'; g.beginPath(); g.ellipse(3, 4, L / 2, op + 2, 0, 0, 7); g.fill(); g.fillStyle = '#050505'; g.beginPath(); g.ellipse(0, 0, L / 2, op, 0, 0, 7); g.fill(); g.strokeStyle = 'rgba(255,255,255,.25)'; g.lineWidth = 1.5; g.beginPath(); g.ellipse(0, -1, L / 2, op, 0, Math.PI, 2 * Math.PI); g.stroke(); g.restore(); });
    MM.$('#info').textContent = `${cuts.length} cut${cuts.length === 1 ? '' : 's'} · ${['red', 'white', 'blue', 'yellow', 'black'][surf]} canvas`; }
});
