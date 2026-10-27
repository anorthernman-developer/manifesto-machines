/*META
{"title":"Actual Life Journal","deep":true,"gemini":true,"category":"Fred","date":"2026-10-27","kicker":"WHAT WOULD FRED AGAIN.. DO?",
"idea":"A diary you can dance to: a voice memo is chopped into emotional vocal hooks, laid over a field recording and house or two-step garage drums, and taken through intro, build, drop and break.",
"controls":"6 slots (voice memo, field recording, keys, kick, clap, hats); chop grid with per-step pitch; 3 drum styles with swing; 6 chord progressions in any key; field-bed level and sidechain pump; auto-arranged or hand-played INTRO/BUILD/DROP/BREAK with hold-to-build; Gemini turns a description of your day into an arrangement.",
"how":"Press PLAY: the built-in memo is already chopped and the song starts in its INTRO. Type who said it and the line they said (that becomes the title, like 'Carlos (gotta move on)') and the words flash up as each chop plays. Click the chop grid to choose which piece of the memo plays on each step; the row underneath sets each step's pitch (click up, shift-click down). Hold B (or the BUILD button) for a riser and let go to DROP. Pick HOUSE, 2-STEP or HALF-TIME drums, a chord progression and key. Open the DECK (D) to load your own voice memo, field recording, keys and drums into the slots.",
"fonts":"family=Anton&family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Archivo+Narrow:wght@500;700","bpm":132,
"try":["Record a 20 second voice memo of a friend telling you about their week. Load it into slot 1, set CHOPS to ONSETS so every word becomes a chop, and build a hook from the three words you like best.","Put a field recording from your street, a pub or a train into slot 2 and push FIELD up during the BREAK. Then pull the slot's FILTER down so it sounds like the room next door to the club.","Load a single held piano or pad note from your Splice folder into slot 3. Set its PITCH so it matches the key, choose vi-IV-I-V and STABS, and play the memo chromatically from a MIDI keyboard over it."],
"manifesto":{"name":"What would Fred again.. do? The Actual Life method","short":"Fred again..","author":"Fred again.. (Fred Gibson, b. 1993, London)","year":"2021 to 2022","where":"the Actual Life trilogy: Actual Life (April 14 - December 17 2020), Actual Life 2 (February 2 - October 15 2021) and Actual Life 3 (January 1 - September 9 2022)",
"ideas":["Each album is a dated diary. The titles are date ranges, and the songs are built from what was recorded during them.","The samples are real life: voice notes from friends, videos he filmed on nights out, and clips from Instagram and elsewhere, used with permission.","The first person he sampled was Carlos, a construction worker he met in Atlanta. Hungover the next morning, he played piano on his laptop keyboard over what Carlos had said.","Songs are named after the person and their line, like 'Marea (we've lost dancing)', built from a monologue by the DJ The Blessed Madonna.","When a sample can't say exactly what he feels, he writes lyrics and sings on top. The emotion sits over house, garage and breakbeat drums, and builds to euphoric drops."],
"quotes":[["I want the music to feel like a collaborative diary","Fred again.., Rolling Stone UK"],["I want to carry on sampling the world.","Fred again.., NME, 2021"],["taking these seemingly quite mundane life moments and shining a light on all the beauty that is in those moments","Fred again.., NPR, November 2022"]],
"system":"Slot 1 is the voice memo. It's cut into chops, at its natural word onsets or equally, and a step grid turns them into a hook, with each step pitched inside the key so speech starts to sing. The name and the line give the song its title, and the words flash up with each chop. Under the voice sit a field recording (slot 2), emotional chord progressions played on any sample (slot 3) and a choice of four-to-the-floor house, two-step garage or half-time drums. The arranger moves the song through INTRO (muffled, as if heard from the next room), BUILD (rising filter, snare roll and faster chops), a silent beat before the DROP, and a BREAK. You can let it run or perform it by hand."},
"design":{"name":"Tibor Kalman and M&Co","short":"Tibor Kalman / M&Co","who":"Tibor Kalman (1949 to 1999), Hungarian-born American designer, founder of M&Co in New York and editor of Benetton's Colors magazine","era":"New York, 1979 to the late 1990s",
"hallmarks":["Vernacular type: the lettering of shop signs, menus and typewriters, used on purpose instead of 'good taste'. Here it's the Courier journal.","Huge words that fill the frame one at a time, as in the lyric video M&Co made for Talking Heads' '(Nothing But) Flowers'. Here each chop's word fills the screen.","Colors magazine's direct, image-first layouts with blunt captions, bold red and black, and serious ideas presented with wit."],
"works":["Talking Heads, '(Nothing But) Flowers' lyric video (1988)","Colors magazine, Benetton (Kalman was editor-in-chief, 1990 to 1995)","Tibor Kalman: Perverse Optimist (book, 1998)"]}}
*/
/*CSS
:root{--bg:#f6f3ea;--fg:#111;--acc:#e10600;--hi:#ffe14d;--bar-font:'Archivo Narrow','Arial Narrow',Arial,sans-serif;--head-font:'Anton',Impact,sans-serif;--learn-font:'Courier Prime','Courier New',monospace}
#mm-bar{background:#111;color:#f6f3ea;font-weight:700;letter-spacing:.02em}
#mm-stage{display:grid;grid-template-columns:1fr 360px;grid-template-rows:auto 1fr auto;background:var(--bg)}
#mast{grid-column:1/3;display:flex;align-items:stretch;border-bottom:4px solid #111}
#mast .logo{background:var(--acc);color:#fff;font:400 34px/1 'Anton',Impact,sans-serif;padding:8px 14px 6px;letter-spacing:.01em}
#mast .dates{font:700 15px 'Courier Prime',monospace;padding:12px 14px;flex:1;display:flex;align-items:center;gap:10px;white-space:nowrap;overflow:hidden}
#title{font:400 30px/1 'Anton',Impact,sans-serif;padding:8px 16px 4px;border-left:4px solid #111;text-transform:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:48vw}
#word{position:relative;overflow:hidden;border-right:4px solid #111}#cv{position:absolute;inset:0;width:100%;height:100%}
#sec{position:absolute;left:14px;top:12px;display:flex;gap:6px;z-index:2}
#sec button{font:400 18px/1 'Anton',Impact,sans-serif;letter-spacing:.03em;background:#fff;border:3px solid #111;padding:6px 10px 4px;cursor:pointer}
#sec button.on{background:#111;color:#fff}#sec #build{background:var(--hi)}#sec #build.on{background:var(--acc);color:#fff;border-color:var(--acc)}
#side{overflow:auto;padding:10px 14px;font:14px/1.3 'Courier Prime',monospace;display:flex;flex-direction:column;gap:7px}
#side h3{font:400 20px/1 'Anton',Impact,sans-serif;margin:8px 0 2px;letter-spacing:.02em;border-bottom:3px solid #111;padding-bottom:3px}
#side .mmx-ctl{grid-template-columns:96px 1fr 44px;font:700 12px 'Archivo Narrow',sans-serif;text-transform:uppercase;letter-spacing:.04em}
#side .mmx-ctl input[type=text]{grid-column:2/4;font:15px 'Courier Prime',monospace;border:0;border-bottom:2px solid #111;background:var(--hi);padding:2px 4px}
#side select{width:100%}#side .mmx-ctl select{grid-column:2/4}
#grid{grid-column:1/3;border-top:4px solid #111;padding:8px 14px 10px;display:grid;grid-template-columns:90px 1fr;gap:4px 10px;background:#fff}
#grid .lab{font:700 12px 'Archivo Narrow';text-transform:uppercase;letter-spacing:.05em;align-self:center}
#cells,#pitch{display:grid;grid-template-columns:repeat(16,1fr);gap:3px}
#cells{grid-template-rows:repeat(8,13px)}.c{background:#eee;cursor:pointer;border:0;padding:0}.c:nth-child(4n+1){background:#e2ded2}.c.on{background:#111}.c.now{outline:2px solid var(--acc)}
.p{font:700 12px 'Courier Prime';text-align:center;background:var(--hi);cursor:pointer;user-select:none;padding:2px 0}.p.now{background:var(--acc);color:#fff}
#gtools{grid-column:2;display:flex;gap:8px;font:12px 'Courier Prime'}#gtools button{font:700 12px 'Archivo Narrow';text-transform:uppercase;background:#fff;border:2px solid #111;padding:3px 8px;cursor:pointer}#gtools button:hover{background:var(--hi)}
.mm-ai{font:13px 'Courier Prime',monospace}.mm-ai-t{font:400 16px 'Anton';letter-spacing:.04em}
#mm-learn-dlg{--learn-bg:#f6f3ea}#mm-learn-dlg h2{font:400 34px/1 'Anton',Impact,sans-serif}#mm-learn-dlg .mm-l-k{font-family:'Archivo Narrow'}
#mmx-deck{--deck-bg:#fff;font-family:'Archivo Narrow',sans-serif}#mmx-deck .mmx-lab{font-family:'Anton';font-weight:400;letter-spacing:.03em}
*/
/*HTML
<div id="mast"><div class="logo">ACTUAL LIFE</div><div class="dates" id="dates"></div><div id="title"></div></div>
<div id="word"><canvas id="cv"></canvas><div id="sec"><button data-s="INTRO">INTRO</button><button id="build" title="hold B">HOLD TO BUILD</button><button data-s="DROP">DROP</button><button data-s="BREAK">BREAK</button></div></div>
<div id="side"><h3>THE ENTRY</h3><div id="entry"></div><h3>THE SONG</h3><div id="song"></div><h3>THE MIX</h3><div id="mix"></div><div id="ai"></div></div>
<div id="grid"><div class="lab">MEMO CHOPS</div><div id="cells"></div><div class="lab">PITCH</div><div id="pitch"></div><div></div><div id="gtools"><button id="gen">new hook (G)</button><button id="clr">clear</button><button id="rechop">re-chop</button><span id="chopinfo"></span></div></div>
*/
const st = MMX.bind({ name: 'Carlos', line: 'gotta move on', style: 'garage', root: 9, prog: 'vi-IV-I-V', crhythm: 'stabs', sevenths: true, chops: 8, chopMode: 'onsets', density: 0.55, chopLen: 1.5, stutter: 0.25, spread: 1, swing: 0.16, field: 0.5, keys: 0.45, drums: 0.8, bass: 0.6, pump: 0.6, auto: true, secBars: 8, buildBars: 4, gap: true, bpm: 132 });
const PROGS = { 'vi-IV-I-V': { m: 'major', d: [5, 3, 0, 4] }, 'I-V-vi-IV': { m: 'major', d: [0, 4, 5, 3] }, 'IV-V-iii-vi': { m: 'major', d: [3, 4, 2, 5] }, 'ii-V-I-vi': { m: 'major', d: [1, 4, 0, 5] }, 'i-VI-III-VII': { m: 'minor', d: [0, 5, 2, 6] }, 'i-iv-VI-v': { m: 'minor', d: [0, 3, 5, 4] } };
const NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
let pat = new Array(16).fill(-1), pdeg = new Array(16).fill(0), chopPos = [], sec = 'INTRO', secBar = 0, building = false, holdBuild = false, cur = { word: '', k: -1, t: 0, step: -1 }, field = null, pumpG, musicIn, lp, hp, cfg;
const cv = MM.canvas('#cv');
// built-in memo: eight formant syllables with a speaking pitch contour, so chops sound like a voice before any sample is loaded
function makeMemo() {
  const ctx = MM.ctx, sr = ctx.sampleRate, B = ctx.createBuffer(1, Math.floor(sr * 3.2), sr), d = B.getChannelData(0);
  const V = { a: [800, 1150, 2900], e: [400, 2000, 2600], i: [300, 2300, 3000], o: [450, 800, 2830], u: [325, 700, 2530] }, syl = ['o', 'a', 'e', 'o', 'u', 'a', 'i', 'o'], f0s = [180, 205, 170, 220, 195, 160, 240, 175];
  let ph = 0; syl.forEach((v, k) => { const o = Math.floor(sr * (0.1 + k * 0.38)), n = Math.floor(sr * 0.28), st2 = [[0, 0], [0, 0], [0, 0]];
    for (let i = 0; i < n; i++) { const t = i / sr, f0 = f0s[k] * (1 - 0.18 * t / 0.28) * (1 + 0.012 * Math.sin(2 * Math.PI * 5.5 * t)); ph += f0 / sr; const src = (ph % 1) < 0.07 ? 1 : 0, nz = (Math.random() * 2 - 1) * 0.04; let y = 0;
      V[v].forEach((f, j) => { const r = Math.exp(-Math.PI * (70 + j * 40) / sr), w = 2 * Math.PI * f / sr, s = st2[j], x = src + nz + 2 * r * Math.cos(w) * s[0] - r * r * s[1]; s[1] = s[0]; s[0] = x; y += x * [1, 0.6, 0.25][j]; });
      const env = Math.min(1, t * 40) * Math.min(1, (0.28 - t) * 25); d[o + i] += y * 0.02 * env; } });
  let m = 0; for (const x of d) m = Math.max(m, Math.abs(x)); for (let i = 0; i < d.length; i++) d[i] *= 0.8 / m; return B;
}
function rechop() {
  const { a, len, b } = MMX.region(0), N = st.chops; let pts = [];
  if (st.chopMode === 'onsets') pts = MM.onsets(b, 48).map((x) => (x - a) / len).filter((x) => x >= 0 && x < 0.97);
  if (pts.length < N) { pts = []; for (let k = 0; k < N; k++) pts.push(k / N); }
  else { const step = pts.length / N; pts = Array.from({ length: N }, (_, k) => pts[Math.floor(k * step)]); }
  chopPos = pts; MM.$('#chopinfo').textContent = `${N} chops (${st.chopMode}) from ${MMX.isUser(0) ? MMX.S.slots[0].name : 'the built-in memo'}`; drawGrid();
}
function chopDur(k, sd) { const nxt = k + 1 < chopPos.length ? chopPos[k + 1] : 1, { len } = MMX.region(0); return Math.min((nxt - chopPos[k]) * len, sd * st.chopLen * 2 + 0.02); }
function gen() { const r = MM.rng(Date.now()), N = st.chops; pat = pat.map(() => -1); const hook = [0, Math.floor(r() * N), Math.floor(r() * N)];
  for (let s = 0; s < 16; s++) { const anchor = s === 0 || s === 3 || s === 6 || s === 10 || s === 12; if (anchor || r() < st.density * 0.6) pat[s] = anchor ? hook[(s / 3 | 0) % 3] : Math.floor(r() * N); }
  pdeg = pdeg.map((_, s) => (pat[s] < 0 ? 0 : MM.pick([0, 0, 0, 2, 4, -1, 1, 3], r))); drawGrid(); }
