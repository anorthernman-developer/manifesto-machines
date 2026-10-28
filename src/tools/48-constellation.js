/*META
{"gemini":true,"title":"Constellation","idea":"Place a few words on the page like stars: their positions make the rhythm and space, and their letters make the melody.","how":"Press PLAY. Each word is a star in a constellation. A slow sweep moves from left to right, and when it reaches a word, the word is sung: each letter is a note (vowels are long and consonants are short, struck with your sample), its height is the pitch register and its size is the loudness. Drag words to move them, double-click the page to add a word (you will be asked for it) and double-click a word to remove it. LAYOUT offers a few starting constellations, including one built on a single word repeated around an empty centre. With a Gemini key, give a theme and Gemini places a new constellation of words.","fonts":"family=Libre+Bodoni:ital,wght@0,400;0,700;1,400&family=Jost:wght@300;600","bpm":80,
"manifesto":{"name":"From Line to Constellation (vom vers zur konstellation)","short":"Concrete Poetry","author":"Eugen Gomringer","year":"1954","where":"published in Switzerland in 1954; Gomringer was then secretary to Max Bill at the Ulm School of Design","ideas":["Replace the line of verse with the constellation: a few words grouped on the page, read in any direction.","The poem becomes an object for seeing and using, closer to a sign, a logo or a playful thought game.","Reduction: very few words, with space as active material, as in his poems avenidas (1951) and silencio (1953 to 1954)."],"quotes":[],"system":"There are no bars or lines. The sweep reads words wherever you place them, so space, size and position on the page are the score, and the letters themselves are the melody."},
"design":{"name":"Bradbury Thompson","short":"Bradbury Thompson","who":"Bradbury Thompson, American graphic designer and art director","era":"New York, 1930s to 1980s","hallmarks":["Playful use of letters as images, printed in overlapping process colours (cyan, magenta and yellow)","Bold experiments with type and halftone in printers' magazines","A rational lower-case-only alphabet idea, Alphabet 26"],"works":["Westvaco Inspirations for Printers (1939 to 1962)","Alphabet 26 (1950)","Design for Mademoiselle magazine (1945 to 1959)"]}}
*/
/*CSS
:root{--bg:#fbfaf6;--fg:#1a1a1a;--acc:#e6007e;--bar-font:'Jost',sans-serif;--head-font:'Libre Bodoni',serif}
#mm-stage{background:#fbfaf6;display:grid;grid-template-columns:1fr 300px;overflow:hidden}
#cv{width:100%;height:100%;display:block;cursor:move;touch-action:none}
.side{padding:18px;font:300 13px 'Jost';display:flex;flex-direction:column;gap:8px;overflow:auto;border-left:1px solid #ddd}.side h1{margin:0;font:400 italic 40px 'Libre Bodoni'}
.side button{font:600 13px 'Jost';background:none;border:2px solid #1a1a1a;padding:5px;cursor:pointer;text-align:left}
*/
/*HTML
<canvas id="cv"></canvas><div class="side"><h1>konstellation</h1><div>LAYOUT</div><div id="lay" style="display:flex;flex-direction:column;gap:4px"></div><div id="ai"></div></div>
*/
const INK = ['#00a0e9', '#e6007e', '#ffe100', '#1a1a1a'];
const LAYOUTS = { 'single word around a gap': (() => { const W = []; for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) if (!(r === 2 && c === 1)) W.push({ w: 'silencio', x: 0.2 + c * 0.3, y: 0.18 + r * 0.16, s: 1 }); return W; })(),
  'avenue and flowers': [{ w: 'street', x: 0.18, y: 0.25, s: 1.2 }, { w: 'flowers', x: 0.55, y: 0.25, s: 1 }, { w: 'street', x: 0.18, y: 0.5, s: 1.2 }, { w: 'women', x: 0.55, y: 0.5, s: 1 }, { w: 'admirer', x: 0.4, y: 0.78, s: 1.4 }],
  'wind and stone': [{ w: 'wind', x: 0.15, y: 0.2, s: 1.6 }, { w: 'stone', x: 0.7, y: 0.75, s: 1.8 }, { w: 'wind', x: 0.4, y: 0.35, s: 0.9 }, { w: 'w i n d', x: 0.6, y: 0.15, s: 0.7 }, { w: 'still', x: 0.3, y: 0.82, s: 1 }] };
