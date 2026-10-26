/*META
{"title":"Vow of Chastity","idea":"One sample, no effects, no grid: you play it live by hand, and every rule you break goes in a public confession.","how":"Press PLAY. A take loops for four bars. Press the keys A S D F G H J K (or click the pads) to play your sample from eight cue points, live, with handheld timing wobble. What you play is recorded into the take. The rules are switched on. Untick a rule to break it (for example to allow reverb or quantising), and the break is written into the confession. CLEAR TAKE starts again.","fonts":"","bpm":100,
"manifesto":{"name":"Dogme 95 Manifesto and Vow of Chastity","short":"Dogme 95","author":"Lars von Trier and Thomas Vinterberg","year":"1995","where":"Copenhagen, read out in Paris in March 1995","ideas":["Ten rules for film-making: shoot on location; sound must never be produced apart from the images; the camera must be handheld; no optical work or filters; no superficial action; no genre films; the director must not be credited.","A 'rescue action' against the cosmetics of technology and cinema as illusion.","Directors who broke a rule wrote confessions."],"quotes":[],"system":"The vow is the instrument. There is one location (your sample), no added sound and no effects; timing is handheld, so nothing is quantised, and nothing is a genre preset. Breaking a rule is allowed, but it is confessed in writing."},
"design":{"name":"Brutalist web design","short":"Brutalist web","who":"Brutalist websites, a movement named and catalogued by Pascal Deville (brutalistwebsites.com, 2014)","era":"the web, 1990s plain HTML, revived 2014 onwards","hallmarks":["Default browser styles: Times, blue underlined links, grey buttons","Raw structure on show, with no decoration and no polish","Honest, hard-edged, sometimes deliberately ugly"],"works":["brutalistwebsites.com (Pascal Deville, 2014)","Drudge Report (plain HTML since the 1990s)","Craigslist (craigslist.org, 1995 to now)"]}}
*/
/*CSS
:root{--bg:#fff;--fg:#000;--acc:#00e;--bar-font:'Times New Roman',Times,serif;--head-font:'Times New Roman',Times,serif;--learn-font:'Times New Roman',serif}
#mm-stage{background:#fff;color:#000;font:16px 'Times New Roman',Times,serif;padding:10px 16px;overflow:auto}
#mm-stage h1{font:bold 32px Times;margin:4px 0}
#mm-stage a{color:#00e}
table{border-collapse:collapse}td{border:1px solid #000;padding:2px 8px;vertical-align:top}
.pads button{font:16px Times;width:84px;height:60px;margin:2px}.pads button.on{background:#000;color:#fff}
#conf{font:13px 'Courier New',monospace;white-space:pre-wrap;border:1px dashed #000;padding:6px;min-height:40px}
#tl{border:1px solid #000;display:block;width:100%;height:60px}
hr{border:0;border-top:1px solid #000}
*/
/*HTML
<h1>VOW OF CHASTITY (for sound)</h1>
<p>I swear to submit to the following rules. <a href="#" id="clear">[clear take]</a> <a href="#" id="redo">[restore all rules]</a></p>
<table><tr><td><div class="pads" id="pads"></div><canvas id="tl"></canvas><p id="st">take 1</p></td><td id="rules"></td></tr></table>
<hr><b>Confession:</b><div id="conf">nothing to confess.</div>
*/
const RULES = [['loc', 'Use only one location: one sample, no others.'], ['nosynth', 'No sound may be produced apart from the location.'], ['hand', 'Timing must be handheld: never quantised.'], ['nofx', 'No filters, reverb or delay.'], ['nogenre', 'No genre: no drum patterns or presets.'], ['live', 'Play it live, in one take. No editing.'], ['anon', 'The composer is not credited.']];
const KEYS = 'ASDFGHJK'; const rules = {}; RULES.forEach(([k]) => (rules[k] = true)); let confessions = [], take = [], takeNo = 1, t0 = 0, cues = [], last = -1;
const L = () => (60 / MM.bpm) * 16;
function draw() { const R = MM.$('#rules'); R.innerHTML = ''; RULES.forEach(([k, txt], i) => { const l = MM.h('label', { style: 'display:block' }); const c = MM.h('input', { type: 'checkbox' }); c.checked = rules[k]; c.onchange = () => { rules[k] = c.checked; if (!c.checked) confessions.push(`${new Date().toLocaleTimeString('en-GB')}  I broke rule ${i + 1} ("${txt}") during take ${takeNo}.`); conf(); }; l.append(c, ` ${i + 1}. ${txt}`); R.append(l); }); }
function conf() { MM.$('#conf').textContent = confessions.length ? confessions.join('\n') : 'nothing to confess.'; }
KEYS.split('').forEach((k, i) => { const b = MM.h('button', {}, k); b.onpointerdown = () => hitPad(i); MM.$('#pads').append(b); });
MM.$('#clear').onclick = (e) => { e.preventDefault(); take = []; takeNo++; MM.$('#st').textContent = 'take ' + takeNo; };
MM.$('#redo').onclick = (e) => { e.preventDefault(); RULES.forEach(([k]) => (rules[k] = true)); draw(); };
addEventListener('keydown', (e) => { const i = KEYS.indexOf(e.key.toUpperCase()); if (i >= 0 && !e.repeat && !/INPUT/.test(e.target.tagName)) hitPad(i); });
function cue(i) { const B = MM.smp(0, 'loop'); if (!cues.length || cues._b !== B) { const o = MM.onsets(B, 8); cues = o.length >= 8 ? o.slice(0, 8) : Array.from({ length: 8 }, (_, k) => (k / 8) * B.duration); cues._b = B; } return cues[i]; }
function sound(i, t) { const B = MM.smp(0, 'loop'), o = { offset: cue(i), dur: 0.6, gain: 0.85, fadeOut: 0.05 }; if (!rules.nofx) o.send = { rev: 0.4, dly: 0.3 }; MM.play(B, t, o); if (!rules.nosynth) MM.tone(MM.mtof(MM.deg(i, 'minor', 48)), t, 0.4, { type: 'square', gain: 0.1, cutoff: 1500 });
  const b = MM.$$('.pads button')[i]; b.classList.add('on'); setTimeout(() => b.classList.remove('on'), 120); }
