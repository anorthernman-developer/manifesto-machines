/*META
{"title":"Tide Predictor","deep":true,"gemini":false,"category":"nature/philosophy","date":"2026-10-29","kicker":"NATURE · THE TIDE AS A SUM OF CYCLES, AFTER KELVIN'S MACHINE OF 1872",
"idea":"The tide at any harbour can be predicted as a sum of a few simple cycles set by the Moon and the Sun, each with its own period, size and timing. Kelvin's tide-predicting machine (1872 to 1873) added them with pulleys and a wire. Here each cycle (constituent) is a drone, the sum is a tide-gauge melody, and the slow swing between spring and neap tides is something you can hear: the lunar and solar drones beat against each other.",
"controls":"5 slots (gauge melody, constituent drones, high-water bell, low-water note, shore); eight tidal constituents (M2, S2, N2, K2, K1, O1, M4, M6), each with amplitude, phase and on/off; five illustrative coast types (semidiurnal, mixed, diurnal, shallow-water double tides, macrotidal); time speed (tidal hours per second); drone pitch, drones at true frequency ratios or tuned to the scale, breathing drones; gauge note rate, key, scale and range; high and low water sounds; shore level and how much the water opens the filter; reverb.",
"how":"Press PLAY. The black line is the predicted tide over three days; the thin red line is now. Each row underneath is one cycle (constituent), drawn as a sparkline at the same scale, with Kelvin's pulley for it turning on the left: the tide line is just those rows added up. Click a row to switch that cycle off and see and hear the tide change. The gauge melody plays the water level as notes (higher water, higher note); the bell rings at high water. Turn on only M2 and S2 and listen: the two drones beat, the same beat that makes spring and neap tides, shown in the 30-day strip at the bottom.",
"fonts":"family=EB+Garamond:ital,wght@0,400;0,600;1,400","bpm":90,
"try":["Load a long pad or bowed note recorded at C from your Splice folder into DRONES and a mallet or kalimba note into GAUGE. Choose 'Shallow water, double high tide' and listen to the gauge melody stall and return at the top of each tide.","Switch every constituent off except M2 and S2 (click the rows), set time to 12 hours a second and drone pitch low: you will hear and see the two-week spring and neap cycle compressed into about 30 seconds.","Set drones to 'tuned to the scale' and compare with 'true ratios': in tune, the drones make a chord; at the true astronomical ratios they beat, and the beating is the tide's own interference pattern."],
"manifesto":{"name":"Nature: the tide as a sum of cycles","short":"Tidal harmonics (Kelvin)","author":"William Thomson, Lord Kelvin (1824 to 1907), building on Laplace, with the harmonic analysis method developed by Kelvin and continued by George Darwin and Arthur Doodson","year":"1872 to 1873 (first tide-predicting machine); harmonic analysis of tides from the 1860s","where":"Kelvin's first tide-predicting machine (built with Edward Roberts and Alexander Légé) is in the Science Museum, London. Later machines, such as the Doodson-Légé machine, predicted tides for ports worldwide until computers took over in the 1960s. Kelvin's lectures 'Popular Lectures and Addresses' describe the method.",
"ideas":["The tide is not one wave but many cycles added together. The Moon's pull makes a cycle of about 12 hours 25 minutes (M2); the Sun's makes one of exactly 12 hours (S2). Others come from the Moon's changing distance (N2) and the tilt of the Earth and the orbits (K1, O1, K2).","Because M2 and S2 have slightly different periods, they drift in and out of step. In step, they add up to big spring tides; out of step, they partly cancel into small neap tides. The cycle repeats about every 14.8 days. That is a beat, the same thing you hear when two strings are slightly out of tune.","Each harbour has its own mix. The shape of a coast and seabed decides how big each cycle is and when it peaks there, so some places have two tides a day, some one, and some a mix; shallow water adds overtides (M4, M6) that can give double high waters.","Measure a year of water levels at a port, find how big each cycle is and when it peaks, and you can predict that port's tides for years ahead. Kelvin's machine did the adding mechanically: a pulley for each cycle, turning at its own speed, with one wire running over them all so the wire's end traced the sum."],
"quotes":[],
"system":"The water height is h(t) = sum of A × cos(speed × t + phase) over the constituents you have switched on, where t is in hours and speed in degrees per hour (M2 28.984, S2 30.000, N2 28.440, K2 30.082, K1 15.041, O1 13.943, M4 57.968, M6 86.952). Amplitudes and phases are illustrative coast types, not real port data; do not use for navigation. Each constituent drives a looped DRONE whose pitch is its speed scaled so M2 sits at the drone pitch (true ratios) or the nearest note in the key (tuned); with breathing on, its loudness also follows its own cycle. Every gauge step the current height is mapped to a scale degree across the chosen range and plays GAUGE. High and low water are found where the height turns round and ring the bell and the low note. SHORE loops under everything, its filter opening as the water rises."},
"design":{"name":"Edward Tufte","short":"Tufte","who":"Edward R. Tufte (b. 1942), American statistician and political scientist, writer and self-publisher of books on information design","era":"1983 to 2006 (four books), and continuing",
"hallmarks":["Maximise the data-ink ratio: almost all the ink shows data, with no chartjunk, heavy gridlines or decoration.","Sparklines: small, intense, word-sized graphics set in line with text, used here for each tidal cycle.","Small multiples: the same small chart repeated with one thing changing, so the eye compares them at a glance.","Range frames, direct labels instead of legends, a warm off-white page, serif text and notes in the margin."],
"works":["'The Visual Display of Quantitative Information' (1983)","'Envisioning Information' (1990), which includes Marey's train schedule and other classics","'Beautiful Evidence' (2006), where sparklines are set out"]}}
*/
/*CSS
:root{--bg:#fffff8;--fg:#111;--acc:#a00000;--bar-bg:#fffff8;--bar-fg:#111;--bar-font:'EB Garamond',serif;--learn-font:'EB Garamond',serif;--learn-bg:#fffff8;--deck-bg:#fffff8}
#mm-bar{border-top:1px solid #111}
#mm-stage{display:grid;grid-template-columns:minmax(0,1fr) 280px}
#pic{position:relative;overflow:hidden;cursor:pointer}#cv{position:absolute;inset:0;width:100%;height:100%}
#ttl{position:absolute;left:28px;top:12px;font:400 34px/1 'EB Garamond';pointer-events:none}#ttl small{display:block;font:italic 400 15px 'EB Garamond';margin-top:4px;color:#555}
#side{overflow:auto;padding:12px 16px;border-left:1px solid #ccc;display:flex;flex-direction:column;gap:3px;font:400 14px 'EB Garamond'}
#side h3{font:italic 400 17px 'EB Garamond';margin:10px 0 2px;border-bottom:1px solid #ddd}
#side .mmx-ctl{grid-template-columns:96px 1fr 44px;font:400 13px 'EB Garamond'}#side .mmx-ctl select{grid-column:2/4;min-width:0}
.note{font:italic 13px/1.3 'EB Garamond';color:#555;margin:2px 0 4px}
.bb{font:400 14px 'EB Garamond';border:1px solid #111;background:#fffff8;padding:3px 8px;cursor:pointer;margin:2px 3px 2px 0}.bb.on{background:#111;color:#fffff8}
#mm-learn-dlg h2{font:400 36px/1.05 'EB Garamond'}
*/
/*HTML
<div id="pic"><canvas id="cv"></canvas><div id="ttl">Tide Predictor<small>the tide as a sum of cycles, after Kelvin's machine (1872)</small></div></div>
<div id="side"><div><button class="bb" id="b-sn">S · spring/neap only</button><button class="bb" id="b-all">A · all cycles</button><button class="bb" id="b-ph">P · new phases</button></div>
<h3>Coast & time</h3><div id="s1"></div><h3>Constituents</h3><div class="note">Amplitude in metres; illustrative, not for navigation.</div><div id="s2"></div><h3>Sound</h3><div id="s3"></div></div>
*/
const C = [{ k: 'M2', sp: 28.984104, name: 'principal lunar, twice a day' }, { k: 'S2', sp: 30.0, name: 'principal solar, twice a day' }, { k: 'N2', sp: 28.43973, name: 'lunar distance (elliptic)' }, { k: 'K2', sp: 30.082137, name: 'lunisolar declination, twice a day' },
  { k: 'K1', sp: 15.041069, name: 'lunisolar declination, once a day' }, { k: 'O1', sp: 13.943036, name: 'lunar declination, once a day' }, { k: 'M4', sp: 57.96821, name: 'shallow-water overtide of M2' }, { k: 'M6', sp: 86.95232, name: 'shallow-water overtide of M2' }];