let W = JSON.parse(JSON.stringify(LAYOUTS['single word around a gap'])), sweep = 0, grab = -1;
Object.keys(LAYOUTS).forEach((n) => { const b = MM.h('button', {}, n); b.onclick = () => (W = JSON.parse(JSON.stringify(LAYOUTS[n]))); MM.$('#lay').append(b); });
const C = MM.canvas('#cv'); const fs = (o) => 18 + o.s * 22;
function hitW(x, y) { const g = C.g; return W.findIndex((o) => { g.font = `700 ${fs(o)}px 'Libre Bodoni'`; const tw = g.measureText(o.w).width; return x > o.x * C.w && x < o.x * C.w + tw && Math.abs(y - o.y * C.h) < fs(o) * 0.6; }); }
MM.drag(C.cv, (x, y, ph) => { if (ph === 'down') grab = hitW(x, y); if (ph === 'move' && grab >= 0) { W[grab].x = MM.clamp(x / C.w - 0.03, 0, 0.9); W[grab].y = MM.clamp(y / C.h, 0.05, 0.95); } if (ph === 'up') grab = -1; });
C.cv.addEventListener('dblclick', (e) => { const k = hitW(e.offsetX, e.offsetY); if (k >= 0) { W.splice(k, 1); return; } const w = (prompt('word for the constellation') || '').trim().slice(0, 18); if (w) W.push({ w, x: e.offsetX / C.w, y: e.offsetY / C.h, s: 1 }); });
function sing(o, t) { const B = MM.smp(0, 'voice'), base = 48 + Math.round((1 - o.y) * 24), letters = [...o.w.toLowerCase()].filter((c) => c !== ' '); let tt = t;
  letters.forEach((ch, k) => { const code = ch.charCodeAt(0) - 97, vow = 'aeiouy'.includes(ch), m = MM.deg(((code % 7) + 7) % 7 + (vow ? 2 : 0), 'lydian', base); const d = vow ? 0.28 : 0.09;
    if (vow) MM.tone(MM.mtof(m), tt, d * 1.6, { partials: [[1, 1], [2, 0.35], [3, 0.2]], gain: 0.06 * o.s, attack: 0.02, release: 0.3, pan: o.x * 2 - 1, send: { rev: 0.35 } });
    else MM.play(B, tt, { offset: ((code + 26) % 26) / 26 * B.duration * 0.9, dur: 0.07, rate: MM.mtof(m) / MM.mtof(60), gain: 0.35 * o.s, pan: o.x * 2 - 1, fadeOut: 0.02 });
    tt += d * 0.8; }); }
let lastS = 0, flashes = {};
MM.init({ bpm: 80, div: 4,
  setup() { MM.aiBox(MM.$('#ai'), { title: 'place a constellation', help: 'Gemini places a few words on the page as a concrete poem; the machine sings them.', placeholder: 'the sea at night',
      system: 'You make concrete-poetry constellations in the spirit of Eugen Gomringer (do not quote his poems). Use 3 to 12 placements of very few distinct words (1 to 4 different words, lower case, each under 12 letters). Space matters: leave gaps, use repetition and position. x and y are 0 to 1 (x up to 0.85), s is size from 0.6 to 2. Return JSON {"words":[{"w":"...","x":0.2,"y":0.3,"s":1}]}.',
      schema: { type: 'object', properties: { words: { type: 'array', items: { type: 'object', properties: { w: { type: 'string' }, x: { type: 'number' }, y: { type: 'number' }, s: { type: 'number' } }, required: ['w', 'x', 'y'] } } }, required: ['words'] },
      apply(j) { const ws = (j.words || []).filter((o) => o && o.w).slice(0, 16).map((o) => ({ w: String(o.w).toLowerCase().slice(0, 14), x: MM.clamp(+o.x || 0, 0, 0.85), y: MM.clamp(+o.y || 0.5, 0.05, 0.95), s: MM.clamp(+o.s || 1, 0.5, 2) })); if (!ws.length) throw new Error('no words'); W = ws; return ws.length + ' words placed.'; },
      fallback() { W = JSON.parse(JSON.stringify(MM.pick(Object.values(LAYOUTS)))); } }); },
  start() { sweep = 0; lastS = 0; },
  tick(now) { const period = 8; const prev = sweep; sweep = (sweep + 0.025 / period) % 1; W.forEach((o, k) => { const hit = sweep >= prev ? o.x >= prev && o.x < sweep : o.x >= prev || o.x < sweep; if (hit) { sing(o, now + 0.05); flashes[k] = 1; } }); },
  step(i, t, sd) { if (i % 16 === 0) MM.tone(MM.mtof(36), t, sd * 16, { type: 'sine', gain: 0.08, attack: 1, release: 2 }); if (i % 8 === 4 && W.length) MM.play(MM.smp(0, 'voice'), t, { gain: 0.15, rate: 0.5, fadeIn: 0.3, fadeOut: 0.5, send: { rev: 0.6 } }); },
  draw() { C.fit(); const g = C.g, w = C.w, h = C.h; g.fillStyle = '#fbfaf6'; g.fillRect(0, 0, w, h);
    if (MM.playing) { g.fillStyle = 'rgba(0,160,233,.08)'; g.fillRect(sweep * w - 40, 0, 40, h); g.fillStyle = '#00a0e9'; g.fillRect(sweep * w, 0, 1, h); }
    g.globalCompositeOperation = 'multiply'; W.forEach((o, k) => { const f = flashes[k] || 0; flashes[k] = f * 0.94; g.font = `700 ${fs(o)}px 'Libre Bodoni'`; const x = o.x * w, y = o.y * h; [0, 1, 2].forEach((q) => { g.fillStyle = INK[q]; g.globalAlpha = 0.55 + f * 0.45; g.fillText(o.w, x + (q - 1) * (2 + f * 6), y + (q - 1) * (1 + f * 3)); }); g.globalAlpha = 1; }); g.globalCompositeOperation = 'source-over'; }
});
