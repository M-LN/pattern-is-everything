/* ── Python worker ──
   Runs topic code for js/code-run.js in Pyodide (CPython compiled to
   WebAssembly), off the page's main thread so a slow snippet cannot freeze
   it and Stop can simply terminate the worker. Pyodide and its packages
   come from the jsDelivr CDN, the same build the site's JupyterLite uses;
   the browser caches them after the first run.

   Message in:  { id, pkgs: ['numpy', ...], setup, code }
   Messages out: { id, type: 'status' | 'out' | 'err' | 'done' | 'fail', text } */
'use strict';
var PYODIDE = 'https://cdn.jsdelivr.net/pyodide/v0.29.3/full/';
importScripts(PYODIDE + 'pyodide.js');

var current = 0;
var send = function (type, text) { postMessage({ id: current, type: type, text: text }); };

var ready = loadPyodide({ indexURL: PYODIDE }).then(function (py) {
  py.setStdout({ batched: function (s) { send('out', s + '\n'); } });
  py.setStderr({ batched: function (s) { send('err', s + '\n'); } });
  /* setup runs first in a fresh namespace; the snippet then runs under the
     name <snippet>, so a traceback's line numbers match the editor. */
  py.runPython([
    'import sys, traceback',
    'def _pp_run(setup, code):',
    '    ns = {"__name__": "__main__"}',
    '    exec(compile(setup, "<setup>", "exec"), ns)',
    '    try:',
    '        exec(compile(code, "<snippet>", "exec"), ns)',
    '    except BaseException:',
    '        t, v, tb = sys.exc_info()',
    '        traceback.print_exception(t, v, tb.tb_next)',
    '        return False',
    '    return True'
  ].join('\n'));
  return py;
});
var numpyReady = false;

onmessage = function (e) {
  var m = e.data;
  current = m.id;
  ready.then(function (py) {
    send('status', 'Loading ' + m.pkgs.join(', ') + '…');
    return py.loadPackage(m.pkgs, { messageCallback: function () {} }).then(function () {
      if (!numpyReady) {   // plain numbers in printed tuples and dicts, not np.float64(...)
        py.runPython('import numpy as np\nnp.set_printoptions(legacy="1.25")');
        numpyReady = true;
      }
      /* Importing pandas or SciPy takes seconds the first time; do it here,
         so "Ran in" times the reader's code, not the import. */
      var heavy = m.pkgs.filter(function (p) { return p === 'pandas' || p === 'scipy'; })
                        .map(function (p) { return p === 'scipy' ? 'scipy.stats' : p; });
      if (heavy.length) {
        send('status', 'Importing ' + heavy.join(', ') + '…');
        py.runPython('import ' + heavy.join(', '));
      }
      send('status', 'Running…');
      var ok = py.globals.get('_pp_run')(m.setup, m.code);
      send(ok ? 'done' : 'fail', '');
    });
  }).catch(function (err) {
    send('err', String(err && err.message || err) + '\n');
    send('fail', '');
  });
};
