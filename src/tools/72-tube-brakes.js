/*META
{"title":"Tube Brakes","deep":true,"category":"Fred","date":"2026-10-31","kicker":"WHAT WOULD FRED AGAIN.. DO? · THE UGLY SOUND, AUTO-TUNED, OVER THE ROOM","bpm":128,
"idea":"Fred again.. said he had sampled the London Underground 'loads': the ugly screech when a tube train brakes becomes 'quite beautiful' through auto-tune, and every tune he makes has the room it was made in quietly underneath. This is that method as an instrument. Load any found noise (a brake, a kettle, a door hinge, a gull, a squeaky trolley) and a pitch tracker follows it. A retuner snaps it to your key, either hard and robotic or gently, or makes it sing a riff or the chord tones. A room recording runs under everything through a phone-style squash that 'amplifies the room', and house or two-step garage drums, pumping chords and an intro, build, drop and break arrangement sit on top.",
"controls":"6 slots (found sound, room tone, kick, clap, hats, keys); retune: mode (nearest note, chord tones, riff, MIDI), correction, retune speed, range, key and scale, harmony voices, time stretch, grain size, hook every N bars; room: level, phone squash, pump; drums: house or two-step, swing, density; chords: progression and style; arrangement auto or manual (intro, build, drop, break); reverb and delay; pitch-track display showing the raw and tuned lines.",
"how":"Press PLAY. The built-in 'tube brake' squeal is already being auto-tuned in A minor over a room recording and a house beat. Load your own found noise into slot 1 (or drop it on the page) and a room recording into slot 2. Turn CORRECTION down to hear the raw sound, and RETUNE SPEED up for the hard robotic snap. T changes the tune mode, H fires the hook now, 1 to 4 pick intro, build, drop and break, A toggles the automatic arrangement, P switches the phone squash and G switches house and two-step. With MIDI, hold a note and the found sound sings that note.",
"fonts":"family=Inter:wght@300;400;600;800",
"try":["Record the ugliest sound you can find on your phone: the tube braking, a bus kneeling at a stop, a shopping trolley, a fridge door. Load it into slot 1, choose CHORD TONES and set RETUNE SPEED to 1 for the hard auto-tune effect. The squeal stops being a noise and becomes a lead line in your key.","Every Fred tune has the room it was made in underneath. Record two minutes of the place you're sitting in (a café, a platform, your kitchen) with the phone held still and nobody talking, load it into slot 2 and push PHONE SQUASH up: the quiet parts get louder, the way an iPhone's compression 'amplifies the room'.","Pick a Splice vocal one-shot or a field recording of a gull or a creaking door, set the mode to RIFF and the time stretch to 0.5. The sound keeps its own grain but sings an eight-note riff at half speed. Save it as a preset, then try the same settings with a completely different sound."],
"manifesto":{"name":"What would Fred again.. do? The tube brake through auto-tune, and the room under every tune","short":"Fred again.., tube brakes","author":"Fred again.. (Fred Gibson, b. 1993, London)","year":"2021 to 2022","where":"Interviews with NME (2021) about Actual Life and with Mixmag (his cover feature) about recording on his phone",
"ideas":["Fred again.. records much of his raw material on his phone: voice notes, videos of friends and strangers, nights out, the background noise of the places he works. He told Mixmag he records 'everything from drums, vocals, piano' on it.","He likes the phone because of what it does to the room. Studio microphones leave 'no room for the world'; the phone's heavy compression brings the background up whenever you stop talking.","He made Actual Life in public places, and in 2021 told NME that the background of the place he worked goes into every tune, even if quietly. During lockdown that meant the South Bank and the tube.","He said he had sampled the tube 'loads', and that the horrible screech of a train braking, put through auto-tune, becomes beautiful. Auto-tune snaps a pitched sound to the nearest note of a scale; set fast, it jumps between notes in the robotic way familiar from pop records.","Around those found sounds sit the things the earlier tools in this series also use: house and two-step garage drums, piano chords, and euphoric builds and drops."],
"quotes":[["That horrific ugly sound when it brakes – if you put that through auto-tune, it becomes quite beautiful.","Fred again.. on sampling the tube, NME, 2021"],["On every tune I do, even if it's quietly, I play in the background of the place where I made it.","Fred again.., NME, 2021"],["when you record something with your iPhone and stop speaking for a second, it amplifies the room around you.","Fred again.., Mixmag cover feature"]],
"system":"Slot 1 is the found sound. When it loads, a pitch tracker (an autocorrelation method like YIN) measures its pitch every 10 ms and shows it as a grey line. Playback is granular: short overlapping grains are read from the sound in order, and each grain is re-pitched by the distance between the measured pitch and the target note, so the sound keeps its timing and texture but sings in tune. The orange line is the tuned result. The target is the nearest note in your key and scale (NEAREST), the nearest note of the current chord (CHORD TONES), an eight-step riff (RIFF) or the note you hold on a MIDI keyboard (MIDI). CORRECTION sets how far each grain moves towards the target, and RETUNE SPEED sets how quickly the correction follows the sound: 1 snaps instantly (the hard, robotic effect) and low values glide. Parts with no clear pitch (noise, breath) are left alone. HARMONY adds one or two more grain streams a third and a fifth above in the scale. Slot 2, the room, loops underneath all the time through a 'phone' chain (band-limited, heavily compressed, with make-up gain), which pulls the quiet background up. The kick ducks the room and the chords (PUMP).",
"dubious":""},
"design":{"name":"Mark Farrow","short":"Mark Farrow","who":"Mark Farrow (b. 1960), British graphic designer, founder of Farrow Design (now Farrow), known for record packaging for Pet Shop Boys, Spiritualized and others","era":"1980s to now",
"hallmarks":["Reduction: lots of white space, a single strong idea, small precise sans-serif type and very little else.","Packaging treated as the idea itself, as in the medicine box and blister pack for Spiritualized: here the steps are pill pockets in a blister strip and the controls read like a dosage label.","Systematic, catalogue-like typography (numbers, codes, small capitals), with one bright accent colour."],
"works":["Spiritualized, 'Ladies and Gentlemen We Are Floating in Space' (1997), the album packaged as a prescription medicine box with a blister pack","Pet Shop Boys, 'Very' (1993), the orange, bumpy plastic CD case","Pet Shop Boys, 'Please' (1986), the small photograph on a white sleeve"]}}
*/
/*CSS
:root{--bg:#fbfbf9;--fg:#141414;--acc:#ff5a1f;--bar-bg:#fbfbf9;--bar-fg:#141414;--bar-font:'Inter',system-ui,sans-serif;--learn-font:'Inter',system-ui,sans-serif;--learn-bg:#fbfbf9;--deck-bg:#fbfbf9}
#mm-bar{border-top:1px solid #141414}
#mm-stage{display:grid;grid-template-columns:minmax(0,1fr) 300px}
#pack{position:relative;overflow:hidden;padding:28px 34px}
#lbl{display:grid;grid-template-columns:1fr auto;gap:4px 20px;border-bottom:1px solid #141414;padding-bottom:10px}
#lbl h1{margin:0;font:800 30px/1 'Inter';letter-spacing:-.02em}#lbl h1 span{color:#ff5a1f}
#lbl .sub{font:400 11px/1.4 'Inter';letter-spacing:.08em;text-transform:uppercase;color:#555}#lbl .rx{font:600 11px 'Inter';text-align:right;letter-spacing:.06em;text-transform:uppercase}
#lbl .dose{grid-column:1/3;font:300 12px 'Inter';color:#555}
#cv{position:absolute;left:34px;right:34px;top:118px;bottom:24px;width:calc(100% - 68px);height:calc(100% - 142px)}
#secs{position:absolute;right:34px;top:84px;display:flex;gap:0}#secs button{font:600 10px 'Inter';letter-spacing:.1em;border:1px solid #141414;margin-left:-1px;background:#fbfbf9;padding:4px 9px;cursor:pointer}#secs button.on{background:#141414;color:#fbfbf9}#secs button.auto.on{background:#ff5a1f;border-color:#ff5a1f}
#side{overflow:auto;padding:14px 14px;border-left:1px solid #141414;font:400 12px 'Inter'}
#side h3{font:600 10px 'Inter';letter-spacing:.16em;text-transform:uppercase;margin:14px 0 4px;padding-top:6px;border-top:1px solid #141414;display:flex;justify-content:space-between}#side h3 i{font-style:normal;color:#ff5a1f}
#side .mmx-ctl{grid-template-columns:98px 1fr 40px;font:400 11px 'Inter'}#side .mmx-ctl select{grid-column:2/4;min-width:0;font:400 11px 'Inter'}
#side .bt{display:flex;gap:4px;flex-wrap:wrap;margin:4px 0}#side .bt button{font:600 10px 'Inter';letter-spacing:.08em;border:1px solid #141414;background:none;padding:4px 8px;cursor:pointer;border-radius:12px}#side .bt button:hover{background:#ff5a1f;border-color:#ff5a1f;color:#fff}
#mm-learn-dlg{box-shadow:none;border:1px solid #141414;border-top:10px solid #ff5a1f}#mm-learn-dlg h2{font:800 26px/1.05 'Inter';letter-spacing:-.02em}
*/
/*HTML
<div id="pack"><div id="lbl"><h1>Tube Brakes <span>●</span></h1><div class="rx">Rx · 72 · after Fred again..</div><div class="sub">Found noise, auto-tuned · room tone underneath · house / two-step</div><div class="rx" id="rxkey">A minor · 128 bpm</div><div class="dose" id="dose">Dosage: one ugly sound, taken through auto-tune, over the room it was recorded in.</div></div>
<div id="secs"><button data-s="0">1 INTRO</button><button data-s="1">2 BUILD</button><button data-s="2">3 DROP</button><button data-s="3">4 BREAK</button><button class="auto" data-s="a">A AUTO</button></div>
<canvas id="cv"></canvas></div>
<div id="side"><h3>Retune <i id="mode-l"></i></h3><div class="bt"><button id="b-hook">H · HOOK NOW</button><button id="b-mode">T · MODE</button><button id="b-phone">P · PHONE</button><button id="b-groove">G · GROOVE</button></div><div id="c1"></div><h3>Hook</h3><div id="c2"></div><h3>Room</h3><div id="c3"></div><h3>Drums &amp; chords</h3><div id="c4"></div><h3>Space</h3><div id="c5"></div></div>
*/
const st = MMX.bind({ bpm: 128, root: 9, scale: 'minor', mode: 'chord', corr: 1, speed: 0.85, range: 12, harm: 1, stretch: 1, grain: 0.07, every: 2, hookGain: 0.8, roomLvl: 0.45, phone: 0.7, pump: 0.6, groove: 'house', swing: 0.12, dens: 0.55, prog: 'i-VI-III-VII', chordStyle: 'stabs', chordLvl: 0.5, auto: true, rev: 0.3, dly: 0.25 });
const NOTE = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
const MODES = [['nearest', 'NEAREST NOTE'], ['chord', 'CHORD TONES'], ['riff', 'RIFF'], ['midi', 'MIDI / HELD NOTE']];
const PROGS = { 'i-VI-III-VII': [0, 5, 2, 6], 'vi-IV-I-V': [5, 3, 0, 4], 'I-V-vi-IV': [0, 4, 5, 3], 'i-iv-VI-V': [0, 3, 5, 4], 'one chord': [0, 0, 0, 0], 'ii-V-I-I': [1, 4, 0, 0] };
const RIFF = [0, 2, 4, 2, 7, 4, 2, 1];
const SECN = ['INTRO', 'BUILD', 'DROP', 'BREAK'];
let sid = 0, N = {}, sec = 2, barN = 0, streams = [], track = null, trackFor = null, roomH = null, heldNote = null, hist = [], kickFlash = 0, cv;
const beat = () => 60 / MM.bpm;
/* ---------- pitch tracking (YIN-style difference function on a decimated copy) ---------- */
function analyse(buf) {
  const sr = buf.sampleRate, dec = Math.max(1, Math.round(sr / 11025)), fs = sr / dec, d0 = buf.getChannelData(0), d1 = buf.numberOfChannels > 1 ? buf.getChannelData(1) : null;
  const n = Math.min(Math.floor(d0.length / dec), Math.floor(fs * 40)), x = new Float32Array(n);
  for (let i = 0; i < n; i++) { let s = 0; for (let k = 0; k < dec; k++) { const j = i * dec + k; s += d0[j] + (d1 ? d1[j] : 0); } x[i] = s / dec; }
  const W = 384, tMin = Math.floor(fs / 1500), tMax = Math.ceil(fs / 70), hop = Math.round(fs * 0.01), f0 = [], cf = [], lv = [], df = new Float32Array(tMax + 2);
  for (let p = 0; p + W + tMax < n; p += hop) {
    let e = 0; for (let j = 0; j < W; j++) e += x[p + j] * x[p + j]; lv.push(Math.sqrt(e / W));
    if (e / W < 1e-6) { f0.push(0); cf.push(0); continue; }
    let run = 0; df[0] = 1; for (let t = 1; t <= tMax; t++) { let s = 0; for (let j = 0; j < W; j++) { const q = x[p + j] - x[p + j + t]; s += q * q; } run += s; df[t] = run > 0 ? (s * t) / run : 1; }
    let best = -1; for (let t = tMin; t < tMax; t++) if (df[t] < 0.22 && df[t] < df[t + 1]) { best = t; break; }
    if (best < 0) { let m = 9; for (let t = tMin; t < tMax; t++) if (df[t] < m) { m = df[t]; best = t; } if (m > 0.45) { f0.push(0); cf.push(0); continue; } }
    const a = df[best - 1] ?? df[best], b = df[best], c = df[best + 1] ?? df[best], den = a - 2 * b + c, sh = den ? (0.5 * (a - c)) / den : 0;
    f0.push(fs / (best + MM.clamp(sh, -0.5, 0.5))); cf.push(MM.clamp(1 - b, 0, 1)); }
  return { f0, cf, lv, hop: hop / fs, dur: buf.duration };
}
function getTrack() { const b = MMX.buf(0); if (trackFor !== b) { track = analyse(b); trackFor = b; } return track; }
const f2m = (f) => 69 + 12 * Math.log2(f / 440);
function scaleNotes() { const S = MM.SCALES[st.scale] || MM.SCALES.minor; return S.map((v) => (v + st.root) % 12); }
function chordPcs(bar) { const S = MM.SCALES[st.scale] || MM.SCALES.minor, d = (PROGS[st.prog] || PROGS['one chord'])[bar % 4]; return [0, 2, 4].map((k) => (st.root + S[(d + k) % S.length] + 12 * Math.floor((d + k) / S.length)) % 12); }
function nearestIn(m, pcs) { let best = m, bd = 99; for (let o = -2; o <= 2; o++) for (const pc of pcs) { const c = Math.round(m / 12) * 12 + 12 * o + pc; if (Math.abs(c - m) < bd) { bd = Math.abs(c - m); best = c; } } return best; }
function degNote(m0, steps) { const pcs = scaleNotes().slice().sort((a, b) => a - b), b = nearestIn(m0, pcs), oct = Math.floor(b / 12), idx = pcs.indexOf(((b % 12) + 12) % 12), j = idx + steps; return oct * 12 + pcs[((j % pcs.length) + pcs.length) % pcs.length] + 12 * Math.floor(j / pcs.length); }
/* target note for a grain, given its measured pitch (midi) */
function target(m, k, bar) { if (st.mode === 'nearest') return nearestIn(m, scaleNotes()); if (st.mode === 'chord') return nearestIn(m, chordPcs(bar));
  if (st.mode === 'riff') { const base = nearestIn(m, [st.root]); return degNote(base, RIFF[k % 8]); } return heldNote != null ? heldNote + 12 * Math.round((m - heldNote) / 12) : nearestIn(m, scaleNotes()); }
