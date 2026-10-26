/*META
{"title":"Auto-Destructive Loop","idea":"A loop that destroys itself as it plays; its slow death is the piece, shown as a wall of bananas turning from green to brown.","how":"Press PLAY. Your sample loops in 48 pieces, one banana per piece. Every pass, acid eats into the loop: pieces fade, crackle, drop out and at last fall silent, and their bananas ripen and rot. LIFETIME sets how many passes the work survives (from a few moments to many minutes). When it has all gone, the work is finished; press REBUILD to make a new one. Click a banana to rot that piece straight away.","fonts":"family=Homemade+Apple&family=Libre+Franklin:wght@400;800","bpm":100,
"manifesto":{"name":"Auto-Destructive Art (manifestos 1 to 3)","short":"Auto-Destructive Art","author":"Gustav Metzger","year":"1959 to 1961","where":"London: the first manifesto is dated 4 November 1959; Metzger gave a public demonstration on the South Bank in 1961, painting acid onto nylon","ideas":["Art whose own process of disintegration is the work.","A public art for industrial societies, a response to the bomb and mass destruction.","Each work has a lifetime, and when the disintegration is complete the work is over."],"quotes":["Auto-destructive art is primarily a form of public art for industrial societies."],"system":"The loop is built to decay: each pass damages it further, permanently, until it falls silent. You choose its lifetime, but you cannot save it. The destruction is the music."},
"design":{"name":"Stefan Sagmeister","short":"Sagmeister","who":"Stefan Sagmeister, Austrian designer in New York (Sagmeister & Walsh)","era":"New York, 1990s to now","hallmarks":["Type made from real, often perishable things: bananas, the body, coins, food","Handwriting and craft rather than slick finish","Personal maxims from his list 'Things I have learned in my life so far'"],"works":["Banana wall, 'Self-confidence produces fine results', Deitch Projects (2008): 10,000 bananas that changed colour as they ripened","AIGA Detroit poster with type cut into his own skin (1999)","Lou Reed, Set the Twilight Reeling sleeve (1996)"]}}
*/
/*CSS
:root{--bg:#f6f1e2;--fg:#2a2116;--acc:#b8860b;--bar-font:'Libre Franklin',sans-serif;--head-font:'Libre Franklin',sans-serif}
#mm-stage{background:#f6f1e2}
#cv{position:absolute;left:0;right:0;top:0;bottom:90px;width:100%;height:calc(100% - 90px);cursor:pointer}
.foot{position:absolute;left:30px;right:30px;bottom:12px;height:70px;display:flex;align-items:center;gap:24px;font:400 14px 'Libre Franklin'}
.foot h1{font:400 26px 'Homemade Apple';margin:0;flex:1}
.foot input{accent-color:#b8860b}.foot button{font:800 14px 'Libre Franklin';background:#2a2116;color:#f6f1e2;border:0;padding:10px 18px;cursor:pointer}
#life{font:800 13px 'Libre Franklin';min-width:150px}
*/
/*HTML
<canvas id="cv"></canvas><div class="foot"><h1>everything I make destroys itself</h1><label>LIFETIME <input id="lt" type="range" min="3" max="40" value="10"> <span id="ltv">10 passes</span></label><button id="re">REBUILD</button><div id="life"></div></div>
*/
const N = 48; let health = [], pass = 0, life = 10, B0 = null, B = null, dead = false;
MM.$('#lt').oninput = (e) => { life = +e.target.value; MM.$('#ltv').textContent = life + ' passes'; };
function rebuild() { health = Array.from({ length: N }, () => 1); pass = 0; dead = false; B = null; }
MM.$('#re').onclick = rebuild; rebuild();
function src() { const s = MM.smp(0, 'loop'); if (s !== B0 || !B) { B0 = s; B = MM.cloneBuf(s); health.forEach((h, k) => h < 1 && corrode(k, 1 - h)); } return B; }
// acid: permanently damage the working copy of the buffer
function corrode(k, amt) { const b = src(), len = Math.floor(b.length / N), a = k * len; for (let c = 0; c < b.numberOfChannels; c++) { const d = b.getChannelData(c); for (let j = a; j < a + len; j++) { if (Math.random() < amt * 0.3) d[j] = 0; else d[j] *= 1 - amt * 0.5; if (Math.random() < amt * 0.004) d[j] = (Math.random() - 0.5) * 0.8 * health[k]; } } }
const C = MM.canvas('#cv');
C.cv.addEventListener('click', (e) => { const r = C.cv.getBoundingClientRect(), { cols, rows, cw, ch } = lay(); const c = Math.floor((e.clientX - r.left) / cw), w = Math.floor((e.clientY - r.top) / ch), k = w * cols + c; if (k >= 0 && k < N) { health[k] = 0; corrode(k, 1); corrode(k, 1); } });
function lay() { const cols = 12, rows = 4; return { cols, rows, cw: C.w / cols, ch: C.h / rows }; }
MM.init({ bpm: 100, div: 4,
  step(i, t, sd) { const b = src(), k = i % N; if (k === 0 && i > 0) { pass++; for (let j = 0; j < N; j++) { const hit = Math.random() < 0.55; if (hit) { health[j] = Math.max(0, health[j] - (1 / life) * (0.6 + Math.random() * 0.9)); corrode(j, 1 - health[j]); } } if (!dead && health.every((h) => h <= 0.01)) { dead = true; MM.toast('the work has destroyed itself'); } }
    const h = health[k]; if (h <= 0.01) return; const seg = b.duration / N;
    MM.play(b, t, { offset: k * seg, dur: Math.min(seg * 1.05, sd * 1.05), gain: 0.9 * (0.3 + h * 0.7), fadeOut: 0.005, filter: { type: 'lowpass', freq: 800 + h * 12000 } });
    if (h < 0.6 && Math.random() < (1 - h) * 0.4) MM.noise(t, 0.02, { freq: 3000 + Math.random() * 5000, q: 2, gain: 0.15 * (1 - h) });
    if (k % 12 === 0) MM.play(MM.fb.kick, t, { gain: 0.3 * (health.reduce((a, x) => a + x, 0) / N) }); },
  draw(ts) { C.fit(); const g = C.g, { cols, cw, ch } = lay(); g.fillStyle = '#f6f1e2'; g.fillRect(0, 0, C.w, C.h); const cur = MM.playing ? Math.floor(((MM.now) / (60 / MM.bpm / 4))) : -1;
    for (let k = 0; k < N; k++) { const x = (k % cols) * cw + cw / 2, y = Math.floor(k / cols) * ch + ch / 2, h = health[k];
      // green -> yellow -> spotted -> brown
      const col = h > 0.75 ? `hsl(${80 + (h - 0.75) * 40},70%,45%)` : h > 0.35 ? `hsl(${50 + (h - 0.35) * 70},85%,${48 + h * 8}%)` : `hsl(30,${40 + h * 80}%,${12 + h * 50}%)`;
      g.save(); g.translate(x, y); g.rotate(-0.5 + (k % 3) * 0.08); g.fillStyle = col; g.beginPath(); g.ellipse(0, -ch * 0.08, cw * 0.42, ch * 0.3, 0, 0.25, Math.PI - 0.25); g.ellipse(0, -ch * 0.14, cw * 0.4, ch * 0.2, 0, Math.PI - 0.25, 0.25, true); g.fill(); g.fillStyle = '#3b2b12'; g.fillRect(-cw * 0.4, -4, 6, 6);
      if (h < 0.6) for (let s = 0; s < (1 - h) * 12; s++) { g.beginPath(); g.arc(((s * 37) % 50 - 25) * cw * 0.012, ((s * 13) % 9 - 4) * 2 + 6, 2 + (1 - h) * 2, 0, 7); g.fillStyle = 'rgba(40,25,10,.7)'; g.fill(); }
      g.restore(); }
    const alive = health.filter((h) => h > 0.01).length; MM.$('#life').textContent = dead ? 'FINISHED: the work is gone' : `pass ${pass} · ${alive}/${N} pieces alive`; }
});
