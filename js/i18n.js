// Interface language: Kazakh (source), Russian or English.
// The pages are written in Kazakh. For ru/en this file swaps interface text in the DOM using DJ.I18N_UI
// (text nodes and a few attributes, as they appear), and loads content/i18n/<lang>/*.js, which replaces
// lesson text in DJ.modules before the app starts. Code, starters, solutions and datasets stay as they are.
(function () {
  const LANGS = { kk: 'Қазақша', ru: 'Русский', en: 'English' };
  const SHORT = { kk: 'ҚАЗ', ru: 'РУС', en: 'ENG' };
  // Courses whose lessons have ru/en text in content/i18n/<lang>/<file>.js.
  const TRANSLATED = ['python', 'sql'];
  let lang = 'kk';
  try { lang = localStorage.getItem('dj.lang') || ''; } catch (e) { lang = ''; }
  if (!LANGS[lang]) {
    const nav = (navigator.languages || [navigator.language || '']).join(',').toLowerCase();
    lang = /(^|,)kk/.test(nav) ? 'kk' : /(^|,)(ru|be|uk)/.test(nav) ? 'ru' : /(^|,)en/.test(nav) ? 'en' : 'kk';
  }
  const col = lang === 'ru' ? 0 : 1;
  document.documentElement.lang = lang;

  const exact = new Map(), patterns = [];
  const reEsc = s => s.replace(/[.*+?^$()|[\]\\]/g, '\\$&');
  function load(dict) {
    for (const k in dict) {
      const v = dict[k] && dict[k][col];
      if (!v) continue;
      if (k.includes('{}')) {
        // A {} glued to a word ("жол{}") is an optional ending: it may be empty and never starts with a letter.
        const parts = k.split('{}');
        const re = parts.map((s, i) => reEsc(s) + (i === parts.length - 1 ? '' : /\p{L}$/u.test(s) ? '((?!\\p{L}).*?)' : '(.+?)')).join('');
        patterns.push({ re: new RegExp('^' + re + '$', 'u'), v, n: k.length });
      }
      else exact.set(k, v);
    }
    patterns.sort((a, b) => b.n - a.n); // longer, more specific keys first
  }
  if (lang !== 'kk' && DJ.I18N_UI) load(DJ.I18N_UI);

  const CYR = /[А-Яа-яӘәҒғҚқҢңӨөҰұҮүІіҺһЁё]/;
  // Translates one phrase (no surrounding spaces); returns null when it is unknown.
  function phrase(s) {
    if (exact.has(s)) return exact.get(s);
    const code = s.match(/^([A-Z]\d[\w.]*) (.+)$/); // "M0.1 Дерек әлемі": a module code before the title
    if (code && exact.has(code[2])) return code[1] + ' ' + exact.get(code[2]);
    for (const p of patterns) {
      const m = s.match(p.re);
      if (m) { let i = 1; return p.v.replace(/\{\}/g, () => { const g = m[i++] || ''; return phrase(g) || g; }); }
    }
    return null;
  }
  // Number agreement after a count: "3 заданий" → "3 задания", "1 tasks" → "1 task".
  const RU = { 'заданий': ['задание', 'задания'], 'уроков': ['урок', 'урока'], 'модулей': ['модуль', 'модуля'], 'строк': ['строка', 'строки'],
    'дней': ['день', 'дня'], 'вопросов': ['вопрос', 'вопроса'], 'значков': ['значок', 'значка'], 'часов': ['час', 'часа'] };
  const EN = { tasks: 'task', lessons: 'lesson', modules: 'module', rows: 'row', days: 'day', questions: 'question', badges: 'badge', hours: 'hour' };
  function agree(t) {
    if (lang === 'ru') return t.replace(/(\d+)( \/ \d+)? (заданий|уроков|модулей|строк|дней|вопросов|значков|часов)(?![а-яё])/g, (m, n, of, w) => {
      const k = Number(n) % 100, d = k % 10;
      const f = k >= 11 && k <= 14 ? w : d === 1 ? RU[w][0] : d >= 2 && d <= 4 ? RU[w][1] : w;
      return n + (of || '') + ' ' + f;
    });
    return t.replace(/(^|[^\d.])1( \/ \d+)? (tasks|lessons|modules|rows|days|questions|badges|hours)\b/g, (m, a, of, w) => of ? m : a + '1 ' + EN[w]);
  }
  // Translates a text as the extractor split it: by " · ", keeping the outer whitespace.
  function tr(text) {
    if (lang === 'kk' || !text || !CYR.test(text)) return text;
    const lead = text.match(/^\s*/)[0], trail = text.slice(lead.length).match(/\s*$/)[0];
    const core = text.slice(lead.length, text.length - trail.length).replace(/\s+/g, ' ');
    let hit = false;
    const out = core.split(' · ').map(seg => { const t = phrase(seg.trim()); if (t != null) { hit = true; return t; } return seg; }).join(' · ');
    return hit ? lead + agree(out) + trail : text;
  }

  // Lesson text inside these is translated in the data (content/i18n), never by phrase lookup.
  const SKIP = 'script,style,pre,code,textarea,.CodeMirror,.prose,.terminal table,.output table,.sheet-grid,[data-noi18n]';
  const ATTRS = ['aria-label', 'title', 'placeholder', 'alt', 'data-label'];
  function textNode(n) {
    const v = n.nodeValue;
    if (!v || !CYR.test(v)) return;
    const p = n.parentElement;
    if (p && p.closest(SKIP)) return;
    const t = tr(v);
    if (t !== v) n.nodeValue = t;
  }
  function attrs(el) {
    for (const a of ATTRS) {
      const v = el.getAttribute(a);
      if (v && CYR.test(v)) { const t = tr(v); if (t !== v) el.setAttribute(a, t); }
    }
  }
  function walk(root) {
    if (root.nodeType === 3) return textNode(root);
    if (root.nodeType !== 1 || root.matches(SKIP)) return;
    attrs(root);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode: n => n.nodeType === 1 && n.matches(SKIP) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });
    for (let n = w.nextNode(); n; n = w.nextNode()) n.nodeType === 3 ? textNode(n) : attrs(n);
  }
  function start() {
    walk(document.documentElement);
    new MutationObserver(list => {
      for (const m of list) {
        if (m.type === 'childList') m.addedNodes.forEach(walk);
        else if (m.type === 'characterData') textNode(m.target);
        else if (m.type === 'attributes') attrs(m.target);
      }
    }).observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }

  // Lesson patches: { lessonId: { title, body, ex: [{ prompt, hints, options, explain, ... }] } } and
  // { moduleId: { intro } } under modules. Called by content/i18n/<lang>.js, which loads before js/app.js.
  function patch(p) {
    const byId = {};
    for (const id in DJ.modules) (DJ.modules[id].lessons || []).forEach(l => { byId[l.id] = l; });
    for (const id in p.modules || {}) if (DJ.modules[id]) Object.assign(DJ.modules[id], p.modules[id]);
    for (const id in p.lessons || {}) {
      const l = byId[id], t = p.lessons[id];
      if (!l) continue;
      const { ex, ...rest } = t;
      Object.assign(l, rest);
      (ex || []).forEach((e, i) => {
        const x = l.exercises && l.exercises[i];
        if (!x || !e) return;
        const { check, ...r } = e;
        Object.assign(x, r);
        if (check && x.check) Object.assign(x.check, check);
      });
    }
  }

  function set(l) {
    if (!LANGS[l] || l === lang) return;
    try { localStorage.setItem('dj.lang', l); } catch (e) { /* private mode: applies to this page only */ }
    location.reload();
  }
  function picker(cls) {
    return `<label class="lang-pick ${cls || ''}" data-noi18n><span class="sr-only">Language</span><select data-lang-pick aria-label="Тіл / Язык / Language">${
      Object.keys(LANGS).map(k => `<option value="${k}" ${k === lang ? 'selected' : ''}>${SHORT[k]}</option>`).join('')}</select></label>`;
  }
  document.addEventListener('change', e => { if (e.target.matches && e.target.matches('[data-lang-pick]')) set(e.target.value); });

  // Native dialogs get the same lookup.
  ['alert', 'confirm'].forEach(f => { const o = window[f]; if (o) window[f] = msg => o.call(window, typeof msg === 'string' ? tr(msg) : msg); });

  DJ.i18n = { lang, LANGS, tr, patch, set, picker };
  if (lang !== 'kk') {
    const v = window.DJ_VERSION ? '?v=' + window.DJ_VERSION : '';
    // Parser-inserted, so they run before js/app.js. One file per translated course.
    TRANSLATED.forEach(c => document.write(`<script src="content/i18n/${lang}/${c}.js${v}"><\/script>`));
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  }
})();
