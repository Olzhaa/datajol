"""Repair wasm-oj's TeaVM compile-classlib (javac stubs):
 1. apply TeaVM @Rename("x") to stub methods (getMessage0 -> getMessage, getClass0 -> getClass, ...)
 2. drop self-references in interface lists (java.lang.annotation.Annotation extends itself -> javac NPE on any annotation)
usage: python3 -I fix_classlib.py compile-classlib.bin runtime-classlib.bin out.bin"""
import sys, struct

def read_bin(path):
    b = open(path, 'rb').read(); i = 0; out = []
    while i < len(b):
        (n,) = struct.unpack('>H', b[i:i+2]); i += 2; name = b[i:i+n].decode(); i += n
        (l,) = struct.unpack('>I', b[i:i+4]); i += 4; out.append((name, b[i:i+l])); i += l
    return out

def write_bin(path, entries):
    with open(path, 'wb') as f:
        for name, data in entries:
            nb = name.encode(); f.write(struct.pack('>H', len(nb)) + nb + struct.pack('>I', len(data)) + data)

class CF:
    def __init__(self, data):
        self.d = data; p = 8; (cnt,) = struct.unpack('>H', data[p:p+2]); p += 2
        self.cp = [None]; i = 1
        while i < cnt:
            tag = data[p]
            if tag == 1:
                (l,) = struct.unpack('>H', data[p+1:p+3]); self.cp.append(('utf8', data[p+3:p+3+l].decode('utf-8', 'surrogatepass'), data[p:p+3+l])); p += 3 + l
            else:
                size = {3:5,4:5,5:9,6:9,7:3,8:3,9:5,10:5,11:5,12:5,15:4,16:3,17:5,18:5,19:3,20:3}[tag]
                self.cp.append((tag, data[p+1:p+size], data[p:p+size])); p += size
                if tag in (5, 6): self.cp.append(None); i += 1
            i += 1
        self.cp_end = p
        self.access, self.this, self.sup, ic = struct.unpack('>HHHH', data[p:p+8]); p += 8
        self.ifaces = list(struct.unpack('>' + 'H'*ic, data[p:p+2*ic])); p += 2*ic
        self.fields, p = self._members(p)
        self.methods, p = self._members(p)
        self.tail = data[p:]
    def _members(self, p):
        (n,) = struct.unpack('>H', self.d[p:p+2]); p += 2; out = []
        for _ in range(n):
            acc, ni, di, ac = struct.unpack('>HHHH', self.d[p:p+8]); start = p; p += 8
            attrs = []
            for _ in range(ac):
                an, al = struct.unpack('>HI', self.d[p:p+6]); attrs.append((an, self.d[p+6:p+6+al])); p += 6 + al
            out.append({'acc': acc, 'name': ni, 'desc': di, 'attrs': attrs})
        return out, p
    def utf(self, i): return self.cp[i][1]
    def cls(self, i): return self.utf(struct.unpack('>H', self.cp[i][1])[0])
    def add_utf(self, s):
        for k, e in enumerate(self.cp):
            if e and e[0] == 'utf8' and e[1] == s: return k
        raw = s.encode('utf-8'); self.cp.append(('utf8', s, bytes([1]) + struct.pack('>H', len(raw)) + raw)); return len(self.cp) - 1
    def renames(self):
        """{(name, nparams): newname} from @org.teavm.interop.Rename"""
        out = {}
        for m in self.methods:
            for an, ad in m['attrs']:
                if self.utf(an) not in ('RuntimeVisibleAnnotations', 'RuntimeInvisibleAnnotations'): continue
                (na,) = struct.unpack('>H', ad[:2]); q = 2
                for _ in range(na):
                    q, typ, vals = self._ann(ad, q)
                    if typ == 'Lorg/teavm/interop/Rename;' and 'value' in vals:
                        out[(self.utf(m['name']), nparams(self.utf(m['desc'])))] = vals['value']
        return out
    def _ann(self, ad, q):
        ti, np_ = struct.unpack('>HH', ad[q:q+4]); q += 4; vals = {}
        for _ in range(np_):
            (en,) = struct.unpack('>H', ad[q:q+2]); q += 2
            v, q = self._ev(ad, q); vals[self.utf(en)] = v
        return q, self.utf(ti), vals
    def _ev(self, ad, q):
        t = chr(ad[q]); q += 1
        if t == 's': (i,) = struct.unpack('>H', ad[q:q+2]); return self.utf(i), q + 2
        if t in 'BCDFIJSZc': return None, q + 2
        if t == 'e': return None, q + 4
        if t == '@': q, _, _ = self._ann(ad, q); return None, q
        if t == '[':
            (n,) = struct.unpack('>H', ad[q:q+2]); q += 2
            for _ in range(n): _, q = self._ev(ad, q)
            return None, q
        raise ValueError(t)
    def bytes(self):
        out = bytearray(self.d[:8]); out += struct.pack('>H', len(self.cp))
        for e in self.cp[1:]:
            if e is not None: out += e[2]
        out += struct.pack('>HHHH', self.access, self.this, self.sup, len(self.ifaces)) + struct.pack('>' + 'H'*len(self.ifaces), *self.ifaces)
        for group in (self.fields, self.methods):
            out += struct.pack('>H', len(group))
            for m in group:
                out += struct.pack('>HHHH', m['acc'], m['name'], m['desc'], len(m['attrs']))
                for an, ad in m['attrs']: out += struct.pack('>HI', an, len(ad)) + ad
        return bytes(out + self.tail)

