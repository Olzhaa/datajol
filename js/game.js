// Game layer: the Үкі mascot, sounds, confetti, floating XP and reward dialogs.
// Everything here is presentation only; XP, streaks and badges are still counted by js/store.js.
(function () {
  const { lsGet, lsSet } = DJ.util;
  const calm = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- mascot: a 12x12 pixel owl (үкі) with a turquoise scarf ----------
  const OWL = [
    '.kk......kk.',
    '.kbk....kbk.',
    '.kbbkkkkbbk.',
    'kbbbbbbbbbbk',
    'kbwwwbbwwwbk',
    'kbwewbbwewbk',
    'kbwwwggwwwbk',
    'kbbbbggbbbbk',
    'kbttttttttbk',
    'kbbcbbbbcbbk',
    '.kbbbbbbbbk.',
    '..kgk..kgk..'
  ];
  const OWL_BLINK = OWL.map((r, i) => i === 5 ? 'kbkkkbbkkkbk' : r);
  const PAL = { k: '#1B1235', b: '#9A6A3A', w: '#FFF7E0', e: '#1B1235', g: '#FFC83D', t: '#47D1E8', c: '#E8C48E' };
  const sprite = rows => rows.map((r, y) => r.split('').map((ch, x) => PAL[ch] ? `<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${PAL[ch]}"/>` : '').join('')).join('');
  function owl(cls = '', label = '') {
    return `<svg class="owl ${cls}" viewBox="0 0 12 12" shape-rendering="crispEdges" ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"'}><g class="owl-open">${sprite(OWL)}</g><g class="owl-shut">${sprite(OWL_BLINK)}</g></svg>`;
  }

  // ---------- sound: short chiptune blips made with WebAudio (no files to download) ----------
  let ctx = null;
  const soundOn = () => lsGet('dj.sound') !== 'off';
  function tone(freq, start, dur, type = 'square', vol = 0.05) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, ctx.currentTime + start);
    g.gain.setValueAtTime(vol, ctx.currentTime + start);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur);
    o.connect(g).connect(ctx.destination);
    o.start(ctx.currentTime + start); o.stop(ctx.currentTime + start + dur + 0.02);
  }
  const TUNES = {
    ok: [[660, 0, .09], [880, .08, .09], [1320, .16, .16]],
    bad: [[220, 0, .12, 'triangle', .08], [165, .1, .18, 'triangle', .08]],
    lesson: [[523, 0, .1], [659, .1, .1], [784, .2, .1], [1047, .3, .25]],
    level: [[392, 0, .1], [523, .1, .1], [659, .2, .1], [784, .3, .1], [1047, .4, .12], [1319, .52, .3]],
    badge: [[988, 0, .08], [1319, .08, .2]]
  };
  function play(name) {
    if (!soundOn() || !TUNES[name]) return;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      TUNES[name].forEach(n => tone(...n));
    } catch (e) {}
  }
  function setSound(on) { lsSet('dj.sound', on ? 'on' : 'off'); if (on) play('badge'); }

  // ---------- confetti and floating XP ----------
  const COLORS = ['#FFC83D', '#47D1E8', '#FF6B81', '#58E08A', '#B79CFF'];
  function centerOf(el) {
    if (!el || !el.getBoundingClientRect) return { x: innerWidth / 2, y: innerHeight / 3 };
    const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }
  function confetti(from, n = 28) {
    if (calm()) return;
    const { x, y } = centerOf(from);
    const layer = document.createElement('div'); layer.className = 'fx-layer'; layer.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < n; i++) {
      const s = document.createElement('i');
      const a = Math.random() * Math.PI * 2, d = 60 + Math.random() * 120;
      s.style.cssText = `left:${x}px;top:${y}px;background:${COLORS[i % COLORS.length]};--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d - 40}px;--r:${Math.random() * 540 - 270}deg;animation-delay:${Math.random() * 60}ms`;
      layer.appendChild(s);
    }
    document.body.appendChild(layer);
    setTimeout(() => layer.remove(), 1200);
  }
  function floatXp(from, xp) {
    if (!xp || calm()) return;
    const { x, y } = centerOf(from);
    const el = document.createElement('div'); el.className = 'xp-float'; el.setAttribute('aria-hidden', 'true');
    el.textContent = `+${xp} XP`; el.style.left = x + 'px'; el.style.top = y + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1100);
  }
  // "COMBO ×n" in the HUD font, rising from the button that was pressed.
  function combo(from, n) {
    if (calm()) return;
    const { x, y } = centerOf(from);
    const el = document.createElement('div'); el.className = 'combo-float'; el.setAttribute('aria-hidden', 'true');
    el.textContent = `COMBO ×${n}`; el.style.left = x + 'px'; el.style.top = (y - 34) + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1300);
  }
  function shake(el) {
    if (!el || calm()) return;
    el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake');
    setTimeout(() => el.classList.remove('shake'), 450);
  }

  // ---------- reward dialog (lesson done, level up) ----------
  // actions: [{label, primary, onClick}]; the dialog closes after any action.
  function reward({ title, text, stats = [], actions = [], art = owl('owl-xl owl-hop') }) {
    const d = document.createElement('dialog');
    d.className = 'reward';
    d.innerHTML = `<div class="reward-in">
      <div class="reward-art">${art}<span class="rays" aria-hidden="true"></span></div>
      <h2>${title}</h2>${text ? `<p>${text}</p>` : ''}
      ${stats.length ? `<div class="reward-stats">${stats.map(s => `<div class="rs ${s.cls || ''}"><b>${s.v}</b><span>${s.l}</span></div>`).join('')}</div>` : ''}
      <div class="reward-actions">${(actions.length ? actions : [{ label: 'Жалғастыру', primary: true }]).map((a, i) => `<button class="btn ${a.primary ? '' : 'ghost'}" data-i="${i}">${a.label}</button>`).join('')}</div>
    </div>`;
    document.body.appendChild(d);
    const close = () => { if (d.open) d.close(); d.remove(); };
    d.querySelectorAll('[data-i]').forEach(b => b.onclick = () => { const a = actions[Number(b.dataset.i)]; close(); if (a && a.onClick) a.onClick(); });
    d.addEventListener('cancel', () => setTimeout(close, 0));
    d.addEventListener('click', e => { if (e.target === d) close(); });
    if (d.showModal) d.showModal(); else d.setAttribute('open', '');
    const first = d.querySelector('.btn:not(.ghost)') || d.querySelector('.btn'); if (first) first.focus();
    confetti(d.querySelector('.reward-art'), 40);
    return d;
  }

  window.DJ = window.DJ || {};
  DJ.game = { owl, play, soundOn, setSound, confetti, floatXp, combo, shake, reward, calm };
})();
