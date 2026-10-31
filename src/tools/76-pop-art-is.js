/*META
{"title":"Pop Art Is","deep":true,"gemini":true,"category":"art manifesto","date":"2026-10-31","kicker":"ART MANIFESTO · RICHARD HAMILTON, LETTER TO PETER AND ALISON SMITHSON, 16 JANUARY 1957","bpm":120,
"idea":"In January 1957 Richard Hamilton wrote to the architects Peter and Alison Smithson with a definition of 'Pop Art'. He meant the popular culture of adverts, films, cars and records, not yet the gallery art that later took the name. His definition was eleven words long: Popular, Transient, Expendable, Low cost, Mass produced, Young, Witty, Sexy, Gimmicky, Glamorous, Big business. This instrument is a pop-song factory driven by those eleven words. Each one is a giant typographic fader that changes the music: Transient sets how short each song is, Expendable how completely the next one forgets it, Low cost crushes the bits, Mass produced stacks copies of the hook, Big business squashes the master and stamps a jingle on the end. Songs are generated, sold and replaced one after another. Hamilton also admitted he was 'not yet sure about the sincerity' of Pop Art, so there is a SINCERITY? knob too. An optional Gemini panel writes a jingle for any product you describe.",
"controls":"6 slots (hook voice, kick, clap, hats, bass/keys, gimmick); eleven characteristic faders (drag the words, or keys 1 to 9, 0 and -); sincerity?; key and major/minor; base tempo; hook, drums, bass and pad levels; new song, jingle now; Gemini jingle writer (optional, using your own key); chart of past songs fading as they are forgotten; units-sold counter.",
"how":"Press PLAY: a pop song is generated, played and sold, and when it ends a new one replaces it. Drag any of the eleven words up or down (or click it to switch it on and off) and hear that characteristic change the song. Keys 1 to 9, 0 and - toggle the words in order, N writes a new song now, J plays the jingle and S turns up the sincerity. Load a vocal one-shot into slot 1 and it becomes the singer of every hook. Open the Gemini panel, paste your key, describe a product, and it writes the jingle's title, tagline, tempo and settings.",
"fonts":"family=Jost:ital,wght@0,400;0,800;0,900;1,800&family=Abril+Fatface",
"try":["Sing or say one syllable ('yeah', 'buy', 'pop', 'ooh') into your phone, trim it and load it into slot 1. It becomes the hook singer of every song the factory makes. Turn MASS PRODUCED up and it is copied into a stack of identical singers.","Load a Splice drum kit into slots 2 to 4 (kick, clap, hats) using a whole folder, set TRANSIENT to maximum and EXPENDABLE to maximum, and record ten minutes as a WAV: a hundred eight-bar jingles, each forgotten as the next arrives, ready to chop for samples.","Pull every word down to zero except SINCERITY?, then bring the words back one by one and listen for the moment it turns from a song into a product. Save presets named after real adverts you remember, then ask Gemini for a jingle about something ordinary in your kitchen."],
"manifesto":{"name":"Pop Art is: Richard Hamilton's letter to the Smithsons","short":"Hamilton, Pop Art is","author":"Richard Hamilton (1922 to 2011), British artist and member of the Independent Group","year":"1957","where":"Letter to Peter and Alison Smithson, 16 January 1957, later published in Hamilton's Collected Words 1953–1982 (1982)",
"ideas":["Hamilton was part of the Independent Group, artists, architects and critics who met at the Institute of Contemporary Arts in London in the 1950s to talk about adverts, science fiction, cars and Hollywood as seriously as fine art.","For the exhibition This is Tomorrow (Whitechapel Gallery, 1956) he made the small collage 'Just what is it that makes today's homes so different, so appealing?', which is often called the first work of Pop Art.","In the 1957 letter he wrote down what popular art is: eleven characteristics of mass culture, from 'Popular (designed for a mass audience)' to 'Big business'. He asked whether a fine artist could take on these values.","He called the list 'just a beginning' and openly worried about the 'sincerity' of a Pop Art made by fine artists.","He then used the list as a working programme for his own paintings, starting with 'Hommage à Chrysler Corp.' (1957). The word Pop soon came to mean the art itself."],
"quotes":[["Pop Art is: Popular (designed for a mass audience), Transient (short-term solution), Expendable (easily forgotten), Low cost, Mass produced, Young (aimed at youth), Witty, Sexy, Gimmicky, Glamorous, Big business","Richard Hamilton, letter to Peter and Alison Smithson, 16 January 1957"],["This is just a beginning.","Richard Hamilton, same letter"],["I find I am not yet sure about the 'sincerity' of Pop Art.","Richard Hamilton, same letter"]],
"system":"Each of the eleven words is a 0 to 1 fader. POPULAR picks familiar chord loops (I–V–vi–IV and friends) and a steady four-to-the-floor; low values pick modal, less familiar loops. TRANSIENT sets the song length, from 32 bars down to 8. EXPENDABLE sets how much of the last hook the next song keeps; old titles fade from the chart at the same rate. LOW COST mixes in a bit-crusher and a cheap low-pass. MASS PRODUCED stacks up to five detuned, slightly delayed copies of the hook across the stereo field (and counts the units). YOUNG adds tempo, bright filters and sixteenth hats. WITTY adds gags: stop-time, a cartoon 'boing' from the gimmick slot and a gear-change key change up a semitone. SEXY adds swing, a half-time backbeat and sub bass. GIMMICKY adds risers, stutters and drum fills. GLAMOROUS adds a string pad, octave sparkle and a long shimmering reverb. BIG BUSINESS drives and squashes the master and stamps a three-note sonic logo at the end of each song. SINCERITY? adds a plain, dry piano that plays the chords. Hooks are eight-step melodies built on chord tones, sung by slot 1.",
"dubious":""},
"design":{"name":"Herb Lubalin","short":"Herb Lubalin","who":"Herb Lubalin (1918 to 1981), American graphic designer and typographer, co-designer of ITC Avant Garde","era":"1950s to 1970s",
"hallmarks":["'Typographics': words made into images, so the letters act out what they say, in tight, touching, overlapping letterforms.","Geometric sans (Avant Garde) set with daring ligatures next to fat Didone display faces, very large and very close.","Bold black-and-white pages with one hot colour, made for magazines and advertising."],
"works":["The 'Mother & Child' logotype (1965), with the ampersand and the 'Child' inside the 'O'","Avant Garde magazine (1968 to 1971) and the ITC Avant Garde Gothic typeface (1970, with Tom Carnase)","U&lc (Upper and lower case), the ITC magazine he designed from 1973"]}}
*/
/*CSS
:root{--bg:#fff;--fg:#0b0b0b;--acc:#e2231a;--bar-bg:#0b0b0b;--bar-fg:#fff;--bar-font:'Jost',system-ui,sans-serif;--learn-font:'Jost',sans-serif;--learn-bg:#fff;--deck-bg:#fff;--head-font:'Abril Fatface',serif}
#mm-stage{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr) 270px}
#words{overflow:hidden;padding:10px 0 0 22px;display:flex;flex-direction:column;justify-content:center;user-select:none}
.w{font-family:'Jost';text-transform:uppercase;line-height:.8;letter-spacing:-.05em;cursor:ns-resize;white-space:nowrap;position:relative;transition:font-size .12s,color .2s;color:#0b0b0b}
.w.f{font-family:'Abril Fatface';text-transform:none;letter-spacing:-.03em;line-height:.86}
.w i{font:400 10px 'Jost';letter-spacing:.1em;font-style:normal;vertical-align:top;margin-left:4px;color:#e2231a}
.w.hot{color:#e2231a}
#card{position:relative;overflow:hidden;border-left:6px solid #0b0b0b}#cv{position:absolute;inset:0;width:100%;height:100%}
#card .t{position:absolute;left:22px;top:18px;right:16px;pointer-events:none}#card .t small{font:800 11px 'Jost';letter-spacing:.2em}#card .t h1{font:400 50px/0.9 'Abril Fatface';margin:6px 0 4px;letter-spacing:-.02em}#card .t p{font:italic 800 16px 'Jost';margin:0;color:#e2231a}
#side{overflow:auto;padding:12px 14px;border-left:1px solid #0b0b0b;font:400 12px 'Jost'}
#side h3{font:900 13px 'Jost';letter-spacing:-.01em;text-transform:uppercase;margin:12px 0 4px}
#side .mmx-ctl{grid-template-columns:84px 1fr 38px;font:400 11px 'Jost'}#side .mmx-ctl select{grid-column:2/4;min-width:0;font:400 11px 'Jost'}
#side .bt{display:flex;gap:4px;flex-wrap:wrap}#side .bt button{font:900 11px 'Jost';text-transform:uppercase;border:0;background:#0b0b0b;color:#fff;padding:5px 9px;cursor:pointer;border-radius:14px}#side .bt button:hover{background:#e2231a}
#mm-learn-dlg{box-shadow:12px 12px 0 #e2231a}#mm-learn-dlg h2{font:400 36px/0.95 'Abril Fatface'}
*/
/*HTML
<div id="words"></div>
<div id="card"><canvas id="cv"></canvas><div class="t"><small id="now">NOW SELLING</small><h1 id="ttl">Pop Art Is</h1><p id="tag">designed for a mass audience</p></div></div>
<div id="side"><div class="bt"><button id="b-n">N · new song</button><button id="b-j">J · jingle</button><button id="b-s">S · sincerity?</button></div><h3>Sincerity?</h3><div id="c0"></div><h3>The product</h3><div id="c1"></div><h3>Mix</h3><div id="c2"></div><h3>Gemini jingle writer</h3><div id="ai"></div></div>
*/
const CH = [['popular', 'Popular', 'designed for a mass audience'], ['transient', 'Transient', 'short-term solution'], ['expendable', 'Expendable', 'easily forgotten'], ['lowcost', 'Low cost', ''], ['mass', 'Mass produced', ''], ['young', 'Young', 'aimed at youth'], ['witty', 'Witty', ''], ['sexy', 'Sexy', ''], ['gimmicky', 'Gimmicky', ''], ['glam', 'Glamorous', ''], ['biz', 'Big business', '']];
const st = MMX.bind({ popular: 0.8, transient: 0.5, expendable: 0.6, lowcost: 0.15, mass: 0.35, young: 0.55, witty: 0.3, sexy: 0.35, gimmicky: 0.4, glam: 0.45, biz: 0.6, sincerity: 0.1, root: 7, minor: false, base: 112, hookLvl: 0.8, drumLvl: 0.9, bassLvl: 0.7, padLvl: 0.4 });
const NOTE = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
const CHD = { I: [0, 0], ii: [2, 1], iii: [4, 1], IV: [5, 0], iv: [5, 1], V: [7, 0], vi: [9, 1], bVII: [10, 0], i: [0, 1], bVI: [8, 0], bIII: [3, 0], v: [7, 1] };
const POP = [['I', 'V', 'vi', 'IV'], ['vi', 'IV', 'I', 'V'], ['I', 'vi', 'IV', 'V'], ['I', 'IV', 'V', 'IV']], ODD = [['I', 'bVII', 'IV', 'I'], ['i', 'bVI', 'bIII', 'bVII'], ['I', 'iii', 'IV', 'iv'], ['i', 'v', 'bVI', 'IV'], ['ii', 'V', 'I', 'vi']];
const W1 = ['Chrome', 'Plastic', 'Atomic', 'Instant', 'Super', 'Jet', 'Kandy', 'Nylon', 'Tomorrow', 'Glamour', 'Hi-Fi', 'Teen', 'Sexy', 'Big', 'Fab', 'Space-Age', 'Formica', 'Technicolor'], W2 = ['Dream', 'Kiss', 'Machine', 'Girl', 'Boy', 'Car', 'Fridge', 'Rocket', 'Love', 'Toaster', 'Holiday', 'Heart', 'Baby', 'Cola', 'Hoover', 'Chrysler', 'Jukebox'];
const TAGS = ['designed for a mass audience', 'a short-term solution', 'easily forgotten', 'now in new low-cost size', 'mass produced for you', 'aimed at youth', 'witty, sexy, gimmicky', 'glamorous at any price', 'big business, small change'];
let song = null, chart = [], units = 0, cv, N = {}, flashW = {}, sting = 0, keyShift = 0;
const rnd = (a) => a[Math.floor(Math.random() * a.length)];
function newSong(keepHook) { const keep = keepHook ?? Math.random() > st.expendable, prog = (Math.random() < st.popular ? rnd(POP) : rnd(ODD)).slice(), len = Math.round((32 - 24 * st.transient) / 4) * 4;
  const hook = keep && song ? song.hook : Array.from({ length: 8 }, (_, k) => (k % 2 === 0 || Math.random() < 0.5 + st.popular * 0.3 ? Math.floor(Math.random() * 4) : -1));
  if (song) { chart.unshift({ title: song.title, units: song.units }); chart = chart.slice(0, 6); }
  song = { title: rnd(W1) + ' ' + rnd(W2), tag: rnd(TAGS), prog, len: Math.max(8, len), hook, bar: 0, units: 0, kc: st.witty > 0.5 && Math.random() < st.witty ? Math.floor(Math.max(8, len) * 0.66) : -1 }; keyShift = 0;
  MM.$('#ttl').textContent = song.title; MM.$('#tag').textContent = song.tag; MM.$('#now').textContent = keep ? 'NOW SELLING · SAME HOOK, NEW PACKAGING' : 'NOW SELLING · NEW!'; MM.bpm = Math.round(st.base + st.young * 26 - st.sexy * 10); }
