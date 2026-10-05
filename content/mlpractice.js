// M5.2 ML in Practice. Real scikit-learn 1.6 runs in the Pyodide worker on churn.csv and flats.csv (content/mldata.js); models are small and seeded.
(function () {
  // Shared starter blocks (Python). Single quotes inside, JS double quotes outside.
  const CHURN = "import pandas as pd\nfrom sklearn.model_selection import train_test_split\ndf = pd.read_csv('churn.csv')\nnum = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']\ncat = ['city', 'plan']\nX = df[num + cat]\ny = df['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)\n";
  const PRE = "from sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])\npre = ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])\n";
  const FLATS = "import pandas as pd\nflats = pd.read_csv('flats.csv')\n";

  DJ.modules['m5-2'] = {
    intro: 'Нақты жұмыста модельдің өзі емес, оның айналасы маңызды: деректі дайындау, leakage-тен қорғану, гиперпараметр таңдау, күшті ансамбльдер, теңгерімсіз кластар, кластерлеу және модельді түсіндіру. Барлығын churn.csv мен flats.csv деректерінде scikit-learn арқылы жасайсыз.',
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
<p>0.01-де ағаш жетпейді (underfit), 1.0-де тым агрессивті (overfit). Ереже: learning_rate-ті 2 есе кемітсеңіз, n_estimators-ты шамамен 2 есе көбейтіңіз.</p>
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
<p>Churn-де клиенттердің 26%-ы ғана кетеді. «Ешкім кетпейді» деп болжайтын модельдің accuracy-і 74% — бірақ ол пайдасыз: бірде-бір кетушіні таппайды. Теңгерімсіз кластарда accuracy-ге емес, <b>recall</b> (кетушілердің қаншасын таптық), <b>precision</b> (ескерткендеріміздің қаншасы шынымен кетушi) және бизнес құнына қараймыз.</p>
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
        id: 'mp-gate', gate: true, title: 'Модуль емтиханы: ML in Practice', minutes: 30,
        body: `
<p>Қорытынды тексеріс. Pipeline, leakage, feature engineering, тюнинг, ансамбльдер, threshold және түсіндіру — бәрі бірге. Модельдерді кішкентай ұстаңыз (n_estimators ≤ 100, cv ≤ 5) және <code>random_state</code> беріңіз.</p>`,
        exercises: [
          { type: 'python', xp: 40, prompt: 'Flats бағасын болжаңыз. <code>model</code> атты Pipeline (немесе GridSearchCV) жасаңыз: ол <code>X_train</code>-нің шикі бағандарын (district мәтін түрінде) қабылдасын. Feature engineering мен модельді өзіңіз таңдаңыз. Test R² (<code>model.score(X_test, y_test)</code>) кемінде <b>0.90</b> болуы керек. <code>price_mln</code>-ді белгі ретінде қолданбаңыз.', starter: FLATS + "from sklearn.model_selection import train_test_split\nX = flats.drop(columns=['flat_id', 'price_mln'])\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)\nmodel = None\n", solution: FLATS + "from sklearn.model_selection import train_test_split\nX = flats.drop(columns=['flat_id', 'price_mln'])\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nfrom sklearn.linear_model import Ridge\nnum = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']\npre = ColumnTransformer([('num', StandardScaler(), num), ('cat', OneHotEncoder(handle_unknown='ignore'), ['district'])])\nmodel = Pipeline([('pre', pre), ('model', Ridge(alpha=1.0))])\nmodel.fit(X_train, y_train)\nprint(round(model.score(X_test, y_test), 3))", check: { tests: "from sklearn.pipeline import Pipeline as _P\nfrom sklearn.model_selection import GridSearchCV as _G\nassert isinstance(model, (_P, _G)), 'model — Pipeline немесе GridSearchCV'\nassert 'price_mln' not in X_train.columns, 'price_mln белгі болмауы керек'\nassert not any('price' in str(c) for c in X_test.columns), 'Бағадан жасалған белгі — target leakage'\nassert len(X_test) == 100, 'X_test өзгертілмеуі керек (100 жол)'\n_r2 = model.score(X_test, y_test)\nassert _r2 >= 0.90, f'Test R² кемінде 0.90 болуы керек, сізде {_r2:.3f}. district-ті OneHotEncoder-мен қостыңыз ба?'", stdout: true }, hints: [] },
          { type: 'python', xp: 40, prompt: 'Churn: ретеншн бөлімі кетушілердің кемінде <b>70%</b>-ын тапқысы келеді (recall ≥ 0.70), бірақ ескертулердің кемінде <b>40%</b>-ы дұрыс болсын (precision ≥ 0.40). <code>model</code> (predict_proba бар Pipeline) және <code>threshold</code> санын беріңіз. Тест: <code>(model.predict_proba(X_test)[:, 1] &gt;= threshold)</code>.', starter: CHURN + PRE + "from sklearn.linear_model import LogisticRegression\nmodel = None\nthreshold = 0.5\n", solution: CHURN + PRE + "from sklearn.linear_model import LogisticRegression\nmodel = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000, class_weight='balanced'))])\nmodel.fit(X_train, y_train)\nthreshold = 0.5\nfrom sklearn.metrics import recall_score, precision_score\n_yp = (model.predict_proba(X_test)[:, 1] >= threshold).astype(int)\nprint(recall_score(y_test, _yp), precision_score(y_test, _yp))", check: { tests: "from sklearn.metrics import recall_score as _rs, precision_score as _ps\nassert model is not None and hasattr(model, 'predict_proba'), 'model — predict_proba-сы бар үйретілген модель'\nassert 0 < threshold < 1, 'threshold 0 мен 1 арасында'\nassert len(X_test) == 150, 'X_test өзгертілмеуі керек'\n_yp = (model.predict_proba(X_test)[:, 1] >= threshold).astype(int)\n_r, _p = _rs(y_test, _yp), _ps(y_test, _yp, zero_division=0)\nassert _r >= 0.70, f'recall {_r:.2f} < 0.70: threshold-ты төмендетіңіз немесе class_weight қолданыңыз'\nassert _p >= 0.40, f'precision {_p:.2f} < 0.40: threshold тым төмен'" }, hints: [] },
          { type: 'quiz', xp: 20, prompt: 'Аналитик бос <code>age</code>-ті бүкіл деректің медианасымен толтырды, StandardScaler-ді бүкіл деректе fit етті, сосын train/test бөлді. Ең дұрыс түзету қайсы?', options: ['Медиананың орнына орташаны қолдану', 'Алдымен бөлу, ал SimpleImputer мен StandardScaler-ді Pipeline ішіне салып, тек train-де fit ету', 'test_size-ты 0.5-ке көбейту', 'StandardScaler-ді MinMaxScaler-ге ауыстыру'], answer: 1, explain: 'Деректен үйренетін әр қадам тек train-де fit етілуі керек. Pipeline мұны CV мен production-да автоматты қамтамасыз етеді.' },
          { type: 'quiz', xp: 20, prompt: 'Random Forest-те <code>data_gb</code>-тің feature_importances_ мәні 0.14, ал test-тегі permutation importance ≈ 0. Ең дұрыс тұжырым?', options: ['data_gb — ең маңызды белгілердің бірі', 'Impurity importance train-дегі шуды бөлуге қолданылғанын көрсетеді; test-те бұл белгі болжамды жақсартпайды', 'Permutation importance қате есептелген', 'data_gb churn-нің себебі'], answer: 1, explain: 'Impurity importance train-де есептеліп, үздіксіз белгілерді асыра бағалайды. Permutation test-те «белгісіз модель қаншалық нашарлайды» деп тікелей өлшейді.' }
        ]
      }
    ]
  };
})();
