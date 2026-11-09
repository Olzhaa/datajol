// Checks a lesson translation file against its Kazakh course file.
// Run: node tools/i18n_check.js ru java   (checks content/i18n/ru/java.js against content/java.js)
//      node tools/i18n_check.js ru practice/java   (checks content/i18n/ru/practice/java.js against content/practice/java.js)
// Errors (exit 1): unknown or missing lessons, missing title/body, exercise lists of another length,
// changed code in check.tests or starter, a different number of <pre> blocks.
// Warnings: Kazakh-only letters left in the text (fine for values that stay Kazakh, such as city names or expected output).
const fs = require('fs'), vm = require('vm'), path = require('path');
const [lang, course] = process.argv.slice(2);
if (!lang || !course) { console.error('usage: node tools/i18n_check.js <ru|en> <course>'); process.exit(2); }
const root = path.join(__dirname, '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');

const ctx = { console }; ctx.window = ctx; vm.createContext(ctx);
vm.runInContext(read('content/curriculum.js'), ctx);
for (const f of ['content/datasets.js', 'content/csv.js', 'content/mldata.js', 'content/sheets.js']) vm.runInContext(read(f), ctx, { filename: f });
const PRACTICE = course.startsWith('practice/');
const before = new Set(Object.keys(ctx.DJ.modules));
vm.runInContext(read(`content/${course.replace(/^practice\//, '')}.js`), ctx, { filename: course });
if (PRACTICE) {
  ctx.DJ.addPractice = (mid, map) => { (ctx.DJ.modules[mid].lessons || []).forEach(l => { if (map[l.id]) l.practice = map[l.id]; }); };
  vm.runInContext(read(`content/${course}.js`), ctx, { filename: course });
}
const mods = Object.keys(ctx.DJ.modules).filter(id => !before.has(id) || ctx.DJ.modules[id].lessons);
const lessons = {};
for (const id of mods) for (const l of ctx.DJ.modules[id].lessons || []) if (!PRACTICE || (l.practice || []).length) lessons[l.id] = { l, mod: id };

let tr = null;
const t = { DJ: { i18n: { patch: p => { tr = p; } } } }; vm.createContext(t);
vm.runInContext(read(`content/i18n/${lang}/${course}.js`), t, { filename: `${lang}/${course}.js` });
if (!tr) { console.log('ERROR: the file never calls DJ.i18n.patch'); process.exit(1); }

