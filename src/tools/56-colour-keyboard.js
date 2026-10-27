/*META
{"title":"The Colour Keyboard","deep":true,"gemini":true,"category":"art manifesto","date":"2026-10-27","kicker":"AN ART MANIFESTO",
"idea":"Kandinsky said colour is a keyboard and the soul is the piano. Paint a composition from points, lines, triangles, squares and circles, and a playhead plays it: the colour picks the instrument (yellow is a trumpet, blue a cello), the shape sets how each note is played, and white and black are two kinds of silence.",
"controls":"6 colour slots (yellow, red, blue, green, orange, violet) for your own sounds; 5 shapes (point, line glissando, triangle, square, circle); size, height and rotation; white (a pause) and black (cuts everything); loop length, tempo, scale, key and range; snap to grid; scan or radial reading; undo and clear; a COMPOSE generator; Gemini paints a composition from a mood; MIDI plays the colours live.",
"how":"Press PLAY. A black bar reads the canvas from left to right. Every shape it crosses sounds: the colour sets the instrument, the height sets the pitch, the size sets how loud and how long, and the shape sets the articulation. A triangle is sharp, high and short, a square is steady and held, a circle swells in slowly and low, a point is a single pluck, and a line slides from one pitch to another. Pick a colour (1 to 8) and a shape (Q point, W line, E triangle, T square, Y circle), then click and drag on the canvas to place it. Shift-click removes a shape. WHITE pauses everything for a moment. BLACK cuts every sound. Press C to COMPOSE a new picture, or describe a mood to Gemini.",
"fonts":"family=Jost:wght@400;600;800&family=Caveat:wght@600","bpm":104,
"try":["Load a muted trumpet or brass stab from your Splice folder into YELLOW and a felt-piano note into BLUE. Paint yellow triangles along the top and big blue circles along the bottom, and you have Kandinsky's 'shrill trumpet-note' over his 'darker blue a cello'.","Load your own drum loop into RED, then draw one long red square across the whole loop. Squares hold and loop the sound, so it becomes a bed you can chop with black points.","Ask Gemini for 'Composition VIII, but at 3am in the rain', then shift-click away half of what it paints and see what's left."],
"manifesto":{"name":"Concerning the Spiritual in Art","short":"Kandinsky: Spiritual in Art","author":"Wassily Kandinsky (1866 to 1944)","year":"1911","where":"Über das Geistige in der Kunst, Munich, December 1911 (dated 1912). English translation by Michael T. H. Sadler (Sadleir), 1914. Followed by Point and Line to Plane (Bauhaus book, 1926).",
"ideas":["Art should express 'inner necessity', the inner sound of forms and colours, not copy the look of things.","Colours have sounds. Yellow is a shrill trumpet. Light blue is a flute, darker blue a cello, darker still a double bass, and the darkest blue an organ. Green is the placid middle notes of a violin. Orange is the Angelus bell or an old violin. Violet is a cor anglais or a bassoon.","Forms have sounds too. Acute shapes such as the triangle go with sharp colours such as yellow, and deep round shapes such as the circle go with blue. In his Bauhaus questionnaire of 1923 he asked students to pair the yellow triangle, the red square and the blue circle.","White is a silence full of possibility, like a pause in music. Black is the silence of death.","Point and Line to Plane (1926): the point is the smallest element and the line is a point set in motion. Here, points pluck and lines glide."],
"quotes":[["Colour is the keyboard, the eyes are the hammers, the soul is the piano with many strings. The artist is the hand which plays, touching one key or another, to cause vibrations in the soul.","Wassily Kandinsky, Concerning the Spiritual in Art, 1911 (trans. Sadler)"],["Keen lemon-yellow hurts the eye in time as a prolonged and shrill trumpet-note the ear","Kandinsky, 1911"],["White, therefore, has this harmony of silence, which works upon us negatively, like many pauses in music that break temporarily the melody.","Kandinsky, 1911"],["The silence of black is the silence of death.","Kandinsky, 1911"]],
"system":"The canvas is a score. Each shape has a colour, a shape, x (when), y (pitch), size (level and length) and rotation (stereo). Colour picks the slot, Kandinsky's instrument. Shape picks the articulation: a point plucks, a line glides from its start pitch to its end pitch, a triangle is sharp and an octave up, a square holds and loops the sound, and a circle swells in an octave down with more reverb. White ducks the whole mix for a pause, and black stops every sound that is playing. In RADIAL mode the bar sweeps like a clock hand from the centre."},
"design":{"name":"Paul Rand","short":"Paul Rand","who":"Paul Rand (1914 to 1996), American graphic designer, author of Thoughts on Design (1947), designer of the IBM, Westinghouse, ABC and UPS identities, and teacher at Yale","era":"New York and Connecticut, 1930s to 1996",
"hallmarks":["Playful, simple geometry: cut-paper shapes with a hand-made edge, a little crooked, never mechanical","Flat primary colours and lots of white space, often with handwriting next to clean type","Wit and visual puns, like the rebus in the Eye-Bee-M poster (1981)"],
"works":["IBM striped logo (1972)","Westinghouse (1960) and ABC (1962) logos","Sparkle and Spin, a children's book with Ann Rand (1957)"]}}
*/
/*CSS
:root{--bg:#f6f1e4;--fg:#1a1a1a;--acc:#e2322b;--bar-font:'Jost',Futura,sans-serif;--head-font:'Jost',Futura,sans-serif;--learn-font:'Jost',Futura,sans-serif}
#mm-bar{background:#1a1a1a;color:#f6f1e4}#mm-bar button.on{background:var(--acc)}
#mm-stage{display:grid;grid-template-columns:96px minmax(0,1fr) 300px;font-family:'Jost',sans-serif;background:var(--bg)}
#pal{display:flex;flex-direction:column;gap:6px;padding:10px;border-right:2px solid #1a1a1a;overflow:auto}
#pal .sw{height:34px;border:2px solid #1a1a1a;cursor:pointer;position:relative;transform:rotate(-1.5deg)}#pal .sw:nth-child(even){transform:rotate(1.2deg)}#pal .sw.on{outline:4px solid #1a1a1a;outline-offset:2px}#pal .sw span{position:absolute;right:3px;bottom:0;font:600 10px 'Jost';mix-blend-mode:difference;color:#fff}
#pal .sh{font:800 12px 'Jost';border:2px solid #1a1a1a;background:#fff;cursor:pointer;padding:4px 0}#pal .sh.on{background:#1a1a1a;color:#fff}
#viz{position:relative;cursor:copy}#cv{position:absolute;inset:0;width:100%;height:100%}
#hd{position:absolute;left:18px;top:12px;pointer-events:none;font:800 30px/1 'Jost';letter-spacing:.01em}#hd i{font:600 20px 'Caveat';display:block;font-style:normal;color:#555;margin-top:2px}
#side{overflow:auto;padding:10px 14px;border-left:2px solid #1a1a1a}#side h3{font:800 13px 'Jost';letter-spacing:.12em;margin:12px 0 4px}
#side .mmx-ctl{grid-template-columns:96px 1fr 44px;font:400 12px 'Jost'}#side button.big{font:800 13px 'Jost';background:var(--acc);color:#fff;border:0;padding:8px;cursor:pointer;width:100%;margin-top:4px;transform:rotate(-1deg)}
#mm-learn-dlg{box-shadow:10px 10px 0 #e2322b}
*/
/*HTML
<div id="pal"></div>
<div id="viz"><canvas id="cv"></canvas><div id="hd">COLOUR IS THE KEYBOARD<i>the eyes are the hammers, the soul is the piano with many strings</i></div></div>
<div id="side"><h3>READING</h3><div id="s1"></div><button class="big" id="compose">COMPOSE (C)</button><button class="big" id="undo" style="background:#1a1a1a">UNDO (⌫)</button><button class="big" id="clear" style="background:#888">CLEAR (X)</button><h3>BRUSH</h3><div id="s2"></div><h3>GEMINI</h3><div id="ai"></div></div>
*/
const st = MMX.bind({ bars: 2, bpm: 104, scale: 'major', root: 0, range: 2.5, read: 'scan', snap: true, grid: 16, brush: 0.08, col: 0, shape: 'triangle', rot: 0, verb: 0.3, duck: 0.85 });
const COLS = [['yellow', '#f7c815'], ['red', '#e2322b'], ['blue', '#1f4fbf'], ['green', '#2f9a4c'], ['orange', '#f08a1c'], ['violet', '#7a3fa0'], ['white', '#ffffff'], ['black', '#1a1a1a']];
const SHAPES = ['point', 'line', 'triangle', 'square', 'circle'], SKEY = { q: 'point', w: 'line', e: 'triangle', t: 'square', y: 'circle' };
const cv = MM.canvas('#cv'); let shapes = [], hist = [], t0 = 0, lastP = 0, active = [], bus = null, playX = 0, dragS = null;
function loopDur() { return st.bars * 4 * 60 / st.bpm; }
function compose(seed) { const R = MM.rng(seed ?? (Math.random() * 1e9) | 0), out = [];
  out.push({ s: 'circle', c: 2, x: 0.12 + R() * 0.1, y: 0.7, size: 0.16, rot: 0 }); out.push({ s: 'square', c: 1, x: 0.02, y: 0.45, size: 0.09, rot: 0.2 });
  for (let i = 0; i < 9; i++) out.push({ s: 'triangle', c: R() < 0.7 ? 0 : 4, x: R(), y: 0.1 + R() * 0.35, size: 0.03 + R() * 0.05, rot: R() * 6 });
  for (let i = 0; i < 6; i++) out.push({ s: 'circle', c: MM.pick([2, 5, 3], R), x: R(), y: 0.5 + R() * 0.45, size: 0.04 + R() * 0.1, rot: 0 });
  for (let i = 0; i < 5; i++) { const x = R() * 0.8; out.push({ s: 'line', c: MM.pick([0, 3, 5, 1], R), x, x2: x + 0.06 + R() * 0.2, y: R(), y2: R(), size: 0.03, rot: 0 }); }
  for (let i = 0; i < 8; i++) out.push({ s: 'point', c: MM.pick([1, 0, 3, 4], R), x: R(), y: R(), size: 0.015, rot: 0 });
  for (let i = 0; i < 3; i++) out.push({ s: 'square', c: MM.pick([1, 3, 4], R), x: R() * 0.9, y: 0.3 + R() * 0.5, size: 0.04 + R() * 0.05, rot: R() * 0.6 - 0.3 });
  out.push({ s: 'square', c: 6, x: 0.62, y: 0.5, size: 0.05, rot: 0.1 }); out.push({ s: 'point', c: 7, x: 0.94, y: 0.5, size: 0.02, rot: 0 }); return out; }
