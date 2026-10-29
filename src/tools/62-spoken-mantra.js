/*META
{"title":"Spoken Mantra","deep":true,"gemini":true,"category":"Fred","date":"2026-10-29","kicker":"WHAT WOULD FRED AGAIN.. DO? · FOUND SPEECH","ideas_note":"",
"idea":"A spoken sentence, not a sung one, becomes the whole song, the way Fred again.. built 'Marea (we've lost dancing)' around The Blessed Madonna's speaking voice. The speech is cut into words, you choose which words make the mantra, a piano listens to the pitch of each word and harmonises it, and the arrangement runs intro, mantra, build (the phrase shrinks to one stuttering word), a beat of silence, then a pumping house or two-step drop.",
"controls":"6 slots (speech, piano, kick, clap, hats, field recording); click words to build the mantra; word chopping by gaps or equal slices; phrase timing natural or quantised; key, mode and progression or 'follow the speech'; groove (house, two-step, half-time, none), sidechain pump, hook density and re-pitched hooks; section lengths, auto-arrange or play sections by hand with a held build; riser, echo and space; optional Gemini that turns a moment you describe into an arrangement.",
"how":"Press PLAY. The built-in 'speech' is cut into words (the boxes in the SPEECH window). Click a word to take it in or out of the mantra. The piano reads the pitch of each word and picks a chord that contains it. With AUTO on, the song moves through INTRO, MANTRA, BUILD, DROP and BREAK by itself; press 1 to 5 to jump to a section at the next bar, or Enter for the next one. With AUTO off, the build holds on its last stutter until you press Enter, and the drop lands after a beat of silence. Drop a voice memo or any spoken sample onto the page (it goes to the SPEECH slot), or press D for all six slots.",
"fonts":"family=Pixelify+Sans:wght@400;600;700&family=Inconsolata:wght@400;700","bpm":128,
"try":["Record ten seconds of a friend talking on your phone (a voice note is perfect), drop it in, and switch off every word except the two that hit you. Set CHOP to 'gaps' and PHRASE TIMING to '8ths' so the words land on the grid, then let AUTO run to the drop.","Load a long field recording from your Splice folder (rain, a station, a crowd) into FIELD and a soft felt-piano one-shot recorded at C into PIANO. Set PROGRESSION to 'follow the speech', GROOVE to 'two-step' and PUMP to 0.7: the piano follows your talker's voice and breathes with the kick.","Turn AUTO off, play MANTRA for a while, press 3 for the BUILD and let it hold on the one-word stutter as long as you can bear. Press Enter, listen to the beat of silence, then the drop. Record it with R and use the WAV as a new speech sample."],
"manifesto":{"name":"What would Fred again.. do? Found speech as the song: the 'Marea (we've lost dancing)' method","short":"Fred again.. found speech","author":"Fred again.. (Fred Gibson, b. 1993, London), with The Blessed Madonna (Marea Stamper)","year":"2021","where":"'Marea (we've lost dancing)', Fred again.. and The Blessed Madonna, single released in early 2021 and later on 'Actual Life (April 14 – December 17 2020)'. Also his habit of naming tracks after the person whose voice is in them: 'Kyle (i found you)', 'Delilah (pull me out of this)', 'Billie (loving arms)'.",
"ideas":["The voice in a Fred again.. track is often speaking, not singing: a few words lifted from a conversation, a voice note or a video, repeated until they become a hook. 'Marea (we've lost dancing)' is built around The Blessed Madonna talking about the loss of dancing during the 2020 lockdowns.","The track is named after the person whose voice it uses, with their phrase in brackets. The sample is treated as a portrait of a real person at a real moment.","Repetition changes meaning: a sentence heard once is information; heard sixteen times over chords it becomes a mantra, and then something you can dance to.","The arrangement does the emotional work: a quiet, almost ambient opening with piano, a long build in which the phrase is cut shorter and shorter, and a euphoric drop with a pumping house kick.","He has often said in interviews that he collects these moments constantly on his phone and that the emotional weight of the real voice matters more than polish. (Paraphrase.)"],
"quotes":[],
"system":"The SPEECH slot is cut into words, either at the gaps between them (energy below a threshold) or into equal slices. Each word's pitch is estimated by autocorrelation and snapped to the key. You choose which words form the MANTRA. In PROGRESSION 'follow the speech', each bar's chord is a diatonic triad that contains the pitch of that bar's lead word, so the piano harmonises the speaking voice (this is the instrument's interpretation, not a claim about how Fred works). Sections: INTRO (speech, field recording and soft held piano), MANTRA (the phrase every bar, piano on the beat), BUILD (the phrase shrinks: whole phrase, last two words, last word on beats, then 8ths and 16ths, with a riser, rising filter and snare roll; the final beat is silent), DROP (full groove, sidechain pump on piano and field, and re-pitched hooks made of the lead word tuned to the chord), BREAK (no drums, long reverb). AUTO moves through them; without AUTO the build holds until you press Enter."},
"design":{"name":"Susan Kare","short":"Susan Kare","who":"Susan Kare (b. 1954), American artist and designer, who drew the original icons, bitmap fonts and interface graphics for the Apple Macintosh (1983 to 1986), and later icons for Windows 3.0 and many others","era":"Apple, Cupertino, 1983 to 1986, and after",
"hallmarks":["Icons drawn on a grid of square pixels, often 32 × 32, in pure black and white, with enormous character in very few dots. Here every section is a hand-drawn pixel icon (moon, speech balloon, stairs, bomb, cup), and the bomb nods to her system-error icon.","Bitmap typefaces designed for the screen and named after cities (Chicago, Geneva, New York). Here a pixel face stands in for Chicago in the title bars and menus.","The 1-bit desktop: a dithered grey pattern, windows with striped title bars and close boxes, the menu bar across the top. The command-key symbol she adopted (⌘) came from a Swedish sign for a place of interest; it appears in the menu bar here."],
"works":["Original Macintosh icons: the trash can, the watch, the paintbrush, the bomb (1984)","The Chicago, Geneva and Monaco bitmap fonts (1984)","Windows 3.0 Solitaire card deck (1990)"]}}
*/
/*CSS
:root{--bg:#fff;--fg:#000;--acc:#000;--bar-bg:#000;--bar-fg:#fff;--bar-font:'Pixelify Sans','Chicago',monospace;--learn-font:'Inconsolata',monospace;--learn-bg:#fff;--deck-bg:#fff}
#mm-stage{background:repeating-conic-gradient(#000 0 25%,#fff 0 50%) 0 0/2px 2px;display:grid;grid-template-columns:minmax(0,1fr) 300px;grid-template-rows:22px minmax(0,1.15fr) minmax(0,1fr);gap:10px 10px;padding:0 10px 10px}
#menu{grid-column:1/3;margin:0 -10px;background:#fff;border-bottom:2px solid #000;display:flex;gap:22px;align-items:center;padding:0 14px;font:600 14px 'Pixelify Sans',monospace}#menu b{font-size:16px}#menu .clk{margin-left:auto}
.win{background:#fff;border:2px solid #000;box-shadow:3px 3px 0 #000;display:flex;flex-direction:column;min-height:0;min-width:0}
.win .tb{height:20px;flex:none;border-bottom:2px solid #000;display:flex;align-items:center;justify-content:center;position:relative;background:repeating-linear-gradient(#000 0 1px,#fff 1px 3px);background-clip:content-box;padding:4px 3px}
.win .tb span{background:#fff;padding:0 8px;font:700 13px/1 'Pixelify Sans',monospace}.win .tb i{position:absolute;left:10px;top:4px;width:12px;height:11px;border:2px solid #000;background:#fff}
.win .bd{flex:1;min-height:0;position:relative}.win canvas{position:absolute;inset:0;width:100%;height:100%}
#w-sp{grid-column:1;grid-row:2}#w-ar{grid-column:1;grid-row:3;display:grid;grid-template-columns:1.25fr 1fr;gap:10px;background:none;border:0;box-shadow:none}#w-ar>.win{min-height:0}
#w-cp{grid-column:2;grid-row:2/4}#w-cp .bd{overflow:auto;padding:6px 10px;font:400 13px 'Inconsolata',monospace}
#w-cp h4{font:700 13px 'Pixelify Sans';margin:10px 0 3px;border-bottom:2px solid #000}
#w-cp .mmx-ctl{grid-template-columns:104px 1fr 36px;font:400 12px 'Inconsolata',monospace}#w-cp .mmx-ctl select{grid-column:2/4;min-width:0;border:2px solid #000;border-radius:0}
#w-cp input[type=range]{accent-color:#000}#w-cp input[type=checkbox]{accent-color:#000}
#ttl{position:absolute;left:12px;top:8px;font:700 30px/1 'Pixelify Sans';pointer-events:none;background:#fff;padding:2px 6px;border:2px solid #000}
#wd{position:absolute;right:10px;top:8px;font:400 12px 'Inconsolata';background:#fff;border:2px solid #000;padding:2px 6px;pointer-events:none}
.mm-ai textarea,.mm-ai input,.mm-ai select{border:2px solid #000!important;border-radius:0}.mm-ai-ask{background:#000!important;color:#fff!important;border:0!important;font:700 12px 'Pixelify Sans'!important;padding:6px 8px!important;border-radius:6px!important}
#mm-learn-dlg{border:2px solid #000;box-shadow:4px 4px 0 #000;border-radius:0}#mm-learn-dlg h2{font:700 30px/1.05 'Pixelify Sans'}#mm-learn-dlg .mm-l-k{color:#000;text-decoration:underline}#mm-learn-dlg blockquote{border-left:4px solid #000}
#mm-bar button.on{background:#fff;color:#000;border-color:#fff}
*/
/*HTML
<div id="menu"><b>⌘</b><span>File</span><span>Edit</span><span>Mantra</span><span>Sections</span><span>Special</span><span class="clk" id="clk"></span></div>
<div class="win" id="w-sp"><div class="tb"><i></i><span>SPEECH: click words to build the mantra</span></div><div class="bd"><canvas id="cs"></canvas><div id="ttl">Spoken Mantra</div><div id="wd"></div></div></div>
<div id="w-ar"><div class="win"><div class="tb"><i></i><span>ARRANGEMENT</span></div><div class="bd"><canvas id="ca"></canvas></div></div><div class="win"><div class="tb"><i></i><span>PIANO HEARS THE VOICE</span></div><div class="bd"><canvas id="ck"></canvas></div></div></div>
<div class="win" id="w-cp"><div class="tb"><i></i><span>Control Panel</span></div><div class="bd"><div id="ai"></div><h4>Speech</h4><div id="c1"></div><h4>Harmony</h4><div id="c2"></div><h4>Groove</h4><div id="c3"></div><h4>Arrangement</h4><div id="c4"></div></div></div>
*/
const st = MMX.bind({ bpm: 128, chop: 'gaps', maxWords: 8, timing: '8ths', sp: 0, root: 2, mode: 'major', prog: 'follow', top: true, piano: 0.7, oct: 0, groove: 'house', pump: 0.6, hook: 0.5, tune: true, field: 0.45, introBars: 4, mantraBars: 8, buildBars: 8, dropBars: 16, auto: true, riser: 0.6, swing: 0, echo: 0.3, verb: 0.35 });
const NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'], SECS = ['INTRO', 'MANTRA', 'BUILD', 'DROP', 'BREAK'];
const MODES = { major: [0, 2, 4, 5, 7, 9, 11], minor: [0, 2, 3, 5, 7, 8, 10], dorian: [0, 2, 3, 5, 7, 9, 10], mixolydian: [0, 2, 4, 5, 7, 9, 10] };
const PROGS = { follow: null, 'I-V-vi-IV': [0, 4, 5, 3], 'vi-IV-I-V': [5, 3, 0, 4], 'I-vi-IV-V': [0, 5, 3, 4], 'IV-V-iii-vi': [3, 4, 2, 5], 'ii-V-I-vi': [1, 4, 0, 5], 'i-VI-III-VII (minor)': [0, 5, 2, 6] };
let words = [], wsig = '', sec = 0, secBar = 0, pending = -1, chord = { deg: 0, notes: [], lead: null, name: '' }, prevDeg = -1, playing = new Map(), fieldH = null, pumpBus, filt, fieldG, riserOn = false, lastWord = -1, barN = 0;
const cs = MM.canvas('#cs'), ca = MM.canvas('#ca'), ck = MM.canvas('#ck');
/* ---------- words: cut the speech at its gaps, estimate each word's pitch ---------- */
function segment() { const R = MMX.region(0), b = R.b, sr = b.sampleRate, d = b.getChannelData(0), a0 = Math.floor(R.a * sr), z0 = Math.floor(R.z * sr), hop = Math.floor(sr * 0.01), en = [];
  for (let i = a0; i + hop <= z0; i += hop) { let s = 0; for (let j = 0; j < hop; j += 2) s += d[i + j] * d[i + j]; en.push(Math.sqrt(s / (hop / 2))); }
  const mx = Math.max(1e-6, ...en), th = mx * 0.12; let out = [];
  if (st.chop === 'gaps') { let on = -1, quiet = 0; en.forEach((e, k) => { if (e > th) { if (on < 0) on = k; quiet = 0; } else if (on >= 0) { quiet++; if (quiet > 5) { out.push([on, k - quiet + 1]); on = -1; quiet = 0; } } }); if (on >= 0) out.push([on, en.length]);
    out = out.filter(([p, q]) => q - p >= 6); }
  if (out.length < 2) { const n = st.maxWords; out = Array.from({ length: n }, (_, k) => [Math.floor((k * en.length) / n), Math.floor(((k + 1) * en.length) / n)]); }
  while (out.length > st.maxWords) { let bi = 0, bg = 1e9; for (let k = 0; k < out.length - 1; k++) { const g = out[k + 1][0] - out[k][1]; if (g < bg) { bg = g; bi = k; } } out.splice(bi, 2, [out[bi][0], out[bi + 1][1]]); }
  const L = Math.max(1, en.length), old = words;
  words = out.map(([p, q], k) => { const pos = p / L, len = (q - p) / L; const w = { pos: Math.max(0, pos - 0.004), len: Math.min(1 - pos, len + 0.012), on: old[k] ? old[k].on : k < 6, midi: null };
    w.midi = pitchOf(d, sr, a0 + p * hop, a0 + q * hop); return w; }); }
