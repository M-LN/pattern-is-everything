/* ── Collection reader ──
   Every collection page ran its own copy of this script: the same ~140 lines
   of theme toggle, search, navigation, progress and init, pasted into ten
   index.html files in two formats (readable in most, minified under
   markets/). Changing anything meant ten edits and two regex variants, and
   the copies had already drifted — llm and timeseries had guarded their
   visualization call, mlops used HTML entities in the prev/next labels.

   This is the single source. The drift is resolved in favour of the safer
   behaviour: the guarded DRAWS call is kept for every collection.

   Expects topics.js (TOPICS, TOPIC_NAMES, TOPIC_DATA, buildNav, buildContent)
   and, optionally, visualizations.js (DRAWS) to have loaded first, and must
   itself load before js/topic-meta.js, which wraps show().
*/
/* ── Theme ── */
function toggleTheme() {
  const d = document.documentElement;
  d.setAttribute('data-theme', d.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  localStorage.setItem('theme', d.getAttribute('data-theme'));
}
const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
else if (window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.setAttribute('data-theme', 'dark');
if (window.PatternLoader) PatternLoader.hide();

/* ── Search ──
   The header's search button and Ctrl+K open the site-wide command palette
   (js/ui-enhance.js). Each reader used to carry its own search overlay as
   well, so the same keys led to two different searches depending on the
   page; the palette now ranks this collection's topics first and matches
   their descriptions too, which is what the overlay offered. */
function toggleSearch() {
  if (typeof window.__openPalette === 'function') window.__openPalette();
}
function paletteOpen() {
  const p = document.getElementById('cmdkPalette');
  return !!p && !p.hidden;
}
document.addEventListener('keydown', e => {
  // Arrow key navigation. Modified arrows belong to the browser and the OS —
  // Alt+← is Back, and used to also step to the previous topic on the way out.
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    const a = document.activeElement;
    if (a && (a.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName))) return;
    if (paletteOpen()) return;
    const idx = TOPICS.indexOf(currentTopic);
    if (e.key === 'ArrowLeft' && idx > 0) show(TOPICS[idx - 1]);
    if (e.key === 'ArrowRight' && idx < TOPICS.length - 1) show(TOPICS[idx + 1]);
  }
});

/* ── Visualizations, on demand ──
   The overview draws nothing: its section cards are plain markup, and the
   topic canvases sit hidden until one is opened. visualizations.js is
   29–115 KB depending on the collection, so it is fetched the first time a
   topic is actually shown rather than on every landing. The page passes its
   own path (and cache-busting version) in via data-viz.

   Cost of this: the very first topic of a session draws once the script
   arrives instead of 60 ms in. Every later topic is unaffected — the fetch
   happens once and the promise is reused. */
const VIZ_SRC = (document.currentScript && document.currentScript.dataset.viz) || 'visualizations.js';
let vizLoad = null;
function loadVisualizations() {
  if (vizLoad) return vizLoad;
  vizLoad = new Promise(resolve => {
    const s = document.createElement('script');
    s.src = VIZ_SRC;
    s.onload = () => resolve(true);
    s.onerror = () => { console.warn('Could not load', VIZ_SRC); resolve(false); };
    document.head.appendChild(s);
  });
  return vizLoad;
}

/* ── Navigation ── */
let currentTopic = 'home';
let drawTimer = null;
const viewed = new Set();
// "/ml-math/" and "ML Math": this collection's key prefix in the progress and
// connections data, and its name as the page title carries it.
const READER_PATH = location.pathname.replace(/index\.html$/, '');
const READER_NAME = document.title.split(' — ')[0].trim();

/* ── Progress ──
   The viewed counter and the sidebar marks come from js/progress.js, which
   keeps them in localStorage — they used to reset on every reload. */
function topicTitle(id) {
  const t = TOPIC_DATA.find(x => x.id === id);
  return t ? t.title : (TOPIC_NAMES[id] || id);
}
function markSeen(id) {
  viewed.add(id);
  if (window.PatternProgress) PatternProgress.mark(READER_PATH + '#' + id, topicTitle(id), READER_NAME);
  const ni = document.querySelector(`.ni[data-topic="${id}"]`);
  if (ni) ni.classList.add('is-seen');
}
function restoreProgress() {
  if (!window.PatternProgress) return;
  PatternProgress.setTotal(READER_PATH, TOPICS.filter(t => t !== 'home').length);
  PatternProgress.seenIn(READER_PATH).forEach(k => {
    const id = k.slice(k.indexOf('#') + 1);
    if (!TOPICS.includes(id) || id === 'home') return;
    viewed.add(id);
    const ni = document.querySelector(`.ni[data-topic="${id}"]`);
    if (ni) ni.classList.add('is-seen');
  });
  updateProgress();
}

