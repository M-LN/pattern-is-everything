/* ── Python worker ──
   Runs topic code for js/code-run.js in Pyodide (CPython compiled to
   WebAssembly), off the page's main thread so a slow snippet cannot freeze
   it and Stop can simply terminate the worker. Pyodide and its packages
   come from the jsDelivr CDN, the same build the site's JupyterLite uses;
   the browser caches them after the first run.

   Message in:  { id, pkgs: ['numpy', ...], setup, code, files: [url, ...] }
                (files: data a case step reads by name, fetched once)
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
    'import sys, io, contextlib, traceback',
    'def _pp_run(setup, code):',
    '    ns = {"__name__": "__main__"}',
    '    with contextlib.redirect_stdout(io.StringIO()):   # earlier steps print on the page already',
    '        exec(compile(setup, "<setup>", "exec"), ns)',
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
var written = {};   // data files already in Pyodide's file system

/* A case step reads its data by file name (pd.read_csv('housing.csv')):
   fetch each file from the site once and write it to the working directory. */
function writeFiles(py, urls) {
  var todo = (urls || []).filter(function (u) { return !written[u]; });
  if (!todo.length) return Promise.resolve();
  send('status', 'Downloading ' + todo.map(function (u) { return u.split('/').pop(); }).join(', ') + '…');
  return Promise.all(todo.map(function (u) {
    return fetch(u).then(function (res) {
      if (!res.ok) throw new Error('could not download ' + u + ' (HTTP ' + res.status + ')');
      return res.arrayBuffer();
    }).then(function (buf) {
      py.FS.writeFile(py.FS.cwd() + '/' + u.split('/').pop(), new Uint8Array(buf));
      written[u] = true;
    });
  }));
}

onmessage = function (e) {
  var m = e.data;
  current = m.id;
  ready.then(function (py) {
    return writeFiles(py, m.files).then(function () { return py; });
  }).then(function (py) {
    send('status', 'Loading ' + m.pkgs.join(', ') + '…');
    return py.loadPackage(m.pkgs, { messageCallback: function () {} }).then(function () {
      if (!numpyReady) {   // plain numbers in printed tuples and dicts, not np.float64(...)
        py.runPython('import numpy as np\nnp.set_printoptions(legacy="1.25")');
        numpyReady = true;
      }
      /* Importing pandas or SciPy takes seconds the first time; do it here,
         so "Ran in" times the reader's code, not the import. */
      var mod = { pandas: 'pandas', scipy: 'scipy.stats', 'scikit-learn': 'sklearn' };
      var heavy = m.pkgs.filter(function (p) { return mod[p]; }).map(function (p) { return mod[p]; });
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
