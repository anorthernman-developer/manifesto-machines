/*META
{"title":"Closed Groove","deep":true,"category":"music theory","date":"2026-10-28","kicker":"MUSIC THEORY · MUSIQUE CONCRÈTE",
"idea":"Pierre Schaeffer's musique concrète as a four-turntable instrument: cut any sound into eight sound objects, label each one with a simplified version of his typology, then loop them in closed grooves, slow them down, cut off their attacks and reverse them, the way the Étude aux chemins de fer was made from railway recordings in 1948.",
"controls":"4 source slots (railway, bell, voice, tone) cut into 4 to 8 objects at onsets or equally; per-turntable source, object, hit or closed-groove mode, speed, attack cut, length, reverse, level, pan, tone, space and a 16-step pattern; tempo and swing; acousmatic (reduced listening) mode; automatic étude; spatial relief.",
"how":"Press PLAY: four turntables (the wheels) play objects cut from a built-in railway recording and a bell. Click an object in the strip (A to H) to hear it and give it to the selected turntable, or press 1 to 8. Click the step grid on a turntable to change its rhythm. Set a turntable to CLOSED GROOVE and its object loops forever, the steps opening and closing it. Raise ATTACK CUT on the bell to hear Schaeffer's 'cut bell'. Tab picks the next turntable, G toggles closed groove, V reverses, ↑ ↓ change its speed, A switches on acousmatic listening (sources hidden), U starts the automatic étude. Load your own sounds into the four sources (D opens the deck).",
"fonts":"family=Poiret+One&family=Josefin+Sans:wght@300;600;700","bpm":92,
"try":["Load one Splice one-shot you know well (a vocal 'hey', a snare, a door) into SOURCE A, switch on ACOUSMATIC and listen to its eight objects without knowing which is which. Describe each one only by its shape (attack, body, decay), which is reduced listening.","Put a piano or bell note into SOURCE B, set a turntable to CLOSED GROOVE on object A, then raise ATTACK CUT. With the strike gone, the tail becomes a new instrument, as Schaeffer found with his cut bell.","Record four seconds of your own street, kitchen or train journey on your phone, load it into SOURCE A, set objects to 8 at onsets and switch on the AUTOMATIC ÉTUDE. That's your own étude aux chemins de fer."],
"manifesto":{"name":"Pierre Schaeffer: musique concrète and the sound object","short":"Schaeffer: the sound object","author":"Pierre Schaeffer (1910 to 1995), with Pierre Henry and the Groupe de Recherche de Musique Concrète","year":"1948 to 1966","where":"Studio d'Essai of French radio, Paris. The Étude aux chemins de fer (railway study) was broadcast in the 'Concert de bruits' on 5 October 1948. The theory was set out in 'Traité des objets musicaux' (1966).",
"ideas":["Musique concrète starts from recorded sounds rather than notes on paper. The composer works directly on the 'concrete' material and finds the structure by listening.","The 1948 études were made with discs. A 'sillon fermé' (closed groove) cut into the disc locked a fragment into an endless loop, about forty years before the sampler.","The 'cloche coupée' (cut bell): remove the attack from a bell and what you hear is no longer a bell. The identity of a sound lives a lot in its first moments.","Reduced listening (écoute réduite) means listening to a sound for its own qualities (shape, grain, mass, how it moves), not for its cause or its meaning.","The sound object (objet sonore) is what you hear when you listen that way. Schaeffer sorted objects with a typology, for example sustained against impulse against iterative, and tonic (with a pitch) against complex. The labels here simplify it.","Acousmatic listening means hearing a sound without seeing its source, as Pythagoras' students were said to hear him from behind a curtain. Radio and loudspeakers made this normal."],
"quotes":[["For years, we often did phenomenology without knowing it","Pierre Schaeffer, Traité des objets musicaux (1966), in Brian Kane's translation"],["a sound that one hears without seeing the causes behind it","Schaeffer's Traité (1966) quoting a dictionary definition of 'acousmatic'. This is a translation and the wording varies, so treat it as a paraphrase."],["Deprived of its percussion, the bell becomes an oboe sound","Schaeffer on the cut bell, in English translation. The wording varies between sources."]],
"system":"Each source slot is analysed when it loads. Its region (start to end, reversed if set) is cut into OBJECTS at detected onsets, or into equal parts, giving objects A to H. Each object gets a simplified Schaeffer-style label from its loudness envelope and periodicity: N = tonic (clear pitch), X = complex (noisy), ' = impulse (short), \" = iterative (repeated pulses), and no mark = sustained. Four turntables each play one object. In HIT mode it is retriggered on the active steps of the turntable's 16-step pattern. In CLOSED GROOVE mode it loops continuously and the steps open and close a gate. SPEED changes pitch and duration together, like changing disc speed. ATTACK CUT skips the first milliseconds and fades in, which is the cut bell. RELIEF slowly moves the turntables around the stereo field, after the 'pupitre d'espace' (the spatialisation desk Schaeffer's studio built in 1951). The AUTOMATIC ÉTUDE changes one thing every two bars."},
"design":{"name":"A. M. Cassandre","short":"Cassandre","who":"A. M. Cassandre (Adolphe Jean-Marie Mouron, 1901 to 1968), Ukrainian-born French poster artist and type designer","era":"Paris, 1923 to 1939 (Art Deco)",
"hallmarks":["Geometry and huge scale: a locomotive, a ship's bow or a pair of rails reduced to bold shapes, often seen from very low down or converging to one vanishing point.","Airbrushed gradients and a limited palette of navy, black, cream and red, with light that glows like a lamp in fog.","Lettering built as part of the picture, often in his own display faces Bifur (1929) and Peignot (1937), with wide geometric capitals set along an edge. Here the turntables are drawn as locomotive wheels."],
"works":["Étoile du Nord (1927), rails converging to a star","Nord Express (1927), the locomotive as a wedge of speed","Normandie (1935), the ocean liner's bow towering over the viewer; and Dubonnet (1932), the drinker filled in panel by panel"]}}
*/
/*CSS
:root{--bg:#efe6d2;--fg:#161a2b;--acc:#c8312a;--bar-bg:#161a2b;--bar-fg:#efe6d2;--bar-font:'Josefin Sans',sans-serif;--learn-font:'Josefin Sans',sans-serif;--learn-bg:#efe6d2;--deck-bg:#efe6d2}
#mm-stage{display:grid;grid-template-columns:minmax(0,1fr) 560px;grid-template-rows:minmax(0,1fr) 108px 30px}
#hero{grid-column:1;grid-row:1;position:relative;background:#161a2b}#hv{position:absolute;inset:0;width:100%;height:100%}
#strip{grid-column:1;grid-row:2;position:relative;border-top:3px solid var(--fg);cursor:pointer}#sv{position:absolute;inset:0;width:100%;height:100%}
#log{grid-column:1;grid-row:3;font:600 11px 'Josefin Sans';letter-spacing:.18em;text-transform:uppercase;padding:8px 12px;background:var(--fg);color:var(--bg);white-space:nowrap;overflow:hidden}
#right{grid-column:2;grid-row:1/4;overflow:auto;border-left:3px solid var(--fg);padding:8px 10px;display:flex;flex-direction:column;gap:6px}
#glob{display:grid;grid-template-columns:1fr 1fr;gap:0 12px}#glob .mmx-ctl,.pl .mmx-ctl{grid-template-columns:70px 1fr 34px;font:600 10px 'Josefin Sans';letter-spacing:.06em;text-transform:uppercase}
#glob .mmx-ctl select,.pl .mmx-ctl select{grid-column:2/4;min-width:0}
.pl{border:2px solid var(--fg);padding:5px 7px 6px;background:#f6f0e2}.pl.sel{border-color:var(--acc);box-shadow:4px 4px 0 var(--acc)}
.pl .hd{display:flex;align-items:center;gap:10px;cursor:pointer}.pl .hd b{font:400 26px/1 'Poiret One';width:42px}.pl .hd span{font:700 10px 'Josefin Sans';letter-spacing:.2em;text-transform:uppercase;flex:1}
.pl canvas{width:100%;height:22px;display:block;margin:4px 0;cursor:pointer}.pl .cg{display:grid;grid-template-columns:repeat(3,1fr);gap:0 10px}
#btns{display:flex;gap:5px}#btns button{flex:1;font:700 10px 'Josefin Sans';letter-spacing:.2em;background:none;border:2px solid var(--fg);color:var(--fg);padding:6px 4px;cursor:pointer}#btns button.on{background:var(--fg);color:var(--bg)}
#mm-learn-dlg h2{font:400 40px/1 'Poiret One'}
*/
/*HTML
<div id="hero"><canvas id="hv"></canvas></div>
<div id="strip" title="Click an object to hear it and give it to the selected turntable"><canvas id="sv"></canvas></div>
<div id="log">Press play · étude aux chemins de fer · 1948</div>
<div id="right"><div id="btns"><button id="bAcous">A · ACOUSMATIC</button><button id="bEtude">U · AUTO ÉTUDE</button><button id="bRecut">RE-CUT</button></div><div id="glob"></div><div id="pls"></div></div>
*/
const P4 = [0, 1, 2, 3];
const st = MMX.bind({ bpm: 92, swing: 0.08, nobj: 8, cutmode: 'onsets', acous: false, etude: false, relief: 0.25, verb: 0.25, sel: 0,
  p0src: 0, p0obj: 0, p0mode: 'hit', p0speed: 0, p0cut: 0, p0len: 1, p0rev: false, p0lvl: 0.85, p0pan: -0.35, p0tone: 18000, p0rv: 0.1, p0pat: 'x..xx..x..x.x..x',
  p1src: 0, p1obj: 3, p1mode: 'groove', p1speed: -5, p1cut: 0, p1len: 1, p1rev: false, p1lvl: 0.5, p1pan: 0.4, p1tone: 6000, p1rv: 0.2, p1pat: 'xxxx....xxxx..xx',
  p2src: 1, p2obj: 0, p2mode: 'hit', p2speed: -12, p2cut: 0, p2len: 1, p2rev: false, p2lvl: 0.6, p2pan: 0.1, p2tone: 18000, p2rv: 0.4, p2pat: 'x.......x.....x.',
  p3src: 2, p3obj: 2, p3mode: 'hit', p3speed: 0, p3cut: 0, p3len: 0.6, p3rev: true, p3lvl: 0.55, p3pan: -0.1, p3tone: 9000, p3rv: 0.3, p3pat: '....x.......x..x' });
