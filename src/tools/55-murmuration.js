/*META
{"title":"Murmuration","deep":true,"category":"nature/philosophy","date":"2026-10-27","kicker":"EMERGENCE, NATURE AND PHILOSOPHY",
"idea":"No bird leads a murmuration. Each one follows three local rules and watches about seven neighbours, and the shape of the whole flock comes out of that. Here each bird is also a sound: its height sets the pitch, its heading picks the point in your sample, and its speed sets the level.",
"controls":"4 species slots (chatter, wings, wind and call) with a mix for each; flock size; Reynolds's separation, alignment and cohesion; topological (k nearest) or metric neighbours; speed, wander and wind; a predator under the mouse with strength; grain rate, length, scale, key and range; wing-wash level; MIDI notes release a flock in that key.",
"how":"Press PLAY. Up to 400 starlings fly by Craig Reynolds's three rules, and each one can trigger a short grain of sound. Move the mouse into the flock: it's a peregrine, and the birds swerve away as a wave (hold the mouse button to dive). Raise ALIGNMENT and the flock moves as one, so the sound becomes a stream. Raise SEPARATION and it scatters into a crackle. Switch NEIGHBOURS between 'k nearest' (what Ballerini and colleagues measured in real starlings) and 'radius' and listen to the flock hold together or break apart. Load your own sounds into the four species slots and set how many birds each one has.",
"fonts":"family=Schibsted+Grotesk:wght@400;600;800","bpm":100,
"try":["Load a long field recording, a minute of rain or a crowd, into CHATTER. Each bird's heading reads from a different point in the file, so the flock scrubs through it as it turns.","Put a single sung note from your Splice folder into CALL, set SCALE to penta (pentatonic) and RANGE to 2 octaves, then sweep ALIGNMENT from 0 to 1. Disorder gives chords, and order makes the flock sing in unison.","Turn the PREDATOR up and hold the mouse down in the middle of the flock. The escape wave runs through the birds like a wave in water, and through your sample."],
"manifesto":{"name":"Emergence: the murmuration","short":"Emergence (murmuration)","author":"Craig Reynolds (1987); Ballerini, Cabibbo, Parisi and colleagues, STARFLAG (2008)","year":"1987 / 2008","where":"Reynolds, 'Flocks, Herds, and Schools: A Distributed Behavioral Model', SIGGRAPH 1987; Ballerini et al., 'Interaction ruling animal collective behavior depends on topological rather than metric distance', PNAS 105(4), 2008",
"ideas":["Emergence: complex group behaviour can come from simple local rules, with no leader and no plan.","Reynolds's three rules, in order of priority: Collision Avoidance (don't crash), Velocity Matching (fly like your neighbours) and Flock Centering (stay close to them).","Starlings in Rome were filmed in 3D by the STARFLAG team. Each bird follows a fixed number of neighbours, not every bird within a fixed distance, so the flock stays together when it thins out.","A murmuration has no centre, yet it reacts as a whole. A turn spreads through the flock faster than any single bird could signal it.","A musical question: what if each player only listened to the players nearest them?"],
"quotes":[["the birds choose their own course","Craig Reynolds, 'Flocks, Herds, and Schools: A Distributed Behavioral Model', 1987"],["The aggregate motion of the simulated flock is the result of the dense interaction of the relatively simple behaviors of the individual simulated birds.","Craig Reynolds, 1987 (abstract)"],["each bird interacts on average with a fixed number of neighbors (six–seven), rather than with all neighbors within a fixed metric distance","Ballerini et al., PNAS, 2008 (abstract)"]],
"system":"Each bird looks at its k nearest neighbours (or every bird within a radius). It steers away from any that are too close, turns towards their average heading, and moves towards their centre, with wander, a wind and the predator added. Sound is a grain cloud: every grain is one bird. Its species picks the slot, its height picks a scale degree, its heading picks the point in the sample, its x position sets the pan, its speed sets the level and its depth sets the reverb. Wing-wash is a looped bed whose level follows how fast and how ordered the flock is."},
"design":{"name":"Muriel Cooper","short":"Muriel Cooper","who":"Muriel Cooper (1925 to 1994), first design director of the MIT Press, co-founder of the Visible Language Workshop and founding faculty member of the MIT Media Lab","era":"MIT, 1950s to 1994",
"hallmarks":["Information Landscapes: translucent, layered type floating in a deep, zoomable 3D space","Seven vertical bars, the MIT Press colophon, abstract book spines spelling 'mitp'","Overlapping translucent colour and the computer used as a design medium, not just a production tool"],
"works":["The MIT Press colophon (1964, in use from 1965), now in MoMA's collection","Bauhaus by Hans M. Wingler (MIT Press, 1969)","Information Landscapes, with David Small and others at the Visible Language Workshop, presented at TED5 (1994)"]}}
*/
/*CSS
:root{--bg:#07080d;--fg:#e8ecf5;--acc:#ff3b2f;--bar-font:'Schibsted Grotesk',Helvetica,sans-serif;--head-font:'Schibsted Grotesk',Helvetica,sans-serif;--learn-font:'Schibsted Grotesk',Helvetica,sans-serif}
#mm-bar{background:#000;color:#fff}#mm-bar button.on{background:var(--acc)}
#mm-stage{display:grid;grid-template-columns:minmax(0,1fr) 320px;font-family:'Schibsted Grotesk',sans-serif;background:var(--bg);color:var(--fg)}
#viz{position:relative;overflow:hidden;cursor:crosshair}#cv{position:absolute;inset:0;width:100%;height:100%}
#logo{position:absolute;left:22px;top:18px;display:flex;gap:5px;align-items:flex-start;pointer-events:none}#logo i{display:block;width:9px;background:#fff}
#ttl{position:absolute;left:22px;top:84px;font:800 40px/1 'Schibsted Grotesk';letter-spacing:-.02em;color:rgba(255,255,255,.9);pointer-events:none}#ttl small{display:block;font:400 13px 'Schibsted Grotesk';color:rgba(255,255,255,.6);margin-top:6px}
#side{overflow:auto;padding:12px 16px;background:rgba(255,255,255,.04);border-left:1px solid rgba(255,255,255,.15)}
#side h3{font:800 11px 'Schibsted Grotesk';letter-spacing:.2em;margin:14px 0 4px;color:rgba(120,170,255,.9)}#side h3:nth-of-type(2){color:rgba(255,90,80,.9)}#side h3:nth-of-type(3){color:rgba(255,220,80,.9)}
#side .mmx-ctl{grid-template-columns:100px 1fr 44px;font:400 12px 'Schibsted Grotesk'}#side select{background:#111;color:#eee}
#mm-learn-dlg{background:#0b0d14;color:#e8ecf5}
*/
/*HTML
<div id="viz"><canvas id="cv"></canvas><div id="logo"><i style="height:44px"></i><i style="height:44px"></i><i style="height:30px;margin-top:14px"></i><i style="height:44px"></i><i style="height:58px;margin-top:-14px"></i><i style="height:44px"></i><i style="height:58px"></i></div><div id="ttl">Murmuration<small>No bird leads. Move the mouse to be the peregrine.</small></div></div>
<div id="side"><h3>FLOCK · REYNOLDS 1987</h3><div id="s1"></div><h3>SOUND · ONE GRAIN, ONE BIRD</h3><div id="s2"></div><h3>SPECIES MIX</h3><div id="s3"></div></div>
*/
const st = MMX.bind({ n: 220, sep: 1.4, ali: 0.9, coh: 0.6, k: 7, nmode: 'topo', radius: 70, speed: 3.2, wander: 0.25, wind: 0.1, pred: 1, rate: 22, glen: 0.12, scale: 'penta', root: 2, range: 2, quant: true, wash: 0.5, m0: 0.5, m1: 0.15, m2: 0.1, m3: 0.25, depth: 0.5 });
const cv = MM.canvas('#cv'); let B = [], mouse = { x: -1e4, y: -1e4, down: false, on: false }, order = 0, meanV = 0, gAcc = 0, washH = null, washBus = null, lastSim = 0, flashes = [];
const COL = ['rgba(120,170,255,', 'rgba(255,90,80,', 'rgba(255,220,80,', 'rgba(255,255,255,'];
function species() { const w = [st.m0, st.m1, st.m2, st.m3], s = w.reduce((a, b) => a + b, 0) || 1; let r = Math.random() * s; for (let i = 0; i < 4; i++) { if ((r -= w[i]) <= 0) return i; } return 0; }
function spawn(n, cx, cy) { cv.fit(); const W = cv.w || 900, H = cv.h || 600; cx = cx ?? W / 2; cy = cy ?? H / 2; while (B.length < n) { const a = Math.random() * 6.283; B.push({ x: cx + (Math.random() - 0.5) * W * 0.4, y: cy + (Math.random() - 0.5) * H * 0.3, z: Math.random(), vx: Math.cos(a) * 2, vy: Math.sin(a) * 2, vz: 0, sp: species(), hit: 0 }); } if (B.length > n) B.length = n; }
function remix() { B.forEach((b) => (b.sp = species())); }
function sim() { const W = cv.w, H = cv.h, N = B.length, k = st.k | 0, R2 = st.radius * st.radius, ZS = Math.min(W, H) * 0.35; let ox = 0, oy = 0, vs = 0;
  const d2 = new Float32Array(N), idx = new Int32Array(Math.max(1, k));
  for (let i = 0; i < N; i++) { const b = B[i]; let sx = 0, sy = 0, sz = 0, ax = 0, ay = 0, az = 0, cx = 0, cy = 0, cz = 0, c = 0;
    if (st.nmode === 'topo') { for (let j = 0; j < N; j++) { const o = B[j], dx = o.x - b.x, dy = o.y - b.y, dz = (o.z - b.z) * ZS; d2[j] = j === i ? 1e12 : dx * dx + dy * dy + dz * dz; }
      for (let q = 0; q < k; q++) { let m = -1, mv = 1e13; for (let j = 0; j < N; j++) if (d2[j] < mv) { mv = d2[j]; m = j; } idx[q] = m; if (m >= 0) d2[m] = 1e13; }
      for (let q = 0; q < k; q++) { const j = idx[q]; if (j < 0) continue; acc(B[j]); } }
    else for (let j = 0; j < N; j++) { if (j === i) continue; const o = B[j], dx = o.x - b.x, dy = o.y - b.y; if (dx * dx + dy * dy < R2) acc(o); }
    function acc(o) { const dx = o.x - b.x, dy = o.y - b.y, dz = (o.z - b.z) * ZS, dd = dx * dx + dy * dy + dz * dz + 1; if (dd < 400) { sx -= dx / dd * 20; sy -= dy / dd * 20; sz -= dz / dd * 20 / ZS; } ax += o.vx; ay += o.vy; az += o.vz; cx += o.x; cy += o.y; cz += o.z; c++; }
    if (c) { b.vx += sx * st.sep * 0.6 + (ax / c - b.vx) * st.ali * 0.08 + (cx / c - b.x) * st.coh * 0.0025; b.vy += sy * st.sep * 0.6 + (ay / c - b.vy) * st.ali * 0.08 + (cy / c - b.y) * st.coh * 0.0025; b.vz += sz * st.sep * 0.6 + (az / c - b.vz) * st.ali * 0.08 + (cz / c - b.z) * st.coh * 0.002; }
    // predator
    if (mouse.on && st.pred > 0) { const dx = b.x - mouse.x, dy = b.y - mouse.y, dd = Math.hypot(dx, dy) + 1, r = mouse.down ? 220 : 130; if (dd < r) { const f = st.pred * (1 - dd / r) * (mouse.down ? 2.2 : 1); b.vx += dx / dd * f; b.vy += dy / dd * f; b.hit = 1; } }
    b.vx += (Math.random() - 0.5) * st.wander + st.wind * 0.05; b.vy += (Math.random() - 0.5) * st.wander; b.vz += (Math.random() - 0.5) * st.wander * 0.004;
    // soft walls
    const m = 60; if (b.x < m) b.vx += 0.25; if (b.x > W - m) b.vx -= 0.25; if (b.y < m + 40) b.vy += 0.25; if (b.y > H - m) b.vy -= 0.25; if (b.z < 0.05) b.vz += 0.004; if (b.z > 0.95) b.vz -= 0.004;
    const v = Math.hypot(b.vx, b.vy), mx = st.speed * (b.hit ? 1.6 : 1), mn = st.speed * 0.45; if (v > mx) { b.vx *= mx / v; b.vy *= mx / v; } else if (v < mn) { b.vx *= mn / (v + 1e-6); b.vy *= mn / (v + 1e-6); } b.vz = MM.clamp(b.vz, -0.01, 0.01);
    b.x += b.vx; b.y += b.vy; b.z = MM.clamp(b.z + b.vz, 0, 1); b.hit *= 0.95; const vv = Math.hypot(b.vx, b.vy); ox += b.vx / vv; oy += b.vy / vv; vs += vv; }
  order = N ? Math.hypot(ox, oy) / N : 0; meanV = N ? vs / N : 0; }
