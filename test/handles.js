// Drag the START and END handles on each slot waveform in the deck and check the slot's start/end change; VJ toggle check.
const { chromium } = require('playwright-core'); const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..'), only = process.argv[2] || '82';
(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
  const files = fs.readdirSync(ROOT + '/tools').filter((f) => only.split(',').some((o) => f.startsWith(o))).sort(); let fails = 0;
  for (const file of files) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 760 } }); const page = await ctx.newPage(), errs = [];
    page.on('pageerror', (e) => errs.push(e.message));
    await page.goto('file://' + ROOT + '/tools/' + file); await page.waitForTimeout(400); await page.click('#mm-play'); await page.waitForTimeout(300);
    await page.keyboard.press('d'); await page.waitForTimeout(200);
    await page.evaluate(() => MMX.deck(true, 'SOUNDS')); await page.waitForTimeout(100);
    const wave = page.locator('.mmx-slot[data-i="0"] .mmx-wave').first(); await wave.scrollIntoViewIfNeeded(); const b = await wave.boundingBox();
    const before = await page.evaluate(() => [MMX.S.slots[0].start, MMX.S.slots[0].end]);
    const y = b.y + b.height / 2;
    await page.mouse.move(b.x + b.width * before[0] + 1, y); await page.mouse.down(); await page.mouse.move(b.x + b.width * 0.25, y, { steps: 5 }); await page.mouse.up();
    await page.mouse.move(b.x + b.width * before[1] - 1, y); await page.mouse.down(); await page.mouse.move(b.x + b.width * 0.7, y, { steps: 5 }); await page.mouse.up();
    const after = await page.evaluate(() => [MMX.S.slots[0].start, MMX.S.slots[0].end]);
    await page.keyboard.press('Escape'); await page.keyboard.press('f'); await page.waitForTimeout(200); const vj = await page.evaluate(() => MMX.vjOn); await page.keyboard.press('Escape');
    const ok = Math.abs(after[0] - 0.25) < 0.03 && Math.abs(after[1] - 0.7) < 0.03 && !errs.length;
    if (!ok) fails++; console.log(ok ? 'PASS' : 'FAIL', JSON.stringify({ file, before, after, vj, errs }));
    await ctx.close();
  }
  await browser.close(); process.exit(fails ? 1 : 0);
})();
