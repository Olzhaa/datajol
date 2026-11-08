// Practice tasks after the lessons of m6-3, m6-5. Each lesson's list opens one task at a time.
DJ.addPractice('m6-3', {
 "ops-1": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ең ұзақ кезең",
   "prompt": "<p><code>hours</code> сөздігінде жобаның әр кезеңіне жұмсалған сағат бар. <code>longest</code> айнымалысына ең көп уақыт кеткен кезеңнің атауын жазыңыз.</p>",
   "starter": "hours = {'data_collection': 30, 'data_cleaning': 45, 'feature_engineering': 25,\n         'training': 15, 'evaluation': 10, 'deployment': 20, 'monitoring': 15}\nlongest = None\nprint(longest)\n",
   "solution": "hours = {'data_collection': 30, 'data_cleaning': 45, 'feature_engineering': 25,\n         'training': 15, 'evaluation': 10, 'deployment': 20, 'monitoring': 15}\nlongest = max(hours, key=hours.get)\nprint(longest)\n",
   "hints": [
    "Ең үлкен мәнді кілт: <code>max(hours, key=hours.get)</code>.",
    "Жауап «модель үйрету» емес екенін байқаңыз."
   ],
   "check": {
    "tests": "assert longest == 'data_cleaning', f'Ең ұзақ кезең — data_cleaning (45 сағат), сізде {longest}'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Кезеңнің нөмірі",
   "prompt": "<p><code>stage_number(stage)</code> функциясын жазыңыз: кезеңнің <code>STAGES</code> тізіміндегі реттік нөмірін 1-ден бастап қайтарсын (<code>'data'</code> → 1, <code>'monitoring'</code> → 5). Тізімде жоқ кезең үшін <code>ValueError</code>.</p>",
   "starter": "STAGES = ['data', 'training', 'evaluation', 'deployment', 'monitoring']\n\ndef stage_number(stage):\n    return STAGES.index(stage)\n",
   "solution": "STAGES = ['data', 'training', 'evaluation', 'deployment', 'monitoring']\n\ndef stage_number(stage):\n    if stage not in STAGES:\n        raise ValueError(f'Белгісіз кезең: {stage}')\n    return STAGES.index(stage) + 1\n\nprint(stage_number('deployment'))\n",
   "hints": [
    "<code>STAGES.index(stage)</code> 0-ден санайды, сондықтан <code>+ 1</code>.",
    "<code>if stage not in STAGES: raise ValueError(...)</code>."
   ],
   "check": {
    "tests": "assert stage_number('data') == 1 and stage_number('monitoring') == 5, \"'data' → 1, 'monitoring' → 5\"\nassert stage_number('deployment') == 4, \"'deployment' → 4\"\ntry:\n    stage_number('design')\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Белгісіз кезеңде ValueError көтеріңіз')"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Модельден тыс уақыт",
   "prompt": "<p>«Hidden Technical Debt» мақаласының идеясын сандармен тексерейік. <code>outside_share</code> айнымалысына <code>training</code> мен <code>evaluation</code>-нан <b>басқа</b> кезеңдерге кеткен уақыттың пайызын (0–100, 1 таңбаға дөңгелектенген) жазыңыз.</p>",
   "starter": "hours = {'data_collection': 30, 'data_cleaning': 45, 'feature_engineering': 25,\n         'training': 15, 'evaluation': 10, 'deployment': 20, 'monitoring': 15}\noutside_share = None\nprint(outside_share)\n",
   "solution": "hours = {'data_collection': 30, 'data_cleaning': 45, 'feature_engineering': 25,\n         'training': 15, 'evaluation': 10, 'deployment': 20, 'monitoring': 15}\nmodel_hours = hours['training'] + hours['evaluation']\noutside_share = round((sum(hours.values()) - model_hours) / sum(hours.values()) * 100, 1)\nprint(outside_share)\n",
   "hints": [
    "Барлық уақыт: <code>sum(hours.values())</code>; модельге: <code>hours['training'] + hours['evaluation']</code>.",
    "Пайыз: <code>(барлығы - модельге) / барлығы * 100</code>, сосын <code>round(..., 1)</code>."
   ],
   "check": {
    "tests": "assert outside_share is not None and abs(float(outside_share) - 84.4) < 0.01, f'outside_share = 135 / 160 * 100 ≈ 84.4 болуы керек, сізде {outside_share}'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Алдыңғы кезең",
   "prompt": "<p><code>prev_stage(stage)</code> функциясын жазыңыз: <code>STAGES</code> тізіміндегі алдыңғы кезеңді қайтарсын, ал <code>'data'</code>-дан бұрын цикл бойынша <code>'monitoring'</code> тұрады (мониторинг деректерге қайта әкеледі). Тізімде жоқ кезең үшін <code>ValueError</code>.</p>",
   "starter": "STAGES = ['data', 'training', 'evaluation', 'deployment', 'monitoring']\n\ndef prev_stage(stage):\n    return STAGES[STAGES.index(stage) - 1] if stage != 'data' else None\n",
   "solution": "STAGES = ['data', 'training', 'evaluation', 'deployment', 'monitoring']\n\ndef prev_stage(stage):\n    if stage not in STAGES:\n        raise ValueError(f'Белгісіз кезең: {stage}')\n    i = STAGES.index(stage)\n    return STAGES[(i - 1) % len(STAGES)]\n\nprint(prev_stage('training'), prev_stage('data'))\n",
   "hints": [
    "Қалдық операторы теріс санмен де жұмыс істейді: <code>(i - 1) % len(STAGES)</code>.",
    "Алдымен <code>if stage not in STAGES: raise ValueError(...)</code>."
   ],
   "check": {
    "tests": "assert prev_stage('training') == 'data' and prev_stage('monitoring') == 'deployment', \"prev_stage('training') → 'data', prev_stage('monitoring') → 'deployment'\"\nassert prev_stage('data') == 'monitoring', \"'data'-дан бұрын цикл бойынша 'monitoring'\"\ntry:\n    prev_stage('sales')\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Белгісіз кезеңде ValueError көтеріңіз')"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Lifecycle журналын тексеру",
   "prompt": "<p>Команда кезеңдердің ауысуын журналға жазады. <code>valid_history(history)</code> функциясын жазыңыз: журналдағы әр келесі кезең алдыңғысының цикл бойынша <b>келесісі</b> болса <code>True</code>, әйтпесе <code>False</code>. Бос немесе бір элементті журнал дұрыс деп саналады. <code>next_stage</code> дайын.</p>",
   "starter": "STAGES = ['data', 'training', 'evaluation', 'deployment', 'monitoring']\n\ndef next_stage(stage):\n    return STAGES[(STAGES.index(stage) + 1) % len(STAGES)]\n\ndef valid_history(history):\n    return True\n",
   "solution": "STAGES = ['data', 'training', 'evaluation', 'deployment', 'monitoring']\n\ndef next_stage(stage):\n    return STAGES[(STAGES.index(stage) + 1) % len(STAGES)]\n\ndef valid_history(history):\n    for a, b in zip(history, history[1:]):\n        if next_stage(a) != b:\n            return False\n    return True\n\nprint(valid_history(['deployment', 'monitoring', 'data', 'training']))\n",
   "hints": [
    "Көршілес жұптар: <code>zip(history, history[1:])</code>.",
    "Әр жұпта <code>next_stage(a) == b</code> болуы керек."
   ],
   "check": {
    "tests": "assert valid_history(['deployment', 'monitoring', 'data', 'training']) is True, 'monitoring → data цикл бойынша дұрыс'\nassert valid_history(['data', 'deployment']) is False, 'data-дан кейін бірден deployment болмайды (training мен evaluation өткізілді)'\nassert valid_history(['training', 'evaluation', 'training']) is False, 'Кері қадам дұрыс емес'\nassert valid_history([]) is True and valid_history(['data']) is True, 'Бос немесе бір элементті журнал дұрыс'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Сағаттарды топтау",
   "prompt": "<p>Кезеңдерді үш топқа біріктіреміз: <code>GROUPS = {'data': [...], 'model': [...], 'ops': [...]}</code>. <code>group_hours(hours, groups)</code> жазыңыз: әр топтың жалпы сағатын сөздік ретінде қайтарсын. <code>hours</code>-та жоқ кезең 0 деп саналады.</p>",
   "starter": "hours = {'data_collection': 30, 'data_cleaning': 45, 'feature_engineering': 25,\n         'training': 15, 'evaluation': 10, 'deployment': 20, 'monitoring': 15}\nGROUPS = {\n    'data': ['data_collection', 'data_cleaning', 'feature_engineering'],\n    'model': ['training', 'evaluation'],\n    'ops': ['deployment', 'monitoring', 'retraining'],\n}\n\ndef group_hours(hours, groups):\n    return {}\n",
   "solution": "hours = {'data_collection': 30, 'data_cleaning': 45, 'feature_engineering': 25,\n         'training': 15, 'evaluation': 10, 'deployment': 20, 'monitoring': 15}\nGROUPS = {\n    'data': ['data_collection', 'data_cleaning', 'feature_engineering'],\n    'model': ['training', 'evaluation'],\n    'ops': ['deployment', 'monitoring', 'retraining'],\n}\n\ndef group_hours(hours, groups):\n    return {g: sum(hours.get(s, 0) for s in stages) for g, stages in groups.items()}\n\nprint(group_hours(hours, GROUPS))\n",
   "hints": [
    "<code>{g: sum(...) for g, stages in groups.items()}</code>.",
    "Жоқ кезеңге: <code>hours.get(s, 0)</code>."
   ],
   "check": {
    "tests": "assert group_hours(hours, GROUPS) == {'data': 100, 'model': 25, 'ops': 35}, f'Күтілгені data=100, model=25, ops=35, сізде {group_hours(hours, GROUPS)}'\nassert group_hours({}, {'x': ['a']}) == {'x': 0}, 'hours-та жоқ кезең 0'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Lifecycle циклы",
   "prompt": "<p><code>run_cycle(start, steps)</code> жазыңыз: <code>start</code> кезеңінен бастап <code>steps</code> рет келесі кезеңге көшіп, барлық өткен кезеңдер тізімін (басталғанымен бірге, ұзындығы <code>steps + 1</code>) қайтарсын. Сонымен қатар <code>retrain_count(start, steps)</code> жазыңыз: осы жолда <code>'monitoring'</code>-тан <code>'data'</code>-ға неше рет оралғанын (яғни retraining циклы) санасын. Белгісіз кезең үшін <code>ValueError</code>.</p>",
   "starter": "STAGES = ['data', 'training', 'evaluation', 'deployment', 'monitoring']\n\ndef run_cycle(start, steps):\n    return [start]\n\ndef retrain_count(start, steps):\n    return 0\n",
   "solution": "STAGES = ['data', 'training', 'evaluation', 'deployment', 'monitoring']\n\ndef next_stage(stage):\n    if stage not in STAGES:\n        raise ValueError(f'Белгісіз кезең: {stage}')\n    return STAGES[(STAGES.index(stage) + 1) % len(STAGES)]\n\ndef run_cycle(start, steps):\n    if start not in STAGES:\n        raise ValueError(f'Белгісіз кезең: {start}')\n    path = [start]\n    for _ in range(steps):\n        path.append(next_stage(path[-1]))\n    return path\n\ndef retrain_count(start, steps):\n    path = run_cycle(start, steps)\n    return sum(1 for a, b in zip(path, path[1:]) if a == 'monitoring' and b == 'data')\n\nprint(run_cycle('deployment', 4), retrain_count('data', 12))\n",
   "hints": [
    "<code>run_cycle</code>: тізімнің соңғы элементінен келесісін қосып отырыңыз: <code>path.append(next_stage(path[-1]))</code>.",
    "<code>retrain_count</code>: жолдағы <code>('monitoring', 'data')</code> жұптарын санаңыз."
   ],
   "check": {
    "tests": "assert run_cycle('deployment', 4) == ['deployment', 'monitoring', 'data', 'training', 'evaluation'], \"run_cycle('deployment', 4) дұрыс емес\"\nassert run_cycle('data', 0) == ['data'], 'steps=0 болса тек бастапқы кезең'\nassert len(run_cycle('training', 11)) == 12, 'Ұзындығы steps + 1'\nassert retrain_count('data', 12) == 2, 'data-дан 12 қадам: monitoring → data екі рет'\nassert retrain_count('monitoring', 1) == 1 and retrain_count('data', 4) == 0, 'retrain_count дұрыс емес'\ntry:\n    run_cycle('sales', 2)\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Белгісіз кезеңде ValueError')"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Жобалар бойынша кезеңдер",
   "prompt": "<p>Үш жобаның журналы <code>log</code> DataFrame-інде: <code>project</code>, <code>stage</code>, <code>hours</code>. pandas арқылы: <code>avg_by_stage</code> — әр кезеңнің жобалар бойынша орташа сағаты (Series, <code>groupby</code>), <code>share_by_project</code> — әр жобада <code>training</code> кезеңінің үлесі (0–1, Series, индексі — жоба атауы), <code>heavy</code> — орташасы 20 сағаттан көп кезеңдердің сұрыпталған тізімі.</p>",
   "starter": "import pandas as pd\nlog = pd.DataFrame({\n    'project': ['churn'] * 4 + ['price'] * 4 + ['fraud'] * 4,\n    'stage': ['data', 'training', 'deployment', 'monitoring'] * 3,\n    'hours': [40, 10, 20, 10, 30, 20, 15, 5, 50, 15, 25, 30],\n})\navg_by_stage = None\nshare_by_project = None\nheavy = []\n",
   "solution": "import pandas as pd\nlog = pd.DataFrame({\n    'project': ['churn'] * 4 + ['price'] * 4 + ['fraud'] * 4,\n    'stage': ['data', 'training', 'deployment', 'monitoring'] * 3,\n    'hours': [40, 10, 20, 10, 30, 20, 15, 5, 50, 15, 25, 30],\n})\navg_by_stage = log.groupby('stage')['hours'].mean()\ntotal = log.groupby('project')['hours'].sum()\ntrain = log[log['stage'] == 'training'].set_index('project')['hours']\nshare_by_project = train / total\nheavy = sorted(s for s, h in avg_by_stage.items() if h > 20)\nprint(avg_by_stage, share_by_project, heavy)\n",
   "hints": [
    "Орташа: <code>log.groupby('stage')['hours'].mean()</code>; жоба бойынша жалпы: <code>groupby('project')['hours'].sum()</code>.",
    "Training жолдары: <code>log[log['stage'] == 'training'].set_index('project')['hours']</code>, сосын бөліңіз — индекс бойынша сәйкеседі."
   ],
   "check": {
    "tests": "assert avg_by_stage is not None and abs(float(avg_by_stage['data']) - 40) < 1e-9 and abs(float(avg_by_stage['training']) - 15) < 1e-9, 'avg_by_stage: data = 40, training = 15'\nassert share_by_project is not None and abs(float(share_by_project['churn']) - 0.125) < 1e-9, 'churn жобасында training үлесі 10 / 80 = 0.125'\nassert abs(float(share_by_project['price']) - 20 / 70) < 1e-9 and abs(float(share_by_project['fraud']) - 0.125) < 1e-9, 'price: 20/70, fraud: 15/120'\nassert heavy == ['data'], f'Орташасы 20-дан көп кезең тек data (deployment дәл 20), сізде {heavy}'"
   }
  }
 ],
 "ops-2": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бір run тіркеу",
   "prompt": "<p><code>Tracker</code> дайын. Бір run тіркеңіз: аты <code>'rf-200'</code>, params: <code>n_estimators=200</code>, <code>max_depth=6</code>; metrics: <code>val_auc=0.847</code>, <code>val_recall=0.71</code>. <code>tracker</code>-дің әдістерін қолданыңыз.</p>",
   "starter": "class Tracker:\n    \"\"\"MLflow-ға ұқсас кішкентай stub: әр run — params пен metrics сақтайтын dict.\"\"\"\n    def __init__(self):\n        self.runs = []\n    def start_run(self, name):\n        run = {'name': name, 'params': {}, 'metrics': {}}\n        self.runs.append(run)\n        return run\n    def log_param(self, run, key, value):\n        run['params'][key] = value\n    def log_metric(self, run, key, value):\n        run['metrics'][key] = value\n\ntracker = Tracker()\n# осында run тіркеңіз\n",
   "solution": "class Tracker:\n    \"\"\"MLflow-ға ұқсас кішкентай stub: әр run — params пен metrics сақтайтын dict.\"\"\"\n    def __init__(self):\n        self.runs = []\n    def start_run(self, name):\n        run = {'name': name, 'params': {}, 'metrics': {}}\n        self.runs.append(run)\n        return run\n    def log_param(self, run, key, value):\n        run['params'][key] = value\n    def log_metric(self, run, key, value):\n        run['metrics'][key] = value\n\ntracker = Tracker()\nrun = tracker.start_run('rf-200')\ntracker.log_param(run, 'n_estimators', 200)\ntracker.log_param(run, 'max_depth', 6)\ntracker.log_metric(run, 'val_auc', 0.847)\ntracker.log_metric(run, 'val_recall', 0.71)\nprint(tracker.runs)\n",
   "hints": [
    "<code>run = tracker.start_run('rf-200')</code>.",
    "Әр параметрге <code>tracker.log_param(run, ...)</code>, әр метрикаға <code>tracker.log_metric(run, ...)</code>."
   ],
   "check": {
    "tests": "assert len(tracker.runs) == 1 and tracker.runs[0]['name'] == 'rf-200', 'Аты rf-200 бір run болуы керек'\nassert tracker.runs[0]['params'] == {'n_estimators': 200, 'max_depth': 6}, 'params: n_estimators=200, max_depth=6'\nassert tracker.runs[0]['metrics'] == {'val_auc': 0.847, 'val_recall': 0.71}, 'metrics: val_auc=0.847, val_recall=0.71'",
    "mustInclude": [
     "log_param",
     "log_metric"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Run-ды атымен табу",
   "prompt": "<p><code>find_run(runs, name)</code> функциясын жазыңыз: берілген аты бар run-ды (dict) қайтарсын, табылмаса <code>None</code>.</p>",
   "starter": "runs = [\n    {'name': 'lr-c1',    'params': {'model': 'lr', 'C': 1.0},       'metrics': {'val_auc': 0.79, 'val_recall': 0.66}},\n    {'name': 'tree-d5',  'params': {'model': 'tree', 'max_depth': 5}, 'metrics': {'val_auc': 0.83, 'val_recall': 0.71}},\n    {'name': 'tree-d8',  'params': {'model': 'tree', 'max_depth': 8}, 'metrics': {'val_auc': 0.81}},\n    {'name': 'rf-200',   'params': {'model': 'rf', 'n_estimators': 200}, 'metrics': {'val_auc': 0.85, 'val_recall': 0.69}},\n    {'name': 'broken',   'params': {'model': 'rf', 'n_estimators': 500}, 'metrics': {}},\n]\n\ndef find_run(runs, name):\n    return runs[0]\n",
   "solution": "runs = [\n    {'name': 'lr-c1',    'params': {'model': 'lr', 'C': 1.0},       'metrics': {'val_auc': 0.79, 'val_recall': 0.66}},\n    {'name': 'tree-d5',  'params': {'model': 'tree', 'max_depth': 5}, 'metrics': {'val_auc': 0.83, 'val_recall': 0.71}},\n    {'name': 'tree-d8',  'params': {'model': 'tree', 'max_depth': 8}, 'metrics': {'val_auc': 0.81}},\n    {'name': 'rf-200',   'params': {'model': 'rf', 'n_estimators': 200}, 'metrics': {'val_auc': 0.85, 'val_recall': 0.69}},\n    {'name': 'broken',   'params': {'model': 'rf', 'n_estimators': 500}, 'metrics': {}},\n]\n\ndef find_run(runs, name):\n    for r in runs:\n        if r['name'] == name:\n            return r\n    return None\n\nprint(find_run(runs, 'rf-200'))\n",
   "hints": [
    "<code>for r in runs: if r['name'] == name: return r</code>.",
    "Цикл біткенде <code>return None</code>."
   ],
   "check": {
    "tests": "assert find_run(runs, 'rf-200')['params']['n_estimators'] == 200, \"find_run(runs, 'rf-200') сол run-ды қайтаруы керек\"\nassert find_run(runs, 'tree-d8')['metrics'] == {'val_auc': 0.81}, \"find_run(runs, 'tree-d8') дұрыс емес\"\nassert find_run(runs, 'xgb') is None, 'Табылмаса None'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Метрика мәндері",
   "prompt": "<p><code>metric_values(runs, metric)</code> функциясын жазыңыз: осы метрикасы бар run-дардың мәндерін run-дардың ретімен тізім етіп қайтарсын.</p>",
   "starter": "runs = [\n    {'name': 'lr-c1',    'params': {'model': 'lr', 'C': 1.0},       'metrics': {'val_auc': 0.79, 'val_recall': 0.66}},\n    {'name': 'tree-d5',  'params': {'model': 'tree', 'max_depth': 5}, 'metrics': {'val_auc': 0.83, 'val_recall': 0.71}},\n    {'name': 'tree-d8',  'params': {'model': 'tree', 'max_depth': 8}, 'metrics': {'val_auc': 0.81}},\n    {'name': 'rf-200',   'params': {'model': 'rf', 'n_estimators': 200}, 'metrics': {'val_auc': 0.85, 'val_recall': 0.69}},\n    {'name': 'broken',   'params': {'model': 'rf', 'n_estimators': 500}, 'metrics': {}},\n]\n\ndef metric_values(runs, metric):\n    return [r['metrics'][metric] for r in runs]\n",
   "solution": "runs = [\n    {'name': 'lr-c1',    'params': {'model': 'lr', 'C': 1.0},       'metrics': {'val_auc': 0.79, 'val_recall': 0.66}},\n    {'name': 'tree-d5',  'params': {'model': 'tree', 'max_depth': 5}, 'metrics': {'val_auc': 0.83, 'val_recall': 0.71}},\n    {'name': 'tree-d8',  'params': {'model': 'tree', 'max_depth': 8}, 'metrics': {'val_auc': 0.81}},\n    {'name': 'rf-200',   'params': {'model': 'rf', 'n_estimators': 200}, 'metrics': {'val_auc': 0.85, 'val_recall': 0.69}},\n    {'name': 'broken',   'params': {'model': 'rf', 'n_estimators': 500}, 'metrics': {}},\n]\n\ndef metric_values(runs, metric):\n    return [r['metrics'][metric] for r in runs if metric in r['metrics']]\n\nprint(metric_values(runs, 'val_recall'))\n",
   "hints": [
    "Сүзгі: <code>if metric in r['metrics']</code>.",
    "List comprehension ішінде сүзгі соңында тұрады."
   ],
   "check": {
    "tests": "assert metric_values(runs, 'val_auc') == [0.79, 0.83, 0.81, 0.85], 'val_auc мәндері: 0.79, 0.83, 0.81, 0.85'\nassert metric_values(runs, 'val_recall') == [0.66, 0.71, 0.69], 'Метрикасы жоқ run-дар өткізіледі'\nassert metric_values(runs, 'rmse') == [], 'Ешкімде жоқ метрика → []'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Run-дар рейтингі",
   "prompt": "<p><code>leaderboard(runs, metric, n=3)</code> жазыңыз: метрика бойынша ең жақсы <code>n</code> run-дың аттарын кему ретімен қайтарсын. Метрикасы жоқ run-дар есептелмейді.</p>",
   "starter": "runs = [\n    {'name': 'lr-c1',    'params': {'model': 'lr', 'C': 1.0},       'metrics': {'val_auc': 0.79, 'val_recall': 0.66}},\n    {'name': 'tree-d5',  'params': {'model': 'tree', 'max_depth': 5}, 'metrics': {'val_auc': 0.83, 'val_recall': 0.71}},\n    {'name': 'tree-d8',  'params': {'model': 'tree', 'max_depth': 8}, 'metrics': {'val_auc': 0.81}},\n    {'name': 'rf-200',   'params': {'model': 'rf', 'n_estimators': 200}, 'metrics': {'val_auc': 0.85, 'val_recall': 0.69}},\n    {'name': 'broken',   'params': {'model': 'rf', 'n_estimators': 500}, 'metrics': {}},\n]\n\ndef leaderboard(runs, metric, n=3):\n    return [r['name'] for r in runs][:n]\n",
   "solution": "runs = [\n    {'name': 'lr-c1',    'params': {'model': 'lr', 'C': 1.0},       'metrics': {'val_auc': 0.79, 'val_recall': 0.66}},\n    {'name': 'tree-d5',  'params': {'model': 'tree', 'max_depth': 5}, 'metrics': {'val_auc': 0.83, 'val_recall': 0.71}},\n    {'name': 'tree-d8',  'params': {'model': 'tree', 'max_depth': 8}, 'metrics': {'val_auc': 0.81}},\n    {'name': 'rf-200',   'params': {'model': 'rf', 'n_estimators': 200}, 'metrics': {'val_auc': 0.85, 'val_recall': 0.69}},\n    {'name': 'broken',   'params': {'model': 'rf', 'n_estimators': 500}, 'metrics': {}},\n]\n\ndef leaderboard(runs, metric, n=3):\n    valid = [r for r in runs if metric in r['metrics']]\n    valid = sorted(valid, key=lambda r: r['metrics'][metric], reverse=True)\n    return [r['name'] for r in valid[:n]]\n\nprint(leaderboard(runs, 'val_auc'))\n",
   "hints": [
    "Алдымен сүзгі, сосын <code>sorted(valid, key=lambda r: r['metrics'][metric], reverse=True)</code>.",
    "Аттары: <code>[r['name'] for r in valid[:n]]</code>."
   ],
   "check": {
    "tests": "assert leaderboard(runs, 'val_auc') == ['rf-200', 'tree-d5', 'tree-d8'], f\"Күтілгені ['rf-200', 'tree-d5', 'tree-d8'], сізде {leaderboard(runs, 'val_auc')}\"\nassert leaderboard(runs, 'val_recall', n=2) == ['tree-d5', 'rf-200'], 'val_recall бойынша алғашқы екеуі'\nassert leaderboard(runs, 'val_recall', n=10) == ['tree-d5', 'rf-200', 'lr-c1'], 'Метрикасы жоқ run-дар тізімге кірмейді'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Параметр бойынша сүзу",
   "prompt": "<p><code>filter_runs(runs, key, value)</code> жазыңыз: <code>params[key] == value</code> болатын run-дардың аттарын қайтарсын. Сосын <code>best_tree</code> айнымалысына <code>model == 'tree'</code> run-дарының ішінде <code>val_auc</code> ең жоғары run-дың атын жазыңыз.</p>",
   "starter": "runs = [\n    {'name': 'lr-c1',    'params': {'model': 'lr', 'C': 1.0},       'metrics': {'val_auc': 0.79, 'val_recall': 0.66}},\n    {'name': 'tree-d5',  'params': {'model': 'tree', 'max_depth': 5}, 'metrics': {'val_auc': 0.83, 'val_recall': 0.71}},\n    {'name': 'tree-d8',  'params': {'model': 'tree', 'max_depth': 8}, 'metrics': {'val_auc': 0.81}},\n    {'name': 'rf-200',   'params': {'model': 'rf', 'n_estimators': 200}, 'metrics': {'val_auc': 0.85, 'val_recall': 0.69}},\n    {'name': 'broken',   'params': {'model': 'rf', 'n_estimators': 500}, 'metrics': {}},\n]\n\ndef filter_runs(runs, key, value):\n    return []\n\nbest_tree = None\n",
   "solution": "runs = [\n    {'name': 'lr-c1',    'params': {'model': 'lr', 'C': 1.0},       'metrics': {'val_auc': 0.79, 'val_recall': 0.66}},\n    {'name': 'tree-d5',  'params': {'model': 'tree', 'max_depth': 5}, 'metrics': {'val_auc': 0.83, 'val_recall': 0.71}},\n    {'name': 'tree-d8',  'params': {'model': 'tree', 'max_depth': 8}, 'metrics': {'val_auc': 0.81}},\n    {'name': 'rf-200',   'params': {'model': 'rf', 'n_estimators': 200}, 'metrics': {'val_auc': 0.85, 'val_recall': 0.69}},\n    {'name': 'broken',   'params': {'model': 'rf', 'n_estimators': 500}, 'metrics': {}},\n]\n\ndef filter_runs(runs, key, value):\n    return [r['name'] for r in runs if r['params'].get(key) == value]\n\ntrees = [r for r in runs if r['name'] in filter_runs(runs, 'model', 'tree')]\nbest_tree = max(trees, key=lambda r: r['metrics'].get('val_auc', 0))['name']\nprint(filter_runs(runs, 'model', 'rf'), best_tree)\n",
   "hints": [
    "Параметр жоқ run-да қате болмауы үшін: <code>r['params'].get(key) == value</code>.",
    "Tree run-дарын тауып, <code>max(..., key=lambda r: r['metrics']['val_auc'])</code>."
   ],
   "check": {
    "tests": "assert filter_runs(runs, 'model', 'rf') == ['rf-200', 'broken'], \"model='rf' run-дары: rf-200, broken\"\nassert filter_runs(runs, 'max_depth', 8) == ['tree-d8'], 'max_depth=8 → tree-d8'\nassert filter_runs(runs, 'C', 100) == [], 'Сәйкес run жоқ → []'\nassert best_tree == 'tree-d5', f'Tree-лердің ең жақсысы tree-d5 (0.83), сізде {best_tree}'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Run-дарды кестеге",
   "prompt": "<p><code>mlflow.search_runs</code> run-дарды DataFrame ретінде береді. <code>runs_to_df(runs)</code> жазыңыз: әр run — бір жол, бағандар: <code>name</code>, әр параметр <code>params.&lt;атауы&gt;</code>, әр метрика <code>metrics.&lt;атауы&gt;</code>. Жоқ мәндер NaN. Сосын <code>df = runs_to_df(runs)</code>.</p>",
   "starter": "import pandas as pd\nruns = [\n    {'name': 'lr-c1',    'params': {'model': 'lr', 'C': 1.0},       'metrics': {'val_auc': 0.79, 'val_recall': 0.66}},\n    {'name': 'tree-d5',  'params': {'model': 'tree', 'max_depth': 5}, 'metrics': {'val_auc': 0.83, 'val_recall': 0.71}},\n    {'name': 'tree-d8',  'params': {'model': 'tree', 'max_depth': 8}, 'metrics': {'val_auc': 0.81}},\n    {'name': 'rf-200',   'params': {'model': 'rf', 'n_estimators': 200}, 'metrics': {'val_auc': 0.85, 'val_recall': 0.69}},\n    {'name': 'broken',   'params': {'model': 'rf', 'n_estimators': 500}, 'metrics': {}},\n]\n\ndef runs_to_df(runs):\n    return pd.DataFrame(runs)\n",
   "solution": "import pandas as pd\nruns = [\n    {'name': 'lr-c1',    'params': {'model': 'lr', 'C': 1.0},       'metrics': {'val_auc': 0.79, 'val_recall': 0.66}},\n    {'name': 'tree-d5',  'params': {'model': 'tree', 'max_depth': 5}, 'metrics': {'val_auc': 0.83, 'val_recall': 0.71}},\n    {'name': 'tree-d8',  'params': {'model': 'tree', 'max_depth': 8}, 'metrics': {'val_auc': 0.81}},\n    {'name': 'rf-200',   'params': {'model': 'rf', 'n_estimators': 200}, 'metrics': {'val_auc': 0.85, 'val_recall': 0.69}},\n    {'name': 'broken',   'params': {'model': 'rf', 'n_estimators': 500}, 'metrics': {}},\n]\n\ndef runs_to_df(runs):\n    rows = []\n    for r in runs:\n        row = {'name': r['name']}\n        for k, v in r['params'].items():\n            row[f'params.{k}'] = v\n        for k, v in r['metrics'].items():\n            row[f'metrics.{k}'] = v\n        rows.append(row)\n    return pd.DataFrame(rows)\n\ndf = runs_to_df(runs)\nprint(df.sort_values('metrics.val_auc', ascending=False))\n",
   "hints": [
    "Әр run үшін «жалпақ» сөздік жасаңыз: <code>row[f'params.{k}'] = v</code>.",
    "Сөздіктер тізімінен <code>pd.DataFrame(rows)</code> жоқ мәндерді NaN етеді."
   ],
   "check": {
    "tests": "assert list(df['name']) == ['lr-c1', 'tree-d5', 'tree-d8', 'rf-200', 'broken'], 'Әр run — бір жол, ретімен'\nassert {'params.model', 'params.C', 'params.max_depth', 'params.n_estimators', 'metrics.val_auc', 'metrics.val_recall'} <= set(df.columns), f'params.* және metrics.* бағандары керек, сізде {list(df.columns)}'\nassert float(df.loc[df['name'] == 'rf-200', 'metrics.val_auc'].iloc[0]) == 0.85, 'rf-200 үшін metrics.val_auc = 0.85'\nassert df.loc[df['name'] == 'broken', 'metrics.val_auc'].isna().all(), 'Жоқ метрика NaN болуы керек'\nassert df.sort_values('metrics.val_auc', ascending=False)['name'].iloc[0] == 'rf-200', 'Кестені метрика бойынша сұрыптауға болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Grid search тіркеу",
   "prompt": "<p><code>score(depth, lr)</code> — валидациядағы AUC-ты есептейтін дайын функция. <code>DEPTHS</code> × <code>LRS</code> торының әр комбинациясы үшін run ашыңыз (аты <code>f'gb-d{depth}-lr{lr}'</code>), <code>max_depth</code> пен <code>learning_rate</code> параметрлерін және <code>val_auc</code> метрикасын (4 таңбаға дөңгелектенген) тіркеңіз. Run-дар рет: алдымен depth, ішінде lr. Сосын <code>best</code> айнымалысына ең жоғары <code>val_auc</code>-ы бар run-ды (dict) жазыңыз.</p>",
   "starter": "class Tracker:\n    \"\"\"MLflow-ға ұқсас кішкентай stub: әр run — params пен metrics сақтайтын dict.\"\"\"\n    def __init__(self):\n        self.runs = []\n    def start_run(self, name):\n        run = {'name': name, 'params': {}, 'metrics': {}}\n        self.runs.append(run)\n        return run\n    def log_param(self, run, key, value):\n        run['params'][key] = value\n    def log_metric(self, run, key, value):\n        run['metrics'][key] = value\n\ntracker = Tracker()\nDEPTHS = [2, 4, 6]\nLRS = [0.05, 0.1]\n\ndef score(depth, lr):\n    return 0.86 - 0.004 * (depth - 4) ** 2 - 0.3 * (lr - 0.08) ** 2\n\nbest = None\n",
   "solution": "class Tracker:\n    \"\"\"MLflow-ға ұқсас кішкентай stub: әр run — params пен metrics сақтайтын dict.\"\"\"\n    def __init__(self):\n        self.runs = []\n    def start_run(self, name):\n        run = {'name': name, 'params': {}, 'metrics': {}}\n        self.runs.append(run)\n        return run\n    def log_param(self, run, key, value):\n        run['params'][key] = value\n    def log_metric(self, run, key, value):\n        run['metrics'][key] = value\n\ntracker = Tracker()\nDEPTHS = [2, 4, 6]\nLRS = [0.05, 0.1]\n\ndef score(depth, lr):\n    return 0.86 - 0.004 * (depth - 4) ** 2 - 0.3 * (lr - 0.08) ** 2\n\nfor depth in DEPTHS:\n    for lr in LRS:\n        run = tracker.start_run(f'gb-d{depth}-lr{lr}')\n        tracker.log_param(run, 'max_depth', depth)\n        tracker.log_param(run, 'learning_rate', lr)\n        tracker.log_metric(run, 'val_auc', round(score(depth, lr), 4))\n\nbest = max(tracker.runs, key=lambda r: r['metrics']['val_auc'])\nprint(best)\n",
   "hints": [
    "Екі ішкі цикл: <code>for depth in DEPTHS:</code> ішінде <code>for lr in LRS:</code>.",
    "Ең жақсысы: <code>max(tracker.runs, key=lambda r: r['metrics']['val_auc'])</code>."
   ],
   "check": {
    "tests": "assert len(tracker.runs) == 6, f'3 × 2 = 6 run болуы керек, сізде {len(tracker.runs)}'\nassert [r['name'] for r in tracker.runs] == ['gb-d2-lr0.05', 'gb-d2-lr0.1', 'gb-d4-lr0.05', 'gb-d4-lr0.1', 'gb-d6-lr0.05', 'gb-d6-lr0.1'], 'Run аттары мен реті дұрыс емес'\nassert all(set(r['params']) == {'max_depth', 'learning_rate'} for r in tracker.runs), 'Әр run-да max_depth және learning_rate параметрлері'\nassert tracker.runs[2]['metrics']['val_auc'] == round(score(4, 0.05), 4), 'val_auc 4 таңбаға дөңгелектенсін'\nassert best is not None and best['name'] == 'gb-d4-lr0.1', f\"Ең жақсы run — gb-d4-lr0.1, сізде {best and best['name']}\"",
    "mustInclude": [
     "log_param",
     "log_metric"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Екі run-ды салыстыру",
   "prompt": "<p><code>compare_runs(a, b)</code> жазыңыз: сөздік қайтарсын <code>{'params': {...}, 'metrics': {...}}</code>. <code>params</code> — екі run-да мәні әр түрлі (немесе тек біреуінде бар) параметрлер: <code>{атауы: (a мәні, b мәні)}</code>, жоқ мән <code>None</code>. <code>metrics</code> — екеуінде де бар метрикалар үшін айырма <code>b - a</code>, 4 таңбаға дөңгелектенген. Сосын <code>diff = compare_runs(find('tree-d5'), find('rf-200'))</code>.</p>",
   "starter": "runs = [\n    {'name': 'lr-c1',    'params': {'model': 'lr', 'C': 1.0},       'metrics': {'val_auc': 0.79, 'val_recall': 0.66}},\n    {'name': 'tree-d5',  'params': {'model': 'tree', 'max_depth': 5}, 'metrics': {'val_auc': 0.83, 'val_recall': 0.71}},\n    {'name': 'tree-d8',  'params': {'model': 'tree', 'max_depth': 8}, 'metrics': {'val_auc': 0.81}},\n    {'name': 'rf-200',   'params': {'model': 'rf', 'n_estimators': 200}, 'metrics': {'val_auc': 0.85, 'val_recall': 0.69}},\n    {'name': 'broken',   'params': {'model': 'rf', 'n_estimators': 500}, 'metrics': {}},\n]\n\ndef find(name):\n    return next(r for r in runs if r['name'] == name)\n\ndef compare_runs(a, b):\n    return {'params': {}, 'metrics': {}}\n\ndiff = None\n",
   "solution": "runs = [\n    {'name': 'lr-c1',    'params': {'model': 'lr', 'C': 1.0},       'metrics': {'val_auc': 0.79, 'val_recall': 0.66}},\n    {'name': 'tree-d5',  'params': {'model': 'tree', 'max_depth': 5}, 'metrics': {'val_auc': 0.83, 'val_recall': 0.71}},\n    {'name': 'tree-d8',  'params': {'model': 'tree', 'max_depth': 8}, 'metrics': {'val_auc': 0.81}},\n    {'name': 'rf-200',   'params': {'model': 'rf', 'n_estimators': 200}, 'metrics': {'val_auc': 0.85, 'val_recall': 0.69}},\n    {'name': 'broken',   'params': {'model': 'rf', 'n_estimators': 500}, 'metrics': {}},\n]\n\ndef find(name):\n    return next(r for r in runs if r['name'] == name)\n\ndef compare_runs(a, b):\n    params = {}\n    for k in sorted(set(a['params']) | set(b['params'])):\n        va, vb = a['params'].get(k), b['params'].get(k)\n        if va != vb:\n            params[k] = (va, vb)\n    metrics = {}\n    for k in a['metrics']:\n        if k in b['metrics']:\n            metrics[k] = round(b['metrics'][k] - a['metrics'][k], 4)\n    return {'params': params, 'metrics': metrics}\n\ndiff = compare_runs(find('tree-d5'), find('rf-200'))\nprint(diff)\n",
   "hints": [
    "Барлық параметр атаулары: <code>set(a['params']) | set(b['params'])</code>; мәндерді <code>.get(k)</code> арқылы алыңыз.",
    "Метрика айырмасы тек екеуінде де бар болса: <code>round(b - a, 4)</code>."
   ],
   "check": {
    "tests": "assert diff is not None and diff['params'] == {'max_depth': (5, None), 'model': ('tree', 'rf'), 'n_estimators': (None, 200)}, f\"params айырмасы дұрыс емес: {diff and diff['params']}\"\nassert diff['metrics'] == {'val_auc': 0.02, 'val_recall': -0.02}, f\"metrics айырмасы: val_auc +0.02, val_recall -0.02, сізде {diff['metrics']}\"\nassert compare_runs(find('tree-d5'), find('tree-d8'))['metrics'] == {'val_auc': -0.02}, 'Тек екеуінде де бар метрикалар салыстырылады'\nassert compare_runs(find('lr-c1'), find('lr-c1')) == {'params': {}, 'metrics': {'val_auc': 0.0, 'val_recall': 0.0}}, 'Бірдей run-да params айырмасы жоқ'"
   }
  }
 ],
 "ops-3": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Seed-пен кездейсоқ сандар",
   "prompt": "<p><code>dice(seed)</code> функциясын жазыңыз: <code>np.random.default_rng(seed)</code> арқылы 1-ден 6-ға дейінгі (6 қоса) 5 кездейсоқ бүтін санды <code>rng.integers(1, 7, 5)</code> жасап, <code>int</code>-тер тізімі ретінде қайтарсын. Бір seed әрқашан бір нәтиже беруі керек.</p>",
   "starter": "import numpy as np\n\ndef dice(seed):\n    rng = np.random.default_rng()\n    return [int(x) for x in rng.integers(1, 7, 5)]\n",
   "solution": "import numpy as np\n\ndef dice(seed):\n    rng = np.random.default_rng(seed)\n    return [int(x) for x in rng.integers(1, 7, 5)]\n\nprint(dice(42), dice(42))\n",
   "hints": [
    "Мәселе <code>default_rng()</code> жолында: seed берілмеген.",
    "<code>np.random.default_rng(seed)</code>."
   ],
   "check": {
    "tests": "import numpy as _np\n_ref = [int(x) for x in _np.random.default_rng(2026).integers(1, 7, 5)]\nassert dice(2026) == _ref, 'np.random.default_rng(seed) қолданыңыз'\nassert dice(7) == dice(7), 'Бір seed — бір нәтиже'\nassert all(1 <= x <= 6 for x in dice(1)) and all(type(x) is int for x in dice(1)), '1..6 аралығындағы int-тер тізімі'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Байттардың hash-ы",
   "prompt": "<p>Файл байттар ретінде оқылады. <code>file_hash(data)</code> функциясын жазыңыз: <code>bytes</code> үшін SHA-256 hash-ының алғашқы 8 hex таңбасын қайтарсын. Сосын <code>h1</code> және <code>h2</code>-ге <code>csv_v1</code> мен <code>csv_v2</code> hash-тарын жазыңыз.</p>",
   "starter": "import hashlib\ncsv_v1 = 'city,churn\\nАлматы,0.12\\n'.encode('utf-8')\ncsv_v2 = 'city,churn\\nАлматы,0.13\\n'.encode('utf-8')\n\ndef file_hash(data):\n    return str(len(data))\n",
   "solution": "import hashlib\ncsv_v1 = 'city,churn\\nАлматы,0.12\\n'.encode('utf-8')\ncsv_v2 = 'city,churn\\nАлматы,0.13\\n'.encode('utf-8')\n\ndef file_hash(data):\n    return hashlib.sha256(data).hexdigest()[:8]\n\nh1 = file_hash(csv_v1)\nh2 = file_hash(csv_v2)\nprint(h1, h2)\n",
   "hints": [
    "Байттар бірден беріледі: <code>hashlib.sha256(data)</code> (<code>.encode</code> керек емес).",
    "<code>.hexdigest()[:8]</code>."
   ],
   "check": {
    "tests": "import hashlib as _h\nassert file_hash(b'abc') == _h.sha256(b'abc').hexdigest()[:8], 'sha256(data).hexdigest()[:8] қайтарыңыз'\nassert len(h1) == 8 and h1 != h2, 'Бір таңба өзгерсе, hash та өзгереді (ұзындық бірдей болса да)'\nassert h1 == file_hash(csv_v1), 'Бір дерек — бір hash'",
    "mustInclude": [
     "sha256"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Барлық нұсқа бекітілген бе",
   "prompt": "<p>Reproducibility үшін requirements.txt-те әр кітапхананың нұсқасы <code>==</code> арқылы бекітілуі керек. <code>all_pinned(text)</code> функциясын жазыңыз: бос жолдар мен <code>#</code> түсініктемелерден басқа әр жолда <code>==</code> болса <code>True</code>.</p>",
   "starter": "def all_pinned(text):\n    return '==' in text\n",
   "solution": "def all_pinned(text):\n    for line in text.splitlines():\n        line = line.split('#')[0].strip()\n        if line and '==' not in line:\n            return False\n    return True\n\nprint(all_pinned('pandas==2.2.3\\nnumpy>=1.26\\n'))\n",
   "hints": [
    "Әр жолдан түсініктемені кесіңіз: <code>line.split('#')[0].strip()</code>.",
    "Бос емес жолда <code>==</code> жоқ болса бірден <code>return False</code>."
   ],
   "check": {
    "tests": "assert all_pinned('pandas==2.2.3\\nscikit-learn==1.6.1\\nnumpy==2.1.3\\n') is True, 'Барлығы бекітілген → True'\nassert all_pinned('pandas==2.2.3\\nnumpy>=1.26\\n') is False, 'numpy>=1.26 бекітілмеген → False'\nassert all_pinned('# ортам\\n\\npandas==2.2.3  # дерек\\n') is True, 'Түсініктеме мен бос жолдар еленбейді'\nassert all_pinned('joblib  # ==1.4\\n') is False, 'Түсініктемедегі == есептелмейді'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Run метадерегі",
   "prompt": "<p>Әр run-мен бірге қайталауға керек мәліметтер сақталады. <code>run_meta(seed, data_text, commit, versions)</code> жазыңыз: <code>{'seed': seed, 'data_sha': мәтіннің SHA-256 hash-ының алғашқы 12 таңбасы, 'commit': commit-тің алғашқы 7 таңбасы, 'versions': versions сөздігінің көшірмесі}</code> қайтарсын.</p>",
   "starter": "import hashlib\n\ndef run_meta(seed, data_text, commit, versions):\n    return {'seed': seed}\n",
   "solution": "import hashlib\n\ndef run_meta(seed, data_text, commit, versions):\n    return {\n        'seed': seed,\n        'data_sha': hashlib.sha256(data_text.encode('utf-8')).hexdigest()[:12],\n        'commit': commit[:7],\n        'versions': dict(versions),\n    }\n\nprint(run_meta(42, 'id,churn\\n1,0\\n', '3fa9c01b7e2d55aa', {'scikit-learn': '1.6.1'}))\n",
   "hints": [
    "Hash: <code>hashlib.sha256(data_text.encode('utf-8')).hexdigest()[:12]</code>.",
    "Көшірме: <code>dict(versions)</code>."
   ],
   "check": {
    "tests": "import hashlib as _h\n_v = {'scikit-learn': '1.6.1', 'pandas': '2.2.3'}\n_m = run_meta(42, 'id,churn\\n1,0\\n', '3fa9c01b7e2d55aa', _v)\nassert _m == {'seed': 42, 'data_sha': _h.sha256('id,churn\\n1,0\\n'.encode('utf-8')).hexdigest()[:12], 'commit': '3fa9c01', 'versions': _v}, f'run_meta нәтижесі дұрыс емес: {_m}'\n_v['numpy'] = '2.1.3'\nassert 'numpy' not in _m['versions'], 'versions көшірмесін сақтаңыз: dict(versions)'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Seed-пен train/test бөлу",
   "prompt": "<p><code>split_ids(ids, test_share, seed)</code> жазыңыз: <code>rng = np.random.default_rng(seed)</code>, <code>order = rng.permutation(len(ids))</code>; алғашқы <code>round(len(ids) * test_share)</code> индекс — test, қалғаны — train. <code>(train, test)</code> қайтарсын, екеуі де id-лардың <b>сұрыпталған</b> <code>int</code> тізімі. Бір seed — бір бөлу.</p>",
   "starter": "import numpy as np\nids = list(range(101, 121))\n\ndef split_ids(ids, test_share, seed):\n    n_test = round(len(ids) * test_share)\n    return ids[n_test:], ids[:n_test]\n",
   "solution": "import numpy as np\nids = list(range(101, 121))\n\ndef split_ids(ids, test_share, seed):\n    rng = np.random.default_rng(seed)\n    order = rng.permutation(len(ids))\n    n_test = round(len(ids) * test_share)\n    test = sorted(int(ids[i]) for i in order[:n_test])\n    train = sorted(int(ids[i]) for i in order[n_test:])\n    return train, test\n\nprint(split_ids(ids, 0.25, 42))\n",
   "hints": [
    "<code>order = rng.permutation(len(ids))</code> — индекстердің кездейсоқ реті.",
    "Test: <code>order[:n_test]</code>, train: <code>order[n_test:]</code>; соңында <code>sorted(...)</code>."
   ],
   "check": {
    "tests": "import numpy as _np\n_o = _np.random.default_rng(42).permutation(20)\n_test = sorted(int(ids[i]) for i in _o[:5])\n_tr, _te = split_ids(ids, 0.25, 42)\nassert _te == _test, 'test — rng.permutation нәтижесінің алғашқы round(n * test_share) индексі'\nassert len(_tr) == 15 and sorted(_tr + _te) == ids, 'train мен test бірге барлық id-ны береді, қиылыспайды'\nassert split_ids(ids, 0.25, 7) == split_ids(ids, 0.25, 7), 'Бір seed — бір бөлу'\nassert split_ids(ids, 0.25, 7) != split_ids(ids, 0.25, 8), 'Басқа seed — басқа бөлу'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Екі run қайталана ма",
   "prompt": "<p>Екі run-ның метадерегі бар. <code>diff_meta(a, b)</code> жазыңыз: нәтижеге әсер ететін өрістердің ішінде (<code>seed</code>, <code>data_sha</code>, <code>commit</code>, сосын <code>versions</code> ішіндегі әр кітапхана, мысалы <code>versions.scikit-learn</code>) айырмасы барларының тізімін қайтарсын. Кітапханалар атауы бойынша сұрыпталсын; біреуінде жоқ кітапхана да айырма.</p>",
   "starter": "run_a = {'seed': 42, 'data_sha': '3fa9c01b7e2d', 'commit': 'a1b2c3d',\n         'versions': {'scikit-learn': '1.6.1', 'pandas': '2.2.3', 'numpy': '2.1.3'}}\nrun_b = {'seed': 42, 'data_sha': '3fa9c01b7e2d', 'commit': 'f9e8d7c',\n         'versions': {'scikit-learn': '1.5.2', 'pandas': '2.2.3'}}\n\ndef diff_meta(a, b):\n    return []\n",
   "solution": "run_a = {'seed': 42, 'data_sha': '3fa9c01b7e2d', 'commit': 'a1b2c3d',\n         'versions': {'scikit-learn': '1.6.1', 'pandas': '2.2.3', 'numpy': '2.1.3'}}\nrun_b = {'seed': 42, 'data_sha': '3fa9c01b7e2d', 'commit': 'f9e8d7c',\n         'versions': {'scikit-learn': '1.5.2', 'pandas': '2.2.3'}}\n\ndef diff_meta(a, b):\n    diffs = [k for k in ('seed', 'data_sha', 'commit') if a.get(k) != b.get(k)]\n    va, vb = a.get('versions', {}), b.get('versions', {})\n    for lib in sorted(set(va) | set(vb)):\n        if va.get(lib) != vb.get(lib):\n            diffs.append(f'versions.{lib}')\n    return diffs\n\nprint(diff_meta(run_a, run_b))\n",
   "hints": [
    "Алдымен үш негізгі өріс, сосын кітапханалар: <code>sorted(set(va) | set(vb))</code>.",
    "Жоқ кітапхана үшін <code>.get(lib)</code> <code>None</code> береді — ол да айырма."
   ],
   "check": {
    "tests": "assert diff_meta(run_a, run_b) == ['commit', 'versions.numpy', 'versions.scikit-learn'], f'Күтілгені commit, versions.numpy, versions.scikit-learn. Сізде {diff_meta(run_a, run_b)}'\nassert diff_meta(run_a, run_a) == [], 'Бірдей run-дарда айырма жоқ'\nassert diff_meta(dict(run_a, seed=7), run_a) == ['seed'], 'seed айырмасы'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Жол ретіне тәуелсіз hash",
   "prompt": "<p>Экспорт әр жолы жолдардың ретін өзгертеді, бірақ дерек сол. <code>table_fingerprint(csv_text)</code> жазыңыз: бірінші жол (тақырып) өз орнында қалады, қалған бос емес жолдар сұрыпталады, сосын барлығы <code>\\n</code>-мен біріктіріліп, SHA-256 hash-ының алғашқы 12 таңбасы қайтарылады. Жол соңындағы бос орындар еленбейді. Сонда жолдардың реті өзгерсе hash өзгермейді, ал мән өзгерсе — өзгереді.</p>",
   "starter": "import hashlib\nv1 = \"customer_id,city,churned\\n1,Алматы,0\\n2,Астана,1\\n3,Шымкент,0\\n\"\nv1_shuffled = \"customer_id,city,churned\\n3,Шымкент,0\\n1,Алматы,0  \\n2,Астана,1\\n\\n\"\nv2 = \"customer_id,city,churned\\n1,Алматы,0\\n2,Астана,0\\n3,Шымкент,0\\n\"\n\ndef table_fingerprint(csv_text):\n    return hashlib.sha256(csv_text.encode('utf-8')).hexdigest()[:12]\n",
   "solution": "import hashlib\nv1 = \"customer_id,city,churned\\n1,Алматы,0\\n2,Астана,1\\n3,Шымкент,0\\n\"\nv1_shuffled = \"customer_id,city,churned\\n3,Шымкент,0\\n1,Алматы,0  \\n2,Астана,1\\n\\n\"\nv2 = \"customer_id,city,churned\\n1,Алматы,0\\n2,Астана,0\\n3,Шымкент,0\\n\"\n\ndef table_fingerprint(csv_text):\n    lines = [l.rstrip() for l in csv_text.splitlines()]\n    lines = [l for l in lines if l]\n    header, rows = lines[0], sorted(lines[1:])\n    canonical = '\\n'.join([header] + rows)\n    return hashlib.sha256(canonical.encode('utf-8')).hexdigest()[:12]\n\nprint(table_fingerprint(v1), table_fingerprint(v1_shuffled), table_fingerprint(v2))\n",
   "hints": [
    "Жолдарды тазалаңыз: <code>[l.rstrip() for l in csv_text.splitlines()]</code>, бос жолдарды алып тастаңыз.",
    "Тақырып + сұрыпталған жолдар → <code>'\\n'.join(...)</code> → sha256."
   ],
   "check": {
    "tests": "import hashlib as _h\nassert len(table_fingerprint(v1)) == 12, 'Hash ұзындығы 12'\nassert table_fingerprint(v1) == table_fingerprint(v1_shuffled), 'Жолдардың реті мен соңғы бос орындар hash-ты өзгертпеуі керек'\nassert table_fingerprint(v1) != table_fingerprint(v2), 'Мән өзгерсе hash өзгереді'\nassert table_fingerprint(v1) == _h.sha256('customer_id,city,churned\\n1,Алматы,0\\n2,Астана,1\\n3,Шымкент,0'.encode('utf-8')).hexdigest()[:12], 'Канондық түрі: тақырып, сосын сұрыпталған жолдар, \\\\n арқылы'\nassert table_fingerprint('b,a\\n1,2\\n') != table_fingerprint('a,b\\n1,2\\n'), 'Тақырып та hash-қа кіреді'",
    "mustInclude": [
     "sha256"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Қайталанатын эксперимент",
   "prompt": "<p><code>run_experiment(seed)</code> жазыңыз: (1) <code>rng = np.random.default_rng(seed)</code>; (2) <code>CUSTOMERS</code>-тан <code>rng.choice(CUSTOMERS, 8, replace=False)</code> арқылы 8 id таңдаңыз; (3) <code>score</code> — таңдалған id-лардың <code>CHURN</code>-дағы мәндерінің орташасы (4 таңбаға дөңгелектенген <code>float</code>); (4) <code>sample_sha</code> — таңдалған id-ларды сұрыптап, үтірмен біріктірген мәтіннің SHA-256 hash-ының алғашқы 12 таңбасы. <code>{'seed', 'sample_sha', 'score'}</code> қайтарыңыз.</p>",
   "starter": "import hashlib\nimport numpy as np\nCUSTOMERS = list(range(1001, 1041))\nCHURN = {c: (c * 37 % 100) / 100 for c in CUSTOMERS}\n\ndef run_experiment(seed):\n    return {'seed': seed, 'sample_sha': '', 'score': 0.0}\n",
   "solution": "import hashlib\nimport numpy as np\nCUSTOMERS = list(range(1001, 1041))\nCHURN = {c: (c * 37 % 100) / 100 for c in CUSTOMERS}\n\ndef run_experiment(seed):\n    rng = np.random.default_rng(seed)\n    sample = [int(x) for x in rng.choice(CUSTOMERS, 8, replace=False)]\n    score = round(float(np.mean([CHURN[c] for c in sample])), 4)\n    text = ','.join(str(c) for c in sorted(sample))\n    sample_sha = hashlib.sha256(text.encode('utf-8')).hexdigest()[:12]\n    return {'seed': seed, 'sample_sha': sample_sha, 'score': score}\n\nprint(run_experiment(42), run_experiment(42) == run_experiment(42))\n",
   "hints": [
    "Таңдалған id-ларды <code>int</code>-ке айналдырыңыз: <code>[int(x) for x in rng.choice(...)]</code>.",
    "Hash мәтіні: <code>','.join(str(c) for c in sorted(sample))</code>."
   ],
   "check": {
    "tests": "import numpy as _np, hashlib as _h\n_s = [int(x) for x in _np.random.default_rng(42).choice(CUSTOMERS, 8, replace=False)]\n_r = run_experiment(42)\nassert set(_r) == {'seed', 'sample_sha', 'score'} and _r['seed'] == 42, 'Кілттер: seed, sample_sha, score'\nassert _r['score'] == round(float(_np.mean([CHURN[c] for c in _s])), 4), 'score — таңдалған id-лардың CHURN орташасы (4 таңба)'\nassert _r['sample_sha'] == _h.sha256(','.join(str(c) for c in sorted(_s)).encode('utf-8')).hexdigest()[:12], 'sample_sha — сұрыпталған id-лар мәтінінің hash-ы'\nassert run_experiment(42) == _r, 'Бір seed — бір нәтиже'\nassert run_experiment(43)['sample_sha'] != _r['sample_sha'], 'Басқа seed — басқа таңда'"
   }
  }
 ],
 "ops-4": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Соңғы нұсқа",
   "prompt": "<p><code>latest_version(registry, name)</code> функциясын жазыңыз: модельдің ең үлкен нұсқа нөмірін (<code>int</code>) қайтарсын. Модель registry-де жоқ болса <code>None</code>.</p>",
   "starter": "registry = {\n    'churn-model': [\n        {'version': 1, 'stage': 'Archived',   'val_auc': 0.78},\n        {'version': 2, 'stage': 'Archived',   'val_auc': 0.80},\n        {'version': 3, 'stage': 'Production', 'val_auc': 0.81},\n        {'version': 4, 'stage': 'Staging',    'val_auc': 0.84},\n        {'version': 5, 'stage': 'None',       'val_auc': 0.79},\n    ],\n    'price-model': [\n        {'version': 1, 'stage': 'Production', 'val_auc': 0.70},\n    ],\n}\n\ndef latest_version(registry, name):\n    return registry[name][0]['version']\n",
   "solution": "registry = {\n    'churn-model': [\n        {'version': 1, 'stage': 'Archived',   'val_auc': 0.78},\n        {'version': 2, 'stage': 'Archived',   'val_auc': 0.80},\n        {'version': 3, 'stage': 'Production', 'val_auc': 0.81},\n        {'version': 4, 'stage': 'Staging',    'val_auc': 0.84},\n        {'version': 5, 'stage': 'None',       'val_auc': 0.79},\n    ],\n    'price-model': [\n        {'version': 1, 'stage': 'Production', 'val_auc': 0.70},\n    ],\n}\n\ndef latest_version(registry, name):\n    if name not in registry or not registry[name]:\n        return None\n    return max(v['version'] for v in registry[name])\n\nprint(latest_version(registry, 'churn-model'))\n",
   "hints": [
    "<code>max(v['version'] for v in registry[name])</code>.",
    "Модель жоқ болса алдымен <code>return None</code>."
   ],
   "check": {
    "tests": "assert latest_version(registry, 'churn-model') == 5, 'churn-model-дің соңғы нұсқасы 5'\nassert latest_version(registry, 'price-model') == 1, 'price-model — 1'\nassert latest_version(registry, 'fraud-model') is None, 'Жоқ модель → None'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Stage бойынша нұсқалар",
   "prompt": "<p><code>versions_in(registry, name, stage)</code> функциясын жазыңыз: берілген stage-тегі нұсқа нөмірлерінің өсу ретімен сұрыпталған тізімін қайтарсын.</p>",
   "starter": "registry = {\n    'churn-model': [\n        {'version': 1, 'stage': 'Archived',   'val_auc': 0.78},\n        {'version': 2, 'stage': 'Archived',   'val_auc': 0.80},\n        {'version': 3, 'stage': 'Production', 'val_auc': 0.81},\n        {'version': 4, 'stage': 'Staging',    'val_auc': 0.84},\n        {'version': 5, 'stage': 'None',       'val_auc': 0.79},\n    ],\n    'price-model': [\n        {'version': 1, 'stage': 'Production', 'val_auc': 0.70},\n    ],\n}\n\ndef versions_in(registry, name, stage):\n    return []\n",
   "solution": "registry = {\n    'churn-model': [\n        {'version': 1, 'stage': 'Archived',   'val_auc': 0.78},\n        {'version': 2, 'stage': 'Archived',   'val_auc': 0.80},\n        {'version': 3, 'stage': 'Production', 'val_auc': 0.81},\n        {'version': 4, 'stage': 'Staging',    'val_auc': 0.84},\n        {'version': 5, 'stage': 'None',       'val_auc': 0.79},\n    ],\n    'price-model': [\n        {'version': 1, 'stage': 'Production', 'val_auc': 0.70},\n    ],\n}\n\ndef versions_in(registry, name, stage):\n    return sorted(v['version'] for v in registry[name] if v['stage'] == stage)\n\nprint(versions_in(registry, 'churn-model', 'Archived'))\n",
   "hints": [
    "<code>[v['version'] for v in registry[name] if v['stage'] == stage]</code>.",
    "Сұрыптау: <code>sorted(...)</code>."
   ],
   "check": {
    "tests": "assert versions_in(registry, 'churn-model', 'Archived') == [1, 2], 'Archived: [1, 2]'\nassert versions_in(registry, 'churn-model', 'Production') == [3], 'Production: [3]'\nassert versions_in(registry, 'price-model', 'Staging') == [], 'Staging-те ештеңе жоқ → []'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жаңа нұсқа тіркеу",
   "prompt": "<p><code>register(registry, name, val_auc)</code> функциясын жазыңыз: модельге жаңа нұсқа қоссын: нөмірі — ең үлкен нұсқа + 1 (модель жоқ болса 1, тізім жасалады), stage — <code>'None'</code>. Жаңа нұсқаның dict-ін қайтарсын.</p>",
   "starter": "registry = {\n    'churn-model': [\n        {'version': 1, 'stage': 'Archived',   'val_auc': 0.78},\n        {'version': 2, 'stage': 'Archived',   'val_auc': 0.80},\n        {'version': 3, 'stage': 'Production', 'val_auc': 0.81},\n        {'version': 4, 'stage': 'Staging',    'val_auc': 0.84},\n        {'version': 5, 'stage': 'None',       'val_auc': 0.79},\n    ],\n    'price-model': [\n        {'version': 1, 'stage': 'Production', 'val_auc': 0.70},\n    ],\n}\n\ndef register(registry, name, val_auc):\n    v = {'version': 1, 'stage': 'None', 'val_auc': val_auc}\n    return v\n",
   "solution": "registry = {\n    'churn-model': [\n        {'version': 1, 'stage': 'Archived',   'val_auc': 0.78},\n        {'version': 2, 'stage': 'Archived',   'val_auc': 0.80},\n        {'version': 3, 'stage': 'Production', 'val_auc': 0.81},\n        {'version': 4, 'stage': 'Staging',    'val_auc': 0.84},\n        {'version': 5, 'stage': 'None',       'val_auc': 0.79},\n    ],\n    'price-model': [\n        {'version': 1, 'stage': 'Production', 'val_auc': 0.70},\n    ],\n}\n\ndef register(registry, name, val_auc):\n    versions = registry.setdefault(name, [])\n    number = max((v['version'] for v in versions), default=0) + 1\n    v = {'version': number, 'stage': 'None', 'val_auc': val_auc}\n    versions.append(v)\n    return v\n\nprint(register(registry, 'churn-model', 0.83))\n",
   "hints": [
    "<code>registry.setdefault(name, [])</code> модель жоқ болса бос тізім жасайды.",
    "Нөмір: <code>max((...), default=0) + 1</code>."
   ],
   "check": {
    "tests": "_r = {'m': [{'version': 1, 'stage': 'Production', 'val_auc': 0.8}, {'version': 2, 'stage': 'None', 'val_auc': 0.7}]}\nassert register(_r, 'm', 0.82) == {'version': 3, 'stage': 'None', 'val_auc': 0.82}, 'Жаңа нұсқа: version 3, stage None'\nassert len(_r['m']) == 3 and _r['m'][-1]['version'] == 3, 'Нұсқа registry-ге қосылуы керек'\nassert register(_r, 'fraud', 0.9) == {'version': 1, 'stage': 'None', 'val_auc': 0.9} and _r['fraud'][0]['version'] == 1, 'Жаңа модель → version 1'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Rollback",
   "prompt": "<p>Production-дағы модель нашар жұмыс істеп жатыр. <code>rollback(registry, name)</code> жазыңыз: ағымдағы <code>Production</code> нұсқасы <code>Archived</code> болады, ал <code>Archived</code> нұсқалардың ішінде нөмірі ең үлкені (ағымдағысынан басқа, одан бұрынғы) <code>Production</code> болады. Жаңа production dict-ін қайтарсын. Production немесе қайтаратын archived нұсқа жоқ болса <code>ValueError</code> және registry өзгермейді.</p>",
   "starter": "registry = {\n    'churn-model': [\n        {'version': 1, 'stage': 'Archived',   'val_auc': 0.78},\n        {'version': 2, 'stage': 'Archived',   'val_auc': 0.80},\n        {'version': 3, 'stage': 'Production', 'val_auc': 0.81},\n        {'version': 4, 'stage': 'Staging',    'val_auc': 0.84},\n        {'version': 5, 'stage': 'None',       'val_auc': 0.79},\n    ],\n    'price-model': [\n        {'version': 1, 'stage': 'Production', 'val_auc': 0.70},\n    ],\n}\n\ndef rollback(registry, name):\n    for v in registry[name]:\n        if v['stage'] == 'Production':\n            v['stage'] = 'Archived'\n",
   "solution": "registry = {\n    'churn-model': [\n        {'version': 1, 'stage': 'Archived',   'val_auc': 0.78},\n        {'version': 2, 'stage': 'Archived',   'val_auc': 0.80},\n        {'version': 3, 'stage': 'Production', 'val_auc': 0.81},\n        {'version': 4, 'stage': 'Staging',    'val_auc': 0.84},\n        {'version': 5, 'stage': 'None',       'val_auc': 0.79},\n    ],\n    'price-model': [\n        {'version': 1, 'stage': 'Production', 'val_auc': 0.70},\n    ],\n}\n\ndef rollback(registry, name):\n    versions = registry[name]\n    current = next((v for v in versions if v['stage'] == 'Production'), None)\n    if current is None:\n        raise ValueError(f'{name}: production нұсқасы жоқ')\n    archived = [v for v in versions if v['stage'] == 'Archived' and v['version'] < current['version']]\n    if not archived:\n        raise ValueError(f'{name}: қайтаратын нұсқа жоқ')\n    target = max(archived, key=lambda v: v['version'])\n    current['stage'] = 'Archived'\n    target['stage'] = 'Production'\n    return target\n\nprint(rollback(registry, 'churn-model'))\n",
   "hints": [
    "Алдымен ағымдағы production-ды және мақсатты archived нұсқаны табыңыз; тек екеуі де бар болса stage-терді өзгертіңіз.",
    "Мақсат: <code>max(archived, key=lambda v: v['version'])</code>."
   ],
   "check": {
    "tests": "_r = {'m': [{'version': 1, 'stage': 'Archived'}, {'version': 2, 'stage': 'Archived'}, {'version': 3, 'stage': 'Production'}, {'version': 4, 'stage': 'Staging'}]}\n_p = rollback(_r, 'm')\nassert _p['version'] == 2, 'v3-тен кейін v2-ге қайтамыз (Archived-тің ең үлкені)'\nassert [v['stage'] for v in _r['m']] == ['Archived', 'Production', 'Archived', 'Staging'], 'v3 Archived, v2 Production, v4 өзгермейді'\n_x = {'m': [{'version': 1, 'stage': 'Production'}, {'version': 2, 'stage': 'Staging'}]}\ntry:\n    rollback(_x, 'm')\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Archived нұсқа жоқ болса ValueError')\nassert _x['m'][0]['stage'] == 'Production', 'Қате болса registry өзгермеуі керек'\n_y = {'m': [{'version': 1, 'stage': 'Archived'}]}\ntry:\n    rollback(_y, 'm')\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Production жоқ болса ValueError')"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Alias арқылы жүктеу",
   "prompt": "<p>MLflow-тың жаңа нұсқаларында stage орнына alias қолданылады. <code>aliases</code> сөздігі: <code>{(модель, alias): нұсқа}</code>. <code>set_alias(aliases, name, alias, version)</code> alias-ты орнатады (бұрынғысын ауыстырады). <code>resolve(aliases, uri)</code> <code>'models:/churn-model@champion'</code> түріндегі URI-ден нұсқа нөмірін қайтарады; URI <code>models:/</code>-пен басталмаса немесе <code>@</code> жоқ болса, не alias жоқ болса <code>ValueError</code>.</p>",
   "starter": "aliases = {}\n\ndef set_alias(aliases, name, alias, version):\n    pass\n\ndef resolve(aliases, uri):\n    return None\n",
   "solution": "aliases = {}\n\ndef set_alias(aliases, name, alias, version):\n    aliases[(name, alias)] = version\n\ndef resolve(aliases, uri):\n    prefix = 'models:/'\n    if not uri.startswith(prefix) or '@' not in uri:\n        raise ValueError(f'URI дұрыс емес: {uri}')\n    name, alias = uri[len(prefix):].split('@')\n    if (name, alias) not in aliases:\n        raise ValueError(f'{name}@{alias} жоқ')\n    return aliases[(name, alias)]\n\nset_alias(aliases, 'churn-model', 'champion', 3)\nprint(resolve(aliases, 'models:/churn-model@champion'))\n",
   "hints": [
    "Кілт — кортеж: <code>aliases[(name, alias)] = version</code>.",
    "URI-ді талдау: <code>uri[len('models:/'):].split('@')</code>."
   ],
   "check": {
    "tests": "_a = {}\nset_alias(_a, 'churn-model', 'champion', 3)\nset_alias(_a, 'churn-model', 'challenger', 4)\nassert resolve(_a, 'models:/churn-model@champion') == 3, 'champion → 3'\nset_alias(_a, 'churn-model', 'champion', 2)\nassert resolve(_a, 'models:/churn-model@champion') == 2, 'Rollback: alias-ты 2-ге ауыстыру жеткілікті'\nassert resolve(_a, 'models:/churn-model@challenger') == 4, 'challenger → 4'\nfor _u in ['models:/churn-model@legacy', 'churn-model@champion', 'models:/churn-model']:\n    try:\n        resolve(_a, _u)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f'{_u} үшін ValueError күтілді')"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Promotion шарттары",
   "prompt": "<p>Жаңа нұсқа production-ға тек үш шарт орындалса шығады. <code>promotion_blockers(candidate, production, data_ok)</code> жазыңыз: орындалмаған шарттардың тізімін қайтарсын (осы ретпен): <code>'metric'</code> — кандидаттың <code>val_auc</code>-ы production-нікінен қатаң жоғары емес; <code>'data'</code> — <code>data_ok</code> False; <code>'staging'</code> — кандидаттың stage-і <code>'Staging'</code> емес. <code>production</code> <code>None</code> болса, metric шарты орындалды деп есептеледі.</p>",
   "starter": "def promotion_blockers(candidate, production, data_ok):\n    return []\n",
   "solution": "def promotion_blockers(candidate, production, data_ok):\n    blockers = []\n    if production is not None and candidate['val_auc'] <= production['val_auc']:\n        blockers.append('metric')\n    if not data_ok:\n        blockers.append('data')\n    if candidate['stage'] != 'Staging':\n        blockers.append('staging')\n    return blockers\n\nprint(promotion_blockers({'version': 4, 'stage': 'Staging', 'val_auc': 0.84}, {'version': 3, 'stage': 'Production', 'val_auc': 0.81}, True))\n",
   "hints": [
    "Үш бөлек <code>if</code>: әрқайсысы өз атауын тізімге қосады.",
    "Metric шарты: <code>production is not None and candidate['val_auc'] &lt;= production['val_auc']</code>."
   ],
   "check": {
    "tests": "_prod = {'version': 3, 'stage': 'Production', 'val_auc': 0.81}\nassert promotion_blockers({'version': 4, 'stage': 'Staging', 'val_auc': 0.84}, _prod, True) == [], 'Бәрі орындалды → []'\nassert promotion_blockers({'version': 5, 'stage': 'None', 'val_auc': 0.81}, _prod, False) == ['metric', 'data', 'staging'], 'Тең метрика да жеткіліксіз; үш шарт та орындалмады'\nassert promotion_blockers({'version': 1, 'stage': 'Staging', 'val_auc': 0.6}, None, True) == [], 'Production жоқ болса metric шарты орындалды'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Шарты бар promotion",
   "prompt": "<p><code>promote_if_ready(registry, name, version, data_ok)</code> жазыңыз. Нұсқа жоқ болса <code>ValueError</code>. Шарттар (тексеру реті: metric, data, staging): кандидаттың <code>val_auc</code>-ы ағымдағы production-нан қатаң жоғары (production жоқ болса — орындалды); <code>data_ok</code>; кандидат <code>Staging</code>-те. Бәрі орындалса: бұрынғы production <code>Archived</code>, кандидат <code>Production</code>, <code>('promoted', [])</code> қайтарылады. Әйтпесе registry өзгермейді және <code>('blocked', [орындалмаған шарттар])</code> қайтарылады.</p>",
   "starter": "registry = {\n    'churn-model': [\n        {'version': 1, 'stage': 'Archived',   'val_auc': 0.78},\n        {'version': 2, 'stage': 'Archived',   'val_auc': 0.80},\n        {'version': 3, 'stage': 'Production', 'val_auc': 0.81},\n        {'version': 4, 'stage': 'Staging',    'val_auc': 0.84},\n        {'version': 5, 'stage': 'None',       'val_auc': 0.79},\n    ],\n    'price-model': [\n        {'version': 1, 'stage': 'Production', 'val_auc': 0.70},\n    ],\n}\n\ndef promote_if_ready(registry, name, version, data_ok):\n    for v in registry[name]:\n        if v['version'] == version:\n            v['stage'] = 'Production'\n    return 'promoted', []\n",
   "solution": "registry = {\n    'churn-model': [\n        {'version': 1, 'stage': 'Archived',   'val_auc': 0.78},\n        {'version': 2, 'stage': 'Archived',   'val_auc': 0.80},\n        {'version': 3, 'stage': 'Production', 'val_auc': 0.81},\n        {'version': 4, 'stage': 'Staging',    'val_auc': 0.84},\n        {'version': 5, 'stage': 'None',       'val_auc': 0.79},\n    ],\n    'price-model': [\n        {'version': 1, 'stage': 'Production', 'val_auc': 0.70},\n    ],\n}\n\ndef promote_if_ready(registry, name, version, data_ok):\n    versions = registry[name]\n    cand = next((v for v in versions if v['version'] == version), None)\n    if cand is None:\n        raise ValueError(f'{name} v{version} жоқ')\n    prod = next((v for v in versions if v['stage'] == 'Production'), None)\n    blockers = []\n    if prod is not None and cand['val_auc'] <= prod['val_auc']:\n        blockers.append('metric')\n    if not data_ok:\n        blockers.append('data')\n    if cand['stage'] != 'Staging':\n        blockers.append('staging')\n    if blockers:\n        return 'blocked', blockers\n    if prod is not None:\n        prod['stage'] = 'Archived'\n    cand['stage'] = 'Production'\n    return 'promoted', []\n\nprint(promote_if_ready(registry, 'churn-model', 5, True))\nprint(promote_if_ready(registry, 'churn-model', 4, True))\n",
   "hints": [
    "Алдымен кандидат пен ағымдағы production-ды табыңыз, шарттарды тексеріп, тек сосын stage-терді өзгертіңіз.",
    "Қате болса ерте қайтарыңыз: <code>if blockers: return 'blocked', blockers</code>."
   ],
   "check": {
    "tests": "import copy as _cp\n_r = {'churn-model': [{'version': 1, 'stage': 'Archived', 'val_auc': 0.78}, {'version': 2, 'stage': 'Archived', 'val_auc': 0.80}, {'version': 3, 'stage': 'Production', 'val_auc': 0.81}, {'version': 4, 'stage': 'Staging', 'val_auc': 0.84}, {'version': 5, 'stage': 'None', 'val_auc': 0.79}]}\n_before = _cp.deepcopy(_r)\nassert promote_if_ready(_r, 'churn-model', 5, True) == ('blocked', ['metric', 'staging']), 'v5: 0.79 < 0.81 және stage None'\nassert _r == _before, 'Бұғатталса registry өзгермеуі керек'\nassert promote_if_ready(_r, 'churn-model', 4, False) == ('blocked', ['data']), 'v4: деректер тексеруден өтпеді'\nassert promote_if_ready(_r, 'churn-model', 4, True) == ('promoted', []), 'v4 барлық шартты орындайды'\nassert {v['version']: v['stage'] for v in _r['churn-model']} == {1: 'Archived', 2: 'Archived', 3: 'Archived', 4: 'Production', 5: 'None'}, 'v3 Archived, v4 Production болуы керек'\n_n = {'m': [{'version': 1, 'stage': 'Staging', 'val_auc': 0.5}]}\nassert promote_if_ready(_n, 'm', 1, True) == ('promoted', []) and _n['m'][0]['stage'] == 'Production', 'Production жоқ болса metric шарты орындалды'\ntry:\n    promote_if_ready(_r, 'churn-model', 9, True)\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Жоқ нұсқада ValueError')"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Registry оқиғалары",
   "prompt": "<p>Registry-дің тарихын оқиғалар тізімінен қайта құрыңыз. <code>replay(events)</code> жазыңыз: бос registry-ден бастап (бір модель), әр оқиғаны ретімен қолданады: <code>('register', auc)</code> — жаңа нұсқа (нөмірі ретімен 1, 2, ...), stage <code>'None'</code>; <code>('stage', version)</code> — нұсқаны <code>Staging</code>-ке; <code>('promote', version)</code> — нұсқаны <code>Production</code>-ға, бұрынғы production <code>Archived</code>; <code>('rollback',)</code> — ағымдағы production <code>Archived</code>, одан кіші ең үлкен archived нұсқа <code>Production</code>. <code>{нұсқа: stage}</code> сөздігін қайтарыңыз.</p>",
   "starter": "events = [\n    ('register', 0.78), ('promote', 1),\n    ('register', 0.81), ('stage', 2), ('promote', 2),\n    ('register', 0.84), ('stage', 3), ('promote', 3),\n    ('rollback',),\n    ('register', 0.79),\n]\n\ndef replay(events):\n    return {}\n",
   "solution": "events = [\n    ('register', 0.78), ('promote', 1),\n    ('register', 0.81), ('stage', 2), ('promote', 2),\n    ('register', 0.84), ('stage', 3), ('promote', 3),\n    ('rollback',),\n    ('register', 0.79),\n]\n\ndef replay(events):\n    versions = []\n    def find(n):\n        return next(v for v in versions if v['version'] == n)\n    def current():\n        return next((v for v in versions if v['stage'] == 'Production'), None)\n    for e in events:\n        kind = e[0]\n        if kind == 'register':\n            versions.append({'version': len(versions) + 1, 'stage': 'None', 'val_auc': e[1]})\n        elif kind == 'stage':\n            find(e[1])['stage'] = 'Staging'\n        elif kind == 'promote':\n            prod = current()\n            if prod is not None:\n                prod['stage'] = 'Archived'\n            find(e[1])['stage'] = 'Production'\n        elif kind == 'rollback':\n            prod = current()\n            older = [v for v in versions if v['stage'] == 'Archived' and v['version'] < prod['version']]\n            target = max(older, key=lambda v: v['version'])\n            prod['stage'] = 'Archived'\n            target['stage'] = 'Production'\n    return {v['version']: v['stage'] for v in versions}\n\nprint(replay(events))\n",
   "hints": [
    "Нұсқаларды тізімде ұстаңыз; әр оқиға түріне бір <code>if/elif</code> тармағы.",
    "Көмекші ішкі функциялар ыңғайлы: <code>find(n)</code> және <code>current()</code> (ағымдағы production)."
   ],
   "check": {
    "tests": "assert replay(events) == {1: 'Archived', 2: 'Production', 3: 'Archived', 4: 'None'}, f'Нәтиже дұрыс емес: {replay(events)}'\nassert replay([('register', 0.7)]) == {1: 'None'}, 'Бір тіркеу → {1: \"None\"}'\nassert replay([('register', 0.7), ('promote', 1), ('register', 0.8), ('promote', 2)]) == {1: 'Archived', 2: 'Production'}, 'promote бұрынғы production-ды Archived етеді'\nassert replay([]) == {}, 'Оқиға жоқ → {}'"
   }
  }
 ],
 "ops-5": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Exit code",
   "prompt": "<p>CI қадамы нөлдік емес exit code қайтарса, build құлайды. <code>exit_code(errors)</code> функциясын жазыңыз: қате тізімі бос болса <code>0</code>, әйтпесе <code>1</code>.</p>",
   "starter": "def exit_code(errors):\n    return 0\n",
   "solution": "def exit_code(errors):\n    return 1 if errors else 0\n\nprint(exit_code([]), exit_code(['auc төмендеді']))\n",
   "hints": [
    "Бос тізім — жалған мән: <code>1 if errors else 0</code>.",
    "Бұл мәнді кейін <code>sys.exit(...)</code>-қа береміз."
   ],
   "check": {
    "tests": "assert exit_code([]) == 0, 'Қате жоқ → 0'\nassert exit_code(['auc төмендеді']) == 1 and exit_code(['a', 'b']) == 1, 'Қате бар → 1'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Абсолютті шектер",
   "prompt": "<p><code>below_floor(metrics, floors)</code> жазыңыз: <code>floors</code>-тағы әр метрика үшін мәні шектен төмен болса (немесе <code>metrics</code>-те мүлде жоқ болса) оның атауын қайтарсын, <code>floors</code> ретімен. Мысалы, шек <code>{'auc': 0.75, 'recall': 0.6}</code>.</p>",
   "starter": "def below_floor(metrics, floors):\n    return []\n",
   "solution": "def below_floor(metrics, floors):\n    return [m for m, lo in floors.items() if metrics.get(m) is None or metrics[m] < lo]\n\nprint(below_floor({'auc': 0.81, 'recall': 0.55}, {'auc': 0.75, 'recall': 0.6}))\n",
   "hints": [
    "<code>for m, lo in floors.items():</code>.",
    "Метрика жоқ болса да тізімге: <code>metrics.get(m) is None or metrics[m] &lt; lo</code>."
   ],
   "check": {
    "tests": "assert below_floor({'auc': 0.81, 'recall': 0.55}, {'auc': 0.75, 'recall': 0.6}) == ['recall'], 'recall 0.55 < 0.6'\nassert below_floor({'auc': 0.75, 'recall': 0.6}, {'auc': 0.75, 'recall': 0.6}) == [], 'Шекке тең мән — өтеді'\nassert below_floor({'auc': 0.7}, {'auc': 0.75, 'recall': 0.6}) == ['auc', 'recall'], 'Жоқ метрика да шектен өтпеді'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Workflow командалары",
   "prompt": "<p>GitHub Actions файлынан командаларды алыңыз. <code>run_commands(yaml_text)</code> жазыңыз: <code>- run: </code> деп басталатын (шеттегі бос орындарды есептемей) әр жолдан команданы, жол соңындағы <code>#</code> түсініктемесін алып тастап, ретімен тізім етіп қайтарсын.</p>",
   "starter": "workflow = \"\"\"name: model-ci\non: [pull_request]\njobs:\n  train-and-check:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: pip install -r requirements.txt\n      - run: pytest tests/                      # unit тестілер\n      - run: python train.py --out metrics.json\n      - run: python check_metrics.py metrics.json baseline.json\n\"\"\"\n\ndef run_commands(yaml_text):\n    return []\n",
   "solution": "workflow = \"\"\"name: model-ci\non: [pull_request]\njobs:\n  train-and-check:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: pip install -r requirements.txt\n      - run: pytest tests/                      # unit тестілер\n      - run: python train.py --out metrics.json\n      - run: python check_metrics.py metrics.json baseline.json\n\"\"\"\n\ndef run_commands(yaml_text):\n    prefix = '- run: '\n    result = []\n    for line in yaml_text.splitlines():\n        line = line.strip()\n        if line.startswith(prefix):\n            result.append(line[len(prefix):].split('#')[0].strip())\n    return result\n\nprint(run_commands(workflow))\n",
   "hints": [
    "Әр жолды <code>strip()</code> етіп, <code>line.startswith('- run: ')</code> тексеріңіз.",
    "Команда: <code>line[len(prefix):].split('#')[0].strip()</code>."
   ],
   "check": {
    "tests": "assert run_commands(workflow) == ['pip install -r requirements.txt', 'pytest tests/', 'python train.py --out metrics.json', 'python check_metrics.py metrics.json baseline.json'], f'Командалар тізімі дұрыс емес: {run_commands(workflow)}'\nassert run_commands('steps:\\n  - uses: actions/setup-python@v5\\n') == [], 'uses жолдары команда емес'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бағыты әр түрлі метрикалар",
   "prompt": "<p>Кейбір метрикалар кіші болған сайын жақсы (<code>logloss</code>, <code>rmse</code>). <code>check(new, base, lower_better, max_drop=0.01)</code> жазыңыз: <code>base</code>-тегі әр метрика үшін қате хабарлар тізімін қайтарсын: метрика <code>new</code>-да жоқ; «үлкені жақсы» метрика <code>base - max_drop</code>-тан төмен; «кішісі жақсы» метрика (<code>lower_better</code> жиынында) <code>base + max_drop</code>-тан жоғары. Хабар метрика атауынан басталсын.</p>",
   "starter": "def check(new, base, lower_better, max_drop=0.01):\n    return [m for m in base if new.get(m, 0) < base[m] - max_drop]\n",
   "solution": "def check(new, base, lower_better, max_drop=0.01):\n    errors = []\n    for m, b in base.items():\n        if m not in new:\n            errors.append(f'{m}: жаңа нәтижеде жоқ')\n        elif m in lower_better and new[m] > b + max_drop:\n            errors.append(f'{m}: {new[m]:.3f} > {b:.3f} + {max_drop}')\n        elif m not in lower_better and new[m] < b - max_drop:\n            errors.append(f'{m}: {new[m]:.3f} < {b:.3f} - {max_drop}')\n    return errors\n\nprint(check({'auc': 0.82, 'logloss': 0.47}, {'auc': 0.83, 'logloss': 0.44}, {'logloss'}))\n",
   "hints": [
    "Үш тармақ: жоқ па → <code>lower_better</code>-де ме → қалғаны.",
    "Кішісі жақсы метрикада шек кері: <code>new[m] &gt; b + max_drop</code>."
   ],
   "check": {
    "tests": "_lb = {'logloss', 'rmse'}\nassert check({'auc': 0.83, 'logloss': 0.44}, {'auc': 0.83, 'logloss': 0.44}, _lb) == [], 'Өзгеріс жоқ → []'\n_e = check({'auc': 0.82, 'logloss': 0.47}, {'auc': 0.83, 'logloss': 0.44}, _lb)\nassert len(_e) == 1 and _e[0].startswith('logloss'), f'auc 0.01-ге түсті (шекте), logloss 0.03-ке өсті → тек logloss қатесі. Сізде {_e}'\nassert check({'auc': 0.85, 'logloss': 0.40}, {'auc': 0.83, 'logloss': 0.44}, _lb) == [], 'Екеуі де жақсарды → []'\n_e = check({'rmse': 120.0}, {'rmse': 100.0, 'r2': 0.8}, _lb, max_drop=5)\nassert [x.split(':')[0] for x in _e] == ['rmse', 'r2'], 'rmse өсті, r2 жоқ'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Аралықты тексеру",
   "prompt": "<p>CI-дағы data тест: <code>range_violations(df, ranges)</code> жазыңыз. <code>ranges</code> — <code>{баған: (min, max)}</code>. Мәні аралықтан тыс (шекаралар рұқсат) кемінде бір жолы бар бағандардың атауларын <code>ranges</code> ретімен қайтарсын; бағанның өзі жоқ болса <code>'missing:баған'</code>. Бос мәндер (NaN) еленбейді.</p>",
   "starter": "import pandas as pd\nbatch = pd.DataFrame({\n    'tenure_months': [3, 12, 700, 24],\n    'monthly_fee': [4990, 7500, 3990, None],\n    'support_calls': [0, 2, 1, 51],\n})\nRANGES = {'tenure_months': (0, 600), 'monthly_fee': (1000, 50000), 'support_calls': (0, 50), 'age': (18, 100)}\n\ndef range_violations(df, ranges):\n    return []\n",
   "solution": "import pandas as pd\nbatch = pd.DataFrame({\n    'tenure_months': [3, 12, 700, 24],\n    'monthly_fee': [4990, 7500, 3990, None],\n    'support_calls': [0, 2, 1, 51],\n})\nRANGES = {'tenure_months': (0, 600), 'monthly_fee': (1000, 50000), 'support_calls': (0, 50), 'age': (18, 100)}\n\ndef range_violations(df, ranges):\n    problems = []\n    for col, (lo, hi) in ranges.items():\n        if col not in df.columns:\n            problems.append(f'missing:{col}')\n            continue\n        values = df[col].dropna()\n        if ((values < lo) | (values > hi)).any():\n            problems.append(col)\n    return problems\n\nprint(range_violations(batch, RANGES))\n",
   "hints": [
    "Бос мәндерді алып тастаңыз: <code>df[col].dropna()</code>.",
    "Аралықтан тыс: <code>((values &lt; lo) | (values &gt; hi)).any()</code>."
   ],
   "check": {
    "tests": "assert range_violations(batch, RANGES) == ['tenure_months', 'support_calls', 'missing:age'], f'Күтілгені tenure_months, support_calls, missing:age. Сізде {range_violations(batch, RANGES)}'\nassert range_violations(pd.DataFrame({'x': [0, 10]}), {'x': (0, 10)}) == [], 'Шекаралық мәндер рұқсат'\nassert range_violations(pd.DataFrame({'x': [None, 5]}), {'x': (0, 10)}) == [], 'NaN еленбейді'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "CI қадамдарын орындау",
   "prompt": "<p>Workflow-дағы қадамдар ретімен жүреді және біреуі құласа, қалғандары іске қосылмайды. <code>run_pipeline(steps)</code> жазыңыз: <code>steps</code> — <code>(атауы, функция)</code> жұптары, функция exit code қайтарады. Қадамдарды ретімен шақырыңыз; нөлдік емес код қайтарған бірінші қадамда тоқтаңыз. <code>{'status': 'passed' немесе 'failed', 'ran': іске қосылған қадамдар атаулары, 'failed_step': құлаған қадам немесе None}</code> қайтарыңыз.</p>",
   "starter": "def run_pipeline(steps):\n    for name, func in steps:\n        func()\n    return {'status': 'passed', 'ran': [], 'failed_step': None}\n",
   "solution": "def run_pipeline(steps):\n    ran = []\n    for name, func in steps:\n        ran.append(name)\n        if func() != 0:\n            return {'status': 'failed', 'ran': ran, 'failed_step': name}\n    return {'status': 'passed', 'ran': ran, 'failed_step': None}\n\nprint(run_pipeline([('pytest', lambda: 0), ('check_metrics', lambda: 1), ('deploy', lambda: 0)]))\n",
   "hints": [
    "Қадамның атауын шақырудан бұрын <code>ran</code>-ға қосыңыз.",
    "<code>if func() != 0: return {...}</code> — ерте қайтару қалған қадамдарды тоқтатады."
   ],
   "check": {
    "tests": "_called = []\ndef _step(name, code):\n    def f():\n        _called.append(name)\n        return code\n    return name, f\n_r = run_pipeline([_step('pytest', 0), _step('validate_data', 0), _step('check_metrics', 1), _step('deploy', 0)])\nassert _r == {'status': 'failed', 'ran': ['pytest', 'validate_data', 'check_metrics'], 'failed_step': 'check_metrics'}, f'Нәтиже дұрыс емес: {_r}'\nassert 'deploy' not in _called, 'Құлаған қадамнан кейін deploy іске қосылмауы керек'\nassert run_pipeline([_step('a', 0), _step('b', 0)]) == {'status': 'passed', 'ran': ['a', 'b'], 'failed_step': None}, 'Бәрі 0 → passed'\nassert run_pipeline([]) == {'status': 'passed', 'ran': [], 'failed_step': None}, 'Қадам жоқ → passed'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Толық CI тексеруі",
   "prompt": "<p><code>ci_report(df, new, base)</code> жазыңыз: data тест пен metric gate-ті біріктіреді. Data: <code>REQUIRED</code>-тағы жоқ баған → <code>'missing:баған'</code>; <code>customer_id</code> қайталанса → <code>'duplicate_id'</code>; <code>monthly_fee</code>-де теріс мән → <code>'negative_fee'</code>. Metric: <code>base</code>-тегі әр метрика <code>new</code>-да жоқ немесе <code>base - 0.01</code>-ден төмен → <code>'metric:атауы'</code>; <code>new['auc'] &lt; 0.75</code> → <code>'auc_floor'</code>. Data мәселелері болса, metric тексерілмейді (дерек нашар болса, метрикаға сенбейміз). <code>(exit_code, messages)</code> қайтарыңыз.</p>",
   "starter": "import pandas as pd\nREQUIRED = ['customer_id', 'monthly_fee', 'tenure_months']\n\ndef ci_report(df, new, base):\n    return 0, []\n",
   "solution": "import pandas as pd\nREQUIRED = ['customer_id', 'monthly_fee', 'tenure_months']\n\ndef data_problems(df):\n    problems = [f'missing:{c}' for c in REQUIRED if c not in df.columns]\n    if 'customer_id' in df.columns and df['customer_id'].duplicated().any():\n        problems.append('duplicate_id')\n    if 'monthly_fee' in df.columns and (df['monthly_fee'] < 0).any():\n        problems.append('negative_fee')\n    return problems\n\ndef metric_problems(new, base, max_drop=0.01, min_auc=0.75):\n    problems = []\n    for m, b in base.items():\n        if m not in new or new[m] < b - max_drop:\n            problems.append(f'metric:{m}')\n    if new.get('auc', 0) < min_auc:\n        problems.append('auc_floor')\n    return problems\n\ndef ci_report(df, new, base):\n    messages = data_problems(df)\n    if not messages:\n        messages = metric_problems(new, base)\n    return (1 if messages else 0), messages\n\ngood = pd.DataFrame({'customer_id': [1, 2, 3], 'monthly_fee': [4990, 0, 7500], 'tenure_months': [3, 12, 40]})\nprint(ci_report(good, {'auc': 0.80, 'recall': 0.70}, {'auc': 0.83, 'recall': 0.70}))\n",
   "hints": [
    "Екі бөлек функция жазыңыз: <code>data_problems(df)</code> және <code>metric_problems(new, base)</code>; <code>ci_report</code> оларды біріктіреді.",
    "Қайталанған id: <code>df['customer_id'].duplicated().any()</code>."
   ],
   "check": {
    "tests": "_good = pd.DataFrame({'customer_id': [1, 2, 3], 'monthly_fee': [4990, 0, 7500], 'tenure_months': [3, 12, 40]})\nassert ci_report(_good, {'auc': 0.83, 'recall': 0.70}, {'auc': 0.83, 'recall': 0.70}) == (0, []), 'Бәрі дұрыс → (0, [])'\nassert ci_report(_good, {'auc': 0.80, 'recall': 0.70}, {'auc': 0.83, 'recall': 0.70}) == (1, ['metric:auc']), 'auc 0.03-ке түсті'\nassert ci_report(_good, {'auc': 0.74}, {'auc': 0.745, 'recall': 0.6}) == (1, ['metric:recall', 'auc_floor']), 'recall жоқ, auc шектен төмен'\n_bad = pd.DataFrame({'customer_id': [1, 1, 3], 'monthly_fee': [4990, -10, 7500]})\nassert ci_report(_bad, {'auc': 0.5}, {'auc': 0.83}) == (1, ['missing:tenure_months', 'duplicate_id', 'negative_fee']), 'Data мәселелері болса, metric тексерілмейді'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Baseline жаңарту",
   "prompt": "<p>Merge-ден кейін baseline жаңарады, бірақ тек build өтсе. <code>update_baseline(base, new, errors, lower_better=frozenset())</code> жазыңыз: <code>errors</code> бос болмаса <code>base</code>-тің <b>көшірмесін</b> өзгеріссіз қайтарсын. Бос болса жаңа сөздік: <code>base</code>-тегі әр метрика үшін жақсырақ мән (үлкені жақсы метрикада <code>max</code>, <code>lower_better</code>-дегілерде <code>min</code>; <code>new</code>-да жоқ болса ескісі қалады), сонымен қатар <code>new</code>-дағы жаңа метрикалар қосылады. <code>base</code> өзгермесін.</p>",
   "starter": "def update_baseline(base, new, errors, lower_better=frozenset()):\n    base.update(new)\n    return base\n",
   "solution": "def update_baseline(base, new, errors, lower_better=frozenset()):\n    if errors:\n        return dict(base)\n    result = dict(base)\n    for m, v in new.items():\n        if m not in result:\n            result[m] = v\n        elif m in lower_better:\n            result[m] = min(result[m], v)\n        else:\n            result[m] = max(result[m], v)\n    return result\n\nprint(update_baseline({'auc': 0.83, 'logloss': 0.44}, {'auc': 0.85, 'logloss': 0.46, 'recall': 0.7}, [], {'logloss'}))\n",
   "hints": [
    "Әрқашан көшірмемен жұмыс істеңіз: <code>result = dict(base)</code>.",
    "Әр жаңа метрика үшін үш жағдай: жаңа кілт, кішісі жақсы (<code>min</code>), үлкені жақсы (<code>max</code>)."
   ],
   "check": {
    "tests": "_b = {'auc': 0.83, 'logloss': 0.44}\n_r = update_baseline(_b, {'auc': 0.85, 'logloss': 0.46, 'recall': 0.7}, [], {'logloss'})\nassert _r == {'auc': 0.85, 'logloss': 0.44, 'recall': 0.7}, f'auc жақсарды, logloss нашарлады (ескісі қалады), recall қосылды. Сізде {_r}'\nassert _b == {'auc': 0.83, 'logloss': 0.44}, 'base өзгермеуі керек'\n_r2 = update_baseline(_b, {'auc': 0.9}, ['metric:recall'])\nassert _r2 == _b and _r2 is not _b, 'Қате болса base-тің көшірмесі өзгеріссіз'\nassert update_baseline({'auc': 0.8, 'rmse': 10.0}, {'rmse': 8.0}, [], {'rmse'}) == {'auc': 0.8, 'rmse': 8.0}, 'new-да жоқ метрика сақталады, rmse кішірейді'"
   }
  }
 ],
 "ops-6": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қателер үлесі",
   "prompt": "<p><code>error_rate(statuses)</code> функциясын жазыңыз: статус кодтарының ішінде 500 және одан жоғары кодтардың үлесін (0–1) қайтарсын. Тізім бос болса <code>0.0</code>.</p>",
   "starter": "def error_rate(statuses):\n    return 0.0\n",
   "solution": "def error_rate(statuses):\n    if not statuses:\n        return 0.0\n    return sum(1 for s in statuses if s >= 500) / len(statuses)\n\nprint(error_rate([200, 200, 503, 200, 500, 404, 200, 200]))\n",
   "hints": [
    "<code>sum(1 for s in statuses if s &gt;= 500)</code> — сервер қателерінің саны.",
    "404 — клиенттің қатесі, ол есептелмейді."
   ],
   "check": {
    "tests": "assert error_rate([200, 200, 503, 200, 500, 404, 200, 200]) == 0.25, '8 сұраудың 2-еуі 5xx → 0.25 (404 есептелмейді)'\nassert error_rate([200] * 10) == 0.0, 'Қате жоқ → 0.0'\nassert error_rate([]) == 0.0, 'Бос тізім → 0.0'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бос мәндер үлесі",
   "prompt": "<p>Кіріс деректердің сапасын бақылаймыз. <code>null_shares</code> айнымалысына <code>requests</code> DataFrame-інің әр бағанындағы бос мәндер үлесін (Series, <code>isna().mean()</code>) жазыңыз, ал <code>bad_cols</code>-қа үлесі 0.1-ден көп бағандардың тізімін.</p>",
   "starter": "import pandas as pd\nrequests = pd.DataFrame({\n    'tenure_months': [3, 12, None, 24, 5, 8, 40, 2, 15, 30],\n    'monthly_fee': [4990, None, None, 7500, 3990, None, 5990, 4990, 6990, 5490],\n    'city': ['Алматы', 'Астана', 'Алматы', None, 'Шымкент', 'Алматы', 'Астана', 'Алматы', 'Орал', 'Алматы'],\n})\nnull_shares = None\nbad_cols = []\n",
   "solution": "import pandas as pd\nrequests = pd.DataFrame({\n    'tenure_months': [3, 12, None, 24, 5, 8, 40, 2, 15, 30],\n    'monthly_fee': [4990, None, None, 7500, 3990, None, 5990, 4990, 6990, 5490],\n    'city': ['Алматы', 'Астана', 'Алматы', None, 'Шымкент', 'Алматы', 'Астана', 'Алматы', 'Орал', 'Алматы'],\n})\nnull_shares = requests.isna().mean()\nbad_cols = [c for c, s in null_shares.items() if s > 0.1]\nprint(null_shares, bad_cols)\n",
   "hints": [
    "<code>requests.isna().mean()</code> — әр бағанның бос мәндер үлесі.",
    "<code>[c for c, s in null_shares.items() if s &gt; 0.1]</code>."
   ],
   "check": {
    "tests": "assert null_shares is not None and abs(float(null_shares['monthly_fee']) - 0.3) < 1e-9 and abs(float(null_shares['city']) - 0.1) < 1e-9, 'null_shares: monthly_fee 0.3, city 0.1'\nassert bad_cols == ['monthly_fee'], f'Тек monthly_fee 0.1-ден көп (tenure мен city дәл 0.1). Сізде {bad_cols}'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Апталық сұраулар",
   "prompt": "<p><code>logs</code> DataFrame-інде әр сұраудың аптасы бар. <code>weekly_counts</code> айнымалысына әр аптадағы сұраулар санын (Series, апта бойынша сұрыпталған) жазыңыз, ал <code>drop_weeks</code>-қа сұраулар саны алдыңғы аптамен салыстырғанда 2 есе және одан көп азайған апталардың тізімін (int).</p>",
   "starter": "import pandas as pd\nlogs = pd.DataFrame({'week': [1] * 12 + [2] * 11 + [3] * 5 + [4] * 10})\nweekly_counts = None\ndrop_weeks = []\n",
   "solution": "import pandas as pd\nlogs = pd.DataFrame({'week': [1] * 12 + [2] * 11 + [3] * 5 + [4] * 10})\nweekly_counts = logs.groupby('week').size()\ndrop_weeks = [int(w) for w, prev, cur in zip(weekly_counts.index[1:], weekly_counts.values[:-1], weekly_counts.values[1:]) if cur * 2 <= prev]\nprint(weekly_counts, drop_weeks)\n",
   "hints": [
    "Санау: <code>logs.groupby('week').size()</code> (немесе <code>value_counts().sort_index()</code>).",
    "Көрші апталарды салыстыру: <code>zip(...values[:-1], ...values[1:])</code>, шарт <code>cur * 2 &lt;= prev</code>."
   ],
   "check": {
    "tests": "assert weekly_counts is not None and [int(x) for x in weekly_counts.values] == [12, 11, 5, 10], 'weekly_counts: 12, 11, 5, 10'\nassert [int(x) for x in weekly_counts.index] == [1, 2, 3, 4], 'Апта бойынша сұрыпталсын'\nassert drop_weeks == [3], f'Тек 3-апта (11 → 5) екі есе азайды. Сізде {drop_weeks}'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Alert ережелері",
   "prompt": "<p>Alert ережелері сөздікте: <code>{alert атауы: (метрика, шек)}</code>; метрика шектен <b>жоғары</b> болса alert іске қосылады. <code>fire_alerts(metrics, rules)</code> жазыңыз: іске қосылған alert атауларын <code>rules</code> ретімен қайтарсын. Метрика <code>metrics</code>-те жоқ болса, <code>'no_data:alert атауы'</code> қайтарылсын (дерек келмеуі де — проблема).</p>",
   "starter": "RULES = {\n    'latency': ('p95_ms', 300),\n    'errors': ('error_rate', 0.02),\n    'drift': ('max_psi', 0.25),\n    'proba_shift': ('proba_delta', 0.1),\n}\n\ndef fire_alerts(metrics, rules):\n    return []\n",
   "solution": "RULES = {\n    'latency': ('p95_ms', 300),\n    'errors': ('error_rate', 0.02),\n    'drift': ('max_psi', 0.25),\n    'proba_shift': ('proba_delta', 0.1),\n}\n\ndef fire_alerts(metrics, rules):\n    fired = []\n    for name, (metric, limit) in rules.items():\n        if metric not in metrics:\n            fired.append(f'no_data:{name}')\n        elif metrics[metric] > limit:\n            fired.append(name)\n    return fired\n\nprint(fire_alerts({'p95_ms': 420, 'error_rate': 0.01, 'max_psi': 0.31}, RULES))\n",
   "hints": [
    "<code>for name, (metric, limit) in rules.items():</code>.",
    "Алдымен метрика бар ма, сосын <code>metrics[metric] &gt; limit</code>."
   ],
   "check": {
    "tests": "assert fire_alerts({'p95_ms': 420, 'error_rate': 0.01, 'max_psi': 0.31, 'proba_delta': 0.05}, RULES) == ['latency', 'drift'], 'latency 420 > 300, drift 0.31 > 0.25'\nassert fire_alerts({'p95_ms': 300, 'error_rate': 0.02, 'max_psi': 0.1, 'proba_delta': 0.1}, RULES) == [], 'Шекке тең мән alert емес'\nassert fire_alerts({'p95_ms': 100, 'error_rate': 0.05}, RULES) == ['errors', 'no_data:drift', 'no_data:proba_shift'], 'Жоқ метрикалар үшін no_data:...'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жаңа категориялар",
   "prompt": "<p>Production-да модель көрмеген категориялар пайда болуы мүмкін. <code>new_categories(train, live)</code> жазыңыз: <code>live</code>-та бар, бірақ <code>train</code>-де жоқ мәндердің сұрыпталған тізімін қайтарсын (бос мәндер <code>None</code> еленбейді). Сосын <code>unseen_share</code> — <code>live_cities</code>-тағы осындай мәндердің үлесі (0–1, бос мәндер есепке кірмейді).</p>",
   "starter": "train_cities = ['Алматы', 'Астана', 'Шымкент', 'Алматы', 'Астана']\nlive_cities = ['Алматы', 'Қонаев', 'Астана', None, 'Қонаев', 'Түркістан', 'Алматы', 'Шымкент', 'Алматы']\n\ndef new_categories(train, live):\n    return []\n\nunseen_share = None\n",
   "solution": "train_cities = ['Алматы', 'Астана', 'Шымкент', 'Алматы', 'Астана']\nlive_cities = ['Алматы', 'Қонаев', 'Астана', None, 'Қонаев', 'Түркістан', 'Алматы', 'Шымкент', 'Алматы']\n\ndef new_categories(train, live):\n    known = set(train)\n    return sorted({v for v in live if v is not None and v not in known})\n\nnew = set(new_categories(train_cities, live_cities))\npresent = [v for v in live_cities if v is not None]\nunseen_share = sum(1 for v in present if v in new) / len(present)\nprint(new_categories(train_cities, live_cities), unseen_share)\n",
   "hints": [
    "Жиындар айырмасы: <code>{v for v in live if v is not None and v not in set(train)}</code>, сосын <code>sorted</code>.",
    "Үлес: бос емес мәндердің ішінде жаңа категориялардың саны / бос емес мәндер саны."
   ],
   "check": {
    "tests": "assert new_categories(train_cities, live_cities) == sorted(['Қонаев', 'Түркістан']), f'Жаңа қалалар: Қонаев, Түркістан (sorted ретімен). Сізде {new_categories(train_cities, live_cities)}'\nassert new_categories(['a'], ['a', None]) == [], 'None есептелмейді'\nassert unseen_share is not None and abs(float(unseen_share) - 3 / 8) < 1e-9, f'8 бос емес мәннің 3-еуі жаңа: 0.375, сізде {unseen_share}'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Апталық p95",
   "prompt": "<p><code>logs</code> DataFrame-інен: <code>weekly_p95</code> — әр аптаның <code>latency_ms</code> 95-перцентилі (<code>groupby</code> + <code>quantile(0.95)</code>), <code>weekly_err</code> — әр аптадағы <code>status &gt;= 500</code> үлесі, <code>bad_weeks</code> — p95 &gt; 300 <b>немесе</b> қателер үлесі &gt; 0.02 болған апталардың сұрыпталған тізімі (int).</p>",
   "starter": "import pandas as pd\nlogs = pd.DataFrame({\n    'week': [1] * 10 + [2] * 10 + [3] * 10,\n    'latency_ms': [110, 95, 120, 130, 100, 105, 98, 115, 125, 140,\n                   105, 99, 118, 450, 101, 620, 97, 111, 133, 104,\n                   100, 98, 102, 96, 110, 108, 99, 105, 101, 103],\n    'status': [200] * 10 + [200] * 10 + [200] * 9 + [503],\n})\nweekly_p95 = None\nweekly_err = None\nbad_weeks = []\n",
   "solution": "import pandas as pd\nlogs = pd.DataFrame({\n    'week': [1] * 10 + [2] * 10 + [3] * 10,\n    'latency_ms': [110, 95, 120, 130, 100, 105, 98, 115, 125, 140,\n                   105, 99, 118, 450, 101, 620, 97, 111, 133, 104,\n                   100, 98, 102, 96, 110, 108, 99, 105, 101, 103],\n    'status': [200] * 10 + [200] * 10 + [200] * 9 + [503],\n})\nweekly_p95 = logs.groupby('week')['latency_ms'].quantile(0.95)\nweekly_err = (logs['status'] >= 500).groupby(logs['week']).mean()\nbad_weeks = sorted(int(w) for w in weekly_p95.index if weekly_p95[w] > 300 or weekly_err[w] > 0.02)\nprint(weekly_p95, weekly_err, bad_weeks)\n",
   "hints": [
    "<code>logs.groupby('week')['latency_ms'].quantile(0.95)</code>.",
    "Үлес: <code>(logs['status'] &gt;= 500).groupby(logs['week']).mean()</code>."
   ],
   "check": {
    "tests": "assert weekly_p95 is not None and abs(float(weekly_p95.loc[2]) - logs[logs['week'] == 2]['latency_ms'].quantile(0.95)) < 1e-9, 'weekly_p95 = groupby(\"week\")[\"latency_ms\"].quantile(0.95)'\nassert weekly_err is not None and abs(float(weekly_err.loc[3]) - 0.1) < 1e-9 and float(weekly_err.loc[1]) == 0.0, 'weekly_err: 3-аптада 0.1, 1-аптада 0'\nassert bad_weeks == [2, 3], f'2-апта (p95 > 300) және 3-апта (қателер 10%). Сізде {bad_weeks}'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Alert fatigue",
   "prompt": "<p>Бір alert әр 5 минут сайын қайталанса, команда оларды оқымай қояды. <code>dedupe_alerts(events, cooldown=60)</code> жазыңыз: <code>events</code> — <code>(минут, alert атауы)</code> жұптары (уақыт бойынша сұрыпталған). Бір атаулы alert соңғы <b>жіберілген</b> сол alert-тен кейін <code>cooldown</code> минуттан аз уақытта келсе, ол басылады. Жіберілген оқиғалар тізімін және <code>suppressed</code> — басылғандар санын <code>(sent, suppressed)</code> ретінде қайтарыңыз.</p>",
   "starter": "events = [(0, 'latency'), (5, 'latency'), (10, 'errors'), (30, 'latency'),\n          (61, 'latency'), (65, 'errors'), (70, 'errors'), (130, 'latency')]\n\ndef dedupe_alerts(events, cooldown=60):\n    return events, 0\n",
   "solution": "events = [(0, 'latency'), (5, 'latency'), (10, 'errors'), (30, 'latency'),\n          (61, 'latency'), (65, 'errors'), (70, 'errors'), (130, 'latency')]\n\ndef dedupe_alerts(events, cooldown=60):\n    last_sent = {}\n    sent, suppressed = [], 0\n    for t, name in events:\n        if name in last_sent and t - last_sent[name] < cooldown:\n            suppressed += 1\n            continue\n        last_sent[name] = t\n        sent.append((t, name))\n    return sent, suppressed\n\nprint(dedupe_alerts(events))\n",
   "hints": [
    "Әр alert-тің соңғы жіберілген уақытын сөздікте сақтаңыз: <code>last_sent[name] = t</code>.",
    "Басылған оқиға <code>last_sent</code>-ті жаңартпайды."
   ],
   "check": {
    "tests": "_s, _n = dedupe_alerts(events)\nassert _s == [(0, 'latency'), (10, 'errors'), (61, 'latency'), (70, 'errors'), (130, 'latency')], f'Жіберілгендер дұрыс емес: {_s}'\nassert _n == 3, f'Басылғандар саны 3 (5, 30 латенция; 65 errors), сізде {_n}'\nassert dedupe_alerts(events, cooldown=0) == (events, 0), 'cooldown=0 болса бәрі жіберіледі'\nassert dedupe_alerts([], 30) == ([], 0), 'Бос тізім'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Мониторинг есебі",
   "prompt": "<p><code>monitor_report(logs, baseline_proba=0.25)</code> жазыңыз: <code>logs</code> — <code>latency_ms</code>, <code>status</code>, <code>proba</code>, <code>monthly_fee</code> бағандары бар DataFrame. Сөздік қайтарсын: <code>p95</code> — latency 95-перцентилі; <code>error_rate</code> — <code>status &gt;= 500</code> үлесі; <code>mean_proba</code> — <code>proba</code> орташасы (бос мәндерсіз); <code>fee_null</code> — <code>monthly_fee</code> бос мәндер үлесі (барлығы 3 таңбаға дөңгелектенген float); <code>alerts</code> — <code>'latency'</code> (p95 &gt; 300), <code>'errors'</code> (&gt; 0.02), <code>'proba_shift'</code> (|mean_proba − baseline| &gt; 0.1), <code>'nulls'</code> (fee_null &gt; 0.05), осы ретпен. Шектер дөңгелектелмеген мәндермен салыстырылсын.</p>",
   "starter": "import pandas as pd\nlogs = pd.DataFrame({\n    'latency_ms': [120, 95, 110, 130, 105, 98, 450, 115, 102, 125],\n    'status': [200, 200, 200, 200, 200, 200, 500, 200, 200, 200],\n    'proba': [0.41, 0.38, None, 0.45, 0.33, 0.39, 0.52, 0.36, 0.40, 0.31],\n    'monthly_fee': [4990, None, 7500, 3990, 5990, 4990, None, 6990, 5490, 4990],\n})\n\ndef monitor_report(logs, baseline_proba=0.25):\n    return {'alerts': []}\n",
   "solution": "import pandas as pd\nlogs = pd.DataFrame({\n    'latency_ms': [120, 95, 110, 130, 105, 98, 450, 115, 102, 125],\n    'status': [200, 200, 200, 200, 200, 200, 500, 200, 200, 200],\n    'proba': [0.41, 0.38, None, 0.45, 0.33, 0.39, 0.52, 0.36, 0.40, 0.31],\n    'monthly_fee': [4990, None, 7500, 3990, 5990, 4990, None, 6990, 5490, 4990],\n})\n\ndef monitor_report(logs, baseline_proba=0.25):\n    p95 = float(logs['latency_ms'].quantile(0.95))\n    error_rate = float((logs['status'] >= 500).mean())\n    mean_proba = float(logs['proba'].mean())\n    fee_null = float(logs['monthly_fee'].isna().mean())\n    alerts = []\n    if p95 > 300:\n        alerts.append('latency')\n    if error_rate > 0.02:\n        alerts.append('errors')\n    if abs(mean_proba - baseline_proba) > 0.1:\n        alerts.append('proba_shift')\n    if fee_null > 0.05:\n        alerts.append('nulls')\n    return {'p95': round(p95, 3), 'error_rate': round(error_rate, 3), 'mean_proba': round(mean_proba, 3),\n            'fee_null': round(fee_null, 3), 'alerts': alerts}\n\nprint(monitor_report(logs))\n",
   "hints": [
    "Әр метриканы бөлек айнымалыға есептеп, alert-терді тексеріп, тек соңында дөңгелектеңіз.",
    "pandas-тың <code>.mean()</code> әдісі NaN-ды өзі өткізеді."
   ],
   "check": {
    "tests": "_r = monitor_report(logs)\nassert set(_r) == {'p95', 'error_rate', 'mean_proba', 'fee_null', 'alerts'}, f'Кілттер: p95, error_rate, mean_proba, fee_null, alerts. Сізде {sorted(_r)}'\nassert _r['p95'] == round(float(logs['latency_ms'].quantile(0.95)), 3) and _r['error_rate'] == 0.1, 'p95 және error_rate дұрыс емес'\nassert _r['mean_proba'] == 0.394 and _r['fee_null'] == 0.2, f'mean_proba ≈ 0.394 (NaN-сыз), fee_null = 0.2. Сізде {_r[\"mean_proba\"]}, {_r[\"fee_null\"]}'\nassert _r['alerts'] == ['latency', 'errors', 'proba_shift', 'nulls'], f'Төрт alert те іске қосылады, сізде {_r[\"alerts\"]}'\nassert monitor_report(logs, baseline_proba=0.4)['alerts'] == ['latency', 'errors', 'nulls'], 'baseline_proba=0.4 болса proba_shift жоқ'\n_ok = pd.DataFrame({'latency_ms': [100, 110], 'status': [200, 200], 'proba': [0.2, 0.3], 'monthly_fee': [1, 2]})\nassert monitor_report(_ok)['alerts'] == [], 'Қалыпты деректе alert жоқ'"
   }
  }
 ],
 "ops-7": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "PSI-дің бір мүшесі",
   "prompt": "<p><code>psi_term(actual, expected)</code> функциясын жазыңыз: бір bin үшін PSI мүшесін <code>(actual - expected) * ln(actual / expected)</code> қайтарсын (<code>np.log</code>). Мысалы, <code>psi_term(0.05, 0.25)</code> ≈ <code>0.3219</code>.</p>",
   "starter": "import numpy as np\n\ndef psi_term(actual, expected):\n    return actual - expected\n",
   "solution": "import numpy as np\n\ndef psi_term(actual, expected):\n    return float((actual - expected) * np.log(actual / expected))\n\nprint(round(psi_term(0.05, 0.25), 4))\n",
   "hints": [
    "<code>np.log</code> — натурал логарифм (ln).",
    "Формула: <code>(actual - expected) * np.log(actual / expected)</code>."
   ],
   "check": {
    "tests": "assert abs(psi_term(0.05, 0.25) - 0.3219) < 1e-4, 'psi_term(0.05, 0.25) ≈ 0.3219'\nassert abs(psi_term(0.25, 0.25)) < 1e-12, 'Үлестер тең болса 0'\nassert psi_term(0.5, 0.25) > 0 and psi_term(0.1, 0.25) > 0, 'PSI мүшесі әрқашан теріс емес'",
    "mustInclude": [
     "log"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "PSI деңгейі",
   "prompt": "<p><code>psi_level(psi)</code> функциясын жазыңыз: PSI &lt; 0.1 → <code>'stable'</code>, 0.1 ≤ PSI ≤ 0.25 → <code>'moderate'</code>, PSI &gt; 0.25 → <code>'strong'</code>.</p>",
   "starter": "def psi_level(psi):\n    return 'stable'\n",
   "solution": "def psi_level(psi):\n    if psi < 0.1:\n        return 'stable'\n    if psi <= 0.25:\n        return 'moderate'\n    return 'strong'\n\nprint(psi_level(0.02), psi_level(0.18), psi_level(0.56))\n",
   "hints": [
    "Шектерді ретімен тексеріңіз: алдымен <code>&lt; 0.1</code>, сосын <code>&lt;= 0.25</code>.",
    "Қалғаны — <code>'strong'</code>."
   ],
   "check": {
    "tests": "assert psi_level(0.02) == 'stable' and psi_level(0.099) == 'stable', '< 0.1 → stable'\nassert psi_level(0.1) == 'moderate' and psi_level(0.25) == 'moderate', '0.1 және 0.25 → moderate'\nassert psi_level(0.2501) == 'strong' and psi_level(0.56) == 'strong', '> 0.25 → strong'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Үлестерге еден қою",
   "prompt": "<p>Бос bin-де <code>ln(0)</code> шексіз болады. <code>apply_floor(props, floor=0.001)</code> функциясын жазыңыз: әр үлесті <code>floor</code>-дан кіші болмайтындай етіп (<code>max(p, floor)</code>) жаңа тізім қайтарсын.</p>",
   "starter": "def apply_floor(props, floor=0.001):\n    return props\n",
   "solution": "def apply_floor(props, floor=0.001):\n    return [max(p, floor) for p in props]\n\nprint(apply_floor([0.0, 0.3, 0.7]))\n",
   "hints": [
    "<code>[max(p, floor) for p in props]</code>.",
    "Немесе numpy: <code>np.maximum(props, floor)</code>."
   ],
   "check": {
    "tests": "assert apply_floor([0.0, 0.3, 0.7]) == [0.001, 0.3, 0.7], 'apply_floor([0.0, 0.3, 0.7]) [0.001, 0.3, 0.7] қайтаруы керек'\nassert apply_floor([0.0005, 0.2], floor=0.01) == [0.01, 0.2], 'floor параметрі ескерілсін'\n_p = [0.0, 1.0]\napply_floor(_p)\nassert _p == [0.0, 1.0], 'Кіріс тізім өзгермесін'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Үлестерден PSI",
   "prompt": "<p><code>psi_from_props(expected, actual, floor=0.001)</code> жазыңыз: екі үлестер тізімінен PSI-ды қайтарсын (екеуіне де еден қойып, барлық bin мүшелерінің қосындысы). Сосын <code>psi_example</code> — сабақтағы мысал: reference <code>[0.25, 0.25, 0.25, 0.25]</code>, жаңа <code>[0.05, 0.15, 0.30, 0.50]</code>; <code>psi_empty</code> — reference <code>[0.4, 0.4, 0.2]</code>, жаңа <code>[0.5, 0.5, 0.0]</code>.</p>",
   "starter": "import numpy as np\n\ndef psi_from_props(expected, actual, floor=0.001):\n    return 0.0\n\npsi_example = None\npsi_empty = None\n",
   "solution": "import numpy as np\n\ndef psi_from_props(expected, actual, floor=0.001):\n    e = np.maximum(np.array(expected, dtype=float), floor)\n    a = np.maximum(np.array(actual, dtype=float), floor)\n    return float(np.sum((a - e) * np.log(a / e)))\n\npsi_example = psi_from_props([0.25] * 4, [0.05, 0.15, 0.30, 0.50])\npsi_empty = psi_from_props([0.4, 0.4, 0.2], [0.5, 0.5, 0.0])\nprint(round(psi_example, 3), round(psi_empty, 3))\n",
   "hints": [
    "numpy массивтерімен: <code>e = np.maximum(np.array(expected), floor)</code>.",
    "PSI: <code>np.sum((a - e) * np.log(a / e))</code>."
   ],
   "check": {
    "tests": "assert psi_example is not None and abs(float(psi_example) - 0.5554) < 0.001, f'psi_example ≈ 0.555 болуы керек, сізде {psi_example}'\nassert psi_empty is not None and abs(float(psi_empty) - 1.099) < 0.002, f'Бос bin-ге еден қойылса psi_empty ≈ 1.099, сізде {psi_empty}'\nassert abs(psi_from_props([0.3, 0.7], [0.3, 0.7])) < 1e-12, 'Бірдей үлестерде 0'",
    "mustInclude": [
     "log"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Категориялық PSI",
   "prompt": "<p>Категориялық белгіде bin — категорияның өзі. <code>cat_psi(ref, cur, floor=0.001)</code> жазыңыз: екі таңдадағы <b>барлық</b> категориялар бойынша (біріктірілген жиын) үлестерді есептеп (<code>value_counts(normalize=True)</code> немесе қолмен), еден қойып, PSI қайтарсын. Сосын <code>psi_tariff</code> — <code>ref_tariff</code> мен <code>cur_tariff</code> үшін PSI.</p>",
   "starter": "import numpy as np\nimport pandas as pd\nref_tariff = ['Базалық'] * 50 + ['Безлимит'] * 20 + ['Отбасы'] * 30\ncur_tariff = ['Базалық'] * 30 + ['Безлимит'] * 45 + ['Отбасы'] * 20 + ['Жастар'] * 5\n\ndef cat_psi(ref, cur, floor=0.001):\n    return 0.0\n\npsi_tariff = None\n",
   "solution": "import numpy as np\nimport pandas as pd\nref_tariff = ['Базалық'] * 50 + ['Безлимит'] * 20 + ['Отбасы'] * 30\ncur_tariff = ['Базалық'] * 30 + ['Безлимит'] * 45 + ['Отбасы'] * 20 + ['Жастар'] * 5\n\ndef cat_psi(ref, cur, floor=0.001):\n    cats = sorted(set(ref) | set(cur))\n    e = pd.Series(ref).value_counts(normalize=True).reindex(cats, fill_value=0).to_numpy()\n    a = pd.Series(cur).value_counts(normalize=True).reindex(cats, fill_value=0).to_numpy()\n    e = np.maximum(e, floor)\n    a = np.maximum(a, floor)\n    return float(np.sum((a - e) * np.log(a / e)))\n\npsi_tariff = cat_psi(ref_tariff, cur_tariff)\nprint(round(psi_tariff, 3))\n",
   "hints": [
    "Категориялар: <code>sorted(set(ref) | set(cur))</code>; үлестер: <code>value_counts(normalize=True).reindex(cats, fill_value=0)</code>.",
    "Жаңа категория (Жастар) reference-те 0 болады, сондықтан еден керек."
   ],
   "check": {
    "tests": "assert psi_tariff is not None and abs(float(psi_tariff) - 0.5371) < 0.002, f'psi_tariff ≈ 0.537 болуы керек (Жастар жаңа категория), сізде {psi_tariff}'\nassert abs(cat_psi(['a', 'b'], ['b', 'a'])) < 1e-12, 'Бірдей таралуда 0'\nassert cat_psi(['a'] * 9 + ['b'], ['a'] * 5 + ['b'] * 5) > 0.25, 'Күшті өзгеріс > 0.25'",
    "mustInclude": [
     "log"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Квантиль бойынша bin-дер",
   "prompt": "<p>Bin шекараларын reference деректің квантильдерінен алу ыңғайлы: сонда әр bin-де reference-тің шамамен бірдей үлесі болады. <code>quantile_bins(ref, n=4)</code> жазыңыз: <code>np.quantile(ref, [1/n, 2/n, ..., (n-1)/n])</code> ішкі шекараларын алып, басына <code>-np.inf</code>, соңына <code>np.inf</code> қосып, тізім қайтарсын (<code>n + 1</code> шекара). Сосын <code>props</code> — <code>cur</code> мәндерінің осы bin-дердегі үлестері (<code>bins[i] &lt;= v &lt; bins[i+1]</code>).</p>",
   "starter": "import numpy as np\nref = [3500, 3900, 4200, 4500, 4800, 5200, 6000, 6500, 7000, 7500,\n       8200, 9000, 9500, 10500, 11000, 12500, 13000, 14000, 16000, 18000]\ncur = [4000, 5500, 6200, 7800, 8300, 8800, 9200, 10000, 10800, 11500,\n       12200, 12800, 13500, 14200, 15000, 15500, 16500, 17000, 19000, 21000]\n\ndef quantile_bins(ref, n=4):\n    return [0, np.inf]\n\nprops = None\n",
   "solution": "import numpy as np\nref = [3500, 3900, 4200, 4500, 4800, 5200, 6000, 6500, 7000, 7500,\n       8200, 9000, 9500, 10500, 11000, 12500, 13000, 14000, 16000, 18000]\ncur = [4000, 5500, 6200, 7800, 8300, 8800, 9200, 10000, 10800, 11500,\n       12200, 12800, 13500, 14200, 15000, 15500, 16500, 17000, 19000, 21000]\n\ndef quantile_bins(ref, n=4):\n    inner = np.quantile(ref, [i / n for i in range(1, n)])\n    return [-np.inf] + [float(q) for q in inner] + [np.inf]\n\ndef bin_props(x, bins):\n    a = np.asarray(x, dtype=float)\n    return [float(((a >= bins[i]) & (a < bins[i + 1])).mean()) for i in range(len(bins) - 1)]\n\nbins = quantile_bins(ref)\nprops = bin_props(cur, bins)\nprint(bins, props)\n",
   "hints": [
    "Ішкі квантильдер: <code>np.quantile(ref, [i / n for i in range(1, n)])</code>.",
    "Үлестер: <code>((a &gt;= bins[i]) &amp; (a &lt; bins[i+1])).mean()</code>."
   ],
   "check": {
    "tests": "import numpy as _np\n_b = quantile_bins(ref)\nassert len(_b) == 5 and _b[0] == -_np.inf and _b[-1] == _np.inf, 'n=4 → 5 шекара, шеттерінде -inf және inf'\nassert [round(x, 1) for x in _b[1:-1]] == [round(float(q), 1) for q in _np.quantile(ref, [0.25, 0.5, 0.75])], 'Ішкі шекаралар — reference-тің квантильдері'\nassert len(quantile_bins(ref, n=10)) == 11, 'n=10 → 11 шекара'\nassert props is not None and [round(p, 2) for p in props] == [0.05, 0.15, 0.25, 0.55], f'cur үлестері: 0.05, 0.15, 0.25, 0.55. Сізде {props}'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Белгілер бойынша drift есебі",
   "prompt": "<p><code>drift_report(ref_df, cur_df, n_bins=4, floor=0.001)</code> жазыңыз: <code>ref_df</code>-тің әр сандық бағаны үшін reference квантильдерінен bin-дер жасап (<code>-inf</code> және <code>inf</code> шеттерімен), PSI есептеп, <code>{баған: (psi 3 таңбаға дөңгелектенген, деңгей)}</code> сөздігін қайтарсын. Деңгей: &lt; 0.1 <code>'stable'</code>, ≤ 0.25 <code>'moderate'</code>, әйтпесе <code>'strong'</code>. Сосын <code>report = drift_report(ref_df, cur_df)</code>.</p>",
   "starter": "import numpy as np\nimport pandas as pd\nrng = np.random.default_rng(0)\nref_df = pd.DataFrame({\n    'monthly_fee': rng.normal(7500, 1500, 400).round(),\n    'tenure_months': rng.integers(1, 60, 400),\n    'support_calls': rng.poisson(1.5, 400),\n})\ncur_df = pd.DataFrame({\n    'monthly_fee': rng.normal(9500, 1500, 400).round(),\n    'tenure_months': rng.integers(1, 60, 400),\n    'support_calls': rng.poisson(1.8, 400),\n})\n\ndef drift_report(ref_df, cur_df, n_bins=4, floor=0.001):\n    return {}\n\nreport = None\n",
   "solution": "import numpy as np\nimport pandas as pd\nrng = np.random.default_rng(0)\nref_df = pd.DataFrame({\n    'monthly_fee': rng.normal(7500, 1500, 400).round(),\n    'tenure_months': rng.integers(1, 60, 400),\n    'support_calls': rng.poisson(1.5, 400),\n})\ncur_df = pd.DataFrame({\n    'monthly_fee': rng.normal(9500, 1500, 400).round(),\n    'tenure_months': rng.integers(1, 60, 400),\n    'support_calls': rng.poisson(1.8, 400),\n})\n\ndef bin_props(x, bins):\n    a = np.asarray(x, dtype=float)\n    return np.array([((a >= bins[i]) & (a < bins[i + 1])).mean() for i in range(len(bins) - 1)])\n\ndef psi(ref, cur, bins, floor):\n    e = np.maximum(bin_props(ref, bins), floor)\n    a = np.maximum(bin_props(cur, bins), floor)\n    return float(np.sum((a - e) * np.log(a / e)))\n\ndef level(p):\n    if p < 0.1:\n        return 'stable'\n    if p <= 0.25:\n        return 'moderate'\n    return 'strong'\n\ndef drift_report(ref_df, cur_df, n_bins=4, floor=0.001):\n    result = {}\n    for col in ref_df.columns:\n        inner = np.quantile(ref_df[col], [i / n_bins for i in range(1, n_bins)])\n        bins = [-np.inf] + list(inner) + [np.inf]\n        p = psi(ref_df[col], cur_df[col], bins, floor)\n        result[col] = (round(p, 3), level(p))\n    return result\n\nreport = drift_report(ref_df, cur_df)\nprint(report)\n",
   "hints": [
    "Бағандар бойынша цикл: әрқайсысына квантиль bin-дері → үлестер → PSI → деңгей.",
    "Бұрынғы тапсырмалардағы <code>bin_props</code>, <code>psi</code> және деңгей функцияларын көмекші ретінде қолданыңыз."
   ],
   "check": {
    "tests": "import numpy as _np\nassert report is not None and set(report) == {'monthly_fee', 'tenure_months', 'support_calls'}, 'Әр баған үшін жазба болсын'\nassert report['monthly_fee'][1] == 'strong' and report['monthly_fee'][0] > 0.25, f'monthly_fee қатты өзгерді (орташасы 7500 → 9500): strong. Сізде {report[\"monthly_fee\"]}'\nassert report['tenure_months'][1] == 'stable', f'tenure_months өзгермеді: stable. Сізде {report[\"tenure_months\"]}'\n_e = _np.quantile(ref_df['support_calls'], [0.25, 0.5, 0.75])\n_bins = [-_np.inf] + list(_e) + [_np.inf]\n_pe = _np.maximum([((ref_df['support_calls'] >= _bins[i]) & (ref_df['support_calls'] < _bins[i + 1])).mean() for i in range(4)], 0.001)\n_pa = _np.maximum([((cur_df['support_calls'] >= _bins[i]) & (cur_df['support_calls'] < _bins[i + 1])).mean() for i in range(4)], 0.001)\nassert report['support_calls'][0] == round(float(_np.sum((_pa - _pe) * _np.log(_pa / _pe))), 3), 'support_calls PSI мәні дұрыс емес (квантиль bin-дері, еден 0.001)'\n_same = drift_report(ref_df, ref_df)\nassert all(v == (0.0, 'stable') for v in _same.values()), 'Өзімен салыстырғанда барлығы (0.0, stable)'",
    "mustInclude": [
     "log"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "KS бойынша drift белгілері",
   "prompt": "<p><code>ks_stat(a, b)</code> — екі таңданың CDF-терінің ең үлкен айырмасы (scipy-сыз: біріктірілген мәндер бойынша <code>(a &lt;= v).mean()</code> мен <code>(b &lt;= v).mean()</code> айырмасының максимумы). <code>ks_flags(ref_df, cur_df, threshold=0.2)</code> жазыңыз: KS статистикасы <code>threshold</code>-тан көп сандық бағандардың <code>{баған: D (3 таңба)}</code> сөздігін қайтарсын, D бойынша кему ретімен. Категориялық (сан емес) бағандар өткізіледі.</p>",
   "starter": "import numpy as np\nimport pandas as pd\nref_df = pd.DataFrame({\n    'monthly_fee': [3500, 3900, 4200, 4500, 4800, 5200, 6000, 6500, 7000, 7500],\n    'tenure_months': [1, 3, 5, 8, 12, 15, 20, 24, 30, 36],\n    'support_calls': [0, 0, 1, 1, 1, 2, 2, 3, 4, 5],\n    'city': ['Алматы'] * 5 + ['Астана'] * 5,\n})\ncur_df = pd.DataFrame({\n    'monthly_fee': [5500, 6200, 6800, 7300, 7800, 8300, 8800, 9200, 9900, 10500],\n    'tenure_months': [2, 3, 6, 8, 11, 16, 19, 25, 29, 38],\n    'support_calls': [1, 1, 2, 2, 3, 3, 3, 4, 5, 6],\n    'city': ['Алматы'] * 2 + ['Астана'] * 8,\n})\n\ndef ks_stat(a, b):\n    return 0.0\n\ndef ks_flags(ref_df, cur_df, threshold=0.2):\n    return {}\n",
   "solution": "import numpy as np\nimport pandas as pd\nref_df = pd.DataFrame({\n    'monthly_fee': [3500, 3900, 4200, 4500, 4800, 5200, 6000, 6500, 7000, 7500],\n    'tenure_months': [1, 3, 5, 8, 12, 15, 20, 24, 30, 36],\n    'support_calls': [0, 0, 1, 1, 1, 2, 2, 3, 4, 5],\n    'city': ['Алматы'] * 5 + ['Астана'] * 5,\n})\ncur_df = pd.DataFrame({\n    'monthly_fee': [5500, 6200, 6800, 7300, 7800, 8300, 8800, 9200, 9900, 10500],\n    'tenure_months': [2, 3, 6, 8, 11, 16, 19, 25, 29, 38],\n    'support_calls': [1, 1, 2, 2, 3, 3, 3, 4, 5, 6],\n    'city': ['Алматы'] * 2 + ['Астана'] * 8,\n})\n\ndef ks_stat(a, b):\n    a = np.asarray(a, dtype=float)\n    b = np.asarray(b, dtype=float)\n    return float(max(abs((a <= v).mean() - (b <= v).mean()) for v in np.concatenate([a, b])))\n\ndef ks_flags(ref_df, cur_df, threshold=0.2):\n    found = {}\n    for col in ref_df.columns:\n        if not pd.api.types.is_numeric_dtype(ref_df[col]):\n            continue\n        d = ks_stat(ref_df[col], cur_df[col])\n        if d > threshold:\n            found[col] = round(d, 3)\n    return dict(sorted(found.items(), key=lambda kv: kv[1], reverse=True))\n\nprint(ks_flags(ref_df, cur_df))\n",
   "hints": [
    "Сандық баған ба: <code>pd.api.types.is_numeric_dtype(ref_df[col])</code>.",
    "Кему ретімен сөздік: <code>dict(sorted(found.items(), key=lambda kv: kv[1], reverse=True))</code>."
   ],
   "check": {
    "tests": "assert abs(ks_stat([1, 2, 3, 4], [5, 6, 7, 8]) - 1.0) < 1e-9 and abs(ks_stat([1, 2, 3], [1, 2, 3])) < 1e-9, 'ks_stat: қабаттаспаса 1, бірдей болса 0'\n_f = ks_flags(ref_df, cur_df)\nassert list(_f) == ['monthly_fee', 'support_calls'], f'Drift белгілері: monthly_fee, support_calls (D бойынша кему ретімен). Сізде {list(_f)}'\nassert _f['monthly_fee'] == 0.6 and _f['support_calls'] == 0.3, f'D мәндері: monthly_fee 0.6, support_calls 0.3. Сізде {_f}'\nassert 'city' not in _f and 'tenure_months' not in _f, 'city — категориялық, tenure_months өзгермеді'\nassert ks_flags(ref_df, cur_df, threshold=0.5) == {'monthly_fee': 0.6}, 'threshold ескерілсін'"
   }
  }
 ],
 "ops-8": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Мерзімі келді ме",
   "prompt": "<p>Scheduled retraining: <code>retrain_due(days_since_train, period=30)</code> функциясын жазыңыз: соңғы үйретуден бері <code>period</code> немесе одан көп күн өтсе <code>True</code>.</p>",
   "starter": "def retrain_due(days_since_train, period=30):\n    return days_since_train > period\n",
   "solution": "def retrain_due(days_since_train, period=30):\n    return days_since_train >= period\n\nprint(retrain_due(30), retrain_due(12))\n",
   "hints": [
    "Шекті ұмытпаңыз: дәл 30 күн де жеткілікті.",
    "<code>days_since_train &gt;= period</code>."
   ],
   "check": {
    "tests": "assert retrain_due(30) is True and retrain_due(45) is True, '30 және 45 күн → True'\nassert retrain_due(29) is False, '29 күн → False'\nassert retrain_due(7, period=7) is True and retrain_due(6, period=7) is False, 'period параметрі ескерілсін'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Drift түрі",
   "prompt": "<p><code>drift_type(px_changed, pyx_changed, py_changed)</code> функциясын жазыңыз: P(y|X) өзгерсе → <code>'concept'</code> (ең қауіптісі, бірінші тексеріледі); әйтпесе P(X) өзгерсе → <code>'data'</code>; әйтпесе P(y) өзгерсе → <code>'label'</code>; ештеңе өзгермесе → <code>'none'</code>.</p>",
   "starter": "def drift_type(px_changed, pyx_changed, py_changed):\n    return 'none'\n",
   "solution": "def drift_type(px_changed, pyx_changed, py_changed):\n    if pyx_changed:\n        return 'concept'\n    if px_changed:\n        return 'data'\n    if py_changed:\n        return 'label'\n    return 'none'\n\nprint(drift_type(True, False, False))\n",
   "hints": [
    "Шарттардың реті маңызды: алдымен <code>pyx_changed</code>.",
    "Әр шартта бірден <code>return</code>."
   ],
   "check": {
    "tests": "assert drift_type(True, False, False) == 'data', 'Тек P(X) өзгерді → data'\nassert drift_type(True, True, True) == 'concept' and drift_type(False, True, False) == 'concept', 'P(y|X) өзгерсе → concept'\nassert drift_type(False, False, True) == 'label', 'Тек P(y) → label'\nassert drift_type(False, False, False) == 'none', 'Ештеңе өзгермеді → none'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Label shift",
   "prompt": "<p>Churn үлесі 8%-тен 20%-ке өсті: бұл label shift. <code>label_shift(old_labels, new_labels, tol=0.05)</code> жазыңыз: екі кезеңдегі 1-лердің үлесін (орташасын) салыстырып, айырма (абсолют шамасы) <code>tol</code>-дан көп болса <code>True</code> қайтарсын.</p>",
   "starter": "def label_shift(old_labels, new_labels, tol=0.05):\n    return False\n",
   "solution": "def label_shift(old_labels, new_labels, tol=0.05):\n    old_rate = sum(old_labels) / len(old_labels)\n    new_rate = sum(new_labels) / len(new_labels)\n    return abs(new_rate - old_rate) > tol\n\nprint(label_shift([1] * 8 + [0] * 92, [1] * 20 + [0] * 80))\n",
   "hints": [
    "Үлес: <code>sum(labels) / len(labels)</code>.",
    "Шарт: <code>abs(new_rate - old_rate) &gt; tol</code>."
   ],
   "check": {
    "tests": "assert label_shift([1] * 8 + [0] * 92, [1] * 20 + [0] * 80) is True, '8% → 20%: label shift'\nassert label_shift([1] * 8 + [0] * 92, [1] * 10 + [0] * 90) is False, '8% → 10%: айырма 0.02 ≤ 0.05'\nassert label_shift([1, 0], [1, 1, 0, 0], tol=0.0) is False and label_shift([0, 0, 0, 1], [0, 1], tol=0.2) is True, 'tol параметрі ескерілсін'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Соңғы апталардағы AUC",
   "prompt": "<p>Label-дер келгенде апта сайын AUC есептейміз. Бір нашар апта шу болуы мүмкін, сондықтан соңғы бірнеше аптаның орташасын қараймыз. <code>performance_drop(weekly_auc, baseline, tol=0.03, last=3)</code> жазыңыз: соңғы <code>last</code> аптаның орташа AUC-ы <code>baseline - tol</code>-дан қатаң төмен болса <code>True</code>. Апталар <code>last</code>-тан аз болса <code>False</code>.</p>",
   "starter": "def performance_drop(weekly_auc, baseline, tol=0.03, last=3):\n    return weekly_auc[-1] < baseline - tol\n",
   "solution": "def performance_drop(weekly_auc, baseline, tol=0.03, last=3):\n    if len(weekly_auc) < last:\n        return False\n    recent = weekly_auc[-last:]\n    return sum(recent) / last < baseline - tol\n\nprint(performance_drop([0.84, 0.83, 0.79, 0.80, 0.78], 0.84))\n",
   "hints": [
    "Соңғы апталар: <code>weekly_auc[-last:]</code>.",
    "Орташа: <code>sum(recent) / last</code>."
   ],
   "check": {
    "tests": "assert performance_drop([0.84, 0.83, 0.79, 0.80, 0.78], 0.84) is True, 'Соңғы үш аптаның орташасы 0.79 < 0.81'\nassert performance_drop([0.84, 0.83, 0.84, 0.76, 0.83], 0.84) is False, 'Бір нашар апта (0.76) орташаны 0.81-ден төмен түсірмейді'\nassert performance_drop([0.70, 0.70], 0.84) is False, 'Апталар жеткіліксіз → False'\nassert performance_drop([0.80, 0.80], 0.84, last=2) is True, 'last параметрі ескерілсін'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жаңа label-дер саны",
   "prompt": "<p>«Дерек көлемі бойынша» trigger үшін соңғы үйретуден кейін келген label-дерді санаймыз. <code>labels</code> DataFrame-інде <code>label_date</code> (<code>'2024-03-15'</code> түріндегі мәтін) бар. <code>new_label_count(labels, last_train)</code> жазыңыз: <code>label_date</code> <code>last_train</code>-нен <b>кейін</b> (қатаң) болған жолдар санын қайтарсын (ISO күндерін мәтін ретінде салыстыруға болады). Сосын <code>volume_trigger</code> — бұл сан <code>MIN_LABELS</code>-тен кем емес пе.</p>",
   "starter": "import pandas as pd\nlabels = pd.DataFrame({\n    'customer_id': range(1, 11),\n    'label_date': ['2024-02-28', '2024-03-01', '2024-03-02', '2024-03-02', '2024-03-05',\n                   '2024-03-07', '2024-03-08', '2024-03-10', '2024-03-12', '2024-03-15'],\n})\nMIN_LABELS = 6\n\ndef new_label_count(labels, last_train):\n    return len(labels)\n\nvolume_trigger = None\n",
   "solution": "import pandas as pd\nlabels = pd.DataFrame({\n    'customer_id': range(1, 11),\n    'label_date': ['2024-02-28', '2024-03-01', '2024-03-02', '2024-03-02', '2024-03-05',\n                   '2024-03-07', '2024-03-08', '2024-03-10', '2024-03-12', '2024-03-15'],\n})\nMIN_LABELS = 6\n\ndef new_label_count(labels, last_train):\n    return int((labels['label_date'] > last_train).sum())\n\nvolume_trigger = new_label_count(labels, '2024-03-02') >= MIN_LABELS\nprint(new_label_count(labels, '2024-03-02'), volume_trigger)\n",
   "hints": [
    "<code>(labels['label_date'] &gt; last_train).sum()</code>.",
    "ISO форматындағы күндер мәтін ретінде де дұрыс салыстырылады."
   ],
   "check": {
    "tests": "assert new_label_count(labels, '2024-03-02') == 6, 'last_train = 2024-03-02: кейінгі label-дер 6 (сол күнгілер кірмейді)'\nassert new_label_count(labels, '2024-03-15') == 0 and new_label_count(labels, '2024-01-01') == 10, 'Шекаралық жағдайлар дұрыс емес'\nassert volume_trigger is True or volume_trigger == True, '6 ≥ MIN_LABELS: volume_trigger True'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Retraining кезеңдері",
   "prompt": "<p>Жаңа модель үйретілгеннен кейін қорғаныс кезеңдерінен өтеді. <code>guard(new_auc, prod_auc, data_ok, shadow_ok, min_gain=0.005)</code> жазыңыз: модель жеткен соңғы кезеңді қайтарсын: <code>data_ok</code> False → <code>'blocked'</code>; <code>new_auc &lt; prod_auc + min_gain</code> → <code>'rejected'</code>; shadow mode тексерісі өтпесе (<code>shadow_ok</code> False) → <code>'staging'</code> (staging-те қалады); бәрі өтсе → <code>'production'</code>.</p>",
   "starter": "def guard(new_auc, prod_auc, data_ok, shadow_ok, min_gain=0.005):\n    return 'production'\n",
   "solution": "def guard(new_auc, prod_auc, data_ok, shadow_ok, min_gain=0.005):\n    if not data_ok:\n        return 'blocked'\n    if new_auc < prod_auc + min_gain:\n        return 'rejected'\n    if not shadow_ok:\n        return 'staging'\n    return 'production'\n\nprint(guard(0.85, 0.83, True, True))\n",
   "hints": [
    "Тексерістер ретімен: деректер → метрика → shadow mode.",
    "Әр сәтсіз тексерісте бірден <code>return</code>."
   ],
   "check": {
    "tests": "assert guard(0.90, 0.83, False, True) == 'blocked', 'Деректер нашар → blocked'\nassert guard(0.832, 0.83, True, True) == 'rejected', '+0.002 өсім жеткіліксіз → rejected'\nassert guard(0.85, 0.83, True, False) == 'staging', 'Shadow mode өтпеді → staging'\nassert guard(0.85, 0.83, True, True) == 'production', 'Бәрі өтті → production'\nassert guard(0.85, 0.83, True, True, min_gain=0.05) == 'rejected', 'min_gain ескерілсін'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Кенет пе, біртіндеп пе",
   "prompt": "<p><code>classify_drift(weekly_auc, jump=0.05, total=0.03)</code> жазыңыз: апталық AUC тізімі бойынша concept drift түрін анықтасын: көрші екі апта арасындағы кез келген төмендеу <code>jump</code>-тан көп болса → <code>('sudden', апта индексі)</code> (бірінші осындай төмендеу болған аптаның индексі); әйтпесе бірінші және соңғы апта арасындағы жалпы төмендеу <code>total</code>-дан көп болса → <code>('gradual', None)</code>; әйтпесе <code>('none', None)</code>.</p>",
   "starter": "def classify_drift(weekly_auc, jump=0.05, total=0.03):\n    return 'none', None\n",
   "solution": "def classify_drift(weekly_auc, jump=0.05, total=0.03):\n    for i in range(1, len(weekly_auc)):\n        if weekly_auc[i - 1] - weekly_auc[i] > jump:\n            return 'sudden', i\n    if weekly_auc and weekly_auc[0] - weekly_auc[-1] > total:\n        return 'gradual', None\n    return 'none', None\n\nprint(classify_drift([0.84, 0.84, 0.83, 0.76, 0.75]), classify_drift([0.84, 0.83, 0.82, 0.81, 0.80]))\n",
   "hints": [
    "Көрші апталар: <code>for i in range(1, len(weekly_auc)):</code>, төмендеу <code>weekly_auc[i - 1] - weekly_auc[i]</code>.",
    "Кенет төмендеу табылмаса ғана жалпы айырманы тексеріңіз."
   ],
   "check": {
    "tests": "assert classify_drift([0.84, 0.84, 0.83, 0.76, 0.75]) == ('sudden', 3), 'Жаңа тариф: 3-аптада 0.07 құлдырау → sudden, 3'\nassert classify_drift([0.84, 0.83, 0.82, 0.81, 0.80]) == ('gradual', None), 'Апта сайын 0.01: жалпы 0.04 → gradual'\nassert classify_drift([0.84, 0.83, 0.84, 0.82]) == ('none', None), 'Жалпы 0.02 → none'\nassert classify_drift([0.9, 0.8, 0.7], jump=0.2) == ('gradual', None), 'jump параметрі ескерілсін'\nassert classify_drift([]) == ('none', None), 'Бос тізім → none'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Retraining симуляциясы",
   "prompt": "<p>Бір жыл бойы апта сайын бақылау жүргіземіз. <code>simulate(weeks)</code> жазыңыз: <code>weeks</code> — әр аптаның <code>{'max_psi', 'auc', 'labels'}</code> сөздігі. Күй: <code>days</code> (соңғы үйретуден бері күн, басында 0) және <code>new_labels</code> (басында 0). Әр аптада алдымен <code>days += 7</code>, <code>new_labels += labels</code>; сосын trigger тексеріледі: <code>days &gt;= 28</code>, <code>BASELINE - auc &gt; 0.03</code>, <code>max_psi &gt; 0.25</code> немесе <code>new_labels &gt;= 5000</code>. Кемінде біреуі орындалса, retraining жүреді: апта индексі (0-ден) нәтижеге қосылады, <code>days</code> пен <code>new_labels</code> нөлденеді. Retraining болған апталардың индекстерін қайтарыңыз.</p>",
   "starter": "BASELINE = 0.84\nweeks = [\n    {'max_psi': 0.05, 'auc': 0.84, 'labels': 1000},\n    {'max_psi': 0.08, 'auc': 0.83, 'labels': 1500},\n    {'max_psi': 0.31, 'auc': 0.83, 'labels': 900},\n    {'max_psi': 0.10, 'auc': 0.84, 'labels': 4500},\n    {'max_psi': 0.07, 'auc': 0.83, 'labels': 300},\n    {'max_psi': 0.06, 'auc': 0.80, 'labels': 200},\n    {'max_psi': 0.05, 'auc': 0.84, 'labels': 100},\n    {'max_psi': 0.04, 'auc': 0.84, 'labels': 100},\n    {'max_psi': 0.05, 'auc': 0.83, 'labels': 100},\n    {'max_psi': 0.06, 'auc': 0.84, 'labels': 100},\n]\n\ndef simulate(weeks):\n    return []\n",
   "solution": "BASELINE = 0.84\nweeks = [\n    {'max_psi': 0.05, 'auc': 0.84, 'labels': 1000},\n    {'max_psi': 0.08, 'auc': 0.83, 'labels': 1500},\n    {'max_psi': 0.31, 'auc': 0.83, 'labels': 900},\n    {'max_psi': 0.10, 'auc': 0.84, 'labels': 4500},\n    {'max_psi': 0.07, 'auc': 0.83, 'labels': 300},\n    {'max_psi': 0.06, 'auc': 0.80, 'labels': 200},\n    {'max_psi': 0.05, 'auc': 0.84, 'labels': 100},\n    {'max_psi': 0.04, 'auc': 0.84, 'labels': 100},\n    {'max_psi': 0.05, 'auc': 0.83, 'labels': 100},\n    {'max_psi': 0.06, 'auc': 0.84, 'labels': 100},\n]\n\ndef simulate(weeks):\n    days, new_labels = 0, 0\n    retrained = []\n    for i, w in enumerate(weeks):\n        days += 7\n        new_labels += w['labels']\n        if (days >= 28 or BASELINE - w['auc'] > 0.03\n                or w['max_psi'] > 0.25 or new_labels >= 5000):\n            retrained.append(i)\n            days, new_labels = 0, 0\n    return retrained\n\nprint(simulate(weeks))\n",
   "hints": [
    "Әр аптада: күйді жаңарту → trigger тексеру → керек болса retraining және күйді нөлдеу.",
    "Бірнеше шартты <code>or</code> арқылы біріктіріңіз; жолды жақшамен бірнеше жолға бөлуге болады."
   ],
   "check": {
    "tests": "assert simulate(weeks) == [2, 5, 9], f'Retraining апталары: 2 (drift), 5 (auc 0.80 және 5000 label), 9 (28 күн). Сізде {simulate(weeks)}'\nassert simulate([{'max_psi': 0.0, 'auc': 0.84, 'labels': 0}] * 8) == [3, 7], 'Тек мерзім бойынша: әр 4-апта (3, 7)'\nassert simulate([{'max_psi': 0.0, 'auc': 0.84, 'labels': 2500}] * 3) == [1], '5000 label екінші аптада жиналады'\nassert simulate([]) == [], 'Апта жоқ → []'"
   }
  }
 ]
});
DJ.addPractice('m6-5', {
 "deng-1": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бір бағанның көлемі",
   "prompt": "<p>Кесте 600 GB, 150 баған, бағандардың өлшемі бірдей. <code>col_gb(total_gb, n_cols)</code> функциясын жазыңыз: бір бағанның көлемін қайтарсын. Сосын <code>scan_gb</code> — column-store-да 6 бағанды оқу үшін сканерленетін көлем.</p>",
   "starter": "def col_gb(total_gb, n_cols):\n    return total_gb\n\nscan_gb = None\n",
   "solution": "def col_gb(total_gb, n_cols):\n    return total_gb / n_cols\n\nscan_gb = col_gb(600, 150) * 6\nprint(col_gb(600, 150), scan_gb)\n",
   "hints": [
    "Бір баған: <code>total_gb / n_cols</code>.",
    "Column-store тек керек бағандарды оқиды: <code>col_gb(600, 150) * 6</code>."
   ],
   "check": {
    "tests": "assert col_gb(600, 150) == 4 and col_gb(400, 200) == 2, 'col_gb(600, 150) = 4 GB'\nassert scan_gb is not None and abs(float(scan_gb) - 24) < 1e-9, '6 баған × 4 GB = 24 GB'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Сұрау түрі",
   "prompt": "<p><code>query_kind(sql)</code> функциясын жазыңыз: сұрауда (регистрге қарамай) <code>group by</code> немесе <code>sum(</code>, <code>count(</code>, <code>avg(</code> агрегаттарының бірі болса <code>'OLAP'</code>, әйтпесе <code>'OLTP'</code> қайтарсын.</p>",
   "starter": "def query_kind(sql):\n    return 'OLTP'\n",
   "solution": "def query_kind(sql):\n    s = sql.lower()\n    if any(k in s for k in ('group by', 'sum(', 'count(', 'avg(')):\n        return 'OLAP'\n    return 'OLTP'\n\nprint(query_kind('SELECT city, SUM(amount) FROM orders GROUP BY city'))\n",
   "hints": [
    "Алдымен <code>s = sql.lower()</code>.",
    "<code>any(k in s for k in ('group by', 'sum(', 'count(', 'avg('))</code>."
   ],
   "check": {
    "tests": "assert query_kind('SELECT city, SUM(amount) FROM orders GROUP BY city') == 'OLAP', 'GROUP BY бар → OLAP'\nassert query_kind('SELECT * FROM orders WHERE order_id = 101') == 'OLTP', 'Бір жолды оқу → OLTP'\nassert query_kind('select count(*) from events') == 'OLAP', 'count( → OLAP'\nassert query_kind(\"UPDATE orders SET status = 'paid' WHERE order_id = 7\") == 'OLTP', 'UPDATE → OLTP'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Сығу коэффициенті",
   "prompt": "<p>Column-store бір бағандағы ұқсас мәндерді жақсы сығады. <code>compression(raw_gb, stored_gb)</code> функциясын жазыңыз: сығу коэффициентін (<code>raw_gb / stored_gb</code>) 1 таңбаға дөңгелектеп қайтарсын. Сосын <code>saved_gb</code> — 500 GB дерек 8 есе сығылғанда үнемделетін көлем.</p>",
   "starter": "def compression(raw_gb, stored_gb):\n    return 1.0\n\nsaved_gb = None\n",
   "solution": "def compression(raw_gb, stored_gb):\n    return round(raw_gb / stored_gb, 1)\n\nsaved_gb = 500 - 500 / 8\nprint(compression(120, 15), saved_gb)\n",
   "hints": [
    "Коэффициент: <code>round(raw_gb / stored_gb, 1)</code>.",
    "8 есе сығылса 500 / 8 = 62.5 GB қалады."
   ],
   "check": {
    "tests": "assert compression(120, 15) == 8.0, 'compression(120, 15) = 8.0'\nassert compression(100, 30) == 3.3, 'Нәтижені 1 таңбаға дөңгелектеңіз'\nassert saved_gb is not None and abs(float(saved_gb) - 437.5) < 1e-9, 'saved_gb = 500 - 62.5 = 437.5'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Row немесе column оқу",
   "prompt": "<p><code>read_gb(total_gb, n_cols, needed, store)</code> функциясын жазыңыз: <code>store == 'row'</code> болса кестенің толық көлемі, <code>'column'</code> болса тек <code>needed</code> бағанның көлемі (бағандар бірдей өлшемде); басқа мән үшін <code>ValueError</code>. <code>needed</code> 0-ден кіші немесе <code>n_cols</code>-тан үлкен болса да <code>ValueError</code>.</p>",
   "starter": "def read_gb(total_gb, n_cols, needed, store):\n    return total_gb\n",
   "solution": "def read_gb(total_gb, n_cols, needed, store):\n    if not 0 <= needed <= n_cols:\n        raise ValueError('needed 0 мен n_cols аралығында болуы керек')\n    if store == 'row':\n        return total_gb\n    if store == 'column':\n        return total_gb / n_cols * needed\n    raise ValueError(f'Белгісіз store: {store}')\n\nprint(read_gb(400, 200, 4, 'row'), read_gb(400, 200, 4, 'column'))\n",
   "hints": [
    "Алдымен <code>needed</code>-ті тексеріңіз, сосын <code>store</code> бойынша тармақталыңыз.",
    "Column: <code>total_gb / n_cols * needed</code>."
   ],
   "check": {
    "tests": "assert read_gb(400, 200, 4, 'row') == 400, 'Row-store толық кестені оқиды'\nassert read_gb(400, 200, 4, 'column') == 8, 'Column-store 4 бағанды: 8 GB'\nfor _a in [(400, 200, 4, 'csv'), (400, 200, 201, 'column'), (400, 200, -1, 'row')]:\n    try:\n        read_gb(*_a)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f'read_gb{_a} ValueError лақтыруы керек')"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жолдарды бағандарға",
   "prompt": "<p>Row-store деректі жолдар бойынша, column-store бағандар бойынша сақтайды. <code>to_columns(rows)</code> жазыңыз: сөздіктер тізімін <code>{баған: мәндер тізімі}</code> түріне айналдырсын (бағандар бірінші жолдың кілттерінің ретімен). Бос тізім үшін <code>{}</code>.</p>",
   "starter": "rows = [\n    {'order_id': 101, 'city': 'Алматы', 'amount': 29800},\n    {'order_id': 102, 'city': 'Астана', 'amount': 117500},\n    {'order_id': 103, 'city': 'Алматы', 'amount': 13500},\n]\n\ndef to_columns(rows):\n    return rows\n",
   "solution": "rows = [\n    {'order_id': 101, 'city': 'Алматы', 'amount': 29800},\n    {'order_id': 102, 'city': 'Астана', 'amount': 117500},\n    {'order_id': 103, 'city': 'Алматы', 'amount': 13500},\n]\n\ndef to_columns(rows):\n    if not rows:\n        return {}\n    return {col: [r[col] for r in rows] for col in rows[0]}\n\nprint(to_columns(rows))\n",
   "hints": [
    "Бағандар: <code>rows[0]</code>-дің кілттері.",
    "<code>{col: [r[col] for r in rows] for col in rows[0]}</code>."
   ],
   "check": {
    "tests": "assert to_columns(rows) == {'order_id': [101, 102, 103], 'city': ['Алматы', 'Астана', 'Алматы'], 'amount': [29800, 117500, 13500]}, 'to_columns(rows) дұрыс емес'\nassert list(to_columns(rows)) == ['order_id', 'city', 'amount'], 'Бағандар реті сақталсын'\nassert to_columns([]) == {}, 'Бос тізім → {}'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бағандардан агрегат",
   "prompt": "<p>Column-store-да сұрау тек керек бағандарды оқиды. <code>columns</code> — <code>{баған: мәндер}</code> сөздігі. <code>revenue_by(columns, key, value)</code> жазыңыз: тек <code>columns[key]</code> мен <code>columns[value]</code> тізімдерін қолданып, <code>key</code> бойынша <code>value</code> қосындысын сөздік ретінде қайтарсын. Сосын <code>by_city = revenue_by(columns, 'city', 'amount')</code>.</p>",
   "starter": "columns = {\n    'order_id': [201, 202, 203, 204, 205, 206],\n    'city': ['Алматы', 'Астана', 'Алматы', 'Шымкент', 'Алматы', 'Астана'],\n    'amount': [29800, 117500, 13500, 18900, 14900, 84000],\n    'status': ['paid', 'paid', 'cancelled', 'paid', 'paid', 'pending'],\n}\n\ndef revenue_by(columns, key, value):\n    return {}\n\nby_city = None\n",
   "solution": "columns = {\n    'order_id': [201, 202, 203, 204, 205, 206],\n    'city': ['Алматы', 'Астана', 'Алматы', 'Шымкент', 'Алматы', 'Астана'],\n    'amount': [29800, 117500, 13500, 18900, 14900, 84000],\n    'status': ['paid', 'paid', 'cancelled', 'paid', 'paid', 'pending'],\n}\n\ndef revenue_by(columns, key, value):\n    result = {}\n    for k, v in zip(columns[key], columns[value]):\n        result[k] = result.get(k, 0) + v\n    return result\n\nby_city = revenue_by(columns, 'city', 'amount')\nprint(by_city)\n",
   "hints": [
    "Екі бағанды жұптап өтіңіз: <code>for k, v in zip(columns[key], columns[value]):</code>.",
    "<code>result[k] = result.get(k, 0) + v</code>."
   ],
   "check": {
    "tests": "assert by_city == {'Алматы': 58200, 'Астана': 201500, 'Шымкент': 18900}, f'by_city дұрыс емес: {by_city}'\nclass _Spy(dict):\n    def __init__(self, d):\n        super().__init__(d)\n        self.read = set()\n    def __getitem__(self, k):\n        self.read.add(k)\n        return dict.__getitem__(self, k)\n_s = _Spy(columns)\nassert revenue_by(_s, 'status', 'amount') == {'paid': 181100, 'cancelled': 13500, 'pending': 84000}, 'status бойынша да жұмыс істеуі керек'\nassert _s.read == {'status', 'amount'}, f'Тек екі бағанды оқыңыз (column-store сияқты), сіз оқыған бағандар: {sorted(_s.read)}'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Сканер көлемі",
   "prompt": "<p>Нақты кестеде бағандардың өлшемі әр түрлі. <code>scan_plan(col_sizes, query_cols)</code> жазыңыз: <code>col_sizes</code> — <code>{баған: GB}</code>. Сөздік қайтарсын: <code>row_gb</code> — барлық бағанның қосындысы; <code>col_gb</code> — тек сұрау бағандарының қосындысы; <code>speedup</code> — <code>row_gb / col_gb</code>, 1 таңбаға дөңгелектенген. Кестеде жоқ баған сұралса, сол бағандардың атаулары бар <code>KeyError</code> лақтырсын. Сосын <code>plan = scan_plan(SIZES, ['city', 'amount_tg', 'dt'])</code>.</p>",
   "starter": "SIZES = {'order_id': 8.0, 'dt': 2.0, 'city': 3.5, 'amount_tg': 8.0, 'comment': 120.0, 'user_agent': 60.0, 'raw_json': 300.0}\n\ndef scan_plan(col_sizes, query_cols):\n    total = sum(col_sizes.values())\n    return {'row_gb': total, 'col_gb': total, 'speedup': 1.0}\n\nplan = None\n",
   "solution": "SIZES = {'order_id': 8.0, 'dt': 2.0, 'city': 3.5, 'amount_tg': 8.0, 'comment': 120.0, 'user_agent': 60.0, 'raw_json': 300.0}\n\ndef scan_plan(col_sizes, query_cols):\n    missing = [c for c in query_cols if c not in col_sizes]\n    if missing:\n        raise KeyError(', '.join(missing))\n    row_gb = sum(col_sizes.values())\n    col_gb = sum(col_sizes[c] for c in query_cols)\n    return {'row_gb': row_gb, 'col_gb': col_gb, 'speedup': round(row_gb / col_gb, 1)}\n\nplan = scan_plan(SIZES, ['city', 'amount_tg', 'dt'])\nprint(plan)\n",
   "hints": [
    "Алдымен жоқ бағандарды жинаңыз; бар болса <code>raise KeyError(...)</code>.",
    "<code>col_gb = sum(col_sizes[c] for c in query_cols)</code>."
   ],
   "check": {
    "tests": "assert plan == {'row_gb': 501.5, 'col_gb': 13.5, 'speedup': 37.1}, f'plan дұрыс емес: {plan}'\nassert scan_plan(SIZES, ['raw_json'])['speedup'] == 1.7, 'Үлкен бағанды оқысаңыз, column-store көп көмектеспейді'\ntry:\n    scan_plan(SIZES, ['city', 'price', 'qty'])\nexcept KeyError as _e:\n    assert 'price' in str(_e) and 'qty' in str(_e), 'Хабарда барлық жоқ баған аталсын'\nelse:\n    raise AssertionError('Жоқ баған үшін KeyError')"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "OLTP-дан OLAP кестесіне",
   "prompt": "<p>OLTP-дағы тапсырыс жолдарынан (<code>deng_orders.csv</code>, <code>deng_products.csv</code>) OLAP үшін күнделікті агрегат кесте жасаңыз. <code>daily</code> DataFrame-і: бағандар <code>order_date</code>, <code>orders</code> (тапсырыс саны), <code>items</code> (<code>qty</code> қосындысы), <code>revenue</code> (<code>qty * price_tg</code> қосындысы); <code>order_date</code> бойынша сұрыпталған, индексі 0-ден. Сосын <code>best_day</code> — түсімі ең көп күн (мәтін).</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('deng_orders.csv')\nproducts = pd.read_csv('deng_products.csv')\ndaily = None\nbest_day = None\n",
   "solution": "import pandas as pd\norders = pd.read_csv('deng_orders.csv')\nproducts = pd.read_csv('deng_products.csv')\nm = orders.merge(products, on='product_id')\nm['revenue'] = m['qty'] * m['price_tg']\ndaily = (m.groupby('order_date', as_index=False)\n          .agg(orders=('order_id', 'count'), items=('qty', 'sum'), revenue=('revenue', 'sum'))\n          .sort_values('order_date')\n          .reset_index(drop=True))\nbest_day = daily.loc[daily['revenue'].idxmax(), 'order_date']\nprint(daily, best_day)\n",
   "hints": [
    "Бір <code>groupby</code>-та бірнеше агрегат: <code>.agg(orders=('order_id', 'count'), items=('qty', 'sum'), revenue=('revenue', 'sum'))</code>.",
    "Ең көп түсім: <code>daily.loc[daily['revenue'].idxmax(), 'order_date']</code>."
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('deng_orders.csv')\n_c = _pd.read_csv('deng_customers.csv')\n_p = _pd.read_csv('deng_products.csv')\n_m = _o.merge(_c, on='customer_id').merge(_p, on='product_id')\n_m['revenue'] = _m['qty'] * _m['price_tg']\n\nassert daily is not None and list(daily.columns) == ['order_date', 'orders', 'items', 'revenue'], f\"Бағандар: order_date, orders, items, revenue. Сізде {None if daily is None else list(daily.columns)}\"\nassert list(daily['order_date']) == sorted(_o['order_date'].unique()) and list(daily.index) == list(range(len(daily))), 'Күн бойынша сұрыпталсын, индексі 0-ден'\nassert [int(x) for x in daily['orders']] == [2] * 6 and int(daily['items'].sum()) == int(_o['qty'].sum()), 'orders — күнделікті тапсырыс саны, items — qty қосындысы'\nassert int(daily['revenue'].sum()) == 600400 and int(daily.loc[daily['order_date'] == '2024-03-04', 'revenue'].iloc[0]) == 153500, 'revenue дұрыс емес (2024-03-04 → 153 500 ₸)'\nassert best_day == '2024-03-04', f'Ең көп түсім 2024-03-04 күні, сізде {best_day}'",
    "mustInclude": [
     "groupby"
    ]
   }
  }
 ],
 "deng-2": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Partition жолын құру",
   "prompt": "<p><code>partition_path(bucket, table, dt, part=0)</code> функциясын жазыңыз: lake-тегі файл жолын қайтарсын: <code>s3://&lt;bucket&gt;/&lt;table&gt;/dt=&lt;dt&gt;/part-&lt;part&gt;.parquet</code>, мұндағы <code>part</code> үш таңбалы (<code>0</code> → <code>000</code>, <code>12</code> → <code>012</code>).</p>",
   "starter": "def partition_path(bucket, table, dt, part=0):\n    return f's3://{bucket}/{table}/{dt}.parquet'\n",
   "solution": "def partition_path(bucket, table, dt, part=0):\n    return f's3://{bucket}/{table}/dt={dt}/part-{part:03d}.parquet'\n\nprint(partition_path('dala', 'events', '2024-03-01'))\n",
   "hints": [
    "f-string ішінде үш таңбалы сан: <code>{part:03d}</code>.",
    "Үлгі: <code>f's3://{bucket}/{table}/dt={dt}/part-{part:03d}.parquet'</code>."
   ],
   "check": {
    "tests": "assert partition_path('dala', 'events', '2024-03-01') == 's3://dala/events/dt=2024-03-01/part-000.parquet', 'Әдепкі part=0 → part-000'\nassert partition_path('dala', 'orders', '2024-03-02', 12) == 's3://dala/orders/dt=2024-03-02/part-012.parquet', 'part=12 → part-012'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Файл форматы",
   "prompt": "<p>Lake-те кез келген формат сақталады. <code>file_format(path)</code> функциясын жазыңыз: файл жолының кеңейтімін кіші әріппен қайтарсын (<code>\"logs/app.JSON\"</code> → <code>\"json\"</code>). Нүкте жоқ болса <code>None</code>.</p>",
   "starter": "def file_format(path):\n    return path.split('.')[1]\n",
   "solution": "def file_format(path):\n    name = path.split('/')[-1]\n    if '.' not in name:\n        return None\n    return name.rsplit('.', 1)[1].lower()\n\nprint(file_format('s3://dala/events/dt=2024-03-01/part-000.parquet'))\n",
   "hints": [
    "Тек файлдың атын қараңыз: <code>path.split('/')[-1]</code> (папкада да нүкте болуы мүмкін).",
    "Соңғы нүкте бойынша: <code>name.rsplit('.', 1)[1].lower()</code>."
   ],
   "check": {
    "tests": "assert file_format('s3://dala/events/dt=2024-03-01/part-000.parquet') == 'parquet', '.parquet → parquet'\nassert file_format('logs/app.JSON') == 'json', 'Кіші әріппен'\nassert file_format('raw/v1.2/data.tar.gz') == 'gz', 'Соңғы кеңейтім алынады, папкадағы нүкте еленбейді'\nassert file_format('raw/README') is None, 'Нүкте жоқ → None'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Medallion қабаты",
   "prompt": "<p>Кестелер атауының префиксі бойынша қабатқа жатады: <code>bronze_</code>, <code>silver_</code>, <code>gold_</code>. <code>layer_of(table)</code> функциясын жазыңыз: қабат атауын (<code>'bronze'</code>, <code>'silver'</code>, <code>'gold'</code>) қайтарсын, префикс жоқ болса <code>None</code>. Сосын <code>bi_tables</code> — <code>TABLES</code>-тың ішінен BI қолдана алатын (gold) кестелердің тізімі.</p>",
   "starter": "TABLES = ['bronze_sales', 'silver_sales', 'gold_city_revenue', 'tmp_test', 'gold_daily_orders', 'silver_customers']\n\ndef layer_of(table):\n    return None\n\nbi_tables = []\n",
   "solution": "TABLES = ['bronze_sales', 'silver_sales', 'gold_city_revenue', 'tmp_test', 'gold_daily_orders', 'silver_customers']\n\ndef layer_of(table):\n    for layer in ('bronze', 'silver', 'gold'):\n        if table.startswith(layer + '_'):\n            return layer\n    return None\n\nbi_tables = [t for t in TABLES if layer_of(t) == 'gold']\nprint([layer_of(t) for t in TABLES], bi_tables)\n",
   "hints": [
    "<code>table.startswith(layer + '_')</code> үш қабат бойынша.",
    "BI тек gold қабатымен жұмыс істейді."
   ],
   "check": {
    "tests": "assert [layer_of(t) for t in TABLES] == ['bronze', 'silver', 'gold', None, 'gold', 'silver'], 'layer_of дұрыс емес'\nassert layer_of('golden_table') is None, 'Префикс \"gold_\" (астыңғы сызықпен)'\nassert bi_tables == ['gold_city_revenue', 'gold_daily_orders'], f'bi_tables: gold кестелері, сізде {bi_tables}'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Күн аралығындағы файлдар",
   "prompt": "<p>Сұрау тек керек партицияларды оқуы керек. <code>files_between(paths, start, end)</code> жазыңыз: <code>dt=</code> күні <code>start</code> пен <code>end</code> аралығында (екеуі де қоса) болатын жолдарды бастапқы ретпен қайтарсын. <code>dt=</code> жоқ жолдар өткізіледі. ISO күндерін мәтін ретінде салыстыруға болады.</p>",
   "starter": "paths = [\n    's3://dala/events/dt=2024-02-28/part-000.parquet',\n    's3://dala/events/dt=2024-03-01/part-000.parquet',\n    's3://dala/events/dt=2024-03-01/part-001.parquet',\n    's3://dala/events/dt=2024-03-02/part-000.parquet',\n    's3://dala/events/latest/part-000.parquet',\n    's3://dala/events/dt=2024-03-05/part-000.parquet',\n]\n\ndef files_between(paths, start, end):\n    return paths\n",
   "solution": "paths = [\n    's3://dala/events/dt=2024-02-28/part-000.parquet',\n    's3://dala/events/dt=2024-03-01/part-000.parquet',\n    's3://dala/events/dt=2024-03-01/part-001.parquet',\n    's3://dala/events/dt=2024-03-02/part-000.parquet',\n    's3://dala/events/latest/part-000.parquet',\n    's3://dala/events/dt=2024-03-05/part-000.parquet',\n]\n\ndef partition_date(path):\n    for part in path.split('/'):\n        if part.startswith('dt='):\n            return part[3:]\n    return None\n\ndef files_between(paths, start, end):\n    result = []\n    for p in paths:\n        dt = partition_date(p)\n        if dt is not None and start <= dt <= end:\n            result.append(p)\n    return result\n\nprint(files_between(paths, '2024-03-01', '2024-03-02'))\n",
   "hints": [
    "Алдымен <code>partition_date(path)</code> көмекші функциясын жазыңыз (сабақтағыдай).",
    "Шарт: <code>dt is not None and start &lt;= dt &lt;= end</code>."
   ],
   "check": {
    "tests": "assert files_between(paths, '2024-03-01', '2024-03-02') == paths[1:4], 'Наурыздың 1–2 күндерінің 3 файлы'\nassert files_between(paths, '2024-03-03', '2024-03-31') == [paths[5]], 'Тек 2024-03-05'\nassert files_between(paths, '2025-01-01', '2025-12-31') == [], 'Сәйкес партиция жоқ → []'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Hive стиліндегі партициялар",
   "prompt": "<p>Lake-те бірнеше деңгейлі бөлу жиі кездеседі: <code>s3://dala/sales/city=Алматы/dt=2024-03-01/part-000.parquet</code>. <code>parse_partitions(path)</code> жазыңыз: жолдағы <code>кілт=мән</code> түріндегі барлық бөліктерді (файл атауын қоспағанда) сөздік ретінде қайтарсын. <code>s3://</code> префиксі еленбейді.</p>",
   "starter": "def parse_partitions(path):\n    return {}\n",
   "solution": "def parse_partitions(path):\n    if path.startswith('s3://'):\n        path = path[len('s3://'):]\n    parts = path.split('/')[:-1]\n    result = {}\n    for part in parts:\n        if '=' in part:\n            key, _, value = part.partition('=')\n            result[key] = value\n    return result\n\nprint(parse_partitions('s3://dala/sales/city=Алматы/dt=2024-03-01/part-000.parquet'))\n",
   "hints": [
    "Соңғы бөлік — файл атауы: <code>path.split('/')[:-1]</code>.",
    "Әр бөлікте <code>=</code> болса: <code>key, _, value = part.partition('=')</code>."
   ],
   "check": {
    "tests": "assert parse_partitions('s3://dala/sales/city=Алматы/dt=2024-03-01/part-000.parquet') == {'city': 'Алматы', 'dt': '2024-03-01'}, 'Екі партиция: city және dt'\nassert parse_partitions('s3://dala/events/latest/part-000.parquet') == {}, 'Партиция жоқ → {}'\nassert parse_partitions('s3://dala/x/dt=2024-01-01/a=b.parquet') == {'dt': '2024-01-01'}, 'Файл атауындағы = есептелмейді'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Data swamp тексеру",
   "prompt": "<p>Lake «батпаққа» айналмауы үшін атау конвенциясы тексеріледі. <code>bad_paths(paths)</code> жазыңыз: конвенцияны бұзатын жолдарды бастапқы ретпен қайтарсын. Ереже: жол <code>s3://dala/</code>-дан басталады, ішінде <code>dt=YYYY-MM-DD</code> бөлігі бар (күн 10 таңба, 4-ші және 7-ші орындарда <code>-</code>, қалғаны цифр) және файл <code>.parquet</code>-пен аяқталады.</p>",
   "starter": "paths = [\n    's3://dala/events/dt=2024-03-01/part-000.parquet',\n    's3://dala/events/dt=2024-3-2/part-000.parquet',\n    's3://dala/events/dt=2024-03-02/export_final_v2.csv',\n    's3://tmp-bucket/events/dt=2024-03-02/part-000.parquet',\n    's3://dala/orders/dt=2024-03-02/part-001.parquet',\n    's3://dala/events/latest/part-000.parquet',\n]\n\ndef bad_paths(paths):\n    return []\n",
   "solution": "paths = [\n    's3://dala/events/dt=2024-03-01/part-000.parquet',\n    's3://dala/events/dt=2024-3-2/part-000.parquet',\n    's3://dala/events/dt=2024-03-02/export_final_v2.csv',\n    's3://tmp-bucket/events/dt=2024-03-02/part-000.parquet',\n    's3://dala/orders/dt=2024-03-02/part-001.parquet',\n    's3://dala/events/latest/part-000.parquet',\n]\n\ndef valid_date(s):\n    return (len(s) == 10 and s[4] == '-' and s[7] == '-'\n            and (s[:4] + s[5:7] + s[8:]).isdigit())\n\ndef is_ok(path):\n    if not path.startswith('s3://dala/') or not path.endswith('.parquet'):\n        return False\n    dts = [p[3:] for p in path.split('/') if p.startswith('dt=')]\n    return len(dts) == 1 and valid_date(dts[0])\n\ndef bad_paths(paths):\n    return [p for p in paths if not is_ok(p)]\n\nprint(bad_paths(paths))\n",
   "hints": [
    "Күнді тексеретін бөлек функция жазыңыз: ұзындығы 10, <code>s[4] == '-' and s[7] == '-'</code>, қалғаны <code>isdigit()</code>.",
    "Жолдың басы мен соңы: <code>startswith('s3://dala/')</code>, <code>endswith('.parquet')</code>."
   ],
   "check": {
    "tests": "assert bad_paths(paths) == [paths[1], paths[2], paths[3], paths[5]], f'Бұзатын жолдар: 1, 2, 3, 5 индекстері. Сізде {bad_paths(paths)}'\nassert bad_paths([paths[0], paths[4]]) == [], 'Дұрыс жолдар → []'\nassert bad_paths(['s3://dala/e/dt=2024-03-0x/p.parquet']) == ['s3://dala/e/dt=2024-03-0x/p.parquet'], 'Күнде цифр емес таңба'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Bronze, silver, gold",
   "prompt": "<p><code>deng_raw_sales.csv</code> — bronze қабаты (шикі, өзгертілмейді). Екі функция жазыңыз. <code>to_silver(bronze)</code>: <b>көшірмеде</b> <code>city</code>-ді тазалайды (<code>strip().capitalize()</code>), <code>order_date</code>-ті <code>pd.to_datetime</code> арқылы күнге айналдырады, <code>amount_tg</code>-ны <code>int</code> етеді; барлық жол мен статус сақталады. <code>to_gold(silver)</code>: қала бойынша <code>paid_tg</code> (төленген сома), <code>orders</code> (барлық тапсырыс саны), <code>paid_share</code> (төленген тапсырыстар үлесі, 2 таңба) бағандары бар кесте, <code>city</code> бойынша сұрыпталған, индексі 0-ден, <code>city</code> — баған.</p>",
   "starter": "import pandas as pd\nbronze = pd.read_csv('deng_raw_sales.csv')\n\ndef to_silver(bronze):\n    return bronze\n\ndef to_gold(silver):\n    return silver\n",
   "solution": "import pandas as pd\nbronze = pd.read_csv('deng_raw_sales.csv')\n\ndef to_silver(bronze):\n    df = bronze.copy()\n    df['city'] = df['city'].str.strip().str.capitalize()\n    df['order_date'] = pd.to_datetime(df['order_date'])\n    df['amount_tg'] = df['amount_tg'].astype(int)\n    return df\n\ndef to_gold(silver):\n    df = silver.copy()\n    df['is_paid'] = df['status'] == 'paid'\n    df['paid_amount'] = df['amount_tg'].where(df['is_paid'], 0)\n    gold = df.groupby('city', as_index=False).agg(\n        paid_tg=('paid_amount', 'sum'), orders=('order_id', 'count'), paid_share=('is_paid', 'mean'))\n    gold['paid_share'] = gold['paid_share'].round(2)\n    return gold.sort_values('city').reset_index(drop=True)\n\nsilver = to_silver(bronze)\ngold = to_gold(silver)\nprint(gold)\n",
   "hints": [
    "Silver: алдымен <code>df = bronze.copy()</code> — bronze ешқашан өзгермейді.",
    "Gold: төленген сома үшін <code>amount_tg.where(status == 'paid', 0)</code>, үлес үшін True/False бағанының <code>mean</code>-ы."
   ],
   "check": {
    "tests": "import pandas as _pd\n_b = _pd.read_csv('deng_raw_sales.csv')\n_s = to_silver(_b)\nassert list(_b['city']) == list(_pd.read_csv('deng_raw_sales.csv')['city']), 'Bronze өзгермеуі керек: көшірмемен жұмыс істеңіз'\nassert len(_s) == 10 and sorted(_s['city'].unique()) == ['Алматы', 'Астана', 'Шымкент'], 'Silver-де барлық 10 жол, қалалар тазаланған'\nassert _pd.api.types.is_datetime64_any_dtype(_s['order_date']), 'order_date күн типіне айналуы керек (pd.to_datetime)'\nassert set(_s['status']) == {'paid', 'cancelled', 'pending'}, 'Silver-де барлық статус сақталады'\n_g = to_gold(_s)\nassert list(_g.columns) == ['city', 'paid_tg', 'orders', 'paid_share'], f'Gold бағандары: city, paid_tg, orders, paid_share. Сізде {list(_g.columns)}'\nassert list(_g['city']) == ['Алматы', 'Астана', 'Шымкент'] and list(_g.index) == [0, 1, 2], 'city бойынша сұрыпталған, индексі 0-ден'\nassert [int(x) for x in _g['paid_tg']] == [264200, 117500, 23400] and [int(x) for x in _g['orders']] == [5, 3, 2], 'paid_tg: 264200, 117500, 23400; orders: 5, 3, 2'\nassert [float(x) for x in _g['paid_share']] == [0.8, 0.33, 1.0], f'paid_share: 0.8, 0.33, 1.0. Сізде {list(_g[\"paid_share\"])}'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Партициялар каталогы",
   "prompt": "<p>Каталог — lake-те не бар екенін көрсететін кесте. <code>catalog(paths)</code> жазыңыз: <code>s3://bucket/кесте/dt=.../файл</code> түріндегі жолдардан (кесте — bucket-тен кейінгі бөлік) сөздік қайтарсын: <code>{кесте: {'partitions': сұрыпталған dt тізімі (қайталанбайтын), 'files': файлдар саны, 'missing': first..last аралығындағы жоқ күндер}}</code>. <code>dt=</code> жоқ жолдар еленбейді. Жоқ күндерді <code>pd.date_range</code> арқылы табыңыз (<code>.strftime('%Y-%m-%d')</code>).</p>",
   "starter": "import pandas as pd\npaths = [\n    's3://dala/events/dt=2024-03-01/part-000.parquet',\n    's3://dala/events/dt=2024-03-01/part-001.parquet',\n    's3://dala/events/dt=2024-03-02/part-000.parquet',\n    's3://dala/events/dt=2024-03-05/part-000.parquet',\n    's3://dala/orders/dt=2024-03-02/part-000.parquet',\n    's3://dala/orders/dt=2024-03-03/part-000.parquet',\n    's3://dala/events/latest/part-000.parquet',\n]\n\ndef catalog(paths):\n    return {}\n",
   "solution": "import pandas as pd\npaths = [\n    's3://dala/events/dt=2024-03-01/part-000.parquet',\n    's3://dala/events/dt=2024-03-01/part-001.parquet',\n    's3://dala/events/dt=2024-03-02/part-000.parquet',\n    's3://dala/events/dt=2024-03-05/part-000.parquet',\n    's3://dala/orders/dt=2024-03-02/part-000.parquet',\n    's3://dala/orders/dt=2024-03-03/part-000.parquet',\n    's3://dala/events/latest/part-000.parquet',\n]\n\ndef catalog(paths):\n    tables = {}\n    for p in paths:\n        parts = p[len('s3://'):].split('/')\n        dts = [x[3:] for x in parts if x.startswith('dt=')]\n        if not dts:\n            continue\n        t = tables.setdefault(parts[1], {'dts': set(), 'files': 0})\n        t['dts'].add(dts[0])\n        t['files'] += 1\n    result = {}\n    for name, t in tables.items():\n        parts = sorted(t['dts'])\n        days = pd.date_range(parts[0], parts[-1]).strftime('%Y-%m-%d')\n        result[name] = {'partitions': parts, 'files': t['files'], 'missing': [d for d in days if d not in t['dts']]}\n    return result\n\nprint(catalog(paths))\n",
   "hints": [
    "Кесте атауы: <code>p[len('s3://'):].split('/')[1]</code>; күндерді жиынға жинаңыз.",
    "Толық аралық: <code>pd.date_range(first, last).strftime('%Y-%m-%d')</code>, сосын жоқ күндерді сүзіңіз."
   ],
   "check": {
    "tests": "_c = catalog(paths)\nassert set(_c) == {'events', 'orders'}, f'Екі кесте: events, orders. Сізде {sorted(_c)}'\nassert _c['events'] == {'partitions': ['2024-03-01', '2024-03-02', '2024-03-05'], 'files': 4, 'missing': ['2024-03-03', '2024-03-04']}, f'events каталогы дұрыс емес: {_c[\"events\"]}'\nassert _c['orders'] == {'partitions': ['2024-03-02', '2024-03-03'], 'files': 2, 'missing': []}, f'orders каталогы дұрыс емес: {_c[\"orders\"]}'\nassert catalog([]) == {}, 'Жол жоқ → {}'"
   }
  }
 ],
 "deng-3": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Fact кестесінің өлшемі",
   "prompt": "<p><code>deng_orders.csv</code> — fact кестесі. Оны оқып, <code>n_orders</code> — жолдар санын, <code>total_qty</code> — <code>qty</code> қосындысын, <code>n_customers</code> — fact-та кездесетін әр түрлі клиенттер санын (<code>nunique</code>) жазыңыз.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('deng_orders.csv')\nn_orders = None\ntotal_qty = None\nn_customers = None\n",
   "solution": "import pandas as pd\norders = pd.read_csv('deng_orders.csv')\nn_orders = len(orders)\ntotal_qty = int(orders['qty'].sum())\nn_customers = orders['customer_id'].nunique()\nprint(n_orders, total_qty, n_customers)\n",
   "hints": [
    "<code>len(orders)</code>, <code>orders['qty'].sum()</code>.",
    "Әр түрлі мәндер саны: <code>orders['customer_id'].nunique()</code>."
   ],
   "check": {
    "tests": "assert n_orders == 12, 'Fact кестесінде 12 жол'\nassert total_qty is not None and int(total_qty) == 35, 'qty қосындысы 35'\nassert n_customers is not None and int(n_customers) == 6, '6 әр түрлі клиент'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қалалар dimension-ы",
   "prompt": "<p><code>deng_customers.csv</code> — клиенттер dimension-ы. <code>by_city</code> айнымалысына әр қаладағы клиенттер санын (Series, кему ретімен, <code>value_counts</code>) жазыңыз, ал <code>b2b_cities</code>-ке b2b сегментті клиенттері бар қалалардың сұрыпталған тізімін.</p>",
   "starter": "import pandas as pd\ncustomers = pd.read_csv('deng_customers.csv')\nby_city = None\nb2b_cities = []\n",
   "solution": "import pandas as pd\ncustomers = pd.read_csv('deng_customers.csv')\nby_city = customers['city'].value_counts()\nb2b_cities = sorted(customers.loc[customers['segment'] == 'b2b', 'city'].unique())\nprint(by_city, b2b_cities)\n",
   "hints": [
    "<code>customers['city'].value_counts()</code> кему ретімен санайды.",
    "Сүзгі: <code>customers.loc[customers['segment'] == 'b2b', 'city']</code>."
   ],
   "check": {
    "tests": "assert by_city is not None and [int(x) for x in by_city.values] == [3, 2, 1] and by_city.index[0] == 'Алматы', 'Алматы 3, Астана 2, Шымкент 1'\nassert list(b2b_cities) == ['Алматы', 'Астана'], f'b2b клиенттері Алматы мен Астанада, сізде {b2b_cities}'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Санат бойынша тауарлар",
   "prompt": "<p><code>deng_products.csv</code> — тауарлар dimension-ы. <code>avg_price</code> айнымалысына әр санаттың орташа бағасын (Series, <code>groupby</code>), <code>most_expensive</code>-ке ең қымбат тауардың атауын жазыңыз.</p>",
   "starter": "import pandas as pd\nproducts = pd.read_csv('deng_products.csv')\navg_price = None\nmost_expensive = None\n",
   "solution": "import pandas as pd\nproducts = pd.read_csv('deng_products.csv')\navg_price = products.groupby('category')['price_tg'].mean()\nmost_expensive = products.loc[products['price_tg'].idxmax(), 'product_name']\nprint(avg_price, most_expensive)\n",
   "hints": [
    "<code>products.groupby('category')['price_tg'].mean()</code>.",
    "Ең үлкен мәннің жолы: <code>products['price_tg'].idxmax()</code>."
   ],
   "check": {
    "tests": "assert avg_price is not None and float(avg_price['home']) == 30450 and float(avg_price['electronics']) == 19200, 'home орташасы 30 450 ₸, electronics 19 200 ₸'\nassert most_expensive == 'Кілем', f'Ең қымбат тауар — Кілем (42 000 ₸), сізде {most_expensive}'",
    "mustInclude": [
     "groupby"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Тауар бойынша түсім",
   "prompt": "<p>Fact-ты тауарлар dimension-ымен қосып (<code>merge</code>), <code>revenue = qty * price_tg</code> есептеңіз. <code>by_product</code> — тауар атауы бойынша түсім (Series, кему ретімен), <code>top_product</code> — ең көп түсім әкелген тауар.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('deng_orders.csv')\ncustomers = pd.read_csv('deng_customers.csv')\nproducts = pd.read_csv('deng_products.csv')\nby_product = None\ntop_product = None\n",
   "solution": "import pandas as pd\norders = pd.read_csv('deng_orders.csv')\ncustomers = pd.read_csv('deng_customers.csv')\nproducts = pd.read_csv('deng_products.csv')\nm = orders.merge(products, on='product_id')\nm['revenue'] = m['qty'] * m['price_tg']\nby_product = m.groupby('product_name')['revenue'].sum().sort_values(ascending=False)\ntop_product = by_product.index[0]\nprint(by_product, top_product)\n",
   "hints": [
    "<code>orders.merge(products, on='product_id')</code>.",
    "<code>groupby('product_name')['revenue'].sum().sort_values(ascending=False)</code>."
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('deng_orders.csv')\n_c = _pd.read_csv('deng_customers.csv')\n_p = _pd.read_csv('deng_products.csv')\n_m = _o.merge(_c, on='customer_id').merge(_p, on='product_id')\n_m['revenue'] = _m['qty'] * _m['price_tg']\n\n_ref = _m.groupby('product_name')['revenue'].sum().sort_values(ascending=False)\nassert by_product is not None and list(by_product.index) == list(_ref.index), 'by_product кему ретімен сұрыпталсын'\nassert [int(x) for x in by_product.values] == [int(x) for x in _ref.values], 'Түсімдер дұрыс емес'\nassert top_product == 'Құлаққап', f'Ең көп түсім — Құлаққап (193 700 ₸), сізде {top_product}'",
    "mustInclude": [
     "merge",
     "groupby"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Сегмент бойынша тауар саны",
   "prompt": "<p>Fact-ты клиенттер dimension-ымен қосыңыз. <code>qty_by_segment</code> — сегмент бойынша сатылған тауар саны (<code>qty</code> қосындысы, Series), <code>b2b_share</code> — b2b сегментінің жалпы қосындыдағы үлесі (0–1, 2 таңба).</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('deng_orders.csv')\ncustomers = pd.read_csv('deng_customers.csv')\nproducts = pd.read_csv('deng_products.csv')\nqty_by_segment = None\nb2b_share = None\n",
   "solution": "import pandas as pd\norders = pd.read_csv('deng_orders.csv')\ncustomers = pd.read_csv('deng_customers.csv')\nproducts = pd.read_csv('deng_products.csv')\nm = orders.merge(customers, on='customer_id')\nqty_by_segment = m.groupby('segment')['qty'].sum()\nb2b_share = round(float(qty_by_segment['b2b'] / qty_by_segment.sum()), 2)\nprint(qty_by_segment, b2b_share)\n",
   "hints": [
    "<code>orders.merge(customers, on='customer_id')</code>.",
    "Үлес: <code>qty_by_segment['b2b'] / qty_by_segment.sum()</code>."
   ],
   "check": {
    "tests": "assert qty_by_segment is not None and int(qty_by_segment['b2b']) == 20 and int(qty_by_segment['retail']) == 15, 'b2b 20 дана, retail 15 дана'\nassert b2b_share is not None and abs(float(b2b_share) - 0.57) < 1e-9, f'b2b үлесі 20 / 35 ≈ 0.57, сізде {b2b_share}'",
    "mustInclude": [
     "merge",
     "groupby"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Күн бойынша түсім",
   "prompt": "<p>Үш кестені қосып, күн бойынша түсім кестесін жасаңыз: <code>daily</code> — <code>order_date</code> бойынша <code>revenue</code> қосындысы (Series, күн бойынша сұрыпталған), <code>electronics_daily</code> — тек <code>electronics</code> санатының күндік түсімі (Series). Electronics сатылмаған күн нәтижеде болмайды.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('deng_orders.csv')\ncustomers = pd.read_csv('deng_customers.csv')\nproducts = pd.read_csv('deng_products.csv')\ndaily = None\nelectronics_daily = None\n",
   "solution": "import pandas as pd\norders = pd.read_csv('deng_orders.csv')\ncustomers = pd.read_csv('deng_customers.csv')\nproducts = pd.read_csv('deng_products.csv')\nm = orders.merge(customers, on='customer_id').merge(products, on='product_id')\nm['revenue'] = m['qty'] * m['price_tg']\ndaily = m.groupby('order_date')['revenue'].sum().sort_index()\nelectronics_daily = m[m['category'] == 'electronics'].groupby('order_date')['revenue'].sum()\nprint(daily, electronics_daily)\n",
   "hints": [
    "Үш кесте: <code>orders.merge(customers, on='customer_id').merge(products, on='product_id')</code>.",
    "Алдымен сүзгі <code>m[m['category'] == 'electronics']</code>, сосын <code>groupby</code>."
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('deng_orders.csv')\n_c = _pd.read_csv('deng_customers.csv')\n_p = _pd.read_csv('deng_products.csv')\n_m = _o.merge(_c, on='customer_id').merge(_p, on='product_id')\n_m['revenue'] = _m['qty'] * _m['price_tg']\n\nassert daily is not None and [int(x) for x in daily.values] == [147300, 32400, 98900, 153500, 108300, 60000], 'daily күн бойынша сұрыпталған түсім болуы керек'\n_e = _m[_m['category'] == 'electronics'].groupby('order_date')['revenue'].sum()\nassert electronics_daily is not None and electronics_daily.to_dict() == _e.to_dict(), 'electronics_daily — тек electronics санатының күндік түсімі'\nassert '2024-03-06' not in electronics_daily.index, '2024-03-06 күні electronics сатылмаған'",
    "mustInclude": [
     "merge",
     "groupby"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ең ірі клиенттер",
   "prompt": "<p>Үш кестені қосып, <code>top</code> DataFrame-ін жасаңыз: түсімі бойынша алғашқы 3 клиент, бағандар <code>customer_name</code>, <code>city</code>, <code>segment</code>, <code>revenue</code>, <code>orders</code> (тапсырыс саны); <code>revenue</code> бойынша кему ретімен, индексі 0-ден. Сосын <code>top_share</code> — осы үш клиенттің жалпы түсімдегі үлесі (0–1, 3 таңба).</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('deng_orders.csv')\ncustomers = pd.read_csv('deng_customers.csv')\nproducts = pd.read_csv('deng_products.csv')\ntop = None\ntop_share = None\n",
   "solution": "import pandas as pd\norders = pd.read_csv('deng_orders.csv')\ncustomers = pd.read_csv('deng_customers.csv')\nproducts = pd.read_csv('deng_products.csv')\nm = orders.merge(customers, on='customer_id').merge(products, on='product_id')\nm['revenue'] = m['qty'] * m['price_tg']\nby_cust = (m.groupby(['customer_name', 'city', 'segment'], as_index=False)\n             .agg(revenue=('revenue', 'sum'), orders=('order_id', 'count')))\ntop = by_cust.sort_values('revenue', ascending=False).head(3).reset_index(drop=True)\ntop_share = round(float(top['revenue'].sum() / m['revenue'].sum()), 3)\nprint(top, top_share)\n",
   "hints": [
    "Клиенттің атрибуттарын да топтау кілтіне қосыңыз: <code>groupby(['customer_name', 'city', 'segment'], as_index=False)</code>.",
    "<code>.sort_values('revenue', ascending=False).head(3).reset_index(drop=True)</code>."
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('deng_orders.csv')\n_c = _pd.read_csv('deng_customers.csv')\n_p = _pd.read_csv('deng_products.csv')\n_m = _o.merge(_c, on='customer_id').merge(_p, on='product_id')\n_m['revenue'] = _m['qty'] * _m['price_tg']\n\n_r = _m.groupby(['customer_name', 'city', 'segment'], as_index=False).agg(revenue=('revenue', 'sum'), orders=('order_id', 'count')).sort_values('revenue', ascending=False).head(3).reset_index(drop=True)\nassert top is not None and list(top.columns) == ['customer_name', 'city', 'segment', 'revenue', 'orders'], f\"Бағандар: customer_name, city, segment, revenue, orders. Сізде {None if top is None else list(top.columns)}\"\nassert list(top['customer_name']) == list(_r['customer_name']) and list(top.index) == [0, 1, 2], 'Түсімі бойынша алғашқы үш клиент, индексі 0-ден'\nassert [int(x) for x in top['revenue']] == [266500, 154500, 66700] and [int(x) for x in top['orders']] == [2, 2, 3], 'revenue және orders дұрыс емес'\nassert top_share is not None and abs(float(top_share) - 0.812) < 1e-9, f'Үш клиенттің үлесі 487 700 / 600 400 ≈ 0.812, сізде {top_share}'",
    "mustInclude": [
     "merge",
     "groupby"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Қала × санат",
   "prompt": "<p>Үш кестені қосып, <code>pivot</code> жасаңыз: жолдар — <code>city</code>, бағандар — <code>category</code>, мәндер — <code>revenue</code> қосындысы (<code>pivot_table</code>, бос ұяшық 0). Сосын <code>top_category</code> — әр қалада ең көп түсім әкелген санат (<code>{қала: санат}</code> сөздігі), <code>astana_home_share</code> — Астана түсіміндегі <code>home</code> санатының үлесі (0–1, 2 таңба).</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('deng_orders.csv')\ncustomers = pd.read_csv('deng_customers.csv')\nproducts = pd.read_csv('deng_products.csv')\npivot = None\ntop_category = {}\nastana_home_share = None\n",
   "solution": "import pandas as pd\norders = pd.read_csv('deng_orders.csv')\ncustomers = pd.read_csv('deng_customers.csv')\nproducts = pd.read_csv('deng_products.csv')\nm = orders.merge(customers, on='customer_id').merge(products, on='product_id')\nm['revenue'] = m['qty'] * m['price_tg']\npivot = m.pivot_table(index='city', columns='category', values='revenue', aggfunc='sum', fill_value=0)\ntop_category = {city: row.idxmax() for city, row in pivot.iterrows()}\nastana_home_share = round(float(pivot.loc['Астана', 'home'] / pivot.loc['Астана'].sum()), 2)\nprint(pivot, top_category, astana_home_share)\n",
   "hints": [
    "<code>m.pivot_table(index='city', columns='category', values='revenue', aggfunc='sum', fill_value=0)</code>.",
    "Әр жолдың ең үлкен бағаны: <code>row.idxmax()</code> (<code>pivot.iterrows()</code> ішінде) немесе <code>pivot.idxmax(axis=1)</code>."
   ],
   "check": {
    "tests": "assert pivot is not None and list(pivot.index) == ['Алматы', 'Астана', 'Шымкент'] and list(pivot.columns) == ['books', 'electronics', 'home'], 'index — city, columns — category'\nassert int(pivot.loc['Алматы', 'electronics']) == 296300 and int(pivot.loc['Шымкент', 'books']) == 0, 'Алматы/electronics = 296 300, бос ұяшық 0'\nassert top_category == {'Алматы': 'electronics', 'Астана': 'home', 'Шымкент': 'home'}, f'top_category дұрыс емес: {top_category}'\nassert astana_home_share is not None and abs(float(astana_home_share) - 0.59) < 1e-9, f'Астанада home үлесі 121 800 / 205 800 ≈ 0.59, сізде {astana_home_share}'",
    "mustInclude": [
     "pivot_table"
    ]
   }
  }
 ],
 "deng-4": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қаланы тазалау",
   "prompt": "<p><code>clean_city(s)</code> функциясын жазыңыз: шеттегі бос орындарды алып, бірінші әріпті бас, қалғанын кіші әріп етсін: <code>\" АЛМАТЫ \"</code> → <code>\"Алматы\"</code>. Сосын <code>cities</code> — <code>deng_raw_sales.csv</code>-тағы тазаланған қалалардың қайталанбайтын сұрыпталған тізімі.</p>",
   "starter": "import pandas as pd\nraw = pd.read_csv('deng_raw_sales.csv')\n\ndef clean_city(s):\n    return s\n\ncities = []\n",
   "solution": "import pandas as pd\nraw = pd.read_csv('deng_raw_sales.csv')\n\ndef clean_city(s):\n    return s.strip().capitalize()\n\ncities = sorted(set(clean_city(c) for c in raw['city']))\nprint(cities)\n",
   "hints": [
    "<code>s.strip().capitalize()</code>.",
    "Қайталанбайтын: <code>sorted(set(...))</code>."
   ],
   "check": {
    "tests": "assert clean_city(' АЛМАТЫ ') == 'Алматы' and clean_city('шымкент ') == 'Шымкент', 'clean_city(\" АЛМАТЫ \") \"Алматы\" қайтаруы керек'\nassert cities == ['Алматы', 'Астана', 'Шымкент'], f'Тазалағаннан кейін 3 қала, сізде {cities}'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Extract: статустар",
   "prompt": "<p>Extract қадамы. <code>deng_raw_sales.csv</code>-ты оқып, <code>n_rows</code> — жолдар санын, <code>status_counts</code> — әр статустың санын (сөздік <code>{статус: саны}</code>) жазыңыз.</p>",
   "starter": "import pandas as pd\nn_rows = None\nstatus_counts = {}\n",
   "solution": "import pandas as pd\nraw = pd.read_csv('deng_raw_sales.csv')\nn_rows = len(raw)\nstatus_counts = {k: int(v) for k, v in raw['status'].value_counts().items()}\nprint(n_rows, status_counts)\n",
   "hints": [
    "<code>raw = pd.read_csv('deng_raw_sales.csv')</code>.",
    "<code>raw['status'].value_counts()</code>, сосын сөздікке айналдырыңыз."
   ],
   "check": {
    "tests": "assert n_rows == 10, 'Шикі деректе 10 жол'\nassert status_counts == {'paid': 7, 'cancelled': 2, 'pending': 1}, f'status_counts дұрыс емес: {status_counts}'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Тек төленгендер",
   "prompt": "<p><code>paid</code> айнымалысына <code>deng_raw_sales.csv</code>-тан тек <code>status == 'paid'</code> жолдарды (DataFrame) жазыңыз, ал <code>paid_total</code>-ға олардың <code>amount_tg</code> қосындысын.</p>",
   "starter": "import pandas as pd\nraw = pd.read_csv('deng_raw_sales.csv')\npaid = raw\npaid_total = None\n",
   "solution": "import pandas as pd\nraw = pd.read_csv('deng_raw_sales.csv')\npaid = raw[raw['status'] == 'paid']\npaid_total = int(paid['amount_tg'].sum())\nprint(len(paid), paid_total)\n",
   "hints": [
    "Сүзгі: <code>raw[raw['status'] == 'paid']</code>.",
    "<code>paid['amount_tg'].sum()</code>."
   ],
   "check": {
    "tests": "assert len(paid) == 7 and set(paid['status']) == {'paid'}, 'paid-та 7 төленген жол'\nassert paid_total is not None and int(paid_total) == 405100, f'Төленген сома 405 100 ₸, сізде {paid_total}'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Transform: күн бойынша",
   "prompt": "<p><code>transform_daily(df)</code> жазыңыз: тек төленген жолдарды алып, <code>order_date</code> бойынша <code>amount_tg</code> қосындысы мен тапсырыс санын есептесін. Нәтиже — бағандары <code>order_date</code>, <code>paid_tg</code>, <code>orders</code> болатын DataFrame, күн бойынша сұрыпталған, индексі 0-ден. Кіріс DataFrame өзгермесін. Сосын <code>daily = transform_daily(raw)</code>.</p>",
   "starter": "import pandas as pd\nraw = pd.read_csv('deng_raw_sales.csv')\n\ndef transform_daily(df):\n    return df\n\ndaily = None\n",
   "solution": "import pandas as pd\nraw = pd.read_csv('deng_raw_sales.csv')\n\ndef transform_daily(df):\n    paid = df[df['status'] == 'paid']\n    out = paid.groupby('order_date', as_index=False).agg(paid_tg=('amount_tg', 'sum'), orders=('order_id', 'count'))\n    return out.sort_values('order_date').reset_index(drop=True)\n\ndaily = transform_daily(raw)\nprint(daily)\n",
   "hints": [
    "Алдымен сүзгі, сосын <code>groupby('order_date', as_index=False).agg(paid_tg=('amount_tg', 'sum'), orders=('order_id', 'count'))</code>.",
    "Соңында <code>sort_values</code> және <code>reset_index(drop=True)</code>."
   ],
   "check": {
    "tests": "assert daily is not None and list(daily.columns) == ['order_date', 'paid_tg', 'orders'], f\"Бағандар: order_date, paid_tg, orders. Сізде {None if daily is None else list(daily.columns)}\"\nassert list(daily['order_date']) == ['2024-03-01', '2024-03-02', '2024-03-03', '2024-03-04', '2024-03-05'], 'Төленген тапсырысы бар 5 күн, сұрыпталған'\nassert [int(x) for x in daily['paid_tg']] == [147300, 18900, 14900, 153500, 70500] and [int(x) for x in daily['orders']] == [2, 1, 1, 2, 1], 'paid_tg немесе orders дұрыс емес'\nassert len(raw) == 10, 'Кіріс DataFrame өзгермеуі керек'",
    "mustInclude": [
     "groupby"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "ELT: шикі қабаттан қайта есептеу",
   "prompt": "<p>ELT-тің артықшылығы: шикі дерек сақталады, логика өзгерсе, қайта есептейміз. Бизнес «табыс = paid <b>және</b> pending» деп ережені өзгертті. <code>revenue_by_city(raw, statuses)</code> жазыңыз: көшірмеде қаланы тазалап (<code>strip().capitalize()</code>), <code>status</code> берілген тізімде болатын жолдар бойынша қала → <code>amount_tg</code> қосындысы сөздігін қайтарсын. Сосын <code>old_rule</code> (<code>['paid']</code>) және <code>new_rule</code> (<code>['paid', 'pending']</code>) нәтижелерін есептеңіз.</p>",
   "starter": "import pandas as pd\nraw = pd.read_csv('deng_raw_sales.csv')\n\ndef revenue_by_city(raw, statuses):\n    return {}\n\nold_rule = None\nnew_rule = None\n",
   "solution": "import pandas as pd\nraw = pd.read_csv('deng_raw_sales.csv')\n\ndef revenue_by_city(raw, statuses):\n    df = raw.copy()\n    df['city'] = df['city'].str.strip().str.capitalize()\n    df = df[df['status'].isin(statuses)]\n    return {c: int(v) for c, v in df.groupby('city')['amount_tg'].sum().items()}\n\nold_rule = revenue_by_city(raw, ['paid'])\nnew_rule = revenue_by_city(raw, ['paid', 'pending'])\nprint(old_rule, new_rule)\n",
   "hints": [
    "Статус бойынша сүзгі: <code>df[df['status'].isin(statuses)]</code>.",
    "Нәтижені сөздікке: <code>{c: int(v) for c, v in series.items()}</code>."
   ],
   "check": {
    "tests": "assert old_rule == {'Алматы': 264200, 'Астана': 117500, 'Шымкент': 23400}, f'old_rule дұрыс емес: {old_rule}'\nassert new_rule == {'Алматы': 264200, 'Астана': 201500, 'Шымкент': 23400}, f'new_rule: Астанаға pending 84 000 қосылады. Сізде {new_rule}'\nassert revenue_by_city(raw, ['cancelled']) == {'Алматы': 13500, 'Астана': 37800}, 'Кез келген статус тізімімен жұмыс істеуі керек'\nassert raw['city'].iloc[0] == ' Алматы ', 'Шикі дерек өзгермеуі керек (көшірмемен жұмыс істеңіз)'",
    "mustInclude": [
     "isin"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Upsert",
   "prompt": "<p>Idempotent жүктеудің тағы бір тәсілі — кілт бойынша upsert. <code>upsert(table, rows, key)</code> жазыңыз: <code>table</code> мен <code>rows</code> — сөздіктер тізімі. <code>rows</code>-тағы әр жол үшін <code>table</code>-да сол кілті бар жол болса, оны ауыстырады (орны сақталады), жоқ болса соңына қосады. Жаңа тізім қайтарылсын, кіріс <code>table</code> өзгермесін.</p>",
   "starter": "table = [\n    {'order_id': 201, 'status': 'pending', 'amount_tg': 29800},\n    {'order_id': 202, 'status': 'paid', 'amount_tg': 117500},\n]\nupdates = [\n    {'order_id': 201, 'status': 'paid', 'amount_tg': 29800},\n    {'order_id': 203, 'status': 'cancelled', 'amount_tg': 13500},\n]\n\ndef upsert(table, rows, key):\n    return table + rows\n",
   "solution": "table = [\n    {'order_id': 201, 'status': 'pending', 'amount_tg': 29800},\n    {'order_id': 202, 'status': 'paid', 'amount_tg': 117500},\n]\nupdates = [\n    {'order_id': 201, 'status': 'paid', 'amount_tg': 29800},\n    {'order_id': 203, 'status': 'cancelled', 'amount_tg': 13500},\n]\n\ndef upsert(table, rows, key):\n    result = [dict(r) for r in table]\n    index = {r[key]: i for i, r in enumerate(result)}\n    for r in rows:\n        if r[key] in index:\n            result[index[r[key]]] = dict(r)\n        else:\n            index[r[key]] = len(result)\n            result.append(dict(r))\n    return result\n\nonce = upsert(table, updates, 'order_id')\ntwice = upsert(once, updates, 'order_id')\nprint(once == twice, once)\n",
   "hints": [
    "Кілт → индекс сөздігі: <code>{r[key]: i for i, r in enumerate(result)}</code>.",
    "Жаңа жолды қосқанда индексті де жаңартыңыз: rows ішінде бір кілт екі рет кездесуі мүмкін."
   ],
   "check": {
    "tests": "_once = upsert(table, updates, 'order_id')\nassert [(r['order_id'], r['status']) for r in _once] == [(201, 'paid'), (202, 'paid'), (203, 'cancelled')], f'upsert нәтижесі дұрыс емес: {_once}'\nassert upsert(_once, updates, 'order_id') == _once, 'Idempotent: екінші рет жүргізгенде нәтиже өзгермейді'\nassert table[0]['status'] == 'pending' and len(table) == 2, 'Кіріс table өзгермеуі керек'\nassert len(upsert([], [{'id': 1, 'v': 1}, {'id': 1, 'v': 2}], 'id')) == 1, 'rows ішіндегі бір кілт бір жол болып қалады'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Статус бойынша ETL",
   "prompt": "<p><code>etl(path, target)</code> жазыңыз. Extract: CSV оқиды. Transform: қаланы тазалайды; қала бойынша <code>paid_tg</code> (paid сомасы), <code>cancelled_tg</code> (cancelled сомасы), <code>pending_tg</code> (pending сомасы) бағандары бар кесте жасайды (<code>pivot_table</code>, жоқ мәндер 0, бүтін сандар); <code>city</code> — баған, қала бойынша сұрыпталған, индексі 0-ден; бағандар реті: <code>city</code>, <code>paid_tg</code>, <code>cancelled_tg</code>, <code>pending_tg</code>. Load: <code>target</code> CSV файлына жазады (<code>index=False</code>). Нәтиже DataFrame-ді қайтарады. Сосын <code>report = etl('deng_raw_sales.csv', 'deng_status_report.csv')</code>.</p>",
   "starter": "import pandas as pd\n\ndef etl(path, target):\n    return pd.read_csv(path)\n\nreport = None\n",
   "solution": "import pandas as pd\n\ndef extract(path):\n    return pd.read_csv(path)\n\ndef transform(df):\n    df = df.copy()\n    df['city'] = df['city'].str.strip().str.capitalize()\n    p = df.pivot_table(index='city', columns='status', values='amount_tg', aggfunc='sum', fill_value=0)\n    p = p.reindex(columns=['paid', 'cancelled', 'pending'], fill_value=0).astype(int)\n    p.columns = ['paid_tg', 'cancelled_tg', 'pending_tg']\n    return p.reset_index().sort_values('city').reset_index(drop=True)\n\ndef load(df, target):\n    df.to_csv(target, index=False)\n\ndef etl(path, target):\n    out = transform(extract(path))\n    load(out, target)\n    return out\n\nreport = etl('deng_raw_sales.csv', 'deng_status_report.csv')\nprint(report)\n",
   "hints": [
    "Статус бойынша бағандар: <code>pivot_table(index='city', columns='status', values='amount_tg', aggfunc='sum', fill_value=0)</code>.",
    "Бағандардың реті мен атауы: <code>.reindex(columns=['paid', 'cancelled', 'pending'], fill_value=0)</code>, сосын <code>p.columns = [...]</code> және <code>reset_index()</code>."
   ],
   "check": {
    "tests": "import pandas as _pd\nassert report is not None and list(report.columns) == ['city', 'paid_tg', 'cancelled_tg', 'pending_tg'], f\"Бағандар: city, paid_tg, cancelled_tg, pending_tg. Сізде {None if report is None else list(report.columns)}\"\nassert list(report['city']) == ['Алматы', 'Астана', 'Шымкент'] and list(report.index) == [0, 1, 2], 'Қалалар тазаланып, сұрыпталсын'\nassert [int(x) for x in report['paid_tg']] == [264200, 117500, 23400], 'paid_tg: 264200, 117500, 23400'\nassert [int(x) for x in report['cancelled_tg']] == [13500, 37800, 0] and [int(x) for x in report['pending_tg']] == [0, 84000, 0], 'cancelled_tg және pending_tg дұрыс емес (жоқ мән 0)'\n_f = _pd.read_csv('deng_status_report.csv')\nassert list(_f.columns) == list(report.columns) and len(_f) == 3, 'Файлға дәл осы кесте жазылуы керек (index=False)'\n_r2 = etl('deng_raw_sales.csv', 'deng_status_report_2.csv')\nassert _r2.equals(report), 'etl қайта жүргізілгенде бірдей нәтиже береді'",
    "mustInclude": [
     "pivot_table"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Күндік idempotent жүктеу",
   "prompt": "<p>Түнгі job бір күннің деректерін warehouse кестесіне жүктейді, ал қате болса қайта жүргізіледі. <code>load_day(target, raw, dt)</code> жазыңыз: <code>raw</code>-тан <code>order_date == dt</code> және <code>status == 'paid'</code> жолдарды алып, тазаланған қала бойынша <code>paid_tg</code> қосындысын есептейді (бағандар: <code>dt</code>, <code>city</code>, <code>paid_tg</code>); <code>target</code>-тан осы <code>dt</code>-ның ескі жолдарын алып тастап, жаңаларын қосады; <code>dt</code>, <code>city</code> бойынша сұрыпталған, индексі 0-ден жаңа DataFrame қайтарады. Сосын <code>wh</code> — бос кестеге 2024-03-01, 2024-03-02, қайтадан 2024-03-01, сосын 2024-03-04 күндерін ретімен жүктеу нәтижесі.</p>",
   "starter": "import pandas as pd\nraw = pd.read_csv('deng_raw_sales.csv')\ntarget = pd.DataFrame(columns=['dt', 'city', 'paid_tg'])\n\ndef load_day(target, raw, dt):\n    return target\n\nwh = None\n",
   "solution": "import pandas as pd\nraw = pd.read_csv('deng_raw_sales.csv')\ntarget = pd.DataFrame(columns=['dt', 'city', 'paid_tg'])\n\ndef load_day(target, raw, dt):\n    day = raw[(raw['order_date'] == dt) & (raw['status'] == 'paid')].copy()\n    day['city'] = day['city'].str.strip().str.capitalize()\n    new = day.groupby('city', as_index=False)['amount_tg'].sum().rename(columns={'amount_tg': 'paid_tg'})\n    new.insert(0, 'dt', dt)\n    kept = target[target['dt'] != dt]\n    out = pd.concat([kept, new], ignore_index=True)\n    out['paid_tg'] = out['paid_tg'].astype(int)\n    return out.sort_values(['dt', 'city']).reset_index(drop=True)\n\nwh = target\nfor d in ['2024-03-01', '2024-03-02', '2024-03-01', '2024-03-04']:\n    wh = load_day(wh, raw, d)\nprint(wh)\n",
   "hints": [
    "Ескі партицияны алып тастау: <code>target[target['dt'] != dt]</code>, сосын <code>pd.concat([kept, new], ignore_index=True)</code>.",
    "Жаңа жолдарға күн бағанын қосу: <code>new.insert(0, 'dt', dt)</code>."
   ],
   "check": {
    "tests": "assert wh is not None and list(wh.columns) == ['dt', 'city', 'paid_tg'], f\"Бағандар: dt, city, paid_tg. Сізде {None if wh is None else list(wh.columns)}\"\nassert [(r.dt, r.city, int(r.paid_tg)) for r in wh.itertuples()] == [('2024-03-01', 'Алматы', 29800), ('2024-03-01', 'Астана', 117500), ('2024-03-02', 'Шымкент', 18900), ('2024-03-04', 'Алматы', 149000), ('2024-03-04', 'Шымкент', 4500)], f'wh дұрыс емес:\\n{wh}'\nassert list(wh.index) == list(range(5)), 'Индексі 0-ден'\n_again = load_day(wh, raw, '2024-03-04')\nassert _again.equals(wh), 'Сол күнді қайта жүктеу кестені өзгертпеуі керек (idempotent)'",
    "mustInclude": [
     "concat"
    ]
   }
  }
 ],
 "deng-5": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Cron уақытын оқу",
   "prompt": "<p>Airflow schedule-і cron түрінде жазылады: <code>'0 3 * * *'</code> — күн сайын 03:00. <code>parse_cron(expr)</code> функциясын жазыңыз: алғашқы екі өрісті (минут, сағат) бүтін сан ретінде <code>(minute, hour)</code> кортежімен қайтарсын. Сосын <code>run_at(expr)</code> уақытты <code>'HH:MM'</code> түрінде қайтарсын.</p>",
   "starter": "def parse_cron(expr):\n    return (0, 0)\n\ndef run_at(expr):\n    return '00:00'\n",
   "solution": "def parse_cron(expr):\n    parts = expr.split()\n    return (int(parts[0]), int(parts[1]))\n\ndef run_at(expr):\n    minute, hour = parse_cron(expr)\n    return f'{hour:02d}:{minute:02d}'\n\nprint(parse_cron('0 3 * * *'), run_at('30 23 * * *'))\n",
   "hints": [
    "<code>expr.split()</code> бос орын бойынша бөледі: <code>['0', '3', '*', '*', '*']</code>.",
    "Екі таңбалы формат: <code>f'{hour:02d}:{minute:02d}'</code>."
   ],
   "check": {
    "tests": "assert tuple(parse_cron('0 3 * * *')) == (0, 3), \"'0 3 * * *' → (0, 3)\"\nassert tuple(parse_cron('30 23 * * *')) == (30, 23), \"'30 23 * * *' → (30, 23)\"\nassert run_at('0 3 * * *') == '03:00', \"'0 3 * * *' → '03:00'\"\nassert run_at('5 14 * * 1') == '14:05', \"'5 14 * * 1' → '14:05'\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Batch па, streaming бе",
   "prompt": "<p>Сабақтағы ереже: кешігу шынымен маңызды болмаса, batch таңдаңыз. <code>choose_mode(max_delay_sec)</code> функциясын жазыңыз: рұқсат етілген кешігу 60 секундтан аз болса <code>'streaming'</code>, әйтпесе <code>'batch'</code> қайтарсын. Сосын <code>modes</code> тізімі: Kaspi төлемінің fraud тексерісі (2 с), түнгі сату есебі (86400 с), сағаттық dashboard (3600 с) үшін режимдер.</p>",
   "starter": "def choose_mode(max_delay_sec):\n    return 'batch'\n\nmodes = []\n",
   "solution": "def choose_mode(max_delay_sec):\n    if max_delay_sec < 60:\n        return 'streaming'\n    return 'batch'\n\nmodes = [choose_mode(x) for x in [2, 86400, 3600]]\nprint(modes)\n",
   "hints": [
    "<code>if max_delay_sec &lt; 60: return 'streaming'</code>.",
    "<code>modes = [choose_mode(x) for x in [2, 86400, 3600]]</code>."
   ],
   "check": {
    "tests": "assert choose_mode(2) == 'streaming', 'Fraud тексерісі 2 секундта → streaming'\nassert choose_mode(60) == 'batch', '60 секунд — шекара, batch жеткілікті'\nassert choose_mode(86400) == 'batch', 'Түнгі есеп → batch'\nassert modes == ['streaming', 'batch', 'batch'], f\"Күтілгені ['streaming', 'batch', 'batch'], сізде {modes}\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Upstream task-тар",
   "prompt": "<p><code>DEPS</code> — әр task-тың тәуелділіктері. <code>n_upstream(deps, task)</code> функциясын жазыңыз: task-тың тікелей тәуелділіктерінің санын қайтарсын. Сосын <code>roots</code> — тәуелділігі жоқ task-тардың сұрыпталған тізімі.</p>",
   "starter": "DEPS = {\n    'extract': [],\n    'load_dims': ['extract'],\n    'load_fact': ['extract', 'load_dims'],\n    'quality': ['load_dims'],\n    'report': ['load_fact'],\n    'notify': ['report'],\n}\n\ndef n_upstream(deps, task):\n    return 0\n\nroots = None\n",
   "solution": "DEPS = {\n    'extract': [],\n    'load_dims': ['extract'],\n    'load_fact': ['extract', 'load_dims'],\n    'quality': ['load_dims'],\n    'report': ['load_fact'],\n    'notify': ['report'],\n}\n\ndef n_upstream(deps, task):\n    return len(deps[task])\n\nroots = sorted(t for t in DEPS if len(DEPS[t]) == 0)\nprint(n_upstream(DEPS, 'load_fact'), roots)\n",
   "hints": [
    "Тікелей тәуелділіктер: <code>len(deps[task])</code>.",
    "<code>sorted(t for t in DEPS if not DEPS[t])</code>."
   ],
   "check": {
    "tests": "assert n_upstream(DEPS, 'load_fact') == 2, 'load_fact екі task-қа тәуелді'\nassert n_upstream(DEPS, 'extract') == 0, 'extract ешкімге тәуелді емес'\nassert n_upstream({'x': ['a', 'b', 'c']}, 'x') == 3, 'Кез келген deps-пен жұмыс істеуі керек'\nassert roots == ['extract'], f\"Тәуелділігі жоқ task — тек extract, сізде {roots}\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Backfill күндері",
   "prompt": "<p>Backfill — өткен күндерді қайта есептеу. <code>backfill_dates(start, end)</code> функциясын жазыңыз: <code>'YYYY-MM-DD'</code> жолдарын қабылдап, екі шетін қоса барлық күндердің тізімін сол форматта қайтарсын. <code>datetime</code> модулін қолданыңыз (2024 — кібісе жыл).</p>",
   "starter": "from datetime import date, timedelta\n\ndef backfill_dates(start, end):\n    return [start]\n",
   "solution": "from datetime import date, timedelta\n\ndef backfill_dates(start, end):\n    d = date.fromisoformat(start)\n    last = date.fromisoformat(end)\n    out = []\n    while d <= last:\n        out.append(d.isoformat())\n        d = d + timedelta(days=1)\n    return out\n\nprint(backfill_dates('2024-02-27', '2024-03-02'))\n",
   "hints": [
    "<code>date.fromisoformat('2024-02-27')</code> жолды күнге айналдырады, <code>.isoformat()</code> кері қайтарады.",
    "Цикл: <code>while d &lt;= last: ...; d = d + timedelta(days=1)</code>."
   ],
   "check": {
    "tests": "_b = backfill_dates('2024-02-27', '2024-03-02')\nassert _b == ['2024-02-27', '2024-02-28', '2024-02-29', '2024-03-01', '2024-03-02'], f'29 ақпанды ұмытпаңыз (кібісе жыл). Сізде {_b}'\nassert backfill_dates('2024-03-05', '2024-03-05') == ['2024-03-05'], 'Бір күн болса, бір элемент'\nassert len(backfill_dates('2024-03-01', '2024-03-31')) == 31, 'Наурызда 31 күн'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Retry логикасы",
   "prompt": "<p>Airflow-дағы <code>retries=2</code> қате болса task-ты тағы екі рет қайталайды. <code>run_with_retry(fn, retries)</code> функциясын жазыңыз: <code>fn()</code>-ді ең көбі <code>retries + 1</code> рет шақырсын. Сәтті болса <code>(нәтиже, әрекет_саны)</code> қайтарсын, бәрі құласа — соңғы қатені қайта көтерсін.</p>",
   "starter": "def run_with_retry(fn, retries):\n    return (fn(), 1)\n",
   "solution": "def run_with_retry(fn, retries):\n    for attempt in range(1, retries + 2):\n        try:\n            return (fn(), attempt)\n        except Exception as e:\n            last = e\n    raise last\n\ncalls = []\ndef flaky():\n    calls.append(1)\n    if len(calls) < 3:\n        raise ConnectionError('Желі үзілді')\n    return 'ok'\n\nprint(run_with_retry(flaky, 2))\n",
   "hints": [
    "<code>for attempt in range(1, retries + 2):</code> ішінде <code>try: return (fn(), attempt)</code>.",
    "<code>except Exception as e: last = e</code>, цикл біткенде <code>raise last</code>."
   ],
   "check": {
    "tests": "_calls = []\ndef _flaky():\n    _calls.append(1)\n    if len(_calls) < 3:\n        raise ConnectionError('Желі үзілді')\n    return 'ok'\n_r = run_with_retry(_flaky, 2)\nassert tuple(_r) == ('ok', 3), f\"Үшінші әрекет сәтті: ('ok', 3), сізде {_r}\"\nassert tuple(run_with_retry(lambda: 42, 0)) == (42, 1), 'Бірден сәтті болса, 1 әрекет'\n_n = []\ndef _always():\n    _n.append(1)\n    raise TimeoutError('Қойма жауап бермеді')\n_ok = False\ntry:\n    run_with_retry(_always, 2)\nexcept TimeoutError:\n    _ok = True\nassert _ok, 'Бәрі құласа, соңғы қатені қайта көтеріңіз'\nassert len(_n) == 3, f'retries=2 → барлығы 3 әрекет, сізде {len(_n)}'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Төменгі task-тар",
   "prompt": "<p>Бір task құласа, одан кейінгі барлық task-тар жүрмейді. <code>downstream(deps, task)</code> функциясын жазыңыз: берілген task-қа тікелей немесе жанама тәуелді барлық task-тардың сұрыпталған тізімін қайтарсын.</p>",
   "starter": "DEPS = {\n    'extract': [],\n    'load_dims': ['extract'],\n    'load_fact': ['extract', 'load_dims'],\n    'quality': ['load_dims'],\n    'report': ['load_fact'],\n    'notify': ['report'],\n}\n\ndef downstream(deps, task):\n    return []\n",
   "solution": "DEPS = {\n    'extract': [],\n    'load_dims': ['extract'],\n    'load_fact': ['extract', 'load_dims'],\n    'quality': ['load_dims'],\n    'report': ['load_fact'],\n    'notify': ['report'],\n}\n\ndef downstream(deps, task):\n    found = set()\n    frontier = [task]\n    while frontier:\n        cur = frontier.pop()\n        for t, ds in deps.items():\n            if cur in ds and t not in found:\n                found.add(t)\n                frontier.append(t)\n    return sorted(found)\n\nprint(downstream(DEPS, 'load_dims'))\n",
   "hints": [
    "Тікелей тәуелділер: <code>[t for t, ds in deps.items() if task in ds]</code>.",
    "Табылғандарды кезекке (<code>frontier</code>) салып, олардың да тәуелділерін іздеңіз; <code>set</code> қайталауды болдырмайды."
   ],
   "check": {
    "tests": "_d = downstream(DEPS, 'load_dims')\nassert _d == ['load_fact', 'notify', 'quality', 'report'], f'load_dims-тен кейін 4 task тұр, сізде {_d}'\nassert downstream(DEPS, 'report') == ['notify'], 'report-тан кейін тек notify'\nassert downstream(DEPS, 'notify') == [], 'notify — соңғы task'\nassert len(downstream(DEPS, 'extract')) == 5, 'extract-қа қалған бес task тәуелді'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Терезедегі alert-тер",
   "prompt": "<p>Streaming-те оқиғалар <b>tumbling window</b>-ға (қабаттаспайтын терезелер) бөлінеді: <code>t // size * size</code> — терезенің басы. <code>window_counts(events, size)</code> функциясы <code>{(card, window_start): саны}</code> dict-ін қайтарсын. <code>alerts(events, size, limit)</code> — саны <code>limit</code>-тен көп болған <code>(card, window_start)</code> жұптарының сұрыпталған тізімі.</p>",
   "starter": "events = [\n    {'card': 'A', 't': 5}, {'card': 'A', 't': 20}, {'card': 'B', 't': 30},\n    {'card': 'A', 't': 50}, {'card': 'A', 't': 59}, {'card': 'B', 't': 61},\n    {'card': 'A', 't': 65}, {'card': 'B', 't': 70}, {'card': 'B', 't': 90},\n    {'card': 'B', 't': 119},\n]\n\ndef window_counts(events, size):\n    return {}\n\ndef alerts(events, size, limit):\n    return []\n",
   "solution": "events = [\n    {'card': 'A', 't': 5}, {'card': 'A', 't': 20}, {'card': 'B', 't': 30},\n    {'card': 'A', 't': 50}, {'card': 'A', 't': 59}, {'card': 'B', 't': 61},\n    {'card': 'A', 't': 65}, {'card': 'B', 't': 70}, {'card': 'B', 't': 90},\n    {'card': 'B', 't': 119},\n]\n\ndef window_counts(events, size):\n    counts = {}\n    for e in events:\n        key = (e['card'], e['t'] // size * size)\n        counts[key] = counts.get(key, 0) + 1\n    return counts\n\ndef alerts(events, size, limit):\n    return sorted(k for k, v in window_counts(events, size).items() if v > limit)\n\nprint(window_counts(events, 60), alerts(events, 60, 3))\n",
   "hints": [
    "Кілт: <code>(e['card'], e['t'] // size * size)</code>, санау: <code>counts.get(key, 0) + 1</code>.",
    "<code>sorted(k for k, v in window_counts(...).items() if v &gt; limit)</code>."
   ],
   "check": {
    "tests": "_w = window_counts(events, 60)\nassert _w == {('A', 0): 4, ('A', 60): 1, ('B', 0): 1, ('B', 60): 4}, f'60 с терезелер: A[0]=4, A[60]=1, B[0]=1, B[60]=4. Сізде {_w}'\nassert alerts(events, 60, 3) == [('A', 0), ('B', 60)], 'limit=3 → A 0-терезеде, B 60-терезеде'\nassert alerts(events, 30, 1) == [('A', 0), ('A', 30), ('B', 60), ('B', 90)], '30 с терезеде limit=1 → төрт alert'\nassert alerts(events, 60, 4) == [], 'Ешбір терезеде 4-тен көп емес'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "DAG-ты іске қосу",
   "prompt": "<p>Airflow сияқты <code>run_dag(deps, failing)</code> функциясын жазыңыз. Task-тарды тәуелділіктері біткен соң, дайындардың ішінен алфавит ретімен таңдап орындаңыз. Әр task-тың статусы: <code>failing</code> жиынында болса <code>'failed'</code>; тәуелділіктерінің бірі <code>'success'</code> болмаса <code>'upstream_failed'</code>; әйтпесе <code>'success'</code>. Функция <code>(order, status)</code> қайтарсын: орындалу реті және статустар dict-і.</p>",
   "starter": "DEPS = {\n    'extract': [],\n    'load_dims': ['extract'],\n    'load_fact': ['extract', 'load_dims'],\n    'quality': ['load_dims'],\n    'report': ['load_fact'],\n    'notify': ['report'],\n}\n\ndef run_dag(deps, failing):\n    order = sorted(deps)\n    status = {t: 'success' for t in deps}\n    return order, status\n",
   "solution": "DEPS = {\n    'extract': [],\n    'load_dims': ['extract'],\n    'load_fact': ['extract', 'load_dims'],\n    'quality': ['load_dims'],\n    'report': ['load_fact'],\n    'notify': ['report'],\n}\n\ndef run_dag(deps, failing):\n    order, status = [], {}\n    while len(order) < len(deps):\n        ready = sorted(t for t in deps if t not in status and all(d in status for d in deps[t]))\n        if not ready:\n            raise ValueError('DAG-та цикл бар')\n        t = ready[0]\n        if t in failing:\n            status[t] = 'failed'\n        elif any(status[d] != 'success' for d in deps[t]):\n            status[t] = 'upstream_failed'\n        else:\n            status[t] = 'success'\n        order.append(t)\n    return order, status\n\nprint(run_dag(DEPS, {'load_dims'}))\n",
   "hints": [
    "Дайын task: <code>t not in status and all(d in status for d in deps[t])</code>, олардың <code>sorted(...)[0]</code>-ін алыңыз.",
    "Статус: алдымен <code>t in failing</code>, сосын <code>any(status[d] != 'success' for d in deps[t])</code>."
   ],
   "check": {
    "tests": "_o, _s = run_dag(DEPS, set())\nassert _o == ['extract', 'load_dims', 'load_fact', 'quality', 'report', 'notify'], f'Орындалу реті қате: {_o}'\nassert all(v == 'success' for v in _s.values()), 'Қате жоқ болса, бәрі success'\n_o, _s = run_dag(DEPS, {'load_dims'})\nassert _s['extract'] == 'success' and _s['load_dims'] == 'failed', 'extract — success, load_dims — failed'\nassert _s['load_fact'] == 'upstream_failed' and _s['quality'] == 'upstream_failed', 'load_dims-ке тәуелділер upstream_failed'\nassert _s['notify'] == 'upstream_failed', 'Жанама тәуелді notify те upstream_failed'\n_o, _s = run_dag(DEPS, {'report'})\nassert [t for t in _o if _s[t] != 'success'] == ['report', 'notify'], 'report құласа, тек report пен notify зардап шегеді'"
   }
  }
 ],
 "deng-6": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "ref атауларын табу",
   "prompt": "<p>dbt модельдің тәуелділіктерін <code>{{ ref('...') }}</code> арқылы табады. <code>refs(sql)</code> функциясын жазыңыз: SQL-дегі барлық <code>ref('атау')</code> атауларын кездесу ретімен тізім етіп қайтарсын. Жол әдістерін (<code>split</code>) қолданыңыз.</p>",
   "starter": "def refs(sql):\n    return []\n",
   "solution": "def refs(sql):\n    out = []\n    for part in sql.split(\"ref('\")[1:]:\n        out.append(part.split(\"'\")[0])\n    return out\n\nprint(refs(\"select * from {{ ref('stg_orders') }} o join {{ ref('stg_customers') }} c using (customer_id)\"))\n",
   "hints": [
    "<code>sql.split(\"ref('\")[1:]</code> — әр бөлік атаудан басталады.",
    "Әр бөліктен атауды алу: <code>part.split(\"'\")[0]</code>."
   ],
   "check": {
    "tests": "assert refs(\"select * from {{ ref('stg_orders') }} o join {{ ref('stg_customers') }} c using (customer_id)\") == ['stg_orders', 'stg_customers'], 'Екі ref кездесу ретімен'\nassert refs('select * from raw.orders') == [], 'ref жоқ болса, бос тізім'\nassert refs(\"select * from {{ ref('paid_orders') }}\") == ['paid_orders'], 'Бір ref'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бос мәндерді санау",
   "prompt": "<p>dbt-тің <code>not_null</code> тесті құласа, қанша жол бұзғанын білу пайдалы. <code>count_nulls(df, col)</code> функциясын жазыңыз: бағандағы бос мәндердің санын <code>int</code> етіп қайтарсын. Сосын <code>bad</code> — <code>model</code> кестесінің <code>city</code> бағанындағы бос мәндер саны.</p>",
   "starter": "import pandas as pd\nmodel = pd.DataFrame({'order_id': [1, 2, 3, 4, 5],\n                      'city': ['Алматы', None, 'Астана', None, 'Шымкент']})\n\ndef count_nulls(df, col):\n    return 0\n\nbad = None\n",
   "solution": "import pandas as pd\nmodel = pd.DataFrame({'order_id': [1, 2, 3, 4, 5],\n                      'city': ['Алматы', None, 'Астана', None, 'Шымкент']})\n\ndef count_nulls(df, col):\n    return int(df[col].isna().sum())\n\nbad = count_nulls(model, 'city')\nprint(bad)\n",
   "hints": [
    "<code>df[col].isna()</code> True/False қатарын береді.",
    "<code>int(df[col].isna().sum())</code>."
   ],
   "check": {
    "tests": "assert bad == 2, f'city бағанында 2 бос мән бар, сізде {bad}'\nassert count_nulls(model, 'order_id') == 0, 'order_id-де бос мән жоқ'\nassert count_nulls(pd.DataFrame({'x': [None, None, 1]}), 'x') == 2, 'Кез келген кестемен жұмыс істеуі керек'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Мән аралығы тесті",
   "prompt": "<p><code>accepted_range</code> тестінің баламасы: <code>test_accepted_range(df, col, min_value)</code> бағандағы барлық бос емес мәндер <code>min_value</code>-ден кіші болмаса <code>True</code>, әйтпесе <code>False</code> қайтарсын.</p>",
   "starter": "import pandas as pd\n\ndef test_accepted_range(df, col, min_value):\n    return True\n",
   "solution": "import pandas as pd\n\ndef test_accepted_range(df, col, min_value):\n    return bool((df[col].dropna() >= min_value).all())\n\nprint(test_accepted_range(pd.DataFrame({'amount_tg': [100, -5]}), 'amount_tg', 0))\n",
   "hints": [
    "Бос мәндерді алып тастаңыз: <code>df[col].dropna()</code>.",
    "<code>bool((... &gt;= min_value).all())</code>."
   ],
   "check": {
    "tests": "_ok = pd.DataFrame({'amount_tg': [100, 0, 2500, None]})\n_bad = pd.DataFrame({'amount_tg': [100, -50, 2500]})\nassert test_accepted_range(_ok, 'amount_tg', 0), 'Барлық мән ≥ 0 (бос мәнді елемеңіз) → True'\nassert not test_accepted_range(_bad, 'amount_tg', 0), '-50 бар → False'\nassert not test_accepted_range(_ok, 'amount_tg', 50), 'min_value=50 болса, 0 өтпейді'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Модель тәуелділіктері",
   "prompt": "<p><code>models</code> — модель атауы мен оның SQL-і. <code>refs(sql)</code> функциясын (алдыңғы тапсырмадағыдай) жазып, сосын <code>lineage(models)</code> функциясын жасаңыз: <code>{модель: ref тізімі}</code> dict-ін қайтарсын. Нәтижені <code>graph</code>-қа жазыңыз.</p>",
   "starter": "models = {\n    'stg_orders': \"select * from raw.orders\",\n    'stg_customers': \"select * from raw.customers\",\n    'paid_orders': \"select order_id, customer_id, amount_tg from {{ ref('stg_orders') }} where status = 'paid'\",\n    'city_revenue': \"select c.city, sum(p.amount_tg) from {{ ref('paid_orders') }} p join {{ ref('stg_customers') }} c using (customer_id) group by c.city\",\n    'customer_ltv': \"select customer_id, sum(amount_tg) from {{ ref('paid_orders') }} group by customer_id\",\n}\n\ndef refs(sql):\n    return []\n\ndef lineage(models):\n    return {}\n\ngraph = lineage(models)\n",
   "solution": "models = {\n    'stg_orders': \"select * from raw.orders\",\n    'stg_customers': \"select * from raw.customers\",\n    'paid_orders': \"select order_id, customer_id, amount_tg from {{ ref('stg_orders') }} where status = 'paid'\",\n    'city_revenue': \"select c.city, sum(p.amount_tg) from {{ ref('paid_orders') }} p join {{ ref('stg_customers') }} c using (customer_id) group by c.city\",\n    'customer_ltv': \"select customer_id, sum(amount_tg) from {{ ref('paid_orders') }} group by customer_id\",\n}\ndef refs(sql):\n    out = []\n    for part in sql.split(\"ref('\")[1:]:\n        out.append(part.split(\"'\")[0])\n    return out\n\ndef lineage(models):\n    return {name: refs(sql) for name, sql in models.items()}\n\ngraph = lineage(models)\nprint(graph)\n",
   "hints": [
    "<code>refs</code>: <code>sql.split(\"ref('\")[1:]</code>, әр бөліктен <code>part.split(\"'\")[0]</code>.",
    "<code>{name: refs(sql) for name, sql in models.items()}</code>."
   ],
   "check": {
    "tests": "assert graph['stg_orders'] == [] and graph['stg_customers'] == [], 'Staging модельдер raw кестеден оқиды, ref жоқ'\nassert graph['paid_orders'] == ['stg_orders'], f\"paid_orders → ['stg_orders'], сізде {graph.get('paid_orders')}\"\nassert graph['city_revenue'] == ['paid_orders', 'stg_customers'], 'city_revenue екі модельге тәуелді'\nassert len(graph) == 5, 'Бес модельдің бәрі болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Silver: paid_orders",
   "prompt": "<p><code>deng_raw_sales.csv</code>-тан silver моделін pandas-пен жасаңыз: қаланы <code>.str.strip().str.capitalize()</code> арқылы тазалап, тек <code>status == 'paid'</code> жолдарын қалдырыңыз. <code>paid</code> бағандары: <code>order_id</code>, <code>order_date</code>, <code>city</code>, <code>amount_tg</code>; индексі 0-ден.</p>",
   "starter": "import pandas as pd\nraw = pd.read_csv('deng_raw_sales.csv')\npaid = raw\n",
   "solution": "import pandas as pd\nraw = pd.read_csv('deng_raw_sales.csv')\nraw['city'] = raw['city'].str.strip().str.capitalize()\npaid = (raw[raw['status'] == 'paid'][['order_id', 'order_date', 'city', 'amount_tg']]\n        .reset_index(drop=True))\nprint(paid)\n",
   "hints": [
    "Сүзгі: <code>raw[raw['status'] == 'paid']</code>.",
    "Бағандарды таңдап, <code>.reset_index(drop=True)</code>."
   ],
   "check": {
    "tests": "assert list(paid.columns) == ['order_id', 'order_date', 'city', 'amount_tg'], f'Бағандар: order_id, order_date, city, amount_tg. Сізде {list(paid.columns)}'\nassert len(paid) == 7, f'7 төленген тапсырыс болуы керек, сізде {len(paid)}'\nassert sorted(paid['city'].unique()) == ['Алматы', 'Астана', 'Шымкент'], 'Қала атаулары тазаланбаған'\nassert int(paid['amount_tg'].sum()) == 405100, 'Төленген соманың қосындысы 405 100 ₸'\nassert list(paid.index) == list(range(7)), 'Индексі 0-ден басталсын'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Gold: city_revenue",
   "prompt": "<p>Silver қабатынан gold моделін жасаңыз. <code>deng_raw_sales.csv</code>-ты тазалап (қала атауы), төленген тапсырыстарды алыңыз, сосын қала бойынша <code>gold</code> DataFrame-ін құрыңыз: бағандары <code>city</code>, <code>revenue_tg</code> (қосынды), <code>orders</code> (саны); <code>revenue_tg</code> бойынша кемуімен сұрыпталған, индексі 0-ден.</p>",
   "starter": "import pandas as pd\nraw = pd.read_csv('deng_raw_sales.csv')\ngold = None\n",
   "solution": "import pandas as pd\nraw = pd.read_csv('deng_raw_sales.csv')\nraw['city'] = raw['city'].str.strip().str.capitalize()\npaid = raw[raw['status'] == 'paid']\ngold = (paid.groupby('city', as_index=False)\n            .agg(revenue_tg=('amount_tg', 'sum'), orders=('order_id', 'count'))\n            .sort_values('revenue_tg', ascending=False)\n            .reset_index(drop=True))\nprint(gold)\n",
   "hints": [
    "Алдымен тазалау және <code>status == 'paid'</code> сүзгісі.",
    "<code>.groupby('city', as_index=False).agg(revenue_tg=('amount_tg', 'sum'), orders=('order_id', 'count'))</code>."
   ],
   "check": {
    "tests": "assert gold is not None and list(gold.columns) == ['city', 'revenue_tg', 'orders'], 'Бағандар: city, revenue_tg, orders'\nassert list(gold['city']) == ['Алматы', 'Астана', 'Шымкент'], f\"Рет: Алматы, Астана, Шымкент. Сізде {list(gold['city'])}\"\nassert [int(x) for x in gold['revenue_tg']] == [264200, 117500, 23400], 'Түсім: 264 200, 117 500, 23 400 ₸'\nassert [int(x) for x in gold['orders']] == [4, 1, 2], 'Тапсырыс саны: 4, 1, 2'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Config бойынша тестілер",
   "prompt": "<p>dbt-тің <code>schema.yml</code>-ы сияқты <code>config</code> тізімі берілген: әр жол <code>'баған:тест'</code>. <code>run_tests(df, config)</code> функциясын жазыңыз: тестілер <code>not_null</code>, <code>unique</code> (бос емес мәндер қайталанбайды), <code>non_negative</code> (бос емес мәндер ≥ 0). Құлаған config жолдарының тізімін (бастапқы ретпен) қайтарсын. Белгісіз тест болса, <code>ValueError</code> көтерсін.</p>",
   "starter": "import pandas as pd\nmodel = pd.DataFrame({'order_id': [1, 2, 2, 4],\n                      'city': ['Алматы', None, 'Астана', 'Шымкент'],\n                      'amount_tg': [1000, -50, 300, 700]})\nconfig = ['order_id:unique', 'order_id:not_null', 'city:not_null',\n          'amount_tg:not_null', 'amount_tg:non_negative']\n\ndef run_tests(df, config):\n    return []\n\nfailed = run_tests(model, config)\n",
   "solution": "import pandas as pd\nmodel = pd.DataFrame({'order_id': [1, 2, 2, 4],\n                      'city': ['Алматы', None, 'Астана', 'Шымкент'],\n                      'amount_tg': [1000, -50, 300, 700]})\nconfig = ['order_id:unique', 'order_id:not_null', 'city:not_null',\n          'amount_tg:not_null', 'amount_tg:non_negative']\n\ndef run_tests(df, config):\n    failed = []\n    for item in config:\n        col, test = item.split(':')\n        s = df[col]\n        if test == 'not_null':\n            ok = s.notna().all()\n        elif test == 'unique':\n            ok = s.dropna().duplicated().sum() == 0\n        elif test == 'non_negative':\n            ok = (s.dropna() >= 0).all()\n        else:\n            raise ValueError(f'Белгісіз тест: {test}')\n        if not ok:\n            failed.append(item)\n    return failed\n\nfailed = run_tests(model, config)\nprint(failed)\n",
   "hints": [
    "Әр жолды бөліңіз: <code>col, test = item.split(':')</code>.",
    "<code>if/elif</code> арқылы үш тест, қалғанында <code>raise ValueError(...)</code>."
   ],
   "check": {
    "tests": "assert failed == ['order_id:unique', 'city:not_null', 'amount_tg:non_negative'], f'Үш тест құлайды (бастапқы ретпен). Сізде {failed}'\n_good = pd.DataFrame({'order_id': [1, 2], 'amount_tg': [10, 0]})\nassert run_tests(_good, ['order_id:unique', 'amount_tg:non_negative']) == [], 'Таза кестеде құлаған тест жоқ'\n_ok = False\ntry:\n    run_tests(_good, ['order_id:positive'])\nexcept ValueError:\n    _ok = True\nassert _ok, 'Белгісіз тест болса ValueError көтеріңіз'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Модельдерді құрастыру реті",
   "prompt": "<p>dbt <code>ref()</code>-тен DAG құрып, модельдерді дұрыс ретпен жасайды. <code>build_order(models)</code> функциясын жазыңыз: әр модельдің ref-терін SQL-ден тауып, тәуелділіктері дайын модельдердің ішінен алфавит ретімен біреуін таңдап, құрастыру ретін қайтарсын. Цикл болса <code>ValueError</code> көтерсін.</p>",
   "starter": "models = {\n    'stg_orders': \"select * from raw.orders\",\n    'stg_customers': \"select * from raw.customers\",\n    'paid_orders': \"select order_id, customer_id, amount_tg from {{ ref('stg_orders') }} where status = 'paid'\",\n    'city_revenue': \"select c.city, sum(p.amount_tg) from {{ ref('paid_orders') }} p join {{ ref('stg_customers') }} c using (customer_id) group by c.city\",\n    'customer_ltv': \"select customer_id, sum(amount_tg) from {{ ref('paid_orders') }} group by customer_id\",\n}\n\ndef build_order(models):\n    return sorted(models)\n",
   "solution": "models = {\n    'stg_orders': \"select * from raw.orders\",\n    'stg_customers': \"select * from raw.customers\",\n    'paid_orders': \"select order_id, customer_id, amount_tg from {{ ref('stg_orders') }} where status = 'paid'\",\n    'city_revenue': \"select c.city, sum(p.amount_tg) from {{ ref('paid_orders') }} p join {{ ref('stg_customers') }} c using (customer_id) group by c.city\",\n    'customer_ltv': \"select customer_id, sum(amount_tg) from {{ ref('paid_orders') }} group by customer_id\",\n}\ndef refs(sql):\n    out = []\n    for part in sql.split(\"ref('\")[1:]:\n        out.append(part.split(\"'\")[0])\n    return out\n\ndef build_order(models):\n    deps = {name: refs(sql) for name, sql in models.items()}\n    done = []\n    while len(done) < len(deps):\n        ready = sorted(m for m in deps if m not in done and all(d in done for d in deps[m]))\n        if not ready:\n            raise ValueError('Модельдер арасында цикл бар')\n        done.append(ready[0])\n    return done\n\nprint(build_order(models))\n",
   "hints": [
    "Алдымен <code>deps = {name: refs(sql) for name, sql in models.items()}</code>.",
    "Дайын модель: <code>all(d in done for d in deps[m])</code>; дайын ештеңе жоқ болса — цикл."
   ],
   "check": {
    "tests": "_b = build_order(models)\nassert _b == ['stg_customers', 'stg_orders', 'paid_orders', 'city_revenue', 'customer_ltv'], f'Құрастыру реті қате: {_b}'\nassert build_order({'b': \"select * from {{ ref('a') }}\", 'a': 'select 1'}) == ['a', 'b'], 'a алдымен құрылуы керек'\n_ok = False\ntry:\n    build_order({'x': \"select * from {{ ref('y') }}\", 'y': \"select * from {{ ref('x') }}\"})\nexcept ValueError:\n    _ok = True\nassert _ok, 'Цикл болса ValueError көтеріңіз'"
   }
  }
 ],
 "deng-7": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бөліктер саны",
   "prompt": "<p><code>n_chunks(n_rows, chunksize)</code> функциясын жазыңыз: <code>chunksize</code>-пен оқығанда неше бөлік болатынын қайтарсын. Соңғы толмаған бөлік те саналады.</p>",
   "starter": "def n_chunks(n_rows, chunksize):\n    return n_rows // chunksize\n",
   "solution": "def n_chunks(n_rows, chunksize):\n    return (n_rows + chunksize - 1) // chunksize\n\nprint(n_chunks(10, 3))\n",
   "hints": [
    "Жоғары қарай дөңгелектеу: <code>(n_rows + chunksize - 1) // chunksize</code>.",
    "Немесе <code>math.ceil(n_rows / chunksize)</code>."
   ],
   "check": {
    "tests": "assert n_chunks(10, 3) == 4, '10 жол, chunksize=3 → 4 бөлік'\nassert n_chunks(9, 3) == 3, '9 жол, chunksize=3 → 3 бөлік'\nassert n_chunks(1, 100) == 1, '1 жол → 1 бөлік'\nassert n_chunks(1_000_000, 100_000) == 10, '1 млн жол, 100 мың → 10 бөлік'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жадқа сыя ма",
   "prompt": "<p>Кесте жадта қанша орын алатынын бағалаңыз. <code>needed_gb(rows, cols, bytes_per_value=8)</code> — қажетті көлем GB-мен (1 GB = 1024³ байт). <code>fits(rows, cols, ram_gb)</code> — көлем <code>ram_gb</code>-тен аспаса <code>True</code>.</p>",
   "starter": "def needed_gb(rows, cols, bytes_per_value=8):\n    return 0\n\ndef fits(rows, cols, ram_gb):\n    return True\n",
   "solution": "def needed_gb(rows, cols, bytes_per_value=8):\n    return rows * cols * bytes_per_value / 1024 ** 3\n\ndef fits(rows, cols, ram_gb):\n    return needed_gb(rows, cols) <= ram_gb\n\nprint(needed_gb(200_000_000, 20), fits(200_000_000, 20, 16))\n",
   "hints": [
    "Байт: <code>rows * cols * bytes_per_value</code>, GB-ға: <code>/ 1024 ** 3</code>.",
    "<code>fits</code> ішінде <code>needed_gb(rows, cols) &lt;= ram_gb</code>."
   ],
   "check": {
    "tests": "assert abs(needed_gb(1024 ** 3, 1) - 8) < 1e-9, '1024³ жол × 1 баған × 8 байт = 8 GB'\nassert abs(needed_gb(1024 ** 3, 2, 4) - 8) < 1e-9, 'float32 (4 байт) екі есе аз орын алады'\nassert not fits(200_000_000, 20, 16), '200 млн × 20 баған ≈ 29.8 GB — 16 GB-қа сыймайды'\nassert fits(10_000_000, 20, 16), '10 млн × 20 баған ≈ 1.5 GB — сыяды'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Lazy немесе action",
   "prompt": "<p>Spark-та transformations lazy, ал action есептеуді іске қосады. <code>op_kind(op)</code> функциясын жазыңыз: <code>'count'</code>, <code>'collect'</code>, <code>'write'</code>, <code>'show'</code> үшін <code>'action'</code>, қалғандары үшін <code>'transformation'</code> қайтарсын. Сосын <code>first_action</code> — <code>plan</code> тізіміндегі бірінші action-ның индексі.</p>",
   "starter": "plan = ['read', 'filter', 'groupBy', 'agg', 'write', 'count']\n\ndef op_kind(op):\n    return 'transformation'\n\nfirst_action = None\n",
   "solution": "plan = ['read', 'filter', 'groupBy', 'agg', 'write', 'count']\n\ndef op_kind(op):\n    if op in ('count', 'collect', 'write', 'show'):\n        return 'action'\n    return 'transformation'\n\nfirst_action = [op_kind(o) for o in plan].index('action')\nprint(first_action)\n",
   "hints": [
    "<code>if op in ('count', 'collect', 'write', 'show'): return 'action'</code>.",
    "<code>[op_kind(o) for o in plan].index('action')</code>."
   ],
   "check": {
    "tests": "assert op_kind('filter') == 'transformation' and op_kind('groupBy') == 'transformation', 'filter, groupBy — transformation'\nassert op_kind('count') == 'action' and op_kind('write') == 'action', 'count, write — action'\nassert op_kind('collect') == 'action', 'collect — action'\nassert first_action == 4, f\"Бірінші action — 'write', индексі 4. Сізде {first_action}\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Статустарды бөліктеп санау",
   "prompt": "<p><code>deng_raw_sales.csv</code>-ты <code>chunksize=4</code>-пен оқып, әр статустың санын <code>counts</code> dict-іне жинаңыз (map → combine). Сосын <code>n</code> — өңделген бөліктер саны.</p>",
   "starter": "import pandas as pd\ncounts = {}\nn = 0\n",
   "solution": "import pandas as pd\ncounts = {}\nn = 0\nfor chunk in pd.read_csv('deng_raw_sales.csv', chunksize=4):\n    n += 1\n    for status, v in chunk['status'].value_counts().items():\n        counts[status] = counts.get(status, 0) + int(v)\nprint(counts, n)\n",
   "hints": [
    "<code>for chunk in pd.read_csv('deng_raw_sales.csv', chunksize=4):</code>.",
    "Әр бөлікте <code>chunk['status'].value_counts()</code>, сосын <code>counts.get(status, 0) + v</code>."
   ],
   "check": {
    "tests": "assert n == 3, f'10 жол, chunksize=4 → 3 бөлік. Сізде {n}'\nassert {k: int(v) for k, v in counts.items()} == {'paid': 7, 'cancelled': 2, 'pending': 1}, f'paid=7, cancelled=2, pending=1. Сізде {counts}'",
    "mustInclude": [
     "chunksize"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қала бойынша максимум",
   "prompt": "<p><code>max</code> да бөліктеп есептеледі. <code>deng_raw_sales.csv</code>-ты <code>chunksize=3</code>-пен оқып, қаланы <code>.str.strip().str.capitalize()</code> арқылы тазалаңыз да, әр қаладағы ең үлкен <code>amount_tg</code>-ны <code>maxes</code> dict-іне жинаңыз (барлық статус).</p>",
   "starter": "import pandas as pd\nmaxes = {}\n",
   "solution": "import pandas as pd\nmaxes = {}\nfor chunk in pd.read_csv('deng_raw_sales.csv', chunksize=3):\n    chunk['city'] = chunk['city'].str.strip().str.capitalize()\n    for city, v in chunk.groupby('city')['amount_tg'].max().items():\n        maxes[city] = max(maxes.get(city, v), v)\nprint(maxes)\n",
   "hints": [
    "Әр бөлікте <code>chunk.groupby('city')['amount_tg'].max()</code>.",
    "Біріктіру: <code>maxes[city] = max(maxes.get(city, v), v)</code>."
   ],
   "check": {
    "tests": "assert sorted(maxes) == ['Алматы', 'Астана', 'Шымкент'], f'Үш тазаланған қала болуы керек, сізде {sorted(maxes)}'\nassert int(maxes['Алматы']) == 149000, f\"Алматы максимумы 149 000 ₸, сізде {maxes['Алматы']}\"\nassert int(maxes['Астана']) == 117500 and int(maxes['Шымкент']) == 18900, 'Астана 117 500 ₸, Шымкент 18 900 ₸'",
    "mustInclude": [
     "chunksize"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Кілт бойынша бөлу",
   "prompt": "<p>Spark деректі кілт бойынша partition-дарға бөледі: бір кілт әрқашан бір partition-ға түседі. <code>partition_of(key, n)</code> — <code>key % n</code>. <code>deng_orders.csv</code>-тағы әр жолды <code>customer_id</code> бойынша 3 partition-ға бөліп, <code>sizes</code> тізіміне әр partition-дағы жол санын жазыңыз (0, 1, 2 ретімен).</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('deng_orders.csv')\n\ndef partition_of(key, n):\n    return 0\n\nsizes = [0, 0, 0]\n",
   "solution": "import pandas as pd\norders = pd.read_csv('deng_orders.csv')\n\ndef partition_of(key, n):\n    return key % n\n\nparts = orders['customer_id'].apply(lambda k: partition_of(k, 3))\nsizes = [int((parts == p).sum()) for p in range(3)]\nprint(sizes)\n",
   "hints": [
    "<code>orders['customer_id'].apply(lambda k: partition_of(k, 3))</code>.",
    "<code>[int((parts == p).sum()) for p in range(3)]</code>."
   ],
   "check": {
    "tests": "assert partition_of(7, 3) == 1 and partition_of(6, 3) == 0, 'partition_of(7, 3) = 1'\nassert [int(x) for x in sizes] == [3, 5, 4], f'Partition өлшемдері [3, 5, 4], сізде {sizes}'\nassert sum(sizes) == 12, 'Барлық 12 жол бөлінуі керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Бөліктеп орташа чек",
   "prompt": "<p>Орташа бөліктердің орташасы емес: сома мен санды жинау керек. <code>deng_raw_sales.csv</code>-ты <code>chunksize=3</code>-пен оқып, қаланы тазалаңыз, тек <code>'paid'</code> жолдарын алыңыз. Әр қала үшін сома мен санды жинап, <code>avg</code> dict-іне орташа чекті жазыңыз.</p>",
   "starter": "import pandas as pd\navg = {}\n",
   "solution": "import pandas as pd\nsums, cnts = {}, {}\nfor chunk in pd.read_csv('deng_raw_sales.csv', chunksize=3):\n    chunk['city'] = chunk['city'].str.strip().str.capitalize()\n    chunk = chunk[chunk['status'] == 'paid']\n    for city, g in chunk.groupby('city'):\n        sums[city] = sums.get(city, 0) + g['amount_tg'].sum()\n        cnts[city] = cnts.get(city, 0) + len(g)\navg = {city: sums[city] / cnts[city] for city in sums}\nprint(avg)\n",
   "hints": [
    "Әр бөлікте тазалау және <code>chunk[chunk['status'] == 'paid']</code>.",
    "Екі dict: <code>sums</code> және <code>cnts</code>; соңында <code>sums[city] / cnts[city]</code>."
   ],
   "check": {
    "tests": "assert sorted(avg) == ['Алматы', 'Астана', 'Шымкент'], f'Үш қала болуы керек, сізде {sorted(avg)}'\nassert abs(float(avg['Алматы']) - 66050) < 1e-6, f\"Алматы: 264 200 / 4 = 66 050 ₸, сізде {avg['Алматы']}\"\nassert abs(float(avg['Астана']) - 117500) < 1e-6, 'Астана: 117 500 / 1'\nassert abs(float(avg['Шымкент']) - 11700) < 1e-6, 'Шымкент: 23 400 / 2 = 11 700 ₸'",
    "mustInclude": [
     "chunksize"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Broadcast join бөліктеп",
   "prompt": "<p>Spark кіші dimension кестесін әр машинаға жібереді (<b>broadcast join</b>). Осыны қайталаңыз: <code>deng_products.csv</code>-ты толық оқыңыз, ал <code>deng_orders.csv</code>-ты <code>chunksize=5</code>-пен оқып, әр бөлікті products-пен қосыңыз. <code>revenue = qty * price_tg</code>. <code>by_cat</code> dict-іне санат бойынша түсімді, <code>n</code>-ге бөліктер санын жазыңыз.</p>",
   "starter": "import pandas as pd\nproducts = pd.read_csv('deng_products.csv')\nby_cat = {}\nn = 0\n",
   "solution": "import pandas as pd\nproducts = pd.read_csv('deng_products.csv')\nby_cat = {}\nn = 0\nfor chunk in pd.read_csv('deng_orders.csv', chunksize=5):\n    n += 1\n    m = chunk.merge(products, on='product_id')\n    m['revenue'] = m['qty'] * m['price_tg']\n    for cat, v in m.groupby('category')['revenue'].sum().items():\n        by_cat[cat] = by_cat.get(cat, 0) + int(v)\nprint(by_cat, n)\n",
   "hints": [
    "Әр бөлікте <code>chunk.merge(products, on='product_id')</code>.",
    "Санат бойынша: <code>m.groupby('category')['revenue'].sum()</code>, сосын dict-ке қосу."
   ],
   "check": {
    "tests": "assert n == 3, f'12 жол, chunksize=5 → 3 бөлік. Сізде {n}'\nassert {k: int(v) for k, v in by_cat.items()} == {'electronics': 381700, 'home': 182700, 'books': 36000}, f'electronics 381 700, home 182 700, books 36 000 ₸. Сізде {by_cat}'\nassert sum(int(v) for v in by_cat.values()) == 600400, 'Жалпы түсім 600 400 ₸'",
    "mustInclude": [
     "chunksize",
     "merge"
    ]
   }
  }
 ],
 "deng-8": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Сақтау құны",
   "prompt": "<p>Lake-те сақтау айына GB үшін шамамен $0.023 тұрады. <code>storage_cost(gb, months=1, price_per_gb=0.023)</code> функциясын жазыңыз: сақтау шотын қайтарсын. Сосын <code>yearly</code> — 2 000 GB деректің бір жылдық (12 ай) құны.</p>",
   "starter": "def storage_cost(gb, months=1, price_per_gb=0.023):\n    return 0\n\nyearly = None\n",
   "solution": "def storage_cost(gb, months=1, price_per_gb=0.023):\n    return gb * months * price_per_gb\n\nyearly = storage_cost(2000, months=12)\nprint(yearly)\n",
   "hints": [
    "Шот: <code>gb * months * price_per_gb</code>.",
    "<code>yearly = storage_cost(2000, months=12)</code>."
   ],
   "check": {
    "tests": "assert abs(storage_cost(1000) - 23.0) < 1e-9, '1 000 GB бір айға = $23'\nassert abs(storage_cost(100, months=3, price_per_gb=0.004) - 1.2) < 1e-9, 'Архив бағасымен: 100 × 3 × 0.004 = $1.2'\nassert yearly is not None and abs(float(yearly) - 552.0) < 1e-9, f'2 000 GB × 12 ай × 0.023 = $552, сізде {yearly}'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Кластер шоты",
   "prompt": "<p>Жұмыс уақыты бойынша баға моделі: кластер қанша сағат қосулы тұрса, сонша ақша. <code>cluster_cost(nodes, hours, price_per_node_hour)</code> функциясын жазыңыз. Сосын <code>monthly</code> — 10 node-тан тұратын кластер күніне 3 сағат, $0.5/сағ бағамен 30 күн жұмыс істегендегі шот.</p>",
   "starter": "def cluster_cost(nodes, hours, price_per_node_hour):\n    return nodes * price_per_node_hour\n\nmonthly = None\n",
   "solution": "def cluster_cost(nodes, hours, price_per_node_hour):\n    return nodes * hours * price_per_node_hour\n\nmonthly = cluster_cost(10, 3, 0.5) * 30\nprint(monthly)\n",
   "hints": [
    "Шот: <code>nodes * hours * price_per_node_hour</code>.",
    "Айлық: күнделікті шотты 30-ға көбейтіңіз."
   ],
   "check": {
    "tests": "assert abs(cluster_cost(10, 3, 0.5) - 15.0) < 1e-9, '10 node × 3 сағ × $0.5 = $15'\nassert abs(cluster_cost(4, 24, 1.0) - 96.0) < 1e-9, '4 node × 24 сағ × $1 = $96'\nassert monthly is not None and abs(float(monthly) - 450.0) < 1e-9, f'Айлық шот $450, сізде {monthly}'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Сервис баламасы",
   "prompt": "<p>Сабақтағы кестеден AWS сервистерін Google Cloud баламасына аударатын <code>to_gcp</code> dict-ін жасаңыз: <code>S3</code>, <code>Redshift</code>, <code>EC2</code>, <code>Lambda</code>, <code>EMR</code>. Сосын <code>translate(services)</code> — тізімді аударсын, белгісіз сервис үшін <code>'?'</code> қойсын.</p>",
   "starter": "to_gcp = {}\n\ndef translate(services):\n    return services\n",
   "solution": "to_gcp = {'S3': 'GCS', 'Redshift': 'BigQuery', 'EC2': 'Compute Engine',\n          'Lambda': 'Cloud Functions', 'EMR': 'Dataproc'}\n\ndef translate(services):\n    return [to_gcp.get(s, '?') for s in services]\n\nprint(translate(['S3', 'EMR', 'Redshift']))\n",
   "hints": [
    "Lake: S3 → GCS, warehouse: Redshift → BigQuery, managed Spark: EMR → Dataproc.",
    "<code>[to_gcp.get(s, '?') for s in services]</code>."
   ],
   "check": {
    "tests": "assert to_gcp.get('S3') == 'GCS' and to_gcp.get('Redshift') == 'BigQuery', 'S3 → GCS, Redshift → BigQuery'\nassert to_gcp.get('EMR') == 'Dataproc' and to_gcp.get('Lambda') == 'Cloud Functions', 'EMR → Dataproc, Lambda → Cloud Functions'\nassert to_gcp.get('EC2') == 'Compute Engine', 'EC2 → Compute Engine'\nassert translate(['S3', 'EMR', 'Kinesis']) == ['GCS', 'Dataproc', '?'], \"Белгісіз сервис → '?'\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Сүзгімен сканер көлемі",
   "prompt": "<p>Кесте күн бойынша партицияланған және бағандап сақталады. <code>scanned_gb(total_gb, days_total, days_query, col_share)</code> функциясын жазыңыз: партиция сүзгісі мен баған таңдауынан кейін сканерленетін көлемді қайтарсын. Сосын <code>scan_cost(gb, price_per_tb=6.25)</code> (1 TB = 1024 GB) және <code>saving</code> — 730 GB, 365 күндік кестеде <code>SELECT *</code> (барлық күн, барлық баған) мен 7 күн, 10% бағанды оқитын сұрау шотының айырмасы.</p>",
   "starter": "def scanned_gb(total_gb, days_total, days_query, col_share):\n    return total_gb\n\ndef scan_cost(gb, price_per_tb=6.25):\n    return 0\n\nsaving = None\n",
   "solution": "def scanned_gb(total_gb, days_total, days_query, col_share):\n    return total_gb / days_total * days_query * col_share\n\ndef scan_cost(gb, price_per_tb=6.25):\n    return gb / 1024 * price_per_tb\n\nsaving = scan_cost(730) - scan_cost(scanned_gb(730, 365, 7, 0.1))\nprint(scanned_gb(730, 365, 7, 0.1), saving)\n",
   "hints": [
    "Сканер: <code>total_gb / days_total * days_query * col_share</code>.",
    "Шот: <code>gb / 1024 * price_per_tb</code>; айырма: толық сканер минус сүзгілі сканер."
   ],
   "check": {
    "tests": "assert abs(scanned_gb(730, 365, 7, 0.1) - 1.4) < 1e-9, '730 / 365 × 7 × 0.1 = 1.4 GB'\nassert abs(scanned_gb(730, 365, 365, 1.0) - 730) < 1e-9, 'Сүзгісіз — бүкіл кесте'\nassert abs(scan_cost(1024) - 6.25) < 1e-9, '1 TB = $6.25'\nassert saving is not None and abs(float(saving) - (728.6 / 1024 * 6.25)) < 1e-6, f'Айырма ≈ $4.45, сізде {saving}'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бос тұрған кластер",
   "prompt": "<p>Ұмыт қалған кластер түнде де ақша жейді. <code>idle_cost(nodes, price, hours_on, hours_used, days=30)</code> функциясын жазыңыз: кластер қосулы, бірақ жұмыссыз тұрған сағаттардың айлық құнын қайтарсын. Сосын <code>idle_share</code> — 8 node, $0.6/сағ, тәулік бойы қосулы, бірақ күніне 6 сағат қолданылатын кластердің шотындағы бос тұрудың үлесі (0..1).</p>",
   "starter": "def idle_cost(nodes, price, hours_on, hours_used, days=30):\n    return 0\n\nidle_share = None\n",
   "solution": "def idle_cost(nodes, price, hours_on, hours_used, days=30):\n    return nodes * price * (hours_on - hours_used) * days\n\ntotal = 8 * 0.6 * 24 * 30\nidle_share = idle_cost(8, 0.6, 24, 6) / total\nprint(idle_cost(8, 0.6, 24, 6), idle_share)\n",
   "hints": [
    "Бос сағаттар: <code>hours_on - hours_used</code>; шот: <code>nodes * price * бос_сағат * days</code>.",
    "Жалпы шот: <code>8 * 0.6 * 24 * 30</code>; үлесі — бөлу."
   ],
   "check": {
    "tests": "assert abs(idle_cost(8, 0.6, 24, 6) - 2592.0) < 1e-6, '8 × 0.6 × 18 сағ × 30 күн = $2 592'\nassert abs(idle_cost(2, 1.0, 10, 10) - 0) < 1e-9, 'Барлық уақыт қолданылса, бос тұру жоқ'\nassert abs(idle_cost(1, 1.0, 5, 1, days=7) - 28.0) < 1e-9, '1 × 1 × 4 × 7 = $28'\nassert idle_share is not None and abs(float(idle_share) - 0.75) < 1e-9, f'24 сағаттың 18-і бос → 0.75, сізде {idle_share}'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Parquet үнемі",
   "prompt": "<p>CSV-ден Parquet-ке көшкенде файл <code>ratio</code> есе кішірейеді және тек керек бағандар оқылады. <code>monthly_saving(csv_gb, ratio, cols_read, cols_total, queries, price_per_tb=6.25)</code> функциясын жазыңыз: CSV-ді толық оқитын <code>queries</code> сұраудың шоты мен Parquet-тегі шоттың айырмасын қайтарсын (1 TB = 1024 GB). Сосын <code>saving</code> — 1 200 GB CSV, 6 есе сығу, 40 бағанның 4-і, айына 100 сұрау.</p>",
   "starter": "def monthly_saving(csv_gb, ratio, cols_read, cols_total, queries, price_per_tb=6.25):\n    return 0\n\nsaving = None\n",
   "solution": "def monthly_saving(csv_gb, ratio, cols_read, cols_total, queries, price_per_tb=6.25):\n    csv_cost = csv_gb * queries / 1024 * price_per_tb\n    pq_gb = csv_gb / ratio * cols_read / cols_total\n    pq_cost = pq_gb * queries / 1024 * price_per_tb\n    return csv_cost - pq_cost\n\nsaving = monthly_saving(1200, 6, 4, 40, 100)\nprint(saving)\n",
   "hints": [
    "Parquet-те бір сұрау: <code>csv_gb / ratio * cols_read / cols_total</code> GB.",
    "Әр шот: <code>gb * queries / 1024 * price_per_tb</code>."
   ],
   "check": {
    "tests": "assert abs(monthly_saving(1024, 1, 10, 10, 1) - 0) < 1e-9, 'Сығусыз, барлық баған — үнем жоқ'\nassert abs(monthly_saving(1024, 2, 10, 10, 1) - 3.125) < 1e-9, '2 есе сығу: $6.25 - $3.125'\nassert saving is not None and abs(float(saving) - 720.21484375) < 1e-6, f'Үнем ≈ $720.21, сізде {saving}'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Айлық шот және бюджет",
   "prompt": "<p>Команданың айлық шотын құрыңыз. <code>items</code> — үш түрлі шығын. <code>item_cost(item)</code> функциясы түріне қарай есептесін: <code>'storage'</code> — <code>gb × 0.023</code>; <code>'cluster'</code> — <code>nodes × hours × price × days</code>; <code>'bigquery'</code> — <code>gb_scanned / 1024 × 6.25</code>; белгісіз түр — <code>ValueError</code>. Сосын <code>bill</code> (<code>{name: құны}</code>), <code>total</code>, <code>over_budget</code> (<code>total &gt; BUDGET</code>) және <code>overage</code> (бюджеттен асқан сома, аспаса 0).</p>",
   "starter": "BUDGET = 600\nitems = [\n    {'name': 'lake', 'kind': 'storage', 'gb': 2000},\n    {'name': 'spark', 'kind': 'cluster', 'nodes': 6, 'hours': 4, 'price': 0.5, 'days': 30},\n    {'name': 'dashboards', 'kind': 'bigquery', 'gb_scanned': 40960},\n]\n\ndef item_cost(item):\n    return 0\n\nbill = {}\ntotal = 0\nover_budget = False\noverage = 0\n",
   "solution": "BUDGET = 600\nitems = [\n    {'name': 'lake', 'kind': 'storage', 'gb': 2000},\n    {'name': 'spark', 'kind': 'cluster', 'nodes': 6, 'hours': 4, 'price': 0.5, 'days': 30},\n    {'name': 'dashboards', 'kind': 'bigquery', 'gb_scanned': 40960},\n]\n\ndef item_cost(item):\n    kind = item['kind']\n    if kind == 'storage':\n        return item['gb'] * 0.023\n    if kind == 'cluster':\n        return item['nodes'] * item['hours'] * item['price'] * item['days']\n    if kind == 'bigquery':\n        return item['gb_scanned'] / 1024 * 6.25\n    raise ValueError(f'Белгісіз түр: {kind}')\n\nbill = {it['name']: item_cost(it) for it in items}\ntotal = sum(bill.values())\nover_budget = total > BUDGET\noverage = max(0, total - BUDGET)\nprint(bill, total, over_budget, overage)\n",
   "hints": [
    "<code>item_cost</code> ішінде <code>if kind == ...: return ...</code>, соңында <code>raise ValueError(...)</code>.",
    "<code>overage = max(0, total - BUDGET)</code>."
   ],
   "check": {
    "tests": "assert abs(bill['lake'] - 46.0) < 1e-6 and abs(bill['spark'] - 360.0) < 1e-6, 'lake = $46, spark = $360'\nassert abs(bill['dashboards'] - 250.0) < 1e-6, 'dashboards: 40 960 GB = 40 TB × $6.25 = $250'\nassert abs(float(total) - 656.0) < 1e-6, f'Жалпы шот $656, сізде {total}'\nassert over_budget == True and abs(float(overage) - 56.0) < 1e-6, 'Бюджет $600 → $56 асып кетті'\n_ok = False\ntry:\n    item_cost({'name': 'x', 'kind': 'gpu'})\nexcept ValueError:\n    _ok = True\nassert _ok, 'Белгісіз түр болса ValueError көтеріңіз'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ең қымбат пайдаланушылар",
   "prompt": "<p>BigQuery сұраулар журналы <code>log</code> берілген. Әр сұраудың құнын (<code>gb_scanned / 1024 × 6.25</code>) <code>cost_usd</code> бағанына есептеп, <code>report</code> DataFrame-ін жасаңыз: бағандары <code>user</code>, <code>queries</code> (саны), <code>cost_usd</code> (қосынды); құн бойынша кемуімен сұрыпталған, индексі 0-ден. Сосын <code>top_share</code> — бірінші пайдаланушының жалпы шоттағы үлесі, 3 таңбаға дөңгелектелген.</p>",
   "starter": "import pandas as pd\nlog = pd.DataFrame({\n    'user': ['aigerim', 'daniyar', 'aigerim', 'meruert', 'daniyar', 'aigerim', 'meruert'],\n    'gb_scanned': [2048, 512, 1024, 128, 1536, 512, 256],\n})\nreport = None\ntop_share = None\n",
   "solution": "import pandas as pd\nlog = pd.DataFrame({\n    'user': ['aigerim', 'daniyar', 'aigerim', 'meruert', 'daniyar', 'aigerim', 'meruert'],\n    'gb_scanned': [2048, 512, 1024, 128, 1536, 512, 256],\n})\nlog['cost_usd'] = log['gb_scanned'] / 1024 * 6.25\nreport = (log.groupby('user', as_index=False)\n             .agg(queries=('gb_scanned', 'count'), cost_usd=('cost_usd', 'sum'))\n             .sort_values('cost_usd', ascending=False)\n             .reset_index(drop=True))\ntop_share = round(report['cost_usd'].iloc[0] / report['cost_usd'].sum(), 3)\nprint(report, top_share)\n",
   "hints": [
    "<code>log['cost_usd'] = log['gb_scanned'] / 1024 * 6.25</code>, сосын <code>groupby('user', as_index=False).agg(...)</code>.",
    "Үлес: <code>round(report['cost_usd'].iloc[0] / report['cost_usd'].sum(), 3)</code>."
   ],
   "check": {
    "tests": "assert report is not None and list(report.columns) == ['user', 'queries', 'cost_usd'], 'Бағандар: user, queries, cost_usd'\nassert list(report['user']) == ['aigerim', 'daniyar', 'meruert'], f\"Рет: aigerim, daniyar, meruert. Сізде {list(report['user'])}\"\nassert [int(x) for x in report['queries']] == [3, 2, 2], 'Сұрау саны: 3, 2, 2'\nassert [round(float(x), 5) for x in report['cost_usd']] == [21.875, 12.5, 2.34375], 'Құн: $21.875, $12.5, $2.34375'\nassert top_share is not None and abs(float(top_share) - 0.596) < 1e-9, f'21.875 / 36.71875 ≈ 0.596, сізде {top_share}'"
   }
  }
 ]
});
