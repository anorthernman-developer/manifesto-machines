/*META
{"title":"Gradual Process","deep":true,"category":"music theory","date":"2026-10-27","kicker":"A THEORY OF COMPOSITION",
"idea":"Set a process going and listen to it run: copies of one pattern drift out of phase (Piano Phase, It's Gonna Rain), fill in note by note (Drumming) or stretch out (Four Organs), and new patterns appear from the gaps.",
"controls":"4 slots (two keyboard voices, a tape loop and a pulse); 4 processes (phase, tape phase, additive build, augmentation); 2 to 4 voices with their own slot, octave and pan; editable 4 to 16 step pattern on a scale grid in any key; continuous or step-wise phasing with drift and hold; build and augmentation rates; chain processes; MIDI transposes.",
"how":"Press PLAY. Two copies of the pattern from Reich's Piano Phase start in unison, and the second one creeps ahead until it has moved a full step, then another, until it comes back to unison. The stripes show how far each voice has moved. Choose a PROCESS: PHASE (notes), TAPE PHASE (two copies of a sample loop at nearly the same speed, like It's Gonna Rain), ADDITIVE (notes appear one at a time in place of rests, like Drumming) or AUGMENTATION (a chord whose notes get longer and longer, like Four Organs). Edit the pattern on the grid (click a cell to set that step's note, click again for a rest). HOLD (H) freezes the drift; ← and → nudge voice 2 by a step; U returns everything to unison.",
"fonts":"family=Hanken+Grotesk:wght@400;600;800;900","bpm":144,
"try":["Load one spoken phrase, three or four seconds long, into the TAPE LOOP slot, trim START and END to a single phrase, pick TAPE PHASE and set DRIFT very low. Reich's It's Gonna Rain began with a preacher recorded in Union Square in 1964.","Put a short marimba, kalimba or pluck one-shot from your Splice folder into KEYS A and KEYS B, set both slots' PITCH so the note reads as E, and run PHASE with three voices panned left, centre and right.","Load a clap or shaker into PULSE and choose ADDITIVE with CHAIN on. The pattern builds itself one beat at a time, then the second voice starts to phase, as in Drumming."],
"manifesto":{"name":"Music as a Gradual Process","short":"Reich: Gradual Process","author":"Steve Reich (b. 1936)","year":"1968","where":"essay first published in the catalogue 'Anti-Illusion: Procedures/Materials', Whitney Museum, New York, 1969, and collected in Reich's Writings on Music",
"ideas":["Music can be a process you can hear happening, not a hidden compositional system.","Once the process is set up, it runs on its own. The composer chooses it, and then the music happens.","The process should be slow and gradual enough that you can follow every detail of it changing.","Phasing: two identical patterns, one a little faster, drift apart and back together. Reich found it by accident with two tape loops of the same phrase (It's Gonna Rain, 1965) and then played it on pianos (Piano Phase, 1967).","Resulting patterns: as the copies overlap, the ear hears new melodies that nobody plays. Drumming (1970 to 1971) also builds patterns by substituting beats for rests, and Four Organs (1970) lengthens the notes of one chord."],
"quotes":[["I am interested in perceptible processes.","Steve Reich, 'Music as a Gradual Process', 1968"],["Once the process is set up and loaded it runs by itself.","Steve Reich, 'Music as a Gradual Process', 1968"],["turning over an hour glass and watching the sand slowly run through to the bottom","Steve Reich, 'Music as a Gradual Process', 1968"]],
"system":"Voice 1 holds still. In PHASE, each other voice runs a fraction faster, either all the time or in short moves between held positions, until it's one step ahead, and the stripes show the offset. When a voice has moved round a whole pattern, the process is complete and starts again, or moves on to the next process if CHAIN is on. TAPE PHASE does the same with continuous sample loops. ADDITIVE starts each voice with one note and adds one more every few bars. AUGMENTATION stretches each note of a chord a little more every bar. You set the process and its rate, and then listen to it run."},
"design":{"name":"Anton Stankowski","short":"Anton Stankowski","who":"Anton Stankowski (1906 to 1998), German graphic designer, photographer and painter, trained in the Folkwang school in Essen and worked in Zurich and Stuttgart","era":"Zurich and Stuttgart, 1929 to the 1990s",
"hallmarks":["Making invisible processes visible: diagrams that turn forces, flows and systems into lines and fields. Here the phase offset is drawn as stripes.","Rhythmic diagonals and stepped bands of flat colour (blue, red, yellow, black) on white","Constructive, grid-based layouts with plain sans-serif type and no decoration"],
"works":["The Deutsche Bank logo, the 'slash in a square' (1974)","The Berlin city corporate design and signage (from 1968)","Look up the Stankowski Stiftung, Stuttgart, for his diagrams and paintings"]}}
*/
/*CSS
:root{--bg:#fff;--fg:#111;--acc:#e3000f;--blue:#0050b4;--yel:#ffd200;--bar-font:'Hanken Grotesk',Helvetica,Arial,sans-serif;--head-font:'Hanken Grotesk',Helvetica,sans-serif;--learn-font:'Hanken Grotesk',Helvetica,sans-serif}
#mm-bar{background:var(--blue);color:#fff;font-weight:800}#mm-bar button.on{background:var(--acc)}
#mm-stage{display:grid;grid-template-columns:minmax(0,1fr) 340px;grid-template-rows:minmax(0,1fr) 190px;font-family:'Hanken Grotesk',Helvetica,sans-serif}
#viz{position:relative}#cv{position:absolute;inset:0;width:100%;height:100%}
#hd{position:absolute;left:24px;top:18px;pointer-events:none}#hd .p{font:900 56px/0.9 'Hanken Grotesk';letter-spacing:-.03em;text-transform:uppercase}#hd .s{font:600 13px 'Hanken Grotesk';margin-top:6px;max-width:420px}
#procs{position:absolute;right:16px;top:16px;display:flex;flex-direction:column;gap:4px}#procs button{font:800 13px 'Hanken Grotesk';text-transform:uppercase;letter-spacing:.06em;background:#fff;border:3px solid #111;padding:6px 10px;cursor:pointer;text-align:left;transform:skewX(-12deg)}#procs button span{display:inline-block;transform:skewX(12deg)}#procs button.on{background:#111;color:#fff}
#side{grid-row:1/3;grid-column:2;overflow:auto;padding:12px 16px;border-left:6px solid #111;display:flex;flex-direction:column;gap:6px}
#side h3{font:900 14px 'Hanken Grotesk';letter-spacing:.1em;margin:10px 0 2px;padding:3px 8px;background:var(--yel);transform:skewX(-12deg);width:max-content}
#side .mmx-ctl{grid-template-columns:104px 1fr 44px;font:600 12px 'Hanken Grotesk'}#side .mmx-ctl select{grid-column:2/4}
.vrow{display:grid;grid-template-columns:26px 1fr 1fr 1fr;gap:4px;align-items:center;font:700 11px 'Hanken Grotesk'}.vrow b{background:#111;color:#fff;text-align:center;padding:2px 0}.vrow select,.vrow input{width:100%;font:inherit}
#pat{grid-column:1;border-top:6px solid #111;display:grid;grid-template-columns:110px 1fr;background:#fff}
#pat .lab{padding:10px;font:900 13px 'Hanken Grotesk';letter-spacing:.08em;text-transform:uppercase;border-right:3px solid #111;display:flex;flex-direction:column;gap:6px}#pat .lab button{font:800 11px 'Hanken Grotesk';border:2px solid #111;background:#fff;cursor:pointer;padding:3px}
#cells{display:grid;gap:2px;padding:6px 10px}.c{border:0;background:#f0f0f0;cursor:pointer;padding:0;font:700 9px 'Hanken Grotesk';color:#999}.c.on{background:var(--blue);color:#fff}.c.now{outline:2px solid var(--acc)}.c.root{background:#e6e6e6}.c.root.on{background:var(--blue)}
#mm-learn-dlg{box-shadow:12px 12px 0 var(--blue);border-width:6px}
*/
/*HTML
<div id="viz"><canvas id="cv"></canvas><div id="hd"><div class="p" id="pname">Phase</div><div class="s" id="pdesc"></div></div>
<div id="procs"><button data-p="phase"><span>Phase</span></button><button data-p="tape"><span>Tape phase</span></button><button data-p="additive"><span>Additive</span></button><button data-p="augment"><span>Augmentation</span></button></div></div>
<div id="side"><h3>PROCESS</h3><div id="s1"></div><h3>VOICES</h3><div id="s2"></div><h3>PATTERN</h3><div id="s3"></div></div>
<div id="pat"><div class="lab">Pattern<button id="pp">Piano Phase</button><button id="pr">random</button><button id="pc">clear</button></div><div id="cells"></div></div>
*/
const st = MMX.bind({ proc: 'phase', mode: 'stepwise', drift: 0.35, hold: 2, voices: 2, len: 12, root: 4, scale: 'dorian', addBars: 2, augRate: 0.35, chain: true, pulse: 0.35, bpm: 144, v1: 0, v2: 1, v3: 0, v4: 1, o1: 0, o2: 0, o3: -1, o4: 1, p1: -0.6, p2: 0.6, p3: 0, p4: 0.3 });
const PIANO_PHASE = [0, 1, 4, 5, 6, 1, 0, 5, 4, 1, 6, 5]; // E F# B C# D F# E C# B F# D C# in E dorian
const DESC = { phase: 'One pattern, copied. The copies run at slightly different speeds and drift a step at a time, then come back together.', tape: 'Two or more copies of one sample loop at nearly the same speed: unison, then an echo, a canon and back.', additive: 'Every voice starts with one note. Every few bars a rest becomes a note, until the pattern is whole.', augment: 'A single chord on a steady pulse. Each note lasts a little longer every bar until the chord is stretched out.' };
const NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
let pat = PIANO_PHASE.slice(), V = [], t0 = 0, cycles = 0, held = false, addMask = [], tapeVo = [], augBar = 0, lastAdd = 0, nowStep = -1, cfg;
const cv = MM.canvas('#cv');
function base() { return 60 / st.bpm / 4; }
function midi(d, oct = 0) { const S = MM.SCALES[st.scale], n = S.length, o = Math.floor(d / n); return 64 - 4 + st.root + 12 * (o + oct) + S[((d % n) + n) % n]; }
function reset() { const t = MM.now + 0.08; t0 = t; V = [0, 1, 2, 3].map((k) => ({ k, next: t, idx: 0, phase: 0, moving: false, moveLeft: 0, holdLeft: st.hold * st.len, flash: [] })); cycles = 0; augBar = 0; addMask = [0, 1, 2, 3].map(() => pat.map(() => false)); [0, 1, 2, 3].forEach((k) => { const first = pat.findIndex((x) => x >= 0); if (first >= 0) addMask[k][first] = true; }); stopTape(); if (MM.playing && st.proc === 'tape') startTape(); }
function setProc(p) { MMX.setParam('proc', p); }
function onProc() { MM.$$('#procs button').forEach((b) => b.classList.toggle('on', b.dataset.p === st.proc)); MM.$('#pname').textContent = { phase: 'Phase', tape: 'Tape phase', additive: 'Additive', augment: 'Augmentation' }[st.proc]; MM.$('#pdesc').textContent = DESC[st.proc]; if (MM.playing) reset(); }
function vo(k) { return { slot: st['v' + (k + 1)], oct: st['o' + (k + 1)], pan: st['p' + (k + 1)] }; }
function hitNote(k, d, t, dur) { const v = vo(k), m = midi(d, v.oct), rate = MM.mtof(m) / MM.mtof(64); MMX.fire(v.slot, t, { rate, dur: Math.min(dur, 4), pan: v.pan, gain: 0.7 }); V[k].flash.push([t, d]); if (V[k].flash.length > 40) V[k].flash.shift(); }
function speedFor(v) { if (v.k === 0 || held) return 1; const r = st.drift * 0.012 * (st.proc === 'phase' && st.mode === 'continuous' ? v.k : 1); if (st.mode === 'continuous' || st.proc !== 'phase') return 1 + r; return v.moving ? 1 + st.drift * 0.25 : 1; }
function done() { cycles++; MM.toast('Process complete: back in unison'); if (st.chain) { const order = ['additive', 'phase', 'augment', 'tape']; setProc(order[(order.indexOf(st.proc) + 1) % order.length]); } else reset(); }
function tick(now) {
  if (!V.length) reset(); const L = st.len, b = base();
  if (st.proc === 'tape') { tapeTick(now); return; }
  if (st.proc === 'augment') { augTick(now); return; }
  for (let k = 0; k < st.voices; k++) { const v = V[k]; if (v.next < now - 0.3) v.next = now + 0.02;
    while (v.next < now + 0.12) { const s = v.idx % L, d = pat[s];
      const play = st.proc === 'additive' ? addMask[k][s] && d >= 0 : d >= 0;
      if (play) hitNote(k, d, v.next, b * 1.8);
      if (k === 0 && st.pulse > 0.01 && v.idx % 2 === 0) MMX.fire(3, v.next, { gain: st.pulse * (s === 0 ? 1 : 0.6), pan: 0 });
      if (k === 0) { const ss = s; setTimeout(() => (nowStep = ss), Math.max(0, (v.next - MM.now) * 1000)); }
      const sp = speedFor(v), dt = b / sp; v.next += dt; v.idx++;
      if (k > 0 && st.proc !== 'additive') { v.phase += (sp - 1) * 1; // in steps
        if (st.mode === 'stepwise' && st.proc === 'phase' && !held) { if (v.moving) { if (v.phase >= v.target) { v.phase = v.target; v.moving = false; v.holdLeft = st.hold * L; } } else if (--v.holdLeft <= 0) { v.moving = true; v.target = Math.floor(v.phase + 1e-6) + 1; } }
        if (k === 1 && v.phase >= L * (st.voices > 2 ? 1 : 1) - 0.001) { V.forEach((x) => (x.phase = 0)); done(); return; } }
      if (st.proc === 'additive' && k === 0 && v.idx % L === 0 && v.idx > 0) { lastAdd++; if (lastAdd >= st.addBars) { lastAdd = 0; let any = false; for (let q = 0; q < st.voices; q++) { const free = pat.map((x, i) => (x >= 0 && !addMask[q][i] ? i : -1)).filter((i) => i >= 0); if (free.length) { addMask[q][MM.pick(free)] = true; any = true; } } if (!any) { MM.toast('Pattern complete'); if (st.chain) { setProc('phase'); return; } } } } } }
  // keep voices 2+ offset by their phase in additive mode (Drumming places voices at a fixed offset)
}
function startTape() { stopTape(); const { len } = MMX.region(2), t = MM.now + 0.05; for (let k = 0; k < Math.min(st.voices, 3); k++) { const h = MMX.fire(2, t, { loop: true, dur: 36000, pan: [-0.7, 0.7, 0][k], gain: 0.75, fadeIn: 0.05 }); tapeVo.push({ h, rate: 1, phase: 0, k }); } }
function stopTape() { tapeVo.forEach((x) => x.h && x.h.stop()); tapeVo = []; }
let lastTape = 0;
function tapeTick(now) { if (!tapeVo.length && MM.playing) startTape(); const dt = lastTape ? now - lastTape : 0; lastTape = now; const { len } = MMX.region(2), sl = MMX.S.slots[2], baseRate = Math.pow(2, sl.pitch / 12);
  tapeVo.forEach((x) => { if (!x.h) return; const r = x.k === 0 || held ? 1 : 1 + st.drift * 0.004 * x.k; x.h.s.playbackRate.setTargetAtTime(baseRate * r, now, 0.05); x.phase += dt * (r - 1) / len; if (x.k === 1 && x.phase >= 1) { tapeVo.forEach((y) => (y.phase = 0)); done(); } });
  if (st.pulse > 0.01) { const v = V[0]; while (v.next < now + 0.12) { if (v.idx % 4 === 0) MMX.fire(3, v.next, { gain: st.pulse * 0.6 }); v.next += base(); v.idx++; } } }
