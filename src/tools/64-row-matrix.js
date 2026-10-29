/*META
{"title":"Row Matrix","deep":true,"gemini":false,"category":"music theory","date":"2026-10-29","kicker":"THEORY OF COMPOSITION · SCHOENBERG'S TWELVE-TONE METHOD, 1923",
"idea":"Arnold Schoenberg's method of composing with twelve tones as a four-voice instrument. One row of all twelve pitch classes is laid out as the full 12 × 12 matrix of its 48 forms (prime, inversion, retrograde, retrograde inversion, at every transposition). Give each voice a form, cut its row into chords, scatter it across octaves and hear the aggregate (all twelve notes) complete, again and again, with no note given priority over another.",
"controls":"5 slots (four voices plus an aggregate bell); the row itself (swap notes, random row, all-interval row, four famous rows); for each of four voices: form (P, I, R, RI) and transposition, chosen by clicking the matrix, rhythm in 16ths, chord segmentation (single notes, dyads, trichords, tetrachords, hexachords), octave, register spread, rest chance, level and what happens at the end of a row (repeat, mirror, transpose by the row, random form); Klangfarben mode that passes the melody between instruments; a hexachordal combinatoriality finder that pairs voices so their hexachords complete aggregates; tempo, swing, reverb and echo.",
"how":"Press PLAY. Voice 1 (red) plays the row's prime form P. Click any label round the matrix to give the selected voice that form: left edge P, top I, right R, bottom RI. Select a voice with 1 to 4 or by clicking its card. The circle at the right fills one pitch class at a time and flashes when all twelve have sounded: that is an aggregate. Press C to pair voice 2 with a form whose first six notes are exactly the six notes voice 1 leaves out, then listen to the aggregates close twice as fast. Click two notes in THE ROW to swap them and the whole matrix rebuilds.",
"fonts":"family=Archivo:wght@400;600;800;900","bpm":84,
"try":["Load a felt piano, a clarinet or flute, a pizzicato or plucked bass and a bell (single notes recorded at C) from your Splice folder into voices 1 to 4, choose the Berg row, set voice 1 to trichords and hear the major and minor triads hiding inside a twelve-tone row.","Choose the Webern Op. 21 row, switch on Klangfarben (K) and set every voice to single notes with a wide register spread: one line passed between instruments, note by note, as in Webern's orchestration.","Swap two notes of the row and watch the interval chart: try to build your own all-interval row (all eleven bars different heights), then press C and see whether it is combinatorial."],
"manifesto":{"name":"Composition with twelve tones related only with one another","short":"Schoenberg, twelve-tone method","author":"Arnold Schoenberg (1874 to 1951)","year":"1923 (first wholly twelve-tone pieces, the Piano Suite Op. 25, 1921 to 1923); explained in the lecture 'Composition with Twelve Tones', 1941","where":"First used in the Five Piano Pieces Op. 23 (last piece) and the Suite for Piano Op. 25. Schoenberg's own account is the 1941 lecture 'Composition with Twelve Tones (1)', printed in his essay collection 'Style and Idea' (1950, expanded 1975). Pupils Alban Berg and Anton Webern each used the method in their own way.",
"ideas":["A row (series) orders all twelve pitch classes once each. The piece is built from that row and its mirror forms: inversion (intervals turned upside down), retrograde (backwards) and retrograde inversion, each at any of the twelve transpositions, so 48 forms in all.","No pitch class is meant to dominate: you go through all twelve before repeating one, so there is no home key pulling the music back. Schoenberg described this as the emancipation of the dissonance: dissonances no longer need to resolve to consonances.","Order is about pitch class, not register. A row note may appear in any octave, and consecutive row notes may sound together as chords, so one row gives both melody and harmony.","Schoenberg wanted the row to unify a piece the way a key once did, and compared musical space to an absolute space in which up and down, forwards and backwards, are views of the same idea.","Rows can be designed. If the first six notes of a form and the first six of another form together make all twelve (hexachordal combinatoriality), two forms played at once complete aggregates as they go: Schoenberg relied on this in later works."],
"quotes":[["Method of composing with twelve tones which are related only with one another","Arnold Schoenberg, 'Composition with Twelve Tones (1)', 1941, in Style and Idea"]],
"system":"The row is a list of twelve pitch classes (C = 0 ... B = 11). The matrix puts the prime form P-n in each row, read left to right, and the inversion I-n in each column, read top to bottom; R-n reads a row right to left and RI-n reads a column bottom to top. Labels use the pitch class each form starts on (P-4 starts on E). Each voice steps through its form, taking 1, 2, 3, 4 or 6 consecutive notes at a time as a chord, on its own rhythm in 16ths. Each note's octave is fixed by a per-voice register seed so a form always lands the same way until you re-roll it. At the end of a form the voice repeats it, mirrors it (P, R, I, RI in turn), moves to the transposition given by the next note of the row, or jumps to a random form. The aggregate circle counts pitch classes since the last completion; when all twelve have sounded the bell slot rings. The combinatoriality finder lists every form whose first hexachord is the complement of voice 1's first hexachord."},
"design":{"name":"Ladislav Sutnar","short":"Sutnar","who":"Ladislav Sutnar (1897 to 1976), Czech designer who emigrated to New York in 1939 and became a pioneer of information design, working with the architect Knud Lönberg-Holm as art director of Sweet's Catalog Service","era":"Prague 1920s to 1930s; New York 1940s to 1960s",
"hallmarks":["Function, flow, form: the page is designed so the eye moves in a planned order through the information, guided by arrows, numbers and coloured bars.","Big, bold numerals and simple geometric signs (circles, squares, arrows) used as navigation, not decoration.","Brackets and rules that group related items, and a strong hierarchy of type sizes so the most important fact reads first.","Flat primary colour (red, blue, yellow) on white with black type, used to code categories consistently from page to page."],
"works":["'Catalog Design' (1944) and 'Catalog Design Progress' (1950), both with Knud Lönberg-Holm, for Sweet's Catalog Service","'Visual Design in Action: Principles, Purposes' (1961)","The brackets around US telephone area codes, from his 1950s Bell System work"]}}
*/
/*CSS
:root{--bg:#f7f5ef;--fg:#111;--acc:#e2231a;--bar-bg:#111;--bar-fg:#f7f5ef;--bar-font:'Archivo',sans-serif;--learn-font:'Archivo',sans-serif;--learn-bg:#f7f5ef;--deck-bg:#f7f5ef}
#mm-stage{display:grid;grid-template-columns:minmax(0,1fr) 290px}
#pic{position:relative;overflow:hidden;cursor:pointer}#cv{position:absolute;inset:0;width:100%;height:100%}
#ttl{position:absolute;left:22px;top:12px;font:900 38px/1 'Archivo';letter-spacing:-.01em;pointer-events:none}#ttl small{display:block;font:600 11px 'Archivo';letter-spacing:.14em;text-transform:uppercase;margin-top:6px}#ttl small b{background:#e2231a;color:#fff;padding:1px 5px;margin-right:6px}
#side{overflow:auto;padding:10px 14px;border-left:10px solid #111;display:flex;flex-direction:column;gap:3px;font:400 12px 'Archivo'}
#side h3{font:800 13px 'Archivo';letter-spacing:.08em;text-transform:uppercase;margin:10px 0 2px;display:flex;align-items:center;gap:8px}#side h3 i{font-style:normal;display:inline-grid;place-items:center;width:22px;height:22px;border-radius:50%;background:var(--c,#e2231a);color:#fff;font:900 12px 'Archivo'}
#side .mmx-ctl{grid-template-columns:96px 1fr 40px;font:400 12px 'Archivo'}#side .mmx-ctl select{grid-column:2/4;min-width:0}
.bb{font:800 11px 'Archivo';letter-spacing:.05em;border:0;background:#111;color:#fff;padding:6px 9px;cursor:pointer;margin:2px 3px 2px 0}.bb.on{background:#e2231a}
#vsel{display:flex;gap:4px}#vsel button{flex:1;font:900 16px 'Archivo';border:3px solid #111;background:#fff;cursor:pointer;padding:3px 0}#vsel button.on{color:#fff;border-color:transparent}
#mm-learn-dlg h2{font:900 34px/1.05 'Archivo'}#mm-learn-dlg{box-shadow:12px 12px 0 #0057a8}
*/
/*HTML
<div id="pic"><canvas id="cv"></canvas><div id="ttl">Row Matrix<small><b>12</b>tones related only with one another · after Schoenberg 1923</small></div></div>
<div id="side"><div><button class="bb" id="b-pair">C · PAIR COMBINATORIAL</button><button class="bb" id="b-kf">K · KLANGFARBEN</button><button class="bb" id="b-new">N · RANDOM ROW</button><button class="bb" id="b-ai">A · ALL-INTERVAL ROW</button><button class="bb" id="b-reg">G · NEW REGISTERS</button></div>
<h3 style="--c:#111"><i>1</i>The row</h3><div id="s1"></div>
<h3 style="--c:#e2231a"><i>2</i>Selected voice</h3><div id="vsel"></div><div id="s2"></div>
<h3 style="--c:#0057a8"><i>3</i>Time</h3><div id="s3"></div><h3 style="--c:#f4c300"><i>4</i>Space</h3><div id="s4"></div></div>
*/
const NAMES = ['C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B'], NUM = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'E'];
const RED = '#e2231a', BLUE = '#0057a8', YEL = '#f4c300', INK = '#111', PAPER = '#f7f5ef', VC = [RED, BLUE, YEL, INK];
const ROWS = { op25: { name: 'Schoenberg, Suite Op. 25 (1921 to 23)', row: [4, 5, 7, 1, 6, 3, 8, 2, 11, 0, 9, 10] }, berg: { name: 'Berg, Violin Concerto (1935)', row: [7, 10, 2, 6, 9, 0, 4, 8, 11, 1, 3, 5] },
  webern: { name: 'Webern, Symphony Op. 21 (1928)', row: [9, 6, 7, 8, 4, 5, 11, 10, 2, 1, 0, 3] }, lyric: { name: 'Berg, Lyric Suite all-interval row (1926)', row: [5, 4, 0, 9, 7, 2, 8, 1, 3, 6, 10, 11] } };
