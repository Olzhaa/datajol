// A small spreadsheet formula engine for M1.1: parses Excel-style formulas (English or Russian
// function names, ',' or ';' separators) and evaluates them against DJ.sheets grids.
(function () {
  class FErr { constructor(code) { this.code = code; } toString() { return this.code; } }
  const NA = () => new FErr('#N/A'), VAL = () => new FErr('#VALUE!'), DIV0 = () => new FErr('#DIV/0!'), NAME = () => new FErr('#NAME?'), REF = () => new FErr('#REF!');
  const isErr = v => v instanceof FErr;

  const RU = {
    'СУММ': 'SUM', 'СРЗНАЧ': 'AVERAGE', 'СЧЁТ': 'COUNT', 'СЧЕТ': 'COUNT', 'СЧЁТЗ': 'COUNTA', 'СЧЕТЗ': 'COUNTA', 'СЧИТАТЬПУСТОТЫ': 'COUNTBLANK',
    'МИН': 'MIN', 'МАКС': 'MAX', 'МЕДИАНА': 'MEDIAN', 'ОКРУГЛ': 'ROUND', 'ОКРУГЛВВЕРХ': 'ROUNDUP', 'ОКРУГЛВНИЗ': 'ROUNDDOWN', 'ABS': 'ABS',
    'ЕСЛИ': 'IF', 'И': 'AND', 'ИЛИ': 'OR', 'НЕ': 'NOT', 'ЕСЛИОШИБКА': 'IFERROR', 'ЕСЛИМН': 'IFS',
    'СЧЁТЕСЛИ': 'COUNTIF', 'СЧЕТЕСЛИ': 'COUNTIF', 'СЧЁТЕСЛИМН': 'COUNTIFS', 'СЧЕТЕСЛИМН': 'COUNTIFS', 'СУММЕСЛИ': 'SUMIF', 'СУММЕСЛИМН': 'SUMIFS',
    'СРЗНАЧЕСЛИ': 'AVERAGEIF', 'СРЗНАЧЕСЛИМН': 'AVERAGEIFS', 'ВПР': 'VLOOKUP', 'ПРОСМОТРX': 'XLOOKUP', 'ПРОСМОТРХ': 'XLOOKUP', 'ИНДЕКС': 'INDEX', 'ПОИСКПОЗ': 'MATCH',
    'ЛЕВСИМВ': 'LEFT', 'ПРАВСИМВ': 'RIGHT', 'ПСТР': 'MID', 'ДЛСТР': 'LEN', 'ПРОПИСН': 'UPPER', 'СТРОЧН': 'LOWER', 'ПРОПНАЧ': 'PROPER', 'СЖПРОБЕЛЫ': 'TRIM',
    'СЦЕП': 'CONCAT', 'СЦЕПИТЬ': 'CONCATENATE', 'ЗНАЧЕН': 'VALUE', 'ПОДСТАВИТЬ': 'SUBSTITUTE', 'СУММПРОИЗВ': 'SUMPRODUCT', 'ГОД': 'YEAR', 'МЕСЯЦ': 'MONTH', 'ДЕНЬ': 'DAY', 'НАЙТИ': 'FIND'
  };

  // ---------- tokenizer ----------
  function tokenize(src) {
    let s = src.trim();
    if (s[0] === '=') s = s.slice(1);
    const semi = /;/.test(s.replace(/"[^"]*"/g, ''));
    const toks = []; let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      if (c === '"') { let j = i + 1, str = ''; for (;;) { if (j >= s.length) throw new Error('Тырнақша жабылмаған: "'); if (s[j] === '"') { if (s[j + 1] === '"') { str += '"'; j += 2; continue; } break; } str += s[j++]; } toks.push({ t: 'str', v: str }); i = j + 1; continue; }
      const num = (semi ? /^\d+(?:,\d+)?(?:[eE][+-]?\d+)?/ : /^\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/).exec(s.slice(i)) || /^\.\d+/.exec(s.slice(i));
      const ref = /^(?:(?:'([^']+)'|([A-Za-zА-Яа-яЁёӘәҒғҚқҢңӨөҰұҮүҺһІі_][\wА-Яа-яЁёӘәҒғҚқҢңӨөҰұҮүҺһІі]*))!)?\$?([A-Za-z]{1,2})\$?(\d+)(?::\$?([A-Za-z]{1,2})\$?(\d+))?(?![\w(])/.exec(s.slice(i));
      if (ref && !(num && num.index === 0 && num[0].length >= ref[0].length)) { toks.push({ t: 'ref', sheet: ref[1] || ref[2] || null, c1: ref[3].toUpperCase(), r1: +ref[4], c2: ref[5] ? ref[5].toUpperCase() : null, r2: ref[6] ? +ref[6] : null }); i += ref[0].length; continue; }
      if (num) { toks.push({ t: 'num', v: parseFloat(num[0].replace(',', '.')) }); i += num[0].length; continue; }
      const fn = /^([A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё0-9.]*)\s*\(/.exec(s.slice(i));
      if (fn) { toks.push({ t: 'fn', v: fn[1].toUpperCase() }); i += fn[0].length; continue; }
      const word = /^(TRUE|FALSE|ИСТИНА|ЛОЖЬ)(?![\w(])/i.exec(s.slice(i));
      if (word) { toks.push({ t: 'bool', v: /^(TRUE|ИСТИНА)$/i.test(word[1]) }); i += word[0].length; continue; }
      const op = /^(<>|<=|>=|[-+*/^&=<>%(),;])/.exec(s.slice(i));
      if (op) { let v = op[1]; if (v === ';' || (v === ',' && !semi)) { toks.push({ t: 'op', v: 'sep', raw: v }); i += op[0].length; continue; } else if (v === ',') throw new Error('Үтір дұрыс емес жерде'); toks.push({ t: 'op', v }); i += op[0].length; continue; }
      throw new Error(`Түсініксіз белгі: «${s.slice(i, i + 8)}»`);
    }
    return toks;
  }

  // ---------- parser (precedence: comparison < & < +- < */ < ^ < unary < %) ----------
  function parse(src) {
    const toks = tokenize(src); let p = 0;
    const peek = () => toks[p], next = () => toks[p++];
    const isOp = (v) => peek() && peek().t === 'op' && peek().v === v;
    const fns = [];
    function expr() { return cmp(); }
    function cmp() { let l = cat(); while (peek() && peek().t === 'op' && ['=', '<>', '<', '>', '<=', '>='].includes(peek().v)) { const o = next().v; l = { k: 'bin', o, l, r: cat() }; } return l; }
    function cat() { let l = add(); while (isOp('&')) { next(); l = { k: 'bin', o: '&', l, r: add() }; } return l; }
    function add() { let l = mul(); while (isOp('+') || isOp('-')) { const o = next().v; l = { k: 'bin', o, l, r: mul() }; } return l; }
    function mul() { let l = pow(); while (isOp('*') || isOp('/')) { const o = next().v; l = { k: 'bin', o, l, r: pow() }; } return l; }
    function pow() { let l = un(); while (isOp('^')) { next(); l = { k: 'bin', o: '^', l, r: un() }; } return l; }
    function un() { if (isOp('-')) { next(); return { k: 'neg', e: un() }; } if (isOp('+')) { next(); return un(); } return pct(); }
    function pct() { let e = atom(); while (isOp('%')) { next(); e = { k: 'bin', o: '/', l: e, r: { k: 'lit', v: 100 } }; } return e; }
    function atom() {
      const t = next();
      if (!t) throw new Error('Формула аяқталмаған');
      if (t.t === 'num' || t.t === 'str' || t.t === 'bool') return { k: 'lit', v: t.v };
      if (t.t === 'ref') return { k: 'ref', ...t };
      if (t.t === 'fn') {
        const name = RU[t.v] || t.v.replace(/^_XLFN\./, '');
        fns.push(name);
        const args = [];
        if (!isOp(')')) { for (;;) { if (isOp('sep')) args.push({ k: 'lit', v: null }); else args.push(expr()); if (isOp('sep')) { next(); continue; } break; } }
        if (!isOp(')')) throw new Error(`${t.v} функциясының жақшасы жабылмаған`);
        next();
        return { k: 'fn', name, raw: t.v, args };
      }
      if (t.t === 'op' && t.v === '(') { const e = expr(); if (!isOp(')')) throw new Error('Жақша жабылмаған'); next(); return e; }
      throw new Error(`Күтпеген белгі: «${t.v}»`);
    }
    const ast = expr();
    if (p < toks.length) throw new Error(`Артық белгі: «${toks[p].raw || toks[p].v || ''}». Жақшаларды немесе бөлгіштерді тексеріңіз.`);
    return { ast, fns, refs: toks.filter(t => t.t === 'ref').length };
  }

  // ---------- evaluation ----------
  const colNum = c => c.split('').reduce((n, ch) => n * 26 + ch.charCodeAt(0) - 64, 0);
  const colName = n => { let s = ''; while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; };

  function makeCtx(book, defaultSheet) {
    const findSheet = name => {
      if (!name) return book[defaultSheet];
      const s = Object.values(book).find(x => x.name.toLowerCase() === name.toLowerCase()) || book[name];
      return s || null;
    };
    const cell = (sh, c, r) => { const row = sh.rows[r - 1]; const v = row ? row[c - 1] : undefined; return v === undefined || v === '' ? null : v; };
    return {
      range(n) {
        const sh = findSheet(n.sheet); if (!sh) return REF();
        const c1 = colNum(n.c1), r1 = n.r1, c2 = n.c2 ? colNum(n.c2) : c1, r2 = n.r2 || r1;
        const out = [];
        for (let r = Math.min(r1, r2); r <= Math.max(r1, r2); r++) { const row = []; for (let c = Math.min(c1, c2); c <= Math.max(c1, c2); c++) row.push(cell(sh, c, r)); out.push(row); }
        return { range: out };
      }
    };
  }

  const isRange = v => v && v.range;
  const flat = v => isRange(v) ? v.range.flat() : [v];
  function scalar(v) { if (isRange(v)) { if (v.range.length === 1 && v.range[0].length === 1) return v.range[0][0]; return VAL(); } return v; }
  function toNum(v) {
    v = scalar(v);
    if (isErr(v)) return v;
    if (v === null) return 0;
    if (typeof v === 'boolean') return v ? 1 : 0;
    if (typeof v === 'number') return v;
    const s = String(v).trim().replace(/\s/g, '').replace(',', '.');
    if (s !== '' && !isNaN(Number(s))) return Number(s);
    const d = toDate(v); if (d) return d.serial;
    return VAL();
  }
  function toStr(v) { v = scalar(v); if (isErr(v)) return v; if (v === null) return ''; if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE'; if (typeof v === 'number') return String(Math.round(v * 1e10) / 1e10); return String(v); }
  function toBool(v) { v = scalar(v); if (isErr(v)) return v; if (typeof v === 'boolean') return v; if (typeof v === 'number') return v !== 0; if (v === null) return false; const s = String(v).toUpperCase(); if (s === 'TRUE') return true; if (s === 'FALSE') return false; return VAL(); }
  function toDate(v) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(v).trim()); if (!m) return null;
    const ms = Date.UTC(+m[1], +m[2] - 1, +m[3]);
    return { y: +m[1], m: +m[2], d: +m[3], serial: Math.round(ms / 86400000) + 25569 };
  }
  function fromSerial(n) { const d = new Date((n - 25569) * 86400000); return { y: d.getUTCFullYear(), m: d.getUTCMonth() + 1, d: d.getUTCDate() }; }
  function cmpVals(a, b) {
    // Excel order: numbers < text < booleans; text compares case-insensitively.
    const rank = v => typeof v === 'number' ? 0 : typeof v === 'string' ? 1 : 2;
    if (a === null) a = typeof b === 'string' ? '' : 0;
    if (b === null) b = typeof a === 'string' ? '' : 0;
    if (rank(a) !== rank(b)) return rank(a) - rank(b);
    if (typeof a === 'string') { const x = a.toLowerCase(), y = b.toLowerCase(); return x < y ? -1 : x > y ? 1 : 0; }
    return a < b ? -1 : a > b ? 1 : 0;
  }
  function eqLoose(a, b) {
    if (typeof a === 'number' || typeof b === 'number') { const x = typeof a === 'number' ? a : Number(a), y = typeof b === 'number' ? b : Number(b); return a !== null && b !== null && !isNaN(x) && !isNaN(y) && Math.abs(x - y) < 1e-9; }
    return String(a == null ? '' : a).toLowerCase() === String(b == null ? '' : b).toLowerCase();
  }
  function criterion(c) {
    c = scalar(c);
    if (typeof c === 'number') return v => typeof v === 'number' ? Math.abs(v - c) < 1e-9 : (v !== null && String(v).trim() !== '' && Number(v) === c);
    const s = c === null ? '' : String(c);
    const m = /^(<>|<=|>=|=|<|>)?(.*)$/s.exec(s);
    const op = m[1] || '=', rhs = m[2];
    const n = rhs.trim() !== '' && !isNaN(Number(rhs.replace(',', '.'))) ? Number(rhs.replace(',', '.')) : null;
    if (n !== null && op !== '=' && op !== '<>') return v => typeof v === 'number' && ({ '<': v < n, '>': v > n, '<=': v <= n, '>=': v >= n })[op];
    if (n !== null) return op === '=' ? v => typeof v === 'number' ? v === n : String(v ?? '') === rhs : v => !(typeof v === 'number' ? v === n : String(v ?? '') === rhs);
    if (op === '<' || op === '>' || op === '<=' || op === '>=') return v => typeof v === 'string' && ({ '<': cmpVals(v, rhs) < 0, '>': cmpVals(v, rhs) > 0, '<=': cmpVals(v, rhs) <= 0, '>=': cmpVals(v, rhs) >= 0 })[op];
    const re = new RegExp('^' + rhs.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/~\*/g, '\u0001').replace(/\*/g, '.*').replace(/\?/g, '.').replace(/\u0001/g, '\\*') + '$', 'is');
    const match = v => rhs === '' ? (v === null || v === '') : (v !== null && re.test(String(v)));
    return op === '<>' ? v => !match(v) : match;
  }
  const nums = args => { const out = []; for (const a of args) { if (isRange(a)) { for (const v of flat(a)) { if (isErr(v)) return v; if (typeof v === 'number') out.push(v); } } else { const n = toNum(a); if (isErr(n)) return n; out.push(n); } } return out; };
  const firstErr = (...vs) => vs.find(isErr);
  const roundTo = (x, d, mode) => { const f = Math.pow(10, d); const y = x * f; const r = mode === 'up' ? Math.sign(y) * Math.ceil(Math.abs(y) - 1e-9) : mode === 'down' ? Math.sign(y) * Math.floor(Math.abs(y) + 1e-9) : Math.sign(y) * Math.round(Math.abs(y) + 1e-9); return r / f; };

  function multiIf(rangeArgs, crits) {
    const ranges = rangeArgs.map(r => flat(r)), tests = crits.map(criterion);
    const len = ranges[0].length;
    if (ranges.some(r => r.length !== len)) return VAL();
    const idx = []; for (let i = 0; i < len; i++) if (tests.every((t, k) => t(ranges[k][i]))) idx.push(i);
    return idx;
  }

  const F = {
    SUM: a => { const n = nums(a); return isErr(n) ? n : n.reduce((x, y) => x + y, 0); },
    AVERAGE: a => { const n = nums(a); return isErr(n) ? n : n.length ? n.reduce((x, y) => x + y, 0) / n.length : DIV0(); },
    COUNT: a => a.reduce((k, v) => k + flat(v).filter(x => typeof x === 'number').length, 0),
    COUNTA: a => a.reduce((k, v) => k + flat(v).filter(x => x !== null && x !== '').length, 0),
    COUNTBLANK: a => a.reduce((k, v) => k + flat(v).filter(x => x === null || x === '').length, 0),
    MIN: a => { const n = nums(a); return isErr(n) ? n : n.length ? Math.min(...n) : 0; },
    MAX: a => { const n = nums(a); return isErr(n) ? n : n.length ? Math.max(...n) : 0; },
    MEDIAN: a => { const n = nums(a); if (isErr(n)) return n; if (!n.length) return NA(); n.sort((x, y) => x - y); const m = n.length >> 1; return n.length % 2 ? n[m] : (n[m - 1] + n[m]) / 2; },
    ROUND: ([x, d]) => { const a = toNum(x), b = d ? toNum(d) : 0; return firstErr(a, b) || roundTo(a, b); },
    ROUNDUP: ([x, d]) => { const a = toNum(x), b = d ? toNum(d) : 0; return firstErr(a, b) || roundTo(a, b, 'up'); },
    ROUNDDOWN: ([x, d]) => { const a = toNum(x), b = d ? toNum(d) : 0; return firstErr(a, b) || roundTo(a, b, 'down'); },
    ABS: ([x]) => { const a = toNum(x); return isErr(a) ? a : Math.abs(a); },
    AND: a => { const v = a.flatMap(flat).filter(x => x !== null).map(toBool); return v.find(isErr) || v.every(Boolean); },
    OR: a => { const v = a.flatMap(flat).filter(x => x !== null).map(toBool); return v.find(isErr) || v.some(Boolean); },
    NOT: ([x]) => { const b = toBool(x); return isErr(b) ? b : !b; },
    COUNTIF: ([r, c]) => flat(r).filter(criterion(c)).length,
    COUNTIFS: a => { const idx = multiIf(a.filter((_, i) => i % 2 === 0), a.filter((_, i) => i % 2 === 1)); return isErr(idx) ? idx : idx.length; },
    SUMIF: ([r, c, s]) => { const rv = flat(r), sv = flat(s || r), t = criterion(c); let sum = 0; rv.forEach((v, i) => { if (t(v) && typeof sv[i] === 'number') sum += sv[i]; }); return sum; },
    SUMIFS: ([s, ...rest]) => { const idx = multiIf(rest.filter((_, i) => i % 2 === 0), rest.filter((_, i) => i % 2 === 1)); if (isErr(idx)) return idx; const sv = flat(s); if (sv.length !== flat(rest[0]).length) return VAL(); return idx.reduce((k, i) => k + (typeof sv[i] === 'number' ? sv[i] : 0), 0); },
    AVERAGEIF: ([r, c, s]) => { const rv = flat(r), sv = flat(s || r), t = criterion(c); const xs = []; rv.forEach((v, i) => { if (t(v) && typeof sv[i] === 'number') xs.push(sv[i]); }); return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : DIV0(); },
    AVERAGEIFS: ([s, ...rest]) => { const idx = multiIf(rest.filter((_, i) => i % 2 === 0), rest.filter((_, i) => i % 2 === 1)); if (isErr(idx)) return idx; const sv = flat(s); const xs = idx.map(i => sv[i]).filter(x => typeof x === 'number'); return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : DIV0(); },
    VLOOKUP: ([v, r, c, approx]) => {
      const key = scalar(v); if (isErr(key)) return key;
      const col = toNum(c); if (isErr(col)) return col;
      if (!isRange(r)) return VAL(); const rows = r.range;
      if (col < 1 || col > rows[0].length) return REF();
      // Excel's default (4th argument omitted or TRUE) is approximate match on a sorted first column.
      const exact = approx !== undefined && approx !== null && toBool(approx) === false;
      if (exact) { const i = rows.findIndex(row => eqLoose(row[0], key)); return i < 0 ? NA() : rows[i][col - 1]; }
      let hit = -1;
      for (let i = 0; i < rows.length; i++) { if (rows[i][0] === null) continue; if (cmpVals(rows[i][0], key) <= 0) hit = i; else break; }
      return hit < 0 ? NA() : rows[hit][col - 1];
    },
    XLOOKUP: ([v, look, ret, ifNot]) => {
      const key = scalar(v); if (isErr(key)) return key;
      const lv = flat(look), rv = isRange(ret) ? ret.range : [[ret]];
      const i = lv.findIndex(x => eqLoose(x, key));
      if (i < 0) return ifNot !== undefined ? scalar(ifNot) : NA();
      if (rv.length === lv.length) return rv[i].length === 1 ? rv[i][0] : { range: [rv[i]] };
      if (rv.length === 1 && rv[0].length === lv.length) return rv[0][i];
      return VAL();
    },
    INDEX: ([r, row, col]) => {
      if (!isRange(r)) return VAL(); const rows = r.range;
      let ri = toNum(row), ci = col !== undefined ? toNum(col) : 1; if (isErr(ri)) return ri; if (isErr(ci)) return ci;
      if (rows.length === 1 && col === undefined) { ci = ri; ri = 1; }
      if (ri < 1 || ri > rows.length || ci < 1 || ci > rows[0].length) return REF();
      return rows[ri - 1][ci - 1];
    },
    MATCH: ([v, r, type]) => {
      const key = scalar(v); if (isErr(key)) return key;
      const lv = flat(r), t = type === undefined ? 1 : toNum(type);
      if (t === 0) { const i = lv.findIndex(x => eqLoose(x, key)); return i < 0 ? NA() : i + 1; }
      let hit = -1; for (let i = 0; i < lv.length; i++) if (lv[i] !== null && (t > 0 ? cmpVals(lv[i], key) <= 0 : cmpVals(lv[i], key) >= 0)) hit = i; else if (lv[i] !== null) break;
      return hit < 0 ? NA() : hit + 1;
    },
    LEFT: ([s, n]) => { const t = toStr(s), k = n === undefined ? 1 : toNum(n); return firstErr(t, k) || [...t].slice(0, k).join(''); },
    RIGHT: ([s, n]) => { const t = toStr(s), k = n === undefined ? 1 : toNum(n); return firstErr(t, k) || (k <= 0 ? '' : [...t].slice(-k).join('')); },
    MID: ([s, a, n]) => { const t = toStr(s), i = toNum(a), k = toNum(n); return firstErr(t, i, k) || [...t].slice(i - 1, i - 1 + k).join(''); },
    LEN: ([s]) => { const t = toStr(s); return isErr(t) ? t : [...t].length; },
    UPPER: ([s]) => { const t = toStr(s); return isErr(t) ? t : t.toUpperCase(); },
    LOWER: ([s]) => { const t = toStr(s); return isErr(t) ? t : t.toLowerCase(); },
    PROPER: ([s]) => { const t = toStr(s); return isErr(t) ? t : t.toLowerCase().replace(/(^|[^\p{L}])(\p{L})/gu, (m, a, b) => a + b.toUpperCase()); },
    TRIM: ([s]) => { const t = toStr(s); return isErr(t) ? t : t.replace(/ +/g, ' ').trim(); },
    CONCAT: a => { const parts = a.flatMap(flat).map(toStr); return parts.find(isErr) || parts.join(''); },
    CONCATENATE: a => F.CONCAT(a),
    VALUE: ([s]) => toNum(s),
    SUBSTITUTE: ([s, a, b]) => { const t = toStr(s), x = toStr(a), y = toStr(b); return firstErr(t, x, y) || (x === '' ? t : t.split(x).join(y)); },
    FIND: ([a, s]) => { const x = toStr(a), t = toStr(s); if (firstErr(x, t)) return firstErr(x, t); const i = t.indexOf(x); return i < 0 ? VAL() : i + 1; },
    SUMPRODUCT: a => { const arrs = a.map(flat); const n = arrs[0].length; if (arrs.some(x => x.length !== n)) return VAL(); let s = 0; for (let i = 0; i < n; i++) s += arrs.reduce((p, x) => p * (typeof x[i] === 'number' ? x[i] : 0), 1); return s; },
    YEAR: ([d]) => { const v = scalar(d); const t = typeof v === 'number' ? fromSerial(v) : toDate(v); return t ? t.y : VAL(); },
    MONTH: ([d]) => { const v = scalar(d); const t = typeof v === 'number' ? fromSerial(v) : toDate(v); return t ? t.m : VAL(); },
    DAY: ([d]) => { const v = scalar(d); const t = typeof v === 'number' ? fromSerial(v) : toDate(v); return t ? t.d : VAL(); }
  };
  const LAZY = {
    IF(args, ev) { const c = toBool(ev(args[0])); if (isErr(c)) return c; return c ? (args[1] ? scalar(ev(args[1])) : true) : (args[2] ? scalar(ev(args[2])) : false); },
    IFERROR(args, ev) { const v = scalar(ev(args[0])); return isErr(v) ? scalar(ev(args[1])) : v; },
    IFS(args, ev) { for (let i = 0; i + 1 < args.length; i += 2) { const c = toBool(ev(args[i])); if (isErr(c)) return c; if (c) return scalar(ev(args[i + 1])); } return NA(); }
  };

  function evaluate(ast, ctx) {
    const ev = n => {
      switch (n.k) {
        case 'lit': return n.v;
        case 'ref': return ctx.range(n);
        case 'neg': { const v = toNum(ev(n.e)); return isErr(v) ? v : -v; }
        case 'fn': {
          if (LAZY[n.name]) return LAZY[n.name](n.args, ev);
          const f = F[n.name]; if (!f) return NAME();
          const args = n.args.map(ev);
          const e = args.find(a => isErr(a)); if (e && !['IFERROR'].includes(n.name)) return e;
          return f(args);
        }
        case 'bin': {
          const a = ev(n.l), b = ev(n.r);
          if (n.o === '&') { const x = toStr(a), y = toStr(b); return firstErr(x, y) || x + y; }
          if (['=', '<>', '<', '>', '<=', '>='].includes(n.o)) {
            const x = scalar(a), y = scalar(b); if (firstErr(x, y)) return firstErr(x, y);
            const c = cmpVals(x, y);
            return { '=': c === 0, '<>': c !== 0, '<': c < 0, '>': c > 0, '<=': c <= 0, '>=': c >= 0 }[n.o];
          }
          const x = toNum(a), y = toNum(b); if (firstErr(x, y)) return firstErr(x, y);
          if (n.o === '+') return x + y; if (n.o === '-') return x - y; if (n.o === '*') return x * y;
          if (n.o === '/') return y === 0 ? DIV0() : x / y;
          if (n.o === '^') return Math.pow(x, y);
        }
      }
      return VAL();
    };
    return scalar(ev(ast));
  }

  function run(formula, book, sheetId) {
    const f = String(formula || '').trim();
    if (!f) return { ok: false, error: 'Формула бос.' };
    if (f[0] !== '=') return { ok: false, error: 'Формула <code>=</code> белгісінен басталуы керек.' };
    let parsed;
    try { parsed = parse(f); } catch (e) { return { ok: false, error: e.message }; }
    const unknown = parsed.fns.filter(n => !F[n] && !LAZY[n]);
    if (unknown.length) return { ok: false, error: `Мұндай функция жоқ немесе бұл тренажерде қолдау көрсетілмейді: ${unknown.join(', ')}` };
    const value = evaluate(parsed.ast, makeCtx(book, sheetId));
    return { ok: true, value, isError: isErr(value), fns: parsed.fns, refs: parsed.refs };
  }

  function show(v) {
    if (isErr(v)) return v.code;
    if (v === null || v === undefined) return '0';
    if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE';
    if (typeof v === 'number') return (Math.round(v * 100) / 100).toLocaleString('ru-RU').replace(/\u00a0/g, ' ');
    return String(v);
  }
  function same(a, b) {
    if (isErr(a) || isErr(b)) return isErr(a) && isErr(b) && a.code === b.code;
    if (typeof a === 'number' && typeof b === 'number') return Math.abs(a - b) < 0.005 + 1e-9 * Math.abs(b);
    if (a === null) a = 0; if (b === null) b = 0;
    return String(a) === String(b);
  }
  // A copy of the workbook with the sheet's numeric columns changed, to catch typed-in constants.
  function perturb(book) {
    const out = {};
    for (const [id, sh] of Object.entries(book)) {
      const vary = new Set((sh.vary || []).map(colNum));
      out[id] = Object.assign({}, sh, { rows: sh.rows.map((row, r) => r === 0 ? row : row.map((v, c) => vary.has(c + 1) && typeof v === 'number' ? v + ((r * 7 + c * 3) % 5 + 1) * (Number.isInteger(v) ? 1 : 0.5) : v)) });
    }
    return out;
  }

  function check(ex, formula) {
    const book = DJ.sheets;
    const mine = run(formula, book, ex.sheet);
    if (!mine.ok) return { pass: false, msg: String(mine.error).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])) };
    if (mine.isError) return { pass: false, msg: `Формула қате қайтарды: <b>${mine.value.code}</b>. ${ERRHELP[mine.value.code] || ''}`, value: show(mine.value) };
    const c = ex.check || {};
    for (const fn of c.fns || []) if (!mine.fns.includes(fn)) return { pass: false, msg: `Бұл тапсырмада <code>${fn}</code> функциясын қолданыңыз.`, value: show(mine.value) };
    if (!mine.refs) return { pass: false, msg: 'Формулада ұяшыққа сілтеме жоқ. Санды қолмен жазбай, ұяшықтарға сілтеңіз (мысалы <code>E2</code>).', value: show(mine.value) };
    const ref = run(ex.solution, book, ex.sheet);
    if (!same(mine.value, ref.value)) return { pass: false, msg: 'Нәтиже күткендей емес. Ауқымды (range) және шарттарды тексеріңіз.', value: show(mine.value) };
    const pb = perturb(book);
    const m2 = run(formula, pb, ex.sheet), r2 = run(ex.solution, pb, ex.sheet);
    if (!same(m2.value, r2.value)) return { pass: false, msg: 'Нәтиже қазір сәйкес келеді, бірақ деректер өзгерсе, формула дұрыс есептемейді. Мәндерді қолмен жазбай, ұяшықтарға сілтеңіз.', value: show(mine.value) };
    return { pass: true, value: show(mine.value) };
  }
  const ERRHELP = {
    '#N/A': 'Іздеген мән табылмады: іздеу ауқымы мен мәнді тексеріңіз.',
    '#DIV/0!': 'Нөлге бөлу болды.',
    '#VALUE!': 'Мәтін мен санды араластырдыңыз немесе ауқым дұрыс емес.',
    '#NAME?': 'Функция атауы қате.',
    '#REF!': 'Сілтеме кестеден тыс шықты.'
  };

  DJ.sheet = { run, check, show, colName, parse };
})();