function hitPad(i) { MM.ensure(); if (!MM.playing) MM.toggle(true); const now = MM.now; let ph = ((now - t0) % L() + L()) % L(); if (!rules.hand) { const g = 60 / MM.bpm / 2; ph = Math.round(ph / g) * g; } else ph += (Math.random() - 0.5) * 0.03; if (rules.live || take.length < 64) take.push({ ph, i }); sound(i, now); }
MM.init({ bpm: 100,
  setup() { draw(); // a first handheld take so the loop is never empty
    [[0, 0], [0.62, 2], [1.2, 1], [1.83, 4], [2.4, 0], [3.05, 3], [3.6, 5], [4.25, 2], [4.8, 0], [5.5, 6], [6.0, 1], [6.7, 7], [7.2, 0], [7.9, 3], [8.4, 2], [9.1, 4]].forEach(([p, i]) => take.push({ ph: p * 0.6, i })); },
  start() { t0 = MM.now; last = -1; },
  tick(now) { const Ln = L(), look = now + 0.05, a = ((now - t0) % Ln + Ln) % Ln, b = ((look - t0) % Ln + Ln) % Ln;
    take.forEach((e) => { const hitIt = a <= b ? e.ph > a && e.ph <= b : e.ph > a || e.ph <= b; if (hitIt && e.done !== Math.floor((look - t0) / Ln)) { e.done = Math.floor((look - t0) / Ln); sound(e.i, now + ((e.ph - a + Ln) % Ln)); } });
    if (!rules.nogenre) { const st = Math.floor(b / (60 / MM.bpm)); if (st !== last) { last = st; MM.play(MM.fb.kick, look, { gain: 0.6 }); } }
    if (!rules.anon && !/a film by/.test(document.title)) document.title += ' · a piece by Craig'; },
  draw() { const c = MM.$('#tl'); if (c.width !== c.clientWidth) { c.width = c.clientWidth; c.height = 60; } const g = c.getContext('2d'), w = c.width; g.fillStyle = '#fff'; g.fillRect(0, 0, w, 60); g.fillStyle = '#000'; take.forEach((e) => g.fillRect((e.ph / L()) * w, 4 + e.i * 6.5, 3, 6)); if (MM.playing) { g.fillStyle = '#00e'; g.fillRect((((MM.now - t0) % L()) / L()) * w, 0, 2, 60); } }
});
