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
      // Topics without a header — the sandbox labs, whose subtitle is an
      // instruction rather than a pattern — keep their subtitle as written.
      // The thread used to be skipped there but the subtitle hidden anyway,
      // so the labs lost the line altogether.
      var header = t.querySelector('.topic-header');
      if (!header) return;
      header.after(pt);
      sub.style.display = 'none';
    });
  }
  /* The collection readers build their topics on DOMContentLoaded, in a
     handler registered before this one, so injecting here lands in the same
     task — before the first paint, with no shift of the text beneath. Pages
     that build on load (the sandboxes) are caught by the second pass; inject
     skips topics that already have a thread. */
  document.addEventListener('DOMContentLoaded', inject);
  window.addEventListener('load', function () { setTimeout(inject, 0); });
})();
