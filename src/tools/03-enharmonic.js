/*META
{"title":"Enharmonic","idea":"A quarter-tone melody machine in free metre, where every bar chooses its own length.","how":"Press PLAY. Each block in the chain is one bar and its width is its number of beats. ENHARMONIC moves from ordinary semitones to quarter tones and free microtones. FREEDOM lets bar lengths swing further from 4. MACHINE turns up the factory pulse underneath. Your sample is the choir chord at the start of each bar, retuned in quarter tones.","fonts":"family=Rubik+Mono+One&family=Work+Sans:wght@400;700","bpm":112,
"manifesto":{"name":"Manifesto of Futurist Musicians","short":"Futurist Musicians","author":"Francesco Balilla Pratella","year":"1910","where":"Milan, 11 October 1910 (followed by the Technical Manifesto of Futurist Music, 1911)","ideas":["Young composers should leave the conservatories and academies and study freely (paraphrase).","The Technical Manifesto called for the 'enharmonic' mode, using intervals smaller than a semitone.","It also called for free rhythm, breaking out of fixed, regular bars, and for music that carries the soul of crowds, factories, trains and aeroplanes (paraphrase)."],"quotes":[],"system":"Pitches move on a 24-step quarter-tone scale, with free detuning on top. Every bar picks its own number of beats, so the metre is never fixed, and a mechanical pulse runs underneath as the 'factory'."},
"design":{"name":"Fortunato Depero","short":"Depero","who":"Fortunato Depero, Futurist painter and designer","era":"Rovereto and Milan, 1915 to 1930s","hallmarks":["Chunky, blocky lettering built from geometric pieces","Mechanical puppet figures and toy-like machines","Strong red, black and cream, with flat bright accents"],"works":["Depero Futurista, the 'bolted book' (1927)","Campari advertising and the Campari Soda bottle (1932)","Casa d'Arte Futurista Depero, Rovereto"]}}
*/
/*CSS
:root{--bg:#f3ead6;--fg:#1a1410;--acc:#e3341c;--bar-font:'Work Sans',sans-serif;--head-font:'Rubik Mono One',sans-serif}
#mm-stage{padding:26px 34px;display:flex;flex-direction:column;gap:14px}
h1{font:400 clamp(40px,7vw,92px)/.9 'Rubik Mono One',sans-serif;margin:0;letter-spacing:-.03em}h1 span{color:var(--acc)}h1 em{font-style:normal;background:var(--fg);color:var(--bg);padding:0 .15em}
.bolts{display:flex;gap:10px;align-items:center;font:700 13px 'Work Sans';letter-spacing:.1em}.bolt{width:22px;height:22px;border-radius:50%;background:radial-gradient(circle at 40% 40%,#aaa,#333);box-shadow:inset 0 0 0 3px #222}
.chain{display:flex;gap:6px;height:110px;align-items:stretch;overflow:hidden}
.chain div{background:var(--fg);color:var(--bg);font:400 30px 'Rubik Mono One';display:flex;align-items:flex-end;padding:6px 8px;flex:none;transition:background .15s;position:relative}
.chain div.now{background:var(--acc)}.chain div i{position:absolute;top:0;bottom:0;width:3px;background:#f3ead6}
.row{display:flex;gap:30px;font:700 13px 'Work Sans';letter-spacing:.12em;align-items:center}.row input{accent-color:var(--acc);width:170px}
canvas{flex:1;width:100%;min-height:120px;background:#fffaf0;border:6px solid var(--fg)}
*/
/*HTML
<h1>ENHAR<span>MONIC</span> <em>1910</em></h1>
<div class="bolts"><span class="bolt"></span>FREE RHYTHM · QUARTER TONES · THE SOUL OF FACTORIES<span class="bolt"></span></div>
<div class="chain" id="chain"></div>
<div class="row"><label>ENHARMONIC <input id="enh" type="range" min="0" max="1" step="0.01" value="0.6"></label><label>FREEDOM <input id="free" type="range" min="0" max="1" step="0.01" value="0.6"></label><label>MACHINE <input id="mach" type="range" min="0" max="1" step="0.01" value="0.5"></label></div>
<canvas id="cv"></canvas>
*/
let enh = 0.6, free = 0.6, mach = 0.5, bar = { len: 4, pos: 0, idx: 0 }, k = 0, notes = [];
['enh', 'free', 'mach'].forEach((id) => (MM.$('#' + id).oninput = (e) => { if (id === 'enh') enh = +e.target.value; if (id === 'free') free = +e.target.value; if (id === 'mach') mach = +e.target.value; }));
const chain = MM.$('#chain'), C = MM.canvas('#cv');
function newBar() { const spread = Math.round(free * 4); const len = MM.clamp(4 + Math.round((Math.random() * 2 - 1) * spread), 2, 9); bar = { len, pos: 0, idx: bar.idx + 1 };
  const d = MM.h('div', { class: 'now', style: `width:${len * 34}px` }, String(len)); for (let b = 1; b < len; b++) d.append(MM.h('i', { style: `left:${b * 34}px` }));
  MM.$$('#chain div').forEach((x) => x.classList.remove('now')); chain.prepend(d); while (chain.children.length > 14) chain.lastChild.remove(); }
