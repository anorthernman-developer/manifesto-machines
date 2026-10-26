/*META
{"title":"Bicho","idea":"A hinged metal creature: bend its plates and the angles between them become the intervals of its chord.","how":"Press PLAY. The creature is five plates joined by hinges. Drag any plate to fold it around its hinge. Each hinge angle sets an interval, so the shape of the creature is its chord, which is played as a slow arpeggio with your sample as the voice. Left alone, the creature moves very slowly by itself. Press a preset shape to snap into a new pose. As Lygia Clark said, the bicho has no back or front and answers your touch.","fonts":"family=Work+Sans:wght@300;700","bpm":84,
"manifesto":{"name":"Neo-Concrete Manifesto","short":"Neo-Concretism","author":"Ferreira Gullar, with Amilcar de Castro, Lygia Clark, Lygia Pape, Franz Weissmann, Reynaldo Jardim and Theon Spanúdis","year":"1959","where":"Jornal do Brasil, Rio de Janeiro, March 1959","ideas":["A break with the rationalism and mechanism of São Paulo concrete art.","The work of art is not a machine but a quasi-corpus, closer to a living organism than an object.","Expression, sensation and the participation of the viewer, as in Lygia Clark's hinged metal Bichos (from 1960)."],"quotes":[],"system":"The chord is not chosen from a list. It comes from the physical pose of a hinged creature that you handle, so harmony becomes something you touch and fold, and the creature answers by moving."},
"design":{"name":"Alexandre Wollner","short":"Alexandre Wollner","who":"Alexandre Wollner, Brazilian designer who trained at the Ulm School of Design (HfG Ulm)","era":"São Paulo and Rio de Janeiro, 1950s to 1970s","hallmarks":["Concrete-art rigour applied to corporate identity","Geometric marks built on a grid, with flat colour and simple sans type","Brazil's first design office, Forminform (1958), and co-founder of the ESDI school in Rio (1963)"],"works":["Poster for the 1st International Film Festival of Brazil, with Geraldo de Barros (1954)","Sardinhas Coqueiro logo and packaging (1958)","Banco Itaú visual identity (1970)"]}}
*/
/*CSS
:root{--bg:#e9e6df;--fg:#13304d;--acc:#f0a500;--bar-font:'Work Sans',sans-serif;--head-font:'Work Sans',sans-serif}
#mm-stage{background:#e9e6df;display:grid;grid-template-columns:1fr 320px}
#cv{width:100%;height:100%;display:block;touch-action:none;cursor:grab}
.side{background:#13304d;color:#e9e6df;padding:28px;display:flex;flex-direction:column;gap:12px;font:300 14px/1.5 'Work Sans'}
.side h1{font:700 52px/.9 'Work Sans';margin:0;letter-spacing:-.03em}.side h1 span{color:#f0a500}
.pre{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}.pre button{aspect-ratio:1;border:0;background:#e9e6df;cursor:pointer;font:700 18px 'Work Sans';color:#13304d}.pre button:hover{background:#f0a500}
#ch{font:700 20px 'Work Sans';color:#f0a500}
.logo{margin-top:auto;display:flex;gap:6px}.logo i{width:30px;height:30px;background:#f0a500}.logo i:nth-child(2){border-radius:50%;background:#e9e6df}.logo i:nth-child(3){background:#2f7d4f;clip-path:polygon(0 100%,50% 0,100% 100%)}
*/
/*HTML
<canvas id="cv"></canvas>
<div class="side"><h1>bicho<br><span>1960</span></h1><div>Drag the plates. Hinge angles are intervals. The pose is the chord.</div><div id="ch"></div><div class="pre" id="pre"></div><div id="iv"></div><div class="logo"><i></i><i></i><i></i></div></div>
*/
// five plates in a chain, each hinge stores an angle (radians)
let ang = [0.6, -0.9, 1.2, -0.5], tgt = null, drift = 0, grab = -1, notes = [];
const POSES = [[0.6, -0.9, 1.2, -0.5], [1.57, 1.57, 1.57, 1.57], [0.3, 0.3, 0.3, 0.3], [-2.2, 2.2, -2.2, 2.2], [2.6, -0.4, 0.9, -2.0], [0.8, 0.8, -0.8, -0.8], [3.0, 0.2, 3.0, 0.2], [-1.0, 0.5, 1.8, 0.1]];
POSES.forEach((p, i) => { const b = MM.h('button', {}, String(i + 1)); b.onclick = () => (tgt = p.slice()); MM.$('#pre').append(b); });
const C = MM.canvas('#cv');
const PL = 5, SZ = () => Math.min(C.w * 0.8, C.h) * 0.2;
function joints() { const s = SZ(); let x = C.w * 0.22, y = C.h * 0.5, a = -0.2; const P = [[x, y]]; for (let k = 0; k < PL; k++) { if (k > 0) a += ang[k - 1]; x += Math.cos(a) * s; y += Math.sin(a) * s; P.push([x, y, a]); } let mx = 0, my = 0; P.forEach((p) => { mx += p[0]; my += p[1]; }); mx = C.w * 0.5 - mx / P.length; my = C.h * 0.42 - my / P.length; P.forEach((p) => { p[0] += mx; p[1] += my; }); return P; }
// an interval in semitones from an angle: folding further means wider
const ivOf = (a) => Math.round((Math.abs(a) / Math.PI) * 12) + 1;
function chord() { let m = 43; notes = [m]; ang.forEach((a) => { m += ivOf(a); notes.push(m); }); return notes; }
MM.drag(C.cv, (x, y, ph) => { const P = joints(); if (ph === 'down') { let bd = 1e9; P.forEach((p, k) => { if (k < 2) return; const d = Math.hypot(p[0] - x, p[1] - y); if (d < bd) { bd = d; grab = k; } }); if (bd > SZ()) grab = -1; } else if (ph === 'move' && grab > 1) { const h = P[grab - 1], prev = P[grab - 2]; const base = Math.atan2(h[1] - prev[1], h[0] - prev[0]), want = Math.atan2(y - h[1], x - h[0]); let d = want - base; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; ang[grab - 2] = d; tgt = null; } else if (ph === 'up') grab = -1; });
MM.init({ bpm: 84, div: 2,
  step(i, t, sd) { const n = chord(), k = i % 10, B = MM.smp(0, 'tone'); const idx = k < 5 ? k : 9 - k; const m = n[idx];
    MM.play(B, t, { rate: MM.mtof(m) / MM.mtof(48), dur: sd * 2.2, gain: 0.45, fadeIn: 0.01, fadeOut: 0.2, pan: idx / 2 - 1, send: { rev: 0.35 } });
    MM.tone(MM.mtof(m + 12), t, sd * 1.5, { partials: [[1, 1], [3, 0.15]], gain: 0.06, release: 0.4 });
    if (k === 0) { MM.tone(MM.mtof(n[0] - 12), t, sd * 9, { type: 'triangle', gain: 0.22, attack: 0.1, cutoff: 500 }); MM.play(MM.fb.kick, t, { gain: 0.35 }); } if (k === 5) MM.noise(t, 0.04, { freq: 5000, q: 3, gain: 0.12 }); },
  draw(ts) { C.fit(); const g = C.g, w = C.w, h = C.h; g.fillStyle = '#e9e6df'; g.fillRect(0, 0, w, h);
    if (tgt) { ang = ang.map((a, k) => a + (tgt[k] - a) * 0.08); if (ang.every((a, k) => Math.abs(a - tgt[k]) < 0.01)) tgt = null; } else if (grab < 0 && MM.playing) { drift += 0.004; ang = ang.map((a, k) => a + Math.sin(drift + k * 1.7) * 0.0015); }
    const P = joints(), s = SZ(), cols = ['#13304d', '#f0a500', '#2f7d4f', '#13304d', '#c0392b'];
    for (let k = 0; k < PL; k++) { const [x0, y0] = P[k], [x1, y1] = P[k + 1], a = Math.atan2(y1 - y0, x1 - x0), nx = -Math.sin(a) * s * 0.7, ny = Math.cos(a) * s * 0.7; const shade = 0.75 + 0.25 * Math.cos(a);
      g.fillStyle = cols[k]; g.globalAlpha = 0.75 + shade * 0.25; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.lineTo(x1 + nx * (k % 2 ? -1 : 1), y1 + ny * (k % 2 ? -1 : 1)); g.lineTo(x0 + nx * 0.6 * (k % 2 ? -1 : 1), y0 + ny * 0.6 * (k % 2 ? -1 : 1)); g.closePath(); g.fill(); g.globalAlpha = 1; }
    P.slice(1, -1).forEach(([x, y], k) => { g.fillStyle = '#e9e6df'; g.strokeStyle = '#13304d'; g.lineWidth = 3; g.beginPath(); g.arc(x, y, 8, 0, 7); g.fill(); g.stroke(); g.fillStyle = '#13304d'; g.font = "700 13px 'Work Sans'"; g.fillText('+' + ivOf(ang[k]), x + 12, y - 10); });
    const n = chord(), NN = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']; MM.$('#ch').textContent = n.map((m) => NN[m % 12]).join(' · '); MM.$('#iv').textContent = 'intervals: ' + ang.map(ivOf).join(', ') + ' semitones'; }
});
