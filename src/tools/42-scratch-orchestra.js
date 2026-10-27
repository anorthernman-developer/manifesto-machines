/*META
{"title":"Scratch Orchestra","idea":"A crowd of amateur players, each with their own scratch music, performing a sequence of rites chosen from the orchestra's constitution.","how":"Press PLAY. Each circle is a player with their own little ostinato (their 'scratch music'), instrument and favourite note. Players come and go: ADD PLAYER recruits one more, click a player to send them home. Every eight bars the orchestra switches to a new RITE: TUTTI (everybody plays their scratch music), SOLO (one player only, the others accompany very softly), FOLLOW (everyone copies the leader, one by one), POPULAR CLASSIC (a familiar melody heard in fragments through your sample) or SILENCE AND BREATH. Choose the next rite yourself with the buttons.","fonts":"family=Space+Grotesk:wght@400;700","bpm":96,
"manifesto":{"name":"A Scratch Orchestra: draft constitution","short":"Scratch Orchestra","author":"Cornelius Cardew","year":"1969","where":"The Musical Times, June 1969, London (founded with Michael Parsons and Howard Skempton)","ideas":["An open orchestra of enthusiasts, trained or untrained, who pool their resources.","Each member keeps a notebook of 'scratch music', short accompaniments that can be played indefinitely.","Repertoire categories include Scratch Music, Popular Classics, Improvisation Rites, Compositions and a Research Project."],"quotes":["A Scratch Orchestra is a large number of enthusiasts pooling their resources (not primarily material resources) and assembling for action (music-making, performance, edification)."],"system":"The piece is a crowd, not a score. Each simulated player has their own scratch music, and the orchestra moves through the constitution's categories as rites, so the same players make very different music."},
"design":{"name":"Ken Garland","short":"Ken Garland","who":"Ken Garland, British graphic designer, writer and author of the First Things First manifesto (1964)","era":"London, 1960s to 2000s","hallmarks":["Bright, friendly primary colours and playful geometry","Clear, informative design for good causes and for play","Bold, simple sans-serif type"],"works":["The First Things First manifesto (1964)","Catalogues, logo and toys for Galt Toys (1960s)","CND poster for the Aldermaston march, Easter 1962"]}}
*/
/*CSS
:root{--bg:#fffdf6;--fg:#111;--acc:#e32b2b;--bar-font:'Space Grotesk',sans-serif;--head-font:'Space Grotesk',sans-serif}
#mm-stage{background:#fffdf6;overflow:hidden}#cv{position:absolute;inset:0;width:100%;height:100%;cursor:pointer}
.t{position:absolute;left:28px;top:20px;font:700 44px/1 'Space Grotesk';pointer-events:none}.t small{display:block;font:400 14px 'Space Grotesk';color:#e32b2b}
.r{position:absolute;right:24px;top:22px;display:flex;flex-direction:column;gap:6px;width:200px}.r button{font:700 14px 'Space Grotesk';border:3px solid #111;background:#fffdf6;padding:7px;cursor:pointer;border-radius:30px}.r button.on{background:#111;color:#fffdf6}.r #add{background:#ffd400}
#rite{position:absolute;left:28px;bottom:18px;font:700 26px 'Space Grotesk';pointer-events:none}
*/
/*HTML
<canvas id="cv"></canvas><div class="t">SCRATCH<br>ORCHESTRA<small>draft constitution · 1969</small></div>
<div class="r"><button id="add">+ ADD PLAYER</button></div><div id="rite"></div>
*/
const RITES = ['TUTTI', 'SOLO', 'FOLLOW', 'POPULAR CLASSIC', 'SILENCE AND BREATH'], COLS = ['#e32b2b', '#1f5fd1', '#ffd400', '#1aa34a', '#111', '#ff8a00'];
const NAMES = ['Ann', 'Bryn', 'Cath', 'Dev', 'Eli', 'Fran', 'Gus', 'Hal', 'Ivy', 'Jo', 'Kit', 'Lou', 'Mo', 'Ned', 'Oona', 'Pip'];
let P = [], rite = 0, nextRite = null, leader = 0, soloist = 0, flash = {};
function recruit() { if (P.length >= 14) return MM.toast('The hall is full'); const r = Math.random; P.push({ name: NAMES[P.length % NAMES.length], col: MM.pick(COLS), inst: Math.floor(r() * 4), note: Math.floor(r() * 8), pat: Array.from({ length: 8 }, () => (r() < 0.4 ? Math.floor(r() * 5) : -1)), x: 0.15 + r() * 0.6, y: 0.3 + r() * 0.5, f: 0 }); }
for (let k = 0; k < 7; k++) recruit();
MM.$('#add').onclick = recruit;
RITES.forEach((n, k) => { const b = MM.h('button', {}, n); b.onclick = () => { nextRite = k; MM.toast('Next rite: ' + n); }; MM.$('.r').append(b); });
const C = MM.canvas('#cv');
C.cv.addEventListener('pointerdown', (e) => { const k = P.findIndex((p) => Math.hypot(p.x * C.w - e.offsetX, p.y * C.h - e.offsetY) < 30); if (k >= 0) { MM.toast(P[k].name + ' goes home'); P.splice(k, 1); } });
function sound(p, t, n, sd, g) { const m = MM.deg(p.note + n, 'dorian', 50), pan = p.x * 2 - 1; p.f = 1;
  if (p.inst === 0) MM.tone(MM.mtof(m), t, sd * 1.2, { type: 'triangle', gain: 0.12 * g, pan });
  if (p.inst === 1) MM.tone(MM.mtof(m + 12), t, sd * 0.4, { type: 'square', gain: 0.05 * g, cutoff: 2000, pan });
  if (p.inst === 2) MM.noise(t, 0.05, { freq: 500 + n * 600, q: 6, gain: 0.3 * g, pan });
  if (p.inst === 3) { const B = MM.smp(0, 'voice'); MM.play(B, t, { offset: (p.note / 8) * B.duration * 0.7, dur: sd * 1.5, rate: MM.mtof(m) / MM.mtof(60), gain: 0.4 * g, fadeOut: 0.04, pan }); } }
