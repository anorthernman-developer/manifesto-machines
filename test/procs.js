// quick functional check: each process of a tool runs without errors and makes sound; reports state
const { chromium } = require('playwright-core'); const ROOT = require('path').resolve(__dirname, '..');
(async () => { const [file, js] = process.argv.slice(2); const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
  const p = await b.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto('file://' + ROOT + '/tools/' + file); await p.waitForTimeout(300); await p.keyboard.press('Space'); await p.waitForTimeout(500);
  const out = await p.evaluate(js); console.log(JSON.stringify({ out, errs })); await b.close(); })();
