/* Pattern Portal — UI enhancements
 * - Scroll progress bar under the header
 * - Keyboard shortcut overlay (press `?`)
 * Lightweight, no dependencies. Self-initializing on DOMContentLoaded.
 */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Scroll progress bar ── */
  function initScrollProgress() {
    if (document.getElementById('scrollProgress')) return;
    var bar = document.createElement('div');
    bar.id = 'scrollProgress';
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    var fill = document.createElement('div');
    fill.className = 'scroll-progress-fill';
    bar.appendChild(fill);
    document.body.appendChild(bar);

    var ticking = false;
    function update() {
      var doc = document.documentElement;
      var max = (doc.scrollHeight - doc.clientHeight) || 1;
      var pct = Math.min(100, Math.max(0, (window.scrollY / max) * 100));
      fill.style.width = pct + '%';
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

  /* ── Keyboard shortcut overlay ── */
  var SHORTCUTS = [
    { keys: ['?'],        desc: 'Show this keyboard shortcut overlay' },
    { keys: ['Ctrl', 'K'], desc: 'Open search (where available)' },
    { keys: ['/'],        desc: 'Focus search (where available)' },
    { keys: ['Esc'],      desc: 'Close overlay or search' },
    { keys: ['Tab'],      desc: 'Move focus forward' },
    { keys: ['Shift', 'Tab'], desc: 'Move focus backward' },
    { keys: ['Home'],     desc: 'Scroll to top of page' },
    { keys: ['End'],      desc: 'Scroll to bottom of page' }
  ];

  function buildShortcutOverlay() {
    var existing = document.getElementById('shortcutOverlay');
    if (existing) return existing;
    var overlay = document.createElement('div');
    overlay.id = 'shortcutOverlay';
    overlay.className = 'shortcut-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'shortcutOverlayTitle');
    overlay.hidden = true;

    var rows = SHORTCUTS.map(function (s) {
      var kbds = s.keys.map(function (k) { return '<kbd>' + k + '</kbd>'; }).join('<span class="shortcut-plus">+</span>');
      return '<li><span class="shortcut-keys">' + kbds + '</span><span class="shortcut-desc">' + s.desc + '</span></li>';
    }).join('');

    overlay.innerHTML =
      '<div class="shortcut-backdrop" data-close></div>' +
      '<div class="shortcut-panel">' +
        '<div class="shortcut-header">' +
          '<h2 id="shortcutOverlayTitle">Keyboard Shortcuts</h2>' +
          '<button type="button" class="shortcut-close" aria-label="Close" data-close>×</button>' +
        '</div>' +
        '<ul class="shortcut-list">' + rows + '</ul>' +
        '<div class="shortcut-foot">Press <kbd>?</kbd> any time to toggle this overlay.</div>' +
      '</div>';

    document.body.appendChild(overlay);

    overlay.addEventListener('click', function (e) {
      if (e.target && e.target.matches('[data-close]')) closeOverlay();
    });
    return overlay;
  }

  var lastFocused = null;
  function openOverlay() {
    var ov = buildShortcutOverlay();
    if (!ov.hidden) return;
    lastFocused = document.activeElement;
    ov.hidden = false;
    requestAnimationFrame(function () { ov.classList.add('is-open'); });
    var btn = ov.querySelector('.shortcut-close');
    if (btn) btn.focus();
  }
  function closeOverlay() {
    var ov = document.getElementById('shortcutOverlay');
    if (!ov || ov.hidden) return;
    ov.classList.remove('is-open');
    var hide = function () { ov.hidden = true; };
    if (reduced) hide(); else setTimeout(hide, 200);
    if (lastFocused && typeof lastFocused.focus === 'function') {
      try { lastFocused.focus(); } catch (e) {}
    }
  }
  function toggleOverlay() {
    var ov = document.getElementById('shortcutOverlay');
    if (ov && !ov.hidden) closeOverlay(); else openOverlay();
  }

  function isTypingTarget(el) {
    if (!el) return false;
    if (el.isContentEditable) return true;
    var tag = el.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
  }

  function onKey(e) {
    if (isTypingTarget(e.target)) return;
    // `?` = Shift + /
    if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
      e.preventDefault();
      toggleOverlay();
      return;
    }
    if (e.key === 'Escape') {
      var ov = document.getElementById('shortcutOverlay');
      if (ov && !ov.hidden) { e.preventDefault(); closeOverlay(); }
    }
  }

  function init() {
    initScrollProgress();
    document.addEventListener('keydown', onKey);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
