// ml practice tasks: English text. Code, solutions and checks are in content/practice/ml.js.
DJ.i18n.patch({ lessons: {
 "ml-1": {
  "pr": [
   {
    "title": "Subscriber features",
    "prompt": "<p>Create <code>X</code> from <code>churn.csv</code> (columns: <code>age</code>, <code>tenure_months</code>, <code>monthly_fee</code>, in this order) and the target <code>y</code> (<code>churned</code>).</p><p>For example, <code>X.shape</code> → <code>(600, 3)</code>.</p>",
    "hints": [
     "Several columns: <code>churn[['age', 'tenure_months', 'monthly_fee']]</code>",
     "Target: <code>churn['churned']</code>"
    ],
    "check": {
     "tests": "assert isinstance(X, pd.DataFrame), 'X must be a DataFrame: use double brackets [[...]]'\nassert list(X.columns) == ['age', 'tenure_months', 'monthly_fee'], 'Columns of X: age, tenure_months, monthly_fee (in this order)'\nassert isinstance(y, pd.Series) and y.name == 'churned', 'y must be the churned column (a Series, single brackets)'\nassert len(X) == 600 and len(y) == 600, 'All 600 subscribers must remain in X and y'"
    }
   },
   {
    "title": "Detect the task type",
    "prompt": "<p>Write a function <code>task_type(values)</code>. If the target values are only 0 and 1, it should return <code>'classification'</code>, otherwise <code>'regression'</code>.</p><p>For example, <code>task_type([0, 1, 1])</code> → <code>'classification'</code>, <code>task_type([35.5, 41.2])</code> → <code>'regression'</code>.</p>",
    "hints": [
     "<code>set(values) &lt;= {0, 1}</code> checks that every value is 0 or 1."
    ],
    "check": {
     "tests": "assert task_type([0, 1, 1, 0]) == 'classification', \"task_type([0, 1, 1, 0]) must return «classification»\"\nassert task_type([35.5, 41.2, 28.0]) == 'regression', \"For the values (35.5, 41.2, ...) the result must be «regression»\"\nassert task_type([1, 1, 1]) == 'classification', \"Only ones and zeros is still a classification task: «classification»\"\nassert task_type([0, 1, 2]) == 'regression', \"For the values 0, 1, 2 the result must be «regression» (not only 0 and 1)\""
    }
   },
   {
    "title": "Table size",
    "prompt": "<p>From the table <code>flats</code>, take into <code>X</code> all columns except <code>flat_id</code> and <code>price_mln</code>. Write the number of rows to <code>n_samples</code> and the number of features to <code>n_features</code>.</p><p>Hint: <code>X.shape</code> returns two numbers.</p>",
    "hints": [
     "<code>flats.drop(columns=['flat_id', 'price_mln'])</code>",
     "<code>n_samples, n_features = X.shape</code>"
    ],
    "check": {
     "tests": "assert 'price_mln' not in X.columns and 'flat_id' not in X.columns, 'X must not contain price_mln and flat_id'\nassert n_samples == 400, 'n_samples must be 400 (the number of rows)'\nassert n_features == 6, 'n_features must be 6: two of the 8 columns are removed'"
    }
   },
   {
    "title": "Numeric features only",
    "prompt": "<p>A model cannot take a text column directly. From <code>flats</code>, keep only the <b>numeric</b> columns and remove <code>flat_id</code> and <code>price_mln</code>. The result is a DataFrame <code>X_num</code>. Write the list of column names to <code>num_cols</code>.</p>",
    "hints": [
     "<code>flats.select_dtypes('number')</code> keeps only the numeric columns.",
     "Then <code>.drop(columns=[...])</code>."
    ],
    "check": {
     "tests": "assert isinstance(X_num, pd.DataFrame) and len(X_num) == 400, 'X_num — a DataFrame with 400 rows'\nassert 'district' not in X_num.columns, 'The text column district is a text column: do not keep it'\nassert set(num_cols) == {'rooms', 'area_m2', 'floor', 'floors_total', 'year_built'}, 'Numeric features: rooms, area_m2, floor, floors_total, year_built'\nassert list(X_num.columns) == list(num_cols), 'num_cols = list(X_num.columns)'"
    }
   },
   {
    "title": "Almaty subscribers",
    "prompt": "<p>Take only the subscribers from Almaty and drop the rows with an empty <code>age</code> (<code>dropna(subset=['age'])</code>). From them, create <code>X_alm</code> (<code>age</code>, <code>tenure_months</code>) and <code>y_alm</code> (<code>churned</code>).</p>",
    "hints": [
     "Filter: <code>churn[churn['city'] == 'Алматы']</code>",
     "<code>.dropna(subset=['age'])</code>"
    ],
    "check": {
     "tests": "_a = churn[churn['city'] == 'Алматы'].dropna(subset=['age'])\nassert list(X_alm.columns) == ['age', 'tenure_months'], 'Columns of X_alm: age, tenure_months'\nassert len(X_alm) == len(_a), f'X_alm must have {len(_a)} rows: Almaty and a non-empty age'\nassert not X_alm['age'].isna().any(), 'No empty values may remain in age'\nassert list(y_alm.index) == list(X_alm.index), 'y_alm must come from the same rows as X_alm'"
    }
   },
   {
    "title": "Hand-written rule",
    "prompt": "<p>A rule without ML: \"if the subscriber called support at least 3 times, they leave\". Create <code>pred_rule</code> (a 0/1 Series) and write the rule's accuracy (the share of matches with the real <code>churned</code>) to <code>rule_acc</code>.</p>",
    "hints": [
     "<code>(churn['support_calls'] >= 3).astype(int)</code>",
     "Share of matches: <code>(a == b).mean()</code>"
    ],
    "check": {
     "tests": "_r = (churn['support_calls'] >= 3).astype(int)\nassert len(pred_rule) == 600 and set(pred_rule.unique()) <= {0, 1}, 'pred_rule — a Series of 600 values 0/1'\nassert int(pred_rule.sum()) == int(_r.sum()), 'If support_calls >= 3 then 1, otherwise 0'\nassert abs(rule_acc - (_r == churn['churned']).mean()) < 1e-9, 'rule_acc = (pred_rule == churn[\"churned\"]).mean()'"
    }
   },
   {
    "title": "Find the rule in the data",
    "prompt": "<p>Choose the threshold from the data, not by hand. For <code>k</code> = 0, 1, …, 5, write the accuracy of the rule \"the subscriber leaves if <code>support_calls &gt;= k</code>\" into the dictionary <code>accs</code> (the key is <code>k</code>). Write the <code>k</code> with the highest accuracy to <code>best_k</code>.</p><p>This is the simplest form of \"learning\": the model picks a parameter from examples.</p>",
    "hints": [
     "Loop: <code>for k in range(6):</code>",
     "<code>max(accs, key=accs.get)</code>"
    ],
    "check": {
     "tests": "_acc = {_k: ((churn['support_calls'] >= _k).astype(int) == churn['churned']).mean() for _k in range(6)}\nassert sorted(accs) == [0, 1, 2, 3, 4, 5], 'Keys of accs: 0, 1, 2, 3, 4, 5'\nassert all(abs(accs[_k] - _acc[_k]) < 1e-9 for _k in _acc), 'The accuracy is wrong: (pred == churned).mean()'\nassert abs(accs[0] - (1 - churn['churned'].mean())) > 0.3, 'When k = 0 everyone is predicted as \"leaves\"'\nassert best_k == max(_acc, key=_acc.get), f'best_k must be {max(_acc, key=_acc.get)}'"
    }
   },
   {
    "title": "Price per square metre",
    "prompt": "<p>The simplest \"model\": the average price of one square metre. <code>rate</code> = sum of all prices / sum of all areas. The function <code>predict(area)</code> returns <code>rate * area</code>. Write the mean absolute error over all flats (the mean of |price − prediction|) to <code>mae_rule</code>.</p>",
    "hints": [
     "<code>flats['price_mln'].sum() / flats['area_m2'].sum()</code>",
     "The function also works with a Series: <code>predict(flats['area_m2'])</code>"
    ],
    "check": {
     "tests": "_rate = flats['price_mln'].sum() / flats['area_m2'].sum()\nassert rate is not None and abs(rate - _rate) < 1e-9, f'rate must be ≈ {_rate:.3f}: sum of prices / sum of areas'\nassert abs(predict(60) - 60 * _rate) < 1e-9, 'predict(60) must equal rate * 60'\n_mae = (flats['price_mln'] - _rate * flats['area_m2']).abs().mean()\nassert abs(mae_rule - _mae) < 1e-6, f'mae_rule must be ≈ {_mae:.2f}'"
    }
   }
  ]
 },
 "ml-2": {
  "pr": [
   {
    "title": "Price from the number of rooms",
    "prompt": "<p>Train a <code>LinearRegression</code> named <code>model</code> to predict the price (<code>price_mln</code>) from the number of rooms (<code>rooms</code>). Write the predicted price of a three-room flat as a number to <code>pred3</code>.</p>",
    "hints": [
     "<code>X = flats[['rooms']]</code> (double brackets)",
     "<code>model.predict(pd.DataFrame({'rooms': [3]}))[0]</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_m = _LinR().fit(_f[['rooms']], _f['price_mln'])\n_p = _m.predict(_pd.DataFrame({'rooms': [3]}))[0]\nassert isinstance(model, LinearRegression) and hasattr(model, 'coef_'), 'model must be a trained LinearRegression'\nassert model.n_features_in_ == 1, 'Only one feature: rooms'\nassert abs(float(pred3) - _p) < 1e-6, f'pred3 must be ≈ {_p:.2f}: predict(...)[0]'"
    }
   },
   {
    "title": "Slope and intercept",
    "prompt": "<p>Train a <code>LinearRegression</code> to predict the price from the area (<code>area_m2</code>). Write the coefficient to <code>slope</code> and the intercept to <code>intercept</code>. <code>slope</code> is how many million tenge the price grows when the area grows by 1 m².</p>",
    "hints": [
     "<code>model.coef_</code> is an array, take its first element.",
     "<code>model.intercept_</code>"
    ]
   },
   {
    "title": "Ice cream sales",
    "prompt": "<p>A shop in Almaty: the air temperature (<code>temp</code>) and the number of ice creams sold (<code>sales</code>). Train <code>model</code> and write the prediction at 30°C to <code>pred30</code>.</p>",
    "hints": [
     "<code>model.fit(shop[['temp']], shop['sales'])</code>",
     "<code>model.predict(pd.DataFrame({'temp': [30]}))[0]</code>"
    ],
    "check": {
     "tests": "assert hasattr(model, 'coef_'), 'The model is not trained: call model.fit(...)'\nassert abs(float(pred30) - 700) < 1e-6, 'pred30 must be 700: sales = 20 × temp + 100'"
    }
   },
   {
    "title": "Price of three flats",
    "prompt": "<p>Train <code>model</code> on the features <code>area_m2</code> and <code>rooms</code>. There are three new flats: (45 m², 1 room), (70 m², 2), (95 m², 3). Write their predicted prices into the array <code>preds</code> with one call to <code>predict</code>.</p>",
    "hints": [
     "New table: <code>pd.DataFrame({'area_m2': [45, 70, 95], 'rooms': [1, 2, 3]})</code>",
     "The columns must be in the same order as in training."
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_m = _LinR().fit(_f[['area_m2', 'rooms']], _f['price_mln'])\n_p = _m.predict(_pd.DataFrame({'area_m2': [45, 70, 95], 'rooms': [1, 2, 3]}))\nassert model.n_features_in_ == 2, 'The model must be trained on two features: area_m2, rooms'\nassert len(preds) == 3, 'preds must contain 3 predictions'\nassert _np.allclose(preds, _p), f'preds must be ≈ {_np.round(_p, 2)}. Column order: area_m2, rooms'"
    }
   },
   {
    "title": "Which model is better",
    "prompt": "<p>Train two models on all the data and compute R² with <code>score</code>: only <code>area_m2</code> → <code>r2_a</code>; <code>area_m2</code> + <code>year_built</code> → <code>r2_ay</code>. If the first model has the larger R², write the text <code>'area'</code> into <code>better</code>, otherwise <code>'area_year'</code>.</p>",
    "hints": [
     "<code>LinearRegression().fit(X, y).score(X, y)</code>",
     "Conditional expression: <code>'area' if r2_a &gt; r2_ay else 'area_year'</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_y = _f['price_mln']\n_r1 = _LinR().fit(_f[['area_m2']], _y).score(_f[['area_m2']], _y)\n_r2 = _LinR().fit(_f[['area_m2', 'year_built']], _y).score(_f[['area_m2', 'year_built']], _y)\nassert abs(r2_a - _r1) < 1e-6, f'r2_a must be ≈ {_r1:.4f}'\nassert abs(r2_ay - _r2) < 1e-6, f'r2_ay must be ≈ {_r2:.4f}'\nassert better == ('area' if _r1 > _r2 else 'area_year'), 'better: the name of the model with the larger R²'"
    }
   },
   {
    "title": "Largest error",
    "prompt": "<p>Train <code>model</code> on the features <code>area_m2</code>, <code>rooms</code>, <code>year_built</code> on all the data. Write the predictions into the column <code>flats['pred']</code>. Write to <code>worst_id</code> the <code>flat_id</code> of the flat whose prediction differs most from the real price (the largest absolute error).</p>",
    "hints": [
     "Error: <code>(flats['price_mln'] - flats['pred']).abs()</code>",
     "<code>err.idxmax()</code> gives the row index, then <code>flats.loc[..., 'flat_id']</code>."
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_X = _f[['area_m2', 'rooms', 'year_built']]\n_e = (_f['price_mln'] - _LinR().fit(_X, _f['price_mln']).predict(_X)).abs()\nassert 'pred' in flats.columns, \"Add the column flats['pred']\"\nassert _np.allclose(flats['pred'], _f['price_mln'] - (_f['price_mln'] - flats['pred'])) and abs((flats['price_mln'] - flats['pred']).abs().max() - _e.max()) < 1e-6, 'pred is the prediction of the model trained on three features'\nassert int(worst_id) == int(_f.loc[_e.idxmax(), 'flat_id']), f'worst_id must be {int(_f.loc[_e.idxmax(), \"flat_id\"])}'"
    }
   },
   {
    "title": "Best single feature",
    "prompt": "<p>For each feature in <code>['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']</code>, train a <b>separate</b> <code>LinearRegression</code> (on all the data) and write its R² into the dictionary <code>r2s</code> (the key is the column name). Write the feature with the highest R² to <code>best_feature</code>.</p>",
    "hints": [
     "Inside the loop: <code>X = flats[[c]]</code>",
     "<code>max(r2s, key=r2s.get)</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_r = {_c: _LinR().fit(_f[[_c]], _f['price_mln']).score(_f[[_c]], _f['price_mln']) for _c in ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']}\nassert set(r2s) == set(_r), 'r2s must contain 5 features'\nassert all(abs(r2s[_c] - _r[_c]) < 1e-6 for _c in _r), 'The R² of each feature is wrong: fit and score must use the same X'\nassert best_feature == max(_r, key=_r.get), f'best_feature must be {max(_r, key=_r.get)}'"
    }
   },
   {
    "title": "Cheap flats",
    "prompt": "<p>Train a model on <code>area_m2</code>, <code>rooms</code>, <code>year_built</code> over all the data and find the prediction for each flat. Write the number of flats whose price is <b>more than 10%</b> below the prediction (<code>price_mln &lt; 0.9 * pred</code>) to <code>n_bargain</code>. Write the district where such flats occur most often to <code>bargain_district</code>.</p>",
    "hints": [
     "Filter: <code>flats[flats['price_mln'] &lt; 0.9 * pred]</code>",
     "<code>value_counts().idxmax()</code> gives the most frequent value."
    ]
   }
  ]
 },
 "ml-3": {
  "pr": [
   {
    "title": "A quarter for the test set",
    "prompt": "<p>Let <code>X = flats[['area_m2']]</code> and <code>y = flats['price_mln']</code>. Split them into <code>X_train, X_test, y_train, y_test</code> with <code>test_size=0.25</code>, <code>random_state=1</code>. Write the sizes to <code>n_train</code> and <code>n_test</code>.</p>",
    "hints": [
     "<code>train_test_split(X, y, test_size=0.25, random_state=1)</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_a, _b, _c, _d = _tts(_f[['area_m2']], _f['price_mln'], test_size=0.25, random_state=1)\nassert (n_train, n_test) == (300, 100), 'n_train = 300, n_test = 100'\nassert list(X_test.index) == list(_b.index), 'The split is different: did you set random_state=1?'\nassert list(y_test.index) == list(X_test.index), 'Check the order: X_train, X_test, y_train, y_test'"
    }
   },
   {
    "title": "Repeating the split",
    "prompt": "<p>Split the same data twice with <code>random_state=7</code> (<code>test_size=0.2</code>) and check whether the test indices are the same: write the result (bool) to <code>same</code>. Then split with <code>random_state=8</code> and check whether the test indices differ from the first split: write the result to <code>differ</code>. Save the test part of the first split as <code>X_test7</code>.</p>",
    "hints": [
     "You can assign the parts you do not need to the variable <code>_</code>.",
     "Comparing indices: <code>list(a.index) == list(b.index)</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_a, _b, _c, _d = _tts(_f[['area_m2', 'rooms']], _f['price_mln'], test_size=0.2, random_state=7)\nassert list(X_test7.index) == list(_b.index), 'X_test7 — the test part of the split with random_state=7, test_size=0.2'\nassert same is True, 'The same random_state gives the same split: same = True'\nassert differ is True, 'A different random_state gives a different split: differ = True'"
    }
   },
   {
    "title": "Stratify and the share",
    "prompt": "<p>Split the churn data with <code>test_size=0.2</code>, <code>random_state=0</code>, <code>stratify=y</code>. Write the share of churn in train to <code>train_rate</code> and the share in test to <code>test_rate</code>. They should be very close to each other.</p>",
    "hints": [
     "<code>train_test_split(X, y, test_size=0.2, random_state=0, stratify=y)</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import train_test_split as _tts\n_a, _b, _c, _d = _tts(X, y, test_size=0.2, random_state=0, stratify=y)\nassert len(y_test) == 120, 'The test set must have 120 subscribers (test_size=0.2)'\nassert abs(train_rate - _c.mean()) < 1e-9 and abs(test_rate - _d.mean()) < 1e-9, 'Shares: y_train.mean() and y_test.mean(). Did you set stratify=y?'\nassert abs(train_rate - test_rate) < 0.01, 'With stratify the shares should be close to each other'"
    }
   },
   {
    "title": "Difference between train and test",
    "prompt": "<p>Features: <code>area_m2</code>, <code>rooms</code>, <code>year_built</code>, <code>floor</code>. Split with <code>test_size=0.3</code>, <code>random_state=0</code>, and train <code>model</code> on the train part. Compute <code>gap = train_r2 - test_r2</code>.</p>",
    "hints": [
     "Model: <code>LinearRegression().fit(X_train, y_train)</code>",
     "Two R² values: <code>model.score(X_train, y_train)</code>, <code>model.score(X_test, y_test)</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_a, _b, _c, _d = _tts(_f[['area_m2', 'rooms', 'year_built', 'floor']], _f['price_mln'], test_size=0.3, random_state=0)\n_m = _LinR().fit(_a, _c)\nassert abs(train_r2 - _m.score(_a, _c)) < 1e-6, 'train_r2 = model.score(X_train, y_train)'\nassert abs(test_r2 - _m.score(_b, _d)) < 1e-6, 'test_r2 is wrong: the model must be trained only on the train part'\nassert abs(gap - (_m.score(_a, _c) - _m.score(_b, _d))) < 1e-6, 'gap = train_r2 - test_r2'"
    }
   },
   {
    "title": "Randomness of the split",
    "prompt": "<p>The test R² of one model changes depending on the split. For <code>random_state</code> = 0, 1, …, 9 (<code>test_size=0.2</code>, features <code>area_m2</code>, <code>rooms</code>, <code>year_built</code>) write the test R² to the list <code>scores</code>. <code>spread = max(scores) - min(scores)</code>.</p>",
    "hints": [
     "<code>for rs in range(10):</code>",
     "Train a new model on each pass."
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_s = []\nfor _rs in range(10):\n    _a, _b, _c, _d = _tts(_f[['area_m2', 'rooms', 'year_built']], _f['price_mln'], test_size=0.2, random_state=_rs)\n    _s.append(_LinR().fit(_a, _c).score(_b, _d))\nassert len(scores) == 10, 'scores must contain 10 values'\nassert _np.allclose(scores, _s), 'The test R² for each random_state is wrong (check the order: 0, 1, ..., 9)'\nassert abs(spread - (max(_s) - min(_s))) < 1e-9, 'spread = max(scores) - min(scores)'"
    }
   },
   {
    "title": "Manual split",
    "prompt": "<p>Split without <code>train_test_split</code>: shuffle the rows with <code>flats.sample(frac=1, random_state=0)</code>, write the first 320 rows to <code>train_df</code> and the remaining 80 rows to <code>test_df</code>.</p>",
    "hints": [
     "<code>shuffled = flats.sample(frac=1, random_state=0)</code>",
     "<code>shuffled.iloc[:320]</code> and <code>shuffled.iloc[320:]</code>"
    ],
    "check": {
     "tests": "_s = pd.read_csv('flats.csv').sample(frac=1, random_state=0)\nassert len(train_df) == 320 and len(test_df) == 80, 'train_df — 320 rows, test_df — 80 rows'\nassert not set(train_df['flat_id']) & set(test_df['flat_id']), 'train_df and test_df must not share any flats'\nassert list(test_df['flat_id']) == list(_s['flat_id'].iloc[320:]), 'Shuffling: flats.sample(frac=1, random_state=0), then iloc'"
    }
   },
   {
    "title": "Old and new houses",
    "prompt": "<p>How well does a model carry over to new conditions? Train <code>model_old</code> on the flats with <code>year_built &lt; 2000</code> using <code>area_m2</code>, <code>rooms</code>. Write the R² on the flats with <code>year_built &gt;= 2000</code> to <code>shift_r2</code>. For comparison, write the test R² of the random split (<code>test_size=0.2</code>, <code>random_state=42</code>, the same features) to <code>rand_r2</code>.</p>",
    "hints": [
     "Two filters: <code>flats[flats['year_built'] &lt; 2000]</code> and <code>&gt;= 2000</code>.",
     "<code>model_old.score(new[cols], new['price_mln'])</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_o = _f[_f['year_built'] < 2000]\n_n = _f[_f['year_built'] >= 2000]\n_c2 = ['area_m2', 'rooms']\n_sr = _LinR().fit(_o[_c2], _o['price_mln']).score(_n[_c2], _n['price_mln'])\n_a, _b, _c, _d = _tts(_f[_c2], _f['price_mln'], test_size=0.2, random_state=42)\n_rr = _LinR().fit(_a, _c).score(_b, _d)\nassert model_old.n_features_in_ == 2, 'model_old features: area_m2, rooms'\nassert abs(shift_r2 - _sr) < 1e-6, f'shift_r2 must be ≈ {_sr:.3f}: train on the old houses, evaluate on the new ones'\nassert abs(rand_r2 - _rr) < 1e-6, f'rand_r2 must be ≈ {_rr:.3f}'\nassert shift_r2 < rand_r2, 'Quality should drop on the new houses'"
    }
   },
   {
    "title": "Validation set",
    "prompt": "<p>Choose the feature set without looking at the test set. First split with <code>test_size=0.2</code>, <code>random_state=0</code> into <code>X_rest</code> and <code>X_test</code>, then split <code>X_rest</code> with <code>test_size=0.25</code>, <code>random_state=0</code> into <code>X_train</code> and <code>X_val</code>. For each set in <code>sets</code>, write into <code>val_scores</code> the validation R² of a model trained on train. Write the best set to <code>best_set</code> and its test R² (the model trained only on <code>X_train</code>) to <code>test_r2</code>.</p>",
    "hints": [
     "Two splits: first the test set, then the validation set from the rest.",
     "Loop: <code>for name, cols in sets.items():</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_X = _f[sets['five']]\n_Xr, _Xt, _yr, _yt = _tts(_X, _f['price_mln'], test_size=0.2, random_state=0)\n_Xa, _Xv, _ya, _yv = _tts(_Xr, _yr, test_size=0.25, random_state=0)\n_v = {_k: _LinR().fit(_Xa[_cc], _ya).score(_Xv[_cc], _yv) for _k, _cc in sets.items()}\n_b = max(_v, key=_v.get)\nassert len(X_val) == 80 and len(X_train) == 240, 'X_train — 240 rows, X_val — 80 rows'\nassert set(val_scores) == set(sets) and all(abs(val_scores[_k] - _v[_k]) < 1e-6 for _k in _v), 'val_scores: train on train and evaluate on X_val'\nassert best_set == _b, f'best_set must be {_b}'\nassert abs(test_r2 - _LinR().fit(_Xa[sets[_b]], _ya).score(_Xt[sets[_b]], _yt)) < 1e-6, 'test_r2: train on X_train with the chosen set and evaluate on X_test once'"
    }
   }
  ]
 },
 "ml-4": {
  "pr": [
   {
    "title": "MAE function",
    "prompt": "<p>Write a function <code>mae(y_true, y_pred)</code> with NumPy: the mean of the absolute errors.</p><p>For example, <code>mae([10, 20], [12, 17])</code> → <code>2.5</code>.</p>",
    "hints": [
     "<code>np.asarray(...)</code> turns a list into an array.",
     "<code>np.mean(np.abs(err))</code>"
    ],
    "check": {
     "tests": "assert mae([10, 20], [12, 17]) is not None and abs(mae([10, 20], [12, 17]) - 2.5) < 1e-9, 'mae([10, 20], [12, 17]) must return 2.5'\nassert abs(mae([5, 5, 5], [5, 5, 5])) < 1e-9, 'If there are no errors, the result is 0'\nassert abs(mae([0, 0, 0, 0], [1, -1, 3, -3]) - 2.0) < 1e-9, 'Negative errors are also taken as absolute values: 2.0'"
    }
   },
   {
    "title": "RMSE function",
    "prompt": "<p>Write a function <code>rmse(y_true, y_pred)</code>: the square root of the mean of the squared errors.</p><p>For example, <code>rmse([0, 0], [3, 4])</code> → <code>√12.5 ≈ 3.536</code>.</p>",
    "hints": [
     "<code>err ** 2</code> are the squares.",
     "<code>np.sqrt(np.mean(...))</code>"
    ],
    "check": {
     "tests": "assert rmse([0, 0], [3, 4]) is not None and abs(rmse([0, 0], [3, 4]) - 12.5 ** 0.5) < 1e-9, 'rmse([0, 0], [3, 4]) must be ≈ 3.536'\nassert abs(rmse([1, 2, 3], [1, 2, 3])) < 1e-9, 'If there are no errors, the result is 0'\nassert abs(rmse([10, 10], [12, 8]) - 2.0) < 1e-9, 'rmse([10, 10], [12, 8]) = 2.0'"
    }
   },
   {
    "title": "R² function",
    "prompt": "<p>Write a function <code>r2(y_true, y_pred)</code>: <code>1 − SS_res / SS_tot</code>, where <code>SS_res</code> is the sum of the squared errors and <code>SS_tot</code> is the sum of the squared deviations of <code>y_true</code> from its mean.</p><p>For example, <code>r2([1, 2, 3], [1, 2, 3])</code> → <code>1.0</code>.</p>",
    "hints": [
     "<code>ss_res = np.sum((y_true - y_pred) ** 2)</code>",
     "<code>ss_tot = np.sum((y_true - y_true.mean()) ** 2)</code>"
    ],
    "check": {
     "tests": "assert r2([1, 2, 3], [1, 2, 3]) is not None and abs(r2([1, 2, 3], [1, 2, 3]) - 1) < 1e-9, 'A perfect prediction: R² = 1'\nassert abs(r2([1, 2, 3], [2, 2, 2])) < 1e-9, 'Predicting the mean: R² = 0'\nassert abs(r2([3, 5, 7, 9], [4, 5, 6, 10]) - 0.85) < 1e-9, 'r2([3, 5, 7, 9], [4, 5, 6, 10]) = 0.85'"
    }
   },
   {
    "title": "Coefficient table",
    "prompt": "<p>The split is ready. Train <code>model</code> on the train part and write the coefficients with column names into the Series <code>coefs</code> (<code>pd.Series(model.coef_, index=X.columns)</code>). How does the price change when one room is added (the area fixed)? Write it to <code>rooms_effect</code>.</p>",
    "hints": [
     "<code>pd.Series(model.coef_, index=X.columns)</code>",
     "<code>coefs['rooms']</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_a, _b, _c, _d = _tts(_f[['area_m2', 'rooms', 'year_built']], _f['price_mln'], test_size=0.2, random_state=42)\n_m = _LinR().fit(_a, _c)\nassert isinstance(coefs, pd.Series) and list(coefs.index) == ['area_m2', 'rooms', 'year_built'], 'The index of coefs is the column names of X'\nassert _np.allclose(coefs.values, _m.coef_), 'The values of coefs are the coef_ of the model trained on train'\nassert abs(rooms_effect - _m.coef_[1]) < 1e-9, \"rooms_effect = coefs['rooms']\""
    }
   },
   {
    "title": "Predicting with the mean",
    "prompt": "<p>Baseline: for each test flat, predict the mean of the train prices. Write its MAE to <code>base_mae</code>. Then train <code>LinearRegression</code> on train and write its MAE to <code>model_mae</code>. <code>gain = base_mae - model_mae</code>.</p>",
    "hints": [
     "<code>np.full(len(y_test), y_train.mean())</code>",
     "<code>mean_absolute_error(y_test, pred)</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_a, _b, _c, _d = _tts(_f[['area_m2', 'rooms', 'year_built']], _f['price_mln'], test_size=0.2, random_state=42)\n_bm = _np.mean(_np.abs(_d - _c.mean()))\n_mm = _np.mean(_np.abs(_d - _LinR().fit(_a, _c).predict(_b)))\nassert abs(base_mae - _bm) < 1e-6, f'base_mae must be ≈ {_bm:.2f}: the prediction is y_train.mean() (not y_test!)'\nassert abs(model_mae - _mm) < 1e-6, f'model_mae must be ≈ {_mm:.2f}'\nassert abs(gain - (_bm - _mm)) < 1e-6 and gain > 0, 'gain = base_mae - model_mae (a positive number)'"
    }
   },
   {
    "title": "Effect of ten years",
    "prompt": "<p>Train <code>model</code> on all the data using <code>area_m2</code> and <code>year_built</code>. How much does the price change if the house is 10 years newer (the area fixed): <code>delta_10y = 10 * coef_year</code>. To check, write into <code>diff_pred</code> the difference between the predictions for a 60 m² flat from 2020 and from 2010.</p>",
    "hints": [
     "<code>model.coef_[1]</code> is the year_built coefficient.",
     "A two-row table: <code>pd.DataFrame({'area_m2': [60, 60], 'year_built': [2020, 2010]})</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_m = _LinR().fit(_f[['area_m2', 'year_built']], _f['price_mln'])\nassert abs(delta_10y - 10 * _m.coef_[1]) < 1e-6, f'delta_10y must be ≈ {10 * _m.coef_[1]:.3f}: 10 * coef_[1]'\nassert abs(diff_pred - 10 * _m.coef_[1]) < 1e-6, 'diff_pred = prediction(2020) − prediction(2010), which equals delta_10y'"
    }
   },
   {
    "title": "Metrics report",
    "prompt": "<p>Write a function <code>report(y_true, y_pred)</code> without sklearn. It should return a dictionary <code>{'mae': ..., 'rmse': ..., 'r2': ...}</code>.</p><p>For example, <code>report([3, 5, 7, 9], [4, 5, 6, 10])['r2']</code> → <code>0.85</code>.</p>",
    "hints": [
     "First <code>np.asarray(..., dtype=float)</code>.",
     "Three formulas: MAE, RMSE, 1 − SS_res/SS_tot."
    ],
    "check": {
     "tests": "from sklearn.metrics import mean_absolute_error as _ma, mean_squared_error as _ms, r2_score as _r2\n_r = report([3, 5, 7, 9], [4, 5, 6, 10])\nassert isinstance(_r, dict) and set(_r) == {'mae', 'rmse', 'r2'}, \"Return a dictionary with the keys mae, rmse, r2\"\nassert abs(_r['mae'] - 0.75) < 1e-9 and abs(_r['rmse'] - 0.75 ** 0.5) < 1e-9, 'report([3, 5, 7, 9], [4, 5, 6, 10]): mae = 0.75, rmse ≈ 0.866'\nassert abs(_r['r2'] - 0.85) < 1e-9, 'r2 must be 0.85'\n_t, _p = [30, 42, 55, 61, 80], [33, 40, 50, 66, 78]\n_q = report(_t, _p)\nassert abs(_q['mae'] - _ma(_t, _p)) < 1e-9 and abs(_q['rmse'] - _ms(_t, _p) ** 0.5) < 1e-9 and abs(_q['r2'] - _r2(_t, _p)) < 1e-9, 'The result does not match the sklearn metrics'"
    }
   },
   {
    "title": "Error by rooms",
    "prompt": "<p>The split is ready. Train the model on the train part and find the absolute error for each test flat. Write the mean absolute error by the number of rooms (<code>rooms</code>) to the Series <code>mae_by_rooms</code> (the index is the number of rooms). Write the number of rooms with the largest error to <code>worst_rooms</code>.</p>",
    "hints": [
     "Add the error to a column: <code>res = X_test.copy()</code>, <code>res['err'] = ...</code>",
     "<code>res.groupby('rooms')['err'].mean()</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_a, _b, _c, _d = _tts(_f[['area_m2', 'rooms', 'year_built']], _f['price_mln'], test_size=0.2, random_state=42)\n_e = _b.copy()\n_e['err'] = (_d - _LinR().fit(_a, _c).predict(_b)).abs()\n_g = _e.groupby('rooms')['err'].mean()\nassert isinstance(mae_by_rooms, pd.Series) and list(mae_by_rooms.index) == list(_g.index), 'The index of mae_by_rooms is the numbers of rooms in the test set'\nassert _np.allclose(mae_by_rooms.values, _g.values), 'The mean absolute error is wrong: use only the test data'\nassert worst_rooms == _g.idxmax(), f'worst_rooms must be {_g.idxmax()}'"
    }
   }
  ]
 },
 "ml-5": {
  "pr": [
   {
    "title": "Number of districts",
    "prompt": "<p>Create the table <code>d</code> with <code>pd.get_dummies(flats['district'], dtype=int)</code>. Write the number of districts to <code>n_districts</code>. Check that the sum in each row is 1 and write the result (bool) to <code>one_per_row</code>.</p>",
    "hints": [
     "<code>d.shape[1]</code> is the number of columns.",
     "<code>(d.sum(axis=1) == 1).all()</code>"
    ],
    "check": {
     "tests": "assert d.shape == (400, flats['district'].nunique()), 'd — one column for each district'\nassert n_districts == flats['district'].nunique(), f'n_districts must be {flats[\"district\"].nunique()}'\nassert one_per_row is True, 'Each flat is in exactly one district: one_per_row = True'"
    }
   },
   {
    "title": "Encoding the plan",
    "prompt": "<p>Encode <code>churn[['monthly_fee', 'plan']]</code> with <code>pd.get_dummies</code>: <code>columns=['plan']</code>, <code>drop_first=True</code>, <code>dtype=int</code>. The result is <code>Xp</code>, and the list of columns is <code>cols</code>.</p>",
    "hints": [
     "<code>pd.get_dummies(..., columns=['plan'], drop_first=True, dtype=int)</code>"
    ],
    "check": {
     "tests": "assert 'plan' not in Xp.columns, 'The text column plan must not remain'\nassert cols == ['monthly_fee', 'plan_premium', 'plan_standard'], 'Columns: monthly_fee, plan_premium, plan_standard (basic is dropped)'\nassert Xp.shape == (600, 3), 'The shape of Xp is (600, 3)'"
    }
   },
   {
    "title": "School table",
    "prompt": "<p>Encode the <code>city</code> column of the schools table with <code>pd.get_dummies(schools, columns=['city'], dtype=int)</code> and write the result to <code>enc</code>. Take the number of schools in Almaty from the column <code>city_Алматы</code> and write it to <code>n_almaty</code>.</p>",
    "hints": [
     "<code>enc['city_Алматы'].sum()</code>"
    ],
    "check": {
     "tests": "assert list(enc.columns) == ['students', 'city_Алматы', 'city_Астана', 'city_Шымкент'], 'The columns of enc: students and three city_ columns'\nassert n_almaty == 3, 'There are 3 schools in Almaty: n_almaty = 3'"
    }
   },
   {
    "title": "The most expensive district",
    "prompt": "<p><code>X</code> is ready (one-hot, <code>drop_first=True</code>, the base district is Alatau). Train <code>model</code> on all the data and write to the Series <code>dcoef</code> only the coefficients of the <code>district_</code> columns (the index is the column name). Write the column with the largest coefficient to <code>top_district</code>.</p>",
    "hints": [
     "<code>coefs = pd.Series(model.coef_, index=X.columns)</code>",
     "Filter with <code>c.startswith('district_')</code>."
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_X = _pd.get_dummies(_f[['area_m2', 'year_built', 'district']], columns=['district'], drop_first=True, dtype=int)\n_s = _pd.Series(_LinR().fit(_X, _f['price_mln']).coef_, index=_X.columns)\n_s = _s[[_c for _c in _X.columns if _c.startswith('district_')]]\nassert isinstance(dcoef, pd.Series) and len(dcoef) == len(_s), f'dcoef must contain {len(_s)} district_ columns'\nassert _np.allclose(dcoef.loc[_s.index].values, _s.values), 'The coefficients are wrong: train on the whole X, y'\nassert top_district == _s.idxmax(), f'top_district must be {_s.idxmax()}'"
    }
   },
   {
    "title": "Two categorical columns",
    "prompt": "<p>Create <code>X</code> from the columns <code>tenure_months</code>, <code>monthly_fee</code>, <code>city</code>, <code>plan</code> of the table <code>churn</code>: <code>city</code> and <code>plan</code> are encoded together (<code>drop_first=True</code>, <code>dtype=int</code>). Write <code>X.shape</code> to <code>shape</code>.</p>",
    "hints": [
     "<code>columns=['city', 'plan']</code> — the two columns together."
    ],
    "check": {
     "tests": "assert 'city' not in X.columns and 'plan' not in X.columns, 'The text columns city and plan must not remain'\nassert X.shape == (600, 8), f'The shape of X must be (600, 8): 2 numeric + 4 cities + 2 plans. You have {X.shape}'\nassert shape == X.shape, 'shape = X.shape'\nassert 'city_Алматы' not in X.columns, 'drop_first=True: the first city alphabetically (Almaty) must be dropped'"
    }
   },
   {
    "title": "Price of a new flat",
    "prompt": "<p>The model <code>model</code> is trained on the one-hot <code>X</code>. Predict the price of a 70 m², 2015 flat in the Medeu district. Encode the new row with <code>get_dummies</code> too, and align the columns with <code>.reindex(columns=X.columns, fill_value=0)</code>. The result is <code>pred_new</code> (a number).</p>",
    "hints": [
     "One row gives only one column in get_dummies, so <code>reindex(columns=X.columns, fill_value=0)</code> is needed."
    ],
    "check": {
     "tests": "_row = {c: 0 for c in X.columns}\n_row.update({'area_m2': 70, 'year_built': 2015, 'district_Медеу': 1})\n_p = model.predict(pd.DataFrame([_row])[list(X.columns)])[0]\nassert abs(float(pred_new) - _p) < 1e-6, f'pred_new must be ≈ {_p:.2f}. district_Медеу = 1, and the other district_ columns are 0?'"
    }
   },
   {
    "title": "Value of the district feature",
    "prompt": "<p>Compare two models (split: <code>test_size=0.2</code>, <code>random_state=42</code>): (1) the features <code>area_m2</code>, <code>rooms</code>, <code>year_built</code> → test R² <code>r2_without</code>; (2) the same features + one-hot <code>district</code> (<code>drop_first=True</code>, <code>dtype=int</code>) → <code>r2_with</code>. <code>gain = r2_with - r2_without</code>.</p>",
    "hints": [
     "Use the same split for both X: <code>random_state=42</code>.",
     "You can write a loop or two separate blocks."
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_y = _f['price_mln']\n_X2 = _pd.get_dummies(_f[['area_m2', 'rooms', 'year_built', 'district']], columns=['district'], drop_first=True, dtype=int)\n_r = []\nfor _X in [_f[['area_m2', 'rooms', 'year_built']], _X2]:\n    _a, _b, _c, _d = _tts(_X, _y, test_size=0.2, random_state=42)\n    _r.append(_LinR().fit(_a, _c).score(_b, _d))\nassert abs(r2_without - _r[0]) < 1e-6, f'r2_without must be ≈ {_r[0]:.3f}'\nassert abs(r2_with - _r[1]) < 1e-6, f'r2_with must be ≈ {_r[1]:.3f}: one-hot district, drop_first=True'\nassert abs(gain - (_r[1] - _r[0])) < 1e-9 and gain > 0, 'gain = r2_with - r2_without (positive)'"
    }
   },
   {
    "title": "Error of number encoding",
    "prompt": "<p>Encoding the district as one number (<code>flats['district'].astype('category').cat.codes</code>) gives the model false information about an \"order\". Create <code>X_codes</code> (<code>area_m2</code>, <code>year_built</code>, <code>district_code</code>) and <code>X_onehot</code> (<code>area_m2</code>, <code>year_built</code> + one-hot, <code>drop_first=True</code>). Split with <code>test_size=0.2</code>, <code>random_state=42</code>. Test R²: <code>r2_codes</code>, <code>r2_onehot</code>.</p>",
    "hints": [
     "<code>X_codes = flats[['area_m2', 'year_built']].copy()</code>, then add the new column.",
     "For the repeated code write a function: <code>def test_r2(X): ...</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_y = _f['price_mln']\n_Xc = _f[['area_m2', 'year_built']].copy()\n_Xc['district_code'] = _f['district'].astype('category').cat.codes\n_Xo = _pd.get_dummies(_f[['area_m2', 'year_built', 'district']], columns=['district'], drop_first=True, dtype=int)\ndef _t(_X):\n    _a, _b, _c, _d = _tts(_X, _y, test_size=0.2, random_state=42)\n    return _LinR().fit(_a, _c).score(_b, _d)\nassert list(X_codes.columns) == ['area_m2', 'year_built', 'district_code'], 'The columns of X_codes: area_m2, year_built, district_code'\nassert abs(r2_codes - _t(_Xc)) < 1e-6, f'r2_codes must be ≈ {_t(_Xc):.3f}'\nassert abs(r2_onehot - _t(_Xo)) < 1e-6, f'r2_onehot must be ≈ {_t(_Xo):.3f}'\nassert r2_onehot > r2_codes + 0.05, 'The one-hot version should be clearly better than number encoding'"
    }
   }
  ]
 },
 "ml-6": {
  "pr": [
   {
    "title": "Standardization function",
    "prompt": "<p>Write a function <code>standardize(xs)</code> with NumPy: <code>(x − орташа) / SD</code> (<code>np.std</code>, the population SD). The function must return a NumPy array.</p><p>For example, <code>standardize([2, 4, 6])</code> → <code>[-1.2247, 0, 1.2247]</code>.</p>",
    "hints": [
     "<code>xs = np.asarray(xs, dtype=float)</code>",
     "<code>(xs - xs.mean()) / xs.std()</code>"
    ],
    "check": {
     "tests": "import numpy as _np\n_z = standardize([2, 4, 6])\nassert _z is not None and len(_z) == 3, 'standardize([2, 4, 6]) must return an array of 3 values'\nassert _np.allclose(_z, [-1.5 ** 0.5, 0, 1.5 ** 0.5]), 'standardize([2, 4, 6]) ≈ [-1.2247, 0, 1.2247]'\n_w = standardize([10, 20, 30, 40, 100])\nassert abs(_np.mean(_w)) < 1e-9 and abs(_np.std(_w) - 1) < 1e-9, 'The mean of the result must be 0, the SD must be 1'"
    }
   },
   {
    "title": "Distance between points",
    "prompt": "<p>The function <code>dist(a, b)</code> must return the Euclidean distance between two points (lists of any length): <code>√Σ(aᵢ − bᵢ)²</code>.</p><p>For example, <code>dist([0, 0], [3, 4])</code> → <code>5.0</code>.</p>",
    "hints": [
     "<code>np.sum((a - b) ** 2)</code>",
     "<code>np.sqrt(...)</code>"
    ],
    "check": {
     "tests": "assert dist([0, 0], [3, 4]) is not None and abs(dist([0, 0], [3, 4]) - 5) < 1e-9, 'dist([0, 0], [3, 4]) must return 5.0'\nassert abs(dist([1, 2, 3], [1, 2, 3])) < 1e-9, 'Identical points: 0'\nassert abs(dist([1, 1, 1, 1], [2, 2, 2, 2]) - 2) < 1e-9, 'In four dimensions: dist([1, 1, 1, 1], [2, 2, 2, 2]) = 2'"
    }
   },
   {
    "title": "Nearest stop",
    "prompt": "<p>The coordinates of the stops (in km) are in the list <code>stops</code>. The function <code>nearest(points, q)</code> must return the <b>index</b> of the point closest to the point <code>q</code>.</p><p>For example, <code>nearest(stops, [1, 1])</code> → <code>0</code>.</p>",
    "hints": [
     "All distances at once: <code>((P - q) ** 2).sum(axis=1)</code>",
     "<code>np.argmin(d)</code> returns the index of the smallest value."
    ],
    "check": {
     "tests": "assert nearest(stops, [1, 1]) == 0, 'nearest(stops, [1, 1]) must return 0'\nassert nearest(stops, [6, 6]) == 3, 'nearest(stops, [6, 6]) must return 3'\nassert nearest(stops, [4, 2]) == 1, 'nearest(stops, [4, 2]) must return 1'\nassert nearest([[1, 1, 1], [9, 9, 9]], [8, 8, 7]) == 1, 'The function must also work with points in three dimensions'"
    }
   },
   {
    "title": "Choosing the number of neighbours",
    "prompt": "<p>The split is ready. Fit <code>StandardScaler</code> on the train part and scale both parts. For <code>k</code> ∈ [1, 3, 5, 10, 20], write the test R² of <code>KNeighborsRegressor(n_neighbors=k)</code> into the dictionary <code>r2_by_k</code>. Write the best value to <code>best_k</code>.</p>",
    "hints": [
     "Fit the scaler once: <code>scaler = StandardScaler().fit(X_train)</code>",
     "Inside the loop change only the KNN."
    ],
    "check": {
     "tests": "from sklearn.neighbors import KNeighborsRegressor as _KR\nfrom sklearn.preprocessing import StandardScaler as _SS\n_s = _SS().fit(X_train)\n_r = {_k: _KR(n_neighbors=_k).fit(_s.transform(X_train), y_train).score(_s.transform(X_test), y_test) for _k in [1, 3, 5, 10, 20]}\nassert sorted(r2_by_k) == [1, 3, 5, 10, 20], 'The keys of r2_by_k: 1, 3, 5, 10, 20'\nassert all(abs(r2_by_k[_k] - _r[_k]) < 1e-6 for _k in _r), 'The R² values are wrong: fit the scaler on X_train and transform both parts'\nassert best_k == max(_r, key=_r.get), f'best_k must be {max(_r, key=_r.get)}'"
    }
   },
   {
    "title": "Classifying an expensive flat",
    "prompt": "<p>Now a KNN classifier: is the flat \"expensive\" (<code>price_mln &gt;= 50</code> → 1)? The split is ready. <code>KNeighborsClassifier(n_neighbors=7)</code>: (1) the test accuracy on raw data → <code>acc_raw</code>; (2) with a <code>StandardScaler</code> fitted on train → <code>acc_scaled</code>.</p>",
    "hints": [
     "<code>sc = StandardScaler().fit(X_train)</code>",
     "<code>sc.transform(X_train)</code> and <code>sc.transform(X_test)</code>"
    ],
    "check": {
     "tests": "from sklearn.neighbors import KNeighborsClassifier as _KC\nfrom sklearn.preprocessing import StandardScaler as _SS\n_ar = _KC(n_neighbors=7).fit(X_train, y_train).score(X_test, y_test)\n_s = _SS().fit(X_train)\n_as = _KC(n_neighbors=7).fit(_s.transform(X_train), y_train).score(_s.transform(X_test), y_test)\nassert abs(acc_raw - _ar) < 1e-9, f'acc_raw must be ≈ {_ar:.3f} (no scaling, k=7)'\nassert abs(acc_scaled - _as) < 1e-9, f'acc_scaled must be ≈ {_as:.3f}: the scaler is fitted on X_train, both parts are transformed'\nassert acc_scaled > acc_raw, 'Scaling should help KNN: year_built and area_m2 otherwise dominate the 0/1 district columns'"
    }
   },
   {
    "title": "Manual KNN",
    "prompt": "<p>Write a function <code>knn_predict(X_train, y_train, x, k)</code> with NumPy: it must return the mean of the <code>y</code> values of the <code>k</code> points closest to <code>x</code> (Euclidean distance).</p><p>For example, for the data below, <code>knn_predict(Xa, ya, [1.1], 2)</code> → <code>15.0</code>.</p>",
    "hints": [
     "<code>np.argsort(d)[:k]</code> — the indices of the k closest points.",
     "<code>y[idx].mean()</code>"
    ],
    "check": {
     "tests": "assert knn_predict(Xa, ya, [1.1], 2) is not None and abs(knn_predict(Xa, ya, [1.1], 2) - 15) < 1e-9, 'knn_predict(Xa, ya, [1.1], 2) must return 15.0'\nassert abs(knn_predict(Xa, ya, [10.4], 2) - 105) < 1e-9, 'knn_predict(Xa, ya, [10.4], 2) = 105.0'\nassert abs(knn_predict(Xa, ya, [2], 3) - 20) < 1e-9, 'k=3, x=[2]: neighbours 1, 2, 3 give 20.0'\nassert abs(knn_predict([[0, 0], [0, 1], [5, 5]], [1, 3, 9], [0, 0.2], 1) - 1) < 1e-9, 'The function must work with two dimensions too'"
    }
   },
   {
    "title": "Min-max scaling",
    "prompt": "<p>The function <code>minmax(X)</code> must bring each column of a 2D array into the range <code>[0, 1]</code>: <code>(x − min) / (max − min)</code>, column by column. Apply it to <code>flats[['area_m2', 'year_built']]</code> and write the result to <code>M</code>.</p><p>For example, <code>minmax([[1, 10], [3, 30], [2, 20]])</code> → <code>[[0, 0], [1, 1], [0.5, 0.5]]</code>.</p>",
    "hints": [
     "<code>X.min(axis=0)</code> — the minimum of each column.",
     "<code>(X - lo) / (hi - lo)</code>"
    ],
    "check": {
     "tests": "import numpy as _np\n_r = minmax([[1, 10], [3, 30], [2, 20]])\nassert _r is not None and _np.allclose(_r, [[0, 0], [1, 1], [0.5, 0.5]]), 'minmax([[1, 10], [3, 30], [2, 20]]) → [[0, 0], [1, 1], [0.5, 0.5]]'\nassert _np.allclose(minmax([[5, -1], [15, 1]]), [[0, 0], [1, 1]]), 'Each column is scaled by its own min and max (axis=0)'\n_M = _np.asarray(M)\nassert _M.shape == (400, 2), 'The shape of M is (400, 2)'\nassert _np.allclose(_M.min(axis=0), 0) and _np.allclose(_M.max(axis=0), 1), 'Each column of M goes from 0 to 1'"
    }
   },
   {
    "title": "Similar flats",
    "prompt": "<p>Scale the columns <code>area_m2</code>, <code>rooms</code>, <code>year_built</code> with <code>StandardScaler</code> on all the data (<code>Z</code>). For the flat with <code>flat_id == 1</code>, write the <code>flat_id</code> of the 5 closest <b>other</b> flats (from the nearest to the farthest) into the list <code>near_ids</code>, and their mean price into <code>near_price</code>.</p>",
    "hints": [
     "Distances: <code>np.sqrt(((Z - Z[i]) ** 2).sum(axis=1))</code>",
     "Remove the flat itself from <code>np.argsort(d)</code>."
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.preprocessing import StandardScaler as _SS\n_f = pd.read_csv('flats.csv')\n_Z = _SS().fit_transform(_f[['area_m2', 'rooms', 'year_built']])\n_d = _np.sqrt(((_Z - _Z[0]) ** 2).sum(axis=1))\n_d[0] = _np.inf\n_o = _np.argsort(_d)[:5]\nassert len(near_ids) == 5 and 1 not in list(near_ids), 'near_ids — 5 other flats (not flat 1 itself)'\nassert [int(_v) for _v in near_ids] == _f['flat_id'].iloc[_o].tolist(), f'near_ids = {_f[\"flat_id\"].iloc[_o].tolist()}. Did you count in the scaled space?'\nassert abs(near_price - _f['price_mln'].iloc[_o].mean()) < 1e-6, 'near_price — the mean price of these 5 flats'"
    }
   }
  ]
 },
 "ml-7": {
  "pr": [
   {
    "title": "Sigmoid",
    "prompt": "<p>Write a function <code>sigmoid(z)</code>: <code>1 / (1 + e^(−z))</code>. It must work with numbers and with NumPy arrays (<code>np.exp</code>).</p><p>For example, <code>sigmoid(0)</code> → <code>0.5</code>.</p>",
    "hints": [
     "<code>np.exp(-z)</code> accepts arrays too."
    ],
    "check": {
     "tests": "import numpy as _np\nassert sigmoid(0) is not None and abs(float(sigmoid(0)) - 0.5) < 1e-9, 'sigmoid(0) must return 0.5'\nassert abs(float(sigmoid(2)) - 0.8807970779778823) < 1e-9, 'sigmoid(2) ≈ 0.8808'\nassert _np.allclose(sigmoid(_np.array([-3.0, 0.0, 3.0])), [0.04742587, 0.5, 0.95257413]), 'It must also work with an array: use np.exp'"
    }
   },
   {
    "title": "From probability to class",
    "prompt": "<p>The function <code>to_class(probs, t=0.5)</code> must write 1 for each probability with <code>p &gt;= t</code> and 0 otherwise, and return a <b>list</b>.</p><p>For example, <code>to_class([0.2, 0.5, 0.9])</code> → <code>[0, 1, 1]</code>.</p>",
    "hints": [
     "List comprehension: <code>[1 if p &gt;= t else 0 for p in probs]</code>"
    ],
    "check": {
     "tests": "assert to_class([0.2, 0.5, 0.9]) == [0, 1, 1], 'to_class([0.2, 0.5, 0.9]) must return [0, 1, 1] (0.5 ≥ 0.5)'\nassert to_class([0.2, 0.5, 0.9], t=0.1) == [1, 1, 1], 'With t=0.1 everything is 1'\nassert to_class([0.35, 0.29], t=0.3) == [1, 0], 'to_class([0.35, 0.29], t=0.3) = [1, 0]'\nassert to_class([]) == [], 'For an empty list, the result is an empty list'"
    }
   },
   {
    "title": "Risk of a new subscriber",
    "prompt": "<p>The model <code>clf</code> is trained. A new subscriber: joined 3 months ago, pays 11,000 ₸ a month, called support 4 times, has no contract. Write their probability of leaving (a number) to <code>p_new</code>.</p>",
    "hints": [
     "The order of the columns is the same as in <code>features</code>.",
     "<code>clf.predict_proba(new)[0, 1]</code> — the first row, the \"leaves\" class."
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\n_n = _pd.DataFrame({'tenure_months': [3], 'monthly_fee': [11000], 'support_calls': [4], 'has_contract': [0]})\n_pn = _m.predict_proba(_n)[0, 1]\nassert 0 <= float(p_new) <= 1, 'p_new — a probability (between 0 and 1)'\nassert abs(float(p_new) - _pn) < 0.01, f'p_new must be ≈ {_pn:.3f}: predict_proba(new)[0, 1]'"
    }
   },
   {
    "title": "Features that raise the risk",
    "prompt": "<p>Write the coefficients of <code>clf</code> into the Series <code>coefs</code> with the feature names <code>features</code>. Write the names of the features with a positive coefficient (the ones that raise the probability of leaving) to <code>risk_up</code> as an alphabetically sorted list.</p>",
    "hints": [
     "The shape of <code>clf.coef_</code> is (1, 4): <code>clf.coef_[0]</code>",
     "<code>sorted(coefs[coefs &gt; 0].index)</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\n_s = _pd.Series(_m.coef_[0], index=_F)\nassert isinstance(coefs, pd.Series) and list(coefs.index) == features, 'The index of coefs is features'\nassert _np.allclose(coefs.values, _s.values, atol=1e-3), 'coefs = clf.coef_[0] (the first row)'\nassert list(risk_up) == sorted(_s[_s > 0].index), f'risk_up = {sorted(_s[_s > 0].index)}'"
    }
   },
   {
    "title": "Average probability",
    "prompt": "<p>In a good model the average predicted probability is close to the real share of those who leave. Write the mean of <code>proba</code> on the test set to <code>mean_proba</code> and the mean of <code>y_test</code> to <code>true_rate</code>. Write the absolute difference to <code>calib_gap</code>.</p>",
    "hints": [
     "<code>proba.mean()</code>",
     "<code>abs(a - b)</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\nassert abs(mean_proba - _p.mean()) < 0.01, f'mean_proba must be ≈ {_p.mean():.3f}'\nassert abs(true_rate - _yte.mean()) < 1e-9, 'true_rate = y_test.mean()'\nassert abs(calib_gap - abs(mean_proba - true_rate)) < 1e-9 and calib_gap < 0.05, 'calib_gap = |mean_proba − true_rate| (a small number)'"
    }
   },
   {
    "title": "Top ten most at risk",
    "prompt": "<p>The retention team can call only 10 subscribers. On the test set, write the indices (<code>X_test.index</code>) of the 10 subscribers with the highest <code>proba</code> into the list <code>top10</code>. Write the real share of leavers among them to <code>top10_rate</code>.</p>",
    "hints": [
     "<code>pd.Series(proba, index=X_test.index).sort_values(ascending=False)</code>",
     "<code>y_test.loc[top10]</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\n_s = _pd.Series(_p, index=_Xte.index).sort_values(ascending=False)\n_t = list(_s.index[:10])\nassert len(top10) == 10, 'top10 must contain 10 indices'\nassert set(top10) == set(_t), 'top10 — the X_test indices of the 10 subscribers with the highest proba'\nassert abs(top10_rate - _yte.loc[_t].mean()) < 1e-9, 'top10_rate = y_test.loc[top10].mean()'\nassert top10_rate > y_test.mean(), 'Among the most at-risk, the share of leavers should be above average'"
    }
   },
   {
    "title": "Probability by hand",
    "prompt": "<p>Without <code>predict_proba</code>: compute <code>z = X_test · coef + intercept</code> and use the sigmoid to find the probabilities <code>manual</code> (<code>clf.coef_[0]</code>, <code>clf.intercept_[0]</code>). Write the largest absolute difference between <code>manual</code> and <code>proba</code> to <code>max_diff</code> (it should be ≈ 0).</p>",
    "hints": [
     "Matrix multiplication: <code>X_test.values @ clf.coef_[0]</code>",
     "Sigmoid: <code>1 / (1 + np.exp(-z))</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nassert len(manual) == 150, 'manual — for the 150 test subscribers'\nassert _np.allclose(manual, clf.predict_proba(X_test)[:, 1]), 'manual = 1 / (1 + exp(-z)), z = X_test · coef + intercept'\nassert max_diff < 1e-9, 'max_diff must be ≈ 0'"
    }
   },
   {
    "title": "Accuracy by threshold",
    "prompt": "<p>For the thresholds <code>t</code> ∈ 0.1, 0.2, …, 0.9 write the test accuracy into the dictionary <code>acc_by_t</code> (the key is <code>round(t, 1)</code>): the prediction is <code>proba &gt;= t</code>. Write the threshold with the highest accuracy to <code>best_t</code>.</p>",
    "hints": [
     "<code>np.arange(0.1, 0.95, 0.1)</code> gives the values from 0.1 to 0.9.",
     "<code>max(acc_by_t, key=acc_by_t.get)</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\n_a = {round(_t, 1): ((_p >= _t).astype(int) == _yte.values).mean() for _t in _np.arange(0.1, 0.95, 0.1)}\nassert sorted(acc_by_t) == sorted(_a), 'Keys: 0.1, 0.2, ..., 0.9 (round(t, 1))'\nassert all(abs(acc_by_t[_k] - _a[_k]) < 0.02 for _k in _a), 'The accuracy values are wrong: (proba >= t) == y_test'\nassert acc_by_t[best_t] == max(acc_by_t.values()), 'best_t — the threshold with the highest accuracy'"
    }
   }
  ]
 },
 "ml-8": {
  "pr": [
   {
    "title": "Accuracy function",
    "prompt": "<p>The function <code>accuracy(y_true, y_pred)</code> must return the share of correct predictions (without sklearn).</p><p>For example, <code>accuracy([1, 0, 1, 1], [1, 0, 0, 1])</code> → <code>0.75</code>.</p>",
    "hints": [
     "<code>zip(y_true, y_pred)</code> gives the pairs.",
     "The number of correct ones / the total."
    ],
    "check": {
     "tests": "assert accuracy([1, 0, 1, 1], [1, 0, 0, 1]) == 0.75, 'accuracy([1, 0, 1, 1], [1, 0, 0, 1]) must return 0.75'\nassert accuracy([0, 0], [1, 1]) == 0, 'Everything wrong: 0'\nassert accuracy([1, 0, 1], [1, 0, 1]) == 1, 'Everything right: 1'"
    }
   },
   {
    "title": "F1 function",
    "prompt": "<p>The function <code>f1(precision, recall)</code> must return the harmonic mean: <code>2·P·R / (P + R)</code>. If both are 0, it returns 0.</p><p>For example, <code>f1(0.5, 1.0)</code> → <code>0.6667</code>.</p>",
    "hints": [
     "First check the case <code>precision + recall == 0</code>."
    ],
    "check": {
     "tests": "assert f1(0.5, 1.0) is not None and abs(f1(0.5, 1.0) - 2 / 3) < 1e-9, 'f1(0.5, 1.0) must be ≈ 0.6667'\nassert abs(f1(0.8, 0.8) - 0.8) < 1e-9, 'f1(0.8, 0.8) = 0.8'\nassert f1(0, 0) == 0, 'f1(0, 0) = 0 (do not divide by zero)'\nassert abs(f1(1.0, 0.1) - 2 * 0.1 / 1.1) < 1e-9, 'The harmonic mean is close to the smaller value: f1(1.0, 0.1) ≈ 0.18'"
    }
   },
   {
    "title": "\"Everyone stays\" prediction",
    "prompt": "<p>A model that predicts \"nobody leaves\": 0 for every subscriber in the test set. Create the array <code>pred_zero</code> and compute <code>acc_zero</code> (accuracy) and <code>rec_zero</code> (recall).</p>",
    "hints": [
     "<code>np.zeros(len(y_test), dtype=int)</code>",
     "<code>accuracy_score(y_test, pred_zero)</code>"
    ],
    "check": {
     "tests": "assert len(pred_zero) == 150 and int(sum(pred_zero)) == 0, 'pred_zero — 150 zeros'\nassert abs(acc_zero - (1 - y_test.mean())) < 1e-9, f'acc_zero ≈ {1 - y_test.mean():.3f}: the accuracy looks high'\nassert rec_zero == 0, 'rec_zero = 0: not a single leaver is found'"
    }
   },
   {
    "title": "Confusion matrix function",
    "prompt": "<p>The function <code>confusion(y_true, y_pred)</code> must return the list <code>[[tn, fp], [fn, tp]]</code>, as in sklearn.</p><p>For example, <code>confusion([1, 0, 1, 0], [1, 1, 0, 0])</code> → <code>[[1, 1], [1, 1]]</code>.</p>",
    "hints": [
     "<code>pairs.count((0, 1))</code> is the number of FP.",
     "The order: <code>[[tn, fp], [fn, tp]]</code>"
    ],
    "check": {
     "tests": "from sklearn.metrics import confusion_matrix as _cm\nassert confusion([1, 0, 1, 0], [1, 1, 0, 0]) == [[1, 1], [1, 1]], 'confusion([1, 0, 1, 0], [1, 1, 0, 0]) → [[1, 1], [1, 1]]'\nassert confusion([1, 1, 1], [1, 1, 0]) == [[0, 0], [1, 2]], 'confusion([1, 1, 1], [1, 1, 0]) → [[0, 0], [1, 2]]: the order is [[tn, fp], [fn, tp]]'\n_t, _p = [0, 1, 1, 0, 1, 0, 0, 1, 1, 0], [0, 1, 0, 1, 1, 0, 0, 0, 1, 1]\nassert confusion(_t, _p) == _cm(_t, _p).tolist(), 'The result does not match sklearn confusion_matrix'"
    }
   },
   {
    "title": "Comparing two thresholds",
    "prompt": "<p>The <code>proba</code> is ready. With the threshold 0.5 write the precision and recall into <code>prec_05</code> and <code>rec_05</code>, and with the threshold 0.3 write them into <code>prec_03</code> and <code>rec_03</code>.</p>",
    "hints": [
     "<code>(proba &gt;= 0.3).astype(int)</code>",
     "Order of the arguments: <code>precision_score(y_test, pred)</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\nfrom sklearn import metrics as _mt\n_a = (_p >= 0.5).astype(int)\n_b = (_p >= 0.3).astype(int)\nassert abs(prec_05 - _mt.precision_score(_yte, _a)) < 0.02 and abs(rec_05 - _mt.recall_score(_yte, _a)) < 0.02, 'prec_05, rec_05: threshold 0.5'\nassert abs(prec_03 - _mt.precision_score(_yte, _b)) < 0.02 and abs(rec_03 - _mt.recall_score(_yte, _b)) < 0.02, 'prec_03, rec_03: threshold 0.3'\nassert rec_03 > rec_05, 'When the threshold goes down, recall goes up'"
    }
   },
   {
    "title": "Specificity",
    "prompt": "<p>Specificity is the share of those who stay that are correctly identified as \"stays\": <code>tn / (tn + fp)</code>. From the predictions <code>clf.predict(X_test)</code>, find the matrix <code>cm</code>, extract <code>tn, fp, fn, tp</code> (<code>cm.ravel()</code>) and compute <code>spec</code>.</p>",
    "hints": [
     "<code>tn, fp, fn, tp = cm.ravel()</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\nfrom sklearn.metrics import confusion_matrix as _cm\n_tn, _fp, _fn, _tp = _cm(_yte, _m.predict(_Xte)).ravel()\nassert int(tn) + int(fp) == int((y_test == 0).sum()), 'tn + fp — the number of those who stay'\nassert abs(spec - _tn / (_tn + _fp)) < 0.02, f'spec ≈ {_tn / (_tn + _fp):.3f}: tn / (tn + fp)'\nassert spec > 0.8, 'This model has high specificity but low recall'"
    }
   },
   {
    "title": "Recall of 80% threshold",
    "prompt": "<p>The business wants to find at least 80% of the subscribers who leave. Among the thresholds <code>np.arange(0.05, 0.96, 0.05)</code> (<code>round(t, 2)</code>), find the <b>largest</b> threshold with a test recall ≥ 0.8: write it to <code>t80</code>, and the precision at that threshold to <code>prec80</code>.</p>",
    "hints": [
     "Check the thresholds in increasing order and keep the last one that meets the condition.",
     "<code>recall_score(y_test, (proba &gt;= t).astype(int))</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\nfrom sklearn import metrics as _mt\n_ok = [round(_t, 2) for _t in _np.arange(0.05, 0.96, 0.05) if _mt.recall_score(_yte, (_p >= round(_t, 2)).astype(int)) >= 0.8]\n_t8 = max(_ok)\nassert t80 is not None and abs(t80 - _t8) < 1e-9, f't80 must be {_t8}: the largest threshold with recall ≥ 0.8'\nassert abs(prec80 - _mt.precision_score(_yte, (_p >= _t8).astype(int))) < 0.02, 'prec80 — the precision at that threshold'"
    }
   },
   {
    "title": "AUC by pairs",
    "prompt": "<p>ROC AUC is the probability that a randomly chosen subscriber who leaves gets a higher score than a randomly chosen one who stays. Write a function <code>auc_pairs(y, scores)</code>: go through all the (leaver, stayer) pairs, add 1 if the leaver's score is higher, 0.5 if they are equal, and divide by the number of pairs. Then <code>auc_manual = auc_pairs(y_test, proba)</code>.</p><p>For example, <code>auc_pairs([0, 1, 0, 1], [0.1, 0.8, 0.4, 0.3])</code> → <code>0.75</code>.</p>",
    "hints": [
     "Split the scores into two groups: <code>pos = s[y == 1]</code>, <code>neg = s[y == 0]</code>.",
     "<code>(p &gt; neg).sum()</code> gives the number of wins for one leaver."
    ],
    "check": {
     "tests": "from sklearn.metrics import roc_auc_score as _ra\nassert auc_pairs([0, 1, 0, 1], [0.1, 0.8, 0.4, 0.3]) == 0.75, 'auc_pairs([0, 1, 0, 1], [0.1, 0.8, 0.4, 0.3]) must return 0.75'\nassert auc_pairs([0, 1], [0.5, 0.5]) == 0.5, 'Equal scores give 0.5'\nassert abs(auc_pairs([1, 0, 1, 0, 1], [0.9, 0.2, 0.4, 0.6, 0.6]) - _ra([1, 0, 1, 0, 1], [0.9, 0.2, 0.4, 0.6, 0.6])) < 1e-9, 'The result must match roc_auc_score'\nassert abs(auc_manual - _ra(y_test, proba)) < 1e-9, 'auc_manual = auc_pairs(y_test, proba)'"
    }
   }
  ]
 },
 "ml-9": {
  "pr": [
   {
    "title": "Gini function",
    "prompt": "<p>The function <code>gini(labels)</code> must return the Gini impurity: <code>1 − Σ pₖ²</code>, where <code>pₖ</code> is the share of each class.</p><p>For example, <code>gini([0, 0, 1, 1])</code> → <code>0.5</code>, <code>gini([1, 1, 1])</code> → <code>0.0</code>.</p>",
    "hints": [
     "<code>set(labels)</code> — the classes.",
     "<code>labels.count(c) / n</code> — the share of a class."
    ],
    "check": {
     "tests": "assert gini([0, 0, 1, 1]) is not None and abs(gini([0, 0, 1, 1]) - 0.5) < 1e-9, 'gini([0, 0, 1, 1]) must return 0.5'\nassert abs(gini([1, 1, 1])) < 1e-9, 'A pure group: gini = 0'\nassert abs(gini([0, 1, 1, 1]) - 0.375) < 1e-9, 'gini([0, 1, 1, 1]) = 1 − (0.25² + 0.75²) = 0.375'\nassert abs(gini(['a', 'b', 'c']) - 2 / 3) < 1e-9, 'It must work with three classes'"
    }
   },
   {
    "title": "A one-split tree",
    "prompt": "<p>Train <code>DecisionTreeClassifier(max_depth=1, random_state=0)</code> under the name <code>stump</code>. The test accuracy → <code>stump_acc</code>. Which feature did the tree split on: write the name of the feature with the largest value of <code>feature_importances_</code> to <code>root_feature</code>.</p>",
    "hints": [
     "<code>pd.Series(stump.feature_importances_, index=features).idxmax()</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\nfrom sklearn.tree import DecisionTreeClassifier as _DT\n_s = _DT(max_depth=1, random_state=0).fit(_Xtr, _ytr)\nassert isinstance(stump, DecisionTreeClassifier) and stump.get_depth() == 1, 'stump — a tree of depth 1'\nassert abs(stump_acc - _s.score(_Xte, _yte)) < 1e-9, f'stump_acc ≈ {_s.score(_Xte, _yte):.3f}'\nassert root_feature == _F[int(_np.argmax(_s.feature_importances_))], 'root_feature — the feature with the largest feature_importances_'"
    }
   },
   {
    "title": "Regression tree",
    "prompt": "<p>A tree can predict the price too. Train <code>DecisionTreeRegressor(max_depth=3, random_state=0)</code> under the name <code>reg</code> on the train part, using <code>area_m2</code>, <code>year_built</code> (split <code>test_size=0.2</code>, <code>random_state=42</code>). The test R² → <code>tree_r2</code>.</p>",
    "hints": [
     "<code>from sklearn.tree import DecisionTreeRegressor</code> is already imported.",
     "The API is the same: <code>fit</code>, <code>score</code>."
    ]
   },
   {
    "title": "Number of leaves",
    "prompt": "<p>As the depth grows, the tree becomes more complex. For <code>max_depth</code> ∈ [2, 4, 6, None] train a tree (<code>random_state=0</code>) and write the number of leaves (<code>get_n_leaves()</code>) into the dictionary <code>leaves</code>.</p>",
    "hints": [
     "Loop: <code>for d in [2, 4, 6, None]:</code>",
     "<code>t.get_n_leaves()</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\nfrom sklearn.tree import DecisionTreeClassifier as _DT\n_l = {_d: _DT(max_depth=_d, random_state=0).fit(_Xtr, _ytr).get_n_leaves() for _d in [2, 4, 6, None]}\nassert set(leaves) == {2, 4, 6, None}, 'The keys of leaves: 2, 4, 6, None'\nassert all(int(leaves[_d]) == int(_l[_d]) for _d in _l), f'Number of leaves: {_l}'\nassert leaves[2] <= 4 and leaves[None] > 50, 'A tree of depth 2 has at most 4 leaves, while an unrestricted tree has hundreds'"
    }
   },
   {
    "title": "Minimum samples in a leaf",
    "prompt": "<p>Another way to curb overfitting is <code>min_samples_leaf</code>. For the values [1, 5, 20, 50], train a tree (<code>random_state=0</code>, no depth limit) and write the pairs <code>(train_acc, test_acc)</code> into the dictionary <code>results</code>. Write the value with the highest test accuracy to <code>best_leaf</code>.</p>",
    "hints": [
     "<code>DecisionTreeClassifier(min_samples_leaf=m, random_state=0)</code>",
     "<code>max(results, key=lambda m: results[m][1])</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\nfrom sklearn.tree import DecisionTreeClassifier as _DT\n_r = {}\nfor _m in [1, 5, 20, 50]:\n    _t = _DT(min_samples_leaf=_m, random_state=0).fit(_Xtr, _ytr)\n    _r[_m] = (_t.score(_Xtr, _ytr), _t.score(_Xte, _yte))\nassert sorted(results) == [1, 5, 20, 50], 'The keys of results: 1, 5, 20, 50'\nassert all(abs(results[_m][0] - _r[_m][0]) < 1e-9 and abs(results[_m][1] - _r[_m][1]) < 1e-9 for _m in _r), 'Each value is (train_acc, test_acc)'\nassert best_leaf == max(_r, key=lambda _m: _r[_m][1]), 'best_leaf — the min_samples_leaf with the highest test accuracy'\nassert results[1][0] > results[50][0], 'As min_samples_leaf grows, the train accuracy goes down'"
    }
   },
   {
    "title": "Tree or logistic regression",
    "prompt": "<p>Compare two models on one split: <code>DecisionTreeClassifier(max_depth=3, random_state=0)</code> → <code>acc_tree</code>, <code>LogisticRegression(max_iter=1000)</code> → <code>acc_lr</code> (test accuracy). Write the name of the better one to <code>winner</code>: <code>'tree'</code> or <code>'logreg'</code> (on a tie, <code>'logreg'</code>).</p>",
    "hints": [
     "Both models: <code>.fit(X_train, y_train).score(X_test, y_test)</code>."
    ]
   },
   {
    "title": "Best split point",
    "prompt": "<p>Find one split of a tree by hand. The function <code>best_split(xs, ys)</code>: for each candidate threshold <code>t</code> (each unique value from <code>xs</code> except the largest one), split the data into the groups <code>x &lt;= t</code> and <code>x &gt; t</code>, and compute the weighted Gini: <code>(n_L·G_L + n_R·G_R) / n</code>. Return the <code>t</code> with the smallest Gini (on a tie, the smaller one).</p><p>For example, <code>best_split([1, 2, 3, 4], [0, 0, 1, 1])</code> → <code>2</code>.</p>",
    "hints": [
     "Candidates: <code>sorted(set(xs))[:-1]</code>",
     "Create the <code>ys</code> lists for the left and right groups and call <code>gini</code>."
    ],
    "check": {
     "tests": "assert best_split([1, 2, 3, 4], [0, 0, 1, 1]) == 2, 'best_split([1, 2, 3, 4], [0, 0, 1, 1]) must return 2'\nassert best_split([5, 1, 9, 3, 7], [1, 0, 1, 0, 1]) == 3, 'Unsorted xs: best_split([5, 1, 9, 3, 7], [1, 0, 1, 0, 1]) = 3'\nassert best_split([10, 20, 30, 40, 50, 60], [0, 0, 0, 1, 0, 1]) == 30, 'best_split([10, ..., 60], [0, 0, 0, 1, 0, 1]) = 30'\nassert best_split([1, 1, 2, 2], [0, 1, 0, 1]) == 1, 'The only candidate threshold is 1'"
    }
   },
   {
    "title": "Depth of a regression tree",
    "prompt": "<p>The split is ready (<code>area_m2</code>, <code>rooms</code>, <code>year_built</code>). For <code>max_depth</code> = 1, 2, …, 10 write the test R² of <code>DecisionTreeRegressor(random_state=0)</code> into <code>r2_by_depth</code>. Write the best value to <code>best_depth</code>. Write the difference between the train R² and the test R² for the unrestricted tree to <code>gap_none</code>.</p>",
    "hints": [
     "<code>for d in range(1, 11):</code>",
     "Unrestricted tree: <code>DecisionTreeRegressor(random_state=0)</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\nfrom sklearn.tree import DecisionTreeRegressor as _DR\n_a, _b, _c, _d = _tts(_f[['area_m2', 'rooms', 'year_built']], _f['price_mln'], test_size=0.2, random_state=42)\n_r = {_k: _DR(max_depth=_k, random_state=0).fit(_a, _c).score(_b, _d) for _k in range(1, 11)}\n_full = _DR(random_state=0).fit(_a, _c)\nassert sorted(r2_by_depth) == list(range(1, 11)), 'Keys: 1, 2, ..., 10'\nassert all(abs(r2_by_depth[_k] - _r[_k]) < 1e-9 for _k in _r), 'The test R² values are wrong'\nassert best_depth == max(_r, key=_r.get), f'best_depth = {max(_r, key=_r.get)} must be'\nassert abs(gap_none - (_full.score(_a, _c) - _full.score(_b, _d))) < 1e-9, 'gap_none = train R² − test R² (without max_depth)'\nassert gap_none > 0.1, 'The unrestricted tree memorizes the train set: the difference is large'"
    }
   }
  ]
 },
 "ml-10": {
  "pr": [
   {
    "title": "CV for regression",
    "prompt": "<p>Run <code>cross_val_score</code> for <code>LinearRegression</code> with <code>cv=5</code> on the whole <code>X</code> (<code>area_m2</code>, <code>rooms</code>, <code>year_built</code>) and <code>y</code> (<code>price_mln</code>). Write the result to <code>scores</code> and the mean to <code>cv_mean</code> (this is R²).</p>",
    "hints": [
     "<code>cross_val_score(LinearRegression(), X, y, cv=5)</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.model_selection import cross_val_score as _cvs\nfrom sklearn.linear_model import LinearRegression as _LinR\n_s = _cvs(_LinR(), X, y, cv=5)\nassert len(scores) == 5, 'cv=5: 5 scores'\nassert _np.allclose(scores, _s), 'The scores are wrong: cross_val_score(LinearRegression(), X, y, cv=5)'\nassert abs(cv_mean - _s.mean()) < 1e-9, 'cv_mean = scores.mean()'"
    }
   },
   {
    "title": "CV summary",
    "prompt": "<p>The function <code>summarize(scores)</code> must return the tuple <code>(орташа, SD)</code>, both rounded to 3 decimals (<code>np.std</code>, the population SD).</p><p>For example, <code>summarize([0.8, 0.7, 0.9])</code> → <code>(0.8, 0.082)</code>.</p>",
    "hints": [
     "<code>round(float(s.mean()), 3)</code>",
     "The tuple: <code>(a, b)</code>"
    ],
    "check": {
     "tests": "assert summarize([0.8, 0.7, 0.9]) == (0.8, 0.082), 'summarize([0.8, 0.7, 0.9]) must return (0.8, 0.082)'\nassert summarize([0.5, 0.5]) == (0.5, 0.0), 'Identical scores: SD = 0'\nassert summarize([0.61, 0.73, 0.68, 0.70, 0.66]) == (0.676, 0.04), 'summarize([0.61, 0.73, 0.68, 0.70, 0.66]) = (0.676, 0.04)'"
    }
   },
   {
    "title": "Fold sizes",
    "prompt": "<p>If you split <code>n</code> rows into <code>k</code> folds, what is the size of each fold? The function <code>fold_sizes(n, k)</code> must return a list: the first <code>n % k</code> folds get one extra row.</p><p>For example, <code>fold_sizes(10, 3)</code> → <code>[4, 3, 3]</code>.</p>",
    "hints": [
     "<code>divmod(n, k)</code> returns the quotient and the remainder."
    ],
    "check": {
     "tests": "assert fold_sizes(10, 3) == [4, 3, 3], 'fold_sizes(10, 3) must return [4, 3, 3]'\nassert fold_sizes(600, 5) == [120] * 5, 'fold_sizes(600, 5) = [120, 120, 120, 120, 120]'\nassert fold_sizes(7, 4) == [2, 2, 2, 1], 'fold_sizes(7, 4) = [2, 2, 2, 1]'\nassert sum(fold_sizes(403, 10)) == 403, 'The sum of the fold sizes must equal n'"
    }
   },
   {
    "title": "CV by MAE",
    "prompt": "<p>Compute the CV by MAE, not by R²: <code>scoring='neg_mean_absolute_error'</code> (sklearn flips the sign so that \"bigger is better\"). <code>LinearRegression</code>, <code>cv=5</code>. Write the mean of the positive MAE to <code>cv_mae</code>.</p>",
    "hints": [
     "<code>scoring='neg_mean_absolute_error'</code>",
     "<code>cv_mae = -scores.mean()</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import cross_val_score as _cvs\nfrom sklearn.linear_model import LinearRegression as _LinR\n_m = -_cvs(_LinR(), X, y, cv=5, scoring='neg_mean_absolute_error').mean()\nassert cv_mae > 0, 'cv_mae must be a positive number: remove the minus sign'\nassert abs(cv_mae - _m) < 1e-6, f'cv_mae ≈ {_m:.2f} million ₸'"
    }
   },
   {
    "title": "Choosing k for KNN",
    "prompt": "<p>For <code>make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=k))</code>, for the values <code>k</code> ∈ [1, 5, 15, 31], write the mean accuracy of 5-fold CV into the dictionary <code>cv_by_k</code>. Write the best value to <code>best_k</code>.</p>",
    "hints": [
     "The pipeline is created inside the loop.",
     "<code>cross_val_score(pipe, X, y, cv=5).mean()</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import cross_val_score as _cvs\nfrom sklearn.pipeline import make_pipeline as _mp\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.neighbors import KNeighborsClassifier as _KC\n_r = {_k: _cvs(_mp(_SS(), _KC(n_neighbors=_k)), X, y, cv=5).mean() for _k in [1, 5, 15, 31]}\nassert sorted(cv_by_k) == [1, 5, 15, 31], 'The keys of cv_by_k: 1, 5, 15, 31'\nassert all(abs(cv_by_k[_k] - _r[_k]) < 1e-9 for _k in _r), 'The CV means are wrong: the scaling must be inside the pipeline'\nassert best_k == max(_r, key=_r.get), f'best_k must be {max(_r, key=_r.get)}'\nassert cv_by_k[1] < cv_by_k[best_k], 'With k=1 the variance is high: it is worse than the best one'"
    }
   },
   {
    "title": "Train vs CV difference",
    "prompt": "<p>Look at bias and variance in numbers. For <code>max_depth</code> ∈ [2, 4, None] and <code>DecisionTreeClassifier(random_state=0)</code>: write into the dictionary <code>gaps</code> the difference between the train accuracy (trained on the whole X, y) and the mean accuracy of 5-fold CV.</p>",
    "hints": [
     "Train accuracy: <code>tree.fit(X, y).score(X, y)</code>",
     "CV: <code>cross_val_score(tree, X, y, cv=5).mean()</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import cross_val_score as _cvs\nfrom sklearn.tree import DecisionTreeClassifier as _DT\n_g = {_d: _DT(max_depth=_d, random_state=0).fit(X, y).score(X, y) - _cvs(_DT(max_depth=_d, random_state=0), X, y, cv=5).mean() for _d in [2, 4, None]}\nassert set(gaps) == {2, 4, None}, 'The keys of gaps: 2, 4, None'\nassert all(abs(gaps[_d] - _g[_d]) < 1e-9 for _d in _g), 'gap = train accuracy (on the whole X, y) − the CV mean'\nassert gaps[None] > gaps[2], 'The unrestricted tree has the largest difference (high variance)'"
    }
   },
   {
    "title": "Manual 5-fold CV",
    "prompt": "<p>Do the CV by hand. <code>idx = np.random.default_rng(0).permutation(len(flats))</code>, <code>folds = np.array_split(idx, 5)</code>. For each fold, train <code>LinearRegression</code> (<code>area_m2</code>, <code>rooms</code>, <code>year_built</code>) on the remaining rows and write the R² on that fold into the list <code>manual_scores</code>. The mean is <code>manual_mean</code>.</p>",
    "hints": [
     "Train indices: <code>np.concatenate([folds[j] for j in range(5) if j != i])</code>",
     "Selection by position: <code>X.iloc[train_idx]</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\n_fo = _np.array_split(_np.random.default_rng(0).permutation(400), 5)\n_s = []\nfor _i in range(5):\n    _tr = _np.concatenate([_fo[_j] for _j in range(5) if _j != _i])\n    _s.append(_LinR().fit(X.iloc[_tr], y.iloc[_tr]).score(X.iloc[_fo[_i]], y.iloc[_fo[_i]]))\nassert len(manual_scores) == 5, 'manual_scores must contain 5 values'\nassert _np.allclose(manual_scores, _s), 'The fold scores are wrong: fold i is the test set, the rest is the train set'\nassert abs(manual_mean - _np.mean(_s)) < 1e-9, 'manual_mean — the mean of the 5 scores'"
    }
   },
   {
    "title": "Comparing three models",
    "prompt": "<p>The one-hot <code>X</code> is ready. Write the mean 5-fold CV R² of three models into the dictionary <code>cv_r2</code>: <code>'linear'</code> — <code>LinearRegression()</code>; <code>'tree'</code> — <code>DecisionTreeRegressor(max_depth=5, random_state=0)</code>; <code>'knn'</code> — <code>make_pipeline(StandardScaler(), KNeighborsRegressor(n_neighbors=5))</code>. Write the name of the best model to <code>best_model</code>.</p>",
    "hints": [
     "Put the models into a dictionary and loop over it.",
     "<code>cross_val_score(m, X, y, cv=5).mean()</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import cross_val_score as _cvs\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.tree import DecisionTreeRegressor as _DR\nfrom sklearn.neighbors import KNeighborsRegressor as _KR\nfrom sklearn.pipeline import make_pipeline as _mp\nfrom sklearn.preprocessing import StandardScaler as _SS\n_r = {'linear': _cvs(_LinR(), X, y, cv=5).mean(), 'tree': _cvs(_DR(max_depth=5, random_state=0), X, y, cv=5).mean(), 'knn': _cvs(_mp(_SS(), _KR(n_neighbors=5)), X, y, cv=5).mean()}\nassert set(cv_r2) == {'linear', 'tree', 'knn'}, \"The keys of cv_r2: linear, tree, knn\"\nassert all(abs(cv_r2[_k] - _r[_k]) < 1e-6 for _k in _r), 'The CV R² values are wrong: cross_val_score(m, X, y, cv=5).mean()'\nassert best_model == max(_r, key=_r.get), f'best_model = {max(_r, key=_r.get)} must be'"
    }
   }
  ]
 }
} });
