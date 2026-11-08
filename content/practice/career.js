// Practice tasks after the lessons of m7-1. Each lesson's list opens one task at a time.
DJ.addPractice('m7-1', {
 "cr-5": [
  {
   "type": "sql",
   "dataset": "staff",
   "level": "easy",
   "xp": 10,
   "title": "Ең жоғары жалақы иесі",
   "prompt": "<p>Компаниядағы ең жоғары жалақы алатын қызметкер(лер): <code>name</code>, <code>salary</code>. Ішкі сұрау қолданыңыз.</p>",
   "starter": "",
   "solution": "SELECT name, salary FROM employees WHERE salary = (SELECT MAX(salary) FROM employees);",
   "hints": [
    "<code>WHERE salary = (SELECT MAX(salary) FROM employees)</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "staff",
   "level": "easy",
   "xp": 10,
   "title": "Ең төменгі екінші жалақы",
   "prompt": "<p>Төменнен санағанда екінші (бірегей) жалақыны шығарыңыз: <code>second_lowest</code>.</p>",
   "starter": "",
   "solution": "SELECT MIN(salary) AS second_lowest FROM employees WHERE salary > (SELECT MIN(salary) FROM employees);",
   "hints": [
    "Сабақтағы (а) тәсіл, бірақ <code>MIN</code> және <code>&gt;</code>."
   ]
  },
  {
   "type": "sql",
   "dataset": "staff",
   "level": "easy",
   "xp": 10,
   "title": "Компаниядағы бірдей жалақылар",
   "prompt": "<p>Компания бойынша (бөлімге қарамай) бірнеше адам алатын жалақылар: <code>salary</code>, <code>cnt</code>.</p>",
   "starter": "",
   "solution": "SELECT salary, COUNT(*) AS cnt FROM employees GROUP BY salary HAVING COUNT(*) > 1;",
   "hints": [
    "<code>GROUP BY salary HAVING COUNT(*) &gt; 1</code>"
   ],
   "check": {
    "mustInclude": [
     "HAVING"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "staff",
   "level": "medium",
   "xp": 15,
   "title": "Үшінші ең жоғары жалақы",
   "prompt": "<p>Үшінші ең жоғары <b>бірегей</b> жалақыны <code>DISTINCT</code> және <code>LIMIT/OFFSET</code> арқылы шығарыңыз: <code>third_salary</code>.</p>",
   "starter": "",
   "solution": "SELECT DISTINCT salary AS third_salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 2;",
   "hints": [
    "<code>OFFSET 2</code> алғашқы екі мәнді өткізіп жібереді.",
    "<code>DISTINCT</code>-сіз тең жалақылар орынды «жеп қояды»."
   ],
   "check": {
    "mustInclude": [
     "OFFSET",
     "DISTINCT"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "staff",
   "level": "medium",
   "xp": 15,
   "title": "Екінші орындағы адам",
   "prompt": "<p>Екінші ең жоғары (бірегей) жалақыны алатын қызметкерлер: <code>name</code>, <code>department</code>, <code>salary</code>.</p>",
   "starter": "",
   "solution": "SELECT name, department, salary FROM employees WHERE salary = (SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees));",
   "hints": [
    "Сабақтағы «екінші жалақы» сұрауын ішкі сұрау етіп салыңыз: <code>WHERE salary = (...)</code>."
   ]
  },
  {
   "type": "sql",
   "dataset": "staff",
   "level": "medium",
   "xp": 15,
   "title": "Дубликат жолдардың өзі",
   "prompt": "<p>Бір бөлімде бірдей жалақы алатын қызметкерлердің өзін шығарыңыз: <code>name</code>, <code>department</code>, <code>salary</code>. Топтарды табатын сұрауды ішкі сұрау етіп, <code>JOIN</code> жасаңыз.</p>",
   "starter": "",
   "solution": "SELECT e.name, e.department, e.salary FROM employees e JOIN (SELECT department, salary FROM employees GROUP BY department, salary HAVING COUNT(*) > 1) d ON d.department = e.department AND d.salary = e.salary;",
   "hints": [
    "Ішкі сұрау: <code>GROUP BY department, salary HAVING COUNT(*) &gt; 1</code>.",
    "JOIN шарты екі баған бойынша: <code>ON d.department = e.department AND d.salary = e.salary</code>."
   ],
   "check": {
    "mustInclude": [
     "HAVING"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "staff",
   "level": "hard",
   "xp": 20,
   "title": "Бөлімнің екінші жалақысы",
   "prompt": "<p>Шеттік жағдайды көрсетіңіз: <b>әр</b> бөлім үшін <code>department</code> және <code>second_salary</code> (бөлімдегі екінші бірегей жалақы). Бір ғана жалақы деңгейі бар бөлімде <code>NULL</code> шықсын. Корреляциялы ішкі сұрау қолданыңыз.</p>",
   "starter": "",
   "solution": "SELECT DISTINCT e.department, (SELECT MAX(e2.salary) FROM employees e2 WHERE e2.department = e.department AND e2.salary < (SELECT MAX(e3.salary) FROM employees e3 WHERE e3.department = e.department)) AS second_salary FROM employees e;",
   "hints": [
    "Сабақтағы (а) тәсілді бөлім ішінде қайталаңыз: ішкі сұрауларға <code>WHERE e2.department = e.department</code> қосыңыз.",
    "<code>MAX</code> бос жиында <code>NULL</code> береді."
   ]
  },
  {
   "type": "sql",
   "dataset": "staff",
   "level": "hard",
   "xp": 20,
   "title": "N-ші жалақыны санап табу",
   "prompt": "<p>Window function-сыз <b>үшінші</b> ең жоғары бірегей жалақы алатын қызметкерлер: <code>name</code>, <code>salary</code>. Идея: өз жалақысынан жоғары бірегей жалақылар дәл 2 болатын адамдар.</p>",
   "starter": "",
   "solution": "SELECT name, salary FROM employees e WHERE (SELECT COUNT(DISTINCT e2.salary) FROM employees e2 WHERE e2.salary > e.salary) = 2;",
   "hints": [
    "<code>(SELECT COUNT(DISTINCT e2.salary) FROM employees e2 WHERE e2.salary &gt; e.salary) = 2</code>"
   ]
  }
 ],
 "cr-6": [
  {
   "type": "sql",
   "dataset": "staff",
   "level": "easy",
   "xp": 10,
   "title": "Бөлімдегі бірінші орын",
   "prompt": "<p>Әр бөлімде ең жоғары жалақы алатындар (тең болса бәрі): <code>department</code>, <code>name</code>, <code>salary</code>. <code>DENSE_RANK</code> қолданыңыз.</p>",
   "starter": "",
   "solution": "SELECT department, name, salary FROM (SELECT department, name, salary, DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk FROM employees) WHERE rnk = 1;",
   "hints": [
    "Сабақтағы сұрау, бірақ <code>rnk = 1</code>."
   ],
   "check": {
    "mustInclude": [
     "DENSE_RANK"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "staff",
   "level": "easy",
   "xp": 10,
   "title": "Жалақы бойынша нөмірлеу",
   "prompt": "<p>Барлық қызметкерді жалақы бойынша кему ретімен нөмірлеңіз (тең болса <code>id</code> кішісі бірінші): <code>name</code>, <code>salary</code>, <code>rn</code>. <code>rn</code> ретімен.</p>",
   "starter": "",
   "solution": "SELECT name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC, id) AS rn FROM employees ORDER BY rn;",
   "hints": [
    "<code>ROW_NUMBER() OVER (ORDER BY salary DESC, id)</code>"
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "ROW_NUMBER"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "staff",
   "level": "easy",
   "xp": 10,
   "title": "RANK пен DENSE_RANK",
   "prompt": "<p>Айырманы өз көзіңізбен көріңіз: әр қызметкер үшін <code>name</code>, <code>salary</code>, <code>rnk</code> (<code>RANK</code>) және <code>drnk</code> (<code>DENSE_RANK</code>), бүкіл компания бойынша жалақының кему ретімен.</p>",
   "starter": "",
   "solution": "SELECT name, salary, RANK() OVER (ORDER BY salary DESC) AS rnk, DENSE_RANK() OVER (ORDER BY salary DESC) AS drnk FROM employees;",
   "hints": [
    "Екі window function бір <code>SELECT</code>-те қатар тұра алады."
   ],
   "check": {
    "mustInclude": [
     "DENSE_RANK"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "staff",
   "level": "medium",
   "xp": 15,
   "title": "Бөлімдегі ең жаңа қызметкер",
   "prompt": "<p>Әр бөлімде ең соңғы жұмысқа алынған қызметкер: <code>department</code>, <code>name</code>, <code>hire_date</code>.</p>",
   "starter": "",
   "solution": "SELECT department, name, hire_date FROM (SELECT department, name, hire_date, ROW_NUMBER() OVER (PARTITION BY department ORDER BY hire_date DESC) AS rn FROM employees) WHERE rn = 1;",
   "hints": [
    "<code>ROW_NUMBER() OVER (PARTITION BY department ORDER BY hire_date DESC)</code>"
   ],
   "check": {
    "mustInclude": [
     "OVER"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "medium",
   "xp": 15,
   "title": "Екі айдан кейінгі retention",
   "prompt": "<p>Әр когорттың тіркелгеннен <b>екі ай</b> өткендегі retention-ы: <code>signup_month</code>, <code>cohort_size</code>, <code>retained</code>, <code>retention_pct</code> (бір ондық белгі). Ешкім қайтпаған когорт 0-мен шықсын.</p>",
   "starter": "",
   "solution": "SELECT u.signup_month, COUNT(DISTINCT u.id) AS cohort_size, COUNT(DISTINCT a.user_id) AS retained, ROUND(100.0 * COUNT(DISTINCT a.user_id) / COUNT(DISTINCT u.id), 1) AS retention_pct FROM users u LEFT JOIN activity a ON a.user_id = u.id AND a.month = strftime('%Y-%m', u.signup_month || '-01', '+2 month') GROUP BY u.signup_month;",
   "hints": [
    "<code>strftime('%Y-%m', u.signup_month || '-01', '+2 month')</code>",
    "Шартты <code>ON</code> ішіне жазыңыз."
   ],
   "check": {
    "mustInclude": [
     "LEFT JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "medium",
   "xp": 15,
   "title": "Арна бойынша retention",
   "prompt": "<p>Келесі айдағы retention-ды арна бойынша есептеңіз: <code>channel</code>, <code>cohort_size</code>, <code>retained</code>, <code>retention_pct</code> (бір ондық белгі).</p>",
   "starter": "",
   "solution": "SELECT u.channel, COUNT(DISTINCT u.id) AS cohort_size, COUNT(DISTINCT a.user_id) AS retained, ROUND(100.0 * COUNT(DISTINCT a.user_id) / COUNT(DISTINCT u.id), 1) AS retention_pct FROM users u LEFT JOIN activity a ON a.user_id = u.id AND a.month = strftime('%Y-%m', u.signup_month || '-01', '+1 month') GROUP BY u.channel;",
   "hints": [
    "Сабақтағы сұрау, бірақ <code>GROUP BY u.channel</code>."
   ],
   "check": {
    "mustInclude": [
     "LEFT JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "staff",
   "level": "hard",
   "xp": 20,
   "title": "Top-2 және бөлімдегі үлес",
   "prompt": "<p>Әр бөлімде жалақысы бойынша алғашқы 2 деңгейге кіретін қызметкерлер (<code>DENSE_RANK</code>) және олардың жалақысының бөлімнің жалпы жалақы қорындағы үлесі: <code>department</code>, <code>name</code>, <code>salary</code>, <code>share_pct</code> (бір ондық белгі).</p>",
   "starter": "",
   "solution": "SELECT department, name, salary, share_pct FROM (SELECT department, name, salary, DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk, ROUND(salary * 100.0 / SUM(salary) OVER (PARTITION BY department), 1) AS share_pct FROM employees) WHERE rnk <= 2;",
   "hints": [
    "Ішкі сұрауда екі window: <code>DENSE_RANK()</code> және <code>SUM(salary) OVER (PARTITION BY department)</code>.",
    "Сыртында <code>WHERE rnk &lt;= 2</code>."
   ],
   "check": {
    "mustInclude": [
     "DENSE_RANK"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "hard",
   "xp": 20,
   "title": "Кейін кез келген айда қайтқандар",
   "prompt": "<p>Әр когорт үшін тіркелу айынан <b>кейінгі кез келген</b> айда белсенді болғандар: <code>signup_month</code>, <code>cohort_size</code>, <code>returned</code>, <code>returned_pct</code> (бір ондық белгі). Тіркелу айы ретімен.</p>",
   "starter": "",
   "solution": "SELECT signup_month, COUNT(*) AS cohort_size, SUM(EXISTS (SELECT 1 FROM activity a WHERE a.user_id = u.id AND a.month > u.signup_month)) AS returned, ROUND(100.0 * SUM(EXISTS (SELECT 1 FROM activity a WHERE a.user_id = u.id AND a.month > u.signup_month)) / COUNT(*), 1) AS returned_pct FROM users u GROUP BY signup_month ORDER BY signup_month;",
   "hints": [
    "<code>EXISTS (SELECT 1 FROM activity a WHERE a.user_id = u.id AND a.month &gt; u.signup_month)</code> 1 не 0 береді.",
    "Айлар YYYY-MM мәтіні, сондықтан <code>&gt;</code> дұрыс салыстырады."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "EXISTS"
    ]
   }
  }
 ],
 "cr-7": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Дубликат id саны",
   "prompt": "<p><code>df.duplicated('order_id').sum()</code> сияқты: <code>count_dupes(ids)</code> функциясы тізімдегі артық (қайталанған) id-лердің санын қайтарсын. Мысалы, <code>count_dupes([1, 2, 1, 3, 1])</code> → <code>2</code>.</p>",
   "starter": "def count_dupes(ids):\n    pass\n",
   "solution": "def count_dupes(ids):\n    return len(ids) - len(set(ids))\n",
   "hints": [
    "<code>len(ids) - len(set(ids))</code>"
   ],
   "check": {
    "tests": "assert count_dupes([1, 2, 1, 3, 1]) == 2, \"count_dupes([1, 2, 1, 3, 1]) 2 болуы керек\"\nassert count_dupes([1, 2, 3]) == 0, \"Дубликат жоқ: 0\"\nassert count_dupes([]) == 0, \"Бос тізім: 0\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бос сомаларды санау",
   "prompt": "<p><code>df.isna().sum()</code> сияқты: <code>count_missing(rows)</code> функциясы <code>(order_id, city, amount, status)</code> кортеждерінің ішінде <code>amount is None</code> жолдардың санын қайтарсын.</p>",
   "starter": "def count_missing(rows):\n    pass\n",
   "solution": "def count_missing(rows):\n    return sum(1 for _, _, amount, _ in rows if amount is None)\n",
   "hints": [
    "Кортежді ашып алыңыз: <code>for _, _, amount, _ in rows</code>."
   ],
   "check": {
    "tests": "_rows = [(1, \"Алматы\", 5000, \"delivered\"), (2, \"Астана\", 3000, \"delivered\"), (1, \"Алматы\", 5000, \"delivered\"), (3, \"Алматы\", 2000, \"cancelled\"), (4, \"Шымкент\", None, \"delivered\"), (5, \"Астана\", 4000, \"shipped\"), (6, \"Алматы\", 6000, \"delivered\")]\nassert count_missing(_rows) == 1, \"Бұл деректе 1 бос сома бар\"\nassert count_missing([(1, \"X\", None, \"a\"), (2, \"Y\", None, \"b\")]) == 2, \"Екі бос сома: 2\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жойылған тапсырыстарды сүзу",
   "prompt": "<p><code>drop_cancelled(rows)</code> функциясы <code>status == \"cancelled\"</code> жолдарды алып тастап, қалғанын ретімен жаңа тізіммен қайтарсын.</p>",
   "starter": "def drop_cancelled(rows):\n    pass\n",
   "solution": "def drop_cancelled(rows):\n    return [r for r in rows if r[3] != \"cancelled\"]\n",
   "hints": [
    "Статус — кортеждің 4-элементі: <code>r[3]</code>."
   ],
   "check": {
    "tests": "_rows = [(1, \"Алматы\", 5000, \"delivered\"), (2, \"Астана\", 3000, \"delivered\"), (1, \"Алматы\", 5000, \"delivered\"), (3, \"Алматы\", 2000, \"cancelled\"), (4, \"Шымкент\", None, \"delivered\"), (5, \"Астана\", 4000, \"shipped\"), (6, \"Алматы\", 6000, \"delivered\")]\n_r = drop_cancelled(_rows)\nassert len(_r) == 6, f\"6 жол қалуы керек, сізде {len(_r)}\"\nassert all(r[3] != \"cancelled\" for r in _r), \"cancelled жолдар қалмауы керек\"\nassert _r[0] == _rows[0] and _r[-1] == _rows[-1], \"Жолдардың реті сақталуы керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бірінші жолдарды қалдыру",
   "prompt": "<p><code>drop_duplicates('order_id')</code> сияқты: <code>dedupe(rows)</code> функциясы әр <code>order_id</code>-тің тек бірінші жолын қалдырып, ретін сақтап қайтарсын.</p>",
   "starter": "def dedupe(rows):\n    pass\n",
   "solution": "def dedupe(rows):\n    seen = set()\n    out = []\n    for r in rows:\n        if r[0] in seen:\n            continue\n        seen.add(r[0])\n        out.append(r)\n    return out\n",
   "hints": [
    "Көрілген id-лерді <code>seen = set()</code> ішінде сақтаңыз."
   ],
   "check": {
    "tests": "_rows = [(1, \"Алматы\", 5000, \"delivered\"), (2, \"Астана\", 3000, \"delivered\"), (1, \"Алматы\", 5000, \"delivered\"), (3, \"Алматы\", 2000, \"cancelled\"), (4, \"Шымкент\", None, \"delivered\"), (5, \"Астана\", 4000, \"shipped\"), (6, \"Алматы\", 6000, \"delivered\")]\n_r = dedupe(_rows)\nassert [r[0] for r in _r] == [1, 2, 3, 4, 5, 6], f\"order_id-лер [1, 2, 3, 4, 5, 6] болуы керек, сізде {[r[0] for r in _r]}\"\nassert dedupe([(7, \"X\", 100, \"a\"), (7, \"Y\", 999, \"b\")]) == [(7, \"X\", 100, \"a\")], \"Бірінші жол қалуы керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Тазалау журналы",
   "prompt": "<p>Take-home-да әр қадамнан кейін қанша жол қалғанын жазамыз. <code>clean_log(rows)</code> функциясы <code>(қадам, қалған_жолдар)</code> жұптарының тізімін қайтарсын, осы ретпен: <code>(\"бастапқы\", n)</code>, <code>(\"дубликат\", n)</code> (әр order_id-тің бірінші жолы), <code>(\"cancelled\", n)</code>, <code>(\"бос сома\", n)</code>.</p>",
   "starter": "def clean_log(rows):\n    log = []\n    return log\n",
   "solution": "def clean_log(rows):\n    log = [(\"бастапқы\", len(rows))]\n    seen, step = set(), []\n    for r in rows:\n        if r[0] not in seen:\n            seen.add(r[0])\n            step.append(r)\n    log.append((\"дубликат\", len(step)))\n    step = [r for r in step if r[3] != \"cancelled\"]\n    log.append((\"cancelled\", len(step)))\n    step = [r for r in step if r[2] is not None]\n    log.append((\"бос сома\", len(step)))\n    return log\n",
   "hints": [
    "Әр қадамнан кейін жаңа тізім жасап, оның ұзындығын журналға қосыңыз."
   ],
   "check": {
    "tests": "_rows = [(1, \"Алматы\", 5000, \"delivered\"), (2, \"Астана\", 3000, \"delivered\"), (1, \"Алматы\", 5000, \"delivered\"), (3, \"Алматы\", 2000, \"cancelled\"), (4, \"Шымкент\", None, \"delivered\"), (5, \"Астана\", 4000, \"shipped\"), (6, \"Алматы\", 6000, \"delivered\")]\n_r = clean_log(_rows)\nassert _r == [(\"бастапқы\", 7), (\"дубликат\", 6), (\"cancelled\", 5), (\"бос сома\", 4)], f\"Журнал дұрыс емес: {_r}\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қаланың табыс үлесі",
   "prompt": "<p>«Табыстың 45%-ы Алматыдан» деген сөйлем үшін: <code>city_shares(rows)</code> функциясы таза <code>(order_id, city, amount)</code> кортеждерінен <code>{қала: үлес_пайызы}</code> сөздігін қайтарсын (1 ондық белгі).</p>",
   "starter": "def city_shares(rows):\n    pass\n",
   "solution": "def city_shares(rows):\n    totals = {}\n    for _, city, amount in rows:\n        totals[city] = totals.get(city, 0) + amount\n    total = sum(totals.values())\n    return {c: round(v * 100 / total, 1) for c, v in totals.items()}\n",
   "hints": [
    "Алдымен қала бойынша қосынды, сосын жалпы сомаға бөліңіз."
   ],
   "check": {
    "tests": "_r = city_shares([(1, \"Алматы\", 4500), (2, \"Астана\", 3000), (3, \"Алматы\", 0), (4, \"Шымкент\", 2500)])\nassert _r == {\"Алматы\": 45.0, \"Астана\": 30.0, \"Шымкент\": 25.0}, f\"Нәтиже дұрыс емес: {_r}\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Take-home негізгі жауабы",
   "prompt": "<p><code>top_city_answer(rows)</code> функциясы <code>(order_id, city, amount, status)</code> шикі кортеждерін тазаласын (әр order_id-тің бірінші жолы; cancelled және бос сома жоқ), сосын табысы ең көп қаланы және оның үлесін <code>(қала, үлес_пайызы)</code> жұбымен қайтарсын (1 ондық белгі).</p>",
   "starter": "def top_city_answer(rows):\n    pass\n",
   "solution": "def top_city_answer(rows):\n    seen, totals = set(), {}\n    for order_id, city, amount, status in rows:\n        if order_id in seen:\n            continue\n        seen.add(order_id)\n        if status == \"cancelled\" or amount is None:\n            continue\n        totals[city] = totals.get(city, 0) + amount\n    best = max(totals, key=lambda c: totals[c])\n    return (best, round(totals[best] * 100 / sum(totals.values()), 1))\n",
   "hints": [
    "Дубликатты тексеруді status/amount тексеруінен <b>бұрын</b> жасаңыз.",
    "Ең үлкені: <code>max(totals, key=lambda c: totals[c])</code>."
   ],
   "check": {
    "tests": "_rows = [(1, \"Алматы\", 5000, \"delivered\"), (2, \"Астана\", 3000, \"delivered\"), (1, \"Алматы\", 5000, \"delivered\"), (3, \"Алматы\", 2000, \"cancelled\"), (4, \"Шымкент\", None, \"delivered\"), (5, \"Астана\", 4000, \"shipped\"), (6, \"Алматы\", 6000, \"delivered\")]\nassert top_city_answer(_rows) == (\"Алматы\", 61.1), f\"('Алматы', 61.1) күтілді, сізде {top_city_answer(_rows)}\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ай бойынша орташа чек",
   "prompt": "<p><code>monthly_aov(rows)</code> функциясы <code>(order_id, date, amount, status)</code> кортеждерін алсын (<code>date</code> — <code>\"YYYY-MM-DD\"</code>). Тазалау: әр order_id-тің бірінші жолы, cancelled және бос сома алынады. Нәтиже: <code>{\"YYYY-MM\": орташа_чек}</code>, бүтінге дейін <code>round</code>.</p>",
   "starter": "def monthly_aov(rows):\n    pass\n",
   "solution": "def monthly_aov(rows):\n    seen, sums, counts = set(), {}, {}\n    for order_id, date, amount, status in rows:\n        if order_id in seen:\n            continue\n        seen.add(order_id)\n        if status == \"cancelled\" or amount is None:\n            continue\n        m = date[:7]\n        sums[m] = sums.get(m, 0) + amount\n        counts[m] = counts.get(m, 0) + 1\n    return {m: round(sums[m] / counts[m]) for m in sums}\n",
   "hints": [
    "Ай: <code>date[:7]</code>.",
    "Екі сөздік: қосынды және саны."
   ],
   "check": {
    "tests": "_rows = [(1, \"2024-08-02\", 5000, \"delivered\"), (2, \"2024-08-15\", 3000, \"delivered\"), (1, \"2024-08-02\", 5000, \"delivered\"), (3, \"2024-09-01\", 9000, \"cancelled\"), (4, \"2024-09-03\", 2000, \"shipped\"), (5, \"2024-09-20\", None, \"delivered\"), (6, \"2024-09-28\", 2500, \"delivered\")]\n_r = monthly_aov(_rows)\nassert _r == {\"2024-08\": 4000, \"2024-09\": 2250}, f\"{{'2024-08': 4000, '2024-09': 2250}} күтілді, сізде {_r}\""
   }
  }
 ],
 "cr-8": [
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "easy",
   "xp": 10,
   "title": "Ең әлсіз күн",
   "prompt": "<p>Жалпы күндік табысы (екі аймақ бірге) ең төмен күн: <code>day</code>, <code>revenue</code>, бір жол.</p>",
   "starter": "",
   "solution": "SELECT day, SUM(revenue) AS revenue FROM daily_sales GROUP BY day ORDER BY revenue LIMIT 1;",
   "hints": [
    "<code>GROUP BY day ORDER BY revenue LIMIT 1</code>"
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "easy",
   "xp": 10,
   "title": "Аймақ бойынша жалпы табыс",
   "prompt": "<p>Декомпозицияның бірінші қадамы: әр аймақтың кезеңдегі жалпы табысы: <code>region</code>, <code>revenue</code>.</p>",
   "starter": "",
   "solution": "SELECT region, SUM(revenue) AS revenue FROM daily_sales GROUP BY region;",
   "hints": [
    "<code>GROUP BY region</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "easy",
   "xp": 10,
   "title": "Құлдырау күндерін қарау",
   "prompt": "<p><code>2024-09-07</code> және <code>2024-09-08</code> күндеріндегі әр аймақтың табысы: <code>region</code>, <code>day</code>, <code>revenue</code>. Аймақ, сосын күн ретімен.</p>",
   "starter": "",
   "solution": "SELECT region, day, revenue FROM daily_sales WHERE day IN ('2024-09-07', '2024-09-08') ORDER BY region, day;",
   "hints": [
    "<code>WHERE day IN ('2024-09-07', '2024-09-08')</code>"
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "medium",
   "xp": 15,
   "title": "Аймақтың бір күндік өзгерісі",
   "prompt": "<p>Әр аймақ үшін бір жолда: <code>region</code>, <code>rev_07</code> (7 қыркүйек), <code>rev_08</code> (8 қыркүйек), <code>change</code> (= rev_08 − rev_07). Шартты қосынды қолданыңыз.</p>",
   "starter": "",
   "solution": "SELECT region, SUM(CASE WHEN day = '2024-09-07' THEN revenue END) AS rev_07, SUM(CASE WHEN day = '2024-09-08' THEN revenue END) AS rev_08, SUM(CASE WHEN day = '2024-09-08' THEN revenue END) - SUM(CASE WHEN day = '2024-09-07' THEN revenue END) AS change FROM daily_sales GROUP BY region;",
   "hints": [
    "<code>SUM(CASE WHEN day = '2024-09-07' THEN revenue END)</code>"
   ],
   "check": {
    "mustInclude": [
     "CASE"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "medium",
   "xp": 15,
   "title": "Өткен аптаның сол күні",
   "prompt": "<p>Жексенбіні сенбімен емес, өткен жексенбімен салыстырамыз. Жалпы күндік табысты 7 күн бұрынғы мәнмен салыстырыңыз: <code>day</code>, <code>revenue</code>, <code>week_ago</code>. <code>LAG(revenue, 7)</code> 7 жол бұрынғы мәнді береді. Тек <code>week_ago</code> бар күндерді шығарыңыз, күн ретімен.</p>",
   "starter": "",
   "solution": "WITH t AS (SELECT day, SUM(revenue) AS revenue FROM daily_sales GROUP BY day), l AS (SELECT day, revenue, LAG(revenue, 7) OVER (ORDER BY day) AS week_ago FROM t) SELECT day, revenue, week_ago FROM l WHERE week_ago IS NOT NULL ORDER BY day;",
   "hints": [
    "<code>LAG(revenue, 7) OVER (ORDER BY day)</code>",
    "Window нәтижесін сүзу үшін тағы бір CTE."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "LAG"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "medium",
   "xp": 15,
   "title": "Орташадан төмен күндер",
   "prompt": "<p>Жалпы күндік табысы кезеңнің орташасынан төмен күндер: <code>day</code>, <code>revenue</code>, <code>diff</code> (revenue − орташа, бір ондық белгі). Күн ретімен.</p>",
   "starter": "",
   "solution": "WITH t AS (SELECT day, SUM(revenue) AS revenue FROM daily_sales GROUP BY day), a AS (SELECT day, revenue, revenue - AVG(revenue) OVER () AS diff FROM t) SELECT day, revenue, ROUND(diff, 1) AS diff FROM a WHERE diff < 0 ORDER BY day;",
   "hints": [
    "Кезеңнің орташасы: <code>AVG(revenue) OVER ()</code>."
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "hard",
   "xp": 20,
   "title": "Құлдыраудың аймақтық үлесі",
   "prompt": "<p><code>2024-09-08</code> күні жалпы табыс алдыңғы күннен түсті. Әр аймақтың өзгерісі және оның жалпы өзгерістегі үлесі: <code>region</code>, <code>change</code>, <code>share_pct</code> (бір ондық белгі). <code>LAG</code> аймақ ішінде қолданылсын.</p>",
   "starter": "",
   "solution": "WITH r AS (SELECT region, day, revenue - LAG(revenue) OVER (PARTITION BY region ORDER BY day) AS change FROM daily_sales) SELECT region, change, ROUND(change * 100.0 / SUM(change) OVER (), 1) AS share_pct FROM r WHERE day = '2024-09-08';",
   "hints": [
    "<code>LAG(revenue) OVER (PARTITION BY region ORDER BY day)</code>",
    "Сыртында <code>WHERE day = '2024-09-08'</code> және <code>SUM(change) OVER ()</code>."
   ],
   "check": {
    "mustInclude": [
     "LAG",
     "PARTITION BY"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "hard",
   "xp": 20,
   "title": "Ең үлкен құлдырау және оның көзі",
   "prompt": "<p>Жалпы табыс ең көп түскен күнді және сол күні ең көп түскен аймақты бір жолмен шығарыңыз: <code>day</code>, <code>change</code> (жалпы өзгеріс), <code>worst_region</code>. Күнді сабаққа қарамай, деректен табыңыз.</p>",
   "starter": "",
   "solution": "WITH t AS (SELECT day, SUM(revenue) AS revenue FROM daily_sales GROUP BY day), d AS (SELECT day, revenue - LAG(revenue) OVER (ORDER BY day) AS change FROM t), r AS (SELECT region, day, revenue - LAG(revenue) OVER (PARTITION BY region ORDER BY day) AS change FROM daily_sales), worst AS (SELECT day, change FROM d WHERE change IS NOT NULL ORDER BY change LIMIT 1) SELECT w.day, w.change, (SELECT r.region FROM r WHERE r.day = w.day ORDER BY r.change LIMIT 1) AS worst_region FROM worst w;",
   "hints": [
    "Үш CTE: жалпы күндік өзгеріс, аймақтық күндік өзгеріс, ең нашар күн.",
    "Аймақты ішкі сұраумен таңдаңыз: <code>ORDER BY r.change LIMIT 1</code>."
   ],
   "check": {
    "mustInclude": [
     "LAG"
    ]
   }
  }
 ]
});
