// UI: auth, dashboard, module and lesson screens, curriculum map, diagnostic, profile.
(function () {
  const S = DJ.store;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const lsGet = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };

  const sv = (d, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`;
  const ICON = {
    spark: sv('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>'),
    db: sv('<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>'),
    code: sv('<path d="M8 6l-6 6 6 6M16 6l6 6-6 6"/>'),
    link: sv('<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>'),
    flag: sv('<path d="M4 22V4M4 4h13l-2 4 2 4H4"/>'),
    flame: sv('<path d="M12 22c4 0 7-3 7-7 0-5-5-7-5-12-3 2-4 5-4 7-1-1-2-2-2-4-2 2-3 5-3 9 0 4 3 7 7 7z"/>'),
    star: sv('<path d="M12 2l3 6.5 7 .9-5.2 4.8 1.4 7L12 17.8 5.8 21.2l1.4-7L2 9.4l7-.9z"/>'),
    bolt: sv('<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>'),
    compass: sv('<circle cx="12" cy="12" r="10"/><path d="M16 8l-2 6-6 2 2-6z"/>'),
    check: sv('<path d="M5 12l5 5L20 7"/>'),
    play: sv('<path d="M7 4l13 8-13 8z"/>'),
    lock: sv('<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'),
    trophy: sv('<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM7 6H3c0 3 2 5 4 5M17 6h4c0 3-2 5-4 5"/>')
  };
  const LOGO = `<svg class="logo-mark" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="9" fill="var(--accent)"/><rect x="7" y="17" width="4" height="8" rx="1.5" fill="var(--accent-ink)"/><rect x="14" y="12" width="4" height="13" rx="1.5" fill="var(--accent-ink)"/><rect x="21" y="15" width="4" height="10" rx="1.5" fill="var(--accent-ink)"/><circle cx="23" cy="8" r="3" fill="var(--gold)"/></svg>`;

  // ---------- theme ----------
  function applyTheme(t) { if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t); else document.documentElement.removeAttribute('data-theme'); }
  applyTheme(lsGet('dj.theme'));

  // ---------- toasts ----------
  function toast(html, icon = 'bolt') {
    const root = $('#toast-root');
    const el = document.createElement('div');
    el.className = 'toast'; el.setAttribute('role', 'status');
    el.innerHTML = ICON[icon] + `<span>${html}</span>`;
    const n = root.children.length;
    el.style.bottom = `calc(${24 + n * 58}px + env(safe-area-inset-bottom, 0px))`;
    root.appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }
  function celebrate(r) {
    if (r.xp) toast(`+${r.xp} XP`, 'bolt');
    (r.newBadges || []).forEach(b => b && toast(`Жаңа белгі: ${esc(b.name)}`, b.icon));
    if (r.levelUp) toast(`${r.levelUp}-деңгейге көтерілдіңіз!`, 'trophy');
  }

  // ---------- routing ----------
  let route = { view: 'dash' };
  function go(view, params = {}) {
    if (cm) cm = null;
    route = Object.assign({ view }, params);
    render();
    window.scrollTo(0, 0);
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-go]');
    if (!b) return;
    e.preventDefault();
    go(b.dataset.go, { mod: b.dataset.mod, li: b.dataset.li != null ? Number(b.dataset.li) : undefined });
  });

  function render() {
    if (!S.current()) { route = { view: 'auth' }; }
    topbar();
    const views = { auth: viewAuth, dash: viewDash, module: viewModule, lesson: viewLesson, map: viewMap, diag: viewDiag, profile: viewProfile };
    (views[route.view] || viewDash)();
    document.title = 'DataJol';
  }

  // ---------- topbar ----------
  function topbar() {
    const el = $('#topbar');
    const u = S.profile();
    const logo = `<button class="logo" data-go="dash">${LOGO}<span>DataJol</span></button>`;
    if (!u) { el.innerHTML = logo; return; }
    const p = S.progress(), lv = S.level(p.xp), st = S.streakNow(p);
    const cur = v => (route.view === v || (v === 'dash' && ['module', 'lesson'].includes(route.view))) ? 'aria-current="page"' : '';
    el.innerHTML = `${logo}
      <nav class="nav" aria-label="Негізгі">
        <button data-go="dash" ${cur('dash')}>Оқу</button>
        <button data-go="map" ${cur('map')}>Карта</button>
        <button data-go="diag" ${cur('diag')}>Диагностика</button>
      </nav>
      <div class="stats">
        <span class="pill gold" title="Күндер қатарынан">${ICON.flame}${st}</span>
        <span class="pill xp" title="Тәжірибе ұпайы">${ICON.bolt}${p.xp} XP</span>
        <span class="pill hide-sm" title="Деңгей">Lv ${lv.level}</span>
        <button class="avatar" data-go="profile" aria-label="Профиль">${esc((u.name || u.username).slice(0, 1).toUpperCase())}</button>
      </div>`;
  }

  // ---------- auth ----------
  function viewAuth() {
    let mode = 'register';
    const app = $('#app');
    app.innerHTML = `
    <section class="auth">
      <div class="auth-hero">
        <div class="eyebrow">Data Analytics · Data Science · ML</div>
        <h1>Дерек тілін <em>нөлден</em> үйреніңіз</h1>
        <p class="muted">Қазақша мәтіндік сабақтар, браузерде бірден тексерілетін SQL мен Python тапсырмалары, нақты жобалар. Әр орындалған тапсырма XP береді, күн сайынғы оқу streak-ке қосылады.</p>
        <div class="terminal" aria-label="SQL мысалы"><span class="k">SELECT</span> city, <span class="k">COUNT</span>(*) <span class="k">AS</span> clients
<span class="k">FROM</span> customers
<span class="k">GROUP BY</span> city <span class="k">ORDER BY</span> clients <span class="k">DESC</span>;
<table><tr><th>city</th><th>clients</th></tr><tr><td><span class="s">Алматы</span></td><td>3</td></tr><tr><td><span class="s">Астана</span></td><td>2</td></tr><tr><td><span class="s">Шымкент</span></td><td>2</td></tr></table>
<span class="c">✓ Дұрыс! +15 XP</span></div>
        <div class="feature-chips"><span>${ICON.code}Браузерде код</span><span>${ICON.check}Бірден тексеру</span><span>${ICON.flame}Streak және XP</span><span>${ICON.trophy}Портфолио жобалары</span></div>
      </div>
      <form class="card auth-card" id="auth-form" novalidate>
        <div class="tabs" role="tablist">
          <button type="button" role="tab" data-mode="register">Тіркелу</button>
          <button type="button" role="tab" data-mode="login">Кіру</button>
        </div>
        <label class="field" id="f-name">Атыңыз<input type="text" name="name" autocomplete="name" placeholder="Айгерім"></label>
        <label class="field">Логин<input type="text" name="username" autocomplete="username" placeholder="aigerim_data" autocapitalize="off"></label>
        <label class="field">Құпиясөз<input type="password" name="pw" autocomplete="new-password" placeholder="кемінде 6 таңба"></label>
        <div class="err" id="auth-err" role="alert"></div>
        <button class="btn" type="submit" id="auth-submit">Тіркеліп, бастау</button>
        <p class="note">Бұл нұсқада аккаунт пен прогресс осы браузерде сақталады. Сервер нұсқасында олар бұлтқа көшеді.</p>
      </form>
    </section>`;
    const setMode = m => {
      mode = m;
      $$('.tabs button', app).forEach(b => b.setAttribute('aria-selected', String(b.dataset.mode === m)));
      $('#f-name').hidden = m === 'login';
      $('#auth-submit').textContent = m === 'login' ? 'Кіру' : 'Тіркеліп, бастау';
      $('[name=pw]').setAttribute('autocomplete', m === 'login' ? 'current-password' : 'new-password');
      $('#auth-err').textContent = '';
    };
    $$('.tabs button', app).forEach(b => b.onclick = () => setMode(b.dataset.mode));
    setMode(Object.keys(S.users()).length ? 'login' : 'register');
    $('#auth-form').onsubmit = async (e) => {
      e.preventDefault();
      const f = e.target;
      const err = mode === 'login' ? await S.login(f.username.value, f.pw.value) : await S.register(f.username.value, f.name.value, f.pw.value);
      if (err) { $('#auth-err').textContent = err; return; }
      go('dash');
    };
  }

  // ---------- helpers ----------
  function allModules() { const out = []; for (const ph of DJ.phases) for (const m of ph.modules) out.push(DJ.findModule(m.id)); return out; }
  function nextLesson(p) {
    const order = allModules().filter(m => m.lessons && !m.preview);
    let list = order;
    if (p.diag && p.diag.start) { const i = order.findIndex(m => m.id === p.diag.start); if (i > 0) list = order.slice(i).concat(order.slice(0, i)); }
    for (const mod of list) { const li = mod.lessons.findIndex(l => !p.lessons[l.id]); if (li >= 0) return { mod, li }; }
    return null;
  }
  function stateBadge(mod, st) {
    if (st.state === 'soon') return '<span class="badge-s soon">Жақында</span>';
    if (st.state === 'done') return '<span class="badge-s done">Аяқталды</span>';
    if (mod.preview) return '<span class="badge-s open">Алдын ала</span>';
    return `<span class="badge-s open">${st.done}/${st.total}</span>`;
  }
  const DAYS = ['Жс', 'Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сн'];
  function lastDays(n) { const out = []; for (let i = n - 1; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); out.push({ key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`, label: DAYS[d.getDay()] }); } return out; }
  const GOAL = 50;

  // ---------- dashboard ----------
  function viewDash() {
    const u = S.profile(), p = S.progress(), lv = S.level(p.xp), st = S.streakNow(p);
    const nx = nextLesson(p), career = S.careerLevel(p);
    const today = S.xpToday(p);
    const cont = nx ? `
      <div class="continue">
        <div><div class="eyebrow">${Object.keys(p.lessons).length ? 'Жалғастыру' : 'Бастау'} · ${esc(nx.mod.code)} ${esc(nx.mod.title)}</div>
        <h2>${esc(nx.mod.lessons[nx.li].title)}</h2>
        <p>Сабақ ${nx.li + 1} / ${nx.mod.lessons.length} · ${nx.mod.lessons[nx.li].minutes || 10} мин</p></div>
        <button class="btn" data-go="lesson" data-mod="${nx.mod.id}" data-li="${nx.li}">Ашу ${ICON.play}</button>
      </div>` : `<div class="continue"><div><h2>Ашық сабақтардың бәрі өтілді</h2><p>Жаңа модульдер жақында қосылады.</p></div></div>`;
    const chev = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
    const phases = DJ.phases.map(ph => `
      <section class="phase">
        <div class="phase-head"><span class="phase-tag">${ph.n}-кезең</span><h3>${esc(ph.kz)}</h3><span class="muted">${esc(ph.goal)}</span></div>
        <div class="modules">${ph.modules.map(m0 => {
          const m = DJ.findModule(m0.id), s = S.moduleState(m, p);
          const soon = s.state === 'soon';
          const attrs = soon ? 'disabled aria-disabled="true"' : `data-go="module" data-mod="${m.id}"`;
          const prog = soon ? '<span class="badge-s">Жақында</span>'
            : s.state === 'done' ? '<span class="badge-s done">Аяқталды</span>'
            : `<span class="badge-s open">${s.done} / ${s.total} сабақ</span><div class="bar"><i style="width:${s.pct}%"></i></div>`;
          return `<button class="module ${soon ? 'soon' : ''}" ${attrs}>
            <span class="code">${esc(m.code)}</span>
            <span style="min-width:0"><h3>${esc(m.title)}</h3><p>${esc(m.desc)}</p></span>
            <span class="prog">${prog}</span>
            <span class="chev">${soon ? '' : chev}</span>
          </button>`;
        }).join('')}</div>
      </section>`).join('');
    $('#app').innerHTML = `
      <div class="hello">
        <div><div class="eyebrow">${esc(career.id)} · ${esc(career.name)}</div><h1>Сәлем, ${esc(u.name)}</h1></div>
        ${p.diag ? '' : `<button class="btn ghost" data-go="diag">Деңгейді анықтау тесті</button>`}
      </div>
      <div class="kpis">
        <div class="kpi"><span class="v flame">${ICON.flame}${st}</span><span class="l">күн қатарынан</span></div>
        <div class="kpi"><span class="v">${today} / ${GOAL}</span><span class="l">бүгінгі XP мақсаты</span><div class="bar gold"><i style="width:${Math.min(100, today / GOAL * 100)}%"></i></div></div>
        <div class="kpi"><span class="v xp">${ICON.bolt}${p.xp}</span><span class="l">барлық XP</span></div>
        <div class="kpi"><span class="v">Деңгей ${lv.level}</span><span class="l">келесіге ${lv.next - p.xp} XP</span><div class="bar"><i style="width:${lv.pct}%"></i></div></div>
      </div>
      ${cont}
      <div class="section-title"><h2>Оқу жолы</h2><button class="btn ghost" data-go="map">Толық карта</button></div>
      ${phases}`;
  }

  // ---------- module ----------
  function viewModule() {
    const mod = DJ.findModule(route.mod);
    if (!mod || !mod.lessons) return go('dash');
    const p = S.progress(), s = S.moduleState(mod, p);
    $('#app').innerHTML = `
      <div class="crumbs"><button data-go="dash">Оқу</button><span>/</span><span>Phase ${mod.phase.n} · ${esc(mod.phase.kz)}</span></div>
      <div class="mod-hero" style="--ph: var(--ph${mod.phase.n})"><span class="mod-ico">${esc(mod.code.replace(/^M/, ''))}</span><div style="min-width:0">
      <div class="eyebrow">${esc(mod.code)} · ${esc(mod.hours)} сағ${mod.preview ? ' · алдын ала көрініс' : ''}</div>
      <h1 style="margin:6px 0 10px">${esc(mod.title)}</h1></div></div>
      <p class="muted" style="max-width:70ch">${mod.intro || esc(mod.desc)}</p>
      <div style="max-width:420px;margin-top:14px;--ph: var(--ph${mod.phase.n})"><div class="bar"><i style="width:${s.pct}%"></i></div><p class="note">${s.done} / ${s.total} сабақ аяқталды</p></div>
      <div class="lessons">${mod.lessons.map((l, i) => {
        const done = !!p.lessons[l.id];
        const ex = (l.exercises || []).length;
        return `<button class="lesson-row ${done ? 'done' : ''} ${l.gate ? 'gate' : ''}" data-go="lesson" data-mod="${mod.id}" data-li="${i}">
          <span class="num">${done ? ICON.check.replace('<svg', '<svg style="width:16px;height:16px"') : l.gate ? ICON.trophy.replace('<svg', '<svg style="width:16px;height:16px"') : i + 1}</span>
          <span><b>${esc(l.title)}</b><small>${l.minutes || 10} мин · ${ex} тапсырма${l.gate ? ' · модуль емтиханы' : ''}</small></span>
          <span class="badge-s ${done ? 'done' : 'open'}">${done ? 'Өтілді' : 'Ашу'}</span>
        </button>`;
      }).join('')}</div>`;
  }

  // ---------- lesson ----------
  let cm = null;
  let L = null;
  function exId(lesson, i) { return lesson.id + '#' + i; }

  function viewLesson() {
    const mod = DJ.findModule(route.mod);
    if (!mod || !mod.lessons || !mod.lessons[route.li]) return go('dash');
    const lesson = mod.lessons[route.li];
    const p = S.progress();
    const exs = lesson.exercises || [];
    let ei = exs.findIndex((_, i) => !p.done[exId(lesson, i)]);
    if (ei < 0) ei = 0;
    L = { mod, lesson, li: route.li, ei, hints: {}, fails: {} };
    const prev = route.li > 0 ? `<button class="btn ghost" data-go="lesson" data-mod="${mod.id}" data-li="${route.li - 1}">← Алдыңғы</button>` : `<button class="btn ghost" data-go="module" data-mod="${mod.id}">← Модуль</button>`;
    $('#app').innerHTML = `
      <div class="crumbs"><button data-go="dash">Оқу</button><span>/</span><button data-go="module" data-mod="${mod.id}">${esc(mod.code)} ${esc(mod.title)}</button></div>
      <div class="lesson" id="lesson">
        <article class="reading">
          <div class="eyebrow">${lesson.gate ? 'Модуль емтиханы' : `Сабақ ${route.li + 1} / ${mod.lessons.length}`} · ${lesson.minutes || 10} мин</div>
          <h1>${esc(lesson.title)}</h1>
          <div class="prose">${lesson.body || ''}</div>
          <section class="task" id="task"></section>
          <div class="lesson-nav">${prev}<span id="next-slot"></span></div>
        </article>
        <aside class="workbench" id="wb"></aside>
      </div>`;
    renderTask();
  }

  function lessonDone() { const p = S.progress(); return (L.lesson.exercises || []).every((_, i) => p.done[exId(L.lesson, i)]); }
  function nextSlot() {
    const slot = $('#next-slot'); if (!slot) return;
    const p = S.progress(), done = p.lessons[L.lesson.id];
    const hasNext = L.li + 1 < L.mod.lessons.length;
    if (!(L.lesson.exercises || []).length && !done) { slot.innerHTML = `<button class="btn" id="read-done">Оқыдым ${ICON.check.replace('<svg', '<svg style="width:16px;height:16px"')}</button>`; $('#read-done').onclick = () => { finishLesson(); }; return; }
    slot.innerHTML = done ? (hasNext ? `<button class="btn" data-go="lesson" data-mod="${L.mod.id}" data-li="${L.li + 1}">Келесі сабақ →</button>` : `<button class="btn" data-go="module" data-mod="${L.mod.id}">Модульге оралу</button>`) : '';
  }
  function finishLesson() {
    const nb = S.markLesson(L.lesson.id, L.mod.id);
    nb.forEach(b => b && toast(`Жаңа белгі: ${esc(b.name)}`, b.icon));
    toast(L.lesson.gate ? 'Модуль емтиханы тапсырылды!' : 'Сабақ аяқталды', L.lesson.gate ? 'trophy' : 'check');
    topbar(); nextSlot();
  }

  function renderTask() {
    const exs = L.lesson.exercises || [];
    const task = $('#task'), wb = $('#wb'), lessonEl = $('#lesson');
    cm = null;
    if (!exs.length) { task.innerHTML = ''; wb.innerHTML = ''; lessonEl.classList.add('solo'); nextSlot(); return; }
    const p = S.progress();
    const G = L.lesson.gate ? gateState() : null;
    const ex = exs[L.ei], id = exId(L.lesson, L.ei), done = G ? !!G.res[L.ei] : !!p.done[id];
    const isCode = ex.type === 'sql' || ex.type === 'python';
    lessonEl.classList.toggle('solo', !isCode);
    const stepCls = i => G ? (G.res[i] === 'ok' ? 'ok' : G.res[i] === 'fail' ? 'bad' : '') : (p.done[exId(L.lesson, i)] ? 'ok' : '');
    const steps = exs.map((_, i) => `<button class="${i === L.ei ? 'cur' : ''} ${stepCls(i)}" data-step="${i}" aria-label="Тапсырма ${i + 1}">${i + 1}</button>`).join('');
    let inner = '';
    if (ex.type === 'quiz') {
      inner = `<div class="options" role="radiogroup">${ex.options.map((o, i) => `<button class="opt" role="radio" aria-checked="false" data-opt="${i}">${o}</button>`).join('')}</div>
        <div class="actions" style="margin-top:12px"><button class="btn" id="q-check" disabled>Тексеру</button></div>`;
    } else if (ex.type === 'number') {
      inner = `<div style="display:flex;gap:8px;align-items:center;margin-top:10px;max-width:280px"><input type="text" inputmode="decimal" id="num-in" placeholder="Жауап" aria-label="Жауап">${ex.unit ? `<b>${esc(ex.unit)}</b>` : ''}</div>
        <div class="actions" style="margin-top:12px"><button class="btn" id="q-check">Тексеру</button></div>`;
    } else if (ex.type === 'sheet') {
      const tabs = ex.tabs || [ex.sheet];
      inner = `${ex.cell ? `<p class="note" style="margin-bottom:0">Формула <b>${esc(ex.cell)}</b> ұяшығына жазылады деп есептеңіз. Ұяшықты басып, адресін формулаға қоюға болады.</p>` : '<p class="note" style="margin-bottom:0">Ұяшықты басып, адресін формулаға қоюға болады.</p>'}
        <div class="sheet-tabs">${tabs.map((t, i) => `<button class="${i ? '' : 'cur'}" data-tab="${t}">${esc(DJ.sheets[t].name)}</button>`).join('')}</div>
        <div class="sheet-grid" id="grid"></div>
        <div class="fx"><b>fx</b><input type="text" id="fx-in" placeholder="=SUM(H2:H25)" aria-label="Формула" autocomplete="off" spellcheck="false"></div>
        <div class="fx-result" id="fx-out"></div>
        <div class="actions" style="margin-top:12px"><button class="btn ghost" id="fx-run">Есептеу</button><button class="btn" id="q-check">Тексеру</button></div>`;
    } else if (ex.type === 'cmd') {
      inner = `<div class="term"><span>$</span><input type="text" id="cmd-in" placeholder="git ..." aria-label="Команда" autocomplete="off" spellcheck="false" autocapitalize="off"></div>
        <div class="actions" style="margin-top:12px"><button class="btn" id="q-check">Тексеру</button></div>`;
    } else {
      inner = `<p class="note">Кодты ${window.innerWidth > 900 ? 'оң жақтағы' : 'төмендегі'} редакторға жазыңыз. <kbd>Ctrl</kbd>+<kbd>Enter</kbd> іске қосады.</p>`;
    }
    const hintsBtn = (!G && ex.hints && ex.hints.length) ? `<button class="btn ghost" id="hint-btn">Кеңес (${ex.hints.length})</button>` : '';
    task.innerHTML = `
      ${exs.length > 1 ? `<div class="task-steps">${steps}</div>` : ''}
      <h3>Тапсырма ${L.ei + 1}${exs.length > 1 ? ' / ' + exs.length : ''} <span class="xp-tag">+${ex.xp || 10} XP</span></h3>
      <div class="prose">${ex.prompt}</div>
      ${inner}
      <div class="hints" id="hints"></div>
      <div class="actions" style="margin-top:10px">${isCode || ex.type === 'sheet' || ex.type === 'cmd' ? hintsBtn : ''}<span id="sol-slot"></span></div>
      <div id="qv" style="margin-top:10px"></div>`;
    $$('[data-step]', task).forEach(b => b.onclick = () => { L.ei = Number(b.dataset.step); renderTask(); });
    if ($('#hint-btn')) $('#hint-btn').onclick = () => showHint(ex, id);
    if (G) {
      const left = gateTries(ex) - (G.tries[L.ei] || 0);
      $('#qv').innerHTML = done ? `<div class="verdict ${G.res[L.ei] === 'ok' ? 'ok' : 'bad'}">${G.res[L.ei] === 'ok' ? 'Бұл тапсырма орындалды.' : 'Бұл тапсырма есепке алынбады.'}</div>${gateNextHtml()}`
        : `<div class="verdict info">Емтихан: бұл тапсырмада ${left} мүмкіндік бар. Кеңес пен шешім көрсетілмейді. Өту шегі ${Math.round(GATE_PASS * 100)}%.</div>`;
      if (done) setTimeout(afterGateStep, 0);
    } else if (done) $('#qv').innerHTML = `<div class="verdict ok">Бұл тапсырма орындалған. Қайта шешіп көруге болады (XP қайта берілмейді).</div>`;

    if (ex.type === 'quiz') {
      let sel = null;
      $$('.opt', task).forEach(b => b.onclick = () => { sel = Number(b.dataset.opt); $$('.opt', task).forEach(x => { x.classList.toggle('sel', x === b); x.setAttribute('aria-checked', String(x === b)); x.classList.remove('right', 'wrong'); }); $('#q-check').disabled = false; });
      $('#q-check').onclick = () => {
        if (G && gateState().res[L.ei]) return;
        const ok = sel === ex.answer;
        $$('.opt', task).forEach(x => { const i = Number(x.dataset.opt); if (i === sel) x.classList.add(ok ? 'right' : 'wrong'); });
        if (!ok && G) { if (gateState().res[L.ei]) return; gateFail(ex, '#qv'); return; }
        if (!ok) { L.fails[id] = (L.fails[id] || 0) + 1; $('#qv').innerHTML = `<div class="verdict bad">Дұрыс емес. Тағы бір ойланып көріңіз${L.fails[id] >= 2 && ex.explain ? ': ' + ex.explain : '.'}</div>`; return; }
        passed(ex, id, 'quiz', ex.explain);
      };
    } else if (ex.type === 'number') {
      const inp = $('#num-in');
      const check = () => {
        const v = parseFloat(String(inp.value).replace(',', '.').replace(/\s|%/g, ''));
        if (isNaN(v)) { $('#qv').innerHTML = '<div class="verdict info">Сан енгізіңіз.</div>'; return; }
        if (G && gateState().res[L.ei]) return;
        if (Math.abs(v - ex.answer) <= (ex.tol || 0.001) + 1e-9) passed(ex, id, 'number', ex.explain);
        else if (G) { if (!gateState().res[L.ei]) gateFail(ex, '#qv'); }
        else { L.fails[id] = (L.fails[id] || 0) + 1; $('#qv').innerHTML = `<div class="verdict bad">Жауап басқа.${L.fails[id] >= 2 && ex.explain ? ' Шешу жолы: ' + ex.explain : ' Есептеуді қайта тексеріңіз.'}</div>`; }
      };
      $('#q-check').onclick = check;
      inp.onkeydown = e => { if (e.key === 'Enter') check(); };
    } else if (ex.type === 'sheet') {
      const inp = $('#fx-in');
      const drawGrid = t => {
        const rows = DJ.sheets[t].rows, w = Math.max(...rows.map(r => r.length));
        $('#grid').innerHTML = `<table><thead><tr><th></th>${Array.from({ length: w }, (_, i) => `<th>${DJ.sheet.colName(i + 1)}</th>`).join('')}</tr></thead><tbody>${rows.map((r, ri) => `<tr><th>${ri + 1}</th>${Array.from({ length: w }, (_, ci) => { const v = r[ci]; return `<td data-addr="${t === ex.sheet ? '' : DJ.sheets[t].name + '!'}${DJ.sheet.colName(ci + 1)}${ri + 1}" class="${typeof v === 'number' ? 'num' : ''}">${v == null ? '' : esc(String(v))}</td>`; }).join('')}</tr>`).join('')}</tbody></table>`;
        $$('#grid td').forEach(td => td.onclick = () => { const a = td.dataset.addr; if (!inp.value) inp.value = '='; const at = Math.max(1, inp.selectionStart == null ? inp.value.length : inp.selectionStart); inp.value = inp.value.slice(0, at) + a + inp.value.slice(at); inp.focus(); inp.setSelectionRange(at + a.length, at + a.length); });
      };
      drawGrid(ex.sheet);
      $$('[data-tab]', task).forEach(b => b.onclick = () => { $$('[data-tab]', task).forEach(x => x.classList.toggle('cur', x === b)); drawGrid(b.dataset.tab); });
      const saved = (p.code || {})[id]; if (saved) inp.value = saved;
      const calc = () => { const r = DJ.sheet.run(inp.value, DJ.sheets, ex.sheet); $('#fx-out').innerHTML = r.ok ? `Нәтиже: <code>${esc(DJ.sheet.show(r.value))}</code>` : `<span style="color:var(--bad)">${r.error}</span>`; };
      const check = () => {
        S.saveCode(id, inp.value);
        const r = DJ.sheet.check(ex, inp.value);
        if (r.value != null) $('#fx-out').innerHTML = `Нәтиже: <code>${esc(r.value)}</code>`;
        if (G && gateState().res[L.ei]) return;
        if (r.pass) { passed(ex, id, 'sheet', ex.explain); return; }
        if (G) { gateFail(ex, '#qv'); $('#qv').insertAdjacentHTML('afterbegin', `<div class="verdict info">${r.msg}</div>`); return; }
        L.fails[id] = (L.fails[id] || 0) + 1;
        $('#qv').innerHTML = `<div class="verdict bad">${r.msg}</div>`;
        if (L.fails[id] >= 3 && (!ex.hints || (L.hints[id] || 0) >= ex.hints.length)) offerSolution(ex, id);
      };
      $('#fx-run').onclick = calc;
      $('#q-check').onclick = check;
      inp.onkeydown = e => { if (e.key === 'Enter') { (e.ctrlKey || e.metaKey) ? check() : calc(); } };
    } else if (ex.type === 'cmd') {
      const inp = $('#cmd-in');
      const check = () => {
        const v = inp.value.trim().replace(/\s+/g, ' ').replace(/^\$\s*/, '');
        if (!v) { $('#qv').innerHTML = '<div class="verdict info">Команданы жазыңыз.</div>'; return; }
        if (G && gateState().res[L.ei]) return;
        if (ex.accept.some(a => new RegExp('^(?:' + a + ')$').test(v))) { passed(ex, id, 'cmd', ex.explain); return; }
        if (G) { gateFail(ex, '#qv'); return; }
        L.fails[id] = (L.fails[id] || 0) + 1;
        $('#qv').innerHTML = `<div class="verdict bad">Бұл команда тапсырманы орындамайды.${L.fails[id] >= 2 ? ` Дұрыс жауап: <code>${esc(ex.solution)}</code>` : ' Кеңесті қараңыз немесе қайта көріңіз.'}</div>`;
      };
      $('#q-check').onclick = check;
      inp.onkeydown = e => { if (e.key === 'Enter') check(); };
    }
    if (isCode) renderWorkbench(ex, id); else wb.innerHTML = '';
    nextSlot();
  }

  function showHint(ex, id) {
    const n = (L.hints[id] || 0);
    if (n >= ex.hints.length) return;
    L.hints[id] = n + 1;
    $('#hints').insertAdjacentHTML('beforeend', `<div class="hint"><b>Кеңес ${n + 1}.</b> ${ex.hints[n]}</div>`);
    const b = $('#hint-btn');
    if (L.hints[id] >= ex.hints.length) { b.remove(); offerSolution(ex, id); }
    else b.textContent = `Тағы кеңес (${ex.hints.length - L.hints[id]})`;
  }
  function offerSolution(ex, id) {
    if (L.lesson.gate || $('#sol-btn')) return;
    $('#sol-slot').innerHTML = `<button class="btn ghost" id="sol-btn">Шешімді көрсету</button>`;
    $('#sol-btn').onclick = () => { L.hints[id] = (L.hints[id] || 0) + 1; L.solShown = id; if (cm) cm.setValue(ex.solution); else if ($('#fx-in')) $('#fx-in').value = ex.solution; else if ($('#cmd-in')) $('#cmd-in').value = ex.solution; $('#sol-btn').remove(); $('#qv').innerHTML = '<div class="verdict info">Шешім редакторға қойылды. Оны оқып, іске қосып, түсінгеннен кейін тексеріңіз. XP жартысы беріледі.</div>'; };
  }

  function renderWorkbench(ex, id) {
    const wb = $('#wb');
    const isSql = ex.type === 'sql';
    const ds = isSql ? DJ.datasets[ex.dataset || 'shop'] : null;
    const saved = (S.progress().code || {})[id];
    wb.innerHTML = `
      <div class="editor-shell">
        <div class="editor-bar"><span><span class="dots"><i></i><i></i><i></i></span><span class="lang">${isSql ? 'SQL · ' + esc(ds ? ds.title : '') : 'Python 3'}</span></span><span>Ctrl+Enter: іске қосу</span></div>
        <div id="cm"></div>
      </div>
      ${ds && ds.tables ? `<details class="schema"><summary>Кестелер</summary>${Object.entries(ds.tables).map(([t, c]) => `<div><code>${esc(t)}</code>: ${esc(c)}</div>`).join('')}</details>` : ''}
      <div class="actions">
        <button class="btn ghost" id="run">${ICON.play.replace('<svg', '<svg style="width:14px;height:14px"')} Іске қосу</button>
        <button class="btn" id="check">${ICON.check.replace('<svg', '<svg style="width:16px;height:16px"')} Тексеру</button>
        <button class="btn ghost" id="reset" title="Бастапқы кодқа қайтару">Тазалау</button>
      </div>
      <div id="verdict"></div>
      <div class="output" id="out"><p class="muted" style="margin:0">Нәтиже осында шығады.</p></div>`;
    const host = $('#cm');
    const run = () => doRun(ex);
    if (window.CodeMirror) {
      cm = CodeMirror(host, {
        value: saved != null ? saved : (ex.starter || ''), mode: isSql ? 'text/x-sqlite' : 'python', lineNumbers: true, indentUnit: 4,
        matchBrackets: true, autoCloseBrackets: true, lineWrapping: true, viewportMargin: Infinity,
        extraKeys: { 'Ctrl-Enter': run, 'Cmd-Enter': run, Tab: c => c.somethingSelected() ? c.indentSelection('add') : c.replaceSelection('    ') }
      });
      let t; cm.on('change', () => { clearTimeout(t); t = setTimeout(() => cm && S.saveCode(id, cm.getValue()), 500); });
      setTimeout(() => cm && cm.refresh(), 0);
    } else {
      host.innerHTML = `<textarea id="plain" spellcheck="false" style="width:100%;height:240px;background:var(--code-bg);color:var(--code-ink);border:0;padding:12px;font-family:var(--font-mono)"></textarea>`;
      const ta = $('#plain'); ta.value = saved != null ? saved : (ex.starter || '');
      cm = { getValue: () => ta.value, setValue: v => { ta.value = v; }, refresh() {} };
      ta.onkeydown = e => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') run(); };
    }
    $('#run').onclick = run;
    $('#check').onclick = () => doCheck(ex, id);
    $('#reset').onclick = () => { cm.setValue(ex.starter || ''); $('#verdict').innerHTML = ''; };
    if (!isSql && DJ.run.py.status === 'idle') DJ.run.py.start().catch(() => {});
  }

  function tableHtml(r) {
    if (!r) return '<p class="muted" style="margin:0">Сұрау кесте қайтармады.</p>';
    const rows = r.values.slice(0, 200);
    return `<div style="overflow-x:auto"><table><tr>${r.columns.map(c => `<th>${esc(c)}</th>`).join('')}</tr>${rows.map(row => `<tr>${row.map(v => `<td>${v === null ? '<span class="muted">NULL</span>' : esc(v)}</td>`).join('')}</tr>`).join('')}</table></div>
      <p class="note" style="margin:6px 0 0">${r.values.length} жол${r.values.length > 200 ? ' (алғашқы 200 көрсетілді)' : ''}</p>`;
  }
  function busy(on) { ['#run', '#check'].forEach(s => { const b = $(s); if (b) b.disabled = on; }); }
  async function pyGuard() {
    if (DJ.run.py.status !== 'ready') $('#out').innerHTML = '<p class="muted" style="margin:0">Python ортасы жүктелуде. Бірінші рет біраз уақыт алады…</p>';
    try { await DJ.run.py.start(); return true; }
    catch (e) {
      DJ.run.py.worker = null; DJ.run.py.status = 'idle';
      $('#out').innerHTML = `<div class="verdict bad">Python бұл браузерде іске қосылмады (${esc(e.message)}). Бетті жаңартып көріңіз немесе Chrome/Edge/Firefox-тың соңғы нұсқасын қолданыңыз.</div>`;
      return false;
    }
  }

  function pandasNote(code) {
    return DJ.run.py.needsPandas(code) && !DJ.run.py.pandas ? 'pandas кітапханасы жүктелуде. Бұл тек бірінші рет біраз уақыт алады…' : '';
  }

  async function doRun(ex) {
    const code = cm.getValue();
    busy(true); $('#verdict').innerHTML = '';
    try {
      if (ex.type === 'sql') {
        $('#out').innerHTML = '<p class="muted" style="margin:0">Орындалуда…</p>';
        const r = await DJ.run.sql.run(code, ex.dataset);
        if (!r.ok) $('#out').innerHTML = `<pre style="color:var(--bad)">${esc(r.error)}</pre>`;
        else if (!r.results.length) $('#out').innerHTML = `<p style="margin:0">Сұрау орындалды. Өзгерген жолдар: ${r.changes}.</p>`;
        else $('#out').innerHTML = r.results.map(tableHtml).join('<hr style="border:0;border-top:1px solid var(--line)">');
      } else {
        if (!(await pyGuard())) return;
        $('#out').innerHTML = `<p class="muted" style="margin:0">${pandasNote(code) || 'Орындалуда…'}</p>`;
        const r = await DJ.run.py.run(code);
        $('#out').innerHTML = (r.stdout ? `<pre>${esc(r.stdout)}</pre>` : '') + (r.error ? `<pre style="color:var(--bad)">${esc(r.error)}</pre>` : '') || '<p class="muted" style="margin:0">Код орындалды, бірақ ештеңе шығарылмады. <code>print()</code> қолданыңыз.</p>';
      }
    } catch (e) { $('#out').innerHTML = `<div class="verdict bad">${esc(e.message || e)}</div>`; }
    finally { busy(false); }
  }

  async function doCheck(ex, id) {
    const code = cm.getValue();
    S.saveCode(id, code);
    busy(true);
    $('#verdict').innerHTML = '<div class="verdict info">Тексерілуде…</div>';
    try {
      let r;
      if (ex.type === 'sql') {
        r = await DJ.run.sql.check(ex, code);
        if (r.shown) $('#out').innerHTML = tableHtml(r.shown);
      } else {
        if (!(await pyGuard())) { $('#verdict').innerHTML = ''; return; }
        if (pandasNote(code)) $('#verdict').innerHTML = `<div class="verdict info">${pandasNote(code)}</div>`;
        r = await DJ.run.py.check(ex, code);
        let out = '';
        if (r.stdout) out += `<div class="eyebrow">Сіздің шығысыңыз</div><pre>${esc(r.stdout)}</pre>`;
        if (r.trace) out += `<pre style="color:var(--bad)">${esc(r.trace)}</pre>`;
        if (r.expected != null) out += `<div class="eyebrow" style="margin-top:10px">Күтілген шығыс</div><pre>${esc(r.expected)}</pre>`;
        $('#out').innerHTML = out || '<p class="muted" style="margin:0">Шығыс жоқ.</p>';
      }
      const G = L.lesson.gate ? gateState() : null;
      if (G && gateState().res[L.ei]) { $('#verdict').innerHTML = ''; return; }
      if (r.pass) passed(ex, id, ex.type);
      else if (G) { gateFail(ex, '#verdict'); $('#verdict').insertAdjacentHTML('afterbegin', `<div class="verdict info">${r.msg || ''}</div>`); }
      else {
        L.fails[id] = (L.fails[id] || 0) + 1;
        $('#verdict').innerHTML = `<div class="verdict bad">${r.msg || 'Әзірге дұрыс емес.'}</div>`;
        if (L.fails[id] >= 3 && (!ex.hints || (L.hints[id] || 0) >= ex.hints.length)) offerSolution(ex, id);
      }
    } catch (e) { $('#verdict').innerHTML = `<div class="verdict bad">${esc(e.message || e)}</div>`; }
    finally { busy(false); }
  }

  // ---------- module exams: limited tries per task, pass mark 75% ----------
  const GATE_PASS = 0.75;
  const gateTries = ex => (ex.type === 'sql' || ex.type === 'python' || ex.type === 'sheet') ? 3 : 1;
  function gateState() { return S.gate(L.lesson.id); }
  function gateScore(st) {
    const exs = L.lesson.exercises, total = exs.reduce((s, e) => s + (e.xp || 10), 0);
    const got = exs.reduce((s, e, i) => s + (st.res[i] === 'ok' ? (e.xp || 10) : 0), 0);
    return { pct: got / total, resolved: exs.every((_, i) => st.res[i]) };
  }
  // A wrong answer in an exam: count the try; when tries run out the task is closed as failed.
  function gateFail(ex, sel) {
    const st = gateState(), i = L.ei;
    st.tries[i] = (st.tries[i] || 0) + 1;
    const left = gateTries(ex) - st.tries[i];
    if (left <= 0) st.res[i] = 'fail';
    S.setGate(L.lesson.id, st);
    $(sel).innerHTML = left > 0
      ? `<div class="verdict bad">Дұрыс емес. Бұл тапсырмада тағы ${left} мүмкіндік бар.</div>`
      : `<div class="verdict bad">Дұрыс емес. Бұл тапсырма есепке алынбайды.</div>${gateNextHtml()}`;
    afterGateStep();
    return true;
  }
  function gateNextHtml() {
    const st = gateState(), nextI = L.lesson.exercises.findIndex((_, i) => !st.res[i]);
    return nextI >= 0 ? `<div class="actions" style="margin-top:10px"><button class="btn" id="next-ex" data-next="${nextI}">Келесі тапсырма →</button></div>` : '';
  }
  function afterGateStep() {
    const st = gateState();
    $$('[data-step]').forEach(b => { const i = Number(b.dataset.step); b.classList.toggle('ok', st.res[i] === 'ok'); b.classList.toggle('bad', st.res[i] === 'fail'); });
    const nx = $('#next-ex'); if (nx && nx.dataset.next) nx.onclick = () => { L.ei = Number(nx.dataset.next); renderTask(); $('#task').scrollIntoView({ behavior: 'smooth', block: 'start' }); };
    const sc = gateScore(st);
    if (!sc.resolved) return;
    const pct = Math.round(sc.pct * 100), ok = sc.pct >= GATE_PASS - 1e-9;
    st.best = Math.max(st.best || 0, pct);
    S.setGate(L.lesson.id, st);
    const p = S.progress();
    if (ok && !p.lessons[L.lesson.id]) finishLesson();
    const box = `<div class="card gate-result ${ok ? 'pass' : 'fail'}" style="margin-top:14px"><div class="eyebrow">Емтихан нәтижесі</div><h2 style="margin:4px 0">${pct}%</h2>
      <p style="margin:0">${ok ? 'Емтихан тапсырылды. Модуль аяқталды.' : `Өту шегі ${Math.round(GATE_PASS * 100)}%. Қате кеткен сабақтарды қайталап, қайта тапсырыңыз.`}</p>
      ${ok ? '' : '<div class="actions" style="margin-top:10px"><button class="btn" id="gate-retry">Қайта тапсыру</button></div>'}</div>`;
    $('#qv').insertAdjacentHTML('beforeend', box);
    if (!ok) $('#gate-retry').onclick = () => { S.setGate(L.lesson.id, { attempt: (st.attempt || 1) + 1, res: {}, tries: {}, best: st.best }); L.ei = 0; L.hints = {}; L.fails = {}; renderTask(); };
  }

  function passed(ex, id, kind, explain) {
    if (L.lesson.gate) {
      const st = gateState();
      st.res[L.ei] = 'ok'; S.setGate(L.lesson.id, st);
      const r = S.complete(id, ex.xp || 10, false, kind);
      celebrate(r); topbar();
      const target = (kind === 'sql' || kind === 'python') ? $('#verdict') : $('#qv');
      target.innerHTML = `<div class="verdict ok">Дұрыс!${r.xp ? ` +${r.xp} XP` : ''}</div>` + gateNextHtml();
      if (target.id === 'verdict') { $('#qv').innerHTML = ''; }
      afterGateStep();
      return;
    }
    const usedHint = !!(L.hints[id] || (kind !== 'sql' && kind !== 'python' && kind !== 'sheet' && L.fails[id]));
    const r = S.complete(id, ex.xp || 10, usedHint, kind);
    celebrate(r);
    topbar();
    const exs = L.lesson.exercises;
    const p = S.progress();
    const nextI = exs.findIndex((_, i) => !p.done[exId(L.lesson, i)]);
    const msg = `<div class="verdict ok">Дұрыс!${r.xp ? ` +${r.xp} XP` : ''}${explain ? ' ' + explain : ''}</div>`;
    const target = (kind === 'sql' || kind === 'python') ? $('#verdict') : $('#qv');
    target.innerHTML = msg + (nextI >= 0 ? `<div class="actions" style="margin-top:10px"><button class="btn" id="next-ex">Келесі тапсырма →</button></div>` : '');
    $$('[data-step]').forEach(b => b.classList.toggle('ok', !!p.done[exId(L.lesson, Number(b.dataset.step))]));
    if (nextI >= 0) $('#next-ex').onclick = () => { L.ei = nextI; renderTask(); $('#task').scrollIntoView({ behavior: 'smooth', block: 'start' }); };
    if (nextI < 0 && !p.lessons[L.lesson.id]) finishLesson();
  }

  // ---------- map ----------
  function viewMap() {
    const p = S.progress();
    $('#app').innerHTML = `
      <div class="eyebrow">Оқу картасы</div>
      <h1 style="margin:6px 0 8px">Нөлден Junior/Middle деңгейіне дейін</h1>
      <p class="muted" style="max-width:70ch">Бағдарлама тәуелділік графы бойынша құрылған: әр модуль алдыңғысына сүйенеді. Phase 0–3 бәріне ортақ, одан әрі мақсатыңызға қарай жол таңдайсыз.</p>
      <div class="paths">${DJ.paths.map(x => `<div class="path"><h3>${esc(x.title)}</h3><p>${esc(x.desc)}</p><div class="hrs">${esc(x.hours)} · ${esc(x.months)} · Phase ${x.phases.join(', ')}</div></div>`).join('')}</div>
      ${DJ.phases.map(ph => `
        <section class="map-phase" style="--ph: var(--ph${ph.n})">
          <div><div class="ph">PHASE ${ph.n}</div><h3>${esc(ph.kz)}</h3><div class="muted" style="font-size:.88rem">${esc(ph.goal)}</div><div class="note" style="margin-top:6px">Шығу деңгейі: <b>${esc(ph.level)}</b></div></div>
          <div class="map-mods">${ph.modules.map(m0 => {
            const m = DJ.findModule(m0.id), s = S.moduleState(m, p);
            const title = s.state === 'soon' ? `<b>${esc(m.title)}</b>` : `<button data-go="module" data-mod="${m.id}" style="background:none;border:0;padding:0;color:var(--accent);font-weight:700;text-align:left">${esc(m.title)}</button>`;
            return `<div class="map-mod"><span class="c">${esc(m.code)}</span><div>${title}<p>${esc(m.desc)} · ${esc(m.hours)} сағ</p></div>${stateBadge(m, s)}</div>`;
          }).join('')}</div>
        </section>`).join('')}`;
  }

  // ---------- diagnostic ----------
  function viewDiag() {
    const D = DJ.diagnostic, p = S.progress();
    const answers = {};
    const resultHtml = res => {
      const mod = DJ.findModule(res.start);
      return `<div class="card" style="display:grid;gap:12px">
        <div class="eyebrow">Нәтиже · ${res.correct} / ${res.total} дұрыс</div>
        <h2>Ұсыныс: ${esc(mod.code)} ${esc(mod.title)}</h2>
        <p style="margin:0">${esc(res.text)}</p>
        <div style="display:grid;gap:8px">${Object.entries(D.areas).map(([k, name]) => `<div><div style="display:flex;justify-content:space-between;font-size:.9rem"><span>${esc(name)}</span><b>${Math.round(res.scores[k] * 100)}%</b></div><div class="bar"><i style="width:${res.scores[k] * 100}%"></i></div></div>`).join('')}</div>
        <div class="actions"><button class="btn" data-go="module" data-mod="${mod.id}">Осыдан бастау</button><button class="btn ghost" id="redo">Қайта тапсыру</button></div>
      </div>`;
    };
    const draw = () => {
      $('#app').innerHTML = `<div class="diag">
        <div><div class="eyebrow">Диагностика · ${D.questions.length} сұрақ · шамамен 5 мин</div><h1 style="margin:6px 0 8px">Қай жерден бастау керек?</h1>
        <p class="muted" style="margin:0">Білмейтін сұрақты бос қалдырыңыз: бұл баға емес, бастау нүктесін табу ғана.</p></div>
        ${D.questions.map((q, qi) => `<div class="card"><div class="eyebrow">${qi + 1}. ${esc(D.areas[q.area])}</div><div class="prose" style="margin-top:6px">${q.prompt}</div>
          ${q.type === 'quiz' ? `<div class="options">${q.options.map((o, i) => `<button class="opt" data-q="${qi}" data-o="${i}">${o}</button>`).join('')}</div>`
            : `<div style="display:flex;gap:8px;align-items:center;max-width:240px;margin-top:8px"><input type="text" inputmode="decimal" data-qn="${qi}" aria-label="Жауап">${q.unit ? `<b>${esc(q.unit)}</b>` : ''}</div>`}
        </div>`).join('')}
        <button class="btn" id="diag-done">Нәтижені көру</button>
      </div>`;
      $$('.opt[data-q]').forEach(b => b.onclick = () => { const q = b.dataset.q; answers[q] = Number(b.dataset.o); $$(`.opt[data-q="${q}"]`).forEach(x => x.classList.toggle('sel', x === b)); });
      $('#diag-done').onclick = () => {
        $$('[data-qn]').forEach(i => { const v = parseFloat(i.value.replace(',', '.').replace(/\s|%/g, '')); if (!isNaN(v)) answers[i.dataset.qn] = v; });
        const tot = {}, ok = {};
        let correct = 0;
        D.questions.forEach((q, i) => {
          tot[q.area] = (tot[q.area] || 0) + 1;
          const a = answers[i];
          const right = q.type === 'quiz' ? a === q.answer : (a != null && Math.abs(a - q.answer) <= (q.tol || 0.001) + 1e-9);
          if (right) { ok[q.area] = (ok[q.area] || 0) + 1; correct++; }
        });
        const scores = {}; for (const k of Object.keys(D.areas)) scores[k] = (ok[k] || 0) / (tot[k] || 1);
        const place = D.place(scores);
        const res = Object.assign({ scores, correct, total: D.questions.length, date: S.today() }, place);
        const hadBadge = !!S.progress().badges.diagnostic;
        S.setDiag(res);
        if (!hadBadge) toast('Жаңа белгі: Өзін білген', 'compass');
        topbar();
        $('#app').innerHTML = `<div class="diag">${resultHtml(res)}</div>`;
        $('#redo').onclick = draw;
        window.scrollTo(0, 0);
      };
    };
    if (p.diag) { $('#app').innerHTML = `<div class="diag">${resultHtml(p.diag)}</div>`; $('#redo').onclick = draw; }
    else draw();
  }

  // ---------- profile ----------
  function viewProfile() {
    const u = S.profile(), p = S.progress(), lv = S.level(p.xp), career = S.careerLevel(p);
    const theme = lsGet('dj.theme') || 'system';
    const stat = (n, l) => `<div><div style="font-family:var(--font-display);font-size:1.5rem;font-variant-numeric:tabular-nums">${n}</div><div class="note">${l}</div></div>`;
    $('#app').innerHTML = `<div class="diag">
      <div class="card" style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
        <span class="avatar" style="width:56px;height:56px;font-size:1.4rem">${esc(u.name.slice(0, 1).toUpperCase())}</span>
        <div style="min-width:0"><h2>${esc(u.name)}</h2><div class="muted">@${esc(u.username)} · ${esc(career.id)} ${esc(career.name)} · ${u.created} бастап</div></div>
      </div>
      <div class="card" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:16px">
        ${stat(p.xp, 'XP барлығы')}${stat(lv.level, 'деңгей')}${stat(p.best, 'ең ұзақ streak')}${stat(Object.keys(p.lessons).length, 'сабақ өтілді')}${stat(Object.keys(p.done).length, 'тапсырма орындалды')}
      </div>
      <div class="card"><h3 style="margin-bottom:10px">Мансап деңгейі</h3><div style="display:grid;gap:4px">${DJ.careerLevels.map((l, i) => { const ci = DJ.careerLevels.findIndex(x => x.id === career.id); return `<div style="display:flex;gap:12px;font-size:.92rem;${i === ci ? 'color:var(--accent);font-weight:600' : i < ci ? '' : 'color:var(--ink-2)'}"><span style="font-family:var(--font-mono);width:28px">${l.id}</span><span>${esc(l.name)}</span></div>`; }).join('')}</div></div>
      <div class="card"><h3 style="margin-bottom:12px">Белгілер</h3><div style="display:grid;gap:10px">${S.BADGES.map(b => `<div style="display:flex;gap:12px;align-items:center" class="bdg-row"><div class="bdg ${p.badges[b.id] ? 'got' : ''}"><div class="hex" style="width:40px;height:40px">${ICON[b.icon]}</div></div><div><b>${esc(b.name)}</b><div class="note">${esc(b.desc)}${p.badges[b.id] ? ' · ' + p.badges[b.id] : ''}</div></div></div>`).join('')}</div></div>
      <div class="card" style="display:grid;gap:10px"><h3>Тақырып</h3>
        <div class="tabs" role="tablist">${[['system', 'Жүйелік'], ['light', 'Жарық'], ['dark', 'Қараңғы']].map(([k, n]) => `<button role="tab" data-theme-set="${k}" aria-selected="${theme === k}">${n}</button>`).join('')}</div>
      </div>
      <div class="card" style="display:grid;gap:10px"><h3>Аккаунт</h3>
        <p class="note" style="margin:0">Бұл нұсқада аккаунт пен прогресс осы браузерде сақталады. Басқа құрылғыда көрінбейді.</p>
        <div class="actions"><button class="btn ghost" id="logout">Шығу</button><button class="btn ghost" id="reset-p" style="color:var(--bad)">Прогресті нөлдеу</button></div>
        <div id="confirm"></div>
      </div>
    </div>`;
    $$('[data-theme-set]').forEach(b => b.onclick = () => { const t = b.dataset.themeSet; lsSet('dj.theme', t); applyTheme(t); viewProfile(); });
    $('#logout').onclick = () => { S.logout(); go('auth'); };
    $('#reset-p').onclick = () => {
      $('#confirm').innerHTML = `<div class="verdict bad" style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">Барлық XP, сабақтар мен белгілер өшеді. Сенімдісіз бе?<button class="btn" id="yes-reset" style="background:var(--bad)">Иә, нөлдеу</button><button class="btn ghost" id="no-reset">Жоқ</button></div>`;
      $('#no-reset').onclick = () => { $('#confirm').innerHTML = ''; };
      $('#yes-reset').onclick = () => { S.save({ xp: 0, done: {}, lessons: {}, days: [], streak: 0, best: 0, lastDay: null, badges: {}, noHint: 0, diag: null, code: {} }); topbar(); go('dash'); };
    };
  }

  // ---------- boot ----------
  const start = (location.hash || '').slice(1);
  if (['map', 'diag', 'profile'].includes(start)) route = { view: start };
  render();
})();
