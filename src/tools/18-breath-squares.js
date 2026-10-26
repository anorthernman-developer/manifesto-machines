/*META
{"title":"Breath Squares","idea":"Four nested squares are four drones that breathe; colours that sit close together make their tones beat against each other.","how":"Press PLAY and listen. The squares breathe on their own, slowly. Hold the mouse button (or touch) anywhere to breathe in and let go to breathe out; the drones follow your breath, each a little later than the one inside it. Click a square to change its colour. Each colour has its own pitch, and two neighbouring colours that are close in hue make slow beats, so you can hear the interaction of colour. The outer square is your sample, stretched into air.","fonts":"family=Karla:wght@300;700","bpm":60,
"manifesto":{"name":"Sonic Meditations","short":"Sonic Meditations","author":"Pauline Oliveros","year":"1971","where":"written with the ♀ Ensemble at the University of California, San Diego, 1971; Oliveros later named the wider practice Deep Listening (1989)","ideas":["Short text pieces for anyone, often with no musical training, built from breathing, listening and making long tones.","Oliveros distinguished focused attention from global, open awareness, and asked listeners to move between the two.","Listening is the music: the aim is healing and noticing, not performance."],"quotes":[],"system":"There is no rhythm or melody to compose. The tool slows sound down to breath. The four drones follow your breathing in and out, and your job is to listen to how they change, especially the slow beating where two tones meet."},
"design":{"name":"Josef Albers","short":"Josef Albers","who":"Josef Albers, Bauhaus teacher, then at Black Mountain College and Yale","era":"1950 to 1976 (Homage to the Square series)","hallmarks":["Three or four squares nested, set low on the canvas","Flat colour relationships: the same colour looks different next to different neighbours","Plain, calm type, with colour doing all the work"],"works":["Homage to the Square series (1950 to 1976, over 1,000 works)","Interaction of Color (1963 book)","Two Structural Constellations, Corning Glass Building, New York (1959)"]}}
*/
/*CSS
:root{--bg:#e8e3d8;--fg:#2b2a27;--acc:#c46a2f;--bar-font:'Karla',sans-serif;--head-font:'Karla',sans-serif}
#mm-stage{background:#e8e3d8;display:grid;grid-template-columns:1fr 300px;align-items:center}
.wrap{display:flex;align-items:center;justify-content:center;height:100%}
#sq{position:relative;width:min(80vh,56vw);aspect-ratio:1}
#sq div{position:absolute;cursor:pointer;transition:background .6s}
.side{padding:30px;font:300 15px/1.5 'Karla';display:flex;flex-direction:column;gap:14px}.side h1{font:700 22px 'Karla';margin:0}
#breath{height:8px;background:#d6d0c2}#breath i{display:block;height:100%;background:#2b2a27;width:0}
.sw{display:flex;gap:6px;flex-wrap:wrap}.sw b{width:28px;height:28px;cursor:pointer}
*/
/*HTML
<div class="wrap"><div id="sq"></div></div>
<div class="side"><h1>homage to the breath</h1><div>Hold anywhere to breathe in. Let go to breathe out.</div><div id="breath"><i></i></div><div id="beat"></div><div>Click a square to change its colour.</div></div>
*/
const PAL = ['#c46a2f', '#e1a23b', '#f0d36b', '#8c9a5b', '#4a7a8c', '#2f4a6b', '#7d3c4a', '#b8b0a0', '#e7d7b5', '#a34a28'];
let cols = [7, 0, 1, 2], breath = 0, target = 0, held = false, auto = 0, V = [];
const sq = MM.$('#sq'), boxes = [];
// Albers' proportions: each square sits lower than centre
[[0, 0, 100], [10, 15, 80], [20, 30, 60], [30, 45, 40]].forEach(([x, y, s], i) => { const d = MM.h('div'); Object.assign(d.style, { left: x + '%', top: y + '%', width: s + '%', height: s + '%' }); d.onclick = (e) => { e.stopPropagation(); cols[i] = (cols[i] + 1) % PAL.length; paint(); }; sq.append(d); boxes.push(d); });
function paint() { boxes.forEach((b, i) => (b.style.background = PAL[cols[i]])); }
paint();
const hue = (hex) => { const r = parseInt(hex.slice(1, 3), 16) / 255, g = parseInt(hex.slice(3, 5), 16) / 255, b = parseInt(hex.slice(5, 7), 16) / 255, mx = Math.max(r, g, b), mn = Math.min(r, g, b); let h = 0; if (mx !== mn) { const d = mx - mn; h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; } return ((h * 60) + 360) % 360; };
const RAT = [1, 9 / 8, 5 / 4, 4 / 3, 3 / 2, 5 / 3, 15 / 8, 2];
function freqOf(i) { const h = hue(PAL[cols[i]]), base = [55, 110, 165, 220][i]; return base * RAT[Math.floor(h / 45) % 8]; }
addEventListener('pointerdown', (e) => { if (e.target.closest('#mm-bar,#mm-learn-dlg,.side')) return; held = true; });
addEventListener('pointerup', () => (held = false));
function mk() { const c = MM.ctx; V = [0, 1, 2, 3].map((i) => { const g = c.createGain(); g.gain.value = 0; const lp = c.createBiquadFilter(); lp.frequency.value = 400; lp.connect(g); g.connect(MM.out); const s = c.createGain(); s.gain.value = 0.4; g.connect(s); s.connect(MM.rev); const v = { g, lp, o: [] };
    if (i === 0) { const b = c.createBufferSource(); b.buffer = MM.smp(0, 'texture'); b.loop = true; b.playbackRate.value = 0.5; b.connect(lp); b.start(); v.b = b; }
    else [0, 1].forEach((k) => { const o = c.createOscillator(); o.type = k ? 'sine' : 'triangle'; o.connect(lp); o.start(); v.o.push(o); });
    v.lag = 0; return v; }); }
