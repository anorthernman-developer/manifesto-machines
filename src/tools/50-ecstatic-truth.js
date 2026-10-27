/*META
{"title":"Ecstatic Truth","idea":"One slider from the accountant's truth to ecstatic truth: the same recording, played plainly as fact or stylised, slowed and staged into something deeper.","how":"Press PLAY. Your sample is the 'footage'. With the slider at FACT, it plays exactly as recorded, cut on a strict grid, with a dry log of the facts (times, levels). As you move towards ECSTASY, the machine starts to invent: it slows and stretches the sound, adds a choir drone built from it, reverb, and staged scenes (footsteps in snow, a ship's horn, a far-off bell) that were never in the recording. STAGE A SCENE invents one now. The log changes from facts to stranger, invented captions.","fonts":"family=Oswald:wght@300;700&family=Crimson+Pro:ital@0;1","bpm":76,
"manifesto":{"name":"Minnesota Declaration: Truth and Fact in Documentary Cinema","short":"Minnesota Declaration","author":"Werner Herzog","year":"1999","where":"read at the Walker Art Center, Minneapolis, on 30 April 1999","ideas":["Cinéma vérité gives only a superficial 'accountant's truth' of facts.","Deeper truth can be reached only through fabrication, imagination and stylisation.","Ecstatic truth is mysterious and elusive, reached through poetry and invention."],"quotes":["Fact creates norms, and truth illumination.","There are deeper strata of truth in cinema, and there is such a thing as poetic, ecstatic truth."],"system":"One slider moves between fact and fabrication. At FACT the sample is only documented, but towards ECSTASY the machine stylises and stages it, inventing sounds that were never recorded to reach something truer."},
"design":{"name":"Saul Bass","short":"Saul Bass","who":"Saul Bass, American graphic designer and film-title designer","era":"Los Angeles, 1950s to 1990s","hallmarks":["Jagged paper cut-out shapes and a single symbolic image","Bold flat colour (often red, black and orange) with hand-cut type","Spirals, fragmented bodies and kinetic title sequences"],"works":["The Man with the Golden Arm titles and poster (1955)","Vertigo titles and poster (1958)","Anatomy of a Murder poster (1959)"]}}
*/
/*CSS
:root{--bg:#f2e6cf;--fg:#151515;--acc:#d72a12;--bar-font:'Oswald',sans-serif;--head-font:'Oswald',sans-serif}
#mm-stage{background:#f2e6cf;overflow:hidden}#cv{position:absolute;inset:0;width:100%;height:100%}
.ctl{position:absolute;left:5%;right:5%;bottom:22px;display:flex;align-items:center;gap:16px;font:700 18px 'Oswald';letter-spacing:.2em}
.ctl input{flex:1;accent-color:#d72a12;height:24px}.ctl button{font:700 15px 'Oswald';letter-spacing:.15em;background:#151515;color:#f2e6cf;border:0;padding:8px 14px;cursor:pointer}
#log{position:absolute;right:5%;top:24px;width:34%;font:400 italic 17px/1.35 'Crimson Pro';color:#151515;text-align:right}
*/
/*HTML
<canvas id="cv"></canvas><div id="log"></div><div class="ctl">FACT<input id="ex" type="range" min="0" max="1" step="0.01" value="0.35">ECSTASY<button id="stage">STAGE A SCENE</button></div>
*/
let ex = 0.35, log = [], drone = null, scenes = [];
MM.$('#ex').oninput = (e) => (ex = +e.target.value);
const FACTS = (i) => [`00:${String(i % 60).padStart(2, '0')} — segment ${i % 16} played`, `level −${(12 + (i % 7)).toFixed(0)} dB`, 'no edits', 'source: recording'], INV = ['the ice is singing', 'a ship stranded on a mountain', 'footsteps of someone who never arrived', 'the bell of a village drowned in a lake', 'the horn sounds for no one', 'snow falls upwards', 'he walked from Munich to Paris'];
function say(s) { log.unshift(s); log = log.slice(0, 6); MM.$('#log').innerHTML = log.map((l, k) => `<div style="opacity:${1 - k * 0.15}">${l}</div>`).join(''); }
function scene(t) { const k = Math.floor(Math.random() * 3);
  if (k === 0) for (let q = 0; q < 6; q++) MM.noise(t + q * 0.55, 0.18, { freq: 900, q: 0.8, gain: 0.25, sweep: 400, pan: -0.6 + q * 0.2 });
  if (k === 1) MM.tone(73.4, t, 3.5, { type: 'sawtooth', detune: 8, gain: 0.12, attack: 0.3, release: 1.5, cutoff: 600, send: { rev: 0.6 } });
  if (k === 2) MM.tone(523, t, 5, { partials: [[1, 1], [2.4, 0.5], [3.9, 0.3], [5.4, 0.2]], gain: 0.05, release: 4, pan: 0.7, send: { rev: 0.8 } });
  scenes.push({ k, l: 1, x: Math.random() }); say(['(staged) footsteps in snow', '(staged) a ship’s horn', '(staged) a far-off bell'][k]); }
