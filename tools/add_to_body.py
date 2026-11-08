# Appends HTML to the end of lesson bodies in a course file.
# Usage: python3 tools/add_to_body.py content/<course>.js additions.json
# additions.json: {"<lesson id>": "<html to append>", ...}. Each lesson must exist and have a template-literal body.
import json, re, sys

path, adds = sys.argv[1], json.load(open(sys.argv[2], encoding='utf-8'))
src = open(path, encoding='utf-8').read()
for lid, html in adds.items():
    m = re.search(r"id:\s*'" + re.escape(lid) + r"'", src)
    if not m:
        sys.exit(f'{lid}: lesson not found in {path}')
    b = re.compile(r'body:\s*(?:P|String\.raw)?`').search(src, m.end())
    if not b:
        sys.exit(f'{lid}: no template-literal body')
    i = b.end()
    while True:   # the closing backtick: the first one that is not escaped
        j = src.index('`', i)
        k = j - 1
        n = 0
        while src[k] == '\\':
            n += 1; k -= 1
        if n % 2 == 0:
            break
        i = j + 1
    if '`' in html or '${' in html:
        sys.exit(f'{lid}: the added HTML must not contain a backtick or ${{')
    src = src[:j] + '\n' + html.strip() + src[j:]
open(path, 'w', encoding='utf-8').write(src)
print(f'{path}: {len(adds)} lessons extended')
