/*META
{"title":"Dérive","idea":"A walker drifts through a psychogeographic city; each district has its own sound, and the city's pull decides the route.","how":"Press PLAY. The walker drifts through the city map, pulled by the districts and by chance. Your footsteps are tiny grains of your sample. Each district is a different treatment of your sample (market, river, station, arcade, wasteland, bridge), and you hear it more strongly the closer the walker gets. Drag the walker to take it somewhere, or drop arrows (click the map) to change the currents. DÉTOURNEMENT hijacks the current district: reversed, re-pitched and cut up.","fonts":"family=Anton&family=Courier+Prime:wght@400;700&family=Bowlby+One&family=Rubik+Mono+One","bpm":96,
"manifesto":{"name":"Report on the Construction of Situations","short":"Situationism","author":"Guy Debord","year":"1957","where":"written for the founding of the Situationist International at Cosio di Arroscia, Italy, July 1957","ideas":["Constructed situations: moments of life deliberately built from a unity of setting and events.","Psychogeography: the study of how city spaces act on feelings and behaviour, with the dérive (drift) as its method.","Détournement: hijacking existing images and words and turning them against their first meaning."],"quotes":[],"system":"The tool does not loop through a song. It sets up a city of sound districts and a walker who drifts through them. The music is the record of that drift, so the city's contours build the situation, and détournement lets you hijack whatever district you are in."},
"design":{"name":"Jamie Reid","short":"Jamie Reid","who":"Jamie Reid, artist and designer for the Sex Pistols, influenced by the Situationists","era":"London, 1970s","hallmarks":["Ransom-note lettering cut from newspapers","Fluorescent pink, yellow and green with black halftone","Détourned images, such as the Queen with a safety pin"],"works":["God Save the Queen sleeve (1977)","Never Mind the Bollocks sleeve (1977)","Suburban Press (1970 to 1975)"]}}
*/
/*CSS
:root{--bg:#ffe600;--fg:#111;--acc:#ff2d8a;--bar-font:'Courier Prime',monospace;--head-font:'Anton',sans-serif}
#mm-stage{background:#ffe600}
#cv{position:absolute;inset:0;width:100%;height:100%;touch-action:none}
.rn{position:absolute;left:18px;top:14px;display:flex;flex-wrap:wrap;gap:3px;max-width:520px;pointer-events:none}
.rn span{display:inline-block;padding:2px 7px;font-size:44px;line-height:1;transform:rotate(var(--r))}
#det{position:absolute;right:20px;top:20px;font:400 28px 'Anton';background:#ff2d8a;color:#111;border:4px solid #111;padding:8px 16px;cursor:pointer;transform:rotate(3deg)}
#where{position:absolute;right:20px;bottom:16px;font:700 18px 'Courier Prime';background:#111;color:#ffe600;padding:6px 10px}
*/
/*HTML
<canvas id="cv"></canvas><div class="rn" id="rn"></div><button id="det">DÉTOURNEMENT</button><div id="where"></div>
*/
const fonts = ['Anton', 'Courier Prime', 'Bowlby One', 'Rubik Mono One', 'Georgia', 'Impact'];
[...'DÉRIVE·1957'].forEach((ch, k) => { const s = MM.h('span', {}, ch); s.style.fontFamily = `'${fonts[k % fonts.length]}'`; s.style.setProperty('--r', ((k * 37) % 13 - 6) + 'deg'); const bg = ['#111', '#fff', '#ff2d8a', '#7cff4f'][k % 4]; s.style.background = bg; s.style.color = bg === '#111' ? '#ffe600' : '#111'; MM.$('#rn').append(s); });
const D = [{ n: 'MARKET', x: 0.22, y: 0.62, c: '#ff2d8a' }, { n: 'RIVER', x: 0.5, y: 0.85, c: '#4fd6ff' }, { n: 'STATION', x: 0.78, y: 0.6, c: '#fff' }, { n: 'ARCADE', x: 0.62, y: 0.32, c: '#7cff4f' }, { n: 'WASTELAND', x: 0.35, y: 0.3, c: '#111' }, { n: 'BRIDGE', x: 0.86, y: 0.86, c: '#ff8a00' }];
let W = { x: 0.5, y: 0.5, vx: 0.001, vy: 0 }, arrows = [], det = 0, nearest = 0, dragging = false, trail = [];
const C = MM.canvas('#cv');
MM.drag(C.cv, (x, y, ph) => { const nx = x / C.cv.clientWidth, ny = y / C.cv.clientHeight; if (ph === 'down') { dragging = Math.hypot(nx - W.x, ny - W.y) < 0.05; if (!dragging) { arrows.push({ x: nx, y: ny, a: Math.random() * Math.PI * 2 }); if (arrows.length > 8) arrows.shift(); } } if (dragging) { W.x = nx; W.y = ny; } if (ph === 'up') dragging = false; });
MM.$('#det').onclick = () => { det = 1; MM.toast('détournement: ' + D[nearest].n.toLowerCase() + ' hijacked'); };
const weight = (d) => Math.max(0, 1 - Math.hypot(W.x - d.x, W.y - d.y) / 0.32);
MM.init({ bpm: 96, div: 4,
  step(i, t, sd) { const B = MM.smp(0, 'loop'), s = i % 16; if (s % 4 === 0) MM.play(B, t, { offset: ((W.x * 7 + W.y * 3) % 1) * B.duration * 0.9, dur: 0.07, gain: 0.45, rate: 0.8, filter: { type: 'lowpass', freq: 1800 } }); D.forEach((d, k) => { let w = weight(d); if (w < 0.03) return; const hj = det > 0 && k === nearest; const R = (o) => (hj ? { ...o, rate: (o.rate || 1) * MM.pick([0.5, 0.75, 1.5, 2]), offset: Math.random() * B.duration * 0.8, dur: Math.min(o.dur || 0.2, 0.12) } : o);
      if (d.n === 'MARKET' && Math.random() < 0.6 * w) MM.play(B, t, R({ offset: Math.random() * B.duration * 0.9, dur: 0.06, rate: 1 + Math.random(), gain: 0.6 * w, pan: Math.random() - 0.5 }));
      if (d.n === 'RIVER' && s % 8 === 0) MM.play(B, t, R({ offset: (i % 32) / 32 * B.duration * 0.6, dur: sd * 8, rate: 0.5, gain: 0.5 * w, filter: { type: 'lowpass', freq: 600 }, fadeIn: 0.3, fadeOut: 0.5, send: { rev: 0.6 } }));
      if (d.n === 'STATION') { if (s % 4 === 0) MM.play(MM.fb.kick, t, { gain: 0.8 * w }); if (s % 2) MM.play(MM.fb.hat, t, { gain: 0.3 * w }); if (s === 8) MM.play(B, t, R({ dur: sd * 2, gain: 0.7 * w })); }
      if (d.n === 'ARCADE' && s % 3 === 0) MM.tone(MM.mtof(MM.deg((i * 5) % 12, 'major', 64)), t, sd * 0.8, { type: 'square', gain: 0.08 * w, cutoff: 3000, send: { dly: 0.3 } });
      if (d.n === 'WASTELAND' && s === 0) MM.noise(t, sd * 14, { freq: 300, sweep: 120, q: 2, gain: 0.25 * w, send: { rev: 0.5 } });
      if (d.n === 'BRIDGE' && s % 6 === 0) MM.tone(MM.mtof(MM.deg(s / 6, 'minor', 45)), t, sd * 6, { type: 'sawtooth', gain: 0.12 * w, cutoff: 800, attack: 0.1 }); });
    det = Math.max(0, det - 0.01); },
  draw() { C.fit(); const g = C.g, w = C.w, h = C.h;
    if (MM.playing && !dragging) { let ax = 0, ay = 0; D.forEach((d) => { const dx = d.x - W.x, dy = d.y - W.y, r = Math.hypot(dx, dy) + 0.05; ax += dx / (r * r * r) * 0.0000015; ay += dy / (r * r * r) * 0.0000015; }); arrows.forEach((a) => { const r = Math.hypot(a.x - W.x, a.y - W.y); if (r < 0.2) { ax += Math.cos(a.a) * 0.00006; ay += Math.sin(a.a) * 0.00006; } });
      W.vx = (W.vx + ax + (Math.random() - 0.5) * 0.00012) * 0.985; W.vy = (W.vy + ay + (Math.random() - 0.5) * 0.00012) * 0.985; const sp = Math.hypot(W.vx, W.vy); if (sp > 0.003) { W.vx *= 0.003 / sp; W.vy *= 0.003 / sp; } W.x += W.vx; W.y += W.vy; if (W.x < 0.04 || W.x > 0.96) W.vx *= -1; if (W.y < 0.12 || W.y > 0.96) W.vy *= -1; W.x = MM.clamp(W.x, 0.04, 0.96); W.y = MM.clamp(W.y, 0.12, 0.96); trail.push([W.x, W.y]); if (trail.length > 600) trail.shift(); }
    g.fillStyle = '#ffe600'; g.fillRect(0, 0, w, h); g.strokeStyle = 'rgba(0,0,0,.12)'; g.lineWidth = 1; for (let k = 0; k < 30; k++) { g.beginPath(); g.moveTo(0, (k / 30) * h + Math.sin(k) * 20); g.lineTo(w, (k / 30) * h + Math.cos(k * 1.3) * 40); g.stroke(); g.beginPath(); g.moveTo((k / 30) * w, 0); g.lineTo((k / 30) * w + Math.sin(k * 2) * 60, h); g.stroke(); }
    let best = 0; D.forEach((d, k) => { const wt = weight(d); if (wt > weight(D[best])) best = k; g.save(); g.translate(d.x * w, d.y * h); g.rotate(((k * 7) % 5 - 2) * 0.05); g.fillStyle = d.c; const R = 0.32 * Math.min(w, h) * 0.55; g.beginPath(); for (let a = 0; a < 7; a++) g.lineTo(Math.cos(a * 1.05) * R * (0.8 + (a % 2) * 0.3), Math.sin(a * 1.05) * R * (0.8 + (a % 3) * 0.15)); g.closePath(); g.globalAlpha = 0.25 + wt * 0.6; g.fill(); g.globalAlpha = 1; g.fillStyle = '#111'; g.fillRect(-60, -16, 120, 30); g.fillStyle = d.c === '#111' ? '#ffe600' : d.c; g.font = "400 22px 'Anton'"; g.textAlign = 'center'; g.fillText(d.n, 0, 7); g.restore(); }); nearest = best;
    g.strokeStyle = '#ff2d8a'; g.lineWidth = 3; g.setLineDash([8, 6]); g.beginPath(); trail.forEach(([x, y], k) => (k ? g.lineTo(x * w, y * h) : g.moveTo(x * w, y * h))); g.stroke(); g.setLineDash([]);
    arrows.forEach((a) => { g.save(); g.translate(a.x * w, a.y * h); g.rotate(a.a); g.fillStyle = '#111'; g.beginPath(); g.moveTo(26, 0); g.lineTo(-14, -12); g.lineTo(-6, 0); g.lineTo(-14, 12); g.fill(); g.restore(); a.a += 0.002; });
    g.fillStyle = '#111'; g.beginPath(); g.arc(W.x * w, W.y * h, 14, 0, 7); g.fill(); g.fillStyle = '#ff2d8a'; g.beginPath(); g.arc(W.x * w, W.y * h, 6, 0, 7); g.fill();
    MM.$('#where').textContent = 'drifting near: ' + D[nearest].n + (det > 0 ? ' (DÉTOURNÉ)' : ''); }
});
