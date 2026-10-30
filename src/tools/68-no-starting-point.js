/*META
{"title":"No Starting Point","deep":true,"category":"Eno","date":"2026-10-30","kicker":"WHAT WOULD BRIAN ENO DO? · THE STUDIO AS COMPOSITIONAL TOOL, 1979","bpm":72,
"idea":"Brian Eno's lecture 'The Studio as Compositional Tool' (1979) as an instrument. Start with an empty multitrack tape and no plan, put something on, put something else on, then take some of the original things off and see what you're left with. The mixing desk is the instrument: level, pan, echo, tone and tape speed per track, a bus compressor where pushing one sound up pushes the others down, and a brush to paint parts of the tape out.",
"controls":"6 slots (pad, piano, bass, bell, percussion, texture); a 12-track loop tape with cycle length, tempo, key and scale; PUT ON (any part type or a chosen one), TAKE OFF, TAKE A MIXTURE OFF, bring back, clear; per track: fader, pan, echo send, tone, tape speed (half, normal, double, backwards), mute, solo, erase; paint out or paint back on the tape; bus squash, echo time and feedback, space, tape hiss; mix drift and a 'gardener' that adds and subtracts by itself; MIDI overdub onto the selected track.",
"how":"Press PLAY: the tape is empty, so nothing happens. That is the point. Press A to put something on (or click a part name), and again, and again. Then S takes something off (the older things first) and X takes a mixture off. Each strip at the bottom is a mixer channel: fader, pan, echo, tone, tape speed, M (mute), S (solo), × (erase). Drag across the tape to paint notes out; hold Shift to paint them back. G lets the gardener add and subtract on its own, F lets the faders drift. C clears the tape.",
"fonts":"family=Special+Elite&family=Cormorant+Garamond:ital,wght@0,500;1,500",
"try":["Load five unrelated sounds into the slots (a piano note, a bass hit, a bell, a found percussion sound and a long field recording). Put on six parts, let them play for four passes, then take off the first three you put on. Listen to what is left as if someone else had made it.","Set one track to half speed and another to backwards, and push the SQUASH up: now raising one fader pushes the rest down, the way Eno describes heavy compression on a whole track. Ride a single fader as if it were the instrument.","Turn on the GARDENER with the cycle at 8 bars and leave it running while you do something else for ten minutes. When something catches your ear, switch it off, save a preset and export the JSON, then load your own samples into the same arrangement."],
"manifesto":{"name":"What would Brian Eno do? The studio as compositional tool: in-studio composition","short":"Eno, Studio as Compositional Tool","author":"Brian Eno (b. 1948)","year":"1979 (lecture); published 1983","where":"A lecture at New Music New York, the first New Music America festival, organised by The Kitchen (1979); printed in Down Beat magazine, July and August 1983.",
"ideas":["Recording takes music out of time and puts it into space: a recorded piece can be heard again and again, so details nobody intended can become the point. He adds that almost any arbitrary collision of events, heard enough times, starts to seem meaningful. (Paraphrase.)","Tape made sound a material: something that can be cut, looped, reversed, squeezed or stretched.","Multitrack recording led to 'in-studio composition': you arrive with a bare skeleton or with nothing at all, put something on, put something else on, then take some of the original things off and see what you're left with.","The composer becomes like a painter, working directly with the material and always able to paint a bit out or add a piece. There is no score, no conductor and no players between the idea and the sound.","The mixer is the centre of the studio. Each channel has level, pan, echo and EQ, and heavy compression across a whole track means that pushing one instrument up pushes the others down."],
"quotes":[["you no longer come to the studio with a conception of the finished piece. Instead, you come with actually rather a bare skeleton of the piece, or perhaps with nothing at all.","Brian Eno, 'The Studio as Compositional Tool' (lecture 1979; Down Beat, 1983)"],["The mixer is really the central part of the studio.","Brian Eno, 'The Studio as Compositional Tool'"]],
"system":"The tape is a loop of N bars with twelve tracks, and it starts empty. PUT ON writes a new part onto the next free track: a drone, piano fragments, a bass figure, bells, a pulse or a texture, generated in your key and scale from the matching slot. TAKE OFF mutes one of the older tracks (taking the original things off), and TAKE A MIXTURE OFF mutes about half of them. Every track runs through its own channel strip: fader, pan, an echo send, a tone (tilt EQ) control, and a tape SPEED that halves, doubles or reverses it (half speed is an octave down and twice as long, as on a real tape machine; 'backwards' plays the part in reverse order, with every note swelling in). All the channels meet in a bus compressor, and SQUASH sets how hard it works, so a loud fader ducks the others. The brush paints notes out of the tape, or back in with Shift. The pass counter counts how many times you have heard the loop. The GARDENER puts on and takes off one part every few passes, and DRIFT moves the faders slowly, as if someone were mixing."},
"design":{"name":"Russell Mills","short":"Russell Mills","who":"Russell Mills (b. 1952, Ripon, England), artist, illustrator and designer of record sleeves and books, who worked closely with Brian Eno","era":"1970s to now",
"hallmarks":["Layered mixed media: paint, wax, rust, earth, scratched and stained surfaces, torn paper and found fragments, built up and partly taken away again. Here the tape is a stained, layered surface and erased notes stay visible as scratches.","Muted earth colours (umber, ochre, rust, bone, charcoal) with small areas of warm light.","Small, quiet typewriter-like and serif text set on top of the texture, like labels or notes on a collage."],
"works":["'More Dark Than Shark' (1986), the book of Eno's lyrics with Mills's paintings","The cover art for Nine Inch Nails, 'The Downward Spiral' (1994)","His 'Undark' projects of the 1990s, music and installations made with many collaborators"]}}
*/
/*CSS
:root{--bg:#2a231d;--fg:#e9dcc3;--acc:#b5532a;--bar-bg:#16120f;--bar-fg:#e9dcc3;--bar-font:'Special Elite',monospace;--learn-font:'Cormorant Garamond',serif;--learn-bg:#2a231d;--deck-bg:#2a231d}
#mm-stage{display:grid;grid-template-columns:minmax(0,1fr) 270px;grid-template-rows:minmax(0,1fr) 196px}
#pic{position:relative;overflow:hidden;cursor:crosshair}#cv{position:absolute;inset:0;width:100%;height:100%}
#ttl{position:absolute;left:18px;top:10px;font:italic 500 38px/1 'Cormorant Garamond';color:#f1e4c8;pointer-events:none;text-shadow:0 1px 6px #000}#ttl small{display:block;font:12px 'Special Elite';letter-spacing:.06em;color:#d6a35c;margin-top:4px}
#put{position:absolute;right:12px;top:10px;display:flex;gap:4px;flex-wrap:wrap;justify-content:flex-end;max-width:60%}
.bb{font:12px 'Special Elite';background:rgba(22,18,15,.75);color:#e9dcc3;border:1px solid #8a6a46;padding:4px 8px;cursor:pointer}.bb:hover,.bb.on{background:#b5532a;border-color:#b5532a;color:#fff}
#mix{grid-column:1;grid-row:2;display:grid;grid-template-columns:repeat(12,1fr);border-top:2px solid #6b4a2c;background:#1d1814}
.strip{border-right:1px solid #3a2e24;padding:3px 3px;display:flex;flex-direction:column;align-items:center;gap:2px;font:10px 'Special Elite';color:#cdb994;min-width:0}
.strip.sel{background:#33281f}.strip.off{opacity:.45}.strip .nm{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;color:#f1e4c8}
.strip input[type=range]{accent-color:#b5532a;width:100%;margin:0;height:12px}.strip input.fd{writing-mode:vertical-lr;direction:rtl;width:18px;height:70px;margin:2px 0}
.strip .row{display:flex;gap:2px}.strip button{font:10px 'Special Elite';background:none;border:1px solid #6b4a2c;color:#e9dcc3;padding:0 4px;cursor:pointer}.strip button.on{background:#b5532a}
.strip select{font:9px 'Special Elite';background:#1d1814;color:#e9dcc3;border:1px solid #6b4a2c;width:100%}.strip label{display:flex;align-items:center;gap:2px;width:100%}.strip label span{width:12px}
#side{grid-column:2;grid-row:1/3;overflow:auto;padding:10px 12px;border-left:2px solid #6b4a2c;font:13px 'Cormorant Garamond';background:#241e19}
#side h3{font:13px 'Special Elite';letter-spacing:.08em;color:#d6a35c;margin:12px 0 3px;border-bottom:1px dotted #8a6a46}
#side .mmx-ctl{grid-template-columns:96px 1fr 36px;font:11px 'Special Elite'}#side .mmx-ctl select{grid-column:2/4;min-width:0}
#mm-learn-dlg{border:1px solid #8a6a46}#mm-learn-dlg h2{font:italic 500 34px/1.05 'Cormorant Garamond'}#mm-learn-dlg .mm-l-k{color:#d6a35c}
*/
/*HTML
<div id="pic"><canvas id="cv"></canvas><div id="ttl">No Starting Point<small>in-studio composition · after Eno, 1979</small></div>
<div id="put"><button class="bb" id="b-on">A · PUT SOMETHING ON</button><button class="bb" id="b-off">S · TAKE SOMETHING OFF</button><button class="bb" id="b-mix">X · TAKE A MIXTURE OFF</button><button class="bb" id="b-back">Z · BRING BACK</button><button class="bb" id="b-clear">C · NOTHING AT ALL</button></div></div>
<div id="mix"></div>
<div id="side"><h3>PUT ON</h3><div id="types"></div><div id="c0"></div><h3>THE TAPE</h3><div id="c1"></div><h3>THE DESK</h3><div id="c2"></div><h3>LEAVING IT ALONE</h3><div id="c3"></div></div>
*/
const st = MMX.bind({ bpm: 72, bars: 4, root: 2, scale: 'major', density: 0.5, put: 'any', squash: 0.45, echoT: 0.75, echoFb: 0.45, space: 0.45, hiss: 0.12, drift: false, gardener: false, every: 2, overdub: false });
const TYPES = ['drone', 'piano', 'bass', 'bell', 'pulse', 'texture'], NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'], NT = 12;
const TCOL = { drone: '#c9a26b', piano: '#e9dcc3', bass: '#8c3b1f', bell: '#d6c27a', pulse: '#a9583a', texture: '#6f7b5e' };
let tracks = Array(NT).fill(null), sel = 0, t0 = 0, schedT = 0, lastPass = -1, N = {}, born = 0, hissH = null, flash = new Array(NT).fill(0), paint = null, tex = null;
const cv = MM.canvas('#cv'), rt = (m) => MM.mtof(m) / MM.mtof(60), cyc = () => (60 / MM.bpm) * 4 * st.bars;
const SPEEDS = [['1', 'normal'], ['0.5', 'half'], ['2', 'double'], ['-1', 'backwards']];
/* ---------- parts ---------- */
const sc = () => MM.SCALES[st.scale] || MM.SCALES.major, deg = (d, base) => MM.deg(d, sc(), base + st.root);
function gen(type) { const beats = st.bars * 4, q16 = 1 / (beats * 4), r = Math.random, D = st.density, ev = [];
  const add = (p, m, d, v) => ev.push({ p: MM.clamp(p, 0, 0.999), m, d: MM.clamp(d, 0.01, 1), v, x: false });
  if (type === 'drone') { const n = r() < 0.5 ? 1 : 2; for (let k = 0; k < n; k++) add(k / n, deg(MM.pick([0, 0, 4, 2, 3]), 36), 1 / n, 0.5); }
  else if (type === 'piano') { const n = 3 + Math.round(D * 6 + r() * 3); for (let k = 0; k < n; k++) add(Math.floor(r() * beats * 2) / (beats * 2), deg(Math.floor(r() * 9) - 1, 60), 0.08 + r() * 0.2, 0.35 + r() * 0.4); }
  else if (type === 'bass') { const pat = [0, 3, 4, 0, 5, 4]; for (let b = 0; b < beats; b += MM.pick([2, 2, 4, 1])) if (r() < 0.5 + D * 0.5) add(b / beats, deg(pat[(b / 2) % pat.length | 0], 36), (1.5 / beats), 0.6); if (!ev.length) add(0, deg(0, 36), 0.25, 0.6); }
  else if (type === 'bell') { const n = 1 + Math.round(D * 3 + r()); for (let k = 0; k < n; k++) add(Math.floor(r() * beats) / beats, deg(Math.floor(r() * 7) + 7, 60), 0.25, 0.3 + r() * 0.25); }
  else if (type === 'pulse') { const div = D > 0.6 ? 4 : 2, m = deg(MM.pick([0, 4, 7]), 60); for (let s = 0; s < beats * div; s++) if (r() < 0.35 + D * 0.5 || s % div === 0) add(s / (beats * div), m, q16 * 0.8, s % div === 0 ? 0.6 : 0.35); }
  else { add(r() * 0.25, deg(0, 48), 0.6 + r() * 0.4, 0.5); }
  return ev; }
