/*META
{"title":"Long Now Bells","deep":true,"category":"Eno","date":"2026-10-31","kicker":"WHAT WOULD BRIAN ENO DO? · CHANGE RINGING, ONE PERMUTATION A DAY FOR TEN THOUSAND YEARS","bpm":60,
"idea":"In 2003 Brian Eno released January 07003: Bell Studies for the Clock of the Long Now. It was his research into the chimes for the Long Now Foundation's 10,000-year clock, which is meant to ring a different sequence of its ten bells every day. Eno started from English change ringing, where n bells are rung in every possible order without repeating one; ten bells give 10! (3,628,800) orders, roughly the number of days in 10,000 years. He also imagined bells with physical properties no real bell has. This instrument rings real change-ringing methods from place notation (rounds, plain hunt, Plain Bob, or your own notation), with a 'blue line' diagram tracing one bell. It also has a Long Now mode that gives every date its own permutation, so you can hear January 07003 as Eno wanted to. The bells are additive (church, harmonic or enharmonic partials) and a STRETCH control bends them into imaginary metals; your own sample can be the bell.",
"controls":"4 slots (bell sample, hum drone, air, clock tick); method (rounds, plain hunt, Plain Bob, Grandsire-style custom place notation, Long Now day); bells 3 to 10; blow interval; handstroke gap; humanise; scale and key; partial set (church, fixed-ratio harmonic, enharmonic) with stretch, decay and brightness; synth and sample mix; drone and air levels; traced bell; Long Now year, month, day, repeats per day, auto-advance; reverb and delay; blue-line diagram and row list.",
"how":"Press PLAY: eight bells ring Plain Bob Major with the treble (red) and bell 8 (blue) traced through the changes. Change METHOD to LONG NOW to hear one permutation of ten bells per day, starting on 1 January 07003, with N moving to the next day. Turn STRETCH away from 1 to imagine bells that could not be cast. Load a struck sound (a glass, a pan, a Splice bell) into slot 1 and raise SAMPLE MIX. Keys 1 to 9 and 0 ring single bells, M changes the method, G toggles the handstroke gap, B changes the traced bell, and [ and ] make it slower or faster.",
"fonts":"family=Space+Grotesk:wght@300;500;700",
"try":["Tap a wine glass, a radiator, a saucepan lid or a bicycle bell into your phone, trim the hit tightly and load it into slot 1. Set SAMPLE MIX to 1 and SYNTH MIX to 0: your object is now a ring of eight tuned bells, rung in Plain Bob, and no order repeats until the whole extent is done.","Take a long Splice pad or a field recording of wind, load it into slot 2 (the hum drone) and slot 3 (the air), choose LONG NOW, set the interval to 0.5 s and the reverb high. Let it run as Eno's 'ignorable as it is interesting' ambient piece, with N walking through the days of January.","Record your own voice singing one steady 'ahh', load it into slot 1, choose ENHARMONIC partials at a low synth mix and set STRETCH to 1.15. The sample keeps the melody of the changes while the synthetic partials pull each strike into an impossible metal."],
"manifesto":{"name":"January 07003: Bell Studies for the Clock of the Long Now","short":"Eno, Long Now bells","author":"Brian Eno (b. 1948), with the Long Now Foundation (Danny Hillis, Stewart Brand and others)","year":"2003","where":"Album and liner notes, Opal Music, released through the Long Now Foundation",
"ideas":["The Long Now Foundation, set up in 1996, is building a mechanical clock meant to run for 10,000 years. Danny Hillis designed the clock and the algorithm that decides its chimes; Eno, a founding board member, gave the foundation its name.","The clock rings ten bells, and the idea is that it never repeats a day's sequence: 10! = 3,628,800 permutations, close to the 3,652,500 days in 10,000 years.","Eno took the idea from English change ringing. Ringers move each bell by at most one place per row, following 'methods' written in place notation. An 'extent' rings every possible row exactly once and returns to rounds.","He did not stop at real bells. Working with software synthesis, he imagined bells made of materials and in shapes that could not exist, and track titles such as 'Fixed Ratio Harmonic Bells' and 'Emphasizing Enharmonic Partials' name the partial structures he tried.","He wanted to hear a specific moment: the bells of January 07003, about halfway through the clock's life. The five-digit year is Long Now's convention for thinking past the year 9999."],
"quotes":[["Stated briefly, change-ringing is the art (or, to many practitioners, the science) of ringing a given number of bells such that all possible sequences are used without any being repeated.","Brian Eno, liner notes to January 07003 (2003)"],["The ! is not an expression of surprise but the sign for a factorial","Brian Eno, liner notes to January 07003"],["I might therefore imagine bells with quite different physical properties from those we now know","Brian Eno, liner notes to January 07003"],["I wanted to hear the bells of the month of January, 07003 — approximately halfway through the life of the Clock.","Brian Eno, liner notes to January 07003"]],
"system":"Rows are generated from place notation, the ringers' own shorthand. 'x' (or '-') means every pair of bells swaps places, and a group of numbers such as '18' or '12' lists the places that stay put while every other pair swaps. Plain hunt, Plain Bob (on odd or even numbers of bells) and rounds are built in, and CUSTOM accepts any place notation you type, which repeats until rounds come back. Bell 1 (the treble) is the highest, tuned down the chosen scale to the tenor. The blue-line diagram draws the paths of the treble and one traced bell through the rows, the way method diagrams in ringing books do. LONG NOW mode turns each date into a day number counted from 1 January 02003 and maps it to one of the 3,628,800 orders of ten bells using the factorial number system (a Lehmer code). That gives every day a unique sequence for 10,000 years, but it is this tool's own mapping, NOT Danny Hillis's actual chime algorithm, which this does not reproduce. Each strike is either additive synthesis (hum, prime, tierce, quint and nominal for a church bell; whole-number ratios for 'fixed ratio harmonic'; the inharmonic modes of a struck bar for 'enharmonic') with every partial ratio raised to the power STRETCH, or the slot 1 sample re-pitched, or a mix of both. The handstroke gap adds one blow's silence before every other row, as in tower ringing.",
"dubious":"The Long Now day-to-permutation mapping here is invented for this tool and is not Hillis's algorithm."},
"design":{"name":"8vo","short":"8vo","who":"8vo (Octavo), the London design group founded in the mid-1980s by Simon Johnston, Mark Holt and Hamish Muir","era":"1985 to 2001",
"hallmarks":["Rigorous modular grids taken from Swiss typography, then layered and overprinted so the structure shows through.","Numerals, rules and small grotesque type used as image; information treated as a visual system (here the blue-line ringing diagram).","A restrained palette (off-white, black, one or two strong colours) with transparent overlapping planes and huge numbers set against tiny captions."],
"works":["Octavo, International Journal of Typography (eight issues, 1986 to 1992), designed and published by 8vo","Record sleeves and posters for Factory Records in Manchester, notably for The Durutti Column","Hamish Muir and Mark Holt, 'Octavo 86–92' (Unit Editions, 2017), the book about the journal"]}}
*/
/*CSS
:root{--bg:#ecebe5;--fg:#121212;--acc:#2440ff;--bar-bg:#121212;--bar-fg:#ecebe5;--bar-font:'Space Grotesk',system-ui,sans-serif;--learn-font:'Space Grotesk',sans-serif;--learn-bg:#ecebe5;--deck-bg:#ecebe5}
#mm-stage{display:grid;grid-template-columns:minmax(0,1fr) 300px}
#plate{position:relative;overflow:hidden;background:linear-gradient(90deg,rgba(18,18,18,.06) 1px,transparent 1px) 0 0/calc(100%/12) 100%}
#cv{position:absolute;inset:0;width:100%;height:100%}
#hd{position:absolute;left:24px;top:18px;pointer-events:none;font:300 11px/1.3 'Space Grotesk';letter-spacing:.12em;text-transform:uppercase}#hd b{display:block;font:700 34px/0.9 'Space Grotesk';letter-spacing:-.01em;text-transform:none;margin-bottom:6px}
#side{overflow:auto;padding:12px 14px;border-left:2px solid #121212;font:400 12px 'Space Grotesk'}
#side h3{font:700 11px 'Space Grotesk';letter-spacing:.14em;text-transform:uppercase;margin:12px 0 4px;display:flex;gap:6px;align-items:center}#side h3:before{content:'';width:10px;height:10px;background:#2440ff}
#side .mmx-ctl{grid-template-columns:96px 1fr 44px;font:400 11px 'Space Grotesk'}#side .mmx-ctl select,#side .mmx-ctl input[type=text]{grid-column:2/4;min-width:0;font:400 11px 'Space Grotesk'}
#side .bt{display:flex;gap:4px;flex-wrap:wrap}#side .bt button{font:700 10px 'Space Grotesk';letter-spacing:.08em;border:0;background:#121212;color:#ecebe5;padding:5px 8px;cursor:pointer}#side .bt button:hover{background:#2440ff}
#date{font:700 22px 'Space Grotesk';letter-spacing:.02em;margin:4px 0}#date small{display:block;font:300 10px 'Space Grotesk';letter-spacing:.12em;text-transform:uppercase}
#mm-learn-dlg{box-shadow:10px 10px 0 #ff3b1f;border:2px solid #121212}#mm-learn-dlg h2{font:700 30px/1 'Space Grotesk';letter-spacing:-.01em}
*/
/*HTML
<div id="plate"><canvas id="cv"></canvas><div id="hd"><b>Long Now Bells</b>Change ringing · after Brian Eno, January 07003 · 73</div></div>
<div id="side"><div id="date"></div><div class="bt"><button id="b-m">M · METHOD</button><button id="b-n">N · NEXT DAY</button><button id="b-g">G · GAP</button><button id="b-b">B · TRACE</button></div><h3>Method</h3><div id="c1"></div><h3>Long Now</h3><div id="c2"></div><h3>Bell metal</h3><div id="c3"></div><h3>Air</h3><div id="c4"></div></div>
*/
const st = MMX.bind({ method: 'bob', bells: 8, interval: 0.24, gap: true, human: 0.08, scale: 'major', root: 2, partials: 'church', stretch: 1, decay: 3.2, bright: 0.6, synth: 0.7, smix: 0.45, drone: 0.25, air: 0.2, trace: 8, custom: 'x18x18x18x18x18x18x18x12', year: 7003, month: 1, day: 1, reps: 4, adv: true, rev: 0.45, dly: 0.12 });
const NOTE = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'], PCH = '1234567890ET';
const METHODS = [['rounds', 'Rounds'], ['hunt', 'Plain Hunt'], ['bob', 'Plain Bob'], ['custom', 'Custom place notation'], ['longnow', 'LONG NOW (a permutation a day)']];
const PARTS = { church: [[0.5, 0.7, 1.6], [1, 0.6, 1], [1.2, 0.5, 0.8], [1.5, 0.3, 0.6], [2, 0.8, 0.7], [2.5, 0.25, 0.4], [3, 0.2, 0.35], [4, 0.12, 0.25]], harmonic: [[1, 0.8, 1], [2, 0.5, 0.8], [3, 0.4, 0.6], [4, 0.3, 0.5], [5, 0.2, 0.4], [6, 0.15, 0.3]], enharmonic: [[1, 0.8, 1], [2.756, 0.5, 0.7], [5.404, 0.35, 0.5], [8.933, 0.22, 0.35], [13.344, 0.12, 0.25]] };
let rows = [], cur = null, seq = [], seqI = 0, rowN = 0, blowI = 0, nextT = 0, rowStart = 0, hits = [], cv, dayRep = 0, N = {}, droneH = null, airH = null;
const n = () => (st.method === 'longnow' ? 10 : MM.clamp(st.bells | 0, 3, 10));
const rounds = (k) => Array.from({ length: k }, (_, i) => i + 1);
/* place notation: 'x' or '-' = all pairs swap; digits = places that stay */
function parsePN(s, k) { const out = []; s.toUpperCase().replace(/-/g, 'X').split(/(X)|\./).filter((t) => t && t.trim()).forEach((t) => { if (t === 'X') out.push([]); else out.push([...t].map((c) => PCH.indexOf(c) + 1).filter((p) => p > 0 && p <= k)); }); return out; }
function apply(row, places) { const r = row.slice(); let i = 0; while (i < r.length) { if (places.includes(i + 1)) { i++; continue; } if (i + 1 < r.length) { [r[i], r[i + 1]] = [r[i + 1], r[i]]; i += 2; } else i++; } return r; }
function methodPN(k) { const nC = PCH[k - 1];
  if (st.method === 'hunt') return k % 2 ? nC + '.1' : 'x1' + nC;
  if (st.method === 'bob') { if (k % 2 === 0) { let s = ''; for (let i = 0; i < k - 1; i++) s += 'x1' + nC; return s + 'x12'; } let s = ''; for (let i = 0; i < k; i++) s += (i ? '.' : '') + nC + '.' + (i === k - 1 ? '12' + nC : '1'); return s; }
  if (st.method === 'custom') return st.custom; return ''; }
