/*META
{"title":"Letter Drum","idea":"A drum machine made of letters: type a line and every character is a percussive phoneme, including Isou's new letters for breaths, clicks, whistles and kisses.","how":"Press PLAY. Type into the line (up to 32 characters); each character is one step. Vowels are sung vowel sounds, consonants are percussive (K, T, P and similar are hard hits; S, F, SH and similar are noise; M, N and L are hums), and your sample speaks the capital letters. The extra Lettrist letters in the palette are new sounds: breathing in (↑), breathing out (↓), a click (ʘ), a whistle (~), a kiss (♥), a cough (※) and silence (·). Click them to add them. SCRAMBLE reorders the letters and TEMPO sets the speed.","fonts":"family=Syne+Mono&family=Syne:wght@400;800","bpm":120,
"manifesto":{"name":"Lettrism: Manifesto of Lettrist Poetry","short":"Lettrism","author":"Isidore Isou","year":"1942 (written), 1947 (published)","where":"in Isou's book Introduction à une nouvelle poésie et à une nouvelle musique (Paris, 1947); the Lettrist movement began in Paris in 1945 to 1946","ideas":["Poetry reduced beyond words, to letters and their sounds.","An enlarged alphabet of new 'letters' for sounds such as breathing, clicks, whistles and coughs.","A new poetry that merges with music, performed out loud."],"quotes":[],"system":"The score is a line of characters. Words are not sung; every letter is a sound in its own right, and Isou's extra sound-letters are part of the alphabet."},
"design":{"name":"Emigre","short":"Emigre","who":"Emigre: Rudy VanderLans and Zuzana Licko, with designers such as Barry Deck","era":"Berkeley and Sacramento, California, 1984 to 2005","hallmarks":["Bitmap and digital typefaces designed for the early Macintosh","Experimental, layered layouts that broke Swiss-style rules","Type designed and published by its users"],"works":["Emigre magazine (1984 to 2005)","Zuzana Licko's bitmap fonts (such as Oakland and Matrix) and Mrs Eaves (1996)","Barry Deck's Template Gothic (1990)"]}}
*/
/*CSS
:root{--bg:#111;--fg:#eee;--acc:#ff4f00;--bar-font:'Syne',sans-serif;--head-font:'Syne Mono',monospace}
#mm-stage{background:#111;color:#eee;padding:24px 32px;box-sizing:border-box;display:flex;flex-direction:column;gap:14px;overflow:hidden}
h1{margin:0;font:800 clamp(40px,6vw,86px)/.85 'Syne';letter-spacing:-.04em}h1 span{color:#ff4f00;font-family:'Syne Mono'}
#line{font:400 34px 'Syne Mono';background:#eee;color:#111;border:0;padding:8px 12px;width:100%;box-sizing:border-box;letter-spacing:.12em}
.pal{display:flex;gap:6px;flex-wrap:wrap}.pal button{font:400 22px 'Syne Mono';background:#222;color:#eee;border:1px solid #444;width:84px;padding:4px;cursor:pointer}.pal button small{display:block;font:400 10px 'Syne'}
.row{display:flex;gap:10px;align-items:center;font:400 13px 'Syne'}.row button{font:800 14px 'Syne';background:#ff4f00;border:0;padding:8px 14px;cursor:pointer}
#steps{display:grid;grid-template-columns:repeat(32,1fr);gap:3px;flex:1;min-height:90px}#steps div{background:#222;display:flex;align-items:flex-end;justify-content:center;font:400 22px 'Syne Mono';padding-bottom:6px;transition:background .05s}#steps div.now{background:#ff4f00;color:#111}
*/
/*HTML
<h1>LETTRIE <span>1947</span></h1><input id="line" maxlength="32" spellcheck="false"><div class="pal" id="pal"></div><div class="row"><button id="scr">SCRAMBLE</button>TEMPO<input id="tp" type="range" min="70" max="180" value="120"></div><div id="steps"></div>
*/
const EXTRA = { '↑': 'breath in', '↓': 'breath out', 'ʘ': 'click', '~': 'whistle', '♥': 'kiss', '※': 'cough', '·': 'silence' };
let line = 'Ka·tuSh↑ ʘOm~ prr ♥ Isu※ Ta tA';
const inp = MM.$('#line'); inp.value = line; inp.oninput = () => { line = inp.value; cells(); };
Object.entries(EXTRA).forEach(([ch, n]) => { const b = MM.h('button', { html: ch + '<small>' + n + '</small>' }); b.onclick = () => { line = (line + ch).slice(0, 32); inp.value = line; cells(); }; MM.$('#pal').append(b); });
MM.$('#scr').onclick = () => { line = [...line].sort(() => Math.random() - 0.5).join(''); inp.value = line; cells(); };
function cells() { const S = MM.$('#steps'); S.innerHTML = ''; [...line].forEach((c) => S.append(MM.h('div', {}, c === ' ' ? '' : c))); }
cells();
const FORM = { a: [800, 1200], e: [500, 1900], i: [300, 2300], o: [500, 900], u: [320, 800], y: [300, 2000] };
function vowel(t, f, d, g) { const F = FORM[f]; F.forEach((fr, q) => MM.noise(t, d, { freq: fr, q: 12, gain: g * (q ? 0.5 : 0.8), type: 'bandpass' })); MM.tone(MM.mtof(48 + (f.charCodeAt(0) % 12)), t, d, { partials: [[1, 1], [2, 0.5], [3, 0.3], [Math.round(F[1] / 140), 0.2]], gain: g * 0.15, release: 0.1 }); }
function sound(c, t, sd) { const B = MM.smp(0, 'voice'), lc = c.toLowerCase();
  if (c >= 'A' && c <= 'Z') { MM.play(B, t, { offset: ((c.charCodeAt(0) - 65) / 26) * B.duration * 0.9, dur: sd * 1.6, gain: 0.7, fadeOut: 0.03 }); return; }
  if (FORM[lc]) return vowel(t, lc, sd * 0.9, 0.5);
  if ('kgq'.includes(lc)) { MM.play(MM.fb.kick, t, { gain: 0.8, rate: lc === 'k' ? 1.3 : 1 }); MM.noise(t, 0.02, { freq: 1500, q: 2, gain: 0.3 }); return; }
  if ('tdb'.includes(lc)) { MM.play(MM.fb.snare, t, { gain: 0.45, rate: lc === 'b' ? 0.7 : 1.2 }); return; }
  if (lc === 'p') return MM.noise(t, 0.015, { freq: 700, q: 1, gain: 0.5 });
  if ('sfzxcjh'.includes(lc)) return MM.noise(t, sd * (lc === 'h' ? 1 : 0.8), { freq: lc === 's' ? 7000 : lc === 'f' ? 5000 : 3500, q: 2, gain: 0.25 });
  if ('mnlw'.includes(lc)) return MM.tone(MM.mtof(lc === 'm' ? 45 : lc === 'n' ? 50 : 55), t, sd * 1.2, { type: 'triangle', gain: 0.2 });
  if (lc === 'r') { for (let k = 0; k < 4; k++) MM.noise(t + k * 0.025, 0.012, { freq: 1200, q: 3, gain: 0.3 }); return; }
  if (c === '↑') return MM.noise(t, sd * 1.8, { freq: 1500, sweep: 3500, q: 0.6, gain: 0.18 });
  if (c === '↓') return MM.noise(t, sd * 1.8, { freq: 2500, sweep: 900, q: 0.6, gain: 0.18 });
  if (c === 'ʘ') return MM.noise(t, 0.006, { freq: 3000, q: 6, gain: 0.8 });
  if (c === '~') return MM.tone(1800, t, sd * 1.5, { glide: 2600, gain: 0.07 });
  if (c === '♥') { MM.noise(t, 0.01, { freq: 2200, q: 5, gain: 0.6 }); MM.tone(900, t, 0.06, { glide: 1500, gain: 0.05 }); return; }
  if (c === '※') return MM.noise(t, 0.2, { freq: 600, q: 0.8, gain: 0.45, sweep: 300 }); }
let cur = -1; MM.$('#tp').oninput = (e) => (MM.S.bpm = +e.target.value);
MM.init({ bpm: 120, div: 4,
  step(i, t, sd) { const L = [...line]; if (!L.length) return; const k = i % L.length; cur = k; sound(L[k], t, sd); const D = MM.$('#steps').children; [...D].forEach((d, q) => d.classList.toggle('now', q === k)); }
});
