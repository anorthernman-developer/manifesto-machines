/*META
{"title":"Seed Garden","deep":true,"category":"Eno","date":"2026-10-27","kicker":"WHAT WOULD BRIAN ENO DO?",
"idea":"Plant sounds as tape loops of different lengths and let them drift in and out of phase, so the music is never the same twice. Garden it with seeds, pruning, weather, a deck of Oblique Strategies and a tape machine that prints the garden back into itself.",
"controls":"6 slots (piano, voice, texture, bell, found sound, TAPE); up to 12 loop beds, each with its own length, note, sound, swell and pan; scale, key, octave and loop-length programme; attention slider (ignorable to interesting); growth and weather; Discreet-style tape echo with wow and hiss; Oblique Strategies cards that really change the system; PRINT TO TAPE resampling; a Gerstner morphological box that writes a whole programme.",
"how":"Press PLAY. Each ring is a tape loop: the dot goes round once per loop and plays its note when it passes the top. Because no two loops are the same length, they line up differently every time. SEED plants a new loop (S), PRUNE removes one (P) and clicking a ring removes that loop. Turn GROWTH up and the garden seeds and prunes itself, while WEATHER slowly bends the lengths and notes. DRAW A CARD (O) turns over an Oblique Strategy and does what it says to the music. PRINT TO TAPE (T) records the last bars into the TAPE slot and plants it back at half speed. In the PROGRAMME box, click one cell per row or press RANDOM PROGRAMME, then PLANT PROGRAMME to start a new garden from it.",
"fonts":"family=Inter+Tight:wght@400;600;800","bpm":60,
"try":["Load three single notes from your Splice folder (a piano, a voice 'ooh' and a pad) into slots 1 to 3, set each slot's PITCH so it reads as C, then plant a programme in a pentatonic scale. Every loop will sit in key.","Put a long field recording or a crackly vinyl loop into FOUND SOUND, set its slot START and END to a short, quiet section, and seed it a few times. ATTENTION near 'ignorable' turns it into background weather.","Play for two minutes, PRINT TO TAPE, then PRUNE everything except the tape loop. Seed again around it. Eno's studio idea is that the recording becomes the next instrument."],
"manifesto":{"name":"What would Brian Eno do? Generative music, tape loops and gardening","short":"Brian Eno","author":"Brian Eno (b. 1948), with Peter Schmidt for Oblique Strategies","year":"1975 to 2011","where":"Discreet Music (1975), Oblique Strategies (1975), Music for Airports (1978), 'The Studio as Compositional Tool' (lecture, 1979), Generative Music 1 (1996), 'Composers as Gardeners' (Edge, 2011)",
"ideas":["Set up a system and let it make the music. On Music for Airports, loops of different lengths drift in and out of phase, so the same few notes keep making new combinations.","Discreet Music came from a simple tape-echo system: two tape recorders let a short phrase repeat and decay while he barely touched it.","Oblique Strategies, a deck of cards made with the painter Peter Schmidt, offers one instruction to break a creative deadlock.","The studio is an instrument. A recording can be treated, slowed, layered and fed back in, rather than just capturing a performance.","The composer as gardener: plant seeds and wait to see what comes up, instead of drawing the whole building in advance like an architect."],
"quotes":[["as ignorable as it is interesting","Brian Eno, liner notes to Ambient 1: Music for Airports, 1978"],["someone who plants seeds and waits to see exactly what will come up","Brian Eno on the gardener, 'Composers as Gardeners', Edge, 2011"],["Honor thy error as a hidden intention","Oblique Strategies, Brian Eno and Peter Schmidt, 1975"]],
"system":"Every planted sound is a loop with its own length, and lengths are chosen to avoid simple ratios, so the pattern doesn't repeat. You don't write a melody; you choose a scale, a few sounds and a range of lengths, then garden. Growth seeds and prunes on its own, and weather bends lengths and notes very slowly. The attention slider moves between music you can ignore (sparse, dark, long swells) and music that rewards listening (brighter, denser, more detail). Each Oblique Strategies card is wired to a real change, and PRINT TO TAPE feeds the garden's own output back in as a new, slower loop."},
"design":{"name":"Karl Gerstner, Designing Programmes","short":"Karl Gerstner","who":"Karl Gerstner (1930 to 2017), Swiss designer, painter and co-founder of the agency GGK in Basel","era":"Basel, late 1950s to 1980s",
"hallmarks":["Design as a programme, not a single solution: a set of rules that produces many results. His line 'Instead of solutions for problems, programmes for solutions' fits Eno's systems closely.","The morphological box: a grid of parameters and options, where one path through it gives one design. The PROGRAMME box here works the same way.","Strict sans-serif typography on a flexible grid, and systematic colour arranged in circles and rings, as in his colour paintings."],
"works":["Designing Programmes (book, 1964)","The mobile grid for Capital magazine (1962)","The Forms of Color (book, 1986)"]}}
*/
/*CSS
:root{--bg:#fff;--fg:#000;--acc:#ff3b00;--bar-font:'Inter Tight','Helvetica Neue',Arial,sans-serif;--head-font:'Inter Tight',Helvetica,sans-serif;--learn-font:'Inter Tight',Helvetica,sans-serif}
#mm-bar{background:#000;color:#fff;font-weight:600}
#mm-stage{display:grid;grid-template-columns:minmax(0,1fr) 380px;grid-template-rows:minmax(0,1fr) auto;font-family:'Inter Tight',Helvetica,sans-serif}
#garden{position:relative;border-right:1px solid #000}#cv{position:absolute;inset:0;width:100%;height:100%;cursor:crosshair}
#card{position:absolute;left:24px;top:22px;max-width:300px;font:800 13px/1.25 'Inter Tight';letter-spacing:.02em}
#card .k{font-size:10px;letter-spacing:.2em;font-weight:600;opacity:.6}#card .t{font-size:24px;line-height:1.05;margin:4px 0 6px;letter-spacing:-.01em}#card .a{font-weight:400;font-size:12px;opacity:.8}
#acts{position:absolute;right:16px;top:16px;display:grid;gap:6px}#acts button{font:800 12px 'Inter Tight';letter-spacing:.06em;text-transform:uppercase;background:#fff;border:2px solid #000;padding:7px 12px;cursor:pointer;text-align:left}#acts button:hover{background:#000;color:#fff}#acts #oc{background:var(--acc);border-color:var(--acc);color:#fff}
#stat{position:absolute;left:24px;bottom:14px;font:600 11px 'Inter Tight';letter-spacing:.12em;text-transform:uppercase}
#side{overflow:auto;padding:14px 16px;display:flex;flex-direction:column;gap:6px}
#side h3{font:800 11px 'Inter Tight';letter-spacing:.22em;margin:10px 0 2px;border-top:4px solid #000;padding-top:6px}
#side .mmx-ctl{grid-template-columns:110px 1fr 46px;font:600 12px 'Inter Tight'}#side .mmx-ctl select{grid-column:2/4}
#box{grid-column:1/3;border-top:1px solid #000;display:grid;grid-template-columns:120px repeat(5,1fr) 150px;font:600 11px 'Inter Tight'}
#box .rh{padding:5px 10px;border-bottom:1px solid #000;border-right:1px solid #000;font-weight:800;letter-spacing:.12em;text-transform:uppercase;font-size:10px;display:flex;align-items:center}
#box .o{padding:5px 8px;border-bottom:1px solid #000;border-right:1px solid #ddd;cursor:pointer;display:flex;align-items:center}#box .o:hover{background:#f0f0f0}#box .o.on{background:#000;color:#fff}
#box .act{grid-column:7;grid-row:1/span 5;display:flex;flex-direction:column;border-bottom:1px solid #000}#box .act button{flex:1;font:800 11px 'Inter Tight';letter-spacing:.08em;background:#fff;border:0;border-bottom:1px solid #000;cursor:pointer}#box .act button:last-child{background:var(--acc);color:#fff;border:0}
#mm-learn-dlg{box-shadow:12px 12px 0 #000}#mm-learn-dlg h2{font-weight:800;letter-spacing:-.02em}
*/
/*HTML
<div id="garden"><canvas id="cv"></canvas><div id="card"><div class="k">OBLIQUE STRATEGY</div><div class="t" id="ct">Press O to draw a card</div><div class="a" id="ca">Each card changes the garden.</div></div>
<div id="acts"><button id="seed">Seed (S)</button><button id="prune">Prune (P)</button><button id="oc">Draw a card (O)</button><button id="tape">Print to tape (T)</button><button id="old">Use an old idea (Z)</button></div><div id="stat"></div></div>
<div id="side"><h3>GARDEN</h3><div id="g1"></div><h3>SPACE AND TAPE</h3><div id="g2"></div><h3>SELECTED BED</h3><div id="g3"></div></div>
<div id="box"></div>
*/
const st = MMX.bind({ scale: 'penta', root: 0, oct: 0, minLen: 14, maxLen: 34, speed: 1, attention: 0.35, growth: 0.25, weather: 0.3, maxBeds: 9, seedSlot: -1, swell: 1.5, space: 0.55, echo: 0.35, echoTime: 3.2, wow: 0.3, hiss: 0.15, still: false, bed: 0, bedLen: 20, bedDeg: 0, bedPan: 0 });
const PALETTE = ['#ff3b00', '#ffb000', '#00a651', '#0070ff', '#7b2cff', '#ff2d95', '#00b8c8', '#9c6b00', '#222', '#ff6f61', '#3cb371', '#4169e1'];
let beds = [], history = [], card = null, stillUntil = 0, hissN = null, echoIn, echoD, echoFb, tapeRec, wowO, wowG, sel = -1, lastPrint = 0;
const cv = MM.canvas('#cv');
const CARDS = [
  ['Honor thy error as a hidden intention', 'A wrong note is planted on purpose, and kept.', () => { seed({ deg: Math.floor(Math.random() * 5) + 0.5 }); }],
  ['Repetition is a form of change', 'A loop is copied at a slightly different length, so the two slowly phase.', () => { const b = pickBed(); if (b) seed({ ...b, len: b.len * (1 + (Math.random() * 0.06 + 0.02)), pan: -b.pan, phase: Math.random() }); }],
  ['Do nothing for as long as possible', 'Growth and weather pause for two minutes. Just listen.', () => { stillUntil = MM.now + 120; }],
  ['Emphasize the flaws', 'More tape wow and hiss.', () => { MMX.setParam('wow', Math.min(1, st.wow + 0.3)); MMX.setParam('hiss', Math.min(0.8, st.hiss + 0.2)); }],
  ['Use an old idea', 'The garden goes back to an earlier state.', () => restore()],
  ['Discard an axiom', 'The scale is thrown out and another is chosen.', () => { MMX.setParam('scale', MM.pick(Object.keys(SCL).filter((k) => k !== st.scale))); }],
  ['Only one element of each kind', 'Only one loop per sound survives.', () => { const seen = new Set(); snap(); beds = beds.filter((b) => (seen.has(b.slot) ? false : seen.add(b.slot))); }],
  ['Is it finished?', 'Growth stops. Nothing new is planted until you seed.', () => MMX.setParam('growth', 0)],
  ['Remove specifics and convert to ambiguities', 'More space, slower swells, less attention.', () => { MMX.setParam('space', Math.min(1, st.space + 0.25)); MMX.setParam('swell', Math.min(6, st.swell + 1.5)); MMX.setParam('attention', Math.max(0, st.attention - 0.2)); }],
  ['Go slowly all the way round the outside', 'Every loop becomes half as fast again.', () => MMX.setParam('speed', Math.max(0.25, st.speed / 1.5))],
  ['Turn it upside down', 'Every note is inverted around the root.', () => beds.forEach((b) => (b.deg = -b.deg + 4))],
  ['Use fewer notes', 'Half the loops are pruned.', () => { snap(); beds = beds.filter((_, i) => i % 2 === 0); }],
  ['Reverse', 'Every sound is flipped.', () => MMX.S.slots.forEach((s) => (s.rev = !s.rev))],
  ['Abandon normal instruments', 'The loops move to the found-sound and tape slots.', () => beds.forEach((b, i) => (b.slot = i % 2 ? 4 : MMX.isUser(5) ? 5 : 2))],
  ['Simple subtraction', 'The loudest loop is removed.', () => { snap(); beds.sort((a, b) => b.gain - a.gain).shift(); }],
  ['Water', 'Everything slides under water: the echo darkens and lengthens.', () => { MMX.setParam('echo', Math.min(0.8, st.echo + 0.2)); MMX.setParam('echoTime', Math.min(6, st.echoTime * 1.3)); }],
];
const SCL = { penta: [0, 2, 4, 7, 9], major: [0, 2, 4, 5, 7, 9, 11], lydian: [0, 2, 4, 6, 7, 9, 11], dorian: [0, 2, 3, 5, 7, 9, 10], minpent: [0, 3, 5, 7, 10], hira: [0, 2, 3, 7, 8], whole: [0, 2, 4, 6, 8, 10], fifths: [0, 7] };
const NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
function note(deg) { const S = SCL[st.scale] || SCL.penta, n = S.length, d = Math.round(deg), o = Math.floor(d / n), off = deg - d; return 60 + st.root + st.oct * 12 + 12 * o + S[((d % n) + n) % n] + off * 1; }
function snap() { history.push(JSON.stringify(beds)); if (history.length > 30) history.shift(); }
function restore() { if (!history.length) return MM.toast('No older garden yet'); const h = history.length > 3 ? history[Math.floor(Math.random() * (history.length - 2))] : history[0]; beds = JSON.parse(h); beds.forEach((b) => (b.next = MM.now + Math.random() * 4)); }
function irr(a, b) { // a length between a and b that avoids simple ratios with the existing loops
  for (let k = 0; k < 20; k++) { const L = a + Math.random() * (b - a); if (beds.every((x) => { const r = Math.max(L, x.len) / Math.min(L, x.len); return [1, 1.5, 2, 4 / 3, 3].every((q) => Math.abs(r - q) > 0.04); })) return +L.toFixed(3); } return +(a + Math.random() * (b - a)).toFixed(3); }