const RATES = [1, 2, 3, 4, 6, 8, 12, 16], SEGS = [1, 2, 3, 4, 6];
const st = MMX.bind({ bpm: 84, swing: 0, rowName: 'op25', names: 'names', sel: 0, kf: false, verb: 0.3, echo: 0.15, bell: 0.5,
  v0on: true, v0form: 'P', v0n: 4, v0rate: 2, v0seg: 1, v0oct: 0, v0spread: 1, v0rest: 0, v0lv: 0.8, v0end: 'repeat',
  v1on: true, v1form: 'I', v1n: 9, v1rate: 4, v1seg: 3, v1oct: -1, v1spread: 1, v1rest: 0.1, v1lv: 0.55, v1end: 'mirror',
  v2on: false, v2form: 'R', v2n: 4, v2rate: 8, v2seg: 1, v2oct: -2, v2spread: 0, v2rest: 0, v2lv: 0.6, v2end: 'walk',
  v3on: false, v3form: 'RI', v3n: 0, v3rate: 3, v3seg: 1, v3oct: 1, v3spread: 2, v3rest: 0.35, v3lv: 0.45, v3end: 'random' });
let ROW = ROWS.op25.row.slice(), V = [0, 1, 2, 3].map(() => ({ pos: 0, cur: -1, seed: Math.random() * 1000, flash: 0, rowsDone: 0 })), agg = new Set(), aggCount = 0, aggFlash = 0, swapA = -1, kfi = 0, lay = {}, partners = [], cellFlash = {};
const cv = MM.canvas('#cv');
const vp = (k, p) => st['v' + k + p], setV = (k, p, v) => MMX.setParam('v' + k + p, v);
const nm = (pc) => (st.names === 'numbers' ? NUM : NAMES)[((pc % 12) + 12) % 12];
/* ---------- row forms ---------- */
const mod = (x) => ((x % 12) + 12) % 12;
function form(f, n, row = ROW) { const p0 = row[0]; let r = f === 'P' || f === 'R' ? row.map((x) => mod(x - p0 + n)) : row.map((x) => mod(n - (x - p0))); if (f === 'R') r = r.slice().reverse(); if (f === 'RI') r = r.slice().reverse(); return r; }
// R-n is P-n backwards (it ends on n); RI-n is I-n backwards
const matrix = () => ROW.map((_, r) => form('P', mod(2 * ROW[0] - ROW[r])));
const hexKey = (a) => a.slice(0, 6).slice().sort((x, y) => x - y).join(',');
function findPartners(f, n) { const h = new Set(form(f, n).slice(0, 6)), out = []; ['P', 'I', 'R', 'RI'].forEach((F) => { for (let m = 0; m < 12; m++) { if (m === n && (F === f || ({ P: 'R', R: 'P', I: 'RI', RI: 'I' })[f] === F)) continue; const fh = form(F, m).slice(0, 6); if (fh.every((x) => !h.has(x))) out.push([F, m]); } }); return out; }
function intervals(row = ROW) { return row.slice(1).map((x, i) => mod(x - row[i])); }
const isAllInterval = (row = ROW) => new Set(intervals(row)).size === 11;
function randomRow() { const a = [...Array(12).keys()]; for (let i = 11; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; }
function allIntervalRow() { for (let tries = 0; tries < 200; tries++) { const start = (Math.random() * 12) | 0, row = [start], used = new Set([start]), iv = new Set(); const go = () => { if (row.length === 12) return true; const opts = [...Array(11).keys()].map((x) => x + 1).filter((x) => !iv.has(x)).sort(() => Math.random() - 0.5); for (const d of opts) { const nx = mod(row[row.length - 1] + d); if (used.has(nx)) continue; row.push(nx); used.add(nx); iv.add(d); if (go()) return true; row.pop(); used.delete(nx); iv.delete(d); } return false; }; if (go()) return row; } return ROWS.lyric.row.slice(); }
function setRow(r, msg) { ROW = r.slice(); V.forEach((v) => (v.pos = 0)); calcPartners(); if (msg) MM.toast(msg); }
function calcPartners() { partners = findPartners(vp(0, 'form'), vp(0, 'n')); }
/* ---------- audio ---------- */
let N = {};
function build() { const c = MM.ctx; N.bus = c.createGain(); N.bus.connect(MM.out); N.vs = c.createGain(); N.cv = c.createConvolver(); N.cv.buffer = imp(2.6); N.bus.connect(N.vs); N.vs.connect(N.cv); N.cv.connect(MM.out);
  N.dl = c.createDelay(2); N.dfb = c.createGain(); N.dfb.gain.value = 0.35; N.dw = c.createGain(); N.bus.connect(N.dl); N.dl.connect(N.dfb); N.dfb.connect(N.dl); N.dl.connect(N.dw); N.dw.connect(MM.out); apply(); }
function imp(sec) { const c = MM.ctx, n = (c.sampleRate * sec) | 0, b = c.createBuffer(2, n, c.sampleRate); for (let ch = 0; ch < 2; ch++) { const d = b.getChannelData(ch); for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3) * 0.5; } return b; }
function apply() { if (!N.bus) return; const t = MM.now; N.vs.gain.setTargetAtTime(st.verb, t, 0.1); N.dw.gain.setTargetAtTime(st.echo, t, 0.1); N.dl.delayTime.setTargetAtTime((60 / MM.bpm) * 0.75, t, 0.1); MM.$('#b-kf').classList.toggle('on', st.kf); }
const rt = (m) => MM.mtof(m) / MM.mtof(60);
function hash(x) { const s = Math.sin(x * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); }
function octOf(k, idx) { const sp = vp(k, 'spread'); return vp(k, 'oct') + (sp ? Math.floor(hash(V[k].seed + idx * 7.3) * (sp + 1)) - Math.floor(sp / 2) : 0); }
function playNote(k, pc, idx, t, dur, gain, slot) { const m = 60 + pc + 12 * octOf(k, idx); MMX.fire(slot, t, { rate: rt(m), gain, dur, fadeIn: 0.005, fadeOut: Math.min(0.25, dur * 0.4), pan: [-0.4, 0.4, -0.1, 0.15][k] + (hash(idx + k) - 0.5) * 0.3, dest: N.bus });
  setTimeout(() => { agg.add(pc); cellFlash[k + ':' + pc] = performance.now(); if (agg.size === 12) { agg = new Set(); aggCount++; aggFlash = performance.now(); if (st.bell > 0.01) MMX.fire(4, MM.now + 0.01, { gain: st.bell * 0.6, dur: 3, fadeOut: 1.5, dest: N.bus }); } }, Math.max(0, (t - MM.now) * 1000)); }