const L = 'ABCDEFGH', ROM = ['I', 'II', 'III', 'IV'], SRC = ['Source A', 'Source B', 'Source C', 'Source D'];
const objCache = [{}, {}, {}, {}], chain = [], grooves = [null, null, null, null], flash = [0, 0, 0, 0], phase = [0, 0, 0, 0];
let stepNow = 0, auditionAt = -1, auditionObj = -1, barN = 0;
const hv = MM.canvas('#hv'), sv = MM.canvas('#sv');
const p = (i, k) => st['p' + i + k];
/* ---------- the sound object: cutting and a simplified typology ---------- */
function objects(s) {
  const r = MMX.region(s), c = objCache[s], key = r.a.toFixed(4) + '|' + r.z.toFixed(4) + '|' + st.nobj + st.cutmode;
  if (c.b === r.b && c.key === key) return c.list;
  const N = st.nobj; let pts;
  if (st.cutmode === 'onsets') { pts = MM.onsets(r.b, 32).filter((x) => x > r.a + 0.03 && x < r.z - 0.05); pts = [r.a, ...pts];
    while (pts.length < N) { let bi = 0, bl = 0; const ends = [...pts, r.z]; for (let k = 0; k < pts.length; k++) { const l = ends[k + 1] - ends[k]; if (l > bl) { bl = l; bi = k; } } pts.splice(bi + 1, 0, pts[bi] + bl / 2); }
    pts = pts.slice(0, N); } else pts = Array.from({ length: N }, (_, k) => r.a + (k * r.len) / N);
  const list = pts.map((a, k) => { const z = k + 1 < pts.length ? pts[k + 1] : r.z; return { a, z, ...classify(r.b, a, z) }; });
  objCache[s] = { b: r.b, key, list }; return list; }