def nparams(desc):
    s = desc[1:desc.index(')')]; n = 0; i = 0
    while i < len(s):
        while s[i] == '[': i += 1
        i = s.index(';', i) + 1 if s[i] == 'L' else i + 1; n += 1
    return n

def tname(name):  # java/lang/Throwable$Foo.class -> org/teavm/classlib/java/lang/TThrowable$Foo.class
    pkg, _, simple = name.rpartition('/')
    return 'org/teavm/classlib/' + pkg + '/T' + simple

comp = read_bin(sys.argv[1]); rt = dict(read_bin(sys.argv[2]))
out = []; nren = ndrop = nself = 0; log = []
for name, data in comp:
    if not name.endswith('.class') or name == 'module-info.class': out.append((name, data)); continue
    cf = CF(data); changed = False
    if cf.this in cf.ifaces:
        cf.ifaces = [i for i in cf.ifaces if i != cf.this]; nself += 1; changed = True; log.append('self-iface ' + name)
    t = rt.get(tname(name))
    if t:
        ren = CF(t).renames()
        if ren:
            existing = {(cf.utf(m['name']), cf.utf(m['desc'])) for m in cf.methods}
            keep = []
            for m in cf.methods:
                key = (cf.utf(m['name']), nparams(cf.utf(m['desc'])))
                if key in ren and ren[key] != key[0] and not key[0].startswith('<'):
                    new = ren[key]
                    if (new, cf.utf(m['desc'])) in existing: ndrop += 1; changed = True; continue
                    m['name'] = cf.add_utf(new); existing.add((new, cf.utf(m['desc']))); nren += 1; changed = True
                    log.append(f'{name}: {key[0]} -> {new}')
                keep.append(m)
            cf.methods = keep
    # drop exact duplicate (name, descriptor) pairs, preferring the non-native one
    seen = {}
    for m in cf.methods:
        k = (cf.utf(m['name']), cf.utf(m['desc']))
        if k in seen:
            score = lambda x: ((x['acc'] & 0x1000) != 0, (x['acc'] & 0x100) != 0)
            if score(m) < score(seen[k]): seen[k] = m
            changed = True; ndrop += 1; log.append(f'{name}: dedupe {k[0]}')
        else: seen[k] = m
    if changed: cf.methods = [m for m in cf.methods if seen[(cf.utf(m['name']), cf.utf(m['desc']))] is m]
    out.append((name, cf.bytes() if changed else data))
write_bin(sys.argv[3], out)
print(f'renamed {nren}, dropped dup {ndrop}, self-iface fixed {nself}')
print('\n'.join(log[:400]))
