/*META
{"title":"Gradus","deep":true,"category":"music theory","date":"2026-10-31","kicker":"MUSIC THEORY · SPECIES COUNTERPOINT AFTER FUX, GRADUS AD PARNASSUM (1725)","bpm":84,
"idea":"For two centuries composers learned to write music from Johann Joseph Fux's Gradus ad Parnassum (1725). It teaches counterpoint in five 'species', each adding one new freedom: note against note, two against one, four against one, then tied syncopations, then florid writing. Every step has rules about consonance, motion and cadence. This instrument writes a fresh counterpoint to a cantus firmus (Fux's own D dorian tune, or a generated one) in species 1 to 4, above or below, in any of the six modes, and plays it with your sounds. You can also click to change any note and a rule checker tells you, live, which of Fux's rules you just broke and why. Each time round it can write a new line, move to the next mode or swap voices.",
"controls":"3 slots (cantus firmus voice, counterpoint voice, cadence bell); species 1 to 4; counterpoint above or below; mode (dorian, phrygian, lydian, mixolydian, aeolian, ionian); cantus: Fux's D dorian, or generate with a length; strictness (strict or relaxed); on each loop: repeat, new counterpoint, next mode, swap voices; tempo; transpose; articulation; humanise; reverb and delay; click-to-edit notes with live rule checking; interval figures.",
"how":"Press PLAY: Fux's cantus firmus (D F E D G F A G F E D) is played with a first-species counterpoint above it, and a new counterpoint is written on every pass. Keys 1 to 4 choose the species, V puts the counterpoint above or below, M moves to the next mode, G writes a new counterpoint now, C generates a new cantus firmus and F brings back Fux's. Click anywhere on the grid to move a counterpoint note (shift-click moves a cantus note); broken rules show in red with an explanation.",
"fonts":"family=Hanken+Grotesk:wght@200;400;800",
"try":["Load a sustained sound (a Splice vocal 'ooh', a cello note, a harmonium) into slot 1 for the cantus firmus and a short plucked sample (kalimba, harp, muted guitar) into slot 2 for the counterpoint. Set the slot pitch so each sample's own note reads as C, and the rules turn your two sounds into a two-part motet.","Choose species 3 (four against one), set the tempo to 140 and ON LOOP to NEXT MODE. Record a few minutes as a WAV and chop it in your DAW: you get a library of strictly voice-led melodic phrases in six modes over the same tune, all from your own sample.","Break the rules on purpose: click notes to make parallel fifths or a leap of a seventh, and listen to what each 'error' does. Keep the ones you like and save the line as a preset. Eno's Oblique Strategies says to honour your error as a hidden intention; Fux would not agree, but your sampler won't mind."],
"manifesto":{"name":"Gradus ad Parnassum: the five species of counterpoint","short":"Fux, species counterpoint","author":"Johann Joseph Fux (c. 1660 to 1741), court composer in Vienna","year":"1725","where":"Gradus ad Parnassum, Vienna, 1725, written in Latin. The counterpoint chapters were translated by Alfred Mann as The Study of Counterpoint (1943, revised 1965)",
"ideas":["The book is a dialogue between a pupil, Josephus, and a master, Aloysius, who stands for Palestrina, the sixteenth-century composer Fux held up as the model of pure part-writing.","Counterpoint is learned in five species. The first is note against note; the second two notes against one; the third four against one; the fourth tied notes across the beat (syncopation), where dissonant suspensions resolve downwards by step; the fifth, 'florid' counterpoint, mixes them all.","Consonances are perfect (unison, fifth, octave) or imperfect (thirds, sixths); seconds, fourths, sevenths and the tritone are dissonant. In the first species every note must be consonant; later species allow dissonance only on weak beats as passing notes, or as prepared suspensions.","Four rules of motion follow. One perfect consonance may only follow another by contrary or oblique motion (never similar motion), and the same goes for imperfect to perfect. Perfect to imperfect, and imperfect to imperfect, may use any motion. Beginning and end must be perfect consonances, and the note before the end is the leading note.","Haydn taught himself from the Gradus, and Mozart and Beethoven used it in study and teaching. It is still the basis of counterpoint courses today."],
"quotes":[["From one perfect consonance to another perfect consonance one must proceed in contrary or oblique motion.","Fux, Gradus ad Parnassum (1725), the first rule of motion, in Alfred Mann's translation, The Study of Counterpoint"]],
"system":"The cantus firmus (CF) is one whole note per bar. The counterpoint (CP) is written by a randomised depth-first search, which tries notes (mostly steps, sometimes leaps) and backs up whenever a rule fails, so every pass gives a different correct line. The rules checked are: consonance on strong beats; perfect consonances at the start (unison, fifth or octave above; unison or octave below) and the end; the leading note before the end (raised in dorian, mixolydian and aeolian, as Fux raises it); no parallel fifths or octaves between successive downbeats; no similar motion into a perfect consonance (Fux's first and third rules of motion); no unisons except at the ends; no tritone, seventh or major-sixth leaps, and minor sixths only upwards; no voice crossing; no more than three parallel thirds or sixths in a row; leaps turned back by step; no repeated notes except tied ones. Species 2 and 3 allow weak-beat dissonance only as a step-in, step-out passing note (or a neighbour note in species 3). Species 4 ties each upbeat over the barline. A dissonant downbeat must be a 7–6 or 4–3 suspension above, or 2–3 below, resolving down by step. RELAXED drops the softer melodic rules when strict ones cannot be met. The checker uses the same rules on your edited notes. Fifth species, cambiata figures and Fux's three- and four-voice chapters are not modelled.",
"dubious":"The rules are paraphrased from Fux, via Mann's translation and standard teaching summaries; the one quotation is Mann's wording."},
"design":{"name":"Emil Ruder","short":"Emil Ruder","who":"Emil Ruder (1914 to 1970), Swiss typographer and teacher at the Allgemeine Gewerbeschule in Basel","era":"1940s to 1970",
"hallmarks":["Typography built on contrast: light against heavy, large against small, black against white, horizontal against vertical (here the hairline cantus against the heavy counterpoint).","Asymmetric layouts on a clear grid where empty space is an active part of the composition, and rhythm comes from repetition and interval.","A single grotesque family (he championed Univers) used in many weights, with red as the only colour."],
"works":["Typographie: A Manual of Design (1967), his textbook","His covers and articles for Typographische Monatsblätter (TM), the Swiss typography journal","Posters for the Basel Gewerbemuseum"]}}
*/
/*CSS
:root{--bg:#f6f5f0;--fg:#0e0e0e;--acc:#e3001b;--bar-bg:#0e0e0e;--bar-fg:#f6f5f0;--bar-font:'Hanken Grotesk',system-ui,sans-serif;--learn-font:'Hanken Grotesk',sans-serif;--learn-bg:#f6f5f0;--deck-bg:#f6f5f0}
#mm-stage{display:grid;grid-template-columns:minmax(0,1fr) 290px}
#score{position:relative;overflow:hidden}#cv{position:absolute;inset:0;width:100%;height:100%;cursor:crosshair}
#ttl{position:absolute;left:28px;top:16px;pointer-events:none;line-height:.85}#ttl b{font:800 56px 'Hanken Grotesk';letter-spacing:-.03em}#ttl i{font:200 56px 'Hanken Grotesk';font-style:normal;letter-spacing:-.03em}#ttl small{display:block;font:400 11px 'Hanken Grotesk';letter-spacing:.14em;text-transform:uppercase;margin-top:8px}
#side{overflow:auto;padding:12px 14px;border-left:1px solid #0e0e0e;font:400 12px 'Hanken Grotesk'}
#side h3{font:800 11px 'Hanken Grotesk';letter-spacing:.14em;text-transform:uppercase;margin:14px 0 4px}#side h3 span{font-weight:200;color:#e3001b}
#side .mmx-ctl{grid-template-columns:92px 1fr 40px;font:400 11px 'Hanken Grotesk'}#side .mmx-ctl select{grid-column:2/4;min-width:0;font:400 11px 'Hanken Grotesk'}
#sp{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin:4px 0}#sp button{font:200 26px 'Hanken Grotesk';border:1px solid #0e0e0e;margin-left:-1px;background:none;padding:2px 0;cursor:pointer}#sp button.on{font-weight:800;background:#0e0e0e;color:#f6f5f0}
#side .bt{display:flex;gap:4px;flex-wrap:wrap}#side .bt button{font:800 10px 'Hanken Grotesk';letter-spacing:.08em;border:1px solid #0e0e0e;background:none;padding:4px 7px;cursor:pointer}#side .bt button:hover{background:#e3001b;color:#fff;border-color:#e3001b}
#viol{font:400 11px/1.4 'Hanken Grotesk';margin-top:6px}#viol div{border-left:3px solid #e3001b;padding-left:6px;margin:3px 0}#viol .ok{border-color:#0e0e0e}
#mm-learn-dlg{box-shadow:none;border:1px solid #0e0e0e;border-left:16px solid #e3001b}#mm-learn-dlg h2{font:800 30px/1 'Hanken Grotesk';letter-spacing:-.02em}
*/
/*HTML
<div id="score"><canvas id="cv"></canvas><div id="ttl"><b>Gra</b><i>dus</i><small>Species counterpoint after J. J. Fux · 74</small></div></div>
<div id="side"><h3>Species <span id="spn"></span></h3><div id="sp"><button data-s="1">1</button><button data-s="2">2</button><button data-s="3">3</button><button data-s="4">4</button></div>
<div class="bt"><button id="b-g">G · NEW LINE</button><button id="b-c">C · NEW CANTUS</button><button id="b-f">F · FUX</button><button id="b-v">V · ABOVE/BELOW</button><button id="b-m">M · MODE</button></div>
<h3>Rules <span id="vn"></span></h3><div id="viol"></div><h3>Setting</h3><div id="c1"></div><h3>Performance</h3><div id="c2"></div></div>
*/
const st = MMX.bind({ species: 1, above: true, mode: 'dorian', cfLen: 11, strict: true, onLoop: 'new', bpm: 84, trans: 0, artic: 0.92, human: 0.05, rev: 0.35, dly: 0.08, cfLvl: 0.6, cpLvl: 0.8 });
const WH = [0, 2, 4, 5, 7, 9, 11], NN = ['C', 'D', 'E', 'F', 'G', 'A', 'B'], MODES = { dorian: 1, phrygian: 2, lydian: 3, mixolydian: 4, aeolian: 5, ionian: 0 }, MLIST = Object.keys(MODES);
const FUX = [1, 3, 2, 1, 4, 3, 5, 4, 3, 2, 1]; /* D F E D G F A G F E D */
const CONS = [0, 3, 4, 7, 8, 9];
let CF = FUX.slice(), cp = [], viol = [], bar0 = 0, cv, flash = {}, fuxCF = true;
const wm = (d) => 60 + 12 * Math.floor(d / 7) + WH[((d % 7) + 7) % 7];
const fin = () => MODES[st.mode] ?? 1;
const ltRaise = () => st.mode !== 'phrygian' && wm(fin() + 7) - wm(fin() + 6) === 2;
function M(n, k, seq) { const pen = k === seq.length - 2, lt = (((fin() - 1) % 7) + 7) % 7; return wm(n.d) + (pen && ((n.d % 7) + 7) % 7 === lt && ltRaise() ? 1 : 0); }
const cfM = (b) => wm(CF[b]) + (b === CF.length - 2 && false ? 1 : 0);
function layout() { const L = CF.length, s = []; for (let b = 0; b < L - 1; b++) {
    if (st.species === 1) s.push({ bar: b, pos: 0, dur: 1 });
    else if (st.species === 2) s.push({ bar: b, pos: 0, dur: 0.5 }, { bar: b, pos: 0.5, dur: 0.5 });
    else if (st.species === 3) for (let q = 0; q < 4; q++) s.push({ bar: b, pos: q / 4, dur: 0.25 });
    else { if (b > 0) s.push({ bar: b, pos: 0, dur: 0.5, tied: true }); s.push({ bar: b, pos: 0.5, dur: 0.5 }); } }
  s.push({ bar: L - 1, pos: 0, dur: 1 }); return s; }