MM.init({ bpm: 60,
  start() { mk(); auto = MM.now; },
  stop() { V.forEach((v) => { v.g.gain.setTargetAtTime(0, MM.now, 0.3); setTimeout(() => { v.o.forEach((o) => o.stop()); v.b && v.b.stop(); }, 1500); }); V = []; },
  onSamples() { if (V[0]) { V[0].b.stop(); const b = MM.ctx.createBufferSource(); b.buffer = MM.smp(0, 'texture'); b.loop = true; b.playbackRate.value = 0.5; b.connect(V[0].lp); b.start(); V[0].b = b; } },
  tick(now) { if (!V.length) return; const autoB = 0.5 - 0.5 * Math.cos(((now - auto) / 10) * Math.PI * 2); target = held ? 1 : autoB * 0.8; breath += (target - breath) * (held ? 0.04 : 0.03);
    V.forEach((v, i) => { v.lag += (breath - v.lag) * (0.06 - i * 0.012); const f = freqOf(i), a = 0.04 + v.lag * [0.5, 0.16, 0.12, 0.1][i];
      v.g.gain.setTargetAtTime(a, now, 0.1); v.lp.frequency.setTargetAtTime(200 + v.lag * (i === 0 ? 5000 : 2500), now, 0.2);
      // neighbouring hues close together beat slowly
      const nb = i > 0 ? Math.abs(hue(PAL[cols[i]]) - hue(PAL[cols[i - 1]])) : 999, det = nb < 40 ? 0.4 + nb / 20 : 0;
      v.o.forEach((o, k) => o.frequency.setTargetAtTime(f * (k ? 2 : 1) + (k ? det : 0), now, 0.3)); if (v.b) v.b.playbackRate.setTargetAtTime(0.4 + v.lag * 0.2, now, 0.3); }); },
  draw() { MM.$('#breath i').style.width = breath * 100 + '%'; boxes.forEach((b, i) => (b.style.transform = `scale(${1 + (V[i] ? V[i].lag : 0) * 0.015 * (i + 1)})`));
    const pairs = [1, 2, 3].map((i) => Math.abs(hue(PAL[cols[i]]) - hue(PAL[cols[i - 1]]))).filter((d) => d < 40).length; MM.$('#beat').textContent = pairs ? `${pairs} pair${pairs > 1 ? 's' : ''} of close colours beating` : 'no close colours: the tones sit apart'; }
});