/* Long Now: day number -> permutation of ten bells via the factorial number system (this tool's own mapping, not Hillis's algorithm) */
const FACT = [1]; for (let i = 1; i <= 12; i++) FACT[i] = FACT[i - 1] * i;
function dayNum() { return Math.round((Date.UTC(st.year, st.month - 1, st.day) - Date.UTC(2003, 0, 1)) / 864e5); }
function lehmer(idx, k) { idx = ((idx % FACT[k]) + FACT[k]) % FACT[k]; const pool = rounds(k), out = []; for (let i = k - 1; i >= 0; i--) { const q = Math.floor(idx / FACT[i]); idx %= FACT[i]; out.push(pool.splice(q, 1)[0]); } return out; }
function resetRows() { const k = n(); cur = rounds(k); seq = parsePN(methodPN(k), k); seqI = 0; rowN = 0; rows = [cur.slice()]; dayRep = 0; if (st.method === 'longnow') { cur = lehmer(dayNum(), 10); rows = [cur.slice()]; } showDate(); }
function nextRow() { const k = n(); rowN++;
  if (st.method === 'longnow') { dayRep++; if (dayRep >= st.reps) { dayRep = 0; if (st.adv) nextDay(true); cur = lehmer(dayNum(), 10); } }
  else if (st.method === 'rounds' || !seq.length) cur = rounds(k);
  else { cur = apply(cur, seq[seqI % seq.length]); seqI++; }
  rows.push(cur.slice()); if (rows.length > 64) rows.shift(); }
