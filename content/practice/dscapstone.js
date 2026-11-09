// Practice tasks after the lessons of m5-3. Each lesson's list opens one task at a time.
DJ.addPractice('m5-3', {
 "dc-1": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жоғалған табыс",
   "prompt": "<p>Кеткен абоненттер компанияға қанша табыс жоғалтады? <code>lost_revenue(n_churn, fee, months)</code> функциясы <code>n_churn × fee × months</code> қайтарсын.</p><p>Мысалы, <code>lost_revenue(10, 6500, 12)</code> → <code>780000</code> ₸.</p>",
   "starter": "def lost_revenue(n_churn, fee, months):\n    pass\n",
   "solution": "def lost_revenue(n_churn, fee, months):\n    return n_churn * fee * months\n\nprint(lost_revenue(10, 6500, 12))",
   "hints": [
    "Үш санның көбейтіндісі."
   ],
   "check": {
    "tests": "assert lost_revenue(10, 6500, 12) == 780000, 'lost_revenue(10, 6500, 12) 780000 қайтаруы керек'\nassert lost_revenue(0, 6500, 12) == 0, 'Ешкім кетпесе: 0'\nassert lost_revenue(155, 3500, 6) == 3255000, 'lost_revenue(155, 3500, 6) = 3 255 000'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Науқан пайдасы",
   "prompt": "<p>Ретеншн науқаны: дұрыс ұсталған әр кетуші (TP) +10 000 ₸, бекерге жіберілген әр ұсыныс (FP) −2 000 ₸. <code>campaign_profit(tp, fp)</code> функциясы жалпы пайданы қайтарсын.</p><p>Мысалы, <code>campaign_profit(5, 10)</code> → <code>30000</code>.</p>",
   "starter": "def campaign_profit(tp, fp):\n    pass\n",
   "solution": "def campaign_profit(tp, fp):\n    return 10000 * tp - 2000 * fp\n\nprint(campaign_profit(5, 10))",
   "hints": [
    "<code>10000 * tp - 2000 * fp</code>"
   ],
   "check": {
    "tests": "assert campaign_profit(5, 10) == 30000, 'campaign_profit(5, 10) 30000 қайтаруы керек'\nassert campaign_profit(0, 3) == -6000, 'Тек FP болса пайда теріс: −6000'\nassert campaign_profit(39, 111) == 168000, 'Барлығына жіберу: 39 × 10000 − 111 × 2000 = 168000'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Шығын матрицасы",
   "prompt": "<p>Confusion matrix <code>cm = [[tn, fp], [fn, tp]]</code> және сол пішіндегі құн матрицасы <code>costs</code> берілген. <code>total_cost(cm, costs)</code> сәйкес элементтердің көбейтінділерінің қосындысын қайтарсын.</p><p>Мысалы, <code>total_cost([[100, 10], [5, 20]], [[0, 2000], [12000, 0]])</code> → <code>80000</code>.</p>",
   "starter": "import numpy as np\n\ndef total_cost(cm, costs):\n    pass\n",
   "solution": "import numpy as np\n\ndef total_cost(cm, costs):\n    return int((np.asarray(cm) * np.asarray(costs)).sum())\n\nprint(total_cost([[100, 10], [5, 20]], [[0, 2000], [12000, 0]]))",
   "hints": [
    "NumPy-да элемент бойынша көбейту: <code>np.asarray(cm) * np.asarray(costs)</code>"
   ],
   "check": {
    "tests": "assert total_cost([[100, 10], [5, 20]], [[0, 2000], [12000, 0]]) == 80000, 'total_cost([[100, 10], [5, 20]], [[0, 2000], [12000, 0]]) = 10×2000 + 5×12000 = 80000'\nassert total_cost([[50, 0], [0, 50]], [[0, 2000], [12000, 0]]) == 0, 'Қатесіз модель: 0'\nassert total_cost([[1, 1], [1, 1]], [[1, 2], [3, 4]]) == 10, 'Барлық элемент: 1 + 2 + 3 + 4 = 10'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Кімге ұсыныс жіберу",
   "prompt": "<p>Ұсыныстың күтілетін пайдасы: <code>p × SAVE × LOST − OFFER</code>. <code>worth_offer(probs, save, lost, offer)</code> функциясы күтілетін пайдасы оң абоненттердің <b>индекстерін</b> тізім ретінде қайтарсын.</p><p>Мысалы, <code>worth_offer([0.1, 0.5, 0.2, 0.9], 0.3, 40000, 2000)</code> → <code>[1, 2, 3]</code>.</p>",
   "starter": "def worth_offer(probs, save, lost, offer):\n    pass\n",
   "solution": "def worth_offer(probs, save, lost, offer):\n    return [i for i, p in enumerate(probs) if p * save * lost - offer > 0]\n\nprint(worth_offer([0.1, 0.5, 0.2, 0.9], 0.3, 40000, 2000))",
   "hints": [
    "<code>enumerate(probs)</code> индекс пен мәнді береді.",
    "Шарт: <code>p * save * lost - offer &gt; 0</code>"
   ],
   "check": {
    "tests": "assert worth_offer([0.1, 0.5, 0.2, 0.9], 0.3, 40000, 2000) == [1, 2, 3], 'worth_offer([0.1, 0.5, 0.2, 0.9], 0.3, 40000, 2000) [1, 2, 3] қайтаруы керек (0.2 × 12000 = 2400 > 2000)'\nassert worth_offer([0.1, 0.15], 0.3, 40000, 2000) == [], 'Бәрінің пайдасы теріс болса: бос тізім'\nassert worth_offer([0.3, 0.3], 0.5, 20000, 3000) == [], 'Пайда дәл 0 болса, жібермейміз: > 0'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жылдық шығын",
   "prompt": "<p>Деректегі кеткен абоненттер (<code>churned == 1</code>) бір жылда қанша төлем әкелер еді? <code>lost_year</code> = олардың <code>monthly_fee × 12</code> қосындысы (₸). Бір кетушінің орташа жылдық төлемін <code>avg_lost</code>-қа жазыңыз.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nchurners = df[df['churned'] == 1]\nlost_year = int((churners['monthly_fee'] * 12).sum())\navg_lost = lost_year / len(churners)\nprint(lost_year, round(avg_lost))",
   "hints": [
    "Сүзгі: <code>df[df['churned'] == 1]</code>",
    "<code>(churners['monthly_fee'] * 12).sum()</code>"
   ],
   "check": {
    "tests": "_c = df[df['churned'] == 1]\nassert int(lost_year) == int((_c['monthly_fee'] * 12).sum()), f\"lost_year = {int((_c['monthly_fee'] * 12).sum())} ₸ болуы керек\"\nassert abs(avg_lost - (_c['monthly_fee'] * 12).mean()) < 1e-6, 'avg_lost = lost_year / кетушілер саны'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Тариф бойынша шығын",
   "prompt": "<p>Әр тарифтің кетушілері жылына қанша табыс жоғалтады: <code>lost_by_plan</code> Series (индекс — тариф, мән — <code>monthly_fee × 12</code> қосындысы). Ең көп шығынды тарифті <code>biggest_plan</code>-ға жазыңыз.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nchurners = df[df['churned'] == 1]\nlost_by_plan = (churners['monthly_fee'] * 12).groupby(churners['plan']).sum()\nbiggest_plan = lost_by_plan.idxmax()\nprint(lost_by_plan, biggest_plan)",
   "hints": [
    "<code>(churners['monthly_fee'] * 12).groupby(churners['plan']).sum()</code>"
   ],
   "check": {
    "tests": "_c = df[df['churned'] == 1]\n_l = (_c['monthly_fee'] * 12).groupby(_c['plan']).sum()\nassert isinstance(lost_by_plan, pd.Series) and set(lost_by_plan.index) == {'basic', 'standard', 'premium'}, 'lost_by_plan — үш тариф бойынша Series'\nassert all(int(lost_by_plan[_p]) == int(_l[_p]) for _p in _l.index), 'Мәндер дұрыс емес: тек кетушілер, monthly_fee × 12'\nassert biggest_plan == _l.idxmax(), f'biggest_plan = {_l.idxmax()} болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Стратегияларды салыстыру",
   "prompt": "<p><code>compare(probs, y, gain, offer)</code> функциясы үш стратегияның нақты пайдасын сөздік етіп қайтарсын. Ұсыныс алған әр абонент үшін пайда: <code>y × gain − offer</code>.</p><ul><li><code>'none'</code> — ешкімге жібермеу (0);</li><li><code>'all'</code> — барлығына;</li><li><code>'model'</code> — <code>p × gain − offer &gt; 0</code> болатындарға ғана.</li></ul><p>Мысалы, <code>compare([0.9, 0.1, 0.6], [1, 0, 0], 10000, 2000)['model']</code> → <code>6000</code>.</p>",
   "starter": "def compare(probs, y, gain, offer):\n    pass\n",
   "solution": "def compare(probs, y, gain, offer):\n    res = {'none': 0, 'all': 0, 'model': 0}\n    for p, t in zip(probs, y):\n        v = t * gain - offer\n        res['all'] += v\n        if p * gain - offer > 0:\n            res['model'] += v\n    return res\n\nprint(compare([0.9, 0.1, 0.6], [1, 0, 0], 10000, 2000))",
   "hints": [
    "Бір цикл: <code>for p, t in zip(probs, y):</code>",
    "Нақты пайда <code>t * gain - offer</code>, ал таңдау <code>p * gain - offer &gt; 0</code> бойынша."
   ],
   "check": {
    "tests": "_r = compare([0.9, 0.1, 0.6], [1, 0, 0], 10000, 2000)\nassert isinstance(_r, dict) and set(_r) == {'none', 'all', 'model'}, \"Кілттер: 'none', 'all', 'model'\"\nassert _r == {'none': 0, 'all': 4000, 'model': 6000}, \"compare([0.9, 0.1, 0.6], [1, 0, 0], 10000, 2000) → {'none': 0, 'all': 4000, 'model': 6000}\"\n_q = compare([0.05, 0.1], [0, 1], 10000, 2000)\nassert _q['model'] == 0 and _q['all'] == 6000, 'Ешкімнің күтілетін пайдасы оң болмаса, model = 0'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Сезімталдық талдауы",
   "prompt": "<p>Ұсыныс бағасы өзгерсе, шешім қалай өзгереді? <code>SAVE = 0.3</code>, <code>LOST = 40000</code>. <code>OFFER</code> ∈ [1000, 2000, 4000] үшін нөлдік пайда шегін (<code>OFFER / (SAVE × LOST)</code>, 4 таңба) және <code>probs</code>-тағы одан жоғары ықтималдықтар санын <code>sens</code> сөздігіне <code>{offer: (breakeven, n_targets)}</code> түрінде жазыңыз.</p>",
   "starter": "import numpy as np\nSAVE, LOST = 0.3, 40000\nprobs = np.array([0.05, 0.12, 0.2, 0.31, 0.08, 0.45, 0.6, 0.15, 0.09, 0.72])\nsens = {}\n",
   "solution": "import numpy as np\nSAVE, LOST = 0.3, 40000\nprobs = np.array([0.05, 0.12, 0.2, 0.31, 0.08, 0.45, 0.6, 0.15, 0.09, 0.72])\nsens = {}\nfor offer in [1000, 2000, 4000]:\n    be = round(offer / (SAVE * LOST), 4)\n    sens[offer] = (be, int((probs > be).sum()))\nprint(sens)",
   "hints": [
    "<code>round(offer / (SAVE * LOST), 4)</code>",
    "<code>(probs &gt; be).sum()</code>"
   ],
   "check": {
    "tests": "assert sorted(sens) == [1000, 2000, 4000], 'sens кілттері: 1000, 2000, 4000'\nassert sens[1000] == (0.0833, 8), 'OFFER = 1000: шек 0.0833, 8 абонент'\nassert sens[2000] == (0.1667, 5), 'OFFER = 2000: шек 0.1667, 5 абонент'\nassert sens[4000] == (0.3333, 3), 'OFFER = 4000: шек 0.3333, 3 абонент'"
   }
  }
 ],
 "dc-2": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бос мән үлесі",
   "prompt": "<p>Әр бағандағы бос мәндердің <b>үлесін</b> <code>miss_share</code> Series-ке жазыңыз (<code>isna().mean()</code>). Үлесі ең үлкен бағанды <code>worst_col</code>-ға жазыңыз.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nmiss_share = df.isna().mean()\nworst_col = miss_share.idxmax()\nprint(miss_share.round(3), worst_col)",
   "hints": [
    "<code>df.isna().mean()</code> — әр бағандағы True үлесі."
   ],
   "check": {
    "tests": "assert isinstance(miss_share, pd.Series) and len(miss_share) == 10, 'miss_share — 10 баған бойынша Series'\nassert abs(miss_share['age'] - 25 / 600) < 1e-9 and abs(miss_share['data_gb'] - 17 / 600) < 1e-9, 'age үшін 25/600, data_gb үшін 17/600'\nassert worst_col == 'age', 'Ең көп бос мән — age'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қалалар бойынша саны",
   "prompt": "<p>Әр қаладағы абоненттер санын <code>city_counts</code>-қа (<code>value_counts()</code>), абоненттері ең көп қаланы <code>top_city</code>-ға, оның үлесін <code>top_share</code>-ға жазыңыз.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\ncity_counts = df['city'].value_counts()\ntop_city = city_counts.idxmax()\ntop_share = city_counts.max() / len(df)\nprint(city_counts, top_city, round(top_share, 3))",
   "hints": [
    "<code>df['city'].value_counts()</code>"
   ],
   "check": {
    "tests": "_v = df['city'].value_counts()\nassert int(city_counts.sum()) == 600 and len(city_counts) == 5, 'city_counts — 5 қала, қосындысы 600'\nassert top_city == _v.idxmax(), f'top_city = {_v.idxmax()} болуы керек'\nassert abs(top_share - _v.max() / 600) < 1e-9, 'top_share = ең көп саны / 600'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Төлем ауқымы",
   "prompt": "<p><code>monthly_fee</code> бағанының ең кіші мәнін <code>fee_min</code>-ге, ең үлкенін <code>fee_max</code>-қа, медианасын <code>fee_median</code>-ға жазыңыз.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nfee_min = df['monthly_fee'].min()\nfee_max = df['monthly_fee'].max()\nfee_median = df['monthly_fee'].median()\nprint(fee_min, fee_max, fee_median)",
   "hints": [
    "<code>.min()</code>, <code>.max()</code>, <code>.median()</code>"
   ],
   "check": {
    "tests": "assert fee_min == df['monthly_fee'].min() and fee_max == df['monthly_fee'].max(), 'fee_min, fee_max — min() және max()'\nassert fee_median == df['monthly_fee'].median(), 'fee_median — median()'\nassert fee_min == 3300 and fee_max == 11200, 'Төлемдер 3 300 ₸-ден 11 200 ₸-ге дейін'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қайталанған жолдар",
   "prompt": "<p>Деректің денсаулығы: <code>customer_id</code>-дегі қайталанулар санын <code>n_dup_ids</code>-ке, толық қайталанған жолдар санын <code>n_dup_rows</code>-қа жазыңыз (<code>duplicated().sum()</code>). Сосын бір жолды әдейі екі рет қосып (<code>df2</code>), <code>n_dup_rows2</code>-ні табыңыз.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nn_dup_ids = int(df['customer_id'].duplicated().sum())\nn_dup_rows = int(df.duplicated().sum())\ndf2 = pd.concat([df, df.iloc[[0]]], ignore_index=True)\nn_dup_rows2 = int(df2.duplicated().sum())\nprint(n_dup_ids, n_dup_rows, n_dup_rows2)",
   "hints": [
    "<code>df['customer_id'].duplicated().sum()</code>",
    "<code>pd.concat([df, df.iloc[[0]]], ignore_index=True)</code>"
   ],
   "check": {
    "tests": "assert n_dup_ids == 0 and n_dup_rows == 0, 'Бастапқы деректе қайталану жоқ: 0 және 0'\nassert len(df2) == 601, 'df2-де 601 жол болуы керек'\nassert n_dup_rows2 == 1, 'df2-де бір қайталанған жол'",
    "mustInclude": [
     "duplicated("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Тариф пен төлем сәйкестігі",
   "prompt": "<p>Әр тарифтің төлем ауқымын <code>fee_range</code> DataFrame-ге жазыңыз (<code>groupby('plan')['monthly_fee'].agg(['min', 'max'])</code>). Ауқымдар бір-бірімен қиылыса ма: <code>min</code> бойынша сұрыптап, бір тарифтің <code>max</code>-ы келесісінің <code>min</code>-інен үлкен не тең болса, <code>overlap = True</code>.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nfee_range = df.groupby('plan')['monthly_fee'].agg(['min', 'max']).sort_values('min')\noverlap = bool((fee_range['max'].values[:-1] >= fee_range['min'].values[1:]).any())\nprint(fee_range, overlap)",
   "hints": [
    "<code>.agg(['min', 'max']).sort_values('min')</code>",
    "Көршілерді салыстыру: <code>max[:-1] &gt;= min[1:]</code>"
   ],
   "check": {
    "tests": "assert isinstance(fee_range, pd.DataFrame) and {'min', 'max'} <= set(fee_range.columns) and len(fee_range) == 3, 'fee_range — min, max бағандары бар 3 жолды кесте'\nassert fee_range.loc['basic', 'max'] == 3700 and fee_range.loc['premium', 'min'] == 10800, 'basic max = 3700, premium min = 10800'\nassert overlap is False, 'Тарифтердің төлемдері қиылыспайды: overlap = False'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бос жастың churn-ы",
   "prompt": "<p>Бос мәндер кездейсоқ па? Жасы бос абоненттердің churn үлесін <code>rate_missing</code>-ке, жасы белгілілердікін <code>rate_known</code>-ға жазыңыз. Жасы бос абоненттер санын <code>n_missing_age</code>-ке жазыңыз.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nmiss = df['age'].isna()\nn_missing_age = int(miss.sum())\nrate_missing = df.loc[miss, 'churned'].mean()\nrate_known = df.loc[~miss, 'churned'].mean()\nprint(n_missing_age, round(rate_missing, 3), round(rate_known, 3))",
   "hints": [
    "Маска: <code>miss = df['age'].isna()</code>",
    "Керісінше: <code>~miss</code>"
   ],
   "check": {
    "tests": "_m = df['age'].isna()\nassert n_missing_age == 25, 'n_missing_age = 25'\nassert abs(rate_missing - df.loc[_m, 'churned'].mean()) < 1e-9, 'rate_missing — age бос жолдардағы churned орташасы'\nassert abs(rate_known - df.loc[~_m, 'churned'].mean()) < 1e-9, 'rate_known — age белгілі жолдардағы орташа (~ белгісі)'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Денсаулық есебі",
   "prompt": "<p><code>health_report(data)</code> функциясы кез келген DataFrame үшін сөздік қайтарсын: <code>'rows'</code>, <code>'cols'</code>, <code>'missing_total'</code> (барлық бос мәндер), <code>'dup_rows'</code> (толық қайталанған жолдар), <code>'worst_col'</code> (бос мәні ең көп баған, бос мән жоқ болса <code>None</code>).</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\n\ndef health_report(data):\n    pass\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\n\ndef health_report(data):\n    miss = data.isna().sum()\n    return {\n        'rows': len(data),\n        'cols': data.shape[1],\n        'missing_total': int(miss.sum()),\n        'dup_rows': int(data.duplicated().sum()),\n        'worst_col': miss.idxmax() if miss.sum() > 0 else None,\n    }\n\nprint(health_report(df))",
   "hints": [
    "<code>miss = data.isna().sum()</code>",
    "<code>miss.idxmax() if miss.sum() &gt; 0 else None</code>"
   ],
   "check": {
    "tests": "_r = health_report(df)\nassert isinstance(_r, dict) and set(_r) == {'rows', 'cols', 'missing_total', 'dup_rows', 'worst_col'}, 'Кілттер: rows, cols, missing_total, dup_rows, worst_col'\nassert (_r['rows'], _r['cols'], _r['missing_total'], _r['dup_rows'], _r['worst_col']) == (600, 10, 42, 0, 'age'), 'churn үшін: 600, 10, 42, 0, age'\n_t = pd.DataFrame({'a': [1, 1, 2], 'b': ['x', 'x', 'y']})\nassert health_report(_t) == {'rows': 3, 'cols': 2, 'missing_total': 0, 'dup_rows': 1, 'worst_col': None}, 'Бос мәнсіз кестеде worst_col = None, қайталанған жол 1'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "IQR шығарындылары",
   "prompt": "<p><code>data_gb</code> бағанында IQR ережесімен шығарындыларды табыңыз: <code>q1</code>, <code>q3</code> (<code>quantile</code>), <code>iqr = q3 − q1</code>; шекаралар <code>[q1 − 1.5·iqr, q3 + 1.5·iqr]</code>. Шекарадан тыс мәндер санын <code>n_outliers</code>-ке, олардың ішіндегі premium тариф үлесін <code>premium_share</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nq1 = df['data_gb'].quantile(0.25)\nq3 = df['data_gb'].quantile(0.75)\niqr = q3 - q1\nout = df[(df['data_gb'] < q1 - 1.5 * iqr) | (df['data_gb'] > q3 + 1.5 * iqr)]\nn_outliers = len(out)\npremium_share = (out['plan'] == 'premium').mean()\nprint(q1, q3, n_outliers, premium_share)",
   "hints": [
    "<code>df['data_gb'].quantile(0.25)</code>",
    "Екі шарт: <code>(a &lt; low) | (a &gt; high)</code>"
   ],
   "check": {
    "tests": "_q1, _q3 = df['data_gb'].quantile(0.25), df['data_gb'].quantile(0.75)\n_i = _q3 - _q1\n_o = df[(df['data_gb'] < _q1 - 1.5 * _i) | (df['data_gb'] > _q3 + 1.5 * _i)]\nassert abs(q1 - _q1) < 1e-9 and abs(q3 - _q3) < 1e-9, 'q1, q3 — 0.25 және 0.75 квантильдер'\nassert n_outliers == len(_o), f'n_outliers = {len(_o)} болуы керек'\nassert abs(premium_share - (_o['plan'] == 'premium').mean()) < 1e-9, 'premium_share — шығарындылар ішіндегі premium үлесі'",
    "mustInclude": [
     "quantile("
    ]
   }
  }
 ],
 "dc-3": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Келісімшарт үлесі",
   "prompt": "<p>Әр тарифте келісімшарты бар абоненттердің үлесін <code>contract_by_plan</code> Series-ке жазыңыз. Үлесі ең төмен тарифті <code>least_plan</code>-ға жазыңыз.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\ncontract_by_plan = df.groupby('plan')['has_contract'].mean()\nleast_plan = contract_by_plan.idxmin()\nprint(contract_by_plan.round(3), least_plan)",
   "hints": [
    "<code>df.groupby('plan')['has_contract'].mean()</code>",
    "<code>.idxmin()</code>"
   ],
   "check": {
    "tests": "_g = df.groupby('plan')['has_contract'].mean()\nassert isinstance(contract_by_plan, pd.Series) and all(abs(contract_by_plan[_p] - _g[_p]) < 1e-9 for _p in _g.index), \"contract_by_plan = df.groupby('plan')['has_contract'].mean()\"\nassert least_plan == _g.idxmin(), f'least_plan = {_g.idxmin()} болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қоңырау саны бойынша churn",
   "prompt": "<p>Әр <code>support_calls</code> мәні үшін churn үлесін <code>by_calls</code>-қа, абоненттер санын <code>n_by_calls</code>-қа жазыңыз. Кемінде 30 абоненті бар топтардың ішінде churn үлесі ең жоғары қоңырау санын <code>worst_calls</code>-қа жазыңыз.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nby_calls = df.groupby('support_calls')['churned'].mean()\nn_by_calls = df.groupby('support_calls')['churned'].size()\nworst_calls = by_calls[n_by_calls >= 30].idxmax()\nprint(by_calls.round(3), worst_calls)",
   "hints": [
    "<code>.size()</code> топ өлшемін береді.",
    "Сүзгі: <code>by_calls[n_by_calls &gt;= 30]</code>"
   ],
   "check": {
    "tests": "_g = df.groupby('support_calls')['churned']\nassert all(abs(by_calls[_k] - _g.mean()[_k]) < 1e-9 for _k in _g.mean().index), 'by_calls — қоңырау саны бойынша churned орташасы'\nassert all(int(n_by_calls[_k]) == int(_g.size()[_k]) for _k in _g.size().index), 'n_by_calls — әр топтағы абоненттер саны'\nassert worst_calls == 4, 'Кемінде 30 абоненті бар топтардың ең қауіптісі — 4 қоңырау'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жас топтары",
   "prompt": "<p><code>pd.cut</code> арқылы <code>age_band</code> бағанын жасаңыз: шекаралар <code>[17, 30, 45, 65]</code>, белгілер <code>'18-30'</code>, <code>'31-45'</code>, <code>'46-65'</code>. Әр топтағы churn үлесін <code>by_age</code>-ке жазыңыз (<code>observed=True</code>). Жасы бос жолдар топқа кірмейді.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\ndf['age_band'] = pd.cut(df['age'], bins=[17, 30, 45, 65], labels=['18-30', '31-45', '46-65'])\nby_age = df.groupby('age_band', observed=True)['churned'].mean()\nprint(by_age.round(3))",
   "hints": [
    "<code>pd.cut(df['age'], bins=[17, 30, 45, 65], labels=[...])</code>",
    "<code>groupby('age_band', observed=True)</code>"
   ],
   "check": {
    "tests": "_b = pd.cut(df['age'], bins=[17, 30, 45, 65], labels=['18-30', '31-45', '46-65'])\n_g = df['churned'].groupby(_b, observed=True).mean()\nassert 'age_band' in df.columns, 'df-ке age_band бағанын қосыңыз'\nassert [str(_i) for _i in by_age.index] == ['18-30', '31-45', '46-65'], 'Топтар: 18-30, 31-45, 46-65'\nassert all(abs(by_age.values - _g.values) < 1e-9), 'Churn үлестері дұрыс емес: шекаралар [17, 30, 45, 65]'",
    "mustInclude": [
     "pd.cut("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Мерзім және келісімшарт",
   "prompt": "<p><code>band</code> бағаны дайын. <code>pivot_table</code> арқылы <code>pivot</code> кестесін жасаңыз: жолдар — <code>band</code>, бағандар — <code>has_contract</code>, мәндер — <code>churned</code> орташасы (<code>observed=True</code>). Келісімшартсыз ең жаңа топтың (0-12, has_contract = 0) үлесін <code>new_no_contract</code>-қа жазыңыз.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\ndf['band'] = pd.cut(df['tenure_months'], bins=[0, 12, 24, 48, 72], labels=['0-12', '13-24', '25-48', '49-72'])\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\ndf['band'] = pd.cut(df['tenure_months'], bins=[0, 12, 24, 48, 72], labels=['0-12', '13-24', '25-48', '49-72'])\npivot = df.pivot_table(index='band', columns='has_contract', values='churned', aggfunc='mean', observed=True)\nnew_no_contract = pivot.loc['0-12', 0]\nprint(pivot.round(3))",
   "hints": [
    "<code>df.pivot_table(index='band', columns='has_contract', values='churned', aggfunc='mean', observed=True)</code>"
   ],
   "check": {
    "tests": "_p = df.pivot_table(index='band', columns='has_contract', values='churned', aggfunc='mean', observed=True)\nassert isinstance(pivot, pd.DataFrame) and pivot.shape == (4, 2), 'pivot пішіні (4, 2): 4 топ × келісімшарт 0/1'\nassert (abs(pivot.values - _p.values) < 1e-9).all(), \"Мәндер дұрыс емес: index='band', columns='has_contract', values='churned'\"\nassert abs(new_no_contract - _p.loc['0-12', 0]) < 1e-9 and new_no_contract > 0.5, \"new_no_contract = pivot.loc['0-12', 0]\"",
    "mustInclude": [
     "pivot_table("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қала мен тариф",
   "prompt": "<p>Қала × тариф бойынша churn үлесінің кестесін <code>city_plan</code>-ға жазыңыз (<code>pivot_table</code>, жолдар — <code>city</code>, бағандар — <code>plan</code>). Үлесі ең жоғары ұяшықты <code>(қала, тариф)</code> кортежі ретінде <code>worst_cell</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\ncity_plan = df.pivot_table(index='city', columns='plan', values='churned', aggfunc='mean')\nworst_cell = city_plan.stack().idxmax()\nprint(city_plan.round(2), worst_cell)",
   "hints": [
    "<code>city_plan.stack()</code> кестені (қала, тариф) индексті Series-ке айналдырады.",
    "Сосын <code>.idxmax()</code>"
   ],
   "check": {
    "tests": "_p = df.pivot_table(index='city', columns='plan', values='churned', aggfunc='mean')\nassert isinstance(city_plan, pd.DataFrame) and city_plan.shape == (5, 3), 'city_plan пішіні (5, 3)'\nassert tuple(worst_cell) == tuple(_p.stack().idxmax()), f'worst_cell = {_p.stack().idxmax()} болуы керек'",
    "mustInclude": [
     "pivot_table("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Тәуекел тобы",
   "prompt": "<p>Үш белгі бірге: жаңа (<code>tenure_months &lt;= 12</code>), жиі қоңырау шалатын (<code>support_calls &gt;= 3</code>) және келісімшартсыз (<code>has_contract == 0</code>). Осындай абоненттер санын <code>n_risky</code>-ге, олардың churn үлесін <code>risky_rate</code>-ке жазыңыз. Жалпы үлестен неше есе жоғары — <code>times</code>.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nrisky = df[(df['tenure_months'] <= 12) & (df['support_calls'] >= 3) & (df['has_contract'] == 0)]\nn_risky = len(risky)\nrisky_rate = risky['churned'].mean()\ntimes = risky_rate / df['churned'].mean()\nprint(n_risky, round(risky_rate, 3), round(times, 2))",
   "hints": [
    "Әр шартты жақшаға алыңыз: <code>(a) &amp; (b) &amp; (c)</code>"
   ],
   "check": {
    "tests": "_r = df[(df['tenure_months'] <= 12) & (df['support_calls'] >= 3) & (df['has_contract'] == 0)]\nassert n_risky == len(_r), f'n_risky = {len(_r)} болуы керек: үш шарт & арқылы'\nassert abs(risky_rate - _r['churned'].mean()) < 1e-9, 'risky_rate — топтағы churned орташасы'\nassert abs(times - _r['churned'].mean() / df['churned'].mean()) < 1e-9 and times > 2, 'times = risky_rate / жалпы үлес'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Lift есептеу",
   "prompt": "<p>Lift — топтың churn үлесі жалпы үлестен неше есе жоғары. <code>band</code> бойынша <code>lift</code> Series жасаңыз (<code>observed=True</code>). Lift-і ең жоғары топты <code>top_band</code>-қа, lift-і 1-ден кіші топтарды <code>safe_bands</code> тізіміне жазыңыз.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\ndf['band'] = pd.cut(df['tenure_months'], bins=[0, 12, 24, 48, 72], labels=['0-12', '13-24', '25-48', '49-72'])\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\ndf['band'] = pd.cut(df['tenure_months'], bins=[0, 12, 24, 48, 72], labels=['0-12', '13-24', '25-48', '49-72'])\noverall = df['churned'].mean()\nlift = df.groupby('band', observed=True)['churned'].mean() / overall\ntop_band = lift.idxmax()\nsafe_bands = [str(b) for b in lift[lift < 1].index]\nprint(lift.round(2), top_band, safe_bands)",
   "hints": [
    "<code>df.groupby('band', observed=True)['churned'].mean() / overall</code>",
    "Сүзгі: <code>lift[lift &lt; 1].index</code>"
   ],
   "check": {
    "tests": "_l = df.groupby('band', observed=True)['churned'].mean() / df['churned'].mean()\nassert isinstance(lift, pd.Series) and len(lift) == 4 and all(abs(lift.values - _l.values) < 1e-9), 'lift = топ үлесі / жалпы үлес'\nassert str(top_band) == str(_l.idxmax()), f'top_band = {_l.idxmax()} болуы керек'\nassert sorted(str(_b) for _b in safe_bands) == sorted(str(_b) for _b in _l[_l < 1].index), f'safe_bands = {[str(_b) for _b in _l[_l < 1].index]}'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ереже baseline-ы",
   "prompt": "<p>EDA-дан қарапайым ереже: «<code>tenure_months &lt;= 12</code> <b>немесе</b> <code>support_calls &gt;= 3</code> болса — кетеді». Бүкіл деректе <code>flag</code> (0/1) жасап, sklearn-сіз TP, FP, FN санап, <code>rule_precision</code> мен <code>rule_recall</code>-ды есептеңіз.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nflag = ((df['tenure_months'] <= 12) | (df['support_calls'] >= 3)).astype(int)\nyt = df['churned']\ntp = int(((flag == 1) & (yt == 1)).sum())\nfp = int(((flag == 1) & (yt == 0)).sum())\nfn = int(((flag == 0) & (yt == 1)).sum())\nrule_precision = tp / (tp + fp)\nrule_recall = tp / (tp + fn)\nprint(tp, fp, fn, round(rule_precision, 3), round(rule_recall, 3))",
   "hints": [
    "«Немесе»: <code>(a) | (b)</code>",
    "TP: <code>((flag == 1) &amp; (yt == 1)).sum()</code>"
   ],
   "check": {
    "tests": "from sklearn.metrics import precision_score as _ps, recall_score as _rs\n_f = ((df['tenure_months'] <= 12) | (df['support_calls'] >= 3)).astype(int)\nassert len(flag) == 600 and int(flag.sum()) == int(_f.sum()), 'flag: tenure_months <= 12 НЕМЕСЕ support_calls >= 3 (| белгісі)'\nassert abs(rule_precision - _ps(df['churned'], _f)) < 1e-9, 'rule_precision = tp / (tp + fp)'\nassert abs(rule_recall - _rs(df['churned'], _f)) < 1e-9, 'rule_recall = tp / (tp + fn)'"
   }
  }
 ],
 "dc-4": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Үлестерді тексеру",
   "prompt": "<p>Бөлу дайын. Train-дегі churn үлесін <code>train_rate</code>-ке, test-тегіні <code>test_rate</code>-ке, test-тегі кетушілер санын <code>n_test_churn</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\ntrain_rate = y_train.mean()\ntest_rate = y_test.mean()\nn_test_churn = int(y_test.sum())\nprint(round(train_rate, 3), round(test_rate, 3), n_test_churn)",
   "hints": [
    "<code>y_test.sum()</code> — бірліктер саны."
   ],
   "check": {
    "tests": "assert abs(train_rate - y_train.mean()) < 1e-9 and abs(test_rate - y_test.mean()) < 1e-9, 'Үлестер: y_train.mean(), y_test.mean()'\nassert n_test_churn == 39, 'Test-те 39 кетуші'\nassert abs(train_rate - test_rate) < 0.01, 'stratify=y: үлестер бірдейге жуық'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Кездейсоқ baseline",
   "prompt": "<p><code>DummyClassifier(strategy='stratified', random_state=0)</code> кластарды үлестеріне қарай кездейсоқ болжайды. Оны <code>dummy</code> атымен train-де үйретіп, test-те <code>acc_strat</code> пен <code>rec_strat</code> есептеңіз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.dummy import DummyClassifier\nfrom sklearn.metrics import accuracy_score, recall_score, precision_score, roc_auc_score\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.dummy import DummyClassifier\nfrom sklearn.metrics import accuracy_score, recall_score, precision_score, roc_auc_score\ndummy = DummyClassifier(strategy='stratified', random_state=0).fit(X_train, y_train)\npred = dummy.predict(X_test)\nacc_strat = accuracy_score(y_test, pred)\nrec_strat = recall_score(y_test, pred)\nprint(acc_strat, round(rec_strat, 3))",
   "hints": [
    "<code>DummyClassifier(strategy='stratified', random_state=0).fit(X_train, y_train)</code>"
   ],
   "check": {
    "tests": "from sklearn.dummy import DummyClassifier as _D\n_p = _D(strategy='stratified', random_state=0).fit(X_train, y_train).predict(X_test)\nassert isinstance(dummy, DummyClassifier) and dummy.strategy == 'stratified', \"dummy — strategy='stratified'\"\nassert abs(acc_strat - (_p == y_test.values).mean()) < 1e-9, 'acc_strat дұрыс емес: random_state=0'\nassert abs(rec_strat - _p[y_test.values == 1].mean()) < 1e-9, 'rec_strat дұрыс емес'",
    "mustInclude": [
     "DummyClassifier("
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Prior baseline-ның AUC-ы",
   "prompt": "<p><code>DummyClassifier(strategy='prior')</code> әр абонентке бірдей ықтималдық (train үлесі) береді. Оны train-де үйретіп, test-тегі ықтималдықтарды <code>p_prior</code>-ға, ROC AUC-ты <code>auc_prior</code>-ға жазыңыз. Неліктен 0.5?</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.dummy import DummyClassifier\nfrom sklearn.metrics import accuracy_score, recall_score, precision_score, roc_auc_score\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.dummy import DummyClassifier\nfrom sklearn.metrics import accuracy_score, recall_score, precision_score, roc_auc_score\ndummy = DummyClassifier(strategy='prior').fit(X_train, y_train)\np_prior = dummy.predict_proba(X_test)[:, 1]\nauc_prior = roc_auc_score(y_test, p_prior)\nprint(p_prior[:3], auc_prior)",
   "hints": [
    "<code>dummy.predict_proba(X_test)[:, 1]</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nassert len(p_prior) == 150 and _np.allclose(p_prior, y_train.mean()), 'p_prior — барлығына бірдей: y_train.mean()'\nassert abs(auc_prior - 0.5) < 1e-9, 'Бірдей ұпайлар абоненттерді ажыратпайды: AUC = 0.5'",
    "mustInclude": [
     "DummyClassifier("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ереже test-те",
   "prompt": "<p>Test-те «<code>tenure_months &lt;= 12</code> → кетеді» ережесін тексеріңіз: <code>pred_rule</code> (0/1), <code>rec_rule</code>, <code>prec_rule</code>.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.dummy import DummyClassifier\nfrom sklearn.metrics import accuracy_score, recall_score, precision_score, roc_auc_score\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.dummy import DummyClassifier\nfrom sklearn.metrics import accuracy_score, recall_score, precision_score, roc_auc_score\npred_rule = (X_test['tenure_months'] <= 12).astype(int)\nrec_rule = recall_score(y_test, pred_rule)\nprec_rule = precision_score(y_test, pred_rule)\nprint(round(rec_rule, 3), round(prec_rule, 3))",
   "hints": [
    "<code>(X_test['tenure_months'] &lt;= 12).astype(int)</code>"
   ],
   "check": {
    "tests": "from sklearn.metrics import recall_score as _rs, precision_score as _ps\n_r = (X_test['tenure_months'] <= 12).astype(int)\nassert len(pred_rule) == 150 and int(pred_rule.sum()) == int(_r.sum()), 'pred_rule: X_test-тегі tenure_months <= 12'\nassert abs(rec_rule - _rs(y_test, _r)) < 1e-9 and abs(prec_rule - _ps(y_test, _r)) < 1e-9, 'rec_rule, prec_rule: recall_score, precision_score (y_test, pred_rule)'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бір белгілі модель",
   "prompt": "<p>Күшті baseline: тек <code>tenure_months</code> белгісімен <code>LogisticRegression()</code>. Оны <code>one</code> атымен train-де үйретіп, test ROC AUC-ты <code>auc_one</code>-ға жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.dummy import DummyClassifier\nfrom sklearn.metrics import accuracy_score, recall_score, precision_score, roc_auc_score\nfrom sklearn.linear_model import LogisticRegression\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.dummy import DummyClassifier\nfrom sklearn.metrics import accuracy_score, recall_score, precision_score, roc_auc_score\nfrom sklearn.linear_model import LogisticRegression\none = LogisticRegression().fit(X_train[['tenure_months']], y_train)\nauc_one = roc_auc_score(y_test, one.predict_proba(X_test[['tenure_months']])[:, 1])\nprint(round(auc_one, 3))",
   "hints": [
    "<code>X_train[['tenure_months']]</code> (екі жақша)",
    "<code>roc_auc_score(y_test, one.predict_proba(...)[:, 1])</code>"
   ],
   "check": {
    "tests": "from sklearn.metrics import roc_auc_score as _ra\nassert one.n_features_in_ == 1, 'one тек бір белгімен: tenure_months'\n_a = _ra(y_test, -X_test['tenure_months'])\nassert abs(auc_one - _a) < 1e-9, f'auc_one ≈ {_a:.3f} болуы керек (бір белгіде AUC тек ретке тәуелді)'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Baseline кестесі",
   "prompt": "<p>Презентацияға baseline кестесін жасаңыз: <code>baselines</code> DataFrame, индекс — <code>'majority'</code> (бәріне 0) және <code>'rule'</code> (<code>tenure_months &lt;= 12</code>), бағандар — <code>accuracy</code>, <code>recall</code>, <code>precision</code> (test-те, <code>zero_division=0</code>).</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.dummy import DummyClassifier\nfrom sklearn.metrics import accuracy_score, recall_score, precision_score, roc_auc_score\nimport numpy as np\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.dummy import DummyClassifier\nfrom sklearn.metrics import accuracy_score, recall_score, precision_score, roc_auc_score\nimport numpy as np\npreds = {'majority': np.zeros(len(y_test), dtype=int), 'rule': (X_test['tenure_months'] <= 12).astype(int).values}\nrows = {}\nfor name, p in preds.items():\n    rows[name] = {'accuracy': accuracy_score(y_test, p), 'recall': recall_score(y_test, p), 'precision': precision_score(y_test, p, zero_division=0)}\nbaselines = pd.DataFrame(rows).T\nprint(baselines.round(3))",
   "hints": [
    "Сөздіктер сөздігінен: <code>pd.DataFrame(rows).T</code>",
    "<code>precision_score(..., zero_division=0)</code>"
   ],
   "check": {
    "tests": "from sklearn.metrics import accuracy_score as _as, recall_score as _rs, precision_score as _ps\n_r = (X_test['tenure_months'] <= 12).astype(int)\nassert isinstance(baselines, pd.DataFrame) and set(baselines.index) == {'majority', 'rule'}, \"Индекс: 'majority', 'rule'\"\nassert {'accuracy', 'recall', 'precision'} <= set(baselines.columns), 'Бағандар: accuracy, recall, precision'\nassert abs(baselines.loc['majority', 'accuracy'] - 0.74) < 1e-9 and baselines.loc['majority', 'recall'] == 0 and baselines.loc['majority', 'precision'] == 0, 'majority: accuracy 0.74, recall 0, precision 0'\nassert abs(baselines.loc['rule', 'recall'] - _rs(y_test, _r)) < 1e-9 and abs(baselines.loc['rule', 'precision'] - _ps(y_test, _r)) < 1e-9 and abs(baselines.loc['rule', 'accuracy'] - _as(y_test, _r)) < 1e-9, 'rule жолы дұрыс емес'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ережені train-де үйрену",
   "prompt": "<p>Ереже шегін деректен таңдаңыз. <code>k</code> ∈ <code>range(3, 49, 3)</code> үшін «<code>tenure_months &lt;= k</code>» ережесінің <b>train</b>-дегі F1-ін <code>f1_by_k</code>-ға жазыңыз (<code>f1_score</code>). Ең жақсы <code>best_k</code>-ны тауып, сол ереженің test F1-ін <code>test_f1</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.metrics import f1_score\nf1_by_k = {}\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.metrics import f1_score\nf1_by_k = {}\nfor k in range(3, 49, 3):\n    f1_by_k[k] = f1_score(y_train, (X_train['tenure_months'] <= k).astype(int))\nbest_k = max(f1_by_k, key=f1_by_k.get)\ntest_f1 = f1_score(y_test, (X_test['tenure_months'] <= best_k).astype(int))\nprint(best_k, round(f1_by_k[best_k], 3), round(test_f1, 3))",
   "hints": [
    "Цикл: <code>for k in range(3, 49, 3):</code>",
    "Таңдау train-де, бағалау test-те бір рет."
   ],
   "check": {
    "tests": "from sklearn.metrics import f1_score as _f1\n_r = {_k: _f1(y_train, (X_train['tenure_months'] <= _k).astype(int)) for _k in range(3, 49, 3)}\n_b = max(_r, key=_r.get)\nassert sorted(f1_by_k) == list(range(3, 49, 3)), 'Кілттер: 3, 6, ..., 48'\nassert all(abs(f1_by_k[_k] - _r[_k]) < 1e-9 for _k in _r), 'F1 мәндері дұрыс емес: тек train деректе'\nassert best_k == _b, f'best_k = {_b} болуы керек'\nassert abs(test_f1 - _f1(y_test, (X_test['tenure_months'] <= _b).astype(int))) < 1e-9, 'test_f1 — таңдалған k-мен test-те F1'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Бөлудің әсері",
   "prompt": "<p>Бір белгілі baseline-ның (<code>LogisticRegression()</code>, тек <code>tenure_months</code>) test AUC-ы бөлуге қаншалықты тәуелді? <code>random_state</code> = 0…4 үшін (<code>test_size=0.25</code>, <code>stratify=y</code>) test AUC-ты <code>aucs</code> тізіміне жазыңыз. Орташасын <code>auc_mean</code>-ға, SD-ін <code>auc_std</code>-ға (<code>np.std</code>) жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nimport numpy as np\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import roc_auc_score\naucs = []\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nimport numpy as np\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import roc_auc_score\naucs = []\nfor rs in range(5):\n    a, b, c, d = train_test_split(X[['tenure_months']], y, test_size=0.25, stratify=y, random_state=rs)\n    m = LogisticRegression().fit(a, c)\n    aucs.append(roc_auc_score(d, m.predict_proba(b)[:, 1]))\nauc_mean = np.mean(aucs)\nauc_std = np.std(aucs)\nprint(np.round(aucs, 3), round(auc_mean, 3), round(auc_std, 3))",
   "hints": [
    "Әр айналымда жаңа бөлу және жаңа модель.",
    "<code>np.mean</code>, <code>np.std</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nfrom sklearn.metrics import roc_auc_score as _ra\nfrom sklearn.model_selection import train_test_split as _tts\n_a = []\nfor _rs in range(5):\n    _x1, _x2, _y1, _y2 = _tts(X[['tenure_months']], y, test_size=0.25, stratify=y, random_state=_rs)\n    _a.append(_ra(_y2, -_x2['tenure_months']))\nassert len(aucs) == 5 and _np.allclose(aucs, _a), 'AUC мәндері дұрыс емес: random_state = 0, 1, 2, 3, 4'\nassert abs(auc_mean - _np.mean(_a)) < 1e-9 and abs(auc_std - _np.std(_a)) < 1e-9, 'auc_mean = np.mean(aucs), auc_std = np.std(aucs)'",
    "mustInclude": [
     "train_test_split("
    ]
   }
  }
 ],
 "dc-5": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Pipeline дәлдігі",
   "prompt": "<p><code>pre</code> дайын. <code>pipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])</code> құрып, train-де үйретіңіз. Test accuracy-ді <code>acc_lr</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = None\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nacc_lr = pipe.score(X_test, y_test)\nprint(round(acc_lr, 3))",
   "hints": [
    "<code>pipe.fit(X_train, y_train)</code>",
    "<code>pipe.score(X_test, y_test)</code>"
   ],
   "check": {
    "tests": "from sklearn.pipeline import Pipeline as _P\nassert isinstance(pipe, _P) and hasattr(pipe.named_steps['model'], 'coef_'), \"pipe — үйретілген Pipeline, қадамдар 'pre' және 'model'\"\nassert abs(acc_lr - pipe.score(X_test, y_test)) < 1e-9 and 0.7 < acc_lr < 0.9, 'acc_lr = pipe.score(X_test, y_test)'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Белгі аттары",
   "prompt": "<p><code>pipe</code> үйретілген. <code>pre</code> қадамы шығаратын белгі аттарын <code>names</code> тізіміне жазыңыз (<code>named_steps['pre'].get_feature_names_out()</code>). Олардың санын <code>n_features</code>-ке жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nnames = list(pipe.named_steps['pre'].get_feature_names_out())\nn_features = len(names)\nprint(n_features, names)",
   "hints": [
    "<code>pipe.named_steps['pre']</code>"
   ],
   "check": {
    "tests": "assert n_features == 9, 'n_features = 9: 6 сандық + 3 тариф'\nassert list(names) == list(pipe.named_steps['pre'].get_feature_names_out()), 'names — get_feature_names_out() нәтижесі'\nassert 'cat__plan_premium' in names, 'Тариф бағандары cat__plan_... деп аталады'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ықтималдықтар шолуы",
   "prompt": "<p><code>proba</code> дайын. Ең кіші және ең үлкен ықтималдықты <code>p_min</code>, <code>p_max</code>-қа, 0.5-тен жоғары не тең ықтималдықтар санын <code>n_high</code>-ға жазыңыз. <code>n_high</code> <code>pipe.predict(X_test).sum()</code>-ке тең болуы керек.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\np_min = proba.min()\np_max = proba.max()\nn_high = int((proba >= 0.5).sum())\nprint(round(p_min, 3), round(p_max, 3), n_high, pipe.predict(X_test).sum())",
   "hints": [
    "<code>(proba &gt;= 0.5).sum()</code>"
   ],
   "check": {
    "tests": "assert abs(p_min - proba.min()) < 1e-12 and abs(p_max - proba.max()) < 1e-12, 'p_min, p_max — proba.min(), proba.max()'\nassert n_high == int(pipe.predict(X_test).sum()), 'n_high = (proba >= 0.5).sum(): predict 0.5 шегін қолданады'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Теңгерімді салмақ",
   "prompt": "<p>Екінші Pipeline <code>pipe_bal</code>: сол <code>pre</code> + <code>LogisticRegression(max_iter=1000, class_weight='balanced')</code>. Test recall-ды <code>rec_plain</code> (<code>pipe</code>) мен <code>rec_bal</code>-ға, ескертулер санын <code>n_plain</code> мен <code>n_bal</code>-ға жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\npipe_bal = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000, class_weight='balanced'))]).fit(X_train, y_train)\nrec_plain = recall_score(y_test, pipe.predict(X_test))\nrec_bal = recall_score(y_test, pipe_bal.predict(X_test))\nn_plain = int(pipe.predict(X_test).sum())\nn_bal = int(pipe_bal.predict(X_test).sum())\nprint(round(rec_plain, 3), round(rec_bal, 3), n_plain, n_bal)",
   "hints": [
    "Жаңа Pipeline, сол <code>pre</code>.",
    "<code>recall_score(y_test, model.predict(X_test))</code>"
   ],
   "check": {
    "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre(_cat=None):\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), _cat or ['plan'])])\nfrom sklearn.metrics import recall_score as _rs\n_b = _Pl([('pre', _pre()), ('model', _LR(max_iter=1000, class_weight='balanced'))]).fit(X_train, y_train)\nassert pipe_bal.named_steps['model'].class_weight == 'balanced', \"pipe_bal-да class_weight='balanced'\"\nassert abs(rec_bal - _rs(y_test, _b.predict(X_test))) < 1e-9 and abs(rec_plain - _rs(y_test, pipe.predict(X_test))) < 1e-9, 'Recall мәндері дұрыс емес'\nassert n_bal == int(_b.predict(X_test).sum()) and n_bal > n_plain, 'balanced модель көбірек ескерту береді'\nassert rec_bal > rec_plain, 'balanced модельдің recall-ы жоғары'",
    "mustInclude": [
     "class_weight='balanced'"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Регуляризация күші",
   "prompt": "<p><code>C</code> — регуляризацияға кері сан (кіші C — қатты шектеу). <code>C</code> ∈ [0.01, 1, 100] үшін Pipeline (<code>pre</code> + <code>LogisticRegression(C=C, max_iter=1000)</code>) үйретіп, test AUC-ты <code>auc_by_C</code>-ге, коэффициенттер модульдерінің қосындысын <code>coef_size</code>-ке жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\nauc_by_C = {}\ncoef_size = {}\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\nauc_by_C = {}\ncoef_size = {}\nfor C in [0.01, 1, 100]:\n    m = Pipeline([('pre', pre), ('model', LogisticRegression(C=C, max_iter=1000))]).fit(X_train, y_train)\n    auc_by_C[C] = roc_auc_score(y_test, m.predict_proba(X_test)[:, 1])\n    coef_size[C] = abs(m.named_steps['model'].coef_).sum()\nprint(auc_by_C, coef_size)",
   "hints": [
    "Цикл: <code>for C in [0.01, 1, 100]:</code>",
    "<code>abs(m.named_steps['model'].coef_).sum()</code>"
   ],
   "check": {
    "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre(_cat=None):\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), _cat or ['plan'])])\nfrom sklearn.metrics import roc_auc_score as _ra\n_m = _Pl([('pre', _pre()), ('model', _LR(C=0.01, max_iter=1000))]).fit(X_train, y_train)\nassert sorted(auc_by_C) == [0.01, 1, 100] and sorted(coef_size) == [0.01, 1, 100], 'Кілттер: 0.01, 1, 100'\nassert abs(auc_by_C[0.01] - _ra(y_test, _m.predict_proba(X_test)[:, 1])) < 1e-6, 'C=0.01 үшін AUC дұрыс емес'\nassert abs(coef_size[0.01] - abs(_m.named_steps['model'].coef_).sum()) < 1e-6, 'coef_size = abs(coef_).sum()'\nassert coef_size[0.01] < coef_size[1] < coef_size[100], 'C кішірейген сайын коэффициенттер кішірейеді'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қаланы белгі ету",
   "prompt": "<p>Қала модельге көмектесе ме? <code>X2 = df[num + ['plan', 'city']]</code> жасап, сол параметрлермен бөліңіз (<code>test_size=0.25</code>, <code>stratify=y</code>, <code>random_state=0</code>). <code>cat2 = ['plan', 'city']</code> бойынша жаңа <code>pre2</code> мен Pipeline құрып, test AUC-ты <code>auc_city</code>-ге жазыңыз. Бастапқы модельдің AUC-ы — <code>auc_base</code>.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\nauc_base = roc_auc_score(y_test, proba)\nX2 = df[num + ['plan', 'city']]\nX2_train, X2_test, _, _ = train_test_split(X2, y, test_size=0.25, stratify=y, random_state=0)\npre2 = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), ['plan', 'city']),\n])\npipe2 = Pipeline([('pre', pre2), ('model', LogisticRegression(max_iter=1000))]).fit(X2_train, y_train)\nauc_city = roc_auc_score(y_test, pipe2.predict_proba(X2_test)[:, 1])\nprint(round(auc_base, 4), round(auc_city, 4))",
   "hints": [
    "Бөлу бірдей болады: сол <code>y</code>, <code>stratify</code>, <code>random_state</code>.",
    "Жаңа ColumnTransformer-ге <code>['plan', 'city']</code> беріңіз."
   ],
   "check": {
    "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre(_cat=None):\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), _cat or ['plan'])])\nfrom sklearn.metrics import roc_auc_score as _ra\nfrom sklearn.model_selection import train_test_split as _tts\n_a, _b, _c, _d = _tts(df[num + ['plan', 'city']], y, test_size=0.25, stratify=y, random_state=0)\n_m = _Pl([('pre', _pre(['plan', 'city'])), ('model', _LR(max_iter=1000))]).fit(_a, _c)\n_ac = _ra(_d, _m.predict_proba(_b)[:, 1])\nassert abs(auc_base - _ra(y_test, proba)) < 1e-9, 'auc_base — бастапқы pipe-тың test AUC-ы'\nassert abs(auc_city - _ac) < 1e-6, f'auc_city ≈ {_ac:.4f} болуы керек: cat2 = [\"plan\", \"city\"], бөлу бірдей'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Калибрлеуді тексеру",
   "prompt": "<p>Ықтималдықтарға сенуге бола ма? Test-те <code>proba</code>-ны <code>pd.cut</code> арқылы топтарға бөліңіз: шекаралар <code>[0, 0.1, 0.2, 0.4, 0.6, 1]</code>. <code>calib</code> DataFrame: индекс — топ, бағандар <code>mean_proba</code> (топтағы орташа ықтималдық), <code>churn_rate</code> (нақты үлес), <code>n</code> (абоненттер саны). <code>observed=True</code> қолданыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nt = pd.DataFrame({'proba': proba, 'y': y_test.values})\nt['bin'] = pd.cut(t['proba'], bins=[0, 0.1, 0.2, 0.4, 0.6, 1])\ncalib = t.groupby('bin', observed=True).agg(mean_proba=('proba', 'mean'), churn_rate=('y', 'mean'), n=('y', 'size'))\nprint(calib.round(3))",
   "hints": [
    "Алдымен кесте: <code>pd.DataFrame({'proba': proba, 'y': y_test.values})</code>",
    "Атаулы агрегация: <code>.agg(mean_proba=('proba', 'mean'), ...)</code>"
   ],
   "check": {
    "tests": "_t = pd.DataFrame({'proba': proba, 'y': y_test.values})\n_t['bin'] = pd.cut(_t['proba'], bins=[0, 0.1, 0.2, 0.4, 0.6, 1])\n_g = _t.groupby('bin', observed=True).agg(mean_proba=('proba', 'mean'), churn_rate=('y', 'mean'), n=('y', 'size'))\nassert isinstance(calib, pd.DataFrame) and {'mean_proba', 'churn_rate', 'n'} <= set(calib.columns), 'calib бағандары: mean_proba, churn_rate, n'\nassert len(calib) == len(_g) and int(calib['n'].sum()) == 150, 'Барлық 150 test абонент топтарға кіруі керек'\nassert (abs(calib['mean_proba'].values - _g['mean_proba'].values) < 1e-9).all() and (abs(calib['churn_rate'].values - _g['churn_rate'].values) < 1e-9).all(), 'Мәндер дұрыс емес: шекаралар [0, 0.1, 0.2, 0.4, 0.6, 1]'\nassert calib['churn_rate'].iloc[-1] > calib['churn_rate'].iloc[0], 'Жоғары ықтималдық тобында нақты үлес те жоғары'",
    "mustInclude": [
     "pd.cut("
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "CV мен test сәйкестігі",
   "prompt": "<p>Train-де <code>pipe</code>-тың 5-fold ROC AUC-ын есептеп (<code>cross_val_score</code>), орташасын <code>cv_mean</code>-ға, SD-ін <code>cv_std</code>-ға жазыңыз. Test AUC — <code>test_auc</code>. Test нәтижесі <code>cv_mean ± 2·cv_std</code> аралығына түсе ме — <code>consistent</code> (bool).</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\nfrom sklearn.model_selection import cross_val_score\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\nfrom sklearn.model_selection import cross_val_score\nscores = cross_val_score(pipe, X_train, y_train, cv=5, scoring='roc_auc')\ncv_mean = scores.mean()\ncv_std = scores.std()\ntest_auc = roc_auc_score(y_test, proba)\nconsistent = bool(abs(test_auc - cv_mean) <= 2 * cv_std)\nprint(round(cv_mean, 3), round(cv_std, 3), round(test_auc, 3), consistent)",
   "hints": [
    "<code>cross_val_score(pipe, X_train, y_train, cv=5, scoring='roc_auc')</code>",
    "<code>bool(abs(a - b) &lt;= 2 * s)</code>"
   ],
   "check": {
    "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre(_cat=None):\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), _cat or ['plan'])])\nfrom sklearn.model_selection import cross_val_score as _cvs\nfrom sklearn.metrics import roc_auc_score as _ra\n_s = _cvs(_Pl([('pre', _pre()), ('model', _LR(max_iter=1000))]), X_train, y_train, cv=5, scoring='roc_auc')\nassert abs(cv_mean - _s.mean()) < 1e-6 and abs(cv_std - _s.std()) < 1e-6, \"cv_mean, cv_std: cross_val_score(pipe, X_train, y_train, cv=5, scoring='roc_auc')\"\nassert abs(test_auc - _ra(y_test, proba)) < 1e-9, 'test_auc — proba бойынша'\nassert consistent == bool(abs(test_auc - cv_mean) <= 2 * cv_std), 'consistent = |test_auc − cv_mean| ≤ 2·cv_std'",
    "mustInclude": [
     "cross_val_score("
    ]
   }
  }
 ],
 "dc-6": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Орман Pipeline-ы",
   "prompt": "<p><code>rf</code> Pipeline-ы дайын (50 ағаш). Оны train-де үйретіп, test ROC AUC-ты <code>auc_rf</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\nrf = Pipeline([('pre', pre), ('model', RandomForestClassifier(n_estimators=50, random_state=0))])\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\nrf = Pipeline([('pre', pre), ('model', RandomForestClassifier(n_estimators=50, random_state=0))])\nrf.fit(X_train, y_train)\nauc_rf = roc_auc_score(y_test, rf.predict_proba(X_test)[:, 1])\nprint(round(auc_rf, 3))",
   "hints": [
    "<code>rf.predict_proba(X_test)[:, 1]</code>"
   ],
   "check": {
    "tests": "assert hasattr(rf.named_steps['model'], 'estimators_'), 'rf үйретілмеген: rf.fit(X_train, y_train)'\nassert abs(auc_rf - roc_auc_score(y_test, rf.predict_proba(X_test)[:, 1])) < 1e-9 and 0.7 < auc_rf < 0.9, 'auc_rf — predict_proba бойынша test AUC'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Орман не маңызды деп санайды",
   "prompt": "<p><code>rf</code> үйретілген. <code>feature_importances_</code>-ты белгі аттарымен (<code>pre</code>-нің <code>get_feature_names_out()</code>) <code>imp</code> Series-ке жазыңыз, кему ретімен. Ең маңыздысын <code>top</code>-қа жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\nrf = Pipeline([('pre', pre), ('model', RandomForestClassifier(n_estimators=50, random_state=0))])\nrf.fit(X_train, y_train)\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\nrf = Pipeline([('pre', pre), ('model', RandomForestClassifier(n_estimators=50, random_state=0))])\nrf.fit(X_train, y_train)\nnames = rf.named_steps['pre'].get_feature_names_out()\nimp = pd.Series(rf.named_steps['model'].feature_importances_, index=names).sort_values(ascending=False)\ntop = imp.index[0]\nprint(imp.round(3))",
   "hints": [
    "<code>rf.named_steps['model'].feature_importances_</code>"
   ],
   "check": {
    "tests": "_i = pd.Series(rf.named_steps['model'].feature_importances_, index=rf.named_steps['pre'].get_feature_names_out())\nassert isinstance(imp, pd.Series) and len(imp) == 9, 'imp — 9 белгі бойынша Series'\nassert list(imp.values) == sorted(imp.values, reverse=True), 'Кему ретімен сұрыптаңыз'\nassert top == _i.idxmax(), f'top = {_i.idxmax()} болуы керек'",
    "mustInclude": [
     "feature_importances_"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Орманның CV баллдары",
   "prompt": "<p><code>rf</code>-тың train-дегі 3-fold ROC AUC баллдарын <code>scores</code>-қа, орташасын <code>cv_mean</code>-ға жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\nrf = Pipeline([('pre', pre), ('model', RandomForestClassifier(n_estimators=50, random_state=0))])\nfrom sklearn.model_selection import cross_val_score\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\nrf = Pipeline([('pre', pre), ('model', RandomForestClassifier(n_estimators=50, random_state=0))])\nfrom sklearn.model_selection import cross_val_score\nscores = cross_val_score(rf, X_train, y_train, cv=3, scoring='roc_auc')\ncv_mean = scores.mean()\nprint(scores.round(3), round(cv_mean, 3))",
   "hints": [
    "<code>cross_val_score(rf, X_train, y_train, cv=3, scoring='roc_auc')</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nassert len(scores) == 3, 'cv=3: 3 балл'\nassert abs(cv_mean - _np.mean(scores)) < 1e-12 and 0.7 < cv_mean < 0.9, \"cv_mean = scores.mean() ≈ 0.8; scoring='roc_auc'\"",
    "mustInclude": [
     "cross_val_score("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жапырақ өлшемі торы",
   "prompt": "<p><code>GridSearchCV(rf, {'model__min_samples_leaf': [1, 5, 20]}, cv=3, scoring='roc_auc')</code>-ты <code>grid</code> атымен train-де үйретіңіз. Ең жақсы мәнді <code>best_leaf</code>-ке, CV AUC-ты <code>best_auc</code>-қа, test AUC-ты (<code>grid.score</code>) <code>test_auc</code>-қа жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\nrf = Pipeline([('pre', pre), ('model', RandomForestClassifier(n_estimators=50, random_state=0))])\nfrom sklearn.model_selection import GridSearchCV\ngrid = None\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\nrf = Pipeline([('pre', pre), ('model', RandomForestClassifier(n_estimators=50, random_state=0))])\nfrom sklearn.model_selection import GridSearchCV\ngrid = GridSearchCV(rf, {'model__min_samples_leaf': [1, 5, 20]}, cv=3, scoring='roc_auc').fit(X_train, y_train)\nbest_leaf = grid.best_params_['model__min_samples_leaf']\nbest_auc = grid.best_score_\ntest_auc = grid.score(X_test, y_test)\nprint(best_leaf, round(best_auc, 3), round(test_auc, 3))",
   "hints": [
    "Параметр аты: <code>'model__min_samples_leaf'</code>"
   ],
   "check": {
    "tests": "from sklearn.model_selection import GridSearchCV as _G\nassert isinstance(grid, _G) and hasattr(grid, 'best_params_') and len(grid.cv_results_['params']) == 3, 'grid — 3 мәнді үйретілген GridSearchCV'\nassert grid.scoring == 'roc_auc', \"scoring='roc_auc'\"\nassert best_leaf == grid.best_params_['model__min_samples_leaf'] and abs(best_auc - grid.best_score_) < 1e-12, 'best_leaf, best_auc — grid-тің ең жақсы нәтижесі'\nassert abs(test_auc - grid.score(X_test, y_test)) < 1e-9, 'test_auc = grid.score(X_test, y_test)'",
    "mustInclude": [
     "GridSearchCV("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Boosting-пен салыстыру",
   "prompt": "<p>Үшінші үміткер: <code>pre</code> + <code>HistGradientBoostingClassifier(max_iter=100, learning_rate=0.05, random_state=0)</code>. Оның және логистикалық Pipeline-ның train-дегі 3-fold ROC AUC орташаларын <code>cv_hgb</code>, <code>cv_lr</code>-ге жазыңыз. Жақсысын <code>better</code>-ге: <code>'boosting'</code> немесе <code>'logreg'</code>.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\nfrom sklearn.ensemble import HistGradientBoostingClassifier\nfrom sklearn.model_selection import cross_val_score\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\nfrom sklearn.ensemble import HistGradientBoostingClassifier\nfrom sklearn.model_selection import cross_val_score\nhgb = Pipeline([('pre', pre), ('model', HistGradientBoostingClassifier(max_iter=100, learning_rate=0.05, random_state=0))])\nlr = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\ncv_hgb = cross_val_score(hgb, X_train, y_train, cv=3, scoring='roc_auc').mean()\ncv_lr = cross_val_score(lr, X_train, y_train, cv=3, scoring='roc_auc').mean()\nbetter = 'boosting' if cv_hgb > cv_lr else 'logreg'\nprint(round(cv_hgb, 3), round(cv_lr, 3), better)",
   "hints": [
    "Екі Pipeline да <code>pre</code>-ден басталады.",
    "<code>cross_val_score(..., cv=3, scoring='roc_auc').mean()</code>"
   ],
   "check": {
    "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre(_cat=None):\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), _cat or ['plan'])])\nfrom sklearn.model_selection import cross_val_score as _cvs\n_l = _cvs(_Pl([('pre', _pre()), ('model', _LR(max_iter=1000))]), X_train, y_train, cv=3, scoring='roc_auc').mean()\nassert abs(cv_lr - _l) < 1e-6, f\"cv_lr ≈ {_l:.4f} болуы керек: cv=3, scoring='roc_auc', X_train\"\nassert 0.7 < cv_hgb < 0.9, f'cv_hgb ≈ 0.78 болуы керек, сізде {cv_hgb:.3f}'\nassert better == ('boosting' if cv_hgb > cv_lr else 'logreg'), \"better: 'boosting' немесе 'logreg'\"",
    "mustInclude": [
     "HistGradientBoostingClassifier("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Орманның тұрақтылығы",
   "prompt": "<p>Орманның нәтижесі кездейсоқтыққа қаншалықты тәуелді? <code>random_state</code> ∈ [0, 1, 2] үшін <code>pre</code> + <code>RandomForestClassifier(n_estimators=50, random_state=rs)</code> үйретіп, test AUC-ты <code>aucs</code> тізіміне жазыңыз. <code>spread = max(aucs) - min(aucs)</code>.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\naucs = []\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\naucs = []\nfor rs in [0, 1, 2]:\n    m = Pipeline([('pre', pre), ('model', RandomForestClassifier(n_estimators=50, random_state=rs))]).fit(X_train, y_train)\n    aucs.append(roc_auc_score(y_test, m.predict_proba(X_test)[:, 1]))\nspread = max(aucs) - min(aucs)\nprint([round(a, 3) for a in aucs], round(spread, 3))",
   "hints": [
    "Цикл: <code>for rs in [0, 1, 2]:</code>"
   ],
   "check": {
    "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre(_cat=None):\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), _cat or ['plan'])])\nfrom sklearn.ensemble import RandomForestClassifier as _RF\nfrom sklearn.metrics import roc_auc_score as _ra\n_m = _Pl([('pre', _pre()), ('model', _RF(n_estimators=50, random_state=1))]).fit(X_train, y_train)\nassert len(aucs) == 3, 'aucs-та 3 мән'\nassert abs(aucs[1] - _ra(y_test, _m.predict_proba(X_test)[:, 1])) < 1e-9, 'random_state=1 үшін AUC дұрыс емес (реті: 0, 1, 2)'\nassert abs(spread - (max(aucs) - min(aucs))) < 1e-12 and spread > 0, 'spread = max(aucs) - min(aucs)'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Үш модель кестесі",
   "prompt": "<p>Модельдерді таңдау кестесі <code>table</code>: индекс — <code>'logreg'</code>, <code>'forest'</code> (50 ағаш, <code>random_state=0</code>), <code>'boosting'</code> (<code>HistGradientBoostingClassifier(max_iter=100, learning_rate=0.05, random_state=0)</code>); бағандар — <code>cv_auc</code> (train-де 3-fold) және <code>test_auc</code>. Таңдау тек CV бойынша: <code>chosen</code> — <code>cv_auc</code> ең жоғары модель.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\nfrom sklearn.ensemble import HistGradientBoostingClassifier\nfrom sklearn.model_selection import cross_val_score\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\nfrom sklearn.ensemble import HistGradientBoostingClassifier\nfrom sklearn.model_selection import cross_val_score\nmodels = {\n    'logreg': LogisticRegression(max_iter=1000),\n    'forest': RandomForestClassifier(n_estimators=50, random_state=0),\n    'boosting': HistGradientBoostingClassifier(max_iter=100, learning_rate=0.05, random_state=0),\n}\nrows = {}\nfor name, est in models.items():\n    p = Pipeline([('pre', pre), ('model', est)])\n    cv = cross_val_score(p, X_train, y_train, cv=3, scoring='roc_auc').mean()\n    p.fit(X_train, y_train)\n    rows[name] = {'cv_auc': cv, 'test_auc': roc_auc_score(y_test, p.predict_proba(X_test)[:, 1])}\ntable = pd.DataFrame(rows).T\nchosen = table['cv_auc'].idxmax()\nprint(table.round(3), chosen)",
   "hints": [
    "Модельдер сөздігі және цикл; әр модельді жаңа Pipeline-ға салыңыз.",
    "<code>pd.DataFrame(rows).T</code>"
   ],
   "check": {
    "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre(_cat=None):\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), _cat or ['plan'])])\nfrom sklearn.metrics import roc_auc_score as _ra\n_l = _Pl([('pre', _pre()), ('model', _LR(max_iter=1000))]).fit(X_train, y_train)\nassert isinstance(table, pd.DataFrame) and set(table.index) == {'logreg', 'forest', 'boosting'}, \"Индекс: 'logreg', 'forest', 'boosting'\"\nassert {'cv_auc', 'test_auc'} <= set(table.columns), 'Бағандар: cv_auc, test_auc'\nassert abs(table.loc['logreg', 'test_auc'] - _ra(y_test, _l.predict_proba(X_test)[:, 1])) < 1e-6, 'logreg test_auc дұрыс емес'\nassert ((table['cv_auc'] > 0.7) & (table['cv_auc'] < 0.9)).all(), 'cv_auc мәндері 0.7–0.9'\nassert chosen == table['cv_auc'].idxmax(), 'chosen — cv_auc ең жоғары модель (test бойынша таңдамаңыз)'",
    "mustInclude": [
     "cross_val_score("
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Overfitting белгісі",
   "prompt": "<p>Терең орман train-ді жаттап алады. <code>max_depth</code> ∈ [3, None] үшін <code>pre</code> + <code>RandomForestClassifier(n_estimators=50, max_depth=d, random_state=0)</code>: train AUC мен test AUC айырмасын <code>gaps</code> сөздігіне (кілт — <code>d</code>), test AUC-ты <code>test_aucs</code>-қа жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\ngaps = {}\ntest_aucs = {}\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\ngaps = {}\ntest_aucs = {}\nfor d in [3, None]:\n    m = Pipeline([('pre', pre), ('model', RandomForestClassifier(n_estimators=50, max_depth=d, random_state=0))]).fit(X_train, y_train)\n    tr = roc_auc_score(y_train, m.predict_proba(X_train)[:, 1])\n    te = roc_auc_score(y_test, m.predict_proba(X_test)[:, 1])\n    gaps[d] = tr - te\n    test_aucs[d] = te\nprint(gaps, test_aucs)",
   "hints": [
    "Train AUC: <code>roc_auc_score(y_train, m.predict_proba(X_train)[:, 1])</code>"
   ],
   "check": {
    "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre(_cat=None):\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), _cat or ['plan'])])\nfrom sklearn.ensemble import RandomForestClassifier as _RF\nfrom sklearn.metrics import roc_auc_score as _ra\n_m = _Pl([('pre', _pre()), ('model', _RF(n_estimators=50, max_depth=None, random_state=0))]).fit(X_train, y_train)\n_g = _ra(y_train, _m.predict_proba(X_train)[:, 1]) - _ra(y_test, _m.predict_proba(X_test)[:, 1])\nassert set(gaps) == {3, None} and set(test_aucs) == {3, None}, 'Кілттер: 3, None'\nassert abs(gaps[None] - _g) < 1e-9, f'max_depth=None үшін айырма ≈ {_g:.3f}: train AUC − test AUC'\nassert gaps[None] > gaps[3], 'Терең орманда train/test айырмасы үлкенірек'"
   }
  }
 ],
 "dc-7": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бір ұсыныс құны",
   "prompt": "<p>Кету ықтималдығы <code>p</code> абонентке ұсыныс жіберудің күтілетін пайдасы: <code>p × 10000 − (1 − p) × 2000</code> (TP +10 000 ₸, FP −2 000 ₸). <code>offer_value(p)</code> функциясын жазыңыз.</p><p>Мысалы, <code>offer_value(0.5)</code> → <code>4000</code>.</p>",
   "starter": "def offer_value(p):\n    pass\n",
   "solution": "def offer_value(p):\n    return p * 10000 - (1 - p) * 2000\n\nprint(offer_value(0.5), offer_value(1 / 6))",
   "hints": [
    "<code>p * 10000 - (1 - p) * 2000</code>"
   ],
   "check": {
    "tests": "assert offer_value(0.5) is not None and abs(offer_value(0.5) - 4000) < 1e-9, 'offer_value(0.5) 4000 қайтаруы керек'\nassert abs(offer_value(0)) - 2000 < 1e-9 and offer_value(0) < 0, 'p = 0: −2000'\nassert abs(offer_value(1 / 6)) < 1e-9, 'Нөлдік нүкте: p = 1/6 ≈ 0.167'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Шекпен ұсыныс саны",
   "prompt": "<p><code>proba</code> дайын. 0.3 шекпен ұсыныс алатындар санын <code>n_offers</code>-ке, олардың ішіндегі нақты кетушілер санын <code>n_hits</code>-ке жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nflag = proba >= 0.3\nn_offers = int(flag.sum())\nn_hits = int(y_test.values[flag].sum())\nprint(n_offers, n_hits)",
   "hints": [
    "Маска: <code>flag = proba &gt;= 0.3</code>",
    "<code>y_test.values[flag].sum()</code>"
   ],
   "check": {
    "tests": "_f = proba >= 0.3\nassert n_offers == int(_f.sum()), f'n_offers = {int(_f.sum())} болуы керек'\nassert n_hits == int(y_test.values[_f].sum()), f'n_hits = {int(y_test.values[_f].sum())} болуы керек: ұсыныс алғандардың ішіндегі кетушілер'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Үш шектің пайдасы",
   "prompt": "<p><code>profit</code> функциясы мен <code>proba</code> дайын. Шек ∈ [0.2, 0.3, 0.5] үшін test пайдасын <code>profits</code> сөздігіне жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nimport numpy as np\n\ndef profit(y_true, y_pred):\n    y_true = np.asarray(y_true)\n    y_pred = np.asarray(y_pred)\n    tp = ((y_pred == 1) & (y_true == 1)).sum()\n    fp = ((y_pred == 1) & (y_true == 0)).sum()\n    return int(10000 * tp - 2000 * fp)\n\nprofits = {}\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nimport numpy as np\n\ndef profit(y_true, y_pred):\n    y_true = np.asarray(y_true)\n    y_pred = np.asarray(y_pred)\n    tp = ((y_pred == 1) & (y_true == 1)).sum()\n    fp = ((y_pred == 1) & (y_true == 0)).sum()\n    return int(10000 * tp - 2000 * fp)\n\nprofits = {}\nfor t in [0.2, 0.3, 0.5]:\n    profits[t] = profit(y_test, (proba >= t).astype(int))\nprint(profits)",
   "hints": [
    "<code>profit(y_test, (proba &gt;= t).astype(int))</code>"
   ],
   "check": {
    "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\nassert sorted(profits) == [0.2, 0.3, 0.5], 'Кілттер: 0.2, 0.3, 0.5'\nassert all(profits[_t] == _profit(y_test, (proba >= _t).astype(int)) for _t in profits), 'Пайда дұрыс емес: profit(y_test, (proba >= t).astype(int))'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Күтілетін және нақты пайда",
   "prompt": "<p>Ықтималдық бойынша шешім: күтілетін пайдасы оң абоненттерге ғана ұсыныс (<code>proba × 10000 − (1 − proba) × 2000 &gt; 0</code>). Солардың күтілетін пайда қосындысын <code>expected</code>-ке, test-тегі нақты пайданы (<code>profit</code>) <code>realized</code>-ке жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nimport numpy as np\n\ndef profit(y_true, y_pred):\n    y_true = np.asarray(y_true)\n    y_pred = np.asarray(y_pred)\n    tp = ((y_pred == 1) & (y_true == 1)).sum()\n    fp = ((y_pred == 1) & (y_true == 0)).sum()\n    return int(10000 * tp - 2000 * fp)\n\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nimport numpy as np\n\ndef profit(y_true, y_pred):\n    y_true = np.asarray(y_true)\n    y_pred = np.asarray(y_pred)\n    tp = ((y_pred == 1) & (y_true == 1)).sum()\n    fp = ((y_pred == 1) & (y_true == 0)).sum()\n    return int(10000 * tp - 2000 * fp)\n\nev = proba * 10000 - (1 - proba) * 2000\nsend = (ev > 0).astype(int)\nexpected = ev[ev > 0].sum()\nrealized = profit(y_test, send)\nprint(round(expected), realized)",
   "hints": [
    "<code>ev = proba * 10000 - (1 - proba) * 2000</code>",
    "<code>profit(y_test, (ev &gt; 0).astype(int))</code>"
   ],
   "check": {
    "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\n_ev = proba * 10000 - (1 - proba) * 2000\nassert abs(expected - _ev[_ev > 0].sum()) < 1e-6, 'expected — оң күтілетін пайдалардың қосындысы'\nassert realized == _profit(y_test, (_ev > 0).astype(int)), 'realized — сол абоненттерге жібергендегі нақты пайда'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бюджет: 40 ұсыныс",
   "prompt": "<p>Бюджет тек 40 ұсынысқа жетеді. Test-те ықтималдығы ең жоғары 40 абонентке жібергендегі пайданы <code>profit_top40</code>-қа жазыңыз. Салыстыру үшін 0.5 шегіндегі пайда — <code>profit_05</code>.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nimport numpy as np\n\ndef profit(y_true, y_pred):\n    y_true = np.asarray(y_true)\n    y_pred = np.asarray(y_pred)\n    tp = ((y_pred == 1) & (y_true == 1)).sum()\n    fp = ((y_pred == 1) & (y_true == 0)).sum()\n    return int(10000 * tp - 2000 * fp)\n\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nimport numpy as np\n\ndef profit(y_true, y_pred):\n    y_true = np.asarray(y_true)\n    y_pred = np.asarray(y_pred)\n    tp = ((y_pred == 1) & (y_true == 1)).sum()\n    fp = ((y_pred == 1) & (y_true == 0)).sum()\n    return int(10000 * tp - 2000 * fp)\n\norder = np.argsort(-proba)\nsend = np.zeros(len(proba), dtype=int)\nsend[order[:40]] = 1\nprofit_top40 = profit(y_test, send)\nprofit_05 = profit(y_test, (proba >= 0.5).astype(int))\nprint(profit_top40, profit_05)",
   "hints": [
    "<code>np.argsort(-proba)[:40]</code> — ең жоғары 40 индекс.",
    "0/1 массив жасап, сол индекстерге 1 қойыңыз."
   ],
   "check": {
    "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\n_s = _np.zeros(len(proba), dtype=int)\n_s[_np.argsort(-proba)[:40]] = 1\nassert profit_top40 == _profit(y_test, _s), f'profit_top40 = {_profit(y_test, _s)} ₸ болуы керек: ең жоғары 40 ықтималдық'\nassert profit_05 == _profit(y_test, (proba >= 0.5).astype(int)), 'profit_05 — 0.5 шегіндегі пайда'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Шектер кестесі",
   "prompt": "<p>Презентацияға кесте: <code>table</code> DataFrame, индекс — шек <code>[0.1, 0.2, 0.3, 0.4, 0.5]</code>, бағандар <code>offers</code> (ұсыныс саны), <code>hits</code> (ұсталған кетушілер), <code>profit</code> (₸). Пайдасы ең жоғары шекті <code>best_row</code>-ға жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nimport numpy as np\n\ndef profit(y_true, y_pred):\n    y_true = np.asarray(y_true)\n    y_pred = np.asarray(y_pred)\n    tp = ((y_pred == 1) & (y_true == 1)).sum()\n    fp = ((y_pred == 1) & (y_true == 0)).sum()\n    return int(10000 * tp - 2000 * fp)\n\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nimport numpy as np\n\ndef profit(y_true, y_pred):\n    y_true = np.asarray(y_true)\n    y_pred = np.asarray(y_pred)\n    tp = ((y_pred == 1) & (y_true == 1)).sum()\n    fp = ((y_pred == 1) & (y_true == 0)).sum()\n    return int(10000 * tp - 2000 * fp)\n\nrows = []\nfor t in [0.1, 0.2, 0.3, 0.4, 0.5]:\n    pred = (proba >= t).astype(int)\n    rows.append({'threshold': t, 'offers': int(pred.sum()), 'hits': int(((pred == 1) & (y_test.values == 1)).sum()), 'profit': profit(y_test, pred)})\ntable = pd.DataFrame(rows).set_index('threshold')\nbest_row = table['profit'].idxmax()\nprint(table, best_row)",
   "hints": [
    "Сөздіктер тізімі → <code>pd.DataFrame(rows).set_index('threshold')</code>"
   ],
   "check": {
    "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\nassert isinstance(table, pd.DataFrame) and [round(float(_i), 2) for _i in table.index] == [0.1, 0.2, 0.3, 0.4, 0.5], 'Индекс — шектер: 0.1, ..., 0.5'\nassert {'offers', 'hits', 'profit'} <= set(table.columns), 'Бағандар: offers, hits, profit'\nfor _t in [0.1, 0.2, 0.3, 0.4, 0.5]:\n    _pr = (proba >= _t).astype(int)\n    _row = table.loc[[_i for _i in table.index if abs(float(_i) - _t) < 1e-9][0]]\n    assert int(_row['offers']) == int(_pr.sum()) and int(_row['hits']) == int(((_pr == 1) & (y_test.values == 1)).sum()) and int(_row['profit']) == _profit(y_test, _pr), f'Шек {_t} жолы дұрыс емес'\nassert abs(float(best_row) - float(table['profit'].idxmax())) < 1e-9, 'best_row — пайдасы ең жоғары шек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Шекті CV-мен таңдау",
   "prompt": "<p>Шекті test-те таңдау — алдау. <code>cross_val_predict(pipe, X_train, y_train, cv=5, method='predict_proba')[:, 1]</code> арқылы train-дегі адал ықтималдықтарды <code>p_tr</code>-ға алыңыз. <code>np.arange(0.05, 0.95, 0.05)</code> (<code>round(t, 2)</code>) ішінен <b>train</b> пайдасы ең үлкен шекті <code>cv_th</code>-ға жазыңыз. Сосын test-те сол шекпен пайданы <code>test_profit</code>-ке жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nimport numpy as np\n\ndef profit(y_true, y_pred):\n    y_true = np.asarray(y_true)\n    y_pred = np.asarray(y_pred)\n    tp = ((y_pred == 1) & (y_true == 1)).sum()\n    fp = ((y_pred == 1) & (y_true == 0)).sum()\n    return int(10000 * tp - 2000 * fp)\n\nfrom sklearn.model_selection import cross_val_predict\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nimport numpy as np\n\ndef profit(y_true, y_pred):\n    y_true = np.asarray(y_true)\n    y_pred = np.asarray(y_pred)\n    tp = ((y_pred == 1) & (y_true == 1)).sum()\n    fp = ((y_pred == 1) & (y_true == 0)).sum()\n    return int(10000 * tp - 2000 * fp)\n\nfrom sklearn.model_selection import cross_val_predict\np_tr = cross_val_predict(pipe, X_train, y_train, cv=5, method='predict_proba')[:, 1]\nths = [round(t, 2) for t in np.arange(0.05, 0.95, 0.05)]\ntrain_profits = [profit(y_train, (p_tr >= t).astype(int)) for t in ths]\ncv_th = ths[int(np.argmax(train_profits))]\ntest_profit = profit(y_test, (proba >= cv_th).astype(int))\nprint(cv_th, test_profit)",
   "hints": [
    "<code>cross_val_predict(..., method='predict_proba')[:, 1]</code>",
    "<code>np.argmax(train_profits)</code> — ең жақсы шектің орны."
   ],
   "check": {
    "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\nfrom sklearn.model_selection import cross_val_predict as _cvp\nfrom sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre(_cat=None):\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), _cat or ['plan'])])\n_pt = _cvp(_Pl([('pre', _pre()), ('model', _LR(max_iter=1000))]), X_train, y_train, cv=5, method='predict_proba')[:, 1]\n_ths = [round(_t, 2) for _t in _np.arange(0.05, 0.95, 0.05)]\n_ps = [_profit(y_train, (_pt >= _t).astype(int)) for _t in _ths]\n_ct = _ths[int(_np.argmax(_ps))]\nassert len(p_tr) == 450, 'p_tr — 450 train абоненті үшін CV ықтималдықтары'\nassert cv_th is not None and abs(cv_th - _ct) < 1e-9, f'cv_th = {_ct} болуы керек: train пайдасы ең үлкен шек'\nassert test_profit == _profit(y_test, (proba >= _ct).astype(int)), 'test_profit — test-те cv_th шегімен'",
    "mustInclude": [
     "cross_val_predict("
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ұсыныс бағасының әсері",
   "prompt": "<p>Ұсыныс қымбаттаса, шек қалай өзгереді? <code>profit_c(y_true, y_pred, cost)</code> функциясын жазыңыз (TP +10 000, FP −<code>cost</code>). <code>cost</code> ∈ [1000, 2000, 4000] үшін <code>np.arange(0.05, 0.95, 0.05)</code> (<code>round(t, 2)</code>) ішінен test пайдасы ең үлкен шекті <code>best_th_by_cost</code>-қа жазыңыз (теңдікте ең кішісі).</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nimport numpy as np\n\ndef profit(y_true, y_pred):\n    y_true = np.asarray(y_true)\n    y_pred = np.asarray(y_pred)\n    tp = ((y_pred == 1) & (y_true == 1)).sum()\n    fp = ((y_pred == 1) & (y_true == 0)).sum()\n    return int(10000 * tp - 2000 * fp)\n\n\ndef profit_c(y_true, y_pred, cost):\n    pass\n\nbest_th_by_cost = {}\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nimport numpy as np\n\ndef profit(y_true, y_pred):\n    y_true = np.asarray(y_true)\n    y_pred = np.asarray(y_pred)\n    tp = ((y_pred == 1) & (y_true == 1)).sum()\n    fp = ((y_pred == 1) & (y_true == 0)).sum()\n    return int(10000 * tp - 2000 * fp)\n\n\ndef profit_c(y_true, y_pred, cost):\n    y_true = np.asarray(y_true)\n    y_pred = np.asarray(y_pred)\n    tp = ((y_pred == 1) & (y_true == 1)).sum()\n    fp = ((y_pred == 1) & (y_true == 0)).sum()\n    return int(10000 * tp - cost * fp)\n\nbest_th_by_cost = {}\nths = [round(t, 2) for t in np.arange(0.05, 0.95, 0.05)]\nfor cost in [1000, 2000, 4000]:\n    ps = [profit_c(y_test, (proba >= t).astype(int), cost) for t in ths]\n    best_th_by_cost[cost] = ths[int(np.argmax(ps))]\nprint(best_th_by_cost)",
   "hints": [
    "<code>profit</code> функциясын көшіріп, 2000-ды <code>cost</code>-қа ауыстырыңыз.",
    "<code>ths[int(np.argmax(ps))]</code>"
   ],
   "check": {
    "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\nassert profit_c([1, 0, 1], [1, 1, 1], 3000) == 17000, 'profit_c([1, 0, 1], [1, 1, 1], 3000) = 2 × 10000 − 3000 = 17000'\n_ths = [round(_t, 2) for _t in _np.arange(0.05, 0.95, 0.05)]\n_b = {_c: _ths[int(_np.argmax([_profit(y_test, (proba >= _t).astype(int), 10000, _c) for _t in _ths]))] for _c in [1000, 2000, 4000]}\nassert sorted(best_th_by_cost) == [1000, 2000, 4000], 'Кілттер: 1000, 2000, 4000'\nassert all(abs(best_th_by_cost[_c] - _b[_c]) < 1e-9 for _c in _b), f'Шектер: {_b}'\nassert best_th_by_cost[1000] <= best_th_by_cost[4000], 'Ұсыныс қымбаттаса, шек көтеріледі'"
   }
  }
 ],
 "dc-8": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Келісімшарт коэффициенті",
   "prompt": "<p><code>pipe</code> үйретілген. Коэффициенттерді белгі аттарымен <code>coefs</code> Series-ке жазыңыз. <code>num__has_contract</code> коэффициентін <code>contract_coef</code>-ке жазыңыз: теріс болса, келісімшарт кету қаупін азайтады.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\ncoefs = pd.Series(pipe.named_steps['model'].coef_[0], index=pipe.named_steps['pre'].get_feature_names_out())\ncontract_coef = coefs['num__has_contract']\nprint(coefs.round(3))",
   "hints": [
    "<code>pipe.named_steps['model'].coef_[0]</code>"
   ],
   "check": {
    "tests": "_c = pd.Series(pipe.named_steps['model'].coef_[0], index=pipe.named_steps['pre'].get_feature_names_out())\nassert isinstance(coefs, pd.Series) and len(coefs) == 9 and list(coefs.index) == list(_c.index), 'coefs — 9 белгі, индексі get_feature_names_out()'\nassert abs(contract_coef - _c['num__has_contract']) < 1e-9 and contract_coef < 0, \"contract_coef = coefs['num__has_contract'] (теріс)\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Күшті үш белгі",
   "prompt": "<p>Белгілер масштабталған, сондықтан коэффициенттер модулін салыстыруға болады. Модулі бойынша ең үлкен үш белгінің атын <code>top3</code> тізіміне (кему ретімен) жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\ncoefs = pd.Series(pipe.named_steps['model'].coef_[0], index=pipe.named_steps['pre'].get_feature_names_out())\ntop3 = list(coefs.abs().sort_values(ascending=False).index[:3])\nprint(top3)",
   "hints": [
    "<code>coefs.abs().sort_values(ascending=False).index[:3]</code>"
   ],
   "check": {
    "tests": "_c = pd.Series(pipe.named_steps['model'].coef_[0], index=pipe.named_steps['pre'].get_feature_names_out())\nassert list(top3) == list(_c.abs().sort_values(ascending=False).index[:3]), f'top3 = {list(_c.abs().sort_values(ascending=False).index[:3])} болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Тариф бойынша қауіп",
   "prompt": "<p>Test жолдарын толық кестеден алыңыз: <code>te = df.loc[X_test.index].copy()</code>, <code>te['proba'] = proba</code>. Тариф бойынша орташа болжамды ықтималдықты <code>proba_by_plan</code>-ға, нақты churn үлесін <code>rate_by_plan</code>-ға жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nte = df.loc[X_test.index].copy()\nte['proba'] = proba\nproba_by_plan = te.groupby('plan')['proba'].mean()\nrate_by_plan = te.groupby('plan')['churned'].mean()\nprint(pd.DataFrame({'proba': proba_by_plan, 'rate': rate_by_plan}).round(3))",
   "hints": [
    "<code>te.groupby('plan')['proba'].mean()</code>"
   ],
   "check": {
    "tests": "_t = df.loc[X_test.index]\nassert all(abs(proba_by_plan[_p] - pd.Series(proba, index=X_test.index)[_t['plan'] == _p].mean()) < 1e-9 for _p in ['basic', 'standard', 'premium']), 'proba_by_plan — тариф бойынша proba орташасы'\nassert all(abs(rate_by_plan[_p] - _t.loc[_t['plan'] == _p, 'churned'].mean()) < 1e-9 for _p in ['basic', 'standard', 'premium']), 'rate_by_plan — тариф бойынша нақты churned үлесі'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қала бойынша AUC",
   "prompt": "<p>Модель әр қалада бірдей жақсы ажырата ма? <code>te</code> кестесінде әр қала үшін <code>roc_auc_score(churned, proba)</code> есептеп, <code>city_auc</code> Series-ке жазыңыз. AUC-ы ең төмен қаланы <code>weakest_city</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nfrom sklearn.metrics import roc_auc_score\nte = df.loc[X_test.index].copy()\nte['proba'] = proba\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nfrom sklearn.metrics import roc_auc_score\nte = df.loc[X_test.index].copy()\nte['proba'] = proba\ncity_auc = pd.Series({c: roc_auc_score(g['churned'], g['proba']) for c, g in te.groupby('city')})\nweakest_city = city_auc.idxmin()\nprint(city_auc.round(3), weakest_city)",
   "hints": [
    "<code>for c, g in te.groupby('city')</code>",
    "<code>pd.Series({...})</code>"
   ],
   "check": {
    "tests": "from sklearn.metrics import roc_auc_score as _ra\n_t = df.loc[X_test.index].copy()\n_t['proba'] = proba\n_a = pd.Series({_c: _ra(_g['churned'], _g['proba']) for _c, _g in _t.groupby('city')})\nassert isinstance(city_auc, pd.Series) and len(city_auc) == 5, 'city_auc — 5 қала бойынша Series'\nassert all(abs(city_auc[_c] - _a[_c]) < 1e-9 for _c in _a.index), 'Әр қаланың AUC-ы дұрыс емес: тек сол қаланың test жолдары'\nassert weakest_city == _a.idxmin(), f'weakest_city = {_a.idxmin()} болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қала бойынша ескертулер",
   "prompt": "<p>Шек 0.3. <code>te</code>-ге <code>flag</code> бағанын қосыңыз. <code>city_check</code> DataFrame: индекс — қала, бағандар <code>offer_rate</code> (<code>flag</code> орташасы) және <code>churn_rate</code> (<code>churned</code> орташасы). Ескерту үлесі нақты үлестен ең көп асатын қаланы <code>over_city</code>-ге жазыңыз (<code>offer_rate − churn_rate</code> ең үлкен).</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nte = df.loc[X_test.index].copy()\nte['proba'] = proba\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nte = df.loc[X_test.index].copy()\nte['proba'] = proba\nte['flag'] = (te['proba'] >= 0.3).astype(int)\ncity_check = te.groupby('city').agg(offer_rate=('flag', 'mean'), churn_rate=('churned', 'mean'))\nover_city = (city_check['offer_rate'] - city_check['churn_rate']).idxmax()\nprint(city_check.round(3), over_city)",
   "hints": [
    "<code>te.groupby('city').agg(offer_rate=('flag', 'mean'), churn_rate=('churned', 'mean'))</code>"
   ],
   "check": {
    "tests": "_t = df.loc[X_test.index].copy()\n_t['flag'] = (proba >= 0.3).astype(int)\n_g = _t.groupby('city').agg(offer_rate=('flag', 'mean'), churn_rate=('churned', 'mean'))\nassert isinstance(city_check, pd.DataFrame) and {'offer_rate', 'churn_rate'} <= set(city_check.columns) and len(city_check) == 5, 'city_check: 5 қала, offer_rate және churn_rate'\nassert all(abs(city_check.loc[_c, 'offer_rate'] - _g.loc[_c, 'offer_rate']) < 1e-9 for _c in _g.index), 'offer_rate дұрыс емес: шек 0.3'\nassert over_city == (_g['offer_rate'] - _g['churn_rate']).idxmax(), f\"over_city = {(_g['offer_rate'] - _g['churn_rate']).idxmax()} болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бір абоненттің себептері",
   "prompt": "<p>Test-тегі ықтималдығы <b>ең жоғары</b> абонент үшін әр белгінің логитке үлесін (<code>масштабталған мән × коэффициент</code>) <code>contrib</code> Series-ке жазыңыз (индекс — белгі аттары). Үлестер қосындысы + <code>intercept_</code> оның логитіне тең. Қаупін ең көп арттыратын белгіні (ең үлкен оң үлес) <code>main_reason</code>-ға жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nimport numpy as np\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nimport numpy as np\ni = int(np.argmax(proba))\nxt = np.asarray(pipe.named_steps['pre'].transform(X_test.iloc[[i]]))[0]\nlr = pipe.named_steps['model']\ncontrib = pd.Series(xt * lr.coef_[0], index=pipe.named_steps['pre'].get_feature_names_out())\nmain_reason = contrib.idxmax()\nlogit = contrib.sum() + lr.intercept_[0]\nprint(contrib.round(2), main_reason, round(1 / (1 + np.exp(-logit)), 3), round(proba[i], 3))",
   "hints": [
    "Абонент: <code>i = int(np.argmax(proba))</code>, жолы <code>X_test.iloc[[i]]</code>",
    "<code>pipe.named_steps['pre'].transform(...)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_i = int(_np.argmax(proba))\n_x = _np.asarray(pipe.named_steps['pre'].transform(X_test.iloc[[_i]]))[0]\n_c = pd.Series(_x * pipe.named_steps['model'].coef_[0], index=pipe.named_steps['pre'].get_feature_names_out())\nassert isinstance(contrib, pd.Series) and len(contrib) == 9, 'contrib — 9 белгі үлесі'\nassert all(abs(contrib.values - _c.values) < 1e-9), 'Үлестер дұрыс емес: ең жоғары proba абоненті (np.argmax), transform × coef_[0]'\nassert abs(1 / (1 + _np.exp(-(contrib.sum() + pipe.named_steps['model'].intercept_[0]))) - proba[_i]) < 1e-6, 'sigmoid(contrib.sum() + intercept) = proba болуы керек'\nassert main_reason == _c.idxmax(), f'main_reason = {_c.idxmax()} болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Жас тобы бойынша recall",
   "prompt": "<p>Шек 0.3. <code>te</code>-ге <code>age_band</code> қосыңыз (<code>pd.cut</code>, шекаралар <code>[17, 30, 45, 65]</code>, белгілер <code>'18-30'</code>, <code>'31-45'</code>, <code>'46-65'</code>). Кетушілер ішінде әр жас тобындағы recall-ды (<code>flag</code> үлесі) <code>band_recall</code>-ға (<code>observed=True</code>), ең төмен топты <code>worst_band</code>-қа жазыңыз (мәтін ретінде).</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nte = df.loc[X_test.index].copy()\nte['proba'] = proba\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nte = df.loc[X_test.index].copy()\nte['proba'] = proba\nte['flag'] = (te['proba'] >= 0.3).astype(int)\nte['age_band'] = pd.cut(te['age'], bins=[17, 30, 45, 65], labels=['18-30', '31-45', '46-65'])\nband_recall = te[te['churned'] == 1].groupby('age_band', observed=True)['flag'].mean()\nworst_band = str(band_recall.idxmin())\nprint(band_recall.round(3), worst_band)",
   "hints": [
    "Алдымен кетушілер: <code>te[te['churned'] == 1]</code>",
    "<code>groupby('age_band', observed=True)['flag'].mean()</code>"
   ],
   "check": {
    "tests": "_t = df.loc[X_test.index].copy()\n_t['flag'] = (proba >= 0.3).astype(int)\n_t['age_band'] = pd.cut(_t['age'], bins=[17, 30, 45, 65], labels=['18-30', '31-45', '46-65'])\n_r = _t[_t['churned'] == 1].groupby('age_band', observed=True)['flag'].mean()\nassert len(band_recall) == len(_r) and all(abs(band_recall.values - _r.values) < 1e-9), 'Recall тек кетушілер (churned == 1) ішінде, жас тобы бойынша'\nassert worst_band == str(_r.idxmin()), f'worst_band = {_r.idxmin()} болуы керек'",
    "mustInclude": [
     "pd.cut("
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Қоңыраулардың әсері",
   "prompt": "<p>Partial dependence: <code>support_calls</code> ∈ 0…5 үшін <code>X_test</code>-тің көшірмесінде барлық абоненттің қоңырау санын сол мәнге теңестіріп, орташа ықтималдықты <code>calls_curve</code> сөздігіне жазыңыз. Қоңырау 0-ден 5-ке өскенде орташа ықтималдық неше есе өсетінін <code>ratio_5_0</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\ncalls_curve = {}\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\ncalls_curve = {}\nfor k in range(6):\n    Xc = X_test.copy()\n    Xc['support_calls'] = k\n    calls_curve[k] = pipe.predict_proba(Xc)[:, 1].mean()\nratio_5_0 = calls_curve[5] / calls_curve[0]\nprint({k: round(v, 3) for k, v in calls_curve.items()}, round(ratio_5_0, 2))",
   "hints": [
    "<code>Xc = X_test.copy()</code>, <code>Xc['support_calls'] = k</code>"
   ],
   "check": {
    "tests": "_r = {}\nfor _k in range(6):\n    _X = X_test.copy()\n    _X['support_calls'] = _k\n    _r[_k] = pipe.predict_proba(_X)[:, 1].mean()\nassert sorted(calls_curve) == list(range(6)), 'Кілттер: 0, 1, 2, 3, 4, 5'\nassert all(abs(calls_curve[_k] - _r[_k]) < 1e-9 for _k in _r), 'Мәндер дұрыс емес: көшірмеде support_calls = k'\nassert all(calls_curve[_k] < calls_curve[_k + 1] for _k in range(5)), 'Қоңырау көбейген сайын қауіп өседі'\nassert abs(ratio_5_0 - _r[5] / _r[0]) < 1e-9, 'ratio_5_0 = calls_curve[5] / calls_curve[0]'\nassert X_test['support_calls'].nunique() > 1, 'X_test-ті өзгертпеңіз: .copy() қолданыңыз'"
   }
  }
 ],
 "dc-10": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Пайыз форматы",
   "prompt": "<p>Слайдтағы сандар оқылуы керек. <code>pct(x)</code> функциясы үлесті бір таңбалы пайызға айналдырсын.</p><p>Мысалы, <code>pct(0.2583)</code> → <code>'25.8%'</code>.</p>",
   "starter": "def pct(x):\n    pass\n",
   "solution": "def pct(x):\n    return f'{x * 100:.1f}%'\n\nprint(pct(0.2583))",
   "hints": [
    "f-жол: <code>f'{x * 100:.1f}%'</code>"
   ],
   "check": {
    "tests": "assert pct(0.2583) == '25.8%', \"pct(0.2583) '25.8%' қайтаруы керек\"\nassert pct(1) == '100.0%', \"pct(1) = '100.0%'\"\nassert pct(0.05) == '5.0%', \"pct(0.05) = '5.0%'\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Теңге форматы",
   "prompt": "<p><code>tenge(n)</code> функциясы бүтін санды мыңдықтары бос орынмен бөлінген теңге мәтініне айналдырсын.</p><p>Мысалы, <code>tenge(168000)</code> → <code>'168 000 ₸'</code>.</p>",
   "starter": "def tenge(n):\n    pass\n",
   "solution": "def tenge(n):\n    return f'{int(n):,}'.replace(',', ' ') + ' ₸'\n\nprint(tenge(168000))",
   "hints": [
    "<code>f'{n:,}'</code> мыңдықтарды үтірмен бөледі, сосын <code>.replace(',', ' ')</code>."
   ],
   "check": {
    "tests": "assert tenge(168000) == '168 000 ₸', \"tenge(168000) '168 000 ₸' қайтаруы керек\"\nassert tenge(950) == '950 ₸', \"tenge(950) = '950 ₸'\"\nassert tenge(11276400) == '11 276 400 ₸', \"tenge(11276400) = '11 276 400 ₸'\"\nassert tenge(-6000) == '-6 000 ₸', \"Теріс сан: '-6 000 ₸'\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Негізгі сандар",
   "prompt": "<p>Бірінші слайдқа <code>kpis</code> сөздігі: <code>'n_test'</code> (test абоненттері), <code>'n_churn'</code> (олардың ішіндегі кетушілер), <code>'churn_rate'</code> (үлес, 3 таңба), <code>'auc'</code> (test ROC AUC, 3 таңба).</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nfrom sklearn.metrics import roc_auc_score\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nfrom sklearn.metrics import roc_auc_score\nkpis = {\n    'n_test': len(y_test),\n    'n_churn': int(y_test.sum()),\n    'churn_rate': round(y_test.mean(), 3),\n    'auc': round(roc_auc_score(y_test, proba), 3),\n}\nprint(kpis)",
   "hints": [
    "<code>round(roc_auc_score(y_test, proba), 3)</code>"
   ],
   "check": {
    "tests": "from sklearn.metrics import roc_auc_score as _ra\nassert isinstance(kpis, dict) and {'n_test', 'n_churn', 'churn_rate', 'auc'} <= set(kpis), 'Кілттер: n_test, n_churn, churn_rate, auc'\nassert kpis['n_test'] == 150 and kpis['n_churn'] == 39, 'n_test = 150, n_churn = 39'\nassert kpis['churn_rate'] == 0.26, 'churn_rate = round(39 / 150, 3) = 0.26'\nassert kpis['auc'] == round(_ra(y_test, proba), 3), 'auc — 3 таңбаға дейін'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Top-k стратегиялары",
   "prompt": "<p>Бизнес «қанша абонентке хабарласамыз?» деп сұрайды. <code>k</code> ∈ [20, 40, 60] үшін ықтималдығы ең жоғары <code>k</code> абонентке жібергендегі пайданы <code>topk</code> DataFrame-ге жазыңыз: индекс — <code>k</code>, бағандар <code>hits</code> (ұсталған кетушілер) және <code>profit</code>. Пайдасы ең үлкен <code>k</code> — <code>best_k</code>.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nimport numpy as np\n\ndef profit(y_true, y_pred):\n    y_true = np.asarray(y_true)\n    y_pred = np.asarray(y_pred)\n    tp = ((y_pred == 1) & (y_true == 1)).sum()\n    fp = ((y_pred == 1) & (y_true == 0)).sum()\n    return int(10000 * tp - 2000 * fp)\n\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nimport numpy as np\n\ndef profit(y_true, y_pred):\n    y_true = np.asarray(y_true)\n    y_pred = np.asarray(y_pred)\n    tp = ((y_pred == 1) & (y_true == 1)).sum()\n    fp = ((y_pred == 1) & (y_true == 0)).sum()\n    return int(10000 * tp - 2000 * fp)\n\norder = np.argsort(-proba)\nrows = {}\nfor k in [20, 40, 60]:\n    send = np.zeros(len(proba), dtype=int)\n    send[order[:k]] = 1\n    rows[k] = {'hits': int(y_test.values[order[:k]].sum()), 'profit': profit(y_test, send)}\ntopk = pd.DataFrame(rows).T\nbest_k = int(topk['profit'].idxmax())\nprint(topk, best_k)",
   "hints": [
    "<code>order = np.argsort(-proba)</code> бір рет.",
    "<code>pd.DataFrame(rows).T</code>"
   ],
   "check": {
    "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\n_o = _np.argsort(-proba)\n_r = {}\nfor _k in [20, 40, 60]:\n    _s = _np.zeros(len(proba), dtype=int)\n    _s[_o[:_k]] = 1\n    _r[_k] = _profit(y_test, _s)\nassert isinstance(topk, pd.DataFrame) and sorted(int(_i) for _i in topk.index) == [20, 40, 60], 'Индекс: 20, 40, 60'\nassert all(int(topk.loc[_k, 'profit']) == _r[_k] for _k in _r), f'Пайда дұрыс емес: {_r}'\nassert all(int(topk.loc[_k, 'hits']) == int(y_test.values[_o[:_k]].sum()) for _k in _r), 'hits — таңдалған k абоненттегі кетушілер'\nassert best_k == max(_r, key=_r.get), f'best_k = {max(_r, key=_r.get)} болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Слайд тақырыбы",
   "prompt": "<p>Слайд тақырыбын автоматты жасаңыз. <code>headline(profit_model, profit_all)</code>: айырма оң болса <code>'Модель барлығына жіберуден X көп пайда береді'</code>, әйтпесе <code>'Модель барлығына жіберуден X аз пайда береді'</code>, мұнда X — айырманың модулі <code>tenge</code> форматында.</p><p>Мысалы, <code>headline(214000, 168000)</code> → <code>'Модель барлығына жіберуден 46 000 ₸ көп пайда береді'</code>.</p>",
   "starter": "def tenge(n):\n    return f'{int(n):,}'.replace(',', ' ') + ' ₸'\n\ndef headline(profit_model, profit_all):\n    pass\n",
   "solution": "def tenge(n):\n    return f'{int(n):,}'.replace(',', ' ') + ' ₸'\n\ndef headline(profit_model, profit_all):\n    diff = profit_model - profit_all\n    word = 'көп' if diff > 0 else 'аз'\n    return f'Модель барлығына жіберуден {tenge(abs(diff))} {word} пайда береді'\n\nprint(headline(214000, 168000))",
   "hints": [
    "<code>diff = profit_model - profit_all</code>",
    "<code>tenge(abs(diff))</code>"
   ],
   "check": {
    "tests": "assert headline(214000, 168000) == 'Модель барлығына жіберуден 46 000 ₸ көп пайда береді', \"headline(214000, 168000) дұрыс емес\"\nassert headline(100000, 168000) == 'Модель барлығына жіберуден 68 000 ₸ аз пайда береді', \"Айырма теріс болса: '... 68 000 ₸ аз пайда береді'\"\nassert headline(1500000, 168000) == 'Модель барлығына жіберуден 1 332 000 ₸ көп пайда береді', 'Миллиондар да бос орынмен бөлінеді'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Пайданың өсімі",
   "prompt": "<p>Test-те шектерді <code>np.arange(0.05, 0.95, 0.05)</code> (<code>round(t, 2)</code>) бойынша тексеріп, ең үлкен пайданы <code>best_profit</code>-ке жазыңыз. «Барлығына жіберу» стратегиясының пайдасы — <code>profit_all</code>. <code>uplift = best_profit - profit_all</code>, <code>uplift_pct</code> — <code>profit_all</code>-ға қатысты пайызы (1 таңба).</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nimport numpy as np\n\ndef profit(y_true, y_pred):\n    y_true = np.asarray(y_true)\n    y_pred = np.asarray(y_pred)\n    tp = ((y_pred == 1) & (y_true == 1)).sum()\n    fp = ((y_pred == 1) & (y_true == 0)).sum()\n    return int(10000 * tp - 2000 * fp)\n\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nimport numpy as np\n\ndef profit(y_true, y_pred):\n    y_true = np.asarray(y_true)\n    y_pred = np.asarray(y_pred)\n    tp = ((y_pred == 1) & (y_true == 1)).sum()\n    fp = ((y_pred == 1) & (y_true == 0)).sum()\n    return int(10000 * tp - 2000 * fp)\n\nths = [round(t, 2) for t in np.arange(0.05, 0.95, 0.05)]\nbest_profit = max(profit(y_test, (proba >= t).astype(int)) for t in ths)\nprofit_all = profit(y_test, np.ones(len(y_test), dtype=int))\nuplift = best_profit - profit_all\nuplift_pct = round(uplift / profit_all * 100, 1)\nprint(best_profit, profit_all, uplift, uplift_pct)",
   "hints": [
    "Барлығына: <code>np.ones(len(y_test), dtype=int)</code>",
    "<code>round(uplift / profit_all * 100, 1)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\n_ths = [round(_t, 2) for _t in _np.arange(0.05, 0.95, 0.05)]\n_b = max(_profit(y_test, (proba >= _t).astype(int)) for _t in _ths)\nassert best_profit == _b, f'best_profit = {_b} ₸ болуы керек'\nassert profit_all == 168000, 'profit_all = 168 000 ₸'\nassert uplift == _b - 168000 and uplift_pct == round((_b - 168000) / 168000 * 100, 1), 'uplift = best_profit − profit_all; uplift_pct — пайызы, 1 таңба'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Тариф бойынша слайд",
   "prompt": "<p>Шек 0.3. Әр тариф үшін test-те <code>plan_table</code> DataFrame жасаңыз: индекс — тариф, бағандар <code>customers</code> (абоненттер саны), <code>offers</code> (ұсыныс саны), <code>profit</code> (сол тарифтің пайдасы, <code>profit</code> функциясымен). Пайдасы ең үлкен тарифті <code>best_plan</code>-ға жазыңыз. Тарифтер пайдасының қосындысы жалпы пайдаға тең болуы керек.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nimport numpy as np\n\ndef profit(y_true, y_pred):\n    y_true = np.asarray(y_true)\n    y_pred = np.asarray(y_pred)\n    tp = ((y_pred == 1) & (y_true == 1)).sum()\n    fp = ((y_pred == 1) & (y_true == 0)).sum()\n    return int(10000 * tp - 2000 * fp)\n\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nimport numpy as np\n\ndef profit(y_true, y_pred):\n    y_true = np.asarray(y_true)\n    y_pred = np.asarray(y_pred)\n    tp = ((y_pred == 1) & (y_true == 1)).sum()\n    fp = ((y_pred == 1) & (y_true == 0)).sum()\n    return int(10000 * tp - 2000 * fp)\n\nte = df.loc[X_test.index].copy()\nte['pred'] = (proba >= 0.3).astype(int)\nrows = {}\nfor plan, g in te.groupby('plan'):\n    rows[plan] = {'customers': len(g), 'offers': int(g['pred'].sum()), 'profit': profit(g['churned'], g['pred'])}\nplan_table = pd.DataFrame(rows).T\nbest_plan = plan_table['profit'].idxmax()\nprint(plan_table, best_plan)",
   "hints": [
    "<code>te = df.loc[X_test.index].copy()</code>, сосын <code>for plan, g in te.groupby('plan')</code>",
    "<code>profit(g['churned'], g['pred'])</code>"
   ],
   "check": {
    "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\n_t = df.loc[X_test.index].copy()\n_t['pred'] = (proba >= 0.3).astype(int)\n_r = {_p: _profit(_g['churned'], _g['pred']) for _p, _g in _t.groupby('plan')}\nassert isinstance(plan_table, pd.DataFrame) and set(plan_table.index) == {'basic', 'standard', 'premium'}, 'Индекс — үш тариф'\nassert {'customers', 'offers', 'profit'} <= set(plan_table.columns), 'Бағандар: customers, offers, profit'\nassert int(plan_table['customers'].sum()) == 150, 'Барлық тарифтің абоненттері қосындысы 150'\nassert all(int(plan_table.loc[_p, 'profit']) == _r[_p] for _p in _r), f'Тариф пайдалары: {_r}'\nassert int(plan_table['profit'].sum()) == _profit(y_test, (proba >= 0.3).astype(int)), 'Қосынды жалпы пайдаға тең болуы керек'\nassert best_plan == max(_r, key=_r.get), f'best_plan = {max(_r, key=_r.get)} болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Бір ұсыныстың тиімділігі",
   "prompt": "<p>Ең көп пайда мен ең тиімді ұсыныс — әртүрлі нәрсе. Шек ∈ [0.2, 0.3, 0.4, 0.5, 0.6] үшін пайданы <code>profits</code>-ке, бір ұсынысқа шаққандағы пайданы (<code>profit / offers</code>) <code>per_offer</code>-ге жазыңыз. Жалпы пайдасы ең үлкен шекті <code>th_total</code>-ға, бір ұсыныс пайдасы ең үлкенін <code>th_efficient</code>-ке жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nimport numpy as np\n\ndef profit(y_true, y_pred):\n    y_true = np.asarray(y_true)\n    y_pred = np.asarray(y_pred)\n    tp = ((y_pred == 1) & (y_true == 1)).sum()\n    fp = ((y_pred == 1) & (y_true == 0)).sum()\n    return int(10000 * tp - 2000 * fp)\n\nprofits = {}\nper_offer = {}\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\npre = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),\n                      ('sc', StandardScaler())]), num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat),\n])\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nproba = pipe.predict_proba(X_test)[:, 1]\nimport numpy as np\n\ndef profit(y_true, y_pred):\n    y_true = np.asarray(y_true)\n    y_pred = np.asarray(y_pred)\n    tp = ((y_pred == 1) & (y_true == 1)).sum()\n    fp = ((y_pred == 1) & (y_true == 0)).sum()\n    return int(10000 * tp - 2000 * fp)\n\nprofits = {}\nper_offer = {}\nfor t in [0.2, 0.3, 0.4, 0.5, 0.6]:\n    pred = (proba >= t).astype(int)\n    profits[t] = profit(y_test, pred)\n    per_offer[t] = profits[t] / pred.sum()\nth_total = max(profits, key=profits.get)\nth_efficient = max(per_offer, key=per_offer.get)\nprint(profits, {k: round(v) for k, v in per_offer.items()}, th_total, th_efficient)",
   "hints": [
    "<code>pred.sum()</code> — ұсыныс саны.",
    "Екі сөздік, екі <code>max(..., key=...)</code>."
   ],
   "check": {
    "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\n_p = {_t: _profit(y_test, (proba >= _t).astype(int)) for _t in [0.2, 0.3, 0.4, 0.5, 0.6]}\n_e = {_t: _p[_t] / (proba >= _t).sum() for _t in _p}\nassert sorted(profits) == [0.2, 0.3, 0.4, 0.5, 0.6] and all(profits[_t] == _p[_t] for _t in _p), 'profits дұрыс емес'\nassert all(abs(per_offer[_t] - _e[_t]) < 1e-9 for _t in _e), 'per_offer = profit / ұсыныс саны'\nassert th_total == max(_p, key=_p.get) and th_efficient == max(_e, key=_e.get), f'th_total = {max(_p, key=_p.get)}, th_efficient = {max(_e, key=_e.get)}'\nassert th_efficient > th_total, 'Тиімділік шегі жалпы пайда шегінен жоғары'"
   }
  }
 ]
});
