/*META
{"title":"Airport Loops","idea":"Seven loops of different, unrelated lengths drift in and out of phase, so the music never repeats in the same way.","how":"Press PLAY. Each ring is a tape loop with its own length in seconds (for example 17.8, 20.1, 31.8). Each loop carries a single note or your sample (loaded sounds enter on their loops straight away), and because the lengths share no common measure, the combinations never repeat exactly. Click a ring to mute or unmute it. DRIFT nudges all the lengths to new values. The music is designed to be ignored as much as listened to: leave it on in the background.","fonts":"family=Inter:wght@300;600","bpm":60,
"manifesto":{"name":"Ambient Music (liner notes to Ambient 1: Music for Airports)","short":"Ambient","author":"Brian Eno","year":"1978","where":"sleeve notes for Ambient 1: Music for Airports, released on Polydor in 1978","ideas":["Music as a tint or atmosphere for a place, in contrast to canned background music.","It should reward attention but never demand it.","Eno built parts of the album from tape loops of different lengths that drift out of sync."],"quotes":["Ambient Music must be able to accommodate many levels of listening attention without enforcing one in particular; it must be as ignorable as it is interesting."],"system":"No sequencer, no bar line. Loops of unrelated lengths overlap, and the combinations never repeat in exactly the same way. Nothing ever demands your attention."},
"design":{"name":"Peter Saville","short":"Peter Saville","who":"Peter Saville, English graphic designer and co-founder of Factory Records","era":"Manchester and London, 1978 onwards","hallmarks":["Minimal sleeves that often leave off the band name and title","Borrowed images from science, art history and industry, coded colour","Refined classical and modern type, used with restraint"],"works":["Joy Division, Unknown Pleasures (1979), using a pulsar data plot","New Order, Power, Corruption & Lies (1983), with Fantin-Latour's roses and a colour-code alphabet","New Order, Blue Monday sleeve, shaped like a floppy disk (1983)"]}}
*/
/*CSS
:root{--bg:#121212;--fg:#e8e6e1;--acc:#e8e6e1;--bar-font:'Inter',sans-serif;--head-font:'Inter',sans-serif}
#mm-stage{background:#121212;overflow:hidden}#cv{position:absolute;inset:0;width:100%;height:100%;cursor:pointer}
.t{position:absolute;left:36px;bottom:30px;font:300 13px/1.6 'Inter';color:#8b8983;letter-spacing:.15em;pointer-events:none}.t b{display:block;color:#e8e6e1;font-weight:600}
#dr{position:absolute;right:36px;bottom:30px;font:600 12px 'Inter';letter-spacing:.3em;background:none;border:1px solid #e8e6e1;color:#e8e6e1;padding:8px 16px;cursor:pointer}
*/
/*HTML
<canvas id="cv"></canvas><div class="t"><b>FAC 78 / 1</b>Seven loops · no common measure</div><button id="dr">DRIFT</button>
*/
// the colours are a Saville-style code: each loop has a colour band
const COL = ['#e3c16f', '#d0614f', '#7aa6c2', '#9bbf8a', '#c79bd1', '#e8e6e1', '#e08e3c'];
let L = [];
function mk() { const lens = [17.8, 20.1, 31.8, 16.2, 19.6, 21.3, 25.0]; const notes = [65, 68, 72, 63, 60, 77, 56]; L = lens.map((len, k) => ({ len: len + (Math.random() - 0.5) * 0.6, off: Math.random() * 6 + k * 0.7, next: 0, n: notes[k], smp: k === 2 || k === 5 || k === 0, on: true, flash: 0 })); }
mk(); MM.$('#dr').onclick = () => L.forEach((l) => (l.len = MM.clamp(l.len + (Math.random() - 0.5) * 3, 9, 40)));
const C = MM.canvas('#cv'); const geo = () => ({ cx: C.w / 2, cy: C.h * 0.46, r0: Math.min(C.w, C.h) * 0.08, dr: Math.min(C.w, C.h) * 0.048 });
C.cv.addEventListener('pointerdown', (e) => { const G = geo(), d = Math.hypot(e.offsetX - G.cx, e.offsetY - G.cy), k = Math.round((d - G.r0) / G.dr); if (L[k]) L[k].on = !L[k].on; });
let t0 = 0;
MM.init({ bpm: 60, div: 1,
  onSamples() { if (MM.playing) L.forEach((l, k) => { if (l.smp) l.next = MM.now + 0.05 + k * 0.3; }); },
  start() { t0 = MM.now; L.forEach((l) => (l.next = MM.now + l.off * 0.4)); },
  tick(now) { L.forEach((l, k) => { if (now + 0.1 < l.next) return; const t = Math.max(l.next, now + 0.02); l.next += l.len * 0.5; if (!l.on) return; l.flash = 1;
      if (l.smp) { const B = MM.smp(0, 'voice'); MM.play(B, t, { rate: MM.mtof(l.n) / MM.mtof(60), gain: 0.5, fadeIn: 0.4, fadeOut: 0.8, pan: (k / 3) - 1, send: { rev: 0.6, dly: 0.2 } }); }
      else MM.tone(MM.mtof(l.n), t, 6, { partials: [[1, 1], [2, 0.25], [3, 0.08]], gain: 0.07, attack: 0.8, release: 4, pan: (k / 3) - 1, cutoff: 1800, send: { rev: 0.6 } }); }); },
  draw() { C.fit(); const g = C.g, w = C.w, h = C.h, G = geo(), now = MM.now; g.fillStyle = '#121212'; g.fillRect(0, 0, w, h);
    L.forEach((l, k) => { const r = G.r0 + k * G.dr, ph = MM.playing ? 1 - (l.next - now) / (l.len * 0.5) : 0; g.strokeStyle = l.on ? COL[k] : '#333'; g.globalAlpha = 0.25 + l.flash * 0.75; g.lineWidth = G.dr * 0.55; g.beginPath(); g.arc(G.cx, G.cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * MM.clamp(ph, 0, 1)); g.stroke(); g.globalAlpha = 0.12; g.beginPath(); g.arc(G.cx, G.cy, r, 0, 7); g.stroke(); g.globalAlpha = 1; l.flash *= 0.985;
      g.fillStyle = '#8b8983'; g.font = "300 11px 'Inter'"; g.fillText((l.len).toFixed(1) + 's', G.cx + G.r0 + 7 * G.dr + 10, G.cy - G.r0 - k * G.dr + 4); }); }
});
