/*META
{"title":"Automatic","idea":"Draw without stopping to think: your hand becomes a melody and an exquisite corpse in three parts.","how":"Press PLAY. Drag inside one of the three panels (head, body, legs) and keep moving: height sets the pitch, left to right scrubs through your sample, and speed sets the volume. Let go and the drawing loops for ever. Each panel is hidden while you draw the next, as in the exquisite corpse game; REVEAL shows the whole creature and DREAM AGAIN wipes it. Starts with a seed drawing so it plays at once.","fonts":"family=Dela+Gothic+One&family=Zen+Kaku+Gothic+New:wght@400;700","bpm":90,
"manifesto":{"name":"Manifesto of Surrealism","short":"Surrealism","author":"André Breton","year":"1924","where":"Paris, October 1924","ideas":["Surrealism should free the mind from reason, logic and moral control, and let the unconscious speak.","Automatic writing: write fast, without a subject, without stopping to read back.","Dreams are as real and important as waking life. The Surrealists' 'exquisite corpse' game builds one figure from parts drawn by different people, each hidden from the next."],"quotes":["Psychic automatism in its pure state","dictated by thought, in the absence of any control exercised by reason"],"system":"You never pick a note: the gesture itself makes the sound, and each drawing replays as a dream loop. The three hidden panels are layered into one exquisite corpse."},
"design":{"name":"Tadanori Yokoo","short":"Tadanori Yokoo","who":"Tadanori Yokoo, Japanese graphic artist","era":"Tokyo, 1960s to 1970s","hallmarks":["Rising-sun rays and Hokusai-style waves mixed with pop imagery","Clashing hot colours: pink, red, turquoise and gold","Collage of postcards, comics and photos, often surreal and autobiographical"],"works":["Having Reached a Climax at the Age of 29, I Was Dead (1965 poster)","Posters for Shūji Terayama's Tenjō Sajiki theatre (late 1960s)","Koshimaki Osen poster (1966)"]}}
*/
/*CSS
:root{--bg:#ffd9e4;--fg:#1b0f2a;--acc:#ff2d55;--bar-bg:#1b0f2a;--bar-font:'Zen Kaku Gothic New',sans-serif;--head-font:'Dela Gothic One',sans-serif}
#mm-stage{display:grid;grid-template-columns:1fr 230px}
#cv{width:100%;height:100%;display:block;touch-action:none;cursor:crosshair}
.side{background:#1b0f2a;color:#ffd9e4;padding:22px 18px;display:flex;flex-direction:column;gap:14px;font:14px/1.4 'Zen Kaku Gothic New'}
.side h1{font:400 44px/.95 'Dela Gothic One';margin:0;color:#3ff0d0}.side h1 span{color:#ff2d55;display:block}
.side button{font:700 15px 'Zen Kaku Gothic New';background:#ffcc00;color:#1b0f2a;border:0;padding:10px;cursor:pointer}.side button:nth-of-type(2){background:#3ff0d0}
.jp{font:400 64px/1 'Dela Gothic One';color:#ff2d55;writing-mode:vertical-rl;margin-top:auto;align-self:flex-end}
*/
/*HTML
<canvas id="cv"></canvas>
<div class="side"><h1>AUTO<span>MATIC</span></h1><div id="part">You are drawing the HEAD.</div><button id="reveal">REVEAL</button><button id="again">DREAM AGAIN</button><div>Draw fast. Do not stop to judge.</div><div class="jp">夢</div></div>
*/
const LOOP = 8, PARTS = ['HEAD', 'BODY', 'LEGS'], scale = [0, 2, 3, 7, 8];
let dreams = [[], [], []], drawing = null, active = 0, revealed = false, nextG = 0, last = null;
const C = MM.canvas('#cv');
function seed() { dreams = PARTS.map((_, p) => { let x = 0.1, y = 0.5; const pts = []; for (let t = 0; t < LOOP; t += 0.05) { x = MM.clamp(x + (Math.random() - 0.4) * 0.03, 0, 1); y = MM.clamp(y + (Math.random() - 0.5) * 0.08, 0, 1); if (x >= 1) x = 0; pts.push({ t, x, y, v: 0.4 + Math.random() * 0.5 }); } return pts; }); }
seed();
function pitchOf(y, p) { const d = Math.floor((1 - y) * 14); return Math.pow(2, (Math.floor(d / 5) * 12 + scale[d % 5] - 12 + p * 0) / 12); }
function grain(t, pt, p) { const kind = ['voice', 'texture', 'tone'][p], b = MM.smp(p, kind);
  MM.play(b, t, { offset: pt.x * Math.max(0, b.duration - 0.2), dur: 0.16, rate: pitchOf(pt.y, p) * (p === 2 ? 0.5 : 1), gain: 0.12 + pt.v * 0.35, fadeIn: 0.05, fadeOut: 0.08, pan: (pt.x - 0.5) * 1.2, send: { rev: 0.35 } }); }