function nextDay(quiet) { const d = new Date(Date.UTC(st.year, st.month - 1, st.day + 1)); MMX.setParam('year', d.getUTCFullYear()); MMX.setParam('month', d.getUTCMonth() + 1); MMX.setParam('day', d.getUTCDate()); if (!quiet) { dayRep = 0; if (st.method === 'longnow') { cur = lehmer(dayNum(), 10); rows.push(cur.slice()); } } showDate(); }
function showDate() { const el = MM.$('#date'); if (!el) return; const y = String(st.year).padStart(5, '0'), dn = dayNum(), p = lehmer(dn, 10).map((b) => PCH[b - 1]).join('');
  el.innerHTML = `${y}-${String(st.month).padStart(2, '0')}-${String(st.day).padStart(2, '0')}<small>day ${dn.toLocaleString('en-GB')} · today's ten-bell row ${p}${st.method === 'longnow' ? '' : ' (heard in LONG NOW mode)'}</small>`; }
/* tuning: treble (1) highest, down the scale to the tenor */
function bellMidi(b) { const k = n(), S = MM.SCALES[st.scale] || MM.SCALES.major, d = k - b, base = 48 + st.root; return base + S[d % S.length] + 12 * Math.floor(d / S.length); }
function strike(b, t, vel = 1) { const m = bellMidi(b), f = MM.mtof(m), P = PARTS[st.partials] || PARTS.church, pan = (((b - 1) / Math.max(1, n() - 1)) - 0.5) * 1.2, dec = st.decay * Math.pow(0.93, 10 - Math.min(10, m - 40) / 4);
  if (!isFinite(m) || !isFinite(dec) || !isFinite(t) || !isFinite(st.stretch) || !isFinite(vel)) return;
  if (st.synth > 0.01) P.forEach(([r, a, dm], k) => { const rr = Math.pow(r, st.stretch), fq = f * rr; if (fq > 16000) return; const amp = a * vel * st.synth * 0.09 * (k > 2 ? 0.4 + st.bright : 1);
    MM.tone(fq, t, 0.004, { type: 'sine', gain: amp, attack: 0.002, release: dec * dm / Math.sqrt(Math.max(0.5, rr)), pan, send: { rev: st.rev, dly: st.dly * 0.4 }, dest: N.bells }); });
  if (st.smix > 0.01 && !MMX.S.slots[0].mute) MMX.fire(0, t, { semis: m - 60, gain: vel * st.smix, pan, rev: st.rev, dly: st.dly * 0.4, dest: N.bells, maxDur: dec * 1.5 });
  hits.push({ b, t }); if (hits.length > 80) hits.shift(); }
