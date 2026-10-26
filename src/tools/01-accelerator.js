/*META
{"title":"Accelerator","idea":"A drum machine that can only speed up, until it crashes and starts again.","how":"Press PLAY. The tempo climbs on its own; ACCEL sets how hard you press the pedal and BRAKE (or B) drops it back. Click the squares to change the pistons (kick, snare, hat). At 240 BPM the machine crashes, rebuilds its pattern and pulls away again. Your samples become the pistons, pitched up as the speed rises.","fonts":"family=Archivo+Black&family=Archivo:wght@400;700","bpm":84,
"manifesto":{"name":"The Founding and Manifesto of Futurism","short":"Futurism","author":"Filippo Tommaso Marinetti","year":"1909","where":"Le Figaro, Paris, 20 February 1909","ideas":["Speed, machines and danger are the new beauty; the past (museums, libraries, academies) should be swept away.","A roaring racing car is more beautiful than the Victory of Samothrace (paraphrase of point 4).","Art should be aggressive and full of energy, not contemplative."],"quotes":["Time and Space died yesterday."],"system":"Tempo is the only thing that matters and it only ever increases. The past is never kept: every crash throws away the old pattern and builds a new one. The engine drone follows the speed, so velocity itself becomes the melody."},
"design":{"name":"Plakatstil (German 'poster style')","short":"Plakatstil","who":"Lucian Bernhard, Ludwig Hohlwein, Hans Rudi Erdt","era":"Berlin, about 1905 to 1920s","hallmarks":["One object, shown big and flat, on a plain ground","The brand name in heavy hand-drawn letters, and nothing else","Few flat colours, strong silhouettes, no decoration"],"works":["Lucian Bernhard, Priester matches poster (1905)","Lucian Bernhard, Manoli cigarettes posters (about 1910)","Hans Rudi Erdt, Opel poster (1911)"]}}
*/
/*CSS
:root{--bg:#efe3c6;--fg:#1d1a17;--acc:#d7261e;--bar-font:'Archivo',Arial,sans-serif;--head-font:'Archivo Black',Impact,sans-serif}
#mm-stage{display:grid;grid-template-rows:1fr auto;padding:28px 40px 18px}
.top{display:grid;grid-template-columns:1.4fr 1fr;align-items:center;gap:20px}
.brand{font:400 clamp(70px,13vw,190px)/.82 'Archivo Black',Impact,sans-serif;letter-spacing:-.04em;color:var(--fg)}
.brand span{color:var(--acc)}
.tach{text-align:right}.tach b{display:block;font:400 clamp(80px,12vw,170px)/.8 'Archivo Black',Impact,sans-serif;color:var(--acc)}.tach small{font:700 16px 'Archivo',sans-serif;letter-spacing:.3em}
svg#car{width:100%;height:150px;display:block;margin-top:-10px}
.lines{position:absolute;left:0;right:0;top:56%;height:120px;pointer-events:none;overflow:hidden}
.lines i{position:absolute;height:6px;background:var(--fg);left:100%;animation:zoom linear infinite}
@keyframes zoom{to{transform:translateX(-140vw)}}
.ctl{display:flex;gap:22px;align-items:center;font:700 13px 'Archivo',sans-serif;letter-spacing:.12em;margin:8px 0}
.ctl input{accent-color:var(--acc);width:180px}.ctl button{font:400 16px 'Archivo Black',sans-serif;background:var(--fg);color:var(--bg);border:0;padding:8px 18px;cursor:pointer}
.grid{display:grid;grid-template-columns:70px repeat(16,1fr);gap:4px}.grid div{font:700 11px 'Archivo',sans-serif;letter-spacing:.15em;align-self:center}
.grid button{height:30px;border:0;background:#d8c9a6;cursor:pointer}.grid button.on{background:var(--fg)}.grid button.now{outline:4px solid var(--acc);outline-offset:-4px}
.crash{position:fixed;inset:0;background:var(--acc);display:none;align-items:center;justify-content:center;font:400 22vw 'Archivo Black',Impact;color:var(--bg);z-index:5}.crash.on{display:flex}
*/
/*HTML
<div class="top"><div class="brand">TEMPO<span>!</span></div><div class="tach"><b id="bpm">84</b><small>BEATS PER MINUTE</small></div></div>
<div class="lines" id="lines"></div>
<div><svg id="car" viewBox="0 0 800 150" preserveAspectRatio="xMidYMid meet"><g id="carg"><path d="M70 110 L120 70 L300 58 L380 30 L520 30 L600 62 L740 78 L760 110 Z" fill="#d7261e"/><rect x="390" y="40" width="110" height="22" fill="#1d1a17"/><circle cx="200" cy="112" r="34" fill="#1d1a17"/><circle cx="200" cy="112" r="12" fill="#efe3c6"/><circle cx="620" cy="112" r="34" fill="#1d1a17"/><circle cx="620" cy="112" r="12" fill="#efe3c6"/><text x="250" y="100" font-family="Archivo Black,Impact" font-size="34" fill="#efe3c6">MM 1909</text></g></svg>
<div class="ctl"><label>ACCEL <input id="acc" type="range" min="0" max="16" step="0.5" value="5"></label><button id="brake">BRAKE</button><span id="info">NO PAST. ONLY SPEED.</span></div>
<div class="grid" id="grid"></div></div>
<div class="crash" id="crash">CRASH</div>
*/
const NAMES = ['KICK', 'SNARE', 'HAT'], KIND = ['kick', 'snare', 'hat'];
let P = [[1,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1],[1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1]];
let accel = 5, eng = null, lastT = 0, crashes = 0, cur = -1;
const grid = MM.$('#grid'), cells = [];
P.forEach((row, r) => { grid.append(MM.h('div', {}, NAMES[r])); cells[r] = row.map((v, s) => { const b = MM.h('button', { class: v ? 'on' : '' }); b.onclick = () => { P[r][s] ^= 1; b.classList.toggle('on', !!P[r][s]); }; grid.append(b); return b; }); });
const lines = MM.$('#lines'); for (let i = 0; i < 9; i++) lines.append(MM.h('i', { style: `top:${i * 13}px;width:${80 + Math.random() * 260}px;animation-delay:${-Math.random() * 2}s` }));
MM.$('#acc').oninput = (e) => (accel = +e.target.value);
const brake = () => { MM.bpm = Math.max(60, MM.bpm - 40); MM.noise(MM.now, 0.4, { freq: 3000, q: 3, gain: 0.15, sweep: 600 }); };
MM.$('#brake').onclick = brake;
function rebuild() { P = P.map((row, r) => row.map((_, s) => (r === 0 ? (s % 4 === 0 || Math.random() < 0.18) : r === 1 ? (s % 8 === 4 || Math.random() < 0.1) : Math.random() < 0.7) ? 1 : 0)); P.forEach((row, r) => row.forEach((v, s) => cells[r][s].classList.toggle('on', !!v))); }
function crash(t) { crashes++; MM.noise(t, 2.2, { freq: 800, type: 'lowpass', q: 0.5, gain: 0.6, sweep: 60 }); MM.play(MM.smp(0, 'kick'), t, { rate: 0.4, gain: 0.9 }); MM.bpm = 70 + Math.random() * 20; rebuild(); MM.$('#crash').classList.add('on'); setTimeout(() => MM.$('#crash').classList.remove('on'), 380); MM.$('#info').textContent = `CRASH ${crashes}. THE PAST IS GONE. AGAIN.`; }
MM.init({
  bpm: 84, div: 4, key(e) { if (e.key === 'b' || e.key === 'B') brake(); },
  start() { const c = MM.ctx; const o = c.createOscillator(), o2 = c.createOscillator(), lp = c.createBiquadFilter(), g = c.createGain(); o.type = 'sawtooth'; o2.type = 'square'; lp.Q.value = 7; g.gain.value = 0; g.gain.setTargetAtTime(0.07, c.currentTime, 0.3); o.connect(lp); o2.connect(lp); lp.connect(g); g.connect(MM.out); o.start(); o2.start(); eng = { o, o2, lp, g }; lastT = c.currentTime; },
  stop() { if (eng) { const t = MM.now; eng.g.gain.setTargetAtTime(0, t, 0.1); eng.o.stop(t + 0.5); eng.o2.stop(t + 0.5); eng = null; } },
  tick(now) { const dt = Math.min(0.1, now - lastT); lastT = now; MM.bpm = MM.bpm + accel * dt; if (MM.bpm >= 240) crash(now + 0.02);
    if (eng) { const f = 28 + MM.bpm * 0.32; eng.o.frequency.setTargetAtTime(f, now, 0.05); eng.o2.frequency.setTargetAtTime(f * 0.501, now, 0.05); eng.lp.frequency.setTargetAtTime(150 + MM.bpm * 9, now, 0.05); } },
  step(i, t) { const s = i % 16, rate = 0.8 + (MM.bpm - 60) / 260; cur = s;
    P.forEach((row, r) => { if (row[s]) MM.play(MM.user ? MM.smp(r) : MM.fb[KIND[r]], t, { rate: r === 0 ? rate * 0.9 : rate, gain: [0.9, 0.6, 0.35][r], dur: MM.user ? Math.min(0.5, 60 / MM.bpm) : undefined, fadeOut: 0.03, pan: r === 2 ? 0.3 : 0 }); }); },
  draw(ts) { MM.$('#bpm').textContent = Math.round(MM.bpm); const sp = Math.max(0.15, 2.4 - MM.bpm / 110); MM.$$('#lines i').forEach((l) => (l.style.animationDuration = sp + 's')); lines.style.opacity = MM.playing ? 1 : 0;
    MM.$('#carg').setAttribute('transform', `translate(${MM.playing ? Math.sin(ts * 40) * MM.bpm / 120 : 0},${MM.playing ? Math.sin(ts * 31) * MM.bpm / 160 : 0})`);
    cells.forEach((row) => row.forEach((b, s) => b.classList.toggle('now', MM.playing && s === cur))); }
});