/* ---------- the rules ---------- */
function chk(seq, k, soft) { const n = seq[k], m = M(n, k, seq), cf = cfM(n.bar), L = CF.length, iv = st.above ? m - cf : cf - m, ic = ((iv % 12) + 12) % 12, out = [], sp = st.species, strong = n.pos === 0 || (sp === 4 && k === 0);
  const prev = seq[k - 1], pm = prev ? M(prev, k - 1, seq) : null, cons = CONS.includes(ic), perf = ic === 0 || ic === 7, isLast = k === seq.length - 1, isFirst = k === 0;
  if (iv < 0) out.push('the voices cross');
  if (iv > 19) out.push('the voices are more than a twelfth apart');
  if (isFirst && !(ic === 0 || (ic === 7 && st.above))) out.push(st.above ? 'begin on a perfect consonance: unison, fifth or octave' : 'below the cantus, begin on a unison or octave');
  if (isLast && ic !== 0) out.push('end on a unison or octave');
  if (k === seq.length - 2 && ((n.d % 7) + 7) % 7 !== (((fin() - 1) % 7) + 7) % 7) out.push('the note before the end must be the leading note (the seventh degree)');
  if (strong && !cons) { if (sp === 4 && n.tied) { const okSus = st.above ? [10, 11, 5].includes(ic) : [1, 2].includes(ic); if (!okSus) out.push('a tied dissonance here must be a 7–6 or 4–3 suspension above, or 2–3 below'); } else out.push('dissonance on the downbeat: strong beats must be consonant'); }
  if (!strong && !cons) { if (sp === 1 || sp === 4) out.push('this note must be consonant'); else if (!prev || Math.abs(n.d - prev.d) !== 1) out.push('a weak-beat dissonance must be approached by step (a passing note)'); }
  if (prev && !n.tied) { const md = m - pm, a = Math.abs(md);
    if (a === 0 && !(sp === 1 && soft === false)) out.push('repeated note: move on (only tied notes repeat)');
    if (a === 6) out.push('a tritone leap (augmented fourth or diminished fifth) is forbidden');
    if ([9, 10, 11].includes(a) || a > 12 || (a === 8 && md < 0)) out.push('leap too large: only up to a fifth, a minor sixth upwards, or an octave');
    // leaving a weak-beat dissonance
    const pIc = (((st.above ? pm - cfM(prev.bar) : cfM(prev.bar) - pm) % 12) + 12) % 12;
    if (prev.pos !== 0 && !CONS.includes(pIc) && sp !== 4) { const pp = seq[k - 2], dirIn = pp ? Math.sign(prev.d - pp.d) : 0, dirOut = Math.sign(n.d - prev.d); if (Math.abs(n.d - prev.d) !== 1) out.push('a dissonance must be left by step'); else if (sp === 2 && dirIn !== dirOut) out.push('in species 2 a dissonance is a passing note: carry on in the same direction'); }
    if (sp === 4 && prev.tied && !CONS.includes(pIc)) { if (n.d !== prev.d - 1) out.push('a suspension must resolve down by step'); }
    if (soft) { const pp = seq[k - 2]; if (pp && !prev.tied) { const lm = pm - M(pp, k - 2, seq); if (Math.abs(lm) >= 5 && (Math.sign(md) === Math.sign(lm) || Math.abs(md) > 2)) out.push('after a leap, turn back by step'); } } }
  if (sp === 4 && n.pos === 0.5 && k >= 2 && seq[k - 2].pos === 0.5 && perf) { const q = seq[k - 2], qm = M(q, k - 2, seq), qi = (((st.above ? qm - cfM(q.bar) : cfM(q.bar) - qm) % 12) + 12) % 12; if (qi === ic) out.push('successive fifths or octaves on the upbeats: the syncopation does not hide them'); }
  if (strong && n.bar > 0) { // motion between downbeats and into perfect consonances
    let j = k - 1; while (j >= 0 && seq[j].pos !== 0) j--; const ps = seq[j];
    if (ps && !(sp === 4)) { const psm = M(ps, j, seq), pIc = ((((st.above ? psm - cfM(ps.bar) : cfM(ps.bar) - psm)) % 12) + 12) % 12; if (perf && pIc === ic && psm !== m) out.push(ic === 7 ? 'parallel fifths between downbeats' : 'parallel octaves or unisons between downbeats'); }
    if (prev && !n.tied && perf) { const cpMove = m - pm, cfMove = cf - cfM(prev.bar); if (cpMove && cfMove && Math.sign(cpMove) === Math.sign(cfMove)) out.push('similar motion into a perfect consonance (Fux: only contrary or oblique motion)'); }
    if (ic === 0 && iv === 0 && !isLast && !isFirst) out.push('unisons belong only at the beginning and the end');
    if (soft && sp === 1 && k >= 3) { const ics = [k - 3, k - 2, k - 1, k].map((q) => { const x = M(seq[q], q, seq), c = cfM(seq[q].bar); return Math.abs(x - c) % 12; }); if ([3, 4].includes(ics[0]) && ics.every((x) => [3, 4].includes(x))) out.push('more than three parallel thirds in a row'); if ([8, 9].includes(ics[0]) && ics.every((x) => [8, 9].includes(x))) out.push('more than three parallel sixths in a row'); } }
  return out; }
