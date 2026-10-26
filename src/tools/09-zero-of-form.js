/*META
{"title":"Zero of Form","idea":"Pure shapes float on white; each one is a held tone, and where they overlap your sample sparkles.","how":"Press PLAY. Every shape is a sustained sound: height is pitch, size is loudness, and the kind of shape sets the timbre (square: pure tone, bar: reedy, circle: your sample looped, cross: noise). Drag shapes to move them and double-click empty white to add a new one. Shapes drift slowly by themselves; where two overlap, grains of your sample spark. The black square is the bass drone.","fonts":"family=Russo+One&family=PT+Sans:wght@400;700","bpm":60,
"manifesto":{"name":"From Cubism and Futurism to Suprematism: The New Painterly Realism","short":"Suprematism","author":"Kazimir Malevich","year":"1915","where":"Petrograd, published for the 0.10 exhibition, December 1915, where the Black Square was first shown","ideas":["Painting should stop copying objects and nature; pure geometric forms on a white ground are enough.","Malevich called this the 'zero of form': start again from nothing, from the Black Square.","Later he described Suprematism as the supremacy of pure feeling in art (The Non-Objective World, 1927)."],"quotes":[],"system":"There are no melodies and no beats, only non-objective forms. Each shape's position, size and type become a pure sustained sound, and the white field is silence. The music is made from feeling, by placing forms."},
"design":{"name":"El Lissitzky","short":"El Lissitzky","who":"El Lissitzky, painter, designer and typographer","era":"Vitebsk, Moscow and Berlin, 1919 to 1930","hallmarks":["Suprematist shapes turned into communication: wedges, circles and bars","Diagonal tension, red and black on white","Typography as architecture, the book as a constructed object"],"works":["Beat the Whites with the Red Wedge (1919 poster)","Of Two Squares: A Suprematist Tale in Six Constructions (1922)","For the Voice, Mayakovsky's poems designed by Lissitzky (1923)"]}}
*/
/*CSS
:root{--bg:#f7f5f0;--fg:#121212;--acc:#d3201f;--bar-font:'PT Sans',sans-serif;--head-font:'Russo One',sans-serif}
#cv{position:absolute;inset:0;width:100%;height:100%;touch-action:none}
.t{position:absolute;right:30px;top:26px;font:400 46px/1 'Russo One';text-align:right;pointer-events:none}.t small{display:block;font:700 13px 'PT Sans';letter-spacing:.3em;color:var(--acc);margin-top:6px}
.n{position:absolute;left:30px;bottom:20px;font:400 13px 'PT Sans';max-width:330px;pointer-events:none}
*/
/*HTML
<canvas id="cv"></canvas><div class="t">0,10<small>SUPREMATISM · 1915</small></div><div class="n" id="n">Drag the forms. Double-click the white to add one.</div>
*/
const C = MM.canvas('#cv'); const TYPES = ['square', 'bar', 'circle', 'cross'];
let S = [], drag = null, sparkT = 0;
const mk = (type, x, y, w, h, col, a = 0) => ({ type, x, y, w, h, col, a, vx: (Math.random() - 0.5) * 0.004, vy: (Math.random() - 0.5) * 0.004, va: (Math.random() - 0.5) * 0.002, v: null });
S = [mk('square', 0.3, 0.55, 0.18, 0.18, '#121212', 0.1), mk('bar', 0.62, 0.3, 0.32, 0.05, '#d3201f', -0.5), mk('circle', 0.7, 0.66, 0.09, 0.09, '#1c3f94'), mk('bar', 0.45, 0.2, 0.16, 0.03, '#121212', 0.3), mk('cross', 0.15, 0.25, 0.08, 0.08, '#e7b400', 0.2), mk('square', 0.82, 0.48, 0.06, 0.06, '#d3201f', 0.7)];
function voice(s) { const c = MM.ctx, g = c.createGain(); g.gain.value = 0; const lp = c.createBiquadFilter(); lp.frequency.value = 2000; lp.connect(g); const p = c.createStereoPanner(); g.connect(p); p.connect(MM.out); const sg = c.createGain(); sg.gain.value = 0.25; g.connect(sg); sg.connect(MM.rev); const v = { g, lp, p, nodes: [] };
  if (s.type === 'square') { [1, 2, 3].forEach((r, k) => { const o = c.createOscillator(); o.type = 'sine'; const og = c.createGain(); og.gain.value = [1, 0.2, 0.08][k]; o.connect(og); og.connect(lp); o.start(); v.nodes.push({ o, r }); }); }
  if (s.type === 'bar') { const o = c.createOscillator(); o.type = 'sawtooth'; o.connect(lp); o.start(); v.nodes.push({ o, r: 1 }); lp.Q.value = 4; }
  if (s.type === 'circle') { const b = c.createBufferSource(); b.buffer = MM.smp(0, 'texture'); b.loop = true; b.connect(lp); b.start(); v.buf = b; }
  if (s.type === 'cross') { const n = c.createBufferSource(), nb = c.createBuffer(1, c.sampleRate, c.sampleRate), d = nb.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; n.buffer = nb; n.loop = true; lp.type = 'bandpass'; lp.Q.value = 18; n.connect(lp); n.start(); v.buf = n; }
  return v; }