function augTick(now) { const v = V[0], b = base(), L = st.len; if (v.next < now - 0.3) v.next = now + 0.02;
  while (v.next < now + 0.12) { const s = v.idx % L; if (st.pulse > 0.01 && v.idx % 2 === 0) MMX.fire(3, v.next, { gain: st.pulse * 0.7 });
    if (s === 0) { augBar++; const chord = [...new Set(pat.filter((x) => x >= 0))].slice(0, 6).sort((a, c) => a - c), grow = 1 + augBar * st.augRate * 0.5;
      chord.forEach((d, j) => { const k = j % st.voices, start = v.next + Math.min(L * b * 0.9, j * b * 0.25 * (grow - 1)), dur = Math.min(b * 2 * grow * (1 + j * 0.15), L * b * 3);
        const vv = vo(k), m = midi(d, vv.oct), rate = MM.mtof(m) / MM.mtof(64), slotLen = MMX.region(vv.slot).len / rate;
        MMX.fire(vv.slot, start, { rate, dur, pan: vv.pan + (j - chord.length / 2) * 0.1, gain: 0.45, fadeIn: Math.min(0.4, dur * 0.2), fadeOut: Math.min(1, dur * 0.3), loop: dur > slotLen * 0.95 }); V[k].flash.push([start, d, dur]); if (V[k].flash.length > 40) V[k].flash.shift(); });
      if (augBar * st.augRate * 0.5 > 6) { augBar = 0; done(); return; } }
    if (s === 0) { const ss = s; setTimeout(() => (nowStep = ss), Math.max(0, (v.next - MM.now) * 1000)); }
    v.next += b; v.idx++; } }