const COAST = { semi: { name: 'Semidiurnal (North Sea style)', A: [1.6, 0.55, 0.32, 0.15, 0.12, 0.13, 0.05, 0.02], P: [0, 40, 340, 40, 200, 30, 120, 60] },
  mixed: { name: 'Mixed (Pacific coast style)', A: [0.58, 0.14, 0.12, 0.04, 0.37, 0.23, 0.01, 0], P: [0, 30, 340, 30, 110, 90, 0, 0] },
  diurnal: { name: 'Diurnal (Gulf of Mexico style)', A: [0.05, 0.02, 0.01, 0.01, 0.16, 0.15, 0, 0], P: [0, 10, 330, 10, 0, 350, 0, 0] },
  double: { name: 'Shallow water, double high tide', A: [1.35, 0.45, 0.25, 0.12, 0.08, 0.08, 0.28, 0.12], P: [0, 45, 340, 45, 160, 20, 250, 30] },
  macro: { name: 'Macrotidal funnel (Bay of Fundy style)', A: [5.1, 0.8, 1.0, 0.25, 0.25, 0.18, 0.08, 0.03], P: [0, 50, 330, 50, 200, 30, 90, 0] } };
const def = { bpm: 90, coast: 'semi', speed: 3, gate: 1, root: 2, scale: 'dorian', range: 2, drone: 0.4, dpitch: 110, tuned: false, breathe: true, hw: 0.6, lw: 0.6, shore: 0.25, shoreF: 0.7, verb: 0.35, gate1: true };
C.forEach((c, i) => { def['a' + i] = COAST.semi.A[i]; def['p' + i] = COAST.semi.P[i]; def['on' + i] = true; });
const st = MMX.bind(def);
const NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'], RED = '#a00000', INK = '#111', PAPER = '#fffff8', GREY = '#999';
const cv = MM.canvas('#cv'); let T = 0, lastNow = 0, N = {}, drones = [], lastH = null, lastDir = 0, events = [], nextGate = 0, lastDeg = null, cursorMarks = [], crank = C.map(() => 0), fl = { hw: 0, lw: 0, g: 0 }, cache = null;
const D2R = Math.PI / 180, amp = (i) => (st['on' + i] ? st['a' + i] : 0);
const h = (t) => C.reduce((s, c, i) => s + amp(i) * Math.cos((c.sp * t + st['p' + i]) * D2R), 0);
const hi = (i, t) => amp(i) * Math.cos((C[i].sp * t + st['p' + i]) * D2R);
const Amax = () => Math.max(0.05, C.reduce((s, c, i) => s + amp(i), 0));
const fmtT = (t) => { const d = Math.floor(t / 24), hh = Math.floor(t % 24), mm = Math.floor(((t % 1) + 1) % 1 * 60); return `day ${d + 1}, ${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`; };
/* ---------- audio ---------- */
function build() { const c = MM.ctx; N.dBus = c.createGain(); N.dLP = c.createBiquadFilter(); N.dLP.type = 'lowpass'; N.dLP.frequency.value = 1200; N.dBus.connect(N.dLP); N.dLP.connect(MM.out);
  N.bus = c.createGain(); N.bus.connect(MM.out); N.vs = c.createGain(); N.cv = c.createConvolver(); N.cv.buffer = imp(3.2); N.bus.connect(N.vs); N.dLP.connect(N.vs); N.vs.connect(N.cv); N.cv.connect(MM.out);
  N.sLP = c.createBiquadFilter(); N.sLP.type = 'lowpass'; N.sLP.frequency.value = 800; N.sG = c.createGain(); N.sLP.connect(N.sG); N.sG.connect(MM.out);
  N.cg = C.map(() => { const g = c.createGain(); g.gain.value = 0; g.connect(N.dBus); return g; }); apply(); }