/* ---------- the hook: a granular, pitch-corrected read through slot 1 ---------- */
function hook(t, opts = {}) { if (MMX.S.slots[0].mute) return; const R = MMX.region(0), tr = getTrack(), len = Math.min(R.len / st.stretch, beat() * 4 * Math.max(1, st.every) - 0.05);
  streams.push({ id: ++sid, t0: t, next: t, end: t + len, src: R.a, R, tr, cur: 0, k: 0, bar: barN, gain: opts.gain ?? 1, voices: opts.voices ?? st.harm }); }
function grainTick(now) { const hz = Math.max(0.025, st.grain), hopT = hz / 2;
  streams = streams.filter((s) => s.next < s.end);
  streams.forEach((s) => { while (s.next < now + 0.15 && s.next < s.end) { const tt = s.next, srcT = s.R.a + (tt - s.t0) * st.stretch; if (srcT > s.R.z) { s.next = s.end; break; }
      const fi = Math.floor((s.R.b === MMX.S.slots[0].buf || true ? srcT : srcT) / s.tr.hop), f = s.tr.f0[fi] || 0, c = s.tr.cf[fi] || 0; let shift = 0, raw = null, tuned = null;
      if (f > 0 && c > 0.5) { const m = f2m(f), tg = target(m, Math.floor(((tt - s.t0) / beat()) * 2), s.bar), want = MM.clamp((tg - m) * st.corr, -st.range, st.range);
        s.cur += (want - s.cur) * Math.min(1, 0.04 + st.speed * st.speed); shift = s.cur; raw = m; tuned = m + shift; } else s.cur *= 0.8;
      const g = st.hookGain * s.gain * (sec === 1 ? 0.9 : 1), pan = Math.sin(tt * 0.7) * 0.15;
      for (let v = 0; v <= s.voices; v++) { const add = v === 0 ? 0 : raw != null ? degNote(Math.round(tuned), v === 1 ? 2 : 4) - Math.round(tuned) : 0, rate = Math.pow(2, (shift + add + MMX.S.slots[0].pitch) / 12);
        MM.play(s.R.b, tt, { offset: srcT, rate, dur: hz, gain: g * MMX.S.slots[0].gain * (v ? 0.4 : 0.75), fadeIn: hz / 2, fadeOut: hz / 2, pan: v ? (v === 1 ? -0.4 : 0.4) : pan, filter: MMX.S.slots[0].cut < 17500 ? { type: 'lowpass', freq: MMX.S.slots[0].cut } : null, send: { rev: st.rev * 0.6 + MMX.S.slots[0].rv, dly: st.dly * 0.5 + MMX.S.slots[0].dl }, dest: N.hook }); }
      if (raw != null || Math.random() < 0.3) { hist.push({ t: tt, raw, tuned, id: s.id }); if (hist.length > 600) hist.shift(); }
      s.next += hopT; } }); }