function putOn(type) { type = type && type !== 'any' ? type : st.put !== 'any' ? st.put : MM.pick(TYPES); let i = tracks.findIndex((t) => !t); if (i < 0) { MM.toast('All twelve tracks are full: take something off'); return -1; }
  tracks[i] = { type, ev: gen(type), lvl: 0.75, pan: +(Math.random() * 1.2 - 0.6).toFixed(2), echo: MM.pick([0, 0, 0.25, 0.5]), tone: 0, speed: MM.pick([1, 1, 1, 1, 0.5, 2, -1]), mute: false, solo: false, born: born++ };
  sel = i; applyTrack(i); renderMix(); MM.toast(`Put on: ${type} on track ${i + 1}${tracks[i].speed !== 1 ? ' (' + SPEEDS.find((s) => +s[0] === tracks[i].speed)[1] + ')' : ''}`); return i; }
const live = () => tracks.map((t, i) => (t && !t.mute ? i : -1)).filter((i) => i >= 0);
function takeOff() { const L = live().sort((a, b) => tracks[a].born - tracks[b].born); if (L.length < 2) { MM.toast('Leave something on'); return; } const i = L[Math.floor(Math.random() * Math.ceil(L.length / 2))]; tracks[i].mute = true; applyTrack(i); renderMix(); MM.toast(`Took off: ${tracks[i].type} (track ${i + 1})`); }
function takeMixture() { const L = live(); if (L.length < 2) return; const n = Math.max(1, Math.floor(L.length / 2)); for (let k = 0; k < n; k++) { const j = L.splice(Math.floor(Math.random() * L.length), 1)[0]; tracks[j].mute = true; applyTrack(j); } renderMix(); MM.toast(`Took a mixture off: ${live().length} left`); }
function bringBack() { tracks.forEach((t, i) => t && ((t.mute = false), (t.solo = false), applyTrack(i))); renderMix(); MM.toast('Everything back on'); }
function clearTape() { tracks = Array(NT).fill(null); renderMix(); tracks.forEach((_, i) => applyTrack(i)); MM.toast('Nothing at all'); }
/* ---------- channel strips (audio) ---------- */
function mkChannel() { const c = MM.ctx, ch = { in: c.createGain(), lo: c.createBiquadFilter(), hi: c.createBiquadFilter(), fad: c.createGain(), pan: c.createStereoPanner(), echo: c.createGain(), sp: c.createGain() };
  ch.lo.type = 'lowshelf'; ch.lo.frequency.value = 250; ch.hi.type = 'highshelf'; ch.hi.frequency.value = 3000; ch.in.connect(ch.lo); ch.lo.connect(ch.hi); ch.hi.connect(ch.fad); ch.fad.connect(ch.pan); ch.pan.connect(N.bus); ch.pan.connect(ch.echo); ch.echo.connect(N.dly); ch.pan.connect(ch.sp); ch.sp.connect(MM.rev); return ch; }
