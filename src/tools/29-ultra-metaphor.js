/*META
{"title":"Ultra Metaphor","idea":"Fuse two sound images into one metaphor: the rhythm of one drives the body of the other, with every ornament stripped away.","how":"Press PLAY. Pick a first image (its rhythm and gesture) and a second image (its body and colour). The machine fuses them into one metaphor, so 'the train is a bird' plays bird chirps in the rhythm of a train. Your sample is the image called VOICE. STRIP removes ornament: turn it up to delete passing notes and decoration until only the essential element is left. SWAP turns the metaphor around.","fonts":"family=Archivo:wght@400;800&family=Archivo+Narrow:wght@400","bpm":100,
"manifesto":{"name":"Ultraísmo","short":"Ultraism","author":"Jorge Luis Borges","year":"1921","where":"Nosotros magazine, Buenos Aires, December 1921; Ultraism began in Spain in 1918 and Borges brought it to Argentina","ideas":["Reduce lyric poetry to its primordial element: the metaphor.","Cut out connecting phrases and useless adjectives, and abolish ornament, confessional tone and obscurity.","Fuse two or more images into one, to widen its power of suggestion."],"quotes":[],"system":"Each sound is an image. The machine never layers sounds side by side: it fuses two into one metaphor, rhythm from the first and body from the second. The STRIP control is the second rule, cutting everything that is only ornament."},
"design":{"name":"Jan Tschichold","short":"Jan Tschichold","who":"Jan Tschichold, German typographer (later in Switzerland and Britain)","era":"Leipzig, Munich and Basel, 1925 to 1950s","hallmarks":["The New Typography: asymmetric layouts, sans-serif type and no ornament","Bars, rules and white space doing the structural work","Red and black only; later a return to classical book design at Penguin"],"works":["Die neue Typographie (1928)","Phoebus-Palast cinema posters, Munich (1926 to 1927)","Penguin Composition Rules (1947)"]}}
*/
/*CSS
:root{--bg:#f3efe6;--fg:#111;--acc:#d9271c;--bar-font:'Archivo',sans-serif;--head-font:'Archivo',sans-serif}
#mm-stage{background:#f3efe6;overflow:hidden}
.rule{position:absolute;background:#111}.r1{left:8%;top:14%;width:4px;height:76%}.r2{left:8%;top:62%;width:70%;height:14px;background:#d9271c}
#met{position:absolute;left:12%;top:16%;font:800 clamp(42px,6.5vw,104px)/.92 'Archivo';letter-spacing:-.03em;text-transform:lowercase}
#met span{color:#d9271c}
.pick{position:absolute;left:12%;top:68%;display:flex;gap:30px;font:400 14px 'Archivo Narrow'}
.pick div{display:flex;flex-direction:column;gap:4px}.pick b{font:800 11px 'Archivo';letter-spacing:.2em}
.pick button{font:400 15px 'Archivo Narrow';text-align:left;border:0;background:none;cursor:pointer;padding:1px 0}.pick button.on{color:#d9271c;font-weight:800}
.ctl{position:absolute;right:6%;top:16%;width:220px;display:flex;flex-direction:column;gap:10px;font:400 13px 'Archivo'}
.ctl input{accent-color:#d9271c}.ctl button{font:800 14px 'Archivo';background:#111;color:#f3efe6;border:0;padding:8px;cursor:pointer}
#cv{position:absolute;right:6%;bottom:60px;width:300px;height:160px}
*/
/*HTML
<div class="rule r1"></div><div class="rule r2"></div><div id="met"></div>
<div class="pick"><div id="pa"><b>1 · RHYTHM OF</b></div><div id="pb"><b>2 · BODY OF</b></div></div>
<div class="ctl"><b>STRIP ORNAMENT</b><input id="strip" type="range" min="0" max="1" step="0.01" value="0.3"><button id="swap">SWAP</button><div id="note"></div></div><canvas id="cv"></canvas>
*/
// each image has a rhythm (16 steps, accent weights; 0.3 marks an ornament) and a body (how one hit sounds)
const IM = {
  train: { r: [1, 0, .3, .3, .8, 0, .3, .3, 1, 0, .3, .3, .8, 0, .3, .3], body: (t, p, g) => MM.noise(t, 0.08, { freq: 300 * p, q: 3, gain: g * 0.6 }) },
  bird: { r: [0, 0, 1, .3, .3, 0, 0, 0, 0, 1, 0, .3, 0, 0, .3, 0], body: (t, p, g) => MM.tone(2400 * p, t, 0.07, { glide: 3600 * p, gain: g * 0.15 }) },
  heart: { r: [1, .6, 0, 0, 0, 0, 0, 0, 1, .6, 0, 0, 0, 0, 0, .3], body: (t, p, g) => MM.tone(55 * p, t, 0.2, { glide: 40 * p, gain: g * 0.8 }) },
  rain: { r: [.3, .6, .3, .3, .6, .3, .3, .6, .3, .3, .6, .3, .3, .6, .3, .3], body: (t, p, g) => MM.noise(t, 0.02, { freq: 6000 * p, q: 8, gain: g * 0.4 }) },
  bell: { r: [1, 0, 0, 0, 0, 0, .3, 0, .8, 0, 0, 0, 0, 0, 0, 0], body: (t, p, g) => MM.tone(440 * p, t, 1.5, { partials: [[1, 1], [2.76, 0.5], [5.4, 0.3]], gain: g * 0.12, send: { rev: 0.3 } }) },
  sea: { r: [1, .3, .3, .3, .3, .3, .3, .3, 0, 0, 0, 0, 0, 0, 0, 0], body: (t, p, g) => MM.noise(t, 0.9, { freq: 500 * p, sweep: 1500 * p, q: 1, gain: g * 0.3 }) },
  clock: { r: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], body: (t, p, g) => MM.noise(t, 0.01, { freq: 3500 * p, q: 10, gain: g * 0.7 }) },
  voice: { r: [1, 0, .6, 0, .3, .8, 0, .3, 1, 0, .3, .6, 0, .3, .8, 0], body: (t, p, g) => { const B = MM.smp(0, 'voice'); MM.play(B, t, { offset: ((p * 7) % 1) * B.duration * 0.8, dur: 0.18, rate: p, gain: g * 0.9, fadeOut: 0.04 }); } } };