function seed(o = {}) { if (beds.length >= 12) beds.shift(); snap(); const slot = o.slot ?? (st.seedSlot >= 0 ? st.seedSlot : MM.pick([0, 0, 1, 2, 3, 3, 4].filter((i) => i !== 4 || MMX.isUser(4) || Math.random() < 0.3)));
  const b = { slot, len: o.len ?? irr(st.minLen, st.maxLen), deg: o.deg ?? Math.floor(Math.random() * 8) - 2, pan: o.pan ?? +(Math.random() * 1.6 - 0.8).toFixed(2), gain: o.gain ?? +(0.5 + Math.random() * 0.4).toFixed(2), col: PALETTE[beds.length % PALETTE.length], phase: o.phase ?? Math.random(), born: MM.now, next: 0, flash: 0 };
  b.next = MM.now + (1 - b.phase) * b.len / st.speed; beds.push(b); selectBed(beds.length - 1); return b; }
function prune(i) { if (!beds.length) return; snap(); beds.splice(i ?? Math.floor(Math.random() * beds.length), 1); selectBed(Math.min(sel, beds.length - 1)); }
function pickBed() { return beds[Math.floor(Math.random() * beds.length)]; }
function drawCard() { const c = MM.pick(CARDS.filter((x) => !card || x[0] !== card[0])); card = c; MM.$('#ct').textContent = c[0]; MM.$('#ca').textContent = c[1]; try { c[2](); } catch (e) { console.error(e); } MM.toast(c[0]); }
function selectBed(i) { sel = i; const b = beds[i]; if (!b) return; MMX.setParam('bed', i); st.bedLen = b.len; st.bedDeg = b.deg; st.bedPan = b.pan; MMX.refresh(); }
function chain() { if (echoIn) return; const ctx = MM.ctx; echoIn = ctx.createGain(); echoD = ctx.createDelay(8); echoFb = ctx.createGain(); const lp = ctx.createBiquadFilter(); lp.frequency.value = 2400; wowO = ctx.createOscillator(); wowO.frequency.value = 0.31; wowG = ctx.createGain(); wowG.gain.value = 0.002; wowO.connect(wowG); wowG.connect(echoD.delayTime); wowO.start();
  echoIn.connect(echoD); echoD.connect(lp); lp.connect(echoFb); echoFb.connect(echoD); lp.connect(MM.out); lp.connect(MM.rev); applySpace(); }