function classify(b, a, z) {
  const d = b.getChannelData(0), sr = b.sampleRate, i0 = Math.floor(a * sr), i1 = Math.min(d.length, Math.floor(z * sr)), hop = Math.floor(sr * 0.01), env = [];
  for (let i = i0; i + hop <= i1; i += hop) { let s = 0; for (let j = 0; j < hop; j++) s += d[i + j] * d[i + j]; env.push(Math.sqrt(s / hop)); }
  const mx = Math.max(1e-6, ...env), pk = env.indexOf(mx); let peaks = 0, armed = true; env.forEach((e) => { if (armed && e > mx * 0.6) { peaks++; armed = false; } else if (e < mx * 0.35) armed = true; });
  const after = env.slice(pk); const tail = after.findIndex((e) => e < mx * 0.2); const shortHit = (z - a) < 0.14 || (tail > 0 && tail < 9 && env.length > 3 && env.slice(pk + tail).every((e) => e < mx * 0.3));
  // periodicity at the loudest point: normalised autocorrelation
  const W = 2048, c0 = Math.max(i0, Math.min(i1 - W - 900, i0 + pk * hop)); let ac = 0;
  if (i1 - i0 > W + 900) { let e0 = 0; for (let j = 0; j < W; j += 2) e0 += d[c0 + j] * d[c0 + j]; for (let lag = 40; lag < 900; lag += 1) { let s = 0, e1 = 0; for (let j = 0; j < W; j += 2) { s += d[c0 + j] * d[c0 + j + lag]; e1 += d[c0 + j + lag] * d[c0 + j + lag]; } ac = Math.max(ac, s / Math.max(1e-9, Math.sqrt(e0 * e1))); } }
  const mass = ac > 0.8 ? 'N' : 'X', form = shortHit ? "'" : peaks >= 3 ? '"' : '';
  const words = { N: 'tonic', X: 'complex' }, fw = { "'": 'impulse', '"': 'iterative', '': 'sustained' };
  return { type: mass + form, desc: words[mass] + ', ' + fw[form], peaks: env.map((e) => e / mx) }; }
/* ---------- the four turntables ---------- */
function buildChain() { const ctx = MM.ctx; P4.forEach((i) => { const gate = ctx.createGain(), lvl = ctx.createGain(), pan = ctx.createStereoPanner(), lp = ctx.createBiquadFilter(), rv = ctx.createGain(), dl = ctx.createGain(); lp.type = 'lowpass'; lp.Q.value = 0.7;
  gate.connect(lvl); lvl.connect(lp); lp.connect(pan); pan.connect(MM.out); pan.connect(rv); rv.connect(MM.rev); pan.connect(dl); dl.connect(MM.dly); chain[i] = { gate, lvl, pan, lp, rv, dl }; }); }
function slotOf(i) { return MMX.S.slots[p(i, 'src')]; }
function rateOf(i) { const s = slotOf(i); return Math.pow(2, (p(i, 'speed') + (s ? s.pitch : 0)) / 12); }
function playObj(i, t, o = {}) { const sIx = o.src ?? p(i, 'src'), s = MMX.S.slots[sIx]; if (!s || s.mute) return null; const list = objects(sIx), ob = list[Math.min(list.length - 1, o.obj ?? p(i, 'obj'))]; if (!ob) return null;
  const r = MMX.region(sIx), cut = (o.cut ?? p(i, 'cut')) / 1000, a = Math.min(ob.z - 0.01, ob.a + cut), rate = o.rate ?? rateOf(i), len = (ob.z - a) * (o.len ?? p(i, 'len'));
  const dest = o.dest || chain[i].gate; flash[i] = performance.now();
  if (o.loop) return MM.play(r.b, t, { offset: a, rate, dur: 36000, gain: s.gain * 0.9, loop: true, loopStart: a, loopEnd: a + Math.max(0.02, len), dest, fadeIn: cut > 0 ? 0.015 : 0.004 });
  return MM.play(r.b, t, { offset: a, rate, dur: Math.max(0.02, len / rate), gain: s.gain * 0.9, dest, fadeIn: cut > 0 ? 0.015 : 0.002, fadeOut: Math.min(0.03, len / rate / 4) }); }
