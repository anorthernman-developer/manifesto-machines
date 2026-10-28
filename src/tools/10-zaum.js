/*META
{"gemini":true,"title":"Zaum","idea":"Type words that mean nothing in any language and a throat made of your sample sings them.","how":"Press PLAY. The words in the megaphone are sung syllable by syllable: vowels are sung through vocal formant filters, and consonants become hisses, clicks, trills and hums. Type your own transrational words, or press INVENT for new ones (or ask Gemini, if you have a key). Your sample becomes the singer's throat. Pitch follows the letters.","fonts":"family=Unbounded:wght@400;900&family=IBM+Plex+Mono","bpm":132,
"manifesto":{"name":"A Slap in the Face of Public Taste","short":"Cubo-Futurism","author":"David Burliuk, Aleksei Kruchenykh, Vladimir Mayakovsky and Velimir Khlebnikov","year":"1912","where":"Moscow, December 1912","ideas":["The past is too tight: the classics should be thrown off the ship of modernity.","Poets have the right to enlarge their vocabulary with arbitrary and newly made words (paraphrase).","This led to zaum, 'beyond-sense' language. Kruchenykh's poem 'Dyr bul shchyl' (1913) is written in words that belong to no language."],"quotes":["Throw Pushkin, Dostoevsky, Tolstoy, etc., etc. overboard from the Ship of Modernity."],"system":"Words are judged only by their sound. Each letter has a sound rule: vowels are sung shapes of the mouth and consonants are noises. Meaning never comes into it, so the machine sings any invented language."},
"design":{"name":"Alexander Rodchenko","short":"Rodchenko","who":"Alexander Rodchenko, Constructivist designer and photographer, often with Mayakovsky","era":"Moscow, 1920s","hallmarks":["Bold sans letters set along diagonals and blocks","Black, red and cream, with a woman shouting through a megaphone of type","Photomontage and steep camera angles"],"works":["Books (Lengiz poster with Lilya Brik, 1924)","Pro Eto, Mayakovsky's book with Rodchenko's photomontages (1923)","Advertisements for Mosselprom and Dobrolet, with Mayakovsky's texts (1923 to 1925)"]}}
*/
/*CSS
:root{--bg:#efe4cc;--fg:#161311;--acc:#cf2b1d;--bar-font:'IBM Plex Mono',monospace;--head-font:'Unbounded',sans-serif}
#mm-stage{display:grid;grid-template-columns:1fr 340px}
.main{position:relative;overflow:hidden}
.cone{position:absolute;left:-5%;top:10%;width:110%;height:60%;background:#cf2b1d;clip-path:polygon(0 42%,100% 0,100% 100%,0 58%)}
.mouth{position:absolute;left:3%;top:34%;width:120px;height:120px;border-radius:50%;background:#161311}
#words{position:absolute;left:18%;top:22%;width:78%;font:900 clamp(40px,6.2vw,96px)/1 'Unbounded';color:#efe4cc;text-transform:uppercase;transform:rotate(-7deg);word-break:break-word;outline:none}
#words .on{color:#161311}
.big{position:absolute;left:30px;bottom:14px;font:900 140px/1 'Unbounded';color:#161311}
.side{background:#161311;color:#efe4cc;padding:22px 20px;display:flex;flex-direction:column;gap:12px;font:13px/1.4 'IBM Plex Mono';overflow:auto}
.side textarea{width:100%;height:80px;background:#efe4cc;color:#161311;border:0;font:700 16px 'IBM Plex Mono';padding:8px}
.side button{font:900 14px 'Unbounded';background:#cf2b1d;color:#efe4cc;border:0;padding:10px;cursor:pointer}
.side .mm-ai{border-top:2px solid #cf2b1d;padding-top:10px}
*/
/*HTML
<div class="main"><div class="cone"></div><div class="mouth"></div><div id="words"></div><div class="big">ЗАУМЬ</div></div>
<div class="side"><b>TRANSRATIONAL WORDS</b><textarea id="txt">dyr bul shchyl ubeshchur skum vy so bu r l ez</textarea><button id="inv">INVENT WORDS</button><div>Vowels sing (a e i o u y). sh, sch, s, z, ch hiss. b d g p t k click. r trills. l m n hum.</div><div id="ai"></div></div>
*/
const FORM = { a: [800, 1150, 2800], e: [400, 1700, 2600], i: [300, 2300, 3000], o: [450, 800, 2830], u: [325, 700, 2530], y: [350, 1600, 2500] };
let syl = [], pos = 0, cur = -1;
function parse(t) { const s = t.toLowerCase().replace(/[^a-zа-я\s]/g, ''); const out = []; s.split(/\s+/).filter(Boolean).forEach((w, wi) => { const parts = w.match(/[^aeiouy]*[aeiouy]+|[^aeiouy]+$/g) || [w]; parts.forEach((p, k) => out.push({ p, w: wi, first: k === 0 })); out.push({ p: '', w: wi, rest: true }); }); return out; }
function render() { const box = MM.$('#words'); box.innerHTML = ''; syl.forEach((s, i) => { if (s.rest) { box.append(' '); return; } s.el = MM.h('span', {}, s.p); box.append(s.el); }); }
function setText(t) { MM.$('#txt').value = t; syl = parse(t); pos = 0; render(); }
MM.$('#txt').oninput = (e) => { syl = parse(e.target.value); pos = 0; render(); };
const C1 = ['dr', 'b', 'shch', 'sk', 'z', 'kh', 'gr', 'v', 'l', 'm', 'r', 'ts', 'p', 'zh', 'kr'], V1 = ['a', 'u', 'y', 'o', 'e', 'i', 'ou', 'ya'];
function invent() { const n = 5 + Math.floor(Math.random() * 6); setText(Array.from({ length: n }, () => Array.from({ length: 1 + Math.floor(Math.random() * 3) }, () => MM.pick(C1) + MM.pick(V1)).join('') + (Math.random() < 0.4 ? MM.pick(['r', 'l', 'm', 'shch', 'z']) : '')).join(' ')); }
MM.$('#inv').onclick = invent;
function vowel(v, f0, t, d) { const c = MM.ctx, fm = FORM[v[v.length - 1]] || FORM.a, mix = c.createGain(); mix.gain.value = 1; const out = c.createGain(); MM.tone; out.gain.setValueAtTime(0.0001, t); out.gain.linearRampToValueAtTime(0.9, t + 0.02); out.gain.setValueAtTime(0.9, t + d * 0.8); out.gain.exponentialRampToValueAtTime(0.0001, t + d); out.connect(MM.out);
  const sg = c.createGain(); sg.gain.value = 0.2; out.connect(sg); sg.connect(MM.rev);
  fm.forEach((f, k) => { const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = f; bp.Q.value = 9; const g = c.createGain(); g.gain.value = [1.4, 0.8, 0.4][k]; mix.connect(bp); bp.connect(g); g.connect(out); });
  const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.setValueAtTime(f0, t); o.frequency.linearRampToValueAtTime(f0 * 1.02, t + d); const og = c.createGain(); og.gain.value = 0.25; o.connect(og); og.connect(mix); o.start(t); o.stop(t + d + 0.05);
  const b = MM.smp(0, 'voice'); MM.play(b, t, { offset: Math.random() * b.duration * 0.5, dur: d, rate: f0 / 150, gain: 0.9, dest: mix, fadeIn: 0.02, fadeOut: 0.05 }); }