function chordAt(bar) { const c = CHD[song.prog[bar % 4]] || CHD.I; return c; }
function chordNotes(bar, base) { const [r, mi] = chordAt(bar), root = base + st.root + keyShift + r; return [root, root + (mi ? 3 : 4), root + 7]; }
function hookNote(bar, deg) { const ns = chordNotes(bar, 60); return deg === 3 ? ns[0] + 12 : ns[deg]; }
/* ---------- the factory ---------- */
let gag = null;
function step(i, t, sd) { if (!song) newSong(false); const s = i % 16; let T = t + (s % 2 ? st.sexy * 0.28 * sd : 0);
  if (s === 0 && i > 0) { song.bar++; if (song.bar >= song.len) { newSong(); } if (song.bar === song.kc) { keyShift = 1; MM.toast('Gear change!'); } gag = Math.random() < st.witty * 0.35 && song.bar > 1 ? rnd(['stop', 'boing', 'stop', 'boing']) : null; }
  const bar = song.bar, last = bar === song.len - 1, stopTime = gag === 'stop' && s >= 12, intro = bar < 2 && st.transient < 0.8;
  // the hook: eighths, on chord tones, mass produced
  if (s % 2 === 0 && !stopTime) { const hk = song.hook[(s / 2 + (bar % 2) * 0) % 8]; if (hk >= 0 && (st.popular > 0.3 || bar % 2 === 0)) { const m = hookNote(bar, hk), cps = 1 + Math.round(st.mass * 4);
      for (let c = 0; c < cps; c++) { const det = c ? (c % 2 ? 1 : -1) * Math.ceil(c / 2) * 0.09 : 0, dl = c * 0.006 * (1 + st.mass);
        MMX.fire(0, T + dl, { semis: m - 60 + det, dur: sd * (1.7 + st.glam), gain: st.hookLvl * (c ? 0.55 / Math.sqrt(cps) : 0.85), pan: c ? (c % 2 ? -1 : 1) * Math.min(0.9, c * 0.25) : 0, rev: st.glam * 0.6, dly: st.gimmicky * 0.2, dest: N.bus }); }
      units += cps; song.units += cps; flashW.mass = performance.now(); }
    if (st.gimmicky > 0.6 && s === 14 && bar % 4 === 3) for (let r = 0; r < 4; r++) MMX.fire(0, T + r * sd / 4, { semis: hookNote(bar, 0) - 60, dur: sd / 5, gain: 0.5 * st.hookLvl, dest: N.bus }); }
  if (gag === 'boing' && s === 14) { MMX.fire(5, T, { gain: 0.8, dest: N.bus }); flashW.witty = performance.now(); }
  // drums
  if (!intro && !stopTime) { const four = st.popular > 0.45, kick = four ? s % 4 === 0 : [0, 6, 10].includes(s), half = st.sexy > 0.55;
    if (kick) MMX.fire(1, T, { gain: st.drumLvl, dest: N.bus });
    if (half ? s === 8 : s === 4 || s === 12) MMX.fire(2, T, { gain: st.drumLvl * 0.85, dest: N.bus });
    if (s % 2 === 0 || Math.random() < st.young * 0.8) MMX.fire(3, T, { gain: st.drumLvl * (s % 4 === 2 ? 0.6 : 0.3), pan: 0.2, dest: N.bus });
    if (st.gimmicky > 0.3 && bar % 8 === 7 && s >= 12) MMX.fire(2, T, { gain: 0.3 + (s - 12) * 0.15, dest: N.bus }); }
  // bass
  if (!stopTime && (s % (st.young > 0.5 ? 2 : 4) === (st.young > 0.5 ? 0 : 2) || s === 0)) { const r = chordNotes(bar, 36)[0]; MMX.fire(4, T, { semis: r - 60, dur: sd * 1.6, gain: st.bassLvl, dest: N.bus }); if (st.sexy > 0.3 && s === 0) MM.tone(MM.mtof(r - 12), T, sd * 12, { gain: 0.25 * st.sexy, attack: 0.02, release: 0.3, dest: N.bus }); }
  // glamour: string pad and sparkle
  if (s === 0 && st.glam > 0.1) chordNotes(bar, 60).forEach((m, k) => MM.tone(MM.mtof(m), T, sd * 15, { type: 'sawtooth', cutoff: 1400 + st.young * 3000, gain: 0.03 * st.glam * st.padLvl * 2, attack: 0.35, release: 0.6, pan: (k - 1) * 0.6, detune: (k - 1) * 6, send: { rev: 0.4 + st.glam * 0.5 }, dest: N.bus }));
  if (st.glam > 0.6 && s % 2 === 1 && Math.random() < st.glam) MM.tone(MM.mtof(chordNotes(bar, 84)[s % 3]), T, 0.05, { gain: 0.04, release: 0.4, send: { rev: 0.8, dly: 0.3 }, dest: N.bus });
  // sincerity: plain, dry piano chords
  if (st.sincerity > 0.05 && (s === 0 || s === 8)) chordNotes(bar, 48).forEach((m) => MMX.fire(4, t, { semis: m - 60, dur: sd * 7, gain: st.sincerity * 0.5, rev: -1, dly: -1, dest: N.dry }));
  // gimmicks: riser before the end; big business: the sonic logo
  if (st.gimmicky > 0.2 && bar === song.len - 2 && s === 0) MM.noise(T, sd * 16, { type: 'bandpass', freq: 300, sweep: 8000, q: 2, gain: 0.12 * st.gimmicky, attack: sd * 15, dest: N.bus });
  if (last && s === 8 && st.biz > 0.3) jingle(T, sd); }