function grooveSig(i) { const s = p(i, 'src'), r = MMX.region(s); return [s, p(i, 'obj'), p(i, 'speed'), p(i, 'cut'), p(i, 'len'), r.a, r.z, st.nobj, st.cutmode, MMX.S.slots[s] && MMX.S.slots[s].pitch, MMX.S.slots[s] && MMX.S.slots[s].gain, p(i, 'rev')].join('|'); }
function step(n, t) {
  const k = n % 16, sd = 60 / MM.bpm / 4; stepNow = k; if (k === 0) { barN++; if (st.etude && barN % 2 === 0) etude(); }
  P4.forEach((i) => { const C = chain[i]; if (!C) return; const on = (p(i, 'pat') || '')[k] === 'x', s = slotOf(i), mute = !s || s.mute;
    C.lvl.gain.setTargetAtTime(p(i, 'lvl'), t, 0.02); C.lp.frequency.setTargetAtTime(p(i, 'tone'), t, 0.02); C.rv.gain.setTargetAtTime(p(i, 'rv') + st.verb * 0.5 + (s ? s.rv * 0.4 : 0), t, 0.05); C.dl.gain.setTargetAtTime(s ? s.dl * 0.6 : 0, t, 0.05);
    const ang = MM.now * 0.35 * (i + 1) + i * 1.7; C.pan.pan.setTargetAtTime(MM.clamp(p(i, 'pan') + (s ? s.pan : 0) + st.relief * Math.sin(ang), -1, 1), t, 0.05);
    if (p(i, 'mode') === 'groove') { const sig = grooveSig(i); if (!grooves[i] || grooves[i].sig !== sig || grooves[i].b !== MMX.region(p(i, 'src')).b) { if (grooves[i]) grooves[i].h && grooves[i].h.stop(t); const h = mute ? null : playObj(i, t, { loop: true }); grooves[i] = { sig, h, b: MMX.region(p(i, 'src')).b }; }
      C.gate.gain.setTargetAtTime(on ? 1 : 0, t, 0.006); if (on) flash[i] = performance.now(); }
    else { if (grooves[i]) { grooves[i].h && grooves[i].h.stop(t); grooves[i] = null; } C.gate.gain.setTargetAtTime(1, t, 0.003); if (on && !mute) playObj(i, t); } }); }
function stopAll() { P4.forEach((i) => { if (grooves[i]) { grooves[i].h && grooves[i].h.stop(); grooves[i] = null; } }); }
function audition(k, i = st.sel) { MM.ensure(); MM.ctx.resume(); const list = objects(p(i, 'src')); k = Math.min(k, list.length - 1); MMX.setParam('p' + i + 'obj', k); auditionAt = performance.now(); auditionObj = k; if (!chain.length) buildChain();
  const t = MM.now + 0.01; if (!MM.playing || p(i, 'mode') === 'groove') playObj(i, t, { dest: chain[i].lvl, len: 1 }); log(`${ROM[i]} · object ${L[k]} · ${list[k].type || '?'} (${list[k].desc})`); }
function etude() { const i = Math.floor(Math.random() * 4), what = MM.pick(['obj', 'obj', 'speed', 'mode', 'rot', 'rev', 'cut', 'src']); let msg = '';
  if (what === 'obj') { const v = Math.floor(Math.random() * st.nobj); MMX.setParam('p' + i + 'obj', v); msg = 'object ' + L[v]; }
  else if (what === 'speed') { const v = MM.clamp(p(i, 'speed') + MM.pick([-12, -7, -5, 5, 7, 12]), -24, 12); MMX.setParam('p' + i + 'speed', v); msg = 'speed ' + (v > 0 ? '+' : '') + v; }
  else if (what === 'mode') { const v = p(i, 'mode') === 'hit' ? 'groove' : 'hit'; MMX.setParam('p' + i + 'mode', v); msg = v === 'groove' ? 'closed groove' : 'hit'; }
  else if (what === 'rot') { const s = p(i, 'pat'), r = MM.pick([1, 2, 3, 5]); st['p' + i + 'pat'] = s.slice(-r) + s.slice(0, -r); msg = 'rhythm rotated ' + r; }
  else if (what === 'rev') { MMX.setParam('p' + i + 'rev', !p(i, 'rev')); msg = p(i, 'rev') ? 'reversed' : 'forwards'; }
  else if (what === 'cut') { const v = p(i, 'cut') ? 0 : MM.pick([20, 40, 80]); MMX.setParam('p' + i + 'cut', v); msg = v ? 'attack cut ' + v + ' ms' : 'attack restored'; }
  else { const v = (p(i, 'src') + 1) % 4; MMX.setParam('p' + i + 'src', v); msg = 'source ' + (st.acous ? '?' : 'ABCD'[v]); }
  log(`bar ${barN} · étude · turntable ${ROM[i]} → ${msg}`); }
