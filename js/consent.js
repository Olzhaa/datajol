// Consent for site statistics (DJ.cloud.track) and the site footer with the legal links.
// Tolqyn sets no cookies; the only optional processing is the product statistics sent to our own Supabase tables.
// Nothing optional is sent until the visitor says yes; "Only necessary" is just as easy as "Allow". The choice is
// kept in localStorage for 12 months (legal/src/cookies.*.html lists every storage key the site uses).
(function () {
  const { $, esc, lsGet, lsSet } = DJ.util;
  const KEY = 'dj.consent', YEAR = 365 * 864e5, VERSION = 1;
  const lang = () => (DJ.i18n && DJ.i18n.lang) || 'kk';
  // legal/<doc>.html is Kazakh; ru and en have their own files.
  const legalHref = doc => 'legal/' + doc + (lang() === 'kk' ? '' : '.' + lang()) + '.html';

  function read() {
    try {
      const c = JSON.parse(lsGet(KEY) || 'null');
      if (!c || c.v !== VERSION || !c.at || Date.now() - Date.parse(c.at) > YEAR) return null;
      return c;
    } catch (e) { return null; }
  }
  const consent = {
    legalHref,
    terms: '2026-11-08',   // version of the terms and privacy policy a sign-up accepts: keep equal to "updated" in legal/src/site.json
    decided: () => !!read(),
    stats: () => { const c = read(); return !!(c && c.stats); },
    set(stats) {
      lsSet(KEY, JSON.stringify({ v: VERSION, stats: !!stats, at: new Date().toISOString() }));
      hide();
      try { window.dispatchEvent(new CustomEvent('dj:consent', { detail: { stats: !!stats } })); } catch (e) {}
    },
    // Statistics only exist when cloud accounts are on (the GitHub Pages site); elsewhere there is nothing to ask.
    needed: () => !!(DJ.cloud && DJ.cloud.enabled),
    show(focus) {
      hide();
      const c = read();
      const el = document.createElement('section');
      el.className = 'consent'; el.id = 'consent';
      el.setAttribute('aria-labelledby', 'consent-h');
      el.innerHTML = `<h2 id="consent-h">Сайтты жақсартуға көмектесесіз бе?</h2>
        <p>Tolqyn cookie қолданбайды. Рұқсат берсеңіз, қай экранды ашқаныңыз бен қай тапсырманы орындағаныңыз туралы статистика Tolqyn-ның өз дерекқорына жіберіледі. Бөтен трекер мен жарнама жоқ. Бас тартсаңыз, сайт толық жұмыс істей береді.</p>
        <p class="note"><a href="${esc(legalHref('cookies'))}">Cookie және браузер жады</a> · <a href="${esc(legalHref('privacy'))}">Құпиялық саясаты</a>${c ? ` · Қазіргі таңдау: ${c.stats ? 'рұқсат етілген' : 'тек қажеттісі'}` : ''}</p>
        <div class="actions"><button type="button" class="btn" data-consent="1">Рұқсат етемін</button><button type="button" class="btn" data-consent="0">Тек қажеттісі</button></div>`;
      document.body.appendChild(el);
      el.querySelectorAll('[data-consent]').forEach(b => b.onclick = () => consent.set(b.dataset.consent === '1'));
      if (focus) el.querySelector('[data-consent]').focus();
    }
  };
  function hide() { const el = $('#consent'); if (el) el.remove(); }

  // Footer: links follow the interface language; "Cookie settings" reopens the banner.
  function footer() {
    const f = $('#site-foot');
    if (!f) return;
    f.querySelectorAll('a[data-legal]').forEach(a => { a.href = legalHref(a.dataset.legal); });
    const b = $('#consent-open');
    if (b) { b.hidden = !consent.needed(); b.onclick = () => consent.show(true); }
  }
  DJ.consent = consent;
  // After the other scripts have run (DJ.cloud and DJ.i18n exist by then).
  const start = () => { footer(); if (consent.needed() && !read()) consent.show(false); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else setTimeout(start, 0);
})();
