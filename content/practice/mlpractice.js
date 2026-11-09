// Practice tasks after the lessons of m5-2. Each lesson's list opens one task at a time.
DJ.addPractice('m5-2', {
 "mp-1": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Медианамен толтыру",
   "prompt": "<p><code>age</code> мен <code>data_gb</code>-да бос мәндер бар. <code>SimpleImputer(strategy='median')</code>-ды <code>imp</code> атымен <code>df[['age', 'data_gb']]</code>-ке fit етіп, толтырылған массивті <code>filled</code>-ке жазыңыз (<code>fit_transform</code>).</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nimport numpy as np\nfrom sklearn.impute import SimpleImputer\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nimport numpy as np\nfrom sklearn.impute import SimpleImputer\nimp = SimpleImputer(strategy='median')\nfilled = imp.fit_transform(df[['age', 'data_gb']])\nprint(imp.statistics_, np.isnan(filled).sum())",
   "hints": [
    "<code>imp.fit_transform(df[['age', 'data_gb']])</code>",
    "<code>imp.statistics_</code> — әр бағанның медианасы."
   ],
   "check": {
    "tests": "import numpy as _np\nassert _np.asarray(filled).shape == (600, 2), 'filled пішіні (600, 2)'\nassert not _np.isnan(_np.asarray(filled, dtype=float)).any(), 'filled-те NaN қалмауы керек'\nassert _np.allclose(imp.statistics_, [df['age'].median(), df['data_gb'].median()]), \"imp медианамен толтыруы керек: strategy='median'\"",
    "mustInclude": [
     "SimpleImputer("
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Масштаб және регрессия",
   "prompt": "<p><code>make_pipeline(StandardScaler(), LinearRegression())</code>-ды <code>pipe</code> атымен train-де үйретіп, test R²-ын <code>pipe_r2</code>-ге жазыңыз. Масштабсыз <code>LinearRegression</code>-ның test R²-ын <code>plain_r2</code>-ге жазыңыз. Сызықтық регрессияға масштаб әсер ете ме?</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LinearRegression\nX = flats[['area_m2', 'rooms', 'year_built']]\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LinearRegression\nX = flats[['area_m2', 'rooms', 'year_built']]\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\npipe = make_pipeline(StandardScaler(), LinearRegression()).fit(X_train, y_train)\npipe_r2 = pipe.score(X_test, y_test)\nplain_r2 = LinearRegression().fit(X_train, y_train).score(X_test, y_test)\nprint(pipe_r2, plain_r2)",
   "hints": [
    "<code>make_pipeline(StandardScaler(), LinearRegression()).fit(X_train, y_train)</code>"
   ],
   "check": {
    "tests": "from sklearn.pipeline import Pipeline as _P\nfrom sklearn.linear_model import LinearRegression as _LinR\n_r = _LinR().fit(X_train, y_train).score(X_test, y_test)\nassert isinstance(pipe, _P) and hasattr(pipe[-1], 'coef_'), 'pipe — үйретілген Pipeline (make_pipeline)'\nassert abs(plain_r2 - _r) < 1e-9, f'plain_r2 ≈ {_r:.4f} болуы керек'\nassert abs(pipe_r2 - _r) < 1e-9, 'Сызықтық регрессияда масштаб R²-ды өзгертпейді: pipe_r2 = plain_r2'",
    "mustInclude": [
     "make_pipeline("
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қала бағандарының аты",
   "prompt": "<p><code>OneHotEncoder(handle_unknown='ignore')</code>-ды <code>ohe</code> атымен <code>df[['city']]</code>-ке fit етіңіз. Пайда болатын бағандар атын <code>get_feature_names_out()</code> арқылы <code>names</code> тізіміне жазыңыз.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nfrom sklearn.preprocessing import OneHotEncoder\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nfrom sklearn.preprocessing import OneHotEncoder\nohe = OneHotEncoder(handle_unknown='ignore').fit(df[['city']])\nnames = list(ohe.get_feature_names_out())\nprint(names)",
   "hints": [
    "<code>ohe.get_feature_names_out()</code> массив қайтарады: <code>list(...)</code>"
   ],
   "check": {
    "tests": "assert len(names) == 5, 'names-те 5 қала бағаны болуы керек'\nassert all(str(_n).startswith('city_') for _n in names), 'Атаулар city_ деп басталады'\nassert set(names) == {'city_' + _c for _c in df['city'].unique()}, 'Әр қалаға бір баған'",
    "mustInclude": [
     "OneHotEncoder("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Пәтерлерге ColumnTransformer",
   "prompt": "<p>Пәтерлер үшін <code>pre_f</code> жасаңыз: <code>fnum</code> бағандарына <code>StandardScaler</code>, <code>district</code>-ке <code>OneHotEncoder(handle_unknown='ignore')</code>. <code>Xt = pre_f.fit_transform(X)</code>.</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nfnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\nX = flats.drop(columns=['flat_id', 'price_mln'])\npre_f = None\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nfnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\nX = flats.drop(columns=['flat_id', 'price_mln'])\npre_f = ColumnTransformer([('num', StandardScaler(), fnum), ('cat', OneHotEncoder(handle_unknown='ignore'), ['district'])])\nXt = pre_f.fit_transform(X)\nprint(Xt.shape)",
   "hints": [
    "<code>ColumnTransformer([('num', StandardScaler(), fnum), ('cat', OneHotEncoder(...), ['district'])])</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nfrom sklearn.compose import ColumnTransformer as _CT\nassert isinstance(pre_f, _CT), 'pre_f — ColumnTransformer'\n_A = _np.asarray(Xt.toarray() if hasattr(Xt, 'toarray') else Xt, dtype=float)\nassert _A.shape == (400, 11), f'Xt пішіні (400, 11) болуы керек: 5 сандық + 6 аудан. Сізде {_A.shape}'\nassert _np.allclose(_A[:, :5].mean(axis=0), 0, atol=1e-6), 'Алғашқы 5 баған масштабталған болуы керек'\nassert _np.allclose(_A[:, 5:].sum(axis=1), 1), 'Соңғы 6 баған — аудандардың one-hot кодтары'",
    "mustInclude": [
     "ColumnTransformer("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Таныс емес қала",
   "prompt": "<p><code>ohe</code> churn қалаларында үйретілген. Жаңа деректе Тараз (бұрын болмаған) және Алматы бар. <code>new</code>-ді түрлендіріп, әр жолдың қосындысын <code>row_sums</code> тізіміне жазыңыз. Тараз жолы тек нөлдерден тұруы керек.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nfrom sklearn.preprocessing import OneHotEncoder\nohe = OneHotEncoder(handle_unknown='ignore').fit(df[['city']])\nnew = pd.DataFrame({'city': ['Тараз', 'Алматы']})\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nfrom sklearn.preprocessing import OneHotEncoder\nohe = OneHotEncoder(handle_unknown='ignore').fit(df[['city']])\nnew = pd.DataFrame({'city': ['Тараз', 'Алматы']})\nT = ohe.transform(new).toarray()\nrow_sums = [int(s) for s in T.sum(axis=1)]\nprint(T, row_sums)",
   "hints": [
    "<code>ohe.transform(new)</code> сирек матрица қайтарады: <code>.toarray()</code>",
    "<code>T.sum(axis=1)</code>"
   ],
   "check": {
    "tests": "assert list(row_sums) == [0, 1], 'row_sums = [0, 1]: Тараз — нөлдер, Алматы — бір бірлік'",
    "mustInclude": [
     "transform("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Pipeline ішіне қарау",
   "prompt": "<p><code>model</code> Pipeline-ы (қадамдар <code>'pre'</code> және <code>'clf'</code>) жасап, train-де үйретіңіз. <code>named_steps</code> арқылы: белгілер санын <code>n_coef</code>-ке (<code>coef_.shape[1]</code>), белгі аттарын <code>names</code>-ке (<code>get_feature_names_out()</code>), коэффициенті ең үлкен белгіні <code>top_pos</code>-қа жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nimport pandas as pd\nmodel = Pipeline([('pre', pre), ('clf', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nn_coef = model.named_steps['clf'].coef_.shape[1]\nnames = list(model.named_steps['pre'].get_feature_names_out())\ncoefs = pd.Series(model.named_steps['clf'].coef_[0], index=names)\ntop_pos = coefs.idxmax()\nprint(n_coef, top_pos)",
   "hints": [
    "<code>model.named_steps['clf'].coef_</code>",
    "<code>pd.Series(coef_[0], index=names).idxmax()</code>"
   ],
   "check": {
    "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import OneHotEncoder as _OH, StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre():\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), cat)])\nimport pandas as _pd\n_m = _Pl([('pre', _pre()), ('clf', _LR(max_iter=1000))]).fit(X_train, y_train)\n_c = _pd.Series(_m.named_steps['clf'].coef_[0], index=_m.named_steps['pre'].get_feature_names_out())\nassert 'clf' in model.named_steps and 'pre' in model.named_steps, \"Қадам аттары: 'pre' және 'clf'\"\nassert n_coef == 14, 'n_coef = 14 болуы керек: 6 сандық + 5 қала + 3 тариф'\nassert list(names) == list(_c.index), 'names — pre-дің get_feature_names_out()'\nassert top_pos == _c.idxmax(), f'top_pos = {_c.idxmax()} болуы керек'",
    "mustInclude": [
     "named_steps"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Толық пәтер Pipeline-ы",
   "prompt": "<p>Бөлу мен <code>pre_f</code> дайын. <code>pre_f</code> + <code>LinearRegression</code> Pipeline-ын <code>model</code> атымен train-де үйретіңіз. Test-те <code>test_r2</code> мен <code>test_mae</code> (<code>mean_absolute_error</code>) есептеңіз.</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nX = flats.drop(columns=['flat_id', 'price_mln'])\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nfnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\npre_f = ColumnTransformer([('num', StandardScaler(), fnum), ('cat', OneHotEncoder(handle_unknown='ignore'), ['district'])])\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_absolute_error\nmodel = None\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nX = flats.drop(columns=['flat_id', 'price_mln'])\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nfnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\npre_f = ColumnTransformer([('num', StandardScaler(), fnum), ('cat', OneHotEncoder(handle_unknown='ignore'), ['district'])])\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_absolute_error\nmodel = Pipeline([('pre', pre_f), ('model', LinearRegression())]).fit(X_train, y_train)\ntest_r2 = model.score(X_test, y_test)\ntest_mae = mean_absolute_error(y_test, model.predict(X_test))\nprint(round(test_r2, 3), round(test_mae, 2))",
   "hints": [
    "<code>Pipeline([('pre', pre_f), ('model', LinearRegression())])</code>",
    "Pipeline шикі X_train-ді (district мәтінімен) қабылдайды."
   ],
   "check": {
    "tests": "from sklearn.pipeline import Pipeline as _P\nfrom sklearn.linear_model import LinearRegression as _LinR\nimport numpy as _np\nassert isinstance(model, _P) and isinstance(model.steps[-1][1], _LinR), 'model — соңғы қадамы LinearRegression болатын Pipeline'\nassert abs(test_r2 - model.score(X_test, y_test)) < 1e-9, 'test_r2 = model.score(X_test, y_test)'\nassert abs(test_mae - _np.mean(_np.abs(y_test - model.predict(X_test)))) < 1e-9, 'test_mae — test-тегі MAE'\nassert test_r2 > 0.9, f'district қосылғанда R² 0.9-дан жоғары болуы керек, сізде {test_r2:.3f}'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Толтыру стратегиясы",
   "prompt": "<p>Сандық бөлікте <code>SimpleImputer</code> стратегиясын салыстырыңыз: <code>'mean'</code>, <code>'median'</code>, <code>'most_frequent'</code>. Әрқайсысы үшін толық Pipeline (imputer → StandardScaler, cat → OneHotEncoder, сосын <code>LogisticRegression(max_iter=1000)</code>) құрып, бүкіл X, y-де 3-fold ROC AUC орташасын <code>auc_by_strategy</code>-ге жазыңыз. Ең жақсысын <code>best_strategy</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import cross_val_score\nauc_by_strategy = {}\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import cross_val_score\nauc_by_strategy = {}\nfor s in ['mean', 'median', 'most_frequent']:\n    num_pipe = Pipeline([('imp', SimpleImputer(strategy=s)), ('sc', StandardScaler())])\n    pre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\n    m = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\n    auc_by_strategy[s] = cross_val_score(m, X, y, cv=3, scoring='roc_auc').mean()\nbest_strategy = max(auc_by_strategy, key=auc_by_strategy.get)\nprint(auc_by_strategy, best_strategy)",
   "hints": [
    "Цикл ішінде әр стратегияға жаңа <code>pre</code> жасаңыз.",
    "<code>cross_val_score(m, X, y, cv=3, scoring='roc_auc').mean()</code>"
   ],
   "check": {
    "tests": "from sklearn.model_selection import cross_val_score as _cvs\nfrom sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import OneHotEncoder as _OH, StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre():\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), cat)])\n_rm = _cvs(_Pl([('pre', _pre()), ('model', _LR(max_iter=1000))]), X, y, cv=3, scoring='roc_auc').mean()\nassert set(auc_by_strategy) == {'mean', 'median', 'most_frequent'}, \"Кілттер: 'mean', 'median', 'most_frequent'\"\nassert abs(auc_by_strategy['median'] - _rm) < 1e-6, f\"median үшін AUC ≈ {_rm:.4f} болуы керек: cv=3, scoring='roc_auc', бүкіл X, y\"\nassert all(0.75 < _v < 0.9 for _v in auc_by_strategy.values()), 'AUC мәндері 0.75–0.9 аралығында болуы керек'\nassert len(set(round(_v, 6) for _v in auc_by_strategy.values())) == 3, 'Әр стратегия үшін жаңа imputer жасаңыз: нәтижелер әртүрлі болуы керек'\nassert best_strategy == max(auc_by_strategy, key=auc_by_strategy.get), 'best_strategy — AUC ең жоғары стратегия'",
    "mustInclude": [
     "cross_val_score("
    ]
   }
  }
 ],
 "mp-2": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Scaler нені көреді",
   "prompt": "<p>Бөлу дайын. <code>StandardScaler</code>-ді <code>scaler</code> атымен тек <code>X_train</code>-ге fit етіңіз. Бүкіл деректегі <code>area_m2</code> орташасын <code>mean_all</code>-ға, train-дегіні <code>mean_train</code>-ге жазыңыз. Scaler қай орташаны есте сақтады (<code>scaler.mean_[0]</code>) — <code>scaler_mean</code>-ға жазыңыз.</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\nX = flats[['area_m2', 'year_built']]\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\nX = flats[['area_m2', 'year_built']]\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)\nscaler = StandardScaler().fit(X_train)\nmean_all = X['area_m2'].mean()\nmean_train = X_train['area_m2'].mean()\nscaler_mean = scaler.mean_[0]\nprint(mean_all, mean_train, scaler_mean)",
   "hints": [
    "<code>scaler = StandardScaler().fit(X_train)</code>",
    "<code>scaler.mean_</code> — әр бағанның орташасы."
   ],
   "check": {
    "tests": "assert abs(mean_all - X['area_m2'].mean()) < 1e-9, \"mean_all = X['area_m2'].mean()\"\nassert abs(mean_train - X_train['area_m2'].mean()) < 1e-9, \"mean_train = X_train['area_m2'].mean()\"\nassert abs(scaler_mean - X_train['area_m2'].mean()) < 1e-9, 'Scaler тек X_train-ге fit етілуі керек: scaler_mean = mean_train'\nassert abs(mean_all - mean_train) > 1e-6, 'Бүкіл дерек пен train орташасы әртүрлі'",
    "mustInclude": [
     "fit(X_train)"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "ID бағанын табу",
   "prompt": "<p>ID бағандары модельге зиян: олар нысанамен кездейсоқ байланысуы мүмкін. <code>id_like(df)</code> функциясы әр мәні бірегей (бірегей мәндер саны жолдар санына тең) бағандардың тізімін қайтарсын.</p><p>Мысалы, churn үшін → <code>['customer_id']</code>.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\n\ndef id_like(data):\n    pass\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\n\ndef id_like(data):\n    return [c for c in data.columns if data[c].nunique() == len(data)]\n\nprint(id_like(df))",
   "hints": [
    "<code>data[c].nunique() == len(data)</code>"
   ],
   "check": {
    "tests": "assert id_like(df) == ['customer_id'], \"id_like(df) ['customer_id'] қайтаруы керек\"\n_t = pd.DataFrame({'code': ['A1', 'A2', 'A3'], 'city': ['Алматы', 'Алматы', 'Астана'], 'n': [1, 2, 3]})\nassert id_like(_t) == ['code', 'n'], \"Кіші кестеде: ['code', 'n']\"\nassert id_like(pd.read_csv('flats.csv')) == ['flat_id'], \"flats үшін ['flat_id']\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ортақ жолдар жоқ",
   "prompt": "<p>Бөлу дайын. Train мен test-тің ортақ индекстер санын <code>overlap</code>-қа, екеуінің жалпы жол санын <code>n_total</code>-ға жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\noverlap = len(set(X_train.index) & set(X_test.index))\nn_total = len(X_train) + len(X_test)\nprint(overlap, n_total)",
   "hints": [
    "Жиындар қиылысы: <code>set(a) &amp; set(b)</code>"
   ],
   "check": {
    "tests": "assert overlap == 0, 'overlap = 0: бір жол train-де де, test-те де болмауы керек'\nassert n_total == 600, 'n_total = 600: ешбір жол жоғалмайды'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бағадан жасалған белгі",
   "prompt": "<p><code>price_per_m2 = price_mln / area_m2</code> бағаны нысанадан жасалған — бұл target leakage. Екі модельді салыстырыңыз (бөлу <code>test_size=0.2</code>, <code>random_state=42</code>): <code>area_m2</code> + <code>price_per_m2</code> → test R² <code>leak_r2</code>; тек <code>area_m2</code> → <code>clean_r2</code>.</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\nflats['price_per_m2'] = flats['price_mln'] / flats['area_m2']\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\nflats['price_per_m2'] = flats['price_mln'] / flats['area_m2']\nX_train, X_test, y_train, y_test = train_test_split(flats[['area_m2', 'price_per_m2']], flats['price_mln'], test_size=0.2, random_state=42)\nleak_r2 = LinearRegression().fit(X_train, y_train).score(X_test, y_test)\nclean_r2 = LinearRegression().fit(X_train[['area_m2']], y_train).score(X_test[['area_m2']], y_test)\nprint(round(leak_r2, 3), round(clean_r2, 3))",
   "hints": [
    "Бір бөлу, екі модель: екіншісі тек <code>X_train[['area_m2']]</code>."
   ],
   "check": {
    "tests": "from sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LinearRegression as _LinR\n_a, _b, _c, _d = _tts(flats[['area_m2', 'price_per_m2']], flats['price_mln'], test_size=0.2, random_state=42)\nassert abs(leak_r2 - _LinR().fit(_a, _c).score(_b, _d)) < 1e-6, 'leak_r2: area_m2 + price_per_m2 белгілерімен'\nassert abs(clean_r2 - _LinR().fit(_a[['area_m2']], _c).score(_b[['area_m2']], _d)) < 1e-6, 'clean_r2: тек area_m2'\nassert leak_r2 > 0.9 and leak_r2 - clean_r2 > 0.3, 'Leakage R²-ды жасанды түрде көтереді'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қаланы train бойынша кодтау",
   "prompt": "<p>Қаланы оның churn үлесімен алмастыру (target encoding) пайдалы, бірақ үлесті <b>тек train</b>-нен есептеу керек. <code>city_rate</code> — train-дегі әр қаланың churn үлесі (Series). <code>te_rate</code> — test абоненттерінің қаласына сәйкес үлес (<code>X_test['city'].map(city_rate)</code>).</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\ncity_rate = y_train.groupby(X_train['city']).mean()\nte_rate = X_test['city'].map(city_rate)\nprint(city_rate.round(3))",
   "hints": [
    "<code>y_train.groupby(X_train['city']).mean()</code>",
    "<code>Series.map(...)</code> сөздік немесе Series арқылы ауыстырады."
   ],
   "check": {
    "tests": "_cr = y_train.groupby(X_train['city']).mean()\nassert isinstance(city_rate, pd.Series) and len(city_rate) == 5, 'city_rate — 5 қаласы бар Series'\nassert all(abs(city_rate[_c] - _cr[_c]) < 1e-9 for _c in _cr.index), 'city_rate тек train деректен есептелуі керек (y_train, X_train)'\nassert len(te_rate) == 150 and all(abs(te_rate.values - X_test['city'].map(_cr).values) < 1e-9), \"te_rate = X_test['city'].map(city_rate)\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қайталанған пәтерлер",
   "prompt": "<p>Деректе қайталанған жолдар болса, бір пәтер train-де де, test-те де болуы мүмкін. <code>flats2</code>-ні <code>test_size=0.25</code>, <code>random_state=0</code> арқылы <code>train2</code>/<code>test2</code>-ге бөліңіз. Test-тегі <code>flat_id</code>-і train-де де бар жолдар санын <code>n_leak</code>-ке жазыңыз.</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nflats2 = pd.concat([flats, flats.sample(100, random_state=0)], ignore_index=True)\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nflats2 = pd.concat([flats, flats.sample(100, random_state=0)], ignore_index=True)\ntrain2, test2 = train_test_split(flats2, test_size=0.25, random_state=0)\nn_leak = int(test2['flat_id'].isin(train2['flat_id']).sum())\nprint(len(test2), n_leak)",
   "hints": [
    "<code>train_test_split(flats2, test_size=0.25, random_state=0)</code> екі кесте қайтарады.",
    "<code>test2['flat_id'].isin(train2['flat_id']).sum()</code>"
   ],
   "check": {
    "tests": "from sklearn.model_selection import train_test_split as _tts\n_a, _b = _tts(flats2, test_size=0.25, random_state=0)\n_n = int(_b['flat_id'].isin(_a['flat_id']).sum())\nassert len(test2) == 125, 'test2-де 125 жол болуы керек'\nassert int(n_leak) == _n, f'n_leak = {_n} болуы керек: test2 flat_id-і train2-де бар жолдар'\nassert n_leak > 0, 'Қайталанулар leakage тудырады'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Шу белгілерден регрессия",
   "prompt": "<p>Нысана мен 1000 белгі — бәрі кездейсоқ шу. <code>leaky_r2</code>: бүкіл деректе <code>SelectKBest(f_regression, k=10)</code> таңдап, сосын <code>LinearRegression</code>-ның 5-fold CV R² орташасы. <code>honest_r2</code>: сол таңдауды <code>make_pipeline</code> ішіне салып, бастапқы X-те 5-fold CV.</p>",
   "starter": "import numpy as np\nfrom sklearn.feature_selection import SelectKBest, f_regression\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.pipeline import make_pipeline\nrng = np.random.default_rng(0)\nX = rng.normal(size=(80, 1000))\ny = rng.normal(size=80)\nleaky_r2 = None\nhonest_r2 = None\n",
   "solution": "import numpy as np\nfrom sklearn.feature_selection import SelectKBest, f_regression\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.pipeline import make_pipeline\nrng = np.random.default_rng(0)\nX = rng.normal(size=(80, 1000))\ny = rng.normal(size=80)\nXs = SelectKBest(f_regression, k=10).fit_transform(X, y)\nleaky_r2 = cross_val_score(LinearRegression(), Xs, y, cv=5).mean()\npipe = make_pipeline(SelectKBest(f_regression, k=10), LinearRegression())\nhonest_r2 = cross_val_score(pipe, X, y, cv=5).mean()\nprint(round(leaky_r2, 2), round(honest_r2, 2))",
   "hints": [
    "Leaky: <code>Xs = SelectKBest(f_regression, k=10).fit_transform(X, y)</code>",
    "Honest: <code>make_pipeline(SelectKBest(f_regression, k=10), LinearRegression())</code>"
   ],
   "check": {
    "tests": "assert leaky_r2 is not None and honest_r2 is not None, 'leaky_r2 мен honest_r2-ні есептеңіз'\nassert leaky_r2 > 0.1, f'Leakage-пен R² жасанды түрде оң (≈0.2), сізде {leaky_r2:.2f}. SelectKBest бүкіл X, y-де ме?'\nassert honest_r2 < 0, f'Адал R² нөлден төмен болуы керек: шу ештеңені болжамайды. Сізде {honest_r2:.2f}'\nassert leaky_r2 - honest_r2 > 0.5, 'Екеуінің айырмасы үлкен болуы керек'",
    "mustInclude": [
     "make_pipeline(",
     "cross_val_score("
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ақаулы бағанды табу",
   "prompt": "<p>Деректе <code>days_since_cancel</code> бар (тек кеткендерде толтырылады). Әр сандық белгінің <b>жалғыз өзі</b> қаншалықты болжайтынын тексеріңіз: <code>roc_auc_score(y, df[c].fillna(df[c].median()))</code>. <code>|AUC − 0.5|</code> мәндерін <code>strength</code> Series-ке жазыңыз, ең күштісін <code>leak_col</code>-ға. Сосын сол бағансыз <code>X_clean</code> жасаңыз.</p>",
   "starter": "import numpy as np\nimport pandas as pd\ndf = pd.read_csv('churn.csv')\nfrom sklearn.metrics import roc_auc_score\nrng = np.random.default_rng(3)\ndf['days_since_cancel'] = np.where(df['churned'] == 1, rng.integers(1, 30, len(df)), 0)\nnums = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract', 'days_since_cancel']\ny = df['churned']\n",
   "solution": "import numpy as np\nimport pandas as pd\ndf = pd.read_csv('churn.csv')\nfrom sklearn.metrics import roc_auc_score\nrng = np.random.default_rng(3)\ndf['days_since_cancel'] = np.where(df['churned'] == 1, rng.integers(1, 30, len(df)), 0)\nnums = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract', 'days_since_cancel']\ny = df['churned']\nstrength = pd.Series({c: abs(roc_auc_score(y, df[c].fillna(df[c].median())) - 0.5) for c in nums})\nleak_col = strength.idxmax()\nX_clean = df[[c for c in nums if c != leak_col]]\nprint(strength.round(3), leak_col)",
   "hints": [
    "Сөздік генераторы: <code>{c: ... for c in nums}</code>, сосын <code>pd.Series(...)</code>.",
    "<code>strength.idxmax()</code>"
   ],
   "check": {
    "tests": "from sklearn.metrics import roc_auc_score as _ra\n_s = {_c: abs(_ra(y, df[_c].fillna(df[_c].median())) - 0.5) for _c in nums}\nassert isinstance(strength, pd.Series) and set(strength.index) == set(nums), 'strength — nums бойынша Series'\nassert all(abs(strength[_c] - _s[_c]) < 1e-9 for _c in nums), '|AUC − 0.5| мәндері дұрыс емес: бос мәндерді медианамен толтырыңыз'\nassert leak_col == 'days_since_cancel', 'Ең күшті белгі — days_since_cancel: ол нәтижеден кейін пайда болады'\nassert list(X_clean.columns) == [_c for _c in nums if _c != 'days_since_cancel'], 'X_clean-де қалған 6 белгі'",
    "mustInclude": [
     "roc_auc_score("
    ]
   }
  }
 ],
 "mp-3": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бөлмеге шаққандағы аудан",
   "prompt": "<p><code>per_room(area, rooms)</code> функциясы бір бөлмеге келетін ауданды 1 таңбаға дейін дөңгелектеп қайтарсын. Егер <code>rooms</code> 0 болса (студия), ауданның өзін қайтарсын.</p><p>Мысалы, <code>per_room(65, 2)</code> → <code>32.5</code>.</p>",
   "starter": "def per_room(area, rooms):\n    pass\n",
   "solution": "def per_room(area, rooms):\n    if rooms == 0:\n        return round(area, 1)\n    return round(area / rooms, 1)\n\nprint(per_room(65, 2), per_room(30, 0))",
   "hints": [
    "Алдымен <code>rooms == 0</code> жағдайы.",
    "<code>round(area / rooms, 1)</code>"
   ],
   "check": {
    "tests": "assert per_room(65, 2) == 32.5, 'per_room(65, 2) 32.5 қайтаруы керек'\nassert per_room(30, 0) == 30, 'Студия: per_room(30, 0) = 30'\nassert per_room(100, 3) == 33.3, 'per_room(100, 3) = 33.3 (round(..., 1))'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ең ескі аудан",
   "prompt": "<p><code>flats['age'] = 2024 - flats['year_built']</code> бағанын қосыңыз. Аудан бойынша орташа жасты <code>age_by_district</code>-ке, үйлері ең ескі ауданды <code>oldest_district</code>-ке жазыңыз.</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nflats['age'] = 2024 - flats['year_built']\nage_by_district = flats.groupby('district')['age'].mean()\noldest_district = age_by_district.idxmax()\nprint(age_by_district.round(1), oldest_district)",
   "hints": [
    "<code>flats.groupby('district')['age'].mean()</code>",
    "<code>.idxmax()</code>"
   ],
   "check": {
    "tests": "_f = pd.read_csv('flats.csv')\n_g = (2024 - _f['year_built']).groupby(_f['district']).mean()\nassert 'age' in flats.columns and (flats['age'] == 2024 - flats['year_built']).all(), 'age = 2024 - year_built'\nassert _g.round(6).equals(age_by_district.round(6)), \"age_by_district = flats.groupby('district')['age'].mean()\"\nassert oldest_district == _g.idxmax(), f'oldest_district = {_g.idxmax()} болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бірінші қабат белгісі",
   "prompt": "<p><code>flats['is_first']</code> бағанын қосыңыз: <code>floor == 1</code> болса 1, әйтпесе 0 (int). Бірінші қабаттағы пәтерлердің орташа бағасын <code>first_price</code>-қа, қалғандарынікін <code>other_price</code>-қа жазыңыз.</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nflats['is_first'] = (flats['floor'] == 1).astype(int)\nfirst_price = flats.loc[flats['is_first'] == 1, 'price_mln'].mean()\nother_price = flats.loc[flats['is_first'] == 0, 'price_mln'].mean()\nprint(round(first_price, 2), round(other_price, 2))",
   "hints": [
    "<code>(flats['floor'] == 1).astype(int)</code>",
    "<code>flats.loc[шарт, 'price_mln'].mean()</code>"
   ],
   "check": {
    "tests": "_f = pd.read_csv('flats.csv')\nassert 'is_first' in flats.columns and set(flats['is_first'].unique()) <= {0, 1}, 'is_first — 0/1 баған'\nassert int(flats['is_first'].sum()) == int((_f['floor'] == 1).sum()), 'is_first: floor == 1 болса 1'\nassert abs(first_price - _f.loc[_f['floor'] == 1, 'price_mln'].mean()) < 1e-9, 'first_price — бірінші қабаттың орташа бағасы'\nassert abs(other_price - _f.loc[_f['floor'] != 1, 'price_mln'].mean()) < 1e-9, 'other_price — қалған пәтерлердің орташа бағасы'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бір гигабайт бағасы",
   "prompt": "<p>Churn-де <code>fee_per_gb = monthly_fee / data_gb</code> бағанын қосыңыз (бос <code>data_gb</code> үшін NaN қалады). Тариф бойынша оның медианасын <code>fee_gb_by_plan</code>-ға жазыңыз. 1 ГБ ең қымбат тарифті <code>priciest_plan</code>-ға жазыңыз.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\ndf['fee_per_gb'] = df['monthly_fee'] / df['data_gb']\nfee_gb_by_plan = df.groupby('plan')['fee_per_gb'].median()\npriciest_plan = fee_gb_by_plan.idxmax()\nprint(fee_gb_by_plan.round(1), priciest_plan)",
   "hints": [
    "<code>df['monthly_fee'] / df['data_gb']</code>",
    "<code>df.groupby('plan')['fee_per_gb'].median()</code>"
   ],
   "check": {
    "tests": "_d = pd.read_csv('churn.csv')\n_g = (_d['monthly_fee'] / _d['data_gb']).groupby(_d['plan']).median()\nassert 'fee_per_gb' in df.columns, 'df-ке fee_per_gb бағанын қосыңыз'\nassert set(fee_gb_by_plan.index) == {'basic', 'standard', 'premium'} and all(abs(fee_gb_by_plan[_p] - _g[_p]) < 1e-9 for _p in _g.index), 'fee_gb_by_plan — тариф бойынша медиана'\nassert priciest_plan == _g.idxmax(), f'priciest_plan = {_g.idxmax()} болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жаңа белгілер пайдасы",
   "prompt": "<p>Үш жаңа белгі жасаңыз: <code>area_per_room</code>, <code>floor_ratio</code> (<code>floor / floors_total</code>), <code>is_last</code> (соңғы қабат: 1/0). Бөлу <code>test_size=0.2</code>, <code>random_state=42</code>. <code>base</code> белгілерімен test R² → <code>r2_base</code>; <code>base</code> + үш жаңа белгі → <code>r2_new</code>.</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\nbase = ['area_m2', 'rooms', 'year_built']\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\nbase = ['area_m2', 'rooms', 'year_built']\nflats['area_per_room'] = flats['area_m2'] / flats['rooms']\nflats['floor_ratio'] = flats['floor'] / flats['floors_total']\nflats['is_last'] = (flats['floor'] == flats['floors_total']).astype(int)\nnew = base + ['area_per_room', 'floor_ratio', 'is_last']\ntr, te = train_test_split(flats, test_size=0.2, random_state=42)\nr2_base = LinearRegression().fit(tr[base], tr['price_mln']).score(te[base], te['price_mln'])\nr2_new = LinearRegression().fit(tr[new], tr['price_mln']).score(te[new], te['price_mln'])\nprint(round(r2_base, 4), round(r2_new, 4))",
   "hints": [
    "Бағандарды алдымен <code>flats</code>-қа қосып, сосын бөліңіз.",
    "<code>train_test_split(flats, test_size=0.2, random_state=42)</code>"
   ],
   "check": {
    "tests": "from sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LinearRegression as _LinR\n_f = pd.read_csv('flats.csv')\n_f['area_per_room'] = _f['area_m2'] / _f['rooms']\n_f['floor_ratio'] = _f['floor'] / _f['floors_total']\n_f['is_last'] = (_f['floor'] == _f['floors_total']).astype(int)\n_n = base + ['area_per_room', 'floor_ratio', 'is_last']\n_a, _b = _tts(_f, test_size=0.2, random_state=42)\nassert abs(r2_base - _LinR().fit(_a[base], _a['price_mln']).score(_b[base], _b['price_mln'])) < 1e-6, 'r2_base дұрыс емес: test_size=0.2, random_state=42'\nassert abs(r2_new - _LinR().fit(_a[_n], _a['price_mln']).score(_b[_n], _b['price_mln'])) < 1e-6, 'r2_new дұрыс емес: үш жаңа белгіні тексеріңіз'\nassert r2_new > r2_base, 'Жаңа белгілер R²-ды сәл көтеруі керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Логарифмдік нысана",
   "prompt": "<p>Бағалар оңға қисық таралған. Модельді <code>np.log(y)</code>-ке үйретіп, болжамды <code>np.exp</code>-пен кері қайтарыңыз. One-hot <code>X</code> дайын. Бөлу <code>test_size=0.2</code>, <code>random_state=42</code>. Кәдімгі модельдің test MAE-і → <code>mae_raw</code>, логарифмдік модельдікі → <code>mae_log</code> (екеуі де млн ₸-де).</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\nX = pd.get_dummies(flats[['area_m2', 'year_built', 'district']], columns=['district'], drop_first=True, dtype=int)\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\nX = pd.get_dummies(flats[['area_m2', 'year_built', 'district']], columns=['district'], drop_first=True, dtype=int)\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\nraw = LinearRegression().fit(X_train, y_train)\nmae_raw = np.mean(np.abs(raw.predict(X_test) - y_test))\nlogm = LinearRegression().fit(X_train, np.log(y_train))\nmae_log = np.mean(np.abs(np.exp(logm.predict(X_test)) - y_test))\nprint(round(mae_raw, 2), round(mae_log, 2))",
   "hints": [
    "<code>LinearRegression().fit(X_train, np.log(y_train))</code>",
    "Болжам: <code>np.exp(logm.predict(X_test))</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\n_r = _np.mean(_np.abs(_LinR().fit(X_train, y_train).predict(X_test) - y_test))\n_l = _np.mean(_np.abs(_np.exp(_LinR().fit(X_train, _np.log(y_train)).predict(X_test)) - y_test))\nassert abs(mae_raw - _r) < 1e-6, f'mae_raw ≈ {_r:.2f} болуы керек'\nassert abs(mae_log - _l) < 1e-6, f'mae_log ≈ {_l:.2f} болуы керек: np.log(y_train)-ге үйретіп, np.exp(predict) — млн ₸-ге қайтарыңыз'\nassert mae_log < mae_raw, 'Логарифмдік нысана бұл деректе қатені азайтады'",
    "mustInclude": [
     "np.log(",
     "np.exp("
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Тәуекел белгілері",
   "prompt": "<p>Екі бинарлық белгі қосыңыз: <code>many_calls</code> (<code>support_calls &gt;= 3</code>) және <code>new_customer</code> (<code>tenure_months &lt;= 6</code>), int. Pipeline: <code>SimpleImputer(strategy='median')</code> → <code>StandardScaler</code> → <code>LogisticRegression(max_iter=1000)</code>. Бүкіл деректе 5-fold ROC AUC: <code>base</code> бағандарымен → <code>auc_base</code>, + екі жаңа белгі → <code>auc_new</code>.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import cross_val_score\nbase = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ny = df['churned']\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import cross_val_score\nbase = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ny = df['churned']\ndf['many_calls'] = (df['support_calls'] >= 3).astype(int)\ndf['new_customer'] = (df['tenure_months'] <= 6).astype(int)\n\ndef cv_auc(cols):\n    m = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))\n    return cross_val_score(m, df[cols], y, cv=5, scoring='roc_auc').mean()\n\nauc_base = cv_auc(base)\nauc_new = cv_auc(base + ['many_calls', 'new_customer'])\nprint(round(auc_base, 4), round(auc_new, 4))",
   "hints": [
    "Қайталанатын бөлікке функция: <code>def cv_auc(cols): ...</code>",
    "<code>cross_val_score(m, df[cols], y, cv=5, scoring='roc_auc')</code>"
   ],
   "check": {
    "tests": "from sklearn.pipeline import make_pipeline as _mp\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\nfrom sklearn.model_selection import cross_val_score as _cvs\n_d = pd.read_csv('churn.csv')\n_d['many_calls'] = (_d['support_calls'] >= 3).astype(int)\n_d['new_customer'] = (_d['tenure_months'] <= 6).astype(int)\n_cv = lambda _c: _cvs(_mp(_SI(strategy='median'), _SS(), _LR(max_iter=1000)), _d[_c], _d['churned'], cv=5, scoring='roc_auc').mean()\nassert 'many_calls' in df.columns and int(df['many_calls'].sum()) == int(_d['many_calls'].sum()), 'many_calls: support_calls >= 3'\nassert 'new_customer' in df.columns and int(df['new_customer'].sum()) == int(_d['new_customer'].sum()), 'new_customer: tenure_months <= 6'\nassert abs(auc_base - _cv(base)) < 1e-6, f'auc_base ≈ {_cv(base):.4f} болуы керек'\nassert abs(auc_new - _cv(base + ['many_calls', 'new_customer'])) < 1e-6, 'auc_new дұрыс емес: base + many_calls + new_customer'",
    "mustInclude": [
     "cross_val_score("
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Аудандағы шаршы метр бағасы",
   "prompt": "<p>Аудан деңгейіндегі белгі: train-де әр ауданның бір шаршы метр бағасының орташасы (<code>price_mln / area_m2</code>) → <code>ppm</code> Series. Сосын train мен test-ке <code>est = area_m2 * district бойынша ppm</code> бағанын қосып, <code>area_m2</code>, <code>year_built</code>, <code>est</code> белгілерімен <code>LinearRegression</code> үйретіңіз. Test R² → <code>r2_est</code>. Бағаны тек train-нен алыңыз!</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\ntr, te = train_test_split(flats, test_size=0.2, random_state=42)\ntr = tr.copy()\nte = te.copy()\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\ntr, te = train_test_split(flats, test_size=0.2, random_state=42)\ntr = tr.copy()\nte = te.copy()\nppm = (tr['price_mln'] / tr['area_m2']).groupby(tr['district']).mean()\ntr['est'] = tr['area_m2'] * tr['district'].map(ppm)\nte['est'] = te['area_m2'] * te['district'].map(ppm)\ncols = ['area_m2', 'year_built', 'est']\nr2_est = LinearRegression().fit(tr[cols], tr['price_mln']).score(te[cols], te['price_mln'])\nprint(ppm.round(3), round(r2_est, 3))",
   "hints": [
    "<code>(tr['price_mln'] / tr['area_m2']).groupby(tr['district']).mean()</code>",
    "<code>te['district'].map(ppm)</code>"
   ],
   "check": {
    "tests": "from sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LinearRegression as _LinR\n_a, _b = _tts(pd.read_csv('flats.csv'), test_size=0.2, random_state=42)\n_a = _a.copy(); _b = _b.copy()\n_p = (_a['price_mln'] / _a['area_m2']).groupby(_a['district']).mean()\n_a['est'] = _a['area_m2'] * _a['district'].map(_p)\n_b['est'] = _b['area_m2'] * _b['district'].map(_p)\n_r = _LinR().fit(_a[['area_m2', 'year_built', 'est']], _a['price_mln']).score(_b[['area_m2', 'year_built', 'est']], _b['price_mln'])\nassert isinstance(ppm, pd.Series) and len(ppm) == 6 and all(abs(ppm[_k] - _p[_k]) < 1e-9 for _k in _p.index), 'ppm тек train-нен (tr) есептелуі керек'\nassert 'est' in te.columns and 'est' in tr.columns, \"tr мен te-ге est бағанын қосыңыз\"\nassert abs(te['est'] - _b['est']).max() < 1e-9, \"te['est'] = te['area_m2'] * te['district'].map(ppm)\"\nassert abs(r2_est - _r) < 1e-6, f'r2_est ≈ {_r:.3f} болуы керек'\nassert r2_est > 0.85, 'Аудан бағасы белгісі R²-ды айтарлықтай көтереді'",
    "mustInclude": [
     "map("
    ]
   }
  }
 ],
 "mp-4": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Тор өлшемі",
   "prompt": "<p><code>grid_size(grid)</code> функциясы параметр торындағы комбинациялар санын қайтарсын: әр параметр мәндері санының көбейтіндісі.</p><p>Мысалы, <code>grid_size({'C': [0.1, 1, 10], 'penalty': ['l2']})</code> → <code>3</code>.</p>",
   "starter": "def grid_size(grid):\n    pass\n",
   "solution": "def grid_size(grid):\n    n = 1\n    for values in grid.values():\n        n *= len(values)\n    return n\n\nprint(grid_size({'C': [0.1, 1, 10], 'penalty': ['l2']}))",
   "hints": [
    "<code>for values in grid.values():</code>",
    "Бастапқы мән 1, әр қадамда <code>n *= len(values)</code>."
   ],
   "check": {
    "tests": "assert grid_size({'C': [0.1, 1, 10], 'penalty': ['l2']}) == 3, \"grid_size({'C': [0.1, 1, 10], 'penalty': ['l2']}) 3 қайтаруы керек\"\nassert grid_size({'max_depth': [2, 3, 5], 'min_samples_leaf': [1, 10, 30]}) == 9, '3 × 3 = 9'\nassert grid_size({'a': [1, 2], 'b': [1, 2], 'c': [1, 2, 3, 4]}) == 16, '2 × 2 × 4 = 16'\nassert grid_size({}) == 1, 'Бос тор: бір ғана (әдепкі) комбинация'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ағаш тереңдігін іздеу",
   "prompt": "<p><code>GridSearchCV(DecisionTreeRegressor(random_state=0), {'max_depth': [2, 4, 6, 8]}, cv=5)</code>-ды <code>grid</code> атымен пәтерлердің сандық белгілерінде (бүкіл X, y) үйретіңіз. Ең жақсы тереңдікті <code>best_depth</code>-ке, оның CV R²-ын <code>best_r2</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import GridSearchCV\nfrom sklearn.tree import DecisionTreeRegressor\nX = flats[['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']]\ny = flats['price_mln']\ngrid = None\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import GridSearchCV\nfrom sklearn.tree import DecisionTreeRegressor\nX = flats[['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']]\ny = flats['price_mln']\ngrid = GridSearchCV(DecisionTreeRegressor(random_state=0), {'max_depth': [2, 4, 6, 8]}, cv=5)\ngrid.fit(X, y)\nbest_depth = grid.best_params_['max_depth']\nbest_r2 = grid.best_score_\nprint(best_depth, round(best_r2, 3))",
   "hints": [
    "Параметр аты Pipeline-сыз жай: <code>'max_depth'</code>.",
    "<code>grid.best_params_['max_depth']</code>"
   ],
   "check": {
    "tests": "from sklearn.model_selection import GridSearchCV as _G\nimport numpy as _np\nassert isinstance(grid, _G) and hasattr(grid, 'best_params_'), 'grid — үйретілген GridSearchCV'\nassert len(grid.cv_results_['params']) == 4, 'Торда max_depth-тің 4 мәні'\n_i = int(_np.argmax(grid.cv_results_['mean_test_score']))\nassert best_depth == grid.cv_results_['params'][_i]['max_depth'], \"best_depth = grid.best_params_['max_depth']\"\nassert abs(best_r2 - grid.best_score_) < 1e-12, 'best_r2 = grid.best_score_'",
    "mustInclude": [
     "GridSearchCV("
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Көршілер санын іздеу",
   "prompt": "<p>Pipeline: <code>('sc', StandardScaler())</code> → <code>('knn', KNeighborsClassifier())</code>. <code>knn__n_neighbors</code> ∈ [5, 15, 25] торымен <code>GridSearchCV</code> (<code>cv=5</code>) жасап, <code>grid</code> атымен <code>X4</code>, <code>y</code>-де үйретіңіз. <code>best_k</code> және <code>best_cv</code> (ең жақсы CV accuracy).</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nX4 = df[['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']]\ny = df['churned']\nfrom sklearn.model_selection import GridSearchCV\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.neighbors import KNeighborsClassifier\ngrid = None\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nX4 = df[['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']]\ny = df['churned']\nfrom sklearn.model_selection import GridSearchCV\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.neighbors import KNeighborsClassifier\npipe = Pipeline([('sc', StandardScaler()), ('knn', KNeighborsClassifier())])\ngrid = GridSearchCV(pipe, {'knn__n_neighbors': [5, 15, 25]}, cv=5).fit(X4, y)\nbest_k = grid.best_params_['knn__n_neighbors']\nbest_cv = grid.best_score_\nprint(best_k, round(best_cv, 3))",
   "hints": [
    "Параметр аты: <code>'қадам__параметр'</code>, яғни <code>'knn__n_neighbors'</code>."
   ],
   "check": {
    "tests": "from sklearn.model_selection import GridSearchCV as _G\nassert isinstance(grid, _G) and hasattr(grid, 'best_score_'), 'grid — үйретілген GridSearchCV'\nassert sorted(_p['knn__n_neighbors'] for _p in grid.cv_results_['params']) == [5, 15, 25], \"Тор: {'knn__n_neighbors': [5, 15, 25]} (қадам аты 'knn')\"\nassert best_k == grid.best_params_['knn__n_neighbors'] and abs(best_cv - grid.best_score_) < 1e-12, 'best_k мен best_cv — grid-тің ең жақсы нәтижесі'\nassert 0.7 < best_cv < 0.85, f'CV accuracy ≈ 0.78 болуы керек, сізде {best_cv:.3f}'",
    "mustInclude": [
     "GridSearchCV("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Екі параметрлі тор",
   "prompt": "<p><code>DecisionTreeClassifier(random_state=0)</code> үшін тор: <code>max_depth</code> ∈ [2, 3, 5], <code>min_samples_leaf</code> ∈ [1, 10, 30]; <code>cv=5</code>, <code>scoring='roc_auc'</code>. <code>grid</code>-ты <code>X4</code>, <code>y</code>-де үйретіп, комбинациялар санын <code>n_combos</code>-қа, ең жақсы параметрлерді <code>best_params</code>-қа жазыңыз.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nX4 = df[['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']]\ny = df['churned']\nfrom sklearn.model_selection import GridSearchCV\nfrom sklearn.tree import DecisionTreeClassifier\ngrid = None\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nX4 = df[['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']]\ny = df['churned']\nfrom sklearn.model_selection import GridSearchCV\nfrom sklearn.tree import DecisionTreeClassifier\nparams = {'max_depth': [2, 3, 5], 'min_samples_leaf': [1, 10, 30]}\ngrid = GridSearchCV(DecisionTreeClassifier(random_state=0), params, cv=5, scoring='roc_auc').fit(X4, y)\nn_combos = len(grid.cv_results_['params'])\nbest_params = grid.best_params_\nprint(n_combos, best_params, round(grid.best_score_, 3))",
   "hints": [
    "Тор сөздігінде екі кілт: <code>{'max_depth': [...], 'min_samples_leaf': [...]}</code>",
    "<code>len(grid.cv_results_['params'])</code>"
   ],
   "check": {
    "tests": "from sklearn.model_selection import GridSearchCV as _G\nassert isinstance(grid, _G) and hasattr(grid, 'best_params_'), 'grid — үйретілген GridSearchCV'\nassert grid.scoring == 'roc_auc', \"scoring='roc_auc' беріңіз\"\nassert n_combos == 9, 'n_combos = 3 × 3 = 9'\nassert best_params == grid.best_params_ and set(best_params) == {'max_depth', 'min_samples_leaf'}, 'best_params = grid.best_params_'\nassert 0.75 < grid.best_score_ < 0.9, 'Ең жақсы CV AUC ≈ 0.8 болуы керек'",
    "mustInclude": [
     "GridSearchCV("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Нәтижелер кестесі",
   "prompt": "<p><code>grid</code> үйретілген. <code>grid.cv_results_</code>-тан <code>table</code> DataFrame жасаңыз: бағандар <code>max_depth</code>, <code>min_samples_leaf</code>, <code>mean_test_score</code>, <code>mean_test_score</code> бойынша кему ретімен сұрыпталған. Бірінші жолдың баллы <code>best_score_</code>-қа тең болуы керек.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nX4 = df[['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']]\ny = df['churned']\nfrom sklearn.model_selection import GridSearchCV\nfrom sklearn.tree import DecisionTreeClassifier\nparams = {'max_depth': [2, 3, 5], 'min_samples_leaf': [1, 10, 30]}\ngrid = GridSearchCV(DecisionTreeClassifier(random_state=0), params, cv=5, scoring='roc_auc').fit(X4, y)\ntable = None\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nX4 = df[['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']]\ny = df['churned']\nfrom sklearn.model_selection import GridSearchCV\nfrom sklearn.tree import DecisionTreeClassifier\nparams = {'max_depth': [2, 3, 5], 'min_samples_leaf': [1, 10, 30]}\ngrid = GridSearchCV(DecisionTreeClassifier(random_state=0), params, cv=5, scoring='roc_auc').fit(X4, y)\nres = grid.cv_results_\ntable = pd.DataFrame({'max_depth': res['param_max_depth'], 'min_samples_leaf': res['param_min_samples_leaf'], 'mean_test_score': res['mean_test_score']})\ntable = table.sort_values('mean_test_score', ascending=False)\nprint(table.head())",
   "hints": [
    "<code>grid.cv_results_['param_max_depth']</code>, <code>['mean_test_score']</code>",
    "<code>sort_values('mean_test_score', ascending=False)</code>"
   ],
   "check": {
    "tests": "assert isinstance(table, pd.DataFrame) and len(table) == 9, 'table — 9 жолды DataFrame'\nassert {'max_depth', 'min_samples_leaf', 'mean_test_score'} <= set(table.columns), 'Бағандар: max_depth, min_samples_leaf, mean_test_score'\nassert list(table['mean_test_score']) == sorted(table['mean_test_score'], reverse=True), 'mean_test_score бойынша кему ретімен сұрыптаңыз'\nassert abs(table['mean_test_score'].iloc[0] - grid.best_score_) < 1e-12, 'Бірінші жол — ең жақсы комбинация'\nassert int(table['max_depth'].iloc[0]) == grid.best_params_['max_depth'], 'Бірінші жолдың max_depth-і best_params_-пен сәйкес'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қолмен тор",
   "prompt": "<p>GridSearchCV не істейтінін қолмен қайталаңыз. <code>C</code> ∈ [0.01, 0.1, 1, 10] үшін <code>pre</code> + <code>LogisticRegression(C=C, max_iter=1000)</code> Pipeline-ының <code>X_train</code>-дегі 5-fold ROC AUC орташасын <code>manual</code> сөздігіне жазыңыз. Ең жақсысын <code>best_C</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import cross_val_score\nmanual = {}\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import cross_val_score\nmanual = {}\nfor C in [0.01, 0.1, 1, 10]:\n    m = Pipeline([('pre', pre), ('model', LogisticRegression(C=C, max_iter=1000))])\n    manual[C] = cross_val_score(m, X_train, y_train, cv=5, scoring='roc_auc').mean()\nbest_C = max(manual, key=manual.get)\nprint(manual, best_C)",
   "hints": [
    "Цикл: <code>for C in [0.01, 0.1, 1, 10]:</code>",
    "Әр C үшін жаңа Pipeline."
   ],
   "check": {
    "tests": "assert sorted(manual) == [0.01, 0.1, 1, 10], 'manual кілттері: 0.01, 0.1, 1, 10'\nassert all(0.7 < _v < 0.9 for _v in manual.values()), \"AUC мәндері 0.7–0.9: scoring='roc_auc', X_train-де\"\nfrom sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import OneHotEncoder as _OH, StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre():\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), cat)])\nfrom sklearn.model_selection import cross_val_score as _cvs\n_r1 = _cvs(_Pl([('pre', _pre()), ('model', _LR(C=1, max_iter=1000))]), X_train, y_train, cv=5, scoring='roc_auc').mean()\nassert abs(manual[1] - _r1) < 1e-6, f'C=1 үшін AUC ≈ {_r1:.4f} болуы керек: cross_val_score(m, X_train, y_train, cv=5, scoring=\"roc_auc\")'\nassert best_C == max(manual, key=manual.get), 'best_C — AUC ең жоғары C'",
    "mustInclude": [
     "cross_val_score("
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Pipeline ішіндегі KNN торы",
   "prompt": "<p>Пәтерлер бөлуі мен <code>pre_f</code> дайын. Pipeline <code>('pre', pre_f)</code> → <code>('model', KNeighborsRegressor())</code>. <code>model__n_neighbors</code> ∈ [3, 5, 10, 20], <code>cv=5</code> торымен <code>grid</code> жасап, <code>X_train</code>-де үйретіңіз. <code>best_k</code> және test R² (<code>grid.score(X_test, y_test)</code>) → <code>test_r2</code>.</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nX = flats.drop(columns=['flat_id', 'price_mln'])\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nfnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\npre_f = ColumnTransformer([('num', StandardScaler(), fnum), ('cat', OneHotEncoder(handle_unknown='ignore'), ['district'])])\nfrom sklearn.model_selection import GridSearchCV\nfrom sklearn.neighbors import KNeighborsRegressor\ngrid = None\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nX = flats.drop(columns=['flat_id', 'price_mln'])\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nfnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\npre_f = ColumnTransformer([('num', StandardScaler(), fnum), ('cat', OneHotEncoder(handle_unknown='ignore'), ['district'])])\nfrom sklearn.model_selection import GridSearchCV\nfrom sklearn.neighbors import KNeighborsRegressor\npipe = Pipeline([('pre', pre_f), ('model', KNeighborsRegressor())])\ngrid = GridSearchCV(pipe, {'model__n_neighbors': [3, 5, 10, 20]}, cv=5).fit(X_train, y_train)\nbest_k = grid.best_params_['model__n_neighbors']\ntest_r2 = grid.score(X_test, y_test)\nprint(best_k, round(test_r2, 3))",
   "hints": [
    "Параметр аты: <code>'model__n_neighbors'</code>",
    "<code>grid.fit(X_train, y_train)</code>, сосын <code>grid.score(X_test, y_test)</code>"
   ],
   "check": {
    "tests": "from sklearn.model_selection import GridSearchCV as _G\nassert isinstance(grid, _G) and hasattr(grid, 'best_estimator_'), 'grid — үйретілген GridSearchCV'\nassert len(grid.cv_results_['params']) == 4, 'Торда n_neighbors-тің 4 мәні'\nassert grid.n_features_in_ == 6 if hasattr(grid, 'n_features_in_') else True, 'grid X_train-нің 6 шикі бағанында үйретілуі керек'\nassert best_k == grid.best_params_['model__n_neighbors'], \"best_k = grid.best_params_['model__n_neighbors']\"\nassert abs(test_r2 - grid.score(X_test, y_test)) < 1e-9 and test_r2 > 0.8, f'test_r2 = grid.score(X_test, y_test) ≈ 0.85+, сізде {test_r2:.3f}'",
    "mustInclude": [
     "GridSearchCV("
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Nested CV",
   "prompt": "<p>GridSearchCV-дің <code>best_score_</code>-ы сәл оптимистік: ол сол баллдар бойынша таңдалды. Адал бағалау — nested CV: <code>inner = GridSearchCV(DecisionTreeClassifier(random_state=0), {'max_depth': [2, 4, 6]}, cv=3)</code> объектісін <code>cross_val_score(inner, X4, y, cv=3)</code>-ке беріңіз. Орташаны <code>nested</code>-ке жазыңыз. Салыстыру үшін <code>inner</code>-ді бүкіл X4, y-де fit етіп, <code>best_score_</code>-ты <code>optimistic</code>-ке жазыңыз.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nX4 = df[['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']]\ny = df['churned']\nfrom sklearn.model_selection import GridSearchCV\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.tree import DecisionTreeClassifier\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nX4 = df[['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']]\ny = df['churned']\nfrom sklearn.model_selection import GridSearchCV\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.tree import DecisionTreeClassifier\ninner = GridSearchCV(DecisionTreeClassifier(random_state=0), {'max_depth': [2, 4, 6]}, cv=3)\nnested = cross_val_score(inner, X4, y, cv=3).mean()\noptimistic = inner.fit(X4, y).best_score_\nprint(round(nested, 3), round(optimistic, 3))",
   "hints": [
    "GridSearchCV — бұл да модель: оны <code>cross_val_score</code>-қа беруге болады.",
    "<code>inner.fit(X4, y).best_score_</code>"
   ],
   "check": {
    "tests": "from sklearn.model_selection import GridSearchCV as _G, cross_val_score as _cvs\nfrom sklearn.tree import DecisionTreeClassifier as _DT\n_in = _G(_DT(random_state=0), {'max_depth': [2, 4, 6]}, cv=3)\n_n = _cvs(_in, X4, y, cv=3).mean()\n_o = _in.fit(X4, y).best_score_\nassert abs(nested - _n) < 1e-9, f'nested ≈ {_n:.3f} болуы керек: cross_val_score(inner, X4, y, cv=3).mean()'\nassert abs(optimistic - _o) < 1e-9, f'optimistic ≈ {_o:.3f} болуы керек: inner.fit(X4, y).best_score_'",
    "mustInclude": [
     "cross_val_score(",
     "GridSearchCV("
    ]
   }
  }
 ],
 "mp-5": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бутстрап үлгісі",
   "prompt": "<p>Орманның әр ағашы бутстрап үлгіде үйренеді: <code>n</code> жолдан қайталап <code>n</code> рет таңдау. <code>rng.integers(0, 1000, 1000)</code> арқылы <code>sample</code> жасап, бірегей жолдар үлесін <code>frac_unique</code>-ке жазыңыз (теория бойынша ≈ 1 − 1/e ≈ 0.632).</p>",
   "starter": "import numpy as np\nrng = np.random.default_rng(0)\n",
   "solution": "import numpy as np\nrng = np.random.default_rng(0)\nsample = rng.integers(0, 1000, 1000)\nfrac_unique = len(np.unique(sample)) / 1000\nprint(frac_unique)",
   "hints": [
    "<code>np.unique(sample)</code> — бірегей мәндер."
   ],
   "check": {
    "tests": "import numpy as _np\n_s = _np.random.default_rng(0).integers(0, 1000, 1000)\nassert len(sample) == 1000, 'sample-да 1000 мән'\nassert list(sample[:5]) == list(_s[:5]), 'sample = rng.integers(0, 1000, 1000) (rng-ді алдын ала қолданбаңыз)'\nassert abs(frac_unique - len(_np.unique(_s)) / 1000) < 1e-9 and 0.6 < frac_unique < 0.66, 'frac_unique = бірегей мәндер саны / 1000 ≈ 0.63'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Көпшілік дауыс",
   "prompt": "<p>Жіктеу орманы ағаштардың дауысын біріктіреді. <code>majority(votes)</code> функциясы 0/1 дауыстар тізімінде бірліктер жартысынан <b>көп</b> болса 1, әйтпесе 0 қайтарсын.</p><p>Мысалы, <code>majority([1, 0, 1])</code> → <code>1</code>, <code>majority([1, 0])</code> → <code>0</code>.</p>",
   "starter": "def majority(votes):\n    pass\n",
   "solution": "def majority(votes):\n    return 1 if sum(votes) > len(votes) / 2 else 0\n\nprint(majority([1, 0, 1]), majority([1, 0]))",
   "hints": [
    "<code>sum(votes) &gt; len(votes) / 2</code>"
   ],
   "check": {
    "tests": "assert majority([1, 0, 1]) == 1, 'majority([1, 0, 1]) 1 қайтаруы керек'\nassert majority([1, 0]) == 0, 'Тең дауыс: 0'\nassert majority([0, 0, 0, 1, 1]) == 0, 'majority([0, 0, 0, 1, 1]) = 0'\nassert majority([1] * 51 + [0] * 49) == 1, '51 қарсы 49: 1'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Орман регрессиясы",
   "prompt": "<p>Орман бағаны да болжайды. Пәтерлердің сандық белгілерінде (<code>fnum</code>) <code>RandomForestRegressor(n_estimators=50, random_state=0)</code>-ды <code>rf</code> атымен train-де үйретіп, test R²-ын <code>rf_r2</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nX = flats.drop(columns=['flat_id', 'price_mln'])\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)\nfrom sklearn.ensemble import RandomForestRegressor\nfnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nX = flats.drop(columns=['flat_id', 'price_mln'])\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)\nfrom sklearn.ensemble import RandomForestRegressor\nfnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\nrf = RandomForestRegressor(n_estimators=50, random_state=0).fit(X_train[fnum], y_train)\nrf_r2 = rf.score(X_test[fnum], y_test)\nprint(round(rf_r2, 3))",
   "hints": [
    "<code>X_train[fnum]</code> — тек сандық бағандар."
   ],
   "check": {
    "tests": "from sklearn.ensemble import RandomForestRegressor as _RFR\nassert isinstance(rf, _RFR) and len(rf.estimators_) == 50, 'rf — 50 ағашты RandomForestRegressor'\nassert rf.n_features_in_ == 5, 'Тек fnum бағандары (5 белгі)'\nassert abs(rf_r2 - rf.score(X_test[fnum], y_test)) < 1e-9 and 0.5 < rf_r2 < 0.9, f'rf_r2 = rf.score(X_test[fnum], y_test), сізде {rf_r2:.3f}'",
    "mustInclude": [
     "RandomForestRegressor("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ағаштар саны",
   "prompt": "<p><code>n_estimators</code> ∈ [1, 10, 50] үшін <code>RandomForestClassifier(random_state=0)</code>-ды <code>X4</code> бөлуінің train-інде үйретіп, test ROC AUC-ын <code>auc_by_n</code> сөздігіне жазыңыз.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nX4 = df[['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']]\ny = df['churned']\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import roc_auc_score\nfrom sklearn.ensemble import RandomForestClassifier\nX_train, X_test, y_train, y_test = train_test_split(X4, y, test_size=0.25, random_state=0, stratify=y)\nauc_by_n = {}\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nX4 = df[['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']]\ny = df['churned']\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import roc_auc_score\nfrom sklearn.ensemble import RandomForestClassifier\nX_train, X_test, y_train, y_test = train_test_split(X4, y, test_size=0.25, random_state=0, stratify=y)\nauc_by_n = {}\nfor n in [1, 10, 50]:\n    rf = RandomForestClassifier(n_estimators=n, random_state=0).fit(X_train, y_train)\n    auc_by_n[n] = roc_auc_score(y_test, rf.predict_proba(X_test)[:, 1])\nprint(auc_by_n)",
   "hints": [
    "Цикл: <code>for n in [1, 10, 50]:</code>",
    "<code>roc_auc_score(y_test, rf.predict_proba(X_test)[:, 1])</code>"
   ],
   "check": {
    "tests": "from sklearn.ensemble import RandomForestClassifier as _RF\nfrom sklearn.metrics import roc_auc_score as _ra\n_r = {_n: _ra(y_test, _RF(n_estimators=_n, random_state=0).fit(X_train, y_train).predict_proba(X_test)[:, 1]) for _n in [1, 10, 50]}\nassert sorted(auc_by_n) == [1, 10, 50], 'auc_by_n кілттері: 1, 10, 50'\nassert all(abs(auc_by_n[_n] - _r[_n]) < 1e-9 for _n in _r), 'AUC мәндері дұрыс емес: roc_auc_score(y_test, predict_proba(X_test)[:, 1])'\nassert auc_by_n[50] > auc_by_n[1] + 0.05, 'Ағаш көбейсе, AUC айқын өседі'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ағаштардың орташасы",
   "prompt": "<p>Регрессия орманының болжамы — ағаштар болжамдарының орташасы. <code>rf.estimators_</code> әр ағашының <code>X_test[fnum].values</code>-тегі болжамын алып, орташасын <code>avg_pred</code>-ке жазыңыз. <code>rf.predict</code>-пен ең үлкен айырманы <code>max_diff</code>-ке жазыңыз.</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nX = flats.drop(columns=['flat_id', 'price_mln'])\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)\nimport numpy as np\nfrom sklearn.ensemble import RandomForestRegressor\nfnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\nrf = RandomForestRegressor(n_estimators=20, random_state=0).fit(X_train[fnum], y_train)\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nX = flats.drop(columns=['flat_id', 'price_mln'])\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)\nimport numpy as np\nfrom sklearn.ensemble import RandomForestRegressor\nfnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\nrf = RandomForestRegressor(n_estimators=20, random_state=0).fit(X_train[fnum], y_train)\nXv = X_test[fnum].values\nall_preds = np.array([t.predict(Xv) for t in rf.estimators_])\navg_pred = all_preds.mean(axis=0)\nmax_diff = np.abs(avg_pred - rf.predict(X_test[fnum])).max()\nprint(all_preds.shape, max_diff)",
   "hints": [
    "<code>[t.predict(Xv) for t in rf.estimators_]</code>",
    "<code>np.array(...).mean(axis=0)</code> — әр пәтер бойынша орташа."
   ],
   "check": {
    "tests": "import numpy as _np\nassert len(avg_pred) == 100, 'avg_pred — 100 test пәтер үшін'\nassert _np.allclose(avg_pred, rf.predict(X_test[fnum])), 'avg_pred = ағаштар болжамдарының орташасы (axis=0)'\nassert max_diff < 1e-9, 'max_diff ≈ 0 болуы керек'",
    "mustInclude": [
     "estimators_"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бір ағаш пен орман",
   "prompt": "<p>Пәтерлердің сандық белгілерінде test R²-ды салыстырыңыз: <code>DecisionTreeRegressor(random_state=0)</code> → <code>tree_r2</code>, <code>RandomForestRegressor(n_estimators=50, random_state=0)</code> → <code>forest_r2</code>. <code>gain = forest_r2 - tree_r2</code>.</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nX = flats.drop(columns=['flat_id', 'price_mln'])\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)\nfrom sklearn.tree import DecisionTreeRegressor\nfrom sklearn.ensemble import RandomForestRegressor\nfnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nX = flats.drop(columns=['flat_id', 'price_mln'])\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)\nfrom sklearn.tree import DecisionTreeRegressor\nfrom sklearn.ensemble import RandomForestRegressor\nfnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\ntree_r2 = DecisionTreeRegressor(random_state=0).fit(X_train[fnum], y_train).score(X_test[fnum], y_test)\nforest_r2 = RandomForestRegressor(n_estimators=50, random_state=0).fit(X_train[fnum], y_train).score(X_test[fnum], y_test)\ngain = forest_r2 - tree_r2\nprint(round(tree_r2, 3), round(forest_r2, 3), round(gain, 3))",
   "hints": [
    "Екі модель де <code>X_train[fnum]</code>-де."
   ],
   "check": {
    "tests": "from sklearn.tree import DecisionTreeRegressor as _DR\nfrom sklearn.ensemble import RandomForestRegressor as _RFR\n_t = _DR(random_state=0).fit(X_train[fnum], y_train).score(X_test[fnum], y_test)\n_f = _RFR(n_estimators=50, random_state=0).fit(X_train[fnum], y_train).score(X_test[fnum], y_test)\nassert abs(tree_r2 - _t) < 1e-9, f'tree_r2 ≈ {_t:.3f} болуы керек'\nassert abs(forest_r2 - _f) < 1e-9, f'forest_r2 ≈ {_f:.3f} болуы керек'\nassert abs(gain - (_f - _t)) < 1e-9 and gain > 0.1, 'Орман бір ағаштан айқын жақсы: gain > 0.1'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "max_features әсері",
   "prompt": "<p>Орман ағаштарын әртүрлі ету үшін әр бөлуде белгілердің бір бөлігін ғана қарайды. <code>max_features</code> ∈ [1, 'sqrt', None] үшін <code>RandomForestClassifier(n_estimators=50, random_state=0)</code>-дың <code>X4</code>, <code>y</code>-дегі 3-fold ROC AUC орташасын <code>auc_by_mf</code> сөздігіне жазыңыз (кілт — мәннің өзі). Ең жақсысын <code>best_mf</code>-ке жазыңыз.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nX4 = df[['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']]\ny = df['churned']\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.ensemble import RandomForestClassifier\nauc_by_mf = {}\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nX4 = df[['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']]\ny = df['churned']\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.ensemble import RandomForestClassifier\nauc_by_mf = {}\nfor mf in [1, 'sqrt', None]:\n    rf = RandomForestClassifier(n_estimators=50, max_features=mf, random_state=0)\n    auc_by_mf[mf] = cross_val_score(rf, X4, y, cv=3, scoring='roc_auc').mean()\nbest_mf = max(auc_by_mf, key=auc_by_mf.get)\nprint(auc_by_mf, best_mf)",
   "hints": [
    "<code>RandomForestClassifier(n_estimators=50, max_features=mf, random_state=0)</code>",
    "<code>cross_val_score(rf, X4, y, cv=3, scoring='roc_auc')</code>"
   ],
   "check": {
    "tests": "from sklearn.ensemble import RandomForestClassifier as _RF\nfrom sklearn.model_selection import cross_val_score as _cvs\nassert set(auc_by_mf) == {1, 'sqrt', None}, \"auc_by_mf кілттері: 1, 'sqrt', None\"\n_r1 = _cvs(_RF(n_estimators=50, max_features=1, random_state=0), X4, y, cv=3, scoring='roc_auc').mean()\nassert abs(auc_by_mf[1] - _r1) < 1e-9, f\"max_features=1 үшін AUC ≈ {_r1:.4f}: cv=3, scoring='roc_auc'\"\nassert all(0.7 < _v < 0.9 for _v in auc_by_mf.values()), 'AUC мәндері 0.7–0.9 аралығында'\nassert best_mf == max(auc_by_mf, key=auc_by_mf.get), 'best_mf — AUC ең жоғары мән'",
    "mustInclude": [
     "max_features"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Орман мен сызықтық модель",
   "prompt": "<p>Пәтерлер бөлуі мен <code>pre_f</code> дайын. Екі Pipeline: <code>pre_f</code> + <code>LinearRegression()</code> және <code>pre_f</code> + <code>RandomForestRegressor(n_estimators=50, random_state=0)</code>. Test MAE: <code>mae_lr</code>, <code>mae_rf</code>. Қатесі азының атын <code>winner</code>-ге жазыңыз: <code>'linear'</code> немесе <code>'forest'</code>.</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nX = flats.drop(columns=['flat_id', 'price_mln'])\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nfnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\npre_f = ColumnTransformer([('num', StandardScaler(), fnum), ('cat', OneHotEncoder(handle_unknown='ignore'), ['district'])])\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.ensemble import RandomForestRegressor\nfrom sklearn.metrics import mean_absolute_error\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nX = flats.drop(columns=['flat_id', 'price_mln'])\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nfnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\npre_f = ColumnTransformer([('num', StandardScaler(), fnum), ('cat', OneHotEncoder(handle_unknown='ignore'), ['district'])])\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.ensemble import RandomForestRegressor\nfrom sklearn.metrics import mean_absolute_error\nlr = Pipeline([('pre', pre_f), ('model', LinearRegression())]).fit(X_train, y_train)\nrf = Pipeline([('pre', pre_f), ('model', RandomForestRegressor(n_estimators=50, random_state=0))]).fit(X_train, y_train)\nmae_lr = mean_absolute_error(y_test, lr.predict(X_test))\nmae_rf = mean_absolute_error(y_test, rf.predict(X_test))\nwinner = 'linear' if mae_lr < mae_rf else 'forest'\nprint(round(mae_lr, 2), round(mae_rf, 2), winner)",
   "hints": [
    "Екі Pipeline да шикі <code>X_train</code>-ді қабылдайды.",
    "<code>mean_absolute_error(y_test, model.predict(X_test))</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nfrom sklearn.pipeline import Pipeline as _P\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.preprocessing import OneHotEncoder as _OH, StandardScaler as _SS\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.ensemble import RandomForestRegressor as _RFR\n_pre = lambda: _CT([('num', _SS(), fnum), ('cat', _OH(handle_unknown='ignore'), ['district'])])\n_ml = _np.mean(_np.abs(y_test - _P([('pre', _pre()), ('m', _LinR())]).fit(X_train, y_train).predict(X_test)))\n_mr = _np.mean(_np.abs(y_test - _P([('pre', _pre()), ('m', _RFR(n_estimators=50, random_state=0))]).fit(X_train, y_train).predict(X_test)))\nassert abs(mae_lr - _ml) < 1e-6, f'mae_lr ≈ {_ml:.2f} болуы керек'\nassert abs(mae_rf - _mr) < 1e-6, f'mae_rf ≈ {_mr:.2f} болуы керек'\nassert winner == ('linear' if _ml < _mr else 'forest'), \"winner: 'linear' немесе 'forest'\""
   }
  }
 ],
 "mp-6": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қалдықтар",
   "prompt": "<p>Boosting әр қадамда қалдықтарды болжайды. <code>residuals(y, pred)</code> функциясы <code>y − pred</code> тізімін қайтарсын.</p><p>Мысалы, <code>residuals([10, 20], [12, 15])</code> → <code>[-2, 5]</code>.</p>",
   "starter": "def residuals(y, pred):\n    pass\n",
   "solution": "def residuals(y, pred):\n    return [a - b for a, b in zip(y, pred)]\n\nprint(residuals([10, 20], [12, 15]))",
   "hints": [
    "<code>[a - b for a, b in zip(y, pred)]</code>"
   ],
   "check": {
    "tests": "assert list(residuals([10, 20], [12, 15])) == [-2, 5], 'residuals([10, 20], [12, 15]) [-2, 5] қайтаруы керек'\nassert list(residuals([1, 1, 1], [1, 1, 1])) == [0, 0, 0], 'Мінсіз болжам: нөлдер'\nassert list(residuals([30.5], [28.0])) == [2.5], 'residuals([30.5], [28.0]) = [2.5]'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Boosting қадамы",
   "prompt": "<p><code>boost_step(pred, tree_pred, lr)</code> функциясы жаңа болжамды NumPy массиві ретінде қайтарсын: <code>pred + lr × tree_pred</code>.</p><p>Мысалы, <code>boost_step([10, 10], [4, -2], 0.5)</code> → <code>[12, 9]</code>.</p>",
   "starter": "import numpy as np\n\ndef boost_step(pred, tree_pred, lr):\n    pass\n",
   "solution": "import numpy as np\n\ndef boost_step(pred, tree_pred, lr):\n    return np.asarray(pred, dtype=float) + lr * np.asarray(tree_pred, dtype=float)\n\nprint(boost_step([10, 10], [4, -2], 0.5))",
   "hints": [
    "Тізімдерді массивке айналдырыңыз: <code>np.asarray(...)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nassert boost_step([10, 10], [4, -2], 0.5) is not None and _np.allclose(boost_step([10, 10], [4, -2], 0.5), [12, 9]), 'boost_step([10, 10], [4, -2], 0.5) → [12, 9]'\nassert _np.allclose(boost_step([1, 2, 3], [1, 1, 1], 0.1), [1.1, 2.1, 3.1]), 'lr=0.1: кішкентай қадам'\nassert _np.allclose(boost_step([5], [3], 1.0), [8]), 'lr=1.0: толық қадам'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Boosting регрессиясы",
   "prompt": "<p><code>HistGradientBoostingRegressor(max_iter=100, random_state=0)</code>-ды <code>hgb</code> атымен пәтерлердің сандық белгілерінде (<code>fnum</code>) train-де үйретіп, test R²-ын <code>hgb_r2</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nX = flats.drop(columns=['flat_id', 'price_mln'])\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)\nfrom sklearn.ensemble import HistGradientBoostingRegressor\nfnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nX = flats.drop(columns=['flat_id', 'price_mln'])\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)\nfrom sklearn.ensemble import HistGradientBoostingRegressor\nfnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\nhgb = HistGradientBoostingRegressor(max_iter=100, random_state=0).fit(X_train[fnum], y_train)\nhgb_r2 = hgb.score(X_test[fnum], y_test)\nprint(round(hgb_r2, 3))",
   "hints": [
    "Классификатордағыдай API: <code>fit</code>, <code>score</code>."
   ],
   "check": {
    "tests": "from sklearn.ensemble import HistGradientBoostingRegressor as _H\nassert isinstance(hgb, _H) and hgb.n_features_in_ == 5, 'hgb — fnum (5 белгі) бойынша үйретілген HistGradientBoostingRegressor'\nassert abs(hgb_r2 - hgb.score(X_test[fnum], y_test)) < 1e-9, 'hgb_r2 = hgb.score(X_test[fnum], y_test)'\n_h = _H(max_iter=100, random_state=0).fit(X_train[fnum], y_train).score(X_test[fnum], y_test)\nassert abs(hgb_r2 - _h) < 1e-6, f'hgb_r2 ≈ {_h:.3f} болуы керек: max_iter=100, random_state=0'",
    "mustInclude": [
     "HistGradientBoostingRegressor("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Екі boosting қадамы",
   "prompt": "<p>Екі қадамды қолмен жасаңыз (<code>lr = 0.5</code>, ағаштар <code>DecisionTreeRegressor(max_depth=2, random_state=0)</code>). <code>pred0</code> — y-тің орташасы; 1-қадам: ағашты <code>y − pred0</code>-ге үйретіп, <code>pred1</code>; 2-қадам: жаңа ағашты <code>y − pred1</code>-ге үйретіп, <code>pred2</code>. MSE-лерді <code>mses = [mse0, mse1, mse2]</code> тізіміне жазыңыз.</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nimport numpy as np\nfrom sklearn.tree import DecisionTreeRegressor\nx = flats[['area_m2', 'year_built']]\ny = flats['price_mln'].values\nmses = []\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nimport numpy as np\nfrom sklearn.tree import DecisionTreeRegressor\nx = flats[['area_m2', 'year_built']]\ny = flats['price_mln'].values\nmses = []\npred0 = np.full(len(y), y.mean())\nt1 = DecisionTreeRegressor(max_depth=2, random_state=0).fit(x, y - pred0)\npred1 = pred0 + 0.5 * t1.predict(x)\nt2 = DecisionTreeRegressor(max_depth=2, random_state=0).fit(x, y - pred1)\npred2 = pred1 + 0.5 * t2.predict(x)\nmses = [((y - p) ** 2).mean() for p in [pred0, pred1, pred2]]\nprint([round(m, 1) for m in mses])",
   "hints": [
    "Екінші ағаштың нысанасы — жаңа қалдық: <code>y - pred1</code>.",
    "<code>((y - p) ** 2).mean()</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nfrom sklearn.tree import DecisionTreeRegressor as _DR\n_p0 = _np.full(len(y), y.mean())\n_p1 = _p0 + 0.5 * _DR(max_depth=2, random_state=0).fit(x, y - _p0).predict(x)\n_p2 = _p1 + 0.5 * _DR(max_depth=2, random_state=0).fit(x, y - _p1).predict(x)\n_m = [((y - _p) ** 2).mean() for _p in [_p0, _p1, _p2]]\nassert len(mses) == 3, 'mses-те үш мән: mse0, mse1, mse2'\nassert _np.allclose(mses, _m), f'MSE мәндері ≈ {[round(_v, 1) for _v in _m]} болуы керек. Екінші ағаш y − pred1-ге үйретілді ме?'\nassert mses[0] > mses[1] > mses[2], 'Әр қадамда MSE кемуі керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Итерациялар саны",
   "prompt": "<p><code>HistGradientBoostingClassifier(learning_rate=0.1, random_state=0)</code> үшін <code>max_iter</code> ∈ [10, 50, 200] бойынша <code>X_num</code>, <code>y</code>-дегі 3-fold ROC AUC орташасын <code>auc_by_iter</code>-ге жазыңыз. Ең жақсысын <code>best_iter</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nfrom sklearn.ensemble import HistGradientBoostingClassifier\nfrom sklearn.model_selection import cross_val_score\nX_num = df[['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']]\ny = df['churned']\nauc_by_iter = {}\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nfrom sklearn.ensemble import HistGradientBoostingClassifier\nfrom sklearn.model_selection import cross_val_score\nX_num = df[['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']]\ny = df['churned']\nauc_by_iter = {}\nfor n in [10, 50, 200]:\n    m = HistGradientBoostingClassifier(learning_rate=0.1, max_iter=n, random_state=0)\n    auc_by_iter[n] = cross_val_score(m, X_num, y, cv=3, scoring='roc_auc').mean()\nbest_iter = max(auc_by_iter, key=auc_by_iter.get)\nprint(auc_by_iter, best_iter)",
   "hints": [
    "<code>HistGradientBoostingClassifier(learning_rate=0.1, max_iter=n, random_state=0)</code>"
   ],
   "check": {
    "tests": "from sklearn.ensemble import HistGradientBoostingClassifier as _H\nfrom sklearn.model_selection import cross_val_score as _cvs\nassert sorted(auc_by_iter) == [10, 50, 200], 'Кілттер: 10, 50, 200'\n_r = _cvs(_H(learning_rate=0.1, max_iter=10, random_state=0), X_num, y, cv=3, scoring='roc_auc').mean()\nassert abs(auc_by_iter[10] - _r) < 1e-6, f\"max_iter=10 үшін AUC ≈ {_r:.4f}: cv=3, scoring='roc_auc'\"\nassert best_iter == max(auc_by_iter, key=auc_by_iter.get), 'best_iter — AUC ең жоғары max_iter'\nassert auc_by_iter[200] < auc_by_iter[best_iter] or best_iter == 200, 'best_iter дұрыс таңдалмады'",
    "mustInclude": [
     "cross_val_score("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "NaN-мен boosting",
   "prompt": "<p>HGB бос мәндермен өзі жұмыс істейді. <code>X_num</code> бөлуі дайын. <code>HistGradientBoostingClassifier(max_iter=100, learning_rate=0.05, random_state=0)</code>-ды imputer-сіз үйретіп, test AUC → <code>hgb_auc</code>. Салыстыру үшін <code>make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))</code> → <code>lr_auc</code>.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nfrom sklearn.ensemble import HistGradientBoostingClassifier\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import roc_auc_score\nX_num = df[['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X_num, y, test_size=0.25, random_state=0, stratify=y)\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nfrom sklearn.ensemble import HistGradientBoostingClassifier\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import roc_auc_score\nX_num = df[['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X_num, y, test_size=0.25, random_state=0, stratify=y)\nhgb = HistGradientBoostingClassifier(max_iter=100, learning_rate=0.05, random_state=0).fit(X_train, y_train)\nhgb_auc = roc_auc_score(y_test, hgb.predict_proba(X_test)[:, 1])\nlr = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000)).fit(X_train, y_train)\nlr_auc = roc_auc_score(y_test, lr.predict_proba(X_test)[:, 1])\nprint(round(hgb_auc, 3), round(lr_auc, 3))",
   "hints": [
    "HGB: <code>fit(X_train, y_train)</code> тікелей, NaN-мен.",
    "<code>roc_auc_score(y_test, model.predict_proba(X_test)[:, 1])</code>"
   ],
   "check": {
    "tests": "from sklearn.ensemble import HistGradientBoostingClassifier as _H\nfrom sklearn.metrics import roc_auc_score as _ra\nassert X_train.isna().any().any(), 'X_train-де NaN қалуы керек: HGB-ге imputer керек емес'\n_h = _ra(y_test, _H(max_iter=100, learning_rate=0.05, random_state=0).fit(X_train, y_train).predict_proba(X_test)[:, 1])\nassert abs(hgb_auc - _h) < 1e-6, f'hgb_auc ≈ {_h:.3f} болуы керек'\nassert 0.75 < lr_auc < 0.9, f'lr_auc ≈ 0.8 болуы керек, сізде {lr_auc:.3f}'",
    "mustInclude": [
     "HistGradientBoostingClassifier("
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Boosting циклі",
   "prompt": "<p>Gradient boosting-ті цикл ретінде жазыңыз: <code>pred</code> = y-тің орташасынан бастап, 20 қадам бойы әр қадамда <code>DecisionTreeRegressor(max_depth=2, random_state=0)</code>-ды қалдыққа үйретіп, <code>pred += 0.3 * tree.predict(x)</code>. Әр қадамнан <b>кейінгі</b> MSE-ді <code>mses</code> тізіміне жазыңыз (20 мән).</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nimport numpy as np\nfrom sklearn.tree import DecisionTreeRegressor\nx = flats[['area_m2', 'year_built']]\ny = flats['price_mln'].values\nmses = []\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nimport numpy as np\nfrom sklearn.tree import DecisionTreeRegressor\nx = flats[['area_m2', 'year_built']]\ny = flats['price_mln'].values\nmses = []\npred = np.full(len(y), y.mean())\nfor step in range(20):\n    tree = DecisionTreeRegressor(max_depth=2, random_state=0).fit(x, y - pred)\n    pred = pred + 0.3 * tree.predict(x)\n    mses.append(((y - pred) ** 2).mean())\nprint(round(mses[0], 1), round(mses[-1], 1))",
   "hints": [
    "Цикл ішінде: ағашты <code>y - pred</code>-ке fit, сосын <code>pred</code>-ті жаңарту.",
    "MSE-ді жаңартудан кейін есептеңіз."
   ],
   "check": {
    "tests": "import numpy as _np\nfrom sklearn.tree import DecisionTreeRegressor as _DR\n_p = _np.full(len(y), y.mean())\n_m = []\nfor _i in range(20):\n    _p = _p + 0.3 * _DR(max_depth=2, random_state=0).fit(x, y - _p).predict(x)\n    _m.append(((y - _p) ** 2).mean())\nassert len(mses) == 20, 'mses-те 20 мән болуы керек'\nassert _np.allclose(mses, _m), 'MSE мәндері дұрыс емес: әр ағаш y − pred-ке үйретіліп, pred += 0.3 * tree.predict(x)'\nassert all(mses[_i] >= mses[_i + 1] for _i in range(19)), 'MSE әр қадамда кемуі керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Жылдамдық пен қадам торы",
   "prompt": "<p><code>GridSearchCV</code> арқылы <code>HistGradientBoostingClassifier(random_state=0)</code> үшін <code>learning_rate</code> ∈ [0.05, 0.2] және <code>max_iter</code> ∈ [30, 100] торын тексеріңіз (<code>cv=3</code>, <code>scoring='roc_auc'</code>). <code>grid</code>-ты <code>X_num</code>, <code>y</code>-де үйретіп, <code>best_params</code>-қа жазыңыз.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nfrom sklearn.ensemble import HistGradientBoostingClassifier\nfrom sklearn.model_selection import GridSearchCV\nX_num = df[['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']]\ny = df['churned']\ngrid = None\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nfrom sklearn.ensemble import HistGradientBoostingClassifier\nfrom sklearn.model_selection import GridSearchCV\nX_num = df[['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']]\ny = df['churned']\nparams = {'learning_rate': [0.05, 0.2], 'max_iter': [30, 100]}\ngrid = GridSearchCV(HistGradientBoostingClassifier(random_state=0), params, cv=3, scoring='roc_auc').fit(X_num, y)\nbest_params = grid.best_params_\nprint(best_params, round(grid.best_score_, 3))",
   "hints": [
    "Тор: <code>{'learning_rate': [0.05, 0.2], 'max_iter': [30, 100]}</code>"
   ],
   "check": {
    "tests": "from sklearn.model_selection import GridSearchCV as _G\nimport numpy as _np\nassert isinstance(grid, _G) and hasattr(grid, 'best_params_'), 'grid — үйретілген GridSearchCV'\nassert len(grid.cv_results_['params']) == 4 and grid.scoring == 'roc_auc', \"Тор 2 × 2 = 4, scoring='roc_auc'\"\nassert sorted(set(_p['max_iter'] for _p in grid.cv_results_['params'])) == [30, 100], 'max_iter мәндері: 30, 100'\nassert best_params == grid.best_params_, 'best_params = grid.best_params_'\nassert 0.7 < grid.best_score_ < 0.9, 'Ең жақсы CV AUC ≈ 0.8'",
    "mustInclude": [
     "GridSearchCV("
    ]
   }
  }
 ],
 "mp-7": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Кластар арақатынасы",
   "prompt": "<p>Churn деректерінде кеткендер (<code>churned == 1</code>) санын <code>n_pos</code>-қа, қалғандар санын <code>n_neg</code>-ке жазыңыз. Бір кетушіге неше қалушы келетінін <code>ratio = n_neg / n_pos</code> есептеңіз.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nn_pos = int((df['churned'] == 1).sum())\nn_neg = int((df['churned'] == 0).sum())\nratio = n_neg / n_pos\nprint(n_pos, n_neg, round(ratio, 2))",
   "hints": [
    "<code>(df['churned'] == 1).sum()</code>"
   ],
   "check": {
    "tests": "assert (n_pos, n_neg) == (155, 445), 'n_pos = 155, n_neg = 445 болуы керек'\nassert abs(ratio - 445 / 155) < 1e-9, 'ratio = n_neg / n_pos ≈ 2.87'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Теңгерімді салмақтар",
   "prompt": "<p><code>class_weight='balanced'</code> әр класқа <code>n / (k · n_c)</code> салмақ береді (<code>n</code> — барлығы, <code>k</code> — кластар саны, <code>n_c</code> — класс өлшемі). <code>balanced_weights(y)</code> функциясы <code>{класс: салмақ}</code> сөздігін қайтарсын.</p><p>Мысалы, <code>balanced_weights([0, 0, 0, 1])</code> → <code>{0: 0.667, 1: 2.0}</code> (шамамен).</p>",
   "starter": "def balanced_weights(y):\n    pass\n",
   "solution": "def balanced_weights(y):\n    y = list(y)\n    classes = sorted(set(y))\n    return {c: len(y) / (len(classes) * y.count(c)) for c in classes}\n\nprint(balanced_weights([0, 0, 0, 1]))",
   "hints": [
    "<code>classes = sorted(set(y))</code>",
    "<code>len(y) / (len(classes) * y.count(c))</code>"
   ],
   "check": {
    "tests": "_w = balanced_weights([0, 0, 0, 1])\nassert isinstance(_w, dict) and set(_w) == {0, 1}, 'Сөздік қайтарыңыз: кілттер — кластар'\nassert abs(_w[0] - 4 / 6) < 1e-9 and abs(_w[1] - 2) < 1e-9, 'balanced_weights([0, 0, 0, 1]) → {0: 0.667, 1: 2.0}'\n_v = balanced_weights([1, 0, 1, 0])\nassert abs(_v[0] - 1) < 1e-9 and abs(_v[1] - 1) < 1e-9, 'Теңгерімді деректе салмақтар 1'\n_u = balanced_weights(['a', 'b', 'b', 'c', 'c', 'c'])\nassert abs(_u['a'] - 2) < 1e-9 and abs(_u['c'] - 2 / 3) < 1e-9, 'Үш класпен де жұмыс істеуі керек'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қателер құны",
   "prompt": "<p><code>cost(y_true, y_pred, c_fp, c_fn)</code> функциясы жалпы құнды қайтарсын: <code>FP × c_fp + FN × c_fn</code>.</p><p>Мысалы, <code>cost([1, 0, 1, 0], [0, 1, 1, 0], 5000, 20000)</code> → <code>25000</code>.</p>",
   "starter": "def cost(y_true, y_pred, c_fp, c_fn):\n    pass\n",
   "solution": "def cost(y_true, y_pred, c_fp, c_fn):\n    fp = sum(1 for t, p in zip(y_true, y_pred) if t == 0 and p == 1)\n    fn = sum(1 for t, p in zip(y_true, y_pred) if t == 1 and p == 0)\n    return fp * c_fp + fn * c_fn\n\nprint(cost([1, 0, 1, 0], [0, 1, 1, 0], 5000, 20000))",
   "hints": [
    "FP: шын 0, болжам 1. FN: шын 1, болжам 0."
   ],
   "check": {
    "tests": "assert cost([1, 0, 1, 0], [0, 1, 1, 0], 5000, 20000) == 25000, 'cost([1, 0, 1, 0], [0, 1, 1, 0], 5000, 20000) 25000 қайтаруы керек'\nassert cost([1, 1], [1, 1], 5000, 20000) == 0, 'Қатесіз: 0'\nassert cost([0, 0, 0], [1, 1, 1], 3000, 15000) == 9000, '3 FP × 3000 = 9000'\nassert cost([1, 1, 0], [0, 0, 0], 3000, 15000) == 30000, '2 FN × 15000 = 30000'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Шек және recall",
   "prompt": "<p><code>proba</code> дайын. Шек <code>t</code> ∈ [0.2, 0.3, 0.4, 0.5] үшін test recall-ын <code>recalls</code> сөздігіне жазыңыз. Ескертілетін абоненттер санын да <code>flagged</code> сөздігіне жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nproba = model.predict_proba(X_test)[:, 1]\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\nrecalls = {}\nflagged = {}\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nproba = model.predict_proba(X_test)[:, 1]\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\nrecalls = {}\nflagged = {}\nfor t in [0.2, 0.3, 0.4, 0.5]:\n    pred = (proba >= t).astype(int)\n    recalls[t] = recall_score(y_test, pred)\n    flagged[t] = int(pred.sum())\nprint(recalls, flagged)",
   "hints": [
    "Цикл: <code>for t in [0.2, 0.3, 0.4, 0.5]:</code>",
    "<code>pred.sum()</code> — ескертулер саны."
   ],
   "check": {
    "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import OneHotEncoder as _OH, StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre():\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), cat)])\n_m = _Pl([('pre', _pre()), ('model', _LR(max_iter=1000))]).fit(X_train, y_train)\n_p = _m.predict_proba(X_test)[:, 1]\nfrom sklearn.metrics import recall_score as _rs\nassert sorted(recalls) == [0.2, 0.3, 0.4, 0.5] and sorted(flagged) == [0.2, 0.3, 0.4, 0.5], 'Кілттер: 0.2, 0.3, 0.4, 0.5'\nassert all(abs(recalls[_t] - _rs(y_test, (_p >= _t).astype(int))) < 1e-9 for _t in recalls), 'recall дұрыс емес: (proba >= t)'\nassert all(int(flagged[_t]) == int((_p >= _t).sum()) for _t in flagged), 'flagged — proba >= t абоненттер саны'\nassert recalls[0.2] > recalls[0.5] and flagged[0.2] > flagged[0.5], 'Шек төмендесе, recall да, ескертулер де көбейеді'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Precision талабы",
   "prompt": "<p>Ескертулердің кемінде жартысы дұрыс болсын (precision ≥ 0.5). <code>np.arange(0.1, 0.91, 0.05)</code> шектерінің (<code>round(t, 2)</code>) ішінен test-те осы шартты орындайтын <b>ең кіші</b> шекті <code>t_p50</code>-ге, сол шектегі recall-ды <code>rec_p50</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nproba = model.predict_proba(X_test)[:, 1]\nimport numpy as np\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nproba = model.predict_proba(X_test)[:, 1]\nimport numpy as np\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\nt_p50 = None\nfor t in np.arange(0.1, 0.91, 0.05):\n    t = round(t, 2)\n    pred = (proba >= t).astype(int)\n    if pred.sum() > 0 and precision_score(y_test, pred) >= 0.5:\n        t_p50 = t\n        break\nrec_p50 = recall_score(y_test, (proba >= t_p50).astype(int))\nprint(t_p50, round(rec_p50, 3))",
   "hints": [
    "Шектерді өсу ретімен тексеріп, бірінші сәйкесінде <code>break</code>.",
    "Ескерту жоқ болса precision анықталмайды: <code>pred.sum() &gt; 0</code> шартын қосыңыз."
   ],
   "check": {
    "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import OneHotEncoder as _OH, StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre():\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), cat)])\n_m = _Pl([('pre', _pre()), ('model', _LR(max_iter=1000))]).fit(X_train, y_train)\n_p = _m.predict_proba(X_test)[:, 1]\nimport numpy as _np\nfrom sklearn.metrics import precision_score as _ps, recall_score as _rs\n_ok = [round(_t, 2) for _t in _np.arange(0.1, 0.91, 0.05) if (_p >= round(_t, 2)).sum() > 0 and _ps(y_test, (_p >= round(_t, 2)).astype(int)) >= 0.5]\nassert t_p50 is not None and abs(t_p50 - _ok[0]) < 1e-9, f't_p50 = {_ok[0]} болуы керек: precision ≥ 0.5 болатын ең кіші шек'\nassert abs(rec_p50 - _rs(y_test, (_p >= _ok[0]).astype(int))) < 1e-9, 'rec_p50 — сол шектегі recall'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Stratify-сыз бөлу",
   "prompt": "<p>Кішкентай деректе <code>stratify</code>-сыз бөлу класс үлесін бұзуы мүмкін. <code>random_state=5</code>, <code>test_size=0.25</code> арқылы екі рет бөліңіз: stratify-сыз → test churn үлесі <code>rate_plain</code>, <code>stratify=y</code>-пен → <code>rate_strat</code>. Бүкіл деректегі үлес — <code>rate_all</code>.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nfrom sklearn.model_selection import train_test_split\nX = df.drop(columns=['churned'])\ny = df['churned']\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nfrom sklearn.model_selection import train_test_split\nX = df.drop(columns=['churned'])\ny = df['churned']\n_, _, _, y_te1 = train_test_split(X, y, test_size=0.25, random_state=5)\n_, _, _, y_te2 = train_test_split(X, y, test_size=0.25, random_state=5, stratify=y)\nrate_plain = y_te1.mean()\nrate_strat = y_te2.mean()\nrate_all = y.mean()\nprint(round(rate_plain, 3), round(rate_strat, 3), round(rate_all, 3))",
   "hints": [
    "<code>train_test_split</code> төрт мән қайтарады: y_test — төртіншісі."
   ],
   "check": {
    "tests": "from sklearn.model_selection import train_test_split as _tts\nassert abs(rate_plain - _tts(X, y, test_size=0.25, random_state=5)[3].mean()) < 1e-9, 'rate_plain: stratify-сыз, random_state=5'\nassert abs(rate_strat - _tts(X, y, test_size=0.25, random_state=5, stratify=y)[3].mean()) < 1e-9, 'rate_strat: stratify=y, random_state=5'\nassert abs(rate_all - y.mean()) < 1e-9, 'rate_all = y.mean()'\nassert abs(rate_strat - rate_all) < abs(rate_plain - rate_all), 'stratify үлесті сақтайды'",
    "mustInclude": [
     "stratify"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Шекті train-де таңдау",
   "prompt": "<p>Шекті test-ке қарап таңдамаңыз. <code>p_tr</code> — train-дегі CV ықтималдықтары (дайын). FP = 3000 ₸, FN = 15 000 ₸. <code>np.arange(0.1, 0.91, 0.05)</code> (<code>round(t, 2)</code>) ішінен train құны ең аз шекті <code>best_t</code>-ға жазыңыз. Сосын <code>model</code>-ді train-де үйретіп, test-те <code>best_t</code> бойынша құнды <code>test_cost</code>-қа, 0.5 бойынша <code>cost_05</code>-ке жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nimport numpy as np\nfrom sklearn.model_selection import cross_val_predict\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\np_tr = cross_val_predict(model, X_train, y_train, cv=5, method='predict_proba')[:, 1]\n\ndef cost(y_true, pred):\n    y_true = np.asarray(y_true)\n    return int(((pred == 1) & (y_true == 0)).sum() * 3000 + ((pred == 0) & (y_true == 1)).sum() * 15000)\n\nbest_t = None\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nimport numpy as np\nfrom sklearn.model_selection import cross_val_predict\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\np_tr = cross_val_predict(model, X_train, y_train, cv=5, method='predict_proba')[:, 1]\n\ndef cost(y_true, pred):\n    y_true = np.asarray(y_true)\n    return int(((pred == 1) & (y_true == 0)).sum() * 3000 + ((pred == 0) & (y_true == 1)).sum() * 15000)\n\ncosts = {round(t, 2): cost(y_train, (p_tr >= round(t, 2)).astype(int)) for t in np.arange(0.1, 0.91, 0.05)}\nbest_t = min(costs, key=costs.get)\nmodel.fit(X_train, y_train)\np_te = model.predict_proba(X_test)[:, 1]\ntest_cost = cost(y_test, (p_te >= best_t).astype(int))\ncost_05 = cost(y_test, (p_te >= 0.5).astype(int))\nprint(best_t, test_cost, cost_05)",
   "hints": [
    "Құндар сөздігі: <code>{round(t, 2): cost(y_train, (p_tr &gt;= round(t, 2)).astype(int)) for t in ...}</code>",
    "Сосын <code>model.fit(X_train, y_train)</code> және test ықтималдықтары."
   ],
   "check": {
    "tests": "import numpy as _np\n_c = {round(_t, 2): cost(y_train, (p_tr >= round(_t, 2)).astype(int)) for _t in _np.arange(0.1, 0.91, 0.05)}\n_bt = min(_c, key=_c.get)\nfrom sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import OneHotEncoder as _OH, StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre():\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), cat)])\n_m = _Pl([('pre', _pre()), ('model', _LR(max_iter=1000))]).fit(X_train, y_train)\n_p = _m.predict_proba(X_test)[:, 1]\nassert best_t is not None and abs(best_t - _bt) < 1e-9, f'best_t = {_bt} болуы керек: train-дегі (p_tr) құн ең аз шек'\nassert test_cost == cost(y_test, (_p >= _bt).astype(int)), 'test_cost: train-де үйретілген модель, test-те best_t шегі'\nassert cost_05 == cost(y_test, (_p >= 0.5).astype(int)), 'cost_05: test-те 0.5 шегі'\nassert test_cost < cost_05, 'Train-де таңдалған шек test-те де 0.5-тен арзан болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Бюджет: 30 қоңырау",
   "prompt": "<p>Ретеншн бөлімі аптасына тек 30 абонентке қоңырау шала алады. <code>class_weight='balanced'</code> логистикалық Pipeline-ды train-де үйретіп, test-те ықтималдығы ең жоғары 30 абонентті таңдаңыз. Олардың ішіндегі кетушілер үлесін <code>prec_at_30</code>-ға, барлық test кетушілерінің қаншасы қамтылғанын <code>rec_at_30</code>-ға жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nimport numpy as np\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nimport numpy as np\nbal = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000, class_weight='balanced'))]).fit(X_train, y_train)\np = bal.predict_proba(X_test)[:, 1]\ntop = np.argsort(-p)[:30]\nhits = int(y_test.values[top].sum())\nprec_at_30 = hits / 30\nrec_at_30 = hits / int(y_test.sum())\nprint(hits, round(prec_at_30, 3), round(rec_at_30, 3))",
   "hints": [
    "Кему ретімен индекстер: <code>np.argsort(-p)[:30]</code>",
    "<code>y_test.values[top].sum()</code> — ұсталған кетушілер."
   ],
   "check": {
    "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import OneHotEncoder as _OH, StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre():\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), cat)])\nimport numpy as _np\n_b = _Pl([('pre', _pre()), ('model', _LR(max_iter=1000, class_weight='balanced'))]).fit(X_train, y_train)\n_q = _b.predict_proba(X_test)[:, 1]\n_h = int(y_test.values[_np.argsort(-_q)[:30]].sum())\nassert abs(prec_at_30 - _h / 30) < 1e-9, f'prec_at_30 = {_h}/30 болуы керек: proba бойынша ең жоғары 30 абонент'\nassert abs(rec_at_30 - _h / int(y_test.sum())) < 1e-9, f'rec_at_30 = {_h}/{int(y_test.sum())}: қамтылған кетушілер / барлық кетушілер'\nassert prec_at_30 > y_test.mean(), 'Таңдалған 30 абоненттегі үлес орташадан жоғары болуы керек'",
    "mustInclude": [
     "class_weight='balanced'"
    ]
   }
  }
 ],
 "mp-8": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Центроид",
   "prompt": "<p><code>centroid(points)</code> функциясы нүктелердің центрін (әр координатаның орташасын) тізім ретінде қайтарсын.</p><p>Мысалы, <code>centroid([[0, 0], [2, 4]])</code> → <code>[1.0, 2.0]</code>.</p>",
   "starter": "import numpy as np\n\ndef centroid(points):\n    pass\n",
   "solution": "import numpy as np\n\ndef centroid(points):\n    return np.asarray(points, dtype=float).mean(axis=0).tolist()\n\nprint(centroid([[0, 0], [2, 4]]))",
   "hints": [
    "<code>np.asarray(points).mean(axis=0)</code> — баған бойынша орташа."
   ],
   "check": {
    "tests": "import numpy as _np\nassert centroid([[0, 0], [2, 4]]) is not None and _np.allclose(centroid([[0, 0], [2, 4]]), [1, 2]), 'centroid([[0, 0], [2, 4]]) → [1.0, 2.0]'\nassert _np.allclose(centroid([[1, 2, 3]]), [1, 2, 3]), 'Бір нүкте: оның өзі'\nassert _np.allclose(centroid([[0, 0], [3, 0], [0, 3], [3, 3]]), [1.5, 1.5]), 'Шаршының центрі [1.5, 1.5]'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ең жақын центр",
   "prompt": "<p><code>assign(points, centers)</code> функциясы әр нүкте үшін ең жақын центрдің индексін тізім ретінде қайтарсын (евклидтік қашықтық).</p><p>Мысалы, <code>assign([[0, 1], [9, 9]], [[0, 0], [10, 10]])</code> → <code>[0, 1]</code>.</p>",
   "starter": "import numpy as np\n\ndef assign(points, centers):\n    pass\n",
   "solution": "import numpy as np\n\ndef assign(points, centers):\n    P = np.asarray(points, dtype=float)\n    C = np.asarray(centers, dtype=float)\n    labels = []\n    for p in P:\n        d = ((C - p) ** 2).sum(axis=1)\n        labels.append(int(np.argmin(d)))\n    return labels\n\nprint(assign([[0, 1], [9, 9]], [[0, 0], [10, 10]]))",
   "hints": [
    "Әр нүкте үшін: <code>((C - p) ** 2).sum(axis=1)</code>, сосын <code>np.argmin</code>."
   ],
   "check": {
    "tests": "assert list(assign([[0, 1], [9, 9]], [[0, 0], [10, 10]])) == [0, 1], 'assign([[0, 1], [9, 9]], [[0, 0], [10, 10]]) → [0, 1]'\nassert list(assign([[5, 5], [1, 0], [6, 7]], [[0, 0], [5, 5], [10, 10]])) == [1, 0, 1], 'Үш центрмен: [1, 0, 1]'\nassert list(assign([[2], [8]], [[0], [5], [9]])) == [0, 2], 'Бір өлшемді нүктелер: [0, 2]'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Кластер өлшемдері",
   "prompt": "<p>Пәтерлерді аудан мен баға бойынша топтаңыз. <code>Z</code> дайын (масштабталған). <code>KMeans(n_clusters=3, n_init=10, random_state=0)</code>-ды <code>km</code> атымен үйретіп, әр кластердегі пәтерлер санын <code>sizes</code> Series-ке жазыңыз (индекс бойынша сұрыпталған).</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.cluster import KMeans\nZ = StandardScaler().fit_transform(flats[['area_m2', 'price_mln']])\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.cluster import KMeans\nZ = StandardScaler().fit_transform(flats[['area_m2', 'price_mln']])\nkm = KMeans(n_clusters=3, n_init=10, random_state=0).fit(Z)\nsizes = pd.Series(km.labels_).value_counts().sort_index()\nprint(sizes)",
   "hints": [
    "<code>pd.Series(km.labels_).value_counts().sort_index()</code>"
   ],
   "check": {
    "tests": "from sklearn.cluster import KMeans as _KM\n_l = _KM(n_clusters=3, n_init=10, random_state=0).fit(Z).labels_\nassert isinstance(km, _KM) and km.n_clusters == 3, 'km — 3 кластерлі KMeans'\nassert list(sizes.index) == [0, 1, 2], 'sizes индексі: 0, 1, 2 (sort_index)'\nassert int(sizes.sum()) == 400 and [int(_v) for _v in sizes.values] == [int((_l == _k).sum()) for _k in range(3)], 'sizes — әр кластердегі пәтерлер саны'",
    "mustInclude": [
     "KMeans("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Inertia қолмен",
   "prompt": "<p><code>km</code> үйретілген. Inertia — әр нүктеден өз центріне дейінгі квадрат қашықтықтардың қосындысы. Оны <code>km.cluster_centers_</code> мен <code>km.labels_</code> арқылы қолмен есептеп, <code>inertia_manual</code>-ға жазыңыз.</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.cluster import KMeans\nZ = StandardScaler().fit_transform(flats[['area_m2', 'price_mln']])\nkm = KMeans(n_clusters=3, n_init=10, random_state=0).fit(Z)\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.cluster import KMeans\nZ = StandardScaler().fit_transform(flats[['area_m2', 'price_mln']])\nkm = KMeans(n_clusters=3, n_init=10, random_state=0).fit(Z)\nassigned = km.cluster_centers_[km.labels_]\ninertia_manual = ((Z - assigned) ** 2).sum()\nprint(inertia_manual, km.inertia_)",
   "hints": [
    "<code>km.cluster_centers_[km.labels_]</code> — әр нүктенің өз центрі.",
    "<code>((Z - assigned) ** 2).sum()</code>"
   ],
   "check": {
    "tests": "assert abs(inertia_manual - km.inertia_) < 1e-6, f'inertia_manual ≈ {km.inertia_:.2f} болуы керек: Σ ||z − центр||²'",
    "mustInclude": [
     "cluster_centers_"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Сегменттердің churn-ы",
   "prompt": "<p><code>km</code> абоненттерді 3 сегментке бөлді. <code>seg['segment']</code> бағанына белгілерді жазып, әр сегменттің churn үлесін <code>rate_by_seg</code>-ке, ең қауіпті сегментті <code>riskiest</code>-ке жазыңыз. Әр сегменттің орташа <code>tenure_months</code>-ын <code>tenure_by_seg</code>-ке жазыңыз.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.cluster import KMeans\ncols = ['tenure_months', 'monthly_fee', 'data_gb', 'support_calls']\nseg = df[cols + ['churned']].dropna().copy()\nsc = StandardScaler().fit(seg[cols])\nkm = KMeans(n_clusters=3, n_init=10, random_state=0).fit(sc.transform(seg[cols]))\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.cluster import KMeans\ncols = ['tenure_months', 'monthly_fee', 'data_gb', 'support_calls']\nseg = df[cols + ['churned']].dropna().copy()\nsc = StandardScaler().fit(seg[cols])\nkm = KMeans(n_clusters=3, n_init=10, random_state=0).fit(sc.transform(seg[cols]))\nseg['segment'] = km.labels_\nrate_by_seg = seg.groupby('segment')['churned'].mean()\nriskiest = rate_by_seg.idxmax()\ntenure_by_seg = seg.groupby('segment')['tenure_months'].mean()\nprint(rate_by_seg.round(3), riskiest)\nprint(tenure_by_seg.round(1))",
   "hints": [
    "<code>seg.groupby('segment')['churned'].mean()</code>"
   ],
   "check": {
    "tests": "_r = seg['churned'].groupby(km.labels_).mean()\nassert 'segment' in seg.columns and (seg['segment'].values == km.labels_).all(), \"seg['segment'] = km.labels_\"\nassert len(rate_by_seg) == 3 and all(abs(rate_by_seg[_k] - _r[_k]) < 1e-9 for _k in _r.index), 'rate_by_seg — сегмент бойынша churned орташасы'\nassert riskiest == _r.idxmax(), f'riskiest = {_r.idxmax()} болуы керек'\nassert tenure_by_seg[riskiest] < seg['tenure_months'].mean(), 'Ең қауіпті сегмент — жаңа абоненттер (tenure орташадан төмен)'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жаңа клиент сегменті",
   "prompt": "<p>Жаңа абонент: 4 ай, 11 500 ₸, 32 ГБ, 2 қоңырау. Оны <b>сол</b> <code>sc</code>-пен масштабтап, <code>km.predict</code> арқылы сегментін <code>new_seg</code>-ке (int) жазыңыз. Масштабталған нүктесін <code>z_new</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.cluster import KMeans\ncols = ['tenure_months', 'monthly_fee', 'data_gb', 'support_calls']\nseg = df[cols + ['churned']].dropna().copy()\nsc = StandardScaler().fit(seg[cols])\nkm = KMeans(n_clusters=3, n_init=10, random_state=0).fit(sc.transform(seg[cols]))\nnew = pd.DataFrame({'tenure_months': [4], 'monthly_fee': [11500], 'data_gb': [32.0], 'support_calls': [2]})\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.cluster import KMeans\ncols = ['tenure_months', 'monthly_fee', 'data_gb', 'support_calls']\nseg = df[cols + ['churned']].dropna().copy()\nsc = StandardScaler().fit(seg[cols])\nkm = KMeans(n_clusters=3, n_init=10, random_state=0).fit(sc.transform(seg[cols]))\nnew = pd.DataFrame({'tenure_months': [4], 'monthly_fee': [11500], 'data_gb': [32.0], 'support_calls': [2]})\nz_new = sc.transform(new)\nnew_seg = int(km.predict(z_new)[0])\nprint(z_new.round(2), new_seg)",
   "hints": [
    "Тек <code>transform</code>: <code>sc.transform(new)</code>",
    "<code>int(km.predict(z_new)[0])</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_z = sc.transform(new)\n_k = int(_np.argmin(((km.cluster_centers_ - _z[0]) ** 2).sum(axis=1)))\nassert _np.allclose(_np.asarray(z_new).reshape(1, -1), _z), 'z_new = sc.transform(new): жаңа scaler fit етпеңіз'\nassert new_seg == _k, f'new_seg = {_k} болуы керек: km.predict(z_new)[0]'",
    "mustInclude": [
     "predict("
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "KMeans бір қадамы",
   "prompt": "<p>KMeans-тің бір итерациясын жазыңыз. <code>kmeans_step(points, centers)</code>: (1) әр нүктені ең жақын центрге тағайындаңыз; (2) әр центрді өз нүктелерінің орташасына жылжытыңыз (нүктесі жоқ центр орнында қалсын). Жаңа центрлерді NumPy массиві ретінде қайтарыңыз.</p><p>Мысалы, <code>kmeans_step([[0, 0], [0, 2], [10, 10]], [[1, 1], [9, 9]])</code> → <code>[[0, 1], [10, 10]]</code>.</p>",
   "starter": "import numpy as np\n\ndef kmeans_step(points, centers):\n    pass\n",
   "solution": "import numpy as np\n\ndef kmeans_step(points, centers):\n    P = np.asarray(points, dtype=float)\n    C = np.asarray(centers, dtype=float)\n    labels = np.array([np.argmin(((C - p) ** 2).sum(axis=1)) for p in P])\n    new = C.copy()\n    for k in range(len(C)):\n        if (labels == k).any():\n            new[k] = P[labels == k].mean(axis=0)\n    return new\n\nprint(kmeans_step([[0, 0], [0, 2], [10, 10]], [[1, 1], [9, 9]]))",
   "hints": [
    "Тағайындау: әр нүкте үшін <code>np.argmin(((C - p) ** 2).sum(axis=1))</code>",
    "Жаңарту: <code>P[labels == k].mean(axis=0)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_r = kmeans_step([[0, 0], [0, 2], [10, 10]], [[1, 1], [9, 9]])\nassert _r is not None and _np.allclose(_r, [[0, 1], [10, 10]]), 'kmeans_step([[0, 0], [0, 2], [10, 10]], [[1, 1], [9, 9]]) → [[0, 1], [10, 10]]'\nassert _np.allclose(kmeans_step([[1, 1], [2, 2]], [[0, 0], [50, 50]]), [[1.5, 1.5], [50, 50]]), 'Нүктесі жоқ центр орнында қалады'\nassert _np.allclose(kmeans_step([[0], [1], [9], [10], [11]], [[0], [5], [12]]), [[0.5], [5], [10]]), 'Бір өлшемде: [[0.5], [5], [10]] (ортаңғы центрге нүкте жоқ)'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Масштабсыз кластерлер",
   "prompt": "<p>Масштабсыз KMeans-ті <code>monthly_fee</code> (мыңдаған теңге) басқарады. Сол <code>cols</code> бойынша екі модель үйретіңіз (<code>n_clusters=3, n_init=10, random_state=0</code>): шикі деректе және <code>StandardScaler</code>-ден кейін. Әрқайсысында кластерлердің орташа <code>tenure_months</code> мәндерінің ауқымын (max − min) <code>range_raw</code> және <code>range_scaled</code>-ке жазыңыз.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.cluster import KMeans\ncols = ['tenure_months', 'monthly_fee', 'data_gb', 'support_calls']\nseg = df[cols].dropna()\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.cluster import KMeans\ncols = ['tenure_months', 'monthly_fee', 'data_gb', 'support_calls']\nseg = df[cols].dropna()\n\ndef tenure_range(data):\n    labels = KMeans(n_clusters=3, n_init=10, random_state=0).fit(data).labels_\n    m = seg['tenure_months'].groupby(labels).mean()\n    return m.max() - m.min()\n\nrange_raw = tenure_range(seg[cols].values)\nrange_scaled = tenure_range(StandardScaler().fit_transform(seg[cols]))\nprint(round(range_raw, 1), round(range_scaled, 1))",
   "hints": [
    "Қайталанатын бөлікке функция жазыңыз.",
    "<code>seg['tenure_months'].groupby(labels).mean()</code>"
   ],
   "check": {
    "tests": "from sklearn.cluster import KMeans as _KM\nfrom sklearn.preprocessing import StandardScaler as _SS\ndef _tr(_d):\n    _m = seg['tenure_months'].groupby(_KM(n_clusters=3, n_init=10, random_state=0).fit(_d).labels_).mean()\n    return _m.max() - _m.min()\nassert abs(range_raw - _tr(seg[cols].values)) < 1e-6, 'range_raw дұрыс емес: шикі seg[cols]-та KMeans'\nassert abs(range_scaled - _tr(_SS().fit_transform(seg[cols]))) < 1e-6, 'range_scaled дұрыс емес: StandardScaler().fit_transform(seg[cols])'\nassert range_scaled > range_raw + 10, 'Масштабтағаннан кейін tenure бойынша айырма көрінеді'",
    "mustInclude": [
     "KMeans("
    ]
   }
  }
 ],
 "mp-9": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ең маңызды белгілер",
   "prompt": "<p><code>top_k(imp, k)</code> функциясы <code>{белгі: маңыздылық}</code> сөздігінен маңыздылығы ең үлкен <code>k</code> белгінің атын (кему ретімен) тізім ретінде қайтарсын.</p><p>Мысалы, <code>top_k({'a': 0.1, 'b': 0.7, 'c': 0.2}, 2)</code> → <code>['b', 'c']</code>.</p>",
   "starter": "def top_k(imp, k):\n    pass\n",
   "solution": "def top_k(imp, k):\n    return sorted(imp, key=imp.get, reverse=True)[:k]\n\nprint(top_k({'a': 0.1, 'b': 0.7, 'c': 0.2}, 2))",
   "hints": [
    "<code>sorted(imp, key=imp.get, reverse=True)</code>",
    "Кесу: <code>[:k]</code>"
   ],
   "check": {
    "tests": "assert top_k({'a': 0.1, 'b': 0.7, 'c': 0.2}, 2) == ['b', 'c'], \"top_k({'a': 0.1, 'b': 0.7, 'c': 0.2}, 2) ['b', 'c'] қайтаруы керек\"\nassert top_k({'tenure_months': 0.4, 'monthly_fee': 0.25, 'support_calls': 0.3}, 1) == ['tenure_months'], 'k=1: ең маңыздысы'\nassert top_k({'x': 0.5}, 3) == ['x'], 'k белгілер санынан көп болса, барлығы'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ағаштың маңыздылығы",
   "prompt": "<p>Пәтерлердің сандық белгілерінде (<code>fnum</code>, бүкіл дерек) <code>DecisionTreeRegressor(max_depth=4, random_state=0)</code> үйретіңіз. <code>feature_importances_</code>-ты баған аттарымен <code>imp</code> Series-ке жазып, кему ретімен сұрыптаңыз. Ең маңыздысын <code>top</code>-қа жазыңыз.</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.tree import DecisionTreeRegressor\nfnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.tree import DecisionTreeRegressor\nfnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\ntree = DecisionTreeRegressor(max_depth=4, random_state=0).fit(flats[fnum], flats['price_mln'])\nimp = pd.Series(tree.feature_importances_, index=fnum).sort_values(ascending=False)\ntop = imp.index[0]\nprint(imp.round(3))",
   "hints": [
    "<code>pd.Series(tree.feature_importances_, index=fnum)</code>",
    "<code>.sort_values(ascending=False)</code>"
   ],
   "check": {
    "tests": "from sklearn.tree import DecisionTreeRegressor as _DR\n_i = pd.Series(_DR(max_depth=4, random_state=0).fit(flats[fnum], flats['price_mln']).feature_importances_, index=fnum)\nassert isinstance(imp, pd.Series) and set(imp.index) == set(fnum), 'imp индексі — fnum бағандары'\nassert all(abs(imp[_c] - _i[_c]) < 1e-9 for _c in fnum), 'Маңыздылықтар дұрыс емес: max_depth=4, random_state=0, бүкіл дерек'\nassert list(imp.values) == sorted(imp.values, reverse=True), 'Кему ретімен сұрыптаңыз'\nassert top == _i.idxmax(), f'top = {_i.idxmax()} болуы керек'",
    "mustInclude": [
     "feature_importances_"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Коэффициенттер модулі",
   "prompt": "<p><code>model</code> (масштабталған белгілер + LogisticRegression) үйретілген. Коэффициенттерді <code>pre</code>-нің белгі аттарымен <code>coefs</code> Series-ке жазыңыз. Модулі (<code>abs</code>) ең үлкен белгіні <code>top_abs</code>-қа жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nproba = model.predict_proba(X_test)[:, 1]\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nproba = model.predict_proba(X_test)[:, 1]\nnames = model.named_steps['pre'].get_feature_names_out()\ncoefs = pd.Series(model.named_steps['model'].coef_[0], index=names)\ntop_abs = coefs.abs().idxmax()\nprint(coefs.round(2), top_abs)",
   "hints": [
    "<code>model.named_steps['pre'].get_feature_names_out()</code>",
    "<code>coefs.abs().idxmax()</code>"
   ],
   "check": {
    "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import OneHotEncoder as _OH, StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre():\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), cat)])\n_m = _Pl([('pre', _pre()), ('model', _LR(max_iter=1000))]).fit(X_train, y_train)\n_p = _m.predict_proba(X_test)[:, 1]\nimport pandas as _pd\n_c = _pd.Series(_m.named_steps['model'].coef_[0], index=_m.named_steps['pre'].get_feature_names_out())\nassert isinstance(coefs, pd.Series) and len(coefs) == 14, 'coefs — 14 белгі бойынша Series'\nassert list(coefs.index) == list(_c.index) and all(abs(coefs.values - _c.values) < 1e-6), 'coefs = coef_[0], индексі — get_feature_names_out()'\nassert top_abs == _c.abs().idxmax(), f'top_abs = {_c.abs().idxmax()} болуы керек: coefs.abs().idxmax()'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Permutation қолмен",
   "prompt": "<p>Permutation importance-ты бір белгі үшін қолмен есептеңіз. <code>base_auc</code> — test AUC. Сосын <code>X_test</code>-тің көшірмесінде <code>tenure_months</code>-ты <code>np.random.default_rng(0).permutation</code> арқылы араластырып, жаңа AUC-ты <code>shuffled_auc</code>-қа жазыңыз. <code>drop = base_auc - shuffled_auc</code>.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nproba = model.predict_proba(X_test)[:, 1]\nimport numpy as np\nfrom sklearn.metrics import roc_auc_score\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nproba = model.predict_proba(X_test)[:, 1]\nimport numpy as np\nfrom sklearn.metrics import roc_auc_score\nbase_auc = roc_auc_score(y_test, proba)\nXs = X_test.copy()\nXs['tenure_months'] = np.random.default_rng(0).permutation(Xs['tenure_months'].values)\nshuffled_auc = roc_auc_score(y_test, model.predict_proba(Xs)[:, 1])\ndrop = base_auc - shuffled_auc\nprint(round(base_auc, 3), round(shuffled_auc, 3), round(drop, 3))",
   "hints": [
    "<code>Xs = X_test.copy()</code> — бастапқы деректі бұзбаңыз.",
    "<code>np.random.default_rng(0).permutation(Xs['tenure_months'].values)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nfrom sklearn.metrics import roc_auc_score as _ra\n_X = X_test.copy()\n_X['tenure_months'] = _np.random.default_rng(0).permutation(_X['tenure_months'].values)\n_s = _ra(y_test, model.predict_proba(_X)[:, 1])\nassert abs(base_auc - _ra(y_test, model.predict_proba(X_test)[:, 1])) < 1e-9, 'base_auc — бастапқы X_test-тегі AUC'\nassert abs(shuffled_auc - _s) < 1e-9, f'shuffled_auc ≈ {_s:.3f} болуы керек: X_test көшірмесінде tenure_months-ты араластырыңыз'\nassert 'tenure_months' in X_test.columns and abs(drop - (base_auc - shuffled_auc)) < 1e-9 and drop > 0.05, 'drop = base_auc - shuffled_auc (оң)'",
    "mustInclude": [
     "permutation("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Пәтерлер permutation-ы",
   "prompt": "<p><code>rf</code> (пәтерлердің сандық белгілерінде) үйретілген. Test-те <code>permutation_importance(rf, X_test[fnum], y_test, n_repeats=5, random_state=0)</code> есептеп, <code>importances_mean</code>-ды <code>perm</code> Series-ке жазыңыз (кему ретімен). Маңызсыз белгілерді (мәні 0.01-ден кіші) <code>useless</code> тізіміне жазыңыз.</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nX = flats.drop(columns=['flat_id', 'price_mln'])\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)\nfrom sklearn.ensemble import RandomForestRegressor\nfrom sklearn.inspection import permutation_importance\nfnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\nrf = RandomForestRegressor(n_estimators=50, random_state=0).fit(X_train[fnum], y_train)\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nfrom sklearn.model_selection import train_test_split\nX = flats.drop(columns=['flat_id', 'price_mln'])\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)\nfrom sklearn.ensemble import RandomForestRegressor\nfrom sklearn.inspection import permutation_importance\nfnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\nrf = RandomForestRegressor(n_estimators=50, random_state=0).fit(X_train[fnum], y_train)\nr = permutation_importance(rf, X_test[fnum], y_test, n_repeats=5, random_state=0)\nperm = pd.Series(r.importances_mean, index=fnum).sort_values(ascending=False)\nuseless = list(perm[perm < 0.01].index)\nprint(perm.round(3), useless)",
   "hints": [
    "<code>r.importances_mean</code>",
    "Сүзгі: <code>perm[perm &lt; 0.01].index</code>"
   ],
   "check": {
    "tests": "from sklearn.inspection import permutation_importance as _pi\n_r = pd.Series(_pi(rf, X_test[fnum], y_test, n_repeats=5, random_state=0).importances_mean, index=fnum)\nassert isinstance(perm, pd.Series) and set(perm.index) == set(fnum), 'perm — fnum бойынша Series'\nassert all(abs(perm[_c] - _r[_c]) < 1e-9 for _c in fnum), 'Мәндер дұрыс емес: n_repeats=5, random_state=0, test деректе'\nassert list(perm.values) == sorted(perm.values, reverse=True), 'Кему ретімен сұрыптаңыз'\nassert sorted(useless) == sorted(_r[_r < 0.01].index), 'useless — мәні 0.01-ден кіші белгілер'",
    "mustInclude": [
     "permutation_importance("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бір болжамды түсіндіру",
   "prompt": "<p>Логистикалық модельде бір абоненттің логиті — үлестердің қосындысы: <code>z = Σ xᵢ·wᵢ + b</code>. Test-тің бірінші абоненті үшін <code>x0 = pre.transform(X_test.iloc[[0]])</code> алып, әр белгінің үлесін (<code>x0 · coef</code>) <code>contrib</code> Series-ке (индекс — белгі аттары) жазыңыз. <code>p0 = sigmoid(contrib.sum() + intercept)</code> — ол <code>proba[0]</code>-ге тең болуы керек. Ең үлкен үлес (модулі бойынша) — <code>top_driver</code>.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nproba = model.predict_proba(X_test)[:, 1]\nimport numpy as np\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nproba = model.predict_proba(X_test)[:, 1]\nimport numpy as np\npre_fit = model.named_steps['pre']\nlr = model.named_steps['model']\nx0 = np.asarray(pre_fit.transform(X_test.iloc[[0]]))[0]\ncontrib = pd.Series(x0 * lr.coef_[0], index=pre_fit.get_feature_names_out())\np0 = 1 / (1 + np.exp(-(contrib.sum() + lr.intercept_[0])))\ntop_driver = contrib.abs().idxmax()\nprint(round(p0, 4), round(proba[0], 4), top_driver)",
   "hints": [
    "<code>model.named_steps['pre'].transform(X_test.iloc[[0]])</code> (екі жақша — DataFrame)",
    "<code>contrib.sum() + lr.intercept_[0]</code>, сосын сигмоид."
   ],
   "check": {
    "tests": "assert isinstance(contrib, pd.Series) and len(contrib) == 14, 'contrib — 14 белгі үлесі'\nassert abs(p0 - proba[0]) < 1e-6, f'p0 = proba[0] ≈ {proba[0]:.4f} болуы керек: sigmoid(contrib.sum() + intercept_[0])'\nassert top_driver == contrib.abs().idxmax(), 'top_driver = contrib.abs().idxmax()'\nassert str(top_driver).startswith(('num__', 'cat__')), 'top_driver — pre-дің белгі аты'",
    "mustInclude": [
     "intercept_"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Тәуелділік қисығы",
   "prompt": "<p>Partial dependence-ті қолмен салыңыз. <code>t</code> ∈ [1, 12, 24, 36, 48, 60, 72] үшін <code>X_test</code>-тің көшірмесінде <b>барлық</b> абоненттің <code>tenure_months</code>-ын <code>t</code>-ға теңестіріп, орташа кету ықтималдығын <code>pd_curve</code> сөздігіне жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nproba = model.predict_proba(X_test)[:, 1]\npd_curve = {}\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nproba = model.predict_proba(X_test)[:, 1]\npd_curve = {}\nfor t in [1, 12, 24, 36, 48, 60, 72]:\n    Xc = X_test.copy()\n    Xc['tenure_months'] = t\n    pd_curve[t] = model.predict_proba(Xc)[:, 1].mean()\nprint({k: round(v, 3) for k, v in pd_curve.items()})",
   "hints": [
    "<code>Xc = X_test.copy()</code>, <code>Xc['tenure_months'] = t</code>",
    "<code>model.predict_proba(Xc)[:, 1].mean()</code>"
   ],
   "check": {
    "tests": "_ts = [1, 12, 24, 36, 48, 60, 72]\n_r = {}\nfor _t in _ts:\n    _X = X_test.copy()\n    _X['tenure_months'] = _t\n    _r[_t] = model.predict_proba(_X)[:, 1].mean()\nassert sorted(pd_curve) == _ts, 'Кілттер: 1, 12, 24, 36, 48, 60, 72'\nassert all(abs(pd_curve[_t] - _r[_t]) < 1e-9 for _t in _ts), 'Мәндер дұрыс емес: көшірмеде tenure_months = t, сосын predict_proba(...)[:, 1].mean()'\nassert all(pd_curve[_ts[_i]] > pd_curve[_ts[_i + 1]] for _i in range(6)), 'Мерзім өскен сайын орташа ықтималдық кемуі керек'\nassert X_test['tenure_months'].nunique() > 7, 'Бастапқы X_test өзгермеуі керек: .copy() қолданыңыз'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Бағанды алып тастау",
   "prompt": "<p>Маңыздылықтың тағы бір жолы — бағанды алып тастап, модельді қайта үйрету. <code>base_auc</code> — толық Pipeline-ның test AUC-ы. <code>tenure_months</code>-сыз (<code>num</code>-нан алып тастап, жаңа <code>pre</code> құрып) сол модельді үйретіп, <code>auc_without</code>-қа жазыңыз. <code>drop_auc = base_auc - auc_without</code>.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nproba = model.predict_proba(X_test)[:, 1]\nfrom sklearn.metrics import roc_auc_score\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nproba = model.predict_proba(X_test)[:, 1]\nfrom sklearn.metrics import roc_auc_score\nbase_auc = roc_auc_score(y_test, proba)\nnum2 = [c for c in num if c != 'tenure_months']\npre2 = ColumnTransformer([('num', Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())]), num2), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nm2 = Pipeline([('pre', pre2), ('model', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nauc_without = roc_auc_score(y_test, m2.predict_proba(X_test)[:, 1])\ndrop_auc = base_auc - auc_without\nprint(round(base_auc, 3), round(auc_without, 3), round(drop_auc, 3))",
   "hints": [
    "<code>num2 = [c for c in num if c != 'tenure_months']</code>",
    "Жаңа ColumnTransformer-ге <code>num2</code> беріңіз; X_train өзгермейді."
   ],
   "check": {
    "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import OneHotEncoder as _OH, StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre():\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), cat)])\n_m = _Pl([('pre', _pre()), ('model', _LR(max_iter=1000))]).fit(X_train, y_train)\n_p = _m.predict_proba(X_test)[:, 1]\nfrom sklearn.metrics import roc_auc_score as _ra\n_n2 = [_c for _c in num if _c != 'tenure_months']\n_m2 = _Pl([('pre', _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), _n2), ('cat', _OH(handle_unknown='ignore'), cat)])), ('model', _LR(max_iter=1000))]).fit(X_train, y_train)\n_aw = _ra(y_test, _m2.predict_proba(X_test)[:, 1])\nassert abs(base_auc - _ra(y_test, _p)) < 1e-6, 'base_auc — толық модельдің test AUC-ы'\nassert abs(auc_without - _aw) < 1e-6, f'auc_without ≈ {_aw:.3f} болуы керек: num-нан tenure_months-ты алып, жаңа pre құрыңыз'\nassert abs(drop_auc - (base_auc - auc_without)) < 1e-9 and drop_auc > 0.05, 'drop_auc = base_auc − auc_without, айтарлықтай оң'"
   }
  }
 ],
 "mp-10": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Model card сөздігі",
   "prompt": "<p>Модель туралы қысқа құжат (model card) жасаңыз: <code>card</code> сөздігінде <code>'name'</code> (мәтін), <code>'version'</code> (бүтін сан), <code>'data'</code> (<code>'churn.csv'</code>), <code>'metric'</code> (<code>'roc_auc'</code>) және <code>'limitations'</code> (кемінде бір мәтіні бар тізім) кілттері болсын.</p>",
   "starter": "card = {}\n",
   "solution": "card = {\n    'name': 'churn_logreg',\n    'version': 1,\n    'data': 'churn.csv',\n    'metric': 'roc_auc',\n    'limitations': ['Тек 5 қаланың деректері', 'Жаңа тарифтерде тексерілмеген'],\n}\nprint(card)",
   "hints": [
    "Сөздік: <code>{'name': '...', 'version': 1, ...}</code>"
   ],
   "check": {
    "tests": "assert isinstance(card, dict) and {'name', 'version', 'data', 'metric', 'limitations'} <= set(card), \"card кілттері: name, version, data, metric, limitations\"\nassert isinstance(card['name'], str) and card['name'], 'name — бос емес мәтін'\nassert isinstance(card['version'], int), 'version — бүтін сан'\nassert card['data'] == 'churn.csv' and card['metric'] == 'roc_auc', \"data = 'churn.csv', metric = 'roc_auc'\"\nassert isinstance(card['limitations'], list) and len(card['limitations']) >= 1 and all(isinstance(_x, str) for _x in card['limitations']), 'limitations — мәтіндер тізімі (кемінде біреу)'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Пәтер моделін сақтау",
   "prompt": "<p><code>model</code> (пәтер бағасы) үйретілген. Оны <code>joblib.dump</code>-пен <code>flats_lr.joblib</code> файлына сақтап, <code>loaded</code>-қа қайта жүктеңіз. Екеуінің <code>X</code>-тегі болжамдары бірдей ме — <code>same</code> (bool).</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nimport joblib\nfrom sklearn.linear_model import LinearRegression\nX = flats[['area_m2', 'rooms', 'year_built']]\nmodel = LinearRegression().fit(X, flats['price_mln'])\nloaded = None\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nimport joblib\nfrom sklearn.linear_model import LinearRegression\nX = flats[['area_m2', 'rooms', 'year_built']]\nmodel = LinearRegression().fit(X, flats['price_mln'])\njoblib.dump(model, 'flats_lr.joblib')\nloaded = joblib.load('flats_lr.joblib')\nsame = bool((loaded.predict(X) == model.predict(X)).all())\nprint(same)",
   "hints": [
    "<code>joblib.dump(model, 'flats_lr.joblib')</code>",
    "<code>joblib.load('flats_lr.joblib')</code>"
   ],
   "check": {
    "tests": "import os as _os\nfrom sklearn.linear_model import LinearRegression as _LinR\nassert _os.path.exists('flats_lr.joblib'), 'flats_lr.joblib файлы табылмады: joblib.dump(model, ...)'\nassert isinstance(loaded, _LinR) and loaded is not model, 'loaded — файлдан жүктелген LinearRegression'\nassert bool(same) is True, 'same = (loaded.predict(X) == model.predict(X)).all() → True'",
    "mustInclude": [
     "joblib.dump(",
     "joblib.load("
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Card-ты JSON-ға жазу",
   "prompt": "<p><code>card</code>-ты <code>json.dump</code> арқылы <code>card.json</code> файлына жазыңыз (<code>ensure_ascii=False</code>, кирилл әріптері сақталсын). Сосын файлды қайта оқып, <code>card2</code>-ге жазыңыз. Екеуі бірдей болуы керек.</p>",
   "starter": "import json\ncard = {'name': 'churn_logreg', 'version': 2, 'metrics': {'auc': 0.81}, 'owner': 'Алматы аналитика тобы'}\ncard2 = None\n",
   "solution": "import json\ncard = {'name': 'churn_logreg', 'version': 2, 'metrics': {'auc': 0.81}, 'owner': 'Алматы аналитика тобы'}\nwith open('card.json', 'w', encoding='utf-8') as f:\n    json.dump(card, f, ensure_ascii=False)\nwith open('card.json', encoding='utf-8') as f:\n    card2 = json.load(f)\nprint(card2 == card)",
   "hints": [
    "<code>with open('card.json', 'w', encoding='utf-8') as f: json.dump(card, f, ensure_ascii=False)</code>",
    "Оқу: <code>json.load(f)</code>"
   ],
   "check": {
    "tests": "import os as _os\nassert _os.path.exists('card.json'), 'card.json файлы табылмады'\nassert card2 == card, 'card2 файлдан оқылған сөздік, card-пен бірдей болуы керек'\nassert 'Алматы' in open('card.json', encoding='utf-8').read(), 'ensure_ascii=False: файлда кирилл әріптері сол күйінде болуы керек'",
    "mustInclude": [
     "json.dump(",
     "json.load("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Модель файлының аты",
   "prompt": "<p>Модель нұсқаларын шатастырмау үшін файл атауын ережемен жасаңыз. <code>model_filename(name, version, date)</code> <code>'&lt;name&gt;_v&lt;version&gt;_&lt;date&gt;.joblib'</code> қайтарсын; <code>name</code>-дегі бос орындар <code>_</code>-ге ауыссын, барлығы кіші әріппен.</p><p>Мысалы, <code>model_filename('Churn LogReg', 3, '2024-05-01')</code> → <code>'churn_logreg_v3_2024-05-01.joblib'</code>.</p>",
   "starter": "def model_filename(name, version, date):\n    pass\n",
   "solution": "def model_filename(name, version, date):\n    return f\"{name.lower().replace(' ', '_')}_v{version}_{date}.joblib\"\n\nprint(model_filename('Churn LogReg', 3, '2024-05-01'))",
   "hints": [
    "f-жол: <code>f\"{...}_v{version}_{date}.joblib\"</code>",
    "<code>name.lower().replace(' ', '_')</code>"
   ],
   "check": {
    "tests": "assert model_filename('Churn LogReg', 3, '2024-05-01') == 'churn_logreg_v3_2024-05-01.joblib', \"model_filename('Churn LogReg', 3, '2024-05-01') 'churn_logreg_v3_2024-05-01.joblib' қайтаруы керек\"\nassert model_filename('flats', 1, '2024-01-15') == 'flats_v1_2024-01-15.joblib', \"model_filename('flats', 1, '2024-01-15') → 'flats_v1_2024-01-15.joblib'\"\nassert model_filename('Pater Baga RF', 12, 'x') == 'pater_baga_rf_v12_x.joblib', 'Бірнеше бос орын да ауысады'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жүктелген модельмен болжам",
   "prompt": "<p><code>model</code> (толық Pipeline) үйретілген. Оны <code>churn_lr.joblib</code>-ке сақтап, <code>loaded</code>-қа жүктеңіз. Жаңа екі абоненттің (<code>new</code>, жасы бос болуы мүмкін) кету ықтималдығын <code>loaded</code> арқылы <code>probs</code> массивіне жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nproba = model.predict_proba(X_test)[:, 1]\nimport joblib\nnew = pd.DataFrame({'age': [23, None], 'tenure_months': [2, 60], 'monthly_fee': [11000, 3500], 'data_gb': [30.5, 4.0], 'support_calls': [4, 0], 'has_contract': [0, 1], 'city': ['Шымкент', 'Астана'], 'plan': ['premium', 'basic']})\nloaded = None\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nproba = model.predict_proba(X_test)[:, 1]\nimport joblib\nnew = pd.DataFrame({'age': [23, None], 'tenure_months': [2, 60], 'monthly_fee': [11000, 3500], 'data_gb': [30.5, 4.0], 'support_calls': [4, 0], 'has_contract': [0, 1], 'city': ['Шымкент', 'Астана'], 'plan': ['premium', 'basic']})\njoblib.dump(model, 'churn_lr.joblib')\nloaded = joblib.load('churn_lr.joblib')\nprobs = loaded.predict_proba(new)[:, 1]\nprint(probs.round(3))",
   "hints": [
    "Pipeline шикі бағандарды (NaN-мен бірге) өзі өңдейді.",
    "<code>loaded.predict_proba(new)[:, 1]</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nimport os as _os\nassert _os.path.exists('churn_lr.joblib') and loaded is not None and loaded is not model, 'Модельді churn_lr.joblib-ке сақтап, loaded-қа жүктеңіз'\nassert len(probs) == 2 and _np.allclose(probs, model.predict_proba(new)[:, 1]), 'probs = loaded.predict_proba(new)[:, 1]'\nassert probs[0] > 0.5 > probs[1], 'Жаңа premium абонент қауіпті, ескі келісімшартты абонент қауіпсіз'",
    "mustInclude": [
     "joblib.dump(",
     "joblib.load("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Метрикалар card-та",
   "prompt": "<p>Model card-қа test метрикаларын қосыңыз: <code>card['metrics']</code> = <code>{'auc': ..., 'recall': ..., 'precision': ...}</code>, әрқайсысы 3 таңбаға дейін дөңгелектелген (<code>round</code>), шек 0.5. Сондай-ақ <code>card['n_test'] = len(X_test)</code>.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nproba = model.predict_proba(X_test)[:, 1]\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\ncard = {'name': 'churn_logreg', 'version': 1}\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nproba = model.predict_proba(X_test)[:, 1]\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\ncard = {'name': 'churn_logreg', 'version': 1}\npred = model.predict(X_test)\ncard['metrics'] = {\n    'auc': round(roc_auc_score(y_test, proba), 3),\n    'recall': round(recall_score(y_test, pred), 3),\n    'precision': round(precision_score(y_test, pred), 3),\n}\ncard['n_test'] = len(X_test)\nprint(card)",
   "hints": [
    "<code>round(roc_auc_score(y_test, proba), 3)</code>",
    "Шек 0.5: <code>model.predict(X_test)</code>"
   ],
   "check": {
    "tests": "from sklearn.metrics import roc_auc_score as _ra, recall_score as _rs, precision_score as _ps\n_pr = model.predict(X_test)\nassert 'metrics' in card and set(card['metrics']) == {'auc', 'recall', 'precision'}, \"card['metrics'] кілттері: auc, recall, precision\"\nassert card['metrics']['auc'] == round(_ra(y_test, proba), 3), 'auc — proba бойынша, 3 таңба'\nassert card['metrics']['recall'] == round(_rs(y_test, _pr), 3) and card['metrics']['precision'] == round(_ps(y_test, _pr), 3), 'recall мен precision — model.predict(X_test) бойынша, 3 таңба'\nassert card['n_test'] == 150, \"card['n_test'] = len(X_test) = 150\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Сақтап тексеру функциясы",
   "prompt": "<p><code>save_and_check(model, X, path)</code> функциясын жазыңыз: модельді <code>path</code>-қа сақтап, қайта жүктеп, екеуінің <code>X</code>-тегі болжамдары толық сәйкес келсе <code>True</code>, әйтпесе <code>False</code> қайтарсын. Оны <code>model</code> үшін <code>churn_v1.joblib</code> файлымен шақырып, нәтижені <code>ok</code>-қа жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nproba = model.predict_proba(X_test)[:, 1]\nimport joblib\nimport numpy as np\n\ndef save_and_check(model, X, path):\n    pass\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nproba = model.predict_proba(X_test)[:, 1]\nimport joblib\nimport numpy as np\n\ndef save_and_check(model, X, path):\n    joblib.dump(model, path)\n    loaded = joblib.load(path)\n    return bool(np.array_equal(loaded.predict(X), model.predict(X)))\n\nok = save_and_check(model, X_test, 'churn_v1.joblib')\nprint(ok)",
   "hints": [
    "Функция ішінде: <code>joblib.dump</code>, <code>joblib.load</code>, сосын салыстыру.",
    "<code>np.array_equal(a, b)</code>"
   ],
   "check": {
    "tests": "import os as _os\nfrom sklearn.tree import DecisionTreeClassifier as _DT\nassert ok is True, 'ok = save_and_check(model, X_test, \"churn_v1.joblib\") → True'\nassert _os.path.exists('churn_v1.joblib'), 'Функция модельді path-қа сақтауы керек'\n_t = _DT(max_depth=2, random_state=0).fit(X_test[['tenure_months', 'monthly_fee']], y_test)\nassert save_and_check(_t, X_test[['tenure_months', 'monthly_fee']], '_tree_check.joblib') is True and _os.path.exists('_tree_check.joblib'), 'Функция кез келген модельмен жұмыс істеуі керек'",
    "mustInclude": [
     "joblib.dump(",
     "joblib.load("
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Тариф бойынша card",
   "prompt": "<p>Fairness бөлімі: test-те әр <code>plan</code> бойынша recall есептеп, <code>card['recall_by_plan']</code> сөздігіне жазыңыз (<code>{тариф: recall}</code>, 3 таңба, <code>zero_division=0</code>). Recall ең төмен тарифті <code>card['worst_plan']</code>-ға жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nproba = model.predict_proba(X_test)[:, 1]\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\ncard = {'name': 'churn_logreg', 'version': 1}\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nfrom sklearn.linear_model import LogisticRegression\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nproba = model.predict_proba(X_test)[:, 1]\nfrom sklearn.metrics import recall_score, precision_score, roc_auc_score\ncard = {'name': 'churn_logreg', 'version': 1}\nres = pd.DataFrame({'plan': X_test['plan'], 'y': y_test, 'pred': model.predict(X_test)})\ncard['recall_by_plan'] = {p: round(recall_score(g['y'], g['pred'], zero_division=0), 3) for p, g in res.groupby('plan')}\ncard['worst_plan'] = min(card['recall_by_plan'], key=card['recall_by_plan'].get)\nprint(card)",
   "hints": [
    "<code>res.groupby('plan')</code> — <code>for p, g in ...</code> арқылы әр топ.",
    "<code>recall_score(g['y'], g['pred'], zero_division=0)</code>"
   ],
   "check": {
    "tests": "from sklearn.metrics import recall_score as _rs\n_res = pd.DataFrame({'plan': X_test['plan'], 'y': y_test, 'pred': model.predict(X_test)})\n_r = {_p: round(_rs(_g['y'], _g['pred'], zero_division=0), 3) for _p, _g in _res.groupby('plan')}\nassert isinstance(card.get('recall_by_plan'), dict) and set(card['recall_by_plan']) == {'basic', 'standard', 'premium'}, \"card['recall_by_plan'] — үш тариф бойынша сөздік\"\nassert all(abs(card['recall_by_plan'][_p] - _r[_p]) < 1e-9 for _p in _r), 'Recall мәндері дұрыс емес: тек сол тарифтің test жолдары, 3 таңба'\nassert card.get('worst_plan') == min(_r, key=_r.get), f\"worst_plan = {min(_r, key=_r.get)} болуы керек\""
   }
  }
 ]
});
