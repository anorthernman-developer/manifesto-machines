/*META
{"title":"Credo","idea":"Three coins tossed six times build an I Ching hexagram, and the hexagram picks the sound, its length and its loudness from a chart.","how":"Press PLAY. For each event the machine tosses three coins six times to build a hexagram (1 to 64), which picks one of 64 sounds from the chart (slices of your sample, tones, noises and silences). Two more hexagrams pick its duration and its dynamics. Changing lines (old yin or old yang) turn the sound into a second sound part way through. You can lock a row of the chart to exclude it, or press LISTEN to let the noise of the room in.","fonts":"family=Shippori+Mincho:wght@500;800&family=Zen+Kaku+Gothic+New:wght@400;700","bpm":60,
"manifesto":{"name":"The Future of Music: Credo","short":"Cage's Credo","author":"John Cage","year":"1937 (a talk in Seattle; published 1958)","where":"given as a talk to the Seattle Arts Society, 1937; printed in Silence (1961)","ideas":["Noise is music: composers should use the whole field of sound, including the sounds of electrical instruments.","Rhythmic structure should replace harmony as the basis of composition.","Later (Music of Changes, 1951) Cage used I Ching coin tosses and charts so that his likes and dislikes did not decide the music."],"quotes":["Wherever we are, what we hear is mostly noise. When we ignore it, it disturbs us. When we listen to it, we find it fascinating."],"system":"Every decision is made by chance: coin tosses build hexagrams, and the hexagrams read a chart of 64 sounds, 64 durations and 64 dynamics. Your only jobs are to set up the chart (your sample) and to listen."},
"design":{"name":"Ikko Tanaka","short":"Ikko Tanaka","who":"Ikko Tanaka, Japanese graphic designer","era":"Tokyo, 1950s to 1990s","hallmarks":["Flat planes of pure colour forming simple geometric figures","Japanese tradition (Noh, Rimpa, kabuki) reduced to modernist geometry","Large space, a grid and calm, confident shapes"],"works":["Nihon Buyo poster (1981), the geometric geisha face","Muji art direction, co-founder (from 1980)","Sharaku poster series (1990s)"]}}
*/
/*CSS
:root{--bg:#efe7d8;--fg:#1d1d1d;--acc:#d8452c;--bar-font:'Zen Kaku Gothic New',sans-serif;--head-font:'Shippori Mincho',serif}
#mm-stage{display:grid;grid-template-columns:380px 1fr;background:#efe7d8}
.l{position:relative;background:#1d6b8a;overflow:hidden}
.l .a{position:absolute;left:0;top:0;width:100%;height:46%;background:#d8452c}.l .b{position:absolute;left:30%;top:30%;width:70%;height:40%;background:#f3c64a;border-radius:0 0 0 100%}.l .c{position:absolute;left:0;bottom:0;width:60%;height:34%;background:#1d1d1d}
#hex{position:absolute;left:40px;top:60px;width:170px}#hex div{height:20px;margin:0 0 12px;display:flex;gap:22px}#hex i{flex:1;background:#efe7d8}#hex .ch i{background:#fff;box-shadow:0 0 0 3px #1d1d1d}
.l h1{position:absolute;left:40px;bottom:30px;margin:0;color:#efe7d8;font:800 46px/1 'Shippori Mincho'}.l h1 small{display:block;font:400 13px 'Zen Kaku Gothic New';letter-spacing:.2em}
.r{padding:24px 30px;display:flex;flex-direction:column;gap:14px;font:400 13px 'Zen Kaku Gothic New'}
#chart{display:grid;grid-template-columns:30px repeat(8,1fr);gap:4px}
#chart div{aspect-ratio:1.7;display:flex;align-items:center;justify-content:center;font:700 11px 'Zen Kaku Gothic New';background:#fff;color:#1d1d1d}
#chart .row{background:none;cursor:pointer;font-size:16px}#chart .off{opacity:.25}#chart .on{background:#d8452c;color:#fff}
.k0{border-bottom:5px solid #1d6b8a}.k1{border-bottom:5px solid #f3c64a}.k2{border-bottom:5px solid #1d1d1d}.k3{border-bottom:5px solid #d6d0c4}
#info{font:500 20px 'Shippori Mincho'}.r button{align-self:start;font:700 14px 'Zen Kaku Gothic New';background:#1d1d1d;color:#efe7d8;border:0;padding:8px 16px;cursor:pointer}.r button.on{background:#d8452c}
*/
/*HTML
<div class="l"><div class="a"></div><div class="b"></div><div class="c"></div><div id="hex"></div><h1>易經<small>CHANCE OPERATIONS · 1951</small></h1></div>
<div class="r"><div id="info">toss the coins</div><div id="chart"></div><div>blue: your sample · yellow: tone · black: noise · grey: silence. Click a row number to lock it out of the chart.</div><button id="listen">LISTEN</button></div>
*/
let rowsOff = new Set(), cur = -1, lines = [], nextT = 0, listen = false, room = null;
const ch = MM.$('#chart'), cells = [];
for (let r = 0; r < 8; r++) { const rb = MM.h('div', { class: 'row' }, String(r + 1)); rb.onclick = () => { rowsOff.has(r) ? rowsOff.delete(r) : rowsOff.add(r); paint(); }; ch.append(rb); for (let c = 0; c < 8; c++) { const n = r * 8 + c, d = MM.h('div', { class: 'k' + kind(n) }, String(n + 1)); ch.append(d); cells[n] = d; } }
function kind(n) { return [0, 1, 2, 0, 1, 3, 0, 2][(n * 5 + (n >> 3)) % 8]; }
function paint() { cells.forEach((d, n) => { d.classList.toggle('off', rowsOff.has(n >> 3)); d.classList.toggle('on', n === cur); }); }
function toss() { const L = []; for (let k = 0; k < 6; k++) { const s = [0, 0, 0].reduce((a) => a + (Math.random() < 0.5 ? 2 : 3), 0); L.push(s); } return L; } // 6 old yin, 7 young yang, 8 young yin, 9 old yang
const num = (L, changed) => L.reduce((a, v, k) => a | ((changed ? (v === 6 ? 1 : v === 9 ? 0 : v % 2) : v % 2) << k), 0);
function showHex(L) { const H = MM.$('#hex'); H.innerHTML = ''; [...L].reverse().forEach((v) => { const d = MM.h('div', { class: v === 6 || v === 9 ? 'ch' : '' }); d.append(MM.h('i')); if (v % 2 === 0) d.append(MM.h('i')); else d.firstChild.style.flex = '1'; H.append(d); }); }
function voice(n, t, d, gain) { const B = MM.smp(0, 'loop'), k = kind(n);
  if (k === 0) MM.play(B, t, { offset: (n / 64) * B.duration * 0.95, dur: d, gain: gain * 1.4, fadeIn: 0.005, fadeOut: Math.min(0.3, d / 3), rate: 0.5 + ((n * 7) % 8) / 5, pan: ((n % 8) - 3.5) / 4 });
  if (k === 1) MM.tone(MM.mtof(36 + ((n * 11) % 48)), t, d, { partials: [[1, 1], [2.01, 0.3], [3.9, 0.15]], gain: gain * 0.35, attack: 0.01, release: d * 0.5, pan: ((n % 8) - 3.5) / 4 });
  if (k === 2) MM.noise(t, d, { freq: 200 + ((n * 37) % 64) * 120, q: 1 + (n % 12), gain: gain * 0.6, pan: ((n % 8) - 3.5) / 4 }); }
