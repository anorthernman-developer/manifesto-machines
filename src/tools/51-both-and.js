/*META
{"title":"Both-And","idea":"A machine that refuses to choose: every musical decision is a pair of opposites, and in the middle you get both at once. Major and minor, four and three, clean and dirty, straight and swung.","how":"Press PLAY. Each of the four big striped sliders is a contradiction. Push it left for one side, right for the other, or leave it in the middle to hear BOTH, which is where Venturi says the life is. HARMONY clashes a major and a minor chord on the same root. METRE runs a four-beat and a three-beat pattern against each other. SURFACE plays your sample clean and distorted. TIME plays straight and swung hats together. MESSY VITALITY adds stray fragments, fills and wrong notes. MORE IS NOT LESS adds another layer each press (a tune, a voice, a texture); a fourth press clears them, because less is a bore. Drop in your own samples: the first is chopped, the second becomes the three-beat hits.","fonts":"family=Archivo:wght@500;800;900","bpm":104,
"manifesto":{"name":"Complexity and Contradiction in Architecture (Nonstraightforward Architecture: A Gentle Manifesto)","short":"A Gentle Manifesto","author":"Robert Venturi","year":"1966","where":"opening chapter of the book, published by the Museum of Modern Art, New York","ideas":["Against the 'puritanically moral' purity of orthodox Modern architecture.","Prefer the hybrid, ambiguous and inconsistent: 'both-and' rather than 'either-or'.","A building's richness comes from holding contradictions together, not resolving them away."],"quotes":["I am for messy vitality over obvious unity.","More is not less.","Blatant simplification means bland architecture. Less is a bore."],"system":"Every control is a contradiction, and none of them make you choose. Each slider blends two opposing layers, and the middle position plays both together, so the music lives in the clash. MESSY VITALITY lets in stray, inconsistent events, and MORE IS NOT LESS keeps piling on layers."},
"design":{"name":"Supergraphics (Barbara Stauffacher Solomon)","short":"Supergraphics","who":"Barbara Stauffacher Solomon, American designer and landscape architect trained in Basel in Swiss modernism","era":"San Francisco and The Sea Ranch, California, mid 1960s onwards","hallmarks":["Room-sized stripes, circles, arrows and cropped Helvetica letters painted straight onto walls","Flat primary red, blue and yellow with black on white","Graphics that wrap round corners and across ceilings, so the paint changes how the space feels"],"works":["Supergraphics for the Moonraker Athletic Center at The Sea Ranch, California (1966 to 1967)","The Sea Ranch ram's-horn logo","Green Architecture and the Agrarian Garden (book, 1988)"]}}
*/
/*CSS
:root{--bg:#fff;--fg:#111;--acc:#e4002b;--bar-font:'Archivo',Helvetica,Arial,sans-serif;--head-font:'Archivo',Helvetica,Arial,sans-serif;--learn-font:'Archivo',Helvetica,Arial,sans-serif}
#mm-bar{background:#111;color:#fff;font-weight:800}
#mm-stage{background:#fff;overflow:hidden}#cv{position:absolute;inset:0;width:100%;height:100%}
#panel{position:absolute;left:0;right:0;bottom:0;height:178px;background:#fff;border-top:10px solid #111;display:grid;grid-template-columns:repeat(4,1fr) 1.1fr;font-family:'Archivo',Helvetica,Arial,sans-serif}
.pair{padding:12px 16px 10px;border-right:4px solid #111;display:flex;flex-direction:column;justify-content:space-between}
.pair .k{font:900 26px/0.9 'Archivo',Helvetica,sans-serif;letter-spacing:-.02em;text-transform:uppercase}
.pair .ends{display:flex;justify-content:space-between;font:800 12px/1 'Archivo';letter-spacing:.08em;text-transform:uppercase}
.pair .st{font:800 13px 'Archivo';letter-spacing:.1em;text-align:center}
.pair input{-webkit-appearance:none;appearance:none;width:100%;height:34px;background:linear-gradient(90deg,var(--a) 0 50%,var(--b) 50% 100%);outline:0;margin:6px 0;cursor:pointer}
.pair input::-webkit-slider-thumb{-webkit-appearance:none;width:22px;height:48px;background:#111;border:4px solid #fff;outline:3px solid #111}
.side{padding:12px 16px;display:flex;flex-direction:column;gap:8px;justify-content:space-between}
.side .k{font:900 22px/0.9 'Archivo';text-transform:uppercase}
.side input{width:100%;accent-color:#111;height:22px}
#more{font:900 20px/1 'Archivo';text-transform:uppercase;background:#e4002b;color:#fff;border:0;padding:12px 10px;cursor:pointer;text-align:left}
#more:active{background:#111}#ly{font:800 12px 'Archivo';letter-spacing:.08em}
*/
/*HTML
<canvas id="cv"></canvas>
<div id="panel">
 <div class="pair" style="--a:#e4002b;--b:#0047bb"><div class="k">Harmony</div><input id="p0" type="range" min="0" max="1" step="0.01" value="0.5"><div class="ends"><span>Major</span><span>Minor</span></div><div class="st" id="s0">BOTH-AND</div></div>
 <div class="pair" style="--a:#ffd100;--b:#111"><div class="k">Metre</div><input id="p1" type="range" min="0" max="1" step="0.01" value="0.5"><div class="ends"><span>Four</span><span>Three</span></div><div class="st" id="s1">BOTH-AND</div></div>
 <div class="pair" style="--a:#0047bb;--b:#e4002b"><div class="k">Surface</div><input id="p2" type="range" min="0" max="1" step="0.01" value="0.3"><div class="ends"><span>Clean</span><span>Dirty</span></div><div class="st" id="s2">BOTH-AND</div></div>
 <div class="pair" style="--a:#111;--b:#ffd100"><div class="k">Time</div><input id="p3" type="range" min="0" max="1" step="0.01" value="0.5"><div class="ends"><span>Straight</span><span>Swung</span></div><div class="st" id="s3">BOTH-AND</div></div>
 <div class="side"><div class="k">Messy vitality</div><input id="mess" type="range" min="0" max="1" step="0.01" value="0.3"><button id="more">More is not less +</button><div id="ly">EXTRA LAYERS: 0</div></div>
</div>
*/
const P = [0.5, 0.5, 0.3, 0.5], NAMES = [['MAJOR', 'MINOR'], ['FOUR', 'THREE'], ['CLEAN', 'DIRTY'], ['STRAIGHT', 'SWUNG']];
let mess = 0.3, extra = 0, dirty = null, chord = 0;
const hit = { a: 0, b: 0, k: 0, t: 0, m: 0 }; // visual energy per layer
const wA = (v) => Math.cos(v * Math.PI / 2), wB = (v) => Math.sin(v * Math.PI / 2); // equal-power blend; middle = both
function label(i) { const v = P[i], s = MM.$('#s' + i); s.textContent = v < 0.2 ? 'EITHER: ' + NAMES[i][0] : v > 0.8 ? 'OR: ' + NAMES[i][1] : 'BOTH-AND'; }
P.forEach((_, i) => { const el = MM.$('#p' + i); el.value = P[i]; el.oninput = (e) => { P[i] = +e.target.value; label(i); }; label(i); });
MM.$('#mess').oninput = (e) => (mess = +e.target.value);
MM.$('#more').onclick = () => { MM.ensure(); if (!MM.playing) MM.toggle(true); extra = (extra + 1) % 4; MM.$('#ly').textContent = 'EXTRA LAYERS: ' + extra; MM.toast(extra ? ['', 'More: a tune', 'More: a voice', 'More: a texture'][extra] : 'Cleared. Less is a bore, so add more.'); };
function dirtyBus() { if (dirty) return dirty; const ctx = MM.ctx, inp = ctx.createGain(), d = MM.drive(14), bp = ctx.createBiquadFilter(), g = ctx.createGain(); bp.type = 'bandpass'; bp.frequency.value = 1400; bp.Q.value = 0.6; g.gain.value = 0.35; inp.connect(d); d.connect(bp); bp.connect(g); g.connect(MM.out); return (dirty = inp); }
const ROOTS = [48, 48, 53, 55, 48, 56, 53, 55]; // C C F G C Ab F G: the Ab is itself a contradiction
function step(i, t, sd) {
  const s = i % 16, bar = Math.floor(i / 16), root = ROOTS[bar % 8], M = mess;
  // HARMONY: a major and a minor triad on the same root, blended; in the middle both sound and the thirds rub
  if (s === 0 || s === 10) { const a = wA(P[0]), b = wB(P[0]), d = s === 0 ? sd * 8 : sd * 5;
    [0, 4, 7].forEach((n, k) => a > 0.05 && MM.tone(MM.mtof(root + 12 + n), t, d, { type: 'triangle', gain: 0.07 * a, attack: 0.01, release: 0.4, pan: -0.5 + k * 0.1 }));
    [0, 3, 7].forEach((n, k) => b > 0.05 && MM.tone(MM.mtof(root + 12 + n), t, d, { type: 'sawtooth', cutoff: 1800, gain: 0.045 * b, attack: 0.02, release: 0.4, pan: 0.5 - k * 0.1, send: { rev: 0.2 } }));
    hit.a = a; hit.b = b; chord = root; MM.tone(MM.mtof(root - 12), t, sd * 6, { type: 'sine', gain: 0.22, release: 0.3 }); }
  // METRE: four-on-the-floor kick against hits every three steps (from sample 2 if loaded)
  const four = wA(P[1]), three = wB(P[1]);
  if (s % 4 === 0 && four > 0.05) { MM.play(MM.fb.kick, t, { gain: 0.75 * four }); hit.k = 1; }
  if (s === 4 || s === 12) MM.play(MM.fb.snare, t, { gain: 0.35 * four });
  if (i % 3 === 0 && three > 0.05) { const B = MM.user ? MM.smp(1, 'tone') : MM.fb.tone; MM.play(B, t, { dur: Math.min(B.duration, sd * 2.5), gain: 0.5 * three, rate: MM.user ? 1 : MM.mtof(root + (i % 9 === 0 ? 7 : 0)) / 130.81, fadeOut: 0.05, pan: 0.3 }); hit.t = 1; }
  // SURFACE: the same chop of the loop, clean and distorted at once
  if (s % 2 === 0) { const B = MM.smp(0, 'loop'), sl = 16, k = (s / 2 + (Math.random() < M * 0.5 ? Math.floor(Math.random() * 8) : 0)) % sl, off = (k / sl) * B.duration, d = Math.min(sd * 2, B.duration / sl * 1.2);
    const c = wA(P[2]), x = wB(P[2]);
    if (c > 0.05) MM.play(B, t, { offset: off, dur: d, gain: 0.55 * c, fadeOut: 0.01 });
    if (x > 0.05) MM.play(B, t, { offset: off, dur: d, gain: 0.8 * x, fadeOut: 0.01, dest: dirtyBus() }); hit.m = Math.max(c, x); }
  // TIME: straight and swung hats together, so the groove argues with itself
  const st = wA(P[3]), sw = wB(P[3]);
  if (st > 0.05) MM.play(MM.fb.hat, t, { gain: (s % 2 ? 0.12 : 0.2) * st, pan: -0.4 });
  if (sw > 0.05 && s % 2 === 0) { MM.play(MM.fb.hat, t, { gain: 0.18 * sw, pan: 0.4 }); MM.play(MM.fb.hat, t + sd * 1.34, { gain: 0.12 * sw, pan: 0.4 }); }
  // MESSY VITALITY: inconsistent events that a purist would edit out
  if (Math.random() < M * 0.18) MM.tone(MM.mtof(root + 24 + MM.pick([1, 6, 10, 11, 13])), t, sd, { type: 'square', cutoff: 2600, gain: 0.04, pan: Math.random() * 2 - 1, send: { dly: 0.3 } });
  if (s === 15 && Math.random() < M) for (let q = 0; q < 3; q++) MM.play(MM.fb.snare, t + q * sd / 3, { gain: 0.15 + q * 0.07, rate: 1 + q * 0.1 });
  if (s === 8 && Math.random() < M * 0.6 && MM.user) { const B = MM.smp(bar + 1, 'loop'); MM.play(B, t, { offset: Math.random() * B.duration * 0.8, dur: sd * 3, rate: MM.pick([0.5, 1, 1.5]), gain: 0.35, fadeOut: 0.05, send: { rev: 0.4 } }); }
  // MORE IS NOT LESS: extra layers pile up
  if (extra >= 1 && s % 3 === 1) MM.tone(MM.mtof(MM.deg((i * 5) % 11, MM.pick(['major', 'minor']), root + 24)), t, sd * 1.5, { type: 'triangle', gain: 0.07, send: { dly: 0.25 } });
  if (extra >= 2 && s === 6) MM.play(MM.fb.voice, t, { rate: MM.mtof(root + 12) / 150 * 1.0, gain: 0.5, send: { rev: 0.4 } });
  if (extra >= 3 && s === 0 && bar % 2 === 0) MM.play(MM.fb.texture, t, { gain: 0.4, dur: sd * 30, fadeIn: 0.5, fadeOut: 1, send: { rev: 0.3 } });
}
const C = MM.canvas('#cv'), RED = '#e4002b', BLUE = '#0047bb', YEL = '#ffd100', BLK = '#111';
function wall(g, w, h, side, ts) {
  // one wall of the room, drawn flat; the caller skews it into perspective. Stripes continue across the corner.
  const off = side ? w : 0, beat = MM.now * MM.bpm / 60;
  const bands = [[RED, 0.07 + 0.06 * hit.a * wA(P[0])], [BLUE, 0.07 + 0.06 * hit.b * wB(P[0])], [YEL, 0.05 + 0.05 * hit.t], [BLK, 0.025 + 0.02 * hit.k]];
  let y = h * 0.22; bands.forEach(([c, th], k) => { g.fillStyle = c; g.beginPath(); const tilt = (P[k] - 0.5) * 0.5; g.moveTo(-off, y + tilt * -off); g.lineTo(2 * w - off, y + tilt * (2 * w - off)); g.lineTo(2 * w - off, y + th * h + tilt * (2 * w - off)); g.lineTo(-off, y + th * h + tilt * -off); g.fill(); y += th * h + h * 0.025; });
  // giant cropped letters: BOTH on one wall, AND on the other, with a hyphen bridging the corner
  g.fillStyle = BLK; g.font = `900 ${Math.round(h * 0.42)}px Archivo, Helvetica, Arial`; g.textBaseline = 'alphabetic';
  g.fillText(side ? 'AND' : 'BOTH', side ? w * 0.08 : w * 0.02, h * 0.97 + (side ? hit.k : hit.m) * 6);
  // a supergraphic circle and an arrow
  g.fillStyle = side ? RED : YEL; g.beginPath(); g.arc(side ? w * 0.78 : w * 0.85, h * 0.12, h * (0.1 + 0.05 * (side ? hit.a : hit.t)), 0, Math.PI * 2); g.fill();
  if (extra) { g.fillStyle = BLUE; const ax = side ? w * 0.45 : w * 0.35, ay = h * 0.1; for (let k = 0; k < extra; k++) { g.beginPath(); g.moveTo(ax + k * 40, ay); g.lineTo(ax + k * 40 + 30, ay + 22); g.lineTo(ax + k * 40, ay + 44); g.fill(); } }
}
MM.init({ bpm: 104, div: 4, step,
  start() { dirtyBus(); }, onSamples() { MM.toast('Sample 1 is chopped; sample 2 plays the three-beat'); },
  draw(ts) { C.fit(); const g = C.g, W = C.w, H = C.h - 178; g.setTransform(1, 0, 0, 1, 0, 0); const d = Math.min(2, devicePixelRatio || 1); g.setTransform(d, 0, 0, d, 0, 0);
    g.fillStyle = '#fff'; g.fillRect(0, 0, C.w, C.h); const cx = W * 0.5 + (P[1] - 0.5) * 60, rise = H * 0.06;
    // left wall: skewed up towards the corner; right wall: down from it
    g.save(); g.beginPath(); g.moveTo(0, rise); g.lineTo(cx, 0); g.lineTo(cx, H); g.lineTo(0, H - rise); g.clip(); g.transform(1, -rise / cx, 0, 1, 0, rise); wall(g, cx, H, 0, ts); g.restore();
    g.save(); g.beginPath(); g.moveTo(cx, 0); g.lineTo(W, rise); g.lineTo(W, H - rise); g.lineTo(cx, H); g.clip(); g.transform(1, rise / (W - cx), 0, 1, cx, 0); wall(g, W - cx, H, 1, ts); g.restore();
    g.strokeStyle = BLK; g.lineWidth = 3; g.beginPath(); g.moveTo(cx, 0); g.lineTo(cx, H); g.stroke();
    g.fillStyle = BLK; g.font = '800 13px Archivo, Helvetica'; g.fillText(`LESS IS A BORE · ${MM.playing ? 'NOW: ' + ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'][chord % 12] + (P[0] > 0.2 && P[0] < 0.8 ? ' MAJOR AND MINOR' : P[0] <= 0.2 ? ' MAJOR' : ' MINOR') : 'PRESS PLAY'}`, 14, 22);
    for (const k in hit) hit[k] *= 0.93; }
});