function cons(cs, t) { if (/sh|sch|ch|s|z|zh|ts/.test(cs)) MM.noise(t, 0.09, { freq: /sh|ch|zh/.test(cs) ? 3200 : 6500, q: 3, gain: 0.3 });
  if (/[bdgptk]/.test(cs)) { MM.noise(t, 0.015, { freq: /[bdg]/.test(cs) ? 700 : 2200, q: 1, gain: 0.5 }); if (/[bdg]/.test(cs)) MM.tone(110, t, 0.04, { gain: 0.3 }); }
  if (/r/.test(cs)) for (let k = 0; k < 3; k++) MM.noise(t + k * 0.03, 0.02, { freq: 1200, q: 2, gain: 0.25 });
  if (/[lmnv]/.test(cs)) MM.tone(140, t, 0.08, { type: 'triangle', gain: 0.12, cutoff: 600 }); if (/kh|h|gr/.test(cs)) MM.noise(t, 0.08, { freq: 1500, q: 2, gain: 0.25 }); }
MM.init({ bpm: 132, div: 2,
  setup() { setText(MM.$('#txt').value);
    MM.aiBox(MM.$('#ai'), { title: 'INVENT ZAUM', help: 'Ask Gemini for a line of transrational words in a mood you name.', placeholder: 'a factory at dawn, angry and joyful',
      system: 'You write zaum: Russian Futurist transrational poetry (as in Kruchenykh\'s Dyr bul shchyl). Invent 6 to 12 words that belong to no language, spelled in plain Latin letters (a-z only), built for their sound alone. Return JSON {"words":"the line","note":"one short sentence about the sound you aimed for"}.',
      schema: { type: 'object', properties: { words: { type: 'string' }, note: { type: 'string' } }, required: ['words'] },
      apply(j) { setText(String(j.words || '').toLowerCase().replace(/[^a-z\s]/g, '').slice(0, 160) || 'dyr bul shchyl'); return j.note || ''; }, fallback: invent }); },
  step(i, t, sd) { if (!syl.length) return; const s = syl[pos % syl.length]; pos++; cur = pos - 1;
    if (s.rest) return; const m = s.p.match(/^([^aeiouy]*)([aeiouy]+)?(.*)$/), code = [...s.p].reduce((a, c) => a + c.charCodeAt(0), 0);
    const f0 = MM.mtof(MM.deg(code % 9, 'phrygian', 50)); if (m[1]) cons(m[1], t); if (m[2]) vowel(m[2], f0, t + (m[1] ? 0.03 : 0), sd * (s.first ? 1.8 : 1.1)); if (m[3]) cons(m[3], t + sd * 0.8);
    if (s.first) MM.play(MM.fb.kick, t, { gain: 0.35 }); },
  draw() { syl.forEach((s, i) => s.el && s.el.classList.toggle('on', MM.playing && i === cur % syl.length)); }
});
