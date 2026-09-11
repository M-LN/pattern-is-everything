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
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); toggleSearch(); }
  if (e.key === 'Escape') {
    const o = document.getElementById('searchOverlay');
    if (o.classList.contains('active')) toggleSearch();
  }
  // Arrow key navigation
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    if (document.activeElement.tagName === 'INPUT') return;
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

/* ── Navigation ── */
let currentTopic = 'home';
const viewed = new Set();

function show(id, scrollNav) {
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
  // Trigger visualization draw
  setTimeout(() => {
    // Guarded: a throwing visualization must not take navigation down with
    // it, and DRAWS is absent until visualizations.js has run.
    try { if (typeof DRAWS !== 'undefined' && DRAWS[id]) DRAWS[id](); }
    catch (e) { console.warn('Visualization failed for', id, e); }
  }, 60);
  // Update URL hash — the overview has no anchor, so leave the hash empty;
  // otherwise a "#home" hash makes the deep-link scroll land under the header.
  if (id === 'home') history.replaceState(null, '', location.pathname + location.search);
  else history.replaceState(null, '', '#' + id);
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });
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
  // Check hash
  if (location.hash) {
    const id = location.hash.slice(1);
    if (TOPICS.includes(id)) { show(id, true); return; }
  }
  show('home');
});