function applyTrack(i) { const ch = N.ch[i], t = tracks[i], now = MM.now, anySolo = tracks.some((x) => x && x.solo && !x.mute); if (!ch) return;
  const on = t && !t.mute && (!anySolo || t.solo); ch.fad.gain.setTargetAtTime(on ? t.lvl * t.lvl * 1.2 : 0, now, 0.04); if (!t) return;
  ch.pan.pan.setTargetAtTime(t.pan, now, 0.05); ch.echo.gain.setTargetAtTime(t.echo, now, 0.05); ch.sp.gain.setTargetAtTime(st.space * 0.5, now, 0.1); ch.lo.gain.setTargetAtTime(-t.tone * 12, now, 0.05); ch.hi.gain.setTargetAtTime(t.tone * 12, now, 0.05);
  if (i === sel) for (let k = 0; k < NT; k++) if (k !== i) applySolo(k, anySolo); }
function applySolo(k, anySolo) { const t = tracks[k], ch = N.ch[k]; if (!ch) return; const on = t && !t.mute && (!anySolo || t.solo); ch.fad.gain.setTargetAtTime(on ? t.lvl * t.lvl * 1.2 : 0, MM.now, 0.04); }
function applyAll() { const anySolo = tracks.some((x) => x && x.solo && !x.mute); tracks.forEach((_, k) => { applyTrack(k); applySolo(k, anySolo); }); }
function applyDesk() { const now = MM.now; N.comp.threshold.setTargetAtTime(-6 - st.squash * 34, now, 0.05); N.comp.ratio.setTargetAtTime(1 + st.squash * 19, now, 0.05); N.make.gain.setTargetAtTime(1 + st.squash * 1.6, now, 0.05);
  N.dly.delayTime.setTargetAtTime(MM.clamp((60 / MM.bpm) * st.echoT, 0.02, 2.9), now, 0.05); N.dfb.gain.setTargetAtTime(st.echoFb, now, 0.05); N.hiss.gain.setTargetAtTime(st.hiss * 0.25, now, 0.2); tracks.forEach((t, i) => t && N.ch[i].sp.gain.setTargetAtTime(st.space * 0.5, now, 0.1)); }
