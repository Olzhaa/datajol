// Screens that use the shared cloud data: owner dashboard (#admin), public portfolio (#u/<id>), teacher classes
// (#teach, #join/<code>), plus the dashboard cards for the daily challenge and the weekly league.
// app.js calls DJ.socialScreens(ui) once with its shared helpers; ui.route is a live getter.
(function () {
  DJ.socialScreens = function (ui) {
  const { $, $$, esc, S, ICON, go, toast, track, certsEarned } = ui;
  const C = () => DJ.cloud;
  const signedIn = () => !!(C() && C().user);
  const msgOf = e => (e && e.message) || String(e || '');
  const needSql = (e, file) => /function|schema cache|not find|does not exist/i.test(msgOf(e))
    ? ` Supabase-те <code>supabase/${file}</code> әлі іске қосылмаған сияқты.` : '';
  const card = html => `<div class="card">${html}</div>`;
  const pct = (a, b) => b ? Math.round(a / b * 100) : 0;

  // Lessons finished per course, from a lessons object { lessonId: date }.
  function courseProgress(lessons) {
    const out = [];
    for (const g of DJ.catalog || []) for (const c of g.courses) {
      let total = 0, done = 0;
      for (const id of c.mods) { const m = DJ.findModule(id); for (const l of (m && m.lessons) || []) { total++; if (lessons[l.id]) done++; } }
      if (total) out.push({ c, total, done });
    }
    return out;
  }

  // ---------- dashboard cards ----------
  function dailyCard() {
    const d = S.daily && S.daily();
    if (!d) return '';
    return `<div class="card daily-card ${d.done ? 'is-done' : ''}">
      <div class="eyebrow">${ICON.star} Күн есебі</div>
      <h3 style="margin:6px 0 4px">${esc(d.title)}</h3>
      <p class="note" style="margin:0 0 10px">${d.done ? `Бүгінгі есеп шешілді: +${S.DAILY_XP} XP. Ертең жаңасы шығады.`
        : d.review ? `Бұрын шешкен тапсырманы еске түсіріп, қайта шешіңіз: +${S.DAILY_XP} XP. Қайталау білімді бекітеді.`
        : `Бүгінгі тапсырманы шешіңіз: тапсырманың өз XP-сына қоса +${S.DAILY_XP} XP.`}</p>
      ${d.done ? '' : `<button class="btn" data-go="lesson" data-mod="${esc(d.mod)}" data-li="${d.li}" data-ei="${d.ei}">Шешу ${ICON.play}</button>`}
    </div>`;
  }
  function leagueCard() {
    const p = S.progress(), L = S.league(p);
    return `<div class="card league-card lg-${L.league.id}">
      <div class="eyebrow">${ICON.trophy} Апталық лига</div>
      <div class="league-row"><span class="league-gem" aria-hidden="true"></span><div><b>${esc(L.league.name)}</b><div class="note">Соңғы 7 күнде ${L.xp} XP</div></div></div>
      <p class="note" style="margin:8px 0 0">${L.next ? `${esc(L.next.name)} лигасына дейін ${L.need} XP.` : 'Ең жоғары лигадасыз. Осы деңгейді ұстап тұрыңыз!'}</p>
      ${signedIn() ? '<button class="linkbtn" data-go="board">Апталық рейтинг →</button>' : ''}
    </div>`;
  }

  // ---------- owner dashboard ----------
  function bars(rows, key, label) {
    const max = Math.max(1, ...rows.map(r => r[key] || 0));
    return `<div class="mini-bars" role="img" aria-label="${esc(label)}">${rows.map(r => `<span title="${esc(r.day)}: ${r[key] || 0}" style="height:${Math.max(2, Math.round((r[key] || 0) / max * 100))}%"></span>`).join('')}</div>`;
  }
  function viewAdmin() {
    $('#app').innerHTML = `<div class="diag admin"><div><div class="eyebrow">Иесіне</div><h1 style="margin:6px 0 0">Сайт статистикасы</h1></div>
      <div class="tabs" role="tablist">${[7, 30, 90].map(n => `<button role="tab" data-days="${n}" aria-selected="${(ui.route.mod || '30') == n}">${n} күн</button>`).join('')}</div>
      <div id="adm">${card('<p class="muted" style="margin:0">Жүктелуде…</p>')}</div></div>`;
    $$('[data-days]').forEach(b => b.onclick = () => { ui.route.mod = b.dataset.days; viewAdmin(); });
    if (!signedIn()) { $('#adm').innerHTML = card('<p style="margin:0">Бұл бет тек сайт иесіне арналған: алдымен аккаунтпен кіріңіз.</p>'); return; }
    C().call('admin_stats', { days: Number(ui.route.mod || 30) }).then(s => {
      if (ui.route.view !== 'admin') return;
      const f = s.funnel || {}, steps = [['Келушілер', f.visitors], ['Сабақ ашты', f.lesson_view], ['Тапсырма шешті', f.task_pass], ['Тіркелді', f.signup], ['Басқа күні қайта келді', f.returned]];
      const daily = s.daily || [], passed = s.passed || {};
      const lessonName = (mod, li) => { const m = DJ.findModule(mod), l = m && m.lessons && m.lessons[+li]; return l ? `${m.code} · ${l.title}` : `${mod} #${li}`; };
      const lessonId = (mod, li) => { const m = DJ.findModule(mod), l = m && m.lessons && m.lessons[+li]; return l ? l.id : ''; };
      $('#adm').innerHTML = `
        <div class="card"><h3>Воронка</h3><div class="funnel">${steps.map(([n, v]) => `<div class="fn-row"><span>${n}</span><i style="width:${pct(v || 0, f.visitors)}%"></i><b>${v || 0}</b><span class="note">${pct(v || 0, f.visitors)}%</span></div>`).join('')}</div>
          <p class="note" style="margin:8px 0 0">Бұлтта ${s.learners ? s.learners.total : 0} аккаунт, оның ${s.learners ? s.learners.active7 : 0}-і соңғы 7 күнде белсенді.</p></div>
        <div class="card"><h3>Күн сайын</h3><div class="adm-grid"><div><div class="note">Белсенді оқушылар</div>${bars(daily, 'active', 'Белсенді оқушылар')}</div><div><div class="note">Шешілген тапсырмалар</div>${bars(daily, 'tasks', 'Тапсырмалар')}</div><div><div class="note">Тіркелулер</div>${bars(daily, 'signups', 'Тіркелулер')}</div></div></div>
        <div class="card"><h3>Retention</h3>${(s.retention || []).length ? `<div class="tbl-wrap"><table class="tbl"><tr><th>Бірінші күн</th><th>Оқушылар</th><th>Келесі күні</th><th>7–13 күннен кейін</th></tr>${s.retention.map(r => `<tr><td>${esc(r.cohort)}</td><td>${r.learners}</td><td>${r.d1} (${pct(r.d1, r.learners)}%)</td><td>${r.d7} (${pct(r.d7, r.learners)}%)</td></tr>`).join('')}</table></div>` : '<p class="muted" style="margin:0">Әзірге дерек жоқ.</p>'}</div>
        <div class="card"><h3>Сабақтар: ашқандар мен шешкендер</h3><p class="note">Ашқандардың аз бөлігі ғана шешкен сабақтарды алдымен қараңыз: түсініксіз жер сол жерде болуы мүмкін.</p>${(s.lessons || []).length ? `<div class="tbl-wrap"><table class="tbl"><tr><th>Сабақ</th><th>Ашты</th><th>Шешті</th><th>%</th></tr>${s.lessons.map(l => { const n = passed[lessonId(l.mod, l.li)] || 0; const r = pct(n, l.opened); return `<tr class="${l.opened >= 5 && r < 40 ? 'warn' : ''}"><td>${esc(lessonName(l.mod, l.li))}</td><td>${l.opened}</td><td>${n}</td><td>${r}%</td></tr>`; }).join('')}</table></div>` : '<p class="muted" style="margin:0">Әзірге дерек жоқ.</p>'}</div>
        <div class="card"><h3>Пікірлер</h3>${(s.feedback || []).length ? s.feedback.map(x => `<div class="fb-item ${esc(x.status)}"><div class="note">${esc(String(x.created_at).slice(0, 16).replace('T', ' '))} · ${esc(x.kind)} · ${esc(x.page || '')}${x.contact ? ' · ' + esc(x.contact) : ''}</div><p style="margin:4px 0">${esc(x.message)}</p><div class="actions">${['seen', 'done'].map(st => `<button class="btn ghost sm" data-fb="${x.id}" data-st="${st}" ${x.status === st ? 'disabled' : ''}>${st === 'seen' ? 'Қаралды' : 'Түзетілді'}</button>`).join('')}</div></div>`).join('') : '<p class="muted" style="margin:0">Пікір жоқ.</p>'}</div>
        <div class="card"><h3>Браузердегі қателер</h3>${(s.errors || []).length ? `<div class="tbl-wrap"><table class="tbl"><tr><th>Қате</th><th>Қайда</th><th>Саны</th></tr>${s.errors.map(e => `<tr><td>${esc(e.message)}</td><td class="note">${esc((e.source || '') + (e.line ? ':' + e.line : ''))}</td><td>${e.n}</td></tr>`).join('')}</table></div>` : '<p class="muted" style="margin:0">Қате тіркелмеген.</p>'}</div>`;
      $$('[data-fb]').forEach(b => b.onclick = async () => {
        b.disabled = true;
        try { await C().call('admin_feedback_status', { fid: Number(b.dataset.fb), st: b.dataset.st }); b.closest('.fb-item').className = 'fb-item ' + b.dataset.st; toast('Сақталды', 'check'); }
        catch (e) { b.disabled = false; toast(esc(msgOf(e)), 'bolt'); }
      });
    }).catch(e => {
      if (ui.route.view !== 'admin') return;
      $('#adm').innerHTML = card(/admins only/i.test(msgOf(e)) ? '<p style="margin:0">Бұл бет тек сайт иесіне арналған.</p>'
        : `<p style="margin:0">Статистиканы жүктеу мүмкін болмады.${needSql(e, 'admin.sql')}</p>`);
    });
  }

  // ---------- public portfolio ----------
  function portfolio(d, uid) {
    const lv = S.level(d.xp), courses = courseProgress(d.lessons || {});
    const finished = courses.filter(x => x.done === x.total), going = courses.filter(x => x.done && x.done < x.total);
    const badges = S.BADGES.filter(b => (d.badges || {})[b.id]);
    const link = location.origin + location.pathname + '#u/' + uid;
    const certs = certsEarned({ lessons: d.lessons || {} });
    $('#app').innerHTML = `<div class="diag portfolio">
      <div class="card pf-head"><span class="avatar" style="width:64px;height:64px;font-size:1.6rem">${esc(d.name.slice(0, 1).toUpperCase())}</span>
        <div style="min-width:0"><div class="eyebrow">Tolqyn портфолиосы</div><h1 style="margin:4px 0">${esc(d.name)}</h1>
        <div class="muted">Деңгей ${lv.level} · ${esc(S.rank(lv.level))} · ${d.xp} XP · ең ұзақ streak ${d.best} күн</div></div></div>
      ${certs.length ? card(`<h3>Сертификаттар</h3><div style="display:grid;gap:8px">${certs.map(l => `<a class="btn ghost" href="#cert/${esc(uid)}/${esc(l.id)}">${esc(l.id)} · ${esc(l.name)}</a>`).join('')}</div>`) : ''}
      ${card(`<h3>Аяқталған курстар (${finished.length})</h3>${finished.length ? `<div class="pf-courses">${finished.map(x => `<span class="tag">${esc(x.c.title)}</span>`).join('')}</div>` : '<p class="muted" style="margin:0">Әзірге жоқ.</p>'}
        ${going.length ? `<h3 style="margin-top:14px">Оқып жатыр</h3><div style="display:grid;gap:8px">${going.map(x => `<div class="pf-row"><span>${esc(x.c.title)}</span><div class="lvl-bar"><i style="width:${pct(x.done, x.total)}%"></i></div><span class="note">${x.done}/${x.total}</span></div>`).join('')}</div>` : ''}`)}
      ${badges.length ? card(`<h3>Белгілер (${badges.length})</h3><div class="pf-badges">${badges.map(b => `<span class="tag" title="${esc(b.desc)}">${ICON[b.icon] || ''}${esc(b.name)}</span>`).join('')}</div>`) : ''}
      <div class="card"><h3>Бөлісу</h3><div class="actions"><button class="btn" id="pf-copy">Сілтемені көшіру</button><a class="btn ghost" target="_blank" rel="noopener" href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}">LinkedIn-де бөлісу</a></div></div>
    </div>`;
    $('#pf-copy').onclick = () => { navigator.clipboard && navigator.clipboard.writeText(link).then(() => toast('Сілтеме көшірілді', 'check'), () => {}); };
  }
  function viewPublic() {
    const uid = ui.route.uid;
    $('#app').innerHTML = `<div class="diag">${card('<p class="muted" style="margin:0">Жүктелуде…</p>')}</div>`;
    if (!C() || !C().enabled) { $('#app').innerHTML = `<div class="diag">${card('<p style="margin:0">Портфолио беттері тек сайттың өзінде ашылады.</p>')}</div>`; return; }
    DJ.loadAll().then(() => C().call('public_profile', { uid })).then(rows => {
      if (ui.route.view !== 'u') return;
      const d = (rows || [])[0];
      if (!d) { $('#app').innerHTML = `<div class="diag">${card('<p style="margin:0">Бұл портфолио жабық немесе табылмады.</p>')}</div>`; return; }
      portfolio(d, uid);
    }).catch(e => { $('#app').innerHTML = `<div class="diag">${card(`<p style="margin:0">Портфолионы жүктеу мүмкін болмады.${needSql(e, 'social.sql')}</p>`)}</div>`; });
  }

  // ---------- teacher classes ----------
  const csvCell = v => /[",\n;]/.test(String(v)) ? '"' + String(v).replace(/"/g, '""') + '"' : String(v);
  function viewTeach() {
    $('#app').innerHTML = `<div class="diag teach"><div><div class="eyebrow">Оқытушыға</div><h1 style="margin:6px 0 0">Менің сыныптарым</h1>
      <p class="muted" style="margin:6px 0 0">Сынып құрып, кодын оқушыларға беріңіз. Олар қосылған соң, әр оқушының XP-ын, белсенділігін және курстар бойынша прогресін көресіз.</p></div>
      <div id="teach-body">${card('<p class="muted" style="margin:0">Жүктелуде…</p>')}</div></div>`;
    if (!signedIn()) { $('#teach-body').innerHTML = card('<p style="margin:0">Сынып құру үшін аккаунтпен (email немесе Google) кіріңіз: оқушылардың прогресі бұлтта сақталады.</p><div class="actions" style="margin-top:10px"><button class="btn" data-go="auth">Кіру</button></div>'); return; }
    const draw = classes => {
      $('#teach-body').innerHTML = `
        <form class="card" id="new-class" style="display:flex;gap:8px;flex-wrap:wrap;align-items:end"><label class="field" style="flex:1;min-width:200px;margin:0">Жаңа сынып атауы<input name="cname" maxlength="60" placeholder="Мысалы: 10-В, Python үйірмесі"></label><button class="btn" type="submit">Сынып құру</button><div class="err" id="cls-err" role="alert" style="flex-basis:100%"></div></form>
        ${classes.length ? classes.map(c => `<div class="card cls" data-cid="${esc(c.id)}"><div class="cls-head"><div><h3 style="margin:0">${esc(c.name)}</h3><div class="note">${c.members} оқушы</div></div>
          <div class="cls-code"><span class="note">Қосылу коды</span><b>${esc(c.code)}</b></div></div>
          <div class="actions"><button class="btn" data-report="${esc(c.id)}">Есепті ашу</button><button class="btn ghost" data-link="${esc(c.code)}">Шақыру сілтемесін көшіру</button><button class="btn ghost" data-del="${esc(c.id)}" style="color:var(--bad)">Өшіру</button></div>
          <div class="cls-report" id="r-${esc(c.id)}"></div></div>`).join('') : card('<p class="muted" style="margin:0">Әзірге сынып жоқ.</p>')}`;
      $('#new-class').onsubmit = async e => {
        e.preventDefault(); const name = e.target.cname.value.trim();
        if (name.length < 2) { $('#cls-err').textContent = 'Сынып атауын жазыңыз.'; return; }
        try { await C().call('create_class', { cname: name }); track('class_create'); load(); } catch (er) { $('#cls-err').textContent = /too many/i.test(msgOf(er)) ? 'Ең көбі 20 сынып.' : 'Сынып құру мүмкін болмады.' + needSql(er, 'social.sql'); }
      };
      $$('[data-link]').forEach(b => b.onclick = () => { const l = location.origin + location.pathname + '#join/' + b.dataset.link; navigator.clipboard && navigator.clipboard.writeText(l).then(() => toast('Сілтеме көшірілді', 'check'), () => {}); });
      $$('[data-del]').forEach(b => b.onclick = async () => {
        if (!confirm('Сыныпты өшіресіз бе? Оқушылардың прогресі өшпейді, тек сынып жойылады.')) return;
        try { await C().call('delete_class', { cid: b.dataset.del }); load(); } catch (er) { toast('Өшіру мүмкін болмады', 'bolt'); }
      });
      $$('[data-report]').forEach(b => b.onclick = () => report(b.dataset.report, classes.find(c => c.id === b.dataset.report)));
    };
    const load = () => C().call('my_classes').then(rows => { if (ui.route.view === 'teach') draw(rows || []); })
      .catch(e => { $('#teach-body').innerHTML = card(`<p style="margin:0">Сыныптарды жүктеу мүмкін болмады.${needSql(e, 'social.sql')}</p>`); });
    load();
  }
  async function report(cid, cls) {
    const box = $('#r-' + cid); box.innerHTML = '<p class="muted">Жүктелуде…</p>';
    let rows;
    try { [rows] = await Promise.all([C().call('class_report', { cid }), DJ.loadAll()]); } catch (e) { box.innerHTML = `<p class="muted">Есепті жүктеу мүмкін болмады.</p>`; return; }
    rows = rows || [];
    if (!rows.length) { box.innerHTML = `<p class="muted" style="margin-top:10px">Әзірге ешкім қосылмаған. Оқушыларға <b>${esc(cls.code)}</b> кодын беріңіз: олар Профиль → Сыныптар бөліміне енгізеді.</p>`; return; }
    const courses = (DJ.catalog || []).flatMap(g => g.courses);
    const used = courses.filter(c => rows.some(r => courseProgress(r.lessons || {}).some(x => x.c.id === c.id && x.done)));
    const sel = box.dataset.course || (used[0] || courses[0]).id;
    const prog = r => courseProgress(r.lessons || {}).find(x => x.c.id === sel) || { done: 0, total: 0 };
    const ago = r => { if (!r.updated_at) return '—'; const d = Math.floor((Date.now() - Date.parse(r.updated_at)) / 864e5); return d <= 0 ? 'бүгін' : d + ' күн бұрын'; };
    box.innerHTML = `<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:end;margin-top:12px"><label class="field" style="margin:0">Курс<select id="c-${esc(cid)}">${courses.map(c => `<option value="${esc(c.id)}" ${c.id === sel ? 'selected' : ''}>${esc(c.title)}</option>`).join('')}</select></label><button class="btn ghost" id="csv-${esc(cid)}">CSV жүктеу</button></div>
      <div class="tbl-wrap"><table class="tbl"><tr><th>Оқушы</th><th>XP</th><th>Streak</th><th>Соңғы белсенділік</th><th>Сабақтар</th><th>Курс прогресі</th></tr>
      ${rows.map(r => { const x = prog(r); return `<tr><td>${esc(r.name)}</td><td>${r.xp}</td><td>${r.streak}</td><td>${ago(r)}</td><td>${Object.keys(r.lessons || {}).length}</td><td><div class="pf-row"><div class="lvl-bar"><i style="width:${pct(x.done, x.total)}%"></i></div><span class="note">${x.done}/${x.total}</span></div></td></tr>`; }).join('')}</table></div>`;
    $('#c-' + cid).onchange = e => { box.dataset.course = e.target.value; report(cid, cls); };
    $('#csv-' + cid).onclick = () => {
      const head = ['name', 'xp', 'streak', 'last_active', 'lessons', 'course', 'course_done', 'course_total'];
      const csv = [head].concat(rows.map(r => { const x = prog(r); return [r.name, r.xp, r.streak, r.updated_at || '', Object.keys(r.lessons || {}).length, sel, x.done, x.total]; }))
        .map(row => row.map(csvCell).join(',')).join('\n');
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }));
      a.download = `${cls.name.replace(/[^\p{L}\p{N}_-]+/gu, '_')}.csv`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    };
  }

  // #join/<code>: a learner opens the teacher's link.
  async function joinCode(code) {
    try { const r = await C().call('join_class', { ccode: code }); const c = (r || [])[0]; track('class_join'); toast(`«${esc(c ? c.name : code)}» сыныбына қосылдыңыз`, 'check'); return true; }
    catch (e) { toast(/not found/i.test(msgOf(e)) ? 'Мұндай кодпен сынып табылмады.' : 'Сыныпқа қосылу мүмкін болмады.', 'bolt'); return false; }
  }
  function viewJoin() {
    const code = ui.route.code;
    if (!signedIn()) { $('#app').innerHTML = `<div class="diag">${card(`<h3>Сыныпқа қосылу: ${esc(code)}</h3><p>Оқытушыңыз прогресіңізді көруі үшін аккаунтпен (email немесе Google) кіріңіз, сосын осы сілтемені қайта ашыңыз.</p><div class="actions"><button class="btn" data-go="auth">Кіру</button></div>`)}</div>`; return; }
    joinCode(code).then(() => go('profile'));
  }

  // Profile: public portfolio switch and the learner's classes.
  function profileCards(p) {
    if (!signedIn()) return '';
    const uid = C().user.id, on = !!(p.prefs || {}).publicProfile;
    return `<div class="card" style="display:grid;gap:10px"><h3>Портфолио</h3>
        <label style="display:flex;gap:8px;align-items:center"><input type="checkbox" id="pub-pf" ${on ? 'checked' : ''}> Жария портфолио беті (аты, XP, белгілер, аяқталған курстар; email көрінбейді)</label>
        ${on ? `<div class="actions"><button class="btn ghost" data-go="u" data-uid="${esc(uid)}">Портфолионы ашу</button></div>` : ''}</div>
      <div class="card" style="display:grid;gap:10px"><h3>Сыныптар</h3>
        <div id="my-cls" class="note">Жүктелуде…</div>
        <form id="join-cls" style="display:flex;gap:8px;flex-wrap:wrap;align-items:end"><label class="field" style="flex:1;min-width:160px;margin:0">Оқытушы берген код<input name="code" maxlength="6" autocapitalize="characters" placeholder="ABC234"></label><button class="btn" type="submit">Қосылу</button></form>
        <p class="note" style="margin:0">Сыныпқа қосылғанда оқытушы атыңызды, XP-ыңызды және сабақтар бойынша прогресіңізді көреді. Оқытушымысыз? <button class="linkbtn" data-go="teach">Сынып құру →</button></p></div>`;
  }
  function profileWire() {
    if (!signedIn()) return;
    const t = $('#pub-pf'); if (t) t.onchange = () => { S.setPref('publicProfile', t.checked); ui.render(); };
    const box = $('#my-cls');
    const load = () => C().call('my_memberships').then(rows => {
      if (!box.isConnected) return;
      box.innerHTML = rows && rows.length ? rows.map(c => `<div style="display:flex;gap:8px;align-items:center;justify-content:space-between"><span>${esc(c.name)}</span><button class="linkbtn" data-leave="${esc(c.id)}">Шығу</button></div>`).join('') : 'Сіз әлі ешбір сыныпта емессіз.';
      $$('[data-leave]', box).forEach(b => b.onclick = async () => { try { await C().call('leave_class', { cid: b.dataset.leave }); load(); } catch (e) {} });
    }).catch(e => { if (box.isConnected) box.innerHTML = 'Сыныптарды жүктеу мүмкін болмады.' + needSql(e, 'social.sql'); });
    load();
    $('#join-cls').onsubmit = async e => { e.preventDefault(); const code = e.target.code.value.trim().toUpperCase(); if (!/^[A-Z2-9]{6}$/.test(code)) { toast('Код 6 таңбадан тұрады', 'bolt'); return; } if (await joinCode(code)) { e.target.reset(); load(); } };
  }

  return { viewAdmin, viewPublic, viewTeach, viewJoin, dailyCard, leagueCard, profileCards, profileWire };
  };
})();
