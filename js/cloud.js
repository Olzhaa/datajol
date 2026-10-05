// Optional cloud accounts: Google or email-link sign-in via Supabase, with progress synced to public.progress.
// When DJ.config has no keys (or the host is not listed), DJ.cloud.enabled is false and the app stays local-only.
(function () {
  const cfg = DJ.config || {};
  const enabled = !!(cfg.supabaseUrl && cfg.supabaseAnonKey && (cfg.cloudHosts || []).includes(location.hostname));
  const LIB = 'vendor/supabase.js';
  // Read before supabase-js cleans the URL.
  const q = new URLSearchParams((location.hash || '').replace(/^#/, '') + '&' + (location.search || '').replace(/^\?/, ''));
  const initialError = q.get('error_description') || q.get('error') || '';   // @supabase/supabase-js 2.117.2 UMD build

  // XP log entries have no ids, so the same entry seen on both sides is kept once (per day and amount, the larger count wins).
  function mergeLog(x, y) {
    const count = arr => arr.reduce((m, e) => { const k = e.d + '|' + e.xp; m[k] = (m[k] || 0) + 1; return m; }, {});
    const cx = count(x), cy = count(y), out = [];
    for (const k of new Set([...Object.keys(cx), ...Object.keys(cy)])) {
      const [d, xp] = k.split('|');
      for (let i = 0; i < Math.max(cx[k] || 0, cy[k] || 0); i++) out.push({ d, xp: Number(xp) });
    }
    return out.sort((a, b) => a.d < b.d ? -1 : a.d > b.d ? 1 : 0).slice(-300);
  }

  // Combines two progress objects so nothing earned on either device is lost.
  function merge(a, b) {
    if (!a) return b; if (!b) return a;
    const pick = (x, y) => (x || '') < (y || '') ? x || y : y || x;   // earliest date wins
    const out = Object.assign({}, a, b);
    out.xp = Math.max(a.xp || 0, b.xp || 0);
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

  const cloud = {
    enabled, client: null, user: null, ready: null, merge,
    load() {
      if (!enabled) return Promise.resolve(null);
      if (!this.ready) this.ready = new Promise((resolve, reject) => {
        const s = document.createElement('script'); s.src = LIB;
        s.onload = async () => {
          try {
            this.client = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, { auth: { persistSession: true, detectSessionInUrl: true } });
            const { data } = await this.client.auth.getSession();
            if (data && data.session) await this.adopt(data.session.user);
            resolve(this.user);
          } catch (e) { reject(e); }
        };
        s.onerror = () => reject(new Error('Supabase кітапханасы жүктелмеді'));
        document.head.appendChild(s);
      });
      return this.ready;
    },
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
    explain(msg) {
      const m = String(msg || '');
      if (/provider is not enabled|Unsupported provider/i.test(m)) return 'Google арқылы кіру әлі қосылмаған. Email сілтемесін немесе аккаунтсыз режимді қолданыңыз.';
      if (/rate limit/i.test(m)) return 'Хат жіберу шегіне жеттік. Бір сағаттан кейін қайталаңыз немесе аккаунтсыз жалғастырыңыз.';
      if (/expired|invalid/i.test(m)) return 'Сілтеменің мерзімі өтіп кеткен немесе ол бұрын қолданылған. Жаңа сілтеме сұраңыз.';
      if (/not authorized|Email address .* is invalid/i.test(m)) return 'Бұл адреске хат жіберу мүмкін болмады. Басқа email-ді байқап көріңіз.';
      if (/Failed to fetch|NetworkError/i.test(m)) return 'Серверге қосыла алмадық. Интернетті тексеріңіз.';
      return m;
    },
    async google() { await this.load(); return this.client.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: this.redirect() } }); },
    async email(address) { await this.load(); return this.client.auth.signInWithOtp({ email: address, options: { emailRedirectTo: this.redirect() } }); },
    // Makes the Supabase user the current local account, then pulls and merges their cloud progress.
    async adopt(user) {
      this.user = user;
      const meta = user.user_metadata || {};
      const name = meta.full_name || meta.name || (user.email || '').split('@')[0];
      DJ.store.adoptCloudUser('u_' + user.id.replace(/-/g, '').slice(0, 20), name, user.email);
      const { data, error } = await this.client.from('progress').select('data, name').eq('user_id', user.id).maybeSingle();
      if (error) { console.warn('progress pull failed', error); return; }
      const local = DJ.store.progress();
      const merged = merge(data ? data.data : null, local);
      DJ.store.save(merged, true);
      if (data && data.name) DJ.store.rename(data.name);   // a name changed on another device wins
      await this.push(merged);
    },
    timer: null,
    schedule(p) { if (!this.user) return; clearTimeout(this.timer); this.timer = setTimeout(() => this.push(p), 1500); },
    async push(p) {
      if (!this.user) return;
      const { error } = await this.client.from('progress').upsert({ user_id: this.user.id, name: (DJ.store.profile() || {}).name || null, data: p, updated_at: new Date().toISOString() });
      if (error) console.warn('progress push failed', error);
    },
    async leaderboard(period) {
      await this.load();
      const { data, error } = await this.client.rpc('leaderboard', { period, lim: 50 });
      if (error) throw error;
      return data || [];
    },
    async certInfo(uid) {
      await this.load();
      const { data, error } = await this.client.rpc('cert_info', { uid });
      if (error) throw error;
      return (data || [])[0] || null;
    },
    async signOut() { if (this.client) await this.client.auth.signOut(); this.user = null; }
  };
  DJ.cloud = cloud;
})();