function endOfRow(k) { const e = vp(k, 'end'), f = vp(k, 'form'), n = vp(k, 'n'); V[k].rowsDone++;
  if (e === 'mirror') setV(k, 'form', { P: 'R', R: 'I', I: 'RI', RI: 'P' }[f]);
  else if (e === 'walk') setV(k, 'n', mod(ROW[(V[k].rowsDone) % 12] - ROW[0] + vp(0, 'n')));
  else if (e === 'random') { setV(k, 'form', ['P', 'I', 'R', 'RI'][(Math.random() * 4) | 0]); setV(k, 'n', (Math.random() * 12) | 0); }
  if (k === 0) calcPartners(); }
function step(i, t, sd) { for (let k = 0; k < 4; k++) { if (!vp(k, 'on')) continue; const rate = vp(k, 'rate'); if (i % rate) continue;
    if (Math.random() < vp(k, 'rest')) continue; const seg = vp(k, 'seg'), F = form(vp(k, 'form'), vp(k, 'n')), v = V[k]; if (v.pos >= 12) { v.pos = 0; endOfRow(k); }
    const notes = F.slice(v.pos, v.pos + seg), base = v.pos; v.cur = v.pos; v.flash = performance.now(); const dur = Math.max(0.12, rate * sd * 0.92), lv = vp(k, 'lv') / Math.sqrt(notes.length);
    notes.forEach((pc, j) => { const slot = st.kf && k === 0 ? kfi++ % 4 : k; playNote(k, pc, base + j, t + j * 0.012 * (seg > 1 ? 1 : 0), dur, lv, slot); });
    v.pos += seg; if (v.pos >= 12) { /* finish the form on the next event */ } } }