function imp(sec) { const c = MM.ctx, n = (c.sampleRate * sec) | 0, b = c.createBuffer(2, n, c.sampleRate); for (let ch = 0; ch < 2; ch++) { const d = b.getChannelData(ch); for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2.8) * 0.5; } return b; }
function apply() { if (!N.bus) return; const t = MM.now; N.dBus.gain.setTargetAtTime(st.drone, t, 0.2); N.vs.gain.setTargetAtTime(st.verb, t, 0.1); N.sG.gain.setTargetAtTime(st.shore, t, 0.3); droneRates(); cache = null; }
function droneHz(i) { const f = st.dpitch * (C[i].sp / C[0].sp); if (!st.tuned) return f; const m = 12 * Math.log2(f / 440) + 69; let best = m, bd = 99; for (let n = 12; n < 120; n++) { const pc = ((n - st.root) % 12 + 12) % 12; if (!MM.SCALES[st.scale].includes(pc)) continue; if (Math.abs(n - m) < bd) { bd = Math.abs(n - m); best = n; } } return MM.mtof(best); }
function droneRates() { drones.forEach((d, i) => d && d.s && d.s.playbackRate.setTargetAtTime((droneHz(i) / MM.mtof(60)) * Math.pow(2, (MMX.S.slots[1] ? MMX.S.slots[1].pitch : 0) / 12), MM.now, 0.1)); }
function startDrones(t) { stopDrones(t); drones = C.map((c, i) => MMX.fire(1, t, { rate: droneHz(i) / MM.mtof(60), loop: true, dur: 36000, gain: 0.5, fadeIn: 1.5, pan: (i % 2 ? 0.35 : -0.35) * (i < 4 ? 1 : 0.5), dest: N.cg[i] })); }
function stopDrones(t) { drones.forEach((d) => d && d.stop(t + 0.3)); drones = []; }
function startShore(t) { if (N.shH) N.shH.stop(t); N.shH = MMX.fire(4, t, { loop: true, dur: 36000, gain: 0.8, fadeIn: 2, dest: N.sLP }); }
function tick(now) { if (!N.bus) return; const dt = Math.min(0.2, Math.max(0, now - lastNow)); lastNow = now; T += dt * st.speed; const A = Amax(), H = h(T), x = H / A;
  C.forEach((c, i) => { crank[i] = (c.sp * T + st['p' + i]) * D2R; const lv = amp(i) / A; const b = st.breathe ? 0.35 + 0.65 * (0.5 + 0.5 * Math.cos(crank[i])) : 1; N.cg[i].gain.setTargetAtTime(lv * b * 0.9, now, 0.15); });
  N.dLP.frequency.setTargetAtTime(500 + 2500 * (0.5 + 0.5 * x), now, 0.2); N.sLP.frequency.setTargetAtTime(300 + 5000 * st.shoreF * (0.5 + 0.5 * x), now, 0.2);
  // turning points: high and low water
  if (lastH != null) { const dir = Math.sign(H - lastH); if (dir && lastDir && dir !== lastDir) { const isHW = lastDir > 0; events.push({ t: T, h: H, hw: isHW }); events = events.filter((e) => T - e.t < 48);
      if (isHW) { fl.hw = performance.now(); if (st.hw > 0.01) MMX.fire(2, now + 0.02, { gain: st.hw * (0.5 + 0.5 * Math.max(0, x)), dur: 4, fadeOut: 1.5, dest: N.bus }); }
      else { fl.lw = performance.now(); if (st.lw > 0.01) MMX.fire(3, now + 0.02, { gain: st.lw * (0.5 + 0.5 * Math.max(0, -x)), dur: 3, fadeOut: 1, dest: N.bus }); } } if (dir) lastDir = dir; } lastH = H;
  // gauge melody: one note per gauge step of tidal time
  const stepS = st.gate / st.speed; if (nextGate < now - 0.3) nextGate = now + 0.05;
  while (nextGate < now + 0.15) { const Tg = T + (nextGate - now) * st.speed, xg = h(Tg) / A, steps = st.range * 7, deg = Math.round((0.5 + 0.5 * xg) * steps), m = MM.deg(deg, st.scale, 48 + st.root);
    const rising = h(Tg + 0.05) > h(Tg); if (deg !== lastDeg || !st.gate1) { MMX.fire(0, nextGate, { rate: MM.mtof(m) / MM.mtof(60), gain: deg === lastDeg ? 0.35 : 0.7, dur: Math.min(1.6, stepS * 1.6), fadeOut: 0.2, pan: rising ? 0.25 : -0.25, dest: N.bus }); fl.g = performance.now(); }
    lastDeg = deg; nextGate += Math.max(0.08, stepS); } }