function jingle(t, sd) { const r = 72 + st.root + keyShift; [[7, 0], [4, 1], [0, 2], [12, 3.5]].forEach(([iv, k]) => MM.tone(MM.mtof(r + iv), t + k * sd, sd * (k > 3 ? 4 : 1.2), { partials: [[1, 1], [2, 0.3], [3.01, 0.2], [4.2, 0.1]], gain: 0.16 * (0.5 + st.biz), release: 0.5, send: { rev: 0.4 }, dest: N.bus })); sting = performance.now(); flashW.biz = sting; }
function mixParams() { if (!N.bus) return; const t = MM.now; N.crushW.gain.setTargetAtTime(st.lowcost * 0.9, t, 0.05); N.cleanW.gain.setTargetAtTime(1 - st.lowcost * 0.7, t, 0.05); N.cheap.frequency.setTargetAtTime(20000 - st.lowcost * 16500, t, 0.05);
  N.bright.frequency.setTargetAtTime(400 + st.young * 4000 + st.glam * 4000 + 6000, t, 0.1); N.drv.gain.setTargetAtTime(1 + st.biz * 2.2, t, 0.05); N.post.gain.setTargetAtTime(0.75 / (1 + st.biz * 1.1), t, 0.05); }
/* ---------- words (Herb Lubalin typographics) ---------- */
function buildWords() { const el = MM.$('#words'); el.innerHTML = ''; CH.forEach(([k, label, sub], i) => { const d = MM.h('div', { class: 'w' + (i % 3 === 1 ? ' f' : ''), 'data-k': k }); d.innerHTML = label + `<i>${i < 9 ? i + 1 : i === 9 ? 0 : '-'}${sub ? ' · ' + sub : ''}</i>`; el.appendChild(d);
    let y0 = 0, v0 = 0, moved = false; MM.drag(d, (x, y, ph) => { if (ph === 'down') { y0 = y; v0 = st[k]; moved = false; } else if (ph === 'move') { const nv = MM.clamp(v0 + (y0 - y) / 120, 0, 1); if (Math.abs(y - y0) > 3) moved = true; MMX.setParam(k, +nv.toFixed(2)); styleWords(); mixParams(); } else if (ph === 'up' && !moved) { toggle(k); } }); }); styleWords(); }