/* ---------- drawing: Sutnar ---------- */
function circ(g, x, y, r, col, fill = true) { g.beginPath(); g.arc(x, y, r, 0, 7); if (fill) { g.fillStyle = col; g.fill(); } else { g.strokeStyle = col; g.stroke(); } }
function arrow(g, x1, y1, x2, y2, col) { g.strokeStyle = col; g.fillStyle = col; g.lineWidth = 3; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); const a = Math.atan2(y2 - y1, x2 - x1); g.beginPath(); g.moveTo(x2 + Math.cos(a) * 4, y2 + Math.sin(a) * 4); g.lineTo(x2 - Math.cos(a - 0.5) * 10, y2 - Math.sin(a - 0.5) * 10); g.lineTo(x2 - Math.cos(a + 0.5) * 10, y2 - Math.sin(a + 0.5) * 10); g.fill(); }
function draw() { cv.fit(); const g = cv.g, W = cv.w, H = cv.h, pnow = performance.now(); g.fillStyle = PAPER; g.fillRect(0, 0, W, H); const M = matrix();
  // 1. the matrix
  const S = Math.min(H - 96, W * 0.52), cs = S / 14, mx = 22, my = 82; lay.m = { x: mx, y: my, cs };
  g.textAlign = 'center'; g.textBaseline = 'middle';
  const sel = st.sel, sf = vp(sel, 'form'), sn = vp(sel, 'n');
  for (let r = 0; r < 12; r++) for (let c = 0; c < 12; c++) { const x = mx + (c + 1) * cs, y = my + (r + 1) * cs, pc = M[r][c];
    g.fillStyle = (r + c) % 2 ? '#fff' : '#efece3'; g.fillRect(x, y, cs, cs);
    for (let k = 3; k >= 0; k--) { if (!vp(k, 'on')) continue; const f = vp(k, 'form'), n = vp(k, 'n'), rowHit = (f === 'P' || f === 'R') && M[r][0] === n, colHit = (f === 'I' || f === 'RI') && M[0][c] === n;
      if (rowHit || colHit) { g.fillStyle = VC[k]; g.globalAlpha = k === sel ? 0.22 : 0.1; g.fillRect(x, y, cs, cs); g.globalAlpha = 1; const fl = cellFlash[k + ':' + pc]; if (fl && pnow - fl < 260) { circ(g, x + cs / 2, y + cs / 2, cs * 0.44, VC[k]); } } }
    const lit = [0, 1, 2, 3].some((k) => { const fl = cellFlash[k + ':' + pc]; return fl && pnow - fl < 260 && vp(k, 'on') && (((vp(k, 'form') === 'P' || vp(k, 'form') === 'R') && M[r][0] === vp(k, 'n')) || ((vp(k, 'form') === 'I' || vp(k, 'form') === 'RI') && M[0][c] === vp(k, 'n'))); });
    g.fillStyle = lit ? '#fff' : INK; g.font = `${r === 0 || c === 0 ? 800 : 600} ${Math.max(9, cs * 0.36)}px 'Archivo'`; g.fillText(nm(pc), x + cs / 2, y + cs / 2 + 1); }
  // labels on all four sides
  g.font = `800 ${Math.max(8, cs * 0.27)}px 'Archivo'`;
  const lab = (x, y, txt, on, col) => { if (on) { g.fillStyle = col; g.fillRect(x + 1, y + 1, cs - 2, cs - 2); } g.fillStyle = on ? (col === YEL ? INK : '#fff') : '#777'; g.fillText(txt, x + cs / 2, y + cs / 2 + 1); };
  const own = (F, n) => { for (let k = 0; k < 4; k++) if (vp(k, 'on') && vp(k, 'form') === F && vp(k, 'n') === n) return VC[k]; return null; };
  for (let r = 0; r < 12; r++) { const n = M[r][0], y = my + (r + 1) * cs; let o = own('P', n); lab(mx, y, 'P' + NUM[n], !!o, o); o = own('R', n); lab(mx + 13 * cs, y, 'R' + NUM[n], !!o, o); }
  for (let c = 0; c < 12; c++) { const n = M[0][c], x = mx + (c + 1) * cs; let o = own('I', n); lab(x, my, 'I' + NUM[n], !!o, o); o = own('RI', n); lab(x, my + 13 * cs, 'RI' + NUM[n], !!o, o); }
  g.strokeStyle = INK; g.lineWidth = 3; g.strokeRect(mx + cs, my + cs, 12 * cs, 12 * cs);
  // reading-direction arrows (Sutnar's flow)
  arrow(g, mx + cs * 1.2, my - 8, mx + cs * 4, my - 8, RED); g.fillStyle = RED; g.font = "800 10px 'Archivo'"; g.textAlign = 'left'; g.fillText('P → read rows · I ↓ read columns · R ← · RI ↑', mx + cs * 4 + 8, my - 8);
  // 2. right column
  const rx = mx + S + 26, rw = W - rx - 16; g.textAlign = 'left';
  // THE ROW strip
  let y = 82; g.fillStyle = INK; g.font = "900 13px 'Archivo'"; g.fillText('THE ROW', rx, y); g.font = "600 10px 'Archivo'"; g.fillStyle = '#555'; g.fillText((ROWS[st.rowName] ? ROWS[st.rowName].name : 'your row') + (isAllInterval() ? ' · ALL-INTERVAL' : ''), rx + 74, y);
  const rc = Math.min(28, rw / 12); y += 12; lay.row = { x: rx, y, w: rc, h: rc };
  ROW.forEach((pc, i) => { const x = rx + i * rc; circ(g, x + rc / 2, y + rc / 2, rc / 2 - 2, i === swapA ? RED : i < 6 ? INK : '#555'); g.fillStyle = '#fff'; g.textAlign = 'center'; g.font = `800 ${rc * 0.42}px 'Archivo'`; g.fillText(nm(pc), x + rc / 2, y + rc / 2 + 1); });
  // hexachord brackets
  g.strokeStyle = INK; g.lineWidth = 2; [0, 6].forEach((h) => { const x0 = rx + h * rc + 3, x1 = rx + (h + 6) * rc - 3, yb = y + rc + 4; g.beginPath(); g.moveTo(x0, yb - 3); g.lineTo(x0, yb); g.lineTo(x1, yb); g.lineTo(x1, yb - 3); g.stroke(); });
  g.fillStyle = '#555'; g.font = "600 9px 'Archivo'"; g.textAlign = 'left'; g.fillText('HEXACHORD 1', rx + 3, y + rc + 14); g.fillText('HEXACHORD 2', rx + 6 * rc + 3, y + rc + 14);
  // interval chart
  y += rc + 26; const iv = intervals(), ih = 30, iw = (12 * rc) / 11; iv.forEach((d, i) => { const hh = (Math.min(d, 12 - d) / 6) * ih; g.fillStyle = iv.indexOf(d) !== i ? '#bbb' : BLUE; g.fillRect(rx + i * iw + iw * 0.2, y + ih - hh, iw * 0.6, hh); g.fillStyle = INK; g.font = "700 9px 'Archivo'"; g.textAlign = 'center'; g.fillText(d, rx + i * iw + iw / 2, y + ih + 8); });
  g.textAlign = 'left'; g.fillStyle = '#555'; g.font = "600 9px 'Archivo'"; g.fillText('INTERVALS (semitones up, mod 12) · grey = repeated', rx, y + ih + 20);
  // voice cards
  y += ih + 32; const vh = Math.max(40, Math.min(58, (H - y - 130) / 4)); lay.cards = [];
  for (let k = 0; k < 4; k++) { const yy = y + k * (vh + 6), on = vp(k, 'on'), F = form(vp(k, 'form'), vp(k, 'n')); lay.cards.push({ x: rx, y: yy, w: rw, h: vh, k });
    g.fillStyle = k === sel ? VC[k] : '#fff'; g.fillRect(rx, yy, 34, vh); g.strokeStyle = VC[k]; g.lineWidth = 3; g.strokeRect(rx + 1.5, yy + 1.5, rw - 3, vh - 3);
    g.fillStyle = k === sel ? (k === 2 ? INK : '#fff') : VC[k] === YEL ? '#c9a000' : VC[k]; g.font = "900 26px 'Archivo'"; g.textAlign = 'center'; g.fillText(k + 1, rx + 17, yy + vh / 2 + 2);
    g.textAlign = 'left'; g.fillStyle = on ? INK : '#999'; g.font = "900 15px 'Archivo'"; g.fillText(on ? vp(k, 'form') + '-' + NUM[vp(k, 'n')] : 'OFF', rx + 42, yy + 14);
    g.font = "600 9px 'Archivo'"; g.fillStyle = '#555'; g.fillText(`${['single notes', 'dyads', 'trichords', 'tetrachords', '', 'hexachords'][vp(k, 'seg') - 1]} · every ${vp(k, 'rate')}/16`, rx + 90, yy + 14);
    const nw = Math.min(18, (rw - 50) / 12), seg = vp(k, 'seg'); F.forEach((pc, i) => { const x = rx + 42 + i * nw, cur = on && i >= V[k].cur && i < V[k].cur + seg && pnow - V[k].flash < 400; circ(g, x + nw / 2, yy + vh - 14, nw / 2 - 1.5, cur ? VC[k] : '#e4e0d4'); g.fillStyle = cur && k !== 2 ? '#fff' : INK; g.font = `700 ${nw * 0.45}px 'Archivo'`; g.textAlign = 'center'; g.fillText(nm(pc), x + nw / 2, yy + vh - 13); });
    if (seg > 1) { g.strokeStyle = VC[k]; g.lineWidth = 2; for (let s = 0; s < 12; s += seg) { const x0 = rx + 42 + s * nw + 2, x1 = rx + 42 + Math.min(12, s + seg) * nw - 2, yb = yy + vh - 3; g.beginPath(); g.moveTo(x0, yb - 2); g.lineTo(x0, yb); g.lineTo(x1, yb); g.lineTo(x1, yb - 2); g.stroke(); } } g.textAlign = 'left'; }
  // aggregate clock + combinatoriality
  y += 4 * (vh + 6) + 6; const R = Math.min(48, (H - y - 14) / 2, rw * 0.22), cx = rx + R + 4, cy = y + R + 4; const af = pnow - aggFlash < 500;
  circ(g, cx, cy, R, af ? RED : '#fff'); g.strokeStyle = INK; g.lineWidth = 3; g.beginPath(); g.arc(cx, cy, R, 0, 7); g.stroke();
  for (let pc = 0; pc < 12; pc++) { const a = (pc / 12) * Math.PI * 2 - Math.PI / 2, x = cx + Math.cos(a) * R * 0.72, yy = cy + Math.sin(a) * R * 0.72; circ(g, x, yy, R * 0.15, agg.has(pc) ? INK : af ? '#fff' : '#e4e0d4'); g.fillStyle = agg.has(pc) ? '#fff' : INK; g.font = `700 ${R * 0.16}px 'Archivo'`; g.textAlign = 'center'; g.fillText(NUM[pc], x, yy + 1); }
  g.fillStyle = af ? '#fff' : INK; g.font = `900 ${R * 0.42}px 'Archivo'`; g.fillText(aggCount, cx, cy + 1);
  const tx = cx + R + 14; g.textAlign = 'left'; g.fillStyle = INK; g.font = "900 12px 'Archivo'"; g.fillText('AGGREGATES COMPLETED', tx, cy - R * 0.55); g.font = "600 10px 'Archivo'"; g.fillStyle = '#555'; g.fillText(`${agg.size} of 12 pitch classes so far`, tx, cy - R * 0.55 + 14);
  g.fillStyle = INK; g.font = "800 10px 'Archivo'"; g.fillText(`COMBINATORIAL WITH ${vp(0, 'form')}-${NUM[vp(0, 'n')]}:`, tx, cy + 6); g.font = "600 10px 'Archivo'"; g.fillStyle = partners.length ? BLUE : '#999';
  const pl = partners.map(([F, m]) => F + '-' + NUM[m]).join('  '); g.fillText(pl ? (pl.length > 44 ? pl.slice(0, 44) + '…' : pl) : 'none: this row is not hexachordally combinatorial', tx, cy + 20);
  g.textBaseline = 'alphabetic'; }
