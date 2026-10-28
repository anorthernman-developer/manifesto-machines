/*META
{"title":"Live Live","deep":true,"category":"Fred","date":"2026-10-28","kicker":"WHAT WOULD FRED AGAIN.. DO?",
"idea":"Play a whole set from one pad sampler, the way Fred again.. did at Boiler Room London in 2022: sixteen pads in four banks (one phrase chopped or re-pitched into a melody, drums, chords, effects), a pattern recorder to build the track live from scratch, a CDJ deck underneath, and a held build that drops after a beat of silence.",
"controls":"7 slots (phrase, keys, kick, clap, hats, CDJ track, field); 4 banks of 16 pads with per-pad pitch, gain, length and pan; phrase chopped at word onsets or equally, or one chop re-pitched across the pads in any key and scale; choke; note repeat (1/8, 1/16, 1/32); quantised overdub pattern recorder (1, 2 or 4 bars) with an editable roll; 4 grooves (house, UK garage 2-step, breakbeat, half-time) with swing and sidechain pump; CDJ deck that locks a loop to tempo, with stop and tape stop; hold-to-build with snare roll, riser and high-pass, gap and drop; FROM SCRATCH autopilot that adds layers in order; MIDI pads on notes 36 to 51.",
"how":"Press PLAY: a groove is already recorded, so you hear chops, chords and drums straight away. Hit the pads with the mouse or the keys 1 2 3 4 / Q W E T / A S F G / Z X C V. [ and ] (or the tabs) switch bank: A VOX CHOPS, B DRUMS, C CHORDS, D FX + PERFORM. Press K to arm the pattern recorder: whatever you play is quantised into the loop, and you can click the roll underneath to add or remove hits. Hold N while holding a pad for note repeat. Hold B (or the BUILD button) for a build, and let go: one beat of silence, then the drop. J starts and stops the CDJ deck. Turn on FROM SCRATCH and the set builds itself up layer by layer, drone first. Open the DECK (D) for your own phrase, drums, keys, a track for the CDJ and a field recording.",
"fonts":"family=Big+Shoulders+Display:wght@700;900&family=Space+Mono:wght@400;700","bpm":128,
"try":["Record yourself (or a friend, with permission) saying one sentence on your phone, load it into PHRASE, set PADS to ONE CHOP, RE-PITCHED and choose the chop with the best vowel. Now the sixteen pads play that one sound as a melody in key, which is how a single line becomes a whole track.","Load a full loop or track from your Splice folder into the CDJ slot, set CDJ BARS to its length so it locks to the tempo and press J. Finger-drum bank B over it, then press J again to stop it and keep the room going on the pads alone.","Clear every bank (Backspace on each), arm the recorder with K and build the track from nothing, one bank at a time: chords first, then the voice, then hats, kick and clap. Hold B for four bars and let go for the drop."],
"manifesto":{"name":"What would Fred again.. do? Play it live live: the Boiler Room pad set","short":"Fred again.. live","author":"Fred again.. (Fred Gibson, b. 1993, London)","year":"2022","where":"Boiler Room London (broadcast 29 July 2022), played on a Native Instruments Maschine+ with three Pioneer CDJs and a DJM mixer; and his 2022 Apple Music interview with Zane Lowe, where he showed how he plays the set (reported by MusicTech)",
"ideas":["The whole set can come from one pad sampler. He told Zane Lowe he wanted his live show to come from the Maschine, and on Boiler Room every pad he hits fires a vocal, a drum, a chord or an effect over the tracks on the CDJs.","Play a track as if you are making it from scratch. Demonstrating 'I Found You', he started with layers of drones and then brought in re-pitched pieces of its spoken-word sample.","One phrase can carry a song. A spoken or sung line, cut up and re-pitched across the pads, becomes the hook and the melody.","Tension and release: filters, rolls and risers build up, a moment of silence holds it, and the drop lets it go. The Boiler Room set is remembered for these moments, and for him keeping the room moving when a dancer accidentally pressed stop on a CDJ.","Electronic music played live, not just pressed play on. Fingers on pads, mistakes and all."],
"quotes":[["You can play anything on it, like, it's so infinitely powerful","Fred again.. on the Maschine+, Apple Music with Zane Lowe, 2022 (as reported by MusicTech)"],["with electronic music, it's often almost impossible to get it 'live live.'","Fred again.., same interview"],["the whole [set] to come from [the Maschine]","Fred again.., same interview (MusicTech's brackets)"]],
"system":"Four banks of sixteen pads, like a pad sampler. Bank A is your phrase (slot 1), cut into chops at its word onsets or into equal slices, or one chop re-pitched to sixteen notes of the key. Bank B is a drum kit built from the kick, clap and hat slots, with a sub bass. Bank C holds chords in the key, played on the keys slot. Bank D is for performing: risers, impacts, reverse vocals, throws, tape stop, filter moves, a gap, a drop and the CDJ. A quantised pattern recorder loops whatever you play, so a set can start empty and be built in front of people. The CDJ deck locks a loop (slot 6) to the tempo. BUILD automates a high-pass filter, a snare roll and a riser and mutes the kick; on release, the beat stops for one beat and comes back with an impact. FROM SCRATCH adds the layers in order (drone, voice, hats, build, drop, break). Which pad holds which sound in his real set isn't documented: the bank layout here is our interpretation."},
"design":{"name":"Barney Bubbles","short":"Barney Bubbles","who":"Barney Bubbles (Colin Fulcher, 1942 to 1983), British designer for Stiff and Radar Records, Hawkwind, Ian Dury and Elvis Costello, who rarely signed his work","era":"London, late 1960s to 1983",
"hallmarks":["Modernism as a toybox: he borrowed from Kandinsky, Russian Constructivism, the Bauhaus and pop art and made it playful. Here the pads are geometric shapes in primary colours.","Many versions of one thing: Ian Dury's 'Do It Yourself' came in many different wallpaper-pattern sleeves. Here each bank has its own pattern and colourway.","Hidden jokes, codes and symbols, tightly condensed type and a lot of nerve. Look for the small marks around the pads."],
"works":["Ian Dury and the Blockheads, 'Do It Yourself' (1979)","Elvis Costello and the Attractions, 'Armed Forces' (1979)","Hawkwind, 'Space Ritual' (1973); and Paul Gorman's book 'Reasons to be Cheerful: The Life and Work of Barney Bubbles' (2008)"]}}
*/
/*CSS
:root{--bg:#f3ecdc;--fg:#141414;--acc:#e4002b;--yel:#ffd100;--blu:#0057b8;--grn:#00a651;--bar-bg:#141414;--bar-fg:#f3ecdc;--bar-font:'Space Mono',ui-monospace,monospace;--learn-font:'Space Mono',ui-monospace,monospace;--learn-bg:#f3ecdc}
#mm-stage{display:grid;grid-template-columns:400px minmax(0,1fr) 300px;grid-template-rows:64px minmax(0,1fr) 176px;font-family:'Space Mono',monospace}
#hd{grid-column:1/3;display:flex;align-items:center;gap:14px;padding:0 16px;border-bottom:4px solid var(--fg);overflow:hidden}
#hd .t{font:900 46px/1 'Big Shoulders Display',Impact,sans-serif;letter-spacing:-.01em;text-transform:uppercase}#hd .t i{font-style:normal;color:var(--acc)}#hd .t b{display:inline-block;background:var(--yel);padding:0 6px;transform:rotate(-3deg)}
#hd .s{font:700 11px 'Space Mono';max-width:420px;line-height:1.25}
#left{grid-row:2;padding:10px 12px;display:flex;flex-direction:column;gap:8px;border-right:4px solid var(--fg)}
#banks{display:grid;grid-template-columns:repeat(4,1fr);gap:4px}#banks button{font:900 18px 'Big Shoulders Display';border:3px solid var(--fg);background:var(--bg);cursor:pointer;padding:3px 0;position:relative}#banks button.on{background:var(--fg);color:var(--bg)}#banks button.mut{text-decoration:line-through;opacity:.5}
#pads{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;flex:1;min-height:0}
.pad{position:relative;border:3px solid var(--fg);background:#fff;cursor:pointer;overflow:hidden;font:700 9px 'Space Mono';text-align:left;padding:4px;color:var(--fg);user-select:none;transition:transform .05s}
.pad::before{content:'';position:absolute;inset:18% 18% 10% 18%;background:var(--c);opacity:.9}
.pad.s0::before{border-radius:50%}.pad.s1::before{clip-path:polygon(50% 0,100% 100%,0 100%)}.pad.s2::before{border-radius:100% 100% 0 0;inset:30% 12% 10% 12%}.pad.s3::before{background:repeating-linear-gradient(90deg,var(--c) 0 6px,transparent 6px 12px)}
.pad span{position:relative;z-index:1;background:#fff;padding:0 2px}.pad kbd{position:absolute;right:3px;bottom:3px;z-index:1;font:700 9px 'Space Mono';border:1.5px solid var(--fg);background:var(--bg);padding:0 3px}
.pad.sel{outline:4px solid var(--acc);outline-offset:-7px}.pad.hit{transform:scale(.94);background:var(--fg)}.pad.hit::before{opacity:1;filter:brightness(1.3)}.pad.has::after{content:'●';position:absolute;left:4px;bottom:2px;font-size:10px;color:var(--acc);z-index:1}
#perf{display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;gap:4px}#perf button{font:900 15px 'Big Shoulders Display';letter-spacing:.04em;border:3px solid var(--fg);background:var(--yel);cursor:pointer;padding:5px 0}#perf button.on{background:var(--acc);color:#fff}#perf #bBuild{background:var(--acc);color:#fff}
#viz{grid-row:2;grid-column:2;position:relative}#cv{position:absolute;inset:0;width:100%;height:100%}
#rollw{grid-row:3;grid-column:1/3;border-top:4px solid var(--fg);position:relative;background:#fff}#roll{position:absolute;inset:0;width:100%;height:100%;cursor:crosshair}
#side{grid-row:1/4;grid-column:3;overflow:auto;padding:10px 12px;border-left:4px solid var(--fg);background:var(--bg);display:flex;flex-direction:column;gap:5px}
#side h3{font:900 17px 'Big Shoulders Display';letter-spacing:.06em;margin:8px 0 2px;display:flex;align-items:center;gap:6px}#side h3::before{content:'';width:12px;height:12px;background:var(--c,var(--acc));display:inline-block}#side h3:nth-of-type(2){--c:var(--yel)}#side h3:nth-of-type(3){--c:var(--blu);border-radius:0}#side h3:nth-of-type(4){--c:var(--grn)}
#side .mmx-ctl{grid-template-columns:96px 1fr 40px;font:700 10px 'Space Mono'}#side .mmx-ctl select{grid-column:2/4;min-width:0}
#insp{border:3px solid var(--fg);padding:6px;background:#fff;font:700 10px 'Space Mono'}#insp .r{display:grid;grid-template-columns:52px 1fr 40px;gap:4px;align-items:center}#insp input{width:100%;accent-color:var(--acc)}
#mm-learn-dlg{box-shadow:12px 12px 0 var(--yel),24px 24px 0 var(--blu);border-width:4px}#mm-learn-dlg h2{font:900 34px/1 'Big Shoulders Display';text-transform:uppercase}
*/
/*HTML
<div id="hd"><div class="t">LIVE <i>LIVE</i> <b>16 PADS</b></div><div class="s">One pad sampler, a whole set. Hit pads, record them into the loop, hold BUILD, let go for the drop.</div></div>
<div id="left"><div id="banks"></div><div id="pads"></div><div id="perf"><button id="bBuild" title="hold B">HOLD BUILD</button><button id="bArm" title="K">REC PAT</button><button id="bRep" title="hold N">REPEAT</button><button id="bCdj" title="J">CDJ</button></div></div>
<div id="viz"><canvas id="cv"></canvas></div>
<div id="rollw"><canvas id="roll"></canvas></div>
<div id="side"><h3>SET</h3><div id="s1"></div><h3>PADS</h3><div id="insp"></div><div id="s2"></div><h3>GROOVE</h3><div id="s3"></div><h3>CDJ + BUILD</h3><div id="s4"></div></div>
*/
const st = MMX.bind({ bpm: 128, bars: 4, swing: 0.1, groove: 'house', root: 9, scale: 'minor', vmode: 'chops', chopMode: 'onsets', keyChop: 2, gate: 1, choke: true, vox: 0.9, chordsLvl: 0.55, bass: 0.5, drums: 0.85, pump: 0.55, rep: 1, quant: 1, track: 0.7, trackOn: false, trackBars: 2, fit: true, buildBeats: 8, gap: true, auto: false, autoBars: 4, echo: 0.3 });
const BANKS = ['A', 'B', 'C', 'D'], BNAME = { A: 'VOX CHOPS', B: 'DRUMS', C: 'CHORDS', D: 'FX + PERFORM' };
const DRUMN = ['KICK', 'KICK LOW', 'CLAP', 'SNARE', 'HAT', 'OPEN HAT', 'RIM', 'SHAKER', 'SUB ROOT', 'SUB 5TH', 'TOM LOW', 'TOM HIGH', 'REV CYMBAL', 'CLAP ROLL', 'PERC', 'VOX STAB'];
const FXN = ['RISER', 'DOWNLIFTER', 'IMPACT', 'REVERSE VOX', 'TAPE STOP', 'VOX THROW', 'FIELD', 'SIREN', 'SWEEP DOWN', 'STUTTER', 'FILTER CLOSE', 'FILTER OPEN', 'GAP', 'DROP', 'CDJ ON/OFF', 'STRIP DRUMS'];
const PADKEYS = ['1', '2', '3', '4', 'q', 'w', 'e', 't', 'a', 's', 'f', 'g', 'z', 'x', 'c', 'v'];
const COLS = ['#e4002b', '#ffd100', '#0057b8', '#00a651', '#141414', '#ff6c0c', '#f4a7c3', '#6d2077'];
const NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
const STAGES = ['DRONE', 'VOICE', 'HATS', 'BUILD', 'DROP', 'DROP', 'BREAK'];
let pats = {}, pcfg = {}, mute = { A: false, B: false, C: false, D: false }, bank = 'A', sel = 0, armed = false, held = new Set(), repeatOn = false, chopPts = [0], skip = new Set(), log = [], lastIdx = -1;
let phase = 'normal', buildT0 = 0, gapFrom = -1, dropIdx = -1, dropShow = 0, stage = 0, stageBar = 0, lastVox = { k: 0, semis: 0 }, voxH = null, track = null, trackSync = false, curChop = -1, curChopT = 0, revCache = null, cfg;
let drumIn, musicIn, pumpG, trackG, fxIn, hp, lp, master;
const blank = () => Array.from({ length: 64 }, () => []), L = () => st.bars * 16, spb = () => 60 / st.bpm;
BANKS.forEach((b) => { pats[b] = blank(); pcfg[b] = Array.from({ length: 16 }, () => ({ p: 0, g: 1, len: b === 'C' ? 4 : 1, pan: 0 })); });
function buses() { const c = MM.ctx; master = c.createGain(); hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 20; lp = c.createBiquadFilter(); lp.frequency.value = 20000; master.connect(hp); hp.connect(lp); lp.connect(MM.out);
  drumIn = c.createGain(); drumIn.connect(master); musicIn = c.createGain(); pumpG = c.createGain(); musicIn.connect(pumpG); pumpG.connect(master); trackG = c.createGain(); trackG.gain.value = st.track; trackG.connect(master); fxIn = c.createGain(); fxIn.connect(MM.out); }
