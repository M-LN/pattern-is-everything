/* Pattern Portal — UI enhancements
 * - Scroll progress bar under the header
 * - Keyboard shortcut overlay (press `?`)
 * - Command palette (press Ctrl/Cmd+K or `/`)
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
      if (href) {
        pushRecent(href);
        closePalette();
        window.location.href = href;
      }
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

    // Empty query: show Recents (if any) + all pages
    if (!q) {
      var recents = getRecents();
      var groups = '';
      if (recents.length) {
        groups += '<li class="cmdk-group">Recent</li>' + recents.map(function (rp, idx) {
          return renderItem(rp, idx === 0);
        }).join('');
        groups += '<li class="cmdk-group">All</li>';
      }
      groups += PAGES.map(function (p, i) {
        return renderItem(p, !recents.length && i === 0);
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
    scored.sort(function (a, b) { return b.s - a.s; });
    var top = scored.slice(0, 20);
    if (top.length === 0) {
      list.innerHTML = '<li class="cmdk-empty">No matches for "' + escapeHtml(q) + '"</li>';
      return;
    }
    list.innerHTML = top.map(function (r, idx) { return renderItem(r.p, idx === 0); }).join('');
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
    items[i].scrollIntoView({ block: 'nearest' });
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

  function init() {
    initScrollProgress();
    initBackToTop();
    recordCurrentPage();
    document.addEventListener('keydown', onKey);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