function tick(now) { if (!cur) resetRows(); if (nextT < now - 0.3) nextT = now + 0.05;
  while (nextT < now + 0.15) { const k = cur.length; if (blowI === 0) { rowStart = nextT; if (rowN % 2 === 0 && !MMX.S.slots[3].mute) MMX.fire(3, nextT, { gain: 0.35, dest: N.bells }); }
    const b = cur[blowI], jit = (Math.random() - 0.5) * st.human * st.interval; strike(b, nextT + jit, 0.75 + 0.25 * Math.random());
    blowI++; nextT += st.interval;
    if (blowI >= k) { blowI = 0; if (st.gap && rowN % 2 === 1) nextT += st.interval; nextRow(); } } }
function beds() { stopBeds(); const t = MM.now + 0.05, tenor = bellMidi(n());
  if (!MMX.S.slots[1].mute) droneH = MMX.fire(1, t, { loop: true, dur: 36000, semis: tenor - 12 - 60, gain: 1, dest: N.drone, fadeIn: 3, rev: 0.6 });
  if (!MMX.S.slots[2].mute) airH = MMX.fire(2, t, { loop: true, dur: 36000, gain: 1, dest: N.air, fadeIn: 2, rev: 0.3 }); levels(); }
function stopBeds() { droneH && droneH.stop(); airH && airH.stop(); droneH = airH = null; }
function levels() { if (!N.drone) return; N.drone.gain.setTargetAtTime(st.drone, MM.now, 0.3); N.air.gain.setTargetAtTime(st.air, MM.now, 0.3); }
/* ---------- drawing (8vo: grid, numerals, the blue line) ---------- */
function draw() { cv.fit(); const g = cv.g, W = cv.w, H = cv.h, now = MM.now, k = cur ? cur.length : n(); g.clearRect(0, 0, W, H);
  g.save(); g.globalAlpha = 0.09; g.fillStyle = '#2440ff'; g.font = `700 ${Math.floor(H * 0.42)}px 'Space Grotesk'`; g.fillText(st.method === 'longnow' ? String(st.year).padStart(5, '0') : k + '!', W * 0.04, H * 0.92); g.restore();
  g.fillStyle = '#ff3b1f'; g.globalAlpha = 0.85; g.fillRect(W * 0.58, 0, 4, H); g.globalAlpha = 1;
  // row list with blue line
  const left = 24, top = 128, colW = Math.min(30, (W * 0.5 - left) / k), rowH = 17, vis = Math.floor((H - top - 30) / rowH), R = rows.slice(-vis), played = MM.playing;
  const pathFor = (bell) => R.map((r, i) => [left + r.indexOf(bell) * colW + colW / 2, top + i * rowH]);
  [[1, '#ff3b1f', 2], [MM.clamp(st.trace, 1, k), '#2440ff', 3.5]].forEach(([bell, c, lw]) => { if (bell > k) return; g.strokeStyle = c; g.lineWidth = lw; g.beginPath(); pathFor(bell).forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.stroke(); });
  g.font = "500 13px 'Space Grotesk'"; g.textAlign = 'center';
  R.forEach((r, i) => { const last = i === R.length - 1; r.forEach((b, j) => { const x = left + j * colW + colW / 2, y = top + i * rowH, lit = last && played && j === (blowI + k - 1) % k; if (lit) { g.fillStyle = '#121212'; g.fillRect(x - colW / 2 + 1, y - 12, colW - 2, 16); } g.fillStyle = lit ? '#ecebe5' : b === 1 ? '#ff3b1f' : b === st.trace ? '#2440ff' : '#121212'; g.fillText(PCH[b - 1], x, y); }); });
  g.textAlign = 'left'; g.font = "300 10px 'Space Grotesk'"; g.fillStyle = '#121212';
  g.fillText(`${METHODS.find((m) => m[0] === st.method)[1].toUpperCase()} · ${k} BELLS · ROW ${rowN + 1}${st.method !== 'longnow' && st.method !== 'rounds' ? ' · NOTATION ' + methodPN(k).slice(0, 34) : ''}`, left, top - 24);
  g.fillText(`${k}! = ${FACT[k].toLocaleString('en-GB')} ROWS IN THE EXTENT · AT THIS SPEED ${fmtDur(FACT[k] * k * st.interval * (st.gap ? 1 + 0.5 / k : 1))}`, left, top - 11);
  // the ring: bells as circles on the right, flashing when struck
  const cx = W * 0.79, cy = H * 0.5, rad = Math.min(W * 0.17, H * 0.33);
  for (let b = 1; b <= k; b++) { const a = -Math.PI / 2 + ((b - 1) / k) * Math.PI * 2, x = cx + Math.cos(a) * rad, y = cy + Math.sin(a) * rad, h = hits.filter((q) => q.b === b && q.t <= now).pop(), age = h ? now - h.t : 9, s = 10 + 18 * Math.max(0, 1 - age / 1.2);
    g.beginPath(); g.arc(x, y, s, 0, 7); g.fillStyle = b === 1 ? '#ff3b1f' : b === st.trace ? '#2440ff' : age < 1.2 ? '#121212' : 'rgba(18,18,18,.15)'; g.fill();
    g.fillStyle = age < 1.2 || b === 1 || b === st.trace ? '#ecebe5' : '#121212'; g.font = "700 12px 'Space Grotesk'"; g.textAlign = 'center'; g.fillText(PCH[b - 1], x, y + 4);
    g.fillStyle = '#121212'; g.font = "300 9px 'Space Grotesk'"; g.fillText(NOTE[bellMidi(b) % 12], x + Math.cos(a) * 34, y + Math.sin(a) * 34 + 3); g.textAlign = 'left'; }
  g.font = "300 10px 'Space Grotesk'"; g.fillStyle = '#121212'; g.fillText(`PARTIALS · ${st.partials.toUpperCase()} · STRETCH ${st.stretch.toFixed(3)}`, cx - rad, cy + rad + 50);
  const P = PARTS[st.partials] || PARTS.church; P.forEach(([r, a], i) => { const x = cx - rad + (Math.log2(Math.pow(r, st.stretch) * 2) / 4.5) * rad * 2; g.fillStyle = '#2440ff'; g.fillRect(x, cy + rad + 40 - a * 30, 3, a * 30); }); }
