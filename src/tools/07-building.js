/*META
{"title":"Building","idea":"Build a song floor by floor from Bauhaus shapes: blue circles, red squares, yellow triangles.","how":"Press PLAY. The music climbs the building from the ground floor up, one floor per bar, and each floor has four beats. Click a cell to place a shape: ● blue circle plays a bass and fifth, ■ red square plays a slice of your sample, ▲ yellow triangle plays quick metal hits. Higher floors are higher in pitch. Fill every floor and a roof chord completes the building.","fonts":"family=Josefin+Sans:wght@300;700","bpm":108,
"manifesto":{"name":"Programme of the Staatliches Bauhaus in Weimar","short":"Bauhaus","author":"Walter Gropius","year":"1919","where":"Weimar, April 1919, with Lyonel Feininger's woodcut 'Cathedral' on the cover","ideas":["All the arts should join together in building; the old wall between artist and craftsman should go.","Students train in workshops, as apprentices, journeymen and masters.","Teachers at the Bauhaus (Kandinsky, Itten) taught basic forms and colours as a shared language."],"quotes":["The ultimate aim of all visual arts is the complete building!","Architects, sculptors, painters, we must all return to the crafts!"],"system":"The song is a building: floors are bars and cells are beats. The three basic Bauhaus shapes in Kandinsky's colours are the only crafts allowed, and the piece is only complete when every floor has been built."},
"design":{"name":"Herbert Bayer","short":"Herbert Bayer","who":"Herbert Bayer, Bauhaus student, then head of its print and advertising workshop","era":"Dessau, 1925 to 1928, then Berlin and the USA","hallmarks":["Lowercase only: Bayer argued capitals were unnecessary","Geometric sans letters built from circles and straight lines","Primary colours, bold bars and diagonal layouts"],"works":["Universal alphabet (1925)","Poster for Kandinsky's 60th birthday exhibition (1926)","Design for a newspaper kiosk (1924)"]}}
*/
/*CSS
:root{--bg:#f3efe4;--fg:#111;--acc:#e3261b;--bar-font:'Josefin Sans',sans-serif;--head-font:'Josefin Sans',sans-serif}
#mm-stage{display:grid;grid-template-columns:1fr 520px 1fr;align-items:end;padding:0 0 10px}
.left{align-self:stretch;position:relative;overflow:hidden}
.left h1{font:700 84px/.85 'Josefin Sans';margin:0;position:absolute;left:-10px;top:40px;transform:rotate(-12deg);transform-origin:left top;letter-spacing:-.04em}
.left h1 span{color:var(--acc)}.left p{position:absolute;left:30px;bottom:30px;font:300 18px/1.3 'Josefin Sans';max-width:240px}
.bar1{position:absolute;left:0;top:300px;width:120%;height:22px;background:#111;transform:rotate(-12deg);transform-origin:left}
#bld{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:10px;background:#111;position:relative}
#bld button{aspect-ratio:2.3;border:0;background:#f3efe4;cursor:pointer;font:46px/1 sans-serif;padding:0}
#bld button.now{outline:5px solid var(--acc);outline-offset:-5px}#bld .fl{background:#e8e2d2}
.roof{height:56px;width:520px;clip-path:polygon(0 100%,50% 0,100% 100%);background:#111;margin-bottom:-6px;transition:background .3s}.roof.done{background:#f2c200}
.right{align-self:stretch;padding:40px 30px;font:300 16px/1.5 'Josefin Sans';display:flex;flex-direction:column;gap:12px}
.right b{font-weight:700}.right .sh{display:flex;gap:10px;align-items:center;font-size:18px}
.right button{font:700 14px 'Josefin Sans';border:2px solid #111;background:none;padding:8px;cursor:pointer}
*/
/*HTML
<div class="left"><div class="bar1"></div><h1>bau<span>haus</span><br>1919</h1><p>the ultimate aim of all visual arts is the complete building.</p></div>
<div><div class="roof" id="roof"></div><div id="bld"></div></div>
<div class="right"><b>workshop</b><div class="sh"><span style="color:#1d4fa8">●</span> circle · bass and fifth</div><div class="sh"><span style="color:#e3261b">■</span> square · your sample</div><div class="sh"><span style="color:#f2c200">▲</span> triangle · metal</div><div>click a cell to cycle shapes. floors are bars, cells are beats. the ground floor plays first.</div><button id="clear">demolish</button><button id="plan">new plan</button><div id="info"></div></div>
*/
const FLOORS = 8, SH = ['', '●', '■', '▲'], COL = ['', '#1d4fa8', '#e3261b', '#f2c200'];
let B = [], cur = -1, btns = [];
function plan() { B = Array.from({ length: FLOORS }, (_, f) => Array.from({ length: 4 }, (_, c) => (c === 0 ? 1 : Math.random() < 0.55 ? 1 + Math.floor(Math.random() * 3) : 0))); B[0] = [1, 2, 3, 2]; B[FLOORS - 1] = [0, 0, 0, 0]; B[FLOORS - 2] = [0, 2, 0, 0]; paint(); }
const bld = MM.$('#bld');
for (let f = FLOORS - 1; f >= 0; f--) for (let c = 0; c < 4; c++) { const b = MM.h('button'); b.onclick = () => { B[f][c] = (B[f][c] + 1) % 4; paint(); }; bld.append(b); btns[f * 4 + c] = b; }
function paint() { for (let f = 0; f < FLOORS; f++) for (let c = 0; c < 4; c++) { const b = btns[f * 4 + c]; b.textContent = SH[B[f][c]]; b.style.color = COL[B[f][c]]; } MM.$('#roof').classList.toggle('done', B.every((fl) => fl.some((x) => x))); }
MM.$('#clear').onclick = () => { B = B.map(() => [0, 0, 0, 0]); B[0][0] = 1; paint(); }; MM.$('#plan').onclick = plan;
plan();
MM.init({ bpm: 108, div: 2,
  step(i, t, sd) { const beat = Math.floor(i / 2) % (FLOORS * 4), f = Math.floor(beat / 4), c = beat % 4, half = i % 2; cur = beat; const s = B[f][c], up = f * 2;
    if (half === 0 && beat === 0 && B.every((fl) => fl.some((x) => x))) [0, 4, 7, 11].forEach((iv, k) => MM.tone(MM.mtof(60 + iv), t, sd * 6, { type: 'triangle', gain: 0.07, attack: 0.05, send: { rev: 0.4 }, pan: k / 2 - 0.75 }));
    if (!s) return;
    if (s === 1 && half === 0) { MM.tone(MM.mtof(36 + up), t, sd * 1.6, { type: 'triangle', gain: 0.4, cutoff: 800 }); MM.tone(MM.mtof(43 + up), t + sd, sd * 0.8, { type: 'sine', gain: 0.2 }); }
    if (s === 2 && half === 0) { const b = MM.smp(0, 'loop'), n = 8; MM.play(b, t, { offset: ((f + c) % n) * b.duration / n, dur: sd * 2, gain: 0.8, rate: Math.pow(2, f / 12), fadeOut: 0.02 }); }
    if (s === 3) { MM.tone(1600 + f * 120, t, 0.06, { partials: [[1, 1], [1.47, 0.6], [2.09, 0.4]], gain: 0.12 }); MM.noise(t, 0.03, { freq: 8000, q: 1, gain: 0.12 }); } },
  draw() { btns.forEach((b, k) => b.classList.toggle('now', MM.playing && k === cur)); MM.$('#info').textContent = MM.playing ? `floor ${Math.floor(cur / 4) + 1} of ${FLOORS}` : ''; }
});