/* ---------- the phrase: chops ---------- */
function rechop() { const s = MMX.S.slots[0]; if (!s) return; const b = MMX.buf(0), { a, len } = MMX.region(0); let pts;
  if (st.chopMode === 'onsets') { pts = MM.onsets(b, 40).filter((x) => x >= a && x < a + len - 0.04).map((x) => (x - a) / len); if (!pts.length || pts[0] > 0.02) pts.unshift(0); }
  if (!pts || pts.length < 4) pts = Array.from({ length: 16 }, (_, k) => k / 16);
  chopPts = pts.slice(0, 16); padLabels(); }
function chopSpan(k) { const n = chopPts.length, i = ((k % n) + n) % n; return [chopPts[i], i + 1 < n ? chopPts[i + 1] : 1]; }
function scaleSemis(i) { const S = MM.SCALES[st.scale], n = S.length, r = st.root > 6 ? st.root - 12 : st.root; return r + S[i % n] + 12 * Math.floor(i / n) - 12; }
function vox(i, t, vel) { const c = pcfg.A[i], keys = st.vmode === 'keys', k = keys ? st.keyChop : i, semis = (keys ? scaleSemis(i) : 0) + c.p, [x0, x1] = chopSpan(k), { len } = MMX.region(0), rate = Math.pow(2, (MMX.S.slots[0].pitch + semis) / 12);
  const dur = Math.max(0.04, (x1 - x0) * len * c.len * st.gate / rate);
  if (st.choke && voxH) voxH.stop(t); voxH = MMX.fire(0, t, { pos: x0, semis, dur, gain: vel * c.g * st.vox, pan: c.pan, dest: musicIn, fadeOut: 0.02 }); lastVox = { k, semis, x0, dur };
  setTimeout(() => { curChop = k; curChopT = performance.now(); }, Math.max(0, (t - MM.now) * 1000)); }