/* ---------- drawing: Tufte ---------- */
function spark(g, x, y, w, hgt, fn, t0, t1, scale, col = INK, lw = 1) { g.strokeStyle = col; g.lineWidth = lw; g.beginPath(); const n = Math.max(60, Math.floor(w)); for (let j = 0; j <= n; j++) { const t = t0 + ((t1 - t0) * j) / n, v = fn(t), yy = y + hgt / 2 - (v / scale) * (hgt / 2); j ? g.lineTo(x + (w * j) / n, yy) : g.moveTo(x + (w * j) / n, yy); } g.stroke(); }
function draw() { cv.fit(); const g = cv.g, W = cv.w, H = cv.h, A = Amax(), pnow = performance.now(); g.fillStyle = PAPER; g.fillRect(0, 0, W, H);
  const L = 74, R = W - 150, t0 = T - 24, t1 = T + 48, X = (t) => L + ((t - t0) / (t1 - t0)) * (R - L);
  // 1. main tide curve with a range frame
  const my = 84, mh = Math.max(110, H * 0.3), Y = (v) => my + mh / 2 - (v / A) * (mh / 2 - 4); let mn = 1e9, mx = -1e9; for (let t = t0; t <= t1; t += 0.25) { const v = h(t); mn = Math.min(mn, v); mx = Math.max(mx, v); }
  g.strokeStyle = '#ccc'; g.lineWidth = 1; g.beginPath(); g.moveTo(L - 10, Y(mx)); g.lineTo(L - 10, Y(mn)); g.stroke(); g.fillStyle = '#555'; g.font = "13px 'EB Garamond'"; g.textAlign = 'right'; g.fillText(`${mx.toFixed(2)} m`, L - 14, Y(mx) + 4); g.fillText(`${mn.toFixed(2)} m`, L - 14, Y(mn) + 4);
  for (let d = Math.ceil(t0 / 24) * 24; d <= t1; d += 24) { g.fillStyle = '#999'; g.textAlign = 'center'; g.fillText(fmtT(d).split(',')[0], X(d), my + mh + 14); g.fillRect(X(d), my + mh + 1, 1, 4); }
  g.fillStyle = '#f2f0e4'; g.fillRect(X(T), my, R - X(T), mh); g.fillStyle = '#777'; g.font = "italic 13px 'EB Garamond'"; g.textAlign = 'left'; g.fillText('predicted', X(T) + 6, my + 12); g.textAlign = 'right'; g.fillText('past', X(T) - 6, my + 12);
  spark(g, L, my + 4, R - L, mh - 8, h, t0, t1, A, INK, 1.5);
  // direct labels at high and low water in the window
  g.font = "12px 'EB Garamond'"; g.textAlign = 'center'; let prev = h(t0), pd = 0; for (let t = t0 + 0.1; t <= t1; t += 0.1) { const v = h(t), d = Math.sign(v - prev); if (pd && d && d !== pd) { const isH = pd > 0; g.fillStyle = isH ? INK : '#777'; g.fillText(`${v.toFixed(1)}`, X(t), Y(v) + (isH ? -6 : 14)); } if (d) pd = d; prev = v; }
  g.strokeStyle = RED; g.lineWidth = 1; g.beginPath(); g.moveTo(X(T), my - 6); g.lineTo(X(T), my + mh); g.stroke(); const hn = h(T); g.fillStyle = RED; g.beginPath(); g.arc(X(T), Y(hn), 3.5, 0, 7); g.fill();
  g.textAlign = 'left'; g.font = "15px 'EB Garamond'"; g.fillStyle = INK; g.fillText(`${hn >= 0 ? '+' : ''}${hn.toFixed(2)} m`, R + 12, Y(hn) + 4); g.font = "italic 13px 'EB Garamond'"; g.fillStyle = '#555'; g.fillText(fmtT(T), R + 12, Y(hn) + 20); g.fillText(h(T + 0.05) > hn ? 'rising' : 'falling', R + 12, Y(hn) + 36);
  const ev = events[events.length - 1]; if (ev && T - ev.t < 1.2) { g.fillStyle = ev.hw ? RED : '#555'; g.fillText(ev.hw ? 'high water' : 'low water', R + 12, Y(hn) - 14); }
  // 2. small multiples: one sparkline per constituent, same vertical scale
  const sy = my + mh + 46, rows = C.length, rh = Math.max(22, Math.min(38, (H - sy - 96) / rows)); lay.rows = [];
  g.font = "italic 13px 'EB Garamond'"; g.fillStyle = '#555'; g.textAlign = 'left'; g.fillText('the same three days, one cycle at a time (same vertical scale); click a row to switch it off', L, sy - 8);
  C.forEach((c, i) => { const y = sy + i * rh, on = st['on' + i], a = st['a' + i]; lay.rows.push({ y, h: rh, i });
    // Kelvin's pulley: a wheel turning at the constituent's speed with an offset pin
    const px = 30, py = y + rh / 2, pr = Math.min(9, rh * 0.35); g.strokeStyle = on ? INK : '#ccc'; g.lineWidth = 1; g.beginPath(); g.arc(px, py, pr, 0, 7); g.stroke(); const ang = crank[i] || 0; g.fillStyle = on ? RED : '#ccc'; g.beginPath(); g.arc(px + Math.cos(ang) * pr * 0.65, py - Math.sin(ang) * pr * 0.65, 2, 0, 7); g.fill();
    g.fillStyle = on ? INK : '#bbb'; g.font = "600 14px 'EB Garamond'"; g.fillText(c.k, 46, py + 5);
    if (on && a > 0.001) spark(g, L, y + 2, R - L, rh - 4, (t) => hi(i, t), t0, t1, A, INK, 1); else { g.strokeStyle = '#ddd'; g.beginPath(); g.moveTo(L, py); g.lineTo(R, py); g.stroke(); }
    if (on && a > 0.001) { const v = hi(i, T); g.fillStyle = RED; g.beginPath(); g.arc(X(T), py - (v / A) * (rh / 2 - 2), 2.2, 0, 7); g.fill(); }
    g.fillStyle = on ? '#333' : '#bbb'; g.font = "12px 'EB Garamond'"; g.fillText(`${a.toFixed(2)} m · ${(360 / c.sp).toFixed(2)} h`, R + 12, py - 1); g.font = "italic 11px 'EB Garamond'"; g.fillStyle = '#888'; g.fillText(c.name, R + 12, py + 11); });
  // 3. spring/neap: the tidal range over 30 days
  const ny = sy + rows * rh + 22, nh = Math.max(34, H - ny - 30); if (!cache) { cache = []; for (let d = 0; d < 30 * 24; d += 1) { let a = -1e9, b = 1e9; for (let k = 0; k < 25; k += 0.5) { const v = h(d + k); a = Math.max(a, v); b = Math.min(b, v); } cache.push(a - b); } }
  const cmax = Math.max(...cache, 0.01), cmin = Math.min(...cache), crng = Math.max(0.01, cmax - cmin), base = Math.floor(T / (30 * 24)) * 30 * 24; g.strokeStyle = INK; g.lineWidth = 1; g.beginPath(); cache.forEach((v, j) => { const x = L + (j / cache.length) * (R - L), y = ny + nh - ((v - cmin) / crng) * nh; j ? g.lineTo(x, y) : g.moveTo(x, y); }); g.stroke();
  const ci = Math.floor((T - base) % (30 * 24)), cx = L + (ci / cache.length) * (R - L); g.fillStyle = RED; g.beginPath(); g.arc(cx, ny + nh - ((cache[ci] - cmin) / crng) * nh, 3, 0, 7); g.fill();
  let jx = 0; cache.forEach((v, j) => { if (v > cache[jx]) jx = j; }); g.fillStyle = '#555'; g.font = "italic 12px 'EB Garamond'"; g.textAlign = 'left'; g.textAlign = 'right'; g.fillText(cmax.toFixed(1) + ' m', L - 14, ny + 4); g.fillText(cmin.toFixed(1) + ' m', L - 14, ny + nh + 4); g.textAlign = 'left'; g.fillText('tidal range over 30 days: springs (big) and neaps (small), the M2 and S2 beat', L, ny - 6);
  g.textAlign = 'left'; g.fillStyle = '#333'; g.font = "12px 'EB Garamond'"; g.fillText(`range now ${cache[ci].toFixed(2)} m`, R + 12, ny + nh / 2); g.fillText(`beat period ${(1 / (1 / 12 - 1 / 12.4206) / 24).toFixed(1)} days`, R + 12, ny + nh / 2 + 14); }
