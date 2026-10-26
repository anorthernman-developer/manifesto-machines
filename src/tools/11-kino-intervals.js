/*META
{"title":"Theory of Intervals","idea":"A film strip of sample 'shots', where the loudest music happens in the cuts between them.","how":"Press PLAY. Each frame on the strip is a shot: a piece of your sample with its own speed and length. Between shots is an interval, and it sounds as a sweep from one shot to the next, bigger when the shots are more different. Drag a frame up or down to change its speed, click a gap to change its kind of cut, and press MONTAGE to re-edit the order. EYE spins the poster spiral faster.","fonts":"family=Big+Shoulders+Display:wght@400;900","bpm":112,
"manifesto":{"name":"WE: Variant of a Manifesto","short":"Kino-Eye","author":"Dziga Vertov (the Kinoks group)","year":"1922","where":"Kino-Fot magazine, Moscow, 1922","ideas":["Cinema should give up borrowed drama and literature and record life as it is, through the machine eye.","Montage is the organisation of the visible world, and movement is its material.","The intervals, the passages from one movement to the next, are what make up the art (paraphrasing Vertov)."],"quotes":["Intervals (the transitions from one movement to another) are the material, the elements of the art of movement."],"system":"Shots are just short pieces of the sample. The machine puts its weight on the intervals: every cut generates its own sound from the difference between the shot before and the shot after, so editing the order changes the music."},
"design":{"name":"Vladimir and Georgii Stenberg","short":"Stenberg brothers","who":"Vladimir and Georgii Stenberg, Soviet film poster designers","era":"Moscow, 1923 to 1933","hallmarks":["Dizzying perspective, spirals and figures falling through space","Projected and enlarged film stills drawn by hand with a projection device","Saturated magenta, orange and black, with tall condensed letters"],"works":["Man with a Movie Camera (1929 poster for Vertov's film)","Battleship Potemkin (1929 poster)","The General (1929 poster for Buster Keaton's film)"]}}
*/
/*CSS
:root{--bg:#f06a2a;--fg:#111;--acc:#e2177d;--bar-font:'Big Shoulders Display',sans-serif;--head-font:'Big Shoulders Display',sans-serif}
#mm-stage{background:#f06a2a;overflow:hidden}
#sp{position:absolute;inset:0;width:100%;height:100%}
.t{position:absolute;left:28px;top:10px;font:900 120px/.8 'Big Shoulders Display';color:#111;text-transform:uppercase;pointer-events:none}.t span{color:#e2177d;display:block;font-size:66px}
#strip{position:absolute;left:3%;right:3%;bottom:40px;height:190px;background:#111;display:flex;align-items:center;padding:0 14px;gap:0;transform:perspective(900px) rotateX(18deg) rotateZ(-3deg);box-shadow:0 20px 0 #e2177d}
#strip:before,#strip:after{content:'';position:absolute;left:0;right:0;height:14px;background:repeating-linear-gradient(90deg,#111 0 10px,#f1e7d6 10px 22px)}#strip:before{top:8px}#strip:after{bottom:8px}
.fr{height:120px;background:#f1e7d6;flex:1;position:relative;cursor:ns-resize;overflow:hidden}.fr.on{background:#fff;outline:4px solid #e2177d}
.fr canvas{position:absolute;inset:0;width:100%;height:100%}.fr b{position:absolute;left:6px;top:2px;font:900 22px 'Big Shoulders Display'}
.gap{width:44px;height:120px;display:flex;align-items:center;justify-content:center;color:#f1e7d6;font:900 15px 'Big Shoulders Display';cursor:pointer;text-transform:uppercase;writing-mode:vertical-rl}.gap.on{color:#e2177d}
.ctl{position:absolute;right:30px;top:30px;display:flex;flex-direction:column;gap:8px}.ctl button{font:900 26px 'Big Shoulders Display';background:#111;color:#f1e7d6;border:0;padding:6px 16px;cursor:pointer}.ctl button:hover{background:#e2177d}
*/
/*HTML
<canvas id="sp"></canvas><div class="t">Kino<br>Eye<span>theory of intervals</span></div>
<div class="ctl"><button id="mont">MONTAGE</button><button id="eye">EYE</button></div><div id="strip"></div>
*/
const CUTS = ['glide', 'sweep', 'jump', 'reverse'];
let shots = [], gaps = [], cur = -1, curGap = -1, spin = 1, ang = 0;
function mkShots() { shots = Array.from({ length: 6 }, (_, k) => ({ id: k + 1, off: Math.random() * 0.85, len: 1 + Math.floor(Math.random() * 3), rate: MM.pick([0.5, 0.75, 1, 1, 1.5, 2]) })); gaps = shots.map(() => MM.pick(CUTS)); }
mkShots();
const strip = MM.$('#strip');
function build() { strip.innerHTML = ''; shots.forEach((s, k) => { const f = MM.h('div', { class: 'fr' }); const cv = MM.h('canvas'); f.append(cv, MM.h('b', {}, String(s.id))); s.el = f; s.cv = cv; strip.append(f);
    MM.drag(f, (x, y, ph) => { if (ph === 'down') s._y = y; else if (ph === 'move') { s.rate = MM.clamp(s.rate * Math.pow(2, (s._y - y) / 60), 0.25, 4); s._y = y; } });
    const g = MM.h('div', { class: 'gap' }, gaps[k]); g.onclick = () => { gaps[k] = CUTS[(CUTS.indexOf(gaps[k]) + 1) % 4]; g.textContent = gaps[k]; }; s.gapEl = g; strip.append(g); }); }
