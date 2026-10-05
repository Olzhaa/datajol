// M5.1 ML Foundations. scikit-learn 1.6 in Pyodide; data: flats.csv (regression) and churn.csv (classification) from content/mldata.js.
(function () {
  const FL = "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.read_csv('flats.csv')\n";
  const SPLIT = "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import train_test_split\nflats = pd.read_csv('flats.csv')\n";
  const RF = "import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n";
  const CH = "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nfeatures = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX = churn[features]\ny = churn['churned']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\n";
  const CHM = CH + "from sklearn.linear_model import LogisticRegression\nclf = LogisticRegression(max_iter=1000)\nclf.fit(X_train, y_train)\nproba = clf.predict_proba(X_test)[:, 1]\n";
  const RC = "import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\n";

  DJ.modules['m5-1'] = {
    intro: 'Machine learning — компьютерге ережені қолмен жазбай, мысалдардан үйрету. Бұл модульде scikit-learn арқылы Алматы пәтерлерінің бағасын (flats.csv) болжап, телеком абоненттерінің кетуін (churn.csv) жіктейсіз, модельді әділ бағалауды үйренесіз.',
    lessons: [
      {
        id: 'ml-1', title: 'Machine learning деген не?', minutes: 12,
        body: `
<p>Кәдімгі бағдарламада <b>ережені адам жазады</b>: «егер ауданы 60 м²-ден үлкен болса, бағасы 40 млн». Machine learning-те керісінше: біз компьютерге көп <b>мысал</b> береміз (400 пәтер және олардың нақты бағасы), ал ереженің өзін модель деректен табады.</p>
<h3>Негізгі сөздер</h3>
<ul>
<li><b>Features</b> (белгілер, <code>X</code>) — модель қарайтын бағандар: ауданы, бөлме саны, салынған жылы.</li>
<li><b>Target</b> (мақсат, <code>y</code>) — болжайтын баған: <code>price_mln</code>.</li>
<li><b>Supervised learning</b> — әр мысалдың дұрыс жауабы (target) бар. Бұл модульдің бәрі осы.</li>
<li><b>Unsupervised learning</b> — жауап жоқ, модель деректің ішкі құрылымын іздейді, мысалы, абоненттерді ұқсас топтарға бөледі (clustering).</li>
</ul>
<h3>Regression немесе classification</h3>
<table>
<tr><th>Тапсырма</th><th>Target</th><th>Түрі</th></tr>
<tr><td>Пәтер бағасын болжау</td><td>сан (млн ₸)</td><td>regression</td></tr>
<tr><td>Абонент кете ме?</td><td>0 немесе 1</td><td>classification</td></tr>
</table>
<h3>Қадамдап мысал</h3>
<ol>
<li>Бизнес сұрақ: «Жаңа пәтерді қанша бағаға қоямыз?»</li>
<li>Target: <code>price_mln</code>. Ол үздіксіз сан, демек regression.</li>
<li>Features: <code>area_m2</code>, <code>rooms</code>, <code>year_built</code>. <code>flat_id</code> алынбайды: ол жай нөмір, бағаға ешқандай қатысы жоқ.</li>
<li>Кодта:</li>
</ol>
<pre><code>import pandas as pd
flats = pd.read_csv('flats.csv')
X = flats[['area_m2', 'rooms', 'year_built']]   # 2D кесте
y = flats['price_mln']                          # 1D баған
print(X.shape, y.shape)   # (400, 3) (400,)</code></pre>
<h3>ML қашан керек емес</h3>
<ul>
<li>Ереже нақты белгілі болса: ҚҚС-ты есептеу үшін модель емес, формула керек.</li>
<li>Дерек аз немесе дұрыс жауаптар (target) жоқ болса.</li>
<li>Әр шешімді заң бойынша толық түсіндіру керек, ал қарапайым ереже жеткілікті болса.</li>
</ul>
<div class="tip">Алдымен «қарапайым ереже немесе SQL сұрауы жетпей ме?» деп сұраңыз. ML — соңғы құрал, бірінші емес.</div>
<h3>Жиі қателер</h3>
<ul>
<li><b>Target-ті features-ке қосып жіберу</b> (leakage): мысалы, бағадан есептелген «1 м² бағасы» бағанын X-ке салу. Модель «тамаша» болып көрінеді, бірақ жаңа пәтерде ол баған болмайды.</li>
<li>ID бағандарын (<code>flat_id</code>, <code>customer_id</code>) белгі ретінде алу.</li>
<li>0/1 target-ті сан болғаны үшін regression деп ойлау. Ол класс, яғни classification.</li>
</ul>`,
        exercises: [
          { type: 'python', xp: 15, prompt: '<code>flats.csv</code>-тен <code>X</code> (бағандар: <code>area_m2</code>, <code>rooms</code>, <code>year_built</code>) және <code>y</code> (<code>price_mln</code>) жасаңыз. Сосын <code>print(X.shape, y.shape)</code>.', starter: "import pandas as pd\nflats = pd.read_csv('flats.csv')\n", solution: "import pandas as pd\nflats = pd.read_csv('flats.csv')\nX = flats[['area_m2', 'rooms', 'year_built']]\ny = flats['price_mln']\nprint(X.shape, y.shape)", check: { tests: "assert isinstance(X, pd.DataFrame), 'X DataFrame болуы керек: екі жақша [[...]] қолданыңыз'\nassert list(X.columns) == ['area_m2', 'rooms', 'year_built'], 'X бағандары: area_m2, rooms, year_built (осы ретпен)'\nassert isinstance(y, pd.Series) and y.name == 'price_mln', 'y — price_mln бағаны (Series, бір жақша)'\nassert len(X) == 400 and len(y) == 400, 'Барлық 400 пәтер қалуы керек'" }, hints: ["Бірнеше баған: <code>flats[['area_m2', 'rooms', 'year_built']]</code>", "Бір баған: <code>flats['price_mln']</code>"] },
          { type: 'quiz', xp: 10, prompt: 'Қай тапсырма <b>classification</b>?', options: ['Пәтердің бағасын млн ₸-мен болжау', 'Абоненттің келесі айда кетер-кетпесін (0/1) болжау', 'Абоненттің айлық трафигін (GB) болжау', 'Үйдің салынған жылын болжау'], answer: 1, explain: 'Target екі класстың бірі (кетеді / қалады), сондықтан classification. Қалғандарында target — үздіксіз сан, яғни regression.' },
          { type: 'quiz', xp: 10, prompt: 'Қай жағдайда ML <b>керек емес</b>?', options: ['600 абоненттің дерегінен кім кететінін болжау', 'Тарифтің айлық төлемін ҚҚС-пен есептеу (ставка белгілі)', '400 пәтердің дерегінен жаңа пәтердің бағасын бағалау', 'Мыңдаған пікірден наразы клиенттерді табу'], answer: 1, explain: 'ҚҚС-тың нақты формуласы бар. Ереже белгілі болса, модель үйретудің қажеті жоқ.' }
        ]
      },
      {
        id: 'ml-2', title: 'scikit-learn API: fit, predict, score', minutes: 14,
        body: `
<p><b>scikit-learn</b> (<code>sklearn</code>) — Python-дағы классикалық ML кітапханасы. Оның әдемі жері: барлық модель бірдей үш қадаммен жұмыс істейді.</p>
<ol>
<li><b>Модель жасау</b>: <code>model = LinearRegression()</code> — әзірге «бос ми».</li>
<li><b>Үйрету</b>: <code>model.fit(X, y)</code> — модель мысалдарды қарап, параметрлерін табады.</li>
<li><b>Болжау</b>: <code>model.predict(X_new)</code> — жаңа жолдар үшін жауап береді.</li>
</ol>
<p>Қосымша: <code>model.score(X, y)</code> regression үшін <b>R²</b> береді: 1 — тамаша, 0 — модель жай орташаны болжағандай.</p>
<h3>Пішін ережесі</h3>
<ul>
<li><code>X</code> әрқашан <b>2D</b>: жолдар × бағандар. Бір белгі болса да, <code>flats[['area_m2']]</code> (екі жақша).</li>
<li><code>y</code> — <b>1D</b>: <code>flats['price_mln']</code> (бір жақша).</li>
</ul>
<h3>Қадамдап мысал: ауданнан бағаны болжау</h3>
<pre><code>import pandas as pd
from sklearn.linear_model import LinearRegression

flats = pd.read_csv('flats.csv')
X = flats[['area_m2']]
y = flats['price_mln']

model = LinearRegression()
model.fit(X, y)
print(model.coef_, model.intercept_)   # [0.648] -0.47
new = pd.DataFrame({'area_m2': [60]})
print(model.predict(new))              # [38.41]
print(model.score(X, y))               # 0.62</code></pre>
<ol>
<li><code>fit</code> түзу сызық тапты: баға ≈ 0.648 × ауданы − 0.47. Бұл Math for ML модулінде gradient descent-пен қолмен іздеген сол MSE-ні азайтатын түзу.</li>
<li>Бір шаршы метр шамамен 0.65 млн ₸ қосады.</li>
<li>60 м² пәтер: 0.648 × 60 − 0.47 ≈ 38.4 млн ₸.</li>
<li>R² = 0.62: баға айырмашылығының 62%-ын ауданның өзі түсіндіреді.</li>
</ol>
<p>Үйретілген модельдің атрибуттары астын сызумен аяқталады: <code>coef_</code>, <code>intercept_</code>, <code>n_features_in_</code>. Олар тек <code>fit</code>-тен кейін пайда болады.</p>
<div class="tip">Жаңа деректі <code>X</code>-пен бірдей бағандармен DataFrame түрінде беріңіз. Сонда sklearn бағандар атауын тексеріп, қатені ерте ұстайды.</div>
<h3>Жиі қателер</h3>
<ul>
<li><code>model.fit(flats['area_m2'], y)</code> — 1D <code>X</code>. Қате: <i>Expected 2D array, got 1D array</i>. Шешімі: екі жақша.</li>
<li><code>fit</code>-сіз <code>predict</code> шақыру: <code>NotFittedError</code>.</li>
<li><code>predict([60])</code> — бұл да 1D. Керегі: <code>[[60]]</code> немесе DataFrame.</li>
</ul>`,
        exercises: [
          { type: 'python', xp: 20, prompt: '<code>LinearRegression</code> модельін <code>model</code> атымен ауданнан (<code>area_m2</code>) бағаға (<code>price_mln</code>) үйретіңіз. 60 м² пәтердің болжамды бағасын <code>pred60</code> айнымалысына сан ретінде жазып, шығарыңыз.', starter: FL + "\n", solution: FL + "X = flats[['area_m2']]\ny = flats['price_mln']\nmodel = LinearRegression()\nmodel.fit(X, y)\npred60 = model.predict(pd.DataFrame({'area_m2': [60]}))[0]\nprint(pred60)", check: { tests: RF + "assert isinstance(model, _LinR), 'model — LinearRegression() болуы керек'\nassert hasattr(model, 'coef_'), 'Модель үйретілмеген: model.fit(X, y) шақырыңыз'\nassert model.n_features_in_ == 1, 'Тек бір белгі керек: area_m2'\nassert abs(float(pred60) - 38.41) < 0.1, f'pred60 ≈ 38.41 болуы керек, сізде {float(pred60):.2f}. predict(...)[0] алдыңыз ба?'", mustInclude: ['fit(', 'predict('] }, hints: ["<code>X = flats[['area_m2']]</code> (екі жақша)", "<code>model.predict(pd.DataFrame({'area_m2': [60]}))[0]</code>"] },
          { type: 'python', xp: 20, prompt: 'Кодта қате бар: <code>X</code> 1D болып тұр. Оны түзетіңіз: <code>model2</code> енді <b>екі</b> белгімен (<code>area_m2</code>, <code>rooms</code>) үйретілсін. Үйрету деректегі R²-ды <code>r2</code> айнымалысына <code>score</code> арқылы жазып, шығарыңыз.', starter: FL + "X = flats['area_m2']\ny = flats['price_mln']\nmodel2 = LinearRegression()\nmodel2.fit(X, y)\n", solution: FL + "X = flats[['area_m2', 'rooms']]\ny = flats['price_mln']\nmodel2 = LinearRegression()\nmodel2.fit(X, y)\nr2 = model2.score(X, y)\nprint(r2)", check: { tests: RF + "_X = _f[['area_m2', 'rooms']]\n_r2 = _LinR().fit(_X, _f['price_mln']).score(_X, _f['price_mln'])\nassert hasattr(model2, 'coef_') and model2.n_features_in_ == 2, 'model2 екі белгімен үйретілуі керек: area_m2 және rooms'\nassert abs(r2 - _r2) < 1e-6, f'r2 = {_r2:.4f} болуы керек: model2.score(X, y)'", mustInclude: ['score('] }, hints: ["<code>X = flats[['area_m2', 'rooms']]</code>", '<code>r2 = model2.score(X, y)</code>'] },
          { type: 'number', xp: 10, prompt: 'Модель тапқан формула: баға = 0.65 × ауданы − 0.5 (млн ₸). 80 м² пәтердің болжамды бағасы қанша млн ₸?', answer: 51.5, tol: 0.01, unit: 'млн ₸', explain: '0.65 × 80 = 52, 52 − 0.5 = 51.5.' }
        ]
      },
      {
        id: 'ml-3', title: 'Train/test split: модельді әділ тексеру', minutes: 14,
        body: `
<p>Мұғалім емтихан сұрақтарын алдын ала таратып жіберді делік. Студент жауаптарды жаттап алып, 100 ұпай жинайды, бірақ тақырыпты түсінбейді. Модель де солай: ол үйренген деректе бағаласақ, нәтиже әрқашан өтірік жақсы шығады.</p>
<p>Шешім: деректі екіге бөлеміз. <b>Train</b> (әдетте 80%) — модель үйренеді. <b>Test</b> (20%) — модель оны мүлде көрмейді, біз тек соңында бағалаймыз. Бұл — жаңа пәтерлерге болжам жасаудың «репетициясы».</p>
<h3>Overfitting</h3>
<p><b>Overfitting</b> — модель жалпы заңдылықты емес, нақты мысалдарды (шуын да қоса) жаттап алғанда. Белгісі: train-де өте жақсы, test-те әлдеқайда нашар. Мысалы, шектеусіз decision tree (оны кейін өтеміз) flats деректе train R² = 1.00 береді, ал test R² = 0.51.</p>
<h3>Қадамдап мысал</h3>
<pre><code>from sklearn.model_selection import train_test_split

X = flats[['area_m2']]
y = flats['price_mln']
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)
print(len(X_train), len(X_test))      # 320 80

model = LinearRegression().fit(X_train, y_train)
print(model.score(X_train, y_train))  # 0.633
print(model.score(X_test, y_test))    # 0.587</code></pre>
<ol>
<li><code>test_size=0.2</code>: 400 пәтердің 80-і test-ке кетеді.</li>
<li>Бөлу кездейсоқ. <code>random_state=42</code> кездейсоқтықты бекітеді: кім іске қосса да, бөлу бірдей. Онсыз нәтиже әр жолы өзгереді.</li>
<li>Функция <b>төрт</b> нәрсе қайтарады, реті маңызды: <code>X_train, X_test, y_train, y_test</code>.</li>
<li><code>fit</code> тек train-де. Test R² (0.587) train-нен (0.633) сәл төмен — бұл қалыпты. Айырмашылық үлкен болса, overfitting.</li>
</ol>
<div class="tip">Classification-да <code>stratify=y</code> қосыңыз: сонда train мен test-те кеткен абоненттердің үлесі бірдей (≈26%) болады.</div>
<h3>Жиі қателер</h3>
<ul>
<li>Модельді барлық деректе үйретіп, сосын test-те бағалау: модель test-ті «көріп қойған».</li>
<li>Қайтарылатын мәндердің ретін шатастыру (<code>X_train, y_train, ...</code> деп жазу).</li>
<li>Test нәтижесі ұнағанша <code>random_state</code>-ты ауыстыра беру. Бұл да өзін алдау.</li>
<li>Test-ті жиі қарап, модельді соған бейімдеу. Test — соңғы емтихан, оны бір-ақ рет тапсырған жақсы.</li>
<li>Деректі уақыт бойынша реттелген кезде (мысалы, айлар) кездейсоқ бөлу: болашақты болжау үшін соңғы кезеңді test-ке қалдырған дұрыс.</li>
</ul>`,
        exercises: [
          { type: 'python', xp: 20, prompt: '<code>X</code> (<code>area_m2</code>, <code>rooms</code>, <code>year_built</code>) және <code>y</code> (<code>price_mln</code>) жасаңыз. Оларды <code>test_size=0.2</code>, <code>random_state=42</code> арқылы <code>X_train, X_test, y_train, y_test</code>-ке бөліңіз. Train және test өлшемдерін шығарыңыз.', starter: SPLIT + "\n", solution: SPLIT + "X = flats[['area_m2', 'rooms', 'year_built']]\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\nprint(X_train.shape, X_test.shape)", check: { tests: RF + "_a, _b, _c, _d = _tts(_f[['area_m2', 'rooms', 'year_built']], _f['price_mln'], test_size=0.2, random_state=42)\nassert len(X_train) == 320 and len(X_test) == 80, 'Train 320, test 80 жол болуы керек (test_size=0.2)'\nassert list(X_train.columns) == ['area_m2', 'rooms', 'year_built'], 'X бағандары: area_m2, rooms, year_built'\nassert list(X_test.index) == list(_b.index), 'Бөлу басқаша шықты: random_state=42 қойдыңыз ба?'\nassert list(y_train.index) == list(X_train.index), 'Ретін тексеріңіз: X_train, X_test, y_train, y_test'", mustInclude: ['train_test_split('] }, hints: ['<code>train_test_split(X, y, test_size=0.2, random_state=42)</code>', 'Төрт айнымалыны бір жолда алыңыз: <code>X_train, X_test, y_train, y_test = ...</code>'] },
          { type: 'python', xp: 20, prompt: 'Бөлу дайын. <code>LinearRegression</code>-ды <code>model</code> атымен <b>тек train-де</b> үйретіңіз. R²-ды train-де <code>train_r2</code>, test-те <code>test_r2</code> айнымалысына жазып, шығарыңыз.', starter: SPLIT + "X = flats[['area_m2', 'rooms', 'year_built']]\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n", solution: SPLIT + "X = flats[['area_m2', 'rooms', 'year_built']]\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\ntrain_r2 = model.score(X_train, y_train)\ntest_r2 = model.score(X_test, y_test)\nprint(train_r2, test_r2)", check: { tests: RF + "_a, _b, _c, _d = _tts(_f[['area_m2', 'rooms', 'year_built']], _f['price_mln'], test_size=0.2, random_state=42)\n_m = _LinR().fit(_a, _c)\nassert hasattr(model, 'coef_'), 'model үйретілмеген'\nassert abs(train_r2 - _m.score(_a, _c)) < 1e-6, f'train_r2 = {_m.score(_a, _c):.4f} болуы керек: model.score(X_train, y_train)'\nassert abs(test_r2 - _m.score(_b, _d)) < 1e-6, f'test_r2 = {_m.score(_b, _d):.4f} болуы керек. Модельді тек X_train, y_train-де үйреттіңіз бе?'" }, hints: ['<code>model.fit(X_train, y_train)</code>', '<code>model.score(X_test, y_test)</code>'] },
          { type: 'quiz', xp: 10, prompt: 'Модель train-де R² = 0.99, test-те R² = 0.45 берді. Бұл не?', options: ['Underfitting: модель тым қарапайым', 'Overfitting: модель train деректі жаттап алған', 'Тамаша модель, test кездейсоқ нашар шықты', 'Деректе қате бар'], answer: 1, explain: 'Train мен test арасындағы үлкен айырма — overfitting-тің классикалық белгісі.' }
        ]
      },
      {
        id: 'ml-4', title: 'Сызықтық регрессия: коэффициенттер және MAE, RMSE, R²', minutes: 16,
        body: `
<p>Бірнеше белгімен сызықтық регрессия: <code>баға = b0 + b1 × ауданы + b2 × жылы</code>. Модель <code>b0</code> (<code>intercept_</code>) мен <code>b1, b2</code>-ні (<code>coef_</code>) MSE ең аз болатындай таңдайды.</p>
<h3>Коэффициентті оқу</h3>
<p><code>b1</code> — <b>басқа белгілер өзгермегенде</b> ауданы 1 м²-ге артса, баға қаншаға өзгереді. Таңбасы бағытты көрсетеді: оң — өседі, теріс — азаяды.</p>
<h3>Қате метрикалары</h3>
<table>
<tr><th>Метрика</th><th>Мағынасы</th><th>Бірлігі</th></tr>
<tr><td><b>MAE</b></td><td>|қате|-лердің орташасы: «әдетте қаншаға қателеседі»</td><td>млн ₸</td></tr>
<tr><td><b>RMSE</b></td><td>√(қате² орташасы): үлкен қателерді қаттырақ жазалайды</td><td>млн ₸</td></tr>
<tr><td><b>R²</b></td><td>бағаның шашырауының қанша үлесін модель түсіндіреді</td><td>бірліксіз</td></tr>
</table>
<p>R² = 1 — тамаша, R² = 0 — орташаны болжаумен бірдей, R² &lt; 0 — орташадан да нашар.</p>
<h3>Қадамдап мысал</h3>
<p>Алдымен қолмен: шын бағалар 30, 40, 50, болжам 32, 37, 50.</p>
<ol>
<li>Қателер: +2, −3, 0. MAE = (2 + 3 + 0) / 3 ≈ 1.67.</li>
<li>Квадраттар: 4, 9, 0. RMSE = √(13 / 3) ≈ 2.08. RMSE ≥ MAE әрқашан.</li>
</ol>
<p>Енді flats деректе:</p>
<pre><code>from sklearn.metrics import mean_absolute_error, root_mean_squared_error, r2_score
X = flats[['area_m2', 'year_built']]
y = flats['price_mln']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression().fit(X_train, y_train)
print(model.coef_)          # [0.656 0.255]
pred = model.predict(X_test)
print(mean_absolute_error(y_test, pred))      # 8.99
print(root_mean_squared_error(y_test, pred))  # 10.64
print(r2_score(y_test, pred))                 # 0.635</code></pre>
<ol>
<li>Жылы бірдей болса, +1 м² ≈ +0.656 млн ₸.</li>
<li>Ауданы бірдей болса, 1 жыл жаңа үй ≈ +0.255 млн ₸.</li>
<li>Модель әдетте ±9 млн ₸-ға қателеседі. Салыстыру: жай орташаны болжасақ, MAE = 13.8. Модель пайдалы, бірақ әлі дөрекі: келесі сабақта ауданды (district) қосамыз.</li>
</ol>
<div class="tip">Әрқашан <b>baseline</b>-мен салыстырыңыз: «бәріне орташа баға» деген болжам. Модель одан жақсы болмаса, оның керегі жоқ.</div>
<h3>Жиі қателер</h3>
<ul>
<li><code>intercept_</code>-ты түсіндіруге тырысу: −510 «0 жылы салынған 0 м² пәтердің бағасы», мағынасы жоқ.</li>
<li>Әртүрлі бірліктегі коэффициенттерді салыстырып, «қайсысы маңызды» деу.</li>
<li>Метриканы train-де есептеу.</li>
<li>Аргумент ретін ауыстыру: <code>(y_true, y_pred)</code>.</li>
</ul>`,
        exercises: [
          { type: 'python', xp: 20, prompt: 'NumPy-мен MAE мен RMSE-ді <b>қолмен</b> есептеп, <code>mae</code> және <code>rmse</code> айнымалыларына жазыңыз (sklearn қолданбаңыз).', starter: 'import numpy as np\ny_true = np.array([30, 40, 50, 60])\ny_pred = np.array([32, 37, 50, 66])\n', solution: 'import numpy as np\ny_true = np.array([30, 40, 50, 60])\ny_pred = np.array([32, 37, 50, 66])\nerr = y_pred - y_true\nmae = np.mean(np.abs(err))\nrmse = np.sqrt(np.mean(err ** 2))\nprint(mae, rmse)', check: { tests: "assert abs(mae - 2.75) < 1e-9, 'mae = 2.75 болуы керек: |қателердің| орташасы'\nassert abs(rmse - 3.5) < 1e-9, 'rmse = 3.5 болуы керек: квадраттардың орташасынан түбір'" }, hints: ['Қателер: <code>err = y_pred - y_true</code>', '<code>np.mean(np.abs(err))</code> және <code>np.sqrt(np.mean(err ** 2))</code>'] },
          { type: 'python', xp: 25, prompt: 'Белгілер <code>area_m2</code>, <code>year_built</code>, бөлу <code>test_size=0.2</code>, <code>random_state=42</code>. <code>model</code>-ді train-де үйретіп, test-те <code>mae</code>, <code>rmse</code>, <code>r2</code> есептеңіз. Ауданның коэффициентін <code>coef_area</code> айнымалысына жазыңыз.', starter: SPLIT + "from sklearn.metrics import mean_absolute_error, root_mean_squared_error, r2_score\n\n", solution: SPLIT + "from sklearn.metrics import mean_absolute_error, root_mean_squared_error, r2_score\n\nX = flats[['area_m2', 'year_built']]\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\nmodel = LinearRegression().fit(X_train, y_train)\npred = model.predict(X_test)\nmae = mean_absolute_error(y_test, pred)\nrmse = root_mean_squared_error(y_test, pred)\nr2 = r2_score(y_test, pred)\ncoef_area = model.coef_[0]\nprint(mae, rmse, r2, coef_area)", check: { tests: RF + "_a, _b, _c, _d = _tts(_f[['area_m2', 'year_built']], _f['price_mln'], test_size=0.2, random_state=42)\n_m = _LinR().fit(_a, _c)\n_e = _m.predict(_b) - _d\nassert abs(mae - _np.mean(_np.abs(_e))) < 1e-6, f'mae ≈ {_np.mean(_np.abs(_e)):.2f} болуы керек (test деректе)'\nassert abs(rmse - _np.sqrt(_np.mean(_e ** 2))) < 1e-6, f'rmse ≈ {_np.sqrt(_np.mean(_e ** 2)):.2f} болуы керек'\nassert abs(r2 - _m.score(_b, _d)) < 1e-6, f'r2 ≈ {_m.score(_b, _d):.3f} болуы керек'\nassert abs(coef_area - _m.coef_[0]) < 1e-6, 'coef_area — model.coef_[0] (area_m2 бірінші баған)'" }, hints: ['Метрикалар: <code>mean_absolute_error(y_test, pred)</code> т.б.', '<code>coef_area = model.coef_[0]</code>'] },
          { type: 'number', xp: 10, prompt: 'Модельде <code>area_m2</code> коэффициенті 0.656 (млн ₸ / м²). Жылы бірдей екі пәтердің біреуі 10 м²-ге үлкен. Модель бойынша олардың бағасы қаншаға (млн ₸) ерекшеленеді?', answer: 6.56, tol: 0.01, unit: 'млн ₸', explain: '10 × 0.656 = 6.56 млн ₸. Басқа белгілер бірдей болғанда ғана осылай оқимыз.' }
        ]
      },
      {
        id: 'ml-5', title: 'Категориялық белгілер: one-hot encoding', minutes: 14,
        body: `
<p>Алматыда бағаны ең көп анықтайтын нәрсе — аудан (district). Бірақ <code>district</code> — мәтін («Медеу», «Алатау»), ал модель тек санмен жұмыс істейді.</p>
<h3>Неге 1, 2, 3... деп нөмірлемеске?</h3>
<p>Алатау = 0, Алмалы = 1, ..., Медеу = 3 десек, модель «Медеу Алмалыдан үш есе көп» немесе «аудандар бір сызықта тұр» деп ойлайды. Мұндай рет жоқ. Тексерілді: нөмірленген district-пен test R² = 0.63 — ауданды мүлде қоспағандай.</p>
<h3>One-hot encoding</h3>
<p>Әр аудан үшін жеке 0/1 баған: пәтер сол ауданда болса 1, әйтпесе 0.</p>
<table>
<tr><th>district</th><th>district_Алмалы</th><th>district_Медеу</th><th>...</th></tr>
<tr><td>Алмалы</td><td>1</td><td>0</td><td>...</td></tr>
<tr><td>Медеу</td><td>0</td><td>1</td><td>...</td></tr>
<tr><td>Алатау</td><td>0</td><td>0</td><td>...</td></tr>
</table>
<h3>Қадамдап мысал</h3>
<pre><code>X = pd.get_dummies(flats[['area_m2', 'year_built', 'district']],
                   columns=['district'], drop_first=True, dtype=int)
print(X.shape)        # (400, 7)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression().fit(X_train, y_train)
print(model.score(X_test, y_test))   # 0.911 (бұрын 0.635)</code></pre>
<ol>
<li>6 аудан → 6 баған. <code>drop_first=True</code> біріншісін (Алатау) алып тастайды: қалған бесеуі 0 болса, пәтер Алатауда екені белгілі. Бұл <b>baseline</b> аудан.</li>
<li><code>dtype=int</code> True/False орнына 1/0 береді.</li>
<li>Нәтиже: 2 сандық баған + 5 аудан бағаны = 7.</li>
<li>Коэффициенттер: <code>district_Медеу</code> ≈ 21.8. Яғни ауданы мен жылы бірдей пәтер Медеуде Алатаудан шамамен 21.8 млн ₸ қымбат.</li>
<li>Test R² 0.635 → 0.911, MAE 9.0 → 3.8 млн ₸. Бір баған модельді түбегейлі жақсартты.</li>
</ol>
<div class="tip">get_dummies-ті train/test-ке бөлмей тұрып, бүкіл X-ке бір рет жасаңыз. Сонда екі бөлікте бағандар бірдей болады.</div>
<h3>Жиі қателер</h3>
<ul>
<li>Категорияны нөмірмен (label encoding) сызықтық модельге беру.</li>
<li>get_dummies-ті train мен test-ке бөлек жасау: test-те бір аудан кездеспесе, бағандар саны сәйкес келмейді.</li>
<li>Мыңдаған мәні бар бағанды (мысалы, <code>customer_id</code>) one-hot ету: мыңдаған пайдасыз баған пайда болады.</li>
<li><code>columns=</code>-ды ұмытып, бүкіл DataFrame-ді беру: онда барлық мәтін бағандары кодталады, бұл кейде күтпеген нәтиже береді.</li>
</ul>`,
        exercises: [
          { type: 'python', xp: 20, prompt: '<code>flats</code>-тің <code>area_m2</code>, <code>year_built</code>, <code>district</code> бағандарынан <code>pd.get_dummies</code> арқылы <code>X</code> жасаңыз: <code>columns=[\'district\']</code>, <code>drop_first=True</code>, <code>dtype=int</code>. <code>X.columns</code>-ты шығарыңыз.', starter: FL + "\n", solution: FL + "X = pd.get_dummies(flats[['area_m2', 'year_built', 'district']], columns=['district'], drop_first=True, dtype=int)\nprint(X.columns.tolist())", check: { tests: "assert isinstance(X, pd.DataFrame), 'X DataFrame болуы керек'\nassert 'district' not in X.columns, 'district мәтін бағаны қалмауы керек: columns=[\"district\"]'\nassert X.shape == (400, 7), f'X пішіні (400, 7) болуы керек, сізде {X.shape}. drop_first=True қойдыңыз ба?'\nassert 'district_Медеу' in X.columns and 'district_Алатау' not in X.columns, 'Алатау (бірінші) алынып, district_Медеу қалуы керек'\nassert all(str(_t).startswith('int') or str(_t).startswith('float') for _t in X.dtypes), 'Барлық баған сан болуы керек: dtype=int'", mustInclude: ['get_dummies('] }, hints: ["<code>pd.get_dummies(flats[[...]], columns=['district'], drop_first=True, dtype=int)</code>"] },
          { type: 'python', xp: 25, prompt: 'One-hot <code>X</code> дайын. Оны <code>test_size=0.2</code>, <code>random_state=42</code> арқылы бөліп, <code>model</code>-ді үйретіңіз. Test R²-ды <code>test_r2</code>-ге, <code>district_Медеу</code> коэффициентін <code>coef_medeu</code>-ге жазыңыз.', starter: SPLIT + "X = pd.get_dummies(flats[['area_m2', 'year_built', 'district']], columns=['district'], drop_first=True, dtype=int)\ny = flats['price_mln']\n", solution: SPLIT + "X = pd.get_dummies(flats[['area_m2', 'year_built', 'district']], columns=['district'], drop_first=True, dtype=int)\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\nmodel = LinearRegression().fit(X_train, y_train)\ntest_r2 = model.score(X_test, y_test)\ncoef_medeu = model.coef_[list(X.columns).index('district_Медеу')]\nprint(test_r2, coef_medeu)", check: { tests: RF + "_X = _pd.get_dummies(_f[['area_m2', 'year_built', 'district']], columns=['district'], drop_first=True, dtype=int)\n_a, _b, _c, _d = _tts(_X, _f['price_mln'], test_size=0.2, random_state=42)\n_m = _LinR().fit(_a, _c)\nassert hasattr(model, 'coef_') and model.n_features_in_ == 7, 'model one-hot X-те (7 баған) үйретілуі керек'\nassert abs(test_r2 - _m.score(_b, _d)) < 1e-6, f'test_r2 ≈ {_m.score(_b, _d):.3f} болуы керек: train-де үйретіп, test-те бағалаңыз'\n_cm = _m.coef_[list(_X.columns).index('district_Медеу')]\nassert abs(coef_medeu - _cm) < 1e-6, f'coef_medeu ≈ {_cm:.2f} болуы керек: district_Медеу бағанының индексін табыңыз'" }, hints: ["Индекс: <code>list(X.columns).index('district_Медеу')</code>", '<code>model.coef_[i]</code>'] },
          { type: 'quiz', xp: 10, prompt: 'Неге district-ті 0, 1, 2, ... деп нөмірлеп, сызықтық модельге беру нашар?', options: ['Сандар тым үлкен', 'Модель аудандар арасында жоқ рет пен қашықтықты «ойлап табады»', 'sklearn мәтінді өзі түсінеді', 'Нөмірлеу тым баяу'], answer: 1, explain: 'Сызықтық модель «нөмір 1-ге артса, баға b-ға өседі» деп оқиды. Аудандарда мұндай рет жоқ, сондықтан one-hot керек.' }
        ]
      },
      {
        id: 'ml-6', title: 'k-nearest neighbours және feature scaling', minutes: 16,
        body: `
<p><b>k-nearest neighbours</b> (KNN) — ең түсінікті модель. Жаңа пәтердің бағасын білгіңіз келсе, train-нен оған <b>ең ұқсас k пәтерді</b> тауып, олардың бағасының орташасын аласыз. Classification-да — көршілердің көпшілік дауысы. Ұқсастықты Math for ML модуліндегі Евклид қашықтығы өлшейді.</p>
<h3>Масштаб мәселесі</h3>
<p>Қашықтық барлық бағанды бірдей қосады. Ал <code>area_m2</code> ондаған бірлікке өзгереді, <code>district_Медеу</code> тек 0 немесе 1. Нәтижесінде KNN үшін 3 м² айырма аудан айырмасынан үлкен көрінеді.</p>
<h3>Қадамдап мысал</h3>
<table>
<tr><th>Пәтер</th><th>area_m2</th><th>district_Медеу</th><th>district_Алатау</th></tr>
<tr><td>A</td><td>60</td><td>1</td><td>0</td></tr>
<tr><td>B</td><td>63</td><td>0</td><td>1</td></tr>
<tr><td>C</td><td>70</td><td>1</td><td>0</td></tr>
</table>
<ol>
<li>Шикі қашықтық: A–B = √(3² + 1² + 1²) ≈ 3.3, A–C = √(10²) = 10. KNN үшін B «жақынырақ», бірақ ол арзан ауданда!</li>
<li><b>StandardScaler</b> әр бағанды z-score-ға айналдырады: <code>(x − орташа) / SD</code> (Statistics модулінен таныс). area SD ≈ 20, dummy SD ≈ 0.37.</li>
<li>Масштабтан кейін: A–B ≈ √(0.15² + 2.7² + 2.7²) ≈ 3.8, A–C ≈ 10 / 20 = 0.5. Енді C әлдеқайда жақын. Дұрыс.</li>
</ol>
<pre><code>from sklearn.neighbors import KNeighborsRegressor
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
scaler.fit(X_train)                     # орташа мен SD тек train-нен
X_train_s = scaler.transform(X_train)
X_test_s = scaler.transform(X_test)     # сол сандармен

knn = KNeighborsRegressor(n_neighbors=5).fit(X_train_s, y_train)
print(knn.score(X_test_s, y_test))      # 0.91 (масштабсыз 0.57)</code></pre>
<p>Ауданы, жылы және district-тің one-hot бағандарымен масштабсыз KNN test R² = 0.57, масштабпен 0.91.</p>
<div class="tip">Масштаб қашықтыққа немесе градиентке сүйенетін модельдерге керек (KNN, logistic regression, нейрон желілер). Decision tree-ге керек емес.</div>
<h3>Жиі қателер</h3>
<ul>
<li>Scaler-ді бүкіл деректе немесе test-те <code>fit</code> ету: test туралы ақпарат модельге «ағып» кетеді (leakage).</li>
<li>Test-ке <code>transform</code> жасауды ұмыту: модель масштабталған train пен шикі test-ті салыстырады.</li>
<li><code>n_neighbors=1</code>: модель әр шуды жаттайды, overfitting.</li>
<li>Target-ті (<code>y</code>) масштабтау: KNN мен регрессияға бұл керек емес.</li>
</ul>`,
        exercises: [
          { type: 'python', xp: 20, prompt: '<code>flats[[\'area_m2\', \'year_built\']]</code>-ты <code>StandardScaler</code>-мен масштабтап, нәтижені <code>Xs</code>-ке жазыңыз (<code>fit_transform</code>). Әр бағанның орташасы мен SD-ін шығарыңыз.', starter: "import pandas as pd\nfrom sklearn.preprocessing import StandardScaler\nflats = pd.read_csv('flats.csv')\n", solution: "import pandas as pd\nfrom sklearn.preprocessing import StandardScaler\nflats = pd.read_csv('flats.csv')\nscaler = StandardScaler()\nXs = scaler.fit_transform(flats[['area_m2', 'year_built']])\nprint(Xs.mean(axis=0), Xs.std(axis=0))", check: { tests: "import numpy as _np\nassert _np.asarray(Xs).shape == (400, 2), 'Xs пішіні (400, 2) болуы керек'\nassert _np.all(_np.abs(_np.asarray(Xs).mean(axis=0)) < 1e-9), 'Масштабталған бағандардың орташасы 0 болуы керек'\nassert _np.all(_np.abs(_np.asarray(Xs).std(axis=0) - 1) < 1e-9), 'Масштабталған бағандардың SD-і 1 болуы керек'", mustInclude: ['StandardScaler('] }, hints: ['<code>scaler = StandardScaler()</code>', "<code>Xs = scaler.fit_transform(flats[['area_m2', 'year_built']])</code>"] },
          { type: 'python', xp: 25, prompt: 'Бөлу дайын. Екі KNN (<code>n_neighbors=5</code>) үйретіңіз: (1) шикі деректе, test R² → <code>r2_raw</code>; (2) train-де fit етілген <code>StandardScaler</code>-мен, test R² → <code>r2_scaled</code>. Екеуін шығарыңыз.', starter: SPLIT + "from sklearn.neighbors import KNeighborsRegressor\nfrom sklearn.preprocessing import StandardScaler\nX = pd.get_dummies(flats[['area_m2', 'year_built', 'district']], columns=['district'], dtype=int)\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n", solution: SPLIT + "from sklearn.neighbors import KNeighborsRegressor\nfrom sklearn.preprocessing import StandardScaler\nX = pd.get_dummies(flats[['area_m2', 'year_built', 'district']], columns=['district'], dtype=int)\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\nknn = KNeighborsRegressor(n_neighbors=5).fit(X_train, y_train)\nr2_raw = knn.score(X_test, y_test)\nscaler = StandardScaler().fit(X_train)\nknn_s = KNeighborsRegressor(n_neighbors=5).fit(scaler.transform(X_train), y_train)\nr2_scaled = knn_s.score(scaler.transform(X_test), y_test)\nprint(r2_raw, r2_scaled)", check: { tests: "assert abs(r2_raw - 0.574) < 0.01, f'r2_raw ≈ 0.574 болуы керек (масштабсыз, k=5), сізде {r2_raw:.3f}'\nassert abs(r2_scaled - 0.912) < 0.01, f'r2_scaled ≈ 0.912 болуы керек, сізде {r2_scaled:.3f}. Scaler-ді X_train-де fit етіп, екі бөлікті де transform жасадыңыз ба?'", mustInclude: ['transform('] }, hints: ['<code>scaler = StandardScaler().fit(X_train)</code>', '<code>knn_s.fit(scaler.transform(X_train), y_train)</code>, бағалау <code>scaler.transform(X_test)</code>-пен'] },
          { type: 'quiz', xp: 10, prompt: '<code>StandardScaler</code>-ді қай деректе <code>fit</code> ету керек?', options: ['Бүкіл деректе (train + test)', 'Тек train-де, сосын train мен test-ті transform жасау', 'Тек test-те', 'Train мен test-те бөлек-бөлек'], answer: 1, explain: 'Орташа мен SD тек train-нен алынуы керек. Әйтпесе test туралы ақпарат модельге ағып кетеді, ал бөлек fit екі бөлікті әртүрлі шкалаға келтіреді.' }
        ]
      },
      {
        id: 'ml-7', title: 'Логистикалық регрессия: churn ықтималдығы', minutes: 16,
        body: `
<p>Енді classification: телеком абоненті келесі айда кете ме (<code>churned</code> = 1) әлде қала ма (0)? Сызықтық регрессия бұл жерде ыңғайсыз: ол −0.3 немесе 1.4 сияқты мағынасыз мәндер береді. Бізге 0 мен 1 аралығындағы <b>ықтималдық</b> керек.</p>
<h3>Sigmoid</h3>
<p><b>Logistic regression</b> алдымен сызықтық қосынды есептейді: <code>z = b0 + b1·x1 + ...</code>, сосын оны <b>sigmoid</b> функциясынан өткізеді: <code>p = 1 / (1 + e<sup>−z</sup>)</code>. z = 0 болса p = 0.5, z үлкен болса p → 1, z теріс болса p → 0.</p>
<h3>Қадамдап мысал</h3>
<pre><code>from sklearn.linear_model import LogisticRegression
churn = pd.read_csv('churn.csv')
features = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']
X = churn[features]
y = churn['churned']
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42, stratify=y)

clf = LogisticRegression(max_iter=1000)
clf.fit(X_train, y_train)
proba = clf.predict_proba(X_test)[:, 1]
print(proba[:3])                  # [0.44 0.438 0.058]
print(clf.predict(X_test)[:3])    # [0 0 0]
print(clf.score(X_test, y_test))  # 0.807 (accuracy)</code></pre>
<ol>
<li><code>age</code> мен <code>data_gb</code>-де бос мәндер бар, ал sklearn NaN-ды қабылдамайды. Сондықтан бос мәні жоқ төрт белгіні алдық.</li>
<li><code>stratify=y</code>: train мен test-те кеткендер үлесі бірдей (≈26%).</li>
<li><code>predict_proba</code> екі баған береді: [P(0), P(1)]. Бізге кету ықтималдығы, яғни <code>[:, 1]</code>.</li>
<li><code>predict</code> = ықтималдық ≥ <b>0.5</b> болса 1. Бірінші абоненттің p = 0.44, сондықтан 0, бірақ ол шекарада тұр.</li>
<li>Коэффициенттер таңбасы: <code>tenure_months</code> теріс (ұзақ жүрген адал), <code>support_calls</code> оң (көп шағым — кету белгісі), <code>has_contract</code> теріс.</li>
</ol>
<h3>Шекті өзгерту</h3>
<p>0.5 — заң емес. Retention бөлімі көбірек абонентті ұстап қалғысы келсе, <code>(proba &gt;= 0.3).astype(int)</code> деп шекті түсіреді: көбірек адам «қауіпті» деп белгіленеді.</p>
<div class="tip"><i>ConvergenceWarning</i> шықса, <code>max_iter=1000</code> қойыңыз немесе белгілерді масштабтаңыз.</div>
<h3>Жиі қателер</h3>
<ul>
<li><code>predict_proba(X)[:, 0]</code> алу — бұл <b>қалу</b> ықтималдығы.</li>
<li>NaN бар бағандарды тексермей беру: <i>Input X contains NaN</i> қатесі.</li>
<li>Ықтималдық керек жерде <code>predict</code>-ті қолдану: шекті таңдау мүмкіндігі жоғалады.</li>
</ul>`,
        exercises: [
          { type: 'python', xp: 25, prompt: 'Бөлу дайын. <code>LogisticRegression(max_iter=1000)</code>-ды <code>clf</code> атымен үйретіңіз. Test-тегі кету ықтималдығын <code>proba</code>-ға (<code>predict_proba(...)[:, 1]</code>), accuracy-ді <code>acc</code>-қа жазып, шығарыңыз.', starter: CH + "from sklearn.linear_model import LogisticRegression\n\n", solution: CH + "from sklearn.linear_model import LogisticRegression\n\nclf = LogisticRegression(max_iter=1000)\nclf.fit(X_train, y_train)\nproba = clf.predict_proba(X_test)[:, 1]\nacc = clf.score(X_test, y_test)\nprint(acc, proba[:5])", check: { tests: RC + "assert hasattr(clf, 'coef_'), 'clf үйретілмеген: clf.fit(X_train, y_train)'\nassert len(proba) == 150, 'proba test деректің 150 абоненті үшін болуы керек'\nassert _np.all((_np.asarray(proba) >= 0) & (_np.asarray(proba) <= 1)), 'proba 0 мен 1 аралығында болуы керек'\nassert abs(_np.mean(proba) - _np.mean(_p)) < 0.02, 'proba кету ықтималдығы болуы керек: [:, 1] бағанын алыңыз'\nassert abs(acc - _m.score(_Xte, _yte)) < 0.02, f'acc ≈ {_m.score(_Xte, _yte):.3f} болуы керек: clf.score(X_test, y_test)'", mustInclude: ['predict_proba('] }, hints: ['<code>clf.fit(X_train, y_train)</code>', '<code>clf.predict_proba(X_test)[:, 1]</code>'] },
          { type: 'python', xp: 20, prompt: 'Модель мен <code>proba</code> дайын. Шекті 0.3 етіп, болжамды <code>pred_03</code>-ке (0/1 массив) жазыңыз. «Қауіпті» абоненттер санын: 0.5 шекпен <code>n_05</code>-ке, 0.3 шекпен <code>n_03</code>-ке жазып, шығарыңыз.', starter: CHM + "\n", solution: CHM + "\npred_03 = (proba >= 0.3).astype(int)\nn_05 = int(clf.predict(X_test).sum())\nn_03 = int(pred_03.sum())\nprint(n_05, n_03)", check: { tests: RC + "_n5 = int((_p >= 0.5).sum())\n_n3 = int((_p >= 0.3).sum())\nassert len(pred_03) == 150 and set(_np.unique(pred_03)) <= {0, 1}, 'pred_03 — 150 мәнді 0/1 массив'\nassert abs(n_05 - _n5) <= 2, f'n_05 ≈ {_n5} болуы керек: clf.predict(X_test).sum()'\nassert abs(n_03 - _n3) <= 2 and n_03 == int(_np.sum(pred_03)), f'n_03 ≈ {_n3} болуы керек: (proba >= 0.3).sum()'\nassert n_03 > n_05, 'Шекті түсірсек, қауіпті абоненттер көбеюі керек'" }, hints: ['<code>(proba &gt;= 0.3).astype(int)</code>', '<code>int(pred_03.sum())</code>'] },
          { type: 'number', xp: 10, prompt: 'Logistic regression бір абонент үшін z = 2 есептеді. Sigmoid бойынша кету ықтималдығы p = 1 / (1 + e<sup>−2</sup>) қанша? (үш таңбаға дейін)', answer: 0.881, tol: 0.005, explain: 'e<sup>−2</sup> ≈ 0.135. 1 / 1.135 ≈ 0.881.' }
        ]
      },
      {
        id: 'ml-8', title: 'Classification метрикалары: accuracy жеткіліксіз', minutes: 16,
        body: `
<p>Біздің модельдің accuracy-і 80.7%. Жақсы ма? Тексерейік: test-те 150 абоненттің 39-ы кетті (26%). «Ешкім кетпейді» деп айтатын ақымақ модель 111 / 150 = <b>74%</b> accuracy алады. Біз одан небәрі 7 пунктке озамыз. Сыныптар теңсіз (imbalanced) болса, accuracy алдайды.</p>
<h3>Confusion matrix</h3>
<p><code>confusion_matrix(y_test, pred)</code> sklearn-де былай орналасады:</p>
<table>
<tr><th></th><th>Болжам 0</th><th>Болжам 1</th></tr>
<tr><td><b>Шын 0</b></td><td>TN = 105</td><td>FP = 6</td></tr>
<tr><td><b>Шын 1</b></td><td>FN = 23</td><td>TP = 16</td></tr>
</table>
<ul>
<li><b>Precision</b> = TP / (TP + FP): «кетеді» дегендердің қаншасы шынымен кетті.</li>
<li><b>Recall</b> = TP / (TP + FN): шын кеткендердің қаншасын таптық.</li>
<li><b>F1</b> — екеуінің гармоникалық орташасы: 2·P·R / (P + R).</li>
</ul>
<h3>Қадамдап мысал</h3>
<ol>
<li>Precision = 16 / (16 + 6) = 0.727. Ескертсек, 73% жағдайда дұрыс.</li>
<li>Recall = 16 / (16 + 23) = 0.41. Кеткендердің 59%-ын байқамадық!</li>
<li>F1 = 2 · 0.727 · 0.41 / (0.727 + 0.41) ≈ 0.525.</li>
<li>Шекті 0.3-ке түсірсек: TP = 30, FP = 29, FN = 9. Recall = 0.77, precision = 0.51. Көбірек кетушіні ұстаймыз, бірақ көбірек «бос дабыл».</li>
<li>Қайсысы дұрыс — бизнес шешеді: бір абонентке жеңілдік ұсыну арзан, ал жоғалту қымбат болса, recall маңыздырақ.</li>
</ol>
<h3>ROC AUC</h3>
<p>Precision мен recall шекке тәуелді. <b>ROC AUC</b> шекке тәуелсіз: кездейсоқ бір кеткен және бір қалған абонентті алсақ, модель кеткенге жоғары ықтималдық беру мүмкіндігі. 0.5 — тиын лақтыру, 1.0 — мінсіз. Біздікі ≈ 0.82.</p>
<pre><code>from sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score, roc_auc_score
pred = clf.predict(X_test)
print(confusion_matrix(y_test, pred))
print(precision_score(y_test, pred), recall_score(y_test, pred), f1_score(y_test, pred))
print(roc_auc_score(y_test, proba))   # ықтималдық, 0/1 емес!</code></pre>
<h3>Жиі қателер</h3>
<ul>
<li>Imbalanced деректе тек accuracy-ге қарау. Әрқашан baseline-мен салыстырыңыз.</li>
<li>Аргумент ретін ауыстыру: <code>(y_true, y_pred)</code>, керісінше емес. Precision мен recall орын ауысады.</li>
<li><code>roc_auc_score</code>-қа 0/1 болжамды беру: AUC мағынасын жоғалтады.</li>
</ul>`,
        exercises: [
          { type: 'python', xp: 20, prompt: 'sklearn-сіз, қолмен: <code>tp</code>, <code>fp</code>, <code>fn</code>, <code>tn</code> санап, <code>precision</code> мен <code>recall</code> есептеңіз.', starter: 'y_true = [1, 0, 1, 1, 0, 0, 1, 0, 0, 1]\ny_pred = [1, 0, 0, 1, 1, 0, 1, 0, 0, 0]\n', solution: 'y_true = [1, 0, 1, 1, 0, 0, 1, 0, 0, 1]\ny_pred = [1, 0, 0, 1, 1, 0, 1, 0, 0, 0]\npairs = list(zip(y_true, y_pred))\ntp = pairs.count((1, 1))\nfp = pairs.count((0, 1))\nfn = pairs.count((1, 0))\ntn = pairs.count((0, 0))\nprecision = tp / (tp + fp)\nrecall = tp / (tp + fn)\nprint(tp, fp, fn, tn, precision, recall)', check: { tests: "assert (tp, fp, fn, tn) == (3, 1, 2, 4), 'tp=3, fp=1, fn=2, tn=4 болуы керек: әр жұпты (шын, болжам) санаңыз'\nassert abs(precision - 0.75) < 1e-9, 'precision = tp / (tp + fp) = 0.75'\nassert abs(recall - 0.6) < 1e-9, 'recall = tp / (tp + fn) = 0.6'" }, hints: ['TP: шын 1, болжам 1. FP: шын 0, болжам 1. FN: шын 1, болжам 0.', '<code>list(zip(y_true, y_pred)).count((1, 1))</code>'] },
          { type: 'python', xp: 25, prompt: 'Модель дайын. <code>pred = clf.predict(X_test)</code> бойынша <code>cm</code> (confusion matrix), <code>prec</code>, <code>rec</code>, <code>f1</code> есептеңіз. <code>auc</code>-ты <code>proba</code> бойынша есептеңіз. Барлығын шығарыңыз.', starter: CHM + "from sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score, roc_auc_score\n\n", solution: CHM + "from sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score, roc_auc_score\n\npred = clf.predict(X_test)\ncm = confusion_matrix(y_test, pred)\nprec = precision_score(y_test, pred)\nrec = recall_score(y_test, pred)\nf1 = f1_score(y_test, pred)\nauc = roc_auc_score(y_test, proba)\nprint(cm)\nprint(prec, rec, f1, auc)", check: { tests: RC + "from sklearn import metrics as _mt\n_pr = _m.predict(_Xte)\nassert _np.asarray(cm).shape == (2, 2) and _np.asarray(cm).sum() == 150, 'cm — 2×2 матрица, қосындысы 150'\nassert _np.asarray(cm)[1, 1] == _mt.confusion_matrix(_yte, _pr)[1, 1], 'cm[1, 1] (TP) сәйкес келмейді: confusion_matrix(y_test, pred)'\nassert abs(prec - _mt.precision_score(_yte, _pr)) < 0.02, f'prec ≈ {_mt.precision_score(_yte, _pr):.3f}. Аргумент реті: (y_test, pred)'\nassert abs(rec - _mt.recall_score(_yte, _pr)) < 0.02, f'rec ≈ {_mt.recall_score(_yte, _pr):.3f}'\nassert abs(f1 - _mt.f1_score(_yte, _pr)) < 0.02, f'f1 ≈ {_mt.f1_score(_yte, _pr):.3f}'\nassert abs(auc - _mt.roc_auc_score(_yte, _p)) < 0.02, f'auc ≈ {_mt.roc_auc_score(_yte, _p):.3f}. roc_auc_score-қа proba беріңіз, pred емес'" }, hints: ['Барлық метрика: <code>(y_test, pred)</code>', '<code>roc_auc_score(y_test, proba)</code>'] },
          { type: 'number', xp: 15, prompt: 'Confusion matrix: TN = 82, FP = 29, FN = 9, TP = 30. Recall қанша? (үш таңбаға дейін)', answer: 0.769, tol: 0.002, explain: 'Recall = TP / (TP + FN) = 30 / 39 ≈ 0.769.' }
        ]
      },
      {
        id: 'ml-9', title: 'Decision trees: тереңдік және overfitting', minutes: 15,
        body: `
<p><b>Decision tree</b> — «иә/жоқ» сұрақтар тізбегі, ойын «20 сұрақ» сияқты. Біздің churn train дерегінде тереңдігі 2 ағаш мынаны тапты:</p>
<pre><code>tenure_months &lt;= 26.5 ?
├─ иә → has_contract == 0 ?
│        ├─ иә → кетеді   (63 кеткен / 107)
│        └─ жоқ → қалады  (22 / 74)
└─ жоқ → support_calls &lt;= 2.5 ?
         ├─ иә → қалады   (17 / 221)
         └─ жоқ → қалады  (14 / 48)</code></pre>
<p>Ағаш әр қадамда кластарды ең жақсы бөлетін сұрақты (белгі мен шекті) өзі таңдайды. Тазалық Gini индексімен өлшенеді, бірақ интуиция қарапайым: бөлгеннен кейін әр топта бір класс басым болсын.</p>
<h3>Тереңдік = күрделілік</h3>
<p><code>max_depth</code> — сұрақтардың ең ұзын тізбегі. Шектемесек, ағаш әр абонентке жеке жапырақ жасап, train деректі толық жаттайды.</p>
<h3>Қадамдап мысал</h3>
<pre><code>from sklearn.tree import DecisionTreeClassifier
for d in [1, 2, 3, 5, 8, None]:
    tree = DecisionTreeClassifier(max_depth=d, random_state=0)
    tree.fit(X_train, y_train)
    print(d, tree.score(X_train, y_train), tree.score(X_test, y_test))</code></pre>
<table>
<tr><th>max_depth</th><th>train</th><th>test</th></tr>
<tr><td>1</td><td>0.742</td><td>0.740</td></tr>
<tr><td>2</td><td>0.784</td><td>0.800</td></tr>
<tr><td>3</td><td>0.793</td><td>0.807</td></tr>
<tr><td>5</td><td>0.836</td><td>0.780</td></tr>
<tr><td>8</td><td>0.907</td><td>0.720</td></tr>
<tr><td>None</td><td>0.989</td><td>0.687</td></tr>
</table>
<ol>
<li>Тереңдік 1: бір ғана сұрақ, модель тым қарапайым (underfitting): екі балл да төмен.</li>
<li>Тереңдік 3: test-те ең жақсы.</li>
<li>Тереңдік өскен сайын train өседі, ал test <b>төмендейді</b>: overfitting.</li>
<li>Шектеусіз ағаш train-де 99%, test-те «ешкім кетпейді» baseline-нан (74%) да нашар.</li>
</ol>
<p><code>tree.feature_importances_</code> әр белгінің бөлулерге қосқан үлесін көрсетеді: тереңдігі 3 ағашта <code>tenure_months</code> ≈ 0.55, <code>support_calls</code> ≈ 0.24.</p>
<div class="tip">Ағашқа масштаб керек емес: ол «x ≤ шек?» деп қана сұрайды, бірліктер маңызды емес.</div>
<h3>Жиі қателер</h3>
<ul>
<li><code>max_depth</code>-ты бермеу: әдепкі бойынша ағаш шексіз өседі.</li>
<li><code>feature_importances_</code>-ты себеп немесе бағыт деп оқу: ол тек «бөлуге қаншалықты пайдалы» дейді.</li>
<li>Тереңдікті test нәтижесіне қарап таңдау. Бұл test-ті «тозды». Келесі сабақта cross-validation-мен дұрыс таңдаймыз.</li>
</ul>`,
        exercises: [
          { type: 'python', xp: 20, prompt: '<code>DecisionTreeClassifier(max_depth=3, random_state=0)</code>-ды <code>tree</code> атымен үйретіңіз. Test accuracy → <code>test_acc</code>. Ең маңызды белгінің атауын (<code>feature_importances_</code> бойынша) <code>top_feature</code>-ге жазыңыз.', starter: CH + "from sklearn.tree import DecisionTreeClassifier\n\n", solution: CH + "from sklearn.tree import DecisionTreeClassifier\n\ntree = DecisionTreeClassifier(max_depth=3, random_state=0)\ntree.fit(X_train, y_train)\ntest_acc = tree.score(X_test, y_test)\nimp = pd.Series(tree.feature_importances_, index=features)\ntop_feature = imp.idxmax()\nprint(test_acc, top_feature)\nprint(imp)", check: { tests: "from sklearn.tree import DecisionTreeClassifier as _DT\nassert isinstance(tree, _DT) and tree.get_depth() <= 3, 'tree — max_depth=3 болатын DecisionTreeClassifier'\nassert abs(test_acc - 0.807) < 0.02, f'test_acc ≈ 0.807 болуы керек, сізде {test_acc:.3f}'\nassert top_feature == 'tenure_months', 'Ең маңызды белгі басқа: feature_importances_ ең үлкен мәнінің атауын алыңыз'", mustInclude: ['feature_importances_'] }, hints: ['<code>pd.Series(tree.feature_importances_, index=features)</code>', '<code>.idxmax()</code> ең үлкен мәннің индексін (атауын) береді'] },
          { type: 'python', xp: 25, prompt: '<code>[1, 2, 3, 4, 5, 6, 8, None]</code> тереңдіктері үшін ағаш (<code>random_state=0</code>) үйретіп, <code>results</code> сөздігіне <code>depth: (train_acc, test_acc)</code> жазыңыз. Test accuracy ең жоғары тереңдікті <code>best_depth</code>-ке жазыңыз.', starter: CH + "from sklearn.tree import DecisionTreeClassifier\n\nresults = {}\n", solution: CH + "from sklearn.tree import DecisionTreeClassifier\n\nresults = {}\nfor d in [1, 2, 3, 4, 5, 6, 8, None]:\n    tree = DecisionTreeClassifier(max_depth=d, random_state=0).fit(X_train, y_train)\n    results[d] = (tree.score(X_train, y_train), tree.score(X_test, y_test))\nbest_depth = max(results, key=lambda d: results[d][1])\nfor d, (tr, te) in results.items():\n    print(d, round(tr, 3), round(te, 3))\nprint('best:', best_depth)", check: { tests: "assert set(results) == {1, 2, 3, 4, 5, 6, 8, None}, 'results-те барлық 8 тереңдік (None-ды қоса) болуы керек'\nassert all(len(v) == 2 for v in results.values()), 'Әр мән — (train_acc, test_acc) жұбы'\nassert results[None][0] > 0.95, 'Шектеусіз ағаштың train accuracy-і ≈ 0.99 болуы керек: бірінші train, сосын test'\nassert results[None][1] < results[3][1], 'Шектеусіз ағаш test-те тереңдігі 3 ағаштан нашар болуы керек'\nassert best_depth == 3, f'best_depth = 3 болуы керек, сізде {best_depth}. Test accuracy (екінші элемент) бойынша таңдаңыз'" }, hints: ['Цикл: <code>for d in [1, 2, 3, 4, 5, 6, 8, None]:</code>', '<code>max(results, key=lambda d: results[d][1])</code>'] },
          { type: 'quiz', xp: 10, prompt: 'Ағаш train-де 0.99, test-те 0.69 берді. Не істеу керек?', options: ['max_depth-ты көбейту', 'max_depth-ты азайту (ағашты қарапайымдату)', 'Белгілерді масштабтау', 'Test деректі train-ге қосу'], answer: 1, explain: 'Бұл overfitting. Тереңдікті шектеу модельді қарапайымдатады. Масштаб ағашқа әсер етпейді, ал test-ті train-ге қосу бағалауды бұзады.' }
        ]
      },
      {
        id: 'ml-10', title: 'Cross-validation және bias-variance trade-off', minutes: 16,
        body: `
<p>Бір train/test бөлуі — бір ғана емтихан. Test-ке «жеңіл» абоненттер түсіп қалса, модель шынайыдан жақсы көрінеді. Оның үстіне, тереңдікті test-ке қарап таңдасақ, test енді әділ емес.</p>
<h3>K-fold cross-validation</h3>
<p>Деректі 5 тең бөлікке (fold) бөлеміз. 5 рет: 4 бөлікте үйретеміз, қалған 1-де бағалаймыз. Әр абонент дәл бір рет test-те болады. Нәтиже — 5 балл, олардан <b>орташа ± SD</b>.</p>
<pre><code>from sklearn.model_selection import cross_val_score
scores = cross_val_score(DecisionTreeClassifier(max_depth=3, random_state=0),
                         X, y, cv=5)
print(scores)                       # [0.742 0.742 0.833 0.767 0.808]
print(scores.mean(), scores.std())  # 0.778 0.037</code></pre>
<p>Classifier үшін <code>cv=5</code> өзі stratified бөлуді қолданады. SD — тұрақтылық: бір fold-та 0.74, басқасында 0.83, яғни бір бөлудің нәтижесіне ±4 пункт сенбеу керек.</p>
<h3>Қадамдап мысал: тереңдікті таңдау</h3>
<table>
<tr><th>max_depth</th><th>CV орташа</th><th>SD</th></tr>
<tr><td>2</td><td>0.772</td><td>0.039</td></tr>
<tr><td>3</td><td>0.778</td><td>0.037</td></tr>
<tr><td>5</td><td>0.758</td><td>0.015</td></tr>
<tr><td>None</td><td>0.715</td><td>0.038</td></tr>
</table>
<ol>
<li>Әр тереңдікке <code>cross_val_score</code> (бүкіл X, y-де).</li>
<li>Ең жоғары орташаны таңдаймыз: 3.</li>
<li>Айырма 0.772 мен 0.778 — SD-ден әлдеқайда кіші. Шын мәнінде 2 мен 3 бірдей жақсы, қарапайымын алуға болады.</li>
</ol>
<h3>Bias-variance trade-off</h3>
<ul>
<li><b>High bias</b> (underfitting): модель тым қарапайым, train-де де, test-те де нашар. Тереңдік 1.</li>
<li><b>High variance</b> (overfitting): train-де тамаша, test-те нашар, деректі сәл өзгертсек нәтиже қатты өзгереді. Шектеусіз ағаш.</li>
<li>Мақсат — ортасы: күрделілікті CV ең жақсы болатындай таңдау.</li>
</ul>
<h3>Масштаб және Pipeline</h3>
<p>Scaler-ді CV-ден бұрын бүкіл деректе fit етсек — leakage. <code>make_pipeline(StandardScaler(), LogisticRegression())</code> бір модель сияқты әрекет етеді, сондықтан әр fold-та scaler тек сол fold-тың train бөлігінде fit етіледі. Logistic regression: CV 0.790 ± 0.033.</p>
<h3>Жиі қателер</h3>
<ul>
<li>Тек орташаны айту, SD-ді ұмыту.</li>
<li>CV-ге дейін бүкіл деректі масштабтау.</li>
<li>Тым үлкен <code>cv</code> (мысалы, 50): ұзақ және әр fold тым кішкентай.</li>
<li>CV-мен тереңдікті таңдағаннан кейін соңғы модельді бүкіл train деректе қайта үйретуді ұмыту.</li>
</ul>`,
        exercises: [
          { type: 'python', xp: 25, prompt: '<code>make_pipeline(StandardScaler(), LogisticRegression())</code> үшін <code>cross_val_score</code>-ты <code>cv=5</code>-пен бүкіл <code>X</code>, <code>y</code>-де орындаңыз. Нәтижені <code>scores</code>-қа, орташасын <code>cv_mean</code>-ға, SD-ін <code>cv_std</code>-ға жазып, шығарыңыз.', starter: "import pandas as pd\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nchurn = pd.read_csv('churn.csv')\nX = churn[['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']]\ny = churn['churned']\n", solution: "import pandas as pd\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nchurn = pd.read_csv('churn.csv')\nX = churn[['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']]\ny = churn['churned']\npipe = make_pipeline(StandardScaler(), LogisticRegression())\nscores = cross_val_score(pipe, X, y, cv=5)\ncv_mean = scores.mean()\ncv_std = scores.std()\nprint(scores)\nprint(f'{cv_mean:.3f} ± {cv_std:.3f}')", check: { tests: "import numpy as _np\nassert len(scores) == 5, 'cv=5: 5 балл болуы керек'\nassert abs(cv_mean - _np.mean(scores)) < 1e-9 and abs(cv_std - _np.std(scores)) < 1e-9, 'cv_mean = scores.mean(), cv_std = scores.std()'\nassert abs(cv_mean - 0.79) < 0.02, f'cv_mean ≈ 0.79 болуы керек, сізде {cv_mean:.3f}. Pipeline-ды бүкіл X, y-де cv=5-пен бағаладыңыз ба?'", mustInclude: ['cross_val_score(', 'make_pipeline('] }, hints: ['<code>pipe = make_pipeline(StandardScaler(), LogisticRegression())</code>', '<code>cross_val_score(pipe, X, y, cv=5)</code>'] },
          { type: 'python', xp: 25, prompt: '<code>[1, 2, 3, 4, 5, None]</code> тереңдіктері үшін <code>DecisionTreeClassifier(max_depth=d, random_state=0)</code>-дың 5-fold CV орташасын <code>cv_means</code> сөздігіне жазыңыз. Ең жақсы тереңдікті <code>best_depth</code>-ке жазыңыз.', starter: "import pandas as pd\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.tree import DecisionTreeClassifier\nchurn = pd.read_csv('churn.csv')\nX = churn[['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']]\ny = churn['churned']\ncv_means = {}\n", solution: "import pandas as pd\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.tree import DecisionTreeClassifier\nchurn = pd.read_csv('churn.csv')\nX = churn[['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']]\ny = churn['churned']\ncv_means = {}\nfor d in [1, 2, 3, 4, 5, None]:\n    s = cross_val_score(DecisionTreeClassifier(max_depth=d, random_state=0), X, y, cv=5)\n    cv_means[d] = s.mean()\n    print(d, round(s.mean(), 3), round(s.std(), 3))\nbest_depth = max(cv_means, key=cv_means.get)\nprint('best:', best_depth)", check: { tests: "from sklearn.model_selection import cross_val_score as _cvs\nfrom sklearn.tree import DecisionTreeClassifier as _DT\nassert set(cv_means) == {1, 2, 3, 4, 5, None}, 'cv_means-те 6 тереңдік (None-ды қоса) болуы керек'\n_ref = {d: _cvs(_DT(max_depth=d, random_state=0), X, y, cv=5).mean() for d in [1, 2, 3, 4, 5, None]}\nassert all(abs(cv_means[d] - _ref[d]) < 0.01 for d in _ref), 'CV орташалары сәйкес келмейді: cv=5, random_state=0, бүкіл X, y'\nassert best_depth == max(_ref, key=_ref.get), f'best_depth = {max(_ref, key=_ref.get)} болуы керек: CV орташасы ең үлкен тереңдік'\nassert cv_means[None] < cv_means[best_depth], 'Шектеусіз ағаштың CV нәтижесі ең жақсыдан төмен болуы керек'", mustInclude: ['cross_val_score('] }, hints: ['<code>cross_val_score(DecisionTreeClassifier(max_depth=d, random_state=0), X, y, cv=5).mean()</code>', '<code>max(cv_means, key=cv_means.get)</code>'] },
          { type: 'quiz', xp: 10, prompt: 'Модельдің train accuracy-і 0.74, CV accuracy-і 0.74, ал «ешкім кетпейді» baseline-ы да 0.74. Бұл не?', options: ['High variance (overfitting)', 'High bias (underfitting): модель тым қарапайым', 'Тамаша модель', 'Data leakage'], answer: 1, explain: 'Train-де де, CV-де де baseline деңгейінде: модель заңдылықты ұстай алмады. Күрделірек модель немесе жақсырақ белгілер керек.' }
        ]
      },
      {
        id: 'ml-gate', gate: true, title: 'Модуль емтиханы: ML Foundations', minutes: 30,
        body: `
<p>Қорытынды тексеріс: регрессия, классификация және модель таңдау. Барлық тапсырмада <code>random_state</code> берілген мәнмен болсын, модельді тек train-де үйретіңіз. Кеңестер жоқ.</p>`,
        exercises: [
          { type: 'python', xp: 40, prompt: 'Пәтер бағасы моделі. <code>area_m2</code>, <code>rooms</code>, <code>year_built</code> және one-hot <code>district</code> (<code>drop_first=True</code>, <code>dtype=int</code>) белгілерінен <code>X</code> жасаңыз, <code>y = price_mln</code>. <code>test_size=0.2</code>, <code>random_state=42</code> бөліп, <code>LinearRegression</code>-ды <code>model</code> атымен үйретіңіз. Test-те <code>test_mae</code> және <code>test_r2</code> есептеңіз.', starter: SPLIT + "from sklearn.metrics import mean_absolute_error\n\n", solution: SPLIT + "from sklearn.metrics import mean_absolute_error\n\nX = pd.get_dummies(flats[['area_m2', 'rooms', 'year_built', 'district']], columns=['district'], drop_first=True, dtype=int)\ny = flats['price_mln']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\nmodel = LinearRegression().fit(X_train, y_train)\ntest_mae = mean_absolute_error(y_test, model.predict(X_test))\ntest_r2 = model.score(X_test, y_test)\nprint(test_mae, test_r2)", check: { tests: "assert hasattr(model, 'coef_') and model.n_features_in_ == 8, 'model 8 белгімен үйретілуі керек: 3 сандық + 5 district бағаны'\nassert len(X_test) == 80, 'Test 80 жол болуы керек'\nassert abs(test_r2 - 0.911) < 0.01, f'test_r2 ≈ 0.911 болуы керек, сізде {test_r2:.3f}'\nassert abs(test_mae - 3.83) < 0.1, f'test_mae ≈ 3.83 болуы керек, сізде {test_mae:.2f}'" }, hints: [] },
          { type: 'python', xp: 40, prompt: 'Retention бөлімі кеткендердің кемінде 70%-ын табуды сұрайды (recall ≥ 0.70), бірақ ескертулердің кемінде 45%-ы дұрыс болсын (precision ≥ 0.45). Бөлу дайын. Модель үйретіп, шекті таңдап, test-тегі 0/1 болжамды <code>pred</code>-ке жазыңыз. <code>rec</code> мен <code>prec</code>-ті есептеп шығарыңыз.', starter: CH + "from sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import precision_score, recall_score\n\n", solution: CH + "from sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import precision_score, recall_score\n\nclf = LogisticRegression(max_iter=1000).fit(X_train, y_train)\nproba = clf.predict_proba(X_test)[:, 1]\npred = (proba >= 0.3).astype(int)\nrec = recall_score(y_test, pred)\nprec = precision_score(y_test, pred)\nprint(rec, prec)", check: { tests: RC + "from sklearn import metrics as _mt\nassert len(pred) == 150, 'pred — test деректің 150 абоненті үшін'\nassert list(y_test.index) == list(_yte.index), 'Бөлуді өзгертпеңіз'\n_r = _mt.recall_score(_yte, _np.asarray(pred))\n_q = _mt.precision_score(_yte, _np.asarray(pred), zero_division=0)\nassert _r >= 0.70, f'Recall {_r:.3f}, кемінде 0.70 керек: шекті түсіріңіз'\nassert _q >= 0.45, f'Precision {_q:.3f}, кемінде 0.45 керек: шекті тым төмен түсірдіңіз'\nassert abs(rec - _r) < 1e-9 and abs(prec - _q) < 1e-9, 'rec, prec — recall_score(y_test, pred), precision_score(y_test, pred)'" }, hints: [] },
          { type: 'python', xp: 40, prompt: 'KNN classifier үшін ең жақсы k-ны таңдаңыз. <code>[3, 5, 9, 15, 25]</code> әр k үшін <code>make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=k))</code>-тың 5-fold CV орташа accuracy-ін <code>cv_scores</code> сөздігіне жазыңыз. Ең жақсы k → <code>best_k</code>.', starter: "import pandas as pd\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.neighbors import KNeighborsClassifier\nchurn = pd.read_csv('churn.csv')\nX = churn[['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']]\ny = churn['churned']\ncv_scores = {}\n", solution: "import pandas as pd\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.neighbors import KNeighborsClassifier\nchurn = pd.read_csv('churn.csv')\nX = churn[['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']]\ny = churn['churned']\ncv_scores = {}\nfor k in [3, 5, 9, 15, 25]:\n    pipe = make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=k))\n    cv_scores[k] = cross_val_score(pipe, X, y, cv=5).mean()\nbest_k = max(cv_scores, key=cv_scores.get)\nprint(cv_scores, best_k)", check: { tests: "from sklearn.model_selection import cross_val_score as _cvs\nfrom sklearn.pipeline import make_pipeline as _mp\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.neighbors import KNeighborsClassifier as _KNC\nassert set(cv_scores) == {3, 5, 9, 15, 25}, 'cv_scores-та 5 k мәні болуы керек'\n_ref = {k: _cvs(_mp(_SS(), _KNC(n_neighbors=k)), X, y, cv=5).mean() for k in [3, 5, 9, 15, 25]}\nassert all(abs(cv_scores[k] - _ref[k]) < 0.005 for k in _ref), 'CV нәтижелері сәйкес келмейді: scaler pipeline ішінде, cv=5'\nassert best_k == max(_ref, key=_ref.get), f'best_k = {max(_ref, key=_ref.get)} болуы керек'", mustInclude: ['make_pipeline('] }, hints: [] },
          { type: 'quiz', xp: 20, prompt: 'Churn модельі (кетушілер 26%) test-те accuracy = 0.74, recall = 0 берді. Не болды?', options: ['Модель тамаша, accuracy жоғары', 'Модель барлығына «кетпейді» дейді: бұл жай baseline', 'Overfitting', 'Масштаб керек емес'], answer: 1, explain: 'Recall = 0 — бірде-бір кетушіні таппады. 74% accuracy — «ешкім кетпейді» деген baseline-дың дәл өзі.' },
          { type: 'number', xp: 20, prompt: 'Confusion matrix: TN = 105, FP = 6, FN = 23, TP = 16. Precision қанша? (үш таңбаға дейін)', answer: 0.727, tol: 0.002, explain: 'Precision = TP / (TP + FP) = 16 / 22 ≈ 0.727.' }
        ]
      }
    ]
  };
})();