function push() { hist.push(JSON.stringify(shapes)); if (hist.length > 60) hist.shift(); }
function setShapes(a) { push(); shapes = a.map((o) => ({ s: SHAPES.includes(o.s) ? o.s : 'circle', c: MM.clamp(o.c | 0, 0, 7), x: MM.clamp(+o.x || 0, 0, 1), y: MM.clamp(+o.y || 0, 0, 1), size: MM.clamp(+o.size || 0.05, 0.01, 0.3), rot: +o.rot || 0, x2: o.x2 != null ? MM.clamp(+o.x2, 0, 1) : undefined, y2: o.y2 != null ? MM.clamp(+o.y2, 0, 1) : undefined, hit: 0 })); }
function semis(y) { const S = MM.SCALES[st.scale] || MM.SCALES.major, n = S.length, d = Math.floor((1 - y) * n * st.range); return 12 * Math.floor(d / n) + S[d % n] + st.root - 12; }
function sound(o, t) { o.hit = 1; const L = loopDur(), pan = MM.clamp(Math.sin(o.rot || 0) * 0.8 + (o.x - 0.5) * 0.4, -1, 1), g = 0.35 + o.size * 4;
  if (o.c === 6) { const d = 0.3 + o.size * 8; bus.gain.setTargetAtTime(1 - st.duck, t, 0.03); bus.gain.setTargetAtTime(1, t + d, 0.2); return; }
  if (o.c === 7) { active.forEach((h) => h.stop(t)); active = []; return; }
  const sem = o.semi ?? semis(o.y), slot = o.c; let h = null;
  if (o.s === 'point') h = MMX.fire(slot, t, { semis: sem, dur: 0.12 + o.size * 2, gain: g * 1.2, pan, dest: bus });
  else if (o.s === 'triangle') h = MMX.fire(slot, t, { semis: sem + 12, dur: 0.12 + o.size * 3, gain: g, pan, dest: bus, fadeOut: 0.05 });
  else if (o.s === 'square') h = MMX.fire(slot, t, { semis: sem, dur: Math.max(0.3, o.size * 2.5 * L), gain: g * 0.7, pan, dest: bus, loop: true, fadeIn: 0.02, fadeOut: 0.1 });
  else if (o.s === 'circle') h = MMX.fire(slot, t, { semis: sem - 12, dur: 1 + o.size * 10, gain: g * 0.8, pan, dest: bus, rev: st.verb + 0.3, fadeIn: 0.2 + o.size * 3, fadeOut: 0.6, loop: true });
  else if (o.s === 'line') { const d = Math.max(0.1, ((o.x2 ?? o.x + 0.1) - o.x) * L); h = MMX.fire(slot, t, { semis: sem, dur: d, gain: g, pan, dest: bus, loop: true, fadeIn: 0.02, fadeOut: 0.08 }); if (h) { const r0 = h.s.playbackRate.value, r1 = r0 * Math.pow(2, (semis(o.y2 ?? o.y) - sem) / 12); h.s.playbackRate.setValueAtTime(r0, t); h.s.playbackRate.exponentialRampToValueAtTime(Math.max(0.01, r1), t + d); } }
  if (h) { active.push(h); if (active.length > 64) active.shift(); } }
