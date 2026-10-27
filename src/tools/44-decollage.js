/*META
{"title":"Décollage","idea":"Three posters pasted on top of each other, each one a different groove; tear strips away to reveal the layers underneath.","how":"Press PLAY. The wall has three posters pasted on top of each other. Each poster is a complete loop, from the top layer (a brass-band march) down to a jazz layer and finally your sample, pasted first on the bare wall. Only the parts you can see are heard: the horizontal axis is time in the loop and the vertical axis is the pitch range. Drag across the wall to tear the paper away and reveal what is underneath. PASTE glues a fresh top poster over everything. The torn shapes are the composition.","fonts":"family=Anton&family=Oswald:wght@300;600","bpm":110,
"manifesto":{"name":"Nouveau Réalisme manifestos","short":"Nouveau Réalisme","author":"Pierre Restany","year":"1960","where":"first manifesto published in Milan in April 1960; the group's declaration was signed at Yves Klein's flat in Paris on 27 October 1960","ideas":["A 'new perceptual approach to the real': appropriating the real world of the city instead of painting it.","The sociological reality of the street: posters, scrap, packaging and consumer objects.","Raymond Hains and Jacques Villeglé's décollages: they presented posters torn off the walls of Paris as art."],"quotes":[],"system":"You do not write anything. The layers are found, readymade music, and you compose only by tearing, so what you hear is whatever the torn shape reveals."},
"design":{"name":"Polish School of Posters","short":"Polish Poster School","who":"The Polish School of Posters: Henryk Tomaszewski, Jan Lenica, Roman Cieślewicz, Franciszek Starowieyski and others","era":"Warsaw, 1950s to 1970s","hallmarks":["Painterly, hand-drawn letters and shapes rather than photography","Surreal, witty metaphors and collage","Bold flat colour on rough paper, with torn edges"],"works":["Henryk Tomaszewski's Henry Moore exhibition poster (1959)","Jan Lenica's Wozzeck poster for the Warsaw opera (1964)","Roman Cieślewicz's poster for Hitchcock's Vertigo (1963)"]}}
*/
/*CSS
:root{--bg:#d9d0bf;--fg:#1b1b1b;--acc:#d7261e;--bar-font:'Oswald',sans-serif;--head-font:'Anton',sans-serif}
#mm-stage{background:#d9d0bf;overflow:hidden}#cv{position:absolute;inset:0;width:100%;height:100%;cursor:grab;touch-action:none}
#paste{position:absolute;right:24px;bottom:20px;font:400 22px 'Anton';background:#1b1b1b;color:#d9d0bf;border:0;padding:8px 18px;cursor:pointer}
#lay{position:absolute;left:24px;bottom:20px;font:600 14px 'Oswald';background:#d9d0bf;padding:4px 8px}
*/
/*HTML
<canvas id="cv"></canvas><button id="paste">PASTE</button><div id="lay"></div>
*/
const GW = 32, GH = 16; let depth = []; // 0 = top poster visible, 1 = middle, 2 = bottom (your sample), 3 = bare wall
function fresh() { depth = Array.from({ length: GW }, () => new Array(GH).fill(0)); }
fresh();
if (document.fonts) document.fonts.ready.then(() => (dirty = true)); setTimeout(() => (dirty = true), 1500);
const C = MM.canvas('#cv'), off = document.createElement('canvas'); let dirty = true, cur = 0;
function tear(x, y) { const cx = Math.floor((x / C.w) * GW), cy = Math.floor((y / C.h) * GH); for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) { const X = cx + a, Y = cy + b; if (X < 0 || Y < 0 || X >= GW || Y >= GH) continue; if (Math.random() < (a || b ? 0.5 : 1)) depth[X][Y] = Math.min(3, depth[X][Y] + (Math.random() < 0.3 ? 2 : 1)); } dirty = true; }
let lp = null; MM.drag(C.cv, (x, y, ph) => { if (ph === 'down') { lp = [x, y]; tear(x, y); MM.noise(MM.now, 0.12, { freq: 2500, q: 0.6, gain: 0.25, sweep: 900 }); } else if (ph === 'move' && lp) { const d = Math.hypot(x - lp[0], y - lp[1]); if (d > 14) { tear(x, y); lp = [x, y]; if (Math.random() < 0.4) MM.noise(MM.now, 0.06, { freq: 3000 + Math.random() * 2000, q: 1, gain: 0.15 }); } } else lp = null; });
MM.$('#paste').onclick = () => { MM.noise(MM.now, 0.4, { freq: 400, q: 0.5, gain: 0.25 }); for (let x = 0; x < GW; x++) for (let y = 0; y < GH; y++) depth[x][y] = Math.max(0, depth[x][y] - 1); dirty = true; };
// seed some old tears so the wall is already weathered
for (let k = 0; k < 7; k++) { const x = Math.random() * 800 + 100, y = Math.random() * 400 + 80; for (let q = 0; q < 5; q++) { const cx = Math.floor((x + q * 25) / 1000 * GW), cy = Math.floor((y + q * 9) / 560 * GH); if (depth[cx] && depth[cx][cy] != null) depth[cx][cy] = 1 + (q % 2); } }
const LAY = [{ n: 'BRASS-BAND MARCH', c: '#d7261e', ink: '#f4e9d0' }, { n: 'JAZZ CLUB', c: '#1f4e9c', ink: '#ffcc00' }, { n: 'YOUR SAMPLE', c: '#f2c230', ink: '#1b1b1b' }, { n: 'BARE WALL', c: '#8c8172' }];
function visible(x, lay) { let n = 0, lo = 99, hi = -1; for (let y = 0; y < GH; y++) if (depth[x][y] === lay) { n++; lo = Math.min(lo, y); hi = Math.max(hi, y); } return { n: n / GH, lo, hi }; }
MM.init({ bpm: 110, div: 4,
  step(i, t, sd) { const x = (i * 2) % GW, s = i % 16; cur = x; const B = MM.smp(0, 'loop');
    const v0 = visible(x, 0), v1 = visible(x, 1), v2 = visible(x, 2), v3 = visible(x, 3);
    if (v0.n > 0) { if (s % 4 === 0) MM.play(MM.fb.kick, t, { gain: 0.7 * v0.n }); if (s % 4 === 2) MM.noise(t, 0.08, { freq: 2000, q: 2, gain: 0.25 * v0.n }); if (s % 2 === 0) MM.tone(MM.mtof(MM.deg(7 - Math.floor(v0.lo / 2) + [0, 2, 4, 2][Math.floor(s / 4)], 'major', 55)), t, sd * 1.6, { type: 'sawtooth', gain: 0.09 * v0.n, cutoff: 1600 }); }
    if (v1.n > 0) { if ([0, 3, 6, 10, 13].includes(s)) MM.tone(MM.mtof(MM.deg(9 - Math.floor(v1.lo / 2), 'blues', 50)), t, sd * 2, { type: 'triangle', gain: 0.16 * Math.sqrt(v1.n), send: { rev: 0.2 } }); if (s % 2 === 1) MM.play(MM.fb.hat, t + sd * 0.15, { gain: 0.25 * Math.sqrt(v1.n) }); MM.tone(MM.mtof(MM.deg(s % 5, 'dorian', 36)), t, sd * 0.9, { gain: 0.14 * Math.sqrt(v1.n) }); }
    if (v2.n > 0) MM.play(B, t, { offset: (x / GW) * B.duration, dur: sd * 2.2, gain: 0.85 * Math.sqrt(v2.n), rate: 1 + (8 - v2.lo) * 0.02, fadeOut: 0.03 });
    if (v3.n > 0.05 && s % 8 === 0) MM.noise(t, sd * 4, { freq: 200, q: 0.5, gain: 0.08 * v3.n }); },
  draw() { C.fit(); const g = C.g, w = C.w, h = C.h, cw = w / GW, ch = h / GH;
    if (dirty || off.width !== w) { dirty = false; off.width = w; off.height = h; const o = off.getContext('2d');
      for (let L = 3; L >= 0; L--) { o.save(); o.beginPath(); for (let x = 0; x < GW; x++) for (let y = 0; y < GH; y++) if (depth[x][y] <= L) { const j = MM.rng(x * 17 + y * 5 + L)(); o.rect(x * cw - j * 6, y * ch - j * 5, cw + j * 12, ch + j * 10); } o.clip(); const lay = LAY[L]; o.fillStyle = lay.c; o.fillRect(0, 0, w, h);
        o.fillStyle = lay.ink || '#6d6355'; if (L === 0) { o.font = `400 ${h * 0.3}px Anton, Impact, sans-serif`; o.fillText('ORKIESTRA', w * 0.04, h * 0.42); o.beginPath(); o.arc(w * 0.78, h * 0.68, h * 0.22, 0, 7); o.fill(); o.font = `600 ${h * 0.08}px Oswald, sans-serif`; o.fillText('MARSZ · NIEDZIELA', w * 0.05, h * 0.88); }
        if (L === 1) { o.font = `400 ${h * 0.42}px Anton, Impact, sans-serif`; o.fillText('JAZZ', w * 0.3, h * 0.7); for (let k = 0; k < 6; k++) { o.fillRect(w * 0.05 + k * 30, h * 0.1, 12, h * 0.8); } }
        if (L === 2) { o.font = `400 ${h * 0.2}px Anton, Impact, sans-serif`; o.fillText('SAMPLE', w * 0.1, h * 0.35); o.beginPath(); o.moveTo(0, h * 0.6); for (let x = 0; x < w; x += 6) o.lineTo(x, h * 0.6 + Math.sin(x / 13) * Math.sin(x / 90) * h * 0.15); o.lineWidth = 6; o.strokeStyle = '#1b1b1b'; o.stroke(); }
        if (L === 3) { for (let k = 0; k < 300; k++) o.fillRect(Math.random() * w, Math.random() * h, 2, 2); }
        o.restore(); } }
    g.drawImage(off, 0, 0); if (MM.playing) { g.fillStyle = 'rgba(255,255,255,.25)'; g.fillRect(cur * cw, 0, cw * 2, h); }
    const counts = [0, 0, 0, 0]; depth.forEach((c) => c.forEach((d) => counts[d]++)); MM.$('#lay').textContent = LAY.map((l, k) => `${l.n} ${Math.round((counts[k] / (GW * GH)) * 100)}%`).join(' · '); }
});