function grain(t) { if (!B.length) return; const b = B[(Math.random() * B.length) | 0], H = cv.h || 600, W = cv.w || 900, S = MM.SCALES[st.scale] || MM.SCALES.major, n = S.length;
  const yy = 1 - MM.clamp(b.y / H, 0, 1); let semis; if (st.quant) { const d = Math.floor(yy * n * st.range); semis = 12 * Math.floor(d / n) + S[d % n] + st.root - 2; } else semis = yy * 12 * st.range + st.root - 2 - 6;
  const ang = (Math.atan2(b.vy, b.vx) + Math.PI) / 6.2832, v = Math.hypot(b.vx, b.vy) / (st.speed * 1.6);
  MMX.fire(b.sp, t, { semis: semis - 6 * (st.range > 1 ? 1 : 0), pos: ang, dur: st.glen * (0.7 + Math.random() * 0.6), gain: 0.25 + 0.6 * v + b.hit * 0.4, pan: MM.clamp((b.x / W) * 2 - 1, -1, 1) * 0.9, rev: st.depth * b.z * 0.8, fadeIn: Math.min(0.02, st.glen * 0.3), fadeOut: st.glen * 0.4 });
  flashes.push({ x: b.x, y: b.y, z: b.z, sp: b.sp, a: 1 }); if (flashes.length > 80) flashes.shift(); }