function draw() { cv.fit(); const g = cv.g, W = cv.w, H = cv.h, L = st.len, n = st.proc === 'tape' ? Math.min(3, st.voices) : st.voices, top = 120, bandH = (H - top - 40) / n, COLS = ['#111', '#0050b4', '#e3000f', '#ffd200'];
  g.fillStyle = '#fff'; g.fillRect(0, 0, W, H);
  for (let k = 0; k < n; k++) { const y = top + k * bandH, ph = st.proc === 'tape' ? (tapeVo[k] ? tapeVo[k].phase * L : 0) : V[k] ? V[k].phase : 0, cw = (W - 48) / L;
    g.save(); g.beginPath(); g.rect(24, y, W - 48, bandH - 10); g.clip();
    for (let s = -1; s <= L; s++) { const x = 24 + ((s + ph) % L + L) % L * cw, d = pat[((s % L) + L) % L]; const on = d >= 0 && (st.proc !== 'additive' || (addMask[k] && addMask[k][((s % L) + L) % L]));
      g.fillStyle = on ? COLS[k] : '#eee'; const hh = on ? (bandH - 14) * (0.25 + 0.75 * (d + 1) / 8) : 4; g.beginPath(); g.moveTo(x + 6, y + bandH - 10); g.lineTo(x + cw * 0.85 + 6, y + bandH - 10); g.lineTo(x + cw * 0.85, y + bandH - 10 - hh); g.lineTo(x, y + bandH - 10 - hh); g.fill(); }
    g.restore();
    g.fillStyle = COLS[k]; g.font = "900 12px 'Hanken Grotesk'"; g.fillText(`VOICE ${k + 1}  ·  ${k === 0 ? 'fixed' : '+' + ph.toFixed(2) + ' steps'}`, 26, y + 12);
    if (k > 0) { g.strokeStyle = COLS[k]; g.lineWidth = 3; g.beginPath(); g.moveTo(24, y - 4); g.lineTo(24 + ph / L * (W - 48), y + bandH - 12); g.stroke(); } }
  g.fillStyle = '#111'; g.font = "800 12px 'Hanken Grotesk'"; g.fillText(`${NOTES[st.root]} ${st.scale} · ${st.len} steps · ${st.bpm} BPM · ${st.mode}${held ? ' · HELD' : ''} · cycles complete: ${cycles}`, 26, H - 14);
  MM.$$('.c.now').forEach((e) => e.classList.remove('now')); if (MM.playing && nowStep >= 0) MM.$$(`.c[data-s="${nowStep}"]`).forEach((e) => e.classList.add('now')); }
