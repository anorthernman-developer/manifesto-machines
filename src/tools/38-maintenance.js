/*META
{"title":"Maintenance","idea":"The music gets dirty and falls apart on its own; your job is to look after it, and the care itself becomes the rhythm.","how":"Press PLAY. Four tracks play (DRUMS, BASS, CHORDS and your SAMPLE). Left alone they gather dust: notes drop out, the pitch sags, hiss builds up and the timing wanders. Use the four maintenance tasks on each track: SWEEP (removes dust and plays a brush rhythm), WASH (clears hiss with a rinse), TUNE (brings the pitch back with a tuning-fork tone) and OIL (puts the timing back with a squeak). Each task is a sound in its own right. The log counts your maintenance hours. Nothing is ever finished: maintenance never ends.","fonts":"family=Overpass:wght@400;800","bpm":100,
"manifesto":{"name":"Manifesto for Maintenance Art 1969! Proposal for an exhibition 'CARE'","short":"Maintenance Art","author":"Mierle Laderman Ukeles","year":"1969","where":"typed proposal, New York, 1969; later she became unsalaried artist-in-residence at the New York City Department of Sanitation (from 1977)","ideas":["Two systems: Development (the new, the avant-garde) and Maintenance (keeping it going, the daily work, mostly by women and workers).","Maintenance is a drag, takes all the time, and it is art too.","She proposed living in the gallery and doing her maintenance work as the exhibition."],"quotes":["after the revolution, who's going to pick up the garbage on Monday morning?"],"system":"There is no 'compose' mode here. The music decays by itself, and the only thing you can do is care for it. The care routines are the instruments, and your maintenance time is logged as the work."},
"design":{"name":"Jock Kinneir and Margaret Calvert","short":"Kinneir & Calvert","who":"Jock Kinneir and Margaret Calvert, British designers of public information","era":"London, 1957 to 1970s","hallmarks":["The UK road-sign system: white or yellow mixed-case type on blue, green or white panels with rounded corners","The Transport and Motorway typefaces","Simple pictograms (such as the 'men at work' and school children signs)"],"works":["UK motorway and all-purpose road signs (from 1958, adopted through the Worboys Committee, 1963 to 1965)","The Transport typeface","Rail Alphabet for British Rail (1965)"]}}
*/
/*CSS
:root{--bg:#00703c;--fg:#fff;--acc:#ffd200;--bar-font:'Overpass',sans-serif;--head-font:'Overpass',sans-serif}
#mm-stage{background:#00703c;padding:14px 20px;box-sizing:border-box;display:flex;flex-direction:column;gap:10px;overflow:hidden}
.top{display:flex;gap:16px;align-items:center}.sign{background:#fff;color:#111;border-radius:12px;padding:8px 20px;font:800 34px 'Overpass';border:5px solid #fff;outline:3px solid #111}
#log{font:400 15px 'Overpass';color:#fff}
.tr{display:grid;grid-template-columns:140px 1fr 400px;gap:14px;align-items:center;background:#2b5fb4;border:4px solid #fff;border-radius:14px;padding:6px 14px;flex:1;min-height:0}
.tr b{font:800 24px 'Overpass'}.tr canvas{width:100%;height:100%;min-height:40px;display:block}
.tasks{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}.tasks button{font:800 15px 'Overpass';border:3px solid #fff;background:#ffd200;color:#111;border-radius:8px;padding:8px 0;cursor:pointer}
.tasks button:active{background:#fff}
*/
/*HTML
<div class="top"><div class="sign">⚠ Maintenance in progress</div><div id="log"></div></div><div id="tracks" style="display:flex;flex-direction:column;gap:8px;flex:1;min-height:0"></div>
*/
const TN = ['DRUMS', 'BASS', 'CHORDS', 'SAMPLE'];
const T = TN.map((n) => ({ n, dust: 0.1, hiss: 0.05, sag: 0, wob: 0, cv: null }));
let hours = 0, tasks = 0;
T.forEach((tr, k) => { const row = MM.h('div', { class: 'tr', html: `<b>${tr.n}</b>` }), cv = MM.h('canvas'), box = MM.h('div', { class: 'tasks' }); row.append(cv, box); tr.cv = cv;
  [['SWEEP', 'dust'], ['WASH', 'hiss'], ['TUNE', 'sag'], ['OIL', 'wob']].forEach(([lab, key]) => { const b = MM.h('button', {}, lab); b.onclick = () => { MM.ensure(); if (!MM.playing) MM.toggle(true); care(k, lab, key); }; box.append(b); }); MM.$('#tracks').append(row); });