/* ---------- drums ---------- */
function drum(i, t, vel) { const c = pcfg.B[i], g = vel * c.g * st.drums, o = (x) => Object.assign({ dest: drumIn, pan: c.pan, semis: c.p }, x), sd = spb() / 4;
  switch (i) {
    case 0: case 1: MMX.fire(2, t, o({ gain: g * (i ? 0.9 : 1.1), semis: c.p + (i ? -3 : 0), dur: 0.45 * c.len })); pump(t); break;
    case 2: MMX.fire(3, t, o({ gain: g * 0.9, dur: 0.3 * c.len })); break;
    case 3: MMX.fire(3, t, o({ gain: g * 0.8, semis: c.p + 4, dur: 0.18 * c.len })); break;
    case 4: MMX.fire(4, t, o({ gain: g * 0.55, dur: 0.05 * c.len })); break;
    case 5: MMX.fire(4, t, o({ gain: g * 0.5, semis: c.p - 2, dur: 0.38 * c.len })); break;
    case 6: MMX.fire(3, t, o({ gain: g * 0.5, semis: c.p + 12, dur: 0.05 * c.len })); break;
    case 7: MMX.fire(4, t, o({ gain: g * 0.3, semis: c.p + 5, dur: 0.035 * c.len, pan: c.pan + 0.3 })); break;
    case 8: case 9: { const m = 36 + (st.root > 6 ? st.root - 12 : st.root) + (i === 9 ? 7 : 0) + c.p; MM.tone(MM.mtof(m), t, sd * 2 * c.len, { type: 'sine', gain: 0.3 * g * st.bass * 2, release: 0.05, dest: musicIn }); break; }
    case 10: case 11: MMX.fire(2, t, o({ gain: g * 0.7, semis: c.p + (i === 10 ? 7 : 12), dur: 0.3 * c.len, pan: i === 10 ? -0.4 : 0.4 })); break;
    case 12: MM.noise(t, spb() * 2 * c.len, { freq: 7000, type: 'highpass', gain: 0.002, dest: drumIn, attack: spb() * 2 * c.len * 0.95 }); MM.noise(t, spb() * 2 * c.len + 0.05, { freq: 9000, type: 'highpass', gain: 0.09 * g, attack: spb() * 2 * c.len, dest: drumIn, send: { rev: 0.3 } }); break;
    case 13: for (let k = 0; k < 3; k++) MMX.fire(3, t + k * sd / 2, o({ gain: g * (0.5 + k * 0.2), dur: 0.12 })); break;
    case 14: MMX.fire(4, t, o({ gain: g * 0.5, semis: c.p - 12, dur: 0.12 * c.len })); break;
    case 15: { const [x0, x1] = chopSpan(0), { len } = MMX.region(0); MMX.fire(0, t, { pos: x0, semis: c.p + 12, dur: Math.min(0.2, (x1 - x0) * len) * c.len, gain: g * 0.7, dest: musicIn, rev: 0.3 }); break; } } }
function pump(t) { if (st.pump < 0.01) return; const g = pumpG.gain; g.cancelScheduledValues(t); g.setValueAtTime(1 - st.pump * 0.85, t); g.linearRampToValueAtTime(1, t + Math.min(0.3, spb() * 0.7)); }
/* ---------- chords ---------- */
function chordNotes(i) { const S = MM.SCALES[st.scale], n = S.length, r = 48 + (st.root > 6 ? st.root - 12 : st.root), dm = (d) => r + 12 * Math.floor(d / n) + S[((d % n) + n) % n];
  if (i < 7) return [dm(i), dm(i + 2), dm(i + 4)]; if (i < 14) return [dm(i - 7), dm(i - 5), dm(i - 3), dm(i - 1)]; if (i === 14) return [dm(0), dm(1), dm(4)]; return [dm(0), dm(4), dm(7)]; }
function chordName(i) { const ns = chordNotes(i), root = NOTES[ns[0] % 12], q = ns[1] - ns[0] === 3 ? 'm' : ns[1] - ns[0] === 4 ? '' : ns[1] - ns[0] === 2 ? 'sus2' : ''; return root + (i === 15 ? '5' : q) + (i >= 7 && i < 14 ? '7' : ''); }
function chord(i, t, vel) { const c = pcfg.C[i], ns = chordNotes(i), dur = spb() * c.len, { len } = MMX.region(1), g = vel * c.g * st.chordsLvl;
  ns.forEach((m, k) => { const rate = MM.mtof(m + c.p) / MM.mtof(48); MMX.fire(1, t + k * 0.006, { rate, dur, gain: g * 0.42, pan: c.pan + (k - 1.5) * 0.22, dest: musicIn, fadeIn: 0.01, fadeOut: Math.min(0.4, dur * 0.3), loop: dur > (len / rate) * 0.95 }); });
  if (st.bass > 0.01) MM.tone(MM.mtof(ns[0] - 12 + c.p), t, Math.min(dur, spb() * 2), { type: 'triangle', gain: 0.16 * st.bass * vel, release: 0.1, cutoff: 600, dest: musicIn }); }