function checkAll() { viol = []; cp.forEach((n, k) => chk(cp, k, true).forEach((msg) => viol.push({ k, msg }))); showViol(); }
/* ---------- the composer: randomised depth-first search ---------- */
function compose(tries = 30) { const seq = layout(), L = CF.length, lo = st.above ? Math.min(...CF) : Math.min(...CF) - 10, hi = st.above ? Math.max(...CF) + 9 : Math.max(...CF);
  for (let attempt = 0; attempt < tries; attempt++) { const soft = st.strict && attempt < tries * 0.7; let nodes = 0;
    const go = (k) => { if (k === seq.length) return true; if (++nodes > 25000) return false; const n = seq[k];
      if (n.tied) { n.d = seq[k - 1].d; return chk(seq, k, soft).length === 0 && go(k + 1); }
      const cands = []; const pd = k ? seq[k - 1].d : null; for (let d = lo; d <= hi; d++) cands.push([d, (pd == null ? Math.random() * 3 : Math.abs(d - pd) === 1 ? 0 : Math.abs(d - pd) === 2 ? 1.2 : Math.abs(d - pd) + 0.5) + Math.random() * 2.2]);
      cands.sort((a, b) => a[1] - b[1]); for (const [d] of cands) { n.d = d; if (chk(seq, k, soft).length === 0 && go(k + 1)) return true; } return false; };
    if (go(0)) { cp = seq; checkAll(); return true; } }
  cp = seq.map((n, k) => Object.assign(n, { d: n.tied ? null : CF[n.bar] + (st.above ? 4 : -3) })); cp.forEach((n, k) => { if (n.tied) n.d = cp[k - 1].d; }); checkAll(); MM.toast('No strict line found: try RELAXED or another cantus'); return false; }