MM.drag(MM.$('#pic'), (px, py, ph) => { if (ph !== 'down') return; const m = lay.m, cs = m.cs, c = Math.floor((px - m.x) / cs), r = Math.floor((py - m.y) / cs), M = matrix(), k = st.sel;
  if (c >= 0 && c <= 13 && r >= 0 && r <= 13) { const pick = (F, n) => { setV(k, 'form', F); setV(k, 'n', n); setV(k, 'on', true); V[k].pos = 0; if (k === 0) calcPartners(); MM.toast(`Voice ${k + 1}: ${F}-${NUM[n]}`); };
    if (c === 0 && r >= 1 && r <= 12) return pick('P', M[r - 1][0]); if (c === 13 && r >= 1 && r <= 12) return pick('R', M[r - 1][0]); if (r === 0 && c >= 1 && c <= 12) return pick('I', M[0][c - 1]); if (r === 13 && c >= 1 && c <= 12) return pick('RI', M[0][c - 1]);
    if (c >= 1 && c <= 12 && r >= 1 && r <= 12) { MM.ensure(); const pc = M[r - 1][c - 1]; MMX.fire(k, MM.now + 0.01, { rate: rt(60 + pc + 12 * vp(k, 'oct')), gain: 0.7, dur: 0.8, fadeOut: 0.2, dest: N.bus }); cellFlash[k + ':' + pc] = performance.now(); return; } }
  const R = lay.row; if (R && py >= R.y && py <= R.y + R.h && px >= R.x && px < R.x + 12 * R.w) { const i = Math.floor((px - R.x) / R.w); if (swapA < 0) { swapA = i; MM.toast('Now click another note to swap'); } else { const a = ROW.slice(); [a[swapA], a[i]] = [a[i], a[swapA]]; swapA = -1; MMX.setParam('rowName', 'custom'); setRow(a); } return; }
  const card = (lay.cards || []).find((q) => px >= q.x && px <= q.x + q.w && py >= q.y && py <= q.y + q.h); if (card) selVoice(card.k); });
