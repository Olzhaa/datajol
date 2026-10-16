// In-browser code runners and exercise checkers: SQL via sql.js (asm build), Python via Pyodide in a worker,
// Java and C++ compiled to WebAssembly in workers.
(function () {
  const sql = {
    ready: null,
    load() {
      if (!this.ready) {
        this.ready = new Promise((resolve, reject) => {
          const s = document.createElement('script');
          s.src = 'vendor/sql-asm.js';
          s.onload = () => window.initSqlJs().then(resolve, reject);
          s.onerror = () => reject(new Error('SQL қозғалтқышы жүктелмеді. Бетті жаңартып көріңіз.'));
          document.head.appendChild(s);
        });
        this.ready.catch(() => { this.ready = null; });
      }
      return this.ready;
    },
    async freshDb(datasetId) {
      const SQL = await this.load();
      const db = new SQL.Database();
      const ds = DJ.datasets[datasetId || 'shop'];
      if (ds && ds.sql) db.exec(ds.sql);
      return db;
    },
    async run(code, datasetId) {
      const db = await this.freshDb(datasetId);
      try {
        const results = db.exec(code);
        return { ok: true, results, last: results[results.length - 1] || null, changes: db.getRowsModified() };
      } catch (err) {
        return { ok: false, error: translateSqlError(String(err.message || err)) };
      } finally { db.close(); }
    },
    async check(ex, code) {
      const userDb = await this.freshDb(ex.dataset);
      const refDb = await this.freshDb(ex.dataset);
      try {
        let userRes;
        try { userRes = userDb.exec(code); }
        catch (err) { return { pass: false, msg: 'Сұрауда қате бар: ' + escHtml(translateSqlError(String(err.message || err))) }; }
        const refRes = refDb.exec(ex.solution);
        const c = ex.check || {};
        if (c.mustInclude) {
          const up = code.toUpperCase();
          for (const kw of c.mustInclude) if (!up.includes(kw.toUpperCase())) return { pass: false, msg: `Бұл тапсырмада <code>${kw}</code> қолдану керек.` };
        }
        let mine, ref;
        if (c.after) {
          try { mine = last(userDb.exec(c.after)); } catch (err) { return { pass: false, msg: 'Кестенің күйін тексеру мүмкін болмады: ' + escHtml(translateSqlError(String(err.message || err))) }; }
          ref = last(refDb.exec(c.after));
        } else { mine = last(userRes); ref = last(refRes); }
        const cmp = compareResults(mine, ref, c.ordered);
        return { pass: cmp.same, msg: cmp.same ? null : cmp.msg, shown: last(userRes) };
      } finally { userDb.close(); refDb.close(); }
    }
  };

  function last(arr) { return arr && arr.length ? arr[arr.length - 1] : null; }
  function norm(v) {
    if (v === null || v === undefined) return null;
    if (typeof v === 'number') return Math.round(v * 100) / 100;
    if (typeof v === 'string' && v.trim() !== '' && !isNaN(Number(v))) return Math.round(Number(v) * 100) / 100;
    return String(v).trim();
  }
  function compareResults(mine, ref, ordered) {
    if (!ref && !mine) return { same: true };
    if (!mine) return { same: false, msg: 'Сұрау ешқандай кесте қайтармады. SELECT жаздыңыз ба?' };
    if (!ref) return { same: false, msg: 'Бұл тапсырма кесте қайтаруды күтпейді.' };
    if (mine.columns.length !== ref.columns.length) return { same: false, msg: `Бағандар саны ${mine.columns.length}, ал ${ref.columns.length} болуы керек.` };
    if (mine.values.length !== ref.values.length) return { same: false, msg: `Жолдар саны ${mine.values.length}, ал ${ref.values.length} болуы керек. Фильтрді тексеріңіз.` };
    const a = mine.values.map(r => JSON.stringify(r.map(norm)));
    const b = ref.values.map(r => JSON.stringify(r.map(norm)));
    if (!ordered) { a.sort(); b.sort(); }
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return { same: false, msg: ordered ? `Жолдар саны дұрыс, бірақ ${i + 1}-жол күткендей емес. Реттілікті немесе мәндерді тексеріңіз.` : 'Жолдар саны дұрыс, бірақ мәндер сәйкес емес. Бағандардың ретін және есептеуді тексеріңіз.' };
    }
    return { same: true };
  }
  const escHtml = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function translateSqlError(m) {
    return m
      .replace(/no such table: (\S+)/, 'мұндай кесте жоқ: $1')
      .replace(/no such column: (\S+)/, 'мұндай баған жоқ: $1')
      .replace(/near "([^"]*)": syntax error/, '"$1" маңында синтаксис қатесі')
      .replace(/incomplete input/, 'сұрау аяқталмаған')
      .replace(/ambiguous column name: (\S+)/, 'баған атауы екі кестеде де бар, кесте атауын көрсетіңіз: $1')
      .replace(/misuse of aggregate/, 'агрегат функция дұрыс емес жерде қолданылды');
  }

  const py = {
    worker: null, ready: null, seq: 0, pending: new Map(), status: 'idle',
    start() {
      if (this.worker) return this.ready;
      this.status = 'loading';
      this.worker = new Worker('js/py-worker.js' + (window.DJ_VERSION ? '?v=' + window.DJ_VERSION : ''));
      this.ready = new Promise((resolve, reject) => {
        this.worker.onmessage = (e) => {
          const d = e.data;
          if (d.type === 'ready') { this.status = 'ready'; resolve(); return; }
          if (d.type === 'fatal') { this.status = 'error'; reject(new Error(d.error)); return; }
          const p = this.pending.get(d.id);
          if (p) { clearTimeout(p.timer); this.pending.delete(d.id); p.resolve(d); }
        };
        this.worker.onerror = (e) => { this.status = 'error'; reject(new Error(e.message || 'worker қатесі')); };
        // Python itself is a ~10 MB download; on a stalled connection fail with a clear message instead of hanging.
        setTimeout(() => { if (this.status === 'loading') { this.status = 'error'; reject(new Error('Python жүктелмеді: интернет баяу немесе үзілді. Бетті жаңартып, қайталап көріңіз.')); } }, 120000);
      });
      this.ready.catch(() => {});
      return this.ready;
    },
    restart() { if (this.worker) this.worker.terminate(); this.worker = null; this.pandas = false; this.sklearn = false; this.pending.forEach(p => p.resolve({ ok: false, stdout: '', error: 'Код 8 секундтан артық орындалды. Шексіз цикл немесе тым баяу алгоритм болуы мүмкін: циклдарды және алгоритмнің күрделілігін тексеріңіз.' })); this.pending.clear(); return this.start(); },
    pandas: false, sklearn: false,
    needsPandas(code) { return /\b(pandas|numpy)\b/.test(code || ''); },
    needsSklearn(code) { return /\bsklearn\b/.test(code || ''); },
    async exec(code, tests) {
      await this.start();
      const id = ++this.seq;
      const all = code + (tests || '');
      // The first pandas import loads ~10 MB of packages, so it gets a longer budget than user code.
      // scikit-learn (with scipy) is ~35 MB more, and model training itself can take longer than plain code.
      const firstPandas = this.needsPandas(all) && !this.pandas;
      const sk = this.needsSklearn(all), firstSk = sk && !this.sklearn;
      const files = /\.csv/.test(all) && DJ.csv ? DJ.csv : null;
      const slow = 'Кітапханалар әлі жүктеліп жатқан кезде уақыт бітті: интернет баяу болуы мүмкін. Қайта іске қосып көріңіз.';
      const loop = sk ? 'Код 25 секундтан артық орындалды. Деректер көлемін немесе модель параметрлерін (мысалы n_estimators) азайтып көріңіз.' : 'Код 8 секундтан артық орындалды. Шексіз цикл немесе тым баяу алгоритм болуы мүмкін: циклдарды және алгоритмнің күрделілігін тексеріңіз.';
      return new Promise(resolve => {
        const timer = setTimeout(() => { this.pending.delete(id); this.restart(); resolve({ ok: false, stdout: '', error: firstSk || firstPandas ? slow : loop }); }, firstSk ? 180000 : firstPandas ? 90000 : sk ? 25000 : 8000);
        this.pending.set(id, { resolve: d => { if (firstPandas && !/pandas жүктелмеді/.test(d.error || '')) this.pandas = true; if (firstSk && !/scikit-learn жүктелмеді/.test(d.error || '')) this.sklearn = this.pandas = true; resolve(d); }, timer });
        this.worker.postMessage({ id, code, tests, files });
      });
    },
    async run(code) { return this.exec(code); },
    async check(ex, code) {
      const c = ex.check || {};
      if (c.mustInclude) for (const kw of c.mustInclude) if (!code.includes(kw)) return { pass: false, msg: `Бұл тапсырмада <code>${kw}</code> қолдану керек.` };
      const mine = await this.exec(code, c.tests || null);
      if (mine.error) return { pass: false, msg: 'Кодта қате бар:', trace: mine.error, stdout: mine.stdout };
      if (mine.testError) {
        const lastLine = mine.testError.split('\n').filter(Boolean).pop() || '';
        const m = lastLine.match(/AssertionError:?\s*(.*)/);
        return { pass: false, msg: m && m[1] ? m[1] : 'Тест өтпеді: ' + lastLine, stdout: mine.stdout };
      }
      if (c.stdout !== false && !c.tests) {
        const ref = await this.exec(ex.solution);
        const a = clean(mine.stdout), b = clean(ref.stdout);
        if (a !== b) return { pass: false, msg: 'Шығыс күткендей емес.', expected: ref.stdout, stdout: mine.stdout };
      }
      if (c.stdout === true && c.tests) {
        const ref = await this.exec(ex.solution);
        if (clean(mine.stdout) !== clean(ref.stdout)) return { pass: false, msg: 'Шығыс күткендей емес.', expected: ref.stdout, stdout: mine.stdout };
      }
      return { pass: true, stdout: mine.stdout };
    }
  };
  function clean(s) { return (s || '').split('\n').map(l => l.replace(/\s+$/, '')).join('\n').trim(); }

  // Java and C++ compile to WebAssembly inside a worker (js/java-worker.mjs, js/cpp-worker.js; files and licences
  // in vendor/java/ and vendor/cpp/). The compiler is downloaded only when start() is first called.
  // Exercise: { type: 'java'|'cpp', ..., check: { cases: [{ stdin, out }], harness?, mustInclude? } }.
  // The code is compiled once and run once per case; a case passes when the exit code is 0 and stdout equals `out`
  // (trailing spaces on each line and trailing blank lines ignored). `harness` is extra source compiled with the
  // learner's code: for C++ it is appended to it; for Java it is a separate file, and the class with main() in the
  // harness is the entry point (otherwise the learner's class with main(), e.g. `public class Main`).
  const TIMEOUT_MSG = 'Бағдарлама тым ұзақ орындалды: шексіз цикл немесе тым баяу алгоритм болуы мүмкін.';
  function native(o) {
    return {
      worker: null, ready: null, seq: 0, pending: new Map(), status: 'idle', label: o.label, size: o.size,
      start() {
        if (this.worker) return this.ready;
        this.status = 'loading';
        const w = this.worker = new Worker(o.url + (window.DJ_VERSION ? '?v=' + window.DJ_VERSION : ''), o.module ? { type: 'module' } : undefined);
        this.ready = new Promise((resolve, reject) => {
          const fail = msg => { if (this.worker !== w) return; this.stop(); this.status = 'error'; reject(new Error(msg)); };
          w.onmessage = (e) => {
            const d = e.data;
            if (d.type === 'ready') { this.status = 'ready'; resolve(); return; }
            if (d.type === 'fatal') { fail(`${o.label} компиляторы жүктелмеді: ${d.error}`); return; }
            const p = this.pending.get(d.id);
            if (p) p.on(d);
          };
          w.onerror = (e) => fail(`${o.label} компиляторы іске қосылмады: ${e.message || 'worker қатесі'}. Chrome, Edge, Firefox немесе Safari-дің соңғы нұсқасын қолданыңыз.`);
          setTimeout(() => { if (this.worker === w && this.status === 'loading') fail(`${o.label} компиляторы жүктелмеді: интернет баяу немесе үзілді. Бетті жаңартып, қайталап көріңіз.`); }, 240000);
        });
        this.ready.catch(() => {});
        return this.ready;
      },
      // Stops the worker (the only way to stop an endless loop); the next start() loads it again from the browser cache.
      stop() {
        if (this.worker) this.worker.terminate();
        this.worker = null; this.status = 'idle';
        this.pending.forEach(p => p.abort()); this.pending.clear();
      },
      // Compiles once and runs the program once per stdin.
      // Resolves { compiled, error, cases: [{ stdout, stderr, exitCode }], timeout }.
      async exec(code, stdins, harness) {
        await this.start();
        const id = ++this.seq;
        return new Promise(resolve => {
          const res = { compiled: false, error: '', cases: [], timeout: false };
          let timer;
          const arm = ms => { clearTimeout(timer); timer = setTimeout(() => { this.pending.delete(id); res.timeout = true; this.stop(); resolve(res); }, ms); };
          this.pending.set(id, {
            on: d => {
              if (d.type === 'compiled') { res.compiled = d.ok; res.error = d.error || ''; if (d.ok) arm(8000); }
              else if (d.type === 'case') { res.cases.push({ stdout: d.stdout, stderr: d.stderr, exitCode: d.exitCode }); arm(8000); }
              else if (d.type === 'done') { clearTimeout(timer); this.pending.delete(id); resolve(res); }
            },
            abort: () => { clearTimeout(timer); res.timeout = true; resolve(res); }
          });
          arm(90000);   // compiling; a run gets 8 s per case
          this.worker.postMessage({ id, src: code, harness: harness || null, stdins });
        });
      },
      // { ok, stdout, stderr, error }: error is the compiler output, the timeout message, or why the program failed.
      async run(code, stdin) {
        const r = await this.exec(code, [stdin || '']);
        const k = r.cases[0];
        if (r.timeout) return { ok: false, stdout: k ? k.stdout : '', stderr: '', error: r.compiled ? TIMEOUT_MSG : 'Компиляция тым ұзаққа созылды. Қайталап көріңіз.' };
        if (!r.compiled) return { ok: false, stdout: '', stderr: '', error: r.error, compileError: true };
        if (k.exitCode !== 0) return { ok: false, stdout: k.stdout, stderr: k.stderr, error: (k.stderr ? k.stderr.replace(/\s+$/, '') + '\n' : '') + `Бағдарлама қатемен аяқталды (шығу коды ${k.exitCode}).` };
        return { ok: true, stdout: k.stdout, stderr: k.stderr, error: '' };
      },
      async check(ex, code) {
        const c = ex.check || {}, cases = c.cases || [];
        if (c.mustInclude) for (const kw of c.mustInclude) if (!code.includes(kw)) return { pass: false, msg: `Бұл тапсырмада <code>${escHtml(kw)}</code> қолдану керек.` };
        const r = await this.exec(code, cases.map(k => k.stdin || ''), c.harness);
        if (!r.compiled && !r.timeout) return { pass: false, msg: 'Код компиляцияланбады. Компилятордың хабарламасын қараңыз:', trace: r.error };
        if (!r.compiled) return { pass: false, msg: 'Компиляция тым ұзаққа созылды. Қайталап көріңіз.' };
        for (let i = 0; i < cases.length; i++) {
          const k = r.cases[i], input = cases[i].stdin ? `<div class="eyebrow" style="margin-top:8px">Кіріс</div><pre style="margin:4px 0 0">${escHtml(cases[i].stdin)}</pre>` : '';
          // With several cases the message names the case: «2-тест: шығыс күткендей емес.»
          const say = t => (cases.length > 1 ? `${i + 1}-тест: ` + t[0].toLowerCase() + t.slice(1) : t) + input;
          if (!k) return { pass: false, msg: say(TIMEOUT_MSG) };
          if (k.exitCode !== 0) return { pass: false, msg: say(`Бағдарлама қатемен аяқталды (шығу коды ${k.exitCode}).`), trace: k.stderr || null, stdout: k.stdout };
          if (outNorm(k.stdout) !== outNorm(cases[i].out)) return { pass: false, msg: say('Шығыс күткендей емес.'), expected: cases[i].out, stdout: k.stdout };
        }
        return { pass: true, stdout: r.cases.length ? r.cases[0].stdout : '' };
      }
    };
  }
  const outNorm = s => String(s || '').split('\n').map(l => l.replace(/\s+$/, '')).join('\n').replace(/\n+$/, '');
  const java = native({ label: 'Java', url: 'js/java-worker.mjs', module: true, size: 'шамамен 5 МБ' });
  const cpp = native({ label: 'C++', url: 'js/cpp-worker.js', size: 'шамамен 30 МБ, бір рет қана' });

  DJ.run = { sql, py, java, cpp };
})();