function applySpace() { if (!echoIn) return; const t = MM.now; echoD.delayTime.setTargetAtTime(st.echoTime, t, 0.5); echoFb.gain.setTargetAtTime(st.echo, t, 0.3); wowG.gain.setTargetAtTime(0.0005 + st.wow * 0.006, t, 0.3); }
function hiss() { if (hissN) { try { hissN.s.stop(); } catch (e) {} hissN = null; } if (!MM.playing || st.hiss < 0.01) return; hissN = MM.noise(MM.now, 36000, { freq: 5000, type: 'highpass', q: 0.5, gain: st.hiss * 0.025, attack: 2 }); }
function play(b, t) { const att = st.attention, sw = st.swell * (1.4 - att), rate = MM.mtof(note(b.deg)) / MM.mtof(60), dur = Math.min(MMX.region(b.slot).len / rate, Math.max(2, b.len / st.speed * 0.9));
  const wobble = (Math.random() - 0.5) * st.wow * 25; MMX.fire(b.slot, t, { rate, semis: wobble / 100, gain: b.gain * (0.55 + att * 0.5), dur, fadeIn: Math.min(sw, dur * 0.45), fadeOut: Math.min(dur * 0.5, 1.5 + sw), pan: b.pan, rev: st.space * 0.8, cut: 900 + att * 9000, });
  b.flash = 1;
  if (att > 0.55 && Math.random() < (att - 0.5)) MMX.fire(b.slot, t + 60 / 80 * (1 + Math.floor(Math.random() * 3)), { rate: rate * 2, gain: b.gain * 0.25, dur: Math.min(dur, 2), fadeIn: 0.01, pan: -b.pan, rev: st.space }); }
