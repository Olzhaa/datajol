// Minimal WASI preview1 host for running a student's compiled program (stdin from a string, stdout/stderr
// captured, no filesystem). Classic script: importScripts('wasi-mini.js') or `import './wasi-mini.js'`.
// Exposes self.runWasiProgram(moduleOrBytes, { stdin, args, extraImports }) -> { stdout, stderr, exitCode, trap }
(function (g) {
  const ESUCCESS = 0, EBADF = 8, ENOSYS = 52;
  class Exit { constructor(code) { this.code = code; } }
  g.runWasiProgram = async function (wasm, { stdin = '', args = ['main'], extraImports = {}, maxOutput = 1 << 20 } = {}) {
    const mod = wasm instanceof WebAssembly.Module ? wasm : await WebAssembly.compile(wasm);
    const enc = new TextEncoder(), dec = [new TextDecoder(), new TextDecoder()];
    const input = enc.encode(stdin); let inPos = 0;
    const out = ['', '']; let mem = null, truncated = false;
    const view = () => new DataView(mem.buffer), u8 = () => new Uint8Array(mem.buffer);
    const argBytes = args.map(a => enc.encode(a + '\0'));
    const wasi = {
      args_sizes_get(c, s) { view().setUint32(c, argBytes.length, true); view().setUint32(s, argBytes.reduce((n, b) => n + b.length, 0), true); return ESUCCESS; },
      args_get(argv, buf) { for (const b of argBytes) { view().setUint32(argv, buf, true); u8().set(b, buf); argv += 4; buf += b.length; } return ESUCCESS; },
      environ_sizes_get(c, s) { view().setUint32(c, 0, true); view().setUint32(s, 0, true); return ESUCCESS; },
      environ_get() { return ESUCCESS; },
      clock_res_get(id, p) { view().setBigUint64(p, 1000n, true); return ESUCCESS; },
      clock_time_get(id, prec, p) { const ns = id === 0 ? BigInt(Date.now()) * 1000000n : BigInt(Math.round(performance.now() * 1e6)); view().setBigUint64(p, ns, true); return ESUCCESS; },
      random_get(p, n) { crypto.getRandomValues(u8().subarray(p, p + n)); return ESUCCESS; },
      fd_write(fd, iovs, n, written) {
        if (fd !== 1 && fd !== 2) return EBADF;
        let total = 0; const v = view();
        for (let i = 0; i < n; i++) {
          const p = v.getUint32(iovs + i * 8, true), l = v.getUint32(iovs + i * 8 + 4, true);
          if (out[0].length + out[1].length < maxOutput) out[fd - 1] += dec[fd - 1].decode(u8().subarray(p, p + l), { stream: true }); else truncated = true;
          total += l;
        }
        v.setUint32(written, total, true); return ESUCCESS;
      },
      fd_read(fd, iovs, n, nread) {
        if (fd !== 0) return EBADF;
        let total = 0; const v = view();
        for (let i = 0; i < n && inPos < input.length; i++) {
          const p = v.getUint32(iovs + i * 8, true), l = v.getUint32(iovs + i * 8 + 4, true);
          const chunk = input.subarray(inPos, inPos + l); u8().set(chunk, p); inPos += chunk.length; total += chunk.length;
        }
        v.setUint32(nread, total, true); return ESUCCESS;
      },
      fd_fdstat_get(fd, p) {
        if (fd > 2) return EBADF;
        const v = view(); v.setUint8(p, 2 /* character device */); v.setUint16(p + 2, 0, true);
        v.setBigUint64(p + 8, 0xffffffffn, true); v.setBigUint64(p + 16, 0xffffffffn, true); return ESUCCESS;
      },
      fd_fdstat_set_flags() { return ESUCCESS; },
      fd_prestat_get() { return EBADF; },
      fd_prestat_dir_name() { return EBADF; },
      fd_close() { return ESUCCESS; },
      fd_seek() { return 70; /* ESPIPE */ },
      fd_sync() { return ESUCCESS; },
      poll_oneoff() { return ENOSYS; },
      sched_yield() { return ESUCCESS; },
      proc_exit(code) { throw new Exit(code); },
    };
    const imports = { ...extraImports, wasi_snapshot_preview1: {} };
    for (const imp of WebAssembly.Module.imports(mod)) {
      if (imp.module !== 'wasi_snapshot_preview1' || imp.kind !== 'function') continue;
      imports.wasi_snapshot_preview1[imp.name] = wasi[imp.name] || (() => ENOSYS);
    }
    const inst = await WebAssembly.instantiate(mod, imports);
    mem = inst.exports.memory;
    let exitCode = 0, trap = null;
    try { inst.exports._start(); }
    catch (e) {
      if (e instanceof Exit) exitCode = e.code;
      else { trap = String(e && e.message || e); exitCode = 134; }
    }
    out[0] += dec[0].decode(); out[1] += dec[1].decode();
    if (truncated) out[1] += '\n[output truncated]';
    return { stdout: out[0], stderr: out[1], exitCode, trap };
  };
})(typeof self !== 'undefined' ? self : globalThis);
