/*META
{"title":"Poor Means","idea":"Four poor materials (wire, stone, water and rag) and only the energy of your hands: pluck, strike, drip and rub.","how":"Press PLAY. The table has four poor materials. WIRE: drag across the wires to pluck them (a physically modelled string, tuned by its length). STONE: click the stones to strike them. WATER: hold the mouse down on the bowl to let it drip. RAG: rub back and forth on the rag, and your sample is played at the speed and direction of your hand, like scratching. In the background, a slow ENERGY pulse runs through everything, like Giovanni Anselmo's twisted or tensioned works: the harder you play, the more energy builds up and the more the pulse rises.","fonts":"family=Courier+Prime:wght@400;700&family=Libre+Franklin:wght@300;800","bpm":72,
"manifesto":{"name":"Arte Povera: Notes for a Guerrilla War","short":"Arte Povera","author":"Germano Celant","year":"1967","where":"Flash Art, Milan, November–December 1967; the same year as Celant's Arte Povera exhibition in Genoa","ideas":["A 'poor' art against the art system and the consumer object, made with elementary materials such as earth, wood, rags, stones and water.","The artist as a free guerrilla who chooses where to fight and what to use.","Energy, process and the presence of the body, as in works by Kounellis, Merz, Anselmo and Pistoletto."],"quotes":[],"system":"No sequencer and no synthesiser presets: only four poor materials and the energy of your body. Every sound comes from simple physical models of a wire, a stone, a drop or a rubbed rag."},
"design":{"name":"Bruno Munari","short":"Bruno Munari","who":"Bruno Munari, Italian artist, designer and educator","era":"Milan, 1930s to 1990s","hallmarks":["Playful experiments with very simple means: paper, holes, folds and light","Clear geometric shapes in primary colours, with lots of white","Design for children, games and learning by doing"],"works":["Useless Machines (from the 1930s)","Illegible Books (from 1949)","Campari poster, Declinazione grafica del nome Campari (1964)"]}}
*/
/*CSS
:root{--bg:#f5f1e6;--fg:#222;--acc:#e2231a;--bar-font:'Courier Prime',monospace;--head-font:'Libre Franklin',sans-serif}
#mm-stage{background:#f5f1e6;overflow:hidden}#cv{position:absolute;inset:0;width:100%;height:100%;touch-action:none;cursor:pointer}
.t{position:absolute;left:28px;top:18px;font:800 40px/1 'Libre Franklin';pointer-events:none}.t small{display:block;font:400 14px 'Courier Prime';color:#e2231a}
*/
/*HTML
<canvas id="cv"></canvas><div class="t">arte povera<small>notes for a guerrilla war · 1967</small></div>
*/
let energy = 0, drip = false, dripT = 0, lastRub = null, stones = [], wires = [], drops = [];
const C = MM.canvas('#cv');
const zones = () => { const w = C.w, h = C.h; return { wire: [w * 0.04, h * 0.2, w * 0.44, h * 0.36], stone: [w * 0.54, h * 0.2, w * 0.42, h * 0.36], water: [w * 0.04, h * 0.6, w * 0.44, h * 0.34], rag: [w * 0.54, h * 0.6, w * 0.42, h * 0.34] }; };
const inZ = (z, x, y) => x > z[0] && x < z[0] + z[2] && y > z[1] && y < z[1] + z[3];
for (let k = 0; k < 6; k++) wires.push({ f: MM.mtof(MM.deg(k, 'minpent', 45)), v: 0 }); for (let k = 0; k < 5; k++) stones.push({ x: 0.15 + k * 0.17 + Math.random() * 0.05, y: 0.3 + Math.random() * 0.4, r: 0.5 + Math.random() * 0.6, f: 0, m: 300 + Math.random() * 1500 });
function ks(f, t, g) { const c = MM.ctx, sr = c.sampleRate, N = Math.round(sr / f), len = sr * 2.5, b = c.createBuffer(1, len, sr), d = b.getChannelData(0); for (let k = 0; k < N; k++) d[k] = Math.random() * 2 - 1; for (let k = N; k < len; k++) d[k] = 0.497 * (d[k - N] + d[k - N + 1]); MM.play(b, t, { gain: g }); energy = Math.min(1, energy + 0.03); }
function stone(s, t) { [1, 2.32, 4.1, 6.7].forEach((r, q) => MM.tone(s.m * r, t, 0.3 / (q + 1), { gain: 0.08 / (q + 1), attack: 0.001, release: 0.2 })); MM.noise(t, 0.02, { freq: s.m * 2, q: 2, gain: 0.25 }); s.f = 1; energy = Math.min(1, energy + 0.05); }
function drop(t) { const f = 600 + Math.random() * 900; MM.tone(f, t, 0.08, { glide: f * 2.2, gain: 0.12, send: { rev: 0.3 } }); drops.push({ x: Math.random(), l: 1 }); energy = Math.min(1, energy + 0.02); }
MM.drag(C.cv, (x, y, ph) => { const Z = zones(); MM.ensure();
  if (ph === 'down') { if (inZ(Z.water, x, y)) drip = true; if (inZ(Z.stone, x, y)) { const z = Z.stone; const s = stones.find((s) => Math.hypot(z[0] + s.x * z[2] - x, z[1] + s.y * z[3] - y) < 20 + s.r * 26); if (s) stone(s, MM.now); } lastRub = null; }
  if (ph === 'move' && inZ(Z.wire, x, y)) { const z = Z.wire, k = Math.floor(((y - z[1]) / z[3]) * wires.length); if (wires[k] && wires[k].v < 0.3) { ks(wires[k].f, MM.now, 0.6); wires[k].v = 1; } }
  if (inZ(Z.rag, x, y) && ph !== 'up') { if (lastRub) { const dx = x - lastRub[0], sp = MM.clamp(Math.abs(dx) / 6, 0.1, 3); if (Math.abs(dx) > 3) { const B = MM.smp(0, 'loop'); MM.play(B, MM.now, { offset: MM.clamp((x - Z.rag[0]) / Z.rag[2], 0, 0.95) * B.duration, dur: 0.07, rate: sp, gain: 0.5, fadeIn: 0.01, fadeOut: 0.02 }); energy = Math.min(1, energy + 0.01); } } lastRub = [x, y]; }
  if (ph === 'up') { drip = false; lastRub = null; } });
