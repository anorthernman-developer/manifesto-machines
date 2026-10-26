/*META
{"title":"Anthropophagy","idea":"Feed the mouth sounds from anywhere; it chews them into pieces and digests them into a new Brazilian rhythm.","how":"Press PLAY. The mouth eats sounds: every sample you load is eaten, and so are the built-in sounds (click FEED to give it another). It chews each sound into pieces that go into the stomach. The rhythm (a baião, with zabumba, triangle and agogô parts) is played only with the digested pieces, and DIGEST rearranges which piece goes where, mixing everything it has eaten. Change the rhythm with the buttons. Nothing is played raw: everything foreign is devoured and made new.","fonts":"family=Bungee+Shade&family=Bungee&family=Space+Mono","bpm":104,
"manifesto":{"name":"Manifesto Antropófago (Cannibal Manifesto)","short":"Antropofagia","author":"Oswald de Andrade","year":"1928","where":"the first issue of Revista de Antropofagia, São Paulo, May 1928, illustrated with Tarsila do Amaral's painting Abaporu","ideas":["Brazilian culture should 'devour' European and other foreign culture, digest it and make something of its own.","A pun on Hamlet that sets Brazil's Indigenous Tupi in place of 'to be'.","Cannibalism as a cultural strategy, revived by Tropicália in the 1960s."],"quotes":["Tupi or not tupi, that is the question."],"system":"No sound is ever played as it arrived. Everything you feed in is chewed into pieces and digested, and only those pieces make the rhythm. Foreign material becomes local music by being eaten."},
"design":{"name":"Rogério Duarte","short":"Rogério Duarte","who":"Rogério Duarte, Brazilian designer, poet and musician, a key graphic voice of Tropicália","era":"Rio de Janeiro and Bahia, 1960s to 1970s","hallmarks":["Psychedelic, Op-Art bands of colour radiating like a sun","Modernist clarity mixed with tropical exuberance and popular street lettering","Green, yellow and red, sometimes 'stained' as a political sign"],"works":["Poster for Glauber Rocha's Deus e o Diabo na Terra do Sol (1964)","Cover for Gilberto Gil's 1968 album (with photographer David Drew Zingg)","Cover for Caetano Veloso's 1968 album"]}}
*/
/*CSS
:root{--bg:#ffd400;--fg:#0f3d1f;--acc:#e3261b;--bar-font:'Space Mono',monospace;--head-font:'Bungee',sans-serif}
#mm-stage{background:#ffd400;overflow:hidden}
#cv{position:absolute;inset:0;width:100%;height:100%}
.t{position:absolute;left:20px;top:16px;z-index:2;font:400 54px/1.1 'Bungee Shade';color:#0f3d1f;pointer-events:none;background:#ffd400;padding:10px 14px}.t small{display:block;font:400 20px 'Bungee';color:#e3261b}
.ctl{position:absolute;right:24px;top:22px;display:flex;flex-direction:column;gap:8px;width:190px}
.ctl button{font:400 18px 'Bungee';background:#0f3d1f;color:#ffd400;border:0;padding:10px;cursor:pointer}.ctl button.on,.ctl button:hover{background:#e3261b}
#st{position:absolute;left:28px;bottom:16px;font:700 13px 'Space Mono';background:#0f3d1f;color:#ffd400;padding:6px 10px;max-width:60%}
*/
/*HTML
<canvas id="cv"></canvas><div class="t">TUPI OR<br>NOT TUPI<small>antropofagia · 1928</small></div>
<div class="ctl"><button id="feed">FEED</button><button id="dig">DIGEST</button><button class="r on" data-r="0">BAIÃO</button><button class="r" data-r="1">XOTE</button><button class="r" data-r="2">MARACATU</button></div><div id="st"></div>
*/
const RH = [{ n: 'baião', z: 'X..x..X.X..x..X.', t: 'xxXxxxXxxxXxxxXx', a: '..X...X...X.X...' }, { n: 'xote', z: 'X...x.X.X...x.X.', t: 'x.X.x.X.x.X.x.X.', a: 'X.......X.......' }, { n: 'maracatu', z: 'X..X..X...X.X...', t: 'xXxXxXxXxXxXxXxX', a: 'X.X.X..X.X.X.X..' }];
let rh = 0, stomach = [], eaten = [], map = {}, chew = 0, fedFb = 0;
const FB = ['loop', 'voice', 'texture', 'tone', 'snare'];
function eat(buf, name) { const n = 6, pieces = []; for (let k = 0; k < n; k++) pieces.push({ buf, off: (k / n) * buf.duration, len: buf.duration / n, from: name, hue: (eaten.length * 67) % 360 }); eaten.push(name); stomach.push(...pieces); if (stomach.length > 60) stomach.splice(0, stomach.length - 60); chew = 1; digest(); }
function digest() { map = { z: [], t: [], a: [] }; ['z', 't', 'a'].forEach((p) => { for (let k = 0; k < 16; k++) map[p][k] = stomach[Math.floor(Math.random() * stomach.length)]; }); }
MM.$('#feed').onclick = () => { MM.ensure(); const k = FB[fedFb++ % FB.length]; eat(MM.fb[k], 'built-in ' + k); };
MM.$('#dig').onclick = digest;
MM.$$('.r').forEach((b) => (b.onclick = () => { rh = +b.dataset.r; MM.$$('.r').forEach((q) => q.classList.toggle('on', q === b)); }));
const C = MM.canvas('#cv'); let cur = 0, flash = 0;
MM.init({ bpm: 104, div: 4,
  setup() {},
  start() { if (!stomach.length) { eat(MM.fb.loop, 'built-in loop'); eat(MM.fb.voice, 'built-in voice'); } },
  onSamples() { MM.S.samples.forEach((s, i) => { if (!s._eaten) { s._eaten = 1; eat(MM.smp(i), MM.smpName ? MM.smpName(i) : 'sample ' + (i + 1)); } }); stomach = stomach.filter((p) => !p.from.startsWith('built-in') || Math.random() < 0.3); digest(); },
  step(i, t, sd) { if (!stomach.length) return; const s = i % 16, R = RH[rh]; cur = s;
    const hit = (p, ch, o) => { const pc = map[p][s]; if (!pc) return; MM.play(pc.buf, t, { offset: pc.off, dur: Math.min(pc.len, o.dur), rate: o.rate, gain: o.gain * (ch === 'X' ? 1 : 0.6), filter: o.filter, pan: o.pan, fadeOut: 0.01 }); flash = 1; };
    if (R.z[s] !== '.') { hit('z', R.z[s], { dur: 0.22, rate: 0.5, gain: 1, filter: { type: 'lowpass', freq: 500 } }); MM.tone(R.z[s] === 'X' ? 60 : 85, t, 0.15, { gain: 0.35 }); }
    if (R.t[s] !== '.') hit('t', R.t[s], { dur: 0.05, rate: 2.5, gain: 0.35, filter: { type: 'highpass', freq: 3500 }, pan: 0.4 });
    if (R.a[s] !== '.') hit('a', 'X', { dur: 0.12, rate: s % 4 === 2 ? 1.5 : 2, gain: 0.55, filter: { type: 'bandpass', freq: 1800 }, pan: -0.4 }); },
  draw(ts) { C.fit(); const g = C.g, w = C.w, h = C.h, cx = w * 0.5, cy = h * 0.62; g.fillStyle = '#ffd400'; g.fillRect(0, 0, w, h);
    // Duarte-style sun bands
    const cols = ['#0f3d1f', '#ffd400', '#e3261b', '#ffd400', '#2b8a3e', '#ffd400']; for (let k = 14; k >= 0; k--) { g.fillStyle = cols[k % cols.length]; g.beginPath(); g.arc(cx, cy, 60 + k * 34 + Math.sin(ts / 600 + k) * (MM.playing ? 4 + flash * 6 : 2), 0, 7); g.fill(); } flash *= 0.85;
    // the mouth
    const open = 0.25 + chew * 0.6 + (MM.playing ? Math.abs(Math.sin(ts / 180)) * 0.15 : 0); chew *= 0.97; g.fillStyle = '#111'; g.beginPath(); g.ellipse(cx, cy, 90, 90 * open, 0, 0, 7); g.fill(); g.fillStyle = '#fff'; for (let k = 0; k < 8; k++) { g.beginPath(); g.moveTo(cx - 80 + k * 20, cy - 90 * open + 2); g.lineTo(cx - 70 + k * 20, cy - 90 * open + 18); g.lineTo(cx - 60 + k * 20, cy - 90 * open + 2); g.fill(); }
    // the stomach: pieces orbiting
    stomach.forEach((p, k) => { const a = k * 0.7 + ts / 3000, r = 140 + (k % 5) * 18; g.fillStyle = `hsl(${p.hue},85%,55%)`; g.strokeStyle = '#111'; g.lineWidth = 2; g.beginPath(); g.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.5, 9, 0, 7); g.fill(); g.stroke(); });
    MM.$('#st').textContent = `eaten: ${eaten.slice(-5).join(', ') || 'nothing yet'} · ${stomach.length} pieces · ${RH[rh].n}`; }
});