/* ---------- FX + performance ---------- */
function revBuf() { const b = MMX.buf(0); if (revCache && revCache.src === b) return revCache.buf; const c = MM.cloneBuf(b); for (let k = 0; k < c.numberOfChannels; k++) c.getChannelData(k).reverse(); revCache = { src: b, buf: c }; return c; }
function fx(i, t, vel) { const c = pcfg.D[i], B = spb(), g = vel * c.g;
  switch (i) {
    case 0: MM.noise(t, B * 8 * c.len, { freq: 300, sweep: 9000, type: 'bandpass', q: 2.5, gain: 0.13 * g, attack: B * 8 * c.len * 0.9, dest: fxIn, send: { rev: 0.4 } }); break;
    case 1: MM.noise(t, B * 4 * c.len, { freq: 7000, sweep: 150, type: 'bandpass', q: 2, gain: 0.12 * g, dest: fxIn, send: { rev: 0.5 } }); break;
    case 2: impact(t, g); break;
    case 3: { const b = MMX.buf(0), { a, len } = MMX.region(0), x1 = a + chopSpan(lastVox.k)[1] * len, D = b.duration, dur = Math.min(1.2, x1 - a) * c.len; MM.play(revBuf(), t, { offset: Math.max(0, D - x1), dur, gain: 0.7 * g * st.vox, rate: Math.pow(2, c.p / 12), dest: musicIn, fadeIn: dur * 0.6, send: { rev: 0.5 } }); break; }
    case 4: tapeStop(t); break;
    case 5: MMX.fire(0, t, { pos: lastVox.x0 || 0, semis: lastVox.semis + c.p, dur: lastVox.dur || 0.3, gain: 0.8 * g * st.vox, dly: 1, rev: 0.4, dest: fxIn }); break;
    case 6: MMX.fire(6, t, { dur: B * 8 * c.len, fadeIn: 0.6, fadeOut: 1.2, gain: 0.8 * g, semis: c.p, dest: musicIn, loop: true }); break;
    case 7: MM.tone(MM.mtof(72 + st.root + c.p), t, B * 2 * c.len, { type: 'sawtooth', glide: MM.mtof(84 + st.root + c.p), cutoff: 2600, gain: 0.05 * g, dest: fxIn, send: { dly: 0.5 } }); break;
    case 8: MM.noise(t, B * 2 * c.len, { freq: 9000, sweep: 300, type: 'lowpass', q: 4, gain: 0.12 * g, dest: fxIn }); break;
    case 9: for (let k = 0; k < 8; k++) MMX.fire(0, t + k * B / 8, { pos: lastVox.x0 || 0, semis: lastVox.semis + c.p, dur: B / 9, gain: (0.4 + k * 0.06) * g * st.vox, dest: musicIn }); break;
    case 10: lp.frequency.setTargetAtTime(500, t, 0.25); break;
    case 11: lp.frequency.setTargetAtTime(20000, t, 0.15); break;
    case 12: master.gain.setValueAtTime(0, t); master.gain.setValueAtTime(1, t + B); break;
    case 13: impact(t, g); hp.frequency.cancelScheduledValues(t); hp.frequency.setValueAtTime(20, t); lp.frequency.setTargetAtTime(20000, t, 0.05); BANKS.forEach((b) => (mute[b] = false)); setTimeout(bankUI, 0); break;
    case 14: setTimeout(() => MMX.setParam('trackOn', !st.trackOn), Math.max(0, (t - MM.now) * 1000)); break;
    case 15: mute.B = !mute.B; setTimeout(bankUI, 0); break; } }
function impact(t, g = 1) { MMX.fire(2, t, { semis: -7, gain: 1.1 * g, dur: 0.6, dest: fxIn, rev: 0.6 }); MM.noise(t, 1.4, { freq: 1800, type: 'lowpass', gain: 0.16 * g, dest: fxIn, send: { rev: 0.9 } }); dropShow = performance.now(); }
function tapeStop(t) { if (!track || !track.h) return; const r = track.h.s.playbackRate; r.cancelScheduledValues(t); r.setValueAtTime(r.value || track.rate, t); r.linearRampToValueAtTime(0.03, t + 0.9); const h = track.h; h.g.gain.setTargetAtTime(0.0001, t + 0.7, 0.05); try { h.s.stop(t + 1.1); } catch (e) {} track = null; setTimeout(() => MMX.setParam('trackOn', false), 1000); }
/* ---------- CDJ deck ---------- */
function startTrack(t) { stopTrack(t); const { len } = MMX.region(5), rate = st.fit ? len / (st.trackBars * 4 * spb()) : 1; track = { h: MMX.fire(5, t, { loop: true, dur: 36000, rate, gain: 1, dest: trackG, fadeIn: 0.01 }), rate, t0: t, len }; trackSync = false; }
function stopTrack(t) { if (track && track.h) track.h.stop(t); track = null; }
/* ---------- hits ---------- */
function hit(b, i, vel, t) { if (b === 'A') vox(i, t, vel); else if (b === 'B') drum(i, t, vel); else if (b === 'C') chord(i, t, vel); else fx(i, t, vel); if (b === bank) setTimeout(() => flash(i), Math.max(0, (t - MM.now) * 1000)); }
function allowed(b, i) { if (!st.auto) return true; const s = STAGES[stage];
  if (s === 'DRONE') return b === 'C'; if (s === 'VOICE') return b === 'C' || b === 'A'; if (s === 'HATS') return b !== 'D' && (b !== 'B' || [4, 5, 6, 7].includes(i));
  if (s === 'BUILD') return b !== 'D' && (b !== 'B' || ![0, 1, 8, 9].includes(i)); if (s === 'BREAK') return b === 'A' || b === 'C' || (b === 'B' && [4, 7].includes(i)); return true; }
function live(i, vel = 0.9) { MM.ensure(); MM.ctx.resume(); if (!musicIn) buses(); const t = MM.now + 0.005; hit(bank, i, vel, t); sel = i; inspector();
  if (armed && MM.playing && log.length) { let best = log[0]; log.forEach((x) => { if (Math.abs(x[1] - t) < Math.abs(best[1] - t)) best = x; }); const sd = spb() / 4, q = st.quant; let idx = best[0] + Math.round((t - best[1]) / sd); idx = Math.round(idx / q) * q; const pos = ((idx % L()) + L()) % L(), cell = pats[bank][pos];
    if (!cell.some(([p]) => p === i)) { cell.push([i, vel]); if (idx > lastIdx) skip.add(idx + ':' + bank + ':' + i); } padHas(); } }
