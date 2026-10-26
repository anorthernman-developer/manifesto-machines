/*META
{"title":"Painted Lines","idea":"Paint melodies by hand in screen-print layers; the loop prints one colour at a time, then all of them together.","how":"Press PLAY. Pick an ink, then paint on the sheet: left to right is time and height is pitch. Each ink is a voice and plays a continuous gliding line wherever you painted: pink is your sample, sung; yellow is a pure lead; blue is the bass; green is a brushed noise. The sheet prints layer by layer, one ink per pass, and then all inks together. WASH SCREEN clears the current ink.","fonts":"family=Caveat+Brush&family=Archivo+Black","bpm":96,
"manifesto":{"name":"The Stuckists manifesto","short":"Stuckism","author":"Billy Childish and Charles Thomson","year":"1999","where":"London, August 1999","ideas":["A call for painting as the central art, made by hand, against conceptual art and ironic gesture.","The artist should be emotionally involved and willing to be seen to fail, not hide behind cleverness.","They called themselves Stuckists after Tracey Emin told Childish his art was 'stuck'."],"quotes":["Artists who don't paint aren't artists."],"system":"There are no presets, patterns or randomness: the only way to make sound is to paint it with your hand. The wobble of your stroke is the wobble of the melody, and nothing gets quantised."},
"design":{"name":"Corita Kent","short":"Corita Kent","who":"Sister Corita Kent, artist, teacher and screen-printer at Immaculate Heart College","era":"Los Angeles, 1960s","hallmarks":["Overprinted translucent screen-print inks, bright and joyful","Hand-written texts and lyrics cut into and over advertising type","Big words, torn shapes and the energy of protest and pop"],"works":["tomato (1964 serigraph)","power up (1965)","Rainbow Swash, Boston gas tank (1971)"]}}
*/
/*CSS
:root{--bg:#fdf8ee;--fg:#1a1a1a;--acc:#ff3d8b;--bar-font:'Archivo Black',sans-serif;--head-font:'Archivo Black',sans-serif;--learn-font:Georgia,serif}
#mm-stage{background:#fdf8ee}
#cv{position:absolute;left:150px;right:20px;top:20px;bottom:20px;width:calc(100% - 170px);height:calc(100% - 40px);cursor:crosshair;touch-action:none}
.inks{position:absolute;left:18px;top:20px;width:115px;display:flex;flex-direction:column;gap:10px}
.inks button{height:62px;border:0;font:400 22px 'Caveat Brush';cursor:pointer;color:#1a1a1a;mix-blend-mode:multiply;border-radius:4px 18px 6px 14px}.inks button.on{outline:4px solid #1a1a1a}
.inks .w{background:#1a1a1a;color:#fdf8ee;height:44px;font-size:20px}
.word{position:absolute;right:30px;bottom:24px;font:400 92px/.8 'Caveat Brush';color:#ff3d8b;mix-blend-mode:multiply;transform:rotate(-6deg);pointer-events:none;text-align:right}
.word span{color:#ffd21f;display:block}
#pass{position:absolute;left:170px;top:26px;font:400 14px 'Archivo Black';text-transform:uppercase;pointer-events:none}
*/
/*HTML
<canvas id="cv"></canvas><div class="inks" id="inks"></div><div id="pass"></div><div class="word">paint<span>it loud</span></div>
*/
const INKS = [{ n: 'pink · sample', c: '#ff3d8b' }, { n: 'yellow · lead', c: '#ffd21f' }, { n: 'blue · bass', c: '#1fa3ff' }, { n: 'green · brush', c: '#2fd16a' }];
let ink = 0, strokes = [[], [], [], []], curS = null, pass = 0, t0 = 0, xpos = 0, V = [];
INKS.forEach((k, i) => { const b = MM.h('button', { style: `background:${k.c}` }, k.n); b.onclick = () => { ink = i; MM.$$('.inks button').forEach((q, j) => q.classList.toggle('on', j === i)); }; MM.$('#inks').append(b); });
MM.$('#inks').append(Object.assign(MM.h('button', { class: 'w' }, 'wash screen'), { onclick: () => (strokes[ink] = []) })); MM.$$('.inks button')[0].classList.add('on');
// a hand-painted starter so the sheet is never blank
const wob = (k, a, f) => a * Math.sin(k * f) + a * 0.4 * Math.sin(k * f * 2.7);
strokes[0].push(Array.from({ length: 60 }, (_, k) => [0.05 + k * 0.006, 0.4 + wob(k, 0.08, 0.2), 14])); strokes[1].push(Array.from({ length: 70 }, (_, k) => [0.5 + k * 0.006, 0.25 + wob(k, 0.06, 0.15), 10]));
strokes[2].push(Array.from({ length: 150 }, (_, k) => [0.02 + k * 0.0064, 0.8 + (k > 75 ? 0.05 : 0) + wob(k, 0.01, 0.3), 22])); strokes[3].push(Array.from({ length: 30 }, (_, k) => [0.3 + k * 0.006, 0.6 + wob(k, 0.1, 0.4), 30]), Array.from({ length: 30 }, (_, k) => [0.8 + k * 0.006, 0.55 + wob(k, 0.1, 0.4), 30]));
const C = MM.canvas('#cv');
MM.drag(C.cv, (x, y, ph) => { const nx = x / C.cv.clientWidth, ny = y / C.cv.clientHeight; if (ph === 'down') { curS = []; strokes[ink].push(curS); if (strokes[ink].length > 30) strokes[ink].shift(); } if (curS && ph !== 'up') { const l = curS[curS.length - 1]; const sp = l ? Math.hypot(nx - l[0], ny - l[1]) : 0; curS.push([nx, ny, MM.clamp(26 - sp * 600, 6, 26)]); } if (ph === 'up') curS = null; });
function yAt(i, x) { let best = null; strokes[i].forEach((s) => { for (let k = 1; k < s.length; k++) { const a = s[k - 1], b = s[k]; if ((a[0] - x) * (b[0] - x) <= 0 && a[0] !== b[0]) { const f = (x - a[0]) / (b[0] - a[0]); best = { y: a[1] + (b[1] - a[1]) * f, w: a[2] }; } } }); return best; }
function mkVoices() { const c = MM.ctx; V = INKS.map((_, i) => { const g = c.createGain(); g.gain.value = 0; const f = c.createBiquadFilter(); f.frequency.value = 3000; f.connect(g); g.connect(MM.out); const s = c.createGain(); s.gain.value = 0.25; g.connect(s); s.connect(MM.rev); let src;
    if (i === 0) { src = c.createBufferSource(); src.buffer = MM.smp(0, 'voice'); src.loop = true; } else if (i === 3) { src = c.createBufferSource(); const nb = c.createBuffer(1, c.sampleRate, c.sampleRate), d = nb.getChannelData(0); for (let k = 0; k < d.length; k++) d[k] = Math.random() * 2 - 1; src.buffer = nb; src.loop = true; f.type = 'bandpass'; f.Q.value = 6; } else { src = c.createOscillator(); src.type = i === 1 ? 'triangle' : 'sawtooth'; if (i === 2) f.frequency.value = 500; }
    src.connect(f); src.start(); return { g, f, src }; }); }