/* ---------- room tone: always underneath, through the phone ---------- */
function startRoom() { stopRoom(); if (MMX.S.slots[1].mute) return; roomH = MMX.fire(1, MM.now + 0.02, { loop: true, dur: 36000, gain: 1, dest: N.roomIn, fadeIn: 0.6, rev: 0, dly: 0 }); }
function stopRoom() { if (roomH) { roomH.stop(); roomH = null; } }
function setRoom() { if (!N.dry) return; const t = MM.now; N.dry.gain.setTargetAtTime(st.roomLvl * (1 - st.phone), t, 0.05); N.wet.gain.setTargetAtTime(st.roomLvl * st.phone * 1.6, t, 0.05); }
/* ---------- drums, chords, arrangement ---------- */
const PAT = { house: { k: [0, 4, 8, 12], c: [4, 12], h: [2, 6, 10, 14], g: [3, 7, 11, 15, 1, 5, 9, 13] }, 'two-step': { k: [0, 10], c: [4, 12], h: [2, 6, 10, 14], g: [3, 7, 11, 15, 9, 13] } };
function step(i, t, sd) { const s16 = i % 16, P = PAT[st.groove] || PAT.house, sw = s16 % 2 ? st.swing * sd : 0, T = t + sw;
  if (s16 === 0) { barN = Math.floor(i / 16); if (st.auto && barN > 0 && barN % 8 === 0) setSec((sec + 1) % 4); if (barN % Math.max(1, st.every) === 0) hook(T); }
  if (sec === 1 && s16 === 8 && barN % 8 === 7) MM.noise(T, sd * 8, { type: 'highpass', freq: 400, sweep: 9000, gain: 0.08, attack: sd * 7, dest: N.music });
  const drums = sec === 2 || sec === 1, kickOn = sec === 2 || (sec === 1 && barN % 8 < 6);
  if (drums) {
    if (kickOn && P.k.includes(s16)) { MMX.fire(2, T, { gain: 1 }); pump(T); kickFlash = performance.now(); }
    if (st.groove === 'two-step' && sec === 2 && s16 === 7 && barN % 2 === 1) { MMX.fire(2, T, { gain: 0.7 }); pump(T); }
    if (P.c.includes(s16)) MMX.fire(3, T, { gain: 0.8 });
    if (sec === 1 && barN % 8 >= 6 && s16 % (barN % 8 === 7 ? 1 : 2) === 0) MMX.fire(3, T, { gain: 0.25 + 0.5 * (s16 / 16) });
    if (P.h.includes(s16)) MMX.fire(4, T, { gain: 0.6 }); else if (Math.random() < st.dens * 0.6) MMX.fire(4, T, { gain: 0.18 + Math.random() * 0.2, pan: (Math.random() - 0.5) * 0.6 });
    if (P.g.includes(s16) && Math.random() < st.dens * 0.25) MMX.fire(3, T, { gain: 0.12, semis: 3 }); }
  if (sec !== 0 || s16 % 8 === 0) chords(s16, T, sd); }
