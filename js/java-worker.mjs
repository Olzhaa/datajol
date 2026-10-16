// Compiles and runs Java off the main thread (module worker, started by DJ.run.java in js/runners.js).
// javac + TeaVM, compiled to WasmGC, turn the source into a standalone WASI .wasm program, which runs here too.
// In:  { id, src, harness, stdins: [string] }
// Out: { id, type: 'compiled', ok, error }, then { id, type: 'case', i, stdout, stderr, exitCode } per stdin, then { id, type: 'done' }.
// An endless loop is stopped by the page terminating this worker.
const V = new URL(self.location.href).searchParams.get('v');
const q = V ? '?v=' + V : '';
const base = new URL('../vendor/java/', self.location.href);
// Assets are pre-gzipped (each well under 16 MB, any static host serves them) and inflated here.
async function load(name) {
  const r = await fetch(new URL(name + '.gz' + q, base));
  if (!r.ok) throw new Error(name + ': ' + r.status);
  return new Uint8Array(await new Response(r.body.pipeThrough(new DecompressionStream('gzip'))).arrayBuffer());
}

let glue, compiler, libs, liteScanner;
async function init() {
  await import(new URL('wasi-mini.js' + q, self.location.href).href);   // defines self.runWasiProgram
  glue = await import(new URL('teavm-glue.mjs' + q, base).href);
  const [cw, sdk, runtime, scanner] = await Promise.all([
    load('java-teavm-0.13.1.compiler.wasm'), load('java-compile-classlib.fixed.bin'), load('java-runtime-classlib.trim.bin'),
    fetch(new URL('LiteScanner.java' + q, base)).then(r => r.text())]);
  libs = { sdk, runtime }; liteScanner = scanner;
  compiler = await glue.loadCompiler(cw);
}
const ready = init();
ready.then(() => self.postMessage({ type: 'ready' }), e => self.postMessage({ type: 'fatal', error: String(e && e.message || e) }));

// This javac build crashes on any annotation, so they are blanked out (line/column numbers are kept).
// The cost: @Override is not checked.
function stripAnnotations(src) {
  const out = src.split(''), n = src.length;
  const blank = (a, b) => { for (let k = a; k < b; k++) if (out[k] !== '\n') out[k] = ' '; };
  let i = 0;
  while (i < n) {
    const c = src[i], d = src[i + 1];
    if (c === '/' && d === '/') { while (i < n && src[i] !== '\n') i++; continue; }
    if (c === '/' && d === '*') { const e = src.indexOf('*/', i + 2); i = e < 0 ? n : e + 2; continue; }
    if (c === '"' && src.startsWith('"""', i)) { const e = src.indexOf('"""', i + 3); i = e < 0 ? n : e + 3; continue; }
    if (c === '"' || c === "'") { i++; while (i < n && src[i] !== c && src[i] !== '\n') i += src[i] === '\\' ? 2 : 1; i++; continue; }
    if (c === '@') {
      const m = /^@\s*([A-Za-z_$][\w$]*(?:\s*\.\s*[A-Za-z_$][\w$]*)*)/.exec(src.slice(i, i + 200));
      if (m && m[1] !== 'interface') {
        let j = i + m[0].length, k = j;
        while (k < n && /\s/.test(src[k])) k++;
        if (src[k] === '(') {
          let depth = 0;
          for (; k < n; k++) {
            const ch = src[k];
            if (ch === '"' || ch === "'") { k++; while (k < n && src[k] !== ch) k += src[k] === '\\' ? 2 : 1; continue; }
            if (ch === '(') depth++; else if (ch === ')' && --depth === 0) { k++; break; }
          }
          j = k;
        }
        blank(i, j); i = j; continue;
      }
    }
    i++;
  }
  return out.join('');
}

