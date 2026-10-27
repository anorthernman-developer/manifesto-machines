/*META
{"title":"Ornament & Crime","idea":"Decorate a plain melody with trills, turns and grace notes, but every ornament costs labour, and the bill and the fashion clock are always running.","how":"Press PLAY. A plain melody (your sample sings the main notes) loops over eight steps. Click a note to cycle its ornament: none, grace note, mordent, turn and trill. The ORNAMENT slider adds ornaments everywhere at once. Each ornament adds to the LABOUR bill (Loos argued that ornament is wasted work, time and material), and ornamented notes go out of fashion: the more decorated a note is and the longer it plays, the more its sound fades and dulls. STRIP removes all ornament and resets the fashion clock.","fonts":"family=Poiret+One&family=Josefin+Sans:wght@300;700","bpm":76,
"manifesto":{"name":"Ornament and Crime (Ornament und Verbrechen)","short":"Ornament and Crime","author":"Adolf Loos","year":"1910 (lecture), published 1913","where":"a lecture first given in Vienna (1910); printed in French in Les Cahiers d'aujourd'hui (1913)","ideas":["Modern people should no longer need ornament; decorating everyday objects is a sign of the past.","Ornament wastes labour, money and material, and makes objects go out of style quickly.","Plain, well-made objects last, while ornamented ones become unfashionable."],"quotes":["The evolution of culture is synonymous with the removal of ornament from objects of everyday use."],"system":"Ornament is allowed, but it is charged: every decoration costs labour on the bill and goes out of fashion over time, so its sound dulls, while plain notes stay fresh."},
"design":{"name":"Koloman Moser","short":"Koloman Moser","who":"Koloman Moser, Austrian designer, painter and co-founder of the Wiener Werkstätte","era":"Vienna, 1897 to 1918","hallmarks":["Vienna Secession geometry: chequerboards, squares and repeating modules","Black and white contrasted with gold and a single accent colour","Stylised figures and lettering for posters, books and objects"],"works":["Designs for the magazine Ver Sacrum (from 1898)","Stained-glass windows for the Kirche am Steinhof, Vienna (1904)","Austrian postage stamps for the 1908 Jubilee"]}}
*/
/*CSS
:root{--bg:#f7f4ec;--fg:#111;--acc:#b88a2a;--bar-font:'Josefin Sans',sans-serif;--head-font:'Poiret One',sans-serif}
#mm-stage{background:#f7f4ec;overflow:hidden}#cv{position:absolute;inset:0;width:100%;height:100%;cursor:pointer}
.t{position:absolute;left:40px;top:20px;font:400 44px 'Poiret One';pointer-events:none}.t small{display:block;font:700 13px 'Josefin Sans';letter-spacing:.35em;color:#b88a2a}
.ctl{position:absolute;right:40px;top:26px;display:flex;flex-direction:column;gap:6px;font:700 12px 'Josefin Sans';letter-spacing:.2em;width:230px}
.ctl input{accent-color:#b88a2a}.ctl button{font:700 13px 'Josefin Sans';letter-spacing:.2em;background:#111;color:#f7f4ec;border:0;padding:8px;cursor:pointer}
#bill{font:300 14px 'Josefin Sans';letter-spacing:0}
*/
/*HTML
<canvas id="cv"></canvas><div class="t">ORNAMENT &amp; CRIME<small>LOOS · WIEN · 1910</small></div>
<div class="ctl">ORNAMENT<input id="orn" type="range" min="0" max="1" step="0.01" value="0"><button id="strip">STRIP</button><div id="bill"></div></div>
*/
const ORN = ['plain', 'grace', 'mordent', 'turn', 'trill'], COST = [0, 1, 2, 3, 5];
const MEL = [0, 2, 4, 3, 1, 2, 0, -1]; let orn = MEL.map(() => 0), age = MEL.map(() => 0), labour = 0, glob = 0, cur = -1;
MM.$('#orn').oninput = (e) => { glob = +e.target.value; orn = MEL.map((_, k) => Math.min(4, Math.floor(glob * 5 * ((k * 0.37 + 0.6) % 1 + 0.4)))); };
MM.$('#strip').onclick = () => { orn = MEL.map(() => 0); age = MEL.map(() => 0); MM.$('#orn').value = 0; glob = 0; };
const C = MM.canvas('#cv'); const cellX = (k) => C.w * 0.08 + k * (C.w * 0.84 / 8);
C.cv.addEventListener('pointerdown', (e) => { const k = Math.floor((e.offsetX - C.w * 0.08) / (C.w * 0.84 / 8)); if (k >= 0 && k < 8 && e.offsetY > C.h * 0.25) orn[k] = (orn[k] + 1) % 5; });
function note(t, m, d, g, dull) { MM.tone(MM.mtof(m), t, d, { type: 'triangle', gain: g * 0.1, cutoff: 4000 - dull * 3500, release: 0.15 }); }
MM.init({ bpm: 76, div: 1,
  step(i, t, sd) { const k = i % 8; cur = k; const m = MM.deg(MEL[k] + 7, 'major', 50), o = orn[k], dull = Math.min(1, age[k]), B = MM.smp(0, 'voice'); labour += COST[o]; if (o) age[k] += 0.03 * o; else age[k] = Math.max(0, age[k] - 0.05);
    const step1 = MM.deg(MEL[k] + 8, 'major', 50), low = MM.deg(MEL[k] + 6, 'major', 50), main = (tt, d) => { MM.play(B, tt, { rate: MM.mtof(m) / MM.mtof(60), dur: d, gain: 0.55 * (1 - dull * 0.6), fadeOut: 0.08, filter: { type: 'lowpass', freq: 9000 - dull * 8000 } }); note(tt, m, d, 1, dull); };
    if (o === 0) main(t, sd * 0.95);
    if (o === 1) { note(t, step1, sd * 0.1, 0.9, dull); main(t + sd * 0.1, sd * 0.85); }
    if (o === 2) { note(t, m, sd * 0.1, 1, dull); note(t + sd * 0.1, step1, sd * 0.1, 1, dull); main(t + sd * 0.2, sd * 0.75); }
    if (o === 3) { [step1, m, low].forEach((n, q) => note(t + q * sd * 0.12, n, sd * 0.12, 1, dull)); main(t + sd * 0.36, sd * 0.6); }
    if (o === 4) { for (let q = 0; q < 8; q++) note(t + q * sd * 0.08, q % 2 ? step1 : m, sd * 0.08, 0.9, dull); main(t + sd * 0.64, sd * 0.34); }
    MM.tone(MM.mtof(m - 24), t, sd, { type: 'sine', gain: 0.1 }); if (k % 4 === 0) MM.play(MM.fb.kick, t, { gain: 0.3 }); },
  draw() { C.fit(); const g = C.g, w = C.w, h = C.h; g.fillStyle = '#f7f4ec'; g.fillRect(0, 0, w, h); const cw = w * 0.84 / 8;
    // Moser chequerboard border; more ornament makes it busier
    const total = orn.reduce((a, b) => a + b, 0), sq = Math.max(6, 22 - total); for (let x = 0; x < w; x += sq) { g.fillStyle = (x / sq) % 2 ? '#111' : '#f7f4ec'; g.fillRect(x, h - 26, sq, sq / 2 + 6); g.fillStyle = (x / sq) % 2 ? '#f7f4ec' : '#111'; g.fillRect(x, h - 26 + sq / 2 + 6, sq, 20); }
    MEL.forEach((v, k) => { const x = cellX(k), y = h * 0.62 - v * h * 0.06, o = orn[k], dull = Math.min(1, age[k]); g.fillStyle = k === cur && MM.playing ? '#b88a2a' : '#111'; g.globalAlpha = 1 - dull * 0.6; g.fillRect(x + cw * 0.3, y - 20, cw * 0.4, 40);
      // ornament drawn as gold squares around the note
      for (let q = 0; q < COST[o] * 2; q++) { const a = (q / (COST[o] * 2)) * Math.PI * 2; g.fillStyle = '#b88a2a'; g.fillRect(x + cw / 2 + Math.cos(a) * (36 + o * 4) - 5, y + Math.sin(a) * (36 + o * 4) - 5, 10, 10); }
      g.globalAlpha = 1; g.fillStyle = '#111'; g.font = "300 13px 'Josefin Sans'"; g.textAlign = 'center'; g.fillText(ORN[o], x + cw / 2, h * 0.86); g.fillText(dull > 0.5 ? 'out of date' : '', x + cw / 2, h * 0.86 + 16); g.textAlign = 'left'; });
    MM.$('#bill').textContent = `Labour wasted: ${labour} hand-hours · ${(labour * 0.4).toFixed(1)} Kronen`; }
});
