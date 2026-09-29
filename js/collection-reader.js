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

/* ── Search ── */
function toggleSearch() {
  const o = document.getElementById('searchOverlay');
  o.classList.toggle('active');
  if (o.classList.contains('active')) {
    document.getElementById('searchInput').focus();
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').innerHTML = '';
  }
}
/* ui-enhance.js adds a site-wide command palette. It leaves Ctrl+K to this
   page's own search, and this page leaves the keyboard alone while the
   palette is up — otherwise both searches opened on top of each other. */
function paletteOpen() {
  const p = document.getElementById('cmdkPalette');
  return !!p && !p.hidden;
}
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    if (paletteOpen()) return;
    e.preventDefault(); toggleSearch();
  }
  if (e.key === 'Escape') {
    const o = document.getElementById('searchOverlay');
    if (o.classList.contains('active')) toggleSearch();
  }
  // Arrow key navigation. Modified arrows belong to the browser and the OS —
  // Alt+← is Back, and used to also step to the previous topic on the way out.
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    const a = document.activeElement;
    if (a && (a.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName))) return;
    if (document.getElementById('searchOverlay')?.classList.contains('active') || paletteOpen()) return;
    const idx = TOPICS.indexOf(currentTopic);
    if (e.key === 'ArrowLeft' && idx > 0) show(TOPICS[idx - 1]);
    if (e.key === 'ArrowRight' && idx < TOPICS.length - 1) show(TOPICS[idx + 1]);
  }
});
document.getElementById('searchInput')?.addEventListener('input', function() {
  const q = this.value.toLowerCase().trim();
  const res = document.getElementById('searchResults');
  if (!q) { res.innerHTML = ''; return; }
  const matches = TOPIC_DATA.filter(t =>
    t.title.toLowerCase().includes(q) ||
    t.category.toLowerCase().includes(q) ||
    t.keywords.some(k => k.toLowerCase().includes(q)) ||
    t.content.toLowerCase().includes(q)
  ).slice(0, 8);
  res.innerHTML = matches.map(t =>
    `<div class="search-result" onclick="show('${t.id}');toggleSearch();">
      <div class="sr-cat">${t.num} — ${t.category}</div>
      <div class="sr-title">${t.title}</div>
    </div>`
  ).join('') || '<div style="padding:16px 20px;font-family:var(--mono);font-size:12px;color:var(--muted)">No results</div>';
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
window.addEventListener('scroll', () => {
  clearTimeout(scrollSave);
  scrollSave = setTimeout(() => {
    try { history.replaceState({ ...(history.state || {}), topic: currentTopic, y: window.scrollY }, ''); }
    catch (e) { /* throttled — the next scroll will try again */ }
  }, 200);
}, { passive: true });

/* nav.history: 'push' (default) adds an entry, 'replace' rewrites the current
   one (first render), 'none' leaves history alone (Back/Forward already moved
   it). nav.y restores a remembered scroll position; nav.anchor scrolls to an
   element inside the topic. */
function show(id, scrollNav, nav = {}) {
  const leaving = currentTopic;
  const leavingY = window.scrollY;
  currentTopic = id;
  document.querySelectorAll('.topic,.home').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.ni').forEach(n => n.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
  // On the overview, render as a dedicated hub (sidebar hidden, centred hero);
  // any topic switches back to the reader layout.
  document.body.classList.toggle('hub-home', id === 'home');
  const ni = document.querySelector(`.ni[data-topic="${id}"]`);
  if (ni) { ni.classList.add('active'); if (scrollNav) ni.scrollIntoView({ block: 'nearest' }); }
  if (id !== 'home') viewed.add(id);
  updateProgress();
  buildNavButtons(id);
  /* Draw only the topic that is still on screen. Navigating away before the
     draw lands used to leave it pending; it then measured a hidden canvas as
     0x0 and wrote that back as the buffer size, which collapsed the element's
     rendered height for the rest of the session. The window is the fetch plus
     the 60 ms, so on a first visit it is however long visualizations.js takes.
     Cancel the pending timer and re-check the id before drawing. */
  if (id !== 'home') {
    clearTimeout(drawTimer);
    loadVisualizations().then(() => {
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
  // Update URL hash — the overview has no anchor, so leave the hash empty;
  // otherwise a "#home" hash makes the deep-link scroll land under the header.
  const mode = nav.history || 'push';
  if (mode !== 'none') {
    const url = id === 'home' ? location.pathname + location.search : '#' + id;
    if (mode === 'replace' || id === leaving) {
      history.replaceState({ topic: id }, '', url);
    } else {
      // Stamp the entry being left with its scroll position, then move on.
      history.replaceState({ ...(history.state || {}), topic: leaving, y: leavingY }, '');
      history.pushState({ topic: id }, '', url);
    }
  }
  if (nav.anchor) nav.anchor.scrollIntoView({ block: 'start' });
  else window.scrollTo({ top: nav.y || 0, behavior: 'instant' });
  /* The remembered position doesn't always stick: before the visualization
     has drawn the page may not be tall enough to reach it, and on a reload the
     browser's own jump to the #fragment lands after this. Apply it once more
     after the draw — unless the reader has scrolled by hand in the meantime. */
  if (nav.y) {
    let touched = false;
    const mark = () => { touched = true; };
    const INPUT = ['wheel', 'touchstart', 'keydown', 'mousedown'];
    INPUT.forEach(t => window.addEventListener(t, mark, { passive: true }));
    loadVisualizations().then(() => setTimeout(() => {
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
  // Open whatever the URL points at — a topic, or a heading inside one — and
  // restore the scroll position if this entry has one (a reload, or Back into
  // the page from elsewhere). A heading link keeps its own hash.
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
