/* Pattern Portal — UI enhancements
 * - Scroll progress bar under the header
 * - Keyboard shortcut overlay (press `?`)
 * - Command palette (press Ctrl/Cmd+K or `/`)
 * - Back-to-top button + first-visit feature discovery toast
 * - Auto heading anchors with click-to-copy deep links
 * - Floating on-page outline with active-section highlighting
 * - Automatic copy buttons on code blocks
 * - Reading-time badges injected into topic headers
 * - Share-link button on topic headers (copies canonical deep link)
 * - Flash highlight on heading navigated to via deep link
 * - External-link decoration (↗ icon + rel="noopener noreferrer")
 * - Command palette also indexes on-page headings for deep-link jumps
 * - Theme-color meta tags kept in sync with manual dark/light toggle
 * - Theme-toggle fallback: defines window.toggleTheme + auto-wires .theme-toggle
 *   buttons on pages that don't ship their own implementation
 * Lightweight, no dependencies. Self-initializing on DOMContentLoaded.
 */
(function () {
  'use strict';

  // Live-evaluated so OS preference changes are honored mid-session.
  var _rmq = window.matchMedia('(prefers-reduced-motion: reduce)');
  function isReduced() { return _rmq.matches; }
  // Backward-compatible alias for the rest of the file.
  Object.defineProperty(window, '__pp_reduced', { get: isReduced });
  var reduced = isReduced();
  if (_rmq.addEventListener) _rmq.addEventListener('change', function (e) { reduced = e.matches; });
  else if (_rmq.addListener) _rmq.addListener(function (e) { reduced = e.matches; });

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
    if (isTypingTarget(e.target)) {
      // Allow Escape inside the palette input
      if (e.key === 'Escape' && e.target.id === 'cmdkInput') {
        e.preventDefault(); closePalette();
      }
      return;
    }
    // `?` = Shift + /
    if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
      e.preventDefault();
      toggleOverlay();
      return;
    }
    // `/` opens palette (without Shift)
    if (e.key === '/' && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      openPalette();
      return;
    }
    // Ctrl/Cmd + K opens palette
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      openPalette();
      return;
    }
    if (e.key === 'Escape') {
      var ov = document.getElementById('shortcutOverlay');
      if (ov && !ov.hidden) { e.preventDefault(); closeOverlay(); return; }
      var p = document.getElementById('cmdkPalette');
      if (p && !p.hidden) { e.preventDefault(); closePalette(); }
    }
  }

  /* ── Command palette ── */
  // Compute a base prefix so absolute /paths work whether served from root or a subdir.
  // We use absolute paths (leading /) which work on Vercel and python http.server.
  var PAGES = [
    // Topics
    { t: 'Statistics',                cat: 'Topic',   path: '/stats/',              kw: 'probability bayes distribution inference hypothesis' },
    { t: 'ML Math',                   cat: 'Topic',   path: '/ml-math/',            kw: 'linear algebra calculus gradient matrix vector' },
    { t: 'Machine Learning',          cat: 'Topic',   path: '/ml/',                 kw: 'regression classification clustering supervised' },
    { t: 'LLMs',                      cat: 'Topic',   path: '/llm/',                kw: 'language model transformer attention prompt' },
    { t: 'MLOps',                     cat: 'Topic',   path: '/mlops/',              kw: 'deployment pipeline ci cd monitoring drift' },
    { t: 'Time Series',               cat: 'Topic',   path: '/timeseries/',         kw: 'forecasting arima trend seasonality' },
    { t: 'Markets',                   cat: 'Topic',   path: '/markets/',            kw: 'finance trading stocks indicators' },
    { t: 'Cases',                     cat: 'Topic',   path: '/cases/',              kw: 'real world projects fraud housing energy' },
    { t: 'Essays',                    cat: 'Topic',   path: '/essays/',             kw: 'reading writing ideas' },
    // Markets sub-pages
    { t: 'Markets · Charts',          cat: 'Markets', path: '/markets/charts/',     kw: 'candlestick ohlcv plotting' },
    { t: 'Markets · Indicators',      cat: 'Markets', path: '/markets/indicators/', kw: 'rsi macd sma ema bollinger' },
    { t: 'Markets · Psychology',      cat: 'Markets', path: '/markets/psychology/', kw: 'sentiment bias behavioral fear greed' },
    { t: 'Markets · Risk',            cat: 'Markets', path: '/markets/risk/',       kw: 'var drawdown position sizing volatility' },
    // Sandbox
    { t: 'Sandbox',                   cat: 'Sandbox', path: '/sandbox/',            kw: 'playground interactive build experiment' },
    { t: 'Sandbox · ML',              cat: 'Sandbox', path: '/sandbox/ml/',         kw: 'machine learning interactive' },
    { t: 'Sandbox · Stats',           cat: 'Sandbox', path: '/sandbox/stats/',      kw: 'statistics interactive' },
    { t: 'Sandbox · Deep Learning',   cat: 'Sandbox', path: '/sandbox/dl/',         kw: 'neural network deep learning' },
    { t: 'Sandbox · Chaos',           cat: 'Sandbox', path: '/sandbox/chaos/',      kw: 'chaos fractal lorenz' },
    { t: 'Sandbox · Markets',         cat: 'Sandbox', path: '/sandbox/markets/',    kw: 'trading interactive' },
    // Tools / Labs
    { t: 'Notebooks · Lab',           cat: 'Tools',   path: '/notebooks/lab.html',  kw: 'jupyter lab notebook' },
    { t: 'Jupyter Lite',              cat: 'Tools',   path: '/lite/',               kw: 'browser jupyter python pyodide' },
    { t: 'ML Math Reference',         cat: 'Tools',   path: '/ml-math-reference-v1.html', kw: 'reference cheatsheet formulas' },
    { t: 'Game',                      cat: 'Tools',   path: '/game/',               kw: 'play interactive' },
    { t: 'Universe',                  cat: 'Tools',   path: '/universe/',           kw: 'visualization stars cosmos' },
    // Meta
    { t: 'Home',                      cat: 'Meta',    path: '/',                    kw: 'index landing start' },
    { t: 'Start',                     cat: 'Meta',    path: '/start/',              kw: 'getting started onboarding' },
    { t: 'Impact',                    cat: 'Meta',    path: '/impact/',             kw: 'about mission' },
    { t: 'Support',                   cat: 'Meta',    path: '/support/',            kw: 'help contact donate' }
  ];

  function fuzzyScore(query, hay) {
    // Simple subsequence fuzzy match. Returns -1 if no match, else a score (higher = better).
    if (!query) return 0;
    var q = query.toLowerCase();
    var h = hay.toLowerCase();
    // Direct substring boost
    var idx = h.indexOf(q);
    if (idx !== -1) return 1000 - idx;
    // Subsequence
    var qi = 0, score = 0, lastHit = -1, streak = 0;
    for (var i = 0; i < h.length && qi < q.length; i++) {
      if (h[i] === q[qi]) {
        score += 10;
        if (lastHit === i - 1) { streak++; score += streak * 5; } else { streak = 0; }
        lastHit = i;
        qi++;
      }
    }
    if (qi < q.length) return -1;
    return score;
  }

  function buildPalette() {
    var existing = document.getElementById('cmdkPalette');
    if (existing) return existing;
    var p = document.createElement('div');
    p.id = 'cmdkPalette';
    p.className = 'cmdk-palette';
    p.setAttribute('role', 'dialog');
    p.setAttribute('aria-modal', 'true');
    p.setAttribute('aria-label', 'Command palette');
    p.hidden = true;
    p.innerHTML =
      '<div class="cmdk-backdrop" data-close></div>' +
      '<div class="cmdk-panel">' +
        '<div class="cmdk-inputwrap">' +
          '<span class="cmdk-icon" aria-hidden="true">⌕</span>' +
          '<input id="cmdkInput" type="text" autocomplete="off" spellcheck="false" placeholder="Jump to a topic, page, or tool…" aria-label="Search" aria-controls="cmdkList" aria-autocomplete="list" />' +
          '<kbd class="cmdk-esc">Esc</kbd>' +
        '</div>' +
        '<ul id="cmdkList" class="cmdk-list" role="listbox"></ul>' +
        '<div class="cmdk-foot">' +
          '<span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>' +
          '<span><kbd>↵</kbd> open</span>' +
          '<span><kbd>Esc</kbd> close</span>' +
        '</div>' +
      '</div>';
    document.body.appendChild(p);

    var input = p.querySelector('#cmdkInput');
    var list = p.querySelector('#cmdkList');
    input.addEventListener('input', function () { renderResults(input.value); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); moveActive(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); moveActive(-1); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        var active = list.querySelector('.cmdk-item.is-active');
        if (active) active.click();
      }
    });
    list.addEventListener('click', function (e) {
      var item = e.target.closest('.cmdk-item');
      if (!item) return;
      var href = item.getAttribute('data-href');
      if (!href) return;
      // Same-page anchor: smooth-scroll without reload
      if (href.charAt(0) === '#') {
        var target = document.getElementById(href.slice(1));
        closePalette();
        if (target) {
          history.replaceState(null, '', href);
          target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        }
        return;
      }
      pushRecent(href);
      closePalette();
      window.location.href = href;
    });
    list.addEventListener('mousemove', function (e) {
      var item = e.target.closest('.cmdk-item');
      if (!item) return;
      setActive(item);
    });
    p.addEventListener('click', function (e) {
      if (e.target && e.target.matches('[data-close]')) closePalette();
    });
    return p;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[c];
    });
  }

  function renderResults(query) {
    var list = document.getElementById('cmdkList');
    if (!list) return;
    var q = (query || '').trim();
    var headings = getPageHeadings();

    // Empty query: show On-this-page + Recents + all pages
    if (!q) {
      var recents = getRecents();
      var groups = '';
      var firstAssigned = false;
      if (headings.length) {
        groups += '<li class="cmdk-group">On this page</li>' + headings.map(function (h, idx) {
          var isActive = !firstAssigned && idx === 0;
          if (isActive) firstAssigned = true;
          return renderItem(h, isActive);
        }).join('');
      }
      if (recents.length) {
        groups += '<li class="cmdk-group">Recent</li>' + recents.map(function (rp, idx) {
          var isActive = !firstAssigned && idx === 0;
          if (isActive) firstAssigned = true;
          return renderItem(rp, isActive);
        }).join('');
        groups += '<li class="cmdk-group">All</li>';
      }
      groups += PAGES.map(function (p, i) {
        var isActive = !firstAssigned && i === 0;
        if (isActive) firstAssigned = true;
        return renderItem(p, isActive);
      }).join('');
      list.innerHTML = groups;
      return;
    }

    var scored = [];
    for (var i = 0; i < PAGES.length; i++) {
      var p = PAGES[i];
      var hay = p.t + ' ' + p.cat + ' ' + p.kw;
      var s = fuzzyScore(q, hay);
      if (s >= 0) scored.push({ p: p, s: s });
    }
    // Headings score slightly higher when matched (deep links beat top-level)
    for (var j = 0; j < headings.length; j++) {
      var h = headings[j];
      var hs = fuzzyScore(q, h.t + ' ' + h.cat);
      if (hs >= 0) scored.push({ p: h, s: hs + 50 });
    }
    scored.sort(function (a, b) { return b.s - a.s; });
    var top = scored.slice(0, 20);
    if (top.length === 0) {
      list.innerHTML = '<li class="cmdk-empty">No matches for "' + escapeHtml(q) + '"</li>';
      return;
    }
    list.innerHTML = top.map(function (r, idx) { return renderItem(r.p, idx === 0); }).join('');
  }

  /* Collect headings on the current page (active topic SPA section or whole doc) */
  function getPageHeadings() {
    var scope = document.querySelector('.topic.active') || document.querySelector('main') || document.body;
    if (!scope) return [];
    var nodes = scope.querySelectorAll('h2[id], h3[id]');
    var out = [];
    for (var i = 0; i < nodes.length && out.length < 30; i++) {
      var n = nodes[i];
      // Clone and remove any injected anchor link before reading text
      var clone = n.cloneNode(true);
      var a = clone.querySelector('.heading-anchor');
      if (a) a.remove();
      var txt = (clone.innerText || clone.textContent || '').trim().replace(/\s+/g, ' ');
      if (!txt || txt.length > 90) continue;
      out.push({ t: txt, cat: n.tagName === 'H2' ? 'Section' : 'Subsection', path: '#' + n.id, kw: '' });
    }
    return out;
  }

  function renderItem(p, active) {
    return '<li class="cmdk-item' + (active ? ' is-active' : '') + '" role="option" data-href="' + p.path + '">' +
      '<span class="cmdk-cat">' + escapeHtml(p.cat) + '</span>' +
      '<span class="cmdk-title">' + escapeHtml(p.t) + '</span>' +
      '<span class="cmdk-path">' + escapeHtml(p.path) + '</span>' +
    '</li>';
  }

  /* Recently visited (localStorage) */
  var RECENTS_KEY = 'pp_recents_v1';
  function getRecents() {
    try {
      var raw = localStorage.getItem(RECENTS_KEY);
      if (!raw) return [];
      var paths = JSON.parse(raw);
      if (!Array.isArray(paths)) return [];
      var byPath = {};
      for (var i = 0; i < PAGES.length; i++) byPath[PAGES[i].path] = PAGES[i];
      var out = [];
      for (var j = 0; j < paths.length && out.length < 5; j++) {
        if (byPath[paths[j]]) out.push(byPath[paths[j]]);
      }
      return out;
    } catch (e) { return []; }
  }
  function pushRecent(path) {
    try {
      var raw = localStorage.getItem(RECENTS_KEY);
      var arr = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(arr)) arr = [];
      arr = arr.filter(function (p) { return p !== path; });
      arr.unshift(path);
      if (arr.length > 8) arr = arr.slice(0, 8);
      localStorage.setItem(RECENTS_KEY, JSON.stringify(arr));
    } catch (e) {}
  }
  // Record current page on load if it matches a known PAGES path
  function recordCurrentPage() {
    var here = window.location.pathname;
    // Normalize trailing index.html → directory
    var normalized = here.replace(/index\.html$/, '');
    for (var i = 0; i < PAGES.length; i++) {
      if (PAGES[i].path === normalized || PAGES[i].path === here) {
        pushRecent(PAGES[i].path);
        return;
      }
    }
  }

  function setActive(item) {
    var list = document.getElementById('cmdkList');
    if (!list) return;
    var prev = list.querySelector('.cmdk-item.is-active');
    if (prev) prev.classList.remove('is-active');
    item.classList.add('is-active');
  }
  function moveActive(delta) {
    var list = document.getElementById('cmdkList');
    if (!list) return;
    var items = list.querySelectorAll('.cmdk-item');
    if (!items.length) return;
    var current = list.querySelector('.cmdk-item.is-active');
    var i = current ? Array.prototype.indexOf.call(items, current) : -1;
    i = (i + delta + items.length) % items.length;
    setActive(items[i]);
    items[i].scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest' });
  }

  var paletteLastFocused = null;
  function openPalette() {
    var p = buildPalette();
    // If shortcut overlay is open, close it first
    var ov = document.getElementById('shortcutOverlay');
    if (ov && !ov.hidden) closeOverlay();
    if (!p.hidden) return;
    paletteLastFocused = document.activeElement;
    renderResults('');
    p.hidden = false;
    requestAnimationFrame(function () { p.classList.add('is-open'); });
    var input = p.querySelector('#cmdkInput');
    if (input) { input.value = ''; input.focus(); }
  }
  function closePalette() {
    var p = document.getElementById('cmdkPalette');
    if (!p || p.hidden) return;
    p.classList.remove('is-open');
    var hide = function () { p.hidden = true; };
    if (reduced) hide(); else setTimeout(hide, 180);
    if (paletteLastFocused && typeof paletteLastFocused.focus === 'function') {
      try { paletteLastFocused.focus(); } catch (e) {}
    }
  }

  /* ── Back-to-top button ── */
  function initBackToTop() {
    if (document.getElementById('backToTop')) return;
    var btn = document.createElement('button');
    btn.id = 'backToTop';
    btn.type = 'button';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.title = 'Back to top';
    btn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(btn);
    var visible = false;
    function update() {
      var should = window.scrollY > 600;
      if (should !== visible) {
        visible = should;
        btn.classList.toggle('is-visible', visible);
      }
    }
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(function () { update(); ticking = false; }); ticking = true; }
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
    update();
  }

  /* ── Sync theme-color meta with manual dark/light toggle ──
     The site ships <meta name="theme-color" ... media="(prefers-color-scheme: ...)">
     which only follows the OS. When the user clicks the on-page toggle
     (which sets html[data-theme]), browsers still pick the OS-matched tag,
     so the address bar can disagree with the page. This observer rewrites
     the active theme-color meta to match the manual override. */
  function initThemeColorSync() {
    var html = document.documentElement;
    var metas = document.querySelectorAll('meta[name="theme-color"]');
    if (!metas.length) return;
    // Remember the original light/dark colors keyed by media query.
    if (!window.__themeColorOriginals) {
      window.__themeColorOriginals = { light: null, dark: null, plain: null };
      for (var i = 0; i < metas.length; i++) {
        var m = metas[i];
        var media = (m.getAttribute('media') || '').toLowerCase();
        var content = m.getAttribute('content');
        if (media.indexOf('dark') !== -1) window.__themeColorOriginals.dark = content;
        else if (media.indexOf('light') !== -1) window.__themeColorOriginals.light = content;
        else window.__themeColorOriginals.plain = content;
      }
    }
    function apply() {
      var manual = html.getAttribute('data-theme'); // 'dark' | 'light' | null
      if (!manual) return; // no manual override; let OS media queries decide
      var orig = window.__themeColorOriginals;
      var target = manual === 'dark'
        ? (orig.dark || '#141210')
        : (orig.light || orig.plain || '#c84b2f');
      var tags = document.querySelectorAll('meta[name="theme-color"]');
      for (var j = 0; j < tags.length; j++) {
        var t = tags[j];
        // Drop media attribute so this tag wins regardless of OS.
        if (t.hasAttribute('media')) t.removeAttribute('media');
        t.setAttribute('content', target);
      }
    }
    apply();
    if (!window.__themeColorObserver) {
      window.__themeColorObserver = new MutationObserver(apply);
      window.__themeColorObserver.observe(html, { attributes: true, attributeFilter: ['data-theme'] });
    }
  }

  /* ── Theme-toggle fallback ──
     Pages that ship their own toggleTheme() keep working. Pages that lack
     one (or that have a .theme-toggle button but no handler) get a sensible
     default: localStorage-persisted manual override on <html data-theme>. */
  function initThemeToggleFallback() {
    if (typeof window.toggleTheme !== 'function') {
      window.toggleTheme = function () {
        var d = document.documentElement;
        var current = d.getAttribute('data-theme');
        // If unset, detect current effective scheme from OS.
        if (!current) {
          current = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        var next = current === 'dark' ? 'light' : 'dark';
        d.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) {}
      };
    }
    // Restore saved preference if html has none yet.
    try {
      var saved = localStorage.getItem('theme');
      if (saved && !document.documentElement.getAttribute('data-theme')) {
        document.documentElement.setAttribute('data-theme', saved);
      }
    } catch (e) {}
    // Auto-wire any .theme-toggle button missing an onclick handler.
    var btns = document.querySelectorAll('.theme-toggle');
    for (var i = 0; i < btns.length; i++) {
      var b = btns[i];
      if (b.dataset._tt) continue;
      if (!b.onclick && !b.getAttribute('onclick')) {
        b.addEventListener('click', function () { window.toggleTheme(); });
      }
      b.dataset._tt = '1';
    }
  }

  function init() {
    initScrollProgress();
    initBackToTop();
    initHeadingAnchors();
    initOutline();
    initCodeCopy();
    initReadingTime();
    initShareTopic();
    initFlashTarget();
    initExternalLinks();
    initThemeColorSync();
    initThemeToggleFallback();
    // Re-run after load and once more later, because some pages render
    // content (e.g. topic SPAs) after DOMContentLoaded.
    window.addEventListener('load', function () {
      initHeadingAnchors();
      initOutline();
      initCodeCopy();
      initReadingTime();
      initShareTopic();
      initFlashTarget();
      initExternalLinks();
      setTimeout(function () { initHeadingAnchors(); initOutline(); initCodeCopy(); initReadingTime(); initShareTopic(); initFlashTarget(); initExternalLinks(); }, 400);
    });
    window.addEventListener('hashchange', initFlashTarget);
    recordCurrentPage();
    document.addEventListener('keydown', onKey);
    // Expose programmatic API for buttons/links
    window.__openPalette = openPalette;
    window.__closePalette = closePalette;
    window.__refreshOutline = initOutline;
    initWhatsNew();
  }

  /* ── Heading anchors with click-to-copy ── */
  function slugify(s) {
    return (s || '')
      .toLowerCase()
      .replace(/[\u2018\u2019\u201C\u201D]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 60);
  }
  function showAnchorToast(msg) {
    var t = document.getElementById('anchorCopyToast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'anchorCopyToast';
      t.className = 'anchor-copy-toast';
      t.setAttribute('role', 'status');
      t.setAttribute('aria-live', 'polite');
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('is-visible');
    clearTimeout(showAnchorToast._t);
    showAnchorToast._t = setTimeout(function () { t.classList.remove('is-visible'); }, 1600);
  }
  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      try {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        resolve();
      } catch (e) { reject(e); }
    });
  }
  function initHeadingAnchors() {
    var scope = document.querySelector('main') || document.body;
    if (!scope) return;
    var used = {};
    var headings = scope.querySelectorAll('h2, h3');
    headings.forEach(function (h) {
      // Skip headings inside the palette/overlay/toasts
      if (h.closest('.cmdk-palette, .shortcut-overlay, .whats-new-toast, .sw-update-banner, [data-no-anchor]')) return;
      // Assign an id if missing
      var id = h.id;
      if (!id) {
        var base = slugify(h.textContent) || 'section';
        var candidate = base, n = 2;
        while (document.getElementById(candidate) || used[candidate]) {
          candidate = base + '-' + n++;
        }
        id = candidate;
        h.id = id;
      }
      used[id] = true;
      if (h.querySelector('.heading-anchor')) return;
      var a = document.createElement('a');
      a.className = 'heading-anchor';
      a.href = '#' + id;
      a.setAttribute('aria-label', 'Copy link to this section');
      a.title = 'Copy link to this section';
      a.textContent = '#';
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var url = window.location.origin + window.location.pathname + '#' + id;
        // Update URL hash without scrolling
        history.replaceState(null, '', '#' + id);
        copyToClipboard(url).then(function () {
          showAnchorToast('Link copied');
        }).catch(function () {
          showAnchorToast('#' + id);
        });
      });
      h.appendChild(a);
    });
    // If page loaded with a hash, scroll into view (browser default may miss late-assigned ids)
    if (window.location.hash && window.location.hash.length > 1) {
      var target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      if (target && !target.dataset._scrolled) {
        target.dataset._scrolled = '1';
        setTimeout(function () { target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }); }, 0);
      }
    }
  }

  /* ── Floating on-page outline ── */
  var outlineObserver = null;
  function initOutline() {
    var scope = document.querySelector('main') || document.body;
    if (!scope) return;
    var headings = Array.prototype.filter.call(
      scope.querySelectorAll('h2, h3'),
      function (h) {
        return h.id &&
          h.offsetParent !== null &&
          !h.closest('.cmdk-palette, .shortcut-overlay, .whats-new-toast, .sw-update-banner, [data-no-anchor], [hidden]');
      }
    );
    // Require at least 3 sections to bother showing the outline
    var existing = document.getElementById('pageOutline');
    if (headings.length < 3) {
      if (existing) existing.remove();
      var btn = document.getElementById('outlineToggle');
      if (btn) btn.remove();
      return;
    }

    // Build/replace toggle button
    var toggle = document.getElementById('outlineToggle');
    if (!toggle) {
      toggle = document.createElement('button');
      toggle.id = 'outlineToggle';
      toggle.type = 'button';
      toggle.className = 'outline-toggle';
      toggle.setAttribute('aria-label', 'Open page outline');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.title = 'Page outline';
      toggle.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="8" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="8" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1.3" fill="currentColor"/><circle cx="4" cy="12" r="1.3" fill="currentColor"/><circle cx="4" cy="18" r="1.3" fill="currentColor"/></svg>';
      document.body.appendChild(toggle);
      toggle.addEventListener('click', function () {
        var p = document.getElementById('pageOutline');
        if (p) {
          var open = p.classList.toggle('is-open');
          toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
          toggle.classList.toggle('is-active', open);
        }
      });
    }

    // Rebuild panel
    if (existing) existing.remove();
    var panel = document.createElement('nav');
    panel.id = 'pageOutline';
    panel.className = 'page-outline';
    panel.setAttribute('aria-label', 'On this page');
    var title = document.createElement('div');
    title.className = 'po-title';
    title.textContent = 'On this page';
    panel.appendChild(title);
    var ul = document.createElement('ul');
    ul.className = 'po-list';
    headings.forEach(function (h) {
      var li = document.createElement('li');
      li.className = 'po-item po-' + h.tagName.toLowerCase();
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.className = 'po-link';
      a.dataset.target = h.id;
      a.textContent = h.textContent.replace(/#$/, '').trim();
      a.addEventListener('click', function (e) {
        e.preventDefault();
        history.replaceState(null, '', '#' + h.id);
        h.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        // Auto-close on mobile after navigating
        if (window.matchMedia('(max-width: 900px)').matches) {
          panel.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.classList.remove('is-active');
        }
      });
      li.appendChild(a);
      ul.appendChild(li);
    });
    panel.appendChild(ul);
    document.body.appendChild(panel);

    // Active-section highlighting via IntersectionObserver
    if (outlineObserver) { try { outlineObserver.disconnect(); } catch (e) {} }
    if ('IntersectionObserver' in window) {
      var visible = {};
      outlineObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          visible[en.target.id] = en.isIntersecting;
        });
        // Highlight the topmost currently-visible heading
        var firstVisible = headings.find(function (h) { return visible[h.id]; });
        var activeId = firstVisible ? firstVisible.id : null;
        ul.querySelectorAll('.po-link').forEach(function (link) {
          link.classList.toggle('is-active', link.dataset.target === activeId);
        });
      }, { rootMargin: '-80px 0px -70% 0px', threshold: [0, 1] });
      headings.forEach(function (h) { outlineObserver.observe(h); });
    }
  }

  /* ── Automatic copy buttons on code blocks ── */
  function initCodeCopy() {
    var blocks = document.querySelectorAll('pre > code');
    blocks.forEach(function (code) {
      var pre = code.parentElement;
      if (!pre || pre.dataset._copyAdded) return;
      // Skip if the page already provides its own copy button (e.g. cases.js)
      if (pre.querySelector('.copy-btn, .code-copy-btn')) {
        pre.dataset._copyAdded = '1';
        return;
      }
      pre.dataset._copyAdded = '1';
      // Ensure pre is positioned so the absolute button anchors correctly
      var cs = window.getComputedStyle(pre);
      if (cs.position === 'static') pre.style.position = 'relative';
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'code-copy-btn';
      btn.setAttribute('aria-label', 'Copy code');
      btn.title = 'Copy code';
      btn.innerHTML =
        '<svg class="cc-icon-copy" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>' +
        '<svg class="cc-icon-check" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="5 12 10 17 19 7"/></svg>' +
        '<span class="cc-label">Copy</span>';
      btn.addEventListener('click', function () {
        var text = code.innerText || code.textContent || '';
        copyToClipboard(text).then(function () {
          btn.classList.add('is-copied');
          btn.querySelector('.cc-label').textContent = 'Copied';
          clearTimeout(btn._t);
          btn._t = setTimeout(function () {
            btn.classList.remove('is-copied');
            btn.querySelector('.cc-label').textContent = 'Copy';
          }, 1500);
        }).catch(function () {
          btn.querySelector('.cc-label').textContent = 'Err';
          setTimeout(function () { btn.querySelector('.cc-label').textContent = 'Copy'; }, 1500);
        });
      });
      pre.appendChild(btn);
    });
  }

  /* ── Reading-time badges on topic headers ── */
  function initReadingTime() {
    var topics = document.querySelectorAll('.topic');
    if (!topics.length) return;
    topics.forEach(function (topic) {
      if (topic.dataset._rtAdded) return;
      var header = topic.querySelector('.topic-header');
      if (!header) return;
      // Count words from prose, list items, blockquotes, and table cells
      var nodes = topic.querySelectorAll('.prose, li, blockquote, td, th');
      var words = 0;
      nodes.forEach(function (n) {
        var t = (n.innerText || n.textContent || '').trim();
        if (!t) return;
        words += t.split(/\s+/).length;
      });
      // Skip very short topics (intro snippets, navigation stubs)
      if (words < 120) { topic.dataset._rtAdded = '1'; return; }
      var mins = Math.max(1, Math.round(words / 220));
      var badge = document.createElement('span');
      badge.className = 'reading-time-badge';
      badge.setAttribute('aria-label', mins + ' minute read, approximately ' + words + ' words');
      badge.title = '~' + words + ' words';
      badge.innerHTML =
        '<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>' +
        '<span>' + mins + ' min read</span>';
      header.appendChild(badge);
      topic.dataset._rtAdded = '1';
    });
  }

  /* ── Share-link buttons on topic headers ── */
  function initShareTopic() {
    var topics = document.querySelectorAll('.topic[id]');
    if (!topics.length) return;
    topics.forEach(function (topic) {
      if (topic.dataset._shareAdded) return;
      var header = topic.querySelector('.topic-header');
      if (!header) return;
      topic.dataset._shareAdded = '1';
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'share-topic-btn';
      btn.title = 'Copy link to this topic';
      btn.setAttribute('aria-label', 'Copy link to this topic');
      btn.innerHTML =
        '<svg class="sh-icon" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1"/></svg>' +
        '<svg class="sh-check" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="5 12 10 17 19 7"/></svg>' +
        '<span class="sh-label">Share</span>';
      btn.addEventListener('click', function () {
        var url = window.location.origin + window.location.pathname + '#' + topic.id;
        copyToClipboard(url).then(function () {
          btn.classList.add('is-copied');
          btn.querySelector('.sh-label').textContent = 'Link copied';
          clearTimeout(btn._t);
          btn._t = setTimeout(function () {
            btn.classList.remove('is-copied');
            btn.querySelector('.sh-label').textContent = 'Share';
          }, 1600);
        }).catch(function () {
          btn.querySelector('.sh-label').textContent = 'Err';
          setTimeout(function () { btn.querySelector('.sh-label').textContent = 'Share'; }, 1500);
        });
      });
      header.appendChild(btn);
    });
  }

  /* ── Brief highlight when arriving at a heading via deep link ── */
  function initFlashTarget() {
    var h = window.location.hash;
    if (!h || h.length < 2) return;
    var id;
    try { id = decodeURIComponent(h.slice(1)); } catch (e) { id = h.slice(1); }
    var el = document.getElementById(id);
    if (!el) return;
    // Only flash headings/topics; ignore other arbitrary targets
    var tag = el.tagName;
    if (tag !== 'H1' && tag !== 'H2' && tag !== 'H3' && tag !== 'H4' && !el.classList.contains('topic')) return;
    el.classList.remove('flash-target');
    // Re-trigger animation
    void el.offsetWidth;
    el.classList.add('flash-target');
    clearTimeout(initFlashTarget._t);
    initFlashTarget._t = setTimeout(function () { el.classList.remove('flash-target'); }, 2200);
  }

  /* ── External-link decoration + security ── */
  function initExternalLinks() {
    var here = window.location.hostname;
    var links = document.querySelectorAll('a[href^="http"]');
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      if (a.dataset._extProcessed) continue;
      var href = a.getAttribute('href') || '';
      var hostMatch = href.match(/^https?:\/\/([^\/?#]+)/i);
      if (!hostMatch) { a.dataset._extProcessed = '1'; continue; }
      var host = hostMatch[1].toLowerCase();
      // Skip same-site (or current host on localhost) and opt-outs
      if (host === here || host === 'patterniseverything.com' || host === 'www.patterniseverything.com') { a.dataset._extProcessed = '1'; continue; }
      if (a.classList.contains('no-ext-icon') || a.dataset.noExtIcon === '1') { a.dataset._extProcessed = '1'; continue; }
      // Skip if link contains a non-text node (image/svg/button) — don't pollute icons or CTAs with visible labels-only
      if (!a.textContent || !a.textContent.trim()) { a.dataset._extProcessed = '1'; continue; }
      // Ensure safety attrs on links opening in a new tab
      if (a.target === '_blank') {
        var rel = (a.getAttribute('rel') || '').toLowerCase();
        var parts = rel.split(/\s+/).filter(Boolean);
        if (parts.indexOf('noopener') === -1) parts.push('noopener');
        if (parts.indexOf('noreferrer') === -1) parts.push('noreferrer');
        a.setAttribute('rel', parts.join(' '));
      }
      // Inject icon (skip if author already provided one)
      if (!a.querySelector('.ext-icon')) {
        var ico = document.createElement('span');
        ico.className = 'ext-icon';
        ico.setAttribute('aria-hidden', 'true');
        // Compact NE arrow inside a square
        ico.innerHTML = '<svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9 L9 3"/><path d="M4.5 3 H9 V7.5"/></svg>';
        a.appendChild(ico);
      }
      // Accessible label for screen readers
      if (!a.hasAttribute('aria-label') && !a.querySelector('[aria-label]')) {
        var label = a.textContent.trim();
        a.setAttribute('aria-label', label + ' (opens in new window)');
      }
      a.dataset._extProcessed = '1';
    }
  }

  /* ── First-visit "What's new" toast ── */
  // Bump version when there are notable new features to re-show the toast.
  var WHATSNEW_VERSION = 1;
  var WHATSNEW_KEY = 'pp_whatsnew_seen';
  function initWhatsNew() {
    try {
      var seen = parseInt(localStorage.getItem(WHATSNEW_KEY) || '0', 10);
      if (seen >= WHATSNEW_VERSION) return;
    } catch (e) { /* localStorage may be blocked */ }
    // Defer to avoid competing with LCP
    setTimeout(buildWhatsNewToast, 1800);
  }
  function dismissWhatsNew() {
    var t = document.getElementById('whatsNewToast');
    if (t) {
      t.classList.remove('is-visible');
      setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 250);
    }
    try { localStorage.setItem(WHATSNEW_KEY, String(WHATSNEW_VERSION)); } catch (e) {}
  }
  function buildWhatsNewToast() {
    if (document.getElementById('whatsNewToast')) return;
    var t = document.createElement('div');
    t.id = 'whatsNewToast';
    t.className = 'whats-new-toast';
    t.setAttribute('role', 'status');
    t.setAttribute('aria-live', 'polite');
    t.innerHTML =
      '<div class="wn-icon" aria-hidden="true">✨</div>' +
      '<div class="wn-body">' +
        '<div class="wn-title">New keyboard shortcuts</div>' +
        '<div class="wn-text">Press <kbd>Ctrl</kbd>+<kbd>K</kbd> to jump to any page, or <kbd>?</kbd> to see all shortcuts.</div>' +
      '</div>' +
      '<div class="wn-actions">' +
        '<button type="button" class="wn-btn wn-try">Try it</button>' +
        '<button type="button" class="wn-btn wn-dismiss" aria-label="Dismiss">×</button>' +
      '</div>';
    document.body.appendChild(t);
    // If the SW update banner is on screen, stack above it
    var swBanner = document.querySelector('.sw-update-banner.is-visible');
    if (swBanner) {
      var h = swBanner.getBoundingClientRect().height;
      t.style.bottom = (20 + h + 12) + 'px';
    }
    requestAnimationFrame(function () { t.classList.add('is-visible'); });
    t.querySelector('.wn-try').addEventListener('click', function () {
      dismissWhatsNew();
      openPalette();
    });
    t.querySelector('.wn-dismiss').addEventListener('click', dismissWhatsNew);
    // Auto-dismiss after 20 seconds of no interaction
    setTimeout(function () {
      if (document.getElementById('whatsNewToast')) dismissWhatsNew();
    }, 20000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
