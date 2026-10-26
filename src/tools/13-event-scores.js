/*META
{"title":"Event Scores","idea":"A deck of Fluxus-style instruction cards; the machine performs whichever card is on top, then flips the next.","how":"Press PLAY. The top card is performed for about eight seconds, then the next card is drawn. Each card is a tiny instruction (drip, repeat, count, stretch, swarm, hold, reverse, silence) carried out on your sample. Click a card in the deck to perform it now, press SHUFFLE to reorder, or ask Gemini (with a key) to write new cards. The cards here are written in the spirit of Fluxus event scores; they are not historical scores.","fonts":"family=Inter:wght@400;900","bpm":90,
"manifesto":{"name":"Fluxus Manifesto","short":"Fluxus","author":"George Maciunas","year":"1963","where":"a collaged leaflet handed out at the Festum Fluxorum Fluxus, Düsseldorf, February 1963","ideas":["Purge the world of 'Europanism', dead art and professional, commercial culture.","Art should be living, playful and understandable by everyone, a flood of non-art reality.","Fluxus artists (George Brecht, Yoko Ono, Alison Knowles, La Monte Young) wrote short event scores: a few words to be performed by anyone."],"quotes":["Purge the world of bourgeois sickness","PROMOTE A REVOLUTIONARY FLOOD AND TIDE IN ART"],"system":"The music is not composed: it is a deck of plain instructions that anyone, including the machine, can perform. Each card is a small event, and the order is left to chance."},
"design":{"name":"Experimental Jetset","short":"Experimental Jetset","who":"Experimental Jetset (Marieke Stolk, Danny van den Dungen, Erwin Brinkers)","era":"Amsterdam, 1997 to now","hallmarks":["Helvetica-style grotesque, set big and simple, often lowercase","Flat primary-colour blocks and stripes, a language taken from modernism and punk","Systems over images: identities built from a few rules"],"works":["Stedelijk Museum Amsterdam identity (2004)","Whitney Museum 'responsive W' identity (2013)","John & Paul & Ringo & George T-shirt (2001)"]}}
*/
/*CSS
:root{--bg:#fff;--fg:#000;--acc:#0033ff;--bar-font:'Inter',Helvetica,Arial,sans-serif;--head-font:'Inter',Helvetica,sans-serif}
#mm-stage{display:grid;grid-template-columns:1.3fr 1fr;background:#fff}
.now{position:relative;padding:28px 34px;display:flex;flex-direction:column;justify-content:space-between;border-right:14px solid #000}
.now h1{margin:0;font:900 26px 'Inter';letter-spacing:-.02em}
#card{font:900 clamp(40px,5.2vw,80px)/.98 'Inter';letter-spacing:-.045em;text-transform:lowercase;max-width:14ch}
#bar{height:22px;background:#eee;position:relative}#bar i{position:absolute;left:0;top:0;bottom:0;background:#0033ff;width:0}
.stripes{position:absolute;right:0;top:0;bottom:0;width:60px;background:linear-gradient(#0033ff 0 33%,#ff2a00 33% 66%,#ffd400 66%)}
.deck{overflow:auto;padding:20px;display:flex;flex-direction:column;gap:8px}
.deck .c{font:400 15px/1.3 'Inter';border:3px solid #000;padding:10px 12px;cursor:pointer;display:flex;gap:10px}.deck .c b{font-weight:900;min-width:28px}.deck .c.on{background:#000;color:#fff}
.deck button{font:900 16px 'Inter';background:#000;color:#fff;border:0;padding:10px;cursor:pointer}
*/
/*HTML
<div class="now"><div class="stripes"></div><h1>fluxus event no. <span id="no">1</span></h1><div id="card"></div><div><div id="bar"><i></i></div></div></div>
<div class="deck"><button id="shuf">shuffle the deck</button><div id="list"></div><div id="ai"></div></div>
*/
const TYPES = ['drip', 'repeat', 'count', 'stretch', 'swarm', 'hold', 'reverse', 'silence'];
const BASE = [
  { text: 'let single drops fall. not too many.', type: 'drip', a: 0.3 },
  { text: 'repeat the first sound until it is no longer a sound.', type: 'repeat', a: 0.2 },
  { text: 'count to sixteen out loud. on thirteen, say nothing.', type: 'count', a: 13 },
  { text: 'play the sample so slowly that it becomes weather.', type: 'stretch', a: 0.25 },
  { text: 'a crowd of tiny sounds, each one very short.', type: 'swarm', a: 0.8 },
  { text: 'hold one note. listen to it change.', type: 'hold', a: 0.5 },
  { text: 'walk backwards through the sample.', type: 'reverse', a: 0.7 },
  { text: 'silence, except for one sound at the very end.', type: 'silence', a: 0 },
  { text: 'drip, but faster, as if it were raining.', type: 'drip', a: 0.85 },
  { text: 'repeat a sound from the middle. move it slightly each time.', type: 'repeat', a: 0.55 }];
