/*META
{"title":"Art Concret","idea":"Every voice is a written formula, step × a + b mod n, so the whole piece is constructed in the mind before a sound is made.","how":"Press PLAY. Each of the six rows is a voice defined by four whole numbers. A step sounds when (step × a + b) mod n is less than k. The arcs show each voice as a Müller-Brockmann concert circle. Change the numbers with the arrows or by scrolling over them. There is no randomness at all: the same numbers always make the same music. Row 3 plays your sample at the position the formula points to.","fonts":"family=Inter+Tight:wght@400;600;800","bpm":116,
"manifesto":{"name":"The Basis of Concrete Painting (Art Concret)","short":"Art Concret","author":"Theo van Doesburg, Otto G. Carlsund, Jean Hélion, Léon Tutundjian and Marcel Wantz","year":"1930","where":"the single issue of the magazine Art Concret, Paris, April 1930","ideas":["A painting should be built entirely from purely plastic elements, planes and colours, which mean nothing but themselves.","The work should be fully constructed in the mind before it is made.","The technique should be mechanical, exact and impersonal, not lyrical or by hand."],"quotes":[],"system":"Each sound is a concrete fact made from integers, with no expression, randomness or reference. You construct the piece as arithmetic, and it plays back exactly the same every time."},
"design":{"name":"Josef Müller-Brockmann","short":"Müller-Brockmann","who":"Josef Müller-Brockmann, Swiss designer and author of Grid Systems in Graphic Design (1981)","era":"Zurich, 1950s to 1970s (International Typographic Style)","hallmarks":["Strict mathematical grids, with sans-serif type flush left and ragged right","Abstract geometry (circles, arcs, bands) as visual music","Objective, unsentimental communication"],"works":["Tonhalle-Gesellschaft Zürich 'musica viva' concert posters (1950s to 1970s)","Der Film poster (1960)","Weniger Lärm (Less Noise) poster (1960)"]}}
*/
/*CSS
:root{--bg:#f2f0eb;--fg:#111;--acc:#e5332a;--bar-font:'Inter Tight',sans-serif;--head-font:'Inter Tight',sans-serif}
#mm-stage{display:grid;grid-template-columns:1fr 1fr;background:#f2f0eb}
#cv{width:100%;height:100%;display:block;background:#111}
.r{padding:30px 36px;display:grid;grid-template-rows:auto 1fr auto;font:400 13px 'Inter Tight'}
.r h1{font:800 64px/.9 'Inter Tight';margin:0 0 16px;letter-spacing:-.03em}.r h1 span{color:#e5332a}
table{border-collapse:collapse;width:100%;font:600 18px 'Inter Tight';align-self:start}th{font:400 11px 'Inter Tight';text-align:left;padding:4px 0;border-bottom:2px solid #111}td{padding:8px 0;border-bottom:1px solid #bbb}
.n{display:inline-flex;align-items:center;gap:4px;cursor:ns-resize}.n button{font:600 12px 'Inter Tight';border:1px solid #111;background:none;width:20px;height:20px;padding:0;cursor:pointer}
.sw{width:14px;height:14px;display:inline-block;border-radius:50%}
.pat{font:400 11px monospace;letter-spacing:1px}
*/
/*HTML
<canvas id="cv"></canvas>
<div class="r"><h1>art<br>concret<span>.</span></h1><table id="tb"></table><div>sound if (step × a + b) mod n &lt; k · 1930 · no chance, no hand, no meaning</div></div>
*/
const V = [{ nm: 'kick', a: 1, b: 0, n: 4, k: 1, c: '#e5332a' }, { nm: 'hat', a: 3, b: 1, n: 4, k: 2, c: '#f2f0eb' }, { nm: 'sample', a: 5, b: 2, n: 7, k: 2, c: '#f0b400' }, { nm: 'bass', a: 3, b: 0, n: 8, k: 3, c: '#2a62c9' }, { nm: 'tone', a: 7, b: 3, n: 11, k: 3, c: '#8fb7ff' }, { nm: 'snare', a: 1, b: 4, n: 8, k: 1, c: '#bbb' }];
const on = (v, s) => ((s * v.a + v.b) % v.n + v.n) % v.n < v.k;
function table() { const T = MM.$('#tb'); T.innerHTML = '<tr><th></th><th>voice</th><th>a</th><th>b</th><th>n</th><th>k</th><th>16 steps</th></tr>'; V.forEach((v, r) => { const tr = MM.h('tr'); tr.append(MM.h('td', {}, `<span class="sw" style="background:${v.c};outline:1px solid #111"></span>`)); tr.lastChild.innerHTML = `<span class="sw" style="background:${v.c};outline:1px solid #111"></span>`; tr.append(MM.h('td', {}, v.nm));
    ['a', 'b', 'n', 'k'].forEach((p) => { const td = MM.h('td'), sp = MM.h('span', { class: 'n' }), m = MM.h('button', {}, '−'), val = MM.h('span', {}, String(v[p])), pl = MM.h('button', {}, '+'); const set = (d) => { v[p] = MM.clamp(v[p] + d, p === 'n' ? 2 : p === 'k' ? 1 : 0, p === 'n' ? 16 : 15); if (v.k > v.n) v.k = v.n; table(); }; m.onclick = () => set(-1); pl.onclick = () => set(1); sp.onwheel = (e) => { e.preventDefault(); set(e.deltaY < 0 ? 1 : -1); }; sp.append(m, val, pl); td.append(sp); tr.append(td); });
    tr.append(MM.h('td', { class: 'pat' }, Array.from({ length: 16 }, (_, s) => (on(v, s) ? '■' : '·')).join(''))); T.append(tr); }); }
