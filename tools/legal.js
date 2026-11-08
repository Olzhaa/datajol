// Builds the legal pages (called by build.py; needs node): legal/<doc>.html (Kazakh), legal/<doc>.ru.html, legal/<doc>.en.html
// from legal/src/<doc>.<lang>.html and the site owner's details in legal/src/site.json.
// Placeholders in the sources: {{OWNER}} {{STATUS}} {{CITY}} {{EMAIL}} {{UPDATED}}, {{L:<doc>}} (link to another legal page
// in the same language) and {{ROOT}} (the site root, relative to legal/). Prints the page URLs, one per line, for the sitemap.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const SITE = 'https://olzhaa.github.io/datajol/';
const site = JSON.parse(fs.readFileSync(path.join(root, 'legal/src/site.json'), 'utf8'));
const LANGS = ['kk', 'ru', 'en'];
const SHORT = { kk: 'ҚАЗ', ru: 'РУС', en: 'ENG' };
const NAMES = {
  privacy: { kk: 'Құпиялық саясаты', ru: 'Политика конфиденциальности', en: 'Privacy policy' },
  terms: { kk: 'Пайдалану шарттары', ru: 'Условия использования', en: 'Terms of use' },
  cookies: { kk: 'Cookie және браузер жады', ru: 'Cookie и память браузера', en: 'Cookies and browser storage' },
  licenses: { kk: 'Лицензиялар', ru: 'Лицензии', en: 'Licences' }
};
const UI = {
  back: { kk: '← Tolqyn-ға оралу', ru: '← Вернуться в Tolqyn', en: '← Back to Tolqyn' },
  docs: { kk: 'Құжаттар', ru: 'Документы', en: 'Documents' },
  lang: { kk: 'Тіл', ru: 'Язык', en: 'Language' },
  owner: { kk: 'Сайт иесі', ru: 'Владелец сайта', en: 'Site owner' }
};
const file = (doc, lang) => doc + (lang === 'kk' ? '' : '.' + lang) + '.html';
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const css = fs.readFileSync(path.join(root, 'src/app.css'), 'utf8');
const urls = [];

fs.mkdirSync(path.join(root, 'legal'), { recursive: true });
for (const doc of site.docs) for (const lang of LANGS) {
  const src = path.join(root, 'legal/src', `${doc}.${lang}.html`);
  if (!fs.existsSync(src)) { if (lang === 'kk') throw new Error('missing ' + src); continue; }
  const body = fs.readFileSync(src, 'utf8')
    .replace(/\{\{L:(\w+)\}\}/g, (m, d) => { if (!site.docs.includes(d)) throw new Error(`${src}: unknown link ${m}`); return file(d, lang); })
    .replace(/\{\{(OWNER|STATUS|CITY)\}\}/g, (m, k) => esc(site[k.toLowerCase()][lang]))
    .replace(/<table>/g, '<table tabindex="0">').replace(/\{\{EMAIL\}\}/g, esc(site.email)).replace(/\{\{UPDATED\}\}/g, site.updated).replace(/\{\{ROOT\}\}/g, '../');
  const left = body.match(/\{\{[^}]*\}\}/);
  if (left) throw new Error(`${src}: unknown placeholder ${left[0]}`);
  const title = NAMES[doc][lang];
  const url = SITE + 'legal/' + file(doc, lang);
  urls.push(url);
  const alt = LANGS.filter(l => fs.existsSync(path.join(root, 'legal/src', `${doc}.${l}.html`)))
    .map(l => `<link rel="alternate" hreflang="${l}" href="${SITE}legal/${file(doc, l)}">`).join('\n');
  const page = `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} · Tolqyn</title>
<meta name="description" content="${esc(title)}: Tolqyn">
<link rel="canonical" href="${url}">
${alt}
<meta name="theme-color" content="#0E0B26">
<link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="../assets/fonts.css">
<script>try { var t = localStorage.getItem('dj.theme'); if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t; } catch (e) {}</script>
<style>
${css}
.legal { padding: 24px 0 64px; }
.legal article { max-width: 78ch; }
.legal h1 { font-size: 1.8rem; margin: 8px 0 6px; }
.legal h2 { font-size: 1.2rem; margin: 30px 0 10px; }
.legal p, .legal ul { margin: 0 0 14px; line-height: 1.6; }
.legal li { margin-bottom: 6px; }
.legal a { color: var(--link); }
.legal table { border-collapse: collapse; margin: 0 0 16px; font-size: .92rem; display: block; overflow-x: auto; }
.legal th, .legal td { border-bottom: 1px solid var(--line); padding: 8px 14px 8px 0; text-align: left; vertical-align: top; }
.legal th { font-weight: 600; color: var(--ink-2); }
.legal-nav { display: flex; flex-wrap: wrap; gap: 8px 16px; margin: 0 0 18px; font-size: .92rem; }
.legal-nav a[aria-current] { color: var(--ink); font-weight: 600; text-decoration: none; }
.legal-langs { display: flex; gap: 10px; margin-left: auto; font-size: .85rem; }
.legal-langs a { color: var(--ink-2); }
.legal-langs a[aria-current] { color: var(--ink); font-weight: 700; text-decoration: none; }
.legal-foot { margin-top: 40px; padding-top: 16px; border-top: 1px solid var(--line); font-size: .9rem; color: var(--ink-2); }
</style>
</head>
<body>
<a class="skip-link" href="#doc">${lang === 'kk' ? 'Мазмұнға өту' : lang === 'ru' ? 'Перейти к содержанию' : 'Skip to content'}</a>
<header class="topbar"><div class="wrap" style="display:flex;align-items:center;gap:12px">
<a class="logo" href="../" aria-label="Tolqyn" style="display:flex;align-items:center;gap:8px;font-weight:700;color:var(--ink);text-decoration:none"><img src="../assets/favicon.svg" width="28" height="28" alt=""><span class="wordmark">TOLQYN</span></a>
<nav class="legal-langs" aria-label="${UI.lang[lang]}">${LANGS.filter(l => fs.existsSync(path.join(root, 'legal/src', `${doc}.${l}.html`))).map(l => `<a href="${file(doc, l)}" hreflang="${l}" lang="${l}"${l === lang ? ' aria-current="page"' : ''}>${SHORT[l]}</a>`).join('')}</nav>
</div></header>
<main class="wrap legal" id="doc" tabindex="-1">
<nav class="legal-nav" aria-label="${UI.docs[lang]}">${site.docs.map(d => `<a href="${file(d, lang)}"${d === doc ? ' aria-current="page"' : ''}>${esc(NAMES[d][lang])}</a>`).join('')}</nav>
<article>
${body.trim()}
</article>
<footer class="legal-foot">
<p>${UI.owner[lang]}: ${esc(site.owner[lang])} (${esc(site.status[lang])}), ${esc(site.city[lang])} · <a href="mailto:${esc(site.email)}">${esc(site.email)}</a></p>
<p><a href="../">${UI.back[lang]}</a></p>
</footer>
</main>
</body>
</html>
`;
  fs.writeFileSync(path.join(root, 'legal', file(doc, lang)), page);
}
process.stdout.write(urls.join('\n'));