MM.$('#stage').onclick = () => { MM.ensure(); if (!MM.playing) MM.toggle(true); scene(MM.now + 0.05); };
function startDrone() { const B = MM.smp(0, 'loop'); drone = [0.5, 0.75, 1].map((r, q) => MM.play(B, MM.now + 0.1, { loop: true, rate: r * 0.5, gain: 0, filter: { type: 'lowpass', freq: 1200 }, pan: q - 1, send: { rev: 0.6 } })); }
const C = MM.canvas('#cv');
MM.init({ bpm: 76, div: 4,
  start() { startDrone(); say('recording begins'); }, stop() { (drone || []).forEach((d) => d.stop()); drone = null; },
  onSamples() { if (drone) { drone.forEach((d) => d.stop()); startDrone(); } },
  tick(now) { (drone || []).forEach((d) => d.g.gain.setTargetAtTime(Math.max(0, ex - 0.3) * 0.25, now, 0.3)); },
  step(i, t, sd) { const s = i % 16, B = MM.smp(0, 'loop');
    if (ex < 0.6 && s % 4 === 0) MM.play(B, t, { offset: ((i / 4) % 4) / 4 * B.duration, dur: sd * 4, gain: 0.7 * (1 - ex * 0.8), fadeOut: 0.01 });
    if (ex >= 0.3 && s % 8 === 0) MM.play(B, t, { offset: Math.random() * B.duration * 0.5, dur: sd * 8 * (1 + ex), rate: 1 - ex * 0.6, gain: 0.45 * ex, fadeIn: 0.2, fadeOut: 0.6, send: { rev: ex * 0.7 } });
    if (ex < 0.5 && s % 4 === 0) MM.play(MM.fb.kick, t, { gain: 0.4 * (1 - ex) }); if (ex < 0.4 && s % 2 === 1) MM.play(MM.fb.hat, t, { gain: 0.1 });
    if (ex > 0.55 && s === 0 && Math.random() < ex * 0.5) scene(t);
    if (s === 0 && i % 32 === 0) say(Math.random() < ex ? MM.pick(INV) : MM.pick(FACTS(i))); },
  draw(ts) { C.fit(); const g = C.g, w = C.w, h = C.h; g.fillStyle = '#f2e6cf'; g.fillRect(0, 0, w, h);
    // Bass-like spiral and cut-paper bars: the spiral grows with ecstasy, the bars with fact
    const cx = w * 0.32, cy = h * 0.45; g.strokeStyle = '#d72a12'; g.lineWidth = 10 + ex * 8; g.beginPath(); for (let a = 0; a < 6 + ex * 18; a += 0.05) { const r = a * (6 + ex * 6); g.lineTo(cx + Math.cos(a + ts / 3000 * ex) * r, cy + Math.sin(a + ts / 3000 * ex) * r * 0.8); } g.stroke();
    g.fillStyle = '#151515'; const n = Math.round((1 - ex) * 10) + 1; for (let k = 0; k < n; k++) { const j = MM.rng(k + 3); g.save(); g.translate(w * 0.06 + k * 20, h * 0.15); g.rotate((j() - 0.5) * ex * 0.6); g.fillRect(0, 0, 10, h * 0.55 * (0.6 + j() * 0.4)); g.restore(); }
    scenes = scenes.filter((s) => { s.l -= 0.004; g.fillStyle = `rgba(21,21,21,${s.l})`; const x = w * (0.55 + s.x * 0.35), y = h * 0.7; if (s.k === 0) for (let q = 0; q < 5; q++) { g.beginPath(); g.ellipse(x + q * 24, y - (q % 2) * 14, 7, 12, 0.3, 0, 7); g.fill(); } if (s.k === 1) { g.beginPath(); g.moveTo(x - 50, y); g.lineTo(x + 60, y); g.lineTo(x + 40, y + 20); g.lineTo(x - 35, y + 20); g.fill(); g.fillRect(x - 5, y - 40, 12, 40); } if (s.k === 2) { g.beginPath(); g.arc(x, y - 10, 22, Math.PI, 0); g.lineTo(x + 26, y + 10); g.lineTo(x - 26, y + 10); g.fill(); } return s.l > 0; });
    g.fillStyle = '#151515'; g.font = `700 ${Math.round(h * 0.1)}px Oswald`; g.fillText(ex < 0.5 ? 'FACT' : 'TRUTH', w * 0.06, h * 0.86); }
});