let lay = {};
MM.drag(MM.$('#pic'), (px, py, ph) => { if (ph !== 'down') return; const r = (lay.rows || []).find((q) => py >= q.y && py < q.y + q.h); if (r) { MMX.setParam('on' + r.i, !st['on' + r.i]); MM.toast(`${C[r.i].k} ${st['on' + r.i] ? 'on' : 'off'}`); cache = null; } });
function coast(k) { const c = COAST[k]; if (!c) return; C.forEach((_, i) => { MMX.setParam('a' + i, c.A[i]); MMX.setParam('p' + i, c.P[i]); MMX.setParam('on' + i, true); }); cache = null; }
function only(keys) { C.forEach((c, i) => MMX.setParam('on' + i, keys.includes(c.k))); cache = null; }
const cfg = { bpm: 90, tick, draw, start: () => { const t = MM.now + 0.05; lastNow = MM.now; nextGate = t; lastH = null; lastDir = 0; startDrones(t); startShore(t); }, stop: () => { stopDrones(MM.now); if (N.shH) N.shH.stop(MM.now); N.shH = null; },
  onSamples: (list) => MMX.assign(list),
  key: (e) => { if (MMX.key(e)) return; const k = e.key.toLowerCase(); if (k === 's') only(['M2', 'S2']); else if (k === 'a') only(C.map((c) => c.k)); else if (k === 'p') newPhases(); else if (k === 't') MMX.setParam('tuned', !st.tuned); else if (k === 'b') MMX.setParam('breathe', !st.breathe);
    else if (/^[1-8]$/.test(e.key)) { const i = +e.key - 1; MMX.setParam('on' + i, !st['on' + i]); cache = null; } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') MMX.setParam('speed', MM.clamp(+(st.speed * (e.key === 'ArrowRight' ? 1.25 : 0.8)).toFixed(2), 0.25, 24));
    else if (k === 'j') { T += 24; } else if (k === 'w') { T += 24 * 7; MM.toast('A week later'); } },
  setup() { MM.ensure(); MM.fb.tGauge = mallet(); MM.fb.tDrone = droneBuf(); MM.fb.tBell = bell(); MM.fb.tLow = low(); MM.fb.tShore = shore(); build();
    MMX.init({ state: st, slots: [{ label: 'Gauge melody', kind: 'tGauge', rv: 0, gain: 0.8 }, { label: 'Drones', kind: 'tDrone', rv: 0, gain: 0.7 }, { label: 'High-water bell', kind: 'tBell', rv: 0, gain: 0.6 }, { label: 'Low-water note', kind: 'tLow', rv: 0, gain: 0.7 }, { label: 'Shore', kind: 'tShore', rv: 0, gain: 0.6 }],
      onSlot: (i) => { if (!MM.playing) return; if (i === 1) startDrones(MM.now + 0.05); if (i === 4) startShore(MM.now + 0.05); },
      extra: { get: () => ({ T }), set: (x) => { if (x && typeof x.T === 'number') T = x.T; cache = null; } },
      onPreset: () => { cache = null; apply(); if (MM.playing) startDrones(MM.now + 0.05); }, factory: fac(),
      keys: [['click a row', 'switch that cycle on / off'], ['1 to 8', 'switch constituent M2 ... M6'], ['S', 'only M2 and S2 (spring/neap)'], ['A', 'all cycles'], ['P', 'new phases'], ['T', 'drones: true ratios / tuned'], ['B', 'breathing drones'], ['← →', 'time slower / faster'], ['J', 'jump a day'], ['W', 'jump a week']],
      midiHelp: 'Each MIDI note sets the drone pitch (M2 sits on the note you play) and plays the gauge sound there; the other cycles follow at their own ratios.',
      midi: (n, v, on) => { if (!on) return; MMX.setParam('dpitch', +MM.mtof(n).toFixed(1)); droneRates(); MMX.fire(0, MM.now + 0.005, { rate: MM.mtof(n) / MM.mtof(60), gain: 0.3 + v * 0.6, dur: 1, dest: N.bus }); } });
    const S1 = MM.$('#s1'), S2 = MM.$('#s2'), S3 = MM.$('#s3');
    MMX.ctl(S1, 'coast', { type: 'select', label: 'Coast', options: Object.entries(COAST).map(([k, c]) => [k, c.name]), on: (v) => coast(v) });
    MMX.ctl(S1, 'speed', { label: 'Hours / second', min: 0.25, max: 24, step: 0.25, }); MMX.ctl(S1, 'gate', { type: 'select', label: 'Gauge note every', options: [[0.25, '15 minutes'], [0.5, '30 minutes'], [1, 'hour'], [2, '2 hours'], [3, '3 hours']] });
    C.forEach((c, i) => { MMX.ctl(S2, 'on' + i, { type: 'check', label: c.k + ' on', on: () => (cache = null) }); MMX.ctl(S2, 'a' + i, { label: c.k + ' amplitude', min: 0, max: i === 0 ? 6 : 2, step: 0.01, on: () => (cache = null) }); MMX.ctl(S2, 'p' + i, { label: c.k + ' phase °', min: 0, max: 359, step: 1, on: () => (cache = null) }); });
    MMX.ctl(S3, 'root', { type: 'select', label: 'Key', options: NOTES.map((x, k) => [k, x]), on: apply }); MMX.ctl(S3, 'scale', { type: 'select', label: 'Scale', options: Object.keys(MM.SCALES).map((k) => [k, k]), on: apply });
    MMX.ctl(S3, 'range', { label: 'Gauge octaves', min: 1, max: 4, step: 1 }); MMX.ctl(S3, 'gate1', { type: 'check', label: 'Only on change' }); MMX.ctl(S3, 'drone', { label: 'Drones', min: 0, max: 1, on: apply }); MMX.ctl(S3, 'dpitch', { label: 'Drone pitch (M2)', min: 30, max: 440, step: 0.5, fmt: (v) => Math.round(v) + ' Hz', on: apply });
    MMX.ctl(S3, 'tuned', { type: 'check', label: 'Tuned to scale (T)', on: apply }); MMX.ctl(S3, 'breathe', { type: 'check', label: 'Breathing (B)' }); MMX.ctl(S3, 'hw', { label: 'High-water bell', min: 0, max: 1 }); MMX.ctl(S3, 'lw', { label: 'Low-water note', min: 0, max: 1 });
    MMX.ctl(S3, 'shore', { label: 'Shore', min: 0, max: 1, on: apply }); MMX.ctl(S3, 'shoreF', { label: 'Water opens filter', min: 0, max: 1 }); MMX.ctl(S3, 'verb', { label: 'Reverb', min: 0, max: 1, on: apply });
    MM.$('#b-sn').onclick = () => only(['M2', 'S2']); MM.$('#b-all').onclick = () => only(C.map((c) => c.k)); MM.$('#b-ph').onclick = newPhases; apply(); } };
