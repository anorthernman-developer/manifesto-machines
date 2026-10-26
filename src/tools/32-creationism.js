/*META
{"title":"Make It Bloom","idea":"Don't sing the rose, make it bloom: build a new sound from nothing, partial by partial, then let it flower through your sample.","how":"Press PLAY. Draw on the sixteen bars to build a new sound from its harmonics (partials). Each column is one partial, from the fundamental on the left upward. The created sound plays as a slowly changing chord. Your sample is not copied either: it is made to bloom through a bank of resonators tuned to your partials, so it takes on the colour of your creation. NON SERVIAM randomises everything you have made. FLOWER makes the partials open and close like petals.","fonts":"family=Playfair+Display:ital,wght@0,400;0,900;1,400&family=Josefin+Sans:wght@300;600","bpm":70,
"manifesto":{"name":"Non serviam and Creacionismo","short":"Creacionismo","author":"Vicente Huidobro","year":"1914 to 1916","where":"Non serviam, a lecture in Santiago de Chile (1914); the poem Arte poética in El espejo de agua (Buenos Aires, 1916)","ideas":["The poet should not imitate nature but create new things, just as nature creates trees.","Non serviam: the artist refuses to be nature's servant.","The poet as 'a little god'."],"quotes":["Por qué cantáis la rosa, ¡oh Poetas! / Hacedla florecer en el poema (Why do you sing the rose, oh Poets? Make it bloom in the poem)"],"system":"You do not record or imitate a sound: you build one from pure harmonics, and even your sample is only allowed to sound through the new thing you have made."},
"design":{"name":"Alvin Lustig","short":"Alvin Lustig","who":"Alvin Lustig, American graphic designer, typographer and teacher","era":"Los Angeles and New York, 1940s to 1955","hallmarks":["Abstract, symbolic book covers that capture a book's spirit rather than illustrate it","Modernist forms drawn from Klee, Miró and Constructivism","Hand-drawn marks combined with sans type and flat, earthy colour"],"works":["New Directions book covers, including the New Classics series (from the 1940s)","The Ghost in the Underblows, Ward Ritchie Press (1940)","Covers for Noonday Press and Meridian Books (1950s)"]}}
*/
/*CSS
:root{--bg:#ede4d3;--fg:#262019;--acc:#c2411f;--bar-font:'Josefin Sans',sans-serif;--head-font:'Playfair Display',serif}
#mm-stage{background:#ede4d3;display:grid;grid-template-columns:1fr 1.25fr}
.l{padding:5% 6%;display:flex;flex-direction:column;gap:14px}.l h1{margin:0;font:900 clamp(40px,5vw,78px)/.95 'Playfair Display';color:#262019}.l h1 i{font-weight:400;color:#c2411f}
.l p{font:300 15px/1.5 'Josefin Sans';max-width:340px}.l button{font:600 15px 'Josefin Sans';letter-spacing:.2em;background:#262019;color:#ede4d3;border:0;padding:10px;cursor:pointer;width:200px}.l button.on{background:#c2411f}
#cv{width:100%;height:100%;display:block;touch-action:none;cursor:crosshair}
*/
/*HTML
<div class="l"><h1>hacedla<br><i>florecer</i></h1><p>Draw the partials. Build a sound that nature never made, then let the sample bloom through it.</p><button id="ns">NON SERVIAM</button><button id="fl">FLOWER</button></div><canvas id="cv"></canvas>
*/
const NP = 16; let P = [1, 0.5, 0.7, 0.2, 0.45, 0, 0.3, 0.1, 0.25, 0, 0.15, 0, 0.12, 0, 0, 0.08], flower = false, bank = null, base = 98, phase = 0;
const C = MM.canvas('#cv');
MM.drag(C.cv, (x, y, ph) => { if (ph === 'up') return; const k = MM.clamp(Math.floor((x / C.cv.clientWidth) * NP), 0, NP - 1); P[k] = MM.clamp(1 - y / (C.cv.clientHeight * 0.85), 0, 1); retune(); });
MM.$('#ns').onclick = () => { P = P.map((v, k) => (Math.random() < 0.55 ? Math.random() / (1 + k * 0.15) : 0)); P[0] = Math.max(P[0], 0.4); retune(); };
MM.$('#fl').onclick = (e) => { flower = !flower; e.target.classList.toggle('on', flower); };
function mkBank() { const c = MM.ctx, inp = c.createGain(), f = []; for (let k = 0; k < NP; k++) { const b = c.createBiquadFilter(), g = c.createGain(); b.type = 'bandpass'; b.Q.value = 40; b.frequency.value = base * (k + 1); g.gain.value = P[k] * 3; inp.connect(b); b.connect(g); g.connect(MM.out); f.push({ b, g }); } bank = { inp, f }; }
function retune() { if (!bank) return; bank.f.forEach((n, k) => { n.b.frequency.setTargetAtTime(base * (k + 1), MM.now, 0.05); n.g.gain.setTargetAtTime(eff(k) * 3, MM.now, 0.05); }); }
const eff = (k) => (flower ? P[k] * (0.5 + 0.5 * Math.sin(phase + k * 0.8)) : P[k]);
const ROOTS = [98, 87.31, 110, 73.42];
MM.init({ bpm: 70, div: 2,
  setup() { mkBank(); },
  step(i, t, sd) { if (!bank) mkBank(); const s = i % 8; if (s === 0) { base = ROOTS[Math.floor(i / 8) % 4]; retune(); const parts = P.map((v, k) => [k + 1, eff(k)]).filter((p) => p[1] > 0.02); MM.tone(base, t, sd * 8, { partials: parts, gain: 0.1, attack: 0.6, release: 1.5, send: { rev: 0.4 } }); MM.play(MM.smp(0, 'texture'), t, { gain: 0.9, dest: bank.inp }); }
    if (s === 4) MM.play(MM.smp(0, 'texture'), t, { gain: 0.7, rate: 0.5, dest: bank.inp });
    const k = [0, 2, 4, 3, 5, 7, 6, 9][s]; if (P[k] > 0.05) MM.tone(base * (k + 1) * 2, t, sd * 1.5, { gain: P[k] * 0.05, release: 0.5, pan: (k / NP) * 2 - 1, send: { dly: 0.3 } }); },
  draw(ts) { C.fit(); phase = ts / 900; if (flower) retune(); const g = C.g, w = C.w, h = C.h; g.fillStyle = '#ede4d3'; g.fillRect(0, 0, w, h); const bw = w / NP, cx = w / 2, cy = h * 0.45;
    // the bloom: petals sized by partials (Lustig-like flat shapes)
    P.forEach((v, k) => { const a = (k / NP) * Math.PI * 2 + ts / 8000, r = 30 + eff(k) * Math.min(w, h) * 0.32; g.fillStyle = ['#c2411f', '#262019', '#d9a441', '#5b7a5a'][k % 4]; g.globalAlpha = 0.75; g.beginPath(); g.ellipse(cx + Math.cos(a) * r * 0.5, cy + Math.sin(a) * r * 0.5, r * 0.5, 10 + eff(k) * 20, a, 0, 7); g.fill(); }); g.globalAlpha = 1; g.fillStyle = '#ede4d3'; g.beginPath(); g.arc(cx, cy, 22, 0, 7); g.fill();
    // partial bars
    P.forEach((v, k) => { g.fillStyle = '#262019'; g.fillRect(k * bw + 3, h * 0.85 - eff(k) * h * 0.25, bw - 6, eff(k) * h * 0.25 + 2); g.font = "300 11px 'Josefin Sans'"; g.fillText(k + 1, k * bw + bw / 2 - 4, h * 0.85 + 16); }); g.strokeStyle = '#262019'; g.beginPath(); g.moveTo(0, h * 0.85); g.lineTo(w, h * 0.85); g.stroke(); }
});
