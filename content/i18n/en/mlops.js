// M6.3 MLOps Basics and M6.5 Cloud & Data Eng Basics: English text. Code, solutions and expected output are in content/mlops.js.
DJ.i18n.patch({
  modules: {
    'm6-3': { intro: 'Training a model in a notebook is only half the job. In this module you learn to log experiments, reproduce results, use a model registry and CI, monitor in production and detect data drift.' },
    'm6-5': { intro: 'Underneath analytics sits infrastructure: where data is stored, who moves it, and how much it costs. In this module you learn the difference between OLTP and OLAP, warehouse / lake / lakehouse, star schema, ETL vs ELT, batch vs streaming, and the basics of Airflow, dbt, Spark and cloud services.' }
  },
  lessons: {
    'ops-1': {
      title: 'ML lifecycle: what happens to a model after the notebook',
      body: `
<p><b>MLOps</b> is a set of practices for reliably shipping ML models to production, monitoring them and updating them. DevOps automates delivering software; MLOps adds two more things to it: <b>data</b> and the <b>model</b> change over time.</p>
<h3>Stages of the ML lifecycle</h3>
<ol>
<li><b>Problem framing</b>: the business question and the metric. "Which subscriber will leave next month? Recall at least 0.7."</li>
<li><b>Data collection</b>: gathering data from billing, CRM, call-center.</li>
<li><b>Data preparation</b>: cleaning, building features.</li>
<li><b>Training & evaluation</b>: models, hyperparameters, validation.</li>
<li><b>Deployment</b>: running the model as an API or a batch job.</li>
<li><b>Monitoring</b>: latency, errors, the distribution of predictions, drift.</li>
<li><b>Retraining</b>: training again on new data, that is, going back to stage 2.</li>
</ol>
<p>This is not a line but a <b>cycle</b>: when monitoring finds a problem, we go back to the data.</p>
<h3>Example: a telecom operator in Almaty</h3>
<p>In March a data scientist trained a churn model, with AUC = 0.84 on test. In May the company launched a new "Unlimited" plan. Subscriber behavior changed, but the model knows nothing about it. In June the retention team complains: "the model gives us the wrong people to call". With monitoring, the problem would have been visible back in May.</p>
<h3>Hidden technical debt</h3>
<p>As Google's well-known paper "Hidden Technical Debt in ML Systems" showed, in a real ML system the model code is only a small part. The rest is data collection, validation, feature pipelines, serving infrastructure and monitoring. So the goal of MLOps is to bring order to this part "outside the model".</p>
<div class="tip">Three levels of MLOps maturity: <b>0</b>: everything by hand (notebook → pickle → email), <b>1</b>: the training pipeline is automated, <b>2</b>: there is CI/CD and automatic retraining. Many companies are somewhere between 0 and 1, and that is normal.</div>`,
      ex: [
        { prompt: 'You are given the hours a team spent on each stage of one project. Store in <code>train_share</code> what percentage of all the time went to <b>training the model</b> (<code>training</code>) (a number from 0 to 100).', check: { tests: "assert train_share is not None, 'Put a number into train_share'\nassert abs(float(train_share) - 9.375) < 0.01, f'train_share should be ≈ 9.375 (15 / 160 * 100), you have {train_share}'" }, hints: ['All hours: <code>sum(hours.values())</code>', '<code>hours[\'training\'] / sum(hours.values()) * 100</code>'] },
        { prompt: 'The lifecycle is a cycle. Write <code>next_stage(stage)</code>: it should return the next stage in the <code>STAGES</code> list, and after <code>\'monitoring\'</code> it should go back to <code>\'data\'</code>. If the stage is not in the list, raise <code>ValueError</code>.', check: { tests: "assert next_stage('data') == 'training', \"next_stage('data') → 'training'\"\nassert next_stage('deployment') == 'monitoring', \"next_stage('deployment') → 'monitoring'\"\ntry:\n    _r = next_stage('monitoring')\nexcept Exception as _e:\n    _r = _e\nassert _r == 'data', \"After monitoring the cycle should go back to the start ('data'). Use % len(STAGES)\"\n_ok = False\ntry:\n    next_stage('marketing')\nexcept ValueError:\n    _ok = True\nassert _ok, 'Raise ValueError for an unknown stage'" }, hints: ['The remainder operator: <code>(i + 1) % len(STAGES)</code>', '<code>if stage not in STAGES: raise ValueError(...)</code>'] },
        { prompt: 'In March the churn model gave AUC = 0.84; in June the business says "the model got worse". Which lifecycle stage should have caught this earlier?', options: ['Problem framing', 'Training', 'Monitoring', 'Data collection'], explain: 'Monitoring is what tracks model quality and data changes in production. Without it, users are the first to notice the problem.' },
        { prompt: 'What sets MLOps apart from ordinary DevOps?', options: ['Code is not stored in Git', 'Even if the code does not change, the system can degrade because the data changes', 'Tests are not needed at all', 'Deployment is always done by hand'], explain: 'An ML system\'s behavior depends not only on the code but also on the data. When the world changes, the model degrades without a single line of code changing.' }
      ]
    },
    'ops-2': {
      title: 'Experiment tracking: the idea behind MLflow',
      body: `
<p>In one week you trained 40 models: different <code>max_depth</code>, features, data versions. To answer "Which one was best, and with what parameters did I get it?" you need <b>experiment tracking</b>. The best-known tool is <b>MLflow</b>.</p>
<h3>Core MLflow concepts</h3>
<ul>
<li><b>Experiment</b>: a group of runs for one task, for example <code>churn-almaty</code>.</li>
<li><b>Run</b>: one training. Each run has its own id.</li>
<li><b>Params</b>: input settings: <code>max_depth=5</code>, <code>features=v2</code>.</li>
<li><b>Metrics</b>: result numbers: <code>val_auc=0.83</code>.</li>
<li><b>Artifacts</b>: files: the model itself, charts, a confusion matrix.</li>
</ul>
<h3>What it looks like in MLflow</h3>
<pre><code>import mlflow
from sklearn.tree import DecisionTreeClassifier

mlflow.set_experiment('churn-almaty')
for depth in [3, 5, 8]:
    with mlflow.start_run(run_name=f'tree-d{depth}'):
        model = DecisionTreeClassifier(max_depth=depth, random_state=42)
        model.fit(X_train, y_train)
        auc = roc_auc_score(y_val, model.predict_proba(X_val)[:, 1])
        mlflow.log_param('max_depth', depth)
        mlflow.log_metric('val_auc', auc)
        mlflow.sklearn.log_model(model, 'model')</code></pre>
<p>Later, the <code>mlflow ui</code> command shows all runs as a table that you can sort by metric. And <code>mlflow.search_runs(order_by=['metrics.val_auc DESC'])</code> returns the runs as a pandas DataFrame.</p>
<h3>Our stub in the browser</h3>
<p>There is no MLflow in the browser, so the exercises use a small <code>Tracker</code> class that repeats the same idea: each run is a dict with <code>{'name', 'params', 'metrics'}</code>. The concepts are the same; only the storage is memory.</p>
<div class="tip">Rule: <b>an experiment that was not logged never happened</b>. Do not copy results by hand into a notebook or Slack. Compute the metric on the <b>validation</b> data and keep test for the final choice.</div>
<h3>Common mistakes</h3>
<ul>
<li>Logging only the metric, not the parameters: "I got 0.86, but I do not know how."</li>
<li>Not logging the data version. Next month the same code gives a different result.</li>
<li>Choosing the best run by the test metric: that is overfitting to test.</li>
</ul>`,
      ex: [
        { prompt: 'The <code>results</code> list holds the results of three experiments. For each one, open a run with <code>tracker.start_run(name)</code>, log <code>max_depth</code> as a param and <code>val_auc</code> as a metric.', check: { tests: "assert len(tracker.runs) == 3, f'There should be 3 runs, you have {len(tracker.runs)}'\nassert [r['name'] for r in tracker.runs] == ['tree-d3', 'tree-d5', 'tree-d8'], 'Run names should follow the order in results'\nassert all(r['params'].get('max_depth') == d for r, d in zip(tracker.runs, [3, 5, 8])), \"params should have the key 'max_depth'\"\nassert all(abs(r['metrics'].get('val_auc', -1) - a) < 1e-9 for r, a in zip(tracker.runs, [0.781, 0.826, 0.804])), \"metrics should have the key 'val_auc'\"" }, hints: ['<code>for name, depth, auc in results:</code>', '<code>run = tracker.start_run(name)</code>, then <code>tracker.log_param(run, \'max_depth\', depth)</code>'] },
        { prompt: 'Write <code>best_run(runs, metric, higher_is_better=True)</code>: it returns the best run (a dict) by the given metric. If <code>higher_is_better=False</code> (for example RMSE), the smallest is best. Runs without the metric are not counted.', check: { tests: "assert best_run(runs, 'val_auc')['name'] == 'tree', 'The best by val_auc is tree'\nassert best_run(runs, 'val_logloss', higher_is_better=False)['name'] == 'forest', 'The lower the logloss, the better: forest'\n_r2 = [{'name': 'a', 'params': {}, 'metrics': {}}, {'name': 'b', 'params': {}, 'metrics': {'rmse': 3.0}}, {'name': 'c', 'params': {}, 'metrics': {'rmse': 2.0}}]\nassert best_run(_r2, 'rmse', higher_is_better=False)['name'] == 'c', 'Drop runs without the metric, then take the smallest'" }, hints: ['Filter first: <code>[r for r in runs if metric in r[\'metrics\']]</code>', '<code>max(valid, key=lambda r: r[\'metrics\'][metric])</code>, and <code>min</code> in the other case'] },
        { prompt: 'How are <code>max_depth=5</code> and <code>val_auc=0.83</code> logged in MLflow?', options: ['Both as metrics', 'max_depth is a param, val_auc is a metric', 'max_depth is an artifact, val_auc is a param', 'Both as artifacts'], explain: 'A param is a setting that goes into training; a metric is a quality number that comes out of it. An artifact is a file (a model, an image).' }
      ]
    },
    'ops-3': {
      title: 'Reproducibility: seeds, versions, data versioning',
      body: `
<p><b>Reproducibility</b> means another person (or you three months from now) runs the same code and gets <b>exactly the same</b> result. For that, four things must be pinned: the code, the data, the library versions and the randomness.</p>
<h3>1. Randomness: the seed</h3>
<p><code>train_test_split</code>, <code>RandomForest</code>, taking a sample of the data all use random numbers. Without a seed, the result is slightly different on every run.</p>
<pre><code>import numpy as np
rng = np.random.default_rng(42)          # the new numpy API
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42)
model = RandomForestClassifier(random_state=42)</code></pre>
<h3>2. Library versions</h3>
<p>scikit-learn 1.3 and 1.6 may have a different default value for the same parameter. So pin the exact version in <code>requirements.txt</code>:</p>
<pre><code>pandas==2.2.3
scikit-learn==1.6.1
numpy==2.1.3</code></pre>
<p>Even more reliable is a Docker image: it pins Python itself too.</p>
<h3>3. Data versioning</h3>
<p>Code lives in Git, but a 2 GB CSV does not fit in Git. The idea: compute a <b>hash of the data content</b> (a fingerprint) and log it with the run. If a single byte changes, the hash changes completely. This is how the <b>DVC</b> tool works: Git stores a small <code>.dvc</code> file (with the hash), while the file itself sits in S3 or GCS.</p>
<pre><code>import hashlib
with open('churn.csv', 'rb') as f:
    digest = hashlib.sha256(f.read()).hexdigest()[:12]
mlflow.log_param('data_sha', digest)   # for example '3fa9c01b7e2d'</code></pre>
<h3>4. Code</h3>
<p>The Git commit hash is logged with the run too (MLflow does this itself). Then the question "Which code trained this model?" has an answer in one second.</p>
<div class="tip">How to check: run the pipeline twice in a clean environment. If the metrics do not match to the 4th decimal place, a seed is missing somewhere.</div>`,
      ex: [
        { prompt: 'Write <code>fingerprint(text)</code>: it returns the first 12 hex characters of the SHA-256 hash of the text (<code>hashlib</code>; turn the text into bytes with <code>.encode(\'utf-8\')</code>). Then store the fingerprints of the <code>v1</code> and <code>v2</code> data in <code>fp1</code> and <code>fp2</code>.', check: { tests: "import hashlib as _h\nassert fingerprint('abc') == _h.sha256(b'abc').hexdigest()[:12], 'Return sha256(...).hexdigest()[:12]'\nassert len(fp1) == 12 and fp1 != fp2, 'If one character changes, the fingerprint must change too'\nassert fp1 == fingerprint(v1), 'The same text always gives the same fingerprint'" }, hints: ['<code>hashlib.sha256(text.encode(\'utf-8\'))</code>', '<code>.hexdigest()[:12]</code>'] },
        { prompt: 'For an A/B test, 5 subscribers are picked at random, but the list changes on every run. Fix <code>sample_ids(seed)</code>: use <code>np.random.default_rng(seed)</code> and return the result of <code>rng.choice(ids, 5, replace=False)</code> as a list.', check: { tests: "import numpy as _np\n_ref = list(_np.random.default_rng(42).choice(list(range(1001, 1101)), 5, replace=False))\nassert [int(x) for x in sample_ids(42)] == [int(x) for x in _ref], 'default_rng(seed): pass the seed'\nassert [int(x) for x in sample_ids(7)] == [int(x) for x in sample_ids(7)], 'One seed, one result'" }, hints: ['The problem is on the <code>default_rng()</code> line: nothing in the parentheses', '<code>np.random.default_rng(seed)</code>'] },
        { prompt: 'A colleague ran your code and got AUC 0.81, not 0.83. Seeds are set and the data is the same. What is the most likely cause?', options: ['Their computer is slow', 'Library versions are not pinned (no == in requirements.txt)', 'They use a different browser', 'AUC is always random'], explain: 'Another library version may have different default parameters or internal calculations. Pin versions with <code>==</code>.' }
      ]
    },
    'ops-4': {
      title: 'Model registry and stages',
      body: `
<p>Experiment tracking answers "Which models were trained?". A <b>model registry</b> answers the next question: "<b>Which model</b> is running in production right now, and which one was there before it?"</p>
<h3>What the registry stores</h3>
<ul>
<li><b>Registered model</b>: a model with a name, for example <code>churn-model</code>.</li>
<li><b>Version</b>: each of its versions: v1, v2, v3. Each version points to a specific run (params, metrics, data_sha).</li>
<li><b>Stage</b> or <b>alias</b>: the state of the version.</li>
</ul>
<h3>Classic stages</h3>
<table>
<tr><th>Stage</th><th>Meaning</th></tr>
<tr><td>None</td><td>Just registered, nobody has checked it</td></tr>
<tr><td>Staging</td><td>Under test: shadow mode, A/B test</td></tr>
<tr><td>Production</td><td>Serving predictions to real customers (usually only one)</td></tr>
<tr><td>Archived</td><td>An old version, but not deleted: needed for rollback</td></tr>
</table>
<p>Newer MLflow versions offer more flexible <b>aliases</b> instead of stages: for example <code>@champion</code> (production) and <code>@challenger</code> (the contender). The idea is the same: serving code loads the model not by number but <b>by name</b>.</p>
<pre><code>import mlflow
client = mlflow.MlflowClient()
client.set_registered_model_alias('churn-model', 'champion', version=3)

# serving side: loads by alias, not by number
model = mlflow.pyfunc.load_model('models:/churn-model@champion')</code></pre>
<h3>Why it matters</h3>
<p>"Dala Mobile" put model v3 into production. Two days later the call-center says "the recommendations look odd". With a registry, rollback is one command: point the alias back to v2. No new deploy, no new code.</p>
<div class="tip">Promotion rule: a new version goes to production only if (1) its validation metric beats the current production one, (2) data validation passed, and (3) it was tested in staging. The old production version becomes <b>Archived</b>; it is not deleted.</div>`,
      ex: [
        { prompt: 'Write <code>get_production(registry, name)</code>: it returns the dict of the version with <code>stage == \'Production\'</code>, or <code>None</code> if there is no such version.', check: { tests: "_p = get_production(registry, 'churn-model')\nassert _p is not None and _p['version'] == 2, 'The production version of churn-model is v2'\nassert get_production(registry, 'price-model') is None, 'If there is no Production version, return None'" }, hints: ['<code>for v in registry[name]:</code> and <code>if v[\'stage\'] == \'Production\': return v</code>', 'When the loop ends, <code>return None</code>'] },
        { prompt: 'Fix <code>promote(registry, name, version)</code>. It should: (1) make the given version <code>Production</code>, (2) move the previous <code>Production</code> version to <code>Archived</code>, (3) raise <code>ValueError</code> if the version does not exist, (4) return the dict of the new production version. There must always be only one Production.', check: { tests: "_reg = {'m': [{'version': 1, 'stage': 'Archived'}, {'version': 2, 'stage': 'Production'}, {'version': 3, 'stage': 'Staging'}]}\n_r = promote(_reg, 'm', 3)\n_st = {v['version']: v['stage'] for v in _reg['m']}\nassert _st[3] == 'Production', 'v3 should be Production'\nassert _st[2] == 'Archived', 'The previous production version (v2) should become Archived'\nassert list(_st.values()).count('Production') == 1, 'There should be only one Production'\nassert _r is not None and _r['version'] == 3, 'Return the dict of the new production version'\n_ok = False\ntry:\n    promote(_reg, 'm', 9)\nexcept ValueError:\n    _ok = True\nassert _ok, 'Raise ValueError for a version that does not exist'\nassert [v['stage'] for v in _reg['m']] == ['Archived', 'Archived', 'Production'], 'The registry must not change when the version is wrong'" }, hints: ['First find the target version; if it is missing, <code>raise ValueError(...)</code>. Only then change the stages.', 'Set every <code>Production</code> version to <code>Archived</code>, then <code>target[\'stage\'] = \'Production\'</code>'] },
        { prompt: 'The new model v4 started giving wrong predictions in production. With a registry in place, what is the fastest correct action?', options: ['Delete v4 from the registry and retrain the model', 'Point the @champion alias (or the Production stage) back to the previous version', 'Hard-code the v3 file path in the serving code and redeploy', 'Turn off monitoring'], explain: 'The main benefit of a registry is rollback: serving loads the model by name, so switching the alias to the old version is enough. Do not delete v4: you need it to analyze the error.' }
      ]
    },
    'ops-5': {
      title: 'CI for ML: GitHub Actions and a metric gate',
      body: `
<p><b>CI</b> (continuous integration) means automatic checks run on every pull request. In ordinary software these are unit tests. An ML project adds two more layers: <b>data tests</b> and a <b>model quality gate</b>: if the metric drops, the build fails.</p>
<h3>Example GitHub Actions workflow</h3>
<pre><code># .github/workflows/model-ci.yml
name: model-ci
on: [pull_request]
jobs:
  train-and-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - run: pip install -r requirements.txt
      - run: pytest tests/                      # unit tests for the features code
      - run: python validate_data.py data/sample.csv
      - run: python train.py --out metrics.json # train on a small sample
      - run: python check_metrics.py metrics.json baseline.json</code></pre>
<p>Each <code>run</code> step is a terminal command. If the command returns a <b>non-zero exit code</b> (for example <code>sys.exit(1)</code>), GitHub marks the step red and blocks the PR from being merged (if branch protection is on).</p>
<h3>check_metrics.py</h3>
<pre><code>import json, sys
new = json.load(open(sys.argv[1]))
base = json.load(open(sys.argv[2]))
errors = check_metrics(new, base, max_drop=0.01)
for e in errors:
    print('FAIL:', e)
sys.exit(1 if errors else 0)</code></pre>
<p>We move the logic itself into a separate <code>check_metrics</code> function: it is easy to test, and <code>sys.exit</code> comes only at the very end.</p>
<h3>What gets checked</h3>
<ul>
<li><b>Relative threshold</b>: the new AUC must not be more than 0.01 below the baseline.</li>
<li><b>Absolute threshold</b>: AUC must never be below 0.75.</li>
<li><b>Data tests</b>: required columns exist, <code>customer_id</code> has no empty values, <code>monthly_fee</code> is not negative.</li>
</ul>
<div class="tip">Do not train for hours on the full data in CI. A small pinned sample and a seed are enough: the goal is to check that "nothing is broken", not to find the best model.</div>`,
      ex: [
        { prompt: 'Write <code>check_metrics(new, baseline, max_drop=0.01, min_auc=0.75)</code>. It returns a <b>list</b> of error messages (an empty list = the build passed). Rules: for each metric in <code>baseline</code>, (1) if it is missing from <code>new</code>, that is an error; (2) if <code>new[m] &lt; baseline[m] - max_drop</code>, that is an error. Also, (3) if <code>new[\'auc\'] &lt; min_auc</code>, that is an error. For every metric, "higher is better".', check: { tests: "assert check_metrics({'auc': 0.83, 'recall': 0.70}, {'auc': 0.83, 'recall': 0.70}) == [], 'If the metrics did not change, there are no errors'\nassert check_metrics({'auc': 0.825, 'recall': 0.70}, {'auc': 0.83, 'recall': 0.70}) == [], 'A drop of 0.005 is within max_drop (0.01), no errors'\nassert len(check_metrics({'auc': 0.80, 'recall': 0.70}, {'auc': 0.83, 'recall': 0.70})) == 1, 'auc fell by 0.03: there should be one error'\nassert len(check_metrics({'auc': 0.80, 'recall': 0.60}, {'auc': 0.83, 'recall': 0.70})) == 2, 'Both metrics fell: two errors'\nassert len(check_metrics({'auc': 0.74}, {'auc': 0.745})) == 1, 'auc < min_auc: even if the relative threshold passes, the absolute threshold gives an error'\nassert len(check_metrics({'auc': 0.85}, {'auc': 0.83, 'recall': 0.70})) == 1, 'recall is missing from the new result: that is an error too'" }, hints: ['<code>for m, base in baseline.items():</code>, inside it <code>if m not in new</code> / <code>elif new[m] &lt; base - max_drop</code>', 'The absolute threshold goes outside the loop: <code>if new.get(\'auc\', 0) &lt; min_auc: errors.append(...)</code>'] },
        { prompt: 'A data test in CI. <code>validate_batch(df)</code> should return a list of problems: (1) for each missing column in <code>REQUIRED</code>, <code>\'missing:&lt;column&gt;\'</code>; (2) if <code>customer_id</code> has an empty value, <code>\'null_id\'</code>; (3) if <code>monthly_fee</code> has a negative value, <code>\'negative_fee\'</code>. If a column is missing, skip the check that uses it.', check: { tests: "_good = pd.DataFrame({'customer_id': [1, 2], 'monthly_fee': [5000, 0], 'tenure_months': [3, 10]})\nassert validate_batch(_good) == [], 'Correct data has no problems (0 tenge is not negative)'\n_b = validate_batch(pd.DataFrame({'customer_id': [1, None, 3], 'monthly_fee': [5000, -100, 7000]}))\nassert sorted(_b) == sorted(['missing:tenure_months', 'null_id', 'negative_fee']), f'Expected: missing:tenure_months, null_id, negative_fee. You have: {_b}'\nassert validate_batch(pd.DataFrame({'x': [1]})) == ['missing:customer_id', 'missing:monthly_fee', 'missing:tenure_months'], 'If a column is missing, only missing:... messages (in REQUIRED order), no KeyError'" }, hints: ['<code>if col not in df.columns: problems.append(f\'missing:{col}\')</code>', '<code>df[\'customer_id\'].isna().any()</code> and <code>(df[\'monthly_fee\'] &lt; 0).any()</code>'] },
        { prompt: 'When is a GitHub Actions step considered "failed"?', options: ['When the command prints something', 'When the command returns a non-zero exit code (for example sys.exit(1))', 'When the step runs longer than 10 seconds', 'When a Python warning appears'], explain: 'CI looks only at the exit code: 0 is success, anything else is failure. That is why check_metrics.py ends with <code>sys.exit(1 if errors else 0)</code>.' }
      ]
    },
    'ops-6': {
      title: 'Monitoring in production',
      body: `
<p>The model is deployed, so now it is a "live" system. Monitoring works on three levels:</p>
<table>
<tr><th>Level</th><th>What we measure</th><th>Example threshold</th></tr>
<tr><td>Service (operational)</td><td>latency (p50, p95), error rate, number of requests</td><td>p95 &gt; 300 ms, errors &gt; 2%</td></tr>
<tr><td>Data (input)</td><td>share of empty values, feature distributions, new categories</td><td>PSI &gt; 0.25</td></tr>
<tr><td>Model (output, quality)</td><td>distribution of predictions, the real metric (once labels arrive)</td><td>mean proba shifted by 0.1</td></tr>
</table>
<h3>Why p95 and not the mean?</h3>
<p>Mean latency may be 120 ms, while every 20th customer waits 2 seconds. <b>p95</b> (the 95th percentile) means 95% of requests are faster than this. It shows the "slow tail".</p>
<h3>Label delay</h3>
<p>In a churn model the real answer (did the subscriber leave?) is known only a month later. During that month we cannot measure quality directly. So we watch <b>proxy</b> signals: drift in the input data and the distribution of predictions. If the model usually says "will leave" for 25% of subscribers and suddenly says it for 45% in one week, something has changed.</p>
<h3>Example with pandas</h3>
<pre><code>logs = pd.read_csv('requests.csv')        # latency_ms, status, proba, week
p95 = logs['latency_ms'].quantile(0.95)
error_rate = (logs['status'] &gt;= 500).mean()
weekly = logs.groupby('week')['proba'].mean()</code></pre>
<p>In a real system Prometheus collects these numbers, the dashboard lives in Grafana, and when a threshold is crossed an alert goes to Slack or Telegram. Tools such as Evidently and WhyLabs provide data and model monitoring as ready-made reports.</p>
<div class="tip">Keep alerts few but meaningful. If 50 alerts arrive a day, the team stops reading them (alert fatigue). For every alert, write a runbook: "who does what?"</div>`,
      ex: [
        { prompt: 'From the <code>logs</code> DataFrame compute <code>p95</code>, the 95th percentile of <code>latency_ms</code> (<code>.quantile(0.95)</code>), and <code>error_rate</code>, the share of requests with <code>status &gt;= 500</code> (0–1). Then build the <code>alerts</code> list: <code>\'latency\'</code> if <code>p95 &gt; 300</code>, and <code>\'errors\'</code> if <code>error_rate &gt; 0.02</code> (in this order).', check: { tests: "assert abs(float(p95) - logs['latency_ms'].quantile(0.95)) < 1e-9, 'p95 = logs[\"latency_ms\"].quantile(0.95) (not the mean)'\nassert error_rate is not None and abs(float(error_rate) - 0.1) < 1e-9, 'error_rate = 2 / 20 = 0.1'\nassert alerts == ['latency', 'errors'], f\"alerts should be ['latency', 'errors'], you have {alerts}\"" }, hints: ['<code>logs[\'latency_ms\'].quantile(0.95)</code>', '<code>(logs[\'status\'] &gt;= 500).mean()</code>: the mean of True/False gives the share'] },
        { prompt: 'There are no labels yet, so we watch the distribution of predictions. <code>weekly</code> is the mean <code>proba</code> for each week (<code>groupby</code>), and <code>flagged</code> is the list of weeks (int) whose mean deviates from <code>BASELINE</code> by <b>more</b> than 0.1.', check: { tests: "assert weekly is not None and abs(float(weekly.loc[4]) - 0.43) < 1e-9, 'weekly = preds.groupby(\"week\")[\"proba\"].mean()'\nassert [int(x) for x in flagged] == [4], f'Only week 4 (0.43) crosses the threshold; week 3 is 0.34, a deviation of 0.09. You have {flagged}'" }, hints: ['<code>preds.groupby(\'week\')[\'proba\'].mean()</code>', '<code>[w for w, m in weekly.items() if abs(m - BASELINE) &gt; 0.1]</code>'] },
        { prompt: 'In one day the model API received 48 000 requests, and 360 of them ended with a 5xx error. What is the error rate in <b>percent</b>?', explain: '360 / 48 000 = 0.0075 = 0.75%.' },
        { prompt: 'The churn model\'s real labels arrive only after 30 days. How do we watch the model in the first week?', options: ['We cannot, we wait 30 days', 'We watch drift in the input features and the distribution of predictions', 'We retrain the model every day', 'We only look at CPU load'], explain: 'When labels are delayed, proxy signals are used: input drift and prediction drift. They show a drop in quality earlier.' }
      ]
    },
    'ops-7': {
      title: 'Data drift: PSI and KS',
      body: `
<p><b>Data drift</b> (covariate shift) means the distribution of input features differs from the one at training time: <code>P(X)</code> has changed. For example, at training time the mean <code>monthly_fee</code> was 7 500 ₸, and a year later prices went up and it is 11 000 ₸. The model\'s rules were made for the old world.</p>
<h3>PSI: Population Stability Index</h3>
<p>The most widely used measure. We split the feature into bins (usually 10) and compare the shares in the two distributions:</p>
<pre><code>PSI = Σ (actual_i − expected_i) × ln(actual_i / expected_i)</code></pre>
<p>Here <code>expected_i</code> is the share of the i-th bin in the reference (training) data, and <code>actual_i</code> is the share in the new data. To avoid dividing by zero, the shares get a small floor (for example 0.001).</p>
<table>
<tr><th>PSI</th><th>Meaning</th><th>Action</th></tr>
<tr><td>&lt; 0.1</td><td>No change</td><td>Nothing</td></tr>
<tr><td>0.1 – 0.25</td><td>Moderate drift</td><td>Watch, look for the cause</td></tr>
<tr><td>&gt; 0.25</td><td>Strong drift</td><td>Think about retraining</td></tr>
</table>
<h3>A worked example</h3>
<p>The reference has 25% in each bin; the new data is <code>[0.05, 0.15, 0.30, 0.50]</code>. First bin: <code>(0.05 − 0.25) × ln(0.05 / 0.25) = (−0.20) × (−1.609) = 0.322</code>. Adding the other three bins gives PSI ≈ 0.56: strong drift.</p>
<h3>KS statistic</h3>
<p>Kolmogorov–Smirnov takes the largest gap between two <b>cumulative distribution functions</b> (CDF): <code>D = max |F_ref(x) − F_cur(x)|</code>. It needs no bins, but it only works for continuous features. For categorical features, PSI or a simple "did a new category appear?" check is used.</p>
<pre><code>from scipy.stats import ks_2samp          # in a real project
stat, p = ks_2samp(ref_fee, cur_fee)       # stat = D</code></pre>
<div class="tip">Finding drift is a signal, not a diagnosis. Look for the cause first: did the customers really change, or did column positions shift in the ETL so that other data landed in <code>monthly_fee</code>? In the second case retraining will not help; you need to fix the pipeline.</div>`,
      ex: [
        { prompt: '<code>bin_props(x, bins)</code> should return the <b>share</b> of values in each bin defined by the <code>bins</code> edges (a list that sums to 1; <code>bins[i] &lt;= v &lt; bins[i+1]</code>). Then <code>psi(ref, cur, bins)</code> should return the PSI, with a floor of <code>0.001</code> on the shares. Compute <code>psi_drift</code> and <code>psi_stable</code>.', check: { tests: "import numpy as _np\nassert [round(p, 3) for p in bin_props(ref, BINS)] == [0.25, 0.25, 0.25, 0.25], f'In reference each bin should hold 25%, you have {bin_props(ref, BINS)}'\nassert [round(p, 3) for p in bin_props(drift, BINS)] == [0.05, 0.15, 0.3, 0.5], 'drift shares: 0.05, 0.15, 0.30, 0.50'\nassert abs(float(psi_drift) - 0.5554) < 0.002, f'psi_drift should be ≈ 0.555, you have {psi_drift}'\nassert abs(float(psi_stable) - 0.0203) < 0.002, f'psi_stable should be ≈ 0.020, you have {psi_stable}'\nassert abs(psi(ref, ref, BINS)) < 1e-9, 'For identical distributions PSI should be 0'" }, hints: ['Share: <code>((a &gt;= bins[i]) &amp; (a &lt; bins[i+1])).mean()</code> on a numpy array', 'PSI: <code>np.sum((a - e) * np.log(a / e))</code>, with <code>np.maximum(..., 0.001)</code> before it'] },
        { prompt: '<code>ks_stat(a, b)</code> should return the largest gap between the CDFs of two samples (without scipy). Method: combine the two samples, and for each value compute the "share of values less than or equal to this one" in both samples, then take the maximum difference.', check: { tests: "assert abs(float(d) - 0.35) < 1e-6, f'For ref and drift D = 0.35, you have {d}'\nassert abs(ks_stat(ref, ref)) < 1e-9, 'Comparing a sample with itself gives D = 0'\nassert abs(ks_stat([1, 2, 3, 4], [5, 6, 7, 8]) - 1.0) < 1e-9, 'If the distributions do not overlap at all, D = 1'\nassert abs(ks_stat([1, 2, 3, 4], [1, 2, 3, 9]) - 0.25) < 1e-9, f'For [1,2,3,4] and [1,2,3,9] D = 0.25'" }, hints: ['<code>(a &lt;= v).mean()</code>: the share of values in a that do not exceed v', 'Update the maximum inside <code>for v in np.concatenate([a, b]):</code>'] },
        { prompt: 'A bin\'s share is 0.40 in the reference and 0.20 in the new data. How much does this bin add to the PSI? (<code>(0.20 − 0.40) × ln(0.20 / 0.40)</code>, to three decimals)', explain: 'ln(0.5) = −0.693, (−0.2) × (−0.693) = 0.1386. Each PSI term is always ≥ 0, so PSI is never negative.' },
        { prompt: 'A feature\'s PSI came out at 0.42. What is the first action?', options: ['Retrain the model right away', 'Remove the feature from the model', 'Check the cause of the drift: a real change or a pipeline bug', 'Raise the monitoring threshold to 0.5'], explain: 'Strong drift is often an ETL bug (a column shifted, the unit changed, nulls turned into 0). Find the cause first, then decide.' }
      ]
    },
    'ops-8': {
      title: 'Concept drift and retraining triggers',
      body: `
<p>You need to tell two kinds of breakage apart:</p>
<table>
<tr><th>Type</th><th>Formula</th><th>Example</th></tr>
<tr><td><b>Data drift</b></td><td><code>P(X)</code> changed, <code>P(y|X)</code> is the same</td><td>Subscribers got older, but the pattern "many calls = will leave" still holds</td></tr>
<tr><td><b>Concept drift</b></td><td><code>P(y|X)</code> changed</td><td>A competitor launched a cheap plan: now even high-paying customers leave, though they used to be the most loyal</td></tr>
<tr><td><b>Label shift</b></td><td><code>P(y)</code> changed</td><td>Churn grew from 8% to 20%</td></tr>
</table>
<p>Concept drift is more dangerous: the input data may look the same while the model\'s rule is wrong. We only see it for sure once labels arrive.</p>
<h3>Types of concept drift</h3>
<ul>
<li><b>Sudden</b>: in one day (a new plan, a new law, a pandemic).</li>
<li><b>Gradual</b>: little by little over months (customer behavior changing).</li>
<li><b>Seasonal</b>: recurring (the Nauryz holiday, a new school year). Here the right fix is not retraining but adding seasonal features (month, is_holiday).</li>
</ul>
<h3>Retraining triggers</h3>
<ol>
<li><b>On a schedule (scheduled)</b>: once a week, once a month. Simple, predictable, and enough in many cases.</li>
<li><b>By metric (performance-based)</b>: if the real AUC drops below the baseline by more than a set threshold.</li>
<li><b>By drift</b>: if the PSI of key features is &gt; 0.25.</li>
<li><b>By data volume</b>: if 50 000 new labels have piled up since the last retraining.</li>
<li><b>Manual</b>: a known business change (a new plan was launched).</li>
</ol>
<h3>How to guard retraining</h3>
<p>Automatic retraining is a dangerous tool: a model trained on bad data may reach production on its own. So the pipeline always has safeguards: (1) data validation, (2) comparing the new model with the current production one on the same validation set, (3) if it is better: Staging, shadow mode, then Production, (4) if it is worse: the old model stays and the team is notified.</p>
<div class="tip">Rule: "retrain" does not mean "automatic deploy". Training is automatic; promotion comes after checks.</div>`,
      ex: [
        { prompt: 'Write <code>should_retrain(state)</code>: it returns the list of triggers (in order). Rules: <code>days_since_train &gt;= 30</code> → <code>\'scheduled\'</code>; <code>current_auc</code> is present (not None) and <code>baseline_auc - current_auc &gt; 0.03</code> → <code>\'performance\'</code>; <code>max_psi &gt; 0.25</code> → <code>\'drift\'</code>; <code>new_labels &gt;= 50000</code> → <code>\'data_volume\'</code>. Keep the list in this order.', check: { tests: "_ok = {'days_since_train': 5, 'baseline_auc': 0.83, 'current_auc': 0.82, 'max_psi': 0.08, 'new_labels': 1000}\nassert should_retrain(_ok) == [], 'If everything is normal, the list is empty'\nassert should_retrain({'days_since_train': 12, 'baseline_auc': 0.83, 'current_auc': 0.78, 'max_psi': 0.31, 'new_labels': 12000}) == ['performance', 'drift'], \"Expected ['performance', 'drift']\"\nassert should_retrain({'days_since_train': 31, 'baseline_auc': 0.83, 'current_auc': None, 'max_psi': 0.3, 'new_labels': 60000}) == ['scheduled', 'drift', 'data_volume'], 'If current_auc is None, performance is not checked (no TypeError)'\nassert should_retrain({'days_since_train': 30, 'baseline_auc': 0.83, 'current_auc': 0.80, 'max_psi': 0.25, 'new_labels': 50000}) == ['scheduled', 'data_volume'], 'Boundaries: a drop of exactly 0.03 and psi of exactly 0.25 are not triggers, 30 days and 50000 labels are'" }, hints: ['<code>cur = state.get(\'current_auc\')</code>, then <code>if cur is not None and ...</code>', 'Pay attention to strict vs non-strict inequalities: <code>&gt;= 30</code>, <code>&gt; 0.03</code>, <code>&gt; 0.25</code>, <code>&gt;= 50000</code>'] },
        { prompt: 'Guarding retraining. Write <code>promote_or_keep(new_auc, prod_auc, data_ok, min_gain=0.005)</code>: if <code>data_ok</code> is False, return <code>\'blocked: bad data\'</code>; if the new model is below <code>prod_auc + min_gain</code>, return <code>\'keep current\'</code>; otherwise return <code>\'promote to staging\'</code>.', check: { tests: "assert promote_or_keep(0.90, 0.83, False) == 'blocked: bad data', 'If the data is bad, the result is blocked whatever the metric'\nassert promote_or_keep(0.84, 0.83, True) == 'promote to staging', 'A gain of +0.01 is enough'\nassert promote_or_keep(0.832, 0.83, True) == 'keep current', 'A gain of +0.002 is below min_gain'\nassert promote_or_keep(0.80, 0.83, True) == 'keep current', 'A worse model does not go to production'\nassert promote_or_keep(0.84, 0.83, True, min_gain=0.02) == 'keep current', 'The min_gain parameter must be taken into account'" }, hints: ['First of all, <code>if not data_ok:</code>', '<code>if new_auc &lt; prod_auc + min_gain: return \'keep current\'</code>'] },
        { prompt: 'A competitor launched a cheap plan, and now even loyal customers on expensive plans have started to leave. What is this?', options: ['Data drift: P(X) changed', 'Concept drift: P(y|X) changed', 'Overfitting', 'Data leakage'], explain: 'The features are the same (fee, tenure), but their link to churn has changed. That is concept drift, and only retraining on new labels fixes it.' },
        { prompt: 'Write a <b>retraining policy</b> for the "Dala Mobile" churn model (at least 70 words): which triggers, which thresholds, how the new model is checked after retraining, who decides on promotion, and what happens if the result is worse. Then grade yourself honestly on three criteria. To pass, each criterion needs at least <b>3 / 4</b>.', criteria: [
          { name: 'Triggers and thresholds', levels: ['No triggers named', 'Only "we will retrain if needed"', 'Concrete triggers (schedule, metric or drift)', 'At least two triggers with concrete numeric thresholds (for example 30 days, ΔAUC > 0.03, PSI > 0.25)'] },
          { name: 'Safeguards and promotion', levels: ['Not mentioned', 'The new model goes straight to production', 'There is data validation or a comparison with the current model', 'Validation, comparison, staging/shadow and the action if the result is worse (the old model stays + alert) are described'] },
          { name: 'Ownership and oversight', levels: ['Unclear who does what', 'A vague "the team will look"', 'A concrete role (ML engineer / data scientist) and a review schedule', 'Roles, the alert channel, the rollback procedure and who approves the decision are described'] }
        ] }
      ]
    },
    'ops-gate': {
      title: 'Module exam: MLOps Basics',
      body: `
<p>Final check: tracking, the CI gate, drift and retraining. No hints. The pass mark is 75%.</p>`,
      ex: [
        { prompt: 'Write <code>pick_candidate(runs, min_auc=0.80)</code>, which picks a production candidate from the runs. A run qualifies if <code>metrics</code> has <code>val_auc</code> and it is <code>&gt;= min_auc</code>, <code>params</code> has <code>data_sha</code> (reproducibility), and <code>params[\'seed\']</code> exists. Among the qualifying runs, return the one with the highest <code>val_auc</code>; if none qualifies, return <code>None</code>.', check: { tests: "_r = pick_candidate(runs)\nassert _r is not None and _r['name'] == 'd', f\"Only d meets every condition (b has no data_sha, c has no seed, a is worse, e has no metric). You have {_r['name'] if _r else None}\"\nassert pick_candidate(runs, min_auc=0.90) is None, 'If none passes, return None'\n_r2 = [{'name': 'x', 'params': {'seed': 1, 'data_sha': 'aa'}, 'metrics': {'val_auc': 0.81}},\n       {'name': 'y', 'params': {'seed': 1, 'data_sha': 'aa'}, 'metrics': {'val_auc': 0.95}}]\nassert pick_candidate(_r2)['name'] == 'y', 'Pick the best among the valid ones'" } },
        { prompt: 'Write the full CI gate: <code>ci_gate(new, baseline, psi_by_feature)</code> → an <code>(ok, errors)</code> tuple. Rules: every metric in <code>baseline</code> must be present in <code>new</code> and not more than 0.01 below it (error: <code>\'metric:&lt;name&gt;\'</code>); for every feature in <code>psi_by_feature</code> with PSI &gt; 0.25, add <code>\'psi:&lt;feature&gt;\'</code> (features in dict order). <code>ok</code> is True if there are no errors.', check: { tests: "_ok, _e = ci_gate({'auc': 0.83, 'recall': 0.70}, {'auc': 0.83, 'recall': 0.70}, {'monthly_fee': 0.05})\nassert _ok is True and _e == [], 'If everything is fine: (True, [])'\n_ok, _e = ci_gate({'auc': 0.80}, {'auc': 0.83}, {'monthly_fee': 0.30, 'tenure_months': 0.10})\nassert _ok is False and _e == ['metric:auc', 'psi:monthly_fee'], f\"Expected ['metric:auc', 'psi:monthly_fee'], you have {_e}\"\n_ok, _e = ci_gate({'auc': 0.83}, {'auc': 0.83, 'recall': 0.70}, {})\nassert _e == ['metric:recall'], 'A missing metric is an error too'\n_ok, _e = ci_gate({'auc': 0.825}, {'auc': 0.83}, {'f': 0.25})\nassert _ok is True, 'A drop of 0.005 and PSI of exactly 0.25 are not errors'" } },
        { prompt: 'Write <code>psi(ref, cur, n_bins=4)</code>, which computes the PSI of one feature: take the bin edges from the quantiles of the <b>reference</b> data (<code>np.quantile(ref, [0, 0.25, 0.5, 0.75, 1])</code>), open the outer edges to <code>-inf</code> / <code>+inf</code>, and put a floor of 0.001 on the shares. Then compute <code>psi_fee</code>.', check: { tests: "import numpy as _np\nassert abs(psi([1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8])) < 1e-9, 'For the same sample PSI = 0'\nassert float(psi_fee) > 2.0, f'The distribution shifted completely: PSI should be above 2, you have {psi_fee}'\n_a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]\n_b = [1, 2, 3, 4, 5, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]\n_v = psi(_a, _b)\nassert 0.2 < float(_v) < 3.0, f'A moderate drift was expected (0.2–3.0), you have {_v}'" } },
        { prompt: 'The model\'s real AUC fell from 0.84 to 0.82, but the PSI of every feature is below 0.05. What is the most likely cause?', options: ['Data drift: the input distribution changed', 'Concept drift: the features are the same, but their link to the target changed', 'Latency went up', 'The seed was lost'], explain: 'The input distribution is stable (small PSI) while quality dropped, so P(y|X) changed. That is concept drift.' },
        { prompt: 'An automatic retraining pipeline runs at night and puts the result straight into the Production stage. What is the biggest risk?', options: ['The pipeline runs for a long time', 'A model trained on broken data reaches production without anyone seeing it', 'MLflow will have many runs', 'The seed will not repeat'], explain: 'Training can be automatic, but promotion must pass checks: data validation, comparison with the current model, staging. Otherwise one bad batch breaks production.' },
        { prompt: 'Baseline AUC = 0.840, and the CI allows a drop (max_drop) of 0.010. What is the <b>smallest</b> AUC of the new model at which the build still passes? (three decimals)', explain: 'Condition: new >= baseline − max_drop = 0.840 − 0.010 = 0.830. Exactly 0.830 passes; 0.829 fails.' }
      ]
    },
    'deng-1': {
      title: 'OLTP vs OLAP: two different worlds',
      body: `
<p>A Kaspi-style shop has two databases. One takes orders, the other builds reports. They are not alike at all.</p>
<table>
<tr><th></th><th>OLTP (transactional)</th><th>OLAP (analytical)</th></tr>
<tr><td>Purpose</td><td>Recording individual operations</td><td>Aggregating and analyzing many rows</td></tr>
<tr><td>Typical query</td><td><code>SELECT * FROM orders WHERE order_id = 101</code></td><td><code>SELECT city, SUM(amount) ... GROUP BY city</code></td></tr>
<tr><td>Rows</td><td>1–100 per query</td><td>Millions</td></tr>
<tr><td>Write / read</td><td>Many writes, small transactions</td><td>Mostly reads, batch loads</td></tr>
<tr><td>Storage format</td><td><b>Row-oriented</b> (by rows)</td><td><b>Column-oriented</b> (by columns)</td></tr>
<tr><td>Examples</td><td>PostgreSQL, MySQL</td><td>BigQuery, Snowflake, ClickHouse, Redshift</td></tr>
</table>
<h3>Why columnar is fast</h3>
<p>A table has 200 columns and 500 million rows. You only need <code>city</code> and <code>amount</code>. A row-store reads every row from disk <b>in full</b> (200 columns), while a column-store reads only the files of two columns: 100 times less data. On top of that, values in one column are similar, so compression works very well.</p>
<h3>Why analytics is not run on the production database</h3>
<p>While you scan 300 million rows with <code>GROUP BY</code>, the same database is also writing customers\' orders. A heavy query can lock the database and stop the shop from working. So data is copied from OLTP to OLAP: at night or every 15 minutes.</p>
<pre><code>-- OLTP: one customer's latest order (via an index, 1 ms)
SELECT * FROM orders WHERE customer_id = 7 ORDER BY order_date DESC LIMIT 1;

-- OLAP: monthly revenue by city (a scan, 2 s)
SELECT city, DATE_TRUNC('month', order_date) AS m, SUM(amount_tg)
FROM fact_orders JOIN dim_customer USING (customer_id)
GROUP BY 1, 2;</code></pre>
<div class="tip">A read replica is a middle ground: a copy of the OLTP database where you can send heavy read queries. But it is still a row-store, so real analytics needs a warehouse.</div>`,
      ex: [
        { prompt: 'Let us compute how much data a column-store reads. A table has 200 columns of equal size, and the full table is 400 GB. The query needs 4 columns. <code>row_store_gb</code> is the amount a row-store reads (the full table), <code>col_store_gb</code> is what a column-store reads, and <code>speedup</code> is their ratio (how many times).', check: { tests: "assert row_store_gb == 400, 'A row-store reads every row in full, that is 400 GB'\nassert col_store_gb is not None and abs(float(col_store_gb) - 8) < 1e-9, 'One column is 2 GB, 4 columns = 8 GB'\nassert speedup is not None and abs(float(speedup) - 50) < 1e-9, '400 / 8 = 50 times'" }, hints: ['Size of one column: <code>total_gb / n_cols</code>', '<code>speedup = row_store_gb / col_store_gb</code>'] },
        { prompt: 'Which query is typical of an OLAP workload?', options: ['<code>SELECT * FROM orders WHERE order_id = 10231</code>', '<code>UPDATE cart SET qty = 2 WHERE cart_id = 55</code>', '<code>SELECT category, SUM(amount) FROM sales GROUP BY category</code>', '<code>INSERT INTO payments VALUES (...)</code>'], explain: 'An aggregation over many rows is OLAP. The other three work with a single record, which is OLTP.' },
        { prompt: 'An analyst scanned 300 million rows with <code>GROUP BY</code> on the production PostgreSQL database. What is the main risk?', options: ['The result will be wrong', 'The OLTP database may lock up and customers\' orders may not go through', 'The SQL syntax will be wrong', 'Data will be lost'], explain: 'A heavy analytics query eats the OLTP database\'s resources and gets in the way of real operations. That is why analytics runs in a separate system (a warehouse).' }
      ]
    },
    'deng-2': {
      title: 'Warehouse, lake, lakehouse',
      body: `
<p>There are three architectures for storing data. They do not replace each other; they complement each other.</p>
<h3>Data warehouse</h3>
<p>Tables with a fixed structure (schema-on-write). Before loading, data is cleaned and brought to the schema. SQL is fast and data quality is high. Best suited for BI reports. Examples: BigQuery, Snowflake, Redshift.</p>
<h3>Data lake</h3>
<p>A file store: Parquet, CSV, JSON, images, logs are kept as they arrive (schema-on-read). Cheap, flexible, and irreplaceable when ML needs raw data. Examples: Amazon S3, Google Cloud Storage.</p>
<p>Without order, a lake turns into a "data swamp": thousands of files, and nobody knows which one is right. So a lake also needs a catalog, a naming convention and partitioning: <code>s3://dala/events/dt=2024-03-01/part-000.parquet</code>.</p>
<h3>Lakehouse</h3>
<p>A table layer (Delta Lake, Apache Iceberg) is put on top of the lake\'s files. Then the lake\'s low cost and flexibility combine with warehouse features: ACID transactions, schema evolution, time travel ("read the table as it was last week"). Examples: Databricks, Iceberg + Trino.</p>
<table>
<tr><th></th><th>Warehouse</th><th>Lake</th><th>Lakehouse</th></tr>
<tr><td>Schema</td><td>On write</td><td>On read</td><td>Via the table layer</td></tr>
<tr><td>Data type</td><td>Structured</td><td>Any</td><td>Any + tables</td></tr>
<tr><td>Cost</td><td>Higher</td><td>Lowest</td><td>Low + the layer</td></tr>
<tr><td>Who uses it</td><td>BI, analytics</td><td>Data engineers, ML</td><td>Both</td></tr>
</table>
<h3>Medallion layers</h3>
<p>In practice data is split into three layers: <b>bronze</b> (raw, unchanged), <b>silver</b> (cleaned, typed), <b>gold</b> (business tables, aggregates). If there is a bug, you can recompute from bronze, while BI works only with gold.</p>
<div class="tip">Always keep the raw data. If you find a bug in the cleaning logic and there is no bronze layer, you cannot recompute the past.</div>`,
      ex: [
        { prompt: 'A file path in the lake looks like <code>s3://dala/events/dt=2024-03-02/part-000.parquet</code>. Write <code>partition_date(path)</code>: it returns the date from the <code>dt=</code> part (<code>\'2024-03-02\'</code>), or <code>None</code> if there is no <code>dt=</code>.', check: { tests: "assert partition_date('s3://dala/events/dt=2024-03-02/part-000.parquet') == '2024-03-02', \"Return the date after dt=\"\nassert partition_date('s3://dala/events/latest/part-000.parquet') is None, 'If there is no dt=, None'\nassert partition_date('s3://dala/dt=2024-01-01/a/b/c.parquet') == '2024-01-01', 'The part can be anywhere in the string'" }, hints: ['<code>for part in path.split(\'/\')</code> and <code>part.startswith(\'dt=\')</code>', 'Getting the date: <code>part[3:]</code> or <code>part.split(\'=\')[1]</code>'] },
        { prompt: 'A telecom company collects 2 TB of raw network logs every day. They may be needed for ML in the future, but nobody queries them today. Where is the right place to store them?', options: ['In the warehouse (a BigQuery table)', 'In a data lake (S3/GCS, Parquet, partitioned by day)', 'In the production PostgreSQL', 'Nowhere, delete them'], explain: 'For large raw data with an unstable schema that nobody queries now, a lake is cheap and flexible. When needed, you can load it from there into the warehouse.' },
        { prompt: 'In a medallion architecture, which layer should BI dashboards connect to?', options: ['Bronze (raw)', 'Silver (cleaned)', 'Gold (business tables)', 'Directly to the OLTP database'], explain: 'The gold layer holds tested tables with business logic applied. Bronze and silver are intermediate stages whose structure changes often.' }
      ]
    },
    'deng-3': {
      title: 'Star schema: fact and dimension',
      body: `
<p>In a warehouse, data is usually organized as a <b>star schema</b>: one <b>fact</b> table in the center, with <b>dimension</b> tables around it.</p>
<h3>The fact table</h3>
<p>Events and measurements: each row is one order line. It holds numbers (<b>measures</b>: <code>qty</code>, <code>amount_tg</code>) and keys that point to the dimensions (<code>customer_id</code>, <code>product_id</code>, <code>date</code>). Many rows, few columns.</p>
<h3>Dimension tables</h3>
<p>Context: who, what, where. <code>dim_customer</code> (name, city, segment), <code>dim_product</code> (name, category, price), <code>dim_date</code> (day, week, month, is it a holiday). Few rows, many columns.</p>
<pre><code>fact_orders(order_id, order_date, customer_id, product_id, qty)
    → dim_customer(customer_id, customer_name, city, segment)
    → dim_product(product_id, product_name, category, price_tg)</code></pre>
<h3>Why keep them separate</h3>
<p>The city name is not repeated on every row: it is written once in dim_customer. If a city name needs to change, one row is fixed. Queries are also easy to read: to write <code>GROUP BY city</code>, we join the fact with the dim.</p>
<h3>A star schema in pandas</h3>
<p>The datasets include <code>deng_orders.csv</code> (fact), <code>deng_customers.csv</code> and <code>deng_products.csv</code> (dimensions). Joining is done with <code>merge</code>:</p>
<pre><code>m = orders.merge(customers, on='customer_id').merge(products, on='product_id')
m['revenue'] = m['qty'] * m['price_tg']
by_city = m.groupby('city')['revenue'].sum()</code></pre>
<p>This is the exact equivalent of <code>JOIN ... GROUP BY</code> in SQL. There is also a variant called the snowflake schema: there, dimensions are split further into sub-tables (<code>dim_product → dim_category</code>). It saves a little storage but makes queries harder, so BI usually picks the star.</p>
<div class="tip">Do not repeat text in the fact table. If the word "Алматы" is stored 500 million times across 500 million rows, that is pure waste. The key (id) is enough.</div>`,
      ex: [
        { prompt: 'Join the three tables and create the column <code>revenue = qty * price_tg</code> (the result is <code>m</code>). Then store total revenue by city in <code>by_city</code> (a Series sorted in descending order).', check: { tests: "import pandas as _pd\n_o = _pd.read_csv('deng_orders.csv')\n_c = _pd.read_csv('deng_customers.csv')\n_p = _pd.read_csv('deng_products.csv')\n_m = _o.merge(_c, on='customer_id').merge(_p, on='product_id')\n_m['revenue'] = _m['qty'] * _m['price_tg']\nassert 'revenue' in m.columns, \"m should have a 'revenue' column\"\nassert len(m) == 12, f'After the join there should be 12 rows, you have {len(m)}'\nassert int(m['revenue'].sum()) == 600400, f'Total revenue is 600 400 ₸, you have {int(m[\"revenue\"].sum())}'\nassert by_city is not None and int(by_city.loc['Алматы']) == 337700, 'Алматы (Almaty) should have 337 700 ₸'\nassert list(by_city.index) == ['Алматы', 'Астана', 'Шымкент'], 'Sort by_city in descending order (sort_values(ascending=False))'" }, hints: ['<code>orders.merge(customers, on=\'customer_id\').merge(products, on=\'product_id\')</code>', '<code>m.groupby(\'city\')[\'revenue\'].sum().sort_values(ascending=False)</code>'] },
        { prompt: 'A two-dimensional report: in <code>pivot</code>, build a table with <code>segment</code> as rows, <code>category</code> as columns and the sum of <code>revenue</code> as values (<code>pivot_table</code>, empty cells 0). Then store the matching value in <code>b2b_electronics</code>.', check: { tests: "assert pivot is not None, 'Create a pivot_table'\nassert list(pivot.index) == ['b2b', 'retail'], \"index should be 'segment'\"\nassert list(pivot.columns) == ['books', 'electronics', 'home'], \"columns should be 'category'\"\nassert int(pivot.loc['b2b', 'electronics']) == 337000, f\"b2b/electronics = 337 000 ₸, you have {int(pivot.loc['b2b', 'electronics'])}\"\nassert int(pivot.loc['b2b', 'books']) == 0, 'An empty cell should hold 0 (fill_value=0)'\nassert b2b_electronics is not None and int(b2b_electronics) == 337000, 'b2b_electronics = pivot.loc[\"b2b\", \"electronics\"]'" }, hints: ['<code>m.pivot_table(index=\'segment\', columns=\'category\', values=\'revenue\', aggfunc=\'sum\', fill_value=0)</code>', '<code>pivot.loc[\'b2b\', \'electronics\']</code>'] },
        { prompt: 'Which column should not be in the <code>fact_orders</code> table?', options: ['<code>qty</code>', '<code>customer_id</code>', '<code>customer_city</code> (text, repeated on every row)', '<code>order_date</code>'], explain: 'The city is a property of the customer; it belongs in <code>dim_customer</code>. The fact holds only the key (<code>customer_id</code>) and the measures.' }
      ]
    },
    'deng-4': {
      title: 'ETL vs ELT',
      body: `
<p>Data travels from the source to the warehouse in three steps: <b>E</b>xtract, <b>T</b>ransform, <b>L</b>oad. The <b>order</b> of the steps is what separates the two architectures.</p>
<h3>ETL: the old order</h3>
<p>Data is processed on a separate server (Python, Informatica, Spark) and then loaded into the warehouse ready to use. The warehouse holds only clean data. There is little computing in the expensive warehouse. The downsides: raw data is not kept, recomputing is hard when the logic changes, and the pipeline becomes a "black box".</p>
<h3>ELT: the modern order</h3>
<p>Raw data goes straight into the warehouse (or the lake), and all transforms run inside the warehouse itself in SQL. This became worthwhile as BigQuery and Snowflake got cheaper.</p>
<ul>
<li>Raw data stays in the <code>raw</code> schema: when the logic changes, recomputing is a single <code>CREATE TABLE AS SELECT</code>.</li>
<li>The transform logic is in SQL, in Git, and any analyst can read it (this is how dbt works).</li>
<li>The risk: the warehouse bill. Every query is charged for the data it scans.</li>
</ul>
<h3>A small ETL in Python</h3>
<pre><code>def extract(path):
    return pd.read_csv(path)

def transform(df):
    df = df.copy()
    df['city'] = df['city'].str.strip().str.capitalize()   # ' алматы ' → 'Алматы'
    df = df[df['status'] == 'paid']
    return df.groupby('city', as_index=False)['amount_tg'].sum()

def load(df, target):
    df.to_csv(target, index=False)                         # in a real project: to_sql / BigQuery</code></pre>
<p>Keeping three separate functions pays off: each can be tested on its own, and since <code>transform</code> is a pure function, you can check it even where there is no database.</p>
<h3>Idempotency</h3>
<p>If the pipeline runs twice, the result must be the same. So instead of <code>INSERT</code>, use <code>DELETE WHERE dt = '2024-03-02'</code> + <code>INSERT</code> (or <code>MERGE</code>). Otherwise a rerun doubles the data.</p>
<div class="tip">A "full refresh" (recomputing everything) is the most reliable approach for small data. Move to incremental loads only when the data is truly large: they are complex and their bugs are hidden.</div>`,
      ex: [
        { prompt: 'Write an ETL for <code>deng_raw_sales.csv</code>. <code>extract(path)</code> reads the CSV. <code>transform(df)</code>: cleans <code>city</code> (strip extra spaces, <code>str.capitalize()</code>), keeps only rows with <code>status == \'paid\'</code>, and sums <code>amount_tg</code> by city (columns: <code>city</code>, <code>amount_tg</code>; sorted by <code>city</code>, index from 0). <code>load(df, target)</code> writes to CSV and returns the number of rows.', check: { tests: "import pandas as _pd, os as _os\n_r = extract('deng_raw_sales.csv')\nassert _r is not None and len(_r) == 10, 'extract should read 10 rows'\nassert list(clean.columns) == ['city', 'amount_tg'], f\"The columns should be ['city', 'amount_tg'], you have {list(clean.columns)}\"\nassert list(clean['city']) == ['Алматы', 'Астана', 'Шымкент'], f'After cleaning there should be 3 cities. You have {list(clean[\"city\"])}'\nassert [int(x) for x in clean['amount_tg']] == [264200, 117500, 23400], f'Expected amounts: 264200, 117500, 23400. You have {[int(x) for x in clean[\"amount_tg\"]]}'\nassert int(n) == 3, 'load should return the number of rows written (3)'\nassert _os.path.exists('deng_city_totals.csv'), 'load should write the result to a CSV file'\nassert len(_pd.read_csv('deng_city_totals.csv')) == 3, 'The file should have 3 rows (index=False)'" }, hints: ['<code>df[\'city\'].str.strip().str.capitalize()</code>: \' АЛМАТЫ \' → \'Алматы\'', 'Filter: <code>df[df[\'status\'] == \'paid\']</code>, then <code>groupby(\'city\', as_index=False)[\'amount_tg\'].sum()</code>'] },
        { prompt: 'An idempotent load. Write <code>load_partition(table, rows, dt)</code>: it removes the old rows for date <code>dt</code> from <code>table</code> (a list of dicts), then adds <code>rows</code> and returns the new <code>table</code>. When the pipeline runs twice, the data must not double.', check: { tests: "assert len(table) == 3, f'Even after two runs there should be 3 rows (1 old + 2 new), you have {len(table)}'\nassert sum(1 for r in table if r['dt'] == '2024-03-01') == 1, 'Data for the other day must be kept'\nassert sum(1 for r in table if r['dt'] == '2024-03-02') == 2, 'For 2024-03-02 only the 2 new rows should remain'\n_t = load_partition([{'dt': 'a', 'x': 1}], [{'dt': 'b', 'x': 2}], 'b')\nassert len(_t) == 2, 'If that day is not in the table, the rows are simply added'" }, hints: ['Filter first: <code>[r for r in table if r[\'dt\'] != dt]</code>', 'Then add the new rows'] },
        { prompt: 'The team moved to ELT: raw data goes into BigQuery and transforms run in SQL. What is the main risk?', options: ['Raw data will be lost', 'Compute costs in the warehouse (scanned data) can grow out of control', 'You cannot write transforms in SQL', 'The pipeline will not be idempotent'], explain: 'In ELT all computing runs in the warehouse, which charges for scanned data. That is why you need partitions, incremental models and cost monitoring.' }
      ]
    },
    'deng-5': {
      title: 'Batch vs streaming and orchestration',
      body: `
<p><b>Batch</b>: data is processed in groups at set times, such as yesterday\'s orders at 03:00 at night. <b>Streaming</b>: each event is processed as soon as it arrives, so the fraud model checks a payment the second it is made.</p>
<table>
<tr><th></th><th>Batch</th><th>Streaming</th></tr>
<tr><td>Latency</td><td>Hours</td><td>Seconds</td></tr>
<tr><td>Tools</td><td>Airflow + SQL / Spark</td><td>Kafka, Flink, Spark Streaming</td></tr>
<tr><td>Difficulty</td><td>Low</td><td>High (late events, duplicates, state)</td></tr>
<tr><td>When</td><td>Reports, dashboards, ML training</td><td>Fraud, recommendations, alerts</td></tr>
</table>
<p>The rule is simple: <b>unless latency truly matters to the business, choose batch</b>. Streaming infrastructure is several times more expensive and complex.</p>
<h3>Orchestration: Airflow</h3>
<p>A pipeline has dozens of steps and their order matters: the fact table must be loaded after the dimensions. The thing that manages this is an orchestrator. The best known is <b>Apache Airflow</b>.</p>
<ul>
<li><b>DAG</b> (directed acyclic graph): the whole pipeline, a graph without cycles.</li>
<li><b>Task</b>: one step (run SQL, copy a file).</li>
<li><b>Dependency</b>: <code>a &gt;&gt; b</code> means b starts only after a finishes.</li>
<li><b>Schedule</b>: cron, for example <code>'0 3 * * *'</code> is every day at 03:00.</li>
<li><b>Backfill</b>: recomputing past days.</li>
<li><b>Retry</b>: trying again after an error.</li>
</ul>
<pre><code>from airflow import DAG
from airflow.operators.python import PythonOperator
import pendulum

with DAG('daily_sales', start_date=pendulum.datetime(2024, 3, 1),
         schedule='0 3 * * *', catchup=True, default_args={'retries': 2}) as dag:
    extract_t = PythonOperator(task_id='extract', python_callable=extract)
    dim_t     = PythonOperator(task_id='load_dims', python_callable=load_dims)
    fact_t    = PythonOperator(task_id='load_fact', python_callable=load_fact)
    report_t  = PythonOperator(task_id='report', python_callable=build_report)

    extract_t >> dim_t >> fact_t >> report_t</code></pre>
<p>The "acyclic" part of a DAG matters: if there is a cycle (a → b → a), the order of steps is undefined and Airflow raises an error.</p>
<div class="tip">Keep every task small and <b>safe to rerun</b> (idempotent). Then if one step fails at night, you rerun only that step, not the whole pipeline.</div>`,
      ex: [
        { prompt: '<code>DEPS</code> holds each task\'s dependencies. Write <code>topo_order(deps)</code>: it picks tasks whose dependencies are done, <b>in alphabetical order</b>, and returns the execution list. If there is a cycle (nothing can be picked), raise <code>ValueError</code>.', check: { tests: "_o = topo_order(DEPS)\nassert _o == ['extract', 'load_dims', 'load_fact', 'report', 'notify'], f'Expected order: extract, load_dims, load_fact, report, notify. You have {_o}'\n_d2 = {'b': ['a'], 'a': [], 'c': ['a'], 'z': []}\nassert topo_order(_d2) == ['a', 'b', 'c', 'z'], 'Among the ready tasks, pick in alphabetical order'\n_ok = False\ntry:\n    topo_order({'a': ['b'], 'b': ['a']})\nexcept ValueError:\n    _ok = True\nassert _ok, 'Raise ValueError if there is a cycle'" }, hints: ['A ready task: <code>all(d in done for d in deps[t])</code>', 'At each step take the first element of <code>sorted(...)</code>; if nothing is ready, it is a cycle'] },
        { prompt: 'A simple streaming rule: if one card makes more than 3 payments within a 60-second sliding window, raise an alert. <code>fraud_alerts(events, window=60, limit=3)</code> should return the list of <code>event_id</code>s that triggered an alert (events are sorted by time).', check: { tests: "_a = fraud_alerts(events)\nassert _a == [5], f'Only at event 5 does card A have 4 payments in the window. You have {_a}'\nassert fraud_alerts(events, limit=2) == [4, 5], 'With limit=2, events 4 and 5 give an alert'\nassert fraud_alerts(events, window=15) == [], 'If the window is small, there is no alert'" }, hints: ['For each event, count the events of the same card inside the window', 'Window condition: <code>e[\'t\'] - window &lt; x[\'t\'] &lt;= e[\'t\']</code>'] },
        { prompt: 'Marketing needs a report on yesterday\'s sales, and it is enough if it is ready by 09:00 the next morning. Which architecture is right?', options: ['A Kafka + Flink streaming pipeline', 'A nightly batch job in Airflow', 'A direct query on the production database', 'Copying into Excel by hand'], explain: 'The latency requirement is hours, so batch is enough: cheap, simple, easy to rerun.' },
        { prompt: 'What happens if an Airflow DAG has both <code>a &gt;&gt; b</code> and <code>b &gt;&gt; a</code>?', options: ['Both run in parallel', 'A cycle appears and Airflow raises an error', 'a runs twice', 'The DAG finishes twice as fast'], explain: 'A DAG is an acyclic graph. With a cycle the order is undefined, so Airflow rejects it.' }
      ]
    },
    'deng-6': {
      title: 'The idea of dbt: SQL models and tests',
      body: `
<p><b>dbt</b> (data build tool) is a tool that brings order to the "T" part of ELT. The main idea: <b>every table is one SQL file</b>, and the files live in Git.</p>
<h3>Model</h3>
<p>The file <code>models/gold/city_revenue.sql</code> contains only a <code>SELECT</code>. There is no need to write <code>CREATE TABLE</code>: dbt wraps it for you.</p>
<pre><code>-- models/silver/paid_orders.sql
select
    order_id,
    cast(order_date as date) as order_date,
    initcap(trim(city))      as city,
    amount_tg
from {{ source('raw', 'sales') }}
where status = 'paid'</code></pre>
<pre><code>-- models/gold/city_revenue.sql
select city, sum(amount_tg) as revenue_tg, count(*) as orders
from {{ ref('paid_orders') }}
group by city</code></pre>
<p><code>ref()</code> is the heart of dbt. It declares the dependencies between models, so dbt builds the DAG itself and creates the tables in the right order. If you rename a model, you fix the SQL in one place.</p>
<h3>Tests</h3>
<p>In dbt, data tests are written in YAML and checked on every run:</p>
<pre><code># models/gold/schema.yml
models:
  - name: city_revenue
    columns:
      - name: city
        tests: [not_null, unique]
      - name: revenue_tg
        tests:
          - dbt_utils.accepted_range: {min_value: 0}</code></pre>
<p>The main built-in tests are <code>not_null</code>, <code>unique</code>, <code>accepted_values</code> and <code>relationships</code> (does a key in the fact exist in the dimension). These are exactly the data tests from CI, just written declaratively.</p>
<h3>Two more benefits</h3>
<ul>
<li><b>Documentation</b>: <code>dbt docs generate</code> produces the model graph and column descriptions as a website.</li>
<li><b>Materialization</b>: with one line you can turn a model into a <code>view</code>, a <code>table</code> or an <code>incremental</code> model.</li>
</ul>
<div class="tip">dbt\'s biggest benefit is not technical: the SQL logic goes into Git, code review and tests. The answer to "What was this report computed from?" sits in one file.</div>`,
      ex: [
        { prompt: 'Write three dbt tests in pandas: <code>test_not_null(df, col)</code>, <code>test_unique(df, col)</code>, <code>test_accepted_values(df, col, values)</code>. Each returns <code>True</code> on success and <code>False</code> otherwise. Then store in the <code>failures</code> list the names of the tests that fail on the <code>model</code> table (in the order <code>\'not_null\'</code>, <code>\'unique\'</code>, <code>\'accepted_values\'</code>).', check: { tests: "_good = pd.DataFrame({'city': ['Алматы', 'Астана'], 'segment': ['retail', 'b2b']})\nassert test_not_null(_good, 'city') is True or test_not_null(_good, 'city') == True, 'True if there are no empty values'\nassert not test_not_null(model, 'city'), 'city has a None, so not_null fails'\nassert test_unique(_good, 'city'), 'True if there are no repeats'\nassert not test_unique(model, 'city'), \"'Алматы' appears twice, unique fails\"\nassert test_accepted_values(_good, 'segment', ['retail', 'b2b']), 'All values are in the allowed list'\nassert not test_accepted_values(model, 'segment', ['retail', 'b2b']), \"'vip' is not in the list, the test should fail\"\nassert failures == ['not_null', 'unique', 'accepted_values'], f'All three tests fail. You have {failures}'" }, hints: ['<code>df[col].notna().all()</code>, <code>df[col].dropna().duplicated().sum() == 0</code>, <code>df[col].isin(values).all()</code>', 'Check each test with <code>if not ...: failures.append(...)</code>'] },
        { prompt: 'The equivalent of dbt\'s <code>relationships</code> test: <code>orphan_keys(fact, dim, key)</code> should return the sorted list of keys that exist in the fact but not in the dimension.', check: { tests: "assert [int(x) for x in orphans] == [7, 9], f'Keys missing from the dimension: 7 and 9. You have {orphans}'\n_f2 = pd.DataFrame({'customer_id': [1, 2]})\nassert orphan_keys(_f2, dim, 'customer_id') == [], 'If all keys exist, an empty list'\n_f3 = pd.DataFrame({'customer_id': [9, 9, 8]})\nassert [int(x) for x in orphan_keys(_f3, dim, 'customer_id')] == [8, 9], 'Return a sorted list without repeats'" }, hints: ['<code>~fact[key].isin(dim[key])</code>', '<code>sorted(fact.loc[mask, key].unique().tolist())</code>'] },
        { prompt: 'In dbt, what is the advantage of writing <code>{{ ref(\'paid_orders\') }}</code> over typing the table name by hand?', options: ['SQL runs faster', 'dbt builds the dependency graph itself and creates models in the right order', 'The table is compressed automatically', 'Tests are no longer needed'], explain: '<code>ref()</code> declares the link between models. From it dbt builds the DAG, works out the execution order and generates documentation.' }
      ]
    },
    'deng-7': {
      title: 'Spark: when data does not fit in memory',
      body: `
<p>pandas works in the <b>memory</b> (RAM) of one computer. With 16 GB of RAM you can process roughly 2–5 GB of CSV (pandas expands data 2–5 times in memory). When 500 GB of data arrives, there are two ways: read the data in chunks, or use a cluster engine such as <b>Apache Spark</b>.</p>
<h3>Spark\'s model</h3>
<ul>
<li>Data is split into <b>partitions</b>, and each partition is processed by one worker in the cluster.</li>
<li><b>Transformations</b> (<code>filter</code>, <code>groupBy</code>, <code>join</code>) are <b>lazy</b>: they are not computed right away; a plan is built.</li>
<li>An <b>action</b> (<code>count()</code>, <code>collect()</code>, <code>write</code>) triggers the actual computation.</li>
<li>The optimizer (Catalyst) rewrites the plan and skips columns that are not needed.</li>
</ul>
<pre><code>from pyspark.sql import functions as F
df = spark.read.parquet('s3://dala/events/')     # lazy
daily = (df.filter(F.col('status') == 'paid')
           .groupBy('city')
           .agg(F.sum('amount_tg').alias('revenue')))
daily.write.mode('overwrite').parquet('s3://dala/gold/city_revenue/')   # action</code></pre>
<p>It reads like pandas, but hundreds of machines may be working underneath. In many cases you can write the same logic in SQL too: <code>spark.sql('select city, sum(amount_tg) ... group by city')</code>.</p>
<h3>Chunked groupby in pandas: the same idea</h3>
<p>Spark\'s groupBy is essentially <b>map → combine</b>: each partition aggregates on its own, then the partial results are added up. You can repeat this in pandas with <code>chunksize</code>:</p>
<pre><code>totals = {}
for chunk in pd.read_csv('big.csv', chunksize=100_000):
    part = chunk.groupby('city')['amount_tg'].sum()
    for city, v in part.items():
        totals[city] = totals.get(city, 0) + v</code></pre>
<p>This works for <code>sum</code>, <code>count</code>, <code>min</code> and <code>max</code>, because they can be computed piece by piece. <b>median</b> does not work: the average of the chunk medians is not the overall median. For the <code>mean</code>, collect the sum and the count separately and divide at the end.</p>
<div class="tip">Do not rush to Spark. A cluster is expensive and complex. First: read only the columns you need (<code>usecols</code>), switch to Parquet, shrink the types (<code>float32</code>, <code>category</code>), use <code>chunksize</code>, DuckDB. Many "big data" problems disappear after these steps.</div>`,
      ex: [
        { prompt: 'Repeat Spark\'s map→combine logic: read <code>deng_raw_sales.csv</code> with <code>chunksize=3</code> and collect the sum of <code>amount_tg</code> by city into the <code>totals</code> dict (all statuses; clean the city with <code>.str.strip().str.capitalize()</code>). Then <code>n_chunks</code> is the number of chunks processed.', starter: 'import pandas as pd\n\ntotals = {}\nn_chunks = 0\n# read deng_raw_sales.csv with chunksize=3\nprint(totals, n_chunks)\n', check: { tests: "assert n_chunks == 4, f'10 rows, chunksize=3 → 4 chunks. You have {n_chunks}'\nassert sorted(totals) == ['Алматы', 'Астана', 'Шымкент'], f'There should be three cities (cleaned names). You have {sorted(totals)}'\nassert int(totals['Алматы']) == 277700, f\"Алматы = 277 700 ₸ (all statuses), you have {totals['Алматы']}\"\nassert int(totals['Астана']) == 239300 and int(totals['Шымкент']) == 23400, 'Астана = 239 300 ₸, Шымкент = 23 400 ₸'\nassert sum(int(v) for v in totals.values()) == 540400, 'The total is 540 400 ₸'" }, hints: ['<code>for chunk in pd.read_csv(\'deng_raw_sales.csv\', chunksize=3):</code>', 'Accumulate: <code>totals[city] = totals.get(city, 0) + v</code>'] },
        { prompt: 'A mean in chunks. Write <code>chunked_mean(path, col, chunksize)</code>: instead of averaging the chunk means, it should collect the <b>sum and the count</b> and divide at the end. Store the mean of <code>amount_tg</code> in <code>deng_raw_sales.csv</code> in <code>avg</code>.', check: { tests: "import pandas as _pd\n_true = float(_pd.read_csv('deng_raw_sales.csv')['amount_tg'].mean())\nassert abs(float(avg) - _true) < 1e-6, f'The correct mean = {_true:.1f}. Averaging the chunk means gives a wrong result (the last chunk has 1 row)'\nassert abs(chunked_mean('deng_raw_sales.csv', 'amount_tg', 100) - _true) < 1e-6, 'It should also work correctly with a single chunk'\nassert abs(chunked_mean('deng_raw_sales.csv', 'amount_tg', 2) - _true) < 1e-6, 'chunksize must not affect the result'" }, hints: ['Collect the sum and the count: <code>total += chunk[col].sum()</code>, <code>n += chunk[col].count()</code>', 'At the end, <code>return total / n</code>'] },
        { prompt: 'Which aggregation <b>cannot</b> be computed correctly in chunks?', options: ['sum', 'count', 'max', 'median'], explain: 'The median needs the order of all the values; the chunk medians do not give the overall median. sum, count and max are associative aggregates that can be combined.' },
        { prompt: 'In Spark someone wrote <code>df.filter(...).groupBy(...).agg(...)</code>, but no computation started. Why?', options: ['The code has a bug', 'These are transformations, and they are lazy: an action (count, write, collect) is needed', 'The cluster is turned off', 'Spark only accepts SQL'], explain: 'Spark builds a plan from transformations and runs it only when an action is called. This lets the optimizer drop unnecessary work.' }
      ]
    },
    'deng-8': {
      title: 'Cloud services and cost awareness',
      body: `
<p>Big data infrastructure usually lives in the cloud. The services of the three providers map onto each other:</p>
<table>
<tr><th>Service</th><th>AWS</th><th>Google Cloud</th><th>Azure</th></tr>
<tr><td>File store (lake)</td><td>S3</td><td>GCS</td><td>Blob Storage</td></tr>
<tr><td>Warehouse</td><td>Redshift</td><td>BigQuery</td><td>Synapse</td></tr>
<tr><td>Virtual machine</td><td>EC2</td><td>Compute Engine</td><td>VM</td></tr>
<tr><td>Serverless function</td><td>Lambda</td><td>Cloud Functions</td><td>Functions</td></tr>
<tr><td>Managed Spark</td><td>EMR</td><td>Dataproc</td><td>HDInsight</td></tr>
</table>
<p><b>Snowflake</b> is a separate company that runs on all three clouds. What sets it apart: storage and compute are fully separated, and each team gets its own "warehouse" (compute cluster).</p>
<h3>Two pricing models on the market</h3>
<ul>
<li><b>By data scanned</b> (BigQuery on-demand): you pay for as many bytes as the query reads. <code>SELECT *</code> is the most expensive habit.</li>
<li><b>By running time</b> (Snowflake, Redshift, Databricks): you pay for as many minutes as the cluster is on. A forgotten cluster burns money at night too.</li>
</ul>
<h3>Cost awareness: concrete habits</h3>
<ol>
<li><b>Ask only for the columns you need.</b> In a columnar store, <code>SELECT *</code> reads every column.</li>
<li><b>Add a partition filter</b>: <code>WHERE dt &gt;= '2024-03-01'</code>. On a partitioned table this cuts the scan 100 times.</li>
<li><b>Cache the dashboard or build an aggregate table.</b> A dashboard that scans 2 TB every time it is opened is the biggest item in the monthly budget.</li>
<li><b>Use Parquet</b>: compared with CSV it is 5–10 times smaller and is read by column.</li>
<li><b>In dev, use <code>LIMIT</code> or a sample.</b> Check the logic on 1% of the data, then run it in full (but remember: in BigQuery <code>LIMIT</code> does not reduce the scan, a partition filter does).</li>
<li><b>Lifecycle policy</b>: move old files in the lake to a cheap archive (Glacier / Coldline).</li>
<li>Turn on a <b>budget alert</b>: if the monthly limit is exceeded, you get an email.</li>
</ol>
<h3>Let us do the math</h3>
<p>BigQuery on-demand costs about $6.25 per 1 TB scanned. A dashboard scans 2 TB each time it is opened and is opened 40 times a day: 80 TB × $6.25 = $500 a day, $15 000 a month. If instead you build an aggregate table (1 GB) from the 2 TB once a day and connect the dashboard to it, the scan is ~2 TB + 40 GB a day and the monthly bill comes to about $400. One architectural decision, 97% savings.</p>
<div class="tip">Data engineer interviews often ask about "cost". In your answer mention two things: partition/column filters and an aggregate layer (gold tables).</div>`,
      ex: [
        { prompt: 'Write <code>scan_cost(gb, price_per_tb=6.25)</code>, which computes a BigQuery on-demand bill (1 TB = 1024 GB). Then: <code>cost_now</code> is the <b>monthly</b> (30 days) bill when the dashboard scans 2048 GB 40 times a day; <code>cost_agg</code> is the monthly bill with an aggregate table (2048 GB once a day + 1 GB 40 times).', check: { tests: "assert abs(scan_cost(1024) - 6.25) < 1e-9, '1 TB = 1024 GB → $6.25'\nassert abs(scan_cost(512) - 3.125) < 1e-9, 'Half a TB → $3.125'\nassert cost_now is not None and abs(float(cost_now) - 15000.0) < 1.0, f'cost_now should be ≈ $15 000, you have {cost_now}'\nassert cost_agg is not None and abs(float(cost_agg) - 382.81) < 2.0, f'cost_agg should be ≈ $383 (2048 GB + 40 GB per day), you have {cost_agg}'\nassert float(cost_now) / float(cost_agg) > 30, 'The aggregate layer cuts the bill almost 30 times'" }, hints: ['<code>gb / 1024 * price_per_tb</code>', 'Monthly: multiply the daily bill by 30'] },
        { prompt: 'Write <code>review_query(sql)</code>, which checks whether a query is "cheap". It returns a list of warnings (in this order): <code>\'select_star\'</code> if there is <code>select *</code>; <code>\'no_filter\'</code> if there is no <code>where</code> at all; <code>\'no_partition_filter\'</code> if there is a <code>where</code> but no <code>dt</code> in it. It should not depend on letter case.', check: { tests: "assert review_query('SELECT * FROM events') == ['select_star', 'no_filter'], \"'SELECT * FROM events' → ['select_star', 'no_filter']\"\nassert review_query(\"select city, amount from events where dt >= '2024-03-01'\") == [], 'A good query has no warnings'\nassert review_query(\"SELECT city FROM events WHERE status = 'paid'\") == ['no_partition_filter'], 'There is a where, but no dt filter'\nassert review_query(\"select * from events where dt = '2024-03-01'\") == ['select_star'], 'Only select_star'\nassert review_query('SELECT * FROM EVENTS') == ['select_star', 'no_filter'], 'It should not depend on letter case (.lower())'" }, hints: ['First, <code>s = sql.lower()</code>', '<code>if \'where\' not in s: ... elif \'dt\' not in s: ...</code>'] },
        { prompt: 'A table is partitioned by day: 365 days and 730 GB in total. A query with <code>WHERE dt &gt;= </code> asked for only 7 days and read two columns (10% of all columns). How many GB are scanned?', explain: '730 GB / 365 × 7 = 14 GB after the partition filter. 10% of that (two columns) = 1.4 GB.' },
        { prompt: 'In Snowflake the monthly bill suddenly doubled, while the number of queries did not change. What is the most likely cause?', options: ['The data is stored as Parquet', 'The compute cluster (warehouse) has no auto-suspend and stayed on non-stop', 'The table has many columns', 'The SQL uses a JOIN'], explain: 'In Snowflake you pay for the time the cluster is on. Without auto-suspend, an idle warehouse burns money too.' }
      ]
    },
    'deng-gate': {
      title: 'Module exam: Cloud & Data Eng Basics',
      body: `
<p>Final check: star schema, ETL, DAGs, dbt tests and cost. No hints. The pass mark is 75%.</p>`,
      ex: [
        { prompt: 'Build a gold table from the star schema: join <code>deng_orders.csv</code>, <code>deng_customers.csv</code> and <code>deng_products.csv</code>, compute <code>revenue = qty * price_tg</code>, and create the <code>gold</code> DataFrame. Columns: <code>city</code>, <code>category</code>, <code>revenue_tg</code> (sum), <code>orders</code> (number of orders). Sorted by <code>city</code>, then <code>category</code>, index from 0.', check: { tests: "assert gold is not None, 'Create the gold DataFrame'\nassert list(gold.columns) == ['city', 'category', 'revenue_tg', 'orders'], f\"Columns: city, category, revenue_tg, orders. You have {list(gold.columns)}\"\nassert len(gold) == 8, f'City × category combinations: 8 rows, you have {len(gold)}'\nassert list(gold['city'])[0] == 'Алматы' and list(gold['category'])[0] == 'books', 'Sort by city, then by category'\n_r = gold[(gold['city'] == 'Алматы') & (gold['category'] == 'electronics')]\nassert int(_r['revenue_tg'].iloc[0]) == 296300, f\"Алматы/electronics = 296 300 ₸, you have {int(_r['revenue_tg'].iloc[0])}\"\nassert int(_r['orders'].iloc[0]) == 3, 'Алматы/electronics has 3 orders'\nassert int(gold['revenue_tg'].sum()) == 600400 and int(gold['orders'].sum()) == 12, 'Total: 600 400 ₸ and 12 orders'" } },
        { prompt: 'A full ETL: <code>run_etl(path)</code> reads <code>deng_raw_sales.csv</code>, cleans <code>city</code>, removes the <code>cancelled</code> status (<code>paid</code> and <code>pending</code> stay), computes <code>revenue_tg</code> (sum) and <code>orders</code> (count) by city, and returns a DataFrame sorted by <code>city</code> (columns: <code>city</code>, <code>revenue_tg</code>, <code>orders</code>; index from 0).', check: { tests: "assert list(result.columns) == ['city', 'revenue_tg', 'orders'], f\"Columns: city, revenue_tg, orders. You have {list(result.columns)}\"\nassert list(result['city']) == ['Алматы', 'Астана', 'Шымкент'], f'Three cleaned cities were expected, you have {list(result[\"city\"])}'\nassert [int(x) for x in result['revenue_tg']] == [264200, 201500, 23400], f'Expected: 264200, 201500 (pending is included), 23400. You have {[int(x) for x in result[\"revenue_tg\"]]}'\nassert [int(x) for x in result['orders']] == [4, 2, 2], f'Order counts: 4, 2, 2. You have {[int(x) for x in result[\"orders\"]]}'\nassert list(result.index) == [0, 1, 2], 'Reset the index (reset_index(drop=True))'" } },
        { prompt: 'Write <code>validate_dag(deps)</code>, which checks a DAG and returns a list of errors (in this order). (1) For each reference to a task that is not in <code>deps</code>, add <code>\'unknown:&lt;name&gt;\'</code> (tasks in dict order, dependencies in list order); (2) if the graph has a cycle, add <code>\'cycle\'</code>. With no errors, return an empty list.', check: { tests: "assert validate_dag({'b': ['a'], 'a': []}) == [], 'A correct DAG has no errors'\nassert validate_dag({'a': ['x'], 'b': ['a', 'y']}) == ['unknown:x', 'unknown:y'], \"Unknown dependencies in order: ['unknown:x', 'unknown:y']\"\nassert validate_dag({'a': ['b'], 'b': ['a']}) == ['cycle'], 'The cycle should be found'\n_v = validate_dag({'a': ['b'], 'b': ['a'], 'c': ['zz']})\nassert _v == ['unknown:zz', 'cycle'], f\"Both errors, unknown before cycle: you have {_v}\"\nassert validate_dag({'r': ['f'], 'f': ['d', 'e'], 'd': ['e'], 'e': []}) == [], 'A correct multi-level DAG'" } },
        { prompt: 'A dashboard scans 3 TB in BigQuery every time it is opened. What is the most effective way to cut the bill?', options: ['Change the dashboard colors', 'Compute an aggregate (gold) table once a day and connect the dashboard to it', 'Write <code>SELECT * FROM ... LIMIT 1000</code> instead of <code>SELECT *</code>', 'Move the table to CSV format'], explain: 'An aggregate layer cuts the scanned volume thousands of times. In BigQuery <code>LIMIT</code> does not reduce the scan, and CSV costs more than columnar Parquet.' },
        { prompt: 'The fact table has <code>customer_id = 9</code>, but that customer is not in <code>dim_customer</code>. Which dbt test catches this?', options: ['<code>not_null</code>', '<code>unique</code>', '<code>relationships</code>', '<code>accepted_values</code>'], explain: 'The <code>relationships</code> test checks that a key in the fact exists in the dimension (a foreign key check).' },
        { prompt: 'A table is 1200 GB, split into 400 daily partitions, with 20 columns all of the same size. A query reads 10 days and 3 columns. How many GB are scanned? (one decimal)', explain: '1200 / 400 × 10 = 30 GB by partition; 30 × 3/20 = 4.5 GB.' }
      ]
    }
  }
});