function pump(t) { if (!N.music) return; const g = N.music.gain, b = beat(); g.cancelScheduledValues(t); g.setValueAtTime(1 - st.pump * 0.85, t); g.setTargetAtTime(1, t + 0.02, b * 0.22); }
function chords(s16, t, sd) { const pcs = chordPcs(barN), base = 48 + st.root - (st.root > 6 ? 12 : 0), notes = pcs.map((pc) => { let m = base + ((pc - base) % 12 + 12) % 12; return m; }).sort((a, b) => a - b);
  const style = sec === 3 || sec === 0 ? 'held' : st.chordStyle, play = (dur, g) => notes.forEach((m, k) => MMX.fire(5, t, { semis: m - 60, dur, gain: g * st.chordLvl * (k ? 0.8 : 1), pan: (k - 1) * 0.3, dest: N.music }));
  if (style === 'held' && s16 === 0) play(beat() * 4, 0.7); else if (style === 'stabs' && [2, 6, 10, 14].includes(s16)) play(sd * 1.6, 0.6); else if (style === 'pulse' && s16 % 2 === 0) play(sd * 1.5, 0.45);
  if (sec === 2 && s16 % 4 === 0 && s16 !== 4) MMX.fire(5, t, { semis: notes[0] - 72, dur: sd * 3, gain: 0.5 * st.chordLvl, dest: N.music }); }