function startBuild() { if (phase === 'build') return; MM.ensure(); if (!MM.playing) MM.toggle(true); phase = 'build'; buildT0 = MM.now; const dur = st.buildBeats * spb(); hp.frequency.cancelScheduledValues(MM.now); hp.frequency.setValueAtTime(30, MM.now); hp.frequency.exponentialRampToValueAtTime(1400, MM.now + dur); fx(0, MM.now, 0.9); MM.$('#bBuild').classList.add('on'); }
function endBuild() { if (phase !== 'build') return; const g = Math.ceil((lastIdx + 1) / 4) * 4; gapFrom = g; dropIdx = st.gap ? g + 4 : g; phase = 'pending'; MM.$('#bBuild').classList.remove('on'); }
/* ---------- clock ---------- */
function step(i, t, sd) { lastIdx = i; log.push([i, t]); if (log.length > 32) log.shift(); const pos = i % L(); cfg.swing = st.swing; MM.bpm = st.bpm;
  if (pos % 16 === 0) { if (st.trackOn && (!track || trackSync) && (pos === 0 || !track)) startTrack(t); if (!st.trackOn && track) stopTrack(t);
    if (st.auto && phase === 'normal' || st.auto && phase === 'build') { stageBar++; if (stageBar >= st.autoBars) { stageBar = 0; if (STAGES[stage] === 'BUILD') endBuild(); else { stage = (stage + 1) % STAGES.length; if (stage === 0) stage = 2; if (STAGES[stage] === 'BUILD') setTimeout(startBuild, Math.max(0, (t - MM.now) * 1000)); } } } }
  let silent = false;
  if (phase === 'pending' && i >= gapFrom) { if (i < dropIdx) { silent = true; if (i === gapFrom) { hp.frequency.cancelScheduledValues(t); hp.frequency.setValueAtTime(20, t); } } else { phase = 'normal'; impact(t, 1); hp.frequency.cancelScheduledValues(t); hp.frequency.setValueAtTime(20, t); if (st.auto) { stage = STAGES.indexOf('DROP'); stageBar = 0; } } }
  if (silent) return;
  const inBuild = phase === 'build' || phase === 'pending';
  BANKS.forEach((b) => { if (mute[b]) return; pats[b][pos].forEach(([p, v]) => { const key = i + ':' + b + ':' + p; if (skip.has(key)) { skip.delete(key); return; } if (inBuild && b === 'B' && [0, 1, 8, 9].includes(p)) return; if (!allowed(b, p)) return; hit(b, p, v, t); }); });
  if (skip.size > 200) skip.clear();
  if (repeatOn && held.size) held.forEach((p) => { if (st.rep >= 1) { if (i % st.rep === 0) hit(bank, p, 0.8, t); } else { hit(bank, p, 0.8, t); hit(bank, p, 0.7, t + sd / 2); } });
  if (inBuild) { const beats = (t - buildT0) / spb(), f = beats / st.buildBeats, every = f < 0.5 ? 4 : f < 0.75 ? 2 : 1; if (i % every === 0) { drum(3, t, 0.35 + Math.min(0.6, f * 0.6)); if (f >= 0.9) drum(3, t + sd / 2, 0.7); } } }
/* ---------- grooves and defaults ---------- */
function groove(name) { const p = blank(), put = (s, pad, v = 0.9) => { for (let b = 0; b < 4; b++) p[b * 16 + s].push([pad, v]); };
  if (name === 'house') { [0, 4, 8, 12].forEach((s) => put(s, 0)); [4, 12].forEach((s) => put(s, 2, 0.8)); [2, 6, 10, 14].forEach((s) => put(s, 5, 0.6)); for (let s = 1; s < 16; s += 2) put(s, 7, 0.5); [0, 7].forEach((s) => put(s, 8, 0.7)); p[62].push([13, 0.7]); }
  else if (name === 'garage') { [0, 10].forEach((s) => put(s, 0)); p[23].push([0, 0.7]); p[55].push([0, 0.7]); [4, 12].forEach((s) => put(s, 3, 0.85)); [2, 6, 10, 14].forEach((s) => put(s, 4, 0.6)); [3, 11].forEach((s) => put(s, 4, 0.35)); [15].forEach((s) => put(s, 6, 0.5)); [0, 10].forEach((s) => put(s, 8, 0.75)); }
  else if (name === 'break') { [0, 10].forEach((s) => put(s, 0)); p[18].push([0, 0.8]); p[50].push([0, 0.8]); [4, 12].forEach((s) => put(s, 3, 0.9)); [7, 9, 15].forEach((s) => put(s, 3, 0.3)); for (let s = 0; s < 16; s += 2) put(s, 4, 0.55); [0].forEach((s) => put(s, 8, 0.7)); }
  else { [0, 11].forEach((s) => put(s, 0)); put(8, 2, 0.9); for (let s = 0; s < 16; s += 2) put(s, 4, 0.5); put(14, 5, 0.5); put(0, 8, 0.8); }
  pats.B = p; }
function defaults() { const A = blank(), C = blank(), D = blank(), prog = [0, 5, 2, 6];
  for (let b = 0; b < 4; b++) { const o = b * 16; [[0, b % 2 ? 4 : 0], [3, 1], [6, 2], [10, 3 + (b % 3)], [12, 6 + b]].forEach(([s, k]) => A[o + s].push([k, 0.85])); C[o].push([prog[b], 0.8]); C[o + 10].push([prog[b] + 7, 0.45]); }
  D[48].push([0, 0.6]); pats.A = A; pats.C = C; pats.D = D; groove(st.groove); pcfg.C.forEach((c, k) => (c.len = k >= 7 && k < 14 ? 1.5 : 4)); }
/* ---------- UI ---------- */
let padEls = [];
function padName(i) { if (bank === 'A') { if (st.vmode === 'keys') { const m = 60 + scaleSemis(i); return NOTES[((m % 12) + 12) % 12] + ' · chop ' + (st.keyChop + 1); } return 'CHOP ' + ((i % chopPts.length) + 1); } if (bank === 'B') return DRUMN[i]; if (bank === 'C') return chordName(i); return FXN[i]; }
function padLabels() { padEls.forEach((e, i) => (e.querySelector('span').textContent = padName(i))); }
function buildPads() { const P = MM.$('#pads'); P.innerHTML = ''; padEls = PADKEYS.map((k, i) => { const e = MM.h('button', { class: 'pad s' + ((i + BANKS.indexOf(bank)) % 4), style: `--c:${COLS[(i * 3 + BANKS.indexOf(bank) * 2) % COLS.length]}` }, MM.h('span', {}, ''), MM.h('kbd', {}, k.toUpperCase()));
  e.addEventListener('pointerdown', (ev) => { ev.preventDefault(); live(i, 0.6 + 0.4 * (1 - ev.offsetY / e.clientHeight)); held.add(i); }); ['pointerup', 'pointerleave'].forEach((x) => e.addEventListener(x, () => held.delete(i))); P.append(e); return e; }); padLabels(); padHas(); inspector(); }
function padHas() { const used = new Set(); pats[bank].slice(0, L()).forEach((c) => c.forEach(([p]) => used.add(p))); padEls.forEach((e, i) => { e.classList.toggle('has', used.has(i)); e.classList.toggle('sel', i === sel); }); }
function flash(i) { const e = padEls[i]; if (!e) return; e.classList.add('hit'); setTimeout(() => e.classList.remove('hit'), 90); }
function bankUI() { const B = MM.$('#banks'); B.innerHTML = ''; BANKS.forEach((b) => { const e = MM.h('button', { class: (b === bank ? 'on ' : '') + (mute[b] ? 'mut' : ''), title: BNAME[b] + ' (click again to mute)' }, b + ' · ' + BNAME[b].split(' ')[0]); e.onclick = () => { if (bank === b) mute[b] = !mute[b]; else setBank(b); bankUI(); }; B.append(e); }); }
function setBank(b) { bank = b; buildPads(); bankUI(); }
function inspector() { const I = MM.$('#insp'); if (!I) return; const c = pcfg[bank][sel]; I.innerHTML = ''; I.append(MM.h('div', {}, `PAD ${sel + 1} · BANK ${bank} · ${padName(sel)}`));
  [['p', 'PITCH', -24, 24, 1], ['g', 'GAIN', 0, 1.5, 0.01], ['len', bank === 'C' ? 'BEATS' : 'LENGTH', 0.25, bank === 'C' ? 16 : 4, 0.25], ['pan', 'PAN', -1, 1, 0.05]].forEach(([k, lab, mn, mx, s]) => { const inp = MM.h('input', { type: 'range', min: mn, max: mx, step: s, value: c[k] }), out = MM.h('span', {}, String(c[k])); inp.oninput = () => { c[k] = +inp.value; out.textContent = inp.value; }; I.append(MM.h('label', { class: 'r' }, MM.h('span', {}, lab), inp, out)); }); }
