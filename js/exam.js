// Class assignments and exams: the teacher's assignment panel (inside #teach), the live report (#asg/<id>),
// the learner's exam page (#exam/<id>) and the dashboard card. Data lives in Supabase (supabase/assign.sql).
// Anti-copying in phase 1: own random tasks per learner, a server-side clock, paste and copy blocked,
// leaving the page and full-screen exits logged and shown live to the teacher, similar code flagged in the report.
(function () {
  DJ.examScreens = function (ui) {
  const { $, $$, esc, S, ICON, go, toast, track } = ui;
  const C = () => DJ.cloud;
  const signedIn = () => !!(C() && C().user);
  const msgOf = e => (e && e.message) || String(e || '');
  const needSql = e => /function|schema cache|not find|does not exist/i.test(msgOf(e)) ? ' Supabase-те <code>supabase/assign.sql</code> әлі іске қосылмаған сияқты.' : '';
  const card = html => `<div class="card">${html}</div>`;
  const CODE_TYPES = ['sql', 'python', 'java', 'cpp'];
  const pad = n => String(n).padStart(2, '0');
  const fmtDate = d => { if (!d) return ''; const x = new Date(d); return `${x.getFullYear()}-${pad(x.getMonth() + 1)}-${pad(x.getDate())} ${pad(x.getHours())}:${pad(x.getMinutes())}`; };
  const fmtLeft = ms => { ms = Math.max(0, ms); const s = Math.floor(ms / 1000), h = Math.floor(s / 3600); return (h ? h + ':' : '') + pad(Math.floor(s / 60) % 60) + ':' + pad(s % 60); };
  const fmtDur = ms => { const m = Math.round((ms || 0) / 60000); return m < 1 ? `${Math.round((ms || 0) / 1000)} с` : `${m} мин`; };
  // Phones and tablets cannot take an exam: no full-screen check, and a second screen is too easy.
  const isPhone = () => window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches || window.innerWidth < 760;

  // 'sql-1#0' → where it lives in the light index (module, lesson index, exercise index).
  function locate(id) {
    const [lid, n] = id.split('#');
    for (const mid in DJ.modules) {
      const ls = DJ.modules[mid].lessons || [], li = ls.findIndex(l => l.id === lid);
      if (li >= 0) return { mod: mid, li, ei: +n, lesson: ls[li] };
    }
    return null;
  }
  async function exercise(id) {
    const w = locate(id); if (!w) return null;
    await DJ.loadModule(w.mod);
    const l = DJ.modules[w.mod].lessons[w.li];
    return { ex: (l.exercises || [])[w.ei], lesson: l, mod: DJ.findModule(w.mod) };
  }
  const codeTasks = l => (l.exercises || []).filter(e => CODE_TYPES.includes(e.type)).length;

  // ================= teacher: assignments of one class (inside its card on #teach) =================
  function teacherPanel(box, cls) {
    box.innerHTML = '<p class="muted" style="margin-top:10px">Жүктелуде…</p>';
    C().call('class_assignments', { cid: cls.id }).then(rows => draw(rows || []))
      .catch(e => { box.innerHTML = `<p class="muted" style="margin-top:10px">Тапсырмаларды жүктеу мүмкін болмады.${needSql(e)}</p>`; });
    const draw = rows => {
      const now = Date.now();
      box.innerHTML = `<div class="asg">
        <div class="asg-head"><h4 style="margin:0">Тапсырмалар мен емтихандар</h4><button class="btn sm" id="asg-new-${esc(cls.id)}">Жаңа тапсырма</button></div>
        <div id="asg-form-${esc(cls.id)}"></div>
        ${rows.length ? rows.map(a => {
          const open = new Date(a.opens_at).getTime() <= now, closed = a.due_at && new Date(a.due_at).getTime() < now;
          return `<div class="asg-item"><div><b>${esc(a.title)}</b> <span class="chip ${a.kind === 'exam' ? 'exam' : ''}">${a.kind === 'exam' ? 'Емтихан' : 'Үй жұмысы'}</span>
            <div class="note">${a.n} тапсырма${a.minutes ? ` · ${a.minutes} мин` : ''} · ${!open ? 'ашылады: ' + fmtDate(a.opens_at) : closed ? 'жабылды' : a.due_at ? 'дедлайн: ' + fmtDate(a.due_at) : 'ашық'} · бастады ${a.started}, аяқтады ${a.finished}</div></div>
            <div class="actions"><button class="btn sm" data-go="asg" data-aid="${esc(a.id)}">Есеп және бақылау</button><button class="btn ghost sm" data-asg-link="${esc(a.id)}">Сілтеме</button><button class="btn ghost sm" data-asg-del="${esc(a.id)}" style="color:var(--bad)">Өшіру</button></div></div>`;
        }).join('') : '<p class="note" style="margin:8px 0 0">Әзірге тапсырма жоқ. Тақырыпты таңдап, үй жұмысын немесе емтихан беріңіз.</p>'}
      </div>`;
      $('#asg-new-' + cls.id).onclick = () => form(cls, $('#asg-form-' + cls.id), () => teacherPanel(box, cls));
      $$('[data-asg-link]', box).forEach(b => b.onclick = () => { const l = location.origin + location.pathname + '#exam/' + b.dataset.asgLink; navigator.clipboard && navigator.clipboard.writeText(l).then(() => toast('Сілтеме көшірілді', 'check'), () => {}); });
      $$('[data-asg-del]', box).forEach(b => b.onclick = async () => {
        if (!confirm('Тапсырманы өшіресіз бе? Оқушылардың жауаптары да өшеді.')) return;
        try { await C().call('delete_assignment', { aid: b.dataset.asgDel }); teacherPanel(box, cls); } catch (e) { toast('Өшіру мүмкін болмады', 'bolt'); }
      });
    };
  }

  // The new-assignment form: course → lessons (with how many code tasks each has) → settings.
  function form(cls, host, done) {
    const courses = (DJ.catalog || []).flatMap(g => g.courses).filter(c => c.mods.some(id => ((DJ.findModule(id) || {}).lessons || []).some(codeTasks)));
    const local = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    host.innerHTML = `<form class="asg-form" novalidate>
      <label class="field">Атауы<input name="title" maxlength="80" placeholder="Мысалы: SQL, JOIN бойынша емтихан" required></label>
      <div class="tabs" role="radiogroup" aria-label="Түрі"><button type="button" role="radio" data-kind="homework" aria-checked="true" aria-selected="true">Үй жұмысы</button><button type="button" role="radio" data-kind="exam" aria-checked="false" aria-selected="false">Емтихан</button></div>
      <label class="field">Курс<select name="course">${courses.map(c => `<option value="${esc(c.id)}">${esc(c.title)}</option>`).join('')}</select></label>
      <div class="asg-lessons" id="asg-ls"></div>
      <p class="note" id="asg-bank" style="margin:0"></p>
      <div class="asg-grid">
        <label class="field">Тапсырма саны<input name="n" type="number" min="1" max="30" value="5"></label>
        <label class="field exam-only" hidden>Ұзақтығы, мин<input name="minutes" type="number" min="5" max="300" value="45"></label>
        <label class="field">Ашылады<input name="opens" type="datetime-local" value="${local(new Date())}"></label>
        <label class="field">Дедлайн (міндетті емес)<input name="due" type="datetime-local"></label>
      </div>
      <p class="note exam-only" hidden style="margin:0">Емтихан тек компьютерде, толық экранда ашылады. Кеңестер мен теория жабық, мәтін қою бұғатталған, басқа бетке кету сізге бірден көрінеді.</p>
      <div class="err" role="alert" id="asg-err"></div>
      <div class="actions"><button class="btn" type="submit">Тапсырманы беру</button><button class="btn ghost" type="button" id="asg-cancel">Болдырмау</button></div>
    </form>`;
    const f = $('form', host);
    let kind = 'homework';
    $$('[data-kind]', f).forEach(b => b.onclick = () => {
      kind = b.dataset.kind;
      $$('[data-kind]', f).forEach(x => { const on = x === b; x.setAttribute('aria-checked', on); x.setAttribute('aria-selected', on); });
      $$('.exam-only', f).forEach(x => { x.hidden = kind !== 'exam'; });
    });
    const lessonsBox = $('#asg-ls', f), bankEl = $('#asg-bank', f);
    const bank = () => { let n = 0; $$('input[data-lid]:checked', lessonsBox).forEach(i => { n += +i.dataset.n; }); bankEl.textContent = n ? `Таңдалған сабақтарда ${n} код тапсырмасы бар: әр оқушыға олардың ішінен кездейсоқ беріледі.` : 'Кемінде бір сабақ таңдаңыз.'; return n; };
    const drawLessons = () => {
      const c = courses.find(x => x.id === f.course.value);
      lessonsBox.innerHTML = c.mods.map(id => DJ.findModule(id)).filter(Boolean).map(m => {
        const ls = (m.lessons || []).filter(codeTasks);
        return ls.length ? `<fieldset><legend><label><input type="checkbox" data-all="${esc(m.id)}"> ${esc(m.code)} ${esc(m.title)}</label></legend>
          ${ls.map(l => `<label><input type="checkbox" data-lid="${esc(l.id)}" data-m="${esc(m.id)}" data-n="${codeTasks(l)}"> ${esc(l.title)} <span class="note">(${codeTasks(l)})</span></label>`).join('')}</fieldset>` : '';
      }).join('');
      $$('[data-all]', lessonsBox).forEach(a => a.onchange = () => { $$(`[data-m="${a.dataset.all}"]`, lessonsBox).forEach(i => { i.checked = a.checked; }); bank(); });
      $$('[data-lid]', lessonsBox).forEach(i => i.onchange = bank);
      bank();
    };
    f.course.onchange = drawLessons; drawLessons();
    $('#asg-cancel', f).onclick = () => { host.innerHTML = ''; };
    f.onsubmit = async e => {
      e.preventDefault();
      const err = $('#asg-err', f), title = f.title.value.trim(), ids = $$('input[data-lid]:checked', lessonsBox).map(i => i.dataset.lid);
      const n = Math.max(1, Math.min(30, Number(f.n.value) || 5)), minutes = Number(f.minutes.value) || 45;
      if (title.length < 2) { err.textContent = 'Тапсырма атауын жазыңыз.'; return; }
      if (!ids.length) { err.textContent = 'Кемінде бір сабақ таңдаңыз.'; return; }
      if (kind === 'exam' && (minutes < 5 || minutes > 300)) { err.textContent = 'Емтихан ұзақтығы 5–300 минут.'; return; }
      const opens = f.opens.value ? new Date(f.opens.value).toISOString() : null, due = f.due.value ? new Date(f.due.value).toISOString() : null;
      if (due && opens && due <= opens) { err.textContent = 'Дедлайн ашылу уақытынан кейін болуы керек.'; return; }
      try {
        await C().call('create_assignment', { cid: cls.id, atitle: title, akind: kind, lesson_ids: ids, n, minutes: kind === 'exam' ? minutes : null, opens, due });
        track('assignment_create', { kind, n }); toast('Тапсырма берілді', 'check'); done();
      } catch (er) { err.textContent = /no code tasks/i.test(msgOf(er)) ? 'Таңдалған сабақтарда код тапсырмасы жоқ.' : 'Тапсырманы беру мүмкін болмады.' + needSql(er); }
    };
  }

  // ================= teacher: report and live watch (#asg/<id>) =================
  let watch = null;   // { timer, since, aid }
  // Similar code: comments and string contents dropped, names folded to one token, then 3-token shingles compared.
  const KEYWORDS = new Set('select from where group by order having join left right inner outer on as and or not in is null count sum avg min max distinct limit case when then else end with union all insert update delete create table values set def return if elif else for while in import print range len int str float list dict class public static void main new string system out println include using namespace std cout cin endl vector auto const'.split(' '));
  function norm(code, starter) {
    const skip = new Set((starter || '').split('\n').map(s => s.trim()).filter(Boolean));
    const body = (code || '').split('\n').filter(l => !skip.has(l.trim())).join('\n')
      .replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(--|#|\/\/).*$/gm, ' ').replace(/(['"])(?:\\.|(?!\1).)*\1/g, ' S ');
    return (body.toLowerCase().match(/[a-zа-яәғқңөұүһі_][\wа-яәғқңөұүһі]*|\d+|[^\s\w]/gi) || []).map(t => /^[a-zа-яәғқңөұүһі_]/i.test(t) && !KEYWORDS.has(t) ? 'v' : t);
  }
  function similarity(a, b) {
    if (a.length < 12 || b.length < 12) return 0;
    const sh = t => { const s = new Set(); for (let i = 0; i + 3 <= t.length; i++) s.add(t.slice(i, i + 3).join(' ')); return s; };
    const A = sh(a), B = sh(b); let inter = 0; A.forEach(x => { if (B.has(x)) inter++; });
    return inter / (A.size + B.size - inter);
  }
  const EV_NAME = { blur: 'басқа бетке кетті', paste: 'мәтін қоюға тырысты', copy: 'мәтін көшіруге тырысты', fs_exit: 'толық экраннан шықты', devtools: 'әзірлеуші құралдарын ашты' };
  async function viewReport() {
    const aid = ui.route.aid;
    stopWatch();
    $('#app').innerHTML = `<div class="diag asg-report" style="max-width:1000px"><div class="crumbs"><button data-go="teach">Сыныптар</button><span>/</span><span>Есеп</span></div>
      <div id="rep">${card('<p class="muted" style="margin:0">Жүктелуде…</p>')}</div></div>`;
    if (!signedIn()) { $('#rep').innerHTML = card('<p style="margin:0">Есепті көру үшін аккаунтпен кіріңіз.</p>'); return; }
    let rows;
    try { [rows] = await Promise.all([C().call('assignment_report', { aid }), DJ.loadAll()]); }
    catch (e) { if (ui.route.view === 'asg') $('#rep').innerHTML = card(`<p style="margin:0">Есепті жүктеу мүмкін болмады.${needSql(e)}</p>`); return; }
    if (ui.route.view !== 'asg' || ui.route.aid !== aid) return;
    rows = rows || [];
    // Pairs of learners whose code for the same task is too alike.
    const flags = {};
    const starters = {};
    const codeOf = (r, ex) => ((r.answers || []).find(a => a.ex === ex) || {}).code || '';
    const exIds = [...new Set(rows.flatMap(r => r.tasks || []))];
    await Promise.all(exIds.map(async id => { const x = await exercise(id).catch(() => null); starters[id] = x && x.ex ? x.ex.starter || '' : ''; }));
    for (const ex of exIds) {
      const have = rows.filter(r => (r.tasks || []).includes(ex) && codeOf(r, ex));
      for (let i = 0; i < have.length; i++) for (let j = i + 1; j < have.length; j++) {
        const s = similarity(norm(codeOf(have[i], ex), starters[ex]), norm(codeOf(have[j], ex), starters[ex]));
        if (s >= 0.85) { (flags[have[i].user_id] = flags[have[i].user_id] || []).push([have[j].name, ex, s]); (flags[have[j].user_id] = flags[have[j].user_id] || []).push([have[i].name, ex, s]); }
      }
    }
    const status = r => !r.started_at ? 'Бастамады' : r.finished_at || (r.deadline && Date.parse(r.deadline) < Date.now()) ? 'Аяқтады' : 'Жазып жатыр';
    const score = r => (r.answers || []).filter(a => a.ok).length;
    const spent = r => r.started_at ? fmtDur((r.finished_at ? Date.parse(r.finished_at) : Math.min(Date.now(), r.deadline ? Date.parse(r.deadline) : Date.now())) - Date.parse(r.started_at)) : '';
    const ev = (r, k) => (r.events || {})[k] || { n: 0, ms: 0 };
    const warn = r => ev(r, 'blur').n + ev(r, 'paste').n + ev(r, 'copy').n + ev(r, 'fs_exit').n + (flags[r.user_id] || []).length;
    $('#rep').innerHTML = `
      <div class="card"><div class="eyebrow">Есеп</div><h1 style="margin:6px 0 4px;font-size:1.5rem">Тапсырма нәтижелері</h1>
        <p class="note" style="margin:0">${rows.filter(r => r.started_at).length} / ${rows.length} оқушы бастады. Күдікті белгілер тек ақпарат: шешімді өзіңіз қабылдайсыз.</p>
        <div class="actions" style="margin-top:10px"><button class="btn ghost sm" id="rep-csv">CSV жүктеу</button><button class="btn ghost sm" id="rep-refresh">Жаңарту</button>${'Notification' in window && Notification.permission === 'default' ? '<button class="btn ghost sm" id="rep-notify">Браузер хабарламаларын қосу</button>' : ''}</div></div>
      <div class="card live-feed"><h3 style="margin:0 0 6px">Тікелей бақылау <span class="live-dot" aria-hidden="true"></span></h3><div id="live" class="note">Күдікті әрекет болса, осы жерде бірден шығады.</div></div>
      <div class="card"><div class="tbl-wrap"><table class="tbl"><tr><th>Оқушы</th><th>Күйі</th><th>Ұпай</th><th>Уақыт</th><th>Басқа бет</th><th>Paste</th><th>Толық экраннан шығу</th><th>Ұқсас код</th><th></th></tr>
        ${rows.map((r, i) => `<tr class="${warn(r) >= 3 ? 'warn' : ''}"><td>${esc(r.name)}</td><td>${status(r)}</td><td>${r.started_at ? `${score(r)} / ${(r.tasks || []).length}` : ''}</td><td>${spent(r)}</td>
          <td>${ev(r, 'blur').n ? `${ev(r, 'blur').n} рет, ${fmtDur(ev(r, 'blur').ms)}` : '0'}</td><td>${ev(r, 'paste').n + ev(r, 'copy').n}</td><td>${ev(r, 'fs_exit').n}</td>
          <td>${(flags[r.user_id] || []).length ? (flags[r.user_id] || []).map(([n, , s]) => `${esc(n)} (${Math.round(s * 100)}%)`).join(', ') : ''}</td>
          <td>${r.started_at ? `<button class="linkbtn" data-open="${i}">Код</button> · <button class="linkbtn" data-reset="${esc(r.user_id)}">Қайта тапсыру</button>` : ''}</td></tr>
          <tr class="code-row" id="code-${i}" hidden><td colspan="9">${(r.tasks || []).map((ex, k) => { const a = (r.answers || []).find(x => x.ex === ex); const w = locate(ex); return `<div class="code-ans"><div class="note">${k + 1}. ${esc(w ? w.lesson.title : ex)} · ${a ? (a.ok ? '<b class="ok-t">дұрыс</b>' : 'дұрыс емес') + ` · ${a.tries} әрекет` : 'жауап жоқ'}</div>${a && a.code ? `<pre>${esc(a.code)}</pre>` : ''}</div>`; }).join('')}</td></tr>`).join('')}
      </table></div></div>`;
    $$('[data-open]').forEach(b => b.onclick = () => { const tr = $('#code-' + b.dataset.open); tr.hidden = !tr.hidden; });
    $$('[data-reset]').forEach(b => b.onclick = async () => {
      if (!confirm('Бұл оқушының жауаптары өшіп, ол тапсырманы басынан бастай алады. Жалғастырасыз ба?')) return;
      try { await C().call('reset_attempt', { aid, uid: b.dataset.reset }); viewReport(); } catch (e) { toast('Мүмкін болмады', 'bolt'); }
    });
    $('#rep-refresh').onclick = () => viewReport();
    const nb = $('#rep-notify'); if (nb) nb.onclick = () => Notification.requestPermission().then(() => nb.remove());
    $('#rep-csv').onclick = () => {
      const cell = v => /[",\n;]/.test(String(v)) ? '"' + String(v).replace(/"/g, '""') + '"' : String(v);
      const head = ['name', 'status', 'solved', 'tasks', 'started_at', 'finished_at', 'left_page', 'left_ms', 'paste_copy', 'fullscreen_exits', 'similar_to'];
      const csv = [head].concat(rows.map(r => [r.name, status(r), score(r), (r.tasks || []).length, r.started_at || '', r.finished_at || '', ev(r, 'blur').n, ev(r, 'blur').ms, ev(r, 'paste').n + ev(r, 'copy').n, ev(r, 'fs_exit').n, (flags[r.user_id] || []).map(f => f[0]).join(' ')]))
        .map(x => x.map(cell).join(',')).join('\n');
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' })); a.download = 'report.csv'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    };
    // Live watch: new log events every 8 seconds while this page is open.
    watch = { aid, since: new Date(Date.now() - 24 * 3600000).toISOString(), first: true, any: false };
    const poll = async () => {
      if (!watch || watch.aid !== aid || ui.route.view !== 'asg') return stopWatch();
      try {
        const evs = await C().call('assignment_events', { aid, since: watch.since });
        if (!watch) return;
        if (evs && evs.length) {
          watch.since = evs[evs.length - 1].at;
          const live = $('#live');
          if (live) { if (!watch.any) live.innerHTML = ''; live.insertAdjacentHTML('afterbegin', evs.slice().reverse().map(e => `<div class="live-ev ${esc(e.kind)}"><b>${esc(e.name)}</b> ${EV_NAME[e.kind] || esc(e.kind)}${e.ms ? ` (${fmtDur(e.ms)})` : ''} <span class="note">${fmtDate(e.at).slice(11)}</span></div>`).join('')); }
          watch.any = true;
          if (!watch.first) {   // the first answer is the history; later ones are news
            const e = evs[evs.length - 1], text = `${e.name}: ${EV_NAME[e.kind] || e.kind}`;
            toast(esc(text), 'flag');
            if ('Notification' in window && Notification.permission === 'granted' && document.hidden) { try { new Notification('Tolqyn', { body: text }); } catch (x) {} }
          }
        }
        watch.first = false;
      } catch (e) {}
      if (watch && watch.aid === aid) watch.timer = setTimeout(poll, 8000);
    };
    poll();
  }
  function stopWatch() { if (watch && watch.timer) clearTimeout(watch.timer); watch = null; }

  // ================= learner: the exam page (#exam/<id>) =================
  let X = null;   // the running attempt: { aid, kind, tasks, deadline, offset, cur, codes, ok, cm, ... }
  function cleanup() {
    if (!X) return;
    if (X.tick) clearInterval(X.tick);
    for (const [t, ev, fn] of X.listeners) t.removeEventListener(ev, fn, true);
    document.body.classList.remove('exam-mode');
    if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {});
    X = null;
  }
  const logEv = (kind, ms) => { if (X && !X.done) C().call('log_event', { aid: X.aid, ekind: kind, ems: ms == null ? null : Math.round(ms) }).catch(() => {}); };

  async function viewExam() {
    const aid = ui.route.aid;
    cleanup();
    $('#app').innerHTML = `<div class="diag">${card('<p class="muted" style="margin:0">Жүктелуде…</p>')}</div>`;
    if (!signedIn()) { $('#app').innerHTML = `<div class="diag">${card('<h3>Тапсырма</h3><p>Тапсырманы орындау үшін аккаунтпен (email немесе Google) кіріңіз: жауаптарыңыз мұғаліміңізге сақталады.</p><div class="actions"><button class="btn" data-go="auth">Кіру</button></div>')}</div>`; return; }
    let info;
    try { info = ((await C().call('my_assignments')) || []).find(a => a.id === aid); } catch (e) { $('#app').innerHTML = `<div class="diag">${card(`<p style="margin:0">Тапсырманы жүктеу мүмкін болмады.${needSql(e)}</p>`)}</div>`; return; }
    if (ui.route.view !== 'exam') return;
    if (!info) { $('#app').innerHTML = `<div class="diag">${card('<p style="margin:0">Бұл тапсырма табылмады. Мұғалім берген сынып кодымен сыныпқа қосылғаныңызды тексеріңіз (Профиль → Сыныптар).</p>')}</div>`; return; }
    const exam = info.kind === 'exam';
    if (info.finished) return results(aid, info);
    if (exam && isPhone()) { $('#app').innerHTML = `<div class="diag">${card(`<h3>${esc(info.title)}</h3><p style="margin:0">Емтихан тек компьютерде (ноутбук немесе үстел компьютері) ашылады. Осы сілтемені компьютерден ашыңыз.</p>`)}</div>`; return; }
    const notOpen = Date.parse(info.opens_at) > Date.now();
    $('#app').innerHTML = `<div class="diag exam-intro"><div class="card">
      <div class="eyebrow">${esc(info.class_name)} · ${exam ? 'Емтихан' : 'Үй жұмысы'}</div><h1 style="margin:6px 0 10px;font-size:1.6rem">${esc(info.title)}</h1>
      <ul class="rules">
        <li>${info.n} код тапсырмасы. Әр оқушыға тапсырмалар әртүрлі беріледі.</li>
        ${exam ? `<li>Уақыты: <b>${info.minutes} минут</b>. Таймер «Бастау» басқанда іске қосылады және тоқтамайды, бетті жаңартсаңыз да.</li>` : ''}
        ${info.due_at ? `<li>Дедлайн: <b>${fmtDate(info.due_at)}</b>.</li>` : ''}
        <li>Кеңестер, теория және дұрыс жауап көрсетілмейді.</li>
        <li>Сырттан мәтін қою (paste) жұмыс істемейді. Кодты өзіңіз жазыңыз.</li>
        <li>Жазған кодыңыз бен нәтижеңізді мұғалім көреді.</li>
        ${exam ? '<li>Емтихан толық экранда өтеді. Басқа бетке не терезеге кетсеңіз, толық экраннан шықсаңыз, мұғалім оны бірден көреді.</li>' : '<li>Басқа бетке кетуіңіз мұғалімнің есебінде көрінеді.</li>'}
      </ul>
      ${notOpen ? `<p class="verdict info">Тапсырма ${fmtDate(info.opens_at)} ашылады.</p>` : `<div class="actions"><button class="btn big" id="ex-start">${info.started_at ? 'Жалғастыру' : 'Бастау'} ${ICON.play}</button></div>`}
      <div class="err" role="alert" id="ex-err"></div></div></div>`;
    const sb = $('#ex-start');
    if (sb) sb.onclick = async () => {
      sb.disabled = true;
      if (exam && document.documentElement.requestFullscreen) { try { await document.documentElement.requestFullscreen(); } catch (e) {} }
      let r;
      try { r = ((await C().call('start_attempt', { aid })) || [])[0]; }
      catch (e) { sb.disabled = false; $('#ex-err').textContent = /closed/i.test(msgOf(e)) ? 'Тапсырма жабылған.' : /not open/i.test(msgOf(e)) ? 'Тапсырма әлі ашылмаған.' : 'Бастау мүмкін болмады.' + needSql(e); if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); return; }
      if (!r || !(r.tasks || []).length) { $('#ex-err').textContent = 'Бұл тапсырмада сұрақ табылмады.'; return; }
      if (r.finished) { if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); return results(aid, info); }
      track('exam_start', { kind: info.kind });
      run(aid, info, r);
    };
  }

  async function run(aid, info, r) {
    const exam = info.kind === 'exam';
    X = { aid, exam, info, tasks: r.tasks, deadline: r.deadline ? Date.parse(r.deadline) : null, offset: Date.parse(r.server_now) - Date.now(),
      cur: 0, codes: {}, ok: {}, ex: {}, cm: null, listeners: [], away: null, clip: '', done: false };
    for (const [id, a] of Object.entries(r.answers || {})) { X.ok[id] = !!a.ok; if (a.code) X.codes[id] = a.code; }
    $('#app').innerHTML = `<div class="diag">${card('<p class="muted" style="margin:0">Тапсырмалар жүктелуде…</p>')}</div>`;
    const loaded = await Promise.all(r.tasks.map(id => exercise(id).catch(() => null)));
    if (!X || X.aid !== aid) return;
    r.tasks.forEach((id, i) => { X.ex[id] = loaded[i]; });
    await ui.loadEditor();
    if (!X || X.aid !== aid) return;
    document.body.classList.add('exam-mode');
    const on = (t, ev, fn) => { t.addEventListener(ev, fn, true); X.listeners.push([t, ev, fn]); };
    // Leaving the page: one event per absence, with how long it lasted.
    const goAway = () => { if (X && !X.away) X.away = Date.now(); };
    const comeBack = () => { if (X && X.away) { const ms = Date.now() - X.away; X.away = null; if (ms > 800) { logEv('blur', ms); toast('Басқа бетке кеткеніңіз мұғалімге көрінеді', 'flag'); } } };
    on(document, 'visibilitychange', () => document.hidden ? goAway() : comeBack());
    on(window, 'blur', goAway); on(window, 'focus', comeBack);
    on(document, 'fullscreenchange', () => { if (X && X.exam && !X.done && !document.fullscreenElement) { logEv('fs_exit'); fsOverlay(); } });
    on(document, 'contextmenu', e => { if (!e.target.closest('.CodeMirror')) e.preventDefault(); });
    on(document, 'copy', e => { if (e.target.closest && e.target.closest('.CodeMirror')) { X.clip = X.cm ? X.cm.getSelection() : ''; return; } e.preventDefault(); logEv('copy'); });
    on(document, 'cut', e => { if (X.cm) X.clip = X.cm.getSelection(); });
    on(document, 'paste', e => { const t = (e.clipboardData && e.clipboardData.getData('text')) || ''; if (t && t === X.clip) return; e.preventDefault(); e.stopPropagation(); logEv('paste'); toast('Мәтін қою бұғатталған. Кодты өзіңіз жазыңыз.', 'lock'); });
    on(document, 'drop', e => { e.preventDefault(); logEv('paste'); });
    on(window, 'beforeunload', e => { if (X && !X.done) { e.preventDefault(); e.returnValue = ''; } });
    drawExam();
    X.tick = setInterval(tick, 1000); tick();
  }
  function fsOverlay() {
    if ($('#fs-back')) return;
    document.body.insertAdjacentHTML('beforeend', `<div class="fs-overlay" id="fs-back" role="dialog" aria-modal="true"><div class="card"><h3>Толық экраннан шықтыңыз</h3><p>Бұл мұғалімге көрінеді. Емтиханды жалғастыру үшін толық экранға қайтыңыз.</p><button class="btn" id="fs-btn">Толық экранға қайту</button></div></div>`);
    $('#fs-btn').onclick = async () => { try { await document.documentElement.requestFullscreen(); } catch (e) {} if (document.fullscreenElement) $('#fs-back').remove(); };
  }
  function tick() {
    if (!X) return;
    const el = $('#ex-timer');
    if (!X.deadline) { if (el) el.textContent = ''; return; }
    const left = X.deadline - (Date.now() + X.offset);
    if (el) { el.textContent = fmtLeft(left); el.classList.toggle('low', left < 5 * 60000); }
    if (left <= 5 * 60000 && !X.warned) { X.warned = true; toast('5 минут қалды', 'bolt'); }
    if (left <= 0) finish(true);
  }
  function drawExam() {
    const id = X.tasks[X.cur], t = X.ex[id], ex = t && t.ex;
    $('#app').innerHTML = `<div class="exam-page">
      <div class="exam-bar"><b class="exam-title">${esc(X.info.title)}</b>
        <div class="task-steps">${X.tasks.map((tid, i) => `<button class="${i === X.cur ? 'cur' : ''} ${X.ok[tid] ? 'ok' : X.codes[tid] ? 'touched' : ''}" data-ti="${i}" aria-label="Тапсырма ${i + 1}">${i + 1}</button>`).join('')}</div>
        <span class="exam-timer" id="ex-timer" aria-live="off"></span><button class="btn ghost sm" id="ex-finish">Аяқтау</button></div>
      ${ex ? `<div class="lesson exam-body">
        <div class="exam-task" id="ex-task"><h3>Тапсырма ${X.cur + 1} / ${X.tasks.length}</h3><div class="prose no-select">${ex.prompt}</div>
          ${ex.type === 'sql' && DJ.datasets[ex.dataset || 'shop'] && DJ.datasets[ex.dataset || 'shop'].tables ? `<details class="schema"><summary>Кестелер</summary>${Object.entries(DJ.datasets[ex.dataset || 'shop'].tables).map(([tn, c]) => `<div><code>${esc(tn)}</code>: ${esc(c)}</div>`).join('')}</details>` : ''}</div>
        <div class="exam-wb"><div class="editor-shell"><div class="editor-bar"><span class="lang">${{ sql: 'SQL', python: 'Python 3', java: 'Java', cpp: 'C++' }[ex.type]}</span><span>Ctrl+Enter: іске қосу</span></div><div id="cm"></div></div>
          ${ex.type === 'java' || ex.type === 'cpp' ? '<label style="display:block;margin-top:10px"><span class="eyebrow">Кіріс (stdin)</span><textarea id="stdin" rows="2" spellcheck="false" class="stdin"></textarea></label>' : ''}
          <div class="actions"><button class="btn ghost" id="ex-run">Іске қосу</button><button class="btn" id="ex-check">Тапсыру</button></div>
          <div id="ex-verdict"></div><div class="output" id="ex-out"><p class="muted" style="margin:0">Нәтиже осында шығады.</p></div></div>
      </div>` : card('<p style="margin:0">Бұл тапсырма жүктелмеді. Келесісіне өтіңіз.</p>')}
    </div>`;
    $$('[data-ti]').forEach(b => b.onclick = () => { saveCur(); X.cur = +b.dataset.ti; drawExam(); });
    $('#ex-finish').onclick = () => finish(false);
    tick();
    if (!ex) return;
    const host = $('#cm'), value = X.codes[id] != null ? X.codes[id] : ex.starter || '';
    const runIt = () => doRun(ex);
    if (window.CodeMirror) {
      X.cm = CodeMirror(host, { value, mode: { sql: 'text/x-sqlite', python: 'python', java: 'text/x-java', cpp: 'text/x-c++src' }[ex.type], lineNumbers: true, indentUnit: 4,
        matchBrackets: true, autoCloseBrackets: true, lineWrapping: true, viewportMargin: Infinity, dragDrop: false,
        extraKeys: { 'Ctrl-Enter': runIt, 'Cmd-Enter': runIt, Tab: c => c.somethingSelected() ? c.indentSelection('add') : c.replaceSelection('    ') } });
      // Paste is refused unless it is text copied from this editor.
      X.cm.on('beforeChange', (c, ch) => { if ((ch.origin === 'paste' || ch.origin === 'drop') && ch.text.join('\n') !== X.clip) { ch.cancel(); } });
      X.cm.on('change', () => { X.codes[id] = X.cm.getValue(); });
      setTimeout(() => X && X.cm && X.cm.refresh(), 0);
    } else {
      host.innerHTML = '<textarea id="plain" spellcheck="false" class="plain-ed"></textarea>';
      const ta = $('#plain'); ta.value = value;
      X.cm = { getValue: () => ta.value, getSelection: () => ta.value.slice(ta.selectionStart, ta.selectionEnd), refresh() {} };
      ta.oninput = () => { X.codes[id] = ta.value; };
    }
    $('#ex-run').onclick = runIt;
    $('#ex-check').onclick = () => doCheck(ex, id);
    const R = ex.type === 'sql' ? null : DJ.run[ex.type === 'python' ? 'py' : ex.type];
    if (R && R.status === 'idle') R.start().catch(() => {});
  }
  function saveCur() { if (X && X.cm) X.codes[X.tasks[X.cur]] = X.cm.getValue(); }
  const tableHtml = r => !r ? '<p class="muted" style="margin:0">Сұрау кесте қайтармады.</p>'
    : `<div style="overflow-x:auto"><table><tr>${r.columns.map(c => `<th>${esc(c)}</th>`).join('')}</tr>${r.values.slice(0, 100).map(row => `<tr>${row.map(v => `<td>${v === null ? '<span class="muted">NULL</span>' : esc(v)}</td>`).join('')}</tr>`).join('')}</table></div>`;
  const busy = on => ['#ex-run', '#ex-check'].forEach(s => { const b = $(s); if (b) b.disabled = on; });
  async function runtime(ex) {
    const R = DJ.run[ex.type === 'python' ? 'py' : ex.type];
    if (R.status !== 'ready') $('#ex-out').innerHTML = '<p class="muted" style="margin:0">Орта жүктелуде…</p>';
    await R.start();
    return R;
  }
  async function doRun(ex) {
    const code = X.cm.getValue(), out = () => $('#ex-out');
    busy(true); $('#ex-verdict').innerHTML = '';
    try {
      if (ex.type === 'sql') {
        const r = await DJ.run.sql.run(code, ex.dataset);
        if (!out()) return;
        out().innerHTML = !r.ok ? `<pre style="color:var(--bad)">${esc(r.error)}</pre>` : r.results.length ? r.results.map(tableHtml).join('') : '<p style="margin:0">Сұрау орындалды.</p>';
      } else {
        const R = await runtime(ex);
        const r = await R.run(code, $('#stdin') ? $('#stdin').value : '');
        if (!out()) return;
        const err = r.error || r.stderr;
        out().innerHTML = (r.stdout ? `<pre>${esc(r.stdout)}</pre>` : '') + (err ? `<pre style="color:var(--bad)">${esc(err)}</pre>` : '') || '<p class="muted" style="margin:0">Ештеңе шығарылмады.</p>';
      }
    } catch (e) { if (out()) out().innerHTML = `<div class="verdict bad">${esc(msgOf(e))}</div>`; }
    finally { busy(false); }
  }
  async function doCheck(ex, id) {
    const code = X.cm.getValue(), v = () => $('#ex-verdict');
    busy(true); v().innerHTML = '<div class="verdict info">Тексерілуде…</div>';
    let r;
    try {
      r = ex.type === 'sql' ? await DJ.run.sql.check(ex, code) : await (await runtime(ex)).check(ex, code);
      if (r.shown && $('#ex-out')) $('#ex-out').innerHTML = tableHtml(r.shown);
      else if ($('#ex-out')) $('#ex-out').innerHTML = (r.stdout ? `<pre>${esc(r.stdout)}</pre>` : '') + (r.trace ? `<pre style="color:var(--bad)">${esc(r.trace)}</pre>` : '') || '<p class="muted" style="margin:0">Шығыс жоқ.</p>';
    } catch (e) { busy(false); if (v()) v().innerHTML = `<div class="verdict bad">${esc(msgOf(e))}</div>`; return; }
    try { await C().call('submit_answer', { aid: X.aid, ex: id, passed: !!r.pass, src: code }); }
    catch (e) { busy(false); if (v()) v().innerHTML = `<div class="verdict bad">${/time is up/i.test(msgOf(e)) ? 'Уақыт бітті: жауап қабылданбады.' : 'Жауап сақталмады. Интернетті тексеріп, қайта басыңыз.'}</div>`; if (/time is up/i.test(msgOf(e))) finish(true); return; }
    if (!X) return;
    X.codes[id] = code; if (r.pass) X.ok[id] = true;
    busy(false);
    if (v()) v().innerHTML = r.pass ? '<div class="verdict ok">Дұрыс! Жауап сақталды.</div>'
      : `<div class="verdict bad">Әзірге дұрыс емес. Жауап сақталды, түзетіп қайта тапсыруға болады.${X.exam ? '' : (r.msg ? ' ' + r.msg : '')}</div>`;
    const b = $(`[data-ti="${X.cur}"]`); if (b) b.classList.toggle('ok', !!X.ok[id]);
  }
  async function finish(timeUp) {
    if (!X || X.done) return;
    saveCur();
    if (!timeUp) {
      const left = X.tasks.filter(t => !X.ok[t]).length;
      if (!confirm(left ? `${left} тапсырма әлі шешілмеген. Аяқтайсыз ба? Кейін өзгерту мүмкін болмайды.` : 'Аяқтайсыз ба? Кейін өзгерту мүмкін болмайды.')) return;
    }
    X.done = true;
    const aid = X.aid, info = X.info;
    try { await C().call('finish_attempt', { aid }); } catch (e) {}
    track('exam_finish', { kind: info.kind, solved: X.tasks.filter(t => X.ok[t]).length });
    cleanup();
    const fs = $('#fs-back'); if (fs) fs.remove();
    if (timeUp) toast('Уақыт бітті', 'bolt');
    results(aid, info);
  }
  async function results(aid, info) {
    let row = info;
    try { row = ((await C().call('my_assignments')) || []).find(a => a.id === aid) || info; } catch (e) {}
    $('#app').innerHTML = `<div class="diag">${card(`<div class="eyebrow">${esc(row.class_name)}</div><h1 style="margin:6px 0 8px;font-size:1.6rem">${esc(row.title)}</h1>
      <p style="font-size:1.2rem;margin:0 0 8px">Нәтиже: <b>${row.solved} / ${row.n}</b></p>
      <p class="note" style="margin:0">Жауаптарыңыз мұғаліміңізге жіберілді.</p><div class="actions" style="margin-top:12px"><button class="btn" data-go="dash">Басты бетке</button></div>`)}</div>`;
  }

  // ================= learner: dashboard card =================
  function dashWire() {
    const slot = $('#asg-slot');
    if (!slot || !signedIn()) return;
    C().call('my_assignments').then(rows => {
      if (!slot.isConnected) return;
      const now = Date.now();
      const open = (rows || []).filter(a => !a.finished && (!a.due_at || Date.parse(a.due_at) > now)).slice(0, 5);
      if (!open.length) return;
      slot.innerHTML = `<section class="panel asg-card"><div class="panel-h"><h2>Сынып тапсырмалары</h2></div>
        ${open.map(a => { const soon = Date.parse(a.opens_at) > now; return `<div class="asg-item"><div><b>${esc(a.title)}</b> <span class="chip ${a.kind === 'exam' ? 'exam' : ''}">${a.kind === 'exam' ? 'Емтихан' : 'Үй жұмысы'}</span>
          <div class="note">${esc(a.class_name)} · ${a.n} тапсырма${a.minutes ? ` · ${a.minutes} мин` : ''}${soon ? ' · ашылады: ' + fmtDate(a.opens_at) : a.due_at ? ' · дедлайн: ' + fmtDate(a.due_at) : ''}${a.started_at ? ` · шешілді ${a.solved}/${a.n}` : ''}</div></div>
          <button class="btn sm" data-go="exam" data-aid="${esc(a.id)}">${a.started_at ? 'Жалғастыру' : 'Ашу'}</button></div>`; }).join('')}</section>`;
    }).catch(() => {});
  }

  return { teacherPanel, viewReport, viewExam, dashWire, leave() { stopWatch(); if (X && !X.done) logEv('blur', 0); cleanup(); } };
  };
})();
