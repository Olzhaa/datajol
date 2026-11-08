// Practice tasks after the lessons of m5-1. Each lesson's list opens one task at a time.
DJ.addPractice('m5-1', {
 "ml-1": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Абонент белгілері",
   "prompt": "<p><code>churn.csv</code>-тен <code>X</code> (бағандар: <code>age</code>, <code>tenure_months</code>, <code>monthly_fee</code>, осы ретпен) және нысана <code>y</code> (<code>churned</code>) жасаңыз.</p><p>Мысалы, <code>X.shape</code> → <code>(600, 3)</code>.</p>",
   "starter": "import pandas as pd\nchurn = pd.read_csv('churn.csv')\n",
   "solution": "import pandas as pd\nchurn = pd.read_csv('churn.csv')\nX = churn[['age', 'tenure_months', 'monthly_fee']]\ny = churn['churned']\nprint(X.shape, y.shape)",
   "hints": [
    "Бірнеше баған: <code>churn[['age', 'tenure_months', 'monthly_fee']]</code>",
    "Нысана: <code>churn['churned']</code>"
   ],
   "check": {
    "tests": "assert isinstance(X, pd.DataFrame), 'X DataFrame болуы керек: екі жақша [[...]]'\nassert list(X.columns) == ['age', 'tenure_months', 'monthly_fee'], 'X бағандары: age, tenure_months, monthly_fee (осы ретпен)'\nassert isinstance(y, pd.Series) and y.name == 'churned', 'y — churned бағаны (Series, бір жақша)'\nassert len(X) == 600 and len(y) == 600, 'Барлық 600 абонент қалуы керек'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Есеп түрін анықтау",
   "prompt": "<p><code>task_type(values)</code> функциясын жазыңыз. Нысана мәндері тек 0 мен 1 болса, <code>'classification'</code>, әйтпесе <code>'regression'</code> қайтарсын.</p><p>Мысалы, <code>task_type([0, 1, 1])</code> → <code>'classification'</code>, <code>task_type([35.5, 41.2])</code> → <code>'regression'</code>.</p>",
   "starter": "def task_type(values):\n    pass\n",
   "solution": "def task_type(values):\n    if set(values) <= {0, 1}:\n        return 'classification'\n    return 'regression'\n\nprint(task_type([0, 1, 1]), task_type([35.5, 41.2]))",
   "hints": [
    "<code>set(values) &lt;= {0, 1}</code> барлық мән 0 не 1 екенін тексереді."
   ],
   "check": {
    "tests": "assert task_type([0, 1, 1, 0]) == 'classification', \"task_type([0, 1, 1, 0]) 'classification' қайтаруы керек\"\nassert task_type([35.5, 41.2, 28.0]) == 'regression', \"Бағалар (35.5, 41.2, ...) үшін 'regression' керек\"\nassert task_type([1, 1, 1]) == 'classification', \"Тек бірліктер де — класс: 'classification'\"\nassert task_type([0, 1, 2]) == 'regression', \"0, 1, 2 мәндері үшін 'regression' (тек 0 мен 1 емес)\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Кесте өлшемі",
   "prompt": "<p><code>flats</code>-тен <code>flat_id</code> мен <code>price_mln</code>-нен басқа барлық бағанды <code>X</code>-ке алыңыз. Жолдар санын <code>n_samples</code>-ке, белгілер санын <code>n_features</code>-ке жазыңыз.</p><p>Кеңес: <code>X.shape</code> екі санды қайтарады.</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nX = flats.drop(columns=['flat_id', 'price_mln'])\nn_samples, n_features = X.shape\nprint(n_samples, n_features)",
   "hints": [
    "<code>flats.drop(columns=['flat_id', 'price_mln'])</code>",
    "<code>n_samples, n_features = X.shape</code>"
   ],
   "check": {
    "tests": "assert 'price_mln' not in X.columns and 'flat_id' not in X.columns, 'X-те price_mln және flat_id болмауы керек'\nassert n_samples == 400, 'n_samples = 400 болуы керек (жолдар саны)'\nassert n_features == 6, 'n_features = 6 болуы керек: 8 бағаннан екеуі алынады'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Тек сандық белгілер",
   "prompt": "<p>Модельге мәтін бағанын бірден беруге болмайды. <code>flats</code>-тен <b>сандық</b> бағандарды ғана алып, <code>flat_id</code> мен <code>price_mln</code>-ді алып тастаңыз. Нәтиже — <code>X_num</code> DataFrame. Бағандар тізімін <code>num_cols</code>-қа жазыңыз.</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nX_num = flats.select_dtypes('number').drop(columns=['flat_id', 'price_mln'])\nnum_cols = list(X_num.columns)\nprint(num_cols)",
   "hints": [
    "<code>flats.select_dtypes('number')</code> тек сандық бағандарды қалдырады.",
    "Сосын <code>.drop(columns=[...])</code>."
   ],
   "check": {
    "tests": "assert isinstance(X_num, pd.DataFrame) and len(X_num) == 400, 'X_num — 400 жолды DataFrame'\nassert 'district' not in X_num.columns, 'district мәтін бағаны: оны алмаңыз'\nassert set(num_cols) == {'rooms', 'area_m2', 'floor', 'floors_total', 'year_built'}, 'Сандық белгілер: rooms, area_m2, floor, floors_total, year_built'\nassert list(X_num.columns) == list(num_cols), 'num_cols = list(X_num.columns)'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Алматы абоненттері",
   "prompt": "<p>Тек Алматы абоненттерін алыңыз, <code>age</code> бос жолдарын алып тастаңыз (<code>dropna(subset=['age'])</code>). Олардан <code>X_alm</code> (<code>age</code>, <code>tenure_months</code>) және <code>y_alm</code> (<code>churned</code>) жасаңыз.</p>",
   "starter": "import pandas as pd\nchurn = pd.read_csv('churn.csv')\n",
   "solution": "import pandas as pd\nchurn = pd.read_csv('churn.csv')\nalm = churn[churn['city'] == 'Алматы'].dropna(subset=['age'])\nX_alm = alm[['age', 'tenure_months']]\ny_alm = alm['churned']\nprint(X_alm.shape, y_alm.mean())",
   "hints": [
    "Сүзгі: <code>churn[churn['city'] == 'Алматы']</code>",
    "<code>.dropna(subset=['age'])</code>"
   ],
   "check": {
    "tests": "_a = churn[churn['city'] == 'Алматы'].dropna(subset=['age'])\nassert list(X_alm.columns) == ['age', 'tenure_months'], 'X_alm бағандары: age, tenure_months'\nassert len(X_alm) == len(_a), f'X_alm-да {len(_a)} жол болуы керек: Алматы + age бос емес'\nassert not X_alm['age'].isna().any(), 'age-те бос мән қалмауы керек'\nassert list(y_alm.index) == list(X_alm.index), 'y_alm X_alm-мен бірдей жолдардан алынуы керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қолмен жазылған ереже",
   "prompt": "<p>ML-сіз ереже: «қолдау қызметіне кемінде 3 рет қоңырау шалса — кетеді». <code>pred_rule</code> (0/1 Series) жасап, ереженің дәлдігін (шын <code>churned</code>-пен сәйкес келу үлесі) <code>rule_acc</code>-қа жазыңыз.</p>",
   "starter": "import pandas as pd\nchurn = pd.read_csv('churn.csv')\n",
   "solution": "import pandas as pd\nchurn = pd.read_csv('churn.csv')\npred_rule = (churn['support_calls'] >= 3).astype(int)\nrule_acc = (pred_rule == churn['churned']).mean()\nprint(round(rule_acc, 3))",
   "hints": [
    "<code>(churn['support_calls'] >= 3).astype(int)</code>",
    "Сәйкестік үлесі: <code>(a == b).mean()</code>"
   ],
   "check": {
    "tests": "_r = (churn['support_calls'] >= 3).astype(int)\nassert len(pred_rule) == 600 and set(pred_rule.unique()) <= {0, 1}, 'pred_rule — 600 мәнді 0/1 Series'\nassert int(pred_rule.sum()) == int(_r.sum()), 'support_calls >= 3 болса 1, әйтпесе 0'\nassert abs(rule_acc - (_r == churn['churned']).mean()) < 1e-9, 'rule_acc = (pred_rule == churn[\"churned\"]).mean()'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ережені деректен табу",
   "prompt": "<p>Шекті қолмен емес, деректен таңдаңыз. <code>k</code> = 0, 1, …, 5 үшін «<code>support_calls &gt;= k</code> болса кетеді» ережесінің дәлдігін <code>accs</code> сөздігіне жазыңыз (кілт — <code>k</code>). Дәлдігі ең жоғары <code>k</code>-ны <code>best_k</code>-ға жазыңыз.</p><p>Бұл — ең қарапайым «үйрену»: модель параметрді мысалдардан таңдайды.</p>",
   "starter": "import pandas as pd\nchurn = pd.read_csv('churn.csv')\naccs = {}\n",
   "solution": "import pandas as pd\nchurn = pd.read_csv('churn.csv')\naccs = {}\nfor k in range(6):\n    pred = (churn['support_calls'] >= k).astype(int)\n    accs[k] = (pred == churn['churned']).mean()\nbest_k = max(accs, key=accs.get)\nprint(accs, best_k)",
   "hints": [
    "Цикл: <code>for k in range(6):</code>",
    "<code>max(accs, key=accs.get)</code>"
   ],
   "check": {
    "tests": "_acc = {_k: ((churn['support_calls'] >= _k).astype(int) == churn['churned']).mean() for _k in range(6)}\nassert sorted(accs) == [0, 1, 2, 3, 4, 5], 'accs кілттері: 0, 1, 2, 3, 4, 5'\nassert all(abs(accs[_k] - _acc[_k]) < 1e-9 for _k in _acc), 'Дәлдік дұрыс емес: (pred == churned).mean()'\nassert abs(accs[0] - (1 - churn['churned'].mean())) > 0.3, 'k = 0 болса бәрі «кетеді» деп болжанады'\nassert best_k == max(_acc, key=_acc.get), f'best_k = {max(_acc, key=_acc.get)} болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Шаршы метр бағасы",
   "prompt": "<p>Ең қарапайым «модель»: бір шаршы метрдің орташа бағасы. <code>rate</code> = барлық бағалар қосындысы / барлық аудандар қосындысы. <code>predict(area)</code> функциясы <code>rate * area</code> қайтарсын. Барлық пәтер бойынша орташа абсолютті қатені (|баға − болжам| орташасы) <code>mae_rule</code>-ға жазыңыз.</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nrate = None\n\ndef predict(area):\n    pass\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nrate = flats['price_mln'].sum() / flats['area_m2'].sum()\n\ndef predict(area):\n    return rate * area\n\nmae_rule = (flats['price_mln'] - predict(flats['area_m2'])).abs().mean()\nprint(round(rate, 3), round(mae_rule, 2))",
   "hints": [
    "<code>flats['price_mln'].sum() / flats['area_m2'].sum()</code>",
    "Функция Series-пен де жұмыс істейді: <code>predict(flats['area_m2'])</code>"
   ],
   "check": {
    "tests": "_rate = flats['price_mln'].sum() / flats['area_m2'].sum()\nassert rate is not None and abs(rate - _rate) < 1e-9, f'rate ≈ {_rate:.3f} болуы керек: бағалар қосындысы / аудандар қосындысы'\nassert abs(predict(60) - 60 * _rate) < 1e-9, 'predict(60) = rate * 60 болуы керек'\n_mae = (flats['price_mln'] - _rate * flats['area_m2']).abs().mean()\nassert abs(mae_rule - _mae) < 1e-6, f'mae_rule ≈ {_mae:.2f} болуы керек'"
   }
  }
 ],
 "ml-2": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бөлме санынан баға",
   "prompt": "<p><code>LinearRegression</code>-ды <code>model</code> атымен бөлме санынан (<code>rooms</code>) бағаға (<code>price_mln</code>) үйретіңіз. 3 бөлмелі пәтердің болжамды бағасын <code>pred3</code>-ке сан ретінде жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nX = flats[['rooms']]\ny = flats['price_mln']\nmodel = LinearRegression().fit(X, y)\npred3 = model.predict(pd.DataFrame({'rooms': [3]}))[0]\nprint(pred3)",
   "hints": [
    "<code>X = flats[['rooms']]</code> (екі жақша)",
    "<code>model.predict(pd.DataFrame({'rooms': [3]}))[0]</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_m = _LinR().fit(_f[['rooms']], _f['price_mln'])\n_p = _m.predict(_pd.DataFrame({'rooms': [3]}))[0]\nassert isinstance(model, LinearRegression) and hasattr(model, 'coef_'), 'model — үйретілген LinearRegression'\nassert model.n_features_in_ == 1, 'Тек бір белгі: rooms'\nassert abs(float(pred3) - _p) < 1e-6, f'pred3 ≈ {_p:.2f} болуы керек: predict(...)[0]'",
    "mustInclude": [
     "fit(",
     "predict("
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Көлбеулік пен бос мүше",
   "prompt": "<p>Ауданнан (<code>area_m2</code>) бағаға <code>LinearRegression</code> үйретіңіз. Коэффициентті <code>slope</code>-қа, бос мүшені <code>intercept</code>-ке жазыңыз. <code>slope</code> — 1 м² қосқанда баға қанша миллион теңгеге өседі.</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nmodel = LinearRegression().fit(flats[['area_m2']], flats['price_mln'])\nslope = model.coef_[0]\nintercept = model.intercept_\nprint(slope, intercept)",
   "hints": [
    "<code>model.coef_</code> — массив, бірінші элементін алыңыз.",
    "<code>model.intercept_</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_m = _LinR().fit(_f[['area_m2']], _f['price_mln'])\nassert abs(float(slope) - _m.coef_[0]) < 1e-6, f'slope ≈ {_m.coef_[0]:.3f} болуы керек: model.coef_[0]'\nassert abs(float(intercept) - _m.intercept_) < 1e-6, f'intercept ≈ {_m.intercept_:.2f} болуы керек: model.intercept_'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Балмұздақ сатылымы",
   "prompt": "<p>Алматыдағы дүкен: ауа температурасы (<code>temp</code>) мен сатылған балмұздақ саны (<code>sales</code>). <code>model</code>-ді үйретіп, 30°C болғандағы болжамды <code>pred30</code>-ға жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nshop = pd.DataFrame({'temp': [18, 22, 25, 28, 31, 35], 'sales': [460, 540, 600, 660, 720, 800]})\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nshop = pd.DataFrame({'temp': [18, 22, 25, 28, 31, 35], 'sales': [460, 540, 600, 660, 720, 800]})\nmodel = LinearRegression().fit(shop[['temp']], shop['sales'])\npred30 = model.predict(pd.DataFrame({'temp': [30]}))[0]\nprint(pred30)",
   "hints": [
    "<code>model.fit(shop[['temp']], shop['sales'])</code>",
    "<code>model.predict(pd.DataFrame({'temp': [30]}))[0]</code>"
   ],
   "check": {
    "tests": "assert hasattr(model, 'coef_'), 'model үйретілмеген: model.fit(...)'\nassert abs(float(pred30) - 700) < 1e-6, 'pred30 = 700 болуы керек: sales = 20 × temp + 100'",
    "mustInclude": [
     "fit(",
     "predict("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Үш пәтердің бағасы",
   "prompt": "<p><code>model</code>-ді <code>area_m2</code> және <code>rooms</code> белгілерімен үйретіңіз. Үш жаңа пәтер: (45 м², 1 бөлме), (70 м², 2), (95 м², 3). Олардың болжамды бағаларын бір <code>predict</code> шақыруымен <code>preds</code> массивіне жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nmodel = LinearRegression().fit(flats[['area_m2', 'rooms']], flats['price_mln'])\nnew = pd.DataFrame({'area_m2': [45, 70, 95], 'rooms': [1, 2, 3]})\npreds = model.predict(new)\nprint(preds)",
   "hints": [
    "Жаңа кесте: <code>pd.DataFrame({'area_m2': [45, 70, 95], 'rooms': [1, 2, 3]})</code>",
    "Бағандар үйретудегідей болсын."
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_m = _LinR().fit(_f[['area_m2', 'rooms']], _f['price_mln'])\n_p = _m.predict(_pd.DataFrame({'area_m2': [45, 70, 95], 'rooms': [1, 2, 3]}))\nassert model.n_features_in_ == 2, 'model екі белгімен үйретілуі керек: area_m2, rooms'\nassert len(preds) == 3, 'preds-те 3 болжам болуы керек'\nassert _np.allclose(preds, _p), f'preds ≈ {_np.round(_p, 2)} болуы керек. Бағандар реті: area_m2, rooms'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қай модель жақсы",
   "prompt": "<p>Екі модельді бүкіл деректе үйретіп, R²-ды <code>score</code> арқылы есептеңіз: тек <code>area_m2</code> → <code>r2_a</code>; <code>area_m2</code> + <code>year_built</code> → <code>r2_ay</code>. R² үлкені <code>'area'</code> болса оны, әйтпесе <code>'area_year'</code> мәтінін <code>better</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\ny = flats['price_mln']\nXa = flats[['area_m2']]\nXay = flats[['area_m2', 'year_built']]\nr2_a = LinearRegression().fit(Xa, y).score(Xa, y)\nr2_ay = LinearRegression().fit(Xay, y).score(Xay, y)\nbetter = 'area' if r2_a > r2_ay else 'area_year'\nprint(r2_a, r2_ay, better)",
   "hints": [
    "<code>LinearRegression().fit(X, y).score(X, y)</code>",
    "Шартты өрнек: <code>'area' if r2_a &gt; r2_ay else 'area_year'</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_y = _f['price_mln']\n_r1 = _LinR().fit(_f[['area_m2']], _y).score(_f[['area_m2']], _y)\n_r2 = _LinR().fit(_f[['area_m2', 'year_built']], _y).score(_f[['area_m2', 'year_built']], _y)\nassert abs(r2_a - _r1) < 1e-6, f'r2_a ≈ {_r1:.4f} болуы керек'\nassert abs(r2_ay - _r2) < 1e-6, f'r2_ay ≈ {_r2:.4f} болуы керек'\nassert better == ('area' if _r1 > _r2 else 'area_year'), 'better: R² үлкен модельдің аты'",
    "mustInclude": [
     "score("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең үлкен қате",
   "prompt": "<p><code>model</code>-ді <code>area_m2</code>, <code>rooms</code>, <code>year_built</code> белгілерімен бүкіл деректе үйретіңіз. Болжамдарды <code>flats['pred']</code> бағанына жазыңыз. Болжамы шын бағадан ең көп ауытқыған (абсолютті қате ең үлкен) пәтердің <code>flat_id</code>-ін <code>worst_id</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nX = flats[['area_m2', 'rooms', 'year_built']]\nmodel = LinearRegression().fit(X, flats['price_mln'])\nflats['pred'] = model.predict(X)\nerr = (flats['price_mln'] - flats['pred']).abs()\nworst_id = int(flats.loc[err.idxmax(), 'flat_id'])\nprint(worst_id, err.max())",
   "hints": [
    "Қате: <code>(flats['price_mln'] - flats['pred']).abs()</code>",
    "<code>err.idxmax()</code> жол индексін береді, сосын <code>flats.loc[..., 'flat_id']</code>."
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_X = _f[['area_m2', 'rooms', 'year_built']]\n_e = (_f['price_mln'] - _LinR().fit(_X, _f['price_mln']).predict(_X)).abs()\nassert 'pred' in flats.columns, \"flats['pred'] бағанын қосыңыз\"\nassert _np.allclose(flats['pred'], _f['price_mln'] - (_f['price_mln'] - flats['pred'])) and abs((flats['price_mln'] - flats['pred']).abs().max() - _e.max()) < 1e-6, 'pred — үш белгімен үйретілген модельдің болжамы'\nassert int(worst_id) == int(_f.loc[_e.idxmax(), 'flat_id']), f'worst_id = {int(_f.loc[_e.idxmax(), \"flat_id\"])} болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ең жақсы жалғыз белгі",
   "prompt": "<p><code>['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']</code> әр белгі үшін <b>жеке</b> <code>LinearRegression</code> үйретіп (бүкіл дерек), R²-ды <code>r2s</code> сөздігіне жазыңыз (кілт — баған аты). R² ең жоғары белгіні <code>best_feature</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\ncols = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\nr2s = {}\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\ncols = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\nr2s = {}\nfor c in cols:\n    X = flats[[c]]\n    r2s[c] = LinearRegression().fit(X, flats['price_mln']).score(X, flats['price_mln'])\nbest_feature = max(r2s, key=r2s.get)\nprint(r2s, best_feature)",
   "hints": [
    "Цикл ішінде: <code>X = flats[[c]]</code>",
    "<code>max(r2s, key=r2s.get)</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_r = {_c: _LinR().fit(_f[[_c]], _f['price_mln']).score(_f[[_c]], _f['price_mln']) for _c in ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']}\nassert set(r2s) == set(_r), 'r2s-те 5 белгі болуы керек'\nassert all(abs(r2s[_c] - _r[_c]) < 1e-6 for _c in _r), 'Әр белгінің R²-ы дұрыс емес: fit және score бір X-те'\nassert best_feature == max(_r, key=_r.get), f'best_feature = {max(_r, key=_r.get)} болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Арзан пәтерлер",
   "prompt": "<p><code>area_m2</code>, <code>rooms</code>, <code>year_built</code> бойынша бүкіл деректе модель үйретіп, әр пәтердің болжамын табыңыз. Бағасы болжамнан <b>10%-дан көп</b> төмен (<code>price_mln &lt; 0.9 * pred</code>) пәтерлер санын <code>n_bargain</code>-ға, ондай пәтер ең көп кездесетін ауданды <code>bargain_district</code>-ке жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nX = flats[['area_m2', 'rooms', 'year_built']]\nmodel = LinearRegression().fit(X, flats['price_mln'])\npred = model.predict(X)\ncheap = flats[flats['price_mln'] < 0.9 * pred]\nn_bargain = len(cheap)\nbargain_district = cheap['district'].value_counts().idxmax()\nprint(n_bargain, bargain_district)",
   "hints": [
    "Сүзгі: <code>flats[flats['price_mln'] &lt; 0.9 * pred]</code>",
    "<code>value_counts().idxmax()</code> ең жиі мәнді береді."
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_X = _f[['area_m2', 'rooms', 'year_built']]\n_p = _LinR().fit(_X, _f['price_mln']).predict(_X)\n_ch = _f[_f['price_mln'] < 0.9 * _p]\nassert int(n_bargain) == len(_ch), f'n_bargain = {len(_ch)} болуы керек: price_mln < 0.9 * pred'\nassert bargain_district == _ch['district'].value_counts().idxmax(), f'bargain_district = {_ch[\"district\"].value_counts().idxmax()} болуы керек'"
   }
  }
 ],
 "ml-3": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Төрттен бір тест",
   "prompt": "<p><code>X = flats[['area_m2']]</code>, <code>y = flats['price_mln']</code>. Оларды <code>test_size=0.25</code>, <code>random_state=1</code> арқылы <code>X_train, X_test, y_train, y_test</code>-ке бөліңіз. Өлшемдерін <code>n_train</code> мен <code>n_test</code>-ке жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nX = flats[['area_m2']]\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=1)\nn_train, n_test = len(X_train), len(X_test)\nprint(n_train, n_test)",
   "hints": [
    "<code>train_test_split(X, y, test_size=0.25, random_state=1)</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_a, _b, _c, _d = _tts(_f[['area_m2']], _f['price_mln'], test_size=0.25, random_state=1)\nassert (n_train, n_test) == (300, 100), 'n_train = 300, n_test = 100 болуы керек'\nassert list(X_test.index) == list(_b.index), 'Бөлу басқаша: random_state=1 қойдыңыз ба?'\nassert list(y_test.index) == list(X_test.index), 'Ретін тексеріңіз: X_train, X_test, y_train, y_test'",
    "mustInclude": [
     "train_test_split("
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бөлуді қайталау",
   "prompt": "<p>Бір деректі екі рет <code>random_state=7</code> арқылы бөліп (<code>test_size=0.2</code>), test индекстері бірдей ме — <code>same</code>-ге (bool) жазыңыз. Сосын <code>random_state=8</code>-мен бөліп, test индекстері 7-дегіден өзгеше ме — <code>differ</code>-ге жазыңыз. Бірінші бөлудің test бөлігін <code>X_test7</code> атымен сақтаңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nX = flats[['area_m2', 'rooms']]\ny = flats['price_mln']\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nX = flats[['area_m2', 'rooms']]\ny = flats['price_mln']\n_, X_test7, _, _ = train_test_split(X, y, test_size=0.2, random_state=7)\n_, X_again, _, _ = train_test_split(X, y, test_size=0.2, random_state=7)\n_, X_test8, _, _ = train_test_split(X, y, test_size=0.2, random_state=8)\nsame = list(X_test7.index) == list(X_again.index)\ndiffer = list(X_test7.index) != list(X_test8.index)\nprint(same, differ)",
   "hints": [
    "Керек емес бөліктерді <code>_</code> айнымалысына алуға болады.",
    "Индекстерді салыстыру: <code>list(a.index) == list(b.index)</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_a, _b, _c, _d = _tts(_f[['area_m2', 'rooms']], _f['price_mln'], test_size=0.2, random_state=7)\nassert list(X_test7.index) == list(_b.index), 'X_test7 — random_state=7, test_size=0.2 бөлуінің test бөлігі'\nassert same is True, 'Бірдей random_state бірдей бөлу береді: same = True'\nassert differ is True, 'Басқа random_state басқа бөлу береді: differ = True'",
    "mustInclude": [
     "train_test_split("
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Stratify және үлес",
   "prompt": "<p>Churn деректерін <code>test_size=0.2</code>, <code>random_state=0</code>, <code>stratify=y</code> арқылы бөліңіз. Train-дегі кету үлесін <code>train_rate</code>-ке, test-тегіні <code>test_rate</code>-ке жазыңыз. Олар бір-біріне өте жақын болуы керек.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nX = churn[['tenure_months', 'monthly_fee']]\ny = churn['churned']\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nX = churn[['tenure_months', 'monthly_fee']]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0, stratify=y)\ntrain_rate = y_train.mean()\ntest_rate = y_test.mean()\nprint(round(train_rate, 3), round(test_rate, 3))",
   "hints": [
    "<code>train_test_split(X, y, test_size=0.2, random_state=0, stratify=y)</code>"
   ],
   "check": {
    "tests": "from sklearn.model_selection import train_test_split as _tts\n_a, _b, _c, _d = _tts(X, y, test_size=0.2, random_state=0, stratify=y)\nassert len(y_test) == 120, 'test-те 120 абонент болуы керек (test_size=0.2)'\nassert abs(train_rate - _c.mean()) < 1e-9 and abs(test_rate - _d.mean()) < 1e-9, 'Үлестер: y_train.mean() және y_test.mean(). stratify=y қойдыңыз ба?'\nassert abs(train_rate - test_rate) < 0.01, 'stratify болса, үлестер бірдейге жуық'",
    "mustInclude": [
     "stratify"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Train мен test айырмасы",
   "prompt": "<p>Белгілер: <code>area_m2</code>, <code>rooms</code>, <code>year_built</code>, <code>floor</code>. <code>test_size=0.3</code>, <code>random_state=0</code> бөліп, <code>model</code>-ді train-де үйретіңіз. <code>gap = train_r2 - test_r2</code> есептеңіз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nX = flats[['area_m2', 'rooms', 'year_built', 'floor']]\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=0)\nmodel = LinearRegression().fit(X_train, y_train)\ntrain_r2 = model.score(X_train, y_train)\ntest_r2 = model.score(X_test, y_test)\ngap = train_r2 - test_r2\nprint(train_r2, test_r2, gap)",
   "hints": [
    "Модель: <code>LinearRegression().fit(X_train, y_train)</code>",
    "Екі R²: <code>model.score(X_train, y_train)</code>, <code>model.score(X_test, y_test)</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_a, _b, _c, _d = _tts(_f[['area_m2', 'rooms', 'year_built', 'floor']], _f['price_mln'], test_size=0.3, random_state=0)\n_m = _LinR().fit(_a, _c)\nassert abs(train_r2 - _m.score(_a, _c)) < 1e-6, 'train_r2 = model.score(X_train, y_train)'\nassert abs(test_r2 - _m.score(_b, _d)) < 1e-6, 'test_r2 дұрыс емес: модель тек train-де үйретілсін'\nassert abs(gap - (_m.score(_a, _c) - _m.score(_b, _d))) < 1e-6, 'gap = train_r2 - test_r2'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бөлудің кездейсоқтығы",
   "prompt": "<p>Бір модельдің test R²-ы бөлуге байланысты өзгереді. <code>random_state</code> = 0, 1, …, 9 үшін (<code>test_size=0.2</code>, белгілер <code>area_m2</code>, <code>rooms</code>, <code>year_built</code>) test R²-ды <code>scores</code> тізіміне жазыңыз. <code>spread = max(scores) - min(scores)</code>.</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nX = flats[['area_m2', 'rooms', 'year_built']]\ny = flats['price_mln']\nscores = []\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nX = flats[['area_m2', 'rooms', 'year_built']]\ny = flats['price_mln']\nscores = []\nfor rs in range(10):\n    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=rs)\n    scores.append(LinearRegression().fit(X_train, y_train).score(X_test, y_test))\nspread = max(scores) - min(scores)\nprint([round(s, 3) for s in scores], round(spread, 3))",
   "hints": [
    "<code>for rs in range(10):</code>",
    "Әр айналымда жаңа модель үйретіңіз."
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_s = []\nfor _rs in range(10):\n    _a, _b, _c, _d = _tts(_f[['area_m2', 'rooms', 'year_built']], _f['price_mln'], test_size=0.2, random_state=_rs)\n    _s.append(_LinR().fit(_a, _c).score(_b, _d))\nassert len(scores) == 10, 'scores-та 10 мән болуы керек'\nassert _np.allclose(scores, _s), 'Әр random_state үшін test R² дұрыс емес (ретін тексеріңіз: 0, 1, ..., 9)'\nassert abs(spread - (max(_s) - min(_s))) < 1e-9, 'spread = max(scores) - min(scores)'",
    "mustInclude": [
     "train_test_split("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қолмен бөлу",
   "prompt": "<p><code>train_test_split</code>-сіз бөліңіз: <code>flats.sample(frac=1, random_state=0)</code> арқылы жолдарды араластырып, алғашқы 320 жолды <code>train_df</code>-ке, қалған 80 жолды <code>test_df</code>-ке жазыңыз.</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nshuffled = flats.sample(frac=1, random_state=0)\ntrain_df = shuffled.iloc[:320]\ntest_df = shuffled.iloc[320:]\nprint(len(train_df), len(test_df))",
   "hints": [
    "<code>shuffled = flats.sample(frac=1, random_state=0)</code>",
    "<code>shuffled.iloc[:320]</code> және <code>shuffled.iloc[320:]</code>"
   ],
   "check": {
    "tests": "_s = pd.read_csv('flats.csv').sample(frac=1, random_state=0)\nassert len(train_df) == 320 and len(test_df) == 80, 'train_df — 320 жол, test_df — 80 жол'\nassert not set(train_df['flat_id']) & set(test_df['flat_id']), 'train_df пен test_df-те ортақ пәтер болмауы керек'\nassert list(test_df['flat_id']) == list(_s['flat_id'].iloc[320:]), 'Араластыру: flats.sample(frac=1, random_state=0), сосын iloc'",
    "mustInclude": [
     "sample("
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ескі және жаңа үйлер",
   "prompt": "<p>Модель жаңа жағдайға қаншалықты көшеді? <code>year_built &lt; 2000</code> пәтерлерде <code>area_m2</code>, <code>rooms</code> бойынша <code>model_old</code> үйретіп, <code>year_built &gt;= 2000</code> пәтерлердегі R²-ды <code>shift_r2</code>-ге жазыңыз. Салыстыру үшін кездейсоқ бөлудегі (<code>test_size=0.2</code>, <code>random_state=42</code>, сол белгілер) test R²-ды <code>rand_r2</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\ncols = ['area_m2', 'rooms']\nold = flats[flats['year_built'] < 2000]\nnew = flats[flats['year_built'] >= 2000]\nmodel_old = LinearRegression().fit(old[cols], old['price_mln'])\nshift_r2 = model_old.score(new[cols], new['price_mln'])\nX_train, X_test, y_train, y_test = train_test_split(flats[cols], flats['price_mln'], test_size=0.2, random_state=42)\nrand_r2 = LinearRegression().fit(X_train, y_train).score(X_test, y_test)\nprint(round(shift_r2, 3), round(rand_r2, 3))",
   "hints": [
    "Екі сүзгі: <code>flats[flats['year_built'] &lt; 2000]</code> және <code>&gt;= 2000</code>.",
    "<code>model_old.score(new[cols], new['price_mln'])</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_o = _f[_f['year_built'] < 2000]\n_n = _f[_f['year_built'] >= 2000]\n_c2 = ['area_m2', 'rooms']\n_sr = _LinR().fit(_o[_c2], _o['price_mln']).score(_n[_c2], _n['price_mln'])\n_a, _b, _c, _d = _tts(_f[_c2], _f['price_mln'], test_size=0.2, random_state=42)\n_rr = _LinR().fit(_a, _c).score(_b, _d)\nassert model_old.n_features_in_ == 2, 'model_old белгілері: area_m2, rooms'\nassert abs(shift_r2 - _sr) < 1e-6, f'shift_r2 ≈ {_sr:.3f} болуы керек: ескі үйлерде үйретіп, жаңаларында бағалаңыз'\nassert abs(rand_r2 - _rr) < 1e-6, f'rand_r2 ≈ {_rr:.3f} болуы керек'\nassert shift_r2 < rand_r2, 'Жаңа үйлерге көшкенде сапа төмендеуі керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Validation жиыны",
   "prompt": "<p>Белгілер жиынын test-ке қарамай таңдаңыз. Алдымен <code>test_size=0.2</code>, <code>random_state=0</code> арқылы <code>X_rest</code>/<code>X_test</code> бөліңіз, сосын <code>X_rest</code>-ті <code>test_size=0.25</code>, <code>random_state=0</code> арқылы <code>X_train</code>/<code>X_val</code>-ға бөліңіз. <code>sets</code> әр жиыны үшін train-де үйретілген модельдің validation R²-ын <code>val_scores</code>-қа жазыңыз. Ең жақсысын <code>best_set</code>-ке, оның test R²-ын (модель тек <code>X_train</code>-де) <code>test_r2</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nsets = {'area': ['area_m2'], 'area_rooms': ['area_m2', 'rooms'], 'five': ['area_m2', 'rooms', 'year_built', 'floor', 'floors_total']}\nX = flats[sets['five']]\ny = flats['price_mln']\nval_scores = {}\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nsets = {'area': ['area_m2'], 'area_rooms': ['area_m2', 'rooms'], 'five': ['area_m2', 'rooms', 'year_built', 'floor', 'floors_total']}\nX = flats[sets['five']]\ny = flats['price_mln']\nval_scores = {}\nX_rest, X_test, y_rest, y_test = train_test_split(X, y, test_size=0.2, random_state=0)\nX_train, X_val, y_train, y_val = train_test_split(X_rest, y_rest, test_size=0.25, random_state=0)\nfor name, cols in sets.items():\n    m = LinearRegression().fit(X_train[cols], y_train)\n    val_scores[name] = m.score(X_val[cols], y_val)\nbest_set = max(val_scores, key=val_scores.get)\ncols = sets[best_set]\ntest_r2 = LinearRegression().fit(X_train[cols], y_train).score(X_test[cols], y_test)\nprint(val_scores, best_set, round(test_r2, 3))",
   "hints": [
    "Екі рет бөлу: алдымен test, сосын қалғанынан validation.",
    "Цикл: <code>for name, cols in sets.items():</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_X = _f[sets['five']]\n_Xr, _Xt, _yr, _yt = _tts(_X, _f['price_mln'], test_size=0.2, random_state=0)\n_Xa, _Xv, _ya, _yv = _tts(_Xr, _yr, test_size=0.25, random_state=0)\n_v = {_k: _LinR().fit(_Xa[_cc], _ya).score(_Xv[_cc], _yv) for _k, _cc in sets.items()}\n_b = max(_v, key=_v.get)\nassert len(X_val) == 80 and len(X_train) == 240, 'X_train — 240, X_val — 80 жол болуы керек'\nassert set(val_scores) == set(sets) and all(abs(val_scores[_k] - _v[_k]) < 1e-6 for _k in _v), 'val_scores: train-де үйретіп, X_val-да бағалаңыз'\nassert best_set == _b, f'best_set = {_b} болуы керек'\nassert abs(test_r2 - _LinR().fit(_Xa[sets[_b]], _ya).score(_Xt[sets[_b]], _yt)) < 1e-6, 'test_r2: таңдалған жиынмен X_train-де үйретіп, X_test-те бір рет бағалаңыз'",
    "mustInclude": [
     "train_test_split("
    ]
   }
  }
 ],
 "ml-4": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "MAE функциясы",
   "prompt": "<p><code>mae(y_true, y_pred)</code> функциясын NumPy-мен жазыңыз: абсолютті қателердің орташасы.</p><p>Мысалы, <code>mae([10, 20], [12, 17])</code> → <code>2.5</code>.</p>",
   "starter": "import numpy as np\n\ndef mae(y_true, y_pred):\n    pass\n",
   "solution": "import numpy as np\n\ndef mae(y_true, y_pred):\n    err = np.asarray(y_pred) - np.asarray(y_true)\n    return float(np.mean(np.abs(err)))\n\nprint(mae([10, 20], [12, 17]))",
   "hints": [
    "<code>np.asarray(...)</code> тізімді массивке айналдырады.",
    "<code>np.mean(np.abs(err))</code>"
   ],
   "check": {
    "tests": "assert mae([10, 20], [12, 17]) is not None and abs(mae([10, 20], [12, 17]) - 2.5) < 1e-9, 'mae([10, 20], [12, 17]) 2.5 қайтаруы керек'\nassert abs(mae([5, 5, 5], [5, 5, 5])) < 1e-9, 'Қате жоқ болса, 0'\nassert abs(mae([0, 0, 0, 0], [1, -1, 3, -3]) - 2.0) < 1e-9, 'Теріс қателер де абсолютті мәнмен: 2.0'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "RMSE функциясы",
   "prompt": "<p><code>rmse(y_true, y_pred)</code> функциясын жазыңыз: квадрат қателердің орташасынан түбір.</p><p>Мысалы, <code>rmse([0, 0], [3, 4])</code> → <code>√12.5 ≈ 3.536</code>.</p>",
   "starter": "import numpy as np\n\ndef rmse(y_true, y_pred):\n    pass\n",
   "solution": "import numpy as np\n\ndef rmse(y_true, y_pred):\n    err = np.asarray(y_pred) - np.asarray(y_true)\n    return float(np.sqrt(np.mean(err ** 2)))\n\nprint(rmse([0, 0], [3, 4]))",
   "hints": [
    "<code>err ** 2</code> — квадраттар.",
    "<code>np.sqrt(np.mean(...))</code>"
   ],
   "check": {
    "tests": "assert rmse([0, 0], [3, 4]) is not None and abs(rmse([0, 0], [3, 4]) - 12.5 ** 0.5) < 1e-9, 'rmse([0, 0], [3, 4]) ≈ 3.536 болуы керек'\nassert abs(rmse([1, 2, 3], [1, 2, 3])) < 1e-9, 'Қате жоқ болса, 0'\nassert abs(rmse([10, 10], [12, 8]) - 2.0) < 1e-9, 'rmse([10, 10], [12, 8]) = 2.0'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "R² функциясы",
   "prompt": "<p><code>r2(y_true, y_pred)</code> функциясын жазыңыз: <code>1 − SS_res / SS_tot</code>, мұнда <code>SS_res</code> — квадрат қателер қосындысы, <code>SS_tot</code> — <code>y_true</code>-дың орташасынан квадрат ауытқулар қосындысы.</p><p>Мысалы, <code>r2([1, 2, 3], [1, 2, 3])</code> → <code>1.0</code>.</p>",
   "starter": "import numpy as np\n\ndef r2(y_true, y_pred):\n    pass\n",
   "solution": "import numpy as np\n\ndef r2(y_true, y_pred):\n    y_true = np.asarray(y_true, dtype=float)\n    y_pred = np.asarray(y_pred, dtype=float)\n    ss_res = np.sum((y_true - y_pred) ** 2)\n    ss_tot = np.sum((y_true - y_true.mean()) ** 2)\n    return float(1 - ss_res / ss_tot)\n\nprint(r2([1, 2, 3], [1, 2, 3]), r2([1, 2, 3], [2, 2, 2]))",
   "hints": [
    "<code>ss_res = np.sum((y_true - y_pred) ** 2)</code>",
    "<code>ss_tot = np.sum((y_true - y_true.mean()) ** 2)</code>"
   ],
   "check": {
    "tests": "assert r2([1, 2, 3], [1, 2, 3]) is not None and abs(r2([1, 2, 3], [1, 2, 3]) - 1) < 1e-9, 'Мінсіз болжам: R² = 1'\nassert abs(r2([1, 2, 3], [2, 2, 2])) < 1e-9, 'Орташаны болжау: R² = 0'\nassert abs(r2([3, 5, 7, 9], [4, 5, 6, 10]) - 0.85) < 1e-9, 'r2([3, 5, 7, 9], [4, 5, 6, 10]) = 0.85'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Коэффициенттер кестесі",
   "prompt": "<p>Бөлу дайын. <code>model</code>-ді train-де үйретіп, коэффициенттерді баған аттарымен <code>coefs</code> Series-ке жазыңыз (<code>pd.Series(model.coef_, index=X.columns)</code>). Бір бөлме қосылғанда (аудан тұрақты) баға қалай өзгереді — <code>rooms_effect</code>-ке жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nX = flats[['area_m2', 'rooms', 'year_built']]\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nX = flats[['area_m2', 'rooms', 'year_built']]\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\nmodel = LinearRegression().fit(X_train, y_train)\ncoefs = pd.Series(model.coef_, index=X.columns)\nrooms_effect = coefs['rooms']\nprint(coefs)",
   "hints": [
    "<code>pd.Series(model.coef_, index=X.columns)</code>",
    "<code>coefs['rooms']</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_a, _b, _c, _d = _tts(_f[['area_m2', 'rooms', 'year_built']], _f['price_mln'], test_size=0.2, random_state=42)\n_m = _LinR().fit(_a, _c)\nassert isinstance(coefs, pd.Series) and list(coefs.index) == ['area_m2', 'rooms', 'year_built'], 'coefs индексі — X-тің баған аттары'\nassert _np.allclose(coefs.values, _m.coef_), 'coefs мәндері — train-де үйретілген модельдің coef_'\nassert abs(rooms_effect - _m.coef_[1]) < 1e-9, \"rooms_effect = coefs['rooms']\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Орташамен болжау",
   "prompt": "<p>Baseline: әр test пәтерге train бағаларының орташасын болжаңыз, оның MAE-ін <code>base_mae</code>-ге жазыңыз. Сосын <code>LinearRegression</code> (train-де) MAE-ін <code>model_mae</code>-ге жазыңыз. <code>gain = base_mae - model_mae</code>.</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nimport numpy as np\nfrom sklearn.metrics import mean_absolute_error\nX = flats[['area_m2', 'rooms', 'year_built']]\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nimport numpy as np\nfrom sklearn.metrics import mean_absolute_error\nX = flats[['area_m2', 'rooms', 'year_built']]\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\nbase_pred = np.full(len(y_test), y_train.mean())\nbase_mae = mean_absolute_error(y_test, base_pred)\nmodel = LinearRegression().fit(X_train, y_train)\nmodel_mae = mean_absolute_error(y_test, model.predict(X_test))\ngain = base_mae - model_mae\nprint(round(base_mae, 2), round(model_mae, 2), round(gain, 2))",
   "hints": [
    "<code>np.full(len(y_test), y_train.mean())</code>",
    "<code>mean_absolute_error(y_test, pred)</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_a, _b, _c, _d = _tts(_f[['area_m2', 'rooms', 'year_built']], _f['price_mln'], test_size=0.2, random_state=42)\n_bm = _np.mean(_np.abs(_d - _c.mean()))\n_mm = _np.mean(_np.abs(_d - _LinR().fit(_a, _c).predict(_b)))\nassert abs(base_mae - _bm) < 1e-6, f'base_mae ≈ {_bm:.2f} болуы керек: y_train.mean() болжамы (y_test емес!)'\nassert abs(model_mae - _mm) < 1e-6, f'model_mae ≈ {_mm:.2f} болуы керек'\nassert abs(gain - (_bm - _mm)) < 1e-6 and gain > 0, 'gain = base_mae - model_mae (оң сан)'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Он жылдың әсері",
   "prompt": "<p><code>area_m2</code> және <code>year_built</code> бойынша бүкіл деректе <code>model</code> үйретіңіз. Үй 10 жыл жаңа болса (аудан тұрақты), баға қаншаға өзгереді — <code>delta_10y = 10 * coef_year</code>. Тексеру үшін 60 м² пәтердің 2020 және 2010 жылғы болжамдарының айырмасын <code>diff_pred</code>-ке жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nmodel = LinearRegression().fit(flats[['area_m2', 'year_built']], flats['price_mln'])\ncoef_year = model.coef_[1]\ndelta_10y = 10 * coef_year\nnew = pd.DataFrame({'area_m2': [60, 60], 'year_built': [2020, 2010]})\np = model.predict(new)\ndiff_pred = p[0] - p[1]\nprint(round(delta_10y, 3), round(diff_pred, 3))",
   "hints": [
    "<code>model.coef_[1]</code> — year_built коэффициенті.",
    "Екі жолды кесте: <code>pd.DataFrame({'area_m2': [60, 60], 'year_built': [2020, 2010]})</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_m = _LinR().fit(_f[['area_m2', 'year_built']], _f['price_mln'])\nassert abs(delta_10y - 10 * _m.coef_[1]) < 1e-6, f'delta_10y ≈ {10 * _m.coef_[1]:.3f} болуы керек: 10 * coef_[1]'\nassert abs(diff_pred - 10 * _m.coef_[1]) < 1e-6, 'diff_pred = болжам(2020) − болжам(2010), ол delta_10y-ке тең'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Метрикалар есебі",
   "prompt": "<p><code>report(y_true, y_pred)</code> функциясын sklearn-сіз жазыңыз. Ол <code>{'mae': ..., 'rmse': ..., 'r2': ...}</code> сөздігін қайтарсын.</p><p>Мысалы, <code>report([3, 5, 7, 9], [4, 5, 6, 10])['r2']</code> → <code>0.85</code>.</p>",
   "starter": "import numpy as np\n\ndef report(y_true, y_pred):\n    pass\n",
   "solution": "import numpy as np\n\ndef report(y_true, y_pred):\n    t = np.asarray(y_true, dtype=float)\n    p = np.asarray(y_pred, dtype=float)\n    e = p - t\n    return {'mae': float(np.mean(np.abs(e))), 'rmse': float(np.sqrt(np.mean(e ** 2))), 'r2': float(1 - np.sum(e ** 2) / np.sum((t - t.mean()) ** 2))}\n\nprint(report([3, 5, 7, 9], [4, 5, 6, 10]))",
   "hints": [
    "Алдымен <code>np.asarray(..., dtype=float)</code>.",
    "Үш формула: MAE, RMSE, 1 − SS_res/SS_tot."
   ],
   "check": {
    "tests": "from sklearn.metrics import mean_absolute_error as _ma, mean_squared_error as _ms, r2_score as _r2\n_r = report([3, 5, 7, 9], [4, 5, 6, 10])\nassert isinstance(_r, dict) and set(_r) == {'mae', 'rmse', 'r2'}, \"Сөздік қайтарыңыз: 'mae', 'rmse', 'r2' кілттері\"\nassert abs(_r['mae'] - 0.75) < 1e-9 and abs(_r['rmse'] - 0.75 ** 0.5) < 1e-9, 'report([3, 5, 7, 9], [4, 5, 6, 10]): mae = 0.75, rmse ≈ 0.866'\nassert abs(_r['r2'] - 0.85) < 1e-9, 'r2 = 0.85 болуы керек'\n_t, _p = [30, 42, 55, 61, 80], [33, 40, 50, 66, 78]\n_q = report(_t, _p)\nassert abs(_q['mae'] - _ma(_t, _p)) < 1e-9 and abs(_q['rmse'] - _ms(_t, _p) ** 0.5) < 1e-9 and abs(_q['r2'] - _r2(_t, _p)) < 1e-9, 'Нәтиже sklearn метрикаларымен сәйкес келмейді'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Бөлме бойынша қате",
   "prompt": "<p>Бөлу дайын. Модельді train-де үйретіп, test-тегі әр пәтердің абсолютті қатесін табыңыз. Бөлме саны (<code>rooms</code>) бойынша орташа абсолютті қатені <code>mae_by_rooms</code> Series-ке жазыңыз (индекс — бөлме саны). Қатесі ең үлкен бөлме санын <code>worst_rooms</code>-қа жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nX = flats[['area_m2', 'rooms', 'year_built']]\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nX = flats[['area_m2', 'rooms', 'year_built']]\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\nmodel = LinearRegression().fit(X_train, y_train)\nres = X_test.copy()\nres['err'] = (y_test - model.predict(X_test)).abs()\nmae_by_rooms = res.groupby('rooms')['err'].mean()\nworst_rooms = mae_by_rooms.idxmax()\nprint(mae_by_rooms.round(2), worst_rooms)",
   "hints": [
    "Қатені бағанға қосыңыз: <code>res = X_test.copy()</code>, <code>res['err'] = ...</code>",
    "<code>res.groupby('rooms')['err'].mean()</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_a, _b, _c, _d = _tts(_f[['area_m2', 'rooms', 'year_built']], _f['price_mln'], test_size=0.2, random_state=42)\n_e = _b.copy()\n_e['err'] = (_d - _LinR().fit(_a, _c).predict(_b)).abs()\n_g = _e.groupby('rooms')['err'].mean()\nassert isinstance(mae_by_rooms, pd.Series) and list(mae_by_rooms.index) == list(_g.index), 'mae_by_rooms индексі — test-тегі бөлме сандары'\nassert _np.allclose(mae_by_rooms.values, _g.values), 'Орташа абсолютті қате дұрыс емес: тек test деректе'\nassert worst_rooms == _g.idxmax(), f'worst_rooms = {_g.idxmax()} болуы керек'"
   }
  }
 ],
 "ml-5": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Аудандар саны",
   "prompt": "<p><code>pd.get_dummies(flats['district'], dtype=int)</code> арқылы <code>d</code> кестесін жасаңыз. Аудандар санын <code>n_districts</code>-ке жазыңыз. Әр жолдың қосындысы 1 екенін тексеріп, <code>one_per_row</code>-ға (bool) жазыңыз.</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nd = pd.get_dummies(flats['district'], dtype=int)\nn_districts = d.shape[1]\none_per_row = bool((d.sum(axis=1) == 1).all())\nprint(n_districts, one_per_row)",
   "hints": [
    "<code>d.shape[1]</code> — бағандар саны.",
    "<code>(d.sum(axis=1) == 1).all()</code>"
   ],
   "check": {
    "tests": "assert d.shape == (400, flats['district'].nunique()), 'd — әр ауданға бір баған'\nassert n_districts == flats['district'].nunique(), f'n_districts = {flats[\"district\"].nunique()} болуы керек'\nassert one_per_row is True, 'Әр пәтер дәл бір ауданда: one_per_row = True'",
    "mustInclude": [
     "get_dummies("
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Тарифті кодтау",
   "prompt": "<p><code>churn[['monthly_fee', 'plan']]</code>-ты <code>pd.get_dummies</code> арқылы кодтаңыз: <code>columns=['plan']</code>, <code>drop_first=True</code>, <code>dtype=int</code>. Нәтиже — <code>Xp</code>, бағандар тізімі — <code>cols</code>.</p>",
   "starter": "import pandas as pd\nchurn = pd.read_csv('churn.csv')\n",
   "solution": "import pandas as pd\nchurn = pd.read_csv('churn.csv')\nXp = pd.get_dummies(churn[['monthly_fee', 'plan']], columns=['plan'], drop_first=True, dtype=int)\ncols = list(Xp.columns)\nprint(cols)",
   "hints": [
    "<code>pd.get_dummies(..., columns=['plan'], drop_first=True, dtype=int)</code>"
   ],
   "check": {
    "tests": "assert 'plan' not in Xp.columns, 'plan мәтін бағаны қалмауы керек'\nassert cols == ['monthly_fee', 'plan_premium', 'plan_standard'], 'Бағандар: monthly_fee, plan_premium, plan_standard (basic алынып тасталады)'\nassert Xp.shape == (600, 3), 'Xp пішіні (600, 3)'",
    "mustInclude": [
     "get_dummies("
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Мектептер кестесі",
   "prompt": "<p>Мектептер кестесіндегі <code>city</code> бағанын <code>pd.get_dummies(schools, columns=['city'], dtype=int)</code> арқылы кодтап, <code>enc</code>-ке жазыңыз. Алматыдағы мектептер санын <code>city_Алматы</code> бағанынан <code>n_almaty</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\nschools = pd.DataFrame({'city': ['Алматы', 'Астана', 'Шымкент', 'Алматы', 'Астана', 'Алматы'], 'students': [820, 640, 910, 450, 700, 1020]})\n",
   "solution": "import pandas as pd\nschools = pd.DataFrame({'city': ['Алматы', 'Астана', 'Шымкент', 'Алматы', 'Астана', 'Алматы'], 'students': [820, 640, 910, 450, 700, 1020]})\nenc = pd.get_dummies(schools, columns=['city'], dtype=int)\nn_almaty = int(enc['city_Алматы'].sum())\nprint(enc, n_almaty)",
   "hints": [
    "<code>enc['city_Алматы'].sum()</code>"
   ],
   "check": {
    "tests": "assert list(enc.columns) == ['students', 'city_Алматы', 'city_Астана', 'city_Шымкент'], 'enc бағандары: students және үш city_ баған'\nassert n_almaty == 3, 'Алматыда 3 мектеп: n_almaty = 3'",
    "mustInclude": [
     "get_dummies("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең қымбат аудан",
   "prompt": "<p><code>X</code> дайын (one-hot, <code>drop_first=True</code>, базалық аудан — Алатау). <code>model</code>-ді бүкіл деректе үйретіп, тек <code>district_</code> бағандарының коэффициенттерін <code>dcoef</code> Series-ке жазыңыз (индекс — баған аты). Коэффициенті ең үлкен бағанды <code>top_district</code>-ке жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nX = pd.get_dummies(flats[['area_m2', 'year_built', 'district']], columns=['district'], drop_first=True, dtype=int)\ny = flats['price_mln']\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nX = pd.get_dummies(flats[['area_m2', 'year_built', 'district']], columns=['district'], drop_first=True, dtype=int)\ny = flats['price_mln']\nmodel = LinearRegression().fit(X, y)\ncoefs = pd.Series(model.coef_, index=X.columns)\ndcoef = coefs[[c for c in X.columns if c.startswith('district_')]]\ntop_district = dcoef.idxmax()\nprint(dcoef.round(2), top_district)",
   "hints": [
    "<code>coefs = pd.Series(model.coef_, index=X.columns)</code>",
    "<code>c.startswith('district_')</code> арқылы сүзіңіз."
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_X = _pd.get_dummies(_f[['area_m2', 'year_built', 'district']], columns=['district'], drop_first=True, dtype=int)\n_s = _pd.Series(_LinR().fit(_X, _f['price_mln']).coef_, index=_X.columns)\n_s = _s[[_c for _c in _X.columns if _c.startswith('district_')]]\nassert isinstance(dcoef, pd.Series) and len(dcoef) == len(_s), f'dcoef-те {len(_s)} district_ бағаны болуы керек'\nassert _np.allclose(dcoef.loc[_s.index].values, _s.values), 'Коэффициенттер дұрыс емес: бүкіл X, y-де үйретіңіз'\nassert top_district == _s.idxmax(), f'top_district = {_s.idxmax()} болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Екі категориялық баған",
   "prompt": "<p><code>churn</code>-нің <code>tenure_months</code>, <code>monthly_fee</code>, <code>city</code>, <code>plan</code> бағандарынан <code>X</code> жасаңыз: <code>city</code> мен <code>plan</code> бірге кодталсын (<code>drop_first=True</code>, <code>dtype=int</code>). <code>X.shape</code>-ті <code>shape</code>-ке жазыңыз.</p>",
   "starter": "import pandas as pd\nchurn = pd.read_csv('churn.csv')\n",
   "solution": "import pandas as pd\nchurn = pd.read_csv('churn.csv')\nX = pd.get_dummies(churn[['tenure_months', 'monthly_fee', 'city', 'plan']], columns=['city', 'plan'], drop_first=True, dtype=int)\nshape = X.shape\nprint(shape, list(X.columns))",
   "hints": [
    "<code>columns=['city', 'plan']</code> — екі бағанды бірге."
   ],
   "check": {
    "tests": "assert 'city' not in X.columns and 'plan' not in X.columns, 'city мен plan мәтін бағандары қалмауы керек'\nassert X.shape == (600, 8), f'X пішіні (600, 8) болуы керек: 2 сан + 4 қала + 2 тариф. Сізде {X.shape}'\nassert shape == X.shape, 'shape = X.shape'\nassert 'city_Алматы' not in X.columns, 'drop_first=True: әліпби бойынша бірінші қала (Алматы) алынып тасталуы керек'",
    "mustInclude": [
     "get_dummies("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жаңа пәтер бағасы",
   "prompt": "<p><code>model</code> one-hot <code>X</code>-те үйретілген. Медеу ауданындағы 70 м², 2015 жылғы пәтердің бағасын болжаңыз: жаңа жолды да <code>get_dummies</code>-пен кодтап, <code>.reindex(columns=X.columns, fill_value=0)</code> арқылы бағандарды теңестіріңіз. Нәтиже — <code>pred_new</code> (сан).</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nX = pd.get_dummies(flats[['area_m2', 'year_built', 'district']], columns=['district'], drop_first=True, dtype=int)\ny = flats['price_mln']\nmodel = LinearRegression().fit(X, y)\nnew = pd.DataFrame({'area_m2': [70], 'year_built': [2015], 'district': ['Медеу']})\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nX = pd.get_dummies(flats[['area_m2', 'year_built', 'district']], columns=['district'], drop_first=True, dtype=int)\ny = flats['price_mln']\nmodel = LinearRegression().fit(X, y)\nnew = pd.DataFrame({'area_m2': [70], 'year_built': [2015], 'district': ['Медеу']})\nnew_X = pd.get_dummies(new, columns=['district'], dtype=int).reindex(columns=X.columns, fill_value=0)\npred_new = model.predict(new_X)[0]\nprint(round(pred_new, 2))",
   "hints": [
    "Бір жолды get_dummies тек бір баған береді, сондықтан <code>reindex(columns=X.columns, fill_value=0)</code> керек."
   ],
   "check": {
    "tests": "_row = {c: 0 for c in X.columns}\n_row.update({'area_m2': 70, 'year_built': 2015, 'district_Медеу': 1})\n_p = model.predict(pd.DataFrame([_row])[list(X.columns)])[0]\nassert abs(float(pred_new) - _p) < 1e-6, f'pred_new ≈ {_p:.2f} болуы керек. district_Медеу = 1, қалған district_ бағандары 0 ме?'",
    "mustInclude": [
     "reindex("
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Аудан белгісінің пайдасы",
   "prompt": "<p>Екі модельді салыстырыңыз (бөлу: <code>test_size=0.2</code>, <code>random_state=42</code>): (1) <code>area_m2</code>, <code>rooms</code>, <code>year_built</code> → test R² <code>r2_without</code>; (2) сол белгілер + one-hot <code>district</code> (<code>drop_first=True</code>, <code>dtype=int</code>) → <code>r2_with</code>. <code>gain = r2_with - r2_without</code>.</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\ny = flats['price_mln']\nX1 = flats[['area_m2', 'rooms', 'year_built']]\nX2 = pd.get_dummies(flats[['area_m2', 'rooms', 'year_built', 'district']], columns=['district'], drop_first=True, dtype=int)\nr2s = []\nfor X in [X1, X2]:\n    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n    r2s.append(LinearRegression().fit(X_train, y_train).score(X_test, y_test))\nr2_without, r2_with = r2s\ngain = r2_with - r2_without\nprint(round(r2_without, 3), round(r2_with, 3), round(gain, 3))",
   "hints": [
    "Екі X үшін бірдей бөлу: <code>random_state=42</code>.",
    "Цикл немесе екі бөлек блок жазуға болады."
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_y = _f['price_mln']\n_X2 = _pd.get_dummies(_f[['area_m2', 'rooms', 'year_built', 'district']], columns=['district'], drop_first=True, dtype=int)\n_r = []\nfor _X in [_f[['area_m2', 'rooms', 'year_built']], _X2]:\n    _a, _b, _c, _d = _tts(_X, _y, test_size=0.2, random_state=42)\n    _r.append(_LinR().fit(_a, _c).score(_b, _d))\nassert abs(r2_without - _r[0]) < 1e-6, f'r2_without ≈ {_r[0]:.3f} болуы керек'\nassert abs(r2_with - _r[1]) < 1e-6, f'r2_with ≈ {_r[1]:.3f} болуы керек: district one-hot, drop_first=True'\nassert abs(gain - (_r[1] - _r[0])) < 1e-9 and gain > 0, 'gain = r2_with - r2_without (оң)'",
    "mustInclude": [
     "get_dummies("
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Нөмірмен кодтау қатесі",
   "prompt": "<p>Ауданды бір санмен кодтау (<code>flats['district'].astype('category').cat.codes</code>) модельге «реттілік» деген жалған ақпарат береді. <code>X_codes</code> (<code>area_m2</code>, <code>year_built</code>, <code>district_code</code>) және <code>X_onehot</code> (<code>area_m2</code>, <code>year_built</code> + one-hot, <code>drop_first=True</code>) жасаңыз. Бөлу <code>test_size=0.2</code>, <code>random_state=42</code>. Test R²: <code>r2_codes</code>, <code>r2_onehot</code>.</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\ny = flats['price_mln']\nX_codes = flats[['area_m2', 'year_built']].copy()\nX_codes['district_code'] = flats['district'].astype('category').cat.codes\nX_onehot = pd.get_dummies(flats[['area_m2', 'year_built', 'district']], columns=['district'], drop_first=True, dtype=int)\n\ndef test_r2(X):\n    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n    return LinearRegression().fit(X_train, y_train).score(X_test, y_test)\n\nr2_codes = test_r2(X_codes)\nr2_onehot = test_r2(X_onehot)\nprint(round(r2_codes, 3), round(r2_onehot, 3))",
   "hints": [
    "<code>X_codes = flats[['area_m2', 'year_built']].copy()</code>, сосын жаңа баған.",
    "Қайталанатын кодқа функция жазыңыз: <code>def test_r2(X): ...</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_y = _f['price_mln']\n_Xc = _f[['area_m2', 'year_built']].copy()\n_Xc['district_code'] = _f['district'].astype('category').cat.codes\n_Xo = _pd.get_dummies(_f[['area_m2', 'year_built', 'district']], columns=['district'], drop_first=True, dtype=int)\ndef _t(_X):\n    _a, _b, _c, _d = _tts(_X, _y, test_size=0.2, random_state=42)\n    return _LinR().fit(_a, _c).score(_b, _d)\nassert list(X_codes.columns) == ['area_m2', 'year_built', 'district_code'], 'X_codes бағандары: area_m2, year_built, district_code'\nassert abs(r2_codes - _t(_Xc)) < 1e-6, f'r2_codes ≈ {_t(_Xc):.3f} болуы керек'\nassert abs(r2_onehot - _t(_Xo)) < 1e-6, f'r2_onehot ≈ {_t(_Xo):.3f} болуы керек'\nassert r2_onehot > r2_codes + 0.05, 'One-hot нөмірмен кодтаудан айқын жақсы болуы керек'",
    "mustInclude": [
     "cat.codes"
    ]
   }
  }
 ],
 "ml-6": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Стандарттау функциясы",
   "prompt": "<p><code>standardize(xs)</code> функциясын NumPy-мен жазыңыз: <code>(x − орташа) / SD</code> (<code>np.std</code>, популяциялық SD). NumPy массивін қайтарсын.</p><p>Мысалы, <code>standardize([2, 4, 6])</code> → <code>[-1.2247, 0, 1.2247]</code>.</p>",
   "starter": "import numpy as np\n\ndef standardize(xs):\n    pass\n",
   "solution": "import numpy as np\n\ndef standardize(xs):\n    xs = np.asarray(xs, dtype=float)\n    return (xs - xs.mean()) / xs.std()\n\nprint(standardize([2, 4, 6]))",
   "hints": [
    "<code>xs = np.asarray(xs, dtype=float)</code>",
    "<code>(xs - xs.mean()) / xs.std()</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_z = standardize([2, 4, 6])\nassert _z is not None and len(_z) == 3, 'standardize([2, 4, 6]) 3 мәнді массив қайтаруы керек'\nassert _np.allclose(_z, [-1.5 ** 0.5, 0, 1.5 ** 0.5]), 'standardize([2, 4, 6]) ≈ [-1.2247, 0, 1.2247]'\n_w = standardize([10, 20, 30, 40, 100])\nassert abs(_np.mean(_w)) < 1e-9 and abs(_np.std(_w) - 1) < 1e-9, 'Нәтиженің орташасы 0, SD-і 1 болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Екі нүкте арақашықтығы",
   "prompt": "<p><code>dist(a, b)</code> функциясы екі нүкте (кез келген өлшемді тізім) арасындағы евклидтік қашықтықты қайтарсын: <code>√Σ(aᵢ − bᵢ)²</code>.</p><p>Мысалы, <code>dist([0, 0], [3, 4])</code> → <code>5.0</code>.</p>",
   "starter": "import numpy as np\n\ndef dist(a, b):\n    pass\n",
   "solution": "import numpy as np\n\ndef dist(a, b):\n    a = np.asarray(a, dtype=float)\n    b = np.asarray(b, dtype=float)\n    return float(np.sqrt(np.sum((a - b) ** 2)))\n\nprint(dist([0, 0], [3, 4]))",
   "hints": [
    "<code>np.sum((a - b) ** 2)</code>",
    "<code>np.sqrt(...)</code>"
   ],
   "check": {
    "tests": "assert dist([0, 0], [3, 4]) is not None and abs(dist([0, 0], [3, 4]) - 5) < 1e-9, 'dist([0, 0], [3, 4]) 5.0 қайтаруы керек'\nassert abs(dist([1, 2, 3], [1, 2, 3])) < 1e-9, 'Бірдей нүктелер: 0'\nassert abs(dist([1, 1, 1, 1], [2, 2, 2, 2]) - 2) < 1e-9, 'Төрт өлшемде: dist([1, 1, 1, 1], [2, 2, 2, 2]) = 2'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ең жақын аялдама",
   "prompt": "<p>Аялдамалардың координаттары <code>stops</code> тізімінде (км). <code>nearest(points, q)</code> функциясы <code>q</code> нүктесіне ең жақын нүктенің <b>индексін</b> қайтарсын.</p><p>Мысалы, <code>nearest(stops, [1, 1])</code> → <code>0</code>.</p>",
   "starter": "import numpy as np\nstops = [[0, 0], [5, 1], [2, 6], [7, 7]]\n\ndef nearest(points, q):\n    pass\n",
   "solution": "import numpy as np\nstops = [[0, 0], [5, 1], [2, 6], [7, 7]]\n\ndef nearest(points, q):\n    P = np.asarray(points, dtype=float)\n    d = np.sqrt(((P - np.asarray(q, dtype=float)) ** 2).sum(axis=1))\n    return int(np.argmin(d))\n\nprint(nearest(stops, [1, 1]), nearest(stops, [6, 6]))",
   "hints": [
    "Барлық қашықтық бірден: <code>((P - q) ** 2).sum(axis=1)</code>",
    "<code>np.argmin(d)</code> ең кіші мәннің индексін береді."
   ],
   "check": {
    "tests": "assert nearest(stops, [1, 1]) == 0, 'nearest(stops, [1, 1]) 0 қайтаруы керек'\nassert nearest(stops, [6, 6]) == 3, 'nearest(stops, [6, 6]) 3 қайтаруы керек'\nassert nearest(stops, [4, 2]) == 1, 'nearest(stops, [4, 2]) 1 қайтаруы керек'\nassert nearest([[1, 1, 1], [9, 9, 9]], [8, 8, 7]) == 1, 'Үш өлшемді нүктелермен де жұмыс істеуі керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Көршілер санын таңдау",
   "prompt": "<p>Бөлу дайын. <code>StandardScaler</code>-ді train-де fit етіп, екі бөлікті де масштабтаңыз. <code>k</code> ∈ [1, 3, 5, 10, 20] үшін <code>KNeighborsRegressor(n_neighbors=k)</code> test R²-ын <code>r2_by_k</code> сөздігіне жазыңыз. Ең жақсысын <code>best_k</code>-ға жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.neighbors import KNeighborsRegressor\nfrom sklearn.preprocessing import StandardScaler\nX = pd.get_dummies(flats[['area_m2', 'year_built', 'district']], columns=['district'], dtype=int)\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\nr2_by_k = {}\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.neighbors import KNeighborsRegressor\nfrom sklearn.preprocessing import StandardScaler\nX = pd.get_dummies(flats[['area_m2', 'year_built', 'district']], columns=['district'], dtype=int)\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\nr2_by_k = {}\nscaler = StandardScaler().fit(X_train)\nXtr = scaler.transform(X_train)\nXte = scaler.transform(X_test)\nfor k in [1, 3, 5, 10, 20]:\n    knn = KNeighborsRegressor(n_neighbors=k).fit(Xtr, y_train)\n    r2_by_k[k] = knn.score(Xte, y_test)\nbest_k = max(r2_by_k, key=r2_by_k.get)\nprint(r2_by_k, best_k)",
   "hints": [
    "Scaler бір рет: <code>scaler = StandardScaler().fit(X_train)</code>",
    "Цикл ішінде тек KNN-ді ауыстырыңыз."
   ],
   "check": {
    "tests": "from sklearn.neighbors import KNeighborsRegressor as _KR\nfrom sklearn.preprocessing import StandardScaler as _SS\n_s = _SS().fit(X_train)\n_r = {_k: _KR(n_neighbors=_k).fit(_s.transform(X_train), y_train).score(_s.transform(X_test), y_test) for _k in [1, 3, 5, 10, 20]}\nassert sorted(r2_by_k) == [1, 3, 5, 10, 20], 'r2_by_k кілттері: 1, 3, 5, 10, 20'\nassert all(abs(r2_by_k[_k] - _r[_k]) < 1e-6 for _k in _r), 'R² мәндері дұрыс емес: scaler-ді X_train-де fit етіп, екі бөлікті transform жасаңыз'\nassert best_k == max(_r, key=_r.get), f'best_k = {max(_r, key=_r.get)} болуы керек'",
    "mustInclude": [
     "transform("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қымбат пәтерді жіктеу",
   "prompt": "<p>Енді KNN жіктеуіш: пәтер «қымбат» ма (<code>price_mln &gt;= 50</code> → 1)? Бөлу дайын. <code>KNeighborsClassifier(n_neighbors=7)</code>: (1) шикі деректе test accuracy → <code>acc_raw</code>; (2) train-де fit етілген <code>StandardScaler</code>-мен → <code>acc_scaled</code>.</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.preprocessing import StandardScaler\nX = pd.get_dummies(flats[['area_m2', 'year_built', 'district']], columns=['district'], dtype=int)\ny = (flats['price_mln'] >= 50).astype(int)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.preprocessing import StandardScaler\nX = pd.get_dummies(flats[['area_m2', 'year_built', 'district']], columns=['district'], dtype=int)\ny = (flats['price_mln'] >= 50).astype(int)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nacc_raw = KNeighborsClassifier(n_neighbors=7).fit(X_train, y_train).score(X_test, y_test)\nsc = StandardScaler().fit(X_train)\nacc_scaled = KNeighborsClassifier(n_neighbors=7).fit(sc.transform(X_train), y_train).score(sc.transform(X_test), y_test)\nprint(round(acc_raw, 3), round(acc_scaled, 3))",
   "hints": [
    "<code>sc = StandardScaler().fit(X_train)</code>",
    "<code>sc.transform(X_train)</code> және <code>sc.transform(X_test)</code>"
   ],
   "check": {
    "tests": "from sklearn.neighbors import KNeighborsClassifier as _KC\nfrom sklearn.preprocessing import StandardScaler as _SS\n_ar = _KC(n_neighbors=7).fit(X_train, y_train).score(X_test, y_test)\n_s = _SS().fit(X_train)\n_as = _KC(n_neighbors=7).fit(_s.transform(X_train), y_train).score(_s.transform(X_test), y_test)\nassert abs(acc_raw - _ar) < 1e-9, f'acc_raw ≈ {_ar:.3f} болуы керек (масштабсыз, k=7)'\nassert abs(acc_scaled - _as) < 1e-9, f'acc_scaled ≈ {_as:.3f} болуы керек: scaler X_train-де fit, екі бөлік те transform'\nassert acc_scaled > acc_raw, 'Масштабтау KNN-ге көмектесуі керек: year_built пен area_m2 0/1 аудан бағандарын басып кетеді'",
    "mustInclude": [
     "KNeighborsClassifier("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "KNN қолмен",
   "prompt": "<p><code>knn_predict(X_train, y_train, x, k)</code> функциясын NumPy-мен жазыңыз: <code>x</code>-ке ең жақын <code>k</code> нүктенің <code>y</code> мәндерінің орташасын қайтарсын (евклидтік қашықтық).</p><p>Мысалы, төмендегі деректе <code>knn_predict(Xa, ya, [1.1], 2)</code> → <code>15.0</code>.</p>",
   "starter": "import numpy as np\nXa = [[1], [2], [3], [10], [11]]\nya = [10, 20, 30, 100, 110]\n\ndef knn_predict(X_train, y_train, x, k):\n    pass\n",
   "solution": "import numpy as np\nXa = [[1], [2], [3], [10], [11]]\nya = [10, 20, 30, 100, 110]\n\ndef knn_predict(X_train, y_train, x, k):\n    X = np.asarray(X_train, dtype=float)\n    y = np.asarray(y_train, dtype=float)\n    d = np.sqrt(((X - np.asarray(x, dtype=float)) ** 2).sum(axis=1))\n    idx = np.argsort(d)[:k]\n    return float(y[idx].mean())\n\nprint(knn_predict(Xa, ya, [1.1], 2), knn_predict(Xa, ya, [10.4], 2))",
   "hints": [
    "<code>np.argsort(d)[:k]</code> — ең жақын k нүктенің индекстері.",
    "<code>y[idx].mean()</code>"
   ],
   "check": {
    "tests": "assert knn_predict(Xa, ya, [1.1], 2) is not None and abs(knn_predict(Xa, ya, [1.1], 2) - 15) < 1e-9, 'knn_predict(Xa, ya, [1.1], 2) 15.0 қайтаруы керек'\nassert abs(knn_predict(Xa, ya, [10.4], 2) - 105) < 1e-9, 'knn_predict(Xa, ya, [10.4], 2) = 105.0'\nassert abs(knn_predict(Xa, ya, [2], 3) - 20) < 1e-9, 'k=3, x=[2]: көршілер 1, 2, 3 → 20.0'\nassert abs(knn_predict([[0, 0], [0, 1], [5, 5]], [1, 3, 9], [0, 0.2], 1) - 1) < 1e-9, 'Екі өлшемде де жұмыс істеуі керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Min-max масштабтау",
   "prompt": "<p><code>minmax(X)</code> функциясы 2D массивтің әр бағанын <code>[0, 1]</code> аралығына келтірсін: <code>(x − min) / (max − min)</code>, баған бойынша. Сосын оны <code>flats[['area_m2', 'year_built']]</code>-ке қолданып, нәтижені <code>M</code>-ге жазыңыз.</p><p>Мысалы, <code>minmax([[1, 10], [3, 30], [2, 20]])</code> → <code>[[0, 0], [1, 1], [0.5, 0.5]]</code>.</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nimport numpy as np\n\ndef minmax(X):\n    pass\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nimport numpy as np\n\ndef minmax(X):\n    X = np.asarray(X, dtype=float)\n    lo = X.min(axis=0)\n    hi = X.max(axis=0)\n    return (X - lo) / (hi - lo)\n\nM = minmax(flats[['area_m2', 'year_built']])\nprint(M.min(axis=0), M.max(axis=0))",
   "hints": [
    "<code>X.min(axis=0)</code> — әр бағанның минимумы.",
    "<code>(X - lo) / (hi - lo)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_r = minmax([[1, 10], [3, 30], [2, 20]])\nassert _r is not None and _np.allclose(_r, [[0, 0], [1, 1], [0.5, 0.5]]), 'minmax([[1, 10], [3, 30], [2, 20]]) → [[0, 0], [1, 1], [0.5, 0.5]]'\nassert _np.allclose(minmax([[5, -1], [15, 1]]), [[0, 0], [1, 1]]), 'Әр баған өз min/max-ымен масштабталады (axis=0)'\n_M = _np.asarray(M)\nassert _M.shape == (400, 2), 'M пішіні (400, 2)'\nassert _np.allclose(_M.min(axis=0), 0) and _np.allclose(_M.max(axis=0), 1), 'M-нің әр бағаны 0-ден 1-ге дейін'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ұқсас пәтерлер",
   "prompt": "<p><code>area_m2</code>, <code>rooms</code>, <code>year_built</code> бағандарын бүкіл деректе <code>StandardScaler</code>-мен масштабтаңыз (<code>Z</code>). <code>flat_id == 1</code> пәтерге ең жақын <b>басқа</b> 5 пәтердің <code>flat_id</code>-ін (жақыннан алысқа) <code>near_ids</code> тізіміне, олардың орташа бағасын <code>near_price</code>-қа жазыңыз.</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler\nZ = StandardScaler().fit_transform(flats[['area_m2', 'rooms', 'year_built']])\ni = flats.index[flats['flat_id'] == 1][0]\nd = np.sqrt(((Z - Z[i]) ** 2).sum(axis=1))\norder = [j for j in np.argsort(d) if j != i][:5]\nnear_ids = flats['flat_id'].iloc[order].tolist()\nnear_price = flats['price_mln'].iloc[order].mean()\nprint(near_ids, round(near_price, 2))",
   "hints": [
    "Қашықтықтар: <code>np.sqrt(((Z - Z[i]) ** 2).sum(axis=1))</code>",
    "<code>np.argsort(d)</code>-дан пәтердің өзін алып тастаңыз."
   ],
   "check": {
    "tests": "import numpy as _np\nfrom sklearn.preprocessing import StandardScaler as _SS\n_f = pd.read_csv('flats.csv')\n_Z = _SS().fit_transform(_f[['area_m2', 'rooms', 'year_built']])\n_d = _np.sqrt(((_Z - _Z[0]) ** 2).sum(axis=1))\n_d[0] = _np.inf\n_o = _np.argsort(_d)[:5]\nassert len(near_ids) == 5 and 1 not in list(near_ids), 'near_ids — 5 басқа пәтер (flat_id 1-дің өзі емес)'\nassert [int(_v) for _v in near_ids] == _f['flat_id'].iloc[_o].tolist(), f'near_ids = {_f[\"flat_id\"].iloc[_o].tolist()} болуы керек. Масштабталған кеңістікте санадыңыз ба?'\nassert abs(near_price - _f['price_mln'].iloc[_o].mean()) < 1e-6, 'near_price — сол 5 пәтердің орташа бағасы'",
    "mustInclude": [
     "StandardScaler("
    ]
   }
  }
 ],
 "ml-7": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Сигмоид функциясы",
   "prompt": "<p><code>sigmoid(z)</code> функциясын жазыңыз: <code>1 / (1 + e^(−z))</code>. Ол сандармен де, NumPy массивтерімен де жұмыс істесін (<code>np.exp</code>).</p><p>Мысалы, <code>sigmoid(0)</code> → <code>0.5</code>.</p>",
   "starter": "import numpy as np\n\ndef sigmoid(z):\n    pass\n",
   "solution": "import numpy as np\n\ndef sigmoid(z):\n    return 1 / (1 + np.exp(-np.asarray(z, dtype=float)))\n\nprint(sigmoid(0), sigmoid(np.array([-2, 2])))",
   "hints": [
    "<code>np.exp(-z)</code> массивтерді де қабылдайды."
   ],
   "check": {
    "tests": "import numpy as _np\nassert sigmoid(0) is not None and abs(float(sigmoid(0)) - 0.5) < 1e-9, 'sigmoid(0) 0.5 қайтаруы керек'\nassert abs(float(sigmoid(2)) - 0.8807970779778823) < 1e-9, 'sigmoid(2) ≈ 0.8808'\nassert _np.allclose(sigmoid(_np.array([-3.0, 0.0, 3.0])), [0.04742587, 0.5, 0.95257413]), 'Массивпен де жұмыс істеуі керек: np.exp қолданыңыз'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ықтималдықтан класқа",
   "prompt": "<p><code>to_class(probs, t=0.5)</code> функциясы әр ықтималдық үшін <code>p &gt;= t</code> болса 1, әйтпесе 0 қойып, <b>тізім</b> қайтарсын.</p><p>Мысалы, <code>to_class([0.2, 0.5, 0.9])</code> → <code>[0, 1, 1]</code>.</p>",
   "starter": "def to_class(probs, t=0.5):\n    pass\n",
   "solution": "def to_class(probs, t=0.5):\n    return [1 if p >= t else 0 for p in probs]\n\nprint(to_class([0.2, 0.5, 0.9]), to_class([0.2, 0.5, 0.9], t=0.1))",
   "hints": [
    "Тізім генераторы: <code>[1 if p &gt;= t else 0 for p in probs]</code>"
   ],
   "check": {
    "tests": "assert to_class([0.2, 0.5, 0.9]) == [0, 1, 1], 'to_class([0.2, 0.5, 0.9]) [0, 1, 1] қайтаруы керек (0.5 ≥ 0.5)'\nassert to_class([0.2, 0.5, 0.9], t=0.1) == [1, 1, 1], 't=0.1 болса бәрі 1'\nassert to_class([0.35, 0.29], t=0.3) == [1, 0], 'to_class([0.35, 0.29], t=0.3) = [1, 0]'\nassert to_class([]) == [], 'Бос тізім үшін бос тізім'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жаңа абонент қаупі",
   "prompt": "<p><code>clf</code> үйретілген. Жаңа абонент: 3 ай бұрын қосылған, айына 11 000 ₸ төлейді, қолдауға 4 рет қоңырау шалған, келісімшарты жоқ. Оның кету ықтималдығын <code>p_new</code>-ге (сан) жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nfrom sklearn.linear_model import LogisticRegression\nclf = LogisticRegression(max_iter=1000)\nclf.fit(X_train, y_train)\nproba = clf.predict_proba(X_test)[:, 1]\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nfrom sklearn.linear_model import LogisticRegression\nclf = LogisticRegression(max_iter=1000)\nclf.fit(X_train, y_train)\nproba = clf.predict_proba(X_test)[:, 1]\nnew = pd.DataFrame({'tenure_months': [3], 'monthly_fee': [11000], 'support_calls': [4], 'has_contract': [0]})\np_new = clf.predict_proba(new)[0, 1]\nprint(round(p_new, 3))",
   "hints": [
    "Бағандар реті <code>features</code>-тегідей болсын.",
    "<code>clf.predict_proba(new)[0, 1]</code> — бірінші жол, «кетеді» класы."
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\n_n = _pd.DataFrame({'tenure_months': [3], 'monthly_fee': [11000], 'support_calls': [4], 'has_contract': [0]})\n_pn = _m.predict_proba(_n)[0, 1]\nassert 0 <= float(p_new) <= 1, 'p_new — ықтималдық (0 мен 1 арасы)'\nassert abs(float(p_new) - _pn) < 0.01, f'p_new ≈ {_pn:.3f} болуы керек: predict_proba(new)[0, 1]'",
    "mustInclude": [
     "predict_proba("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қаупін арттыратын белгілер",
   "prompt": "<p><code>clf</code>-тің коэффициенттерін <code>features</code> аттарымен <code>coefs</code> Series-ке жазыңыз. Коэффициенті оң (кету ықтималдығын арттыратын) белгілердің аттарын әліпби бойынша сұрыпталған тізім ретінде <code>risk_up</code>-қа жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nfrom sklearn.linear_model import LogisticRegression\nclf = LogisticRegression(max_iter=1000)\nclf.fit(X_train, y_train)\nproba = clf.predict_proba(X_test)[:, 1]\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nfrom sklearn.linear_model import LogisticRegression\nclf = LogisticRegression(max_iter=1000)\nclf.fit(X_train, y_train)\nproba = clf.predict_proba(X_test)[:, 1]\ncoefs = pd.Series(clf.coef_[0], index=features)\nrisk_up = sorted(coefs[coefs > 0].index)\nprint(coefs, risk_up)",
   "hints": [
    "<code>clf.coef_</code> пішіні (1, 4): <code>clf.coef_[0]</code>",
    "<code>sorted(coefs[coefs &gt; 0].index)</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\n_s = _pd.Series(_m.coef_[0], index=_F)\nassert isinstance(coefs, pd.Series) and list(coefs.index) == features, 'coefs индексі — features'\nassert _np.allclose(coefs.values, _s.values, atol=1e-3), 'coefs = clf.coef_[0] (бірінші жол)'\nassert list(risk_up) == sorted(_s[_s > 0].index), f'risk_up = {sorted(_s[_s > 0].index)} болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Орташа ықтималдық",
   "prompt": "<p>Жақсы модельде орташа болжамды ықтималдық нақты кету үлесіне жақын. Test-тегі <code>proba</code>-ның орташасын <code>mean_proba</code>-ға, <code>y_test</code>-тің орташасын <code>true_rate</code>-ке жазыңыз. Айырманың модулін <code>calib_gap</code>-қа жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nfrom sklearn.linear_model import LogisticRegression\nclf = LogisticRegression(max_iter=1000)\nclf.fit(X_train, y_train)\nproba = clf.predict_proba(X_test)[:, 1]\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nfrom sklearn.linear_model import LogisticRegression\nclf = LogisticRegression(max_iter=1000)\nclf.fit(X_train, y_train)\nproba = clf.predict_proba(X_test)[:, 1]\nmean_proba = proba.mean()\ntrue_rate = y_test.mean()\ncalib_gap = abs(mean_proba - true_rate)\nprint(round(mean_proba, 3), round(true_rate, 3), round(calib_gap, 3))",
   "hints": [
    "<code>proba.mean()</code>",
    "<code>abs(a - b)</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\nassert abs(mean_proba - _p.mean()) < 0.01, f'mean_proba ≈ {_p.mean():.3f} болуы керек'\nassert abs(true_rate - _yte.mean()) < 1e-9, 'true_rate = y_test.mean()'\nassert abs(calib_gap - abs(mean_proba - true_rate)) < 1e-9 and calib_gap < 0.05, 'calib_gap = |mean_proba − true_rate| (кішкентай сан)'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең қауіпті ондық",
   "prompt": "<p>Ретеншн бөлімі тек 10 абонентке қоңырау шала алады. Test-те <code>proba</code> ең жоғары 10 абоненттің индекстерін (<code>X_test.index</code>) <code>top10</code> тізіміне жазыңыз. Олардың ішіндегі нақты кету үлесін <code>top10_rate</code>-ке жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nfrom sklearn.linear_model import LogisticRegression\nclf = LogisticRegression(max_iter=1000)\nclf.fit(X_train, y_train)\nproba = clf.predict_proba(X_test)[:, 1]\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nfrom sklearn.linear_model import LogisticRegression\nclf = LogisticRegression(max_iter=1000)\nclf.fit(X_train, y_train)\nproba = clf.predict_proba(X_test)[:, 1]\ns = pd.Series(proba, index=X_test.index).sort_values(ascending=False)\ntop10 = list(s.index[:10])\ntop10_rate = y_test.loc[top10].mean()\nprint(top10, top10_rate)",
   "hints": [
    "<code>pd.Series(proba, index=X_test.index).sort_values(ascending=False)</code>",
    "<code>y_test.loc[top10]</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\n_s = _pd.Series(_p, index=_Xte.index).sort_values(ascending=False)\n_t = list(_s.index[:10])\nassert len(top10) == 10, 'top10-да 10 индекс болуы керек'\nassert set(top10) == set(_t), 'top10 — proba ең жоғары 10 абоненттің X_test индекстері'\nassert abs(top10_rate - _yte.loc[_t].mean()) < 1e-9, 'top10_rate = y_test.loc[top10].mean()'\nassert top10_rate > y_test.mean(), 'Ең қауіпті ондықта кету үлесі орташадан жоғары болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ықтималдықты қолмен есептеу",
   "prompt": "<p><code>predict_proba</code>-сыз: <code>z = X_test · coef + intercept</code> есептеп, сигмоид арқылы <code>manual</code> ықтималдықтарын табыңыз (<code>clf.coef_[0]</code>, <code>clf.intercept_[0]</code>). <code>manual</code> мен <code>proba</code> арасындағы ең үлкен абсолютті айырманы <code>max_diff</code>-ке жазыңыз (ол ≈ 0 болуы керек).</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nfrom sklearn.linear_model import LogisticRegression\nclf = LogisticRegression(max_iter=1000)\nclf.fit(X_train, y_train)\nproba = clf.predict_proba(X_test)[:, 1]\nimport numpy as np\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nfrom sklearn.linear_model import LogisticRegression\nclf = LogisticRegression(max_iter=1000)\nclf.fit(X_train, y_train)\nproba = clf.predict_proba(X_test)[:, 1]\nimport numpy as np\nz = X_test.values @ clf.coef_[0] + clf.intercept_[0]\nmanual = 1 / (1 + np.exp(-z))\nmax_diff = np.abs(manual - proba).max()\nprint(max_diff)",
   "hints": [
    "Матрицалық көбейту: <code>X_test.values @ clf.coef_[0]</code>",
    "Сигмоид: <code>1 / (1 + np.exp(-z))</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nassert len(manual) == 150, 'manual — 150 test абоненті үшін'\nassert _np.allclose(manual, clf.predict_proba(X_test)[:, 1]), 'manual = 1 / (1 + exp(-z)), z = X_test · coef + intercept'\nassert max_diff < 1e-9, 'max_diff ≈ 0 болуы керек'",
    "mustInclude": [
     "coef_",
     "intercept_"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Шек бойынша accuracy",
   "prompt": "<p>Шек <code>t</code> ∈ 0.1, 0.2, …, 0.9 үшін (<code>round(t, 1)</code> кілт) test accuracy-ін <code>acc_by_t</code> сөздігіне жазыңыз: болжам <code>proba &gt;= t</code>. Accuracy ең жоғары шекті <code>best_t</code>-ға жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nfrom sklearn.linear_model import LogisticRegression\nclf = LogisticRegression(max_iter=1000)\nclf.fit(X_train, y_train)\nproba = clf.predict_proba(X_test)[:, 1]\nimport numpy as np\nacc_by_t = {}\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nfrom sklearn.linear_model import LogisticRegression\nclf = LogisticRegression(max_iter=1000)\nclf.fit(X_train, y_train)\nproba = clf.predict_proba(X_test)[:, 1]\nimport numpy as np\nacc_by_t = {}\nfor t in np.arange(0.1, 0.95, 0.1):\n    pred = (proba >= t).astype(int)\n    acc_by_t[round(t, 1)] = (pred == y_test.values).mean()\nbest_t = max(acc_by_t, key=acc_by_t.get)\nprint(acc_by_t, best_t)",
   "hints": [
    "<code>np.arange(0.1, 0.95, 0.1)</code> 0.1…0.9 береді.",
    "<code>max(acc_by_t, key=acc_by_t.get)</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\n_a = {round(_t, 1): ((_p >= _t).astype(int) == _yte.values).mean() for _t in _np.arange(0.1, 0.95, 0.1)}\nassert sorted(acc_by_t) == sorted(_a), 'Кілттер: 0.1, 0.2, ..., 0.9 (round(t, 1))'\nassert all(abs(acc_by_t[_k] - _a[_k]) < 0.02 for _k in _a), 'Accuracy мәндері дұрыс емес: (proba >= t) == y_test'\nassert acc_by_t[best_t] == max(acc_by_t.values()), 'best_t — accuracy ең жоғары шек'"
   }
  }
 ],
 "ml-8": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Accuracy функциясы",
   "prompt": "<p><code>accuracy(y_true, y_pred)</code> функциясы дұрыс болжамдар үлесін қайтарсын (sklearn-сіз).</p><p>Мысалы, <code>accuracy([1, 0, 1, 1], [1, 0, 0, 1])</code> → <code>0.75</code>.</p>",
   "starter": "def accuracy(y_true, y_pred):\n    pass\n",
   "solution": "def accuracy(y_true, y_pred):\n    hits = sum(1 for t, p in zip(y_true, y_pred) if t == p)\n    return hits / len(y_true)\n\nprint(accuracy([1, 0, 1, 1], [1, 0, 0, 1]))",
   "hints": [
    "<code>zip(y_true, y_pred)</code> жұптарды береді.",
    "Дұрыстар саны / барлығы."
   ],
   "check": {
    "tests": "assert accuracy([1, 0, 1, 1], [1, 0, 0, 1]) == 0.75, 'accuracy([1, 0, 1, 1], [1, 0, 0, 1]) 0.75 қайтаруы керек'\nassert accuracy([0, 0], [1, 1]) == 0, 'Бәрі қате: 0'\nassert accuracy([1, 0, 1], [1, 0, 1]) == 1, 'Бәрі дұрыс: 1'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "F1 функциясы",
   "prompt": "<p><code>f1(precision, recall)</code> функциясы гармоникалық орташаны қайтарсын: <code>2·P·R / (P + R)</code>. Екеуі де 0 болса, 0 қайтарсын.</p><p>Мысалы, <code>f1(0.5, 1.0)</code> → <code>0.6667</code>.</p>",
   "starter": "def f1(precision, recall):\n    pass\n",
   "solution": "def f1(precision, recall):\n    if precision + recall == 0:\n        return 0.0\n    return 2 * precision * recall / (precision + recall)\n\nprint(f1(0.5, 1.0))",
   "hints": [
    "Алдымен <code>precision + recall == 0</code> жағдайын тексеріңіз."
   ],
   "check": {
    "tests": "assert f1(0.5, 1.0) is not None and abs(f1(0.5, 1.0) - 2 / 3) < 1e-9, 'f1(0.5, 1.0) ≈ 0.6667 болуы керек'\nassert abs(f1(0.8, 0.8) - 0.8) < 1e-9, 'f1(0.8, 0.8) = 0.8'\nassert f1(0, 0) == 0, 'f1(0, 0) = 0 (нөлге бөлмеңіз)'\nassert abs(f1(1.0, 0.1) - 2 * 0.1 / 1.1) < 1e-9, 'Гармоникалық орташа кіші мәнге жақын: f1(1.0, 0.1) ≈ 0.18'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бәрі қалады болжамы",
   "prompt": "<p>«Ешкім кетпейді» деп болжайтын модель: test-тегі әр абонентке 0. <code>pred_zero</code> массивін жасап, <code>acc_zero</code> (accuracy) және <code>rec_zero</code> (recall) есептеңіз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nimport numpy as np\nfrom sklearn.metrics import accuracy_score, recall_score\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nimport numpy as np\nfrom sklearn.metrics import accuracy_score, recall_score\npred_zero = np.zeros(len(y_test), dtype=int)\nacc_zero = accuracy_score(y_test, pred_zero)\nrec_zero = recall_score(y_test, pred_zero)\nprint(acc_zero, rec_zero)",
   "hints": [
    "<code>np.zeros(len(y_test), dtype=int)</code>",
    "<code>accuracy_score(y_test, pred_zero)</code>"
   ],
   "check": {
    "tests": "assert len(pred_zero) == 150 and int(sum(pred_zero)) == 0, 'pred_zero — 150 нөл'\nassert abs(acc_zero - (1 - y_test.mean())) < 1e-9, f'acc_zero ≈ {1 - y_test.mean():.3f}: accuracy жоғары көрінеді'\nassert rec_zero == 0, 'rec_zero = 0: ешбір кетушіні таппайды'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Confusion matrix функциясы",
   "prompt": "<p><code>confusion(y_true, y_pred)</code> функциясы sklearn сияқты <code>[[tn, fp], [fn, tp]]</code> тізімін қайтарсын.</p><p>Мысалы, <code>confusion([1, 0, 1, 0], [1, 1, 0, 0])</code> → <code>[[1, 1], [1, 1]]</code>.</p>",
   "starter": "def confusion(y_true, y_pred):\n    pass\n",
   "solution": "def confusion(y_true, y_pred):\n    pairs = list(zip(y_true, y_pred))\n    tn = pairs.count((0, 0))\n    fp = pairs.count((0, 1))\n    fn = pairs.count((1, 0))\n    tp = pairs.count((1, 1))\n    return [[tn, fp], [fn, tp]]\n\nprint(confusion([1, 0, 1, 0], [1, 1, 0, 0]))",
   "hints": [
    "<code>pairs.count((0, 1))</code> — FP саны.",
    "Реті: <code>[[tn, fp], [fn, tp]]</code>"
   ],
   "check": {
    "tests": "from sklearn.metrics import confusion_matrix as _cm\nassert confusion([1, 0, 1, 0], [1, 1, 0, 0]) == [[1, 1], [1, 1]], 'confusion([1, 0, 1, 0], [1, 1, 0, 0]) → [[1, 1], [1, 1]]'\nassert confusion([1, 1, 1], [1, 1, 0]) == [[0, 0], [1, 2]], 'confusion([1, 1, 1], [1, 1, 0]) → [[0, 0], [1, 2]]: реті [[tn, fp], [fn, tp]]'\n_t, _p = [0, 1, 1, 0, 1, 0, 0, 1, 1, 0], [0, 1, 0, 1, 1, 0, 0, 0, 1, 1]\nassert confusion(_t, _p) == _cm(_t, _p).tolist(), 'Нәтиже sklearn confusion_matrix-пен сәйкес келмейді'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Екі шекті салыстыру",
   "prompt": "<p><code>proba</code> дайын. 0.5 шекпен precision мен recall-ды <code>prec_05</code>, <code>rec_05</code>-ке, 0.3 шекпен <code>prec_03</code>, <code>rec_03</code>-ке жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nfrom sklearn.linear_model import LogisticRegression\nclf = LogisticRegression(max_iter=1000)\nclf.fit(X_train, y_train)\nproba = clf.predict_proba(X_test)[:, 1]\nfrom sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score, roc_auc_score\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nfrom sklearn.linear_model import LogisticRegression\nclf = LogisticRegression(max_iter=1000)\nclf.fit(X_train, y_train)\nproba = clf.predict_proba(X_test)[:, 1]\nfrom sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score, roc_auc_score\np5 = (proba >= 0.5).astype(int)\np3 = (proba >= 0.3).astype(int)\nprec_05, rec_05 = precision_score(y_test, p5), recall_score(y_test, p5)\nprec_03, rec_03 = precision_score(y_test, p3), recall_score(y_test, p3)\nprint(prec_05, rec_05, prec_03, rec_03)",
   "hints": [
    "<code>(proba &gt;= 0.3).astype(int)</code>",
    "Аргумент реті: <code>precision_score(y_test, pred)</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\nfrom sklearn import metrics as _mt\n_a = (_p >= 0.5).astype(int)\n_b = (_p >= 0.3).astype(int)\nassert abs(prec_05 - _mt.precision_score(_yte, _a)) < 0.02 and abs(rec_05 - _mt.recall_score(_yte, _a)) < 0.02, 'prec_05, rec_05: шек 0.5'\nassert abs(prec_03 - _mt.precision_score(_yte, _b)) < 0.02 and abs(rec_03 - _mt.recall_score(_yte, _b)) < 0.02, 'prec_03, rec_03: шек 0.3'\nassert rec_03 > rec_05, 'Шек төмендесе, recall өседі'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Specificity",
   "prompt": "<p>Specificity — қалатын абоненттердің ішінде дұрыс «қалады» деп табылғандар үлесі: <code>tn / (tn + fp)</code>. <code>clf.predict(X_test)</code> бойынша <code>cm</code> матрицасын тауып, <code>tn, fp, fn, tp</code>-ны шығарып алыңыз (<code>cm.ravel()</code>), <code>spec</code>-ті есептеңіз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nfrom sklearn.linear_model import LogisticRegression\nclf = LogisticRegression(max_iter=1000)\nclf.fit(X_train, y_train)\nproba = clf.predict_proba(X_test)[:, 1]\nfrom sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score, roc_auc_score\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nfrom sklearn.linear_model import LogisticRegression\nclf = LogisticRegression(max_iter=1000)\nclf.fit(X_train, y_train)\nproba = clf.predict_proba(X_test)[:, 1]\nfrom sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score, roc_auc_score\ncm = confusion_matrix(y_test, clf.predict(X_test))\ntn, fp, fn, tp = cm.ravel()\nspec = tn / (tn + fp)\nprint(cm, spec)",
   "hints": [
    "<code>tn, fp, fn, tp = cm.ravel()</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\nfrom sklearn.metrics import confusion_matrix as _cm\n_tn, _fp, _fn, _tp = _cm(_yte, _m.predict(_Xte)).ravel()\nassert int(tn) + int(fp) == int((y_test == 0).sum()), 'tn + fp — қалатындар саны'\nassert abs(spec - _tn / (_tn + _fp)) < 0.02, f'spec ≈ {_tn / (_tn + _fp):.3f} болуы керек: tn / (tn + fp)'\nassert spec > 0.8, 'Бұл модельде specificity жоғары, recall төмен'",
    "mustInclude": [
     "confusion_matrix("
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Recall 80% шегі",
   "prompt": "<p>Бизнес кетушілердің кемінде 80%-ын тапқысы келеді. <code>np.arange(0.05, 0.96, 0.05)</code> шектерінің (<code>round(t, 2)</code>) ішінен test recall ≥ 0.8 болатын <b>ең үлкен</b> шекті <code>t80</code>-ге, сол шектегі precision-ды <code>prec80</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nfrom sklearn.linear_model import LogisticRegression\nclf = LogisticRegression(max_iter=1000)\nclf.fit(X_train, y_train)\nproba = clf.predict_proba(X_test)[:, 1]\nimport numpy as np\nfrom sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score, roc_auc_score\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nfrom sklearn.linear_model import LogisticRegression\nclf = LogisticRegression(max_iter=1000)\nclf.fit(X_train, y_train)\nproba = clf.predict_proba(X_test)[:, 1]\nimport numpy as np\nfrom sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score, roc_auc_score\nt80 = None\nfor t in np.arange(0.05, 0.96, 0.05):\n    t = round(t, 2)\n    if recall_score(y_test, (proba >= t).astype(int)) >= 0.8:\n        t80 = t\nprec80 = precision_score(y_test, (proba >= t80).astype(int))\nprint(t80, round(prec80, 3))",
   "hints": [
    "Шектерді өсу ретімен тексеріп, шартқа сай соңғысын сақтаңыз.",
    "<code>recall_score(y_test, (proba &gt;= t).astype(int))</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\nfrom sklearn import metrics as _mt\n_ok = [round(_t, 2) for _t in _np.arange(0.05, 0.96, 0.05) if _mt.recall_score(_yte, (_p >= round(_t, 2)).astype(int)) >= 0.8]\n_t8 = max(_ok)\nassert t80 is not None and abs(t80 - _t8) < 1e-9, f't80 = {_t8} болуы керек: recall ≥ 0.8 болатын ең үлкен шек'\nassert abs(prec80 - _mt.precision_score(_yte, (_p >= _t8).astype(int))) < 0.02, 'prec80 — сол шектегі precision'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "AUC жұптар арқылы",
   "prompt": "<p>ROC AUC — кездейсоқ кетуші абоненттің ықтималдығы кездейсоқ қалатын абоненттікінен жоғары болу ықтималдығы. <code>auc_pairs(y, scores)</code> функциясын жазыңыз: барлық (кетуші, қалатын) жұптарын қарап, кетушінің ұпайы үлкен болса 1, тең болса 0.5 қосып, жұптар санына бөліңіз. Сосын <code>auc_manual = auc_pairs(y_test, proba)</code>.</p><p>Мысалы, <code>auc_pairs([0, 1, 0, 1], [0.1, 0.8, 0.4, 0.3])</code> → <code>0.75</code>.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nfrom sklearn.linear_model import LogisticRegression\nclf = LogisticRegression(max_iter=1000)\nclf.fit(X_train, y_train)\nproba = clf.predict_proba(X_test)[:, 1]\nimport numpy as np\n\ndef auc_pairs(y, scores):\n    pass\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nfrom sklearn.linear_model import LogisticRegression\nclf = LogisticRegression(max_iter=1000)\nclf.fit(X_train, y_train)\nproba = clf.predict_proba(X_test)[:, 1]\nimport numpy as np\n\ndef auc_pairs(y, scores):\n    y = np.asarray(y)\n    s = np.asarray(scores, dtype=float)\n    pos = s[y == 1]\n    neg = s[y == 0]\n    total = 0.0\n    for p in pos:\n        total += (p > neg).sum() + 0.5 * (p == neg).sum()\n    return float(total / (len(pos) * len(neg)))\n\nauc_manual = auc_pairs(y_test, proba)\nprint(auc_pairs([0, 1, 0, 1], [0.1, 0.8, 0.4, 0.3]), auc_manual)",
   "hints": [
    "Ұпайларды екіге бөліңіз: <code>pos = s[y == 1]</code>, <code>neg = s[y == 0]</code>.",
    "<code>(p &gt; neg).sum()</code> бір кетуші үшін жеңістер санын береді."
   ],
   "check": {
    "tests": "from sklearn.metrics import roc_auc_score as _ra\nassert auc_pairs([0, 1, 0, 1], [0.1, 0.8, 0.4, 0.3]) == 0.75, 'auc_pairs([0, 1, 0, 1], [0.1, 0.8, 0.4, 0.3]) 0.75 қайтаруы керек'\nassert auc_pairs([0, 1], [0.5, 0.5]) == 0.5, 'Тең ұпайлар 0.5 береді'\nassert abs(auc_pairs([1, 0, 1, 0, 1], [0.9, 0.2, 0.4, 0.6, 0.6]) - _ra([1, 0, 1, 0, 1], [0.9, 0.2, 0.4, 0.6, 0.6])) < 1e-9, 'Нәтиже roc_auc_score-пен сәйкес келуі керек'\nassert abs(auc_manual - _ra(y_test, proba)) < 1e-9, 'auc_manual = auc_pairs(y_test, proba)'"
   }
  }
 ],
 "ml-9": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Gini функциясы",
   "prompt": "<p><code>gini(labels)</code> функциясы Gini қоспасын қайтарсын: <code>1 − Σ pₖ²</code>, мұнда <code>pₖ</code> — әр класс үлесі.</p><p>Мысалы, <code>gini([0, 0, 1, 1])</code> → <code>0.5</code>, <code>gini([1, 1, 1])</code> → <code>0.0</code>.</p>",
   "starter": "def gini(labels):\n    pass\n",
   "solution": "def gini(labels):\n    n = len(labels)\n    return 1 - sum((labels.count(c) / n) ** 2 for c in set(labels))\n\nprint(gini([0, 0, 1, 1]), gini([1, 1, 1]))",
   "hints": [
    "<code>set(labels)</code> — кластар.",
    "<code>labels.count(c) / n</code> — класс үлесі."
   ],
   "check": {
    "tests": "assert gini([0, 0, 1, 1]) is not None and abs(gini([0, 0, 1, 1]) - 0.5) < 1e-9, 'gini([0, 0, 1, 1]) 0.5 қайтаруы керек'\nassert abs(gini([1, 1, 1])) < 1e-9, 'Таза топ: gini = 0'\nassert abs(gini([0, 1, 1, 1]) - 0.375) < 1e-9, 'gini([0, 1, 1, 1]) = 1 − (0.25² + 0.75²) = 0.375'\nassert abs(gini(['a', 'b', 'c']) - 2 / 3) < 1e-9, 'Үш класпен де жұмыс істеуі керек'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бір бұтақты ағаш",
   "prompt": "<p><code>DecisionTreeClassifier(max_depth=1, random_state=0)</code>-ды <code>stump</code> атымен үйретіңіз. Test accuracy → <code>stump_acc</code>. Ағаш қай белгі бойынша бөлінді — <code>feature_importances_</code> ең үлкен белгінің атын <code>root_feature</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nfrom sklearn.tree import DecisionTreeClassifier\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nfrom sklearn.tree import DecisionTreeClassifier\nstump = DecisionTreeClassifier(max_depth=1, random_state=0).fit(X_train, y_train)\nstump_acc = stump.score(X_test, y_test)\nroot_feature = pd.Series(stump.feature_importances_, index=features).idxmax()\nprint(stump_acc, root_feature)",
   "hints": [
    "<code>pd.Series(stump.feature_importances_, index=features).idxmax()</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\nfrom sklearn.tree import DecisionTreeClassifier as _DT\n_s = _DT(max_depth=1, random_state=0).fit(_Xtr, _ytr)\nassert isinstance(stump, DecisionTreeClassifier) and stump.get_depth() == 1, 'stump — тереңдігі 1 ағаш'\nassert abs(stump_acc - _s.score(_Xte, _yte)) < 1e-9, f'stump_acc ≈ {_s.score(_Xte, _yte):.3f} болуы керек'\nassert root_feature == _F[int(_np.argmax(_s.feature_importances_))], 'root_feature — feature_importances_ ең үлкен белгі'",
    "mustInclude": [
     "feature_importances_"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Регрессия ағашы",
   "prompt": "<p>Ағаш бағаны да болжай алады. <code>area_m2</code>, <code>year_built</code> бойынша <code>DecisionTreeRegressor(max_depth=3, random_state=0)</code>-ды <code>reg</code> атымен train-де үйретіңіз (бөлу <code>test_size=0.2</code>, <code>random_state=42</code>). Test R² → <code>tree_r2</code>.</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.tree import DecisionTreeRegressor\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.tree import DecisionTreeRegressor\nX = flats[['area_m2', 'year_built']]\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\nreg = DecisionTreeRegressor(max_depth=3, random_state=0).fit(X_train, y_train)\ntree_r2 = reg.score(X_test, y_test)\nprint(tree_r2)",
   "hints": [
    "<code>from sklearn.tree import DecisionTreeRegressor</code> дайын.",
    "API бірдей: <code>fit</code>, <code>score</code>."
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\nfrom sklearn.tree import DecisionTreeRegressor as _DR\n_a, _b, _c, _d = _tts(_f[['area_m2', 'year_built']], _f['price_mln'], test_size=0.2, random_state=42)\n_r = _DR(max_depth=3, random_state=0).fit(_a, _c).score(_b, _d)\nassert isinstance(reg, DecisionTreeRegressor) and reg.get_depth() <= 3, 'reg — max_depth=3 DecisionTreeRegressor'\nassert abs(tree_r2 - _r) < 1e-9, f'tree_r2 ≈ {_r:.3f} болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жапырақтар саны",
   "prompt": "<p>Тереңдік өскенде ағаш күрделенеді. <code>max_depth</code> ∈ [2, 4, 6, None] үшін ағаш (<code>random_state=0</code>) үйретіп, жапырақтар санын (<code>get_n_leaves()</code>) <code>leaves</code> сөздігіне жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nfrom sklearn.tree import DecisionTreeClassifier\nleaves = {}\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nfrom sklearn.tree import DecisionTreeClassifier\nleaves = {}\nfor d in [2, 4, 6, None]:\n    t = DecisionTreeClassifier(max_depth=d, random_state=0).fit(X_train, y_train)\n    leaves[d] = t.get_n_leaves()\nprint(leaves)",
   "hints": [
    "Цикл: <code>for d in [2, 4, 6, None]:</code>",
    "<code>t.get_n_leaves()</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\nfrom sklearn.tree import DecisionTreeClassifier as _DT\n_l = {_d: _DT(max_depth=_d, random_state=0).fit(_Xtr, _ytr).get_n_leaves() for _d in [2, 4, 6, None]}\nassert set(leaves) == {2, 4, 6, None}, 'leaves кілттері: 2, 4, 6, None'\nassert all(int(leaves[_d]) == int(_l[_d]) for _d in _l), f'Жапырақтар саны: {_l}'\nassert leaves[2] <= 4 and leaves[None] > 50, 'Тереңдігі 2 ағашта ≤ 4 жапырақ, шектеусіз ағашта жүздеген'",
    "mustInclude": [
     "get_n_leaves("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жапырақтағы ең аз мысал",
   "prompt": "<p>Overfitting-ті тежеудің басқа жолы — <code>min_samples_leaf</code>. Оның [1, 5, 20, 50] мәндері үшін ағаш (<code>random_state=0</code>, тереңдік шектеусіз) үйретіп, <code>results</code> сөздігіне <code>(train_acc, test_acc)</code> жазыңыз. Test accuracy ең жоғары мәнді <code>best_leaf</code>-ке жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nfrom sklearn.tree import DecisionTreeClassifier\nresults = {}\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nfrom sklearn.tree import DecisionTreeClassifier\nresults = {}\nfor m in [1, 5, 20, 50]:\n    t = DecisionTreeClassifier(min_samples_leaf=m, random_state=0).fit(X_train, y_train)\n    results[m] = (t.score(X_train, y_train), t.score(X_test, y_test))\nbest_leaf = max(results, key=lambda m: results[m][1])\nprint(results, best_leaf)",
   "hints": [
    "<code>DecisionTreeClassifier(min_samples_leaf=m, random_state=0)</code>",
    "<code>max(results, key=lambda m: results[m][1])</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\nfrom sklearn.tree import DecisionTreeClassifier as _DT\n_r = {}\nfor _m in [1, 5, 20, 50]:\n    _t = _DT(min_samples_leaf=_m, random_state=0).fit(_Xtr, _ytr)\n    _r[_m] = (_t.score(_Xtr, _ytr), _t.score(_Xte, _yte))\nassert sorted(results) == [1, 5, 20, 50], 'results кілттері: 1, 5, 20, 50'\nassert all(abs(results[_m][0] - _r[_m][0]) < 1e-9 and abs(results[_m][1] - _r[_m][1]) < 1e-9 for _m in _r), 'Әр мән — (train_acc, test_acc)'\nassert best_leaf == max(_r, key=lambda _m: _r[_m][1]), 'best_leaf — test accuracy ең жоғары min_samples_leaf'\nassert results[1][0] > results[50][0], 'min_samples_leaf үлкейсе, train accuracy төмендейді'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ағаш па, логистикалық па",
   "prompt": "<p>Бір бөлуде екі модельді салыстырыңыз: <code>DecisionTreeClassifier(max_depth=3, random_state=0)</code> → <code>acc_tree</code>, <code>LogisticRegression(max_iter=1000)</code> → <code>acc_lr</code> (test accuracy). Жақсысының атын <code>winner</code>-ге жазыңыз: <code>'tree'</code> немесе <code>'logreg'</code> (тең болса <code>'logreg'</code>).</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.linear_model import LogisticRegression\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.linear_model import LogisticRegression\nacc_tree = DecisionTreeClassifier(max_depth=3, random_state=0).fit(X_train, y_train).score(X_test, y_test)\nacc_lr = LogisticRegression(max_iter=1000).fit(X_train, y_train).score(X_test, y_test)\nwinner = 'tree' if acc_tree > acc_lr else 'logreg'\nprint(acc_tree, acc_lr, winner)",
   "hints": [
    "Екі модель де <code>.fit(X_train, y_train).score(X_test, y_test)</code>."
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\nfrom sklearn.tree import DecisionTreeClassifier as _DT\n_at = _DT(max_depth=3, random_state=0).fit(_Xtr, _ytr).score(_Xte, _yte)\n_al = _LogR(max_iter=1000).fit(_Xtr, _ytr).score(_Xte, _yte)\nassert abs(acc_tree - _at) < 1e-9, f'acc_tree ≈ {_at:.3f} болуы керек'\nassert abs(acc_lr - _al) < 0.02, f'acc_lr ≈ {_al:.3f} болуы керек'\nassert winner == ('tree' if acc_tree > acc_lr else 'logreg'), \"winner: 'tree' немесе 'logreg'\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ең жақсы бөлу нүктесі",
   "prompt": "<p>Ағаштың бір бөлуін қолмен табыңыз. <code>best_split(xs, ys)</code>: әр үміткер шек <code>t</code> (<code>xs</code>-тің ең үлкенінен басқа әр бірегей мәні) үшін деректі <code>x &lt;= t</code> және <code>x &gt; t</code> топтарына бөліп, салмақталған Gini есептеңіз: <code>(n_L·G_L + n_R·G_R) / n</code>. Ең кіші Gini беретін <code>t</code>-ны қайтарыңыз (теңдікте кішісін).</p><p>Мысалы, <code>best_split([1, 2, 3, 4], [0, 0, 1, 1])</code> → <code>2</code>.</p>",
   "starter": "def gini(labels):\n    n = len(labels)\n    return 1 - sum((labels.count(c) / n) ** 2 for c in set(labels))\n\ndef best_split(xs, ys):\n    pass\n",
   "solution": "def gini(labels):\n    n = len(labels)\n    return 1 - sum((labels.count(c) / n) ** 2 for c in set(labels))\n\ndef best_split(xs, ys):\n    n = len(xs)\n    best_t, best_g = None, None\n    for t in sorted(set(xs))[:-1]:\n        left = [y for x, y in zip(xs, ys) if x <= t]\n        right = [y for x, y in zip(xs, ys) if x > t]\n        g = (len(left) * gini(left) + len(right) * gini(right)) / n\n        if best_g is None or g < best_g:\n            best_t, best_g = t, g\n    return best_t\n\nprint(best_split([1, 2, 3, 4], [0, 0, 1, 1]))",
   "hints": [
    "Үміткерлер: <code>sorted(set(xs))[:-1]</code>",
    "Сол және оң топтардың <code>ys</code> тізімдерін жасап, <code>gini</code> шақырыңыз."
   ],
   "check": {
    "tests": "assert best_split([1, 2, 3, 4], [0, 0, 1, 1]) == 2, 'best_split([1, 2, 3, 4], [0, 0, 1, 1]) 2 қайтаруы керек'\nassert best_split([5, 1, 9, 3, 7], [1, 0, 1, 0, 1]) == 3, 'Реттелмеген xs: best_split([5, 1, 9, 3, 7], [1, 0, 1, 0, 1]) = 3'\nassert best_split([10, 20, 30, 40, 50, 60], [0, 0, 0, 1, 0, 1]) == 30, 'best_split([10, ..., 60], [0, 0, 0, 1, 0, 1]) = 30'\nassert best_split([1, 1, 2, 2], [0, 1, 0, 1]) == 1, 'Жалғыз үміткер шек 1'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Регрессия ағашының тереңдігі",
   "prompt": "<p>Бөлу дайын (<code>area_m2</code>, <code>rooms</code>, <code>year_built</code>). <code>max_depth</code> = 1, 2, …, 10 үшін <code>DecisionTreeRegressor(random_state=0)</code> test R²-ын <code>r2_by_depth</code>-ке жазыңыз. Ең жақсысын <code>best_depth</code>-ке жазыңыз. Шектеусіз ағаштың train R² мен test R² айырмасын <code>gap_none</code>-ға жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.tree import DecisionTreeRegressor\nX = flats[['area_m2', 'rooms', 'year_built']]\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\nr2_by_depth = {}\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.tree import DecisionTreeRegressor\nX = flats[['area_m2', 'rooms', 'year_built']]\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\nr2_by_depth = {}\nfor d in range(1, 11):\n    r2_by_depth[d] = DecisionTreeRegressor(max_depth=d, random_state=0).fit(X_train, y_train).score(X_test, y_test)\nbest_depth = max(r2_by_depth, key=r2_by_depth.get)\nfull = DecisionTreeRegressor(random_state=0).fit(X_train, y_train)\ngap_none = full.score(X_train, y_train) - full.score(X_test, y_test)\nprint(r2_by_depth, best_depth, round(gap_none, 3))",
   "hints": [
    "<code>for d in range(1, 11):</code>",
    "Шектеусіз ағаш: <code>DecisionTreeRegressor(random_state=0)</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\nfrom sklearn.tree import DecisionTreeRegressor as _DR\n_a, _b, _c, _d = _tts(_f[['area_m2', 'rooms', 'year_built']], _f['price_mln'], test_size=0.2, random_state=42)\n_r = {_k: _DR(max_depth=_k, random_state=0).fit(_a, _c).score(_b, _d) for _k in range(1, 11)}\n_full = _DR(random_state=0).fit(_a, _c)\nassert sorted(r2_by_depth) == list(range(1, 11)), 'Кілттер: 1, 2, ..., 10'\nassert all(abs(r2_by_depth[_k] - _r[_k]) < 1e-9 for _k in _r), 'Test R² мәндері дұрыс емес'\nassert best_depth == max(_r, key=_r.get), f'best_depth = {max(_r, key=_r.get)} болуы керек'\nassert abs(gap_none - (_full.score(_a, _c) - _full.score(_b, _d))) < 1e-9, 'gap_none = train R² − test R² (max_depth жоқ)'\nassert gap_none > 0.1, 'Шектеусіз ағаш train-ді жаттап алады: айырма үлкен'"
   }
  }
 ],
 "ml-10": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Регрессиядағы CV",
   "prompt": "<p><code>LinearRegression</code> үшін <code>cross_val_score</code>-ты <code>cv=5</code>-пен бүкіл <code>X</code> (<code>area_m2</code>, <code>rooms</code>, <code>year_built</code>), <code>y</code> (<code>price_mln</code>) деректе орындаңыз. Нәтижені <code>scores</code>-қа, орташасын <code>cv_mean</code>-ға жазыңыз (бұл R²).</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nX = flats[['area_m2', 'rooms', 'year_built']]\ny = flats['price_mln']\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nX = flats[['area_m2', 'rooms', 'year_built']]\ny = flats['price_mln']\nscores = cross_val_score(LinearRegression(), X, y, cv=5)\ncv_mean = scores.mean()\nprint(scores.round(3), round(cv_mean, 3))",
   "hints": [
    "<code>cross_val_score(LinearRegression(), X, y, cv=5)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nfrom sklearn.model_selection import cross_val_score as _cvs\nfrom sklearn.linear_model import LinearRegression as _LinR\n_s = _cvs(_LinR(), X, y, cv=5)\nassert len(scores) == 5, 'cv=5: 5 балл'\nassert _np.allclose(scores, _s), 'Баллдар дұрыс емес: cross_val_score(LinearRegression(), X, y, cv=5)'\nassert abs(cv_mean - _s.mean()) < 1e-9, 'cv_mean = scores.mean()'",
    "mustInclude": [
     "cross_val_score("
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "CV қорытындысы",
   "prompt": "<p><code>summarize(scores)</code> функциясы <code>(орташа, SD)</code> кортежін қайтарсын, екеуі де 3 таңбаға дейін дөңгелектелген (<code>np.std</code>, популяциялық).</p><p>Мысалы, <code>summarize([0.8, 0.7, 0.9])</code> → <code>(0.8, 0.082)</code>.</p>",
   "starter": "import numpy as np\n\ndef summarize(scores):\n    pass\n",
   "solution": "import numpy as np\n\ndef summarize(scores):\n    s = np.asarray(scores, dtype=float)\n    return (round(float(s.mean()), 3), round(float(s.std()), 3))\n\nprint(summarize([0.8, 0.7, 0.9]))",
   "hints": [
    "<code>round(float(s.mean()), 3)</code>",
    "Кортеж: <code>(a, b)</code>"
   ],
   "check": {
    "tests": "assert summarize([0.8, 0.7, 0.9]) == (0.8, 0.082), 'summarize([0.8, 0.7, 0.9]) (0.8, 0.082) қайтаруы керек'\nassert summarize([0.5, 0.5]) == (0.5, 0.0), 'Бірдей баллдар: SD = 0'\nassert summarize([0.61, 0.73, 0.68, 0.70, 0.66]) == (0.676, 0.04), 'summarize([0.61, 0.73, 0.68, 0.70, 0.66]) = (0.676, 0.04)'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Fold өлшемдері",
   "prompt": "<p><code>n</code> жолды <code>k</code> fold-қа бөлгенде әр fold өлшемі қандай? <code>fold_sizes(n, k)</code> тізім қайтарсын: алғашқы <code>n % k</code> fold-та бір жол артық.</p><p>Мысалы, <code>fold_sizes(10, 3)</code> → <code>[4, 3, 3]</code>.</p>",
   "starter": "def fold_sizes(n, k):\n    pass\n",
   "solution": "def fold_sizes(n, k):\n    base, extra = divmod(n, k)\n    return [base + 1 if i < extra else base for i in range(k)]\n\nprint(fold_sizes(10, 3), fold_sizes(600, 5))",
   "hints": [
    "<code>divmod(n, k)</code> бөлінді мен қалдықты береді."
   ],
   "check": {
    "tests": "assert fold_sizes(10, 3) == [4, 3, 3], 'fold_sizes(10, 3) [4, 3, 3] қайтаруы керек'\nassert fold_sizes(600, 5) == [120] * 5, 'fold_sizes(600, 5) = [120, 120, 120, 120, 120]'\nassert fold_sizes(7, 4) == [2, 2, 2, 1], 'fold_sizes(7, 4) = [2, 2, 2, 1]'\nassert sum(fold_sizes(403, 10)) == 403, 'Fold өлшемдерінің қосындысы n-ге тең'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "MAE бойынша CV",
   "prompt": "<p>CV-ді R² емес, MAE бойынша есептеңіз: <code>scoring='neg_mean_absolute_error'</code> (sklearn «үлкен — жақсы» болу үшін таңбасын ауыстырады). <code>LinearRegression</code>, <code>cv=5</code>. Оң MAE орташасын <code>cv_mae</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nX = flats[['area_m2', 'rooms', 'year_built']]\ny = flats['price_mln']\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nX = flats[['area_m2', 'rooms', 'year_built']]\ny = flats['price_mln']\nscores = cross_val_score(LinearRegression(), X, y, cv=5, scoring='neg_mean_absolute_error')\ncv_mae = -scores.mean()\nprint(round(cv_mae, 2))",
   "hints": [
    "<code>scoring='neg_mean_absolute_error'</code>",
    "<code>cv_mae = -scores.mean()</code>"
   ],
   "check": {
    "tests": "from sklearn.model_selection import cross_val_score as _cvs\nfrom sklearn.linear_model import LinearRegression as _LinR\n_m = -_cvs(_LinR(), X, y, cv=5, scoring='neg_mean_absolute_error').mean()\nassert cv_mae > 0, 'cv_mae оң сан болуы керек: минус таңбасын алып тастаңыз'\nassert abs(cv_mae - _m) < 1e-6, f'cv_mae ≈ {_m:.2f} млн ₸ болуы керек'",
    "mustInclude": [
     "neg_mean_absolute_error"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "KNN үшін k таңдау",
   "prompt": "<p><code>make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=k))</code> үшін <code>k</code> ∈ [1, 5, 15, 31] бойынша 5-fold CV орташа accuracy-ін <code>cv_by_k</code> сөздігіне жазыңыз. Ең жақсысын <code>best_k</code>-ға жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import cross_val_score\nchurn = pd.read_csv('churn.csv')\nX = churn[['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']]\ny = churn['churned']\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.neighbors import KNeighborsClassifier\ncv_by_k = {}\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import cross_val_score\nchurn = pd.read_csv('churn.csv')\nX = churn[['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']]\ny = churn['churned']\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.neighbors import KNeighborsClassifier\ncv_by_k = {}\nfor k in [1, 5, 15, 31]:\n    pipe = make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=k))\n    cv_by_k[k] = cross_val_score(pipe, X, y, cv=5).mean()\nbest_k = max(cv_by_k, key=cv_by_k.get)\nprint(cv_by_k, best_k)",
   "hints": [
    "Pipeline цикл ішінде жасалады.",
    "<code>cross_val_score(pipe, X, y, cv=5).mean()</code>"
   ],
   "check": {
    "tests": "from sklearn.model_selection import cross_val_score as _cvs\nfrom sklearn.pipeline import make_pipeline as _mp\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.neighbors import KNeighborsClassifier as _KC\n_r = {_k: _cvs(_mp(_SS(), _KC(n_neighbors=_k)), X, y, cv=5).mean() for _k in [1, 5, 15, 31]}\nassert sorted(cv_by_k) == [1, 5, 15, 31], 'cv_by_k кілттері: 1, 5, 15, 31'\nassert all(abs(cv_by_k[_k] - _r[_k]) < 1e-9 for _k in _r), 'CV орташалары дұрыс емес: масштабтау pipeline ішінде болсын'\nassert best_k == max(_r, key=_r.get), f'best_k = {max(_r, key=_r.get)} болуы керек'\nassert cv_by_k[1] < cv_by_k[best_k], 'k=1 — жоғары variance: ең жақсыдан нашар'",
    "mustInclude": [
     "make_pipeline(",
     "cross_val_score("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Train мен CV айырмасы",
   "prompt": "<p>Bias-variance-ті сандармен көріңіз. <code>max_depth</code> ∈ [2, 4, None] үшін <code>DecisionTreeClassifier(random_state=0)</code>: бүкіл X, y-де үйретілгендегі train accuracy мен 5-fold CV орташасының айырмасын <code>gaps</code> сөздігіне жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import cross_val_score\nchurn = pd.read_csv('churn.csv')\nX = churn[['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']]\ny = churn['churned']\nfrom sklearn.tree import DecisionTreeClassifier\ngaps = {}\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import cross_val_score\nchurn = pd.read_csv('churn.csv')\nX = churn[['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']]\ny = churn['churned']\nfrom sklearn.tree import DecisionTreeClassifier\ngaps = {}\nfor d in [2, 4, None]:\n    tree = DecisionTreeClassifier(max_depth=d, random_state=0)\n    train_acc = tree.fit(X, y).score(X, y)\n    cv_acc = cross_val_score(tree, X, y, cv=5).mean()\n    gaps[d] = train_acc - cv_acc\nprint(gaps)",
   "hints": [
    "Train accuracy: <code>tree.fit(X, y).score(X, y)</code>",
    "CV: <code>cross_val_score(tree, X, y, cv=5).mean()</code>"
   ],
   "check": {
    "tests": "from sklearn.model_selection import cross_val_score as _cvs\nfrom sklearn.tree import DecisionTreeClassifier as _DT\n_g = {_d: _DT(max_depth=_d, random_state=0).fit(X, y).score(X, y) - _cvs(_DT(max_depth=_d, random_state=0), X, y, cv=5).mean() for _d in [2, 4, None]}\nassert set(gaps) == {2, 4, None}, 'gaps кілттері: 2, 4, None'\nassert all(abs(gaps[_d] - _g[_d]) < 1e-9 for _d in _g), 'gap = train accuracy (бүкіл X, y) − CV орташасы'\nassert gaps[None] > gaps[2], 'Шектеусіз ағашта айырма ең үлкен (high variance)'",
    "mustInclude": [
     "cross_val_score("
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Қолмен 5-fold",
   "prompt": "<p>CV-ді қолмен жасаңыз. <code>idx = np.random.default_rng(0).permutation(len(flats))</code>, <code>folds = np.array_split(idx, 5)</code>. Әр fold үшін қалған жолдарда <code>LinearRegression</code> (<code>area_m2</code>, <code>rooms</code>, <code>year_built</code>) үйретіп, сол fold-тағы R²-ды <code>manual_scores</code> тізіміне жазыңыз. Орташасы — <code>manual_mean</code>.</p>",
   "starter": "import numpy as np\nimport pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nX = flats[['area_m2', 'rooms', 'year_built']]\ny = flats['price_mln']\nmanual_scores = []\n",
   "solution": "import numpy as np\nimport pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nX = flats[['area_m2', 'rooms', 'year_built']]\ny = flats['price_mln']\nmanual_scores = []\nidx = np.random.default_rng(0).permutation(len(flats))\nfolds = np.array_split(idx, 5)\nfor i in range(5):\n    test_idx = folds[i]\n    train_idx = np.concatenate([folds[j] for j in range(5) if j != i])\n    m = LinearRegression().fit(X.iloc[train_idx], y.iloc[train_idx])\n    manual_scores.append(m.score(X.iloc[test_idx], y.iloc[test_idx]))\nmanual_mean = np.mean(manual_scores)\nprint(np.round(manual_scores, 3), round(manual_mean, 3))",
   "hints": [
    "Train индекстері: <code>np.concatenate([folds[j] for j in range(5) if j != i])</code>",
    "Позиция бойынша таңдау: <code>X.iloc[train_idx]</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\n_fo = _np.array_split(_np.random.default_rng(0).permutation(400), 5)\n_s = []\nfor _i in range(5):\n    _tr = _np.concatenate([_fo[_j] for _j in range(5) if _j != _i])\n    _s.append(_LinR().fit(X.iloc[_tr], y.iloc[_tr]).score(X.iloc[_fo[_i]], y.iloc[_fo[_i]]))\nassert len(manual_scores) == 5, 'manual_scores-та 5 мән болуы керек'\nassert _np.allclose(manual_scores, _s), 'Fold баллдары дұрыс емес: fold i — test, қалғандары — train'\nassert abs(manual_mean - _np.mean(_s)) < 1e-9, 'manual_mean — 5 балдың орташасы'",
    "mustInclude": [
     "array_split("
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Үш модельді салыстыру",
   "prompt": "<p>One-hot <code>X</code> дайын. Үш модельдің 5-fold CV орташа R²-ын <code>cv_r2</code> сөздігіне жазыңыз: <code>'linear'</code> — <code>LinearRegression()</code>; <code>'tree'</code> — <code>DecisionTreeRegressor(max_depth=5, random_state=0)</code>; <code>'knn'</code> — <code>make_pipeline(StandardScaler(), KNeighborsRegressor(n_neighbors=5))</code>. Ең жақсысының атын <code>best_model</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.tree import DecisionTreeRegressor\nfrom sklearn.neighbors import KNeighborsRegressor\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nflats = pd.read_csv('flats.csv')\nX = pd.get_dummies(flats[['area_m2', 'rooms', 'year_built', 'district']], columns=['district'], drop_first=True, dtype=int)\ny = flats['price_mln']\ncv_r2 = {}\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.tree import DecisionTreeRegressor\nfrom sklearn.neighbors import KNeighborsRegressor\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nflats = pd.read_csv('flats.csv')\nX = pd.get_dummies(flats[['area_m2', 'rooms', 'year_built', 'district']], columns=['district'], drop_first=True, dtype=int)\ny = flats['price_mln']\ncv_r2 = {}\nmodels = {'linear': LinearRegression(), 'tree': DecisionTreeRegressor(max_depth=5, random_state=0), 'knn': make_pipeline(StandardScaler(), KNeighborsRegressor(n_neighbors=5))}\nfor name, m in models.items():\n    cv_r2[name] = cross_val_score(m, X, y, cv=5).mean()\nbest_model = max(cv_r2, key=cv_r2.get)\nprint(cv_r2, best_model)",
   "hints": [
    "Модельдерді сөздікке салып, цикл жасаңыз.",
    "<code>cross_val_score(m, X, y, cv=5).mean()</code>"
   ],
   "check": {
    "tests": "from sklearn.model_selection import cross_val_score as _cvs\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.tree import DecisionTreeRegressor as _DR\nfrom sklearn.neighbors import KNeighborsRegressor as _KR\nfrom sklearn.pipeline import make_pipeline as _mp\nfrom sklearn.preprocessing import StandardScaler as _SS\n_r = {'linear': _cvs(_LinR(), X, y, cv=5).mean(), 'tree': _cvs(_DR(max_depth=5, random_state=0), X, y, cv=5).mean(), 'knn': _cvs(_mp(_SS(), _KR(n_neighbors=5)), X, y, cv=5).mean()}\nassert set(cv_r2) == {'linear', 'tree', 'knn'}, \"cv_r2 кілттері: 'linear', 'tree', 'knn'\"\nassert all(abs(cv_r2[_k] - _r[_k]) < 1e-6 for _k in _r), 'CV R² мәндері дұрыс емес: cross_val_score(m, X, y, cv=5).mean()'\nassert best_model == max(_r, key=_r.get), f'best_model = {max(_r, key=_r.get)} болуы керек'",
    "mustInclude": [
     "cross_val_score("
    ]
   }
  }
 ]
});
