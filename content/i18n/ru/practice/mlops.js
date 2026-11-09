// mlops practice tasks: Russian text. Code, solutions and checks are in content/practice/mlops.js.
DJ.i18n.patch({ lessons: {
 "ops-1": {
  "pr": [
   {
    "title": "Самый долгий этап",
    "prompt": "<p>В словаре <code>hours</code> записано, сколько часов потрачено на каждый этап проекта. Запишите в переменную <code>longest</code> название этапа, на который ушло больше всего времени.</p>",
    "hints": [
     "Ключ с наибольшим значением: <code>max(hours, key=hours.get)</code>.",
     "Обратите внимание: ответ — не «обучение модели»."
    ],
    "check": {
     "tests": "assert longest == 'data_cleaning', f'Самый долгий этап — data_cleaning (45 часов), у вас {longest}'"
    }
   },
   {
    "title": "Номер этапа",
    "prompt": "<p>Напишите функцию <code>stage_number(stage)</code>: она возвращает порядковый номер этапа в списке <code>STAGES</code>, начиная с 1 (<code>'data'</code> → 1, <code>'monitoring'</code> → 5). Для этапа, которого нет в списке, функция выбрасывает <code>ValueError</code>.</p>",
    "hints": [
     "<code>STAGES.index(stage)</code> отсчитывает с 0, поэтому <code>+ 1</code>.",
     "<code>if stage not in STAGES: raise ValueError(...)</code>."
    ],
    "check": {
     "tests": "assert stage_number('data') == 1 and stage_number('monitoring') == 5, \"'data' → 1, 'monitoring' → 5\"\nassert stage_number('deployment') == 4, \"'deployment' → 4\"\ntry:\n    stage_number('design')\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Белгісіз кезеңде ValueError көтеріңіз')"
    }
   },
   {
    "title": "Время вне модели",
    "prompt": "<p>Проверим идею статьи «Hidden Technical Debt» на цифрах. Запишите в переменную <code>outside_share</code> процент времени (0–100, округлённый до 1 знака), потраченного на этапы, <b>кроме</b> <code>training</code> и <code>evaluation</code>.</p>",
    "hints": [
     "Всё время: <code>sum(hours.values())</code>; на модель: <code>hours['training'] + hours['evaluation']</code>.",
     "Процент: <code>(барлығы - модельге) / барлығы * 100</code>, затем <code>round(..., 1)</code>."
    ],
    "check": {
     "tests": "assert outside_share is not None and abs(float(outside_share) - 84.4) < 0.01, f'outside_share = 135 / 160 * 100 должно быть ≈ 84.4, у вас {outside_share}'"
    }
   },
   {
    "title": "Предыдущий этап",
    "prompt": "<p>Напишите функцию <code>prev_stage(stage)</code>: она возвращает предыдущий этап из списка <code>STAGES</code>. Перед <code>'data'</code> по кругу стоит <code>'monitoring'</code> (мониторинг снова ведёт к данным). Для этапа, которого нет в списке, функция выбрасывает <code>ValueError</code>.</p>",
    "hints": [
     "Оператор остатка работает и с отрицательными числами: <code>(i - 1) % len(STAGES)</code>.",
     "Сначала <code>if stage not in STAGES: raise ValueError(...)</code>."
    ],
    "check": {
     "tests": "assert prev_stage('training') == 'data' and prev_stage('monitoring') == 'deployment', \"prev_stage('training') → 'data', prev_stage('monitoring') → 'deployment'\"\nassert prev_stage('data') == 'monitoring', \"Перед 'data' по кругу идёт 'monitoring'\"\ntry:\n    prev_stage('sales')\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Белгісіз кезеңде ValueError көтеріңіз')"
    }
   },
   {
    "title": "Проверка журнала lifecycle",
    "prompt": "<p>Команда записывает переходы между этапами в журнал. Напишите функцию <code>valid_history(history)</code>: если каждый следующий в журнале этап — <b>следующий</b> по кругу после предыдущего, она возвращает <code>True</code>, иначе <code>False</code>. Пустой или однозначный журнал считается правильным. Функция <code>next_stage</code> уже готова.</p>",
    "hints": [
     "Соседние пары: <code>zip(history, history[1:])</code>.",
     "В каждой паре должно выполняться <code>next_stage(a) == b</code>."
    ],
    "check": {
     "tests": "assert valid_history(['deployment', 'monitoring', 'data', 'training']) is True, 'monitoring → data по кругу правильно'\nassert valid_history(['data', 'deployment']) is False, 'После data сразу deployment не бывает (training и evaluation пропущены)'\nassert valid_history(['training', 'evaluation', 'training']) is False, 'Обратный шаг неверен'\nassert valid_history([]) is True and valid_history(['data']) is True, 'Пустой или однозначный журнал правильный'"
    }
   },
   {
    "title": "Группировка часов",
    "prompt": "<p>Объединим этапы в три группы: <code>GROUPS = {'data': [...], 'model': [...], 'ops': [...]}</code>. Напишите функцию <code>group_hours(hours, groups)</code>: она возвращает словарь с общим количеством часов каждой группы. Этап, которого нет в <code>hours</code>, считается равным 0.</p>",
    "hints": [
     "<code>{g: sum(...) for g, stages in groups.items()}</code>.",
     "Для отсутствующего этапа: <code>hours.get(s, 0)</code>."
    ],
    "check": {
     "tests": "assert group_hours(hours, GROUPS) == {'data': 100, 'model': 25, 'ops': 35}, f'Ожидалось data=100, model=25, ops=35, у вас {group_hours(hours, GROUPS)}'\nassert group_hours({}, {'x': ['a']}) == {'x': 0}, 'Этап, которого нет в hours, равен 0'"
    }
   },
   {
    "title": "Цикл lifecycle",
    "prompt": "<p>Напишите функцию <code>run_cycle(start, steps)</code>: начиная с этапа <code>start</code>, она <code>steps</code> раз переходит к следующему этапу и возвращает список всех пройденных этапов (включая начальный, длиной <code>steps + 1</code>). Также напишите функцию <code>retrain_count(start, steps)</code>: она считает, сколько раз в этом пути произошёл возврат с <code>'monitoring'</code> на <code>'data'</code> (то есть цикл retraining). Для неизвестного этапа функция выбрасывает <code>ValueError</code>.</p>",
    "hints": [
     "<code>run_cycle</code>: добавляйте в конец списка следующий этап после последнего: <code>path.append(next_stage(path[-1]))</code>.",
     "<code>retrain_count</code>: считайте в пути пары <code>('monitoring', 'data')</code>."
    ],
    "check": {
     "tests": "assert run_cycle('deployment', 4) == ['deployment', 'monitoring', 'data', 'training', 'evaluation'], \"run_cycle('deployment', 4) неверен\"\nassert run_cycle('data', 0) == ['data'], 'При steps=0 только начальный этап'\nassert len(run_cycle('training', 11)) == 12, 'Длина списка steps + 1'\nassert retrain_count('data', 12) == 2, 'От data за 12 шагов: monitoring → data два раза'\nassert retrain_count('monitoring', 1) == 1 and retrain_count('data', 4) == 0, 'retrain_count неверен'\ntry:\n    run_cycle('sales', 2)\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Белгісіз кезеңде ValueError')"
    }
   },
   {
    "title": "Этапы по проектам",
    "prompt": "<p>Журнал трёх проектов хранится в DataFrame <code>log</code>: столбцы <code>project</code>, <code>stage</code>, <code>hours</code>. Через pandas: <code>avg_by_stage</code> — среднее время каждого этапа по проектам (Series, <code>groupby</code>); <code>share_by_project</code> — доля этапа <code>training</code> в каждом проекте (0–1, Series, индекс — название проекта); <code>heavy</code> — отсортированный список этапов, среднее время которых больше 20 часов.</p>",
    "hints": [
     "Среднее: <code>log.groupby('stage')['hours'].mean()</code>; общее по проекту: <code>groupby('project')['hours'].sum()</code>.",
     "Строки training: <code>log[log['stage'] == 'training'].set_index('project')['hours']</code>, затем поделите — индексы совпадут."
    ],
    "check": {
     "tests": "assert avg_by_stage is not None and abs(float(avg_by_stage['data']) - 40) < 1e-9 and abs(float(avg_by_stage['training']) - 15) < 1e-9, 'avg_by_stage: data = 40, training = 15'\nassert share_by_project is not None and abs(float(share_by_project['churn']) - 0.125) < 1e-9, 'В проекте churn доля training 10 / 80 = 0.125'\nassert abs(float(share_by_project['price']) - 20 / 70) < 1e-9 and abs(float(share_by_project['fraud']) - 0.125) < 1e-9, 'price: 20/70, fraud: 15/120'\nassert heavy == ['data'], f'Среднее больше 20 — только у data (у deployment ровно 20), у вас {heavy}'"
    }
   }
  ]
 },
 "ops-2": {
  "pr": [
   {
    "title": "Регистрация одного run",
    "prompt": "<p><code>Tracker</code> уже готов. Зарегистрируйте один run: имя <code>'rf-200'</code>, params: <code>n_estimators=200</code>, <code>max_depth=6</code>; metrics: <code>val_auc=0.847</code>, <code>val_recall=0.71</code>. Используйте методы <code>tracker</code>.</p>",
    "hints": [
     "<code>run = tracker.start_run('rf-200')</code>.",
     "Для каждого параметра — <code>tracker.log_param(run, ...)</code>, для каждой метрики — <code>tracker.log_metric(run, ...)</code>."
    ],
    "check": {
     "tests": "assert len(tracker.runs) == 1 and tracker.runs[0]['name'] == 'rf-200', 'Имя rf-200 должно быть у одного run'\nassert tracker.runs[0]['params'] == {'n_estimators': 200, 'max_depth': 6}, 'params: n_estimators=200, max_depth=6'\nassert tracker.runs[0]['metrics'] == {'val_auc': 0.847, 'val_recall': 0.71}, 'metrics: val_auc=0.847, val_recall=0.71'"
    },
    "starter": "class Tracker:\n    \"\"\"MLflow-ға ұқсас кішкентай stub: әр run — params пен metrics сақтайтын dict.\"\"\"\n    def __init__(self):\n        self.runs = []\n    def start_run(self, name):\n        run = {'name': name, 'params': {}, 'metrics': {}}\n        self.runs.append(run)\n        return run\n    def log_param(self, run, key, value):\n        run['params'][key] = value\n    def log_metric(self, run, key, value):\n        run['metrics'][key] = value\n\ntracker = Tracker()\n# зарегистрируйте run здесь\n"
   },
   {
    "title": "Поиск run по имени",
    "prompt": "<p>Напишите функцию <code>find_run(runs, name)</code>: она возвращает run (dict) с заданным именем, а если такого нет — возвращает <code>None</code>.</p>",
    "hints": [
     "<code>for r in runs: if r['name'] == name: return r</code>.",
     "Когда цикл закончится: <code>return None</code>."
    ],
    "check": {
     "tests": "assert find_run(runs, 'rf-200')['params']['n_estimators'] == 200, \"find_run(runs, 'rf-200') должна вернуть именно этот run\"\nassert find_run(runs, 'tree-d8')['metrics'] == {'val_auc': 0.81}, \"find_run(runs, 'tree-d8') неверен\"\nassert find_run(runs, 'xgb') is None, 'Если не найден — None'"
    }
   },
   {
    "title": "Значения метрики",
    "prompt": "<p>Напишите функцию <code>metric_values(runs, metric)</code>: она возвращает список значений этой метрики в том же порядке, что и run-ы, только для тех run-ов, где она есть.</p>",
    "hints": [
     "Фильтр: <code>if metric in r['metrics']</code>.",
     "Фильтр в list comprehension пишется в самом конце."
    ],
    "check": {
     "tests": "assert metric_values(runs, 'val_auc') == [0.79, 0.83, 0.81, 0.85], 'Значения val_auc: 0.79, 0.83, 0.81, 0.85'\nassert metric_values(runs, 'val_recall') == [0.66, 0.71, 0.69], 'Run-ы без этой метрики пропускаются'\nassert metric_values(runs, 'rmse') == [], 'Если метрики нет ни у одного run — []'"
    }
   },
   {
    "title": "Рейтинг run-ов",
    "prompt": "<p>Напишите функцию <code>leaderboard(runs, metric, n=3)</code>: она возвращает имена <code>n</code> лучших run-ов по метрике в порядке убывания. Run-ы без этой метрики не учитываются.</p>",
    "hints": [
     "Сначала фильтр, затем <code>sorted(valid, key=lambda r: r['metrics'][metric], reverse=True)</code>.",
     "Имена: <code>[r['name'] for r in valid[:n]]</code>."
    ],
    "check": {
     "tests": "assert leaderboard(runs, 'val_auc') == ['rf-200', 'tree-d5', 'tree-d8'], f\"Ожидалось ['rf-200', 'tree-d5', 'tree-d8'], у вас {leaderboard(runs, 'val_auc')}\"\nassert leaderboard(runs, 'val_recall', n=2) == ['tree-d5', 'rf-200'], 'Первые двое по val_recall'\nassert leaderboard(runs, 'val_recall', n=10) == ['tree-d5', 'rf-200', 'lr-c1'], 'Run-ы без метрики не попадают в список'"
    }
   },
   {
    "title": "Фильтр по параметру",
    "prompt": "<p>Напишите функцию <code>filter_runs(runs, key, value)</code>: она возвращает имена run-ов, у которых выполняется <code>params[key] == value</code>. Затем в переменную <code>best_tree</code> запишите имя run-а с самым высоким <code>val_auc</code> среди run-ов, у которых <code>model == 'tree'</code>.</p>",
    "hints": [
     "Чтобы у run-а без параметра не было ошибки: <code>r['params'].get(key) == value</code>.",
     "Найдите run-ы tree, затем <code>max(..., key=lambda r: r['metrics']['val_auc'])</code>."
    ],
    "check": {
     "tests": "assert filter_runs(runs, 'model', 'rf') == ['rf-200', 'broken'], \"Run-ы с model='rf': rf-200, broken\"\nassert filter_runs(runs, 'max_depth', 8) == ['tree-d8'], 'max_depth=8 → tree-d8'\nassert filter_runs(runs, 'C', 100) == [], 'Подходящих run-ов нет → []'\nassert best_tree == 'tree-d5', f'Лучший из tree-run-ов — tree-d5 (0.83), у вас {best_tree}'"
    }
   },
   {
    "title": "Run-ы в таблице",
    "prompt": "<p><code>mlflow.search_runs</code> возвращает run-ы в виде DataFrame. Напишите функцию <code>runs_to_df(runs)</code>: каждый run — одна строка, столбцы: <code>name</code>, каждый параметр — <code>params.&lt;атауы&gt;</code>, каждая метрика — <code>metrics.&lt;атауы&gt;</code>. Отсутствующие значения — NaN. Затем <code>df = runs_to_df(runs)</code>.</p>",
    "hints": [
     "Для каждого run сделайте «плоский» словарь: <code>row[f'params.{k}'] = v</code>.",
     "Из списка словарей <code>pd.DataFrame(rows)</code> сам сделает NaN для отсутствующих значений."
    ],
    "check": {
     "tests": "assert list(df['name']) == ['lr-c1', 'tree-d5', 'tree-d8', 'rf-200', 'broken'], 'Каждый run — одна строка, по порядку'\nassert {'params.model', 'params.C', 'params.max_depth', 'params.n_estimators', 'metrics.val_auc', 'metrics.val_recall'} <= set(df.columns), f'Нужны столбцы params.* и metrics.*, у вас {list(df.columns)}'\nassert float(df.loc[df['name'] == 'rf-200', 'metrics.val_auc'].iloc[0]) == 0.85, 'У rf-200 metrics.val_auc = 0.85'\nassert df.loc[df['name'] == 'broken', 'metrics.val_auc'].isna().all(), 'Отсутствующая метрика должна быть NaN'\nassert df.sort_values('metrics.val_auc', ascending=False)['name'].iloc[0] == 'rf-200', 'Таблицу должно быть можно отсортировать по метрике'"
    }
   },
   {
    "title": "Grid search с логированием",
    "prompt": "<p><code>score(depth, lr)</code> — готовая функция, которая считает AUC на валидации. Для каждой комбинации сетки <code>DEPTHS</code> × <code>LRS</code> откройте run (имя <code>f'gb-d{depth}-lr{lr}'</code>), запишите параметры <code>max_depth</code> и <code>learning_rate</code>, а также метрику <code>val_auc</code> (округлённую до 4 знаков). Run-ы идут по порядку: сначала по depth, внутри — по lr. Затем в переменную <code>best</code> запишите run (dict) с наибольшим <code>val_auc</code>.</p>",
    "hints": [
     "Два вложенных цикла: <code>for depth in DEPTHS:</code>, внутри него <code>for lr in LRS:</code>.",
     "Лучший: <code>max(tracker.runs, key=lambda r: r['metrics']['val_auc'])</code>."
    ],
    "check": {
     "tests": "assert len(tracker.runs) == 6, f'Должно быть 3 × 2 = 6 run-ов, у вас {len(tracker.runs)}'\nassert [r['name'] for r in tracker.runs] == ['gb-d2-lr0.05', 'gb-d2-lr0.1', 'gb-d4-lr0.05', 'gb-d4-lr0.1', 'gb-d6-lr0.05', 'gb-d6-lr0.1'], 'Названия и порядок run-ов неверны'\nassert all(set(r['params']) == {'max_depth', 'learning_rate'} for r in tracker.runs), 'У каждого run есть параметры max_depth и learning_rate'\nassert tracker.runs[2]['metrics']['val_auc'] == round(score(4, 0.05), 4), 'val_auc округляется до 4 знаков'\nassert best is not None and best['name'] == 'gb-d4-lr0.1', f\"Лучший run — gb-d4-lr0.1, у вас {best and best['name']}\""
    }
   },
   {
    "title": "Сравнение двух run-ов",
    "prompt": "<p>Напишите функцию <code>compare_runs(a, b)</code>: она возвращает словарь <code>{'params': {...}, 'metrics': {...}}</code>. В ключ <code>params</code> попадают параметры, значения которых в двух run-ах различаются (или которые есть только в одном): в виде <code>{атауы: (a мәні, b мәні)}</code>, отсутствующее значение — <code>None</code>. В <code>metrics</code> — разница <code>b - a</code> для метрик, которые есть в обоих run-ах, округлённая до 4 знаков. Затем выполните <code>diff = compare_runs(find('tree-d5'), find('rf-200'))</code>.</p>",
    "hints": [
     "Все имена параметров: <code>set(a['params']) | set(b['params'])</code>; значения берите через <code>.get(k)</code>.",
     "Разница метрики — только если она есть в обоих run-ах: <code>round(b - a, 4)</code>."
    ],
    "check": {
     "tests": "assert diff is not None and diff['params'] == {'max_depth': (5, None), 'model': ('tree', 'rf'), 'n_estimators': (None, 200)}, f\"Разница params неверна: {diff and diff['params']}\"\nassert diff['metrics'] == {'val_auc': 0.02, 'val_recall': -0.02}, f\"Разница metrics: val_auc +0.02, val_recall -0.02, у вас {diff['metrics']}\"\nassert compare_runs(find('tree-d5'), find('tree-d8'))['metrics'] == {'val_auc': -0.02}, 'Сравниваются только метрики, которые есть в обоих run-ах'\nassert compare_runs(find('lr-c1'), find('lr-c1')) == {'params': {}, 'metrics': {'val_auc': 0.0, 'val_recall': 0.0}}, 'У одинаковых run-ов разницы параметров нет'"
    }
   }
  ]
 },
 "ops-3": {
  "pr": [
   {
    "title": "Случайные числа с seed",
    "prompt": "<p>Напишите функцию <code>dice(seed)</code>: с помощью <code>np.random.default_rng(seed)</code> она создаёт 5 случайных целых чисел от 1 до 6 (включая 6) вызовом <code>rng.integers(1, 7, 5)</code> и возвращает их списком чисел типа <code>int</code>. Один и тот же seed всегда должен давать один и тот же результат.</p>",
    "hints": [
     "Ошибка в строке <code>default_rng()</code>: seed не передан.",
     "<code>np.random.default_rng(seed)</code>."
    ],
    "check": {
     "tests": "import numpy as _np\n_ref = [int(x) for x in _np.random.default_rng(2026).integers(1, 7, 5)]\nassert dice(2026) == _ref, 'Используйте np.random.default_rng(seed)'\nassert dice(7) == dice(7), 'Один seed — один результат'\nassert all(1 <= x <= 6 for x in dice(1)) and all(type(x) is int for x in dice(1)), 'Список int от 1 до 6'"
    }
   },
   {
    "title": "Hash байтов",
    "prompt": "<p>Файл читается как байты. Напишите функцию <code>file_hash(data)</code>: для <code>bytes</code> она возвращает первые 8 hex-символов SHA-256 хэша. Затем в переменные <code>h1</code> и <code>h2</code> запишите хэши <code>csv_v1</code> и <code>csv_v2</code>.</p>",
    "hints": [
     "Байты передаются сразу: <code>hashlib.sha256(data)</code> (<code>.encode</code> не нужен).",
     "<code>.hexdigest()[:8]</code>."
    ],
    "check": {
     "tests": "import hashlib as _h\nassert file_hash(b'abc') == _h.sha256(b'abc').hexdigest()[:8], 'Верните sha256(data).hexdigest()[:8]'\nassert len(h1) == 8 and h1 != h2, 'Если меняется один символ, hash тоже меняется (даже при той же длине)'\nassert h1 == file_hash(csv_v1), 'Один набор данных — один hash'"
    }
   },
   {
    "title": "Все ли версии закреплены?",
    "prompt": "<p>Для воспроизводимости в requirements.txt версия каждой библиотеки должна быть закреплена через <code>==</code>. Напишите функцию <code>all_pinned(text)</code>: если во всех строках, кроме пустых и комментариев, начинающихся с <code>#</code>, есть <code>==</code>, она возвращает <code>True</code>.</p>",
    "hints": [
     "Отрежьте комментарий в каждой строке: <code>line.split('#')[0].strip()</code>.",
     "Если в непустой строке нет <code>==</code>, сразу <code>return False</code>."
    ],
    "check": {
     "tests": "assert all_pinned('pandas==2.2.3\\nscikit-learn==1.6.1\\nnumpy==2.1.3\\n') is True, 'Всё закреплено → True'\nassert all_pinned('pandas==2.2.3\\nnumpy>=1.26\\n') is False, 'numpy>=1.26 не закреплён → False'\nassert all_pinned('# ортам\\n\\npandas==2.2.3  # дерек\\n') is True, 'Комментарии и пустые строки не учитываются'\nassert all_pinned('joblib  # ==1.4\\n') is False, '== в комментарии не считается'"
    }
   },
   {
    "title": "Метаданные run-а",
    "prompt": "<p>Вместе с каждым run сохраняют данные, которые нужны для повторения. Напишите функцию <code>run_meta(seed, data_text, commit, versions)</code>: она возвращает <code>{'seed': seed, 'data_sha': мәтіннің SHA-256 hash-ының алғашқы 12 таңбасы, 'commit': commit-тің алғашқы 7 таңбасы, 'versions': versions сөздігінің көшірмесі}</code>.</p>",
    "hints": [
     "Хэш: <code>hashlib.sha256(data_text.encode('utf-8')).hexdigest()[:12]</code>.",
     "Копия: <code>dict(versions)</code>."
    ],
    "check": {
     "tests": "import hashlib as _h\n_v = {'scikit-learn': '1.6.1', 'pandas': '2.2.3'}\n_m = run_meta(42, 'id,churn\\n1,0\\n', '3fa9c01b7e2d55aa', _v)\nassert _m == {'seed': 42, 'data_sha': _h.sha256('id,churn\\n1,0\\n'.encode('utf-8')).hexdigest()[:12], 'commit': '3fa9c01', 'versions': _v}, f'Результат run_meta неверен: {_m}'\n_v['numpy'] = '2.1.3'\nassert 'numpy' not in _m['versions'], 'Сохраните копию versions: dict(versions)'"
    }
   },
   {
    "title": "Разбиение train/test с seed",
    "prompt": "<p>Напишите функцию <code>split_ids(ids, test_share, seed)</code>. Внутри: <code>rng = np.random.default_rng(seed)</code>, <code>order = rng.permutation(len(ids))</code>; первые <code>round(len(ids) * test_share)</code> индексов — test, остальные — train. Она возвращает <code>(train, test)</code>: оба — <b>отсортированные</b> списки id типа <code>int</code>. Одинаковый seed — одинаковое разбиение.</p>",
    "hints": [
     "<code>order = rng.permutation(len(ids))</code> — случайный порядок индексов.",
     "Тест: <code>order[:n_test]</code>, train: <code>order[n_test:]</code>; в конце <code>sorted(...)</code>."
    ],
    "check": {
     "tests": "import numpy as _np\n_o = _np.random.default_rng(42).permutation(20)\n_test = sorted(int(ids[i]) for i in _o[:5])\n_tr, _te = split_ids(ids, 0.25, 42)\nassert _te == _test, 'test — первые round(n * test_share) индексов результата rng.permutation'\nassert len(_tr) == 15 and sorted(_tr + _te) == ids, 'train и test вместе дают все id и не пересекаются'\nassert split_ids(ids, 0.25, 7) == split_ids(ids, 0.25, 7), 'Один seed — одно разбиение'\nassert split_ids(ids, 0.25, 7) != split_ids(ids, 0.25, 8), 'Другой seed — другое разбиение'"
    }
   },
   {
    "title": "Совпадают ли два run-а?",
    "prompt": "<p>У двух run-ов есть метаданные. Напишите функцию <code>diff_meta(a, b)</code>: она возвращает список тех влияющих на результат полей, у которых есть различие: сначала <code>seed</code>, <code>data_sha</code>, <code>commit</code>, затем каждая библиотека из <code>versions</code> (например, <code>versions.scikit-learn</code>). Список сортируется по имени библиотеки; библиотека, которой нет у одного из run-ов, тоже считается отличием.</p>",
    "hints": [
     "Сначала три основных поля, затем библиотеки: <code>sorted(set(va) | set(vb))</code>.",
     "Для отсутствующей библиотеки <code>.get(lib)</code> даёт <code>None</code> — это тоже различие."
    ],
    "check": {
     "tests": "assert diff_meta(run_a, run_b) == ['commit', 'versions.numpy', 'versions.scikit-learn'], f'Ожидалось commit, versions.numpy, versions.scikit-learn. У вас {diff_meta(run_a, run_b)}'\nassert diff_meta(run_a, run_a) == [], 'У одинаковых run-ов различий нет'\nassert diff_meta(dict(run_a, seed=7), run_a) == ['seed'], 'Разница в seed'"
    }
   },
   {
    "title": "Хэш, не зависящий от порядка строк",
    "prompt": "<p>Экспорт меняет порядок строк при каждой выгрузке, но данные те же. Напишите функцию <code>table_fingerprint(csv_text)</code>: первая строка (заголовок) остаётся на месте, остальные непустые строки сортируются, затем всё объединяется через <code>\\n</code>, и возвращаются первые 12 символов SHA-256 хэша. Пробелы в конце строки не учитываются. Поэтому при смене порядка строк хэш не меняется, а при смене значения — меняется.</p>",
    "hints": [
     "Очистите строки: <code>[l.rstrip() for l in csv_text.splitlines()]</code>, уберите пустые строки.",
     "Заголовок + отсортированные строки → <code>'\\n'.join(...)</code> → sha256."
    ],
    "check": {
     "tests": "import hashlib as _h\nassert len(table_fingerprint(v1)) == 12, 'Длина hash — 12'\nassert table_fingerprint(v1) == table_fingerprint(v1_shuffled), 'Порядок строк и пробелы в конце не должны менять hash'\nassert table_fingerprint(v1) != table_fingerprint(v2), 'Если значение меняется, hash меняется'\nassert table_fingerprint(v1) == _h.sha256('customer_id,city,churned\\n1,Алматы,0\\n2,Астана,1\\n3,Шымкент,0'.encode('utf-8')).hexdigest()[:12], 'Каноническая форма: заголовок, затем отсортированные строки, через \\\\n'\nassert table_fingerprint('b,a\\n1,2\\n') != table_fingerprint('a,b\\n1,2\\n'), 'Заголовок тоже входит в hash'"
    }
   },
   {
    "title": "Повторяемый эксперимент",
    "prompt": "<p>Напишите функцию <code>run_experiment(seed)</code>: (1) <code>rng = np.random.default_rng(seed)</code>; (2) выберите 8 id из <code>CUSTOMERS</code> через <code>rng.choice(CUSTOMERS, 8, replace=False)</code>; (3) <code>score</code> — среднее значений <code>CHURN</code> по выбранным id, округлённое до 4 знаков (тип <code>float</code>); (4) <code>sample_sha</code> — первые 12 символов SHA-256 хэша текста, в котором выбранные id отсортированы и соединены запятой. Верните <code>{'seed', 'sample_sha', 'score'}</code>.</p>",
    "hints": [
     "Преобразуйте выбранные id в <code>int</code>: <code>[int(x) for x in rng.choice(...)]</code>.",
     "Текст hash: <code>','.join(str(c) for c in sorted(sample))</code>."
    ],
    "check": {
     "tests": "import numpy as _np, hashlib as _h\n_s = [int(x) for x in _np.random.default_rng(42).choice(CUSTOMERS, 8, replace=False)]\n_r = run_experiment(42)\nassert set(_r) == {'seed', 'sample_sha', 'score'} and _r['seed'] == 42, 'Ключи: seed, sample_sha, score'\nassert _r['score'] == round(float(_np.mean([CHURN[c] for c in _s])), 4), 'score — среднее CHURN по выбранным id (4 знака)'\nassert _r['sample_sha'] == _h.sha256(','.join(str(c) for c in sorted(_s)).encode('utf-8')).hexdigest()[:12], 'sample_sha — hash текста отсортированных id'\nassert run_experiment(42) == _r, 'Один seed — один результат'\nassert run_experiment(43)['sample_sha'] != _r['sample_sha'], 'Другой seed — другая выборка'"
    }
   }
  ]
 },
 "ops-4": {
  "pr": [
   {
    "title": "Последняя версия",
    "prompt": "<p>Напишите функцию <code>latest_version(registry, name)</code>: она возвращает наибольший номер версии модели (<code>int</code>). Если модели нет в registry, она возвращает <code>None</code>.</p>",
    "hints": [
     "<code>max(v['version'] for v in registry[name])</code>.",
     "Если модели нет, сначала <code>return None</code>."
    ],
    "check": {
     "tests": "assert latest_version(registry, 'churn-model') == 5, 'Последняя версия churn-model — 5'\nassert latest_version(registry, 'price-model') == 1, 'price-model — 1'\nassert latest_version(registry, 'fraud-model') is None, 'Модели нет → None'"
    }
   },
   {
    "title": "Версии по stage",
    "prompt": "<p>Напишите функцию <code>versions_in(registry, name, stage)</code>: она возвращает список номеров версий в заданном stage, отсортированный по возрастанию.</p>",
    "hints": [
     "<code>[v['version'] for v in registry[name] if v['stage'] == stage]</code>.",
     "Сортировка: <code>sorted(...)</code>."
    ],
    "check": {
     "tests": "assert versions_in(registry, 'churn-model', 'Archived') == [1, 2], 'Archived: [1, 2]'\nassert versions_in(registry, 'churn-model', 'Production') == [3], 'Production: [3]'\nassert versions_in(registry, 'price-model', 'Staging') == [], 'В Staging ничего нет → []'"
    }
   },
   {
    "title": "Регистрация новой версии",
    "prompt": "<p>Напишите функцию <code>register(registry, name, val_auc)</code>: она добавляет модели новую версию: номер — наибольший номер версии + 1 (если модели нет, номер 1 и список создаётся), stage — <code>'None'</code>. Она возвращает dict новой версии.</p>",
    "hints": [
     "<code>registry.setdefault(name, [])</code> создаёт пустой список, если модели нет.",
     "Номер: <code>max((...), default=0) + 1</code>."
    ],
    "check": {
     "tests": "_r = {'m': [{'version': 1, 'stage': 'Production', 'val_auc': 0.8}, {'version': 2, 'stage': 'None', 'val_auc': 0.7}]}\nassert register(_r, 'm', 0.82) == {'version': 3, 'stage': 'None', 'val_auc': 0.82}, 'Новая версия: version 3, stage None'\nassert len(_r['m']) == 3 and _r['m'][-1]['version'] == 3, 'Версия должна добавиться в registry'\nassert register(_r, 'fraud', 0.9) == {'version': 1, 'stage': 'None', 'val_auc': 0.9} and _r['fraud'][0]['version'] == 1, 'Новая модель → version 1'"
    }
   },
   {
    "title": "Откат (rollback)",
    "prompt": "<p>Модель в Production работает плохо. Напишите функцию <code>rollback(registry, name)</code>: текущая версия <code>Production</code> становится <code>Archived</code>, а из версий <code>Archived</code> (более ранних, кроме текущей) выбирается версия с наибольшим номером — она становится <code>Production</code>. Функция возвращает dict новой production-версии. Если нет версии <code>Production</code> или подходящей версии <code>Archived</code>, функция выбрасывает <code>ValueError</code>, а registry не меняется.</p>",
    "hints": [
     "Сначала найдите текущую production-версию и целевую archived-версию; меняйте stage, только если обе есть.",
     "Цель: <code>max(archived, key=lambda v: v['version'])</code>."
    ],
    "check": {
     "tests": "_r = {'m': [{'version': 1, 'stage': 'Archived'}, {'version': 2, 'stage': 'Archived'}, {'version': 3, 'stage': 'Production'}, {'version': 4, 'stage': 'Staging'}]}\n_p = rollback(_r, 'm')\nassert _p['version'] == 2, 'Откатываемся с v3 на v2 (наибольшая из Archived)'\nassert [v['stage'] for v in _r['m']] == ['Archived', 'Production', 'Archived', 'Staging'], 'v3 Archived, v2 Production, v4 не меняется'\n_x = {'m': [{'version': 1, 'stage': 'Production'}, {'version': 2, 'stage': 'Staging'}]}\ntry:\n    rollback(_x, 'm')\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Archived нұсқа жоқ болса ValueError')\nassert _x['m'][0]['stage'] == 'Production', 'При ошибке registry не должен меняться'\n_y = {'m': [{'version': 1, 'stage': 'Archived'}]}\ntry:\n    rollback(_y, 'm')\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Production жоқ болса ValueError')"
    }
   },
   {
    "title": "Загрузка по alias",
    "prompt": "<p>В новых версиях MLflow вместо stage используется alias. <code>aliases</code> — словарь: <code>{(модель, alias): нұсқа}</code>. <code>set_alias(aliases, name, alias, version)</code> назначает alias (заменяет прежний). <code>resolve(aliases, uri)</code> возвращает номер версии из URI вида <code>'models:/churn-model@champion'</code>; если URI не начинается с <code>models:/</code>, нет <code>@</code> или alias не найден, функция выбрасывает <code>ValueError</code>.</p>",
    "hints": [
     "Ключ — кортеж: <code>aliases[(name, alias)] = version</code>.",
     "Разбор URI: <code>uri[len('models:/'):].split('@')</code>."
    ],
    "check": {
     "tests": "_a = {}\nset_alias(_a, 'churn-model', 'champion', 3)\nset_alias(_a, 'churn-model', 'challenger', 4)\nassert resolve(_a, 'models:/churn-model@champion') == 3, 'champion → 3'\nset_alias(_a, 'churn-model', 'champion', 2)\nassert resolve(_a, 'models:/churn-model@champion') == 2, 'Для отката достаточно переназначить alias на версию 2'\nassert resolve(_a, 'models:/churn-model@challenger') == 4, 'challenger → 4'\nfor _u in ['models:/churn-model@legacy', 'churn-model@champion', 'models:/churn-model']:\n    try:\n        resolve(_a, _u)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f'{_u} үшін ValueError күтілді')"
    }
   },
   {
    "title": "Условия promotion",
    "prompt": "<p>Новая версия попадает в production, только если выполнены все три условия. Напишите функцию <code>promotion_blockers(candidate, production, data_ok)</code>: она возвращает список невыполненных условий (в таком порядке): <code>'metric'</code> — <code>val_auc</code> кандидата не строго выше, чем у production; <code>'data'</code> — <code>data_ok</code> равно False; <code>'staging'</code> — stage кандидата не <code>'Staging'</code>. Если <code>production</code> равен <code>None</code>, условие по метрике считается выполненным.</p>",
    "hints": [
     "Три отдельных <code>if</code>: каждый добавляет своё название в список.",
     "Условие по метрике: <code>production is not None and candidate['val_auc'] &lt;= production['val_auc']</code>."
    ],
    "check": {
     "tests": "_prod = {'version': 3, 'stage': 'Production', 'val_auc': 0.81}\nassert promotion_blockers({'version': 4, 'stage': 'Staging', 'val_auc': 0.84}, _prod, True) == [], 'Всё выполнено → []'\nassert promotion_blockers({'version': 5, 'stage': 'None', 'val_auc': 0.81}, _prod, False) == ['metric', 'data', 'staging'], 'Равная метрика тоже недостаточна: все три условия не выполнены'\nassert promotion_blockers({'version': 1, 'stage': 'Staging', 'val_auc': 0.6}, None, True) == [], 'Если production нет, условие по метрике выполнено'"
    }
   },
   {
    "title": "Promotion с проверкой условий",
    "prompt": "<p>Напишите функцию <code>promote_if_ready(registry, name, version, data_ok)</code>. Если версии нет, выбросите <code>ValueError</code>. Условия (порядок проверки: metric, data, staging): <code>val_auc</code> кандидата строго выше, чем у текущего production (если production нет — условие выполнено); <code>data_ok</code>; кандидат находится в stage <code>Staging</code>. Если всё выполнено: бывший production получает stage <code>Archived</code>, кандидат — <code>Production</code>, и возвращается <code>('promoted', [])</code>. Иначе registry не меняется и возвращается <code>('blocked', [орындалмаған шарттар])</code>.</p>",
    "hints": [
     "Сначала найдите кандидата и текущий production, проверьте условия, и только потом меняйте stage.",
     "Если есть невыполненные условия, сразу верните: <code>if blockers: return 'blocked', blockers</code>."
    ],
    "check": {
     "tests": "import copy as _cp\n_r = {'churn-model': [{'version': 1, 'stage': 'Archived', 'val_auc': 0.78}, {'version': 2, 'stage': 'Archived', 'val_auc': 0.80}, {'version': 3, 'stage': 'Production', 'val_auc': 0.81}, {'version': 4, 'stage': 'Staging', 'val_auc': 0.84}, {'version': 5, 'stage': 'None', 'val_auc': 0.79}]}\n_before = _cp.deepcopy(_r)\nassert promote_if_ready(_r, 'churn-model', 5, True) == ('blocked', ['metric', 'staging']), 'v5: 0.79 < 0.81 и stage None'\nassert _r == _before, 'Если заблокировано, registry не должен меняться'\nassert promote_if_ready(_r, 'churn-model', 4, False) == ('blocked', ['data']), 'v4: данные не прошли проверку'\nassert promote_if_ready(_r, 'churn-model', 4, True) == ('promoted', []), 'v4 выполняет все условия'\nassert {v['version']: v['stage'] for v in _r['churn-model']} == {1: 'Archived', 2: 'Archived', 3: 'Archived', 4: 'Production', 5: 'None'}, 'Должно быть v3 Archived, v4 Production'\n_n = {'m': [{'version': 1, 'stage': 'Staging', 'val_auc': 0.5}]}\nassert promote_if_ready(_n, 'm', 1, True) == ('promoted', []) and _n['m'][0]['stage'] == 'Production', 'Если production нет, условие по метрике выполнено'\ntry:\n    promote_if_ready(_r, 'churn-model', 9, True)\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Жоқ нұсқада ValueError')"
    }
   },
   {
    "title": "События registry",
    "prompt": "<p>Восстановите историю registry из списка событий. Напишите функцию <code>replay(events)</code>: начиная с пустого registry (одна модель), она по порядку применяет каждое событие: <code>('register', auc)</code> — новая версия (номер по порядку 1, 2, ...), stage <code>'None'</code>; <code>('stage', version)</code> — переводит версию в stage <code>Staging</code>; <code>('promote', version)</code> — переводит версию в stage <code>Production</code>, бывший production получает <code>Archived</code>; <code>('rollback',)</code> — текущий production получает <code>Archived</code>, а самая большая archived-версия меньше него получает <code>Production</code>. Верните словарь <code>{нұсқа: stage}</code>.</p>",
    "hints": [
     "Храните версии в списке; для каждого типа события — отдельная ветка <code>if/elif</code>.",
     "Вспомогательные внутренние функции удобны: <code>find(n)</code> и <code>current()</code> (текущий production)."
    ],
    "check": {
     "tests": "assert replay(events) == {1: 'Archived', 2: 'Production', 3: 'Archived', 4: 'None'}, f'Результат неверен: {replay(events)}'\nassert replay([('register', 0.7)]) == {1: 'None'}, 'Одна регистрация → {1: \"None\"}'\nassert replay([('register', 0.7), ('promote', 1), ('register', 0.8), ('promote', 2)]) == {1: 'Archived', 2: 'Production'}, 'promote переводит бывший production в Archived'\nassert replay([]) == {}, 'Нет событий → {}'"
    }
   }
  ]
 },
 "ops-5": {
  "pr": [
   {
    "title": "Код выхода",
    "prompt": "<p>Если шаг CI возвращает ненулевой код выхода, сборка падает. Напишите функцию <code>exit_code(errors)</code>: если список ошибок пуст, она возвращает <code>0</code>, иначе <code>1</code>.</p>",
    "hints": [
     "Пустой список — это ложное значение: <code>1 if errors else 0</code>.",
     "Это значение потом передадим в <code>sys.exit(...)</code>."
    ],
    "check": {
     "tests": "assert exit_code([]) == 0, 'Нет ошибок → 0'\nassert exit_code(['auc төмендеді']) == 1 and exit_code(['a', 'b']) == 1, 'Есть ошибки → 1'"
    }
   },
   {
    "title": "Абсолютные пороги",
    "prompt": "<p>Напишите функцию <code>below_floor(metrics, floors)</code>: для каждой метрики из <code>floors</code>, значение которой ниже порога (или которой вообще нет в <code>metrics</code>), она возвращает её название, в порядке <code>floors</code>. Например, пороги <code>{'auc': 0.75, 'recall': 0.6}</code>.</p>",
    "hints": [
     "<code>for m, lo in floors.items():</code>.",
     "Даже если метрики нет, она попадает в список: <code>metrics.get(m) is None or metrics[m] &lt; lo</code>."
    ],
    "check": {
     "tests": "assert below_floor({'auc': 0.81, 'recall': 0.55}, {'auc': 0.75, 'recall': 0.6}) == ['recall'], 'recall 0.55 < 0.6'\nassert below_floor({'auc': 0.75, 'recall': 0.6}, {'auc': 0.75, 'recall': 0.6}) == [], 'Значение, равное порогу, проходит'\nassert below_floor({'auc': 0.7}, {'auc': 0.75, 'recall': 0.6}) == ['auc', 'recall'], 'Отсутствующая метрика тоже не проходит порог'"
    }
   },
   {
    "title": "Команды workflow",
    "prompt": "<p>Достаньте команды из файла GitHub Actions. Напишите функцию <code>run_commands(yaml_text)</code>: из каждой строки, которая начинается с <code>- run: </code> (пробелы в начале строки не учитываются), она берёт команду, убирает комментарий <code>#</code> в конце строки и возвращает список команд по порядку.</p>",
    "hints": [
     "Сделайте каждую строку <code>strip()</code>, затем проверьте <code>line.startswith('- run: ')</code>.",
     "Команда: <code>line[len(prefix):].split('#')[0].strip()</code>."
    ],
    "check": {
     "tests": "assert run_commands(workflow) == ['pip install -r requirements.txt', 'pytest tests/', 'python train.py --out metrics.json', 'python check_metrics.py metrics.json baseline.json'], f'Список команд неверен: {run_commands(workflow)}'\nassert run_commands('steps:\\n  - uses: actions/setup-python@v5\\n') == [], 'Строки uses не являются командами'"
    },
    "starter": "workflow = \"\"\"name: model-ci\non: [pull_request]\njobs:\n  train-and-check:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: pip install -r requirements.txt\n      - run: pytest tests/                      # юнит-тесты\n      - run: python train.py --out metrics.json\n      - run: python check_metrics.py metrics.json baseline.json\n\"\"\"\n\ndef run_commands(yaml_text):\n    return []\n"
   },
   {
    "title": "Метрики разного направления",
    "prompt": "<p>У некоторых метрик чем меньше, тем лучше (<code>logloss</code>, <code>rmse</code>). Напишите функцию <code>check(new, base, lower_better, max_drop=0.01)</code>: для каждой метрики из <code>base</code> она возвращает список сообщений об ошибках: метрики нет в <code>new</code>; метрика «чем больше, тем лучше» ниже <code>base - max_drop</code>; метрика «чем меньше, тем лучше» (из набора <code>lower_better</code>) выше <code>base + max_drop</code>. Сообщение начинается с имени метрики.</p>",
    "hints": [
     "Три ветки: метрики нет → метрика в <code>lower_better</code> → всё остальное.",
     "У метрики «чем меньше, тем лучше» порог обратный: <code>new[m] &gt; b + max_drop</code>."
    ],
    "check": {
     "tests": "_lb = {'logloss', 'rmse'}\nassert check({'auc': 0.83, 'logloss': 0.44}, {'auc': 0.83, 'logloss': 0.44}, _lb) == [], 'Изменений нет → []'\n_e = check({'auc': 0.82, 'logloss': 0.47}, {'auc': 0.83, 'logloss': 0.44}, _lb)\nassert len(_e) == 1 and _e[0].startswith('logloss'), f'auc упал на 0.01 (в пределах порога), logloss вырос на 0.03 → только ошибка по logloss. У вас {_e}'\nassert check({'auc': 0.85, 'logloss': 0.40}, {'auc': 0.83, 'logloss': 0.44}, _lb) == [], 'Оба улучшились → []'\n_e = check({'rmse': 120.0}, {'rmse': 100.0, 'r2': 0.8}, _lb, max_drop=5)\nassert [x.split(':')[0] for x in _e] == ['rmse', 'r2'], 'rmse вырос, r2 отсутствует'"
    }
   },
   {
    "title": "Проверка диапазонов",
    "prompt": "<p>Data-тест в CI: напишите функцию <code>range_violations(df, ranges)</code>. <code>ranges</code> — <code>{баған: (min, max)}</code>. Она возвращает имена столбцов, в которых есть хотя бы одно значение вне диапазона (границы разрешены), в порядке <code>ranges</code>; если самого столбца нет — <code>'missing:баған'</code>. Пустые значения (NaN) не учитываются.</p>",
    "hints": [
     "Уберите пустые значения: <code>df[col].dropna()</code>.",
     "Вне диапазона: <code>((values &lt; lo) | (values &gt; hi)).any()</code>."
    ],
    "check": {
     "tests": "assert range_violations(batch, RANGES) == ['tenure_months', 'support_calls', 'missing:age'], f'Ожидалось tenure_months, support_calls, missing:age. У вас {range_violations(batch, RANGES)}'\nassert range_violations(pd.DataFrame({'x': [0, 10]}), {'x': (0, 10)}) == [], 'Граничные значения разрешены'\nassert range_violations(pd.DataFrame({'x': [None, 5]}), {'x': (0, 10)}) == [], 'NaN не учитывается'"
    }
   },
   {
    "title": "Выполнение шагов CI",
    "prompt": "<p>Шаги в workflow идут по порядку, и если один упал, остальные не запускаются. Напишите функцию <code>run_pipeline(steps)</code>: <code>steps</code> — список пар <code>(атауы, функция)</code>, функция возвращает exit code. Вызывайте шаги по порядку; остановитесь на первом шаге, который вернул ненулевой код. Верните <code>{'status': 'passed' немесе 'failed', 'ran': іске қосылған қадамдар атаулары, 'failed_step': құлаған қадам немесе None}</code>.</p>",
    "hints": [
     "Добавьте название шага в <code>ran</code> до вызова.",
     "<code>if func() != 0: return {...}</code> — ранний возврат остановит остальные шаги."
    ],
    "check": {
     "tests": "_called = []\ndef _step(name, code):\n    def f():\n        _called.append(name)\n        return code\n    return name, f\n_r = run_pipeline([_step('pytest', 0), _step('validate_data', 0), _step('check_metrics', 1), _step('deploy', 0)])\nassert _r == {'status': 'failed', 'ran': ['pytest', 'validate_data', 'check_metrics'], 'failed_step': 'check_metrics'}, f'Результат неверен: {_r}'\nassert 'deploy' not in _called, 'После упавшего шага deploy не должен запускаться'\nassert run_pipeline([_step('a', 0), _step('b', 0)]) == {'status': 'passed', 'ran': ['a', 'b'], 'failed_step': None}, 'Все 0 → passed'\nassert run_pipeline([]) == {'status': 'passed', 'ran': [], 'failed_step': None}, 'Шагов нет → passed'"
    }
   },
   {
    "title": "Полная проверка CI",
    "prompt": "<p>Напишите функцию <code>ci_report(df, new, base)</code>: она объединяет data-тест и metric gate. Data: если нет столбца из <code>REQUIRED</code> → <code>'missing:баған'</code>; если <code>customer_id</code> повторяется → <code>'duplicate_id'</code>; если в <code>monthly_fee</code> есть отрицательное значение → <code>'negative_fee'</code>. Metric: если какой-то метрики из <code>base</code> нет в <code>new</code> или она ниже <code>base - 0.01</code> → <code>'metric:атауы'</code>; если <code>new['auc'] &lt; 0.75</code> → <code>'auc_floor'</code>. Если есть проблемы с данными, metric не проверяется (если данные плохие, метрикам не доверяем). Верните <code>(exit_code, messages)</code>.</p>",
    "hints": [
     "Напишите две отдельные функции: <code>data_problems(df)</code> и <code>metric_problems(new, base)</code>; <code>ci_report</code> объединит их.",
     "Повторяющийся id: <code>df['customer_id'].duplicated().any()</code>."
    ],
    "check": {
     "tests": "_good = pd.DataFrame({'customer_id': [1, 2, 3], 'monthly_fee': [4990, 0, 7500], 'tenure_months': [3, 12, 40]})\nassert ci_report(_good, {'auc': 0.83, 'recall': 0.70}, {'auc': 0.83, 'recall': 0.70}) == (0, []), 'Всё верно → (0, [])'\nassert ci_report(_good, {'auc': 0.80, 'recall': 0.70}, {'auc': 0.83, 'recall': 0.70}) == (1, ['metric:auc']), 'auc упал на 0.03'\nassert ci_report(_good, {'auc': 0.74}, {'auc': 0.745, 'recall': 0.6}) == (1, ['metric:recall', 'auc_floor']), 'recall отсутствует, auc ниже порога'\n_bad = pd.DataFrame({'customer_id': [1, 1, 3], 'monthly_fee': [4990, -10, 7500]})\nassert ci_report(_bad, {'auc': 0.5}, {'auc': 0.83}) == (1, ['missing:tenure_months', 'duplicate_id', 'negative_fee']), 'Если есть проблемы с данными, metric не проверяется'"
    }
   },
   {
    "title": "Обновление baseline",
    "prompt": "<p>После merge baseline обновляется, но только если сборка прошла. Напишите функцию <code>update_baseline(base, new, errors, lower_better=frozenset())</code>: если <code>errors</code> не пуст, она возвращает <b>копию</b> <code>base</code> без изменений. Если пуст — новый словарь: для каждой метрики из <code>base</code> берётся лучшее значение (для метрики «чем больше, тем лучше» — <code>max</code>, для метрик из <code>lower_better</code> — <code>min</code>; если метрики нет в <code>new</code>, старое значение остаётся), а также добавляются новые метрики из <code>new</code>. Исходный <code>base</code> не меняется.</p>",
    "hints": [
     "Всегда работайте с копией: <code>result = dict(base)</code>.",
     "Для каждой новой метрики три случая: новый ключ, «чем меньше, тем лучше» (<code>min</code>), «чем больше, тем лучше» (<code>max</code>)."
    ],
    "check": {
     "tests": "_b = {'auc': 0.83, 'logloss': 0.44}\n_r = update_baseline(_b, {'auc': 0.85, 'logloss': 0.46, 'recall': 0.7}, [], {'logloss'})\nassert _r == {'auc': 0.85, 'logloss': 0.44, 'recall': 0.7}, f'auc улучшился, logloss ухудшился (старое значение остаётся), recall добавлен. У вас {_r}'\nassert _b == {'auc': 0.83, 'logloss': 0.44}, 'base не должен меняться'\n_r2 = update_baseline(_b, {'auc': 0.9}, ['metric:recall'])\nassert _r2 == _b and _r2 is not _b, 'При ошибке копия base не меняется'\nassert update_baseline({'auc': 0.8, 'rmse': 10.0}, {'rmse': 8.0}, [], {'rmse'}) == {'auc': 0.8, 'rmse': 8.0}, 'Метрика, которой нет в new, сохраняется; rmse уменьшился'"
    }
   }
  ]
 },
 "ops-6": {
  "pr": [
   {
    "title": "Доля ошибок",
    "prompt": "<p>Напишите функцию <code>error_rate(statuses)</code>: она возвращает долю (0–1) кодов 500 и выше среди статус-кодов. Если список пуст, она возвращает <code>0.0</code>.</p>",
    "hints": [
     "<code>sum(1 for s in statuses if s &gt;= 500)</code> — количество ошибок сервера.",
     "404 — ошибка клиента, она не учитывается."
    ],
    "check": {
     "tests": "assert error_rate([200, 200, 503, 200, 500, 404, 200, 200]) == 0.25, 'Из 8 запросов 2 с 5xx → 0.25 (404 не считается)'\nassert error_rate([200] * 10) == 0.0, 'Ошибок нет → 0.0'\nassert error_rate([]) == 0.0, 'Пустой список → 0.0'"
    }
   },
   {
    "title": "Доля пустых значений",
    "prompt": "<p>Мы следим за качеством входных данных. В переменную <code>null_shares</code> запишите долю пустых значений в каждом столбце DataFrame <code>requests</code> (Series, <code>isna().mean()</code>), а в <code>bad_cols</code> — список столбцов, у которых доля больше 0.1.</p>",
    "hints": [
     "<code>requests.isna().mean()</code> — доля пустых значений каждого столбца.",
     "<code>[c for c, s in null_shares.items() if s &gt; 0.1]</code>."
    ],
    "check": {
     "tests": "assert null_shares is not None and abs(float(null_shares['monthly_fee']) - 0.3) < 1e-9 and abs(float(null_shares['city']) - 0.1) < 1e-9, 'null_shares: monthly_fee 0.3, city 0.1'\nassert bad_cols == ['monthly_fee'], f'Только monthly_fee больше 0.1 (tenure и city ровно 0.1). У вас {bad_cols}'"
    }
   },
   {
    "title": "Запросы по неделям",
    "prompt": "<p>В DataFrame <code>logs</code> у каждого запроса есть неделя. В переменную <code>weekly_counts</code> запишите число запросов в каждую неделю (Series, отсортированный по неделе), а в <code>drop_weeks</code> — список (int) недель, в которых число запросов упало в 2 раза и больше по сравнению с предыдущей неделей.</p>",
    "hints": [
     "Подсчёт: <code>logs.groupby('week').size()</code> (или <code>value_counts().sort_index()</code>).",
     "Сравните соседние недели: <code>zip(...values[:-1], ...values[1:])</code>, условие <code>cur * 2 &lt;= prev</code>."
    ],
    "check": {
     "tests": "assert weekly_counts is not None and [int(x) for x in weekly_counts.values] == [12, 11, 5, 10], 'weekly_counts: 12, 11, 5, 10'\nassert [int(x) for x in weekly_counts.index] == [1, 2, 3, 4], 'Отсортировано по неделе'\nassert drop_weeks == [3], f'Только 3-я неделя (11 → 5) упала вдвое. У вас {drop_weeks}'"
    }
   },
   {
    "title": "Правила alert",
    "prompt": "<p>Правила alert хранятся в словаре: <code>{alert атауы: (метрика, шек)}</code>; alert срабатывает, если метрика <b>выше</b> порога. Напишите функцию <code>fire_alerts(metrics, rules)</code>: она возвращает имена сработавших alert-ов в порядке <code>rules</code>. Если метрики нет в <code>metrics</code>, возвращается <code>'no_data:alert атауы'</code> (отсутствие данных — тоже проблема).</p>",
    "hints": [
     "<code>for name, (metric, limit) in rules.items():</code>.",
     "Сначала проверьте, есть ли метрика, затем <code>metrics[metric] &gt; limit</code>."
    ],
    "check": {
     "tests": "assert fire_alerts({'p95_ms': 420, 'error_rate': 0.01, 'max_psi': 0.31, 'proba_delta': 0.05}, RULES) == ['latency', 'drift'], 'latency 420 > 300, drift 0.31 > 0.25'\nassert fire_alerts({'p95_ms': 300, 'error_rate': 0.02, 'max_psi': 0.1, 'proba_delta': 0.1}, RULES) == [], 'Значение, равное порогу, — не alert'\nassert fire_alerts({'p95_ms': 100, 'error_rate': 0.05}, RULES) == ['errors', 'no_data:drift', 'no_data:proba_shift'], 'Для отсутствующих метрик — no_data:...'"
    }
   },
   {
    "title": "Новые категории",
    "prompt": "<p>В production могут появиться категории, которых модель не видела. Напишите функцию <code>new_categories(train, live)</code>: она возвращает отсортированный список значений, которые есть в <code>live</code>, но нет в <code>train</code> (пустые значения <code>None</code> не учитываются). Затем запишите в <code>unseen_share</code> долю таких значений в <code>live_cities</code> (0–1; пустые значения не считаются).</p>",
    "hints": [
     "Разность множеств: <code>{v for v in live if v is not None and v not in set(train)}</code>, затем <code>sorted</code>.",
     "Доля: количество новых категорий среди непустых значений / количество непустых значений."
    ],
    "check": {
     "tests": "assert new_categories(train_cities, live_cities) == sorted(['Қонаев', 'Түркістан']), f'Новые города: Қонаев, Түркістан (в порядке sorted). У вас {new_categories(train_cities, live_cities)}'\nassert new_categories(['a'], ['a', None]) == [], 'None не учитывается'\nassert unseen_share is not None and abs(float(unseen_share) - 3 / 8) < 1e-9, f'3 из 8 непустых значений — новые: 0.375, у вас {unseen_share}'"
    }
   },
   {
    "title": "p95 по неделям",
    "prompt": "<p>Из DataFrame <code>logs</code> запишите: в <code>weekly_p95</code> — 95-перцентиль <code>latency_ms</code> для каждой недели (<code>groupby</code> + <code>quantile(0.95)</code>), в <code>weekly_err</code> — долю <code>status &gt;= 500</code> в каждой неделе, в <code>bad_weeks</code> — отсортированный список недель (int), в которых p95 &gt; 300 <b>или</b> доля ошибок &gt; 0.02.</p>",
    "hints": [
     "<code>logs.groupby('week')['latency_ms'].quantile(0.95)</code>.",
     "Доля: <code>(logs['status'] &gt;= 500).groupby(logs['week']).mean()</code>."
    ],
    "check": {
     "tests": "assert weekly_p95 is not None and abs(float(weekly_p95.loc[2]) - logs[logs['week'] == 2]['latency_ms'].quantile(0.95)) < 1e-9, 'weekly_p95 = groupby(\"week\")[\"latency_ms\"].quantile(0.95)'\nassert weekly_err is not None and abs(float(weekly_err.loc[3]) - 0.1) < 1e-9 and float(weekly_err.loc[1]) == 0.0, 'weekly_err: в 3-й неделе 0.1, в 1-й 0'\nassert bad_weeks == [2, 3], f'2-я неделя (p95 > 300) и 3-я неделя (ошибки 10%). У вас {bad_weeks}'"
    }
   },
   {
    "title": "Усталость от alert-ов (alert fatigue)",
    "prompt": "<p>Если один alert повторяется каждые 5 минут, команда перестаёт его читать. Напишите функцию <code>dedupe_alerts(events, cooldown=60)</code>: <code>events</code> — список пар <code>(минут, alert атауы)</code> (отсортированных по времени). Если alert с тем же именем приходит раньше, чем через <code>cooldown</code> минут после последнего <b>отправленного</b> alert-а с этим именем, он подавляется. Верните <code>(sent, suppressed)</code>: список отправленных событий и количество подавленных (<code>suppressed</code>).</p>",
    "hints": [
     "Сохраняйте время последней отправки для каждого alert-а в словаре: <code>last_sent[name] = t</code>.",
     "Подавленное событие не обновляет <code>last_sent</code>."
    ],
    "check": {
     "tests": "_s, _n = dedupe_alerts(events)\nassert _s == [(0, 'latency'), (10, 'errors'), (61, 'latency'), (70, 'errors'), (130, 'latency')], f'Отправленные события неверны: {_s}'\nassert _n == 3, f'Количество подавленных — 3 (5, 30 для latency; 65 для errors), у вас {_n}'\nassert dedupe_alerts(events, cooldown=0) == (events, 0), 'При cooldown=0 отправляются все'\nassert dedupe_alerts([], 30) == ([], 0), 'Пустой список'"
    }
   },
   {
    "title": "Отчёт мониторинга",
    "prompt": "<p>Напишите функцию <code>monitor_report(logs, baseline_proba=0.25)</code>: <code>logs</code> — DataFrame со столбцами <code>latency_ms</code>, <code>status</code>, <code>proba</code>, <code>monthly_fee</code>. Функция возвращает словарь: <code>p95</code> — 95-перцентиль latency; <code>error_rate</code> — доля <code>status &gt;= 500</code>; <code>mean_proba</code> — среднее <code>proba</code> (без пустых значений); <code>fee_null</code> — доля пустых значений <code>monthly_fee</code> (округлённая до 3 знаков, float); <code>alerts</code> — список alert-ов: <code>'latency'</code> (p95 &gt; 300), <code>'errors'</code> (&gt; 0.02), <code>'proba_shift'</code> (|mean_proba − baseline| &gt; 0.1), <code>'nulls'</code> (fee_null &gt; 0.05), в таком порядке. Пороги сравниваются с неокруглёнными значениями.</p>",
    "hints": [
     "Считайте каждую метрику в отдельной переменной, проверьте alert-ы и округляйте только в конце.",
     "Метод pandas <code>.mean()</code> сам пропускает NaN."
    ],
    "check": {
     "tests": "_r = monitor_report(logs)\nassert set(_r) == {'p95', 'error_rate', 'mean_proba', 'fee_null', 'alerts'}, f'Ключи: p95, error_rate, mean_proba, fee_null, alerts. У вас {sorted(_r)}'\nassert _r['p95'] == round(float(logs['latency_ms'].quantile(0.95)), 3) and _r['error_rate'] == 0.1, 'p95 и error_rate неверны'\nassert _r['mean_proba'] == 0.394 and _r['fee_null'] == 0.2, f'mean_proba ≈ 0.394 (без NaN), fee_null = 0.2. У вас {_r[\"mean_proba\"]}, {_r[\"fee_null\"]}'\nassert _r['alerts'] == ['latency', 'errors', 'proba_shift', 'nulls'], f'Все четыре alert-а срабатывают, у вас {_r[\"alerts\"]}'\nassert monitor_report(logs, baseline_proba=0.4)['alerts'] == ['latency', 'errors', 'nulls'], 'При baseline_proba=0.4 proba_shift отсутствует'\n_ok = pd.DataFrame({'latency_ms': [100, 110], 'status': [200, 200], 'proba': [0.2, 0.3], 'monthly_fee': [1, 2]})\nassert monitor_report(_ok)['alerts'] == [], 'На нормальных данных alert-ов нет'"
    }
   }
  ]
 },
 "ops-7": {
  "pr": [
   {
    "title": "Одно слагаемое PSI",
    "prompt": "<p>Напишите функцию <code>psi_term(actual, expected)</code>: для одного bin она возвращает слагаемое PSI <code>(actual - expected) * ln(actual / expected)</code> (через <code>np.log</code>). Например, <code>psi_term(0.05, 0.25)</code> ≈ <code>0.3219</code>.</p>",
    "hints": [
     "<code>np.log</code> — натуральный логарифм (ln).",
     "Формула: <code>(actual - expected) * np.log(actual / expected)</code>."
    ],
    "check": {
     "tests": "assert abs(psi_term(0.05, 0.25) - 0.3219) < 1e-4, 'psi_term(0.05, 0.25) ≈ 0.3219'\nassert abs(psi_term(0.25, 0.25)) < 1e-12, 'При равных долях 0'\nassert psi_term(0.5, 0.25) > 0 and psi_term(0.1, 0.25) > 0, 'Слагаемое PSI никогда не отрицательно'"
    }
   },
   {
    "title": "Уровень PSI",
    "prompt": "<p>Напишите функцию <code>psi_level(psi)</code>: PSI &lt; 0.1 → <code>'stable'</code>, 0.1 ≤ PSI ≤ 0.25 → <code>'moderate'</code>, PSI &gt; 0.25 → <code>'strong'</code>.</p>",
    "hints": [
     "Проверяйте пороги по порядку: сначала <code>&lt; 0.1</code>, затем <code>&lt;= 0.25</code>.",
     "Остальное — <code>'strong'</code>."
    ],
    "check": {
     "tests": "assert psi_level(0.02) == 'stable' and psi_level(0.099) == 'stable', '< 0.1 → stable'\nassert psi_level(0.1) == 'moderate' and psi_level(0.25) == 'moderate', '0.1 и 0.25 → moderate'\nassert psi_level(0.2501) == 'strong' and psi_level(0.56) == 'strong', '> 0.25 → strong'"
    }
   },
   {
    "title": "Нижняя граница для долей",
    "prompt": "<p>В пустом bin <code>ln(0)</code> стал бы бесконечным. Напишите функцию <code>apply_floor(props, floor=0.001)</code>: она возвращает новый список, в котором каждая доля не меньше <code>floor</code> (<code>max(p, floor)</code>).</p>",
    "hints": [
     "<code>[max(p, floor) for p in props]</code>.",
     "Или numpy: <code>np.maximum(props, floor)</code>."
    ],
    "check": {
     "tests": "assert apply_floor([0.0, 0.3, 0.7]) == [0.001, 0.3, 0.7], 'apply_floor([0.0, 0.3, 0.7]) должна вернуть [0.001, 0.3, 0.7]'\nassert apply_floor([0.0005, 0.2], floor=0.01) == [0.01, 0.2], 'Параметр floor должен учитываться'\n_p = [0.0, 1.0]\napply_floor(_p)\nassert _p == [0.0, 1.0], 'Входной список не должен меняться'"
    }
   },
   {
    "title": "PSI по долям",
    "prompt": "<p>Напишите функцию <code>psi_from_props(expected, actual, floor=0.001)</code>: по двум спискам долей она возвращает PSI (с полом для обоих списков и суммой всех слагаемых по bin-ам). Затем <code>psi_example</code> — пример из урока: reference <code>[0.25, 0.25, 0.25, 0.25]</code>, новое <code>[0.05, 0.15, 0.30, 0.50]</code>; <code>psi_empty</code> — reference <code>[0.4, 0.4, 0.2]</code>, новое <code>[0.5, 0.5, 0.0]</code>.</p>",
    "hints": [
     "С массивами numpy: <code>e = np.maximum(np.array(expected), floor)</code>.",
     "PSI: <code>np.sum((a - e) * np.log(a / e))</code>."
    ],
    "check": {
     "tests": "assert psi_example is not None and abs(float(psi_example) - 0.5554) < 0.001, f'psi_example должен быть ≈ 0.555, у вас {psi_example}'\nassert psi_empty is not None and abs(float(psi_empty) - 1.099) < 0.002, f'Если поставить пол пустому bin-у, psi_empty ≈ 1.099, у вас {psi_empty}'\nassert abs(psi_from_props([0.3, 0.7], [0.3, 0.7])) < 1e-12, 'При одинаковых долях 0'"
    }
   },
   {
    "title": "Категориальный PSI",
    "prompt": "<p>Для категориального признака bin — это сама категория. Напишите функцию <code>cat_psi(ref, cur, floor=0.001)</code>: по <b>всем</b> категориям двух выборок (объединённое множество) вычислите доли (через <code>value_counts(normalize=True)</code> или вручную), поставьте пол и верните PSI. Затем <code>psi_tariff</code> — PSI для <code>ref_tariff</code> и <code>cur_tariff</code>.</p>",
    "hints": [
     "Категории: <code>sorted(set(ref) | set(cur))</code>; доли: <code>value_counts(normalize=True).reindex(cats, fill_value=0)</code>.",
     "Новая категория (Жастар) в reference равна 0, поэтому нужен пол."
    ],
    "check": {
     "tests": "assert psi_tariff is not None and abs(float(psi_tariff) - 0.5371) < 0.002, f'psi_tariff должен быть ≈ 0.537 (Жастар — новая категория), у вас {psi_tariff}'\nassert abs(cat_psi(['a', 'b'], ['b', 'a'])) < 1e-12, 'При одинаковом распределении 0'\nassert cat_psi(['a'] * 9 + ['b'], ['a'] * 5 + ['b'] * 5) > 0.25, 'Сильное изменение > 0.25'"
    }
   },
   {
    "title": "Bin-ы по квантилям",
    "prompt": "<p>Границы bin-ов удобно брать из квантилей reference: тогда в каждом bin-е будет примерно одинаковая доля reference. Напишите функцию <code>quantile_bins(ref, n=4)</code>: возьмите внутренние границы <code>np.quantile(ref, [1/n, 2/n, ..., (n-1)/n])</code>, добавьте в начало <code>-np.inf</code>, в конец <code>np.inf</code> и верните список (<code>n + 1</code> границ). Затем <code>props</code> — доли значений <code>cur</code> в этих bin-ах (<code>bins[i] &lt;= v &lt; bins[i+1]</code>).</p>",
    "hints": [
     "Внутренние квантили: <code>np.quantile(ref, [i / n for i in range(1, n)])</code>.",
     "Доли: <code>((a &gt;= bins[i]) &amp; (a &lt; bins[i+1])).mean()</code>."
    ],
    "check": {
     "tests": "import numpy as _np\n_b = quantile_bins(ref)\nassert len(_b) == 5 and _b[0] == -_np.inf and _b[-1] == _np.inf, 'n=4 → 5 границ, по краям -inf и inf'\nassert [round(x, 1) for x in _b[1:-1]] == [round(float(q), 1) for q in _np.quantile(ref, [0.25, 0.5, 0.75])], 'Внутренние границы — квантили reference'\nassert len(quantile_bins(ref, n=10)) == 11, 'n=10 → 11 границ'\nassert props is not None and [round(p, 2) for p in props] == [0.05, 0.15, 0.25, 0.55], f'Доли cur: 0.05, 0.15, 0.25, 0.55. У вас {props}'"
    }
   },
   {
    "title": "Отчёт о drift по признакам",
    "prompt": "<p>Напишите функцию <code>drift_report(ref_df, cur_df, n_bins=4, floor=0.001)</code>: для каждого числового столбца <code>ref_df</code> постройте bin-ы по квантилям reference (с краями <code>-inf</code> и <code>inf</code>), посчитайте PSI и верните словарь <code>{баған: (psi 3 таңбаға дөңгелектенген, деңгей)}</code>. Уровень: &lt; 0.1 → <code>'stable'</code>, ≤ 0.25 → <code>'moderate'</code>, иначе → <code>'strong'</code>. Затем вызовите <code>report = drift_report(ref_df, cur_df)</code>.</p>",
    "hints": [
     "Цикл по столбцам: для каждого — квантильные bin-ы → доли → PSI → уровень.",
     "Используйте функции из прошлых заданий: <code>bin_props</code>, <code>psi</code> и функцию уровня — как вспомогательные."
    ],
    "check": {
     "tests": "import numpy as _np\nassert report is not None and set(report) == {'monthly_fee', 'tenure_months', 'support_calls'}, 'Для каждого столбца должна быть запись'\nassert report['monthly_fee'][1] == 'strong' and report['monthly_fee'][0] > 0.25, f'monthly_fee сильно изменился (среднее 7500 → 9500): strong. У вас {report[\"monthly_fee\"]}'\nassert report['tenure_months'][1] == 'stable', f'tenure_months не изменился: stable. У вас {report[\"tenure_months\"]}'\n_e = _np.quantile(ref_df['support_calls'], [0.25, 0.5, 0.75])\n_bins = [-_np.inf] + list(_e) + [_np.inf]\n_pe = _np.maximum([((ref_df['support_calls'] >= _bins[i]) & (ref_df['support_calls'] < _bins[i + 1])).mean() for i in range(4)], 0.001)\n_pa = _np.maximum([((cur_df['support_calls'] >= _bins[i]) & (cur_df['support_calls'] < _bins[i + 1])).mean() for i in range(4)], 0.001)\nassert report['support_calls'][0] == round(float(_np.sum((_pa - _pe) * _np.log(_pa / _pe))), 3), 'Значение PSI для support_calls неверно (квантильные bin-ы, пол 0.001)'\n_same = drift_report(ref_df, ref_df)\nassert all(v == (0.0, 'stable') for v in _same.values()), 'Сравнение с самим собой — у всех (0.0, stable)'"
    }
   },
   {
    "title": "Признаки дрейфа по KS",
    "prompt": "<p><code>ks_stat(a, b)</code> — наибольшая разница CDF двух выборок (без scipy: максимум разности <code>(a &lt;= v).mean()</code> и <code>(b &lt;= v).mean()</code> по объединённым значениям). Напишите функцию <code>ks_flags(ref_df, cur_df, threshold=0.2)</code>: она возвращает <code>{баған: D (3 таңба)}</code> для числовых столбцов, у которых KS-статистика больше <code>threshold</code>, в порядке убывания D. Категориальные (нечисловые) столбцы пропускаются.</p>",
    "hints": [
     "Числовой ли столбец: <code>pd.api.types.is_numeric_dtype(ref_df[col])</code>.",
     "Словарь в порядке убывания: <code>dict(sorted(found.items(), key=lambda kv: kv[1], reverse=True))</code>."
    ],
    "check": {
     "tests": "assert abs(ks_stat([1, 2, 3, 4], [5, 6, 7, 8]) - 1.0) < 1e-9 and abs(ks_stat([1, 2, 3], [1, 2, 3])) < 1e-9, 'ks_stat: если не перекрываются — 1, если одинаковы — 0'\n_f = ks_flags(ref_df, cur_df)\nassert list(_f) == ['monthly_fee', 'support_calls'], f'Признаки дрейфа: monthly_fee, support_calls (в порядке убывания D). У вас {list(_f)}'\nassert _f['monthly_fee'] == 0.6 and _f['support_calls'] == 0.3, f'Значения D: monthly_fee 0.6, support_calls 0.3. У вас {_f}'\nassert 'city' not in _f and 'tenure_months' not in _f, 'city — категориальный, tenure_months не изменился'\nassert ks_flags(ref_df, cur_df, threshold=0.5) == {'monthly_fee': 0.6}, 'Параметр threshold должен учитываться'"
    }
   }
  ]
 },
 "ops-8": {
  "pr": [
   {
    "title": "Пора ли переобучать?",
    "prompt": "<p>Scheduled retraining: напишите функцию <code>retrain_due(days_since_train, period=30)</code>: если с последнего обучения прошло <code>period</code> или больше дней, она возвращает <code>True</code>.</p>",
    "hints": [
     "Не забудьте про границу: ровно 30 дней тоже достаточно.",
     "<code>days_since_train &gt;= period</code>."
    ],
    "check": {
     "tests": "assert retrain_due(30) is True and retrain_due(45) is True, '30 и 45 дней → True'\nassert retrain_due(29) is False, '29 дней → False'\nassert retrain_due(7, period=7) is True and retrain_due(6, period=7) is False, 'Параметр period должен учитываться'"
    }
   },
   {
    "title": "Тип drift",
    "prompt": "<p>Напишите функцию <code>drift_type(px_changed, pyx_changed, py_changed)</code>: если P(y|X) изменилось → <code>'concept'</code> (самый опасный, проверяется первым); иначе если P(X) изменилось → <code>'data'</code>; иначе если P(y) изменилось → <code>'label'</code>; если ничего не изменилось → <code>'none'</code>.</p>",
    "hints": [
     "Порядок условий важен: сначала <code>pyx_changed</code>.",
     "В каждом условии сразу <code>return</code>."
    ],
    "check": {
     "tests": "assert drift_type(True, False, False) == 'data', 'Только P(X) изменилось → data'\nassert drift_type(True, True, True) == 'concept' and drift_type(False, True, False) == 'concept', 'P(y|X) изменилось → concept'\nassert drift_type(False, False, True) == 'label', 'Только P(y) → label'\nassert drift_type(False, False, False) == 'none', 'Ничего не изменилось → none'"
    }
   },
   {
    "title": "Label shift",
    "prompt": "<p>Доля churn выросла с 8% до 20%: это label shift. Напишите функцию <code>label_shift(old_labels, new_labels, tol=0.05)</code>: сравните долю единиц (среднее) в двух периодах, и если разница (по модулю) больше <code>tol</code>, верните <code>True</code>.</p>",
    "hints": [
     "Доля: <code>sum(labels) / len(labels)</code>.",
     "Условие: <code>abs(new_rate - old_rate) &gt; tol</code>."
    ],
    "check": {
     "tests": "assert label_shift([1] * 8 + [0] * 92, [1] * 20 + [0] * 80) is True, '8% → 20%: label shift'\nassert label_shift([1] * 8 + [0] * 92, [1] * 10 + [0] * 90) is False, '8% → 10%: разница 0.02 ≤ 0.05'\nassert label_shift([1, 0], [1, 1, 0, 0], tol=0.0) is False and label_shift([0, 0, 0, 1], [0, 1], tol=0.2) is True, 'Параметр tol должен учитываться'"
    }
   },
   {
    "title": "AUC за последние недели",
    "prompt": "<p>Когда приходят label-ы, мы считаем AUC каждую неделю. Одна плохая неделя может быть шумом, поэтому смотрим среднее за несколько последних недель. Напишите функцию <code>performance_drop(weekly_auc, baseline, tol=0.03, last=3)</code>: если среднее AUC за последние <code>last</code> недель строго ниже <code>baseline - tol</code>, она возвращает <code>True</code>. Если недель меньше <code>last</code>, она возвращает <code>False</code>.</p>",
    "hints": [
     "Последние недели: <code>weekly_auc[-last:]</code>.",
     "Среднее: <code>sum(recent) / last</code>."
    ],
    "check": {
     "tests": "assert performance_drop([0.84, 0.83, 0.79, 0.80, 0.78], 0.84) is True, 'Среднее трёх последних недель 0.79 < 0.81'\nassert performance_drop([0.84, 0.83, 0.84, 0.76, 0.83], 0.84) is False, 'Одна плохая неделя (0.76) не опускает среднее ниже 0.81'\nassert performance_drop([0.70, 0.70], 0.84) is False, 'Недель недостаточно → False'\nassert performance_drop([0.80, 0.80], 0.84, last=2) is True, 'Параметр last должен учитываться'"
    }
   },
   {
    "title": "Количество новых label-ов",
    "prompt": "<p>Для триггера «по объёму данных» считаем label-ы, пришедшие после последнего обучения. В DataFrame <code>labels</code> есть столбец <code>label_date</code> (текст вида <code>'2024-03-15'</code>). Напишите функцию <code>new_label_count(labels, last_train)</code>: она возвращает число строк, у которых <code>label_date</code> <b>позже</b> (строго) <code>last_train</code> (даты ISO можно сравнивать как текст). Затем <code>volume_trigger</code> — верно ли, что это число не меньше <code>MIN_LABELS</code>.</p>",
    "hints": [
     "<code>(labels['label_date'] &gt; last_train).sum()</code>.",
     "Даты в формате ISO верно сравниваются и как текст."
    ],
    "check": {
     "tests": "assert new_label_count(labels, '2024-03-02') == 6, 'last_train = 2024-03-02: последующих label-ов 6 (сами эти даты не входят)'\nassert new_label_count(labels, '2024-03-15') == 0 and new_label_count(labels, '2024-01-01') == 10, 'Граничные случаи неверны'\nassert volume_trigger is True or volume_trigger == True, '6 ≥ MIN_LABELS: volume_trigger True'"
    }
   },
   {
    "title": "Этапы retraining",
    "prompt": "<p>После обучения новая модель проходит защитные этапы. Напишите функцию <code>guard(new_auc, prod_auc, data_ok, shadow_ok, min_gain=0.005)</code>: она возвращает последний этап, которого достигла модель: <code>data_ok</code> False → <code>'blocked'</code>; <code>new_auc &lt; prod_auc + min_gain</code> → <code>'rejected'</code>; если проверка shadow mode не пройдена (<code>shadow_ok</code> False) → <code>'staging'</code> (остаётся в staging); если всё пройдено → <code>'production'</code>.</p>",
    "hints": [
     "Проверки по порядку: данные → метрика → shadow mode.",
     "При каждой неудачной проверке сразу <code>return</code>."
    ],
    "check": {
     "tests": "assert guard(0.90, 0.83, False, True) == 'blocked', 'Данные плохие → blocked'\nassert guard(0.832, 0.83, True, True) == 'rejected', 'Прирост +0.002 недостаточен → rejected'\nassert guard(0.85, 0.83, True, False) == 'staging', 'Shadow mode не пройден → staging'\nassert guard(0.85, 0.83, True, True) == 'production', 'Все пройдены → production'\nassert guard(0.85, 0.83, True, True, min_gain=0.05) == 'rejected', 'Параметр min_gain должен учитываться'"
    }
   },
   {
    "title": "Внезапно или постепенно",
    "prompt": "<p>Напишите функцию <code>classify_drift(weekly_auc, jump=0.05, total=0.03)</code>: по списку недельных AUC определите тип concept drift. Если какое-либо падение между двумя соседними неделями больше <code>jump</code> → <code>('sudden', апта индексі)</code> (индекс недели, в которой такое падение впервые произошло); иначе, если общее падение между первой и последней неделями больше <code>total</code> → <code>('gradual', None)</code>; иначе <code>('none', None)</code>.</p>",
    "hints": [
     "Соседние недели: <code>for i in range(1, len(weekly_auc)):</code>, падение <code>weekly_auc[i - 1] - weekly_auc[i]</code>.",
     "Только если резкого падения не нашлось, проверьте общую разницу."
    ],
    "check": {
     "tests": "assert classify_drift([0.84, 0.84, 0.83, 0.76, 0.75]) == ('sudden', 3), 'Новый тариф: падение 0.07 в 3-й неделе → sudden, 3'\nassert classify_drift([0.84, 0.83, 0.82, 0.81, 0.80]) == ('gradual', None), 'По 0.01 каждую неделю: общее 0.04 → gradual'\nassert classify_drift([0.84, 0.83, 0.84, 0.82]) == ('none', None), 'Общее 0.02 → none'\nassert classify_drift([0.9, 0.8, 0.7], jump=0.2) == ('gradual', None), 'Параметр jump должен учитываться'\nassert classify_drift([]) == ('none', None), 'Пустой список → none'"
    }
   },
   {
    "title": "Симуляция retraining",
    "prompt": "<p>В течение года мы каждую неделю проводим мониторинг. Напишите функцию <code>simulate(weeks)</code>: <code>weeks</code> — список словарей вида <code>{'max_psi', 'auc', 'labels'}</code> для каждой недели. Состояние: <code>days</code> (дней с последнего обучения, в начале 0) и <code>new_labels</code> (в начале 0). В каждой неделе сначала выполните <code>days += 7</code>, <code>new_labels += labels</code>; затем проверяется trigger: <code>days &gt;= 28</code>, <code>BASELINE - auc &gt; 0.03</code>, <code>max_psi &gt; 0.25</code> или <code>new_labels &gt;= 5000</code>. Если выполнено хотя бы одно, происходит retraining: индекс недели (с 0) добавляется в результат, <code>days</code> и <code>new_labels</code> обнуляются. Верните индексы недель, в которых был retraining.</p>",
    "hints": [
     "В каждой неделе: обновить состояние → проверить trigger → при необходимости retraining и сброс состояния.",
     "Несколько условий объедините через <code>or</code>; строку можно разбить на несколько строк в скобках."
    ],
    "check": {
     "tests": "assert simulate(weeks) == [2, 5, 9], f'Недели retraining: 2 (drift), 5 (auc 0.80 и 5000 label), 9 (28 дней). У вас {simulate(weeks)}'\nassert simulate([{'max_psi': 0.0, 'auc': 0.84, 'labels': 0}] * 8) == [3, 7], 'Только по сроку: каждые 4 недели (3, 7)'\nassert simulate([{'max_psi': 0.0, 'auc': 0.84, 'labels': 2500}] * 3) == [1], '5000 label набирается на второй неделе'\nassert simulate([]) == [], 'Недель нет → []'"
    }
   }
  ]
 },
 "deng-1": {
  "pr": [
   {
    "title": "Объём одного столбца",
    "prompt": "<p>Таблица занимает 600 GB, в ней 150 столбцов одинакового размера. Напишите функцию <code>col_gb(total_gb, n_cols)</code>: она возвращает объём одного столбца. Затем <code>scan_gb</code> — объём, который сканируется в column-store для чтения 6 столбцов.</p>",
    "hints": [
     "Один столбец: <code>total_gb / n_cols</code>.",
     "Column-store читает только нужные столбцы: <code>col_gb(600, 150) * 6</code>."
    ],
    "check": {
     "tests": "assert col_gb(600, 150) == 4 and col_gb(400, 200) == 2, 'col_gb(600, 150) = 4 GB'\nassert scan_gb is not None and abs(float(scan_gb) - 24) < 1e-9, '6 столбцов × 4 GB = 24 GB'"
    }
   },
   {
    "title": "Тип запроса",
    "prompt": "<p>Напишите функцию <code>query_kind(sql)</code>: если в запросе (без учёта регистра) есть <code>group by</code> или один из агрегатов <code>sum(</code>, <code>count(</code>, <code>avg(</code>, она возвращает <code>'OLAP'</code>, иначе <code>'OLTP'</code>.</p>",
    "hints": [
     "Сначала <code>s = sql.lower()</code>.",
     "<code>any(k in s for k in ('group by', 'sum(', 'count(', 'avg('))</code>."
    ],
    "check": {
     "tests": "assert query_kind('SELECT city, SUM(amount) FROM orders GROUP BY city') == 'OLAP', 'GROUP BY есть → OLAP'\nassert query_kind('SELECT * FROM orders WHERE order_id = 101') == 'OLTP', 'Чтение одной строки → OLTP'\nassert query_kind('select count(*) from events') == 'OLAP', 'count( → OLAP'\nassert query_kind(\"UPDATE orders SET status = 'paid' WHERE order_id = 7\") == 'OLTP', 'UPDATE → OLTP'"
    }
   },
   {
    "title": "Коэффициент сжатия",
    "prompt": "<p>Column-store хорошо сжимает похожие значения в одном столбце. Напишите функцию <code>compression(raw_gb, stored_gb)</code>: она возвращает коэффициент сжатия (<code>raw_gb / stored_gb</code>), округлённый до 1 знака. Затем <code>saved_gb</code> — объём, который экономится при сжатии 500 GB данных в 8 раз.</p>",
    "hints": [
     "Коэффициент: <code>round(raw_gb / stored_gb, 1)</code>.",
     "При сжатии в 8 раз останется 500 / 8 = 62.5 GB."
    ],
    "check": {
     "tests": "assert compression(120, 15) == 8.0, 'compression(120, 15) = 8.0'\nassert compression(100, 30) == 3.3, 'Округлите результат до 1 знака'\nassert saved_gb is not None and abs(float(saved_gb) - 437.5) < 1e-9, 'saved_gb = 500 - 62.5 = 437.5'"
    }
   },
   {
    "title": "Чтение строк или столбцов",
    "prompt": "<p>Напишите функцию <code>read_gb(total_gb, n_cols, needed, store)</code>: если <code>store == 'row'</code>, она возвращает полный объём таблицы; если <code>'column'</code>, только объём <code>needed</code> столбцов (столбцы одинакового размера); для другого значения выбрасывает <code>ValueError</code>. Если <code>needed</code> меньше 0 или больше <code>n_cols</code>, тоже выбрасывает <code>ValueError</code>.</p>",
    "hints": [
     "Сначала проверьте <code>needed</code>, затем ветвитесь по <code>store</code>.",
     "Column: <code>total_gb / n_cols * needed</code>."
    ],
    "check": {
     "tests": "assert read_gb(400, 200, 4, 'row') == 400, 'Row-store читает всю таблицу'\nassert read_gb(400, 200, 4, 'column') == 8, 'Column-store, 4 столбца: 8 GB'\nfor _a in [(400, 200, 4, 'csv'), (400, 200, 201, 'column'), (400, 200, -1, 'row')]:\n    try:\n        read_gb(*_a)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f'read_gb{_a} ValueError лақтыруы керек')"
    }
   },
   {
    "title": "Строки в столбцы",
    "prompt": "<p>Row-store хранит данные по строкам, column-store — по столбцам. Напишите функцию <code>to_columns(rows)</code>: она превращает список словарей в словарь вида <code>{баған: мәндер тізімі}</code> (столбцы в порядке ключей первой строки). Для пустого списка она возвращает <code>{}</code>.</p>",
    "hints": [
     "Столбцы: ключи <code>rows[0]</code>.",
     "<code>{col: [r[col] for r in rows] for col in rows[0]}</code>."
    ],
    "check": {
     "tests": "assert to_columns(rows) == {'order_id': [101, 102, 103], 'city': ['Алматы', 'Астана', 'Алматы'], 'amount': [29800, 117500, 13500]}, 'to_columns(rows) неверен'\nassert list(to_columns(rows)) == ['order_id', 'city', 'amount'], 'Порядок столбцов сохраняется'\nassert to_columns([]) == {}, 'Пустой список → {}'"
    }
   },
   {
    "title": "Агрегат по столбцам",
    "prompt": "<p>В column-store запрос читает только нужные столбцы. <code>columns</code> — словарь вида <code>{баған: мәндер}</code>. Напишите функцию <code>revenue_by(columns, key, value)</code>: используя только списки <code>columns[key]</code> и <code>columns[value]</code>, она возвращает словарь с суммой <code>value</code> по <code>key</code>. Затем выполните <code>by_city = revenue_by(columns, 'city', 'amount')</code>.</p>",
    "hints": [
     "Пройдите по парам двух столбцов: <code>for k, v in zip(columns[key], columns[value]):</code>.",
     "<code>result[k] = result.get(k, 0) + v</code>."
    ],
    "check": {
     "tests": "assert by_city == {'Алматы': 58200, 'Астана': 201500, 'Шымкент': 18900}, f'by_city неверен: {by_city}'\nclass _Spy(dict):\n    def __init__(self, d):\n        super().__init__(d)\n        self.read = set()\n    def __getitem__(self, k):\n        self.read.add(k)\n        return dict.__getitem__(self, k)\n_s = _Spy(columns)\nassert revenue_by(_s, 'status', 'amount') == {'paid': 181100, 'cancelled': 13500, 'pending': 84000}, 'Должно работать и по status'\nassert _s.read == {'status', 'amount'}, f'Читайте только два столбца (как в column-store), у вас прочитаны столбцы: {sorted(_s.read)}'"
    }
   },
   {
    "title": "Объём сканирования",
    "prompt": "<p>В реальной таблице размеры столбцов разные. Напишите функцию <code>scan_plan(col_sizes, query_cols)</code>: <code>col_sizes</code> — словарь вида <code>{баған: GB}</code>. Она возвращает словарь: <code>row_gb</code> — сумма всех столбцов; <code>col_gb</code> — сумма только столбцов запроса; <code>speedup</code> — <code>row_gb / col_gb</code>, округлённое до 1 знака. Если в запросе есть столбец, которого нет в таблице, она выбрасывает <code>KeyError</code> с именами этих столбцов. Затем выполните <code>plan = scan_plan(SIZES, ['city', 'amount_tg', 'dt'])</code>.</p>",
    "hints": [
     "Сначала соберите отсутствующие столбцы; если отсутствующих нет, <code>raise KeyError(...)</code>.",
     "<code>col_gb = sum(col_sizes[c] for c in query_cols)</code>."
    ],
    "check": {
     "tests": "assert plan == {'row_gb': 501.5, 'col_gb': 13.5, 'speedup': 37.1}, f'plan неверен: {plan}'\nassert scan_plan(SIZES, ['raw_json'])['speedup'] == 1.7, 'Если читать большой столбец, column-store мало помогает'\ntry:\n    scan_plan(SIZES, ['city', 'price', 'qty'])\nexcept KeyError as _e:\n    assert 'price' in str(_e) and 'qty' in str(_e), 'В сообщении должны быть названия всех отсутствующих столбцов'\nelse:\n    raise AssertionError('Жоқ баған үшін KeyError')"
    }
   },
   {
    "title": "Из OLTP в OLAP-таблицу",
    "prompt": "<p>По строкам заказов из OLTP (<code>deng_orders.csv</code>, <code>deng_products.csv</code>) создайте ежедневную агрегатную таблицу для OLAP. DataFrame <code>daily</code>: столбцы <code>order_date</code>, <code>orders</code> (число заказов), <code>items</code> (сумма <code>qty</code>), <code>revenue</code> (сумма <code>qty * price_tg</code>); отсортирована по <code>order_date</code>, индекс с 0. Затем в <code>best_day</code> — день с наибольшей выручкой (текст).</p>",
    "hints": [
     "Несколько агрегатов в одном <code>groupby</code>: <code>.agg(orders=('order_id', 'count'), items=('qty', 'sum'), revenue=('revenue', 'sum'))</code>.",
     "Самая большая выручка: <code>daily.loc[daily['revenue'].idxmax(), 'order_date']</code>."
    ],
    "check": {
     "tests": "import pandas as _pd\n_o = _pd.read_csv('deng_orders.csv')\n_c = _pd.read_csv('deng_customers.csv')\n_p = _pd.read_csv('deng_products.csv')\n_m = _o.merge(_c, on='customer_id').merge(_p, on='product_id')\n_m['revenue'] = _m['qty'] * _m['price_tg']\n\nassert daily is not None and list(daily.columns) == ['order_date', 'orders', 'items', 'revenue'], f\"Столбцы: order_date, orders, items, revenue. У вас {None if daily is None else list(daily.columns)}\"\nassert list(daily['order_date']) == sorted(_o['order_date'].unique()) and list(daily.index) == list(range(len(daily))), 'Сортировка по дате, индекс с 0'\nassert [int(x) for x in daily['orders']] == [2] * 6 and int(daily['items'].sum()) == int(_o['qty'].sum()), 'orders — ежедневное число заказов, items — сумма qty'\nassert int(daily['revenue'].sum()) == 600400 and int(daily.loc[daily['order_date'] == '2024-03-04', 'revenue'].iloc[0]) == 153500, 'revenue неверен (2024-03-04 → 153 500 ₸)'\nassert best_day == '2024-03-04', f'Самый большой доход — в день 2024-03-04, у вас {best_day}'"
    }
   }
  ]
 },
 "deng-2": {
  "pr": [
   {
    "title": "Построение пути партиции",
    "prompt": "<p>Напишите функцию <code>partition_path(bucket, table, dt, part=0)</code>: она возвращает путь к файлу в lake: <code>s3://&lt;bucket&gt;/&lt;table&gt;/dt=&lt;dt&gt;/part-&lt;part&gt;.parquet</code>, где <code>part</code> — трёхзначное число (<code>0</code> → <code>000</code>, <code>12</code> → <code>012</code>).</p>",
    "hints": [
     "Трёхзначное число в f-строке: <code>{part:03d}</code>.",
     "Образец: <code>f's3://{bucket}/{table}/dt={dt}/part-{part:03d}.parquet'</code>."
    ],
    "check": {
     "tests": "assert partition_path('dala', 'events', '2024-03-01') == 's3://dala/events/dt=2024-03-01/part-000.parquet', 'По умолчанию part=0 → part-000'\nassert partition_path('dala', 'orders', '2024-03-02', 12) == 's3://dala/orders/dt=2024-03-02/part-012.parquet', 'part=12 → part-012'"
    }
   },
   {
    "title": "Формат файла",
    "prompt": "<p>В lake хранится любой формат. Напишите функцию <code>file_format(path)</code>: она возвращает расширение файла в нижнем регистре (<code>\"logs/app.JSON\"</code> → <code>\"json\"</code>). Если точки нет, она возвращает <code>None</code>.</p>",
    "hints": [
     "Посмотрите только на имя файла: <code>path.split('/')[-1]</code> (в папке точка тоже может быть).",
     "По последней точке: <code>name.rsplit('.', 1)[1].lower()</code>."
    ],
    "check": {
     "tests": "assert file_format('s3://dala/events/dt=2024-03-01/part-000.parquet') == 'parquet', '.parquet → parquet'\nassert file_format('logs/app.JSON') == 'json', 'В нижнем регистре'\nassert file_format('raw/v1.2/data.tar.gz') == 'gz', 'Берётся последнее расширение, точка в папке не учитывается'\nassert file_format('raw/README') is None, 'Точки нет → None'"
    }
   },
   {
    "title": "Слой medallion",
    "prompt": "<p>Таблицы относятся к слою по префиксу имени: <code>bronze_</code>, <code>silver_</code>, <code>gold_</code>. Напишите функцию <code>layer_of(table)</code>: она возвращает название слоя (<code>'bronze'</code>, <code>'silver'</code>, <code>'gold'</code>); если префикса нет, верните <code>None</code>. Затем в <code>bi_tables</code> запишите список таблиц из <code>TABLES</code>, с которыми может работать BI (gold).</p>",
    "hints": [
     "<code>table.startswith(layer + '_')</code> по трём слоям.",
     "BI работает только со слоем gold."
    ],
    "check": {
     "tests": "assert [layer_of(t) for t in TABLES] == ['bronze', 'silver', 'gold', None, 'gold', 'silver'], 'layer_of неверен'\nassert layer_of('golden_table') is None, 'Префикс \"gold_\" (с подчёркиванием)'\nassert bi_tables == ['gold_city_revenue', 'gold_daily_orders'], f'bi_tables: таблицы gold, у вас {bi_tables}'"
    }
   },
   {
    "title": "Файлы между датами",
    "prompt": "<p>Запрос должен читать только нужные партиции. Напишите функцию <code>files_between(paths, start, end)</code>: она возвращает пути, у которых дата после <code>dt=</code> лежит между <code>start</code> и <code>end</code> (обе границы включены), в исходном порядке. Пути без <code>dt=</code> пропускаются. ISO-даты можно сравнивать как текст.</p>",
    "hints": [
     "Сначала напишите вспомогательную функцию <code>partition_date(path)</code> (как в уроке).",
     "Условие: <code>dt is not None and start &lt;= dt &lt;= end</code>."
    ],
    "check": {
     "tests": "assert files_between(paths, '2024-03-01', '2024-03-02') == paths[1:4], '3 файла за 1–2 марта'\nassert files_between(paths, '2024-03-03', '2024-03-31') == [paths[5]], 'Только 2024-03-05'\nassert files_between(paths, '2025-01-01', '2025-12-31') == [], 'Нет подходящих партиций → []'"
    }
   },
   {
    "title": "Hive-партиции",
    "prompt": "<p>В lake часто встречается многоуровневое разбиение: <code>s3://dala/sales/city=Алматы/dt=2024-03-01/part-000.parquet</code>. Напишите функцию <code>parse_partitions(path)</code>: она возвращает словарь из всех частей пути вида <code>кілт=мән</code> (кроме имени файла). Префикс <code>s3://</code> не учитывается.</p>",
    "hints": [
     "Последняя часть — имя файла: <code>path.split('/')[:-1]</code>.",
     "В каждой части, если есть <code>=</code>: <code>key, _, value = part.partition('=')</code>."
    ],
    "check": {
     "tests": "assert parse_partitions('s3://dala/sales/city=Алматы/dt=2024-03-01/part-000.parquet') == {'city': 'Алматы', 'dt': '2024-03-01'}, 'Две партиции: city и dt'\nassert parse_partitions('s3://dala/events/latest/part-000.parquet') == {}, 'Нет партиций → {}'\nassert parse_partitions('s3://dala/x/dt=2024-01-01/a=b.parquet') == {'dt': '2024-01-01'}, '= в имени файла не учитывается'"
    }
   },
   {
    "title": "Проверка «болота» данных",
    "prompt": "<p>Чтобы lake не превратилось в «болото», проверяется соглашение об именах. Напишите функцию <code>bad_paths(paths)</code>: она возвращает пути, которые нарушают соглашение, в исходном порядке. Правило: путь начинается с <code>s3://dala/</code>, содержит часть <code>dt=YYYY-MM-DD</code> (дата из 10 символов, на 4-й и 7-й позициях <code>-</code>, остальные — цифры), а файл заканчивается на <code>.parquet</code>.</p>",
    "hints": [
     "Напишите отдельную функцию, проверяющую дату: длина 10, <code>s[4] == '-' and s[7] == '-'</code>, остальные символы проверьте через <code>isdigit()</code>.",
     "Начало и конец пути: <code>startswith('s3://dala/')</code>, <code>endswith('.parquet')</code>."
    ],
    "check": {
     "tests": "assert bad_paths(paths) == [paths[1], paths[2], paths[3], paths[5]], f'Нарушают: пути с индексами 1, 2, 3, 5. У вас {bad_paths(paths)}'\nassert bad_paths([paths[0], paths[4]]) == [], 'Правильные пути → []'\nassert bad_paths(['s3://dala/e/dt=2024-03-0x/p.parquet']) == ['s3://dala/e/dt=2024-03-0x/p.parquet'], 'В дате есть не цифра'"
    }
   },
   {
    "title": "Bronze, silver, gold",
    "prompt": "<p><code>deng_raw_sales.csv</code> — слой bronze (сырой, не меняется). Напишите две функции. <code>to_silver(bronze)</code>: в <b>копии</b> очищает столбец <code>city</code> (<code>strip().capitalize()</code>), превращает <code>order_date</code> в дату через <code>pd.to_datetime</code>, приводит <code>amount_tg</code> к типу <code>int</code>; все строки и статусы сохраняются. <code>to_gold(silver)</code>: возвращает таблицу с колонками: <code>paid_tg</code> (оплаченная сумма по городу), <code>orders</code> (число всех заказов), <code>paid_share</code> (доля оплаченных заказов, 2 знака), отсортированную по <code>city</code>, индекс с 0. <code>city</code> — столбец.</p>",
    "hints": [
     "Silver: сначала <code>df = bronze.copy()</code> — bronze никогда не меняется.",
     "Gold: для оплаченной суммы <code>amount_tg.where(status == 'paid', 0)</code>, для доли — <code>mean</code> столбца True/False."
    ],
    "check": {
     "tests": "import pandas as _pd\n_b = _pd.read_csv('deng_raw_sales.csv')\n_s = to_silver(_b)\nassert list(_b['city']) == list(_pd.read_csv('deng_raw_sales.csv')['city']), 'Bronze должен оставаться неизменным: работайте с копией'\nassert len(_s) == 10 and sorted(_s['city'].unique()) == ['Алматы', 'Астана', 'Шымкент'], 'В silver все 10 строк, города очищены'\nassert _pd.api.types.is_datetime64_any_dtype(_s['order_date']), 'order_date должен стать датой (pd.to_datetime)'\nassert set(_s['status']) == {'paid', 'cancelled', 'pending'}, 'В silver сохраняются все статусы'\n_g = to_gold(_s)\nassert list(_g.columns) == ['city', 'paid_tg', 'orders', 'paid_share'], f'Столбцы gold: city, paid_tg, orders, paid_share. У вас {list(_g.columns)}'\nassert list(_g['city']) == ['Алматы', 'Астана', 'Шымкент'] and list(_g.index) == [0, 1, 2], 'Отсортировано по city, индекс с 0'\nassert [int(x) for x in _g['paid_tg']] == [264200, 117500, 23400] and [int(x) for x in _g['orders']] == [5, 3, 2], 'paid_tg: 264200, 117500, 23400; orders: 5, 3, 2'\nassert [float(x) for x in _g['paid_share']] == [0.8, 0.33, 1.0], f'paid_share: 0.8, 0.33, 1.0. У вас {list(_g[\"paid_share\"])}'"
    }
   },
   {
    "title": "Каталог партиций",
    "prompt": "<p>Каталог — таблица, которая показывает, что есть в lake. Напишите функцию <code>catalog(paths)</code>: она возвращает словарь из путей вида <code>s3://bucket/кесте/dt=.../файл</code> (таблица — часть после bucket). Вид словаря: <code>{кесте: {'partitions': сұрыпталған dt тізімі (қайталанбайтын), 'files': файлдар саны, 'missing': first..last аралығындағы жоқ күндер}}</code>. Пути без <code>dt=</code> пропускаются. Отсутствующие даты найдите через <code>pd.date_range</code> (<code>.strftime('%Y-%m-%d')</code>).</p>",
    "hints": [
     "Имя таблицы: <code>p[len('s3://'):].split('/')[1]</code>; даты соберите в множество.",
     "Полный диапазон: <code>pd.date_range(first, last).strftime('%Y-%m-%d')</code>, затем отфильтруйте отсутствующие даты."
    ],
    "check": {
     "tests": "_c = catalog(paths)\nassert set(_c) == {'events', 'orders'}, f'Две таблицы: events, orders. У вас {sorted(_c)}'\nassert _c['events'] == {'partitions': ['2024-03-01', '2024-03-02', '2024-03-05'], 'files': 4, 'missing': ['2024-03-03', '2024-03-04']}, f'Каталог events неверен: {_c[\"events\"]}'\nassert _c['orders'] == {'partitions': ['2024-03-02', '2024-03-03'], 'files': 2, 'missing': []}, f'Каталог orders неверен: {_c[\"orders\"]}'\nassert catalog([]) == {}, 'Нет путей → {}'"
    }
   }
  ]
 },
 "deng-3": {
  "pr": [
   {
    "title": "Размер fact-таблицы",
    "prompt": "<p><code>deng_orders.csv</code> — таблица fact. Прочитайте её и запишите: в <code>n_orders</code> — число строк, в <code>total_qty</code> — сумму <code>qty</code>, в <code>n_customers</code> — число разных клиентов в fact (<code>nunique</code>).</p>",
    "hints": [
     "<code>len(orders)</code>, <code>orders['qty'].sum()</code>.",
     "Число разных значений: <code>orders['customer_id'].nunique()</code>."
    ],
    "check": {
     "tests": "assert n_orders == 12, 'В таблице fact 12 строк'\nassert total_qty is not None and int(total_qty) == 35, 'Сумма qty равна 35'\nassert n_customers is not None and int(n_customers) == 6, '6 разных клиентов'"
    }
   },
   {
    "title": "Измерение городов",
    "prompt": "<p><code>deng_customers.csv</code> — измерение клиентов. В переменную <code>by_city</code> запишите число клиентов в каждом городе (Series, по убыванию, <code>value_counts</code>), а в <code>b2b_cities</code> — отсортированный список городов, в которых есть клиенты сегмента b2b.</p>",
    "hints": [
     "<code>customers['city'].value_counts()</code> считает по убыванию.",
     "Фильтр: <code>customers.loc[customers['segment'] == 'b2b', 'city']</code>."
    ],
    "check": {
     "tests": "assert by_city is not None and [int(x) for x in by_city.values] == [3, 2, 1] and by_city.index[0] == 'Алматы', 'Алматы 3, Астана 2, Шымкент 1'\nassert list(b2b_cities) == ['Алматы', 'Астана'], f'Клиенты b2b — в Алматы и Астане, у вас {b2b_cities}'"
    }
   },
   {
    "title": "Товары по категориям",
    "prompt": "<p><code>deng_products.csv</code> — измерение товаров. В переменную <code>avg_price</code> запишите среднюю цену каждой категории (Series, <code>groupby</code>), а в <code>most_expensive</code> — название самого дорогого товара.</p>",
    "hints": [
     "<code>products.groupby('category')['price_tg'].mean()</code>.",
     "Индекс строки с наибольшим значением: <code>products['price_tg'].idxmax()</code>."
    ],
    "check": {
     "tests": "assert avg_price is not None and float(avg_price['home']) == 30450 and float(avg_price['electronics']) == 19200, 'Средняя цена home 30 450 ₸, electronics 19 200 ₸'\nassert most_expensive == 'Кілем', f'Самый дорогой товар — Кілем (42 000 ₸), у вас {most_expensive}'"
    }
   },
   {
    "title": "Выручка по товарам",
    "prompt": "<p>Соедините fact с измерением товаров (<code>merge</code>) и вычислите <code>revenue = qty * price_tg</code>. В <code>by_product</code> — выручка по названию товара (Series, по убыванию), в <code>top_product</code> — товар, который принёс больше всего выручки.</p>",
    "hints": [
     "<code>orders.merge(products, on='product_id')</code>.",
     "<code>groupby('product_name')['revenue'].sum().sort_values(ascending=False)</code>."
    ],
    "check": {
     "tests": "import pandas as _pd\n_o = _pd.read_csv('deng_orders.csv')\n_c = _pd.read_csv('deng_customers.csv')\n_p = _pd.read_csv('deng_products.csv')\n_m = _o.merge(_c, on='customer_id').merge(_p, on='product_id')\n_m['revenue'] = _m['qty'] * _m['price_tg']\n\n_ref = _m.groupby('product_name')['revenue'].sum().sort_values(ascending=False)\nassert by_product is not None and list(by_product.index) == list(_ref.index), 'by_product отсортирован по убыванию'\nassert [int(x) for x in by_product.values] == [int(x) for x in _ref.values], 'Выручка неверна'\nassert top_product == 'Құлаққап', f'Самый большой доход — Құлаққап (193 700 ₸), у вас {top_product}'"
    }
   },
   {
    "title": "Количество товаров по сегментам",
    "prompt": "<p>Соедините fact с таблицей клиентов. В <code>qty_by_segment</code> — число проданных товаров по сегментам (сумма <code>qty</code>, Series), в <code>b2b_share</code> — доля сегмента b2b в общей сумме (0–1, 2 знака).</p>",
    "hints": [
     "<code>orders.merge(customers, on='customer_id')</code>.",
     "Доля: <code>qty_by_segment['b2b'] / qty_by_segment.sum()</code>."
    ],
    "check": {
     "tests": "assert qty_by_segment is not None and int(qty_by_segment['b2b']) == 20 and int(qty_by_segment['retail']) == 15, 'b2b 20 штук, retail 15 штук'\nassert b2b_share is not None and abs(float(b2b_share) - 0.57) < 1e-9, f'Доля b2b 20 / 35 ≈ 0.57, у вас {b2b_share}'"
    }
   },
   {
    "title": "Выручка по дням",
    "prompt": "<p>Соедините три таблицы и постройте таблицу выручки по дням: <code>daily</code> — сумма <code>revenue</code> по <code>order_date</code> (Series, отсортирован по дате), <code>electronics_daily</code> — дневная выручка только категории <code>electronics</code> (Series). Дни, когда electronics не продавался, в результате не появляются.</p>",
    "hints": [
     "Три таблицы: <code>orders.merge(customers, on='customer_id').merge(products, on='product_id')</code>.",
     "Сначала фильтр <code>m[m['category'] == 'electronics']</code>, затем <code>groupby</code>."
    ],
    "check": {
     "tests": "import pandas as _pd\n_o = _pd.read_csv('deng_orders.csv')\n_c = _pd.read_csv('deng_customers.csv')\n_p = _pd.read_csv('deng_products.csv')\n_m = _o.merge(_c, on='customer_id').merge(_p, on='product_id')\n_m['revenue'] = _m['qty'] * _m['price_tg']\n\nassert daily is not None and [int(x) for x in daily.values] == [147300, 32400, 98900, 153500, 108300, 60000], 'daily должен быть отсортирован по дате'\n_e = _m[_m['category'] == 'electronics'].groupby('order_date')['revenue'].sum()\nassert electronics_daily is not None and electronics_daily.to_dict() == _e.to_dict(), 'electronics_daily — только дневная выручка категории electronics'\nassert '2024-03-06' not in electronics_daily.index, 'В 2024-03-06 electronics не продавался'"
    }
   },
   {
    "title": "Крупнейшие клиенты",
    "prompt": "<p>Соедините три таблицы и постройте DataFrame <code>top</code>: первые 3 клиента по выручке, столбцы <code>customer_name</code>, <code>city</code>, <code>segment</code>, <code>revenue</code> и <code>orders</code> (число заказов); отсортирован по <code>revenue</code> по убыванию, индекс с 0. Затем в <code>top_share</code> — доля этих трёх клиентов в общей выручке (0–1, 3 знака).</p>",
    "hints": [
     "Добавьте атрибуты клиента и в ключ группировки: <code>groupby(['customer_name', 'city', 'segment'], as_index=False)</code>.",
     "<code>.sort_values('revenue', ascending=False).head(3).reset_index(drop=True)</code>."
    ],
    "check": {
     "tests": "import pandas as _pd\n_o = _pd.read_csv('deng_orders.csv')\n_c = _pd.read_csv('deng_customers.csv')\n_p = _pd.read_csv('deng_products.csv')\n_m = _o.merge(_c, on='customer_id').merge(_p, on='product_id')\n_m['revenue'] = _m['qty'] * _m['price_tg']\n\n_r = _m.groupby(['customer_name', 'city', 'segment'], as_index=False).agg(revenue=('revenue', 'sum'), orders=('order_id', 'count')).sort_values('revenue', ascending=False).head(3).reset_index(drop=True)\nassert top is not None and list(top.columns) == ['customer_name', 'city', 'segment', 'revenue', 'orders'], f\"Столбцы: customer_name, city, segment, revenue, orders. У вас {None if top is None else list(top.columns)}\"\nassert list(top['customer_name']) == list(_r['customer_name']) and list(top.index) == [0, 1, 2], 'Первые три клиента по выручке, индекс с 0'\nassert [int(x) for x in top['revenue']] == [266500, 154500, 66700] and [int(x) for x in top['orders']] == [2, 2, 3], 'revenue и orders неверны'\nassert top_share is not None and abs(float(top_share) - 0.812) < 1e-9, f'Доля трёх клиентов 487 700 / 600 400 ≈ 0.812, у вас {top_share}'"
    }
   },
   {
    "title": "Город × категория",
    "prompt": "<p>Соедините три таблицы и постройте <code>pivot</code>: строки — <code>city</code>, столбцы — <code>category</code>, значения — сумма <code>revenue</code> (<code>pivot_table</code>, пустая ячейка = 0). Затем в <code>top_category</code> — категория с наибольшей выручкой в каждом городе (словарь вида <code>{қала: санат}</code>); в <code>astana_home_share</code> — доля категории <code>home</code> в выручке Астаны (0–1, 2 знака).</p>",
    "hints": [
     "<code>m.pivot_table(index='city', columns='category', values='revenue', aggfunc='sum', fill_value=0)</code>.",
     "Наибольший столбец в каждой строке: <code>row.idxmax()</code> (внутри <code>pivot.iterrows()</code>) или <code>pivot.idxmax(axis=1)</code>."
    ],
    "check": {
     "tests": "assert pivot is not None and list(pivot.index) == ['Алматы', 'Астана', 'Шымкент'] and list(pivot.columns) == ['books', 'electronics', 'home'], 'index — city, columns — category'\nassert int(pivot.loc['Алматы', 'electronics']) == 296300 and int(pivot.loc['Шымкент', 'books']) == 0, 'Алматы/electronics = 296 300, пустая ячейка 0'\nassert top_category == {'Алматы': 'electronics', 'Астана': 'home', 'Шымкент': 'home'}, f'top_category неверен: {top_category}'\nassert astana_home_share is not None and abs(float(astana_home_share) - 0.59) < 1e-9, f'Доля home в Астане 121 800 / 205 800 ≈ 0.59, у вас {astana_home_share}'"
    }
   }
  ]
 },
 "deng-4": {
  "pr": [
   {
    "title": "Очистка города",
    "prompt": "<p>Напишите функцию <code>clean_city(s)</code>: уберите пробелы по краям, первую букву сделайте заглавной, остальные — строчными: <code>\" АЛМАТЫ \"</code> → <code>\"Алматы\"</code>. Затем в <code>cities</code> — отсортированный список уникальных очищенных городов из <code>deng_raw_sales.csv</code>.</p>",
    "hints": [
     "<code>s.strip().capitalize()</code>.",
     "Уникальные: <code>sorted(set(...))</code>."
    ],
    "check": {
     "tests": "assert clean_city(' АЛМАТЫ ') == 'Алматы' and clean_city('шымкент ') == 'Шымкент', 'clean_city(\" АЛМАТЫ \") должна вернуть \"Алматы\"'\nassert cities == ['Алматы', 'Астана', 'Шымкент'], f'После очистки 3 города, у вас {cities}'"
    }
   },
   {
    "title": "Extract: статусы",
    "prompt": "<p>Шаг Extract. Прочитайте <code>deng_raw_sales.csv</code> и запишите: в <code>n_rows</code> — число строк, в <code>status_counts</code> — число строк каждого статуса (словарь вида <code>{статус: саны}</code>).</p>",
    "hints": [
     "<code>raw = pd.read_csv('deng_raw_sales.csv')</code>.",
     "<code>raw['status'].value_counts()</code>, затем превратите в словарь."
    ],
    "check": {
     "tests": "assert n_rows == 10, 'В сырых данных 10 строк'\nassert status_counts == {'paid': 7, 'cancelled': 2, 'pending': 1}, f'status_counts неверен: {status_counts}'"
    }
   },
   {
    "title": "Только оплаченные",
    "prompt": "<p>В переменную <code>paid</code> запишите из <code>deng_raw_sales.csv</code> только строки <code>status == 'paid'</code> (DataFrame), а в <code>paid_total</code> — сумму их <code>amount_tg</code>.</p>",
    "hints": [
     "Фильтр: <code>raw[raw['status'] == 'paid']</code>.",
     "<code>paid['amount_tg'].sum()</code>."
    ],
    "check": {
     "tests": "assert len(paid) == 7 and set(paid['status']) == {'paid'}, 'В paid 7 оплаченных строк'\nassert paid_total is not None and int(paid_total) == 405100, f'Сумма оплаченных 405 100 ₸, у вас {paid_total}'"
    }
   },
   {
    "title": "Transform: по дням",
    "prompt": "<p>Напишите функцию <code>transform_daily(df)</code>: возьмите только оплаченные строки и посчитайте по <code>order_date</code> сумму <code>amount_tg</code> и число заказов. Результат — DataFrame со столбцами <code>order_date</code>, <code>paid_tg</code>, <code>orders</code>, отсортированный по дате, индекс с 0. Входной DataFrame не меняется. Затем выполните <code>daily = transform_daily(raw)</code>.</p>",
    "hints": [
     "Сначала фильтр, затем <code>groupby('order_date', as_index=False).agg(paid_tg=('amount_tg', 'sum'), orders=('order_id', 'count'))</code>.",
     "В конце <code>sort_values</code> и <code>reset_index(drop=True)</code>."
    ],
    "check": {
     "tests": "assert daily is not None and list(daily.columns) == ['order_date', 'paid_tg', 'orders'], f\"Столбцы: order_date, paid_tg, orders. У вас {None if daily is None else list(daily.columns)}\"\nassert list(daily['order_date']) == ['2024-03-01', '2024-03-02', '2024-03-03', '2024-03-04', '2024-03-05'], '5 дней с оплаченными заказами, отсортировано'\nassert [int(x) for x in daily['paid_tg']] == [147300, 18900, 14900, 153500, 70500] and [int(x) for x in daily['orders']] == [2, 1, 1, 2, 1], 'paid_tg или orders неверны'\nassert len(raw) == 10, 'Входной DataFrame не должен меняться'"
    }
   },
   {
    "title": "ELT: пересчёт из сырого слоя",
    "prompt": "<p>Преимущество ELT: сырые данные сохраняются, и если логика меняется, мы пересчитываем. Бизнес изменил правило: «выручка = paid <b>и</b> pending». Напишите функцию <code>revenue_by_city(raw, statuses)</code>: в копии очистите город (<code>strip().capitalize()</code>), и она возвращает словарь «город → сумма <code>amount_tg</code>» по строкам, у которых <code>status</code> входит в переданный список. Затем вычислите результаты <code>old_rule</code> (<code>['paid']</code>) и <code>new_rule</code> (<code>['paid', 'pending']</code>).</p>",
    "hints": [
     "Фильтр по статусу: <code>df[df['status'].isin(statuses)]</code>.",
     "Результат в словарь: <code>{c: int(v) for c, v in series.items()}</code>."
    ],
    "check": {
     "tests": "assert old_rule == {'Алматы': 264200, 'Астана': 117500, 'Шымкент': 23400}, f'old_rule неверен: {old_rule}'\nassert new_rule == {'Алматы': 264200, 'Астана': 201500, 'Шымкент': 23400}, f'new_rule: к Астане pending добавит 84 000. У вас {new_rule}'\nassert revenue_by_city(raw, ['cancelled']) == {'Алматы': 13500, 'Астана': 37800}, 'Работать должно с любым списком статусов'\nassert raw['city'].iloc[0] == ' Алматы ', 'Сырые данные не должны меняться (работайте с копией)'"
    }
   },
   {
    "title": "Upsert",
    "prompt": "<p>Ещё один способ идемпотентной загрузки — upsert по ключу. Напишите функцию <code>upsert(table, rows, key)</code>: <code>table</code> и <code>rows</code> — списки словарей. Для каждой строки из <code>rows</code>: если в <code>table</code> есть строка с тем же ключом, она заменяется (место сохраняется), если нет — добавляется в конец. Верните новый список; входной <code>table</code> не меняется.</p>",
    "hints": [
     "Ключ → индекс словаря: <code>{r[key]: i for i, r in enumerate(result)}</code>.",
     "При добавлении новой строки обновите и индекс: внутри rows один ключ может встретиться дважды."
    ],
    "check": {
     "tests": "_once = upsert(table, updates, 'order_id')\nassert [(r['order_id'], r['status']) for r in _once] == [(201, 'paid'), (202, 'paid'), (203, 'cancelled')], f'Результат upsert неверен: {_once}'\nassert upsert(_once, updates, 'order_id') == _once, 'Idempotent: при повторном запуске результат не меняется'\nassert table[0]['status'] == 'pending' and len(table) == 2, 'Входная table не должна меняться'\nassert len(upsert([], [{'id': 1, 'v': 1}, {'id': 1, 'v': 2}], 'id')) == 1, 'Один ключ из rows остаётся одной строкой'"
    }
   },
   {
    "title": "ETL по статусам",
    "prompt": "<p>Напишите функцию <code>etl(path, target)</code>. Extract: читает CSV. Transform: очищает город; по городу создаёт таблицу со столбцами <code>paid_tg</code> (сумма paid), <code>cancelled_tg</code> (сумма cancelled), <code>pending_tg</code> (сумма pending) (<code>pivot_table</code>, пустые значения 0, целые числа); сортирует по столбцу <code>city</code>, индекс с 0; порядок столбцов: <code>city</code>, <code>paid_tg</code>, <code>cancelled_tg</code>, <code>pending_tg</code>. Load: записывает <code>target</code> в CSV-файл (<code>index=False</code>). Функция возвращает DataFrame результата. Затем выполните <code>report = etl('deng_raw_sales.csv', 'deng_status_report.csv')</code>.</p>",
    "hints": [
     "Столбцы по статусу: <code>pivot_table(index='city', columns='status', values='amount_tg', aggfunc='sum', fill_value=0)</code>.",
     "Порядок и названия столбцов: <code>.reindex(columns=['paid', 'cancelled', 'pending'], fill_value=0)</code>, затем <code>p.columns = [...]</code> и <code>reset_index()</code>."
    ],
    "check": {
     "tests": "import pandas as _pd\nassert report is not None and list(report.columns) == ['city', 'paid_tg', 'cancelled_tg', 'pending_tg'], f\"Столбцы: city, paid_tg, cancelled_tg, pending_tg. У вас {None if report is None else list(report.columns)}\"\nassert list(report['city']) == ['Алматы', 'Астана', 'Шымкент'] and list(report.index) == [0, 1, 2], 'Города очищены и отсортированы'\nassert [int(x) for x in report['paid_tg']] == [264200, 117500, 23400], 'paid_tg: 264200, 117500, 23400'\nassert [int(x) for x in report['cancelled_tg']] == [13500, 37800, 0] and [int(x) for x in report['pending_tg']] == [0, 84000, 0], 'cancelled_tg и pending_tg неверны (нет значения → 0)'\n_f = _pd.read_csv('deng_status_report.csv')\nassert list(_f.columns) == list(report.columns) and len(_f) == 3, 'В файл должна записываться именно эта таблица (index=False)'\n_r2 = etl('deng_raw_sales.csv', 'deng_status_report_2.csv')\nassert _r2.equals(report), 'Повторный запуск etl даёт тот же результат'"
    }
   },
   {
    "title": "Идемпотентная загрузка по дням",
    "prompt": "<p>Ночное задание загружает данные одного дня в таблицу warehouse, а при ошибке запускается заново. Напишите функцию <code>load_day(target, raw, dt)</code>: она берёт из <code>raw</code> строки, где <code>order_date == dt</code> и <code>status == 'paid'</code>, и считает сумму <code>paid_tg</code> по очищенному городу (столбцы: <code>dt</code>, <code>city</code>, <code>paid_tg</code>); из <code>target</code> удаляет старые строки этого <code>dt</code> и добавляет новые; возвращает новый DataFrame, отсортированный по <code>dt</code>, <code>city</code>, с индексом с 0. Затем <code>wh</code> — результат последовательной загрузки в пустую таблицу дней 2024-03-01, 2024-03-02, снова 2024-03-01 и 2024-03-04.</p>",
    "hints": [
     "Удаление старой партиции: <code>target[target['dt'] != dt]</code>, затем <code>pd.concat([kept, new], ignore_index=True)</code>.",
     "Добавьте столбец даты в новые строки: <code>new.insert(0, 'dt', dt)</code>."
    ],
    "check": {
     "tests": "assert wh is not None and list(wh.columns) == ['dt', 'city', 'paid_tg'], f\"Столбцы: dt, city, paid_tg. У вас {None if wh is None else list(wh.columns)}\"\nassert [(r.dt, r.city, int(r.paid_tg)) for r in wh.itertuples()] == [('2024-03-01', 'Алматы', 29800), ('2024-03-01', 'Астана', 117500), ('2024-03-02', 'Шымкент', 18900), ('2024-03-04', 'Алматы', 149000), ('2024-03-04', 'Шымкент', 4500)], f'wh неверен:\\n{wh}'\nassert list(wh.index) == list(range(5)), 'Индекс с 0'\n_again = load_day(wh, raw, '2024-03-04')\nassert _again.equals(wh), 'Повторная загрузка того же дня не должна менять таблицу (idempotent)'"
    }
   }
  ]
 },
 "deng-5": {
  "pr": [
   {
    "title": "Чтение cron-времени",
    "prompt": "<p>Расписание Airflow записывается в формате cron: <code>'0 3 * * *'</code> — каждый день в 03:00. Напишите функцию <code>parse_cron(expr)</code>: она возвращает первые два поля (минуты, часы) как целые числа в кортеже <code>(minute, hour)</code>. Затем <code>run_at(expr)</code> возвращает время в виде <code>'HH:MM'</code>.</p>",
    "hints": [
     "<code>expr.split()</code> делит по пробелам: <code>['0', '3', '*', '*', '*']</code>.",
     "Формат из двух знаков: <code>f'{hour:02d}:{minute:02d}'</code>."
    ],
    "check": {
     "tests": "assert tuple(parse_cron('0 3 * * *')) == (0, 3), \"'0 3 * * *' → (0, 3)\"\nassert tuple(parse_cron('30 23 * * *')) == (30, 23), \"'30 23 * * *' → (30, 23)\"\nassert run_at('0 3 * * *') == '03:00', \"'0 3 * * *' → '03:00'\"\nassert run_at('5 14 * * 1') == '14:05', \"'5 14 * * 1' → '14:05'\""
    }
   },
   {
    "title": "Batch или streaming",
    "prompt": "<p>Правило из урока: выбирайте batch, если задержка не важна по-настоящему. Напишите функцию <code>choose_mode(max_delay_sec)</code>: если допустимая задержка меньше 60 секунд, она возвращает <code>'streaming'</code>, иначе <code>'batch'</code>. Затем <code>modes</code> — список режимов для: fraud-проверки платежей Kaspi (2 с), ночного отчёта о продажах (86400 с), почасового dashboard (3600 с).</p>",
    "hints": [
     "<code>if max_delay_sec &lt; 60: return 'streaming'</code>.",
     "<code>modes = [choose_mode(x) for x in [2, 86400, 3600]]</code>."
    ],
    "check": {
     "tests": "assert choose_mode(2) == 'streaming', 'Fraud-проверка за 2 секунды → streaming'\nassert choose_mode(60) == 'batch', '60 секунд — граница, batch достаточно'\nassert choose_mode(86400) == 'batch', 'Ночной отчёт → batch'\nassert modes == ['streaming', 'batch', 'batch'], f\"Ожидалось ['streaming', 'batch', 'batch'], у вас {modes}\""
    }
   },
   {
    "title": "Upstream-задачи",
    "prompt": "<p><code>DEPS</code> — зависимости каждой задачи. Напишите функцию <code>n_upstream(deps, task)</code>: она возвращает число прямых зависимостей задачи. Затем <code>roots</code> — отсортированный список задач без зависимостей.</p>",
    "hints": [
     "Прямые зависимости: <code>len(deps[task])</code>.",
     "<code>sorted(t for t in DEPS if not DEPS[t])</code>."
    ],
    "check": {
     "tests": "assert n_upstream(DEPS, 'load_fact') == 2, 'load_fact зависит от двух задач'\nassert n_upstream(DEPS, 'extract') == 0, 'extract ни от кого не зависит'\nassert n_upstream({'x': ['a', 'b', 'c']}, 'x') == 3, 'Должна работать с любыми deps'\nassert roots == ['extract'], f\"Задача без зависимостей — только extract, у вас {roots}\""
    }
   },
   {
    "title": "Даты backfill",
    "prompt": "<p>Backfill — пересчёт прошедших дней. Напишите функцию <code>backfill_dates(start, end)</code>: она принимает строки <code>'YYYY-MM-DD'</code> и возвращает список всех дней, включая обе границы, в том же формате. Используйте модуль <code>datetime</code> (2024 — високосный год).</p>",
    "hints": [
     "<code>date.fromisoformat('2024-02-27')</code> превращает строку в дату, <code>.isoformat()</code> возвращает обратно.",
     "Цикл: <code>while d &lt;= last: ...; d = d + timedelta(days=1)</code>."
    ],
    "check": {
     "tests": "_b = backfill_dates('2024-02-27', '2024-03-02')\nassert _b == ['2024-02-27', '2024-02-28', '2024-02-29', '2024-03-01', '2024-03-02'], f'Не забудьте 29 февраля (високосный год). У вас {_b}'\nassert backfill_dates('2024-03-05', '2024-03-05') == ['2024-03-05'], 'Один день — один элемент'\nassert len(backfill_dates('2024-03-01', '2024-03-31')) == 31, 'В марте 31 день'"
    }
   },
   {
    "title": "Логика retry",
    "prompt": "<p>Параметр <code>retries=2</code> в Airflow повторяет задачу ещё два раза, если она упала. Напишите функцию <code>run_with_retry(fn, retries)</code>: она вызывает <code>fn()</code> не более <code>retries + 1</code> раз. Если успешно — возвращает <code>(нәтиже, әрекет_саны)</code>; если все попытки упали — заново выбрасывает последнюю ошибку.</p>",
    "hints": [
     "В цикле <code>for attempt in range(1, retries + 2):</code> выполните <code>try: return (fn(), attempt)</code>.",
     "<code>except Exception as e: last = e</code>, после окончания цикла <code>raise last</code>."
    ],
    "check": {
     "tests": "_calls = []\ndef _flaky():\n    _calls.append(1)\n    if len(_calls) < 3:\n        raise ConnectionError('Желі үзілді')\n    return 'ok'\n_r = run_with_retry(_flaky, 2)\nassert tuple(_r) == ('ok', 3), f\"Третья попытка успешна: ('ok', 3), у вас {_r}\"\nassert tuple(run_with_retry(lambda: 42, 0)) == (42, 1), 'Сразу успешно → 1 попытка'\n_n = []\ndef _always():\n    _n.append(1)\n    raise TimeoutError('Қойма жауап бермеді')\n_ok = False\ntry:\n    run_with_retry(_always, 2)\nexcept TimeoutError:\n    _ok = True\nassert _ok, 'Если все попытки упали, выбросьте последнюю ошибку'\nassert len(_n) == 3, f'retries=2 → всего 3 попытки, у вас {len(_n)}'"
    }
   },
   {
    "title": "Нижестоящие задачи",
    "prompt": "<p>Если одна задача упала, все следующие за ней не запускаются. Напишите функцию <code>downstream(deps, task)</code>: она возвращает отсортированный список всех задач, которые зависят от данной задачи — прямо или косвенно.</p>",
    "hints": [
     "Прямые зависимые: <code>[t for t, ds in deps.items() if task in ds]</code>.",
     "Найденные задачи поставьте в очередь (<code>frontier</code>) и ищите тех, кто зависит от них; <code>set</code> не даёт повторяться."
    ],
    "check": {
     "tests": "_d = downstream(DEPS, 'load_dims')\nassert _d == ['load_fact', 'notify', 'quality', 'report'], f'После load_dims остаются 4 задачи, у вас {_d}'\nassert downstream(DEPS, 'report') == ['notify'], 'После report — только notify'\nassert downstream(DEPS, 'notify') == [], 'notify — последняя задача'\nassert len(downstream(DEPS, 'extract')) == 5, 'От extract зависят остальные пять задач'"
    }
   },
   {
    "title": "Alert-ы в окне",
    "prompt": "<p>В streaming события делят на <b>tumbling window</b> (непересекающиеся окна): <code>t // size * size</code> — начало окна. Функция <code>window_counts(events, size)</code> возвращает словарь вида <code>{(card, window_start): саны}</code>. <code>alerts(events, size, limit)</code> — отсортированный список пар <code>(card, window_start)</code>, у которых количество больше <code>limit</code>.</p>",
    "hints": [
     "Ключ: <code>(e['card'], e['t'] // size * size)</code>, счётчик: <code>counts.get(key, 0) + 1</code>.",
     "<code>sorted(k for k, v in window_counts(...).items() if v &gt; limit)</code>."
    ],
    "check": {
     "tests": "_w = window_counts(events, 60)\nassert _w == {('A', 0): 4, ('A', 60): 1, ('B', 0): 1, ('B', 60): 4}, f'Окна по 60 с: A[0]=4, A[60]=1, B[0]=1, B[60]=4. У вас {_w}'\nassert alerts(events, 60, 3) == [('A', 0), ('B', 60)], 'limit=3 → A в окне 0, B в окне 60'\nassert alerts(events, 30, 1) == [('A', 0), ('A', 30), ('B', 60), ('B', 90)], 'При окне 30 с и limit=1 — четыре alert-а'\nassert alerts(events, 60, 4) == [], 'Ни в одном окне не больше 4'"
    }
   },
   {
    "title": "Запуск DAG",
    "prompt": "<p>Как в Airflow, напишите функцию <code>run_dag(deps, failing)</code>. Задача выполняется, когда все её зависимости готовы; среди готовых выбирается задача по алфавиту. Статус каждой задачи: если она в наборе <code>failing</code> — <code>'failed'</code>; если хотя бы одна из её зависимостей не <code>'success'</code> — <code>'upstream_failed'</code>; иначе <code>'success'</code>. Функция возвращает <code>(order, status)</code>: порядок выполнения и словарь статусов.</p>",
    "hints": [
     "Готовая задача: <code>t not in status and all(d in status for d in deps[t])</code>; из готовых возьмите первую по алфавиту: <code>sorted(...)[0]</code>.",
     "Статус: сначала <code>t in failing</code>, затем <code>any(status[d] != 'success' for d in deps[t])</code>."
    ],
    "check": {
     "tests": "_o, _s = run_dag(DEPS, set())\nassert _o == ['extract', 'load_dims', 'load_fact', 'quality', 'report', 'notify'], f'Порядок выполнения неверен: {_o}'\nassert all(v == 'success' for v in _s.values()), 'Если ошибок нет, все success'\n_o, _s = run_dag(DEPS, {'load_dims'})\nassert _s['extract'] == 'success' and _s['load_dims'] == 'failed', 'extract — success, load_dims — failed'\nassert _s['load_fact'] == 'upstream_failed' and _s['quality'] == 'upstream_failed', 'Задачи, зависящие от load_dims, получают upstream_failed'\nassert _s['notify'] == 'upstream_failed', 'Косвенно зависящий notify тоже upstream_failed'\n_o, _s = run_dag(DEPS, {'report'})\nassert [t for t in _o if _s[t] != 'success'] == ['report', 'notify'], 'Если report упал, страдают только report и notify'"
    }
   }
  ]
 },
 "deng-6": {
  "pr": [
   {
    "title": "Поиск имён ref",
    "prompt": "<p>dbt находит зависимости моделей через <code>{{ ref('...') }}</code>. Напишите функцию <code>refs(sql)</code>: она возвращает список всех имён <code>ref('атау')</code> из SQL в порядке их появления. Используйте строковые методы (<code>split</code>).</p>",
    "hints": [
     "<code>sql.split(\"ref('\")[1:]</code> — каждая часть начинается с имени.",
     "Имя из каждой части: <code>part.split(\"'\")[0]</code>."
    ],
    "check": {
     "tests": "assert refs(\"select * from {{ ref('stg_orders') }} o join {{ ref('stg_customers') }} c using (customer_id)\") == ['stg_orders', 'stg_customers'], 'Два ref в порядке появления'\nassert refs('select * from raw.orders') == [], 'Если ref нет, пустой список'\nassert refs(\"select * from {{ ref('paid_orders') }}\") == ['paid_orders'], 'Один ref'"
    }
   },
   {
    "title": "Подсчёт пустых значений",
    "prompt": "<p>Когда тест dbt <code>not_null</code> падает, полезно знать, сколько строк он нарушил. Напишите функцию <code>count_nulls(df, col)</code>: она возвращает число пустых значений в столбце как <code>int</code>. Затем <code>bad</code> — число пустых значений в столбце <code>city</code> таблицы <code>model</code>.</p>",
    "hints": [
     "<code>df[col].isna()</code> даёт ряд True/False.",
     "<code>int(df[col].isna().sum())</code>."
    ],
    "check": {
     "tests": "assert bad == 2, f'В столбце city 2 пустых значения, у вас {bad}'\nassert count_nulls(model, 'order_id') == 0, 'В order_id пустых значений нет'\nassert count_nulls(pd.DataFrame({'x': [None, None, 1]}), 'x') == 2, 'Работать должно с любой таблицей'"
    }
   },
   {
    "title": "Тест диапазона значений",
    "prompt": "<p>Аналог теста <code>accepted_range</code>: функция <code>test_accepted_range(df, col, min_value)</code> проверяет, что все непустые значения в столбце не меньше <code>min_value</code>; если да, возвращает <code>True</code>, иначе <code>False</code>.</p>",
    "hints": [
     "Удалите пустые значения: <code>df[col].dropna()</code>.",
     "<code>bool((... &gt;= min_value).all())</code>."
    ],
    "check": {
     "tests": "_ok = pd.DataFrame({'amount_tg': [100, 0, 2500, None]})\n_bad = pd.DataFrame({'amount_tg': [100, -50, 2500]})\nassert test_accepted_range(_ok, 'amount_tg', 0), 'Все значения ≥ 0 (пустое не учитывается) → True'\nassert not test_accepted_range(_bad, 'amount_tg', 0), 'Есть -50 → False'\nassert not test_accepted_range(_ok, 'amount_tg', 50), 'При min_value=50 значение 0 не проходит'"
    }
   },
   {
    "title": "Зависимости моделей",
    "prompt": "<p><code>models</code> — словарь: имя модели → её SQL. Напишите функцию <code>refs(sql)</code> (как в предыдущем задании), затем функцию <code>lineage(models)</code>: она возвращает словарь <code>{модель: ref тізімі}</code>. Результат запишите в <code>graph</code>.</p>",
    "hints": [
     "<code>refs</code>: <code>sql.split(\"ref('\")[1:]</code>, из каждой части <code>part.split(\"'\")[0]</code>.",
     "<code>{name: refs(sql) for name, sql in models.items()}</code>."
    ],
    "check": {
     "tests": "assert graph['stg_orders'] == [] and graph['stg_customers'] == [], 'Модели staging читают из raw-таблицы, ref нет'\nassert graph['paid_orders'] == ['stg_orders'], f\"paid_orders → ['stg_orders'], у вас {graph.get('paid_orders')}\"\nassert graph['city_revenue'] == ['paid_orders', 'stg_customers'], 'city_revenue зависит от двух моделей'\nassert len(graph) == 5, 'Должны быть все пять моделей'"
    }
   },
   {
    "title": "Silver: paid_orders",
    "prompt": "<p>Из <code>deng_raw_sales.csv</code> создайте silver-модель с помощью pandas: очистите город через <code>.str.strip().str.capitalize()</code> и оставьте только строки <code>status == 'paid'</code>. В <code>paid</code> столбцы: <code>order_id</code>, <code>order_date</code>, <code>city</code>, <code>amount_tg</code>; индекс с 0.</p>",
    "hints": [
     "Фильтр: <code>raw[raw['status'] == 'paid']</code>.",
     "Выберите столбцы и <code>.reset_index(drop=True)</code>."
    ],
    "check": {
     "tests": "assert list(paid.columns) == ['order_id', 'order_date', 'city', 'amount_tg'], f'Столбцы: order_id, order_date, city, amount_tg. У вас {list(paid.columns)}'\nassert len(paid) == 7, f'Должно быть 7 оплаченных заказов, у вас {len(paid)}'\nassert sorted(paid['city'].unique()) == ['Алматы', 'Астана', 'Шымкент'], 'Названия городов не очищены'\nassert int(paid['amount_tg'].sum()) == 405100, 'Сумма оплаченных 405 100 ₸'\nassert list(paid.index) == list(range(7)), 'Индекс должен начинаться с 0'"
    }
   },
   {
    "title": "Gold: city_revenue",
    "prompt": "<p>Постройте gold-модель из silver-слоя. Очистите данные из <code>deng_raw_sales.csv</code> (название города), возьмите оплаченные заказы, затем постройте DataFrame <code>gold</code> по городам: столбцы <code>city</code>, <code>revenue_tg</code> (сумма), <code>orders</code> (число); отсортирован по <code>revenue_tg</code> по убыванию, индекс с 0.</p>",
    "hints": [
     "Сначала очистка и фильтр <code>status == 'paid'</code>.",
     "<code>.groupby('city', as_index=False).agg(revenue_tg=('amount_tg', 'sum'), orders=('order_id', 'count'))</code>."
    ],
    "check": {
     "tests": "assert gold is not None and list(gold.columns) == ['city', 'revenue_tg', 'orders'], 'Столбцы: city, revenue_tg, orders'\nassert list(gold['city']) == ['Алматы', 'Астана', 'Шымкент'], f\"Порядок: Алматы, Астана, Шымкент. У вас {list(gold['city'])}\"\nassert [int(x) for x in gold['revenue_tg']] == [264200, 117500, 23400], 'Выручка: 264 200, 117 500, 23 400 ₸'\nassert [int(x) for x in gold['orders']] == [4, 1, 2], 'Число заказов: 4, 1, 2'"
    }
   },
   {
    "title": "Тесты по config",
    "prompt": "<p>Как в файле <code>schema.yml</code> dbt, дан список <code>config</code>: каждая строка имеет вид <code>'баған:тест'</code>. Напишите функцию <code>run_tests(df, config)</code>: тесты <code>not_null</code>, <code>unique</code> (непустые значения не повторяются), <code>non_negative</code> (непустые значения ≥ 0). Она возвращает список строк config, которые упали (в исходном порядке). Если тест неизвестен, она выбрасывает <code>ValueError</code>.</p>",
    "hints": [
     "Разбейте каждую строку: <code>col, test = item.split(':')</code>.",
     "Три теста — через <code>if/elif</code>, в остальных случаях <code>raise ValueError(...)</code>."
    ],
    "check": {
     "tests": "assert failed == ['order_id:unique', 'city:not_null', 'amount_tg:non_negative'], f'Три теста падают (в исходном порядке). У вас {failed}'\n_good = pd.DataFrame({'order_id': [1, 2], 'amount_tg': [10, 0]})\nassert run_tests(_good, ['order_id:unique', 'amount_tg:non_negative']) == [], 'В чистой таблице нет упавших тестов'\n_ok = False\ntry:\n    run_tests(_good, ['order_id:positive'])\nexcept ValueError:\n    _ok = True\nassert _ok, 'Если тест неизвестен, выбрасывайте ValueError'"
    }
   },
   {
    "title": "Порядок сборки моделей",
    "prompt": "<p>dbt строит DAG из <code>ref()</code> и собирает модели в правильном порядке. Напишите функцию <code>build_order(models)</code>: найдите ref-ы каждой модели в SQL, затем из моделей, чьи зависимости уже готовы, выберите одну по алфавиту и верните порядок сборки. Если есть цикл, выбросите <code>ValueError</code>.</p>",
    "hints": [
     "Сначала <code>deps = {name: refs(sql) for name, sql in models.items()}</code>.",
     "Готовая модель: <code>all(d in done for d in deps[m])</code>; если готовых нет — цикл."
    ],
    "check": {
     "tests": "_b = build_order(models)\nassert _b == ['stg_customers', 'stg_orders', 'paid_orders', 'city_revenue', 'customer_ltv'], f'Порядок сборки неверен: {_b}'\nassert build_order({'b': \"select * from {{ ref('a') }}\", 'a': 'select 1'}) == ['a', 'b'], 'Сначала должна собираться a'\n_ok = False\ntry:\n    build_order({'x': \"select * from {{ ref('y') }}\", 'y': \"select * from {{ ref('x') }}\"})\nexcept ValueError:\n    _ok = True\nassert _ok, 'При цикле выбросите ValueError'"
    }
   }
  ]
 },
 "deng-7": {
  "pr": [
   {
    "title": "Количество частей",
    "prompt": "<p>Напишите функцию <code>n_chunks(n_rows, chunksize)</code>: она возвращает, сколько частей получится при чтении с <code>chunksize</code>. Последняя неполная часть тоже считается.</p>",
    "hints": [
     "Округление вверх: <code>(n_rows + chunksize - 1) // chunksize</code>.",
     "Или <code>math.ceil(n_rows / chunksize)</code>."
    ],
    "check": {
     "tests": "assert n_chunks(10, 3) == 4, '10 строк, chunksize=3 → 4 части'\nassert n_chunks(9, 3) == 3, '9 строк, chunksize=3 → 3 части'\nassert n_chunks(1, 100) == 1, '1 строка → 1 часть'\nassert n_chunks(1_000_000, 100_000) == 10, '1 млн строк, 100 тыс. → 10 частей'"
    }
   },
   {
    "title": "Поместится ли в память",
    "prompt": "<p>Оцените, сколько места займёт таблица в памяти. Функция <code>needed_gb(rows, cols, bytes_per_value=8)</code> возвращает нужный объём в GB (1 GB = 1024³ байт). Функция <code>fits(rows, cols, ram_gb)</code> возвращает <code>True</code>, если объём не превышает <code>ram_gb</code>.</p>",
    "hints": [
     "Байты: <code>rows * cols * bytes_per_value</code>, в GB: <code>/ 1024 ** 3</code>.",
     "В <code>fits</code> используйте <code>needed_gb(rows, cols) &lt;= ram_gb</code>."
    ],
    "check": {
     "tests": "assert abs(needed_gb(1024 ** 3, 1) - 8) < 1e-9, '1024³ строк × 1 столбец × 8 байт = 8 GB'\nassert abs(needed_gb(1024 ** 3, 2, 4) - 8) < 1e-9, 'float32 (4 байта) занимает вдвое меньше места'\nassert not fits(200_000_000, 20, 16), '200 млн × 20 столбцов ≈ 29.8 GB — в 16 GB не помещается'\nassert fits(10_000_000, 20, 16), '10 млн × 20 столбцов ≈ 1.5 GB — помещается'"
    }
   },
   {
    "title": "Lazy или action",
    "prompt": "<p>В Spark transformations ленивые, а action запускает вычисления. Напишите функцию <code>op_kind(op)</code>: она возвращает <code>'action'</code> для <code>'count'</code>, <code>'collect'</code>, <code>'write'</code>, <code>'show'</code>, для остальных — <code>'transformation'</code>. Затем в <code>first_action</code> — индекс первого action в списке <code>plan</code>.</p>",
    "hints": [
     "<code>if op in ('count', 'collect', 'write', 'show'): return 'action'</code>.",
     "<code>[op_kind(o) for o in plan].index('action')</code>."
    ],
    "check": {
     "tests": "assert op_kind('filter') == 'transformation' and op_kind('groupBy') == 'transformation', 'filter, groupBy — transformation'\nassert op_kind('count') == 'action' and op_kind('write') == 'action', 'count, write — action'\nassert op_kind('collect') == 'action', 'collect — action'\nassert first_action == 4, f\"Первый action — 'write', индекс 4. У вас {first_action}\""
    }
   },
   {
    "title": "Подсчёт статусов по частям",
    "prompt": "<p>Прочитайте <code>deng_raw_sales.csv</code> с <code>chunksize=4</code> и соберите количество каждого статуса в словарь <code>counts</code> (map → combine). Затем в <code>n</code> — число обработанных частей.</p>",
    "hints": [
     "<code>for chunk in pd.read_csv('deng_raw_sales.csv', chunksize=4):</code>.",
     "В каждой части <code>chunk['status'].value_counts()</code>, затем <code>counts.get(status, 0) + v</code>."
    ],
    "check": {
     "tests": "assert n == 3, f'10 строк, chunksize=4 → 3 части. У вас {n}'\nassert {k: int(v) for k, v in counts.items()} == {'paid': 7, 'cancelled': 2, 'pending': 1}, f'paid=7, cancelled=2, pending=1. У вас {counts}'"
    }
   },
   {
    "title": "Максимум по городам",
    "prompt": "<p><code>max</code> тоже считается по частям. Прочитайте <code>deng_raw_sales.csv</code> с <code>chunksize=3</code>, очистите город через <code>.str.strip().str.capitalize()</code> и соберите в словарь <code>maxes</code> наибольшее значение <code>amount_tg</code> для каждого города (по всем статусам).</p>",
    "hints": [
     "В каждой части: <code>chunk.groupby('city')['amount_tg'].max()</code>.",
     "Объединение: <code>maxes[city] = max(maxes.get(city, v), v)</code>."
    ],
    "check": {
     "tests": "assert sorted(maxes) == ['Алматы', 'Астана', 'Шымкент'], f'Должно быть три очищенных города, у вас {sorted(maxes)}'\nassert int(maxes['Алматы']) == 149000, f\"Максимум Алматы 149 000 ₸, у вас {maxes['Алматы']}\"\nassert int(maxes['Астана']) == 117500 and int(maxes['Шымкент']) == 18900, 'Астана 117 500 ₸, Шымкент 18 900 ₸'"
    }
   },
   {
    "title": "Разбиение по ключу",
    "prompt": "<p>Spark разбивает данные на partition-ы по ключу: один ключ всегда попадает в один partition. Напишите функцию <code>partition_of(key, n)</code> — <code>key % n</code>. Разбейте строки из <code>deng_orders.csv</code> по <code>customer_id</code> на 3 partition-а и запишите в список <code>sizes</code> число строк в каждом partition-е (по порядку 0, 1, 2).</p>",
    "hints": [
     "<code>orders['customer_id'].apply(lambda k: partition_of(k, 3))</code>.",
     "<code>[int((parts == p).sum()) for p in range(3)]</code>."
    ],
    "check": {
     "tests": "assert partition_of(7, 3) == 1 and partition_of(6, 3) == 0, 'partition_of(7, 3) = 1'\nassert [int(x) for x in sizes] == [3, 5, 4], f'Размеры partition-ов [3, 5, 4], у вас {sizes}'\nassert sum(sizes) == 12, 'Все 12 строк должны быть распределены'"
    }
   },
   {
    "title": "Средний чек по частям",
    "prompt": "<p>Это не среднее из средних: нужно собирать сумму и количество. Прочитайте <code>deng_raw_sales.csv</code> с <code>chunksize=3</code>, очистите город и возьмите только строки <code>'paid'</code>. Для каждого города соберите сумму и количество и в словарь <code>avg</code> запишите средний чек.</p>",
    "hints": [
     "В каждой части: очистка и <code>chunk[chunk['status'] == 'paid']</code>.",
     "Два словаря: <code>sums</code> и <code>cnts</code>; в конце <code>sums[city] / cnts[city]</code>."
    ],
    "check": {
     "tests": "assert sorted(avg) == ['Алматы', 'Астана', 'Шымкент'], f'Должно быть три города, у вас {sorted(avg)}'\nassert abs(float(avg['Алматы']) - 66050) < 1e-6, f\"Алматы: 264 200 / 4 = 66 050 ₸, у вас {avg['Алматы']}\"\nassert abs(float(avg['Астана']) - 117500) < 1e-6, 'Астана: 117 500 / 1'\nassert abs(float(avg['Шымкент']) - 11700) < 1e-6, 'Шымкент: 23 400 / 2 = 11 700 ₸'"
    }
   },
   {
    "title": "Broadcast join по частям",
    "prompt": "<p>Spark рассылает маленькую таблицу-измерение на каждую машину (<b>broadcast join</b>). Повторите это: <code>deng_products.csv</code> прочитайте целиком, а <code>deng_orders.csv</code> читайте с <code>chunksize=5</code> и соединяйте каждую часть с products. Затем выполните <code>revenue = qty * price_tg</code>. В словарь <code>by_cat</code> запишите выручку по категориям, а в <code>n</code> — число частей.</p>",
    "hints": [
     "В каждой части: <code>chunk.merge(products, on='product_id')</code>.",
     "По категории: <code>m.groupby('category')['revenue'].sum()</code>, затем добавьте в словарь."
    ],
    "check": {
     "tests": "assert n == 3, f'12 строк, chunksize=5 → 3 части. У вас {n}'\nassert {k: int(v) for k, v in by_cat.items()} == {'electronics': 381700, 'home': 182700, 'books': 36000}, f'electronics 381 700, home 182 700, books 36 000 ₸. У вас {by_cat}'\nassert sum(int(v) for v in by_cat.values()) == 600400, 'Общая выручка 600 400 ₸'"
    }
   }
  ]
 },
 "deng-8": {
  "pr": [
   {
    "title": "Стоимость хранения",
    "prompt": "<p>В lake хранение стоит примерно $0.023 за GB в месяц. Напишите функцию <code>storage_cost(gb, months=1, price_per_gb=0.023)</code>: она возвращает стоимость хранения. Затем в <code>yearly</code> запишите стоимость 2 000 GB данных за год (12 месяцев).</p>",
    "hints": [
     "Счёт: <code>gb * months * price_per_gb</code>.",
     "<code>yearly = storage_cost(2000, months=12)</code>."
    ],
    "check": {
     "tests": "assert abs(storage_cost(1000) - 23.0) < 1e-9, '1 000 GB за месяц = $23'\nassert abs(storage_cost(100, months=3, price_per_gb=0.004) - 1.2) < 1e-9, 'По архивной цене: 100 × 3 × 0.004 = $1.2'\nassert yearly is not None and abs(float(yearly) - 552.0) < 1e-9, f'2 000 GB × 12 месяцев × 0.023 = $552, у вас {yearly}'"
    }
   },
   {
    "title": "Счёт за кластер",
    "prompt": "<p>Модель оплаты по времени работы: сколько часов кластер включён, столько и платим. Напишите функцию <code>cluster_cost(nodes, hours, price_per_node_hour)</code>. Затем в <code>monthly</code> — счёт за кластер из 10 нод, который работает 3 часа в день, по $0.5 в час, в течение 30 дней.</p>",
    "hints": [
     "Счёт: <code>nodes * hours * price_per_node_hour</code>.",
     "Месячный: умножьте дневной счёт на 30."
    ],
    "check": {
     "tests": "assert abs(cluster_cost(10, 3, 0.5) - 15.0) < 1e-9, '10 нод × 3 ч × $0.5 = $15'\nassert abs(cluster_cost(4, 24, 1.0) - 96.0) < 1e-9, '4 ноды × 24 ч × $1 = $96'\nassert monthly is not None and abs(float(monthly) - 450.0) < 1e-9, f'Месячный счёт $450, у вас {monthly}'"
    }
   },
   {
    "title": "Аналоги сервисов",
    "prompt": "<p>Создайте dict <code>to_gcp</code>, который переводит сервисы AWS из таблицы урока в аналоги Google Cloud: <code>S3</code>, <code>Redshift</code>, <code>EC2</code>, <code>Lambda</code>, <code>EMR</code>. Затем функция <code>translate(services)</code> переводит список и для неизвестного сервиса ставит <code>'?'</code>.</p>",
    "hints": [
     "Lake: S3 → GCS, склад: Redshift → BigQuery, управляемый Spark: EMR → Dataproc.",
     "<code>[to_gcp.get(s, '?') for s in services]</code>."
    ],
    "check": {
     "tests": "assert to_gcp.get('S3') == 'GCS' and to_gcp.get('Redshift') == 'BigQuery', 'S3 → GCS, Redshift → BigQuery'\nassert to_gcp.get('EMR') == 'Dataproc' and to_gcp.get('Lambda') == 'Cloud Functions', 'EMR → Dataproc, Lambda → Cloud Functions'\nassert to_gcp.get('EC2') == 'Compute Engine', 'EC2 → Compute Engine'\nassert translate(['S3', 'EMR', 'Kinesis']) == ['GCS', 'Dataproc', '?'], \"Неизвестный сервис → '?'\""
    }
   },
   {
    "title": "Объём сканирования с фильтром",
    "prompt": "<p>Таблица партиционирована по дате и хранится по столбцам. Напишите функцию <code>scanned_gb(total_gb, days_total, days_query, col_share)</code>: она возвращает объём, который сканируется после фильтра по партиции и выбора столбцов. Затем напишите функцию <code>scan_cost(gb, price_per_tb=6.25)</code> (1 TB = 1024 GB) и вычислите <code>saving</code> — разницу счетов за запрос <code>SELECT *</code> (все дни, все столбцы) и за запрос за 7 дней с 10% столбцов для таблицы 730 GB на 365 дней.</p>",
    "hints": [
     "Сканирование: <code>total_gb / days_total * days_query * col_share</code>.",
     "Счёт: <code>gb / 1024 * price_per_tb</code>; разница: полное сканирование минус сканирование с фильтром."
    ],
    "check": {
     "tests": "assert abs(scanned_gb(730, 365, 7, 0.1) - 1.4) < 1e-9, '730 / 365 × 7 × 0.1 = 1.4 GB'\nassert abs(scanned_gb(730, 365, 365, 1.0) - 730) < 1e-9, 'Без фильтра — вся таблица'\nassert abs(scan_cost(1024) - 6.25) < 1e-9, '1 TB = $6.25'\nassert saving is not None and abs(float(saving) - (728.6 / 1024 * 6.25)) < 1e-6, f'Разница ≈ $4.45, у вас {saving}'"
    }
   },
   {
    "title": "Простаивающий кластер",
    "prompt": "<p>Забытый кластер ест деньги и ночью. Напишите функцию <code>idle_cost(nodes, price, hours_on, hours_used, days=30)</code>: она возвращает месячную стоимость часов, когда кластер включён, но простаивает. Затем в <code>idle_share</code> — доля простоя в счёте кластера из 8 нод по $0.6 в час, который работает круглосуточно, но используется 6 часов в день (0..1).</p>",
    "hints": [
     "Простойные часы: <code>hours_on - hours_used</code>; счёт: <code>nodes * price * бос_сағат * days</code>.",
     "Общий счёт: <code>8 * 0.6 * 24 * 30</code>; доля — деление."
    ],
    "check": {
     "tests": "assert abs(idle_cost(8, 0.6, 24, 6) - 2592.0) < 1e-6, '8 × 0.6 × 18 ч × 30 дней = $2 592'\nassert abs(idle_cost(2, 1.0, 10, 10) - 0) < 1e-9, 'Если всё время используется, простоя нет'\nassert abs(idle_cost(1, 1.0, 5, 1, days=7) - 28.0) < 1e-9, '1 × 1 × 4 × 7 = $28'\nassert idle_share is not None and abs(float(idle_share) - 0.75) < 1e-9, f'18 из 24 часов простаивают → 0.75, у вас {idle_share}'"
    }
   },
   {
    "title": "Parquet экономит деньги",
    "prompt": "<p>При переходе с CSV на Parquet файл уменьшается в <code>ratio</code> раз, и читаются только нужные столбцы. Напишите функцию <code>monthly_saving(csv_gb, ratio, cols_read, cols_total, queries, price_per_tb=6.25)</code>: она возвращает разницу между счётом за <code>queries</code> запросов, которые читают CSV целиком, и счётом за те же запросы к Parquet (1 TB = 1024 GB). Затем в <code>saving</code> — экономия для: 1 200 GB CSV, сжатие в 6 раз, 4 из 40 столбцов, 100 запросов в месяц.</p>",
    "hints": [
     "В Parquet один запрос: <code>csv_gb / ratio * cols_read / cols_total</code> GB.",
     "Счёт для каждого: <code>gb * queries / 1024 * price_per_tb</code>."
    ],
    "check": {
     "tests": "assert abs(monthly_saving(1024, 1, 10, 10, 1) - 0) < 1e-9, 'Без сжатия, все столбцы — экономии нет'\nassert abs(monthly_saving(1024, 2, 10, 10, 1) - 3.125) < 1e-9, 'Сжатие в 2 раза: $6.25 - $3.125'\nassert saving is not None and abs(float(saving) - 720.21484375) < 1e-6, f'Экономия ≈ $720.21, у вас {saving}'"
    }
   },
   {
    "title": "Месячный счёт и бюджет",
    "prompt": "<p>Составьте месячный счёт команды. <code>items</code> — три вида расходов. Функция <code>item_cost(item)</code> считает по типу: <code>'storage'</code> — <code>gb × 0.023</code>; <code>'cluster'</code> — <code>nodes × hours × price × days</code>; <code>'bigquery'</code> — <code>gb_scanned / 1024 × 6.25</code>; неизвестный тип — <code>ValueError</code>. Затем <code>bill</code> (<code>{name: құны}</code>), <code>total</code>, <code>over_budget</code> (<code>total &gt; BUDGET</code>) и <code>overage</code> (сумма сверх бюджета, если её нет — 0).</p>",
    "hints": [
     "В <code>item_cost</code> — <code>if kind == ...: return ...</code>, в конце — <code>raise ValueError(...)</code>.",
     "<code>overage = max(0, total - BUDGET)</code>."
    ],
    "check": {
     "tests": "assert abs(bill['lake'] - 46.0) < 1e-6 and abs(bill['spark'] - 360.0) < 1e-6, 'lake = $46, spark = $360'\nassert abs(bill['dashboards'] - 250.0) < 1e-6, 'dashboards: 40 960 GB = 40 TB × $6.25 = $250'\nassert abs(float(total) - 656.0) < 1e-6, f'Общий счёт $656, у вас {total}'\nassert over_budget == True and abs(float(overage) - 56.0) < 1e-6, 'Бюджет $600 → перерасход $56'\n_ok = False\ntry:\n    item_cost({'name': 'x', 'kind': 'gpu'})\nexcept ValueError:\n    _ok = True\nassert _ok, 'При неизвестном типе выбросите ValueError'"
    }
   },
   {
    "title": "Самые дорогие пользователи",
    "prompt": "<p>Дан журнал запросов BigQuery <code>log</code>. Посчитайте стоимость каждого запроса (<code>gb_scanned / 1024 × 6.25</code>) в столбец <code>cost_usd</code> и постройте DataFrame <code>report</code>: столбцы <code>user</code>, <code>queries</code> (число), <code>cost_usd</code> (сумма); отсортирован по стоимости по убыванию, индекс с 0. Затем в <code>top_share</code> — доля первого пользователя в общем счёте, округлённая до 3 знаков.</p>",
    "hints": [
     "<code>log['cost_usd'] = log['gb_scanned'] / 1024 * 6.25</code>, затем <code>groupby('user', as_index=False).agg(...)</code>.",
     "Доля: <code>round(report['cost_usd'].iloc[0] / report['cost_usd'].sum(), 3)</code>."
    ],
    "check": {
     "tests": "assert report is not None and list(report.columns) == ['user', 'queries', 'cost_usd'], 'Столбцы: user, queries, cost_usd'\nassert list(report['user']) == ['aigerim', 'daniyar', 'meruert'], f\"Порядок: aigerim, daniyar, meruert. У вас {list(report['user'])}\"\nassert [int(x) for x in report['queries']] == [3, 2, 2], 'Число запросов: 3, 2, 2'\nassert [round(float(x), 5) for x in report['cost_usd']] == [21.875, 12.5, 2.34375], 'Стоимость: $21.875, $12.5, $2.34375'\nassert top_share is not None and abs(float(top_share) - 0.596) < 1e-9, f'21.875 / 36.71875 ≈ 0.596, у вас {top_share}'"
    }
   }
  ]
 }
} });