function selVoice(k) { MMX.setParam('sel', k); [...MM.$('#vsel').children].forEach((b, j) => { b.classList.toggle('on', j === k); b.style.background = j === k ? VC[j] : '#fff'; b.style.color = j === k ? (j === 2 ? INK : '#fff') : INK; }); buildVoiceCtl(); }
function buildVoiceCtl() { const S2 = MM.$('#s2'); S2.innerHTML = ''; const k = st.sel;
  MMX.ctl(S2, 'v' + k + 'on', { type: 'check', label: 'Voice on (M)' }); MMX.ctl(S2, 'v' + k + 'form', { type: 'select', label: 'Form', options: [['P', 'P prime'], ['I', 'I inversion'], ['R', 'R retrograde'], ['RI', 'RI retrograde inversion']], on: () => k === 0 && calcPartners() });
  MMX.ctl(S2, 'v' + k + 'n', { type: 'select', label: 'Starts on', options: NAMES.map((x, j) => [j, `${x} (${NUM[j]})`]), on: () => k === 0 && calcPartners() });
  MMX.ctl(S2, 'v' + k + 'rate', { type: 'select', label: 'Every (16ths)', options: RATES.map((r) => [r, r + '/16']) }); MMX.ctl(S2, 'v' + k + 'seg', { type: 'select', label: 'Segments', options: [[1, 'single notes'], [2, 'dyads'], [3, 'trichords'], [4, 'tetrachords'], [6, 'hexachords']] });
  MMX.ctl(S2, 'v' + k + 'oct', { label: 'Octave', min: -3, max: 2, step: 1 }); MMX.ctl(S2, 'v' + k + 'spread', { label: 'Register spread', min: 0, max: 4, step: 1 }); MMX.ctl(S2, 'v' + k + 'rest', { label: 'Rest chance', min: 0, max: 0.8 }); MMX.ctl(S2, 'v' + k + 'lv', { label: 'Level', min: 0, max: 1.2 });
  MMX.ctl(S2, 'v' + k + 'end', { type: 'select', label: 'Row ends', options: [['repeat', 'repeat the form'], ['mirror', 'mirror: P→R→I→RI'], ['walk', 'transpose by the row'], ['random', 'random form']] }); }
