/*META
{"title":"Intonarumori","idea":"Six noise machines, one for each of Russolo's six families of noise, cranked by hand.","how":"Press PLAY. Each column is one family of noise. Drag up and down inside a column to crank its pitch, click its name to switch it on or off, and click the dots to change its rhythm. Your samples feed family 5 (percussion) and family 6 (voices).","fonts":"family=Anton&family=Space+Mono:wght@400;700","bpm":96,
"manifesto":{"name":"The Art of Noises (L'arte dei rumori)","short":"Art of Noises","author":"Luigi Russolo","year":"1913","where":"open letter to Francesco Balilla Pratella, Milan, 11 March 1913","ideas":["Machines have filled modern life with noise, so music should use noise instead of only 'pure' musical sounds.","Noise can be tuned and controlled: Russolo built intonarumori (noise intoners) cranked by hand, with a lever for pitch.","He sorted noise into six families: roars and booms; whistles and hisses; whispers and murmurs; screeches and buzzes; percussion on metal, wood, skin and stone; and voices of animals and people."],"quotes":["We must break out of this narrow circle of pure sounds and conquer the infinite variety of noise-sounds."],"system":"Each of the six families is its own noise machine with a crank (pitch) and a rhythm. There are no notes and no scales, only tuned noise, as in Russolo's intonarumori."},
"design":{"name":"Neville Brody","short":"Neville Brody","who":"Neville Brody, art director of The Face and Arena","era":"London, 1980s to 1990s","hallmarks":["Big condensed type, often rotated or set vertically","Hand-drawn geometric symbols used as section markers","Black ground, red accents and a lot of energy"],"works":["The Face magazine covers and spreads (1981 to 1986)","FF Blur typeface (1992)","FUSE experimental type magazine (from 1991, with Jon Wozencroft)"]}}
*/
/*CSS
:root{--bg:#0b0b0b;--fg:#f2f2f2;--acc:#ff2a1a;--bar-font:'Space Mono',monospace;--head-font:'Anton',Impact,sans-serif;--learn-font:'Space Mono',monospace}
#mm-stage{display:grid;grid-template-columns:120px repeat(6,1fr);gap:0}
.side{writing-mode:vertical-rl;transform:rotate(180deg);font:400 96px/1 'Anton',Impact,sans-serif;color:var(--acc);padding:20px 8px;letter-spacing:.02em;white-space:nowrap}
.fam{border-left:1px solid #333;position:relative;display:flex;flex-direction:column;cursor:ns-resize;overflow:hidden;touch-action:none}
.fam .n{font:400 120px/1 'Anton',Impact;padding:14px 12px 0;color:#2a2a2a;transition:color .2s}.fam.on .n{color:var(--fg)}
.fam .w{font:700 13px/1.25 'Space Mono',monospace;padding:4px 12px;text-transform:uppercase;cursor:pointer;min-height:66px}.fam.on .w{color:var(--acc)}
.fam .lev{position:absolute;left:0;right:0;height:4px;background:var(--acc);box-shadow:0 0 0 1px #000}
.fam .lev::after{content:attr(data-v);position:absolute;right:8px;top:-20px;font:700 11px 'Space Mono'}
.fam .dots{display:grid;grid-template-columns:repeat(8,1fr);gap:4px;padding:10px 12px;margin-top:auto;position:relative;z-index:2}
.fam .dots b{aspect-ratio:1;border:2px solid #555;border-radius:50%;cursor:pointer}.fam .dots b.on{background:var(--fg);border-color:var(--fg)}.fam .dots b.now{border-color:var(--acc)}
.fam .sym{position:absolute;bottom:90px;left:50%;width:70px;height:70px;transform:translateX(-50%) rotate(var(--r,0deg));border:6px solid #333;transition:border-color .1s}.fam.hit .sym{border-color:var(--acc)}
*/
/*HTML
<div class="side">RUMORI · 1913</div>
<div id="fams" style="display:contents"></div>
*/
const F = [
  { n: '1', w: 'Roars · thunderings · explosions · booms', sym: 'border-radius:0' },
  { n: '2', w: 'Whistles · hisses · snorts', sym: 'border-radius:50%' },
  { n: '3', w: 'Whispers · murmurs · mumbles · gurgles', sym: 'border-radius:50% 0' },
  { n: '4', w: 'Screeches · creaks · rustles · buzzes · crackles', sym: 'transform:translateX(-50%) rotate(45deg)' },
  { n: '5', w: 'Percussion on metal · wood · skin · stone', sym: 'border-radius:0 50%' },
  { n: '6', w: 'Voices of animals and people · shouts · groans', sym: 'border-radius:50% 50% 0 0' }];
