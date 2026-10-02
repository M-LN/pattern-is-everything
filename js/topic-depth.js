/* ── Topic depth ──
   The content standard's sections under a topic's explanation: a worked
   example (with the data it was worked on), where the idea misleads, the
   code that computes it, and sources. Each collection's topics.js holds its
   own TOPIC_DEPTH entries and calls renderDepth from buildContent; this file
   only lays them out, so every collection reads the same.

   renderDepth({ example, dataHtml, fails: [], code, codeNote, sources: [] })
   returns HTML, or '' for a topic with no entry. The strings are trusted
   markup written in the repo, not user input. */
(function () {
  'use strict';
  /* When the content was last checked against its sources (see /method/). */
  var REVIEWED = 'October 2026';

  window.renderDepth = function (d) {
    if (!d) return '';
    var list = function (items) {
      return '<ul>' + items.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>';
    };
    return '<section class="depth">' +
      '<div class="depth-block"><div class="depth-title">Worked example</div><p>' + d.example + '</p>' + (d.dataHtml || '') + '</div>' +
      '<div class="depth-block"><div class="depth-title">Where it misleads</div>' + list(d.fails) + '</div>' +
      '<div class="depth-block"><div class="depth-title">In code</div><div class="code-block"><pre>' + d.code + '</pre></div>' +
        (d.codeNote ? '<p class="depth-note">' + d.codeNote + '</p>' : '') + '</div>' +
      '<div class="depth-block depth-sources"><div class="depth-title">Sources</div>' + list(d.sources) +
        '<p class="depth-note depth-reviewed">Last reviewed ' + REVIEWED + ' · <a href="/method/">How this site checks its content</a></p></div>' +
    '</section>';
  };
})();