build();
MM.$('#mont').onclick = () => { shots.sort(() => Math.random() - 0.5); build(); };
MM.$('#eye').onclick = () => (spin = spin > 4 ? 1 : spin * 2);
const P = MM.canvas('#sp');
// a flat list of steps: shot steps followed by one interval step
function plan() { const out = []; shots.forEach((s, k) => { for (let j = 0; j < s.len; j++) out.push({ s, k, j }); out.push({ gap: k }); }); return out; }
const pitch = (s) => 48 + Math.log2(s.rate) * 12 + s.off * 12;
MM.init({ bpm: 112, div: 4,
  step(i, t, sd) { const P2 = plan(), e = P2[i % P2.length];
    if (e.s) { cur = e.k; curGap = -1; const b = MM.smp(0, 'loop'); if (e.j === 0) { MM.play(MM.fb.kick, t, { gain: 0.6 }); MM.play(b, t, { offset: e.s.off * b.duration, dur: sd * e.s.len, rate: e.s.rate, gain: 0.8, fadeOut: 0.03 }); } else MM.play(MM.fb.hat, t, { gain: 0.25 }); return; }
    const A = shots[e.gap], B = shots[(e.gap + 1) % shots.length], kind = gaps[e.gap], diff = Math.abs(pitch(A) - pitch(B)), d = sd * 0.95, gain = 0.12 + Math.min(diff, 24) / 60; curGap = e.gap; cur = -1;
    if (kind === 'glide') MM.tone(MM.mtof(pitch(A)), t, d, { type: 'sawtooth', glide: MM.mtof(pitch(B)), gain, cutoff: 2400 });
    if (kind === 'sweep') MM.noise(t, d, { freq: 300 + A.off * 3000, sweep: 300 + B.off * 6000, q: 8, gain: gain * 2 });
    if (kind === 'jump') { MM.tone(MM.mtof(pitch(A) + 12), t, d / 2, { type: 'square', gain: gain * 0.6, cutoff: 3000 }); MM.tone(MM.mtof(pitch(B) + 12), t + d / 2, d / 2, { type: 'square', gain: gain * 0.6, cutoff: 3000 }); MM.play(MM.fb.snare, t, { gain: 0.5 }); }
    if (kind === 'reverse') { const b = MM.smp(0, 'loop'), rb = MM.cloneBuf(b); for (let c = 0; c < rb.numberOfChannels; c++) rb.getChannelData(c).reverse(); MM.play(rb, t, { offset: (1 - B.off) * rb.duration * 0.9, dur: d, rate: B.rate, gain: 0.7, fadeIn: d * 0.8 }); } },
  draw(ts) { P.fit(); const g = P.g, W = P.w, H = P.h; ang += 0.003 * spin * (MM.playing ? 1 : 0.2); g.fillStyle = '#f06a2a'; g.fillRect(0, 0, W, H); g.save(); g.translate(W * 0.62, H * 0.38); g.rotate(ang);
    for (let k = 0; k < 18; k++) { g.fillStyle = k % 2 ? '#111' : '#e2177d'; g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, Math.max(W, H), (k / 18) * Math.PI * 2, ((k + 0.5) / 18) * Math.PI * 2); g.fill(); }
    g.fillStyle = '#f1e7d6'; g.beginPath(); g.arc(0, 0, 70, 0, 7); g.fill(); g.fillStyle = '#111'; g.beginPath(); g.arc(0, 0, 32, 0, 7); g.fill(); g.restore();
    const b = MM.smp(0, 'loop'), pk = (b._pk = b._pk || MM.peaks(b, 300));
    shots.forEach((s, k) => { s.el.classList.toggle('on', k === cur); s.gapEl.classList.toggle('on', k === curGap); const c = s.cv; if (c.width !== c.clientWidth) { c.width = c.clientWidth; c.height = c.clientHeight; } const x = c.getContext('2d'); x.clearRect(0, 0, c.width, c.height); x.fillStyle = '#111';
      const a = Math.floor(s.off * 300), n = Math.max(4, Math.floor(30 * s.len / s.rate)); for (let j = 0; j < n && a + j < 300; j++) { const v = pk[a + j] * c.height * 0.8; x.fillRect((j / n) * c.width, c.height / 2 - v / 2, c.width / n - 1, v); } x.font = '900 14px "Big Shoulders Display"'; x.fillText('×' + s.rate.toFixed(2), 6, c.height - 6); }); }
});
