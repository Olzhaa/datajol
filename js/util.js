// Small helpers shared by the UI scripts (app.js, lesson.js, game.js).
window.DJ = window.DJ || {};
DJ.util = {
  $: (s, r = document) => r.querySelector(s),
  $$: (s, r = document) => Array.from(r.querySelectorAll(s)),
  esc: s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])),
  // localStorage throws in some private modes and when full; reads then return null and writes are skipped.
  lsGet: k => { try { return localStorage.getItem(k); } catch (e) { return null; } },
  lsSet: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} },
};