function posOf(o) { if (st.read === 'radial') { const a = Math.atan2(o.y - 0.5, (o.x - 0.5) * (cv.w / cv.h || 1.5)); return (a / 6.2832 + 1.25) % 1; } return o.x; }
function tick(now) { if (!bus) return; const L = loopDur(), look = now + 0.1, p0 = lastP, p1 = (look - t0) / L; if (p1 <= p0) return;
  shapes.forEach((o) => { const x = posOf(o); for (let c = Math.floor(p0); c <= Math.floor(p1); c++) { const ab = c + x; if (ab >= p0 && ab < p1) sound(o, t0 + ab * L); } }); lastP = p1; }
function start() { if (!bus) { bus = MM.ctx.createGain(); bus.connect(MM.out); } bus.gain.value = 1; t0 = MM.now + 0.05; lastP = 0; }
function stop() { active.forEach((h) => h.stop()); active = []; }
function shp(g, o, W, H, lit) { const x = o.x * W, y = o.y * H, r = o.size * Math.min(W, H), c = COLS[o.c][1]; g.save(); g.translate(x, y); g.rotate(o.s === 'circle' || o.s === 'line' ? 0 : o.rot * 0.3); const sc = 1 + lit * 0.18; g.scale(sc, sc);
  g.fillStyle = 'rgba(0,0,0,0.12)'; const sh = () => { if (o.s === 'circle' || o.s === 'point') { g.beginPath(); g.arc(0, 0, o.s === 'point' ? Math.max(4, r) : r, 0, 6.283); } else if (o.s === 'square') { g.beginPath(); g.rect(-r, -r, 2 * r, 2 * r * 0.96); } else if (o.s === 'triangle') { g.beginPath(); g.moveTo(0, -r * 1.2); g.lineTo(r, r * 0.8); g.lineTo(-r * 0.95, r * 0.75); g.closePath(); } };
  if (o.s === 'line') { g.restore(); g.save(); g.strokeStyle = c; g.lineWidth = 5 + lit * 4; g.lineCap = 'round'; g.beginPath(); g.moveTo(x, y); g.lineTo((o.x2 ?? o.x + 0.1) * W, (o.y2 ?? o.y) * H); g.stroke(); g.restore(); return; }
  g.translate(3, 3); sh(); g.fill(); g.translate(-3, -3); g.fillStyle = c; sh(); g.fill(); if (o.c === 6) { g.strokeStyle = '#1a1a1a'; g.lineWidth = 1.5; g.stroke(); } g.restore(); }