function genCF() { const f = fin(), L = MM.clamp(st.cfLen | 0, 6, 16);
  for (let t = 0; t < 400; t++) { const c = [f]; let ok = true; for (let i = 1; i < L - 2; i++) { const p = c[i - 1], pp = c[i - 2]; let st2 = [1, -1, 1, -1, 2, -2, 3, -3, 4][Math.floor(Math.random() * 9)]; if (pp != null && Math.abs(p - pp) >= 3) st2 = -Math.sign(p - pp); const nx = p + st2; if (Math.abs(wm(nx) - wm(p)) === 6 || nx < f - 3 || nx > f + 6 || nx === p) { i--; if (Math.random() < 0.02) { ok = false; break; } continue; } c.push(nx); }
    if (!ok) continue; c.push(f + 1, f); const mx = Math.max(...c); if (c.filter((x) => x === mx).length > 1 || Math.abs(wm(c[L - 3]) - wm(f + 1)) === 6 || Math.abs(c[L - 3] - (f + 1)) > 3) continue; return c; }
  return FUX.map((d) => d - 1 + f); }
function newCF() { CF = genCF(); curFin = fin(); fuxCF = false; compose(); }
function fux() { CF = FUX.map((d) => d - 1 + fin()); curFin = fin(); fuxCF = true; compose(); }
let curFin = 1;
function applyMode() { const sh = fin() - curFin; if (sh) CF = CF.map((d) => d + sh); curFin = fin(); compose(); }
function setMode(m) { MMX.setParam('mode', m); applyMode(); }
/* ---------- playback ---------- */
let pstep = 0;
function step(i, t, sd) { const L = CF.length, per = 16, tot = (L + 1) * per; if (pstep >= tot) { pstep = 0; loopAction(); } const b = Math.floor(pstep / per), s = pstep % per, barT = sd * per; pstep++;
  if (b >= L) return; const tr = st.trans;
  if (s === 0) { MMX.fire(0, t, { semis: cfM(b) + tr - 60 - 12 * (st.above ? 0 : -1) * 0, dur: barT * 0.98, loop: true, fadeIn: 0.04, fadeOut: 0.2, gain: st.cfLvl }); flash['cf' + b] = t; if (b === L - 1) MMX.fire(2, t, { semis: wm(fin()) + tr - 60 + 12, gain: 0.6 }); }
  cp.forEach((n, k) => { if (n.bar !== b || n.tied || Math.round(n.pos * per) !== s) return; let dur = n.dur; if (cp[k + 1] && cp[k + 1].tied) dur += cp[k + 1].dur; const hj = (Math.random() - 0.5) * st.human * sd;
    MMX.fire(1, t + Math.max(0, hj), { semis: M(n, k, cp) + tr - 60, dur: dur * barT * st.artic, fadeOut: 0.06, gain: st.cpLvl * (n.pos === 0 ? 1 : 0.85), loop: dur * barT > 1.2 }); flash[k] = t; }); }