function at(pts, ph) { if (!pts.length) return null; let lo = 0, hi = pts.length - 1; while (lo < hi) { const m = (lo + hi + 1) >> 1; if (pts[m].t <= ph) lo = m; else hi = m - 1; } return pts[lo]; }
MM.drag(C.cv, (x, y, ph) => { const panelH = C.h / 3, p = MM.clamp(Math.floor(y / panelH), 0, 2), nx = x / C.w, ny = (y - p * panelH) / panelH;
  if (ph === 'down') { active = p; drawing = { p, t0: MM.now, pts: [] }; last = null; if (!MM.playing) MM.toggle(true); }
  if (!drawing) return; const t = MM.now - drawing.t0; if (t > LOOP) return;
  const v = last ? MM.clamp(Math.hypot(nx - last.x, ny - last.y) * 30, 0.1, 1) : 0.4; last = { x: nx, y: ny };
  const pt = { t, x: nx, y: MM.clamp(ny, 0, 1), v }; drawing.pts.push(pt); grain(MM.now, pt, drawing.p);
  if (ph === 'up') { dreams[drawing.p] = drawing.pts; active = (drawing.p + 1) % 3; drawing = null; MM.$('#part').textContent = `You are drawing the ${PARTS[active]}.`; } });
MM.$('#reveal').onclick = () => (revealed = !revealed);
MM.$('#again').onclick = () => { dreams = [[], [], []]; revealed = false; active = 0; MM.$('#part').textContent = 'You are drawing the HEAD.'; };
MM.init({ bpm: 90,
  tick(now) { if (nextG < now) nextG = now; while (nextG < now + 0.1) { const ph = nextG % LOOP; dreams.forEach((d, p) => { if (drawing && drawing.p === p) return; const pt = at(d, ph); if (pt && Math.abs(pt.t - ph) < 0.25) grain(nextG, pt, p); }); nextG += 0.07; } },
  draw(ts) { C.fit(); const g = C.g, W = C.w, H = C.h, ph = MM.now % LOOP; g.fillStyle = '#ffd9e4'; g.fillRect(0, 0, W, H);
    g.save(); g.translate(W / 2, H * 1.05); for (let i = 0; i < 28; i++) { g.rotate(Math.PI / 28); g.fillStyle = i % 2 ? '#ff2d55' : '#ffd9e4'; g.beginPath(); g.moveTo(0, 0); g.lineTo(-W, -H * 1.2); g.lineTo(-W * 0.9, -H * 1.4); g.fill(); } g.restore();
    g.fillStyle = '#ffcc00'; g.beginPath(); g.arc(W / 2, H * 1.05, H * 0.25, 0, 7); g.fill();
    for (let p = 0; p < 3; p++) { const y0 = p * H / 3, hidden = !revealed && p !== active && !(drawing && drawing.p === p);
      g.strokeStyle = '#1b0f2a'; g.lineWidth = 3; g.strokeRect(6, y0 + 6, W - 12, H / 3 - 12);
      if (hidden && dreams[p].length) { g.fillStyle = 'rgba(27,15,42,.92)'; g.fillRect(6, y0 + 6, W - 12, H / 3 - 12); g.fillStyle = '#3ff0d0'; g.font = "400 28px 'Dela Gothic One'"; g.fillText(PARTS[p] + ' · HIDDEN', 24, y0 + 44); continue; }
      const pts = drawing && drawing.p === p ? drawing.pts : dreams[p]; g.strokeStyle = ['#1b0f2a', '#2b2bff', '#0a7a5a'][p]; g.lineWidth = 4; g.lineJoin = 'round'; g.beginPath();
      pts.forEach((q, k) => { const X = q.x * W, Y = y0 + q.y * H / 3; k ? g.lineTo(X, Y) : g.moveTo(X, Y); }); g.stroke();
      const cur = at(pts, ph); if (cur && MM.playing) { g.fillStyle = '#ff2d55'; g.beginPath(); g.arc(cur.x * W, y0 + cur.y * H / 3, 11, 0, 7); g.fill(); }
      g.fillStyle = '#1b0f2a'; g.font = "700 13px 'Zen Kaku Gothic New'"; g.fillText(PARTS[p], 16, y0 + 24); } }
});
