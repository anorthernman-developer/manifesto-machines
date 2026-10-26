/*META
{"title":"Change Nature","idea":"The harmonic 'laws' of music are editable: choose the octave, the number of notes in it and how the overtones stretch.","how":"Press PLAY. A chord machine plays a progression. Nothing about the tuning is fixed: EDO sets how many equal steps divide the octave (12 is normal; try 5, 7, 19, 22 or 31). OCTAVE stretches the octave itself away from 2:1. OVERTONES stretches the harmonics of every tone so that the timbre matches the new tuning. Your sample is tuned into the same system. NATURALISE resets to 12, 2:1 and harmonic; ALIENATE picks a strange world.","fonts":"family=Gloock&family=Caveat:wght@600&family=DM+Mono","bpm":92,
"manifesto":{"name":"Xenofeminism: A Politics for Alienation","short":"Xenofeminism","author":"Laboria Cuboniks (Helen Hester, Diann Bauer, Amy Ireland, Katrin Kolo, Lucca Fraser, Patricia Reed)","year":"2015","where":"published online, 2015; later in Helen Hester's book Xenofeminism (2018)","ideas":["Nothing should be accepted as fixed or given just because it is called natural.","Alienation is a starting point for freedom: technology can be repurposed for emancipation.","An anti-naturalist, gender-abolitionist and rationalist feminism."],"quotes":["If nature is unjust, change nature!"],"system":"In most music tools, the octave, twelve notes and the harmonic series are treated as nature. Here they are controls. You change the 'natural' laws of tuning and timbre, and the machine rebuilds its harmony in the world you have made."},
"design":{"name":"M/M (Paris)","short":"M/M (Paris)","who":"M/M (Paris): Michaël Amzalag and Mathias Augustyniak","era":"Paris, 1992 to now","hallmarks":["Hand-drawn alphabets laid over photographs","Fashion, music and art mixed in one playful, layered language","Bright pastel collage, with letters drawn as if by a child or a scientist"],"works":["Björk, Vespertine and Medúlla artwork (2001, 2004)","Yohji Yamamoto catalogues with Inez & Vinoodh (1990s)","The Alphabet, with Inez & Vinoodh (2001)"]}}
*/
/*CSS
:root{--bg:#fbe3e8;--fg:#1c1c2a;--acc:#5a3cff;--bar-font:'DM Mono',monospace;--head-font:'Gloock',serif}
#mm-stage{background:#fbe3e8;overflow:hidden}
#cv{position:absolute;inset:0;width:100%;height:100%}
.ui{position:absolute;right:30px;top:30px;width:330px;background:#fffdf2;padding:18px;transform:rotate(1.5deg);box-shadow:6px 6px 0 #5a3cff;font:13px 'DM Mono';display:flex;flex-direction:column;gap:10px}
.ui label{display:flex;justify-content:space-between;font:600 22px 'Caveat'}.ui input{width:100%;accent-color:#5a3cff}
.ui button{font:400 18px 'Gloock';border:2px solid #1c1c2a;background:#ffef6b;padding:6px;cursor:pointer}.ui button+button{background:#b8f0ff}
.big{position:absolute;left:36px;bottom:20px;font:400 clamp(60px,9vw,140px)/.85 'Gloock';color:#1c1c2a;pointer-events:none}
.big span{font:600 .45em 'Caveat';color:#5a3cff;display:block}
*/
/*HTML
<canvas id="cv"></canvas><div class="big"><span>if nature is unjust,</span>change<br>nature!</div>
<div class="ui"><label>EDO <b id="ve">12</b></label><input id="edo" type="range" min="5" max="31" step="1" value="12"><label>OCTAVE <b id="vo">2.00</b></label><input id="oct" type="range" min="1.8" max="2.3" step="0.01" value="2"><label>OVERTONES <b id="vs">1.00</b></label><input id="str" type="range" min="0.85" max="1.2" step="0.01" value="1"><button id="nat">NATURALISE</button><button id="ali">ALIENATE</button><div id="ch"></div></div>
*/
let edo = 12, oct = 2, str = 1, prog = [], pi = 0, cur = [];
const ui = () => { MM.$('#edo').value = edo; MM.$('#oct').value = oct; MM.$('#str').value = str; MM.$('#ve').textContent = edo; MM.$('#vo').textContent = (+oct).toFixed(2); MM.$('#vs').textContent = (+str).toFixed(2); mkProg(); };
['edo', 'oct', 'str'].forEach((k) => (MM.$('#' + k).oninput = (e) => { if (k === 'edo') edo = +e.target.value; if (k === 'oct') oct = +e.target.value; if (k === 'str') str = +e.target.value; ui(); }));
MM.$('#nat').onclick = () => { edo = 12; oct = 2; str = 1; ui(); }; MM.$('#ali').onclick = () => { edo = MM.pick([5, 7, 9, 10, 13, 17, 19, 22, 24, 31]); oct = +(1.85 + Math.random() * 0.4).toFixed(2); str = +(Math.log2(oct)).toFixed(2); ui(); };
const step2f = (s) => 110 * Math.pow(oct, s / edo);
// chords built from the nearest EDO steps to 'third' and 'fifth' sized intervals in this world
function mkProg() { const third = Math.max(1, Math.round(edo * 0.29)), fifth = Math.max(2, Math.round(edo * 0.585)), roots = [0, Math.round(edo * 0.42), Math.round(edo * 0.585), Math.round(edo * 0.75)]; prog = roots.map((r, k) => [r, r + (k % 2 ? third - 1 : third), r + fifth, r + edo]); MM.$('#ch').textContent = `third ≈ ${third} steps, fifth ≈ ${fifth} steps`; }
mkProg(); const C = MM.canvas("#cv");
function voice(f, t, d, g) { const parts = [1, 2, 3, 4, 5, 6].map((n) => [Math.pow(n, str * Math.log2(oct)), 1 / n]); MM.tone(f, t, d, { partials: parts, gain: g, attack: 0.02, release: d * 0.4 }); }
MM.init({ bpm: 92, div: 4,
  step(i, t, sd) { const bar = Math.floor(i / 16) % prog.length, s = i % 16, ch = prog[bar]; cur = ch;
    if (s === 0) ch.forEach((st, k) => voice(step2f(st + edo), t, sd * 15, 0.06));
    if (s % 2 === 0) { const st = ch[(s / 2) % ch.length] + edo * (1 + (s > 7 ? 1 : 0)); voice(step2f(st), t, sd * 1.5, 0.09); }
    if (s % 4 === 0) { const B = MM.smp(0, 'tone'), base = 130.81; MM.play(B, t, { rate: step2f(ch[(s / 4) % 3]) / base, dur: sd * 3, gain: 0.5, fadeOut: 0.1, send: { rev: 0.25 } }); }
    if (s === 0 || s === 10) MM.play(MM.fb.kick, t, { gain: 0.6 }); if (s === 4 || s === 12) MM.play(MM.fb.snare, t, { gain: 0.35 }); MM.tone(step2f(ch[0] - edo), t, sd * 0.8, { type: 'triangle', gain: s % 4 === 0 ? 0.25 : 0, cutoff: 600 }); },
  draw(ts) { C.fit(); const g = C.g, w = C.w, h = C.h, cx = w * 0.42, cy = h * 0.4, R = Math.min(w, h) * 0.27; g.fillStyle = '#fbe3e8'; g.fillRect(0, 0, w, h);
    // the 'nature' wheel: one turn is the octave, ticks are EDO steps, overtone dots wander off them
    g.strokeStyle = '#1c1c2a'; g.lineWidth = 2; g.beginPath(); g.arc(cx, cy, R, 0, 7); g.stroke();
    for (let k = 0; k < edo; k++) { const a = (k / edo) * Math.PI * 2 - Math.PI / 2; g.beginPath(); g.moveTo(cx + Math.cos(a) * R * 0.92, cy + Math.sin(a) * R * 0.92); g.lineTo(cx + Math.cos(a) * R * 1.08, cy + Math.sin(a) * R * 1.08); g.stroke(); }
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((n) => { const ratio = Math.pow(n, str * Math.log2(oct)), pos = (Math.log(ratio) / Math.log(oct)) % 1, a = pos * Math.PI * 2 - Math.PI / 2, rr = R * (0.45 + n * 0.05); g.fillStyle = ['#5a3cff', '#ff6b9d', '#ffd23f', '#3ad6c5'][n % 4]; g.beginPath(); g.arc(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, 10 + 10 / n, 0, 7); g.fill(); });
    if (MM.playing) cur.forEach((st, k) => { const a = ((((st % edo) + edo) % edo) / edo) * Math.PI * 2 - Math.PI / 2; g.strokeStyle = '#5a3cff'; g.lineWidth = 5; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(a) * R * 1.15, cy + Math.sin(a) * R * 1.15); g.stroke(); });
    g.font = "600 30px 'Caveat'"; g.fillStyle = '#1c1c2a'; g.fillText(`${edo} steps · octave ${(+oct).toFixed(2)}:1`, 36, 50); }
});