function pitch(step24) { const cents = step24 * 50 + (Math.random() * 2 - 1) * 40 * Math.max(0, enh - 0.6) * 2.5; const q = enh < 0.3 ? Math.round(cents / 100) * 100 : cents; return 220 * Math.pow(2, q / 1200); }
MM.init({ bpm: 112, div: 2,
  start() { bar.idx = 0; newBar(); },
  step(i, t, sd) { const beatStep = i % 2 === 0;
    if (beatStep && bar.pos >= bar.len) newBar();
    if (beatStep && bar.pos === 0) { const b = MM.smp(0, 'tone'); [0, 7, 15].forEach((iv, j) => MM.play(b, t, { detune: (k + iv) * 50 - 1200 + (enh > 0.3 ? 0 : 0), gain: 0.32, dur: Math.min(b.duration, sd * 2 * bar.len), fadeOut: 0.2, pan: (j - 1) * 0.6, send: { rev: 0.3 } })); MM.tone(55 * Math.pow(2, k / 24), t, sd * 2 * bar.len * 0.9, { type: 'sawtooth', gain: 0.12, cutoff: 400 }); }
    // melody: random walk in quarter tones
    if (Math.random() < 0.72) { k += MM.pick([-3, -2, -1, 1, 1, 2, 3, 5]); if (k > 30) k -= 12; if (k < -10) k += 12; const f = pitch(k); MM.tone(f, t, sd * (Math.random() < 0.3 ? 2 : 0.9), { type: 'square', gain: 0.08, cutoff: 2400, partials: [[1, 1], [2.001, 0.3]], send: { rev: 0.15 } }); notes.push({ t, f, len: sd }); if (notes.length > 140) notes.shift(); }
    // the factory
    if (mach > 0.02) { if (i % 2 === 0) MM.tone(80, t, 0.05, { type: 'triangle', gain: 0.4 * mach, glide: 40 }); if (Math.random() < mach * 0.8) MM.noise(t, 0.04, { freq: 2500 + Math.random() * 4000, q: 9, gain: 0.25 * mach }); if (i % 6 === 3) MM.tone(310, t, 0.15, { partials: [[1, 1], [2.76, 0.6], [5.4, 0.3]], gain: 0.1 * mach }); }
    if (beatStep) bar.pos++; },
  draw() { C.fit(); const g = C.g, W = C.w, H = C.h, now = MM.now; g.clearRect(0, 0, W, H);
    for (let y = 0; y < 48; y++) { g.fillStyle = y % 2 ? '#f3ead6' : '#fffaf0'; g.fillRect(0, H - (y + 1) * H / 48, W, H / 48); }
    notes.forEach((n) => { const x = W - (now - n.t) * 120, y = H - (Math.log2(n.f / 110) / 3) * H; if (x < -40) return; g.fillStyle = n.f > 440 ? '#e3341c' : '#1a1410'; g.fillRect(x, y - 7, Math.max(10, n.len * 120), 14); g.beginPath(); g.arc(x, y, 9, 0, 7); g.fill(); }); }
});