function log(s) { MM.$('#log').textContent = s; }
/* reverse per turntable uses the slot's reverse, which every turntable on that source shares; so we keep it per turntable by reading reversed copies */
const revBufs = new WeakMap();
const _region = MMX.region;
/* ---------- drawing: Cassandre ---------- */
function drawHero() { hv.fit(); const g = hv.g, W = hv.w, H = hv.h, now = performance.now();
  const sky = g.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, '#0f1222'); sky.addColorStop(0.55, '#2b3150'); sky.addColorStop(0.62, '#e9d9b6'); sky.addColorStop(1, '#161a2b'); g.fillStyle = sky; g.fillRect(0, 0, W, H);
  const vx = W * 0.5, vy = H * 0.58; g.fillStyle = '#efe6d2'; g.beginPath(); for (let k = 0; k < 8; k++) { const a = (k * Math.PI) / 4, r = k % 2 ? 4 : 13; g.lineTo(vx + Math.cos(a) * r, vy - 26 + Math.sin(a) * r); } g.fill();
  g.strokeStyle = 'rgba(239,230,210,.75)'; g.lineWidth = 2; [-1, -0.35, 0.35, 1].forEach((u) => { g.beginPath(); g.moveTo(vx + u * 3, vy); g.lineTo(vx + u * W * 0.6, H); g.stroke(); });
  for (let k = 1; k < 14; k++) { const f = Math.pow(k / 14, 2.2), y = vy + (H - vy) * f + ((now / 40) % 1) * 0; g.globalAlpha = 0.35; g.beginPath(); g.moveTo(vx - W * 0.6 * f, y); g.lineTo(vx + W * 0.6 * f, y); g.stroke(); } g.globalAlpha = 1;
  g.fillStyle = '#efe6d2'; g.font = `400 ${Math.min(56, W / 10)}px 'Poiret One'`; g.textAlign = 'left'; g.fillText('SILLON FERMÉ', 18, 52); g.font = "600 10px 'Josefin Sans'"; g.globalAlpha = 0.7; g.fillText('MUSIQUE CONCRÈTE · CLOSED GROOVE · 4 PLATINES · ' + Math.round(MM.bpm) + ' BPM', 20, 72); g.globalAlpha = 1;
  const R = Math.min(W / 10.5, H * 0.2), y0 = H - R - 18, pins = [];
  P4.forEach((i) => { const x = W * (0.16 + i * 0.227); phase[i] += (MM.playing ? rateOf(i) : 0) * 0.05 * (p(i, 'rev') ? -1 : 1); const a = phase[i], lit = Math.max(0, 1 - (now - flash[i]) / 250);
    g.save(); g.translate(x, y0); g.fillStyle = '#161a2b'; g.beginPath(); g.arc(0, 0, R + 6, 0, 7); g.fill(); g.strokeStyle = lit > 0 ? `rgba(200,49,42,${0.4 + lit * 0.6})` : '#efe6d2'; g.lineWidth = 5; g.beginPath(); g.arc(0, 0, R, 0, 7); g.stroke();
    g.rotate(a); g.lineWidth = 2.5; g.strokeStyle = '#efe6d2'; for (let s = 0; s < 12; s++) { g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.cos((s * Math.PI) / 6) * R, Math.sin((s * Math.PI) / 6) * R); g.stroke(); }
    g.fillStyle = i === st.sel ? '#c8312a' : '#efe6d2'; g.beginPath(); g.arc(0, 0, R, Math.PI * 0.75, Math.PI * 1.25); g.arc(0, 0, R * 0.45, Math.PI * 1.25, Math.PI * 0.75, true); g.fill(); g.beginPath(); g.arc(0, 0, R * 0.16, 0, 7); g.fill(); g.restore();
    pins.push([x + Math.cos(a) * R * 0.6, y0 + Math.sin(a) * R * 0.6]);
    g.fillStyle = '#efe6d2'; g.font = "400 22px 'Poiret One'"; g.textAlign = 'center'; g.fillText(ROM[i], x, y0 - R - 14); g.font = "600 9px 'Josefin Sans'";
    const list = objects(p(i, 'src')), ob = list[Math.min(list.length - 1, p(i, 'obj'))]; g.fillText((st.acous ? '?' : 'ABCD'[p(i, 'src')]) + ' · ' + L[p(i, 'obj')] + ' ' + (ob ? ob.type : '') + (p(i, 'mode') === 'groove' ? ' · ∞' : ''), x, y0 + R + 15); });
  g.strokeStyle = '#c8312a'; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); pins.forEach(([x, y], k) => (k ? g.lineTo(x, y) : g.moveTo(x, y))); g.stroke(); pins.forEach(([x, y]) => { g.fillStyle = '#efe6d2'; g.beginPath(); g.arc(x, y, 4, 0, 7); g.fill(); }); g.lineCap = 'butt'; }
function drawStrip() { sv.fit(); const g = sv.g, W = sv.w, H = sv.h, i = st.sel, sIx = p(i, 'src'), list = objects(sIx), r = MMX.region(sIx), now = performance.now();
  g.fillStyle = '#efe6d2'; g.fillRect(0, 0, W, H); const n = list.length, bw = W / n;
  list.forEach((ob, k) => { const x = k * bw, on = k === p(i, 'obj'), au = k === auditionObj && now - auditionAt < 600; g.fillStyle = on ? '#161a2b' : k % 2 ? '#e4d8bd' : '#efe6d2'; g.fillRect(x, 0, bw, H); if (au) { g.fillStyle = 'rgba(200,49,42,.35)'; g.fillRect(x, 0, bw, H); }
    const col = on ? '#efe6d2' : '#161a2b'; g.fillStyle = col; g.strokeStyle = col;
    if (!st.acous) { const pk = ob.peaks, m = pk.length; g.globalAlpha = 0.8; for (let j = 0; j < m; j++) { const h = pk[j] * (H - 44); g.fillRect(x + 4 + (j / m) * (bw - 8), H - 10 - h, Math.max(1, (bw - 8) / m - 0.5), h); } g.globalAlpha = 1; }
    else { g.globalAlpha = 0.5; g.beginPath(); g.arc(x + bw / 2, H * 0.62, Math.min(bw, H) * 0.22, 0, 7); g.stroke(); g.globalAlpha = 1; }
    g.font = "400 24px 'Poiret One'"; g.textAlign = 'left'; g.fillText(L[k], x + 6, 24); g.font = "700 12px 'Josefin Sans'"; g.fillText(ob.type, x + 26, 22); g.font = "600 8px 'Josefin Sans'"; g.fillText(ob.desc.toUpperCase(), x + 6, 36); if (!st.acous) g.fillText(((ob.z - ob.a) * 1000).toFixed(0) + ' MS', x + bw - 40, 22); });
  g.fillStyle = '#c8312a'; g.font = "700 9px 'Josefin Sans'"; g.textAlign = 'right'; g.fillText('TURNTABLE ' + ROM[i] + ' · ' + (st.acous ? 'ACOUSMATIC: SOURCE HIDDEN' : SRC[sIx].toUpperCase() + ' · ' + MMX.S.slots[sIx].name), W - 6, H - 2); g.textAlign = 'left'; }