function draw() { cv.fit(); const g = cv.g, W = cv.w, H = cv.h; g.fillStyle = '#f6f1e4'; g.fillRect(0, 0, W, H);
  if (st.snap && st.read === 'scan') { g.strokeStyle = 'rgba(0,0,0,0.06)'; for (let i = 1; i < st.grid; i++) { g.beginPath(); g.moveTo(i / st.grid * W, 60); g.lineTo(i / st.grid * W, H); g.stroke(); } }
  shapes.forEach((o) => { shp(g, o, W, H, o.hit); o.hit *= 0.9; });
  if (dragS) shp(g, dragS, W, H, 0);
  if (MM.playing && bus) { const p = ((MM.now - t0) / loopDur()) % 1; g.fillStyle = '#1a1a1a';
    if (st.read === 'scan') { for (let i = 0; i < 8; i++) g.fillRect(p * W - 4, 60 + i * (H - 60) / 8, 8, (H - 60) / 8 - 5); } else { g.save(); g.translate(W / 2, H / 2); g.rotate(p * 6.2832 - Math.PI / 2); for (let i = 0; i < 8; i++) g.fillRect(i * Math.hypot(W, H) / 16, -3, Math.hypot(W, H) / 16 - 6, 6); g.restore(); } }
  g.font = "600 18px 'Caveat'"; g.fillStyle = '#555'; g.fillText(`${COLS[st.col][0]} ${st.shape} · ${shapes.length} shapes · ${st.bars} bars at ${st.bpm}`, 18, H - 14); }
