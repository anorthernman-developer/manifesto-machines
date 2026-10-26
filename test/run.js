// Headless test for every tool: no console errors, audio starts with the built-in sound, LEARN opens,
// a WAV and an AIFF load (and the sample is actually played), WAV recording downloads. Also writes a thumbnail.
const { chromium } = require('playwright-core');
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const C = (() => { try { return require('./config.js'); } catch (e) { return {}; } })();
const only = process.argv[2];
const HOOK = () => {
  window.__ctx = []; window.__starts = [];
  const AC = window.AudioContext;
  window.AudioContext = window.webkitAudioContext = class extends AC { constructor(...a) { super(...a); __ctx.push(this); this.__an = this.createAnalyser(); this.__an.fftSize = 2048; } };
  const oc = AudioNode.prototype.connect;
  AudioNode.prototype.connect = function (d, ...r) { if (d instanceof AudioDestinationNode && this.context.__an && this !== this.context.__an) oc.call(this, this.context.__an); return oc.call(this, d, ...r); };
  const os = AudioBufferSourceNode.prototype.start;
  AudioBufferSourceNode.prototype.start = function (...a) { __starts.push(+(this.buffer && this.buffer.duration).toFixed(2)); return os.apply(this, a); };
  window.__rms = () => { const c = __ctx[0]; if (!c) return -1; const d = new Float32Array(2048); c.__an.getFloatTimeDomainData(d); return Math.sqrt(d.reduce((s, x) => s + x * x, 0) / d.length); };
  window.__peak = () => { const c = __ctx[0]; if (!c) return -1; const d = new Float32Array(2048); c.__an.getFloatTimeDomainData(d); return d.reduce((s, x) => Math.max(s, Math.abs(x)), 0); };
};
(async () => {
  const exe = [process.env.HOME + '/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome', process.env.HOME + '/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome', '/usr/bin/google-chrome'].find((p) => fs.existsSync(p));
  const browser = await chromium.launch({ executablePath: exe, headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
  fs.mkdirSync(ROOT + '/screenshots/thumbs', { recursive: true });
  const files = fs.readdirSync(ROOT + '/tools').filter((f) => f.endsWith('.html') && (!only || only.split(',').some((o) => f.startsWith(o)))).sort();
  let fails = 0; const out = [];
  for (const file of files) {
    const cfg = C[file.slice(0, 2)] || {};
    const bctx = await browser.newContext({ viewport: { width: 1280, height: 760 }, acceptDownloads: true });
    const page = await bctx.newPage(); const errs = [];
    page.on('console', (m) => { if (m.type() === 'error' && !/fonts\.(googleapis|gstatic)|ERR_INTERNET|ERR_NAME/.test(m.text())) errs.push(m.text()); });
    page.on('pageerror', (e) => errs.push('PAGEERROR ' + e.message));
    await page.route('https://generativelanguage.googleapis.com/**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ candidates: [{ content: { parts: [{ text: JSON.stringify(cfg.mock || {}) }] } }] }) }));
    await page.addInitScript(HOOK);
    await page.goto('file://' + ROOT + '/tools/' + file); await page.waitForTimeout(500);
    const run = async (acts = []) => { for (const a of acts) { if (a.click) await page.mouse.click(...a.click); if (a.sel) await page.click(a.sel); if (a.move) await page.mouse.move(...a.move, { steps: 8 }); if (a.down) await page.mouse.down(); if (a.up) await page.mouse.up(); if (a.key) await page.keyboard.press(a.key); if (a.type) await page.keyboard.type(a.type); if (a.fill) await page.fill(a.fill[0], a.fill[1]); if (a.wait) await page.waitForTimeout(a.wait); if (a.eval) await page.evaluate(a.eval); } };
    const peak = async (ms) => { let m = 0, p = 0; for (let i = 0; i < ms / 100; i++) { await page.waitForTimeout(100); m = Math.max(m, await page.evaluate(() => __rms())); p = Math.max(p, await page.evaluate(() => __peak())); } return [+m.toFixed(4), +p.toFixed(3)]; };
    const r = { file };
    await page.click('#mm-play'); await run(cfg.start);
    [r.rms, r.peak] = await peak(cfg.wait || 3000); r.state = await page.evaluate(() => __ctx[0] && __ctx[0].state);
    await run(cfg.after); const [ra] = await peak(800); r.afterRms = ra;
    await page.click('#mm-learn'); await page.waitForTimeout(150); r.learn = await page.evaluate(() => { const d = document.querySelector('#mm-learn-dlg'); return !d.classList.contains('mm-hide') && d.innerText.length > 400; }); await page.click('#mm-learn-dlg .mm-x');
    for (const [nm, key] of [['test.wav', 'wav'], ['test.aif', 'aif']]) {
      const n0 = await page.evaluate(() => __starts.length);
      await page.setInputFiles('#mm-files', path.join(__dirname, nm)); await page.waitForTimeout(400); await run(cfg.postLoad);
      const [sr] = await peak(cfg.sampleWait || 2500);
      r[key + 'Loaded'] = await page.evaluate(() => MM.S.samples.length === 1 && MM.S.samples[0].buf.duration > 1.4);
      r[key + 'Used'] = cfg.noSampleStart ? 'n/a' : await page.evaluate((n) => __starts.slice(n).some((d) => d >= 1.45 && d <= 1.55), n0);
      r[key + 'Rms'] = sr;
    }
    const dl = page.waitForEvent('download', { timeout: 8000 }).catch(() => null);
    await page.click('#mm-rec'); await page.waitForTimeout(1200); await page.click('#mm-rec');
    const d = await dl; if (d) { const p = path.join(__dirname, 'out.wav'); await d.saveAs(p); const b = fs.readFileSync(p); r.wav = b.slice(0, 4).toString() === 'RIFF' ? b.length : 'bad'; fs.unlinkSync(p); } else r.wav = 'none';
    if (cfg.ai) { await page.evaluate(() => localStorage.setItem('sr12.geminiKey', 'TEST')); await page.click('.mm-ai-ask'); await page.waitForTimeout(800); r.ai = await page.evaluate(() => MM.S.aiApplied === 1); await page.evaluate(() => localStorage.removeItem('sr12.geminiKey')); }
    await page.waitForTimeout(cfg.shotWait || 2500);
    await page.screenshot({ path: ROOT + '/screenshots/thumbs/' + file.replace('.html', '.png') });
    r.errors = errs;
    const ok = r.state === 'running' && r.rms > 0.003 && r.peak < 1.0 && r.learn && r.wavLoaded && r.aifLoaded && r.wavUsed !== false && r.aifUsed !== false && r.wavRms > 0.001 && typeof r.wav === 'number' && r.wav > 20000 && (!cfg.ai || r.ai) && !errs.length;
    if (!ok) fails++; console.log(ok ? 'PASS' : 'FAIL', JSON.stringify(r)); out.push({ ...r, ok });
    await bctx.close();
  }
  fs.writeFileSync(__dirname + '/results' + (only ? '-' + only.replace(/,/g, '_') : '') + '.json', JSON.stringify(out, null, 1));
  console.log(`${files.length - fails}/${files.length} passed`); await browser.close(); process.exit(fails ? 1 : 0);
})();