const cv = MM.canvas('#cv'), rc = MM.canvas('#roll');
function rollXY(x, y) { const W = rc.w, H = rc.h, cols = L(), cw = (W - 70) / cols, rh = H / 16; return [Math.floor((x - 70) / cw), 15 - Math.floor(y / rh)]; }
MM.drag(MM.$('#roll'), (x, y, ph) => { if (ph !== 'down') return; const [c, r] = rollXY(x, y); if (c < 0 || c >= L() || r < 0 || r > 15) return; const cell = pats[bank][c], k = cell.findIndex(([p]) => p === r); if (k >= 0) cell.splice(k, 1); else { cell.push([r, 0.85]); if (!MM.playing) hit(bank, r, 0.85, MM.now); } padHas(); });
function draw() { cv.fit(); const g = cv.g, W = cv.w, H = cv.h, now = performance.now(); g.fillStyle = '#f3ecdc'; g.fillRect(0, 0, W, H);
  // Bubbles-style backdrop: a primary-colour constellation
  g.fillStyle = '#ffd100'; g.beginPath(); g.arc(W * 0.82, H * 0.2, Math.min(W, H) * 0.16, 0, 7); g.fill(); g.fillStyle = '#0057b8'; g.fillRect(W * 0.06, H * 0.62, W * 0.1, W * 0.1); g.fillStyle = '#e4002b'; g.beginPath(); g.moveTo(W * 0.6, H * 0.96); g.lineTo(W * 0.7, H * 0.72); g.lineTo(W * 0.8, H * 0.96); g.fill();
  for (let k = 0; k < 9; k++) { g.fillStyle = '#141414'; g.fillRect(W * 0.04 + k * 10, 14, 5, 5 + (k % 3) * 4); }
  // the phrase, with chops
  const b = MMX.buf(0), { a, len } = MMX.region(0), pk = MM.peaks(b, 300), y0 = H * 0.08, hh = H * 0.22, x0 = 24, ww = W - 48;
  g.fillStyle = '#141414'; g.font = "700 11px 'Space Mono'"; g.fillText('PHRASE · ' + (MMX.S.slots[0].name || 'built-in phrase') + ' · ' + chopPts.length + ' chops' + (st.vmode === 'keys' ? ' · chop ' + (st.keyChop + 1) + ' re-pitched' : ''), x0, y0 - 6);
  chopPts.forEach((p, k) => { const [u, v] = chopSpan(k), xa = x0 + u * ww, xb = x0 + v * ww, on = k === curChop && now - curChopT < 250; g.fillStyle = on ? '#e4002b' : COLS[k % COLS.length]; g.globalAlpha = on ? 1 : st.vmode === 'keys' && k !== st.keyChop ? 0.12 : 0.28; g.fillRect(xa, y0, xb - xa - 2, hh); g.globalAlpha = 1; g.fillStyle = '#141414'; g.fillText(String(k + 1), xa + 3, y0 + hh - 4); });
  g.fillStyle = '#141414'; for (let i = 0; i < ww; i++) { const t = a + (i / ww) * len, j = Math.floor((t / b.duration) * pk.length), v = (pk[Math.min(pk.length - 1, j)] || 0) * hh * 0.9; g.fillRect(x0 + i, y0 + hh / 2 - v / 2, 1, Math.max(1, v)); }
  // section word
  const sec = phase === 'build' ? 'BUILD' : phase === 'pending' && lastIdx >= gapFrom ? '. . .' : phase === 'pending' ? 'BUILD' : now - dropShow < 2500 ? 'DROP' : st.auto ? STAGES[stage] : armed ? 'REC' : 'LIVE';
  g.save(); g.translate(x0, H * 0.62); g.rotate(-0.05); g.font = `900 ${Math.min(150, W * 0.2)}px 'Big Shoulders Display'`; g.fillStyle = sec === 'DROP' ? '#e4002b' : '#141414'; g.fillText(sec, 0, 0); g.restore();
  // energy: the build filter
  const hf = hp ? hp.frequency.value : 20, e = Math.log(hf / 20) / Math.log(70); g.fillStyle = '#141414'; g.fillRect(x0, H * 0.7, ww * 0.5, 14); g.fillStyle = '#e4002b'; g.fillRect(x0 + 2, H * 0.7 + 2, (ww * 0.5 - 4) * Math.min(1, e), 10); g.font = "700 10px 'Space Mono'"; g.fillStyle = '#141414'; g.fillText('BUILD ' + Math.round(hf) + ' Hz', x0, H * 0.7 + 28);
  // CDJ jog wheel
  const R = Math.min(W, H) * 0.13, cx = W - R - 30, cy = H - R - 30; g.fillStyle = '#141414'; g.beginPath(); g.arc(cx, cy, R, 0, 7); g.fill(); g.fillStyle = st.trackOn ? '#00a651' : '#555'; g.beginPath(); g.arc(cx, cy, R * 0.35, 0, 7); g.fill();
  const ang = track ? ((MM.now - track.t0) * track.rate / track.len) * Math.PI * 2 : 0; g.strokeStyle = '#f3ecdc'; g.lineWidth = 4; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(ang) * R * 0.92, cy + Math.sin(ang) * R * 0.92); g.stroke();
  g.fillStyle = '#141414'; g.font = "700 10px 'Space Mono'"; g.fillText(`CDJ ${st.trackOn ? 'PLAYING' : 'STOPPED'} · ${MMX.S.slots[5] && MMX.S.slots[5].name || 'built-in loop'} · ${st.trackBars} bars`, cx - R, cy - R - 8);
  g.fillText(`${st.bpm} BPM · ${NOTES[st.root]} ${st.scale} · ${st.groove} · swing ${st.swing.toFixed(2)} · bank ${bank}${armed ? ' · REC ARMED' : ''}${repeatOn ? ' · REPEAT' : ''}`, x0, H - 12);
  drawRoll(); }