const eu = (k, n, rot = 0) => Array.from({ length: n }, (_, i) => (((i + rot) * k) % n) < k ? 1 : 0);
const st = F.map((f, i) => ({ on: i !== 1 && i !== 3, p: 0.3 + i * 0.08, pat: eu([2, 3, 3, 5, 5, 3][i], 8, i) }));
const box = MM.$('#fams'), els = [];
F.forEach((f, i) => { const s = st[i]; const lev = MM.h('div', { class: 'lev' }), dots = MM.h('div', { class: 'dots' });
  s.pat.forEach((v, k) => { const b = MM.h('b', { class: v ? 'on' : '' }); b.onclick = (e) => { e.stopPropagation(); s.pat[k] ^= 1; b.classList.toggle('on', !!s.pat[k]); }; dots.append(b); });
  const w = MM.h('div', { class: 'w' }, f.w); w.onclick = (e) => { e.stopPropagation(); s.on = !s.on; el.classList.toggle('on', s.on); };
  const el = MM.h('div', { class: 'fam' + (s.on ? ' on' : '') }, MM.h('div', { class: 'n' }, f.n), w, MM.h('div', { class: 'sym', style: f.sym }), lev, dots);
  MM.drag(el, (x, y, ph, e) => { if (e.target.closest('.dots,.w')) return; s.p = MM.clamp(1 - y / el.clientHeight, 0, 1); if (ph === 'down' && !s.on) { s.on = true; el.classList.add('on'); } });
  box.append(el); els.push({ el, lev, dots: [...dots.children] }); });
function fire(i, t, sd) { const p = st[i].p;
  if (i === 0) { MM.noise(t, sd * 2.2, { freq: 50 + p * 400, type: 'lowpass', q: 6, gain: 0.55 }); MM.tone(30 + p * 70, t, sd * 1.5, { type: 'sawtooth', gain: 0.18, cutoff: 300 }); }
  if (i === 1) { MM.tone(900 + p * 2800, t, sd * 1.2, { type: 'sine', gain: 0.07, glide: 900 + p * 2800 * (Math.random() < 0.5 ? 0.8 : 1.25) }); MM.noise(t, sd, { freq: 4000 + p * 5000, q: 2, gain: 0.08 }); }
  if (i === 2) MM.noise(t, sd * 3, { freq: 300 + p * 1800, q: 12, gain: 0.45, attack: sd, pan: Math.random() * 2 - 1, sweep: 300 + p * 1800 * (0.6 + Math.random()) });
  if (i === 3) { MM.tone(120 + p * 1400, t, sd * 0.9, { type: 'sawtooth', gain: 0.08, glide: (120 + p * 1400) * 1.4, cutoff: 2500, q: 8, detune: Math.random() * 60 }); MM.noise(t, 0.03, { freq: 6000, q: 1, gain: 0.15 }); }
  if (i === 4) { const b = MM.smp(0, 'loop'); MM.play(b, t, { offset: Math.random() * b.duration * 0.9, dur: 0.11, rate: 0.5 + p * 1.6, gain: 0.8, fadeOut: 0.03 }); }
  if (i === 5) { const b = MM.smp(1, 'voice'); MM.play(b, t, { offset: Math.random() * b.duration * 0.6, dur: sd * 2, rate: 0.45 + p * 1.3, gain: 0.6, fadeIn: 0.02, fadeOut: 0.08, pan: 0.2 }); }
  const e = els[i].el; e.classList.add('hit'); setTimeout(() => e.classList.remove('hit'), 90); }
let cur = 0;
MM.init({ bpm: 96, div: 2,
  step(n, t, sd) { cur = n % 8; st.forEach((s, i) => { if (s.on && s.pat[cur]) fire(i, t, sd); }); },
  draw() { els.forEach((e, i) => { const h = e.el.clientHeight; e.lev.style.top = (1 - st[i].p) * (h - 4) + 'px'; e.lev.dataset.v = 'CRANK ' + Math.round(st[i].p * 100); e.dots.forEach((d, k) => d.classList.toggle('now', MM.playing && k === cur)); }); }
});
