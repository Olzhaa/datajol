// M6.3 MLOps Basics and M6.5 Cloud & Data Eng Basics. MLflow, Airflow, dbt, Spark and cloud tools are taught as text;
// runnable exercises use stdlib/numpy/pandas/sklearn stand-ins (stub tracker, registry dict, sqlite3, chunked pandas). Data: churn.csv (content/mldata.js) and the deng_*.csv files below.
(function () {
  const P = s => s.replace(/^\n/, '');

  const TRACKER = P(String.raw`
class Tracker:
    """MLflow-ға ұқсас кішкентай stub: әр run — params пен metrics сақтайтын dict."""
    def __init__(self):
        self.runs = []
    def start_run(self, name):
        run = {'name': name, 'params': {}, 'metrics': {}}
        self.runs.append(run)
        return run
    def log_param(self, run, key, value):
        run['params'][key] = value
    def log_metric(self, run, key, value):
        run['metrics'][key] = value

tracker = Tracker()
`);

  DJ.modules['m6-3'] = {
    intro: 'Модельді notebook-та үйрету — жұмыстың жартысы ғана. Бұл модульде эксперименттерді тіркеуді, нәтижені қайталауды, model registry мен CI-ды, production-дағы мониторингті және data drift-ті анықтауды үйренесіз.',
    lessons: [
      {
        id: 'ops-1', title: 'ML lifecycle: модель notebook-тан кейін не болады', minutes: 12,
        body: `
<p><b>MLOps</b> — ML модельдерін сенімді түрде production-ға шығару, бақылау және жаңартуға арналған тәжірибелер жиынтығы. DevOps бағдарламаны жеткізуді автоматтандырса, MLOps оған екі нәрсе қосады: <b>деректер</b> мен <b>модель</b> уақыт өте өзгереді.</p>
<h3>ML lifecycle кезеңдері</h3>
<ol>
<li><b>Problem framing</b> — бизнес сұрақ және метрика: «Қай абонент келесі айда кетеді? Recall кемінде 0.7».</li>
<li><b>Data collection</b> — billing, CRM, call-center дерегін жинау.</li>
<li><b>Data preparation</b> — тазалау, features жасау.</li>
<li><b>Training & evaluation</b> — модельдер, гиперпараметрлер, validation.</li>
<li><b>Deployment</b> — модельді API немесе batch job ретінде іске қосу.</li>
<li><b>Monitoring</b> — latency, қателер, болжамдардың таралуы, drift.</li>
<li><b>Retraining</b> — жаңа дерекпен қайта үйрету, яғни қайтадан 2-кезеңге оралу.</li>
</ol>
<p>Бұл сызық емес, <b>цикл</b>: мониторинг проблема тапса, біз деректерге қайта ораламыз.</p>
<h3>Мысал: Алматыдағы телеком-оператор</h3>
<p>Data scientist наурызда churn моделін үйретті, test-те AUC = 0.84. Мамырда компания жаңа «Безлимит» тарифін шығарды. Абоненттердің мінез-құлқы өзгерді, бірақ модель ол туралы білмейді. Маусымда retention бөлімі «модель қоңырау шалуға дұрыс адамдарды бермейді» деп шағымданады. Мониторинг болса, мәселе мамырдың өзінде көрінер еді.</p>
<h3>Жасырын техникалық қарыз</h3>
<p>Google-дың белгілі «Hidden Technical Debt in ML Systems» мақаласы көрсеткендей, нақты ML жүйесінде модель коды — кішкентай бөлігі ғана. Қалғаны: деректерді жинау, тексеру, feature pipeline, serving инфрақұрылымы, мониторинг. Сондықтан MLOps-тың мақсаты — осы «модельден тыс» бөлікті тәртіпке келтіру.</p>
<div class="tip">MLOps жетілуінің үш деңгейі: <b>0</b> — бәрі қолмен (notebook → pickle → email), <b>1</b> — training pipeline автоматтандырылған, <b>2</b> — CI/CD мен автоматты retraining бар. Көп компания 0 мен 1-дің арасында жүр, бұл қалыпты.</div>`,
        exercises: [
          { type: 'python', xp: 15, prompt: 'Командаға бір жобада әр кезеңге жұмсалған сағат берілген. <b>Модельді үйрету</b> (<code>training</code>) барлық уақыттың неше пайызын алғанын <code>train_share</code> айнымалысына жазыңыз (0–100 аралығындағы сан).', starter: P(String.raw`
hours = {'data_collection': 30, 'data_cleaning': 45, 'feature_engineering': 25,
         'training': 15, 'evaluation': 10, 'deployment': 20, 'monitoring': 15}
train_share = None
print(train_share)
`), solution: P(String.raw`
hours = {'data_collection': 30, 'data_cleaning': 45, 'feature_engineering': 25,
         'training': 15, 'evaluation': 10, 'deployment': 20, 'monitoring': 15}
train_share = hours['training'] / sum(hours.values()) * 100
print(train_share)
`), check: { tests: "assert train_share is not None, 'train_share-ке сан жазыңыз'\nassert abs(float(train_share) - 9.375) < 0.01, f'train_share ≈ 9.375 болуы керек (15 / 160 * 100), сізде {train_share}'" }, hints: ['Барлық сағат: <code>sum(hours.values())</code>', '<code>hours[\'training\'] / sum(hours.values()) * 100</code>'] },
          { type: 'python', xp: 20, prompt: 'Lifecycle — цикл. <code>next_stage(stage)</code> функциясын жазыңыз: ол <code>STAGES</code> тізіміндегі келесі кезеңді қайтарсын, ал <code>\'monitoring\'</code>-тен кейін қайтадан <code>\'data\'</code> келсін. Тізімде жоқ кезең берілсе, <code>ValueError</code> көтерсін.', starter: P(String.raw`
STAGES = ['data', 'training', 'evaluation', 'deployment', 'monitoring']

def next_stage(stage):
    return STAGES[STAGES.index(stage) + 1]
`), solution: P(String.raw`
STAGES = ['data', 'training', 'evaluation', 'deployment', 'monitoring']

def next_stage(stage):
    if stage not in STAGES:
        raise ValueError(f'Белгісіз кезең: {stage}')
    i = STAGES.index(stage)
    return STAGES[(i + 1) % len(STAGES)]
`), check: { tests: "assert next_stage('data') == 'training', \"next_stage('data') → 'training'\"\nassert next_stage('deployment') == 'monitoring', \"next_stage('deployment') → 'monitoring'\"\ntry:\n    _r = next_stage('monitoring')\nexcept Exception as _e:\n    _r = _e\nassert _r == 'data', \"monitoring-тен кейін цикл басына ('data') оралу керек. % len(STAGES) қолданыңыз\"\n_ok = False\ntry:\n    next_stage('marketing')\nexcept ValueError:\n    _ok = True\nassert _ok, 'Белгісіз кезеңде ValueError көтеріңіз'" }, hints: ['Қалдық операторы: <code>(i + 1) % len(STAGES)</code>', '<code>if stage not in STAGES: raise ValueError(...)</code>'] },
          { type: 'quiz', xp: 10, prompt: 'Churn моделі наурызда AUC = 0.84 берді, маусымда бизнес «модель нашарлады» дейді. Lifecycle-тің қай кезеңі бұл мәселені ертерек ұстауы керек еді?', options: ['Problem framing', 'Training', 'Monitoring', 'Data collection'], answer: 2, explain: 'Production-да модель сапасы мен деректердің өзгеруін бақылайтын — monitoring. Ол болмаса, мәселені пайдаланушылар бірінші байқайды.' },
          { type: 'quiz', xp: 10, prompt: 'MLOps-ты кәдімгі DevOps-тан не ерекшелейді?', options: ['Код Git-те сақталмайды', 'Код өзгермесе де, деректер өзгергендіктен жүйе нашарлауы мүмкін', 'Тестілер мүлде керек емес', 'Deployment әрқашан қолмен жасалады'], answer: 1, explain: 'ML жүйесінің мінез-құлқы кодқа ғана емес, деректерге де байланысты. Әлем өзгерсе, бір де бір жол код өзгермей-ақ модель нашарлайды.' }
        ]
      },
      {
        id: 'ops-2', title: 'Experiment tracking: MLflow идеясы', minutes: 15,
        body: `
<p>Бір аптада сіз 40 модель үйреттіңіз: әр түрлі <code>max_depth</code>, features, деректер нұсқалары. «Ең жақсысы қайсы еді және оны қандай параметрмен алдым?» деген сұраққа жауап беру үшін <b>experiment tracking</b> керек. Ең танымал құрал — <b>MLflow</b>.</p>
<h3>MLflow негізгі ұғымдары</h3>
<ul>
<li><b>Experiment</b> — бір тапсырма бойынша run-дар тобы, мысалы <code>churn-almaty</code>.</li>
<li><b>Run</b> — бір рет үйрету. Әр run-ның өз id-сы бар.</li>
<li><b>Params</b> — кіріс баптаулар: <code>max_depth=5</code>, <code>features=v2</code>.</li>
<li><b>Metrics</b> — нәтиже сандары: <code>val_auc=0.83</code>.</li>
<li><b>Artifacts</b> — файлдар: модельдің өзі, графиктер, confusion matrix.</li>
</ul>
<h3>MLflow-та қалай көрінеді</h3>
<pre><code>import mlflow
from sklearn.tree import DecisionTreeClassifier

mlflow.set_experiment('churn-almaty')
for depth in [3, 5, 8]:
    with mlflow.start_run(run_name=f'tree-d{depth}'):
        model = DecisionTreeClassifier(max_depth=depth, random_state=42)
        model.fit(X_train, y_train)
        auc = roc_auc_score(y_val, model.predict_proba(X_val)[:, 1])
        mlflow.log_param('max_depth', depth)
        mlflow.log_metric('val_auc', auc)
        mlflow.sklearn.log_model(model, 'model')</code></pre>
<p>Кейін <code>mlflow ui</code> командасы барлық run-дарды кестемен көрсетеді, оларды метрика бойынша сұрыптауға болады. Ал <code>mlflow.search_runs(order_by=['metrics.val_auc DESC'])</code> run-дарды pandas DataFrame ретінде қайтарады.</p>
<h3>Біздің браузердегі stub</h3>
<p>Браузерде MLflow жоқ, сондықтан тапсырмаларда сол идеяны қайталайтын кішкентай <code>Tracker</code> класы бар: әр run — <code>{'name', 'params', 'metrics'}</code> бар dict. Ұғымдар бірдей, тек сақтау орны — жад.</p>
<div class="tip">Ереже: <b>тіркелмеген эксперимент — болмаған эксперимент</b>. Нәтижені блокнотқа немесе Slack-ке қолмен көшірмеңіз. Метриканы <b>validation</b> дерегінде есептеңіз, test-ті соңғы таңдау үшін сақтаңыз.</div>
<h3>Жиі қателер</h3>
<ul>
<li>Параметрді тіркемей, тек метриканы тіркеу: «0.86 алдым, бірақ қалай екенін білмеймін».</li>
<li>Деректер нұсқасын (data version) тіркемеу. Келесі айда сол кодпен басқа нәтиже шығады.</li>
<li>Ең жақсы run-ды test метрикасы бойынша таңдау — бұл test-ке overfit.</li>
</ul>`,
        exercises: [
          { type: 'python', xp: 20, prompt: '<code>results</code> тізімінде үш эксперименттің нәтижесі бар. Әрқайсысы үшін <code>tracker.start_run(name)</code> арқылы run ашып, <code>max_depth</code>-ты param ретінде, ал <code>val_auc</code>-ты metric ретінде тіркеңіз.', starter: TRACKER + P(String.raw`
results = [('tree-d3', 3, 0.781), ('tree-d5', 5, 0.826), ('tree-d8', 8, 0.804)]
# әр нәтижені tracker-ге тіркеңіз
`), solution: TRACKER + P(String.raw`
results = [('tree-d3', 3, 0.781), ('tree-d5', 5, 0.826), ('tree-d8', 8, 0.804)]
for name, depth, auc in results:
    run = tracker.start_run(name)
    tracker.log_param(run, 'max_depth', depth)
    tracker.log_metric(run, 'val_auc', auc)
print(tracker.runs)
`), check: { tests: "assert len(tracker.runs) == 3, f'3 run болуы керек, сізде {len(tracker.runs)}'\nassert [r['name'] for r in tracker.runs] == ['tree-d3', 'tree-d5', 'tree-d8'], 'Run аттары results-тағы ретпен болсын'\nassert all(r['params'].get('max_depth') == d for r, d in zip(tracker.runs, [3, 5, 8])), \"params-та 'max_depth' кілті болуы керек\"\nassert all(abs(r['metrics'].get('val_auc', -1) - a) < 1e-9 for r, a in zip(tracker.runs, [0.781, 0.826, 0.804])), \"metrics-те 'val_auc' кілті болуы керек\"", mustInclude: ['log_param', 'log_metric'] }, hints: ['<code>for name, depth, auc in results:</code>', '<code>run = tracker.start_run(name)</code>, сосын <code>tracker.log_param(run, \'max_depth\', depth)</code>'] },
          { type: 'python', xp: 20, prompt: '<code>best_run(runs, metric, higher_is_better=True)</code> функциясын жазыңыз: ол берілген метрика бойынша ең жақсы run-ды (dict) қайтарсын. <code>higher_is_better=False</code> болса (мысалы RMSE), ең кішісі жақсы. Метрикасы жоқ run-дар есептелмейді.', starter: P(String.raw`
runs = [
    {'name': 'lr',     'params': {'C': 1.0},  'metrics': {'val_auc': 0.79, 'val_logloss': 0.48}},
    {'name': 'tree',   'params': {'depth': 5}, 'metrics': {'val_auc': 0.83, 'val_logloss': 0.45}},
    {'name': 'broken', 'params': {'depth': 9}, 'metrics': {}},
    {'name': 'forest', 'params': {'n': 200},   'metrics': {'val_auc': 0.82, 'val_logloss': 0.41}},
]

def best_run(runs, metric, higher_is_better=True):
    return runs[0]
`), solution: P(String.raw`
runs = [
    {'name': 'lr',     'params': {'C': 1.0},  'metrics': {'val_auc': 0.79, 'val_logloss': 0.48}},
    {'name': 'tree',   'params': {'depth': 5}, 'metrics': {'val_auc': 0.83, 'val_logloss': 0.45}},
    {'name': 'broken', 'params': {'depth': 9}, 'metrics': {}},
    {'name': 'forest', 'params': {'n': 200},   'metrics': {'val_auc': 0.82, 'val_logloss': 0.41}},
]

def best_run(runs, metric, higher_is_better=True):
    valid = [r for r in runs if metric in r['metrics']]
    pick = max if higher_is_better else min
    return pick(valid, key=lambda r: r['metrics'][metric])

print(best_run(runs, 'val_auc')['name'])
print(best_run(runs, 'val_logloss', higher_is_better=False)['name'])
`), check: { tests: "assert best_run(runs, 'val_auc')['name'] == 'tree', 'val_auc бойынша ең жақсысы — tree'\nassert best_run(runs, 'val_logloss', higher_is_better=False)['name'] == 'forest', 'logloss кіші болған сайын жақсы: forest'\n_r2 = [{'name': 'a', 'params': {}, 'metrics': {}}, {'name': 'b', 'params': {}, 'metrics': {'rmse': 3.0}}, {'name': 'c', 'params': {}, 'metrics': {'rmse': 2.0}}]\nassert best_run(_r2, 'rmse', higher_is_better=False)['name'] == 'c', 'Метрикасы жоқ run-дарды алып тастаңыз, сосын ең кішісін алыңыз'" }, hints: ['Алдымен сүзгі: <code>[r for r in runs if metric in r[\'metrics\']]</code>', '<code>max(valid, key=lambda r: r[\'metrics\'][metric])</code>, ал кері жағдайда <code>min</code>'] },
          { type: 'quiz', xp: 10, prompt: 'MLflow-та <code>max_depth=5</code> мен <code>val_auc=0.83</code> қалай тіркеледі?', options: ['Екеуі де metric', 'max_depth — param, val_auc — metric', 'max_depth — artifact, val_auc — param', 'Екеуі де artifact'], answer: 1, explain: 'Param — үйретуге кіретін баптау, metric — үйретуден шыққан сапа көрсеткіші. Artifact — файл (модель, сурет).' }
        ]
      },
      {
        id: 'ops-3', title: 'Reproducibility: seed, нұсқалар, data versioning', minutes: 14,
        body: `
<p><b>Reproducibility</b> (қайталанымдылық) — басқа адам (немесе үш айдан кейінгі сіз) сол кодты іске қосып, <b>дәл сол</b> нәтижені алуы. Ол үшін төрт нәрсе бекітілуі керек: код, деректер, кітапхана нұсқалары және кездейсоқтық.</p>
<h3>1. Кездейсоқтық: seed</h3>
<p><code>train_test_split</code>, <code>RandomForest</code>, деректерден sample алу — бәрі кездейсоқ сандарды қолданады. Seed берілмесе, әр іске қосуда нәтиже сәл басқа болады.</p>
<pre><code>import numpy as np
rng = np.random.default_rng(42)          # жаңа numpy API
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42)
model = RandomForestClassifier(random_state=42)</code></pre>
<h3>2. Кітапхана нұсқалары</h3>
<p>scikit-learn 1.3 пен 1.6 бір параметрдің default мәнін өзгертуі мүмкін. Сондықтан <code>requirements.txt</code>-те нұсқаны нақты бекітіңіз:</p>
<pre><code>pandas==2.2.3
scikit-learn==1.6.1
numpy==2.1.3</code></pre>
<p>Бұдан да сенімдісі — Docker image: Python-ның өзі де бекітіледі.</p>
<h3>3. Data versioning</h3>
<p>Код Git-те, ал 2 GB CSV Git-ке сыймайды. Идея: деректің <b>мазмұнынан hash</b> (fingerprint) есептеп, оны run-мен бірге тіркеу. Бір байт өзгерсе, hash толық өзгереді. <b>DVC</b> құралы осылай жұмыс істейді: Git-те кішкентай <code>.dvc</code> файлы (hash-пен) сақталады, ал файлдың өзі S3 немесе GCS-те жатады.</p>
<pre><code>import hashlib
with open('churn.csv', 'rb') as f:
    digest = hashlib.sha256(f.read()).hexdigest()[:12]
mlflow.log_param('data_sha', digest)   # мысалы '3fa9c01b7e2d'</code></pre>
<h3>4. Код</h3>
<p>Run-мен бірге Git commit hash-ын да тіркейді (MLflow мұны өзі жасайды). Сонда «бұл модель қай кодпен үйретілді?» деген сұраққа бір секундта жауап бар.</p>
<div class="tip">Тексеру тәсілі: таза ортада pipeline-ды екі рет іске қосыңыз. Метрикалар 4-ші таңбаға дейін бірдей болмаса, бір жерде seed жоқ.</div>`,
        exercises: [
          { type: 'python', xp: 20, prompt: '<code>fingerprint(text)</code> функциясын жазыңыз: ол мәтіннің SHA-256 hash-ының алғашқы 12 hex таңбасын қайтарсын (<code>hashlib</code>, мәтінді <code>.encode(\'utf-8\')</code> арқылы байтқа айналдырыңыз). Сосын <code>v1</code> мен <code>v2</code> деректерінің fingerprint-ін <code>fp1</code>, <code>fp2</code>-ге жазыңыз.', starter: P(String.raw`
import hashlib
v1 = "customer_id,city,churned\n1,Алматы,0\n2,Астана,1\n"
v2 = "customer_id,city,churned\n1,Алматы,0\n2,Астана,0\n"

def fingerprint(text):
    return text[:12]

fp1 = fingerprint(v1)
fp2 = fingerprint(v2)
print(fp1, fp2)
`), solution: P(String.raw`
import hashlib
v1 = "customer_id,city,churned\n1,Алматы,0\n2,Астана,1\n"
v2 = "customer_id,city,churned\n1,Алматы,0\n2,Астана,0\n"

def fingerprint(text):
    return hashlib.sha256(text.encode('utf-8')).hexdigest()[:12]

fp1 = fingerprint(v1)
fp2 = fingerprint(v2)
print(fp1, fp2)
`), check: { tests: "import hashlib as _h\nassert fingerprint('abc') == _h.sha256(b'abc').hexdigest()[:12], 'sha256(...).hexdigest()[:12] қайтарыңыз'\nassert len(fp1) == 12 and fp1 != fp2, 'Бір таңба өзгерсе, fingerprint те өзгеруі керек'\nassert fp1 == fingerprint(v1), 'Бір мәтін әрқашан бір fingerprint береді'", mustInclude: ['sha256'] }, hints: ['<code>hashlib.sha256(text.encode(\'utf-8\'))</code>', '<code>.hexdigest()[:12]</code>'] },
          { type: 'python', xp: 20, prompt: 'A/B тест үшін 5 абонент кездейсоқ таңдалады, бірақ әр іске қосуда тізім өзгеріп тұр. <code>sample_ids(seed)</code> функциясын түзетіңіз: <code>np.random.default_rng(seed)</code> қолданып, <code>rng.choice(ids, 5, replace=False)</code> нәтижесін list ретінде қайтарсын.', starter: P(String.raw`
import numpy as np
ids = list(range(1001, 1101))

def sample_ids(seed):
    rng = np.random.default_rng()
    return list(rng.choice(ids, 5, replace=False))

print(sample_ids(42))
`), solution: P(String.raw`
import numpy as np
ids = list(range(1001, 1101))

def sample_ids(seed):
    rng = np.random.default_rng(seed)
    return list(rng.choice(ids, 5, replace=False))

print(sample_ids(42))
`), check: { tests: "import numpy as _np\n_ref = list(_np.random.default_rng(42).choice(list(range(1001, 1101)), 5, replace=False))\nassert [int(x) for x in sample_ids(42)] == [int(x) for x in _ref], 'default_rng(seed) — seed-ті беріңіз'\nassert [int(x) for x in sample_ids(7)] == [int(x) for x in sample_ids(7)], 'Бір seed — бір нәтиже'" }, hints: ['Мәселе <code>default_rng()</code> жолында: жақшада ештеңе жоқ', '<code>np.random.default_rng(seed)</code>'] },
          { type: 'quiz', xp: 10, prompt: 'Әріптесіңіз сіздің кодыңызды іске қосып, AUC 0.83 емес, 0.81 алды. Seed-тер бар, деректер бірдей. Ең ықтимал себеп?', options: ['Оның компьютері баяу', 'Кітапхана нұсқалары бекітілмеген (requirements.txt-те == жоқ)', 'Ол басқа браузер қолданады', 'AUC әрқашан кездейсоқ'], answer: 1, explain: 'Кітапхананың басқа нұсқасында алгоритмнің default параметрлері немесе ішкі есептеулері өзгеше болуы мүмкін. Нұсқаларды <code>==</code> арқылы бекітіңіз.' }
        ]
      },
      {
        id: 'ops-4', title: 'Model registry және stages', minutes: 13,
        body: `
<p>Experiment tracking «қандай модельдер үйретілді?» деген сұраққа жауап береді. <b>Model registry</b> келесі сұраққа жауап береді: «Дәл қазір production-да <b>қай модель</b> жұмыс істеп тұр және оған дейін қайсысы болды?»</p>
<h3>Registry-де не сақталады</h3>
<ul>
<li><b>Registered model</b> — атауы бар модель, мысалы <code>churn-model</code>.</li>
<li><b>Version</b> — оның әр нұсқасы: v1, v2, v3. Әр нұсқа нақты бір run-ға (params, metrics, data_sha) сілтейді.</li>
<li><b>Stage</b> немесе <b>alias</b> — нұсқаның күйі.</li>
</ul>
<h3>Классикалық stages</h3>
<table>
<tr><th>Stage</th><th>Мағынасы</th></tr>
<tr><td>None</td><td>Жаңа тіркелген, ешкім тексермеген</td></tr>
<tr><td>Staging</td><td>Тексеруде: shadow mode, A/B тест</td></tr>
<tr><td>Production</td><td>Нақты клиенттерге болжам беріп тұр (әдетте біреу ғана)</td></tr>
<tr><td>Archived</td><td>Ескі нұсқа, бірақ өшірілмейді: rollback үшін керек</td></tr>
</table>
<p>MLflow-тың жаңа нұсқаларында stages орнына икемдірек <b>aliases</b> ұсынылады: мысалы <code>@champion</code> (production) және <code>@challenger</code> (үміткер). Идея бірдей: serving коды модельді нөмірмен емес, <b>атпен</b> жүктейді.</p>
<pre><code>import mlflow
client = mlflow.MlflowClient()
client.set_registered_model_alias('churn-model', 'champion', version=3)

# serving жағы: нөмір емес, alias бойынша жүктейді
model = mlflow.pyfunc.load_model('models:/churn-model@champion')</code></pre>
<h3>Неге бұл маңызды</h3>
<p>«Дала Мобайл» v3 моделін production-ға шығарды. Екі күннен кейін call-center «ұсыныстар біртүрлі» дейді. Registry болса, rollback — бір команда: alias-ты v2-ге қайтару. Жаңа deploy, жаңа код керек емес.</p>
<div class="tip">Promotion ережесі: жаңа нұсқа production-ға тек (1) validation метрикасы ағымдағы production-нан жақсы, (2) data validation өтті, (3) staging-та тексерілді болса ғана шығады. Ескі production нұсқасы <b>Archived</b> болады, өшірілмейді.</div>`,
        exercises: [
          { type: 'python', xp: 15, prompt: '<code>get_production(registry, name)</code> функциясын жазыңыз: ол <code>stage == \'Production\'</code> болған нұсқаның dict-ін қайтарсын, ондай нұсқа жоқ болса <code>None</code>.', starter: P(String.raw`
registry = {
    'churn-model': [
        {'version': 1, 'stage': 'Archived',   'val_auc': 0.78},
        {'version': 2, 'stage': 'Production', 'val_auc': 0.81},
        {'version': 3, 'stage': 'Staging',    'val_auc': 0.84},
    ],
    'price-model': [
        {'version': 1, 'stage': 'Staging', 'val_auc': 0.70},
    ],
}

def get_production(registry, name):
    return registry[name][-1]
`), solution: P(String.raw`
registry = {
    'churn-model': [
        {'version': 1, 'stage': 'Archived',   'val_auc': 0.78},
        {'version': 2, 'stage': 'Production', 'val_auc': 0.81},
        {'version': 3, 'stage': 'Staging',    'val_auc': 0.84},
    ],
    'price-model': [
        {'version': 1, 'stage': 'Staging', 'val_auc': 0.70},
    ],
}

def get_production(registry, name):
    for v in registry[name]:
        if v['stage'] == 'Production':
            return v
    return None

print(get_production(registry, 'churn-model'))
`), check: { tests: "_p = get_production(registry, 'churn-model')\nassert _p is not None and _p['version'] == 2, 'churn-model-дің production нұсқасы — v2'\nassert get_production(registry, 'price-model') is None, 'Production нұсқасы жоқ болса, None қайтарыңыз'" }, hints: ['<code>for v in registry[name]:</code> және <code>if v[\'stage\'] == \'Production\': return v</code>', 'Цикл біткенде <code>return None</code>'] },
          { type: 'python', xp: 25, prompt: '<code>promote(registry, name, version)</code> функциясын түзетіңіз. Ол: (1) берілген нұсқаны <code>Production</code> етсін, (2) бұрынғы <code>Production</code> нұсқасын <code>Archived</code> етсін, (3) нұсқа жоқ болса, <code>ValueError</code> көтерсін, (4) жаңа production dict-ін қайтарсын. Production әрқашан біреу ғана болуы керек.', starter: P(String.raw`
registry = {
    'churn-model': [
        {'version': 1, 'stage': 'Archived',   'val_auc': 0.78},
        {'version': 2, 'stage': 'Production', 'val_auc': 0.81},
        {'version': 3, 'stage': 'Staging',    'val_auc': 0.84},
    ]
}

def promote(registry, name, version):
    for v in registry[name]:
        if v['version'] == version:
            v['stage'] = 'Production'
            return v
`), solution: P(String.raw`
registry = {
    'churn-model': [
        {'version': 1, 'stage': 'Archived',   'val_auc': 0.78},
        {'version': 2, 'stage': 'Production', 'val_auc': 0.81},
        {'version': 3, 'stage': 'Staging',    'val_auc': 0.84},
    ]
}

def promote(registry, name, version):
    target = None
    for v in registry[name]:
        if v['version'] == version:
            target = v
    if target is None:
        raise ValueError(f'{name} v{version} жоқ')
    for v in registry[name]:
        if v['stage'] == 'Production':
            v['stage'] = 'Archived'
    target['stage'] = 'Production'
    return target

promote(registry, 'churn-model', 3)
print(registry)
`), check: { tests: "_reg = {'m': [{'version': 1, 'stage': 'Archived'}, {'version': 2, 'stage': 'Production'}, {'version': 3, 'stage': 'Staging'}]}\n_r = promote(_reg, 'm', 3)\n_st = {v['version']: v['stage'] for v in _reg['m']}\nassert _st[3] == 'Production', 'v3 Production болуы керек'\nassert _st[2] == 'Archived', 'Бұрынғы production (v2) Archived болуы керек'\nassert list(_st.values()).count('Production') == 1, 'Production тек біреу болсын'\nassert _r is not None and _r['version'] == 3, 'Жаңа production dict-ін қайтарыңыз'\n_ok = False\ntry:\n    promote(_reg, 'm', 9)\nexcept ValueError:\n    _ok = True\nassert _ok, 'Жоқ нұсқада ValueError көтеріңіз'\nassert [v['stage'] for v in _reg['m']] == ['Archived', 'Archived', 'Production'], 'Қате нұсқа берілгенде registry өзгермеуі керек'" }, hints: ['Алдымен мақсатты нұсқаны табыңыз, жоқ болса <code>raise ValueError(...)</code>. Тек сосын stage-терді өзгертіңіз.', 'Барлық <code>Production</code> нұсқаларын <code>Archived</code> етіп, сосын <code>target[\'stage\'] = \'Production\'</code>'] },
          { type: 'quiz', xp: 10, prompt: 'Жаңа v4 моделі production-да қате болжам бере бастады. Registry бар кезде ең жылдам дұрыс әрекет қандай?', options: ['v4-ті registry-ден өшіріп, модельді қайта үйрету', '@champion alias-ын (немесе Production stage-ін) алдыңғы нұсқаға қайтару', 'Serving кодына v3-тің файл жолын қолмен жазып, қайта deploy жасау', 'Мониторингті өшіру'], answer: 1, explain: 'Registry-дің басты пайдасы — rollback: serving модельді атпен жүктейді, сондықтан alias-ты ескі нұсқаға ауыстыру жеткілікті. v4-ті өшірмеңіз: қатені талдау үшін керек.' }
        ]
      },
      {
        id: 'ops-5', title: 'CI for ML: GitHub Actions және metric gate', minutes: 16,
        body: `
<p><b>CI</b> (continuous integration) — әр pull request-те автоматты тексерулер жүру. Кәдімгі бағдарламада бұл unit тестілер. ML жобасында тағы екі қабат қосылады: <b>data тестілер</b> және <b>model quality gate</b> — метрика төмендесе, build құлайды.</p>
<h3>GitHub Actions workflow мысалы</h3>
<pre><code># .github/workflows/model-ci.yml
name: model-ci
on: [pull_request]
jobs:
  train-and-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - run: pip install -r requirements.txt
      - run: pytest tests/                      # features коды үшін unit тестілер
      - run: python validate_data.py data/sample.csv
      - run: python train.py --out metrics.json # кішкентай sample-да үйрету
      - run: python check_metrics.py metrics.json baseline.json</code></pre>
<p>Әр <code>run</code> қадамы — терминал командасы. Егер команда <b>нөлдік емес exit code</b> қайтарса (мысалы <code>sys.exit(1)</code>), GitHub қадамды қызыл деп белгілейді және PR-ды merge-ке жібермейді (branch protection қосулы болса).</p>
<h3>check_metrics.py</h3>
<pre><code>import json, sys
new = json.load(open(sys.argv[1]))
base = json.load(open(sys.argv[2]))
errors = check_metrics(new, base, max_drop=0.01)
for e in errors:
    print('FAIL:', e)
sys.exit(1 if errors else 0)</code></pre>
<p>Логиканың өзін бөлек <code>check_metrics</code> функциясына шығарамыз: оны тестілеу оңай, ал <code>sys.exit</code> тек ең соңында.</p>
<h3>Не тексеріледі</h3>
<ul>
<li><b>Салыстырмалы шек</b>: жаңа AUC baseline-нан 0.01-ден артық төмен болмасын.</li>
<li><b>Абсолютті шек</b>: AUC ешқашан 0.75-тен төмен болмасын.</li>
<li><b>Data тестілер</b>: қажетті бағандар бар, <code>customer_id</code>-де бос мән жоқ, <code>monthly_fee</code> теріс емес.</li>
</ul>
<div class="tip">CI-да толық деректе сағаттап үйретпеңіз. Кішкентай бекітілген sample мен seed жеткілікті: мақсат — «бірдеңе бұзылған жоқ па?» деп тексеру, ең жақсы модельді табу емес.</div>`,
        exercises: [
          { type: 'python', xp: 25, prompt: '<code>check_metrics(new, baseline, max_drop=0.01, min_auc=0.75)</code> функциясын жазыңыз. Ол қате хабарламаларының <b>тізімін</b> қайтарсын (бос тізім = build өтті). Ережелер: <code>baseline</code>-дағы әр метрика үшін (1) ол <code>new</code>-да жоқ болса — қате; (2) <code>new[m] &lt; baseline[m] - max_drop</code> болса — қате. Сонымен бірге (3) <code>new[\'auc\'] &lt; min_auc</code> болса — қате. Барлық метрика «үлкен болған сайын жақсы».', starter: P(String.raw`
def check_metrics(new, baseline, max_drop=0.01, min_auc=0.75):
    errors = []
    return errors

print(check_metrics({'auc': 0.80, 'recall': 0.60}, {'auc': 0.83, 'recall': 0.61}))
`), solution: P(String.raw`
def check_metrics(new, baseline, max_drop=0.01, min_auc=0.75):
    errors = []
    for m, base in baseline.items():
        if m not in new:
            errors.append(f'{m}: жаңа нәтижеде жоқ')
        elif new[m] < base - max_drop:
            errors.append(f'{m}: {new[m]:.3f} < {base:.3f} - {max_drop}')
    if new.get('auc', 0) < min_auc:
        errors.append(f'auc {new.get("auc")} < {min_auc}')
    return errors

print(check_metrics({'auc': 0.80, 'recall': 0.60}, {'auc': 0.83, 'recall': 0.61}))
`), check: { tests: "assert check_metrics({'auc': 0.83, 'recall': 0.70}, {'auc': 0.83, 'recall': 0.70}) == [], 'Метрикалар өзгермесе, қате жоқ'\nassert check_metrics({'auc': 0.825, 'recall': 0.70}, {'auc': 0.83, 'recall': 0.70}) == [], '0.005 төмендеу max_drop (0.01) ішінде, қате жоқ'\nassert len(check_metrics({'auc': 0.80, 'recall': 0.70}, {'auc': 0.83, 'recall': 0.70})) == 1, 'auc 0.03-ке түсті: бір қате болуы керек'\nassert len(check_metrics({'auc': 0.80, 'recall': 0.60}, {'auc': 0.83, 'recall': 0.70})) == 2, 'Екі метрика да түсті: екі қате'\nassert len(check_metrics({'auc': 0.74}, {'auc': 0.745})) == 1, 'auc < min_auc: салыстырмалы шек өтсе де, абсолютті шек қате береді'\nassert len(check_metrics({'auc': 0.85}, {'auc': 0.83, 'recall': 0.70})) == 1, 'recall жаңа нәтижеде жоқ: бұл да қате'" }, hints: ['<code>for m, base in baseline.items():</code>, ішінде <code>if m not in new</code> / <code>elif new[m] &lt; base - max_drop</code>', 'Абсолютті шек циклдан тыс: <code>if new.get(\'auc\', 0) &lt; min_auc: errors.append(...)</code>'] },
          { type: 'python', xp: 20, prompt: 'CI-дағы data тест. <code>validate_batch(df)</code> мәселелер тізімін қайтарсын: (1) <code>REQUIRED</code> ішіндегі әр жоқ баған үшін <code>\'missing:&lt;баған&gt;\'</code>; (2) <code>customer_id</code>-де бос мән болса <code>\'null_id\'</code>; (3) <code>monthly_fee</code>-де теріс мән болса <code>\'negative_fee\'</code>. Баған жоқ болса, оған қатысты тексеруді өткізіп жіберіңіз.', starter: P(String.raw`
import pandas as pd
REQUIRED = ['customer_id', 'monthly_fee', 'tenure_months']

def validate_batch(df):
    problems = []
    return problems

bad = pd.DataFrame({'customer_id': [1, None, 3], 'monthly_fee': [5000, -100, 7000]})
print(validate_batch(bad))
`), solution: P(String.raw`
import pandas as pd
REQUIRED = ['customer_id', 'monthly_fee', 'tenure_months']

def validate_batch(df):
    problems = []
    for col in REQUIRED:
        if col not in df.columns:
            problems.append(f'missing:{col}')
    if 'customer_id' in df.columns and df['customer_id'].isna().any():
        problems.append('null_id')
    if 'monthly_fee' in df.columns and (df['monthly_fee'] < 0).any():
        problems.append('negative_fee')
    return problems

bad = pd.DataFrame({'customer_id': [1, None, 3], 'monthly_fee': [5000, -100, 7000]})
print(validate_batch(bad))
`), check: { tests: "_good = pd.DataFrame({'customer_id': [1, 2], 'monthly_fee': [5000, 0], 'tenure_months': [3, 10]})\nassert validate_batch(_good) == [], 'Дұрыс деректе мәселе жоқ (0 теңге теріс емес)'\n_b = validate_batch(pd.DataFrame({'customer_id': [1, None, 3], 'monthly_fee': [5000, -100, 7000]}))\nassert sorted(_b) == sorted(['missing:tenure_months', 'null_id', 'negative_fee']), f'Күтілгені: missing:tenure_months, null_id, negative_fee. Сізде: {_b}'\nassert validate_batch(pd.DataFrame({'x': [1]})) == ['missing:customer_id', 'missing:monthly_fee', 'missing:tenure_months'], 'Баған жоқ болса, тек missing:... хабарлары (REQUIRED ретімен), KeyError болмауы керек'" }, hints: ['<code>if col not in df.columns: problems.append(f\'missing:{col}\')</code>', '<code>df[\'customer_id\'].isna().any()</code> және <code>(df[\'monthly_fee\'] &lt; 0).any()</code>'] },
          { type: 'quiz', xp: 10, prompt: 'GitHub Actions қадамы қашан «құлады» (failed) деп есептеледі?', options: ['Команда экранға бірдеңе шығарса', 'Команда нөлдік емес exit code қайтарса (мысалы sys.exit(1))', 'Қадам 10 секундтан ұзақ жүрсе', 'Python warning шықса'], answer: 1, explain: 'CI тек exit code-қа қарайды: 0 — сәтті, басқасы — қате. Сондықтан check_metrics.py соңында <code>sys.exit(1 if errors else 0)</code> жазылады.' }
        ]
      },
      {
        id: 'ops-6', title: 'Production-дағы мониторинг', minutes: 14,
        body: `
<p>Модель deploy болды — енді ол «тірі» жүйе. Мониторинг үш деңгейде жүреді:</p>
<table>
<tr><th>Деңгей</th><th>Не өлшейміз</th><th>Мысал шек</th></tr>
<tr><td>Сервис (operational)</td><td>latency (p50, p95), error rate, сұрау саны</td><td>p95 &gt; 300 мс, қателер &gt; 2%</td></tr>
<tr><td>Деректер (input)</td><td>бос мәндер үлесі, белгілердің таралуы, жаңа категориялар</td><td>PSI &gt; 0.25</td></tr>
<tr><td>Модель (output, quality)</td><td>болжамдардың таралуы, нақты метрика (label келгенде)</td><td>орташа proba 0.1-ге ауытқыды</td></tr>
</table>
<h3>Неге орташа емес, p95?</h3>
<p>Latency орташасы 120 мс болуы мүмкін, бірақ әр 20-шы клиент 2 секунд күтеді. <b>p95</b> (95-перцентиль) — сұраулардың 95%-ы осыдан тез. Ол «баяу құйрықты» көрсетеді.</p>
<h3>Label кешігуі</h3>
<p>Churn моделінде нақты жауап (абонент кетті ме?) бір айдан кейін ғана белгілі. Сол айда сапаны тікелей өлшей алмаймыз. Сондықтан <b>proxy</b> сигналдарды бақылаймыз: кіріс деректердің drift-і және болжамдардың таралуы. Модель әдетте 25% абонентке «кетеді» десе, ал бір аптада кенеттен 45% десе — бірдеңе өзгерді.</p>
<h3>pandas-пен мысал</h3>
<pre><code>logs = pd.read_csv('requests.csv')        # latency_ms, status, proba, week
p95 = logs['latency_ms'].quantile(0.95)
error_rate = (logs['status'] &gt;= 500).mean()
weekly = logs.groupby('week')['proba'].mean()</code></pre>
<p>Нақты жүйеде бұл сандарды Prometheus жинайды, Grafana-да dashboard көрінеді, ал шектен асқанда Slack немесе Telegram-ға alert келеді. Evidently, WhyLabs сияқты құралдар data/model мониторингін дайын есептер ретінде береді.</p>
<div class="tip">Alert аз, бірақ мағыналы болсын. Күніне 50 alert келсе, команда оларды оқымай қояды (alert fatigue). Әр alert-ке «кім, не істейді?» деген runbook жазыңыз.</div>`,
        exercises: [
          { type: 'python', xp: 20, prompt: '<code>logs</code> DataFrame-інен: <code>p95</code> — <code>latency_ms</code>-тің 95-перцентилі (<code>.quantile(0.95)</code>), <code>error_rate</code> — <code>status &gt;= 500</code> сұраулардың үлесі (0–1). Сосын <code>alerts</code> тізімін жасаңыз: <code>p95 &gt; 300</code> болса <code>\'latency\'</code>, <code>error_rate &gt; 0.02</code> болса <code>\'errors\'</code> (осы ретпен).', starter: P(String.raw`
import pandas as pd
lat = [120, 95, 110, 130, 105, 98, 450, 115, 102, 125, 140, 99, 101, 620, 118, 108, 97, 111, 133, 104]
status = [200] * 20
status[6] = 500
status[13] = 503
logs = pd.DataFrame({'latency_ms': lat, 'status': status})

p95 = logs['latency_ms'].mean()
error_rate = None
alerts = []
print(p95, error_rate, alerts)
`), solution: P(String.raw`
import pandas as pd
lat = [120, 95, 110, 130, 105, 98, 450, 115, 102, 125, 140, 99, 101, 620, 118, 108, 97, 111, 133, 104]
status = [200] * 20
status[6] = 500
status[13] = 503
logs = pd.DataFrame({'latency_ms': lat, 'status': status})

p95 = logs['latency_ms'].quantile(0.95)
error_rate = (logs['status'] >= 500).mean()
alerts = []
if p95 > 300:
    alerts.append('latency')
if error_rate > 0.02:
    alerts.append('errors')
print(p95, error_rate, alerts)
`), check: { tests: "assert abs(float(p95) - logs['latency_ms'].quantile(0.95)) < 1e-9, 'p95 = logs[\"latency_ms\"].quantile(0.95) (орташа емес)'\nassert error_rate is not None and abs(float(error_rate) - 0.1) < 1e-9, 'error_rate = 2 / 20 = 0.1'\nassert alerts == ['latency', 'errors'], f\"alerts = ['latency', 'errors'] болуы керек, сізде {alerts}\"" }, hints: ['<code>logs[\'latency_ms\'].quantile(0.95)</code>', '<code>(logs[\'status\'] &gt;= 500).mean()</code> — True/False-тың орташасы үлесті береді'] },
          { type: 'python', xp: 20, prompt: 'Label әлі жоқ, сондықтан болжамдардың таралуын бақылаймыз. <code>weekly</code> — әр аптадағы орташа <code>proba</code> (<code>groupby</code>), <code>flagged</code> — орташасы <code>BASELINE</code>-нан 0.1-ден <b>көп</b> ауытқыған апталардың тізімі (int).', starter: P(String.raw`
import pandas as pd
BASELINE = 0.25
preds = pd.DataFrame({
    'week':  [1]*5 + [2]*5 + [3]*5 + [4]*5,
    'proba': [0.20, 0.30, 0.25, 0.22, 0.28,
              0.30, 0.20, 0.26, 0.24, 0.25,
              0.35, 0.40, 0.30, 0.33, 0.32,
              0.45, 0.50, 0.40, 0.38, 0.42],
})
weekly = None
flagged = []
print(weekly, flagged)
`), solution: P(String.raw`
import pandas as pd
BASELINE = 0.25
preds = pd.DataFrame({
    'week':  [1]*5 + [2]*5 + [3]*5 + [4]*5,
    'proba': [0.20, 0.30, 0.25, 0.22, 0.28,
              0.30, 0.20, 0.26, 0.24, 0.25,
              0.35, 0.40, 0.30, 0.33, 0.32,
              0.45, 0.50, 0.40, 0.38, 0.42],
})
weekly = preds.groupby('week')['proba'].mean()
flagged = [int(w) for w, m in weekly.items() if abs(m - BASELINE) > 0.1]
print(weekly, flagged)
`), check: { tests: "assert weekly is not None and abs(float(weekly.loc[4]) - 0.43) < 1e-9, 'weekly = preds.groupby(\"week\")[\"proba\"].mean()'\nassert [int(x) for x in flagged] == [4], f'Тек 4-апта (0.43) шектен шығады; 3-апта 0.34, ауытқу 0.09. Сізде {flagged}'" }, hints: ['<code>preds.groupby(\'week\')[\'proba\'].mean()</code>', '<code>[w for w, m in weekly.items() if abs(m - BASELINE) &gt; 0.1]</code>'] },
          { type: 'number', xp: 10, prompt: 'Бір тәулікте модель API-ы 48 000 сұрау алды, оның 360-ы 5xx қатемен аяқталды. Error rate неше <b>пайыз</b>?', answer: 0.75, tol: 0.01, unit: '%', explain: '360 / 48 000 = 0.0075 = 0.75%.' },
          { type: 'quiz', xp: 10, prompt: 'Churn моделінің нақты label-дері 30 күннен кейін ғана келеді. Бірінші аптада модельдің жағдайын қалай бақылаймыз?', options: ['Ешқалай, 30 күн күтеміз', 'Кіріс белгілердің drift-ін және болжамдардың таралуын бақылаймыз', 'Модельді күн сайын қайта үйретеміз', 'Тек CPU жүктемесіне қараймыз'], answer: 1, explain: 'Label кешіккенде proxy сигналдар қолданылады: input drift және prediction drift. Олар сапа нашарлағанын ертерек көрсетеді.' }
        ]
      },
      {
        id: 'ops-7', title: 'Data drift: PSI және KS', minutes: 16,
        body: `
<p><b>Data drift</b> (covariate shift) — кіріс белгілердің таралуы үйрету кезіндегіден өзгеруі: <code>P(X)</code> өзгерді. Мысалы, үйрету кезінде орташа <code>monthly_fee</code> 7 500 ₸ болса, бір жылдан кейін тарифтер қымбаттап 11 000 ₸ болды. Модельдің ережелері ескі дүниеге арналған.</p>
<h3>PSI — Population Stability Index</h3>
<p>Ең жиі қолданылатын өлшем. Белгіні bin-дерге (әдетте 10) бөліп, екі таралудағы үлестерді салыстырамыз:</p>
<pre><code>PSI = Σ (actual_i − expected_i) × ln(actual_i / expected_i)</code></pre>
<p>Мұнда <code>expected_i</code> — reference (үйрету) дерегіндегі i-ші bin-нің үлесі, <code>actual_i</code> — жаңа дерек үлесі. Нөлге бөлінбеу үшін үлестерге кішкентай еден (мысалы 0.001) қояды.</p>
<table>
<tr><th>PSI</th><th>Түсіндірме</th><th>Әрекет</th></tr>
<tr><td>&lt; 0.1</td><td>Өзгеріс жоқ</td><td>Ештеңе</td></tr>
<tr><td>0.1 – 0.25</td><td>Орташа drift</td><td>Бақылау, себебін іздеу</td></tr>
<tr><td>&gt; 0.25</td><td>Күшті drift</td><td>Retraining туралы ойлану</td></tr>
</table>
<h3>Қолмен есептелген мысал</h3>
<p>Reference-те әр bin-де 25%, жаңа дерек <code>[0.05, 0.15, 0.30, 0.50]</code>. Бірінші bin: <code>(0.05 − 0.25) × ln(0.05 / 0.25) = (−0.20) × (−1.609) = 0.322</code>. Қалған үш bin-ді қосқанда PSI ≈ 0.56 — күшті drift.</p>
<h3>KS statistic</h3>
<p>Kolmogorov–Smirnov екі <b>үлестірім функциясының</b> (CDF) ең үлкен айырмасын алады: <code>D = max |F_ref(x) − F_cur(x)|</code>. Bin керек емес, бірақ ол тек үздіксіз белгілерге жарайды. Категориялық белгілер үшін PSI немесе жай ғана «жаңа категория пайда болды ма?» деген тексеру қолданылады.</p>
<pre><code>from scipy.stats import ks_2samp          # нақты жобада
stat, p = ks_2samp(ref_fee, cur_fee)       # stat = D</code></pre>
<div class="tip">Drift табу — диагноз емес, сигнал. Алдымен себебін іздеңіз: шынымен клиенттер өзгерді ме, немесе ETL-де баған орындары ауысып, <code>monthly_fee</code>-ге басқа дерек түсіп кетті ме? Екінші жағдайда retraining көмектеспейді, pipeline-ды түзету керек.</div>`,
        exercises: [
          { type: 'python', xp: 25, prompt: '<code>bin_props(x, bins)</code> — <code>bins</code> шекаралары бойынша әр bin-дегі мәндердің <b>үлесін</b> (тізім, қосындысы 1) қайтарсын (<code>bins[i] &lt;= v &lt; bins[i+1]</code>). Сосын <code>psi(ref, cur, bins)</code> — PSI-ды қайтарсын, үлестерге <code>0.001</code> еденін қойып. <code>psi_drift</code> пен <code>psi_stable</code>-ді есептеңіз.', starter: P(String.raw`
import numpy as np
BINS = [0, 5000, 8000, 12000, np.inf]
ref    = [3500, 3900, 4200, 4500, 4800, 5200, 6000, 6500, 7000, 7500,
          8200, 9000, 9500, 10500, 11000, 12500, 13000, 14000, 16000, 18000]
drift  = [4000, 5500, 6200, 7800, 8300, 8800, 9200, 10000, 10800, 11500,
          12200, 12800, 13500, 14200, 15000, 15500, 16500, 17000, 19000, 21000]
stable = [3600, 4100, 4400, 4900, 5100, 5900, 6400, 7100, 7600, 8100,
          8900, 9400, 10200, 11200, 12100, 12600, 13200, 14500, 15800, 17500]

def bin_props(x, bins):
    return [1.0]

def psi(ref, cur, bins):
    return 0.0

psi_drift = psi(ref, drift, BINS)
psi_stable = psi(ref, stable, BINS)
print(round(psi_drift, 3), round(psi_stable, 3))
`), solution: P(String.raw`
import numpy as np
BINS = [0, 5000, 8000, 12000, np.inf]
ref    = [3500, 3900, 4200, 4500, 4800, 5200, 6000, 6500, 7000, 7500,
          8200, 9000, 9500, 10500, 11000, 12500, 13000, 14000, 16000, 18000]
drift  = [4000, 5500, 6200, 7800, 8300, 8800, 9200, 10000, 10800, 11500,
          12200, 12800, 13500, 14200, 15000, 15500, 16500, 17000, 19000, 21000]
stable = [3600, 4100, 4400, 4900, 5100, 5900, 6400, 7100, 7600, 8100,
          8900, 9400, 10200, 11200, 12100, 12600, 13200, 14500, 15800, 17500]

def bin_props(x, bins):
    a = np.asarray(x, dtype=float)
    return [float(((a >= bins[i]) & (a < bins[i + 1])).mean()) for i in range(len(bins) - 1)]

def psi(ref, cur, bins):
    e = np.maximum(np.array(bin_props(ref, bins)), 0.001)
    a = np.maximum(np.array(bin_props(cur, bins)), 0.001)
    return float(np.sum((a - e) * np.log(a / e)))

psi_drift = psi(ref, drift, BINS)
psi_stable = psi(ref, stable, BINS)
print(round(psi_drift, 3), round(psi_stable, 3))
`), check: { tests: "import numpy as _np\nassert [round(p, 3) for p in bin_props(ref, BINS)] == [0.25, 0.25, 0.25, 0.25], f'Reference-те әр bin-де 25% болуы керек, сізде {bin_props(ref, BINS)}'\nassert [round(p, 3) for p in bin_props(drift, BINS)] == [0.05, 0.15, 0.3, 0.5], 'drift үлестері: 0.05, 0.15, 0.30, 0.50'\nassert abs(float(psi_drift) - 0.5554) < 0.002, f'psi_drift ≈ 0.555 болуы керек, сізде {psi_drift}'\nassert abs(float(psi_stable) - 0.0203) < 0.002, f'psi_stable ≈ 0.020 болуы керек, сізде {psi_stable}'\nassert abs(psi(ref, ref, BINS)) < 1e-9, 'Бірдей таралуда PSI = 0 болуы керек'", mustInclude: ['log'] }, hints: ['Үлес: <code>((a &gt;= bins[i]) &amp; (a &lt; bins[i+1])).mean()</code> — numpy массивінде', 'PSI: <code>np.sum((a - e) * np.log(a / e))</code>, алдында <code>np.maximum(..., 0.001)</code>'] },
          { type: 'python', xp: 25, prompt: '<code>ks_stat(a, b)</code> — екі таңданың CDF-терінің ең үлкен айырмасын (scipy-сыз) қайтарсын. Әдіс: екі таңданы біріктіріп, әр мән үшін «осы мәннен кіші немесе тең үлес»-ті екі таңдада да есептеп, айырманың максимумын алу.', starter: P(String.raw`
import numpy as np
ref    = [3500, 3900, 4200, 4500, 4800, 5200, 6000, 6500, 7000, 7500,
          8200, 9000, 9500, 10500, 11000, 12500, 13000, 14000, 16000, 18000]
drift  = [4000, 5500, 6200, 7800, 8300, 8800, 9200, 10000, 10800, 11500,
          12200, 12800, 13500, 14200, 15000, 15500, 16500, 17000, 19000, 21000]

def ks_stat(a, b):
    return 0.0

d = ks_stat(ref, drift)
print(round(d, 3))
`), solution: P(String.raw`
import numpy as np
ref    = [3500, 3900, 4200, 4500, 4800, 5200, 6000, 6500, 7000, 7500,
          8200, 9000, 9500, 10500, 11000, 12500, 13000, 14000, 16000, 18000]
drift  = [4000, 5500, 6200, 7800, 8300, 8800, 9200, 10000, 10800, 11500,
          12200, 12800, 13500, 14200, 15000, 15500, 16500, 17000, 19000, 21000]

def ks_stat(a, b):
    a = np.sort(np.asarray(a, dtype=float))
    b = np.sort(np.asarray(b, dtype=float))
    best = 0.0
    for v in np.concatenate([a, b]):
        fa = (a <= v).mean()
        fb = (b <= v).mean()
        best = max(best, abs(fa - fb))
    return float(best)

d = ks_stat(ref, drift)
print(round(d, 3))
`), check: { tests: "assert abs(float(d) - 0.35) < 1e-6, f'ref мен drift үшін D = 0.35, сізде {d}'\nassert abs(ks_stat(ref, ref)) < 1e-9, 'Бір таңдамен салыстырғанда D = 0'\nassert abs(ks_stat([1, 2, 3, 4], [5, 6, 7, 8]) - 1.0) < 1e-9, 'Таралулар мүлде қабаттаспаса D = 1'\nassert abs(ks_stat([1, 2, 3, 4], [1, 2, 3, 9]) - 0.25) < 1e-9, f'[1,2,3,4] мен [1,2,3,9] үшін D = 0.25'" }, hints: ['<code>(a &lt;= v).mean()</code> — a-дағы v-ден аспайтын мәндердің үлесі', '<code>for v in np.concatenate([a, b]):</code> ішінде максимумды жаңартыңыз'] },
          { type: 'number', xp: 10, prompt: 'Reference-те bin-нің үлесі 0.40, жаңа деректе 0.20. Осы bin-нің PSI-ға қосатын үлесі қанша? (<code>(0.20 − 0.40) × ln(0.20 / 0.40)</code>, үш таңбаға дейін)', answer: 0.139, tol: 0.003, explain: 'ln(0.5) = −0.693, (−0.2) × (−0.693) = 0.1386. PSI-дың әр қосылғышы әрқашан ≥ 0, сондықтан PSI теріс болмайды.' },
          { type: 'quiz', xp: 10, prompt: 'Белгінің PSI-ы 0.42 шықты. Бірінші әрекет қандай?', options: ['Бірден модельді қайта үйрету', 'Белгіні модельден алып тастау', 'Drift себебін тексеру: шынайы өзгеріс пе, әлде pipeline қатесі ме', 'Мониторинг шегін 0.5-ке көтеру'], answer: 2, explain: 'Көп жағдайда күшті drift — ETL-дің қатесі (баған ауысты, өлшем бірлігі өзгерді, null-дер 0-ге айналды). Алдымен себепті табыңыз, сосын шешім қабылдаңыз.' }
        ]
      },
      {
        id: 'ops-8', title: 'Concept drift және retraining triggers', minutes: 15,
        body: `
<p>Екі түрлі бұзылуды ажырату керек:</p>
<table>
<tr><th>Түрі</th><th>Формуласы</th><th>Мысал</th></tr>
<tr><td><b>Data drift</b></td><td><code>P(X)</code> өзгерді, <code>P(y|X)</code> сол</td><td>Абоненттер жасы ұлғайды, бірақ «көп қоңырау = кетеді» заңдылығы сақталды</td></tr>
<tr><td><b>Concept drift</b></td><td><code>P(y|X)</code> өзгерді</td><td>Бәсекелес арзан тариф шығарды: енді жоғары төлемақы төлейтіндер де кетеді, бұрын олар ең берік клиент еді</td></tr>
<tr><td><b>Label shift</b></td><td><code>P(y)</code> өзгерді</td><td>Churn 8%-тен 20%-ке өсті</td></tr>
</table>
<p>Concept drift қауіптірек: кіріс деректер бірдей көрінуі мүмкін, бірақ модельдің ережесі бұрыс. Оны тек label-дер келгенде ғана нақты көреміз.</p>
<h3>Concept drift-тің түрлері</h3>
<ul>
<li><b>Sudden</b> — бір күнде (жаңа тариф, жаңа заң, пандемия).</li>
<li><b>Gradual</b> — айлар бойы бірте-бірте (клиент мінезінің өзгеруі).</li>
<li><b>Seasonal</b> — қайталанатын (наурыз мейрамы, жаңа оқу жылы). Бұл үшін retraining емес, мезгілдік белгілер (month, is_holiday) қосу дұрыс.</li>
</ul>
<h3>Retraining triggers</h3>
<ol>
<li><b>Мерзім бойынша (scheduled)</b>: аптада бір, айда бір. Қарапайым, болжамды, көп жағдайда жетеді.</li>
<li><b>Метрика бойынша (performance-based)</b>: нақты AUC baseline-нан белгілі шектен төмен түссе.</li>
<li><b>Drift бойынша</b>: негізгі белгілердің PSI &gt; 0.25 болса.</li>
<li><b>Дерек көлемі бойынша</b>: соңғы retraining-тен кейін 50 000 жаңа label жинақталса.</li>
<li><b>Қолмен (manual)</b>: бизнес өзгерісі белгілі (жаңа тариф іске қосылды).</li>
</ol>
<h3>Retraining-ті қалай қорғау керек</h3>
<p>Автоматты retraining — қауіпті құрал: нашар дерекпен үйретілген модель production-ға өздігінен шығып кетуі мүмкін. Сондықтан pipeline-да әрқашан қорғаныс болады: (1) data validation, (2) жаңа модельді ағымдағы production-мен бір validation жиынында салыстыру, (3) жақсы болса — Staging, shadow mode, сосын Production, (4) нашар болса — ескі модель қалады және команда хабар алады.</p>
<div class="tip">Ереже: «retrain» деген сөз «автоматты деploy» деген сөз емес. Үйрету автоматты, ал promotion — тексеруден кейін.</div>`,
        exercises: [
          { type: 'python', xp: 25, prompt: '<code>should_retrain(state)</code> функциясын жазыңыз: triggers тізімін (ретпен) қайтарсын. Ережелер: <code>days_since_train &gt;= 30</code> → <code>\'scheduled\'</code>; <code>current_auc</code> бар (None емес) және <code>baseline_auc - current_auc &gt; 0.03</code> → <code>\'performance\'</code>; <code>max_psi &gt; 0.25</code> → <code>\'drift\'</code>; <code>new_labels &gt;= 50000</code> → <code>\'data_volume\'</code>. Тізім ретін осы ретпен сақтаңыз.', starter: P(String.raw`
def should_retrain(state):
    triggers = []
    if state['days_since_train'] >= 30:
        triggers.append('scheduled')
    return triggers

print(should_retrain({'days_since_train': 12, 'baseline_auc': 0.83, 'current_auc': 0.78,
                      'max_psi': 0.31, 'new_labels': 12000}))
`), solution: P(String.raw`
def should_retrain(state):
    triggers = []
    if state['days_since_train'] >= 30:
        triggers.append('scheduled')
    cur = state.get('current_auc')
    if cur is not None and state['baseline_auc'] - cur > 0.03:
        triggers.append('performance')
    if state['max_psi'] > 0.25:
        triggers.append('drift')
    if state['new_labels'] >= 50000:
        triggers.append('data_volume')
    return triggers

print(should_retrain({'days_since_train': 12, 'baseline_auc': 0.83, 'current_auc': 0.78,
                      'max_psi': 0.31, 'new_labels': 12000}))
`), check: { tests: "_ok = {'days_since_train': 5, 'baseline_auc': 0.83, 'current_auc': 0.82, 'max_psi': 0.08, 'new_labels': 1000}\nassert should_retrain(_ok) == [], 'Барлығы қалыпты болса, тізім бос'\nassert should_retrain({'days_since_train': 12, 'baseline_auc': 0.83, 'current_auc': 0.78, 'max_psi': 0.31, 'new_labels': 12000}) == ['performance', 'drift'], \"Күтілгені ['performance', 'drift']\"\nassert should_retrain({'days_since_train': 31, 'baseline_auc': 0.83, 'current_auc': None, 'max_psi': 0.3, 'new_labels': 60000}) == ['scheduled', 'drift', 'data_volume'], 'current_auc None болса, performance тексерілмейді (TypeError болмауы керек)'\nassert should_retrain({'days_since_train': 30, 'baseline_auc': 0.83, 'current_auc': 0.80, 'max_psi': 0.25, 'new_labels': 50000}) == ['scheduled', 'data_volume'], 'Шектер: 0.03 дәл төмендеу және psi дәл 0.25 trigger емес, 30 күн мен 50000 label trigger'" }, hints: ['<code>cur = state.get(\'current_auc\')</code>, сосын <code>if cur is not None and ...</code>', 'Қатаң теңсіздіктерге мән беріңіз: <code>&gt;= 30</code>, <code>&gt; 0.03</code>, <code>&gt; 0.25</code>, <code>&gt;= 50000</code>'] },
          { type: 'python', xp: 20, prompt: 'Retraining-тің қорғанысы. <code>promote_or_keep(new_auc, prod_auc, data_ok, min_gain=0.005)</code> функциясын жазыңыз: <code>data_ok</code> False болса <code>\'blocked: bad data\'</code>; жаңа модель <code>prod_auc + min_gain</code>-нан кем болса <code>\'keep current\'</code>; әйтпесе <code>\'promote to staging\'</code> қайтарсын.', starter: P(String.raw`
def promote_or_keep(new_auc, prod_auc, data_ok, min_gain=0.005):
    return 'promote to staging'

print(promote_or_keep(0.84, 0.83, True))
`), solution: P(String.raw`
def promote_or_keep(new_auc, prod_auc, data_ok, min_gain=0.005):
    if not data_ok:
        return 'blocked: bad data'
    if new_auc < prod_auc + min_gain:
        return 'keep current'
    return 'promote to staging'

print(promote_or_keep(0.84, 0.83, True))
`), check: { tests: "assert promote_or_keep(0.90, 0.83, False) == 'blocked: bad data', 'Деректер нашар болса, метрика қандай болса да blocked'\nassert promote_or_keep(0.84, 0.83, True) == 'promote to staging', '+0.01 өсім жеткілікті'\nassert promote_or_keep(0.832, 0.83, True) == 'keep current', '+0.002 өсім min_gain-нан кем'\nassert promote_or_keep(0.80, 0.83, True) == 'keep current', 'Нашар модель production-ға шықпайды'\nassert promote_or_keep(0.84, 0.83, True, min_gain=0.02) == 'keep current', 'min_gain параметрі ескерілуі керек'" }, hints: ['Ең алдымен <code>if not data_ok:</code>', '<code>if new_auc &lt; prod_auc + min_gain: return \'keep current\'</code>'] },
          { type: 'quiz', xp: 10, prompt: 'Бәсекелес арзан тариф шығарды, енді қымбат тарифтегі берік клиенттер де кете бастады. Бұл қандай құбылыс?', options: ['Data drift: P(X) өзгерді', 'Concept drift: P(y|X) өзгерді', 'Overfitting', 'Data leakage'], answer: 1, explain: 'Белгілер бірдей (төлемақы, tenure), бірақ олардың churn-мен байланысы өзгерді. Бұл — concept drift, оны тек жаңа label-мен қайта үйрету шешеді.' },
          { type: 'rubric', xp: 30, minWords: 70, prompt: '«Дала Мобайл» churn моделі үшін <b>retraining саясатын</b> жазыңыз (кемінде 70 сөз): қандай triggers, қандай шектер, retraining-тен кейін жаңа модель қалай тексеріледі, promotion-ды кім шешеді, нашар шықса не болады. Сосын үш критерий бойынша адал бағалаңыз. Өту үшін әр критерий кемінде <b>3 / 4</b>.', criteria: [
            { name: 'Triggers және шектер', levels: ['Trigger аталмаған', 'Тек «керек болса қайта үйретеміз»', 'Нақты triggers бар (мерзім, метрика немесе drift)', 'Кемінде екі trigger нақты сандық шекпен (мысалы 30 күн, ΔAUC > 0.03, PSI > 0.25)'] },
            { name: 'Қорғаныс және promotion', levels: ['Айтылмаған', 'Жаңа модель бірден production-ға', 'Data validation немесе ағымдағы модельмен салыстыру бар', 'Validation, салыстыру, staging/shadow және нашар шыққандағы әрекет (ескі модель қалады + alert) жазылған'] },
            { name: 'Жауапкершілік және бақылау', levels: ['Кім не істейтіні белгісіз', 'Жалпы «команда қарайды»', 'Нақты рөл (ML engineer / data scientist) мен тексеру мерзімі бар', 'Рөлдер, alert арнасы, rollback тәртібі және шешімді кім бекітетіні жазылған'] }
          ] }
        ]
      },
      {
        id: 'ops-gate', gate: true, title: 'Модуль емтиханы: MLOps Basics', minutes: 30,
        body: `
<p>Қорытынды тексеріс: tracking, CI gate, drift және retraining. Кеңестер жоқ. Өту шегі — 75%.</p>`,
        exercises: [
          { type: 'python', xp: 35, prompt: 'Run-дардан production үміткерін таңдайтын <code>pick_candidate(runs, min_auc=0.80)</code> жазыңыз. Run қабылданады, егер: <code>metrics</code>-те <code>val_auc</code> бар және <code>&gt;= min_auc</code>, <code>params</code>-та <code>data_sha</code> бар (reproducibility), және <code>params[\'seed\']</code> бар. Қабылданғандардың ішінен ең жоғары <code>val_auc</code>-тысын қайтарыңыз; ешқайсысы жарамаса <code>None</code>.', starter: P(String.raw`
runs = [
    {'name': 'a', 'params': {'seed': 42, 'data_sha': '3fa9c0'}, 'metrics': {'val_auc': 0.79}},
    {'name': 'b', 'params': {'seed': 42},                        'metrics': {'val_auc': 0.88}},
    {'name': 'c', 'params': {'data_sha': '3fa9c0'},              'metrics': {'val_auc': 0.86}},
    {'name': 'd', 'params': {'seed': 7, 'data_sha': '91bb2e'},   'metrics': {'val_auc': 0.84}},
    {'name': 'e', 'params': {'seed': 7, 'data_sha': '91bb2e'},   'metrics': {}},
]

def pick_candidate(runs, min_auc=0.80):
    return runs[0]
`), solution: P(String.raw`
runs = [
    {'name': 'a', 'params': {'seed': 42, 'data_sha': '3fa9c0'}, 'metrics': {'val_auc': 0.79}},
    {'name': 'b', 'params': {'seed': 42},                        'metrics': {'val_auc': 0.88}},
    {'name': 'c', 'params': {'data_sha': '3fa9c0'},              'metrics': {'val_auc': 0.86}},
    {'name': 'd', 'params': {'seed': 7, 'data_sha': '91bb2e'},   'metrics': {'val_auc': 0.84}},
    {'name': 'e', 'params': {'seed': 7, 'data_sha': '91bb2e'},   'metrics': {}},
]

def pick_candidate(runs, min_auc=0.80):
    ok = [r for r in runs
          if r['metrics'].get('val_auc') is not None
          and r['metrics']['val_auc'] >= min_auc
          and 'data_sha' in r['params'] and 'seed' in r['params']]
    if not ok:
        return None
    return max(ok, key=lambda r: r['metrics']['val_auc'])

print(pick_candidate(runs))
`), check: { tests: "_r = pick_candidate(runs)\nassert _r is not None and _r['name'] == 'd', f\"Тек d барлық шартты қанағаттандырады (b-де data_sha жоқ, c-де seed жоқ, a нашар, e-де метрика жоқ). Сізде {_r['name'] if _r else None}\"\nassert pick_candidate(runs, min_auc=0.90) is None, 'Ешқайсысы өтпесе None қайтарыңыз'\n_r2 = [{'name': 'x', 'params': {'seed': 1, 'data_sha': 'aa'}, 'metrics': {'val_auc': 0.81}},\n       {'name': 'y', 'params': {'seed': 1, 'data_sha': 'aa'}, 'metrics': {'val_auc': 0.95}}]\nassert pick_candidate(_r2)['name'] == 'y', 'Жарамдылардың ішінен ең жақсысын таңдаңыз'" } },
          { type: 'python', xp: 35, prompt: 'CI gate-тің толық нұсқасын жазыңыз: <code>ci_gate(new, baseline, psi_by_feature)</code> → <code>(ok, errors)</code> tuple. Ережелер: <code>baseline</code>-дағы әр метрика <code>new</code>-да болуы және одан 0.01-ден артық төмен болмауы керек (қате: <code>\'metric:&lt;ат&gt;\'</code>); <code>psi_by_feature</code>-дегі PSI &gt; 0.25 болған әр белгі үшін <code>\'psi:&lt;белгі&gt;\'</code> (белгілер dict ретімен). <code>ok</code> — қателер болмаса True.', starter: P(String.raw`
def ci_gate(new, baseline, psi_by_feature):
    errors = []
    return (True, errors)
`), solution: P(String.raw`
def ci_gate(new, baseline, psi_by_feature):
    errors = []
    for m, base in baseline.items():
        if m not in new:
            errors.append(f'metric:{m}')
        elif new[m] < base - 0.01:
            errors.append(f'metric:{m}')
    for f, psi in psi_by_feature.items():
        if psi > 0.25:
            errors.append(f'psi:{f}')
    return (len(errors) == 0, errors)
`), check: { tests: "_ok, _e = ci_gate({'auc': 0.83, 'recall': 0.70}, {'auc': 0.83, 'recall': 0.70}, {'monthly_fee': 0.05})\nassert _ok is True and _e == [], 'Бәрі жақсы болса (True, [])'\n_ok, _e = ci_gate({'auc': 0.80}, {'auc': 0.83}, {'monthly_fee': 0.30, 'tenure_months': 0.10})\nassert _ok is False and _e == ['metric:auc', 'psi:monthly_fee'], f\"Күтілгені ['metric:auc', 'psi:monthly_fee'], сізде {_e}\"\n_ok, _e = ci_gate({'auc': 0.83}, {'auc': 0.83, 'recall': 0.70}, {})\nassert _e == ['metric:recall'], 'Жоқ метрика да қате'\n_ok, _e = ci_gate({'auc': 0.825}, {'auc': 0.83}, {'f': 0.25})\nassert _ok is True, '0.005 төмендеу және PSI дәл 0.25 — қате емес'" } },
          { type: 'python', xp: 35, prompt: 'Бір белгінің PSI-ын есептейтін <code>psi(ref, cur, n_bins=4)</code> жазыңыз: bin шекараларын <b>reference</b> дерегінің квантильдерінен алыңыз (<code>np.quantile(ref, [0, 0.25, 0.5, 0.75, 1])</code>), шеткі шекараларды <code>-inf</code> / <code>+inf</code> етіп ашыңыз, үлестерге 0.001 еденін қойыңыз. Сосын <code>psi_fee</code>-ді есептеңіз.', starter: P(String.raw`
import numpy as np
ref_fee = [3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500,
           8000, 8500, 9000, 9500, 10000, 10500, 11000, 11500, 12000, 12500]
cur_fee = [9000, 9500, 10000, 10500, 11000, 11500, 12000, 12500, 13000, 13500,
           14000, 14500, 15000, 15500, 16000, 16500, 17000, 17500, 18000, 18500]

def psi(ref, cur, n_bins=4):
    return 0.0

psi_fee = psi(ref_fee, cur_fee)
print(round(psi_fee, 3))
`), solution: P(String.raw`
import numpy as np
ref_fee = [3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500,
           8000, 8500, 9000, 9500, 10000, 10500, 11000, 11500, 12000, 12500]
cur_fee = [9000, 9500, 10000, 10500, 11000, 11500, 12000, 12500, 13000, 13500,
           14000, 14500, 15000, 15500, 16000, 16500, 17000, 17500, 18000, 18500]

def psi(ref, cur, n_bins=4):
    ref = np.asarray(ref, dtype=float)
    cur = np.asarray(cur, dtype=float)
    qs = np.quantile(ref, np.linspace(0, 1, n_bins + 1))
    edges = qs.copy()
    edges[0] = -np.inf
    edges[-1] = np.inf
    total = 0.0
    for i in range(n_bins):
        e = max(float(((ref >= edges[i]) & (ref < edges[i + 1])).mean()), 0.001)
        a = max(float(((cur >= edges[i]) & (cur < edges[i + 1])).mean()), 0.001)
        total += (a - e) * np.log(a / e)
    return float(total)

psi_fee = psi(ref_fee, cur_fee)
print(round(psi_fee, 3))
`), check: { tests: "import numpy as _np\nassert abs(psi([1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8])) < 1e-9, 'Бірдей таңдада PSI = 0'\nassert float(psi_fee) > 2.0, f'Таралу толық ауысқан: PSI 2-ден үлкен болуы керек, сізде {psi_fee}'\n_a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]\n_b = [1, 2, 3, 4, 5, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]\n_v = psi(_a, _b)\nassert 0.2 < float(_v) < 3.0, f'Орташа drift күтілген (0.2–3.0), сізде {_v}'" } },
          { type: 'quiz', xp: 30, prompt: 'Модельдің нақты AUC-ы 0.84-тен 0.82-ге түсті, бірақ барлық белгілердің PSI-ы 0.05-тен кем. Ең ықтимал себеп?', options: ['Data drift: кіріс таралуы өзгерді', 'Concept drift: белгілер сол, бірақ олардың target-пен байланысы өзгерді', 'Latency өсті', 'Seed жоғалған'], answer: 1, explain: 'Кіріс таралуы тұрақты (PSI кіші), ал сапа түсті — демек P(y|X) өзгерді. Бұл concept drift.' },
          { type: 'quiz', xp: 30, prompt: 'Автоматты retraining pipeline-ы түнде жұмыс істеп, нәтижені бірден Production stage-ке қоятын болып жасалған. Ең үлкен тәуекел қандай?', options: ['Pipeline ұзақ жүреді', 'Бұзылған деректен үйретілген модель ешкім көрмей production-ға шығады', 'MLflow-да run-дар көп болады', 'Seed қайталанбайды'], answer: 1, explain: 'Үйрету автоматты болуы мүмкін, бірақ promotion тексеруден өтуі керек: data validation, ағымдағы модельмен салыстыру, staging. Әйтпесе бір нашар batch production-ды бұзады.' },
          { type: 'number', xp: 30, prompt: 'Baseline AUC = 0.840, CI-дың рұқсат етілген төмендеуі (max_drop) = 0.010. Жаңа модельдің AUC-ы қандай <b>ең кіші</b> мәнде build әлі де өтеді? (үш таңбамен)', answer: 0.83, tol: 0.001, explain: 'Шарт: new >= baseline − max_drop = 0.840 − 0.010 = 0.830. Дәл 0.830 өтеді, 0.829 құлайды.' }
        ]
      }
    ]
  };
})();

