// Runs Python (Pyodide) off the main thread so an endless loop can be stopped by terminating the worker.
const base = new URL('../vendor/pyodide/', self.location.href).href;
importScripts(base + 'pyodide.js');

// The stdlib ships as a base64 script because some static hosts refuse .zip files.
let stdLibURL;
try {
  importScripts(base + 'python_stdlib.js');
  const raw = atob(self.PY_STDLIB_B64), bin = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) bin[i] = raw.charCodeAt(i);
  stdLibURL = URL.createObjectURL(new Blob([bin], { type: 'application/zip' }));
  delete self.PY_STDLIB_B64;
} catch (e) { stdLibURL = undefined; }

// Wheels (pandas, numpy and their deps) also ship as base64 scripts; Pyodide's fetch of a .whl is served from them.
const WHEELS = {
  'numpy-2.0.2-cp312-cp312-pyodide_2024_0_wasm32.whl': 'pkgs/numpy.js',
  'pandas-2.2.3-cp312-cp312-pyodide_2024_0_wasm32.whl': 'pkgs/pandas.js',
  'python_dateutil-2.9.0.post0-py2.py3-none-any.whl': 'pkgs/python_dateutil.js',
  'pytz-2024.1-py2.py3-none-any.whl': 'pkgs/pytz.js',
  'six-1.16.0-py2.py3-none-any.whl': 'pkgs/six.js',
  // scikit-learn and its deps; scipy is split in two because some hosts cap a single file at 16 MB.
  'scikit_learn-1.6.1-cp312-cp312-pyodide_2024_0_wasm32.whl': 'pkgs/scikit_learn.js',
  'scipy-1.14.1-cp312-cp312-pyodide_2024_0_wasm32.whl': ['pkgs/scipy.1.js', 'pkgs/scipy.2.js'],
  'joblib-1.4.0-py3-none-any.whl': 'pkgs/joblib.js',
  'threadpoolctl-3.5.0-py3-none-any.whl': 'pkgs/threadpoolctl.js',
  'openblas-0.3.26.zip': 'pkgs/openblas.js'
};
const realFetch = self.fetch.bind(self);
self.fetch = (input, init) => {
  const url = String(input && input.url || input);
  const name = url.split('/').pop().split('?')[0];
  if (WHEELS[name]) {
    try {
      [].concat(WHEELS[name]).forEach(f => importScripts(base + f));
      const raw = atob(self.PY_WHEEL[name]), bin = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; i++) bin[i] = raw.charCodeAt(i);
      delete self.PY_WHEEL[name];
      return Promise.resolve(new Response(bin, { status: 200, headers: { 'Content-Type': 'application/octet-stream' } }));
    } catch (err) { return Promise.reject(err); }
  }
  return realFetch(input, init);
};
let pandasReady = null, sklearnReady = null;
const filesWritten = new Set();

let pyReady = loadPyodide({ indexURL: base, stdLibURL }).then(py => { self.postMessage({ type: 'ready' }); return py; })
  .catch(err => { self.postMessage({ type: 'fatal', error: String(err && err.message || err) }); throw err; });

self.onmessage = async (e) => {
  const { id, code, tests, files } = e.data;
  let py;
  try { py = await pyReady; } catch (err) { self.postMessage({ id, ok: false, stdout: '', error: 'Python ортасы жүктелмеді: ' + err }); return; }
  if (files) for (const [name, text] of Object.entries(files)) {
    if (filesWritten.has(name)) continue;
    py.FS.writeFile('/home/pyodide/' + name, text);
    filesWritten.add(name);
  }
  if (/\bsklearn\b/.test(code + (tests || ''))) {
    if (!sklearnReady) sklearnReady = py.loadPackage(['pandas', 'scikit-learn'], { messageCallback: () => {}, checkIntegrity: false });
    try { await sklearnReady; } catch (err) { sklearnReady = null; self.postMessage({ id, ok: false, stdout: '', error: 'scikit-learn жүктелмеді: ' + err }); return; }
  }
  if (/\b(pandas|numpy)\b/.test(code + (tests || ''))) {
    if (!pandasReady) pandasReady = py.loadPackage(['pandas'], { messageCallback: () => {}, checkIntegrity: false });
    try { await pandasReady; } catch (err) { pandasReady = null; self.postMessage({ id, ok: false, stdout: '', error: 'pandas жүктелмеді: ' + err }); return; }
  }
  const out = [];
  py.setStdout({ batched: s => out.push(s) });
  py.setStderr({ batched: s => out.push(s) });
  py.setStdin({ stdin: () => { throw new Error('input() бұл ортада қолжетімсіз: мәнді айнымалыға тікелей жазыңыз.'); } });
  const ns = py.globals.get('dict')();
  let error = null, testError = null;
  try {
    py.runPython(code, { globals: ns });
  } catch (err) {
    error = cleanTrace(String(err.message || err));
  }
  if (!error && tests) {
    try { py.runPython(tests, { globals: ns }); }
    catch (err) { testError = cleanTrace(String(err.message || err)); }
  }
  ns.destroy();
  self.postMessage({ id, ok: !error && !testError, stdout: out.join('\n'), error, testError });
};

function cleanTrace(msg) {
  // Keep only the user's frames: drop Pyodide internals.
  const lines = msg.split('\n');
  const keep = [];
  let skipping = false;
  for (const l of lines) {
    if (l.includes('/lib/python') || l.includes('_pyodide') || l.includes('pyodide/')) { skipping = true; continue; }
    if (skipping && l.startsWith('    ')) continue;
    skipping = false;
    keep.push(l);
  }
  return keep.join('\n').replace(/File "<exec>"/g, 'Код').trim();
}