function loopAction() { if (st.onLoop === 'new') compose(); else if (st.onLoop === 'mode') setMode(MLIST[(MLIST.indexOf(st.mode) + 1) % MLIST.length]); else if (st.onLoop === 'swap') { MMX.setParam('above', !st.above); compose(); } else if (st.onLoop === 'cantus') newCF(); }
/* ---------- drawing (Emil Ruder: contrast of weight and size) ---------- */
const nm = (d, k) => NN[((d % 7) + 7) % 7] + (k != null && M({ d }, k, cp) !== wm(d) ? '♯' : '');
function draw() { cv.fit(); const g = cv.g, W = cv.w, H = cv.h, L = CF.length, now = MM.now; g.clearRect(0, 0, W, H);
  const all = CF.concat(cp.map((n) => n.d)), lo = Math.min(...all) - 2, hi = Math.max(...all) + 2, top = 120, bot = H - 120, x0 = 28, x1 = W - 28, bw = (x1 - x0) / L, yOf = (d) => bot - ((d - lo) / (hi - lo)) * (bot - top);
  for (let d = lo; d <= hi; d++) { const y = yOf(d); g.strokeStyle = ((d % 7) + 7) % 7 === fin() ? 'rgba(227,0,27,.35)' : 'rgba(14,14,14,.08)'; g.lineWidth = 1; g.beginPath(); g.moveTo(x0, y); g.lineTo(x1, y); g.stroke(); }
  const L16 = (L + 1) * 16, pb = MM.playing ? ((pstep + L16 - 1) % L16) / 16 : -1;
  if (pb >= 0 && pb < L) { g.fillStyle = 'rgba(14,14,14,.05)'; g.fillRect(x0 + Math.floor(pb) * bw, top - 30, bw, bot - top + 60); g.fillStyle = '#e3001b'; g.fillRect(x0 + pb * bw, top - 30, 2, bot - top + 60); }
  CF.forEach((d, b) => { const y = yOf(d), lit = flash['cf' + b] && now - flash['cf' + b] < 0.3; g.fillStyle = '#0e0e0e'; g.fillRect(x0 + b * bw + 2, y - 1, bw - 4, lit ? 3 : 1.5); g.font = "200 22px 'Hanken Grotesk'"; g.fillText(NN[((d % 7) + 7) % 7], x0 + b * bw + 4, y - 6); });
  const bad = new Set(viol.map((v) => v.k));
  cp.forEach((n, k) => { const y = yOf(n.d), x = x0 + (n.bar + n.pos) * bw, w = n.dur * bw, lit = flash[k] && now - flash[k] < 0.25; g.fillStyle = bad.has(k) ? '#e3001b' : '#0e0e0e'; g.fillRect(x + 2, y - 4, w - 4, n.tied ? 3 : 8);
    if (!n.tied) { g.font = `800 ${st.species >= 3 ? 16 : 26}px 'Hanken Grotesk'`; g.fillText(nm(n.d, k), x + 4, y - 10); }
    if (lit) { g.strokeStyle = '#e3001b'; g.lineWidth = 2; g.strokeRect(x + 1, y - 7, w - 2, 14); }
    if (n.pos === 0 || st.species === 1 || (st.species === 4 && !n.tied)) { const iv = Math.abs(n.d - CF[n.bar]) + 1; g.font = `${n.pos === 0 ? 800 : 200} ${n.pos === 0 ? 30 : 18}px 'Hanken Grotesk'`; g.fillStyle = bad.has(k) ? '#e3001b' : '#0e0e0e'; g.fillText(String(iv), x + 4, H - 64 + (n.pos === 0 ? 0 : 18)); } });
  g.font = "400 10px 'Hanken Grotesk'"; g.fillStyle = '#0e0e0e'; g.fillText(`CANTUS (HAIRLINE) ${fuxCF ? '· FUX, D DORIAN TRANSPOSED' : '· GENERATED'} · COUNTERPOINT (HEAVY) ${st.above ? 'ABOVE' : 'BELOW'} · ${st.mode.toUpperCase()} · SPECIES ${st.species} · FIGURES = INTERVALS`, x0, H - 20);
  g.textAlign = 'right'; g.font = "800 96px 'Hanken Grotesk'"; g.fillStyle = 'rgba(227,0,27,.9)'; g.fillText(['', 'I', 'II', 'III', 'IV'][st.species], W - 28, 96); g.textAlign = 'left'; }