function setSec(s) { sec = s; MM.$$('#secs button').forEach((b) => b.classList.toggle('on', b.dataset.s === String(sec) || (b.dataset.s === 'a' && st.auto))); if (N.mf) N.mf.frequency.setTargetAtTime(s === 1 ? 1200 : s === 3 ? 5000 : 20000, MM.now, s === 1 ? 2.5 : 0.2); }
/* ---------- drawing: a dosage label and a blister strip (Mark Farrow) ---------- */
function draw() { cv.fit(); const g = cv.g, W = cv.w, H = cv.h, now = MM.now; g.clearRect(0, 0, W, H);
  const gh = H * 0.56, x0 = 0, x1 = W, span = 6, tr = track;
  g.strokeStyle = '#141414'; g.lineWidth = 1; g.strokeRect(0.5, 0.5, W - 1, gh);
  const lo = 40, hi = 96, yOf = (m) => gh - ((m - lo) / (hi - lo)) * gh;
  g.font = "400 9px 'Inter'"; g.fillStyle = '#999'; const sp = scaleNotes();
  for (let m = lo; m <= hi; m++) { if (!sp.includes(((m % 12) + 12) % 12)) continue; const y = yOf(m); g.strokeStyle = m % 12 === st.root ? 'rgba(255,90,31,.35)' : 'rgba(20,20,20,.07)'; g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); if (m % 12 === st.root) g.fillText(NOTE[st.root] + (Math.floor(m / 12) - 1), 4, y - 2); }
  const xOf = (t) => x1 - ((now - t) / span) * (x1 - x0);
  [['raw', '#b9b9b9', 1.5], ['tuned', '#ff5a1f', 2.5]].forEach(([k, c, lw]) => { g.strokeStyle = c; g.lineWidth = lw; g.beginPath(); const last = {}; hist.forEach((p) => { if (p.t > now + 0.05) return; const x = xOf(p.t), L = last[p.id]; if (x < 0 || p[k] == null) { last[p.id] = null; return; } const y = yOf(p[k]); if (L && p.t - L.t < 0.12) { g.moveTo(L.x, L.y); g.lineTo(x, y); } last[p.id] = { x, y, t: p.t }; }); g.stroke(); });
  g.fillStyle = '#141414'; g.font = "600 10px 'Inter'"; g.fillText('PITCH TRACK · GREY: THE SOUND AS FOUND · ORANGE: AFTER AUTO-TUNE', 8, 14);
  // overview of the whole found sound with its detected pitch
  if (tr) { const oy = gh + 16, oh = 34; g.fillStyle = '#eee'; g.fillRect(0, oy, W, oh); const R = MMX.region(0), D = tr.dur;
    tr.lv.forEach((v, i) => { const x = (i * tr.hop / D) * W, y = Math.min(oh, v * oh * 3); g.fillStyle = tr.f0[i] ? '#141414' : '#bbb'; g.fillRect(x, oy + oh - y, Math.max(1, W / tr.lv.length), y); });
    g.strokeStyle = '#ff5a1f'; g.lineWidth = 1.5; g.strokeRect((R.a / D) * W, oy, ((R.z - R.a) / D) * W, oh);
    streams.forEach((s) => { const pos = s.R.a + Math.max(0, now - s.t0) * st.stretch; g.fillStyle = '#ff5a1f'; g.fillRect((pos / D) * W - 1, oy - 4, 2, oh + 8); });
    g.fillStyle = '#555'; g.font = "400 10px 'Inter'"; g.fillText((MMX.S.slots[0].name || 'built-in tube brake') + ' · ' + tr.f0.filter((f) => f).length + ' pitched frames of ' + tr.f0.length, 0, oy + oh + 13); }
  // blister strip: 16 pill pockets
  const by = gh + 70, bw = W / 16, pillH = Math.min(46, H - by - 30), s16 = MM.playing ? MM.S.step % 16 : -1, P = PAT[st.groove] || PAT.house;
  for (let k = 0; k < 16; k++) { const x = k * bw + bw / 2, y = by + pillH / 2, on = P.k.includes(k), cl = P.c.includes(k), cur = (s16 + 15) % 16 === k;
    g.beginPath(); g.ellipse(x, y, bw * 0.36, pillH * 0.42, 0, 0, 7); g.fillStyle = cur ? '#ff5a1f' : on ? '#141414' : cl ? '#d9d9d9' : '#fff'; g.fill(); g.strokeStyle = '#141414'; g.lineWidth = 1; g.stroke();
    g.fillStyle = cur || on ? '#fff' : '#141414'; g.font = "600 9px 'Inter'"; g.textAlign = 'center'; g.fillText(String(k + 1).padStart(2, '0'), x, y + 3); g.textAlign = 'left'; }
  g.fillStyle = '#141414'; g.font = "800 13px 'Inter'"; g.fillText(SECN[sec] + (st.auto ? ' · AUTO' : ''), 0, by + pillH + 22); g.font = "400 11px 'Inter'"; g.fillStyle = '#555';
  g.fillText(`${st.groove.toUpperCase()} · ${st.prog} · BAR ${barN + 1} · MODE ${MODES.find((m) => m[0] === st.mode)[1]} · CORRECTION ${Math.round(st.corr * 100)}% · SPEED ${st.speed.toFixed(2)}${heldNote != null ? ' · HELD ' + NOTE[heldNote % 12] : ''}`, 120, by + pillH + 22);
  MM.$('#rxkey').textContent = `${NOTE[st.root]} ${st.scale} · ${MM.bpm} bpm`; MM.$('#mode-l').textContent = MODES.find((m) => m[0] === st.mode)[1]; }
