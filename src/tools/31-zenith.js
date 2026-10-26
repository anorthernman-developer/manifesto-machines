/*META
{"title":"Zenith","idea":"An endless climb to the zenith: Shepard tones and a sample that rises forever but never arrives.","how":"Press PLAY. Every voice climbs, and as each one gets too high it fades out while a new one fades in at the bottom, so the climb never ends (a Shepard–Risset glissando). Your sample rises with the tones, re-pitched in ever-higher layers. SPEED sets how fast you climb; BARBARIAN adds the drum of the barbarogenius, a heavy pounding Balkan rhythm in 7/8. Click the stage to fire a rocket of sample fragments towards the zenith.","fonts":"family=Big+Shoulders+Display:wght@400;900&family=IBM+Plex+Mono","bpm":132,
"manifesto":{"name":"Manifesto of Zenitism","short":"Zenitism","author":"Ljubomir Micić","year":"1921","where":"Zenit magazine, Zagreb, 1921 (later Belgrade), with Ivan Goll and Boško Tokin","ideas":["The Barbarogenius: a 'barbarian' genius from the Balkans who will bring new life to a tired Western Europe.","Art aimed at the zenith, the highest point, as a cosmic and spiritual ascent.","An international avant-garde that links Expressionism, Futurism, Dada and Constructivism, from the edge of Europe."],"quotes":[],"system":"The music always climbs towards the zenith and never lands. The barbarian drum below, in an uneven Balkan metre, is the energy that drives the ascent."},
"design":{"name":"Karel Teige","short":"Karel Teige","who":"Karel Teige, Czech artist, typographer and theorist of the Devětsil group","era":"Prague, 1920s to 1930s","hallmarks":["Typographic picture-poems built from sans letters, photos, rules and diagonals","Poetism: modern life as play, with ports, aeroplanes, radio and the circus","Bold red-and-black Constructivist book covers"],"works":["Abeceda (Alphabet), with Vítězslav Nezval and the dancer Milča Mayerová (1926)","Covers for the magazine ReD (1927 to 1931)","Cover for Jaroslav Seifert's Na vlnách TSF (1925)"]}}
*/
/*CSS
:root{--bg:#f0e8d8;--fg:#141414;--acc:#e0301e;--bar-font:'IBM Plex Mono',monospace;--head-font:'Big Shoulders Display',sans-serif}
#mm-stage{background:#f0e8d8;overflow:hidden}#cv{position:absolute;inset:0;width:100%;height:100%;cursor:pointer}
.t{position:absolute;left:4%;bottom:6%;font:900 clamp(70px,13vw,190px)/.8 'Big Shoulders Display';color:#141414;pointer-events:none;letter-spacing:-.02em}.t span{color:#e0301e}
.ctl{position:absolute;right:4%;bottom:7%;display:flex;flex-direction:column;gap:8px;font:400 12px 'IBM Plex Mono';width:200px}
.ctl button{font:900 22px 'Big Shoulders Display';background:#141414;color:#f0e8d8;border:0;padding:6px;cursor:pointer}.ctl button.on{background:#e0301e}
*/
/*HTML
<canvas id="cv"></canvas><div class="t">ZEN<span>IT</span><br>1921</div>
<div class="ctl">SPEED<input id="sp" type="range" min="0.02" max="0.4" step="0.01" value="0.1"><button id="bar" class="on">BARBARIAN</button></div>
*/
let ph = 0, speed = 0.1, barb = true, rockets = [], voices = [], sh = [];
const N = 8, BASE = 30; // 8 octave-spaced layers from about 30 Hz
MM.$('#sp').oninput = (e) => (speed = +e.target.value);
MM.$('#bar').onclick = (e) => { barb = !barb; e.target.classList.toggle('on', barb); };
const C = MM.canvas('#cv');
const amp = (x) => Math.pow(Math.sin(Math.PI * x), 2); // x in 0..1 over the whole range
function startDrone() { const c = MM.ctx; voices = []; for (let k = 0; k < N; k++) { const o = c.createOscillator(), g = c.createGain(); o.type = 'triangle'; g.gain.value = 0; o.connect(g); g.connect(MM.out); o.start(); voices.push({ o, g }); } }
MM.$('#cv').addEventListener('pointerdown', (e) => { if (!MM.playing) return; const B = MM.smp(0, 'loop'); for (let k = 0; k < 6; k++) MM.play(B, MM.now + k * 0.07, { offset: Math.random() * B.duration * 0.9, dur: 0.12, rate: Math.pow(2, k / 3), gain: 0.4, pan: Math.random() - 0.5, send: { rev: 0.4, dly: 0.3 } }); rockets.push({ x: e.offsetX, y: e.offsetY, v: 0 }); });
MM.init({ bpm: 132, div: 4,
  start() { startDrone(); },
  stop() { voices.forEach((v) => { v.g.gain.setTargetAtTime(0, MM.now, 0.05); setTimeout(() => v.o.stop(), 300); }); voices = []; },
  tick(now) { ph = (ph + speed * 0.025) % 1; voices.forEach((v, k) => { const x = (k + ph) / N, f = BASE * Math.pow(2, x * N); v.o.frequency.setTargetAtTime(f, now, 0.03); v.g.gain.setTargetAtTime(amp(x) * 0.05, now, 0.05); }); },
  step(i, t, sd) { const s = i % 14; // 7/8 as 2+2+3 in eighths, doubled
    if (barb && [0, 4, 8, 11].includes(s)) { MM.play(MM.fb.kick, t, { gain: s === 0 ? 1 : 0.7 }); MM.tone(55, t, 0.2, { gain: 0.3 }); }
    if (barb && [2, 6, 10, 13].includes(s)) MM.play(MM.fb.snare, t, { gain: 0.35, rate: 1.1 });
    if (i % 14 === 0) { const B = MM.smp(0, 'loop'); for (let k = 0; k < 3; k++) { const x = ((k * 2.7 + ph * 3) % 3) / 3; MM.play(B, t, { rate: Math.pow(2, x * 2 - 0.5 + ph), gain: amp(x) * 0.5, dur: sd * 14, fadeIn: 0.2, fadeOut: 0.4, pan: k - 1, send: { rev: 0.3 } }); } } },
  draw(ts) { C.fit(); const g = C.g, w = C.w, h = C.h; g.fillStyle = '#f0e8d8'; g.fillRect(0, 0, w, h);
    // Teige-like diagonal bands rising towards a red zenith dot
    g.save(); g.translate(w * 0.62, h); g.rotate(-0.42); for (let k = 0; k < N; k++) { const x = (k + ph) / N; g.fillStyle = k % 2 ? '#141414' : '#e0301e'; g.globalAlpha = 0.15 + amp(x) * 0.85; g.fillRect(-40 + k * 30, -x * h * 1.3, 18, 60 + amp(x) * 160); } g.restore(); g.globalAlpha = 1;
    g.fillStyle = '#e0301e'; g.beginPath(); g.arc(w * 0.82, h * 0.12, 26, 0, 7); g.fill(); g.strokeStyle = '#141414'; g.lineWidth = 2; g.beginPath(); g.moveTo(0, h * 0.12); g.lineTo(w, h * 0.12); g.stroke();
    rockets = rockets.filter((r) => { r.v += 0.3; r.y -= r.v; r.x += r.v * 0.4; g.fillStyle = '#141414'; g.beginPath(); g.moveTo(r.x, r.y - 16); g.lineTo(r.x - 6, r.y + 8); g.lineTo(r.x + 6, r.y + 8); g.fill(); return r.y > -30; });
    g.font = "400 12px 'IBM Plex Mono'"; g.fillStyle = '#141414'; g.fillText('ZENIT · altitude ' + Math.floor(ts / 100) + ' m', 20, 26); }
});