function toggle(k) { MMX.setParam(k, st[k] > 0.5 ? 0.1 : 0.9); styleWords(); mixParams(); MM.toast(CH.find((c) => c[0] === k)[1] + ' ' + Math.round(st[k] * 100) + '%'); }
function styleWords() { const el = MM.$('#words'); if (!el) return; const h = el.clientHeight || 500; MM.$$('.w').forEach((d) => { const v = st[d.dataset.k], base = (h / 11) * 1.25, wmax = (el.clientWidth - 30) / (d.firstChild.textContent.length * (d.classList.contains('f') ? 0.5 : 0.56)); d.style.fontSize = Math.round(Math.min(base * (0.38 + v * 0.95), wmax)) + 'px'; d.style.fontWeight = v > 0.66 ? 900 : v > 0.33 ? 800 : 400; d.style.opacity = 0.25 + v * 0.75; }); }
function draw() { cv.fit(); const g = cv.g, W = cv.w, H = cv.h, pn = performance.now(); g.clearRect(0, 0, W, H);
  MM.$$('.w').forEach((d) => d.classList.toggle('hot', !!flashW[d.dataset.k] && pn - flashW[d.dataset.k] < 160));
  if (!song) return;
  // the assembly line: one word per unit, repeated like a production run
  const y0 = 190, cols = 6, rows = Math.max(1, Math.floor((H - y0 - 180) / 26)), cps = 1 + Math.round(st.mass * 4); g.font = "900 22px 'Jost'"; g.textBaseline = 'top';
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const n = r * cols + c, lit = n < (song.units % (rows * cols)); g.fillStyle = lit ? (n % (cps + 3) === 0 ? '#e2231a' : '#0b0b0b') : 'rgba(11,11,11,.07)'; g.fillText('POP', 22 + c * ((W - 30) / cols), y0 + r * 26); }
  g.textBaseline = 'alphabetic';
  const by = H - 150; g.fillStyle = '#0b0b0b'; g.fillRect(22, by, W - 44, 4); const prog = song.bar / song.len; g.fillStyle = '#e2231a'; g.fillRect(22, by, (W - 44) * prog, 4);
  g.font = "800 12px 'Jost'"; g.fillStyle = '#0b0b0b'; g.fillText(`BAR ${song.bar + 1} / ${song.len} · ${song.prog.join(' – ')} · ${NOTE[(st.root + keyShift) % 12]}${st.minor ? ' MINOR' : ''} · ${MM.bpm} BPM · UNITS SOLD ${units.toLocaleString('en-GB')}`, 22, by + 22);
  g.font = "400 22px 'Abril Fatface'"; chart.forEach((c, k) => { g.fillStyle = `rgba(11,11,11,${Math.max(0.04, (1 - st.expendable * 0.9) * (1 - k / 7))})`; g.fillText(`${k + 1}. ${c.title}`, 22 + (k % 2) * (W / 2 - 10), by + 54 + Math.floor(k / 2) * 26); });
  if (pn - sting < 1500) { g.save(); g.globalAlpha = 1 - (pn - sting) / 1500; g.fillStyle = '#e2231a'; g.font = `400 ${Math.floor(W / 4)}px 'Abril Fatface'`; g.textAlign = 'center'; g.fillText('®', W / 2, H / 2 + W / 10); g.restore(); } }