let lastGrow = 0;
function tick(now) { chain();
  for (const b of beds) { if (b.next < now - 1) b.next = now + 0.05; if (b.next < now + 0.25) { play(b, b.next); toEcho(b); b.next += b.len / st.speed; } }
  const still = now < stillUntil || st.still; if (!still && now - lastGrow > 4) { lastGrow = now; const g = st.growth;
    if (Math.random() < g * 0.35 && beds.length < st.maxBeds) seed(); else if (Math.random() < g * 0.2 && beds.length > 3) prune();
    if (st.weather > 0) beds.forEach((b) => { b.len = MM.clamp(b.len * (1 + (Math.random() - 0.5) * 0.01 * st.weather), 3, 90); if (Math.random() < st.weather * 0.03) b.deg += MM.pick([-1, 1]); }); }
 }
function toEcho(b) { /* a share of each loop is fed to the Discreet-style tape echo */ if (!echoIn) return; const rate = MM.mtof(note(b.deg)) / MM.mtof(60); MMX.fire(b.slot, b.next, { rate, gain: b.gain * 0.25 * st.echo, dur: Math.min(3, MMX.region(b.slot).len / rate), fadeIn: st.swell, dest: echoIn, pan: b.pan }); }
function printTape() { MM.ensure(); const tp = MMX.tap(20); const want = Math.min(16, Math.max(4, 8 * (60 / MM.bpm) * 2)); setTimeout(() => { const B = tp.grab(want); if (!B) return MM.toast('Let it play a few seconds, then print'); MMX.setBuf(5, B, 'tape print ' + new Date().toLocaleTimeString('en-GB')); seed({ slot: 5, deg: -5, len: irr(Math.max(st.minLen, B.duration * 2.2), Math.max(st.maxLen, B.duration * 2.6)), gain: 0.7 }); MM.toast('Printed to tape and planted at half speed'); }, MMX.S.tapStarted ? 0 : 100); MMX.S.tapStarted = true; }
function draw() { cv.fit(); const g = cv.g, W = cv.w, H = cv.h, cx = W * 0.5, cy = H * 0.52, R = Math.min(W, H) * 0.44, now = MM.now; g.fillStyle = '#fff'; g.fillRect(0, 0, W, H);
  const n = Math.max(1, beds.length); beds.forEach((b, i) => { const r = R * (0.18 + 0.82 * (i + 1) / n), ph = MM.playing ? 1 - ((b.next - now) * st.speed / b.len) : b.phase; b.flash *= 0.94;
    g.lineWidth = Math.max(3, R * 0.82 / n * 0.5) * (i === sel ? 1.2 : 1); g.strokeStyle = b.col; g.globalAlpha = 0.25 + 0.6 * b.flash + (i === sel ? 0.2 : 0); g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke();
    g.globalAlpha = 1; g.lineWidth = Math.max(3, R * 0.82 / n * 0.5); g.beginPath(); g.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + ph * Math.PI * 2); g.stroke();
    const a = -Math.PI / 2 + ph * Math.PI * 2; g.fillStyle = '#000'; g.beginPath(); g.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 4 + b.flash * 6, 0, 7); g.fill(); });
  g.fillStyle = '#000'; g.fillRect(cx - 1, cy - R - 14, 2, 14); g.font = "800 11px 'Inter Tight'"; g.textAlign = 'center'; g.fillText('PLAY POINT', cx, cy - R - 18);
  MM.$('#stat').textContent = `${beds.length} loops · ${NOTES[st.root]} ${st.scale} · speed ×${st.speed.toFixed(2)} · ${now < stillUntil ? 'doing nothing for ' + Math.ceil(stillUntil - now) + ' s' : st.growth > 0 ? 'growing' : 'not growing'}`; }