const NAMES = Object.keys(IM); let A = 'train', Bn = 'voice', strip = 0.3, flash = [];
function ui() { ['pa', 'pb'].forEach((id, k) => { const box = MM.$('#' + id); box.querySelectorAll('button').forEach((b) => b.remove()); NAMES.forEach((n) => { const b = MM.h('button', { class: (k ? Bn : A) === n ? 'on' : '' }, n); b.onclick = () => { k ? (Bn = n) : (A = n); ui(); }; box.append(b); }); });
  MM.$('#met').innerHTML = `the ${A}<br>is <span>${/^[aeiou]/.test(Bn) ? 'an' : 'a'} ${Bn}</span>`; }
ui(); MM.$('#strip').oninput = (e) => (strip = +e.target.value); MM.$('#swap').onclick = () => { [A, Bn] = [Bn, A]; ui(); };
const C = MM.canvas('#cv'); let cur = 0;
MM.init({ bpm: 100, div: 4,
  step(i, t, sd) { const s = i % 16, w = IM[A].r[s]; cur = s; if (!w) return; if (w < 1 && w <= strip + 0.05 && w < 0.99) return; // stripped ornament
    const p = Math.pow(2, ([0, 3, 7, 10, 12][(Math.floor(i / 16) + s) % 5] * (1 - strip)) / 12); IM[Bn].body(t, p, w); if (s === 0 && strip < 0.9) IM[A].body(t, 1, 0.25); flash[s] = 1;
    MM.$('#note').textContent = strip > 0.8 ? 'nothing left but the metaphor' : strip > 0.4 ? 'adjectives removed' : 'some ornament remains'; },
  draw() { C.fit(); const g = C.g, w = C.w, h = C.h; g.clearRect(0, 0, w, h); IM[A].r.forEach((v, s) => { const kept = v && (v >= 0.99 || v > strip + 0.05); g.fillStyle = kept ? (s === cur && MM.playing ? '#d9271c' : '#111') : 'rgba(0,0,0,.12)'; const bh = v * h * 0.9; g.fillRect(s * (w / 16) + 2, h - bh, w / 16 - 4, bh); }); }
});
