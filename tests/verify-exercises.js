// Checks every exercise in the browser: each reference solution must pass and each starter must fail.
// Run: python3 -m http.server 8765 (in the repo root), then `node tests/verify-exercises.js`.
// Needs the `playwright` package; set CHROMIUM_PATH if Playwright cannot find a browser.
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const pg = await b.newPage({ viewport: { width: 1280, height: 900 } });
  const errs = []; pg.on('pageerror', e => errs.push(e.message));
  await pg.goto((process.env.BASE_URL || 'http://localhost:8765/') + 'index.html');
  await pg.fill('[name=name]', 'Т'); await pg.fill('[name=username]', 'user' + Date.now() % 100000); await pg.fill('[name=pw]', 'secret12');
  await pg.click('#auth-submit'); await pg.waitForSelector('.continue');
  // MODULES=m6-1,m6-2 limits the run to those modules.
  const only = (process.env.MODULES || '').split(',').filter(Boolean);
  const res = await pg.evaluate(async (only) => {
    const out = { pass: 0, fail: [], starterPass: [], quiz: 0 };
    for (const id of Object.keys(DJ.modules).filter(m => !only.length || only.includes(m))) for (const l of DJ.modules[id].lessons) for (const [i, ex] of (l.exercises || []).entries()) {
      if (ex.type === 'quiz') { if (!(ex.answer < ex.options.length)) out.fail.push(l.id + '#' + i + ' bad answer idx'); out.quiz++; continue; }
      if (ex.type === 'number' || ex.type === 'cmd' || ex.type === 'rubric') { out.quiz++; continue; }
      if (ex.type === 'sheet') { const r = DJ.sheet.check(ex, ex.solution); if (r.pass) out.pass++; else out.fail.push(l.id + '#' + i + ' ' + r.msg); continue; }
      const R = DJ.run[ex.type === 'sql' ? 'sql' : 'py'];
      const r = await R.check(ex, ex.solution);
      if (r.pass) out.pass++; else out.fail.push(l.id + '#' + i + ' ' + r.msg + ' ' + (r.trace || ''));
      const s = await R.check(ex, ex.starter || '');
      if (s.pass) out.starterPass.push(l.id + '#' + i);
    }
    return out;
  }, only);
  console.log(JSON.stringify(res));
  console.log('errors', errs);
  await b.close();
  if (res.fail.length || res.starterPass.length || errs.length) process.exitCode = 1;
})();
