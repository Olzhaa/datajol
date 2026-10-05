# Builds index.html (standalone page for GitHub Pages or any static host) and artifact.html
# (the same page without doctype/head, for the claude.ai Artifact preview, whose host wraps it).
# Also runs tools/prerender.js (needs node): m/<module>/index.html, sitemap.xml and the static landing list.
import hashlib, html, json, pathlib, re, subprocess
root = pathlib.Path(__file__).parent
SITE = 'https://olzhaa.github.io/datajol/'

# Static, crawlable module list for the landing markup inside <main id="app">.
modules_html = subprocess.run(['node', str(root / 'tools/prerender.js')], check=True, capture_output=True, text=True).stdout

# Short content hash of everything the page loads, for cache busting.
h = hashlib.sha256()
for d in ('js', 'content', 'vendor'):
    for f in sorted((root / d).rglob('*')):
        if f.is_file():
            h.update(str(f.relative_to(root)).encode()); h.update(f.read_bytes())
version = h.hexdigest()[:10]

page = (root / 'src/index.html').read_text()
page = page.replace('/*APP_CSS*/', (root / 'src/app.css').read_text())
page = page.replace('/*CODEMIRROR_CSS*/', (root / 'vendor/codemirror/codemirror.css').read_text())
page = page.replace('<!--MODULE_LIST-->', modules_html)
# The artifact host serves files by exact path, so ?v= (and DJ_VERSION, which versions the Python worker URL) is only added to the GitHub Pages build.
(root / 'artifact.html').write_text(page)
first_script = page.index('<script src=')
page = page[:first_script] + f"<script>window.DJ_VERSION = '{version}';</script>\n" + page[first_script:]
page = re.sub(r'<script src="((?:js|content|vendor)/[^"?]+)"', rf'<script src="\1?v={version}"', page)

title = 'DataJol — дата аналитика, SQL және Python қазақша'
desc = ('Дата аналитика мен Data Science-ті қазақша тегін үйреніңіз: SQL, Python, Excel, Power BI, '
        'статистика және ML. Тапсырмалар браузерде бірден тексеріледі.')
favicon = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="9" fill="#0F766E"/>'
           '<rect x="7" y="17" width="4" height="8" rx="1.5" fill="#fff"/><rect x="14" y="12" width="4" height="13" rx="1.5" fill="#fff"/>'
           '<rect x="21" y="15" width="4" height="10" rx="1.5" fill="#fff"/><circle cx="23" cy="8" r="3" fill="#F5B451"/></svg>')
favicon_uri = 'data:image/svg+xml,' + favicon.replace('"', "'").replace('#', '%23').replace('<', '%3C').replace('>', '%3E')
ld = json.dumps({'@context': 'https://schema.org', '@type': 'EducationalOrganization', 'name': 'DataJol', 'url': SITE,
                 'logo': SITE + 'assets/favicon.svg', 'inLanguage': 'kk', 'description': desc}, ensure_ascii=False)
e = html.escape
head = f'''<!doctype html>
<html lang="kk">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<link rel="canonical" href="{SITE}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="DataJol">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:url" content="{SITE}">
<meta property="og:locale" content="kk_KZ">
<meta property="og:image" content="{SITE}assets/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0F766E">
<link rel="icon" href="{favicon_uri}" type="image/svg+xml">
<script type="application/ld+json">{ld}</script>
'''
title_end = page.index('</style>\n\n<header')
(root / 'index.html').write_text(head + page[:title_end + len('</style>\n')] + '</head>\n<body>\n' + page[title_end + len('</style>\n'):] + '\n</body>\n</html>\n')
print('built', version)