function drawGrids() { MM.$$('.pl').forEach((el, i) => { const c = el._cv; c.fit(); const g = c.g, W = c.w, H = c.h, pat = p(i, 'pat'), w = W / 16; for (let k = 0; k < 16; k++) { const on = pat[k] === 'x'; g.fillStyle = k === stepNow && MM.playing ? '#c8312a' : on ? '#161a2b' : k % 4 === 0 ? '#ddd1b5' : '#ebe2cc'; g.fillRect(k * w + 1, 1, w - 2, H - 2); if (on && k === stepNow && MM.playing) { g.fillStyle = '#efe6d2'; g.fillRect(k * w + w / 2 - 2, H / 2 - 2, 4, 4); } } el.classList.toggle('sel', i === st.sel); }); }
function draw() { drawHero(); drawStrip(); drawGrids(); }
const cfg = { bpm: 92, div: 4, swing: 0.08, step, draw, start: () => { if (!chain.length) buildChain(); barN = 0; log('Étude · press 1 to 8 to hear objects · G closed groove · A acousmatic'); }, stop: stopAll, ownL: false,
  onSamples: (list) => MMX.assign(list),
  key: (e) => { if (MMX.key(e)) return; const k = e.key, i = st.sel;
    if (k >= '1' && k <= '8') audition(+k - 1); else if (k === 'Tab') { e.preventDefault(); MMX.setParam('sel', (i + 1) % 4); } else if (k === 'g' || k === 'G') MMX.setParam('p' + i + 'mode', p(i, 'mode') === 'groove' ? 'hit' : 'groove');
    else if (k === 'v' || k === 'V') MMX.setParam('p' + i + 'rev', !p(i, 'rev')); else if (k === 'a' || k === 'A') MMX.setParam('acous', !st.acous); else if (k === 'u' || k === 'U') MMX.setParam('etude', !st.etude);
    else if (k === 'ArrowUp') { e.preventDefault(); MMX.setParam('p' + i + 'speed', Math.min(24, p(i, 'speed') + 1)); } else if (k === 'ArrowDown') { e.preventDefault(); MMX.setParam('p' + i + 'speed', Math.max(-24, p(i, 'speed') - 1)); } else if (k === 'x' || k === 'X') MMX.setParam('p' + i + 'cut', p(i, 'cut') ? 0 : 60); },
  setup() {
    MM.fb.railway = railway(); MM.fb.cloche = cloche();
    MMX.init({ state: st, slots: [{ label: 'Source A (railway)', kind: 'railway', rv: 0.05 }, { label: 'Source B (bell)', kind: 'cloche', rv: 0.1 }, { label: 'Source C (voice)', kind: 'voice' }, { label: 'Source D (tone)', kind: 'tone' }],
      onSlot: () => P4.forEach((i) => grooves[i] && (grooves[i].sig = 'x')), factory: fac(), extra: null,
      keys: [['1 to 8', 'hear object A to H and give it to the selected turntable'], ['Tab', 'next turntable'], ['G', 'closed groove on / off'], ['V', 'reverse the turntable'], ['X', 'attack cut (cut bell) on / off'], ['↑ ↓', 'turntable speed'], ['A', 'acousmatic listening'], ['U', 'automatic étude']],
      midiHelp: 'MIDI note → object (note number mod 8) on the selected turntable, played at that pitch (C4 = original speed). Velocity scales level.',
      midi: (n, v, on) => { if (!on) return; if (!chain.length) buildChain(); const i = st.sel, k = n % 8; MMX.setParam('p' + i + 'obj', Math.min(k, st.nobj - 1)); playObj(i, MM.now + 0.005, { rate: Math.pow(2, (n - 60) / 12), dest: chain[i].lvl, len: 1 }); } });
    const G = MM.$('#glob');
    MMX.ctl(G, 'bpm', { label: 'Tempo', min: 50, max: 180, step: 1, on: (v) => (MM.bpm = v) }); MMX.ctl(G, 'swing', { label: 'Swing', min: 0, max: 0.5, on: (v) => (cfg.swing = v) });
    MMX.ctl(G, 'nobj', { label: 'Objects', min: 4, max: 8, step: 1 }); MMX.ctl(G, 'cutmode', { type: 'select', label: 'Cut at', options: [['onsets', 'onsets'], ['equal', 'equal parts']] });
    MMX.ctl(G, 'relief', { label: 'Relief', min: 0, max: 1, hint: 'Spatial movement, after the pupitre d\'espace (1951)' }); MMX.ctl(G, 'verb', { label: 'Space', min: 0, max: 1 });
    MMX.ctl(G, 'acous', { type: 'check', label: 'Acousmatic', on: (v) => MM.$('#bAcous') && MM.$('#bAcous').classList.toggle('on', v) }); MMX.ctl(G, 'etude', { type: 'check', label: 'Auto étude', on: (v) => MM.$('#bEtude') && MM.$('#bEtude').classList.toggle('on', v) });
    MMX.ctl(null, 'sel', { label: 'sel', min: 0, max: 3, step: 1 });
    const PL = MM.$('#pls'), so = SRC.map((s, k) => [k, s]), oo = [...L].map((c, k) => [k, c]);
    P4.forEach((i) => { const el = MM.h('div', { class: 'pl' }), hd = MM.h('div', { class: 'hd' }, MM.h('b', {}, ROM[i]), MM.h('span', {}, 'Platine ' + ROM[i])), cvs = MM.h('canvas', {}), cg = MM.h('div', { class: 'cg' }); el.append(hd, cvs, cg); PL.append(el);
      hd.onclick = () => MMX.setParam('sel', i); el._cv = MM.canvas(cvs);
      cvs.addEventListener('pointerdown', (e) => { MMX.setParam('sel', i); const r = cvs.getBoundingClientRect(), k = Math.floor(((e.clientX - r.left) / r.width) * 16), a = [...p(i, 'pat')]; a[k] = a[k] === 'x' ? '.' : 'x'; st['p' + i + 'pat'] = a.join(''); });
      MMX.ctl(cg, `p${i}src`, { type: 'select', label: 'Source', options: so }); MMX.ctl(cg, `p${i}obj`, { type: 'select', label: 'Object', options: oo }); MMX.ctl(cg, `p${i}mode`, { type: 'select', label: 'Mode', options: [['hit', 'hit'], ['groove', 'closed groove']] });
      MMX.ctl(cg, `p${i}speed`, { label: 'Speed', min: -24, max: 24, step: 1, fmt: (v) => (v > 0 ? '+' : '') + v }); MMX.ctl(cg, `p${i}cut`, { label: 'Attack cut', min: 0, max: 200, step: 1, fmt: (v) => v + 'ms' }); MMX.ctl(cg, `p${i}len`, { label: 'Length', min: 0.05, max: 1, step: 0.01 });
      MMX.ctl(cg, `p${i}lvl`, { label: 'Level', min: 0, max: 1 }); MMX.ctl(cg, `p${i}pan`, { label: 'Pan', min: -1, max: 1 }); MMX.ctl(cg, `p${i}tone`, { label: 'Tone', min: 200, max: 18000, step: 10, fmt: (v) => (v >= 1000 ? (v / 1000).toFixed(1) + 'k' : v) });
      MMX.ctl(cg, `p${i}rv`, { label: 'Space', min: 0, max: 1 }); MMX.ctl(cg, `p${i}rev`, { type: 'check', label: 'Reverse' }); });
    MM.$('#bAcous').onclick = () => MMX.setParam('acous', !st.acous); MM.$('#bEtude').onclick = () => MMX.setParam('etude', !st.etude); MM.$('#bRecut').onclick = () => { MMX.setParam('cutmode', st.cutmode === 'onsets' ? 'equal' : 'onsets'); log('Re-cut at ' + st.cutmode); };
    MM.$('#strip').addEventListener('pointerdown', (e) => { const r = MM.$('#strip').getBoundingClientRect(), n = objects(p(st.sel, 'src')).length; audition(Math.floor(((e.clientX - r.left) / r.width) * n)); });
  } };
