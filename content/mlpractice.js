// M5.2 ML in Practice. Real scikit-learn 1.6 runs in the Pyodide worker on churn.csv and flats.csv (content/mldata.js); models are small and seeded.
(function () {
  // Shared starter blocks (Python). Single quotes inside, JS double quotes outside.
  const CHURN = "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\n";
  const PRE = "from sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\n";
  const FLATS = "import pandas as pd\nflats = pd.read_csv('flats.csv')\n";
  // New topics (time series, text, monitoring, anomalies, recommenders) use extra files from content/mldata.js.
  const SALES = "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('sales_daily.csv', parse_dates=['date'])\n";
  const SALEST = "import pandas as _pd\nimport numpy as _np\n_d = _pd.read_csv('sales_daily.csv', parse_dates=['date'])\n";
  const SALESF = SALES + "from sklearn.linear_model import LinearRegression\nF = ['lag_1', 'lag_7', 'roll_7', 'promo']\ndf['lag_1'] = df['sales'].shift(1)\ndf['lag_7'] = df['sales'].shift(7)\ndf['roll_7'] = df['sales'].shift(1).rolling(7).mean()\nd = df.dropna()\n";
  const PCAS = "import pandas as pd\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.decomposition import PCA\nflats = pd.read_csv('flats.csv')\nX = flats[['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']]\n";
  const PCAT = "import numpy as _np\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.decomposition import PCA as _PCA\n_Xs = _SS().fit_transform(X)\n";
  const TEXT = "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.feature_extraction.text import TfidfVectorizer\ndf = pd.read_csv('reviews.csv')\nX_train, X_test, y_train, y_test = train_test_split(df['text'], df['label'], test_size=0.25, random_state=0, stratify=df['label'])\n";
  const LOANS = "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('loans.csv')\nF = ['age', 'income', 'debt_ratio', 'delays_12m', 'employment_years']\n";
  const PSIF = "\ndef psi(expected, actual, bins=10):\n    expected = np.asarray(expected, dtype=float)\n    actual = np.asarray(actual, dtype=float)\n    edges = np.quantile(expected, np.linspace(0, 1, bins + 1))   # шекаралар ескі кезеңнен\n    edges[0], edges[-1] = -np.inf, np.inf\n    e = np.clip(np.histogram(expected, edges)[0] / len(expected), 0.0001, None)\n    a = np.clip(np.histogram(actual, edges)[0] / len(actual), 0.0001, None)\n    return float(np.sum((a - e) * np.log(a / e)))\n\n";
  const TX = "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('transactions.csv')\n";
  const REC = "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('purchases.csv')\n";

  DJ.modules['m5-2'] = {
    intro: 'Нақты жұмыста модельдің өзі емес, оның айналасы маңызды: деректі дайындау, leakage-тен қорғану, гиперпараметр таңдау, күшті ансамбльдер, теңгерімсіз кластар, кластерлеу және модельді түсіндіру. Сосын вакансияларда сұралатын қолданбалы тақырыптар: уақыт қатары, CatBoost/XGBoost/LightGBM тәжірибесі, PCA, мәтін (TF-IDF), модель мониторингі (PSI, out-of-time), антифрод және ұсыныс жүйелері. Барлығын scikit-learn арқылы нақты деректерде жасайсыз: churn, flats, сатылым, пікірлер, несие өтінімдері, транзакциялар.',
    lessons: [
      {
        id: 'mp-1', title: 'Pipeline және ColumnTransformer', minutes: 16,
        body: `
<p>M5.1-де модельге дайын сандық кесте бердік. Нақты churn.csv олай емес: <code>city</code> мен <code>plan</code> — мәтін, <code>age</code>-те 25, <code>data_gb</code>-те 17 бос мән бар, ал <code>monthly_fee</code> мыңдармен, <code>support_calls</code> бірлермен өлшенеді. Модельге берер алдында үш нәрсе керек: бос мәнді толтыру, мәтінді санға айналдыру, масштабты теңестіру.</p>
<p>Мұны қолмен жасауға болады, бірақ әр қадамды train-де <code>fit</code>, test-те тек <code>transform</code> ету керек — оңай шатасады. <b>Pipeline</b> — конвейер: қадамдарды ретімен тізіп, бәрін бір <code>fit</code>/<code>predict</code>-пен іске қосады. <b>ColumnTransformer</b> әр бағандар тобына өз өңдеуін береді.</p>
<h3>Қадамдап мысал</h3>
<ol>
<li>Сандық бағандар: медианамен толтыру (<code>SimpleImputer</code>), сосын <code>StandardScaler</code>.</li>
<li>Категориялық бағандар: <code>OneHotEncoder</code> — <code>plan</code> үш бағанға (basic, premium, standard) айналады.</li>
<li>Соңында модель.</li>
</ol>
<pre><code>from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.linear_model import LogisticRegression

num = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']
cat = ['city', 'plan']
num_pipe = Pipeline([('imp', SimpleImputer(strategy='median')),
                     ('sc', StandardScaler())])
pre = ColumnTransformer([('num', num_pipe, num),
                         ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])
model = Pipeline([('pre', pre), ('clf', LogisticRegression(max_iter=1000))])
model.fit(X_train, y_train)      # бәрі тек train-де үйренеді
model.score(X_test, y_test)      # ≈ 0.78</code></pre>
<p>Нәтижесінде 6 сандық + 5 қала + 3 тариф = 14 баған шығады. <code>pre.get_feature_names_out()</code> олардың атауларын береді: <code>num__age</code>, <code>cat__city_Алматы</code>, т.б.</p>
<table>
<tr><th>Қадам</th><th>fit (train)</th><th>transform (test)</th></tr>
<tr><td>SimpleImputer</td><td>train медианасын есте сақтайды</td><td>сол медианамен толтырады</td></tr>
<tr><td>StandardScaler</td><td>train орташасы мен SD</td><td>сол сандармен масштабтайды</td></tr>
<tr><td>OneHotEncoder</td><td>категориялар тізімі</td><td>сол тізім бойынша 0/1</td></tr>
</table>
<div class="tip"><b>Жиі қателер:</b> (1) <code>customer_id</code>-ті белгі ретінде беру — ол ештеңе білдірмейді. (2) <code>handle_unknown='ignore'</code> жазбау: test-те жаңа қала кездессе, қате шығады. (3) Pipeline-ды толық деректе fit ету — келесі сабақтағы leakage. (4) Test-те <code>fit_transform</code> шақыру.</div>`,
        exercises: [
          { type: 'python', xp: 20, prompt: '<code>pre</code> ColumnTransformer жасаңыз: <code>num</code> бағандарына Pipeline (SimpleImputer(strategy=\'median\') → StandardScaler), <code>cat</code> бағандарына <code>OneHotEncoder(handle_unknown=\'ignore\')</code>. Сосын <code>Xt = pre.fit_transform(X)</code> және <code>print(Xt.shape)</code>.', starter: "import pandas as pd\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\npre = None\n", solution: "import pandas as pd\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\nXt = pre.fit_transform(X)\nprint(Xt.shape)", check: { tests: "import numpy as _np\nfrom sklearn.compose import ColumnTransformer as _CT\nassert isinstance(pre, _CT), 'pre ColumnTransformer болуы керек'\n_A = _np.asarray(Xt.toarray() if hasattr(Xt, 'toarray') else Xt, dtype=float)\nassert _A.shape == (600, 14), f'Xt пішіні (600, 14) болуы керек: 6 сандық + 5 қала + 3 тариф. Сізде {_A.shape}'\nassert not _np.isnan(_A).any(), 'Xt-те NaN қалды: сандық бағандарға SimpleImputer қосыңыз'\nassert _np.allclose(_A[:, :6].mean(axis=0), 0, atol=1e-6), 'Алғашқы 6 баған StandardScaler-ден кейін орташасы 0 болуы керек'", stdout: true }, hints: ['Алдымен <code>num_pipe = Pipeline([(\'imp\', SimpleImputer(strategy=\'median\')), (\'sc\', StandardScaler())])</code>.', '<code>ColumnTransformer([(\'num\', num_pipe, num), (\'cat\', OneHotEncoder(handle_unknown=\'ignore\'), cat)])</code>'] },
          { type: 'python', xp: 20, prompt: 'Дайын <code>pre</code> мен <code>LogisticRegression(max_iter=1000)</code>-ды бір <code>Pipeline</code>-ға біріктіріп, <code>model</code> айнымалысына жазыңыз. <code>X_train</code>-де fit етіп, test accuracy-ді <code>acc</code>-қа жазыңыз және шығарыңыз.', starter: CHURN + PRE + "from sklearn.linear_model import LogisticRegression\nmodel = None\n", solution: CHURN + PRE + "from sklearn.linear_model import LogisticRegression\nmodel = Pipeline([('pre', pre), ('clf', LogisticRegression(max_iter=1000))])\nmodel.fit(X_train, y_train)\nacc = model.score(X_test, y_test)\nprint(round(acc, 3))", check: { tests: "from sklearn.pipeline import Pipeline as _P\nfrom sklearn.linear_model import LogisticRegression as _LR\nassert isinstance(model, _P), 'model Pipeline болуы керек'\nassert isinstance(model.steps[-1][1], _LR), 'Pipeline-дың соңғы қадамы LogisticRegression болуы керек'\nassert hasattr(model.steps[-1][1], 'coef_'), 'model.fit(X_train, y_train) шақырыңыз'\nassert abs(acc - model.score(X_test, y_test)) < 1e-9, 'acc = model.score(X_test, y_test) болуы керек'\nassert 0.7 < acc < 0.9, f'accuracy шамамен 0.78 болуы керек, сізде {acc:.3f}'", stdout: true }, hints: ['<code>Pipeline([(\'pre\', pre), (\'clf\', LogisticRegression(max_iter=1000))])</code>', 'Pipeline-ға шикі <code>X_train</code> беріледі: толтыру мен кодтауды өзі жасайды.'] },
          { type: 'quiz', xp: 10, prompt: 'Неге OneHotEncoder-ге <code>handle_unknown=\'ignore\'</code> береміз?', options: ['Модель жылдамырақ үйренуі үшін', 'Жаңа деректе train-де болмаған категория (мысалы, жаңа қала) кездессе, қате шықпай, барлық бағаны 0 болуы үшін', 'Бос мәндерді толтыру үшін', 'Сирек категорияларды өшіру үшін'], answer: 1, explain: 'Production-да «Түркістан» сияқты жаңа қала келуі мүмкін. ignore болса, ол барлық қала бағандарында 0 алады, модель құламайды.' }
        ]
      },
      {
        id: 'mp-2', title: 'Data leakage: модель алдайтын кезде', minutes: 16,
        body: `
<p><b>Data leakage</b> (деректің ағуы) — модель үйрену кезінде болжау сәтінде шынымен қолжетімсіз ақпаратты көреді. Нәтиже: тестте керемет, production-да әлсіз. Бұл ML-дегі ең қымбат қателердің бірі, өйткені оны метрика жасырады.</p>
<h3>Үш түрі</h3>
<ul>
<li><b>Preprocessing leakage</b>: scaler, imputer немесе белгі таңдауды split-тен <i>бұрын</i> бүкіл деректе fit ету. Test-тің орташасы, медианасы train-ге «ағып» кетеді.</li>
<li><b>Target leakage</b>: белгі нәтижеден кейін ғана белгілі болады. Churn-де «соңғы шот төленбеді» немесе «келісімшартты бұзу айыппұлы» — клиент кеткеннен кейін пайда болады. Flats-те <code>price_per_m2</code> бағаның өзінен есептелген.</li>
<li><b>Time leakage</b>: уақыт бойынша деректі кездейсоқ бөлу. Наурыздағы деректен ақпанды болжау — болашақты көру. Ескі кезеңде үйретіп, жаңа кезеңде тексеру керек (<code>TimeSeriesSplit</code>).</li>
</ul>
<h3>Қадамдап мысал: кездейсоқ шудан «78%»</h3>
<p>100 жол, 2000 кездейсоқ белгі, кездейсоқ y. Шын дәлдік ≈ 50% болуы керек.</p>
<pre><code>rng = np.random.default_rng(0)
X = rng.normal(size=(100, 2000))
y = rng.integers(0, 2, 100)

# ҚАТЕ: белгіні бүкіл деректе таңдап, сосын CV
Xs = SelectKBest(f_classif, k=20).fit_transform(X, y)
cross_val_score(LogisticRegression(), Xs, y, cv=5).mean()    # ≈ 0.78

# ДҰРЫС: таңдау Pipeline ішінде, әр fold-та тек train-де
pipe = make_pipeline(SelectKBest(f_classif, k=20), LogisticRegression())
cross_val_score(pipe, X, y, cv=5).mean()                      # ≈ 0.59</code></pre>
<ol>
<li>SelectKBest 2000 белгінің ішінен y-пен <i>кездейсоқ</i> байланысы ең күшті 20-сын табады — test жолдарын да қарап.</li>
<li>CV бұл белгілерді «пайдалы» деп көреді: 78%.</li>
<li>Pipeline ішінде таңдау әр fold-тың train бөлігінде ғана жүреді — шындық шығады: кездейсоқтықтан сәл жоғары.</li>
</ol>
<p>Scaler-дің leakage-і әдетте кішкентай, бірақ принцип бірдей: <b>деректен үйренетін әр қадам — Pipeline ішінде</b>.</p>
<div class="tip"><b>Жиі қателер:</b> (1) <code>df.fillna(df.mean())</code>-ды split-ке дейін жасау. (2) «Тым жақсы» нәтижеге қуану: AUC 0.99 болса, алдымен leakage іздеңіз. (3) Әр белгі үшін «бұл болжау сәтінде белгілі ме?» деп сұрамау. (4) Бір клиенттің бірнеше жолын train мен test-ке бөліп жіберу.</div>`,
        exercises: [
          { type: 'python', xp: 20, prompt: 'Стартерде leakage-пен есептелген <code>leaky</code> бар. Дәл сол деректе <code>make_pipeline(SelectKBest(f_classif, k=20), LogisticRegression())</code> арқылы адал CV accuracy есептеп, <code>honest</code>-қа жазыңыз (cv=5). Екеуін шығарыңыз.', starter: "import numpy as np\nfrom sklearn.feature_selection import SelectKBest, f_classif\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.pipeline import make_pipeline\nrng = np.random.default_rng(0)\nX = rng.normal(size=(100, 2000))\ny = rng.integers(0, 2, 100)\nXs = SelectKBest(f_classif, k=20).fit_transform(X, y)\nleaky = cross_val_score(LogisticRegression(), Xs, y, cv=5).mean()\nhonest = None\n", solution: "import numpy as np\nfrom sklearn.feature_selection import SelectKBest, f_classif\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.pipeline import make_pipeline\nrng = np.random.default_rng(0)\nX = rng.normal(size=(100, 2000))\ny = rng.integers(0, 2, 100)\nXs = SelectKBest(f_classif, k=20).fit_transform(X, y)\nleaky = cross_val_score(LogisticRegression(), Xs, y, cv=5).mean()\npipe = make_pipeline(SelectKBest(f_classif, k=20), LogisticRegression())\nhonest = cross_val_score(pipe, X, y, cv=5).mean()\nprint(round(leaky, 2), round(honest, 2))", check: { tests: "assert honest is not None, 'honest-ті есептеңіз'\nassert 0 <= float(honest) <= 1, 'honest — accuracy (0 мен 1 арасы)'\nassert float(honest) < 0.7, f'Адал нәтиже кездейсоқтыққа жақын болуы керек (≈0.59), сізде {honest:.2f}. SelectKBest Pipeline ішінде ме және CV бастапқы X-те ме?'\nassert leaky - honest > 0.1, 'leaky мен honest арасында үлкен айырма болуы керек'", mustInclude: ['make_pipeline(', 'cross_val_score('], stdout: true }, hints: ['<code>pipe = make_pipeline(SelectKBest(f_classif, k=20), LogisticRegression())</code>', 'CV-ге <code>Xs</code> емес, бастапқы <code>X</code> беріледі: <code>cross_val_score(pipe, X, y, cv=5).mean()</code>'] },
          { type: 'python', xp: 20, prompt: 'Стартерде churn деректеріне <code>final_bill_unpaid</code> бағаны қосылған (клиент кеткеннен кейін толтырылады). Әр белгінің <code>churned</code>-пен абсолютті корреляциясын <code>corrs</code> Series-ке жазыңыз, ең күштісінің атын <code>leaky_col</code>-ға. Сосын сол бағансыз <code>X_clean</code> құрып, LogisticRegression-ның test accuracy-ін <code>acc_clean</code>-ға жазыңыз.', starter: "import numpy as np\nimport pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\ndf = pd.read_csv('churn.csv')\nrng = np.random.default_rng(1)\ndf['final_bill_unpaid'] = np.where(rng.random(len(df)) < 0.95, df['churned'], 1 - df['churned'])\ncols = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract', 'final_bill_unpaid']\ny = df['churned']\n", solution: "import numpy as np\nimport pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\ndf = pd.read_csv('churn.csv')\nrng = np.random.default_rng(1)\ndf['final_bill_unpaid'] = np.where(rng.random(len(df)) < 0.95, df['churned'], 1 - df['churned'])\ncols = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract', 'final_bill_unpaid']\ny = df['churned']\ncorrs = df[cols].corrwith(y).abs()\nleaky_col = corrs.idxmax()\nX_clean = df[[c for c in cols if c != leaky_col]]\nX_train, X_test, y_train, y_test = train_test_split(X_clean, y, test_size=0.25, random_state=0, stratify=y)\nm = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))\nm.fit(X_train, y_train)\nacc_clean = m.score(X_test, y_test)\nprint(corrs.round(2))\nprint(leaky_col, round(acc_clean, 3))", check: { tests: "import pandas as _pd\nassert isinstance(corrs, _pd.Series), 'corrs Series болуы керек (df[cols].corrwith(y).abs())'\nassert leaky_col == 'final_bill_unpaid', 'Ең күшті корреляция final_bill_unpaid-те: ол нәтижеден кейін пайда болады'\nassert 'final_bill_unpaid' not in list(X_clean.columns), 'X_clean-нен final_bill_unpaid алынып тасталуы керек'\nassert X_clean.shape[1] == 6, 'X_clean-де 6 белгі қалуы керек'\nassert 0.65 < acc_clean < 0.9, f'Таза модельдің accuracy-і шынайы болуы керек (≈0.78), сізде {acc_clean:.3f}'", stdout: true }, hints: ['<code>corrs = df[cols].corrwith(y).abs()</code>, <code>leaky_col = corrs.idxmax()</code>', 'Бос мәндер бар, сондықтан <code>make_pipeline(SimpleImputer(strategy=\'median\'), StandardScaler(), LogisticRegression(max_iter=1000))</code>.'] },
          { type: 'quiz', xp: 10, prompt: 'Дүкен 2023–2025 жылғы күнделікті сатылымды болжайды. Аналитик барлық күндерді кездейсоқ араластырып, train_test_split жасады, R² = 0.95. Не дұрыс емес?', options: ['Ештеңе: R² жоғары болса, модель жақсы', 'Time leakage: модель болашақ күндерден үйреніп, өткенді болжайды. Ескі кезеңде үйретіп, соңғы айларда тексеру керек', 'test_size тым кіші', 'Scaler жетіспейді'], answer: 1, explain: 'Уақыттық деректе train әрқашан test-тен бұрын болуы керек (немесе TimeSeriesSplit). Әйтпесе модель «ертеңгі» мәндерді көріп қояды.' }
        ]
      },
      {
        id: 'mp-3', title: 'Feature engineering: жаңа белгілер жасау', minutes: 16,
        body: `
<p><b>Feature engineering</b> — бар бағандардан модельге пайдалы жаңа белгілер жасау. Модель тек берілгенді көреді: «соңғы қабат» ұғымын <code>floor</code> мен <code>floors_total</code>-дан өзі ойлап таппауы мүмкін. Сіз доменді білесіз — соны санға айналдырасыз.</p>
<h3>Төрт негізгі тәсіл</h3>
<ul>
<li><b>Қатынас</b> (ratio): <code>floor / floors_total</code>, <code>area_m2 / rooms</code>, churn-де <code>support_calls / (tenure_months / 12)</code> — жылына қоңырау саны.</li>
<li><b>Bin</b> (топтау): <code>pd.cut</code> үздіксіз санды аралықтарға бөледі. Сызықтық модель «алғашқы 6 ай қауіпті» деген секіруді осылай көреді.</li>
<li><b>Interaction</b> (өзара әсер): екі белгінің көбейтіндісі. Медеуде 1 м² Алатауға қарағанда қымбат, сондықтан <code>area_m2 × district</code>.</li>
<li><b>Күн бөліктері</b>: <code>pd.to_datetime</code>, сосын <code>.dt.month</code>, <code>.dt.dayofweek</code>, демалыс күні ме.</li>
</ul>
<h3>Қадамдап мысал</h3>
<p>1) Churn-де клиенттің мерзімін топтайық:</p>
<pre><code>df['tenure_bin'] = pd.cut(df['tenure_months'], bins=[0, 6, 12, 24, 48, 100],
                          labels=['0-6', '7-12', '13-24', '25-48', '49+'])
df.groupby('tenure_bin', observed=True)['churned'].mean()</code></pre>
<table>
<tr><th>tenure_bin</th><th>0-6</th><th>7-12</th><th>13-24</th><th>25-48</th><th>49+</th></tr>
<tr><td>churn rate</td><td>0.62</td><td>0.53</td><td>0.41</td><td>0.16</td><td>0.10</td></tr>
</table>
<p>Жаңа клиенттердің жартысынан көбі кетеді — күшті сигнал.</p>
<p>2) Flats-те LinearRegression-ның 5-fold R²: тек сандық бағандармен 0.66, district one-hot қосқанда 0.91, ал <code>area_m2 × әр district</code> interaction қосқанда 0.94. Бір доменді идея — +3 пункт.</p>
<p>3) Күн бөліктері:</p>
<pre><code>d = pd.to_datetime(pd.Series(['2025-03-08', '2025-03-10']))
d.dt.month        # 3, 3
d.dt.dayofweek    # 5 (сенбі), 0 (дүйсенбі)</code></pre>
<p>Күннің өзін (2025-03-08) модельге беруге болмайды: ол сан емес, ал timestamp ретінде берсек, модель «уақыт өткен сайын» деген жалған трендке сүйенеді. Ай, апта күні, мереке ме — бұлар қайталанатын заңдылықтарды ұстайды. Әр жаңа белгіні CV-мен тексеріңіз: пайда бермесе, алып тастаңыз, себебі артық белгі шу қосады.</p>
<div class="tip"><b>Жиі қателер:</b> (1) Таргеттен белгі жасау: <code>price_per_m2 = price_mln / area_m2</code> — бұл бағаның өзі, leakage. (2) Нөлге бөлу: <code>tenure_months</code> 0 болса, қатынас inf береді. (3) Bin шекараларын test-ке қарап таңдау. (4) Белгіні train-де бір формуламен, production-да басқасымен есептеу — сондықтан оны функцияға немесе Pipeline-ға салыңыз.</div>`,
        exercises: [
          { type: 'python', xp: 20, prompt: '<code>flats</code>-қа төрт баған қосыңыз: <code>age</code> = 2024 − year_built; <code>floor_ratio</code> = floor / floors_total; <code>is_last</code> = соңғы қабат болса 1, әйтпесе 0 (int); <code>area_per_room</code> = area_m2 / rooms. Сосын соңғы қабаттағы пәтерлердің орташа бағасын <code>last_price</code>-қа жазыңыз.', starter: FLATS, solution: FLATS + "flats['age'] = 2024 - flats['year_built']\nflats['floor_ratio'] = flats['floor'] / flats['floors_total']\nflats['is_last'] = (flats['floor'] == flats['floors_total']).astype(int)\nflats['area_per_room'] = flats['area_m2'] / flats['rooms']\nlast_price = flats.loc[flats['is_last'] == 1, 'price_mln'].mean()\nprint(round(last_price, 2))", check: { tests: "import pandas as _pd\n_f = _pd.read_csv('flats.csv')\nfor _c in ['age', 'floor_ratio', 'is_last', 'area_per_room']:\n    assert _c in flats.columns, f'{_c} бағаны жоқ'\nassert (flats['age'] == 2024 - _f['year_built']).all(), 'age = 2024 - year_built'\nassert ((flats['floor_ratio'] - _f['floor'] / _f['floors_total']).abs() < 1e-9).all(), 'floor_ratio = floor / floors_total'\nassert set(flats['is_last'].unique()) <= {0, 1} and int(flats['is_last'].sum()) == int((_f['floor'] == _f['floors_total']).sum()), 'is_last: floor == floors_total болса 1'\nassert ((flats['area_per_room'] - _f['area_m2'] / _f['rooms']).abs() < 1e-9).all(), 'area_per_room = area_m2 / rooms'\nassert abs(last_price - _f.loc[_f['floor'] == _f['floors_total'], 'price_mln'].mean()) < 1e-6, 'last_price — is_last == 1 пәтерлердің орташа price_mln'", stdout: true }, hints: ['<code>(flats[\'floor\'] == flats[\'floors_total\']).astype(int)</code>', '<code>flats.loc[flats[\'is_last\'] == 1, \'price_mln\'].mean()</code>'] },
          { type: 'python', xp: 20, prompt: 'Churn-де <code>tenure_bin</code> бағанын <code>pd.cut</code>-пен жасаңыз: bins=[0, 6, 12, 24, 48, 100], labels=[\'0-6\', \'7-12\', \'13-24\', \'25-48\', \'49+\']. Әр топтың churn rate-ін <code>rate</code> Series-ке жазып (groupby, observed=True), шығарыңыз.', starter: "import pandas as pd\ndf = pd.read_csv('churn.csv')\nrate = None\n", solution: "import pandas as pd\ndf = pd.read_csv('churn.csv')\ndf['tenure_bin'] = pd.cut(df['tenure_months'], bins=[0, 6, 12, 24, 48, 100], labels=['0-6', '7-12', '13-24', '25-48', '49+'])\nrate = df.groupby('tenure_bin', observed=True)['churned'].mean()\nprint(rate.round(2))", check: { tests: "assert rate is not None and len(rate) == 5, 'rate-те 5 топ болуы керек'\nassert 'tenure_bin' in df.columns, 'df-ке tenure_bin бағанын қосыңыз'\nassert [str(i) for i in rate.index] == ['0-6', '7-12', '13-24', '25-48', '49+'], 'Топ атаулары labels-пен сәйкес болуы керек'\nassert abs(rate['0-6'] - 0.6154) < 0.005, f'0-6 айлық топтың churn rate ≈ 0.62, сізде {rate.iloc[0]:.3f}'\nassert abs(rate['49+'] - 0.1036) < 0.005, '49+ топтың churn rate ≈ 0.10'\nassert all(rate.values[i] > rate.values[i + 1] for i in range(4)), 'Мерзім өскен сайын churn rate кемуі керек'", stdout: true }, hints: ['<code>pd.cut(df[\'tenure_months\'], bins=[...], labels=[...])</code>', '<code>df.groupby(\'tenure_bin\', observed=True)[\'churned\'].mean()</code>'] },
          { type: 'quiz', xp: 10, prompt: 'Flats моделіне <code>price_per_m2 = price_mln / area_m2</code> белгісін қостыңыз, R² 0.99-ға өсті. Қалай бағалайсыз?', options: ['Тамаша feature engineering', 'Target leakage: белгі бағаның өзінен есептелген, жаңа пәтерде оның мәні белгісіз', 'Interaction белгі, бәрі дұрыс', 'Тек масштабтау керек'], answer: 1, explain: 'Жаңа пәтердің бағасын білмейміз, демек price_per_m2-ні де білмейміз. Мұндай белгі тек тестті алдайды. (Ал ауданның орташа м² бағасы train-нен есептелсе — басқа әңгіме.)' }
        ]
      },
      {
        id: 'mp-4', title: 'GridSearchCV: гиперпараметр таңдау', minutes: 16,
        body: `
<p><b>Параметрлер</b> (коэффициенттер, ағаштың бөлінулері) модель <code>fit</code> кезінде өзі үйренеді. <b>Гиперпараметрлерді</b> (<code>C</code>, <code>max_depth</code>, <code>n_estimators</code>) біз алдын ала береміз. Оларды қалай таңдаймыз? Әр нұсқаны тексеріп, ең жақсысын аламыз. Бірақ <i>неде</i> тексереміз?</p>
<h3>Үш жиын</h3>
<table>
<tr><th>Жиын</th><th>Не үшін</th><th>Қанша рет қолданамыз</th></tr>
<tr><td>Train</td><td>Модель үйренеді</td><td>Көп</td></tr>
<tr><td>Validation</td><td>Гиперпараметр таңдаймыз</td><td>Көп</td></tr>
<tr><td>Test</td><td>Соңғы адал баға</td><td><b>Бір рет</b></td></tr>
</table>
<p>Егер гиперпараметрді test бойынша таңдасақ, test те «үйретуге» қатысады, оның бағасы оптимистік болады. Validation рөлін көбіне cross-validation атқарады: train-ді 5 бөлікке бөліп, кезекпен тексереді.</p>
<p><b>GridSearchCV</b> торды толық аралайды: әр комбинация × әр fold. Ең жақсысын тапқан соң, оны бүкіл train-де қайта үйретеді (<code>refit=True</code>).</p>
<h3>Қадамдап мысал</h3>
<pre><code>from sklearn.model_selection import GridSearchCV
pipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])
grid = GridSearchCV(pipe, {'model__C': [0.01, 0.1, 1, 10]},
                    cv=5, scoring='roc_auc')
grid.fit(X_train, y_train)
grid.best_params_          # {'model__C': 0.1}
grid.best_score_           # ≈ 0.817 (CV, train ішінде)
grid.score(X_test, y_test) # ≈ 0.804 (test, бір рет)</code></pre>
<ol>
<li>Pipeline ішіндегі параметр аты: <code>қадам_аты__параметр</code> (екі астын сызу).</li>
<li>4 мән × 5 fold = 20 fit, плюс 1 refit.</li>
<li><code>best_score_</code> test-тен сәл жоғары — бұл қалыпты: көп нұсқаның ішінен ең сәттісін таңдадық.</li>
</ol>
<p>Неге бұл маңызды? Егер 50 нұсқаны test-те салыстырып, ең жақсысын таңдасақ, кездейсоқ сәттілікті де таңдаймыз: test бағасы шынайы емес, оптимистік болады. Test — сейф: оны бір рет, соңында ашамыз.</p>
<p>Тор тез өседі: 3 параметр × 4 мән = 64 комбинация × 5 fold = 320 fit. Сондықтан алдымен кең, сирек тор, сосын жақсы аймақта тығыз тор.</p>
<div class="tip"><b>Жиі қателер:</b> (1) <code>'C'</code> деп жазу — Pipeline-да <code>'model__C'</code> керек. (2) GridSearch-ті бүкіл X-те іске қосып, сосын сол деректен test бөлу. (3) <code>best_score_</code>-ді соңғы нәтиже ретінде есептеу. (4) Үлкен тор: браузерде әр fit уақыт алады.</div>`,
        exercises: [
          { type: 'python', xp: 25, prompt: '<code>pre</code> + <code>LogisticRegression(max_iter=1000)</code> Pipeline-ына (қадам аты <code>\'model\'</code>) GridSearchCV жасаңыз: <code>C</code> ∈ [0.01, 0.1, 1, 10], cv=5, scoring=\'roc_auc\'. Train-де fit етіп, <code>best_C</code> мен <code>test_auc = grid.score(X_test, y_test)</code> шығарыңыз.', starter: CHURN + PRE + "from sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import GridSearchCV\ngrid = None\n", solution: CHURN + PRE + "from sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import GridSearchCV\npipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\ngrid = GridSearchCV(pipe, {'model__C': [0.01, 0.1, 1, 10]}, cv=5, scoring='roc_auc')\ngrid.fit(X_train, y_train)\nbest_C = grid.best_params_['model__C']\ntest_auc = grid.score(X_test, y_test)\nprint(best_C, round(grid.best_score_, 3), round(test_auc, 3))", check: { tests: "from sklearn.model_selection import GridSearchCV as _G\nassert isinstance(grid, _G), 'grid GridSearchCV болуы керек'\nassert hasattr(grid, 'best_params_'), 'grid.fit(X_train, y_train) шақырыңыз'\nassert len(grid.cv_results_['params']) == 4, 'Торда C-ның 4 мәні болуы керек'\nassert grid.scoring == 'roc_auc', 'scoring=\\'roc_auc\\' беріңіз'\nassert best_C in [0.01, 0.1, 1, 10], 'best_C тордағы мәндердің бірі болуы керек'\nassert abs(test_auc - grid.score(X_test, y_test)) < 1e-9, 'test_auc = grid.score(X_test, y_test)'\nassert 0.7 < test_auc < 0.9, f'test AUC ≈ 0.80 болуы керек, сізде {test_auc:.3f}'", stdout: true }, hints: ['Тор: <code>{\'model__C\': [0.01, 0.1, 1, 10]}</code>', '<code>best_C = grid.best_params_[\'model__C\']</code>'] },
          { type: 'python', xp: 20, prompt: 'GridSearch-сіз, қолмен: <code>X_train</code>-ді тағы бөліп (<code>X_tr, X_val</code>, test_size=0.25, random_state=0, stratify), DecisionTreeClassifier-дің <code>max_depth</code> ∈ [2, 3, 4, 6, 10] үшін validation accuracy-ін <code>val_scores</code> сөздігіне жазыңыз (кілт — depth). Ең жақсысын <code>best_depth</code>-қа. Сосын сол depth-пен бүкіл X_train-де үйретіп, test accuracy-ін <code>test_acc</code>-қа бір рет есептеңіз.', starter: CHURN + PRE + "from sklearn.tree import DecisionTreeClassifier\nval_scores = {}\n", solution: CHURN + PRE + "from sklearn.tree import DecisionTreeClassifier\nval_scores = {}\nX_tr, X_val, y_tr, y_val = train_test_split(X_train, y_train, test_size=0.25, random_state=0, stratify=y_train)\nfor d in [2, 3, 4, 6, 10]:\n    m = Pipeline([('pre', pre), ('model', DecisionTreeClassifier(max_depth=d, random_state=0))])\n    m.fit(X_tr, y_tr)\n    val_scores[d] = m.score(X_val, y_val)\nbest_depth = max(val_scores, key=val_scores.get)\nfinal = Pipeline([('pre', pre), ('model', DecisionTreeClassifier(max_depth=best_depth, random_state=0))])\nfinal.fit(X_train, y_train)\ntest_acc = final.score(X_test, y_test)\nprint(val_scores)\nprint(best_depth, round(test_acc, 3))", check: { tests: "assert sorted(val_scores) == [2, 3, 4, 6, 10], 'val_scores кілттері: 2, 3, 4, 6, 10'\nassert all(0.5 < v <= 1 for v in val_scores.values()), 'val_scores-те accuracy мәндері болуы керек'\nassert best_depth == max(val_scores, key=val_scores.get), 'best_depth — validation accuracy ең жоғары depth'\nassert 'X_val' in dir() and len(X_val) == 113, 'X_train-ді X_tr және X_val-ға бөліңіз (test_size=0.25): X_val-да 113 жол'\nassert 0.6 < test_acc < 0.9, f'test_acc шынайы болуы керек, сізде {test_acc}'", stdout: true }, hints: ['<code>X_tr, X_val, y_tr, y_val = train_test_split(X_train, y_train, test_size=0.25, random_state=0, stratify=y_train)</code>', '<code>best_depth = max(val_scores, key=val_scores.get)</code>'] },
          { type: 'number', xp: 10, prompt: 'Тор: <code>max_depth</code> 3 мән, <code>n_estimators</code> 4 мән, <code>min_samples_leaf</code> 2 мән. cv=5. Refit-ті есептемегенде GridSearchCV неше рет fit жасайды?', answer: 120, tol: 0, explain: '3 × 4 × 2 = 24 комбинация, әрқайсысы 5 fold: 24 × 5 = 120. Плюс соңында ең жақсысын бір рет refit.' }
        ]
      },
      {
        id: 'mp-5', title: 'Random Forest: неге орташалау көмектеседі', minutes: 15,
        body: `
<p>M5.1-де шешім ағашын (decision tree) көрдік: түсінікті, бірақ <b>тұрақсыз</b>. Деректің бірнеше жолын өзгертсеңіз, ағаш мүлдем басқаша өседі. Терең ағаш train-ді жаттап алады — high variance.</p>
<h3>Интуиция: көпшілік данышпандығы</h3>
<p>Бір адам түйедегі бұршақ санын болжаса, қателігі үлкен. 100 адамның болжамының орташасы әлдеқайда дәл — әркімнің кездейсоқ қатесі бірін-бірі жояды. Тәуелсіз n болжамның орташасының SD-і σ / √n: 100 болжам → қате 10 есе кіші. Шарт: қателер <b>әртүрлі</b> болуы керек. 100 бірдей ағаштың орташасы — сол бір ағаш.</p>
<h3>Random Forest ағаштарды қалай әртүрлі етеді</h3>
<ul>
<li><b>Bootstrap</b>: әр ағаш train-нен қайталанатын кездейсоқ таңдамада үйренеді (bagging).</li>
<li><b>Кездейсоқ белгілер</b>: әр бөлінуде тек белгілердің бір бөлігі қаралады (<code>max_features</code>, классификацияда әдетте √p).</li>
<li>Болжам: ағаштардың ықтималдықтарының орташасы.</li>
</ul>
<h3>Қадамдап мысал: churn, 5-fold ROC AUC</h3>
<pre><code>from sklearn.ensemble import RandomForestClassifier
rf = Pipeline([('pre', pre),
               ('model', RandomForestClassifier(n_estimators=100, random_state=0))])
cross_val_score(rf, X, y, cv=5, scoring='roc_auc').mean()</code></pre>
<table>
<tr><th>Модель</th><th>AUC</th></tr>
<tr><td>Бір ағаш (шектеусіз)</td><td>0.61</td></tr>
<tr><td>RF, 1 ағаш</td><td>0.56</td></tr>
<tr><td>RF, 10 ағаш</td><td>0.73</td></tr>
<tr><td>RF, 50 ағаш</td><td>0.76</td></tr>
<tr><td>RF, 100 ағаш</td><td>0.76</td></tr>
</table>
<ol>
<li>Бір терең ағаш әлсіз: шуды жаттап алды.</li>
<li>Ағаш саны өскен сайын AUC өседі — variance азаяды.</li>
<li>50-ден кейін өсу тоқтайды: ағаш қосу overfitting тудырмайды, тек уақыт алады.</li>
</ol>
<p>Қосымша пайда: RF-ке масштабтау керек емес, ол outlier-ге төзімді және гиперпараметрге сезімталдығы төмен. Сондықтан кестелік деректе ол жақсы «бірінші күшті модель»: тез іске қосып, LogisticRegression-мен салыстырасыз.</p>
<p>Ескерту: бұл деректе LogisticRegression (0.81) әлі де жақсы — тәуелділік негізінен сызықтық. Ансамбль әрқашан жеңбейді, салыстырып көру керек.</p>
<div class="tip"><b>Жиі қателер:</b> (1) <code>random_state</code> бермеу — нәтиже әр іске қосқанда өзгереді. (2) «Ағаш көп болса, overfitting» деп ойлау — RF-те олай емес, бірақ әр ағаштың тереңдігі (<code>max_depth</code>, <code>min_samples_leaf</code>) маңызды. (3) Браузерде n_estimators=1000 — тым баяу.</div>`,
        exercises: [
          { type: 'python', xp: 15, prompt: 'Орташалау интуициясы. Шын мән 10. 1000 тәжірибе × 50 «ағаш», әрқайсысының болжамы 10 + шу (SD = 3). Бір ағаштың болжамдарының SD-ін <code>single_sd</code>-ға, 50 ағаштың орташасының SD-ін <code>avg_sd</code>-ға жазыңыз. Қатынасын шығарыңыз (≈ √50 ≈ 7.1).', starter: "import numpy as np\nrng = np.random.default_rng(0)\npreds = 10 + rng.normal(0, 3, size=(1000, 50))\n", solution: "import numpy as np\nrng = np.random.default_rng(0)\npreds = 10 + rng.normal(0, 3, size=(1000, 50))\nsingle_sd = preds[:, 0].std()\navg_sd = preds.mean(axis=1).std()\nprint(round(single_sd, 2), round(avg_sd, 3), round(single_sd / avg_sd, 1))", check: { tests: "assert 2.7 < single_sd < 3.3, 'single_sd — бір бағанның (бір ағаштың) SD-і, ≈ 3'\nassert 0.35 < avg_sd < 0.5, 'avg_sd — жол бойынша орташаның (axis=1) SD-і, ≈ 3/√50 ≈ 0.42'\nassert 5.5 < single_sd / avg_sd < 9, 'Қатынас ≈ √50 ≈ 7.1 болуы керек'", stdout: true }, hints: ['Бір ағаш: <code>preds[:, 0].std()</code>', 'Орташа: <code>preds.mean(axis=1).std()</code>'] },
          { type: 'python', xp: 25, prompt: 'Бір <code>DecisionTreeClassifier(random_state=0)</code> мен <code>RandomForestClassifier(n_estimators=100, random_state=0)</code>-ты <code>pre</code>-мен Pipeline-ға салып, бүкіл X, y-де 5-fold ROC AUC есептеңіз: <code>tree_auc</code>, <code>rf_auc</code> (орташа мәндер).', starter: CHURN + PRE + "from sklearn.model_selection import cross_val_score\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.ensemble import RandomForestClassifier\ntree_auc = None\nrf_auc = None\n", solution: CHURN + PRE + "from sklearn.model_selection import cross_val_score\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.ensemble import RandomForestClassifier\ntree = Pipeline([('pre', pre), ('model', DecisionTreeClassifier(random_state=0))])\nrf = Pipeline([('pre', pre), ('model', RandomForestClassifier(n_estimators=100, random_state=0))])\ntree_auc = cross_val_score(tree, X, y, cv=5, scoring='roc_auc').mean()\nrf_auc = cross_val_score(rf, X, y, cv=5, scoring='roc_auc').mean()\nprint(round(tree_auc, 3), round(rf_auc, 3))", check: { tests: "assert tree_auc is not None and rf_auc is not None, 'tree_auc мен rf_auc есептеңіз'\nassert 0.5 < tree_auc < 0.7, f'Бір ағаштың AUC ≈ 0.61, сізде {tree_auc:.3f}. scoring=\\'roc_auc\\', cv=5 ме?'\nassert 0.7 < rf_auc < 0.85, f'Random Forest AUC ≈ 0.76, сізде {rf_auc:.3f}'\nassert rf_auc - tree_auc > 0.08, 'Орман бір ағаштан айқын жақсы болуы керек'", mustInclude: ['RandomForestClassifier(', 'cross_val_score('], stdout: true }, hints: ['<code>cross_val_score(pipe, X, y, cv=5, scoring=\'roc_auc\').mean()</code>', 'Екі Pipeline: біреуінде ағаш, біреуінде орман.'] },
          { type: 'quiz', xp: 10, prompt: 'Random Forest-те <code>max_features</code> (әр бөлінуде белгілердің бір бөлігін ғана қарау) не үшін керек?', options: ['Модельді жылдамдату үшін ғана', 'Ағаштарды бір-біріне ұқсамайтын ету үшін: қателері әртүрлі болса, орташалау variance-ты көбірек азайтады', 'Маңызсыз белгілерді өшіру үшін', 'Overfitting-ті арттыру үшін'], answer: 1, explain: 'Бәрі бір күшті белгімен бастаса, ағаштар ұқсас болады. Кездейсоқ белгілер оларды декорреляциялайды, сонда орташалау шынымен көмектеседі.' }
        ]
      },
      {
        id: 'mp-6', title: 'Gradient boosting: қателерді кезекпен түзеу', minutes: 16,
        body: `
<p>Random Forest ағаштарды <b>параллель</b> және тәуелсіз өсіреді. <b>Boosting</b> — <b>кезекпен</b>: әр жаңа кішкентай ағаш алдыңғылардың <i>қатесін</i> түзейді. Бұл M4.3-тегі gradient descent-тің дәл өзі: әр ағаш — антиградиент бағытындағы бір қадам.</p>
<ul>
<li><code>learning_rate</code> — қадам өлшемі: әр ағаштың үлесі қанша.</li>
<li><code>n_estimators</code> — қадамдар саны (ағаш саны).</li>
<li><code>max_depth</code> — әр ағаш кішкентай (2–3 деңгей): «әлсіз оқушы».</li>
</ul>
<h3>Қадамдап мысал: қолмен бір қадам</h3>
<p>Төрт пәтердің бағасы: 30, 40, 50, 80 млн.</p>
<ol>
<li>Бастапқы болжам — орташа: 50. Қалдықтар (residuals): −20, −10, 0, +30.</li>
<li>Кішкентай ағаш қалдықтарды болжайды, мысалы: алғашқы үшеуіне −10, соңғысына +30.</li>
<li><code>learning_rate = 0.1</code>: жаңа болжам = 50 + 0.1 · (−10) = 49 (алғашқы үшеуі), 50 + 0.1 · 30 = 53 (соңғысы).</li>
<li>Жаңа қалдықтарға келесі ағаш... Әр қадам MSE-ні сәл азайтады.</li>
</ol>
<p>Кішкентай learning_rate — абай қадамдар: көп ағаш керек, бірақ нәтиже тұрақты. Үлкен learning_rate — тез, бірақ шуды жаттап алады.</p>
<h3>Churn-де (max_depth=2, 5-fold AUC)</h3>
<table>
<tr><th>learning_rate</th><th>50 ағаш</th><th>100 ағаш</th></tr>
<tr><td>0.01</td><td>0.781</td><td>0.790</td></tr>
<tr><td>0.1</td><td><b>0.804</b></td><td>0.787</td></tr>
<tr><td>0.5</td><td>0.748</td><td>0.745</td></tr>
<tr><td>1.0</td><td>0.714</td><td>0.701</td></tr>
</table>
<p>Кестені жол бойынша оқыңыз. 0.01-де 50 ағаш жетпейді (0.781, underfit): ағашты 100-ге көбейткенде нәтиже әлі өсіп жатыр (0.790), яғни одан да көп ағаш керек. 0.1-де керісінше: 50 ағаш жеткілікті (0.804), ал 100 ағашта модель шуды жаттай бастайды (0.787). 0.5 пен 1.0 тым агрессивті: ағаш саны қандай болса да нашар (overfit). Ереже: learning_rate-ті 2 есе кемітсеңіз, n_estimators-ты шамамен 2 есе көбейтіңіз.</p>
<h3>HistGradientBoosting</h3>
<p><code>HistGradientBoostingClassifier</code> мәндерді гистограмма бағандарына бөледі — үлкен деректе әлдеқайда жылдам. Бонус: <b>NaN-ді өзі өңдейді</b>, imputer керек емес. Ағаш саны мұнда <code>max_iter</code> деп аталады. Kaggle-дағы кестелік жарыстардың көбін осы отбасы (XGBoost, LightGBM, CatBoost) жеңеді — бірақ тек мұқият тюнингтен кейін.</p>
<div class="tip"><b>Жиі қателер:</b> (1) Boosting-ті «әрқашан ең жақсы» деп санау — бұл деректе LogisticRegression (0.81) әлі бәсекелес. (2) learning_rate-ті өзгертіп, n_estimators-ты қалдыру. (3) Терең ағаштар (max_depth=10) — boosting тез overfit болады. (4) Ағаштарға StandardScaler міндетті деп ойлау — ағашқа масштаб әсер етпейді.</div>`,
        exercises: [
          { type: 'python', xp: 25, prompt: 'Бір boosting қадамын қолмен жасаңыз. <code>x = area_m2</code>, <code>y = price_mln</code>. <code>pred0</code> = y-тің орташасы (барлық жолға), <code>res</code> = y − pred0. <code>DecisionTreeRegressor(max_depth=2, random_state=0)</code>-ды (x, res)-ке үйретіп, <code>pred1 = pred0 + 0.5 * tree.predict(x)</code>. <code>mse0</code> мен <code>mse1</code> есептеңіз.', starter: FLATS + "import numpy as np\nfrom sklearn.tree import DecisionTreeRegressor\nx = flats[['area_m2']]\ny = flats['price_mln'].values\n", solution: FLATS + "import numpy as np\nfrom sklearn.tree import DecisionTreeRegressor\nx = flats[['area_m2']]\ny = flats['price_mln'].values\npred0 = np.full(len(y), y.mean())\nres = y - pred0\ntree = DecisionTreeRegressor(max_depth=2, random_state=0).fit(x, res)\npred1 = pred0 + 0.5 * tree.predict(x)\nmse0 = ((y - pred0) ** 2).mean()\nmse1 = ((y - pred1) ** 2).mean()\nprint(round(mse0, 1), round(mse1, 1))", check: { tests: "import numpy as _np\nfrom sklearn.tree import DecisionTreeRegressor as _DT\n_p0 = _np.full(len(y), y.mean())\n_t = _DT(max_depth=2, random_state=0).fit(x, y - _p0)\n_p1 = _p0 + 0.5 * _t.predict(x)\nassert _np.allclose(_np.asarray(pred0) * _np.ones(len(y)), _p0), 'pred0 — y-тің орташасы'\nassert _np.allclose(res, y - _p0), 'res = y - pred0'\nassert _np.allclose(pred1, _p1), 'pred1 = pred0 + 0.5 * tree.predict(x), ағаш (x, res)-ке үйретілуі керек'\nassert abs(mse0 - ((y - _p0) ** 2).mean()) < 1e-6 and abs(mse1 - ((y - _p1) ** 2).mean()) < 1e-6, 'mse0, mse1 — квадрат қателердің орташасы'\nassert mse1 < mse0, 'Бір қадамнан кейін MSE азаюы керек'", stdout: true }, hints: ['<code>pred0 = np.full(len(y), y.mean())</code>', 'Ағаш y-ке емес, <code>res</code>-ке үйренеді: <code>DecisionTreeRegressor(max_depth=2, random_state=0).fit(x, res)</code>'] },
          { type: 'python', xp: 25, prompt: '<code>HistGradientBoostingClassifier(max_iter=100, random_state=0)</code>-ды NaN-і бар сандық бағандарда (<code>X_num</code>, imputer-сіз) learning_rate ∈ [0.05, 0.3, 1.0] үшін 3-fold ROC AUC-пен бағалаңыз. Нәтижені <code>scores</code> сөздігіне (кілт — learning_rate), ең жақсысын <code>best_lr</code>-ға жазыңыз.', starter: "import pandas as pd\nfrom sklearn.ensemble import HistGradientBoostingClassifier\nfrom sklearn.model_selection import cross_val_score\ndf = pd.read_csv('churn.csv')\nX_num = df[['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']]\ny = df['churned']\nscores = {}\n", solution: "import pandas as pd\nfrom sklearn.ensemble import HistGradientBoostingClassifier\nfrom sklearn.model_selection import cross_val_score\ndf = pd.read_csv('churn.csv')\nX_num = df[['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']]\ny = df['churned']\nscores = {}\nfor lr in [0.05, 0.3, 1.0]:\n    m = HistGradientBoostingClassifier(learning_rate=lr, max_iter=100, random_state=0)\n    scores[lr] = cross_val_score(m, X_num, y, cv=3, scoring='roc_auc').mean()\nbest_lr = max(scores, key=scores.get)\nprint(scores, best_lr)", check: { tests: "assert sorted(scores) == [0.05, 0.3, 1.0], 'scores кілттері: 0.05, 0.3, 1.0'\nassert all(0.6 < v < 0.9 for v in scores.values()), 'AUC мәндері 0.6–0.9 аралығында болуы керек (scoring=\\'roc_auc\\')'\nassert best_lr == max(scores, key=scores.get), 'best_lr — AUC ең жоғары learning_rate'\nassert best_lr == 0.05, 'Бұл деректе кішкентай learning_rate жеңеді'\nassert scores[0.05] > scores[1.0], 'learning_rate=1.0 тым агрессивті болуы керек'", mustInclude: ['HistGradientBoostingClassifier(', 'cross_val_score('], stdout: true }, hints: ['Цикл: <code>for lr in [0.05, 0.3, 1.0]:</code>', '<code>cross_val_score(m, X_num, y, cv=3, scoring=\'roc_auc\').mean()</code>'] },
          { type: 'quiz', xp: 10, prompt: 'Boosting моделінде learning_rate-ті 0.1-ден 0.05-ке түсірдіңіз. Басқа не өзгерту керек?', options: ['Ештеңе', 'n_estimators-ты шамамен екі есе көбейту: әр қадам кішірейді, сондықтан қадам көбірек керек', 'max_depth-ты 0-ге қою', 'n_estimators-ты екі есе азайту'], answer: 1, explain: 'learning_rate × n_estimators шамамен «жүрілген жол». Қадам кішірейсе, қадам саны көбейеді. Нақты мәнін CV-мен тексеріңіз.' }
        ]
      },
      {
        id: 'mp-7', title: 'Теңгерімсіз кластар және threshold таңдау', minutes: 16,
        body: `
<p>Churn-де клиенттердің 26%-ы ғана кетеді. «Ешкім кетпейді» деп болжайтын модельдің accuracy-і 74% — бірақ ол пайдасыз: бірде-бір кетушіні таппайды. Теңгерімсіз кластарда accuracy-ге емес, <b>recall</b> (кетушілердің қаншасын таптық), <b>precision</b> (ескерткендеріміздің қаншасы шынымен кетуші) және бизнес құнына қараймыз.</p>
<h3>Екі тетік</h3>
<ul>
<li><code>class_weight='balanced'</code>: сирек кластың қатесі қымбатырақ есептеледі. Churn-де LogisticRegression-ның recall-ы 0.38-ден 0.72-ге өседі, precision 0.62-ден 0.50-ге түседі.</li>
<li><b>Threshold</b>: <code>predict</code> әдепкіде <code>predict_proba ≥ 0.5</code> қолданады. Бұл бизнес шешім емес, жай әдет. Шекті төмендетсек — recall өседі, precision түседі.</li>
</ul>
<table>
<tr><th>Threshold</th><th>Recall</th><th>Precision</th><th>FP</th><th>FN</th></tr>
<tr><td>0.5</td><td>0.38</td><td>0.62</td><td>9</td><td>24</td></tr>
<tr><td>0.4</td><td>0.56</td><td>0.58</td><td>16</td><td>17</td></tr>
<tr><td>0.3</td><td>0.67</td><td>0.54</td><td>22</td><td>13</td></tr>
<tr><td>0.2</td><td>0.77</td><td>0.42</td><td>41</td><td>9</td></tr>
</table>
<h3>Қадамдап мысал: бизнес құны</h3>
<ol>
<li>Кетпейтін клиентке жеңілдік беру (FP) — 5 000 ₸ шығын.</li>
<li>Кетушіні жіберіп алу (FN) — 20 000 ₸ (бірнеше айлық табыс).</li>
<li>Әр threshold үшін: құн = FP · 5000 + FN · 20000.</li>
<li>Threshold-ты <b>train-дегі CV болжамымен</b> (<code>cross_val_predict</code>) таңдаймыз, test-ке тек тексеру үшін қараймыз.</li>
</ol>
<pre><code>p = cross_val_predict(model, X_train, y_train, cv=5,
                      method='predict_proba')[:, 1]
for t in np.arange(0.1, 0.91, 0.05):
    fp = ((p &gt;= t) &amp; (y_train == 0)).sum()
    fn = ((p &lt; t) &amp; (y_train == 1)).sum()
    cost = fp * 5000 + fn * 20000</code></pre>
<p>Recall мен precision арасындағы таңдау — техникалық емес, бизнес сұрақ. Жеңілдік арзан, ал клиентті жоғалту қымбат болса — recall маңызды. Егер әр ескерту операторға қымбат қоңырау болса — precision маңызды. Сондықтан шығындарды бизнестен сұрап алыңыз.</p>
<p>Бұл деректе ең арзан шек ≈ 0.15: FN төрт есе қымбат, сондықтан көбірек клиентті ескерткен тиімді.</p>
<div class="tip"><b>Жиі қателер:</b> (1) Теңгерімсіз деректе accuracy-мен мақтану. (2) Threshold-ты test-те таңдау — бұл да leakage. (3) <code>train_test_split</code>-те <code>stratify=y</code> ұмыту: test-те кетушілер үлесі өзгеруі мүмкін. (4) class_weight пен threshold-ты бірге «тым» қолдану — бірін таңдап, құнмен тексеріңіз.</div>`,
        exercises: [
          { type: 'python', xp: 20, prompt: 'Екі Pipeline үйретіңіз: <code>pre</code> + LogisticRegression(max_iter=1000) және сол, бірақ <code>class_weight=\'balanced\'</code>. Test-тегі recall-ды <code>rec_plain</code> мен <code>rec_bal</code>-ға, precision-ды <code>prec_plain</code> мен <code>prec_bal</code>-ға жазыңыз.', starter: CHURN + PRE + "from sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import recall_score, precision_score\n", solution: CHURN + PRE + "from sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import recall_score, precision_score\nplain = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nbal = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000, class_weight='balanced'))]).fit(X_train, y_train)\nrec_plain = recall_score(y_test, plain.predict(X_test))\nrec_bal = recall_score(y_test, bal.predict(X_test))\nprec_plain = precision_score(y_test, plain.predict(X_test))\nprec_bal = precision_score(y_test, bal.predict(X_test))\nprint(round(rec_plain, 3), round(rec_bal, 3), round(prec_plain, 3), round(prec_bal, 3))", check: { tests: "assert 0.25 < rec_plain < 0.5, f'Қарапайым модельдің recall ≈ 0.38, сізде {rec_plain:.3f}'\nassert rec_bal > rec_plain + 0.15, 'balanced модельдің recall-ы айтарлықтай жоғары болуы керек (≈0.72)'\nassert prec_bal < prec_plain, 'Recall өскенде precision әдетте түседі'\nassert 0.3 < prec_bal < 0.7, 'prec_bal шамамен 0.5'", stdout: true }, hints: ['<code>LogisticRegression(max_iter=1000, class_weight=\'balanced\')</code>', '<code>recall_score(y_test, model.predict(X_test))</code>'] },
          { type: 'python', xp: 25, prompt: 'Стартерде <code>p</code> — train-дегі CV ықтималдықтары. FP = 5000 ₸, FN = 20000 ₸. <code>np.arange(0.1, 0.91, 0.05)</code> әр threshold үшін құнды есептеп, <code>costs</code> сөздігіне жазыңыз (кілт — <code>round(t, 2)</code>). Ең арзанын <code>best_t</code>-ға, оның құнын <code>best_cost</code>-қа жазыңыз.', starter: CHURN + PRE + "import numpy as np\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import cross_val_predict\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\np = cross_val_predict(model, X_train, y_train, cv=5, method='predict_proba')[:, 1]\nyt = y_train.values\ncosts = {}\n", solution: CHURN + PRE + "import numpy as np\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import cross_val_predict\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])\np = cross_val_predict(model, X_train, y_train, cv=5, method='predict_proba')[:, 1]\nyt = y_train.values\ncosts = {}\nfor t in np.arange(0.1, 0.91, 0.05):\n    fp = ((p >= t) & (yt == 0)).sum()\n    fn = ((p < t) & (yt == 1)).sum()\n    costs[round(t, 2)] = fp * 5000 + fn * 20000\nbest_t = min(costs, key=costs.get)\nbest_cost = costs[best_t]\nprint(best_t, best_cost)", check: { tests: "import numpy as _np\n_c = {}\nfor _t in _np.arange(0.1, 0.91, 0.05):\n    _c[round(_t, 2)] = ((p >= _t) & (yt == 0)).sum() * 5000 + ((p < _t) & (yt == 1)).sum() * 20000\nassert len(costs) == 17, f'17 threshold болуы керек (0.10, 0.15, …, 0.90), сізде {len(costs)}'\nassert all(abs(costs[k] - _c[k]) < 1e-6 for k in _c if k in costs), 'Құн = FP * 5000 + FN * 20000; FP: p >= t және y = 0, FN: p < t және y = 1'\n_bt = min(_c, key=_c.get)\nassert abs(best_t - _bt) < 1e-9, f'Ең арзан threshold {_bt}'\nassert best_cost == _c[_bt], 'best_cost — сол threshold-тың құны'\nassert best_t < 0.5, 'FN қымбат болғандықтан, шек 0.5-тен төмен болуы керек'", stdout: true }, hints: ['FP: <code>((p &gt;= t) &amp; (yt == 0)).sum()</code>, FN: <code>((p &lt; t) &amp; (yt == 1)).sum()</code>', '<code>best_t = min(costs, key=costs.get)</code>'] },
          { type: 'number', xp: 10, prompt: 'Модель test-те 20 FP және 5 FN жасады. FP = 5 000 ₸, FN = 20 000 ₸. Жалпы құн қанша теңге?', answer: 200000, tol: 0, unit: '₸', explain: '20 · 5 000 + 5 · 20 000 = 100 000 + 100 000 = 200 000 ₸.' }
        ]
      },
      {
        id: 'mp-8', title: 'KMeans: клиент сегменттері', minutes: 16,
        body: `
<p>Осы уақытқа дейін y белгілі болды (supervised). <b>Кластерлеуде</b> y жоқ: «клиенттер қандай табиғи топтарға бөлінеді?» деп сұраймыз (unsupervised). Маркетинг сегменттері, дүкендерді топтау осылай жасалады.</p>
<h3>KMeans алгоритмі</h3>
<ol>
<li>k орталық (centroid) кездейсоқ таңдалады.</li>
<li>Әр нүкте ең жақын орталыққа беріледі (Евклид арақашықтығы).</li>
<li>Әр орталық өз нүктелерінің орташасына жылжиды.</li>
<li>2–3 қадам өзгеріс тоқтағанша қайталанады.</li>
</ol>
<p>Нәтиже бастапқы орталыққа тәуелді, сондықтан <code>n_init=10</code> (10 рет іске қосып, ең жақсысын алу) және <code>random_state=0</code>.</p>
<h3>Масштаб міндетті</h3>
<p>Арақашықтық бірліктерді салыстырады: <code>monthly_fee</code> мыңдармен (3 300–11 200), <code>support_calls</code> 0–6. Масштабсыз KMeans тек тарифке қарайды. <code>StandardScaler</code>-ден кейін әр белгі тең дауыс алады.</p>
<h3>k-ны таңдау</h3>
<ul>
<li><b>Inertia</b> — нүктелердің өз орталығына дейінгі квадрат арақашықтықтарының қосындысы. k өскен сайын әрқашан кемиді; «шынтақ» (elbow) — кему баяулайтын нүкте.</li>
<li><b>Silhouette</b> (−1…1) — нүкте өз кластеріне көршісінен қаншалық жақын. Жоғары — жақсы.</li>
</ul>
<h3>Қадамдап мысал: churn сегменттері</h3>
<pre><code>seg = df[['tenure_months', 'monthly_fee', 'data_gb', 'support_calls']].dropna()
Z = StandardScaler().fit_transform(seg)
km = KMeans(n_clusters=3, n_init=10, random_state=0).fit(Z)
seg['segment'] = km.labels_
seg.groupby('segment').mean()</code></pre>
<table>
<tr><th>k</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr>
<tr><td>inertia</td><td>1562</td><td>1193</td><td>964</td><td>816</td><td>729</td></tr>
<tr><td>silhouette</td><td>0.43</td><td>0.29</td><td>0.28</td><td>0.30</td><td>0.29</td></tr>
</table>
<p>Silhouette k=2-ні таңдайды (premium vs қалғандары). Бірақ k=3 бизнеске пайдалырақ: «жаңа арзан тарифтегілер» (~19 ай), «адал арзан тарифтегілер» (~55 ай), «premium, көп трафик» (~35 GB). Сегменттің churn rate-ін де қарауға болады: y кластерлеуге қатыспады, бірақ нәтижені түсіндіруге көмектеседі. Метрика бағыт береді, шешімді сегменттің түсінікті әрі әрекет етуге болатыны анықтайды.</p>
<div class="tip"><b>Жиі қателер:</b> (1) Масштабсыз кластерлеу. (2) Кластер нөмірін (0, 1, 2) мағыналы деп ойлау — олар жай белгі. (3) <code>customer_id</code> немесе y-ті кластерлеуге қосу. (4) Inertia ең кіші k-ны таңдау — ол әрқашан ең үлкен k.</div>`,
        exercises: [
          { type: 'python', xp: 20, prompt: '<code>seg</code>-тің төрт бағанын <code>StandardScaler</code>-мен масштабтап (<code>Z</code>), <code>KMeans(n_clusters=3, n_init=10, random_state=0)</code> үйретіңіз. Белгілерді <code>seg[\'segment\']</code>-ке жазып, <code>profile = seg.groupby(\'segment\').mean()</code> шығарыңыз.', starter: "import pandas as pd\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.cluster import KMeans\ndf = pd.read_csv('churn.csv')\ncols = ['tenure_months', 'monthly_fee', 'data_gb', 'support_calls']\nseg = df[cols].dropna().copy()\n", solution: "import pandas as pd\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.cluster import KMeans\ndf = pd.read_csv('churn.csv')\ncols = ['tenure_months', 'monthly_fee', 'data_gb', 'support_calls']\nseg = df[cols].dropna().copy()\nZ = StandardScaler().fit_transform(seg[cols])\nkm = KMeans(n_clusters=3, n_init=10, random_state=0).fit(Z)\nseg['segment'] = km.labels_\nprofile = seg.groupby('segment').mean()\nprint(profile.round(1))", check: { tests: "import numpy as _np\nassert 'segment' in seg.columns and len(seg) == 583, 'seg-ке segment бағанын қосыңыз (583 жол)'\nassert set(seg['segment'].unique()) == {0, 1, 2}, '3 кластер болуы керек'\nassert profile.shape[0] == 3, 'profile-да 3 жол'\nassert _np.allclose(_np.asarray(Z).mean(axis=0), 0, atol=1e-6), 'Z — StandardScaler-ден кейінгі деректер'\nassert profile['monthly_fee'].max() > 10000, 'Бір кластер premium клиенттер болуы керек (monthly_fee > 10 000)'\nassert profile['tenure_months'].max() - profile['tenure_months'].min() > 20, 'Масштабтағаннан кейін tenure бойынша да айырма көрінуі керек'", mustInclude: ['StandardScaler()', 'KMeans('], stdout: true }, hints: ['<code>Z = StandardScaler().fit_transform(seg[cols])</code>', '<code>seg[\'segment\'] = km.labels_</code>'] },
          { type: 'python', xp: 20, prompt: 'k = 2…6 үшін KMeans(n_init=10, random_state=0) үйретіп, <code>inertias[k]</code> мен <code>sils[k]</code> (silhouette_score) сөздіктерін толтырыңыз. Silhouette ең жоғары k-ны <code>best_k</code>-ға жазыңыз.', starter: "import pandas as pd\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.cluster import KMeans\nfrom sklearn.metrics import silhouette_score\ndf = pd.read_csv('churn.csv')\nZ = StandardScaler().fit_transform(df[['tenure_months', 'monthly_fee', 'data_gb', 'support_calls']].dropna())\ninertias = {}\nsils = {}\n", solution: "import pandas as pd\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.cluster import KMeans\nfrom sklearn.metrics import silhouette_score\ndf = pd.read_csv('churn.csv')\nZ = StandardScaler().fit_transform(df[['tenure_months', 'monthly_fee', 'data_gb', 'support_calls']].dropna())\ninertias = {}\nsils = {}\nfor k in range(2, 7):\n    km = KMeans(n_clusters=k, n_init=10, random_state=0).fit(Z)\n    inertias[k] = km.inertia_\n    sils[k] = silhouette_score(Z, km.labels_)\nbest_k = max(sils, key=sils.get)\nprint(inertias)\nprint(sils, best_k)", check: { tests: "assert sorted(inertias) == [2, 3, 4, 5, 6] and sorted(sils) == [2, 3, 4, 5, 6], 'k = 2, 3, 4, 5, 6 үшін мәндер керек'\nassert all(inertias[k] > inertias[k + 1] for k in range(2, 6)), 'Inertia k өскен сайын кемуі керек'\nassert all(-1 <= v <= 1 for v in sils.values()), 'Silhouette −1 мен 1 арасында'\nassert best_k == max(sils, key=sils.get), 'best_k — silhouette ең жоғары k'\nassert best_k == 2, 'Бұл деректе silhouette k=2-ні таңдайды'", stdout: true }, hints: ['<code>for k in range(2, 7):</code>', '<code>silhouette_score(Z, km.labels_)</code>, <code>km.inertia_</code>'] },
          { type: 'quiz', xp: 10, prompt: 'Клиенттерді <code>monthly_fee</code> (₸) және <code>support_calls</code> бойынша масштабсыз KMeans-пен бөлдіңіз. Не болады?', options: ['Екі белгі тең әсер етеді', 'Кластерлер іс жүзінде тек monthly_fee бойынша бөлінеді: оның шкаласы мыңдаған есе үлкен', 'KMeans қате шығарады', 'Кластерлер тек support_calls бойынша бөлінеді'], answer: 1, explain: 'Евклид арақашықтығында 1000 ₸ айырма 1 қоңыраудан мың есе «үлкен». StandardScaler белгілерді теңестіреді.' }
        ]
      },
      {
        id: 'mp-9', title: 'Модельді түсіндіру: importance және SHAP', minutes: 16,
        body: `
<p>Менеджер «модель неге бұл клиентті қауіпті деді?» деп сұрайды. Түсіндірудің екі деңгейі бар: <b>глобалды</b> (жалпы қай белгілер маңызды) және <b>локалды</b> (нақты бір болжам неге осындай).</p>
<h3>1. feature_importances_</h3>
<p>Ағаш модельдерінде бар: әр белгі бөлінулерде impurity-ді қаншалық азайтқаны. Тез, бірақ екі кемшілігі бар: train-де есептеледі және мәні көп үздіксіз белгілерді асыра бағалайды.</p>
<h3>2. permutation_importance</h3>
<p>Идея өте қарапайым: test-те бір бағанды араластырып (shuffle) жіберіп, метрика қаншаға түскенін өлшейміз. Түссе — модель бұл белгіге сүйенеді. Түспесе — белгі пайдасыз.</p>
<h3>Қадамдап мысал: churn, RandomForest (max_depth=5)</h3>
<pre><code>from sklearn.inspection import permutation_importance
r = permutation_importance(rf, X_test, y_test, n_repeats=5,
                           random_state=0, scoring='roc_auc')
pd.Series(r.importances_mean, index=X_test.columns).sort_values()</code></pre>
<table>
<tr><th>Белгі</th><th>feature_importances_</th><th>permutation (AUC түсуі)</th></tr>
<tr><td>tenure_months</td><td>0.37</td><td>0.217</td></tr>
<tr><td>support_calls</td><td>0.14</td><td>0.041</td></tr>
<tr><td>data_gb</td><td>0.14</td><td>0.000</td></tr>
<tr><td>age</td><td>0.11</td><td>−0.007</td></tr>
<tr><td>has_contract</td><td>0.07</td><td>0.070</td></tr>
</table>
<ol>
<li>Екі әдіс те tenure_months-ты бірінші қояды.</li>
<li>data_gb мен age impurity бойынша «маңызды», бірақ араластырғанда AUC өзгермейді — олар train-дегі шуды бөлуге ғана қолданылған.</li>
<li>Permutation Pipeline-дың шикі бағандарымен жұмыс істейді: <code>city</code> бір белгі ретінде бағаланады.</li>
</ol>
<p>Есте сақтаңыз: екі әдіс те «модель неге сүйенеді» дейді, «әлемде не себеп» демейді. LogisticRegression-да бәрі қарапайымырақ: масштабталған белгілердің коэффициенттері бағыт пен күшті көрсетеді (tenure −1.1, support_calls +0.8).</p>
<h3>3. SHAP (тұжырымдама)</h3>
<p>SHAP ойын теориясындағы Shapley мәндеріне сүйенеді: болжамды белгілер арасында «әділ бөледі». Әр клиент үшін: <b>болжам = базалық мән + белгілер үлестерінің қосындысы</b>. Мысалы: базалық 0.26, tenure = 3 ай +0.25, support_calls = 5 +0.12, has_contract = 1 −0.08 → 0.55. Бұл локалды түсіндіру. Браузерде <code>shap</code> пакеті жоқ; жұмыста <code>shap.TreeExplainer(model)</code> қолданылады.</p>
<div class="tip"><b>Жиі қателер:</b> (1) Importance-ты себеп-салдар деп түсіну: модель корреляцияны көреді. (2) Корреляцияланған белгілер маңыздылықты бөліседі, екеуі де «әлсіз» көрінуі мүмкін. (3) Permutation-ды train-де есептеу. (4) LogisticRegression коэффициенттерін масштабсыз салыстыру.</div>`,
        exercises: [
          { type: 'python', xp: 20, prompt: '<code>rf</code> Pipeline-ын train-де үйретіңіз. Ормандағы <code>feature_importances_</code>-ты <code>pre</code>-ның <code>get_feature_names_out()</code> атауларымен <code>imp</code> Series-ке жазып, кему ретімен сұрыптаңыз. Алғашқы 5-ін шығарыңыз.', starter: CHURN + PRE + "from sklearn.ensemble import RandomForestClassifier\nrf = Pipeline([('pre', pre), ('model', RandomForestClassifier(n_estimators=100, max_depth=5, random_state=0))])\nimp = None\n", solution: CHURN + PRE + "from sklearn.ensemble import RandomForestClassifier\nrf = Pipeline([('pre', pre), ('model', RandomForestClassifier(n_estimators=100, max_depth=5, random_state=0))])\nrf.fit(X_train, y_train)\nnames = rf.named_steps['pre'].get_feature_names_out()\nimp = pd.Series(rf.named_steps['model'].feature_importances_, index=names).sort_values(ascending=False)\nprint(imp.head(5).round(3))", check: { tests: "import pandas as _pd\nassert isinstance(imp, _pd.Series), 'imp — pandas Series'\nassert len(imp) == 14, 'Барлық 14 белгі болуы керек'\nassert abs(imp.sum() - 1) < 1e-6, 'feature_importances_ қосындысы 1'\nassert imp.index[0] == 'num__tenure_months', f'Ең маңызды белгі num__tenure_months болуы керек, сізде {imp.index[0]}'\nassert list(imp.values) == sorted(imp.values, reverse=True), 'Кему ретімен сұрыптаңыз (ascending=False)'", stdout: true }, hints: ['<code>rf.named_steps[\'pre\'].get_feature_names_out()</code>', '<code>pd.Series(rf.named_steps[\'model\'].feature_importances_, index=names).sort_values(ascending=False)</code>'] },
          { type: 'python', xp: 25, prompt: 'Үйретілген <code>rf</code> үшін test-те <code>permutation_importance</code> есептеңіз (n_repeats=5, random_state=0, scoring=\'roc_auc\'). <code>importances_mean</code>-ды <code>X_test.columns</code> атауларымен <code>perm</code> Series-ке жазып, кему ретімен сұрыптаңыз.', starter: CHURN + PRE + "from sklearn.ensemble import RandomForestClassifier\nfrom sklearn.inspection import permutation_importance\nrf = Pipeline([('pre', pre), ('model', RandomForestClassifier(n_estimators=100, max_depth=5, random_state=0))])\nrf.fit(X_train, y_train)\nperm = None\n", solution: CHURN + PRE + "from sklearn.ensemble import RandomForestClassifier\nfrom sklearn.inspection import permutation_importance\nrf = Pipeline([('pre', pre), ('model', RandomForestClassifier(n_estimators=100, max_depth=5, random_state=0))])\nrf.fit(X_train, y_train)\nr = permutation_importance(rf, X_test, y_test, n_repeats=5, random_state=0, scoring='roc_auc')\nperm = pd.Series(r.importances_mean, index=X_test.columns).sort_values(ascending=False)\nprint(perm.round(3))", check: { tests: "import pandas as _pd\nassert isinstance(perm, _pd.Series) and len(perm) == 8, 'perm — X_test-тің 8 бағаны бойынша Series'\nassert perm.index[0] == 'tenure_months', 'Ең маңызды — tenure_months'\nassert perm['tenure_months'] > 0.1, 'tenure_months араластырылса, AUC айтарлықтай түседі'\nassert perm['data_gb'] < 0.03, 'data_gb permutation бойынша маңызсыз шығуы керек (scoring=\\'roc_auc\\', X_test-те ме?)'\nassert list(perm.values) == sorted(perm.values, reverse=True), 'Кему ретімен сұрыптаңыз'", mustInclude: ['permutation_importance('], stdout: true }, hints: ['<code>permutation_importance(rf, X_test, y_test, n_repeats=5, random_state=0, scoring=\'roc_auc\')</code>', '<code>pd.Series(r.importances_mean, index=X_test.columns)</code>'] },
          { type: 'number', xp: 10, prompt: 'SHAP: базалық мән (орташа churn ықтималдығы) 0.26. Бір клиент үшін үлестер: tenure +0.25, support_calls +0.12, has_contract −0.08, қалғандары 0. Модельдің осы клиентке болжамы қанша?', answer: 0.55, tol: 0.001, explain: 'SHAP аддитивті: 0.26 + 0.25 + 0.12 − 0.08 = 0.55.' }
        ]
      },
      {
        id: 'mp-10', title: 'Модельді сақтау және model card', minutes: 14,
        body: `
<p>Модель ноутбукта қалса, ешкімге пайдасы жоқ. Оны файлға сақтап, басқа жерде (сервер, күнделікті скрипт) жүктейміз. Ең маңыздысы — <b>бүкіл Pipeline-ды</b> сақтау: imputer медианалары, scaler, one-hot категориялары модельмен бірге жүреді.</p>
<pre><code>import joblib
joblib.dump(model, 'churn_model.joblib')
loaded = joblib.load('churn_model.joblib')
loaded.predict(new_clients)      # шикі DataFrame беріледі</code></pre>
<h3>Model card: не құжаттау керек</h3>
<ul>
<li><b>Мақсат</b>: не болжайды, кім қолданады, қандай шешімге.</li>
<li><b>Деректер</b>: қайдан, қай кезең, қанша жол, бос мәндер қалай толтырылды.</li>
<li><b>Метрикалар</b>: test-тегі AUC, recall, precision, таңдалған threshold және оның бизнес негіздемесі.</li>
<li><b>Шектеулер</b>: қай жерде нашар жұмыс істейді, қандай белгілерге тәуелді.</li>
<li><b>Әділдік</b>: топтар бойынша метрикалар.</li>
<li>Нұсқа, күн, иесі, sklearn нұсқасы.</li>
</ul>
<h3>Қадамдап мысал: қала бойынша fairness</h3>
<p>Churn моделінің (LogisticRegression, threshold 0.5) test-тегі recall-ы:</p>
<table>
<tr><th>Қала</th><th>Test-те клиент</th><th>Кетушілер</th><th>Recall</th></tr>
<tr><td>Алматы</td><td>55</td><td>14</td><td>0.57</td></tr>
<tr><td>Астана</td><td>38</td><td>13</td><td>0.38</td></tr>
<tr><td>Қарағанды</td><td>16</td><td>5</td><td>0.40</td></tr>
<tr><td>Ақтөбе</td><td>20</td><td>3</td><td>0.00</td></tr>
<tr><td>Шымкент</td><td>21</td><td>4</td><td>0.00</td></tr>
</table>
<ol>
<li>Ақтөбе мен Шымкентте модель бірде-бір кетушіні таппады — бұл қалалардағы клиенттер жеңілдік ұсынысын алмайды.</li>
<li>Бірақ кетушілер тек 3–4: бір клиент recall-ды 0.25-ке өзгертеді. Бұл «модель әділетсіз» деген дәлел емес, «дерек аз, бақылау керек» деген белгі.</li>
<li>Model card-қа жазамыз: топ өлшемдері, метрикалар, ұсыныс (threshold-ты төмендету, деректі жинау).</li>
</ol>
<p>Model card — бюрократия емес. Жарты жылдан кейін модель нашарласа, сіз немесе әріптесіңіз «ол қандай деректе, қандай threshold-пен үйретілген еді?» деп сұрайды. Жауап сол бетте болуы керек. Fairness тексеруін әр қайта үйретуден кейін қайталаңыз: деректер өзгереді, топтар арасындағы айырма да өзгереді.</p>
<div class="tip"><b>Жиі қателер:</b> (1) Тек модельді сақтап, preprocessing-ті ұмыту. (2) Басқа sklearn нұсқасында жүктеу — ескерту немесе қате. (3) Белгісіз көзден келген .joblib/.pickle файлын ашу: ол код орындай алады. (4) Fairness-ті тек жалпы accuracy-мен тексеру.</div>`,
        exercises: [
          { type: 'python', xp: 20, prompt: 'Үйретілген <code>model</code>-ді <code>joblib.dump</code>-пен <code>churn_model.joblib</code> файлына сақтаңыз, сосын <code>loaded</code>-қа қайта жүктеңіз. Екеуінің X_test-тегі болжамдары бірдей ме — <code>same</code> (bool) айнымалысына жазыңыз.', starter: CHURN + PRE + "import joblib\nfrom sklearn.linear_model import LogisticRegression\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nloaded = None\n", solution: CHURN + PRE + "import joblib\nfrom sklearn.linear_model import LogisticRegression\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\njoblib.dump(model, 'churn_model.joblib')\nloaded = joblib.load('churn_model.joblib')\nsame = bool((loaded.predict(X_test) == model.predict(X_test)).all())\nprint(same)", check: { tests: "import os as _os\nfrom sklearn.pipeline import Pipeline as _P\nassert _os.path.exists('churn_model.joblib'), 'churn_model.joblib файлы табылмады: joblib.dump(model, ...)'\nassert isinstance(loaded, _P), 'loaded — жүктелген Pipeline (joblib.load)'\nassert loaded is not model, 'loaded файлдан жүктелуі керек'\nassert bool(same) is True, 'same = (loaded.predict(X_test) == model.predict(X_test)).all() → True'", mustInclude: ['joblib.dump(', 'joblib.load('], stdout: true }, hints: ['<code>joblib.dump(model, \'churn_model.joblib\')</code>', '<code>same = bool((loaded.predict(X_test) == model.predict(X_test)).all())</code>'] },
          { type: 'python', xp: 25, prompt: 'Fairness тексеруі. <code>res</code> кестесінде test-тегі қала, шын мән және болжам бар. Әр қала үшін recall есептеп, <code>by_city</code> Series-ке жазыңыз (индекс — қала). Әр қаладағы кетушілер санын <code>churners</code> Series-ке жазыңыз.', starter: CHURN + PRE + "from sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import recall_score\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nres = pd.DataFrame({'city': X_test['city'], 'y': y_test, 'pred': model.predict(X_test)})\nby_city = None\n", solution: CHURN + PRE + "from sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import recall_score\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))]).fit(X_train, y_train)\nres = pd.DataFrame({'city': X_test['city'], 'y': y_test, 'pred': model.predict(X_test)})\nby_city = res.groupby('city').apply(lambda g: recall_score(g['y'], g['pred'], zero_division=0), include_groups=False)\nchurners = res.groupby('city')['y'].sum()\nprint(pd.DataFrame({'recall': by_city.round(2), 'churners': churners}))", check: { tests: "from sklearn.metrics import recall_score as _rs\nassert by_city is not None and len(by_city) == 5, 'by_city-де 5 қала болуы керек'\nfor _c, _g in res.groupby('city'):\n    assert abs(by_city[_c] - _rs(_g['y'], _g['pred'], zero_division=0)) < 1e-9, f'{_c} үшін recall дұрыс емес'\nassert abs(by_city['Алматы'] - 8 / 14) < 1e-9, 'Алматыда recall = 8/14 ≈ 0.57'\nassert int(churners['Ақтөбе']) == 3 and int(churners.sum()) == 39, 'churners — әр қаладағы y.sum()'", stdout: true }, hints: ['<code>res.groupby(\'city\').apply(lambda g: recall_score(g[\'y\'], g[\'pred\'], zero_division=0), include_groups=False)</code>', 'Немесе цикл: <code>for c, g in res.groupby(\'city\'):</code>'] },
          { type: 'rubric', xp: 30, minWords: 80, done: 'Model card-ты жоба репозиторийіндегі MODEL_CARD.md файлына салыңыз.', prompt: 'Churn моделі үшін қысқа <b>model card</b> жазыңыз (кемінде 80 сөз): мақсат, деректер, метрикалар мен threshold, шектеулер, қалалар бойынша әділдік. Сосын оны төрт критерий бойынша адал бағалаңыз. Өту үшін әр критерий кемінде <b>3 / 4</b>.', criteria: [
            { name: 'Мақсат және қолданушы', levels: ['Айтылмаған', '«Churn болжайды» ғана', 'Кім, қандай шешім үшін қолданатыны айтылған', 'Шешім, қолданушы және модель НЕ үшін қолданылмауы керегі айтылған'] },
            { name: 'Деректер мен метрикалар', levels: ['Сандар жоқ', 'Тек accuracy', 'Test AUC, recall, precision және жол саны', 'Метрикалар, threshold және оның бизнес құнымен негіздемесі'] },
            { name: 'Шектеулер', levels: ['Жоқ', 'Жалпы сөз («қателесуі мүмкін»)', 'Нақты шектеу (бос мәндер, аз дерек, синтетикалық)', 'Шектеулер және олардың шешімге әсері, қайта үйрету жоспары'] },
            { name: 'Әділдік', levels: ['Айтылмаған', '«Модель әділ» деген тұжырым', 'Қалалар бойынша recall келтірілген', 'Recall, топ өлшемдері, кіші таңдаманың ескертуі және нақты әрекет'] }
          ] }
        ]
      },
      {
        id: 'mp-ts', title: 'Уақыт қатары: уақыт бойынша бөлу, lag және rolling белгілер, baseline', minutes: 18,
        body: `
<p>Осы уақытқа дейін жолдардың реті маңызды болмады: пәтерлерді араластырсақ та, ештеңе өзгермейді. <b>Уақыт қатарында</b> (time series) рет — бәрі. Дүкен иесі сізден «ертең неше тауар сатылады?» деп сұрайды. Сіз тек <b>өткенді</b> білесіз.</p>
<p>Дерек: <code>sales_daily.csv</code> — дүкеннің 2024–2025 жылдардағы күнделікті сатылымы (730 күн). Бағандар: <code>date</code>, <code>sales</code> (дана), <code>promo</code> (сол күні акция болды ма, 0/1).</p>
<h3>Қатардың ішінде не бар</h3>
<ul>
<li><b>Тренд</b>: сатылым баяу өседі (2024 жылдың 1-тоқсанында орташа 199, 2025 жылдың 4-тоқсанында 253).</li>
<li><b>Апталық маусымдылық</b>: дүйсенбі–бейсенбі ≈ 210–220, жұма 241, сенбі 272, жексенбі 254.</li>
<li><b>Шу</b>: түсіндіруге келмейтін кездейсоқ ауытқу.</li>
</ul>
<h3>1-ереже: уақыт бойынша бөлу</h3>
<p><code>train_test_split</code> жолдарды кездейсоқ араластырады. Уақыт қатарында бұл — leakage: модель 15 наурызды болжау үшін 16 наурызды «көріп» қояды. Дұрысы: <b>өткен — train, болашақ — test</b>.</p>
<pre><code>df = pd.read_csv('sales_daily.csv', parse_dates=['date'])
train = df[df['date'] &lt; '2025-07-01']    # 547 күн
test = df[df['date'] &gt;= '2025-07-01']    # 183 күн</code></pre>
<h3>2-ереже: алдымен baseline</h3>
<table>
<tr><th>Baseline</th><th>Болжам</th><th>Код</th><th>Test MAE</th></tr>
<tr><td>Орташа</td><td>train-нің орташасы</td><td><code>train['sales'].mean()</code></td><td>30.7</td></tr>
<tr><td><b>Naive</b></td><td>ертең = бүгін</td><td><code>df['sales'].shift(1)</code></td><td>21.6</td></tr>
<tr><td><b>Seasonal naive</b></td><td>ертең = өткен аптаның сол күні</td><td><code>df['sales'].shift(7)</code></td><td><b>15.2</b></td></tr>
</table>
<p>Seasonal naive жеңеді, себебі апталық маусымдылық күшті: сенбіні өткен сенбімен салыстырған дұрыс. Кез келген модель осы 15.2-ден жақсы болуы керек, әйтпесе оның керегі жоқ.</p>
<h3>MAE және MAPE</h3>
<p><b>MAPE</b> — қатенің пайызбен орташасы: <code>mean(|шын − болжам| / шын) · 100</code>. Бизнеске түсінікті: «орташа 6%-ға қателесеміз».</p>
<ol>
<li>Шын мәндер: 200, 250, 300. Болжам: 210, 240, 330.</li>
<li>Қателер: 10, 10, 30. MAE = 50 / 3 ≈ 16.7 дана.</li>
<li>Пайыздар: 5%, 4%, 10%. MAPE = 19 / 3 ≈ 6.3%.</li>
</ol>
<h3>Lag және rolling белгілер</h3>
<p>Кәдімгі модельге (LinearRegression, boosting) уақыт қатарын беру үшін өткенді <b>белгіге</b> айналдырамыз:</p>
<pre><code>df['lag_1'] = df['sales'].shift(1)                      # кешегі сатылым
df['lag_7'] = df['sales'].shift(7)                      # апта бұрынғы
df['roll_7'] = df['sales'].shift(1).rolling(7).mean()   # соңғы 7 күннің орташасы
d = df.dropna()                                         # алғашқы 7 күнде lag жоқ</code></pre>
<ol>
<li><code>shift(1)</code> бағанды бір жол төмен жылжытады: әр күннің жолында кешегі мән тұрады.</li>
<li><code>rolling(7).mean()</code> — жылжымалы орташа. Алдында <code>shift(1)</code> міндетті: онсыз терезеге <b>бүгінгі</b> сатылым кіреді, ал біз дәл соны болжап отырмыз.</li>
<li><code>promo</code>-ны белгі ретінде қолдануға болады: акция алдын ала жоспарланады, ертеңгі мәні бүгін белгілі.</li>
<li>LinearRegression осы төрт белгімен test MAE = 13.1 береді (MAPE 5.2%). Апта күнін (<code>date.dt.dayofweek</code>, one-hot) қоссақ — 9.6.</li>
</ol>
<h3>TimeSeriesSplit: уақытты сақтайтын CV</h3>
<p>Кәдімгі K-fold та араластырады. <code>TimeSeriesSplit</code> әр fold-та train-ді ұзартып, келесі кезеңде тексереді:</p>
<table>
<tr><th>Fold</th><th>Train (жолдар)</th><th>Validation (жолдар)</th><th>MAE</th></tr>
<tr><td>1</td><td>1–147</td><td>148–291</td><td>14.2</td></tr>
<tr><td>2</td><td>1–291</td><td>292–435</td><td>11.6</td></tr>
<tr><td>3</td><td>1–435</td><td>436–579</td><td>14.6</td></tr>
<tr><td>4</td><td>1–579</td><td>580–723</td><td>12.9</td></tr>
</table>
<div class="tip">Бұл сабақта <b>бір күн алға</b> болжаймыз: lag_1 ретінде кешегі нақты сатылым белгілі. 30 күн алға болжау үшін lag_1 жоқ: не lag-ты горизонтқа сай алу керек (lag_30), не болжамды кезекпен өз кірісіне беру керек. Сұхбатта «горизонт қандай?» деп міндетті түрде нақтылаңыз.</div>
<h3>Жиі қателер</h3>
<ul>
<li>Уақыт қатарын кездейсоқ бөлу немесе кәдімгі <code>KFold(shuffle=True)</code> қолдану.</li>
<li><code>rolling</code>-ты <code>shift(1)</code>-сіз есептеу: target белгінің ішіне кіріп кетеді.</li>
<li>Baseline-сыз модель құру. «MAE = 13» жақсы ма? Seasonal naive 15.2 екенін білмесеңіз, айта алмайсыз.</li>
<li>Мәндер 0-ге жақын қатарда MAPE қолдану: нөлге бөлу, пайыз шексіз өседі.</li>
<li>Болжам кезінде белгісіз болатын белгіні қосу (мысалы, сол күнгі клиенттер саны).</li>
</ul>`,
        exercises: [
          { type: 'python', xp: 20, prompt: 'Деректі уақыт бойынша бөліңіз: <code>train</code> — <code>2025-07-01</code>-ге дейінгі жолдар, <code>test</code> — сол күннен бастап. Екі baseline жасаңыз: <code>df[\'naive\']</code> = кешегі сатылым, <code>df[\'snaive\']</code> = 7 күн бұрынғы сатылым. Test кезеңіндегі MAE-лерін <code>mae_naive</code> және <code>mae_snaive</code>-ке жазыңыз. (Baseline бағандарын бөлуден <b>бұрын</b> қосыңыз.)', starter: SALES + "\n", solution: SALES + `
df['naive'] = df['sales'].shift(1)
df['snaive'] = df['sales'].shift(7)
train = df[df['date'] < '2025-07-01']
test = df[df['date'] >= '2025-07-01']
mae_naive = (test['sales'] - test['naive']).abs().mean()
mae_snaive = (test['sales'] - test['snaive']).abs().mean()
print(len(train), len(test), round(mae_naive, 2), round(mae_snaive, 2))`, check: { tests: SALEST + `_m = _d['date'] >= '2025-07-01'
_n = (_d['sales'] - _d['sales'].shift(1)).abs()[_m].mean()
_s = (_d['sales'] - _d['sales'].shift(7)).abs()[_m].mean()
assert len(train) == 547 and len(test) == 183, f"train 547, test 183 күн болуы керек, сізде {len(train)} және {len(test)}"
assert train['date'].max() < test['date'].min(), "Train-нің соңғы күні test-тің бірінші күнінен бұрын болуы керек"
assert abs(mae_naive - _n) < 1e-6, f"mae_naive ≈ {_n:.2f} болуы керек: shift(1), тек test кезеңінде"
assert abs(mae_snaive - _s) < 1e-6, f"mae_snaive ≈ {_s:.2f} болуы керек: shift(7), тек test кезеңінде"` }, hints: ['<code>df[\'naive\'] = df[\'sales\'].shift(1)</code>, <code>df[\'snaive\'] = df[\'sales\'].shift(7)</code>', '<code>test = df[df[\'date\'] &gt;= \'2025-07-01\']</code>, сосын <code>(test[\'sales\'] - test[\'naive\']).abs().mean()</code>'] },
          { type: 'python', xp: 25, prompt: '<code>df</code>-ке үш белгі қосыңыз: <code>lag_1</code>, <code>lag_7</code> және <code>roll_7</code> (соңғы 7 күннің орташасы, бүгінгі күнсіз). <code>d = df.dropna()</code>. Уақыт бойынша бөліп (<code>2025-07-01</code>), <code>LinearRegression</code>-ды <code>model</code> атымен <code>[\'lag_1\', \'lag_7\', \'roll_7\', \'promo\']</code> белгілерінде train-де үйретіңіз. Test-те <code>mae_model</code> және <code>mape_model</code> (пайызбен) есептеңіз.', starter: SALES + "from sklearn.linear_model import LinearRegression\nF = ['lag_1', 'lag_7', 'roll_7', 'promo']\n", solution: SALES + `from sklearn.linear_model import LinearRegression
F = ['lag_1', 'lag_7', 'roll_7', 'promo']
df['lag_1'] = df['sales'].shift(1)
df['lag_7'] = df['sales'].shift(7)
df['roll_7'] = df['sales'].shift(1).rolling(7).mean()
d = df.dropna()
train = d[d['date'] < '2025-07-01']
test = d[d['date'] >= '2025-07-01']
model = LinearRegression().fit(train[F], train['sales'])
pred = model.predict(test[F])
mae_model = np.abs(test['sales'] - pred).mean()
mape_model = (np.abs(test['sales'] - pred) / test['sales']).mean() * 100
print(round(mae_model, 2), round(mape_model, 2))`, check: { tests: SALEST + `from sklearn.linear_model import LinearRegression as _LR
assert abs(df.loc[7, 'roll_7'] - _d['sales'].iloc[0:7].mean()) < 1e-9, "roll_7 бүгінгі сатылымды қамтымауы керек: df['sales'].shift(1).rolling(7).mean()"
assert abs(df.loc[7, 'lag_1'] - _d['sales'].iloc[6]) < 1e-9 and abs(df.loc[7, 'lag_7'] - _d['sales'].iloc[0]) < 1e-9, "lag_1 = shift(1), lag_7 = shift(7)"
_d['lag_1'] = _d['sales'].shift(1); _d['lag_7'] = _d['sales'].shift(7); _d['roll_7'] = _d['sales'].shift(1).rolling(7).mean()
_d = _d.dropna()
_F = ['lag_1', 'lag_7', 'roll_7', 'promo']
_tr = _d[_d['date'] < '2025-07-01']; _te = _d[_d['date'] >= '2025-07-01']
_p = _LR().fit(_tr[_F], _tr['sales']).predict(_te[_F])
_mae = _np.abs(_te['sales'] - _p).mean()
_mape = (_np.abs(_te['sales'] - _p) / _te['sales']).mean() * 100
assert hasattr(model, 'coef_') and len(model.coef_) == 4, "model төрт белгіде үйретілуі керек"
assert abs(mae_model - _mae) < 1e-6, f"mae_model ≈ {_mae:.2f} болуы керек. Train: 2025-07-01-ге дейін, test: одан кейін"
assert abs(mape_model - _mape) < 1e-6, f"mape_model ≈ {_mape:.2f} (пайызбен): mean(|шын − болжам| / шын) * 100"` }, hints: ['<code>df[\'roll_7\'] = df[\'sales\'].shift(1).rolling(7).mean()</code>', 'MAPE: <code>(np.abs(test[\'sales\'] - pred) / test[\'sales\']).mean() * 100</code>'] },
          { type: 'python', xp: 25, prompt: 'Белгілер дайын (<code>d</code>, <code>F</code>). <code>TimeSeriesSplit(n_splits=4)</code> арқылы <code>LinearRegression</code>-ды <code>cross_val_score</code>-пен бағалаңыз (<code>scoring=\'neg_mean_absolute_error\'</code>). Әр fold-тың MAE-сін (оң сан) <code>cv_mae</code> массивіне, орташасын <code>cv_mean</code>-ге жазыңыз.', starter: SALESF + "from sklearn.model_selection import TimeSeriesSplit, cross_val_score\n", solution: SALESF + `from sklearn.model_selection import TimeSeriesSplit, cross_val_score
tscv = TimeSeriesSplit(n_splits=4)
cv_mae = -cross_val_score(LinearRegression(), d[F], d['sales'], cv=tscv, scoring='neg_mean_absolute_error')
cv_mean = cv_mae.mean()
print(cv_mae.round(2), round(cv_mean, 2))`, check: { tests: `import numpy as _np
from sklearn.model_selection import TimeSeriesSplit as _TS, cross_val_score as _cvs
from sklearn.linear_model import LinearRegression as _LR
_c = -_cvs(_LR(), d[F], d['sales'], cv=_TS(n_splits=4), scoring='neg_mean_absolute_error')
assert len(cv_mae) == 4, "cv_mae — 4 fold-тың MAE-сі"
assert all(v > 0 for v in cv_mae), "MAE оң болуы керек: cross_val_score теріс мән қайтарады, алдына минус қойыңыз"
assert _np.allclose(_np.asarray(cv_mae, dtype=float), _c, atol=1e-6), "MAE мәндері сәйкес емес: cv=TimeSeriesSplit(n_splits=4), scoring='neg_mean_absolute_error'"
assert abs(cv_mean - _c.mean()) < 1e-6, f"cv_mean ≈ {_c.mean():.2f} болуы керек"`, mustInclude: ['TimeSeriesSplit('] }, hints: ['<code>tscv = TimeSeriesSplit(n_splits=4)</code>, оны <code>cv=tscv</code> ретінде беріңіз', '<code>cv_mae = -cross_val_score(LinearRegression(), d[F], d[\'sales\'], cv=tscv, scoring=\'neg_mean_absolute_error\')</code>'] },
          { type: 'quiz', xp: 10, prompt: 'Аналитик күнделікті сатылым дерегін <code>train_test_split(shuffle=True)</code>-пен бөліп, MAE = 8 алды. Production-да MAE = 15 болды. Ең ықтимал себеп?', options: ['Модель тым қарапайым', 'Кездейсоқ бөлуде test күндерінің екі жағындағы көрші күндер train-де болды: модель «болашақты» көріп үйренді', 'random_state дұрыс таңдалмаған', 'MAE уақыт қатарына жарамайды'], answer: 1, explain: 'Уақыт қатарында көрші күндер өте ұқсас. Кездейсоқ бөлу — leakage. Тек уақыт бойынша бөлу production-ға ұқсас баға береді.' }
        ]
      },
      {
        id: 'mp-gbm', title: 'Градиенттік бустинг практикада: CatBoost/XGBoost/LightGBM', minutes: 18,
        body: `
<p>Қазақстандағы Data Scientist вакансияларының үштен бірінде <b>CatBoost, XGBoost</b> немесе <b>LightGBM</b> аталады. Бұл үшеуі — gradient boosting-тің өндірістік нұсқалары: кестелік деректе (банк, телеком, ритейл) олар әдетте ең күшті модельдер. Идеясын өткен сабақта көрдіңіз: ағаштар кезекпен қате түзейді. Енді — практикада қалай баптайды.</p>
<p>Браузерде бұл кітапханалар жоқ, сондықтан sklearn-нің <code>HistGradientBoostingClassifier</code>-ін қолданамыз. Ол LightGBM-ге еліктеп жасалған, параметрлері бір-біріне оңай аударылады.</p>
<h3>Параметрлер сөздігі</h3>
<table>
<tr><th>Мағынасы</th><th>sklearn HistGB</th><th>XGBoost</th><th>LightGBM</th><th>CatBoost</th></tr>
<tr><td>Ағаш саны</td><td><code>max_iter</code></td><td><code>n_estimators</code></td><td><code>n_estimators</code></td><td><code>iterations</code></td></tr>
<tr><td>Қадам</td><td><code>learning_rate</code></td><td><code>learning_rate</code></td><td><code>learning_rate</code></td><td><code>learning_rate</code></td></tr>
<tr><td>Ағаш өлшемі</td><td><code>max_depth</code>, <code>max_leaf_nodes</code></td><td><code>max_depth</code></td><td><code>num_leaves</code></td><td><code>depth</code></td></tr>
<tr><td>L2 регуляризация</td><td><code>l2_regularization</code></td><td><code>reg_lambda</code></td><td><code>reg_lambda</code></td><td><code>l2_leaf_reg</code></td></tr>
<tr><td>Ерте тоқтату</td><td><code>early_stopping</code>, <code>n_iter_no_change</code></td><td><code>early_stopping_rounds</code></td><td><code>lgb.early_stopping()</code></td><td><code>early_stopping_rounds</code></td></tr>
<tr><td>Категориялар</td><td><code>categorical_features</code></td><td><code>enable_categorical</code></td><td><code>categorical_feature</code></td><td><code>cat_features</code></td></tr>
</table>
<h3>Early stopping: ағаш санын модель өзі табады</h3>
<p>Ағаш тым көп болса, boosting шуды жаттай бастайды. Қанша ағаш керек? Қолмен іздеудің орнына: train-нен <b>validation</b> бөлігін бөліп аламыз. Әр жаңа ағаштан кейін validation қатесін өлшейміз. Ол қатарынан N қадам жақсармаса — тоқтаймыз.</p>
<pre><code>from sklearn.ensemble import HistGradientBoostingClassifier
es = HistGradientBoostingClassifier(
    max_iter=300, learning_rate=0.1, max_depth=3,
    early_stopping=True,        # әдепкіде тек 10 000+ жолда қосылады
    validation_fraction=0.2,    # train-нің 20%-ы validation-ға
    n_iter_no_change=10,        # 10 қадам жақсармаса, тоқта
    random_state=0)
es.fit(X_train[num], y_train)
print(es.n_iter_)               # 39</code></pre>
<table>
<tr><th>Модель</th><th>Нақты ағаш саны</th><th>Test AUC</th></tr>
<tr><td>300 ағаш, early stopping жоқ</td><td>300</td><td>0.711</td></tr>
<tr><td>300-ге дейін, early stopping бар</td><td><b>39</b></td><td><b>0.787</b></td></tr>
</table>
<ol>
<li><code>max_iter=300</code> — тек жоғарғы шек. Модель 39-да тоқтады: validation қатесі одан әрі жақсармады.</li>
<li>Ерте тоқтатусыз 300 ағаштың бәрі өсті де, модель train-ді жаттап алды: test AUC 0.711.</li>
<li>Тәжірибедегі рецепт: <code>learning_rate</code>-ті кішкентай (0.03–0.1), ағаш шегін үлкен қойып, санын early stopping-ке тапсыру.</li>
</ol>
<div class="tip">Early stopping-тің validation бөлігі <b>test емес</b>. Test-ке қарап тоқтасаңыз, ағаш санын test-ке бейімдейсіз — бұл leakage. Үш бөлік: train (үйрену), validation (тоқтау), test (соңғы баға).</div>
<h3>Категориялық белгілер: one-hot керек емес</h3>
<p>Заманауи boosting категорияны тікелей қабылдайды: ағаш «қала ∈ {Алматы, Астана}» деп бірден бөле алады. One-hot-қа қарағанда жылдам, ал категория көп болғанда (жүздеген қала) сапасы да жоғары.</p>
<pre><code>for c in ['city', 'plan']:
    X[c] = X[c].astype('category')      # pandas-тың category типі
model = HistGradientBoostingClassifier(
    categorical_features='from_dtype',  # category бағандарын өзі табады
    max_iter=300, early_stopping=True, random_state=0)</code></pre>
<p>Бұл модельге imputer де, scaler де, encoder де керек емес: NaN мен категорияны өзі өңдейді. Churn-де test AUC = 0.794.</p>
<h3>Сол код CatBoost пен LightGBM-де (оқу үшін)</h3>
<pre><code>from catboost import CatBoostClassifier
model = CatBoostClassifier(iterations=1000, learning_rate=0.05, depth=4,
                           eval_metric='AUC', early_stopping_rounds=50,
                           random_seed=0, verbose=100)
model.fit(X_train, y_train,
          cat_features=['city', 'plan'],     # мәтін бағандарын тікелей береміз
          eval_set=(X_val, y_val))           # early stopping осында қарайды
print(model.get_best_iteration())</code></pre>
<pre><code>import lightgbm as lgb
model = lgb.LGBMClassifier(n_estimators=1000, learning_rate=0.05,
                           num_leaves=15, random_state=0)
model.fit(X_train, y_train,
          eval_set=[(X_val, y_val)], eval_metric='auc',
          callbacks=[lgb.early_stopping(50)])
print(model.best_iteration_)</code></pre>
<p>Құрылымы бірдей: үлкен ағаш шегі, кішкентай learning_rate, бөлек <code>eval_set</code>, ерте тоқтату. CatBoost-тың күшті жағы — категориялар (атауы да содан: <i>Cat</i>egorical <i>Boost</i>ing) және әдепкі параметрлерінің жақсылығы. LightGBM — үлкен деректегі жылдамдық. XGBoost — ең ескі және кең тараған.</p>
<h3>Жиі қателер</h3>
<ul>
<li>Early stopping үшін test-ті <code>eval_set</code> ретінде беру.</li>
<li><code>n_estimators=100</code> әдепкі мәнін қалдырып, learning_rate-ті ғана өзгерту.</li>
<li>Категорияны <code>LabelEncoder</code>-мен 0, 1, 2 санына айналдырып, сандық белгі ретінде беру: модель «Алматы &lt; Астана &lt; Шымкент» деген жалған рет көреді. Category типін немесе <code>cat_features</code> қолданыңыз.</li>
<li>Boosting-ке StandardScaler қою: ағашқа масштаб әсер етпейді.</li>
<li>Аз деректе (бірнеше жүз жол) boosting міндетті түрде жеңеді деп күту. Churn-де LogisticRegression (0.81) әлі алда. Boosting-тің артықшылығы мыңдаған жол мен күрделі байланыстарда ашылады.</li>
</ul>`,
        exercises: [
          { type: 'python', xp: 25, prompt: 'Сандық бағандарда (<code>X_train[num]</code>) екі <code>HistGradientBoostingClassifier</code> үйретіңіз, екеуінде де <code>max_iter=300, learning_rate=0.1, max_depth=3, random_state=0</code>. <code>full</code>: <code>early_stopping=False</code>. <code>es</code>: <code>early_stopping=True, validation_fraction=0.2, n_iter_no_change=10</code>. Нақты ағаш сандарын (<code>n_iter_</code>) <code>n_full</code>, <code>n_es</code>-ке, test ROC AUC-терін <code>auc_full</code>, <code>auc_es</code>-ке жазыңыз.', starter: CHURN + "from sklearn.ensemble import HistGradientBoostingClassifier\nfrom sklearn.metrics import roc_auc_score\n", solution: CHURN + `from sklearn.ensemble import HistGradientBoostingClassifier
from sklearn.metrics import roc_auc_score
full = HistGradientBoostingClassifier(max_iter=300, learning_rate=0.1, max_depth=3, early_stopping=False, random_state=0).fit(X_train[num], y_train)
es = HistGradientBoostingClassifier(max_iter=300, learning_rate=0.1, max_depth=3, early_stopping=True, validation_fraction=0.2, n_iter_no_change=10, random_state=0).fit(X_train[num], y_train)
n_full, n_es = full.n_iter_, es.n_iter_
auc_full = roc_auc_score(y_test, full.predict_proba(X_test[num])[:, 1])
auc_es = roc_auc_score(y_test, es.predict_proba(X_test[num])[:, 1])
print(n_full, n_es, round(auc_full, 3), round(auc_es, 3))`, check: { tests: `from sklearn.ensemble import HistGradientBoostingClassifier as _H
from sklearn.metrics import roc_auc_score as _ras
_e = _H(max_iter=300, learning_rate=0.1, max_depth=3, early_stopping=True, validation_fraction=0.2, n_iter_no_change=10, random_state=0).fit(X_train[num], y_train)
_a = _ras(y_test, _e.predict_proba(X_test[num])[:, 1])
assert n_full == 300, f"Early stopping-сіз модель барлық 300 ағашты өсіруі керек, сізде {n_full}: early_stopping=False"
assert n_es == _e.n_iter_, f"n_es = {_e.n_iter_} болуы керек: early_stopping=True, validation_fraction=0.2, n_iter_no_change=10, random_state=0"
assert abs(auc_es - _a) < 1e-6, f"auc_es ≈ {_a:.3f} болуы керек (test-те, predict_proba)"
assert 0.5 < auc_full < auc_es, "Бұл деректе ерте тоқтаған модель test-те жақсырақ болуы керек"`, mustInclude: ['HistGradientBoostingClassifier(', 'early_stopping=True'] }, hints: ['<code>HistGradientBoostingClassifier(max_iter=300, learning_rate=0.1, max_depth=3, early_stopping=True, validation_fraction=0.2, n_iter_no_change=10, random_state=0)</code>', 'Ағаш саны: <code>es.n_iter_</code>. AUC: <code>roc_auc_score(y_test, es.predict_proba(X_test[num])[:, 1])</code>'] },
          { type: 'python', xp: 25, prompt: 'Категорияларды one-hot-сыз беріңіз. (1) <code>X</code>-тегі <code>city</code> мен <code>plan</code>-ды <code>category</code> типіне айналдырыңыз. (2) <code>train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)</code>. (3) <code>model</code> = <code>HistGradientBoostingClassifier(categorical_features=\'from_dtype\', max_iter=300, learning_rate=0.1, max_depth=3, early_stopping=True, validation_fraction=0.2, n_iter_no_change=10, random_state=0)</code>, барлық бағанда үйретіңіз. Test ROC AUC → <code>auc_cat</code>.', starter: "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import HistGradientBoostingClassifier\nfrom sklearn.metrics import roc_auc_score\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat].copy()\ny = df['churned']\n", solution: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import HistGradientBoostingClassifier
from sklearn.metrics import roc_auc_score
df = pd.read_csv('churn.csv')
num = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']
cat = ['city', 'plan']
X = df[num + cat].copy()
y = df['churned']
for c in cat:
    X[c] = X[c].astype('category')
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
model = HistGradientBoostingClassifier(categorical_features='from_dtype', max_iter=300, learning_rate=0.1, max_depth=3, early_stopping=True, validation_fraction=0.2, n_iter_no_change=10, random_state=0)
model.fit(X_train, y_train)
auc_cat = roc_auc_score(y_test, model.predict_proba(X_test)[:, 1])
print(model.n_iter_, round(auc_cat, 3))`, check: { tests: `from sklearn.ensemble import HistGradientBoostingClassifier as _H
from sklearn.metrics import roc_auc_score as _ras
assert str(X_train['city'].dtype) == 'category' and str(X_train['plan'].dtype) == 'category', "city мен plan category типінде болуы керек: X[c] = X[c].astype('category')"
assert len(X_train) == 450 and len(X_test) == 150 and X_train.shape[1] == 8, "Бөлу: test_size=0.25, барлық 8 баған"
assert hasattr(model, 'is_categorical_') and model.is_categorical_ is not None and int(model.is_categorical_.sum()) == 2, "Модель екі категориялық бағанды көруі керек: categorical_features='from_dtype'"
_m = _H(categorical_features='from_dtype', max_iter=300, learning_rate=0.1, max_depth=3, early_stopping=True, validation_fraction=0.2, n_iter_no_change=10, random_state=0).fit(X_train, y_train)
_a = _ras(y_test, _m.predict_proba(X_test)[:, 1])
assert abs(auc_cat - _a) < 1e-6, f"auc_cat ≈ {_a:.3f} болуы керек: параметрлерді және random_state=0 тексеріңіз"`, mustInclude: ['from_dtype'] }, hints: ['<code>for c in cat: X[c] = X[c].astype(\'category\')</code> — бөлуден бұрын', '<code>roc_auc_score(y_test, model.predict_proba(X_test)[:, 1])</code>'] },
          { type: 'quiz', xp: 10, prompt: 'Әріптесіңіз CatBoost-ты былай үйретті: <code>model.fit(X_train, y_train, eval_set=(X_test, y_test))</code>, <code>early_stopping_rounds=50</code>. Сосын сол <code>X_test</code>-те AUC = 0.86 деп есеп берді. Мәселе неде?', options: ['Мәселе жоқ, бұл стандартты тәсіл', 'Ағаш саны test-ке қарап таңдалды, сондықтан 0.86 тым оптимистік: eval_set үшін train-нен бөлек validation керек', 'early_stopping_rounds тым үлкен', 'CatBoost-қа eval_set беруге болмайды'], answer: 1, explain: 'Early stopping — гиперпараметр (ағаш саны) таңдау. Оны test-те жасасаңыз, test «көрілген» болады. Train → validation (тоқтау) → test (бір рет бағалау).' },
          { type: 'quiz', xp: 10, prompt: 'LightGBM коды: <code>LGBMClassifier(n_estimators=2000, learning_rate=0.03)</code> + <code>callbacks=[lgb.early_stopping(100)]</code>. Үйретуден кейін <code>model.best_iteration_</code> = 412. Бұл нені білдіреді?', options: ['Модель 2000 ағаштың бәрін қолданады', 'Validation метрикасы 412-ағашта ең жақсы болды; одан кейін 100 қадам жақсармағандықтан үйрету тоқтады', 'Модель 412 секунд үйренді', '412 белгі маңызды деп табылды'], answer: 1, explain: 'n_estimators — жоғарғы шек. Early stopping ең жақсы итерацияны есте сақтайды: болжамда сол 412 ағаш қолданылады.' }
        ]
      },
      {
        id: 'mp-pca', title: 'PCA және өлшемді азайту', minutes: 15,
        body: `
<p>Пәтердің бөлме саны мен ауданы бір нәрсені айтады: пәтер қаншалық үлкен. Екі баған, бірақ ақпарат біреу дерлік (корреляциясы 0.92). Белгі 5 емес, 500 болса, мұндай қайталау көп: модель баяулайды, overfitting өседі, деректі графикке салу мүмкін емес.</p>
<p><b>PCA</b> (Principal Component Analysis) белгілерді <b>жаңа осьтерге</b> бұрады. Бірінші ось (PC1) деректің ең көп шашырайтын бағыты. Екіншісі (PC2) — оған перпендикуляр, қалған шашыраудың ең көбін алады. Соңғы осьтерде ақпарат аз, оларды тастауға болады.</p>
<h3>Қадамдап мысал: flats-тың 5 сандық белгісі</h3>
<pre><code>from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

num = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']
Xs = StandardScaler().fit_transform(flats[num])
pca = PCA(n_components=2)
X2 = pca.fit_transform(Xs)                 # (400, 2)
print(pca.explained_variance_ratio_)       # [0.387 0.306]</code></pre>
<ol>
<li><b>Алдымен масштаб.</b> PCA дисперсияға қарайды. Масштабсыз ең үлкен сандары бар баған жеңеді: шикі деректе PC1 іс жүзінде жай <code>area_m2</code> (салмағы 0.97).</li>
<li><code>explained_variance_ratio_</code>: PC1 жалпы шашыраудың 38.7%-ын, PC2 30.6%-ын сақтайды. Екеуі бірге 69%.</li>
<li><code>pca.components_</code> әр осьтің «рецептін» көрсетеді. PC1 ≈ 0.69 · rooms + 0.69 · area_m2 — «пәтердің өлшемі». PC2 ≈ 0.69 · floor + 0.70 · floors_total — «үйдің биіктігі».</li>
</ol>
<table>
<tr><th>Компонент саны</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr>
<tr><td>Жинақталған дисперсия</td><td>0.387</td><td>0.693</td><td>0.891</td><td>0.983</td><td>1.000</td></tr>
</table>
<p>Жиі қолданылатын ереже: дисперсияның 90–95%-ын сақтайтын компонент санын алу. Мұнда 90% үшін 4 компонент керек (3-еуі 89.1% береді). Қысқа жолы: <code>PCA(n_components=0.9)</code>.</p>
<h3>PCA не үшін қолданылады</h3>
<ul>
<li><b>Визуализация</b>: 20 белгіні 2 оське түсіріп, scatter plot салу; кластерлерді (KMeans) көзбен көру.</li>
<li><b>Қысу және шу азайту</b>: жүздеген корреляцияланған белгі (сенсорлар, сауалнама, сурет пиксельдері).</li>
<li><b>Модель алдындағы қадам</b>: Pipeline ішінде <code>StandardScaler → PCA → модель</code>.</li>
</ul>
<p>Қысудың бағасы бар. Flats-та LinearRegression-ның 5-fold R²: барлық 5 белгімен 0.663, 3 компонентпен 0.644, 2 компонентпен 0.535. PCA target-ке қарамайды: ол шашырауды сақтайды, ал шашырауы аз белгі (<code>year_built</code>) баға үшін маңызды болуы мүмкін.</p>
<div class="tip">PCA — деректен үйренетін қадам. Оны да тек train-де <code>fit</code> етіп, Pipeline ішінде ұстаңыз, әйтпесе leakage.</div>
<h3>Жиі қателер</h3>
<ul>
<li>StandardScaler-сіз PCA жасау.</li>
<li>PCA-ны бүкіл деректе fit етіп, сосын бөлу.</li>
<li>Компоненттерді «белгі» сияқты түсіндіру: PC1 — бірнеше бағанның қоспасы, бизнеске оны түсіндіру қиын. Түсіндіру маңызды болса (скоринг), PCA қолданылмайды.</li>
<li>Категориялық one-hot бағандарға PCA қолдану: мағынасы аз.</li>
<li>5–10 белгілі деректе PCA-ны міндетті деп санау. Ол жүздеген белгіде пайдалы.</li>
</ul>`,
        exercises: [
          { type: 'python', xp: 20, prompt: 'Flats-тың 5 сандық белгісін <code>StandardScaler</code>-мен масштабтап (<code>Xs</code>), <code>PCA(n_components=2)</code>-ні <code>pca</code> атымен үйретіңіз. Түрлендірілген деректі <code>X2</code>-ге, әр компоненттің дисперсия үлесін <code>evr</code>-ге жазыңыз.', starter: PCAS + "\n", solution: PCAS + `
Xs = StandardScaler().fit_transform(X)
pca = PCA(n_components=2)
X2 = pca.fit_transform(Xs)
evr = pca.explained_variance_ratio_
print(X2.shape, evr.round(3))`, check: { tests: PCAT + `_e = _PCA(n_components=2).fit(_Xs).explained_variance_ratio_
_raw = _PCA(n_components=2).fit(X).explained_variance_ratio_
assert _np.asarray(X2).shape == (400, 2), "X2 — 400 жол, 2 баған: pca.fit_transform(Xs)"
assert len(evr) == 2, "evr — екі сан: pca.explained_variance_ratio_"
assert not _np.allclose(evr, _raw, atol=1e-3), "Алдымен масштабтаңыз: StandardScaler().fit_transform(X). Масштабсыз PC1 жай area_m2 болып шығады"
assert _np.allclose(evr, _e, atol=1e-6), f"evr ≈ {_e.round(3)} болуы керек"
assert abs(abs(_np.corrcoef(_np.asarray(X2)[:, 0], _Xs[:, 1])[0, 1]) - 1) < 0.1, "X2-нің бірінші бағаны area_m2-мен тығыз байланысты болуы керек"`, mustInclude: ['PCA('] }, hints: ['<code>Xs = StandardScaler().fit_transform(X)</code>', '<code>X2 = pca.fit_transform(Xs)</code>, <code>evr = pca.explained_variance_ratio_</code>'] },
          { type: 'python', xp: 25, prompt: 'Барлық компонентпен <code>PCA()</code> үйретіп, жинақталған дисперсия үлесін <code>cum</code> массивіне жазыңыз (<code>np.cumsum</code>). <code>n90</code> — дисперсияның кемінде 90%-ын сақтайтын ең аз компонент саны.', starter: PCAS + "Xs = StandardScaler().fit_transform(X)\n", solution: PCAS + `Xs = StandardScaler().fit_transform(X)
pca = PCA().fit(Xs)
cum = np.cumsum(pca.explained_variance_ratio_)
n90 = int(np.argmax(cum >= 0.9)) + 1
print(cum.round(3), n90)`, check: { tests: PCAT + `_c = _np.cumsum(_PCA().fit(_Xs).explained_variance_ratio_)
assert len(cum) == 5, "cum — 5 сан: барлық компоненттің жинақталған үлесі"
assert _np.allclose(_np.asarray(cum, dtype=float), _c, atol=1e-6), f"cum ≈ {_c.round(3)} болуы керек: np.cumsum(pca.explained_variance_ratio_)"
assert n90 == int(_np.argmax(_c >= 0.9)) + 1, "n90: cum >= 0.9 болатын бірінші орын (санау 1-ден). 3 компонент 0.891 береді — жетпейді"`, mustInclude: ['PCA('] }, hints: ['<code>cum = np.cumsum(PCA().fit(Xs).explained_variance_ratio_)</code>', '<code>np.argmax(cum &gt;= 0.9)</code> бірінші True-дың индексін береді (0-ден), оған 1 қосыңыз'] },
          { type: 'number', xp: 10, prompt: 'PCA үш компонент тапты, олардың дисперсиялары 6, 3 және 1. Алғашқы екі компонент жалпы дисперсияның қанша үлесін сақтайды?', answer: 0.9, tol: 0.005, explain: '(6 + 3) / (6 + 3 + 1) = 9 / 10 = 0.9. Үшінші компонентті тастасақ, ақпараттың 10%-ын ғана жоғалтамыз.' },
          { type: 'quiz', xp: 10, prompt: 'Деректе <code>income</code> (теңгемен, 100 000 – 2 000 000) және <code>age</code> (18–70) бар. Масштабсыз PCA жасасаңыз, не болады?', options: ['Ештеңе, PCA масштабқа тәуелсіз', 'PC1 толықтай дерлік income болады: оның дисперсиясы сандық тұрғыдан миллиондаған есе үлкен', 'PCA қате береді', 'age маңыздырақ болып шығады'], answer: 1, explain: 'PCA ең үлкен дисперсия бағытын іздейді. Бірлігі үлкен баған бәрін басып кетеді. Сондықтан алдымен StandardScaler.' }
        ]
      },
      {
        id: 'mp-text', title: 'Мәтін белгілері: TF-IDF + логистикалық регрессия', minutes: 16,
        body: `
<p>Маркетплейске күніне мыңдаған пікір түседі. Қайсысы шағым, қайсысы алғыс? Адам бәрін оқып үлгермейді. Модель мәтінді түсінбейді — оған <b>сандар</b> керек. Мәтінді сандарға айналдырудың ең қарапайым әрі әлі де мықты тәсілі — <b>TF-IDF</b>.</p>
<p>Дерек: <code>reviews.csv</code> — 300 қысқа пікір, қазақша және орысша (Қазақстандағы нақты деректегідей аралас). Бағандар: <code>text</code>, <code>label</code> (positive / negative), <code>lang</code>.</p>
<h3>Bag of words: сөздер қапшығы</h3>
<p>Әр бірегей сөз — бір баған. Әр пікір — бір жол. Ұяшықта — сөз сол пікірде неше рет кездеседі. Сөздердің реті жоғалады (сондықтан «қапшық»).</p>
<h3>TF-IDF: сирек сөз құндырақ</h3>
<p>«және», «и», «өте» сияқты сөздер барлық жерде кездеседі, олардан пайда аз. TF-IDF әр сөзге салмақ береді:</p>
<ul>
<li><b>TF</b> (term frequency): сөз осы пікірде қанша рет бар.</li>
<li><b>IDF</b> (inverse document frequency): сөз неғұрлым аз пікірде кездессе, соғұрлым жоғары. sklearn-де: <code>idf = ln((1 + n) / (1 + df)) + 1</code>, мұнда n — пікір саны, df — сөз кездесетін пікір саны.</li>
</ul>
<ol>
<li>Train-де 225 пікір бар. «және» сөзі 100 пікірде кездеседі делік: idf = ln(226 / 101) + 1 ≈ 1.81.</li>
<li>Ал «дөрекі» сөзі 3 пікірде ғана кездессе: idf = ln(226 / 4) + 1 ≈ 5.03. Салмағы шамамен 3 есе жоғары.</li>
<li>Соңында әр жол ұзындығы 1 болатындай нормаланады: ұзын және қысқа пікірлер теңеседі.</li>
</ol>
<h3>Қадамдап мысал</h3>
<pre><code>from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline

df = pd.read_csv('reviews.csv')
X_train, X_test, y_train, y_test = train_test_split(
    df['text'], df['label'], test_size=0.25, random_state=0, stratify=df['label'])

vec = TfidfVectorizer()
V_train = vec.fit_transform(X_train)   # сөздікті train-нен үйренеді
V_test = vec.transform(X_test)         # тек transform!
print(V_train.shape)                   # (225, 113): 113 бірегей сөз

model = Pipeline([('tfidf', TfidfVectorizer(ngram_range=(1, 2))),
                  ('clf', LogisticRegression(max_iter=1000))])
model.fit(X_train, y_train)
print(model.score(X_test, y_test))     # 0.947</code></pre>
<ol>
<li><code>TfidfVectorizer</code> мәтінді кіші әріпке түсіріп, сөздерге бөліп, матрица жасайды. Нәтиже — <b>sparse</b> матрица: ұяшықтардың көбі 0, жадта тек нөл еместері сақталады.</li>
<li>Белгі көп (жүздеген, нақты жобада он мыңдаған), әрқайсысы әлсіз. Мұндай деректе <b>LogisticRegression</b> — классикалық таңдау: жылдам, регуляризациясы бар (C параметрі), коэффициенттерін оқуға болады.</li>
<li><code>ngram_range=(1, 2)</code> жеке сөздерге қоса <b>қос сөздерді</b> (биграмма) де белгі етеді: «не понравилось», «сай емес», «өте нашар». Бір сөздік модель «понравилось» сөзін жақсы деп түсінеді, ал «не» бөлек тұрады. Мұнда accuracy 0.933 → 0.947.</li>
<li>Коэффициенттер: ең теріс n-грамма — «не», ең оң — «всем» («всем рекомендую»). «рекомендую» сөзінің өзі екі класта да бар («никому не рекомендую»), сондықтан модель көрші сөздерге сүйенеді.</li>
</ol>
<p>Модель қай жерде қателеседі? Аралас пікірлерде: «Курьер дөрекі екен бірақ тез жеткізді». Сөздер қапшығы «бірақ»-тан кейінгі бөліктің маңыздырақ екенін білмейді. Мұндай жағдайларды шешу үшін сөз ретін ескеретін модельдер (трансформерлер) керек, бірақ baseline ретінде TF-IDF + LogisticRegression әрқашан бірінші тексеріледі.</p>
<div class="tip">Қазақ тілі жалғамалы: «ұнады», «ұнамады», «ұнайды» — бір түбір, бірақ үш түрлі сөз-баған. Көмектесетін тәсіл: әріптік n-граммалар, <code>TfidfVectorizer(analyzer='char_wb', ngram_range=(2, 4))</code>. Ол сөздің бөліктерін («ұна», «мады») белгі етеді.</div>
<h3>Жиі қателер</h3>
<ul>
<li>Векторизаторды бүкіл деректе <code>fit</code> ету: сөздік пен IDF test-тен де үйренеді — leakage. Pipeline бұдан қорғайды.</li>
<li>Test-ке <code>fit_transform</code> шақыру: бағандар саны мен реті өзгереді, модель түсінбейді.</li>
<li>Sparse матрицаны <code>.toarray()</code>-мен толық массивке айналдыру: үлкен деректе жад жетпейді.</li>
<li>Тек accuracy-ге қарау: шағымдар сирек болса (5%), precision мен recall-ды тексеріңіз.</li>
<li>Қате жіктелген мысалдарды оқымау. Мәтінде қатені көзбен қарау — ең пайдалы диагностика.</li>
</ul>`,
        exercises: [
          { type: 'python', xp: 20, prompt: 'Бөлу дайын. <code>TfidfVectorizer()</code>-ді <code>vec</code> атымен жасап, train мәтіндерінен <code>V_train</code> матрицасын алыңыз. Test мәтіндерін <b>сол сөздікпен</b> <code>V_test</code>-ке түрлендіріңіз. Сөздіктегі сөздер санын <code>n_words</code>-ке жазыңыз.', starter: TEXT + "\n", solution: TEXT + `
vec = TfidfVectorizer()
V_train = vec.fit_transform(X_train)
V_test = vec.transform(X_test)
n_words = len(vec.vocabulary_)
print(V_train.shape, V_test.shape, n_words)`, check: { tests: `from sklearn.feature_extraction.text import TfidfVectorizer as _TV
_v = _TV().fit(X_train)
_n = len(_v.vocabulary_)
assert V_train.shape == (225, _n), f"V_train өлшемі (225, {_n}) болуы керек: vec.fit_transform(X_train)"
assert V_test.shape == (75, _n), f"V_test өлшемі (75, {_n}) болуы керек. Test-ке fit_transform емес, vec.transform(X_test) шақырыңыз"
assert n_words == _n, f"n_words = {_n}: len(vec.vocabulary_)"
assert abs(V_test.sum() - _v.transform(X_test).sum()) < 1e-6, "V_test train сөздігімен есептелуі керек: vec.transform(X_test)"`, mustInclude: ['TfidfVectorizer('] }, hints: ['<code>V_train = vec.fit_transform(X_train)</code>', '<code>V_test = vec.transform(X_test)</code>, <code>n_words = len(vec.vocabulary_)</code>'] },
          { type: 'python', xp: 25, prompt: '<code>model</code> атты Pipeline құрыңыз: қадамдары <code>\'tfidf\'</code> — <code>TfidfVectorizer(ngram_range=(1, 2))</code> және <code>\'clf\'</code> — <code>LogisticRegression(max_iter=1000)</code>. Train-де үйретіп, test accuracy-ін <code>acc</code>-қа жазыңыз. Коэффициенті ең теріс n-грамманы <code>top_neg</code>-ке, ең оңын <code>top_pos</code>-қа жазыңыз (<code>get_feature_names_out()</code> және <code>coef_[0]</code>).', starter: TEXT + "import numpy as np\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.pipeline import Pipeline\n", solution: TEXT + `import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
model = Pipeline([('tfidf', TfidfVectorizer(ngram_range=(1, 2))), ('clf', LogisticRegression(max_iter=1000))])
model.fit(X_train, y_train)
acc = model.score(X_test, y_test)
names = model['tfidf'].get_feature_names_out()
coef = model['clf'].coef_[0]
top_neg = names[np.argmin(coef)]
top_pos = names[np.argmax(coef)]
print(round(acc, 3), top_neg, '|', top_pos)`, check: { tests: `import numpy as _np
from sklearn.feature_extraction.text import TfidfVectorizer as _TV
from sklearn.linear_model import LogisticRegression as _LR
from sklearn.pipeline import Pipeline as _P
_m = _P([('tfidf', _TV(ngram_range=(1, 2))), ('clf', _LR(max_iter=1000))]).fit(X_train, y_train)
_nm = _m['tfidf'].get_feature_names_out(); _cf = _m['clf'].coef_[0]
assert isinstance(model, _P) and hasattr(model[-1], 'coef_'), "model — үйретілген Pipeline (tfidf + clf)"
assert len(model[0].vocabulary_) == len(_nm), f"Сөздікте {len(_nm)} n-грамма болуы керек: TfidfVectorizer(ngram_range=(1, 2))"
assert abs(acc - _m.score(X_test, y_test)) < 1e-6, f"acc ≈ {_m.score(X_test, y_test):.3f} болуы керек: model.score(X_test, y_test)"
assert str(top_neg) == str(_nm[_np.argmin(_cf)]), "top_neg — coef_[0] ең кіші n-грамма: names[np.argmin(coef)]"
assert str(top_pos) == str(_nm[_np.argmax(_cf)]), "top_pos — coef_[0] ең үлкен n-грамма: names[np.argmax(coef)]"`, mustInclude: ['ngram_range'] }, hints: ['<code>names = model[\'tfidf\'].get_feature_names_out()</code>, <code>coef = model[\'clf\'].coef_[0]</code>', '<code>top_neg = names[np.argmin(coef)]</code>. Оң коэффициент — <code>positive</code> класы, себебі <code>classes_</code> әліпби ретімен: negative, positive'] },
          { type: 'quiz', xp: 10, prompt: 'Неге «Товар не понравился» пікірін бір сөздік (unigram) модель жиі қате жіктейді, ал <code>ngram_range=(1, 2)</code> көмектеседі?', options: ['Биграммалар модельді жылдамдатады', 'Unigram-да «не» мен «понравился» бөлек белгілер, ал биграмма «не понравился» тіркесін бір белгі етіп, терістеуді ұстайды', 'Unigram орыс тілін қолдамайды', 'Биграммалар сөздікті кішірейтеді'], answer: 1, explain: 'Сөздер қапшығы ретті жоғалтады. Биграмма көрші екі сөзді бірге сақтап, «не + сөз» терістеуін белгіге айналдырады. Бағасы: сөздік бірнеше есе өседі (мұнда 113 → 429).' },
          { type: 'quiz', xp: 10, prompt: 'Әріптесіңіз <code>TfidfVectorizer().fit_transform(df[\'text\'])</code>-ты бүкіл деректе орындап, сосын train/test-ке бөлді. Не дұрыс емес?', options: ['Ештеңе, мәтінде leakage болмайды', 'Сөздік пен IDF салмақтары test мәтіндерінен де үйренді: бұл leakage. Векторизатор Pipeline ішінде тек train-де fit етілуі керек', 'TF-IDF-ті бөлуден кейін қолдануға болмайды', 'fit_transform орнына predict керек еді'], answer: 1, explain: 'Деректен үйренетін кез келген қадам (scaler, imputer, PCA, векторизатор) тек train-де fit етіледі.' }
        ]
      },
      {
        id: 'mp-ops', title: 'Модельді бақылау: MLflow, PSI дрейфі және out-of-time валидация', minutes: 18,
        body: `
<p>Модель production-ға шыққан күні оның жұмысы аяқталмайды — басталады. Әлем өзгереді: жалақы өседі, жаңа клиенттер келеді, экономика құбылады. Кеше жақсы істеген модель бүгін үнсіз нашарлайды. Қазақстандағы DS вакансияларының жартысына жуығында «модельді валидациялау және мониторинг: PSI, Gini, out-of-time» деген талап тұрады, әсіресе банктерде. Бұл сабақ — сол туралы.</p>
<p>Дерек: <code>loans.csv</code> — 1 260 несие өтінімі, 18 ай (2024-01 … 2025-06). Бағандар: <code>month</code>, <code>age</code>, <code>income</code> (мың ₸), <code>debt_ratio</code> (қарыз жүктемесі), <code>delays_12m</code> (кешіктірулер саны), <code>employment_years</code>, <code>default</code> (1 — несие қайтарылмады).</p>
<h3>1. Эксперименттерді есепке алу: MLflow</h3>
<p>Бір жобада жүздеген модель нұсқасы үйретіледі. Үш аптадан кейін «Gini 0.52 берген қай параметрлер еді?» деген сұраққа жауап жоқ. <b>MLflow</b> әр іске қосуды (run) журналға жазады:</p>
<pre><code>import mlflow
with mlflow.start_run(run_name='logreg_C1'):
    mlflow.log_param('C', 1.0)                  # параметрлер
    mlflow.log_param('train_period', '2024-01..2024-09')
    model.fit(X_train, y_train)
    mlflow.log_metric('gini_val', 0.47)         # метрикалар
    mlflow.log_metric('gini_oot', 0.41)
    mlflow.sklearn.log_model(model, 'model')    # модельдің өзі (артефакт)</code></pre>
<p>Нәтижесі — кесте: әр жол бір эксперимент, бағандары — параметрлер мен метрикалар. Ең жақсысын таңдап, <b>Model Registry</b>-ге тіркейсіз (нұсқа нөмірімен). Браузерде MLflow жоқ, бірақ идеясы қарапайым: <b>параметр + дерек кезеңі + метрика + модель файлы</b> бірге сақталады. Оны тіпті қарапайым сөздіктер тізімімен де жасауға болады.</p>
<h3>2. Out-of-time (OOT) валидация</h3>
<p>Кездейсоқ test модельге «сол кезеңнің басқа клиенттерін» береді. Ал production-да модель <b>болашақ</b> клиенттермен жұмыс істейді. OOT — модель мүлдем көрмеген кейінгі кезең:</p>
<table>
<tr><th>Бөлік</th><th>Кезең</th><th>Gini</th><th>Орташа болжам (PD)</th><th>Нақты default</th></tr>
<tr><td>Train (70%)</td><td>2024-01 … 2024-09</td><td>—</td><td>—</td><td>—</td></tr>
<tr><td>Validation (30%, кездейсоқ)</td><td>2024-01 … 2024-09</td><td>0.47</td><td>10.6%</td><td>11.6%</td></tr>
<tr><td><b>OOT</b></td><td>2025-01 … 2025-06</td><td><b>0.41</b></td><td><b>13.2%</b></td><td><b>23.3%</b></td></tr>
</table>
<ol>
<li>Gini 0.47-ден 0.41-ге түсті: модель клиенттерді ажыратуды сәл нашарлатты.</li>
<li>Одан да маңыздысы: модель 13.2% дефолт күтті, ал нақтысы 23.3%. Рет дұрыс дерлік, бірақ <b>деңгей</b> қате. Банк осы болжаммен резерв есептесе, шығынды екі есеге жуық кем бағалайды.</li>
<li>Шешім: <b>рекалибровка</b> (ықтималдықты жаңа дерекке сай қайта түзеу) немесе модельді жаңа кезеңде қайта үйрету.</li>
</ol>
<h3>3. PSI: дерек өзгерді ме?</h3>
<p>Дефолт фактісі несие берілгеннен кейін айлар өткенде ғана белгілі болады. Ал <b>кіріс деректің</b> өзгергенін бірден көруге болады. <b>PSI</b> (Population Stability Index) бір белгінің екі кезеңдегі таралуын салыстырады.</p>
<ol>
<li>Ескі кезеңдегі мәндерді топтарға (bin) бөлеміз, әдетте 10 квантиль.</li>
<li>Әр топ үшін: <code>e</code> — ескі кезеңдегі үлес, <code>a</code> — жаңа кезеңдегі үлес.</li>
<li><code>PSI = Σ (a − e) · ln(a / e)</code>.</li>
</ol>
<p>Қолмен мысал, 4 топ. Бұрын әр топта 25%-дан. Қазір: 10%, 20%, 30%, 40%.</p>
<table>
<tr><th>Топ</th><th>e</th><th>a</th><th>(a − e) · ln(a / e)</th></tr>
<tr><td>1</td><td>0.25</td><td>0.10</td><td>(−0.15) · ln(0.4) = 0.137</td></tr>
<tr><td>2</td><td>0.25</td><td>0.20</td><td>(−0.05) · ln(0.8) = 0.011</td></tr>
<tr><td>3</td><td>0.25</td><td>0.30</td><td>0.05 · ln(1.2) = 0.009</td></tr>
<tr><td>4</td><td>0.25</td><td>0.40</td><td>0.15 · ln(1.6) = 0.071</td></tr>
<tr><td colspan="3"><b>PSI</b></td><td><b>0.228</b></td></tr>
</table>
<table>
<tr><th>PSI</th><th>Түсіндірме</th><th>Әрекет</th></tr>
<tr><td>&lt; 0.1</td><td>тұрақты</td><td>ештеңе</td></tr>
<tr><td>0.1 – 0.25</td><td>орташа ығысу</td><td>бақылау, себебін іздеу</td></tr>
<tr><td>&gt; 0.25</td><td>қатты ығысу</td><td>модельді тексеру, рекалибровка немесе қайта үйрету</td></tr>
</table>
<p>Loans-та 2024 пен 2025 арасында: <code>income</code> PSI = <b>0.35</b> (номиналды жалақы өсті), <code>debt_ratio</code> 0.15, <code>age</code> 0.12, қалғандары 0.05-тен төмен. Модель «табыс 450 мың» дегенді 2024 жылғы мағынада түсінеді, ал 2025-те дәл сол сома басқа өмір деңгейін білдіреді. OOT-тегі қатенің бір себебі — осы.</p>
<div class="tip">PSI тек белгілерге емес, модельдің <b>скорына</b> да есептеледі: болжамдар таралуы өзгерсе, бұл — алғашқы дабыл. Мониторинг дашбордында әдетте үшеуі тұрады: белгілер PSI-і, скор PSI-і және (факт жеткенде) Gini.</div>
<h3>Жиі қателер</h3>
<ul>
<li>Модельді тек кездейсоқ test-пен бағалап, OOT жасамау.</li>
<li>PSI-де топ шекараларын жаңа деректен алу. Шекаралар әрқашан <b>ескі</b> (эталон) кезеңнен.</li>
<li>Бос топта <code>ln(0)</code>: үлестерді кішкентай санмен (мысалы 0.0001) төменнен шектеңіз.</li>
<li>PSI жоғары = модель нашар деп бірден шешу. PSI — тексеруге себеп; сапаны Gini мен калибровка көрсетеді.</li>
<li>Gini тұрақты болса, бәрі жақсы деп ойлау: Gini ретті өлшейді, ал PD деңгейі (калибровка) бөлек бұзылуы мүмкін.</li>
<li>Эксперимент нәтижесін жазбау: «қай дерекпен, қай параметрмен» деген сұрақ міндетті түрде туады.</li>
</ul>`,
        exercises: [
          { type: 'python', xp: 20, prompt: '<code>psi_from_shares(e, a)</code> функциясын жазыңыз: екі үлес массивін алып, <code>Σ (a − e) · ln(a / e)</code> қайтарады. Нөлге бөлмеу үшін алдымен екеуін де <code>np.clip(..., 0.0001, None)</code>-мен шектеңіз. Сабақтағы мысал үшін нәтижені <code>psi_example</code>-ге жазыңыз.', starter: "import numpy as np\ne = np.array([0.25, 0.25, 0.25, 0.25])\na = np.array([0.10, 0.20, 0.30, 0.40])\n\ndef psi_from_shares(e, a):\n    pass\n\npsi_example = None\n", solution: `import numpy as np
e = np.array([0.25, 0.25, 0.25, 0.25])
a = np.array([0.10, 0.20, 0.30, 0.40])

def psi_from_shares(e, a):
    e = np.clip(np.asarray(e, dtype=float), 0.0001, None)
    a = np.clip(np.asarray(a, dtype=float), 0.0001, None)
    return float(np.sum((a - e) * np.log(a / e)))

psi_example = psi_from_shares(e, a)
print(round(psi_example, 3))`, check: { tests: `import numpy as _np
assert psi_example is not None and abs(psi_example - 0.228217) < 1e-4, "psi_example ≈ 0.228 болуы керек: np.sum((a - e) * np.log(a / e))"
assert abs(psi_from_shares([0.5, 0.5], [0.5, 0.5])) < 1e-12, "Бірдей үлестерде PSI = 0"
assert abs(psi_from_shares([0.5, 0.5], [0.3, 0.7]) - 0.169460) < 1e-4, "psi_from_shares([0.5, 0.5], [0.3, 0.7]) ≈ 0.169 болуы керек"
_z = psi_from_shares([0.5, 0.5, 0.0], [0.4, 0.5, 0.1])
assert _np.isfinite(_z) and _z > 0, "Бос топта қате шықпауы керек: үлестерді np.clip(x, 0.0001, None)-мен шектеңіз"` }, hints: ['<code>e = np.clip(np.asarray(e, dtype=float), 0.0001, None)</code>, <code>a</code>-ға да солай', '<code>return float(np.sum((a - e) * np.log(a / e)))</code>'] },
          { type: 'python', xp: 25, prompt: 'Стартерде <code>psi(expected, actual)</code> дайын: ол ескі кезеңнен 10 квантильдік топ жасап, PSI қайтарады. <code>old</code> — 2024 жылғы, <code>new</code> — 2025 жылғы өтінімдер (<code>month</code> жолдық баған, <code>\'2025-01\'</code>-мен салыстырыңыз). <code>F</code> тізіміндегі әр белгі үшін PSI-ді <code>psi_table</code> сөздігіне жазыңыз. PSI &gt; 0.25 болған белгілерді <code>drifted</code> тізіміне жинаңыз.', starter: LOANS + PSIF + "psi_table = {}\n", solution: LOANS + PSIF + `psi_table = {}
old = df[df['month'] < '2025-01']
new = df[df['month'] >= '2025-01']
for f in F:
    psi_table[f] = psi(old[f], new[f])
drifted = [f for f in F if psi_table[f] > 0.25]
print({k: round(v, 3) for k, v in psi_table.items()}, drifted)`, check: { tests: `import pandas as _pd, numpy as _np
_d = _pd.read_csv('loans.csv')
_o = _d[_d['month'] < '2025-01']; _n = _d[_d['month'] >= '2025-01']
def _psi(ex, ac, bins=10):
    ex = _np.asarray(ex, dtype=float); ac = _np.asarray(ac, dtype=float)
    ed = _np.quantile(ex, _np.linspace(0, 1, bins + 1)); ed[0], ed[-1] = -_np.inf, _np.inf
    e = _np.clip(_np.histogram(ex, ed)[0] / len(ex), 0.0001, None); a = _np.clip(_np.histogram(ac, ed)[0] / len(ac), 0.0001, None)
    return float(_np.sum((a - e) * _np.log(a / e)))
_F = ['age', 'income', 'debt_ratio', 'delays_12m', 'employment_years']
_t = {f: _psi(_o[f], _n[f]) for f in _F}
assert len(old) == 840 and len(new) == 420, f"old 840 (2024), new 420 (2025) жол болуы керек, сізде {len(old)} және {len(new)}"
assert sorted(psi_table) == sorted(_F), "psi_table кілттері — F тізіміндегі бес белгі"
assert all(abs(psi_table[f] - _t[f]) < 1e-6 for f in _F), "PSI мәндері сәйкес емес: psi(old[f], new[f]) — бірінші аргумент ескі кезең"
assert list(drifted) == [f for f in _F if _t[f] > 0.25], "drifted — PSI > 0.25 белгілер (F ретімен)"` }, hints: ['<code>old = df[df[\'month\'] &lt; \'2025-01\']</code>, <code>new = df[df[\'month\'] &gt;= \'2025-01\']</code>', '<code>psi_table[f] = psi(old[f], new[f])</code>; <code>drifted = [f for f in F if psi_table[f] &gt; 0.25]</code>'] },
          { type: 'python', xp: 25, prompt: 'Out-of-time валидация. <code>dev</code> — <code>2024-09</code>-ға дейінгі (қоса) өтінімдер, <code>oot</code> — <code>2025-01</code>-ден бастап. <code>dev</code>-ті <code>train_test_split(test_size=0.3, random_state=0, stratify=...)</code>-пен train/validation-ға бөліңіз. <code>model = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))</code>-ды train-де үйретіңіз. Есептеңіз: <code>gini_val</code>, <code>gini_oot</code> (2 · AUC − 1), <code>pd_pred</code> (OOT-тегі орташа болжам ықтималдығы), <code>pd_fact</code> (OOT-тегі нақты default үлесі).', starter: LOANS + "from sklearn.model_selection import train_test_split\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import roc_auc_score\n", solution: LOANS + `from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score
dev = df[df['month'] <= '2024-09']
oot = df[df['month'] >= '2025-01']
X_train, X_val, y_train, y_val = train_test_split(dev[F], dev['default'], test_size=0.3, random_state=0, stratify=dev['default'])
model = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000)).fit(X_train, y_train)
gini_val = 2 * roc_auc_score(y_val, model.predict_proba(X_val)[:, 1]) - 1
p_oot = model.predict_proba(oot[F])[:, 1]
gini_oot = 2 * roc_auc_score(oot['default'], p_oot) - 1
pd_pred = p_oot.mean()
pd_fact = oot['default'].mean()
print(round(gini_val, 3), round(gini_oot, 3), round(pd_pred, 3), round(pd_fact, 3))`, check: { tests: `import pandas as _pd
from sklearn.model_selection import train_test_split as _tts
from sklearn.pipeline import make_pipeline as _mp
from sklearn.preprocessing import StandardScaler as _SS
from sklearn.linear_model import LogisticRegression as _LR
from sklearn.metrics import roc_auc_score as _ras
_d = _pd.read_csv('loans.csv')
_F = ['age', 'income', 'debt_ratio', 'delays_12m', 'employment_years']
_dev = _d[_d['month'] <= '2024-09']; _oot = _d[_d['month'] >= '2025-01']
_a, _b, _c, _e = _tts(_dev[_F], _dev['default'], test_size=0.3, random_state=0, stratify=_dev['default'])
_m = _mp(_SS(), _LR(max_iter=1000)).fit(_a, _c)
_gv = 2 * _ras(_e, _m.predict_proba(_b)[:, 1]) - 1
_po = _m.predict_proba(_oot[_F])[:, 1]
_go = 2 * _ras(_oot['default'], _po) - 1
assert len(dev) == 630 and len(oot) == 420, f"dev 630, oot 420 жол болуы керек, сізде {len(dev)} және {len(oot)}"
assert abs(gini_val - _gv) < 1e-6, f"gini_val ≈ {_gv:.3f} болуы керек: validation-дағы 2 * AUC - 1"
assert abs(gini_oot - _go) < 1e-6, f"gini_oot ≈ {_go:.3f} болуы керек: модель тек train-де үйретіледі, OOT-те тек бағаланады"
assert abs(pd_pred - _po.mean()) < 1e-6, f"pd_pred ≈ {_po.mean():.3f}: OOT-тегі predict_proba[:, 1] орташасы"
assert abs(pd_fact - _oot['default'].mean()) < 1e-9, f"pd_fact ≈ {_oot['default'].mean():.3f}: oot['default'].mean()"
assert pd_fact > pd_pred, "Бұл деректе модель OOT-те тәуекелді кем бағалайды"` }, hints: ['<code>dev = df[df[\'month\'] &lt;= \'2024-09\']</code>, <code>oot = df[df[\'month\'] &gt;= \'2025-01\']</code>', 'Бөлу: <code>train_test_split(dev[F], dev[\'default\'], test_size=0.3, random_state=0, stratify=dev[\'default\'])</code>', '<code>p_oot = model.predict_proba(oot[F])[:, 1]</code>; <code>pd_pred = p_oot.mean()</code>'] },
          { type: 'quiz', xp: 10, prompt: 'Скоринг моделінің айлық мониторингі: <code>income</code> PSI = 0.31, Gini 0.52-ден 0.50-ге түсті, ал болжанған дефолт 8%, нақтысы 14%. Ең дұрыс әрекет?', options: ['Ештеңе істемеу: Gini өзгерген жоқ дерлік', 'PSI &gt; 0.25 және калибровка бұзылған: себебін талдап, модельді рекалибровкалау немесе жаңа деректе қайта үйрету', 'income белгісін дереу алып тастау', 'Threshold-ты 0.5-ке қайтару'], answer: 1, explain: 'Gini ретті ғана өлшейді. Деңгей (PD) екі есеге жуық қате — резерв пен бағалау бұрмаланады. PSI ығысудың қай белгіден келгенін көрсетеді.' },
          { type: 'quiz', xp: 10, prompt: 'MLflow-да (немесе кез келген эксперимент журналында) әр run үшін ең аз дегенде не сақталуы керек?', options: ['Тек ең жақсы метрика', 'Параметрлер, дерек кезеңі/нұсқасы, метрикалар және модель файлы: нәтижені кез келген уақытта қайта шығаруға болатындай', 'Тек код', 'Тек модель файлы'], answer: 1, explain: 'Эксперименттің мәні — қайталанғыштық (reproducibility). Параметр мен дерексіз метрика — жай сан.' }
        ]
      },
      {
        id: 'mp-anom', title: 'Аномалияларды табу және антифрод негіздері', minutes: 16,
        body: `
<p>Банк картасымен түнгі 3-те, жаңа телефоннан, шетелден 400 000 ₸ төленді. Алаяқтық па? Антифрод жүйесі мұны бірнеше миллисекундта шешуі керек. Қиындығы: алаяқтық өте сирек (1%-дан аз), белгіленген мысалдар аз, ал алаяқтар тәсілін үнемі өзгертеді. Сондықтан мұнда кәдімгі classification-ға қоса <b>аномалияларды табу</b> қолданылады: «қалыптыға ұқсамайтынды» іздеу.</p>
<p>Дерек: <code>transactions.csv</code> — 1 000 транзакция, 30-ы алаяқтық (3%). Бағандар: <code>amount</code> (₸), <code>hour</code>, <code>tx_24h</code> (соңғы тәуліктегі транзакция саны), <code>new_device</code>, <code>foreign</code>, <code>is_fraud</code>.</p>
<h3>1-қабат: қарапайым ережелер</h3>
<p><b>IQR ережесі</b> (M3.1-ден таныс): мән <code>Q3 + 1.5 · IQR</code>-дан жоғары болса — outlier.</p>
<ol>
<li><code>amount</code>: Q1 = 4 800, Q3 = 14 725. IQR = 9 925.</li>
<li>Жоғарғы шек = 14 725 + 1.5 · 9 925 = 29 612.5 ₸.</li>
<li>Шектен асқан 76 транзакция бар. Оның 24-і шынымен алаяқтық.</li>
<li>Recall = 24 / 30 = 0.80, precision = 24 / 76 = 0.32. Үш дабылдың екеуі жалған.</li>
</ol>
<p><b>z-score</b> ережесі ұқсас: <code>|x − орташа| / std &gt; 3</code>. Сома сияқты қисық (skewed) таралуда алдымен логарифм алған дұрыс. Бизнес ережелер де осы қабатта: «жаңа құрылғы <b>және</b> шетел», «тәулігіне 8+ транзакция».</p>
<p>Ережелердің артықшылығы: түсінікті, жылдам, реттеушіге оңай түсіндіріледі. Кемшілігі: бір-бір белгіге қарайды. Сомасы орташа, бірақ <i>түнде + жаңа құрылғыдан + жиі</i> жасалған транзакцияны ұстамайды.</p>
<h3>2-қабат: IsolationForest</h3>
<p>Идея: аномалияны басқалардан <b>оқшаулау оңай</b>. Кездейсоқ белгі мен кездейсоқ шек таңдап, деректі бөле береміз. Қалыпты нүкте тығыз топтың ішінде, оны бөліп алу үшін көп қадам керек. Ерекше нүкте шетте тұр — екі-үш бөлуден кейін жалғыз қалады. Жүз кездейсоқ ағаштағы орташа «тереңдік» неғұрлым аз болса, нүкте соғұрлым күдікті.</p>
<pre><code>from sklearn.ensemble import IsolationForest
F = ['amount', 'hour', 'tx_24h', 'new_device', 'foreign']
iso = IsolationForest(n_estimators=100, contamination=0.03, random_state=0)
iso.fit(df[F])                       # is_fraud-ты КӨРМЕЙДІ: unsupervised
score = -iso.score_samples(df[F])    # жоғары = күдіктірек
top = df.assign(score=score).sort_values('score', ascending=False).head(30)
print(top['is_fraud'].mean())        # 0.83</code></pre>
<ol>
<li>Модельге <code>is_fraud</code> берілмейді. Ол тек «кім ерекше» екенін іздейді. Белгі (label) тек бағалау үшін керек.</li>
<li><code>contamination=0.03</code> — аномалия үлесінің болжамы; ол тек <code>predict</code>-тің шегіне әсер етеді.</li>
<li><code>score_samples</code> кері таңбамен: төмен = аномалия. Ыңғайлы болу үшін минуспен аударамыз.</li>
</ol>
<h3>Precision@k: аналитиктің уақыты шектеулі</h3>
<p>Антифрод бөлімі күніне, айталық, 30 транзакцияны ғана қолмен тексере алады. Сондықтан сұрақ: «ең күдікті <b>k</b> транзакцияның қаншасы шынымен алаяқтық?»</p>
<table>
<tr><th>Тәсіл</th><th>Дабыл саны</th><th>Алаяқтық</th><th>Precision</th></tr>
<tr><td>IQR ережесі (amount)</td><td>76</td><td>24</td><td>0.32</td></tr>
<tr><td>IsolationForest, топ-10</td><td>10</td><td>10</td><td>1.00</td></tr>
<tr><td>IsolationForest, топ-30</td><td>30</td><td>25</td><td><b>0.83</b></td></tr>
</table>
<h3>Нақты жүйе: қабаттар</h3>
<ul>
<li><b>Ережелер</b>: қатаң, түсінікті жағдайлар (лимиттер, қара тізімдер). Бірден блоктайды.</li>
<li><b>Supervised модель</b> (boosting): белгіленген алаяқтық тарихы бар болса. Белгілі схемаларды жақсы ұстайды. Метрикалары: PR-AUC, recall белгілі бір precision-да.</li>
<li><b>Аномалия детекторы</b>: жаңа, бұрын кездеспеген схемалар үшін.</li>
<li><b>Аналитик</b>: күдіктілерді қолмен тексеріп, белгі қояды. Сол белгілер келесі модельге дерек болады.</li>
</ul>
<div class="tip">Аномалия ≠ алаяқтық. IsolationForest «ерекше» транзакцияны табады: ол бай клиенттің үлкен, бірақ заңды сатып алуы да болуы мүмкін. Сондықтан нәтиже — «блоктау» емес, «тексеруге жіберу».</div>
<h3>Жиі қателер</h3>
<ul>
<li>Сапаны accuracy-мен өлшеу: «бәрі таза» деген модель 97% алады.</li>
<li>IsolationForest-ке <code>is_fraud</code>-ты белгі ретінде қосып жіберу.</li>
<li><code>random_state</code> қоймау: ағаштар кездейсоқ, нәтиже әр жолы өзгереді.</li>
<li>Жалған дабылдың құнын ұмыту: әр бекер блокталған карта — ашулы клиент.</li>
<li>Модельді бір рет құрып, ұмыту. Алаяқтар бейімделеді; мониторинг пен қайта үйрету міндетті.</li>
</ul>`,
        exercises: [
          { type: 'python', xp: 20, prompt: '<code>amount</code> бойынша IQR ережесін жасаңыз. <code>upper</code> = Q3 + 1.5 · IQR. <code>flag</code> — сомасы <code>upper</code>-ден асатын транзакциялар (bool Series). <code>n_flag</code> — дабыл саны, <code>n_caught</code> — олардың ішіндегі алаяқтық саны, <code>precision_rule</code> және <code>recall_rule</code> есептеңіз.', starter: TX + "\n", solution: TX + `
q1 = df['amount'].quantile(0.25)
q3 = df['amount'].quantile(0.75)
upper = q3 + 1.5 * (q3 - q1)
flag = df['amount'] > upper
n_flag = int(flag.sum())
n_caught = int((flag & (df['is_fraud'] == 1)).sum())
precision_rule = n_caught / n_flag
recall_rule = n_caught / df['is_fraud'].sum()
print(upper, n_flag, n_caught, round(precision_rule, 3), round(recall_rule, 3))`, check: { tests: `import pandas as _pd
_d = _pd.read_csv('transactions.csv')
_q1, _q3 = _d['amount'].quantile(0.25), _d['amount'].quantile(0.75)
_u = _q3 + 1.5 * (_q3 - _q1)
_f = _d['amount'] > _u
_c = int((_f & (_d['is_fraud'] == 1)).sum())
assert abs(upper - _u) < 1e-6, f"upper = {_u} болуы керек: q3 + 1.5 * (q3 - q1)"
assert len(flag) == 1000 and int(flag.sum()) == int(_f.sum()), "flag = df['amount'] > upper (1000 мәнді bool Series)"
assert n_flag == int(_f.sum()), f"n_flag = {int(_f.sum())} болуы керек"
assert n_caught == _c, f"n_caught = {_c} болуы керек: flag және is_fraud == 1"
assert abs(precision_rule - _c / _f.sum()) < 1e-9, "precision_rule = n_caught / n_flag"
assert abs(recall_rule - _c / _d['is_fraud'].sum()) < 1e-9, "recall_rule = n_caught / барлық алаяқтық саны (30)"` }, hints: ['<code>q1 = df[\'amount\'].quantile(0.25)</code>, <code>q3 = df[\'amount\'].quantile(0.75)</code>', '<code>n_caught = int((flag &amp; (df[\'is_fraud\'] == 1)).sum())</code>'] },
          { type: 'python', xp: 25, prompt: '<code>IsolationForest(n_estimators=100, contamination=0.03, random_state=0)</code>-ты <code>iso</code> атымен <code>df[F]</code>-те үйретіңіз. <code>score = -iso.score_samples(df[F])</code>. Скоры ең жоғары 30 транзакцияның ішіндегі алаяқтық үлесін <code>p_at_30</code>-ға жазыңыз (precision@30). Сол 30-дың ішінде неше алаяқтық барын <code>n_found</code>-қа жазыңыз.', starter: TX + "from sklearn.ensemble import IsolationForest\nF = ['amount', 'hour', 'tx_24h', 'new_device', 'foreign']\n", solution: TX + `from sklearn.ensemble import IsolationForest
F = ['amount', 'hour', 'tx_24h', 'new_device', 'foreign']
iso = IsolationForest(n_estimators=100, contamination=0.03, random_state=0)
iso.fit(df[F])
score = -iso.score_samples(df[F])
top = df.assign(score=score).sort_values('score', ascending=False).head(30)
n_found = int(top['is_fraud'].sum())
p_at_30 = n_found / 30
print(n_found, round(p_at_30, 3))`, check: { tests: `import pandas as _pd, numpy as _np
from sklearn.ensemble import IsolationForest as _IF
_d = _pd.read_csv('transactions.csv')
_F = ['amount', 'hour', 'tx_24h', 'new_device', 'foreign']
_s = -_IF(n_estimators=100, contamination=0.03, random_state=0).fit(_d[_F]).score_samples(_d[_F])
_n = int(_d['is_fraud'].values[_np.argsort(-_s, kind='stable')[:30]].sum())
assert len(score) == 1000, "score — әр транзакцияға бір сан"
assert _np.allclose(_np.asarray(score, dtype=float), _s, atol=1e-9), "score = -iso.score_samples(df[F]); параметрлер: n_estimators=100, contamination=0.03, random_state=0. is_fraud белгі болмауы керек"
assert abs(n_found - _n) <= 1, f"n_found = {_n} болуы керек: скоры ең жоғары 30 транзакциядағы алаяқтық саны"
assert abs(p_at_30 - n_found / 30) < 1e-9, "p_at_30 = n_found / 30"`, mustInclude: ['IsolationForest('] }, hints: ['<code>iso.fit(df[F])</code>, сосын <code>score = -iso.score_samples(df[F])</code>', '<code>top = df.assign(score=score).sort_values(\'score\', ascending=False).head(30)</code>'] },
          { type: 'number', xp: 10, prompt: 'Антифрод моделі ең күдікті 50 транзакцияны аналитикке жіберді. Оның 20-сы шынымен алаяқтық болып шықты. Бүкіл күнде 40 алаяқтық болған. Precision@50 қанша?', answer: 0.4, tol: 0.005, explain: 'Precision@50 = 20 / 50 = 0.40. Recall@50 = 20 / 40 = 0.50 — бұл бөлек метрика.' },
          { type: 'quiz', xp: 10, prompt: 'Банкте белгіленген алаяқтық тарихы аз, ал алаяқтар жаңа схемаларды үнемі ойлап табады. Қай архитектура ең орынды?', options: ['Тек бір supervised модель, accuracy бойынша бапталған', 'Қабаттар: қатаң бизнес ережелер + белгілі схемаларға supervised модель + жаңа схемаларға аномалия детекторы; күдіктілер аналитикке тексеруге барады', 'Тек IQR ережесі', 'Барлық үлкен соманы автоматты блоктау'], answer: 1, explain: 'Әр қабат басқаның әлсіз жерін жабады. Аналитиктің шешімдері жаңа белгіленген дерекке айналып, модельді жаңартады.' }
        ]
      },
      {
        id: 'mp-rec', title: 'Ұсыныс жүйелері негіздері', minutes: 15,
        body: `
<p>Маркетплейстегі «Сізге ұнауы мүмкін», онлайн-кинотеатрдағы «Осыны қарағандар мынаны да қарады» — бұл <b>ұсыныс жүйелері</b> (recommender systems). Мақсат: әр пайдаланушыға мыңдаған тауардың ішінен оған ең керекті бірнешеуін көрсету.</p>
<p>Дерек: <code>purchases.csv</code> — 117 клиенттің 15 тауар бойынша 415 сатып алуы. Бағандар: <code>user_id</code>, <code>item</code>. Баға (рейтинг) жоқ, тек «сатып алды» фактісі — мұны <b>implicit feedback</b> дейді, нақты өмірде дерек көбіне осындай.</p>
<h3>Baseline: танымалдылық</h3>
<p>Барлығына ең көп сатылатын тауарларды ұсыну. Жеке талғамды ескермейді, бірақ жаңа клиентке (ол туралы ештеңе білмейміз — <b>cold start</b>) жалғыз жол. Мұнда топ-3: бөтелке (40), зарядтағыш (39), смартфон (38).</p>
<h3>User-item матрицасы</h3>
<pre><code>M = pd.crosstab(df['user_id'], df['item'])   # 117 × 15, ұяшықта 0 немесе 1</code></pre>
<p>Әр жол — клиент, әр баған — тауар. Енді әр тауар — 117 ұзындықты вектор: оны кім сатып алды.</p>
<h3>Item-item ұқсастық</h3>
<p>Екі тауарды <b>бір адамдар</b> сатып алса, олар ұқсас. Өлшемі — векторлар арасындағы <b>косинус</b> (M4.3):</p>
<ol>
<li>A тауарын 3 клиент алды: {1, 2, 3}. B тауарын 4 клиент: {2, 3, 4, 5}.</li>
<li>Ортақ сатып алушылар: {2, 3} — 2 адам.</li>
<li>cos = 2 / √(3 · 4) = 2 / 3.46 ≈ 0.58.</li>
</ol>
<pre><code>from sklearn.metrics.pairwise import cosine_similarity
sim = pd.DataFrame(cosine_similarity(M.T), index=M.columns, columns=M.columns)
print(sim['смартфон'].drop('смартфон').sort_values(ascending=False).head(3))
# құлаққап      0.552
# зарядтағыш    0.546
# қап           0.429</code></pre>
<p>Модель «смартфон, құлаққап, зарядтағыш, қап бір топ» екенін ешкім айтпай-ақ, тек сатып алу тарихынан тапты.</p>
<h3>Клиентке ұсыныс</h3>
<ol>
<li>Клиент №1 тышқан мен пернетақта алған.</li>
<li>Әр тауардың скоры = оның клиент алған тауарлармен ұқсастықтарының қосындысы: <code>sim.values @ M.loc[1].values</code>.</li>
<li>Алып қойған тауарларды алып тастаймыз, қалғанын скор бойынша реттейміз.</li>
<li>Нәтиже: сөмке, ноутбук, зарядтағыш. Танымалдылық baseline-ы оған бөтелке ұсынар еді.</li>
</ol>
<h3>Қалай бағалаймыз: precision@k</h3>
<p>Әр клиенттің бір сатып алуын жасырамыз, қалғанымен ұсыныс жасаймыз, жасырылған тауар топ-k ішінде ме — тексереміз. Осы деректе (топ-3): танымалдылық 36% жағдайда табады, item-item 56%-да. <b>Precision@k</b> — ұсынылған k тауардың қаншасы шынымен керек болды.</p>
<div class="tip">Нақты жүйелерде офлайн метрикадан кейін міндетті түрде A/B тест жасалады: ұсыныс блогы сатылымды шынымен арттыра ма? Офлайн precision@k тек үміткерлерді сұрыптауға арналған.</div>
<h3>Жиі қателер</h3>
<ul>
<li>Baseline-сыз күрделі модель құру. Танымалдылықты жеңу — ойлағаннан қиын.</li>
<li>Клиентке алып қойған тауарын қайта ұсыну (сүзгіні ұмыту).</li>
<li>Бағалауда train мен test-ті уақыт бойынша бөлмеу: болашақ сатып алулар арқылы өткенді «болжау».</li>
<li>Cold start-ты ұмыту: жаңа клиент пен жаңа тауар үшін тарих жоқ, оларға бөлек стратегия керек.</li>
<li>Тек танымал тауарларды ұсына беру: сирек, бірақ дәл келетін тауарлар мүлдем көрінбей қалады.</li>
</ul>`,
        exercises: [
          { type: 'python', xp: 20, prompt: 'Танымалдылық baseline-ы: ең көп сатылған 3 тауардың атауын <code>top3</code> тізіміне жазыңыз (кему ретімен). User-item матрицасын <code>M</code>-ге жасаңыз: <code>pd.crosstab</code>, жолдары <code>user_id</code>, бағандары <code>item</code>.', starter: REC + "\n", solution: REC + `
top3 = list(df['item'].value_counts().head(3).index)
M = pd.crosstab(df['user_id'], df['item'])
print(top3, M.shape)`, check: { tests: `import pandas as _pd
_d = _pd.read_csv('purchases.csv')
_vc = _d['item'].value_counts()
assert list(top3) == list(_vc.head(3).index), "top3 — df['item'].value_counts().head(3).index (тізім)"
assert isinstance(M, _pd.DataFrame) and M.shape == (117, 15), "M — 117 × 15 кесте: pd.crosstab(df['user_id'], df['item'])"
assert int(M.values.sum()) == len(_d) and int(M.values.max()) == 1, "M ұяшықтары 0/1, қосындысы — сатып алулар саны"
assert int(M['смартфон'].sum()) == int(_vc['смартфон']), "Бағандар — тауар атаулары"` }, hints: ['<code>df[\'item\'].value_counts().head(3).index</code>', '<code>M = pd.crosstab(df[\'user_id\'], df[\'item\'])</code>'] },
          { type: 'python', xp: 25, prompt: '<code>M</code> дайын. Тауарлар арасындағы косинус ұқсастық кестесін <code>sim</code>-ге жазыңыз (15 × 15 DataFrame, индексі мен бағандары — тауар атаулары). Смартфонға ең ұқсас 3 тауарды (өзін қоспай) <code>nearest</code> тізіміне жазыңыз. Клиент №1 үшін скорларды есептеп, ол әлі алмаған тауарлардың ішінен скоры ең жоғары 3-еуін <code>recs</code> тізіміне жазыңыз.', starter: REC + "from sklearn.metrics.pairwise import cosine_similarity\nM = pd.crosstab(df['user_id'], df['item'])\n", solution: REC + `from sklearn.metrics.pairwise import cosine_similarity
M = pd.crosstab(df['user_id'], df['item'])
sim = pd.DataFrame(cosine_similarity(M.T), index=M.columns, columns=M.columns)
nearest = list(sim['смартфон'].drop('смартфон').sort_values(ascending=False).head(3).index)
own = M.loc[1]
scores = pd.Series(sim.values @ own.values, index=M.columns)
recs = list(scores[own == 0].sort_values(ascending=False).head(3).index)
print(nearest, recs)`, check: { tests: `import pandas as _pd, numpy as _np
_d = _pd.read_csv('purchases.csv')
_M = _pd.crosstab(_d['user_id'], _d['item'])
_A = _M.values.astype(float); _nr = _np.sqrt((_A ** 2).sum(axis=0))
_S = _pd.DataFrame((_A.T @ _A) / _np.outer(_nr, _nr), index=_M.columns, columns=_M.columns)
assert isinstance(sim, _pd.DataFrame) and sim.shape == (15, 15), "sim — 15 × 15 DataFrame: тауарлар арасындағы ұқсастық (M.T қолданыңыз, M емес)"
assert _np.allclose(sim.loc[_M.columns, _M.columns].values, _S.values, atol=1e-9), "Ұқсастық мәндері сәйкес емес: cosine_similarity(M.T)"
_ne = list(_S['смартфон'].drop('смартфон').sort_values(ascending=False).head(3).index)
assert list(nearest) == _ne, "nearest: sim['смартфон'].drop('смартфон').sort_values(ascending=False).head(3).index"
_own = _M.loc[1]
_sc = _pd.Series(_S.values @ _own.values, index=_M.columns)[_own == 0].sort_values(ascending=False)
assert len(recs) == 3 and not any(_own[r] == 1 for r in recs), "recs — клиент №1 әлі алмаған 3 тауар"
assert set(recs) == set(_sc.head(3).index), "recs: скор = sim.values @ M.loc[1].values, алынған тауарларды алып тастап, ең жоғары 3-еуі"`, mustInclude: ['cosine_similarity('] }, hints: ['<code>sim = pd.DataFrame(cosine_similarity(M.T), index=M.columns, columns=M.columns)</code>', '<code>own = M.loc[1]</code>; <code>scores = pd.Series(sim.values @ own.values, index=M.columns)</code>; сүзгі: <code>scores[own == 0]</code>'] },
          { type: 'number', xp: 10, prompt: 'Жүйе клиентке 5 тауар ұсынды. Клиент келесі аптада оның 2-еуін сатып алды. Precision@5 қанша?', answer: 0.4, tol: 0.005, explain: 'Precision@5 = 2 / 5 = 0.4: ұсынылғандардың қаншасы керек болды.' }
        ]
      },
      {
        id: 'mp-gate', gate: true, title: 'Модуль емтиханы: ML in Practice', minutes: 30,
        body: `
<p>Қорытынды тексеріс. Pipeline, leakage, feature engineering, тюнинг, ансамбльдер, threshold және түсіндіру — бәрі бірге. Модельдерді кішкентай ұстаңыз (n_estimators ≤ 100, cv ≤ 5) және <code>random_state</code> беріңіз.</p>`,
        exercises: [
          { type: 'python', xp: 40, prompt: 'Flats бағасын болжаңыз. <code>model</code> атты Pipeline (немесе GridSearchCV) жасаңыз: ол <code>X_train</code>-нің шикі бағандарын (district мәтін түрінде) қабылдасын. Feature engineering мен модельді өзіңіз таңдаңыз: мысалы, M5.1-де өткен <code>LinearRegression</code> не <code>Ridge</code>, немесе осы модульдегі ансамбльдердің регрессия нұсқасы. Test R² (<code>model.score(X_test, y_test)</code>) кемінде <b>0.90</b> болуы керек. <code>price_mln</code>-ді белгі ретінде қолданбаңыз.', starter: FLATS + "from sklearn.model_selection import train_test_split\nX = flats.drop(columns=['flat_id', 'price_mln'])\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)\nmodel = None\n", solution: FLATS + "from sklearn.model_selection import train_test_split\nX = flats.drop(columns=['flat_id', 'price_mln'])\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nfrom sklearn.linear_model import Ridge\nnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\npre = ColumnTransformer([('num', StandardScaler(), num), ('cat', OneHotEncoder(handle_unknown='ignore'), ['district'])])\nmodel = Pipeline([('pre', pre), ('model', Ridge(alpha=1.0))])\nmodel.fit(X_train, y_train)\nprint(round(model.score(X_test, y_test), 3))", check: { tests: "from sklearn.pipeline import Pipeline as _P\nfrom sklearn.model_selection import GridSearchCV as _G\nassert isinstance(model, (_P, _G)), 'model — Pipeline немесе GridSearchCV'\nassert 'price_mln' not in X_train.columns, 'price_mln белгі болмауы керек'\nassert not any('price' in str(c) for c in X_test.columns), 'Бағадан жасалған белгі — target leakage'\nassert len(X_test) == 100, 'X_test өзгертілмеуі керек (100 жол)'\n_r2 = model.score(X_test, y_test)\nassert _r2 >= 0.90, f'Test R² кемінде 0.90 болуы керек, сізде {_r2:.3f}. district-ті OneHotEncoder-мен қостыңыз ба?'", stdout: true }, hints: [] },
          { type: 'python', xp: 40, prompt: 'Churn: ретеншн бөлімі кетушілердің кемінде <b>70%</b>-ын тапқысы келеді (recall ≥ 0.70), бірақ ескертулердің кемінде <b>40%</b>-ы дұрыс болсын (precision ≥ 0.40). <code>model</code> (predict_proba бар Pipeline) және <code>threshold</code> санын беріңіз. Тест: <code>(model.predict_proba(X_test)[:, 1] &gt;= threshold)</code>.', starter: CHURN + PRE + "from sklearn.linear_model import LogisticRegression\nmodel = None\nthreshold = 0.5\n", solution: CHURN + PRE + "from sklearn.linear_model import LogisticRegression\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000, class_weight='balanced'))])\nmodel.fit(X_train, y_train)\nthreshold = 0.5\nfrom sklearn.metrics import recall_score, precision_score\n_yp = (model.predict_proba(X_test)[:, 1] >= threshold).astype(int)\nprint(recall_score(y_test, _yp), precision_score(y_test, _yp))", check: { tests: "from sklearn.metrics import recall_score as _rs, precision_score as _ps\nassert model is not None and hasattr(model, 'predict_proba'), 'model — predict_proba-сы бар үйретілген модель'\nassert 0 < threshold < 1, 'threshold 0 мен 1 арасында'\nassert len(X_test) == 150, 'X_test өзгертілмеуі керек'\n_yp = (model.predict_proba(X_test)[:, 1] >= threshold).astype(int)\n_r, _p = _rs(y_test, _yp), _ps(y_test, _yp, zero_division=0)\nassert _r >= 0.70, f'recall {_r:.2f} < 0.70: threshold-ты төмендетіңіз немесе class_weight қолданыңыз'\nassert _p >= 0.40, f'precision {_p:.2f} < 0.40: threshold тым төмен'" }, hints: [] },
          { type: 'quiz', xp: 20, prompt: 'Аналитик бос <code>age</code>-ті бүкіл деректің медианасымен толтырды, StandardScaler-ді бүкіл деректе fit етті, сосын train/test бөлді. Ең дұрыс түзету қайсы?', options: ['Медиананың орнына орташаны қолдану', 'Алдымен бөлу, ал SimpleImputer мен StandardScaler-ді Pipeline ішіне салып, тек train-де fit ету', 'test_size-ты 0.5-ке көбейту', 'StandardScaler-ді MinMaxScaler-ге ауыстыру'], answer: 1, explain: 'Деректен үйренетін әр қадам тек train-де fit етілуі керек. Pipeline мұны CV мен production-да автоматты қамтамасыз етеді.' },
          { type: 'quiz', xp: 20, prompt: 'Random Forest-те <code>data_gb</code>-тің feature_importances_ мәні 0.14, ал test-тегі permutation importance ≈ 0. Ең дұрыс тұжырым?', options: ['data_gb — ең маңызды белгілердің бірі', 'Impurity importance train-дегі шуды бөлуге қолданылғанын көрсетеді; test-те бұл белгі болжамды жақсартпайды', 'Permutation importance қате есептелген', 'data_gb churn-нің себебі'], answer: 1, explain: 'Impurity importance train-де есептеліп, үздіксіз белгілерді асыра бағалайды. Permutation test-те «белгісіз модель қаншалық нашарлайды» деп тікелей өлшейді.' }
        ]
      }
    ]
  };
})();
