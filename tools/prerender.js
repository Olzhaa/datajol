// Prerenders static, crawlable pages from content/*.js (called by build.py; needs node).
// Writes m/<module-id>/index.html for every module with lessons and sitemap.xml,
// and prints the landing module list (HTML) to stdout for build.py to put inside <main id="app">.
const vm = require('vm'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const SITE = 'https://olzhaa.github.io/datajol/';
const read = f => fs.readFileSync(path.join(root, f), 'utf8');

// Evaluate content files in the same order as the page's script tags.
const srcs = [...read('src/index.html').matchAll(/<script src="(content\/[^"?]+)"/g)].map(m => m[1]);
const ctx = { console }; ctx.window = ctx; vm.createContext(ctx);
for (const s of srcs) vm.runInContext(read(s), ctx, { filename: s });
const DJ = ctx.DJ;

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const text = h => String(h).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const clip = (s, n = 158) => s.length <= n ? s : s.slice(0, s.lastIndexOf(' ', n - 1)).replace(/[,:;—-]\s*$/, '') + '…';
const json = o => JSON.stringify(o).replace(/</g, '\\u003c');

// Kazakh search phrase per module (title keeps the English tool names people also search for).
const TOPIC = {
  'm0-1': 'Дерек әлеміне кіріспе', 'm0-2': 'Аналитикке арналған математика',
  'm1-1': 'Excel және Google Sheets қазақша', 'm1-2': 'SQL негіздері қазақша',
  'm2-1': 'Python негіздері қазақша', 'm2-2': 'pandas және NumPy қазақша', 'm2-3': 'Git және GitHub негіздері',
  'm3-1': 'Сипаттамалық статистика', 'm3-2': 'Деректі тазалау және EDA', 'm3-3': 'Күрделі SQL: CTE және window functions',
  'm3-4': 'Деректі визуализациялау', 'm3-5': 'Power BI қазақша', 'm3-6': 'Бизнес-аналитика және KPI',
  'm3-7': 'Дата аналитик портфолио жобасы', 'm4-1': 'Ықтималдық теориясы', 'm4-2': 'A/B тест және статистикалық қорытынды',
  'm4-3': 'Машиналық оқытуға арналған математика', 'm5-1': 'Машиналық оқыту негіздері', 'm5-2': 'Тәжірибедегі машиналық оқыту',
  'm5-3': 'Data Science қорытынды жобасы', 'm7-1': 'Мансап, резюме және сұхбатқа дайындық',
  'm6-1': 'Деректегі бағдарламалық инженерия: OOP, тесттер, REST API', 'm6-2': 'ML модельді деплой жасау: FastAPI және Docker',
  'm6-3': 'MLOps негіздері: MLflow, CI, мониторинг және drift', 'm6-4': 'Deep learning негіздері: нейрон желілер, PyTorch, CNN',
  'm6-5': 'Data engineering негіздері: warehouse, ETL, dbt, Spark', 'm6-6': 'ML қорытынды жобасы: end-to-end ML сервисі',
  'm6-g': 'Generative AI қазақша: LLM, prompt, RAG және агенттер'
};

const css = read('src/app.css');
const today = new Date().toISOString().slice(0, 10);
const urls = [SITE];
const list = [];

for (const p of DJ.phases) {
  const items = [];
  for (const m of p.modules) {
    const d = DJ.modules[m.id];
    const live = d && d.lessons && d.lessons.length;
    items.push(live
      ? `<li><a href="m/${m.id}/"><b>${esc(m.code)} ${esc(m.title)}</b></a> — ${esc(m.desc)}</li>`
      : `<li><b>${esc(m.code)} ${esc(m.title)}</b> — ${esc(m.desc)} <span class="muted">(жақында)</span></li>`);
    if (!live) continue;
    const url = SITE + 'm/' + m.id + '/';
    urls.push(url);
    const topic = TOPIC[m.id] || m.desc.split(',')[0];
    const title = `${topic} — ${m.code} ${m.title} | DataJol`;
    const intro = d.intro || m.desc;
    let desc = clip(text(intro));
    if (desc.length < 100) desc = clip(`${m.code} ${m.title}: ${desc}. Қазақша тегін сабақтар мен браузерде тексерілетін тапсырмалар.`);
    const ld = [{
      '@context': 'https://schema.org', '@type': 'Course', name: `${m.code} ${m.title}`, description: desc, url,
      inLanguage: 'kk', isAccessibleForFree: true,
      provider: { '@type': 'EducationalOrganization', name: 'DataJol', url: SITE },
      hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', courseWorkload: 'PT' + String(m.hours).split('–')[0] + 'H' }
    }, {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'DataJol', item: SITE },
        { '@type': 'ListItem', position: 2, name: `Кезең ${p.n}: ${p.kz}`, item: SITE + '#map' },
        { '@type': 'ListItem', position: 3, name: `${m.code} ${m.title}`, item: url }
      ]
    }];
    const lessons = d.lessons.map((l, i) => `<section id="${esc(l.id)}">
<h2>${i + 1}. ${esc(l.title)}</h2>
<div class="prose">${l.body || ''}</div>
<p><a href="../../#lesson/${m.id}/${i}">Сабақты интерактивті түрде ашу →</a></p>
</section>`).join('\n');
    const cta = `<a class="btn" href="../../#module/${m.id}">Тапсырмаларды орындау</a>`;
    const page = `<!doctype html>
<html lang="kk">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="kk_KZ">
<meta property="og:image" content="${SITE}assets/og.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0F766E">
<link rel="icon" href="../../assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap">
<script type="application/ld+json">${json(ld)}</script>
<style>
${css}
.static-page section { margin-top: 36px; }
.static-page h2 { font-size: 1.3rem; margin-bottom: 12px; }
.static-cta { margin: 18px 0 8px; }
.static-cta .btn { text-decoration: none; }
</style>
</head>
<body>
<header class="topbar"><div class="wrap"><a class="logo" href="../../" style="display:flex;align-items:center;gap:8px;font-weight:700;color:var(--ink);text-decoration:none"><img src="../../assets/favicon.svg" width="28" height="28" alt=""><span>DataJol</span></a></div></header>
<main class="wrap static-page">
<nav class="crumbs" aria-label="Breadcrumb"><a href="../../">DataJol</a> / Кезең ${p.n}: ${esc(p.kz)} / ${esc(m.code)}</nav>
<article class="reading">
<p class="eyebrow">${esc(m.code)} · ${esc(m.hours)} сағат · ${d.lessons.length} сабақ</p>
<h1>${esc(m.code)} ${esc(m.title)}: ${esc(topic)}</h1>
<p class="prose">${esc(text(intro))}</p>
<p class="static-cta">${cta}</p>
${lessons}
<p class="static-cta">${cta}</p>
</article>
<p class="muted" style="margin:40px 0"><a href="../../">← DataJol басты беті</a></p>
</main>
</body>
</html>
`;
    fs.mkdirSync(path.join(root, 'm', m.id), { recursive: true });
    fs.writeFileSync(path.join(root, 'm', m.id, 'index.html'), page);
  }
  list.push(`<section class="phase"><div class="phase-head"><h2>Кезең ${p.n} · ${esc(p.kz)}</h2><span class="muted">${esc(p.goal)}</span></div>
<ul style="margin:8px 0 0 20px;display:grid;gap:6px">${items.join('')}</ul></section>`);
}

fs.writeFileSync(path.join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`);
process.stdout.write(list.join('\n'));
