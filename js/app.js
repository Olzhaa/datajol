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
    trophy: sv('<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM7 6H3c0 3 2 5 4 5M17 6h4c0 3-2 5-4 5"/>'),
    sound: sv('<path d="M4 9h4l5-4v14l-5-4H4zM16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/>'),
    mute: sv('<path d="M4 9h4l5-4v14l-5-4H4zM17 9l5 6M22 9l-5 6"/>'),
    chest: sv('<path d="M3 10h18v10H3zM3 10l2-5h14l2 5M12 10v4M10 14h4"/>'),
    map: sv('<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14"/>')
  };
  const G = DJ.game;
  // Logo: four falling-block pieces packed into one square (data, code, tools, career).
  const LOGO_CELLS = [[1,0,'l'],[2,0,'l'],[0,1,'s'],[1,1,'l'],[2,1,'l'],[3,1,'g'],[0,2,'s'],[1,2,'s'],[2,2,'g'],[3,2,'g'],[1,3,'p'],[2,3,'g']];
  const LOGO_COL = { l: ['#C8F04A', '#8DB51E'], s: ['#47D1E8', '#1F98AE'], g: ['#FFC83D', '#C9921A'], p: ['#B79CFF', '#7F62D6'] };
  const LOGO = `<svg class="logo-mark" viewBox="0 0 40 40" aria-hidden="true">${LOGO_CELLS.map(([x, y, c]) => `<rect x="${x * 10 + .5}" y="${y * 10 + .5}" width="9" height="9" rx="1.2" fill="${LOGO_COL[c][1]}"/><rect x="${x * 10 + .5}" y="${y * 10 + .5}" width="9" height="7.4" rx="1.2" fill="${LOGO_COL[c][0]}"/><rect x="${x * 10 + 1.8}" y="${y * 10 + 1.6}" width="3.4" height="1.2" rx=".6" fill="#fff" opacity=".55"/>`).join('')}</svg>`;

  // ---------- theme ----------
  function applyTheme(t) { if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t); else document.documentElement.removeAttribute('data-theme'); }
  applyTheme(lsGet('dj.theme'));

  // ---------- toasts ----------
  function toast(html, icon = 'bolt', kind = '') {
    const root = $('#toast-root');
    const el = document.createElement('div');
    el.className = 'toast ' + kind;
    el.innerHTML = ICON[icon] + `<span>${html}</span>`;
    const n = root.children.length;
    el.style.bottom = `calc(${24 + n * 58}px + env(safe-area-inset-bottom, 0px))`;
    root.appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }
  // Rewards for a passed task: floating XP from the button that was pressed, a chime, badge toasts, a level-up dialog.
  function celebrate(r, from) {
    if (r.xp) { G.floatXp(from, r.xp); G.confetti(from, 18); G.play('ok'); bumpHud(); }
    (r.newBadges || []).forEach((b, i) => b && setTimeout(() => { toast(`<b>Жаңа белгі!</b> ${esc(b.name)}`, b.icon, 'badge'); G.play('badge'); }, 500 + i * 400));
    if (r.levelUp) setTimeout(() => {
      G.play('level');
      G.reward({ title: `${r.levelUp}-деңгей!`, text: 'Жаңа деңгейге көтерілдіңіз. Үкі сізбен мақтанады.', stats: [{ v: S.progress().xp, l: 'барлық XP', cls: 'gold' }] });
    }, 700);
  }
  function bumpHud() { const h = $('.hud-xp'); if (h) { h.classList.remove('bump'); void h.offsetWidth; h.classList.add('bump'); } }

  // ---------- routing ----------
  let route = { view: 'dash' }, pendingRoute = null;
  // Routes live in the URL hash, so Back/Forward, reload and shared links land on the same screen.
  function hashFor(r) {
    if (r.view === 'module') return '#module/' + r.mod;
    if (r.view === 'course') return '#course/' + r.course;
    if (r.view === 'lesson') return `#lesson/${r.mod}/${r.li}`;
    if (r.view === 'cert') return r.uid ? `#cert/${r.uid}/${r.mod}` : '#cert/' + r.mod;
    return ['map', 'diag', 'profile', 'board', 'catalog'].includes(r.view) ? '#' + r.view : '';
  }
  function parseHash(h) {
    h = (h || '').replace(/^#/, '');
    let m;
    if ((m = h.match(/^module\/([\w-]+)$/))) return { view: 'module', mod: m[1] };
    if ((m = h.match(/^course\/([\w-]+)$/))) return { view: 'course', course: m[1] };
    if ((m = h.match(/^lesson\/([\w-]+)\/(\d+)$/))) return { view: 'lesson', mod: m[1], li: Number(m[2]) };
    if ((m = h.match(/^cert\/([0-9a-f-]{36})\/(L\d)$/))) return { view: 'cert', uid: m[1], mod: m[2] };
    if ((m = h.match(/^cert\/(L\d)$/))) return { view: 'cert', mod: m[1] };
    if (['map', 'diag', 'profile', 'board', 'catalog'].includes(h)) return { view: h };
    return null;
  }
  function go(view, params = {}) {
    flushSave();
    if (cm) cm = null;
    route = Object.assign({ view }, params);
    const h = hashFor(route);
    if (h !== location.hash && !(h === '' && !location.hash)) history.pushState(null, '', h || location.pathname + location.search);
    render(true);
    window.scrollTo(0, 0);
  }
  window.addEventListener('popstate', () => {
    flushSave(); if (cm) cm = null;
    route = parseHash(location.hash) || { view: 'dash' };
    render(true);
  });
  // Editor autosave: the pending write is bound to its own exercise and flushed before any navigation.
  let pendingSave = null;
  function flushSave() { if (pendingSave) { clearTimeout(pendingSave.t); pendingSave.fn(); pendingSave = null; } }
  // ---------- feedback ----------
  const FB_KINDS = [['bug', 'Қате таптым'], ['unclear', 'Түсініксіз'], ['idea', 'Ұсыныс'], ['other', 'Басқа']];
  function openFeedback() {
    const where = route.view === 'lesson' && L ? `${location.hash} · ${L.lesson.title} · тапсырма ${L.ei + 1}` : (location.hash || '#dash');
    const dlg = document.createElement('dialog');
    dlg.className = 'fb-dialog';
    dlg.setAttribute('aria-labelledby', 'fb-h');
    dlg.innerHTML = `<form method="dialog" id="fb-form" novalidate>
      <h2 id="fb-h">Пікір қалдыру</h2>
      <div class="fb-kinds" role="group" aria-label="Пікір түрі">${FB_KINDS.map(([k, n], i) => `<button type="button" class="chip" data-kind="${k}" aria-pressed="${i === 0}">${n}</button>`).join('')}</div>
      <label class="field">Не болды? Не жақсартуға болады?<textarea name="msg" rows="5" maxlength="2000" required></textarea></label>
      ${DJ.cloud.user ? '' : '<label class="field">Email (міндетті емес, жауап керек болса)<input type="email" name="contact" maxlength="200" autocomplete="email"></label>'}
      <p class="note" style="margin:0">Бет: ${esc(where)}</p>
      <div class="err" id="fb-err" role="alert"></div>
      <div class="actions"><button class="btn" type="submit" id="fb-send">Жіберу</button><button class="btn ghost" type="button" id="fb-cancel">Болдырмау</button></div>
    </form>`;
    document.body.appendChild(dlg);
    let kind = 'bug';
    $$('[data-kind]', dlg).forEach(b => b.onclick = () => { kind = b.dataset.kind; $$('[data-kind]', dlg).forEach(x => x.setAttribute('aria-pressed', String(x === b))); });
    dlg.addEventListener('close', () => dlg.remove());
    $('#fb-cancel', dlg).onclick = () => dlg.close();
    $('#fb-form', dlg).onsubmit = async (e) => {
      e.preventDefault();
      const f = e.target, msg = f.msg.value.trim(), err = $('#fb-err', dlg);
      if (msg.length < 3) { err.textContent = 'Бірнеше сөз жазыңыз.'; return; }
      // At most 5 messages an hour from one browser.
      let sent = []; try { sent = JSON.parse(lsGet('dj.fb') || '[]').filter(t => Date.now() - t < 3600000); } catch (x) {}
      if (sent.length >= 5) { err.textContent = 'Бір сағатта 5 пікірден көп жіберуге болмайды. Кейінірек қайталаңыз.'; return; }
      const btn = $('#fb-send', dlg); btn.disabled = true; err.textContent = '';
      let r; try { r = await DJ.cloud.feedback({ kind, message: msg, page: where.slice(0, 300), contact: f.contact ? f.contact.value.trim().slice(0, 200) || null : null }); } catch (x) { r = { error: x }; }
      btn.disabled = false;
      if (r && r.error) { err.textContent = DJ.cloud.explain(r.error.message); return; }
      sent.push(Date.now()); lsSet('dj.fb', JSON.stringify(sent));
      dlg.close(); toast('Рақмет! Пікіріңіз жіберілді.', 'star');
    };
    dlg.showModal();
    $('textarea', dlg).focus();
  }
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-feedback]')) { e.preventDefault(); openFeedback(); return; }
    const b = e.target.closest('[data-go]');
    if (!b) return;
    e.preventDefault();
    go(b.dataset.go, { mod: b.dataset.mod, course: b.dataset.course, li: b.dataset.li != null ? Number(b.dataset.li) : undefined });
  });

  const TITLES = { catalog: 'Курстар', auth: 'Кіру', map: 'Оқу картасы', diag: 'Диагностика', profile: 'Профиль', board: 'Рейтинг', cert: 'Сертификат' };
  function render(moveFocus) {
    if (!S.current() && route.view !== 'cert' && route.view !== 'auth') { if (route.view !== 'dash') pendingRoute = route; route = { view: 'auth' }; }
    topbar();
    const views = { catalog: viewCatalog, course: viewCourse, auth: viewAuth, dash: viewDash, module: viewModule, lesson: viewLesson, map: viewMap, diag: viewDiag, profile: viewProfile, board: viewBoard, cert: viewCert };
    (views[route.view] || viewDash)();
    const m = route.mod && DJ.findModule(route.mod);
    const t = route.view === 'lesson' && m && m.lessons && m.lessons[route.li] ? m.lessons[route.li].title
      : route.view === 'module' && m ? `${m.code} ${m.title}` : route.view === 'course' && DJ.findCourse(route.course) ? DJ.findCourse(route.course).title : TITLES[route.view];
    document.title = t ? `${t} · Tolqyn` : 'Tolqyn';
    // After a screen change, move keyboard and screen-reader focus to the new heading.
    if (DJ.cloud && DJ.cloud.enabled && ['dash', 'map', 'module', 'board', 'profile', 'diag', 'catalog', 'course'].includes(route.view)) $('#app').insertAdjacentHTML('beforeend', '<p class="fb-foot"><button type="button" class="linkbtn" data-feedback>Пікір қалдыру немесе қате туралы хабарлау</button></p>');
    if (moveFocus) { const h = $('#app h1'); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); } }
  }
  function afterAuth() { const r = pendingRoute; pendingRoute = null; if (r) go(r.view, r); else go('dash'); }

  // ---------- topbar ----------
  function topbar() {
    const el = $('#topbar');
    const u = S.profile();
    const logo = `<button class="logo" data-go="dash">${LOGO}<span class="wordmark">TOLQYN</span></button>`;
    const lp = DJ.i18n ? DJ.i18n.picker() : '';
    if (!u) { el.innerHTML = `${logo}<div class="stats">${lp}</div>`; return; }
    const p = S.progress(), lv = S.level(p.xp), st = S.streakNow(p);
    const cur = v => (route.view === v || (v === 'dash' && ['module', 'lesson'].includes(route.view))) ? 'aria-current="page"' : '';
    el.innerHTML = `${logo}
      <nav class="nav" aria-label="Негізгі">
        <button data-go="dash" ${cur('dash')}>Оқу</button>
        <button data-go="catalog" ${route.view === 'catalog' || route.view === 'course' ? 'aria-current="page"' : ''}>Курстар</button>
        <button data-go="map" ${cur('map')}>Карта</button>
        <button data-go="diag" ${cur('diag')}>Диагностика</button>
        <button data-go="board" ${cur('board')}>Рейтинг</button>
      </nav>
      <div class="stats">
        <span class="pill streak ${st ? 'lit' : ''}" title="Күндер қатарынан" aria-label="Күндер қатарынан: ${st}">${ICON.flame}${st}</span>
        <span class="hud-xp" title="${p.xp} XP, келесі деңгейге ${lv.next - p.xp} XP" aria-label="Деңгей ${lv.level}, ${p.xp} XP">
          <span class="hud-lv">${lv.level}</span><span class="hud-bar"><i style="width:${lv.pct}%"></i></span><span class="hud-n">${p.xp}<small>XP</small></span>
        </span>
        ${lp}
        <button class="icon-btn" id="snd" aria-pressed="${G.soundOn()}" aria-label="Дыбыс">${G.soundOn() ? ICON.sound : ICON.mute}</button>
        <button class="avatar" data-go="profile" aria-label="Профиль">${esc((u.name || u.username).slice(0, 1).toUpperCase())}</button>
      </div>`;
    $('#snd').onclick = () => { G.setSound(!G.soundOn()); topbar(); };
  }

  // ---------- auth ----------
  function viewAuth() {
    let mode = 'register';
    const app = $('#app');
    app.innerHTML = `
    <section class="auth">
      <div class="auth-hero">
        <div class="auth-owl">${G.owl('owl-lg owl-bob', 'Үкі')}<p class="bubble">Сәлем! Мен Үкімін. Бірге шыңға шығайық!</p></div>
        <h1>Бағдарламалау мен деректі ойнап үйрен</h1>
        <p class="muted">Python, SQL, Java, C++, алгоритмдер және Data Science қазақша. Әр тапсырма браузерде бірден тексеріледі, XP береді, деңгейіңізді көтереді, ал күнделікті оқу streak отын жағады.</p>
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
      ${DJ.cloud && DJ.cloud.enabled ? `<form class="card auth-card" id="cloud-form" novalidate>
        <h3 style="margin:0">Кіру немесе тіркелу</h3>
        <button type="button" class="btn" id="g-login">Google арқылы кіру</button>
        <div class="note" style="text-align:center">немесе email мен пароль</div>
        <label class="field">Email<input type="email" name="email" autocomplete="email" placeholder="aigerim@mail.kz"></label>
        <label class="field">Пароль<input type="password" name="cpw" autocomplete="current-password" minlength="8"></label>
        <div class="err" id="cloud-err" role="alert"></div>
        <button class="btn" type="submit" id="c-login">Кіру</button>
        <button class="btn ghost" type="button" id="c-signup">Тіркелу</button>
        <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap"><button type="button" class="linkbtn" id="c-forgot">Парольді ұмыттым</button><button type="button" class="linkbtn" id="c-link">Парольсіз, сілтемемен кіру</button></div>
        <p class="note">Тіркелгенде email-ді бір рет растайсыз, кейін email мен парольмен бірден кіресіз. Прогресс бұлтта сақталады.</p>
        <button type="button" class="linkbtn" id="local-mode">Аккаунтсыз жалғастыру (прогресс осы браузерде)</button>
      </form>` : ''}
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
    if (DJ.cloud && DJ.cloud.enabled) {
      const C = DJ.cloud, cerr = $('#cloud-err');
      $('#auth-form').hidden = true;
      if (C.returnError()) { cerr.textContent = C.explain(C.returnError()); history.replaceState(null, '', location.pathname); }
      C.providers().then(pv => { if (pv && !pv.google && $('#g-login')) { $('#g-login').hidden = true; $('#g-login').nextElementSibling.hidden = true; } });
      $('#local-mode').onclick = () => { $('#cloud-form').hidden = true; $('#auth-form').hidden = false; };
      $('#g-login').onclick = async () => { try { const r = await C.google(); if (r && r.error) cerr.textContent = C.explain(r.error.message); } catch (er) { cerr.textContent = C.explain(er.message); } };
      const form = $('#cloud-form');
      const sent = (email, what) => { form.innerHTML = `<h3 style="margin:0">Поштаңызды тексеріңіз</h3><p class="note">${esc(email)} адресіне ${what}</p>`; };
      const getEmail = () => { const v = form.email.value.trim(); if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) { cerr.textContent = 'Email дұрыс емес.'; return null; } return v; };
      const getPw = () => { const v = form.cpw.value; if (v.length < 8) { cerr.textContent = 'Пароль кемінде 8 таңба болсын.'; return null; } return v; };
      // Runs one auth call with the buttons locked; returns the result, or null after showing the error.
      const busy = async fn => {
        const bs = $$('button', form); bs.forEach(b => b.disabled = true); cerr.textContent = '';
        let r; try { r = await fn(); } catch (er) { r = { error: er }; }
        bs.forEach(b => b.disabled = false);
        if (r && r.error) { cerr.textContent = C.explain(r.error.message); return null; }
        return r || {};
      };
      form.onsubmit = async (e) => {
        e.preventDefault();
        const email = getEmail(); if (!email) return; const pw = getPw(); if (!pw) return;
        if (await busy(() => C.password(email, pw))) afterAuth();
      };
      $('#c-signup').onclick = async () => {
        const email = getEmail(); if (!email) return; const pw = getPw(); if (!pw) return;
        const r = await busy(() => C.signUp(email, pw)); if (!r) return;
        if (r.data && r.data.session) afterAuth();
        else sent(email, 'тіркелуді растау хаты жіберілді. Сілтемені бір рет басыңыз, кейін email мен парольмен кіресіз.');
      };
      $('#c-forgot').onclick = async () => {
        const email = getEmail(); if (!email) return;
        if (await busy(() => C.resetPassword(email))) sent(email, 'парольді қалпына келтіру сілтемесі жіберілді. Сілтемені басқан соң профильде жаңа пароль қоясыз.');
      };
      $('#c-link').onclick = async () => {
        const email = getEmail(); if (!email) return;
        if (await busy(() => C.email(email))) sent(email, 'кіру сілтемесі жіберілді.');
      };
    }
    $('#auth-form').onsubmit = async (e) => {
      e.preventDefault();
      const f = e.target;
      const err = mode === 'login' ? await S.login(f.username.value, f.pw.value) : await S.register(f.username.value, f.name.value, f.pw.value);
      if (err) { $('#auth-err').textContent = err; return; }
      afterAuth();
    };
  }

  // ---------- helpers ----------
  function allModules() { const out = []; for (const ph of DJ.phases.filter(x => !x.extra)) for (const m of ph.modules) out.push(DJ.findModule(m.id)); return out; }
  function nextLesson(p) {
    // The module the learner opened last comes first, so a stand-alone course is not lost behind the data path.
    const last = (p.prefs || {}).last && DJ.findModule(p.prefs.last);
    if (last && last.lessons) { const li = last.lessons.findIndex(l => !p.lessons[l.id]); if (li >= 0) return { mod: last, li }; }
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

  // ---------- course catalog ----------
  const LEVELS = { easy: 'Оңай', medium: 'Орташа', hard: 'Қиын' };
  function courseOf(modId) { for (const g of DJ.catalog || []) for (const c of g.courses) if (c.mods.includes(modId)) return c; return null; }
  function courseState(c, p) {
    const mods = c.mods.map(id => DJ.findModule(id)).filter(Boolean);
    const lessons = mods.flatMap(m => m.lessons || []);
    const done = lessons.filter(l => p.lessons[l.id]).length;
    return { mods, total: lessons.length, done, soon: !lessons.length, pct: lessons.length ? Math.round(done / lessons.length * 100) : 0 };
  }
  function catalogGrid(p) {
    return `<div class="catalog">${DJ.catalog.map(g => `<section class="cat-group"><h3 class="cat-h">${esc(g.title)}</h3>${g.courses.map(c => {
      const st = courseState(c, p);
      const attrs = st.soon ? 'disabled aria-disabled="true"' : c.mods.length > 1 ? `data-go="course" data-course="${c.id}"` : `data-go="module" data-mod="${c.mods[0]}"`;
      const tag = st.soon ? '<span class="badge-s">Жақында</span>' : st.done === st.total ? '<span class="badge-s done">Аяқталды</span>' : st.done ? `<span class="badge-s open">${st.pct}%</span>` : `<span class="badge-s">${esc(c.level)}</span>`;
      return `<button class="cat-course ${st.soon ? 'soon' : ''}" ${attrs}><span>${esc(c.title)}</span>${tag}</button>`;
    }).join('')}</section>`).join('')}</div>`;
  }
  function viewCatalog() {
    $('#app').innerHTML = `<div class="eyebrow">Курстар</div><h1 style="margin:6px 0 8px">Не үйренгіңіз келеді?</h1>
      <p class="muted" style="max-width:70ch">Кез келген курсты бөлек өтуге болады. Data мансабына толық жол керек болса, «Карта» бетіндегі бағдарламаны қараңыз.</p>
      ${catalogGrid(S.progress())}`;
  }
  function viewCourse() {
    const c = DJ.findCourse(route.course);
    if (!c) return go('catalog');
    const p = S.progress(), st = courseState(c, p);
    $('#app').innerHTML = `<div class="crumbs"><button data-go="catalog">Курстар</button><span>/</span><span>${esc(c.group.title)}</span></div>
      <h1 style="margin:6px 0 8px">${esc(c.title)}</h1>
      <p class="muted">${esc(c.level)} · ${st.mods.length} модуль · ${st.done} / ${st.total} сабақ</p>
      <div class="modules">${st.mods.map(m => {
        const s = S.moduleState(m, p), soon = s.state === 'soon';
        return `<button class="module ${soon ? 'soon' : ''}" ${soon ? 'disabled aria-disabled="true"' : `data-go="module" data-mod="${m.id}"`}>
          <span class="code">${esc(m.code)}</span><span style="min-width:0"><h3>${esc(m.title)}</h3><p>${esc(m.desc)}</p></span>
          <span class="prog">${soon ? '<span class="badge-s">Жақында</span>' : s.state === 'done' ? '<span class="badge-s done">Аяқталды</span>' : `<span class="badge-s open">${s.done} / ${s.total} сабақ</span><div class="bar"><i style="width:${s.pct}%"></i></div>`}</span><span class="chev"></span>
        </button>`;
      }).join('')}</div>`;
  }

  // ---------- dashboard ----------
  const COURSE_ICON = { python: 'Py', 'python-2': 'Py2', sql: 'SQL', pandas: 'pd', stats: 'σ', viz: 'BI', ml: 'ML', dl: 'DL', genai: 'AI', dsa: '{ }', java: 'J', cpp: 'C++', swe: 'SE', git: 'Git', excel: 'fx', deploy: 'Dkr', mlops: 'Ops', dataeng: 'ETL', basics: '01', business: '$', capstones: 'PRJ', jobs: 'CV' };
  function courseGlyph(c) { return COURSE_ICON[c.id] || (DJ.i18n ? DJ.i18n.tr(c.title) : c.title).replace(/[^A-Za-zА-Яа-яЁёӘәҒғҚқҢңӨөҰұҮүІі+#]/g, '').slice(0, 2); }
  function questCard(p) {
    const t = lastDays(1)[0].key;
    const tasks = Object.values(p.done).filter(d => d && d.d === t).length;
    const lessons = Object.values(p.lessons).filter(d => d === t).length;
    const xp = S.xpToday(p);
    const qs = [
      { n: 'Бүгін 50 XP жина', v: xp, max: GOAL, icon: 'bolt' },
      { n: '3 тапсырма орында', v: tasks, max: 3, icon: 'check' },
      { n: '1 сабақты аяқта', v: lessons, max: 1, icon: 'flag' }
    ];
    const all = qs.every(q => q.v >= q.max);
    return `<section class="panel quests" aria-labelledby="q-h">
      <div class="panel-h"><h2 id="q-h">Күндік квесттер</h2><span class="chest ${all ? 'open' : ''}" title="${all ? 'Бүгінгі квесттер орындалды' : 'Үшеуін орындасаңыз, сандық ашылады'}">${ICON.chest}</span></div>
      ${qs.map(q => { const ok = q.v >= q.max; return `<div class="quest ${ok ? 'ok' : ''}"><span class="q-ico">${ok ? ICON.check : ICON[q.icon]}</span><div><b>${q.n}</b><div class="seg" style="--n:${q.max > 5 ? 10 : q.max}">${Array.from({ length: q.max > 5 ? 10 : q.max }, (_, i) => `<i class="${(q.max > 5 ? q.v / q.max * 10 : q.v) > i ? 'on' : ''}"></i>`).join('')}</div></div><span class="q-n">${Math.min(q.v, q.max)}/${q.max}</span></div>`; }).join('')}
      <p class="note" style="margin:8px 0 0">${all ? 'Тамаша! Ертең жаңа квесттер шығады.' : 'Квесттер күн сайын түн ортасында жаңарады.'}</p>
    </section>`;
  }
  function streakCard(p, st) {
    const days = lastDays(7), set = new Set(p.days || []);
    return `<section class="panel streak-card" aria-labelledby="s-h">
      <div class="panel-h"><h2 id="s-h">Streak</h2><span class="big-flame ${st ? 'lit' : ''}">${ICON.flame}<b>${st}</b></span></div>
      <div class="week">${days.map((d, i) => `<div class="day ${set.has(d.key) ? 'on' : ''} ${i === 6 ? 'today' : ''}"><span>${set.has(d.key) ? ICON.flame : ''}</span><small>${d.label}</small></div>`).join('')}</div>
      <p class="note" style="margin:8px 0 0">${st ? `Қатарынан ${st} күн. Ең ұзағы: ${p.best || st}. ${set.has(days[6].key) ? 'Бүгінгі от жанды, ертең де келіңіз!' : 'Бүгін бір тапсырма орындасаңыз, от сөнбейді.'}` : 'Бүгін бір тапсырма орындап, отты жағыңыз.'}</p>
    </section>`;
  }
  function viewDash() {
    const u = S.profile(), p = S.progress(), lv = S.level(p.xp), st = S.streakNow(p);
    const nx = nextLesson(p), career = S.careerLevel(p);
    const started = Object.keys(p.lessons).length > 0;
    const say = !nx ? 'Ашық сабақтардың бәрін өттіңіз! Жаңа курстар жақында қосылады.'
      : started ? `Қайта келгеніңіз қандай жақсы! Келесі қадам: <b>${esc(nx.mod.lessons[nx.li].title)}</b>.`
      : `Мен Үкімін, саяхатта сізге жол көрсетемін. Бірінші қадам: <b>${esc(nx.mod.lessons[nx.li].title)}</b>.`;
    const hero = `<section class="quest-hero">
      <div class="qh-owl">${G.owl('owl-lg owl-bob', 'Үкі')}</div>
      <div class="qh-body">
        <h1>Сәлем, ${esc(u.name)}!</h1>
        <p class="bubble">${say}</p>
        ${nx ? `<div class="qh-meta"><span class="tag">${esc(nx.mod.code)} ${esc(nx.mod.title)}</span><span class="tag">Сабақ ${nx.li + 1}/${nx.mod.lessons.length}</span><span class="tag">${nx.mod.lessons[nx.li].minutes || 10} мин</span></div>
        <div class="actions" style="margin-top:16px"><button class="btn big" data-go="lesson" data-mod="${nx.mod.id}" data-li="${nx.li}">${started ? 'Жалғастыру' : 'Саяхатты бастау'} ${ICON.play}</button>${p.diag && p.diag.v === 2 ? '' : '<button class="btn ghost" data-go="diag">Деңгейді анықтау</button>'}</div>` : ''}
      </div>
      <div class="lvl-card" aria-label="Деңгей ${lv.level}">
        <div class="shield"><span>LV</span><b>${lv.level}</b></div>
        <div class="lvl-bar"><i style="width:${lv.pct}%"></i></div>
        <div class="note">${p.xp} XP · келесі деңгейге ${lv.next - p.xp} XP</div>
        <div class="note">${esc(career.id)} · ${esc(career.name)}</div>
      </div>
    </section>`;
    const worlds = DJ.catalog.map((g, gi) => `<section class="world-group" style="--blk:var(--b${gi % 4})"><h3>${esc(g.title)}</h3><div class="worlds">${g.courses.map(c => {
      const cs = courseState(c, p);
      const attrs = cs.soon ? 'disabled aria-disabled="true"' : c.mods.length > 1 ? `data-go="course" data-course="${c.id}"` : `data-go="module" data-mod="${c.mods[0]}"`;
      const state = cs.soon ? 'soon' : cs.done === cs.total ? 'done' : cs.done ? 'going' : '';
      return `<button class="world ${state}" ${attrs}><span class="glyph">${esc(courseGlyph(c))}</span><span class="w-t">${esc(c.title)}</span>
        <span class="w-m">${cs.soon ? 'Жақында' : state === 'done' ? 'Аяқталды' : `${esc(c.level)} · ${cs.done}/${cs.total} сабақ`}</span>
        ${cs.soon ? '' : `<span class="seg-bar"><i style="width:${cs.pct}%"></i></span>`}${state === 'done' ? `<span class="w-star">${ICON.star}</span>` : ''}</button>`;
    }).join('')}</div></section>`).join('');
    $('#app').innerHTML = `${hero}
      <div class="dash-grid">${questCard(p)}${streakCard(p, st)}</div>
      <div class="section-title"><h2>Әлемдер</h2><button class="btn ghost" data-go="map">${ICON.map} Мансап картасы</button></div>
      ${worlds}`;
  }

  // ---------- module ----------
  function viewModule() {
    const mod = DJ.findModule(route.mod);
    if (!mod || !mod.lessons) return go('dash');
    const p = S.progress(), s = S.moduleState(mod, p);
    $('#app').innerHTML = `
      <div class="crumbs">${(() => { const c = courseOf(mod.id); return c ? `<button data-go="catalog">Курстар</button><span>/</span>${c.mods.length > 1 ? `<button data-go="course" data-course="${c.id}">${esc(c.title)}</button>` : `<span>${esc(c.title)}</span>`}` : `<button data-go="dash">Оқу</button><span>/</span><span>Phase ${mod.phase.n} · ${esc(mod.phase.kz)}</span>`; })()}</div>
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
    if (S.setPref && (S.progress().prefs || {}).last !== mod.id) S.setPref('last', mod.id);
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
          ${DJ.cloud && DJ.cloud.enabled ? '<p class="fb-foot"><button type="button" class="linkbtn" data-feedback>Осы сабақ туралы пікір немесе қате туралы хабарлау</button></p>' : ''}
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
    topbar(); nextSlot();
    const p = S.progress(), mod = L.mod, li = L.li, exs = L.lesson.exercises || [];
    const got = i => p.done[exId(L.lesson, i)];
    const xp = exs.reduce((t, _, i) => t + ((got(i) || {}).xp || 0), 0);
    const clean = exs.filter((_, i) => got(i) && !got(i).hint).length;
    const modDone = mod.lessons.every(l => p.lessons[l.id]);
    const hasNext = li + 1 < mod.lessons.length;
    setTimeout(() => {
      G.play('lesson');
      G.reward({
        title: modDone ? 'Модуль бағындырылды!' : L.lesson.gate ? 'Емтихан тапсырылды!' : 'Сабақ аяқталды!',
        text: modDone ? `${esc(mod.code)} ${esc(mod.title)} толық өтілді. Картада жаңа шың ашылды.` : esc(L.lesson.title),
        stats: [{ v: '+' + xp, l: 'XP', cls: 'gold' }, { v: S.streakNow(p), l: 'күн streak', cls: 'flame' }].concat(exs.length ? [{ v: `${clean}/${exs.length}`, l: 'кеңессіз' }] : []),
        actions: hasNext ? [{ label: 'Келесі сабақ', primary: true, onClick: () => go('lesson', { mod: mod.id, li: li + 1 }) }, { label: 'Модульге', onClick: () => go('module', { mod: mod.id }) }]
          : [{ label: 'Картаға', primary: true, onClick: () => go('map') }, { label: 'Модульге', onClick: () => go('module', { mod: mod.id }) }]
      });
      nb.forEach((b, i) => b && setTimeout(() => { toast(`<b>Жаңа белгі!</b> ${esc(b.name)}`, b.icon, 'badge'); G.play('badge'); }, 600 + i * 400));
    }, 450);
  }

  // Exercise types solved in the code editor; java/cpp are compiled in a worker (DJ.run.java / DJ.run.cpp).
  const isCodeType = t => t === 'sql' || t === 'python' || t === 'java' || t === 'cpp';
  const NATIVE = { java: { lang: 'Java', mime: 'text/x-java' }, cpp: { lang: 'C++', mime: 'text/x-c++src' } };

  function renderTask() {
    const exs = L.lesson.exercises || [];
    const task = $('#task'), wb = $('#wb'), lessonEl = $('#lesson');
    cm = null;
    if (!exs.length) { task.innerHTML = ''; wb.innerHTML = ''; lessonEl.classList.add('solo'); nextSlot(); return; }
    const p = S.progress();
    const G = L.lesson.gate ? gateState() : null;
    const ex = exs[L.ei], id = exId(L.lesson, L.ei), done = G ? !!G.res[L.ei] : !!p.done[id];
    const isCode = isCodeType(ex.type);
    lessonEl.classList.toggle('solo', !isCode);
    const stepCls = i => G ? (G.res[i] === 'ok' ? 'ok' : G.res[i] === 'fail' ? 'bad' : '') : (p.done[exId(L.lesson, i)] ? 'ok' : '');
    const stepState = i => ({ ok: ', орындалды', bad: ', есепке алынбады' })[stepCls(i)] || '';
    const steps = exs.map((_, i) => `<button class="${i === L.ei ? 'cur' : ''} ${stepCls(i)}" data-step="${i}" aria-label="Тапсырма ${i + 1}${stepState(i)}"${i === L.ei ? ' aria-current="step"' : ''}>${i + 1}</button>`).join('');
    let inner = '';
    if (ex.type === 'quiz') {
      inner = `<div class="options" role="group" aria-label="Жауап нұсқалары">${ex.options.map((o, i) => `<button class="opt" aria-pressed="false" data-opt="${i}">${o}</button>`).join('')}</div>
        <div class="actions" style="margin-top:12px"><button class="btn" id="q-check" disabled>Тексеру</button></div>`;
    } else if (ex.type === 'number') {
      inner = `<div style="display:flex;gap:8px;align-items:center;margin-top:10px;max-width:280px"><input type="text" inputmode="decimal" id="num-in" placeholder="Жауап" aria-label="Жауап">${ex.unit ? `<b>${esc(ex.unit)}</b>` : ''}</div>
        <div class="actions" style="margin-top:12px"><button class="btn" id="q-check">Тексеру</button></div>`;
    } else if (ex.type === 'sheet') {
      const tabs = ex.tabs || [ex.sheet];
      inner = `${ex.cell ? `<p class="note" style="margin-bottom:0">Формула <b>${esc(ex.cell)}</b> ұяшығына жазылады деп есептеңіз. Ұяшықты басып, адресін формулаға қоюға болады.</p>` : '<p class="note" style="margin-bottom:0">Ұяшықты басып, адресін формулаға қоюға болады.</p>'}
        <div class="sheet-tabs">${tabs.map((t, i) => `<button class="${i ? '' : 'cur'}" data-tab="${t}">${esc(DJ.sheets[t].name)}</button>`).join('')}</div>
        <div class="sheet-grid" id="grid" tabindex="0" aria-label="Кесте деректері"></div>
        <div class="fx"><b>fx</b><input type="text" id="fx-in" placeholder="=SUM(H2:H25)" aria-label="Формула" autocomplete="off" spellcheck="false"></div>
        <div class="fx-result" id="fx-out"></div>
        <div class="actions" style="margin-top:12px"><button class="btn ghost" id="fx-run">Есептеу</button><button class="btn" id="q-check">Тексеру</button></div>`;
    } else if (ex.type === 'rubric') {
      const saved = (p.rubric || {})[id] || {};
      inner = `<textarea id="memo" rows="9" placeholder="Қорытынды, дәлелдер, ұсыныс, шектеулер…" aria-label="Memo мәтіні">${esc(saved.text || '')}</textarea>
        <div class="note" id="memo-count"></div>
        <div class="rubric">${ex.criteria.map((c, ci) => `<fieldset><legend>${esc(c.name)}</legend>${c.levels.map((lv, li) => `<label><input type="radio" name="rc${ci}" value="${li + 1}" ${saved.scores && saved.scores[ci] === li + 1 ? 'checked' : ''}><b>${li + 1}</b> ${esc(lv)}</label>`).join('')}</fieldset>`).join('')}</div>
        <div class="actions" style="margin-top:12px"><button class="btn" id="q-check">Бағалауды тапсыру</button></div>`;
    } else if (ex.type === 'cmd') {
      inner = `<div class="term"><span>$</span><input type="text" id="cmd-in" placeholder="git ..." aria-label="Команда" autocomplete="off" spellcheck="false" autocapitalize="off"></div>
        <div class="actions" style="margin-top:12px"><button class="btn" id="q-check">Тексеру</button></div>`;
    } else {
      inner = `<p class="note">Кодты ${window.innerWidth > 900 ? 'оң жақтағы' : 'төмендегі'} редакторға жазыңыз. <kbd>Ctrl</kbd>+<kbd>Enter</kbd> іске қосады, <kbd>Esc</kbd> редактордан шығарады.</p>`;
    }
    const hintsBtn = (!G && ex.hints && ex.hints.length) ? `<button class="btn ghost" id="hint-btn">Кеңес (${ex.hints.length})</button>` : '';
    task.innerHTML = `
      ${exs.length > 1 ? `<div class="task-steps">${steps}</div>` : ''}
      <h3 id="task-h">Тапсырма ${L.ei + 1}${exs.length > 1 ? ' / ' + exs.length : ''} <span class="xp-tag">+${ex.xp || 10} XP</span>${ex.level && LEVELS[ex.level] ? ` <span class="lvl lvl-${ex.level}">${LEVELS[ex.level]}</span>` : ''}</h3>
      <div class="prose">${ex.prompt}</div>
      ${inner}
      <div class="hints" id="hints"></div>
      <div class="actions" style="margin-top:10px">${isCode || ex.type === 'sheet' || ex.type === 'cmd' ? hintsBtn : ''}<span id="sol-slot"></span></div>
      <div id="qv" style="margin-top:10px"></div>`;
    $$('[data-step]', task).forEach(b => b.onclick = () => { L.ei = Number(b.dataset.step); renderTask(); const h = $('#task h3'); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); } });
    if ($('#hint-btn')) $('#hint-btn').onclick = () => showHint(ex, id);
    if (G) {
      const left = gateTries(ex) - (G.tries[L.ei] || 0);
      $('#qv').innerHTML = done ? `<div class="verdict ${G.res[L.ei] === 'ok' ? 'ok' : 'bad'}">${G.res[L.ei] === 'ok' ? 'Бұл тапсырма орындалды.' : 'Бұл тапсырма есепке алынбады.'}</div>${gateNextHtml()}`
        : `<div class="verdict info">Емтихан: бұл тапсырмада ${left} мүмкіндік бар. Кеңес пен шешім көрсетілмейді. Өту шегі ${Math.round(GATE_PASS * 100)}%.</div>`;
      if (done) setTimeout(afterGateStep, 0);
    } else if (done) $('#qv').innerHTML = `<div class="verdict ok">Бұл тапсырма орындалған. Қайта шешіп көруге болады (XP қайта берілмейді).</div>`;

    if (ex.type === 'quiz') {
      let sel = null;
      $$('.opt', task).forEach(b => b.onclick = () => { sel = Number(b.dataset.opt); $$('.opt', task).forEach(x => { x.classList.toggle('sel', x === b); x.setAttribute('aria-pressed', String(x === b)); x.classList.remove('right', 'wrong'); }); $('#q-check').disabled = false; });
      $('#q-check').onclick = () => {
        if (G && gateState().res[L.ei]) return;
        const ok = sel === ex.answer;
        $$('.opt', task).forEach(x => { const i = Number(x.dataset.opt); if (i === sel) x.classList.add(ok ? 'right' : 'wrong'); });
        if (!ok && G) { if (gateState().res[L.ei]) return; gateFail(ex, '#qv'); return; }
        if (!ok) { L.fails[id] = (L.fails[id] || 0) + 1; markHinted(id); $('#qv').innerHTML = `<div class="verdict bad">Дұрыс емес. Тағы бір ойланып көріңіз${L.fails[id] >= 2 && ex.explain ? ': ' + ex.explain : '.'}</div>`; return; }
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
        else { L.fails[id] = (L.fails[id] || 0) + 1; markHinted(id); $('#qv').innerHTML = `<div class="verdict bad">Жауап басқа.${L.fails[id] >= 2 && ex.explain ? ' Шешу жолы: ' + ex.explain : ' Есептеуді қайта тексеріңіз.'}</div>`; }
      };
      $('#q-check').onclick = check;
      inp.onkeydown = e => { if (e.key === 'Enter') check(); };
    } else if (ex.type === 'sheet') {
      const inp = $('#fx-in');
      const drawGrid = t => {
        const rows = DJ.sheets[t].rows, w = Math.max(...rows.map(r => r.length));
        $('#grid').innerHTML = `<table><thead><tr><th><span class="sr-only">Жол</span></th>${Array.from({ length: w }, (_, i) => `<th>${DJ.sheet.colName(i + 1)}</th>`).join('')}</tr></thead><tbody>${rows.map((r, ri) => `<tr><th>${ri + 1}</th>${Array.from({ length: w }, (_, ci) => { const v = r[ci]; return `<td data-addr="${t === ex.sheet ? '' : DJ.sheets[t].name + '!'}${DJ.sheet.colName(ci + 1)}${ri + 1}" class="${typeof v === 'number' ? 'num' : ''}">${v == null ? '' : esc(String(v))}</td>`; }).join('')}</tr>`).join('')}</tbody></table>`;
        $$('#grid td').forEach(td => td.onclick = () => { const a = td.dataset.addr; if (!inp.value) inp.value = '='; const at = Math.max(1, inp.selectionStart == null ? inp.value.length : inp.selectionStart); inp.value = inp.value.slice(0, at) + a + inp.value.slice(at); inp.focus(); inp.setSelectionRange(at + a.length, at + a.length); });
      };
      drawGrid(ex.sheet);
      $$('[data-tab]', task).forEach(b => b.onclick = () => { $$('[data-tab]', task).forEach(x => x.classList.toggle('cur', x === b)); drawGrid(b.dataset.tab); });
      const saved = (p.code || {})[id]; if (saved) inp.value = saved;
      const calc = () => { const r = DJ.sheet.run(inp.value, DJ.sheets, ex.sheet); $('#fx-out').innerHTML = r.ok ? `Нәтиже: <code>${esc(DJ.sheet.show(r.value))}</code>` : `<span style="color:var(--bad)">${esc(r.error)}</span>`; };
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
    } else if (ex.type === 'rubric') {
      const ta = $('#memo'), words = () => ta.value.trim().split(/\s+/).filter(Boolean).length;
      const count = () => { $('#memo-count').textContent = `${words()} сөз (кемінде ${ex.minWords || 0})`; };
      ta.oninput = count; count();
      $('#q-check').onclick = () => {
        const scores = ex.criteria.map((_, ci) => { const r = $(`input[name="rc${ci}"]:checked`); return r ? Number(r.value) : 0; });
        S.saveRubric(id, { text: ta.value, scores });
        if (words() < (ex.minWords || 0)) { $('#qv').innerHTML = `<div class="verdict bad">Memo тым қысқа: ${words()} сөз, кемінде ${ex.minWords} керек.</div>`; return; }
        if (scores.some(v => !v)) { $('#qv').innerHTML = '<div class="verdict info">Әр критерийге баға қойыңыз.</div>'; return; }
        const weak = ex.criteria.filter((_, ci) => scores[ci] < 3);
        if (weak.length) { $('#qv').innerHTML = `<div class="verdict bad">Әзірге өтпейді. Memo-ны жақсартыңыз:<ul>${weak.map(c => `<li><b>${esc(c.name)}</b>: ${esc(c.levels[3])}</li>`).join('')}</ul></div>`; return; }
        passed(ex, id, 'rubric', `Орташа баға ${(scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)} / 4. ${ex.done || 'Мәтінді портфолиоңызда сақтап қойыңыз.'}`);
      };
    } else if (ex.type === 'cmd') {
      const inp = $('#cmd-in');
      const check = () => {
        const v = inp.value.trim().replace(/\s+/g, ' ').replace(/^\$\s*/, '');
        if (!v) { $('#qv').innerHTML = '<div class="verdict info">Команданы жазыңыз.</div>'; return; }
        if (G && gateState().res[L.ei]) return;
        if (ex.accept.some(a => new RegExp('^(?:' + a + ')$').test(v))) { passed(ex, id, 'cmd', ex.explain); return; }
        if (G) { gateFail(ex, '#qv'); return; }
        L.fails[id] = (L.fails[id] || 0) + 1; markHinted(id);
        $('#qv').innerHTML = `<div class="verdict bad">Бұл команда тапсырманы орындамайды.${L.fails[id] >= 2 ? ` Дұрыс жауап: <code>${esc(ex.solution)}</code>` : ' Кеңесті қараңыз немесе қайта көріңіз.'}</div>`;
      };
      $('#q-check').onclick = check;
      inp.onkeydown = e => { if (e.key === 'Enter') check(); };
    }
    if (isCode) renderWorkbench(ex, id); else wb.innerHTML = '';
    nextSlot();
  }

  function markHinted(id) { if (S.markHinted) S.markHinted(id); }
  const wasHinted = id => !!(S.hinted && S.hinted(id));
  function showHint(ex, id) {
    const n = (L.hints[id] || 0);
    if (n >= ex.hints.length) return;
    L.hints[id] = n + 1; markHinted(id);
    $('#hints').insertAdjacentHTML('beforeend', `<div class="hint"><b>Кеңес ${n + 1}.</b> ${ex.hints[n]}</div>`);
    const b = $('#hint-btn');
    if (L.hints[id] >= ex.hints.length) { b.remove(); offerSolution(ex, id); }
    else b.textContent = `Тағы кеңес (${ex.hints.length - L.hints[id]})`;
  }
  function offerSolution(ex, id) {
    if (L.lesson.gate || $('#sol-btn')) return;
    $('#sol-slot').innerHTML = `<button class="btn ghost" id="sol-btn">Шешімді көрсету</button>`;
    $('#sol-btn').onclick = () => { L.hints[id] = (L.hints[id] || 0) + 1; markHinted(id); L.solShown = id; if (cm) cm.setValue(ex.solution); else if ($('#fx-in')) $('#fx-in').value = ex.solution; else if ($('#cmd-in')) $('#cmd-in').value = ex.solution; $('#sol-btn').remove(); $('#qv').innerHTML = '<div class="verdict info">Шешім редакторға қойылды. Оны оқып, іске қосып, түсінгеннен кейін тексеріңіз. XP жартысы беріледі.</div>'; };
  }

  function renderWorkbench(ex, id) {
    const wb = $('#wb');
    const isSql = ex.type === 'sql', nat = NATIVE[ex.type];
    const ds = isSql ? DJ.datasets[ex.dataset || 'shop'] : null;
    const saved = (S.progress().code || {})[id];
    wb.innerHTML = `
      <div class="editor-shell">
        <div class="editor-bar"><span><span class="dots"><i></i><i></i><i></i></span><span class="lang">${isSql ? 'SQL · ' + esc(ds ? ds.title : '') : nat ? nat.lang : 'Python 3'}</span></span><span>Ctrl+Enter: іске қосу</span></div>
        <div id="cm"></div>
      </div>
      ${nat ? `<label style="display:block;margin-top:10px"><span class="eyebrow">Кіріс (stdin)</span><textarea id="stdin" rows="3" spellcheck="false" autocapitalize="off" style="display:block;width:100%;margin-top:4px;background:var(--code-bg);color:var(--code-ink);border:0;border-radius:8px;padding:8px 12px;font-family:var(--font-mono);resize:vertical">${esc(((ex.check || {}).cases || [])[0] ? ex.check.cases[0].stdin || '' : '')}</textarea></label>` : ''}
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
        value: saved != null ? saved : (ex.starter || ''), mode: isSql ? 'text/x-sqlite' : nat ? nat.mime : 'python', lineNumbers: true, indentUnit: 4,
        matchBrackets: true, autoCloseBrackets: true, lineWrapping: true, viewportMargin: Infinity,
        extraKeys: { 'Ctrl-Enter': run, 'Cmd-Enter': run, Tab: c => c.somethingSelected() ? c.indentSelection('add') : c.replaceSelection('    '), Esc: () => { const b = $('#run'); if (b) b.focus(); } }
      });
      cm.getInputField().setAttribute('aria-label', (isSql ? 'SQL' : nat ? nat.lang : 'Python') + ' код редакторы');
      const ed = cm;
      cm.on('change', () => {
        flushSave();
        const fn = () => S.saveCode(id, ed.getValue());
        pendingSave = { fn, t: setTimeout(() => { pendingSave = null; fn(); }, 500) };
      });
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
    // Start loading the runtime as soon as the task is opened, so it is likely ready by the first run.
    const R = nat ? DJ.run[ex.type] : isSql ? null : DJ.run.py;
    if (R && R.status === 'idle') R.start().catch(() => {});
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

  // Java/C++: the compiler is downloaded on first use; tell the learner while it loads.
  async function nativeGuard(type) {
    const R = DJ.run[type];
    if (R.status !== 'ready') $('#out').innerHTML = `<p class="muted" style="margin:0">${R.label} компиляторы жүктелуде, ${R.size}…</p>`;
    try { await R.start(); return true; }
    catch (e) {
      R.stop();
      $('#out').innerHTML = `<div class="verdict bad">${esc(e.message)}</div>`;
      return false;
    }
  }

  function pandasNote(code) {
    const R = DJ.run.py;
    if (R.needsSklearn(code) && !R.sklearn) return 'scikit-learn жүктелуде (шамамен 40 МБ). Бұл тек бірінші рет бір-екі минут алуы мүмкін…';
    return R.needsPandas(code) && !R.pandas ? 'pandas кітапханасы жүктелуде. Бұл тек бірінші рет біраз уақыт алады…' : '';
  }

  async function doRun(ex) {
    const ed = cm, code = cm.getValue(), stdin = $('#stdin') ? $('#stdin').value : '';
    const stale = () => cm !== ed;   // the learner moved to another task while this was running
    busy(true); $('#verdict').innerHTML = '';
    try {
      if (ex.type === 'sql') {
        $('#out').innerHTML = '<p class="muted" style="margin:0">Орындалуда…</p>';
        const r = await DJ.run.sql.run(code, ex.dataset);
        if (stale()) return;
        if (!r.ok) $('#out').innerHTML = `<pre style="color:var(--bad)">${esc(r.error)}</pre>`;
        else if (!r.results.length) $('#out').innerHTML = `<p style="margin:0">Сұрау орындалды. Өзгерген жолдар: ${r.changes}.</p>`;
        else $('#out').innerHTML = r.results.map(tableHtml).join('<hr style="border:0;border-top:1px solid var(--line)">');
      } else if (NATIVE[ex.type]) {
        if (!(await nativeGuard(ex.type)) || stale()) return;
        $('#out').innerHTML = '<p class="muted" style="margin:0">Компиляция және орындау…</p>';
        const r = await DJ.run[ex.type].run(code, stdin);
        if (stale()) return;
        const err = r.error || r.stderr;
        $('#out').innerHTML = (r.stdout ? `<pre>${esc(r.stdout)}</pre>` : '') + (err ? `<pre style="color:var(--bad)">${esc(err)}</pre>` : '') || '<p class="muted" style="margin:0">Бағдарлама орындалды, бірақ ештеңе шығармады.</p>';
      } else {
        if (!(await pyGuard()) || stale()) return;
        $('#out').innerHTML = `<p class="muted" style="margin:0">${pandasNote(code) || 'Орындалуда…'}</p>`;
        const r = await DJ.run.py.run(code);
        if (stale()) return;
        $('#out').innerHTML = (r.stdout ? `<pre>${esc(r.stdout)}</pre>` : '') + (r.error ? `<pre style="color:var(--bad)">${esc(r.error)}</pre>` : '') || '<p class="muted" style="margin:0">Код орындалды, бірақ ештеңе шығарылмады. <code>print()</code> қолданыңыз.</p>';
      }
    } catch (e) { if (!stale()) $('#out').innerHTML = `<div class="verdict bad">${esc(e.message || e)}</div>`; }
    finally { if (!stale()) busy(false); }
  }

  async function doCheck(ex, id) {
    const ed = cm, code = cm.getValue();
    const stale = () => cm !== ed;
    S.saveCode(id, code);
    busy(true);
    $('#verdict').innerHTML = '<div class="verdict info">Тексерілуде…</div>';
    try {
      let r;
      if (ex.type === 'sql') {
        r = await DJ.run.sql.check(ex, code);
        if (stale()) return;
        if (r.shown) $('#out').innerHTML = tableHtml(r.shown);
      } else {
        const nat = !!NATIVE[ex.type];
        if (!(await (nat ? nativeGuard(ex.type) : pyGuard()))) { if (!stale()) $('#verdict').innerHTML = ''; return; }
        if (stale()) return;
        if (!nat && pandasNote(code)) $('#verdict').innerHTML = `<div class="verdict info">${pandasNote(code)}</div>`;
        r = await (nat ? DJ.run[ex.type] : DJ.run.py).check(ex, code);
        if (stale()) return;
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
    } catch (e) { if (!stale()) $('#verdict').innerHTML = `<div class="verdict bad">${esc(e.message || e)}</div>`; }
    finally { if (!stale()) busy(false); }
  }

  // ---------- module exams: limited tries per task, pass mark 75% ----------
  const GATE_PASS = 0.75;
  const gateTries = ex => (isCodeType(ex.type) || ex.type === 'sheet') ? 3 : 1;
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
      celebrate(r, $('#check') || $('#q-check')); topbar();
      const target = isCodeType(kind) ? $('#verdict') : $('#qv');
      target.innerHTML = `<div class="verdict ok">Дұрыс!${r.xp ? ` +${r.xp} XP` : ''}</div>` + gateNextHtml();
      if (target.id === 'verdict') { $('#qv').innerHTML = ''; }
      afterGateStep();
      return;
    }
    const usedHint = !!(L.hints[id] || wasHinted(id) || (!isCodeType(kind) && kind !== 'sheet' && kind !== 'rubric' && L.fails[id]));
    const r = S.complete(id, ex.xp || 10, usedHint, kind);
    celebrate(r, $('#check') || $('#q-check'));
    topbar();
    const exs = L.lesson.exercises;
    const p = S.progress();
    const nextI = exs.findIndex((_, i) => !p.done[exId(L.lesson, i)]);
    const PRAISE = ['Дұрыс!', 'Керемет!', 'Тамаша!', 'Жарайсыз!', 'Дәл таптыңыз!'];
    const msg = `<div class="verdict ok"><b>${PRAISE[Math.floor(Math.random() * PRAISE.length)]}</b>${r.xp ? ` <span class="xp-tag">+${r.xp} XP</span>` : ''}${explain ? ' ' + explain : ''}</div>`;
    const target = isCodeType(kind) ? $('#verdict') : $('#qv');
    target.innerHTML = msg + (nextI >= 0 ? `<div class="actions" style="margin-top:10px"><button class="btn" id="next-ex">Келесі тапсырма →</button></div>` : '');
    $$('[data-step]').forEach(b => b.classList.toggle('ok', !!p.done[exId(L.lesson, Number(b.dataset.step))]));
    if (nextI >= 0) $('#next-ex').onclick = () => { L.ei = nextI; renderTask(); $('#task').scrollIntoView({ behavior: 'smooth', block: 'start' }); };
    if (nextI < 0 && !p.lessons[L.lesson.id]) finishLesson();
  }

  // ---------- map ----------
  // A winding trail of module nodes, one region per phase. The connecting path is drawn after layout.
  const ZIG = [0, 1, 2, 1, 0, -1, -2, -1];
  function viewMap() {
    const p = S.progress();
    const nx = nextLesson(p), curMod = nx && nx.mod.id;
    let k = 0;
    $('#app').innerHTML = `
      <h1 style="margin:0 0 8px">Мансап картасы</h1>
      <p class="muted" style="max-width:70ch">Нөлден Junior/Middle деңгейіне дейінгі жол. Әр аймақ бір кезең, әр нүкте бір модуль. Алғашқы төрт аймақ бәріне ортақ, одан әрі мақсатыңызға қарай жол таңдайсыз.</p>
      <div class="paths">${DJ.paths.map(x => `<div class="path"><h3>${esc(x.title)}</h3><p>${esc(x.desc)}</p><div class="hrs">${esc(x.hours)} · ${esc(x.months)}</div></div>`).join('')}</div>
      <div class="trail" id="trail"><svg class="trail-line" aria-hidden="true"><path id="trail-path"/></svg>
      ${DJ.phases.filter(ph => !ph.extra).map(ph => `
        <section class="region" style="--ph: var(--ph${ph.n})">
          <div class="region-h"><span class="r-n">${ph.n}</span><div><h2>${esc(ph.kz)}</h2><p>${esc(ph.goal)} · шығу деңгейі ${esc(ph.level)}</p></div></div>
          <ol class="nodes">${ph.modules.map(m0 => {
            const m = DJ.findModule(m0.id), s = S.moduleState(m, p), z = ZIG[k++ % ZIG.length];
            const state = s.state === 'soon' ? 'soon' : s.state === 'done' ? 'done' : m.id === curMod ? 'cur' : s.done ? 'going' : 'open';
            const inner = state === 'done' ? ICON.star : state === 'soon' ? ICON.lock : esc(m.code.replace(/^M/, ''));
            const label = `<span class="n-t">${esc(m.title)}</span><span class="n-s">${state === 'soon' ? 'Жақында' : state === 'done' ? 'Аяқталды' : `${s.done}/${s.total} сабақ`}</span>`;
            return `<li class="node ${state}" style="--z:${z}">${state === 'soon' ? `<span class="n-dot">${inner}</span>` : `<button class="n-dot" data-go="module" data-mod="${m.id}" aria-label="${esc(m.code)} ${esc(m.title)}">${inner}</button>`}
              ${state === 'cur' ? G.owl('owl-sm owl-bob') : ''}<div class="n-label">${label}</div></li>`;
          }).join('')}</ol>
        </section>`).join('')}</div>`;
    drawTrail();
  }
  function drawTrail() {
    const t = $('#trail'), path = $('#trail-path'); if (!t || !path) return;
    const box = t.getBoundingClientRect();
    const pts = $$('.n-dot', t).map(d => { const r = d.getBoundingClientRect(); return [r.left - box.left + r.width / 2, r.top - box.top + r.height / 2]; });
    if (pts.length < 2) return;
    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], my = (y0 + y1) / 2; d += ` C${x0},${my} ${x1},${my} ${x1},${y1}`; }
    path.setAttribute('d', d);
    const svg = path.parentNode; svg.setAttribute('width', box.width); svg.setAttribute('height', box.height);
  }
  window.addEventListener('resize', () => { if (route.view === 'map') drawTrail(); });

  // ---------- diagnostic ----------
  // Adaptive placement: one block per module (easy, medium, hard item). Two misses on the first two items end the
  // block early; a block is skipped when a module it builds on came out weak. The start is the first module
  // on the chosen path that is not already known.
  const DIAG_STATUS = {
    known: ['Білесіз', 'done'], partial: ['Қайталау керек', 'part'], learn: ['Үйрену керек', 'todo'], skip: ['Тексерілмеді', 'skip']
  };
  let diagRuns = 0;
  function viewDiag() {
    diagRuns++;
    const D = DJ.diagnostic, p = S.progress();
    const pathOrder = track => {
      const path = DJ.paths.find(x => x.id === track) || DJ.paths[0];
      return DJ.phases.filter(ph => path.phases.includes(ph.n)).flatMap(ph => ph.modules.map(m => m.id));
    };
    const resultHtml = res => {
      const mod = DJ.findModule(res.start);
      const rows = D.blocks.filter(b => res.mods[b.mod]).map(b => {
        const m = DJ.findModule(b.mod), st = res.mods[b.mod], [label, cls] = DIAG_STATUS[st];
        const gi = m.lessons ? m.lessons.findIndex(l => l.gate) : -1;
        const act = st === 'known' && gi >= 0 && !p.lessons[m.lessons[gi].id] ? `<button class="btn ghost sm" data-go="lesson" data-mod="${m.id}" data-li="${gi}">Емтиханмен жабу</button>` : '';
        return `<div class="diag-row"><div><b>${esc(m.code)}</b> ${esc(m.title)}<div class="muted" style="font-size:.85rem">${esc(b.area)}</div></div><span class="chip ${cls}">${label}</span>${act}</div>`;
      }).join('');
      return `<div class="card" style="display:grid;gap:12px">
        <div class="eyebrow">Нәтиже · ${res.correct} / ${res.total} дұрыс · ${esc((DJ.paths.find(x => x.id === res.track) || {}).title || '')}</div>
        <h2 style="margin:0">Ұсыныс: ${esc(mod.code)} ${esc(mod.title)}</h2>
        <p style="margin:0">${esc(res.text)}</p>
        <div class="actions"><button class="btn" data-go="module" data-mod="${mod.id}">Осыдан бастау</button><button class="btn ghost" id="redo">Қайта тапсыру</button></div>
      </div>
      <div class="card" style="display:grid;gap:4px"><h3 style="margin:0 0 6px">Модульдер бойынша</h3>${rows}
        <p class="note" style="margin:8px 0 0">«Білесіз» деген модульдің емтиханын бірден тапсырып, оны жабуға болады. Емтихан 75%-дан өтеді.</p></div>`;
    };
    const showResult = res => {
      $('#app').innerHTML = `<div class="diag">${resultHtml(res)}</div>`;
      $('#redo').onclick = intro;
      window.scrollTo(0, 0);
    };

    function intro() {
      $('#app').innerHTML = `<div class="diag">
        <div><div class="eyebrow">Диагностика · бейімделетін тест · 10–25 мин</div><h1 style="margin:6px 0 8px">Қай жерден бастау керек?</h1>
        <p class="muted" style="margin:0">Әр модуль бойынша оңайдан қиынға қарай 2–3 сұрақ беріледі. Бір тақырыпты білмесеңіз, тест оған сүйенетін тақырыптарды өткізіп жібереді, сондықтан ұзаққа созылмайды. Кейбір сұрақта SQL не Python кодын жазасыз.</p></div>
        <div class="card" style="display:grid;gap:10px"><b>Мақсатыңыз қандай?</b>
          ${DJ.paths.filter(x => x.id !== 'mle').map(x => `<button class="opt" data-track="${x.id}"><b>${esc(x.title)}</b><div class="muted" style="font-size:.9rem">${esc(x.desc)}</div></button>`).join('')}
        </div>
        <p class="note" style="margin:0">Білмесеңіз, «Білмеймін» басыңыз. Болжап жауап беру нәтижені бұзады: сіз білмейтін модульден өтіп кетесіз.</p>
      </div>`;
      $$('[data-track]').forEach(b => b.onclick = () => run(b.dataset.track));
    }

    function run(track) {
      const myRun = ++diagRuns, gone = () => myRun !== diagRuns || route.view !== 'diag';
      const order = pathOrder(track);
      const blocks = D.blocks.filter(b => order.includes(b.mod));
      const mods = {}; let bi = -1, block = null, step = 0, marks = [], correct = 0, total = 0;
      const nextBlock = () => {
        for (bi++; bi < blocks.length; bi++) {
          const b = blocks[bi];
          if ((b.needs || []).some(n => mods[n] === 'learn' || mods[n] === 'skip')) { mods[b.mod] = 'skip'; continue; }
          block = b; step = 0; marks = []; return ask();
        }
        finish();
      };
      const record = ok => {
        marks.push(ok); total++; if (ok) correct++;
        const got = marks.filter(Boolean).length;
        if (marks.length === 2 && got === 0) { mods[block.mod] = 'learn'; return nextBlock(); }
        if (marks.length < 3) { step++; return ask(); }
        mods[block.mod] = got === 3 ? 'known' : got === 2 ? 'partial' : 'learn';
        nextBlock();
      };
      const ask = () => {
        const q = block.items[step], code = q.type === 'sql' || q.type === 'python';
        const pct = Math.round(bi / blocks.length * 100);
        $('#app').innerHTML = `<div class="diag">
          <div><div style="display:flex;justify-content:space-between" class="eyebrow"><span>${esc(block.area)} · ${['оңай', 'орташа', 'қиын'][step]} сұрақ</span><span>${bi + 1} / ${blocks.length}</span></div><div class="bar" style="margin-top:6px"><i style="width:${pct}%"></i></div></div>
          <div class="card">
            <div class="prose">${q.prompt}</div>
            ${q.type === 'quiz' ? `<div class="options">${q.options.map((o, i) => `<button class="opt" data-o="${i}" aria-pressed="false">${o}</button>`).join('')}</div>` : ''}
            ${q.type === 'number' ? `<div style="display:flex;gap:8px;align-items:center;max-width:240px;margin-top:12px"><input type="text" inputmode="decimal" id="dq-num" aria-label="Жауап">${q.unit ? `<b>${esc(q.unit)}</b>` : ''}</div>` : ''}
            ${code ? `${q.type === 'sql' ? `<p class="note">Кестелер: ${Object.entries(DJ.datasets[q.dataset].tables).map(([t, c]) => `<code>${esc(t)}</code> (${esc(c)})`).join(', ')}</p>` : ''}<textarea id="dq-code" class="code-area" spellcheck="false" rows="8" aria-label="${q.type === 'sql' ? 'SQL' : 'Python'} коды (Esc: шығу)">${esc(q.starter || '')}</textarea><div class="err" id="dq-err" role="alert"></div>` : ''}
          </div>
          <div class="actions"><button class="btn" id="dq-go" ${q.type === 'quiz' ? 'disabled' : ''}>${code ? 'Тексеріп, жалғастыру' : 'Жауап беру'}</button><button class="btn ghost" id="dq-skip">Білмеймін</button></div>
        </div>`;
        let pick = null;
        $$('.opt[data-o]').forEach(b => b.onclick = () => { pick = Number(b.dataset.o); $$('.opt[data-o]').forEach(x => { x.classList.toggle('sel', x === b); x.setAttribute('aria-pressed', String(x === b)); }); $('#dq-go').disabled = false; });
        const ta = $('#dq-code');
        if (ta) ta.onkeydown = e => { if (e.key === 'Escape') { $('#dq-go').focus(); return; } if (e.key === 'Tab' && !e.shiftKey) { e.preventDefault(); ta.setRangeText('    ', ta.selectionStart, ta.selectionEnd, 'end'); } };
        $('#dq-skip').onclick = () => record(false);
        $('#dq-go').onclick = async () => {
          if (q.type === 'quiz') return record(pick === q.answer);
          if (q.type === 'number') {
            const v = parseFloat($('#dq-num').value.replace(',', '.').replace(/\s|%|₸/g, ''));
            if (isNaN(v)) { $('#dq-num').focus(); return; }
            return record(Math.abs(v - q.answer) <= (q.tol || 0.001) + 1e-9);
          }
          const src = $('#dq-code').value;
          if (!src.trim() || src.trim() === (q.starter || '').trim()) { $('#dq-err').textContent = 'Код жазыңыз немесе «Білмеймін» басыңыз.'; return; }
          const btn = $('#dq-go'); btn.disabled = true; btn.textContent = 'Тексерілуде…';
          let r;
          try {
            if (q.type === 'sql') r = await DJ.run.sql.check({ dataset: q.dataset, solution: q.solution }, src);
            else { await DJ.run.py.start(); r = await DJ.run.py.check({ solution: q.solution, check: { tests: q.tests } }, src); }
          } catch (e) { r = { pass: false }; }
          if (gone()) return;
          record(!!(r && r.pass));
        };
        window.scrollTo(0, 0);
      };
      const finish = () => {
        const start = order.find(id => { const m = DJ.findModule(id); return m && m.lessons && mods[id] !== 'known'; }) || order[order.length - 1];
        const n = k => Object.values(mods).filter(v => v === k).length;
        const sm = DJ.findModule(start);
        const text = n('known') === 0
          ? 'Негізден бастаған дұрыс. Алғашқы модульдер тез өтеді, бірақ кейінгі тақырыптардың іргетасы солар.'
          : `${n('known')} модульді білесіз${n('partial') ? `, ${n('partial')} модульді қайталау керек` : ''}. ${sm.code} ${sm.title} — сіз әлі толық меңгермеген алғашқы модуль. Білетін модульдердің емтиханын тапсырып, оларды жабуға болады.`;
        const res = { v: 2, track, mods, start, text, correct, total, date: S.today() };
        const hadBadge = !!S.progress().badges.diagnostic;
        S.setDiag(res);
        if (!hadBadge) toast('Жаңа белгі: Өзін білген', 'compass');
        topbar();
        showResult(res);
      };
      nextBlock();
    }

    if (p.diag && p.diag.v === 2) showResult(p.diag);
    else intro();
  }

  // ---------- leaderboard ----------
  function viewBoard() {
    const cloudUser = DJ.cloud && DJ.cloud.user;
    const period = route.mod === 'all' ? 'all' : 'week';
    $('#app').innerHTML = `<div class="diag">
      <div><div class="eyebrow">Рейтинг</div><h1 style="margin:6px 0 0">Кім көп оқыды?</h1></div>
      ${cloudUser ? `<div class="tabs" role="tablist">${[['week', 'Осы апта'], ['all', 'Барлық уақыт']].map(([k, n]) => `<button role="tab" data-go="board" data-mod="${k}" aria-selected="${period === k}">${n}</button>`).join('')}</div>
      <div class="card" id="board"><p class="muted" style="margin:0">Жүктелуде…</p></div>
      <p class="note" style="margin:0">Рейтингте тек атыңыз бен XP көрінеді. Атыңызды өзгерту немесе рейтингтен шығу: Профиль → Аккаунт.</p>`
      : `<div class="card"><p style="margin:0">Рейтинг аккаунтпен (Google не email) кірген оқушыларға ғана көрінеді, себебі ол бұлттағы прогреске сүйенеді.</p></div>`}
    </div>`;
    if (!cloudUser) return;
    DJ.cloud.leaderboard(period).then(rows => {
      if (route.view !== 'board') return;
      $('#board').innerHTML = rows.length ? `<ol class="board">${rows.map(r => `<li class="${r.is_me ? 'me' : ''}"><span class="pos">${r.pos}</span><span class="nm">${esc(r.name)}${r.is_me ? ' <span class="muted">(сіз)</span>' : ''}</span><b>${r.xp} XP</b></li>`).join('')}</ol>`
        : `<p class="muted" style="margin:0">${period === 'week' ? 'Бұл аптада әзірге ешкім XP жинамады. Бірінші болыңыз!' : 'Әзірге бос.'}</p>`;
    }).catch(e => {
      $('#board').innerHTML = `<p class="muted" style="margin:0">Рейтингті жүктеу мүмкін болмады.${/function|schema cache|not find/i.test(e.message || '') ? ' Supabase-те <code>supabase/leaderboard.sql</code> әлі іске қосылмаған.' : ''}</p>`;
    });
  }

  // ---------- certificates ----------
  // A certificate is earned for each career level (L1…L7): every lesson of every module that level and the levels below it need.
  function certModules(levelId) {
    const i = DJ.careerLevels.findIndex(l => l.id === levelId);
    return i < 1 ? [] : DJ.careerLevels.slice(1, i + 1).flatMap(l => l.needs);
  }
  function certData(levelId, name, lessons) {
    const level = DJ.careerLevels.find(l => l.id === levelId);
    if (!level || !level.needs) return null;
    const mods = certModules(levelId).map(id => {
      const m = DJ.findModule(id), ds = (m.lessons || []).map(l => lessons[l.id]);
      return { m, ok: !!m.lessons && ds.every(Boolean), date: ds.filter(Boolean).sort().pop() || '' };
    });
    return { level, name, mods, ok: mods.every(x => x.ok), date: mods.map(x => x.date).sort().pop() || '' };
  }
  function certsEarned(p) { return DJ.careerLevels.slice(1).filter(l => { const c = certData(l.id, '', p.lessons); return c && c.ok; }); }
  function viewCert() {
    const inFrame = (() => { try { return window.self !== window.top; } catch (e) { return true; } })();
    const draw = (c, verified, link) => {
      if (!c) { $('#app').innerHTML = `<div class="diag"><div class="card"><p style="margin:0">Сертификат табылмады.</p></div></div>`; return; }
      if (!c.ok) { $('#app').innerHTML = `<div class="diag"><div class="card"><p style="margin:0">${esc(c.level.id)} ${esc(c.level.name)} сертификаты әлі берілмеген: барлық модуль аяқталмаған.</p></div></div>`; return; }
      $('#app').innerHTML = `<div class="cert-wrap">
        <article class="cert">
          <div class="cert-top">${LOGO}<span class="wordmark">TOLQYN</span><span class="cert-id">${esc(c.level.id)}</span></div>
          <div class="eyebrow">Сертификат</div>
          <p class="cert-lead">Осы сертификат</p>
          <h1 class="cert-name">${esc(c.name)}</h1>
          <p class="cert-lead">Tolqyn-дағы <b>${esc(c.level.name)}</b> деңгейіне кіретін барлық модульді аяқтағанын растайды.</p>
          <ul class="cert-mods">${c.mods.map(x => `<li><span>${esc(x.m.code)} ${esc(x.m.title)}</span><span>${esc(x.date)}</span></li>`).join('')}</ul>
          <div class="cert-foot"><span>Берілген күні: <b>${esc(c.date)}</b></span>${verified ? `<span class="chip done">Tolqyn-да тіркелген</span>` : ''}</div>
          ${verified ? `<p class="note" style="margin:0">Бұл сертификат оқушының Tolqyn аккаунтындағы прогреске сүйенеді.</p>` : ''}
        </article>
        <div class="actions noprint">
          ${link ? `<button class="btn" id="cert-copy">Сілтемені көшіру</button>` : ''}
          ${inFrame ? '' : `<button class="btn ghost" id="cert-print">PDF ретінде сақтау</button>`}
          ${S.current() ? `<button class="btn ghost" data-go="profile">Профильге оралу</button>` : ''}
        </div>
        ${link ? `<p class="note noprint" style="margin:0">Бұл сілтемені резюмеге не LinkedIn-ге қойыңыз: оны ашқан адам сертификаттың нақты екенін көреді.</p><input class="cert-link noprint" readonly value="${esc(link)}">` : (S.current() ? `<p class="note noprint" style="margin:0">Тексерілетін сілтеме алу үшін аккаунтпен (Google не email) кіріңіз.</p>` : '')}
      </div>`;
      const cp = $('#cert-copy');
      if (cp) cp.onclick = () => { const inp = $('.cert-link'); (navigator.clipboard ? navigator.clipboard.writeText(link) : Promise.reject()).then(() => toast('Сілтеме көшірілді', 'link')).catch(() => { inp.select(); }); };
      const pr = $('#cert-print'); if (pr) pr.onclick = () => window.print();
    };
    if (route.uid) {
      $('#app').innerHTML = '<p class="muted" style="padding:40px 0">Сертификат тексерілуде…</p>';
      if (!(DJ.cloud && DJ.cloud.enabled)) { draw(null); return; }
      DJ.cloud.certInfo(route.uid).then(r => draw(r ? certData(route.mod, r.name, r.lessons || {}) : null, true, location.origin + location.pathname + `#cert/${route.uid}/${route.mod}`)).catch(() => draw(null));
      return;
    }
    const u = S.profile(), p = S.progress();
    const link = DJ.cloud && DJ.cloud.user ? location.origin + location.pathname + `#cert/${DJ.cloud.user.id}/${route.mod}` : '';
    draw(certData(route.mod, u.name, p.lessons), false, link);
  }

  // ---------- profile ----------
  function viewProfile() {
    const u = S.profile(), p = S.progress(), lv = S.level(p.xp), career = S.careerLevel(p);
    const theme = lsGet('dj.theme') || 'system';
    const stat = (n, l) => `<div><div style="font-family:var(--font-display);font-size:1.5rem;font-variant-numeric:tabular-nums">${n}</div><div class="note">${l}</div></div>`;
    $('#app').innerHTML = `<div class="diag">
      <div class="card" style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
        <span class="avatar" style="width:56px;height:56px;font-size:1.4rem">${esc(u.name.slice(0, 1).toUpperCase())}</span>
        <div style="min-width:0"><h1 style="font-size:1.5rem;margin:0">${esc(u.name)}</h1><div class="muted">@${esc(u.username)} · ${esc(career.id)} ${esc(career.name)} · ${u.created} бастап</div></div>
      </div>
      <div class="card" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:16px">
        ${stat(p.xp, 'XP барлығы')}${stat(lv.level, 'деңгей')}${stat(p.best, 'ең ұзақ streak')}${stat(Object.keys(p.lessons).length, 'сабақ өтілді')}${stat(Object.keys(p.done).length, 'тапсырма орындалды')}
      </div>
      <div class="card"><h3 style="margin-bottom:10px">Мансап деңгейі</h3><div style="display:grid;gap:4px">${DJ.careerLevels.map((l, i) => { const ci = DJ.careerLevels.findIndex(x => x.id === career.id); return `<div style="display:flex;gap:12px;font-size:.92rem;${i === ci ? 'color:var(--accent);font-weight:600' : i < ci ? '' : 'color:var(--ink-2)'}"><span style="font-family:var(--font-mono);width:28px">${l.id}</span><span>${esc(l.name)}</span></div>`; }).join('')}</div></div>
      <div class="card"><h3 style="margin-bottom:10px">Сертификаттар</h3>${(() => { const cs = certsEarned(p); return cs.length ? `<div style="display:grid;gap:8px">${cs.map(l => `<div style="display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap"><span><b>${esc(l.id)}</b> ${esc(l.name)}</span><button class="btn ghost sm" data-go="cert" data-mod="${l.id}">Сертификатты ашу</button></div>`).join('')}</div>` : `<p class="note" style="margin:0">Мансап деңгейінің барлық модулін (емтихандарымен) аяқтағанда сертификат беріледі. Алғашқысы: L1 Data Literate (M0.1 және M0.2).</p>`; })()}</div>
      <div class="card"><h3 style="margin-bottom:12px">Белгілер</h3><div style="display:grid;gap:10px">${S.BADGES.map(b => `<div style="display:flex;gap:12px;align-items:center" class="bdg-row"><div class="bdg ${p.badges[b.id] ? 'got' : ''}"><div class="hex" style="width:40px;height:40px">${ICON[b.icon]}</div></div><div><b>${esc(b.name)}</b><div class="note">${esc(b.desc)}${p.badges[b.id] ? ' · ' + p.badges[b.id] : ''}</div></div></div>`).join('')}</div></div>
      <div class="card" style="display:grid;gap:10px"><h3>Тақырып</h3>
        <div class="tabs" role="tablist">${[['system', 'Жүйелік'], ['light', 'Жарық'], ['dark', 'Қараңғы']].map(([k, n]) => `<button role="tab" data-theme-set="${k}" aria-selected="${theme === k}">${n}</button>`).join('')}</div>
      </div>
      <div class="card" style="display:grid;gap:10px"><h3>Аккаунт</h3>
        <p class="note" style="margin:0">${DJ.cloud && DJ.cloud.user ? `Бұлттағы аккаунт: ${esc(DJ.cloud.user.email || '')}. Прогресс барлық құрылғыда бірдей.` : 'Бұл нұсқада аккаунт пен прогресс осы браузерде сақталады. Басқа құрылғыда көрінбейді.'}</p>
        <form id="rename" style="display:flex;gap:8px;flex-wrap:wrap;align-items:end"><label class="field" style="flex:1;min-width:180px;margin:0">Көрсетілетін аты (рейтинг, сертификат)<input type="text" name="nm" maxlength="40" value="${esc(u.name)}"></label><button class="btn ghost" type="submit">Сақтау</button></form>
        ${DJ.cloud && DJ.cloud.user ? `<form id="set-pw" style="display:flex;gap:8px;flex-wrap:wrap;align-items:end"><label class="field" style="flex:1;min-width:180px;margin:0">Жаңа пароль (email мен парольмен кіру үшін)<input type="password" name="npw" autocomplete="new-password" minlength="8"></label><button class="btn ghost" type="submit">Парольді сақтау</button></form><div class="err" id="pw-err" role="alert"></div>` : ''}
        ${DJ.cloud && DJ.cloud.user ? `<label style="display:flex;gap:8px;align-items:center"><input type="checkbox" id="hide-lb" ${(p.prefs || {}).hideLb ? 'checked' : ''}> Мені рейтингте көрсетпеу</label>` : ''}
        <div class="actions"><button class="btn ghost" id="logout">Шығу</button><button class="btn ghost" id="reset-p" style="color:var(--bad)">Прогресті нөлдеу</button></div>
        <div id="confirm"></div>
      </div>
    </div>`;
    $$('[data-theme-set]').forEach(b => b.onclick = () => { const t = b.dataset.themeSet; lsSet('dj.theme', t); applyTheme(t); viewProfile(); });
    $('#rename').onsubmit = e => { e.preventDefault(); const v = e.target.nm.value.trim(); if (v) { S.rename(v); topbar(); toast('Аты сақталды', 'star'); viewProfile(); } };
    const sp = $('#set-pw');
    if (sp) sp.onsubmit = async e => {
      e.preventDefault(); const v = e.target.npw.value, perr = $('#pw-err');
      if (v.length < 8) { perr.textContent = 'Пароль кемінде 8 таңба болсын.'; return; }
      let r; try { r = await DJ.cloud.setPassword(v); } catch (er) { r = { error: er }; }
      if (r && r.error) { perr.textContent = DJ.cloud.explain(r.error.message); return; }
      perr.textContent = ''; e.target.reset(); toast('Пароль сақталды. Енді email мен парольмен кіре аласыз.', 'star');
    };
    if (DJ.cloud && DJ.cloud.recovery && sp) { DJ.cloud.recovery = false; sp.npw.focus(); toast('Жаңа пароль қойыңыз', 'bolt'); }
    const hl = $('#hide-lb'); if (hl) hl.onchange = () => S.setPref('hideLb', hl.checked);
    $('#logout').onclick = async () => { if (DJ.cloud && DJ.cloud.user) await DJ.cloud.signOut(); S.logout(); go('auth'); };
    $('#reset-p').onclick = () => {
      $('#confirm').innerHTML = `<div class="verdict bad" style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">Барлық XP, сабақтар мен белгілер өшеді. Сенімдісіз бе?<button class="btn" id="yes-reset" style="background:var(--bad)">Иә, нөлдеу</button><button class="btn ghost" id="no-reset">Жоқ</button></div>`;
      $('#no-reset').onclick = () => { $('#confirm').innerHTML = ''; };
      $('#yes-reset').onclick = () => { if (S.resetProgress) S.resetProgress(); else S.save({ xp: 0, done: {}, lessons: {}, days: [], streak: 0, best: 0, lastDay: null, badges: {}, noHint: 0, diag: null, code: {}, prefs: p.prefs }); topbar(); go('dash'); };
    };
  }

  // ---------- wrong answers ----------
  // Every checker writes its own .verdict.bad; one observer adds the shake and the low tone to all of them.
  new MutationObserver(ms => {
    for (const m of ms) for (const n of m.addedNodes) {
      if (n.nodeType === 1 && n.matches && n.matches('.verdict.bad') && n.closest('.lesson')) { G.shake(n); G.play('bad'); return; }
    }
  }).observe(document.getElementById('app'), { childList: true, subtree: true });

  // ---------- boot ----------
  route = parseHash(location.hash) || route;
  // Cloud progress merged in the background: refresh screens that only show progress (never an open lesson).
  window.addEventListener('dj:progress', () => { if (!S.current()) return; topbar(); if (['dash', 'profile', 'map', 'module', 'catalog', 'course'].includes(route.view)) render(); });
  window.addEventListener('dj:sync-failed', () => toast('Прогресс бұлтқа сақталмады: дерекқор шегі асып кетті. Прогресс осы браузерде сақтаулы. Кері байланыс арқылы хабарлаңыз.', 'bolt'), { once: true });
  window.addEventListener('dj:storage-full', () => toast('Браузер жады толды: прогресс сақталмауы мүмкін. Аккаунтпен кіріңіз немесе ескі деректі тазалаңыз.', 'bolt'));
  // With cloud accounts on, only a return from Google or an email link waits for the Supabase session.
  // Otherwise the app opens at once from this browser's copy and the cloud session is checked in the background,
  // so a slow network or a waking Supabase project never leaves the learner on a blank page.
  if (DJ.cloud && DJ.cloud.enabled) {
    const finish = () => { if (/access_token|error_description/.test(location.hash)) history.replaceState(null, '', location.pathname); if (route.view === 'auth' && S.current()) route = pendingRoute || { view: 'dash' }; if (DJ.cloud.recovery && DJ.cloud.user) route = { view: 'profile' }; render(); };
    if (/access_token|error_description|type=recovery/.test(location.hash)) {
      $('#app').innerHTML = '<p class="muted" style="padding:40px 0">Жүктелуде…</p>';
      DJ.cloud.load().catch(e => console.warn(e)).finally(finish);
    } else {
      const before = S.current();
      render();
      DJ.cloud.load().catch(e => console.warn(e)).finally(() => { if (S.current() !== before) finish(); });
    }
  } else render();
})();