/* ---------- the tape transport ---------- */
function fire(i, ev, time, span, rev) { const t = tracks[i], slot = TYPES.indexOf(t.type), sp = Math.abs(t.speed) === 1 ? 1 : t.speed, dur = Math.max(0.03, ev.d * span), long = t.type === 'drone' || t.type === 'texture';
  MMX.fire(slot, time, { rate: rt(ev.m) * sp, dur, gain: ev.v, dest: N.ch[i].in, loop: long, fadeIn: rev ? dur * 0.85 : long ? Math.min(1.5, dur * 0.3) : 0.004, fadeOut: rev ? 0.02 : long ? Math.min(1.5, dur * 0.3) : Math.min(0.08, dur * 0.3) });
  setTimeout(() => (flash[i] = performance.now() + Math.min(400, dur * 1000)), Math.max(0, (time - MM.now) * 1000)); }
function tick(now) { const a = Math.max(schedT, now), b = now + 0.15, C = cyc();
  tracks.forEach((t, i) => { if (!t || !t.ev.length) return; const span = C / Math.abs(t.speed), rev = t.speed < 0, n0 = Math.floor((a - t0) / span), n1 = Math.floor((b - t0) / span);
    for (let n = n0; n <= n1; n++) t.ev.forEach((ev) => { if (ev.x) return; const p = rev ? 1 - ev.p - ev.d : ev.p, time = t0 + n * span + MM.clamp(p, 0, 0.999) * span; if (time >= a && time < b) fire(i, ev, time, span, rev); }); });
  schedT = b; const pass = Math.floor((now - t0) / C); if (pass !== lastPass) { lastPass = pass; onPass(pass); } }
function onPass(p) { if (p <= 0) return; if (st.drift) tracks.forEach((t, i) => { if (t && !t.mute) { t.lvl = MM.clamp(t.lvl + (Math.random() - 0.5) * 0.25, 0.15, 1); applyTrack(i); } });
  if (st.gardener && p % st.every === 0) { const L = live().length; if (L < 3 || (L < 8 && Math.random() < 0.55)) putOn(); else if (Math.random() < 0.5) takeOff(); else { const j = live(); const k = MM.pick(j); tracks.splice(k, 1, null); applyTrack(k); MM.toast(`Gardener cleared track ${k + 1}`); } }
  if (st.drift || st.gardener) renderMix(); }
