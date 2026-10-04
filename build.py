# Builds index.html (standalone page for GitHub Pages or any static host) and artifact.html
# (the same page without doctype/head, for the claude.ai Artifact preview, whose host wraps it).
import pathlib
root = pathlib.Path(__file__).parent
page = (root / 'src/index.html').read_text()
page = page.replace('/*APP_CSS*/', (root / 'src/app.css').read_text())
page = page.replace('/*CODEMIRROR_CSS*/', (root / 'vendor/codemirror/codemirror.css').read_text())
(root / 'artifact.html').write_text(page)
head = '<!doctype html>\n<html lang="kk">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
title_end = page.index('</style>\n\n<header')
(root / 'index.html').write_text(head + page[:title_end + len('</style>\n')] + '</head>\n<body>\n' + page[title_end + len('</style>\n'):] + '\n</body>\n</html>\n')
print('built')