// Gerstner's morphological box: one choice per row is one programme
const BOX = [['Scale', 'scale', [['penta', 'pentatonic'], ['lydian', 'lydian'], ['dorian', 'dorian'], ['hira', 'hirajoshi'], ['fifths', 'fifths only']]],
  ['Loop lengths', 'lens', [[[4, 9], '4-9 s'], [[9, 17], '9-17 s'], [[14, 34], '14-34 s'], [[25, 60], '25-60 s'], [[3, 60], '3-60 s, wild']]],
  ['Sounds', 'snd', [[[0], 'piano only'], [[0, 1], 'piano + voice'], [[2, 3], 'texture + bell'], [[0, 1, 2, 3], 'all four'], [[4, 5], 'found + tape']]],
  ['Space', 'spc', [[0.15, 'dry room'], [0.4, 'hall'], [0.6, 'cathedral'], [0.8, 'airport'], [1, 'fog']]],
  ['Number of loops', 'num', [[2, 'two'], [4, 'four'], [6, 'six'], [8, 'eight'], [11, 'eleven']]]];
let prog = [0, 2, 3, 2, 3];
function boxUI() { const el = MM.$('#box'); el.innerHTML = ''; BOX.forEach(([lab, , opts], r) => { el.append(MM.h('div', { class: 'rh' }, lab)); opts.forEach(([, l], c) => { const o = MM.h('div', { class: 'o' + (prog[r] === c ? ' on' : '') }, l); o.onclick = () => { prog[r] = c; boxUI(); }; el.append(o); }); });
  el.append(MM.h('div', { class: 'act' }, MM.h('button', { onclick: () => { prog = prog.map(() => Math.floor(Math.random() * 5)); boxUI(); } }, 'RANDOM PROGRAMME'), MM.h('button', { id: 'plant', onclick: plantProgramme }, 'PLANT PROGRAMME'))); }