function newPhases() { C.forEach((_, i) => MMX.setParam('p' + i, (Math.random() * 360) | 0)); cache = null; MM.toast('New phases: the same cycles, a different harbour'); }
function fac() { const base = JSON.parse(JSON.stringify(st)), F = (k, o) => { const c = COAST[k], p = Object.assign({}, base, { coast: k }); C.forEach((_, i) => { p['a' + i] = c.A[i]; p['p' + i] = c.P[i]; p['on' + i] = true; }); return { full: { params: Object.assign(p, o), extra: { T: 0 } } }; };
  const sn = {}; C.forEach((c, i) => (sn['on' + i] = i < 2));
  return { 'North Sea style (default)': {}, 'Mixed, Pacific style': F('mixed', { scale: 'lydian', root: 7, speed: 2 }), 'Diurnal, one tide a day': F('diurnal', { speed: 4, scale: 'minpent', root: 9, range: 3 }), 'Double high water': F('double', { speed: 2, gate: 0.5, scale: 'major', root: 5 }),
    'Fundy, macrotidal': F('macro', { speed: 3, range: 4, dpitch: 55, drone: 0.55 }), 'Spring/neap beat': F('semi', Object.assign({ speed: 12, dpitch: 65, breathe: false, drone: 0.6, tuned: false }, sn)) }; }