function retime() { if (!MM.playing) return; const now = MM.now, C = cyc(), ph = lastPass >= 0 ? ((now - t0) % C) / C : 0; t0 = now - ph * C; schedT = now + 0.02; lastPass = Math.floor((now - t0) / C); applyDesk(); }
/* ---------- the mixer (HTML strips) ---------- */
function renderMix() { const el = MM.$('#mix'); el.innerHTML = '';
  tracks.forEach((t, i) => { const s = MM.h('div', { class: 'strip' + (i === sel ? ' sel' : '') + (t && t.mute ? ' off' : '') }); s.onpointerdown = () => { if (sel !== i) { sel = i; MM.$$('.strip').forEach((x, k) => x.classList.toggle('sel', k === sel)); } };
    s.append(MM.h('div', { class: 'nm', title: t ? t.type : 'empty' }, `${i + 1} ${t ? t.type : '·'}`));
    if (!t) { const b = MM.h('button', { title: 'put something on this track' }, '+'); b.onclick = () => { const j = putOn(); }; s.append(MM.h('div', { style: 'flex:1' }), b); el.append(s); return; }
    const rng = (k, mn, mx, stp, cls, lab) => { const r = MM.h('input', { type: 'range', min: mn, max: mx, step: stp, class: cls || '', title: lab }); r.value = t[k]; r.oninput = () => { t[k] = +r.value; applyTrack(i); }; return lab && !cls ? MM.h('label', { title: lab }, MM.h('span', {}, lab[0]), r) : r; };
    const spd = MM.h('select', { title: 'tape speed' }); SPEEDS.forEach(([v, l]) => spd.append(new Option(l, v))); spd.value = String(t.speed); spd.onchange = () => { t.speed = +spd.value; };
    const btn = (lab, on, fn, ti) => { const b = MM.h('button', { class: on ? 'on' : '', title: ti }, lab); b.onclick = fn; return b; };
    s.append(rng('lvl', 0, 1, 0.01, 'fd', 'fader'), rng('pan', -1, 1, 0.01, null, 'pan'), rng('echo', 0, 1, 0.01, null, 'echo'), rng('tone', -1, 1, 0.01, null, 'tone (dark to bright)'), spd,
      MM.h('div', { class: 'row' }, btn('M', t.mute, () => { t.mute = !t.mute; applyAll(); renderMix(); }, 'mute'), btn('S', t.solo, () => { t.solo = !t.solo; applyAll(); renderMix(); }, 'solo'), btn('×', false, () => { tracks[i] = null; applyAll(); renderMix(); }, 'erase the track')));
    el.append(s); }); }
/* ---------- drawing: layered, stained, scratched (Russell Mills) ---------- */
function texture(W, H) { const o = document.createElement('canvas'); o.width = W; o.height = H; const g = o.getContext('2d'); g.fillStyle = '#2a231d'; g.fillRect(0, 0, W, H); const R = MM.rng(1952);
  for (let k = 0; k < 70; k++) { const x = R() * W, y = R() * H, r = 20 + R() * 160, gr = g.createRadialGradient(x, y, 0, x, y, r), c = MM.pick(['rgba(120,70,35,', 'rgba(70,55,40,', 'rgba(150,110,60,', 'rgba(30,24,20,', 'rgba(90,40,25,'], R); gr.addColorStop(0, c + (0.1 + R() * 0.25) + ')'); gr.addColorStop(1, c + '0)'); g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2); }
  g.strokeStyle = 'rgba(233,220,195,.07)'; for (let k = 0; k < 120; k++) { const x = R() * W, y = R() * H; g.lineWidth = R() * 1.2; g.beginPath(); g.moveTo(x, y); g.lineTo(x + (R() - 0.5) * 80, y + (R() - 0.5) * 12); g.stroke(); }
  const id = g.getImageData(0, 0, W, H), d = id.data; for (let i = 0; i < d.length; i += 4) { const n = (R() - 0.5) * 18; d[i] += n; d[i + 1] += n; d[i + 2] += n; } g.putImageData(id, 0, 0); return o; }
