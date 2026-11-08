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
// content/practice/<course>.js: extra code tasks after each lesson, kept in lesson.practice (ids 'lesson#p0', 'lesson#p1', ...).
DJ.addPractice = (mid, map) => { const m = DJ.modules && DJ.modules[mid]; ((m && m.lessons) || []).forEach(l => { if (map[l.id]) l.practice = map[l.id]; }); };
