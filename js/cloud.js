// Optional cloud accounts: Google, email + password, or email-link sign-in via Supabase, with progress synced to public.progress.
// When DJ.config has no keys (or the host is not listed), DJ.cloud.enabled is false and the app stays local-only.
(function () {
  const cfg = DJ.config || {};
  const enabled = !!(cfg.supabaseUrl && cfg.supabaseAnonKey && (cfg.cloudHosts || []).includes(location.hostname));
  const LIB = 'vendor/supabase.js';   // @supabase/supabase-js 2.117.2 UMD build
  // Read before supabase-js cleans the URL.
  const q = new URLSearchParams((location.hash || '').replace(/^#/, '') + '&' + (location.search || '').replace(/^\?/, ''));
  const initialError = q.get('error_description') || q.get('error') || '';
  const recovery = q.get('type') === 'recovery';   // arrived from a password-reset email

  // XP log: entries with an exercise id are kept once per id. Older entries have no id, so the same one seen on
  // both sides is kept once (per day and amount, the larger count wins).
  function mergeLog(x, y) {
    const byId = {}, count = arr => arr.reduce((m, e) => {
      if (e.id) { if (!byId[e.id]) byId[e.id] = e; } else { const k = e.d + '|' + e.xp; m[k] = (m[k] || 0) + 1; }
      return m;
    }, {});
    const cx = count(x), cy = count(y), out = Object.values(byId);
    for (const k of new Set([...Object.keys(cx), ...Object.keys(cy)])) {
      const [d, xp] = k.split('|');
      for (let i = 0; i < Math.max(cx[k] || 0, cy[k] || 0); i++) out.push({ d, xp: Number(xp) });
    }
    return out.sort((a, b) => a.d < b.d ? -1 : a.d > b.d ? 1 : 0).slice(-300);
  }

  // Fields a progress reset clears: the side reset more recently wins them outright.
  const RESET = ['xp', 'done', 'lessons', 'badges', 'xpLog', 'gates', 'rubric', 'hinted', 'noHint', 'diag', 'days', 'streak', 'best', 'lastDay', 'code'];

  // Combines two progress objects so nothing earned on either device is lost.
  function merge(a, b) {
    if (!a) return b; if (!b) return a;
    const ra = a.resetAt || '', rb = b.resetAt || '';
    if (ra > rb) b = Object.assign({}, b, ...RESET.map(k => ({ [k]: a[k] })));
    else if (rb > ra) a = Object.assign({}, a, ...RESET.map(k => ({ [k]: b[k] })));
    const pick = (x, y) => (x || '') < (y || '') ? x || y : y || x;   // earliest date wins
    const out = Object.assign({}, a, b);
    if (ra || rb) out.resetAt = ra > rb ? ra : rb;
    // XP each side earned on tasks the other side has not seen, added on top of the other side's total.
    const extra = (x, y) => Object.keys(y.done || {}).filter(id => !(x.done || {})[id]).reduce((s, id) => s + (Number((y.done[id] || {}).xp) || 0), 0);
    out.xp = Math.max((a.xp || 0) + extra(a, b), (b.xp || 0) + extra(b, a));
    out.hinted = Object.assign({}, a.hinted || {}, b.hinted || {});
    for (const k of ['done', 'lessons', 'badges']) {
      out[k] = Object.assign({}, a[k] || {}, b[k] || {});
      for (const id of Object.keys(out[k])) if ((a[k] || {})[id] && (b[k] || {})[id] && typeof a[k][id] === 'string') out[k][id] = pick(a[k][id], b[k][id]);
    }
    out.code = Object.assign({}, a.code || {}, b.code || {});
    out.rubric = Object.assign({}, a.rubric || {}, b.rubric || {});
    out.gates = Object.assign({}, a.gates || {});
    for (const [id, g] of Object.entries(b.gates || {})) { const h = out.gates[id]; if (!h || (g.best || 0) > (h.best || 0)) out.gates[id] = g; }
    out.days = Array.from(new Set([...(a.days || []), ...(b.days || [])])).sort().slice(-60);
    const newer = (a.lastDay || '') >= (b.lastDay || '') ? a : b;
    out.lastDay = newer.lastDay; out.streak = newer.streak || 0;
    out.best = Math.max(a.best || 0, b.best || 0);
    out.noHint = Math.max(a.noHint || 0, b.noHint || 0);
    out.xpLog = mergeLog(a.xpLog || [], b.xpLog || []);
    out.prefs = Object.assign({}, a.prefs || {}, b.prefs || {});
    out.diag = ((a.diag || {}).date || '') >= ((b.diag || {}).date || '') ? a.diag : b.diag;
    return out;
  }

  // Same content, ignoring key order and empty or missing values (so a no-op merge does not count as a change).
  const canon = v => JSON.stringify(v, (k, x) => x === null || (typeof x === 'object' && !Array.isArray(x) && !Object.keys(x).length) || (Array.isArray(x) && !x.length) ? undefined
    : x && typeof x === 'object' && !Array.isArray(x) ? Object.keys(x).sort().reduce((o, j) => (o[j] = x[j], o), {}) : x);
  const changed = () => { try { window.dispatchEvent(new Event('dj:progress')); } catch (e) {} };   // the app re-renders

  const cloud = {
    enabled, client: null, user: null, ready: null, merge,
    // Resolves as soon as the session is known; the cloud progress is pulled in the background (see sync).
    load() {
      if (!enabled) return Promise.resolve(null);
      if (!this.ready) {
        let late = false;
        const start = new Promise((resolve, reject) => {
          const s = document.createElement('script'); s.src = LIB;
          s.onload = async () => {
            try {
              this.client = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, { auth: { persistSession: true, detectSessionInUrl: true } });
              const { data } = await this.client.auth.getSession();
              if (data && data.session) { this.adopt(data.session.user); this.sync(late); }
              resolve(this.user);
            } catch (e) { reject(e); }
          };
          s.onerror = () => reject(new Error('Supabase кітапханасы жүктелмеді'));
          document.head.appendChild(s);
        });
        // A slow network must not hold the app: after 6 s it starts in local mode, and a session found later still syncs in.
        const TIMEOUT = {}, wait = new Promise(res => setTimeout(() => { late = true; res(TIMEOUT); }, 6000));
        this.ready = Promise.race([start, wait]).then(r => {
          if (r !== TIMEOUT) return r;
          console.warn('Supabase did not answer in 6 s: starting in local mode'); return null;
        });
      }
      return this.ready;
    },
    // The client, or a readable error when the library never loaded.
    async need() { await this.load(); if (!this.client) throw new Error('Failed to fetch'); return this.client; },
    redirect() { return location.origin + location.pathname; },
    // Public auth settings: tells which sign-in providers are switched on in the Supabase project.
    async providers() {
      try {
        const r = await fetch(cfg.supabaseUrl + '/auth/v1/settings', { headers: { apikey: cfg.supabaseAnonKey } });
        const j = await r.json();
        return { google: !!(j.external && j.external.google), email: !!(j.external && j.external.email) };
      } catch (e) { return null; }
    },
    // An error Supabase sent back in the URL after a failed Google or email-link sign-in.
    returnError() { return initialError; },
    recovery,
    explain(msg) {
      const m = String(msg || '');
      if (/provider is not enabled|Unsupported provider/i.test(m)) return 'Google арқылы кіру әлі қосылмаған. Email сілтемесін немесе аккаунтсыз режимді қолданыңыз.';
      if (/Invalid login credentials/i.test(m)) return 'Email немесе пароль қате. Бұрын тек email сілтемесімен кірген болсаңыз, пароль әлі қойылмаған: «Парольді ұмыттым» арқылы пароль қойыңыз.';
      if (/Email not confirmed/i.test(m)) return 'Email әлі расталмаған. Тіркелгенде келген хаттағы сілтемені бір рет басыңыз.';
      if (/already registered|already been registered/i.test(m)) return 'Бұл email тіркелген. «Кіру» батырмасын басыңыз немесе парольді қалпына келтіріңіз.';
      if (/Password should|weak password|weak_password/i.test(m)) return 'Пароль тым әлсіз: кемінде 8 таңба, әріп пен сан араластырыңыз.';
      if (/should be different|same_password/i.test(m)) return 'Жаңа пароль бұрынғысынан өзгеше болсын.';
      if (/rate limit/i.test(m)) return 'Хат жіберу шегіне жеттік. Бір сағаттан кейін қайталаңыз немесе аккаунтсыз жалғастырыңыз.';
      if (/expired|invalid/i.test(m)) return 'Сілтеменің мерзімі өтіп кеткен немесе ол бұрын қолданылған. Жаңа сілтеме сұраңыз.';
      if (/not authorized|Email address .* is invalid/i.test(m)) return 'Бұл адреске хат жіберу мүмкін болмады. Басқа email-ді байқап көріңіз.';
      if (/Failed to fetch|NetworkError/i.test(m)) return 'Серверге қосыла алмадық. Интернетті тексеріңіз.';
      return m;
    },
    async google() { return (await this.need()).auth.signInWithOAuth({ provider: 'google', options: { redirectTo: this.redirect() } }); },
    async email(address) { return (await this.need()).auth.signInWithOtp({ email: address, options: { emailRedirectTo: this.redirect() } }); },
    // Email + password. Only sign-up sends a confirmation email (once); later sign-ins need no email at all.
    async password(address, pw) {
      const r = await (await this.need()).auth.signInWithPassword({ email: address, password: pw });
      if (!r.error && r.data && r.data.session) { this.adopt(r.data.session.user); this.sync(true); }
      return r;
    },
    async signUp(address, pw) {
      const r = await (await this.need()).auth.signUp({ email: address, password: pw, options: { emailRedirectTo: this.redirect() } });
      if (r.error) return r;
      // Supabase answers a sign-up for an existing email with a user that has no identities (and sends nothing).
      if (r.data && r.data.user && Array.isArray(r.data.user.identities) && !r.data.user.identities.length) return { error: { message: 'User already registered' } };
      if (r.data && r.data.session) { this.adopt(r.data.session.user); this.sync(true); }
      return r;
    },
    // Learner feedback goes to public.feedback (insert-only for learners; see supabase/feedback.sql).
    async feedback(row) { return (await this.need()).from('feedback').insert(row); },
    async resetPassword(address) { return (await this.need()).auth.resetPasswordForEmail(address, { redirectTo: this.redirect() }); },
    async setPassword(pw) { return (await this.need()).auth.updateUser({ password: pw }); },
    // Makes the Supabase user the current local account. The display name is never taken from the email.
    adopt(user) {
      this.user = user;
      const meta = user.user_metadata || {};
      const first = String(meta.full_name || meta.name || '').trim().split(/\s+/)[0];
      DJ.store.adoptCloudUser('u_' + user.id.replace(/-/g, '').slice(0, 20), (first || 'Оқушы').slice(0, 40), user.email);
    },
    pulled: 0,
    // Merges the cloud copy into this browser's progress. Returns { merged, name, changed }, or null when it failed.
    async pull() {
      const uid = this.user && this.user.id;
      const { data, error } = await this.client.from('progress').select('data, name').eq('user_id', uid).maybeSingle();
      if (error) { console.warn('progress pull failed', error); return null; }
      if (!this.user || this.user.id !== uid) return null;   // signed out meanwhile
      this.pulled = Date.now();
      const local = DJ.store.progress(), merged = merge(data ? data.data : null, local);
      const diff = canon(merged) !== canon(local);
      if (diff) DJ.store.save(merged, true);
      return { merged, name: data && data.name, changed: diff };
    },
    // Background sync after sign-in: pull, merge, push back, and tell the app when something changed.
    async sync(late) {
      try {
        const r = await this.pull();
        let renamed = false;
        if (r && r.name && r.name !== (this.user.email || '').split('@')[0] && r.name !== (DJ.store.profile() || {}).name) {
          DJ.store.rename(r.name); renamed = true;   // a name changed on another device wins
        }
        if (late || renamed || (r && r.changed)) changed();
        if (r) await this.push(DJ.store.progress());
      } catch (e) { console.warn('progress sync failed', e); }
    },
    timer: null, queued: null, failed: null,
    schedule(p) { if (!this.user) return; this.queued = p; clearTimeout(this.timer); this.timer = setTimeout(() => this.push(p), 1500); },
    async push(p) {
      if (!this.user) return;
      clearTimeout(this.timer); this.queued = null; this.failed = null;
      try {
        // Another tab or device may have saved since this tab last looked: merge that in before overwriting it.
        if (Date.now() - this.pulled > 60e3) {
          const r = await this.pull(); if (!r) throw new Error('pull before push failed');
          p = r.merged; if (r.changed) changed();
        }
        if (!this.user) return;
        const name = String((DJ.store.profile() || {}).name || '').slice(0, 40) || null;
        const { error } = await this.client.from('progress').upsert({ user_id: this.user.id, name, data: p, updated_at: new Date().toISOString() });
        if (error) throw error;
      } catch (e) { console.warn('progress push failed', e); this.failed = p; }   // retried on reconnect or when the tab is hidden
    },
    async leaderboard(period) {
      const { data, error } = await (await this.need()).rpc('leaderboard', { period, lim: 50 });
      if (error) throw error;
      return data || [];
    },
    async certInfo(uid) {
      const { data, error } = await (await this.need()).rpc('cert_info', { uid });
      if (error) throw error;
      return (data || [])[0] || null;
    },
    async signOut() { clearTimeout(this.timer); this.queued = this.failed = null; if (this.client) await this.client.auth.signOut(); this.user = null; }
  };
  // Sends a failed push again, or a pending one before the tab may be closed.
  const retry = () => { const p = cloud.queued || cloud.failed; if (p && cloud.user) cloud.push(p); };
  window.addEventListener('online', retry);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') retry(); });
  DJ.cloud = cloud;
})();
