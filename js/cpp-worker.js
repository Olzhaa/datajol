// Compiles and runs C++ off the main thread (classic worker, started by DJ.run.cpp in js/runners.js).
// Clang/LLD compiled to WebAssembly build a WASI program, which runs here with js/wasi-mini.js.
// Same messages as js/java-worker.mjs: in { id, src, harness, stdins }, out 'compiled', 'case' per stdin, 'done'.
const V = new URL(self.location.href).searchParams.get('v'), q = V ? '?v=' + V : '';
importScripts('../vendor/cpp/clang-wasm-toolchain.global.js' + q, 'wasi-mini.js' + q);
const T = self.clangWasmToolchain;
// -O0 keeps undefined behaviour predictable (division by zero traps instead of being optimised into garbage).
// Exceptions are off (the bundled libc++abi has no exception support), so try/throw do not compile.
const FLAGS = [...T.CLANG_DRIVER_DEFAULT_ARGS, '-std=gnu++17', '-O0'];
let tc;
const ready = T.createToolchain({ baseUrl: new URL('../vendor/cpp/clang/', self.location.href).href }).then(t => { tc = t; });
ready.then(() => self.postMessage({ type: 'ready' }), e => self.postMessage({ type: 'fatal', error: String(e && e.message || e) }));

const diag = raw => T.compilerDiagnostics(raw).filter(l => !/^Error: process exited with code/.test(l)).join('\n');
function trapText(msg) {
  if (/divide by zero/.test(msg)) return 'Runtime error: integer division by zero';
  if (/call stack|recursion/i.test(msg)) return 'Runtime error: stack overflow (recursion too deep)';
  if (/out of bounds/.test(msg)) return 'Runtime error: invalid memory access';
  if (/unreachable/.test(msg)) return 'Runtime error: program aborted';
  return 'Runtime error: ' + msg;
}

self.onmessage = async ({ data: { id, src, harness, stdins } }) => {
  try {
    await ready;
    const code = harness ? src + '\n' + harness : src;
    const c = await tc.lock(() => tc.captureCompilerOutput(() =>
      tc.runtime.compileArtifact(code, { language: 'CPP', fileName: 'main.cpp', compileArgs: FLAGS })));
    if (c.error) self.postMessage({ id, type: 'compiled', ok: false, error: diag(c.raw) || String(c.error.message || c.error) });
    else {
      self.postMessage({ id, type: 'compiled', ok: true });
      const mod = await WebAssembly.compile(c.result.bytes);
      for (let i = 0; i < stdins.length; i++) {
        const r = await self.runWasiProgram(mod, { stdin: stdins[i] || '' });
        if (r.trap) r.stderr += (r.stderr && !r.stderr.endsWith('\n') ? '\n' : '') + trapText(r.trap) + '\n';
        self.postMessage({ id, type: 'case', i, stdout: r.stdout, stderr: r.stderr, exitCode: r.exitCode });
      }
    }
  } catch (e) { self.postMessage({ id, type: 'compiled', ok: false, error: String(e && e.message || e) }); }
  self.postMessage({ id, type: 'done' });
};
