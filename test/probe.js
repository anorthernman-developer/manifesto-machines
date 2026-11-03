// Probe a tool: node test/probe.js 87 "<js to run after play>" waitMs shot.png
const { chromium } = require('playwright-core'); const fs = require('fs'), path = require('path'); const ROOT = path.resolve(__dirname, '..');
(async () => {
  const exe = [process.env.HOME + '/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome', process.env.HOME + '/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome', '/usr/bin/google-chrome'].find((p) => fs.existsSync(p));
  const b = await chromium.launch({ executablePath: exe, headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
  const f = fs.readdirSync(ROOT + '/tools').find((x) => x.startsWith(process.argv[2])); const p = await (await b.newContext({ viewport: { width: 1280, height: 760 } })).newPage(); const errs = [];
  p.on('console', (m) => { if (m.type() === 'error' && !/fonts\.|ERR_INTERNET|ERR_NAME/.test(m.text())) errs.push(m.text()); if (m.type() === 'log' && process.env.V) console.log('LOG', m.text()); }); p.on('pageerror', (e) => errs.push('PAGEERROR ' + e.message));
  await p.goto('file://' + ROOT + '/tools/' + f); await p.waitForTimeout(400);
  const pre = process.argv[5]; if (pre) console.log('pre', JSON.stringify(await p.evaluate(pre)));
  await p.click('#mm-play'); const js = process.argv[3]; if (js && js !== '-') console.log('run', JSON.stringify(await p.evaluate(js)));
  await p.waitForTimeout(+process.argv[4] || 3000); const post = process.argv[6]; if (post) console.log('post', JSON.stringify(await p.evaluate(post)));
  await p.screenshot({ path: '/workspace/mm87/' + f.slice(0, 2) + '.png' }); console.log('errors', errs); await b.close();
})();
