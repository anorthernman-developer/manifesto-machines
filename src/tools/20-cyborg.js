/*META
{"title":"Cyborg","idea":"Three boundary sliders (human/animal, organism/machine, physical/non-physical) blur one groove between flesh and code.","how":"Press PLAY. A groove plays, built from your sample. Drag the three sliders to break three boundaries. HUMAN to ANIMAL turns the voice into calls and chirps. ORGANISM to MACHINE moves from loose, breathy timing to locked, square, bit-crushed code. PHYSICAL to NON-PHYSICAL dissolves the sound into grains and space. Click the pixel face to scramble its genes, which re-rolls the pattern.","fonts":"family=VT323&family=Syne:wght@500;800","bpm":104,
"manifesto":{"name":"A Cyborg Manifesto","short":"Cyborg Manifesto","author":"Donna Haraway","year":"1985","where":"Socialist Review, 1985, as 'A Manifesto for Cyborgs'; revised in Simians, Cyborgs, and Women (1991)","ideas":["The cyborg, a hybrid of machine and organism, is a figure for refusing fixed identities and dualisms.","Haraway names three boundary breakdowns: human and animal, organism and machine, physical and non-physical.","Pleasure in the confusion of boundaries, and responsibility in building them."],"quotes":["I would rather be a cyborg than a goddess."],"system":"The three boundaries Haraway lists become the three controls. Nothing is purely human or purely machine: every sound sits at a point between them, and you move it by blurring the borders."},
"design":{"name":"April Greiman","short":"April Greiman","who":"April Greiman, Los Angeles designer, an early adopter of the Apple Macintosh","era":"Los Angeles, 1980s","hallmarks":["Bitmap pixels, low-resolution video stills and digital artefacts","Layered space, gradients and floating planes","New Wave typography mixing technology and the body"],"works":["Does It Make Sense? (Design Quarterly 133, 1986), a life-size digital self-portrait poster","Pacific Wave exhibition poster (1987)","Identity for China Club, Los Angeles (1980)"]}}
*/
/*CSS
:root{--bg:#0b0b1a;--fg:#f4f0ff;--acc:#ff4fd8;--bar-font:'VT323',monospace;--head-font:'Syne',sans-serif}
#mm-stage{background:linear-gradient(135deg,#21104a,#0b0b1a 40%,#002a3a 70%,#ff4fd8 140%);overflow:hidden}
#face{position:absolute;left:4%;top:6%;width:44%;height:84%;image-rendering:pixelated;cursor:pointer}
.ctl{position:absolute;right:5%;top:12%;width:40%;display:flex;flex-direction:column;gap:28px}
.ctl h1{font:800 74px/.85 'Syne';margin:0;mix-blend-mode:difference;color:#9ef}
.ctl label{font:400 26px 'VT323';display:flex;justify-content:space-between;color:#ccf}
.ctl input{width:100%;accent-color:#ff4fd8;height:26px}
.plane{position:absolute;width:280px;height:180px;border:1px solid rgba(255,255,255,.4);background:linear-gradient(90deg,rgba(80,240,255,.15),rgba(255,79,216,.15));transform:rotate(-14deg) skewX(10deg);right:12%;bottom:10%;pointer-events:none}
#gene{font:400 22px 'VT323';color:#ff4fd8;word-break:break-all}
*/
/*HTML
<div class="plane"></div><canvas id="face"></canvas>
<div class="ctl"><h1>does it<br>make sense?</h1>
<div><label><span>HUMAN</span><span>ANIMAL</span></label><input id="b0" type="range" min="0" max="1" step="0.01" value="0.2"></div>
<div><label><span>ORGANISM</span><span>MACHINE</span></label><input id="b1" type="range" min="0" max="1" step="0.01" value="0.5"></div>
<div><label><span>PHYSICAL</span><span>NON-PHYSICAL</span></label><input id="b2" type="range" min="0" max="1" step="0.01" value="0.2"></div><div id="gene"></div></div>
*/
let b = [0.2, 0.5, 0.2], genes = [], crush;
[0, 1, 2].forEach((k) => (MM.$('#b' + k).oninput = (e) => (b[k] = +e.target.value)));
function roll() { genes = Array.from({ length: 16 }, () => Math.floor(Math.random() * 4)); genes[0] = 1; genes[8] = 1; genes[4] = 2; genes[12] = 2; MM.$('#gene').textContent = genes.map((g) => 'ACGT'[g]).join(''); }
roll(); MM.$('#face').onclick = roll;
let crushG, cleanG;
MM.init({ bpm: 104, div: 4,
  start() { if (!crush) { crush = MM.crusher(4); crushG = MM.ctx.createGain(); crush.connect(crushG); crushG.connect(MM.out); } },
  step(i, t, sd) { const s = i % 16, g = genes[s], m = b[1], an = b[0], np = b[2], B = MM.smp(0, 'voice');
    const jit = (1 - m) * (Math.random() - 0.5) * sd * 0.5, tt = t + Math.max(0, jit); crushG.gain.setTargetAtTime(m * m * 0.8, t, 0.05);
    const dst = (amt) => (Math.random() < m * 0.8 ? crush : undefined);
    if (g === 1) MM.play(MM.fb.kick, tt, { gain: 0.9, dest: dst() });
    if (g === 2) { m > 0.5 ? MM.noise(tt, 0.05, { freq: 4000, q: 1, gain: 0.5, dest: crush }) : MM.play(MM.fb.snare, tt, { gain: 0.6 + Math.random() * 0.2 }); }
    if (g === 3 || (s % 2 && Math.random() < 0.5)) { if (np > 0.5 && Math.random() < np) { for (let k = 0; k < 3; k++) MM.play(B, tt + k * 0.03, { offset: Math.random() * B.duration * 0.9, dur: 0.04, rate: 1 + an * 3, gain: 0.25, pan: Math.random() * 2 - 1, send: { rev: np } }); } else MM.play(MM.fb.hat, tt, { gain: 0.25, dest: dst() }); }
    if (s % 4 === 0 || g === 0) { const rate = an > 0.5 ? 1.5 + an * 2 * (1 + Math.sin(i)) : 1 - an * 0.3; const voc = { offset: ((s / 16) * B.duration * 0.8), dur: an > 0.5 ? 0.08 + (1 - an) * 0.2 : sd * 2, rate, gain: 0.7 * (1 - np * 0.5), fadeOut: 0.04, dest: dst(), send: { rev: np * 0.8, dly: np * 0.4 } };
      if (an > 0.5) voc.filter = { type: 'bandpass', freq: 2000 + an * 3000, q: 4 }; MM.play(B, tt, voc);
      if (an > 0.6 && Math.random() < an) MM.tone(2500 + Math.random() * 2000, tt + sd / 2, 0.08, { glide: 4000 + Math.random() * 1500, gain: 0.07 }); }
    if (s % 8 === 0) { const f = MM.mtof(MM.pick([36, 36, 39, 41])); MM.tone(f, tt, sd * 7, { type: m > 0.5 ? 'square' : 'sine', gain: 0.25, cutoff: 300 + (1 - m) * 500, attack: (1 - m) * 0.1, dest: dst() }); } },
  draw(ts) { const c = MM.$('#face'), res = Math.round(16 + (1 - b[1]) * 90); if (c.width !== res) { c.width = res; c.height = Math.round(res * 1.3); } const g = c.getContext('2d'), w = c.width, h = c.height, T = ts / 1000;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const nx = x / w - 0.5, ny = y / h - 0.45, face = 1 - Math.hypot(nx * 1.6, ny * 1.15) * 2.2, eye = Math.min(Math.hypot(nx - 0.12, ny + 0.06), Math.hypot(nx + 0.12, ny + 0.06)) < 0.04, mouth = Math.abs(ny - 0.18) < 0.015 && Math.abs(nx) < 0.12;
      let v = face > 0 ? 0.6 + face * 0.4 : 0.05; if (eye || mouth) v = 0.05; const scan = b[2] > 0.3 && Math.random() < b[2] * 0.15 ? Math.random() : 0;
      const hue = (180 + nx * 200 + b[0] * 120 + T * 20) % 360; g.fillStyle = scan ? `hsl(${hue},100%,70%)` : `hsl(${hue},${30 + b[1] * 70}%,${v * 70}%)`; g.fillRect(x, y, 1, 1); } }
});