/* built-in sounds, tuned to C4 where pitched */
function mk(len, fn) { const c = MM.ctx, sr = c.sampleRate, B = c.createBuffer(1, (sr * len) | 0, sr), d = B.getChannelData(0); let pk = 0; for (let i = 0; i < d.length; i++) { d[i] = fn(i / sr, i); pk = Math.max(pk, Math.abs(d[i])); } for (let i = 0; i < d.length; i++) d[i] *= 0.7 / (pk || 1); return B; }
function mallet() { const f = MM.mtof(60); return mk(2, (t) => (Math.sin(2 * Math.PI * f * t) + 0.3 * Math.sin(2 * Math.PI * f * 4 * t) * Math.exp(-t * 18) + 0.15 * Math.sin(2 * Math.PI * f * 10.1 * t) * Math.exp(-t * 40)) * Math.exp(-t * 2.2) * Math.min(1, t * 500)); }
function droneBuf() { const sr = MM.ctx.sampleRate, per = Math.round(sr / MM.mtof(60)), len = per * 1046, f = sr / per; return mk(len / sr, (t) => { let s = 0; for (let k = 1; k < 7; k++) s += Math.sin(2 * Math.PI * f * k * t) / (k * k); return s; }); }
function bell() { const f = MM.mtof(72); return mk(4, (t) => [[1, 1], [2.4, 0.4], [3.9, 0.2], [5.4, 0.1]].reduce((s, [r, a], k) => s + a * Math.sin(2 * Math.PI * f * r * t) * Math.exp(-t * (0.7 + k * 0.8)), 0) * Math.min(1, t * 300)); }
function low() { const f = MM.mtof(36); return mk(3, (t) => (Math.sin(2 * Math.PI * f * t) + 0.3 * Math.sin(4 * Math.PI * f * t)) * Math.exp(-t * 1.1) * Math.min(1, t * 60)); }
function shore() { let b = 0, p = 0; return mk(8, (t) => { b = b * 0.985 + (Math.random() * 2 - 1) * 0.015; p = 0.5 + 0.5 * Math.sin(2 * Math.PI * t / 8 - Math.PI / 2); return b * (0.3 + 0.7 * p * p) * 10; }); }
MM.init(cfg);
