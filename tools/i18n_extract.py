# Lists the Kazakh interface phrases in the JS sources, in the form the runtime translator (js/i18n.js) looks up:
# HTML tags and " · " split a phrase, and every ${...} becomes {}. Run: python3 tools/i18n_extract.py > /tmp/keys.txt
# Lesson content is not listed: it is translated per lesson in content/i18n/.
import re, sys, pathlib, json
root = pathlib.Path(__file__).resolve().parent.parent
FILES = ['js/app.js', 'js/lesson.js', 'js/i18n.js', 'js/game.js', 'js/store.js', 'js/cloud.js', 'js/runners.js', 'js/sheet.js',
         'content/curriculum.js', 'content/catalog.js', 'js/py-worker.js', 'content/datasets.js']
CYR = re.compile(r'[А-Яа-яӘәҒғҚқҢңӨөҰұҮүІіҺһЁё]')

def scan_string(src, i, out):
    """src[i] is a quote. Appends the literal's text (with {} for ${...}) to out; returns the index after it."""
    q, j, buf, n = src[i], i + 1, [], len(src)
    while j < n:
        d = src[j]
        if d == '\\': buf.append(src[j:j + 2]); j += 2; continue
        if q == '`' and src.startswith('${', j):
            j = scan_code(src, j + 2, out, stop='}'); buf.append('{}'); continue
        if d == q: j += 1; break
        if d == '\n' and q != '`': break
        buf.append(d); j += 1
    out.append(''.join(buf))
    return j

def scan_code(src, i, out, stop=None):
    """Scans JS code from i, collecting string literals into out; stops after an unmatched `stop` brace."""
    depth, n = 0, len(src)
    while i < n:
        c = src[i]
        if src.startswith('//', i): j = src.find('\n', i); i = n if j < 0 else j; continue
        if src.startswith('/*', i): j = src.find('*/', i + 2); i = n if j < 0 else j + 2; continue
        prev = src[:i].rstrip()[-1:]
        if c == '/' and prev and prev in '(,=:[!&|?;{}' and not src.startswith('//', i):
            # regex literal: skip to the closing slash
            k = i + 1; cls = False
            while k < n and src[k] != '\n':
                if src[k] == '\\': k += 2; continue
                if src[k] == '[': cls = True
                elif src[k] == ']': cls = False
                elif src[k] == '/' and not cls: break
                k += 1
            if k < n and src[k] == '/': i = k + 1; continue
        if c in '\'"`': i = scan_string(src, i, out); continue
        if c == '{': depth += 1
        elif c == '}':
            if depth == 0 and stop == '}': return i + 1
            depth -= 1
        i += 1
    return i

def literals(src):
    out = []; scan_code(src, 0, out); return out

def pieces(s):
    s = s.replace('\\n', ' ')
    for part in re.split(r'<[^>]*>', s):
        for seg in part.split(' · '):
            seg = re.sub(r'\s+', ' ', seg).strip()
            if CYR.search(seg): yield seg

if __name__ == '__main__':
    keys = {}
    for f in FILES:
        for lit in literals((root / f).read_text()):
            for p in pieces(lit): keys.setdefault(p, f)
    out = sys.argv[1] if len(sys.argv) > 1 else None
    data = json.dumps(sorted(keys), ensure_ascii=False, indent=0)
    if out: pathlib.Path(out).write_text(data)
    else: print(data)
    print(len(keys), 'phrases', file=sys.stderr)