// Source rewrites that keep line numbers: no annotations; System.exit goes through the launcher (TeaVM has none);
// %n becomes \n inside string literals (TeaVM's Formatter has no %n); java.util.Scanner becomes the small __Scanner
// (the real one adds ~4 s of compile time).
function prepare(src) {
  let s = stripAnnotations(src)
    .replace(/\bSystem\s*\.\s*exit\s*\(/g, '__Launcher.exit(')
    .replace(/"(?:[^"\\\n]|\\.)*"/g, lit => lit.replace(/(^|[^%])%n/g, '$1\\n'));
  const scanner = /\bimport\s+java\.util\.(?:Scanner|\*)\s*;/.test(s) && /\bScanner\b/.test(s);
  if (scanner) s = s.replace(/\bimport\s+java\.util\.Scanner\s*;/, '').replace(/(?<![.\w])Scanner\b/g, '__Scanner');
  return { src: s, scanner };
}
const publicClass = src => (/\bpublic\s+(?:final\s+|abstract\s+)*class\s+([A-Za-z_$][\w$]*)/.exec(src) || [])[1];
// The class whose body declares `static void main`: the innermost class/record/enum/interface whose braces enclose it
// (a nested `static class Student {...}` declared before main must not be picked).
function mainClass(src) {
  const at = src.search(/static\s+void\s+main\s*\(/);
  if (at < 0) return null;
  const plain = src.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'/g, m => ' '.repeat(m.length));
  const re = /\b(?:class|record|enum|interface)\s+([A-Za-z_$][\w$]*)/g; let m, best = null;
  while ((m = re.exec(plain)) && m.index < at) {
    const open = plain.indexOf('{', m.index);
    if (open < 0 || open > at) continue;
    let d = 0, i = open;
    for (; i < plain.length; i++) { if (plain[i] === '{') d++; else if (plain[i] === '}' && --d === 0) break; }
    if (i > at) best = m[1];
  }
  return best;
}

const LAUNCHER = entry => `public class __Launcher {
  static final class ExitSignal extends Error { final int code; ExitSignal(int c) { code = c; } }
  public static void exit(int code) { throw new ExitSignal(code); }
  public static void main(String[] args) {
    int code = 0;
    try { ${entry}.main(args); }
    catch (ExitSignal e) { code = e.code; }
    catch (Throwable t) {
      System.out.flush();
      System.err.println("Exception in thread \\"main\\" " + t);
      for (StackTraceElement f : t.getStackTrace()) {
        String c = f.getClassName();
        if (c.startsWith("java.") || c.startsWith("org.teavm.") || c.startsWith("__")) continue;
        System.err.println("\\tat " + f);
      }
      code = 1;
    }
    System.out.flush();
    if (code != 0) System.err.print("\\u0000__EXIT__" + code);
  }
}
`;

// Learner code and harness are separate files, so each may have its own imports and its own public class.
// Entry point: the class with `main` in the harness if there is one, otherwise the one in the learner's code.
async function compile(src, harness) {
  const files = [];
  let scanner = false;
  const add = (code, fallback) => {
    const p = prepare(code); scanner = scanner || p.scanner;
    files.push({ path: (publicClass(code) || fallback) + '.java', content: p.src });
  };
  add(src, harness ? '__Learner' : 'Main');
  if (harness) add(harness, '__Harness');
  const entry = (harness && mainClass(harness)) || mainClass(src);
  if (!entry) return { ok: false, error: 'main әдісі табылмады: public static void main(String[] args) жазыңыз.' };
  files.push({ path: '__Launcher.java', content: LAUNCHER(entry) });
  if (scanner) files.push({ path: '__Scanner.java', content: liteScanner });
  try {
    const r = await glue.compileJava(compiler, { entry: '__Launcher.java', files, optimization: 'release' }, libs);
    if (!r.success) return { ok: false, error: r.stderr.split('\n').filter(l => !l.startsWith('__Launcher.java')).join('\n').replace(/__Scanner/g, 'Scanner').replace(/__(Learner|Harness)\.java/g, 'Main.java') };
    return { ok: true, wasm: await WebAssembly.compile(r.wasm) };
  } catch (e) {
    // The compiler itself crashed (its bug, not the learner's): reload it for the next run.
    compiler = await glue.loadCompiler(await load('java-teavm-0.13.1.compiler.wasm'));
    return { ok: false, error: 'Компилятордың ішкі қатесі: ' + (e && e.message || e) };
  }
}

async function run(mod, stdin) {
  const r = await self.runWasiProgram(mod, { stdin, extraImports: { teavmMath: Math } });
  let { stdout, stderr, exitCode } = r;
  if (r.trap) {
    const what = /divide by zero/.test(r.trap) ? 'java.lang.ArithmeticException: / by zero'
      : /call stack|too much recursion/i.test(r.trap) ? 'java.lang.StackOverflowError' : 'Runtime error: ' + r.trap;
    stderr += (stderr && !stderr.endsWith('\n') ? '\n' : '') + 'Exception in thread "main" ' + what + '\n';
    exitCode = 1;
  }
  const m = /\u0000__EXIT__(-?\d+)$/.exec(stderr);
  if (m) { exitCode = +m[1]; stderr = stderr.slice(0, m.index); }
  return { stdout, stderr, exitCode };
}

self.onmessage = async ({ data: { id, src, harness, stdins } }) => {
  try {
    await ready;
    const c = await compile(src, harness);
    self.postMessage({ id, type: 'compiled', ok: c.ok, error: c.error });
    if (c.ok) for (let i = 0; i < stdins.length; i++) self.postMessage({ id, type: 'case', i, ...(await run(c.wasm, stdins[i] || '')) });
  } catch (e) { self.postMessage({ id, type: 'compiled', ok: false, error: String(e && e.message || e) }); }
  self.postMessage({ id, type: 'done' });
};