table();
const C = MM.canvas('#cv'); let cur = 0, flash = V.map(() => 0);
MM.init({ bpm: 116, div: 4,
  step(i, t, sd) { const s = i % 64; cur = s; V.forEach((v, r) => { if (!on(v, s)) return; flash[r] = 1; const x = (s * v.a + v.b) % v.n;
      if (v.nm === 'kick') MM.play(MM.fb.kick, t, { gain: 0.9 }); if (v.nm === 'hat') MM.play(MM.fb.hat, t, { gain: 0.25 }); if (v.nm === 'snare') MM.play(MM.fb.snare, t, { gain: 0.5 });
      if (v.nm === 'sample') { const B = MM.smp(0, 'loop'); MM.play(B, t, { offset: (x / v.n) * B.duration, dur: sd * 1.5, gain: 0.7, fadeOut: 0.02 }); }
      if (v.nm === 'bass') MM.tone(MM.mtof(MM.deg(x, 'dorian', 33)), t, sd * 1.5, { type: 'sawtooth', gain: 0.3, cutoff: 700 });
      if (v.nm === 'tone') MM.tone(MM.mtof(MM.deg((x * 2) % 14, 'dorian', 62)), t, sd * 2, { type: 'triangle', gain: 0.14, send: { dly: 0.25 } }); }); },
  draw() { C.fit(); const g = C.g, w = C.w, h = C.h, cx = w * 0.5, cy = h * 0.56; g.fillStyle = '#111'; g.fillRect(0, 0, w, h);
    // Tonhalle-style arcs: each voice is a ring; filled segments are its active steps
    V.forEach((v, r) => { const R = Math.min(w, h) * (0.09 + r * 0.056); g.lineWidth = Math.min(w, h) * 0.04 * (1 + flash[r] * 0.25); flash[r] *= 0.85;
      for (let s = 0; s < 16; s++) if (on(v, s)) { const a0 = (s / 16) * Math.PI * 2 - Math.PI / 2; g.strokeStyle = v.c; g.globalAlpha = MM.playing && s === cur % 16 ? 1 : 0.75; g.beginPath(); g.arc(cx, cy, R, a0 + 0.02, a0 + (Math.PI * 2) / 16 - 0.02); g.stroke(); } });
    g.globalAlpha = 1; const a = ((cur % 16) / 16) * Math.PI * 2 - Math.PI / 2; g.strokeStyle = '#e5332a'; g.lineWidth = 2; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(a) * w, cy + Math.sin(a) * w); g.stroke();
    g.fillStyle = '#f2f0eb'; g.font = "800 26px 'Inter Tight'"; g.fillText('musica', 30, 50); g.font = "400 26px 'Inter Tight'"; g.fillText('concreta', 30, 80); g.font = "400 12px 'Inter Tight'"; g.fillText('step ' + String(cur).padStart(2, '0') + ' / 64', 30, 104); }
});