function pitchOf(d, sr, a, z) { const N = Math.min(2048, z - a); if (N < 512) return null; const s0 = Math.floor((a + z) / 2 - N / 2), x = new Float32Array(N); for (let i = 0; i < N; i++) x[i] = d[s0 + i] || 0;
  let e0 = 0; for (let i = 0; i < N; i++) e0 += x[i] * x[i]; if (e0 < 1e-4) return null; let best = 0, bl = 0; const lo = Math.floor(sr / 500), hi = Math.min(N - 64, Math.floor(sr / 70));
  for (let l = lo; l < hi; l++) { let s = 0; for (let i = 0; i + l < N; i += 2) s += x[i] * x[i + l]; s = s / (e0 / 2); if (s > best) { best = s; bl = l; } } if (best < 0.3 || !bl) return null; return Math.round(69 + 12 * Math.log2(sr / bl / 440)); }
function ensureWords() { const R = MMX.region(0), s = MMX.S.slots[0], sig = [R.a.toFixed(3), R.z.toFixed(3), s.name, s.rev, st.chop, st.maxWords, R.b.length].join('|'); if (sig !== wsig) { wsig = sig; segment(); } }
const sel = () => words.map((w, i) => i).filter((i) => words[i].on);
/* ---------- harmony ---------- */
const SC = () => MODES[st.mode] || MODES.major;
function triad(deg) { const S = SC(); return [0, 2, 4].map((k) => { const dd = deg + k; return (st.root + S[dd % 7] + 12 * Math.floor(dd / 7)) % 12; }); }
function quality(deg) { const t = triad(deg), a = (t[1] - t[0] + 12) % 12, b = (t[2] - t[0] + 12) % 12; return a === 4 && b === 7 ? '' : a === 3 && b === 7 ? 'm' : a === 3 && b === 6 ? 'dim' : '+'; }
function snapPc(pc) { const S = SC().map((x) => (x + st.root) % 12); let best = S[0], bd = 99; S.forEach((x) => { const dd = Math.min((pc - x + 12) % 12, (x - pc + 12) % 12); if (dd < bd) { bd = dd; best = x; } }); return best; }
function pickChord(bar) { const S = sel(); let lead = null; if (S.length) { const w = words[S[bar % S.length]]; if (w && w.midi != null) lead = snapPc(((w.midi % 12) + 12) % 12); }
  let deg; const P = PROGS[st.prog];
  if (P) deg = P[bar % P.length]; else { const pref = [0, 5, 3, 4, 1, 2, 6]; const cand = pref.filter((dg) => quality(dg) !== 'dim' && (lead == null || triad(dg).includes(lead))); deg = (cand.find((dg) => dg !== prevDeg) ?? cand[0] ?? [0, 5, 3, 4][bar % 4]); }
  prevDeg = deg; const t = triad(deg); const notes = t.map((pc) => { let m = 55 + ((pc - 55) % 12 + 12) % 12; return m; }).sort((a, b) => a - b);
  chord = { deg, notes, bass: 36 + t[0] + 12 * st.oct, lead, top: lead != null ? 72 + ((lead - 72) % 12 + 12) % 12 : null, name: NOTES[t[0]] + quality(deg), roman: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'][deg] }; }
/* ---------- sound ---------- */
const rt = (m) => MM.mtof(m) / MM.mtof(60);
function piano(t, vel, dur, withBass = true) { const g = st.piano * vel, base = { gain: g, maxDur: dur, fadeOut: 0.25, rev: st.verb * 0.4, dest: pumpBus };
  chord.notes.forEach((m, k) => MMX.fire(1, t + k * 0.006, Object.assign({}, base, { rate: rt(m + 12 * st.oct), pan: (k - 1) * 0.25 })));
  if (st.top && chord.top != null) MMX.fire(1, t + 0.02, Object.assign({}, base, { rate: rt(chord.top + 12 * st.oct), gain: g * 0.8, pan: 0.3 }));
  if (withBass) MMX.fire(1, t, Object.assign({}, base, { rate: rt(chord.bass), gain: g * 0.9 })); }
function word(i, t, o = {}) { const w = words[i]; if (!w) return; const r = Math.pow(2, st.sp / 12) * (o.rate || 1), len = MMX.region(0).len * w.len / r, dur = Math.min(len, o.max || 9);
  MMX.fire(0, t, { pos: w.pos, dur, rate: r, gain: o.gain ?? 1, pan: o.pan || 0, rev: o.rev ?? st.verb * 0.4, dly: o.dly ?? st.echo * 0.4, fadeOut: Math.min(0.03, dur / 3) });
  const ms = Math.max(0, (t - MM.now) * 1000); setTimeout(() => { lastWord = i; playing.set(i, performance.now() + dur * 1000); }, ms); return dur; }
function phrase(t, sd, o = {}) { const S = sel(); if (!S.length) return; const q = st.timing === '16ths' ? sd : st.timing === '8ths' ? sd * 2 : 0; let tt = t;
  S.forEach((i) => { const d = word(i, tt, o) || 0.2; if (q) tt += Math.max(q, Math.ceil((d * 0.92) / q) * q); else tt += d + 0.03; }); }
function hookRate(i, k) { const w = words[i]; if (!st.tune || !w || w.midi == null) return 1; const tgt = [...chord.notes, chord.top || chord.notes[2] + 12].map((m) => m)[k % 4]; let d = tgt - w.midi; while (d > 7) d -= 12; while (d < -7) d += 12; return Math.pow(2, d / 12); }
function pumpAt(t) { if (!pumpBus || st.pump < 0.01) return; const g = pumpBus.gain; g.cancelScheduledValues(t); g.setValueAtTime(Math.max(0.05, 1 - st.pump), t); g.setTargetAtTime(1, t + 0.03, (60 / MM.bpm) * 0.18); }
const GROOVES = { house: { k: [0, 4, 8, 12], s: [4, 12], oh: [2, 6, 10, 14], ch: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], sw: 0 }, 'two-step': { k: [0, 7, 10], s: [4, 12], oh: [14], ch: [0, 2, 3, 6, 8, 10, 11, 14], sw: 0.17 }, 'half-time': { k: [0, 11], s: [8], oh: [6, 14], ch: [0, 2, 4, 6, 8, 10, 12, 14], sw: 0.06 }, none: { k: [], s: [], oh: [], ch: [], sw: 0 } };
function drums(k, t, lvl, opt = {}) { const G = GROOVES[st.groove]; if (!G) return; if (!opt.noKick && G.k.includes(k)) { MMX.fire(2, t, { gain: lvl }); pumpAt(t); } if (G.s.includes(k)) MMX.fire(3, t, { gain: lvl * 0.8, rev: 0.1 }); if (G.oh.includes(k)) MMX.fire(4, t, { gain: lvl * 0.5, pan: 0.25, maxDur: 0.2 }); else if (G.ch.includes(k)) MMX.fire(4, t, { gain: lvl * (k % 2 ? 0.18 : 0.28), pan: -0.2, maxDur: 0.06 }); }
function startField(t) { stopField(t); fieldH = MMX.fire(5, t, { loop: true, dur: 36000, gain: 1, dest: fieldG, fadeIn: 1.5 }); }
function stopField(t) { if (fieldH) { fieldH.stop(t); fieldH = null; } }
function secLen(s) { return [st.introBars, st.mantraBars, st.buildBars, st.dropBars, 8][s]; }
function setFieldLevel(t) { const L = [1, 0.7, 0.55, 0.6, 1.1][sec] * st.field; fieldG.gain.setTargetAtTime(L, t, 0.6); }
function riser(t, bars) { const D = (60 / MM.bpm) * 4 * bars - (60 / MM.bpm); if (st.riser > 0.01 && D > 0.5) MM.noise(t, D, { type: 'highpass', freq: 300, sweep: 9000, q: 2, gain: st.riser * 0.12, attack: D * 0.9, send: { rev: 0.3 } }); }
/* ---------- the clock ---------- */
function step(i, t, sd) { const k = i % 16;
  if (k === 0) { ensureWords(); if (i > 0) { secBar++; if (pending >= 0) { sec = pending; secBar = 0; pending = -1; onSection(t); } else if (secBar >= secLen(sec)) { if (st.auto) { sec = sec === 4 ? 1 : sec + 1; secBar = 0; onSection(t); } else secBar = sec === 2 ? secLen(2) - 1 : 0; } } else onSection(t);
    barN++; pickChord(barN); MM.setDelay((60 / MM.bpm) * 0.75); }
  const S = sel(), L = secLen(sec), last = S.length ? S[S.length - 1] : 0, beat = k % 4 === 0, silent = (pending === 3 || (sec === 2 && st.auto && secBar === L - 1)) && k >= 12;
  if (silent) { if (k === 12) { filt.frequency.setTargetAtTime(18000, t, 0.01); } return; }
  if (sec === 0) { if (k === 0) { phrase(t, sd, { gain: 0.9, rev: st.verb * 0.7 }); if (secBar % 2 === 0) piano(t, 0.45, sd * 32); } }
  else if (sec === 1) { if (k === 0) phrase(t, sd); if (k === 0 || k === 6 || k === 10) piano(t, k ? 0.5 : 0.75, sd * (k ? 4 : 6), k === 0); if (k === 0 || k === 8) MMX.fire(2, t, { gain: 0.35 }); if (k % 4 === 2) MMX.fire(4, t, { gain: 0.15, maxDur: 0.05 }); }
  else if (sec === 2) { const p = Math.min(1, secBar / Math.max(1, L - 1));
    if (p < 0.25) { if (k === 0) phrase(t, sd); }
    else if (p < 0.5) { if (k === 0 || k === 8) { const two = S.slice(-2); let tt = t; two.forEach((wi) => { tt += word(wi, tt, { dly: 0.1 }) || 0.2; }); } }
    else if (p < 0.75) { if (beat) word(last, t, { max: sd * 3.6 }); }
    else if (p < 0.99) { if (k % 2 === 0) word(last, t, { max: sd * 1.8, gain: 0.9 }); }
    else word(last, t, { max: sd * 0.9, gain: 0.8, rate: 1 + (k / 16) * 0.25 });
    if (k === 0 || (p > 0.5 && k === 8)) piano(t, 0.4 + p * 0.4, sd * 6, k === 0);
    if (beat && p < 0.75) MMX.fire(2, t, { gain: 0.5 * (1 - p) });
    if (p >= 0.75 || (!st.auto && secBar >= L - 1)) MMX.fire(3, t, { gain: 0.15 + 0.5 * p * (k / 16), rev: 0.15 }); else if (k === 4 || k === 12) MMX.fire(3, t, { gain: 0.3 });
    if (k === 0) filt.frequency.setTargetAtTime(400 + 9000 * Math.pow(p, 2), t, (60 / MM.bpm) * 2); }
  else if (sec === 3) { drums(k, t, 1);
    const G = GROOVES[st.groove], stab = st.groove === 'house' ? [2, 6, 10, 14] : [0, 3, 6, 10, 13]; if (stab.includes(k)) piano(t, 0.55, sd * 1.6, k === 0 || k === 10);
    if (k === 0 && secBar % 4 === 0) phrase(t, sd, { gain: 0.85 });
    else { const hp = [3, 7, 11, 15, 6, 14, 2, 10, 13, 9], n = Math.round(st.hook * hp.length); if (hp.slice(0, n).includes(k) && S.length) { const wi = S[(barN + (k >> 2)) % S.length]; word(wi, t, { max: sd * (k % 4 === 3 ? 1.6 : 2.6), rate: hookRate(wi, k >> 2), gain: 0.75, pan: k % 8 < 4 ? -0.3 : 0.3 }); } }
    if (k === 0 && G && !G.k.length) pumpAt(t); }
  else if (sec === 4) { if (k === 0) { piano(t, 0.5, sd * 16); if (secBar % 4 === 0) phrase(t, sd, { rev: 0.9, dly: 0.5, gain: 0.8 }); } if (k === 8 && secBar % 2 === 1) piano(t, 0.35, sd * 8, false); } }
function onSection(t) { MM.toast(SECS[sec]); setFieldLevel(t); const G = GROOVES[st.groove]; cfg.swing = sec === 3 || sec === 1 ? Math.max(st.swing, G ? G.sw : 0) : st.swing;
  if (sec === 2) { filt.frequency.setValueAtTime(400, t); riser(t, st.auto ? secLen(2) : Math.min(16, secLen(2))); } else filt.frequency.setTargetAtTime(sec === 0 || sec === 4 ? 2600 : 18000, t, 0.05); }
function go(s) { if (!MM.playing) { sec = s; secBar = 0; MM.toggle(true); return; } pending = s; MM.toast('→ ' + SECS[s] + ' at the next bar'); }
/* ---------- drawing (1-bit, Kare) ---------- */
const ICONS = { INTRO: ['................', '......####......', '....###.........', '...###..........', '..###...........', '..###...........', '.###............', '.###............', '.###............', '.###............', '..###.......#...', '..####.....##...', '...#####.###....', '....#######.....', '......###.......', '................'],
  MANTRA: ['................', '..##########....', '.#..........#...', '#............#..', '#..##.##.##..#..', '#............#..', '#..####.###..#..', '#............#..', '.#..........#...', '..####..####....', '.....#.#........', '.....##.........', '.....#..........', '................', '................', '................'],
  BUILD: ['................', '................', '...........#####', '...........#...#', '........####...#', '........#......#', '.....####......#', '.....#.........#', '..####.........#', '..#............#', '###............#', '#..............#', '################', '................', '................', '................'],
  DROP: ['................', '..........#.#...', '.........#......', '........##..#...', '.......##.......', '.....######.....', '....########....', '...###....###...', '...##.#.....#...', '...##........#..', '...##........#..', '...###......##..', '....###....##...', '.....######.....', '................', '................'],
  BREAK: ['................', '.....#..#..#....', '....#..#..#.....', '.....#..#..#....', '................', '..###########...', '..#.........####', '..#.........#..#', '..#.........#..#', '..#.........####', '..#.........#...', '...#.......#....', '....#######.....', '.#############..', '................', '................'] };
function icon(g, name, x, y, s, inv) { const b = ICONS[name]; g.fillStyle = inv ? '#000' : '#fff'; g.fillRect(x - 3, y - 3, 16 * s + 6, 16 * s + 6); g.fillStyle = inv ? '#fff' : '#000'; b.forEach((row, r) => [...row].forEach((c, q) => { if (c === '#') g.fillRect(x + q * s, y + r * s, s, s); })); }
function dither(g, x, y, w, h) { g.fillStyle = '#000'; for (let yy = 0; yy < h; yy += 2) for (let xx = (yy / 2) % 2; xx < w; xx += 2) g.fillRect(x + xx, y + yy, 1, 1); }
function draw() { const now = performance.now(); cs.fit(); ca.fit(); ck.fit();
  // speech window
  let g = cs.g, W = cs.w, H = cs.h; g.fillStyle = '#fff'; g.fillRect(0, 0, W, H); const R = MMX.region(0), pk = MM.peaks(R.b, 600), y0 = H * 0.58, A = H * 0.3, p0 = R.a / R.b.duration, p1 = R.z / R.b.duration;
  g.fillStyle = '#000'; for (let x = 0; x < W; x += 2) { const f = p0 + (x / W) * (p1 - p0); const v = pk[Math.min(599, Math.floor(f * 600))] || 0, hh = Math.max(1, v * A); g.fillRect(x, y0 - hh, 1, hh * 2); }
  g.font = "700 13px 'Pixelify Sans'"; g.textAlign = 'center';
  words.forEach((w, i) => { const x = w.pos * W, ww = Math.max(6, w.len * W), act = playing.has(i) && playing.get(i) > now; const top = H * 0.2, bh = H * 0.18;
    if (w.on) { g.fillStyle = act ? '#fff' : '#000'; g.fillRect(x + 1, top, ww - 2, bh); g.strokeStyle = '#000'; g.lineWidth = 2; g.strokeRect(x + 1, top, ww - 2, bh); g.fillStyle = act ? '#000' : '#fff'; }
    else { g.fillStyle = '#fff'; g.fillRect(x + 1, top, ww - 2, bh); dither(g, x + 2, top + 1, ww - 4, bh - 2); g.strokeStyle = '#000'; g.lineWidth = 1; g.strokeRect(x + 1, top, ww - 2, bh); g.fillStyle = '#000'; }
    if (w.on) { g.fillText((sel().indexOf(i) + 1) + (w.midi != null ? ' ' + NOTES[((w.midi % 12) + 12) % 12] : ' ~'), x + ww / 2, top + bh / 2 + 5); }
    g.strokeStyle = '#000'; g.setLineDash([2, 2]); g.beginPath(); g.moveTo(x + 0.5, top + bh); g.lineTo(x + 0.5, H - 6); g.stroke(); g.setLineDash([]);
    if (act) { g.fillStyle = '#000'; g.fillRect(x, H - 10, ww, 6); } });
  MM.$('#wd').textContent = `${words.length} words · mantra ${sel().length} · ${MMX.S.slots[0].name || 'built-in speech'}`;
  // arrangement window
  g = ca.g; W = ca.w; H = ca.h; g.fillStyle = '#fff'; g.fillRect(0, 0, W, H); const s = Math.max(2, Math.min(4, Math.floor((W - 40) / 5 / 18))), cw = W / 5;
  SECS.forEach((n, k) => { const x = k * cw + (cw - 16 * s) / 2, y = 14; icon(g, n, x, y, s, k === sec && MM.playing); g.fillStyle = '#000'; g.font = "700 12px 'Pixelify Sans'"; g.textAlign = 'center'; g.fillText((k + 1) + ' ' + n + (k === pending ? ' ◂' : ''), k * cw + cw / 2, y + 16 * s + 18); g.font = "400 11px 'Inconsolata'"; g.fillText(secLen(k) + ' bars', k * cw + cw / 2, y + 16 * s + 32); });
  const by = H - 34, bw = W - 40, L = secLen(sec), pr = MM.playing ? Math.min(1, (secBar + ((MM.S.step % 16) / 16)) / L) : 0; g.strokeStyle = '#000'; g.lineWidth = 2; g.strokeRect(20, by, bw, 14); for (let x = 0; x < bw * pr - 2; x += 4) { g.fillStyle = '#000'; g.fillRect(22 + x, by + 2, 2, 10); }
  g.font = "400 11px 'Inconsolata'"; g.textAlign = 'left'; g.fillText(`${st.auto ? 'AUTO' : 'BY HAND'} · bar ${secBar + 1} of ${L}${!st.auto && sec === 2 && secBar >= L - 1 ? ' · HOLDING: press Enter to drop' : ''}`, 20, by - 5);
  // chord window: 2-octave 1-bit keyboard
  g = ck.g; W = ck.w; H = ck.h; g.fillStyle = '#fff'; g.fillRect(0, 0, W, H); g.fillStyle = '#000'; g.textAlign = 'left'; g.font = "700 28px 'Pixelify Sans'"; g.fillText(chord.name || '·', 12, 34); g.font = "400 12px 'Inconsolata'"; g.fillText(`${chord.roman || ''} in ${NOTES[st.root]} ${st.mode} · ${st.prog === 'follow' ? 'following the voice' : st.prog}`, 12, 52);
  if (chord.lead != null) g.fillText('the voice is on ' + NOTES[chord.lead] + ' ◆', 12, 68);
  const kx = 10, ky = 80, kw = (W - 20) / 14, kh = Math.max(30, H - ky - 10), pcs = chord.notes.map((m) => m % 12), wk = [0, 2, 4, 5, 7, 9, 11];
  for (let o = 0; o < 2; o++) wk.forEach((pc, j) => { const x = kx + (o * 7 + j) * kw; g.fillStyle = '#fff'; g.fillRect(x, ky, kw, kh); g.strokeStyle = '#000'; g.lineWidth = 2; g.strokeRect(x, ky, kw, kh); if (o === 0 && pcs.includes(pc)) { g.fillStyle = '#000'; g.fillRect(x + kw * 0.3, ky + kh - 22, kw * 0.4, 14); } if (o === 1 && chord.lead === pc) { g.fillStyle = '#000'; g.beginPath(); g.moveTo(x + kw / 2, ky + kh - 26); g.lineTo(x + kw / 2 + 7, ky + kh - 17); g.lineTo(x + kw / 2, ky + kh - 8); g.lineTo(x + kw / 2 - 7, ky + kh - 17); g.fill(); } });
  for (let o = 0; o < 2; o++) [1, 3, 6, 8, 10].forEach((pc) => { const j = { 1: 0, 3: 1, 6: 3, 8: 4, 10: 5 }[pc], x = kx + (o * 7 + j + 0.68) * kw; g.fillStyle = '#000'; g.fillRect(x, ky, kw * 0.64, kh * 0.6); if (o === 0 && pcs.includes(pc)) { g.fillStyle = '#fff'; g.fillRect(x + kw * 0.17, ky + kh * 0.6 - 18, kw * 0.3, 10); } if (o === 1 && chord.lead === pc) { g.fillStyle = '#fff'; g.fillRect(x + kw * 0.12, ky + kh * 0.6 - 20, kw * 0.4, 12); } });
  const d = new Date(); MM.$('#clk').textContent = d.toTimeString().slice(0, 5) + '  ' + SECS[sec]; }
MM.drag(MM.$('#cs'), (px, py, ph) => { if (ph !== 'down') return; const W = MM.$('#cs').getBoundingClientRect().width, f = px / W; const i = words.findIndex((w) => f >= w.pos && f <= w.pos + w.len); if (i >= 0) { words[i].on = !words[i].on; if (!words[i].on && !sel().length) words[i].on = true; word(i, MM.now + 0.01, { dly: 0, rev: 0.1 }); } });
const cfg = { bpm: 128, div: 4, swing: 0, step, draw, start: () => { const t = MM.now + 0.05; sec = 0; secBar = 0; barN = 0; pending = -1; startField(t); setFieldLevel(t); }, stop: () => { stopField(MM.now); },
  onSamples: (list) => MMX.assign(list),
  key: (e) => { if (MMX.key(e)) return; const k = e.key; if (k >= '1' && k <= '5') go(+k - 1); else if (k === 'Enter') go(sec === 4 ? 1 : sec + 1); else if (k === 'a' || k === 'A') MMX.setParam('auto', !st.auto);
    else if (k === 'ArrowLeft' || k === 'ArrowRight') { const ks = Object.keys(PROGS), j = (ks.indexOf(st.prog) + (k === 'ArrowRight' ? 1 : ks.length - 1)) % ks.length; MMX.setParam('prog', ks[j]); MM.toast('Progression: ' + ks[j]); }
    else if (k === 'g' || k === 'G') { const ks = Object.keys(GROOVES), j = (ks.indexOf(st.groove) + 1) % ks.length; MMX.setParam('groove', ks[j]); MM.toast('Groove: ' + ks[j]); }
    else if (k === 'w' || k === 'W') { words.forEach((w) => (w.on = true)); } else if (k === 'ArrowUp' || k === 'ArrowDown') MMX.setParam('sp', MM.clamp(st.sp + (k === 'ArrowUp' ? 1 : -1), -12, 12)); },
  setup() { MM.ensure(); const ctx = MM.ctx; pumpBus = ctx.createGain(); filt = ctx.createBiquadFilter(); filt.type = 'lowpass'; filt.frequency.value = 2600; filt.Q.value = 0.9; fieldG = ctx.createGain(); fieldG.gain.value = st.field; fieldG.connect(pumpBus); pumpBus.connect(filt); filt.connect(MM.out);
    MM.fb.speech = speechBuf(); MM.fb.piano = pianoBuf();
    MMX.init({ state: st, slots: [{ label: 'Speech', kind: 'speech', rv: 0.1 }, { label: 'Piano (C)', kind: 'piano', gain: 0.7, rv: 0.25 }, { label: 'Kick', kind: 'kick', rv: 0 }, { label: 'Clap / snare', kind: 'snare', rv: 0.1 }, { label: 'Hats', kind: 'hat', rv: 0 }, { label: 'Field recording', kind: 'texture', gain: 0.8, rv: 0.2 }],
      onSlot: (i) => { if (i === 0) wsig = ''; if (i === 5 && MM.playing) startField(MM.now + 0.05); },
      extra: { get: () => ({ on: words.map((w) => w.on), sec }), set: (x) => { if (x && x.on) { ensureWords(); x.on.forEach((v, k) => words[k] && (words[k].on = v)); } } }, factory: fac(),
      keys: [['click a word', 'in or out of the mantra (and hear it)'], ['1 to 5', 'intro, mantra, build, drop, break (at the next bar)'], ['Enter', 'next section; drops a held build'], ['A', 'auto-arrange on / off'], ['G', 'next groove'], ['← →', 'progression'], ['↑ ↓', 'speech pitch'], ['W', 'all words in']],
      midiHelp: 'MIDI notes 36 to 51 fire the words like pads (C1 is word 1). Notes from 52 up play the lead word as a re-pitched vocal chop, with C4 at its original pitch.',
      midi: (n, v, on) => { if (!on) return; ensureWords(); if (n < 52) { const i = (n - 36 + 64) % Math.max(1, words.length); word(i, MM.now + 0.005, { gain: 0.4 + v * 0.7 }); } else { const S = sel(), i = S.length ? S[0] : 0; word(i, MM.now + 0.005, { rate: rt(n), gain: 0.4 + v * 0.7, max: 1.2 }); } } });
    const C1 = MM.$('#c1'), C2 = MM.$('#c2'), C3 = MM.$('#c3'), C4 = MM.$('#c4');
    MMX.ctl(C1, 'chop', { type: 'select', label: 'Chop', options: [['gaps', 'at the gaps'], ['equal', 'equal slices']], on: () => (wsig = '') }); MMX.ctl(C1, 'maxWords', { label: 'Words', min: 2, max: 16, step: 1, on: () => (wsig = '') });
    MMX.ctl(C1, 'timing', { type: 'select', label: 'Phrase timing', options: [['natural', 'natural'], ['8ths', 'on the 8ths'], ['16ths', 'on the 16ths']] }); MMX.ctl(C1, 'sp', { label: 'Speech pitch', min: -12, max: 12, step: 1 });
    MMX.ctl(C1, 'tune', { type: 'check', label: 'Tune hooks to chords' }); MMX.ctl(C1, 'hook', { label: 'Hook density', min: 0, max: 1 });
    MMX.ctl(C2, 'root', { type: 'select', label: 'Key', options: NOTES.map((x, k) => [k, x]) }); MMX.ctl(C2, 'mode', { type: 'select', label: 'Mode', options: Object.keys(MODES).map((k) => [k, k]) });
    MMX.ctl(C2, 'prog', { type: 'select', label: 'Progression', options: Object.keys(PROGS).map((k) => [k, k === 'follow' ? 'follow the speech' : k]) }); MMX.ctl(C2, 'top', { type: 'check', label: 'Double the voice on top' });
    MMX.ctl(C2, 'piano', { label: 'Piano', min: 0, max: 1.2 }); MMX.ctl(C2, 'oct', { label: 'Piano octave', min: -1, max: 1, step: 1 });
    MMX.ctl(C3, 'bpm', { label: 'Tempo', min: 70, max: 160, step: 1, on: (v) => (MM.bpm = v) }); MMX.ctl(C3, 'groove', { type: 'select', label: 'Groove (G)', options: Object.keys(GROOVES).map((k) => [k, k]) });
    MMX.ctl(C3, 'pump', { label: 'Sidechain pump', min: 0, max: 0.95 }); MMX.ctl(C3, 'swing', { label: 'Swing', min: 0, max: 0.35, on: (v) => (cfg.swing = v) }); MMX.ctl(C3, 'field', { label: 'Field level', min: 0, max: 1.2, on: () => fieldG && setFieldLevel(MM.now) });
    MMX.ctl(C3, 'echo', { label: 'Echo', min: 0, max: 1 }); MMX.ctl(C3, 'verb', { label: 'Space', min: 0, max: 1 });
    MMX.ctl(C4, 'auto', { type: 'check', label: 'Auto-arrange (A)' }); MMX.ctl(C4, 'introBars', { label: 'Intro bars', min: 1, max: 16, step: 1 }); MMX.ctl(C4, 'mantraBars', { label: 'Mantra bars', min: 2, max: 32, step: 1 });
    MMX.ctl(C4, 'buildBars', { label: 'Build bars', min: 2, max: 32, step: 1 }); MMX.ctl(C4, 'dropBars', { label: 'Drop bars', min: 4, max: 64, step: 1 }); MMX.ctl(C4, 'riser', { label: 'Riser', min: 0, max: 1 });
    MM.aiBox(MM.$('#ai'), { title: 'MOMENT → ARRANGEMENT', help: 'Describe the moment the voice comes from. Gemini picks the key, mode, progression, groove, tempo and section lengths.', placeholder: 'my sister laughing on the night bus home after the first rave since lockdown',
      system: 'You arrange a dance track in the manner of Fred again..: a spoken phrase over piano, a long build and a euphoric drop. Reply with JSON only.',
      schema: { type: 'OBJECT', properties: { bpm: { type: 'INTEGER' }, root: { type: 'INTEGER' }, mode: { type: 'STRING', enum: Object.keys(MODES) }, prog: { type: 'STRING', enum: Object.keys(PROGS) }, groove: { type: 'STRING', enum: Object.keys(GROOVES) }, buildBars: { type: 'INTEGER' }, dropBars: { type: 'INTEGER' }, title: { type: 'STRING' }, note: { type: 'STRING' } }, required: ['bpm', 'mode', 'prog', 'groove'] },
      user: (p) => `The moment: ${p}\nChoose bpm 100 to 140, root 0 to 11 (0 = C), mode, progression, groove, buildBars 4 to 16, dropBars 8 to 32, and a track title in the form Name (a short lower-case phrase). One sentence of note on why.`,
      apply: (r) => { if (r.bpm) MMX.setParam('bpm', MM.clamp(r.bpm | 0, 70, 160)); if (r.root != null) MMX.setParam('root', MM.clamp(r.root | 0, 0, 11)); if (MODES[r.mode]) MMX.setParam('mode', r.mode); if (r.prog in PROGS) MMX.setParam('prog', r.prog); if (GROOVES[r.groove]) MMX.setParam('groove', r.groove); if (r.buildBars) MMX.setParam('buildBars', MM.clamp(r.buildBars | 0, 2, 32)); if (r.dropBars) MMX.setParam('dropBars', MM.clamp(r.dropBars | 0, 4, 64)); if (r.title) MM.$('#ttl').textContent = r.title; return (r.title ? r.title + ': ' : '') + (r.note || 'Arranged.'); },
      fallback: () => { MMX.setParam('prog', MM.pick(Object.keys(PROGS))); MMX.setParam('groove', MM.pick(['house', 'two-step', 'half-time'])); MMX.setParam('root', (Math.random() * 12) | 0); MMX.setParam('bpm', MM.pick([122, 126, 128, 132, 134])); MM.toast('Built-in arrangement'); } });
    ensureWords(); pickChord(0); } };
function fac() { const base = JSON.parse(JSON.stringify(st)), F = (o) => ({ full: { params: Object.assign({}, base, o) } });
  return { 'Lost dancing (default)': {}, 'Two-step at dawn': F({ groove: 'two-step', bpm: 132, root: 9, mode: 'minor', prog: 'follow', pump: 0.7, hook: 0.7, swing: 0.12 }), 'Piano only, by hand': F({ groove: 'none', auto: false, piano: 0.9, field: 0.8, timing: 'natural', bpm: 96, verb: 0.6, prog: 'vi-IV-I-V' }),
    'Short build, big drop': F({ buildBars: 4, dropBars: 32, mantraBars: 4, introBars: 2, riser: 0.9, pump: 0.8, hook: 0.9 }), 'Half-time mantra': F({ groove: 'half-time', bpm: 140, mode: 'dorian', root: 4, prog: 'follow', timing: '16ths', hook: 0.4 }) }; }
/* ---------- built-in sounds ---------- */
function mk(len, ch, fn) { const ctx = MM.ctx, sr = ctx.sampleRate, B = ctx.createBuffer(ch, (sr * len) | 0, sr); let pk = 0; for (let c = 0; c < ch; c++) { const d = B.getChannelData(c); for (let i = 0; i < d.length; i++) { d[i] = fn(i / sr, c, i); pk = Math.max(pk, Math.abs(d[i])); } } for (let c = 0; c < ch; c++) { const d = B.getChannelData(c); for (let i = 0; i < d.length; i++) d[i] *= 0.75 / (pk || 1); } return B; }
function pianoBuf() { const f = MM.mtof(60); return mk(3.2, 1, (t) => { let s = 0; for (let k = 1; k <= 9; k++) { const fk = f * k * Math.sqrt(1 + 0.0004 * k * k); s += Math.sin(2 * Math.PI * fk * t + k) / Math.pow(k, 1.25) * Math.exp(-t * (0.9 + k * 0.55)); } return s * Math.min(1, t * 700) * (1 + 0.4 * Math.exp(-t * 30)); }); }
function speechBuf() { // six spoken 'words' with falling intonation: vowel formants on a glottal pulse train, with gaps between them
  const sr = MM.ctx.sampleRate, VOW = { a: [730, 1090, 2440], e: [530, 1840, 2480], i: [300, 2250, 3000], o: [570, 840, 2410], u: [320, 900, 2240] };
  const W = [['e', 0.30, 196, 185, 1], ['o', 0.26, 220, 196, 0], ['a', 0.42, 247, 208, 1], ['i', 0.28, 196, 175, 1], ['a', 0.36, 175, 165, 0], ['o', 0.55, 165, 131, 1]];
  let T = 0.12; const segs = W.map(([v, d, f0, f1, s]) => { const x = { v, a: T, z: T + d, f0, f1, s }; T += d + 0.17; return x; }); const len = T + 0.2, B = MM.ctx.createBuffer(1, (sr * len) | 0, sr), out = B.getChannelData(0);
  segs.forEach((sg) => { const st0 = [[0, 0], [0, 0], [0, 0]], F = VOW[sg.v]; let ph = 0, nprev = 0; const n0 = (sg.a * sr) | 0, n1 = (sg.z * sr) | 0;
    for (let n = n0; n < n1; n++) { const u = (n - n0) / (n1 - n0), f = sg.f0 + (sg.f1 - sg.f0) * u + 3 * Math.sin(n / sr * 2 * Math.PI * 5); ph += f / sr; const pulse = ph % 1 < 0.06 ? 1 : 0; let y = 0;
      F.forEach((fc, k) => { const r = Math.exp(-Math.PI * (70 + 30 * k) / sr), w = 2 * Math.PI * fc / sr, s = st0[k], v = pulse + 2 * r * Math.cos(w) * s[0] - r * r * s[1]; s[1] = s[0]; s[0] = v; y += v / (k + 1); });
      const env = Math.min(1, u * 14) * Math.min(1, (1 - u) * 6); let cons = 0; if (sg.s && u < 0.12) { const nz = Math.random() * 2 - 1; cons = (nz - nprev) * 0.6 * (1 - u / 0.12); nprev = nz; } out[n] = y * 0.02 * env + cons * 0.5; } });
  let pk = 0; for (const x of out) pk = Math.max(pk, Math.abs(x)); for (let i = 0; i < out.length; i++) out[i] *= 0.8 / (pk || 1); return B; }
MM.init(cfg);
