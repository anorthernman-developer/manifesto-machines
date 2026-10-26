/*META
{"title":"Strident Radio","idea":"Tune a wireless dial across a 1920s city: every station is a different broadcast of your sample, with static and howl in between.","how":"Press PLAY. Drag the dial, or use the arrow keys, to tune between seven stations. Each station broadcasts your sample in a different way (a jazz band, a factory, the news in Morse, a tango orchestra, a choir and a strident siren). Between stations there is static and heterodyne whistle, so tuning itself is part of the music. AUTO lets the dial wander by itself. The closer you are to a station, the clearer it gets.","fonts":"family=Monoton&family=Barlow+Condensed:wght@400;800","bpm":112,
"manifesto":{"name":"Actual No. 1 (Comprimido estridentista)","short":"Estridentismo","author":"Manuel Maples Arce","year":"1921","where":"printed as a poster and pasted on walls in Mexico City, December 1921","ideas":["Art should celebrate the modern city, machines, electricity, cars and radio.","Rejection of the academy and of nostalgic and religious art.","The Estridentistas loved the radio; Kyn Taniya (Luis Quintanilla) wrote 'Radio: poema inalámbrico en trece mensajes' (1924)."],"quotes":["¡Chopin a la silla eléctrica!"],"system":"The instrument is a radio. All the music is in the airwaves, and you tune through the noisy city to find it. The static and squeal between stations are as much a part of the piece as the stations."},
"design":{"name":"Lance Wyman","short":"Lance Wyman","who":"Lance Wyman, American designer of wayfinding and identity systems","era":"Mexico City, 1966 to 1970, then New York","hallmarks":["Mexico 68 lettering: thick letters echoed by concentric parallel lines, influenced by Op Art and Huichol art","Bright, hot colours: magenta, orange, turquoise and green","Pictograms for metro stations and events, readable without words"],"works":["Mexico 68 Olympics identity (1966 to 1968)","Mexico City Metro station pictograms (1969)","Minnesota Zoo identity (1980s)"]}}
*/
/*CSS
:root{--bg:#111;--fg:#fff;--acc:#ff2a8a;--bar-font:'Barlow Condensed',sans-serif;--head-font:'Monoton',cursive}
#mm-stage{background:#111;overflow:hidden}
#cv{position:absolute;inset:0;width:100%;height:100%;touch-action:none}
.t{position:absolute;left:30px;top:18px;font:400 82px/1 'Monoton';color:#ff2a8a;pointer-events:none}.t small{display:block;font:800 18px 'Barlow Condensed';color:#29d3c5;letter-spacing:.4em}
#auto{position:absolute;right:30px;top:30px;font:800 26px 'Barlow Condensed';background:#ff8a00;color:#111;border:0;padding:6px 20px;cursor:pointer;border-radius:30px}#auto.on{background:#29d3c5}
#sta{position:absolute;left:30px;bottom:22px;font:800 34px 'Barlow Condensed';color:#fff;pointer-events:none}
*/
/*HTML
<canvas id="cv"></canvas><div class="t">RADIO 1921<small>ESTRIDENTISMO · MÉXICO</small></div><button id="auto">AUTO</button><div id="sta"></div>
*/
const ST = [{ n: 'JAZZ BAND', f: 0.08, c: '#ff2a8a', ic: '♪' }, { n: 'FACTORY', f: 0.22, c: '#ff8a00', ic: '⚙' }, { n: 'NEWS IN MORSE', f: 0.36, c: '#29d3c5', ic: '·–' }, { n: 'TANGO ORCHESTRA', f: 0.5, c: '#a3e635', ic: '♫' }, { n: 'AEROPLANE', f: 0.64, c: '#ffe600', ic: '✈' }, { n: 'CHOIR', f: 0.78, c: '#ff2a8a', ic: '◎' }, { n: 'STRIDENT SIREN', f: 0.92, c: '#29d3c5', ic: '◢' }];
let dial = 0.36, auto = false, stat = null, het = null, autoT = 0;
const C = MM.canvas('#cv');
MM.drag(C.cv, (x) => { dial = MM.clamp(x / C.cv.clientWidth, 0, 1); });
addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') dial = Math.max(0, dial - 0.01); if (e.key === 'ArrowRight') dial = Math.min(1, dial + 0.01); });
MM.$('#auto').onclick = () => { auto = !auto; MM.$('#auto').classList.toggle('on', auto); };
const clar = (s) => Math.max(0, 1 - Math.abs(dial - s.f) / 0.07);
function noiseNode() { const c = MM.ctx, src = c.createBufferSource(), nb = c.createBuffer(1, c.sampleRate * 2, c.sampleRate), d = nb.getChannelData(0); let b = 0; for (let k = 0; k < d.length; k++) { b = 0.7 * b + 0.3 * (Math.random() * 2 - 1); d[k] = b * (Math.random() < 0.002 ? 4 : 1); } src.buffer = nb; src.loop = true; const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2500; bp.Q.value = 0.6; const g = c.createGain(); g.gain.value = 0; src.connect(bp); bp.connect(g); g.connect(MM.out); src.start(); return { src, g }; }
function hetNode() { const c = MM.ctx, o = c.createOscillator(); o.type = 'sine'; const g = c.createGain(); g.gain.value = 0; o.connect(g); g.connect(MM.out); o.start(); return { o, g }; }
MM.init({ bpm: 112, div: 4, ownL: false,
  start() { stat = noiseNode(); het = hetNode(); },
  stop() { [stat, het].forEach((n) => { if (!n) return; n.g.gain.setTargetAtTime(0, MM.now, 0.05); const s = n.src || n.o; setTimeout(() => s.stop(), 300); }); stat = het = null; },
  step(i, t, sd) { const s = i % 16, B = MM.smp(0, 'loop'), radio = { type: 'bandpass', freq: 1600, q: 0.9 };
    ST.forEach((st, k) => { const c = clar(st); if (c <= 0.02) return; const g = c * c;
      if (k === 0) { if (s % 4 === 0) MM.play(B, t, { offset: (s / 16) * B.duration, dur: sd * 3, gain: g * 0.8, filter: radio }); if (s % 3 === 0) MM.tone(MM.mtof(MM.deg(s % 7, 'blues', 58)), t, sd * 1.5, { type: 'square', gain: g * 0.08, cutoff: 2000 }); }
      if (k === 1) { if (s % 2 === 0) MM.play(B, t, { offset: 0.1 * B.duration, dur: 0.05, rate: 0.7, gain: g * 0.9, filter: radio }); if (s % 8 === 4) MM.noise(t, 0.12, { freq: 900, q: 4, gain: g * 0.5 }); }
      if (k === 2) { const morse = '1011100111010111000101'; if (morse[(i % morse.length)] === '1') MM.tone(880, t, sd * 0.9, { gain: g * 0.2 }); if (s === 0) MM.play(B, t, { dur: sd * 4, gain: g * 0.5, rate: 1.1, filter: radio }); }
      if (k === 3) { if ([0, 3, 6, 8, 12].includes(s)) MM.play(B, t, { offset: (([0, 3, 6, 8, 12].indexOf(s) + 1) / 7) * B.duration, dur: sd * 1.8, gain: g * 0.7, rate: 0.89, filter: radio }); if (s % 8 === 0) MM.tone(MM.mtof(45), t, sd * 6, { type: 'sawtooth', gain: g * 0.1, cutoff: 700 }); }
      if (k === 4) { if (s === 0) MM.play(B, t, { dur: sd * 16, rate: 0.5, gain: g * 0.6, loop: true, filter: { type: 'lowpass', freq: 900 } }); if (s === 0) MM.tone(90, t, sd * 16, { type: 'sawtooth', detune: 30, gain: g * 0.08, cutoff: 400 }); }
      if (k === 5) { if (s % 8 === 0) [0, 4, 7, 12].forEach((iv, q) => MM.play(MM.smp(0, 'voice'), t, { rate: Math.pow(2, iv / 12), dur: sd * 8, gain: g * 0.3, fadeIn: 0.1, fadeOut: 0.3, pan: q / 2 - 0.75, filter: radio, send: { rev: 0.4 } })); }
      if (k === 6) { if (s === 0) MM.tone(500, t, sd * 8, { type: 'sawtooth', glide: 1300, gain: g * 0.12, cutoff: 3000 }); if (s === 8) MM.tone(1300, t, sd * 8, { type: 'sawtooth', glide: 500, gain: g * 0.12, cutoff: 3000 }); if (s % 4 === 0) MM.play(B, t, { offset: B.duration * 0.5, dur: 0.1, rate: 2, gain: g * 0.6, filter: radio }); } }); },
  tick(now) { if (!stat) return; let best = 0; ST.forEach((s) => (best = Math.max(best, clar(s)))); stat.g.gain.setTargetAtTime(0.18 * (1 - best) + 0.015, now, 0.05); const near = ST.reduce((a, s) => (Math.abs(dial - s.f) < Math.abs(dial - a.f) ? s : a)), off = Math.abs(dial - near.f);
    het.o.frequency.setTargetAtTime(300 + off * 30000, now, 0.03); het.g.gain.setTargetAtTime(off > 0.005 && off < 0.06 ? 0.03 : 0, now, 0.05);
    if (auto && now > autoT) { autoT = now + 0.05; dial = MM.clamp(dial + Math.sin(now * 0.3) * 0.004 + (Math.random() - 0.5) * 0.003, 0, 1); } },
  draw(ts) { C.fit(); const g = C.g, w = C.w, h = C.h, cy = h * 0.58; g.fillStyle = '#111'; g.fillRect(0, 0, w, h);
    // Mexico 68 style concentric stripes radiating from the dial needle
    for (let k = 14; k >= 0; k--) { g.strokeStyle = k % 2 ? '#111' : ['#ff2a8a', '#ff8a00', '#29d3c5'][k % 3]; g.lineWidth = 9; g.beginPath(); g.ellipse(dial * w, cy, 40 + k * 22, 26 + k * 14, 0, 0, 7); g.stroke(); }
    g.fillStyle = '#fff'; g.fillRect(0, cy - 2, w, 4); for (let k = 0; k <= 100; k++) { const x = (k / 100) * w; g.fillRect(x, cy - (k % 10 ? 8 : 18), 2, k % 10 ? 16 : 36); }
    ST.forEach((s) => { const c = clar(s); g.fillStyle = s.c; g.globalAlpha = 0.35 + c * 0.65; g.font = "400 46px 'Monoton'"; g.textAlign = 'center'; g.fillText(s.ic, s.f * w, cy - 60); g.font = "800 16px 'Barlow Condensed'"; g.fillText(s.n, s.f * w, cy + 50); }); g.globalAlpha = 1; g.textAlign = 'left';
    g.fillStyle = '#ff2a8a'; g.fillRect(dial * w - 3, cy - 120, 6, 200);
    const near = ST.reduce((a, s) => (clar(s) > clar(a) ? s : a)); MM.$('#sta').textContent = clar(near) > 0.05 ? `${(540 + dial * 1060).toFixed(0)} kHz · ${near.n}` : `${(540 + dial * 1060).toFixed(0)} kHz · static`; }
});
