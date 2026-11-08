// M6.3 MLOps Basics and M6.5 Cloud & Data Eng Basics: Russian text. Code, solutions and expected output are in content/mlops.js.
DJ.i18n.patch({
  modules: {
    'm6-3': { intro: 'Обучить модель в notebook — только половина работы. В этом модуле вы научитесь регистрировать эксперименты, воспроизводить результат, работать с model registry и CI, вести мониторинг в production и обнаруживать data drift.' },
    'm6-5': { intro: 'Под аналитикой лежит инфраструктура: где хранятся данные, кто их перемещает и сколько это стоит. В этом модуле вы изучите разницу между OLTP и OLAP, warehouse / lake / lakehouse, star schema, ETL vs ELT, batch vs streaming, а также основы Airflow, dbt, Spark и облачных сервисов.' }
  },
  lessons: {
    'ops-1': {
      title: 'ML lifecycle: что происходит с моделью после notebook',
      body: `
<p><b>MLOps</b> — набор практик для надёжного вывода ML-моделей в production, их мониторинга и обновления. Если DevOps автоматизирует доставку программ, то MLOps добавляет к этому два обстоятельства: со временем меняются <b>данные</b> и <b>модель</b>.</p>
<h3>Этапы ML lifecycle</h3>
<ol>
<li><b>Problem framing</b> — бизнес-вопрос и метрика: «Какой абонент уйдёт в следующем месяце? Recall не ниже 0.7».</li>
<li><b>Data collection</b> — сбор данных из billing, CRM, call-center.</li>
<li><b>Data preparation</b> — очистка, создание features.</li>
<li><b>Training & evaluation</b> — модели, гиперпараметры, validation.</li>
<li><b>Deployment</b> — запуск модели как API или batch job.</li>
<li><b>Monitoring</b> — latency, ошибки, распределение прогнозов, drift.</li>
<li><b>Retraining</b> — переобучение на новых данных, то есть возврат ко 2-му этапу.</li>
</ol>
<p>Это не линия, а <b>цикл</b>: если мониторинг находит проблему, мы возвращаемся к данным.</p>
<h3>Пример: телеком-оператор в Алматы</h3>
<p>В марте data scientist обучил модель churn, на test AUC = 0.84. В мае компания запустила новый тариф «Безлимит». Поведение абонентов изменилось, но модель об этом не знает. В июне отдел retention жалуется: «модель даёт не тех людей для звонков». Будь мониторинг, проблема была бы видна ещё в мае.</p>
<h3>Скрытый технический долг</h3>
<p>Как показала известная статья Google «Hidden Technical Debt in ML Systems», в реальной ML-системе код модели — лишь малая часть. Остальное — сбор данных, проверки, feature pipeline, инфраструктура serving, мониторинг. Поэтому цель MLOps — навести порядок именно в этой части «вне модели».</p>
<div class="tip">Три уровня зрелости MLOps: <b>0</b> — всё вручную (notebook → pickle → email), <b>1</b> — training pipeline автоматизирован, <b>2</b> — есть CI/CD и автоматический retraining. Многие компании находятся между 0 и 1, и это нормально.</div>`,
      ex: [
        { prompt: 'Даны часы, которые команда потратила на каждый этап одного проекта. Запишите в переменную <code>train_share</code>, какой процент всего времени занял этап <b>обучения модели</b> (<code>training</code>) (число от 0 до 100).', check: { tests: "assert train_share is not None, 'Запишите число в train_share'\nassert abs(float(train_share) - 9.375) < 0.01, f'train_share должно быть ≈ 9.375 (15 / 160 * 100), у вас {train_share}'" }, hints: ['Всего часов: <code>sum(hours.values())</code>', '<code>hours[\'training\'] / sum(hours.values()) * 100</code>'] },
        { prompt: 'Lifecycle — это цикл. Напишите функцию <code>next_stage(stage)</code>: она должна возвращать следующий этап из списка <code>STAGES</code>, а после <code>\'monitoring\'</code> снова идёт <code>\'data\'</code>. Если передан этап, которого нет в списке, функция поднимает <code>ValueError</code>.', check: { tests: "assert next_stage('data') == 'training', \"next_stage('data') → 'training'\"\nassert next_stage('deployment') == 'monitoring', \"next_stage('deployment') → 'monitoring'\"\ntry:\n    _r = next_stage('monitoring')\nexcept Exception as _e:\n    _r = _e\nassert _r == 'data', \"После monitoring цикл должен вернуться в начало ('data'). Используйте % len(STAGES)\"\n_ok = False\ntry:\n    next_stage('marketing')\nexcept ValueError:\n    _ok = True\nassert _ok, 'Для неизвестного этапа поднимите ValueError'" }, hints: ['Оператор остатка: <code>(i + 1) % len(STAGES)</code>', '<code>if stage not in STAGES: raise ValueError(...)</code>'] },
        { prompt: 'В марте модель churn дала AUC = 0.84, в июне бизнес говорит «модель стала хуже». Какой этап lifecycle должен был поймать проблему раньше?', options: ['Problem framing', 'Training', 'Monitoring', 'Data collection'], explain: 'За качеством модели и изменением данных в production следит monitoring. Без него проблему первыми замечают пользователи.' },
        { prompt: 'Чем MLOps отличается от обычного DevOps?', options: ['Код не хранится в Git', 'Даже если код не меняется, система может деградировать, потому что меняются данные', 'Тесты вообще не нужны', 'Deployment всегда делается вручную'], explain: 'Поведение ML-системы зависит не только от кода, но и от данных. Если мир меняется, модель деградирует, даже если не изменилась ни одна строка кода.' }
      ]
    },
    'ops-2': {
      title: 'Experiment tracking: идея MLflow',
      body: `
<p>За неделю вы обучили 40 моделей: разные <code>max_depth</code>, features, версии данных. Чтобы ответить на вопрос «Какая была лучшей и с какими параметрами я её получил?», нужен <b>experiment tracking</b>. Самый известный инструмент — <b>MLflow</b>.</p>
<h3>Основные понятия MLflow</h3>
<ul>
<li><b>Experiment</b> — группа run по одной задаче, например <code>churn-almaty</code>.</li>
<li><b>Run</b> — одно обучение. У каждого run есть свой id.</li>
<li><b>Params</b> — входные настройки: <code>max_depth=5</code>, <code>features=v2</code>.</li>
<li><b>Metrics</b> — числа-результаты: <code>val_auc=0.83</code>.</li>
<li><b>Artifacts</b> — файлы: сама модель, графики, confusion matrix.</li>
</ul>
<h3>Как это выглядит в MLflow</h3>
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
<p>Потом команда <code>mlflow ui</code> покажет все run в виде таблицы, их можно сортировать по метрике. А <code>mlflow.search_runs(order_by=['metrics.val_auc DESC'])</code> возвращает run как pandas DataFrame.</p>
<h3>Наш stub в браузере</h3>
<p>В браузере MLflow нет, поэтому в заданиях есть маленький класс <code>Tracker</code>, повторяющий ту же идею: каждый run — dict с <code>{'name', 'params', 'metrics'}</code>. Понятия те же, только хранится всё в памяти.</p>
<div class="tip">Правило: <b>незарегистрированный эксперимент — несостоявшийся эксперимент</b>. Не копируйте результаты вручную в блокнот или Slack. Считайте метрику на данных <b>validation</b>, а test оставьте для финального выбора.</div>
<h3>Частые ошибки</h3>
<ul>
<li>Регистрировать только метрику без параметров: «Получил 0.86, но не знаю как».</li>
<li>Не регистрировать версию данных (data version). В следующем месяце тот же код даст другой результат.</li>
<li>Выбирать лучший run по метрике test — это overfit на test.</li>
</ul>`,
      ex: [
        { prompt: 'В списке <code>results</code> результаты трёх экспериментов. Для каждого откройте run через <code>tracker.start_run(name)</code>, зарегистрируйте <code>max_depth</code> как param, а <code>val_auc</code> как metric.', check: { tests: "assert len(tracker.runs) == 3, f'Должно быть 3 run, у вас {len(tracker.runs)}'\nassert [r['name'] for r in tracker.runs] == ['tree-d3', 'tree-d5', 'tree-d8'], 'Имена run должны идти в том же порядке, что в results'\nassert all(r['params'].get('max_depth') == d for r, d in zip(tracker.runs, [3, 5, 8])), \"В params должен быть ключ 'max_depth'\"\nassert all(abs(r['metrics'].get('val_auc', -1) - a) < 1e-9 for r, a in zip(tracker.runs, [0.781, 0.826, 0.804])), \"В metrics должен быть ключ 'val_auc'\"" }, hints: ['<code>for name, depth, auc in results:</code>', '<code>run = tracker.start_run(name)</code>, затем <code>tracker.log_param(run, \'max_depth\', depth)</code>'] },
        { prompt: 'Напишите функцию <code>best_run(runs, metric, higher_is_better=True)</code>: она возвращает лучший run (dict) по заданной метрике. Если <code>higher_is_better=False</code> (например, RMSE), лучшим считается наименьшее значение. Run без этой метрики не учитываются.', check: { tests: "assert best_run(runs, 'val_auc')['name'] == 'tree', 'Лучший по val_auc — tree'\nassert best_run(runs, 'val_logloss', higher_is_better=False)['name'] == 'forest', 'Чем меньше logloss, тем лучше: forest'\n_r2 = [{'name': 'a', 'params': {}, 'metrics': {}}, {'name': 'b', 'params': {}, 'metrics': {'rmse': 3.0}}, {'name': 'c', 'params': {}, 'metrics': {'rmse': 2.0}}]\nassert best_run(_r2, 'rmse', higher_is_better=False)['name'] == 'c', 'Уберите run без этой метрики, затем возьмите наименьший'" }, hints: ['Сначала фильтр: <code>[r for r in runs if metric in r[\'metrics\']]</code>', '<code>max(valid, key=lambda r: r[\'metrics\'][metric])</code>, а в обратном случае <code>min</code>'] },
        { prompt: 'Как в MLflow регистрируются <code>max_depth=5</code> и <code>val_auc=0.83</code>?', options: ['Оба как metric', 'max_depth — param, val_auc — metric', 'max_depth — artifact, val_auc — param', 'Оба как artifact'], explain: 'Param — настройка, которая входит в обучение, metric — показатель качества, который получается на выходе. Artifact — файл (модель, изображение).' }
      ]
    },
    'ops-3': {
      title: 'Reproducibility: seed, версии, data versioning',
      body: `
<p><b>Reproducibility</b> (воспроизводимость) — другой человек (или вы через три месяца) запускает тот же код и получает <b>точно тот же</b> результат. Для этого нужно зафиксировать четыре вещи: код, данные, версии библиотек и случайность.</p>
<h3>1. Случайность: seed</h3>
<p><code>train_test_split</code>, <code>RandomForest</code>, выборка sample из данных — всё это использует случайные числа. Если seed не задан, при каждом запуске результат немного другой.</p>
<pre><code>import numpy as np
rng = np.random.default_rng(42)          # новый API numpy
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42)
model = RandomForestClassifier(random_state=42)</code></pre>
<h3>2. Версии библиотек</h3>
<p>Между scikit-learn 1.3 и 1.6 может измениться значение параметра по умолчанию. Поэтому фиксируйте точную версию в <code>requirements.txt</code>:</p>
<pre><code>pandas==2.2.3
scikit-learn==1.6.1
numpy==2.1.3</code></pre>
<p>Ещё надёжнее — Docker image: в нём фиксируется даже сам Python.</p>
<h3>3. Data versioning</h3>
<p>Код лежит в Git, а CSV на 2 GB в Git не помещается. Идея: вычислить <b>hash от содержимого</b> данных (fingerprint) и зарегистрировать его вместе с run. Если изменится хотя бы один байт, hash изменится полностью. Так работает инструмент <b>DVC</b>: в Git хранится маленький файл <code>.dvc</code> (с hash), а сам файл лежит в S3 или GCS.</p>
<pre><code>import hashlib
with open('churn.csv', 'rb') as f:
    digest = hashlib.sha256(f.read()).hexdigest()[:12]
mlflow.log_param('data_sha', digest)   # например '3fa9c01b7e2d'</code></pre>
<h3>4. Код</h3>
<p>Вместе с run регистрируют и hash Git commit (MLflow делает это сам). Тогда на вопрос «С каким кодом обучена эта модель?» ответ находится за секунду.</p>
<div class="tip">Способ проверки: запустите pipeline дважды в чистом окружении. Если метрики не совпадают до 4-го знака, где-то не задан seed.</div>`,
      ex: [
        { prompt: 'Напишите функцию <code>fingerprint(text)</code>: она возвращает первые 12 hex-символов SHA-256 hash от текста (<code>hashlib</code>; переведите текст в байты через <code>.encode(\'utf-8\')</code>). Затем запишите fingerprint данных <code>v1</code> и <code>v2</code> в <code>fp1</code> и <code>fp2</code>.', check: { tests: "import hashlib as _h\nassert fingerprint('abc') == _h.sha256(b'abc').hexdigest()[:12], 'Верните sha256(...).hexdigest()[:12]'\nassert len(fp1) == 12 and fp1 != fp2, 'Если изменился один символ, fingerprint тоже должен измениться'\nassert fp1 == fingerprint(v1), 'Один и тот же текст всегда даёт один fingerprint'" }, hints: ['<code>hashlib.sha256(text.encode(\'utf-8\'))</code>', '<code>.hexdigest()[:12]</code>'] },
        { prompt: 'Для A/B-теста случайно выбираются 5 абонентов, но при каждом запуске список меняется. Исправьте функцию <code>sample_ids(seed)</code>: используйте <code>np.random.default_rng(seed)</code> и верните результат <code>rng.choice(ids, 5, replace=False)</code> как list.', check: { tests: "import numpy as _np\n_ref = list(_np.random.default_rng(42).choice(list(range(1001, 1101)), 5, replace=False))\nassert [int(x) for x in sample_ids(42)] == [int(x) for x in _ref], 'default_rng(seed) — передайте seed'\nassert [int(x) for x in sample_ids(7)] == [int(x) for x in sample_ids(7)], 'Один seed — один результат'" }, hints: ['Проблема в строке <code>default_rng()</code>: в скобках ничего нет', '<code>np.random.default_rng(seed)</code>'] },
        { prompt: 'Коллега запустил ваш код и получил AUC 0.81, а не 0.83. Seed заданы, данные те же. Самая вероятная причина?', options: ['У него медленный компьютер', 'Версии библиотек не зафиксированы (в requirements.txt нет ==)', 'Он пользуется другим браузером', 'AUC всегда случаен'], explain: 'В другой версии библиотеки параметры алгоритма по умолчанию или внутренние вычисления могут отличаться. Фиксируйте версии через <code>==</code>.' }
      ]
    },
    'ops-4': {
      title: 'Model registry и stages',
      body: `
<p>Experiment tracking отвечает на вопрос «Какие модели обучались?». <b>Model registry</b> отвечает на следующий вопрос: «<b>Какая модель</b> работает в production прямо сейчас и какая была до неё?»</p>
<h3>Что хранится в registry</h3>
<ul>
<li><b>Registered model</b> — модель с именем, например <code>churn-model</code>.</li>
<li><b>Version</b> — каждая её версия: v1, v2, v3. Каждая версия ссылается на конкретный run (params, metrics, data_sha).</li>
<li><b>Stage</b> или <b>alias</b> — состояние версии.</li>
</ul>
<h3>Классические stages</h3>
<table>
<tr><th>Stage</th><th>Значение</th></tr>
<tr><td>None</td><td>Только что зарегистрирована, никто не проверял</td></tr>
<tr><td>Staging</td><td>На проверке: shadow mode, A/B-тест</td></tr>
<tr><td>Production</td><td>Даёт прогнозы реальным клиентам (обычно только одна)</td></tr>
<tr><td>Archived</td><td>Старая версия, но не удаляется: нужна для rollback</td></tr>
</table>
<p>В новых версиях MLflow вместо stages предлагаются более гибкие <b>aliases</b>: например <code>@champion</code> (production) и <code>@challenger</code> (претендент). Идея та же: код serving загружает модель не по номеру, а <b>по имени</b>.</p>
<pre><code>import mlflow
client = mlflow.MlflowClient()
client.set_registered_model_alias('churn-model', 'champion', version=3)

# сторона serving: загружает по alias, а не по номеру
model = mlflow.pyfunc.load_model('models:/churn-model@champion')</code></pre>
<h3>Почему это важно</h3>
<p>«Дала Мобайл» вывела модель v3 в production. Через два дня call-center говорит: «рекомендации какие-то странные». Если есть registry, rollback — одна команда: вернуть alias на v2. Не нужен ни новый deploy, ни новый код.</p>
<div class="tip">Правило promotion: новая версия выходит в production, только если (1) её метрика на validation лучше текущей production, (2) data validation пройдена, (3) она проверена в staging. Старая production-версия становится <b>Archived</b>, а не удаляется.</div>`,
      ex: [
        { prompt: 'Напишите функцию <code>get_production(registry, name)</code>: она возвращает dict версии, у которой <code>stage == \'Production\'</code>, а если такой версии нет — <code>None</code>.', check: { tests: "_p = get_production(registry, 'churn-model')\nassert _p is not None and _p['version'] == 2, 'Production-версия churn-model — v2'\nassert get_production(registry, 'price-model') is None, 'Если Production-версии нет, верните None'" }, hints: ['<code>for v in registry[name]:</code> и <code>if v[\'stage\'] == \'Production\': return v</code>', 'Когда цикл закончится, <code>return None</code>'] },
        { prompt: 'Исправьте функцию <code>promote(registry, name, version)</code>. Она должна: (1) сделать заданную версию <code>Production</code>, (2) перевести прежнюю <code>Production</code>-версию в <code>Archived</code>, (3) поднять <code>ValueError</code>, если версии нет, (4) вернуть dict новой production-версии. Production всегда должна быть только одна.', check: { tests: "_reg = {'m': [{'version': 1, 'stage': 'Archived'}, {'version': 2, 'stage': 'Production'}, {'version': 3, 'stage': 'Staging'}]}\n_r = promote(_reg, 'm', 3)\n_st = {v['version']: v['stage'] for v in _reg['m']}\nassert _st[3] == 'Production', 'v3 должна быть Production'\nassert _st[2] == 'Archived', 'Прежняя production-версия (v2) должна стать Archived'\nassert list(_st.values()).count('Production') == 1, 'Production должна быть только одна'\nassert _r is not None and _r['version'] == 3, 'Верните dict новой production-версии'\n_ok = False\ntry:\n    promote(_reg, 'm', 9)\nexcept ValueError:\n    _ok = True\nassert _ok, 'Для несуществующей версии поднимите ValueError'\nassert [v['stage'] for v in _reg['m']] == ['Archived', 'Archived', 'Production'], 'При неверной версии registry не должен меняться'" }, hints: ['Сначала найдите целевую версию, если её нет — <code>raise ValueError(...)</code>. Только потом меняйте stage.', 'Переведите все версии <code>Production</code> в <code>Archived</code>, затем <code>target[\'stage\'] = \'Production\'</code>'] },
        { prompt: 'Новая модель v4 начала давать неверные прогнозы в production. Какое правильное действие самое быстрое, если есть registry?', options: ['Удалить v4 из registry и переобучить модель', 'Вернуть alias @champion (или stage Production) на предыдущую версию', 'Вручную прописать в коде serving путь к файлу v3 и сделать новый deploy', 'Отключить мониторинг'], explain: 'Главная польза registry — rollback: serving загружает модель по имени, поэтому достаточно переключить alias на старую версию. Не удаляйте v4: она нужна, чтобы разобрать ошибку.' }
      ]
    },
    'ops-5': {
      title: 'CI for ML: GitHub Actions и metric gate',
      body: `
<p><b>CI</b> (continuous integration) — автоматические проверки, которые запускаются на каждый pull request. В обычной программе это unit-тесты. В ML-проекте добавляются ещё два слоя: <b>тесты данных</b> и <b>model quality gate</b> — если метрика падает, build падает.</p>
<h3>Пример workflow GitHub Actions</h3>
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
      - run: pytest tests/                      # unit-тесты для кода features
      - run: python validate_data.py data/sample.csv
      - run: python train.py --out metrics.json # обучение на маленьком sample
      - run: python check_metrics.py metrics.json baseline.json</code></pre>
<p>Каждый шаг <code>run</code> — команда терминала. Если команда возвращает <b>ненулевой exit code</b> (например, <code>sys.exit(1)</code>), GitHub отмечает шаг красным и не пускает PR в merge (если включена branch protection).</p>
<h3>check_metrics.py</h3>
<pre><code>import json, sys
new = json.load(open(sys.argv[1]))
base = json.load(open(sys.argv[2]))
errors = check_metrics(new, base, max_drop=0.01)
for e in errors:
    print('FAIL:', e)
sys.exit(1 if errors else 0)</code></pre>
<p>Саму логику выносим в отдельную функцию <code>check_metrics</code>: её легко тестировать, а <code>sys.exit</code> стоит только в самом конце.</p>
<h3>Что проверяется</h3>
<ul>
<li><b>Относительный порог</b>: новый AUC не должен быть ниже baseline больше чем на 0.01.</li>
<li><b>Абсолютный порог</b>: AUC никогда не должен опускаться ниже 0.75.</li>
<li><b>Тесты данных</b>: нужные столбцы есть, в <code>customer_id</code> нет пустых значений, <code>monthly_fee</code> не отрицательный.</li>
</ul>
<div class="tip">Не обучайте в CI часами на полных данных. Достаточно маленького зафиксированного sample и seed: цель — проверить, «не сломалось ли что-нибудь», а не найти лучшую модель.</div>`,
      ex: [
        { prompt: 'Напишите функцию <code>check_metrics(new, baseline, max_drop=0.01, min_auc=0.75)</code>. Она возвращает <b>список</b> сообщений об ошибках (пустой список = build прошёл). Правила: для каждой метрики из <code>baseline</code> (1) если её нет в <code>new</code> — ошибка; (2) если <code>new[m] &lt; baseline[m] - max_drop</code> — ошибка. Кроме того, (3) если <code>new[\'auc\'] &lt; min_auc</code> — ошибка. Для всех метрик «чем больше, тем лучше».', check: { tests: "assert check_metrics({'auc': 0.83, 'recall': 0.70}, {'auc': 0.83, 'recall': 0.70}) == [], 'Если метрики не изменились, ошибок нет'\nassert check_metrics({'auc': 0.825, 'recall': 0.70}, {'auc': 0.83, 'recall': 0.70}) == [], 'Падение на 0.005 в пределах max_drop (0.01), ошибок нет'\nassert len(check_metrics({'auc': 0.80, 'recall': 0.70}, {'auc': 0.83, 'recall': 0.70})) == 1, 'auc упал на 0.03: должна быть одна ошибка'\nassert len(check_metrics({'auc': 0.80, 'recall': 0.60}, {'auc': 0.83, 'recall': 0.70})) == 2, 'Упали обе метрики: две ошибки'\nassert len(check_metrics({'auc': 0.74}, {'auc': 0.745})) == 1, 'auc < min_auc: даже если относительный порог пройден, абсолютный порог даёт ошибку'\nassert len(check_metrics({'auc': 0.85}, {'auc': 0.83, 'recall': 0.70})) == 1, 'recall нет в новом результате: это тоже ошибка'" }, hints: ['<code>for m, base in baseline.items():</code>, внутри <code>if m not in new</code> / <code>elif new[m] &lt; base - max_drop</code>', 'Абсолютный порог вне цикла: <code>if new.get(\'auc\', 0) &lt; min_auc: errors.append(...)</code>'] },
        { prompt: 'Тест данных в CI. Функция <code>validate_batch(df)</code> возвращает список проблем: (1) для каждого отсутствующего столбца из <code>REQUIRED</code> — <code>\'missing:&lt;столбец&gt;\'</code>; (2) если в <code>customer_id</code> есть пустое значение — <code>\'null_id\'</code>; (3) если в <code>monthly_fee</code> есть отрицательное значение — <code>\'negative_fee\'</code>. Если столбца нет, пропустите связанную с ним проверку.', check: { tests: "_good = pd.DataFrame({'customer_id': [1, 2], 'monthly_fee': [5000, 0], 'tenure_months': [3, 10]})\nassert validate_batch(_good) == [], 'В корректных данных проблем нет (0 тенге не отрицательное значение)'\n_b = validate_batch(pd.DataFrame({'customer_id': [1, None, 3], 'monthly_fee': [5000, -100, 7000]}))\nassert sorted(_b) == sorted(['missing:tenure_months', 'null_id', 'negative_fee']), f'Ожидалось: missing:tenure_months, null_id, negative_fee. У вас: {_b}'\nassert validate_batch(pd.DataFrame({'x': [1]})) == ['missing:customer_id', 'missing:monthly_fee', 'missing:tenure_months'], 'Если столбца нет, только сообщения missing:... (в порядке REQUIRED), без KeyError'" }, hints: ['<code>if col not in df.columns: problems.append(f\'missing:{col}\')</code>', '<code>df[\'customer_id\'].isna().any()</code> и <code>(df[\'monthly_fee\'] &lt; 0).any()</code>'] },
        { prompt: 'Когда шаг GitHub Actions считается «упавшим» (failed)?', options: ['Если команда что-то вывела на экран', 'Если команда вернула ненулевой exit code (например, sys.exit(1))', 'Если шаг шёл дольше 10 секунд', 'Если появился Python warning'], explain: 'CI смотрит только на exit code: 0 — успех, всё остальное — ошибка. Поэтому в конце check_metrics.py пишут <code>sys.exit(1 if errors else 0)</code>.' }
      ]
    },
    'ops-6': {
      title: 'Мониторинг в production',
      body: `
<p>Модель задеплоена — теперь это «живая» система. Мониторинг ведётся на трёх уровнях:</p>
<table>
<tr><th>Уровень</th><th>Что измеряем</th><th>Пример порога</th></tr>
<tr><td>Сервис (operational)</td><td>latency (p50, p95), error rate, число запросов</td><td>p95 &gt; 300 мс, ошибок &gt; 2%</td></tr>
<tr><td>Данные (input)</td><td>доля пустых значений, распределение признаков, новые категории</td><td>PSI &gt; 0.25</td></tr>
<tr><td>Модель (output, quality)</td><td>распределение прогнозов, реальная метрика (когда приходят label)</td><td>средняя proba сместилась на 0.1</td></tr>
</table>
<h3>Почему p95, а не среднее?</h3>
<p>Средняя latency может быть 120 мс, но каждый 20-й клиент ждёт 2 секунды. <b>p95</b> (95-й перцентиль) — 95% запросов быстрее этого значения. Он показывает «медленный хвост».</p>
<h3>Задержка label</h3>
<p>В модели churn реальный ответ (ушёл ли абонент?) известен только через месяц. В течение этого месяца качество напрямую не измерить. Поэтому мы следим за <b>proxy</b>-сигналами: drift входных данных и распределение прогнозов. Если модель обычно говорит «уйдёт» про 25% абонентов, а за одну неделю вдруг про 45%, что-то изменилось.</p>
<h3>Пример на pandas</h3>
<pre><code>logs = pd.read_csv('requests.csv')        # latency_ms, status, proba, week
p95 = logs['latency_ms'].quantile(0.95)
error_rate = (logs['status'] &gt;= 500).mean()
weekly = logs.groupby('week')['proba'].mean()</code></pre>
<p>В реальной системе эти числа собирает Prometheus, dashboard виден в Grafana, а при превышении порога alert приходит в Slack или Telegram. Инструменты вроде Evidently и WhyLabs дают мониторинг данных и моделей в виде готовых отчётов.</p>
<div class="tip">Alert должно быть мало, но каждый должен что-то значить. Если приходит 50 alert в день, команда перестаёт их читать (alert fatigue). Для каждого alert напишите runbook: «кто и что делает?»</div>`,
      ex: [
        { prompt: 'По DataFrame <code>logs</code> вычислите: <code>p95</code> — 95-й перцентиль <code>latency_ms</code> (<code>.quantile(0.95)</code>), <code>error_rate</code> — долю запросов с <code>status &gt;= 500</code> (0–1). Затем составьте список <code>alerts</code>: <code>\'latency\'</code>, если <code>p95 &gt; 300</code>, и <code>\'errors\'</code>, если <code>error_rate &gt; 0.02</code> (в этом порядке).', check: { tests: "assert abs(float(p95) - logs['latency_ms'].quantile(0.95)) < 1e-9, 'p95 = logs[\"latency_ms\"].quantile(0.95) (не среднее)'\nassert error_rate is not None and abs(float(error_rate) - 0.1) < 1e-9, 'error_rate = 2 / 20 = 0.1'\nassert alerts == ['latency', 'errors'], f\"alerts должно быть ['latency', 'errors'], у вас {alerts}\"" }, hints: ['<code>logs[\'latency_ms\'].quantile(0.95)</code>', '<code>(logs[\'status\'] &gt;= 500).mean()</code> — среднее от True/False даёт долю'] },
        { prompt: 'Label ещё нет, поэтому следим за распределением прогнозов. <code>weekly</code> — средняя <code>proba</code> за каждую неделю (<code>groupby</code>), <code>flagged</code> — список недель (int), у которых среднее отклонилось от <code>BASELINE</code> <b>больше</b> чем на 0.1.', check: { tests: "assert weekly is not None and abs(float(weekly.loc[4]) - 0.43) < 1e-9, 'weekly = preds.groupby(\"week\")[\"proba\"].mean()'\nassert [int(x) for x in flagged] == [4], f'Порог превышает только 4-я неделя (0.43); 3-я неделя 0.34, отклонение 0.09. У вас {flagged}'" }, hints: ['<code>preds.groupby(\'week\')[\'proba\'].mean()</code>', '<code>[w for w, m in weekly.items() if abs(m - BASELINE) &gt; 0.1]</code>'] },
        { prompt: 'За сутки API модели получил 48 000 запросов, 360 из них завершились ошибкой 5xx. Сколько <b>процентов</b> составляет error rate?', explain: '360 / 48 000 = 0.0075 = 0.75%.' },
        { prompt: 'Реальные label модели churn приходят только через 30 дней. Как следить за состоянием модели в первую неделю?', options: ['Никак, ждём 30 дней', 'Следим за drift входных признаков и распределением прогнозов', 'Переобучаем модель каждый день', 'Смотрим только на загрузку CPU'], explain: 'Когда label запаздывают, используют proxy-сигналы: input drift и prediction drift. Они раньше показывают, что качество падает.' }
      ]
    },
    'ops-7': {
      title: 'Data drift: PSI и KS',
      body: `
<p><b>Data drift</b> (covariate shift) — распределение входных признаков отличается от того, что было при обучении: изменилось <code>P(X)</code>. Например, при обучении средний <code>monthly_fee</code> был 7 500 ₸, а через год тарифы подорожали и он стал 11 000 ₸. Правила модели рассчитаны на старый мир.</p>
<h3>PSI — Population Stability Index</h3>
<p>Самая распространённая мера. Признак делим на bin (обычно 10) и сравниваем доли в двух распределениях:</p>
<pre><code>PSI = Σ (actual_i − expected_i) × ln(actual_i / expected_i)</code></pre>
<p>Здесь <code>expected_i</code> — доля i-го bin в reference-данных (данных обучения), <code>actual_i</code> — доля в новых данных. Чтобы не делить на ноль, для долей задают маленький нижний предел (например, 0.001).</p>
<table>
<tr><th>PSI</th><th>Интерпретация</th><th>Действие</th></tr>
<tr><td>&lt; 0.1</td><td>Изменений нет</td><td>Ничего</td></tr>
<tr><td>0.1 – 0.25</td><td>Умеренный drift</td><td>Наблюдать, искать причину</td></tr>
<tr><td>&gt; 0.25</td><td>Сильный drift</td><td>Задуматься о retraining</td></tr>
</table>
<h3>Пример, посчитанный вручную</h3>
<p>В reference в каждом bin 25%, новые данные — <code>[0.05, 0.15, 0.30, 0.50]</code>. Первый bin: <code>(0.05 − 0.25) × ln(0.05 / 0.25) = (−0.20) × (−1.609) = 0.322</code>. Если прибавить остальные три bin, PSI ≈ 0.56 — сильный drift.</p>
<h3>KS statistic</h3>
<p>Kolmogorov–Smirnov берёт наибольшую разницу двух <b>функций распределения</b> (CDF): <code>D = max |F_ref(x) − F_cur(x)|</code>. Bin не нужны, но статистика подходит только для непрерывных признаков. Для категориальных признаков используют PSI или простую проверку «появилась ли новая категория?».</p>
<pre><code>from scipy.stats import ks_2samp          # в реальном проекте
stat, p = ks_2samp(ref_fee, cur_fee)       # stat = D</code></pre>
<div class="tip">Обнаруженный drift — сигнал, а не диагноз. Сначала ищите причину: действительно ли изменились клиенты, или в ETL поменялся порядок столбцов и в <code>monthly_fee</code> попали другие данные? Во втором случае retraining не поможет, нужно исправлять pipeline.</div>`,
      ex: [
        { prompt: 'Функция <code>bin_props(x, bins)</code> возвращает <b>долю</b> значений в каждом bin по границам <code>bins</code> (список с суммой 1; <code>bins[i] &lt;= v &lt; bins[i+1]</code>). Затем функция <code>psi(ref, cur, bins)</code> возвращает PSI, с нижним пределом <code>0.001</code> для долей. Вычислите <code>psi_drift</code> и <code>psi_stable</code>.', check: { tests: "import numpy as _np\nassert [round(p, 3) for p in bin_props(ref, BINS)] == [0.25, 0.25, 0.25, 0.25], f'В reference в каждом bin должно быть 25%, у вас {bin_props(ref, BINS)}'\nassert [round(p, 3) for p in bin_props(drift, BINS)] == [0.05, 0.15, 0.3, 0.5], 'Доли drift: 0.05, 0.15, 0.30, 0.50'\nassert abs(float(psi_drift) - 0.5554) < 0.002, f'psi_drift должно быть ≈ 0.555, у вас {psi_drift}'\nassert abs(float(psi_stable) - 0.0203) < 0.002, f'psi_stable должно быть ≈ 0.020, у вас {psi_stable}'\nassert abs(psi(ref, ref, BINS)) < 1e-9, 'Для одинаковых распределений PSI должен быть 0'" }, hints: ['Доля: <code>((a &gt;= bins[i]) &amp; (a &lt; bins[i+1])).mean()</code> — на массиве numpy', 'PSI: <code>np.sum((a - e) * np.log(a / e))</code>, а перед этим <code>np.maximum(..., 0.001)</code>'] },
        { prompt: 'Функция <code>ks_stat(a, b)</code> возвращает наибольшую разницу CDF двух выборок (без scipy). Способ: объединить две выборки и для каждого значения в обеих выборках посчитать «долю значений, меньших или равных этому», затем взять максимум разницы.', check: { tests: "assert abs(float(d) - 0.35) < 1e-6, f'Для ref и drift D = 0.35, у вас {d}'\nassert abs(ks_stat(ref, ref)) < 1e-9, 'При сравнении выборки с самой собой D = 0'\nassert abs(ks_stat([1, 2, 3, 4], [5, 6, 7, 8]) - 1.0) < 1e-9, 'Если распределения совсем не пересекаются, D = 1'\nassert abs(ks_stat([1, 2, 3, 4], [1, 2, 3, 9]) - 0.25) < 1e-9, f'Для [1,2,3,4] и [1,2,3,9] D = 0.25'" }, hints: ['<code>(a &lt;= v).mean()</code> — доля значений в a, не превышающих v', 'Внутри <code>for v in np.concatenate([a, b]):</code> обновляйте максимум'] },
        { prompt: 'В reference доля bin равна 0.40, в новых данных — 0.20. Какой вклад этот bin вносит в PSI? (<code>(0.20 − 0.40) × ln(0.20 / 0.40)</code>, до трёх знаков)', explain: 'ln(0.5) = −0.693, (−0.2) × (−0.693) = 0.1386. Каждое слагаемое PSI всегда ≥ 0, поэтому PSI не бывает отрицательным.' },
        { prompt: 'PSI признака оказался 0.42. Каково первое действие?', options: ['Сразу переобучить модель', 'Убрать признак из модели', 'Проверить причину drift: реальное изменение или ошибка pipeline', 'Поднять порог мониторинга до 0.5'], explain: 'Часто сильный drift — это ошибка ETL (сместился столбец, поменялась единица измерения, null превратились в 0). Сначала найдите причину, потом принимайте решение.' }
      ]
    },
    'ops-8': {
      title: 'Concept drift и retraining triggers',
      body: `
<p>Нужно различать два вида поломок:</p>
<table>
<tr><th>Вид</th><th>Формула</th><th>Пример</th></tr>
<tr><td><b>Data drift</b></td><td>изменилось <code>P(X)</code>, <code>P(y|X)</code> прежнее</td><td>Абоненты стали старше, но закономерность «много звонков = уйдёт» сохранилась</td></tr>
<tr><td><b>Concept drift</b></td><td>изменилось <code>P(y|X)</code></td><td>Конкурент выпустил дешёвый тариф: теперь уходят и те, кто много платит, хотя раньше это были самые лояльные клиенты</td></tr>
<tr><td><b>Label shift</b></td><td>изменилось <code>P(y)</code></td><td>Churn вырос с 8% до 20%</td></tr>
</table>
<p>Concept drift опаснее: входные данные могут выглядеть так же, но правило модели уже неверно. Точно увидеть его можно только тогда, когда придут label.</p>
<h3>Виды concept drift</h3>
<ul>
<li><b>Sudden</b> — за один день (новый тариф, новый закон, пандемия).</li>
<li><b>Gradual</b> — постепенно, месяцами (меняется поведение клиентов).</li>
<li><b>Seasonal</b> — повторяющийся (праздник Наурыз, новый учебный год). Здесь правильнее не retraining, а сезонные признаки (month, is_holiday).</li>
</ul>
<h3>Retraining triggers</h3>
<ol>
<li><b>По расписанию (scheduled)</b>: раз в неделю, раз в месяц. Просто, предсказуемо, во многих случаях достаточно.</li>
<li><b>По метрике (performance-based)</b>: если реальный AUC опустился ниже baseline больше чем на заданный порог.</li>
<li><b>По drift</b>: если PSI основных признаков &gt; 0.25.</li>
<li><b>По объёму данных</b>: если после последнего retraining накопилось 50 000 новых label.</li>
<li><b>Вручную (manual)</b>: известно об изменении в бизнесе (запущен новый тариф).</li>
</ol>
<h3>Как защитить retraining</h3>
<p>Автоматический retraining — опасный инструмент: модель, обученная на плохих данных, может сама уйти в production. Поэтому в pipeline всегда есть защита: (1) data validation, (2) сравнение новой модели с текущей production на одном и том же наборе validation, (3) если она лучше — Staging, shadow mode, затем Production, (4) если хуже — остаётся старая модель, а команда получает уведомление.</p>
<div class="tip">Правило: «retrain» не означает «автоматический deploy». Обучение автоматическое, а promotion — после проверки.</div>`,
      ex: [
        { prompt: 'Напишите функцию <code>should_retrain(state)</code>: она возвращает список triggers (по порядку). Правила: <code>days_since_train &gt;= 30</code> → <code>\'scheduled\'</code>; <code>current_auc</code> есть (не None) и <code>baseline_auc - current_auc &gt; 0.03</code> → <code>\'performance\'</code>; <code>max_psi &gt; 0.25</code> → <code>\'drift\'</code>; <code>new_labels &gt;= 50000</code> → <code>\'data_volume\'</code>. Сохраняйте в списке именно этот порядок.', check: { tests: "_ok = {'days_since_train': 5, 'baseline_auc': 0.83, 'current_auc': 0.82, 'max_psi': 0.08, 'new_labels': 1000}\nassert should_retrain(_ok) == [], 'Если всё в норме, список пустой'\nassert should_retrain({'days_since_train': 12, 'baseline_auc': 0.83, 'current_auc': 0.78, 'max_psi': 0.31, 'new_labels': 12000}) == ['performance', 'drift'], \"Ожидалось ['performance', 'drift']\"\nassert should_retrain({'days_since_train': 31, 'baseline_auc': 0.83, 'current_auc': None, 'max_psi': 0.3, 'new_labels': 60000}) == ['scheduled', 'drift', 'data_volume'], 'Если current_auc равен None, performance не проверяется (без TypeError)'\nassert should_retrain({'days_since_train': 30, 'baseline_auc': 0.83, 'current_auc': 0.80, 'max_psi': 0.25, 'new_labels': 50000}) == ['scheduled', 'data_volume'], 'Границы: падение ровно на 0.03 и psi ровно 0.25 — не trigger, 30 дней и 50000 label — trigger'" }, hints: ['<code>cur = state.get(\'current_auc\')</code>, затем <code>if cur is not None and ...</code>', 'Обратите внимание на строгие неравенства: <code>&gt;= 30</code>, <code>&gt; 0.03</code>, <code>&gt; 0.25</code>, <code>&gt;= 50000</code>'] },
        { prompt: 'Защита retraining. Напишите функцию <code>promote_or_keep(new_auc, prod_auc, data_ok, min_gain=0.005)</code>: если <code>data_ok</code> равно False, она возвращает <code>\'blocked: bad data\'</code>; если новая модель меньше <code>prod_auc + min_gain</code> — <code>\'keep current\'</code>; иначе — <code>\'promote to staging\'</code>.', check: { tests: "assert promote_or_keep(0.90, 0.83, False) == 'blocked: bad data', 'Если данные плохие, результат blocked при любой метрике'\nassert promote_or_keep(0.84, 0.83, True) == 'promote to staging', 'Прироста +0.01 достаточно'\nassert promote_or_keep(0.832, 0.83, True) == 'keep current', 'Прирост +0.002 меньше min_gain'\nassert promote_or_keep(0.80, 0.83, True) == 'keep current', 'Плохая модель не выходит в production'\nassert promote_or_keep(0.84, 0.83, True, min_gain=0.02) == 'keep current', 'Нужно учитывать параметр min_gain'" }, hints: ['Первым делом <code>if not data_ok:</code>', '<code>if new_auc &lt; prod_auc + min_gain: return \'keep current\'</code>'] },
        { prompt: 'Конкурент выпустил дешёвый тариф, и теперь начали уходить даже лояльные клиенты с дорогих тарифов. Что это за явление?', options: ['Data drift: изменилось P(X)', 'Concept drift: изменилось P(y|X)', 'Overfitting', 'Data leakage'], explain: 'Признаки те же (абонентская плата, tenure), но их связь с churn изменилась. Это concept drift, и решается он только переобучением на новых label.' },
        { prompt: 'Напишите <b>политику retraining</b> для модели churn «Дала Мобайл» (не меньше 70 слов): какие triggers, какие пороги, как проверяется новая модель после retraining, кто принимает решение о promotion, что происходит, если модель получилась хуже. Затем честно оцените себя по трём критериям. Чтобы пройти, нужно не меньше <b>3 / 4</b> по каждому критерию.', criteria: [
          { name: 'Triggers и пороги', levels: ['Trigger не названы', 'Только «переобучим, если понадобится»', 'Есть конкретные triggers (расписание, метрика или drift)', 'Не меньше двух trigger с конкретными числовыми порогами (например, 30 дней, ΔAUC > 0.03, PSI > 0.25)'] },
          { name: 'Защита и promotion', levels: ['Не упомянуты', 'Новая модель сразу в production', 'Есть data validation или сравнение с текущей моделью', 'Описаны validation, сравнение, staging/shadow и действия, если модель хуже (остаётся старая модель + alert)'] },
          { name: 'Ответственность и контроль', levels: ['Неясно, кто что делает', 'Общее «команда посмотрит»', 'Есть конкретная роль (ML engineer / data scientist) и срок проверки', 'Описаны роли, канал alert, порядок rollback и кто утверждает решение'] }
        ] }
      ]
    },
    'ops-gate': {
      title: 'Экзамен модуля: MLOps Basics',
      body: `
<p>Итоговая проверка: tracking, CI gate, drift и retraining. Подсказок нет. Проходной порог — 75%.</p>`,
      ex: [
        { prompt: 'Напишите функцию <code>pick_candidate(runs, min_auc=0.80)</code>, которая выбирает из run кандидата в production. Run подходит, если: в <code>metrics</code> есть <code>val_auc</code> и он <code>&gt;= min_auc</code>, в <code>params</code> есть <code>data_sha</code> (reproducibility) и есть <code>params[\'seed\']</code>. Из подходящих верните run с наибольшим <code>val_auc</code>; если не подходит ни один — <code>None</code>.', check: { tests: "_r = pick_candidate(runs)\nassert _r is not None and _r['name'] == 'd', f\"Все условия выполняет только d (в b нет data_sha, в c нет seed, a хуже, в e нет метрики). У вас {_r['name'] if _r else None}\"\nassert pick_candidate(runs, min_auc=0.90) is None, 'Если ни один не проходит, верните None'\n_r2 = [{'name': 'x', 'params': {'seed': 1, 'data_sha': 'aa'}, 'metrics': {'val_auc': 0.81}},\n       {'name': 'y', 'params': {'seed': 1, 'data_sha': 'aa'}, 'metrics': {'val_auc': 0.95}}]\nassert pick_candidate(_r2)['name'] == 'y', 'Выберите лучший среди подходящих'" } },
        { prompt: 'Напишите полную версию CI gate: <code>ci_gate(new, baseline, psi_by_feature)</code> → tuple <code>(ok, errors)</code>. Правила: каждая метрика из <code>baseline</code> должна быть в <code>new</code> и не опускаться ниже baseline больше чем на 0.01 (ошибка: <code>\'metric:&lt;имя&gt;\'</code>); для каждого признака из <code>psi_by_feature</code> с PSI &gt; 0.25 — <code>\'psi:&lt;признак&gt;\'</code> (признаки в порядке dict). <code>ok</code> — True, если ошибок нет.', check: { tests: "_ok, _e = ci_gate({'auc': 0.83, 'recall': 0.70}, {'auc': 0.83, 'recall': 0.70}, {'monthly_fee': 0.05})\nassert _ok is True and _e == [], 'Если всё хорошо — (True, [])'\n_ok, _e = ci_gate({'auc': 0.80}, {'auc': 0.83}, {'monthly_fee': 0.30, 'tenure_months': 0.10})\nassert _ok is False and _e == ['metric:auc', 'psi:monthly_fee'], f\"Ожидалось ['metric:auc', 'psi:monthly_fee'], у вас {_e}\"\n_ok, _e = ci_gate({'auc': 0.83}, {'auc': 0.83, 'recall': 0.70}, {})\nassert _e == ['metric:recall'], 'Отсутствующая метрика — тоже ошибка'\n_ok, _e = ci_gate({'auc': 0.825}, {'auc': 0.83}, {'f': 0.25})\nassert _ok is True, 'Падение на 0.005 и PSI ровно 0.25 — не ошибка'" } },
        { prompt: 'Напишите функцию <code>psi(ref, cur, n_bins=4)</code>, которая считает PSI одного признака: границы bin возьмите из квантилей данных <b>reference</b> (<code>np.quantile(ref, [0, 0.25, 0.5, 0.75, 1])</code>), крайние границы откройте до <code>-inf</code> / <code>+inf</code>, для долей задайте нижний предел 0.001. Затем вычислите <code>psi_fee</code>.', check: { tests: "import numpy as _np\nassert abs(psi([1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8])) < 1e-9, 'Для одинаковой выборки PSI = 0'\nassert float(psi_fee) > 2.0, f'Распределение полностью сместилось: PSI должен быть больше 2, у вас {psi_fee}'\n_a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]\n_b = [1, 2, 3, 4, 5, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]\n_v = psi(_a, _b)\nassert 0.2 < float(_v) < 3.0, f'Ожидался умеренный drift (0.2–3.0), у вас {_v}'" } },
        { prompt: 'Реальный AUC модели упал с 0.84 до 0.82, но PSI всех признаков меньше 0.05. Самая вероятная причина?', options: ['Data drift: изменилось входное распределение', 'Concept drift: признаки те же, но изменилась их связь с target', 'Выросла latency', 'Потерялся seed'], explain: 'Входное распределение стабильно (PSI маленький), а качество упало — значит, изменилось P(y|X). Это concept drift.' },
        { prompt: 'Автоматический pipeline retraining работает ночью и сразу ставит результат в stage Production. Каков самый большой риск?', options: ['Pipeline долго работает', 'Модель, обученная на испорченных данных, уйдёт в production, и никто этого не увидит', 'В MLflow будет много run', 'Seed не повторится'], explain: 'Обучение может быть автоматическим, но promotion должен проходить проверку: data validation, сравнение с текущей моделью, staging. Иначе один плохой batch сломает production.' },
        { prompt: 'Baseline AUC = 0.840, допустимое в CI падение (max_drop) = 0.010. При каком <b>наименьшем</b> AUC новой модели build ещё проходит? (с тремя знаками)', explain: 'Условие: new >= baseline − max_drop = 0.840 − 0.010 = 0.830. Ровно 0.830 проходит, 0.829 — падает.' }
      ]
    },
    'deng-1': {
      title: 'OLTP vs OLAP: два разных мира',
      body: `
<p>У магазина в стиле Kaspi две базы данных. Одна принимает заказы, другая строит отчёты. Они совсем не похожи друг на друга.</p>
<table>
<tr><th></th><th>OLTP (transactional)</th><th>OLAP (analytical)</th></tr>
<tr><td>Цель</td><td>Записывать отдельные операции</td><td>Агрегировать и анализировать много строк</td></tr>
<tr><td>Типичный запрос</td><td><code>SELECT * FROM orders WHERE order_id = 101</code></td><td><code>SELECT city, SUM(amount) ... GROUP BY city</code></td></tr>
<tr><td>Число строк</td><td>1–100 за запрос</td><td>Миллионы</td></tr>
<tr><td>Запись / чтение</td><td>Много записей, маленькие транзакции</td><td>В основном чтение, batch-загрузка</td></tr>
<tr><td>Формат хранения</td><td><b>Row-oriented</b> (по строкам)</td><td><b>Column-oriented</b> (по столбцам)</td></tr>
<tr><td>Примеры</td><td>PostgreSQL, MySQL</td><td>BigQuery, Snowflake, ClickHouse, Redshift</td></tr>
</table>
<h3>Почему columnar быстрее</h3>
<p>В таблице 200 столбцов и 500 млн строк. Вам нужны только <code>city</code> и <code>amount</code>. Row-store читает с диска каждую строку <b>целиком</b> (200 столбцов), а column-store читает файлы только двух столбцов — в 100 раз меньше данных. Вдобавок значения в одном столбце похожи, поэтому сжатие (compression) работает отлично.</p>
<h3>Почему аналитику не запускают на production-базе</h3>
<p>Пока вы сканируете 300 млн строк с <code>GROUP BY</code>, та же база записывает заказы клиентов. Тяжёлый запрос может заблокировать базу и остановить работу магазина. Поэтому данные копируют из OLTP в OLAP: ночью или каждые 15 минут.</p>
<pre><code>-- OLTP: последний заказ одного клиента (по индексу, 1 мс)
SELECT * FROM orders WHERE customer_id = 7 ORDER BY order_date DESC LIMIT 1;

-- OLAP: месячная выручка по городам (сканирование, 2 с)
SELECT city, DATE_TRUNC('month', order_date) AS m, SUM(amount_tg)
FROM fact_orders JOIN dim_customer USING (customer_id)
GROUP BY 1, 2;</code></pre>
<div class="tip">Read replica — промежуточное решение: копия OLTP-базы, на которую можно отправлять тяжёлые запросы на чтение. Но это всё ещё row-store, поэтому для настоящей аналитики нужен warehouse.</div>`,
      ex: [
        { prompt: 'Посчитаем, сколько данных читает column-store. В таблице 200 столбцов одинакового размера, вся таблица — 400 GB. Запросу нужны 4 столбца. <code>row_store_gb</code> — объём, который читает row-store (вся таблица), <code>col_store_gb</code> — объём, который читает column-store, <code>speedup</code> — их отношение (во сколько раз).', check: { tests: "assert row_store_gb == 400, 'Row-store читает каждую строку целиком, то есть 400 GB'\nassert col_store_gb is not None and abs(float(col_store_gb) - 8) < 1e-9, 'Один столбец 2 GB, 4 столбца = 8 GB'\nassert speedup is not None and abs(float(speedup) - 50) < 1e-9, '400 / 8 = в 50 раз'" }, hints: ['Объём одного столбца: <code>total_gb / n_cols</code>', '<code>speedup = row_store_gb / col_store_gb</code>'] },
        { prompt: 'Какой запрос типичен для нагрузки OLAP?', options: ['<code>SELECT * FROM orders WHERE order_id = 10231</code>', '<code>UPDATE cart SET qty = 2 WHERE cart_id = 55</code>', '<code>SELECT category, SUM(amount) FROM sales GROUP BY category</code>', '<code>INSERT INTO payments VALUES (...)</code>'], explain: 'Агрегация многих строк — это OLAP. Остальные три работают с отдельной записью, то есть это OLTP.' },
        { prompt: 'Аналитик просканировал 300 млн строк с <code>GROUP BY</code> на production-базе PostgreSQL. Каков главный риск?', options: ['Результат будет неверным', 'OLTP-база может заблокироваться, и заказы клиентов не пройдут', 'Синтаксис SQL будет неверным', 'Данные потеряются'], explain: 'Тяжёлый аналитический запрос съедает ресурсы OLTP-базы и мешает реальным операциям. Поэтому аналитика работает в отдельной системе (warehouse).' }
      ]
    },
    'deng-2': {
      title: 'Warehouse, lake, lakehouse',
      body: `
<p>Есть три архитектуры хранения данных. Они не заменяют, а дополняют друг друга.</p>
<h3>Data warehouse</h3>
<p>Таблицы с фиксированной структурой (schema-on-write). Перед загрузкой данные очищают и приводят к схеме. SQL быстрый, качество данных высокое. Лучше всего подходит для отчётов BI. Примеры: BigQuery, Snowflake, Redshift.</p>
<h3>Data lake</h3>
<p>Хранилище файлов: Parquet, CSV, JSON, изображения, логи — всё хранится в том виде, в каком пришло (schema-on-read). Дёшево, гибко и незаменимо, когда для ML нужны сырые данные. Примеры: Amazon S3, Google Cloud Storage.</p>
<p>Без порядка lake превращается в «data swamp» (болото данных): тысячи файлов, но никто не знает, какой из них правильный. Поэтому и в lake нужны каталог, соглашение об именах и разбиение (partitioning): <code>s3://dala/events/dt=2024-03-01/part-000.parquet</code>.</p>
<h3>Lakehouse</h3>
<p>Поверх файлов lake ставят табличный слой (Delta Lake, Apache Iceberg). Тогда дешевизна и гибкость lake соединяются с возможностями warehouse: ACID-транзакции, schema evolution, time travel («прочитай таблицу в состоянии на прошлой неделе»). Примеры: Databricks, Iceberg + Trino.</p>
<table>
<tr><th></th><th>Warehouse</th><th>Lake</th><th>Lakehouse</th></tr>
<tr><td>Схема</td><td>При записи</td><td>При чтении</td><td>Через табличный слой</td></tr>
<tr><td>Тип данных</td><td>Структурированные</td><td>Любые</td><td>Любые + таблицы</td></tr>
<tr><td>Стоимость</td><td>Дороже</td><td>Дешевле всего</td><td>Дёшево + слой</td></tr>
<tr><td>Кто пользуется</td><td>BI, аналитика</td><td>Data engineer, ML</td><td>И те, и другие</td></tr>
</table>
<h3>Слои medallion</h3>
<p>На практике данные делят на три слоя: <b>bronze</b> (сырые, без изменений), <b>silver</b> (очищенные, с типами), <b>gold</b> (бизнес-таблицы, агрегаты). Если найдена ошибка, всё можно пересчитать из bronze, а BI работает только с gold.</p>
<div class="tip">Всегда сохраняйте сырые данные. Если в логике очистки найдётся ошибка, без слоя bronze вы не сможете пересчитать прошлое.</div>`,
      ex: [
        { prompt: 'Путь к файлу в lake имеет вид <code>s3://dala/events/dt=2024-03-02/part-000.parquet</code>. Напишите функцию <code>partition_date(path)</code>: она возвращает дату из части <code>dt=</code> (<code>\'2024-03-02\'</code>), а если <code>dt=</code> нет — <code>None</code>.', check: { tests: "assert partition_date('s3://dala/events/dt=2024-03-02/part-000.parquet') == '2024-03-02', \"Верните дату после dt=\"\nassert partition_date('s3://dala/events/latest/part-000.parquet') is None, 'Если dt= нет, None'\nassert partition_date('s3://dala/dt=2024-01-01/a/b/c.parquet') == '2024-01-01', 'Часть может стоять в любом месте строки'" }, hints: ['<code>for part in path.split(\'/\')</code> и <code>part.startswith(\'dt=\')</code>', 'Получить дату: <code>part[3:]</code> или <code>part.split(\'=\')[1]</code>'] },
        { prompt: 'Телеком-компания каждый день собирает 2 TB сырых network-логов. В будущем они могут понадобиться для ML, но сегодня запросов к ним нет. Где правильно их хранить?', options: ['В warehouse (в таблице BigQuery)', 'В data lake (S3/GCS, Parquet, partition по дням)', 'В production PostgreSQL', 'Нигде, удалить'], explain: 'Для больших сырых данных с нестабильной схемой, которые сейчас не запрашивают, lake дешёвый и гибкий. Когда понадобится, их можно загрузить оттуда в warehouse.' },
        { prompt: 'К какому слою архитектуры medallion должны подключаться дашборды BI?', options: ['Bronze (сырые)', 'Silver (очищенные)', 'Gold (бизнес-таблицы)', 'Напрямую к OLTP-базе'], explain: 'Слой gold — проверенные таблицы с применённой бизнес-логикой. Bronze и silver — промежуточные этапы, их структура часто меняется.' }
      ]
    },
    'deng-3': {
      title: 'Star schema: fact и dimension',
      body: `
<p>В warehouse данные обычно организуют по схеме <b>star schema</b> («звезда»): в центре одна таблица <b>fact</b>, вокруг неё таблицы <b>dimension</b>.</p>
<h3>Таблица fact</h3>
<p>События и измерения: каждая строка — одна строка заказа. Внутри числа (<b>measures</b>: <code>qty</code>, <code>amount_tg</code>) и ключи-ссылки на dimension (<code>customer_id</code>, <code>product_id</code>, <code>date</code>). Много строк, мало столбцов.</p>
<h3>Таблицы dimension</h3>
<p>Контекст: кто, что, где. <code>dim_customer</code> (имя, город, сегмент), <code>dim_product</code> (название, категория, цена), <code>dim_date</code> (день, неделя, месяц, праздник ли). Мало строк, много столбцов.</p>
<pre><code>fact_orders(order_id, order_date, customer_id, product_id, qty)
    → dim_customer(customer_id, customer_name, city, segment)
    → dim_product(product_id, product_name, category, price_tg)</code></pre>
<h3>Зачем разделять</h3>
<p>Название города не повторяется в каждой строке: оно записано один раз в dim_customer. Если название города нужно изменить, исправляется одна строка. И запросы легко читать: чтобы написать <code>GROUP BY city</code>, соединяем fact с dim.</p>
<h3>Star schema в pandas</h3>
<p>В датасетах есть <code>deng_orders.csv</code> (fact), <code>deng_customers.csv</code> и <code>deng_products.csv</code> (dimensions). Соединение делается через <code>merge</code>:</p>
<pre><code>m = orders.merge(customers, on='customer_id').merge(products, on='product_id')
m['revenue'] = m['qty'] * m['price_tg']
by_city = m.groupby('city')['revenue'].sum()</code></pre>
<p>Это точный аналог <code>JOIN ... GROUP BY</code> в SQL. Есть и вариант snowflake schema: в нём dimension дополнительно делятся на вложенные таблицы (<code>dim_product → dim_category</code>). Это немного экономит место, но усложняет запросы, поэтому для BI чаще выбирают star.</p>
<div class="tip">Не повторяйте текст в таблице fact. Если в 500 млн строк слово «Алматы» хранится 500 млн раз, это пустая трата места. Достаточно ключа (id).</div>`,
      ex: [
        { prompt: 'Соедините три таблицы и создайте столбец <code>revenue = qty * price_tg</code> (результат — <code>m</code>). Затем запишите общую выручку по городам в переменную <code>by_city</code> (Series, отсортированный по убыванию).', check: { tests: "import pandas as _pd\n_o = _pd.read_csv('deng_orders.csv')\n_c = _pd.read_csv('deng_customers.csv')\n_p = _pd.read_csv('deng_products.csv')\n_m = _o.merge(_c, on='customer_id').merge(_p, on='product_id')\n_m['revenue'] = _m['qty'] * _m['price_tg']\nassert 'revenue' in m.columns, \"В m должен быть столбец 'revenue'\"\nassert len(m) == 12, f'После соединения должно остаться 12 строк, у вас {len(m)}'\nassert int(m['revenue'].sum()) == 600400, f'Общая выручка 600 400 ₸, у вас {int(m[\"revenue\"].sum())}'\nassert by_city is not None and int(by_city.loc['Алматы']) == 337700, 'По Алматы должно быть 337 700 ₸'\nassert list(by_city.index) == ['Алматы', 'Астана', 'Шымкент'], 'Отсортируйте by_city по убыванию (sort_values(ascending=False))'" }, hints: ['<code>orders.merge(customers, on=\'customer_id\').merge(products, on=\'product_id\')</code>', '<code>m.groupby(\'city\')[\'revenue\'].sum().sort_values(ascending=False)</code>'] },
        { prompt: 'Двумерный отчёт: создайте в переменной <code>pivot</code> таблицу, где строки — <code>segment</code>, столбцы — <code>category</code>, значения — сумма <code>revenue</code> (<code>pivot_table</code>, пустые ячейки — 0). Затем запишите соответствующее значение в <code>b2b_electronics</code>.', check: { tests: "assert pivot is not None, 'Создайте pivot_table'\nassert list(pivot.index) == ['b2b', 'retail'], \"index должен быть 'segment'\"\nassert list(pivot.columns) == ['books', 'electronics', 'home'], \"columns должен быть 'category'\"\nassert int(pivot.loc['b2b', 'electronics']) == 337000, f\"b2b/electronics = 337 000 ₸, у вас {int(pivot.loc['b2b', 'electronics'])}\"\nassert int(pivot.loc['b2b', 'books']) == 0, 'В пустой ячейке должен быть 0 (fill_value=0)'\nassert b2b_electronics is not None and int(b2b_electronics) == 337000, 'b2b_electronics = pivot.loc[\"b2b\", \"electronics\"]'" }, hints: ['<code>m.pivot_table(index=\'segment\', columns=\'category\', values=\'revenue\', aggfunc=\'sum\', fill_value=0)</code>', '<code>pivot.loc[\'b2b\', \'electronics\']</code>'] },
        { prompt: 'Какого столбца не должно быть в таблице <code>fact_orders</code>?', options: ['<code>qty</code>', '<code>customer_id</code>', '<code>customer_city</code> (текст, повторяется в каждой строке)', '<code>order_date</code>'], explain: 'Город — свойство клиента, его место в <code>dim_customer</code>. В fact есть только ключ (<code>customer_id</code>) и измерения.' }
      ]
    },
    'deng-4': {
      title: 'ETL vs ELT',
      body: `
<p>Данные доходят от источника до warehouse за три шага: <b>E</b>xtract (извлечение), <b>T</b>ransform (преобразование), <b>L</b>oad (загрузка). Две архитектуры различаются <b>порядком</b> шагов.</p>
<h3>ETL — старый порядок</h3>
<p>Данные обрабатываются на отдельном сервере (Python, Informatica, Spark) и загружаются в warehouse уже готовыми. В warehouse лежат только чистые данные. Вычислений в дорогом warehouse мало. Недостатки: сырые данные не сохраняются, при изменении логики трудно пересчитать, pipeline превращается в «чёрный ящик».</p>
<h3>ELT — современный порядок</h3>
<p>Сырые данные сразу заливаются в warehouse (или lake), а весь transform выполняется внутри самого warehouse через SQL. Это стало выгодно, когда BigQuery и Snowflake подешевели.</p>
<ul>
<li>Сырые данные остаются в схеме <code>raw</code>: если логика меняется, пересчёт — это один <code>CREATE TABLE AS SELECT</code>.</li>
<li>Логика transform — в SQL, в Git, её может прочитать любой аналитик (так работает dbt).</li>
<li>Риск: счёт за warehouse. Каждый запрос оплачивается за объём просканированных данных.</li>
</ul>
<h3>Маленький ETL на Python</h3>
<pre><code>def extract(path):
    return pd.read_csv(path)

def transform(df):
    df = df.copy()
    df['city'] = df['city'].str.strip().str.capitalize()   # ' алматы ' → 'Алматы'
    df = df[df['status'] == 'paid']
    return df.groupby('city', as_index=False)['amount_tg'].sum()

def load(df, target):
    df.to_csv(target, index=False)                         # в реальном проекте: to_sql / BigQuery</code></pre>
<p>Польза от трёх отдельных функций — каждую можно тестировать по отдельности, а поскольку <code>transform</code> — чистая функция, её можно проверить даже там, где нет базы данных.</p>
<h3>Idempotency</h3>
<p>Если pipeline запустится дважды, результат должен быть тем же. Поэтому вместо <code>INSERT</code> используют <code>DELETE WHERE dt = '2024-03-02'</code> + <code>INSERT</code> (или <code>MERGE</code>). Иначе повторный запуск удвоит данные.</p>
<div class="tip">«Full refresh» (пересчитать всё) — самый надёжный способ для небольших данных. Переходите на incremental-загрузку, только когда данные действительно большие: она сложнее, и ошибки в ней скрытые.</div>`,
      ex: [
        { prompt: 'Напишите ETL для <code>deng_raw_sales.csv</code>. <code>extract(path)</code> читает CSV. <code>transform(df)</code>: очищает <code>city</code> (убирает лишние пробелы, <code>str.capitalize()</code>), оставляет только строки с <code>status == \'paid\'</code>, считает сумму <code>amount_tg</code> по городам (столбцы: <code>city</code>, <code>amount_tg</code>; отсортировано по <code>city</code>, индекс с 0). <code>load(df, target)</code> записывает в CSV и возвращает число строк.', check: { tests: "import pandas as _pd, os as _os\n_r = extract('deng_raw_sales.csv')\nassert _r is not None and len(_r) == 10, 'extract должен прочитать 10 строк'\nassert list(clean.columns) == ['city', 'amount_tg'], f\"Столбцы должны быть ['city', 'amount_tg'], у вас {list(clean.columns)}\"\nassert list(clean['city']) == ['Алматы', 'Астана', 'Шымкент'], f'После очистки должно быть 3 города. У вас {list(clean[\"city\"])}'\nassert [int(x) for x in clean['amount_tg']] == [264200, 117500, 23400], f'Ожидаемые суммы: 264200, 117500, 23400. У вас {[int(x) for x in clean[\"amount_tg\"]]}'\nassert int(n) == 3, 'load должна вернуть число записанных строк (3)'\nassert _os.path.exists('deng_city_totals.csv'), 'load должна записать результат в CSV-файл'\nassert len(_pd.read_csv('deng_city_totals.csv')) == 3, 'В файле должно быть 3 строки (index=False)'" }, hints: ['<code>df[\'city\'].str.strip().str.capitalize()</code> — \' АЛМАТЫ \' → \'Алматы\'', 'Фильтр: <code>df[df[\'status\'] == \'paid\']</code>, затем <code>groupby(\'city\', as_index=False)[\'amount_tg\'].sum()</code>'] },
        { prompt: 'Idempotent-загрузка. Напишите функцию <code>load_partition(table, rows, dt)</code>: она удаляет из <code>table</code> (список dict) старые строки за дату <code>dt</code>, затем добавляет <code>rows</code> и возвращает новую <code>table</code>. При двух запусках pipeline данные не должны удваиваться.', check: { tests: "assert len(table) == 3, f'И после двух запусков должно быть 3 строки (1 старая + 2 новые), у вас {len(table)}'\nassert sum(1 for r in table if r['dt'] == '2024-03-01') == 1, 'Данные за другой день должны сохраниться'\nassert sum(1 for r in table if r['dt'] == '2024-03-02') == 2, 'Для 2024-03-02 должны остаться только 2 новые строки'\n_t = load_partition([{'dt': 'a', 'x': 1}], [{'dt': 'b', 'x': 2}], 'b')\nassert len(_t) == 2, 'Если этого дня нет в таблице, строки просто добавляются'" }, hints: ['Сначала фильтр: <code>[r for r in table if r[\'dt\'] != dt]</code>', 'Затем добавьте новые строки'] },
        { prompt: 'Команда перешла на ELT: сырые данные заливаются в BigQuery, transform выполняется в SQL. Каков главный риск?', options: ['Сырые данные потеряются', 'Расходы на вычисления в warehouse (просканированные данные) могут бесконтрольно расти', 'Transform нельзя написать на SQL', 'Pipeline не будет idempotent'], explain: 'В ELT все вычисления идут в warehouse, а он берёт деньги за просканированные данные. Поэтому нужны partition, инкрементальные модели и мониторинг стоимости.' }
      ]
    },
    'deng-5': {
      title: 'Batch vs streaming и orchestration',
      body: `
<p><b>Batch</b> — данные обрабатываются пачками в определённое время: в 03:00 ночи — вчерашние заказы. <b>Streaming</b> — каждое событие обрабатывается сразу, как пришло: в ту же секунду, когда прошёл платёж, его проверяет fraud-модель.</p>
<table>
<tr><th></th><th>Batch</th><th>Streaming</th></tr>
<tr><td>Задержка</td><td>Часы</td><td>Секунды</td></tr>
<tr><td>Инструменты</td><td>Airflow + SQL / Spark</td><td>Kafka, Flink, Spark Streaming</td></tr>
<tr><td>Сложность</td><td>Низкая</td><td>Высокая (опоздавшие события, дубли, state)</td></tr>
<tr><td>Когда</td><td>Отчёты, dashboard, обучение ML</td><td>Fraud, рекомендации, alert</td></tr>
</table>
<p>Правило простое: <b>если задержка действительно не важна для бизнеса, выбирайте batch</b>. Инфраструктура streaming в разы дороже и сложнее.</p>
<h3>Orchestration: Airflow</h3>
<p>В pipeline десятки шагов, и их порядок важен: таблицу fact нужно загружать после dimension. Этим управляет orchestrator. Самый известный — <b>Apache Airflow</b>.</p>
<ul>
<li><b>DAG</b> (directed acyclic graph) — весь pipeline, граф без циклов.</li>
<li><b>Task</b> — один шаг (выполнить SQL, скопировать файл).</li>
<li><b>Dependency</b> — <code>a &gt;&gt; b</code>: b начинается, только когда закончится a.</li>
<li><b>Schedule</b> — cron: <code>'0 3 * * *'</code> — каждый день в 03:00.</li>
<li><b>Backfill</b> — пересчёт прошлых дней.</li>
<li><b>Retry</b> — повторная попытка при ошибке.</li>
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
<p>Слово «acyclic» в DAG важно: если есть цикл (a → b → a), порядок шагов не определён, и Airflow выдаёт ошибку.</p>
<div class="tip">Пусть каждый task будет маленьким и <b>пригодным для повторного запуска</b> (idempotent). Тогда если ночью упадёт один шаг, вы повторите только его, а не весь pipeline.</div>`,
      ex: [
        { prompt: '<code>DEPS</code> — зависимости каждого task. Напишите функцию <code>topo_order(deps)</code>: она выбирает task, у которых выполнены все зависимости, <b>в алфавитном порядке</b> и возвращает список порядка выполнения. Если есть цикл (ситуация, когда выбрать нечего), функция поднимает <code>ValueError</code>.', check: { tests: "_o = topo_order(DEPS)\nassert _o == ['extract', 'load_dims', 'load_fact', 'report', 'notify'], f'Ожидаемый порядок: extract, load_dims, load_fact, report, notify. У вас {_o}'\n_d2 = {'b': ['a'], 'a': [], 'c': ['a'], 'z': []}\nassert topo_order(_d2) == ['a', 'b', 'c', 'z'], 'Среди готовых task выбирайте в алфавитном порядке'\n_ok = False\ntry:\n    topo_order({'a': ['b'], 'b': ['a']})\nexcept ValueError:\n    _ok = True\nassert _ok, 'Если есть цикл, поднимите ValueError'" }, hints: ['Готовый task: <code>all(d in done for d in deps[t])</code>', 'На каждом шаге берите первый элемент <code>sorted(...)</code>; если готовых нет — это цикл'] },
        { prompt: 'Простое правило в streaming: если в скользящем окне 60 секунд с одной карты прошло больше 3 платежей — alert. Функция <code>fraud_alerts(events, window=60, limit=3)</code> возвращает список <code>event_id</code>, вызвавших alert (события отсортированы по времени).', check: { tests: "_a = fraud_alerts(events)\nassert _a == [5], f'Только на 5-м событии у карты A в окне 4 платежа. У вас {_a}'\nassert fraud_alerts(events, limit=2) == [4, 5], 'При limit=2 alert дают 4 и 5'\nassert fraud_alerts(events, window=15) == [], 'Если окно маленькое, alert нет'" }, hints: ['Для каждого события посчитайте события той же карты в окне', 'Условие окна: <code>e[\'t\'] - window &lt; x[\'t\'] &lt;= e[\'t\']</code>'] },
        { prompt: 'Отделу маркетинга нужен отчёт о вчерашних продажах, достаточно, чтобы он был готов к 09:00 утра. Какая архитектура правильная?', options: ['Streaming pipeline на Kafka + Flink', 'Ночной batch job в Airflow', 'Прямой запрос к production-базе', 'Ручное копирование в Excel'], explain: 'Требование к задержке — часы, значит, batch достаточно: дёшево, просто, легко перезапускать.' },
        { prompt: 'Что произойдёт, если в Airflow DAG написать <code>a &gt;&gt; b</code> и <code>b &gt;&gt; a</code>?', options: ['Оба выполнятся параллельно', 'Появится цикл, Airflow выдаст ошибку', 'a выполнится дважды', 'DAG закончится вдвое быстрее'], explain: 'DAG — ациклический граф. При цикле порядок не определён, поэтому Airflow его не принимает.' }
      ]
    },
    'deng-6': {
      title: 'Идея dbt: SQL-модели и тесты',
      body: `
<p><b>dbt</b> (data build tool) — инструмент, который наводит порядок в части «T» процесса ELT. Главная идея: <b>каждая таблица — один SQL-файл</b>, а файлы лежат в Git.</p>
<h3>Model</h3>
<p>Файл <code>models/gold/city_revenue.sql</code>: только <code>SELECT</code>. Писать <code>CREATE TABLE</code> не нужно — dbt сам обернёт запрос.</p>
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
<p><code>ref()</code> — сердце dbt. Он описывает зависимости между моделями, поэтому dbt сам строит DAG и создаёт таблицы в правильном порядке. Если переименовать модель, исправить SQL нужно в одном месте.</p>
<h3>Tests</h3>
<p>Тесты данных в dbt пишутся в YAML и проверяются при каждом запуске:</p>
<pre><code># models/gold/schema.yml
models:
  - name: city_revenue
    columns:
      - name: city
        tests: [not_null, unique]
      - name: revenue_tg
        tests:
          - dbt_utils.accepted_range: {min_value: 0}</code></pre>
<p>Основные готовые тесты: <code>not_null</code>, <code>unique</code>, <code>accepted_values</code>, <code>relationships</code> (есть ли ключ из fact в dimension). Это те же тесты данных, что в CI, только записанные декларативно.</p>
<h3>Ещё две пользы</h3>
<ul>
<li><b>Documentation</b>: <code>dbt docs generate</code> выдаёт граф моделей и описания столбцов в виде сайта.</li>
<li><b>Materialization</b>: одной строкой модель можно сделать <code>view</code>, <code>table</code> или <code>incremental</code>.</li>
</ul>
<div class="tip">Главная польза dbt не техническая: SQL-логика попадает в Git, в code review и под тесты. Ответ на вопрос «Из чего посчитан этот отчёт?» лежит в одном файле.</div>`,
      ex: [
        { prompt: 'Напишите три теста dbt на pandas: <code>test_not_null(df, col)</code>, <code>test_unique(df, col)</code>, <code>test_accepted_values(df, col, values)</code>. Каждый возвращает <code>True</code>, если тест пройден, и <code>False</code>, если нет. Затем запишите в список <code>failures</code> названия тестов, упавших на таблице <code>model</code> (в порядке <code>\'not_null\'</code>, <code>\'unique\'</code>, <code>\'accepted_values\'</code>).', check: { tests: "_good = pd.DataFrame({'city': ['Алматы', 'Астана'], 'segment': ['retail', 'b2b']})\nassert test_not_null(_good, 'city') is True or test_not_null(_good, 'city') == True, 'Если пустых значений нет — True'\nassert not test_not_null(model, 'city'), 'В city есть None, значит not_null падает'\nassert test_unique(_good, 'city'), 'Если нет повторов — True'\nassert not test_unique(model, 'city'), \"'Алматы' встречается дважды, unique падает\"\nassert test_accepted_values(_good, 'segment', ['retail', 'b2b']), 'Все значения в списке разрешённых'\nassert not test_accepted_values(model, 'segment', ['retail', 'b2b']), \"'vip' нет в списке, тест должен упасть\"\nassert failures == ['not_null', 'unique', 'accepted_values'], f'Падают все три теста. У вас {failures}'" }, hints: ['<code>df[col].notna().all()</code>, <code>df[col].dropna().duplicated().sum() == 0</code>, <code>df[col].isin(values).all()</code>', 'Проверяйте каждый тест через <code>if not ...: failures.append(...)</code>'] },
        { prompt: 'Аналог теста dbt <code>relationships</code>: функция <code>orphan_keys(fact, dim, key)</code> возвращает отсортированный список ключей, которые есть в fact, но отсутствуют в dimension.', check: { tests: "assert [int(x) for x in orphans] == [7, 9], f'Ключи, которых нет в dimension: 7 и 9. У вас {orphans}'\n_f2 = pd.DataFrame({'customer_id': [1, 2]})\nassert orphan_keys(_f2, dim, 'customer_id') == [], 'Если все ключи есть, пустой список'\n_f3 = pd.DataFrame({'customer_id': [9, 9, 8]})\nassert [int(x) for x in orphan_keys(_f3, dim, 'customer_id')] == [8, 9], 'Верните отсортированный список без повторов'" }, hints: ['<code>~fact[key].isin(dim[key])</code>', '<code>sorted(fact.loc[mask, key].unique().tolist())</code>'] },
        { prompt: 'Чем запись <code>{{ ref(\'paid_orders\') }}</code> в dbt лучше, чем имя таблицы, написанное вручную?', options: ['SQL работает быстрее', 'dbt сам строит граф зависимостей и создаёт модели в правильном порядке', 'Таблица автоматически сжимается', 'Тесты становятся не нужны'], explain: '<code>ref()</code> объявляет связь между моделями. По ней dbt строит DAG, определяет порядок выполнения и создаёт документацию.' }
      ]
    },
    'deng-7': {
      title: 'Spark: когда данные не помещаются в память',
      body: `
<p>pandas работает в <b>памяти</b> (RAM) одного компьютера. На 16 GB RAM можно обработать примерно 2–5 GB CSV (в памяти pandas раздувает данные в 2–5 раз). Когда приходит 500 GB данных, есть два пути: читать данные частями или использовать кластерный движок вроде <b>Apache Spark</b>.</p>
<h3>Модель Spark</h3>
<ul>
<li>Данные делятся на <b>partition</b>, каждый partition обрабатывает один worker кластера.</li>
<li><b>Transformations</b> (<code>filter</code>, <code>groupBy</code>, <code>join</code>) — <b>lazy</b>: они не вычисляются сразу, строится план.</li>
<li><b>Action</b> (<code>count()</code>, <code>collect()</code>, <code>write</code>) запускает реальные вычисления.</li>
<li>Оптимизатор (Catalyst) перестраивает план и не читает лишние столбцы.</li>
</ul>
<pre><code>from pyspark.sql import functions as F
df = spark.read.parquet('s3://dala/events/')     # lazy
daily = (df.filter(F.col('status') == 'paid')
           .groupBy('city')
           .agg(F.sum('amount_tg').alias('revenue')))
daily.write.mode('overwrite').parquet('s3://dala/gold/city_revenue/')   # action</code></pre>
<p>Запись похожа на pandas, но под ней могут работать сотни машин. Во многих случаях ту же логику можно написать и на SQL: <code>spark.sql('select city, sum(amount_tg) ... group by city')</code>.</p>
<h3>Chunked groupby в pandas — та же идея</h3>
<p>groupBy в Spark по сути — это <b>map → combine</b>: каждый partition агрегирует у себя, затем частичные результаты складываются. В pandas это можно повторить с помощью <code>chunksize</code>:</p>
<pre><code>totals = {}
for chunk in pd.read_csv('big.csv', chunksize=100_000):
    part = chunk.groupby('city')['amount_tg'].sum()
    for city, v in part.items():
        totals[city] = totals.get(city, 0) + v</code></pre>
<p>Этот способ работает для <code>sum</code>, <code>count</code>, <code>min</code>, <code>max</code>, потому что их можно считать по частям. А <b>median</b> не подходит: среднее медиан частей — не общая медиана. Для среднего (<code>mean</code>) нужно отдельно накапливать сумму и количество и делить в конце.</p>
<div class="tip">Не спешите со Spark. Кластер дорогой и сложный. Сначала: читайте только нужные столбцы (<code>usecols</code>), перейдите на Parquet, уменьшите типы (<code>float32</code>, <code>category</code>), используйте <code>chunksize</code>, DuckDB. Многие проблемы «больших данных» исчезают после этих шагов.</div>`,
      ex: [
        { prompt: 'Повторите логику map→combine из Spark: прочитайте <code>deng_raw_sales.csv</code> с <code>chunksize=3</code> и накопите сумму <code>amount_tg</code> по городам в dict <code>totals</code> (все статусы; очищайте город через <code>.str.strip().str.capitalize()</code>). Затем <code>n_chunks</code> — число обработанных частей.', starter: 'import pandas as pd\n\ntotals = {}\nn_chunks = 0\n# прочитайте файл deng_raw_sales.csv с chunksize=3\nprint(totals, n_chunks)\n', check: { tests: "assert n_chunks == 4, f'10 строк, chunksize=3 → 4 части. У вас {n_chunks}'\nassert sorted(totals) == ['Алматы', 'Астана', 'Шымкент'], f'Должно быть три города (очищенные названия). У вас {sorted(totals)}'\nassert int(totals['Алматы']) == 277700, f\"Алматы = 277 700 ₸ (все статусы), у вас {totals['Алматы']}\"\nassert int(totals['Астана']) == 239300 and int(totals['Шымкент']) == 23400, 'Астана = 239 300 ₸, Шымкент = 23 400 ₸'\nassert sum(int(v) for v in totals.values()) == 540400, 'Общая сумма 540 400 ₸'" }, hints: ['<code>for chunk in pd.read_csv(\'deng_raw_sales.csv\', chunksize=3):</code>', 'Накопление: <code>totals[city] = totals.get(city, 0) + v</code>'] },
        { prompt: 'Среднее по частям. Напишите функцию <code>chunked_mean(path, col, chunksize)</code>: она не усредняет средние частей, а накапливает <b>сумму и количество</b> и делит в конце. Запишите в <code>avg</code> среднее <code>amount_tg</code> из <code>deng_raw_sales.csv</code>.', check: { tests: "import pandas as _pd\n_true = float(_pd.read_csv('deng_raw_sales.csv')['amount_tg'].mean())\nassert abs(float(avg) - _true) < 1e-6, f'Правильное среднее = {_true:.1f}. Если усреднять средние частей, получится ошибка (в последней части 1 строка)'\nassert abs(chunked_mean('deng_raw_sales.csv', 'amount_tg', 100) - _true) < 1e-6, 'Должно правильно работать и с одной частью'\nassert abs(chunked_mean('deng_raw_sales.csv', 'amount_tg', 2) - _true) < 1e-6, 'chunksize не должен влиять на результат'" }, hints: ['Накапливайте сумму и количество: <code>total += chunk[col].sum()</code>, <code>n += chunk[col].count()</code>', 'В конце <code>return total / n</code>'] },
        { prompt: 'Какую агрегацию <b>невозможно</b> правильно посчитать по частям (chunk)?', options: ['sum', 'count', 'max', 'median'], explain: 'Для медианы нужно знать порядок всех значений; из медиан частей общая медиана не получается. sum, count, max — складываемые (associative) агрегаты.' },
        { prompt: 'В Spark написали <code>df.filter(...).groupBy(...).agg(...)</code>, но никакие вычисления не начались. Почему?', options: ['В коде ошибка', 'Это transformations, они lazy: нужен action (count, write, collect)', 'Кластер выключен', 'Spark принимает только SQL'], explain: 'Из transformations Spark строит план и выполняет его только при вызове action. Это позволяет оптимизатору отбросить лишнюю работу.' }
      ]
    },
    'deng-8': {
      title: 'Облачные сервисы и cost awareness',
      body: `
<p>Инфраструктура больших данных обычно находится в облаке. Сервисы трёх провайдеров соответствуют друг другу:</p>
<table>
<tr><th>Назначение</th><th>AWS</th><th>Google Cloud</th><th>Azure</th></tr>
<tr><td>Хранилище файлов (lake)</td><td>S3</td><td>GCS</td><td>Blob Storage</td></tr>
<tr><td>Warehouse</td><td>Redshift</td><td>BigQuery</td><td>Synapse</td></tr>
<tr><td>Виртуальная машина</td><td>EC2</td><td>Compute Engine</td><td>VM</td></tr>
<tr><td>Serverless-функция</td><td>Lambda</td><td>Cloud Functions</td><td>Functions</td></tr>
<tr><td>Managed Spark</td><td>EMR</td><td>Dataproc</td><td>HDInsight</td></tr>
</table>
<p><b>Snowflake</b> — отдельная компания, работает во всех трёх облаках. Её особенность: хранение и вычисления полностью разделены, каждая команда получает свой «warehouse» (вычислительный кластер).</p>
<h3>Две модели цены на рынке</h3>
<ul>
<li><b>По просканированным данным</b> (BigQuery on-demand): сколько байт прочитал запрос, столько и платите. <code>SELECT *</code> — самая дорогая привычка.</li>
<li><b>По времени работы</b> (Snowflake, Redshift, Databricks): сколько минут включён кластер, столько и платите. Забытый кластер ест деньги и ночью.</li>
</ul>
<h3>Cost awareness: конкретные привычки</h3>
<ol>
<li><b>Запрашивайте только нужные столбцы.</b> В columnar-хранилище <code>SELECT *</code> читает все столбцы.</li>
<li><b>Ставьте фильтр по partition</b>: <code>WHERE dt &gt;= '2024-03-01'</code>. В партиционированной таблице это сокращает сканирование в 100 раз.</li>
<li><b>Кэшируйте dashboard или создайте агрегатную таблицу.</b> Дашборд, который при каждом открытии сканирует 2 TB, — главная статья расходов месячного бюджета.</li>
<li><b>Используйте Parquet</b>: по сравнению с CSV он в 5–10 раз меньше и читается по столбцам.</li>
<li><b>В dev-окружении — <code>LIMIT</code> или sample.</b> Проверьте логику на 1% данных, затем запускайте полностью (но помните: в BigQuery <code>LIMIT</code> не уменьшает сканирование, а фильтр по партиции уменьшает).</li>
<li><b>Lifecycle policy</b>: переносите старые файлы из lake в дешёвый архив (Glacier / Coldline).</li>
<li>Включите <b>budget alert</b>: если месячный лимит превышен, придёт письмо.</li>
</ol>
<h3>Посчитаем</h3>
<p>Цена BigQuery on-demand — примерно $6.25 за 1 просканированный TB. Дашборд при каждом открытии сканирует 2 TB и открывается 40 раз в день: 80 TB × $6.25 = $500 в день, $15 000 в месяц. А если раз в день строить из 2 TB агрегатную таблицу (1 GB) и подключить дашборд к ней, сканирование составит ~2 TB + 40 GB в день, а месячный счёт — около $400. Одно архитектурное решение — 97% экономии.</p>
<div class="tip">На собеседовании data engineer часто спрашивают про «cost». В ответе назовите две вещи: фильтр по партициям/столбцам и слой агрегатов (таблицы gold).</div>`,
      ex: [
        { prompt: 'Напишите функцию <code>scan_cost(gb, price_per_tb=6.25)</code>, которая считает счёт BigQuery on-demand (1 TB = 1024 GB). Затем: <code>cost_now</code> — <b>месячный</b> (30 дней) счёт, когда дашборд 40 раз в день сканирует по 2048 GB; <code>cost_agg</code> — месячный счёт с агрегатной таблицей (раз в день 2048 GB + 40 раз по 1 GB).', check: { tests: "assert abs(scan_cost(1024) - 6.25) < 1e-9, '1 TB = 1024 GB → $6.25'\nassert abs(scan_cost(512) - 3.125) < 1e-9, 'Половина TB → $3.125'\nassert cost_now is not None and abs(float(cost_now) - 15000.0) < 1.0, f'cost_now должно быть ≈ $15 000, у вас {cost_now}'\nassert cost_agg is not None and abs(float(cost_agg) - 382.81) < 2.0, f'cost_agg должно быть ≈ $383 (2048 GB + 40 GB в день), у вас {cost_agg}'\nassert float(cost_now) / float(cost_agg) > 30, 'Слой агрегатов уменьшает счёт почти в 30 раз'" }, hints: ['<code>gb / 1024 * price_per_tb</code>', 'Месячный: умножьте дневной счёт на 30'] },
        { prompt: 'Напишите функцию <code>review_query(sql)</code>, которая проверяет, «дешёвый» ли запрос. Она возвращает список предупреждений (в этом порядке): <code>\'select_star\'</code>, если есть <code>select *</code>; <code>\'no_filter\'</code>, если <code>where</code> нет совсем; <code>\'no_partition_filter\'</code>, если <code>where</code> есть, но в нём нет <code>dt</code>. Проверка не должна зависеть от регистра.', check: { tests: "assert review_query('SELECT * FROM events') == ['select_star', 'no_filter'], \"'SELECT * FROM events' → ['select_star', 'no_filter']\"\nassert review_query(\"select city, amount from events where dt >= '2024-03-01'\") == [], 'У хорошего запроса нет предупреждений'\nassert review_query(\"SELECT city FROM events WHERE status = 'paid'\") == ['no_partition_filter'], 'where есть, но фильтра по dt нет'\nassert review_query(\"select * from events where dt = '2024-03-01'\") == ['select_star'], 'Только select_star'\nassert review_query('SELECT * FROM EVENTS') == ['select_star', 'no_filter'], 'Не должно зависеть от регистра (.lower())'" }, hints: ['Сначала <code>s = sql.lower()</code>', '<code>if \'where\' not in s: ... elif \'dt\' not in s: ...</code>'] },
        { prompt: 'Таблица партиционирована по дням: всего 365 дней и 730 GB. Запрос через <code>WHERE dt &gt;= </code> запросил только 7 дней и прочитал два столбца (10% всех столбцов). Сколько GB будет просканировано?', explain: '730 GB / 365 × 7 = 14 GB — после фильтра по партиции. 10% от этого (два столбца) = 1.4 GB.' },
        { prompt: 'В Snowflake месячный счёт неожиданно вырос вдвое, хотя число запросов не изменилось. Самая вероятная причина?', options: ['Данные хранятся в формате Parquet', 'У вычислительного кластера (warehouse) нет auto-suspend, и он был включён без остановки', 'В таблице много столбцов', 'В SQL используется JOIN'], explain: 'В Snowflake платят за время, пока кластер включён. Если auto-suspend не включён, простаивающий warehouse тоже ест деньги.' }
      ]
    },
    'deng-gate': {
      title: 'Экзамен модуля: Cloud & Data Eng Basics',
      body: `
<p>Итоговая проверка: star schema, ETL, DAG, тесты dbt и cost. Подсказок нет. Проходной порог — 75%.</p>`,
      ex: [
        { prompt: 'Создайте таблицу gold из star schema: соедините <code>deng_orders.csv</code>, <code>deng_customers.csv</code>, <code>deng_products.csv</code>, посчитайте <code>revenue = qty * price_tg</code> и создайте DataFrame <code>gold</code>. Столбцы: <code>city</code>, <code>category</code>, <code>revenue_tg</code> (сумма), <code>orders</code> (число заказов). Отсортировано по <code>city</code>, затем по <code>category</code>, индекс с 0.', check: { tests: "assert gold is not None, 'Создайте DataFrame gold'\nassert list(gold.columns) == ['city', 'category', 'revenue_tg', 'orders'], f\"Столбцы: city, category, revenue_tg, orders. У вас {list(gold.columns)}\"\nassert len(gold) == 8, f'Комбинаций город × категория — 8 строк, у вас {len(gold)}'\nassert list(gold['city'])[0] == 'Алматы' and list(gold['category'])[0] == 'books', 'Отсортируйте по city, затем по category'\n_r = gold[(gold['city'] == 'Алматы') & (gold['category'] == 'electronics')]\nassert int(_r['revenue_tg'].iloc[0]) == 296300, f\"Алматы/electronics = 296 300 ₸, у вас {int(_r['revenue_tg'].iloc[0])}\"\nassert int(_r['orders'].iloc[0]) == 3, 'По Алматы/electronics 3 заказа'\nassert int(gold['revenue_tg'].sum()) == 600400 and int(gold['orders'].sum()) == 12, 'Итого: 600 400 ₸ и 12 заказов'" } },
        { prompt: 'Полный ETL: функция <code>run_etl(path)</code> читает <code>deng_raw_sales.csv</code>, очищает <code>city</code>, убирает статус <code>cancelled</code> (остаются <code>paid</code> и <code>pending</code>), считает по городам <code>revenue_tg</code> (сумма) и <code>orders</code> (количество) и возвращает DataFrame, отсортированный по <code>city</code> (столбцы: <code>city</code>, <code>revenue_tg</code>, <code>orders</code>; индекс с 0).', check: { tests: "assert list(result.columns) == ['city', 'revenue_tg', 'orders'], f\"Столбцы: city, revenue_tg, orders. У вас {list(result.columns)}\"\nassert list(result['city']) == ['Алматы', 'Астана', 'Шымкент'], f'Ожидались три очищенных города, у вас {list(result[\"city\"])}'\nassert [int(x) for x in result['revenue_tg']] == [264200, 201500, 23400], f'Ожидалось: 264200, 201500 (pending учитывается), 23400. У вас {[int(x) for x in result[\"revenue_tg\"]]}'\nassert [int(x) for x in result['orders']] == [4, 2, 2], f'Число заказов: 4, 2, 2. У вас {[int(x) for x in result[\"orders\"]]}'\nassert list(result.index) == [0, 1, 2], 'Сбросьте индекс (reset_index(drop=True))'" } },
        { prompt: 'Напишите функцию <code>validate_dag(deps)</code>, которая проверяет DAG: она возвращает список ошибок (в этом порядке). (1) Если есть ссылка на task, которого нет в <code>deps</code>, — <code>\'unknown:&lt;имя&gt;\'</code> для каждой ссылки (task в порядке dict, зависимости в порядке списка); (2) если в графе есть цикл — <code>\'cycle\'</code>. Если ошибок нет — пустой список.', check: { tests: "assert validate_dag({'b': ['a'], 'a': []}) == [], 'В корректном DAG ошибок нет'\nassert validate_dag({'a': ['x'], 'b': ['a', 'y']}) == ['unknown:x', 'unknown:y'], \"Неизвестные зависимости по порядку: ['unknown:x', 'unknown:y']\"\nassert validate_dag({'a': ['b'], 'b': ['a']}) == ['cycle'], 'Цикл должен быть найден'\n_v = validate_dag({'a': ['b'], 'b': ['a'], 'c': ['zz']})\nassert _v == ['unknown:zz', 'cycle'], f\"Обе ошибки, unknown перед cycle: у вас {_v}\"\nassert validate_dag({'r': ['f'], 'f': ['d', 'e'], 'd': ['e'], 'e': []}) == [], 'Многоуровневый корректный DAG'" } },
        { prompt: 'Дашборд при каждом открытии сканирует в BigQuery 3 TB. Какой способ уменьшить счёт самый действенный?', options: ['Поменять цвета дашборда', 'Раз в день считать агрегатную (gold) таблицу и подключить дашборд к ней', 'Вместо <code>SELECT *</code> написать <code>SELECT * FROM ... LIMIT 1000</code>', 'Перевести таблицу в формат CSV'], explain: 'Слой агрегатов уменьшает сканируемый объём в тысячи раз. В BigQuery <code>LIMIT</code> не уменьшает сканирование, а CSV дороже columnar Parquet.' },
        { prompt: 'В таблице fact есть <code>customer_id = 9</code>, но в <code>dim_customer</code> такого клиента нет. Какой тест dbt это поймает?', options: ['<code>not_null</code>', '<code>unique</code>', '<code>relationships</code>', '<code>accepted_values</code>'], explain: 'Тест <code>relationships</code> проверяет, что ключ из fact есть в dimension (проверка foreign key).' },
        { prompt: 'Таблица — 1200 GB, разбита на 400 партиций по дням, все столбцы одного размера, всего 20 столбцов. Запрос читает 10 дней и 3 столбца. Сколько GB будет просканировано? (с одним знаком)', explain: '1200 / 400 × 10 = 30 GB по партициям; 30 × 3/20 = 4.5 GB.' }
      ]
    }
  }
});