function laneRect(i, W, H) { const top = 66, h = (H - top - 26) / NT; return { x: 54, y: top + i * h, w: W - 70, h }; }
function draw() { cv.fit(); const g = cv.g, W = cv.w, H = cv.h, now = performance.now(); if (!tex || tex.width !== Math.round(W) || tex.height !== Math.round(H)) tex = texture(Math.round(W), Math.round(H)); g.drawImage(tex, 0, 0, W, H);
  const C = cyc(), ph = MM.playing ? (((MM.now - t0) % C) + C) % C / C : 0;
  tracks.forEach((t, i) => { const L = laneRect(i, W, H); g.fillStyle = i === sel ? 'rgba(233,220,195,.08)' : 'rgba(0,0,0,.12)'; g.fillRect(L.x, L.y + 1, L.w, L.h - 2);
    g.fillStyle = flash[i] > now ? '#e6b071' : '#a58c6b'; g.font = "11px 'Special Elite'"; g.fillText(String(i + 1).padStart(2, '0'), 18, L.y + L.h / 2 + 4); if (!t) return;
    const col = TCOL[t.type], sp = t.speed, reps = Math.abs(sp) >= 2 ? 2 : 1, frac = Math.abs(sp) === 0.5 ? 0.5 : 1;
    g.globalAlpha = t.mute ? 0.25 : 1; g.fillStyle = 'rgba(233,220,195,.45)'; g.font = "10px 'Special Elite'"; g.fillText(t.type + (sp !== 1 ? ' · ' + SPEEDS.find((s) => +s[0] === sp)[1] : ''), L.x + 4, L.y + 10);
    for (let r = 0; r < reps; r++) t.ev.forEach((ev) => { const p = sp < 0 ? 1 - ev.p - ev.d : ev.p, x = L.x + ((p * frac + r) / reps) * L.w, w = Math.max(2, (ev.d * frac * L.w) / reps), y = L.y + L.h * (0.85 - ((ev.m % 24) / 24) * 0.7);
      if (ev.x) { g.strokeStyle = 'rgba(233,220,195,.25)'; g.lineWidth = 1; g.beginPath(); g.moveTo(x, y - 3); g.lineTo(x + Math.min(w, 8), y + 3); g.moveTo(x, y + 3); g.lineTo(x + Math.min(w, 8), y - 3); g.stroke(); return; }
      g.fillStyle = col; g.globalAlpha = (t.mute ? 0.25 : 0.55 + ev.v * 0.45); g.fillRect(x, y - 2, w, 4); g.fillStyle = '#16120f'; g.fillRect(x, y - 2, 1, 4); });
    g.globalAlpha = 1; });
  if (paint) { g.strokeStyle = paint.add ? '#d6c27a' : '#b5532a'; g.lineWidth = 1; g.strokeRect(paint.x - 14, paint.y - 14, 28, 28); }
  const L0 = laneRect(0, W, H); g.fillStyle = '#b5532a'; g.fillRect(L0.x + ph * L0.w, L0.y - 4, 2, laneRect(NT - 1, W, H).y + L0.h - L0.y + 8);
  g.fillStyle = '#d6a35c'; g.font = "12px 'Special Elite'"; g.textAlign = 'right'; const pass = Math.max(0, lastPass + 1);
  g.fillText(`${live().length} of ${tracks.filter(Boolean).length} on · pass ${MM.playing ? pass : 0} · ${st.bars} bars at ${MM.bpm} · ${NOTES[st.root]} ${st.scale}${st.gardener ? ' · gardener' : ''}${st.drift ? ' · drift' : ''}${st.overdub ? ' · OVERDUB on ' + (sel + 1) : ''}`, W - 16, H - 8);
  if (!tracks.some(Boolean)) { g.textAlign = 'center'; g.fillStyle = 'rgba(233,220,195,.6)'; g.font = "italic 500 22px 'Cormorant Garamond'"; g.fillText('nothing at all. press A to put something on', W / 2, H / 2); }
  g.textAlign = 'left'; }
/* the brush: paint notes out (or back in with Shift) */
MM.drag(MM.$('#cv'), (px, py, ph, e) => { const W = cv.w, H = cv.h; if (ph === 'up') { paint = null; return; } paint = { x: px, y: py, add: !!(e && e.shiftKey) };
  tracks.forEach((t, i) => { if (!t) return; const L = laneRect(i, W, H); if (py < L.y - 10 || py > L.y + L.h + 10) return; sel = i; const sp = t.speed, reps = Math.abs(sp) >= 2 ? 2 : 1, frac = Math.abs(sp) === 0.5 ? 0.5 : 1;
    for (let r = 0; r < reps; r++) t.ev.forEach((ev) => { const p = sp < 0 ? 1 - ev.p - ev.d : ev.p, x = L.x + ((p * frac + r) / reps) * L.w, w = Math.max(2, (ev.d * frac * L.w) / reps); if (px >= x - 14 && px <= x + w + 14) ev.x = !paint.add; }); });
  if (ph === 'down') MM.$$('.strip').forEach((x, k) => x.classList.toggle('sel', k === sel)); });