function freq(s) { return s.type === 'square' && s.col === '#121212' && s.w > 0.12 ? 55 : MM.mtof(MM.deg(Math.floor((1 - s.y) * 16), 'lydian', 40)); }
function update(s, now) { if (!s.v) return; const f = freq(s), area = s.w * s.h, gain = MM.clamp(Math.sqrt(area) * 1.1, 0.03, 0.4) * (s.type === 'bar' ? 0.35 : s.type === 'cross' ? 1.6 : 1);
  s.v.g.gain.setTargetAtTime(gain, now, 0.4); s.v.p.pan.setTargetAtTime(MM.clamp((s.x - 0.5) * 1.6, -1, 1), now, 0.3);
  s.v.nodes.forEach(({ o, r }) => o.frequency.setTargetAtTime(f * r, now, 0.3)); if (s.type === 'bar') s.v.lp.frequency.setTargetAtTime(f * 3, now, 0.3); if (s.type === 'cross') s.v.lp.frequency.setTargetAtTime(f * 4, now, 0.3); if (s.type === 'circle') { s.v.buf.playbackRate.setTargetAtTime(f / 220, now, 0.3); s.v.lp.frequency.setTargetAtTime(6000, now, 0.3); } }
function kill(s, now) { if (!s.v) return; s.v.g.gain.setTargetAtTime(0, now, 0.15); const v = s.v; setTimeout(() => { v.nodes.forEach(({ o }) => o.stop()); v.buf && v.buf.stop(); v.g.disconnect(); }, 800); s.v = null; }
const inside = (s, x, y) => { const dx = x - s.x, dy = y - s.y, c = Math.cos(-s.a), si = Math.sin(-s.a); const lx = dx * c - dy * si, ly = dx * si + dy * c; return Math.abs(lx) < s.w / 2 + 0.01 && Math.abs(ly) < s.h / 2 + 0.01; };
const norm = (e) => { const r = C.cv.getBoundingClientRect(); return [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height]; };
C.cv.addEventListener('pointerdown', (e) => { const [x, y] = norm(e); const s = [...S].reverse().find((q) => inside(q, x, y)); if (s) drag = { s, dx: x - s.x, dy: y - s.y }; });
addEventListener('pointermove', (e) => { if (!drag) return; const [x, y] = norm(e); drag.s.x = MM.clamp(x - drag.dx, 0, 1); drag.s.y = MM.clamp(y - drag.dy, 0, 1); });
addEventListener('pointerup', () => (drag = null));
C.cv.addEventListener('dblclick', (e) => { const [x, y] = norm(e); const type = TYPES[S.length % 4], sz = 0.04 + Math.random() * 0.1; const s = mk(type, x, y, type === 'bar' ? sz * 3 : sz, type === 'bar' ? sz / 4 : sz, MM.pick(['#121212', '#d3201f', '#1c3f94', '#e7b400', '#2f7d3b']), Math.random() - 0.5); S.push(s); if (MM.playing) s.v = voice(s); if (S.length > 12) kill(S.shift(), MM.now); });
MM.init({ bpm: 60,
  start() { S.forEach((s) => (s.v = voice(s))); },
  stop() { S.forEach((s) => kill(s, MM.now)); },
  onSamples() { if (MM.playing) S.forEach((s) => { if (s.type === 'circle') { kill(s, MM.now); s.v = voice(s); } }); },
  tick(now) { S.forEach((s) => update(s, now));
    if (now > sparkT) { sparkT = now + 0.12; for (let i = 0; i < S.length; i++) for (let j = i + 1; j < S.length; j++) { const a = S[i], b = S[j]; if (Math.abs(a.x - b.x) < (a.w + b.w) / 2 && Math.abs(a.y - b.y) < (a.h + b.h) / 2 && Math.random() < 0.5) { const buf = MM.smp(1, 'tone'); MM.play(buf, now + 0.02, { offset: Math.random() * buf.duration * 0.8, dur: 0.09, rate: 1 + (1 - (a.y + b.y) / 2) * 2, gain: 0.18, fadeIn: 0.02, fadeOut: 0.05, pan: a.x - 0.5, send: { rev: 0.5 } }); } } } },
  draw() { C.fit(); const g = C.g, W = C.w, H = C.h, U = Math.min(W, H); g.fillStyle = '#f7f5f0'; g.fillRect(0, 0, W, H);
    S.forEach((s) => { if (s !== (drag && drag.s)) { s.x += s.vx * 0.05; s.y += s.vy * 0.05; s.a += s.va * 0.05; if (s.x < 0.05 || s.x > 0.95) s.vx *= -1; if (s.y < 0.08 || s.y > 0.92) s.vy *= -1; }
      g.save(); g.translate(s.x * W, s.y * H); g.rotate(s.a); g.fillStyle = s.col; const w = s.w * U * 1.6, h = s.h * U * 1.6;
      if (s.type === 'circle') { g.beginPath(); g.arc(0, 0, w / 2, 0, 7); g.fill(); } else if (s.type === 'cross') { g.fillRect(-w / 2, -h / 6, w, h / 3); g.fillRect(-w / 6, -h / 2, w / 3, h); } else g.fillRect(-w / 2, -h / 2, w, h); g.restore(); }); }
});