/* per-turntable reverse: wrap region so a reversed turntable reads a reversed copy of its source */
let revCtx = -1;
MMX.region = function (s) { const r = _region(s); if (revCtx < 0 || !p(revCtx, 'rev')) return r; let rb = revBufs.get(r.b); if (!rb) { const b = r.b, c = MM.ctx.createBuffer(b.numberOfChannels, b.length, b.sampleRate); for (let k = 0; k < b.numberOfChannels; k++) { const src = b.getChannelData(k), d = c.getChannelData(k); for (let j = 0, n = src.length; j < n; j++) d[j] = src[n - 1 - j]; } rb = c; revBufs.set(r.b, rb); } const D = r.b.duration; return { a: D - r.z, z: D - r.a, len: r.len, b: rb }; };
const _objects = objects;
objects = function (s) { const prev = revCtx; revCtx = -1; const o = _objects(s); revCtx = prev; return o; };
const _playObj = playObj;
playObj = function (i, t, o = {}) { if (!p(i, 'rev')) return _playObj(i, t, o); const sIx = o.src ?? p(i, 'src'), list = objects(sIx), ob = list[Math.min(list.length - 1, o.obj ?? p(i, 'obj'))]; if (!ob) return null; revCtx = i; const r = MMX.region(sIx); revCtx = -1; const D = r.b.duration, s = MMX.S.slots[sIx];
  const cut = (o.cut ?? p(i, 'cut')) / 1000, ra = D - ob.z, rz = D - ob.a, a = Math.min(rz - 0.01, ra + cut), rate = o.rate ?? rateOf(i), len = (rz - a) * (o.len ?? p(i, 'len')), dest = o.dest || chain[i].gate; flash[i] = performance.now();
  if (o.loop) return MM.play(r.b, t, { offset: a, rate, dur: 36000, gain: s.gain * 0.9, loop: true, loopStart: a, loopEnd: a + Math.max(0.02, len), dest, fadeIn: 0.01 });
  return MM.play(r.b, t, { offset: a, rate, dur: Math.max(0.02, len / rate), gain: s.gain * 0.9, dest, fadeIn: cut > 0 ? 0.015 : 0.004, fadeOut: Math.min(0.03, len / rate / 4) }); };
