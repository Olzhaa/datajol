// mlpractice practice tasks: English text. Code, solutions and checks are in content/practice/mlpractice.js.
DJ.i18n.patch({ lessons: {
 "mp-1": {
  "pr": [
   {
    "title": "Fill with the median",
    "prompt": "<p><code>age</code> and <code>data_gb</code> have empty values. Fit <code>SimpleImputer(strategy='median')</code>, named <code>imp</code>, on <code>df[['age', 'data_gb']]</code> and write the filled array to <code>filled</code> (<code>fit_transform</code>).</p>",
    "hints": [
     "<code>imp.fit_transform(df[['age', 'data_gb']])</code>",
     "<code>imp.statistics_</code> — the median of each column."
    ],
    "check": {
     "tests": "import numpy as _np\nassert _np.asarray(filled).shape == (600, 2), 'The shape of filled must be (600, 2)'\nassert not _np.isnan(_np.asarray(filled, dtype=float)).any(), 'No NaN may remain in filled'\nassert _np.allclose(imp.statistics_, [df['age'].median(), df['data_gb'].median()]), \"imp must fill with the median: strategy='median'\""
    }
   },
   {
    "title": "Scaling and regression",
    "prompt": "<p>Train <code>make_pipeline(StandardScaler(), LinearRegression())</code>, named <code>pipe</code>, on the train set and write its test R² to <code>pipe_r2</code>. Write the test R² of a <code>LinearRegression</code> without scaling to <code>plain_r2</code>. Does scaling affect linear regression?</p>",
    "hints": [
     "<code>make_pipeline(StandardScaler(), LinearRegression()).fit(X_train, y_train)</code>"
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _P\nfrom sklearn.linear_model import LinearRegression as _LinR\n_r = _LinR().fit(X_train, y_train).score(X_test, y_test)\nassert isinstance(pipe, _P) and hasattr(pipe[-1], 'coef_'), 'pipe — a trained Pipeline (make_pipeline)'\nassert abs(plain_r2 - _r) < 1e-9, f'plain_r2 must be ≈ {_r:.4f}'\nassert abs(pipe_r2 - _r) < 1e-9, 'For linear regression scaling does not change R²: pipe_r2 = plain_r2'"
    }
   },
   {
    "title": "City column names",
    "prompt": "<p>Fit <code>OneHotEncoder(handle_unknown='ignore')</code>, named <code>ohe</code>, on <code>df[['city']]</code>. Write the names of the resulting columns, taken with <code>get_feature_names_out()</code>, to the list <code>names</code>.</p>",
    "hints": [
     "<code>ohe.get_feature_names_out()</code> returns an array: <code>list(...)</code>"
    ],
    "check": {
     "tests": "assert len(names) == 5, 'names must contain 5 city columns'\nassert all(str(_n).startswith('city_') for _n in names), 'The names start with city_'\nassert set(names) == {'city_' + _c for _c in df['city'].unique()}, 'One column for each city'"
    }
   },
   {
    "title": "ColumnTransformer for flats",
    "prompt": "<p>Create <code>pre_f</code> for the flats: apply <code>StandardScaler</code> to the <code>fnum</code> columns and <code>OneHotEncoder(handle_unknown='ignore')</code> to <code>district</code>. <code>Xt = pre_f.fit_transform(X)</code>.</p>",
    "hints": [
     "<code>ColumnTransformer([('num', StandardScaler(), fnum), ('cat', OneHotEncoder(...), ['district'])])</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.compose import ColumnTransformer as _CT\nassert isinstance(pre_f, _CT), 'pre_f — a ColumnTransformer'\n_A = _np.asarray(Xt.toarray() if hasattr(Xt, 'toarray') else Xt, dtype=float)\nassert _A.shape == (400, 11), f'The shape of Xt must be (400, 11): 5 numeric + 6 districts. You have {_A.shape}'\nassert _np.allclose(_A[:, :5].mean(axis=0), 0, atol=1e-6), 'The first 5 columns must be scaled'\nassert _np.allclose(_A[:, 5:].sum(axis=1), 1), 'The last 6 columns are the one-hot codes of the districts'"
    }
   },
   {
    "title": "An unknown city",
    "prompt": "<p><code>ohe</code> is trained on the cities of churn. The new data contains Taraz (it did not exist before) and Almaty. Transform <code>new</code> and write the sum of each row to the list <code>row_sums</code>. The Taraz row must consist only of zeros.</p>",
    "hints": [
     "<code>ohe.transform(new)</code> returns a sparse matrix: <code>.toarray()</code>",
     "<code>T.sum(axis=1)</code>"
    ],
    "check": {
     "tests": "assert list(row_sums) == [0, 1], 'row_sums = [0, 1]: Taraz — zeros, Almaty — one unit'"
    }
   },
   {
    "title": "Look inside a Pipeline",
    "prompt": "<p>Create a Pipeline <code>model</code> (steps <code>'pre'</code> and <code>'clf'</code>) and train it on the train set. Using <code>named_steps</code>: write the number of features to <code>n_coef</code> (<code>coef_.shape[1]</code>), the feature names to <code>names</code> (<code>get_feature_names_out()</code>), and the feature with the largest coefficient to <code>top_pos</code>.</p>",
    "hints": [
     "<code>model.named_steps['clf'].coef_</code>",
     "<code>pd.Series(coef_[0], index=names).idxmax()</code>"
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import OneHotEncoder as _OH, StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre():\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), cat)])\nimport pandas as _pd\n_m = _Pl([('pre', _pre()), ('clf', _LR(max_iter=1000))]).fit(X_train, y_train)\n_c = _pd.Series(_m.named_steps['clf'].coef_[0], index=_m.named_steps['pre'].get_feature_names_out())\nassert 'clf' in model.named_steps and 'pre' in model.named_steps, \"The step names: 'pre' and 'clf'\"\nassert n_coef == 14, 'n_coef must be 14: 6 numeric + 5 cities + 3 plans'\nassert list(names) == list(_c.index), 'names — get_feature_names_out() of pre'\nassert top_pos == _c.idxmax(), f'top_pos must be {_c.idxmax()}'"
    }
   },
   {
    "title": "Full Pipeline for flats",
    "prompt": "<p>The split and <code>pre_f</code> are ready. Train a Pipeline of <code>pre_f</code> and <code>LinearRegression</code>, named <code>model</code>, on the train set. On the test set compute <code>test_r2</code> and <code>test_mae</code> (<code>mean_absolute_error</code>).</p>",
    "hints": [
     "<code>Pipeline([('pre', pre_f), ('model', LinearRegression())])</code>",
     "The Pipeline takes the raw X_train (with the text district)."
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _P\nfrom sklearn.linear_model import LinearRegression as _LinR\nimport numpy as _np\nassert isinstance(model, _P) and isinstance(model.steps[-1][1], _LinR), 'model — a Pipeline whose last step is LinearRegression'\nassert abs(test_r2 - model.score(X_test, y_test)) < 1e-9, 'test_r2 = model.score(X_test, y_test)'\nassert abs(test_mae - _np.mean(_np.abs(y_test - model.predict(X_test)))) < 1e-9, 'test_mae — the MAE on the test set'\nassert test_r2 > 0.9, f'With district added, R² should be above 0.9, yours is {test_r2:.3f}'"
    }
   },
   {
    "title": "Filling strategy",
    "prompt": "<p>Compare the <code>SimpleImputer</code> strategies for the numeric part: <code>'mean'</code>, <code>'median'</code>, <code>'most_frequent'</code>. For each one build a full Pipeline (imputer → StandardScaler, cat → OneHotEncoder, then <code>LogisticRegression(max_iter=1000)</code>), compute the mean 3-fold ROC AUC on the whole X, y and write it to <code>auc_by_strategy</code>. Write the best strategy to <code>best_strategy</code>.</p>",
    "hints": [
     "Inside the loop create a new <code>pre</code> for each strategy.",
     "<code>cross_val_score(m, X, y, cv=3, scoring='roc_auc').mean()</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import cross_val_score as _cvs\nfrom sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import OneHotEncoder as _OH, StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre():\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), cat)])\n_rm = _cvs(_Pl([('pre', _pre()), ('model', _LR(max_iter=1000))]), X, y, cv=3, scoring='roc_auc').mean()\nassert set(auc_by_strategy) == {'mean', 'median', 'most_frequent'}, \"Keys: 'mean', 'median', 'most_frequent'\"\nassert abs(auc_by_strategy['median'] - _rm) < 1e-6, f\"The AUC for median must be ≈ {_rm:.4f}: cv=3, scoring='roc_auc', on the whole X, y\"\nassert all(0.75 < _v < 0.9 for _v in auc_by_strategy.values()), 'The AUC values should be between 0.75 and 0.9'\nassert len(set(round(_v, 6) for _v in auc_by_strategy.values())) == 3, 'Create a new imputer for each strategy: the results should differ'\nassert best_strategy == max(auc_by_strategy, key=auc_by_strategy.get), 'best_strategy — the strategy with the highest AUC'"
    }
   }
  ]
 },
 "mp-2": {
  "pr": [
   {
    "title": "What the scaler sees",
    "prompt": "<p>The split is ready. Fit <code>StandardScaler</code>, named <code>scaler</code>, only on <code>X_train</code>. Write the mean of <code>area_m2</code> over all the data to <code>mean_all</code> and the mean over the train set to <code>mean_train</code>. Write the mean that the scaler remembered (<code>scaler.mean_[0]</code>) to <code>scaler_mean</code>.</p>",
    "hints": [
     "<code>scaler = StandardScaler().fit(X_train)</code>",
     "<code>scaler.mean_</code> — the mean of each column."
    ],
    "check": {
     "tests": "assert abs(mean_all - X['area_m2'].mean()) < 1e-9, \"mean_all = X['area_m2'].mean()\"\nassert abs(mean_train - X_train['area_m2'].mean()) < 1e-9, \"mean_train = X_train['area_m2'].mean()\"\nassert abs(scaler_mean - X_train['area_m2'].mean()) < 1e-9, 'The scaler must be fitted only on X_train: scaler_mean = mean_train'\nassert abs(mean_all - mean_train) > 1e-6, 'The mean over all the data and over the train set are different'"
    }
   },
   {
    "title": "Find the ID column",
    "prompt": "<p>ID columns are harmful for a model: they can accidentally correlate with the target. The function <code>id_like(df)</code> must return the list of columns where every value is unique (the number of unique values equals the number of rows).</p><p>For example, for churn → <code>['customer_id']</code>.</p>",
    "hints": [
     "<code>data[c].nunique() == len(data)</code>"
    ],
    "check": {
     "tests": "assert id_like(df) == ['customer_id'], \"id_like(df) must return ['customer_id']\"\n_t = pd.DataFrame({'code': ['A1', 'A2', 'A3'], 'city': ['Алматы', 'Алматы', 'Астана'], 'n': [1, 2, 3]})\nassert id_like(_t) == ['code', 'n'], \"In the small table: ['code', 'n']\"\nassert id_like(pd.read_csv('flats.csv')) == ['flat_id'], \"For flats: ['flat_id']\""
    }
   },
   {
    "title": "No shared rows",
    "prompt": "<p>The split is ready. Write the number of shared indices of train and test to <code>overlap</code>, and the total number of rows in both parts to <code>n_total</code>.</p>",
    "hints": [
     "Set intersection: <code>set(a) &amp; set(b)</code>"
    ],
    "check": {
     "tests": "assert overlap == 0, 'overlap = 0: no row may be in both train and test'\nassert n_total == 600, 'n_total = 600: no row is lost'"
    }
   },
   {
    "title": "A feature built from the price",
    "prompt": "<p><code>price_per_m2 = price_mln / area_m2</code> is built from the target — this is target leakage. Compare two models (split <code>test_size=0.2</code>, <code>random_state=42</code>): <code>area_m2</code> + <code>price_per_m2</code> → test R² <code>leak_r2</code>; only <code>area_m2</code> → <code>clean_r2</code>.</p>",
    "hints": [
     "On one split, two models: the second one uses only <code>X_train[['area_m2']]</code>."
    ],
    "check": {
     "tests": "from sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LinearRegression as _LinR\n_a, _b, _c, _d = _tts(flats[['area_m2', 'price_per_m2']], flats['price_mln'], test_size=0.2, random_state=42)\nassert abs(leak_r2 - _LinR().fit(_a, _c).score(_b, _d)) < 1e-6, 'leak_r2: with the features area_m2 + price_per_m2'\nassert abs(clean_r2 - _LinR().fit(_a[['area_m2']], _c).score(_b[['area_m2']], _d)) < 1e-6, 'clean_r2: only area_m2'\nassert leak_r2 > 0.9 and leak_r2 - clean_r2 > 0.3, 'The leak artificially raises R²'"
    }
   },
   {
    "title": "Encoding the city using train",
    "prompt": "<p>Replacing the city with its churn rate (target encoding) is useful, but the rate must be computed <b>from train only</b>. <code>city_rate</code> is the churn rate of each city in train (a Series). <code>te_rate</code> is the rate matching the city of each test subscriber (<code>X_test['city'].map(city_rate)</code>).</p>",
    "hints": [
     "<code>y_train.groupby(X_train['city']).mean()</code>",
     "<code>Series.map(...)</code> replaces values using a dictionary or a Series."
    ],
    "check": {
     "tests": "_cr = y_train.groupby(X_train['city']).mean()\nassert isinstance(city_rate, pd.Series) and len(city_rate) == 5, 'city_rate — a Series with 5 cities'\nassert all(abs(city_rate[_c] - _cr[_c]) < 1e-9 for _c in _cr.index), 'city_rate must be computed only from the train data (y_train, X_train)'\nassert len(te_rate) == 150 and all(abs(te_rate.values - X_test['city'].map(_cr).values) < 1e-9), \"te_rate = X_test['city'].map(city_rate)\""
    }
   },
   {
    "title": "Duplicate flats",
    "prompt": "<p>If the data has duplicate rows, one flat can be in both train and test. Split <code>flats2</code> with <code>test_size=0.25</code>, <code>random_state=0</code> into <code>train2</code> and <code>test2</code>. Write to <code>n_leak</code> the number of rows in test whose <code>flat_id</code> also appears in train.</p>",
    "hints": [
     "<code>train_test_split(flats2, test_size=0.25, random_state=0)</code> returns two tables.",
     "<code>test2['flat_id'].isin(train2['flat_id']).sum()</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import train_test_split as _tts\n_a, _b = _tts(flats2, test_size=0.25, random_state=0)\n_n = int(_b['flat_id'].isin(_a['flat_id']).sum())\nassert len(test2) == 125, 'test2 must have 125 rows'\nassert int(n_leak) == _n, f'n_leak must be {_n}: the rows of test2 whose flat_id is in train2'\nassert n_leak > 0, 'Duplicates cause leakage'"
    }
   },
   {
    "title": "Regression on noise features",
    "prompt": "<p>The target and 1000 features are all random noise. <code>leaky_r2</code>: on all the data select <code>SelectKBest(f_regression, k=10)</code>, then take the mean 5-fold CV R² of <code>LinearRegression</code>. <code>honest_r2</code>: put this selection inside <code>make_pipeline</code> and run 5-fold CV on the original X.</p>",
    "hints": [
     "Leaky: <code>Xs = SelectKBest(f_regression, k=10).fit_transform(X, y)</code>",
     "Honest: <code>make_pipeline(SelectKBest(f_regression, k=10), LinearRegression())</code>"
    ],
    "check": {
     "tests": "assert leaky_r2 is not None and honest_r2 is not None, 'Compute leaky_r2 and honest_r2'\nassert leaky_r2 > 0.1, f'The leaky R² is artificially positive (≈0.2), yours is {leaky_r2:.2f}. Was SelectKBest fitted on the whole X, y?'\nassert honest_r2 < 0, f'The honest R² must be below zero: noise predicts nothing. Yours is {honest_r2:.2f}'\nassert leaky_r2 - honest_r2 > 0.5, 'The difference between them should be large'"
    }
   },
   {
    "title": "Find the broken column",
    "prompt": "<p>The data has <code>days_since_cancel</code> (filled only for those who left). Check how well each numeric feature <b>predicts on its own</b>: <code>roc_auc_score(y, df[c].fillna(df[c].median()))</code>. Write the values of <code>|AUC − 0.5|</code> to the Series <code>strength</code>, and the strongest one to <code>leak_col</code>. Then build <code>X_clean</code> without that column.</p>",
    "hints": [
     "A dictionary comprehension: <code>{c: ... for c in nums}</code>, then <code>pd.Series(...)</code>.",
     "<code>strength.idxmax()</code>"
    ],
    "check": {
     "tests": "from sklearn.metrics import roc_auc_score as _ra\n_s = {_c: abs(_ra(y, df[_c].fillna(df[_c].median())) - 0.5) for _c in nums}\nassert isinstance(strength, pd.Series) and set(strength.index) == set(nums), 'strength — a Series over nums'\nassert all(abs(strength[_c] - _s[_c]) < 1e-9 for _c in nums), 'The values of |AUC − 0.5| are wrong: fill the empty values with the median'\nassert leak_col == 'days_since_cancel', 'The strongest feature is days_since_cancel: it appears after the result'\nassert list(X_clean.columns) == [_c for _c in nums if _c != 'days_since_cancel'], 'X_clean keeps 6 features'"
    }
   }
  ]
 },
 "mp-3": {
  "pr": [
   {
    "title": "Area per room",
    "prompt": "<p>The function <code>per_room(area, rooms)</code> must return the area per room, rounded to 1 decimal place. If <code>rooms</code> is 0 (a studio), it must return the area itself.</p><p>For example, <code>per_room(65, 2)</code> → <code>32.5</code>.</p>",
    "hints": [
     "First check the case <code>rooms == 0</code>.",
     "<code>round(area / rooms, 1)</code>"
    ],
    "check": {
     "tests": "assert per_room(65, 2) == 32.5, 'per_room(65, 2) must return 32.5'\nassert per_room(30, 0) == 30, 'Studio: per_room(30, 0) = 30'\nassert per_room(100, 3) == 33.3, 'per_room(100, 3) = 33.3 (round(..., 1))'"
    }
   },
   {
    "title": "Oldest district",
    "prompt": "<p>Add the column <code>flats['age'] = 2024 - flats['year_built']</code>. Write the mean age by district to <code>age_by_district</code>, and the district with the oldest houses to <code>oldest_district</code>.</p>",
    "hints": [
     "<code>flats.groupby('district')['age'].mean()</code>",
     "<code>.idxmax()</code>"
    ]
   },
   {
    "title": "First floor feature",
    "prompt": "<p>Add the column <code>flats['is_first']</code>: 1 if <code>floor == 1</code>, otherwise 0 (int). Write the mean price of the flats on the first floor to <code>first_price</code>, and the mean price of the others to <code>other_price</code>.</p>",
    "hints": [
     "<code>(flats['floor'] == 1).astype(int)</code>",
     "<code>flats.loc[шарт, 'price_mln'].mean()</code>"
    ],
    "check": {
     "tests": "_f = pd.read_csv('flats.csv')\nassert 'is_first' in flats.columns and set(flats['is_first'].unique()) <= {0, 1}, 'is_first — a column of 0/1'\nassert int(flats['is_first'].sum()) == int((_f['floor'] == 1).sum()), 'is_first: 1 if floor == 1'\nassert abs(first_price - _f.loc[_f['floor'] == 1, 'price_mln'].mean()) < 1e-9, 'first_price — the mean price of the first-floor flats'\nassert abs(other_price - _f.loc[_f['floor'] != 1, 'price_mln'].mean()) < 1e-9, 'other_price — the mean price of the other flats'"
    }
   },
   {
    "title": "Price of a gigabyte",
    "prompt": "<p>In churn add the column <code>fee_per_gb = monthly_fee / data_gb</code> (it stays NaN where <code>data_gb</code> is empty). Write its median by plan to <code>fee_gb_by_plan</code>. Write the plan with the highest price per 1 GB to <code>priciest_plan</code>.</p>",
    "hints": [
     "<code>df['monthly_fee'] / df['data_gb']</code>",
     "<code>df.groupby('plan')['fee_per_gb'].median()</code>"
    ],
    "check": {
     "tests": "_d = pd.read_csv('churn.csv')\n_g = (_d['monthly_fee'] / _d['data_gb']).groupby(_d['plan']).median()\nassert 'fee_per_gb' in df.columns, 'Add the column fee_per_gb to df'\nassert set(fee_gb_by_plan.index) == {'basic', 'standard', 'premium'} and all(abs(fee_gb_by_plan[_p] - _g[_p]) < 1e-9 for _p in _g.index), 'fee_gb_by_plan — the median by plan'\nassert priciest_plan == _g.idxmax(), f'priciest_plan must be {_g.idxmax()}'"
    }
   },
   {
    "title": "Usefulness of new features",
    "prompt": "<p>Create three new features: <code>area_per_room</code>, <code>floor_ratio</code> (<code>floor / floors_total</code>), <code>is_last</code> (the top floor: 1/0). Split with <code>test_size=0.2</code>, <code>random_state=42</code>. Test R² with the features <code>base</code> → <code>r2_base</code>; <code>base</code> + the three new features → <code>r2_new</code>.</p>",
    "hints": [
     "Add the columns to <code>flats</code> first, then split.",
     "<code>train_test_split(flats, test_size=0.2, random_state=42)</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LinearRegression as _LinR\n_f = pd.read_csv('flats.csv')\n_f['area_per_room'] = _f['area_m2'] / _f['rooms']\n_f['floor_ratio'] = _f['floor'] / _f['floors_total']\n_f['is_last'] = (_f['floor'] == _f['floors_total']).astype(int)\n_n = base + ['area_per_room', 'floor_ratio', 'is_last']\n_a, _b = _tts(_f, test_size=0.2, random_state=42)\nassert abs(r2_base - _LinR().fit(_a[base], _a['price_mln']).score(_b[base], _b['price_mln'])) < 1e-6, 'r2_base is wrong: test_size=0.2, random_state=42'\nassert abs(r2_new - _LinR().fit(_a[_n], _a['price_mln']).score(_b[_n], _b['price_mln'])) < 1e-6, 'r2_new is wrong: check the three new features'\nassert r2_new > r2_base, 'The new features should raise R² a little'"
    }
   },
   {
    "title": "Log target",
    "prompt": "<p>The prices are skewed to the right. Train the model on <code>np.log(y)</code> and convert the predictions back with <code>np.exp</code>. The one-hot <code>X</code> is ready. Split with <code>test_size=0.2</code>, <code>random_state=42</code>. The test MAE of the ordinary model → <code>mae_raw</code>, of the log model → <code>mae_log</code> (both in million ₸).</p>",
    "hints": [
     "<code>LinearRegression().fit(X_train, np.log(y_train))</code>",
     "Prediction: <code>np.exp(logm.predict(X_test))</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\n_r = _np.mean(_np.abs(_LinR().fit(X_train, y_train).predict(X_test) - y_test))\n_l = _np.mean(_np.abs(_np.exp(_LinR().fit(X_train, _np.log(y_train)).predict(X_test)) - y_test))\nassert abs(mae_raw - _r) < 1e-6, f'mae_raw must be ≈ {_r:.2f}'\nassert abs(mae_log - _l) < 1e-6, f'mae_log must be ≈ {_l:.2f}: train on np.log(y_train), convert np.exp(predict) back to million ₸'\nassert mae_log < mae_raw, 'The log target reduces the error on this data'"
    }
   },
   {
    "title": "Risk features",
    "prompt": "<p>Add two binary features: <code>many_calls</code> (<code>support_calls &gt;= 3</code>) and <code>new_customer</code> (<code>tenure_months &lt;= 6</code>), type int. Pipeline: <code>SimpleImputer(strategy='median')</code> → <code>StandardScaler</code> → <code>LogisticRegression(max_iter=1000)</code>. 5-fold ROC AUC on all the data: with the <code>base</code> columns → <code>auc_base</code>, plus the two new features → <code>auc_new</code>.</p>",
    "hints": [
     "A function for the repeated part: <code>def cv_auc(cols): ...</code>",
     "<code>cross_val_score(m, df[cols], y, cv=5, scoring='roc_auc')</code>"
    ],
    "check": {
     "tests": "from sklearn.pipeline import make_pipeline as _mp\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\nfrom sklearn.model_selection import cross_val_score as _cvs\n_d = pd.read_csv('churn.csv')\n_d['many_calls'] = (_d['support_calls'] >= 3).astype(int)\n_d['new_customer'] = (_d['tenure_months'] <= 6).astype(int)\n_cv = lambda _c: _cvs(_mp(_SI(strategy='median'), _SS(), _LR(max_iter=1000)), _d[_c], _d['churned'], cv=5, scoring='roc_auc').mean()\nassert 'many_calls' in df.columns and int(df['many_calls'].sum()) == int(_d['many_calls'].sum()), 'many_calls: support_calls >= 3'\nassert 'new_customer' in df.columns and int(df['new_customer'].sum()) == int(_d['new_customer'].sum()), 'new_customer: tenure_months <= 6'\nassert abs(auc_base - _cv(base)) < 1e-6, f'auc_base must be ≈ {_cv(base):.4f}'\nassert abs(auc_new - _cv(base + ['many_calls', 'new_customer'])) < 1e-6, 'auc_new is wrong: base + many_calls + new_customer'"
    }
   },
   {
    "title": "Price per square metre by district",
    "prompt": "<p>A district-level feature: on the train set, compute the mean price of one square metre (<code>price_mln / area_m2</code>) for each district → the Series <code>ppm</code>. Then add the column <code>est = area_m2 * district бойынша ppm</code> to train and test, and train <code>LinearRegression</code> on the features <code>area_m2</code>, <code>year_built</code>, <code>est</code>. Test R² → <code>r2_est</code>. Take the price from the train set only!</p>",
    "hints": [
     "<code>(tr['price_mln'] / tr['area_m2']).groupby(tr['district']).mean()</code>",
     "<code>te['district'].map(ppm)</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LinearRegression as _LinR\n_a, _b = _tts(pd.read_csv('flats.csv'), test_size=0.2, random_state=42)\n_a = _a.copy(); _b = _b.copy()\n_p = (_a['price_mln'] / _a['area_m2']).groupby(_a['district']).mean()\n_a['est'] = _a['area_m2'] * _a['district'].map(_p)\n_b['est'] = _b['area_m2'] * _b['district'].map(_p)\n_r = _LinR().fit(_a[['area_m2', 'year_built', 'est']], _a['price_mln']).score(_b[['area_m2', 'year_built', 'est']], _b['price_mln'])\nassert isinstance(ppm, pd.Series) and len(ppm) == 6 and all(abs(ppm[_k] - _p[_k]) < 1e-9 for _k in _p.index), 'ppm must be computed only from the train set (tr)'\nassert 'est' in te.columns and 'est' in tr.columns, \"Add the est column to tr and te\"\nassert abs(te['est'] - _b['est']).max() < 1e-9, \"te['est'] = te['area_m2'] * te['district'].map(ppm)\"\nassert abs(r2_est - _r) < 1e-6, f'r2_est must be ≈ {_r:.3f}'\nassert r2_est > 0.85, 'The district price feature clearly raises R²'"
    }
   }
  ]
 },
 "mp-4": {
  "pr": [
   {
    "title": "Grid size",
    "prompt": "<p>The function <code>grid_size(grid)</code> must return the number of combinations in a parameter grid: the product of the number of values of each parameter.</p><p>For example, <code>grid_size({'C': [0.1, 1, 10], 'penalty': ['l2']})</code> → <code>3</code>.</p>",
    "hints": [
     "<code>for values in grid.values():</code>",
     "Start with 1, and on each step <code>n *= len(values)</code>."
    ],
    "check": {
     "tests": "assert grid_size({'C': [0.1, 1, 10], 'penalty': ['l2']}) == 3, \"grid_size({'C': [0.1, 1, 10], 'penalty': ['l2']}) must return 3\"\nassert grid_size({'max_depth': [2, 3, 5], 'min_samples_leaf': [1, 10, 30]}) == 9, '3 × 3 = 9'\nassert grid_size({'a': [1, 2], 'b': [1, 2], 'c': [1, 2, 3, 4]}) == 16, '2 × 2 × 4 = 16'\nassert grid_size({}) == 1, 'An empty grid: just one (default) combination'"
    }
   },
   {
    "title": "Search the tree depth",
    "prompt": "<p>Train <code>GridSearchCV(DecisionTreeRegressor(random_state=0), {'max_depth': [2, 4, 6, 8]}, cv=5)</code>, named <code>grid</code>, on the numeric features of the flats (all X, y). Write the best depth to <code>best_depth</code>, and its CV R² to <code>best_r2</code>.</p>",
    "hints": [
     "The parameter name without a Pipeline: <code>'max_depth'</code>.",
     "<code>grid.best_params_['max_depth']</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import GridSearchCV as _G\nimport numpy as _np\nassert isinstance(grid, _G) and hasattr(grid, 'best_params_'), 'grid — a trained GridSearchCV'\nassert len(grid.cv_results_['params']) == 4, 'The grid has 4 values of max_depth'\n_i = int(_np.argmax(grid.cv_results_['mean_test_score']))\nassert best_depth == grid.cv_results_['params'][_i]['max_depth'], \"best_depth = grid.best_params_['max_depth']\"\nassert abs(best_r2 - grid.best_score_) < 1e-12, 'best_r2 = grid.best_score_'"
    }
   },
   {
    "title": "Search the number of neighbours",
    "prompt": "<p>Pipeline: <code>('sc', StandardScaler())</code> → <code>('knn', KNeighborsClassifier())</code>. Build a <code>GridSearchCV</code> (<code>cv=5</code>) over <code>knn__n_neighbors</code> ∈ [5, 15, 25], train it on <code>X4</code>, <code>y</code> and name it <code>grid</code>. Write <code>best_k</code> and <code>best_cv</code> (the best CV accuracy).</p>",
    "hints": [
     "The parameter name: <code>'қадам__параметр'</code>, that is <code>'knn__n_neighbors'</code>."
    ],
    "check": {
     "tests": "from sklearn.model_selection import GridSearchCV as _G\nassert isinstance(grid, _G) and hasattr(grid, 'best_score_'), 'grid — a trained GridSearchCV'\nassert sorted(_p['knn__n_neighbors'] for _p in grid.cv_results_['params']) == [5, 15, 25], \"The grid: {'knn__n_neighbors': [5, 15, 25]} (the step name 'knn')\"\nassert best_k == grid.best_params_['knn__n_neighbors'] and abs(best_cv - grid.best_score_) < 1e-12, 'best_k and best_cv — the best result of grid'\nassert 0.7 < best_cv < 0.85, f'CV accuracy must be ≈ 0.78, yours is {best_cv:.3f}'"
    }
   },
   {
    "title": "A grid with two parameters",
    "prompt": "<p>A grid for <code>DecisionTreeClassifier(random_state=0)</code>: <code>max_depth</code> ∈ [2, 3, 5], <code>min_samples_leaf</code> ∈ [1, 10, 30]; <code>cv=5</code>, <code>scoring='roc_auc'</code>. Train <code>grid</code> on <code>X4</code>, <code>y</code>, write the number of combinations to <code>n_combos</code> and the best parameters to <code>best_params</code>.</p>",
    "hints": [
     "A grid dictionary with two keys: <code>{'max_depth': [...], 'min_samples_leaf': [...]}</code>",
     "<code>len(grid.cv_results_['params'])</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import GridSearchCV as _G\nassert isinstance(grid, _G) and hasattr(grid, 'best_params_'), 'grid — a trained GridSearchCV'\nassert grid.scoring == 'roc_auc', \"Set scoring='roc_auc'\"\nassert n_combos == 9, 'n_combos = 3 × 3 = 9'\nassert best_params == grid.best_params_ and set(best_params) == {'max_depth', 'min_samples_leaf'}, 'best_params = grid.best_params_'\nassert 0.75 < grid.best_score_ < 0.9, 'The best CV AUC must be ≈ 0.8'"
    }
   },
   {
    "title": "Results table",
    "prompt": "<p>The grid <code>grid</code> is trained. Build a DataFrame <code>table</code> from <code>grid.cv_results_</code>: the columns <code>max_depth</code>, <code>min_samples_leaf</code>, <code>mean_test_score</code>, sorted by <code>mean_test_score</code> in descending order. The score of the first row must equal <code>best_score_</code>.</p>",
    "hints": [
     "<code>grid.cv_results_['param_max_depth']</code>, <code>['mean_test_score']</code>",
     "<code>sort_values('mean_test_score', ascending=False)</code>"
    ],
    "check": {
     "tests": "assert isinstance(table, pd.DataFrame) and len(table) == 9, 'table — a DataFrame with 9 rows'\nassert {'max_depth', 'min_samples_leaf', 'mean_test_score'} <= set(table.columns), 'Columns: max_depth, min_samples_leaf, mean_test_score'\nassert list(table['mean_test_score']) == sorted(table['mean_test_score'], reverse=True), 'Sort by mean_test_score in descending order'\nassert abs(table['mean_test_score'].iloc[0] - grid.best_score_) < 1e-12, 'The first row is the best combination'\nassert int(table['max_depth'].iloc[0]) == grid.best_params_['max_depth'], 'The max_depth of the first row must match best_params_'"
    }
   },
   {
    "title": "Grid by hand",
    "prompt": "<p>Repeat by hand what GridSearchCV does. For <code>C</code> ∈ [0.01, 0.1, 1, 10] write the mean 5-fold ROC AUC on <code>X_train</code> of a Pipeline made of <code>pre</code> and <code>LogisticRegression(C=C, max_iter=1000)</code> into the dictionary <code>manual</code>. Write the best value to <code>best_C</code>.</p>",
    "hints": [
     "Loop: <code>for C in [0.01, 0.1, 1, 10]:</code>",
     "For each C create a new Pipeline."
    ],
    "check": {
     "tests": "assert sorted(manual) == [0.01, 0.1, 1, 10], 'The keys of manual: 0.01, 0.1, 1, 10'\nassert all(0.7 < _v < 0.9 for _v in manual.values()), \"AUC values ≈ 0.7–0.9: scoring='roc_auc', on X_train\"\nfrom sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import OneHotEncoder as _OH, StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre():\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), cat)])\nfrom sklearn.model_selection import cross_val_score as _cvs\n_r1 = _cvs(_Pl([('pre', _pre()), ('model', _LR(C=1, max_iter=1000))]), X_train, y_train, cv=5, scoring='roc_auc').mean()\nassert abs(manual[1] - _r1) < 1e-6, f'For C=1 the AUC ≈ {_r1:.4f}: cross_val_score(m, X_train, y_train, cv=5, scoring=\"roc_auc\")'\nassert best_C == max(manual, key=manual.get), 'best_C — the C with the highest AUC'"
    }
   },
   {
    "title": "KNN grid inside a Pipeline",
    "prompt": "<p>The flats split and <code>pre_f</code> are ready. The Pipeline <code>('pre', pre_f)</code> → <code>('model', KNeighborsRegressor())</code>. Build <code>grid</code> with <code>model__n_neighbors</code> ∈ [3, 5, 10, 20] and <code>cv=5</code>, train it on <code>X_train</code>. Write <code>best_k</code> and the test R² (<code>grid.score(X_test, y_test)</code>) to <code>test_r2</code>.</p>",
    "hints": [
     "The parameter name: <code>'model__n_neighbors'</code>",
     "<code>grid.fit(X_train, y_train)</code>, then <code>grid.score(X_test, y_test)</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import GridSearchCV as _G\nassert isinstance(grid, _G) and hasattr(grid, 'best_estimator_'), 'grid — a trained GridSearchCV'\nassert len(grid.cv_results_['params']) == 4, 'The grid has 4 values of n_neighbors'\nassert grid.n_features_in_ == 6 if hasattr(grid, 'n_features_in_') else True, 'grid must be trained on the 6 raw columns of X_train'\nassert best_k == grid.best_params_['model__n_neighbors'], \"best_k = grid.best_params_['model__n_neighbors']\"\nassert abs(test_r2 - grid.score(X_test, y_test)) < 1e-9 and test_r2 > 0.8, f'test_r2 = grid.score(X_test, y_test) ≈ 0.85+, yours is {test_r2:.3f}'"
    }
   },
   {
    "title": "Nested CV",
    "prompt": "<p>GridSearchCV's <code>best_score_</code> is slightly optimistic: it was selected on the same scores. An honest estimate is nested CV: pass the object <code>inner = GridSearchCV(DecisionTreeClassifier(random_state=0), {'max_depth': [2, 4, 6]}, cv=3)</code> to <code>cross_val_score(inner, X4, y, cv=3)</code>. Write the mean to <code>nested</code>. For comparison, fit <code>inner</code> on the whole X4, y and write its <code>best_score_</code> to <code>optimistic</code>.</p>",
    "hints": [
     "GridSearchCV is also a model: you can pass it to <code>cross_val_score</code>.",
     "<code>inner.fit(X4, y).best_score_</code>"
    ]
   }
  ]
 },
 "mp-5": {
  "pr": [
   {
    "title": "Bootstrap sample",
    "prompt": "<p>Each tree of a forest learns on a bootstrap sample: <code>n</code> rows are picked with replacement, <code>n</code> times. Create <code>sample</code> with <code>rng.integers(0, 1000, 1000)</code> and write the share of unique rows to <code>frac_unique</code> (in theory ≈ 1 − 1/e ≈ 0.632).</p>",
    "hints": [
     "<code>np.unique(sample)</code> — the unique values."
    ],
    "check": {
     "tests": "import numpy as _np\n_s = _np.random.default_rng(0).integers(0, 1000, 1000)\nassert len(sample) == 1000, 'sample must contain 1000 values'\nassert list(sample[:5]) == list(_s[:5]), 'sample = rng.integers(0, 1000, 1000) (do not use rng beforehand)'\nassert abs(frac_unique - len(_np.unique(_s)) / 1000) < 1e-9 and 0.6 < frac_unique < 0.66, 'frac_unique = the number of unique values / 1000 ≈ 0.63'"
    }
   },
   {
    "title": "Majority vote",
    "prompt": "<p>A classification forest combines the votes of its trees. The function <code>majority(votes)</code> must return 1 if the ones in the 0/1 list are <b>more</b> than half, otherwise 0.</p><p>For example, <code>majority([1, 0, 1])</code> → <code>1</code>, <code>majority([1, 0])</code> → <code>0</code>.</p>",
    "hints": [
     "<code>sum(votes) &gt; len(votes) / 2</code>"
    ],
    "check": {
     "tests": "assert majority([1, 0, 1]) == 1, 'majority([1, 0, 1]) must return 1'\nassert majority([1, 0]) == 0, 'A tie: 0'\nassert majority([0, 0, 0, 1, 1]) == 0, 'majority([0, 0, 0, 1, 1]) = 0'\nassert majority([1] * 51 + [0] * 49) == 1, '51 against 49: 1'"
    }
   },
   {
    "title": "Forest regression",
    "prompt": "<p>A forest also predicts the price. On the numeric features of the flats (<code>fnum</code>), train <code>RandomForestRegressor(n_estimators=50, random_state=0)</code>, named <code>rf</code>, on the train set and write the test R² to <code>rf_r2</code>.</p>",
    "hints": [
     "<code>X_train[fnum]</code> — only the numeric columns."
    ],
    "check": {
     "tests": "from sklearn.ensemble import RandomForestRegressor as _RFR\nassert isinstance(rf, _RFR) and len(rf.estimators_) == 50, 'rf — a RandomForestRegressor with 50 trees'\nassert rf.n_features_in_ == 5, 'Only the fnum columns (5 features)'\nassert abs(rf_r2 - rf.score(X_test[fnum], y_test)) < 1e-9 and 0.5 < rf_r2 < 0.9, f'rf_r2 = rf.score(X_test[fnum], y_test), yours is {rf_r2:.3f}'"
    }
   },
   {
    "title": "Number of trees",
    "prompt": "<p>For <code>n_estimators</code> ∈ [1, 10, 50], train <code>RandomForestClassifier(random_state=0)</code> on the train set of the <code>X4</code> split and write the test ROC AUC into the dictionary <code>auc_by_n</code>.</p>",
    "hints": [
     "Loop: <code>for n in [1, 10, 50]:</code>",
     "<code>roc_auc_score(y_test, rf.predict_proba(X_test)[:, 1])</code>"
    ],
    "check": {
     "tests": "from sklearn.ensemble import RandomForestClassifier as _RF\nfrom sklearn.metrics import roc_auc_score as _ra\n_r = {_n: _ra(y_test, _RF(n_estimators=_n, random_state=0).fit(X_train, y_train).predict_proba(X_test)[:, 1]) for _n in [1, 10, 50]}\nassert sorted(auc_by_n) == [1, 10, 50], 'The keys of auc_by_n: 1, 10, 50'\nassert all(abs(auc_by_n[_n] - _r[_n]) < 1e-9 for _n in _r), 'The AUC values are wrong: roc_auc_score(y_test, predict_proba(X_test)[:, 1])'\nassert auc_by_n[50] > auc_by_n[1] + 0.05, 'As the number of trees grows, the AUC clearly grows'"
    }
   },
   {
    "title": "Average of the trees",
    "prompt": "<p>The prediction of a regression forest is the average of the trees' predictions. Take the prediction of each tree in <code>rf.estimators_</code> on <code>X_test[fnum].values</code> and write their average to <code>avg_pred</code>. Write the largest difference from <code>rf.predict</code> to <code>max_diff</code>.</p>",
    "hints": [
     "<code>[t.predict(Xv) for t in rf.estimators_]</code>",
     "<code>np.array(...).mean(axis=0)</code> — the mean for each flat."
    ],
    "check": {
     "tests": "import numpy as _np\nassert len(avg_pred) == 100, 'avg_pred — for 100 test flats'\nassert _np.allclose(avg_pred, rf.predict(X_test[fnum])), 'avg_pred = the average over the trees (axis=0)'\nassert max_diff < 1e-9, 'max_diff must be ≈ 0'"
    }
   },
   {
    "title": "One tree and a forest",
    "prompt": "<p>Compare the test R² on the numeric features of the flats: <code>DecisionTreeRegressor(random_state=0)</code> → <code>tree_r2</code>, <code>RandomForestRegressor(n_estimators=50, random_state=0)</code> → <code>forest_r2</code>. <code>gain = forest_r2 - tree_r2</code>.</p>",
    "hints": [
     "Both models work on <code>X_train[fnum]</code>."
    ],
    "check": {
     "tests": "from sklearn.tree import DecisionTreeRegressor as _DR\nfrom sklearn.ensemble import RandomForestRegressor as _RFR\n_t = _DR(random_state=0).fit(X_train[fnum], y_train).score(X_test[fnum], y_test)\n_f = _RFR(n_estimators=50, random_state=0).fit(X_train[fnum], y_train).score(X_test[fnum], y_test)\nassert abs(tree_r2 - _t) < 1e-9, f'tree_r2 must be ≈ {_t:.3f}'\nassert abs(forest_r2 - _f) < 1e-9, f'forest_r2 must be ≈ {_f:.3f}'\nassert abs(gain - (_f - _t)) < 1e-9 and gain > 0.1, 'The forest is clearly better than one tree: gain > 0.1'"
    }
   },
   {
    "title": "Effect of max_features",
    "prompt": "<p>To make the trees of a forest different, each split looks at only some of the features. For <code>max_features</code> ∈ [1, 'sqrt', None] write the mean 3-fold ROC AUC of <code>RandomForestClassifier(n_estimators=50, random_state=0)</code> on <code>X4</code>, <code>y</code> into the dictionary <code>auc_by_mf</code> (the key is the value itself). Write the best one to <code>best_mf</code>.</p>",
    "hints": [
     "<code>RandomForestClassifier(n_estimators=50, max_features=mf, random_state=0)</code>",
     "<code>cross_val_score(rf, X4, y, cv=3, scoring='roc_auc')</code>"
    ],
    "check": {
     "tests": "from sklearn.ensemble import RandomForestClassifier as _RF\nfrom sklearn.model_selection import cross_val_score as _cvs\nassert set(auc_by_mf) == {1, 'sqrt', None}, \"Keys of auc_by_mf: 1, “sqrt”, None\"\n_r1 = _cvs(_RF(n_estimators=50, max_features=1, random_state=0), X4, y, cv=3, scoring='roc_auc').mean()\nassert abs(auc_by_mf[1] - _r1) < 1e-9, f\"For max_features=1 the AUC ≈ {_r1:.4f}: cv=3, scoring='roc_auc'\"\nassert all(0.7 < _v < 0.9 for _v in auc_by_mf.values()), 'AUC values in the range 0.7–0.9'\nassert best_mf == max(auc_by_mf, key=auc_by_mf.get), 'best_mf — the value with the highest AUC'"
    }
   },
   {
    "title": "Forest and a linear model",
    "prompt": "<p>The flats split and <code>pre_f</code> are ready. Two Pipelines: <code>pre_f</code> + <code>LinearRegression()</code> and <code>pre_f</code> + <code>RandomForestRegressor(n_estimators=50, random_state=0)</code>. Test MAE: <code>mae_lr</code>, <code>mae_rf</code>. Write the name of the model with the smaller error to <code>winner</code>: <code>'linear'</code> or <code>'forest'</code>.</p>",
    "hints": [
     "Both Pipelines take the raw <code>X_train</code>.",
     "<code>mean_absolute_error(y_test, model.predict(X_test))</code>"
    ]
   }
  ]
 },
 "mp-6": {
  "pr": [
   {
    "title": "Residuals",
    "prompt": "<p>Boosting predicts the residuals at each step. The function <code>residuals(y, pred)</code> must return the list <code>y − pred</code>.</p><p>For example, <code>residuals([10, 20], [12, 15])</code> → <code>[-2, 5]</code>.</p>",
    "hints": [
     "<code>[a - b for a, b in zip(y, pred)]</code>"
    ],
    "check": {
     "tests": "assert list(residuals([10, 20], [12, 15])) == [-2, 5], 'residuals([10, 20], [12, 15]) must return [-2, 5]'\nassert list(residuals([1, 1, 1], [1, 1, 1])) == [0, 0, 0], 'A perfect prediction: zeros'\nassert list(residuals([30.5], [28.0])) == [2.5], 'residuals([30.5], [28.0]) = [2.5]'"
    }
   },
   {
    "title": "A boosting step",
    "prompt": "<p>The function <code>boost_step(pred, tree_pred, lr)</code> must return the new prediction as a NumPy array: <code>pred + lr × tree_pred</code>.</p><p>For example, <code>boost_step([10, 10], [4, -2], 0.5)</code> → <code>[12, 9]</code>.</p>",
    "hints": [
     "Convert the lists to arrays: <code>np.asarray(...)</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nassert boost_step([10, 10], [4, -2], 0.5) is not None and _np.allclose(boost_step([10, 10], [4, -2], 0.5), [12, 9]), 'boost_step([10, 10], [4, -2], 0.5) → [12, 9]'\nassert _np.allclose(boost_step([1, 2, 3], [1, 1, 1], 0.1), [1.1, 2.1, 3.1]), 'lr=0.1: a small step'\nassert _np.allclose(boost_step([5], [3], 1.0), [8]), 'lr=1.0: a full step'"
    }
   },
   {
    "title": "Boosting regression",
    "prompt": "<p>Train <code>HistGradientBoostingRegressor(max_iter=100, random_state=0)</code>, named <code>hgb</code>, on the numeric features of the flats (<code>fnum</code>) on the train set, and write the test R² to <code>hgb_r2</code>.</p>",
    "hints": [
     "The API is the same as the classifier's: <code>fit</code>, <code>score</code>."
    ],
    "check": {
     "tests": "from sklearn.ensemble import HistGradientBoostingRegressor as _H\nassert isinstance(hgb, _H) and hgb.n_features_in_ == 5, 'hgb — a HistGradientBoostingRegressor trained on fnum (5 features)'\nassert abs(hgb_r2 - hgb.score(X_test[fnum], y_test)) < 1e-9, 'hgb_r2 = hgb.score(X_test[fnum], y_test)'\n_h = _H(max_iter=100, random_state=0).fit(X_train[fnum], y_train).score(X_test[fnum], y_test)\nassert abs(hgb_r2 - _h) < 1e-6, f'hgb_r2 must be ≈ {_h:.3f}: max_iter=100, random_state=0'"
    }
   },
   {
    "title": "Two boosting steps",
    "prompt": "<p>Do two steps by hand (<code>lr = 0.5</code>, the trees are <code>DecisionTreeRegressor(max_depth=2, random_state=0)</code>). <code>pred0</code> is the mean of y; step 1: train a tree on <code>y − pred0</code> and get <code>pred1</code>; step 2: train a new tree on <code>y − pred1</code> and get <code>pred2</code>. Write the MSEs into the list <code>mses = [mse0, mse1, mse2]</code>.</p>",
    "hints": [
     "The target of the second tree is the new residual: <code>y - pred1</code>.",
     "<code>((y - p) ** 2).mean()</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.tree import DecisionTreeRegressor as _DR\n_p0 = _np.full(len(y), y.mean())\n_p1 = _p0 + 0.5 * _DR(max_depth=2, random_state=0).fit(x, y - _p0).predict(x)\n_p2 = _p1 + 0.5 * _DR(max_depth=2, random_state=0).fit(x, y - _p1).predict(x)\n_m = [((y - _p) ** 2).mean() for _p in [_p0, _p1, _p2]]\nassert len(mses) == 3, 'mses must have three values: mse0, mse1, mse2'\nassert _np.allclose(mses, _m), f'The MSE values must be ≈ {[round(_v, 1) for _v in _m]}. Was the second tree trained on y − pred1?'\nassert mses[0] > mses[1] > mses[2], 'The MSE must go down at each step'"
    }
   },
   {
    "title": "Number of iterations",
    "prompt": "<p>For <code>HistGradientBoostingClassifier(learning_rate=0.1, random_state=0)</code> and <code>max_iter</code> ∈ [10, 50, 200], write the mean 3-fold ROC AUC on <code>X_num</code>, <code>y</code> into <code>auc_by_iter</code>. Write the best value to <code>best_iter</code>.</p>",
    "hints": [
     "<code>HistGradientBoostingClassifier(learning_rate=0.1, max_iter=n, random_state=0)</code>"
    ],
    "check": {
     "tests": "from sklearn.ensemble import HistGradientBoostingClassifier as _H\nfrom sklearn.model_selection import cross_val_score as _cvs\nassert sorted(auc_by_iter) == [10, 50, 200], 'Keys: 10, 50, 200'\n_r = _cvs(_H(learning_rate=0.1, max_iter=10, random_state=0), X_num, y, cv=3, scoring='roc_auc').mean()\nassert abs(auc_by_iter[10] - _r) < 1e-6, f\"For max_iter=10 the AUC ≈ {_r:.4f}: cv=3, scoring='roc_auc'\"\nassert best_iter == max(auc_by_iter, key=auc_by_iter.get), 'best_iter — the max_iter with the highest AUC'\nassert auc_by_iter[200] < auc_by_iter[best_iter] or best_iter == 200, 'best_iter was chosen wrongly'"
    }
   },
   {
    "title": "Boosting with NaN",
    "prompt": "<p>HGB can handle the empty values by itself. The split of <code>X_num</code> is ready. Train <code>HistGradientBoostingClassifier(max_iter=100, learning_rate=0.05, random_state=0)</code> without an imputer and write the test AUC to <code>hgb_auc</code>. For comparison, <code>make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))</code> → <code>lr_auc</code>.</p>",
    "hints": [
     "HGB: <code>fit(X_train, y_train)</code> directly, with NaN.",
     "<code>roc_auc_score(y_test, model.predict_proba(X_test)[:, 1])</code>"
    ],
    "check": {
     "tests": "from sklearn.ensemble import HistGradientBoostingClassifier as _H\nfrom sklearn.metrics import roc_auc_score as _ra\nassert X_train.isna().any().any(), 'NaN must remain in X_train: HGB does not need an imputer'\n_h = _ra(y_test, _H(max_iter=100, learning_rate=0.05, random_state=0).fit(X_train, y_train).predict_proba(X_test)[:, 1])\nassert abs(hgb_auc - _h) < 1e-6, f'hgb_auc must be ≈ {_h:.3f}'\nassert 0.75 < lr_auc < 0.9, f'lr_auc must be ≈ 0.8, yours is {lr_auc:.3f}'"
    }
   },
   {
    "title": "Boosting loop",
    "prompt": "<p>Write gradient boosting as a loop: start with <code>pred</code> = the mean of y, and over 20 steps train <code>DecisionTreeRegressor(max_depth=2, random_state=0)</code> on the residuals and do <code>pred += 0.3 * tree.predict(x)</code>. After each step, write the MSE <b>after</b> that step into the list <code>mses</code> (20 values).</p>",
    "hints": [
     "Inside the loop: fit the tree on <code>y - pred</code>, then update <code>pred</code>.",
     "Compute the MSE after the update."
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.tree import DecisionTreeRegressor as _DR\n_p = _np.full(len(y), y.mean())\n_m = []\nfor _i in range(20):\n    _p = _p + 0.3 * _DR(max_depth=2, random_state=0).fit(x, y - _p).predict(x)\n    _m.append(((y - _p) ** 2).mean())\nassert len(mses) == 20, 'mses must contain 20 values'\nassert _np.allclose(mses, _m), 'The MSE values are wrong: each tree is trained on y − pred, then pred += 0.3 * tree.predict(x)'\nassert all(mses[_i] >= mses[_i + 1] for _i in range(19)), 'The MSE must go down at each step'"
    }
   },
   {
    "title": "Learning rate and step grid",
    "prompt": "<p>Check with <code>GridSearchCV</code> the grid for <code>HistGradientBoostingClassifier(random_state=0)</code>: <code>learning_rate</code> ∈ [0.05, 0.2] and <code>max_iter</code> ∈ [30, 100] (<code>cv=3</code>, <code>scoring='roc_auc'</code>). Train <code>grid</code> on <code>X_num</code>, <code>y</code>, and write the best parameters to <code>best_params</code>.</p>",
    "hints": [
     "Grid: <code>{'learning_rate': [0.05, 0.2], 'max_iter': [30, 100]}</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import GridSearchCV as _G\nimport numpy as _np\nassert isinstance(grid, _G) and hasattr(grid, 'best_params_'), 'grid — a trained GridSearchCV'\nassert len(grid.cv_results_['params']) == 4 and grid.scoring == 'roc_auc', \"The grid 2 × 2 = 4, scoring='roc_auc'\"\nassert sorted(set(_p['max_iter'] for _p in grid.cv_results_['params'])) == [30, 100], 'max_iter values: 30, 100'\nassert best_params == grid.best_params_, 'best_params = grid.best_params_'\nassert 0.7 < grid.best_score_ < 0.9, 'The best CV AUC ≈ 0.8'"
    }
   }
  ]
 },
 "mp-7": {
  "pr": [
   {
    "title": "Class ratio",
    "prompt": "<p>In the churn data write the number of subscribers who left (<code>churned == 1</code>) to <code>n_pos</code>, and the number of the others to <code>n_neg</code>. Compute <code>ratio = n_neg / n_pos</code>: how many stayers there are per one leaver.</p>",
    "hints": [
     "<code>(df['churned'] == 1).sum()</code>"
    ]
   },
   {
    "title": "Balanced weights",
    "prompt": "<p><code>class_weight='balanced'</code> gives each class the weight <code>n / (k · n_c)</code> (<code>n</code> — the total, <code>k</code> — the number of classes, <code>n_c</code> — the size of the class). The function <code>balanced_weights(y)</code> must return the dictionary <code>{класс: салмақ}</code>.</p><p>For example, <code>balanced_weights([0, 0, 0, 1])</code> → <code>{0: 0.667, 1: 2.0}</code> (approximately).</p>",
    "hints": [
     "<code>classes = sorted(set(y))</code>",
     "<code>len(y) / (len(classes) * y.count(c))</code>"
    ],
    "check": {
     "tests": "_w = balanced_weights([0, 0, 0, 1])\nassert isinstance(_w, dict) and set(_w) == {0, 1}, 'Return a dictionary: the keys are the classes'\nassert abs(_w[0] - 4 / 6) < 1e-9 and abs(_w[1] - 2) < 1e-9, 'balanced_weights([0, 0, 0, 1]) → {0: 0.667, 1: 2.0}'\n_v = balanced_weights([1, 0, 1, 0])\nassert abs(_v[0] - 1) < 1e-9 and abs(_v[1] - 1) < 1e-9, 'On balanced data the weights are 1'\n_u = balanced_weights(['a', 'b', 'b', 'c', 'c', 'c'])\nassert abs(_u['a'] - 2) < 1e-9 and abs(_u['c'] - 2 / 3) < 1e-9, 'It must work with three classes'"
    }
   },
   {
    "title": "Cost of errors",
    "prompt": "<p>The function <code>cost(y_true, y_pred, c_fp, c_fn)</code> must return the total cost: <code>FP × c_fp + FN × c_fn</code>.</p><p>For example, <code>cost([1, 0, 1, 0], [0, 1, 1, 0], 5000, 20000)</code> → <code>25000</code>.</p>",
    "hints": [
     "FP: the true value is 0, the prediction is 1. FN: the true value is 1, the prediction is 0."
    ],
    "check": {
     "tests": "assert cost([1, 0, 1, 0], [0, 1, 1, 0], 5000, 20000) == 25000, 'cost([1, 0, 1, 0], [0, 1, 1, 0], 5000, 20000) must return 25000'\nassert cost([1, 1], [1, 1], 5000, 20000) == 0, 'No errors: 0'\nassert cost([0, 0, 0], [1, 1, 1], 3000, 15000) == 9000, '3 FP × 3000 = 9000'\nassert cost([1, 1, 0], [0, 0, 0], 3000, 15000) == 30000, '2 FN × 15000 = 30000'"
    }
   },
   {
    "title": "Threshold and recall",
    "prompt": "<p><code>proba</code> is ready. For the thresholds <code>t</code> ∈ [0.2, 0.3, 0.4, 0.5] write the test recall into the dictionary <code>recalls</code>. Also write the number of flagged subscribers into the dictionary <code>flagged</code>.</p>",
    "hints": [
     "Loop: <code>for t in [0.2, 0.3, 0.4, 0.5]:</code>",
     "<code>pred.sum()</code> — the number of warnings."
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import OneHotEncoder as _OH, StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre():\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), cat)])\n_m = _Pl([('pre', _pre()), ('model', _LR(max_iter=1000))]).fit(X_train, y_train)\n_p = _m.predict_proba(X_test)[:, 1]\nfrom sklearn.metrics import recall_score as _rs\nassert sorted(recalls) == [0.2, 0.3, 0.4, 0.5] and sorted(flagged) == [0.2, 0.3, 0.4, 0.5], 'Keys: 0.2, 0.3, 0.4, 0.5'\nassert all(abs(recalls[_t] - _rs(y_test, (_p >= _t).astype(int))) < 1e-9 for _t in recalls), 'recall is wrong: (proba >= t)'\nassert all(int(flagged[_t]) == int((_p >= _t).sum()) for _t in flagged), 'flagged — the number of subscribers with proba >= t'\nassert recalls[0.2] > recalls[0.5] and flagged[0.2] > flagged[0.5], 'When the threshold goes down, both recall and the number of warnings go up'"
    }
   },
   {
    "title": "Precision requirement",
    "prompt": "<p>At least half of the warnings should be correct (precision ≥ 0.5). Among the thresholds <code>np.arange(0.1, 0.91, 0.05)</code> (<code>round(t, 2)</code>) find the <b>smallest</b> threshold that meets this condition on the test set: write it to <code>t_p50</code>, and the recall at that threshold to <code>rec_p50</code>.</p>",
    "hints": [
     "Check the thresholds in increasing order and use <code>break</code> at the first match.",
     "If there are no warnings, precision is undefined: add the condition <code>pred.sum() &gt; 0</code>."
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import OneHotEncoder as _OH, StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre():\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), cat)])\n_m = _Pl([('pre', _pre()), ('model', _LR(max_iter=1000))]).fit(X_train, y_train)\n_p = _m.predict_proba(X_test)[:, 1]\nimport numpy as _np\nfrom sklearn.metrics import precision_score as _ps, recall_score as _rs\n_ok = [round(_t, 2) for _t in _np.arange(0.1, 0.91, 0.05) if (_p >= round(_t, 2)).sum() > 0 and _ps(y_test, (_p >= round(_t, 2)).astype(int)) >= 0.5]\nassert t_p50 is not None and abs(t_p50 - _ok[0]) < 1e-9, f't_p50 must be {_ok[0]}: the smallest threshold with precision ≥ 0.5'\nassert abs(rec_p50 - _rs(y_test, (_p >= _ok[0]).astype(int))) < 1e-9, 'rec_p50 — the recall at that threshold'"
    }
   },
   {
    "title": "Split without stratify",
    "prompt": "<p>On a small dataset a split without <code>stratify</code> can break the class share. Split twice with <code>random_state=5</code>, <code>test_size=0.25</code>: without stratify → the churn share in test <code>rate_plain</code>; with <code>stratify=y</code> → <code>rate_strat</code>. The share over all the data is <code>rate_all</code>.</p>",
    "hints": [
     "<code>train_test_split</code> returns four values: y_test is the fourth."
    ],
    "check": {
     "tests": "from sklearn.model_selection import train_test_split as _tts\nassert abs(rate_plain - _tts(X, y, test_size=0.25, random_state=5)[3].mean()) < 1e-9, 'rate_plain: without stratify, random_state=5'\nassert abs(rate_strat - _tts(X, y, test_size=0.25, random_state=5, stratify=y)[3].mean()) < 1e-9, 'rate_strat: stratify=y, random_state=5'\nassert abs(rate_all - y.mean()) < 1e-9, 'rate_all = y.mean()'\nassert abs(rate_strat - rate_all) < abs(rate_plain - rate_all), 'stratify keeps the class share'"
    }
   },
   {
    "title": "Choosing the threshold on train",
    "prompt": "<p>Do not choose the threshold by looking at the test set. <code>p_tr</code> are the CV probabilities on the train set (ready). FP = 3000 ₸, FN = 15 000 ₸. From the thresholds <code>np.arange(0.1, 0.91, 0.05)</code> (<code>round(t, 2)</code>) pick the threshold <code>best_t</code> with the lowest cost on train. Then train <code>model</code> on train and write the cost on test at <code>best_t</code> to <code>test_cost</code>, and at 0.5 to <code>cost_05</code>.</p>",
    "hints": [
     "A dictionary of costs: <code>{round(t, 2): cost(y_train, (p_tr &gt;= round(t, 2)).astype(int)) for t in ...}</code>",
     "Then <code>model.fit(X_train, y_train)</code> and the test probabilities."
    ],
    "check": {
     "tests": "import numpy as _np\n_c = {round(_t, 2): cost(y_train, (p_tr >= round(_t, 2)).astype(int)) for _t in _np.arange(0.1, 0.91, 0.05)}\n_bt = min(_c, key=_c.get)\nfrom sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import OneHotEncoder as _OH, StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre():\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), cat)])\n_m = _Pl([('pre', _pre()), ('model', _LR(max_iter=1000))]).fit(X_train, y_train)\n_p = _m.predict_proba(X_test)[:, 1]\nassert best_t is not None and abs(best_t - _bt) < 1e-9, f'best_t = {_bt}: the threshold with the lowest cost on train (p_tr)'\nassert test_cost == cost(y_test, (_p >= _bt).astype(int)), 'test_cost: the model trained on train, the threshold best_t on test'\nassert cost_05 == cost(y_test, (_p >= 0.5).astype(int)), 'cost_05: the threshold 0.5 on test'\nassert test_cost < cost_05, 'The threshold chosen on train should be cheaper on test than the 0.5 threshold'"
    }
   },
   {
    "title": "Budget: 30 calls",
    "prompt": "<p>The retention team can call only 30 subscribers a week. Train a logistic Pipeline with <code>class_weight='balanced'</code> on the train set and pick the 30 test subscribers with the highest probability. Write the share of leavers among them to <code>prec_at_30</code>, and how many of all the test leavers are covered to <code>rec_at_30</code>.</p>",
    "hints": [
     "Indices in descending order: <code>np.argsort(-p)[:30]</code>",
     "<code>y_test.values[top].sum()</code> — the leavers caught."
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import OneHotEncoder as _OH, StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre():\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), cat)])\nimport numpy as _np\n_b = _Pl([('pre', _pre()), ('model', _LR(max_iter=1000, class_weight='balanced'))]).fit(X_train, y_train)\n_q = _b.predict_proba(X_test)[:, 1]\n_h = int(y_test.values[_np.argsort(-_q)[:30]].sum())\nassert abs(prec_at_30 - _h / 30) < 1e-9, f'prec_at_30 = {_h}/30: the 30 subscribers with the highest proba'\nassert abs(rec_at_30 - _h / int(y_test.sum())) < 1e-9, f'rec_at_30 = {_h}/{int(y_test.sum())}: the leavers caught / all leavers'\nassert prec_at_30 > y_test.mean(), 'The share among the chosen 30 subscribers should be above average'"
    }
   }
  ]
 },
 "mp-8": {
  "pr": [
   {
    "title": "Centroid",
    "prompt": "<p>The function <code>centroid(points)</code> must return the centre of the points (the mean of each coordinate) as a list.</p><p>For example, <code>centroid([[0, 0], [2, 4]])</code> → <code>[1.0, 2.0]</code>.</p>",
    "hints": [
     "<code>np.asarray(points).mean(axis=0)</code> — the mean by column."
    ],
    "check": {
     "tests": "import numpy as _np\nassert centroid([[0, 0], [2, 4]]) is not None and _np.allclose(centroid([[0, 0], [2, 4]]), [1, 2]), 'centroid([[0, 0], [2, 4]]) → [1.0, 2.0]'\nassert _np.allclose(centroid([[1, 2, 3]]), [1, 2, 3]), 'One point: the point itself'\nassert _np.allclose(centroid([[0, 0], [3, 0], [0, 3], [3, 3]]), [1.5, 1.5]), 'The centre of the square [1.5, 1.5]'"
    }
   },
   {
    "title": "Nearest centre",
    "prompt": "<p>The function <code>assign(points, centers)</code> must return, for each point, the index of the nearest centre as a list (Euclidean distance).</p><p>For example, <code>assign([[0, 1], [9, 9]], [[0, 0], [10, 10]])</code> → <code>[0, 1]</code>.</p>",
    "hints": [
     "For each point: <code>((C - p) ** 2).sum(axis=1)</code>, then <code>np.argmin</code>."
    ],
    "check": {
     "tests": "assert list(assign([[0, 1], [9, 9]], [[0, 0], [10, 10]])) == [0, 1], 'assign([[0, 1], [9, 9]], [[0, 0], [10, 10]]) → [0, 1]'\nassert list(assign([[5, 5], [1, 0], [6, 7]], [[0, 0], [5, 5], [10, 10]])) == [1, 0, 1], 'With three centres: [1, 0, 1]'\nassert list(assign([[2], [8]], [[0], [5], [9]])) == [0, 2], 'One-dimensional points: [0, 2]'"
    }
   },
   {
    "title": "Cluster sizes",
    "prompt": "<p>Group the flats by area and price. <code>Z</code> is ready (scaled). Train <code>KMeans(n_clusters=3, n_init=10, random_state=0)</code>, named <code>km</code>, and write the number of flats in each cluster to the Series <code>sizes</code> (sorted by index).</p>",
    "hints": [
     "<code>pd.Series(km.labels_).value_counts().sort_index()</code>"
    ],
    "check": {
     "tests": "from sklearn.cluster import KMeans as _KM\n_l = _KM(n_clusters=3, n_init=10, random_state=0).fit(Z).labels_\nassert isinstance(km, _KM) and km.n_clusters == 3, 'km — a KMeans with 3 clusters'\nassert list(sizes.index) == [0, 1, 2], 'The index of sizes: 0, 1, 2 (sort_index)'\nassert int(sizes.sum()) == 400 and [int(_v) for _v in sizes.values] == [int((_l == _k).sum()) for _k in range(3)], 'sizes — the number of flats in each cluster'"
    }
   },
   {
    "title": "Inertia by hand",
    "prompt": "<p><code>km</code> is trained. The inertia is the sum of the squared distances from each point to its centre. Compute it by hand using <code>km.cluster_centers_</code> and <code>km.labels_</code> and write it to <code>inertia_manual</code>.</p>",
    "hints": [
     "<code>km.cluster_centers_[km.labels_]</code> — the centre of each point.",
     "<code>((Z - assigned) ** 2).sum()</code>"
    ]
   },
   {
    "title": "Churn by segment",
    "prompt": "<p><code>km</code> split the subscribers into 3 segments. Write the labels into the column <code>seg['segment']</code>, the churn share of each segment to <code>rate_by_seg</code>, and the riskiest segment to <code>riskiest</code>. Write the mean <code>tenure_months</code> of each segment to <code>tenure_by_seg</code>.</p>",
    "hints": [
     "<code>seg.groupby('segment')['churned'].mean()</code>"
    ],
    "check": {
     "tests": "_r = seg['churned'].groupby(km.labels_).mean()\nassert 'segment' in seg.columns and (seg['segment'].values == km.labels_).all(), \"seg['segment'] = km.labels_\"\nassert len(rate_by_seg) == 3 and all(abs(rate_by_seg[_k] - _r[_k]) < 1e-9 for _k in _r.index), 'rate_by_seg — the mean of churned by segment'\nassert riskiest == _r.idxmax(), f'riskiest must be {_r.idxmax()}'\nassert tenure_by_seg[riskiest] < seg['tenure_months'].mean(), 'The riskiest segment is the new subscribers (tenure below the average)'"
    }
   },
   {
    "title": "New client's segment",
    "prompt": "<p>A new subscriber: 4 months, 11,500 ₸, 32 GB, 2 calls. Scale them with the <b>same</b> <code>sc</code>, use <code>km.predict</code> to get their segment and write it to <code>new_seg</code> (int). Write the scaled point to <code>z_new</code>.</p>",
    "hints": [
     "Only <code>transform</code>: <code>sc.transform(new)</code>",
     "<code>int(km.predict(z_new)[0])</code>"
    ],
    "check": {
     "tests": "import numpy as _np\n_z = sc.transform(new)\n_k = int(_np.argmin(((km.cluster_centers_ - _z[0]) ** 2).sum(axis=1)))\nassert _np.allclose(_np.asarray(z_new).reshape(1, -1), _z), 'z_new = sc.transform(new): do not fit a new scaler'\nassert new_seg == _k, f'new_seg must be {_k}: km.predict(z_new)[0]'"
    }
   },
   {
    "title": "One KMeans step",
    "prompt": "<p>Write one iteration of KMeans. <code>kmeans_step(points, centers)</code>: (1) assign each point to the nearest centre; (2) move each centre to the mean of its points (a centre with no points stays where it is). Return the new centres as a NumPy array.</p><p>For example, <code>kmeans_step([[0, 0], [0, 2], [10, 10]], [[1, 1], [9, 9]])</code> → <code>[[0, 1], [10, 10]]</code>.</p>",
    "hints": [
     "Assignment: for each point <code>np.argmin(((C - p) ** 2).sum(axis=1))</code>",
     "Update: <code>P[labels == k].mean(axis=0)</code>"
    ],
    "check": {
     "tests": "import numpy as _np\n_r = kmeans_step([[0, 0], [0, 2], [10, 10]], [[1, 1], [9, 9]])\nassert _r is not None and _np.allclose(_r, [[0, 1], [10, 10]]), 'kmeans_step([[0, 0], [0, 2], [10, 10]], [[1, 1], [9, 9]]) → [[0, 1], [10, 10]]'\nassert _np.allclose(kmeans_step([[1, 1], [2, 2]], [[0, 0], [50, 50]]), [[1.5, 1.5], [50, 50]]), 'A centre with no points stays in place'\nassert _np.allclose(kmeans_step([[0], [1], [9], [10], [11]], [[0], [5], [12]]), [[0.5], [5], [10]]), 'In one dimension: [[0.5], [5], [10]] (the middle centre has no points)'"
    }
   },
   {
    "title": "Clusters without scaling",
    "prompt": "<p>KMeans without scaling is driven by <code>monthly_fee</code> (thousands of tenge). Train two models on the same <code>cols</code> (<code>n_clusters=3, n_init=10, random_state=0</code>): on the raw data and after <code>StandardScaler</code>. For each, write the range (max − min) of the mean <code>tenure_months</code> values across the clusters to <code>range_raw</code> and <code>range_scaled</code>.</p>",
    "hints": [
     "Write a function for the repeated part.",
     "<code>seg['tenure_months'].groupby(labels).mean()</code>"
    ],
    "check": {
     "tests": "from sklearn.cluster import KMeans as _KM\nfrom sklearn.preprocessing import StandardScaler as _SS\ndef _tr(_d):\n    _m = seg['tenure_months'].groupby(_KM(n_clusters=3, n_init=10, random_state=0).fit(_d).labels_).mean()\n    return _m.max() - _m.min()\nassert abs(range_raw - _tr(seg[cols].values)) < 1e-6, 'range_raw is wrong: KMeans on the raw seg[cols]'\nassert abs(range_scaled - _tr(_SS().fit_transform(seg[cols]))) < 1e-6, 'range_scaled is wrong: StandardScaler().fit_transform(seg[cols])'\nassert range_scaled > range_raw + 10, 'After scaling the difference by tenure becomes visible'"
    }
   }
  ]
 },
 "mp-9": {
  "pr": [
   {
    "title": "The most important features",
    "prompt": "<p>The function <code>top_k(imp, k)</code> must return the names of the <code>k</code> features with the greatest importance from the dictionary <code>{белгі: маңыздылық}</code>, in descending order.</p><p>For example, <code>top_k({'a': 0.1, 'b': 0.7, 'c': 0.2}, 2)</code> → <code>['b', 'c']</code>.</p>",
    "hints": [
     "<code>sorted(imp, key=imp.get, reverse=True)</code>",
     "Slice: <code>[:k]</code>"
    ],
    "check": {
     "tests": "assert top_k({'a': 0.1, 'b': 0.7, 'c': 0.2}, 2) == ['b', 'c'], \"top_k({'a': 0.1, 'b': 0.7, 'c': 0.2}, 2) must return ['b', 'c']\"\nassert top_k({'tenure_months': 0.4, 'monthly_fee': 0.25, 'support_calls': 0.3}, 1) == ['tenure_months'], 'k=1: the most important one'\nassert top_k({'x': 0.5}, 3) == ['x'], 'If k is larger than the number of features, return all of them'"
    }
   },
   {
    "title": "Tree importance",
    "prompt": "<p>Train <code>DecisionTreeRegressor(max_depth=4, random_state=0)</code> on the numeric features of the flats (<code>fnum</code>, all the data). Write <code>feature_importances_</code> into the Series <code>imp</code> with the column names and sort it in descending order. Write the most important feature to <code>top</code>.</p>",
    "hints": [
     "<code>pd.Series(tree.feature_importances_, index=fnum)</code>",
     "<code>.sort_values(ascending=False)</code>"
    ],
    "check": {
     "tests": "from sklearn.tree import DecisionTreeRegressor as _DR\n_i = pd.Series(_DR(max_depth=4, random_state=0).fit(flats[fnum], flats['price_mln']).feature_importances_, index=fnum)\nassert isinstance(imp, pd.Series) and set(imp.index) == set(fnum), 'The index of imp is the columns of fnum'\nassert all(abs(imp[_c] - _i[_c]) < 1e-9 for _c in fnum), 'The importances are wrong: max_depth=4, random_state=0, all the data'\nassert list(imp.values) == sorted(imp.values, reverse=True), 'Sort in descending order'\nassert top == _i.idxmax(), f'top must be {_i.idxmax()}'"
    }
   },
   {
    "title": "Absolute coefficients",
    "prompt": "<p>The <code>model</code> (scaled features + LogisticRegression) is trained. Write the coefficients into the Series <code>coefs</code> with the feature names from <code>pre</code>. Write the feature with the largest absolute value (<code>abs</code>) to <code>top_abs</code>.</p>",
    "hints": [
     "<code>model.named_steps['pre'].get_feature_names_out()</code>",
     "<code>coefs.abs().idxmax()</code>"
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import OneHotEncoder as _OH, StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre():\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), cat)])\n_m = _Pl([('pre', _pre()), ('model', _LR(max_iter=1000))]).fit(X_train, y_train)\n_p = _m.predict_proba(X_test)[:, 1]\nimport pandas as _pd\n_c = _pd.Series(_m.named_steps['model'].coef_[0], index=_m.named_steps['pre'].get_feature_names_out())\nassert isinstance(coefs, pd.Series) and len(coefs) == 14, 'coefs — a Series over 14 features'\nassert list(coefs.index) == list(_c.index) and all(abs(coefs.values - _c.values) < 1e-6), 'coefs = coef_[0], the index is get_feature_names_out()'\nassert top_abs == _c.abs().idxmax(), f'top_abs must be {_c.abs().idxmax()}: coefs.abs().idxmax()'"
    }
   },
   {
    "title": "Permutation by hand",
    "prompt": "<p>Compute the permutation importance of one feature by hand. <code>base_auc</code> is the test AUC. Then shuffle <code>tenure_months</code> in a copy of <code>X_test</code> with <code>np.random.default_rng(0).permutation</code> and write the new AUC to <code>shuffled_auc</code>. <code>drop = base_auc - shuffled_auc</code>.</p>",
    "hints": [
     "<code>Xs = X_test.copy()</code> — do not spoil the original data.",
     "<code>np.random.default_rng(0).permutation(Xs['tenure_months'].values)</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.metrics import roc_auc_score as _ra\n_X = X_test.copy()\n_X['tenure_months'] = _np.random.default_rng(0).permutation(_X['tenure_months'].values)\n_s = _ra(y_test, model.predict_proba(_X)[:, 1])\nassert abs(base_auc - _ra(y_test, model.predict_proba(X_test)[:, 1])) < 1e-9, 'base_auc — the AUC on the original X_test'\nassert abs(shuffled_auc - _s) < 1e-9, f'shuffled_auc ≈ {_s:.3f}: shuffle tenure_months in the copy of X_test'\nassert 'tenure_months' in X_test.columns and abs(drop - (base_auc - shuffled_auc)) < 1e-9 and drop > 0.05, 'drop = base_auc - shuffled_auc (positive)'"
    }
   },
   {
    "title": "Permutation for flats",
    "prompt": "<p><code>rf</code> (on the numeric features of the flats) is trained. On the test set compute <code>permutation_importance(rf, X_test[fnum], y_test, n_repeats=5, random_state=0)</code> and write <code>importances_mean</code> to the Series <code>perm</code> (in descending order). Write the useless features (value below 0.01) to the list <code>useless</code>.</p>",
    "hints": [
     "<code>r.importances_mean</code>",
     "Filter: <code>perm[perm &lt; 0.01].index</code>"
    ],
    "check": {
     "tests": "from sklearn.inspection import permutation_importance as _pi\n_r = pd.Series(_pi(rf, X_test[fnum], y_test, n_repeats=5, random_state=0).importances_mean, index=fnum)\nassert isinstance(perm, pd.Series) and set(perm.index) == set(fnum), 'perm — a Series over fnum'\nassert all(abs(perm[_c] - _r[_c]) < 1e-9 for _c in fnum), 'The values are wrong: n_repeats=5, random_state=0, on the test data'\nassert list(perm.values) == sorted(perm.values, reverse=True), 'Sort in descending order'\nassert sorted(useless) == sorted(_r[_r < 0.01].index), 'useless — the features with a value below 0.01'"
    }
   },
   {
    "title": "Explaining one prediction",
    "prompt": "<p>In a logistic model the logit of one subscriber is the sum of the contributions: <code>z = Σ xᵢ·wᵢ + b</code>. For the first subscriber of the test set take <code>x0 = pre.transform(X_test.iloc[[0]])</code> and write the contribution of each feature (<code>x0 · coef</code>) to the Series <code>contrib</code> (the index is the feature names). <code>p0 = sigmoid(contrib.sum() + intercept)</code> must equal <code>proba[0]</code>. The largest contribution (by absolute value) goes to <code>top_driver</code>.</p>",
    "hints": [
     "<code>model.named_steps['pre'].transform(X_test.iloc[[0]])</code> (double brackets — a DataFrame)",
     "<code>contrib.sum() + lr.intercept_[0]</code>, then the sigmoid."
    ],
    "check": {
     "tests": "assert isinstance(contrib, pd.Series) and len(contrib) == 14, 'contrib — the contributions of 14 features'\nassert abs(p0 - proba[0]) < 1e-6, f'p0 = proba[0] ≈ {proba[0]:.4f}: sigmoid(contrib.sum() + intercept_[0])'\nassert top_driver == contrib.abs().idxmax(), 'top_driver = contrib.abs().idxmax()'\nassert str(top_driver).startswith(('num__', 'cat__')), 'top_driver — a feature name from pre'"
    }
   },
   {
    "title": "Dependence curve",
    "prompt": "<p>Draw the partial dependence by hand. For <code>t</code> ∈ [1, 12, 24, 36, 48, 60, 72], in a copy of <code>X_test</code> set <code>tenure_months</code> of <b>all</b> subscribers to <code>t</code> and write the mean probability of leaving into the dictionary <code>pd_curve</code>.</p>",
    "hints": [
     "<code>Xc = X_test.copy()</code>, <code>Xc['tenure_months'] = t</code>",
     "<code>model.predict_proba(Xc)[:, 1].mean()</code>"
    ],
    "check": {
     "tests": "_ts = [1, 12, 24, 36, 48, 60, 72]\n_r = {}\nfor _t in _ts:\n    _X = X_test.copy()\n    _X['tenure_months'] = _t\n    _r[_t] = model.predict_proba(_X)[:, 1].mean()\nassert sorted(pd_curve) == _ts, 'Keys: 1, 12, 24, 36, 48, 60, 72'\nassert all(abs(pd_curve[_t] - _r[_t]) < 1e-9 for _t in _ts), 'The values are wrong: in the copy tenure_months = t, then predict_proba(...)[:, 1].mean()'\nassert all(pd_curve[_ts[_i]] > pd_curve[_ts[_i + 1]] for _i in range(6)), 'As the tenure grows, the mean probability should go down'\nassert X_test['tenure_months'].nunique() > 7, 'The original X_test must not change: use .copy()'"
    }
   },
   {
    "title": "Dropping a feature",
    "prompt": "<p>Another way to measure importance is to drop a feature and retrain the model. <code>base_auc</code> is the test AUC of the full Pipeline. Without <code>tenure_months</code> (remove it from <code>num</code> and build a new <code>pre</code>), train the same model and write its AUC to <code>auc_without</code>. <code>drop_auc = base_auc - auc_without</code>.</p>",
    "hints": [
     "<code>num2 = [c for c in num if c != 'tenure_months']</code>",
     "Pass <code>num2</code> to a new ColumnTransformer; X_train does not change."
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import OneHotEncoder as _OH, StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre():\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), cat)])\n_m = _Pl([('pre', _pre()), ('model', _LR(max_iter=1000))]).fit(X_train, y_train)\n_p = _m.predict_proba(X_test)[:, 1]\nfrom sklearn.metrics import roc_auc_score as _ra\n_n2 = [_c for _c in num if _c != 'tenure_months']\n_m2 = _Pl([('pre', _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), _n2), ('cat', _OH(handle_unknown='ignore'), cat)])), ('model', _LR(max_iter=1000))]).fit(X_train, y_train)\n_aw = _ra(y_test, _m2.predict_proba(X_test)[:, 1])\nassert abs(base_auc - _ra(y_test, _p)) < 1e-6, 'base_auc — the test AUC of the full model'\nassert abs(auc_without - _aw) < 1e-6, f'auc_without ≈ {_aw:.3f}: remove tenure_months from num and build a new pre'\nassert abs(drop_auc - (base_auc - auc_without)) < 1e-9 and drop_auc > 0.05, 'drop_auc = base_auc − auc_without, clearly positive'"
    }
   }
  ]
 },
 "mp-10": {
  "pr": [
   {
    "title": "Model card dictionary",
    "prompt": "<p>Create a short model document (a model card): the dictionary <code>card</code> must have the keys <code>'name'</code> (text), <code>'version'</code> (an integer), <code>'data'</code> (<code>'churn.csv'</code>), <code>'metric'</code> (<code>'roc_auc'</code>) and <code>'limitations'</code> (a list with at least one text).</p>",
    "hints": [
     "Dictionary: <code>{'name': '...', 'version': 1, ...}</code>"
    ],
    "check": {
     "tests": "assert isinstance(card, dict) and {'name', 'version', 'data', 'metric', 'limitations'} <= set(card), \"Keys of card: name, version, data, metric, limitations\"\nassert isinstance(card['name'], str) and card['name'], 'name — a non-empty text'\nassert isinstance(card['version'], int), 'version — an integer'\nassert card['data'] == 'churn.csv' and card['metric'] == 'roc_auc', \"data = 'churn.csv', metric = 'roc_auc'\"\nassert isinstance(card['limitations'], list) and len(card['limitations']) >= 1 and all(isinstance(_x, str) for _x in card['limitations']), 'limitations — a list of texts (at least one)'"
    }
   },
   {
    "title": "Save the flats model",
    "prompt": "<p>The <code>model</code> (flat prices) is trained. Save it with <code>joblib.dump</code> to the file <code>flats_lr.joblib</code> and load it back into <code>loaded</code>. Are the predictions on <code>X</code> of the two the same — <code>same</code> (bool).</p>",
    "hints": [
     "<code>joblib.dump(model, 'flats_lr.joblib')</code>",
     "<code>joblib.load('flats_lr.joblib')</code>"
    ],
    "check": {
     "tests": "import os as _os\nfrom sklearn.linear_model import LinearRegression as _LinR\nassert _os.path.exists('flats_lr.joblib'), 'The file flats_lr.joblib was not found: joblib.dump(model, ...)'\nassert isinstance(loaded, _LinR) and loaded is not model, 'loaded — the LinearRegression loaded from the file'\nassert bool(same) is True, 'same = (loaded.predict(X) == model.predict(X)).all() → True'"
    }
   },
   {
    "title": "Write the card to JSON",
    "prompt": "<p>Write <code>card</code> to the file <code>card.json</code> with <code>json.dump</code> (<code>ensure_ascii=False</code>, so the Cyrillic letters are kept). Then read the file back into <code>card2</code>. They must be the same.</p>",
    "hints": [
     "<code>with open('card.json', 'w', encoding='utf-8') as f: json.dump(card, f, ensure_ascii=False)</code>",
     "Reading: <code>json.load(f)</code>"
    ],
    "check": {
     "tests": "import os as _os\nassert _os.path.exists('card.json'), 'The file card.json was not found'\nassert card2 == card, 'card2 — the dictionary read from the file must match card'\nassert 'Алматы' in open('card.json', encoding='utf-8').read(), 'ensure_ascii=False: the Cyrillic letters must stay as they are in the file'"
    }
   },
   {
    "title": "Model file name",
    "prompt": "<p>To avoid mixing up model versions, build the file name by a rule. The function <code>model_filename(name, version, date)</code> must return <code>'&lt;name&gt;_v&lt;version&gt;_&lt;date&gt;.joblib'</code>; spaces in <code>name</code> are replaced with <code>_</code>, everything in lower case.</p><p>For example, <code>model_filename('Churn LogReg', 3, '2024-05-01')</code> → <code>'churn_logreg_v3_2024-05-01.joblib'</code>.</p>",
    "hints": [
     "f-string: <code>f\"{...}_v{version}_{date}.joblib\"</code>",
     "<code>name.lower().replace(' ', '_')</code>"
    ],
    "check": {
     "tests": "assert model_filename('Churn LogReg', 3, '2024-05-01') == 'churn_logreg_v3_2024-05-01.joblib', \"model_filename('Churn LogReg', 3, '2024-05-01') must return 'churn_logreg_v3_2024-05-01.joblib'\"\nassert model_filename('flats', 1, '2024-01-15') == 'flats_v1_2024-01-15.joblib', \"model_filename('flats', 1, '2024-01-15') → 'flats_v1_2024-01-15.joblib'\"\nassert model_filename('Pater Baga RF', 12, 'x') == 'pater_baga_rf_v12_x.joblib', 'Several spaces are replaced as well'"
    }
   },
   {
    "title": "Prediction with the loaded model",
    "prompt": "<p>The <code>model</code> (a full Pipeline) is trained. Save it to <code>churn_lr.joblib</code> and load it into <code>loaded</code>. Write the leaving probabilities of two new subscribers (<code>new</code>, the age may be empty) through <code>loaded</code> into the array <code>probs</code>.</p>",
    "hints": [
     "The Pipeline handles the raw columns itself (together with the NaN).",
     "<code>loaded.predict_proba(new)[:, 1]</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nimport os as _os\nassert _os.path.exists('churn_lr.joblib') and loaded is not None and loaded is not model, 'Save the model to churn_lr.joblib and load it into loaded'\nassert len(probs) == 2 and _np.allclose(probs, model.predict_proba(new)[:, 1]), 'probs = loaded.predict_proba(new)[:, 1]'\nassert probs[0] > 0.5 > probs[1], 'A new premium subscriber is risky, a subscriber with an old contract is safe'"
    }
   },
   {
    "title": "Metrics in the card",
    "prompt": "<p>Add the test metrics to the model card: <code>card['metrics']</code> = <code>{'auc': ..., 'recall': ..., 'precision': ...}</code>, each rounded to 3 decimal places (<code>round</code>), threshold 0.5. Also write <code>card['n_test'] = len(X_test)</code>.</p>",
    "hints": [
     "<code>round(roc_auc_score(y_test, proba), 3)</code>",
     "Threshold 0.5: <code>model.predict(X_test)</code>"
    ],
    "check": {
     "tests": "from sklearn.metrics import roc_auc_score as _ra, recall_score as _rs, precision_score as _ps\n_pr = model.predict(X_test)\nassert 'metrics' in card and set(card['metrics']) == {'auc', 'recall', 'precision'}, \"The keys of card['metrics']: auc, recall, precision\"\nassert card['metrics']['auc'] == round(_ra(y_test, proba), 3), 'auc — from proba, 3 decimal places'\nassert card['metrics']['recall'] == round(_rs(y_test, _pr), 3) and card['metrics']['precision'] == round(_ps(y_test, _pr), 3), 'recall and precision — from model.predict(X_test), 3 decimal places'\nassert card['n_test'] == 150, \"card['n_test'] = len(X_test) = 150\""
    }
   },
   {
    "title": "Save-and-check function",
    "prompt": "<p>Write the function <code>save_and_check(model, X, path)</code>: save the model to <code>path</code>, load it back and return <code>True</code> if the predictions on <code>X</code> match completely, otherwise <code>False</code>. Call it for <code>model</code> with the file <code>churn_v1.joblib</code> and write the result to <code>ok</code>.</p>",
    "hints": [
     "Inside the function: <code>joblib.dump</code>, <code>joblib.load</code>, then the comparison.",
     "<code>np.array_equal(a, b)</code>"
    ],
    "check": {
     "tests": "import os as _os\nfrom sklearn.tree import DecisionTreeClassifier as _DT\nassert ok is True, 'ok = save_and_check(model, X_test, \"churn_v1.joblib\") → True'\nassert _os.path.exists('churn_v1.joblib'), 'The function must save the model to path'\n_t = _DT(max_depth=2, random_state=0).fit(X_test[['tenure_months', 'monthly_fee']], y_test)\nassert save_and_check(_t, X_test[['tenure_months', 'monthly_fee']], '_tree_check.joblib') is True and _os.path.exists('_tree_check.joblib'), 'The function must work with any model'"
    }
   },
   {
    "title": "Card by plan",
    "prompt": "<p>Fairness team: on the test set compute the recall for each <code>plan</code> and write it to the dictionary <code>card['recall_by_plan']</code> (<code>{тариф: recall}</code>, 3 decimal places, <code>zero_division=0</code>). Write the plan with the lowest recall to <code>card['worst_plan']</code>.</p>",
    "hints": [
     "<code>res.groupby('plan')</code> — <code>for p, g in ...</code> for each group.",
     "<code>recall_score(g['y'], g['pred'], zero_division=0)</code>"
    ],
    "check": {
     "tests": "from sklearn.metrics import recall_score as _rs\n_res = pd.DataFrame({'plan': X_test['plan'], 'y': y_test, 'pred': model.predict(X_test)})\n_r = {_p: round(_rs(_g['y'], _g['pred'], zero_division=0), 3) for _p, _g in _res.groupby('plan')}\nassert isinstance(card.get('recall_by_plan'), dict) and set(card['recall_by_plan']) == {'basic', 'standard', 'premium'}, \"card['recall_by_plan'] — a dictionary over the three plans\"\nassert all(abs(card['recall_by_plan'][_p] - _r[_p]) < 1e-9 for _p in _r), 'The recall values are wrong: only the test rows of this plan, 3 decimal places'\nassert card.get('worst_plan') == min(_r, key=_r.get), f\"worst_plan = {min(_r, key=_r.get)} must be\""
    }
   }
  ]
 },
 "mp-ts": {
  "pr": [
   {
    "title": "MAE and MAPE functions",
    "prompt": "<p>Write two functions: <code>mae(y_true, y_pred)</code> — the mean absolute error; <code>mape(y_true, y_pred)</code> — the mean error in percent: <code>mean(|actual − forecast| / actual) · 100</code>. Both must work with lists and with numpy arrays.</p><p>For example, <code>mae([100, 200], [110, 180])</code> → <code>15.0</code>, <code>mape([100, 200], [110, 180])</code> → <code>10.0</code>.</p>",
    "hints": [
     "First convert to an array: <code>np.asarray(y_true, dtype=float)</code>",
     "<code>(np.abs(y_true - y_pred) / y_true).mean() * 100</code>"
    ],
    "check": {
     "tests": "assert mae([100, 200], [110, 180]) is not None and abs(mae([100, 200], [110, 180]) - 15) < 1e-9, \"mae([100, 200], [110, 180]) must be 15\"\nassert mape([100, 200], [110, 180]) is not None and abs(mape([100, 200], [110, 180]) - 10) < 1e-9, \"mape([100, 200], [110, 180]) must be (10% + 10%) / 2 = 10\"\nassert abs(mae(np.array([200, 250, 300]), np.array([210, 240, 330])) - 50 / 3) < 1e-9, \"It must work with numpy arrays too: MAE ≈ 16.7\"\nassert abs(mape([200, 250, 300], [210, 240, 330]) - 19 / 3) < 1e-9, \"The lesson example: MAPE ≈ 6.33\""
    }
   },
   {
    "title": "Splitting by year",
    "prompt": "<p>Split the data by time: <code>train</code> is 2024 (before <code>2025-01-01</code>), <code>test</code> is 2025. Write the row counts to <code>n_train</code>, <code>n_test</code> and the mean sales to <code>train_mean</code>, <code>test_mean</code>. Can you see the trend?</p>",
    "hints": [
     "<code>train = df[df['date'] &lt; '2025-01-01']</code>"
    ],
    "check": {
     "tests": "_d = pd.read_csv('sales_daily.csv', parse_dates=['date'])\n_tr = _d[_d['date'] < '2025-01-01']['sales']; _te = _d[_d['date'] >= '2025-01-01']['sales']\nassert (n_train, n_test) == (366, 364), f\"Expected n_train = 366 (2024 is a leap year), n_test = 364, you have {n_train} and {n_test}\"\nassert train['date'].max() < test['date'].min(), \"All of train must come before test\"\nassert abs(train_mean - _tr.mean()) < 1e-9 and abs(test_mean - _te.mean()) < 1e-9, f\"Expected train_mean ≈ {_tr.mean():.1f}, test_mean ≈ {_te.mean():.1f}\""
    }
   },
   {
    "title": "The mean baseline",
    "prompt": "<p>The simplest baseline: forecast the train mean for the whole future. Train is before <code>2025-07-01</code>, test starts on that day. <code>pred_mean</code> is the mean sales in train, <code>mae_mean</code> is the test MAE.</p>",
    "hints": [
     "<code>pred_mean = train['sales'].mean()</code>",
     "<code>(test['sales'] - pred_mean).abs().mean()</code>"
    ],
    "check": {
     "tests": "_d = pd.read_csv('sales_daily.csv', parse_dates=['date'])\n_m = _d[_d['date'] < '2025-07-01']['sales'].mean()\n_e = (_d[_d['date'] >= '2025-07-01']['sales'] - _m).abs().mean()\nassert abs(pred_mean - _m) < 1e-9, f\"pred_mean must be ≈ {_m:.1f}: the mean of train only (before 2025-07-01)\"\nassert abs(mae_mean - _e) < 1e-9, f\"mae_mean must be ≈ {_e:.1f}: the mean of |sales − pred_mean| on test\""
    }
   },
   {
    "title": "Weekly seasonality",
    "prompt": "<p>Add a column <code>df['dow']</code>: the day of the week, <code>df['date'].dt.dayofweek</code> (0 is Monday, 6 is Sunday). Using train only (before <code>2025-07-01</code>), write the mean sales per day to the Series <code>dow_mean</code>. Write the number of the best-selling day to <code>best_dow</code> (int) and the ratio of the highest mean to the lowest to <code>ratio</code>.</p>",
    "hints": [
     "<code>train.groupby('dow')['sales'].mean()</code>",
     "<code>int(dow_mean.idxmax())</code>"
    ],
    "check": {
     "tests": "import numpy as _np\n_d = pd.read_csv('sales_daily.csv', parse_dates=['date'])\n_d['dow'] = _d['date'].dt.dayofweek\n_g = _d[_d['date'] < '2025-07-01'].groupby('dow')['sales'].mean()\nassert 'dow' in df.columns and (df['dow'] == _d['dow']).all(), \"df['dow'] = df['date'].dt.dayofweek\"\nassert len(dow_mean) == 7 and _np.allclose(_np.asarray(dow_mean, dtype=float), _g.values), \"dow_mean has 7 values, from train only (before 2025-07-01)\"\nassert best_dow == int(_g.idxmax()), f\"best_dow must be {int(_g.idxmax())}\"\nassert abs(ratio - _g.max() / _g.min()) < 1e-9, f\"ratio ≈ {_g.max() / _g.min():.2f}: max / min\""
    }
   },
   {
    "title": "Longer lags and rolling windows",
    "prompt": "<p>Add three features to <code>df</code>: <code>lag_14</code> — the sales 14 days ago; <code>roll_28</code> — the mean of the last 28 days; <code>roll_max7</code> — the maximum of the last 7 days. Today must not be included in the rolling features. Then <code>d = df.dropna()</code> and write its row count to <code>n_rows</code>.</p>",
    "hints": [
     "Exclude today: <code>df['sales'].shift(1).rolling(28).mean()</code>",
     "Maximum: <code>.rolling(7).max()</code>"
    ],
    "check": {
     "tests": "_d = pd.read_csv('sales_daily.csv', parse_dates=['date'])\n_s = _d['sales']\nassert abs(df.loc[30, 'lag_14'] - _s.iloc[16]) < 1e-9, \"lag_14 = shift(14)\"\nassert abs(df.loc[30, 'roll_28'] - _s.iloc[2:30].mean()) < 1e-9, \"roll_28 must not include today's sales: df['sales'].shift(1).rolling(28).mean()\"\nassert abs(df.loc[30, 'roll_max7'] - _s.iloc[23:30].max()) < 1e-9, \"roll_max7: df['sales'].shift(1).rolling(7).max()\"\nassert n_rows == 702 and len(d) == 702, f\"702 rows must remain after dropna (roll_28 is missing for the first 28 days), you have {n_rows}\""
    }
   },
   {
    "title": "The mean of 4 weeks",
    "prompt": "<p>Seasonal naive relies on just one past week. A steadier version: the mean of the same weekday over the past 4 weeks. <code>df['snaive']</code> = the sales 7 days ago, <code>df['snaive4']</code> = the mean of the sales 7, 14, 21 and 28 days ago. Write the MAEs over the test period (from <code>2025-07-01</code>) to <code>mae_snaive</code> and <code>mae_snaive4</code>.</p>",
    "hints": [
     "<code>(df['sales'].shift(7) + df['sales'].shift(14) + df['sales'].shift(21) + df['sales'].shift(28)) / 4</code>",
     "Add the baseline columns before splitting."
    ],
    "check": {
     "tests": "_d = pd.read_csv('sales_daily.csv', parse_dates=['date'])\n_s = _d['sales']; _m = _d['date'] >= '2025-07-01'\n_a = (_s - _s.shift(7)).abs()[_m].mean()\n_b = (_s - (_s.shift(7) + _s.shift(14) + _s.shift(21) + _s.shift(28)) / 4).abs()[_m].mean()\nassert abs(df.loc[40, 'snaive4'] - (_s[33] + _s[26] + _s[19] + _s[12]) / 4) < 1e-9, \"snaive4 is the mean of the values 7, 14, 21, 28 days ago\"\nassert abs(mae_snaive - _a) < 1e-9, f\"mae_snaive must be ≈ {_a:.2f} (the test period only)\"\nassert abs(mae_snaive4 - _b) < 1e-9, f\"mae_snaive4 must be ≈ {_b:.2f} (the test period only)\""
    }
   },
   {
    "title": "Day of week as a feature",
    "prompt": "<p>The features <code>F</code> are ready. Add the day of the week as one-hot features: <code>dummies = pd.get_dummies(df['date'].dt.dayofweek, prefix='dow', drop_first=True, dtype=int)</code>, <code>df = pd.concat([df, dummies], axis=1)</code>, <code>F2 = F + list(dummies.columns)</code>. Then <code>d = df.dropna()</code> and split by time (<code>2025-07-01</code>). Train two <code>LinearRegression</code> models: with <code>F</code> (test MAE → <code>mae_base</code>) and with <code>F2</code> (test MAE → <code>mae_dow</code>).</p>",
    "hints": [
     "<code>pd.concat([df, dummies], axis=1)</code> adds the columns side by side.",
     "Train: <code>d[d['date'] &lt; '2025-07-01']</code>; MAE: <code>np.abs(test['sales'] - pred).mean()</code>"
    ],
    "check": {
     "tests": "_d = pd.read_csv('sales_daily.csv', parse_dates=['date'])\nfrom sklearn.linear_model import LinearRegression as _LR\n_d['lag_1'] = _d['sales'].shift(1); _d['lag_7'] = _d['sales'].shift(7); _d['roll_7'] = _d['sales'].shift(1).rolling(7).mean()\n_dm = pd.get_dummies(_d['date'].dt.dayofweek, prefix='dow', drop_first=True, dtype=int)\n_d = pd.concat([_d, _dm], axis=1).dropna()\n_F = ['lag_1', 'lag_7', 'roll_7', 'promo']; _F2 = _F + list(_dm.columns)\n_tr = _d[_d['date'] < '2025-07-01']; _te = _d[_d['date'] >= '2025-07-01']\n_a = (_te['sales'] - _LR().fit(_tr[_F], _tr['sales']).predict(_te[_F])).abs().mean()\n_b = (_te['sales'] - _LR().fit(_tr[_F2], _tr['sales']).predict(_te[_F2])).abs().mean()\nassert len(F2) == 10, \"F2 must have 10 features: 4 + 6 weekdays (drop_first=True)\"\nassert abs(mae_base - _a) < 1e-6, f\"mae_base must be ≈ {_a:.2f}\"\nassert abs(mae_dow - _b) < 1e-6, f\"mae_dow must be ≈ {_b:.2f}: with the F2 features, train before 2025-07-01\"\nassert mae_dow < mae_base, \"The day of the week should reduce the error\""
    }
   },
   {
    "title": "Forecasting 7 days ahead",
    "prompt": "<p>The shop orders goods a week in advance: the forecast is needed 7 days ahead. So yesterday's sales (lag_1) are unknown. Build features only from values 7 or more days back: <code>h_lag7</code> = shift(7), <code>h_lag14</code> = shift(14), <code>h_roll7</code> = the 7-day mean that ended 7 days ago (<code>shift(7).rolling(7).mean()</code>). <code>H = ['h_lag7', 'h_lag14', 'h_roll7', 'promo']</code>, <code>d = df.dropna()</code>, split at <code>2025-07-01</code>. Write the test MAE of <code>LinearRegression</code> to <code>mae_h7</code> and the MAE of seasonal naive (<code>h_lag7</code>) on the same test rows to <code>mae_snaive</code>.</p>",
    "hints": [
     "<code>df['h_roll7'] = df['sales'].shift(7).rolling(7).mean()</code>",
     "<code>mae_snaive = np.abs(test['sales'] - test['h_lag7']).mean()</code>"
    ],
    "check": {
     "tests": "_d = pd.read_csv('sales_daily.csv', parse_dates=['date'])\nfrom sklearn.linear_model import LinearRegression as _LR\n_s = _d['sales']\nassert abs(df.loc[30, 'h_roll7'] - _s.iloc[17:24].mean()) < 1e-9, \"h_roll7 must not include the last 7 days: df['sales'].shift(7).rolling(7).mean()\"\nassert abs(df.loc[30, 'h_lag7'] - _s.iloc[23]) < 1e-9 and abs(df.loc[30, 'h_lag14'] - _s.iloc[16]) < 1e-9, \"h_lag7 = shift(7), h_lag14 = shift(14)\"\n_d['h_lag7'] = _s.shift(7); _d['h_lag14'] = _s.shift(14); _d['h_roll7'] = _s.shift(7).rolling(7).mean(); _d = _d.dropna()\n_H = ['h_lag7', 'h_lag14', 'h_roll7', 'promo']\n_tr = _d[_d['date'] < '2025-07-01']; _te = _d[_d['date'] >= '2025-07-01']\n_a = (_te['sales'] - _LR().fit(_tr[_H], _tr['sales']).predict(_te[_H])).abs().mean()\n_b = (_te['sales'] - _te['h_lag7']).abs().mean()\nassert abs(mae_h7 - _a) < 1e-6, f\"mae_h7 must be ≈ {_a:.2f}\"\nassert abs(mae_snaive - _b) < 1e-9, f\"mae_snaive must be ≈ {_b:.2f}: |sales − h_lag7| on the test rows\""
    }
   }
  ]
 },
 "mp-gbm": {
  "pr": [
   {
    "title": "The category dtype",
    "prompt": "<p>Convert the <code>city</code> and <code>plan</code> columns of <code>X</code> to the pandas <code>category</code> dtype. Write the number of city categories to <code>n_city</code> and the number of plan categories to <code>n_plan</code> (<code>.cat.categories</code>).</p>",
    "hints": [
     "<code>X[c] = X[c].astype('category')</code>",
     "<code>len(X['city'].cat.categories)</code>"
    ],
    "check": {
     "tests": "assert str(X['city'].dtype) == 'category' and str(X['plan'].dtype) == 'category', \"city and plan must have the category dtype: X[c].astype('category')\"\nassert str(X['age'].dtype) != 'category', \"Do not change the numeric columns\"\nassert n_city == df['city'].nunique() and n_plan == df['plan'].nunique(), f\"Expected n_city = {df['city'].nunique()}, n_plan = {df['plan'].nunique()}\""
    }
   },
   {
    "title": "A parameter translator",
    "prompt": "<p>Using the table from the lesson, write a function <code>translate(params)</code>: it translates a dict of sklearn HistGB parameters into CatBoost names. <code>max_iter</code> → <code>iterations</code>, <code>max_depth</code> → <code>depth</code>, <code>l2_regularization</code> → <code>l2_leaf_reg</code>; other keys (for example, <code>learning_rate</code>) stay the same. The values are kept.</p><p>For example, <code>translate({'max_iter': 500, 'learning_rate': 0.05})</code> → <code>{'iterations': 500, 'learning_rate': 0.05}</code>.</p>",
    "hints": [
     "Make a translation dict, then <code>NAMES.get(k, k)</code>: a key that is not in the dict stays as it is."
    ],
    "check": {
     "tests": "_r = translate({'max_iter': 500, 'learning_rate': 0.05})\nassert _r == {'iterations': 500, 'learning_rate': 0.05}, \"translate({'max_iter': 500, 'learning_rate': 0.05}) → {'iterations': 500, 'learning_rate': 0.05}\"\nassert translate({'max_depth': 4, 'l2_regularization': 3}) == {'depth': 4, 'l2_leaf_reg': 3}, \"max_depth → depth, l2_regularization → l2_leaf_reg\"\nassert translate({}) == {}, \"An empty dict → an empty dict\""
    }
   },
   {
    "title": "A first HistGB",
    "prompt": "<p>Train <code>model = HistGradientBoostingClassifier(max_iter=100, learning_rate=0.1, max_depth=3, early_stopping=False, random_state=0)</code> on the numeric columns (<code>X_train[num]</code>). Write the actual number of trees to <code>n_trees</code> (<code>n_iter_</code>) and the test ROC AUC to <code>auc</code>.</p>",
    "hints": [
     "<code>model.fit(X_train[num], y_train)</code>",
     "<code>roc_auc_score(y_test, model.predict_proba(X_test[num])[:, 1])</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import train_test_split as _tts\nfrom sklearn.ensemble import HistGradientBoostingClassifier as _H\nfrom sklearn.metrics import roc_auc_score as _ras\n_df = pd.read_csv('churn.csv')\n_num = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_df[_num], _df['churned'], test_size=0.25, random_state=0, stratify=_df['churned'])\n_m = _H(max_iter=100, learning_rate=0.1, max_depth=3, early_stopping=False, random_state=0).fit(_Xtr, _ytr)\n_a = _ras(_yte, _m.predict_proba(_Xte)[:, 1])\nassert n_trees == 100, f\"Without early stopping 100 trees are grown, you have {n_trees}\"\nassert abs(auc - _a) < 1e-6, f\"auc must be ≈ {_a:.3f}: check the parameters and random_state=0\""
    }
   },
   {
    "title": "learning_rate and the number of trees",
    "prompt": "<p>For each <code>lr</code> ∈ <code>[0.03, 0.1, 0.3]</code>, train <code>HistGradientBoostingClassifier(max_iter=500, learning_rate=lr, max_depth=3, early_stopping=True, validation_fraction=0.2, n_iter_no_change=10, random_state=0)</code> on the numeric columns. Write the number of trees found by early stopping to <code>iters[lr]</code> and the test ROC AUC to <code>aucs[lr]</code>. How does the number of trees change when the step gets smaller?</p>",
    "hints": [
     "Loop: <code>for lr in [0.03, 0.1, 0.3]:</code>, with the model and <code>iters[lr] = m.n_iter_</code> inside"
    ],
    "check": {
     "tests": "from sklearn.model_selection import train_test_split as _tts\nfrom sklearn.ensemble import HistGradientBoostingClassifier as _H\nfrom sklearn.metrics import roc_auc_score as _ras\n_df = pd.read_csv('churn.csv')\n_num = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_df[_num], _df['churned'], test_size=0.25, random_state=0, stratify=_df['churned'])\n_ms = {lr: _H(max_iter=500, learning_rate=lr, max_depth=3, early_stopping=True, validation_fraction=0.2, n_iter_no_change=10, random_state=0).fit(_Xtr, _ytr) for lr in [0.03, 0.1, 0.3]}\nassert sorted(iters) == [0.03, 0.1, 0.3] and sorted(aucs) == [0.03, 0.1, 0.3], \"Keys: 0.03, 0.1, 0.3\"\nassert all(iters[lr] == _ms[lr].n_iter_ for lr in _ms), f\"The iters values must be {[_ms[k].n_iter_ for k in _ms]}: max_iter=500, early_stopping=True, validation_fraction=0.2, n_iter_no_change=10\"\nassert all(abs(aucs[lr] - _ras(_yte, _ms[lr].predict_proba(_Xte)[:, 1])) < 1e-6 for lr in _ms), \"The test AUC does not match\"\nassert iters[0.03] > iters[0.3], \"A small step needs more trees\""
    }
   },
   {
    "title": "Without filling NaN",
    "prompt": "<p>Churn has missing values in <code>age</code> and <code>data_gb</code>. <code>n_nan</code> is the total number of NaN in <code>X_train[num]</code> (int). Train two models, both <code>HistGradientBoostingClassifier(max_iter=100, learning_rate=0.1, max_depth=3, early_stopping=False, random_state=0)</code>:</p><ul><li><code>raw</code> — directly on <code>X_train[num]</code> (with NaN), test AUC → <code>auc_raw</code>;</li><li><code>filled</code> — on data where NaN are filled with the train median: <code>med = X_train[num].median()</code>, <code>X_train[num].fillna(med)</code> and <code>X_test[num].fillna(med)</code>; test AUC → <code>auc_filled</code>.</li></ul>",
    "hints": [
     "<code>X_train[num].isna().sum().sum()</code> — first per column, then the total",
     "The median comes from train only: <code>med = X_train[num].median()</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import train_test_split as _tts\nfrom sklearn.ensemble import HistGradientBoostingClassifier as _H\nfrom sklearn.metrics import roc_auc_score as _ras\n_df = pd.read_csv('churn.csv')\n_num = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_df[_num], _df['churned'], test_size=0.25, random_state=0, stratify=_df['churned'])\n_med = _Xtr.median()\n_a = _ras(_yte, _H(max_iter=100, learning_rate=0.1, max_depth=3, early_stopping=False, random_state=0).fit(_Xtr, _ytr).predict_proba(_Xte)[:, 1])\n_b = _ras(_yte, _H(max_iter=100, learning_rate=0.1, max_depth=3, early_stopping=False, random_state=0).fit(_Xtr.fillna(_med), _ytr).predict_proba(_Xte.fillna(_med))[:, 1])\nassert n_nan == int(_Xtr.isna().sum().sum()), f\"n_nan must be {int(_Xtr.isna().sum().sum())}\"\nassert abs(auc_raw - _a) < 1e-6, f\"auc_raw must be ≈ {_a:.3f}: the model handles NaN itself\"\nassert abs(auc_filled - _b) < 1e-6, f\"auc_filled must be ≈ {_b:.3f}: fill test with the train median too\""
    }
   },
   {
    "title": "L2 regularization",
    "prompt": "<p>For each <code>l2</code> ∈ <code>[0, 1, 10]</code>, train <code>HistGradientBoostingClassifier(max_iter=200, learning_rate=0.1, max_depth=3, l2_regularization=l2, early_stopping=False, random_state=0)</code> on the numeric columns and write the test ROC AUC to <code>auc_l2[l2]</code>. Write the value with the highest AUC to <code>best_l2</code>.</p>",
    "hints": [
     "<code>l2_regularization=l2</code> is the L2 penalty in sklearn (<code>reg_lambda</code> in XGBoost)",
     "<code>max(auc_l2, key=auc_l2.get)</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import train_test_split as _tts\nfrom sklearn.ensemble import HistGradientBoostingClassifier as _H\nfrom sklearn.metrics import roc_auc_score as _ras\n_df = pd.read_csv('churn.csv')\n_num = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_df[_num], _df['churned'], test_size=0.25, random_state=0, stratify=_df['churned'])\n_a = {l2: _ras(_yte, _H(max_iter=200, learning_rate=0.1, max_depth=3, l2_regularization=l2, early_stopping=False, random_state=0).fit(_Xtr, _ytr).predict_proba(_Xte)[:, 1]) for l2 in [0, 1, 10]}\nassert sorted(auc_l2) == [0, 1, 10], \"The keys of auc_l2: 0, 1, 10\"\nassert all(abs(auc_l2[k] - _a[k]) < 1e-6 for k in _a), \"The AUC values do not match: max_iter=200, l2_regularization=l2, early_stopping=False, random_state=0\"\nassert best_l2 == max(_a, key=_a.get), f\"best_l2 must be {max(_a, key=_a.get)}\""
    }
   },
   {
    "title": "Choosing the number of trees on validation",
    "prompt": "<p>Do early stopping by hand. Split train once more: <code>X_tr, X_val, y_tr, y_val = train_test_split(X_train[num], y_train, test_size=0.25, random_state=0, stratify=y_train)</code>. For each <code>n</code> ∈ <code>[10, 25, 50, 100, 200]</code>, train <code>HistGradientBoostingClassifier(max_iter=n, learning_rate=0.1, max_depth=3, early_stopping=False, random_state=0)</code> on <code>X_tr</code> and write the <b>validation</b> AUC to <code>val_auc[n]</code>. The best <code>n</code> → <code>best_n</code>. Compute that model's test AUC once and write it to <code>test_auc</code>.</p>",
    "hints": [
     "Keep the models in a dict: <code>models[n] = ...fit(X_tr, y_tr)</code>",
     "<code>val_auc[n] = roc_auc_score(y_val, models[n].predict_proba(X_val)[:, 1])</code>",
     "Look at test only once, with the <code>best_n</code> model."
    ],
    "check": {
     "tests": "from sklearn.model_selection import train_test_split as _tts\nfrom sklearn.ensemble import HistGradientBoostingClassifier as _H\nfrom sklearn.metrics import roc_auc_score as _ras\n_df = pd.read_csv('churn.csv')\n_num = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_df[_num], _df['churned'], test_size=0.25, random_state=0, stratify=_df['churned'])\n_a, _v, _b, _w = _tts(_Xtr, _ytr, test_size=0.25, random_state=0, stratify=_ytr)\n_ms = {n: _H(max_iter=n, learning_rate=0.1, max_depth=3, early_stopping=False, random_state=0).fit(_a, _b) for n in [10, 25, 50, 100, 200]}\n_va = {n: _ras(_w, m.predict_proba(_v)[:, 1]) for n, m in _ms.items()}\n_bn = max(_va, key=_va.get)\nassert len(X_tr) == len(_a) and len(X_val) == len(_v), f\"X_tr must have {len(_a)} rows and X_val {len(_v)}: split X_train[num] with test_size=0.25\"\nassert sorted(val_auc) == [10, 25, 50, 100, 200] and all(abs(val_auc[n] - _va[n]) < 1e-6 for n in _va), \"val_auc does not match: the model is trained on X_tr and scored on X_val\"\nassert best_n == _bn, f\"best_n must be {_bn}: the highest validation AUC\"\nassert abs(test_auc - _ras(_yte, _ms[_bn].predict_proba(_Xte)[:, 1])) < 1e-6, \"test_auc is the AUC of the best_n model on X_test[num]\""
    }
   },
   {
    "title": "Category or a number code",
    "prompt": "<p>In <code>X</code>, <code>city</code> and <code>plan</code> have the category dtype. Make a second table <code>X_codes</code>: <code>X.copy()</code>, where both columns become numbers (0, 1, 2…) through <code>X[c].cat.codes</code> — a “fake order”. Split both with <code>train_test_split(..., y, test_size=0.25, random_state=0, stratify=y)</code>. Two models with the parameters <code>max_iter=100, learning_rate=0.1, max_depth=3, early_stopping=False, random_state=0</code>:</p><ul><li><code>native</code> — <code>categorical_features='from_dtype'</code>, on <code>X</code>; test AUC → <code>auc_native</code>;</li><li><code>codes</code> — on <code>X_codes</code> (all numeric); test AUC → <code>auc_codes</code>.</li></ul><p>Is the difference large? There are few cities and plans here (4–5 values), so the difference is small; with hundreds of categories the native way usually wins clearly.</p>",
    "hints": [
     "<code>X_codes[c] = X[c].cat.codes</code>",
     "The same <code>random_state=0</code> and <code>stratify=y</code> give the same rows in both splits."
    ],
    "check": {
     "tests": "from sklearn.model_selection import train_test_split as _tts\nfrom sklearn.ensemble import HistGradientBoostingClassifier as _H\nfrom sklearn.metrics import roc_auc_score as _ras\nassert str(X_codes['city'].dtype) != 'category' and int(X_codes['city'].max()) == X['city'].cat.categories.size - 1, \"In X_codes, city must be a number: X[c].cat.codes\"\n_xa, _xb, _ya, _yb = _tts(X, y, test_size=0.25, random_state=0, stratify=y)\n_ca, _cb, _, _ = _tts(X_codes, y, test_size=0.25, random_state=0, stratify=y)\n_n = _ras(_yb, _H(categorical_features='from_dtype', max_iter=100, learning_rate=0.1, max_depth=3, early_stopping=False, random_state=0).fit(_xa, _ya).predict_proba(_xb)[:, 1])\n_k = _ras(_yb, _H(max_iter=100, learning_rate=0.1, max_depth=3, early_stopping=False, random_state=0).fit(_ca, _ya).predict_proba(_cb)[:, 1])\nassert abs(auc_native - _n) < 1e-6, f\"auc_native must be ≈ {_n:.3f}: categorical_features='from_dtype'\"\nassert abs(auc_codes - _k) < 1e-6, f\"auc_codes must be ≈ {_k:.3f}: on X_codes with the same parameters\""
    }
   }
  ]
 },
 "mp-pca": {
  "pr": [
   {
    "title": "Repeated information",
    "prompt": "<p>The correlation between features shows why PCA helps. <code>r_size</code> is the correlation of <code>rooms</code> and <code>area_m2</code>, <code>r_height</code> is the correlation of <code>floor</code> and <code>floors_total</code> (<code>.corr()</code>).</p>",
    "hints": [
     "<code>flats['rooms'].corr(flats['area_m2'])</code>"
    ],
    "check": {
     "tests": "_r1 = flats['rooms'].corr(flats['area_m2']); _r2 = flats['floor'].corr(flats['floors_total'])\nassert abs(r_size - _r1) < 1e-9, f\"r_size must be ≈ {_r1:.3f}\"\nassert abs(r_height - _r2) < 1e-9, f\"r_height must be ≈ {_r2:.3f}: floor and floors_total\""
    }
   },
   {
    "title": "The share of variance kept",
    "prompt": "<p>Write a function <code>kept_share(variances, k)</code>: given the variances of the components (in decreasing order), return the share of the total variance kept by the first <code>k</code> components.</p><p>For example, <code>kept_share([6, 3, 1], 2)</code> → <code>0.9</code>.</p>",
    "hints": [
     "<code>sum(variances[:k]) / sum(variances)</code>"
    ],
    "check": {
     "tests": "assert kept_share([6, 3, 1], 2) is not None and abs(kept_share([6, 3, 1], 2) - 0.9) < 1e-9, \"kept_share([6, 3, 1], 2) must be 9 / 10 = 0.9\"\nassert abs(kept_share([4, 4, 2], 1) - 0.4) < 1e-9, \"kept_share([4, 4, 2], 1) must be 0.4\"\nassert abs(kept_share([5, 3, 2], 3) - 1) < 1e-9, \"All the components keep 100%\""
    }
   },
   {
    "title": "Components for 95%",
    "prompt": "<p><code>Xs</code> (5 scaled features) is ready. Train <code>PCA(n_components=0.95)</code> named <code>pca</code>: it picks the number of components that keep at least 95% of the variance by itself. Write the chosen number to <code>n95</code> (<code>pca.n_components_</code>) and the kept share to <code>kept</code>.</p>",
    "hints": [
     "<code>pca = PCA(n_components=0.95).fit(Xs)</code>",
     "<code>kept = pca.explained_variance_ratio_.sum()</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.decomposition import PCA as _PCA\n_X = pd.read_csv('flats.csv')[['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']]\n_Xs = _SS().fit_transform(_X)\n_c = _np.cumsum(_PCA().fit(_Xs).explained_variance_ratio_); _n = int(_np.argmax(_c >= 0.95)) + 1\nassert n95 == _n, f\"n95 must be {_n}: PCA(n_components=0.95) on the scaled Xs\"\nassert abs(kept - _c[_n - 1]) < 1e-6 and kept >= 0.95, f\"kept ≈ {_c[_n - 1]:.3f}: explained_variance_ratio_.sum()\""
    }
   },
   {
    "title": "The recipe of the components",
    "prompt": "<p>Train <code>PCA(n_components=2)</code> on <code>Xs</code>. Write the weights to a DataFrame <code>loadings</code>: index <code>['PC1', 'PC2']</code>, columns <code>num</code> (<code>pca.components_</code>). Write the name of the feature with the largest absolute weight in each component to <code>top_pc1</code>, <code>top_pc2</code>.</p>",
    "hints": [
     "<code>pd.DataFrame(pca.components_, index=['PC1', 'PC2'], columns=num)</code>",
     "The sign does not matter: <code>loadings.loc['PC1'].abs().idxmax()</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.decomposition import PCA as _PCA\n_X = pd.read_csv('flats.csv')[['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']]\n_Xs = _SS().fit_transform(_X)\n_L = pd.DataFrame(_PCA(n_components=2).fit(_Xs).components_, index=['PC1', 'PC2'], columns=list(_X.columns))\nassert isinstance(loadings, pd.DataFrame) and loadings.shape == (2, 5) and list(loadings.index) == ['PC1', 'PC2'], \"loadings is a 2 × 5 DataFrame with the index ['PC1', 'PC2']\"\nassert _np.allclose(_np.abs(loadings[list(_X.columns)].values), _np.abs(_L.values), atol=1e-6), \"The weights do not match: PCA(n_components=2) on the scaled Xs\"\nassert top_pc1 == _L.loc['PC1'].abs().idxmax() and top_pc2 == _L.loc['PC2'].abs().idxmax(), f\"Expected top_pc1 = {_L.loc['PC1'].abs().idxmax()}, top_pc2 = {_L.loc['PC2'].abs().idxmax()}\""
    }
   },
   {
    "title": "PCA without scaling",
    "prompt": "<p>Show why scaling is required. Train <code>PCA(n_components=1)</code> twice: on the raw <code>X</code> and on the scaled <code>Xs</code>. Write the absolute PC1 weights to the Series <code>w_raw</code> and <code>w_scaled</code> (index <code>num</code>). <code>raw_top</code> is the feature with the largest weight on the raw data, <code>raw_evr</code> is the variance share of PC1 on the raw data.</p>",
    "hints": [
     "<code>pd.Series(np.abs(p_raw.components_[0]), index=num)</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.decomposition import PCA as _PCA\n_X = pd.read_csv('flats.csv')[['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']]\n_Xs = _SS().fit_transform(_X)\n_pr = _PCA(n_components=1).fit(_X); _ps = _PCA(n_components=1).fit(_Xs)\n_wr = pd.Series(_np.abs(_pr.components_[0]), index=list(_X.columns)); _ws = pd.Series(_np.abs(_ps.components_[0]), index=list(_X.columns))\nassert _np.allclose(_np.asarray(w_raw, dtype=float), _wr.values, atol=1e-6), \"w_raw does not match: PCA(n_components=1) on the raw X, absolute components_[0]\"\nassert _np.allclose(_np.asarray(w_scaled, dtype=float), _ws.values, atol=1e-6), \"w_scaled does not match: on the scaled Xs\"\nassert raw_top == 'area_m2', \"On the raw data PC1 is practically area_m2: raw_top = w_raw.idxmax()\"\nassert abs(raw_evr - _pr.explained_variance_ratio_[0]) < 1e-6, f\"raw_evr must be ≈ {_pr.explained_variance_ratio_[0]:.3f}\""
    }
   },
   {
    "title": "PCA + KMeans",
    "prompt": "<p>Use PCA to prepare for a visualization. <code>X2 = PCA(n_components=2).fit_transform(Xs)</code>. Train <code>km = KMeans(n_clusters=3, n_init=10, random_state=0)</code> on <code>X2</code> and write the labels to <code>labels</code>. Write the cluster sizes in increasing order to the list <code>sizes</code>.</p>",
    "hints": [
     "<code>km.labels_</code> is the cluster of each flat",
     "Sizes: <code>sorted(np.bincount(labels))</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.decomposition import PCA as _PCA\n_X = pd.read_csv('flats.csv')[['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']]\n_Xs = _SS().fit_transform(_X)\nfrom sklearn.cluster import KMeans as _KM\n_X2 = _PCA(n_components=2).fit_transform(_Xs)\n_sz = sorted(int(v) for v in _np.bincount(_KM(n_clusters=3, n_init=10, random_state=0).fit(_X2).labels_))\nassert _np.asarray(X2).shape == (400, 2), \"X2 is 400 × 2: PCA(n_components=2).fit_transform(Xs)\"\nassert len(labels) == 400 and len(set(labels)) == 3, \"labels has 400 values and 3 clusters\"\nassert list(sizes) == _sz, f\"sizes must be {_sz}: KMeans(n_clusters=3, n_init=10, random_state=0) on X2\""
    }
   },
   {
    "title": "Number of components and quality",
    "prompt": "<p>Measure the price of compression. For each <code>k</code> = 1, 2, 3, 4, 5, write the mean 5-fold CV R² of <code>make_pipeline(StandardScaler(), PCA(n_components=k), LinearRegression())</code> to <code>cv_r2[k]</code>. The best <code>k</code> → <code>best_k</code>. How much does R² drop when going from 5 components to 2: <code>drop_2 = cv_r2[5] - cv_r2[2]</code>.</p>",
    "hints": [
     "PCA inside the Pipeline is fitted on the train part of each fold only, so there is no leakage.",
     "<code>cross_val_score(pipe, X, y, cv=5).mean()</code>"
    ],
    "check": {
     "tests": "from sklearn.pipeline import make_pipeline as _mp\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.decomposition import PCA as _PCA\nfrom sklearn.linear_model import LinearRegression as _LR\nfrom sklearn.model_selection import cross_val_score as _cvs\n_r = {k: _cvs(_mp(_SS(), _PCA(n_components=k), _LR()), X, y, cv=5).mean() for k in range(1, 6)}\nassert sorted(cv_r2) == [1, 2, 3, 4, 5], \"The keys of cv_r2: 1, 2, 3, 4, 5\"\nassert all(abs(cv_r2[k] - _r[k]) < 1e-6 for k in _r), \"CV R² does not match: StandardScaler → PCA(n_components=k) → LinearRegression, cv=5\"\nassert best_k == max(_r, key=_r.get), f\"best_k must be {max(_r, key=_r.get)}\"\nassert abs(drop_2 - (_r[5] - _r[2])) < 1e-6, \"drop_2 = cv_r2[5] - cv_r2[2]\""
    }
   },
   {
    "title": "PCA on train only",
    "prompt": "<p>The split is ready. Train <code>pipe = make_pipeline(StandardScaler(), PCA(n_components=3), LinearRegression())</code> on train only and write the test R² to <code>test_r2</code>. Write the variance shares of the PCA inside the Pipeline to <code>evr3</code> (<code>pipe.named_steps['pca']</code>) and the test data in PCA space to <code>Z_test</code> (the <code>transform</code> of the first two steps: <code>pipe[:-1].transform(X_test)</code>).</p>",
    "hints": [
     "<code>make_pipeline</code> names the steps in lowercase: <code>'standardscaler'</code>, <code>'pca'</code>, <code>'linearregression'</code>.",
     "<code>pipe[:-1]</code> is the Pipeline without the last model: scaler + PCA."
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.decomposition import PCA as _PCA\nfrom sklearn.linear_model import LinearRegression as _LR\n_sc = _SS().fit(X_train); _p = _PCA(n_components=3).fit(_sc.transform(X_train))\n_Z = _p.transform(_sc.transform(X_test))\n_r2 = _LR().fit(_p.transform(_sc.transform(X_train)), y_train).score(_Z, y_test)\nassert _np.allclose(pipe.named_steps['standardscaler'].mean_, X_train.mean().values), \"The scaler must be fitted on train only\"\nassert _np.allclose(evr3, _p.explained_variance_ratio_, atol=1e-6), f\"evr3 must be ≈ {_p.explained_variance_ratio_.round(3)}: PCA is fitted on train\"\nassert _np.asarray(Z_test).shape == (100, 3) and _np.allclose(_np.abs(_np.asarray(Z_test)), _np.abs(_Z), atol=1e-6), \"Z_test is 100 × 3: pipe[:-1].transform(X_test) (no fitting on test)\"\nassert abs(test_r2 - _r2) < 1e-6, f\"test_r2 must be ≈ {_r2:.3f}\""
    }
   }
  ]
 },
 "mp-text": {
  "pr": [
   {
    "title": "Getting to know the reviews",
    "prompt": "<p><code>counts</code> is a table of language and label: <code>pd.crosstab(df['lang'], df['label'])</code>. <code>share_neg_kk</code> is the share of <code>negative</code> among the Kazakh (<code>kk</code>) reviews.</p>",
    "hints": [
     "<code>counts.loc['kk', 'negative'] / counts.loc['kk'].sum()</code>"
    ],
    "check": {
     "tests": "_k = df[df['lang'] == 'kk']\nassert isinstance(counts, pd.DataFrame) and counts.shape == (2, 2) and int(counts.values.sum()) == 300, \"counts is a 2 × 2 table summing to 300: pd.crosstab(df['lang'], df['label'])\"\nassert abs(share_neg_kk - (_k['label'] == 'negative').mean()) < 1e-9, f\"share_neg_kk must be ≈ {(_k['label'] == 'negative').mean():.3f}\""
    }
   },
   {
    "title": "The IDF formula",
    "prompt": "<p>IDF in sklearn: <code>idf = ln((1 + n) / (1 + df)) + 1</code>, where <code>n</code> is the number of reviews and <code>df</code> is the number of reviews that contain the word. Write a function <code>idf(n, df_count)</code>.</p><p>For example, <code>idf(225, 100)</code> → <code>1.805</code>.</p>",
    "hints": [
     "<code>math.log((1 + n) / (1 + df_count)) + 1</code>"
    ],
    "check": {
     "tests": "assert idf(225, 100) is not None and abs(idf(225, 100) - 1.80541) < 1e-4, \"idf(225, 100) must be ≈ 1.805\"\nassert abs(idf(225, 3) - 5.03432) < 1e-4, \"A rare word has a higher weight: idf(225, 3) ≈ 5.034\"\nassert abs(idf(10, 10) - 1) < 1e-9, \"A word that appears in every review: idf = 1\""
    }
   },
   {
    "title": "The weight of the word «және»",
    "prompt": "<p><code>vec = TfidfVectorizer().fit(X_train)</code>. Write the IDF weight of the word «және» to <code>idf_jane</code>: it is in the array <code>vec.idf_</code> at the position <code>vec.vocabulary_['және']</code>. For comparison, write the largest IDF to <code>idf_max</code>.</p>",
    "hints": [
     "<code>vec.idf_[vec.vocabulary_['және']]</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.feature_extraction.text import TfidfVectorizer as _TV\nfrom sklearn.linear_model import LogisticRegression as _LR\nfrom sklearn.pipeline import Pipeline as _P\n_df = pd.read_csv('reviews.csv')\n_a, _b, _c, _e = _tts(_df['text'], _df['label'], test_size=0.25, random_state=0, stratify=_df['label'])\n_v = _TV().fit(_a)\n_j = _v.idf_[_v.vocabulary_['және']]\nassert abs(idf_jane - _j) < 1e-9, f\"idf_jane must be ≈ {_j:.3f}: the vectorizer is fitted on X_train only\"\nassert abs(idf_max - _v.idf_.max()) < 1e-9, f\"idf_max must be ≈ {_v.idf_.max():.3f}\"\nassert idf_jane < idf_max, \"A frequent word weighs less than a rare one\""
    }
   },
   {
    "title": "Unigrams and bigrams",
    "prompt": "<p>Train two Pipelines (<code>'tfidf'</code> + <code>'clf'</code>, <code>LogisticRegression(max_iter=1000)</code>): <code>uni</code> with <code>TfidfVectorizer()</code>, <code>bi</code> with <code>TfidfVectorizer(ngram_range=(1, 2))</code>. Write the test accuracies to <code>acc_uni</code>, <code>acc_bi</code> and the vocabulary sizes to <code>n_uni</code>, <code>n_bi</code>.</p>",
    "hints": [
     "<code>Pipeline([('tfidf', TfidfVectorizer()), ('clf', LogisticRegression(max_iter=1000))])</code>",
     "<code>len(bi['tfidf'].vocabulary_)</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.feature_extraction.text import TfidfVectorizer as _TV\nfrom sklearn.linear_model import LogisticRegression as _LR\nfrom sklearn.pipeline import Pipeline as _P\n_df = pd.read_csv('reviews.csv')\n_a, _b, _c, _e = _tts(_df['text'], _df['label'], test_size=0.25, random_state=0, stratify=_df['label'])\n_u = _P([('tfidf', _TV()), ('clf', _LR(max_iter=1000))]).fit(_a, _c)\n_bm = _P([('tfidf', _TV(ngram_range=(1, 2))), ('clf', _LR(max_iter=1000))]).fit(_a, _c)\nassert n_uni == len(_u['tfidf'].vocabulary_) and n_bi == len(_bm['tfidf'].vocabulary_), f\"Expected n_uni = {len(_u['tfidf'].vocabulary_)}, n_bi = {len(_bm['tfidf'].vocabulary_)}\"\nassert abs(acc_uni - _u.score(_b, _e)) < 1e-9 and abs(acc_bi - _bm.score(_b, _e)) < 1e-9, f\"Expected acc_uni ≈ {_u.score(_b, _e):.3f}, acc_bi ≈ {_bm.score(_b, _e):.3f}\""
    }
   },
   {
    "title": "How well we find complaints",
    "prompt": "<p>Complaints (<code>negative</code>) are the class that matters to the business. Train the bigram Pipeline (<code>Pipeline([('tfidf', TfidfVectorizer(ngram_range=(1, 2))), ('clf', LogisticRegression(max_iter=1000))])</code>) named <code>model</code> and compute <code>prec_neg</code> and <code>rec_neg</code> for the <code>negative</code> class on test (<code>pos_label='negative'</code>).</p>",
    "hints": [
     "<code>precision_score(y_test, pred, pos_label='negative')</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.feature_extraction.text import TfidfVectorizer as _TV\nfrom sklearn.linear_model import LogisticRegression as _LR\nfrom sklearn.pipeline import Pipeline as _P\n_df = pd.read_csv('reviews.csv')\n_a, _b, _c, _e = _tts(_df['text'], _df['label'], test_size=0.25, random_state=0, stratify=_df['label'])\nfrom sklearn.metrics import precision_score as _ps, recall_score as _rs\n_pr = _P([('tfidf', _TV(ngram_range=(1, 2))), ('clf', _LR(max_iter=1000))]).fit(_a, _c).predict(_b)\n_pn, _rn = _ps(_e, _pr, pos_label='negative'), _rs(_e, _pr, pos_label='negative')\nassert abs(prec_neg - _pn) < 1e-9, f\"prec_neg must be ≈ {_pn:.3f}: pos_label='negative'\"\nassert abs(rec_neg - _rn) < 1e-9, f\"rec_neg must be ≈ {_rn:.3f}\""
    }
   },
   {
    "title": "Misclassified reviews",
    "prompt": "<p>The most useful diagnostic is reading the errors. Train the bigram Pipeline and collect the test reviews whose prediction does not match the true label in a DataFrame <code>errors</code> with the columns <code>text</code>, <code>true</code>, <code>pred</code>. Write the number of errors to <code>n_err</code>.</p>",
    "hints": [
     "<code>pd.DataFrame({'text': X_test, 'true': y_test, 'pred': model.predict(X_test)})</code>",
     "<code>res[res['true'] != res['pred']]</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.feature_extraction.text import TfidfVectorizer as _TV\nfrom sklearn.linear_model import LogisticRegression as _LR\nfrom sklearn.pipeline import Pipeline as _P\n_df = pd.read_csv('reviews.csv')\n_a, _b, _c, _e = _tts(_df['text'], _df['label'], test_size=0.25, random_state=0, stratify=_df['label'])\n_pr = _P([('tfidf', _TV(ngram_range=(1, 2))), ('clf', _LR(max_iter=1000))]).fit(_a, _c).predict(_b)\n_bad = _b[_pr != _e.values]\nassert isinstance(errors, pd.DataFrame) and {'text', 'true', 'pred'} <= set(errors.columns), \"errors is a DataFrame with the columns text, true, pred\"\nassert n_err == len(_bad) and len(errors) == len(_bad), f\"The number of errors must be {len(_bad)}\"\nassert set(errors['text']) == set(_bad) and (errors['true'] != errors['pred']).all(), \"errors must contain only the rows where true != pred\""
    }
   },
   {
    "title": "Character n-grams",
    "prompt": "<p>Character n-grams help with agglutinative Kazakh. Train <code>char = Pipeline([('tfidf', TfidfVectorizer(analyzer='char_wb', ngram_range=(2, 4))), ('clf', LogisticRegression(max_iter=1000))])</code> and write the test accuracy to <code>acc_char</code>. Write the test accuracy per language to the dict <code>acc_lang</code> (keys <code>'kk'</code>, <code>'ru'</code>; the language: <code>df.loc[X_test.index, 'lang']</code>).</p>",
    "hints": [
     "<code>lang = df.loc[X_test.index, 'lang']</code>; mask: <code>m = (lang == 'kk').values</code>",
     "<code>char.score(X_test[m], y_test[m])</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.feature_extraction.text import TfidfVectorizer as _TV\nfrom sklearn.linear_model import LogisticRegression as _LR\nfrom sklearn.pipeline import Pipeline as _P\n_df = pd.read_csv('reviews.csv')\n_a, _b, _c, _e = _tts(_df['text'], _df['label'], test_size=0.25, random_state=0, stratify=_df['label'])\n_ch = _P([('tfidf', _TV(analyzer='char_wb', ngram_range=(2, 4))), ('clf', _LR(max_iter=1000))]).fit(_a, _c)\n_lg = _df.loc[_b.index, 'lang'].values\n_al = {l: _ch.score(_b[_lg == l], _e[_lg == l]) for l in ['kk', 'ru']}\nassert abs(acc_char - _ch.score(_b, _e)) < 1e-9, f\"acc_char must be ≈ {_ch.score(_b, _e):.3f}: analyzer='char_wb', ngram_range=(2, 4)\"\nassert sorted(acc_lang) == ['kk', 'ru'], \"The keys of acc_lang: 'kk', 'ru'\"\nassert all(abs(acc_lang[l] - _al[l]) < 1e-9 for l in _al), f\"acc_lang must be ≈ {_al}\""
    }
   },
   {
    "title": "Choosing C for a text model",
    "prompt": "<p>With many features, C matters. For each <code>C</code> ∈ <code>[0.1, 1, 10]</code>, write the mean 5-fold CV accuracy on train of <code>Pipeline([('tfidf', TfidfVectorizer(ngram_range=(1, 2))), ('clf', LogisticRegression(C=C, max_iter=1000))])</code> to <code>cv_acc[C]</code>. The best C → <code>best_C</code>. Train with that C on train and write the test accuracy to <code>test_acc</code>.</p>",
    "hints": [
     "A small function that builds the Pipeline is handy: <code>def make(C): return Pipeline([...])</code>",
     "<code>cross_val_score(make(C), X_train, y_train, cv=5).mean()</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.feature_extraction.text import TfidfVectorizer as _TV\nfrom sklearn.linear_model import LogisticRegression as _LR\nfrom sklearn.pipeline import Pipeline as _P\n_df = pd.read_csv('reviews.csv')\n_a, _b, _c, _e = _tts(_df['text'], _df['label'], test_size=0.25, random_state=0, stratify=_df['label'])\nfrom sklearn.model_selection import cross_val_score as _cvs\n_mk = lambda c: _P([('tfidf', _TV(ngram_range=(1, 2))), ('clf', _LR(C=c, max_iter=1000))])\n_s = {c: _cvs(_mk(c), _a, _c, cv=5).mean() for c in [0.1, 1, 10]}\n_bc = max(_s, key=_s.get)\nassert sorted(cv_acc) == [0.1, 1, 10] and all(abs(cv_acc[c] - _s[c]) < 1e-9 for c in _s), \"cv_acc does not match: 5-fold CV on train, keys 0.1, 1, 10\"\nassert best_C == _bc, f\"best_C must be {_bc}\"\nassert abs(test_acc - _mk(_bc).fit(_a, _c).score(_b, _e)) < 1e-9, \"test_acc is the test accuracy of the model trained on train with best_C\""
    }
   }
  ]
 },
 "mp-ops": {
  "pr": [
   {
    "title": "Did income grow",
    "prompt": "<p><code>old</code> is the applications of 2024 (<code>month &lt; '2025-01'</code>), <code>new</code> is those of 2025. Write the mean income to <code>inc_old</code>, <code>inc_new</code> and the growth in percent to <code>growth = (inc_new / inc_old − 1) · 100</code>.</p>",
    "hints": [
     "<code>old = df[df['month'] &lt; '2025-01']</code>"
    ],
    "check": {
     "tests": "_o = df[df['month'] < '2025-01']['income'].mean(); _n = df[df['month'] >= '2025-01']['income'].mean()\nassert abs(inc_old - _o) < 1e-9 and abs(inc_new - _n) < 1e-9, f\"Expected inc_old ≈ {_o:.1f}, inc_new ≈ {_n:.1f}\"\nassert abs(growth - (_n / _o - 1) * 100) < 1e-9, f\"growth must be ≈ {(_n / _o - 1) * 100:.1f}%\""
    }
   },
   {
    "title": "The PSI level",
    "prompt": "<p>Using the table from the lesson, write a function <code>psi_level(v)</code>: for PSI &lt; 0.1 it returns <code>'stable'</code>, from 0.1 to 0.25 (inclusive) <code>'moderate'</code>, above 0.25 <code>'major'</code>.</p>",
    "hints": [
     "Check the conditions from small to large: <code>if v &lt; 0.1</code>, then <code>if v &lt;= 0.25</code>."
    ],
    "check": {
     "tests": "assert psi_level(0.05) == 'stable' and psi_level(0.0) == 'stable', \"PSI < 0.1 → 'stable'\"\nassert psi_level(0.1) == 'moderate' and psi_level(0.25) == 'moderate', \"0.1 and 0.25 are 'moderate' (the bounds are included)\"\nassert psi_level(0.35) == 'major', \"The income PSI of 0.35 in loans → 'major'\""
    }
   },
   {
    "title": "An experiment log",
    "prompt": "<p>You can keep a log without MLflow too: <code>runs</code> is a list of dicts. Write the name of the run with the highest OOT Gini to <code>best_run</code>. For each run, write the difference between the validation and OOT Gini to the dict <code>gaps</code> (<code>{name: gini_val − gini_oot}</code>). Write the run with the largest difference to <code>most_overfit</code>.</p>",
    "hints": [
     "<code>max(runs, key=lambda r: r['gini_oot'])['name']</code>",
     "<code>{r['name']: r['gini_val'] - r['gini_oot'] for r in runs}</code>"
    ],
    "check": {
     "tests": "assert best_run == 'logreg_C01', \"best_run is the run with the highest OOT Gini: logreg_C01\"\nassert set(gaps) == {'logreg_C1', 'logreg_C01', 'boost_d3'} and abs(gaps['boost_d3'] - 0.17) < 1e-9 and abs(gaps['logreg_C1'] - 0.06) < 1e-9, \"gaps = {name: gini_val − gini_oot}\"\nassert most_overfit == 'boost_d3', \"most_overfit is the run with the largest gap: boost_d3 (best on validation, worst on OOT)\""
    }
   },
   {
    "title": "Default by month",
    "prompt": "<p>Write the actual default share per month to the Series <code>rate_by_month</code> (<code>groupby('month')</code>). Write the month with the highest share to <code>worst_month</code>. Write the overall default share in 2024 and 2025 to <code>rate_2024</code>, <code>rate_2025</code>.</p>",
    "hints": [
     "<code>df.groupby('month')['default'].mean()</code>",
     "<code>rate_by_month.idxmax()</code>"
    ],
    "check": {
     "tests": "import numpy as _np\n_g = df.groupby('month')['default'].mean()\nassert len(rate_by_month) == 18 and _np.allclose(_np.asarray(rate_by_month, dtype=float), _g.values), \"rate_by_month is the default share for 18 months\"\nassert worst_month == _g.idxmax(), f\"worst_month must be {_g.idxmax()}\"\nassert abs(rate_2024 - df[df['month'] < '2025-01']['default'].mean()) < 1e-9 and abs(rate_2025 - df[df['month'] >= '2025-01']['default'].mean()) < 1e-9, \"rate_2024, rate_2025 are the shares over all applications of each year\""
    }
   },
   {
    "title": "PSI with 4 groups",
    "prompt": "<p>Compute the income PSI by hand with 4 quartile groups. The edges come from the <b>old</b> period: <code>edges = np.quantile(old['income'], [0, 0.25, 0.5, 0.75, 1])</code>, then <code>edges[0], edges[-1] = -np.inf, np.inf</code>. Shares: <code>e = np.histogram(old['income'], edges)[0] / len(old)</code>, and <code>a</code> the same way for <code>new</code>. <code>psi_inc4 = Σ (a − e) · ln(a / e)</code>.</p>",
    "hints": [
     "<code>a = np.histogram(new['income'], edges)[0] / len(new)</code>",
     "<code>np.sum((a - e) * np.log(a / e))</code>"
    ],
    "check": {
     "tests": "_o = df[df['month'] < '2025-01']['income']; _n = df[df['month'] >= '2025-01']['income']\n_ed = np.quantile(_o, [0, 0.25, 0.5, 0.75, 1]); _ed[0], _ed[-1] = -np.inf, np.inf\n_e = np.histogram(_o, _ed)[0] / len(_o); _a = np.histogram(_n, _ed)[0] / len(_n)\n_v = float(np.sum((_a - _e) * np.log(_a / _e)))\nassert np.allclose(e, _e) and np.allclose(a, _a), \"The shares e, a do not match: edges from the old period, np.histogram(...)[0] / len(...)\"\nassert abs(psi_inc4 - _v) < 1e-9, f\"psi_inc4 must be ≈ {_v:.3f}\""
    }
   },
   {
    "title": "The score PSI",
    "prompt": "<p>The facts are not known yet, but the distribution of the model score can be compared right away. The starter has the function <code>psi()</code> and <code>model</code> trained on <code>dev</code>. <code>s_dev</code> is the predicted probabilities on <code>dev</code>, <code>s_oot</code> those on <code>oot</code>. <code>psi_score = psi(s_dev, s_oot)</code>. Write the mean scores to <code>mean_dev</code>, <code>mean_oot</code>.</p>",
    "hints": [
     "<code>s_oot = model.predict_proba(oot[F])[:, 1]</code>",
     "The first argument is the reference (old) period: <code>psi(s_dev, s_oot)</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.pipeline import make_pipeline as _mp\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\nfrom sklearn.metrics import roc_auc_score as _ras\n_d = pd.read_csv('loans.csv')\n_F = ['age', 'income', 'debt_ratio', 'delays_12m', 'employment_years']\n_dev = _d[_d['month'] <= '2024-09']; _oot = _d[_d['month'] >= '2025-01']\n_m = _mp(_SS(), _LR(max_iter=1000)).fit(_dev[_F], _dev['default'])\n_sd = _m.predict_proba(_dev[_F])[:, 1]; _so = _m.predict_proba(_oot[_F])[:, 1]\nassert len(s_dev) == 630 and len(s_oot) == 420, \"s_dev has 630 and s_oot 420 predictions\"\nassert abs(psi_score - psi(_sd, _so)) < 1e-9, f\"psi_score must be ≈ {psi(_sd, _so):.3f}: psi(s_dev, s_oot)\"\nassert abs(mean_dev - _sd.mean()) < 1e-9 and abs(mean_oot - _so.mean()) < 1e-9, \"mean_dev, mean_oot are the mean scores\""
    }
   },
   {
    "title": "A simple recalibration",
    "prompt": "<p>On OOT the model understates the risk. The simplest recalibration: multiply the probabilities by one factor. <code>oot1</code> is <code>2025-01</code> … <code>2025-03</code>, <code>oot2</code> is <code>2025-04</code> … <code>2025-06</code>.</p><ul><li><code>k</code> = the actual default share in oot1 / the mean prediction in oot1;</li><li><code>p2</code> is the prediction in oot2, <code>p2_new = np.clip(p2 * k, 0, 1)</code>;</li><li><code>pred_before</code>, <code>pred_after</code> are the means of <code>p2</code> and <code>p2_new</code>, <code>fact2</code> is the actual share in oot2;</li><li><code>gini_before</code>, <code>gini_after</code> are the Gini in oot2.</li></ul><p>Was the level fixed? Did Gini change?</p>",
    "hints": [
     "<code>oot1 = oot[oot['month'] &lt;= '2025-03']</code>, <code>oot2 = oot[oot['month'] &gt;= '2025-04']</code>",
     "<code>k = oot1['default'].mean() / model.predict_proba(oot1[F])[:, 1].mean()</code>",
     "Multiplying by one number does not change the order, so Gini stays the same."
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.pipeline import make_pipeline as _mp\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\nfrom sklearn.metrics import roc_auc_score as _ras\n_d = pd.read_csv('loans.csv')\n_F = ['age', 'income', 'debt_ratio', 'delays_12m', 'employment_years']\n_dev = _d[_d['month'] <= '2024-09']; _oot = _d[_d['month'] >= '2025-01']\n_m = _mp(_SS(), _LR(max_iter=1000)).fit(_dev[_F], _dev['default'])\n_o1 = _oot[_oot['month'] <= '2025-03']; _o2 = _oot[_oot['month'] >= '2025-04']\n_k = _o1['default'].mean() / _m.predict_proba(_o1[_F])[:, 1].mean()\n_p2 = _m.predict_proba(_o2[_F])[:, 1]; _pn = _np.clip(_p2 * _k, 0, 1)\nassert abs(k - _k) < 1e-9, f\"k must be ≈ {_k:.3f}: the actual share / the mean prediction in oot1\"\nassert abs(pred_before - _p2.mean()) < 1e-9 and abs(pred_after - _pn.mean()) < 1e-9, f\"Expected pred_before ≈ {_p2.mean():.3f}, pred_after ≈ {_pn.mean():.3f} (in oot2)\"\nassert abs(fact2 - _o2['default'].mean()) < 1e-9, f\"fact2 ≈ {_o2['default'].mean():.3f}: oot2['default'].mean()\"\nassert abs(gini_before - (2 * _ras(_o2['default'], _p2) - 1)) < 1e-9 and abs(gini_after - (2 * _ras(_o2['default'], _pn) - 1)) < 1e-9, \"Gini is computed on oot2: 2 * AUC - 1\"\nassert abs(fact2 - pred_after) < abs(fact2 - pred_before), \"After recalibration the mean prediction should get closer to the actual share\""
    }
   },
   {
    "title": "A monthly monitoring table",
    "prompt": "<p>Build the table for a monitoring dashboard. <code>model</code>, trained on <code>dev</code>, is ready. For each OOT month (<code>2025-01</code> … <code>2025-06</code>), compute three numbers: <code>gini</code> (2 · AUC − 1), <code>pd_pred</code> (the mean prediction) and <code>pd_fact</code> (the actual default share). The result is a DataFrame <code>monitor</code>: the index is the month (ascending), the columns are <code>gini</code>, <code>pd_pred</code>, <code>pd_fact</code>. <code>gap_max</code> is the largest value of <code>pd_fact − pd_pred</code> across the months.</p>",
    "hints": [
     "<code>for month, g in oot.groupby('month'):</code>",
     "A table from a dict of dicts: <code>pd.DataFrame(rows).T</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.pipeline import make_pipeline as _mp\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\nfrom sklearn.metrics import roc_auc_score as _ras\n_d = pd.read_csv('loans.csv')\n_F = ['age', 'income', 'debt_ratio', 'delays_12m', 'employment_years']\n_dev = _d[_d['month'] <= '2024-09']; _oot = _d[_d['month'] >= '2025-01']\n_m = _mp(_SS(), _LR(max_iter=1000)).fit(_dev[_F], _dev['default'])\n_ms = sorted(_oot['month'].unique())\n_r = {mo: (2 * _ras(g['default'], _m.predict_proba(g[_F])[:, 1]) - 1, _m.predict_proba(g[_F])[:, 1].mean(), g['default'].mean()) for mo, g in _oot.groupby('month')}\nassert isinstance(monitor, pd.DataFrame) and list(monitor.index) == _ms, f\"The index of monitor is the OOT months in ascending order: {_ms}\"\nassert {'gini', 'pd_pred', 'pd_fact'} <= set(monitor.columns), \"Columns: gini, pd_pred, pd_fact\"\nassert all(abs(float(monitor.loc[mo, 'gini']) - _r[mo][0]) < 1e-6 for mo in _ms), \"gini does not match: 2 * AUC - 1 in each month\"\nassert all(abs(float(monitor.loc[mo, 'pd_pred']) - _r[mo][1]) < 1e-9 and abs(float(monitor.loc[mo, 'pd_fact']) - _r[mo][2]) < 1e-9 for mo in _ms), \"pd_pred is the mean prediction, pd_fact the actual share (in each month)\"\nassert abs(gap_max - max(_r[mo][2] - _r[mo][1] for mo in _ms)) < 1e-9, \"gap_max = (pd_fact - pd_pred).max()\""
    }
   }
  ]
 },
 "mp-anom": {
  "pr": [
   {
    "title": "Why accuracy lies",
    "prompt": "<p><code>n_fraud</code> is the number of fraudulent transactions (int), <code>fraud_rate</code> is their share. Write the accuracy of a “model” that calls every transaction “clean” to <code>acc_all_clean</code>.</p>",
    "hints": [
     "<code>(df['is_fraud'] == 0).mean()</code>"
    ],
    "check": {
     "tests": "assert n_fraud == 30, \"n_fraud must be 30\"\nassert abs(fraud_rate - 0.03) < 1e-9, \"fraud_rate = 0.03\"\nassert abs(acc_all_clean - 0.97) < 1e-9, \"The accuracy of a model that finds nothing is 0.97\""
    }
   },
   {
    "title": "The z-score rule",
    "prompt": "<p>Write a function <code>z_flags(values, k=3)</code>: it returns a bool array that is <code>True</code> for values with <code>|x − mean| / std &gt; k</code> and <code>False</code> otherwise. <code>std</code> is <code>np.std</code> (the default).</p><p>For example, <code>z_flags([1, 1, 1, 1, 1, 1, 1, 1, 1, 100], k=2)</code> flags only the last value.</p>",
    "hints": [
     "<code>x = np.asarray(values, dtype=float)</code>; <code>np.abs(x - x.mean()) / x.std() &gt; k</code>"
    ],
    "check": {
     "tests": "_r = z_flags([1, 1, 1, 1, 1, 1, 1, 1, 1, 100], k=2)\nassert _r is not None and list(np.asarray(_r)) == [False] * 9 + [True], \"z_flags([1, ..., 1, 100], k=2) must flag only the last value\"\nassert not np.asarray(z_flags([10, 12, 11, 13, 9, 10])).any(), \"With no outliers everything is False (k=3 by default)\"\nassert list(np.asarray(z_flags([0, 0, 0, 10], k=1))) == [False, False, False, True], \"The k parameter must be used: z_flags([0, 0, 0, 10], k=1)\""
    }
   },
   {
    "title": "A business rule",
    "prompt": "<p>The rule: “new device <b>and</b> abroad”. <code>rule</code> is the transactions where <code>new_device == 1</code> and <code>foreign == 1</code> (a bool Series). <code>n_alerts</code> is the number of alerts, <code>n_hit</code> the number of frauds among them, <code>prec_rule</code> the precision.</p>",
    "hints": [
     "<code>(df['new_device'] == 1) &amp; (df['foreign'] == 1)</code>"
    ],
    "check": {
     "tests": "_r = (df['new_device'] == 1) & (df['foreign'] == 1)\n_h = int((_r & (df['is_fraud'] == 1)).sum())\nassert len(rule) == 1000 and int(rule.sum()) == int(_r.sum()), \"rule is the rows where both conditions hold (&)\"\nassert n_alerts == int(_r.sum()) and n_hit == _h, f\"Expected n_alerts = {int(_r.sum())}, n_hit = {_h}\"\nassert abs(prec_rule - _h / _r.sum()) < 1e-9, \"prec_rule = n_hit / n_alerts\""
    }
   },
   {
    "title": "A log z-score",
    "prompt": "<p>The amount is skewed, so take the logarithm first. <code>log_amt = np.log(df['amount'])</code>, <code>z = (log_amt − log_amt.mean()) / log_amt.std()</code>. <code>flag</code> is the transactions with <code>z &gt; 3</code> (only amounts that are too large). Compute <code>n_flag</code>, <code>precision_z</code>, <code>recall_z</code>.</p>",
    "hints": [
     "<code>z = (log_amt - log_amt.mean()) / log_amt.std()</code>",
     "Recall: frauds found / all frauds (30)"
    ],
    "check": {
     "tests": "_l = np.log(df['amount']); _z = (_l - _l.mean()) / _l.std(); _f = _z > 3\n_h = int((_f & (df['is_fraud'] == 1)).sum())\nassert n_flag == int(_f.sum()), f\"n_flag must be {int(_f.sum())}: the z-score of the log > 3\"\nassert abs(precision_z - _h / _f.sum()) < 1e-9, f\"precision_z must be ≈ {_h / _f.sum():.3f}\"\nassert abs(recall_z - _h / df['is_fraud'].sum()) < 1e-9, f\"recall_z must be ≈ {_h / df['is_fraud'].sum():.3f}\""
    }
   },
   {
    "title": "A precision@k function",
    "prompt": "<p>Write a function <code>precision_at_k(y_true, scores, k)</code>: it returns the share of the positive class among the <code>k</code> examples with the highest score. Get the order with <code>np.argsort(-scores, kind='stable')</code>. Then use the amount itself as the “model” and compute <code>p30_amount = precision_at_k(df['is_fraud'], df['amount'], 30)</code>.</p>",
    "hints": [
     "<code>top = np.argsort(-np.asarray(scores, dtype=float), kind='stable')[:k]</code>",
     "<code>np.asarray(y_true)[top].mean()</code>"
    ],
    "check": {
     "tests": "_r = precision_at_k([1, 0, 1, 0, 0], [0.9, 0.8, 0.7, 0.2, 0.1], 2)\nassert _r is not None and abs(_r - 0.5) < 1e-9, \"precision_at_k([1, 0, 1, 0, 0], [0.9, 0.8, 0.7, 0.2, 0.1], 2) must be 0.5: one fraud in the top 2\"\nassert abs(precision_at_k([0, 0, 1], [1, 2, 3], 1) - 1) < 1e-9, \"The example with the highest score comes first\"\n_t = np.argsort(-df['amount'].values.astype(float), kind='stable')[:30]\nassert abs(p30_amount - df['is_fraud'].values[_t].mean()) < 1e-9, f\"p30_amount must be ≈ {df['is_fraud'].values[_t].mean():.3f}\""
    }
   },
   {
    "title": "Two rules together",
    "prompt": "<p>Combine two rules: <code>rule_a</code> — <code>amount</code> is above the upper bound of the IQR rule (<code>Q3 + 1.5 · IQR</code>); <code>rule_b</code> — <code>tx_24h &gt;= 8</code>. An alert: <code>alerts = rule_a | rule_b</code>. Compute <code>n_alerts</code>, <code>precision_ab</code>, <code>recall_ab</code>.</p>",
    "hints": [
     "<code>rule_a = df['amount'] &gt; q3 + 1.5 * (q3 - q1)</code>",
     "“Or”: <code>rule_a | rule_b</code>"
    ],
    "check": {
     "tests": "_q1, _q3 = df['amount'].quantile(0.25), df['amount'].quantile(0.75)\n_al = (df['amount'] > _q3 + 1.5 * (_q3 - _q1)) | (df['tx_24h'] >= 8)\n_h = int((_al & (df['is_fraud'] == 1)).sum())\nassert int(rule_b.sum()) == int((df['tx_24h'] >= 8).sum()), \"rule_b = tx_24h >= 8\"\nassert n_alerts == int(_al.sum()), f\"n_alerts must be {int(_al.sum())}: rule_a | rule_b\"\nassert abs(precision_ab - _h / _al.sum()) < 1e-9 and abs(recall_ab - _h / df['is_fraud'].sum()) < 1e-9, f\"Expected precision_ab ≈ {_h / _al.sum():.3f}, recall_ab ≈ {_h / 30:.3f}\""
    }
   },
   {
    "title": "IsolationForest.predict",
    "prompt": "<p>Try working with a ready threshold instead of the score. Train <code>iso = IsolationForest(n_estimators=100, contamination=0.05, random_state=0)</code> on <code>df[F]</code>. <code>pred = iso.predict(df[F])</code>: <code>-1</code> is an anomaly, <code>1</code> is normal. <code>flag = pred == -1</code>. Compute <code>n_anom</code>, <code>precision_iso</code>, <code>recall_iso</code>. How does <code>contamination</code> affect the number of alerts?</p>",
    "hints": [
     "Do not give <code>is_fraud</code> to the model: only <code>df[F]</code>.",
     "<code>hit = int((flag &amp; (df['is_fraud'].values == 1)).sum())</code>"
    ],
    "check": {
     "tests": "from sklearn.ensemble import IsolationForest as _IF\n_F = ['amount', 'hour', 'tx_24h', 'new_device', 'foreign']\n_p = _IF(n_estimators=100, contamination=0.05, random_state=0).fit(df[_F]).predict(df[_F])\n_f = _p == -1; _h = int((_f & (df['is_fraud'].values == 1)).sum())\nassert n_anom == int(_f.sum()), f\"n_anom must be {int(_f.sum())}: contamination=0.05 means about 5% alerts\"\nassert abs(precision_iso - _h / _f.sum()) < 1e-9, f\"precision_iso must be ≈ {_h / _f.sum():.3f}\"\nassert abs(recall_iso - _h / 30) < 1e-9, f\"recall_iso must be ≈ {_h / 30:.3f}\""
    }
   },
   {
    "title": "The model or the amount",
    "prompt": "<p>Is IsolationForest better than the simple “largest amount” rule? Write the function <code>precision_at_k</code> (the positive share among the <code>k</code> with the highest score, <code>np.argsort(-scores, kind='stable')</code>). Train <code>IsolationForest(n_estimators=100, contamination=0.03, random_state=0)</code>, <code>score = -iso.score_samples(df[F])</code>. For each <code>k</code> ∈ <code>[10, 30, 50]</code>, compute <code>p_iso[k]</code> (by the score) and <code>p_amt[k]</code> (by <code>amount</code>).</p>",
    "hints": [
     "<code>top = np.argsort(-np.asarray(scores, dtype=float), kind='stable')[:k]</code>",
     "<code>p_iso[k] = precision_at_k(df['is_fraud'], score, k)</code>"
    ],
    "check": {
     "tests": "from sklearn.ensemble import IsolationForest as _IF\n_F = ['amount', 'hour', 'tx_24h', 'new_device', 'foreign']\n_s = -_IF(n_estimators=100, contamination=0.03, random_state=0).fit(df[_F]).score_samples(df[_F])\n_y = df['is_fraud'].values\n_pk = lambda sc, k: _y[np.argsort(-np.asarray(sc, dtype=float), kind='stable')[:k]].mean()\nassert abs(precision_at_k([1, 0, 1, 0], [0.9, 0.8, 0.7, 0.1], 2) - 0.5) < 1e-9, \"precision_at_k([1, 0, 1, 0], [0.9, 0.8, 0.7, 0.1], 2) must be 0.5\"\nassert sorted(p_iso) == [10, 30, 50] and sorted(p_amt) == [10, 30, 50], \"Keys: 10, 30, 50\"\nassert all(abs(p_iso[k] - _pk(_s, k)) <= 1 / k + 1e-9 for k in [10, 30, 50]), \"p_iso does not match: score = -iso.score_samples(df[F]); n_estimators=100, contamination=0.03, random_state=0\"\nassert all(abs(p_amt[k] - _pk(df['amount'], k)) <= 1 / k + 1e-9 for k in [10, 30, 50]), \"p_amt does not match: use df['amount'] as the score\""
    }
   }
  ]
 },
 "mp-rec": {
  "pr": [
   {
    "title": "Basket size",
    "prompt": "<p><code>basket</code> is the number of purchases of each customer (<code>groupby('user_id').size()</code>). Write its mean to <code>avg_basket</code> and the number of customers who bought just one item to <code>n_single</code> (int): item-item recommendations are hard for them.</p>",
    "hints": [
     "<code>basket = df.groupby('user_id').size()</code>",
     "<code>int((basket == 1).sum())</code>"
    ],
    "check": {
     "tests": "_b = df.groupby('user_id').size()\nassert len(basket) == 117, \"basket has 117 customers\"\nassert abs(avg_basket - _b.mean()) < 1e-9, f\"avg_basket must be ≈ {_b.mean():.2f}\"\nassert n_single == int((_b == 1).sum()), f\"n_single must be {int((_b == 1).sum())}\""
    }
   },
   {
    "title": "Cosine between sets",
    "prompt": "<p>For 0/1 vectors, the cosine = common buyers / √(|A| · |B|). Write a function <code>cosine_sets(a, b)</code>: <code>a</code>, <code>b</code> are the sets of customers who bought each item.</p><p>For example, <code>cosine_sets({1, 2, 3}, {2, 3, 4, 5})</code> → <code>0.577</code>.</p>",
    "hints": [
     "Common elements: <code>a &amp; b</code>",
     "<code>len(a &amp; b) / math.sqrt(len(a) * len(b))</code>"
    ],
    "check": {
     "tests": "assert cosine_sets({1, 2, 3}, {2, 3, 4, 5}) is not None and abs(cosine_sets({1, 2, 3}, {2, 3, 4, 5}) - 2 / 12 ** 0.5) < 1e-9, \"cosine_sets({1, 2, 3}, {2, 3, 4, 5}) must be 2 / √12 ≈ 0.577\"\nassert abs(cosine_sets({7, 8}, {7, 8}) - 1) < 1e-9, \"Identical sets: 1\"\nassert cosine_sets({1}, {2, 3}) == 0, \"No common customers: 0\""
    }
   },
   {
    "title": "precision@k of a recommendation",
    "prompt": "<p>Write a function <code>precision_at_k(recommended, bought, k)</code>: it returns the share of the first <code>k</code> items of the list <code>recommended</code> that are in <code>bought</code>.</p><p>For example, <code>precision_at_k(['сөмке', 'ноутбук', 'кітап'], ['ноутбук'], 3)</code> → <code>0.333</code>.</p>",
    "hints": [
     "<code>len(set(recommended[:k]) &amp; set(bought)) / k</code>"
    ],
    "check": {
     "tests": "_r = precision_at_k(['сөмке', 'ноутбук', 'кітап'], ['ноутбук'], 3)\nassert _r is not None and abs(_r - 1 / 3) < 1e-9, \"One of three recommendations was bought: 1/3\"\nassert abs(precision_at_k(['a', 'b', 'c', 'd', 'e'], ['b', 'e', 'x'], 5) - 0.4) < 1e-9, \"The lesson example: precision@5 = 2 / 5 = 0.4\"\nassert precision_at_k(['a', 'b', 'c'], ['c'], 2) == 0, \"Only the first k items count\""
    }
   },
   {
    "title": "Popular, minus what was bought",
    "prompt": "<p><code>pop = df['item'].value_counts()</code>. Write a function <code>popular_for(user_id, k=3)</code>: it returns a list of the <code>k</code> most popular items (in the order of <code>pop</code>) that the customer has not bought yet.</p>",
    "hints": [
     "<code>owned = set(df.loc[df['user_id'] == user_id, 'item'])</code>",
     "<code>[i for i in pop.index if i not in owned][:k]</code>"
    ],
    "check": {
     "tests": "_pop = df['item'].value_counts()\n_own = lambda u: set(df.loc[df['user_id'] == u, 'item'])\n_ok = lambda u: [i for i in _pop.index if i not in _own(u)][:3]\n_us = [u for u in sorted(df['user_id'].unique())[:40] if len(_own(u) & set(_pop.index[:5])) <= 2]\nassert popular_for(1) is not None and list(popular_for(1)) == ['бөтелке', 'зарядтағыш', 'смартфон'], \"popular_for(1) → ['бөтелке', 'зарядтағыш', 'смартфон']\"\nassert all(list(popular_for(u)) == _ok(u) for u in _us), \"Items the customer bought must not be recommended; the order follows pop\"\nassert len(popular_for(1, k=5)) == 5, \"The k parameter must be used\""
    }
   },
   {
    "title": "Co-purchase counts",
    "prompt": "<p>The user-item matrix <code>M</code> (0/1) is ready. <code>co = M.T @ M</code> is a 15 × 15 table: a cell holds the number of customers who bought both items, the diagonal holds each item's own sales. <code>n_both</code> is how many customers bought both смартфон and құлаққап (int). <code>co_phone</code> is the 3 items most often bought together with смартфон (excluding itself, in decreasing order).</p>",
    "hints": [
     "<code>M.T @ M</code> is a matrix product; the result is a DataFrame indexed by items on both axes",
     "<code>co['смартфон'].drop('смартфон').sort_values(ascending=False).head(3).index</code>"
    ],
    "check": {
     "tests": "_u = set(df.loc[df['item'] == 'смартфон', 'user_id']); _h = set(df.loc[df['item'] == 'құлаққап', 'user_id'])\n_cnt = {i: len(_u & set(df.loc[df['item'] == i, 'user_id'])) for i in df['item'].unique() if i != 'смартфон'}\nassert co.shape == (15, 15) and int(co.loc['смартфон', 'смартфон']) == len(_u), \"co is 15 × 15: M.T @ M; the diagonal holds the item sales\"\nassert n_both == len(_u & _h), f\"n_both must be {len(_u & _h)}\"\nassert len(co_phone) == 3 and 'смартфон' not in co_phone and sorted((_cnt[i] for i in co_phone), reverse=True) == sorted(_cnt.values(), reverse=True)[:3], \"co_phone is the 3 items most often bought with смартфон\""
    }
   },
   {
    "title": "A similar-items function",
    "prompt": "<p>A “people who bought this also bought” block. <code>sim</code> is the table of cosine similarity between items (<code>cosine_similarity(M.T)</code>). The function <code>similar_items(item, k=3)</code> returns a list of the <code>k</code> items most similar to <code>item</code> (excluding itself, by decreasing similarity).</p>",
    "hints": [
     "<code>sim = pd.DataFrame(cosine_similarity(M.T), index=M.columns, columns=M.columns)</code>",
     "<code>sim[item].drop(item).sort_values(ascending=False).head(k).index</code>"
    ],
    "check": {
     "tests": "_A = M.values.astype(float); _nr = np.sqrt((_A ** 2).sum(axis=0))\n_S = pd.DataFrame((_A.T @ _A) / np.outer(_nr, _nr), index=M.columns, columns=M.columns)\n_top = lambda it, k: sorted(_S[it].drop(it).values, reverse=True)[:k]\n_chk = lambda it, k: len(similar_items(it, k)) == k and it not in similar_items(it, k) and _np_ok(it, k)\n_np_ok = lambda it, k: np.allclose(sorted((_S.loc[it, j] for j in similar_items(it, k)), reverse=True), _top(it, k))\nassert similar_items('ноутбук') is not None and _chk('ноутбук', 3), \"similar_items('ноутбук') is the 3 items with the highest cosine to ноутбук (excluding itself)\"\nassert _chk('футболка', 3) and _chk('смартфон', 5), \"It must work for other items and k too\""
    }
   },
   {
    "title": "Offline evaluation of popularity",
    "prompt": "<p>For every customer with at least 2 purchases, the last purchase is hidden: <code>test</code> holds the hidden ones, <code>train</code> the rest. Evaluate the popularity baseline: <code>pop = train['item'].value_counts()</code>; recommend to each test customer the first 3 items in the order of <code>pop</code> that they did not buy in train. If the hidden item is among those 3, it is a “hit”. <code>hit_pop</code> is the hit share, <code>n_users</code> the number of test customers.</p>",
    "hints": [
     "<code>for u, hidden in zip(test['user_id'], test['item']):</code>",
     "<code>owned = set(train.loc[train['user_id'] == u, 'item'])</code>; <code>recs = [i for i in pop.index if i not in owned][:3]</code>"
    ],
    "check": {
     "tests": "_cnt = df['user_id'].value_counts()\n_mu = df[df['user_id'].isin(_cnt[_cnt >= 2].index)]\n_te = _mu.groupby('user_id').tail(1); _tr = df.drop(_te.index)\n_pop = _tr['item'].value_counts()\n_h = [it in [i for i in _pop.index if i not in set(_tr.loc[_tr['user_id'] == u, 'item'])][:3] for u, it in zip(_te['user_id'], _te['item'])]\nassert n_users == len(_te), f\"n_users must be {len(_te)}\"\nassert abs(hit_pop - np.mean(_h)) <= 0.03, f\"hit_pop must be ≈ {np.mean(_h):.3f}: pop = train['item'].value_counts(), drop the items already bought\""
    }
   },
   {
    "title": "Offline evaluation of item-item",
    "prompt": "<p>Evaluate item-item on the same split. From train only: <code>M = pd.crosstab(train['user_id'], train['item'])</code>, <code>sim = cosine_similarity(M.T)</code>. For each test customer, the score = <code>sim @ M.loc[u].values</code>; drop the items bought in train and recommend the 3 items with the highest score (<code>sort_values(ascending=False, kind='stable')</code>). <code>hit_item</code> is the hit share. For comparison, the popularity hit share is <code>hit_pop</code> (as in the previous task). <code>better</code> = <code>'item'</code> or <code>'pop'</code>.</p>",
    "hints": [
     "<code>own = M.loc[u]</code>; <code>scores = pd.Series(sim @ own.values, index=M.columns)</code>",
     "<code>scores[own == 0].sort_values(ascending=False, kind='stable').head(3).index</code>",
     "Every test customer is in train (at least 1 purchase is left), so <code>M.loc[u]</code> does not fail."
    ],
    "check": {
     "tests": "_cnt = df['user_id'].value_counts()\n_mu = df[df['user_id'].isin(_cnt[_cnt >= 2].index)]\n_te = _mu.groupby('user_id').tail(1); _tr = df.drop(_te.index)\nfrom sklearn.metrics.pairwise import cosine_similarity as _cs\n_M = pd.crosstab(_tr['user_id'], _tr['item']); _S = _cs(_M.T); _pop = _tr['item'].value_counts()\n_hi = []; _hp = []\nfor _u, _it in zip(_te['user_id'], _te['item']):\n    _o = _M.loc[_u]; _sc = pd.Series(_S @ _o.values, index=_M.columns)\n    _hi.append(_it in list(_sc[_o == 0].sort_values(ascending=False, kind='stable').head(3).index))\n    _hp.append(_it in [i for i in _pop.index if _o.get(i, 0) == 0][:3])\nassert abs(hit_item - np.mean(_hi)) <= 0.03, f\"hit_item must be ≈ {np.mean(_hi):.3f}: sim from train only, bought items are removed\"\nassert abs(hit_pop - np.mean(_hp)) <= 0.03, f\"hit_pop must be ≈ {np.mean(_hp):.3f}\"\nassert better == ('item' if np.mean(_hi) > np.mean(_hp) else 'pop'), \"better is the approach with the higher hit share\""
    }
   }
  ]
 }
} });