const cfg = { bpm: 72, tick, draw, start: () => { t0 = MM.now + 0.08; schedT = t0; lastPass = -1; startHiss(); }, stop: () => { if (hissH) { hissH.stop(MM.now); hissH = null; } },
  onSamples: (list) => MMX.assign(list),
  key: (e) => { if (MMX.key(e)) return; const k = e.key.toLowerCase();
    if (k === 'a') putOn(); else if (k === 's') takeOff(); else if (k === 'x') takeMixture(); else if (k === 'z') bringBack(); else if (k === 'c') clearTape();
    else if (k === 'g') MMX.setParam('gardener', !st.gardener); else if (k === 'f') MMX.setParam('drift', !st.drift); else if (k === 'o') MMX.setParam('overdub', !st.overdub);
    else if (k === 'm' && tracks[sel]) { tracks[sel].mute = !tracks[sel].mute; applyAll(); renderMix(); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { sel = (sel + (e.key === 'ArrowRight' ? 1 : NT - 1)) % NT; renderMix(); }
    else if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && tracks[sel]) { e.preventDefault(); tracks[sel].lvl = MM.clamp(tracks[sel].lvl + (e.key === 'ArrowUp' ? 0.05 : -0.05), 0, 1); applyTrack(sel); renderMix(); } },
  setup() { MM.ensure(); const c = MM.ctx; N.bus = c.createGain(); N.comp = c.createDynamicsCompressor(); N.comp.attack.value = 0.01; N.comp.release.value = 0.25; N.comp.knee.value = 8; N.make = c.createGain(); N.bus.connect(N.comp); N.comp.connect(N.make); N.make.connect(MM.out);
    N.dly = c.createDelay(3); N.dfb = c.createGain(); N.dlp = c.createBiquadFilter(); N.dlp.frequency.value = 2600; N.dly.connect(N.dlp); N.dlp.connect(N.dfb); N.dfb.connect(N.dly); N.dlp.connect(N.bus); N.hiss = c.createGain(); N.hiss.connect(MM.out);
    N.ch = Array.from({ length: NT }, mkChannel);
    MM.fb.pad = padBuf(); MM.fb.piano = pianoBuf(); MM.fb.bass = bassBuf(); MM.fb.bell = bellBuf(); MM.fb.perc = percBuf();
    MMX.init({ state: st, onSlot: (i) => { if (MM.playing) { const k = tracks.findIndex((t) => t && TYPES.indexOf(t.type) === i && !t.mute); MMX.fire(i, MM.now + 0.03, { maxDur: 2, gain: 0.7, dest: k >= 0 ? N.ch[k].in : undefined, fadeOut: 0.3 }); } }, slots: [{ label: 'Drone / pad (C)', kind: 'pad', rv: 0.2 }, { label: 'Piano (C)', kind: 'piano', rv: 0.2 }, { label: 'Bass (C)', kind: 'bass', rv: 0.02 }, { label: 'Bell (C)', kind: 'bell', rv: 0.3 }, { label: 'Pulse / percussion', kind: 'perc', rv: 0.05 }, { label: 'Texture', kind: 'texture', rv: 0.25 }],
      extra: { get: () => ({ tracks: tracks.map((t) => (t ? JSON.parse(JSON.stringify(t)) : null)) }), set: (x) => { if (x && Array.isArray(x.tracks)) { tracks = Array.from({ length: NT }, (_, i) => { const t = x.tracks[i]; return t && TYPES.includes(t.type) && Array.isArray(t.ev) ? Object.assign({ lvl: 0.75, pan: 0, echo: 0, tone: 0, speed: 1, mute: false, solo: false, born: i }, t) : null; }); applyAll(); renderMix(); } } },
      onPreset: () => { MM.bpm = st.bpm; retime(); applyDesk(); }, factory: fac(),
      keys: [['A', 'put something on'], ['S', 'take something off (older first)'], ['X', 'take a mixture off'], ['Z', 'bring everything back'], ['C', 'nothing at all (clear the tape)'], ['drag on the tape', 'paint notes out'], ['Shift + drag', 'paint them back'], ['← →', 'select a track'], ['↑ ↓', 'selected fader'], ['M', 'mute the selected track'], ['G', 'gardener on / off'], ['F', 'fader drift'], ['O', 'MIDI overdub onto the selected track']],
      midiHelp: 'Notes play the selected track\'s sound through its channel strip. With OVERDUB on (O), what you play is recorded onto that track at the current tape position (an empty track becomes a piano track).',
      midi: (n, v, on) => { if (!on) return; let t = tracks[sel]; if (!t && st.overdub) { tracks[sel] = t = { type: 'piano', ev: [], lvl: 0.75, pan: 0, echo: 0.25, tone: 0, speed: 1, mute: false, solo: false, born: born++ }; applyTrack(sel); renderMix(); }
        const type = t ? t.type : 'piano', slot = TYPES.indexOf(type); MMX.fire(slot, MM.now + 0.005, { rate: rt(n), gain: 0.3 + v * 0.7, dur: 1.2, dest: t ? N.ch[sel].in : undefined, fadeOut: 0.2 });
        if (t && st.overdub && MM.playing) { const span = cyc() / Math.abs(t.speed), p = ((((MM.now - t0) % span) + span) % span) / span; t.ev.push({ p: t.speed < 0 ? MM.clamp(1 - p - 0.1, 0, 0.999) : p, m: n, d: 0.1, v: 0.3 + v * 0.6, x: false }); } } });
    MM.$('#types').append(...TYPES.map((ty) => { const b = MM.h('button', { class: 'bb', style: `border-color:${TCOL[ty]}` }, ty); b.onclick = () => putOn(ty); return b; }));
    const C0 = MM.$('#c0'), C1 = MM.$('#c1'), C2 = MM.$('#c2'), C3 = MM.$('#c3');
    MMX.ctl(C0, 'put', { type: 'select', label: 'A puts on', options: [['any', 'anything'], ...TYPES.map((t) => [t, t])] }); MMX.ctl(C0, 'density', { label: 'Density', min: 0, max: 1 });
    MMX.ctl(C1, 'bpm', { label: 'Tempo', min: 40, max: 140, step: 1, on: (v) => { MM.bpm = v; retime(); } }); MMX.ctl(C1, 'bars', { label: 'Loop bars', min: 1, max: 16, step: 1, on: retime });
    MMX.ctl(C1, 'root', { type: 'select', label: 'Key', options: NOTES.map((x, k) => [k, x]) }); MMX.ctl(C1, 'scale', { type: 'select', label: 'Scale', options: Object.keys(MM.SCALES).map((k) => [k, k]) }); MMX.ctl(C1, 'hiss', { label: 'Tape hiss', min: 0, max: 1, on: () => N.hiss && applyDesk() });
    const D = { on: () => N.comp && applyDesk() }; MMX.ctl(C2, 'squash', Object.assign({ label: 'Squash (bus)', min: 0, max: 1 }, D)); MMX.ctl(C2, 'echoT', Object.assign({ label: 'Echo (beats)', min: 0.25, max: 3, step: 0.25 }, D)); MMX.ctl(C2, 'echoFb', Object.assign({ label: 'Echo repeats', min: 0, max: 0.9 }, D)); MMX.ctl(C2, 'space', Object.assign({ label: 'Space', min: 0, max: 1 }, D));
    MMX.ctl(C3, 'gardener', { type: 'check', label: 'Gardener (G)' }); MMX.ctl(C3, 'every', { label: 'Every N passes', min: 1, max: 8, step: 1 }); MMX.ctl(C3, 'drift', { type: 'check', label: 'Fader drift (F)' }); MMX.ctl(C3, 'overdub', { type: 'check', label: 'MIDI overdub (O)' });
    MM.$('#b-on').onclick = () => putOn(); MM.$('#b-off').onclick = takeOff; MM.$('#b-mix').onclick = takeMixture; MM.$('#b-back').onclick = bringBack; MM.$('#b-clear').onclick = clearTape;
    // you arrive with nothing at all; the first press of A happens for you after one pass, so there is sound within seconds
    renderMix(); applyDesk(); } };
