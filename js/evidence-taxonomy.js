(function() {
  const TAXONOMY = {
    mathematical: {
      className: 'proven',
      label: 'Mathematical',
      title: 'Deterministic math or algorithmic definition. The formula is proven; practical usefulness still depends on data and assumptions.'
    },
    statistical: {
      className: 'statistical',
      label: 'Statistical',
      title: 'Grounded in statistical estimation, validation, or empirical model evaluation. Use with uncertainty and assumptions in mind.'
    },
    heuristic: {
      className: 'heuristic',
      label: 'Heuristic',
      title: 'Pattern-recognition or rule-of-thumb technique. Useful for exploration, not proof of predictive edge.'
    },
    practice: {
      className: 'practice',
      label: 'Practice',
      title: 'An established tool, workflow or engineering pattern. It encodes experience and trade-offs, not a proof or a measured effect.'
    },
    debated: {
      className: 'debated',
      label: 'Debated',
      title: 'Evidence is mixed, context-dependent, or contested. Validate before relying on it.'
    },
    simulation: {
      className: 'educational',
      label: 'Educational simulation',
      title: 'Interactive teaching model. Good for intuition, not a production result.'
    }
  };

  function pageKind() {
    const path = location.pathname.replace(/\\/g, '/');
    if (path.includes('/markets/charts/') || path.includes('/markets/psychology/')) return 'heuristic';
    if (path.includes('/markets/indicators/')) return 'debated';
    if (path.includes('/markets/risk/')) return 'statistical';
    if (path.includes('/stats/') || path.includes('/timeseries/') || path.includes('/mlops/')) return 'statistical';
    if (path.includes('/sandbox/')) return 'simulation';
    return 'mathematical';
  }

  function inferBadgeKind(badge, fallback) {
    const text = badge.textContent.toLowerCase();
    const title = (badge.getAttribute('title') || '').toLowerCase();
    if (text.includes('heuristic') || title.includes('heuristic')) return 'heuristic';
    if (text.includes('debated') || title.includes('debated') || title.includes('mixed')) return 'debated';
    if (text.includes('behavioral')) return 'heuristic';
    if (text.includes('statistical')) return 'statistical';
    return fallback;
  }

  function applyBadge(badge, kind) {
    const spec = TAXONOMY[kind] || TAXONOMY.mathematical;
    badge.classList.remove('proven', 'statistical', 'heuristic', 'practice', 'debated', 'educational');
    badge.classList.add(spec.className);
    badge.textContent = spec.label;
    badge.setAttribute('title', spec.title);
    badge.dataset.evidence = kind;
  }

  /* Each topic's label is set per topic, in its collection's TOPIC_DATA
     (evidence: '...'), and scripts/check.mjs requires one. The path and badge
     text are only a fallback for badges outside a topic, such as the sandboxes. */
  function topicKind(badge) {
    const topic = badge.closest('.topic[id]');
    if (!topic || typeof TOPIC_DATA === 'undefined') return null;
    const entry = TOPIC_DATA.find(t => t.id === topic.id);
    return entry && TAXONOMY[entry.evidence] ? entry.evidence : null;
  }

  function normalize() {
    const fallback = pageKind();
    document.querySelectorAll('.evidence-badge').forEach(badge =>
      applyBadge(badge, topicKind(badge) || inferBadgeKind(badge, fallback)));
  }

  window.EVIDENCE_TAXONOMY = TAXONOMY;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', normalize);
  else normalize();
  window.addEventListener('load', () => setTimeout(normalize, 150));
})();