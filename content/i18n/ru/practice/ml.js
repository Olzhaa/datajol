// ml practice tasks: Russian text. Code, solutions and checks are in content/practice/ml.js.
DJ.i18n.patch({ lessons: {
 "ml-1": {
  "pr": [
   {
    "title": "Признаки абонента",
    "prompt": "<p>Создайте <code>X</code> из файла <code>churn.csv</code> (столбцы: <code>age</code>, <code>tenure_months</code>, <code>monthly_fee</code>, в этом порядке) и целевую переменную <code>y</code> (<code>churned</code>).</p><p>Например, <code>X.shape</code> → <code>(600, 3)</code>.</p>",
    "hints": [
     "Несколько столбцов: <code>churn[['age', 'tenure_months', 'monthly_fee']]</code>",
     "Целевая переменная: <code>churn['churned']</code>"
    ],
    "check": {
     "tests": "assert isinstance(X, pd.DataFrame), 'X должен быть DataFrame: используйте двойные скобки [[...]]'\nassert list(X.columns) == ['age', 'tenure_months', 'monthly_fee'], 'Столбцы X: age, tenure_months, monthly_fee (в этом порядке)'\nassert isinstance(y, pd.Series) and y.name == 'churned', 'y должен быть столбцом churned (Series, одинарные скобки)'\nassert len(X) == 600 and len(y) == 600, 'В X и y должны остаться все 600 абонентов'"
    }
   },
   {
    "title": "Определение типа задачи",
    "prompt": "<p>Напишите функцию <code>task_type(values)</code>. Если значения целевой переменной равны только 0 или 1, она должна вернуть <code>'classification'</code>, иначе <code>'regression'</code>.</p><p>Например, <code>task_type([0, 1, 1])</code> → <code>'classification'</code>, <code>task_type([35.5, 41.2])</code> → <code>'regression'</code>.</p>",
    "hints": [
     "<code>set(values) &lt;= {0, 1}</code> проверяет, что все значения равны 0 или 1."
    ],
    "check": {
     "tests": "assert task_type([0, 1, 1, 0]) == 'classification', \"task_type([0, 1, 1, 0]) должна вернуть «classification»\"\nassert task_type([35.5, 41.2, 28.0]) == 'regression', \"Для значений (35.5, 41.2, ...) должна быть «regression»\"\nassert task_type([1, 1, 1]) == 'classification', \"Только единицы и нули тоже задача классификации: «classification»\"\nassert task_type([0, 1, 2]) == 'regression', \"Для значений 0, 1, 2 должна быть «regression» (не только 0 и 1)\""
    }
   },
   {
    "title": "Размер таблицы",
    "prompt": "<p>Из таблицы <code>flats</code> возьмите в <code>X</code> все столбцы, кроме <code>flat_id</code> и <code>price_mln</code>. Количество строк запишите в <code>n_samples</code>, количество признаков — в <code>n_features</code>.</p><p>Подсказка: <code>X.shape</code> возвращает два числа.</p>",
    "hints": [
     "<code>flats.drop(columns=['flat_id', 'price_mln'])</code>",
     "<code>n_samples, n_features = X.shape</code>"
    ],
    "check": {
     "tests": "assert 'price_mln' not in X.columns and 'flat_id' not in X.columns, 'В X не должно быть price_mln и flat_id'\nassert n_samples == 400, 'n_samples должно быть 400 (количество строк)'\nassert n_features == 6, 'n_features должно быть 6: из 8 столбцов убираются два'"
    }
   },
   {
    "title": "Только числовые признаки",
    "prompt": "<p>Модели нельзя сразу передать текстовый столбец. Возьмите из <code>flats</code> только <b>числовые</b> столбцы, уберите <code>flat_id</code> и <code>price_mln</code>. Результат — DataFrame <code>X_num</code>. Список названий столбцов запишите в <code>num_cols</code>.</p>",
    "hints": [
     "<code>flats.select_dtypes('number')</code> оставляет только числовые столбцы.",
     "Затем <code>.drop(columns=[...])</code>."
    ],
    "check": {
     "tests": "assert isinstance(X_num, pd.DataFrame) and len(X_num) == 400, 'X_num — DataFrame из 400 строк'\nassert 'district' not in X_num.columns, 'Текстовый столбец district: его не нужно брать'\nassert set(num_cols) == {'rooms', 'area_m2', 'floor', 'floors_total', 'year_built'}, 'Числовые признаки: rooms, area_m2, floor, floors_total, year_built'\nassert list(X_num.columns) == list(num_cols), 'num_cols = list(X_num.columns)'"
    }
   },
   {
    "title": "Абоненты из Алматы",
    "prompt": "<p>Возьмите только абонентов из Алматы и уберите строки с пустым <code>age</code> (<code>dropna(subset=['age'])</code>). По ним создайте <code>X_alm</code> (<code>age</code>, <code>tenure_months</code>) и <code>y_alm</code> (<code>churned</code>).</p>",
    "hints": [
     "Фильтр: <code>churn[churn['city'] == 'Алматы']</code>",
     "<code>.dropna(subset=['age'])</code>"
    ],
    "check": {
     "tests": "_a = churn[churn['city'] == 'Алматы'].dropna(subset=['age'])\nassert list(X_alm.columns) == ['age', 'tenure_months'], 'Столбцы X_alm: age, tenure_months'\nassert len(X_alm) == len(_a), f'В X_alm должно быть {len(_a)} строк: Алматы и непустой age'\nassert not X_alm['age'].isna().any(), 'В age не должно остаться пустых значений'\nassert list(y_alm.index) == list(X_alm.index), 'y_alm должен быть получен из тех же строк, что и X_alm'"
    }
   },
   {
    "title": "Правило, написанное вручную",
    "prompt": "<p>Правило без ML: «если позвонили в службу поддержки не меньше 3 раз, абонент уйдёт». Создайте <code>pred_rule</code> (Series из 0/1) и запишите в <code>rule_acc</code> точность правила (доля совпадений с реальным <code>churned</code>).</p>",
    "hints": [
     "<code>(churn['support_calls'] >= 3).astype(int)</code>",
     "Доля совпадений: <code>(a == b).mean()</code>"
    ],
    "check": {
     "tests": "_r = (churn['support_calls'] >= 3).astype(int)\nassert len(pred_rule) == 600 and set(pred_rule.unique()) <= {0, 1}, 'pred_rule — Series из 600 значений 0/1'\nassert int(pred_rule.sum()) == int(_r.sum()), 'Если support_calls &gt;= 3, то 1, иначе 0'\nassert abs(rule_acc - (_r == churn['churned']).mean()) < 1e-9, 'rule_acc = (pred_rule == churn[\"churned\"]).mean()'"
    }
   },
   {
    "title": "Найти правило по данным",
    "prompt": "<p>Выберите порог не вручную, а по данным. Для <code>k</code> = 0, 1, …, 5 запишите точность правила «абонент уйдёт, если <code>support_calls &gt;= k</code>» в словарь <code>accs</code> (ключ — <code>k</code>). Значение <code>k</code> с самой высокой точностью запишите в <code>best_k</code>.</p><p>Это самое простое «обучение»: модель выбирает параметр по примерам.</p>",
    "hints": [
     "Цикл: <code>for k in range(6):</code>",
     "<code>max(accs, key=accs.get)</code>"
    ],
    "check": {
     "tests": "_acc = {_k: ((churn['support_calls'] >= _k).astype(int) == churn['churned']).mean() for _k in range(6)}\nassert sorted(accs) == [0, 1, 2, 3, 4, 5], 'Ключи accs: 0, 1, 2, 3, 4, 5'\nassert all(abs(accs[_k] - _acc[_k]) < 1e-9 for _k in _acc), 'Точность неверна: (pred == churned).mean()'\nassert abs(accs[0] - (1 - churn['churned'].mean())) > 0.3, 'При k = 0 все предсказываются как «уйдёт»'\nassert best_k == max(_acc, key=_acc.get), f'best_k должно быть {max(_acc, key=_acc.get)}'"
    }
   },
   {
    "title": "Цена за квадратный метр",
    "prompt": "<p>Самая простая «модель»: средняя цена одного квадратного метра. <code>rate</code> = сумма всех цен / сумма всех площадей. Функция <code>predict(area)</code> возвращает <code>rate * area</code>. Среднюю абсолютную ошибку по всем квартирам (среднее |цена − прогноз|) запишите в <code>mae_rule</code>.</p>",
    "hints": [
     "<code>flats['price_mln'].sum() / flats['area_m2'].sum()</code>",
     "Функция работает и с Series: <code>predict(flats['area_m2'])</code>"
    ],
    "check": {
     "tests": "_rate = flats['price_mln'].sum() / flats['area_m2'].sum()\nassert rate is not None and abs(rate - _rate) < 1e-9, f'rate должно быть ≈ {_rate:.3f}: сумма цен / сумма площадей'\nassert abs(predict(60) - 60 * _rate) < 1e-9, 'predict(60) должно равняться rate * 60'\n_mae = (flats['price_mln'] - _rate * flats['area_m2']).abs().mean()\nassert abs(mae_rule - _mae) < 1e-6, f'mae_rule должно быть ≈ {_mae:.2f}'"
    }
   }
  ]
 },
 "ml-2": {
  "pr": [
   {
    "title": "Цена по количеству комнат",
    "prompt": "<p>Обучите <code>LinearRegression</code> под именем <code>model</code>: предсказание цены (<code>price_mln</code>) по количеству комнат (<code>rooms</code>). Предсказанную цену трёхкомнатной квартиры запишите числом в <code>pred3</code>.</p>",
    "hints": [
     "<code>X = flats[['rooms']]</code> (двойные скобки)",
     "<code>model.predict(pd.DataFrame({'rooms': [3]}))[0]</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_m = _LinR().fit(_f[['rooms']], _f['price_mln'])\n_p = _m.predict(_pd.DataFrame({'rooms': [3]}))[0]\nassert isinstance(model, LinearRegression) and hasattr(model, 'coef_'), 'model — обученный LinearRegression'\nassert model.n_features_in_ == 1, 'Только один признак: rooms'\nassert abs(float(pred3) - _p) < 1e-6, f'pred3 должно быть ≈ {_p:.2f}: predict(...)[0]'"
    }
   },
   {
    "title": "Наклон и свободный член",
    "prompt": "<p>Обучите <code>LinearRegression</code> предсказывать цену по площади (<code>area_m2</code>). Коэффициент запишите в <code>slope</code>, свободный член — в <code>intercept</code>. <code>slope</code> — на сколько миллионов тенге вырастает цена при добавлении 1 м².</p>",
    "hints": [
     "<code>model.coef_</code> — массив, возьмите его первый элемент.",
     "<code>model.intercept_</code>"
    ]
   },
   {
    "title": "Продажи мороженого",
    "prompt": "<p>Магазин в Алматы: температура воздуха (<code>temp</code>) и количество проданного мороженого (<code>sales</code>). Обучите <code>model</code> и запишите прогноз при 30°C в <code>pred30</code>.</p>",
    "hints": [
     "<code>model.fit(shop[['temp']], shop['sales'])</code>",
     "<code>model.predict(pd.DataFrame({'temp': [30]}))[0]</code>"
    ],
    "check": {
     "tests": "assert hasattr(model, 'coef_'), 'Модель не обучена: вызовите model.fit(...)'\nassert abs(float(pred30) - 700) < 1e-6, 'pred30 должно быть 700: sales = 20 × temp + 100'"
    }
   },
   {
    "title": "Цена трёх квартир",
    "prompt": "<p>Обучите <code>model</code> на признаках <code>area_m2</code> и <code>rooms</code>. Есть три новые квартиры: (45 м², 1 комната), (70 м², 2), (95 м², 3). Запишите их прогнозные цены в массив <code>preds</code> одним вызовом <code>predict</code>.</p>",
    "hints": [
     "Новая таблица: <code>pd.DataFrame({'area_m2': [45, 70, 95], 'rooms': [1, 2, 3]})</code>",
     "Столбцы должны идти в том же порядке, что и при обучении."
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_m = _LinR().fit(_f[['area_m2', 'rooms']], _f['price_mln'])\n_p = _m.predict(_pd.DataFrame({'area_m2': [45, 70, 95], 'rooms': [1, 2, 3]}))\nassert model.n_features_in_ == 2, 'Модель должна быть обучена на двух признаках: area_m2, rooms'\nassert len(preds) == 3, 'В preds должно быть 3 прогноза'\nassert _np.allclose(preds, _p), f'preds должно быть ≈ {_np.round(_p, 2)}. Порядок столбцов: area_m2, rooms'"
    }
   },
   {
    "title": "Какая модель лучше",
    "prompt": "<p>Обучите две модели на всех данных и вычислите R² через <code>score</code>: только <code>area_m2</code> → <code>r2_a</code>; <code>area_m2</code> + <code>year_built</code> → <code>r2_ay</code>. Если R² больше у первой модели, запишите в <code>better</code> текст <code>'area'</code>, иначе <code>'area_year'</code>.</p>",
    "hints": [
     "<code>LinearRegression().fit(X, y).score(X, y)</code>",
     "Условное выражение: <code>'area' if r2_a &gt; r2_ay else 'area_year'</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_y = _f['price_mln']\n_r1 = _LinR().fit(_f[['area_m2']], _y).score(_f[['area_m2']], _y)\n_r2 = _LinR().fit(_f[['area_m2', 'year_built']], _y).score(_f[['area_m2', 'year_built']], _y)\nassert abs(r2_a - _r1) < 1e-6, f'r2_a должно быть ≈ {_r1:.4f}'\nassert abs(r2_ay - _r2) < 1e-6, f'r2_ay должно быть ≈ {_r2:.4f}'\nassert better == ('area' if _r1 > _r2 else 'area_year'), 'better: название модели с большим R²'"
    }
   },
   {
    "title": "Самая большая ошибка",
    "prompt": "<p>Обучите <code>model</code> на признаках <code>area_m2</code>, <code>rooms</code>, <code>year_built</code> по всем данным. Запишите прогнозы в столбец <code>flats['pred']</code>. Запишите в <code>worst_id</code> значение <code>flat_id</code> квартиры, у которой прогноз сильнее всего отличается от реальной цены (наибольшая абсолютная ошибка).</p>",
    "hints": [
     "Ошибка: <code>(flats['price_mln'] - flats['pred']).abs()</code>",
     "<code>err.idxmax()</code> возвращает индекс строки, затем <code>flats.loc[..., 'flat_id']</code>."
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_X = _f[['area_m2', 'rooms', 'year_built']]\n_e = (_f['price_mln'] - _LinR().fit(_X, _f['price_mln']).predict(_X)).abs()\nassert 'pred' in flats.columns, \"Добавьте столбец flats['pred']\"\nassert _np.allclose(flats['pred'], _f['price_mln'] - (_f['price_mln'] - flats['pred'])) and abs((flats['price_mln'] - flats['pred']).abs().max() - _e.max()) < 1e-6, 'pred — прогноз модели, обученной на трёх признаках'\nassert int(worst_id) == int(_f.loc[_e.idxmax(), 'flat_id']), f'worst_id должно быть {int(_f.loc[_e.idxmax(), \"flat_id\"])}'"
    }
   },
   {
    "title": "Лучший один признак",
    "prompt": "<p>Для каждого признака из списка <code>['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']</code> обучите <b>отдельный</b> <code>LinearRegression</code> (по всем данным) и запишите R² в словарь <code>r2s</code> (ключ — название столбца). Признак с самым большим R² запишите в <code>best_feature</code>.</p>",
    "hints": [
     "В цикле: <code>X = flats[[c]]</code>",
     "<code>max(r2s, key=r2s.get)</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_r = {_c: _LinR().fit(_f[[_c]], _f['price_mln']).score(_f[[_c]], _f['price_mln']) for _c in ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']}\nassert set(r2s) == set(_r), 'В r2s должно быть 5 признаков'\nassert all(abs(r2s[_c] - _r[_c]) < 1e-6 for _c in _r), 'R² каждого признака вычислен неверно: fit и score должны использовать один и тот же X'\nassert best_feature == max(_r, key=_r.get), f'best_feature должно быть {max(_r, key=_r.get)}'"
    }
   },
   {
    "title": "Дешёвые квартиры",
    "prompt": "<p>Обучите модель по <code>area_m2</code>, <code>rooms</code>, <code>year_built</code> на всех данных и найдите прогноз для каждой квартиры. Количество квартир, цена которых ниже прогноза <b>больше чем на 10%</b> (<code>price_mln &lt; 0.9 * pred</code>), запишите в <code>n_bargain</code>. Район, в котором таких квартир больше всего, запишите в <code>bargain_district</code>.</p>",
    "hints": [
     "Фильтр: <code>flats[flats['price_mln'] &lt; 0.9 * pred]</code>",
     "<code>value_counts().idxmax()</code> возвращает самое частое значение."
    ]
   }
  ]
 },
 "ml-3": {
  "pr": [
   {
    "title": "Делим на четверть",
    "prompt": "<p>Пусть <code>X = flats[['area_m2']]</code>, <code>y = flats['price_mln']</code>. Разделите их на <code>X_train, X_test, y_train, y_test</code> с параметрами <code>test_size=0.25</code>, <code>random_state=1</code>. Размеры выборок запишите в <code>n_train</code> и <code>n_test</code>.</p>",
    "hints": [
     "<code>train_test_split(X, y, test_size=0.25, random_state=1)</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_a, _b, _c, _d = _tts(_f[['area_m2']], _f['price_mln'], test_size=0.25, random_state=1)\nassert (n_train, n_test) == (300, 100), 'n_train = 300, n_test = 100'\nassert list(X_test.index) == list(_b.index), 'Разбиение другое: вы указали random_state=1?'\nassert list(y_test.index) == list(X_test.index), 'Проверьте порядок: X_train, X_test, y_train, y_test'"
    }
   },
   {
    "title": "Повтор разбиения",
    "prompt": "<p>Разделите один и тот же набор дважды с <code>random_state=7</code> (<code>test_size=0.2</code>) и проверьте, совпадают ли индексы тестовой части: результат (bool) запишите в <code>same</code>. Затем разделите с <code>random_state=8</code> и проверьте, отличаются ли индексы тестовой части от первого случая: результат запишите в <code>differ</code>. Тестовую часть первого разбиения сохраните под именем <code>X_test7</code>.</p>",
    "hints": [
     "Ненужные части можно присвоить переменной <code>_</code>.",
     "Сравнение индексов: <code>list(a.index) == list(b.index)</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_a, _b, _c, _d = _tts(_f[['area_m2', 'rooms']], _f['price_mln'], test_size=0.2, random_state=7)\nassert list(X_test7.index) == list(_b.index), 'X_test7 — тестовая часть разбиения с random_state=7, test_size=0.2'\nassert same is True, 'Одинаковый random_state даёт одинаковое разбиение: same = True'\nassert differ is True, 'Другой random_state даёт другое разбиение: differ = True'"
    }
   },
   {
    "title": "Stratify и доля",
    "prompt": "<p>Разделите данные о churn с параметрами <code>test_size=0.2</code>, <code>random_state=0</code>, <code>stratify=y</code>. Долю ухода в train запишите в <code>train_rate</code>, долю в test — в <code>test_rate</code>. Они должны быть очень близки друг к другу.</p>",
    "hints": [
     "<code>train_test_split(X, y, test_size=0.2, random_state=0, stratify=y)</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import train_test_split as _tts\n_a, _b, _c, _d = _tts(X, y, test_size=0.2, random_state=0, stratify=y)\nassert len(y_test) == 120, 'В test должно быть 120 абонентов (test_size=0.2)'\nassert abs(train_rate - _c.mean()) < 1e-9 and abs(test_rate - _d.mean()) < 1e-9, 'Доли: y_train.mean() и y_test.mean(). Вы указали stratify=y?'\nassert abs(train_rate - test_rate) < 0.01, 'При stratify доли должны быть близки друг к другу'"
    }
   },
   {
    "title": "Разница train и test",
    "prompt": "<p>Признаки: <code>area_m2</code>, <code>rooms</code>, <code>year_built</code>, <code>floor</code>. Разделите с <code>test_size=0.3</code>, <code>random_state=0</code>, обучите <code>model</code> на train. Вычислите <code>gap = train_r2 - test_r2</code>.</p>",
    "hints": [
     "Модель: <code>LinearRegression().fit(X_train, y_train)</code>",
     "Два значения R²: <code>model.score(X_train, y_train)</code>, <code>model.score(X_test, y_test)</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_a, _b, _c, _d = _tts(_f[['area_m2', 'rooms', 'year_built', 'floor']], _f['price_mln'], test_size=0.3, random_state=0)\n_m = _LinR().fit(_a, _c)\nassert abs(train_r2 - _m.score(_a, _c)) < 1e-6, 'train_r2 = model.score(X_train, y_train)'\nassert abs(test_r2 - _m.score(_b, _d)) < 1e-6, 'test_r2 вычислен неверно: модель должна обучаться только на train'\nassert abs(gap - (_m.score(_a, _c) - _m.score(_b, _d))) < 1e-6, 'gap = train_r2 - test_r2'"
    }
   },
   {
    "title": "Случайность разбиения",
    "prompt": "<p>Тестовый R² модели меняется в зависимости от разбиения. Для <code>random_state</code> = 0, 1, …, 9 (<code>test_size=0.2</code>, признаки <code>area_m2</code>, <code>rooms</code>, <code>year_built</code>) запишите тестовый R² в список <code>scores</code>. <code>spread = max(scores) - min(scores)</code>.</p>",
    "hints": [
     "<code>for rs in range(10):</code>",
     "На каждом шаге обучайте новую модель."
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_s = []\nfor _rs in range(10):\n    _a, _b, _c, _d = _tts(_f[['area_m2', 'rooms', 'year_built']], _f['price_mln'], test_size=0.2, random_state=_rs)\n    _s.append(_LinR().fit(_a, _c).score(_b, _d))\nassert len(scores) == 10, 'В scores должно быть 10 значений'\nassert _np.allclose(scores, _s), 'Тестовый R² для каждого random_state вычислен неверно (проверьте порядок: 0, 1, ..., 9)'\nassert abs(spread - (max(_s) - min(_s))) < 1e-9, 'spread = max(scores) - min(scores)'"
    }
   },
   {
    "title": "Ручное разбиение",
    "prompt": "<p>Разделите без <code>train_test_split</code>: перемешайте строки через <code>flats.sample(frac=1, random_state=0)</code>, первые 320 строк запишите в <code>train_df</code>, остальные 80 строк — в <code>test_df</code>.</p>",
    "hints": [
     "<code>shuffled = flats.sample(frac=1, random_state=0)</code>",
     "<code>shuffled.iloc[:320]</code> и <code>shuffled.iloc[320:]</code>"
    ],
    "check": {
     "tests": "_s = pd.read_csv('flats.csv').sample(frac=1, random_state=0)\nassert len(train_df) == 320 and len(test_df) == 80, 'train_df — 320 строк, test_df — 80 строк'\nassert not set(train_df['flat_id']) & set(test_df['flat_id']), 'В train_df и test_df не должно быть общих квартир'\nassert list(test_df['flat_id']) == list(_s['flat_id'].iloc[320:]), 'Перемешивание: flats.sample(frac=1, random_state=0), затем iloc'"
    }
   },
   {
    "title": "Старые и новые дома",
    "prompt": "<p>Насколько модель переносится на новые условия? Обучите <code>model_old</code> на квартирах с <code>year_built &lt; 2000</code> по признакам <code>area_m2</code>, <code>rooms</code>. R² на квартирах с <code>year_built &gt;= 2000</code> запишите в <code>shift_r2</code>. Для сравнения запишите в <code>rand_r2</code> тестовый R² случайного разбиения (<code>test_size=0.2</code>, <code>random_state=42</code>, те же признаки).</p>",
    "hints": [
     "Два фильтра: <code>flats[flats['year_built'] &lt; 2000]</code> и <code>&gt;= 2000</code>.",
     "<code>model_old.score(new[cols], new['price_mln'])</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_o = _f[_f['year_built'] < 2000]\n_n = _f[_f['year_built'] >= 2000]\n_c2 = ['area_m2', 'rooms']\n_sr = _LinR().fit(_o[_c2], _o['price_mln']).score(_n[_c2], _n['price_mln'])\n_a, _b, _c, _d = _tts(_f[_c2], _f['price_mln'], test_size=0.2, random_state=42)\n_rr = _LinR().fit(_a, _c).score(_b, _d)\nassert model_old.n_features_in_ == 2, 'Признаки model_old: area_m2, rooms'\nassert abs(shift_r2 - _sr) < 1e-6, f'shift_r2 должно быть ≈ {_sr:.3f}: обучите на старых домах, оцените на новых'\nassert abs(rand_r2 - _rr) < 1e-6, f'rand_r2 должно быть ≈ {_rr:.3f}'\nassert shift_r2 < rand_r2, 'На новых домах качество должно падать'"
    }
   },
   {
    "title": "Валидационная выборка",
    "prompt": "<p>Выберите набор признаков, не глядя на тест. Сначала разделите <code>test_size=0.2</code>, <code>random_state=0</code> на <code>X_rest</code> и <code>X_test</code>, затем разделите <code>X_rest</code> с <code>test_size=0.25</code>, <code>random_state=0</code> на <code>X_train</code> и <code>X_val</code>. Для каждого набора из <code>sets</code> запишите в <code>val_scores</code> validation R² модели, обученной на train. Лучший набор запишите в <code>best_set</code>, а его тестовый R² (модель обучена только на <code>X_train</code>) — в <code>test_r2</code>.</p>",
    "hints": [
     "Два разбиения: сначала тест, затем валидация из остатка.",
     "Цикл: <code>for name, cols in sets.items():</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_X = _f[sets['five']]\n_Xr, _Xt, _yr, _yt = _tts(_X, _f['price_mln'], test_size=0.2, random_state=0)\n_Xa, _Xv, _ya, _yv = _tts(_Xr, _yr, test_size=0.25, random_state=0)\n_v = {_k: _LinR().fit(_Xa[_cc], _ya).score(_Xv[_cc], _yv) for _k, _cc in sets.items()}\n_b = max(_v, key=_v.get)\nassert len(X_val) == 80 and len(X_train) == 240, 'X_train — 240 строк, X_val — 80 строк'\nassert set(val_scores) == set(sets) and all(abs(val_scores[_k] - _v[_k]) < 1e-6 for _k in _v), 'val_scores: обучите на train и оцените на X_val'\nassert best_set == _b, f'best_set должно быть {_b}'\nassert abs(test_r2 - _LinR().fit(_Xa[sets[_b]], _ya).score(_Xt[sets[_b]], _yt)) < 1e-6, 'test_r2: обучите на набор на X_train с выбранным набором и оцените на X_test один раз'"
    }
   }
  ]
 },
 "ml-4": {
  "pr": [
   {
    "title": "Функция MAE",
    "prompt": "<p>Напишите функцию <code>mae(y_true, y_pred)</code> на NumPy: среднее абсолютных ошибок.</p><p>Например, <code>mae([10, 20], [12, 17])</code> → <code>2.5</code>.</p>",
    "hints": [
     "<code>np.asarray(...)</code> превращает список в массив.",
     "<code>np.mean(np.abs(err))</code>"
    ],
    "check": {
     "tests": "assert mae([10, 20], [12, 17]) is not None and abs(mae([10, 20], [12, 17]) - 2.5) < 1e-9, 'mae([10, 20], [12, 17]) должна вернуть 2.5'\nassert abs(mae([5, 5, 5], [5, 5, 5])) < 1e-9, 'Если ошибок нет, результат 0'\nassert abs(mae([0, 0, 0, 0], [1, -1, 3, -3]) - 2.0) < 1e-9, 'Отрицательные ошибки тоже берутся по модулю: 2.0'"
    }
   },
   {
    "title": "Функция RMSE",
    "prompt": "<p>Напишите функцию <code>rmse(y_true, y_pred)</code>: корень из среднего квадратов ошибок.</p><p>Например, <code>rmse([0, 0], [3, 4])</code> → <code>√12.5 ≈ 3.536</code>.</p>",
    "hints": [
     "<code>err ** 2</code> — квадраты.",
     "<code>np.sqrt(np.mean(...))</code>"
    ],
    "check": {
     "tests": "assert rmse([0, 0], [3, 4]) is not None and abs(rmse([0, 0], [3, 4]) - 12.5 ** 0.5) < 1e-9, 'rmse([0, 0], [3, 4]) должна быть ≈ 3.536'\nassert abs(rmse([1, 2, 3], [1, 2, 3])) < 1e-9, 'Если ошибок нет, результат 0'\nassert abs(rmse([10, 10], [12, 8]) - 2.0) < 1e-9, 'rmse([10, 10], [12, 8]) = 2.0'"
    }
   },
   {
    "title": "Функция R²",
    "prompt": "<p>Напишите функцию <code>r2(y_true, y_pred)</code>: <code>1 − SS_res / SS_tot</code>, где <code>SS_res</code> — сумма квадратов ошибок, <code>SS_tot</code> — сумма квадратов отклонений <code>y_true</code> от его среднего.</p><p>Например, <code>r2([1, 2, 3], [1, 2, 3])</code> → <code>1.0</code>.</p>",
    "hints": [
     "<code>ss_res = np.sum((y_true - y_pred) ** 2)</code>",
     "<code>ss_tot = np.sum((y_true - y_true.mean()) ** 2)</code>"
    ],
    "check": {
     "tests": "assert r2([1, 2, 3], [1, 2, 3]) is not None and abs(r2([1, 2, 3], [1, 2, 3]) - 1) < 1e-9, 'Идеальный прогноз: R² = 1'\nassert abs(r2([1, 2, 3], [2, 2, 2])) < 1e-9, 'Прогноз средним значением: R² = 0'\nassert abs(r2([3, 5, 7, 9], [4, 5, 6, 10]) - 0.85) < 1e-9, 'r2([3, 5, 7, 9], [4, 5, 6, 10]) = 0.85'"
    }
   },
   {
    "title": "Таблица коэффициентов",
    "prompt": "<p>Разделение готово. Обучите <code>model</code> на train и запишите коэффициенты с названиями столбцов в Series <code>coefs</code> (<code>pd.Series(model.coef_, index=X.columns)</code>). Как меняется цена при добавлении одной комнаты (площадь фиксирована) — запишите в <code>rooms_effect</code>.</p>",
    "hints": [
     "<code>pd.Series(model.coef_, index=X.columns)</code>",
     "<code>coefs['rooms']</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_a, _b, _c, _d = _tts(_f[['area_m2', 'rooms', 'year_built']], _f['price_mln'], test_size=0.2, random_state=42)\n_m = _LinR().fit(_a, _c)\nassert isinstance(coefs, pd.Series) and list(coefs.index) == ['area_m2', 'rooms', 'year_built'], 'Индекс coefs — названия столбцов X'\nassert _np.allclose(coefs.values, _m.coef_), 'Значения coefs — coef_ модели, обученной на train'\nassert abs(rooms_effect - _m.coef_[1]) < 1e-9, \"rooms_effect = coefs['rooms']\""
    }
   },
   {
    "title": "Прогноз средним значением",
    "prompt": "<p>Baseline: для каждой квартиры из test предскажите среднее значение цен из train. Его MAE запишите в <code>base_mae</code>. Затем обучите <code>LinearRegression</code> на train и запишите его MAE в <code>model_mae</code>. <code>gain = base_mae - model_mae</code>.</p>",
    "hints": [
     "<code>np.full(len(y_test), y_train.mean())</code>",
     "<code>mean_absolute_error(y_test, pred)</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_a, _b, _c, _d = _tts(_f[['area_m2', 'rooms', 'year_built']], _f['price_mln'], test_size=0.2, random_state=42)\n_bm = _np.mean(_np.abs(_d - _c.mean()))\n_mm = _np.mean(_np.abs(_d - _LinR().fit(_a, _c).predict(_b)))\nassert abs(base_mae - _bm) < 1e-6, f'base_mae должно быть ≈ {_bm:.2f}: прогноз через y_train.mean() (не y_test!)'\nassert abs(model_mae - _mm) < 1e-6, f'model_mae должно быть ≈ {_mm:.2f}'\nassert abs(gain - (_bm - _mm)) < 1e-6 and gain > 0, 'gain = base_mae - model_mae (положительное число)'"
    }
   },
   {
    "title": "Эффект десяти лет",
    "prompt": "<p>Обучите <code>model</code> по <code>area_m2</code> и <code>year_built</code> на всех данных. На сколько изменится цена, если дом на 10 лет новее (площадь фиксирована): <code>delta_10y = 10 * coef_year</code>. Для проверки запишите в <code>diff_pred</code> разницу прогнозов для квартиры 60 м² в 2020 и 2010 годах.</p>",
    "hints": [
     "<code>model.coef_[1]</code> — коэффициент year_built.",
     "Таблица из двух строк: <code>pd.DataFrame({'area_m2': [60, 60], 'year_built': [2020, 2010]})</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_m = _LinR().fit(_f[['area_m2', 'year_built']], _f['price_mln'])\nassert abs(delta_10y - 10 * _m.coef_[1]) < 1e-6, f'delta_10y должно быть ≈ {10 * _m.coef_[1]:.3f}: 10 * coef_[1]'\nassert abs(diff_pred - 10 * _m.coef_[1]) < 1e-6, 'diff_pred = прогноз(2020) − прогноз(2010), что равно delta_10y'"
    }
   },
   {
    "title": "Расчёт метрик",
    "prompt": "<p>Напишите функцию <code>report(y_true, y_pred)</code> без sklearn. Она должна возвращать словарь <code>{'mae': ..., 'rmse': ..., 'r2': ...}</code>.</p><p>Например, <code>report([3, 5, 7, 9], [4, 5, 6, 10])['r2']</code> → <code>0.85</code>.</p>",
    "hints": [
     "Сначала <code>np.asarray(..., dtype=float)</code>.",
     "Три формулы: MAE, RMSE, 1 − SS_res/SS_tot."
    ],
    "check": {
     "tests": "from sklearn.metrics import mean_absolute_error as _ma, mean_squared_error as _ms, r2_score as _r2\n_r = report([3, 5, 7, 9], [4, 5, 6, 10])\nassert isinstance(_r, dict) and set(_r) == {'mae', 'rmse', 'r2'}, \"Верните словарь с ключами mae, rmse, r2\"\nassert abs(_r['mae'] - 0.75) < 1e-9 and abs(_r['rmse'] - 0.75 ** 0.5) < 1e-9, 'report([3, 5, 7, 9], [4, 5, 6, 10]): mae = 0.75, rmse ≈ 0.866'\nassert abs(_r['r2'] - 0.85) < 1e-9, 'r2 должно быть 0.85'\n_t, _p = [30, 42, 55, 61, 80], [33, 40, 50, 66, 78]\n_q = report(_t, _p)\nassert abs(_q['mae'] - _ma(_t, _p)) < 1e-9 and abs(_q['rmse'] - _ms(_t, _p) ** 0.5) < 1e-9 and abs(_q['r2'] - _r2(_t, _p)) < 1e-9, 'Результат не совпадает с метриками sklearn'"
    }
   },
   {
    "title": "Ошибка по комнатам",
    "prompt": "<p>Разделение готово. Обучите модель на train и найдите абсолютную ошибку для каждой квартиры из test. Среднюю абсолютную ошибку по количеству комнат (<code>rooms</code>) запишите в Series <code>mae_by_rooms</code> (индекс — количество комнат). Количество комнат с самой большой ошибкой запишите в <code>worst_rooms</code>.</p>",
    "hints": [
     "Добавьте ошибку в столбец: <code>res = X_test.copy()</code>, <code>res['err'] = ...</code>",
     "<code>res.groupby('rooms')['err'].mean()</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_a, _b, _c, _d = _tts(_f[['area_m2', 'rooms', 'year_built']], _f['price_mln'], test_size=0.2, random_state=42)\n_e = _b.copy()\n_e['err'] = (_d - _LinR().fit(_a, _c).predict(_b)).abs()\n_g = _e.groupby('rooms')['err'].mean()\nassert isinstance(mae_by_rooms, pd.Series) and list(mae_by_rooms.index) == list(_g.index), 'Индекс mae_by_rooms — количество комнат в test'\nassert _np.allclose(mae_by_rooms.values, _g.values), 'Средняя абсолютная ошибка вычислена неверно: только по test-данным'\nassert worst_rooms == _g.idxmax(), f'worst_rooms должно быть {_g.idxmax()}'"
    }
   }
  ]
 },
 "ml-5": {
  "pr": [
   {
    "title": "Количество районов",
    "prompt": "<p>Создайте таблицу <code>d</code> через <code>pd.get_dummies(flats['district'], dtype=int)</code>. Количество районов запишите в <code>n_districts</code>. Проверьте, что в каждой строке сумма равна 1, и результат (bool) запишите в <code>one_per_row</code>.</p>",
    "hints": [
     "<code>d.shape[1]</code> — количество столбцов.",
     "<code>(d.sum(axis=1) == 1).all()</code>"
    ],
    "check": {
     "tests": "assert d.shape == (400, flats['district'].nunique()), 'd — один столбец на каждый район'\nassert n_districts == flats['district'].nunique(), f'n_districts должно быть {flats[\"district\"].nunique()}'\nassert one_per_row is True, 'Каждая квартира находится ровно в одном районе: one_per_row = True'"
    }
   },
   {
    "title": "Кодирование тарифа",
    "prompt": "<p>Закодируйте <code>churn[['monthly_fee', 'plan']]</code> через <code>pd.get_dummies</code>: <code>columns=['plan']</code>, <code>drop_first=True</code>, <code>dtype=int</code>. Результат — <code>Xp</code>, список столбцов — <code>cols</code>.</p>",
    "hints": [
     "<code>pd.get_dummies(..., columns=['plan'], drop_first=True, dtype=int)</code>"
    ],
    "check": {
     "tests": "assert 'plan' not in Xp.columns, 'Текстового столбца plan быть не должно'\nassert cols == ['monthly_fee', 'plan_premium', 'plan_standard'], 'Столбцы: monthly_fee, plan_premium, plan_standard (basic удаляется)'\nassert Xp.shape == (600, 3), 'Размер Xp (600, 3)'"
    }
   },
   {
    "title": "Таблица школ",
    "prompt": "<p>Закодируйте столбец <code>city</code> таблицы школ через <code>pd.get_dummies(schools, columns=['city'], dtype=int)</code> и запишите результат в <code>enc</code>. Количество школ в Алматы возьмите из столбца <code>city_Алматы</code> и запишите в <code>n_almaty</code>.</p>",
    "hints": [
     "<code>enc['city_Алматы'].sum()</code>"
    ],
    "check": {
     "tests": "assert list(enc.columns) == ['students', 'city_Алматы', 'city_Астана', 'city_Шымкент'], 'Столбцы enc: students и три столбца city_'\nassert n_almaty == 3, 'В Алматы 3 школы: n_almaty = 3'"
    }
   },
   {
    "title": "Самый дорогой район",
    "prompt": "<p><code>X</code> готов (one-hot, <code>drop_first=True</code>, базовый район — Алатау). Обучите <code>model</code> на всех данных и запишите в Series <code>dcoef</code> только коэффициенты столбцов <code>district_</code> (индекс — название столбца). Столбец с самым большим коэффициентом запишите в <code>top_district</code>.</p>",
    "hints": [
     "<code>coefs = pd.Series(model.coef_, index=X.columns)</code>",
     "Отфильтруйте через <code>c.startswith('district_')</code>."
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_X = _pd.get_dummies(_f[['area_m2', 'year_built', 'district']], columns=['district'], drop_first=True, dtype=int)\n_s = _pd.Series(_LinR().fit(_X, _f['price_mln']).coef_, index=_X.columns)\n_s = _s[[_c for _c in _X.columns if _c.startswith('district_')]]\nassert isinstance(dcoef, pd.Series) and len(dcoef) == len(_s), f'В dcoef должно быть {len(_s)} столбцов district_'\nassert _np.allclose(dcoef.loc[_s.index].values, _s.values), 'Коэффициенты неверны: обучите на всех X, y'\nassert top_district == _s.idxmax(), f'top_district должно быть {_s.idxmax()}'"
    }
   },
   {
    "title": "Два категориальных столбца",
    "prompt": "<p>Создайте <code>X</code> из столбцов <code>tenure_months</code>, <code>monthly_fee</code>, <code>city</code>, <code>plan</code> таблицы <code>churn</code>: <code>city</code> и <code>plan</code> кодируются вместе (<code>drop_first=True</code>, <code>dtype=int</code>). Запишите <code>X.shape</code> в <code>shape</code>.</p>",
    "hints": [
     "<code>columns=['city', 'plan']</code> — два столбца вместе."
    ],
    "check": {
     "tests": "assert 'city' not in X.columns and 'plan' not in X.columns, 'Текстовых столбцов city и plan быть не должно'\nassert X.shape == (600, 8), f'Размер X должен быть (600, 8): 2 числовых + 4 города + 2 тарифа. У вас {X.shape}'\nassert shape == X.shape, 'shape = X.shape'\nassert 'city_Алматы' not in X.columns, 'drop_first=True: первый город по алфавиту (Алматы) должен быть удалён'"
    }
   },
   {
    "title": "Цена новой квартиры",
    "prompt": "<p>Модель <code>model</code> обучена на one-hot <code>X</code>. Спрогнозируйте цену квартиры 70 м² 2015 года в районе Медеу. Новую строку тоже закодируйте через <code>get_dummies</code> и выровняйте столбцы через <code>.reindex(columns=X.columns, fill_value=0)</code>. Результат — <code>pred_new</code> (число).</p>",
    "hints": [
     "Одна строка даст только один столбец в get_dummies, поэтому нужен <code>reindex(columns=X.columns, fill_value=0)</code>."
    ],
    "check": {
     "tests": "_row = {c: 0 for c in X.columns}\n_row.update({'area_m2': 70, 'year_built': 2015, 'district_Медеу': 1})\n_p = model.predict(pd.DataFrame([_row])[list(X.columns)])[0]\nassert abs(float(pred_new) - _p) < 1e-6, f'pred_new должно быть ≈ {_p:.2f}. district_Медеу = 1, остальные столбцы district_ равны 0?'"
    }
   },
   {
    "title": "Польза признака района",
    "prompt": "<p>Сравните две модели (разбиение: <code>test_size=0.2</code>, <code>random_state=42</code>): (1) признаки <code>area_m2</code>, <code>rooms</code>, <code>year_built</code> → тестовый R² <code>r2_without</code>; (2) те же признаки + one-hot <code>district</code> (<code>drop_first=True</code>, <code>dtype=int</code>) → <code>r2_with</code>. <code>gain = r2_with - r2_without</code>.</p>",
    "hints": [
     "Для обоих X используйте одно и то же разбиение: <code>random_state=42</code>.",
     "Можно написать цикл или два отдельных блока."
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_y = _f['price_mln']\n_X2 = _pd.get_dummies(_f[['area_m2', 'rooms', 'year_built', 'district']], columns=['district'], drop_first=True, dtype=int)\n_r = []\nfor _X in [_f[['area_m2', 'rooms', 'year_built']], _X2]:\n    _a, _b, _c, _d = _tts(_X, _y, test_size=0.2, random_state=42)\n    _r.append(_LinR().fit(_a, _c).score(_b, _d))\nassert abs(r2_without - _r[0]) < 1e-6, f'r2_without должно быть ≈ {_r[0]:.3f}'\nassert abs(r2_with - _r[1]) < 1e-6, f'r2_with должно быть ≈ {_r[1]:.3f}: one-hot district, drop_first=True'\nassert abs(gain - (_r[1] - _r[0])) < 1e-9 and gain > 0, 'gain = r2_with - r2_without (положительное)'"
    }
   },
   {
    "title": "Ошибка кодирования номерами",
    "prompt": "<p>Кодирование района одним числом (<code>flats['district'].astype('category').cat.codes</code>) даёт модели ложную информацию о «порядке». Создайте <code>X_codes</code> (<code>area_m2</code>, <code>year_built</code>, <code>district_code</code>) и <code>X_onehot</code> (<code>area_m2</code>, <code>year_built</code> + one-hot, <code>drop_first=True</code>). Разбиение: <code>test_size=0.2</code>, <code>random_state=42</code>. Тестовый R²: <code>r2_codes</code>, <code>r2_onehot</code>.</p>",
    "hints": [
     "<code>X_codes = flats[['area_m2', 'year_built']].copy()</code>, затем добавьте новый столбец.",
     "Для повторяющегося кода напишите функцию: <code>def test_r2(X): ...</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_y = _f['price_mln']\n_Xc = _f[['area_m2', 'year_built']].copy()\n_Xc['district_code'] = _f['district'].astype('category').cat.codes\n_Xo = _pd.get_dummies(_f[['area_m2', 'year_built', 'district']], columns=['district'], drop_first=True, dtype=int)\ndef _t(_X):\n    _a, _b, _c, _d = _tts(_X, _y, test_size=0.2, random_state=42)\n    return _LinR().fit(_a, _c).score(_b, _d)\nassert list(X_codes.columns) == ['area_m2', 'year_built', 'district_code'], 'Столбцы X_codes: area_m2, year_built, district_code'\nassert abs(r2_codes - _t(_Xc)) < 1e-6, f'r2_codes должно быть ≈ {_t(_Xc):.3f}'\nassert abs(r2_onehot - _t(_Xo)) < 1e-6, f'r2_onehot должно быть ≈ {_t(_Xo):.3f}'\nassert r2_onehot > r2_codes + 0.05, 'Вариант one-hot должен быть заметно лучше кодирования номерами'"
    }
   }
  ]
 },
 "ml-6": {
  "pr": [
   {
    "title": "Функция стандартизации",
    "prompt": "<p>Напишите функцию <code>standardize(xs)</code> на NumPy: <code>(x − орташа) / SD</code> (<code>np.std</code>, популяционное SD). Функция должна возвращать массив NumPy.</p><p>Например, <code>standardize([2, 4, 6])</code> → <code>[-1.2247, 0, 1.2247]</code>.</p>",
    "hints": [
     "<code>xs = np.asarray(xs, dtype=float)</code>",
     "<code>(xs - xs.mean()) / xs.std()</code>"
    ],
    "check": {
     "tests": "import numpy as _np\n_z = standardize([2, 4, 6])\nassert _z is not None and len(_z) == 3, 'standardize([2, 4, 6]) должна вернуть массив из 3 значений'\nassert _np.allclose(_z, [-1.5 ** 0.5, 0, 1.5 ** 0.5]), 'standardize([2, 4, 6]) ≈ [-1.2247, 0, 1.2247]'\n_w = standardize([10, 20, 30, 40, 100])\nassert abs(_np.mean(_w)) < 1e-9 and abs(_np.std(_w) - 1) < 1e-9, 'Среднее результата должно быть 0, SD должно быть 1'"
    }
   },
   {
    "title": "Расстояние между точками",
    "prompt": "<p>Функция <code>dist(a, b)</code> должна возвращать евклидово расстояние между двумя точками (списки любой размерности): <code>√Σ(aᵢ − bᵢ)²</code>.</p><p>Например, <code>dist([0, 0], [3, 4])</code> → <code>5.0</code>.</p>",
    "hints": [
     "<code>np.sum((a - b) ** 2)</code>",
     "<code>np.sqrt(...)</code>"
    ],
    "check": {
     "tests": "assert dist([0, 0], [3, 4]) is not None and abs(dist([0, 0], [3, 4]) - 5) < 1e-9, 'dist([0, 0], [3, 4]) должна вернуть 5.0'\nassert abs(dist([1, 2, 3], [1, 2, 3])) < 1e-9, 'Одинаковые точки: 0'\nassert abs(dist([1, 1, 1, 1], [2, 2, 2, 2]) - 2) < 1e-9, 'В четырёх измерениях: dist([1, 1, 1, 1], [2, 2, 2, 2]) = 2'"
    }
   },
   {
    "title": "Ближайшая остановка",
    "prompt": "<p>Координаты остановок (в км) находятся в списке <code>stops</code>. Функция <code>nearest(points, q)</code> должна вернуть <b>индекс</b> точки, ближайшей к точке <code>q</code>.</p><p>Например, <code>nearest(stops, [1, 1])</code> → <code>0</code>.</p>",
    "hints": [
     "Все расстояния сразу: <code>((P - q) ** 2).sum(axis=1)</code>",
     "<code>np.argmin(d)</code> возвращает индекс наименьшего значения."
    ],
    "check": {
     "tests": "assert nearest(stops, [1, 1]) == 0, 'nearest(stops, [1, 1]) должна вернуть 0'\nassert nearest(stops, [6, 6]) == 3, 'nearest(stops, [6, 6]) должна вернуть 3'\nassert nearest(stops, [4, 2]) == 1, 'nearest(stops, [4, 2]) должна вернуть 1'\nassert nearest([[1, 1, 1], [9, 9, 9]], [8, 8, 7]) == 1, 'Функция должна работать и с точками в трёх измерениях'"
    }
   },
   {
    "title": "Выбор числа соседей",
    "prompt": "<p>Разделение готово. Обучите <code>StandardScaler</code> на train и масштабируйте обе части. Для <code>k</code> ∈ [1, 3, 5, 10, 20] запишите тестовый R² <code>KNeighborsRegressor(n_neighbors=k)</code> в словарь <code>r2_by_k</code>. Лучшее значение запишите в <code>best_k</code>.</p>",
    "hints": [
     "Scaler обучается один раз: <code>scaler = StandardScaler().fit(X_train)</code>",
     "В цикле меняйте только KNN."
    ],
    "check": {
     "tests": "from sklearn.neighbors import KNeighborsRegressor as _KR\nfrom sklearn.preprocessing import StandardScaler as _SS\n_s = _SS().fit(X_train)\n_r = {_k: _KR(n_neighbors=_k).fit(_s.transform(X_train), y_train).score(_s.transform(X_test), y_test) for _k in [1, 3, 5, 10, 20]}\nassert sorted(r2_by_k) == [1, 3, 5, 10, 20], 'Ключи r2_by_k: 1, 3, 5, 10, 20'\nassert all(abs(r2_by_k[_k] - _r[_k]) < 1e-6 for _k in _r), 'Значения R² неверны: обучите scaler на X_train и примените transform к обеим частям'\nassert best_k == max(_r, key=_r.get), f'best_k должно быть {max(_r, key=_r.get)}'"
    }
   },
   {
    "title": "Классификация дорогой квартиры",
    "prompt": "<p>Теперь KNN-классификатор: является ли квартира «дорогой» (<code>price_mln &gt;= 50</code> → 1)? Разделение готово. <code>KNeighborsClassifier(n_neighbors=7)</code>: (1) точность на тесте по сырым данным → <code>acc_raw</code>; (2) с <code>StandardScaler</code>, обученным на train → <code>acc_scaled</code>.</p>",
    "hints": [
     "<code>sc = StandardScaler().fit(X_train)</code>",
     "<code>sc.transform(X_train)</code> и <code>sc.transform(X_test)</code>"
    ],
    "check": {
     "tests": "from sklearn.neighbors import KNeighborsClassifier as _KC\nfrom sklearn.preprocessing import StandardScaler as _SS\n_ar = _KC(n_neighbors=7).fit(X_train, y_train).score(X_test, y_test)\n_s = _SS().fit(X_train)\n_as = _KC(n_neighbors=7).fit(_s.transform(X_train), y_train).score(_s.transform(X_test), y_test)\nassert abs(acc_raw - _ar) < 1e-9, f'acc_raw должно быть ≈ {_ar:.3f} (без масштабирования, k=7)'\nassert abs(acc_scaled - _as) < 1e-9, f'acc_scaled должно быть ≈ {_as:.3f}: scaler обучен на X_train, обе части преобразованы через transform'\nassert acc_scaled > acc_raw, 'Масштабирование должно помогать KNN: year_built и area_m2 иначе перекрывают столбцы районов 0/1'"
    }
   },
   {
    "title": "Ручной KNN",
    "prompt": "<p>Напишите функцию <code>knn_predict(X_train, y_train, x, k)</code> на NumPy: она должна возвращать среднее значений <code>y</code> для <code>k</code> ближайших к <code>x</code> точек (евклидово расстояние).</p><p>Например, для данных ниже <code>knn_predict(Xa, ya, [1.1], 2)</code> → <code>15.0</code>.</p>",
    "hints": [
     "<code>np.argsort(d)[:k]</code> — индексы k ближайших точек.",
     "<code>y[idx].mean()</code>"
    ],
    "check": {
     "tests": "assert knn_predict(Xa, ya, [1.1], 2) is not None and abs(knn_predict(Xa, ya, [1.1], 2) - 15) < 1e-9, 'knn_predict(Xa, ya, [1.1], 2) должна вернуть 15.0'\nassert abs(knn_predict(Xa, ya, [10.4], 2) - 105) < 1e-9, 'knn_predict(Xa, ya, [10.4], 2) = 105.0'\nassert abs(knn_predict(Xa, ya, [2], 3) - 20) < 1e-9, 'k=3, x=[2]: соседи 1, 2, 3 дают 20.0'\nassert abs(knn_predict([[0, 0], [0, 1], [5, 5]], [1, 3, 9], [0, 0.2], 1) - 1) < 1e-9, 'Функция должна работать и с двумя измерениями'"
    }
   },
   {
    "title": "Min-max масштабирование",
    "prompt": "<p>Функция <code>minmax(X)</code> должна привести каждый столбец 2D-массива к диапазону <code>[0, 1]</code>: <code>(x − min) / (max − min)</code> по столбцам. Примените её к <code>flats[['area_m2', 'year_built']]</code> и запишите результат в <code>M</code>.</p><p>Например, <code>minmax([[1, 10], [3, 30], [2, 20]])</code> → <code>[[0, 0], [1, 1], [0.5, 0.5]]</code>.</p>",
    "hints": [
     "<code>X.min(axis=0)</code> — минимум каждого столбца.",
     "<code>(X - lo) / (hi - lo)</code>"
    ],
    "check": {
     "tests": "import numpy as _np\n_r = minmax([[1, 10], [3, 30], [2, 20]])\nassert _r is not None and _np.allclose(_r, [[0, 0], [1, 1], [0.5, 0.5]]), 'minmax([[1, 10], [3, 30], [2, 20]]) → [[0, 0], [1, 1], [0.5, 0.5]]'\nassert _np.allclose(minmax([[5, -1], [15, 1]]), [[0, 0], [1, 1]]), 'Каждый столбец масштабируется по своим min/max (axis=0)'\n_M = _np.asarray(M)\nassert _M.shape == (400, 2), 'Размер M (400, 2)'\nassert _np.allclose(_M.min(axis=0), 0) and _np.allclose(_M.max(axis=0), 1), 'Каждый столбец M от 0 до 1'"
    }
   },
   {
    "title": "Похожие квартиры",
    "prompt": "<p>Масштабируйте столбцы <code>area_m2</code>, <code>rooms</code>, <code>year_built</code> через <code>StandardScaler</code> на всех данных (<code>Z</code>). Для квартиры с <code>flat_id == 1</code> запишите <code>flat_id</code> 5 ближайших <b>других</b> квартир (от ближайшей к дальней) в список <code>near_ids</code>, а их среднюю цену — в <code>near_price</code>.</p>",
    "hints": [
     "Расстояния: <code>np.sqrt(((Z - Z[i]) ** 2).sum(axis=1))</code>",
     "Уберите из <code>np.argsort(d)</code> саму квартиру."
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.preprocessing import StandardScaler as _SS\n_f = pd.read_csv('flats.csv')\n_Z = _SS().fit_transform(_f[['area_m2', 'rooms', 'year_built']])\n_d = _np.sqrt(((_Z - _Z[0]) ** 2).sum(axis=1))\n_d[0] = _np.inf\n_o = _np.argsort(_d)[:5]\nassert len(near_ids) == 5 and 1 not in list(near_ids), 'near_ids — 5 других квартир (не сама квартира 1)'\nassert [int(_v) for _v in near_ids] == _f['flat_id'].iloc[_o].tolist(), f'near_ids = {_f[\"flat_id\"].iloc[_o].tolist()}. Вы считали в масштабированном пространстве?'\nassert abs(near_price - _f['price_mln'].iloc[_o].mean()) < 1e-6, 'near_price — средняя цена этих 5 квартир'"
    }
   }
  ]
 },
 "ml-7": {
  "pr": [
   {
    "title": "Сигмоида",
    "prompt": "<p>Напишите функцию <code>sigmoid(z)</code>: <code>1 / (1 + e^(−z))</code>. Она должна работать и с числами, и с массивами NumPy (<code>np.exp</code>).</p><p>Например, <code>sigmoid(0)</code> → <code>0.5</code>.</p>",
    "hints": [
     "<code>np.exp(-z)</code> принимает и массивы."
    ],
    "check": {
     "tests": "import numpy as _np\nassert sigmoid(0) is not None and abs(float(sigmoid(0)) - 0.5) < 1e-9, 'sigmoid(0) должна вернуть 0.5'\nassert abs(float(sigmoid(2)) - 0.8807970779778823) < 1e-9, 'sigmoid(2) ≈ 0.8808'\nassert _np.allclose(sigmoid(_np.array([-3.0, 0.0, 3.0])), [0.04742587, 0.5, 0.95257413]), 'Должна работать и с массивом: используйте np.exp'"
    }
   },
   {
    "title": "Из вероятности в класс",
    "prompt": "<p>Функция <code>to_class(probs, t=0.5)</code> должна для каждой вероятности написать 1, если <code>p &gt;= t</code>, иначе 0, и вернуть <b>список</b>.</p><p>Например, <code>to_class([0.2, 0.5, 0.9])</code> → <code>[0, 1, 1]</code>.</p>",
    "hints": [
     "Генератор списка: <code>[1 if p &gt;= t else 0 for p in probs]</code>"
    ],
    "check": {
     "tests": "assert to_class([0.2, 0.5, 0.9]) == [0, 1, 1], 'to_class([0.2, 0.5, 0.9]) должна вернуть [0, 1, 1] (0.5 ≥ 0.5)'\nassert to_class([0.2, 0.5, 0.9], t=0.1) == [1, 1, 1], 'При t=0.1 все значения равны 1'\nassert to_class([0.35, 0.29], t=0.3) == [1, 0], 'to_class([0.35, 0.29], t=0.3) = [1, 0]'\nassert to_class([]) == [], 'Для пустого списка результат — пустой список'"
    }
   },
   {
    "title": "Риск нового абонента",
    "prompt": "<p>Модель <code>clf</code> обучена. Новый абонент: подключился 3 месяца назад, платит 11 000 ₸ в месяц, 4 раза звонил в поддержку, без договора. Запишите вероятность его ухода (число) в <code>p_new</code>.</p>",
    "hints": [
     "Порядок столбцов такой же, как в <code>features</code>.",
     "<code>clf.predict_proba(new)[0, 1]</code> — первая строка, класс «уйдёт»."
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\n_n = _pd.DataFrame({'tenure_months': [3], 'monthly_fee': [11000], 'support_calls': [4], 'has_contract': [0]})\n_pn = _m.predict_proba(_n)[0, 1]\nassert 0 <= float(p_new) <= 1, 'p_new — вероятность (от 0 до 1)'\nassert abs(float(p_new) - _pn) < 0.01, f'p_new должно быть ≈ {_pn:.3f}: predict_proba(new)[0, 1]'"
    }
   },
   {
    "title": "Признаки, повышающие риск",
    "prompt": "<p>Запишите коэффициенты <code>clf</code> в Series <code>coefs</code> с названиями признаков <code>features</code>. Названия признаков с положительным коэффициентом (повышающих вероятность ухода) запишите в <code>risk_up</code> как список, отсортированный по алфавиту.</p>",
    "hints": [
     "Форма <code>clf.coef_</code> — (1, 4): <code>clf.coef_[0]</code>",
     "<code>sorted(coefs[coefs &gt; 0].index)</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\n_s = _pd.Series(_m.coef_[0], index=_F)\nassert isinstance(coefs, pd.Series) and list(coefs.index) == features, 'Индекс coefs — features'\nassert _np.allclose(coefs.values, _s.values, atol=1e-3), 'coefs = clf.coef_[0] (первая строка)'\nassert list(risk_up) == sorted(_s[_s > 0].index), f'risk_up = {sorted(_s[_s > 0].index)}'"
    }
   },
   {
    "title": "Средняя вероятность",
    "prompt": "<p>В хорошей модели средняя предсказанная вероятность близка к реальной доле ухода. Запишите среднее <code>proba</code> на тесте в <code>mean_proba</code>, среднее <code>y_test</code> — в <code>true_rate</code>. Модуль разницы запишите в <code>calib_gap</code>.</p>",
    "hints": [
     "<code>proba.mean()</code>",
     "<code>abs(a - b)</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\nassert abs(mean_proba - _p.mean()) < 0.01, f'mean_proba должно быть ≈ {_p.mean():.3f}'\nassert abs(true_rate - _yte.mean()) < 1e-9, 'true_rate = y_test.mean()'\nassert abs(calib_gap - abs(mean_proba - true_rate)) < 1e-9 and calib_gap < 0.05, 'calib_gap = |mean_proba − true_rate| (маленькое число)'"
    }
   },
   {
    "title": "Топ-10 самых рискованных",
    "prompt": "<p>Отдел удержания может позвонить только 10 абонентам. На тесте запишите индексы (<code>X_test.index</code>) 10 абонентов с самым высоким <code>proba</code> в список <code>top10</code>. Реальную долю уходов среди них запишите в <code>top10_rate</code>.</p>",
    "hints": [
     "<code>pd.Series(proba, index=X_test.index).sort_values(ascending=False)</code>",
     "<code>y_test.loc[top10]</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\n_s = _pd.Series(_p, index=_Xte.index).sort_values(ascending=False)\n_t = list(_s.index[:10])\nassert len(top10) == 10, 'В top10 должно быть 10 индексов'\nassert set(top10) == set(_t), 'top10 — индексы X_test 10 абонентов с наибольшим proba'\nassert abs(top10_rate - _yte.loc[_t].mean()) < 1e-9, 'top10_rate = y_test.loc[top10].mean()'\nassert top10_rate > y_test.mean(), 'Среди самых рискованных доля уходов должна быть выше средней'"
    }
   },
   {
    "title": "Вероятность вручную",
    "prompt": "<p>Без <code>predict_proba</code>: вычислите <code>z = X_test · coef + intercept</code> и через сигмоиду найдите вероятности <code>manual</code> (<code>clf.coef_[0]</code>, <code>clf.intercept_[0]</code>). Наибольшую абсолютную разницу между <code>manual</code> и <code>proba</code> запишите в <code>max_diff</code> (она должна быть ≈ 0).</p>",
    "hints": [
     "Матричное умножение: <code>X_test.values @ clf.coef_[0]</code>",
     "Сигмоида: <code>1 / (1 + np.exp(-z))</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nassert len(manual) == 150, 'manual — для 150 абонентов из теста'\nassert _np.allclose(manual, clf.predict_proba(X_test)[:, 1]), 'manual = 1 / (1 + exp(-z)), z = X_test · coef + intercept'\nassert max_diff < 1e-9, 'max_diff должно быть ≈ 0'"
    }
   },
   {
    "title": "Accuracy по порогу",
    "prompt": "<p>Для порога <code>t</code> ∈ 0.1, 0.2, …, 0.9 запишите тестовый accuracy в словарь <code>acc_by_t</code> (ключ — <code>round(t, 1)</code>): прогноз <code>proba &gt;= t</code>. Порог с самым высоким accuracy запишите в <code>best_t</code>.</p>",
    "hints": [
     "<code>np.arange(0.1, 0.95, 0.1)</code> даёт значения от 0.1 до 0.9.",
     "<code>max(acc_by_t, key=acc_by_t.get)</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\n_a = {round(_t, 1): ((_p >= _t).astype(int) == _yte.values).mean() for _t in _np.arange(0.1, 0.95, 0.1)}\nassert sorted(acc_by_t) == sorted(_a), 'Ключи: 0.1, 0.2, ..., 0.9 (round(t, 1))'\nassert all(abs(acc_by_t[_k] - _a[_k]) < 0.02 for _k in _a), 'Значения accuracy неверны: (proba >= t) == y_test'\nassert acc_by_t[best_t] == max(acc_by_t.values()), 'best_t — порог с самым высоким accuracy'"
    }
   }
  ]
 },
 "ml-8": {
  "pr": [
   {
    "title": "Функция accuracy",
    "prompt": "<p>Функция <code>accuracy(y_true, y_pred)</code> должна возвращать долю верных предсказаний (без sklearn).</p><p>Например, <code>accuracy([1, 0, 1, 1], [1, 0, 0, 1])</code> → <code>0.75</code>.</p>",
    "hints": [
     "<code>zip(y_true, y_pred)</code> даёт пары.",
     "Число верных / общее число."
    ],
    "check": {
     "tests": "assert accuracy([1, 0, 1, 1], [1, 0, 0, 1]) == 0.75, 'accuracy([1, 0, 1, 1], [1, 0, 0, 1]) должна вернуть 0.75'\nassert accuracy([0, 0], [1, 1]) == 0, 'Все ошибочно: 0'\nassert accuracy([1, 0, 1], [1, 0, 1]) == 1, 'Все верно: 1'"
    }
   },
   {
    "title": "Функция F1",
    "prompt": "<p>Функция <code>f1(precision, recall)</code> должна возвращать среднее гармоническое: <code>2·P·R / (P + R)</code>. Если оба значения равны 0, она возвращает 0.</p><p>Например, <code>f1(0.5, 1.0)</code> → <code>0.6667</code>.</p>",
    "hints": [
     "Сначала проверьте случай <code>precision + recall == 0</code>."
    ],
    "check": {
     "tests": "assert f1(0.5, 1.0) is not None and abs(f1(0.5, 1.0) - 2 / 3) < 1e-9, 'f1(0.5, 1.0) должна быть ≈ 0.6667'\nassert abs(f1(0.8, 0.8) - 0.8) < 1e-9, 'f1(0.8, 0.8) = 0.8'\nassert f1(0, 0) == 0, 'f1(0, 0) = 0 (не делите на ноль)'\nassert abs(f1(1.0, 0.1) - 2 * 0.1 / 1.1) < 1e-9, 'Среднее гармоническое ближе к меньшему значению: f1(1.0, 0.1) ≈ 0.18'"
    }
   },
   {
    "title": "Прогноз «все останутся»",
    "prompt": "<p>Модель предсказывает, что «никто не уйдёт»: для каждого абонента из теста — 0. Создайте массив <code>pred_zero</code> и вычислите <code>acc_zero</code> (accuracy) и <code>rec_zero</code> (recall).</p>",
    "hints": [
     "<code>np.zeros(len(y_test), dtype=int)</code>",
     "<code>accuracy_score(y_test, pred_zero)</code>"
    ],
    "check": {
     "tests": "assert len(pred_zero) == 150 and int(sum(pred_zero)) == 0, 'pred_zero — 150 нулей'\nassert abs(acc_zero - (1 - y_test.mean())) < 1e-9, f'acc_zero ≈ {1 - y_test.mean():.3f}: accuracy выглядит высоким'\nassert rec_zero == 0, 'rec_zero = 0: ни одного уходящего не найдено'"
    }
   },
   {
    "title": "Функция confusion matrix",
    "prompt": "<p>Функция <code>confusion(y_true, y_pred)</code> должна возвращать список <code>[[tn, fp], [fn, tp]]</code>, как в sklearn.</p><p>Например, <code>confusion([1, 0, 1, 0], [1, 1, 0, 0])</code> → <code>[[1, 1], [1, 1]]</code>.</p>",
    "hints": [
     "<code>pairs.count((0, 1))</code> — количество FP.",
     "Порядок: <code>[[tn, fp], [fn, tp]]</code>"
    ],
    "check": {
     "tests": "from sklearn.metrics import confusion_matrix as _cm\nassert confusion([1, 0, 1, 0], [1, 1, 0, 0]) == [[1, 1], [1, 1]], 'confusion([1, 0, 1, 0], [1, 1, 0, 0]) → [[1, 1], [1, 1]]'\nassert confusion([1, 1, 1], [1, 1, 0]) == [[0, 0], [1, 2]], 'confusion([1, 1, 1], [1, 1, 0]) → [[0, 0], [1, 2]]: порядок [[tn, fp], [fn, tp]]'\n_t, _p = [0, 1, 1, 0, 1, 0, 0, 1, 1, 0], [0, 1, 0, 1, 1, 0, 0, 0, 1, 1]\nassert confusion(_t, _p) == _cm(_t, _p).tolist(), 'Результат не совпадает с sklearn confusion_matrix'"
    }
   },
   {
    "title": "Сравнение двух порогов",
    "prompt": "<p>Матрица <code>proba</code> готова. Для порога 0.5 запишите precision и recall в <code>prec_05</code> и <code>rec_05</code>, а для порога 0.3 — в <code>prec_03</code> и <code>rec_03</code>.</p>",
    "hints": [
     "<code>(proba &gt;= 0.3).astype(int)</code>",
     "Порядок аргументов: <code>precision_score(y_test, pred)</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\nfrom sklearn import metrics as _mt\n_a = (_p >= 0.5).astype(int)\n_b = (_p >= 0.3).astype(int)\nassert abs(prec_05 - _mt.precision_score(_yte, _a)) < 0.02 and abs(rec_05 - _mt.recall_score(_yte, _a)) < 0.02, 'prec_05, rec_05: порог 0.5'\nassert abs(prec_03 - _mt.precision_score(_yte, _b)) < 0.02 and abs(rec_03 - _mt.recall_score(_yte, _b)) < 0.02, 'prec_03, rec_03: порог 0.3'\nassert rec_03 > rec_05, 'При понижении порога recall растёт'"
    }
   },
   {
    "title": "Specificity",
    "prompt": "<p>Specificity — доля верно найденных «останется» среди всех тех, кто останется: <code>tn / (tn + fp)</code>. По предсказаниям <code>clf.predict(X_test)</code> найдите матрицу <code>cm</code>, извлеките <code>tn, fp, fn, tp</code> (<code>cm.ravel()</code>) и вычислите <code>spec</code>.</p>",
    "hints": [
     "<code>tn, fp, fn, tp = cm.ravel()</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\nfrom sklearn.metrics import confusion_matrix as _cm\n_tn, _fp, _fn, _tp = _cm(_yte, _m.predict(_Xte)).ravel()\nassert int(tn) + int(fp) == int((y_test == 0).sum()), 'tn + fp — количество тех, кто остаётся'\nassert abs(spec - _tn / (_tn + _fp)) < 0.02, f'spec ≈ {_tn / (_tn + _fp):.3f}: tn / (tn + fp)'\nassert spec > 0.8, 'У этой модели specificity высокая, а recall низкий'"
    }
   },
   {
    "title": "Порог recall 80%",
    "prompt": "<p>Бизнес хочет найти не менее 80% уходящих абонентов. Среди порогов <code>np.arange(0.05, 0.96, 0.05)</code> (<code>round(t, 2)</code>) найдите <b>самый большой</b> порог, при котором recall на тесте ≥ 0.8: его запишите в <code>t80</code>, а precision при этом пороге — в <code>prec80</code>.</p>",
    "hints": [
     "Проверяйте пороги по возрастанию и сохраняйте последний, подходящий под условие.",
     "<code>recall_score(y_test, (proba &gt;= t).astype(int))</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\nfrom sklearn import metrics as _mt\n_ok = [round(_t, 2) for _t in _np.arange(0.05, 0.96, 0.05) if _mt.recall_score(_yte, (_p >= round(_t, 2)).astype(int)) >= 0.8]\n_t8 = max(_ok)\nassert t80 is not None and abs(t80 - _t8) < 1e-9, f't80 = {_t8} должно быть: самый большой порог, при котором recall ≥ 0.8'\nassert abs(prec80 - _mt.precision_score(_yte, (_p >= _t8).astype(int))) < 0.02, 'prec80 — precision при этом пороге'"
    }
   },
   {
    "title": "AUC через пары",
    "prompt": "<p>ROC AUC — вероятность того, что случайно выбранный уходящий абонент получит более высокую оценку, чем случайно выбранный остающийся. Напишите функцию <code>auc_pairs(y, scores)</code>: переберите все пары (уходящий, остающийся), добавьте 1, если у уходящего оценка выше, 0.5, если оценки равны, и разделите на число пар. Затем <code>auc_manual = auc_pairs(y_test, proba)</code>.</p><p>Например, <code>auc_pairs([0, 1, 0, 1], [0.1, 0.8, 0.4, 0.3])</code> → <code>0.75</code>.</p>",
    "hints": [
     "Разделите оценки на две группы: <code>pos = s[y == 1]</code>, <code>neg = s[y == 0]</code>.",
     "<code>(p &gt; neg).sum()</code> даёт число побед для одного уходящего."
    ],
    "check": {
     "tests": "from sklearn.metrics import roc_auc_score as _ra\nassert auc_pairs([0, 1, 0, 1], [0.1, 0.8, 0.4, 0.3]) == 0.75, 'auc_pairs([0, 1, 0, 1], [0.1, 0.8, 0.4, 0.3]) должна вернуть 0.75'\nassert auc_pairs([0, 1], [0.5, 0.5]) == 0.5, 'Равные оценки дают 0.5'\nassert abs(auc_pairs([1, 0, 1, 0, 1], [0.9, 0.2, 0.4, 0.6, 0.6]) - _ra([1, 0, 1, 0, 1], [0.9, 0.2, 0.4, 0.6, 0.6])) < 1e-9, 'Результат должен совпадать с roc_auc_score'\nassert abs(auc_manual - _ra(y_test, proba)) < 1e-9, 'auc_manual = auc_pairs(y_test, proba)'"
    }
   }
  ]
 },
 "ml-9": {
  "pr": [
   {
    "title": "Функция Gini",
    "prompt": "<p>Функция <code>gini(labels)</code> должна возвращать коэффициент Джини: <code>1 − Σ pₖ²</code>, где <code>pₖ</code> — доля каждого класса.</p><p>Например, <code>gini([0, 0, 1, 1])</code> → <code>0.5</code>, <code>gini([1, 1, 1])</code> → <code>0.0</code>.</p>",
    "hints": [
     "<code>set(labels)</code> — классы.",
     "<code>labels.count(c) / n</code> — доля класса."
    ],
    "check": {
     "tests": "assert gini([0, 0, 1, 1]) is not None and abs(gini([0, 0, 1, 1]) - 0.5) < 1e-9, 'gini([0, 0, 1, 1]) должна вернуть 0.5'\nassert abs(gini([1, 1, 1])) < 1e-9, 'Чистая группа: gini = 0'\nassert abs(gini([0, 1, 1, 1]) - 0.375) < 1e-9, 'gini([0, 1, 1, 1]) = 1 − (0.25² + 0.75²) = 0.375'\nassert abs(gini(['a', 'b', 'c']) - 2 / 3) < 1e-9, 'Должна работать с тремя классами'"
    }
   },
   {
    "title": "Дерево с одним разбиением",
    "prompt": "<p>Обучите <code>DecisionTreeClassifier(max_depth=1, random_state=0)</code> под именем <code>stump</code>. Тестовая точность → <code>stump_acc</code>. По какому признаку разбило дерево: запишите название признака с самым большим значением <code>feature_importances_</code> в <code>root_feature</code>.</p>",
    "hints": [
     "<code>pd.Series(stump.feature_importances_, index=features).idxmax()</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\nfrom sklearn.tree import DecisionTreeClassifier as _DT\n_s = _DT(max_depth=1, random_state=0).fit(_Xtr, _ytr)\nassert isinstance(stump, DecisionTreeClassifier) and stump.get_depth() == 1, 'stump — дерево глубиной 1'\nassert abs(stump_acc - _s.score(_Xte, _yte)) < 1e-9, f'stump_acc ≈ {_s.score(_Xte, _yte):.3f}'\nassert root_feature == _F[int(_np.argmax(_s.feature_importances_))], 'root_feature — признак с самым большим feature_importances_'"
    }
   },
   {
    "title": "Дерево регрессии",
    "prompt": "<p>Дерево тоже может предсказывать цену. Обучите <code>DecisionTreeRegressor(max_depth=3, random_state=0)</code> под именем <code>reg</code> на train по признакам <code>area_m2</code>, <code>year_built</code> (разбиение <code>test_size=0.2</code>, <code>random_state=42</code>). Тестовый R² → <code>tree_r2</code>.</p>",
    "hints": [
     "<code>from sklearn.tree import DecisionTreeRegressor</code> уже подключено.",
     "API тот же: <code>fit</code>, <code>score</code>."
    ]
   },
   {
    "title": "Количество листьев",
    "prompt": "<p>С ростом глубины дерево становится сложнее. Для <code>max_depth</code> ∈ [2, 4, 6, None] обучите дерево (<code>random_state=0</code>) и запишите количество листьев (<code>get_n_leaves()</code>) в словарь <code>leaves</code>.</p>",
    "hints": [
     "Цикл: <code>for d in [2, 4, 6, None]:</code>",
     "<code>t.get_n_leaves()</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\nfrom sklearn.tree import DecisionTreeClassifier as _DT\n_l = {_d: _DT(max_depth=_d, random_state=0).fit(_Xtr, _ytr).get_n_leaves() for _d in [2, 4, 6, None]}\nassert set(leaves) == {2, 4, 6, None}, 'Ключи leaves: 2, 4, 6, None'\nassert all(int(leaves[_d]) == int(_l[_d]) for _d in _l), f'Количество листьев: {_l}'\nassert leaves[2] <= 4 and leaves[None] > 50, 'В дереве глубины 2 не больше 4 листьев, а у дерева без ограничений их сотни'"
    }
   },
   {
    "title": "Минимум примеров в листе",
    "prompt": "<p>Ещё один способ уменьшить переобучение — <code>min_samples_leaf</code>. Для значений [1, 5, 20, 50] обучите дерево (<code>random_state=0</code>, без ограничения глубины) и запишите в словарь <code>results</code> пары <code>(train_acc, test_acc)</code>. Значение с самой высокой тестовой точностью запишите в <code>best_leaf</code>.</p>",
    "hints": [
     "<code>DecisionTreeClassifier(min_samples_leaf=m, random_state=0)</code>",
     "<code>max(results, key=lambda m: results[m][1])</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\nfrom sklearn.tree import DecisionTreeClassifier as _DT\n_r = {}\nfor _m in [1, 5, 20, 50]:\n    _t = _DT(min_samples_leaf=_m, random_state=0).fit(_Xtr, _ytr)\n    _r[_m] = (_t.score(_Xtr, _ytr), _t.score(_Xte, _yte))\nassert sorted(results) == [1, 5, 20, 50], 'Ключи results: 1, 5, 20, 50'\nassert all(abs(results[_m][0] - _r[_m][0]) < 1e-9 and abs(results[_m][1] - _r[_m][1]) < 1e-9 for _m in _r), 'Каждое значение — (train_acc, test_acc)'\nassert best_leaf == max(_r, key=lambda _m: _r[_m][1]), 'best_leaf — min_samples_leaf с самой высокой тестовой точностью'\nassert results[1][0] > results[50][0], 'При увеличении min_samples_leaf точность на train снижается'"
    }
   },
   {
    "title": "Дерево или логистическая регрессия",
    "prompt": "<p>Сравните две модели на одном разбиении: <code>DecisionTreeClassifier(max_depth=3, random_state=0)</code> → <code>acc_tree</code>, <code>LogisticRegression(max_iter=1000)</code> → <code>acc_lr</code> (тестовая точность). Название лучшей запишите в <code>winner</code>: <code>'tree'</code> или <code>'logreg'</code> (при равенстве — <code>'logreg'</code>).</p>",
    "hints": [
     "Обе модели: <code>.fit(X_train, y_train).score(X_test, y_test)</code>."
    ]
   },
   {
    "title": "Лучший порог разбиения",
    "prompt": "<p>Найдите одно разбиение дерева вручную. Функция <code>best_split(xs, ys)</code>: для каждого кандидата-порога <code>t</code> (каждое уникальное значение из <code>xs</code>, кроме наибольшего) разделите данные на группы <code>x &lt;= t</code> и <code>x &gt; t</code> и вычислите взвешенный Gini: <code>(n_L·G_L + n_R·G_R) / n</code>. Верните <code>t</code> с наименьшим Gini (при равенстве — меньшее).</p><p>Например, <code>best_split([1, 2, 3, 4], [0, 0, 1, 1])</code> → <code>2</code>.</p>",
    "hints": [
     "Кандидаты: <code>sorted(set(xs))[:-1]</code>",
     "Создайте списки <code>ys</code> для левой и правой групп и вызовите <code>gini</code>."
    ],
    "check": {
     "tests": "assert best_split([1, 2, 3, 4], [0, 0, 1, 1]) == 2, 'best_split([1, 2, 3, 4], [0, 0, 1, 1]) должна вернуть 2'\nassert best_split([5, 1, 9, 3, 7], [1, 0, 1, 0, 1]) == 3, 'Несортированные xs: best_split([5, 1, 9, 3, 7], [1, 0, 1, 0, 1]) = 3'\nassert best_split([10, 20, 30, 40, 50, 60], [0, 0, 0, 1, 0, 1]) == 30, 'best_split([10, ..., 60], [0, 0, 0, 1, 0, 1]) = 30'\nassert best_split([1, 1, 2, 2], [0, 1, 0, 1]) == 1, 'Единственный кандидат-порог: 1'"
    }
   },
   {
    "title": "Глубина дерева регрессии",
    "prompt": "<p>Разбиение готово (<code>area_m2</code>, <code>rooms</code>, <code>year_built</code>). Для <code>max_depth</code> = 1, 2, …, 10 запишите тестовый R² <code>DecisionTreeRegressor(random_state=0)</code> в <code>r2_by_depth</code>. Лучшее значение запишите в <code>best_depth</code>. Разницу между train R² и test R² для дерева без ограничений запишите в <code>gap_none</code>.</p>",
    "hints": [
     "<code>for d in range(1, 11):</code>",
     "Дерево без ограничений: <code>DecisionTreeRegressor(random_state=0)</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\nfrom sklearn.tree import DecisionTreeRegressor as _DR\n_a, _b, _c, _d = _tts(_f[['area_m2', 'rooms', 'year_built']], _f['price_mln'], test_size=0.2, random_state=42)\n_r = {_k: _DR(max_depth=_k, random_state=0).fit(_a, _c).score(_b, _d) for _k in range(1, 11)}\n_full = _DR(random_state=0).fit(_a, _c)\nassert sorted(r2_by_depth) == list(range(1, 11)), 'Ключи: 1, 2, ..., 10'\nassert all(abs(r2_by_depth[_k] - _r[_k]) < 1e-9 for _k in _r), 'Значения тестового R² неверны'\nassert best_depth == max(_r, key=_r.get), f'best_depth = {max(_r, key=_r.get)} должно быть'\nassert abs(gap_none - (_full.score(_a, _c) - _full.score(_b, _d))) < 1e-9, 'gap_none = train R² − test R² (без max_depth)'\nassert gap_none > 0.1, 'Дерево без ограничений запоминает train: разница большая'"
    }
   }
  ]
 },
 "ml-10": {
  "pr": [
   {
    "title": "CV для регрессии",
    "prompt": "<p>Выполните <code>cross_val_score</code> для <code>LinearRegression</code> с <code>cv=5</code> на всём <code>X</code> (<code>area_m2</code>, <code>rooms</code>, <code>year_built</code>) и <code>y</code> (<code>price_mln</code>). Результат запишите в <code>scores</code>, среднее — в <code>cv_mean</code> (это R²).</p>",
    "hints": [
     "<code>cross_val_score(LinearRegression(), X, y, cv=5)</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.model_selection import cross_val_score as _cvs\nfrom sklearn.linear_model import LinearRegression as _LinR\n_s = _cvs(_LinR(), X, y, cv=5)\nassert len(scores) == 5, 'cv=5: 5 оценок'\nassert _np.allclose(scores, _s), 'Оценки неверны: cross_val_score(LinearRegression(), X, y, cv=5)'\nassert abs(cv_mean - _s.mean()) < 1e-9, 'cv_mean = scores.mean()'"
    }
   },
   {
    "title": "Итоги CV",
    "prompt": "<p>Функция <code>summarize(scores)</code> должна возвращать кортеж <code>(орташа, SD)</code>, оба значения округлены до 3 знаков (<code>np.std</code>, популяционное).</p><p>Например, <code>summarize([0.8, 0.7, 0.9])</code> → <code>(0.8, 0.082)</code>.</p>",
    "hints": [
     "<code>round(float(s.mean()), 3)</code>",
     "Кортеж: <code>(a, b)</code>"
    ],
    "check": {
     "tests": "assert summarize([0.8, 0.7, 0.9]) == (0.8, 0.082), 'summarize([0.8, 0.7, 0.9]) должна вернуть (0.8, 0.082)'\nassert summarize([0.5, 0.5]) == (0.5, 0.0), 'Одинаковые оценки: SD = 0'\nassert summarize([0.61, 0.73, 0.68, 0.70, 0.66]) == (0.676, 0.04), 'summarize([0.61, 0.73, 0.68, 0.70, 0.66]) = (0.676, 0.04)'"
    }
   },
   {
    "title": "Размеры фолдов",
    "prompt": "<p>Если разбить <code>n</code> строк на <code>k</code> фолдов, каким будет размер каждого фолда? Функция <code>fold_sizes(n, k)</code> должна вернуть список: первые <code>n % k</code> фолдов получают на одну строку больше.</p><p>Например, <code>fold_sizes(10, 3)</code> → <code>[4, 3, 3]</code>.</p>",
    "hints": [
     "<code>divmod(n, k)</code> возвращает частное и остаток."
    ],
    "check": {
     "tests": "assert fold_sizes(10, 3) == [4, 3, 3], 'fold_sizes(10, 3) должна вернуть [4, 3, 3]'\nassert fold_sizes(600, 5) == [120] * 5, 'fold_sizes(600, 5) = [120, 120, 120, 120, 120]'\nassert fold_sizes(7, 4) == [2, 2, 2, 1], 'fold_sizes(7, 4) = [2, 2, 2, 1]'\nassert sum(fold_sizes(403, 10)) == 403, 'Сумма размеров фолдов должна равняться n'"
    }
   },
   {
    "title": "CV по MAE",
    "prompt": "<p>Вычислите CV не по R², а по MAE: <code>scoring='neg_mean_absolute_error'</code> (sklearn меняет знак, чтобы «больше — лучше»). <code>LinearRegression</code>, <code>cv=5</code>. Среднее положительного MAE запишите в <code>cv_mae</code>.</p>",
    "hints": [
     "<code>scoring='neg_mean_absolute_error'</code>",
     "<code>cv_mae = -scores.mean()</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import cross_val_score as _cvs\nfrom sklearn.linear_model import LinearRegression as _LinR\n_m = -_cvs(_LinR(), X, y, cv=5, scoring='neg_mean_absolute_error').mean()\nassert cv_mae > 0, 'cv_mae должно быть положительным числом: уберите знак минус'\nassert abs(cv_mae - _m) < 1e-6, f'cv_mae ≈ {_m:.2f} млн ₸'"
    }
   },
   {
    "title": "Выбор k для KNN",
    "prompt": "<p>Для <code>make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=k))</code> по значениям <code>k</code> ∈ [1, 5, 15, 31] запишите среднюю точность 5-fold CV в словарь <code>cv_by_k</code>. Лучшее значение запишите в <code>best_k</code>.</p>",
    "hints": [
     "Pipeline создаётся внутри цикла.",
     "<code>cross_val_score(pipe, X, y, cv=5).mean()</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import cross_val_score as _cvs\nfrom sklearn.pipeline import make_pipeline as _mp\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.neighbors import KNeighborsClassifier as _KC\n_r = {_k: _cvs(_mp(_SS(), _KC(n_neighbors=_k)), X, y, cv=5).mean() for _k in [1, 5, 15, 31]}\nassert sorted(cv_by_k) == [1, 5, 15, 31], 'Ключи cv_by_k: 1, 5, 15, 31'\nassert all(abs(cv_by_k[_k] - _r[_k]) < 1e-9 for _k in _r), 'Средние значения CV неверны: масштабирование должно быть внутри pipeline'\nassert best_k == max(_r, key=_r.get), f'best_k должно быть {max(_r, key=_r.get)}'\nassert cv_by_k[1] < cv_by_k[best_k], 'При k=1 высокая дисперсия: он хуже лучшего'"
    }
   },
   {
    "title": "Разница train и CV",
    "prompt": "<p>Посмотрите bias и variance на числах. Для <code>max_depth</code> ∈ [2, 4, None] и <code>DecisionTreeClassifier(random_state=0)</code>: запишите в словарь <code>gaps</code> разницу между train accuracy (обучение на всём X, y) и средней точностью 5-fold CV.</p>",
    "hints": [
     "Train accuracy: <code>tree.fit(X, y).score(X, y)</code>",
     "CV: <code>cross_val_score(tree, X, y, cv=5).mean()</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import cross_val_score as _cvs\nfrom sklearn.tree import DecisionTreeClassifier as _DT\n_g = {_d: _DT(max_depth=_d, random_state=0).fit(X, y).score(X, y) - _cvs(_DT(max_depth=_d, random_state=0), X, y, cv=5).mean() for _d in [2, 4, None]}\nassert set(gaps) == {2, 4, None}, 'Ключи gaps: 2, 4, None'\nassert all(abs(gaps[_d] - _g[_d]) < 1e-9 for _d in _g), 'gap = train accuracy (на всём X, y) − среднее CV'\nassert gaps[None] > gaps[2], 'У дерева без ограничений разница самая большая (высокая дисперсия)'"
    }
   },
   {
    "title": "CV вручную на 5 фолдов",
    "prompt": "<p>Выполните CV вручную. <code>idx = np.random.default_rng(0).permutation(len(flats))</code>, <code>folds = np.array_split(idx, 5)</code>. Для каждого фолда обучите <code>LinearRegression</code> (<code>area_m2</code>, <code>rooms</code>, <code>year_built</code>) на остальных строках и запишите R² на этом фолде в список <code>manual_scores</code>. Среднее значение — <code>manual_mean</code>.</p>",
    "hints": [
     "Индексы train: <code>np.concatenate([folds[j] for j in range(5) if j != i])</code>",
     "Выбор по позиции: <code>X.iloc[train_idx]</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\n_fo = _np.array_split(_np.random.default_rng(0).permutation(400), 5)\n_s = []\nfor _i in range(5):\n    _tr = _np.concatenate([_fo[_j] for _j in range(5) if _j != _i])\n    _s.append(_LinR().fit(X.iloc[_tr], y.iloc[_tr]).score(X.iloc[_fo[_i]], y.iloc[_fo[_i]]))\nassert len(manual_scores) == 5, 'В manual_scores должно быть 5 значений'\nassert _np.allclose(manual_scores, _s), 'Оценки фолдов неверны: фолд i — тест, остальные — train'\nassert abs(manual_mean - _np.mean(_s)) < 1e-9, 'manual_mean — среднее 5 оценок'"
    }
   },
   {
    "title": "Сравнение трёх моделей",
    "prompt": "<p>One-hot <code>X</code> готов. Запишите средний R² 5-fold CV трёх моделей в словарь <code>cv_r2</code>: <code>'linear'</code> — <code>LinearRegression()</code>; <code>'tree'</code> — <code>DecisionTreeRegressor(max_depth=5, random_state=0)</code>; <code>'knn'</code> — <code>make_pipeline(StandardScaler(), KNeighborsRegressor(n_neighbors=5))</code>. Название лучшей модели запишите в <code>best_model</code>.</p>",
    "hints": [
     "Положите модели в словарь и пройдите по нему циклом.",
     "<code>cross_val_score(m, X, y, cv=5).mean()</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import cross_val_score as _cvs\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.tree import DecisionTreeRegressor as _DR\nfrom sklearn.neighbors import KNeighborsRegressor as _KR\nfrom sklearn.pipeline import make_pipeline as _mp\nfrom sklearn.preprocessing import StandardScaler as _SS\n_r = {'linear': _cvs(_LinR(), X, y, cv=5).mean(), 'tree': _cvs(_DR(max_depth=5, random_state=0), X, y, cv=5).mean(), 'knn': _cvs(_mp(_SS(), _KR(n_neighbors=5)), X, y, cv=5).mean()}\nassert set(cv_r2) == {'linear', 'tree', 'knn'}, \"Ключи cv_r2: linear, tree, knn\"\nassert all(abs(cv_r2[_k] - _r[_k]) < 1e-6 for _k in _r), 'Значения CV R² неверны: cross_val_score(m, X, y, cv=5).mean()'\nassert best_model == max(_r, key=_r.get), f'best_model = {max(_r, key=_r.get)} должно быть'"
    }
   }
  ]
 }
} });
