// In-browser code runners and exercise checkers: SQL via sql.js (asm build), Python via Pyodide in a worker.
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
    restart() { if (this.worker) this.worker.terminate(); this.worker = null; this.pandas = false; this.sklearn = false; this.pending.forEach(p => p.resolve({ ok: false, stdout: '', error: 'Код 8 секундтан артық орындалды. Шексіз цикл болуы мүмкін: while шартын тексеріңіз.' })); this.pending.clear(); return this.start(); },
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
      const loop = sk ? 'Код 25 секундтан артық орындалды. Деректер көлемін немесе модель параметрлерін (мысалы n_estimators) азайтып көріңіз.' : 'Код 8 секундтан артық орындалды. Шексіз цикл болуы мүмкін: while шартын тексеріңіз.';
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

  DJ.run = { sql, py };
})();
