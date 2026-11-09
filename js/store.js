// Accounts and progress, kept in this browser's storage. With cloud keys set (js/config.js), js/cloud.js signs
// learners in with Supabase and syncs this same progress object to the cloud.
(function () {
  // mem holds only values the browser refused to store (full or blocked), so they win over the older stored copy.
  const mem = {};
  let fullWarned = false;
  const ls = {
    get(k) { if (k in mem) return mem[k]; try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) {
      try { localStorage.setItem(k, v); delete mem[k]; } catch (e) {
        mem[k] = v;   // storage full or blocked: keep in memory for this visit and tell the app once
        if (!fullWarned) { fullWarned = true; try { window.dispatchEvent(new CustomEvent('dj:storage-full')); } catch (_) {} }
      }
    },
    del(k) { delete mem[k]; try { localStorage.removeItem(k); } catch (e) {} }
  };
  const read = (k, d) => { try { const v = ls.get(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } };
  const write = (k, v) => ls.set(k, JSON.stringify(v));

  async function hash(pw, salt) {
    const data = new TextEncoder().encode(salt + ':' + pw);
    if (window.crypto && crypto.subtle) {
      const buf = await crypto.subtle.digest('SHA-256', data);
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    let h = 0; for (const b of data) h = (h * 31 + b) | 0; return String(h);
  }
  const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
  const dayDiff = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 864e5);

  const XP_LEVELS = [0, 60, 150, 280, 450, 670, 950, 1300, 1720, 2220, 2800, 3500, 4300, 5200, 6200];

  const BADGES = [
    { id: 'first-run', name: 'Бірінші қадам', desc: 'Бірінші тапсырманы орындадыңыз', icon: 'spark' },
    { id: 'first-query', name: 'Бірінші SQL', desc: 'Бірінші SQL сұрауы тексерістен өтті', icon: 'db' },
    { id: 'first-python', name: 'Hello, Python', desc: 'Бірінші Python тапсырмасы', icon: 'code' },
    { id: 'join-master', name: 'JOIN шебері', desc: 'JOIN сабақтарын аяқтадыңыз', icon: 'link' },
    { id: 'module-done', name: 'Модуль бітті', desc: 'Бір модульдің барлық сабағы', icon: 'flag' },
    { id: 'streak-3', name: '3 күн қатарынан', desc: '3 күндік streak', icon: 'flame' },
    { id: 'streak-7', name: 'Апталық от', desc: '7 күндік streak', icon: 'flame' },
    { id: 'no-hints', name: 'Өз бетімен', desc: '10 тапсырманы кеңессіз орындадыңыз', icon: 'star' },
    { id: 'xp-500', name: '500 XP', desc: '500 XP жинадыңыз', icon: 'bolt' },
    { id: 'diagnostic', name: 'Өзін білген', desc: 'Диагностикалық тестті тапсырдыңыз', icon: 'compass' },
    { id: 'first-java', name: 'Hello, Java', desc: 'Бірінші Java тапсырмасы', icon: 'code' },
    { id: 'first-cpp', name: 'Hello, C++', desc: 'Бірінші C++ тапсырмасы', icon: 'code' },
    { id: 'combo-5', name: 'Комбо ×5', desc: '5 тапсырманы қатарынан бірінші әрекетте шештіңіз', icon: 'bolt' },
    { id: 'combo-10', name: 'Тоқтаусыз', desc: '10 тапсырманы қатарынан бірінші әрекетте шештіңіз', icon: 'bolt' },
    { id: 'chest-1', name: 'Бірінші сандық', desc: 'Бір күннің барлық квестін орындадыңыз', icon: 'chest' },
    { id: 'chest-7', name: 'Сандық аңшысы', desc: '7 күн квесттерді толық орындадыңыз', icon: 'chest' },
    { id: 'streak-30', name: 'Ай бойы', desc: '30 күндік streak', icon: 'flame' },
    { id: 'lessons-25', name: 'Тұрақты оқушы', desc: '25 сабақ аяқталды', icon: 'flag' },
    { id: 'lessons-100', name: 'Жүз сабақ', desc: '100 сабақ аяқталды', icon: 'flag' },
    { id: 'modules-5', name: 'Бес шың', desc: '5 модульді толық аяқтадыңыз', icon: 'flag' },
    { id: 'exam-ace', name: 'Мінсіз емтихан', desc: 'Модуль емтиханынан 100%', icon: 'star' },
    { id: 'xp-2000', name: '2000 XP', desc: '2000 XP жинадыңыз', icon: 'bolt' },
    { id: 'xp-5000', name: '5000 XP', desc: '5000 XP жинадыңыз', icon: 'bolt' },
    { id: 'daily-7', name: 'Күн сайын', desc: '7 күн есебін шештіңіз', icon: 'star' }
  ];
  const CHEST_XP = 20;
  const DAILY_XP = 15;
  const isTask = id => !id.startsWith('chest:') && !id.startsWith('daily:');   // p.done also holds the chest and daily-challenge bonuses
  // Weekly league by XP earned in the last 7 days (the same window as the weekly leaderboard).
  const LEAGUES = [{ id: 'bronze', name: 'Қола', min: 0 }, { id: 'silver', name: 'Күміс', min: 100 }, { id: 'gold', name: 'Алтын', min: 300 }, { id: 'diamond', name: 'Алмас', min: 700 }];
  const RUNNABLE = ['sql', 'python', 'java', 'cpp', 'sheet'];
  // Small stable hash, so the daily pick is the same all day on every device.
  const seed = str => { let h = 2166136261; for (const c of str) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };

  const store = {
    XP_LEVELS, BADGES, CHEST_XP, DAILY_XP, LEAGUES, isTask,
    users() { return read('dj.users', {}); },
    current() { const u = ls.get('dj.session'); return u && this.users()[u] ? u : null; },
    // Guest: try lessons before signing up. Progress lives under '~guest' (not a valid login) and moves to the
    // account made or signed in to next in this browser, merged with what that account already has here.
    GUEST: '~guest',
    isGuest() { return this.current() === this.GUEST; },
    guest() {
      const users = this.users();
      if (!users[this.GUEST]) { users[this.GUEST] = { name: 'Қонақ', guest: true, created: today() }; write('dj.users', users); }
      ls.set('dj.session', this.GUEST);
    },
    // Called with the account that is about to become current.
    takeGuest(username) {
      if (ls.get('dj.session') !== this.GUEST || username === this.GUEST) return;
      const g = ls.get('dj.p.' + this.GUEST);
      const mine = ls.get('dj.p.' + username);
      if (g && !mine) ls.set('dj.p.' + username, g);
      else if (g && DJ.cloud && DJ.cloud.merge) {   // both have progress: keep the union (same merge as two devices)
        try { ls.set('dj.p.' + username, JSON.stringify(DJ.cloud.merge(JSON.parse(mine), JSON.parse(g)))); } catch (e) {}
      }
      ls.del('dj.p.' + this.GUEST);
      const users = this.users(); delete users[this.GUEST]; write('dj.users', users);
    },
    async register(username, name, pw) {
      username = username.trim().toLowerCase();
      if (!/^[a-z0-9_.-]{3,24}$/.test(username)) return 'Логин 3–24 таңба: латын әріптері, сандар, _ . -';
      if (pw.length < 6) return 'Құпиясөз кемінде 6 таңба болсын.';
      const users = this.users();
      if (users[username]) return 'Бұл логин бос емес. Басқасын таңдаңыз немесе кіріңіз.';
      const salt = Math.random().toString(36).slice(2);
      users[username] = { name: name.trim() || username, salt, hash: await hash(pw, salt), created: today() };
      write('dj.users', users);
      this.takeGuest(username);
      ls.set('dj.session', username);
      return null;
    },
    async login(username, pw) {
      username = username.trim().toLowerCase();
      const u = this.users()[username];
      if (!u) return 'Мұндай логин табылмады. Алдымен тіркеліңіз.';
      if (u.hash !== await hash(pw, u.salt)) return 'Құпиясөз дұрыс емес.';
      this.takeGuest(username);
      ls.set('dj.session', username);
      return null;
    },
    logout() { ls.del('dj.session'); },
    // Forgets the current account and its progress in this browser.
    removeAccount() {
      const u = this.current(); if (!u) return;
      const users = this.users(); delete users[u]; write('dj.users', users);
      ls.del('dj.p.' + u); ls.del('dj.session');
    },
    profile() { const u = this.current(); return u ? Object.assign({ username: u }, this.users()[u]) : null; },

    key() { return 'dj.p.' + this.current(); },
    fresh() { return { xp: 0, done: {}, lessons: {}, days: [], streak: 0, best: 0, lastDay: null, badges: {}, noHint: 0, diag: null, code: {} }; },
    progress() { return read(this.key(), this.fresh()); },
    // local: write to this browser only (a cloud pull, or saved editor code), without pushing to the cloud.
    save(p, local) { write(this.key(), p); if (!local && DJ.cloud && DJ.cloud.user) DJ.cloud.schedule(p); },
    // Clears progress but keeps settings. resetAt makes the reset win over older copies on other devices.
    resetProgress() { const p = this.progress(); this.save(Object.assign(this.fresh(), { prefs: p.prefs || {}, resetAt: new Date().toISOString() })); },
    adoptCloudUser(username, name, email) {
      const users = this.users(), old = users[username];
      if (!old) users[username] = { name: name || username, email: email || '', cloud: true, created: today() };
      else if (email && old.name === email.split('@')[0]) old.name = name || username;   // older builds showed the email prefix
      write('dj.users', users);
      this.takeGuest(username);
      ls.set('dj.session', username);
    },
    // A title for each XP level band, shown with the level number.
    rank(lv) { return ['Жаңа бастаушы', 'Жаңа бастаушы', 'Шәкірт', 'Шәкірт', 'Ізденуші', 'Ізденуші', 'Практик', 'Практик', 'Шебер', 'Шебер', 'Сарапшы', 'Сарапшы', 'Ұстаз', 'Ұстаз', 'Аңыз'][Math.min(lv, 15) - 1] || 'Аңыз'; },
    level(xp) {
      let lv = 1; for (let i = 0; i < XP_LEVELS.length; i++) if (xp >= XP_LEVELS[i]) lv = i + 1;
      const cur = XP_LEVELS[lv - 1] || 0, next = XP_LEVELS[lv] || (cur + 1000);
      return { level: lv, cur, next, pct: Math.min(100, Math.round((xp - cur) / (next - cur) * 100)) };
    },
    touchDay(p) {
      const t = today();
      if (p.lastDay === t) return;
      if (p.lastDay && dayDiff(p.lastDay, t) === 1) p.streak += 1; else p.streak = 1;
      p.lastDay = t; p.best = Math.max(p.best, p.streak);
      if (!p.days.includes(t)) p.days.push(t);
      p.days = p.days.slice(-60);
    },
    streakNow(p) { if (!p.lastDay) return 0; return dayDiff(p.lastDay, today()) <= 1 ? p.streak : 0; },
    xpToday(p) { return (p.xpLog || []).filter(e => e.d === today()).reduce((s, e) => s + e.xp, 0); },
    // Records a passed exercise. Returns {xp, newBadges, levelUp}
    complete(exId, xp, usedHint, kind) {
      const p = this.progress();
      const fresh = !p.done[exId];
      usedHint = usedHint || !!(p.hinted || {})[exId];   // a hint opened before a reload still counts
      const gained = fresh ? (usedHint ? Math.ceil(xp / 2) : xp) : 0;
      const before = this.level(p.xp).level;
      if (fresh) {
        p.done[exId] = { d: today(), hint: !!usedHint, xp: gained };   // xp per task lets two devices' totals be merged
        p.xp += gained;
        p.xpLog = (p.xpLog || []).concat([{ d: today(), xp: gained, id: exId }]).slice(-300);
        if (!usedHint) p.noHint = (p.noHint || 0) + 1;
      }
      // Daily challenge: solving today's picked task (again, if it was solved before) gives a bonus once a day.
      let daily = 0;
      const dk = 'daily:' + today();
      if (p.dailyPick && p.dailyPick.d === today() && p.dailyPick.id === exId && !p.done[dk]) {
        daily = DAILY_XP;
        p.done[dk] = { d: today(), hint: false, xp: DAILY_XP };
        p.xp += DAILY_XP;
        p.xpLog = (p.xpLog || []).concat([{ d: today(), xp: DAILY_XP, id: dk }]).slice(-300);
      }
      this.touchDay(p);
      const newBadges = [];
      const give = id => { if (!p.badges[id]) { p.badges[id] = today(); newBadges.push(BADGES.find(b => b.id === id)); } };
      give('first-run');
      if (daily && Object.keys(p.done).filter(k => k.startsWith('daily:')).length >= 7) give('daily-7');
      if (kind === 'sql') give('first-query');
      if (kind === 'python') give('first-python');
      if (kind === 'java') give('first-java');
      if (kind === 'cpp') give('first-cpp');
      if (p.streak >= 30) give('streak-30');
      if (p.xp >= 2000) give('xp-2000');
      if (p.xp >= 5000) give('xp-5000');
      if (p.streak >= 3) give('streak-3');
      if (p.streak >= 7) give('streak-7');
      if (p.noHint >= 10) give('no-hints');
      if (p.xp >= 500) give('xp-500');
      this.save(p);
      return { xp: gained, daily, newBadges, levelUp: this.level(p.xp).level > before ? this.level(p.xp).level : null };
    },
    // Today's challenge: a task solved at least 3 days ago, to recall it (spaced practice); else the next new task.
    // Chosen once a day and kept in p.dailyPick so it does not change while the learner works. Returns
    // { mod, li, ei, id, review, title, done } or null when nothing is open yet.
    daily() {
      const p = this.progress(), t = today();
      const where = id => {   // 'sql-1#0' -> its module, lesson index and exercise (from the light index)
        const [lid, n] = id.split('#');
        for (const mid in DJ.modules) {
          const ls = DJ.modules[mid].lessons || [], li = ls.findIndex(l => l.id === lid);
          if (li >= 0) { const l = ls[li], e = (l.exercises || [])[+n]; return e && !l.gate ? { mod: mid, li, ei: +n, type: e.type, title: l.title } : null; }
        }
        return null;
      };
      let pick = p.dailyPick && p.dailyPick.d === t ? p.dailyPick : null;
      if (!pick) {
        const old = Object.keys(p.done).filter(id => isTask(id) && p.done[id] && p.done[id].d && dayDiff(p.done[id].d, t) >= 3)
          .map(id => [id, where(id)]).filter(([, w]) => w && RUNNABLE.includes(w.type));
        if (old.length) { const [id, w] = old[seed(t + (this.current() || '')) % old.length]; pick = { d: t, id, review: true, mod: w.mod, li: w.li, ei: w.ei }; }
        else {
          const nx = DJ.nextTask && DJ.nextTask(p);
          if (!nx) return null;
          pick = { d: t, id: nx.id, review: false, mod: nx.mod, li: nx.li, ei: nx.ei };
        }
        p.dailyPick = pick; write(this.key(), p);   // local only; it goes up with the next real save
      }
      const w = where(pick.id);
      return w ? Object.assign({}, pick, { title: w.title, done: !!p.done['daily:' + t] }) : null;
    },
    weekXp(p) {
      const from = new Date(Date.now() - 6 * 864e5), f = `${from.getFullYear()}-${String(from.getMonth() + 1).padStart(2, '0')}-${String(from.getDate()).padStart(2, '0')}`;
      return (p.xpLog || []).filter(e => e.d >= f && e.d <= today()).reduce((s, e) => s + (e.xp || 0), 0);
    },
    league(p) {
      const xp = this.weekXp(p);
      let i = 0; LEAGUES.forEach((L, j) => { if (xp >= L.min) i = j; });
      const next = LEAGUES[i + 1];
      return { league: LEAGUES[i], xp, next: next || null, need: next ? next.min - xp : 0 };
    },
    markLesson(lessonId, moduleId) {
      const p = this.progress();
      p.lessons[lessonId] = today();
      const newBadges = [];
      const mod = DJ.findModule(moduleId);
      if (mod && mod.lessons && mod.lessons.every(l => p.lessons[l.id])) {
        if (!p.badges['module-done']) { p.badges['module-done'] = today(); newBadges.push(BADGES.find(b => b.id === 'module-done')); }
      }
      if (['sql-10', 'sql-11'].every(id => p.lessons[id]) && !p.badges['join-master']) { p.badges['join-master'] = today(); newBadges.push(BADGES.find(b => b.id === 'join-master')); }
      const give = id => { if (!p.badges[id]) { p.badges[id] = today(); newBadges.push(BADGES.find(b => b.id === id)); } };
      const n = Object.keys(p.lessons).length;
      if (n >= 25) give('lessons-25');
      if (n >= 100) give('lessons-100');
      if (Object.keys(DJ.modules || {}).filter(id => { const m = DJ.findModule(id); return m && m.lessons && m.lessons.length && m.lessons.every(l => p.lessons[l.id]); }).length >= 5) give('modules-5');
      this.save(p);
      return newBadges;
    },
    // Gives one badge by id (combo, exam). Returns the badge if it is new, else null.
    give(id) { const p = this.progress(); if (p.badges[id]) return null; p.badges[id] = today(); this.save(p); return BADGES.find(b => b.id === id) || null; },
    // Today's three quests. When all are done the chest opens once a day for CHEST_XP (stored in p.done, so devices merge it).
    quests(p) {
      const t = today(), ids = Object.keys(p.done);
      const tasks = ids.filter(id => isTask(id) && p.done[id] && p.done[id].d === t).length;
      const xp = (p.xpLog || []).filter(e => e.d === t && isTask(e.id || '')).reduce((s, e) => s + e.xp, 0);
      const lessons = Object.values(p.lessons).filter(d => d === t).length;
      return [{ n: 'Бүгін 50 XP жина', v: xp, max: 50, icon: 'bolt' }, { n: '3 тапсырма орында', v: tasks, max: 3, icon: 'check' }, { n: '1 сабақты аяқта', v: lessons, max: 1, icon: 'flag' }];
    },
    chestOpened(p) { return !!p.done['chest:' + today()]; },
    // Opens today's chest if every quest is done and it is still shut. Returns {xp, newBadges, levelUp} or null.
    claimChest() {
      const p = this.progress(), id = 'chest:' + today();
      if (p.done[id] || !this.quests(p).every(q => q.v >= q.max)) return null;
      const before = this.level(p.xp).level;
      p.done[id] = { d: today(), hint: false, xp: CHEST_XP };
      p.xp += CHEST_XP;
      p.xpLog = (p.xpLog || []).concat([{ d: today(), xp: CHEST_XP, id }]).slice(-300);
      const newBadges = [], give = b => { if (!p.badges[b]) { p.badges[b] = today(); newBadges.push(BADGES.find(x => x.id === b)); } };
      give('chest-1');
      if (Object.keys(p.done).filter(k => !isTask(k)).length >= 7) give('chest-7');
      this.save(p);
      return { xp: CHEST_XP, newBadges, levelUp: this.level(p.xp).level > before ? this.level(p.xp).level : null };
    },
    gate(lessonId) { const p = this.progress(); const g = (p.gates || {})[lessonId]; return g ? JSON.parse(JSON.stringify(g)) : { attempt: 1, res: {}, tries: {}, best: 0 }; },
    setGate(lessonId, st) { const p = this.progress(); p.gates = p.gates || {}; p.gates[lessonId] = st; this.save(p); },
    setDiag(result) { const p = this.progress(); p.diag = result; if (!p.badges.diagnostic) p.badges.diagnostic = today(); this.save(p); },
    rename(name) {
      const u = this.current(); name = String(name || '').trim().slice(0, 40); if (!u || !name) return;
      const users = this.users(); users[u].name = name; write('dj.users', users);
      this.save(this.progress());   // pushes the new display name to the cloud
    },
    setPref(k, v) { const p = this.progress(); p.prefs = Object.assign({}, p.prefs, { [k]: v }); this.save(p); },
    saveRubric(exId, r) { const p = this.progress(); p.rubric = p.rubric || {}; p.rubric[exId] = r; this.save(p); },
    // Self-exam results (#selftest): the last 20, shown on that page.
    saveSelfTest(r) { const p = this.progress(); p.selfTests = (p.selfTests || []).concat([Object.assign({ d: today() }, r)]).slice(-20); this.save(p); },
    saveCode(exId, code) { const p = this.progress(); p.code = p.code || {}; p.code[exId] = code; this.save(p, true); },   // goes up with the next real save
    markHinted(exId) { const p = this.progress(); p.hinted = p.hinted || {}; if (p.hinted[exId]) return; p.hinted[exId] = true; this.save(p); },
    hinted(exId) { return !!(this.progress().hinted || {})[exId]; },
    moduleState(mod, p) {
      if (!mod.lessons) return { state: 'soon', pct: 0 };
      const n = mod.lessons.length, d = mod.lessons.filter(l => p.lessons[l.id]).length;
      return { state: d === n ? 'done' : 'open', pct: Math.round(d / n * 100), done: d, total: n };
    },
    careerLevel(p) {
      let lvl = DJ.careerLevels[0];
      for (const L of DJ.careerLevels.slice(1)) {
        const ok = L.needs.every(id => { const m = DJ.findModule(id); return m && m.lessons && m.lessons.every(l => p.lessons[l.id]); });
        if (ok) lvl = L; else break;
      }
      return lvl;
    },
    today
  };
  DJ.store = store;
})();