function drawRoll() { rc.fit(); const g = rc.g, W = rc.w, H = rc.h, cols = L(), cw = (W - 70) / cols, rh = H / 16, pos = lastIdx >= 0 ? (lastIdx % cols) : -1; g.fillStyle = '#fff'; g.fillRect(0, 0, W, H);
  for (let c = 0; c < cols; c++) { if (c % 16 === 0) { g.fillStyle = '#f3ecdc'; g.fillRect(70 + c * cw, 0, cw * 4, H); } if (c === pos && MM.playing) { g.fillStyle = 'rgba(228,0,43,.18)'; g.fillRect(70 + c * cw, 0, cw, H); } }
  g.font = "700 8px 'Space Mono'"; for (let r = 0; r < 16; r++) { const y = H - (r + 1) * rh; g.fillStyle = r % 2 ? '#fff' : '#faf6ec'; g.fillRect(0, y, 70, rh); g.fillStyle = '#141414'; g.fillText(padName(r).slice(0, 11), 3, y + rh * 0.75); }
  pats[bank].slice(0, cols).forEach((cell, c) => cell.forEach(([p, v]) => { g.fillStyle = COLS[(p * 3 + BANKS.indexOf(bank) * 2) % COLS.length]; g.globalAlpha = 0.4 + v * 0.6; g.fillRect(70 + c * cw + 1, H - (p + 1) * rh + 1, Math.max(2, cw - 2), rh - 2); g.globalAlpha = 1; }));
  g.strokeStyle = '#141414'; g.lineWidth = 1; for (let c = 0; c <= cols; c += 4) { g.beginPath(); g.moveTo(70 + c * cw, 0); g.lineTo(70 + c * cw, H); g.globalAlpha = c % 16 ? 0.2 : 1; g.stroke(); g.globalAlpha = 1; } }
function toggleArm() { armed = !armed; MM.$('#bArm').classList.toggle('on', armed); MM.toast(armed ? 'Pattern recorder armed: play pads to overdub' : 'Recorder off'); }
cfg = { bpm: 128, div: 4, swing: 0.1, step, draw, start: () => { if (!musicIn) buses(); lastIdx = -1; log = []; if (st.auto) { stage = 0; stageBar = 0; } }, stop: () => { stopTrack(MM.now); phase = 'normal'; if (hp) { hp.frequency.cancelScheduledValues(MM.now); hp.frequency.setValueAtTime(20, MM.now); } },
  onSamples: (list) => { MMX.assign(list); },
  key: (e) => { if (MMX.key(e)) return; if (e.repeat) return; const k = e.key.toLowerCase(), pi = PADKEYS.indexOf(k);
    if (pi >= 0) { live(pi); held.add(pi); return; }
    if (k === 'b') startBuild(); else if (k === 'n') { repeatOn = true; MM.$('#bRep').classList.add('on'); } else if (k === 'k') toggleArm(); else if (k === 'j') MMX.setParam('trackOn', !st.trackOn);
    else if (k === '[' || k === ']') setBank(BANKS[(BANKS.indexOf(bank) + (k === ']' ? 1 : 3)) % 4]); else if (e.key === 'Backspace') { pats[bank] = blank(); padHas(); MM.toast('Cleared bank ' + bank); } else if (k === 'm') { mute[bank] = !mute[bank]; bankUI(); } else if (k === 'u') MMX.setParam('auto', !st.auto); },
  setup() {
    MM.fb.phrase = phrase(); MM.fb.clap = clap(); MM.fb.hatx = hatx(); if (!musicIn) buses();
    MMX.init({ state: st, slots: [{ label: 'Phrase', kind: 'phrase', rv: 0.1, dl: 0.05 }, { label: 'Keys / drone', kind: 'tone', rv: 0.25 }, { label: 'Kick', kind: 'kick', rv: 0 }, { label: 'Clap / snare', kind: 'clap', rv: 0.12 }, { label: 'Hats', kind: 'hatx', rv: 0.04, gain: 0.7 }, { label: 'CDJ track', kind: 'loop', rv: 0 }, { label: 'Field / crowd', kind: 'texture', rv: 0.2 }],
      extra: { get: () => ({ pats: JSON.parse(JSON.stringify(pats)), pcfg: JSON.parse(JSON.stringify(pcfg)), mute: { ...mute } }), set: (x) => { if (x.pats) pats = x.pats; if (x.pcfg) pcfg = x.pcfg; if (x.mute) mute = x.mute; BANKS.forEach((b) => { while (pats[b].length < 64) pats[b].push([]); }); buildPads(); bankUI(); } },
      onSlot: (i) => { if (i === 0) { rechop(); revCache = null; } if (i === 5 && track) trackSync = true; },
      factory: fac(),
      keys: [['1-4 Q W E T A S F G Z X C V', 'the 16 pads'], ['[ ]', 'previous / next bank'], ['K', 'arm the pattern recorder (overdub)'], ['hold N', 'note repeat on held pads'], ['hold B', 'build; let go to drop'], ['J', 'CDJ deck on / off'], ['M', 'mute this bank'], ['U', 'FROM SCRATCH autopilot'], ['Backspace', 'clear this bank']],
      midiHelp: 'Notes 36 to 51 (C1 to D#2, the usual pad-controller layout) play the 16 pads of the current bank, with velocity. Any other note plays the chosen chop re-pitched (C4 = original). Map a fader to BUILD-related sliders with MIDI learn.',
      midi: (n, v, on) => { if (!on) { if (n >= 36 && n <= 51) held.delete(n - 36); return; } if (n >= 36 && n <= 51) { live(n - 36, Math.max(0.2, v)); held.add(n - 36); } else { const [x0, x1] = chopSpan(st.keyChop), { len } = MMX.region(0); MMX.fire(0, MM.now, { pos: x0, semis: n - 60, dur: (x1 - x0) * len * 1.5, gain: v * st.vox, dest: musicIn }); } } });
    const A = MM.$('#s1'), B = MM.$('#s2'), C = MM.$('#s3'), D = MM.$('#s4');
    MMX.ctl(A, 'bpm', { label: 'Tempo', min: 70, max: 180, step: 1, on: (v) => { MM.bpm = v; if (track) trackSync = true; } }); MMX.ctl(A, 'bars', { type: 'select', label: 'Pattern', options: [[1, '1 bar'], [2, '2 bars'], [4, '4 bars']], on: () => padEls.length && padHas() });
    MMX.ctl(A, 'root', { type: 'select', label: 'Key', options: NOTES.map((x, k) => [k, x]), on: () => padEls.length && padLabels() }); MMX.ctl(A, 'scale', { type: 'select', label: 'Scale', options: ['minor', 'major', 'dorian', 'phrygian', 'lydian', 'minpent', 'penta'].map((k) => [k, k]), on: () => padEls.length && padLabels() });
    MMX.ctl(A, 'auto', { type: 'check', label: 'From scratch', hint: 'U: add layers in order: drone, voice, hats, build, drop, break' }); MMX.ctl(A, 'autoBars', { label: 'Bars per layer', min: 1, max: 16, step: 1 }); MMX.ctl(A, 'quant', { type: 'select', label: 'Rec quantise', options: [[1, '1/16'], [2, '1/8'], [4, '1/4']] }); MMX.ctl(A, 'rep', { type: 'select', label: 'Note repeat', options: [[2, '1/8'], [1, '1/16'], [0.5, '1/32']] });
    MMX.ctl(B, 'vmode', { type: 'select', label: 'Vox pads', options: [['chops', 'chops of the phrase'], ['keys', 'one chop, re-pitched']], on: () => padEls.length && padLabels() }); MMX.ctl(B, 'chopMode', { type: 'select', label: 'Chop at', options: [['onsets', 'word onsets'], ['equal', '16 equal slices']], on: () => MMX.S.slots.length && rechop() });
    MMX.ctl(B, 'keyChop', { label: 'Re-pitch chop', min: 0, max: 15, step: 1, fmt: (v) => String(v + 1), on: () => padEls.length && padLabels() }); MMX.ctl(B, 'gate', { label: 'Chop gate', min: 0.2, max: 3, step: 0.05 }); MMX.ctl(B, 'choke', { type: 'check', label: 'Choke vox' }); MMX.ctl(B, 'vox', { label: 'Vox level', min: 0, max: 1.4 }); MMX.ctl(B, 'chordsLvl', { label: 'Chords level', min: 0, max: 1.2 }); MMX.ctl(B, 'echo', { label: 'Echo time', min: 0.05, max: 1, on: (v) => MM.setDelay(spb() * (v < 0.33 ? 0.5 : v < 0.66 ? 0.75 : 1)) });
    MMX.ctl(C, 'groove', { type: 'select', label: 'Groove', options: [['house', 'house 4/4'], ['garage', 'UK garage 2-step'], ['break', 'breakbeat'], ['half', 'half-time']], on: (v) => { groove(v); padEls.length && padHas(); } }); MMX.ctl(C, 'swing', { label: 'Swing', min: 0, max: 0.35, step: 0.01 }); MMX.ctl(C, 'drums', { label: 'Drums level', min: 0, max: 1.4 }); MMX.ctl(C, 'bass', { label: 'Sub bass', min: 0, max: 1 }); MMX.ctl(C, 'pump', { label: 'Sidechain pump', min: 0, max: 1 });
    MMX.ctl(D, 'trackOn', { type: 'check', label: 'CDJ playing', on: () => MM.$('#bCdj') && MM.$('#bCdj').classList.toggle('on', st.trackOn) }); MMX.ctl(D, 'track', { label: 'CDJ level', min: 0, max: 1.2, on: (v) => trackG && trackG.gain.setTargetAtTime(v, MM.now, 0.03) }); MMX.ctl(D, 'trackBars', { type: 'select', label: 'CDJ bars', options: [[1, '1 bar'], [2, '2 bars'], [4, '4 bars'], [8, '8 bars']], on: () => track && (trackSync = true) }); MMX.ctl(D, 'fit', { type: 'check', label: 'Lock to tempo', on: () => track && (trackSync = true) });
    MMX.ctl(D, 'buildBeats', { label: 'Build beats', min: 2, max: 32, step: 1 }); MMX.ctl(D, 'gap', { type: 'check', label: 'Beat of silence' });
    const bb = MM.$('#bBuild'); bb.addEventListener('pointerdown', (e) => { e.preventDefault(); startBuild(); }); ['pointerup', 'pointerleave'].forEach((x) => bb.addEventListener(x, endBuild));
    MM.$('#bArm').onclick = toggleArm; const br = MM.$('#bRep'); br.addEventListener('pointerdown', () => { repeatOn = !repeatOn; br.classList.toggle('on', repeatOn); }); MM.$('#bCdj').onclick = () => MMX.setParam('trackOn', !st.trackOn);
    defaults(); rechop(); bankUI(); buildPads(); MM.setDelay(spb() * 0.75);
    // the factory default must carry the demo patterns (they are made after MMX.init took its snapshot)
    try { const K = 'mm.presets.' + (window.MM_META || {}).no, a = JSON.parse(localStorage.getItem(K) || '{}'), d = a['Boiler Room (default)']; if (d && !(d.extra && d.extra.pats && d.extra.pats.A && d.extra.pats.A.some((x) => x.length))) { d.extra = { pats: JSON.parse(JSON.stringify(pats)), pcfg: JSON.parse(JSON.stringify(pcfg)), mute: { ...mute } }; localStorage.setItem(K, JSON.stringify(a)); } } catch (e) {}
  } };