const errors = [], warns = [];
const err = (w, m) => errors.push(`${w}: ${m}`), warn = (w, m) => warns.push(`${w}: ${m}`);
const KK = /[ӘәҒғҚқҢңӨөҰұҮүҺһІі]/;
const CYR = /[А-Яа-яЁё]/;
const strip = h => String(h).replace(/<pre[\s\S]*?<\/pre>/g, ' ').replace(/<code>[\s\S]*?<\/code>/g, ' ').replace(/<[^>]+>/g, ' ');
function text(w, s) {
  if (typeof s !== 'string') return;
  const plain = strip(s);
  const kk = plain.match(/\S*[ӘәҒғҚқҢңӨөҰұҮүҺһІі]\S*/g);
  if (kk) warn(w, 'Kazakh words left: ' + [...new Set(kk)].slice(0, 6).join(' '));
  if (lang === 'en' && CYR.test(plain.replace(/\S*[ӘәҒғҚқҢңӨөҰұҮүҺһІі]\S*/g, ''))) warn(w, 'Cyrillic left in English text: ' + (plain.match(/\S*[А-Яа-яЁё]\S*/g) || []).slice(0, 6).join(' '));
}
const count = (s, re) => (String(s || '').match(re) || []).length;
// Code before the assert message: everything up to the first `, "`, `, '` or `, f"` on the line.
const codePart = line => { const m = line.match(/,\s*f?["']/); return (m ? line.slice(0, m.index) : line).trim(); };
const noComments = s => String(s).split('\n').map(x => x.replace(/(#|\/\/|--).*$/, '').trimEnd()).filter(Boolean).join('\n');

if (PRACTICE && tr.modules) err('modules', 'a practice file translates lessons only');
for (const id in PRACTICE ? {} : tr.modules || {}) {
  if (!mods.includes(id)) err(id, 'module not in this course');
  text(id + '.intro', tr.modules[id].intro);
}
for (const id of mods) if (!PRACTICE && ctx.DJ.modules[id].intro && !(tr.modules || {})[id]) err(id, 'module intro not translated');
for (const id in tr.lessons || {}) if (!lessons[id]) err(id, 'no such lesson in content/' + course + '.js');
for (const id in lessons) {
  const { l } = lessons[id], x = (tr.lessons || {})[id];
  if (!x) { err(id, 'lesson not translated'); continue; }
  if (PRACTICE && (x.title || x.body || x.ex)) err(id, 'a practice file has only pr: [...]');
  if (!PRACTICE && !x.title) err(id, 'no title');
  if (!PRACTICE && l.body && !x.body) err(id, 'no body');
  text(id + '.title', x.title); text(id + '.body', x.body);
  if (x.body && count(l.body, /<pre/g) !== count(x.body, /<pre/g)) err(id, `<pre> blocks: ${count(l.body, /<pre/g)} in Kazakh, ${count(x.body, /<pre/g)} here`);
  const exs = (PRACTICE ? l.practice : l.exercises) || [], tx = (PRACTICE ? x.pr : x.ex) || [];
  if (tx.length > exs.length) err(id, `${PRACTICE ? 'pr' : 'ex'} has ${tx.length} entries, the lesson has ${exs.length}`);
  exs.forEach((e, i) => {
    const w = `${id} ${PRACTICE ? 'pr' : 'ex'}[${i}]`, y = tx[i];
    const needs = ['prompt', 'hints', 'options', 'explain', 'criteria'].some(k => e[k] && JSON.stringify(e[k]).match(CYR));
    if (!y) { if (needs) err(w, 'not translated'); return; }
    if (e.prompt && !y.prompt) err(w, 'no prompt');
    if (e.title && !y.title) err(w, 'no title'); text(w + '.title', y.title);
    text(w + '.prompt', y.prompt); text(w + '.explain', y.explain); text(w + '.done', y.done);
    (y.hints || []).forEach((h, j) => text(`${w}.hints[${j}]`, h));
    if (e.hints && y.hints && y.hints.length !== e.hints.length) err(w, `hints: ${e.hints.length} in Kazakh, ${y.hints.length} here`);
    if (e.options && y.options) {
      if (y.options.length !== e.options.length) err(w, `options: ${e.options.length} in Kazakh, ${y.options.length} here`);
      y.options.forEach((o, j) => text(`${w}.options[${j}]`, o));
    }
    if (e.options && !y.options && JSON.stringify(e.options).match(KK)) err(w, 'options not translated');
    if (y.criteria) {
      if (!e.criteria || y.criteria.length !== e.criteria.length) err(w, 'criteria count differs');
      else y.criteria.forEach((c, j) => { if ((c.levels || []).length !== (e.criteria[j].levels || []).length) err(w, `criteria[${j}].levels count differs`); });
    }
    if (y.solution !== undefined || y.answer !== undefined || y.accept !== undefined) err(w, 'solution/answer/accept must not be translated (they are checked)');
    if (y.check) {
      const keys = Object.keys(y.check).filter(k => k !== 'tests');
      if (keys.length) err(w, 'only check.tests may be translated, found ' + keys.join(','));
      if (y.check.tests !== undefined) {
        const a = String(e.check && e.check.tests || '').split('\n'), b = String(y.check.tests).split('\n');
        if (a.length !== b.length) err(w, 'check.tests: line count differs');
        else a.forEach((ln, j) => { if (codePart(ln) !== codePart(b[j])) err(w, `check.tests line ${j + 1}: code changed: ${codePart(b[j]).slice(0, 80)}`); });
      }
    }
    if (y.starter !== undefined && noComments(y.starter) !== noComments(e.starter || '')) err(w, 'starter: code changed (only comments may be translated)');
  });
}
warns.forEach(w => console.log('warn  ' + w));
errors.forEach(e => console.log('ERROR ' + e));
console.log(`${lang}/${course}: ${Object.keys(lessons).length} lessons, ${errors.length} errors, ${warns.length} warnings`);
process.exit(errors.length ? 1 : 0);