function fmtDur(s) { const y = s / 31557600; return y >= 1 ? Math.round(y).toLocaleString('en-GB') + ' YEARS' : s >= 86400 ? (s / 86400).toFixed(1) + ' DAYS' : s >= 3600 ? (s / 3600).toFixed(1) + ' HOURS' : Math.round(s / 60) + ' MIN'; }
/* ---------- built-in sounds ---------- */
function mk(len, ch, fn) { const c = MM.ctx, sr = c.sampleRate, B = c.createBuffer(ch, (sr * len) | 0, sr); let pk = 0; for (let q = 0; q < ch; q++) { const d = B.getChannelData(q); for (let i = 0; i < d.length; i++) { d[i] = fn(i / sr, q); pk = Math.max(pk, Math.abs(d[i])); } } for (let q = 0; q < ch; q++) { const d = B.getChannelData(q); for (let i = 0; i < d.length; i++) d[i] *= 0.8 / (pk || 1); } return B; }
const TAU = Math.PI * 2;
function bellBuf() { const f = 261.63, P = [[0.5, 0.5, 1.4], [1, 0.6, 1], [1.19, 0.45, 0.8], [1.5, 0.3, 0.6], [2, 0.7, 0.7], [2.52, 0.2, 0.4], [3.01, 0.15, 0.3], [4.1, 0.1, 0.2]]; return mk(3, 1, (t) => P.reduce((s, [r, a, d]) => s + a * Math.sin(TAU * f * r * t) * Math.exp(-t / (1.2 * d)), 0) * Math.min(1, t * 900) + (t < 0.01 ? (Math.random() - 0.5) * (1 - t * 100) * 0.6 : 0)); }
function humBuf() { return mk(6, 2, (t, q) => [1, 2, 3, 4.02].reduce((s, r, i) => s + Math.sin(TAU * 261.63 * r * t + q * i) * (0.5 / (i + 1)) * (0.8 + 0.2 * Math.sin(TAU * t / 3 + i)), 0)); }
function airBuf() { const lp = [0, 0], lp2 = [0, 0]; return mk(7, 2, (t, q) => { lp[q] += ((Math.random() * 2 - 1) - lp[q]) * 0.04; lp2[q] += (lp[q] - lp2[q]) * 0.05; return (lp[q] - lp2[q]) * (0.6 + 0.4 * Math.sin(TAU * t / 7 + q)); }); }
function tickBuf() { return mk(0.08, 1, (t) => (Math.random() - 0.5) * Math.exp(-t * 120) + Math.sin(TAU * 2400 * t) * Math.exp(-t * 80) * 0.5); }
/* ---------- setup ---------- */
const cfg = { bpm: 60, draw, tick, start: () => { resetRows(); blowI = 0; nextT = MM.now + 0.06; beds(); }, stop: stopBeds, onSamples: (list) => MMX.assign(list),
  key: (e) => { if (MMX.key(e)) return; const k = e.key.toLowerCase();
    if (/^[0-9]$/.test(k)) { const b = k === '0' ? 10 : +k; if (b <= n()) { MM.ensure(); strike(b, MM.now + 0.01); } }
    else if (k === 'm') cycleMethod(); else if (k === 'n') nextDay(); else if (k === 'g') MMX.setParam('gap', !st.gap); else if (k === 'b') MMX.setParam('trace', (st.trace % n()) + 1);
    else if (k === '[') MMX.setParam('interval', Math.min(1, st.interval * 1.15)); else if (k === ']') MMX.setParam('interval', Math.max(0.06, st.interval / 1.15)); },
  setup() { MM.ensure(); const c = MM.ctx; cv = MM.canvas('#cv'); ['bells', 'drone', 'air'].forEach((k) => { N[k] = c.createGain(); N[k].connect(MM.out); }); N.bells.gain.value = 0.9;
    MM.fb.bell = bellBuf(); MM.fb.hum = humBuf(); MM.fb.air = airBuf(); MM.fb.tick = tickBuf();
    MMX.init({ state: st, slots: [{ label: 'Bell (struck sound, C4)', kind: 'bell', rv: 0 }, { label: 'Hum drone (C4)', kind: 'hum', rv: 0 }, { label: 'Air / room', kind: 'air', rv: 0 }, { label: 'Clock tick', kind: 'tick', rv: 0, gain: 0.6 }],
      onSlot: (i) => { if (i === 0 && st.smix < 0.5) MMX.setParam('smix', 0.8); if ((i === 1 || i === 2) && MM.playing) beds(); },
      onPreset: () => { resetRows(); levels(); }, factory: fac(),
      keys: [['1 to 9, 0', 'ring one bell'], ['M', 'next method'], ['N', 'next day (Long Now)'], ['G', 'handstroke gap'], ['B', 'trace the next bell'], ['[ ]', 'slower / faster']],
      midiHelp: 'Notes ring bells: the white keys from middle C upwards are bells 10 down to 1 (C4 = tenor), so you can ring your own changes over the method. Velocity sets the strike.',
      midi: (nn, v, on) => { if (!on) return; const k = n(), b = MM.clamp(k - (((nn - 60) % k) + k) % k, 1, k); strike(b, MM.now + 0.005, 0.4 + v); } });
    const C1 = MM.$('#c1'), C2 = MM.$('#c2'), C3 = MM.$('#c3'), C4 = MM.$('#c4');
    MMX.ctl(C1, 'method', { type: 'select', label: 'Method (M)', options: METHODS, on: resetRows }); MMX.ctl(C1, 'bells', { label: 'Bells', min: 3, max: 10, step: 1, on: resetRows });
    MMX.ctl(C1, 'custom', { type: 'text', label: 'Custom PN', on: () => st.method === 'custom' && resetRows() });
    MMX.ctl(C1, 'interval', { label: 'Blow interval', min: 0.06, max: 1, step: 0.01, fmt: (v) => v.toFixed(2) + 's' }); MMX.ctl(C1, 'gap', { type: 'check', label: 'Handstroke gap' }); MMX.ctl(C1, 'human', { label: 'Humanise', min: 0, max: 0.5 });
    MMX.ctl(C1, 'trace', { label: 'Trace bell (B)', min: 1, max: 10, step: 1 });
    MMX.ctl(C2, 'year', { label: 'Year', min: 2003, max: 12002, step: 1, on: () => { dayRep = 0; showDate(); } }); MMX.ctl(C2, 'month', { label: 'Month', min: 1, max: 12, step: 1, on: showDate }); MMX.ctl(C2, 'day', { label: 'Day', min: 1, max: 31, step: 1, on: showDate });
    MMX.ctl(C2, 'reps', { label: 'Rows per day', min: 1, max: 16, step: 1 }); MMX.ctl(C2, 'adv', { type: 'check', label: 'Auto-advance' });
    MMX.ctl(C3, 'scale', { type: 'select', label: 'Scale', options: ['major', 'minor', 'penta', 'minpent', 'dorian', 'lydian', 'whole', 'hira'].map((x) => [x, x]) }); MMX.ctl(C3, 'root', { type: 'select', label: 'Tenor key', options: NOTE.map((x, k) => [k, x]) });
    MMX.ctl(C3, 'partials', { type: 'select', label: 'Partials', options: [['church', 'church bell (hum, prime, tierce, quint, nominal)'], ['harmonic', 'fixed ratio harmonic'], ['enharmonic', 'enharmonic (struck bar)']] });
    MMX.ctl(C3, 'stretch', { label: 'Stretch (imagined)', min: 0.8, max: 1.25, step: 0.005 }); MMX.ctl(C3, 'decay', { label: 'Decay', min: 0.4, max: 10, step: 0.1 }); MMX.ctl(C3, 'bright', { label: 'Brightness', min: 0, max: 1 });
    MMX.ctl(C3, 'synth', { label: 'Synth mix', min: 0, max: 1 }); MMX.ctl(C3, 'smix', { label: 'Sample mix', min: 0, max: 1.2 });
    MMX.ctl(C4, 'drone', { label: 'Hum drone', min: 0, max: 1, on: levels }); MMX.ctl(C4, 'air', { label: 'Air', min: 0, max: 1, on: levels }); MMX.ctl(C4, 'rev', { label: 'Reverb', min: 0, max: 1 }); MMX.ctl(C4, 'dly', { label: 'Delay', min: 0, max: 1, on: () => MM.setDelay(st.interval * 3) });
    MM.$('#b-m').onclick = cycleMethod; MM.$('#b-n').onclick = () => nextDay(); MM.$('#b-g').onclick = () => MMX.setParam('gap', !st.gap); MM.$('#b-b').onclick = () => MMX.setParam('trace', (st.trace % n()) + 1);
    MM.setDelay(st.interval * 3); resetRows(); } };
function cycleMethod() { const i = METHODS.findIndex((m) => m[0] === st.method); MMX.setParam('method', METHODS[(i + 1) % METHODS.length][0]); resetRows(); MM.toast(METHODS.find((m) => m[0] === st.method)[1]); }
function fac() { const base = JSON.parse(JSON.stringify(st)), F = (o) => ({ full: { params: Object.assign({}, base, o) } });
  return { 'Plain Bob Major (default)': {}, 'January 07003': F({ method: 'longnow', year: 7003, month: 1, day: 1, reps: 3, interval: 0.3, partials: 'harmonic', drone: 0.35, rev: 0.6 }), 'Emphasising enharmonic partials': F({ partials: 'enharmonic', stretch: 1.08, method: 'hunt', bells: 7, interval: 0.32, synth: 0.9, smix: 0.15, decay: 5 }),
    'Ignorable, slow': F({ method: 'longnow', interval: 0.7, human: 0.25, decay: 8, rev: 0.8, drone: 0.4, air: 0.35, smix: 0.2, scale: 'penta' }), 'Grandsire Doubles (PN)': F({ method: 'custom', bells: 5, custom: '3.1.5.1.5.1.5.1.5.1', interval: 0.22 }) }; }
MM.init(cfg);
