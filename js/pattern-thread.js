/* ═══════════════════════════════════════════════════════════
   Pattern Thread — the common thread across all topics
   Injects a "The Pattern" element into each topic by
   extracting the existing .sub description text.
   ═══════════════════════════════════════════════════════════ */
(function () {
  function inject() {
    document.querySelectorAll('.topic').forEach(function (t) {
      if (t.querySelector('.pattern-thread')) return;
      var sub = t.querySelector('.sub');
      if (!sub) return;
      var raw = sub.textContent.replace(/^\/\/\s*/, '').trim();
      if (!raw) return;
      var pt = document.createElement('div');
      pt.className = 'pattern-thread';
      var label = document.createElement('span');
      label.className = 'pt-label';
      label.textContent = '\u25C6 The Pattern';
      var text = document.createElement('span');
      text.className = 'pt-text';
      text.textContent = raw;
      pt.appendChild(label);
      pt.appendChild(text);
      var header = t.querySelector('.topic-header');
      if (header) header.after(pt);
      sub.style.display = 'none';
    });
  }
  /* Run after all load handlers (including buildContent) */
  window.addEventListener('load', function () { setTimeout(inject, 0); });
})();