(function () {
  const P = s => s.replace(/^\n/, '');

  Object.assign(DJ.csv, {
    'deng_customers.csv': 'customer_id,customer_name,city,segment\n1,Айгүл,Алматы,retail\n2,Данияр,Астана,retail\n3,Kaspi Shop,Алматы,b2b\n4,Мерей,Шымкент,retail\n5,Техномаркет,Астана,b2b\n6,Нұрлан,Алматы,retail\n',
    'deng_products.csv': 'product_id,product_name,category,price_tg\n10,Құлаққап,electronics,14900\n11,Пернетақта,electronics,23500\n12,Шәйнек,home,18900\n13,Кілем,home,42000\n14,Кітап,books,4500\n',
    'deng_orders.csv': 'order_id,order_date,customer_id,product_id,qty\n101,2024-03-01,1,10,2\n102,2024-03-01,3,11,5\n103,2024-03-02,2,14,3\n104,2024-03-02,1,12,1\n105,2024-03-03,4,10,1\n106,2024-03-03,5,13,2\n107,2024-03-04,3,10,10\n108,2024-03-04,6,14,1\n109,2024-03-05,2,12,2\n110,2024-03-05,5,11,3\n111,2024-03-06,1,14,4\n112,2024-03-06,4,13,1\n',
    'deng_raw_sales.csv': 'order_id,order_date,city,amount_tg,status\n201,2024-03-01, Алматы ,29800,paid\n202,2024-03-01,астана,117500,paid\n203,2024-03-02,АЛМАТЫ,13500,cancelled\n204,2024-03-02,Шымкент ,18900,paid\n205,2024-03-03, алматы,14900,paid\n206,2024-03-03,Астана,84000,pending\n207,2024-03-04,Алматы,149000,paid\n208,2024-03-04,шымкент,4500,paid\n209,2024-03-05,Астана,37800,cancelled\n210,2024-03-05, Алматы ,70500,paid\n'
  });

  const STAR = "import pandas as pd\norders = pd.read_csv('deng_orders.csv')\ncustomers = pd.read_csv('deng_customers.csv')\nproducts = pd.read_csv('deng_products.csv')\n";
  const STARR = "import pandas as _pd\n_o = _pd.read_csv('deng_orders.csv')\n_c = _pd.read_csv('deng_customers.csv')\n_p = _pd.read_csv('deng_products.csv')\n_m = _o.merge(_c, on='customer_id').merge(_p, on='product_id')\n_m['revenue'] = _m['qty'] * _m['price_tg']\n";

  DJ.modules['m6-5'] = {
    intro: 'Analytics-тің астында инфрақұрылым жатыр: деректер қайда сақталады, кім тасымалдайды, қанша тұрады. Бұл модульде OLTP пен OLAP айырмасын, warehouse / lake / lakehouse, star schema, ETL vs ELT, batch vs streaming, Airflow, dbt, Spark және cloud сервистердің негізін үйренесіз.',
    lessons: [
      {
        id: 'deng-1', title: 'OLTP vs OLAP: екі түрлі дүние', minutes: 13,
        body: `
<p>Kaspi-стиліндегі дүкеннің екі дерекқоры бар. Біреуі тапсырыс қабылдайды, екіншісі есеп жасайды. Бұлар бір-біріне мүлде ұқсамайды.</p>
<table>
<tr><th></th><th>OLTP (transactional)</th><th>OLAP (analytical)</th></tr>
<tr><td>Мақсаты</td><td>Жеке операцияларды жазу</td><td>Көп жолды жинақтап талдау</td></tr>
<tr><td>Типтік сұрау</td><td><code>SELECT * FROM orders WHERE order_id = 101</code></td><td><code>SELECT city, SUM(amount) ... GROUP BY city</code></td></tr>
<tr><td>Жол саны</td><td>Бір сұрауда 1–100</td><td>Миллиондаған</td></tr>
<tr><td>Жазу / оқу</td><td>Көп жазу, кіші транзакциялар</td><td>Негізінен оқу, batch жүктеу</td></tr>
<tr><td>Сақтау форматы</td><td><b>Row-oriented</b> (жол бойынша)</td><td><b>Column-oriented</b> (баған бойынша)</td></tr>
<tr><td>Мысалдар</td><td>PostgreSQL, MySQL</td><td>BigQuery, Snowflake, ClickHouse, Redshift</td></tr>
</table>
<h3>Неге columnar жылдам</h3>
<p>Кестеде 200 баған, 500 млн жол. Сізге тек <code>city</code> мен <code>amount</code> керек. Row-store дискіден әр жолды <b>толық</b> оқиды (200 баған), ал column-store тек екі бағанның файлдарын оқиды — 100 есе аз дерек. Қосымша: бір бағандағы мәндер ұқсас болғандықтан, сығу (compression) керемет жұмыс істейді.</p>
<h3>Неге analytics-ті production базасында жүргізбейді</h3>
<p>Сіз <code>GROUP BY</code>-мен 300 млн жолды сканерлеген кезде сол база клиенттің тапсырысын да жазып отыр. Ауыр сұрау базаны бұғаттап, дүкеннің жұмысын тоқтатуы мүмкін. Сондықтан дерек OLTP-ден OLAP-қа көшіріледі: түнде немесе әр 15 минутта.</p>
<pre><code>-- OLTP: бір клиенттің соңғы тапсырысы (индекс бойынша, 1 мс)
SELECT * FROM orders WHERE customer_id = 7 ORDER BY order_date DESC LIMIT 1;

-- OLAP: қала бойынша айлық түсім (сканерлеу, 2 с)
SELECT city, DATE_TRUNC('month', order_date) AS m, SUM(amount_tg)
FROM fact_orders JOIN dim_customer USING (customer_id)
GROUP BY 1, 2;</code></pre>
<div class="tip">Read replica — ортадағы шешім: OLTP базаның көшірмесі, оған ауыр оқу сұрауларын жіберуге болады. Бірақ ол әлі де row-store, сондықтан шынайы analytics үшін warehouse керек.</div>`,
        exercises: [
          { type: 'python', xp: 20, prompt: 'Column-store қанша дерек оқитынын есептейік. Кестеде 200 баған, бәрі бірдей өлшемде, толық кесте 400 GB. Сұрауға 4 баған керек. <code>row_store_gb</code> — row-store оқитын көлем (толық кесте), <code>col_store_gb</code> — column-store оқитыны, <code>speedup</code> — қатынасы (есе).', starter: P(String.raw`
total_gb = 400
n_cols = 200
needed_cols = 4

row_store_gb = None
col_store_gb = None
speedup = None
print(row_store_gb, col_store_gb, speedup)
`), solution: P(String.raw`
total_gb = 400
n_cols = 200
needed_cols = 4

row_store_gb = total_gb
col_store_gb = total_gb / n_cols * needed_cols
speedup = row_store_gb / col_store_gb
print(row_store_gb, col_store_gb, speedup)
`), check: { tests: "assert row_store_gb == 400, 'Row-store әр жолды толық оқиды, яғни 400 GB'\nassert col_store_gb is not None and abs(float(col_store_gb) - 8) < 1e-9, 'Бір баған 2 GB, 4 баған = 8 GB'\nassert speedup is not None and abs(float(speedup) - 50) < 1e-9, '400 / 8 = 50 есе'" }, hints: ['Бір бағанның көлемі: <code>total_gb / n_cols</code>', '<code>speedup = row_store_gb / col_store_gb</code>'] },
          { type: 'quiz', xp: 10, prompt: 'Қай сұрау OLAP жүктемесіне тән?', options: ['<code>SELECT * FROM orders WHERE order_id = 10231</code>', '<code>UPDATE cart SET qty = 2 WHERE cart_id = 55</code>', '<code>SELECT category, SUM(amount) FROM sales GROUP BY category</code>', '<code>INSERT INTO payments VALUES (...)</code>'], answer: 2, explain: 'Көп жолды жинақтайтын агрегация — OLAP. Қалған үшеуі жеке жазбамен жұмыс, яғни OLTP.' },
          { type: 'quiz', xp: 10, prompt: 'Талдаушы production PostgreSQL базасында 300 млн жолды <code>GROUP BY</code>-мен сканерледі. Басты тәуекел қандай?', options: ['Нәтиже дұрыс болмайды', 'OLTP база бұғатталып, клиенттердің тапсырысы өтпей қалуы мүмкін', 'SQL синтаксисі қате болады', 'Дерек жоғалады'], answer: 1, explain: 'Ауыр analytics сұрауы OLTP базаның ресурсын жеп, нақты операцияларға кедергі жасайды. Сондықтан analytics бөлек жүйеде (warehouse) жүреді.' }
        ]
      },
      {
        id: 'deng-2', title: 'Warehouse, lake, lakehouse', minutes: 14,
        body: `
<p>Деректерді сақтаудың үш архитектурасы бар. Олар бір-бірін ауыстырмайды, бірін-бірі толықтырады.</p>
<h3>Data warehouse</h3>
<p>Құрылымы бекітілген (schema-on-write) кестелер. Дерек жүктелместен бұрын тазаланып, схемаға келтіріледі. SQL жылдам, дерек сапасы жоғары. BI есептері үшін ең қолайлы. Мысалдар: BigQuery, Snowflake, Redshift.</p>
<h3>Data lake</h3>
<p>Файл қоймасы: Parquet, CSV, JSON, суреттер, логтар — қалай келсе, солай сақталады (schema-on-read). Арзан, икемді, ML үшін шикі дерек керек болғанда таптырмайды. Мысалдар: Amazon S3, Google Cloud Storage.</p>
<p>Тәртіп болмаса lake «data swamp»-қа айналады: мыңдаған файл бар, бірақ қайсысы дұрыс екенін ешкім білмейді. Сондықтан lake-те де каталог, атау конвенциясы және бөлу (partitioning) керек: <code>s3://dala/events/dt=2024-03-01/part-000.parquet</code>.</p>
<h3>Lakehouse</h3>
<p>Lake-тің файлдары үстіне кесте қабаты (Delta Lake, Apache Iceberg) қойылады. Сонда lake-тің арзандығы мен икемділігі warehouse-тың мүмкіндіктерімен қосылады: ACID транзакциялар, schema evolution, time travel («кестені өткен аптадағы күйінде оқы»). Мысалдар: Databricks, Iceberg + Trino.</p>
<table>
<tr><th></th><th>Warehouse</th><th>Lake</th><th>Lakehouse</th></tr>
<tr><td>Схема</td><td>Жазуда</td><td>Оқуда</td><td>Кесте қабаты арқылы</td></tr>
<tr><td>Дерек түрі</td><td>Структуралық</td><td>Кез келген</td><td>Кез келген + кестелер</td></tr>
<tr><td>Құны</td><td>Қымбатырақ</td><td>Ең арзан</td><td>Арзан + қабат</td></tr>
<tr><td>Кім қолданады</td><td>BI, analytics</td><td>Data engineer, ML</td><td>Екеуі де</td></tr>
</table>
<h3>Medallion қабаттары</h3>
<p>Тәжірибеде деректі үш қабатқа бөледі: <b>bronze</b> (шикі, өзгертілмеген), <b>silver</b> (тазаланған, типтелген), <b>gold</b> (бизнес кестелері, агрегаттар). Қате болса, bronze-тан қайта есептеуге болады, ал BI тек gold-пен жұмыс істейді.</p>
<div class="tip">Шикі деректі әрқашан сақтап қалыңыз. Тазалау логикасында қате табылса, bronze қабаты болмаса, өткенді қайта есептей алмайсыз.</div>`,
        exercises: [
          { type: 'python', xp: 20, prompt: 'Lake-тегі файл жолы <code>s3://dala/events/dt=2024-03-02/part-000.parquet</code> түрінде. <code>partition_date(path)</code> функциясын жазыңыз: <code>dt=</code> бөлігінен күнді (<code>\'2024-03-02\'</code>) қайтарсын, ал <code>dt=</code> жоқ болса <code>None</code>.', starter: P(String.raw`
paths = [
    's3://dala/events/dt=2024-03-01/part-000.parquet',
    's3://dala/events/dt=2024-03-02/part-000.parquet',
    's3://dala/events/latest/part-000.parquet',
]

def partition_date(path):
    return path.split('/')[-2]

print([partition_date(p) for p in paths])
`), solution: P(String.raw`
paths = [
    's3://dala/events/dt=2024-03-01/part-000.parquet',
    's3://dala/events/dt=2024-03-02/part-000.parquet',
    's3://dala/events/latest/part-000.parquet',
]

def partition_date(path):
    for part in path.split('/'):
        if part.startswith('dt='):
            return part[len('dt='):]
    return None

print([partition_date(p) for p in paths])
`), check: { tests: "assert partition_date('s3://dala/events/dt=2024-03-02/part-000.parquet') == '2024-03-02', \"dt=-тен кейінгі күнді қайтарыңыз\"\nassert partition_date('s3://dala/events/latest/part-000.parquet') is None, 'dt= жоқ болса None'\nassert partition_date('s3://dala/dt=2024-01-01/a/b/c.parquet') == '2024-01-01', 'Бөлік жолдың кез келген жерінде болуы мүмкін'" }, hints: ['<code>for part in path.split(\'/\')</code> және <code>part.startswith(\'dt=\')</code>', 'Күнді алу: <code>part[3:]</code> немесе <code>part.split(\'=\')[1]</code>'] },
          { type: 'quiz', xp: 10, prompt: 'Телеком компаниясы күнде 2 TB шикі network лог жинайды. Болашақта ML үшін керек болуы мүмкін, бірақ бүгін сұраулар жоқ. Қайда сақтау дұрыс?', options: ['Warehouse-қа (BigQuery кестесіне)', 'Data lake-ке (S3/GCS, Parquet, күн бойынша partition)', 'Production PostgreSQL-ге', 'Ешқайда, өшіру'], answer: 1, explain: 'Көп көлемді, схемасы тұрақсыз, қазір сұралмайтын шикі дерек үшін lake арзан және икемді. Керек болғанда сол жерден warehouse-қа жүктеуге болады.' },
          { type: 'quiz', xp: 10, prompt: 'Medallion архитектурасында BI дашбордтары қай қабатқа қосылуы керек?', options: ['Bronze (шикі)', 'Silver (тазаланған)', 'Gold (бизнес кестелері)', 'Тікелей OLTP базаға'], answer: 2, explain: 'Gold қабаты — бизнес логикасы қолданылған, тексерілген кестелер. Bronze пен silver — аралық кезеңдер, олардың құрылымы жиі өзгереді.' }
        ]
      },
      {
        id: 'deng-3', title: 'Star schema: fact және dimension', minutes: 16,
        body: `
<p>Warehouse-та дерек әдетте <b>star schema</b> (жұлдыз схемасы) бойынша ұйымдастырылады: ортада бір <b>fact</b> кестесі, айналасында <b>dimension</b> кестелері.</p>
<h3>Fact кестесі</h3>
<p>Оқиғалар мен өлшемдер: әр жол — бір тапсырыс жолы. Ішінде сандар (<b>measures</b>: <code>qty</code>, <code>amount_tg</code>) және dimension-дарға сілтейтін кілттер (<code>customer_id</code>, <code>product_id</code>, <code>date</code>). Көп жолды, жіңішке.</p>
<h3>Dimension кестелері</h3>
<p>Контекст: кім, не, қайда. <code>dim_customer</code> (аты, қала, сегмент), <code>dim_product</code> (атауы, категория, бағасы), <code>dim_date</code> (күн, апта, ай, мереке ме). Аз жолды, кең.</p>
<pre><code>fact_orders(order_id, order_date, customer_id, product_id, qty)
    → dim_customer(customer_id, customer_name, city, segment)
    → dim_product(product_id, product_name, category, price_tg)</code></pre>
<h3>Неге бөлек</h3>
<p>Қала атауы әр жолда қайталанбайды: ол dim_customer-де бір рет жазылады. Қала атын өзгерту керек болса — бір жол түзетіледі. Сұраулар да оңай оқылады: <code>GROUP BY city</code> деп жазу үшін fact-ты dim-мен қосамыз.</p>
<h3>pandas-пен star schema</h3>
<p>Dataset-терде <code>deng_orders.csv</code> (fact), <code>deng_customers.csv</code> және <code>deng_products.csv</code> (dimensions) бар. Қосу — <code>merge</code> арқылы:</p>
<pre><code>m = orders.merge(customers, on='customer_id').merge(products, on='product_id')
m['revenue'] = m['qty'] * m['price_tg']
by_city = m.groupby('city')['revenue'].sum()</code></pre>
<p>Бұл SQL-дегі <code>JOIN ... GROUP BY</code>-дың дәл баламасы. Snowflake schema деген де вариант бар: онда dimension-дар өз ішінде қосымша кестелерге бөлінеді (<code>dim_product → dim_category</code>). Ол сақтауды аз ғана ұтады, бірақ сұрауды қиындатады, сондықтан BI үшін көбіне star таңдалады.</p>
<div class="tip">Fact кестесінде мәтін қайталамаңыз. 500 млн жолда «Алматы» деген сөз 500 млн рет сақталса, бұл бос шығын. Кілт (id) жеткілікті.</div>`,
        exercises: [
          { type: 'python', xp: 25, prompt: 'Үш кестені қосып, <code>revenue = qty * price_tg</code> бағанын жасаңыз (нәтиже <code>m</code>). Сосын қала бойынша жалпы түсімді <code>by_city</code> айнымалысына жазыңыз (Series, кему ретімен сұрыпталған).', starter: STAR + P(String.raw`
m = orders
by_city = None
print(by_city)
`), solution: STAR + P(String.raw`
m = orders.merge(customers, on='customer_id').merge(products, on='product_id')
m['revenue'] = m['qty'] * m['price_tg']
by_city = m.groupby('city')['revenue'].sum().sort_values(ascending=False)
print(by_city)
`), check: { tests: STARR + "assert 'revenue' in m.columns, \"m-де 'revenue' бағаны болуы керек\"\nassert len(m) == 12, f'Қосудан кейін 12 жол қалуы керек, сізде {len(m)}'\nassert int(m['revenue'].sum()) == 600400, f'Жалпы түсім 600 400 ₸, сізде {int(m[\"revenue\"].sum())}'\nassert by_city is not None and int(by_city.loc['Алматы']) == 337700, 'Алматы бойынша 337 700 ₸ болуы керек'\nassert list(by_city.index) == ['Алматы', 'Астана', 'Шымкент'], 'by_city кему ретімен сұрыпталсын (sort_values(ascending=False))'", mustInclude: ['merge', 'groupby'] }, hints: ['<code>orders.merge(customers, on=\'customer_id\').merge(products, on=\'product_id\')</code>', '<code>m.groupby(\'city\')[\'revenue\'].sum().sort_values(ascending=False)</code>'] },
          { type: 'python', xp: 25, prompt: 'Екі өлшемді есеп: <code>pivot</code> айнымалысына жолдар — <code>segment</code>, бағандар — <code>category</code>, мәндер — <code>revenue</code> қосындысы болатын кесте жасаңыз (<code>pivot_table</code>, бос ұяшықтар 0). Сосын <code>b2b_electronics</code>-ке сәйкес мәнді жазыңыз.', starter: STAR + P(String.raw`
m = orders.merge(customers, on='customer_id').merge(products, on='product_id')
m['revenue'] = m['qty'] * m['price_tg']

pivot = None
b2b_electronics = None
print(pivot)
`), solution: STAR + P(String.raw`
m = orders.merge(customers, on='customer_id').merge(products, on='product_id')
m['revenue'] = m['qty'] * m['price_tg']

pivot = m.pivot_table(index='segment', columns='category', values='revenue',
                      aggfunc='sum', fill_value=0)
b2b_electronics = pivot.loc['b2b', 'electronics']
print(pivot)
`), check: { tests: "assert pivot is not None, 'pivot_table жасаңыз'\nassert list(pivot.index) == ['b2b', 'retail'], \"index = 'segment' болуы керек\"\nassert list(pivot.columns) == ['books', 'electronics', 'home'], \"columns = 'category' болуы керек\"\nassert int(pivot.loc['b2b', 'electronics']) == 337000, f\"b2b/electronics = 337 000 ₸, сізде {int(pivot.loc['b2b', 'electronics'])}\"\nassert int(pivot.loc['b2b', 'books']) == 0, 'Бос ұяшықта 0 болсын (fill_value=0)'\nassert b2b_electronics is not None and int(b2b_electronics) == 337000, 'b2b_electronics = pivot.loc[\"b2b\", \"electronics\"]'", mustInclude: ['pivot_table'] }, hints: ['<code>m.pivot_table(index=\'segment\', columns=\'category\', values=\'revenue\', aggfunc=\'sum\', fill_value=0)</code>', '<code>pivot.loc[\'b2b\', \'electronics\']</code>'] },
          { type: 'quiz', xp: 10, prompt: '<code>fact_orders</code> кестесінде қай баған болмауы керек?', options: ['<code>qty</code>', '<code>customer_id</code>', '<code>customer_city</code> (мәтін, әр жолда қайталанады)', '<code>order_date</code>'], answer: 2, explain: 'Қала — клиенттің қасиеті, оның орны <code>dim_customer</code>. Fact-та тек кілт (<code>customer_id</code>) мен өлшемдер болады.' }
        ]
      },
      {
        id: 'deng-4', title: 'ETL vs ELT', minutes: 15,
        body: `
<p>Дерек көзден warehouse-қа үш қадаммен жетеді: <b>E</b>xtract (алу), <b>T</b>ransform (өңдеу), <b>L</b>oad (жүктеу). Қадамдардың <b>реті</b> екі архитектураны ажыратады.</p>
<h3>ETL — ескі тәртіп</h3>
<p>Дерек бөлек серверде (Python, Informatica, Spark) өңделіп, сосын warehouse-қа дайын күйде жүктеледі. Warehouse-та тек таза дерек жатады. Қымбат warehouse-та есептеу аз. Кемшілігі: шикі дерек сақталмайды, логика өзгерсе қайта есептеу қиын, pipeline «қара жәшік» болып кетеді.</p>
<h3>ELT — қазіргі тәртіп</h3>
<p>Шикі дерек бірден warehouse-қа (немесе lake-ке) құйылады, бүкіл transform SQL арқылы warehouse-тың өз ішінде жүреді. BigQuery мен Snowflake арзандағандықтан бұл тиімді болды.</p>
<ul>
<li>Шикі дерек <code>raw</code> схемасында қалады: логика өзгерсе, қайта есептеу — бір <code>CREATE TABLE AS SELECT</code>.</li>
<li>Transform логикасы SQL-де, Git-те, оны барлық аналитик оқи алады (dbt осылай жұмыс істейді).</li>
<li>Қауіп: warehouse-тың есеп шоты. Әр сұрау сканерленген дерек үшін ақша алады.</li>
</ul>
<h3>Python-дағы кішкентай ETL</h3>
<pre><code>def extract(path):
    return pd.read_csv(path)

def transform(df):
    df = df.copy()
    df['city'] = df['city'].str.strip().str.capitalize()   # ' алматы ' → 'Алматы'
    df = df[df['status'] == 'paid']
    return df.groupby('city', as_index=False)['amount_tg'].sum()

def load(df, target):
    df.to_csv(target, index=False)                         # нақты жобада: to_sql / BigQuery</code></pre>
<p>Үш функцияны бөлек ұстаудың пайдасы — әрқайсысын жеке тестілеуге болады, ал <code>transform</code> таза функция болғандықтан, оны деректер базасы жоқ жерде де тексересіз.</p>
<h3>Idempotency</h3>
<p>Pipeline екі рет жүрсе, нәтиже бірдей болуы керек. Сондықтан <code>INSERT</code> орнына <code>DELETE WHERE dt = '2024-03-02'</code> + <code>INSERT</code> (немесе <code>MERGE</code>) қолданылады. Әйтпесе қайта іске қосу дерегі екі есе болып кетеді.</p>
<div class="tip">«Full refresh» (бәрін қайта есептеу) — кішкентай деректе ең сенімді тәсіл. Incremental жүктеуге дерек шынымен үлкен болғанда ғана көшіңіз: ол күрделі және қателері жасырын.</div>`,
        exercises: [
          { type: 'python', xp: 25, prompt: '<code>deng_raw_sales.csv</code> үшін ETL жазыңыз. <code>extract(path)</code> — CSV оқысын. <code>transform(df)</code>: <code>city</code>-ді тазаласын (артық бос орындарды алып, <code>str.capitalize()</code>), тек <code>status == \'paid\'</code> жолдарды қалдырсын, қала бойынша <code>amount_tg</code> қосындысын есептесін (бағандар: <code>city</code>, <code>amount_tg</code>; <code>city</code> бойынша сұрыпталған, индексі 0-ден). <code>load(df, target)</code> — CSV-ге жазып, жолдар санын қайтарсын.', starter: P(String.raw`
import pandas as pd

def extract(path):
    return None

def transform(df):
    return df

def load(df, target):
    return 0

raw = extract('deng_raw_sales.csv')
clean = transform(raw)
n = load(clean, 'deng_city_totals.csv')
print(clean, n)
`), solution: P(String.raw`
import pandas as pd

def extract(path):
    return pd.read_csv(path)

def transform(df):
    df = df.copy()
    df['city'] = df['city'].str.strip().str.capitalize()
    df = df[df['status'] == 'paid']
    out = df.groupby('city', as_index=False)['amount_tg'].sum()
    return out.sort_values('city').reset_index(drop=True)

def load(df, target):
    df.to_csv(target, index=False)
    return len(df)

raw = extract('deng_raw_sales.csv')
clean = transform(raw)
n = load(clean, 'deng_city_totals.csv')
print(clean, n)
`), check: { tests: "import pandas as _pd, os as _os\n_r = extract('deng_raw_sales.csv')\nassert _r is not None and len(_r) == 10, 'extract 10 жолды оқуы керек'\nassert list(clean.columns) == ['city', 'amount_tg'], f\"Бағандар ['city', 'amount_tg'] болуы керек, сізде {list(clean.columns)}\"\nassert list(clean['city']) == ['Алматы', 'Астана', 'Шымкент'], f'Қалалар тазаланып, 3 болуы керек. Сізде {list(clean[\"city\"])}'\nassert [int(x) for x in clean['amount_tg']] == [264200, 117500, 23400], f'Күтілген сомалар: 264200, 117500, 23400. Сізде {[int(x) for x in clean[\"amount_tg\"]]}'\nassert int(n) == 3, 'load жазылған жолдар санын (3) қайтарсын'\nassert _os.path.exists('deng_city_totals.csv'), 'load нәтижені CSV файлға жазуы керек'\nassert len(_pd.read_csv('deng_city_totals.csv')) == 3, 'Файлда 3 жол болуы керек (index=False)'", mustInclude: ['groupby'] }, hints: ['<code>df[\'city\'].str.strip().str.capitalize()</code> — \' АЛМАТЫ \' → \'Алматы\'', 'Сүзгі: <code>df[df[\'status\'] == \'paid\']</code>, сосын <code>groupby(\'city\', as_index=False)[\'amount_tg\'].sum()</code>'] },
          { type: 'python', xp: 20, prompt: 'Idempotent жүктеу. <code>load_partition(table, rows, dt)</code> функциясын жазыңыз: <code>table</code> (dict тізімі) ішінен <code>dt</code> күніне тиесілі ескі жолдарды өшіріп, сосын <code>rows</code>-ты қоссын, және жаңа <code>table</code>-ды қайтарсын. Pipeline екі рет жүргенде дерек екі есе болмауы керек.', starter: P(String.raw`
table = [
    {'dt': '2024-03-01', 'city': 'Алматы', 'amount': 100},
    {'dt': '2024-03-02', 'city': 'Алматы', 'amount': 200},
]
new_rows = [{'dt': '2024-03-02', 'city': 'Алматы', 'amount': 250},
            {'dt': '2024-03-02', 'city': 'Астана', 'amount': 90}]

def load_partition(table, rows, dt):
    return table + rows

table = load_partition(table, new_rows, '2024-03-02')
table = load_partition(table, new_rows, '2024-03-02')
print(table)
`), solution: P(String.raw`
table = [
    {'dt': '2024-03-01', 'city': 'Алматы', 'amount': 100},
    {'dt': '2024-03-02', 'city': 'Алматы', 'amount': 200},
]
new_rows = [{'dt': '2024-03-02', 'city': 'Алматы', 'amount': 250},
            {'dt': '2024-03-02', 'city': 'Астана', 'amount': 90}]

def load_partition(table, rows, dt):
    kept = [r for r in table if r['dt'] != dt]
    return kept + [dict(r) for r in rows]

table = load_partition(table, new_rows, '2024-03-02')
table = load_partition(table, new_rows, '2024-03-02')
print(table)
`), check: { tests: "assert len(table) == 3, f'Екі рет жүргеннен кейін де 3 жол болуы керек (1 ескі + 2 жаңа), сізде {len(table)}'\nassert sum(1 for r in table if r['dt'] == '2024-03-01') == 1, 'Басқа күннің дерегі сақталуы керек'\nassert sum(1 for r in table if r['dt'] == '2024-03-02') == 2, '2024-03-02 үшін тек жаңа 2 жол қалсын'\n_t = load_partition([{'dt': 'a', 'x': 1}], [{'dt': 'b', 'x': 2}], 'b')\nassert len(_t) == 2, 'Ол күн кестеде жоқ болса, жай қосылады'" }, hints: ['Алдымен сүзгі: <code>[r for r in table if r[\'dt\'] != dt]</code>', 'Сосын жаңа жолдарды қосыңыз'] },
          { type: 'quiz', xp: 10, prompt: 'Команда ELT-ке көшті: шикі дерек BigQuery-ге құйылып, transform SQL-де жүреді. Басты тәуекел қандай?', options: ['Шикі дерек жоғалады', 'Warehouse-тағы есептеу шығыны (сканерленген дерек) бақылаусыз өсуі мүмкін', 'SQL transform жаза алмайсыз', 'Pipeline idempotent болмайды'], answer: 1, explain: 'ELT-те бүкіл есептеу warehouse-та жүреді, ал ол сканерленген дерек үшін ақша алады. Сондықтан partition, инкрементті модельдер және cost мониторингі керек.' }
        ]
      },
      {
        id: 'deng-5', title: 'Batch vs streaming және orchestration', minutes: 16,
        body: `
<p><b>Batch</b> — дерек топтап, белгілі мерзімде өңделеді: түнгі 03:00-де кешегі тапсырыстар. <b>Streaming</b> — әр оқиға келген бойда өңделеді: төлем жасалған секундта fraud моделі тексереді.</p>
<table>
<tr><th></th><th>Batch</th><th>Streaming</th></tr>
<tr><td>Кешігу</td><td>Сағаттар</td><td>Секундтар</td></tr>
<tr><td>Құралдар</td><td>Airflow + SQL / Spark</td><td>Kafka, Flink, Spark Streaming</td></tr>
<tr><td>Қиындығы</td><td>Төмен</td><td>Жоғары (кешіккен оқиғалар, қайталану, state)</td></tr>
<tr><td>Қашан</td><td>Есептер, dashboard, ML үйрету</td><td>Fraud, ұсыныстар, alert</td></tr>
</table>
<p>Ереже қарапайым: <b>кешігу бизнеске шынымен маңызды болмаса, batch таңдаңыз</b>. Streaming инфрақұрылымы бірнеше есе қымбат және күрделі.</p>
<h3>Orchestration: Airflow</h3>
<p>Pipeline-да ондаған қадам бар және олардың реті маңызды: fact кестесін dimension-дардан кейін жүктеу керек. Осыны басқаратын — orchestrator. Ең танымалы — <b>Apache Airflow</b>.</p>
<ul>
<li><b>DAG</b> (directed acyclic graph) — бүкіл pipeline, циклсіз граф.</li>
<li><b>Task</b> — бір қадам (SQL жүргізу, файл көшіру).</li>
<li><b>Dependency</b> — <code>a &gt;&gt; b</code>: b тек a бітсе ғана басталады.</li>
<li><b>Schedule</b> — cron: <code>'0 3 * * *'</code> — күн сайын 03:00.</li>
<li><b>Backfill</b> — өткен күндерді қайта есептеу.</li>
<li><b>Retry</b> — қате болса, қайталап көру.</li>
</ul>
<pre><code>from airflow import DAG
from airflow.operators.python import PythonOperator
import pendulum

with DAG('daily_sales', start_date=pendulum.datetime(2024, 3, 1),
         schedule='0 3 * * *', catchup=True, default_args={'retries': 2}) as dag:
    extract_t = PythonOperator(task_id='extract', python_callable=extract)
    dim_t     = PythonOperator(task_id='load_dims', python_callable=load_dims)
    fact_t    = PythonOperator(task_id='load_fact', python_callable=load_fact)
    report_t  = PythonOperator(task_id='report', python_callable=build_report)

    extract_t >> dim_t >> fact_t >> report_t</code></pre>
<p>DAG-тың «acyclic» бөлігі маңызды: цикл болса (a → b → a), қадамдардың реті анықталмайды және Airflow қате береді.</p>
<div class="tip">Әр task кішкентай және <b>қайта іске қосуға жарамды</b> (idempotent) болсын. Сонда түнде бір қадам құласа, тек оны қайталайсыз, бүкіл pipeline-ды емес.</div>`,
        exercises: [
          { type: 'python', xp: 25, prompt: '<code>DEPS</code> — әр task-тың тәуелділіктері. <code>topo_order(deps)</code> функциясын жазыңыз: тәуелділіктері орындалған task-тарды <b>алфавит ретімен</b> таңдап, орындалу тізімін қайтарсын. Цикл болса (ештеңе таңдалмайтын жағдай), <code>ValueError</code> көтерсін.', starter: P(String.raw`
DEPS = {
    'report': ['load_fact'],
    'load_fact': ['load_dims', 'extract'],
    'load_dims': ['extract'],
    'extract': [],
    'notify': ['report'],
}

def topo_order(deps):
    return list(deps.keys())

print(topo_order(DEPS))
`), solution: P(String.raw`
DEPS = {
    'report': ['load_fact'],
    'load_fact': ['load_dims', 'extract'],
    'load_dims': ['extract'],
    'extract': [],
    'notify': ['report'],
}

def topo_order(deps):
    done = []
    left = set(deps)
    while left:
        ready = sorted(t for t in left if all(d in done for d in deps[t]))
        if not ready:
            raise ValueError('DAG-та цикл бар')
        done.append(ready[0])
        left.remove(ready[0])
    return done

print(topo_order(DEPS))
`), check: { tests: "_o = topo_order(DEPS)\nassert _o == ['extract', 'load_dims', 'load_fact', 'report', 'notify'], f'Күтілген рет: extract, load_dims, load_fact, report, notify. Сізде {_o}'\n_d2 = {'b': ['a'], 'a': [], 'c': ['a'], 'z': []}\nassert topo_order(_d2) == ['a', 'b', 'c', 'z'], 'Дайын task-тар арасынан алфавит ретімен таңдаңыз'\n_ok = False\ntry:\n    topo_order({'a': ['b'], 'b': ['a']})\nexcept ValueError:\n    _ok = True\nassert _ok, 'Цикл болса ValueError көтеріңіз'" }, hints: ['Дайын task: <code>all(d in done for d in deps[t])</code>', 'Әр қадамда <code>sorted(...)</code>-тың бірінші элементін алыңыз; дайын ештеңе жоқ болса — цикл'] },
          { type: 'python', xp: 20, prompt: 'Streaming-тегі қарапайым ереже: 60 секундтық айналмалы терезеде бір картадан 3-тен көп төлем болса, alert. <code>fraud_alerts(events, window=60, limit=3)</code> — alert тудырған <code>event_id</code>-лердің тізімін қайтарсын (оқиғалар уақыт бойынша сұрыпталған).', starter: P(String.raw`
events = [
    {'event_id': 1, 'card': 'A', 't': 0},
    {'event_id': 2, 'card': 'A', 't': 10},
    {'event_id': 3, 'card': 'B', 't': 15},
    {'event_id': 4, 'card': 'A', 't': 20},
    {'event_id': 5, 'card': 'A', 't': 50},
    {'event_id': 6, 'card': 'A', 't': 200},
]

def fraud_alerts(events, window=60, limit=3):
    return []

print(fraud_alerts(events))
`), solution: P(String.raw`
events = [
    {'event_id': 1, 'card': 'A', 't': 0},
    {'event_id': 2, 'card': 'A', 't': 10},
    {'event_id': 3, 'card': 'B', 't': 15},
    {'event_id': 4, 'card': 'A', 't': 20},
    {'event_id': 5, 'card': 'A', 't': 50},
    {'event_id': 6, 'card': 'A', 't': 200},
]

def fraud_alerts(events, window=60, limit=3):
    alerts = []
    for e in events:
        recent = [x for x in events
                  if x['card'] == e['card'] and e['t'] - window < x['t'] <= e['t']]
        if len(recent) > limit:
            alerts.append(e['event_id'])
    return alerts

print(fraud_alerts(events))
`), check: { tests: "_a = fraud_alerts(events)\nassert _a == [5], f'Тек 5-оқиғада A картасының терезеде 4 төлемі болады. Сізде {_a}'\nassert fraud_alerts(events, limit=2) == [4, 5], 'limit=2 болса 4 пен 5 alert береді'\nassert fraud_alerts(events, window=15) == [], 'Терезе кіші болса, alert жоқ'" }, hints: ['Әр оқиға үшін сол картаның терезедегі оқиғаларын санаңыз', 'Терезе шарты: <code>e[\'t\'] - window &lt; x[\'t\'] &lt;= e[\'t\']</code>'] },
          { type: 'quiz', xp: 10, prompt: 'Маркетинг бөліміне кешегі сатудың есебі керек, ертеңгі 09:00-ге дейін дайын болса жетеді. Қандай архитектура дұрыс?', options: ['Kafka + Flink streaming pipeline', 'Airflow-дағы түнгі batch job', 'Production базада тікелей сұрау', 'Қолмен Excel-ге көшіру'], answer: 1, explain: 'Кешігу талабы — сағаттар, демек batch жеткілікті: арзан, қарапайым, қайта іске қосуға оңай.' },
          { type: 'quiz', xp: 10, prompt: 'Airflow DAG-ында <code>a &gt;&gt; b</code> және <code>b &gt;&gt; a</code> деп жазылса, не болады?', options: ['Екеуі параллель жүреді', 'Цикл пайда болады, Airflow қате береді', 'a екі рет жүреді', 'DAG екі есе жылдам бітеді'], answer: 1, explain: 'DAG — acyclic граф. Цикл болса реті анықталмайды, сондықтан Airflow оны қабылдамайды.' }
        ]
      },
      {
        id: 'deng-6', title: 'dbt идеясы: SQL модельдер және тестілер', minutes: 14,
        body: `
<p><b>dbt</b> (data build tool) — ELT-тің «T» бөлігін тәртіпке келтіретін құрал. Негізгі идея: <b>әр кесте — бір SQL файл</b>, ал файлдар Git-те жатады.</p>
<h3>Model</h3>
<p><code>models/gold/city_revenue.sql</code> файлы: тек <code>SELECT</code>. <code>CREATE TABLE</code> жазудың қажеті жоқ — dbt оны өзі орап қояды.</p>
<pre><code>-- models/silver/paid_orders.sql
select
    order_id,
    cast(order_date as date) as order_date,
    initcap(trim(city))      as city,
    amount_tg
from {{ source('raw', 'sales') }}
where status = 'paid'</code></pre>
<pre><code>-- models/gold/city_revenue.sql
select city, sum(amount_tg) as revenue_tg, count(*) as orders
from {{ ref('paid_orders') }}
group by city</code></pre>
<p><code>ref()</code> — dbt-тің жүрегі. Ол модельдердің арасындағы тәуелділікті көрсетеді, сондықтан dbt DAG-ты өзі құрып, кестелерді дұрыс ретпен жасайды. Бір модельдің атын өзгертсеңіз, SQL-де бір жерде түзетесіз.</p>
<h3>Tests</h3>
<p>dbt-те дерек тестілері YAML-де жазылады және әр жүгіруде тексеріледі:</p>
<pre><code># models/gold/schema.yml
models:
  - name: city_revenue
    columns:
      - name: city
        tests: [not_null, unique]
      - name: revenue_tg
        tests:
          - dbt_utils.accepted_range: {min_value: 0}</code></pre>
<p>Негізгі дайын тестілер: <code>not_null</code>, <code>unique</code>, <code>accepted_values</code>, <code>relationships</code> (fact-тағы кілт dimension-да бар ма). Бұл CI-дағы data тестілердің дәл өзі, тек декларативті жазылған.</p>
<h3>Тағы екі пайда</h3>
<ul>
<li><b>Documentation</b>: <code>dbt docs generate</code> модельдердің графын және бағандардың сипаттамасын сайт ретінде шығарады.</li>
<li><b>Materialization</b>: бір жолмен модельді <code>view</code>, <code>table</code> немесе <code>incremental</code> етіп өзгертуге болады.</li>
</ul>
<div class="tip">dbt-тің ең үлкен пайдасы — техникалық емес: SQL логикасы Git-ке, code review-ге және тестілерге түседі. «Бұл есеп неден есептелді?» деген сұраққа жауап бір файлда тұрады.</div>`,
        exercises: [
          { type: 'python', xp: 25, prompt: 'dbt-тің үш тестін pandas-пен жазыңыз: <code>test_not_null(df, col)</code>, <code>test_unique(df, col)</code>, <code>test_accepted_values(df, col, values)</code>. Әрқайсысы сәтті болса <code>True</code>, болмаса <code>False</code> қайтарсын. Сосын <code>failures</code> тізіміне <code>model</code> кестесінде құлаған тестілердің атын (<code>\'not_null\'</code>, <code>\'unique\'</code>, <code>\'accepted_values\'</code> ретімен) жазыңыз.', starter: P(String.raw`
import pandas as pd
model = pd.DataFrame({
    'city': ['Алматы', 'Астана', 'Алматы', None],
    'segment': ['retail', 'b2b', 'retail', 'vip'],
})

def test_not_null(df, col):
    return True

def test_unique(df, col):
    return True

def test_accepted_values(df, col, values):
    return True

failures = []
print(failures)
`), solution: P(String.raw`
import pandas as pd
model = pd.DataFrame({
    'city': ['Алматы', 'Астана', 'Алматы', None],
    'segment': ['retail', 'b2b', 'retail', 'vip'],
})

def test_not_null(df, col):
    return bool(df[col].notna().all())

def test_unique(df, col):
    return bool(df[col].dropna().duplicated().sum() == 0)

def test_accepted_values(df, col, values):
    return bool(df[col].isin(values).all())

failures = []
if not test_not_null(model, 'city'):
    failures.append('not_null')
if not test_unique(model, 'city'):
    failures.append('unique')
if not test_accepted_values(model, 'segment', ['retail', 'b2b']):
    failures.append('accepted_values')
print(failures)
`), check: { tests: "_good = pd.DataFrame({'city': ['Алматы', 'Астана'], 'segment': ['retail', 'b2b']})\nassert test_not_null(_good, 'city') is True or test_not_null(_good, 'city') == True, 'Бос мән жоқ болса True'\nassert not test_not_null(model, 'city'), 'city-де None бар, демек not_null құлайды'\nassert test_unique(_good, 'city'), 'Қайталанбаса True'\nassert not test_unique(model, 'city'), \"'Алматы' екі рет кездеседі, unique құлайды\"\nassert test_accepted_values(_good, 'segment', ['retail', 'b2b']), 'Барлық мән рұқсат етілген тізімде'\nassert not test_accepted_values(model, 'segment', ['retail', 'b2b']), \"'vip' тізімде жоқ, тест құлауы керек\"\nassert failures == ['not_null', 'unique', 'accepted_values'], f'Үш тест те құлайды. Сізде {failures}'" }, hints: ['<code>df[col].notna().all()</code>, <code>df[col].dropna().duplicated().sum() == 0</code>, <code>df[col].isin(values).all()</code>', 'Әр тестті <code>if not ...: failures.append(...)</code> арқылы тексеріңіз'] },
          { type: 'python', xp: 20, prompt: 'dbt-тің <code>relationships</code> тестінің баламасы: <code>orphan_keys(fact, dim, key)</code> — fact-та бар, бірақ dimension-да жоқ кілттердің сұрыпталған тізімін қайтарсын.', starter: P(String.raw`
import pandas as pd
fact = pd.DataFrame({'order_id': [1, 2, 3, 4, 5], 'customer_id': [1, 2, 9, 3, 7]})
dim = pd.DataFrame({'customer_id': [1, 2, 3, 4], 'city': ['Алматы', 'Астана', 'Алматы', 'Шымкент']})

def orphan_keys(fact, dim, key):
    return []

orphans = orphan_keys(fact, dim, 'customer_id')
print(orphans)
`), solution: P(String.raw`
import pandas as pd
fact = pd.DataFrame({'order_id': [1, 2, 3, 4, 5], 'customer_id': [1, 2, 9, 3, 7]})
dim = pd.DataFrame({'customer_id': [1, 2, 3, 4], 'city': ['Алматы', 'Астана', 'Алматы', 'Шымкент']})

def orphan_keys(fact, dim, key):
    missing = ~fact[key].isin(dim[key])
    return sorted(fact.loc[missing, key].unique().tolist())

orphans = orphan_keys(fact, dim, 'customer_id')
print(orphans)
`), check: { tests: "assert [int(x) for x in orphans] == [7, 9], f'dimension-да жоқ кілттер: 7 және 9. Сізде {orphans}'\n_f2 = pd.DataFrame({'customer_id': [1, 2]})\nassert orphan_keys(_f2, dim, 'customer_id') == [], 'Барлық кілт бар болса, бос тізім'\n_f3 = pd.DataFrame({'customer_id': [9, 9, 8]})\nassert [int(x) for x in orphan_keys(_f3, dim, 'customer_id')] == [8, 9], 'Қайталанбайтын, сұрыпталған тізім қайтарыңыз'", mustInclude: ['isin'] }, hints: ['<code>~fact[key].isin(dim[key])</code>', '<code>sorted(fact.loc[mask, key].unique().tolist())</code>'] },
          { type: 'quiz', xp: 10, prompt: 'dbt-те <code>{{ ref(\'paid_orders\') }}</code> деп жазудың кесте атын қолмен жазудан артықшылығы қандай?', options: ['SQL жылдам жүреді', 'dbt тәуелділік графын өзі құрады және модельдерді дұрыс ретпен жасайды', 'Кесте автоматты сығылады', 'Тестілер керек емес болады'], answer: 1, explain: '<code>ref()</code> модельдер арасындағы байланысты жариялайды. Осыдан dbt DAG құрады, орындау ретін анықтайды және құжаттаманы жасайды.' }
        ]
      },
      {
        id: 'deng-7', title: 'Spark: дерек жадқа сыймағанда', minutes: 15,
        body: `
<p>pandas бір компьютердің <b>жадында</b> (RAM) жұмыс істейді. 16 GB RAM-да шамамен 2–5 GB CSV-ды өңдеуге болады (pandas деректі жадта 2–5 есе кеңейтеді). 500 GB дерек келгенде екі жол бар: деректі бөліп-бөліп оқу немесе <b>Apache Spark</b> сияқты кластерлік қозғалтқыш қолдану.</p>
<h3>Spark-тың моделі</h3>
<ul>
<li>Дерек <b>partition</b>-дарға бөлінеді, әр partition-ды кластердің бір worker-і өңдейді.</li>
<li><b>Transformations</b> (<code>filter</code>, <code>groupBy</code>, <code>join</code>) — <b>lazy</b>: бірден есептелмейді, жоспар құрылады.</li>
<li><b>Action</b> (<code>count()</code>, <code>collect()</code>, <code>write</code>) — нақты есептеуді іске қосады.</li>
<li>Оптимизатор (Catalyst) жоспарды қайта құрып, керексіз бағандарды оқымайды.</li>
</ul>
<pre><code>from pyspark.sql import functions as F
df = spark.read.parquet('s3://dala/events/')     # lazy
daily = (df.filter(F.col('status') == 'paid')
           .groupBy('city')
           .agg(F.sum('amount_tg').alias('revenue')))
daily.write.mode('overwrite').parquet('s3://dala/gold/city_revenue/')   # action</code></pre>
<p>Жазылуы pandas-қа ұқсас, бірақ астында жүздеген машина жұмыс істеуі мүмкін. Көп жағдайда дәл сол логиканы SQL-де де жазуға болады: <code>spark.sql('select city, sum(amount_tg) ... group by city')</code>.</p>
<h3>pandas-тағы chunked groupby — сол идея</h3>
<p>Spark-тың groupBy-ы мәні бойынша <b>map → combine</b>: әр partition өз ішінде жинақтайды, сосын жартылай нәтижелер қосылады. Мұны pandas-та <code>chunksize</code>-пен қайталауға болады:</p>
<pre><code>totals = {}
for chunk in pd.read_csv('big.csv', chunksize=100_000):
    part = chunk.groupby('city')['amount_tg'].sum()
    for city, v in part.items():
        totals[city] = totals.get(city, 0) + v</code></pre>
<p>Бұл тәсіл <code>sum</code>, <code>count</code>, <code>min</code>, <code>max</code> үшін жұмыс істейді, себебі олар бөліктеп есептелуге жарайды. Ал <b>median</b> жарамайды: бөліктердің медианаларының орташасы жалпы медиана емес. Орташа (<code>mean</code>) үшін сома мен санды бөлек жинап, соңында бөлу керек.</p>
<div class="tip">Spark-қа асықпаңыз. Кластер қымбат және күрделі. Алдымен: керек бағандарды ғана оқу (<code>usecols</code>), Parquet-ке көшу, типтерді кішірейту (<code>float32</code>, <code>category</code>), <code>chunksize</code>, DuckDB. Көп «үлкен дерек» мәселесі осы қадамдардан кейін жоғалады.</div>`,
        exercises: [
          { type: 'python', xp: 25, prompt: 'Spark-тың map→combine логикасын қайталаңыз: <code>deng_raw_sales.csv</code>-ты <code>chunksize=3</code>-пен оқып, қала бойынша <code>amount_tg</code> қосындысын <code>totals</code> dict-іне жинаңыз (барлық статустар, қаланы <code>.str.strip().str.capitalize()</code> арқылы тазалаңыз). Сосын <code>n_chunks</code> — өңделген бөліктер саны.', starter: P(String.raw`
import pandas as pd

totals = {}
n_chunks = 0
# deng_raw_sales.csv файлын chunksize=3-пен оқыңыз
print(totals, n_chunks)
`), solution: P(String.raw`
import pandas as pd

totals = {}
n_chunks = 0
for chunk in pd.read_csv('deng_raw_sales.csv', chunksize=3):
    n_chunks += 1
    chunk = chunk.copy()
    chunk['city'] = chunk['city'].str.strip().str.capitalize()
    part = chunk.groupby('city')['amount_tg'].sum()
    for city, v in part.items():
        totals[city] = totals.get(city, 0) + int(v)
print(totals, n_chunks)
`), check: { tests: "assert n_chunks == 4, f'10 жол, chunksize=3 → 4 бөлік. Сізде {n_chunks}'\nassert sorted(totals) == ['Алматы', 'Астана', 'Шымкент'], f'Үш қала болуы керек (тазаланған атаулар). Сізде {sorted(totals)}'\nassert int(totals['Алматы']) == 277700, f\"Алматы = 277 700 ₸ (барлық статус), сізде {totals['Алматы']}\"\nassert int(totals['Астана']) == 239300 and int(totals['Шымкент']) == 23400, 'Астана = 239 300 ₸, Шымкент = 23 400 ₸'\nassert sum(int(v) for v in totals.values()) == 540400, 'Барлық сома 540 400 ₸'", mustInclude: ['chunksize'] }, hints: ['<code>for chunk in pd.read_csv(\'deng_raw_sales.csv\', chunksize=3):</code>', 'Жинақтау: <code>totals[city] = totals.get(city, 0) + v</code>'] },
          { type: 'python', xp: 25, prompt: 'Бөліктеп орташа есептеу. <code>chunked_mean(path, col, chunksize)</code> функциясын жазыңыз: бөліктердің орташасын орташаламай, <b>сома мен санды</b> жинап, соңында бөлсін. <code>deng_raw_sales.csv</code>-тағы <code>amount_tg</code>-ның орташасын <code>avg</code>-ға жазыңыз.', starter: P(String.raw`
import pandas as pd

def chunked_mean(path, col, chunksize):
    means = []
    for chunk in pd.read_csv(path, chunksize=chunksize):
        means.append(chunk[col].mean())
    return sum(means) / len(means)

avg = chunked_mean('deng_raw_sales.csv', 'amount_tg', 3)
print(avg)
`), solution: P(String.raw`
import pandas as pd

def chunked_mean(path, col, chunksize):
    total = 0.0
    n = 0
    for chunk in pd.read_csv(path, chunksize=chunksize):
        total += float(chunk[col].sum())
        n += int(chunk[col].count())
    return total / n

avg = chunked_mean('deng_raw_sales.csv', 'amount_tg', 3)
print(avg)
`), check: { tests: "import pandas as _pd\n_true = float(_pd.read_csv('deng_raw_sales.csv')['amount_tg'].mean())\nassert abs(float(avg) - _true) < 1e-6, f'Дұрыс орташа = {_true:.1f}. Бөліктердің орташасын орташаласаңыз, қате шығады (соңғы бөлікте 1 жол бар)'\nassert abs(chunked_mean('deng_raw_sales.csv', 'amount_tg', 100) - _true) < 1e-6, 'Бір бөлікте де дұрыс жұмыс істеуі керек'\nassert abs(chunked_mean('deng_raw_sales.csv', 'amount_tg', 2) - _true) < 1e-6, 'chunksize нәтижеге әсер етпеуі керек'" }, hints: ['Сома мен санды жинаңыз: <code>total += chunk[col].sum()</code>, <code>n += chunk[col].count()</code>', 'Соңында <code>return total / n</code>'] },
          { type: 'quiz', xp: 10, prompt: 'Қай агрегацияны бөліктеп (chunk-пен) дұрыс есептеу <b>мүмкін емес</b>?', options: ['sum', 'count', 'max', 'median'], answer: 3, explain: 'Медиана барлық мәндердің ретін білуді талап етеді; бөліктердің медианаларынан жалпы медиана шықпайды. sum, count, max — қосылатын (associative) агрегаттар.' },
          { type: 'quiz', xp: 10, prompt: 'Spark-та <code>df.filter(...).groupBy(...).agg(...)</code> жазылды, бірақ ешқандай есептеу басталмады. Неге?', options: ['Кодта қате бар', 'Бұл transformations, олар lazy: action (count, write, collect) керек', 'Кластер өшіп қалған', 'Spark тек SQL қабылдайды'], answer: 1, explain: 'Spark transformations-тан жоспар құрады және оны тек action шақырылғанда орындайды. Бұл оптимизаторға артық жұмысты тастауға мүмкіндік береді.' }
        ]
      },
      {
        id: 'deng-8', title: 'Cloud сервистер және cost awareness', minutes: 15,
        body: `
<p>Үлкен дерек инфрақұрылымы әдетте cloud-та тұрады. Үш провайдердің сервистері бір-біріне сәйкес келеді:</p>
<table>
<tr><th>Қызметі</th><th>AWS</th><th>Google Cloud</th><th>Azure</th></tr>
<tr><td>Файл қоймасы (lake)</td><td>S3</td><td>GCS</td><td>Blob Storage</td></tr>
<tr><td>Warehouse</td><td>Redshift</td><td>BigQuery</td><td>Synapse</td></tr>
<tr><td>Виртуалды машина</td><td>EC2</td><td>Compute Engine</td><td>VM</td></tr>
<tr><td>Serverless функция</td><td>Lambda</td><td>Cloud Functions</td><td>Functions</td></tr>
<tr><td>Managed Spark</td><td>EMR</td><td>Dataproc</td><td>HDInsight</td></tr>
</table>
<p><b>Snowflake</b> — бөлек компания, үш cloud-тың бәрінде жұмыс істейді. Оның ерекшелігі: сақтау мен есептеу толық бөлінген, әр команда өз «warehouse»-ын (есептеу кластерін) алады.</p>
<h3>Нарықтың екі баға моделі</h3>
<ul>
<li><b>Сканерленген дерек бойынша</b> (BigQuery on-demand): сұрау қанша байт оқыса, сонша ақша. <code>SELECT *</code> — ең қымбат әдет.</li>
<li><b>Жұмыс уақыты бойынша</b> (Snowflake, Redshift, Databricks): кластер қанша минут қосулы тұрса, сонша ақша. Ұмыт қалған кластер түнде де ақша жейді.</li>
</ul>
<h3>Cost awareness: нақты әдеттер</h3>
<ol>
<li><b>Керек бағандарды ғана сұраңыз.</b> Columnar қоймада <code>SELECT *</code> барлық бағанды оқиды.</li>
<li><b>Partition сүзгісін қойыңыз</b>: <code>WHERE dt &gt;= '2024-03-01'</code>. Партицияланған кестеде бұл сканерді 100 есе азайтады.</li>
<li><b>Dashboard-ты кэштеңіз немесе агрегат кесте жасаңыз.</b> Әр ашылғанда 2 TB сканерлейтін дашборд — айлық бюджеттің негізгі шығыны.</li>
<li><b>Parquet қолданыңыз</b>: CSV-мен салыстырғанда 5–10 есе кіші және бағандап оқылады.</li>
<li><b>Dev ортада <code>LIMIT</code> немесе sample.</b> Логиканы 1% деректе тексеріп, сосын толық жүргізіңіз (бірақ есіңізде болсын: <code>LIMIT</code> BigQuery-де сканерді азайтпайды, партиция сүзгісі азайтады).</li>
<li><b>Lifecycle policy</b>: lake-тегі ескі файлдарды арзан архивке (Glacier / Coldline) көшіру.</li>
<li><b>Budget alert</b> қосыңыз: айлық шек асса, хат келеді.</li>
</ol>
<h3>Есептеп көрейік</h3>
<p>BigQuery on-demand бағасы — сканерленген 1 TB үшін шамамен $6.25. Дашборд әр ашылғанда 2 TB сканерлейді, күніне 40 рет ашылады: 80 TB × $6.25 = $500 күніне, айына $15 000. Ал күнде бір рет 2 TB-дан агрегат кесте (1 GB) жасап, дашбордты оған қоссаңыз: сканер күніне ~2 TB + 40 GB, айлық шот $400-ға жетеді. Бір архитектуралық шешім — 97% экономия.</p>
<div class="tip">Data engineer-дің сұхбатында «cost» туралы сұрақ жиі қойылады. Жауапта екі нәрсені айтыңыз: партиция/баған сүзгісі және агрегат қабаты (gold кестелері).</div>`,
        exercises: [
          { type: 'python', xp: 25, prompt: 'BigQuery-дің on-demand шотын есептейтін <code>scan_cost(gb, price_per_tb=6.25)</code> функциясын жазыңыз (1 TB = 1024 GB). Сосын: <code>cost_now</code> — дашборд күніне 40 рет × 2048 GB сканерлегендегі <b>айлық</b> (30 күн) шоты; <code>cost_agg</code> — агрегат кестемен (күніне бір рет 2048 GB + 40 рет 1 GB) айлық шоты.', starter: P(String.raw`
def scan_cost(gb, price_per_tb=6.25):
    return 0.0

cost_now = None
cost_agg = None
print(cost_now, cost_agg)
`), solution: P(String.raw`
def scan_cost(gb, price_per_tb=6.25):
    return gb / 1024 * price_per_tb

cost_now = scan_cost(2048 * 40) * 30
cost_agg = (scan_cost(2048) + scan_cost(1) * 40) * 30
print(cost_now, cost_agg)
`), check: { tests: "assert abs(scan_cost(1024) - 6.25) < 1e-9, '1 TB = 1024 GB → $6.25'\nassert abs(scan_cost(512) - 3.125) < 1e-9, 'Жарты TB → $3.125'\nassert cost_now is not None and abs(float(cost_now) - 15000.0) < 1.0, f'cost_now ≈ $15 000 болуы керек, сізде {cost_now}'\nassert cost_agg is not None and abs(float(cost_agg) - 382.81) < 2.0, f'cost_agg ≈ $383 болуы керек (күніне 2048 GB + 40 GB), сізде {cost_agg}'\nassert float(cost_now) / float(cost_agg) > 30, 'Агрегат қабаты шотты 30 есеге жуық азайтады'" }, hints: ['<code>gb / 1024 * price_per_tb</code>', 'Айлық: күнделікті шотты 30-ға көбейтіңіз'] },
          { type: 'python', xp: 20, prompt: 'Сұраудың «арзандығын» тексеретін <code>review_query(sql)</code> жазыңыз. Ол ескертулердің тізімін қайтарсын (осы ретпен): <code>select *</code> болса <code>\'select_star\'</code>; <code>where</code> мүлде жоқ болса <code>\'no_filter\'</code>; <code>where</code> бар, бірақ ішінде <code>dt</code> жоқ болса <code>\'no_partition_filter\'</code>. Регистрге тәуелсіз болсын.', starter: P(String.raw`
def review_query(sql):
    warnings = []
    return warnings

print(review_query('SELECT * FROM events'))
`), solution: P(String.raw`
def review_query(sql):
    s = sql.lower()
    warnings = []
    if 'select *' in s:
        warnings.append('select_star')
    if 'where' not in s:
        warnings.append('no_filter')
    elif 'dt' not in s:
        warnings.append('no_partition_filter')
    return warnings

print(review_query('SELECT * FROM events'))
`), check: { tests: "assert review_query('SELECT * FROM events') == ['select_star', 'no_filter'], \"'SELECT * FROM events' → ['select_star', 'no_filter']\"\nassert review_query(\"select city, amount from events where dt >= '2024-03-01'\") == [], 'Жақсы сұрауда ескерту жоқ'\nassert review_query(\"SELECT city FROM events WHERE status = 'paid'\") == ['no_partition_filter'], 'where бар, бірақ dt сүзгісі жоқ'\nassert review_query(\"select * from events where dt = '2024-03-01'\") == ['select_star'], 'Тек select_star'\nassert review_query('SELECT * FROM EVENTS') == ['select_star', 'no_filter'], 'Регистрге тәуелсіз болуы керек (.lower())'" }, hints: ['Алдымен <code>s = sql.lower()</code>', '<code>if \'where\' not in s: ... elif \'dt\' not in s: ...</code>'] },
          { type: 'number', xp: 10, prompt: 'Кесте күн бойынша партицияланған, барлығы 365 күн және 730 GB. Сұрау <code>WHERE dt &gt;= </code> арқылы тек 7 күнді сұрады және екі бағанды (жалпы бағандардың 10%-ы) оқыды. Қанша GB сканерленеді?', answer: 1.4, tol: 0.05, unit: 'GB', explain: '730 GB / 365 × 7 = 14 GB — партиция сүзгісінен кейін. Оның 10%-ы (екі баған) = 1.4 GB.' },
          { type: 'quiz', xp: 10, prompt: 'Snowflake-те айлық шот күтпеген жерден екі есе өсті, сұраулар саны өзгермеген. Ең ықтимал себеп?', options: ['Дерек Parquet форматында сақталған', 'Есептеу кластері (warehouse) auto-suspend жоқ және тоқтамай қосулы тұрған', 'Кестеде баған көп', 'SQL-де JOIN қолданылған'], answer: 1, explain: 'Snowflake-те ақы кластердің қосулы уақытына төленеді. Auto-suspend қосылмаса, бос тұрған warehouse та ақша жейді.' }
        ]
      },
      {
        id: 'deng-gate', gate: true, title: 'Модуль емтиханы: Cloud & Data Eng Basics', minutes: 30,
        body: `
<p>Қорытынды тексеріс: star schema, ETL, DAG, dbt тестілері және cost. Кеңестер жоқ. Өту шегі — 75%.</p>`,
        exercises: [
          { type: 'python', xp: 35, prompt: 'Star schema-дан gold кесте жасаңыз: <code>deng_orders.csv</code>, <code>deng_customers.csv</code>, <code>deng_products.csv</code>-ты қосып, <code>revenue = qty * price_tg</code> есептеп, <code>gold</code> DataFrame-ін жасаңыз. Бағандары: <code>city</code>, <code>category</code>, <code>revenue_tg</code> (қосынды), <code>orders</code> (тапсырыс саны). <code>city</code>, сосын <code>category</code> бойынша сұрыпталған, индексі 0-ден.', starter: STAR + P(String.raw`
gold = None
print(gold)
`), solution: STAR + P(String.raw`
m = orders.merge(customers, on='customer_id').merge(products, on='product_id')
m['revenue'] = m['qty'] * m['price_tg']
gold = (m.groupby(['city', 'category'])
         .agg(revenue_tg=('revenue', 'sum'), orders=('order_id', 'count'))
         .reset_index()
         .sort_values(['city', 'category'])
         .reset_index(drop=True))
print(gold)
`), check: { tests: "assert gold is not None, 'gold DataFrame жасаңыз'\nassert list(gold.columns) == ['city', 'category', 'revenue_tg', 'orders'], f\"Бағандар: city, category, revenue_tg, orders. Сізде {list(gold.columns)}\"\nassert len(gold) == 8, f'Қала × категория комбинациялары — 8 жол, сізде {len(gold)}'\nassert list(gold['city'])[0] == 'Алматы' and list(gold['category'])[0] == 'books', 'city, сосын category бойынша сұрыптаңыз'\n_r = gold[(gold['city'] == 'Алматы') & (gold['category'] == 'electronics')]\nassert int(_r['revenue_tg'].iloc[0]) == 296300, f\"Алматы/electronics = 296 300 ₸, сізде {int(_r['revenue_tg'].iloc[0])}\"\nassert int(_r['orders'].iloc[0]) == 3, 'Алматы/electronics бойынша 3 тапсырыс'\nassert int(gold['revenue_tg'].sum()) == 600400 and int(gold['orders'].sum()) == 12, 'Жалпы: 600 400 ₸ және 12 тапсырыс'" } },
          { type: 'python', xp: 35, prompt: 'Толық ETL: <code>run_etl(path)</code> функциясы <code>deng_raw_sales.csv</code>-ты оқып, <code>city</code>-ді тазалап, <code>cancelled</code> статусын алып тастап (<code>paid</code> және <code>pending</code> қалады), қала бойынша <code>revenue_tg</code> (қосынды) мен <code>orders</code> (сан) есептеп, <code>city</code> бойынша сұрыпталған DataFrame қайтарсын (бағандар: <code>city</code>, <code>revenue_tg</code>, <code>orders</code>; индексі 0-ден).', starter: P(String.raw`
import pandas as pd

def run_etl(path):
    return pd.read_csv(path)

result = run_etl('deng_raw_sales.csv')
print(result)
`), solution: P(String.raw`
import pandas as pd

def run_etl(path):
    df = pd.read_csv(path)
    df['city'] = df['city'].str.strip().str.capitalize()
    df = df[df['status'] != 'cancelled']
    out = (df.groupby('city')
             .agg(revenue_tg=('amount_tg', 'sum'), orders=('order_id', 'count'))
             .reset_index()
             .sort_values('city')
             .reset_index(drop=True))
    return out

result = run_etl('deng_raw_sales.csv')
print(result)
`), check: { tests: "assert list(result.columns) == ['city', 'revenue_tg', 'orders'], f\"Бағандар: city, revenue_tg, orders. Сізде {list(result.columns)}\"\nassert list(result['city']) == ['Алматы', 'Астана', 'Шымкент'], f'Тазаланған үш қала күтілген, сізде {list(result[\"city\"])}'\nassert [int(x) for x in result['revenue_tg']] == [264200, 201500, 23400], f'Күтілген: 264200, 201500 (pending қосылады), 23400. Сізде {[int(x) for x in result[\"revenue_tg\"]]}'\nassert [int(x) for x in result['orders']] == [4, 2, 2], f'Тапсырыс саны: 4, 2, 2. Сізде {[int(x) for x in result[\"orders\"]]}'\nassert list(result.index) == [0, 1, 2], 'Индексті қалпына келтіріңіз (reset_index(drop=True))'" } },
          { type: 'python', xp: 35, prompt: 'DAG-ты тексеретін <code>validate_dag(deps)</code> жазыңыз: қателер тізімін қайтарсын (осы ретпен). (1) <code>deps</code>-те жоқ task-қа сілтеме болса, әр сілтеме үшін <code>\'unknown:&lt;ат&gt;\'</code> (task-тар dict ретімен, тәуелділіктер тізім ретімен); (2) граф циклді болса <code>\'cycle\'</code>. Қатесіз болса бос тізім.', starter: P(String.raw`
def validate_dag(deps):
    errors = []
    return errors

print(validate_dag({'b': ['a'], 'a': []}))
`), solution: P(String.raw`
def validate_dag(deps):
    errors = []
    for t, ds in deps.items():
        for d in ds:
            if d not in deps:
                errors.append(f'unknown:{d}')
    done = set()
    left = set(deps)
    while left:
        ready = [t for t in left if all(d in done or d not in deps for d in deps[t])]
        if not ready:
            errors.append('cycle')
            break
        for t in ready:
            done.add(t)
            left.discard(t)
    return errors

print(validate_dag({'b': ['a'], 'a': []}))
`), check: { tests: "assert validate_dag({'b': ['a'], 'a': []}) == [], 'Дұрыс DAG-та қате жоқ'\nassert validate_dag({'a': ['x'], 'b': ['a', 'y']}) == ['unknown:x', 'unknown:y'], \"Белгісіз тәуелділіктер ретімен: ['unknown:x', 'unknown:y']\"\nassert validate_dag({'a': ['b'], 'b': ['a']}) == ['cycle'], 'Цикл табылуы керек'\n_v = validate_dag({'a': ['b'], 'b': ['a'], 'c': ['zz']})\nassert _v == ['unknown:zz', 'cycle'], f\"Екі қате де, unknown алдында: сізде {_v}\"\nassert validate_dag({'r': ['f'], 'f': ['d', 'e'], 'd': ['e'], 'e': []}) == [], 'Көп деңгейлі дұрыс DAG'" } },
          { type: 'quiz', xp: 30, prompt: 'Дашборд әр ашылғанда BigQuery-де 3 TB сканерлейді. Шотты азайтудың ең әсерлі жолы қандай?', options: ['Дашбордтың түсін өзгерту', 'Күнде бір рет агрегат (gold) кесте есептеп, дашбордты оған қосу', '<code>SELECT *</code> орнына <code>SELECT * FROM ... LIMIT 1000</code> жазу', 'Кестені CSV форматына көшіру'], answer: 1, explain: 'Агрегат қабаты сканерленетін көлемді мыңдаған есе азайтады. <code>LIMIT</code> BigQuery-де сканерді азайтпайды, ал CSV — columnar Parquet-тен қымбат.' },
          { type: 'quiz', xp: 30, prompt: 'Fact кестесінде <code>customer_id = 9</code> бар, бірақ <code>dim_customer</code>-де ол клиент жоқ. dbt-тің қай тесті бұны ұстайды?', options: ['<code>not_null</code>', '<code>unique</code>', '<code>relationships</code>', '<code>accepted_values</code>'], answer: 2, explain: '<code>relationships</code> тесті fact-тағы кілттің dimension-да бар екенін тексереді (foreign key тексерісі).' },
          { type: 'number', xp: 30, prompt: 'Кесте 1200 GB, күн бойынша 400 партицияға бөлінген, бағандардың бәрі бірдей өлшемде және 20 баған бар. Сұрау 10 күнді және 3 бағанды оқиды. Қанша GB сканерленеді? (бір таңбамен)', answer: 4.5, tol: 0.1, unit: 'GB', explain: '1200 / 400 × 10 = 30 GB партиция бойынша; 30 × 3/20 = 4.5 GB.' }
        ]
      }
    ]
  };
})();
