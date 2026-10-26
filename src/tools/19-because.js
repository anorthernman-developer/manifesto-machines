/*META
{"title":"BECAUSE","idea":"A three-chord punk machine where your BECAUSE lines become the riffs and the shouted rhythm.","how":"Press PLAY. Write your own BECAUSE lines. Each line is one section of the song: the number of letters in each word picks the chord (only three chords, I, IV and V, are allowed), and the syllables are shouted in rhythm using your sample as the voice. Press SCREAM for a chorus. Press + LINE to add a section. DIY: the more lines you add, the longer the song.","fonts":"family=Jost:ital,wght@1,800&family=Special+Elite","bpm":168,
"manifesto":{"name":"Riot Grrrl Manifesto","short":"Riot Grrrl","author":"Kathleen Hanna (with Bikini Kill)","year":"1991","where":"Bikini Kill zine no. 2, Olympia, Washington, 1991","ideas":["A list of lines that each start with BECAUSE, giving the reasons girls need to make their own culture.","Do it yourself: make your own records, zines and shows rather than waiting for the industry.","Support and encourage each other instead of competing, and refuse the idea that girls cannot play."],"quotes":[],"system":"The song is written entirely in BECAUSE lines that you write yourself. The machine turns every word into a chord from a three-chord DIY set and every syllable into a shout. No skill is needed: if you can write a line, you can make a song."},
"design":{"name":"Barbara Kruger","short":"Barbara Kruger","who":"Barbara Kruger, American conceptual artist and former magazine designer","era":"New York, 1980s to now","hallmarks":["Black-and-white found photographs","Futura Bold Oblique, white on red bars","Direct address with words like I, you, we and your"],"works":["Untitled (Your body is a battleground), 1989","Untitled (I shop therefore I am), 1987","Untitled (Your gaze hits the side of my face), 1981"]}}
*/
/*CSS
:root{--bg:#111;--fg:#fff;--acc:#e3001b;--bar-font:'Jost',sans-serif;--head-font:'Jost',sans-serif}
#mm-stage{background:#111;overflow:hidden}
#ph{position:absolute;inset:0;width:100%;height:100%;filter:grayscale(1) contrast(1.3)}
#lines{position:absolute;left:40px;right:330px;top:30px;display:flex;flex-direction:column;gap:12px;align-items:flex-start}
.ln{background:#e3001b;color:#fff;font:italic 800 clamp(20px,2.6vw,38px)/1.05 'Jost';padding:4px 12px;outline:none;max-width:100%}
.ln.on{background:#fff;color:#e3001b}.ln .w.on{text-decoration:underline 4px}
.side{position:absolute;right:0;top:0;bottom:0;width:300px;background:#fff;color:#111;padding:20px;display:flex;flex-direction:column;gap:12px;font:14px/1.4 'Special Elite'}
.side button{font:italic 800 22px 'Jost';background:#e3001b;color:#fff;border:0;padding:8px;cursor:pointer}.side button.k{background:#111}
#chord{font:italic 800 64px 'Jost';color:#e3001b}
*/
/*HTML
<canvas id="ph"></canvas><div id="lines"></div>
<div class="side"><div>a zine machine. three chords. write your reasons. click a red bar to edit it.</div><div id="chord">I</div><button id="scream">SCREAM</button><button class="k" id="add">+ LINE</button><button class="k" id="del">− LINE</button><div id="sec"></div></div>
*/
let L = ['BECAUSE we make our own noise', 'BECAUSE nobody asked us to', 'BECAUSE the stage is ours too', 'BECAUSE we can play it loud'], parsed = [], pos = 0, scream = 0, cur = { l: 0, w: 0 };
const ROOT = 40, CH = [0, 5, 7];
function parse() { parsed = L.map((s) => s.trim().split(/\s+/).filter(Boolean).map((w) => ({ w, syl: Math.max(1, (w.toLowerCase().match(/[aeiouy]+/g) || []).length), ch: w.replace(/[^a-z]/gi, '').length % 3 }))); }
function render() { const box = MM.$('#lines'); box.innerHTML = ''; L.forEach((s, i) => { const d = MM.h('div', { class: 'ln', contenteditable: 'true', spellcheck: 'false' }); (parsed[i] || []).forEach((p, k) => { d.append(MM.h('span', { class: 'w' }, p.w)); d.append(' '); }); d.oninput = () => { L[i] = d.textContent; parse(); }; d.onblur = () => render(); box.append(d); }); }
parse(); render();
MM.$('#add').onclick = () => { L.push(MM.pick(['BECAUSE we wrote this ourselves', 'BECAUSE we are not waiting', 'BECAUSE the zine is the record', 'BECAUSE loud is a choice'])); parse(); render(); };
MM.$('#del').onclick = () => { if (L.length > 1) { L.pop(); parse(); render(); } };
MM.$('#scream').onclick = () => (scream = 32);
// a flat song: each word gets syl * 2 eighth-notes
function seq() { const out = []; parsed.forEach((ws, l) => ws.forEach((p, w) => { for (let k = 0; k < p.syl * 2; k++) out.push({ l, w, k, p }); })); return out; }
let gtr;
function power(root, t, d, g = 0.09) { [0, 7, 12].forEach((iv) => [-6, 6].forEach((dt) => MM.tone(MM.mtof(root + iv), t, d, { type: 'sawtooth', detune: dt, gain: g, cutoff: 2600, q: 2, dest: gtr }))); }
MM.init({ bpm: 168, div: 2,
  setup() {},
  start() { if (!gtr) { gtr = MM.drive(30); const g = MM.ctx.createGain(); g.gain.value = 0.35; gtr.connect(g); g.connect(MM.out); } pos = 0; },
  step(i, t, sd) { const S = seq(); if (!S.length) return; const e = S[pos++ % S.length]; cur = e; const s = i % 8, sc = scream > 0; if (sc) scream--;
    MM.play(MM.fb.kick, t, { gain: s % 4 === 0 || sc ? 0.9 : 0 }); if (s % 4 === 2) MM.play(MM.fb.snare, t, { gain: 0.8 }); MM.play(MM.fb.hat, t, { gain: 0.22 + (s % 2 ? 0 : 0.1) });
    const root = ROOT + CH[e.p.ch]; power(root, t, sd * 0.9, sc ? 0.12 : 0.08); MM.tone(MM.mtof(root - 12), t, sd * 0.9, { type: 'square', gain: 0.16, cutoff: 700 });
    if (e.k % 2 === 0 || sc) { const B = MM.smp(0, 'voice'); MM.play(B, t, { offset: (((e.w * 3 + e.k) % 8) / 8) * B.duration * 0.85, dur: sd * (sc ? 1.8 : 0.9), gain: sc ? 1 : 0.75, rate: sc ? 1.25 : 1, filter: { type: 'bandpass', freq: 1400, q: 0.8 }, dest: gtr }); }
    MM.$('#chord').textContent = ['I', 'IV', 'V'][e.p.ch] + (sc ? '!!!' : ''); },
  draw() { const lns = MM.$$('.ln'); lns.forEach((d, i) => { const on = MM.playing && i === cur.l; d.classList.toggle('on', on); [...d.querySelectorAll('.w')].forEach((w, k) => w.classList.toggle('on', on && k === cur.w)); }); MM.$('#sec').textContent = `section ${cur.l + 1} of ${L.length}`;
    const c = MM.$('#ph'); if (c.width !== c.clientWidth) { c.width = c.clientWidth; c.height = c.clientHeight; const g = c.getContext('2d'), w = c.width, h = c.height; // a halftone 'photo' of a crowd and a microphone
      g.fillStyle = '#111'; g.fillRect(0, 0, w, h); for (let y = 0; y < h; y += 8) for (let x = 0; x < w; x += 8) { const v = 0.5 + 0.5 * Math.sin(x * 0.01 + Math.sin(y * 0.013) * 3) * Math.cos(y * 0.008 - x * 0.002) - Math.hypot(x - w * 0.45, y - h * 0.75) / (w * 0.9); if (v > 0) { g.fillStyle = '#ddd'; g.beginPath(); g.arc(x, y, Math.min(4, v * 4), 0, 7); g.fill(); } }
      g.fillStyle = '#eee'; g.beginPath(); g.ellipse(w * 0.45, h * 0.55, 40, 60, 0, 0, 7); g.fill(); g.fillRect(w * 0.45 - 8, h * 0.55 + 50, 16, h); } }
});