function fac() { const base = JSON.parse(JSON.stringify(st)), F = (o) => ({ full: { params: Object.assign({}, base, o), extra: null } });
  return { 'Étude aux chemins de fer (default)': {}, 'Four closed grooves': F({ p0mode: 'groove', p0pat: 'xxxxxxxx....xxxx', p1obj: 5, p1speed: -12, p2mode: 'groove', p2cut: 80, p2pat: 'x.x.x.x.x.x.x.x.', p3mode: 'groove', p3obj: 6, p3pat: '..xx..xx..xx..xx', relief: 0.6 }),
    'Cut bell': F({ p0src: 1, p0obj: 0, p0cut: 60, p0mode: 'groove', p0pat: 'xxxxxxxxxxxxxxxx', p0lvl: 0.5, p1src: 1, p1obj: 0, p1cut: 0, p1mode: 'hit', p1speed: -12, p1pat: 'x...............', p2src: 1, p2cut: 120, p2speed: 7, p2pat: '..x...x...x...x.', p3src: 0, p3obj: 1, p3pat: 'x..x..x..x..x.x.', bpm: 72 }),
    'Acousmatic listening': F({ acous: true, etude: true, cutmode: 'equal', relief: 0.5 }), 'Automatic étude': F({ etude: true, relief: 0.45, verb: 0.35, swing: 0.15 }) }; }
/* ---------- built-in sources (C4 reference where pitched) ---------- */
function railway() { const ctx = MM.ctx, sr = ctx.sampleRate, D = 4.6, B = ctx.createBuffer(2, Math.floor(sr * D), sr), L0 = B.getChannelData(0), R0 = B.getChannelData(1); let lp = 0, bp1 = 0, bp2 = 0;
  const add = (i, v, pan = 0) => { if (i >= 0 && i < L0.length) { L0[i] += v * (1 - pan) * 0.7; R0[i] += v * (1 + pan) * 0.7; } };
  for (let k = 0, t = 0.02; t < 1.7; k++) { const gap = 0.36 - k * 0.012, s0 = Math.floor(t * sr), n = Math.floor(sr * 0.18); for (let j = 0; j < n; j++) { const w = Math.random() * 2 - 1; lp += (w - lp) * 0.08; add(s0 + j, lp * 2.2 * Math.exp(-j / sr / 0.05) * Math.min(1, j / 60), -0.2); } t += gap; }
  [1.75, 1.88, 2.55, 2.68].forEach((t) => { const s0 = Math.floor(t * sr); for (let j = 0; j < sr * 0.09; j++) { const tt = j / sr; add(s0 + j, (Math.sin(2 * Math.PI * 820 * tt) * 0.6 + Math.sin(2 * Math.PI * 1930 * tt) * 0.3 + (Math.random() * 2 - 1) * 0.5) * Math.exp(-tt / 0.018), 0.3); } });
  { const s0 = Math.floor(2.9 * sr), n = Math.floor(sr * 1.0); for (let j = 0; j < n; j++) { const tt = j / sr, env = Math.min(1, tt / 0.06) * Math.min(1, (1 - tt) / 0.2), vib = 1 + 0.006 * Math.sin(2 * Math.PI * 5.5 * tt), w = Math.random() * 2 - 1; bp1 += (w - bp1) * 0.3; add(s0 + j, env * (0.32 * Math.sin(2 * Math.PI * 659 * vib * tt) + 0.26 * Math.sin(2 * Math.PI * 784 * vib * tt) + 0.1 * Math.sin(2 * Math.PI * 1318 * vib * tt) + 0.05 * bp1), 0); } }
  { const s0 = Math.floor(4.0 * sr), n = Math.floor(sr * 0.58); for (let j = 0; j < n; j++) { const tt = j / sr, w = Math.random() * 2 - 1; bp2 += (w - bp2) * 0.5; add(s0 + j, (w - bp2) * 0.5 * Math.min(1, tt / 0.03) * Math.exp(-tt / 0.25), 0.1); } }
  return B; }
function cloche() { const ctx = MM.ctx, sr = ctx.sampleRate, B = ctx.createBuffer(1, Math.floor(sr * 3.2), sr), d = B.getChannelData(0), f = MM.mtof(60), parts = [[0.5, 0.5, 1.4], [1, 0.6, 1.0], [1.19, 0.35, 0.8], [1.5, 0.35, 0.7], [2, 0.3, 0.5], [2.52, 0.25, 0.35], [2.67, 0.2, 0.3], [3.01, 0.15, 0.25], [4.1, 0.15, 0.12], [5.4, 0.12, 0.07]];
  for (let i = 0; i < d.length; i++) { const t = i / sr; let s = 0; parts.forEach(([m, a, dc]) => (s += a * Math.sin(2 * Math.PI * f * m * t) * Math.exp(-t / dc))); d[i] = (s * 0.45 + (Math.random() * 2 - 1) * 0.6 * Math.exp(-t / 0.006)) * Math.min(1, t * 2000); } return B; }
MM.init(cfg);