addEventListener('keyup', (e) => { const k = e.key.toLowerCase(), pi = PADKEYS.indexOf(k); if (pi >= 0) held.delete(pi); if (k === 'b') endBuild(); if (k === 'n') { repeatOn = false; MM.$('#bRep').classList.remove('on'); } });
function fac() { const base = JSON.parse(JSON.stringify(st)), F = (o) => ({ full: { params: Object.assign({}, base, o), extra: null } });
  return { 'Boiler Room (default)': {}, 'UK garage 2-step': F({ groove: 'garage', bpm: 132, swing: 0.2, root: 2, scale: 'minor' }), 'One phrase, sixteen notes': F({ vmode: 'keys', keyChop: 3, scale: 'minpent', root: 4, bpm: 124 }), 'From scratch (autopilot)': F({ auto: true, autoBars: 2 }), 'B2B with the CDJ': F({ trackOn: true, trackBars: 2, groove: 'half', bpm: 140, drums: 0.6 }) }; }
/* built-in sounds: a spoken-sounding phrase (eight syllables with moving pitch and vowels), a clap and a hat with a tail */
function phrase() { const ctx = MM.ctx, sr = ctx.sampleRate, dur = 3.2, B = ctx.createBuffer(1, Math.floor(sr * dur), sr), d = B.getChannelData(0);
  const V = { a: [730, 1090, 2440], i: [300, 2200, 2950], u: [320, 870, 2240], e: [530, 1840, 2480], o: [570, 840, 2410] }, syl = [['o', 0.05, 0.26, 190], ['a', 0.36, 0.3, 215], ['i', 0.74, 0.22, 240], ['e', 1.02, 0.34, 205], ['u', 1.5, 0.24, 175], ['a', 1.82, 0.4, 230], ['o', 2.3, 0.28, 200], ['i', 2.66, 0.42, 170]];
  syl.forEach(([v, t0, len, f0]) => { const F = V[v], s = F.map(() => [0, 0]); let ph = 0; const o = Math.floor(t0 * sr), n = Math.floor(len * sr);
    for (let i = 0; i < Math.floor(0.03 * sr); i++) d[o + i] += (Math.random() * 2 - 1) * 0.15 * (1 - i / (0.03 * sr));
    for (let i = 0; i < n && o + i < d.length; i++) { const t = i / sr, f = f0 * (1 + 0.12 * Math.sin(Math.PI * t / len) - 0.08 * t / len); ph += f / sr; const src = ph % 1 < 0.1 ? 1 : 0; let y = 0;
      F.forEach((fr, k) => { const r = Math.exp(-Math.PI * 100 / sr), w = 2 * Math.PI * fr / sr, q = s[k], x = src + 2 * r * Math.cos(w) * q[0] - r * r * q[1]; q[1] = q[0]; q[0] = x; y += x * [1, 0.5, 0.25][k]; });
      d[o + i] += y * 0.03 * Math.min(1, t * 40) * Math.min(1, (len - t) * 14); } });
  let m = 0; for (const x of d) m = Math.max(m, Math.abs(x)); for (let i = 0; i < d.length; i++) d[i] *= 0.8 / (m || 1); return B; }
function clap() { const ctx = MM.ctx, sr = ctx.sampleRate, B = ctx.createBuffer(1, Math.floor(sr * 0.4), sr), d = B.getChannelData(0); let lp = 0;
  for (let i = 0; i < d.length; i++) { const t = i / sr, burst = [0, 0.011, 0.022].reduce((s, o) => s + (t >= o ? Math.exp(-(t - o) * 180) : 0), 0) + 0.5 * Math.exp(-t * 14); const n = Math.random() * 2 - 1; lp += (n - lp) * 0.5; d[i] = (n - lp) * burst * 0.7; } return B; }
function hatx() { const ctx = MM.ctx, sr = ctx.sampleRate, B = ctx.createBuffer(1, Math.floor(sr * 0.45), sr), d = B.getChannelData(0); let p = 0; for (let i = 0; i < d.length; i++) { const t = i / sr, n = Math.random() * 2 - 1; d[i] = (n - p) * 0.6 * Math.exp(-t * 9); p = n; } return B; }
MM.init(cfg);