const LOOP = () => (60 / MM.bpm) * 8;
MM.init({ bpm: 96,
  start() { mkVoices(); t0 = MM.now; pass = 0; },
  stop() { V.forEach((v) => { v.g.gain.setTargetAtTime(0, MM.now, 0.05); const s = v.src; setTimeout(() => s.stop(), 300); }); V = []; },
  onSamples() { if (MM.playing) { const v = V[0], c = MM.ctx; v.src.stop(); const s = c.createBufferSource(); s.buffer = MM.smp(0, 'voice'); s.loop = true; s.connect(v.f); s.start(); v.src = s; } },
  tick(now) { if (!V.length) return; const L = LOOP(), el = now - t0; pass = Math.floor(el / L) % 5; xpos = (el % L) / L;
    V.forEach((v, i) => { const on = pass === 4 || pass === i, hit = on && yAt(i, xpos); if (!hit) { v.g.gain.setTargetAtTime(0, now, 0.04); return; } const midi = [76, 84, 48, 72][i] - hit.y * [24, 24, 18, 36][i], f = MM.mtof(midi), amp = (hit.w / 26) * [0.7, 0.18, 0.35, 0.5][i];
      if (i === 0) { v.src.playbackRate.setTargetAtTime(f / 440, now, 0.03); v.f.frequency.setTargetAtTime(5000, now, 0.1); } else if (i === 3) v.f.frequency.setTargetAtTime(f, now, 0.03); else { v.src.frequency.setTargetAtTime(f, now, 0.03); if (i === 2) v.f.frequency.setTargetAtTime(300 + amp * 2000, now, 0.05); }
      v.g.gain.setTargetAtTime(amp, now, 0.03); }); },
  draw() { C.fit(); const g = C.g, w = C.w, h = C.h; g.fillStyle = '#fffdf6'; g.fillRect(0, 0, w, h); g.globalCompositeOperation = 'multiply'; g.lineCap = 'round'; g.lineJoin = 'round';
    strokes.forEach((ss, i) => { g.strokeStyle = INKS[i].c; g.globalAlpha = MM.playing && pass !== 4 && pass !== i ? 0.3 : 0.9; ss.forEach((s) => { for (let k = 1; k < s.length; k++) { g.lineWidth = s[k][2] * (h / 600); g.beginPath(); g.moveTo(s[k - 1][0] * w, s[k - 1][1] * h); g.lineTo(s[k][0] * w, s[k][1] * h); g.stroke(); } }); });
    g.globalAlpha = 1; g.globalCompositeOperation = 'source-over'; if (MM.playing) { g.fillStyle = '#1a1a1a'; g.fillRect(xpos * w - 1.5, 0, 3, h); }
    MM.$('#pass').textContent = MM.playing ? (pass === 4 ? 'pass 5: all inks together' : `pass ${pass + 1}: ${INKS[pass].n}`) : 'pick an ink and paint'; }
});