/* ---------- built-in sounds ---------- */
function mk(len, ch, fn) { const c = MM.ctx, sr = c.sampleRate, B = c.createBuffer(ch, (sr * len) | 0, sr); let pk = 0; for (let k = 0; k < ch; k++) { const d = B.getChannelData(k); for (let i = 0; i < d.length; i++) { d[i] = fn(i / sr, k); pk = Math.max(pk, Math.abs(d[i])); } } for (let k = 0; k < ch; k++) { const d = B.getChannelData(k); for (let i = 0; i < d.length; i++) d[i] *= 0.8 / (pk || 1); } return B; }
const TAU = Math.PI * 2;
function brakeBuf() { let ph = 0, ph2 = 0, lp = 0; const sr = MM.ctx.sampleRate; return mk(3.2, 1, (t) => { const f = 620 + 160 * Math.sin(t * 1.9) + 90 * Math.sin(t * 7.3) - 120 * Math.max(0, t - 2.2), am = Math.min(1, t * 6) * Math.min(1, (3.2 - t) * 3) * (0.75 + 0.25 * Math.sin(t * 23)); ph += f / sr; ph2 += (f * 2.37) / sr; lp += ((Math.random() * 2 - 1) - lp) * 0.08;
  return am * (Math.sin(TAU * ph) * 0.7 + Math.sin(TAU * ph * 2) * 0.18 + Math.sin(TAU * ph2) * 0.08) + lp * 0.35 * (0.5 + 0.5 * Math.sin(t * 3)); }); }
