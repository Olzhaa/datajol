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
    { id: 'diagnostic', name: 'Өзін білген', desc: 'Диагностикалық тестті тапсырдыңыз', icon: 'compass' }
  ];

  const store = {
    XP_LEVELS, BADGES,
    users() { return read('dj.users', {}); },
    current() { const u = ls.get('dj.session'); return u && this.users()[u] ? u : null; },
    async register(username, name, pw) {
      username = username.trim().toLowerCase();
      if (!/^[a-z0-9_.-]{3,24}$/.test(username)) return 'Логин 3–24 таңба: латын әріптері, сандар, _ . -';
      if (pw.length < 6) return 'Құпиясөз кемінде 6 таңба болсын.';
      const users = this.users();
      if (users[username]) return 'Бұл логин бос емес. Басқасын таңдаңыз немесе кіріңіз.';
      const salt = Math.random().toString(36).slice(2);
      users[username] = { name: name.trim() || username, salt, hash: await hash(pw, salt), created: today() };
      write('dj.users', users);
      ls.set('dj.session', username);
      return null;
    },
    async login(username, pw) {
      username = username.trim().toLowerCase();
      const u = this.users()[username];
      if (!u) return 'Мұндай логин табылмады. Алдымен тіркеліңіз.';
      if (u.hash !== await hash(pw, u.salt)) return 'Құпиясөз дұрыс емес.';
      ls.set('dj.session', username);
      return null;
    },
    logout() { ls.del('dj.session'); },
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
      ls.set('dj.session', username);
    },
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
      this.touchDay(p);
      const newBadges = [];
      const give = id => { if (!p.badges[id]) { p.badges[id] = today(); newBadges.push(BADGES.find(b => b.id === id)); } };
      give('first-run');
      if (kind === 'sql') give('first-query');
      if (kind === 'python') give('first-python');
      if (p.streak >= 3) give('streak-3');
      if (p.streak >= 7) give('streak-7');
      if (p.noHint >= 10) give('no-hints');
      if (p.xp >= 500) give('xp-500');
      this.save(p);
      return { xp: gained, newBadges, levelUp: this.level(p.xp).level > before ? this.level(p.xp).level : null };
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
      this.save(p);
      return newBadges;
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
