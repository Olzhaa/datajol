// Lesson screen: reading, task panel, code editor, checking and module exams.
// app.js calls DJ.lessonScreen(ui) once, passing its shared helpers; ui.route and ui.noEditor are live getters.
(function () {
  DJ.lessonScreen = function (ui) {
  const { $, $$, esc, S, G, ICON, LEVELS, celebrate, fbFoot, go, kkOnly, loadEditor, render, toast, topbar, track } = ui;
  // Editor autosave: the pending write is bound to its own exercise and flushed before any navigation.
  let pendingSave = null;
  // Combo: tasks solved on the first try in a row during this visit (no hint, no wrong answer). Presentation and badges only.
  let combo = 0;
  function bumpCombo(clean, from) {
    combo = clean ? combo + 1 : 0;
    if (combo < 3) return;
    G.combo(from, combo);
    const b = combo === 5 ? S.give('combo-5') : combo === 10 ? S.give('combo-10') : null;
    if (b) setTimeout(() => { toast(`<b>Жаңа белгі!</b> ${esc(b.name)}`, b.icon, 'badge'); G.play('badge'); }, 900);
  }
  // Opens today's quest chest once all three quests are done.
  function maybeChest(from) {
    const r = S.claimChest && S.claimChest();
    if (!r) return;
    setTimeout(() => {
      G.play('badge'); G.confetti(from || document.body, 30);
      toast(`<b>Сандық ашылды!</b> Күндік квесттер орындалды: +${r.xp} XP`, 'chest', 'badge');
      celebrate(Object.assign({}, r, { xp: 0 }), from); topbar();
    }, 1200);
  }
  function flushSave() { if (pendingSave) { clearTimeout(pendingSave.t); pendingSave.fn(); pendingSave = null; } }
  // ---------- lesson ----------
  let cm = null;
  let L = null;
  // Practice mode (#practice/<mod>/<li>): the lesson's extra code tasks (lesson.practice, ids 'lesson#p0'...).
  let PR = false;
  function exId(lesson, i) { return lesson.id + (PR ? '#p' : '#') + i; }
  const exList = () => (PR ? L.lesson.practice : L.lesson.exercises) || [];
  // Tasks open one at a time: a task opens once the one before it is solved (module exams have their own rules).
  const isOpen = (lesson, i, p) => lesson.gate || i === 0 || !!p.done[exId(lesson, i - 1)];

  function viewLesson() {
    if ((DJ.modules[ui.route.mod] && DJ.modules[ui.route.mod].file) || (!window.CodeMirror && !ui.noEditor)) {
      const want = ui.route;
      $('#app').innerHTML = '<p class="muted" style="padding:40px 0" role="status">Сабақ жүктелуде…</p>';
      Promise.all([DJ.loadModule(ui.route.mod), loadEditor()]).then(() => { if (ui.route === want) render(); })
        .catch(() => { if (ui.route === want) { $('#app').innerHTML = '<div style="padding:40px 0" role="alert"><p class="muted">Сабақ жүктелмеді. Интернетті тексеріп, қайта көріңіз.</p><button class="btn" id="retry">Қайта көру</button></div>'; $('#retry').onclick = () => render(); } });
      return;
    }
    const mod = DJ.findModule(ui.route.mod);
    if (!mod || !mod.lessons || !mod.lessons[ui.route.li]) return go('dash');
    const lesson = mod.lessons[ui.route.li];
    const p = S.progress();
    PR = ui.route.view === 'practice';
    if (PR && !(lesson.practice || []).length) return go('lesson', { mod: mod.id, li: ui.route.li });
    const exs = (PR ? lesson.practice : lesson.exercises) || [];
    let ei = exs.findIndex((_, i) => !p.done[exId(lesson, i)]);
    if (ei < 0) ei = 0;
    if (ui.route.ei != null && exs[ui.route.ei] && isOpen(lesson, ui.route.ei, p)) ei = ui.route.ei;
    L = { mod, lesson, li: ui.route.li, ei, hints: {}, fails: {}, pr: PR };
    if (PR && !p.lessons[lesson.id] && !p.done[exId(lesson, 0)]) {
      $('#app').innerHTML = `<div class="crumbs"><button data-go="dash">Оқу</button><span>/</span><button data-go="module" data-mod="${mod.id}">${esc(mod.code)} ${esc(mod.title)}</button></div>
        <div class="diag"><div class="card"><div class="eyebrow">Практика · ${exs.length} есеп</div><h1 style="margin:6px 0 10px;font-size:1.5rem">${esc(lesson.title)}</h1>
        <p>${ICON.lock.replace('<svg', '<svg style="width:16px;height:16px;vertical-align:-2px"')} Практика сабақтың тапсырмалары орындалғаннан кейін ашылады.</p>
        <div class="actions"><button class="btn" data-go="lesson" data-mod="${mod.id}" data-li="${ui.route.li}">Сабаққа өту</button></div></div></div>`;
      return;
    }
    if (S.setPref && (S.progress().prefs || {}).last !== mod.id) S.setPref('last', mod.id);
    const prev = PR ? `<button class="btn ghost" data-go="lesson" data-mod="${mod.id}" data-li="${ui.route.li}">← Сабаққа</button>` : ui.route.li > 0 ? `<button class="btn ghost" data-go="lesson" data-mod="${mod.id}" data-li="${ui.route.li - 1}">← Алдыңғы</button>` : `<button class="btn ghost" data-go="module" data-mod="${mod.id}">← Модуль</button>`;
    $('#app').innerHTML = `
      <div class="crumbs"><button data-go="dash">Оқу</button><span>/</span><button data-go="module" data-mod="${mod.id}">${esc(mod.code)} ${esc(mod.title)}</button></div>
      <div class="lesson" id="lesson">
        <article class="reading">
          <div class="eyebrow">${PR ? `Практика · ${exs.length} есеп` : lesson.gate ? 'Модуль емтиханы' : `Сабақ ${ui.route.li + 1} / ${mod.lessons.length}`}${PR ? '' : ` · ${lesson.minutes || 10} мин`}</div>
          <h1>${esc(lesson.title)}</h1>${kkOnly(mod)}
          ${PR ? `<details class="theory"><summary>Теорияны қайталау</summary><div class="prose">${lesson.body || ''}</div></details>` : `<div class="prose">${lesson.body || ''}</div>`}
          <section class="task" id="task"></section>
          <div class="lesson-nav">${prev}<span id="next-slot"></span></div>
          ${DJ.cloud && DJ.cloud.enabled ? fbFoot('Осы сабақта түсініксіз жер немесе қате бар ма?') : ''}
        </article>
        <aside class="workbench" id="wb"></aside>
      </div>`;
    renderTask();
  }

  function lessonDone() { const p = S.progress(); return exList().every((_, i) => p.done[exId(L.lesson, i)]); }
  function nextSlot() {
    const slot = $('#next-slot'); if (!slot) return;
    const p = S.progress(), done = p.lessons[L.lesson.id];
    const hasNext = L.li + 1 < L.mod.lessons.length;
    const nextBtn = hasNext ? `<button class="btn" data-go="lesson" data-mod="${L.mod.id}" data-li="${L.li + 1}">Келесі сабақ →</button>` : `<button class="btn" data-go="module" data-mod="${L.mod.id}">Модульге оралу</button>`;
    if (PR) { slot.innerHTML = lessonDone() ? nextBtn : ''; return; }
    const np = (L.lesson.practice || []).length, pd = (L.lesson.practice || []).filter((_, i) => p.done[L.lesson.id + '#p' + i]).length;
    const prBtn = np ? `<button class="btn ${pd < np ? '' : 'ghost'}" data-go="practice" data-mod="${L.mod.id}" data-li="${L.li}">Практика ${pd}/${np}</button>` : '';
    if (done && np) { slot.innerHTML = prBtn + ' ' + nextBtn.replace('class="btn"', 'class="btn ghost"'); return; }
    if (!(L.lesson.exercises || []).length && !done) { slot.innerHTML = `<button class="btn" id="read-done">Оқыдым ${ICON.check.replace('<svg', '<svg style="width:16px;height:16px"')}</button>`; $('#read-done').onclick = () => { finishLesson(); }; return; }
    slot.innerHTML = done ? (hasNext ? `<button class="btn" data-go="lesson" data-mod="${L.mod.id}" data-li="${L.li + 1}">Келесі сабақ →</button>` : `<button class="btn" data-go="module" data-mod="${L.mod.id}">Модульге оралу</button>`) : '';
  }
  function finishLesson() {
    const nb = S.markLesson(L.lesson.id, L.mod.id);
    setTimeout(() => maybeChest(null), 2600);   // after the lesson dialog has opened
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
    const exs = exList();
    const task = $('#task'), wb = $('#wb'), lessonEl = $('#lesson');
    cm = null;
    if (!exs.length) { task.innerHTML = ''; wb.innerHTML = ''; lessonEl.classList.add('solo'); nextSlot(); return; }
    const p = S.progress();
    const G = L.lesson.gate ? gateState() : null;
    const ex = exs[L.ei], id = exId(L.lesson, L.ei), done = G ? !!G.res[L.ei] : !!p.done[id];
    const isCode = isCodeType(ex.type);
    lessonEl.classList.toggle('solo', !isCode);
    const stepCls = i => G ? (G.res[i] === 'ok' ? 'ok' : G.res[i] === 'fail' ? 'bad' : '') : (p.done[exId(L.lesson, i)] ? 'ok' : '');
    const open = i => isOpen(L.lesson, i, p);
    const stepState = i => ({ ok: ', орындалды', bad: ', есепке алынбады' })[stepCls(i)] || (open(i) ? '' : ', құлыпталған');
    const steps = exs.map((_, i) => `<button class="${i === L.ei ? 'cur' : ''} ${stepCls(i)} ${open(i) ? '' : 'locked'}" data-step="${i}" aria-label="Тапсырма ${i + 1}${stepState(i)}"${i === L.ei ? ' aria-current="step"' : ''}${open(i) ? '' : ' disabled'}>${open(i) ? i + 1 : ICON.lock}</button>`).join('');
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
      <h3 id="task-h">${PR && ex.title ? `${L.ei + 1}. ${esc(ex.title)}` : `Тапсырма ${L.ei + 1}${exs.length > 1 ? ' / ' + exs.length : ''}`} <span class="xp-tag">+${ex.xp || 10} XP</span>${ex.level && LEVELS[ex.level] ? ` <span class="lvl lvl-${ex.level}">${LEVELS[ex.level]}</span>` : ''}</h3>
      <div class="prose">${ex.prompt}</div>
      ${inner}
      <div class="hints" id="hints"></div>
      <div class="actions" style="margin-top:10px">${isCode || ex.type === 'sheet' || ex.type === 'cmd' ? hintsBtn : ''}<span id="sol-slot"></span></div>
      <div id="qv" style="margin-top:10px"></div>`;
    $$('[data-step]', task).forEach(b => b.onclick = () => { if (b.disabled) return; L.ei = Number(b.dataset.step); renderTask(); const h = $('#task h3'); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); } });
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
    if (pct === 100) { const b = S.give('exam-ace'); if (b) setTimeout(() => { toast(`<b>Жаңа белгі!</b> ${esc(b.name)}`, b.icon, 'badge'); G.play('badge'); }, 1500); }
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
    track('exercise_pass', { ex: id, type: kind, hint: usedHint, first: !!r.xp, guest: S.isGuest() });
    celebrate(r, $('#check') || $('#q-check'));
    if (r.daily) toast(`<b>Күн есебі шешілді!</b> +${r.daily} XP`, 'star', 'badge');
    if (r.xp) bumpCombo(!usedHint && !L.fails[id], $('#check') || $('#q-check'));
    topbar();
    const exs = exList();
    const p = S.progress();
    const nextI = exs.findIndex((_, i) => !p.done[exId(L.lesson, i)]);
    const PRAISE = ['Дұрыс!', 'Керемет!', 'Тамаша!', 'Жарайсыз!', 'Дәл таптыңыз!'];
    const msg = `<div class="verdict ok"><b>${PRAISE[Math.floor(Math.random() * PRAISE.length)]}</b>${r.xp ? ` <span class="xp-tag">+${r.xp} XP</span>` : ''}${explain ? ' ' + explain : ''}</div>`;
    const target = isCodeType(kind) ? $('#verdict') : $('#qv');
    const save = S.isGuest() && r.xp ? '<p class="guest-save">XP жинала бастады. Прогресс жоғалмасын десеңіз, <button type="button" class="linkbtn" data-go="auth">тіркеліңіз</button>: жиналғаны аккаунтқа көшеді.</p>' : '';
    target.innerHTML = msg + save + (nextI >= 0 ? `<div class="actions" style="margin-top:10px"><button class="btn" id="next-ex">Келесі тапсырма →</button></div>` : '');
    $$('[data-step]').forEach(b => { const i = Number(b.dataset.step); b.classList.toggle('ok', !!p.done[exId(L.lesson, i)]); if (b.disabled && isOpen(L.lesson, i, p)) { b.disabled = false; b.classList.remove('locked'); b.textContent = i + 1; b.setAttribute('aria-label', 'Тапсырма ' + (i + 1)); } });
    if (nextI >= 0) $('#next-ex').onclick = () => { L.ei = nextI; renderTask(); $('#task').scrollIntoView({ behavior: 'smooth', block: 'start' }); };
    if (PR) { if (nextI < 0) { nextSlot(); setTimeout(() => { G.play('lesson'); toast(`<b>Практика аяқталды!</b> ${esc(L.lesson.title)}: ${exs.length} есеп шешілді.`, 'trophy', 'badge'); }, 500); } maybeChest($('#check') || $('#q-check')); }
    else if (nextI < 0 && !p.lessons[L.lesson.id]) finishLesson();
    else maybeChest($('#check') || $('#q-check'));
  }

  return { viewLesson, flushSave, leave() { flushSave(); cm = null; }, current: () => L };
  };
})();
