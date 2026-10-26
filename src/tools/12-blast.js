/*META
{"title":"BLAST / BLESS","idea":"Every instrument is a word on the wall: BLAST it and it hits hard and dirty, BLESS it and it turns soft and holy.","how":"Press PLAY. Click a word to cycle it: off, then BLAST (loud, distorted, short), then BLESS (gentle, sustained, reverberant). Your sample is the word SAMPLE. Drag the vortex in the corner: round and round raises the energy, and the centre of the vortex is stillness, where everything drops to half time.","fonts":"family=Anton&family=Archivo:wght@400;900","bpm":124,
"manifesto":{"name":"BLAST, Manifesto of the Vorticists","short":"Vorticism","author":"Wyndham Lewis, with Ezra Pound, Gaudier-Brzeska and others","year":"1914","where":"BLAST No. 1, London, published June/July 1914 in a puce-pink cover","ideas":["Lists of things to BLAST and things to BLESS, set in huge black type.","The Vortex: a point of maximum energy, and at its centre a point of stillness.","Against both sentimental Victorian England and Italian Futurism, while sharing its love of the machine."],"quotes":["BLAST HUMOUR","BLESS the HAIRDRESSER"],"system":"The only controls are BLAST and BLESS. Every sound has a blasted and a blessed version, and the vortex sets the energy, with stillness at its centre."},
"design":{"name":"Paula Scher","short":"Paula Scher","who":"Paula Scher, Pentagram partner","era":"New York, 1990s to now","hallmarks":["Type as image: huge mixed wood-type letters fill the whole surface","Words stacked, tilted and cut off at the edges, like a loud street wall","Few colours, maximum volume"],"works":["Bring in 'da Noise, Bring in 'da Funk posters for The Public Theater (1995)","The Public Theater identity (1994)","Painted maps series (from the 1990s)"]}}
*/
/*CSS
:root{--bg:#f2a7b8;--fg:#111;--acc:#111;--bar-font:'Archivo',sans-serif;--head-font:'Anton',sans-serif}
#mm-stage{background:#f2a7b8;overflow:hidden}
#wall{position:absolute;inset:0;display:flex;flex-wrap:wrap;align-content:flex-start;gap:0 18px;padding:10px 20px;line-height:.86}
.w{font:400 clamp(50px,9vw,150px)/.86 'Anton';text-transform:uppercase;cursor:pointer;user-select:none;color:rgba(17,17,17,.18);transition:color .1s,transform .1s}
.w small{font:900 .26em 'Archivo';display:block;letter-spacing:.05em;line-height:1}
.w.blast{color:#111}.w.bless{color:#fff;-webkit-text-stroke:2px #111}
.w.hit{transform:scale(1.06) rotate(-2deg)}
#vx{position:absolute;right:14px;bottom:14px;width:220px;height:220px;border-radius:50%;background:#111;touch-action:none;cursor:grab}
.cap{position:absolute;right:250px;bottom:20px;font:900 16px 'Archivo';text-align:right;max-width:240px}
*/
/*HTML
<div id="wall"></div><canvas id="vx"></canvas><div class="cap" id="cap">THE VORTEX: circle it for energy. the centre is stillness.</div>
*/
const WORDS = ['KICK', 'SNARE', 'BASS', 'SAMPLE', 'CHOIR', 'BELLS', 'NOISE', 'HAT', 'SIREN', 'ORGAN'];
const st = { KICK: 1, SNARE: 1, BASS: 2, SAMPLE: 1, CHOIR: 2, BELLS: 0, NOISE: 0, HAT: 1, SIREN: 0, ORGAN: 0 };
const els = {}; const wall = MM.$('#wall');
function lab(w) { els[w].innerHTML = `<small>${['·', 'BLAST', 'BLESS'][st[w]]}</small>${w}`; els[w].className = 'w ' + ['', 'blast', 'bless'][st[w]]; }
WORDS.forEach((w) => { els[w] = MM.h('div', { class: 'w' }); els[w].onclick = () => { st[w] = (st[w] + 1) % 3; lab(w); }; wall.append(els[w]); lab(w); });
let energy = 0.5, still = false, va = 0, lastA = null;
const V = MM.canvas('#vx');
MM.drag(V.cv, (x, y, ph) => { const dx = x / V.cv.clientWidth - 0.5, dy = y / V.cv.clientHeight - 0.5, r = Math.hypot(dx, dy), a = Math.atan2(dy, dx); still = r < 0.12 && ph !== 'up'; if (ph === 'move' && lastA !== null) { let d = a - lastA; if (d > Math.PI) d -= 2 * Math.PI; if (d < -Math.PI) d += 2 * Math.PI; energy = MM.clamp(energy + Math.abs(d) * 0.04, 0, 1); } lastA = ph === 'up' ? null : a; if (ph === 'up') still = false; });
const R = (s, i) => (((s * 9301 + i * 49297) % 233280) / 233280);
function hit(w) { els[w].classList.add('hit'); setTimeout(() => els[w].classList.remove('hit'), 90); }
MM.init({ bpm: 124, div: 4,
  step(i, t, sd) { const s = i % 16; if (still && i % 2) return; energy = Math.max(0.15, energy - 0.0015); const dens = 0.25 + energy * 0.7;
    const out = (w, fn) => { const m = st[w]; if (!m) return; fn(m === 1); hit(w); };
    if (s % 4 === 0) out('KICK', (b) => MM.play(MM.fb.kick, t, b ? { gain: 1 } : { gain: 0.35, send: { rev: 0.4 } }));
    if (s === 4 || s === 12) out('SNARE', (b) => MM.play(MM.fb.snare, t, b ? { gain: 0.9, rate: 0.9 } : { gain: 0.25, send: { rev: 0.7 } }));
    if (s % 2 === 1 && R(i, 3) < dens + 0.2) out('HAT', (b) => MM.play(MM.fb.hat, t, b ? { gain: 0.5 } : { gain: 0.12, rate: 0.7, send: { dly: 0.4 } }));
    if (s % 8 === 0) out('BASS', (b) => b ? MM.tone(MM.mtof(MM.pick([33, 33, 36, 31])), t, sd * 3, { type: 'sawtooth', gain: 0.5, cutoff: 600 + energy * 1500, q: 8 }) : MM.tone(MM.mtof(33), t, sd * 8, { type: 'sine', gain: 0.4, attack: 0.1 }));
    if (s % 4 === 2 && R(i, 7) < dens) out('SAMPLE', (b) => { const B = MM.smp(0, 'loop'); b ? MM.play(B, t, { offset: (Math.floor(R(i, 1) * 8) / 8) * B.duration, dur: sd * 1.5, gain: 0.9, rate: 1.0, filter: { type: 'highpass', freq: 200 } }) : MM.play(B, t, { offset: R(i, 2) * B.duration * 0.7, dur: sd * 8, gain: 0.35, rate: 0.5, fadeIn: 0.2, fadeOut: 0.4, send: { rev: 0.8 } }); });
    if (s === 0) out('CHOIR', (b) => [0, 7, 12, 16].forEach((iv, k) => MM.tone(MM.mtof(57 + iv), t, b ? sd * 2 : sd * 15, { type: b ? 'square' : 'triangle', gain: b ? 0.06 : 0.05, attack: b ? 0.005 : 0.4, cutoff: b ? 4000 : 1500, pan: k / 2 - 0.75, send: { rev: b ? 0 : 0.6 } })));
    if (s % 3 === 0 && R(i, 11) < dens * 0.6) out('BELLS', (b) => MM.tone(MM.mtof(MM.deg(Math.floor(R(i, 5) * 8), 'minpent', 72)), t, b ? 0.15 : 2, { partials: [[1, 1], [2.4, 0.5], [5.9, 0.3]], gain: b ? 0.2 : 0.08, send: { rev: b ? 0.1 : 0.6 } }));
    if (s === 14 && R(i, 13) < dens) out('NOISE', (b) => MM.noise(t, b ? sd : sd * 8, b ? { freq: 2000, q: 0.5, gain: 0.5 } : { freq: 500, sweep: 3000, q: 4, gain: 0.12, send: { rev: 0.5 } }));
    if (s === 8) out('SIREN', (b) => MM.tone(600, t, sd * 6, { type: b ? 'sawtooth' : 'sine', glide: b ? 1400 : 700, gain: b ? 0.1 : 0.06, cutoff: 3000 }));
    if (s % 8 === 4) out('ORGAN', (b) => [0, 3, 7].forEach((iv) => MM.tone(MM.mtof(45 + iv), t, b ? sd : sd * 7, { partials: [[1, 1], [2, 0.5], [3, 0.3], [4, 0.2]], gain: b ? 0.1 : 0.05, attack: b ? 0 : 0.2 }))); },
  draw() { V.fit(); const g = V.g, W = V.w, H = V.h, t = performance.now() / 1000; g.clearRect(0, 0, W, H); g.save(); g.translate(W / 2, H / 2);
    for (let k = 0; k < 40; k++) { const r = (k / 40) * W * 0.5, a = t * (1 + energy * 6) * (1 - k / 50) + k * 0.4; g.strokeStyle = k % 2 ? '#f2a7b8' : '#fff'; g.lineWidth = 2; g.beginPath(); g.arc(0, 0, r, a, a + 1.2 + energy * 2); g.stroke(); }
    g.fillStyle = still ? '#fff' : '#f2a7b8'; g.beginPath(); g.arc(0, 0, W * 0.1, 0, 7); g.fill(); g.restore(); MM.$('#cap').textContent = still ? 'STILLNESS. half time.' : `THE VORTEX · energy ${Math.round(energy * 100)}%`; }
});
