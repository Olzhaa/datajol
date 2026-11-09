// mlops practice tasks: English text. Code, solutions and checks are in content/practice/mlops.js.
DJ.i18n.patch({ lessons: {
 "ops-1": {
  "pr": [
   {
    "title": "The longest stage",
    "prompt": "<p>The dictionary <code>hours</code> holds the hours spent on each stage of the project. Write into the variable <code>longest</code> the name of the stage that took the most time.</p>",
    "hints": [
     "The key with the largest value: <code>max(hours, key=hours.get)</code>.",
     "Note that the answer is not “model training”."
    ],
    "check": {
     "tests": "assert longest == 'data_cleaning', f'The longest stage is data_cleaning (45 hours), yours is {longest}'"
    }
   },
   {
    "title": "Stage number",
    "prompt": "<p>Write the function <code>stage_number(stage)</code>: it returns the position of the stage in the list <code>STAGES</code>, counting from 1 (<code>'data'</code> → 1, <code>'monitoring'</code> → 5). For a stage that is not in the list, the function raises <code>ValueError</code>.</p>",
    "hints": [
     "<code>STAGES.index(stage)</code> counts from 0, so <code>+ 1</code>.",
     "<code>if stage not in STAGES: raise ValueError(...)</code>."
    ],
    "check": {
     "tests": "assert stage_number('data') == 1 and stage_number('monitoring') == 5, \"'data' → 1, 'monitoring' → 5\"\nassert stage_number('deployment') == 4, \"'deployment' → 4\"\ntry:\n    stage_number('design')\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Белгісіз кезеңде ValueError көтеріңіз')"
    }
   },
   {
    "title": "Time outside the model",
    "prompt": "<p>Let's check the idea of the paper “Hidden Technical Debt” with numbers. Write into the variable <code>outside_share</code> the percentage (0–100, rounded to 1 decimal place) of time spent on stages <b>other</b> than <code>training</code> and <code>evaluation</code>.</p>",
    "hints": [
     "Total time: <code>sum(hours.values())</code>; for the model: <code>hours['training'] + hours['evaluation']</code>.",
     "Percentage: <code>(барлығы - модельге) / барлығы * 100</code>, then <code>round(..., 1)</code>."
    ],
    "check": {
     "tests": "assert outside_share is not None and abs(float(outside_share) - 84.4) < 0.01, f'outside_share = 135 / 160 * 100 should be ≈ 84.4, yours is {outside_share}'"
    }
   },
   {
    "title": "Previous stage",
    "prompt": "<p>Write the function <code>prev_stage(stage)</code>: it returns the previous stage from the list <code>STAGES</code>. The stage before <code>'data'</code> in the cycle is <code>'monitoring'</code> (monitoring leads back to data). For a stage that is not in the list, the function raises <code>ValueError</code>.</p>",
    "hints": [
     "The remainder operator also works with negative numbers: <code>(i - 1) % len(STAGES)</code>.",
     "First <code>if stage not in STAGES: raise ValueError(...)</code>."
    ],
    "check": {
     "tests": "assert prev_stage('training') == 'data' and prev_stage('monitoring') == 'deployment', \"prev_stage('training') → 'data', prev_stage('monitoring') → 'deployment'\"\nassert prev_stage('data') == 'monitoring', \"Before 'data' in the cycle comes 'monitoring'\"\ntry:\n    prev_stage('sales')\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Белгісіз кезеңде ValueError көтеріңіз')"
    }
   },
   {
    "title": "Checking the lifecycle log",
    "prompt": "<p>The team writes stage transitions to a log. Write the function <code>valid_history(history)</code>: if each next stage in the log is the <b>next</b> one in the cycle after the previous stage, it returns <code>True</code>, otherwise <code>False</code>. An empty or one-item log counts as correct. The function <code>next_stage</code> is already written.</p>",
    "hints": [
     "Adjacent pairs: <code>zip(history, history[1:])</code>.",
     "Each pair must satisfy <code>next_stage(a) == b</code>."
    ],
    "check": {
     "tests": "assert valid_history(['deployment', 'monitoring', 'data', 'training']) is True, 'monitoring → data is correct in the cycle'\nassert valid_history(['data', 'deployment']) is False, 'data is never followed directly by deployment (training and evaluation are skipped)'\nassert valid_history(['training', 'evaluation', 'training']) is False, 'A backward step is wrong'\nassert valid_history([]) is True and valid_history(['data']) is True, 'An empty or one-item log is correct'"
    }
   },
   {
    "title": "Grouping the hours",
    "prompt": "<p>We group the stages into three groups: <code>GROUPS = {'data': [...], 'model': [...], 'ops': [...]}</code>. Write the function <code>group_hours(hours, groups)</code>: it returns a dictionary with the total hours of each group. A stage that is not in <code>hours</code> counts as 0.</p>",
    "hints": [
     "<code>{g: sum(...) for g, stages in groups.items()}</code>.",
     "For a missing stage: <code>hours.get(s, 0)</code>."
    ],
    "check": {
     "tests": "assert group_hours(hours, GROUPS) == {'data': 100, 'model': 25, 'ops': 35}, f'Expected data=100, model=25, ops=35, yours is {group_hours(hours, GROUPS)}'\nassert group_hours({}, {'x': ['a']}) == {'x': 0}, 'A stage missing from hours is 0'"
    }
   },
   {
    "title": "Lifecycle cycle",
    "prompt": "<p>Write the function <code>run_cycle(start, steps)</code>: starting from the stage <code>start</code>, it moves to the next stage <code>steps</code> times and returns the list of all the stages passed (including the starting one, of length <code>steps + 1</code>). Also write the function <code>retrain_count(start, steps)</code>: it counts how many times the path returns from <code>'monitoring'</code> to <code>'data'</code> (that is, the retraining cycle). For an unknown stage, the function raises <code>ValueError</code>.</p>",
    "hints": [
     "<code>run_cycle</code>: keep appending the next stage after the last element of the list: <code>path.append(next_stage(path[-1]))</code>.",
     "<code>retrain_count</code>: count the pairs <code>('monitoring', 'data')</code> in the path."
    ],
    "check": {
     "tests": "assert run_cycle('deployment', 4) == ['deployment', 'monitoring', 'data', 'training', 'evaluation'], \"run_cycle('deployment', 4) is wrong\"\nassert run_cycle('data', 0) == ['data'], 'With steps=0 only the starting stage'\nassert len(run_cycle('training', 11)) == 12, 'The length is steps + 1'\nassert retrain_count('data', 12) == 2, '12 steps from data: monitoring → data twice'\nassert retrain_count('monitoring', 1) == 1 and retrain_count('data', 4) == 0, 'retrain_count is wrong'\ntry:\n    run_cycle('sales', 2)\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Белгісіз кезеңде ValueError')"
    }
   },
   {
    "title": "Stages by project",
    "prompt": "<p>The log of three projects is stored in the DataFrame <code>log</code>: columns <code>project</code>, <code>stage</code>, <code>hours</code>. Using pandas: <code>avg_by_stage</code> — the average hours of each stage across projects (a Series, <code>groupby</code>); <code>share_by_project</code> — the share of the <code>training</code> stage in each project (0–1, a Series, with the project name as the index); <code>heavy</code> — the sorted list of stages whose average is more than 20 hours.</p>",
    "hints": [
     "Average: <code>log.groupby('stage')['hours'].mean()</code>; total per project: <code>groupby('project')['hours'].sum()</code>.",
     "The training rows: <code>log[log['stage'] == 'training'].set_index('project')['hours']</code>, then divide — the indexes will match."
    ],
    "check": {
     "tests": "assert avg_by_stage is not None and abs(float(avg_by_stage['data']) - 40) < 1e-9 and abs(float(avg_by_stage['training']) - 15) < 1e-9, 'avg_by_stage: data = 40, training = 15'\nassert share_by_project is not None and abs(float(share_by_project['churn']) - 0.125) < 1e-9, 'The training share in the churn project is 10 / 80 = 0.125'\nassert abs(float(share_by_project['price']) - 20 / 70) < 1e-9 and abs(float(share_by_project['fraud']) - 0.125) < 1e-9, 'price: 20/70, fraud: 15/120'\nassert heavy == ['data'], f'Only data has an average over 20 (deployment is exactly 20), yours is {heavy}'"
    }
   }
  ]
 },
 "ops-2": {
  "pr": [
   {
    "title": "Logging one run",
    "prompt": "<p><code>Tracker</code> is ready. Log one run: the name <code>'rf-200'</code>, params: <code>n_estimators=200</code>, <code>max_depth=6</code>; metrics: <code>val_auc=0.847</code>, <code>val_recall=0.71</code>. Use the methods of <code>tracker</code>.</p>",
    "hints": [
     "<code>run = tracker.start_run('rf-200')</code>.",
     "For each parameter <code>tracker.log_param(run, ...)</code>, for each metric <code>tracker.log_metric(run, ...)</code>."
    ],
    "check": {
     "tests": "assert len(tracker.runs) == 1 and tracker.runs[0]['name'] == 'rf-200', 'One run must have the name rf-200'\nassert tracker.runs[0]['params'] == {'n_estimators': 200, 'max_depth': 6}, 'params: n_estimators=200, max_depth=6'\nassert tracker.runs[0]['metrics'] == {'val_auc': 0.847, 'val_recall': 0.71}, 'metrics: val_auc=0.847, val_recall=0.71'"
    },
    "starter": "class Tracker:\n    \"\"\"MLflow-ға ұқсас кішкентай stub: әр run — params пен metrics сақтайтын dict.\"\"\"\n    def __init__(self):\n        self.runs = []\n    def start_run(self, name):\n        run = {'name': name, 'params': {}, 'metrics': {}}\n        self.runs.append(run)\n        return run\n    def log_param(self, run, key, value):\n        run['params'][key] = value\n    def log_metric(self, run, key, value):\n        run['metrics'][key] = value\n\ntracker = Tracker()\n# log the run here\n"
   },
   {
    "title": "Find a run by name",
    "prompt": "<p>Write the function <code>find_run(runs, name)</code>: it returns the run (a dict) with the given name, and if there is none, it returns <code>None</code>.</p>",
    "hints": [
     "<code>for r in runs: if r['name'] == name: return r</code>.",
     "When the loop finishes: <code>return None</code>."
    ],
    "check": {
     "tests": "assert find_run(runs, 'rf-200')['params']['n_estimators'] == 200, \"find_run(runs, 'rf-200') must return that run\"\nassert find_run(runs, 'tree-d8')['metrics'] == {'val_auc': 0.81}, \"find_run(runs, 'tree-d8') is wrong\"\nassert find_run(runs, 'xgb') is None, 'If not found, None'"
    }
   },
   {
    "title": "Metric values",
    "prompt": "<p>Write the function <code>metric_values(runs, metric)</code>: it returns the list of values of this metric, in the same order as the runs, only for those runs that have it.</p>",
    "hints": [
     "Filter: <code>if metric in r['metrics']</code>.",
     "In a list comprehension the filter goes at the very end."
    ],
    "check": {
     "tests": "assert metric_values(runs, 'val_auc') == [0.79, 0.83, 0.81, 0.85], 'val_auc values: 0.79, 0.83, 0.81, 0.85'\nassert metric_values(runs, 'val_recall') == [0.66, 0.71, 0.69], 'Runs without this metric are skipped'\nassert metric_values(runs, 'rmse') == [], 'If no run has the metric → []'"
    }
   },
   {
    "title": "Run leaderboard",
    "prompt": "<p>Write the function <code>leaderboard(runs, metric, n=3)</code>: it returns the names of the <code>n</code> best runs by the metric, in descending order. Runs without this metric are not counted.</p>",
    "hints": [
     "First the filter, then <code>sorted(valid, key=lambda r: r['metrics'][metric], reverse=True)</code>.",
     "Names: <code>[r['name'] for r in valid[:n]]</code>."
    ],
    "check": {
     "tests": "assert leaderboard(runs, 'val_auc') == ['rf-200', 'tree-d5', 'tree-d8'], f\"Expected ['rf-200', 'tree-d5', 'tree-d8'], yours is {leaderboard(runs, 'val_auc')}\"\nassert leaderboard(runs, 'val_recall', n=2) == ['tree-d5', 'rf-200'], 'The first two by val_recall'\nassert leaderboard(runs, 'val_recall', n=10) == ['tree-d5', 'rf-200', 'lr-c1'], 'Runs without the metric are not in the list'"
    }
   },
   {
    "title": "Filter by a parameter",
    "prompt": "<p>Write the function <code>filter_runs(runs, key, value)</code>: it returns the names of the runs where <code>params[key] == value</code> holds. Then write into the variable <code>best_tree</code> the name of the run with the highest <code>val_auc</code> among the runs where <code>model == 'tree'</code>.</p>",
    "hints": [
     "So that a run without the parameter does not cause an error: <code>r['params'].get(key) == value</code>.",
     "Find the tree runs, then <code>max(..., key=lambda r: r['metrics']['val_auc'])</code>."
    ],
    "check": {
     "tests": "assert filter_runs(runs, 'model', 'rf') == ['rf-200', 'broken'], \"The runs with model='rf': rf-200, broken\"\nassert filter_runs(runs, 'max_depth', 8) == ['tree-d8'], 'max_depth=8 → tree-d8'\nassert filter_runs(runs, 'C', 100) == [], 'No matching runs → []'\nassert best_tree == 'tree-d5', f'The best of the tree runs is tree-d5 (0.83), yours is {best_tree}'"
    }
   },
   {
    "title": "Runs as a table",
    "prompt": "<p><code>mlflow.search_runs</code> returns the runs as a DataFrame. Write the function <code>runs_to_df(runs)</code>: each run is one row, the columns are: <code>name</code>, each parameter is <code>params.&lt;атауы&gt;</code>, each metric is <code>metrics.&lt;атауы&gt;</code>. Missing values are NaN. Then <code>df = runs_to_df(runs)</code>.</p>",
    "hints": [
     "For each run, make a “flat” dictionary: <code>row[f'params.{k}'] = v</code>.",
     "<code>pd.DataFrame(rows)</code> turns missing values in a list of dictionaries into NaN."
    ],
    "check": {
     "tests": "assert list(df['name']) == ['lr-c1', 'tree-d5', 'tree-d8', 'rf-200', 'broken'], 'Each run is one row, in order'\nassert {'params.model', 'params.C', 'params.max_depth', 'params.n_estimators', 'metrics.val_auc', 'metrics.val_recall'} <= set(df.columns), f'The params.* and metrics.* columns are needed, yours are {list(df.columns)}'\nassert float(df.loc[df['name'] == 'rf-200', 'metrics.val_auc'].iloc[0]) == 0.85, 'rf-200 has metrics.val_auc = 0.85'\nassert df.loc[df['name'] == 'broken', 'metrics.val_auc'].isna().all(), 'A missing metric must be NaN'\nassert df.sort_values('metrics.val_auc', ascending=False)['name'].iloc[0] == 'rf-200', 'The table must be sortable by the metric'"
    }
   },
   {
    "title": "Grid search with logging",
    "prompt": "<p><code>score(depth, lr)</code> is a ready-made function that computes the AUC on validation. For each combination of the grid <code>DEPTHS</code> × <code>LRS</code>, open a run (name <code>f'gb-d{depth}-lr{lr}'</code>), log the parameters <code>max_depth</code> and <code>learning_rate</code>, and the metric <code>val_auc</code> (rounded to 4 decimal places). The runs go in order: first by depth, inside that by lr. Then write into the variable <code>best</code> the run (a dict) with the highest <code>val_auc</code>.</p>",
    "hints": [
     "Two nested loops: the outer is <code>for depth in DEPTHS:</code>, the inner is <code>for lr in LRS:</code>.",
     "The best: <code>max(tracker.runs, key=lambda r: r['metrics']['val_auc'])</code>."
    ],
    "check": {
     "tests": "assert len(tracker.runs) == 6, f'There must be 3 × 2 = 6 runs, yours is {len(tracker.runs)}'\nassert [r['name'] for r in tracker.runs] == ['gb-d2-lr0.05', 'gb-d2-lr0.1', 'gb-d4-lr0.05', 'gb-d4-lr0.1', 'gb-d6-lr0.05', 'gb-d6-lr0.1'], 'The names and order of the runs are wrong'\nassert all(set(r['params']) == {'max_depth', 'learning_rate'} for r in tracker.runs), 'Each run has the max_depth and learning_rate parameters'\nassert tracker.runs[2]['metrics']['val_auc'] == round(score(4, 0.05), 4), 'val_auc must be rounded to 4 decimal places'\nassert best is not None and best['name'] == 'gb-d4-lr0.1', f\"The best run is gb-d4-lr0.1, yours is {best and best['name']}\""
    }
   },
   {
    "title": "Compare two runs",
    "prompt": "<p>Write the function <code>compare_runs(a, b)</code>: it returns a dictionary <code>{'params': {...}, 'metrics': {...}}</code>. The key <code>params</code> holds the parameters whose values differ between the two runs (or that exist in only one of them), in the form <code>{атауы: (a мәні, b мәні)}</code>, with a missing value shown as <code>None</code>. The key <code>metrics</code> holds the difference <code>b - a</code> for the metrics present in both runs, rounded to 4 decimal places. Then execute <code>diff = compare_runs(find('tree-d5'), find('rf-200'))</code>.</p>",
    "hints": [
     "All parameter names: <code>set(a['params']) | set(b['params'])</code>; get the values with <code>.get(k)</code>.",
     "The metric difference only if the metric is in both runs: <code>round(b - a, 4)</code>."
    ],
    "check": {
     "tests": "assert diff is not None and diff['params'] == {'max_depth': (5, None), 'model': ('tree', 'rf'), 'n_estimators': (None, 200)}, f\"The params difference is wrong: {diff and diff['params']}\"\nassert diff['metrics'] == {'val_auc': 0.02, 'val_recall': -0.02}, f\"The metrics difference: val_auc +0.02, val_recall -0.02, yours is {diff['metrics']}\"\nassert compare_runs(find('tree-d5'), find('tree-d8'))['metrics'] == {'val_auc': -0.02}, 'Only the metrics present in both runs are compared'\nassert compare_runs(find('lr-c1'), find('lr-c1')) == {'params': {}, 'metrics': {'val_auc': 0.0, 'val_recall': 0.0}}, 'Identical runs have no parameter difference'"
    }
   }
  ]
 },
 "ops-3": {
  "pr": [
   {
    "title": "Random numbers with a seed",
    "prompt": "<p>Write the function <code>dice(seed)</code>: using <code>np.random.default_rng(seed)</code> it creates 5 random integers from 1 to 6 (inclusive) by calling <code>rng.integers(1, 7, 5)</code> and returns them as a list of <code>int</code> values. The same seed must always give the same result.</p>",
    "hints": [
     "The problem is in the line <code>default_rng()</code>: the seed is not passed.",
     "<code>np.random.default_rng(seed)</code>."
    ],
    "check": {
     "tests": "import numpy as _np\n_ref = [int(x) for x in _np.random.default_rng(2026).integers(1, 7, 5)]\nassert dice(2026) == _ref, 'Use np.random.default_rng(seed)'\nassert dice(7) == dice(7), 'One seed — one result'\nassert all(1 <= x <= 6 for x in dice(1)) and all(type(x) is int for x in dice(1)), 'A list of int from 1 to 6'"
    }
   },
   {
    "title": "Hash of bytes",
    "prompt": "<p>The file is read as bytes. Write the function <code>file_hash(data)</code>: for <code>bytes</code> it returns the first 8 hex characters of the SHA-256 hash. Then write into the variables <code>h1</code> and <code>h2</code> the hashes of <code>csv_v1</code> and <code>csv_v2</code>.</p>",
    "hints": [
     "The bytes are passed directly: <code>hashlib.sha256(data)</code> (<code>.encode</code> is not needed).",
     "<code>.hexdigest()[:8]</code>."
    ],
    "check": {
     "tests": "import hashlib as _h\nassert file_hash(b'abc') == _h.sha256(b'abc').hexdigest()[:8], 'Return sha256(data).hexdigest()[:8]'\nassert len(h1) == 8 and h1 != h2, 'If one character changes, the hash changes too (even when the length is the same)'\nassert h1 == file_hash(csv_v1), 'One piece of data — one hash'"
    }
   },
   {
    "title": "Are all versions pinned?",
    "prompt": "<p>For reproducibility, the version of each library in requirements.txt must be pinned with <code>==</code>. Write the function <code>all_pinned(text)</code>: if every line, except the empty ones and the comments starting with <code>#</code>, contains <code>==</code>, it returns <code>True</code>.</p>",
    "hints": [
     "Cut the comment off each line: <code>line.split('#')[0].strip()</code>.",
     "If a non-empty line has no <code>==</code>, immediately <code>return False</code>."
    ],
    "check": {
     "tests": "assert all_pinned('pandas==2.2.3\\nscikit-learn==1.6.1\\nnumpy==2.1.3\\n') is True, 'Everything pinned → True'\nassert all_pinned('pandas==2.2.3\\nnumpy>=1.26\\n') is False, 'numpy>=1.26 is not pinned → False'\nassert all_pinned('# ортам\\n\\npandas==2.2.3  # дерек\\n') is True, 'Comments and empty lines are ignored'\nassert all_pinned('joblib  # ==1.4\\n') is False, 'A == inside a comment does not count'"
    }
   },
   {
    "title": "Run metadata",
    "prompt": "<p>Along with each run we save the data needed to repeat it. Write the function <code>run_meta(seed, data_text, commit, versions)</code>: it returns <code>{'seed': seed, 'data_sha': мәтіннің SHA-256 hash-ының алғашқы 12 таңбасы, 'commit': commit-тің алғашқы 7 таңбасы, 'versions': versions сөздігінің көшірмесі}</code>.</p>",
    "hints": [
     "Hash: <code>hashlib.sha256(data_text.encode('utf-8')).hexdigest()[:12]</code>.",
     "Copy: <code>dict(versions)</code>."
    ],
    "check": {
     "tests": "import hashlib as _h\n_v = {'scikit-learn': '1.6.1', 'pandas': '2.2.3'}\n_m = run_meta(42, 'id,churn\\n1,0\\n', '3fa9c01b7e2d55aa', _v)\nassert _m == {'seed': 42, 'data_sha': _h.sha256('id,churn\\n1,0\\n'.encode('utf-8')).hexdigest()[:12], 'commit': '3fa9c01', 'versions': _v}, f'The run_meta result is wrong: {_m}'\n_v['numpy'] = '2.1.3'\nassert 'numpy' not in _m['versions'], 'Save a copy of versions: dict(versions)'"
    }
   },
   {
    "title": "Train/test split with a seed",
    "prompt": "<p>Write the function <code>split_ids(ids, test_share, seed)</code>. Inside: <code>rng = np.random.default_rng(seed)</code>, <code>order = rng.permutation(len(ids))</code>; the first <code>round(len(ids) * test_share)</code> indexes are test, the rest are train. It returns <code>(train, test)</code>: both are <b>sorted</b> lists of ids of type <code>int</code>. One seed — one split.</p>",
    "hints": [
     "<code>order = rng.permutation(len(ids))</code> — a random order of the indexes.",
     "Test: <code>order[:n_test]</code>, train: <code>order[n_test:]</code>; at the end <code>sorted(...)</code>."
    ],
    "check": {
     "tests": "import numpy as _np\n_o = _np.random.default_rng(42).permutation(20)\n_test = sorted(int(ids[i]) for i in _o[:5])\n_tr, _te = split_ids(ids, 0.25, 42)\nassert _te == _test, 'test is the first round(n * test_share) indexes of the rng.permutation result'\nassert len(_tr) == 15 and sorted(_tr + _te) == ids, 'train and test together give all the ids and do not overlap'\nassert split_ids(ids, 0.25, 7) == split_ids(ids, 0.25, 7), 'One seed — one split'\nassert split_ids(ids, 0.25, 7) != split_ids(ids, 0.25, 8), 'A different seed — a different split'"
    }
   },
   {
    "title": "Do two runs match?",
    "prompt": "<p>Two runs each have metadata. Write the function <code>diff_meta(a, b)</code>: it returns the list of the fields that affect the result and whose values differ: first <code>seed</code>, <code>data_sha</code>, <code>commit</code>, then each library from <code>versions</code>, for example <code>versions.scikit-learn</code>. The list is sorted by library name; a library that is missing in one of the runs also counts as a difference.</p>",
    "hints": [
     "First the three main fields, then the libraries: <code>sorted(set(va) | set(vb))</code>.",
     "For a missing library, <code>.get(lib)</code> gives <code>None</code> — that is a difference too."
    ],
    "check": {
     "tests": "assert diff_meta(run_a, run_b) == ['commit', 'versions.numpy', 'versions.scikit-learn'], f'Expected commit, versions.numpy, versions.scikit-learn. Yours is {diff_meta(run_a, run_b)}'\nassert diff_meta(run_a, run_a) == [], 'Identical runs have no differences'\nassert diff_meta(dict(run_a, seed=7), run_a) == ['seed'], 'A difference in seed'"
    }
   },
   {
    "title": "A hash independent of row order",
    "prompt": "<p>An export changes the order of the rows each time, but the data stays the same. Write the function <code>table_fingerprint(csv_text)</code>: the first row (the header) stays in place, the other non-empty rows are sorted, then everything is joined with <code>\\n</code>, and the first 12 characters of the SHA-256 hash are returned. Trailing spaces at the end of a row are ignored. So if the order of the rows changes, the hash does not change, but if a value changes, it does.</p>",
    "hints": [
     "Clean up the rows: <code>[l.rstrip() for l in csv_text.splitlines()]</code>, remove the empty rows.",
     "Header + sorted rows → <code>'\\n'.join(...)</code> → sha256."
    ],
    "check": {
     "tests": "import hashlib as _h\nassert len(table_fingerprint(v1)) == 12, 'The hash length is 12'\nassert table_fingerprint(v1) == table_fingerprint(v1_shuffled), 'The row order and trailing spaces must not change the hash'\nassert table_fingerprint(v1) != table_fingerprint(v2), 'If a value changes, the hash changes'\nassert table_fingerprint(v1) == _h.sha256('customer_id,city,churned\\n1,Алматы,0\\n2,Астана,1\\n3,Шымкент,0'.encode('utf-8')).hexdigest()[:12], 'Canonical form: the header, then the sorted rows, joined with \\\\n'\nassert table_fingerprint('b,a\\n1,2\\n') != table_fingerprint('a,b\\n1,2\\n'), 'The header is part of the hash too'"
    }
   },
   {
    "title": "A repeatable experiment",
    "prompt": "<p>Write the function <code>run_experiment(seed)</code>: (1) <code>rng = np.random.default_rng(seed)</code>; (2) pick 8 ids from <code>CUSTOMERS</code> with <code>rng.choice(CUSTOMERS, 8, replace=False)</code>; (3) <code>score</code> — the average of the <code>CHURN</code> values over the picked ids, rounded to 4 decimal places (type <code>float</code>); (4) <code>sample_sha</code> — the first 12 characters of the SHA-256 hash of the text in which the picked ids are sorted and joined with commas. Return <code>{'seed', 'sample_sha', 'score'}</code>.</p>",
    "hints": [
     "Convert the picked ids to <code>int</code>: <code>[int(x) for x in rng.choice(...)]</code>.",
     "The hash text: <code>','.join(str(c) for c in sorted(sample))</code>."
    ],
    "check": {
     "tests": "import numpy as _np, hashlib as _h\n_s = [int(x) for x in _np.random.default_rng(42).choice(CUSTOMERS, 8, replace=False)]\n_r = run_experiment(42)\nassert set(_r) == {'seed', 'sample_sha', 'score'} and _r['seed'] == 42, 'Keys: seed, sample_sha, score'\nassert _r['score'] == round(float(_np.mean([CHURN[c] for c in _s])), 4), 'score — the average CHURN over the picked ids (4 decimal places)'\nassert _r['sample_sha'] == _h.sha256(','.join(str(c) for c in sorted(_s)).encode('utf-8')).hexdigest()[:12], 'sample_sha — the hash of the text of the sorted ids'\nassert run_experiment(42) == _r, 'One seed — one result'\nassert run_experiment(43)['sample_sha'] != _r['sample_sha'], 'A different seed — a different sample'"
    }
   }
  ]
 },
 "ops-4": {
  "pr": [
   {
    "title": "Latest version",
    "prompt": "<p>Write the function <code>latest_version(registry, name)</code>: it returns the largest version number of the model (<code>int</code>). If the model is not in the registry, it returns <code>None</code>.</p>",
    "hints": [
     "<code>max(v['version'] for v in registry[name])</code>.",
     "If the model is missing, first <code>return None</code>."
    ],
    "check": {
     "tests": "assert latest_version(registry, 'churn-model') == 5, 'The latest version of churn-model is 5'\nassert latest_version(registry, 'price-model') == 1, 'price-model — 1'\nassert latest_version(registry, 'fraud-model') is None, 'A missing model → None'"
    }
   },
   {
    "title": "Versions by stage",
    "prompt": "<p>Write the function <code>versions_in(registry, name, stage)</code>: it returns the list of version numbers in the given stage, sorted in ascending order.</p>",
    "hints": [
     "<code>[v['version'] for v in registry[name] if v['stage'] == stage]</code>.",
     "Sorting: <code>sorted(...)</code>."
    ],
    "check": {
     "tests": "assert versions_in(registry, 'churn-model', 'Archived') == [1, 2], 'Archived: [1, 2]'\nassert versions_in(registry, 'churn-model', 'Production') == [3], 'Production: [3]'\nassert versions_in(registry, 'price-model', 'Staging') == [], 'Nothing in Staging → []'"
    }
   },
   {
    "title": "Registering a new version",
    "prompt": "<p>Write the function <code>register(registry, name, val_auc)</code>: it adds a new version to the model: the number is the largest version number + 1 (if the model does not exist, the number is 1 and the list is created), and the stage is <code>'None'</code>. It returns the dict of the new version.</p>",
    "hints": [
     "<code>registry.setdefault(name, [])</code> creates an empty list if the model is missing.",
     "Number: <code>max((...), default=0) + 1</code>."
    ],
    "check": {
     "tests": "_r = {'m': [{'version': 1, 'stage': 'Production', 'val_auc': 0.8}, {'version': 2, 'stage': 'None', 'val_auc': 0.7}]}\nassert register(_r, 'm', 0.82) == {'version': 3, 'stage': 'None', 'val_auc': 0.82}, 'New version: version 3, stage None'\nassert len(_r['m']) == 3 and _r['m'][-1]['version'] == 3, 'The version must be added to the registry'\nassert register(_r, 'fraud', 0.9) == {'version': 1, 'stage': 'None', 'val_auc': 0.9} and _r['fraud'][0]['version'] == 1, 'A new model → version 1'"
    }
   },
   {
    "title": "Rollback",
    "prompt": "<p>The model in Production is working badly. Write the function <code>rollback(registry, name)</code>: the current version (stage <code>Production</code>) becomes <code>Archived</code>, and among the versions <code>Archived</code> (the earlier ones, other than the current one) the version with the largest number is chosen — it becomes <code>Production</code>. The function returns the dict of the new production version. If there is no <code>Production</code> version or no suitable <code>Archived</code> version, the function raises <code>ValueError</code>, and the registry does not change.</p>",
    "hints": [
     "First find the current production version and the target archived version; change the stages only if both exist.",
     "Target: <code>max(archived, key=lambda v: v['version'])</code>."
    ],
    "check": {
     "tests": "_r = {'m': [{'version': 1, 'stage': 'Archived'}, {'version': 2, 'stage': 'Archived'}, {'version': 3, 'stage': 'Production'}, {'version': 4, 'stage': 'Staging'}]}\n_p = rollback(_r, 'm')\nassert _p['version'] == 2, 'We roll back from v3 to v2 (the largest of the Archived)'\nassert [v['stage'] for v in _r['m']] == ['Archived', 'Production', 'Archived', 'Staging'], 'v3 Archived, v2 Production, v4 unchanged'\n_x = {'m': [{'version': 1, 'stage': 'Production'}, {'version': 2, 'stage': 'Staging'}]}\ntry:\n    rollback(_x, 'm')\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Archived нұсқа жоқ болса ValueError')\nassert _x['m'][0]['stage'] == 'Production', 'On an error the registry must not change'\n_y = {'m': [{'version': 1, 'stage': 'Archived'}]}\ntry:\n    rollback(_y, 'm')\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Production жоқ болса ValueError')"
    }
   },
   {
    "title": "Loading by alias",
    "prompt": "<p>New MLflow versions use an alias instead of a stage. <code>aliases</code> is a dictionary: <code>{(модель, alias): нұсқа}</code>. <code>set_alias(aliases, name, alias, version)</code> sets the alias (replacing the old one). <code>resolve(aliases, uri)</code> returns the version number from a URI of the form <code>'models:/churn-model@champion'</code>; if the URI does not start with <code>models:/</code>, there is no <code>@</code>, or the alias is not found, the function raises <code>ValueError</code>.</p>",
    "hints": [
     "The key is a tuple: <code>aliases[(name, alias)] = version</code>.",
     "Parsing the URI: <code>uri[len('models:/'):].split('@')</code>."
    ],
    "check": {
     "tests": "_a = {}\nset_alias(_a, 'churn-model', 'champion', 3)\nset_alias(_a, 'churn-model', 'challenger', 4)\nassert resolve(_a, 'models:/churn-model@champion') == 3, 'champion → 3'\nset_alias(_a, 'churn-model', 'champion', 2)\nassert resolve(_a, 'models:/churn-model@champion') == 2, 'For a rollback it is enough to point the alias to 2'\nassert resolve(_a, 'models:/churn-model@challenger') == 4, 'challenger → 4'\nfor _u in ['models:/churn-model@legacy', 'churn-model@champion', 'models:/churn-model']:\n    try:\n        resolve(_a, _u)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f'{_u} үшін ValueError күтілді')"
    }
   },
   {
    "title": "Promotion conditions",
    "prompt": "<p>A new version goes to production only if all three conditions are met. Write the function <code>promotion_blockers(candidate, production, data_ok)</code>: it returns the list of the conditions that are not met (in this order): <code>'metric'</code> — the candidate's <code>val_auc</code> is not strictly higher than that of production; <code>'data'</code> — <code>data_ok</code> is False; <code>'staging'</code> — the candidate's stage is not <code>'Staging'</code>. If <code>production</code> is <code>None</code>, the metric condition counts as met.</p>",
    "hints": [
     "Three separate <code>if</code> statements: each adds its own name to the list.",
     "The metric condition: <code>production is not None and candidate['val_auc'] &lt;= production['val_auc']</code>."
    ],
    "check": {
     "tests": "_prod = {'version': 3, 'stage': 'Production', 'val_auc': 0.81}\nassert promotion_blockers({'version': 4, 'stage': 'Staging', 'val_auc': 0.84}, _prod, True) == [], 'Everything met → []'\nassert promotion_blockers({'version': 5, 'stage': 'None', 'val_auc': 0.81}, _prod, False) == ['metric', 'data', 'staging'], 'An equal metric is not enough either; all three conditions are not met'\nassert promotion_blockers({'version': 1, 'stage': 'Staging', 'val_auc': 0.6}, None, True) == [], 'If there is no production, the metric condition is met'"
    }
   },
   {
    "title": "Promotion with checks",
    "prompt": "<p>Write the function <code>promote_if_ready(registry, name, version, data_ok)</code>. If there is no such version, raise <code>ValueError</code>. The conditions (the check order: metric, data, staging): the candidate's <code>val_auc</code> is strictly higher than the current production's (if there is no production, the condition is met); <code>data_ok</code>; the candidate is in the stage <code>Staging</code>. If all are met: the former production gets the stage <code>Archived</code>, the candidate gets <code>Production</code>, and <code>('promoted', [])</code> is returned. Otherwise the registry does not change and <code>('blocked', [орындалмаған шарттар])</code> is returned.</p>",
    "hints": [
     "First find the candidate and the current production, check the conditions, and only then change the stages.",
     "If there are unmet conditions, return immediately: <code>if blockers: return 'blocked', blockers</code>."
    ],
    "check": {
     "tests": "import copy as _cp\n_r = {'churn-model': [{'version': 1, 'stage': 'Archived', 'val_auc': 0.78}, {'version': 2, 'stage': 'Archived', 'val_auc': 0.80}, {'version': 3, 'stage': 'Production', 'val_auc': 0.81}, {'version': 4, 'stage': 'Staging', 'val_auc': 0.84}, {'version': 5, 'stage': 'None', 'val_auc': 0.79}]}\n_before = _cp.deepcopy(_r)\nassert promote_if_ready(_r, 'churn-model', 5, True) == ('blocked', ['metric', 'staging']), 'v5: 0.79 < 0.81 and stage None'\nassert _r == _before, 'If it is blocked, the registry must not change'\nassert promote_if_ready(_r, 'churn-model', 4, False) == ('blocked', ['data']), 'v4: the data did not pass the check'\nassert promote_if_ready(_r, 'churn-model', 4, True) == ('promoted', []), 'v4 meets all the conditions'\nassert {v['version']: v['stage'] for v in _r['churn-model']} == {1: 'Archived', 2: 'Archived', 3: 'Archived', 4: 'Production', 5: 'None'}, 'v3 must be Archived, v4 Production'\n_n = {'m': [{'version': 1, 'stage': 'Staging', 'val_auc': 0.5}]}\nassert promote_if_ready(_n, 'm', 1, True) == ('promoted', []) and _n['m'][0]['stage'] == 'Production', 'If there is no production, the metric condition is met'\ntry:\n    promote_if_ready(_r, 'churn-model', 9, True)\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Жоқ нұсқада ValueError')"
    }
   },
   {
    "title": "Registry events",
    "prompt": "<p>Rebuild the history of the registry from a list of events. Write the function <code>replay(events)</code>: starting from an empty registry (one model), it applies each event in order: <code>('register', auc)</code> — a new version (the number in order 1, 2, ...), with stage <code>'None'</code>; <code>('stage', version)</code> — moves the version to stage <code>Staging</code>; <code>('promote', version)</code> — moves the version to stage <code>Production</code>, and the former production gets <code>Archived</code>; <code>('rollback',)</code> — the current production gets <code>Archived</code>, and the largest archived version smaller than it gets <code>Production</code>. Return the dict <code>{нұсқа: stage}</code>.</p>",
    "hints": [
     "Keep the versions in a list; for each event type, a separate branch <code>if/elif</code>.",
     "Helper inner functions are convenient: <code>find(n)</code> and <code>current()</code> (the current production)."
    ],
    "check": {
     "tests": "assert replay(events) == {1: 'Archived', 2: 'Production', 3: 'Archived', 4: 'None'}, f'The result is wrong: {replay(events)}'\nassert replay([('register', 0.7)]) == {1: 'None'}, 'One registration → {1: \"None\"}'\nassert replay([('register', 0.7), ('promote', 1), ('register', 0.8), ('promote', 2)]) == {1: 'Archived', 2: 'Production'}, 'promote makes the former production Archived'\nassert replay([]) == {}, 'No events → {}'"
    }
   }
  ]
 },
 "ops-5": {
  "pr": [
   {
    "title": "Exit code",
    "prompt": "<p>If a CI step returns a non-zero exit code, the build fails. Write the function <code>exit_code(errors)</code>: if the list of errors is empty, it returns <code>0</code>, otherwise <code>1</code>.</p>",
    "hints": [
     "An empty list is a false value: <code>1 if errors else 0</code>.",
     "We will later pass this value to <code>sys.exit(...)</code>."
    ],
    "check": {
     "tests": "assert exit_code([]) == 0, 'No errors → 0'\nassert exit_code(['auc төмендеді']) == 1 and exit_code(['a', 'b']) == 1, 'There are errors → 1'"
    }
   },
   {
    "title": "Absolute thresholds",
    "prompt": "<p>Write the function <code>below_floor(metrics, floors)</code>: for each metric from <code>floors</code> whose value is below its threshold (or that is not in <code>metrics</code> at all), it returns the metric's name, in the order of <code>floors</code>. For example, the thresholds <code>{'auc': 0.75, 'recall': 0.6}</code>.</p>",
    "hints": [
     "<code>for m, lo in floors.items():</code>.",
     "Even if the metric is missing, it goes into the list: <code>metrics.get(m) is None or metrics[m] &lt; lo</code>."
    ],
    "check": {
     "tests": "assert below_floor({'auc': 0.81, 'recall': 0.55}, {'auc': 0.75, 'recall': 0.6}) == ['recall'], 'recall 0.55 < 0.6'\nassert below_floor({'auc': 0.75, 'recall': 0.6}, {'auc': 0.75, 'recall': 0.6}) == [], 'A value equal to the threshold passes'\nassert below_floor({'auc': 0.7}, {'auc': 0.75, 'recall': 0.6}) == ['auc', 'recall'], 'A missing metric also fails the threshold'"
    }
   },
   {
    "title": "Workflow commands",
    "prompt": "<p>Take the commands out of a GitHub Actions file. Write the function <code>run_commands(yaml_text)</code>: from each line that starts with <code>- run: </code> (leading spaces are not counted), take the command, remove the comment <code>#</code> at the end of the line, and return the list of commands in order.</p>",
    "hints": [
     "Make each line <code>strip()</code>, then check <code>line.startswith('- run: ')</code>.",
     "Command: <code>line[len(prefix):].split('#')[0].strip()</code>."
    ],
    "check": {
     "tests": "assert run_commands(workflow) == ['pip install -r requirements.txt', 'pytest tests/', 'python train.py --out metrics.json', 'python check_metrics.py metrics.json baseline.json'], f'The list of commands is wrong: {run_commands(workflow)}'\nassert run_commands('steps:\\n  - uses: actions/setup-python@v5\\n') == [], 'The uses lines are not commands'"
    },
    "starter": "workflow = \"\"\"name: model-ci\non: [pull_request]\njobs:\n  train-and-check:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: pip install -r requirements.txt\n      - run: pytest tests/                      # unit tests\n      - run: python train.py --out metrics.json\n      - run: python check_metrics.py metrics.json baseline.json\n\"\"\"\n\ndef run_commands(yaml_text):\n    return []\n"
   },
   {
    "title": "Metrics with different directions",
    "prompt": "<p>For some metrics, the smaller the better (<code>logloss</code>, <code>rmse</code>). Write the function <code>check(new, base, lower_better, max_drop=0.01)</code>: for each metric from <code>base</code> it returns the list of error messages: the metric is missing from <code>new</code>; a “higher is better” metric is below <code>base - max_drop</code>; a “lower is better” metric (from the set <code>lower_better</code>) is above <code>base + max_drop</code>. The message starts with the metric's name.</p>",
    "hints": [
     "Three branches: is the metric missing → is it in <code>lower_better</code> → everything else.",
     "For a “lower is better” metric the threshold is reversed: <code>new[m] &gt; b + max_drop</code>."
    ],
    "check": {
     "tests": "_lb = {'logloss', 'rmse'}\nassert check({'auc': 0.83, 'logloss': 0.44}, {'auc': 0.83, 'logloss': 0.44}, _lb) == [], 'No change → []'\n_e = check({'auc': 0.82, 'logloss': 0.47}, {'auc': 0.83, 'logloss': 0.44}, _lb)\nassert len(_e) == 1 and _e[0].startswith('logloss'), f'auc dropped by 0.01 (within the limit), logloss rose by 0.03 → only the logloss error. Yours is {_e}'\nassert check({'auc': 0.85, 'logloss': 0.40}, {'auc': 0.83, 'logloss': 0.44}, _lb) == [], 'Both improved → []'\n_e = check({'rmse': 120.0}, {'rmse': 100.0, 'r2': 0.8}, _lb, max_drop=5)\nassert [x.split(':')[0] for x in _e] == ['rmse', 'r2'], 'rmse rose, r2 is missing'"
    }
   },
   {
    "title": "Range check",
    "prompt": "<p>A data test in CI: write the function <code>range_violations(df, ranges)</code>. <code>ranges</code> is <code>{баған: (min, max)}</code>. It returns the names of the columns that have at least one value outside the range (the bounds are allowed), in the order of <code>ranges</code>; if the column itself is missing — <code>'missing:баған'</code>. Empty values (NaN) are ignored.</p>",
    "hints": [
     "Drop the empty values: <code>df[col].dropna()</code>.",
     "Outside the range: <code>((values &lt; lo) | (values &gt; hi)).any()</code>."
    ],
    "check": {
     "tests": "assert range_violations(batch, RANGES) == ['tenure_months', 'support_calls', 'missing:age'], f'Expected tenure_months, support_calls, missing:age. Yours is {range_violations(batch, RANGES)}'\nassert range_violations(pd.DataFrame({'x': [0, 10]}), {'x': (0, 10)}) == [], 'Boundary values are allowed'\nassert range_violations(pd.DataFrame({'x': [None, 5]}), {'x': (0, 10)}) == [], 'NaN is ignored'"
    }
   },
   {
    "title": "Running CI steps",
    "prompt": "<p>The steps in a workflow run in order, and if one fails, the rest do not run. Write the function <code>run_pipeline(steps)</code>: <code>steps</code> is a list of pairs <code>(атауы, функция)</code>, and the function returns an exit code. Call the steps in order; stop at the first step that returns a non-zero code. Return <code>{'status': 'passed' немесе 'failed', 'ran': іске қосылған қадамдар атаулары, 'failed_step': құлаған қадам немесе None}</code>.</p>",
    "hints": [
     "Add the step's name to <code>ran</code> before the call.",
     "<code>if func() != 0: return {...}</code> — the early return will stop the remaining steps."
    ],
    "check": {
     "tests": "_called = []\ndef _step(name, code):\n    def f():\n        _called.append(name)\n        return code\n    return name, f\n_r = run_pipeline([_step('pytest', 0), _step('validate_data', 0), _step('check_metrics', 1), _step('deploy', 0)])\nassert _r == {'status': 'failed', 'ran': ['pytest', 'validate_data', 'check_metrics'], 'failed_step': 'check_metrics'}, f'The result is wrong: {_r}'\nassert 'deploy' not in _called, 'After a failed step, deploy must not run'\nassert run_pipeline([_step('a', 0), _step('b', 0)]) == {'status': 'passed', 'ran': ['a', 'b'], 'failed_step': None}, 'All 0 → passed'\nassert run_pipeline([]) == {'status': 'passed', 'ran': [], 'failed_step': None}, 'No steps → passed'"
    }
   },
   {
    "title": "Full CI check",
    "prompt": "<p>Write the function <code>ci_report(df, new, base)</code>: it combines the data test and the metric gate. Data: if a column from <code>REQUIRED</code> is missing → <code>'missing:баған'</code>; if <code>customer_id</code> has duplicates → <code>'duplicate_id'</code>; if <code>monthly_fee</code> has a negative value → <code>'negative_fee'</code>. Metric: if any metric from <code>base</code> is missing from <code>new</code> or is below <code>base - 0.01</code> → <code>'metric:атауы'</code>; if <code>new['auc'] &lt; 0.75</code> → <code>'auc_floor'</code>. If there are data problems, the metric is not checked (if the data is bad, we do not trust the metrics). Return <code>(exit_code, messages)</code>.</p>",
    "hints": [
     "Write two separate functions: <code>data_problems(df)</code> and <code>metric_problems(new, base)</code>; <code>ci_report</code> will combine them.",
     "A duplicate id: <code>df['customer_id'].duplicated().any()</code>."
    ],
    "check": {
     "tests": "_good = pd.DataFrame({'customer_id': [1, 2, 3], 'monthly_fee': [4990, 0, 7500], 'tenure_months': [3, 12, 40]})\nassert ci_report(_good, {'auc': 0.83, 'recall': 0.70}, {'auc': 0.83, 'recall': 0.70}) == (0, []), 'Everything is correct → (0, [])'\nassert ci_report(_good, {'auc': 0.80, 'recall': 0.70}, {'auc': 0.83, 'recall': 0.70}) == (1, ['metric:auc']), 'auc dropped by 0.03'\nassert ci_report(_good, {'auc': 0.74}, {'auc': 0.745, 'recall': 0.6}) == (1, ['metric:recall', 'auc_floor']), 'recall is missing, auc is below the threshold'\n_bad = pd.DataFrame({'customer_id': [1, 1, 3], 'monthly_fee': [4990, -10, 7500]})\nassert ci_report(_bad, {'auc': 0.5}, {'auc': 0.83}) == (1, ['missing:tenure_months', 'duplicate_id', 'negative_fee']), 'If there are data problems, the metric is not checked'"
    }
   },
   {
    "title": "Updating the baseline",
    "prompt": "<p>After a merge the baseline is updated, but only if the build passed. Write the function <code>update_baseline(base, new, errors, lower_better=frozenset())</code>: if <code>errors</code> is not empty, it returns an unchanged <b>copy</b> of <code>base</code>. If it is empty, it returns a new dictionary: for each metric from <code>base</code>, the better value is taken (for a “higher is better” metric — <code>max</code>, for the metrics from <code>lower_better</code> — <code>min</code>; if a metric is missing from <code>new</code>, the old value stays), and the new metrics from <code>new</code> are added. The original <code>base</code> must not change.</p>",
    "hints": [
     "Always work with a copy: <code>result = dict(base)</code>.",
     "For each new metric there are three cases: a new key, “lower is better” (<code>min</code>), “higher is better” (<code>max</code>)."
    ],
    "check": {
     "tests": "_b = {'auc': 0.83, 'logloss': 0.44}\n_r = update_baseline(_b, {'auc': 0.85, 'logloss': 0.46, 'recall': 0.7}, [], {'logloss'})\nassert _r == {'auc': 0.85, 'logloss': 0.44, 'recall': 0.7}, f'auc improved, logloss got worse (the old value stays), recall added. Yours is {_r}'\nassert _b == {'auc': 0.83, 'logloss': 0.44}, 'base must not change'\n_r2 = update_baseline(_b, {'auc': 0.9}, ['metric:recall'])\nassert _r2 == _b and _r2 is not _b, 'On an error the copy of base stays unchanged'\nassert update_baseline({'auc': 0.8, 'rmse': 10.0}, {'rmse': 8.0}, [], {'rmse'}) == {'auc': 0.8, 'rmse': 8.0}, 'A metric that is not in new is kept, rmse decreased'"
    }
   }
  ]
 },
 "ops-6": {
  "pr": [
   {
    "title": "Error rate",
    "prompt": "<p>Write the function <code>error_rate(statuses)</code>: it returns the share (0–1) of status codes 500 and above. If the list is empty, it returns <code>0.0</code>.</p>",
    "hints": [
     "<code>sum(1 for s in statuses if s &gt;= 500)</code> — the number of server errors.",
     "404 is a client error, it is not counted."
    ],
    "check": {
     "tests": "assert error_rate([200, 200, 503, 200, 500, 404, 200, 200]) == 0.25, '2 of 8 requests are 5xx → 0.25 (404 is not counted)'\nassert error_rate([200] * 10) == 0.0, 'No errors → 0.0'\nassert error_rate([]) == 0.0, 'Empty list → 0.0'"
    }
   },
   {
    "title": "Share of empty values",
    "prompt": "<p>We monitor the quality of the input data. Write into the variable <code>null_shares</code> the share of empty values in each column of the DataFrame <code>requests</code> (a Series, <code>isna().mean()</code>), and into <code>bad_cols</code> the list of columns whose share is greater than 0.1.</p>",
    "hints": [
     "<code>requests.isna().mean()</code> — the share of empty values in each column.",
     "<code>[c for c, s in null_shares.items() if s &gt; 0.1]</code>."
    ],
    "check": {
     "tests": "assert null_shares is not None and abs(float(null_shares['monthly_fee']) - 0.3) < 1e-9 and abs(float(null_shares['city']) - 0.1) < 1e-9, 'null_shares: monthly_fee 0.3, city 0.1'\nassert bad_cols == ['monthly_fee'], f'Only monthly_fee is above 0.1 (tenure and city are exactly 0.1). Yours is {bad_cols}'"
    }
   },
   {
    "title": "Weekly requests",
    "prompt": "<p>In the DataFrame <code>logs</code> each request has a week. Write into the variable <code>weekly_counts</code> the number of requests in each week (a Series sorted by week), and into <code>drop_weeks</code> the list (int) of weeks in which the number of requests fell by 2 times or more compared with the previous week.</p>",
    "hints": [
     "Counting: <code>logs.groupby('week').size()</code> (or <code>value_counts().sort_index()</code>).",
     "Compare neighbouring weeks: <code>zip(...values[:-1], ...values[1:])</code>, the condition <code>cur * 2 &lt;= prev</code>."
    ],
    "check": {
     "tests": "assert weekly_counts is not None and [int(x) for x in weekly_counts.values] == [12, 11, 5, 10], 'weekly_counts: 12, 11, 5, 10'\nassert [int(x) for x in weekly_counts.index] == [1, 2, 3, 4], 'Sorted by week'\nassert drop_weeks == [3], f'Only week 3 (11 → 5) fell by half. Yours is {drop_weeks}'"
    }
   },
   {
    "title": "Alert rules",
    "prompt": "<p>The alert rules are stored in a dictionary: <code>{alert атауы: (метрика, шек)}</code>; an alert fires if the metric is <b>above</b> the limit. Write the function <code>fire_alerts(metrics, rules)</code>: it returns the names of the alerts that fired, in the order of <code>rules</code>. If the metric is not in <code>metrics</code>, <code>'no_data:alert атауы'</code> is returned (missing data is also a problem).</p>",
    "hints": [
     "<code>for name, (metric, limit) in rules.items():</code>.",
     "First check whether the metric exists, then <code>metrics[metric] &gt; limit</code>."
    ],
    "check": {
     "tests": "assert fire_alerts({'p95_ms': 420, 'error_rate': 0.01, 'max_psi': 0.31, 'proba_delta': 0.05}, RULES) == ['latency', 'drift'], 'latency 420 > 300, drift 0.31 > 0.25'\nassert fire_alerts({'p95_ms': 300, 'error_rate': 0.02, 'max_psi': 0.1, 'proba_delta': 0.1}, RULES) == [], 'A value equal to the limit is not an alert'\nassert fire_alerts({'p95_ms': 100, 'error_rate': 0.05}, RULES) == ['errors', 'no_data:drift', 'no_data:proba_shift'], 'For missing metrics — no_data:...'"
    }
   },
   {
    "title": "New categories",
    "prompt": "<p>Categories that the model has not seen may appear in production. Write the function <code>new_categories(train, live)</code>: it returns the sorted list of values that are in <code>live</code> but not in <code>train</code> (empty values <code>None</code> are ignored). Then write into <code>unseen_share</code> the share of such values in <code>live_cities</code> (0–1; empty values are not counted).</p>",
    "hints": [
     "Set difference: <code>{v for v in live if v is not None and v not in set(train)}</code>, then <code>sorted</code>.",
     "Share: the number of new categories among the non-empty values / the number of non-empty values."
    ],
    "check": {
     "tests": "assert new_categories(train_cities, live_cities) == sorted(['Қонаев', 'Түркістан']), f'New cities: Қонаев, Түркістан (in sorted order). Yours is {new_categories(train_cities, live_cities)}'\nassert new_categories(['a'], ['a', None]) == [], 'None is not counted'\nassert unseen_share is not None and abs(float(unseen_share) - 3 / 8) < 1e-9, f'3 of 8 non-empty values are new: 0.375, yours is {unseen_share}'"
    }
   },
   {
    "title": "Weekly p95",
    "prompt": "<p>From the DataFrame <code>logs</code>: <code>weekly_p95</code> is the 95th percentile of <code>latency_ms</code> for each week (<code>groupby</code> + <code>quantile(0.95)</code>), <code>weekly_err</code> is the share of <code>status &gt;= 500</code> in each week, and <code>bad_weeks</code> is the sorted list of weeks (int) in which p95 &gt; 300 <b>or</b> the error share &gt; 0.02.</p>",
    "hints": [
     "<code>logs.groupby('week')['latency_ms'].quantile(0.95)</code>.",
     "Share: <code>(logs['status'] &gt;= 500).groupby(logs['week']).mean()</code>."
    ],
    "check": {
     "tests": "assert weekly_p95 is not None and abs(float(weekly_p95.loc[2]) - logs[logs['week'] == 2]['latency_ms'].quantile(0.95)) < 1e-9, 'weekly_p95 = groupby(\"week\")[\"latency_ms\"].quantile(0.95)'\nassert weekly_err is not None and abs(float(weekly_err.loc[3]) - 0.1) < 1e-9 and float(weekly_err.loc[1]) == 0.0, 'weekly_err: 0.1 in week 3, 0 in week 1'\nassert bad_weeks == [2, 3], f'Week 2 (p95 > 300) and week 3 (errors 10%). Yours is {bad_weeks}'"
    }
   },
   {
    "title": "Alert fatigue",
    "prompt": "<p>If one alert repeats every 5 minutes, the team stops reading it. Write the function <code>dedupe_alerts(events, cooldown=60)</code>: <code>events</code> is a list of pairs <code>(минут, alert атауы)</code> (sorted by time). If an alert with the same name arrives less than <code>cooldown</code> minutes after the last <b>sent</b> alert with that name, it is suppressed. Return <code>(sent, suppressed)</code>: the list of sent events and the number of suppressed ones (<code>suppressed</code>).</p>",
    "hints": [
     "Keep the time of the last send for each alert in a dictionary: <code>last_sent[name] = t</code>.",
     "A suppressed event does not update <code>last_sent</code>."
    ],
    "check": {
     "tests": "_s, _n = dedupe_alerts(events)\nassert _s == [(0, 'latency'), (10, 'errors'), (61, 'latency'), (70, 'errors'), (130, 'latency')], f'The sent events are wrong: {_s}'\nassert _n == 3, f'The number of suppressed is 3 (5, 30 for latency; 65 for errors), yours is {_n}'\nassert dedupe_alerts(events, cooldown=0) == (events, 0), 'With cooldown=0 all are sent'\nassert dedupe_alerts([], 30) == ([], 0), 'An empty list'"
    }
   },
   {
    "title": "Monitoring report",
    "prompt": "<p>Write the function <code>monitor_report(logs, baseline_proba=0.25)</code>: <code>logs</code> is a DataFrame with the columns <code>latency_ms</code>, <code>status</code>, <code>proba</code>, <code>monthly_fee</code>. The function returns a dictionary: <code>p95</code> — the 95th percentile of latency; <code>error_rate</code> — the share of <code>status &gt;= 500</code>; <code>mean_proba</code> — the mean of <code>proba</code> (without empty values); <code>fee_null</code> — the share of empty values in <code>monthly_fee</code> (rounded to 3 decimal places, float); <code>alerts</code> — the list of alerts: <code>'latency'</code> (p95 &gt; 300), <code>'errors'</code> (&gt; 0.02), <code>'proba_shift'</code> (|mean_proba − baseline| &gt; 0.1), <code>'nulls'</code> (fee_null &gt; 0.05), in this order. The thresholds are compared with the unrounded values.</p>",
    "hints": [
     "Compute each metric in a separate variable, check the alerts, and round only at the end.",
     "The pandas method <code>.mean()</code> skips NaN by itself."
    ],
    "check": {
     "tests": "_r = monitor_report(logs)\nassert set(_r) == {'p95', 'error_rate', 'mean_proba', 'fee_null', 'alerts'}, f'Keys: p95, error_rate, mean_proba, fee_null, alerts. Yours is {sorted(_r)}'\nassert _r['p95'] == round(float(logs['latency_ms'].quantile(0.95)), 3) and _r['error_rate'] == 0.1, 'p95 and error_rate are wrong'\nassert _r['mean_proba'] == 0.394 and _r['fee_null'] == 0.2, f'mean_proba ≈ 0.394 (without NaN), fee_null = 0.2. Yours is {_r[\"mean_proba\"]}, {_r[\"fee_null\"]}'\nassert _r['alerts'] == ['latency', 'errors', 'proba_shift', 'nulls'], f'All four alerts fire, yours is {_r[\"alerts\"]}'\nassert monitor_report(logs, baseline_proba=0.4)['alerts'] == ['latency', 'errors', 'nulls'], 'With baseline_proba=0.4 there is no proba_shift'\n_ok = pd.DataFrame({'latency_ms': [100, 110], 'status': [200, 200], 'proba': [0.2, 0.3], 'monthly_fee': [1, 2]})\nassert monitor_report(_ok)['alerts'] == [], 'On normal data there are no alerts'"
    }
   }
  ]
 },
 "ops-7": {
  "pr": [
   {
    "title": "One term of PSI",
    "prompt": "<p>Write the function <code>psi_term(actual, expected)</code>: for one bin it returns the PSI term <code>(actual - expected) * ln(actual / expected)</code> (using <code>np.log</code>). For example, <code>psi_term(0.05, 0.25)</code> ≈ <code>0.3219</code>.</p>",
    "hints": [
     "<code>np.log</code> is the natural logarithm (ln).",
     "Formula: <code>(actual - expected) * np.log(actual / expected)</code>."
    ],
    "check": {
     "tests": "assert abs(psi_term(0.05, 0.25) - 0.3219) < 1e-4, 'psi_term(0.05, 0.25) ≈ 0.3219'\nassert abs(psi_term(0.25, 0.25)) < 1e-12, 'If the shares are equal, 0'\nassert psi_term(0.5, 0.25) > 0 and psi_term(0.1, 0.25) > 0, 'The PSI term is never negative'"
    }
   },
   {
    "title": "PSI level",
    "prompt": "<p>Write the function <code>psi_level(psi)</code>: PSI &lt; 0.1 → <code>'stable'</code>, 0.1 ≤ PSI ≤ 0.25 → <code>'moderate'</code>, PSI &gt; 0.25 → <code>'strong'</code>.</p>",
    "hints": [
     "Check the thresholds in order: first <code>&lt; 0.1</code>, then <code>&lt;= 0.25</code>.",
     "Everything else is <code>'strong'</code>."
    ],
    "check": {
     "tests": "assert psi_level(0.02) == 'stable' and psi_level(0.099) == 'stable', '< 0.1 → stable'\nassert psi_level(0.1) == 'moderate' and psi_level(0.25) == 'moderate', '0.1 and 0.25 → moderate'\nassert psi_level(0.2501) == 'strong' and psi_level(0.56) == 'strong', '> 0.25 → strong'"
    }
   },
   {
    "title": "A floor for the shares",
    "prompt": "<p>In an empty bin <code>ln(0)</code> would be infinite. Write the function <code>apply_floor(props, floor=0.001)</code>: it returns a new list in which each share is not less than <code>floor</code> (<code>max(p, floor)</code>).</p>",
    "hints": [
     "<code>[max(p, floor) for p in props]</code>.",
     "Or with numpy: <code>np.maximum(props, floor)</code>."
    ],
    "check": {
     "tests": "assert apply_floor([0.0, 0.3, 0.7]) == [0.001, 0.3, 0.7], 'apply_floor([0.0, 0.3, 0.7]) must return [0.001, 0.3, 0.7]'\nassert apply_floor([0.0005, 0.2], floor=0.01) == [0.01, 0.2], 'The floor parameter must be taken into account'\n_p = [0.0, 1.0]\napply_floor(_p)\nassert _p == [0.0, 1.0], 'The input list must not change'"
    }
   },
   {
    "title": "PSI from the shares",
    "prompt": "<p>Write the function <code>psi_from_props(expected, actual, floor=0.001)</code>: from two lists of shares it returns the PSI (a floor for both lists, and the sum of all the terms over the bins). Then <code>psi_example</code> — the example from the lesson: reference <code>[0.25, 0.25, 0.25, 0.25]</code>, new <code>[0.05, 0.15, 0.30, 0.50]</code>; <code>psi_empty</code> — reference <code>[0.4, 0.4, 0.2]</code>, new <code>[0.5, 0.5, 0.0]</code>.</p>",
    "hints": [
     "With numpy arrays: <code>e = np.maximum(np.array(expected), floor)</code>.",
     "PSI: <code>np.sum((a - e) * np.log(a / e))</code>."
    ],
    "check": {
     "tests": "assert psi_example is not None and abs(float(psi_example) - 0.5554) < 0.001, f'psi_example must be ≈ 0.555, yours is {psi_example}'\nassert psi_empty is not None and abs(float(psi_empty) - 1.099) < 0.002, f'If a floor is applied to the empty bin, psi_empty ≈ 1.099, yours is {psi_empty}'\nassert abs(psi_from_props([0.3, 0.7], [0.3, 0.7])) < 1e-12, 'With equal shares 0'"
    }
   },
   {
    "title": "Categorical PSI",
    "prompt": "<p>For a categorical feature, the bin is the category itself. Write the function <code>cat_psi(ref, cur, floor=0.001)</code>: compute the shares over <b>all</b> the categories of the two samples (the combined set) (using <code>value_counts(normalize=True)</code> or by hand), apply a floor, and return the PSI. Then <code>psi_tariff</code> — the PSI for <code>ref_tariff</code> and <code>cur_tariff</code>.</p>",
    "hints": [
     "Categories: <code>sorted(set(ref) | set(cur))</code>; shares: <code>value_counts(normalize=True).reindex(cats, fill_value=0)</code>.",
     "The new category (Жастар) has 0 in the reference, so a floor is needed."
    ],
    "check": {
     "tests": "assert psi_tariff is not None and abs(float(psi_tariff) - 0.5371) < 0.002, f'psi_tariff must be ≈ 0.537 (Жастар is the new category), yours is {psi_tariff}'\nassert abs(cat_psi(['a', 'b'], ['b', 'a'])) < 1e-12, 'With the same distribution 0'\nassert cat_psi(['a'] * 9 + ['b'], ['a'] * 5 + ['b'] * 5) > 0.25, 'A strong change > 0.25'"
    }
   },
   {
    "title": "Quantile bins",
    "prompt": "<p>It is convenient to take the bin edges from the quantiles of the reference: then each bin holds roughly the same share of the reference. Write the function <code>quantile_bins(ref, n=4)</code>: take the inner edges <code>np.quantile(ref, [1/n, 2/n, ..., (n-1)/n])</code>, add <code>-np.inf</code> at the start and <code>np.inf</code> at the end, and return the list (<code>n + 1</code> edges). Then <code>props</code> — the shares of the <code>cur</code> values in these bins (<code>bins[i] &lt;= v &lt; bins[i+1]</code>).</p>",
    "hints": [
     "Inner quantiles: <code>np.quantile(ref, [i / n for i in range(1, n)])</code>.",
     "Shares: <code>((a &gt;= bins[i]) &amp; (a &lt; bins[i+1])).mean()</code>."
    ],
    "check": {
     "tests": "import numpy as _np\n_b = quantile_bins(ref)\nassert len(_b) == 5 and _b[0] == -_np.inf and _b[-1] == _np.inf, 'n=4 → 5 edges, with -inf and inf at the ends'\nassert [round(x, 1) for x in _b[1:-1]] == [round(float(q), 1) for q in _np.quantile(ref, [0.25, 0.5, 0.75])], 'The inner edges are the quantiles of the reference'\nassert len(quantile_bins(ref, n=10)) == 11, 'n=10 → 11 edges'\nassert props is not None and [round(p, 2) for p in props] == [0.05, 0.15, 0.25, 0.55], f'The shares of cur: 0.05, 0.15, 0.25, 0.55. Yours is {props}'"
    }
   },
   {
    "title": "Drift report by feature",
    "prompt": "<p>Write the function <code>drift_report(ref_df, cur_df, n_bins=4, floor=0.001)</code>: for each numeric column of <code>ref_df</code>, build the bins from the quantiles of the reference (with the edges <code>-inf</code> and <code>inf</code>), compute the PSI, and return the dictionary <code>{баған: (psi 3 таңбаға дөңгелектенген, деңгей)}</code>. Level: &lt; 0.1 → <code>'stable'</code>, ≤ 0.25 → <code>'moderate'</code>, otherwise → <code>'strong'</code>. Then call <code>report = drift_report(ref_df, cur_df)</code>.</p>",
    "hints": [
     "A loop over the columns: for each one — quantile bins → shares → PSI → level.",
     "Use the functions from the earlier tasks, <code>bin_props</code>, <code>psi</code> and the level function, as helpers."
    ],
    "check": {
     "tests": "import numpy as _np\nassert report is not None and set(report) == {'monthly_fee', 'tenure_months', 'support_calls'}, 'Each column must have an entry'\nassert report['monthly_fee'][1] == 'strong' and report['monthly_fee'][0] > 0.25, f'monthly_fee changed a lot (mean 7500 → 9500): strong. Yours is {report[\"monthly_fee\"]}'\nassert report['tenure_months'][1] == 'stable', f'tenure_months did not change: stable. Yours is {report[\"tenure_months\"]}'\n_e = _np.quantile(ref_df['support_calls'], [0.25, 0.5, 0.75])\n_bins = [-_np.inf] + list(_e) + [_np.inf]\n_pe = _np.maximum([((ref_df['support_calls'] >= _bins[i]) & (ref_df['support_calls'] < _bins[i + 1])).mean() for i in range(4)], 0.001)\n_pa = _np.maximum([((cur_df['support_calls'] >= _bins[i]) & (cur_df['support_calls'] < _bins[i + 1])).mean() for i in range(4)], 0.001)\nassert report['support_calls'][0] == round(float(_np.sum((_pa - _pe) * _np.log(_pa / _pe))), 3), 'The PSI value for support_calls is wrong (quantile bins, floor 0.001)'\n_same = drift_report(ref_df, ref_df)\nassert all(v == (0.0, 'stable') for v in _same.values()), 'Comparing with itself — all (0.0, stable)'"
    }
   },
   {
    "title": "Drift flags by KS",
    "prompt": "<p><code>ks_stat(a, b)</code> is the largest difference between the CDFs of two samples (without scipy: the maximum of the difference between <code>(a &lt;= v).mean()</code> and <code>(b &lt;= v).mean()</code> over the combined values). Write the function <code>ks_flags(ref_df, cur_df, threshold=0.2)</code>: it returns <code>{баған: D (3 таңба)}</code> for the numeric columns whose KS statistic is greater than <code>threshold</code>, in descending order of D. Categorical (non-numeric) columns are skipped.</p>",
    "hints": [
     "Is the column numeric: <code>pd.api.types.is_numeric_dtype(ref_df[col])</code>.",
     "The dictionary in descending order: <code>dict(sorted(found.items(), key=lambda kv: kv[1], reverse=True))</code>."
    ],
    "check": {
     "tests": "assert abs(ks_stat([1, 2, 3, 4], [5, 6, 7, 8]) - 1.0) < 1e-9 and abs(ks_stat([1, 2, 3], [1, 2, 3])) < 1e-9, 'ks_stat: 1 if the samples do not overlap, 0 if they are the same'\n_f = ks_flags(ref_df, cur_df)\nassert list(_f) == ['monthly_fee', 'support_calls'], f'Drift flags: monthly_fee, support_calls (in descending order of D). Yours is {list(_f)}'\nassert _f['monthly_fee'] == 0.6 and _f['support_calls'] == 0.3, f'D values: monthly_fee 0.6, support_calls 0.3. Yours is {_f}'\nassert 'city' not in _f and 'tenure_months' not in _f, 'city is categorical, tenure_months did not change'\nassert ks_flags(ref_df, cur_df, threshold=0.5) == {'monthly_fee': 0.6}, 'The threshold parameter must be taken into account'"
    }
   }
  ]
 },
 "ops-8": {
  "pr": [
   {
    "title": "Is it time to retrain?",
    "prompt": "<p>Scheduled retraining: write the function <code>retrain_due(days_since_train, period=30)</code>: if <code>period</code> or more days have passed since the last training, it returns <code>True</code>.</p>",
    "hints": [
     "Do not forget the boundary: exactly 30 days is also enough.",
     "<code>days_since_train &gt;= period</code>."
    ],
    "check": {
     "tests": "assert retrain_due(30) is True and retrain_due(45) is True, '30 and 45 days → True'\nassert retrain_due(29) is False, '29 days → False'\nassert retrain_due(7, period=7) is True and retrain_due(6, period=7) is False, 'The period parameter must be taken into account'"
    }
   },
   {
    "title": "Type of drift",
    "prompt": "<p>Write the function <code>drift_type(px_changed, pyx_changed, py_changed)</code>: if P(y|X) changed → <code>'concept'</code> (the most dangerous, it is checked first); otherwise, if P(X) changed → <code>'data'</code>; otherwise, if P(y) changed → <code>'label'</code>; if nothing changed → <code>'none'</code>.</p>",
    "hints": [
     "The order of the conditions matters: first <code>pyx_changed</code>.",
     "In each condition, immediately <code>return</code>."
    ],
    "check": {
     "tests": "assert drift_type(True, False, False) == 'data', 'Only P(X) changed → data'\nassert drift_type(True, True, True) == 'concept' and drift_type(False, True, False) == 'concept', 'P(y|X) changed → concept'\nassert drift_type(False, False, True) == 'label', 'Only P(y) → label'\nassert drift_type(False, False, False) == 'none', 'Nothing changed → none'"
    }
   },
   {
    "title": "Label shift",
    "prompt": "<p>The churn share rose from 8% to 20%: this is a label shift. Write the function <code>label_shift(old_labels, new_labels, tol=0.05)</code>: compare the share of 1s (the mean) in the two periods, and if the difference (in absolute value) is greater than <code>tol</code>, return <code>True</code>.</p>",
    "hints": [
     "Share: <code>sum(labels) / len(labels)</code>.",
     "Condition: <code>abs(new_rate - old_rate) &gt; tol</code>."
    ],
    "check": {
     "tests": "assert label_shift([1] * 8 + [0] * 92, [1] * 20 + [0] * 80) is True, '8% → 20%: label shift'\nassert label_shift([1] * 8 + [0] * 92, [1] * 10 + [0] * 90) is False, '8% → 10%: the difference 0.02 ≤ 0.05'\nassert label_shift([1, 0], [1, 1, 0, 0], tol=0.0) is False and label_shift([0, 0, 0, 1], [0, 1], tol=0.2) is True, 'The tol parameter must be taken into account'"
    }
   },
   {
    "title": "AUC over the last weeks",
    "prompt": "<p>When labels arrive, we compute the AUC every week. One bad week may be noise, so we look at the average over the last few weeks. Write the function <code>performance_drop(weekly_auc, baseline, tol=0.03, last=3)</code>: if the average AUC over the last <code>last</code> weeks is strictly below <code>baseline - tol</code>, it returns <code>True</code>. If there are fewer than <code>last</code> weeks, it returns <code>False</code>.</p>",
    "hints": [
     "The last weeks: <code>weekly_auc[-last:]</code>.",
     "The average: <code>sum(recent) / last</code>."
    ],
    "check": {
     "tests": "assert performance_drop([0.84, 0.83, 0.79, 0.80, 0.78], 0.84) is True, 'The average of the last three weeks 0.79 < 0.81'\nassert performance_drop([0.84, 0.83, 0.84, 0.76, 0.83], 0.84) is False, 'One bad week (0.76) does not drop the average below 0.81'\nassert performance_drop([0.70, 0.70], 0.84) is False, 'Not enough weeks → False'\nassert performance_drop([0.80, 0.80], 0.84, last=2) is True, 'The last parameter must be taken into account'"
    }
   },
   {
    "title": "Number of new labels",
    "prompt": "<p>For the “data volume” trigger, we count the labels that arrived after the last training. The DataFrame <code>labels</code> has a column <code>label_date</code> (text like <code>'2024-03-15'</code>). Write the function <code>new_label_count(labels, last_train)</code>: it returns the number of rows where <code>label_date</code> is <b>later</b> (strictly) than <code>last_train</code> (ISO dates can be compared as text). Then <code>volume_trigger</code> — is this number not less than <code>MIN_LABELS</code>?</p>",
    "hints": [
     "<code>(labels['label_date'] &gt; last_train).sum()</code>.",
     "Dates in ISO format are also compared correctly as text."
    ],
    "check": {
     "tests": "assert new_label_count(labels, '2024-03-02') == 6, 'last_train = 2024-03-02: later labels 6 (those dates themselves are not included)'\nassert new_label_count(labels, '2024-03-15') == 0 and new_label_count(labels, '2024-01-01') == 10, 'Boundary cases are wrong'\nassert volume_trigger is True or volume_trigger == True, '6 ≥ MIN_LABELS: volume_trigger True'"
    }
   },
   {
    "title": "Retraining stages",
    "prompt": "<p>After a new model is trained, it passes protective stages. Write the function <code>guard(new_auc, prod_auc, data_ok, shadow_ok, min_gain=0.005)</code>: it returns the last stage the model reached: <code>data_ok</code> is False → <code>'blocked'</code>; <code>new_auc &lt; prod_auc + min_gain</code> → <code>'rejected'</code>; if the shadow mode check fails (<code>shadow_ok</code> is False) → <code>'staging'</code> (it stays in staging); if everything passes → <code>'production'</code>.</p>",
    "hints": [
     "The checks in order: data → metric → shadow mode.",
     "At each failed check, immediately <code>return</code>."
    ],
    "check": {
     "tests": "assert guard(0.90, 0.83, False, True) == 'blocked', 'Bad data → blocked'\nassert guard(0.832, 0.83, True, True) == 'rejected', 'A gain of +0.002 is not enough → rejected'\nassert guard(0.85, 0.83, True, False) == 'staging', 'Shadow mode failed → staging'\nassert guard(0.85, 0.83, True, True) == 'production', 'All passed → production'\nassert guard(0.85, 0.83, True, True, min_gain=0.05) == 'rejected', 'The min_gain parameter must be taken into account'"
    }
   },
   {
    "title": "Sudden or gradual",
    "prompt": "<p>Write the function <code>classify_drift(weekly_auc, jump=0.05, total=0.03)</code>: from the list of weekly AUCs, determine the type of concept drift. If any drop between two neighbouring weeks is greater than <code>jump</code> → <code>('sudden', апта индексі)</code> (the index of the week where such a drop first happened); otherwise, if the total drop between the first and the last weeks is greater than <code>total</code> → <code>('gradual', None)</code>; otherwise <code>('none', None)</code>.</p>",
    "hints": [
     "Neighbouring weeks: <code>for i in range(1, len(weekly_auc)):</code>, the drop <code>weekly_auc[i - 1] - weekly_auc[i]</code>.",
     "Check the total difference only if no sudden drop was found."
    ],
    "check": {
     "tests": "assert classify_drift([0.84, 0.84, 0.83, 0.76, 0.75]) == ('sudden', 3), 'A new tariff: a drop of 0.07 in week 3 → sudden, 3'\nassert classify_drift([0.84, 0.83, 0.82, 0.81, 0.80]) == ('gradual', None), '0.01 each week: total 0.04 → gradual'\nassert classify_drift([0.84, 0.83, 0.84, 0.82]) == ('none', None), 'Total 0.02 → none'\nassert classify_drift([0.9, 0.8, 0.7], jump=0.2) == ('gradual', None), 'The jump parameter must be taken into account'\nassert classify_drift([]) == ('none', None), 'An empty list → none'"
    }
   },
   {
    "title": "Retraining simulation",
    "prompt": "<p>Over a year we monitor every week. Write the function <code>simulate(weeks)</code>: <code>weeks</code> is a list of dictionaries of the form <code>{'max_psi', 'auc', 'labels'}</code> for each week. The state: <code>days</code> (days since the last training, starts at 0) and <code>new_labels</code> (starts at 0). In each week, first do <code>days += 7</code>, <code>new_labels += labels</code>; then the trigger is checked: <code>days &gt;= 28</code>, <code>BASELINE - auc &gt; 0.03</code>, <code>max_psi &gt; 0.25</code> or <code>new_labels &gt;= 5000</code>. If at least one holds, retraining happens: the week index (from 0) is added to the result, and <code>days</code> and <code>new_labels</code> are reset to 0. Return the indexes of the weeks in which retraining happened.</p>",
    "hints": [
     "In each week: update the state → check the trigger → if needed, retrain and reset the state.",
     "Combine several conditions with <code>or</code>; the line can be split over several lines in parentheses."
    ],
    "check": {
     "tests": "assert simulate(weeks) == [2, 5, 9], f'Retraining weeks: 2 (drift), 5 (auc 0.80 and 5000 labels), 9 (28 days). Yours is {simulate(weeks)}'\nassert simulate([{'max_psi': 0.0, 'auc': 0.84, 'labels': 0}] * 8) == [3, 7], 'Only by schedule: every 4th week (3, 7)'\nassert simulate([{'max_psi': 0.0, 'auc': 0.84, 'labels': 2500}] * 3) == [1], '5000 labels are collected in the second week'\nassert simulate([]) == [], 'No weeks → []'"
    }
   }
  ]
 },
 "deng-1": {
  "pr": [
   {
    "title": "Size of one column",
    "prompt": "<p>A table takes 600 GB and has 150 columns of the same size. Write the function <code>col_gb(total_gb, n_cols)</code>: it returns the size of one column. Then <code>scan_gb</code> — the volume scanned in a column store to read 6 columns.</p>",
    "hints": [
     "One column: <code>total_gb / n_cols</code>.",
     "A column store reads only the columns it needs: <code>col_gb(600, 150) * 6</code>."
    ],
    "check": {
     "tests": "assert col_gb(600, 150) == 4 and col_gb(400, 200) == 2, 'col_gb(600, 150) = 4 GB'\nassert scan_gb is not None and abs(float(scan_gb) - 24) < 1e-9, '6 columns × 4 GB = 24 GB'"
    }
   },
   {
    "title": "Query type",
    "prompt": "<p>Write the function <code>query_kind(sql)</code>: if the query (case-insensitive) contains <code>group by</code> or one of the aggregates <code>sum(</code>, <code>count(</code>, <code>avg(</code>, it returns <code>'OLAP'</code>, otherwise <code>'OLTP'</code>.</p>",
    "hints": [
     "First <code>s = sql.lower()</code>.",
     "<code>any(k in s for k in ('group by', 'sum(', 'count(', 'avg('))</code>."
    ],
    "check": {
     "tests": "assert query_kind('SELECT city, SUM(amount) FROM orders GROUP BY city') == 'OLAP', 'GROUP BY is present → OLAP'\nassert query_kind('SELECT * FROM orders WHERE order_id = 101') == 'OLTP', 'Reading one row → OLTP'\nassert query_kind('select count(*) from events') == 'OLAP', 'count( → OLAP'\nassert query_kind(\"UPDATE orders SET status = 'paid' WHERE order_id = 7\") == 'OLTP', 'UPDATE → OLTP'"
    }
   },
   {
    "title": "Compression ratio",
    "prompt": "<p>A column store compresses similar values in one column well. Write the function <code>compression(raw_gb, stored_gb)</code>: it returns the compression ratio (<code>raw_gb / stored_gb</code>), rounded to 1 decimal place. Then <code>saved_gb</code> — the volume saved when 500 GB of data is compressed 8 times.</p>",
    "hints": [
     "Ratio: <code>round(raw_gb / stored_gb, 1)</code>.",
     "If it is compressed 8 times, 500 / 8 = 62.5 GB remains."
    ],
    "check": {
     "tests": "assert compression(120, 15) == 8.0, 'compression(120, 15) = 8.0'\nassert compression(100, 30) == 3.3, 'Round the result to 1 decimal place'\nassert saved_gb is not None and abs(float(saved_gb) - 437.5) < 1e-9, 'saved_gb = 500 - 62.5 = 437.5'"
    }
   },
   {
    "title": "Reading rows or columns",
    "prompt": "<p>Write the function <code>read_gb(total_gb, n_cols, needed, store)</code>: if <code>store == 'row'</code>, it returns the full size of the table; if <code>'column'</code>, only the size of <code>needed</code> columns (the columns are the same size); for any other value it raises <code>ValueError</code>. If <code>needed</code> is less than 0 or greater than <code>n_cols</code>, it also raises <code>ValueError</code>.</p>",
    "hints": [
     "First check <code>needed</code>, then branch on <code>store</code>.",
     "Column: <code>total_gb / n_cols * needed</code>."
    ],
    "check": {
     "tests": "assert read_gb(400, 200, 4, 'row') == 400, 'A row store reads the whole table'\nassert read_gb(400, 200, 4, 'column') == 8, 'A column store, 4 columns: 8 GB'\nfor _a in [(400, 200, 4, 'csv'), (400, 200, 201, 'column'), (400, 200, -1, 'row')]:\n    try:\n        read_gb(*_a)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f'read_gb{_a} ValueError лақтыруы керек')"
    }
   },
   {
    "title": "Rows to columns",
    "prompt": "<p>A row store keeps data by rows, a column store by columns. Write the function <code>to_columns(rows)</code>: it turns the list of dictionaries into a dictionary of the form <code>{баған: мәндер тізімі}</code> (the columns in the order of the keys of the first row). For an empty list it returns <code>{}</code>.</p>",
    "hints": [
     "Columns: the keys of <code>rows[0]</code>.",
     "<code>{col: [r[col] for r in rows] for col in rows[0]}</code>."
    ],
    "check": {
     "tests": "assert to_columns(rows) == {'order_id': [101, 102, 103], 'city': ['Алматы', 'Астана', 'Алматы'], 'amount': [29800, 117500, 13500]}, 'to_columns(rows) is wrong'\nassert list(to_columns(rows)) == ['order_id', 'city', 'amount'], 'The order of the columns is kept'\nassert to_columns([]) == {}, 'Empty list → {}'"
    }
   },
   {
    "title": "Aggregate from columns",
    "prompt": "<p>In a column store, a query reads only the columns it needs. <code>columns</code> is a dictionary of the form <code>{баған: мәндер}</code>. Write the function <code>revenue_by(columns, key, value)</code>: using only the lists <code>columns[key]</code> and <code>columns[value]</code>, it returns a dictionary with the sum of <code>value</code> by <code>key</code>. Then execute <code>by_city = revenue_by(columns, 'city', 'amount')</code>.</p>",
    "hints": [
     "Go through the pairs of the two columns: <code>for k, v in zip(columns[key], columns[value]):</code>.",
     "<code>result[k] = result.get(k, 0) + v</code>."
    ],
    "check": {
     "tests": "assert by_city == {'Алматы': 58200, 'Астана': 201500, 'Шымкент': 18900}, f'by_city is wrong: {by_city}'\nclass _Spy(dict):\n    def __init__(self, d):\n        super().__init__(d)\n        self.read = set()\n    def __getitem__(self, k):\n        self.read.add(k)\n        return dict.__getitem__(self, k)\n_s = _Spy(columns)\nassert revenue_by(_s, 'status', 'amount') == {'paid': 181100, 'cancelled': 13500, 'pending': 84000}, 'It must also work for status'\nassert _s.read == {'status', 'amount'}, f'Read only two columns (as in a column store), the columns you read: {sorted(_s.read)}'"
    }
   },
   {
    "title": "Scan volume",
    "prompt": "<p>In a real table the column sizes differ. Write the function <code>scan_plan(col_sizes, query_cols)</code>: <code>col_sizes</code> is a dictionary of the form <code>{баған: GB}</code>. It returns a dictionary: <code>row_gb</code> — the sum of all columns; <code>col_gb</code> — the sum of only the query's columns; <code>speedup</code> — <code>row_gb / col_gb</code>, rounded to 1 decimal place. If the query asks for a column that does not exist in the table, it raises <code>KeyError</code> with the names of those columns. Then execute <code>plan = scan_plan(SIZES, ['city', 'amount_tg', 'dt'])</code>.</p>",
    "hints": [
     "First collect the missing columns; if there are none, <code>raise KeyError(...)</code>.",
     "<code>col_gb = sum(col_sizes[c] for c in query_cols)</code>."
    ],
    "check": {
     "tests": "assert plan == {'row_gb': 501.5, 'col_gb': 13.5, 'speedup': 37.1}, f'plan is wrong: {plan}'\nassert scan_plan(SIZES, ['raw_json'])['speedup'] == 1.7, 'If you read a large column, the column store does not help much'\ntry:\n    scan_plan(SIZES, ['city', 'price', 'qty'])\nexcept KeyError as _e:\n    assert 'price' in str(_e) and 'qty' in str(_e), 'The message must name all the missing columns'\nelse:\n    raise AssertionError('Жоқ баған үшін KeyError')"
    }
   },
   {
    "title": "From OLTP to an OLAP table",
    "prompt": "<p>From the order rows of OLTP (<code>deng_orders.csv</code>, <code>deng_products.csv</code>), build a daily aggregate table for OLAP. The DataFrame <code>daily</code> has the columns <code>order_date</code>, <code>orders</code> (the number of orders), <code>items</code> (the sum of <code>qty</code>), <code>revenue</code> (the sum of <code>qty * price_tg</code>); sorted by <code>order_date</code>, with the index starting from 0. Then <code>best_day</code> is the day with the highest revenue (text).</p>",
    "hints": [
     "Several aggregates in one <code>groupby</code>: <code>.agg(orders=('order_id', 'count'), items=('qty', 'sum'), revenue=('revenue', 'sum'))</code>.",
     "The highest revenue: <code>daily.loc[daily['revenue'].idxmax(), 'order_date']</code>."
    ],
    "check": {
     "tests": "import pandas as _pd\n_o = _pd.read_csv('deng_orders.csv')\n_c = _pd.read_csv('deng_customers.csv')\n_p = _pd.read_csv('deng_products.csv')\n_m = _o.merge(_c, on='customer_id').merge(_p, on='product_id')\n_m['revenue'] = _m['qty'] * _m['price_tg']\n\nassert daily is not None and list(daily.columns) == ['order_date', 'orders', 'items', 'revenue'], f\"Columns: order_date, orders, items, revenue. Yours is {None if daily is None else list(daily.columns)}\"\nassert list(daily['order_date']) == sorted(_o['order_date'].unique()) and list(daily.index) == list(range(len(daily))), 'Sorted by date, index from 0'\nassert [int(x) for x in daily['orders']] == [2] * 6 and int(daily['items'].sum()) == int(_o['qty'].sum()), 'orders is the number of orders per day, items is the sum of qty'\nassert int(daily['revenue'].sum()) == 600400 and int(daily.loc[daily['order_date'] == '2024-03-04', 'revenue'].iloc[0]) == 153500, 'revenue is wrong (2024-03-04 → 153 500 ₸)'\nassert best_day == '2024-03-04', f'The highest revenue is on 2024-03-04, yours is {best_day}'"
    }
   }
  ]
 },
 "deng-2": {
  "pr": [
   {
    "title": "Building a partition path",
    "prompt": "<p>Write the function <code>partition_path(bucket, table, dt, part=0)</code>: it returns the file path in the lake: <code>s3://&lt;bucket&gt;/&lt;table&gt;/dt=&lt;dt&gt;/part-&lt;part&gt;.parquet</code>, where <code>part</code> is a three-digit number (<code>0</code> → <code>000</code>, <code>12</code> → <code>012</code>).</p>",
    "hints": [
     "A three-digit number inside an f-string: <code>{part:03d}</code>.",
     "Example: <code>f's3://{bucket}/{table}/dt={dt}/part-{part:03d}.parquet'</code>."
    ],
    "check": {
     "tests": "assert partition_path('dala', 'events', '2024-03-01') == 's3://dala/events/dt=2024-03-01/part-000.parquet', 'By default part=0 → part-000'\nassert partition_path('dala', 'orders', '2024-03-02', 12) == 's3://dala/orders/dt=2024-03-02/part-012.parquet', 'part=12 → part-012'"
    }
   },
   {
    "title": "File format",
    "prompt": "<p>The lake stores any format. Write the function <code>file_format(path)</code>: it returns the file extension in lower case (<code>\"logs/app.JSON\"</code> → <code>\"json\"</code>). If there is no dot, it returns <code>None</code>.</p>",
    "hints": [
     "Look only at the file name: <code>path.split('/')[-1]</code> (a folder can contain a dot too).",
     "By the last dot: <code>name.rsplit('.', 1)[1].lower()</code>."
    ],
    "check": {
     "tests": "assert file_format('s3://dala/events/dt=2024-03-01/part-000.parquet') == 'parquet', '.parquet → parquet'\nassert file_format('logs/app.JSON') == 'json', 'In lower case'\nassert file_format('raw/v1.2/data.tar.gz') == 'gz', 'The last extension is taken, a dot in a folder is ignored'\nassert file_format('raw/README') is None, 'No dot → None'"
    }
   },
   {
    "title": "Medallion layer",
    "prompt": "<p>Tables belong to a layer by the prefix of their name: <code>bronze_</code>, <code>silver_</code>, <code>gold_</code>. Write the function <code>layer_of(table)</code>: it returns the name of the layer (<code>'bronze'</code>, <code>'silver'</code>, <code>'gold'</code>); if there is no prefix, return <code>None</code>. Then in <code>bi_tables</code> write the list of tables from <code>TABLES</code> that BI can use (gold).</p>",
    "hints": [
     "<code>table.startswith(layer + '_')</code> over the three layers.",
     "BI works only with the gold layer."
    ],
    "check": {
     "tests": "assert [layer_of(t) for t in TABLES] == ['bronze', 'silver', 'gold', None, 'gold', 'silver'], 'layer_of is wrong'\nassert layer_of('golden_table') is None, 'The prefix \"gold_\" (with an underscore)'\nassert bi_tables == ['gold_city_revenue', 'gold_daily_orders'], f'bi_tables: the gold tables, yours is {bi_tables}'"
    }
   },
   {
    "title": "Files between dates",
    "prompt": "<p>A query should read only the partitions it needs. Write the function <code>files_between(paths, start, end)</code>: it returns the paths whose date after <code>dt=</code> lies between <code>start</code> and <code>end</code> (both bounds included), in the original order. Paths without <code>dt=</code> are skipped. ISO dates can be compared as text.</p>",
    "hints": [
     "First write the helper function <code>partition_date(path)</code> (as in the lesson).",
     "Condition: <code>dt is not None and start &lt;= dt &lt;= end</code>."
    ],
    "check": {
     "tests": "assert files_between(paths, '2024-03-01', '2024-03-02') == paths[1:4], '3 files for 1–2 March'\nassert files_between(paths, '2024-03-03', '2024-03-31') == [paths[5]], 'Only 2024-03-05'\nassert files_between(paths, '2025-01-01', '2025-12-31') == [], 'No matching partitions → []'"
    }
   },
   {
    "title": "Hive-style partitions",
    "prompt": "<p>In the lake, multi-level partitioning is common: <code>s3://dala/sales/city=Алматы/dt=2024-03-01/part-000.parquet</code>. Write the function <code>parse_partitions(path)</code>: it returns a dictionary of all the parts of the path of the form <code>кілт=мән</code> (except the file name). The <code>s3://</code> prefix is ignored.</p>",
    "hints": [
     "The last part is the file name: <code>path.split('/')[:-1]</code>.",
     "In each part, if there is <code>=</code>: <code>key, _, value = part.partition('=')</code>."
    ],
    "check": {
     "tests": "assert parse_partitions('s3://dala/sales/city=Алматы/dt=2024-03-01/part-000.parquet') == {'city': 'Алматы', 'dt': '2024-03-01'}, 'Two partitions: city and dt'\nassert parse_partitions('s3://dala/events/latest/part-000.parquet') == {}, 'No partitions → {}'\nassert parse_partitions('s3://dala/x/dt=2024-01-01/a=b.parquet') == {'dt': '2024-01-01'}, 'The = in the file name is not counted'"
    }
   },
   {
    "title": "Data swamp check",
    "prompt": "<p>So that the lake does not turn into a “swamp”, the naming convention is checked. Write the function <code>bad_paths(paths)</code>: it returns the paths that break the convention, in the original order. The rule: the path starts with <code>s3://dala/</code>, contains a part <code>dt=YYYY-MM-DD</code> (a date of 10 characters, with <code>-</code> at the 4th and 7th positions, and digits for the rest), and the file ends with <code>.parquet</code>.</p>",
    "hints": [
     "Write a separate function to check the date: length 10, <code>s[4] == '-' and s[7] == '-'</code>, check the other characters with <code>isdigit()</code>.",
     "The start and end of the path: <code>startswith('s3://dala/')</code>, <code>endswith('.parquet')</code>."
    ],
    "check": {
     "tests": "assert bad_paths(paths) == [paths[1], paths[2], paths[3], paths[5]], f'Paths that break the rule: indexes 1, 2, 3, 5. Yours is {bad_paths(paths)}'\nassert bad_paths([paths[0], paths[4]]) == [], 'Correct paths → []'\nassert bad_paths(['s3://dala/e/dt=2024-03-0x/p.parquet']) == ['s3://dala/e/dt=2024-03-0x/p.parquet'], 'A date has a non-digit character'"
    }
   },
   {
    "title": "Bronze, silver, gold",
    "prompt": "<p><code>deng_raw_sales.csv</code> is the bronze layer (raw, not changed). Write two functions. <code>to_silver(bronze)</code>: in a <b>copy</b>, it cleans the column <code>city</code> (<code>strip().capitalize()</code>), turns <code>order_date</code> into a date with <code>pd.to_datetime</code>, makes <code>amount_tg</code> of type <code>int</code>; all rows and the statuses are kept. <code>to_gold(silver)</code>: returns a table with the columns: <code>paid_tg</code> (the paid amount per city), <code>orders</code> (the total number of orders), <code>paid_share</code> (the share of paid orders, 2 decimal places), sorted by <code>city</code>, with the index from 0. <code>city</code> is a column.</p>",
    "hints": [
     "Silver: first <code>df = bronze.copy()</code> — bronze is never changed.",
     "Gold: for the paid amount <code>amount_tg.where(status == 'paid', 0)</code>, for the share <code>mean</code> of a True/False column."
    ],
    "check": {
     "tests": "import pandas as _pd\n_b = _pd.read_csv('deng_raw_sales.csv')\n_s = to_silver(_b)\nassert list(_b['city']) == list(_pd.read_csv('deng_raw_sales.csv')['city']), 'Bronze must not change: work with a copy'\nassert len(_s) == 10 and sorted(_s['city'].unique()) == ['Алматы', 'Астана', 'Шымкент'], 'The silver has all 10 rows, the cities are cleaned'\nassert _pd.api.types.is_datetime64_any_dtype(_s['order_date']), 'order_date must become a date (pd.to_datetime)'\nassert set(_s['status']) == {'paid', 'cancelled', 'pending'}, 'All statuses are kept in silver'\n_g = to_gold(_s)\nassert list(_g.columns) == ['city', 'paid_tg', 'orders', 'paid_share'], f'The gold columns: city, paid_tg, orders, paid_share. Yours is {list(_g.columns)}'\nassert list(_g['city']) == ['Алматы', 'Астана', 'Шымкент'] and list(_g.index) == [0, 1, 2], 'Sorted by city, index from 0'\nassert [int(x) for x in _g['paid_tg']] == [264200, 117500, 23400] and [int(x) for x in _g['orders']] == [5, 3, 2], 'paid_tg: 264200, 117500, 23400; orders: 5, 3, 2'\nassert [float(x) for x in _g['paid_share']] == [0.8, 0.33, 1.0], f'paid_share: 0.8, 0.33, 1.0. Yours is {list(_g[\"paid_share\"])}'"
    }
   },
   {
    "title": "Partition catalog",
    "prompt": "<p>A catalog is a table that shows what is in the lake. Write the function <code>catalog(paths)</code>: it returns a dictionary from paths of the form <code>s3://bucket/кесте/dt=.../файл</code> (the table is the part after the bucket). The form of the dictionary: <code>{кесте: {'partitions': сұрыпталған dt тізімі (қайталанбайтын), 'files': файлдар саны, 'missing': first..last аралығындағы жоқ күндер}}</code>. Paths without <code>dt=</code> are skipped. Find the missing dates with <code>pd.date_range</code> (<code>.strftime('%Y-%m-%d')</code>).</p>",
    "hints": [
     "The table name: <code>p[len('s3://'):].split('/')[1]</code>; collect the dates into a set.",
     "The full range: <code>pd.date_range(first, last).strftime('%Y-%m-%d')</code>, then filter out the missing dates."
    ],
    "check": {
     "tests": "_c = catalog(paths)\nassert set(_c) == {'events', 'orders'}, f'Two tables: events, orders. Yours is {sorted(_c)}'\nassert _c['events'] == {'partitions': ['2024-03-01', '2024-03-02', '2024-03-05'], 'files': 4, 'missing': ['2024-03-03', '2024-03-04']}, f'The events catalog is wrong: {_c[\"events\"]}'\nassert _c['orders'] == {'partitions': ['2024-03-02', '2024-03-03'], 'files': 2, 'missing': []}, f'The orders catalog is wrong: {_c[\"orders\"]}'\nassert catalog([]) == {}, 'No paths → {}'"
    }
   }
  ]
 },
 "deng-3": {
  "pr": [
   {
    "title": "Size of the fact table",
    "prompt": "<p><code>deng_orders.csv</code> is the fact table. Read it and write: into <code>n_orders</code> the number of rows, into <code>total_qty</code> the sum of <code>qty</code>, into <code>n_customers</code> the number of different customers in the fact table (<code>nunique</code>).</p>",
    "hints": [
     "<code>len(orders)</code>, <code>orders['qty'].sum()</code>.",
     "The number of distinct values: <code>orders['customer_id'].nunique()</code>."
    ],
    "check": {
     "tests": "assert n_orders == 12, 'The fact table has 12 rows'\nassert total_qty is not None and int(total_qty) == 35, 'The sum of qty is 35'\nassert n_customers is not None and int(n_customers) == 6, '6 different customers'"
    }
   },
   {
    "title": "The cities dimension",
    "prompt": "<p><code>deng_customers.csv</code> is the customers dimension. Write into the variable <code>by_city</code> the number of customers in each city (a Series, in descending order, <code>value_counts</code>), and into <code>b2b_cities</code> the sorted list of cities that have b2b-segment customers.</p>",
    "hints": [
     "<code>customers['city'].value_counts()</code> counts in descending order.",
     "Filter: <code>customers.loc[customers['segment'] == 'b2b', 'city']</code>."
    ],
    "check": {
     "tests": "assert by_city is not None and [int(x) for x in by_city.values] == [3, 2, 1] and by_city.index[0] == 'Алматы', 'Алматы 3, Астана 2, Шымкент 1'\nassert list(b2b_cities) == ['Алматы', 'Астана'], f'The b2b customers are in Алматы and Астана, yours is {b2b_cities}'"
    }
   },
   {
    "title": "Products by category",
    "prompt": "<p><code>deng_products.csv</code> is the products dimension. Write into the variable <code>avg_price</code> the average price of each category (a Series, <code>groupby</code>), and into <code>most_expensive</code> the name of the most expensive product.</p>",
    "hints": [
     "<code>products.groupby('category')['price_tg'].mean()</code>.",
     "The index of the row with the largest value: <code>products['price_tg'].idxmax()</code>."
    ],
    "check": {
     "tests": "assert avg_price is not None and float(avg_price['home']) == 30450 and float(avg_price['electronics']) == 19200, 'The average price of home is 30 450 ₸, electronics 19 200 ₸'\nassert most_expensive == 'Кілем', f'The most expensive product is Кілем (42 000 ₸), yours is {most_expensive}'"
    }
   },
   {
    "title": "Revenue by product",
    "prompt": "<p>Join the fact table with the products dimension (<code>merge</code>) and compute <code>revenue = qty * price_tg</code>. <code>by_product</code> is the revenue by product name (a Series, in descending order), and <code>top_product</code> is the product that brought the most revenue.</p>",
    "hints": [
     "<code>orders.merge(products, on='product_id')</code>.",
     "<code>groupby('product_name')['revenue'].sum().sort_values(ascending=False)</code>."
    ],
    "check": {
     "tests": "import pandas as _pd\n_o = _pd.read_csv('deng_orders.csv')\n_c = _pd.read_csv('deng_customers.csv')\n_p = _pd.read_csv('deng_products.csv')\n_m = _o.merge(_c, on='customer_id').merge(_p, on='product_id')\n_m['revenue'] = _m['qty'] * _m['price_tg']\n\n_ref = _m.groupby('product_name')['revenue'].sum().sort_values(ascending=False)\nassert by_product is not None and list(by_product.index) == list(_ref.index), 'by_product is sorted in descending order'\nassert [int(x) for x in by_product.values] == [int(x) for x in _ref.values], 'The revenue is wrong'\nassert top_product == 'Құлаққап', f'The highest revenue is Құлаққап (193 700 ₸), yours is {top_product}'"
    }
   },
   {
    "title": "Items by segment",
    "prompt": "<p>Join the fact table with the customers table. In <code>qty_by_segment</code> put the number of items sold by segment (the sum of <code>qty</code>, a Series), and in <code>b2b_share</code> the share of the b2b segment in the total (0–1, 2 decimal places).</p>",
    "hints": [
     "<code>orders.merge(customers, on='customer_id')</code>.",
     "Share: <code>qty_by_segment['b2b'] / qty_by_segment.sum()</code>."
    ],
    "check": {
     "tests": "assert qty_by_segment is not None and int(qty_by_segment['b2b']) == 20 and int(qty_by_segment['retail']) == 15, 'b2b 20 items, retail 15 items'\nassert b2b_share is not None and abs(float(b2b_share) - 0.57) < 1e-9, f'The b2b share is 20 / 35 ≈ 0.57, yours is {b2b_share}'"
    }
   },
   {
    "title": "Revenue by day",
    "prompt": "<p>Join three tables and build the table of revenue by day: <code>daily</code> is the sum of <code>revenue</code> by <code>order_date</code> (a Series sorted by date), <code>electronics_daily</code> is the daily revenue of only the category <code>electronics</code> (a Series). Days when electronics was not sold do not appear in the result.</p>",
    "hints": [
     "Three tables: <code>orders.merge(customers, on='customer_id').merge(products, on='product_id')</code>.",
     "First the filter <code>m[m['category'] == 'electronics']</code>, then <code>groupby</code>."
    ],
    "check": {
     "tests": "import pandas as _pd\n_o = _pd.read_csv('deng_orders.csv')\n_c = _pd.read_csv('deng_customers.csv')\n_p = _pd.read_csv('deng_products.csv')\n_m = _o.merge(_c, on='customer_id').merge(_p, on='product_id')\n_m['revenue'] = _m['qty'] * _m['price_tg']\n\nassert daily is not None and [int(x) for x in daily.values] == [147300, 32400, 98900, 153500, 108300, 60000], 'daily must be sorted by date'\n_e = _m[_m['category'] == 'electronics'].groupby('order_date')['revenue'].sum()\nassert electronics_daily is not None and electronics_daily.to_dict() == _e.to_dict(), 'electronics_daily is only the daily revenue of the electronics category'\nassert '2024-03-06' not in electronics_daily.index, 'On 2024-03-06 electronics was not sold'"
    }
   },
   {
    "title": "The biggest customers",
    "prompt": "<p>Join the three tables and build the DataFrame <code>top</code>: the top 3 customers by revenue, with the columns <code>customer_name</code>, <code>city</code>, <code>segment</code>, <code>revenue</code> and <code>orders</code> (the number of orders); sorted by <code>revenue</code> in descending order, with the index from 0. Then <code>top_share</code> is the share of these three customers in the total revenue (0–1, 3 decimal places).</p>",
    "hints": [
     "Add the customer's attributes to the grouping key too: <code>groupby(['customer_name', 'city', 'segment'], as_index=False)</code>.",
     "<code>.sort_values('revenue', ascending=False).head(3).reset_index(drop=True)</code>."
    ],
    "check": {
     "tests": "import pandas as _pd\n_o = _pd.read_csv('deng_orders.csv')\n_c = _pd.read_csv('deng_customers.csv')\n_p = _pd.read_csv('deng_products.csv')\n_m = _o.merge(_c, on='customer_id').merge(_p, on='product_id')\n_m['revenue'] = _m['qty'] * _m['price_tg']\n\n_r = _m.groupby(['customer_name', 'city', 'segment'], as_index=False).agg(revenue=('revenue', 'sum'), orders=('order_id', 'count')).sort_values('revenue', ascending=False).head(3).reset_index(drop=True)\nassert top is not None and list(top.columns) == ['customer_name', 'city', 'segment', 'revenue', 'orders'], f\"The columns: customer_name, city, segment, revenue, orders. Yours is {None if top is None else list(top.columns)}\"\nassert list(top['customer_name']) == list(_r['customer_name']) and list(top.index) == [0, 1, 2], 'The top three customers by revenue, index from 0'\nassert [int(x) for x in top['revenue']] == [266500, 154500, 66700] and [int(x) for x in top['orders']] == [2, 2, 3], 'revenue and orders are wrong'\nassert top_share is not None and abs(float(top_share) - 0.812) < 1e-9, f'The share of the three customers is 487 700 / 600 400 ≈ 0.812, yours is {top_share}'"
    }
   },
   {
    "title": "City × category",
    "prompt": "<p>Join the three tables and build <code>pivot</code>: the rows are <code>city</code>, the columns are <code>category</code>, the values are the sum of <code>revenue</code> (<code>pivot_table</code>, an empty cell = 0). Then <code>top_category</code> is the category with the highest revenue in each city (a dictionary of the form <code>{қала: санат}</code>); <code>astana_home_share</code> is the share of the category <code>home</code> in the revenue of Astana (0–1, 2 decimal places).</p>",
    "hints": [
     "<code>m.pivot_table(index='city', columns='category', values='revenue', aggfunc='sum', fill_value=0)</code>.",
     "The largest column in each row: <code>row.idxmax()</code> (inside <code>pivot.iterrows()</code>) or <code>pivot.idxmax(axis=1)</code>."
    ],
    "check": {
     "tests": "assert pivot is not None and list(pivot.index) == ['Алматы', 'Астана', 'Шымкент'] and list(pivot.columns) == ['books', 'electronics', 'home'], 'index — city, columns — category'\nassert int(pivot.loc['Алматы', 'electronics']) == 296300 and int(pivot.loc['Шымкент', 'books']) == 0, 'Алматы/electronics = 296 300, empty cell 0'\nassert top_category == {'Алматы': 'electronics', 'Астана': 'home', 'Шымкент': 'home'}, f'top_category is wrong: {top_category}'\nassert astana_home_share is not None and abs(float(astana_home_share) - 0.59) < 1e-9, f'The share of home in Astana is 121 800 / 205 800 ≈ 0.59, yours is {astana_home_share}'"
    }
   }
  ]
 },
 "deng-4": {
  "pr": [
   {
    "title": "Cleaning the city",
    "prompt": "<p>Write the function <code>clean_city(s)</code>: remove the spaces at the edges, make the first letter capital and the rest lower case: <code>\" АЛМАТЫ \"</code> → <code>\"Алматы\"</code>. Then in <code>cities</code> put the sorted list of the unique cleaned cities from <code>deng_raw_sales.csv</code>.</p>",
    "hints": [
     "<code>s.strip().capitalize()</code>.",
     "Unique: <code>sorted(set(...))</code>."
    ],
    "check": {
     "tests": "assert clean_city(' АЛМАТЫ ') == 'Алматы' and clean_city('шымкент ') == 'Шымкент', 'clean_city(\" АЛМАТЫ \") must return \"Алматы\"'\nassert cities == ['Алматы', 'Астана', 'Шымкент'], f'After cleaning there are 3 cities, yours is {cities}'"
    }
   },
   {
    "title": "Extract: statuses",
    "prompt": "<p>The Extract step. Read <code>deng_raw_sales.csv</code> and write: into <code>n_rows</code> the number of rows, into <code>status_counts</code> the number of rows of each status (a dictionary of the form <code>{статус: саны}</code>).</p>",
    "hints": [
     "<code>raw = pd.read_csv('deng_raw_sales.csv')</code>.",
     "<code>raw['status'].value_counts()</code>, then turn it into a dictionary."
    ],
    "check": {
     "tests": "assert n_rows == 10, 'The raw data has 10 rows'\nassert status_counts == {'paid': 7, 'cancelled': 2, 'pending': 1}, f'status_counts is wrong: {status_counts}'"
    }
   },
   {
    "title": "Only paid orders",
    "prompt": "<p>Into the variable <code>paid</code> write only the rows <code>status == 'paid'</code> (a DataFrame) from <code>deng_raw_sales.csv</code>, and into <code>paid_total</code> the sum of their <code>amount_tg</code>.</p>",
    "hints": [
     "Filter: <code>raw[raw['status'] == 'paid']</code>.",
     "<code>paid['amount_tg'].sum()</code>."
    ],
    "check": {
     "tests": "assert len(paid) == 7 and set(paid['status']) == {'paid'}, 'paid has 7 paid rows'\nassert paid_total is not None and int(paid_total) == 405100, f'The sum of the paid amounts is 405 100 ₸, yours is {paid_total}'"
    }
   },
   {
    "title": "Transform: by day",
    "prompt": "<p>Write the function <code>transform_daily(df)</code>: take only the paid rows and compute, by <code>order_date</code>, the sum of <code>amount_tg</code> and the number of orders. The result is a DataFrame with the columns <code>order_date</code>, <code>paid_tg</code>, <code>orders</code>, sorted by date, with the index from 0. The input DataFrame must not change. Then execute <code>daily = transform_daily(raw)</code>.</p>",
    "hints": [
     "First the filter, then <code>groupby('order_date', as_index=False).agg(paid_tg=('amount_tg', 'sum'), orders=('order_id', 'count'))</code>.",
     "At the end <code>sort_values</code> and <code>reset_index(drop=True)</code>."
    ],
    "check": {
     "tests": "assert daily is not None and list(daily.columns) == ['order_date', 'paid_tg', 'orders'], f\"The columns: order_date, paid_tg, orders. Yours is {None if daily is None else list(daily.columns)}\"\nassert list(daily['order_date']) == ['2024-03-01', '2024-03-02', '2024-03-03', '2024-03-04', '2024-03-05'], '5 days with paid orders, sorted'\nassert [int(x) for x in daily['paid_tg']] == [147300, 18900, 14900, 153500, 70500] and [int(x) for x in daily['orders']] == [2, 1, 1, 2, 1], 'paid_tg or orders is wrong'\nassert len(raw) == 10, 'The input DataFrame must not change'"
    }
   },
   {
    "title": "ELT: recalculating from the raw layer",
    "prompt": "<p>The advantage of ELT: the raw data is kept, and if the logic changes, we recalculate. The business changed the rule: “revenue = paid <b>and</b> pending”. Write the function <code>revenue_by_city(raw, statuses)</code>: in a copy, clean the city (<code>strip().capitalize()</code>), and it returns a dictionary “city → sum of <code>amount_tg</code>” only for the rows whose <code>status</code> is in the list passed in. Then compute the results <code>old_rule</code> (<code>['paid']</code>) and <code>new_rule</code> (<code>['paid', 'pending']</code>).</p>",
    "hints": [
     "Filter by the status: <code>df[df['status'].isin(statuses)]</code>.",
     "The result into a dictionary: <code>{c: int(v) for c, v in series.items()}</code>."
    ],
    "check": {
     "tests": "assert old_rule == {'Алматы': 264200, 'Астана': 117500, 'Шымкент': 23400}, f'old_rule is wrong: {old_rule}'\nassert new_rule == {'Алматы': 264200, 'Астана': 201500, 'Шымкент': 23400}, f'new_rule: to Astana, pending adds 84 000. Yours is {new_rule}'\nassert revenue_by_city(raw, ['cancelled']) == {'Алматы': 13500, 'Астана': 37800}, 'It must work with any list of statuses'\nassert raw['city'].iloc[0] == ' Алматы ', 'The raw data must not change (work with a copy)'"
    }
   },
   {
    "title": "Upsert",
    "prompt": "<p>Another way to load idempotently is an upsert by key. Write the function <code>upsert(table, rows, key)</code>: <code>table</code> and <code>rows</code> are lists of dictionaries. For each row from <code>rows</code>: if <code>table</code> has a row with the same key, it is replaced (its place is kept); if not, it is added to the end. Return the new list; the input <code>table</code> must not change.</p>",
    "hints": [
     "Key → index of the dictionary: <code>{r[key]: i for i, r in enumerate(result)}</code>.",
     "When adding a new row, update the index too: inside rows one key may occur twice."
    ],
    "check": {
     "tests": "_once = upsert(table, updates, 'order_id')\nassert [(r['order_id'], r['status']) for r in _once] == [(201, 'paid'), (202, 'paid'), (203, 'cancelled')], f'The result of upsert is wrong: {_once}'\nassert upsert(_once, updates, 'order_id') == _once, 'Idempotent: running it again does not change the result'\nassert table[0]['status'] == 'pending' and len(table) == 2, 'The input table must not change'\nassert len(upsert([], [{'id': 1, 'v': 1}, {'id': 1, 'v': 2}], 'id')) == 1, 'One key from rows remains one row'"
    }
   },
   {
    "title": "ETL by status",
    "prompt": "<p>Write the function <code>etl(path, target)</code>. Extract: reads the CSV. Transform: cleans the city; builds a table by city with the columns <code>paid_tg</code> (the sum of paid), <code>cancelled_tg</code> (the sum of cancelled), <code>pending_tg</code> (the sum of pending) (<code>pivot_table</code>, empty values are 0, integers); sorts by the column <code>city</code>, with the index from 0; the order of the columns: <code>city</code>, <code>paid_tg</code>, <code>cancelled_tg</code>, <code>pending_tg</code>. Load: writes <code>target</code> to a CSV file (<code>index=False</code>). The function returns the DataFrame of the result. Then execute <code>report = etl('deng_raw_sales.csv', 'deng_status_report.csv')</code>.</p>",
    "hints": [
     "The columns by status: <code>pivot_table(index='city', columns='status', values='amount_tg', aggfunc='sum', fill_value=0)</code>.",
     "The order and the names of the columns: <code>.reindex(columns=['paid', 'cancelled', 'pending'], fill_value=0)</code>, then <code>p.columns = [...]</code> and <code>reset_index()</code>."
    ],
    "check": {
     "tests": "import pandas as _pd\nassert report is not None and list(report.columns) == ['city', 'paid_tg', 'cancelled_tg', 'pending_tg'], f\"Columns: city, paid_tg, cancelled_tg, pending_tg. Yours is {None if report is None else list(report.columns)}\"\nassert list(report['city']) == ['Алматы', 'Астана', 'Шымкент'] and list(report.index) == [0, 1, 2], 'The cities are cleaned and sorted'\nassert [int(x) for x in report['paid_tg']] == [264200, 117500, 23400], 'paid_tg: 264200, 117500, 23400'\nassert [int(x) for x in report['cancelled_tg']] == [13500, 37800, 0] and [int(x) for x in report['pending_tg']] == [0, 84000, 0], 'cancelled_tg and pending_tg are wrong (no value → 0)'\n_f = _pd.read_csv('deng_status_report.csv')\nassert list(_f.columns) == list(report.columns) and len(_f) == 3, 'Exactly this table must be written to the file (index=False)'\n_r2 = etl('deng_raw_sales.csv', 'deng_status_report_2.csv')\nassert _r2.equals(report), 'Running etl again gives the same result'"
    }
   },
   {
    "title": "Idempotent daily load",
    "prompt": "<p>A night job loads one day's data into the warehouse table, and if there is an error, it is run again. Write the function <code>load_day(target, raw, dt)</code>: it takes from <code>raw</code> the rows where <code>order_date == dt</code> and <code>status == 'paid'</code>, and computes the sum of <code>paid_tg</code> by the cleaned city (columns: <code>dt</code>, <code>city</code>, <code>paid_tg</code>); from <code>target</code> it removes the old rows of this <code>dt</code> and adds the new ones; it returns a new DataFrame sorted by <code>dt</code>, <code>city</code>, with the index from 0. Then <code>wh</code> is the result of loading into an empty table, in order, the days 2024-03-01, 2024-03-02, again 2024-03-01, and 2024-03-04.</p>",
    "hints": [
     "Removing the old partition: <code>target[target['dt'] != dt]</code>, then <code>pd.concat([kept, new], ignore_index=True)</code>.",
     "Add the date column to the new rows: <code>new.insert(0, 'dt', dt)</code>."
    ],
    "check": {
     "tests": "assert wh is not None and list(wh.columns) == ['dt', 'city', 'paid_tg'], f\"Columns: dt, city, paid_tg. Yours is {None if wh is None else list(wh.columns)}\"\nassert [(r.dt, r.city, int(r.paid_tg)) for r in wh.itertuples()] == [('2024-03-01', 'Алматы', 29800), ('2024-03-01', 'Астана', 117500), ('2024-03-02', 'Шымкент', 18900), ('2024-03-04', 'Алматы', 149000), ('2024-03-04', 'Шымкент', 4500)], f'wh is wrong:\\n{wh}'\nassert list(wh.index) == list(range(5)), 'Index from 0'\n_again = load_day(wh, raw, '2024-03-04')\nassert _again.equals(wh), 'Reloading the same day must not change the table (idempotent)'"
    }
   }
  ]
 },
 "deng-5": {
  "pr": [
   {
    "title": "Reading cron time",
    "prompt": "<p>The Airflow schedule is written in cron format: <code>'0 3 * * *'</code> — every day at 03:00. Write the function <code>parse_cron(expr)</code>: it returns the first two fields (minutes, hours) as integers in a tuple <code>(minute, hour)</code>. Then <code>run_at(expr)</code> returns the time in the form <code>'HH:MM'</code>.</p>",
    "hints": [
     "<code>expr.split()</code> splits on spaces: <code>['0', '3', '*', '*', '*']</code>.",
     "A two-digit format: <code>f'{hour:02d}:{minute:02d}'</code>."
    ],
    "check": {
     "tests": "assert tuple(parse_cron('0 3 * * *')) == (0, 3), \"'0 3 * * *' → (0, 3)\"\nassert tuple(parse_cron('30 23 * * *')) == (30, 23), \"'30 23 * * *' → (30, 23)\"\nassert run_at('0 3 * * *') == '03:00', \"'0 3 * * *' → '03:00'\"\nassert run_at('5 14 * * 1') == '14:05', \"'5 14 * * 1' → '14:05'\""
    }
   },
   {
    "title": "Batch or streaming",
    "prompt": "<p>The rule from the lesson: choose batch if the delay does not really matter. Write the function <code>choose_mode(max_delay_sec)</code>: if the allowed delay is less than 60 seconds, it returns <code>'streaming'</code>, otherwise <code>'batch'</code>. Then <code>modes</code> is the list of modes for: the fraud check of Kaspi payments (2 s), the nightly sales report (86400 s), the hourly dashboard (3600 s).</p>",
    "hints": [
     "<code>if max_delay_sec &lt; 60: return 'streaming'</code>.",
     "<code>modes = [choose_mode(x) for x in [2, 86400, 3600]]</code>."
    ],
    "check": {
     "tests": "assert choose_mode(2) == 'streaming', 'The fraud check in 2 seconds → streaming'\nassert choose_mode(60) == 'batch', '60 seconds — the boundary, batch is enough'\nassert choose_mode(86400) == 'batch', 'The nightly report → batch'\nassert modes == ['streaming', 'batch', 'batch'], f\"Expected ['streaming', 'batch', 'batch'], yours is {modes}\""
    }
   },
   {
    "title": "Upstream tasks",
    "prompt": "<p><code>DEPS</code> holds the dependencies of each task. Write the function <code>n_upstream(deps, task)</code>: it returns the number of direct dependencies of a task. Then <code>roots</code> is the sorted list of tasks with no dependencies.</p>",
    "hints": [
     "Direct dependencies: <code>len(deps[task])</code>.",
     "<code>sorted(t for t in DEPS if not DEPS[t])</code>."
    ],
    "check": {
     "tests": "assert n_upstream(DEPS, 'load_fact') == 2, 'load_fact depends on two tasks'\nassert n_upstream(DEPS, 'extract') == 0, 'extract does not depend on anyone'\nassert n_upstream({'x': ['a', 'b', 'c']}, 'x') == 3, 'It must work with any deps'\nassert roots == ['extract'], f\"The task without dependencies is only extract, yours is {roots}\""
    }
   },
   {
    "title": "Backfill dates",
    "prompt": "<p>Backfill is recalculating past days. Write the function <code>backfill_dates(start, end)</code>: it takes the strings <code>'YYYY-MM-DD'</code> and returns the list of all the days, including both ends, in the same format. Use the module <code>datetime</code> (2024 is a leap year).</p>",
    "hints": [
     "<code>date.fromisoformat('2024-02-27')</code> turns a string into a date, <code>.isoformat()</code> turns it back.",
     "Loop: <code>while d &lt;= last: ...; d = d + timedelta(days=1)</code>."
    ],
    "check": {
     "tests": "_b = backfill_dates('2024-02-27', '2024-03-02')\nassert _b == ['2024-02-27', '2024-02-28', '2024-02-29', '2024-03-01', '2024-03-02'], f'Do not forget February 29 (a leap year). Yours is {_b}'\nassert backfill_dates('2024-03-05', '2024-03-05') == ['2024-03-05'], 'One day — one element'\nassert len(backfill_dates('2024-03-01', '2024-03-31')) == 31, 'March has 31 days'"
    }
   },
   {
    "title": "Retry logic",
    "prompt": "<p>The parameter <code>retries=2</code> in Airflow repeats the task two more times if it fails. Write the function <code>run_with_retry(fn, retries)</code>: it calls <code>fn()</code> at most <code>retries + 1</code> times. If it succeeds, it returns <code>(нәтиже, әрекет_саны)</code>; if all the attempts fail, it raises the last error again.</p>",
    "hints": [
     "In the loop <code>for attempt in range(1, retries + 2):</code> run <code>try: return (fn(), attempt)</code>.",
     "<code>except Exception as e: last = e</code>, after the loop ends, <code>raise last</code>."
    ],
    "check": {
     "tests": "_calls = []\ndef _flaky():\n    _calls.append(1)\n    if len(_calls) < 3:\n        raise ConnectionError('Желі үзілді')\n    return 'ok'\n_r = run_with_retry(_flaky, 2)\nassert tuple(_r) == ('ok', 3), f\"The third attempt succeeds: ('ok', 3), yours is {_r}\"\nassert tuple(run_with_retry(lambda: 42, 0)) == (42, 1), 'Success at once → 1 attempt'\n_n = []\ndef _always():\n    _n.append(1)\n    raise TimeoutError('Қойма жауап бермеді')\n_ok = False\ntry:\n    run_with_retry(_always, 2)\nexcept TimeoutError:\n    _ok = True\nassert _ok, 'If all the attempts fail, raise the last error'\nassert len(_n) == 3, f'retries=2 → 3 attempts in total, yours is {len(_n)}'"
    }
   },
   {
    "title": "Downstream tasks",
    "prompt": "<p>If one task fails, all the tasks after it do not run. Write the function <code>downstream(deps, task)</code>: it returns the sorted list of all the tasks that depend on the given task, directly or indirectly.</p>",
    "hints": [
     "Direct dependents: <code>[t for t, ds in deps.items() if task in ds]</code>.",
     "Put the found tasks into a queue (<code>frontier</code>) and look for those that depend on them; <code>set</code> prevents repeats."
    ],
    "check": {
     "tests": "_d = downstream(DEPS, 'load_dims')\nassert _d == ['load_fact', 'notify', 'quality', 'report'], f'After load_dims there are 4 tasks, yours is {_d}'\nassert downstream(DEPS, 'report') == ['notify'], 'After report only notify'\nassert downstream(DEPS, 'notify') == [], 'notify is the last task'\nassert len(downstream(DEPS, 'extract')) == 5, 'Five other tasks depend on extract'"
    }
   },
   {
    "title": "Alerts in a window",
    "prompt": "<p>In streaming, events are split into <b>tumbling windows</b> (non-overlapping windows): <code>t // size * size</code> is the start of the window. The function <code>window_counts(events, size)</code> returns the dictionary <code>{(card, window_start): саны}</code>. <code>alerts(events, size, limit)</code> is the sorted list of the pairs <code>(card, window_start)</code> whose count is greater than <code>limit</code>.</p>",
    "hints": [
     "Key: <code>(e['card'], e['t'] // size * size)</code>, count: <code>counts.get(key, 0) + 1</code>.",
     "<code>sorted(k for k, v in window_counts(...).items() if v &gt; limit)</code>."
    ],
    "check": {
     "tests": "_w = window_counts(events, 60)\nassert _w == {('A', 0): 4, ('A', 60): 1, ('B', 0): 1, ('B', 60): 4}, f'Windows of 60 s: A[0]=4, A[60]=1, B[0]=1, B[60]=4. Yours is {_w}'\nassert alerts(events, 60, 3) == [('A', 0), ('B', 60)], 'limit=3 → A in window 0, B in window 60'\nassert alerts(events, 30, 1) == [('A', 0), ('A', 30), ('B', 60), ('B', 90)], 'With a 30 s window and limit=1 — four alerts'\nassert alerts(events, 60, 4) == [], 'No window has more than 4'"
    }
   },
   {
    "title": "Running a DAG",
    "prompt": "<p>Like Airflow, write the function <code>run_dag(deps, failing)</code>. A task runs when all its dependencies are ready; among the ready ones, the task is chosen in alphabetical order. The status of each task: if it is in the set <code>failing</code>, it is <code>'failed'</code>; if at least one of its dependencies is not <code>'success'</code>, it is <code>'upstream_failed'</code>; otherwise <code>'success'</code>. The function returns <code>(order, status)</code>: the order of execution and the dictionary of statuses.</p>",
    "hints": [
     "Ready task: <code>t not in status and all(d in status for d in deps[t])</code>; from the ready ones take the first in alphabetical order: <code>sorted(...)[0]</code>.",
     "Status: first <code>t in failing</code>, then <code>any(status[d] != 'success' for d in deps[t])</code>."
    ],
    "check": {
     "tests": "_o, _s = run_dag(DEPS, set())\nassert _o == ['extract', 'load_dims', 'load_fact', 'quality', 'report', 'notify'], f'The order of execution is wrong: {_o}'\nassert all(v == 'success' for v in _s.values()), 'If there are no errors, all are success'\n_o, _s = run_dag(DEPS, {'load_dims'})\nassert _s['extract'] == 'success' and _s['load_dims'] == 'failed', 'extract — success, load_dims — failed'\nassert _s['load_fact'] == 'upstream_failed' and _s['quality'] == 'upstream_failed', 'The tasks that depend on load_dims get upstream_failed'\nassert _s['notify'] == 'upstream_failed', 'The indirectly dependent notify is also upstream_failed'\n_o, _s = run_dag(DEPS, {'report'})\nassert [t for t in _o if _s[t] != 'success'] == ['report', 'notify'], 'If report fails, only report and notify are affected'"
    }
   }
  ]
 },
 "deng-6": {
  "pr": [
   {
    "title": "Finding ref names",
    "prompt": "<p>dbt finds the dependencies of models through <code>{{ ref('...') }}</code>. Write the function <code>refs(sql)</code>: it returns the list of all the <code>ref('атау')</code> names from the SQL in the order they appear. Use the string methods (<code>split</code>).</p>",
    "hints": [
     "<code>sql.split(\"ref('\")[1:]</code> — each part starts with a name.",
     "The name from each part: <code>part.split(\"'\")[0]</code>."
    ],
    "check": {
     "tests": "assert refs(\"select * from {{ ref('stg_orders') }} o join {{ ref('stg_customers') }} c using (customer_id)\") == ['stg_orders', 'stg_customers'], 'Two refs in the order they appear'\nassert refs('select * from raw.orders') == [], 'If there are no refs, an empty list'\nassert refs(\"select * from {{ ref('paid_orders') }}\") == ['paid_orders'], 'One ref'"
    }
   },
   {
    "title": "Counting empty values",
    "prompt": "<p>When the dbt test <code>not_null</code> fails, it is useful to know how many rows it broke. Write the function <code>count_nulls(df, col)</code>: it returns the number of empty values in the column as <code>int</code>. Then <code>bad</code> is the number of empty values in the column <code>city</code> of the table <code>model</code>.</p>",
    "hints": [
     "<code>df[col].isna()</code> gives a series of True/False.",
     "<code>int(df[col].isna().sum())</code>."
    ],
    "check": {
     "tests": "assert bad == 2, f'The city column has 2 empty values, yours is {bad}'\nassert count_nulls(model, 'order_id') == 0, 'There are no empty values in order_id'\nassert count_nulls(pd.DataFrame({'x': [None, None, 1]}), 'x') == 2, 'It must work with any table'"
    }
   },
   {
    "title": "Value range test",
    "prompt": "<p>An equivalent of the test <code>accepted_range</code>: the function <code>test_accepted_range(df, col, min_value)</code> checks that all the non-empty values in the column are not less than <code>min_value</code>; if so, it returns <code>True</code>, otherwise <code>False</code>.</p>",
    "hints": [
     "Drop the empty values: <code>df[col].dropna()</code>.",
     "<code>bool((... &gt;= min_value).all())</code>."
    ],
    "check": {
     "tests": "_ok = pd.DataFrame({'amount_tg': [100, 0, 2500, None]})\n_bad = pd.DataFrame({'amount_tg': [100, -50, 2500]})\nassert test_accepted_range(_ok, 'amount_tg', 0), 'All values ≥ 0 (the empty one is ignored) → True'\nassert not test_accepted_range(_bad, 'amount_tg', 0), '-50 is present → False'\nassert not test_accepted_range(_ok, 'amount_tg', 50), 'If min_value=50, 0 does not pass'"
    }
   },
   {
    "title": "Model dependencies",
    "prompt": "<p><code>models</code> — a dictionary: the model name → its SQL. Write the function <code>refs(sql)</code> (as in the previous task), then the function <code>lineage(models)</code>: it returns the dictionary <code>{модель: ref тізімі}</code>. Write the result into <code>graph</code>.</p>",
    "hints": [
     "<code>refs</code>: <code>sql.split(\"ref('\")[1:]</code>, from each part <code>part.split(\"'\")[0]</code>.",
     "<code>{name: refs(sql) for name, sql in models.items()}</code>."
    ],
    "check": {
     "tests": "assert graph['stg_orders'] == [] and graph['stg_customers'] == [], 'The staging models read from the raw table, there is no ref'\nassert graph['paid_orders'] == ['stg_orders'], f\"paid_orders → ['stg_orders'], yours is {graph.get('paid_orders')}\"\nassert graph['city_revenue'] == ['paid_orders', 'stg_customers'], 'city_revenue depends on two models'\nassert len(graph) == 5, 'All five models must be there'"
    }
   },
   {
    "title": "Silver: paid_orders",
    "prompt": "<p>From <code>deng_raw_sales.csv</code>, build the silver model with pandas: clean the city with <code>.str.strip().str.capitalize()</code> and keep only the rows <code>status == 'paid'</code>. The columns of <code>paid</code>: <code>order_id</code>, <code>order_date</code>, <code>city</code>, <code>amount_tg</code>; the index from 0.</p>",
    "hints": [
     "Filter: <code>raw[raw['status'] == 'paid']</code>.",
     "After selecting the columns, <code>.reset_index(drop=True)</code>."
    ],
    "check": {
     "tests": "assert list(paid.columns) == ['order_id', 'order_date', 'city', 'amount_tg'], f'The columns: order_id, order_date, city, amount_tg. Yours is {list(paid.columns)}'\nassert len(paid) == 7, f'There must be 7 paid orders, yours is {len(paid)}'\nassert sorted(paid['city'].unique()) == ['Алматы', 'Астана', 'Шымкент'], 'The city names are not cleaned'\nassert int(paid['amount_tg'].sum()) == 405100, 'The sum of the paid amounts is 405 100 ₸'\nassert list(paid.index) == list(range(7)), 'The index must start from 0'"
    }
   },
   {
    "title": "Gold: city_revenue",
    "prompt": "<p>Build the gold model from the silver layer. Clean the data from <code>deng_raw_sales.csv</code> (the city name), take the paid orders, then build the DataFrame <code>gold</code> by city: the columns <code>city</code>, <code>revenue_tg</code> (the sum), <code>orders</code> (the count); sorted by <code>revenue_tg</code> in descending order, with the index from 0.</p>",
    "hints": [
     "First the cleaning and the filter <code>status == 'paid'</code>.",
     "<code>.groupby('city', as_index=False).agg(revenue_tg=('amount_tg', 'sum'), orders=('order_id', 'count'))</code>."
    ],
    "check": {
     "tests": "assert gold is not None and list(gold.columns) == ['city', 'revenue_tg', 'orders'], 'The columns: city, revenue_tg, orders'\nassert list(gold['city']) == ['Алматы', 'Астана', 'Шымкент'], f\"The order: Алматы, Астана, Шымкент. Yours is {list(gold['city'])}\"\nassert [int(x) for x in gold['revenue_tg']] == [264200, 117500, 23400], 'Revenue: 264 200, 117 500, 23 400 ₸'\nassert [int(x) for x in gold['orders']] == [4, 1, 2], 'Number of orders: 4, 1, 2'"
    }
   },
   {
    "title": "Tests from a config",
    "prompt": "<p>As in the dbt file <code>schema.yml</code>, a list <code>config</code> is given: each line has the form <code>'баған:тест'</code>. Write the function <code>run_tests(df, config)</code>: the tests <code>not_null</code>, <code>unique</code> (non-empty values are not repeated), <code>non_negative</code> (non-empty values are ≥ 0). It returns the list of the config lines that failed (in the original order). If a test is unknown, it raises <code>ValueError</code>.</p>",
    "hints": [
     "Split each line: <code>col, test = item.split(':')</code>.",
     "The three tests go through <code>if/elif</code>, in other cases <code>raise ValueError(...)</code>."
    ],
    "check": {
     "tests": "assert failed == ['order_id:unique', 'city:not_null', 'amount_tg:non_negative'], f'Three tests fail (in the original order). Yours is {failed}'\n_good = pd.DataFrame({'order_id': [1, 2], 'amount_tg': [10, 0]})\nassert run_tests(_good, ['order_id:unique', 'amount_tg:non_negative']) == [], 'In a clean table there are no failed tests'\n_ok = False\ntry:\n    run_tests(_good, ['order_id:positive'])\nexcept ValueError:\n    _ok = True\nassert _ok, 'If a test is unknown, raise ValueError'"
    }
   },
   {
    "title": "Build order of models",
    "prompt": "<p>dbt builds a DAG from <code>ref()</code> and builds the models in the right order. Write the function <code>build_order(models)</code>: find the refs of each model in the SQL, then from the models whose dependencies are ready, choose one in alphabetical order and return the build order. If there is a cycle, raise <code>ValueError</code>.</p>",
    "hints": [
     "First <code>deps = {name: refs(sql) for name, sql in models.items()}</code>.",
     "A ready model: <code>all(d in done for d in deps[m])</code>; if there are no ready ones — a cycle."
    ],
    "check": {
     "tests": "_b = build_order(models)\nassert _b == ['stg_customers', 'stg_orders', 'paid_orders', 'city_revenue', 'customer_ltv'], f'The build order is wrong: {_b}'\nassert build_order({'b': \"select * from {{ ref('a') }}\", 'a': 'select 1'}) == ['a', 'b'], 'a must be built first'\n_ok = False\ntry:\n    build_order({'x': \"select * from {{ ref('y') }}\", 'y': \"select * from {{ ref('x') }}\"})\nexcept ValueError:\n    _ok = True\nassert _ok, 'On a cycle raise ValueError'"
    }
   }
  ]
 },
 "deng-7": {
  "pr": [
   {
    "title": "Number of chunks",
    "prompt": "<p>Write the function <code>n_chunks(n_rows, chunksize)</code>: it returns how many chunks you get when reading with <code>chunksize</code>. The last incomplete chunk is counted too.</p>",
    "hints": [
     "Rounding up: <code>(n_rows + chunksize - 1) // chunksize</code>.",
     "Or <code>math.ceil(n_rows / chunksize)</code>."
    ],
    "check": {
     "tests": "assert n_chunks(10, 3) == 4, '10 rows, chunksize=3 → 4 chunks'\nassert n_chunks(9, 3) == 3, '9 rows, chunksize=3 → 3 chunks'\nassert n_chunks(1, 100) == 1, '1 row → 1 chunk'\nassert n_chunks(1_000_000, 100_000) == 10, '1 million rows, 100 thousand → 10 chunks'"
    }
   },
   {
    "title": "Does it fit in memory",
    "prompt": "<p>Estimate how much space the table will take in memory. The function <code>needed_gb(rows, cols, bytes_per_value=8)</code> returns the needed size in GB (1 GB = 1024³ bytes). The function <code>fits(rows, cols, ram_gb)</code> returns <code>True</code> if the size does not exceed <code>ram_gb</code>.</p>",
    "hints": [
     "Bytes: <code>rows * cols * bytes_per_value</code>, in GB: <code>/ 1024 ** 3</code>.",
     "In <code>fits</code> use <code>needed_gb(rows, cols) &lt;= ram_gb</code>."
    ],
    "check": {
     "tests": "assert abs(needed_gb(1024 ** 3, 1) - 8) < 1e-9, '1024³ rows × 1 column × 8 bytes = 8 GB'\nassert abs(needed_gb(1024 ** 3, 2, 4) - 8) < 1e-9, 'float32 (4 bytes) takes half the space'\nassert not fits(200_000_000, 20, 16), '200 million × 20 columns ≈ 29.8 GB — it does not fit in 16 GB'\nassert fits(10_000_000, 20, 16), '10 million × 20 columns ≈ 1.5 GB — it fits'"
    }
   },
   {
    "title": "Lazy or action",
    "prompt": "<p>In Spark, transformations are lazy, and an action runs the computation. Write the function <code>op_kind(op)</code>: it returns <code>'action'</code> for <code>'count'</code>, <code>'collect'</code>, <code>'write'</code>, <code>'show'</code>, and <code>'transformation'</code> for the others. Then <code>first_action</code> is the index of the first action in the list <code>plan</code>.</p>",
    "hints": [
     "<code>if op in ('count', 'collect', 'write', 'show'): return 'action'</code>.",
     "<code>[op_kind(o) for o in plan].index('action')</code>."
    ],
    "check": {
     "tests": "assert op_kind('filter') == 'transformation' and op_kind('groupBy') == 'transformation', 'filter, groupBy — transformation'\nassert op_kind('count') == 'action' and op_kind('write') == 'action', 'count, write — action'\nassert op_kind('collect') == 'action', 'collect — action'\nassert first_action == 4, f\"The first action is 'write', index 4. Yours is {first_action}\""
    }
   },
   {
    "title": "Counting statuses by chunks",
    "prompt": "<p>Read <code>deng_raw_sales.csv</code> with <code>chunksize=4</code> and collect the count of each status into the dictionary <code>counts</code> (map → combine). Then <code>n</code> is the number of processed chunks.</p>",
    "hints": [
     "<code>for chunk in pd.read_csv('deng_raw_sales.csv', chunksize=4):</code>.",
     "In each chunk <code>chunk['status'].value_counts()</code>, then <code>counts.get(status, 0) + v</code>."
    ],
    "check": {
     "tests": "assert n == 3, f'10 rows, chunksize=4 → 3 chunks. Yours is {n}'\nassert {k: int(v) for k, v in counts.items()} == {'paid': 7, 'cancelled': 2, 'pending': 1}, f'paid=7, cancelled=2, pending=1. Yours is {counts}'"
    }
   },
   {
    "title": "Maximum by city",
    "prompt": "<p><code>max</code> is also computed by chunks. Read <code>deng_raw_sales.csv</code> with <code>chunksize=3</code>, clean the city with <code>.str.strip().str.capitalize()</code>, and collect into the dictionary <code>maxes</code> the largest <code>amount_tg</code> of each city (over all statuses).</p>",
    "hints": [
     "In each chunk: <code>chunk.groupby('city')['amount_tg'].max()</code>.",
     "Merging: <code>maxes[city] = max(maxes.get(city, v), v)</code>."
    ],
    "check": {
     "tests": "assert sorted(maxes) == ['Алматы', 'Астана', 'Шымкент'], f'There must be three cleaned cities, yours is {sorted(maxes)}'\nassert int(maxes['Алматы']) == 149000, f\"The maximum for Алматы is 149 000 ₸, yours is {maxes['Алматы']}\"\nassert int(maxes['Астана']) == 117500 and int(maxes['Шымкент']) == 18900, 'Астана 117 500 ₸, Шымкент 18 900 ₸'"
    }
   },
   {
    "title": "Splitting by key",
    "prompt": "<p>Spark splits data into partitions by key: one key always goes to one partition. Write the function <code>partition_of(key, n)</code> — <code>key % n</code>. Split the rows of <code>deng_orders.csv</code> by <code>customer_id</code> into 3 partitions and write into the list <code>sizes</code> the number of rows in each partition (in the order 0, 1, 2).</p>",
    "hints": [
     "<code>orders['customer_id'].apply(lambda k: partition_of(k, 3))</code>.",
     "<code>[int((parts == p).sum()) for p in range(3)]</code>."
    ],
    "check": {
     "tests": "assert partition_of(7, 3) == 1 and partition_of(6, 3) == 0, 'partition_of(7, 3) = 1'\nassert [int(x) for x in sizes] == [3, 5, 4], f'The sizes of the partitions [3, 5, 4], yours is {sizes}'\nassert sum(sizes) == 12, 'All 12 rows must be distributed'"
    }
   },
   {
    "title": "Average check by chunks",
    "prompt": "<p>It is not the average of the averages: you need to collect the sum and the count. Read <code>deng_raw_sales.csv</code> with <code>chunksize=3</code>, clean the city, and take only the rows <code>'paid'</code>. For each city collect the sum and the count, and write the average check into the dictionary <code>avg</code>.</p>",
    "hints": [
     "In each chunk: cleaning and <code>chunk[chunk['status'] == 'paid']</code>.",
     "Two dictionaries: <code>sums</code> and <code>cnts</code>; at the end <code>sums[city] / cnts[city]</code>."
    ],
    "check": {
     "tests": "assert sorted(avg) == ['Алматы', 'Астана', 'Шымкент'], f'There must be three cities, yours is {sorted(avg)}'\nassert abs(float(avg['Алматы']) - 66050) < 1e-6, f\"Алматы: 264 200 / 4 = 66 050 ₸, yours is {avg['Алматы']}\"\nassert abs(float(avg['Астана']) - 117500) < 1e-6, 'Астана: 117 500 / 1'\nassert abs(float(avg['Шымкент']) - 11700) < 1e-6, 'Шымкент: 23 400 / 2 = 11 700 ₸'"
    }
   },
   {
    "title": "Broadcast join by chunks",
    "prompt": "<p>Spark sends a small dimension table to every machine (<b>broadcast join</b>). Repeat this: read <code>deng_products.csv</code> entirely, and read <code>deng_orders.csv</code> with <code>chunksize=5</code> and join each chunk with products. Then execute <code>revenue = qty * price_tg</code>. Write into the dictionary <code>by_cat</code> the revenue by category, and into <code>n</code> the number of chunks.</p>",
    "hints": [
     "In each chunk: <code>chunk.merge(products, on='product_id')</code>.",
     "By category: <code>m.groupby('category')['revenue'].sum()</code>, then add to the dict."
    ],
    "check": {
     "tests": "assert n == 3, f'12 rows, chunksize=5 → 3 chunks. Yours is {n}'\nassert {k: int(v) for k, v in by_cat.items()} == {'electronics': 381700, 'home': 182700, 'books': 36000}, f'electronics 381 700, home 182 700, books 36 000 ₸. Yours is {by_cat}'\nassert sum(int(v) for v in by_cat.values()) == 600400, 'The total revenue is 600 400 ₸'"
    }
   }
  ]
 },
 "deng-8": {
  "pr": [
   {
    "title": "Storage cost",
    "prompt": "<p>In the lake, storage costs about $0.023 per GB per month. Write the function <code>storage_cost(gb, months=1, price_per_gb=0.023)</code>: it returns the storage bill. Then write into <code>yearly</code> the cost of 2 000 GB of data for a year (12 months).</p>",
    "hints": [
     "The bill: <code>gb * months * price_per_gb</code>.",
     "<code>yearly = storage_cost(2000, months=12)</code>."
    ],
    "check": {
     "tests": "assert abs(storage_cost(1000) - 23.0) < 1e-9, '1 000 GB for one month = $23'\nassert abs(storage_cost(100, months=3, price_per_gb=0.004) - 1.2) < 1e-9, 'At the archive price: 100 × 3 × 0.004 = $1.2'\nassert yearly is not None and abs(float(yearly) - 552.0) < 1e-9, f'2 000 GB × 12 months × 0.023 = $552, yours is {yearly}'"
    }
   },
   {
    "title": "Cluster bill",
    "prompt": "<p>A pricing model based on running time: the cluster is paid for as many hours as it is on. Write the function <code>cluster_cost(nodes, hours, price_per_node_hour)</code>. Then in <code>monthly</code> — the bill for a cluster of 10 nodes that runs 3 hours a day, at $0.5 per hour, for 30 days.</p>",
    "hints": [
     "The bill: <code>nodes * hours * price_per_node_hour</code>.",
     "Monthly: multiply the daily bill by 30."
    ],
    "check": {
     "tests": "assert abs(cluster_cost(10, 3, 0.5) - 15.0) < 1e-9, '10 nodes × 3 h × $0.5 = $15'\nassert abs(cluster_cost(4, 24, 1.0) - 96.0) < 1e-9, '4 nodes × 24 h × $1 = $96'\nassert monthly is not None and abs(float(monthly) - 450.0) < 1e-9, f'The monthly bill is $450, yours is {monthly}'"
    }
   },
   {
    "title": "Service equivalents",
    "prompt": "<p>Create the dict <code>to_gcp</code> that translates the AWS services from the lesson table into Google Cloud equivalents: <code>S3</code>, <code>Redshift</code>, <code>EC2</code>, <code>Lambda</code>, <code>EMR</code>. Then <code>translate(services)</code> translates the list, and for an unknown service it puts <code>'?'</code>.</p>",
    "hints": [
     "Lake: S3 → GCS, warehouse: Redshift → BigQuery, managed Spark: EMR → Dataproc.",
     "<code>[to_gcp.get(s, '?') for s in services]</code>."
    ],
    "check": {
     "tests": "assert to_gcp.get('S3') == 'GCS' and to_gcp.get('Redshift') == 'BigQuery', 'S3 → GCS, Redshift → BigQuery'\nassert to_gcp.get('EMR') == 'Dataproc' and to_gcp.get('Lambda') == 'Cloud Functions', 'EMR → Dataproc, Lambda → Cloud Functions'\nassert to_gcp.get('EC2') == 'Compute Engine', 'EC2 → Compute Engine'\nassert translate(['S3', 'EMR', 'Kinesis']) == ['GCS', 'Dataproc', '?'], \"An unknown service → '?'\""
    }
   },
   {
    "title": "Scan volume with a filter",
    "prompt": "<p>The table is partitioned by date and stored by columns. Write the function <code>scanned_gb(total_gb, days_total, days_query, col_share)</code>: it returns the volume scanned after filtering by partition and selecting the columns. Then write the function <code>scan_cost(gb, price_per_tb=6.25)</code> (1 TB = 1024 GB) and compute <code>saving</code> — the difference between the bills for the query <code>SELECT *</code> (all days, all columns) and for the query over 7 days with 10% of the columns, for a table of 730 GB over 365 days.</p>",
    "hints": [
     "Scan: <code>total_gb / days_total * days_query * col_share</code>.",
     "The bill: <code>gb / 1024 * price_per_tb</code>; the difference: the full scan minus the filtered scan."
    ],
    "check": {
     "tests": "assert abs(scanned_gb(730, 365, 7, 0.1) - 1.4) < 1e-9, '730 / 365 × 7 × 0.1 = 1.4 GB'\nassert abs(scanned_gb(730, 365, 365, 1.0) - 730) < 1e-9, 'Without a filter — the whole table'\nassert abs(scan_cost(1024) - 6.25) < 1e-9, '1 TB = $6.25'\nassert saving is not None and abs(float(saving) - (728.6 / 1024 * 6.25)) < 1e-6, f'The difference ≈ $4.45, yours is {saving}'"
    }
   },
   {
    "title": "An idle cluster",
    "prompt": "<p>A forgotten cluster eats money at night too. Write the function <code>idle_cost(nodes, price, hours_on, hours_used, days=30)</code>: it returns the monthly cost of the hours when the cluster is on but idle. Then in <code>idle_share</code> — the idle share of the bill for a cluster of 8 nodes at $0.6 per hour, which runs around the clock but is used 6 hours a day (0..1).</p>",
    "hints": [
     "Idle hours: <code>hours_on - hours_used</code>; the bill: <code>nodes * price * бос_сағат * days</code>.",
     "The total bill: <code>8 * 0.6 * 24 * 30</code>; the share is a division."
    ],
    "check": {
     "tests": "assert abs(idle_cost(8, 0.6, 24, 6) - 2592.0) < 1e-6, '8 × 0.6 × 18 h × 30 days = $2 592'\nassert abs(idle_cost(2, 1.0, 10, 10) - 0) < 1e-9, 'If all the time is used, there is no idle time'\nassert abs(idle_cost(1, 1.0, 5, 1, days=7) - 28.0) < 1e-9, '1 × 1 × 4 × 7 = $28'\nassert idle_share is not None and abs(float(idle_share) - 0.75) < 1e-9, f'18 of 24 hours are idle → 0.75, yours is {idle_share}'"
    }
   },
   {
    "title": "Parquet saves money",
    "prompt": "<p>When moving from CSV to Parquet, the file gets <code>ratio</code> times smaller, and only the needed columns are read. Write the function <code>monthly_saving(csv_gb, ratio, cols_read, cols_total, queries, price_per_tb=6.25)</code>: it returns the difference between the bill for <code>queries</code> queries that read the CSV in full and the bill for the same queries on Parquet (1 TB = 1024 GB). Then in <code>saving</code> — the saving for: 1 200 GB of CSV, compression 6 times, 4 of 40 columns, 100 queries a month.</p>",
    "hints": [
     "On Parquet, one query: <code>csv_gb / ratio * cols_read / cols_total</code> GB.",
     "The bill for each: <code>gb * queries / 1024 * price_per_tb</code>."
    ],
    "check": {
     "tests": "assert abs(monthly_saving(1024, 1, 10, 10, 1) - 0) < 1e-9, 'Without compression, all the columns — no saving'\nassert abs(monthly_saving(1024, 2, 10, 10, 1) - 3.125) < 1e-9, 'Compression 2 times: $6.25 - $3.125'\nassert saving is not None and abs(float(saving) - 720.21484375) < 1e-6, f'The saving ≈ $720.21, yours is {saving}'"
    }
   },
   {
    "title": "Monthly bill and budget",
    "prompt": "<p>Build the team's monthly bill. <code>items</code> — the list of three kinds of costs. The function <code>item_cost(item)</code> computes by the kind: <code>'storage'</code> — <code>gb × 0.023</code>; <code>'cluster'</code> — <code>nodes × hours × price × days</code>; <code>'bigquery'</code> — <code>gb_scanned / 1024 × 6.25</code>; an unknown kind — <code>ValueError</code>. Then <code>bill</code> (<code>{name: құны}</code>), <code>total</code>, <code>over_budget</code> (<code>total &gt; BUDGET</code>) and <code>overage</code> (the amount over the budget; if there is none, 0).</p>",
    "hints": [
     "In <code>item_cost</code> — <code>if kind == ...: return ...</code>, at the end — <code>raise ValueError(...)</code>.",
     "<code>overage = max(0, total - BUDGET)</code>."
    ],
    "check": {
     "tests": "assert abs(bill['lake'] - 46.0) < 1e-6 and abs(bill['spark'] - 360.0) < 1e-6, 'lake = $46, spark = $360'\nassert abs(bill['dashboards'] - 250.0) < 1e-6, 'dashboards: 40 960 GB = 40 TB × $6.25 = $250'\nassert abs(float(total) - 656.0) < 1e-6, f'The total bill is $656, yours is {total}'\nassert over_budget == True and abs(float(overage) - 56.0) < 1e-6, 'Budget $600 → over by $56'\n_ok = False\ntry:\n    item_cost({'name': 'x', 'kind': 'gpu'})\nexcept ValueError:\n    _ok = True\nassert _ok, 'For an unknown kind raise ValueError'"
    }
   },
   {
    "title": "The most expensive users",
    "prompt": "<p>The BigQuery query log <code>log</code> is given. Compute the cost of each query (<code>gb_scanned / 1024 × 6.25</code>) into the column <code>cost_usd</code> and build the DataFrame <code>report</code>: the columns <code>user</code>, <code>queries</code> (the count), <code>cost_usd</code> (the sum); sorted by cost in descending order, with the index from 0. Then <code>top_share</code> is the share of the first user in the total bill, rounded to 3 decimal places.</p>",
    "hints": [
     "<code>log['cost_usd'] = log['gb_scanned'] / 1024 * 6.25</code>, then <code>groupby('user', as_index=False).agg(...)</code>.",
     "The share: <code>round(report['cost_usd'].iloc[0] / report['cost_usd'].sum(), 3)</code>."
    ],
    "check": {
     "tests": "assert report is not None and list(report.columns) == ['user', 'queries', 'cost_usd'], 'The columns: user, queries, cost_usd'\nassert list(report['user']) == ['aigerim', 'daniyar', 'meruert'], f\"The order: aigerim, daniyar, meruert. Yours is {list(report['user'])}\"\nassert [int(x) for x in report['queries']] == [3, 2, 2], 'The number of queries: 3, 2, 2'\nassert [round(float(x), 5) for x in report['cost_usd']] == [21.875, 12.5, 2.34375], 'The cost: $21.875, $12.5, $2.34375'\nassert top_share is not None and abs(float(top_share) - 0.596) < 1e-9, f'21.875 / 36.71875 ≈ 0.596, yours is {top_share}'"
    }
   }
  ]
 }
} });