/* ---------- built-in sounds ---------- */
function mk(len, fn) { const c = MM.ctx, sr = c.sampleRate, B = c.createBuffer(1, (sr * len) | 0, sr), d = B.getChannelData(0); let pk = 0; for (let i = 0; i < d.length; i++) { d[i] = fn(i / sr); pk = Math.max(pk, Math.abs(d[i])); } for (let i = 0; i < d.length; i++) d[i] *= 0.8 / (pk || 1); return B; }
const TAU = Math.PI * 2;
function bah() { return mk(1.2, (t) => { const f = 261.63; let s = 0; const F1 = 300 + 500 * Math.min(1, t * 12), F2 = 900 + 400 * Math.min(1, t * 12); for (let h = 1; h < 18; h++) { const fr = f * h; s += Math.sin(TAU * fr * t) * (Math.exp(-Math.pow((fr - F1) / 160, 2)) + 0.7 * Math.exp(-Math.pow((fr - F2) / 260, 2)) + 0.2 * Math.exp(-Math.pow((fr - 2600) / 400, 2))) / Math.sqrt(h); } return s * Math.min(1, t * 60) * Math.exp(-t * 1.6); }); }
function boing() { let ph = 0; const sr = MM.ctx.sampleRate; return mk(0.7, (t) => { ph += (180 + 140 * Math.sin(TAU * 7 * t) * Math.exp(-t * 3) + 300 * Math.exp(-t * 9)) / sr; return Math.sin(TAU * ph) * Math.exp(-t * 4.5); }); }
function clap() { let lp = 0; return mk(0.35, (t) => { lp += ((Math.random() * 2 - 1) - lp) * 0.6; return lp * [0, 0.012, 0.024, 0.036].reduce((s, a) => s + (t >= a ? Math.exp(-(t - a) * (a > 0.03 ? 14 : 90)) : 0), 0); }); }
function keys() { return mk(2, (t) => [1, 2, 3, 4, 5].reduce((s, h) => s + Math.sin(TAU * 261.63 * h * t) * Math.exp(-t * (1.2 + h)) / h, 0) * Math.min(1, t * 300)); }
/* ---------- setup ---------- */
const cfg = { bpm: 120, div: 4, step, draw, start: () => { newSong(false); mixParams(); }, onSamples: (list) => MMX.assign(list),
  key: (e) => { if (MMX.key(e)) return; const k = e.key.toLowerCase(), idx = '1234567890-'.indexOf(k);
    if (idx >= 0) toggle(CH[idx][0]); else if (k === 'n') newSong(false); else if (k === 'j') { MM.ensure(); jingle(MM.now + 0.02, 60 / MM.bpm / 4); } else if (k === 's') MMX.setParam('sincerity', st.sincerity > 0.5 ? 0 : 0.9); },
  setup() { MM.ensure(); const c = MM.ctx; cv = MM.canvas('#cv');
    N.bus = c.createGain(); N.cheap = c.createBiquadFilter(); N.cheap.type = 'lowpass'; N.crush = MM.crusher(4); N.crushW = c.createGain(); N.cleanW = c.createGain(); N.bright = c.createBiquadFilter(); N.bright.type = 'lowpass'; N.drv = c.createGain(); N.shape = MM.drive(2.5); N.post = c.createGain(); N.dry = c.createGain(); N.dry.connect(MM.out);
    N.bus.connect(N.cleanW); N.bus.connect(N.crush); N.crush.connect(N.crushW); N.cleanW.connect(N.cheap); N.crushW.connect(N.cheap); N.cheap.connect(N.bright); N.bright.connect(N.drv); N.drv.connect(N.shape); N.shape.connect(N.post); N.post.connect(MM.out);
    MM.fb.bah = bah(); MM.fb.boing = boing(); MM.fb.clap = clap(); MM.fb.keys = keys();
    MMX.init({ state: st, slots: [{ label: 'Hook voice (C4)', kind: 'bah', rv: 0.1 }, { label: 'Kick', kind: 'kick', rv: 0 }, { label: 'Clap / snare', kind: 'clap', rv: 0.1 }, { label: 'Hats', kind: 'hat', rv: 0, gain: 0.6 }, { label: 'Bass / keys (C4)', kind: 'keys', rv: 0.05 }, { label: 'Gimmick (boing)', kind: 'boing', rv: 0.15 }],
      onPreset: () => { styleWords(); mixParams(); }, factory: fac(),
      keys: [['1 to 9, 0, -', 'toggle the eleven words'], ['N', 'new song'], ['J', 'the jingle (sonic logo)'], ['S', 'sincerity?']],
      midiHelp: 'Notes change the key of the product (a gear change). Notes 36 to 46 (C2 to Bb2) toggle the eleven words in order.',
      midi: (n, v, on) => { if (!on) return; if (n >= 36 && n <= 46) toggle(CH[n - 36][0]); else MMX.setParam('root', ((n % 12) + 12) % 12); } });
    const C0 = MM.$('#c0'), C1 = MM.$('#c1'), C2 = MM.$('#c2');
    MMX.ctl(C0, 'sincerity', { label: 'Sincerity? (S)', min: 0, max: 1 });
    MMX.ctl(C1, 'root', { type: 'select', label: 'Key', options: NOTE.map((x, k) => [k, x]) }); MMX.ctl(C1, 'base', { label: 'Base tempo', min: 80, max: 140, step: 1 });
    CH.forEach(([k, label]) => MMX.ctl(C1, k, { label, min: 0, max: 1, on: () => { styleWords(); mixParams(); } }));
    MMX.ctl(C2, 'hookLvl', { label: 'Hook', min: 0, max: 1.2 }); MMX.ctl(C2, 'drumLvl', { label: 'Drums', min: 0, max: 1.2 }); MMX.ctl(C2, 'bassLvl', { label: 'Bass', min: 0, max: 1.2 }); MMX.ctl(C2, 'padLvl', { label: 'Strings', min: 0, max: 1.2 });
    MM.$('#b-n').onclick = () => newSong(false); MM.$('#b-j').onclick = () => { MM.ensure(); jingle(MM.now + 0.02, 60 / MM.bpm / 4); }; MM.$('#b-s').onclick = () => MMX.setParam('sincerity', st.sincerity > 0.5 ? 0 : 0.9);
    MM.aiBox(MM.$('#ai'), { title: 'PRODUCT → JINGLE', help: 'Describe any product, real or imagined. Gemini writes a title, a tagline and sets the eleven characteristics. Uses your own Gemini key, stored only in this browser.', placeholder: 'a self-cleaning toaster for teenagers, chrome, in five colours',
      system: "You are a 1950s/60s advertising jingle writer working from Richard Hamilton's 1957 list of what Pop Art is. Reply with JSON only.",
      schema: { type: 'OBJECT', properties: { title: { type: 'STRING' }, tagline: { type: 'STRING' }, bpm: { type: 'NUMBER' }, key: { type: 'STRING' }, values: { type: 'OBJECT', properties: Object.fromEntries(CH.map(([k]) => [k, { type: 'NUMBER' }])) }, hook: { type: 'ARRAY', items: { type: 'NUMBER' } } }, required: ['title', 'values'] },
      user: (p) => `Product: ${p}\nGive: a short catchy song title (2 to 4 words); a tagline under 8 words; bpm 90 to 140; key as a note name (C, C#, D ... B); values 0 to 1 for each of ${CH.map((c) => c[0]).join(', ')} describing how much of each Hamilton characteristic the jingle should have; and an 8-step hook as numbers -1 (rest) or 0 to 3 (root, third, fifth, octave).`,
      apply: (r) => { const v = r.values || {}; CH.forEach(([k]) => { if (v[k] != null && isFinite(+v[k])) MMX.setParam(k, MM.clamp(+v[k], 0, 1)); }); if (r.key) { const i = NOTE.indexOf(String(r.key).trim().replace('♯', '#').slice(0, 2).replace(/[^A-G#b]/g, '')); const j = i >= 0 ? i : NOTE.indexOf(String(r.key).trim()[0]); if (j >= 0) MMX.setParam('root', j); }
        if (r.bpm) MMX.setParam('base', MM.clamp(Math.round(+r.bpm), 80, 140)); newSong(false); song.title = String(r.title || song.title).slice(0, 40); song.tag = String(r.tagline || song.tag).slice(0, 60); if (Array.isArray(r.hook) && r.hook.length) song.hook = Array.from({ length: 8 }, (_, k) => MM.clamp(Math.round(+r.hook[k % r.hook.length]), -1, 3) || 0);
        MM.$('#ttl').textContent = song.title; MM.$('#tag').textContent = song.tag; styleWords(); mixParams(); return song.title + ': ' + song.tag; },
      fallback: () => { CH.forEach(([k]) => MMX.setParam(k, +Math.random().toFixed(2))); newSong(false); styleWords(); mixParams(); } });
    buildWords(); addEventListener('resize', styleWords); mixParams(); } };
function fac() { const base = JSON.parse(JSON.stringify(st)), F = (o) => ({ full: { params: Object.assign({}, base, o) } }), all = (v) => Object.fromEntries(CH.map(([k]) => [k, v]));
  return { 'The 1957 list (default)': {}, 'Everything, all at once': F(all(1)), 'Nothing but sincerity': F(Object.assign(all(0), { sincerity: 1, popular: 0.2 })), 'Cheap and expendable': F({ lowcost: 0.9, transient: 1, expendable: 1, biz: 0.2, glam: 0 }), 'Glamorous big business': F({ glam: 1, biz: 1, sexy: 0.7, young: 0.2, lowcost: 0, mass: 0.8 }) }; }
MM.init(cfg);