/* ── Phone reading bar ──
   On a phone the prev/next buttons sit at the very end of a long topic, and
   the floating back-to-top and outline buttons covered the text beneath
   them. Below 720px a fixed bar carries all of it: previous, position and
   title (tap to go back to the top), the outline, next. css/main.css hides
   the floating buttons while the bar is showing. Swiping sideways on the
   text steps between topics too. */
let readerBar = null;
function neighbour(dir) {
  const t = TOPICS[TOPICS.indexOf(currentTopic) + dir];
  return t && t !== 'home' ? t : null;
}
function buildReaderBar() {
  // A div, not <nav>: the stylesheet styles bare nav elements as the sidebar.
  readerBar = document.createElement('div');
  readerBar.className = 'reader-bar';
  readerBar.setAttribute('role', 'navigation');
  readerBar.setAttribute('aria-label', 'Topic navigation');
  readerBar.innerHTML =
    '<button type="button" class="rb-btn rb-prev" aria-label="Previous topic">←</button>' +
    '<button type="button" class="rb-mid" aria-label="Back to the top of this topic">' +
      '<span class="rb-pos"></span><span class="rb-title"></span></button>' +
    '<button type="button" class="rb-btn rb-outline" aria-label="On this page">☰</button>' +
    '<button type="button" class="rb-btn rb-next" aria-label="Next topic">→</button>';
  readerBar.querySelector('.rb-prev').onclick = () => { const t = neighbour(-1); if (t) show(t, true); };
  readerBar.querySelector('.rb-next').onclick = () => { const t = neighbour(1); if (t) show(t, true); };
  readerBar.querySelector('.rb-mid').onclick = () => window.scrollTo({ top: 0 });
  // The outline toggle belongs to ui-enhance.js and may not exist yet.
  readerBar.querySelector('.rb-outline').onclick = () => {
    const t = document.querySelector('.outline-toggle');
    if (t) t.click();
  };
  document.body.appendChild(readerBar);
  document.body.classList.add('has-reader-bar');
}
function updateReaderBar(id) {
  if (!readerBar) return;
  const list = TOPICS.filter(t => t !== 'home');
  readerBar.querySelector('.rb-pos').textContent = id === 'home' ? '' : `${list.indexOf(id) + 1} / ${list.length}`;
  readerBar.querySelector('.rb-title').textContent = id === 'home' ? '' : topicTitle(id);
  readerBar.querySelector('.rb-prev').disabled = !neighbour(-1);
  readerBar.querySelector('.rb-next').disabled = !neighbour(1);
}

/* Horizontal swipes on the reading column. Anything that takes a sideways
   drag itself — a canvas, a form control, a table or formula that scrolls
   sideways — keeps it. */
function swipeOwner(el) {
  for (; el && el !== document.body; el = el.parentElement) {
    if (/^(CANVAS|INPUT|TEXTAREA|SELECT|PRE)$/.test(el.tagName)) return true;
    if (el.scrollWidth > el.clientWidth + 1 && /auto|scroll/.test(getComputedStyle(el).overflowX)) return true;
  }
  return false;
}
function initSwipe() {
  const main = document.getElementById('mainContent');
  if (!main) return;
  let x0 = 0, y0 = 0, t0 = 0, tracking = false;
  main.addEventListener('touchstart', e => {
    tracking = e.touches.length === 1 && currentTopic !== 'home' && !swipeOwner(e.target);
    if (!tracking) return;
    x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; t0 = Date.now();
  }, { passive: true });
  main.addEventListener('touchend', e => {
    if (!tracking) return;
    tracking = false;
    const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    // Quick, clearly sideways and long enough — not a scroll that drifted.
    if (Date.now() - t0 > 700 || Math.abs(dx) < 70 || Math.abs(dx) < 2 * Math.abs(dy)) return;
    const t = neighbour(dx < 0 ? 1 : -1);
    if (t) show(t, true);
  }, { passive: true });
}