function showViol() { const el = MM.$('#viol'); if (!el) return; MM.$('#vn').textContent = viol.length ? viol.length + ' broken' : 'all kept';
  el.innerHTML = viol.length ? viol.slice(0, 12).map((v) => `<div>bar ${cp[v.k].bar + 1}${cp[v.k].pos ? ', beat ' + (cp[v.k].pos * 4 + 1) : ''}: ${v.msg}</div>`).join('') : '<div class="ok">Every rule is kept. Click a note on the grid to break one.</div>';
  MM.$('#spn').textContent = ['', 'note against note', 'two against one', 'four against one', 'syncopation'][st.species]; MM.$$('#sp button').forEach((b) => b.classList.toggle('on', +b.dataset.s === st.species)); }
function edit(x, y, shift) { const r = MM.$('#cv').getBoundingClientRect(), W = r.width, H = r.height, L = CF.length, all = CF.concat(cp.map((n) => n.d)), lo = Math.min(...all) - 2, hi = Math.max(...all) + 2, top = 120, bot = H - 120, x0 = 28, bw = (W - 56) / L;
  const d = Math.round(lo + ((bot - y) / (bot - top)) * (hi - lo)), pos = (x - x0) / bw, b = Math.floor(pos); if (b < 0 || b >= L) return;
  if (shift) CF[b] = d; else { let best = -1, bd = 9; cp.forEach((n, k) => { if (n.bar !== b) return; const c = n.bar + n.pos + n.dur / 2, dd = Math.abs(c - pos); if (dd < bd) { bd = dd; best = k; } }); if (best < 0) return; const tk = cp[best].tied ? best - 1 : best; cp[tk].d = d; if (cp[tk + 1] && cp[tk + 1].tied) cp[tk + 1].d = d; MM.ensure(); MMX.fire(1, MM.now + 0.01, { semis: M(cp[tk], tk, cp) + st.trans - 60, dur: 0.4, gain: st.cpLvl }); }
  checkAll(); }