function drawGrid() {
  const C = MM.$('#cells'), P = MM.$('#pitch'); C.innerHTML = ''; P.innerHTML = ''; C.style.gridTemplateRows = `repeat(${st.chops},${Math.max(6, Math.floor(104 / st.chops))}px)`;
  for (let r = 0; r < st.chops; r++) for (let s = 0; s < 16; s++) { const b = MM.h('button', { class: 'c' + (pat[s] === r ? ' on' : ''), 'data-s': s, title: `step ${s + 1}, chop ${r + 1}` }); b.onclick = () => { pat[s] = pat[s] === r ? -1 : r; drawGrid(); }; C.append(b); }
  for (let s = 0; s < 16; s++) { const p = MM.h('div', { class: 'p', 'data-s': s }, pat[s] < 0 ? '·' : (pdeg[s] > 0 ? '+' : '') + pdeg[s]); p.onclick = (e) => { pdeg[s] = MM.clamp(pdeg[s] + (e.shiftKey ? -1 : 1), -7, 7); drawGrid(); }; p.oncontextmenu = (e) => { e.preventDefault(); pdeg[s] = MM.clamp(pdeg[s] - 1, -7, 7); drawGrid(); }; P.append(p); }
}
function title() { const t = `${st.name || 'Someone'} (${st.line || '...'})`; MM.$('#title').textContent = t; const d = new Date(), f = (x) => x.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }); MM.$('#dates').textContent = `(${f(new Date(d.getFullYear(), d.getMonth(), 1))} - ${f(d)})  ·  entry no. ${MM.$('#cells') ? (pat.filter((x) => x >= 0).length) : 0}`; }
function scaleSemis(deg) { const P = PROGS[st.prog], S = MM.SCALES[P.m], n = S.length, o = Math.floor(deg / n); return 12 * o + S[((deg % n) + n) % n]; }
function chordNotes(bar) { const P = PROGS[st.prog], dg = P.d[bar % 4], base = 48 + st.root, tri = [0, 2, 4].concat(st.sevenths ? [6] : []); return { root: base + scaleSemis(dg) - (scaleSemis(dg) > 7 ? 12 : 0), notes: tri.map((x) => base + scaleSemis(dg + x)) }; }
function buses() { if (musicIn) return; const ctx = MM.ctx; musicIn = ctx.createGain(); lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900; hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 20; pumpG = ctx.createGain(); musicIn.connect(pumpG); pumpG.connect(lp); lp.connect(hp); hp.connect(MM.out); }
function setSection(s, t) { sec = s; secBar = 0; MM.$$('#sec button[data-s]').forEach((b) => b.classList.toggle('on', b.dataset.s === s)); MM.$('#build').classList.toggle('on', s === 'BUILD');
  const now = t ?? MM.now; if (!lp) return; lp.frequency.cancelScheduledValues(now); hp.frequency.cancelScheduledValues(now);
  if (s === 'INTRO') { lp.frequency.setTargetAtTime(700, now, 0.3); hp.frequency.setTargetAtTime(20, now, 0.2); }
  else if (s === 'BUILD') { const bars = st.buildBars * 16 * 60 / st.bpm / 4; lp.frequency.setValueAtTime(lp.frequency.value, now); lp.frequency.exponentialRampToValueAtTime(18000, now + bars); hp.frequency.setValueAtTime(20, now); hp.frequency.exponentialRampToValueAtTime(650, now + bars); }
  else if (s === 'DROP') { lp.frequency.setValueAtTime(18000, now); hp.frequency.setValueAtTime(20, now); }
  else if (s === 'BREAK') { lp.frequency.setTargetAtTime(2600, now, 0.4); hp.frequency.setTargetAtTime(60, now, 0.3); } }