function tick(now) { const dt = 0.025; gAcc += st.rate * dt * (0.5 + meanV / st.speed * 0.6) * (1 + (mouse.down ? 1 : 0));
  while (gAcc >= 1) { gAcc -= 1; grain(now + 0.03 + Math.random() * 0.02); }
  if (washBus) { const lvl = st.wash * MM.clamp(0.25 + meanV / st.speed * 0.5 + (1 - order) * 0.3, 0, 1.3); washBus.gain.setTargetAtTime(lvl, MM.now, 0.2); } }
function startWash() { stopWash(); if (!washBus) { washBus = MM.ctx.createGain(); washBus.gain.value = 0; washBus.connect(MM.out); } washH = MMX.fire(1, MM.now + 0.05, { loop: true, dur: 36000, dest: washBus, fadeIn: 1.5, gain: 0.8 }); }
function stopWash() { if (washH) washH.stop(); washH = null; }
function draw() { cv.fit(); const g = cv.g, W = cv.w, H = cv.h; const now = performance.now(); if (now - lastSim > 30) { lastSim = now; if (!B.length || B.length !== (st.n | 0)) spawn(st.n | 0); sim(); }
  g.fillStyle = 'rgba(7,8,13,0.35)'; g.fillRect(0, 0, W, H);
  // Information Landscapes: translucent type floating at depths
  g.save(); g.textBaseline = 'alphabetic'; const L = [['SEPARATION ' + st.sep.toFixed(2), 0.2, 0.42, 0], ['ALIGNMENT ' + st.ali.toFixed(2), 0.55, 0.62, 1], ['COHESION ' + st.coh.toFixed(2), 0.28, 0.82, 2], [(st.nmode === 'topo' ? 'k = ' + st.k : 'r = ' + st.radius + 'px'), 0.7, 0.3, 3]];
  L.forEach(([s, x, y, c], i) => { const sz = 34 + i * 18; g.font = `800 ${sz}px 'Schibsted Grotesk'`; g.fillStyle = COL[c] + '0.10)'; g.fillText(s, x * W - i * 8, y * H); });
  g.font = "800 120px 'Schibsted Grotesk'"; g.fillStyle = 'rgba(255,255,255,0.05)'; g.fillText((order * 100).toFixed(0) + '% ordered', 24, H - 30); g.restore();
  B.forEach((b) => { const s = 0.6 + b.z * 1.8, a = 0.35 + b.z * 0.6, vv = Math.hypot(b.vx, b.vy) + 1e-6, ux = b.vx / vv, uy = b.vy / vv; g.strokeStyle = COL[b.sp] + a + ')'; g.lineWidth = s; g.beginPath(); g.moveTo(b.x - ux * 4 * s, b.y - uy * 4 * s); g.lineTo(b.x + ux * 2 * s, b.y + uy * 2 * s); g.stroke(); });
  flashes.forEach((f) => { g.fillStyle = COL[f.sp] + f.a * 0.5 + ')'; g.beginPath(); g.arc(f.x, f.y, 2 + (1 - f.a) * 14, 0, 6.283); g.fill(); f.a *= 0.86; }); flashes = flashes.filter((f) => f.a > 0.05);
  if (mouse.on) { g.strokeStyle = mouse.down ? 'rgba(255,59,47,.9)' : 'rgba(255,255,255,.4)'; g.lineWidth = 1.5; g.beginPath(); g.arc(mouse.x, mouse.y, mouse.down ? 22 : 12, 0, 6.283); g.stroke(); }
  g.fillStyle = 'rgba(255,255,255,.7)'; g.font = "600 11px 'Schibsted Grotesk'"; g.fillText(`${B.length} birds · order ${order.toFixed(2)} · speed ${meanV.toFixed(1)} · ${st.nmode === 'topo' ? st.k + ' nearest neighbours' : 'radius ' + st.radius + 'px'}`, W - 360, H - 14); }