function pairComb() { calcPartners(); if (!partners.length) { MM.toast('No hexachordal partner for this form. Try the Op. 25 row or an all-interval row.'); return; } const best = partners.find(([F]) => F === 'I') || partners.find(([F]) => F === 'RI') || partners[0];
  setV(1, 'form', best[0]); setV(1, 'n', best[1]); setV(1, 'on', true); setV(1, 'seg', vp(0, 'seg')); setV(1, 'rate', vp(0, 'rate')); V[0].pos = 0; V[1].pos = 0; agg = new Set(); MM.toast(`Voice 2 → ${best[0]}-${NUM[best[1]]}: its first six notes are the six voice 1 leaves out`); }
const cfg = { bpm: 84, div: 4, step, draw, start: () => { V.forEach((v) => { v.pos = 0; v.cur = -1; }); agg = new Set(); }, onSamples: (list) => MMX.assign(list),
  key: (e) => { if (MMX.key(e)) return; const k = e.key.toLowerCase(), s = st.sel;
    if ('1234'.includes(e.key)) selVoice(+e.key - 1); else if (k === 'p') setV(s, 'form', 'P'); else if (k === 'i') setV(s, 'form', 'I'); else if (k === 'b') setV(s, 'form', 'R'); else if (k === 'u') setV(s, 'form', 'RI');
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') setV(s, 'n', mod(vp(s, 'n') + (e.key === 'ArrowRight' ? 1 : -1))); else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') setV(s, 'oct', MM.clamp(vp(s, 'oct') + (e.key === 'ArrowUp' ? 1 : -1), -3, 2));
    else if (k === 's') setV(s, 'seg', SEGS[(SEGS.indexOf(vp(s, 'seg')) + 1) % SEGS.length]); else if (k === 'm') setV(s, 'on', !vp(s, 'on')); else if (k === 'k') MMX.setParam('kf', !st.kf); else if (k === 'c') pairComb();
    else if (k === 'n') { MMX.setParam('rowName', 'custom'); setRow(randomRow(), 'Random row'); } else if (k === 'a') { MMX.setParam('rowName', 'custom'); setRow(allIntervalRow(), 'All-interval row: every interval from 1 to 11 once'); } else if (k === 'g') { V.forEach((v) => (v.seed = Math.random() * 1000)); MM.toast('New registers'); } else return; if (s === 0) calcPartners(); },
  setup() { MM.ensure(); MM.fb.mxPiano = piano(); MM.fb.mxReed = reed(); MM.fb.mxPluck = pluck(); MM.fb.mxBell = bell(1); MM.fb.mxGong = bell(0.25); build();
    MMX.init({ state: st, slots: [{ label: 'Voice 1', kind: 'mxPiano', rv: 0, gain: 0.8 }, { label: 'Voice 2', kind: 'mxReed', rv: 0, gain: 0.7 }, { label: 'Voice 3', kind: 'mxPluck', rv: 0, gain: 0.8 }, { label: 'Voice 4', kind: 'mxBell', rv: 0, gain: 0.6 }, { label: 'Aggregate bell', kind: 'mxGong', rv: 0, gain: 0.6 }],
      extra: { get: () => ({ row: ROW.slice() }), set: (x) => { if (x && Array.isArray(x.row) && x.row.length === 12 && new Set(x.row.map(mod)).size === 12) setRow(x.row.map(mod)); } },
      onPreset: () => { if (ROWS[st.rowName]) setRow(ROWS[st.rowName].row); calcPartners(); selVoice(st.sel); apply(); }, factory: fac(),
      keys: [['click a matrix label', 'give the selected voice that form (left P, top I, right R, bottom RI)'], ['click a cell', 'hear that note'], ['click two row notes', 'swap them'], ['1 to 4', 'select voice'], ['P I B U', 'form: prime, inversion, backwards (R), upside-down backwards (RI)'], ['← →', 'transpose the selected voice'], ['↑ ↓', 'octave'], ['S', 'next segmentation (chord size)'], ['M', 'voice on / off'], ['C', 'pair voice 2 combinatorially with voice 1'], ['K', 'Klangfarben'], ['N', 'random row'], ['A', 'all-interval row'], ['G', 'new registers']],
      midiHelp: 'Each MIDI note transposes the selected voice so its form starts on that pitch class, and plays the note. Play a bass line and the row follows it.',
      midi: (n, v, on) => { if (!on) return; const s = st.sel; setV(s, 'n', mod(n)); V[s].pos = 0; if (s === 0) calcPartners(); MMX.fire(s, MM.now + 0.005, { rate: rt(n), gain: 0.3 + v * 0.6, dur: 1, fadeOut: 0.3, dest: N.bus }); } });
    const S1 = MM.$('#s1'), S3 = MM.$('#s3'), S4 = MM.$('#s4');
    MMX.ctl(S1, 'rowName', { type: 'select', label: 'Row', options: [...Object.entries(ROWS).map(([k, r]) => [k, r.name]), ['custom', 'your own row']], on: (v) => ROWS[v] && setRow(ROWS[v].row, ROWS[v].name) });
    MMX.ctl(S1, 'names', { type: 'select', label: 'Show as', options: [['names', 'note names'], ['numbers', 'pitch-class numbers (T=10, E=11)']] });
    MM.$('#vsel').innerHTML = [0, 1, 2, 3].map((k) => `<button>${k + 1}</button>`).join(''); [...MM.$('#vsel').children].forEach((b, k) => (b.onclick = () => selVoice(k)));
    MMX.ctl(S3, 'bpm', { label: 'Tempo', min: 40, max: 180, step: 1, on: (v) => { MM.bpm = v; apply(); } }); MMX.ctl(S3, 'swing', { label: 'Swing', min: 0, max: 0.4, on: (v) => (cfg.swing = v) }); MMX.ctl(S3, 'kf', { type: 'check', label: 'Klangfarben (K)', on: apply });
    MMX.ctl(S4, 'verb', { label: 'Reverb', min: 0, max: 1, on: apply }); MMX.ctl(S4, 'echo', { label: 'Echo', min: 0, max: 0.7, on: apply }); MMX.ctl(S4, 'bell', { label: 'Aggregate bell', min: 0, max: 1 });
    MM.$('#b-pair').onclick = pairComb; MM.$('#b-kf').onclick = () => MMX.setParam('kf', !st.kf); MM.$('#b-new').onclick = () => { MMX.setParam('rowName', 'custom'); setRow(randomRow(), 'Random row'); }; MM.$('#b-ai').onclick = () => { MMX.setParam('rowName', 'custom'); setRow(allIntervalRow(), 'All-interval row'); }; MM.$('#b-reg').onclick = () => { V.forEach((v) => (v.seed = Math.random() * 1000)); MM.toast('New registers'); };
    selVoice(0); calcPartners(); apply(); } };