const ORDER = ['INTRO', 'BUILD', 'DROP', 'BREAK', 'BUILD', 'DROP'];
let ordI = 0;
function fieldStart() { if (field) { field.stop(); field = null; } if (!MM.playing) return; const { len } = MMX.region(1); field = MMX.fire(1, MM.now + 0.05, { loop: true, dur: 36000, gain: st.field, dest: musicIn, fadeIn: 1.5 }); }
function drums(s, t, sd, bar, inBuild, prog) {
  const g = st.drums, st0 = st.style; let kick = false;
  if (sec === 'INTRO') { if (s % 8 === 0 && bar % 2 === 1) MMX.fire(3, t, { gain: g * 0.4, cut: 300 }); return false; }
  if (inBuild) { const roll = prog < 0.5 ? 4 : prog < 0.75 ? 2 : 1; if (s % roll === 0) MMX.fire(4, t, { gain: g * (0.25 + 0.5 * prog), semis: prog * 7 }); if (s % 4 === 0 && prog < 0.75) { MMX.fire(3, t, { gain: g * 0.7 }); kick = true; } return kick; }
  const brk = sec === 'BREAK';
  if (st0 === 'house') { if (s % 4 === 0 && !brk) kick = true; if (s === 4 || s === 12) MMX.fire(4, t, { gain: g * 0.6 }); if (s % 4 === 2) MMX.fire(5, t, { gain: g * 0.55 }); else if (!brk) MMX.fire(5, t, { gain: g * 0.15 }); }
  else if (st0 === 'garage') { if ((s === 0 || s === 10 || (s === 7 && bar % 2)) && !brk) kick = true; if (s === 4 || s === 12) MMX.fire(4, t, { gain: g * 0.6 }); if (s % 2 === 0 || Math.random() < 0.35) MMX.fire(5, t, { gain: g * (s % 4 === 2 ? 0.55 : 0.22), pan: s % 4 === 2 ? 0.2 : -0.2 }); if (s === 15 && Math.random() < 0.5) MMX.fire(4, t, { gain: g * 0.25 }); }
  else { if ((s === 0 || s === 11) && !brk) kick = true; if (s === 8) MMX.fire(4, t, { gain: g * 0.7, rev: 0.2 }); if (s % 4 === 0 || (s % 2 === 0 && Math.random() < 0.6)) MMX.fire(5, t, { gain: g * 0.35 }); }
  if (kick) MMX.fire(3, t, { gain: g * 0.95 }); return kick;
}
function step(i, t, sd) {
  if (!musicIn) buses(); cfg.swing = st.style === 'house' ? st.swing * 0.3 : st.swing; MM.bpm = st.bpm;
  const s = i % 16; if (s === 0 && i > 0) { secBar++; const lenB = sec === 'BUILD' ? st.buildBars : st.secBars;
    if (holdBuild) { if (sec !== 'BUILD') { setSection('BUILD', t); } }
    else if (st.auto && secBar >= lenB) { ordI = (ordI + 1) % ORDER.length; setSection(ORDER[ordI], t); } }
  const bar = secBar, inBuild = sec === 'BUILD', prog = inBuild ? Math.min(1, (secBar * 16 + s) / (st.buildBars * 16)) : 0;
  // the gap: one beat of silence before the drop
  const gapNow = st.gap && inBuild && !holdBuild && st.auto && secBar === st.buildBars - 1 && s >= 12;
  if (gapNow) { if (s === 12) MM.noise(t, sd * 4, { freq: 6000, sweep: 300, type: 'bandpass', q: 0.7, gain: 0.08, send: { rev: 0.6 } }); return; }
  let kick = drums(s, t, sd, bar, inBuild, prog);
  if (kick && pumpG) { pumpG.gain.cancelScheduledValues(t); pumpG.gain.setValueAtTime(1 - st.pump * 0.75, t); pumpG.gain.linearRampToValueAtTime(1, t + sd * 3); }
  if (sec === 'DROP' && secBar === 0 && s === 0) MM.noise(t, 1.6, { freq: 9000, sweep: 800, q: 0.5, gain: 0.12, send: { rev: 0.5 } });
  if (inBuild && s === 0) MM.noise(t, sd * 16, { freq: 400 + prog * 4000, sweep: 800 + prog * 9000, q: 2, gain: 0.03 + prog * 0.07, send: { dly: 0.2 } });
  // chords and bass
  const ch = chordNotes(Math.floor(i / 16)), kg = st.keys * (sec === 'INTRO' ? 0.7 : 1);
  const crh = st.crhythm, stab = crh === 'stabs' ? [3, 6, 11, 14].includes(s) : crh === 'pulse' ? s % 2 === 0 : s === 0;
  if (kg > 0.01 && stab) ch.notes.forEach((n, k) => MMX.fire(2, t + k * 0.008, { rate: MM.mtof(n) / MM.mtof(48), gain: kg * (crh === 'held' ? 0.4 : 0.32), dur: crh === 'held' ? sd * 16 : sd * (crh === 'pulse' ? 1.6 : 2.4), pan: (k - 1.5) * 0.25, dest: musicIn, fadeOut: 0.06 }));
  if (st.bass > 0.01 && sec !== 'INTRO' && !inBuild && (st.style === 'house' ? s % 4 === 2 : [0, 3, 10, 13].includes(s))) MM.tone(MM.mtof(ch.root - 12), t, sd * 1.8, { type: 'sine', gain: 0.26 * st.bass, release: 0.06, dest: musicIn });
  // vocal chops
  let k = pat[s], semis = 0; const words = (st.line || '').split(/\s+/).filter(Boolean);
  if (inBuild && prog > 0.75 && k < 0) k = pat[s - (s % 4)] >= 0 ? pat[s - (s % 4)] : -1;
  if (k >= 0 && k < chopPos.length) { semis = scaleSemis(pdeg[s] * st.spread) - 0 + (inBuild ? Math.round(prog * 5) : 0);
    const dur = chopDur(k, sd), stut = Math.random() < st.stutter * (inBuild ? 2 : 1) ? (inBuild && prog > 0.6 ? 4 : 2) : 1;
    for (let r = 0; r < stut; r++) MMX.fire(0, t + r * sd / stut, { pos: chopPos[k], dur: stut > 1 ? sd / stut * 0.9 : dur, semis, gain: sec === 'INTRO' ? 0.75 : 1, rev: sec === 'BREAK' ? 0.25 : 0, dly: s === 14 ? 0.3 : 0 });
    const w = words.length ? words[k % words.length] : st.name; setTimeout(() => (cur = { word: w, k, t: performance.now(), step: s }), Math.max(0, (t - MM.now) * 1000)); }
  setTimeout(() => (cur.step = s, MM.$$('.c.now,.p.now').forEach((e) => e.classList.remove('now')), MM.$$(`.c[data-s="${s}"],.p[data-s="${s}"]`).forEach((e) => e.classList.add('now'))), Math.max(0, (t - MM.now) * 1000));
}
const COLS = { INTRO: ['#f6f3ea', '#111'], BUILD: ['#ffe14d', '#111'], DROP: ['#e10600', '#fff'], BREAK: ['#111', '#f6f3ea'] };
function draw() { cv.fit(); const g = cv.g, W = cv.w, H = cv.h, [bg, fg] = COLS[sec] || COLS.INTRO; g.fillStyle = bg; g.fillRect(0, 0, W, H);
  const age = (performance.now() - cur.t) / 1000, w = (cur.word || st.name || '').toUpperCase(); if (w) { let fs = H * 0.62; g.font = `400 ${fs}px Anton, Impact, sans-serif`; const mw = g.measureText(w).width; if (mw > W * 0.92) { fs *= W * 0.92 / mw; g.font = `400 ${fs}px Anton, Impact, sans-serif`; }
    g.fillStyle = fg; g.globalAlpha = Math.max(0.12, 1 - age * 1.6); g.textBaseline = 'middle'; g.textAlign = 'center'; g.fillText(w, W / 2, H * 0.55 + Math.max(0, 0.15 - age) * 60); g.globalAlpha = 1; }
  g.font = "700 13px 'Courier Prime', monospace"; g.textAlign = 'left'; g.fillStyle = fg; g.fillText(`${sec}  ·  bar ${secBar + 1}  ·  ${st.style.toUpperCase()}  ·  ${NOTES[st.root]} ${PROGS[st.prog].m}  ${st.prog}  ·  ${st.bpm} BPM`, 16, H - 16);
  const p = MMX.S.slots[0]; if (p && chopPos.length) { const y = H - 46; g.globalAlpha = 0.5; g.fillRect(16, y, W - 32, 2); chopPos.forEach((x, k) => { g.globalAlpha = k === cur.k && age < 0.4 ? 1 : 0.5; g.fillRect(16 + x * (W - 32) - 2, y - (k === cur.k && age < 0.4 ? 14 : 6), 4, k === cur.k && age < 0.4 ? 30 : 14); }); g.globalAlpha = 1; } }
