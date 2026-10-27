/*META
{"title":"No","idea":"A full, flashy groove that you take apart with thirteen NOs, until only an ordinary walking pulse is left.","how":"Press PLAY. The groove starts with everything: echo and reverb, fast fills, filter sweeps, a star lead, heroic chords, swing and moving pans. Each line on the right is one NO from the manifesto. Click it to say NO, and the matching element is removed from the music. Click again to take it back. Say NO to everything and you are left with a plain pulse built from your sample, like an ordinary task. NO TO INVOLVEMENT also locks your other controls.","fonts":"family=Inter+Tight:wght@400;800","bpm":112,
"manifesto":{"name":"No Manifesto","short":"No Manifesto","author":"Yvonne Rainer","year":"1965","where":"published in the Tulane Drama Review (1965), after her dance Parts of Some Sextets; Rainer was a founder of Judson Dance Theater","ideas":["A list of refusals: no to spectacle, virtuosity, magic, glamour, heroism and seduction.","Dance made from ordinary 'task-like' movement rather than display, as in Trio A (1966).","No to involvement of performer or spectator, and no to moving or being moved."],"quotes":["No to spectacle. No to virtuosity."],"system":"Composition by subtraction. Each NO removes one kind of display from the music. The final state, with every NO on, is a plain pulse built from your sample: music as an ordinary task."},
"design":{"name":"Massimo Vignelli","short":"Massimo Vignelli","who":"Massimo Vignelli, Italian designer who worked in New York with Lella Vignelli","era":"Milan and New York, 1960s to 2000s","hallmarks":["A strict grid with very few typefaces, chiefly Helvetica","Coloured circles and bars on black or white, with a diagrammatic clarity","Ruthless reduction and consistency ('if you can design one thing, you can design everything')"],"works":["New York City Subway map (1972)","American Airlines logo (1967)","The Vignelli Canon (2010)"]}}
*/
/*CSS
:root{--bg:#fff;--fg:#111;--acc:#ee352e;--bar-font:'Inter Tight',sans-serif;--head-font:'Inter Tight',sans-serif}
#mm-stage{background:#fff;display:grid;grid-template-columns:1fr 1fr;overflow:hidden}
#cv{width:100%;height:100%;display:block;background:#111}
.nos{padding:22px 26px;display:flex;flex-direction:column;gap:3px;overflow:auto}
.nos h1{margin:0 0 10px;font:800 54px/1 'Inter Tight';letter-spacing:-.03em}
.no{display:flex;align-items:center;gap:12px;font:400 16px 'Inter Tight';cursor:pointer;padding:3px 0;border-top:1px solid #eee;user-select:none}
.no i{flex:none;width:26px;height:26px;border-radius:50%;background:var(--c);color:#fff;font:800 12px/26px 'Inter Tight';text-align:center;font-style:normal}
.no.on{text-decoration:line-through;color:#bbb}.no.on i{background:#111}
#lvl{font:800 13px 'Inter Tight';margin-top:8px}
*/
/*HTML
<canvas id="cv"></canvas><div class="nos"><h1>No.</h1><div id="list"></div><div id="lvl"></div></div>
*/
const NO = [['spectacle', 'reverb and echo', '#ee352e'], ['virtuosity', 'fast fills', '#00933c'], ['transformations and magic and make-believe', 'filter sweeps and pitch bends', '#b933ad'], ['the glamour and transcendency of the star image', 'the lead synth', '#fccc0a'], ['the heroic', 'big chords', '#0039a6'], ['the anti-heroic', 'the deliberately wrong note', '#ff6319'], ['trash imagery', 'noise bursts', '#996633'], ['involvement of performer or spectator', 'your clicks (locks the panel)', '#6cbe45'], ['style', 'the hi-hat pattern', '#a7a9ac'], ['camp', 'the cowbell', '#ee352e'], ['seduction of spectator by the wiles of the performer', 'the swing', '#00add0'], ['eccentricity', 'the odd accents', '#808183'], ['moving or being moved', 'the moving pans', '#0039a6']];
let off = new Set(), cur = 0;
const has = (k) => !off.has(k);
function list() { const L = MM.$('#list'); L.innerHTML = ''; NO.forEach(([t, what, c], k) => { const d = MM.h('div', { class: 'no' + (off.has(k) ? ' on' : ''), style: '--c:' + c, title: 'removes ' + what, html: `<i>${k + 1}</i><span>No to ${t}.</span>` }); d.onclick = () => { if (!has(7) && k !== 7) { MM.toast('You said no to involvement'); return; } off.has(k) ? off.delete(k) : off.add(k); list(); }; L.append(d); }); MM.$('#lvl').textContent = off.size === NO.length ? 'Only the ordinary task remains.' : `${NO.length - off.size} of ${NO.length} displays left`; }
list();
const C = MM.canvas('#cv'), blips = [];
MM.init({ bpm: 112, div: 4,
  step(i, t, sd) { const s = i % 16, bar = Math.floor(i / 16) % 4, B = MM.smp(0, 'loop'); cur = s; if (has(10) && s % 2) t += sd * 0.22;
    const pan = has(12) ? Math.sin(i * 0.4) * 0.8 : 0, send = has(0) ? { rev: 0.35, dly: 0.25 } : undefined;
    // the ordinary task: always there
    if (s % 4 === 0) MM.play(B, t, { offset: 0, dur: sd * 1.5, gain: 0.7, fadeOut: 0.02 });
    if (s % 4 === 0) MM.play(MM.fb.kick, t, { gain: 0.6 });
    if (has(8) && s % 2 === 0) MM.play(MM.fb.hat, t, { gain: 0.25, pan });
    if (has(9) && [3, 6, 11].includes(s)) MM.tone(800, t, 0.08, { type: 'square', gain: 0.07, cutoff: 1500, pan });
    if (has(11) && [7, 13].includes(s)) MM.play(MM.fb.snare, t, { gain: 0.6, pan: -pan });
    if (has(1) && s >= 12 && bar === 3) for (let k = 0; k < 3; k++) MM.play(MM.fb.snare, t + (k * sd) / 3, { gain: 0.3 + k * 0.1, rate: 1 + k * 0.1 });
    if (has(4) && s === 0) [0, 4, 7, 11].forEach((iv) => MM.tone(MM.mtof(48 + iv + [0, 5, 3, 7][bar]), t, sd * 15, { type: 'sawtooth', gain: 0.035, attack: 0.3, cutoff: has(2) ? 600 + Math.sin(i / 10) * 400 + 500 : 1000, send }));
    if (has(3) && [0, 3, 6, 10, 12].includes(s)) MM.tone(MM.mtof(MM.deg((s + bar * 3) % 8, 'dorian', 67)), t, sd * 1.6, { type: 'square', gain: 0.06, cutoff: 2600, glide: has(2) && s === 10 ? MM.mtof(72) : undefined, pan, send });
    if (has(5) && s === 14 && bar % 2) MM.tone(MM.mtof(61), t, sd * 2, { type: 'square', gain: 0.07, cutoff: 1400 });
    if (has(6) && s === 8 && bar === 1) MM.noise(t, 0.25, { freq: 2000, q: 0.5, gain: 0.25, pan });
    if (has(2) && s === 0 && bar === 2) MM.play(B, t, { rate: 0.5, dur: sd * 8, gain: 0.3, filter: { type: 'lowpass', freq: 800 }, send });
    blips.push({ s, n: NO.length - off.size }); if (blips.length > 64) blips.shift(); },
  draw() { C.fit(); const g = C.g, w = C.w, h = C.h; g.fillStyle = '#111'; g.fillRect(0, 0, w, h); const left = NO.filter((_, k) => has(k));
    // a Vignelli subway diagram: each remaining NO-element is a coloured line, 45/90 degrees only
    NO.forEach(([, , c], k) => { if (!has(k)) return; const y0 = 40 + k * ((h - 80) / NO.length); g.strokeStyle = c; g.lineWidth = 8; g.lineJoin = 'round'; g.beginPath(); g.moveTo(30, y0); g.lineTo(w * 0.35, y0); g.lineTo(w * 0.35 + 60, y0 + (k % 2 ? 60 : -60) * 0.5); g.lineTo(w - 30, y0 + (k % 2 ? 60 : -60) * 0.5); g.stroke(); });
    g.strokeStyle = '#fff'; g.lineWidth = 10; g.beginPath(); g.moveTo(30, h - 22); g.lineTo(w - 30, h - 22); g.stroke();
    for (let s = 0; s < 16; s++) { const x = 30 + (s / 15) * (w - 60); g.fillStyle = s === cur && MM.playing ? '#ee352e' : '#fff'; g.strokeStyle = '#111'; g.lineWidth = 3; g.beginPath(); g.arc(x, h - 22, s % 4 === 0 ? 9 : 5, 0, 7); g.fill(); g.stroke(); }
    g.fillStyle = '#fff'; g.font = "800 15px 'Inter Tight'"; g.fillText(left.length ? left.length + ' lines in service' : 'ordinary pulse only', 30, 26); }
});