MM.init({ bpm: 72, div: 4,
  start() { energy = 0.2; },
  tick(now) { if (drip && now > dripT) { dripT = now + 0.12 + Math.random() * 0.25; drop(now + 0.02); } energy = Math.max(0, energy - 0.0015); },
  step(i, t, sd) { const s = i % 16; if (s === 0) MM.tone(55 * (1 + energy * 0.5), t, sd * 14, { type: 'sine', gain: 0.1 + energy * 0.1, attack: 0.4, release: 1 });
    if (s % 8 === 0) { const B = MM.smp(0, 'loop'); MM.play(B, t, { gain: 0.25 + energy * 0.3, rate: 0.5 + energy * 0.5, filter: { type: 'lowpass', freq: 400 + energy * 2500 }, fadeOut: 0.2 }); }
    // the background 'performer': a guerrilla plays when the hands rest
    if (energy < 0.15 && s % 5 === 0) { if (Math.random() < 0.5) ks(wires[Math.floor(Math.random() * 6)].f, t, 0.35); else stone(MM.pick(stones), t); }
    if (energy > 0.5 && s % 2 === 0) MM.noise(t, 0.03, { freq: 1200, q: 8, gain: energy * 0.1 }); },
  draw() { C.fit(); const g = C.g, w = C.w, h = C.h, Z = zones(); g.fillStyle = '#f5f1e6'; g.fillRect(0, 0, w, h);
    const lab = (z, t) => { g.fillStyle = '#222'; g.font = "400 13px 'Courier Prime'"; g.fillText(t, z[0], z[1] - 8); };
    let z = Z.wire; lab(z, 'filo / wire — drag across'); wires.forEach((wr, k) => { const y = z[1] + (k + 0.5) * (z[3] / wires.length), a = wr.v * 8; wr.v *= 0.93; g.strokeStyle = '#222'; g.lineWidth = 2; g.beginPath(); for (let x = 0; x <= z[2]; x += 6) g.lineTo(z[0] + x, y + Math.sin((x / z[2]) * Math.PI) * Math.sin(performance.now() / 20 + k) * a); g.stroke(); });
    z = Z.stone; lab(z, 'pietra / stone — click'); stones.forEach((s) => { g.fillStyle = s.f > 0.1 ? '#e2231a' : '#555'; s.f *= 0.9; g.beginPath(); g.ellipse(z[0] + s.x * z[2], z[1] + s.y * z[3], 22 + s.r * 26, 16 + s.r * 18, s.r, 0, 7); g.fill(); });
    z = Z.water; lab(z, 'acqua / water — hold'); g.fillStyle = '#1d5fbf'; g.beginPath(); g.ellipse(z[0] + z[2] / 2, z[1] + z[3] * 0.6, z[2] * 0.4, z[3] * 0.3, 0, 0, 7); g.fill(); drops = drops.filter((d) => { d.l -= 0.02; g.strokeStyle = `rgba(245,241,230,${d.l})`; g.lineWidth = 2; g.beginPath(); g.ellipse(z[0] + z[2] * (0.25 + d.x * 0.5), z[1] + z[3] * 0.6, (1 - d.l) * 50, (1 - d.l) * 15, 0, 0, 7); g.stroke(); return d.l > 0; });
    z = Z.rag; lab(z, 'straccio / rag — rub (your sample)'); g.fillStyle = '#ffd400'; g.beginPath(); g.moveTo(z[0] + 10, z[1] + 20); g.lineTo(z[0] + z[2] - 30, z[1] + 5); g.lineTo(z[0] + z[2] - 5, z[1] + z[3] - 25); g.lineTo(z[0] + 30, z[1] + z[3] - 5); g.fill(); g.strokeStyle = '#222'; for (let k = 0; k < 12; k++) { g.beginPath(); g.moveTo(z[0] + 20 + k * (z[2] / 13), z[1] + 15); g.lineTo(z[0] + 35 + k * (z[2] / 13), z[1] + z[3] - 15); g.stroke(); }
    g.fillStyle = '#e2231a'; g.fillRect(w * 0.54, h * 0.1, w * 0.42 * energy, 8); g.fillStyle = '#222'; g.font = "400 12px 'Courier Prime'"; g.fillText('energia ' + Math.round(energy * 100) + '%', w * 0.54, h * 0.1 - 6); }
});
