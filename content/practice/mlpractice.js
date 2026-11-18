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
 ],
 "mp-ts": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "MAE және MAPE функциялары",
   "prompt": "<p>Екі функция жазыңыз: <code>mae(y_true, y_pred)</code> — орташа абсолютті қате; <code>mape(y_true, y_pred)</code> — пайызбен орташа қате: <code>mean(|шын − болжам| / шын) · 100</code>. Екеуі де тізіммен де, numpy массивімен де жұмыс істесін.</p><p>Мысалы, <code>mae([100, 200], [110, 180])</code> → <code>15.0</code>, <code>mape([100, 200], [110, 180])</code> → <code>10.0</code>.</p>",
   "starter": "import numpy as np\n\ndef mae(y_true, y_pred):\n    pass\n\ndef mape(y_true, y_pred):\n    pass\n",
   "solution": "import numpy as np\n\ndef mae(y_true, y_pred):\n    y_true, y_pred = np.asarray(y_true, dtype=float), np.asarray(y_pred, dtype=float)\n    return np.abs(y_true - y_pred).mean()\n\ndef mape(y_true, y_pred):\n    y_true, y_pred = np.asarray(y_true, dtype=float), np.asarray(y_pred, dtype=float)\n    return (np.abs(y_true - y_pred) / y_true).mean() * 100\n\nprint(mae([100, 200], [110, 180]), mape([100, 200], [110, 180]))",
   "hints": [
    "Алдымен массивке айналдырыңыз: <code>np.asarray(y_true, dtype=float)</code>",
    "<code>(np.abs(y_true - y_pred) / y_true).mean() * 100</code>"
   ],
   "check": {
    "tests": "assert mae([100, 200], [110, 180]) is not None and abs(mae([100, 200], [110, 180]) - 15) < 1e-9, \"mae([100, 200], [110, 180]) = 15 болуы керек\"\nassert mape([100, 200], [110, 180]) is not None and abs(mape([100, 200], [110, 180]) - 10) < 1e-9, \"mape([100, 200], [110, 180]) = (10% + 10%) / 2 = 10 болуы керек\"\nassert abs(mae(np.array([200, 250, 300]), np.array([210, 240, 330])) - 50 / 3) < 1e-9, \"numpy массивімен де жұмыс істеуі керек: MAE ≈ 16.7\"\nassert abs(mape([200, 250, 300], [210, 240, 330]) - 19 / 3) < 1e-9, \"Сабақтағы мысал: MAPE ≈ 6.33\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жыл бойынша бөлу",
   "prompt": "<p>Деректі уақыт бойынша бөліңіз: <code>train</code> — 2024 жыл (<code>2025-01-01</code>-ге дейін), <code>test</code> — 2025 жыл. Жолдар санын <code>n_train</code>, <code>n_test</code>-ке, орташа сатылымды <code>train_mean</code>, <code>test_mean</code>-ге жазыңыз. Тренд көріне ме?</p>",
   "starter": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('sales_daily.csv', parse_dates=['date'])\n",
   "solution": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('sales_daily.csv', parse_dates=['date'])\ntrain = df[df['date'] < '2025-01-01']\ntest = df[df['date'] >= '2025-01-01']\nn_train, n_test = len(train), len(test)\ntrain_mean, test_mean = train['sales'].mean(), test['sales'].mean()\nprint(n_train, n_test, round(train_mean, 1), round(test_mean, 1))",
   "hints": [
    "<code>train = df[df['date'] &lt; '2025-01-01']</code>"
   ],
   "check": {
    "tests": "_d = pd.read_csv('sales_daily.csv', parse_dates=['date'])\n_tr = _d[_d['date'] < '2025-01-01']['sales']; _te = _d[_d['date'] >= '2025-01-01']['sales']\nassert (n_train, n_test) == (366, 364), f\"n_train = 366 (2024 — кібісе жыл), n_test = 364 болуы керек, сізде {n_train} және {n_test}\"\nassert train['date'].max() < test['date'].min(), \"Train-нің бәрі test-тен бұрын болуы керек\"\nassert abs(train_mean - _tr.mean()) < 1e-9 and abs(test_mean - _te.mean()) < 1e-9, f\"train_mean ≈ {_tr.mean():.1f}, test_mean ≈ {_te.mean():.1f} болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Орташа baseline",
   "prompt": "<p>Ең қарапайым baseline: болашақтың бәріне train-нің орташасын болжау. Train — <code>2025-07-01</code>-ге дейін, test — сол күннен бастап. <code>pred_mean</code> — train-дегі орташа сатылым, <code>mae_mean</code> — test-тегі MAE.</p>",
   "starter": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('sales_daily.csv', parse_dates=['date'])\n",
   "solution": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('sales_daily.csv', parse_dates=['date'])\ntrain = df[df['date'] < '2025-07-01']\ntest = df[df['date'] >= '2025-07-01']\npred_mean = train['sales'].mean()\nmae_mean = (test['sales'] - pred_mean).abs().mean()\nprint(round(pred_mean, 1), round(mae_mean, 1))",
   "hints": [
    "<code>pred_mean = train['sales'].mean()</code>",
    "<code>(test['sales'] - pred_mean).abs().mean()</code>"
   ],
   "check": {
    "tests": "_d = pd.read_csv('sales_daily.csv', parse_dates=['date'])\n_m = _d[_d['date'] < '2025-07-01']['sales'].mean()\n_e = (_d[_d['date'] >= '2025-07-01']['sales'] - _m).abs().mean()\nassert abs(pred_mean - _m) < 1e-9, f\"pred_mean ≈ {_m:.1f} болуы керек: тек train-нің орташасы (2025-07-01-ге дейін)\"\nassert abs(mae_mean - _e) < 1e-9, f\"mae_mean ≈ {_e:.1f} болуы керек: test-тегі |sales − pred_mean| орташасы\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Апта күндерінің маусымдылығы",
   "prompt": "<p><code>df['dow']</code> бағанын қосыңыз: апта күні, <code>df['date'].dt.dayofweek</code> (0 — дүйсенбі, 6 — жексенбі). Тек train-де (<code>2025-07-01</code>-ге дейін) әр күннің орташа сатылымын <code>dow_mean</code> Series-іне жазыңыз. Ең көп сатылатын күннің нөмірін <code>best_dow</code>-ге (int), ең жоғары орташаның ең төменгісіне қатынасын <code>ratio</code>-ға жазыңыз.</p>",
   "starter": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('sales_daily.csv', parse_dates=['date'])\n",
   "solution": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('sales_daily.csv', parse_dates=['date'])\ndf['dow'] = df['date'].dt.dayofweek\ntrain = df[df['date'] < '2025-07-01']\ndow_mean = train.groupby('dow')['sales'].mean()\nbest_dow = int(dow_mean.idxmax())\nratio = dow_mean.max() / dow_mean.min()\nprint(dow_mean.round(1), best_dow, round(ratio, 2))",
   "hints": [
    "<code>train.groupby('dow')['sales'].mean()</code>",
    "<code>int(dow_mean.idxmax())</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_d = pd.read_csv('sales_daily.csv', parse_dates=['date'])\n_d['dow'] = _d['date'].dt.dayofweek\n_g = _d[_d['date'] < '2025-07-01'].groupby('dow')['sales'].mean()\nassert 'dow' in df.columns and (df['dow'] == _d['dow']).all(), \"df['dow'] = df['date'].dt.dayofweek\"\nassert len(dow_mean) == 7 and _np.allclose(_np.asarray(dow_mean, dtype=float), _g.values), \"dow_mean — 7 мән, тек train-де (2025-07-01-ге дейін)\"\nassert best_dow == int(_g.idxmax()), f\"best_dow = {int(_g.idxmax())} болуы керек\"\nassert abs(ratio - _g.max() / _g.min()) < 1e-9, f\"ratio ≈ {_g.max() / _g.min():.2f}: max / min\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ұзынырақ lag және rolling",
   "prompt": "<p><code>df</code>-ке үш белгі қосыңыз: <code>lag_14</code> — 14 күн бұрынғы сатылым; <code>roll_28</code> — соңғы 28 күннің орташасы; <code>roll_max7</code> — соңғы 7 күннің максимумы. Rolling белгілеріне бүгінгі күн кірмеуі керек. Сосын <code>d = df.dropna()</code>, жолдар санын <code>n_rows</code>-қа жазыңыз.</p>",
   "starter": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('sales_daily.csv', parse_dates=['date'])\n",
   "solution": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('sales_daily.csv', parse_dates=['date'])\ndf['lag_14'] = df['sales'].shift(14)\ndf['roll_28'] = df['sales'].shift(1).rolling(28).mean()\ndf['roll_max7'] = df['sales'].shift(1).rolling(7).max()\nd = df.dropna()\nn_rows = len(d)\nprint(n_rows)",
   "hints": [
    "Бүгінді алып тастау: <code>df['sales'].shift(1).rolling(28).mean()</code>",
    "Максимум: <code>.rolling(7).max()</code>"
   ],
   "check": {
    "tests": "_d = pd.read_csv('sales_daily.csv', parse_dates=['date'])\n_s = _d['sales']\nassert abs(df.loc[30, 'lag_14'] - _s.iloc[16]) < 1e-9, \"lag_14 = shift(14)\"\nassert abs(df.loc[30, 'roll_28'] - _s.iloc[2:30].mean()) < 1e-9, \"roll_28 бүгінгі сатылымды қамтымауы керек: df['sales'].shift(1).rolling(28).mean()\"\nassert abs(df.loc[30, 'roll_max7'] - _s.iloc[23:30].max()) < 1e-9, \"roll_max7: df['sales'].shift(1).rolling(7).max()\"\nassert n_rows == 702 and len(d) == 702, f\"dropna-дан кейін 702 жол қалуы керек (алғашқы 28 күнде roll_28 жоқ), сізде {n_rows}\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "4 аптаның орташасы",
   "prompt": "<p>Seasonal naive бір ғана өткен аптаға сүйенеді. Тұрақтырақ нұсқа: өткен 4 аптаның сол күнінің орташасы. <code>df['snaive']</code> = 7 күн бұрынғы сатылым, <code>df['snaive4']</code> = 7, 14, 21 және 28 күн бұрынғы сатылымдардың орташасы. Test кезеңіндегі (<code>2025-07-01</code>-ден бастап) MAE-лерін <code>mae_snaive</code> және <code>mae_snaive4</code>-ке жазыңыз.</p>",
   "starter": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('sales_daily.csv', parse_dates=['date'])\n",
   "solution": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('sales_daily.csv', parse_dates=['date'])\ndf['snaive'] = df['sales'].shift(7)\ndf['snaive4'] = (df['sales'].shift(7) + df['sales'].shift(14) + df['sales'].shift(21) + df['sales'].shift(28)) / 4\ntest = df[df['date'] >= '2025-07-01']\nmae_snaive = (test['sales'] - test['snaive']).abs().mean()\nmae_snaive4 = (test['sales'] - test['snaive4']).abs().mean()\nprint(round(mae_snaive, 2), round(mae_snaive4, 2))",
   "hints": [
    "<code>(df['sales'].shift(7) + df['sales'].shift(14) + df['sales'].shift(21) + df['sales'].shift(28)) / 4</code>",
    "Baseline бағандарын бөлуден бұрын қосыңыз."
   ],
   "check": {
    "tests": "_d = pd.read_csv('sales_daily.csv', parse_dates=['date'])\n_s = _d['sales']; _m = _d['date'] >= '2025-07-01'\n_a = (_s - _s.shift(7)).abs()[_m].mean()\n_b = (_s - (_s.shift(7) + _s.shift(14) + _s.shift(21) + _s.shift(28)) / 4).abs()[_m].mean()\nassert abs(df.loc[40, 'snaive4'] - (_s[33] + _s[26] + _s[19] + _s[12]) / 4) < 1e-9, \"snaive4 — 7, 14, 21, 28 күн бұрынғы мәндердің орташасы\"\nassert abs(mae_snaive - _a) < 1e-9, f\"mae_snaive ≈ {_a:.2f} болуы керек (тек test кезеңі)\"\nassert abs(mae_snaive4 - _b) < 1e-9, f\"mae_snaive4 ≈ {_b:.2f} болуы керек (тек test кезеңі)\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Апта күнін белгіге қосу",
   "prompt": "<p>Белгілер <code>F</code> дайын. Апта күнін one-hot белгі етіп қосыңыз: <code>dummies = pd.get_dummies(df['date'].dt.dayofweek, prefix='dow', drop_first=True, dtype=int)</code>, <code>df = pd.concat([df, dummies], axis=1)</code>, <code>F2 = F + list(dummies.columns)</code>. Сосын <code>d = df.dropna()</code>, уақыт бойынша бөліңіз (<code>2025-07-01</code>). Екі <code>LinearRegression</code> үйретіңіз: <code>F</code>-пен (test MAE → <code>mae_base</code>) және <code>F2</code>-мен (test MAE → <code>mae_dow</code>).</p>",
   "starter": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('sales_daily.csv', parse_dates=['date'])\nfrom sklearn.linear_model import LinearRegression\ndf['lag_1'] = df['sales'].shift(1)\ndf['lag_7'] = df['sales'].shift(7)\ndf['roll_7'] = df['sales'].shift(1).rolling(7).mean()\nF = ['lag_1', 'lag_7', 'roll_7', 'promo']\n",
   "solution": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('sales_daily.csv', parse_dates=['date'])\nfrom sklearn.linear_model import LinearRegression\ndf['lag_1'] = df['sales'].shift(1)\ndf['lag_7'] = df['sales'].shift(7)\ndf['roll_7'] = df['sales'].shift(1).rolling(7).mean()\nF = ['lag_1', 'lag_7', 'roll_7', 'promo']\ndummies = pd.get_dummies(df['date'].dt.dayofweek, prefix='dow', drop_first=True, dtype=int)\ndf = pd.concat([df, dummies], axis=1)\nF2 = F + list(dummies.columns)\nd = df.dropna()\ntrain = d[d['date'] < '2025-07-01']\ntest = d[d['date'] >= '2025-07-01']\nm1 = LinearRegression().fit(train[F], train['sales'])\nm2 = LinearRegression().fit(train[F2], train['sales'])\nmae_base = np.abs(test['sales'] - m1.predict(test[F])).mean()\nmae_dow = np.abs(test['sales'] - m2.predict(test[F2])).mean()\nprint(round(mae_base, 2), round(mae_dow, 2))",
   "hints": [
    "<code>pd.concat([df, dummies], axis=1)</code> бағандарды қатар қосады.",
    "Train: <code>d[d['date'] &lt; '2025-07-01']</code>; MAE: <code>np.abs(test['sales'] - pred).mean()</code>"
   ],
   "check": {
    "tests": "_d = pd.read_csv('sales_daily.csv', parse_dates=['date'])\nfrom sklearn.linear_model import LinearRegression as _LR\n_d['lag_1'] = _d['sales'].shift(1); _d['lag_7'] = _d['sales'].shift(7); _d['roll_7'] = _d['sales'].shift(1).rolling(7).mean()\n_dm = pd.get_dummies(_d['date'].dt.dayofweek, prefix='dow', drop_first=True, dtype=int)\n_d = pd.concat([_d, _dm], axis=1).dropna()\n_F = ['lag_1', 'lag_7', 'roll_7', 'promo']; _F2 = _F + list(_dm.columns)\n_tr = _d[_d['date'] < '2025-07-01']; _te = _d[_d['date'] >= '2025-07-01']\n_a = (_te['sales'] - _LR().fit(_tr[_F], _tr['sales']).predict(_te[_F])).abs().mean()\n_b = (_te['sales'] - _LR().fit(_tr[_F2], _tr['sales']).predict(_te[_F2])).abs().mean()\nassert len(F2) == 10, \"F2-де 10 белгі болуы керек: 4 + 6 апта күні (drop_first=True)\"\nassert abs(mae_base - _a) < 1e-6, f\"mae_base ≈ {_a:.2f} болуы керек\"\nassert abs(mae_dow - _b) < 1e-6, f\"mae_dow ≈ {_b:.2f} болуы керек: F2 белгілерімен, train 2025-07-01-ге дейін\"\nassert mae_dow < mae_base, \"Апта күні қатені азайтуы керек\"",
    "mustInclude": [
     "get_dummies("
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "7 күн алға болжау",
   "prompt": "<p>Дүкен тауарға тапсырысты бір апта бұрын береді: болжам 7 күн алға керек. Сондықтан кешегі сатылым (lag_1) белгісіз. Тек 7 күн және одан бұрынғы мәндерден белгілер жасаңыз: <code>h_lag7</code> = shift(7), <code>h_lag14</code> = shift(14), <code>h_roll7</code> = 7 күн бұрын аяқталған 7 күндік орташа (<code>shift(7).rolling(7).mean()</code>). <code>H = ['h_lag7', 'h_lag14', 'h_roll7', 'promo']</code>, <code>d = df.dropna()</code>, бөлу <code>2025-07-01</code>. <code>LinearRegression</code>-ның test MAE-сін <code>mae_h7</code>-ге, сол test жолдарындағы seasonal naive (<code>h_lag7</code>) MAE-сін <code>mae_snaive</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('sales_daily.csv', parse_dates=['date'])\nfrom sklearn.linear_model import LinearRegression\n",
   "solution": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('sales_daily.csv', parse_dates=['date'])\nfrom sklearn.linear_model import LinearRegression\ndf['h_lag7'] = df['sales'].shift(7)\ndf['h_lag14'] = df['sales'].shift(14)\ndf['h_roll7'] = df['sales'].shift(7).rolling(7).mean()\nH = ['h_lag7', 'h_lag14', 'h_roll7', 'promo']\nd = df.dropna()\ntrain = d[d['date'] < '2025-07-01']\ntest = d[d['date'] >= '2025-07-01']\nmodel = LinearRegression().fit(train[H], train['sales'])\nmae_h7 = np.abs(test['sales'] - model.predict(test[H])).mean()\nmae_snaive = np.abs(test['sales'] - test['h_lag7']).mean()\nprint(round(mae_h7, 2), round(mae_snaive, 2))",
   "hints": [
    "<code>df['h_roll7'] = df['sales'].shift(7).rolling(7).mean()</code>",
    "<code>mae_snaive = np.abs(test['sales'] - test['h_lag7']).mean()</code>"
   ],
   "check": {
    "tests": "_d = pd.read_csv('sales_daily.csv', parse_dates=['date'])\nfrom sklearn.linear_model import LinearRegression as _LR\n_s = _d['sales']\nassert abs(df.loc[30, 'h_roll7'] - _s.iloc[17:24].mean()) < 1e-9, \"h_roll7 соңғы 7 күнді қамтымауы керек: df['sales'].shift(7).rolling(7).mean()\"\nassert abs(df.loc[30, 'h_lag7'] - _s.iloc[23]) < 1e-9 and abs(df.loc[30, 'h_lag14'] - _s.iloc[16]) < 1e-9, \"h_lag7 = shift(7), h_lag14 = shift(14)\"\n_d['h_lag7'] = _s.shift(7); _d['h_lag14'] = _s.shift(14); _d['h_roll7'] = _s.shift(7).rolling(7).mean(); _d = _d.dropna()\n_H = ['h_lag7', 'h_lag14', 'h_roll7', 'promo']\n_tr = _d[_d['date'] < '2025-07-01']; _te = _d[_d['date'] >= '2025-07-01']\n_a = (_te['sales'] - _LR().fit(_tr[_H], _tr['sales']).predict(_te[_H])).abs().mean()\n_b = (_te['sales'] - _te['h_lag7']).abs().mean()\nassert abs(mae_h7 - _a) < 1e-6, f\"mae_h7 ≈ {_a:.2f} болуы керек\"\nassert abs(mae_snaive - _b) < 1e-9, f\"mae_snaive ≈ {_b:.2f} болуы керек: test жолдарындағы |sales − h_lag7|\""
   }
  }
 ],
 "mp-gbm": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Category типі",
   "prompt": "<p><code>X</code>-тегі <code>city</code> мен <code>plan</code> бағандарын pandas-тың <code>category</code> типіне айналдырыңыз. Қала категорияларының санын <code>n_city</code>-ге, тариф категорияларының санын <code>n_plan</code>-ға жазыңыз (<code>.cat.categories</code>).</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat].copy()\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat].copy()\nfor c in cat:\n    X[c] = X[c].astype('category')\nn_city = len(X['city'].cat.categories)\nn_plan = len(X['plan'].cat.categories)\nprint(X.dtypes, n_city, n_plan)",
   "hints": [
    "<code>X[c] = X[c].astype('category')</code>",
    "<code>len(X['city'].cat.categories)</code>"
   ],
   "check": {
    "tests": "assert str(X['city'].dtype) == 'category' and str(X['plan'].dtype) == 'category', \"city мен plan category типінде болуы керек: X[c].astype('category')\"\nassert str(X['age'].dtype) != 'category', \"Сандық бағандарды өзгертпеңіз\"\nassert n_city == df['city'].nunique() and n_plan == df['plan'].nunique(), f\"n_city = {df['city'].nunique()}, n_plan = {df['plan'].nunique()} болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Параметр аудармашысы",
   "prompt": "<p>Сабақтағы сөздік бойынша <code>translate(params)</code> функциясын жазыңыз: sklearn HistGB параметрлерінің сөздігін CatBoost атауларына аударсын. <code>max_iter</code> → <code>iterations</code>, <code>max_depth</code> → <code>depth</code>, <code>l2_regularization</code> → <code>l2_leaf_reg</code>; қалған кілттер (мысалы <code>learning_rate</code>) өзгермейді. Мәндер сақталады.</p><p>Мысалы, <code>translate({'max_iter': 500, 'learning_rate': 0.05})</code> → <code>{'iterations': 500, 'learning_rate': 0.05}</code>.</p>",
   "starter": "def translate(params):\n    pass\n",
   "solution": "NAMES = {'max_iter': 'iterations', 'max_depth': 'depth', 'l2_regularization': 'l2_leaf_reg'}\n\ndef translate(params):\n    return {NAMES.get(k, k): v for k, v in params.items()}\n\nprint(translate({'max_iter': 500, 'learning_rate': 0.05}))",
   "hints": [
    "Аударма сөздігін жасаңыз, сосын <code>NAMES.get(k, k)</code>: кілт сөздікте болмаса, өзі қалады."
   ],
   "check": {
    "tests": "_r = translate({'max_iter': 500, 'learning_rate': 0.05})\nassert _r == {'iterations': 500, 'learning_rate': 0.05}, \"translate({'max_iter': 500, 'learning_rate': 0.05}) → {'iterations': 500, 'learning_rate': 0.05}\"\nassert translate({'max_depth': 4, 'l2_regularization': 3}) == {'depth': 4, 'l2_leaf_reg': 3}, \"max_depth → depth, l2_regularization → l2_leaf_reg\"\nassert translate({}) == {}, \"Бос сөздік → бос сөздік\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бірінші HistGB",
   "prompt": "<p>Сандық бағандарда (<code>X_train[num]</code>) <code>model = HistGradientBoostingClassifier(max_iter=100, learning_rate=0.1, max_depth=3, early_stopping=False, random_state=0)</code> үйретіңіз. Нақты ағаш санын <code>n_trees</code>-ке (<code>n_iter_</code>), test ROC AUC-ін <code>auc</code>-қа жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import HistGradientBoostingClassifier\nfrom sklearn.metrics import roc_auc_score\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat].copy()\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import HistGradientBoostingClassifier\nfrom sklearn.metrics import roc_auc_score\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat].copy()\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nmodel = HistGradientBoostingClassifier(max_iter=100, learning_rate=0.1, max_depth=3, early_stopping=False, random_state=0).fit(X_train[num], y_train)\nn_trees = model.n_iter_\nauc = roc_auc_score(y_test, model.predict_proba(X_test[num])[:, 1])\nprint(n_trees, round(auc, 3))",
   "hints": [
    "<code>model.fit(X_train[num], y_train)</code>",
    "<code>roc_auc_score(y_test, model.predict_proba(X_test[num])[:, 1])</code>"
   ],
   "check": {
    "tests": "from sklearn.model_selection import train_test_split as _tts\nfrom sklearn.ensemble import HistGradientBoostingClassifier as _H\nfrom sklearn.metrics import roc_auc_score as _ras\n_df = pd.read_csv('churn.csv')\n_num = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_df[_num], _df['churned'], test_size=0.25, random_state=0, stratify=_df['churned'])\n_m = _H(max_iter=100, learning_rate=0.1, max_depth=3, early_stopping=False, random_state=0).fit(_Xtr, _ytr)\n_a = _ras(_yte, _m.predict_proba(_Xte)[:, 1])\nassert n_trees == 100, f\"Early stopping-сіз 100 ағаш өседі, сізде {n_trees}\"\nassert abs(auc - _a) < 1e-6, f\"auc ≈ {_a:.3f} болуы керек: параметрлерді және random_state=0 тексеріңіз\"",
    "mustInclude": [
     "HistGradientBoostingClassifier("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "learning_rate және ағаш саны",
   "prompt": "<p>Әр <code>lr</code> ∈ <code>[0.03, 0.1, 0.3]</code> үшін сандық бағандарда <code>HistGradientBoostingClassifier(max_iter=500, learning_rate=lr, max_depth=3, early_stopping=True, validation_fraction=0.2, n_iter_no_change=10, random_state=0)</code> үйретіңіз. Early stopping тапқан ағаш санын <code>iters[lr]</code>-ге, test ROC AUC-ін <code>aucs[lr]</code>-ге жазыңыз. Қадам кішірейсе, ағаш саны қалай өзгереді?</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import HistGradientBoostingClassifier\nfrom sklearn.metrics import roc_auc_score\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat].copy()\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\niters = {}\naucs = {}\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import HistGradientBoostingClassifier\nfrom sklearn.metrics import roc_auc_score\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat].copy()\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\niters = {}\naucs = {}\nfor lr in [0.03, 0.1, 0.3]:\n    m = HistGradientBoostingClassifier(max_iter=500, learning_rate=lr, max_depth=3, early_stopping=True, validation_fraction=0.2, n_iter_no_change=10, random_state=0).fit(X_train[num], y_train)\n    iters[lr] = m.n_iter_\n    aucs[lr] = roc_auc_score(y_test, m.predict_proba(X_test[num])[:, 1])\nprint(iters, aucs)",
   "hints": [
    "Цикл: <code>for lr in [0.03, 0.1, 0.3]:</code>, ішінде модель және <code>iters[lr] = m.n_iter_</code>"
   ],
   "check": {
    "tests": "from sklearn.model_selection import train_test_split as _tts\nfrom sklearn.ensemble import HistGradientBoostingClassifier as _H\nfrom sklearn.metrics import roc_auc_score as _ras\n_df = pd.read_csv('churn.csv')\n_num = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_df[_num], _df['churned'], test_size=0.25, random_state=0, stratify=_df['churned'])\n_ms = {lr: _H(max_iter=500, learning_rate=lr, max_depth=3, early_stopping=True, validation_fraction=0.2, n_iter_no_change=10, random_state=0).fit(_Xtr, _ytr) for lr in [0.03, 0.1, 0.3]}\nassert sorted(iters) == [0.03, 0.1, 0.3] and sorted(aucs) == [0.03, 0.1, 0.3], \"Кілттер: 0.03, 0.1, 0.3\"\nassert all(iters[lr] == _ms[lr].n_iter_ for lr in _ms), f\"iters мәндері {[_ms[k].n_iter_ for k in _ms]} болуы керек: max_iter=500, early_stopping=True, validation_fraction=0.2, n_iter_no_change=10\"\nassert all(abs(aucs[lr] - _ras(_yte, _ms[lr].predict_proba(_Xte)[:, 1])) < 1e-6 for lr in _ms), \"Test AUC сәйкес емес\"\nassert iters[0.03] > iters[0.3], \"Кіші қадаммен көбірек ағаш керек\"",
    "mustInclude": [
     "early_stopping=True"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "NaN-ды толтырмай",
   "prompt": "<p>Churn-де <code>age</code> мен <code>data_gb</code>-да бос мәндер бар. <code>n_nan</code> — <code>X_train[num]</code>-дағы барлық NaN саны (int). Екі модель үйретіңіз, екеуі де <code>HistGradientBoostingClassifier(max_iter=100, learning_rate=0.1, max_depth=3, early_stopping=False, random_state=0)</code>:</p><ul><li><code>raw</code> — <code>X_train[num]</code>-де тікелей (NaN-мен), test AUC → <code>auc_raw</code>;</li><li><code>filled</code> — NaN train медианасымен толтырылған деректе: <code>med = X_train[num].median()</code>, <code>X_train[num].fillna(med)</code> және <code>X_test[num].fillna(med)</code>; test AUC → <code>auc_filled</code>.</li></ul>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import HistGradientBoostingClassifier\nfrom sklearn.metrics import roc_auc_score\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat].copy()\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import HistGradientBoostingClassifier\nfrom sklearn.metrics import roc_auc_score\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat].copy()\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nn_nan = int(X_train[num].isna().sum().sum())\nraw = HistGradientBoostingClassifier(max_iter=100, learning_rate=0.1, max_depth=3, early_stopping=False, random_state=0).fit(X_train[num], y_train)\nauc_raw = roc_auc_score(y_test, raw.predict_proba(X_test[num])[:, 1])\nmed = X_train[num].median()\nfilled = HistGradientBoostingClassifier(max_iter=100, learning_rate=0.1, max_depth=3, early_stopping=False, random_state=0).fit(X_train[num].fillna(med), y_train)\nauc_filled = roc_auc_score(y_test, filled.predict_proba(X_test[num].fillna(med))[:, 1])\nprint(n_nan, round(auc_raw, 3), round(auc_filled, 3))",
   "hints": [
    "<code>X_train[num].isna().sum().sum()</code> — алдымен бағандар, сосын жалпы",
    "Медиана тек train-нен: <code>med = X_train[num].median()</code>"
   ],
   "check": {
    "tests": "from sklearn.model_selection import train_test_split as _tts\nfrom sklearn.ensemble import HistGradientBoostingClassifier as _H\nfrom sklearn.metrics import roc_auc_score as _ras\n_df = pd.read_csv('churn.csv')\n_num = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_df[_num], _df['churned'], test_size=0.25, random_state=0, stratify=_df['churned'])\n_med = _Xtr.median()\n_a = _ras(_yte, _H(max_iter=100, learning_rate=0.1, max_depth=3, early_stopping=False, random_state=0).fit(_Xtr, _ytr).predict_proba(_Xte)[:, 1])\n_b = _ras(_yte, _H(max_iter=100, learning_rate=0.1, max_depth=3, early_stopping=False, random_state=0).fit(_Xtr.fillna(_med), _ytr).predict_proba(_Xte.fillna(_med))[:, 1])\nassert n_nan == int(_Xtr.isna().sum().sum()), f\"n_nan = {int(_Xtr.isna().sum().sum())} болуы керек\"\nassert abs(auc_raw - _a) < 1e-6, f\"auc_raw ≈ {_a:.3f} болуы керек: модель NaN-ды өзі өңдейді\"\nassert abs(auc_filled - _b) < 1e-6, f\"auc_filled ≈ {_b:.3f} болуы керек: test-ті де train медианасымен толтырыңыз\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "L2 регуляризация",
   "prompt": "<p>Әр <code>l2</code> ∈ <code>[0, 1, 10]</code> үшін сандық бағандарда <code>HistGradientBoostingClassifier(max_iter=200, learning_rate=0.1, max_depth=3, l2_regularization=l2, early_stopping=False, random_state=0)</code> үйретіп, test ROC AUC-ін <code>auc_l2[l2]</code>-ге жазыңыз. AUC ең жоғары мәнді <code>best_l2</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import HistGradientBoostingClassifier\nfrom sklearn.metrics import roc_auc_score\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat].copy()\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nauc_l2 = {}\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import HistGradientBoostingClassifier\nfrom sklearn.metrics import roc_auc_score\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat].copy()\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nauc_l2 = {}\nfor l2 in [0, 1, 10]:\n    m = HistGradientBoostingClassifier(max_iter=200, learning_rate=0.1, max_depth=3, l2_regularization=l2, early_stopping=False, random_state=0).fit(X_train[num], y_train)\n    auc_l2[l2] = roc_auc_score(y_test, m.predict_proba(X_test[num])[:, 1])\nbest_l2 = max(auc_l2, key=auc_l2.get)\nprint(auc_l2, best_l2)",
   "hints": [
    "<code>l2_regularization=l2</code> — sklearn-дегі L2 айыппұлы (XGBoost-та <code>reg_lambda</code>)",
    "<code>max(auc_l2, key=auc_l2.get)</code>"
   ],
   "check": {
    "tests": "from sklearn.model_selection import train_test_split as _tts\nfrom sklearn.ensemble import HistGradientBoostingClassifier as _H\nfrom sklearn.metrics import roc_auc_score as _ras\n_df = pd.read_csv('churn.csv')\n_num = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_df[_num], _df['churned'], test_size=0.25, random_state=0, stratify=_df['churned'])\n_a = {l2: _ras(_yte, _H(max_iter=200, learning_rate=0.1, max_depth=3, l2_regularization=l2, early_stopping=False, random_state=0).fit(_Xtr, _ytr).predict_proba(_Xte)[:, 1]) for l2 in [0, 1, 10]}\nassert sorted(auc_l2) == [0, 1, 10], \"auc_l2 кілттері: 0, 1, 10\"\nassert all(abs(auc_l2[k] - _a[k]) < 1e-6 for k in _a), \"AUC мәндері сәйкес емес: max_iter=200, l2_regularization=l2, early_stopping=False, random_state=0\"\nassert best_l2 == max(_a, key=_a.get), f\"best_l2 = {max(_a, key=_a.get)} болуы керек\"",
    "mustInclude": [
     "l2_regularization="
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ағаш санын validation-мен таңдау",
   "prompt": "<p>Early stopping-ті қолмен жасаңыз. Train-ді тағы бөліңіз: <code>X_tr, X_val, y_tr, y_val = train_test_split(X_train[num], y_train, test_size=0.25, random_state=0, stratify=y_train)</code>. Әр <code>n</code> ∈ <code>[10, 25, 50, 100, 200]</code> үшін <code>HistGradientBoostingClassifier(max_iter=n, learning_rate=0.1, max_depth=3, early_stopping=False, random_state=0)</code>-ды <code>X_tr</code>-да үйретіп, <b>validation</b> AUC-ін <code>val_auc[n]</code>-ге жазыңыз. Ең жақсы <code>n</code> → <code>best_n</code>. Сол модельдің test AUC-ін бір рет есептеп, <code>test_auc</code>-қа жазыңыз.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import HistGradientBoostingClassifier\nfrom sklearn.metrics import roc_auc_score\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat].copy()\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nval_auc = {}\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import HistGradientBoostingClassifier\nfrom sklearn.metrics import roc_auc_score\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat].copy()\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nval_auc = {}\nX_tr, X_val, y_tr, y_val = train_test_split(X_train[num], y_train, test_size=0.25, random_state=0, stratify=y_train)\nmodels = {}\nfor n in [10, 25, 50, 100, 200]:\n    models[n] = HistGradientBoostingClassifier(max_iter=n, learning_rate=0.1, max_depth=3, early_stopping=False, random_state=0).fit(X_tr, y_tr)\n    val_auc[n] = roc_auc_score(y_val, models[n].predict_proba(X_val)[:, 1])\nbest_n = max(val_auc, key=val_auc.get)\ntest_auc = roc_auc_score(y_test, models[best_n].predict_proba(X_test[num])[:, 1])\nprint(val_auc, best_n, round(test_auc, 3))",
   "hints": [
    "Модельдерді сөздікке сақтаңыз: <code>models[n] = ...fit(X_tr, y_tr)</code>",
    "<code>val_auc[n] = roc_auc_score(y_val, models[n].predict_proba(X_val)[:, 1])</code>",
    "Test-ке тек <code>best_n</code> модельмен, бір рет қараймыз."
   ],
   "check": {
    "tests": "from sklearn.model_selection import train_test_split as _tts\nfrom sklearn.ensemble import HistGradientBoostingClassifier as _H\nfrom sklearn.metrics import roc_auc_score as _ras\n_df = pd.read_csv('churn.csv')\n_num = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_df[_num], _df['churned'], test_size=0.25, random_state=0, stratify=_df['churned'])\n_a, _v, _b, _w = _tts(_Xtr, _ytr, test_size=0.25, random_state=0, stratify=_ytr)\n_ms = {n: _H(max_iter=n, learning_rate=0.1, max_depth=3, early_stopping=False, random_state=0).fit(_a, _b) for n in [10, 25, 50, 100, 200]}\n_va = {n: _ras(_w, m.predict_proba(_v)[:, 1]) for n, m in _ms.items()}\n_bn = max(_va, key=_va.get)\nassert len(X_tr) == len(_a) and len(X_val) == len(_v), f\"X_tr {len(_a)} жол, X_val {len(_v)} жол болуы керек: X_train[num]-ді test_size=0.25-пен бөліңіз\"\nassert sorted(val_auc) == [10, 25, 50, 100, 200] and all(abs(val_auc[n] - _va[n]) < 1e-6 for n in _va), \"val_auc сәйкес емес: модель X_tr-да үйретіледі, X_val-да бағаланады\"\nassert best_n == _bn, f\"best_n = {_bn} болуы керек: validation AUC ең жоғары\"\nassert abs(test_auc - _ras(_yte, _ms[_bn].predict_proba(_Xte)[:, 1])) < 1e-6, \"test_auc — best_n модельдің X_test[num]-дағы AUC-і\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Категория ме, сан коды ма",
   "prompt": "<p><code>X</code>-те <code>city</code> мен <code>plan</code> category типінде. Екінші кесте <code>X_codes</code> жасаңыз: <code>X.copy()</code>, онда екі бағанды <code>X[c].cat.codes</code>-пен сандарға (0, 1, 2…) айналдырыңыз — бұл «жалған рет». Екеуін де <code>train_test_split(..., y, test_size=0.25, random_state=0, stratify=y)</code>-пен бөліңіз. Екі модель, параметрлері <code>max_iter=100, learning_rate=0.1, max_depth=3, early_stopping=False, random_state=0</code>:</p><ul><li><code>native</code> — <code>categorical_features='from_dtype'</code>, <code>X</code>-те; test AUC → <code>auc_native</code>;</li><li><code>codes</code> — <code>X_codes</code>-та (бәрі сандық); test AUC → <code>auc_codes</code>.</li></ul><p>Айырма үлкен бе? Мұнда қала мен тариф аз (4–5 мән), сондықтан айырма шағын; категория жүздеген болғанда native тәсіл әдетте айқын жеңеді.</p>",
   "starter": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import HistGradientBoostingClassifier\nfrom sklearn.metrics import roc_auc_score\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat].copy()\nfor c in cat:\n    X[c] = X[c].astype('category')\ny = df['churned']\n",
   "solution": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import HistGradientBoostingClassifier\nfrom sklearn.metrics import roc_auc_score\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat].copy()\nfor c in cat:\n    X[c] = X[c].astype('category')\ny = df['churned']\nX_codes = X.copy()\nfor c in cat:\n    X_codes[c] = X[c].cat.codes\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\nC_train, C_test, _, _ = train_test_split(X_codes, y, test_size=0.25, random_state=0, stratify=y)\nnative = HistGradientBoostingClassifier(categorical_features='from_dtype', max_iter=100, learning_rate=0.1, max_depth=3, early_stopping=False, random_state=0).fit(X_train, y_train)\ncodes = HistGradientBoostingClassifier(max_iter=100, learning_rate=0.1, max_depth=3, early_stopping=False, random_state=0).fit(C_train, y_train)\nauc_native = roc_auc_score(y_test, native.predict_proba(X_test)[:, 1])\nauc_codes = roc_auc_score(y_test, codes.predict_proba(C_test)[:, 1])\nprint(round(auc_native, 3), round(auc_codes, 3))",
   "hints": [
    "<code>X_codes[c] = X[c].cat.codes</code>",
    "Бірдей <code>random_state=0</code> мен <code>stratify=y</code> екі бөлуде де бірдей жолдарды береді."
   ],
   "check": {
    "tests": "from sklearn.model_selection import train_test_split as _tts\nfrom sklearn.ensemble import HistGradientBoostingClassifier as _H\nfrom sklearn.metrics import roc_auc_score as _ras\nassert str(X_codes['city'].dtype) != 'category' and int(X_codes['city'].max()) == X['city'].cat.categories.size - 1, \"X_codes-та city сан болуы керек: X[c].cat.codes\"\n_xa, _xb, _ya, _yb = _tts(X, y, test_size=0.25, random_state=0, stratify=y)\n_ca, _cb, _, _ = _tts(X_codes, y, test_size=0.25, random_state=0, stratify=y)\n_n = _ras(_yb, _H(categorical_features='from_dtype', max_iter=100, learning_rate=0.1, max_depth=3, early_stopping=False, random_state=0).fit(_xa, _ya).predict_proba(_xb)[:, 1])\n_k = _ras(_yb, _H(max_iter=100, learning_rate=0.1, max_depth=3, early_stopping=False, random_state=0).fit(_ca, _ya).predict_proba(_cb)[:, 1])\nassert abs(auc_native - _n) < 1e-6, f\"auc_native ≈ {_n:.3f} болуы керек: categorical_features='from_dtype'\"\nassert abs(auc_codes - _k) < 1e-6, f\"auc_codes ≈ {_k:.3f} болуы керек: X_codes-та, сол параметрлермен\"",
    "mustInclude": [
     "cat.codes",
     "from_dtype"
    ]
   }
  }
 ],
 "mp-pca": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қайталанатын ақпарат",
   "prompt": "<p>Белгілер арасындағы корреляция PCA-ның пайдасын көрсетеді. <code>r_size</code> — <code>rooms</code> мен <code>area_m2</code> корреляциясы, <code>r_height</code> — <code>floor</code> мен <code>floors_total</code> корреляциясы (<code>.corr()</code>).</p>",
   "starter": "import pandas as pd\nflats = pd.read_csv('flats.csv')\n",
   "solution": "import pandas as pd\nflats = pd.read_csv('flats.csv')\nr_size = flats['rooms'].corr(flats['area_m2'])\nr_height = flats['floor'].corr(flats['floors_total'])\nprint(round(r_size, 3), round(r_height, 3))",
   "hints": [
    "<code>flats['rooms'].corr(flats['area_m2'])</code>"
   ],
   "check": {
    "tests": "_r1 = flats['rooms'].corr(flats['area_m2']); _r2 = flats['floor'].corr(flats['floors_total'])\nassert abs(r_size - _r1) < 1e-9, f\"r_size ≈ {_r1:.3f} болуы керек\"\nassert abs(r_height - _r2) < 1e-9, f\"r_height ≈ {_r2:.3f} болуы керек: floor пен floors_total\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Сақталған дисперсия үлесі",
   "prompt": "<p><code>kept_share(variances, k)</code> функциясын жазыңыз: компоненттердің дисперсиялары (кему ретімен) берілген, алғашқы <code>k</code> компонент жалпы дисперсияның қандай үлесін сақтайтынын қайтарсын.</p><p>Мысалы, <code>kept_share([6, 3, 1], 2)</code> → <code>0.9</code>.</p>",
   "starter": "def kept_share(variances, k):\n    pass\n",
   "solution": "def kept_share(variances, k):\n    return sum(variances[:k]) / sum(variances)\n\nprint(kept_share([6, 3, 1], 2))",
   "hints": [
    "<code>sum(variances[:k]) / sum(variances)</code>"
   ],
   "check": {
    "tests": "assert kept_share([6, 3, 1], 2) is not None and abs(kept_share([6, 3, 1], 2) - 0.9) < 1e-9, \"kept_share([6, 3, 1], 2) = 9 / 10 = 0.9 болуы керек\"\nassert abs(kept_share([4, 4, 2], 1) - 0.4) < 1e-9, \"kept_share([4, 4, 2], 1) = 0.4 болуы керек\"\nassert abs(kept_share([5, 3, 2], 3) - 1) < 1e-9, \"Барлық компонент — 100%\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "95% үшін компонент саны",
   "prompt": "<p><code>Xs</code> (масштабталған 5 белгі) дайын. <code>PCA(n_components=0.95)</code>-ті <code>pca</code> атымен үйретіңіз: ол дисперсияның кемінде 95%-ын сақтайтын компонент санын өзі таңдайды. Таңдалған санды <code>n95</code>-ке (<code>pca.n_components_</code>), сақталған үлесті <code>kept</code>-ке жазыңыз.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.decomposition import PCA\nflats = pd.read_csv('flats.csv')\nnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\nX = flats[num]\nXs = StandardScaler().fit_transform(X)\n",
   "solution": "import pandas as pd\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.decomposition import PCA\nflats = pd.read_csv('flats.csv')\nnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\nX = flats[num]\nXs = StandardScaler().fit_transform(X)\npca = PCA(n_components=0.95).fit(Xs)\nn95 = pca.n_components_\nkept = pca.explained_variance_ratio_.sum()\nprint(n95, round(kept, 3))",
   "hints": [
    "<code>pca = PCA(n_components=0.95).fit(Xs)</code>",
    "<code>kept = pca.explained_variance_ratio_.sum()</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.decomposition import PCA as _PCA\n_X = pd.read_csv('flats.csv')[['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']]\n_Xs = _SS().fit_transform(_X)\n_c = _np.cumsum(_PCA().fit(_Xs).explained_variance_ratio_); _n = int(_np.argmax(_c >= 0.95)) + 1\nassert n95 == _n, f\"n95 = {_n} болуы керек: PCA(n_components=0.95), масштабталған Xs-те\"\nassert abs(kept - _c[_n - 1]) < 1e-6 and kept >= 0.95, f\"kept ≈ {_c[_n - 1]:.3f}: explained_variance_ratio_.sum()\"",
    "mustInclude": [
     "PCA("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Компоненттердің рецепті",
   "prompt": "<p><code>PCA(n_components=2)</code>-ні <code>Xs</code>-те үйретіңіз. Салмақтарды <code>loadings</code> DataFrame-іне жазыңыз: индексі <code>['PC1', 'PC2']</code>, бағандары — <code>num</code> (<code>pca.components_</code>). Әр компонентте модулі ең үлкен белгінің атын <code>top_pc1</code>, <code>top_pc2</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.decomposition import PCA\nflats = pd.read_csv('flats.csv')\nnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\nX = flats[num]\nXs = StandardScaler().fit_transform(X)\n",
   "solution": "import pandas as pd\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.decomposition import PCA\nflats = pd.read_csv('flats.csv')\nnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\nX = flats[num]\nXs = StandardScaler().fit_transform(X)\npca = PCA(n_components=2).fit(Xs)\nloadings = pd.DataFrame(pca.components_, index=['PC1', 'PC2'], columns=num)\ntop_pc1 = loadings.loc['PC1'].abs().idxmax()\ntop_pc2 = loadings.loc['PC2'].abs().idxmax()\nprint(loadings.round(2), top_pc1, top_pc2)",
   "hints": [
    "<code>pd.DataFrame(pca.components_, index=['PC1', 'PC2'], columns=num)</code>",
    "Таңба маңызды емес: <code>loadings.loc['PC1'].abs().idxmax()</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.decomposition import PCA as _PCA\n_X = pd.read_csv('flats.csv')[['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']]\n_Xs = _SS().fit_transform(_X)\n_L = pd.DataFrame(_PCA(n_components=2).fit(_Xs).components_, index=['PC1', 'PC2'], columns=list(_X.columns))\nassert isinstance(loadings, pd.DataFrame) and loadings.shape == (2, 5) and list(loadings.index) == ['PC1', 'PC2'], \"loadings — 2 × 5 DataFrame, индексі ['PC1', 'PC2']\"\nassert _np.allclose(_np.abs(loadings[list(_X.columns)].values), _np.abs(_L.values), atol=1e-6), \"Салмақтар сәйкес емес: PCA(n_components=2), масштабталған Xs-те\"\nassert top_pc1 == _L.loc['PC1'].abs().idxmax() and top_pc2 == _L.loc['PC2'].abs().idxmax(), f\"top_pc1 = {_L.loc['PC1'].abs().idxmax()}, top_pc2 = {_L.loc['PC2'].abs().idxmax()} болуы керек\"",
    "mustInclude": [
     "components_"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Масштабсыз PCA",
   "prompt": "<p>Масштабтау неге міндетті екенін көрсетіңіз. <code>PCA(n_components=1)</code>-ді екі рет үйретіңіз: шикі <code>X</code>-те және масштабталған <code>Xs</code>-те. PC1 салмақтарының модульдерін <code>w_raw</code> және <code>w_scaled</code> Series-іне жазыңыз (индексі — <code>num</code>). <code>raw_top</code> — шикі деректе салмағы ең үлкен белгі, <code>raw_evr</code> — шикі деректегі PC1-дің дисперсия үлесі.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.decomposition import PCA\nflats = pd.read_csv('flats.csv')\nnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\nX = flats[num]\nXs = StandardScaler().fit_transform(X)\n",
   "solution": "import pandas as pd\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.decomposition import PCA\nflats = pd.read_csv('flats.csv')\nnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\nX = flats[num]\nXs = StandardScaler().fit_transform(X)\np_raw = PCA(n_components=1).fit(X)\np_sc = PCA(n_components=1).fit(Xs)\nw_raw = pd.Series(np.abs(p_raw.components_[0]), index=num)\nw_scaled = pd.Series(np.abs(p_sc.components_[0]), index=num)\nraw_top = w_raw.idxmax()\nraw_evr = p_raw.explained_variance_ratio_[0]\nprint(w_raw.round(2), w_scaled.round(2), raw_top, round(raw_evr, 3))",
   "hints": [
    "<code>pd.Series(np.abs(p_raw.components_[0]), index=num)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.decomposition import PCA as _PCA\n_X = pd.read_csv('flats.csv')[['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']]\n_Xs = _SS().fit_transform(_X)\n_pr = _PCA(n_components=1).fit(_X); _ps = _PCA(n_components=1).fit(_Xs)\n_wr = pd.Series(_np.abs(_pr.components_[0]), index=list(_X.columns)); _ws = pd.Series(_np.abs(_ps.components_[0]), index=list(_X.columns))\nassert _np.allclose(_np.asarray(w_raw, dtype=float), _wr.values, atol=1e-6), \"w_raw сәйкес емес: шикі X-те PCA(n_components=1), components_[0] модулі\"\nassert _np.allclose(_np.asarray(w_scaled, dtype=float), _ws.values, atol=1e-6), \"w_scaled сәйкес емес: масштабталған Xs-те\"\nassert raw_top == 'area_m2', \"Шикі деректе PC1 іс жүзінде area_m2: raw_top = w_raw.idxmax()\"\nassert abs(raw_evr - _pr.explained_variance_ratio_[0]) < 1e-6, f\"raw_evr ≈ {_pr.explained_variance_ratio_[0]:.3f} болуы керек\"",
    "mustInclude": [
     "PCA("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "PCA + KMeans",
   "prompt": "<p>PCA-ны визуализацияға дайындық ретінде қолданыңыз. <code>X2 = PCA(n_components=2).fit_transform(Xs)</code>. <code>km = KMeans(n_clusters=3, n_init=10, random_state=0)</code>-ды <code>X2</code>-де үйретіп, белгілерді <code>labels</code>-ке жазыңыз. Кластер өлшемдерін өсу ретімен <code>sizes</code> тізіміне жазыңыз.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.decomposition import PCA\nflats = pd.read_csv('flats.csv')\nnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\nX = flats[num]\nXs = StandardScaler().fit_transform(X)\nfrom sklearn.cluster import KMeans\n",
   "solution": "import pandas as pd\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.decomposition import PCA\nflats = pd.read_csv('flats.csv')\nnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\nX = flats[num]\nXs = StandardScaler().fit_transform(X)\nfrom sklearn.cluster import KMeans\nX2 = PCA(n_components=2).fit_transform(Xs)\nkm = KMeans(n_clusters=3, n_init=10, random_state=0).fit(X2)\nlabels = km.labels_\nsizes = sorted(int(v) for v in np.bincount(labels))\nprint(X2.shape, sizes)",
   "hints": [
    "<code>km.labels_</code> — әр пәтердің кластері",
    "Өлшемдер: <code>sorted(np.bincount(labels))</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.decomposition import PCA as _PCA\n_X = pd.read_csv('flats.csv')[['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']]\n_Xs = _SS().fit_transform(_X)\nfrom sklearn.cluster import KMeans as _KM\n_X2 = _PCA(n_components=2).fit_transform(_Xs)\n_sz = sorted(int(v) for v in _np.bincount(_KM(n_clusters=3, n_init=10, random_state=0).fit(_X2).labels_))\nassert _np.asarray(X2).shape == (400, 2), \"X2 — 400 × 2: PCA(n_components=2).fit_transform(Xs)\"\nassert len(labels) == 400 and len(set(labels)) == 3, \"labels — 400 мән, 3 кластер\"\nassert list(sizes) == _sz, f\"sizes = {_sz} болуы керек: KMeans(n_clusters=3, n_init=10, random_state=0), X2-де\"",
    "mustInclude": [
     "KMeans("
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Компонент саны мен сапа",
   "prompt": "<p>Қысудың бағасын өлшеңіз. Әр <code>k</code> = 1, 2, 3, 4, 5 үшін <code>make_pipeline(StandardScaler(), PCA(n_components=k), LinearRegression())</code>-ның 5-fold CV орташа R²-ын <code>cv_r2[k]</code>-ға жазыңыз. Ең жақсы <code>k</code> → <code>best_k</code>. 5 компоненттен 2-ге өткенде R² қаншаға түседі: <code>drop_2 = cv_r2[5] - cv_r2[2]</code>.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.decomposition import PCA\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import cross_val_score\nflats = pd.read_csv('flats.csv')\nnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\nX = flats[num]\ny = flats['price_mln']\ncv_r2 = {}\n",
   "solution": "import pandas as pd\nimport numpy as np\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.decomposition import PCA\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import cross_val_score\nflats = pd.read_csv('flats.csv')\nnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\nX = flats[num]\ny = flats['price_mln']\ncv_r2 = {}\nfor k in range(1, 6):\n    pipe = make_pipeline(StandardScaler(), PCA(n_components=k), LinearRegression())\n    cv_r2[k] = cross_val_score(pipe, X, y, cv=5).mean()\nbest_k = max(cv_r2, key=cv_r2.get)\ndrop_2 = cv_r2[5] - cv_r2[2]\nprint({k: round(v, 3) for k, v in cv_r2.items()}, best_k, round(drop_2, 3))",
   "hints": [
    "Pipeline ішіндегі PCA әр fold-та тек train бөлігінде fit етіледі — leakage жоқ.",
    "<code>cross_val_score(pipe, X, y, cv=5).mean()</code>"
   ],
   "check": {
    "tests": "from sklearn.pipeline import make_pipeline as _mp\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.decomposition import PCA as _PCA\nfrom sklearn.linear_model import LinearRegression as _LR\nfrom sklearn.model_selection import cross_val_score as _cvs\n_r = {k: _cvs(_mp(_SS(), _PCA(n_components=k), _LR()), X, y, cv=5).mean() for k in range(1, 6)}\nassert sorted(cv_r2) == [1, 2, 3, 4, 5], \"cv_r2 кілттері: 1, 2, 3, 4, 5\"\nassert all(abs(cv_r2[k] - _r[k]) < 1e-6 for k in _r), \"CV R² сәйкес емес: StandardScaler → PCA(n_components=k) → LinearRegression, cv=5\"\nassert best_k == max(_r, key=_r.get), f\"best_k = {max(_r, key=_r.get)} болуы керек\"\nassert abs(drop_2 - (_r[5] - _r[2])) < 1e-6, \"drop_2 = cv_r2[5] - cv_r2[2]\"",
    "mustInclude": [
     "PCA("
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "PCA тек train-де",
   "prompt": "<p>Бөлу дайын. <code>pipe = make_pipeline(StandardScaler(), PCA(n_components=3), LinearRegression())</code>-ды тек train-де үйретіп, test R²-ын <code>test_r2</code>-ге жазыңыз. Pipeline ішіндегі PCA-ның дисперсия үлестерін <code>evr3</code>-ке (<code>pipe.named_steps['pca']</code>), test деректің PCA кеңістігіндегі көрінісін <code>Z_test</code>-ке жазыңыз (алғашқы екі қадамның <code>transform</code>-ы: <code>pipe[:-1].transform(X_test)</code>).</p>",
   "starter": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.decomposition import PCA\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\nX_train, X_test, y_train, y_test = train_test_split(flats[num], flats['price_mln'], test_size=0.25, random_state=0)\n",
   "solution": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.decomposition import PCA\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\nnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\nX_train, X_test, y_train, y_test = train_test_split(flats[num], flats['price_mln'], test_size=0.25, random_state=0)\npipe = make_pipeline(StandardScaler(), PCA(n_components=3), LinearRegression()).fit(X_train, y_train)\ntest_r2 = pipe.score(X_test, y_test)\nevr3 = pipe.named_steps['pca'].explained_variance_ratio_\nZ_test = pipe[:-1].transform(X_test)\nprint(round(test_r2, 3), evr3.round(3), Z_test.shape)",
   "hints": [
    "<code>make_pipeline</code> қадамдарды кіші әріппен атайды: <code>'standardscaler'</code>, <code>'pca'</code>, <code>'linearregression'</code>.",
    "<code>pipe[:-1]</code> — соңғы модельсіз Pipeline: scaler + PCA."
   ],
   "check": {
    "tests": "import numpy as _np\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.decomposition import PCA as _PCA\nfrom sklearn.linear_model import LinearRegression as _LR\n_sc = _SS().fit(X_train); _p = _PCA(n_components=3).fit(_sc.transform(X_train))\n_Z = _p.transform(_sc.transform(X_test))\n_r2 = _LR().fit(_p.transform(_sc.transform(X_train)), y_train).score(_Z, y_test)\nassert _np.allclose(pipe.named_steps['standardscaler'].mean_, X_train.mean().values), \"Scaler тек train-де fit етілуі керек\"\nassert _np.allclose(evr3, _p.explained_variance_ratio_, atol=1e-6), f\"evr3 ≈ {_p.explained_variance_ratio_.round(3)} болуы керек: PCA train-де fit етіледі\"\nassert _np.asarray(Z_test).shape == (100, 3) and _np.allclose(_np.abs(_np.asarray(Z_test)), _np.abs(_Z), atol=1e-6), \"Z_test — 100 × 3: pipe[:-1].transform(X_test) (test-те fit етпейміз)\"\nassert abs(test_r2 - _r2) < 1e-6, f\"test_r2 ≈ {_r2:.3f} болуы керек\"",
    "mustInclude": [
     "PCA("
    ]
   }
  }
 ],
 "mp-text": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Пікірлерді тану",
   "prompt": "<p><code>counts</code> — тіл мен белгінің кестесі: <code>pd.crosstab(df['lang'], df['label'])</code>. <code>share_neg_kk</code> — қазақша (<code>kk</code>) пікірлердің ішіндегі <code>negative</code> үлесі.</p>",
   "starter": "import pandas as pd\ndf = pd.read_csv('reviews.csv')\n",
   "solution": "import pandas as pd\ndf = pd.read_csv('reviews.csv')\ncounts = pd.crosstab(df['lang'], df['label'])\nshare_neg_kk = counts.loc['kk', 'negative'] / counts.loc['kk'].sum()\nprint(counts, round(share_neg_kk, 3))",
   "hints": [
    "<code>counts.loc['kk', 'negative'] / counts.loc['kk'].sum()</code>"
   ],
   "check": {
    "tests": "_k = df[df['lang'] == 'kk']\nassert isinstance(counts, pd.DataFrame) and counts.shape == (2, 2) and int(counts.values.sum()) == 300, \"counts — 2 × 2 кесте, қосындысы 300: pd.crosstab(df['lang'], df['label'])\"\nassert abs(share_neg_kk - (_k['label'] == 'negative').mean()) < 1e-9, f\"share_neg_kk ≈ {(_k['label'] == 'negative').mean():.3f} болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "IDF формуласы",
   "prompt": "<p>sklearn-дегі IDF: <code>idf = ln((1 + n) / (1 + df)) + 1</code>, мұнда <code>n</code> — пікір саны, <code>df</code> — сөз кездесетін пікір саны. <code>idf(n, df_count)</code> функциясын жазыңыз.</p><p>Мысалы, <code>idf(225, 100)</code> → <code>1.805</code>.</p>",
   "starter": "import math\n\ndef idf(n, df_count):\n    pass\n",
   "solution": "import math\n\ndef idf(n, df_count):\n    return math.log((1 + n) / (1 + df_count)) + 1\n\nprint(round(idf(225, 100), 3), round(idf(225, 3), 3))",
   "hints": [
    "<code>math.log((1 + n) / (1 + df_count)) + 1</code>"
   ],
   "check": {
    "tests": "assert idf(225, 100) is not None and abs(idf(225, 100) - 1.80541) < 1e-4, \"idf(225, 100) ≈ 1.805 болуы керек\"\nassert abs(idf(225, 3) - 5.03432) < 1e-4, \"Сирек сөздің салмағы жоғары: idf(225, 3) ≈ 5.034\"\nassert abs(idf(10, 10) - 1) < 1e-9, \"Барлық пікірде кездесетін сөз: idf = 1\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "«және» сөзінің салмағы",
   "prompt": "<p><code>vec = TfidfVectorizer().fit(X_train)</code>. «және» сөзінің IDF салмағын <code>idf_jane</code>-ге жазыңыз: <code>vec.idf_</code> массивінде, позициясы <code>vec.vocabulary_['және']</code>. Салыстыру үшін ең үлкен IDF-ті <code>idf_max</code>-қа жазыңыз.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.pipeline import Pipeline\ndf = pd.read_csv('reviews.csv')\nX_train, X_test, y_train, y_test = train_test_split(df['text'], df['label'], test_size=0.25, random_state=0, stratify=df['label'])\n",
   "solution": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.pipeline import Pipeline\ndf = pd.read_csv('reviews.csv')\nX_train, X_test, y_train, y_test = train_test_split(df['text'], df['label'], test_size=0.25, random_state=0, stratify=df['label'])\nvec = TfidfVectorizer().fit(X_train)\nidf_jane = vec.idf_[vec.vocabulary_['және']]\nidf_max = vec.idf_.max()\nprint(round(idf_jane, 3), round(idf_max, 3))",
   "hints": [
    "<code>vec.idf_[vec.vocabulary_['және']]</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.feature_extraction.text import TfidfVectorizer as _TV\nfrom sklearn.linear_model import LogisticRegression as _LR\nfrom sklearn.pipeline import Pipeline as _P\n_df = pd.read_csv('reviews.csv')\n_a, _b, _c, _e = _tts(_df['text'], _df['label'], test_size=0.25, random_state=0, stratify=_df['label'])\n_v = _TV().fit(_a)\n_j = _v.idf_[_v.vocabulary_['және']]\nassert abs(idf_jane - _j) < 1e-9, f\"idf_jane ≈ {_j:.3f} болуы керек: векторизатор тек X_train-де fit етіледі\"\nassert abs(idf_max - _v.idf_.max()) < 1e-9, f\"idf_max ≈ {_v.idf_.max():.3f} болуы керек\"\nassert idf_jane < idf_max, \"Жиі сөздің салмағы сирек сөздікінен төмен\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Unigram мен bigram",
   "prompt": "<p>Екі Pipeline үйретіңіз (<code>'tfidf'</code> + <code>'clf'</code>, <code>LogisticRegression(max_iter=1000)</code>): <code>uni</code> — <code>TfidfVectorizer()</code>, <code>bi</code> — <code>TfidfVectorizer(ngram_range=(1, 2))</code>. Test accuracy-лерін <code>acc_uni</code>, <code>acc_bi</code>-ге, сөздік өлшемдерін <code>n_uni</code>, <code>n_bi</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.pipeline import Pipeline\ndf = pd.read_csv('reviews.csv')\nX_train, X_test, y_train, y_test = train_test_split(df['text'], df['label'], test_size=0.25, random_state=0, stratify=df['label'])\n",
   "solution": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.pipeline import Pipeline\ndf = pd.read_csv('reviews.csv')\nX_train, X_test, y_train, y_test = train_test_split(df['text'], df['label'], test_size=0.25, random_state=0, stratify=df['label'])\nuni = Pipeline([('tfidf', TfidfVectorizer()), ('clf', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nbi = Pipeline([('tfidf', TfidfVectorizer(ngram_range=(1, 2))), ('clf', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nacc_uni, acc_bi = uni.score(X_test, y_test), bi.score(X_test, y_test)\nn_uni, n_bi = len(uni['tfidf'].vocabulary_), len(bi['tfidf'].vocabulary_)\nprint(round(acc_uni, 3), round(acc_bi, 3), n_uni, n_bi)",
   "hints": [
    "<code>Pipeline([('tfidf', TfidfVectorizer()), ('clf', LogisticRegression(max_iter=1000))])</code>",
    "<code>len(bi['tfidf'].vocabulary_)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.feature_extraction.text import TfidfVectorizer as _TV\nfrom sklearn.linear_model import LogisticRegression as _LR\nfrom sklearn.pipeline import Pipeline as _P\n_df = pd.read_csv('reviews.csv')\n_a, _b, _c, _e = _tts(_df['text'], _df['label'], test_size=0.25, random_state=0, stratify=_df['label'])\n_u = _P([('tfidf', _TV()), ('clf', _LR(max_iter=1000))]).fit(_a, _c)\n_bm = _P([('tfidf', _TV(ngram_range=(1, 2))), ('clf', _LR(max_iter=1000))]).fit(_a, _c)\nassert n_uni == len(_u['tfidf'].vocabulary_) and n_bi == len(_bm['tfidf'].vocabulary_), f\"n_uni = {len(_u['tfidf'].vocabulary_)}, n_bi = {len(_bm['tfidf'].vocabulary_)} болуы керек\"\nassert abs(acc_uni - _u.score(_b, _e)) < 1e-9 and abs(acc_bi - _bm.score(_b, _e)) < 1e-9, f\"acc_uni ≈ {_u.score(_b, _e):.3f}, acc_bi ≈ {_bm.score(_b, _e):.3f} болуы керек\"",
    "mustInclude": [
     "ngram_range"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Шағымдарды қаншалық табамыз",
   "prompt": "<p>Шағымдар (<code>negative</code>) — бизнеске маңызды класс. Bigram Pipeline-ды (<code>Pipeline([('tfidf', TfidfVectorizer(ngram_range=(1, 2))), ('clf', LogisticRegression(max_iter=1000))])</code>) <code>model</code> атымен үйретіп, test-те <code>negative</code> класы үшін <code>prec_neg</code> және <code>rec_neg</code> есептеңіз (<code>pos_label='negative'</code>).</p>",
   "starter": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.pipeline import Pipeline\ndf = pd.read_csv('reviews.csv')\nX_train, X_test, y_train, y_test = train_test_split(df['text'], df['label'], test_size=0.25, random_state=0, stratify=df['label'])\nfrom sklearn.metrics import precision_score, recall_score\n",
   "solution": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.pipeline import Pipeline\ndf = pd.read_csv('reviews.csv')\nX_train, X_test, y_train, y_test = train_test_split(df['text'], df['label'], test_size=0.25, random_state=0, stratify=df['label'])\nfrom sklearn.metrics import precision_score, recall_score\nmodel = Pipeline([('tfidf', TfidfVectorizer(ngram_range=(1, 2))), ('clf', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\npred = model.predict(X_test)\nprec_neg = precision_score(y_test, pred, pos_label='negative')\nrec_neg = recall_score(y_test, pred, pos_label='negative')\nprint(round(prec_neg, 3), round(rec_neg, 3))",
   "hints": [
    "<code>precision_score(y_test, pred, pos_label='negative')</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.feature_extraction.text import TfidfVectorizer as _TV\nfrom sklearn.linear_model import LogisticRegression as _LR\nfrom sklearn.pipeline import Pipeline as _P\n_df = pd.read_csv('reviews.csv')\n_a, _b, _c, _e = _tts(_df['text'], _df['label'], test_size=0.25, random_state=0, stratify=_df['label'])\nfrom sklearn.metrics import precision_score as _ps, recall_score as _rs\n_pr = _P([('tfidf', _TV(ngram_range=(1, 2))), ('clf', _LR(max_iter=1000))]).fit(_a, _c).predict(_b)\n_pn, _rn = _ps(_e, _pr, pos_label='negative'), _rs(_e, _pr, pos_label='negative')\nassert abs(prec_neg - _pn) < 1e-9, f\"prec_neg ≈ {_pn:.3f} болуы керек: pos_label='negative'\"\nassert abs(rec_neg - _rn) < 1e-9, f\"rec_neg ≈ {_rn:.3f} болуы керек\"",
    "mustInclude": [
     "pos_label='negative'"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қате жіктелген пікірлер",
   "prompt": "<p>Ең пайдалы диагностика — қателерді оқу. Bigram Pipeline-ды үйретіп, test-те болжам шын белгімен сәйкес келмеген пікірлерді <code>errors</code> DataFrame-іне жинаңыз: бағандары <code>text</code>, <code>true</code>, <code>pred</code>. Қате санын <code>n_err</code>-ге жазыңыз.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.pipeline import Pipeline\ndf = pd.read_csv('reviews.csv')\nX_train, X_test, y_train, y_test = train_test_split(df['text'], df['label'], test_size=0.25, random_state=0, stratify=df['label'])\n",
   "solution": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.pipeline import Pipeline\ndf = pd.read_csv('reviews.csv')\nX_train, X_test, y_train, y_test = train_test_split(df['text'], df['label'], test_size=0.25, random_state=0, stratify=df['label'])\nmodel = Pipeline([('tfidf', TfidfVectorizer(ngram_range=(1, 2))), ('clf', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nres = pd.DataFrame({'text': X_test, 'true': y_test, 'pred': model.predict(X_test)})\nerrors = res[res['true'] != res['pred']]\nn_err = len(errors)\nprint(n_err)\nprint(errors)",
   "hints": [
    "<code>pd.DataFrame({'text': X_test, 'true': y_test, 'pred': model.predict(X_test)})</code>",
    "<code>res[res['true'] != res['pred']]</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.feature_extraction.text import TfidfVectorizer as _TV\nfrom sklearn.linear_model import LogisticRegression as _LR\nfrom sklearn.pipeline import Pipeline as _P\n_df = pd.read_csv('reviews.csv')\n_a, _b, _c, _e = _tts(_df['text'], _df['label'], test_size=0.25, random_state=0, stratify=_df['label'])\n_pr = _P([('tfidf', _TV(ngram_range=(1, 2))), ('clf', _LR(max_iter=1000))]).fit(_a, _c).predict(_b)\n_bad = _b[_pr != _e.values]\nassert isinstance(errors, pd.DataFrame) and {'text', 'true', 'pred'} <= set(errors.columns), \"errors — text, true, pred бағандары бар DataFrame\"\nassert n_err == len(_bad) and len(errors) == len(_bad), f\"Қате саны {len(_bad)} болуы керек\"\nassert set(errors['text']) == set(_bad) and (errors['true'] != errors['pred']).all(), \"errors-та тек true != pred жолдары болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Әріптік n-граммалар",
   "prompt": "<p>Жалғамалы қазақ тіліне әріптік n-граммалар көмектеседі. <code>char = Pipeline([('tfidf', TfidfVectorizer(analyzer='char_wb', ngram_range=(2, 4))), ('clf', LogisticRegression(max_iter=1000))])</code> үйретіп, test accuracy-ін <code>acc_char</code>-ға жазыңыз. Әр тіл бойынша test accuracy-ін <code>acc_lang</code> сөздігіне жазыңыз (кілттері <code>'kk'</code>, <code>'ru'</code>; тілі: <code>df.loc[X_test.index, 'lang']</code>).</p>",
   "starter": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.pipeline import Pipeline\ndf = pd.read_csv('reviews.csv')\nX_train, X_test, y_train, y_test = train_test_split(df['text'], df['label'], test_size=0.25, random_state=0, stratify=df['label'])\n",
   "solution": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.pipeline import Pipeline\ndf = pd.read_csv('reviews.csv')\nX_train, X_test, y_train, y_test = train_test_split(df['text'], df['label'], test_size=0.25, random_state=0, stratify=df['label'])\nchar = Pipeline([('tfidf', TfidfVectorizer(analyzer='char_wb', ngram_range=(2, 4))), ('clf', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nacc_char = char.score(X_test, y_test)\nlang = df.loc[X_test.index, 'lang']\nacc_lang = {}\nfor l in ['kk', 'ru']:\n    m = (lang == l).values\n    acc_lang[l] = char.score(X_test[m], y_test[m])\nprint(round(acc_char, 3), acc_lang)",
   "hints": [
    "<code>lang = df.loc[X_test.index, 'lang']</code>; mask: <code>m = (lang == 'kk').values</code>",
    "<code>char.score(X_test[m], y_test[m])</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.feature_extraction.text import TfidfVectorizer as _TV\nfrom sklearn.linear_model import LogisticRegression as _LR\nfrom sklearn.pipeline import Pipeline as _P\n_df = pd.read_csv('reviews.csv')\n_a, _b, _c, _e = _tts(_df['text'], _df['label'], test_size=0.25, random_state=0, stratify=_df['label'])\n_ch = _P([('tfidf', _TV(analyzer='char_wb', ngram_range=(2, 4))), ('clf', _LR(max_iter=1000))]).fit(_a, _c)\n_lg = _df.loc[_b.index, 'lang'].values\n_al = {l: _ch.score(_b[_lg == l], _e[_lg == l]) for l in ['kk', 'ru']}\nassert abs(acc_char - _ch.score(_b, _e)) < 1e-9, f\"acc_char ≈ {_ch.score(_b, _e):.3f} болуы керек: analyzer='char_wb', ngram_range=(2, 4)\"\nassert sorted(acc_lang) == ['kk', 'ru'], \"acc_lang кілттері: 'kk', 'ru'\"\nassert all(abs(acc_lang[l] - _al[l]) < 1e-9 for l in _al), f\"acc_lang ≈ {_al} болуы керек\"",
    "mustInclude": [
     "char_wb"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Мәтін моделінде C таңдау",
   "prompt": "<p>Белгі көп болғанда C маңызды. Әр <code>C</code> ∈ <code>[0.1, 1, 10]</code> үшін <code>Pipeline([('tfidf', TfidfVectorizer(ngram_range=(1, 2))), ('clf', LogisticRegression(C=C, max_iter=1000))])</code>-ның train-дегі 5-fold CV орташа accuracy-ін <code>cv_acc[C]</code>-ға жазыңыз. Ең жақсы C → <code>best_C</code>. Сол C-мен train-де үйретіп, test accuracy-ін <code>test_acc</code>-қа жазыңыз.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.pipeline import Pipeline\ndf = pd.read_csv('reviews.csv')\nX_train, X_test, y_train, y_test = train_test_split(df['text'], df['label'], test_size=0.25, random_state=0, stratify=df['label'])\nfrom sklearn.model_selection import cross_val_score\ncv_acc = {}\n",
   "solution": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.pipeline import Pipeline\ndf = pd.read_csv('reviews.csv')\nX_train, X_test, y_train, y_test = train_test_split(df['text'], df['label'], test_size=0.25, random_state=0, stratify=df['label'])\nfrom sklearn.model_selection import cross_val_score\ncv_acc = {}\ndef make(C):\n    return Pipeline([('tfidf', TfidfVectorizer(ngram_range=(1, 2))), ('clf', LogisticRegression(C=C, max_iter=1000))])\n\nfor C in [0.1, 1, 10]:\n    cv_acc[C] = cross_val_score(make(C), X_train, y_train, cv=5).mean()\nbest_C = max(cv_acc, key=cv_acc.get)\ntest_acc = make(best_C).fit(X_train, y_train).score(X_test, y_test)\nprint(cv_acc, best_C, round(test_acc, 3))",
   "hints": [
    "Pipeline жасайтын шағын функция ыңғайлы: <code>def make(C): return Pipeline([...])</code>",
    "<code>cross_val_score(make(C), X_train, y_train, cv=5).mean()</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.feature_extraction.text import TfidfVectorizer as _TV\nfrom sklearn.linear_model import LogisticRegression as _LR\nfrom sklearn.pipeline import Pipeline as _P\n_df = pd.read_csv('reviews.csv')\n_a, _b, _c, _e = _tts(_df['text'], _df['label'], test_size=0.25, random_state=0, stratify=_df['label'])\nfrom sklearn.model_selection import cross_val_score as _cvs\n_mk = lambda c: _P([('tfidf', _TV(ngram_range=(1, 2))), ('clf', _LR(C=c, max_iter=1000))])\n_s = {c: _cvs(_mk(c), _a, _c, cv=5).mean() for c in [0.1, 1, 10]}\n_bc = max(_s, key=_s.get)\nassert sorted(cv_acc) == [0.1, 1, 10] and all(abs(cv_acc[c] - _s[c]) < 1e-9 for c in _s), \"cv_acc сәйкес емес: train-дегі 5-fold CV, кілттері 0.1, 1, 10\"\nassert best_C == _bc, f\"best_C = {_bc} болуы керек\"\nassert abs(test_acc - _mk(_bc).fit(_a, _c).score(_b, _e)) < 1e-9, \"test_acc — best_C-мен train-де үйретілген модельдің test accuracy-і\"",
    "mustInclude": [
     "cross_val_score("
    ]
   }
  }
 ],
 "mp-ops": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Табыс өсті ме",
   "prompt": "<p><code>old</code> — 2024 жылғы өтінімдер (<code>month &lt; '2025-01'</code>), <code>new</code> — 2025 жылғы. Орташа табысты <code>inc_old</code>, <code>inc_new</code>-ге, өсімді пайызбен <code>growth = (inc_new / inc_old − 1) · 100</code> жазыңыз.</p>",
   "starter": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('loans.csv')\nF = ['age', 'income', 'debt_ratio', 'delays_12m', 'employment_years']\n",
   "solution": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('loans.csv')\nF = ['age', 'income', 'debt_ratio', 'delays_12m', 'employment_years']\nold = df[df['month'] < '2025-01']\nnew = df[df['month'] >= '2025-01']\ninc_old, inc_new = old['income'].mean(), new['income'].mean()\ngrowth = (inc_new / inc_old - 1) * 100\nprint(round(inc_old, 1), round(inc_new, 1), round(growth, 1))",
   "hints": [
    "<code>old = df[df['month'] &lt; '2025-01']</code>"
   ],
   "check": {
    "tests": "_o = df[df['month'] < '2025-01']['income'].mean(); _n = df[df['month'] >= '2025-01']['income'].mean()\nassert abs(inc_old - _o) < 1e-9 and abs(inc_new - _n) < 1e-9, f\"inc_old ≈ {_o:.1f}, inc_new ≈ {_n:.1f} болуы керек\"\nassert abs(growth - (_n / _o - 1) * 100) < 1e-9, f\"growth ≈ {(_n / _o - 1) * 100:.1f}% болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "PSI деңгейі",
   "prompt": "<p>Сабақтағы кесте бойынша <code>psi_level(v)</code> функциясын жазыңыз: PSI &lt; 0.1 болса <code>'stable'</code>, 0.1-ден 0.25-ке дейін (қоса) <code>'moderate'</code>, 0.25-тен жоғары болса <code>'major'</code> қайтарсын.</p>",
   "starter": "def psi_level(v):\n    pass\n",
   "solution": "def psi_level(v):\n    if v < 0.1:\n        return 'stable'\n    if v <= 0.25:\n        return 'moderate'\n    return 'major'\n\nprint(psi_level(0.05), psi_level(0.15), psi_level(0.35))",
   "hints": [
    "Шарттарды кішіден үлкенге қарай тексеріңіз: <code>if v &lt; 0.1</code>, сосын <code>if v &lt;= 0.25</code>."
   ],
   "check": {
    "tests": "assert psi_level(0.05) == 'stable' and psi_level(0.0) == 'stable', \"PSI < 0.1 → 'stable'\"\nassert psi_level(0.1) == 'moderate' and psi_level(0.25) == 'moderate', \"0.1 және 0.25 — 'moderate' (шекаралар қоса)\"\nassert psi_level(0.35) == 'major', \"Loans-тағы income PSI 0.35 → 'major'\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Эксперимент журналы",
   "prompt": "<p>MLflow-сыз да журнал жүргізуге болады: <code>runs</code> — сөздіктер тізімі. OOT Gini-і ең жоғары run-ның атын <code>best_run</code>-ға жазыңыз. Әр run үшін validation мен OOT Gini айырмасын <code>gaps</code> сөздігіне жазыңыз (<code>{атауы: gini_val − gini_oot}</code>). Айырмасы ең үлкен run-ды <code>most_overfit</code>-ке жазыңыз.</p>",
   "starter": "runs = [\n    {'name': 'logreg_C1', 'C': 1.0, 'gini_val': 0.47, 'gini_oot': 0.41},\n    {'name': 'logreg_C01', 'C': 0.1, 'gini_val': 0.45, 'gini_oot': 0.43},\n    {'name': 'boost_d3', 'C': None, 'gini_val': 0.55, 'gini_oot': 0.38},\n]\n",
   "solution": "runs = [\n    {'name': 'logreg_C1', 'C': 1.0, 'gini_val': 0.47, 'gini_oot': 0.41},\n    {'name': 'logreg_C01', 'C': 0.1, 'gini_val': 0.45, 'gini_oot': 0.43},\n    {'name': 'boost_d3', 'C': None, 'gini_val': 0.55, 'gini_oot': 0.38},\n]\nbest_run = max(runs, key=lambda r: r['gini_oot'])['name']\ngaps = {r['name']: r['gini_val'] - r['gini_oot'] for r in runs}\nmost_overfit = max(gaps, key=gaps.get)\nprint(best_run, gaps, most_overfit)",
   "hints": [
    "<code>max(runs, key=lambda r: r['gini_oot'])['name']</code>",
    "<code>{r['name']: r['gini_val'] - r['gini_oot'] for r in runs}</code>"
   ],
   "check": {
    "tests": "assert best_run == 'logreg_C01', \"best_run — OOT Gini ең жоғары run: logreg_C01\"\nassert set(gaps) == {'logreg_C1', 'logreg_C01', 'boost_d3'} and abs(gaps['boost_d3'] - 0.17) < 1e-9 and abs(gaps['logreg_C1'] - 0.06) < 1e-9, \"gaps = {атауы: gini_val − gini_oot}\"\nassert most_overfit == 'boost_d3', \"most_overfit — айырмасы ең үлкен run: boost_d3 (validation-да ең жақсы, OOT-те ең нашар)\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ай сайынғы дефолт",
   "prompt": "<p>Нақты дефолт үлесін ай бойынша <code>rate_by_month</code> Series-іне жазыңыз (<code>groupby('month')</code>). Үлесі ең жоғары айды <code>worst_month</code>-қа жазыңыз. 2024 және 2025 жылдардағы жалпы дефолт үлесін <code>rate_2024</code>, <code>rate_2025</code>-ке жазыңыз.</p>",
   "starter": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('loans.csv')\nF = ['age', 'income', 'debt_ratio', 'delays_12m', 'employment_years']\n",
   "solution": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('loans.csv')\nF = ['age', 'income', 'debt_ratio', 'delays_12m', 'employment_years']\nrate_by_month = df.groupby('month')['default'].mean()\nworst_month = rate_by_month.idxmax()\nrate_2024 = df[df['month'] < '2025-01']['default'].mean()\nrate_2025 = df[df['month'] >= '2025-01']['default'].mean()\nprint(rate_by_month.round(3), worst_month, round(rate_2024, 3), round(rate_2025, 3))",
   "hints": [
    "<code>df.groupby('month')['default'].mean()</code>",
    "<code>rate_by_month.idxmax()</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_g = df.groupby('month')['default'].mean()\nassert len(rate_by_month) == 18 and _np.allclose(_np.asarray(rate_by_month, dtype=float), _g.values), \"rate_by_month — 18 айдың дефолт үлесі\"\nassert worst_month == _g.idxmax(), f\"worst_month = {_g.idxmax()} болуы керек\"\nassert abs(rate_2024 - df[df['month'] < '2025-01']['default'].mean()) < 1e-9 and abs(rate_2025 - df[df['month'] >= '2025-01']['default'].mean()) < 1e-9, \"rate_2024, rate_2025 — әр жылдың барлық өтінімдері бойынша үлес\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "4 топпен PSI",
   "prompt": "<p>Табыс PSI-ін 4 квартильдік топпен қолмен есептеңіз. Шекаралар <b>ескі</b> кезеңнен: <code>edges = np.quantile(old['income'], [0, 0.25, 0.5, 0.75, 1])</code>, сосын <code>edges[0], edges[-1] = -np.inf, np.inf</code>. Үлестер: <code>e = np.histogram(old['income'], edges)[0] / len(old)</code>, <code>a</code> — <code>new</code> үшін солай. <code>psi_inc4 = Σ (a − e) · ln(a / e)</code>.</p>",
   "starter": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('loans.csv')\nF = ['age', 'income', 'debt_ratio', 'delays_12m', 'employment_years']\nold = df[df['month'] < '2025-01']\nnew = df[df['month'] >= '2025-01']\n",
   "solution": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('loans.csv')\nF = ['age', 'income', 'debt_ratio', 'delays_12m', 'employment_years']\nold = df[df['month'] < '2025-01']\nnew = df[df['month'] >= '2025-01']\nedges = np.quantile(old['income'], [0, 0.25, 0.5, 0.75, 1])\nedges[0], edges[-1] = -np.inf, np.inf\ne = np.histogram(old['income'], edges)[0] / len(old)\na = np.histogram(new['income'], edges)[0] / len(new)\npsi_inc4 = float(np.sum((a - e) * np.log(a / e)))\nprint(e.round(3), a.round(3), round(psi_inc4, 3))",
   "hints": [
    "<code>a = np.histogram(new['income'], edges)[0] / len(new)</code>",
    "<code>np.sum((a - e) * np.log(a / e))</code>"
   ],
   "check": {
    "tests": "_o = df[df['month'] < '2025-01']['income']; _n = df[df['month'] >= '2025-01']['income']\n_ed = np.quantile(_o, [0, 0.25, 0.5, 0.75, 1]); _ed[0], _ed[-1] = -np.inf, np.inf\n_e = np.histogram(_o, _ed)[0] / len(_o); _a = np.histogram(_n, _ed)[0] / len(_n)\n_v = float(np.sum((_a - _e) * np.log(_a / _e)))\nassert np.allclose(e, _e) and np.allclose(a, _a), \"e, a үлестері сәйкес емес: шекаралар ескі кезеңнен, np.histogram(...)[0] / len(...)\"\nassert abs(psi_inc4 - _v) < 1e-9, f\"psi_inc4 ≈ {_v:.3f} болуы керек\"",
    "mustInclude": [
     "np.histogram("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Скор PSI-і",
   "prompt": "<p>Факт әлі белгісіз, бірақ модель скорының таралуын бірден салыстыруға болады. Стартерде <code>psi()</code> функциясы мен <code>dev</code>-те үйретілген <code>model</code> дайын. <code>s_dev</code> — <code>dev</code>-тегі, <code>s_oot</code> — <code>oot</code>-тағы болжам ықтималдықтары. <code>psi_score = psi(s_dev, s_oot)</code>. Орташа скорларды <code>mean_dev</code>, <code>mean_oot</code>-қа жазыңыз.</p>",
   "starter": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('loans.csv')\nF = ['age', 'income', 'debt_ratio', 'delays_12m', 'employment_years']\ndef psi(expected, actual, bins=10):\n    expected = np.asarray(expected, dtype=float)\n    actual = np.asarray(actual, dtype=float)\n    edges = np.quantile(expected, np.linspace(0, 1, bins + 1))\n    edges[0], edges[-1] = -np.inf, np.inf\n    e = np.clip(np.histogram(expected, edges)[0] / len(expected), 0.0001, None)\n    a = np.clip(np.histogram(actual, edges)[0] / len(actual), 0.0001, None)\n    return float(np.sum((a - e) * np.log(a / e)))\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import roc_auc_score\ndev = df[df['month'] <= '2024-09']\noot = df[df['month'] >= '2025-01']\nmodel = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000)).fit(dev[F], dev['default'])\n",
   "solution": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('loans.csv')\nF = ['age', 'income', 'debt_ratio', 'delays_12m', 'employment_years']\ndef psi(expected, actual, bins=10):\n    expected = np.asarray(expected, dtype=float)\n    actual = np.asarray(actual, dtype=float)\n    edges = np.quantile(expected, np.linspace(0, 1, bins + 1))\n    edges[0], edges[-1] = -np.inf, np.inf\n    e = np.clip(np.histogram(expected, edges)[0] / len(expected), 0.0001, None)\n    a = np.clip(np.histogram(actual, edges)[0] / len(actual), 0.0001, None)\n    return float(np.sum((a - e) * np.log(a / e)))\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import roc_auc_score\ndev = df[df['month'] <= '2024-09']\noot = df[df['month'] >= '2025-01']\nmodel = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000)).fit(dev[F], dev['default'])\ns_dev = model.predict_proba(dev[F])[:, 1]\ns_oot = model.predict_proba(oot[F])[:, 1]\npsi_score = psi(s_dev, s_oot)\nmean_dev, mean_oot = s_dev.mean(), s_oot.mean()\nprint(round(psi_score, 3), round(mean_dev, 3), round(mean_oot, 3))",
   "hints": [
    "<code>s_oot = model.predict_proba(oot[F])[:, 1]</code>",
    "Бірінші аргумент — эталон (ескі) кезең: <code>psi(s_dev, s_oot)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nfrom sklearn.pipeline import make_pipeline as _mp\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\nfrom sklearn.metrics import roc_auc_score as _ras\n_d = pd.read_csv('loans.csv')\n_F = ['age', 'income', 'debt_ratio', 'delays_12m', 'employment_years']\n_dev = _d[_d['month'] <= '2024-09']; _oot = _d[_d['month'] >= '2025-01']\n_m = _mp(_SS(), _LR(max_iter=1000)).fit(_dev[_F], _dev['default'])\n_sd = _m.predict_proba(_dev[_F])[:, 1]; _so = _m.predict_proba(_oot[_F])[:, 1]\nassert len(s_dev) == 630 and len(s_oot) == 420, \"s_dev — 630, s_oot — 420 болжам\"\nassert abs(psi_score - psi(_sd, _so)) < 1e-9, f\"psi_score ≈ {psi(_sd, _so):.3f} болуы керек: psi(s_dev, s_oot)\"\nassert abs(mean_dev - _sd.mean()) < 1e-9 and abs(mean_oot - _so.mean()) < 1e-9, \"mean_dev, mean_oot — скорлардың орташасы\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Қарапайым рекалибровка",
   "prompt": "<p>Модель OOT-те тәуекелді кем бағалайды. Ең қарапайым рекалибровка: ықтималдықтарды бір коэффициентке көбейту. <code>oot1</code> — <code>2025-01</code> … <code>2025-03</code>, <code>oot2</code> — <code>2025-04</code> … <code>2025-06</code>.</p><ul><li><code>k</code> = oot1-дегі нақты дефолт үлесі / oot1-дегі орташа болжам;</li><li><code>p2</code> — oot2-дегі болжам, <code>p2_new = np.clip(p2 * k, 0, 1)</code>;</li><li><code>pred_before</code>, <code>pred_after</code> — <code>p2</code> мен <code>p2_new</code> орташалары, <code>fact2</code> — oot2-дегі нақты үлес;</li><li><code>gini_before</code>, <code>gini_after</code> — oot2-дегі Gini.</li></ul><p>Деңгей түзелді ме? Gini өзгерді ме?</p>",
   "starter": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('loans.csv')\nF = ['age', 'income', 'debt_ratio', 'delays_12m', 'employment_years']\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import roc_auc_score\ndev = df[df['month'] <= '2024-09']\noot = df[df['month'] >= '2025-01']\nmodel = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000)).fit(dev[F], dev['default'])\n",
   "solution": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('loans.csv')\nF = ['age', 'income', 'debt_ratio', 'delays_12m', 'employment_years']\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import roc_auc_score\ndev = df[df['month'] <= '2024-09']\noot = df[df['month'] >= '2025-01']\nmodel = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000)).fit(dev[F], dev['default'])\noot1 = oot[oot['month'] <= '2025-03']\noot2 = oot[oot['month'] >= '2025-04']\nk = oot1['default'].mean() / model.predict_proba(oot1[F])[:, 1].mean()\np2 = model.predict_proba(oot2[F])[:, 1]\np2_new = np.clip(p2 * k, 0, 1)\npred_before, pred_after = p2.mean(), p2_new.mean()\nfact2 = oot2['default'].mean()\ngini_before = 2 * roc_auc_score(oot2['default'], p2) - 1\ngini_after = 2 * roc_auc_score(oot2['default'], p2_new) - 1\nprint(round(k, 3), round(pred_before, 3), round(pred_after, 3), round(fact2, 3), round(gini_before, 3), round(gini_after, 3))",
   "hints": [
    "<code>oot1 = oot[oot['month'] &lt;= '2025-03']</code>, <code>oot2 = oot[oot['month'] &gt;= '2025-04']</code>",
    "<code>k = oot1['default'].mean() / model.predict_proba(oot1[F])[:, 1].mean()</code>",
    "Бір санға көбейту ретті өзгертпейді, сондықтан Gini сол күйінде қалады."
   ],
   "check": {
    "tests": "import numpy as _np\nfrom sklearn.pipeline import make_pipeline as _mp\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\nfrom sklearn.metrics import roc_auc_score as _ras\n_d = pd.read_csv('loans.csv')\n_F = ['age', 'income', 'debt_ratio', 'delays_12m', 'employment_years']\n_dev = _d[_d['month'] <= '2024-09']; _oot = _d[_d['month'] >= '2025-01']\n_m = _mp(_SS(), _LR(max_iter=1000)).fit(_dev[_F], _dev['default'])\n_o1 = _oot[_oot['month'] <= '2025-03']; _o2 = _oot[_oot['month'] >= '2025-04']\n_k = _o1['default'].mean() / _m.predict_proba(_o1[_F])[:, 1].mean()\n_p2 = _m.predict_proba(_o2[_F])[:, 1]; _pn = _np.clip(_p2 * _k, 0, 1)\nassert abs(k - _k) < 1e-9, f\"k ≈ {_k:.3f} болуы керек: oot1-дегі нақты үлес / орташа болжам\"\nassert abs(pred_before - _p2.mean()) < 1e-9 and abs(pred_after - _pn.mean()) < 1e-9, f\"pred_before ≈ {_p2.mean():.3f}, pred_after ≈ {_pn.mean():.3f} болуы керек (oot2-де)\"\nassert abs(fact2 - _o2['default'].mean()) < 1e-9, f\"fact2 ≈ {_o2['default'].mean():.3f}: oot2['default'].mean()\"\nassert abs(gini_before - (2 * _ras(_o2['default'], _p2) - 1)) < 1e-9 and abs(gini_after - (2 * _ras(_o2['default'], _pn) - 1)) < 1e-9, \"Gini oot2-де есептеледі: 2 * AUC - 1\"\nassert abs(fact2 - pred_after) < abs(fact2 - pred_before), \"Рекалибровкадан кейін орташа болжам нақты үлеске жақындауы керек\"",
    "mustInclude": [
     "np.clip("
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ай сайынғы мониторинг кестесі",
   "prompt": "<p>Мониторинг дашбордының кестесін жасаңыз. <code>dev</code>-те үйретілген <code>model</code> дайын. OOT-тің әр айы үшін (<code>2025-01</code> … <code>2025-06</code>) үш сан есептеңіз: <code>gini</code> (2 · AUC − 1), <code>pd_pred</code> (орташа болжам), <code>pd_fact</code> (нақты дефолт үлесі). Нәтиже — <code>monitor</code> DataFrame: индексі — ай (өсу ретімен), бағандары — <code>gini</code>, <code>pd_pred</code>, <code>pd_fact</code>. <code>gap_max</code> — айлар ішіндегі <code>pd_fact − pd_pred</code>-тің ең үлкен мәні.</p>",
   "starter": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('loans.csv')\nF = ['age', 'income', 'debt_ratio', 'delays_12m', 'employment_years']\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import roc_auc_score\ndev = df[df['month'] <= '2024-09']\noot = df[df['month'] >= '2025-01']\nmodel = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000)).fit(dev[F], dev['default'])\n",
   "solution": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('loans.csv')\nF = ['age', 'income', 'debt_ratio', 'delays_12m', 'employment_years']\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import roc_auc_score\ndev = df[df['month'] <= '2024-09']\noot = df[df['month'] >= '2025-01']\nmodel = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000)).fit(dev[F], dev['default'])\nrows = {}\nfor month, g in oot.groupby('month'):\n    p = model.predict_proba(g[F])[:, 1]\n    rows[month] = {'gini': 2 * roc_auc_score(g['default'], p) - 1, 'pd_pred': p.mean(), 'pd_fact': g['default'].mean()}\nmonitor = pd.DataFrame(rows).T.sort_index()\ngap_max = (monitor['pd_fact'] - monitor['pd_pred']).max()\nprint(monitor.round(3), round(gap_max, 3))",
   "hints": [
    "<code>for month, g in oot.groupby('month'):</code>",
    "Сөздіктер сөздігінен кесте: <code>pd.DataFrame(rows).T</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nfrom sklearn.pipeline import make_pipeline as _mp\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\nfrom sklearn.metrics import roc_auc_score as _ras\n_d = pd.read_csv('loans.csv')\n_F = ['age', 'income', 'debt_ratio', 'delays_12m', 'employment_years']\n_dev = _d[_d['month'] <= '2024-09']; _oot = _d[_d['month'] >= '2025-01']\n_m = _mp(_SS(), _LR(max_iter=1000)).fit(_dev[_F], _dev['default'])\n_ms = sorted(_oot['month'].unique())\n_r = {mo: (2 * _ras(g['default'], _m.predict_proba(g[_F])[:, 1]) - 1, _m.predict_proba(g[_F])[:, 1].mean(), g['default'].mean()) for mo, g in _oot.groupby('month')}\nassert isinstance(monitor, pd.DataFrame) and list(monitor.index) == _ms, f\"monitor индексі — OOT айлары, өсу ретімен: {_ms}\"\nassert {'gini', 'pd_pred', 'pd_fact'} <= set(monitor.columns), \"Бағандар: gini, pd_pred, pd_fact\"\nassert all(abs(float(monitor.loc[mo, 'gini']) - _r[mo][0]) < 1e-6 for mo in _ms), \"gini сәйкес емес: әр айда 2 * AUC - 1\"\nassert all(abs(float(monitor.loc[mo, 'pd_pred']) - _r[mo][1]) < 1e-9 and abs(float(monitor.loc[mo, 'pd_fact']) - _r[mo][2]) < 1e-9 for mo in _ms), \"pd_pred — орташа болжам, pd_fact — нақты үлес (әр айда)\"\nassert abs(gap_max - max(_r[mo][2] - _r[mo][1] for mo in _ms)) < 1e-9, \"gap_max = (pd_fact - pd_pred).max()\""
   }
  }
 ],
 "mp-anom": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Accuracy неге алдайды",
   "prompt": "<p><code>n_fraud</code> — алаяқтық транзакциялар саны (int), <code>fraud_rate</code> — олардың үлесі. Барлығын «таза» деп болжайтын «модельдің» accuracy-ін <code>acc_all_clean</code>-ға жазыңыз.</p>",
   "starter": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('transactions.csv')\n",
   "solution": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('transactions.csv')\nn_fraud = int(df['is_fraud'].sum())\nfraud_rate = df['is_fraud'].mean()\nacc_all_clean = (df['is_fraud'] == 0).mean()\nprint(n_fraud, fraud_rate, acc_all_clean)",
   "hints": [
    "<code>(df['is_fraud'] == 0).mean()</code>"
   ],
   "check": {
    "tests": "assert n_fraud == 30, \"n_fraud = 30 болуы керек\"\nassert abs(fraud_rate - 0.03) < 1e-9, \"fraud_rate = 0.03\"\nassert abs(acc_all_clean - 0.97) < 1e-9, \"Ештеңе таппайтын модельдің accuracy-і 0.97\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "z-score ережесі",
   "prompt": "<p><code>z_flags(values, k=3)</code> функциясын жазыңыз: <code>|x − орташа| / std &gt; k</code> болған мәндер үшін <code>True</code>, басқаларына <code>False</code> болатын bool массив қайтарсын. <code>std</code> — <code>np.std</code> (әдепкі).</p><p>Мысалы, <code>z_flags([1, 1, 1, 1, 1, 1, 1, 1, 1, 100], k=2)</code> соңғы мәнді ғана белгілейді.</p>",
   "starter": "import numpy as np\n\ndef z_flags(values, k=3):\n    pass\n",
   "solution": "import numpy as np\n\ndef z_flags(values, k=3):\n    x = np.asarray(values, dtype=float)\n    return np.abs(x - x.mean()) / x.std() > k\n\nprint(z_flags([1, 1, 1, 1, 1, 1, 1, 1, 1, 100], k=2))",
   "hints": [
    "<code>x = np.asarray(values, dtype=float)</code>; <code>np.abs(x - x.mean()) / x.std() &gt; k</code>"
   ],
   "check": {
    "tests": "_r = z_flags([1, 1, 1, 1, 1, 1, 1, 1, 1, 100], k=2)\nassert _r is not None and list(np.asarray(_r)) == [False] * 9 + [True], \"z_flags([1, ..., 1, 100], k=2) тек соңғы мәнді белгілеуі керек\"\nassert not np.asarray(z_flags([10, 12, 11, 13, 9, 10])).any(), \"Шығыңқы мән жоқ болса, бәрі False (k=3 әдепкі)\"\nassert list(np.asarray(z_flags([0, 0, 0, 10], k=1))) == [False, False, False, True], \"k параметрі ескерілуі керек: z_flags([0, 0, 0, 10], k=1)\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бизнес ереже",
   "prompt": "<p>Ереже: «жаңа құрылғы <b>және</b> шетел». <code>rule</code> — <code>new_device == 1</code> және <code>foreign == 1</code> болған транзакциялар (bool Series). <code>n_alerts</code> — дабыл саны, <code>n_hit</code> — олардың ішіндегі алаяқтық саны, <code>prec_rule</code> — precision.</p>",
   "starter": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('transactions.csv')\n",
   "solution": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('transactions.csv')\nrule = (df['new_device'] == 1) & (df['foreign'] == 1)\nn_alerts = int(rule.sum())\nn_hit = int((rule & (df['is_fraud'] == 1)).sum())\nprec_rule = n_hit / n_alerts\nprint(n_alerts, n_hit, round(prec_rule, 3))",
   "hints": [
    "<code>(df['new_device'] == 1) &amp; (df['foreign'] == 1)</code>"
   ],
   "check": {
    "tests": "_r = (df['new_device'] == 1) & (df['foreign'] == 1)\n_h = int((_r & (df['is_fraud'] == 1)).sum())\nassert len(rule) == 1000 and int(rule.sum()) == int(_r.sum()), \"rule — екі шарт та орындалған жолдар (&)\"\nassert n_alerts == int(_r.sum()) and n_hit == _h, f\"n_alerts = {int(_r.sum())}, n_hit = {_h} болуы керек\"\nassert abs(prec_rule - _h / _r.sum()) < 1e-9, \"prec_rule = n_hit / n_alerts\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Логарифмдік z-score",
   "prompt": "<p>Сома қисық таралған, сондықтан алдымен логарифм аламыз. <code>log_amt = np.log(df['amount'])</code>, <code>z = (log_amt − log_amt.mean()) / log_amt.std()</code>. <code>flag</code> — <code>z &gt; 3</code> болған транзакциялар (тек тым үлкен сомалар). <code>n_flag</code>, <code>precision_z</code>, <code>recall_z</code> есептеңіз.</p>",
   "starter": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('transactions.csv')\n",
   "solution": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('transactions.csv')\nlog_amt = np.log(df['amount'])\nz = (log_amt - log_amt.mean()) / log_amt.std()\nflag = z > 3\nn_flag = int(flag.sum())\nhit = int((flag & (df['is_fraud'] == 1)).sum())\nprecision_z = hit / n_flag\nrecall_z = hit / df['is_fraud'].sum()\nprint(n_flag, round(precision_z, 3), round(recall_z, 3))",
   "hints": [
    "<code>z = (log_amt - log_amt.mean()) / log_amt.std()</code>",
    "Recall: табылған алаяқтық / барлық алаяқтық (30)"
   ],
   "check": {
    "tests": "_l = np.log(df['amount']); _z = (_l - _l.mean()) / _l.std(); _f = _z > 3\n_h = int((_f & (df['is_fraud'] == 1)).sum())\nassert n_flag == int(_f.sum()), f\"n_flag = {int(_f.sum())} болуы керек: логарифмнің z-score-ы > 3\"\nassert abs(precision_z - _h / _f.sum()) < 1e-9, f\"precision_z ≈ {_h / _f.sum():.3f} болуы керек\"\nassert abs(recall_z - _h / df['is_fraud'].sum()) < 1e-9, f\"recall_z ≈ {_h / df['is_fraud'].sum():.3f} болуы керек\"",
    "mustInclude": [
     "np.log("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "precision@k функциясы",
   "prompt": "<p><code>precision_at_k(y_true, scores, k)</code> функциясын жазыңыз: скоры ең жоғары <code>k</code> мысалдың ішіндегі оң класс үлесін қайтарсын. Ретті <code>np.argsort(-scores, kind='stable')</code>-мен алыңыз. Сосын «модель» ретінде сомның өзін алып, <code>p30_amount = precision_at_k(df['is_fraud'], df['amount'], 30)</code> есептеңіз.</p>",
   "starter": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('transactions.csv')\n\ndef precision_at_k(y_true, scores, k):\n    pass\n",
   "solution": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('transactions.csv')\n\ndef precision_at_k(y_true, scores, k):\n    top = np.argsort(-np.asarray(scores, dtype=float), kind='stable')[:k]\n    return np.asarray(y_true)[top].mean()\np30_amount = precision_at_k(df['is_fraud'], df['amount'], 30)\nprint(round(p30_amount, 3))",
   "hints": [
    "<code>top = np.argsort(-np.asarray(scores, dtype=float), kind='stable')[:k]</code>",
    "<code>np.asarray(y_true)[top].mean()</code>"
   ],
   "check": {
    "tests": "_r = precision_at_k([1, 0, 1, 0, 0], [0.9, 0.8, 0.7, 0.2, 0.1], 2)\nassert _r is not None and abs(_r - 0.5) < 1e-9, \"precision_at_k([1, 0, 1, 0, 0], [0.9, 0.8, 0.7, 0.2, 0.1], 2) = 0.5: топ-2 ішінде бір алаяқтық\"\nassert abs(precision_at_k([0, 0, 1], [1, 2, 3], 1) - 1) < 1e-9, \"Скоры ең жоғары мысал бірінші алынады\"\n_t = np.argsort(-df['amount'].values.astype(float), kind='stable')[:30]\nassert abs(p30_amount - df['is_fraud'].values[_t].mean()) < 1e-9, f\"p30_amount ≈ {df['is_fraud'].values[_t].mean():.3f} болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Екі ереже бірге",
   "prompt": "<p>Екі ережені біріктіріңіз: <code>rule_a</code> — <code>amount</code> IQR ережесінің жоғарғы шегінен асады (<code>Q3 + 1.5 · IQR</code>); <code>rule_b</code> — <code>tx_24h &gt;= 8</code>. Дабыл: <code>alerts = rule_a | rule_b</code>. <code>n_alerts</code>, <code>precision_ab</code>, <code>recall_ab</code> есептеңіз.</p>",
   "starter": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('transactions.csv')\n",
   "solution": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('transactions.csv')\nq1, q3 = df['amount'].quantile(0.25), df['amount'].quantile(0.75)\nrule_a = df['amount'] > q3 + 1.5 * (q3 - q1)\nrule_b = df['tx_24h'] >= 8\nalerts = rule_a | rule_b\nn_alerts = int(alerts.sum())\nhit = int((alerts & (df['is_fraud'] == 1)).sum())\nprecision_ab = hit / n_alerts\nrecall_ab = hit / df['is_fraud'].sum()\nprint(n_alerts, round(precision_ab, 3), round(recall_ab, 3))",
   "hints": [
    "<code>rule_a = df['amount'] &gt; q3 + 1.5 * (q3 - q1)</code>",
    "«Немесе»: <code>rule_a | rule_b</code>"
   ],
   "check": {
    "tests": "_q1, _q3 = df['amount'].quantile(0.25), df['amount'].quantile(0.75)\n_al = (df['amount'] > _q3 + 1.5 * (_q3 - _q1)) | (df['tx_24h'] >= 8)\n_h = int((_al & (df['is_fraud'] == 1)).sum())\nassert int(rule_b.sum()) == int((df['tx_24h'] >= 8).sum()), \"rule_b = tx_24h >= 8\"\nassert n_alerts == int(_al.sum()), f\"n_alerts = {int(_al.sum())} болуы керек: rule_a | rule_b\"\nassert abs(precision_ab - _h / _al.sum()) < 1e-9 and abs(recall_ab - _h / df['is_fraud'].sum()) < 1e-9, f\"precision_ab ≈ {_h / _al.sum():.3f}, recall_ab ≈ {_h / 30:.3f} болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "IsolationForest.predict",
   "prompt": "<p>Скорсыз, дайын шекпен жұмыс істеп көріңіз. <code>iso = IsolationForest(n_estimators=100, contamination=0.05, random_state=0)</code>-ды <code>df[F]</code>-те үйретіңіз. <code>pred = iso.predict(df[F])</code>: <code>-1</code> — аномалия, <code>1</code> — қалыпты. <code>flag = pred == -1</code>. <code>n_anom</code>, <code>precision_iso</code>, <code>recall_iso</code> есептеңіз. <code>contamination</code> дабыл санына қалай әсер етеді?</p>",
   "starter": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('transactions.csv')\nfrom sklearn.ensemble import IsolationForest\nF = ['amount', 'hour', 'tx_24h', 'new_device', 'foreign']\n",
   "solution": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('transactions.csv')\nfrom sklearn.ensemble import IsolationForest\nF = ['amount', 'hour', 'tx_24h', 'new_device', 'foreign']\niso = IsolationForest(n_estimators=100, contamination=0.05, random_state=0).fit(df[F])\npred = iso.predict(df[F])\nflag = pred == -1\nn_anom = int(flag.sum())\nhit = int((flag & (df['is_fraud'].values == 1)).sum())\nprecision_iso = hit / n_anom\nrecall_iso = hit / df['is_fraud'].sum()\nprint(n_anom, round(precision_iso, 3), round(recall_iso, 3))",
   "hints": [
    "Модельге <code>is_fraud</code> берілмейді: тек <code>df[F]</code>.",
    "<code>hit = int((flag &amp; (df['is_fraud'].values == 1)).sum())</code>"
   ],
   "check": {
    "tests": "from sklearn.ensemble import IsolationForest as _IF\n_F = ['amount', 'hour', 'tx_24h', 'new_device', 'foreign']\n_p = _IF(n_estimators=100, contamination=0.05, random_state=0).fit(df[_F]).predict(df[_F])\n_f = _p == -1; _h = int((_f & (df['is_fraud'].values == 1)).sum())\nassert n_anom == int(_f.sum()), f\"n_anom = {int(_f.sum())} болуы керек: contamination=0.05 — шамамен 5% дабыл\"\nassert abs(precision_iso - _h / _f.sum()) < 1e-9, f\"precision_iso ≈ {_h / _f.sum():.3f} болуы керек\"\nassert abs(recall_iso - _h / 30) < 1e-9, f\"recall_iso ≈ {_h / 30:.3f} болуы керек\"",
    "mustInclude": [
     "IsolationForest(",
     ".predict("
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Модель ме, сома ма",
   "prompt": "<p>IsolationForest қарапайым «ең үлкен сома» ережесінен жақсы ма? <code>precision_at_k</code> функциясын жазыңыз (скоры ең жоғары <code>k</code> ішіндегі оң үлес, <code>np.argsort(-scores, kind='stable')</code>). <code>IsolationForest(n_estimators=100, contamination=0.03, random_state=0)</code> үйретіп, <code>score = -iso.score_samples(df[F])</code>. Әр <code>k</code> ∈ <code>[10, 30, 50]</code> үшін <code>p_iso[k]</code> (скор бойынша) және <code>p_amt[k]</code> (<code>amount</code> бойынша) есептеңіз.</p>",
   "starter": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('transactions.csv')\nfrom sklearn.ensemble import IsolationForest\nF = ['amount', 'hour', 'tx_24h', 'new_device', 'foreign']\n\ndef precision_at_k(y_true, scores, k):\n    pass\n\np_iso = {}\np_amt = {}\n",
   "solution": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('transactions.csv')\nfrom sklearn.ensemble import IsolationForest\nF = ['amount', 'hour', 'tx_24h', 'new_device', 'foreign']\n\ndef precision_at_k(y_true, scores, k):\n    top = np.argsort(-np.asarray(scores, dtype=float), kind='stable')[:k]\n    return np.asarray(y_true)[top].mean()\n\np_iso = {}\np_amt = {}\niso = IsolationForest(n_estimators=100, contamination=0.03, random_state=0).fit(df[F])\nscore = -iso.score_samples(df[F])\nfor k in [10, 30, 50]:\n    p_iso[k] = precision_at_k(df['is_fraud'], score, k)\n    p_amt[k] = precision_at_k(df['is_fraud'], df['amount'], k)\nprint(p_iso, p_amt)",
   "hints": [
    "<code>top = np.argsort(-np.asarray(scores, dtype=float), kind='stable')[:k]</code>",
    "<code>p_iso[k] = precision_at_k(df['is_fraud'], score, k)</code>"
   ],
   "check": {
    "tests": "from sklearn.ensemble import IsolationForest as _IF\n_F = ['amount', 'hour', 'tx_24h', 'new_device', 'foreign']\n_s = -_IF(n_estimators=100, contamination=0.03, random_state=0).fit(df[_F]).score_samples(df[_F])\n_y = df['is_fraud'].values\n_pk = lambda sc, k: _y[np.argsort(-np.asarray(sc, dtype=float), kind='stable')[:k]].mean()\nassert abs(precision_at_k([1, 0, 1, 0], [0.9, 0.8, 0.7, 0.1], 2) - 0.5) < 1e-9, \"precision_at_k([1, 0, 1, 0], [0.9, 0.8, 0.7, 0.1], 2) = 0.5 болуы керек\"\nassert sorted(p_iso) == [10, 30, 50] and sorted(p_amt) == [10, 30, 50], \"Кілттер: 10, 30, 50\"\nassert all(abs(p_iso[k] - _pk(_s, k)) <= 1 / k + 1e-9 for k in [10, 30, 50]), \"p_iso сәйкес емес: score = -iso.score_samples(df[F]); n_estimators=100, contamination=0.03, random_state=0\"\nassert all(abs(p_amt[k] - _pk(df['amount'], k)) <= 1 / k + 1e-9 for k in [10, 30, 50]), \"p_amt сәйкес емес: скор ретінде df['amount']\"",
    "mustInclude": [
     "score_samples("
    ]
   }
  }
 ],
 "mp-rec": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Себет өлшемі",
   "prompt": "<p><code>basket</code> — әр клиенттің сатып алу саны (<code>groupby('user_id').size()</code>). Орташасын <code>avg_basket</code>-ке, бір ғана тауар алған клиенттер санын <code>n_single</code>-ге (int) жазыңыз — оларға item-item ұсынысы қиын.</p>",
   "starter": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('purchases.csv')\n",
   "solution": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('purchases.csv')\nbasket = df.groupby('user_id').size()\navg_basket = basket.mean()\nn_single = int((basket == 1).sum())\nprint(round(avg_basket, 2), n_single)",
   "hints": [
    "<code>basket = df.groupby('user_id').size()</code>",
    "<code>int((basket == 1).sum())</code>"
   ],
   "check": {
    "tests": "_b = df.groupby('user_id').size()\nassert len(basket) == 117, \"basket — 117 клиент\"\nassert abs(avg_basket - _b.mean()) < 1e-9, f\"avg_basket ≈ {_b.mean():.2f} болуы керек\"\nassert n_single == int((_b == 1).sum()), f\"n_single = {int((_b == 1).sum())} болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жиындар арасындағы косинус",
   "prompt": "<p>0/1 векторлар үшін косинус = ортақ сатып алушылар / √(|A| · |B|). <code>cosine_sets(a, b)</code> функциясын жазыңыз: <code>a</code>, <code>b</code> — тауарды алған клиенттердің жиындары.</p><p>Мысалы, <code>cosine_sets({1, 2, 3}, {2, 3, 4, 5})</code> → <code>0.577</code>.</p>",
   "starter": "import math\n\ndef cosine_sets(a, b):\n    pass\n",
   "solution": "import math\n\ndef cosine_sets(a, b):\n    return len(a & b) / math.sqrt(len(a) * len(b))\n\nprint(round(cosine_sets({1, 2, 3}, {2, 3, 4, 5}), 3))",
   "hints": [
    "Ортақ элементтер: <code>a &amp; b</code>",
    "<code>len(a &amp; b) / math.sqrt(len(a) * len(b))</code>"
   ],
   "check": {
    "tests": "assert cosine_sets({1, 2, 3}, {2, 3, 4, 5}) is not None and abs(cosine_sets({1, 2, 3}, {2, 3, 4, 5}) - 2 / 12 ** 0.5) < 1e-9, \"cosine_sets({1, 2, 3}, {2, 3, 4, 5}) = 2 / √12 ≈ 0.577 болуы керек\"\nassert abs(cosine_sets({7, 8}, {7, 8}) - 1) < 1e-9, \"Бірдей жиындар: 1\"\nassert cosine_sets({1}, {2, 3}) == 0, \"Ортақ клиент жоқ: 0\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ұсыныстың precision@k-сы",
   "prompt": "<p><code>precision_at_k(recommended, bought, k)</code> функциясын жазыңыз: <code>recommended</code> тізімінің алғашқы <code>k</code> тауарының қаншасы <code>bought</code> ішінде, сол үлесті қайтарсын.</p><p>Мысалы, <code>precision_at_k(['сөмке', 'ноутбук', 'кітап'], ['ноутбук'], 3)</code> → <code>0.333</code>.</p>",
   "starter": "def precision_at_k(recommended, bought, k):\n    pass\n",
   "solution": "def precision_at_k(recommended, bought, k):\n    return len(set(recommended[:k]) & set(bought)) / k\n\nprint(precision_at_k(['сөмке', 'ноутбук', 'кітап'], ['ноутбук'], 3))",
   "hints": [
    "<code>len(set(recommended[:k]) &amp; set(bought)) / k</code>"
   ],
   "check": {
    "tests": "_r = precision_at_k(['сөмке', 'ноутбук', 'кітап'], ['ноутбук'], 3)\nassert _r is not None and abs(_r - 1 / 3) < 1e-9, \"Үш ұсыныстың біреуі сатып алынды: 1/3\"\nassert abs(precision_at_k(['a', 'b', 'c', 'd', 'e'], ['b', 'e', 'x'], 5) - 0.4) < 1e-9, \"Сабақтағы мысал: precision@5 = 2 / 5 = 0.4\"\nassert precision_at_k(['a', 'b', 'c'], ['c'], 2) == 0, \"Тек алғашқы k тауар есептеледі\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Танымалдылық, алынғандарсыз",
   "prompt": "<p><code>pop = df['item'].value_counts()</code>. <code>popular_for(user_id, k=3)</code> функциясын жазыңыз: <code>pop</code> ретімен ең танымал, бірақ клиент әлі алмаған <code>k</code> тауардың тізімін қайтарсын.</p>",
   "starter": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('purchases.csv')\npop = df['item'].value_counts()\n\ndef popular_for(user_id, k=3):\n    pass\n",
   "solution": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('purchases.csv')\npop = df['item'].value_counts()\n\ndef popular_for(user_id, k=3):\n    owned = set(df.loc[df['user_id'] == user_id, 'item'])\n    return [i for i in pop.index if i not in owned][:k]\n\nprint(popular_for(1), popular_for(2))",
   "hints": [
    "<code>owned = set(df.loc[df['user_id'] == user_id, 'item'])</code>",
    "<code>[i for i in pop.index if i not in owned][:k]</code>"
   ],
   "check": {
    "tests": "_pop = df['item'].value_counts()\n_own = lambda u: set(df.loc[df['user_id'] == u, 'item'])\n_ok = lambda u: [i for i in _pop.index if i not in _own(u)][:3]\n_us = [u for u in sorted(df['user_id'].unique())[:40] if len(_own(u) & set(_pop.index[:5])) <= 2]\nassert popular_for(1) is not None and list(popular_for(1)) == ['бөтелке', 'зарядтағыш', 'смартфон'], \"popular_for(1) → ['бөтелке', 'зарядтағыш', 'смартфон']\"\nassert all(list(popular_for(u)) == _ok(u) for u in _us), \"Клиент алған тауарлар ұсынылмауы керек, рет — pop бойынша\"\nassert len(popular_for(1, k=5)) == 5, \"k параметрі ескерілуі керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бірге сатып алу саны",
   "prompt": "<p>User-item матрицасы <code>M</code> (0/1) дайын. <code>co = M.T @ M</code> — 15 × 15 кесте: ұяшықта екі тауарды бірге алған клиенттер саны, диагоналда — тауардың өз сатылымы. <code>n_both</code> — смартфон мен құлаққапты бірге алғандар саны (int). <code>co_phone</code> — смартфонмен ең жиі бірге алынған 3 тауар (өзін қоспай, кему ретімен).</p>",
   "starter": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('purchases.csv')\nM = pd.crosstab(df['user_id'], df['item'])\n",
   "solution": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('purchases.csv')\nM = pd.crosstab(df['user_id'], df['item'])\nco = M.T @ M\nn_both = int(co.loc['смартфон', 'құлаққап'])\nco_phone = list(co['смартфон'].drop('смартфон').sort_values(ascending=False).head(3).index)\nprint(n_both, co_phone)",
   "hints": [
    "<code>M.T @ M</code> — матрицалық көбейту; нәтиже DataFrame, индексі мен бағандары — тауарлар",
    "<code>co['смартфон'].drop('смартфон').sort_values(ascending=False).head(3).index</code>"
   ],
   "check": {
    "tests": "_u = set(df.loc[df['item'] == 'смартфон', 'user_id']); _h = set(df.loc[df['item'] == 'құлаққап', 'user_id'])\n_cnt = {i: len(_u & set(df.loc[df['item'] == i, 'user_id'])) for i in df['item'].unique() if i != 'смартфон'}\nassert co.shape == (15, 15) and int(co.loc['смартфон', 'смартфон']) == len(_u), \"co — 15 × 15: M.T @ M; диагональ — тауардың сатылымы\"\nassert n_both == len(_u & _h), f\"n_both = {len(_u & _h)} болуы керек\"\nassert len(co_phone) == 3 and 'смартфон' not in co_phone and sorted((_cnt[i] for i in co_phone), reverse=True) == sorted(_cnt.values(), reverse=True)[:3], \"co_phone — смартфонмен бірге ең жиі алынған 3 тауар\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ұқсас тауарлар функциясы",
   "prompt": "<p>«Осыны алғандар мынаны да алды» блогы. <code>sim</code> — тауарлар арасындағы косинус ұқсастық кестесі (<code>cosine_similarity(M.T)</code>). <code>similar_items(item, k=3)</code> функциясы <code>item</code>-ге ең ұқсас <code>k</code> тауардың тізімін (өзін қоспай, ұқсастық кему ретімен) қайтарсын.</p>",
   "starter": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('purchases.csv')\nM = pd.crosstab(df['user_id'], df['item'])\nfrom sklearn.metrics.pairwise import cosine_similarity\n\ndef similar_items(item, k=3):\n    pass\n",
   "solution": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('purchases.csv')\nM = pd.crosstab(df['user_id'], df['item'])\nfrom sklearn.metrics.pairwise import cosine_similarity\nsim = pd.DataFrame(cosine_similarity(M.T), index=M.columns, columns=M.columns)\n\ndef similar_items(item, k=3):\n    return list(sim[item].drop(item).sort_values(ascending=False).head(k).index)\n\nprint(similar_items('ноутбук'), similar_items('футболка'))",
   "hints": [
    "<code>sim = pd.DataFrame(cosine_similarity(M.T), index=M.columns, columns=M.columns)</code>",
    "<code>sim[item].drop(item).sort_values(ascending=False).head(k).index</code>"
   ],
   "check": {
    "tests": "_A = M.values.astype(float); _nr = np.sqrt((_A ** 2).sum(axis=0))\n_S = pd.DataFrame((_A.T @ _A) / np.outer(_nr, _nr), index=M.columns, columns=M.columns)\n_top = lambda it, k: sorted(_S[it].drop(it).values, reverse=True)[:k]\n_chk = lambda it, k: len(similar_items(it, k)) == k and it not in similar_items(it, k) and _np_ok(it, k)\n_np_ok = lambda it, k: np.allclose(sorted((_S.loc[it, j] for j in similar_items(it, k)), reverse=True), _top(it, k))\nassert similar_items('ноутбук') is not None and _chk('ноутбук', 3), \"similar_items('ноутбук') — ноутбукке косинусы ең жоғары 3 тауар (өзін қоспай)\"\nassert _chk('футболка', 3) and _chk('смартфон', 5), \"Басқа тауарлар мен k үшін де жұмыс істеуі керек\"",
    "mustInclude": [
     "cosine_similarity("
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Танымалдылықты офлайн бағалау",
   "prompt": "<p>Әр клиенттің (кемінде 2 сатып алуы бар) соңғы сатып алуы жасырылды: <code>test</code> — жасырылғандар, <code>train</code> — қалғаны. Танымалдылық baseline-ын бағалаңыз: <code>pop = train['item'].value_counts()</code>; әр test клиентіне <code>pop</code> ретімен ол train-де алмаған алғашқы 3 тауарды ұсыныңыз. Жасырылған тауар сол 3-тің ішінде болса — «hit». <code>hit_pop</code> — hit үлесі, <code>n_users</code> — test клиенттерінің саны.</p>",
   "starter": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('purchases.csv')\ncnt = df['user_id'].value_counts()\nmulti = df[df['user_id'].isin(cnt[cnt >= 2].index)]\ntest = multi.groupby('user_id').tail(1)\ntrain = df.drop(test.index)\n",
   "solution": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('purchases.csv')\ncnt = df['user_id'].value_counts()\nmulti = df[df['user_id'].isin(cnt[cnt >= 2].index)]\ntest = multi.groupby('user_id').tail(1)\ntrain = df.drop(test.index)\npop = train['item'].value_counts()\nhits = []\nfor u, hidden in zip(test['user_id'], test['item']):\n    owned = set(train.loc[train['user_id'] == u, 'item'])\n    recs = [i for i in pop.index if i not in owned][:3]\n    hits.append(hidden in recs)\nhit_pop = np.mean(hits)\nn_users = len(test)\nprint(n_users, round(hit_pop, 3))",
   "hints": [
    "<code>for u, hidden in zip(test['user_id'], test['item']):</code>",
    "<code>owned = set(train.loc[train['user_id'] == u, 'item'])</code>; <code>recs = [i for i in pop.index if i not in owned][:3]</code>"
   ],
   "check": {
    "tests": "_cnt = df['user_id'].value_counts()\n_mu = df[df['user_id'].isin(_cnt[_cnt >= 2].index)]\n_te = _mu.groupby('user_id').tail(1); _tr = df.drop(_te.index)\n_pop = _tr['item'].value_counts()\n_h = [it in [i for i in _pop.index if i not in set(_tr.loc[_tr['user_id'] == u, 'item'])][:3] for u, it in zip(_te['user_id'], _te['item'])]\nassert n_users == len(_te), f\"n_users = {len(_te)} болуы керек\"\nassert abs(hit_pop - np.mean(_h)) <= 0.03, f\"hit_pop ≈ {np.mean(_h):.3f} болуы керек: pop = train['item'].value_counts(), алынған тауарларды алып тастаңыз\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Item-item офлайн бағалау",
   "prompt": "<p>Сол бөлу бойынша item-item-ді бағалаңыз. Тек train-нен: <code>M = pd.crosstab(train['user_id'], train['item'])</code>, <code>sim = cosine_similarity(M.T)</code>. Әр test клиенті үшін скор = <code>sim @ M.loc[u].values</code>; train-де алынған тауарларды алып тастап, скоры ең жоғары 3 тауарды ұсыныңыз (<code>sort_values(ascending=False, kind='stable')</code>). <code>hit_item</code> — hit үлесі. Салыстыру үшін танымалдылықтың hit үлесі <code>hit_pop</code> (алдыңғы есептегідей). <code>better</code> = <code>'item'</code> немесе <code>'pop'</code>.</p>",
   "starter": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('purchases.csv')\ncnt = df['user_id'].value_counts()\nmulti = df[df['user_id'].isin(cnt[cnt >= 2].index)]\ntest = multi.groupby('user_id').tail(1)\ntrain = df.drop(test.index)\nfrom sklearn.metrics.pairwise import cosine_similarity\n",
   "solution": "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('purchases.csv')\ncnt = df['user_id'].value_counts()\nmulti = df[df['user_id'].isin(cnt[cnt >= 2].index)]\ntest = multi.groupby('user_id').tail(1)\ntrain = df.drop(test.index)\nfrom sklearn.metrics.pairwise import cosine_similarity\nM = pd.crosstab(train['user_id'], train['item'])\nsim = cosine_similarity(M.T)\npop = train['item'].value_counts()\nhi, hp = [], []\nfor u, hidden in zip(test['user_id'], test['item']):\n    own = M.loc[u]\n    scores = pd.Series(sim @ own.values, index=M.columns)\n    recs = list(scores[own == 0].sort_values(ascending=False, kind='stable').head(3).index)\n    hi.append(hidden in recs)\n    hp.append(hidden in [i for i in pop.index if own.get(i, 0) == 0][:3])\nhit_item, hit_pop = np.mean(hi), np.mean(hp)\nbetter = 'item' if hit_item > hit_pop else 'pop'\nprint(round(hit_item, 3), round(hit_pop, 3), better)",
   "hints": [
    "<code>own = M.loc[u]</code>; <code>scores = pd.Series(sim @ own.values, index=M.columns)</code>",
    "<code>scores[own == 0].sort_values(ascending=False, kind='stable').head(3).index</code>",
    "Барлық test клиенті train-де бар (кемінде 1 сатып алу қалды), сондықтан <code>M.loc[u]</code> қате бермейді."
   ],
   "check": {
    "tests": "_cnt = df['user_id'].value_counts()\n_mu = df[df['user_id'].isin(_cnt[_cnt >= 2].index)]\n_te = _mu.groupby('user_id').tail(1); _tr = df.drop(_te.index)\nfrom sklearn.metrics.pairwise import cosine_similarity as _cs\n_M = pd.crosstab(_tr['user_id'], _tr['item']); _S = _cs(_M.T); _pop = _tr['item'].value_counts()\n_hi = []; _hp = []\nfor _u, _it in zip(_te['user_id'], _te['item']):\n    _o = _M.loc[_u]; _sc = pd.Series(_S @ _o.values, index=_M.columns)\n    _hi.append(_it in list(_sc[_o == 0].sort_values(ascending=False, kind='stable').head(3).index))\n    _hp.append(_it in [i for i in _pop.index if _o.get(i, 0) == 0][:3])\nassert abs(hit_item - np.mean(_hi)) <= 0.03, f\"hit_item ≈ {np.mean(_hi):.3f} болуы керек: sim тек train-нен, алынған тауарлар алынып тасталады\"\nassert abs(hit_pop - np.mean(_hp)) <= 0.03, f\"hit_pop ≈ {np.mean(_hp):.3f} болуы керек\"\nassert better == ('item' if np.mean(_hi) > np.mean(_hp) else 'pop'), \"better — hit үлесі жоғары тәсіл\"",
    "mustInclude": [
     "cosine_similarity("
    ]
   }
  }
 ]
});