function care(k, lab, key) { const tr = T[k], t = MM.now + 0.01; tr[key] = key === 'sag' || key === 'wob' ? 0 : Math.max(0, tr[key] - 0.6); tasks++;
  if (lab === 'SWEEP') for (let q = 0; q < 6; q++) MM.noise(t + q * 0.09, 0.08, { freq: 3000 + q * 300, q: 1.5, gain: 0.12, sweep: 1500 });
  if (lab === 'WASH') MM.noise(t, 0.8, { freq: 600, sweep: 4000, q: 0.8, gain: 0.16, send: { rev: 0.3 } });
  if (lab === 'TUNE') MM.tone(440, t, 1.6, { partials: [[1, 1], [6.2, 0.1]], gain: 0.12, release: 1.4 });
  if (lab === 'OIL') MM.tone(1800, t, 0.18, { glide: 2600, type: 'square', gain: 0.04, cutoff: 3000 }); }
const pass = (tr) => Math.random() > tr.dust * 0.8;
MM.init({ bpm: 100, div: 4,
  step(i, t, sd) { const s = i % 16, bar = Math.floor(i / 16) % 4; T.forEach((tr) => { tr.dust = Math.min(1, tr.dust + 0.0025); tr.hiss = Math.min(1, tr.hiss + 0.0018); tr.sag = Math.min(1, tr.sag + 0.0012); tr.wob = Math.min(1, tr.wob + 0.0015); });
    const j = (tr) => t + (Math.random() - 0.5) * tr.wob * sd * 0.8, det = (tr) => -tr.sag * 120;
    let tr = T[0]; if ([0, 6, 10].includes(s) && pass(tr)) MM.play(MM.fb.kick, j(tr), { gain: 0.8, detune: det(tr) }); if ([4, 12].includes(s) && pass(tr)) MM.play(MM.fb.snare, j(tr), { gain: 0.5, detune: det(tr) }); if (s % 2 === 0 && pass(tr)) MM.play(MM.fb.hat, j(tr), { gain: 0.2 });
    tr = T[1]; if (s % 2 === 0 && pass(tr)) MM.tone(MM.mtof([36, 36, 43, 39][bar] + (s === 14 ? 7 : 0)), j(tr), sd * 1.6, { type: 'sawtooth', gain: 0.14, cutoff: 600, detune: det(tr) });
    tr = T[2]; if (s === 0 && pass(tr)) [0, 3, 7, 10].forEach((iv) => MM.tone(MM.mtof([60, 60, 67, 63][bar] + iv - 12), j(tr), sd * 14, { type: 'triangle', gain: 0.04, attack: 0.2, detune: det(tr) * (1 + iv / 10), send: { rev: 0.3 } }));
    tr = T[3]; if (s % 8 === 0 && pass(tr)) { const B = MM.smp(0, 'loop'); MM.play(B, j(tr), { gain: 0.6, dur: sd * 8, detune: det(tr) * 2, fadeOut: 0.05 }); }
    if (s % 4 === 0) T.forEach((tr, k) => { if (tr.hiss > 0.08) MM.noise(t, sd * 4, { freq: 7000, q: 0.4, gain: tr.hiss * 0.04, pan: k / 1.5 - 1 }); });
    hours += sd / 3600; },
  draw() { T.forEach((tr) => { const cv = tr.cv, g = cv.getContext('2d'), w = (cv.width = cv.clientWidth), h = (cv.height = cv.clientHeight); g.fillStyle = '#2b5fb4'; g.fillRect(0, 0, w, h); const bars = [['dust', tr.dust], ['hiss', tr.hiss], ['pitch sag', tr.sag], ['timing', tr.wob]];
      bars.forEach(([n, v], k) => { const y = (k / 4) * h; g.fillStyle = '#ffffff22'; g.fillRect(90, y + 3, w - 100, h / 4 - 6); g.fillStyle = v > 0.6 ? '#ffd200' : '#fff'; g.fillRect(90, y + 3, (w - 100) * v, h / 4 - 6); g.fillStyle = '#fff'; g.font = "400 12px 'Overpass'"; g.fillText(n, 0, y + h / 8 + 4); }); });
    MM.$('#log').textContent = `Maintenance log: ${tasks} tasks · ${(hours * 60).toFixed(1)} minutes of music kept going`; }
});
