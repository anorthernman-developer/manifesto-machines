/*META
{"title":"Cut-up Hat","idea":"Your loop is cut into words, shaken in a hat and played back in the order the pieces come out.","how":"Press PLAY. The loop is cut into slices and each slice gets a newspaper word. SHAKE THE HAT draws a new order, which then repeats faithfully, as Tzara's recipe says. Click a word to take it out of the hat (it goes silent). CHAOS reshakes on every pass. Drop any loop to cut it up.","fonts":"family=Anton&family=Bodoni+Moda:ital,wght@0,700;1,400&family=Special+Elite&family=Courier+Prime","bpm":110,
"manifesto":{"name":"Dada Manifesto 1918","short":"Dada","author":"Tristan Tzara","year":"1918","where":"read in Zurich on 23 March 1918, published in Dada 3","ideas":["Dada rejects logic, systems and good taste; it is a protest against a culture that produced the First World War.","Meaning is suspect, so chance and nonsense are allowed into art.","Tzara's 1920 recipe 'To make a Dadaist poem' says: cut a newspaper article into words, shake them in a bag, and copy them out in the order they come out (paraphrase)."],"quotes":["DADA DOES NOT MEAN ANYTHING","I am against systems; the most acceptable system is on principle to have none."],"system":"The sample is the newspaper article and each slice is a word. Shaking the hat gives a chance order, which is then copied out 'conscientiously' on every pass, unless you choose chaos."},
"design":{"name":"David Carson","short":"David Carson","who":"David Carson, art director of Ray Gun","era":"California, early to mid 1990s","hallmarks":["Overlapping, cropped and clashing type, often hard to read on purpose","Mixed typefaces and sizes in one layout, set at odd angles","Grungy texture; the reader's feeling matters more than legibility"],"works":["Ray Gun magazine (1992 to 1995)","Ray Gun's Bryan Ferry interview set in Zapf Dingbats","The End of Print, book with Lewis Blackwell (1995)"]}}
*/
/*CSS
:root{--bg:#e9e5dc;--fg:#111;--acc:#ff4b12;--bar-font:'Courier Prime',monospace;--head-font:'Anton',Impact}
#mm-stage{background:repeating-linear-gradient(0deg,transparent 0 3px,rgba(0,0,0,.03) 3px 4px),var(--bg)}
#words{position:absolute;inset:0}
#words span{position:absolute;cursor:pointer;line-height:.85;white-space:nowrap;mix-blend-mode:multiply;transition:color .08s,opacity .2s;user-select:none}
#words span.now{color:var(--acc)!important;z-index:3}#words span.out{opacity:.12;text-decoration:line-through}
.mast{position:absolute;right:24px;top:10px;font:400 210px/.8 'Anton',Impact;color:transparent;-webkit-text-stroke:2px #111;transform:rotate(-90deg) translate(-60%,0);transform-origin:right top;pointer-events:none;opacity:.5}
.ctl{position:absolute;left:24px;bottom:16px;display:flex;gap:14px;align-items:center;font:14px 'Courier Prime';z-index:5;background:var(--bg);padding:8px}
.ctl button{font:400 22px 'Anton',Impact;background:#111;color:#e9e5dc;border:0;padding:8px 16px;transform:rotate(-2deg);cursor:pointer}.ctl button:hover{background:var(--acc)}
.ctl label{display:flex;gap:6px;align-items:center}.ctl input[type=range]{accent-color:var(--acc)}
.order{position:absolute;left:24px;top:16px;font:italic 15px 'Bodoni Moda',serif;max-width:46%;z-index:4}
*/
/*HTML
<div class="mast">DADA</div>
<div id="words"></div>
<div class="order" id="order">the hat is full</div>
<div class="ctl"><button id="shake">SHAKE THE HAT</button><label>SLICES <input id="n" type="range" min="4" max="24" step="1" value="12"><b id="nv">12</b></label><label><input id="chaos" type="checkbox"> CHAOS</label></div>
*/
const LEX = ['ZÜRICH', 'nothing', 'cabaret', 'the', 'machine', 'SCISSORS', 'gun', 'violet', 'ANTI', 'hat', 'newspaper', 'bourgeois', 'moon', 'zigzag', 'BANG', 'logic', 'soft', 'hammer', 'Voltaire', 'eye', 'bicycle', 'nonsense', 'DADA', 'rhubarb', 'sweet', 'NO', 'abc', 'blue', 'clock', 'ideas', 'dance', 'skeleton'];
const FONTS = ["400 {s}px Anton,Impact", "italic 400 {s}px 'Bodoni Moda',serif", "700 {s}px 'Bodoni Moda',serif", "{s}px 'Special Elite',monospace", "{s}px 'Courier Prime',monospace"];
let N = 12, order = [], out = new Set(), words = [], buf = null, rbuf = null, pos = 0, cur = -1;
function reverseOf(b) { const c = MM.cloneBuf(b); for (let ch = 0; ch < c.numberOfChannels; ch++) c.getChannelData(ch).reverse(); return c; }
function layout() { const box = MM.$('#words'); box.innerHTML = ''; words = []; const W = innerWidth, H = innerHeight - 40;
  for (let i = 0; i < N; i++) { const s = 24 + Math.random() * 120, f = MM.pick(FONTS).replace('{s}', s.toFixed(0)); const w = MM.pick(LEX);
    const el = MM.h('span', { style: `font:${f};left:${Math.random() * (W - s * 3)}px;top:${50 + Math.random() * (H - s - 120)}px;transform:rotate(${(Math.random() * 2 - 1) * (Math.random() < 0.2 ? 90 : 14)}deg);color:${Math.random() < 0.15 ? '#ff4b12' : '#111'}` }, w);
    el.onclick = () => { out.has(i) ? out.delete(i) : out.add(i); el.classList.toggle('out', out.has(i)); }; box.append(el); words.push({ el, w }); } }
function shake() { order = [...Array(N).keys()]; for (let i = N - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; } pos = 0;
  MM.$('#order').textContent = order.map((i) => words[i].w).join(' '); MM.noise(MM.now, 0.35, { freq: 2500, q: 0.8, gain: 0.12 }); }
function prep() { buf = MM.smp(0, 'loop'); rbuf = reverseOf(buf); }
MM.$('#shake').onclick = () => { MM.ensure(); prep(); shake(); };
MM.$('#n').oninput = (e) => { N = +e.target.value; MM.$('#nv').textContent = N; out.clear(); layout(); shake(); };
layout();
MM.init({ bpm: 110, div: 4,
  setup() { shake(); },
  start() { if (!buf) prep(); },
  onSamples() { prep(); layout(); shake(); },
  step(i, t, sd) { if (!buf) prep(); if (!order.length) shake(); if (pos >= order.length) { pos = 0; if (MM.$('#chaos').checked) shake(); }
    const idx = order[pos++]; cur = idx; if (out.has(idx)) return; const sl = buf.duration / N, rev = idx % 5 === 3;
    MM.play(rev ? rbuf : buf, t, { offset: rev ? buf.duration - (idx + 1) * sl : idx * sl, dur: Math.min(sl, sd * 2), gain: 0.85, fadeOut: 0.015 }); },
  draw() { words.forEach((w, i) => w.el.classList.toggle('now', MM.playing && i === cur)); }
});
