/*META
{"title":"Slow Cooker","idea":"Time-stretch your sample until it slows to near stillness, simmering it in grains that you season and leave to ripen.","how":"Press PLAY. Your sample is put in the pot and played back extremely slowly as a cloud of grains (up to 200 times slower) without changing its pitch. SLOWNESS sets how slowly the cooking head moves through the sound. SEASON adds tiny accents of salt (high grains) and herbs (lower octaves). Leave it alone: the longer it plays, the more the flavours ripen (the cloud gets denser and warmer). Clicking the bowl adds a single bell and nothing else.","fonts":"family=Shippori+Mincho:wght@400;700&family=Inter:wght@300","bpm":40,
"manifesto":{"name":"Slow Food Manifesto","short":"Slow Food","author":"Folco Portinari, for the movement founded by Carlo Petrini","year":"1989","where":"signed in Paris in December 1989 at the founding of the international Slow Food movement","ideas":["A defence against 'Fast Life', which disrupts our habits and our homes.","Material pleasure and slow, long-lasting enjoyment as the remedy.","Rediscover the flavours of local cooking and take time for them."],"quotes":["We are enslaved by speed."],"system":"Nothing is hurried here. The sample, the 'ingredient', is cooked at extreme slowness, and the result improves the longer you leave it, with careful seasoning instead of more ingredients."},
"design":{"name":"Kenya Hara","short":"Kenya Hara","who":"Kenya Hara, Japanese designer and art director of MUJI","era":"Tokyo, 1990s to today","hallmarks":["Emptiness (utsuwa, the vessel) and the colour white as a space for meaning","Very quiet type and lots of space, with natural materials","Design as sensation, touch and 'haptic' experience"],"works":["Art direction for MUJI (from 2002)","The book White (2008)","Opening and closing ceremony programmes for the Nagano Winter Olympics (1998)"]}}
*/
/*CSS
:root{--bg:#f6f4ef;--fg:#3a3832;--acc:#9b8f7a;--bar-font:'Inter',sans-serif;--head-font:'Shippori Mincho',serif}
#mm-stage{background:#f6f4ef;overflow:hidden}#cv{position:absolute;inset:0;width:100%;height:100%}
.t{position:absolute;left:7%;top:9%;font:400 15px/2 'Shippori Mincho';color:#3a3832;letter-spacing:.3em;writing-mode:vertical-rl;pointer-events:none}
.c{position:absolute;right:7%;bottom:9%;width:220px;display:flex;flex-direction:column;gap:8px;font:300 11px 'Inter';letter-spacing:.2em;color:#9b8f7a}.c input{accent-color:#9b8f7a}
#rip{position:absolute;left:50%;bottom:9%;transform:translateX(-50%);font:300 11px 'Inter';letter-spacing:.3em;color:#9b8f7a}
*/
/*HTML
<canvas id="cv"></canvas><div class="t">ゆっくり · slow · 1989</div>
<div class="c">SLOWNESS<input id="sl" type="range" min="10" max="200" value="60">SEASON<input id="se" type="range" min="0" max="1" step="0.01" value="0.3"></div><div id="rip"></div>
*/
let slow = 60, season = 0.3, head = 0, ripe = 0, t0 = 0, last = 0, dots = [], bells = [];
MM.$('#sl').oninput = (e) => (slow = +e.target.value); MM.$('#se').oninput = (e) => (season = +e.target.value);
const C = MM.canvas('#cv');
C.cv.addEventListener('pointerdown', () => { if (!MM.playing) return; MM.tone(880, MM.now, 4, { partials: [[1, 1], [2.4, 0.4], [5.9, 0.2]], gain: 0.08, release: 3.5, send: { rev: 0.5 } }); bells.push(1); });
MM.init({ bpm: 40, div: 4,
  start() { t0 = MM.now; head = 0; last = 0; },
  tick(now) { const B = MM.smp(0, 'texture'), dur = B.duration; ripe = Math.min(1, (now - t0) / 90); if (!last) last = now; const dt = now - last; last = now; head = (head + dt / slow) % 1;
    const rate = 1 / (0.12 - ripe * 0.06); // grains per second goes from about 8 to 17
    if (Math.random() < rate * dt * 2) { const k = Math.random(); let r = 1; if (k < season * 0.15) r = 2; else if (k < season * 0.35) r = 0.5; const off = MM.clamp(head * dur + (Math.random() - 0.5) * 0.05, 0, dur - 0.2);
      MM.play(B, now + 0.05, { offset: off, dur: 0.18 + ripe * 0.25, rate: r, gain: 0.25 + ripe * 0.1, fadeIn: 0.08, fadeOut: 0.1, pan: (Math.random() - 0.5) * 0.8, filter: { type: 'lowpass', freq: 9000 - ripe * 5000 }, send: { rev: 0.3 + ripe * 0.3 } }); dots.push({ a: Math.random() * 7, r: Math.random(), l: 1, s: r }); } },
  step(i, t, sd) { if (i % 16 === 0) { MM.tone(65.41, t, sd * 18, { type: 'sine', gain: 0.06 + ripe * 0.05, attack: 2, release: 3 }); MM.play(MM.smp(0, 'texture'), t, { gain: 0.2, fadeIn: 0.2, fadeOut: 0.4 }); } },
  draw() { C.fit(); const g = C.g, w = C.w, h = C.h, cx = w / 2, cy = h * 0.46, R = Math.min(w, h) * 0.26; g.fillStyle = '#f6f4ef'; g.fillRect(0, 0, w, h);
    g.strokeStyle = '#d8d2c4'; g.lineWidth = 1; g.beginPath(); g.ellipse(cx, cy + R * 0.55, R * 1.1, R * 0.18, 0, 0, Math.PI); g.stroke(); g.beginPath(); g.ellipse(cx, cy, R * 1.1, R * 0.35, 0, 0, 7); g.stroke();
    g.fillStyle = `rgba(155,143,122,${0.05 + ripe * 0.15})`; g.beginPath(); g.ellipse(cx, cy, R * 1.1 * (0.3 + ripe * 0.7), R * 0.35 * (0.3 + ripe * 0.7), 0, 0, 7); g.fill();
    dots = dots.filter((d) => { d.l -= 0.006; g.fillStyle = d.s > 1 ? `rgba(58,56,50,${d.l})` : d.s < 1 ? `rgba(120,140,100,${d.l})` : `rgba(155,143,122,${d.l})`; g.beginPath(); g.arc(cx + Math.cos(d.a) * d.r * R, cy + Math.sin(d.a) * d.r * R * 0.32 - (1 - d.l) * 60, 2, 0, 7); g.fill(); return d.l > 0; });
    g.fillStyle = '#3a3832'; g.fillRect(cx - R, h * 0.82, 2 * R, 1); g.fillRect(cx - R + head * 2 * R - 1, h * 0.82 - 6, 2, 13);
    MM.$('#rip').textContent = MM.playing ? (ripe < 0.3 ? 'SIMMERING' : ripe < 0.8 ? 'RIPENING' : 'READY · STILL COOKING') + ' · ' + Math.round(ripe * 100) + '%' : 'THE POT IS COLD'; }
});
