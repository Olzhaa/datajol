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

# Service worker: app files cached per version, vendor/ (Pyodide, compilers) per vendor hash so it downloads once.
hv = hashlib.sha256()
for f in sorted((root / 'vendor').rglob('*')):
    if f.is_file():
        hv.update(str(f.relative_to(root)).encode()); hv.update(f.read_bytes())
(root / 'sw.js').write_text((root / 'src/sw.js').read_text().replace('__VERSION__', version).replace('__VENDOR__', hv.hexdigest()[:10]))

page = (root / 'src/index.html').read_text()
page = page.replace('/*APP_CSS*/', (root / 'src/app.css').read_text())
page = page.replace('/*CODEMIRROR_CSS*/', (root / 'vendor/codemirror/codemirror.css').read_text())
page = page.replace('<!--MODULE_LIST-->', modules_html)
# The artifact host serves files by exact path, so ?v= (and DJ_VERSION, which versions the Python worker URL) is only added to the GitHub Pages build.
(root / 'artifact.html').write_text(page)
first_script = page.index('<script src=')
inline = f"window.DJ_VERSION = '{version}';"
page = page[:first_script] + f"<script>{inline}</script>\n" + page[first_script:]
# Content Security Policy for the GitHub Pages page. Workers (Python, Java, C++) get no CSP from a meta tag,
# so only the page's own needs are listed: sql.js compiles WebAssembly, styles are inline, Supabase is the only API.
import base64
csp = '; '.join([
    "default-src 'self'",
    "script-src 'self' 'wasm-unsafe-eval' 'sha256-" + base64.b64encode(hashlib.sha256(inline.encode()).digest()).decode() + "'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob:",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
    "worker-src 'self' blob:",
    "object-src 'none'", "base-uri 'self'", "form-action 'self'"])
page = re.sub(r'<script src="((?:js|content|vendor)/[^"?]+)"', rf'<script src="\1?v={version}"', page)

title = 'Tolqyn — бағдарламалау мен дата ғылымын қазақша ойнап үйрен'
desc = ('Python, SQL, Java, C++, алгоритмдер, дата аналитика және ML-ді қазақша тегін үйреніңіз. '
        'Тапсырмалар браузерде бірден тексеріледі, XP, деңгей мен streak бар.')
favicon = (root / 'assets/favicon.svg').read_text().strip()
favicon_uri = 'data:image/svg+xml,' + favicon.replace('"', "'").replace('#', '%23').replace('<', '%3C').replace('>', '%3E')
ld = json.dumps({'@context': 'https://schema.org', '@type': 'EducationalOrganization', 'name': 'Tolqyn', 'url': SITE,
                 'logo': SITE + 'assets/favicon.svg', 'inLanguage': 'kk', 'description': desc}, ensure_ascii=False)
e = html.escape
head = f'''<!doctype html>
<html lang="kk">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta http-equiv="Content-Security-Policy" content="{csp}">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<link rel="canonical" href="{SITE}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Tolqyn">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:url" content="{SITE}">
<meta property="og:locale" content="kk_KZ">
<meta property="og:image" content="{SITE}assets/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0E0B26">
<meta name="google-site-verification" content="l_U-4sfewaJLofvtbXVWj0JbSObWigipLcgbEoYuwRo">
<link rel="icon" href="{favicon_uri}" type="image/svg+xml">
<script type="application/ld+json">{ld}</script>
'''
title_end = page.index('</style>\n\n<header')
(root / 'index.html').write_text(head + page[:title_end + len('</style>\n')] + '</head>\n<body>\n' + page[title_end + len('</style>\n'):] + '\n</body>\n</html>\n')
print('built', version)