function event(t) { let L, n, tries = 0; do { L = toss(); n = num(L, false); tries++; } while (rowsOff.has(n >> 3) && tries < 30); lines = L; const n2 = num(L, true), dur = 0.08 + Math.pow(num(toss(), false) / 63, 2) * 3.5, dyn = 0.15 + (num(toss(), false) / 63) * 0.85;
  voice(n, t, n2 !== n ? dur * 0.5 : dur, dyn); if (n2 !== n && !rowsOff.has(n2 >> 3)) voice(n2, t + dur * 0.5, dur * 0.5, dyn); cur = n; showHex(L); paint();
  MM.$('#info').textContent = `hexagram ${n + 1}${n2 !== n ? ' → ' + (n2 + 1) : ''} · ${dur.toFixed(2)} s · ${['ppp', 'pp', 'p', 'mp', 'mf', 'f', 'ff', 'fff'][Math.floor(dyn * 7.99)]}`; return 0.05 + Math.pow(num(toss(), false) / 63, 1.5) * 2; }
MM.$('#listen').onclick = () => { listen = !listen; MM.$('#listen').classList.toggle('on', listen); if (listen && navigator.mediaDevices) navigator.mediaDevices.getUserMedia({ audio: true }).then((s) => { room = MM.ctx.createMediaStreamSource(s); const g = MM.ctx.createGain(); g.gain.value = 0.5; room.connect(g); g.connect(MM.out); room._g = g; }).catch(() => { MM.toast('No microphone: listening to the machine instead.'); }); else if (room) { room._g.disconnect(); room = null; } };
MM.init({ bpm: 60,
  setup() { showHex([7, 8, 7, 8, 7, 8]); paint(); },
  start() { nextT = MM.now + 0.05; },
  tick(now) { if (now + 0.1 >= nextT) { const t = Math.max(nextT, now + 0.02); nextT = t + event(t); } if (listen && !room && Math.random() < 0.02) MM.noise(now + 0.05, 0.5, { freq: 400 + Math.random() * 4000, q: 0.7, gain: 0.03 }); }
});
