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
 }
} });