function fac() { const base = JSON.parse(JSON.stringify(st)), F = (o) => ({ full: { params: Object.assign({}, base, o), extra: null } }); const off = { v1on: false, v2on: false, v3on: false };
  return { 'Op. 25 (default)': {},
    'Berg: triads in the row': F({ rowName: 'berg', bpm: 66, v0form: 'P', v0n: 7, v0seg: 3, v0rate: 8, v0spread: 0, v0oct: -1, v1on: true, v1form: 'P', v1n: 7, v1seg: 1, v1rate: 2, v1oct: 1, v1spread: 0, v1rest: 0, v1end: 'repeat', v2on: true, v2form: 'P', v2n: 7, v2rate: 16, v2seg: 1, v2oct: -2, v3on: false, verb: 0.45 }),
    'Webern Op. 21 Klangfarben': F(Object.assign({}, off, { rowName: 'webern', kf: true, bpm: 72, v0form: 'P', v0n: 9, v0seg: 1, v0rate: 3, v0spread: 3, v0oct: 0, v0rest: 0.25, v0end: 'mirror', verb: 0.4, echo: 0.1 })),
    'Lyric Suite: all intervals': F({ rowName: 'lyric', bpm: 96, v0form: 'P', v0n: 5, v0seg: 1, v0rate: 1, v0spread: 1, v1on: true, v1form: 'I', v1n: 5, v1seg: 4, v1rate: 8, v1oct: -1, v2on: true, v2form: 'R', v2n: 5, v2seg: 1, v2rate: 16, v2oct: -2, v3on: false }),
    'Four voices, all forms': F({ v0end: 'walk', v1on: true, v1end: 'mirror', v2on: true, v2rate: 6, v2end: 'random', v3on: true, v3rate: 3, v3end: 'random', bpm: 92 }),
    'Hexachord chords, slow': F(Object.assign({}, off, { bpm: 50, v0seg: 6, v0rate: 16, v0spread: 2, v0end: 'mirror', v1on: true, v1seg: 1, v1rate: 2, v1rest: 0.5, v1oct: 1, v1end: 'walk', verb: 0.7, echo: 0.3 })) }; }
/* built-in sounds, tuned to C4 */
function mk(len, fn) { const c = MM.ctx, sr = c.sampleRate, B = c.createBuffer(1, (sr * len) | 0, sr), d = B.getChannelData(0); let pk = 0; for (let i = 0; i < d.length; i++) { d[i] = fn(i / sr); pk = Math.max(pk, Math.abs(d[i])); } for (let i = 0; i < d.length; i++) d[i] *= 0.7 / (pk || 1); return B; }
function piano() { const f = MM.mtof(60); return mk(3, (t) => { let s = 0; for (let k = 1; k < 9; k++) s += (Math.sin(2 * Math.PI * f * k * Math.sqrt(1 + 0.0004 * k * k) * t) / (k * k * 0.6 + 0.4)) * Math.exp(-t * (1.2 + k * 0.6)); return s * Math.min(1, t * 400); }); }
function reed() { const f = MM.mtof(60); return mk(2.5, (t) => { let s = 0; for (let k = 1; k < 12; k += 2) s += Math.sin(2 * Math.PI * f * k * t * (1 + 0.003 * Math.sin(t * 2 * Math.PI * 5))) / k; return s * Math.min(1, t * 25) * (t > 2.2 ? Math.max(0, (2.5 - t) / 0.3) : 1); }); }
function pluck() { const c = MM.ctx, sr = c.sampleRate, f = MM.mtof(60), n = Math.round(sr / f), buf = new Float32Array(n).map(() => Math.random() * 2 - 1); let i = 0; return mk(1.6, () => { const a = buf[i % n], b = buf[(i + 1) % n]; buf[i % n] = (a + b) * 0.5 * 0.996; i++; return a; }); }
function bell(br) { const f = MM.mtof(60), parts = [[1, 1], [2.76, 0.5], [5.4, 0.25], [8.93, 0.12], [0.5, 0.4 * (1 - br)]]; return mk(3.5, (t) => parts.reduce((s, [r, a], k) => s + a * Math.sin(2 * Math.PI * f * r * t) * Math.exp(-t * (0.8 + k * 0.9) * (0.6 + br * 0.4)), 0) * Math.min(1, t * 300)); }
MM.init(cfg);
