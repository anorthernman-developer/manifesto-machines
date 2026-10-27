// Deep-instrument checks for tools with the MMX deck (52+): slot loading (WAV + AIFF into a named slot), reverse, presets
// (save, change, load, export JSON, import JSON), the deck and key sheet, MIDI enable without errors, a simulated MIDI note,
// a 10 s soak for level and errors, then a screenshot with the deck open.
const { chromium } = require('playwright-core'); const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..'), only = process.argv[2] || '52';
(async () => {
  const exe = ['/usr/bin/google-chrome'].find((p) => fs.existsSync(p));
  const browser = await chromium.launch({ executablePath: exe, headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
  const files = fs.readdirSync(ROOT + '/tools').filter((f) => only.split(',').some((o) => f.startsWith(o))).sort(); let fails = 0;
  for (const file of files) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 760 }, acceptDownloads: true }); const page = await ctx.newPage(), errs = [];
    page.on('console', (m) => { if (m.type() === 'error' && !/fonts\.(googleapis|gstatic)|ERR_INTERNET|ERR_NAME/.test(m.text())) errs.push(m.text()); }); page.on('pageerror', (e) => errs.push('PAGEERROR ' + e.message));
    await page.addInitScript(() => { window.__ctx = []; const AC = window.AudioContext; window.AudioContext = class extends AC { constructor(...a) { super(...a); __ctx.push(this); this.__an = this.createAnalyser(); } }; const oc = AudioNode.prototype.connect; AudioNode.prototype.connect = function (d, ...r) { if (d instanceof AudioDestinationNode && this.context.__an && this !== this.context.__an) oc.call(this, this.context.__an); return oc.call(this, d, ...r); }; window.__lvl = () => { const c = __ctx[0], d = new Float32Array(2048); c.__an.getFloatTimeDomainData(d); let s = 0, p = 0; for (const x of d) { s += x * x; p = Math.max(p, Math.abs(x)); } return [Math.sqrt(s / d.length), p]; }; });
    await page.goto('file://' + ROOT + '/tools/' + file); await page.waitForTimeout(400); const r = { file };
    await page.click('#mm-play'); await page.waitForTimeout(500);
    await page.keyboard.press('d'); await page.waitForTimeout(150); r.deckOpen = await page.evaluate(() => !document.querySelector('#mmx-deck').classList.contains('mmx-hide'));
    const nslots = await page.evaluate(() => MMX.S.slots.length); r.slots = nslots;
    const si = Math.min(1, nslots - 1);
    await page.setInputFiles(`.mmx-slot[data-i="${si}"] input.mmx-file`, path.join(__dirname, 'test.aif')); await page.waitForTimeout(500);
    r.aifSlot = await page.evaluate((i) => { const s = MMX.S.slots[i]; return !!s.buf && Math.abs(s.buf.duration - 1.5) < 0.05; }, si);
    await page.setInputFiles(`.mmx-slot[data-i="0"] input.mmx-file`, path.join(__dirname, 'test.wav')); await page.waitForTimeout(500);
    r.wavSlot = await page.evaluate(() => !!MMX.S.slots[0].buf && Math.abs(MMX.S.slots[0].buf.duration - 1.5) < 0.05);
    await page.check('.mmx-slot[data-i="0"] input[data-k="rev"]'); r.reverse = await page.evaluate(() => { const a = MMX.S.slots[0].buf.getChannelData(0), b = MMX.buf(0).getChannelData(0); return MMX.S.slots[0].rev && Math.abs(a[0] - b[b.length - 1]) < 1e-6 && Math.abs(a[1000] - b[b.length - 1001]) < 1e-6; });
    // slot params
    await page.evaluate(() => { const s = MMX.S.slots[0]; s.pitch = 5; s.start = 0.1; s.end = 0.8; s.gain = 1.1; });
    // presets
    const keys = await page.evaluate(() => Object.entries(MMX.S.state).filter(([k, v]) => typeof v === 'number').map(([k]) => k));
    const k0 = keys[0]; const orig = await page.evaluate((k) => MMX.S.state[k], k0);
    await page.evaluate(() => MMX.deck(true, 'PRESETS')); await page.fill('#mmx-pname', 'test-preset'); await page.click('#mmx-psave');
    await page.evaluate((k) => { MMX.setParam(k, MMX.S.state[k] + 1); MMX.S.slots[0].pitch = -3; }, k0);
    await page.selectOption('#mmx-psel', 'test-preset'); await page.click('#mmx-pload');
    r.presetLoad = await page.evaluate(([k, v]) => MMX.S.state[k] === v && MMX.S.slots[0].pitch === 5 && MMX.S.slots[0].start === 0.1 && MMX.S.slots[0].rev === true, [k0, orig]);
    r.factoryPresets = await page.evaluate(() => [...document.querySelectorAll('#mmx-psel option')].length);
    const dl = page.waitForEvent('download', { timeout: 5000 }).catch(() => null); await page.click('#mmx-pexp'); const d = await dl; let json = null;
    if (d) { const p = path.join(__dirname, 'preset.json'); await d.saveAs(p); json = JSON.parse(fs.readFileSync(p, 'utf8')); r.exportOk = json.name === 'test-preset' && json.slots.length === nslots;
      json.name = 'imported'; json.params[k0] = orig + 2 <= 1e9 ? json.params[k0] : json.params[k0]; fs.writeFileSync(p, JSON.stringify(json)); await page.evaluate((k) => MMX.setParam(k, MMX.S.state[k] + 1), k0);
      await page.setInputFiles('#mmx-pimp', p); await page.waitForTimeout(300); r.importOk = await page.evaluate(([k, v]) => MMX.S.state[k] === v && !!JSON.parse(localStorage.getItem('mm.presets.' + MM_META.no)).imported, [k0, orig]); fs.unlinkSync(p); } else r.exportOk = false;
    // key sheet + MIDI
    await page.keyboard.press('Escape'); await page.evaluate(() => document.activeElement && document.activeElement.blur()); await page.keyboard.press('?'); await page.waitForTimeout(100); r.keySheet = await page.evaluate(() => document.querySelector('.mmx-pane[data-t="KEYS"]').style.display !== 'none' && document.querySelectorAll('.mmx-keys tr').length > 5);
    await page.evaluate(() => MMX.deck(true, 'MIDI')); await page.click('#mmx-midi'); await page.waitForTimeout(400); r.midiStatus = await page.evaluate(() => document.querySelector('#mmx-mst').textContent);
    await page.evaluate(() => { MMX.onMidi({ data: [0x90, 60, 100] }); MMX.onMidi({ data: [0x90, 38, 100] }); MMX.onMidi({ data: [0x80, 60, 0] }); });
    // soak
    await page.evaluate(() => MMX.deck(false)); let m = 0, pk = 0, quiet = 0; for (let i = 0; i < 50; i++) { await page.waitForTimeout(200); const [a, b] = await page.evaluate(() => __lvl()); m = Math.max(m, a); pk = Math.max(pk, b); if (a < 0.002) quiet++; }
    r.soakRms = +m.toFixed(3); r.soakPeak = +pk.toFixed(3); r.quietFrames = quiet;
    await page.evaluate(() => MMX.deck(true, 'SOUNDS')); await page.waitForTimeout(300); await page.screenshot({ path: ROOT + '/screenshots/' + file.replace('.html', '-deck.png') });
    await page.evaluate(() => MMX.deck(false)); await page.waitForTimeout(200); await page.screenshot({ path: ROOT + '/screenshots/' + file.replace('.html', '.png') });
    r.errors = errs; const ok = r.deckOpen && r.aifSlot && r.wavSlot && r.reverse && r.presetLoad && r.exportOk && r.importOk && r.keySheet && r.soakRms > 0.01 && r.soakPeak < 1 && !errs.length;
    if (!ok) fails++; console.log(ok ? 'PASS' : 'FAIL', JSON.stringify(r)); await ctx.close();
  }
  await browser.close(); process.exit(fails ? 1 : 0);
})();