const cfg = { bpm: 100, tick, draw, start: () => { spawn(st.n | 0); startWash(); }, stop: () => stopWash(),
  onSamples: (L) => MMX.assign(L),
  key: (e) => { if (MMX.key(e)) return; const k = e.key.toLowerCase(); if (k === 't') MMX.setParam('nmode', st.nmode === 'topo' ? 'metric' : 'topo'); else if (k === 's') { B.forEach((b) => { b.vx += (Math.random() - 0.5) * 12; b.vy += (Math.random() - 0.5) * 12; b.hit = 1; }); MM.toast('Scatter'); } else if (k === 'g') { B.forEach((b) => { b.vx = 2.5; b.vy = 0; }); MM.toast('Gather: every bird faces the same way'); } else if (k === 'n') { B = []; spawn(st.n | 0); } else if (k === 'a') MMX.setParam('ali', Math.min(2, +(st.ali + 0.1).toFixed(2))); else if (k === 'z') MMX.setParam('ali', Math.max(0, +(st.ali - 0.1).toFixed(2))); },
  setup() {
    MM.fb.chirp = chirps(); MM.fb.call = callNote();
    MMX.init({ state: st, slots: [{ label: 'Chatter', kind: 'chirp', rv: 0.15 }, { label: 'Wings (wash)', kind: 'texture', rv: 0.25, cut: 6000 }, { label: 'Wind', kind: 'texture', rv: 0.4, cut: 2500 }, { label: 'Call', kind: 'call', rv: 0.35, dl: 0.15 }],
      onSlot: (i) => { if (i === 1 && MM.playing) startWash(); },
      factory: { 'Dusk over Brighton pier': {}, 'One mind (high alignment)': { params: { ali: 1.8, coh: 0.9, sep: 0.8, m3: 0.6, m0: 0.2, scale: 'major', range: 1 } }, 'Scatter (no alignment)': { params: { ali: 0.05, sep: 2.4, rate: 40, glen: 0.05 } }, 'Metric flock breaks up': { params: { nmode: 'metric', radius: 40, n: 300 } }, 'Slow singing flock': { params: { n: 90, speed: 1.6, rate: 8, glen: 0.6, m0: 0, m3: 1, scale: 'dorian', wash: 0.8 } } },
      keys: [['T', 'switch topological / metric neighbours'], ['S', 'scatter the flock'], ['G', 'gather: all birds face one way'], ['N', 'new flock'], ['A / Z', 'more / less alignment'], ['mouse', 'peregrine (hold to dive)']],
      midiHelp: 'A note sets the KEY and releases a burst of birds singing at that pitch. Velocity sets the burst size. Map any slider with MIDI learn, e.g. a fader to ALIGNMENT.',
      midi: (n, v, on) => { if (!on) return; MMX.setParam('root', ((n % 12) + 12) % 12); const c = 3 + ((v / 127) * 10) | 0; for (let i = 0; i < c; i++) grain(MM.now + i * 0.03); } });
    const A = MM.$('#s1'), Bp = MM.$('#s2'), C = MM.$('#s3');
    MMX.ctl(A, 'n', { label: 'Birds', min: 10, max: 400, step: 1 }); MMX.ctl(A, 'sep', { label: 'Separation', min: 0, max: 3, step: 0.01 }); MMX.ctl(A, 'ali', { label: 'Alignment', min: 0, max: 2, step: 0.01 }); MMX.ctl(A, 'coh', { label: 'Cohesion', min: 0, max: 2, step: 0.01 });
    MMX.ctl(A, 'nmode', { type: 'select', label: 'Neighbours', options: [['topo', 'k nearest (topological)'], ['metric', 'radius (metric)']] }); MMX.ctl(A, 'k', { label: 'k', min: 1, max: 14, step: 1 }); MMX.ctl(A, 'radius', { label: 'Radius', min: 10, max: 200, step: 1 });
    MMX.ctl(A, 'speed', { label: 'Speed', min: 0.8, max: 6, step: 0.1 }); MMX.ctl(A, 'wander', { label: 'Wander', min: 0, max: 1.5, step: 0.01 }); MMX.ctl(A, 'wind', { label: 'Wind', min: -2, max: 2, step: 0.01 }); MMX.ctl(A, 'pred', { label: 'Predator', min: 0, max: 3, step: 0.01 });
    MMX.ctl(Bp, 'rate', { label: 'Grains / sec', min: 1, max: 80, step: 1 }); MMX.ctl(Bp, 'glen', { label: 'Grain length', min: 0.02, max: 1.2, step: 0.01, fmt: (v) => (v * 1000 | 0) + 'ms' }); MMX.ctl(Bp, 'quant', { type: 'check', label: 'Quantise pitch' });
    MMX.ctl(Bp, 'scale', { type: 'select', label: 'Scale', options: Object.keys(MM.SCALES).map((k) => [k, k]) }); MMX.ctl(Bp, 'root', { type: 'select', label: 'Key', options: ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'].map((x, i) => [i, x]) });
    MMX.ctl(Bp, 'range', { label: 'Range (oct)', min: 0.25, max: 3, step: 0.25 }); MMX.ctl(Bp, 'depth', { label: 'Depth reverb', min: 0, max: 1 }); MMX.ctl(Bp, 'wash', { label: 'Wing-wash', min: 0, max: 1.2 });
    ['Chatter', 'Wings', 'Wind', 'Call'].forEach((nm, i) => MMX.ctl(C, 'm' + i, { label: nm, min: 0, max: 1, on: remix }));
    MM.drag(MM.$('#viz'), (x, y, ph) => { mouse.x = x; mouse.y = y; mouse.on = true; mouse.down = ph !== 'up'; });
    const vz = MM.$('#viz'); vz.addEventListener('pointermove', (e) => { const r = vz.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.on = true; }); vz.addEventListener('pointerleave', () => { mouse.on = false; mouse.down = false; });
    spawn(st.n | 0);
  } };
// built-in starling chatter: a run of short FM chirps and clicks, 2.4 s
function chirps() { const ctx = MM.ctx, sr = ctx.sampleRate, Bf = ctx.createBuffer(1, sr * 2.4, sr), d = Bf.getChannelData(0), R = MM.rng(7); let t = 0;
  while (t < 2.3) { const len = 0.03 + R() * 0.09, f0 = 2200 + R() * 3500, f1 = f0 * (0.6 + R() * 0.9), i0 = (t * sr) | 0, n = (len * sr) | 0, mod = 30 + R() * 120; let ph = 0;
    for (let i = 0; i < n && i0 + i < d.length; i++) { const u = i / n, f = f0 + (f1 - f0) * u + Math.sin(i / sr * mod * 6.283) * 300; ph += 6.283 * f / sr; d[i0 + i] += Math.sin(ph) * Math.sin(Math.PI * u) * 0.4; }
    if (R() < 0.3) for (let i = 0; i < 40; i++) d[Math.min(d.length - 1, i0 + i)] += (R() * 2 - 1) * 0.3 * (1 - i / 40); t += len + R() * 0.05; } return Bf; }
// built-in call: a soft whistled note on D5 with vibrato, 1.6 s
function callNote() { const ctx = MM.ctx, sr = ctx.sampleRate, Bf = ctx.createBuffer(1, sr * 1.6, sr), d = Bf.getChannelData(0), f = MM.mtof(74); let ph = 0; for (let i = 0; i < d.length; i++) { const t = i / sr; ph += 6.283 * f * (1 + 0.006 * Math.sin(t * 6.283 * 5.5)) / sr; d[i] = (Math.sin(ph) + 0.12 * Math.sin(2 * ph)) * Math.min(1, t * 20) * Math.exp(-t * 1.2) * 0.45; } return Bf; }
MM.init(cfg);