function grid() { const C = MM.$('#cells'), L = st.len, R = 10; C.innerHTML = ''; C.style.gridTemplateColumns = `repeat(${L},1fr)`; C.style.gridTemplateRows = `repeat(${R},1fr)`;
  while (pat.length < L) pat.push(-1); for (let r = R - 1; r >= 0; r--) for (let s = 0; s < L; s++) { const b = MM.h('button', { class: 'c' + (pat[s] === r ? ' on' : '') + (r % MM.SCALES[st.scale].length === 0 ? ' root' : ''), 'data-s': s, title: `step ${s + 1}: ${NOTES[(midi(r) % 12 + 12) % 12]}` }, NOTES[(midi(r) % 12 + 12) % 12]); b.onclick = () => { pat[s] = pat[s] === r ? -1 : r; grid(); }; C.append(b); } }
cfg = { bpm: 144, tick, draw, start: () => { lastTape = 0; reset(); }, stop: () => stopTape(),
  onSamples: (L) => MMX.assign(L),
  key: (e) => { if (MMX.key(e)) return; const k = e.key; if (k === 'h' || k === 'H') { held = !held; MM.toast(held ? 'Held' : 'Released'); } else if (k === 'u' || k === 'U') reset(); else if (k === 'ArrowRight' && V[1]) V[1].phase = Math.min(st.len - 0.01, V[1].phase + 1), (V[1].idx += 1); else if (k === 'ArrowLeft' && V[1]) V[1].phase = Math.max(0, V[1].phase - 1), (V[1].idx -= 1);
    else if (k === 'p' || k === 'P') { const o = ['phase', 'tape', 'additive', 'augment']; setProc(o[(o.indexOf(st.proc) + 1) % 4]); } else if (k >= '2' && k <= '4') MMX.setParam('voices', +k); else if (k === 'a' || k === 'A') MMX.setParam('drift', Math.min(1, +(st.drift + 0.05).toFixed(2))); else if (k === 'z' || k === 'Z') MMX.setParam('drift', Math.max(0.01, +(st.drift - 0.05).toFixed(2))); },
  setup() {
    MMX.init({ state: st, slots: [{ label: 'Keys A', kind: 'mallet', rv: 0.12 }, { label: 'Keys B', kind: 'mallet', rv: 0.12, pan: 0 }, { label: 'Tape loop', kind: 'voice', rv: 0.1 }, { label: 'Pulse', kind: 'hat', rv: 0.05, gain: 0.6 }],
      extra: { get: () => ({ pat: pat.slice() }), set: (x) => { if (x.pat) { pat = x.pat.slice(); grid(); } } },
      onSlot: (i) => { if (i === 2 && st.proc === 'tape' && MM.playing) startTape(); },
      factory: { 'Piano Phase (default)': {}, 'Its Gonna Rain (tape)': { params: { proc: 'tape', voices: 2, drift: 0.25, pulse: 0 } }, 'Drumming build': { params: { proc: 'additive', addBars: 1, voices: 3, pulse: 0.5, chain: true } }, 'Four Organs': { params: { proc: 'augment', bpm: 176, augRate: 0.5, voices: 4, pulse: 0.5 } } },
      keys: [['P', 'next process'], ['H', 'hold / release the drift'], ['U', 'back to unison'], ['← →', 'nudge voice 2 by a step'], ['2 3 4', 'number of voices'], ['A / Z', 'more / less drift']],
      midiHelp: 'A note transposes the whole process to that key (C = 60). Map any slider with MIDI learn, e.g. a fader to DRIFT.',
      midi: (n, v, on) => { if (on) { MMX.setParam('root', ((n % 12) + 12) % 12); grid(); } } });
    const A = MM.$('#s1'), B = MM.$('#s2'), C = MM.$('#s3');
    MMX.ctl(A, 'proc', { type: 'select', label: 'Process', options: [['phase', 'phase'], ['tape', 'tape phase'], ['additive', 'additive build'], ['augment', 'augmentation']], on: onProc });
    MMX.ctl(A, 'mode', { type: 'select', label: 'Phasing', options: [['stepwise', 'step-wise (hold, then move)'], ['continuous', 'continuous drift']] }); MMX.ctl(A, 'drift', { label: 'Drift', min: 0.01, max: 1, step: 0.01 }); MMX.ctl(A, 'hold', { label: 'Hold (bars)', min: 1, max: 16, step: 1 });
    MMX.ctl(A, 'addBars', { label: 'Add every (bars)', min: 1, max: 8, step: 1 }); MMX.ctl(A, 'augRate', { label: 'Stretch rate', min: 0.05, max: 1, step: 0.01 }); MMX.ctl(A, 'chain', { type: 'check', label: 'Chain processes' }); MMX.ctl(A, 'pulse', { label: 'Pulse level', min: 0, max: 1 });
    MMX.ctl(A, 'bpm', { label: 'Tempo', min: 60, max: 240, step: 1, on: (v) => (MM.bpm = v) });
    MMX.ctl(B, 'voices', { label: 'Voices', min: 2, max: 4, step: 1 });
    const so = [[0, 'Keys A'], [1, 'Keys B'], [2, 'Tape loop'], [3, 'Pulse']];
    for (let k = 1; k <= 4; k++) { const row = MM.h('div', { class: 'vrow' }, MM.h('b', {}, String(k))); B.append(row); MMX.ctl(row, 'v' + k, { type: 'select', label: '', options: so }); MMX.ctl(row, 'o' + k, { label: 'oct', min: -2, max: 2, step: 1 }); MMX.ctl(row, 'p' + k, { label: 'pan', min: -1, max: 1 }); }
    MMX.ctl(C, 'len', { label: 'Steps', min: 4, max: 16, step: 1, on: () => MM.$('#cells') && grid() }); MMX.ctl(C, 'root', { type: 'select', label: 'Key', options: NOTES.map((x, k) => [k, x]), on: () => MM.$('#cells') && grid() });
    MMX.ctl(C, 'scale', { type: 'select', label: 'Scale', options: Object.keys(MM.SCALES).map((k) => [k, k]), on: () => MM.$('#cells') && grid() });
    MM.$$('#procs button').forEach((b) => (b.onclick = () => { MM.ensure(); if (!MM.playing) MM.toggle(true); setProc(b.dataset.p); }));
    MM.$('#pp').onclick = () => { pat = PIANO_PHASE.slice(); MMX.setParam('len', 12); MMX.setParam('scale', 'dorian'); MMX.setParam('root', 4); grid(); };
    MM.$('#pr').onclick = () => { pat = pat.map(() => (Math.random() < 0.8 ? Math.floor(Math.random() * 8) : -1)); grid(); }; MM.$('#pc').onclick = () => { pat = pat.map(() => -1); pat[0] = 0; grid(); };
    grid(); onProc();
  } };
// built-in mallet: a short marimba-like tone on E4
function mallet() { const ctx = MM.ctx, sr = ctx.sampleRate, B = ctx.createBuffer(1, sr * 1.2, sr), d = B.getChannelData(0), f = MM.mtof(64); for (let i = 0; i < d.length; i++) { const t = i / sr; d[i] = (Math.sin(2 * Math.PI * f * t) * Math.exp(-t * 5) + 0.35 * Math.sin(2 * Math.PI * f * 4 * t) * Math.exp(-t * 18) + 0.15 * Math.sin(2 * Math.PI * f * 10 * t) * Math.exp(-t * 40)) * Math.min(1, t * 2000) * 0.7; } return B; }
const _setup = cfg.setup; cfg.setup = () => { MM.fb.mallet = mallet(); _setup(); };
MM.init(cfg);