/* ---------- built-in voices ---------- */
function mk(len, fn) { const c = MM.ctx, sr = c.sampleRate, B = c.createBuffer(1, (sr * len) | 0, sr), d = B.getChannelData(0); let pk = 0; for (let i = 0; i < d.length; i++) { d[i] = fn(i / sr); pk = Math.max(pk, Math.abs(d[i])); } for (let i = 0; i < d.length; i++) d[i] *= 0.8 / (pk || 1); return B; }
const TAU = Math.PI * 2;
function organ() { return mk(2.5, (t) => [1, 2, 3, 4, 6, 8].reduce((s, h, i) => s + Math.sin(TAU * 261.63 * h * t * (1 + 0.0007 * Math.sin(t * 5))) * [1, 0.5, 0.25, 0.2, 0.08, 0.06][i], 0) * Math.min(1, t * 30)); }
function voice() { return mk(2.4, (t) => { const f = 261.63 * (1 + 0.006 * Math.sin(TAU * 5.2 * t) * Math.min(1, t * 2)); let s = 0; for (let h = 1; h < 16; h++) { const fr = f * h, fm = Math.exp(-Math.pow((fr - 700) / 300, 2)) + 0.6 * Math.exp(-Math.pow((fr - 1150) / 250, 2)) + 0.25 * Math.exp(-Math.pow((fr - 2700) / 400, 2)); s += Math.sin(TAU * fr * t) * fm / Math.sqrt(h); } return s * Math.min(1, t * 12) * Math.exp(-t * 0.25); }); }
function bell() { return mk(3, (t) => [[1, 1, 1.4], [2.0, 0.6, 1], [2.4, 0.4, 0.7], [3.0, 0.3, 0.5], [4.07, 0.2, 0.3]].reduce((s, [r, a, d]) => s + a * Math.sin(TAU * 261.63 * r * t) * Math.exp(-t / d), 0) * Math.min(1, t * 800)); }
/* ---------- setup ---------- */
const cfg = { bpm: 84, div: 4, step, draw, start: () => { pstep = 0; }, onSamples: (list) => MMX.assign(list),
  key: (e) => { if (MMX.key(e)) return; const k = e.key.toLowerCase();
    if (k >= '1' && k <= '4') { MMX.setParam('species', +k); compose(); } else if (k === 'g') compose(); else if (k === 'c') newCF(); else if (k === 'f') fux(); else if (k === 'v') { MMX.setParam('above', !st.above); compose(); } else if (k === 'm') setMode(MLIST[(MLIST.indexOf(st.mode) + 1) % MLIST.length]); },
  setup() { MM.ensure(); cv = MM.canvas('#cv'); MM.fb.organ = organ(); MM.fb.cpv = voice(); MM.fb.bell = bell();
    MMX.init({ state: st, slots: [{ label: 'Cantus firmus voice (C4)', kind: 'organ', rv: 0.2 }, { label: 'Counterpoint voice (C4)', kind: 'cpv', rv: 0.2 }, { label: 'Cadence bell (C4)', kind: 'bell', rv: 0.4, gain: 0.6 }],
      onPreset: () => { MM.bpm = st.bpm; if (fuxCF) { CF = FUX.map((d) => d - 1 + fin()); curFin = fin(); compose(); } else applyMode(); }, factory: fac(),
      extra: { get: () => ({ CF, cp: cp.map((n) => n.d) }), set: (x) => { if (x && x.CF) { CF = x.CF; fuxCF = false; if (x.cp && x.cp.length === layout().length) { cp = layout(); cp.forEach((n, k) => (n.d = x.cp[k])); checkAll(); } else compose(); } } },
      keys: [['1 to 4', 'species'], ['G', 'write a new counterpoint'], ['C', 'generate a new cantus firmus'], ['F', "Fux's cantus firmus"], ['V', 'counterpoint above / below'], ['M', 'next mode'], ['click', 'move a counterpoint note (shift: cantus)']],
      midiHelp: 'Play a note: the counterpoint note nearest the playhead is set to it (snapped to the mode), and the rule checker tells you if it is allowed. Notes below middle C set cantus notes instead.',
      midi: (n, v, on) => { if (!on) return; const pc = ((n % 12) + 12) % 12, d = 7 * Math.floor((n - 60) / 12) + [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6][pc]; const L = CF.length, b = MM.clamp(Math.floor(((pstep + (L + 1) * 16 - 1) % ((L + 1) * 16)) / 16), 0, L - 1); if (n < 60) CF[b] = d + 7; else { const k = cp.findIndex((x) => x.bar === b && !x.tied); if (k >= 0) cp[k].d = d; } checkAll(); } });
    const C1 = MM.$('#c1'), C2 = MM.$('#c2');
    MMX.ctl(C1, 'mode', { type: 'select', label: 'Mode (M)', options: MLIST.map((x) => [x, x]), on: () => applyMode() });
    MMX.ctl(C1, 'above', { type: 'check', label: 'Counterpoint above', on: () => compose() }); MMX.ctl(C1, 'strict', { type: 'check', label: 'Strict melody', on: () => compose() });
    MMX.ctl(C1, 'cfLen', { label: 'New cantus length', min: 6, max: 16, step: 1 });
    MMX.ctl(C1, 'onLoop', { type: 'select', label: 'On each loop', options: [['repeat', 'repeat'], ['new', 'new counterpoint'], ['mode', 'next mode'], ['swap', 'swap above / below'], ['cantus', 'new cantus firmus']] });
    MMX.ctl(C2, 'bpm', { label: 'Tempo', min: 40, max: 180, step: 1, on: (v) => (MM.bpm = v) }); MMX.ctl(C2, 'trans', { label: 'Transpose', min: -12, max: 12, step: 1 }); MMX.ctl(C2, 'artic', { label: 'Legato', min: 0.2, max: 1 }); MMX.ctl(C2, 'human', { label: 'Humanise', min: 0, max: 0.5 });
    MMX.ctl(C2, 'cfLvl', { label: 'Cantus level', min: 0, max: 1.2 }); MMX.ctl(C2, 'cpLvl', { label: 'Counterpoint level', min: 0, max: 1.2 }); MMX.ctl(C2, 'rev', { label: 'Reverb', min: 0, max: 1, on: (v) => MMX.S.slots.forEach((s) => (s.rv = v * 0.6)) }); MMX.ctl(C2, 'dly', { label: 'Delay', min: 0, max: 1, on: (v) => MMX.S.slots.forEach((s) => (s.dl = v * 0.4)) });
    MM.$$('#sp button').forEach((b) => (b.onclick = () => { MMX.setParam('species', +b.dataset.s); compose(); }));
    MM.$('#b-g').onclick = () => compose(); MM.$('#b-c').onclick = newCF; MM.$('#b-f').onclick = fux; MM.$('#b-v').onclick = () => { MMX.setParam('above', !st.above); compose(); }; MM.$('#b-m').onclick = () => setMode(MLIST[(MLIST.indexOf(st.mode) + 1) % MLIST.length]);
    MM.drag(MM.$('#cv'), (x, y, ph, e) => { if (ph === 'down') edit(x, y, e && e.shiftKey); });
    CF = FUX.map((d) => d - 1 + fin()); curFin = fin(); compose(); } };
function fac() { const base = JSON.parse(JSON.stringify(st)), F = (o) => ({ full: { params: Object.assign({}, base, o) } });
  return { 'First species, D dorian (default)': {}, 'Two against one, below': F({ species: 2, above: false }), 'Four against one, every mode': F({ species: 3, onLoop: 'mode', bpm: 96 }), 'Suspensions (fourth species)': F({ species: 4, bpm: 72, artic: 1, rev: 0.5 }), 'Endless new cantus': F({ onLoop: 'cantus', species: 2, bpm: 110 }) }; }
MM.init(cfg);