/* ── History ──
   Every topic switch used to replaceState, so the whole reading session was a
   single history entry: Back (or a swipe back on a phone) after reading five
   topics left the collection instead of returning to the fourth. Switches now
   push an entry, and popstate/hashchange bring the matching topic back.

   Each entry remembers its scroll position, so Back lands where the reader
   left off rather than at the top. The browser's own restoration is turned
   off because it would fight the topic switch, which resets the scroll. */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
// Tells ui-enhance.js not to scroll to the hash on load: here the hash names a
// topic, and show() decides where the page sits.
window.readerOwnsHash = true;

/* A hash is either a topic id or — after a heading's copy-link or the outline
   — the id of an element inside a topic. Resolve both to the topic to show,
   plus the element to scroll to for the second kind. Null when the hash
   matches nothing on this page. */
function resolveHash(hash) {
  let id = hash.replace(/^#/, '');
  try { id = decodeURIComponent(id); } catch (e) { /* keep the raw id */ }
  if (!id) return { topic: 'home' };
  if (TOPICS.includes(id)) return { topic: id };
  const el = document.getElementById(id);
  const owner = el && el.closest('.topic');
  if (owner && TOPICS.includes(owner.id)) return { topic: owner.id, anchor: el };
  return null;
}

function syncFromLocation(state) {
  renderTrail();
  const target = resolveHash(location.hash);
  if (!target) return;
  const y = state && typeof state.y === 'number' ? state.y : undefined;
  if (target.topic !== currentTopic) show(target.topic, true, { history: 'none', y, anchor: target.anchor });
  else if (target.anchor) target.anchor.scrollIntoView({ block: 'start' });
  else if (y !== undefined) window.scrollTo({ top: y, behavior: 'instant' });
}
// Back/Forward between topics. A plain hash change (an in-page link, or an
// edited URL) fires both events; the second finds the topic already shown.
window.addEventListener('popstate', e => syncFromLocation(e.state));
window.addEventListener('hashchange', () => syncFromLocation(history.state));
// Keep the current entry's scroll position up to date as the reader scrolls,
// so a reload — or coming back from another page without the bfcache — lands
// in the same place. Writing it on pagehide instead doesn't work: Chrome drops
// history writes made while the page unloads. Debounced to the end of a
// scroll, which keeps well under the browser's history-write throttle.
let scrollSave = null;
function saveScroll() {
  clearTimeout(scrollSave);
  try { history.replaceState({ ...(history.state || {}), topic: currentTopic, y: window.scrollY }, ''); }
  catch (e) { /* throttled — the next scroll will try again */ }
}
window.addEventListener('scroll', () => {
  clearTimeout(scrollSave);
  scrollSave = setTimeout(saveScroll, 200);
}, { passive: true });
// A link that leaves the page can be clicked inside the debounce window.
document.addEventListener('click', e => {
  const a = e.target.closest && e.target.closest('a[href]');
  if (a && a.origin === location.origin && a.pathname !== location.pathname) saveScroll();
}, true);

/* ── Return trail ──
   Arriving here over a pattern bridge from another page puts a "← Back to …"
   chip on screen (js/return-trail.js draws it). The chip belongs to history
   entries, not to the page: each entry carries trail.depth, how many steps
   past the arrival it is, so the chip keeps working however many topics the
   reader goes on to open, disappears once they are back at the origin, and
   comes back if they go forward again. */
function renderTrail() {
  if (!window.ReturnTrail) return;
  const trail = history.state && history.state.trail;
  ReturnTrail.render(trail || null, () => history.go(-(trail.depth + 1)));
}

/* ── Topic transitions ──
   Switching topics slides the reading column in the direction of travel —
   left for later topics, right for earlier ones — and carries the title from
   one topic to the next when it is on screen. The header and sidebar hold
   still (css/main.css names them for the transition). Chromium's View
   Transitions only; elsewhere, and with reduced motion, the switch is instant
   as before. Direction needs transition types (Chromium 125+); older builds
   get a plain crossfade. */
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const typedTransitions = typeof ViewTransition !== 'undefined' && 'types' in ViewTransition.prototype;
function titleOf(id) {
  const el = document.getElementById(id);
  return el && el.querySelector('.topic-meta h2');
}
function swapTopic(update, from, to) {
  const animate = from !== to && from !== 'home' && to !== 'home' &&
    document.startViewTransition && !reducedMotion.matches && !document.hidden;
  if (!animate) { update(); return Promise.resolve(); }
  const oldTitle = titleOf(from), newTitle = titleOf(to);
  const r = oldTitle && oldTitle.getBoundingClientRect();
  // Morphing a title that is scrolled out of view would fly it in from off
  // screen, so only a visible one is carried over.
  const morph = r && r.bottom > 0 && r.top < window.innerHeight;
  if (morph) oldTitle.style.viewTransitionName = 'topic-title';
  const direction = TOPICS.indexOf(to) > TOPICS.indexOf(from) ? 'forward' : 'backward';
  const wrapped = () => {
    if (oldTitle) oldTitle.style.viewTransitionName = '';
    if (morph && newTitle) newTitle.style.viewTransitionName = 'topic-title';
    update();
  };
  let vt;
  try {
    vt = typedTransitions
      ? document.startViewTransition({ update: wrapped, types: [direction] })
      : document.startViewTransition(wrapped);
  } catch (e) { wrapped(); return Promise.resolve(); }
  // A switch that starts before this one finishes skips it, which rejects
  // `ready` — expected when stepping quickly through topics, not an error.
  vt.ready.catch(() => {});
  vt.finished.catch(() => {}).finally(() => { if (newTitle) newTitle.style.viewTransitionName = ''; });
  return vt.updateCallbackDone.catch(() => {});
}

/* Put topic `id` on screen: the visible half of show(). */
function applyTopic(id, scrollNav, nav) {
  document.querySelectorAll('.topic,.home').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.ni').forEach(n => n.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
  // On the overview, render as a dedicated hub (sidebar hidden, centred hero);
  // any topic switches back to the reader layout.
  document.body.classList.toggle('hub-home', id === 'home');
  const ni = document.querySelector(`.ni[data-topic="${id}"]`);
  if (ni) { ni.classList.add('active'); if (scrollNav) ni.scrollIntoView({ block: 'nearest' }); }
  if (nav.anchor) nav.anchor.scrollIntoView({ block: 'start' });
  else window.scrollTo({ top: nav.y || 0, behavior: 'instant' });
}

/* nav.history: 'push' (default) adds an entry, 'replace' rewrites the current
   one (first render), 'none' leaves history alone (Back/Forward already moved
   it). nav.y restores a remembered scroll position; nav.anchor scrolls to an
   element inside the topic.

   State, history and the nav buttons update at once; the visible switch may
   land a frame later, inside a view transition. */
function show(id, scrollNav, nav = {}) {
  const leaving = currentTopic;
  const leavingY = window.scrollY;
  const leavingState = history.state || {};
  currentTopic = id;
  if (id !== 'home') markSeen(id);
  updateProgress();
  buildNavButtons(id);
  updateReaderBar(id);
  // Update URL hash — the overview has no anchor, so leave the hash empty;
  // otherwise a "#home" hash makes the deep-link scroll land under the header.
  const mode = nav.history || 'push';
  if (mode !== 'none') {
    const url = id === 'home' ? location.pathname + location.search : '#' + id;
    if (mode === 'replace' || id === leaving) {
      history.replaceState({ topic: id, trail: leavingState.trail }, '', url);
    } else {
      // Stamp the entry being left with its scroll position, then move on —
      // one step further from where a bridge brought the reader in, if one did.
      history.replaceState({ ...leavingState, topic: leaving, y: leavingY }, '');
      const trail = leavingState.trail && { ...leavingState.trail, depth: leavingState.trail.depth + 1 };
      history.pushState({ topic: id, trail }, '', url);
    }
  }
  renderTrail();
  // "Linked from" list under the topic (js/connections.js); once per topic.
  if (window.Connections) Connections.render(id);
  const swapped = swapTopic(() => {
    if (id === currentTopic) applyTopic(id, scrollNav, nav);
  }, mode === 'replace' ? id : leaving, id);
  /* Draw only the topic that is still on screen. Navigating away before the
     draw lands used to leave it pending; it then measured a hidden canvas as
     0x0 and wrote that back as the buffer size, which collapsed the element's
     rendered height for the rest of the session. The window is the fetch plus
     the 60 ms, so on a first visit it is however long visualizations.js takes.
     Cancel the pending timer, wait for the topic to be swapped in, and
     re-check the id before drawing. */
  if (id !== 'home') {
    clearTimeout(drawTimer);
    Promise.all([loadVisualizations(), swapped]).then(() => {
      if (id !== currentTopic) return;
      clearTimeout(drawTimer);
      drawTimer = setTimeout(() => {
        // Guarded: a throwing visualization must not take navigation down with
        // it, and DRAWS is absent if the script failed to load.
        try { if (id === currentTopic && typeof DRAWS !== 'undefined' && DRAWS[id]) DRAWS[id](); }
        catch (e) { console.warn('Visualization failed for', id, e); }
      }, 60);
    });
  }
  /* The remembered position doesn't always stick: before the visualization
     has drawn the page may not be tall enough to reach it, and on a reload the
     browser's own jump to the #fragment lands after this. Apply it once more
     after the draw — unless the reader has scrolled by hand in the meantime. */
  if (nav.y) {
    let touched = false;
    const mark = () => { touched = true; };
    const INPUT = ['wheel', 'touchstart', 'keydown', 'mousedown'];
    INPUT.forEach(t => window.addEventListener(t, mark, { passive: true }));
    Promise.all([loadVisualizations(), swapped]).then(() => setTimeout(() => {
      INPUT.forEach(t => window.removeEventListener(t, mark, { passive: true }));
      if (!touched && id === currentTopic && Math.abs(window.scrollY - nav.y) > 2)
        window.scrollTo({ top: nav.y, behavior: 'instant' });
    }, 120));
  }
}

function showSection(secId, topicId) {
  const sec = document.getElementById(secId);
  if (sec && !sec.classList.contains('open')) sec.classList.add('open');
  show(topicId, true);
}

function toggleSection(id) {
  document.getElementById(id).classList.toggle('open');
}

function updateProgress() {
  const total = TOPICS.filter(t => t !== 'home').length;
  const n = viewed.size;
  const pct = Math.round(n / total * 100);
  const bar = document.getElementById('progressBar');
  const txt = document.getElementById('progressText');
  if (bar) bar.style.width = pct + '%';
  if (txt) txt.textContent = `${n} / ${total} viewed`;
}

function buildNavButtons(id) {
  const navEl = document.getElementById('nav-' + id);
  if (!navEl) return;
  const idx = TOPICS.indexOf(id);
  const prev = idx > 1 ? TOPICS[idx - 1] : null;
  const next = idx >= 0 && idx < TOPICS.length - 1 ? TOPICS[idx + 1] : null;
  navEl.innerHTML = '';
  if (prev && prev !== 'home') {
    const b = document.createElement('div');
    b.className = 'tnav-btn';
    b.innerHTML = `<div class="tnav-dir">← Previous</div><div class="tnav-name">${TOPIC_NAMES[prev]}</div>`;
    b.onclick = () => show(prev, true);
    navEl.appendChild(b);
  } else {
    navEl.appendChild(document.createElement('div'));
  }
  if (next) {
    const b = document.createElement('div');
    b.className = 'tnav-btn next';
    b.innerHTML = `<div class="tnav-dir">Next →</div><div class="tnav-name">${TOPIC_NAMES[next]}</div>`;
    b.onclick = () => show(next, true);
    navEl.appendChild(b);
  }
}

/* ── Init ── */
window.addEventListener('load', () => {
  buildNav();
  buildContent();
  const homeNI = document.querySelector('.ni[data-topic="home"]');
  if (homeNI) homeNI.classList.add('active');
  restoreProgress();
  buildReaderBar();
  initSwipe();
  // Open whatever the URL points at — a topic, or a heading inside one — and
  // restore the scroll position if this entry has one (a reload, or Back into
  // the page from elsewhere). A heading link keeps its own hash.
  // Arrived over a pattern bridge: this entry becomes the start of the trail.
  const arrival = window.ReturnTrail && ReturnTrail.take();
  if (arrival) history.replaceState({ ...(history.state || {}), trail: { ...arrival, depth: 0 } }, '');
  const open = () => {
    const target = resolveHash(location.hash) || { topic: 'home' };
    const y = history.state && typeof history.state.y === 'number' ? history.state.y : undefined;
    show(target.topic, true, { history: target.anchor ? 'none' : 'replace', y, anchor: target.anchor });
  };
  // Heading ids are assigned by ui-enhance.js in its own load handler, which
  // runs after this one — so a hash naming a heading only resolves after it.
  if (location.hash && !resolveHash(location.hash)) setTimeout(open, 0);
  else open();
});