function start() { buses(); ordI = 0; setSection(st.auto ? 'INTRO' : sec); fieldStart(); }
function stop() { if (field) { field.stop(); field = null; } }
function buildDown() { MM.ensure(); if (!MM.playing) MM.toggle(true); holdBuild = true; setSection('BUILD'); }
function buildUp() { if (!holdBuild) return; holdBuild = false; const nb = () => { setSection('DROP'); ordI = 2; MM.toast('DROP'); }; const delay = (16 - (MM.S.step % 16)) * 60 / st.bpm / 4; if (st.gap) { setTimeout(nb, Math.max(0, delay * 1000)); lp && lp.frequency.setTargetAtTime(200, MM.now, 0.02); } else nb(); }
cfg = { bpm: 132, div: 4, swing: 0.16, step, start, stop, draw, ownSpace: false,
  onSamples: (L) => { MMX.assign(L); },
  key: (e) => { if (MMX.key(e)) return; const n = +e.key; if (n >= 1 && n <= 8 && chopPos[n - 1] != null) { MM.ensure(); MM.ctx.resume(); MMX.fire(0, MM.now + 0.005, { pos: chopPos[n - 1], dur: chopDur(n - 1, 60 / st.bpm / 4) }); cur = { word: ((st.line || '').split(/\s+/)[n - 1] || st.name), k: n - 1, t: performance.now() }; }
    else if (e.key === 'b' || e.key === 'B') { if (!e.repeat) buildDown(); } else if (e.key === 'g' || e.key === 'G') gen(); else if (e.key === 'ArrowUp') MMX.setParam('bpm', st.bpm + 1); else if (e.key === 'ArrowDown') MMX.setParam('bpm', st.bpm - 1);
    else if (e.key === 'i' || e.key === 'I') setSection('INTRO'); else if (e.key === 'k' || e.key === 'K') setSection('BREAK'); else if (e.key === 'Enter') setSection('DROP'); },
  setup() {
    MM.fb.memo = makeMemo();
    MMX.init({ state: st, slots: [{ label: 'Voice memo', kind: 'memo', rv: 0.12 }, { label: 'Field recording', kind: 'texture', gain: 0.7, rv: 0.2 }, { label: 'Keys / chords', kind: 'tone', gain: 0.7, rv: 0.25 }, { label: 'Kick', kind: 'kick', rv: 0 }, { label: 'Clap / snare', kind: 'snare', rv: 0.15 }, { label: 'Hats', kind: 'hat', rv: 0.05, gain: 0.6 }],
      extra: { get: () => ({ pat, pdeg }), set: (x) => { if (x.pat) pat = x.pat.slice(0, 16); if (x.pdeg) pdeg = x.pdeg.slice(0, 16); drawGrid(); } },
      onSlot: (i) => { if (i === 0) rechop(); if (i === 1) fieldStart(); },
      onPreset: () => { title(); rechop(); },
      factory: { 'Carlos, garage (default)': {}, 'Marea-ish house': { params: { style: 'house', bpm: 124, prog: 'I-V-vi-IV', crhythm: 'held', root: 2, swing: 0.05, name: 'Marea', line: 'we have lost dancing' } }, 'Half-time diary': { params: { style: 'halftime', bpm: 140, prog: 'i-VI-III-VII', crhythm: 'held', root: 4, density: 0.35, name: 'Me', line: 'still here' } } },
      keys: [['1-8', 'play a memo chop now'], ['B (hold)', 'build; let go to drop'], ['I / K / Enter', 'intro / break / drop'], ['G', 'new hook'], ['↑ ↓', 'tempo']],
      midiHelp: 'Notes 36 to 43 play chops 1 to 8. Notes from 48 up play the whole memo chromatically (60 = original pitch). Map any slider with MIDI learn.',
      midi: (n, v, on) => { if (!on) return; if (n >= 36 && n <= 43 && chopPos[n - 36] != null) MMX.fire(0, MM.now + 0.005, { pos: chopPos[n - 36], dur: chopDur(n - 36, 60 / st.bpm / 4), gain: 0.4 + v }); else if (n >= 48) MMX.fire(0, MM.now + 0.005, { semis: n - 60, gain: 0.4 + v, maxDur: 4 }); } });
    const E = MM.$('#entry'), S = MM.$('#song'), X = MM.$('#mix');
    MMX.ctl(E, 'name', { type: 'text', label: 'Who said it', on: title }); MMX.ctl(E, 'line', { type: 'text', label: 'The line', on: title });
    MMX.ctl(S, 'bpm', { label: 'Tempo', min: 70, max: 180, step: 1, on: (v) => (MM.bpm = v) });
    MMX.ctl(S, 'style', { type: 'select', label: 'Drums', options: [['garage', '2-step garage'], ['house', 'four-to-the-floor house'], ['halftime', 'half-time']] });
    MMX.ctl(S, 'swing', { label: 'Swing', min: 0, max: 0.33, step: 0.01 });
    MMX.ctl(S, 'root', { type: 'select', label: 'Key', options: NOTES.map((n, k) => [k, n]) }); MMX.ctl(S, 'prog', { type: 'select', label: 'Progression', options: Object.keys(PROGS).map((k) => [k, k + ' (' + PROGS[k].m + ')']) });
    MMX.ctl(S, 'crhythm', { type: 'select', label: 'Chord rhythm', options: [['stabs', 'garage stabs'], ['held', 'held pads'], ['pulse', 'eighth pulse']] }); MMX.ctl(S, 'sevenths', { type: 'check', label: 'Add 7ths' });
    MMX.ctl(S, 'chops', { label: 'Chops', min: 4, max: 16, step: 1, on: () => chopPos.length && rechop() }); MMX.ctl(S, 'chopMode', { type: 'select', label: 'Chop at', options: [['onsets', 'word onsets'], ['equal', 'equal slices']], on: () => chopPos.length && rechop() });
    MMX.ctl(S, 'chopLen', { label: 'Chop length', min: 0.25, max: 4, step: 0.05 }); MMX.ctl(S, 'stutter', { label: 'Stutter', min: 0, max: 1 }); MMX.ctl(S, 'spread', { label: 'Pitch spread', min: 0, max: 2, step: 1 }); MMX.ctl(S, 'density', { label: 'Hook density', min: 0, max: 1 });
    MMX.ctl(S, 'auto', { type: 'check', label: 'Auto-arrange' }); MMX.ctl(S, 'secBars', { label: 'Section bars', min: 2, max: 16, step: 1 }); MMX.ctl(S, 'buildBars', { label: 'Build bars', min: 1, max: 8, step: 1 }); MMX.ctl(S, 'gap', { type: 'check', label: 'Gap before drop' });
    MMX.ctl(X, 'field', { label: 'Field bed', min: 0, max: 1.2, on: (v) => field && field.g.gain.setTargetAtTime(v * MMX.S.slots[1].gain * 0.8, MM.now, 0.2) }); MMX.ctl(X, 'keys', { label: 'Keys', min: 0, max: 1 }); MMX.ctl(X, 'bass', { label: 'Sub bass', min: 0, max: 1 }); MMX.ctl(X, 'drums', { label: 'Drums', min: 0, max: 1.2 }); MMX.ctl(X, 'pump', { label: 'Sidechain pump', min: 0, max: 1 });
    MM.$$('#sec button[data-s]').forEach((b) => (b.onclick = () => { MM.ensure(); if (!MM.playing) MM.toggle(true); setSection(b.dataset.s); ordI = ORDER.indexOf(b.dataset.s); }));
    const B = MM.$('#build'); B.onpointerdown = buildDown; B.onpointerup = B.onpointerleave = buildUp; addEventListener('keyup', (e) => { if (e.key === 'b' || e.key === 'B') buildUp(); });
    MM.$('#gen').onclick = gen; MM.$('#clr').onclick = () => { pat.fill(-1); drawGrid(); }; MM.$('#rechop').onclick = rechop;
    MM.aiBox(MM.$('#ai'), { title: 'YOUR DAY INTO A SONG', help: 'Describe your day, or paste the line someone said. Gemini picks the name, the line, drums, key, progression and tempo.', placeholder: 'My sister rang from Leeds, laughing, and said "you always find the light in it". Long walk home in the rain.',
      system: 'You arrange songs in the style of Fred again..\'s Actual Life records: a person\'s name and a short line they said become the title, over house or UK garage drums with emotional chords. Reply with JSON only.',
      schema: { type: 'OBJECT', properties: { name: { type: 'STRING' }, line: { type: 'STRING' }, style: { type: 'STRING', enum: ['garage', 'house', 'halftime'] }, bpm: { type: 'INTEGER' }, root: { type: 'INTEGER' }, prog: { type: 'STRING', enum: Object.keys(PROGS) }, crhythm: { type: 'STRING', enum: ['stabs', 'held', 'pulse'] }, note: { type: 'STRING' } }, required: ['name', 'line', 'style', 'bpm', 'prog'] },
      user: (p) => `My day: ${p}\nPick a first name (from the text if there is one), a short lowercase line of 2 to 6 words that was said or felt, the drum style, a bpm between 118 and 142, a key root 0 to 11 (0 = C), one progression, a chord rhythm, and a one-sentence note on why.`,
      apply: (r) => { ['name', 'line', 'style', 'prog', 'crhythm'].forEach((k) => r[k] && MMX.setParam(k, r[k])); if (r.bpm) MMX.setParam('bpm', MM.clamp(r.bpm | 0, 70, 180)); if (r.root != null) MMX.setParam('root', ((r.root | 0) % 12 + 12) % 12); gen(); return r.note || `${r.name} (${r.line})`; },
      fallback: (p) => { const nm = (p.match(/\b[A-Z][a-z]{2,}\b/g) || ['Someone']).filter((w) => !/^(My|The|I|A|And|Long|But)$/.test(w))[0] || 'Someone', q = (p.match(/"([^"]{3,40})"/) || [])[1]; MMX.setParam('name', nm); if (q) MMX.setParam('line', q.toLowerCase()); MMX.setParam('style', MM.pick(['garage', 'house', 'halftime'])); MMX.setParam('prog', MM.pick(Object.keys(PROGS))); gen(); } });
    title(); rechop(); gen(); setSection('INTRO');
  } };
MM.init(cfg);