let deck = BASE.slice(), idx = 0, cardT = 0, CARD = 8, n = 1, nextEv = 0, cnt = 0, holdV = null;
function list() { const L = MM.$('#list'); L.innerHTML = ''; deck.forEach((c, k) => { const d = MM.h('div', { class: 'c' + (k === idx ? ' on' : '') }); d.innerHTML = `<b>${k + 1}</b><span>${c.text}</span>`; d.onclick = () => go(k); L.append(d); }); MM.$('#card').textContent = deck[idx].text; MM.$('#no').textContent = n; }
function go(k) { idx = ((k % deck.length) + deck.length) % deck.length; cardT = MM.ctx ? MM.now : 0; nextEv = 0; cnt = 0; n++; if (holdV) { holdV.stop(); holdV = null; } list(); }
MM.$('#shuf').onclick = () => { deck.sort(() => Math.random() - 0.5); go(0); };
function perform(now) { const c = deck[idx], el = now - cardT, B = MM.smp(0, 'loop'), a = +c.a || 0.5; if (now < nextEv) return; const t = now + 0.05;
  switch (c.type) {
    case 'drip': MM.tone(MM.mtof(MM.deg(Math.floor(Math.random() * 10), 'penta', 72)), t, 0.4, { partials: [[1, 1], [3.1, 0.2]], gain: 0.25, release: 0.3, send: { rev: 0.5 }, pan: Math.random() * 2 - 1 }); MM.play(B, t, { offset: Math.random() * B.duration * 0.9, dur: 0.05, gain: 0.4, rate: 2 }); nextEv = now + 0.2 + Math.random() * 1.5 * (1 - a); break;
    case 'repeat': { const iv = 0.18 + a * 0.2; MM.play(B, t, { offset: a * B.duration * 0.8 + cnt * 0.003, dur: iv * 0.9, gain: 0.8, filter: { type: 'lowpass', freq: 8000 - cnt * 120 } }); cnt++; nextEv = now + iv; break; }
    case 'count': { const k = cnt % 16 + 1; if (k !== Math.round(a)) { MM.noise(t, 0.03, { freq: 2400, q: 5, gain: 0.5 }); MM.tone(k === 1 ? 880 : 440, t, 0.05, { gain: 0.15 }); } cnt++; nextEv = now + 60 / MM.bpm / 2; break; }
    case 'stretch': for (let g = 0; g < 3; g++) MM.play(B, t + g * 0.06, { offset: Math.min(B.duration - 0.3, (el / CARD) * B.duration * 0.9 + Math.random() * 0.02), dur: 0.25, rate: a, gain: 0.35, fadeIn: 0.1, fadeOut: 0.12, send: { rev: 0.4 } }); nextEv = now + 0.18; break;
    case 'swarm': for (let g = 0; g < 4; g++) MM.play(B, t + Math.random() * 0.08, { offset: Math.random() * B.duration * 0.95, dur: 0.02 + Math.random() * 0.03, rate: 0.5 + Math.random() * 2, gain: 0.3 * a, pan: Math.random() * 2 - 1 }); nextEv = now + 0.07; break;
    case 'hold': if (!holdV) holdV = MM.play(B, t, { offset: a * B.duration * 0.5, loop: true, loopStart: a * B.duration * 0.5, loopEnd: a * B.duration * 0.5 + 0.12, gain: 0.5, fadeIn: 0.5, filter: { type: 'lowpass', freq: 1500 }, send: { rev: 0.3 } }); MM.tone(MM.mtof(48), t, 2.2, { type: 'triangle', gain: 0.12, attack: 0.5, release: 1 }); nextEv = now + 2; break;
    case 'reverse': { const rb = B._rev || (B._rev = (() => { const r = MM.cloneBuf(B); for (let ch = 0; ch < r.numberOfChannels; ch++) r.getChannelData(ch).reverse(); return r; })()); MM.play(rb, t, { offset: (el / CARD) * rb.duration * 0.9, dur: 0.5, rate: 0.6 + a * 0.5, gain: 0.7, fadeIn: 0.05, fadeOut: 0.1 }); nextEv = now + 0.4; break; }
    case 'silence': if (el > CARD - 1) { MM.play(MM.fb.kick, t, { gain: 0.8 }); MM.play(B, t, { dur: 0.6, gain: 0.7 }); nextEv = now + 99; } else MM.noise(t, 0.4, { freq: 6000, q: 0.3, gain: 0.004 }); nextEv = Math.max(nextEv, now + 0.4); break; } }
MM.init({ bpm: 90,
  setup() { list(); MM.aiBox(MM.$('#ai'), { title: 'write new cards', help: 'Gemini writes new event-score cards in the spirit of Fluxus, using only the actions this machine can perform.', placeholder: 'a kitchen, early morning',
      system: 'You write short Fluxus-style event scores (in the spirit of George Brecht and Yoko Ono, never quoting them). Each card is one plain lowercase sentence under 14 words. Each must map to exactly one action this machine can perform: ' + TYPES.join(', ') + '. "a" is a number from 0 to 1 setting intensity (for count, an integer 1 to 16 which is the silent beat). Return JSON {"cards":[{"text":"...","type":"...","a":0.5}]} with 6 cards.',
      schema: { type: 'object', properties: { cards: { type: 'array', items: { type: 'object', properties: { text: { type: 'string' }, type: { type: 'string' }, a: { type: 'number' } }, required: ['text', 'type'] } } }, required: ['cards'] },
      apply(j) { const cs = (j.cards || []).filter((c) => TYPES.includes(c.type)).map((c) => ({ text: String(c.text).toLowerCase().slice(0, 120), type: c.type, a: c.a ?? 0.5 })); if (!cs.length) throw new Error('no usable cards'); deck = cs.concat(deck).slice(0, 16); go(0); return cs.length + ' new cards on top of the deck.'; },
      fallback() { deck.sort(() => Math.random() - 0.5); go(0); } }); },
  start() { cardT = MM.now; nextEv = 0; },
  stop() { if (holdV) { holdV.stop(); holdV = null; } },
  tick(now) { if (now - cardT > CARD) go(idx + 1); perform(now); },
  draw() { MM.$('#bar i').style.width = MM.playing ? Math.min(100, ((MM.now - cardT) / CARD) * 100) + '%' : '0'; }
});