function roomBuf() { const lps = [0, 0], clinks = Array.from({ length: 10 }, () => [Math.random() * 7.5, 1800 + Math.random() * 2500]); let mur = 0, mp = 0; const sr = MM.ctx.sampleRate;
  return mk(8, 2, (t, k) => { lps[k] += ((Math.random() * 2 - 1) - lps[k]) * 0.012; mp += (150 + 30 * Math.sin(t * 0.8)) / sr / 2; mur = Math.sin(TAU * mp) * 0.5 * (0.5 + 0.5 * Math.sin(t * 2.1 + k)) * (Math.sin(t * 5.3) > 0.2 ? 1 : 0.3);
    let s = lps[k] * 1.4 + mur * 0.05 + Math.sin(TAU * 50 * t) * 0.02; clinks.forEach(([a, f]) => { const u = t - a; if (u > 0 && u < 0.3) s += Math.sin(TAU * f * u) * Math.exp(-u * 25) * 0.12; }); return s; }); }
function clapBuf() { let lp = 0; return mk(0.35, 1, (t) => { lp += ((Math.random() * 2 - 1) - lp) * 0.6; const e = [0, 0.011, 0.022, 0.034].reduce((s, a) => s + (t >= a ? Math.exp(-(t - a) * (a === 0.034 ? 14 : 90)) : 0), 0); return lp * e; }); }
function keysBuf() { return mk(2.4, 1, (t) => { let s = 0; for (let k = 1; k <= 7; k++) s += (Math.sin(TAU * 261.63 * k * (1 + 0.0003 * k * k) * t) / Math.pow(k, 1.5)) * Math.exp(-t * (0.9 + k * 0.5)); return s * Math.min(1, t * 400); }); }
/* ---------- setup ---------- */
const cfg = { bpm: 128, div: 4, step, tick: grainTick, draw, start: () => { barN = 0; streams = []; setRoom(); startRoom(); setSec(st.auto ? 0 : sec); }, stop: () => { stopRoom(); streams = []; },
  onSamples: (list) => MMX.assign(list),
  key: (e) => { if (MMX.key(e)) return; const k = e.key.toLowerCase();
    if (k === 'h') { MM.ensure(); hook(MM.now + 0.02); } else if (k === 't') cycleMode(); else if (k === 'p') MMX.setParam('phone', st.phone > 0.3 ? 0 : 0.8); else if (k === 'g') MMX.setParam('groove', st.groove === 'house' ? 'two-step' : 'house');
    else if (k >= '1' && k <= '4') { MMX.setParam('auto', false); setSec(+k - 1); } else if (k === 'a') { MMX.setParam('auto', !st.auto); setSec(sec); } },
  setup() { MM.ensure(); const c = MM.ctx; cv = MM.canvas('#cv');
    N.master = c.createGain(); N.master.connect(MM.out); N.mf = c.createBiquadFilter(); N.mf.type = 'lowpass'; N.mf.frequency.value = 20000; N.mf.connect(N.master);
    N.music = c.createGain(); N.music.connect(N.mf); N.hook = c.createGain(); N.hook.connect(N.mf);
    N.roomIn = c.createGain(); N.dry = c.createGain(); N.wet = c.createGain(); N.roomIn.connect(N.dry); N.dry.connect(N.music);
    const hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 280; const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 3800; const cp = c.createDynamicsCompressor(); cp.threshold.value = -48; cp.ratio.value = 20; cp.knee.value = 3; cp.attack.value = 0.003; cp.release.value = 0.12; const mk2 = c.createGain(); mk2.gain.value = 3.2;
    N.roomIn.connect(hp); hp.connect(lp); lp.connect(cp); cp.connect(mk2); mk2.connect(N.wet); N.wet.connect(N.music);
    MM.fb.brake = brakeBuf(); MM.fb.room = roomBuf(); MM.fb.clap = clapBuf(); MM.fb.keys = keysBuf();
    MMX.init({ state: st, slots: [{ label: 'Found sound (auto-tuned)', kind: 'brake', rv: 0.1 }, { label: 'Room tone (the place)', kind: 'room', rv: 0, gain: 0.9 }, { label: 'Kick', kind: 'kick', rv: 0 }, { label: 'Clap / snare', kind: 'clap', rv: 0.12 }, { label: 'Hats', kind: 'hat', rv: 0.02, gain: 0.6 }, { label: 'Keys (C4)', kind: 'keys', rv: 0.25, gain: 0.7 }],
      onSlot: (i) => { if (i === 0) { trackFor = null; getTrack(); if (MM.playing) hook(MM.now + 0.03); } if (i === 1 && MM.playing) startRoom(); },
      onPreset: () => { MM.bpm = st.bpm; setRoom(); setSec(sec); }, factory: fac(),
      keys: [['H', 'fire the hook now'], ['T', 'change the tune mode'], ['1 to 4', 'intro, build, drop, break'], ['A', 'automatic arrangement on / off'], ['P', 'phone squash on / off'], ['G', 'house / two-step']],
      midiHelp: 'Hold a note: the found sound sings that note (the mode switches to MIDI). Release and it falls back to the scale. Velocity sets the hook level.',
      midi: (n, v, on) => { if (on) { heldNote = n; if (st.mode !== 'midi') MMX.setParam('mode', 'midi'); MM.ensure(); if (!streams.length) hook(MM.now + 0.01, { gain: 0.5 + v }); } else if (heldNote === n) heldNote = null; } });
    const C1 = MM.$('#c1'), C2 = MM.$('#c2'), C3 = MM.$('#c3'), C4 = MM.$('#c4'), C5 = MM.$('#c5');
    MMX.ctl(C1, 'mode', { type: 'select', label: 'Mode (T)', options: MODES }); MMX.ctl(C1, 'corr', { label: 'Correction', min: 0, max: 1 }); MMX.ctl(C1, 'speed', { label: 'Retune speed', min: 0, max: 1 });
    MMX.ctl(C1, 'root', { type: 'select', label: 'Key', options: NOTE.map((x, k) => [k, x]) }); MMX.ctl(C1, 'scale', { type: 'select', label: 'Scale', options: ['minor', 'major', 'dorian', 'phrygian', 'lydian', 'minpent', 'penta'].map((x) => [x, x]) });
    MMX.ctl(C1, 'range', { label: 'Max shift (st)', min: 1, max: 24, step: 1 }); MMX.ctl(C1, 'harm', { label: 'Harmony voices', min: 0, max: 2, step: 1 });
    MMX.ctl(C2, 'every', { label: 'Hook every (bars)', min: 1, max: 8, step: 1 }); MMX.ctl(C2, 'stretch', { label: 'Time stretch', min: 0.25, max: 2, step: 0.05 }); MMX.ctl(C2, 'grain', { label: 'Grain (s)', min: 0.03, max: 0.2, step: 0.005 }); MMX.ctl(C2, 'hookGain', { label: 'Hook level', min: 0, max: 1.5 });
    MMX.ctl(C3, 'roomLvl', { label: 'Room level', min: 0, max: 1, on: setRoom }); MMX.ctl(C3, 'phone', { label: 'Phone squash (P)', min: 0, max: 1, on: setRoom }); MMX.ctl(C3, 'pump', { label: 'Pump (sidechain)', min: 0, max: 1 });
    MMX.ctl(C4, 'bpm', { label: 'Tempo', min: 90, max: 150, step: 1, on: (v) => (MM.bpm = v) }); MMX.ctl(C4, 'groove', { type: 'select', label: 'Groove (G)', options: [['house', 'house'], ['two-step', 'two-step garage']] }); MMX.ctl(C4, 'swing', { label: 'Swing', min: 0, max: 0.4 }); MMX.ctl(C4, 'dens', { label: 'Density', min: 0, max: 1 });
    MMX.ctl(C4, 'prog', { type: 'select', label: 'Chords', options: Object.keys(PROGS).map((x) => [x, x]) }); MMX.ctl(C4, 'chordStyle', { type: 'select', label: 'Chord style', options: [['held', 'held'], ['stabs', 'offbeat stabs'], ['pulse', 'eighth pulse']] }); MMX.ctl(C4, 'chordLvl', { label: 'Chord level', min: 0, max: 1 });
    MMX.ctl(C4, 'auto', { type: 'check', label: 'Auto arrange (A)', on: () => setSec(sec) });
    MMX.ctl(C5, 'rev', { label: 'Reverb', min: 0, max: 1 }); MMX.ctl(C5, 'dly', { label: 'Delay', min: 0, max: 1, on: () => MM.setDelay(beat() * 0.75) });
    MM.$('#b-hook').onclick = () => { MM.ensure(); hook(MM.now + 0.02); }; MM.$('#b-mode').onclick = cycleMode; MM.$('#b-phone').onclick = () => MMX.setParam('phone', st.phone > 0.3 ? 0 : 0.8); MM.$('#b-groove').onclick = () => MMX.setParam('groove', st.groove === 'house' ? 'two-step' : 'house');
    MM.$$('#secs button').forEach((b) => (b.onclick = () => { if (b.dataset.s === 'a') MMX.setParam('auto', !st.auto); else { MMX.setParam('auto', false); setSec(+b.dataset.s); } setSec(sec); }));
    getTrack(); setSec(sec); MM.setDelay(beat() * 0.75); } };
function cycleMode() { const i = MODES.findIndex((m) => m[0] === st.mode); MMX.setParam('mode', MODES[(i + 1) % MODES.length][0]); MM.toast(MODES.find((m) => m[0] === st.mode)[1]); }
function fac() { const base = JSON.parse(JSON.stringify(st)), F = (o) => ({ full: { params: Object.assign({}, base, o) } });
  return { 'Northern line (default)': {}, 'Hard tune, two-step': F({ groove: 'two-step', speed: 1, corr: 1, mode: 'nearest', bpm: 132, swing: 0.2, prog: 'vi-IV-I-V', root: 1, scale: 'minor' }), 'Gentle, natural': F({ speed: 0.25, corr: 0.6, harm: 0, phone: 0.3, chordStyle: 'held', auto: false }), 'Riff at half speed': F({ mode: 'riff', stretch: 0.5, every: 4, harm: 2, prog: 'one chord', scale: 'dorian', root: 2 }), 'Raw (no tune), all room': F({ corr: 0, roomLvl: 0.9, phone: 1, pump: 0.8, chordLvl: 0.3 }) }; }
MM.init(cfg);