const TUNE = [0, 0, 4, 4, 5, 5, 4, -1, 3, 3, 2, 2, 1, 1, 0, -1]; // a familiar nursery tune shape, in fragments
MM.init({ bpm: 96, div: 2,
  step(i, t, sd) { const s = i % 8; if (i % 64 === 0) { rite = nextRite != null ? nextRite : Math.floor(Math.random() * RITES.length); nextRite = null; soloist = Math.floor(Math.random() * Math.max(1, P.length)); leader = soloist; MM.$('#rite').textContent = 'RITE: ' + RITES[rite]; MM.$$('.r button').forEach((b, k) => b.classList.toggle('on', k === rite + 1)); }
    if (!P.length) return; const R = RITES[rite];
    if (R === 'TUTTI') P.forEach((p) => { if (p.pat[s] >= 0) sound(p, t + Math.random() * 0.02, p.pat[s], sd, 1); });
    if (R === 'SOLO') P.forEach((p, k) => { if (p.pat[s] >= 0) sound(p, t, p.pat[s] + (k === soloist % P.length ? (i % 3) * 2 : 0), sd, k === soloist % P.length ? 1.6 : 0.2); });
    if (R === 'FOLLOW') { const L = P[leader % P.length], joined = Math.floor((i % 64) / 8) + 1; P.slice(0, joined).forEach((p, k) => { if (L.pat[s] >= 0) sound(p, t + k * 0.015, L.pat[s], sd, 0.8); }); }
    if (R === 'POPULAR CLASSIC') { const n = TUNE[i % 16]; if (n >= 0) { const B = MM.smp(0, 'loop'); MM.play(B, t, { offset: ((i % 16) / 16) * B.duration, dur: sd * 0.9, rate: MM.mtof(MM.deg(n, 'major', 60)) / MM.mtof(60), gain: 0.6 }); P.slice(0, 3).forEach((p) => sound(p, t, n, sd, 0.5)); } }
    if (R === 'SILENCE AND BREATH') { if (s === 0) MM.noise(t, sd * 6, { freq: 900, q: 0.7, gain: 0.08, sweep: 400 }); if (s === 0 && i % 16 === 0) MM.play(MM.smp(0, 'loop'), t, { gain: 0.25, rate: 0.5, fadeIn: 0.4, fadeOut: 0.6, send: { rev: 0.6 } }); }
    if (s % 4 === 0 && R !== 'SILENCE AND BREATH') MM.play(MM.fb.kick, t, { gain: 0.25 }); },
  draw() { C.fit(); const g = C.g, w = C.w, h = C.h; g.fillStyle = '#fffdf6'; g.fillRect(0, 0, w, h);
    P.forEach((p, k) => { const x = p.x * w, y = p.y * h, r = 24 + p.f * 14; p.f *= 0.88; g.fillStyle = p.col; if (p.inst === 2) g.fillRect(x - r, y - r, r * 2, r * 2); else if (p.inst === 1) { g.beginPath(); g.moveTo(x, y - r); g.lineTo(x + r, y + r); g.lineTo(x - r, y + r); g.fill(); } else { g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); }
      g.fillStyle = '#111'; g.font = "700 13px 'Space Grotesk'"; g.textAlign = 'center'; g.fillText(p.name + (RITES[rite] === 'SOLO' && k === soloist % P.length ? ' ★' : ''), x, y + r + 16); g.textAlign = 'left'; }); }
});
