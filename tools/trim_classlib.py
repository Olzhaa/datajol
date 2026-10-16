"""Shrink TeaVM runtime-classlib: keep only a few CLDR locales (the bundled cldr-json.zip is 15.8 MB of 23.7 MB).
usage: python3 -I trim_classlib.py runtime-classlib.bin out.bin en,kk,ru"""
import sys, struct, zipfile, io
keep = sys.argv[3].split(',')
def ok(loc): return loc.replace('-', '_') in keep   # exact locale ids only
b = open(sys.argv[1], 'rb').read(); i = 0; out = bytearray()
while i < len(b):
    (n,) = struct.unpack('>H', b[i:i+2]); i += 2; name = b[i:i+n].decode(); i += n
    (l,) = struct.unpack('>I', b[i:i+4]); i += 4; d = b[i:i+l]; i += l
    if name.endswith('cldr-json.zip'):
        zin = zipfile.ZipFile(io.BytesIO(d)); buf = io.BytesIO()
        with zipfile.ZipFile(buf, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as zout:
            for info in zin.infolist():
                top = info.filename.split('/')[0]
                if top in ('supplemental', 'root') or ok(top.replace('-', '_')) or ok(top):
                    zout.writestr(info, zin.read(info.filename))
        d = buf.getvalue()
    elif name == 'META-INF/teavm/locales.txt':
        d = ','.join(x for x in d.decode().strip().split(',') if ok(x)).encode()
    nb = name.encode(); out += struct.pack('>H', len(nb)) + nb + struct.pack('>I', len(d)) + d
open(sys.argv[2], 'wb').write(out)
print(len(b), '->', len(out))