function hitTest(x, y) { const W = cv.w, H = cv.h; for (let i = shapes.length - 1; i >= 0; i--) { const o = shapes[i], r = Math.max(10, o.size * Math.min(W, H)); if (Math.hypot(o.x * W - x, o.y * H - y) < r) return i; } return -1; }
function snapX(x) { return st.snap && st.read === 'scan' ? Math.round(x * st.grid) / st.grid : x; }
const cfg = { bpm: 104, tick, draw, start, stop,
  onSamples: (L) => MMX.assign(L),
  key: (e) => { if (MMX.key(e)) return; const k = e.key.toLowerCase(); if (k >= '1' && k <= '8') pick(+k - 1); else if (SKEY[k]) pickShape(SKEY[k]); else if (k === 'c') { setShapes(compose()); MM.toast('A new composition'); } else if (k === 'x') setShapes([]); else if (e.key === 'Backspace') undo(); else if (k === 'o') MMX.setParam('read', st.read === 'scan' ? 'radial' : 'scan'); },
  setup() {
    mkFallbacks();
    MMX.init({ state: st, slots: COLS.slice(0, 6).map(([n], i) => ({ label: n.toUpperCase() + ' · ' + ['trumpet', 'tuba and drum', 'cello', 'violin', 'Angelus bell', 'cor anglais'][i], kind: ['k_yel', 'k_red', 'k_blu', 'k_grn', 'k_orn', 'k_vio'][i], rv: [0.1, 0.08, 0.2, 0.15, 0.35, 0.2][i] })),
      extra: { get: () => ({ shapes: shapes.map(({ hit, ...o }) => o) }), set: (x) => { if (x.shapes) setShapes(x.shapes); } },
      factory: { 'Composition (seed 8)': { extra: { shapes: compose(8) } }, 'Yellow triangle, red square, blue circle': { extra: { shapes: [{ s: 'triangle', c: 0, x: 0.1, y: 0.25, size: 0.12, rot: 0 }, { s: 'square', c: 1, x: 0.4, y: 0.5, size: 0.11, rot: 0 }, { s: 'circle', c: 2, x: 0.72, y: 0.75, size: 0.14, rot: 0 }, { s: 'square', c: 6, x: 0.93, y: 0.5, size: 0.04, rot: 0 }] }, params: { bars: 1 } }, 'Radial: Several Circles': { extra: { shapes: compose(1926).filter((o) => o.s !== 'square') }, params: { read: 'radial', bars: 4, scale: 'lydian' } } },
      keys: [['1 to 8', 'colour: yellow, red, blue, green, orange, violet, white, black'], ['Q W E T Y', 'shape: point, line, triangle, square, circle'], ['click / drag', 'place (drag sets size, or the end of a line)'], ['shift-click', 'remove a shape'], ['C', 'compose'], ['X', 'clear'], ['⌫', 'undo'], ['O', 'scan / radial reading']],
      midiHelp: 'MIDI notes play the current colour live with the current shape, at that pitch. Notes 36 to 41 (C1 to F1) choose the colour. Map any slider with MIDI learn.',
      midi: (n, v, on) => { if (!on) return; if (n >= 36 && n <= 43) return pick(n - 36); if (!bus) start(); sound({ s: st.shape === 'line' ? 'point' : st.shape, c: st.col, x: 0.5, y: 0.5, size: 0.03 + v / 127 * 0.08, rot: st.rot, semi: n - 60 - (st.shape === 'triangle' ? 12 : st.shape === 'circle' ? -12 : 0) }, MM.now + 0.01); } });
    const P = MM.$('#pal'); COLS.forEach(([n, c], i) => { const b = MM.h('div', { class: 'sw', style: `background:${c}`, title: n }, MM.h('span', {}, String(i + 1))); b.onclick = () => pick(i); P.append(b); });
    SHAPES.forEach((s) => { const b = MM.h('button', { class: 'sh', 'data-s': s }, s); b.onclick = () => pickShape(s); P.append(b); });
    const A = MM.$('#s1'), B = MM.$('#s2');
    MMX.ctl(A, 'read', { type: 'select', label: 'Reading', options: [['scan', 'scan (left to right)'], ['radial', 'radial (clock hand)']] }); MMX.ctl(A, 'bars', { label: 'Loop (bars)', min: 1, max: 8, step: 1 }); MMX.ctl(A, 'bpm', { label: 'Tempo', min: 50, max: 180, step: 1, on: (v) => (MM.bpm = v) });
    MMX.ctl(A, 'scale', { type: 'select', label: 'Scale', options: Object.keys(MM.SCALES).map((k) => [k, k]) }); MMX.ctl(A, 'root', { type: 'select', label: 'Key', options: ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'].map((x, i) => [i, x]) }); MMX.ctl(A, 'range', { label: 'Range (oct)', min: 0.5, max: 4, step: 0.25 });
    MMX.ctl(A, 'snap', { type: 'check', label: 'Snap to grid' }); MMX.ctl(A, 'grid', { label: 'Grid', min: 4, max: 32, step: 1 }); MMX.ctl(A, 'verb', { label: 'Circle reverb', min: 0, max: 1 }); MMX.ctl(A, 'duck', { label: 'White pause', min: 0, max: 1 });
    MMX.ctl(B, 'brush', { label: 'Size', min: 0.01, max: 0.25, step: 0.005 }); MMX.ctl(B, 'rot', { label: 'Rotation', min: -3.14, max: 3.14, step: 0.01, hint: 'rotation also pans' });
    MM.$('#compose').onclick = () => setShapes(compose()); MM.$('#undo').onclick = undo; MM.$('#clear').onclick = () => setShapes([]);
    const vz = MM.$('#viz');
    MM.drag(vz, (x, y, ph, e) => { const W = cv.w, H = cv.h;
      if (ph === 'down') { if (e && e.shiftKey) { const i = hitTest(x, y); if (i >= 0) { push(); shapes.splice(i, 1); } return; } dragS = { s: st.shape, c: st.col, x: snapX(x / W), y: y / H, size: st.brush, rot: st.rot, hit: 0, ox: x, oy: y }; if (st.shape === 'line') { dragS.x2 = dragS.x + 0.01; dragS.y2 = dragS.y; } }
      else if (ph === 'move' && dragS) { if (dragS.s === 'line') { dragS.x2 = Math.max(dragS.x + 0.01, x / W); dragS.y2 = y / H; } else dragS.size = MM.clamp(Math.max(st.brush, Math.hypot(x - dragS.ox, y - dragS.oy) / Math.min(W, H)), 0.01, 0.3); }
      else if (ph === 'up' && dragS) { const { ox, oy, ...o } = dragS; push(); shapes.push(o); dragS = null; if (MM.ctx && bus) sound(o, MM.now + 0.01); } });
    MM.aiBox(MM.$('#ai'), { title: 'PAINT A MOOD', help: 'Describe a mood, a place or a piece of music. Gemini paints a Kandinsky composition: colours, shapes, where they sit and how big they are.', placeholder: 'the last train home, warm and a bit lonely',
      system: 'You are Wassily Kandinsky composing for a colour keyboard. Colours: 0 yellow (shrill trumpet), 1 red (trumpet/drum, vigour), 2 blue (flute to cello to organ, depth), 3 green (placid violin), 4 orange (Angelus bell), 5 violet (cor anglais, bassoon), 6 white (a pause), 7 black (silence, cuts all). Shapes: point (pluck), line (glide, needs x2 and y2), triangle (sharp, high), square (held), circle (slow swell, low). x is time 0..1, y is pitch (0 top = high, 1 bottom = low), size 0.01..0.25. Reply with JSON only.',
      schema: { type: 'OBJECT', properties: { title: { type: 'STRING' }, bpm: { type: 'INTEGER' }, scale: { type: 'STRING', enum: Object.keys(MM.SCALES) }, shapes: { type: 'ARRAY', items: { type: 'OBJECT', properties: { s: { type: 'STRING', enum: SHAPES }, c: { type: 'INTEGER' }, x: { type: 'NUMBER' }, y: { type: 'NUMBER' }, size: { type: 'NUMBER' }, x2: { type: 'NUMBER' }, y2: { type: 'NUMBER' } }, required: ['s', 'c', 'x', 'y', 'size'] } }, note: { type: 'STRING' } }, required: ['shapes'] },
      user: (p) => `Mood: ${p}\nPaint 12 to 30 shapes. Choose a tempo between 60 and 150, a scale, a short title, and a one-sentence note on the inner sound you chose.`,
      apply: (r) => { if (!r.shapes || !r.shapes.length) return 'Gemini sent no shapes'; setShapes(r.shapes); if (r.bpm) MMX.setParam('bpm', MM.clamp(r.bpm | 0, 50, 180)); if (r.scale && MM.SCALES[r.scale]) MMX.setParam('scale', r.scale); if (!MM.playing) MM.toggle(true); return (r.title ? r.title + ': ' : '') + (r.note || ''); },
      fallback: () => { setShapes(compose()); } });
    pick(0); pickShape('triangle'); shapes = compose(8);
  } };
function pick(i) { st.col = i; MM.$$('#pal .sw').forEach((b, j) => b.classList.toggle('on', j === i)); }
function pickShape(s) { st.shape = s; MM.$$('#pal .sh').forEach((b) => b.classList.toggle('on', b.dataset.s === s)); }
function undo() { if (hist.length) shapes = JSON.parse(hist.pop()); }
// built-in instruments, all at C4 so that pitch maths is shared
function mk(name, len, fn) { const ctx = MM.ctx, sr = ctx.sampleRate, B = ctx.createBuffer(1, (sr * len) | 0, sr), d = B.getChannelData(0); let pk = 0; for (let i = 0; i < d.length; i++) { d[i] = fn(i / sr); pk = Math.max(pk, Math.abs(d[i])); } for (let i = 0; i < d.length; i++) d[i] *= 0.7 / (pk || 1); MM.fb[name] = B; }
function mkFallbacks() { const f = MM.mtof(60), TAU = 6.2832, add = (t, n, roll, vib = 0) => { let s = 0; const ff = f * (1 + vib * Math.sin(t * TAU * 5.3)); for (let h = 1; h <= n; h++) s += Math.sin(TAU * ff * h * t) * Math.pow(h, -roll); return s; };
  mk('k_yel', 1.6, (t) => add(t, 14, 0.9 - Math.min(0.5, t * 2), 0.004) * Math.min(1, t * 30) * Math.exp(-t * 0.8));
  mk('k_red', 1.4, (t) => add(t / 2, 6, 1.4) * Math.min(1, t * 40) * Math.exp(-t * 1.5) + Math.sin(TAU * 60 * t * (1 + Math.exp(-t * 30))) * Math.exp(-t * 9) * 1.5);
  mk('k_blu', 2.2, (t) => add(t, 10, 1.25, 0.006) * Math.min(1, t * 6) * Math.exp(-t * 0.4));
  mk('k_grn', 2.0, (t) => add(t, 12, 1.0, 0.008) * Math.min(1, t * 8) * Math.exp(-t * 0.5));
  mk('k_orn', 3.0, (t) => [1, 2.4, 2.98, 4.2, 5.4].reduce((s, r, k) => s + Math.sin(TAU * f * r * t) * Math.exp(-t * (0.8 + k * 0.9)) / (k + 1), 0) * Math.min(1, t * 400));
  mk('k_vio', 1.8, (t) => { let s = 0; for (let h = 1; h <= 11; h += 2) s += Math.sin(TAU * f * h * t * (1 + 0.004 * Math.sin(t * 30))) / h; return s * Math.min(1, t * 15) * Math.exp(-t * 0.6); }); }
MM.init(cfg);
