// Page weight budget and an automatic accessibility scan (axe-core) of the main screens.
// Needs the site served on BASE_URL (default http://localhost:8765/) and `npm i --no-save playwright axe-core`.
// Fails when the scripts the page loads up front exceed BUDGET_KB gzip, or axe finds a serious/critical issue.
const fs = require('fs'), path = require('path'), zlib = require('zlib');
const { chromium, devices } = require('playwright');
const root = path.join(__dirname, '..');
const BASE = process.env.BASE_URL || 'http://localhost:8765/';
const BUDGET_KB = Number(process.env.BUDGET_KB || 200);

// 1. Budget: every <script src> of index.html, gzip -9, as a static host would serve it.
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const srcs = [...html.matchAll(/<script src="([^"?]+)/g)].map(m => m[1]);
const gz = srcs.reduce((n, s) => n + zlib.gzipSync(fs.readFileSync(path.join(root, s)), { level: 9 }).length, 0);
console.log(`initial scripts: ${srcs.length} files, ${(gz / 1024).toFixed(1)} KB gzip (budget ${BUDGET_KB} KB)`);
let failed = gz > BUDGET_KB * 1024;
if (failed) console.log('::error::Initial JavaScript is over budget. Load new course content on demand (see content/index.js).');

// 2. axe on the screens a new learner sees, desktop and phone.
(async () => {
  const axe = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
  const b = await chromium.launch();
  for (const [name, opts] of [['desktop', { viewport: { width: 1280, height: 860 } }], ['phone', devices['iPhone 13']]]) {
    const pg = await (await b.newContext({ ...opts, bypassCSP: true })).newPage();   // axe is injected inline
    await pg.goto(BASE + 'index.html');
    const screens = [['auth', null], ['lesson', () => pg.click('#guest').then(() => pg.waitForSelector('.CodeMirror'))],
      ['dash', '#'], ['catalog', '#catalog'], ['map', '#map'], ['module', '#module/m1-2'], ['profile', '#profile']];
    for (const [label, how] of screens) {
      if (typeof how === 'function') await how();
      else if (how) { await pg.evaluate(h => { location.hash = h; }, how); await pg.waitForTimeout(400); }
      await pg.addScriptTag({ content: axe });
      const res = await pg.evaluate(() => axe.run(document, { resultTypes: ['violations'] }));
      const bad = res.violations.filter(v => v.impact === 'serious' || v.impact === 'critical');
      for (const v of bad) {
        failed = true;
        console.log(`::error::${name}/${label}: ${v.id} (${v.impact}) ${v.help} — ${v.nodes.slice(0, 3).map(n => n.target.join(' ')).join(' | ')}`);
      }
      if (!bad.length) console.log(`${name}/${label}: ok`);
    }
  }
  await b.close();
  process.exit(failed ? 1 : 0);
})();
