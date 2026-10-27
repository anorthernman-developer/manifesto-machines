/*META
{"title":"Databend","idea":"Bend the raw data of your sample: shift its bytes, flip its bits, swap and repeat its blocks, and listen to the medium break open.","how":"Press PLAY. Your sample is turned into raw data (bytes) and played back as a loop. Each operation edits that data directly, as if you had opened the file in a text editor: SHIFT (moves the byte alignment, so the samples are read wrongly), FLIP (inverts random bits), SWAP (exchanges two blocks), STUTTER (repeats a block), 8-BIT (reads it as cheap 8-bit audio) and ZERO (wipes a block). Each operation stacks on the last. The display shows the data as coloured pixels. Repeating the same operation over and over turns the glitch into a style, and the machine warns you. UNDO steps back and CLEAN restores the original.","fonts":"family=VT323&family=Roboto+Condensed:wght@300;700","bpm":120,
"manifesto":{"name":"Glitch Studies Manifesto","short":"Glitch Studies","author":"Rosa Menkman","year":"2010","where":"published in Amsterdam and Cologne in 2010; later expanded in her book The Glitch Moment(um) (2011)","ideas":["The glitch is a break that reveals the medium itself: its materials, protocols and hidden assumptions.","Resist the myth of the perfect, noiseless channel and the idea that progress means ever more transparent technology.","Once a glitch is repeated and designed, it can harden into a style or commodity, and stop being a glitch."],"quotes":[],"system":"You don't process sound with effects. You break the data that carries it, and the warning when you repeat yourself is the manifesto's point that a glitch turned into a preset is no longer a glitch."},
"design":{"name":"Wolfgang Weingart","short":"Wolfgang Weingart","who":"Wolfgang Weingart, German typographer and teacher at the Basel School of Design","era":"Basel, late 1960s to 1990s","hallmarks":["Swiss typography broken open: layered film, screens, stepped and spaced type","Raster dots, halftone textures and photomechanical collage","Experimental, process-led work that influenced 'New Wave' typography"],"works":["Posters for the Kunstgewerbemuseum Zürich (late 1970s to 1980s)","Covers for Typografische Monatsblätter (1970s)","The book Typography: My Way to Typography (2000)"]}}
*/
/*CSS
:root{--bg:#e8e8e3;--fg:#111;--acc:#00a3e0;--bar-font:'Roboto Condensed',sans-serif;--head-font:'VT323',monospace}
#mm-stage{background:#e8e8e3;display:grid;grid-template-columns:1fr 260px;overflow:hidden}
#cv{width:100%;height:100%;display:block;image-rendering:pixelated}
.ops{padding:18px;display:flex;flex-direction:column;gap:6px;border-left:3px solid #111}.ops h1{margin:0;font:400 54px/.8 'VT323';color:#111}.ops h1 span{color:#ff2f6e}
.ops button{font:700 15px 'Roboto Condensed';text-align:left;background:#111;color:#e8e8e3;border:0;padding:7px 10px;cursor:pointer;letter-spacing:.1em}.ops button:hover{background:#00a3e0}.ops .alt{background:#e8e8e3;color:#111;border:2px solid #111}
#st{font:400 20px 'VT323';line-height:1.05;min-height:66px}
*/
/*HTML
<canvas id="cv"></canvas><div class="ops"><h1>DATA<span>BEND</span></h1><div id="st"></div></div>
*/
let bytes = null, orig = null, hist = [], bent = null, srcFrom = null, opLog = [], srcNode = null, cur8 = false;
const OPS = { SHIFT: (b) => { const n = 1 + Math.floor(Math.random() * 3), a = Math.floor(Math.random() * b.length * 0.6), e = Math.min(b.length - n, a + Math.floor(b.length * 0.3)); for (let k = a; k < e; k++) b[k] = b[k + n]; }, FLIP: (b) => { for (let k = 0; k < 800; k++) b[Math.floor(Math.random() * b.length)] ^= 1 << Math.floor(Math.random() * 8); }, SWAP: (b) => { const L = Math.floor(b.length / 16) & ~1, i = Math.floor(Math.random() * 16) * L, j = Math.floor(Math.random() * 16) * L, t = b.slice(i, i + L); b.copyWithin(i, j, j + L); b.set(t, j); }, STUTTER: (b) => { const L = Math.floor(b.length / 64) & ~1, i = Math.floor(Math.random() * 56) * L; for (let r = 1; r < 5; r++) b.copyWithin(i + r * L, i, i + L); }, '8-BIT': () => { cur8 = true; }, ZERO: (b) => { const L = Math.floor(b.length / 24) & ~1, i = Math.floor(Math.random() * 23) * L; b.fill(0, i, i + L); } };
function toBytes(buf) { const d = buf.getChannelData(0), b = new Uint8Array(d.length * 2), v = new DataView(b.buffer); for (let k = 0; k < d.length; k++) v.setInt16(k * 2, MM.clamp(d[k], -1, 1) * 32767, true); return b; }
function toBuf() { const c = MM.ctx, n = bytes.length >> 1, out = c.createBuffer(1, n, orig.sr), d = out.getChannelData(0), v = new DataView(bytes.buffer); for (let k = 0; k < n; k++) { let s = v.getInt16(k * 2, true) / 32768; if (cur8) s = Math.round(s * 16) / 16; d[k] = s * 0.9; } bent = out; }
function load() { const B = MM.smp(0, 'loop'); if (B === srcFrom) return; srcFrom = B; bytes = toBytes(B); orig = { b: bytes.slice(), sr: B.sampleRate }; hist = []; opLog = []; cur8 = false; toBuf(); restart(); }
function restart() { if (srcNode) { srcNode.stop(); srcNode = null; } if (MM.playing && bent) srcNode = MM.play(bent, MM.now + 0.02, { loop: true, gain: 0.7 }); }
function apply(name) { MM.ensure(); load(); hist.push({ b: bytes.slice(), e: cur8 }); if (hist.length > 30) hist.shift(); OPS[name](bytes); toBuf(); restart(); opLog.push(name); status(); if (!MM.playing) MM.toggle(true); }
function status() { const last = opLog.slice(-4); const style = last.length === 4 && last.every((o) => o === last[0]); MM.$('#st').innerHTML = (opLog.length ? opLog.slice(-6).join(' → ') : 'data intact') + (style ? '<br><span style="color:#ff2f6e">WARNING: the glitch is hardening into a style</span>' : ''); }
Object.keys(OPS).forEach((n) => { const b = MM.h('button', {}, n); b.onclick = () => apply(n); MM.$('.ops').insertBefore(b, MM.$('#st')); });
[['UNDO', () => { const h = hist.pop(); if (h) { bytes = h.b; cur8 = h.e; opLog.pop(); toBuf(); restart(); status(); } }], ['CLEAN', () => { if (!orig) return; bytes = orig.b.slice(); cur8 = false; hist = []; opLog = []; toBuf(); restart(); status(); }]].forEach(([n, f]) => { const b = MM.h('button', { class: 'alt' }, n); b.onclick = f; MM.$('.ops').insertBefore(b, MM.$('#st')); });
const C = MM.canvas('#cv');
MM.init({ bpm: 120, div: 4,
  start() { srcFrom = null; load(); restart(); }, stop() { if (srcNode) srcNode.stop(); srcNode = null; },
  onSamples() { srcFrom = null; load(); },
  step(i, t) { if (i % 4 === 0) MM.play(MM.fb.kick, t, { gain: 0.45 }); if (i % 8 === 4) MM.play(MM.fb.snare, t, { gain: 0.25 }); if (i % 2) MM.play(MM.fb.hat, t, { gain: 0.12 }); },
  draw() { C.fit(); const g = C.g, w = C.w, h = C.h; g.fillStyle = '#e8e8e3'; g.fillRect(0, 0, w, h); if (!bytes) { g.fillStyle = '#111'; g.font = "400 30px VT323"; g.fillText('press PLAY to read the data', 30, 60); return; }
    const cols = 128, rows = 72, cw = (w - 40) / cols, ch = (h - 40) / rows, stride = Math.max(1, Math.floor(bytes.length / (cols * rows * 3)) * 3);
    for (let k = 0; k < cols * rows; k++) { const o = k * stride; if (o + 2 >= bytes.length) break; g.fillStyle = `rgb(${bytes[o]},${bytes[o + 1]},${bytes[o + 2]})`; g.fillRect(20 + (k % cols) * cw, 20 + Math.floor(k / cols) * ch, cw + 0.5, ch + 0.5); }
    // Weingart-style raster dot overlay
    g.fillStyle = 'rgba(17,17,17,.6)'; for (let y = 0; y < 8; y++) for (let x = 0; x < 30; x++) { g.beginPath(); g.arc(30 + x * 18, h - 30 - y * 12, (x / 30) * 4, 0, 7); g.fill(); } }
});
