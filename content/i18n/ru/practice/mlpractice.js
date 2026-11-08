// mlpractice practice tasks: Russian text. Code, solutions and checks are in content/practice/mlpractice.js.
DJ.i18n.patch({ lessons: {
 "mp-1": {
  "pr": [
   {
    "title": "Заполнение медианой",
    "prompt": "<p>В <code>age</code> и <code>data_gb</code> есть пустые значения. Обучите <code>SimpleImputer(strategy='median')</code> под именем <code>imp</code> на <code>df[['age', 'data_gb']]</code> и запишите заполненный массив в <code>filled</code> (<code>fit_transform</code>).</p>",
    "hints": [
     "<code>imp.fit_transform(df[['age', 'data_gb']])</code>",
     "<code>imp.statistics_</code> — медиана каждого столбца."
    ],
    "check": {
     "tests": "import numpy as _np\nassert _np.asarray(filled).shape == (600, 2), 'Форма filled должна быть (600, 2)'\nassert not _np.isnan(_np.asarray(filled, dtype=float)).any(), 'В filled не должно остаться NaN'\nassert _np.allclose(imp.statistics_, [df['age'].median(), df['data_gb'].median()]), \"imp должен заполнять медианой: strategy='median'\""
    }
   },
   {
    "title": "Масштаб и регрессия",
    "prompt": "<p>Обучите <code>make_pipeline(StandardScaler(), LinearRegression())</code> под именем <code>pipe</code> на train и запишите тестовый R² в <code>pipe_r2</code>. Тестовый R² <code>LinearRegression</code> без масштабирования запишите в <code>plain_r2</code>. Влияет ли масштаб на линейную регрессию?</p>",
    "hints": [
     "<code>make_pipeline(StandardScaler(), LinearRegression()).fit(X_train, y_train)</code>"
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _P\nfrom sklearn.linear_model import LinearRegression as _LinR\n_r = _LinR().fit(X_train, y_train).score(X_test, y_test)\nassert isinstance(pipe, _P) and hasattr(pipe[-1], 'coef_'), 'pipe — обученный Pipeline (make_pipeline)'\nassert abs(plain_r2 - _r) < 1e-9, f'plain_r2 должно быть ≈ {_r:.4f}'\nassert abs(pipe_r2 - _r) < 1e-9, 'Для линейной регрессии масштаб не меняет R²: pipe_r2 = plain_r2'"
    }
   },
   {
    "title": "Названия столбцов города",
    "prompt": "<p>Обучите <code>OneHotEncoder(handle_unknown='ignore')</code> под именем <code>ohe</code> на <code>df[['city']]</code>. Названия получившихся столбцов, полученные через <code>get_feature_names_out()</code>, запишите в список <code>names</code>.</p>",
    "hints": [
     "<code>ohe.get_feature_names_out()</code> возвращает массив: <code>list(...)</code>"
    ],
    "check": {
     "tests": "assert len(names) == 5, 'В names должно быть 5 столбцов городов'\nassert all(str(_n).startswith('city_') for _n in names), 'Названия начинаются с city_'\nassert set(names) == {'city_' + _c for _c in df['city'].unique()}, 'Один столбец на каждый город'"
    }
   },
   {
    "title": "ColumnTransformer для квартир",
    "prompt": "<p>Создайте <code>pre_f</code> для квартир: к столбцам <code>fnum</code> примените <code>StandardScaler</code>, к <code>district</code> — <code>OneHotEncoder(handle_unknown='ignore')</code>. <code>Xt = pre_f.fit_transform(X)</code>.</p>",
    "hints": [
     "<code>ColumnTransformer([('num', StandardScaler(), fnum), ('cat', OneHotEncoder(...), ['district'])])</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.compose import ColumnTransformer as _CT\nassert isinstance(pre_f, _CT), 'pre_f — ColumnTransformer'\n_A = _np.asarray(Xt.toarray() if hasattr(Xt, 'toarray') else Xt, dtype=float)\nassert _A.shape == (400, 11), f'Форма Xt должна быть (400, 11): 5 числовых + 6 районов. У вас {_A.shape}'\nassert _np.allclose(_A[:, :5].mean(axis=0), 0, atol=1e-6), 'Первые 5 столбцов должны быть масштабированы'\nassert _np.allclose(_A[:, 5:].sum(axis=1), 1), 'Последние 6 столбцов — one-hot коды районов'"
    }
   },
   {
    "title": "Незнакомый город",
    "prompt": "<p><code>ohe</code> обучен на городах churn. В новых данных есть Тараз (его раньше не было) и Алматы. Преобразуйте <code>new</code>, сумму каждой строки запишите в список <code>row_sums</code>. Строка Тараза должна состоять только из нулей.</p>",
    "hints": [
     "<code>ohe.transform(new)</code> возвращает разреженную матрицу: <code>.toarray()</code>",
     "<code>T.sum(axis=1)</code>"
    ],
    "check": {
     "tests": "assert list(row_sums) == [0, 1], 'row_sums = [0, 1]: Тараз — нули, Алматы — одна единица'"
    }
   },
   {
    "title": "Заглянуть внутрь Pipeline",
    "prompt": "<p>Создайте Pipeline <code>model</code> (шаги <code>'pre'</code> и <code>'clf'</code>) и обучите его на train. Через <code>named_steps</code> найдите: количество признаков в <code>n_coef</code> (<code>coef_.shape[1]</code>), названия признаков в <code>names</code> (<code>get_feature_names_out()</code>) и признак с самым большим коэффициентом в <code>top_pos</code>.</p>",
    "hints": [
     "<code>model.named_steps['clf'].coef_</code>",
     "<code>pd.Series(coef_[0], index=names).idxmax()</code>"
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import OneHotEncoder as _OH, StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre():\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), cat)])\nimport pandas as _pd\n_m = _Pl([('pre', _pre()), ('clf', _LR(max_iter=1000))]).fit(X_train, y_train)\n_c = _pd.Series(_m.named_steps['clf'].coef_[0], index=_m.named_steps['pre'].get_feature_names_out())\nassert 'clf' in model.named_steps and 'pre' in model.named_steps, \"Названия шагов: «pre» и «clf»\"\nassert n_coef == 14, 'n_coef должно быть 14: 6 числовых + 5 городов + 3 тарифа'\nassert list(names) == list(_c.index), 'names — get_feature_names_out() от pre'\nassert top_pos == _c.idxmax(), f'top_pos должно быть {_c.idxmax()}'"
    }
   },
   {
    "title": "Полный Pipeline для квартир",
    "prompt": "<p>Разделение и <code>pre_f</code> готовы. Обучите Pipeline из <code>pre_f</code> и <code>LinearRegression</code> под именем <code>model</code> на train. На test вычислите <code>test_r2</code> и <code>test_mae</code> (<code>mean_absolute_error</code>).</p>",
    "hints": [
     "<code>Pipeline([('pre', pre_f), ('model', LinearRegression())])</code>",
     "Pipeline принимает исходный X_train (с текстом district)."
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _P\nfrom sklearn.linear_model import LinearRegression as _LinR\nimport numpy as _np\nassert isinstance(model, _P) and isinstance(model.steps[-1][1], _LinR), 'model — Pipeline, последний шаг которого LinearRegression'\nassert abs(test_r2 - model.score(X_test, y_test)) < 1e-9, 'test_r2 = model.score(X_test, y_test)'\nassert abs(test_mae - _np.mean(_np.abs(y_test - model.predict(X_test)))) < 1e-9, 'test_mae — MAE на test'\nassert test_r2 > 0.9, f'При добавлении district R² должен быть выше 0.9, у вас {test_r2:.3f}'"
    }
   },
   {
    "title": "Стратегия заполнения",
    "prompt": "<p>Сравните стратегии <code>SimpleImputer</code> для числовой части: <code>'mean'</code>, <code>'median'</code>, <code>'most_frequent'</code>. Для каждой постройте полный Pipeline (imputer → StandardScaler, cat → OneHotEncoder, затем <code>LogisticRegression(max_iter=1000)</code>), на всём X, y вычислите среднее 3-fold ROC AUC и запишите в <code>auc_by_strategy</code>. Лучшую стратегию запишите в <code>best_strategy</code>.</p>",
    "hints": [
     "Внутри цикла для каждой стратегии создавайте новый <code>pre</code>.",
     "<code>cross_val_score(m, X, y, cv=3, scoring='roc_auc').mean()</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import cross_val_score as _cvs\nfrom sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import OneHotEncoder as _OH, StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre():\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), cat)])\n_rm = _cvs(_Pl([('pre', _pre()), ('model', _LR(max_iter=1000))]), X, y, cv=3, scoring='roc_auc').mean()\nassert set(auc_by_strategy) == {'mean', 'median', 'most_frequent'}, \"Ключи: «mean», «median», «most_frequent»\"\nassert abs(auc_by_strategy['median'] - _rm) < 1e-6, f\"Для median AUC должен быть ≈ {_rm:.4f}: cv=3, scoring='roc_auc', на всём X, y\"\nassert all(0.75 < _v < 0.9 for _v in auc_by_strategy.values()), 'Значения AUC должны быть в диапазоне 0.75–0.9'\nassert len(set(round(_v, 6) for _v in auc_by_strategy.values())) == 3, 'Для каждой стратегии создавайте новый imputer: результаты должны различаться'\nassert best_strategy == max(auc_by_strategy, key=auc_by_strategy.get), 'best_strategy — стратегия с самым высоким AUC'"
    }
   }
  ]
 },
 "mp-2": {
  "pr": [
   {
    "title": "Что видит scaler",
    "prompt": "<p>Разделение готово. Обучите <code>StandardScaler</code> под именем <code>scaler</code> только на <code>X_train</code>. Среднее <code>area_m2</code> по всем данным запишите в <code>mean_all</code>, среднее по train — в <code>mean_train</code>. Какое среднее запомнил scaler (<code>scaler.mean_[0]</code>) — запишите в <code>scaler_mean</code>.</p>",
    "hints": [
     "<code>scaler = StandardScaler().fit(X_train)</code>",
     "<code>scaler.mean_</code> — среднее каждого столбца."
    ],
    "check": {
     "tests": "assert abs(mean_all - X['area_m2'].mean()) < 1e-9, \"mean_all = X['area_m2'].mean()\"\nassert abs(mean_train - X_train['area_m2'].mean()) < 1e-9, \"mean_train = X_train['area_m2'].mean()\"\nassert abs(scaler_mean - X_train['area_m2'].mean()) < 1e-9, 'Scaler должен обучаться только на X_train: scaler_mean = mean_train'\nassert abs(mean_all - mean_train) > 1e-6, 'Среднее по всем данным и по train отличаются'"
    }
   },
   {
    "title": "Поиск ID-столбца",
    "prompt": "<p>ID-столбцы вредны для модели: они могут случайно коррелировать с целевой переменной. Функция <code>id_like(df)</code> должна вернуть список столбцов, в которых каждое значение уникально (число уникальных значений равно числу строк).</p><p>Например, для churn → <code>['customer_id']</code>.</p>",
    "hints": [
     "<code>data[c].nunique() == len(data)</code>"
    ],
    "check": {
     "tests": "assert id_like(df) == ['customer_id'], \"id_like(df) должна вернуть ['customer_id']\"\n_t = pd.DataFrame({'code': ['A1', 'A2', 'A3'], 'city': ['Алматы', 'Алматы', 'Астана'], 'n': [1, 2, 3]})\nassert id_like(_t) == ['code', 'n'], \"В маленькой таблице: ['code', 'n']\"\nassert id_like(pd.read_csv('flats.csv')) == ['flat_id'], \"Для flats: ['flat_id']\""
    }
   },
   {
    "title": "Нет общих строк",
    "prompt": "<p>Разделение готово. Количество общих индексов train и test запишите в <code>overlap</code>, а общее число строк обеих частей — в <code>n_total</code>.</p>",
    "hints": [
     "Пересечение множеств: <code>set(a) &amp; set(b)</code>"
    ],
    "check": {
     "tests": "assert overlap == 0, 'overlap = 0: ни одна строка не должна быть и в train, и в test'\nassert n_total == 600, 'n_total = 600: ни одна строка не теряется'"
    }
   },
   {
    "title": "Признак, построенный из цены",
    "prompt": "<p><code>price_per_m2 = price_mln / area_m2</code> построен из целевой переменной — это target leakage. Сравните две модели (разбиение <code>test_size=0.2</code>, <code>random_state=42</code>): <code>area_m2</code> + <code>price_per_m2</code> → тестовый R² <code>leak_r2</code>; только <code>area_m2</code> → <code>clean_r2</code>.</p>",
    "hints": [
     "На одном разбиении две модели: во второй только <code>X_train[['area_m2']]</code>."
    ],
    "check": {
     "tests": "from sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LinearRegression as _LinR\n_a, _b, _c, _d = _tts(flats[['area_m2', 'price_per_m2']], flats['price_mln'], test_size=0.2, random_state=42)\nassert abs(leak_r2 - _LinR().fit(_a, _c).score(_b, _d)) < 1e-6, 'leak_r2: с признаками area_m2 + price_per_m2'\nassert abs(clean_r2 - _LinR().fit(_a[['area_m2']], _c).score(_b[['area_m2']], _d)) < 1e-6, 'clean_r2: только area_m2'\nassert leak_r2 > 0.9 and leak_r2 - clean_r2 > 0.3, 'Утечка искусственно завышает R²'"
    }
   },
   {
    "title": "Кодирование города по train",
    "prompt": "<p>Замена города на его долю ухода (target encoding) полезна, но долю нужно считать <b>только по train</b>. <code>city_rate</code> — доля ухода для каждого города в train (Series). <code>te_rate</code> — доля, соответствующая городу тестовых абонентов (<code>X_test['city'].map(city_rate)</code>).</p>",
    "hints": [
     "<code>y_train.groupby(X_train['city']).mean()</code>",
     "<code>Series.map(...)</code> заменяет значения словарём или Series."
    ],
    "check": {
     "tests": "_cr = y_train.groupby(X_train['city']).mean()\nassert isinstance(city_rate, pd.Series) and len(city_rate) == 5, 'city_rate — Series с 5 городами'\nassert all(abs(city_rate[_c] - _cr[_c]) < 1e-9 for _c in _cr.index), 'city_rate должен считаться только по train (y_train, X_train)'\nassert len(te_rate) == 150 and all(abs(te_rate.values - X_test['city'].map(_cr).values) < 1e-9), \"te_rate = X_test['city'].map(city_rate)\""
    }
   },
   {
    "title": "Повторяющиеся квартиры",
    "prompt": "<p>Если в данных есть повторяющиеся строки, одна квартира может попасть и в train, и в test. Разбейте <code>flats2</code> с <code>test_size=0.25</code>, <code>random_state=0</code> на <code>train2</code> и <code>test2</code>. Количество строк test, у которых <code>flat_id</code> есть и в train, запишите в <code>n_leak</code>.</p>",
    "hints": [
     "<code>train_test_split(flats2, test_size=0.25, random_state=0)</code> возвращает две таблицы.",
     "<code>test2['flat_id'].isin(train2['flat_id']).sum()</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import train_test_split as _tts\n_a, _b = _tts(flats2, test_size=0.25, random_state=0)\n_n = int(_b['flat_id'].isin(_a['flat_id']).sum())\nassert len(test2) == 125, 'В test2 должно быть 125 строк'\nassert int(n_leak) == _n, f'n_leak должно быть {_n}: строки test2, у которых flat_id есть в train2'\nassert n_leak > 0, 'Повторы дают leakage'"
    }
   },
   {
    "title": "Регрессия на шуме по признакам",
    "prompt": "<p>Целевая переменная и 1000 признаков — всё это случайный шум. <code>leaky_r2</code>: на всех данных выберите <code>SelectKBest(f_regression, k=10)</code>, затем среднее 5-fold CV R² для <code>LinearRegression</code>. <code>honest_r2</code>: поместите этот отбор внутрь <code>make_pipeline</code> и сделайте 5-fold CV на исходном X.</p>",
    "hints": [
     "Leaky: <code>Xs = SelectKBest(f_regression, k=10).fit_transform(X, y)</code>",
     "Honest: <code>make_pipeline(SelectKBest(f_regression, k=10), LinearRegression())</code>"
    ],
    "check": {
     "tests": "assert leaky_r2 is not None and honest_r2 is not None, 'Вычислите leaky_r2 и honest_r2'\nassert leaky_r2 > 0.1, f'R² из-за leakage искусственно положительный (≈0.2), у вас {leaky_r2:.2f}. SelectKBest обучен на всём X, y?'\nassert honest_r2 < 0, f'Честный R² должен быть ниже нуля: шум ничего не предсказывает. У вас {honest_r2:.2f}'\nassert leaky_r2 - honest_r2 > 0.5, 'Разница между ними должна быть большой'"
    }
   },
   {
    "title": "Найти испорченный столбец",
    "prompt": "<p>В данных есть <code>days_since_cancel</code> (заполнен только у ушедших). Проверьте, насколько каждый числовой признак <b>сам по себе</b> предсказывает: <code>roc_auc_score(y, df[c].fillna(df[c].median()))</code>. Значения <code>|AUC − 0.5|</code> запишите в Series <code>strength</code>, самый сильный признак — в <code>leak_col</code>. Затем постройте <code>X_clean</code> без этого столбца.</p>",
    "hints": [
     "Генератор словаря: <code>{c: ... for c in nums}</code>, затем <code>pd.Series(...)</code>.",
     "<code>strength.idxmax()</code>"
    ],
    "check": {
     "tests": "from sklearn.metrics import roc_auc_score as _ra\n_s = {_c: abs(_ra(y, df[_c].fillna(df[_c].median())) - 0.5) for _c in nums}\nassert isinstance(strength, pd.Series) and set(strength.index) == set(nums), 'strength — Series по nums'\nassert all(abs(strength[_c] - _s[_c]) < 1e-9 for _c in nums), 'Значения |AUC − 0.5| неверны: заполните пустые значения медианой'\nassert leak_col == 'days_since_cancel', 'Самый сильный признак — days_since_cancel: он появляется после результата'\nassert list(X_clean.columns) == [_c for _c in nums if _c != 'days_since_cancel'], 'В X_clean остаются 6 признаков'"
    }
   }
  ]
 },
 "mp-3": {
  "pr": [
   {
    "title": "Площадь на комнату",
    "prompt": "<p>Функция <code>per_room(area, rooms)</code> должна вернуть площадь на одну комнату, округлённую до 1 знака. Если <code>rooms</code> равно 0 (студия), пусть возвращает саму площадь.</p><p>Например, <code>per_room(65, 2)</code> → <code>32.5</code>.</p>",
    "hints": [
     "Сначала проверьте случай <code>rooms == 0</code>.",
     "<code>round(area / rooms, 1)</code>"
    ],
    "check": {
     "tests": "assert per_room(65, 2) == 32.5, 'per_room(65, 2) должна вернуть 32.5'\nassert per_room(30, 0) == 30, 'Студия: per_room(30, 0) = 30'\nassert per_room(100, 3) == 33.3, 'per_room(100, 3) = 33.3 (round(..., 1))'"
    }
   },
   {
    "title": "Самый старый район",
    "prompt": "<p>Добавьте столбец <code>flats['age'] = 2024 - flats['year_built']</code>. Средний возраст по районам запишите в <code>age_by_district</code>, а район с самыми старыми домами — в <code>oldest_district</code>.</p>",
    "hints": [
     "<code>flats.groupby('district')['age'].mean()</code>",
     "<code>.idxmax()</code>"
    ]
   },
   {
    "title": "Признак первого этажа",
    "prompt": "<p>Добавьте столбец <code>flats['is_first']</code>: 1, если <code>floor == 1</code>, иначе 0 (int). Среднюю цену квартир на первом этаже запишите в <code>first_price</code>, а у остальных — в <code>other_price</code>.</p>",
    "hints": [
     "<code>(flats['floor'] == 1).astype(int)</code>",
     "<code>flats.loc[шарт, 'price_mln'].mean()</code>"
    ],
    "check": {
     "tests": "_f = pd.read_csv('flats.csv')\nassert 'is_first' in flats.columns and set(flats['is_first'].unique()) <= {0, 1}, 'is_first — столбец из 0/1'\nassert int(flats['is_first'].sum()) == int((_f['floor'] == 1).sum()), 'is_first: 1, если floor == 1'\nassert abs(first_price - _f.loc[_f['floor'] == 1, 'price_mln'].mean()) < 1e-9, 'first_price — средняя цена квартир на первом этаже'\nassert abs(other_price - _f.loc[_f['floor'] != 1, 'price_mln'].mean()) < 1e-9, 'other_price — средняя цена остальных квартир'"
    }
   },
   {
    "title": "Цена гигабайта",
    "prompt": "<p>В churn добавьте столбец <code>fee_per_gb = monthly_fee / data_gb</code> (для пустого <code>data_gb</code> останется NaN). Медиану по тарифам запишите в <code>fee_gb_by_plan</code>. Тариф с самой высокой ценой за 1 ГБ запишите в <code>priciest_plan</code>.</p>",
    "hints": [
     "<code>df['monthly_fee'] / df['data_gb']</code>",
     "<code>df.groupby('plan')['fee_per_gb'].median()</code>"
    ],
    "check": {
     "tests": "_d = pd.read_csv('churn.csv')\n_g = (_d['monthly_fee'] / _d['data_gb']).groupby(_d['plan']).median()\nassert 'fee_per_gb' in df.columns, 'Добавьте в df столбец fee_per_gb'\nassert set(fee_gb_by_plan.index) == {'basic', 'standard', 'premium'} and all(abs(fee_gb_by_plan[_p] - _g[_p]) < 1e-9 for _p in _g.index), 'fee_gb_by_plan — медиана по тарифам'\nassert priciest_plan == _g.idxmax(), f'priciest_plan должно быть {_g.idxmax()}'"
    }
   },
   {
    "title": "Польза новых признаков",
    "prompt": "<p>Создайте три новых признака: <code>area_per_room</code>, <code>floor_ratio</code> (<code>floor / floors_total</code>), <code>is_last</code> (последний этаж: 1/0). Разбиение <code>test_size=0.2</code>, <code>random_state=42</code>. Тестовый R² на признаках <code>base</code> → <code>r2_base</code>; <code>base</code> + три новых признака → <code>r2_new</code>.</p>",
    "hints": [
     "Сначала добавьте столбцы в <code>flats</code>, затем разбейте.",
     "<code>train_test_split(flats, test_size=0.2, random_state=42)</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LinearRegression as _LinR\n_f = pd.read_csv('flats.csv')\n_f['area_per_room'] = _f['area_m2'] / _f['rooms']\n_f['floor_ratio'] = _f['floor'] / _f['floors_total']\n_f['is_last'] = (_f['floor'] == _f['floors_total']).astype(int)\n_n = base + ['area_per_room', 'floor_ratio', 'is_last']\n_a, _b = _tts(_f, test_size=0.2, random_state=42)\nassert abs(r2_base - _LinR().fit(_a[base], _a['price_mln']).score(_b[base], _b['price_mln'])) < 1e-6, 'r2_base неверно: test_size=0.2, random_state=42'\nassert abs(r2_new - _LinR().fit(_a[_n], _a['price_mln']).score(_b[_n], _b['price_mln'])) < 1e-6, 'r2_new неверно: проверьте три новых признака'\nassert r2_new > r2_base, 'Новые признаки должны немного повысить R²'"
    }
   },
   {
    "title": "Логарифмическая цель",
    "prompt": "<p>Цены распределены с правым перекосом. Обучите модель на <code>np.log(y)</code> и верните прогноз обратно через <code>np.exp</code>. One-hot <code>X</code> готов. Разбиение <code>test_size=0.2</code>, <code>random_state=42</code>. Тестовый MAE обычной модели → <code>mae_raw</code>, модели на логарифме → <code>mae_log</code> (оба в млн ₸).</p>",
    "hints": [
     "<code>LinearRegression().fit(X_train, np.log(y_train))</code>",
     "Прогноз: <code>np.exp(logm.predict(X_test))</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\n_r = _np.mean(_np.abs(_LinR().fit(X_train, y_train).predict(X_test) - y_test))\n_l = _np.mean(_np.abs(_np.exp(_LinR().fit(X_train, _np.log(y_train)).predict(X_test)) - y_test))\nassert abs(mae_raw - _r) < 1e-6, f'mae_raw должно быть ≈ {_r:.2f}'\nassert abs(mae_log - _l) < 1e-6, f'mae_log должно быть ≈ {_l:.2f}: обучите на np.log(y_train), прогноз np.exp(predict) верните в млн ₸'\nassert mae_log < mae_raw, 'Логарифмическая цель на этих данных уменьшает ошибку'"
    }
   },
   {
    "title": "Признаки риска",
    "prompt": "<p>Добавьте два бинарных признака: <code>many_calls</code> (<code>support_calls &gt;= 3</code>) и <code>new_customer</code> (<code>tenure_months &lt;= 6</code>), тип int. Pipeline: <code>SimpleImputer(strategy='median')</code> → <code>StandardScaler</code> → <code>LogisticRegression(max_iter=1000)</code>. 5-fold ROC AUC на всех данных: на столбцах <code>base</code> → <code>auc_base</code>, с двумя новыми признаками → <code>auc_new</code>.</p>",
    "hints": [
     "Функция для повторяющейся части: <code>def cv_auc(cols): ...</code>",
     "<code>cross_val_score(m, df[cols], y, cv=5, scoring='roc_auc')</code>"
    ],
    "check": {
     "tests": "from sklearn.pipeline import make_pipeline as _mp\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\nfrom sklearn.model_selection import cross_val_score as _cvs\n_d = pd.read_csv('churn.csv')\n_d['many_calls'] = (_d['support_calls'] >= 3).astype(int)\n_d['new_customer'] = (_d['tenure_months'] <= 6).astype(int)\n_cv = lambda _c: _cvs(_mp(_SI(strategy='median'), _SS(), _LR(max_iter=1000)), _d[_c], _d['churned'], cv=5, scoring='roc_auc').mean()\nassert 'many_calls' in df.columns and int(df['many_calls'].sum()) == int(_d['many_calls'].sum()), 'many_calls: support_calls >= 3'\nassert 'new_customer' in df.columns and int(df['new_customer'].sum()) == int(_d['new_customer'].sum()), 'new_customer: tenure_months <= 6'\nassert abs(auc_base - _cv(base)) < 1e-6, f'auc_base должно быть ≈ {_cv(base):.4f}'\nassert abs(auc_new - _cv(base + ['many_calls', 'new_customer'])) < 1e-6, 'auc_new неверно: base + many_calls + new_customer'"
    }
   },
   {
    "title": "Цена квадратного метра по району",
    "prompt": "<p>Признак на уровне района: на train для каждого района посчитайте среднюю цену одного квадратного метра (<code>price_mln / area_m2</code>) → Series <code>ppm</code>. Затем добавьте в train и test столбец <code>est = area_m2 * district бойынша ppm</code> и обучите <code>LinearRegression</code> на признаках <code>area_m2</code>, <code>year_built</code>, <code>est</code>. Тестовый R² → <code>r2_est</code>. Берите цену только из train!</p>",
    "hints": [
     "<code>(tr['price_mln'] / tr['area_m2']).groupby(tr['district']).mean()</code>",
     "<code>te['district'].map(ppm)</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LinearRegression as _LinR\n_a, _b = _tts(pd.read_csv('flats.csv'), test_size=0.2, random_state=42)\n_a = _a.copy(); _b = _b.copy()\n_p = (_a['price_mln'] / _a['area_m2']).groupby(_a['district']).mean()\n_a['est'] = _a['area_m2'] * _a['district'].map(_p)\n_b['est'] = _b['area_m2'] * _b['district'].map(_p)\n_r = _LinR().fit(_a[['area_m2', 'year_built', 'est']], _a['price_mln']).score(_b[['area_m2', 'year_built', 'est']], _b['price_mln'])\nassert isinstance(ppm, pd.Series) and len(ppm) == 6 and all(abs(ppm[_k] - _p[_k]) < 1e-9 for _k in _p.index), 'ppm должна вычисляться только по train (tr)'\nassert 'est' in te.columns and 'est' in tr.columns, \"Добавьте столбец est в tr и te\"\nassert abs(te['est'] - _b['est']).max() < 1e-9, \"te['est'] = te['area_m2'] * te['district'].map(ppm)\"\nassert abs(r2_est - _r) < 1e-6, f'r2_est должно быть ≈ {_r:.3f}'\nassert r2_est > 0.85, 'Признак цены по району заметно повышает R²'"
    }
   }
  ]
 },
 "mp-4": {
  "pr": [
   {
    "title": "Размер сетки",
    "prompt": "<p>Функция <code>grid_size(grid)</code> должна вернуть количество комбинаций в сетке параметров: произведение количеств значений каждого параметра.</p><p>Например, <code>grid_size({'C': [0.1, 1, 10], 'penalty': ['l2']})</code> → <code>3</code>.</p>",
    "hints": [
     "<code>for values in grid.values():</code>",
     "Начальное значение 1, на каждом шаге <code>n *= len(values)</code>."
    ],
    "check": {
     "tests": "assert grid_size({'C': [0.1, 1, 10], 'penalty': ['l2']}) == 3, \"grid_size({'C': [0.1, 1, 10], 'penalty': ['l2']}) должна вернуть 3\"\nassert grid_size({'max_depth': [2, 3, 5], 'min_samples_leaf': [1, 10, 30]}) == 9, '3 × 3 = 9'\nassert grid_size({'a': [1, 2], 'b': [1, 2], 'c': [1, 2, 3, 4]}) == 16, '2 × 2 × 4 = 16'\nassert grid_size({}) == 1, 'Пустая сетка: одна комбинация (по умолчанию)'"
    }
   },
   {
    "title": "Поиск глубины дерева",
    "prompt": "<p>Обучите <code>GridSearchCV(DecisionTreeRegressor(random_state=0), {'max_depth': [2, 4, 6, 8]}, cv=5)</code> под именем <code>grid</code> на числовых признаках квартир (всех X, y). Лучшую глубину запишите в <code>best_depth</code>, её CV R² — в <code>best_r2</code>.</p>",
    "hints": [
     "Название параметра без Pipeline: <code>'max_depth'</code>.",
     "<code>grid.best_params_['max_depth']</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import GridSearchCV as _G\nimport numpy as _np\nassert isinstance(grid, _G) and hasattr(grid, 'best_params_'), 'grid — обученный GridSearchCV'\nassert len(grid.cv_results_['params']) == 4, 'В сетке 4 значения max_depth'\n_i = int(_np.argmax(grid.cv_results_['mean_test_score']))\nassert best_depth == grid.cv_results_['params'][_i]['max_depth'], \"best_depth = grid.best_params_['max_depth']\"\nassert abs(best_r2 - grid.best_score_) < 1e-12, 'best_r2 = grid.best_score_'"
    }
   },
   {
    "title": "Поиск числа соседей",
    "prompt": "<p>Pipeline: <code>('sc', StandardScaler())</code> → <code>('knn', KNeighborsClassifier())</code>. Создайте <code>GridSearchCV</code> (<code>cv=5</code>) с сеткой <code>knn__n_neighbors</code> ∈ [5, 15, 25], обучите его под именем <code>grid</code> на <code>X4</code>, <code>y</code>. Запишите <code>best_k</code> и <code>best_cv</code> (лучшая CV accuracy).</p>",
    "hints": [
     "Имя параметра: <code>'қадам__параметр'</code>, то есть <code>'knn__n_neighbors'</code>."
    ],
    "check": {
     "tests": "from sklearn.model_selection import GridSearchCV as _G\nassert isinstance(grid, _G) and hasattr(grid, 'best_score_'), 'grid — обученный GridSearchCV'\nassert sorted(_p['knn__n_neighbors'] for _p in grid.cv_results_['params']) == [5, 15, 25], \"Сетка: {'knn__n_neighbors': [5, 15, 25]} (имя шага 'knn')\"\nassert best_k == grid.best_params_['knn__n_neighbors'] and abs(best_cv - grid.best_score_) < 1e-12, 'best_k и best_cv — лучший результат grid'\nassert 0.7 < best_cv < 0.85, f'CV accuracy должна быть ≈ 0.78, у вас {best_cv:.3f}'"
    }
   },
   {
    "title": "Сетка с двумя параметрами",
    "prompt": "<p>Сетка для <code>DecisionTreeClassifier(random_state=0)</code>: <code>max_depth</code> ∈ [2, 3, 5], <code>min_samples_leaf</code> ∈ [1, 10, 30]; <code>cv=5</code>, <code>scoring='roc_auc'</code>. Обучите <code>grid</code> на <code>X4</code>, <code>y</code>, количество комбинаций запишите в <code>n_combos</code>, лучшие параметры — в <code>best_params</code>.</p>",
    "hints": [
     "Словарь сетки с двумя ключами: <code>{'max_depth': [...], 'min_samples_leaf': [...]}</code>",
     "<code>len(grid.cv_results_['params'])</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import GridSearchCV as _G\nassert isinstance(grid, _G) and hasattr(grid, 'best_params_'), 'grid — обученный GridSearchCV'\nassert grid.scoring == 'roc_auc', \"Укажите scoring='roc_auc'\"\nassert n_combos == 9, 'n_combos = 3 × 3 = 9'\nassert best_params == grid.best_params_ and set(best_params) == {'max_depth', 'min_samples_leaf'}, 'best_params = grid.best_params_'\nassert 0.75 < grid.best_score_ < 0.9, 'Лучший CV AUC должен быть ≈ 0.8'"
    }
   },
   {
    "title": "Таблица результатов",
    "prompt": "<p>Сетка <code>grid</code> обучена. Создайте DataFrame <code>table</code> из <code>grid.cv_results_</code>: столбцы <code>max_depth</code>, <code>min_samples_leaf</code>, <code>mean_test_score</code>, сортировка по <code>mean_test_score</code> по убыванию. Балл первой строки должен равняться <code>best_score_</code>.</p>",
    "hints": [
     "<code>grid.cv_results_['param_max_depth']</code>, <code>['mean_test_score']</code>",
     "<code>sort_values('mean_test_score', ascending=False)</code>"
    ],
    "check": {
     "tests": "assert isinstance(table, pd.DataFrame) and len(table) == 9, 'table — DataFrame из 9 строк'\nassert {'max_depth', 'min_samples_leaf', 'mean_test_score'} <= set(table.columns), 'Столбцы: max_depth, min_samples_leaf, mean_test_score'\nassert list(table['mean_test_score']) == sorted(table['mean_test_score'], reverse=True), 'Сортировка по mean_test_score по убыванию'\nassert abs(table['mean_test_score'].iloc[0] - grid.best_score_) < 1e-12, 'Первая строка — лучшая комбинация'\nassert int(table['max_depth'].iloc[0]) == grid.best_params_['max_depth'], 'max_depth первой строки должен совпадать с best_params_'"
    }
   },
   {
    "title": "Сетка вручную",
    "prompt": "<p>Повторите вручную, что делает GridSearchCV. Для <code>C</code> ∈ [0.01, 0.1, 1, 10] среднее 5-fold ROC AUC Pipeline из <code>pre</code> и <code>LogisticRegression(C=C, max_iter=1000)</code> на <code>X_train</code> запишите в словарь <code>manual</code>. Лучшее значение запишите в <code>best_C</code>.</p>",
    "hints": [
     "Цикл: <code>for C in [0.01, 0.1, 1, 10]:</code>",
     "Для каждого C создавайте новый Pipeline."
    ],
    "check": {
     "tests": "assert sorted(manual) == [0.01, 0.1, 1, 10], 'Ключи manual: 0.01, 0.1, 1, 10'\nassert all(0.7 < _v < 0.9 for _v in manual.values()), \"Значения AUC ≈ 0.7–0.9: scoring='roc_auc', на X_train\"\nfrom sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import OneHotEncoder as _OH, StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre():\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), cat)])\nfrom sklearn.model_selection import cross_val_score as _cvs\n_r1 = _cvs(_Pl([('pre', _pre()), ('model', _LR(C=1, max_iter=1000))]), X_train, y_train, cv=5, scoring='roc_auc').mean()\nassert abs(manual[1] - _r1) < 1e-6, f'Для C=1 AUC ≈ {_r1:.4f}: cross_val_score(m, X_train, y_train, cv=5, scoring=\"roc_auc\")'\nassert best_C == max(manual, key=manual.get), 'best_C — C с самым высоким AUC'"
    }
   },
   {
    "title": "KNN-сетка внутри Pipeline",
    "prompt": "<p>Разбиение квартир и <code>pre_f</code> готовы. Pipeline <code>('pre', pre_f)</code> → <code>('model', KNeighborsRegressor())</code>. Создайте <code>grid</code> с сеткой <code>model__n_neighbors</code> ∈ [3, 5, 10, 20] и <code>cv=5</code>, обучите на <code>X_train</code>. Запишите <code>best_k</code> и тестовый R² (<code>grid.score(X_test, y_test)</code>) → <code>test_r2</code>.</p>",
    "hints": [
     "Имя параметра: <code>'model__n_neighbors'</code>",
     "<code>grid.fit(X_train, y_train)</code>, затем <code>grid.score(X_test, y_test)</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import GridSearchCV as _G\nassert isinstance(grid, _G) and hasattr(grid, 'best_estimator_'), 'grid — обученный GridSearchCV'\nassert len(grid.cv_results_['params']) == 4, 'В сетке 4 значения n_neighbors'\nassert grid.n_features_in_ == 6 if hasattr(grid, 'n_features_in_') else True, 'grid должен обучаться на 6 исходных столбцах X_train'\nassert best_k == grid.best_params_['model__n_neighbors'], \"best_k = grid.best_params_['model__n_neighbors']\"\nassert abs(test_r2 - grid.score(X_test, y_test)) < 1e-9 and test_r2 > 0.8, f'test_r2 = grid.score(X_test, y_test) ≈ 0.85+, у вас {test_r2:.3f}'"
    }
   },
   {
    "title": "Вложенная кросс-валидация",
    "prompt": "<p>Значение <code>best_score_</code> у GridSearchCV немного завышено: оно выбрано по тем же баллам. Честная оценка — вложенная CV: передайте объект <code>inner = GridSearchCV(DecisionTreeClassifier(random_state=0), {'max_depth': [2, 4, 6]}, cv=3)</code> в <code>cross_val_score(inner, X4, y, cv=3)</code>. Среднее запишите в <code>nested</code>. Для сравнения обучите <code>inner</code> на всём X4, y и запишите <code>best_score_</code> в <code>optimistic</code>.</p>",
    "hints": [
     "GridSearchCV тоже модель: её можно передать в <code>cross_val_score</code>.",
     "<code>inner.fit(X4, y).best_score_</code>"
    ]
   }
  ]
 },
 "mp-5": {
  "pr": [
   {
    "title": "Бутстрап-выборка",
    "prompt": "<p>Каждое дерево леса учится на бутстрап-выборке: <code>n</code> строк выбираются с возвратом <code>n</code> раз. Создайте <code>sample</code> через <code>rng.integers(0, 1000, 1000)</code>, долю уникальных строк запишите в <code>frac_unique</code> (по теории ≈ 1 − 1/e ≈ 0.632).</p>",
    "hints": [
     "<code>np.unique(sample)</code> — уникальные значения."
    ],
    "check": {
     "tests": "import numpy as _np\n_s = _np.random.default_rng(0).integers(0, 1000, 1000)\nassert len(sample) == 1000, 'В sample должно быть 1000 значений'\nassert list(sample[:5]) == list(_s[:5]), 'sample = rng.integers(0, 1000, 1000) (rng заранее не используйте)'\nassert abs(frac_unique - len(_np.unique(_s)) / 1000) < 1e-9 and 0.6 < frac_unique < 0.66, 'frac_unique = число уникальных значений / 1000 ≈ 0.63'"
    }
   },
   {
    "title": "Голосование большинством",
    "prompt": "<p>Лес классификации объединяет голоса деревьев. Функция <code>majority(votes)</code> должна вернуть 1, если единиц в списке 0/1 <b>больше</b> половины, иначе 0.</p><p>Например, <code>majority([1, 0, 1])</code> → <code>1</code>, <code>majority([1, 0])</code> → <code>0</code>.</p>",
    "hints": [
     "<code>sum(votes) &gt; len(votes) / 2</code>"
    ],
    "check": {
     "tests": "assert majority([1, 0, 1]) == 1, 'majority([1, 0, 1]) должна вернуть 1'\nassert majority([1, 0]) == 0, 'Ничья: 0'\nassert majority([0, 0, 0, 1, 1]) == 0, 'majority([0, 0, 0, 1, 1]) = 0'\nassert majority([1] * 51 + [0] * 49) == 1, '51 против 49: 1'"
    }
   },
   {
    "title": "Регрессия лесом",
    "prompt": "<p>Лес тоже предсказывает цену. На числовых признаках квартир (<code>fnum</code>) обучите <code>RandomForestRegressor(n_estimators=50, random_state=0)</code> под именем <code>rf</code> на train и запишите тестовый R² в <code>rf_r2</code>.</p>",
    "hints": [
     "<code>X_train[fnum]</code> — только числовые столбцы."
    ],
    "check": {
     "tests": "from sklearn.ensemble import RandomForestRegressor as _RFR\nassert isinstance(rf, _RFR) and len(rf.estimators_) == 50, 'rf — RandomForestRegressor из 50 деревьев'\nassert rf.n_features_in_ == 5, 'Только столбцы fnum (5 признаков)'\nassert abs(rf_r2 - rf.score(X_test[fnum], y_test)) < 1e-9 and 0.5 < rf_r2 < 0.9, f'rf_r2 = rf.score(X_test[fnum], y_test), у вас {rf_r2:.3f}'"
    }
   },
   {
    "title": "Число деревьев",
    "prompt": "<p>Для <code>n_estimators</code> ∈ [1, 10, 50] обучите <code>RandomForestClassifier(random_state=0)</code> на train разбиения <code>X4</code> и запишите тестовый ROC AUC в словарь <code>auc_by_n</code>.</p>",
    "hints": [
     "Цикл: <code>for n in [1, 10, 50]:</code>",
     "<code>roc_auc_score(y_test, rf.predict_proba(X_test)[:, 1])</code>"
    ],
    "check": {
     "tests": "from sklearn.ensemble import RandomForestClassifier as _RF\nfrom sklearn.metrics import roc_auc_score as _ra\n_r = {_n: _ra(y_test, _RF(n_estimators=_n, random_state=0).fit(X_train, y_train).predict_proba(X_test)[:, 1]) for _n in [1, 10, 50]}\nassert sorted(auc_by_n) == [1, 10, 50], 'Ключи auc_by_n: 1, 10, 50'\nassert all(abs(auc_by_n[_n] - _r[_n]) < 1e-9 for _n in _r), 'Значения AUC неверны: roc_auc_score(y_test, predict_proba(X_test)[:, 1])'\nassert auc_by_n[50] > auc_by_n[1] + 0.05, 'С ростом числа деревьев AUC заметно растёт'"
    }
   },
   {
    "title": "Среднее по деревьям",
    "prompt": "<p>Прогноз регрессионного леса — это среднее прогнозов деревьев. Получите прогноз каждого дерева из <code>rf.estimators_</code> на <code>X_test[fnum].values</code>, среднее запишите в <code>avg_pred</code>. Наибольшую разницу с <code>rf.predict</code> запишите в <code>max_diff</code>.</p>",
    "hints": [
     "<code>[t.predict(Xv) for t in rf.estimators_]</code>",
     "<code>np.array(...).mean(axis=0)</code> — среднее по каждой квартире."
    ],
    "check": {
     "tests": "import numpy as _np\nassert len(avg_pred) == 100, 'avg_pred — для 100 тестовых квартир'\nassert _np.allclose(avg_pred, rf.predict(X_test[fnum])), 'avg_pred = среднее прогнозов деревьев (axis=0)'\nassert max_diff < 1e-9, 'max_diff должно быть ≈ 0'"
    }
   },
   {
    "title": "Одно дерево и лес",
    "prompt": "<p>Сравните тестовый R² на числовых признаках квартир: <code>DecisionTreeRegressor(random_state=0)</code> → <code>tree_r2</code>, <code>RandomForestRegressor(n_estimators=50, random_state=0)</code> → <code>forest_r2</code>. <code>gain = forest_r2 - tree_r2</code>.</p>",
    "hints": [
     "Обе модели работают на <code>X_train[fnum]</code>."
    ],
    "check": {
     "tests": "from sklearn.tree import DecisionTreeRegressor as _DR\nfrom sklearn.ensemble import RandomForestRegressor as _RFR\n_t = _DR(random_state=0).fit(X_train[fnum], y_train).score(X_test[fnum], y_test)\n_f = _RFR(n_estimators=50, random_state=0).fit(X_train[fnum], y_train).score(X_test[fnum], y_test)\nassert abs(tree_r2 - _t) < 1e-9, f'tree_r2 должно быть ≈ {_t:.3f}'\nassert abs(forest_r2 - _f) < 1e-9, f'forest_r2 должно быть ≈ {_f:.3f}'\nassert abs(gain - (_f - _t)) < 1e-9 and gain > 0.1, 'Лес заметно лучше одного дерева: gain > 0.1'"
    }
   },
   {
    "title": "Влияние max_features",
    "prompt": "<p>Чтобы деревья леса отличались, на каждом разбиении смотрят только на часть признаков. Для <code>max_features</code> ∈ [1, 'sqrt', None] запишите среднее 3-fold ROC AUC <code>RandomForestClassifier(n_estimators=50, random_state=0)</code> на <code>X4</code>, <code>y</code> в словарь <code>auc_by_mf</code> (ключ — само значение). Лучшее запишите в <code>best_mf</code>.</p>",
    "hints": [
     "<code>RandomForestClassifier(n_estimators=50, max_features=mf, random_state=0)</code>",
     "<code>cross_val_score(rf, X4, y, cv=3, scoring='roc_auc')</code>"
    ],
    "check": {
     "tests": "from sklearn.ensemble import RandomForestClassifier as _RF\nfrom sklearn.model_selection import cross_val_score as _cvs\nassert set(auc_by_mf) == {1, 'sqrt', None}, \"Ключи auc_by_mf: 1, «sqrt», None\"\n_r1 = _cvs(_RF(n_estimators=50, max_features=1, random_state=0), X4, y, cv=3, scoring='roc_auc').mean()\nassert abs(auc_by_mf[1] - _r1) < 1e-9, f\"Для max_features=1 AUC ≈ {_r1:.4f}: cv=3, scoring='roc_auc'\"\nassert all(0.7 < _v < 0.9 for _v in auc_by_mf.values()), 'Значения AUC в диапазоне 0.7–0.9'\nassert best_mf == max(auc_by_mf, key=auc_by_mf.get), 'best_mf — значение с самым высоким AUC'"
    }
   },
   {
    "title": "Лес и линейная модель",
    "prompt": "<p>Разбиение квартир и <code>pre_f</code> готовы. Два Pipeline: <code>pre_f</code> + <code>LinearRegression()</code> и <code>pre_f</code> + <code>RandomForestRegressor(n_estimators=50, random_state=0)</code>. Тестовые MAE: <code>mae_lr</code>, <code>mae_rf</code>. Название модели с меньшей ошибкой запишите в <code>winner</code>: <code>'linear'</code> или <code>'forest'</code>.</p>",
    "hints": [
     "Оба Pipeline принимают исходный <code>X_train</code>.",
     "<code>mean_absolute_error(y_test, model.predict(X_test))</code>"
    ]
   }
  ]
 },
 "mp-6": {
  "pr": [
   {
    "title": "Остатки",
    "prompt": "<p>Boosting на каждом шаге предсказывает остатки. Функция <code>residuals(y, pred)</code> должна вернуть список <code>y − pred</code>.</p><p>Например, <code>residuals([10, 20], [12, 15])</code> → <code>[-2, 5]</code>.</p>",
    "hints": [
     "<code>[a - b for a, b in zip(y, pred)]</code>"
    ],
    "check": {
     "tests": "assert list(residuals([10, 20], [12, 15])) == [-2, 5], 'residuals([10, 20], [12, 15]) должна вернуть [-2, 5]'\nassert list(residuals([1, 1, 1], [1, 1, 1])) == [0, 0, 0], 'Идеальный прогноз: нули'\nassert list(residuals([30.5], [28.0])) == [2.5], 'residuals([30.5], [28.0]) = [2.5]'"
    }
   },
   {
    "title": "Шаг boosting",
    "prompt": "<p>Функция <code>boost_step(pred, tree_pred, lr)</code> должна вернуть новый прогноз как массив NumPy: <code>pred + lr × tree_pred</code>.</p><p>Например, <code>boost_step([10, 10], [4, -2], 0.5)</code> → <code>[12, 9]</code>.</p>",
    "hints": [
     "Превратите списки в массивы: <code>np.asarray(...)</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nassert boost_step([10, 10], [4, -2], 0.5) is not None and _np.allclose(boost_step([10, 10], [4, -2], 0.5), [12, 9]), 'boost_step([10, 10], [4, -2], 0.5) → [12, 9]'\nassert _np.allclose(boost_step([1, 2, 3], [1, 1, 1], 0.1), [1.1, 2.1, 3.1]), 'lr=0.1: маленький шаг'\nassert _np.allclose(boost_step([5], [3], 1.0), [8]), 'lr=1.0: полный шаг'"
    }
   },
   {
    "title": "Регрессия boosting",
    "prompt": "<p>Обучите <code>HistGradientBoostingRegressor(max_iter=100, random_state=0)</code> под именем <code>hgb</code> на числовых признаках квартир (<code>fnum</code>) на train и запишите тестовый R² в <code>hgb_r2</code>.</p>",
    "hints": [
     "API как у классификатора: <code>fit</code>, <code>score</code>."
    ],
    "check": {
     "tests": "from sklearn.ensemble import HistGradientBoostingRegressor as _H\nassert isinstance(hgb, _H) and hgb.n_features_in_ == 5, 'hgb — HistGradientBoostingRegressor, обученный на fnum (5 признаков)'\nassert abs(hgb_r2 - hgb.score(X_test[fnum], y_test)) < 1e-9, 'hgb_r2 = hgb.score(X_test[fnum], y_test)'\n_h = _H(max_iter=100, random_state=0).fit(X_train[fnum], y_train).score(X_test[fnum], y_test)\nassert abs(hgb_r2 - _h) < 1e-6, f'hgb_r2 должно быть ≈ {_h:.3f}: max_iter=100, random_state=0'"
    }
   },
   {
    "title": "Два шага boosting",
    "prompt": "<p>Сделайте два шага вручную (<code>lr = 0.5</code>, деревья <code>DecisionTreeRegressor(max_depth=2, random_state=0)</code>). <code>pred0</code> — среднее y; шаг 1: обучите дерево на <code>y − pred0</code> и получите <code>pred1</code>; шаг 2: обучите новое дерево на <code>y − pred1</code> и получите <code>pred2</code>. Запишите MSE в список <code>mses = [mse0, mse1, mse2]</code>.</p>",
    "hints": [
     "Цель второго дерева — новый остаток: <code>y - pred1</code>.",
     "<code>((y - p) ** 2).mean()</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.tree import DecisionTreeRegressor as _DR\n_p0 = _np.full(len(y), y.mean())\n_p1 = _p0 + 0.5 * _DR(max_depth=2, random_state=0).fit(x, y - _p0).predict(x)\n_p2 = _p1 + 0.5 * _DR(max_depth=2, random_state=0).fit(x, y - _p1).predict(x)\n_m = [((y - _p) ** 2).mean() for _p in [_p0, _p1, _p2]]\nassert len(mses) == 3, 'В mses должно быть три значения: mse0, mse1, mse2'\nassert _np.allclose(mses, _m), f'Значения MSE ≈ {[round(_v, 1) for _v in _m]}. Второе дерево обучено на y − pred1?'\nassert mses[0] > mses[1] > mses[2], 'На каждом шаге MSE должен уменьшаться'"
    }
   },
   {
    "title": "Число итераций",
    "prompt": "<p>Для <code>HistGradientBoostingClassifier(learning_rate=0.1, random_state=0)</code> при <code>max_iter</code> ∈ [10, 50, 200] запишите среднее 3-fold ROC AUC на <code>X_num</code>, <code>y</code> в <code>auc_by_iter</code>. Лучшее значение запишите в <code>best_iter</code>.</p>",
    "hints": [
     "<code>HistGradientBoostingClassifier(learning_rate=0.1, max_iter=n, random_state=0)</code>"
    ],
    "check": {
     "tests": "from sklearn.ensemble import HistGradientBoostingClassifier as _H\nfrom sklearn.model_selection import cross_val_score as _cvs\nassert sorted(auc_by_iter) == [10, 50, 200], 'Ключи: 10, 50, 200'\n_r = _cvs(_H(learning_rate=0.1, max_iter=10, random_state=0), X_num, y, cv=3, scoring='roc_auc').mean()\nassert abs(auc_by_iter[10] - _r) < 1e-6, f\"Для max_iter=10 AUC ≈ {_r:.4f}: cv=3, scoring='roc_auc'\"\nassert best_iter == max(auc_by_iter, key=auc_by_iter.get), 'best_iter — max_iter с самым высоким AUC'\nassert auc_by_iter[200] < auc_by_iter[best_iter] or best_iter == 200, 'best_iter выбран неверно'"
    }
   },
   {
    "title": "Boosting с NaN",
    "prompt": "<p>HGB умеет работать с пропусками сам. Разбиение <code>X_num</code> готово. Обучите <code>HistGradientBoostingClassifier(max_iter=100, learning_rate=0.05, random_state=0)</code> без imputer и запишите тестовый AUC в <code>hgb_auc</code>. Для сравнения <code>make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))</code> → <code>lr_auc</code>.</p>",
    "hints": [
     "HGB: <code>fit(X_train, y_train)</code> напрямую, с NaN.",
     "<code>roc_auc_score(y_test, model.predict_proba(X_test)[:, 1])</code>"
    ],
    "check": {
     "tests": "from sklearn.ensemble import HistGradientBoostingClassifier as _H\nfrom sklearn.metrics import roc_auc_score as _ra\nassert X_train.isna().any().any(), 'В X_train должны остаться NaN: HGB не нужен imputer'\n_h = _ra(y_test, _H(max_iter=100, learning_rate=0.05, random_state=0).fit(X_train, y_train).predict_proba(X_test)[:, 1])\nassert abs(hgb_auc - _h) < 1e-6, f'hgb_auc должно быть ≈ {_h:.3f}'\nassert 0.75 < lr_auc < 0.9, f'lr_auc должно быть ≈ 0.8, у вас {lr_auc:.3f}'"
    }
   },
   {
    "title": "Цикл boosting",
    "prompt": "<p>Напишите gradient boosting как цикл: начните с <code>pred</code> = среднее y, на каждом из 20 шагов обучайте <code>DecisionTreeRegressor(max_depth=2, random_state=0)</code> на остатках и делайте <code>pred += 0.3 * tree.predict(x)</code>. Запишите MSE <b>после</b> каждого шага в список <code>mses</code> (20 значений).</p>",
    "hints": [
     "Внутри цикла: обучите дерево на <code>y - pred</code>, затем обновите <code>pred</code>.",
     "Вычисляйте MSE после обновления."
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.tree import DecisionTreeRegressor as _DR\n_p = _np.full(len(y), y.mean())\n_m = []\nfor _i in range(20):\n    _p = _p + 0.3 * _DR(max_depth=2, random_state=0).fit(x, y - _p).predict(x)\n    _m.append(((y - _p) ** 2).mean())\nassert len(mses) == 20, 'В mses должно быть 20 значений'\nassert _np.allclose(mses, _m), 'Значения MSE неверны: каждое дерево обучается на y − pred, затем pred += 0.3 * tree.predict(x)'\nassert all(mses[_i] >= mses[_i + 1] for _i in range(19)), 'MSE должен уменьшаться на каждом шаге'"
    }
   },
   {
    "title": "Скорость и сетка шагов",
    "prompt": "<p>Проверьте через <code>GridSearchCV</code> сетку для <code>HistGradientBoostingClassifier(random_state=0)</code>: <code>learning_rate</code> ∈ [0.05, 0.2] и <code>max_iter</code> ∈ [30, 100] (<code>cv=3</code>, <code>scoring='roc_auc'</code>). Обучите <code>grid</code> на <code>X_num</code>, <code>y</code>, лучшие параметры запишите в <code>best_params</code>.</p>",
    "hints": [
     "Сетка: <code>{'learning_rate': [0.05, 0.2], 'max_iter': [30, 100]}</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import GridSearchCV as _G\nimport numpy as _np\nassert isinstance(grid, _G) and hasattr(grid, 'best_params_'), 'grid — обученный GridSearchCV'\nassert len(grid.cv_results_['params']) == 4 and grid.scoring == 'roc_auc', \"Сетка 2 × 2 = 4, scoring='roc_auc'\"\nassert sorted(set(_p['max_iter'] for _p in grid.cv_results_['params'])) == [30, 100], 'Значения max_iter: 30, 100'\nassert best_params == grid.best_params_, 'best_params = grid.best_params_'\nassert 0.7 < grid.best_score_ < 0.9, 'Лучший CV AUC ≈ 0.8'"
    }
   }
  ]
 },
 "mp-7": {
  "pr": [
   {
    "title": "Соотношение классов",
    "prompt": "<p>В данных churn запишите количество ушедших (<code>churned == 1</code>) в <code>n_pos</code>, количество остальных — в <code>n_neg</code>. Вычислите <code>ratio = n_neg / n_pos</code>: сколько остающихся приходится на одного ушедшего.</p>",
    "hints": [
     "<code>(df['churned'] == 1).sum()</code>"
    ]
   },
   {
    "title": "Сбалансированные веса",
    "prompt": "<p><code>class_weight='balanced'</code> задаёт каждому классу вес <code>n / (k · n_c)</code> (<code>n</code> — всего, <code>k</code> — число классов, <code>n_c</code> — размер класса). Функция <code>balanced_weights(y)</code> должна вернуть словарь <code>{класс: салмақ}</code>.</p><p>Например, <code>balanced_weights([0, 0, 0, 1])</code> → <code>{0: 0.667, 1: 2.0}</code> (примерно).</p>",
    "hints": [
     "<code>classes = sorted(set(y))</code>",
     "<code>len(y) / (len(classes) * y.count(c))</code>"
    ],
    "check": {
     "tests": "_w = balanced_weights([0, 0, 0, 1])\nassert isinstance(_w, dict) and set(_w) == {0, 1}, 'Верните словарь: ключи — классы'\nassert abs(_w[0] - 4 / 6) < 1e-9 and abs(_w[1] - 2) < 1e-9, 'balanced_weights([0, 0, 0, 1]) → {0: 0.667, 1: 2.0}'\n_v = balanced_weights([1, 0, 1, 0])\nassert abs(_v[0] - 1) < 1e-9 and abs(_v[1] - 1) < 1e-9, 'В сбалансированных данных веса равны 1'\n_u = balanced_weights(['a', 'b', 'b', 'c', 'c', 'c'])\nassert abs(_u['a'] - 2) < 1e-9 and abs(_u['c'] - 2 / 3) < 1e-9, 'Должна работать с тремя классами'"
    }
   },
   {
    "title": "Стоимость ошибок",
    "prompt": "<p>Функция <code>cost(y_true, y_pred, c_fp, c_fn)</code> должна вернуть общую стоимость: <code>FP × c_fp + FN × c_fn</code>.</p><p>Например, <code>cost([1, 0, 1, 0], [0, 1, 1, 0], 5000, 20000)</code> → <code>25000</code>.</p>",
    "hints": [
     "FP: истинно 0, прогноз 1. FN: истинно 1, прогноз 0."
    ],
    "check": {
     "tests": "assert cost([1, 0, 1, 0], [0, 1, 1, 0], 5000, 20000) == 25000, 'cost([1, 0, 1, 0], [0, 1, 1, 0], 5000, 20000) должна вернуть 25000'\nassert cost([1, 1], [1, 1], 5000, 20000) == 0, 'Без ошибок: 0'\nassert cost([0, 0, 0], [1, 1, 1], 3000, 15000) == 9000, '3 FP × 3000 = 9000'\nassert cost([1, 1, 0], [0, 0, 0], 3000, 15000) == 30000, '2 FN × 15000 = 30000'"
    }
   },
   {
    "title": "Порог и recall",
    "prompt": "<p><code>proba</code> готова. Для порогов <code>t</code> ∈ [0.2, 0.3, 0.4, 0.5] запишите тестовый recall в словарь <code>recalls</code>. Количество отмеченных абонентов запишите в словарь <code>flagged</code>.</p>",
    "hints": [
     "Цикл: <code>for t in [0.2, 0.3, 0.4, 0.5]:</code>",
     "<code>pred.sum()</code> — количество предупреждений."
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import OneHotEncoder as _OH, StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre():\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), cat)])\n_m = _Pl([('pre', _pre()), ('model', _LR(max_iter=1000))]).fit(X_train, y_train)\n_p = _m.predict_proba(X_test)[:, 1]\nfrom sklearn.metrics import recall_score as _rs\nassert sorted(recalls) == [0.2, 0.3, 0.4, 0.5] and sorted(flagged) == [0.2, 0.3, 0.4, 0.5], 'Ключи: 0.2, 0.3, 0.4, 0.5'\nassert all(abs(recalls[_t] - _rs(y_test, (_p >= _t).astype(int))) < 1e-9 for _t in recalls), 'recall неверен: (proba >= t)'\nassert all(int(flagged[_t]) == int((_p >= _t).sum()) for _t in flagged), 'flagged — количество абонентов с proba >= t'\nassert recalls[0.2] > recalls[0.5] and flagged[0.2] > flagged[0.5], 'При понижении порога растут и recall, и число предупреждений'"
    }
   },
   {
    "title": "Требование к precision",
    "prompt": "<p>Хотя бы половина предупреждений должна быть верной (precision ≥ 0.5). Из порогов <code>np.arange(0.1, 0.91, 0.05)</code> (<code>round(t, 2)</code>) найдите <b>наименьший</b> порог, при котором на test выполняется это условие: запишите его в <code>t_p50</code>, а recall при этом пороге — в <code>rec_p50</code>.</p>",
    "hints": [
     "Проверяйте пороги по возрастанию и прервите цикл <code>break</code> на первом подходящем.",
     "Если предупреждений нет, precision не определён: добавьте условие <code>pred.sum() &gt; 0</code>."
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import OneHotEncoder as _OH, StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre():\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), cat)])\n_m = _Pl([('pre', _pre()), ('model', _LR(max_iter=1000))]).fit(X_train, y_train)\n_p = _m.predict_proba(X_test)[:, 1]\nimport numpy as _np\nfrom sklearn.metrics import precision_score as _ps, recall_score as _rs\n_ok = [round(_t, 2) for _t in _np.arange(0.1, 0.91, 0.05) if (_p >= round(_t, 2)).sum() > 0 and _ps(y_test, (_p >= round(_t, 2)).astype(int)) >= 0.5]\nassert t_p50 is not None and abs(t_p50 - _ok[0]) < 1e-9, f't_p50 должно быть {_ok[0]}: наименьший порог, при котором precision ≥ 0.5'\nassert abs(rec_p50 - _rs(y_test, (_p >= _ok[0]).astype(int))) < 1e-9, 'rec_p50 — recall при этом пороге'"
    }
   },
   {
    "title": "Разбиение без stratify",
    "prompt": "<p>На маленьких данных разбиение без <code>stratify</code> может нарушить долю классов. Разбейте дважды с <code>random_state=5</code>, <code>test_size=0.25</code>: без stratify → доля ушедших в test <code>rate_plain</code>; с <code>stratify=y</code> → <code>rate_strat</code>. Доля по всем данным — <code>rate_all</code>.</p>",
    "hints": [
     "<code>train_test_split</code> возвращает четыре значения: y_test — четвёртое."
    ],
    "check": {
     "tests": "from sklearn.model_selection import train_test_split as _tts\nassert abs(rate_plain - _tts(X, y, test_size=0.25, random_state=5)[3].mean()) < 1e-9, 'rate_plain: без stratify, random_state=5'\nassert abs(rate_strat - _tts(X, y, test_size=0.25, random_state=5, stratify=y)[3].mean()) < 1e-9, 'rate_strat: stratify=y, random_state=5'\nassert abs(rate_all - y.mean()) < 1e-9, 'rate_all = y.mean()'\nassert abs(rate_strat - rate_all) < abs(rate_plain - rate_all), 'stratify сохраняет долю классов'"
    }
   },
   {
    "title": "Выбор порога на train",
    "prompt": "<p>Не выбирайте порог по test. <code>p_tr</code> — CV-вероятности на train (готовы). FP = 3000 ₸, FN = 15 000 ₸. Из порогов <code>np.arange(0.1, 0.91, 0.05)</code> (<code>round(t, 2)</code>) выберите порог <code>best_t</code> с наименьшей стоимостью на train. Затем обучите <code>model</code> на train и запишите стоимость на test при <code>best_t</code> в <code>test_cost</code>, при 0.5 — в <code>cost_05</code>.</p>",
    "hints": [
     "Словарь стоимостей: <code>{round(t, 2): cost(y_train, (p_tr &gt;= round(t, 2)).astype(int)) for t in ...}</code>",
     "Затем <code>model.fit(X_train, y_train)</code> и вероятности на test."
    ],
    "check": {
     "tests": "import numpy as _np\n_c = {round(_t, 2): cost(y_train, (p_tr >= round(_t, 2)).astype(int)) for _t in _np.arange(0.1, 0.91, 0.05)}\n_bt = min(_c, key=_c.get)\nfrom sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import OneHotEncoder as _OH, StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre():\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), cat)])\n_m = _Pl([('pre', _pre()), ('model', _LR(max_iter=1000))]).fit(X_train, y_train)\n_p = _m.predict_proba(X_test)[:, 1]\nassert best_t is not None and abs(best_t - _bt) < 1e-9, f'best_t = {_bt}: порог с наименьшей стоимостью на train (p_tr)'\nassert test_cost == cost(y_test, (_p >= _bt).astype(int)), 'test_cost: модель обучена на train, порог best_t на test'\nassert cost_05 == cost(y_test, (_p >= 0.5).astype(int)), 'cost_05: порог 0.5 на test'\nassert test_cost < cost_05, 'Порог, выбранный на train, должен быть на test дешевле порога 0.5'"
    }
   },
   {
    "title": "Бюджет: 30 звонков",
    "prompt": "<p>Отдел удержания может звонить только 30 абонентам в неделю. Обучите логистический Pipeline с <code>class_weight='balanced'</code> на train и выберите 30 абонентов на test с самой высокой вероятностью. Долю ушедших среди них запишите в <code>prec_at_30</code>, сколько всех ушедших из test попало в эту выборку, — в <code>rec_at_30</code>.</p>",
    "hints": [
     "Индексы по убыванию: <code>np.argsort(-p)[:30]</code>",
     "<code>y_test.values[top].sum()</code> — пойманные уходящие."
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import OneHotEncoder as _OH, StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre():\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), cat)])\nimport numpy as _np\n_b = _Pl([('pre', _pre()), ('model', _LR(max_iter=1000, class_weight='balanced'))]).fit(X_train, y_train)\n_q = _b.predict_proba(X_test)[:, 1]\n_h = int(y_test.values[_np.argsort(-_q)[:30]].sum())\nassert abs(prec_at_30 - _h / 30) < 1e-9, f'prec_at_30 = {_h}/30: 30 абонентов с самой высокой proba'\nassert abs(rec_at_30 - _h / int(y_test.sum())) < 1e-9, f'rec_at_30 = {_h}/{int(y_test.sum())}: пойманные уходящие / все уходящие'\nassert prec_at_30 > y_test.mean(), 'Доля среди выбранных 30 абонентов должна быть выше средней'"
    }
   }
  ]
 },
 "mp-8": {
  "pr": [
   {
    "title": "Центроид",
    "prompt": "<p>Функция <code>centroid(points)</code> должна вернуть центр точек (среднее по каждой координате) как список.</p><p>Например, <code>centroid([[0, 0], [2, 4]])</code> → <code>[1.0, 2.0]</code>.</p>",
    "hints": [
     "<code>np.asarray(points).mean(axis=0)</code> — среднее по столбцам."
    ],
    "check": {
     "tests": "import numpy as _np\nassert centroid([[0, 0], [2, 4]]) is not None and _np.allclose(centroid([[0, 0], [2, 4]]), [1, 2]), 'centroid([[0, 0], [2, 4]]) → [1.0, 2.0]'\nassert _np.allclose(centroid([[1, 2, 3]]), [1, 2, 3]), 'Одна точка: она сама'\nassert _np.allclose(centroid([[0, 0], [3, 0], [0, 3], [3, 3]]), [1.5, 1.5]), 'Центр квадрата [1.5, 1.5]'"
    }
   },
   {
    "title": "Ближайший центр",
    "prompt": "<p>Функция <code>assign(points, centers)</code> должна вернуть для каждой точки индекс ближайшего центра в виде списка (евклидово расстояние).</p><p>Например, <code>assign([[0, 1], [9, 9]], [[0, 0], [10, 10]])</code> → <code>[0, 1]</code>.</p>",
    "hints": [
     "Для каждой точки: <code>((C - p) ** 2).sum(axis=1)</code>, затем <code>np.argmin</code>."
    ],
    "check": {
     "tests": "assert list(assign([[0, 1], [9, 9]], [[0, 0], [10, 10]])) == [0, 1], 'assign([[0, 1], [9, 9]], [[0, 0], [10, 10]]) → [0, 1]'\nassert list(assign([[5, 5], [1, 0], [6, 7]], [[0, 0], [5, 5], [10, 10]])) == [1, 0, 1], 'С тремя центрами: [1, 0, 1]'\nassert list(assign([[2], [8]], [[0], [5], [9]])) == [0, 2], 'Точки в одномерном пространстве: [0, 2]'"
    }
   },
   {
    "title": "Размеры кластеров",
    "prompt": "<p>Сгруппируйте квартиры по площади и цене. <code>Z</code> готов (масштабирован). Обучите <code>KMeans(n_clusters=3, n_init=10, random_state=0)</code> под именем <code>km</code> и запишите количество квартир в каждом кластере в Series <code>sizes</code> (отсортирован по индексу).</p>",
    "hints": [
     "<code>pd.Series(km.labels_).value_counts().sort_index()</code>"
    ],
    "check": {
     "tests": "from sklearn.cluster import KMeans as _KM\n_l = _KM(n_clusters=3, n_init=10, random_state=0).fit(Z).labels_\nassert isinstance(km, _KM) and km.n_clusters == 3, 'km — KMeans с 3 кластерами'\nassert list(sizes.index) == [0, 1, 2], 'Индекс sizes: 0, 1, 2 (sort_index)'\nassert int(sizes.sum()) == 400 and [int(_v) for _v in sizes.values] == [int((_l == _k).sum()) for _k in range(3)], 'sizes — количество квартир в каждом кластере'"
    }
   },
   {
    "title": "Inertia вручную",
    "prompt": "<p><code>km</code> обучена. Inertia — сумма квадратов расстояний от каждой точки до её центра. Вычислите её вручную через <code>km.cluster_centers_</code> и <code>km.labels_</code> и запишите в <code>inertia_manual</code>.</p>",
    "hints": [
     "<code>km.cluster_centers_[km.labels_]</code> — центр каждой точки.",
     "<code>((Z - assigned) ** 2).sum()</code>"
    ]
   },
   {
    "title": "Churn сегментов",
    "prompt": "<p><code>km</code> разделила абонентов на 3 сегмента. Запишите метки в столбец <code>seg['segment']</code>, долю ухода каждого сегмента — в <code>rate_by_seg</code>, самый рискованный сегмент — в <code>riskiest</code>. Среднее <code>tenure_months</code> каждого сегмента запишите в <code>tenure_by_seg</code>.</p>",
    "hints": [
     "<code>seg.groupby('segment')['churned'].mean()</code>"
    ],
    "check": {
     "tests": "_r = seg['churned'].groupby(km.labels_).mean()\nassert 'segment' in seg.columns and (seg['segment'].values == km.labels_).all(), \"seg['segment'] = km.labels_\"\nassert len(rate_by_seg) == 3 and all(abs(rate_by_seg[_k] - _r[_k]) < 1e-9 for _k in _r.index), 'rate_by_seg — среднее churned по сегментам'\nassert riskiest == _r.idxmax(), f'riskiest должно быть {_r.idxmax()}'\nassert tenure_by_seg[riskiest] < seg['tenure_months'].mean(), 'Самый рискованный сегмент — новые абоненты (tenure ниже среднего)'"
    }
   },
   {
    "title": "Новый клиент в сегменте",
    "prompt": "<p>Новый абонент: 4 месяца, 11 500 ₸, 32 ГБ, 2 звонка. Масштабируйте его <b>тем же</b> <code>sc</code>, с помощью <code>km.predict</code> определите сегмент и запишите в <code>new_seg</code> (int). Масштабированную точку запишите в <code>z_new</code>.</p>",
    "hints": [
     "Только <code>transform</code>: <code>sc.transform(new)</code>",
     "<code>int(km.predict(z_new)[0])</code>"
    ],
    "check": {
     "tests": "import numpy as _np\n_z = sc.transform(new)\n_k = int(_np.argmin(((km.cluster_centers_ - _z[0]) ** 2).sum(axis=1)))\nassert _np.allclose(_np.asarray(z_new).reshape(1, -1), _z), 'z_new = sc.transform(new): не обучайте новый scaler'\nassert new_seg == _k, f'new_seg должно быть {_k}: km.predict(z_new)[0]'"
    }
   },
   {
    "title": "Один шаг KMeans",
    "prompt": "<p>Напишите одну итерацию KMeans. <code>kmeans_step(points, centers)</code>: (1) назначьте каждую точку ближайшему центру; (2) сдвиньте каждый центр к среднему своих точек (центр без точек остаётся на месте). Верните новые центры как массив NumPy.</p><p>Например, <code>kmeans_step([[0, 0], [0, 2], [10, 10]], [[1, 1], [9, 9]])</code> → <code>[[0, 1], [10, 10]]</code>.</p>",
    "hints": [
     "Назначение: для каждой точки <code>np.argmin(((C - p) ** 2).sum(axis=1))</code>",
     "Обновление: <code>P[labels == k].mean(axis=0)</code>"
    ],
    "check": {
     "tests": "import numpy as _np\n_r = kmeans_step([[0, 0], [0, 2], [10, 10]], [[1, 1], [9, 9]])\nassert _r is not None and _np.allclose(_r, [[0, 1], [10, 10]]), 'kmeans_step([[0, 0], [0, 2], [10, 10]], [[1, 1], [9, 9]]) → [[0, 1], [10, 10]]'\nassert _np.allclose(kmeans_step([[1, 1], [2, 2]], [[0, 0], [50, 50]]), [[1.5, 1.5], [50, 50]]), 'Центр без точек остаётся на месте'\nassert _np.allclose(kmeans_step([[0], [1], [9], [10], [11]], [[0], [5], [12]]), [[0.5], [5], [10]]), 'В одномерном случае: [[0.5], [5], [10]] (у среднего центра нет точек)'"
    }
   },
   {
    "title": "Кластеры без масштабирования",
    "prompt": "<p>Немасштабированный KMeans управляется <code>monthly_fee</code> (тысячи тенге). Обучите две модели на одних и тех же <code>cols</code> (<code>n_clusters=3, n_init=10, random_state=0</code>): на сырых данных и после <code>StandardScaler</code>. Для каждой запишите размах (max − min) средних значений <code>tenure_months</code> по кластерам в <code>range_raw</code> и <code>range_scaled</code>.</p>",
    "hints": [
     "Напишите функцию для повторяющейся части.",
     "<code>seg['tenure_months'].groupby(labels).mean()</code>"
    ],
    "check": {
     "tests": "from sklearn.cluster import KMeans as _KM\nfrom sklearn.preprocessing import StandardScaler as _SS\ndef _tr(_d):\n    _m = seg['tenure_months'].groupby(_KM(n_clusters=3, n_init=10, random_state=0).fit(_d).labels_).mean()\n    return _m.max() - _m.min()\nassert abs(range_raw - _tr(seg[cols].values)) < 1e-6, 'range_raw неверно: KMeans на сыром seg[cols]'\nassert abs(range_scaled - _tr(_SS().fit_transform(seg[cols]))) < 1e-6, 'range_scaled неверно: StandardScaler().fit_transform(seg[cols])'\nassert range_scaled > range_raw + 10, 'После масштабирования разница по tenure становится видна'"
    }
   }
  ]
 },
 "mp-9": {
  "pr": [
   {
    "title": "Самые важные признаки",
    "prompt": "<p>Функция <code>top_k(imp, k)</code> должна вернуть список названий <code>k</code> признаков с самой большой важностью из словаря <code>{белгі: маңыздылық}</code> (по убыванию).</p><p>Например, <code>top_k({'a': 0.1, 'b': 0.7, 'c': 0.2}, 2)</code> → <code>['b', 'c']</code>.</p>",
    "hints": [
     "<code>sorted(imp, key=imp.get, reverse=True)</code>",
     "Срез: <code>[:k]</code>"
    ],
    "check": {
     "tests": "assert top_k({'a': 0.1, 'b': 0.7, 'c': 0.2}, 2) == ['b', 'c'], \"top_k({'a': 0.1, 'b': 0.7, 'c': 0.2}, 2) должна вернуть ['b', 'c']\"\nassert top_k({'tenure_months': 0.4, 'monthly_fee': 0.25, 'support_calls': 0.3}, 1) == ['tenure_months'], 'k=1: самый важный'\nassert top_k({'x': 0.5}, 3) == ['x'], 'Если k больше числа признаков, вернуть все'"
    }
   },
   {
    "title": "Важность дерева",
    "prompt": "<p>Обучите <code>DecisionTreeRegressor(max_depth=4, random_state=0)</code> на числовых признаках квартир (<code>fnum</code>, все данные). Запишите <code>feature_importances_</code> в Series <code>imp</code> с названиями столбцов и отсортируйте по убыванию. Самый важный признак запишите в <code>top</code>.</p>",
    "hints": [
     "<code>pd.Series(tree.feature_importances_, index=fnum)</code>",
     "<code>.sort_values(ascending=False)</code>"
    ],
    "check": {
     "tests": "from sklearn.tree import DecisionTreeRegressor as _DR\n_i = pd.Series(_DR(max_depth=4, random_state=0).fit(flats[fnum], flats['price_mln']).feature_importances_, index=fnum)\nassert isinstance(imp, pd.Series) and set(imp.index) == set(fnum), 'Индекс imp — столбцы fnum'\nassert all(abs(imp[_c] - _i[_c]) < 1e-9 for _c in fnum), 'Важности неверны: max_depth=4, random_state=0, все данные'\nassert list(imp.values) == sorted(imp.values, reverse=True), 'Сортировка по убыванию'\nassert top == _i.idxmax(), f'top должно быть {_i.idxmax()}'"
    }
   },
   {
    "title": "Модули коэффициентов",
    "prompt": "<p>Модель <code>model</code> (масштабированные признаки + LogisticRegression) обучена. Запишите коэффициенты в Series <code>coefs</code> с названиями признаков из <code>pre</code>. Признак с самым большим модулем (<code>abs</code>) запишите в <code>top_abs</code>.</p>",
    "hints": [
     "<code>model.named_steps['pre'].get_feature_names_out()</code>",
     "<code>coefs.abs().idxmax()</code>"
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import OneHotEncoder as _OH, StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre():\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), cat)])\n_m = _Pl([('pre', _pre()), ('model', _LR(max_iter=1000))]).fit(X_train, y_train)\n_p = _m.predict_proba(X_test)[:, 1]\nimport pandas as _pd\n_c = _pd.Series(_m.named_steps['model'].coef_[0], index=_m.named_steps['pre'].get_feature_names_out())\nassert isinstance(coefs, pd.Series) and len(coefs) == 14, 'coefs — Series из 14 признаков'\nassert list(coefs.index) == list(_c.index) and all(abs(coefs.values - _c.values) < 1e-6), 'coefs = coef_[0], индекс — get_feature_names_out()'\nassert top_abs == _c.abs().idxmax(), f'top_abs должно быть {_c.abs().idxmax()}: coefs.abs().idxmax()'"
    }
   },
   {
    "title": "Permutation вручную",
    "prompt": "<p>Вычислите permutation importance для одного признака вручную. <code>base_auc</code> — тестовый AUC. Затем перемешайте <code>tenure_months</code> в копии <code>X_test</code> через <code>np.random.default_rng(0).permutation</code> и запишите новый AUC в <code>shuffled_auc</code>. <code>drop = base_auc - shuffled_auc</code>.</p>",
    "hints": [
     "<code>Xs = X_test.copy()</code> — не портите исходные данные.",
     "<code>np.random.default_rng(0).permutation(Xs['tenure_months'].values)</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.metrics import roc_auc_score as _ra\n_X = X_test.copy()\n_X['tenure_months'] = _np.random.default_rng(0).permutation(_X['tenure_months'].values)\n_s = _ra(y_test, model.predict_proba(_X)[:, 1])\nassert abs(base_auc - _ra(y_test, model.predict_proba(X_test)[:, 1])) < 1e-9, 'base_auc — AUC на исходном X_test'\nassert abs(shuffled_auc - _s) < 1e-9, f'shuffled_auc ≈ {_s:.3f}: перемешайте tenure_months в копии X_test'\nassert 'tenure_months' in X_test.columns and abs(drop - (base_auc - shuffled_auc)) < 1e-9 and drop > 0.05, 'drop = base_auc - shuffled_auc (положительное)'"
    }
   },
   {
    "title": "Permutation для квартир",
    "prompt": "<p><code>rf</code> (на числовых признаках квартир) обучена. На test вычислите <code>permutation_importance(rf, X_test[fnum], y_test, n_repeats=5, random_state=0)</code> и запишите <code>importances_mean</code> в Series <code>perm</code> (по убыванию). Бесполезные признаки (значение меньше 0.01) запишите в список <code>useless</code>.</p>",
    "hints": [
     "<code>r.importances_mean</code>",
     "Фильтр: <code>perm[perm &lt; 0.01].index</code>"
    ],
    "check": {
     "tests": "from sklearn.inspection import permutation_importance as _pi\n_r = pd.Series(_pi(rf, X_test[fnum], y_test, n_repeats=5, random_state=0).importances_mean, index=fnum)\nassert isinstance(perm, pd.Series) and set(perm.index) == set(fnum), 'perm — Series по fnum'\nassert all(abs(perm[_c] - _r[_c]) < 1e-9 for _c in fnum), 'Значения неверны: n_repeats=5, random_state=0, на тестовых данных'\nassert list(perm.values) == sorted(perm.values, reverse=True), 'Сортировка по убыванию'\nassert sorted(useless) == sorted(_r[_r < 0.01].index), 'useless — признаки со значением меньше 0.01'"
    }
   },
   {
    "title": "Объяснение одного прогноза",
    "prompt": "<p>В логистической модели логит абонента — это сумма вкладов: <code>z = Σ xᵢ·wᵢ + b</code>. Для первого абонента test возьмите <code>x0 = pre.transform(X_test.iloc[[0]])</code> и запишите вклад каждого признака (<code>x0 · coef</code>) в Series <code>contrib</code> (индекс — названия признаков). <code>p0 = sigmoid(contrib.sum() + intercept)</code> должно равняться <code>proba[0]</code>. Самый большой вклад (по модулю) — в <code>top_driver</code>.</p>",
    "hints": [
     "<code>model.named_steps['pre'].transform(X_test.iloc[[0]])</code> (двойные скобки — DataFrame)",
     "<code>contrib.sum() + lr.intercept_[0]</code>, затем сигмоида."
    ],
    "check": {
     "tests": "assert isinstance(contrib, pd.Series) and len(contrib) == 14, 'contrib — вклады 14 признаков'\nassert abs(p0 - proba[0]) < 1e-6, f'p0 = proba[0] ≈ {proba[0]:.4f}: sigmoid(contrib.sum() + intercept_[0])'\nassert top_driver == contrib.abs().idxmax(), 'top_driver = contrib.abs().idxmax()'\nassert str(top_driver).startswith(('num__', 'cat__')), 'top_driver — название признака из pre'"
    }
   },
   {
    "title": "Кривая зависимости",
    "prompt": "<p>Постройте partial dependence вручную. Для <code>t</code> ∈ [1, 12, 24, 36, 48, 60, 72] в копии <code>X_test</code> установите <code>tenure_months</code> у <b>всех</b> абонентов равным <code>t</code> и запишите среднюю вероятность ухода в словарь <code>pd_curve</code>.</p>",
    "hints": [
     "<code>Xc = X_test.copy()</code>, <code>Xc['tenure_months'] = t</code>",
     "<code>model.predict_proba(Xc)[:, 1].mean()</code>"
    ],
    "check": {
     "tests": "_ts = [1, 12, 24, 36, 48, 60, 72]\n_r = {}\nfor _t in _ts:\n    _X = X_test.copy()\n    _X['tenure_months'] = _t\n    _r[_t] = model.predict_proba(_X)[:, 1].mean()\nassert sorted(pd_curve) == _ts, 'Ключи: 1, 12, 24, 36, 48, 60, 72'\nassert all(abs(pd_curve[_t] - _r[_t]) < 1e-9 for _t in _ts), 'Значения неверны: в копии tenure_months = t, затем predict_proba(...)[:, 1].mean()'\nassert all(pd_curve[_ts[_i]] > pd_curve[_ts[_i + 1]] for _i in range(6)), 'С ростом срока средняя вероятность должна уменьшаться'\nassert X_test['tenure_months'].nunique() > 7, 'Исходный X_test не должен меняться: используйте .copy()'"
    }
   },
   {
    "title": "Удаление признака",
    "prompt": "<p>Ещё один способ оценить важность — удалить признак и переобучить модель. <code>base_auc</code> — тестовый AUC полного Pipeline. Без <code>tenure_months</code> (уберите его из <code>num</code> и постройте новый <code>pre</code>) обучите ту же модель и запишите AUC в <code>auc_without</code>. <code>drop_auc = base_auc - auc_without</code>.</p>",
    "hints": [
     "<code>num2 = [c for c in num if c != 'tenure_months']</code>",
     "Передайте <code>num2</code> в новый ColumnTransformer; X_train не меняется."
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import OneHotEncoder as _OH, StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre():\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), cat)])\n_m = _Pl([('pre', _pre()), ('model', _LR(max_iter=1000))]).fit(X_train, y_train)\n_p = _m.predict_proba(X_test)[:, 1]\nfrom sklearn.metrics import roc_auc_score as _ra\n_n2 = [_c for _c in num if _c != 'tenure_months']\n_m2 = _Pl([('pre', _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), _n2), ('cat', _OH(handle_unknown='ignore'), cat)])), ('model', _LR(max_iter=1000))]).fit(X_train, y_train)\n_aw = _ra(y_test, _m2.predict_proba(X_test)[:, 1])\nassert abs(base_auc - _ra(y_test, _p)) < 1e-6, 'base_auc — тестовый AUC полной модели'\nassert abs(auc_without - _aw) < 1e-6, f'auc_without ≈ {_aw:.3f}: уберите tenure_months из num и постройте новый pre'\nassert abs(drop_auc - (base_auc - auc_without)) < 1e-9 and drop_auc > 0.05, 'drop_auc = base_auc − auc_without, заметно положительное'"
    }
   }
  ]
 },
 "mp-10": {
  "pr": [
   {
    "title": "Словарь model card",
    "prompt": "<p>Создайте короткий документ о модели (model card): в словаре <code>card</code> должны быть ключи <code>'name'</code> (текст), <code>'version'</code> (целое число), <code>'data'</code> (<code>'churn.csv'</code>), <code>'metric'</code> (<code>'roc_auc'</code>) и <code>'limitations'</code> (список, в котором хотя бы один текст).</p>",
    "hints": [
     "Словарь: <code>{'name': '...', 'version': 1, ...}</code>"
    ],
    "check": {
     "tests": "assert isinstance(card, dict) and {'name', 'version', 'data', 'metric', 'limitations'} <= set(card), \"Ключи card: name, version, data, metric, limitations\"\nassert isinstance(card['name'], str) and card['name'], 'name — непустой текст'\nassert isinstance(card['version'], int), 'version — целое число'\nassert card['data'] == 'churn.csv' and card['metric'] == 'roc_auc', \"data = 'churn.csv', metric = 'roc_auc'\"\nassert isinstance(card['limitations'], list) and len(card['limitations']) >= 1 and all(isinstance(_x, str) for _x in card['limitations']), 'limitations — список текстов (хотя бы один)'"
    }
   },
   {
    "title": "Сохранить модель квартир",
    "prompt": "<p>Модель <code>model</code> (цена квартир) обучена. Сохраните её через <code>joblib.dump</code> в файл <code>flats_lr.joblib</code> и загрузите обратно в <code>loaded</code>. Одинаковы ли прогнозы на <code>X</code> у обеих моделей — <code>same</code> (bool).</p>",
    "hints": [
     "<code>joblib.dump(model, 'flats_lr.joblib')</code>",
     "<code>joblib.load('flats_lr.joblib')</code>"
    ],
    "check": {
     "tests": "import os as _os\nfrom sklearn.linear_model import LinearRegression as _LinR\nassert _os.path.exists('flats_lr.joblib'), 'Файл flats_lr.joblib не найден: joblib.dump(model, ...)'\nassert isinstance(loaded, _LinR) and loaded is not model, 'loaded — LinearRegression, загруженный из файла'\nassert bool(same) is True, 'same = (loaded.predict(X) == model.predict(X)).all() → True'"
    }
   },
   {
    "title": "Записать card в JSON",
    "prompt": "<p>Запишите <code>card</code> в файл <code>card.json</code> через <code>json.dump</code> (<code>ensure_ascii=False</code>, кириллица должна сохраниться). Затем перечитайте файл в <code>card2</code>. Они должны совпадать.</p>",
    "hints": [
     "<code>with open('card.json', 'w', encoding='utf-8') as f: json.dump(card, f, ensure_ascii=False)</code>",
     "Чтение: <code>json.load(f)</code>"
    ],
    "check": {
     "tests": "import os as _os\nassert _os.path.exists('card.json'), 'Файл card.json не найден'\nassert card2 == card, 'card2 — словарь, прочитанный из файла, должен совпадать с card'\nassert 'Алматы' in open('card.json', encoding='utf-8').read(), 'ensure_ascii=False: в файле кириллица должна остаться как есть'"
    }
   },
   {
    "title": "Имя файла модели",
    "prompt": "<p>Чтобы не путать версии моделей, задайте имя файла по правилу. Функция <code>model_filename(name, version, date)</code> должна вернуть <code>'&lt;name&gt;_v&lt;version&gt;_&lt;date&gt;.joblib'</code>; пробелы в <code>name</code> заменяются на <code>_</code>, всё в нижнем регистре.</p><p>Например, <code>model_filename('Churn LogReg', 3, '2024-05-01')</code> → <code>'churn_logreg_v3_2024-05-01.joblib'</code>.</p>",
    "hints": [
     "f-строка: <code>f\"{...}_v{version}_{date}.joblib\"</code>",
     "<code>name.lower().replace(' ', '_')</code>"
    ],
    "check": {
     "tests": "assert model_filename('Churn LogReg', 3, '2024-05-01') == 'churn_logreg_v3_2024-05-01.joblib', \"model_filename('Churn LogReg', 3, '2024-05-01') должна вернуть 'churn_logreg_v3_2024-05-01.joblib'\"\nassert model_filename('flats', 1, '2024-01-15') == 'flats_v1_2024-01-15.joblib', \"model_filename('flats', 1, '2024-01-15') → 'flats_v1_2024-01-15.joblib'\"\nassert model_filename('Pater Baga RF', 12, 'x') == 'pater_baga_rf_v12_x.joblib', 'Несколько пробелов тоже заменяются'"
    }
   },
   {
    "title": "Прогноз загруженной моделью",
    "prompt": "<p>Модель <code>model</code> (полный Pipeline) обучена. Сохраните её в <code>churn_lr.joblib</code> и загрузите в <code>loaded</code>. Вероятности ухода двух новых абонентов (<code>new</code>, возраст может быть пустым) через <code>loaded</code> запишите в массив <code>probs</code>.</p>",
    "hints": [
     "Pipeline сам обрабатывает исходные столбцы (вместе с NaN).",
     "<code>loaded.predict_proba(new)[:, 1]</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nimport os as _os\nassert _os.path.exists('churn_lr.joblib') and loaded is not None and loaded is not model, 'Сохраните модель в churn_lr.joblib и загрузите в loaded'\nassert len(probs) == 2 and _np.allclose(probs, model.predict_proba(new)[:, 1]), 'probs = loaded.predict_proba(new)[:, 1]'\nassert probs[0] > 0.5 > probs[1], 'Новый премиум-абонент рискован, абонент со старым договором в безопасности'"
    }
   },
   {
    "title": "Метрики в card",
    "prompt": "<p>Добавьте в model card тестовые метрики: <code>card['metrics']</code> = <code>{'auc': ..., 'recall': ..., 'precision': ...}</code>, каждая округлена до 3 знаков (<code>round</code>), порог 0.5. Также запишите <code>card['n_test'] = len(X_test)</code>.</p>",
    "hints": [
     "<code>round(roc_auc_score(y_test, proba), 3)</code>",
     "Порог 0.5: <code>model.predict(X_test)</code>"
    ],
    "check": {
     "tests": "from sklearn.metrics import roc_auc_score as _ra, recall_score as _rs, precision_score as _ps\n_pr = model.predict(X_test)\nassert 'metrics' in card and set(card['metrics']) == {'auc', 'recall', 'precision'}, \"Ключи card['metrics']: auc, recall, precision\"\nassert card['metrics']['auc'] == round(_ra(y_test, proba), 3), 'auc — по proba, 3 знака'\nassert card['metrics']['recall'] == round(_rs(y_test, _pr), 3) and card['metrics']['precision'] == round(_ps(y_test, _pr), 3), 'recall и precision — по model.predict(X_test), 3 знака'\nassert card['n_test'] == 150, \"card['n_test'] = len(X_test) = 150\""
    }
   },
   {
    "title": "Функция сохранения и проверки",
    "prompt": "<p>Напишите функцию <code>save_and_check(model, X, path)</code>: сохраните модель в <code>path</code>, загрузите обратно и верните <code>True</code>, если прогнозы на <code>X</code> полностью совпадают, иначе <code>False</code>. Вызовите её для <code>model</code> с файлом <code>churn_v1.joblib</code> и запишите результат в <code>ok</code>.</p>",
    "hints": [
     "Внутри функции: <code>joblib.dump</code>, <code>joblib.load</code>, затем сравнение.",
     "<code>np.array_equal(a, b)</code>"
    ],
    "check": {
     "tests": "import os as _os\nfrom sklearn.tree import DecisionTreeClassifier as _DT\nassert ok is True, 'ok = save_and_check(model, X_test, \"churn_v1.joblib\") → True'\nassert _os.path.exists('churn_v1.joblib'), 'Функция должна сохранить модель в path'\n_t = _DT(max_depth=2, random_state=0).fit(X_test[['tenure_months', 'monthly_fee']], y_test)\nassert save_and_check(_t, X_test[['tenure_months', 'monthly_fee']], '_tree_check.joblib') is True and _os.path.exists('_tree_check.joblib'), 'Функция должна работать с любой моделью'"
    }
   },
   {
    "title": "Card по тарифам",
    "prompt": "<p>Отдел fairness: на test посчитайте recall по каждому <code>plan</code> и запишите в словарь <code>card['recall_by_plan']</code> (<code>{тариф: recall}</code>, 3 знака, <code>zero_division=0</code>). Тариф с самым низким recall запишите в <code>card['worst_plan']</code>.</p>",
    "hints": [
     "<code>res.groupby('plan')</code> — <code>for p, g in ...</code> для каждой группы.",
     "<code>recall_score(g['y'], g['pred'], zero_division=0)</code>"
    ],
    "check": {
     "tests": "from sklearn.metrics import recall_score as _rs\n_res = pd.DataFrame({'plan': X_test['plan'], 'y': y_test, 'pred': model.predict(X_test)})\n_r = {_p: round(_rs(_g['y'], _g['pred'], zero_division=0), 3) for _p, _g in _res.groupby('plan')}\nassert isinstance(card.get('recall_by_plan'), dict) and set(card['recall_by_plan']) == {'basic', 'standard', 'premium'}, \"card['recall_by_plan'] — словарь по трём тарифам\"\nassert all(abs(card['recall_by_plan'][_p] - _r[_p]) < 1e-9 for _p in _r), 'Значения recall неверны: только тестовые строки этого тарифа, 3 знака'\nassert card.get('worst_plan') == min(_r, key=_r.get), f\"worst_plan = {min(_r, key=_r.get)} должно быть\""
    }
   }
  ]
 }
} });