let firstPut = false; const _tick = cfg.tick; cfg.tick = (now) => { if (!firstPut && MM.playing && now - t0 > 0.6 && !tracks.some(Boolean)) { firstPut = true; putOn('drone'); putOn('piano'); } _tick(now); };
function startHiss() { if (hissH) hissH.stop(MM.now); const c = MM.ctx, b = c.createBuffer(2, c.sampleRate * 3, c.sampleRate); for (let k = 0; k < 2; k++) { const d = b.getChannelData(k); let lp = 0; for (let i = 0; i < d.length; i++) { lp += ((Math.random() * 2 - 1) - lp) * 0.5; d[i] = lp * 0.2; } } const s = c.createBufferSource(); s.buffer = b; s.loop = true; const f = c.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 3500; s.connect(f); f.connect(N.hiss); s.start(); hissH = { stop: (t) => s.stop(t + 0.05) }; }
function fac() { const base = JSON.parse(JSON.stringify(st)), F = (o) => ({ full: { params: Object.assign({}, base, o) } });
  return { 'Nothing at all (default)': {}, 'The gardener': F({ gardener: true, every: 2, drift: true, bars: 8, bpm: 60, scale: 'penta' }), 'Squashed desk': F({ squash: 0.9, echoFb: 0.6, bpm: 84, root: 9, scale: 'dorian' }), 'Slow tape, long echo': F({ bpm: 48, bars: 8, echoT: 2, echoFb: 0.7, space: 0.8, hiss: 0.3, scale: 'lydian', root: 5 }), 'Pulse and bells': F({ put: 'pulse', density: 0.8, bpm: 110, bars: 2, scale: 'minpent', root: 4 }) }; }
/* ---------- built-in sounds, tuned to C4 ---------- */
function mk(len, fn) { const c = MM.ctx, sr = c.sampleRate, B = c.createBuffer(1, (sr * len) | 0, sr), d = B.getChannelData(0); let pk = 0; for (let i = 0; i < d.length; i++) { d[i] = fn(i / sr); pk = Math.max(pk, Math.abs(d[i])); } for (let i = 0; i < d.length; i++) d[i] *= 0.75 / (pk || 1); return B; }
const F0 = 261.63;
function padBuf() { let lp = 0; return mk(5, (t) => { let s = 0; for (let v = 0; v < 3; v++) for (let k = 1; k < 10; k++) s += Math.sin(2 * Math.PI * F0 * k * t * (1 + (v - 1) * 0.003)) / k; lp += (s - lp) * 0.04; return lp * Math.min(1, t * 2) * Math.min(1, (5 - t) * 2); }); }
function pianoBuf() { return mk(3, (t) => { let s = 0; for (let k = 1; k <= 8; k++) s += Math.sin(2 * Math.PI * F0 * k * Math.sqrt(1 + 0.0004 * k * k) * t + k) / Math.pow(k, 1.3) * Math.exp(-t * (1 + k * 0.6)); return s * Math.min(1, t * 600); }); }
function bassBuf() { let lp = 0; return mk(2, (t) => { const saw = ((F0 * t) % 1) * 2 - 1; lp += (saw - lp) * (0.02 + 0.2 * Math.exp(-t * 8)); return (lp + 0.6 * Math.sin(2 * Math.PI * F0 * t)) * Math.exp(-t * 1.6) * Math.min(1, t * 300); }); }
function bellBuf() { return mk(4, (t) => Math.sin(2 * Math.PI * F0 * t + 2.4 * Math.exp(-t * 1.5) * Math.sin(2 * Math.PI * F0 * 3.5 * t)) * Math.exp(-t * 0.9) * Math.min(1, t * 500)); }
function percBuf() { return mk(0.25, (t) => ((Math.random() * 2 - 1) * 0.5 * Math.exp(-t * 40) + Math.sin(2 * Math.PI * F0 * 2 * t) * Math.exp(-t * 30)) * Math.min(1, t * 2000)); }
MM.init(cfg);