function plantProgramme() { MM.ensure(); if (!MM.playing) MM.toggle(true); snap(); const v = (r) => BOX[r][2][prog[r]][0]; MMX.setParam('scale', v(0)); const [a, b] = v(1); MMX.setParam('minLen', a); MMX.setParam('maxLen', b); MMX.setParam('space', v(3)); const snd = v(2), n = v(4); beds = [];
  for (let k = 0; k < n; k++) { const b = seed({ slot: snd[k % snd.length], deg: [0, 2, 4, 1, 3, 5, -1, 7, 6, -2, 8][k] }); b.next = MM.now + 0.1 + k * (0.6 + Math.random() * 1.6); } MM.toast('Planted: ' + prog.map((c, r) => BOX[r][2][c][1]).join(' · ')); }
function bell() { const ctx = MM.ctx, sr = ctx.sampleRate, B = ctx.createBuffer(1, sr * 4, sr), d = B.getChannelData(0), f = MM.mtof(60); for (let i = 0; i < d.length; i++) { const t = i / sr, m = Math.sin(2 * Math.PI * f * 1.41 * t) * 2.2 * Math.exp(-t * 1.2); d[i] = Math.sin(2 * Math.PI * f * t + m) * Math.exp(-t * 0.9) * Math.min(1, t * 300) * 0.6; } return B; }
function piano() { const ctx = MM.ctx, sr = ctx.sampleRate, B = ctx.createBuffer(1, sr * 5, sr), d = B.getChannelData(0), f = MM.mtof(60); for (let i = 0; i < d.length; i++) { const t = i / sr; let s = 0; [[1, 1, 0.8], [2, 0.5, 1.3], [3, 0.25, 2], [4, 0.14, 2.6], [5, 0.08, 3.2]].forEach(([h, a, dec]) => (s += a * Math.sin(2 * Math.PI * f * h * (1 + h * h * 0.0004) * t) * Math.exp(-t * dec))); d[i] = s * Math.min(1, t * 500) * 0.5; } return B; }
const cfg = { bpm: 60, tick, draw, start: () => { chain(); applySpace(); hiss(); if (!beds.length) plantProgramme(); beds.forEach((b, k) => (b.next = MM.now + 0.1 + k * 0.9)); }, stop: () => { if (hissN) { try { hissN.s.stop(); } catch (e) {} hissN = null; } },
  onSamples: (L) => MMX.assign(L),
  key: (e) => { if (MMX.key(e)) return; const k = e.key.toLowerCase(); if (k === 's') { MM.ensure(); if (!MM.playing) MM.toggle(true); seed(); } else if (k === 'p') prune(); else if (k === 'o') drawCard(); else if (k === 't') printTape(); else if (k === 'z') restore(); else if (k === 'n') { plantProgramme(); }
    else if (+e.key >= 1 && +e.key <= 6) { MMX.setParam('seedSlot', +e.key - 1); MM.toast('Seeding slot ' + e.key + ': ' + MMX.S.slots[+e.key - 1].label); } else if (e.key === '0') MMX.setParam('seedSlot', -1); },
  setup() {
    MM.fb.bell = bell(); MM.fb.piano = piano();
    MMX.init({ state: st, slots: [{ label: 'Piano', kind: 'piano', rv: 0.3 }, { label: 'Voice', kind: 'voice', rv: 0.35, gain: 0.7 }, { label: 'Texture', kind: 'texture', rv: 0.4, gain: 0.6 }, { label: 'Bell', kind: 'bell', rv: 0.35, gain: 0.6 }, { label: 'Found sound', kind: 'loop', rv: 0.3, gain: 0.5, cut: 3000 }, { label: 'Tape (prints land here)', kind: 'tone', rv: 0.3 }],
      extra: { get: () => ({ beds: beds.map(({ next, flash, born, ...b }) => b), prog }), set: (x) => { if (x.beds) { beds = x.beds.map((b) => ({ ...b, next: MM.now + Math.random() * 3, flash: 0 })); } if (x.prog) { prog = x.prog; boxUI(); } } },
      onSlot: (i) => { if (MM.playing && i !== 5) { const b = seed({ slot: i, deg: 0 }); b.next = MM.now + 0.05; MM.toast('Planted your sound as a new loop'); } },
      factory: { 'Airport (default)': {}, 'Fog bank': { params: { scale: 'fifths', minLen: 25, maxLen: 60, space: 1, attention: 0.1, swell: 4, echo: 0.55 } }, 'Listening garden': { params: { scale: 'lydian', minLen: 4, maxLen: 9, attention: 0.85, growth: 0.5, swell: 0.3, space: 0.4 } } },
      keys: [['S', 'seed a loop'], ['P', 'prune a loop'], ['O', 'draw an Oblique Strategy'], ['T', 'print to tape'], ['Z', 'use an old idea (undo)'], ['N', 'plant the programme'], ['1-6 / 0', 'seed from slot 1-6 / any slot'], ['click a ring', 'select it; shift-click prunes it']],
      midiHelp: 'Each note plants a loop at that pitch (60 = the root). Notes below 48 prune. Map any slider with MIDI learn.',
      midi: (n, v, on) => { if (!on) return; if (n < 48) prune(); else { if (!MM.playing) MM.toggle(true); const S = SCL[st.scale]; let best = 0, bd = 99; for (let d = -14; d < 21; d++) { const x = Math.abs(note(d) - (n + st.oct * 12)); if (x < bd) { bd = x; best = d; } } seed({ deg: best, gain: 0.4 + v * 0.5 }); } } });
    const A = MM.$('#g1'), B = MM.$('#g2'), C = MM.$('#g3');
    MMX.ctl(A, 'attention', { label: 'Attention', min: 0, max: 1, hint: 'ignorable to interesting' }); MMX.ctl(A, 'growth', { label: 'Growth', min: 0, max: 1 }); MMX.ctl(A, 'weather', { label: 'Weather', min: 0, max: 1 }); MMX.ctl(A, 'maxBeds', { label: 'Max loops', min: 2, max: 12, step: 1 });
    MMX.ctl(A, 'scale', { type: 'select', label: 'Scale', options: Object.keys(SCL).map((k) => [k, k]) }); MMX.ctl(A, 'root', { type: 'select', label: 'Key', options: NOTES.map((x, k) => [k, x]) }); MMX.ctl(A, 'oct', { label: 'Octave', min: -2, max: 1, step: 1 });
    MMX.ctl(A, 'minLen', { label: 'Shortest loop', min: 2, max: 60, step: 0.5, fmt: (v) => v + ' s' }); MMX.ctl(A, 'maxLen', { label: 'Longest loop', min: 3, max: 90, step: 0.5, fmt: (v) => v + ' s' }); MMX.ctl(A, 'speed', { label: 'Tape speed', min: 0.25, max: 3, step: 0.01, fmt: (v) => '×' + v.toFixed(2) });
    MMX.ctl(A, 'seedSlot', { type: 'select', label: 'Seed from', options: [[-1, 'any sound'], [0, '1 piano'], [1, '2 voice'], [2, '3 texture'], [3, '4 bell'], [4, '5 found'], [5, '6 tape']] }); MMX.ctl(A, 'still', { type: 'check', label: 'Hold still' });
    MMX.ctl(B, 'swell', { label: 'Swell', min: 0.01, max: 6, step: 0.01, fmt: (v) => v.toFixed(1) + ' s' }); MMX.ctl(B, 'space', { label: 'Space', min: 0, max: 1 }); MMX.ctl(B, 'echo', { label: 'Tape echo', min: 0, max: 0.85, on: applySpace }); MMX.ctl(B, 'echoTime', { label: 'Echo time', min: 0.2, max: 7, step: 0.05, fmt: (v) => v.toFixed(2) + ' s', on: applySpace }); MMX.ctl(B, 'wow', { label: 'Wow & flutter', min: 0, max: 1, on: applySpace }); MMX.ctl(B, 'hiss', { label: 'Hiss', min: 0, max: 0.8, on: hiss });
    MMX.ctl(C, 'bed', { label: 'Loop no.', min: 0, max: 11, step: 1, fmt: (v) => (beds[v] ? String(v + 1) : '-'), on: (v) => { if (beds[v] && sel !== v) { sel = v; st.bedLen = beds[v].len; st.bedDeg = beds[v].deg; st.bedPan = beds[v].pan; ['bedLen', 'bedDeg', 'bedPan'].forEach((k) => MMX.S.ctls.find((c) => c.key === k)?.show()); MMX.S.ctls.filter((c) => c.key.startsWith('bed') && c.key !== 'bed').forEach((c) => (c.inp.value = st[c.key])); } } });
    MMX.ctl(C, 'bedLen', { label: 'Length', min: 2, max: 90, step: 0.01, fmt: (v) => (+v).toFixed(2) + ' s', on: (v) => beds[sel] && (beds[sel].len = v) }); MMX.ctl(C, 'bedDeg', { label: 'Note (degree)', min: -10, max: 14, step: 1, on: (v) => beds[sel] && (beds[sel].deg = v) }); MMX.ctl(C, 'bedPan', { label: 'Pan', min: -1, max: 1, on: (v) => beds[sel] && (beds[sel].pan = v) });
    MM.$('#seed').onclick = () => { MM.ensure(); if (!MM.playing) MM.toggle(true); seed(); }; MM.$('#prune').onclick = () => prune(); MM.$('#oc').onclick = drawCard; MM.$('#tape').onclick = printTape; MM.$('#old').onclick = restore;
    MM.drag(cv.cv, (x, y, ph, e) => { if (ph !== 'down') return; const W = cv.w, H = cv.h, R = Math.min(W, H) * 0.44, d = Math.hypot(x - W * 0.5, y - H * 0.52), n = Math.max(1, beds.length); let best = -1, bd = 1e9; beds.forEach((b, i) => { const r = R * (0.18 + 0.82 * (i + 1) / n); if (Math.abs(r - d) < bd) { bd = Math.abs(r - d); best = i; } }); if (best >= 0 && bd < R / n) { if (e.shiftKey) prune(best); else selectBed(best); } });
    boxUI();
  } };
MM.init(cfg);
