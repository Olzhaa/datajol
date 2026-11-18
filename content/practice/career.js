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
 ],
 "cr-ds": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "AUC мен Gini",
   "prompt": "<p>Банктерде модель сапасын Gini-мен айтады. Екі функция жазыңыз:</p><ul><li><code>gini_from_auc(auc)</code> — Gini = 2 × AUC − 1;</li><li><code>auc_from_gini(gini)</code> — кері түрлендіру.</li></ul><p>Мысалы, <code>gini_from_auc(0.75)</code> → <code>0.5</code>, <code>auc_from_gini(0.52)</code> → <code>0.76</code>.</p>",
   "starter": "def gini_from_auc(auc):\n    pass\n\ndef auc_from_gini(gini):\n    pass\n",
   "solution": "def gini_from_auc(auc):\n    return 2 * auc - 1\n\ndef auc_from_gini(gini):\n    return (gini + 1) / 2\n",
   "hints": [
    "Gini = 2 × AUC − 1 теңдеуінен AUC-ті табыңыз: AUC = (Gini + 1) / 2."
   ],
   "check": {
    "tests": "assert gini_from_auc(0.75) is not None and abs(gini_from_auc(0.75) - 0.5) < 1e-12, \"AUC 0.75 → Gini 0.50\"\nassert abs(gini_from_auc(0.5)) < 1e-12, \"Кездейсоқ модель: AUC 0.5 → Gini 0\"\nassert abs(gini_from_auc(1.0) - 1) < 1e-12, \"Мінсіз модель: Gini 1\"\nassert auc_from_gini(0.52) is not None and abs(auc_from_gini(0.52) - 0.76) < 1e-12, \"Gini 0.52 → AUC 0.76\"\nassert abs(auc_from_gini(gini_from_auc(0.81)) - 0.81) < 1e-12, \"Екі функция бір-біріне кері\"",
    "mustInclude": [
     "def gini_from_auc",
     "def auc_from_gini"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "«Бәрі таза» моделінің accuracy-і",
   "prompt": "<p>Теңгерімсіз деректе accuracy алдайды. <code>majority_accuracy(y)</code> функциясын жазыңыз: әрқашан көп класты болжайтын модельдің accuracy-ін қайтарсын (<code>y</code> — 0/1 тізімі).</p><p>Мысалы, 1 000 транзакцияның 5-еуі фрод болса, <code>majority_accuracy(y)</code> → <code>0.995</code>: ештеңе таппайтын модель 99.5% «дұрыс».</p>",
   "starter": "def majority_accuracy(y):\n    pass\n",
   "solution": "def majority_accuracy(y):\n    share = sum(y) / len(y)\n    return max(share, 1 - share)\n",
   "hints": [
    "1-лер үлесі <code>share = sum(y) / len(y)</code>; көп класс — <code>max(share, 1 - share)</code>."
   ],
   "check": {
    "tests": "assert majority_accuracy([0] * 995 + [1] * 5) is not None, \"majority_accuracy мән қайтаруы керек\"\nassert abs(majority_accuracy([0] * 995 + [1] * 5) - 0.995) < 1e-12, \"995 / 1000 = 0.995: accuracy жоғары, бірақ бірде-бір фрод табылмады\"\nassert abs(majority_accuracy([1, 1, 0]) - 2 / 3) < 1e-12, \"Көп класс 1 болса да жұмыс істеуі керек: 2/3\"\nassert abs(majority_accuracy([0, 1]) - 0.5) < 1e-12, \"Класстар тең: 0.5\"",
    "mustInclude": [
     "def majority_accuracy"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Precision мен recall",
   "prompt": "<p><code>precision_recall(y_true, y_pred)</code> функциясын жазыңыз: 0/1 тізімдері бойынша <code>(precision, recall)</code> қайтарсын.</p><ul><li>precision = TP / (TP + FP) — «фрод» дегендердің ішінде шын фрод үлесі;</li><li>recall = TP / (TP + FN) — барлық фродтың ішінде табылғаны.</li></ul><p>Бөлгіш 0 болса, сол метрика <code>0.0</code>.</p>",
   "starter": "def precision_recall(y_true, y_pred):\n    pass\n",
   "solution": "def precision_recall(y_true, y_pred):\n    tp = sum(1 for t, p in zip(y_true, y_pred) if t == 1 and p == 1)\n    fp = sum(1 for t, p in zip(y_true, y_pred) if t == 0 and p == 1)\n    fn = sum(1 for t, p in zip(y_true, y_pred) if t == 1 and p == 0)\n    precision = tp / (tp + fp) if tp + fp else 0.0\n    recall = tp / (tp + fn) if tp + fn else 0.0\n    return precision, recall\n",
   "hints": [
    "TP: <code>t == 1 and p == 1</code>; FP: <code>t == 0 and p == 1</code>; FN: <code>t == 1 and p == 0</code>.",
    "Нөлге бөлмеу үшін: <code>tp / (tp + fp) if tp + fp else 0.0</code>."
   ],
   "check": {
    "tests": "_r = precision_recall([1, 0, 1, 1, 0, 0], [1, 1, 0, 1, 0, 0])\nassert _r is not None and len(_r) == 2, \"(precision, recall) жұбын қайтарыңыз\"\nassert abs(_r[0] - 2 / 3) < 1e-12 and abs(_r[1] - 2 / 3) < 1e-12, f\"TP = 2, FP = 1, FN = 1: (2/3, 2/3) болуы керек, сізде {_r}\"\n_r2 = precision_recall([1, 1, 1, 0], [1, 0, 0, 0])\nassert abs(_r2[0] - 1) < 1e-12 and abs(_r2[1] - 1 / 3) < 1e-12, \"Сақ модель: precision 1, recall 1/3\"\nassert tuple(precision_recall([1, 0], [0, 0])) == (0.0, 0.0), \"Ешкімге «фрод» демесе: precision 0.0 (бөлгіш 0), recall 0.0\"",
    "mustInclude": [
     "def precision_recall"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "KS статистикасы",
   "prompt": "<p>KS — «жаман» және «жақсы» клиенттердің жинақталған үлестері арасындағы ең үлкен алшақтық. <code>ks_stat(y, scores)</code> функциясын жазыңыз: әр бірегей score-ды табалдырық t ретінде алып, TPR = (score ≥ t болған оң мысалдар үлесі) және FPR = (score ≥ t болған теріс мысалдар үлесі) есептеп, max |TPR − FPR| қайтарсын.</p><p>Мысалы, <code>ks_stat([1, 0, 1, 0], [0.9, 0.8, 0.7, 0.1])</code> → <code>0.5</code>.</p>",
   "starter": "def ks_stat(y, scores):\n    pass\n",
   "solution": "def ks_stat(y, scores):\n    pos = [s for t, s in zip(y, scores) if t == 1]\n    neg = [s for t, s in zip(y, scores) if t == 0]\n    best = 0.0\n    for thr in set(scores):\n        tpr = sum(s >= thr for s in pos) / len(pos)\n        fpr = sum(s >= thr for s in neg) / len(neg)\n        best = max(best, abs(tpr - fpr))\n    return best\n",
   "hints": [
    "Score-ларды екі тізімге бөліңіз: <code>pos</code> (y = 1) және <code>neg</code> (y = 0).",
    "<code>for thr in set(scores)</code>: <code>tpr = sum(s &gt;= thr for s in pos) / len(pos)</code>, FPR дәл солай."
   ],
   "check": {
    "tests": "import numpy as _np\nassert ks_stat([1, 0, 1, 0], [0.9, 0.8, 0.7, 0.1]) is not None, \"ks_stat мән қайтаруы керек\"\nassert abs(ks_stat([1, 0, 1, 0], [0.9, 0.8, 0.7, 0.1]) - 0.5) < 1e-12, f\"KS = 0.5 болуы керек (t = 0.9 және t = 0.7 табалдырықтарында), сізде {ks_stat([1, 0, 1, 0], [0.9, 0.8, 0.7, 0.1])}\"\nassert abs(ks_stat([1, 1, 0, 0], [0.9, 0.8, 0.3, 0.1]) - 1) < 1e-12, \"Мінсіз бөлу: KS = 1\"\nassert abs(ks_stat([0, 0, 1, 1], [0.9, 0.8, 0.3, 0.1]) - 1) < 1e-12, \"Кері реттеуде де |TPR − FPR| = 1: модуль алыңыз\"\n_g = _np.random.default_rng(6)\n_y = (_g.random(300) < 0.3).astype(int)\n_s = _np.round(_g.normal(0, 1, 300) + 1.2 * _y, 2)\n_e = max(abs((_s[_y == 1] >= _t).mean() - (_s[_y == 0] >= _t).mean()) for _t in set(_s.tolist()))\nassert abs(ks_stat(_y.tolist(), _s.tolist()) - _e) < 1e-9, f\"300 клиентте KS ≈ {_e:.3f} болуы керек, сізде {ks_stat(_y.tolist(), _s.tolist()):.3f}\"",
    "mustInclude": [
     "def ks_stat"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "PSI: модель ескірді ме",
   "prompt": "<p>Score-дың интервалдар бойынша үлестері: <code>expected</code> — үйрету кезеңінде, <code>actual</code> — қазір. Екі функция жазыңыз:</p><ul><li><code>psi(expected, actual)</code> — PSI = Σ (a − e) × ln(a / e);</li><li><code>needs_retrain(expected, actual)</code> — PSI &gt; 0.25 болса <code>True</code> (елеулі ығысу).</li></ul><p>Мысалы, <code>psi([0.25] * 4, [0.1, 0.2, 0.3, 0.4])</code> ≈ <code>0.228</code>: бақылау аймағы, бірақ қайта үйрету әлі керек емес.</p>",
   "starter": "import math\n\ndef psi(expected, actual):\n    pass\n\ndef needs_retrain(expected, actual):\n    pass\n",
   "solution": "import math\n\ndef psi(expected, actual):\n    return sum((a - e) * math.log(a / e) for e, a in zip(expected, actual))\n\ndef needs_retrain(expected, actual):\n    return psi(expected, actual) > 0.25\n",
   "hints": [
    "<code>sum((a - e) * math.log(a / e) for e, a in zip(expected, actual))</code>",
    "Әр мүше теріс емес: a &gt; e болса, ln(a / e) &gt; 0; a &lt; e болса, екеуі де теріс."
   ],
   "check": {
    "tests": "assert psi([0.25] * 4, [0.25] * 4) is not None and abs(psi([0.25] * 4, [0.25] * 4)) < 1e-12, \"Таралу өзгермесе, PSI = 0\"\n_p = psi([0.25] * 4, [0.1, 0.2, 0.3, 0.4])\nassert abs(_p - 0.228217) < 1e-4, f\"PSI ≈ 0.228 болуы керек, сізде {_p:.4f}\"\nassert abs(psi([0.5, 0.3, 0.2], [0.2, 0.3, 0.5]) - 0.549774) < 1e-4, \"Шеткі интервалдар орын ауыстырды: PSI ≈ 0.550\"\nassert needs_retrain([0.25] * 4, [0.1, 0.2, 0.3, 0.4]) is False, \"0.228 ≤ 0.25: қайта үйрету әлі керек емес (False)\"\nassert needs_retrain([0.5, 0.3, 0.2], [0.2, 0.3, 0.5]) is True, \"0.55 > 0.25: елеулі ығысу (True)\"\nassert abs(psi([0.1, 0.9], [0.2, 0.8]) - psi([0.2, 0.8], [0.1, 0.9])) < 1e-12, \"PSI симметриялы: expected пен actual-ды ауыстырсақ, мәні өзгермейді\"",
    "mustInclude": [
     "def psi",
     "def needs_retrain"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең тәуекелді 20%-дағы дефолттар",
   "prompt": "<p>Write-up-та нәтижені бизнес тілімен айтамыз: «модель дефолттың 60%-ын ең тәуекелді 20% өтінімнен табады». <code>capture_rate(y, scores, top=0.2)</code> функциясын жазыңыз: score бойынша кему ретімен сұрыптап, алғашқы <code>k = round(top × n)</code> өтінімге барлық дефолттың қанша үлесі түсетінін қайтарсын.</p><p>Кездейсоқ модельде бұл шамамен <code>top</code>-қа тең.</p>",
   "starter": "def capture_rate(y, scores, top=0.2):\n    pass\n",
   "solution": "def capture_rate(y, scores, top=0.2):\n    k = round(top * len(y))\n    order = sorted(range(len(y)), key=lambda i: scores[i], reverse=True)\n    caught = sum(y[i] for i in order[:k])\n    return caught / sum(y)\n",
   "hints": [
    "Индекстерді score бойынша сұрыптаңыз: <code>sorted(range(len(y)), key=lambda i: scores[i], reverse=True)</code>.",
    "Алғашқы k индекстегі y қосындысын <code>sum(y)</code>-ке бөліңіз."
   ],
   "check": {
    "tests": "_y = [1, 0, 0, 1, 0, 0, 0, 1, 0, 0]\n_s = [0.9, 0.8, 0.1, 0.7, 0.2, 0.3, 0.4, 0.05, 0.6, 0.5]\nassert capture_rate(_y, _s) is not None, \"capture_rate мән қайтаруы керек\"\nassert abs(capture_rate(_y, _s) - 1 / 3) < 1e-12, f\"Ең тәуекелді 2 өтінімде (0.9, 0.8) 3 дефолттың 1-еуі: 1/3, сізде {capture_rate(_y, _s)}\"\nassert abs(capture_rate(_y, _s, top=0.3) - 2 / 3) < 1e-12, \"top = 0.3: алғашқы 3 өтінім (0.9, 0.8, 0.7), 2/3\"\nassert abs(capture_rate(_y, _s, top=1.0) - 1) < 1e-12, \"top = 1: барлық дефолт ұсталады\"\nassert abs(capture_rate([1, 1, 0, 0, 0], [0.2, 0.1, 0.9, 0.8, 0.7], top=0.4)) < 1e-12, \"Кері реттейтін модель алғашқы 40%-да ешкімді таппайды\"",
    "mustInclude": [
     "def capture_rate"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Leakage аудиті",
   "prompt": "<p>Take-home: <code>df</code>-та несие өтінімдері мен <code>default</code> бағаны бар. Әр белгінің жеке өзі target-ті қаншалық реттейтінін тексеріңіз. <code>suspicious(df, target, thr=0.9)</code> функциясын жазыңыз: target-тен басқа әр баған үшін <code>roc_auc_score(df[target], df[col])</code> есептеп, max(AUC, 1 − AUC) ≥ thr болған бағандардың <b>сұрыпталған</b> тізімін қайтарсын.</p><p>1 − AUC те керек: белгі target-пен кері байланысты болса (мысалы, уақытында төлеу үлесі), AUC 0-ге жақын. Бір белгінің AUC-ы 0.95 болса, бұл әдетте «болжам сәтінде белгісіз» ақпарат.</p>",
   "starter": "import numpy as np\nimport pandas as pd\nrng = np.random.default_rng(13)\nn = 800\ny = (rng.random(n) < 0.12).astype(int)\ndf = pd.DataFrame({\n    \"client_id\": rng.permutation(n),\n    \"age\": rng.integers(21, 65, n),\n    \"income\": rng.normal(320, 90, n) - 40 * y,\n    \"collection_calls\": np.where(y == 1, 1 + rng.poisson(4, n), rng.poisson(0.05, n)),\n    \"on_time_share\": np.where(y == 1, rng.uniform(0, 0.45, n), rng.uniform(0.5, 1, n)),\n    \"default\": y,\n})\nfrom sklearn.metrics import roc_auc_score\n\ndef suspicious(df, target, thr=0.9):\n    pass\n",
   "solution": "import numpy as np\nimport pandas as pd\nrng = np.random.default_rng(13)\nn = 800\ny = (rng.random(n) < 0.12).astype(int)\ndf = pd.DataFrame({\n    \"client_id\": rng.permutation(n),\n    \"age\": rng.integers(21, 65, n),\n    \"income\": rng.normal(320, 90, n) - 40 * y,\n    \"collection_calls\": np.where(y == 1, 1 + rng.poisson(4, n), rng.poisson(0.05, n)),\n    \"on_time_share\": np.where(y == 1, rng.uniform(0, 0.45, n), rng.uniform(0.5, 1, n)),\n    \"default\": y,\n})\nfrom sklearn.metrics import roc_auc_score\n\ndef suspicious(df, target, thr=0.9):\n    out = []\n    for col in df.columns:\n        if col == target:\n            continue\n        auc = roc_auc_score(df[target], df[col])\n        if max(auc, 1 - auc) >= thr:\n            out.append(col)\n    return sorted(out)\n\nprint(suspicious(df, \"default\"))\n",
   "hints": [
    "<code>for col in df.columns</code>, target-ті <code>continue</code> арқылы өткізіп жіберіңіз.",
    "<code>auc = roc_auc_score(df[target], df[col])</code>; шарт: <code>max(auc, 1 - auc) &gt;= thr</code>.",
    "Соңында <code>sorted(...)</code>."
   ],
   "check": {
    "tests": "from sklearn.metrics import roc_auc_score as _auc\n_r = suspicious(df, \"default\")\nassert _r is not None, \"suspicious мән қайтаруы керек\"\nassert list(_r) == [\"collection_calls\", \"on_time_share\"], f\"Күдікті белгілер ['collection_calls', 'on_time_share'] болуы керек, сізде {_r}. on_time_share-дің AUC-ы 0-ге жақын: 1 − AUC-ты да тексеріңіз\"\nassert \"default\" not in suspicious(df, \"default\", thr=0.5), \"target бағанының өзін тексермеңіз\"\n_m = {c: max(_auc(df[\"default\"], df[c]), 1 - _auc(df[\"default\"], df[c])) for c in df.columns if c != \"default\"}\n_e = sorted(c for c, v in _m.items() if v >= 0.6)\nassert list(suspicious(df, \"default\", thr=0.6)) == _e, f\"thr = 0.6 болса, {_e} болуы керек: thr параметрін қолданыңыз\"\n_d2 = df.rename(columns={\"default\": \"bad\"})\nassert list(suspicious(_d2, \"bad\")) == [\"collection_calls\", \"on_time_share\"], \"target атауы параметрден алынуы керек, default деп жазып қоймаңыз\"",
    "mustInclude": [
     "def suspicious",
     "roc_auc_score"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Out-of-time Gini және Pipeline",
   "prompt": "<p>2024 жылғы өтінімдер: <code>month</code> (1–12), белгілер және <code>default</code>. <code>oot_gini(df, cutoff)</code> функциясын жазыңыз:</p><ol><li>train — <code>month &lt; cutoff</code>, test — <code>month &gt;= cutoff</code> (уақыт бойынша split);</li><li>белгілер — <code>month</code> пен <code>default</code>-тан басқа барлық баған;</li><li><code>Pipeline([(\"scaler\", StandardScaler()), (\"model\", LogisticRegression(max_iter=1000))])</code> тек train-де fit;</li><li><code>(gini_train, gini_test)</code> қайтарсын: Gini = 2 × ROC-AUC − 1, <code>predict_proba(...)[:, 1]</code> бойынша.</li></ol><p>Деректе соңғы айларда заңдылық әлсіреген (drift), сондықтан out-of-time Gini train-нен төмен шығады.</p>",
   "starter": "import numpy as np\nimport pandas as pd\nrng = np.random.default_rng(24)\nn = 3000\nmonth = rng.integers(1, 13, n)\nincome = rng.normal(320, 90, n)\ndebt_ratio = rng.uniform(0, 1, n)\nage = rng.integers(21, 65, n)\ndrift = np.where(month > 9, 0.6, 1.0)\nz = -2.2 + drift * (-0.006 * (income - 320) + 2.0 * (debt_ratio - 0.5)) - 0.02 * (age - 40)\ndefault = (rng.random(n) < 1 / (1 + np.exp(-z))).astype(int)\ndf = pd.DataFrame({\"month\": month, \"income\": income, \"debt_ratio\": debt_ratio, \"age\": age, \"default\": default})\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import roc_auc_score\n\ndef oot_gini(df, cutoff):\n    pass\n",
   "solution": "import numpy as np\nimport pandas as pd\nrng = np.random.default_rng(24)\nn = 3000\nmonth = rng.integers(1, 13, n)\nincome = rng.normal(320, 90, n)\ndebt_ratio = rng.uniform(0, 1, n)\nage = rng.integers(21, 65, n)\ndrift = np.where(month > 9, 0.6, 1.0)\nz = -2.2 + drift * (-0.006 * (income - 320) + 2.0 * (debt_ratio - 0.5)) - 0.02 * (age - 40)\ndefault = (rng.random(n) < 1 / (1 + np.exp(-z))).astype(int)\ndf = pd.DataFrame({\"month\": month, \"income\": income, \"debt_ratio\": debt_ratio, \"age\": age, \"default\": default})\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import roc_auc_score\n\ndef oot_gini(df, cutoff):\n    train, test = df[df[\"month\"] < cutoff], df[df[\"month\"] >= cutoff]\n    features = [c for c in df.columns if c not in (\"month\", \"default\")]\n    pipe = Pipeline([(\"scaler\", StandardScaler()), (\"model\", LogisticRegression(max_iter=1000))])\n    pipe.fit(train[features], train[\"default\"])\n    g_train = 2 * roc_auc_score(train[\"default\"], pipe.predict_proba(train[features])[:, 1]) - 1\n    g_test = 2 * roc_auc_score(test[\"default\"], pipe.predict_proba(test[features])[:, 1]) - 1\n    return g_train, g_test\n\nprint(oot_gini(df, 10))\n",
   "hints": [
    "Split: <code>train, test = df[df[\"month\"] &lt; cutoff], df[df[\"month\"] &gt;= cutoff]</code>.",
    "Белгілер: <code>[c for c in df.columns if c not in (\"month\", \"default\")]</code>.",
    "<code>pipe.fit(train[features], train[\"default\"])</code>, сосын әр бөлікте <code>2 * roc_auc_score(...) - 1</code>."
   ],
   "check": {
    "tests": "from sklearn.pipeline import Pipeline as _P\nfrom sklearn.preprocessing import StandardScaler as _S\nfrom sklearn.linear_model import LogisticRegression as _L\nfrom sklearn.metrics import roc_auc_score as _auc\ndef _ref(d, cut):\n    tr, te = d[d[\"month\"] < cut], d[d[\"month\"] >= cut]\n    f = [c for c in d.columns if c not in (\"month\", \"default\")]\n    p = _P([(\"s\", _S()), (\"m\", _L(max_iter=1000))]).fit(tr[f], tr[\"default\"])\n    return 2 * _auc(tr[\"default\"], p.predict_proba(tr[f])[:, 1]) - 1, 2 * _auc(te[\"default\"], p.predict_proba(te[f])[:, 1]) - 1\n_r = oot_gini(df, 10)\nassert _r is not None and len(_r) == 2, \"(gini_train, gini_test) жұбын қайтарыңыз\"\n_e = _ref(df, 10)\nassert abs(float(_r[0]) - _e[0]) < 1e-6, f\"gini_train ≈ {_e[0]:.4f} болуы керек, сізде {float(_r[0]):.4f}. month мен default белгілерге кірмейді, scaler тек train-де fit\"\nassert abs(float(_r[1]) - _e[1]) < 1e-6, f\"gini_test ≈ {_e[1]:.4f} болуы керек, сізде {float(_r[1]):.4f}. test — month >= cutoff\"\nassert float(_r[1]) < float(_r[0]) - 0.05, \"Drift кесірінен out-of-time Gini train-нен төмен\"\n_e7 = _ref(df, 7)\nassert abs(float(oot_gini(df, 7)[1]) - _e7[1]) < 1e-6, \"cutoff параметрін қолданыңыз\"",
    "mustInclude": [
     "def oot_gini",
     "Pipeline"
    ]
   }
  }
 ]
});
