// Practice tasks after the lessons of m3-6. Each lesson's list opens one task at a time.
DJ.addPractice('m3-6', {
 "ba-2": [
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "easy",
   "xp": 10,
   "title": "Жалпы табыс",
   "prompt": "<p><code>payments</code> кестесінен бүкіл кезеңдегі жалпы табысты <code>revenue</code> және төлемдер санын <code>n_payments</code> бір жолда шығарыңыз.</p>",
   "starter": "",
   "solution": "SELECT SUM(amount) AS revenue, COUNT(*) AS n_payments FROM payments;",
   "hints": [
    "<code>SUM(amount)</code>, <code>COUNT(*)</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Әр тапсырыстың сомасы",
   "prompt": "<p>AOV-тің бірінші қадамы: әр <code>delivered</code> тапсырыстың сомасы. <code>id</code>, <code>total</code> (<code>quantity × price</code> қосындысы), сома бойынша кему ретімен.</p>",
   "starter": "",
   "solution": "SELECT o.id, SUM(oi.quantity * p.price) AS total FROM orders o JOIN order_items oi ON oi.order_id = o.id JOIN products p ON p.id = oi.product_id WHERE o.status = 'delivered' GROUP BY o.id ORDER BY total DESC;",
   "hints": [
    "Үш кестені JOIN жасап, <code>GROUP BY o.id</code>."
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
   "title": "Бір төлемнің орташасы",
   "prompt": "<p><code>payments</code> бойынша бір төлемнің орташа сомасын <code>avg_payment</code> (бүтінге дейін <code>ROUND</code>) шығарыңыз.</p>",
   "starter": "",
   "solution": "SELECT ROUND(AVG(amount)) AS avg_payment FROM payments;",
   "hints": [
    "<code>ROUND(AVG(amount))</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "medium",
   "xp": 15,
   "title": "Айлық ARPU",
   "prompt": "<p>ARPU = табыс / <b>барлық</b> белсенді пайдаланушылар. Әр ай үшін <code>month</code>, <code>revenue</code> (<code>payments</code>), <code>active</code> (<code>activity</code>-дегі бірегей пайдаланушылар) және <code>arpu</code> (бір ондық белгі) шығарыңыз. Ай ретімен.</p>",
   "starter": "",
   "solution": "WITH r AS (SELECT month, SUM(amount) AS revenue FROM payments GROUP BY month), a AS (SELECT month, COUNT(DISTINCT user_id) AS active FROM activity GROUP BY month) SELECT r.month, r.revenue, a.active, ROUND(r.revenue * 1.0 / a.active, 1) AS arpu FROM r JOIN a ON a.month = r.month ORDER BY r.month;",
   "hints": [
    "Екі CTE: айлық табыс және айлық белсенділер.",
    "Оларды <code>month</code> бойынша JOIN жасаңыз."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "WITH"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "medium",
   "xp": 15,
   "title": "Төлеушілер үлесі",
   "prompt": "<p>Әр айда белсенділердің неше пайызы төледі? <code>month</code>, <code>active</code>, <code>payers</code>, <code>payer_pct</code> (бір ондық белгі). Ай ретімен.</p>",
   "starter": "",
   "solution": "WITH a AS (SELECT month, COUNT(DISTINCT user_id) AS active FROM activity GROUP BY month), p AS (SELECT month, COUNT(DISTINCT user_id) AS payers FROM payments GROUP BY month) SELECT a.month, a.active, p.payers, ROUND(100.0 * p.payers / a.active, 1) AS payer_pct FROM a JOIN p ON p.month = a.month ORDER BY a.month;",
   "hints": [
    "<code>ROUND(100.0 * p.payers / a.active, 1)</code>"
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Клиенттің орташа чегі",
   "prompt": "<p>Әр клиенттің <code>delivered</code> тапсырыстары бойынша: <code>name</code>, <code>orders</code> (тапсырыс саны), <code>aov</code> (орташа чек). <code>aov</code> бойынша кему ретімен.</p>",
   "starter": "",
   "solution": "WITH t AS (SELECT o.id, o.customer_id, SUM(oi.quantity * p.price) AS total FROM orders o JOIN order_items oi ON oi.order_id = o.id JOIN products p ON p.id = oi.product_id WHERE o.status = 'delivered' GROUP BY o.id, o.customer_id) SELECT c.name, COUNT(*) AS orders, AVG(t.total) AS aov FROM t JOIN customers c ON c.id = t.customer_id GROUP BY c.id, c.name ORDER BY aov DESC;",
   "hints": [
    "Алдымен тапсырыс деңгейінде сома (CTE), сосын клиент бойынша <code>AVG</code>.",
    "Жолдарды тікелей <code>AVG(quantity * price)</code> етсеңіз, тауар деңгейіндегі орташа шығады."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "WITH"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Қала бойынша AOV",
   "prompt": "<p>Delivered тапсырыстар бойынша әр қаланың орташа чегі: <code>city</code>, <code>orders</code>, <code>aov</code> (бүтінге дейін <code>ROUND</code>). <code>aov</code> бойынша кему ретімен.</p>",
   "starter": "",
   "solution": "WITH t AS (SELECT o.id, o.customer_id, SUM(oi.quantity * p.price) AS total FROM orders o JOIN order_items oi ON oi.order_id = o.id JOIN products p ON p.id = oi.product_id WHERE o.status = 'delivered' GROUP BY o.id, o.customer_id) SELECT c.city, COUNT(*) AS orders, ROUND(AVG(t.total)) AS aov FROM t JOIN customers c ON c.id = t.customer_id GROUP BY c.city ORDER BY aov DESC;",
   "hints": [
    "CTE-де тапсырыс сомасы мен <code>customer_id</code>.",
    "Сосын <code>customers</code>-пен JOIN және <code>GROUP BY c.city</code>."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "WITH"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "hard",
   "xp": 20,
   "title": "ARPU мен ARPPU қатар",
   "prompt": "<p>Әр ай үшін <code>month</code>, <code>arpu</code> (табыс / белсенді пайдаланушылар) және <code>arppu</code> (табыс / төлеушілер) шығарыңыз, екеуі де бір ондық белгіге дейін. Ай ретімен. Екеуінің айырмасы неге байланысты?</p>",
   "starter": "",
   "solution": "WITH p AS (SELECT month, SUM(amount) AS revenue, COUNT(DISTINCT user_id) AS payers FROM payments GROUP BY month), a AS (SELECT month, COUNT(DISTINCT user_id) AS active FROM activity GROUP BY month) SELECT p.month, ROUND(p.revenue * 1.0 / a.active, 1) AS arpu, ROUND(p.revenue * 1.0 / p.payers, 1) AS arppu FROM p JOIN a ON a.month = p.month ORDER BY p.month;",
   "hints": [
    "Бір CTE-де табыс пен төлеушілер, екіншісінде белсенділер."
   ],
   "check": {
    "ordered": true
   }
  }
 ],
 "ba-3": [
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "easy",
   "xp": 10,
   "title": "Себетке жеткендер",
   "prompt": "<p><code>events</code> кестесінде <code>cart</code> қадамына жеткен бірегей пайдаланушылар санын <code>cart_users</code> шығарыңыз.</p>",
   "starter": "",
   "solution": "SELECT COUNT(DISTINCT user_id) AS cart_users FROM events WHERE step = 'cart';",
   "hints": [
    "<code>WHERE step = 'cart'</code> және <code>COUNT(DISTINCT user_id)</code>."
   ]
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "easy",
   "xp": 10,
   "title": "Жалпы конверсия",
   "prompt": "<p>Сайтқа кіргендердің неше пайызы сатып алды? <code>conversion</code> бір мәнмен (бір ондық белгі): <code>purchase</code> жасағандар / <code>visit</code> жасағандар × 100.</p>",
   "starter": "",
   "solution": "SELECT ROUND(100.0 * COUNT(DISTINCT CASE WHEN step = 'purchase' THEN user_id END) / COUNT(DISTINCT CASE WHEN step = 'visit' THEN user_id END), 1) AS conversion FROM events;",
   "hints": [
    "<code>COUNT(DISTINCT CASE WHEN step = 'purchase' THEN user_id END)</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "easy",
   "xp": 10,
   "title": "Сатып алғандардың арнасы",
   "prompt": "<p><code>purchase</code> қадамына жеткен пайдаланушылар: <code>id</code>, <code>channel</code>. <code>id</code> ретімен.</p>",
   "starter": "",
   "solution": "SELECT u.id, u.channel FROM users u JOIN events e ON e.user_id = u.id WHERE e.step = 'purchase' ORDER BY u.id;",
   "hints": [
    "<code>users</code> мен <code>events</code>-ті JOIN жасаңыз."
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
   "title": "Қадамдық конверсиялар",
   "prompt": "<p>Бір жолда шығарыңыз: <code>visit</code>, <code>cart</code>, <code>purchase</code> (бірегей пайдаланушылар), <code>cart_rate</code> (cart / visit, %) және <code>purchase_rate</code> (purchase / cart, %), пайыздар бір ондық белгіге дейін.</p>",
   "starter": "",
   "solution": "WITH f AS (SELECT COUNT(DISTINCT CASE WHEN step = 'visit' THEN user_id END) AS visit, COUNT(DISTINCT CASE WHEN step = 'cart' THEN user_id END) AS cart, COUNT(DISTINCT CASE WHEN step = 'purchase' THEN user_id END) AS purchase FROM events) SELECT visit, cart, purchase, ROUND(100.0 * cart / visit, 1) AS cart_rate, ROUND(100.0 * purchase / cart, 1) AS purchase_rate FROM f;",
   "hints": [
    "Алдымен CTE-де үш санды есептеңіз (сабақтағы сұрау).",
    "Сосын сыртқы сұрауда пайыздар."
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
   "title": "Тіркелу айы бойынша воронка",
   "prompt": "<p>Тіркелу айы бойынша воронка: <code>signup_month</code>, <code>visit</code>, <code>cart</code>, <code>purchase</code>. Ай ретімен.</p>",
   "starter": "",
   "solution": "SELECT u.signup_month, COUNT(DISTINCT CASE WHEN e.step = 'visit' THEN e.user_id END) AS visit, COUNT(DISTINCT CASE WHEN e.step = 'cart' THEN e.user_id END) AS cart, COUNT(DISTINCT CASE WHEN e.step = 'purchase' THEN e.user_id END) AS purchase FROM users u JOIN events e ON e.user_id = u.id GROUP BY u.signup_month ORDER BY u.signup_month;",
   "hints": [
    "Сабақтағы сұрау, бірақ <code>GROUP BY u.signup_month</code>."
   ],
   "check": {
    "ordered": true,
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
   "title": "Себетте тоқтағандар",
   "prompt": "<p>Тауарды себетке салып (<code>cart</code>), бірақ сатып алмаған (<code>purchase</code> жоқ) пайдаланушылар: <code>user_id</code>, өсу ретімен.</p>",
   "starter": "",
   "solution": "SELECT DISTINCT e.user_id FROM events e WHERE e.step = 'cart' AND NOT EXISTS (SELECT 1 FROM events p WHERE p.user_id = e.user_id AND p.step = 'purchase') ORDER BY e.user_id;",
   "hints": [
    "<code>NOT EXISTS (SELECT 1 FROM events p WHERE p.user_id = e.user_id AND p.step = 'purchase')</code>"
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
   "title": "Арна конверсиясы",
   "prompt": "<p>Арна бойынша жалпы конверсия: <code>channel</code>, <code>visit</code>, <code>purchase</code>, <code>conv_pct</code> (purchase / visit × 100, бір ондық белгі). <code>conv_pct</code> бойынша кему ретімен, тең болса арна атауы бойынша.</p>",
   "starter": "",
   "solution": "WITH f AS (SELECT u.channel, COUNT(DISTINCT CASE WHEN e.step = 'visit' THEN e.user_id END) AS visit, COUNT(DISTINCT CASE WHEN e.step = 'purchase' THEN e.user_id END) AS purchase FROM users u JOIN events e ON e.user_id = u.id GROUP BY u.channel) SELECT channel, visit, purchase, ROUND(100.0 * purchase / visit, 1) AS conv_pct FROM f ORDER BY conv_pct DESC, channel;",
   "hints": [
    "CTE-де арна бойынша воронка, сыртында пайыз."
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
   "title": "Ең әлсіз қадам",
   "prompt": "<p>Воронканың қай қадамында пайыздық жоғалту ең үлкен? Әр қадамның алдыңғы қадамнан конверсиясын (<code>cart</code>: cart / visit, <code>purchase</code>: purchase / cart) есептеп, ең төменін бір жолмен шығарыңыз: <code>step</code>, <code>rate</code> (%, бір ондық белгі). <code>UNION ALL</code> қолданыңыз.</p>",
   "starter": "",
   "solution": "WITH f AS (SELECT COUNT(DISTINCT CASE WHEN step = 'visit' THEN user_id END) AS visit, COUNT(DISTINCT CASE WHEN step = 'cart' THEN user_id END) AS cart, COUNT(DISTINCT CASE WHEN step = 'purchase' THEN user_id END) AS purchase FROM events), r AS (SELECT 'cart' AS step, ROUND(100.0 * cart / visit, 1) AS rate FROM f UNION ALL SELECT 'purchase', ROUND(100.0 * purchase / cart, 1) FROM f) SELECT step, rate FROM r ORDER BY rate LIMIT 1;",
   "hints": [
    "Бірінші CTE: воронка сандары. Екінші CTE: екі жол <code>UNION ALL</code> арқылы.",
    "<code>ORDER BY rate LIMIT 1</code>"
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "UNION ALL"
    ]
   }
  }
 ],
 "ba-4": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Churn үлесі",
   "prompt": "<p><code>churn_rate(start, lost)</code> функциясы churn-ды үлес ретінде қайтарсын: айдың басындағы клиенттер <code>start</code>, келесі айда кеткендер <code>lost</code>. Мысалы, <code>churn_rate(200, 30)</code> → <code>0.15</code>.</p>",
   "starter": "def churn_rate(start, lost):\n    pass\n",
   "solution": "def churn_rate(start, lost):\n    return lost / start\n",
   "hints": [
    "<code>lost / start</code>"
   ],
   "check": {
    "tests": "assert abs(churn_rate(200, 30) - 0.15) < 1e-9, \"churn_rate(200, 30) 0.15 болуы керек\"\nassert churn_rate(50, 0) == 0, \"Ешкім кетпесе: 0\"\nassert abs(churn_rate(8, 2) - 0.25) < 1e-9, \"churn_rate(8, 2) 0.25 болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Клиенттің өмір ұзақтығы",
   "prompt": "<p><code>lifetime(churn)</code> функциясы клиенттің орташа өмір ұзақтығын айлармен қайтарсын: <code>1 / churn</code>. Мысалы, <code>lifetime(0.1)</code> → <code>10.0</code>.</p>",
   "starter": "def lifetime(churn):\n    pass\n",
   "solution": "def lifetime(churn):\n    return 1 / churn\n",
   "hints": [
    "<code>1 / churn</code>"
   ],
   "check": {
    "tests": "assert abs(lifetime(0.1) - 10) < 1e-9, \"lifetime(0.1) 10 болуы керек\"\nassert abs(lifetime(0.25) - 4) < 1e-9, \"lifetime(0.25) 4 болуы керек\""
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "easy",
   "xp": 10,
   "title": "Когорт өлшемдері",
   "prompt": "<p>Әр тіркелу айында неше пайдаланушы келді? <code>signup_month</code>, <code>users</code>. Ай ретімен.</p>",
   "starter": "",
   "solution": "SELECT signup_month, COUNT(*) AS users FROM users GROUP BY signup_month ORDER BY signup_month;",
   "hints": [
    "<code>GROUP BY signup_month ORDER BY signup_month</code>"
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Retention қисығы",
   "prompt": "<p><code>retention_curve(counts)</code> функциясы когорттың әр айдағы белсенділер санын (<code>counts[0]</code> — когорт өлшемі) пайызға айналдырсын, 1 ондық белгіге дейін <code>round</code>. Мысалы, <code>retention_curve([200, 90, 64])</code> → <code>[100.0, 45.0, 32.0]</code>.</p>",
   "starter": "def retention_curve(counts):\n    pass\n",
   "solution": "def retention_curve(counts):\n    return [round(c * 100 / counts[0], 1) for c in counts]\n",
   "hints": [
    "Әр санды <code>counts[0]</code>-ге бөліп, 100-ге көбейтіңіз."
   ],
   "check": {
    "tests": "assert retention_curve([200, 90, 64]) == [100.0, 45.0, 32.0], \"retention_curve([200, 90, 64]) [100.0, 45.0, 32.0] болуы керек\"\nassert retention_curve([3, 2, 1]) == [100.0, 66.7, 33.3], \"retention_curve([3, 2, 1]) [100.0, 66.7, 33.3] болуы керек\""
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "medium",
   "xp": 15,
   "title": "Қыркүйекте келмегендер",
   "prompt": "<p>Тамызда (<code>2024-08</code>) белсенді болып, қыркүйекте (<code>2024-09</code>) белсенді болмаған пайдаланушылар: <code>user_id</code>, өсу ретімен.</p>",
   "starter": "",
   "solution": "SELECT a.user_id FROM activity a WHERE a.month = '2024-08' AND NOT EXISTS (SELECT 1 FROM activity b WHERE b.user_id = a.user_id AND b.month = '2024-09') ORDER BY a.user_id;",
   "hints": [
    "<code>NOT EXISTS</code> ішінде <code>b.month = '2024-09'</code>."
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Churn-ды дұрыс бөлу",
   "prompt": "<p><code>churn_from_sets(start_ids, next_ids)</code> функциясы екі жиынды алсын: айдың басындағы белсенділер және келесі айдағы белсенділер. Churn — басындағылардың ішінен келесі айда жоқтардың үлесі (2 ондық белгіге дейін <code>round</code>). Келесі айда жаңадан қосылғандар бөлімге <b>кірмейді</b>.</p><p>Мысалы, <code>churn_from_sets({1, 2, 3, 4}, {1, 4, 9, 10})</code> → <code>0.5</code>.</p>",
   "starter": "def churn_from_sets(start_ids, next_ids):\n    pass\n",
   "solution": "def churn_from_sets(start_ids, next_ids):\n    lost = len(start_ids - next_ids)\n    return round(lost / len(start_ids), 2)\n",
   "hints": [
    "Кеткендер: <code>start_ids - next_ids</code> (жиындардың айырмасы).",
    "Бөлім — <code>len(start_ids)</code>."
   ],
   "check": {
    "tests": "assert churn_from_sets({1, 2, 3, 4}, {1, 4, 9, 10}) == 0.5, \"churn_from_sets({1, 2, 3, 4}, {1, 4, 9, 10}) 0.5 болуы керек\"\nassert churn_from_sets({1, 2, 3}, {1, 2, 3, 4, 5, 6}) == 0, \"Ешкім кетпеді: жаңалар churn-ды азайтпайды, 0\"\nassert churn_from_sets({1, 2, 3}, {7}) == 1, \"Бәрі кетті: 1\""
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "hard",
   "xp": 20,
   "title": "Тамыздан қыркүйекке churn",
   "prompt": "<p>Бір жолда шығарыңыз: <code>active_aug</code> (тамыздағы белсенділер), <code>lost</code> (олардың қыркүйекте белсенді болмағандары), <code>churn_pct</code> (lost / active_aug × 100, бір ондық белгі). Бөлімге тек тамыздағы белсенділер кіреді.</p>",
   "starter": "",
   "solution": "WITH aug AS (SELECT DISTINCT user_id FROM activity WHERE month = '2024-08'), s AS (SELECT COUNT(*) AS active_aug, SUM(NOT EXISTS (SELECT 1 FROM activity b WHERE b.user_id = aug.user_id AND b.month = '2024-09')) AS lost FROM aug) SELECT active_aug, lost, ROUND(100.0 * lost / active_aug, 1) AS churn_pct FROM s;",
   "hints": [
    "CTE: тамыздағы бірегей пайдаланушылар.",
    "<code>SUM(NOT EXISTS (...))</code> кеткендерді санайды."
   ],
   "check": {
    "mustInclude": [
     "WITH"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Когорттық retention кестесі",
   "prompt": "<p><code>cohort_retention(users, activity)</code> функциясын жазыңыз. <code>users</code> — <code>{user_id: тіркелу_айы}</code>, <code>activity</code> — <code>(user_id, ай)</code> жұптарының тізімі (айлар <code>\"2024-07\"</code> түрінде). Функция <code>{когорт: [пайыздар]}</code> қайтарсын: <code>activity</code>-дегі барлық айлардың сұрыпталған тізімінен когорт айынан бастап әр айға когорттың сол айда белсенді болған бөлігі, %, 1 ондық белгіге дейін.</p>",
   "starter": "def cohort_retention(users, activity):\n    pass\n",
   "solution": "def cohort_retention(users, activity):\n    months = sorted({m for _, m in activity})\n    active = {}\n    for uid, m in activity:\n        active.setdefault(m, set()).add(uid)\n    out = {}\n    for c in sorted(set(users.values())):\n        members = {u for u, cm in users.items() if cm == c}\n        out[c] = [round(len(members & active[m]) * 100 / len(members), 1) for m in months if m >= c]\n    return out\n",
   "hints": [
    "Әр айдың белсенділерін жиынға жинаңыз: <code>active[m]</code>.",
    "Когорт мүшелері мен айдың белсенділерінің қиылысы: <code>members &amp; active[m]</code>."
   ],
   "check": {
    "tests": "_u = {1: \"2024-07\", 2: \"2024-07\", 3: \"2024-07\", 4: \"2024-07\", 5: \"2024-08\", 6: \"2024-08\", 7: \"2024-08\", 8: \"2024-08\", 9: \"2024-08\", 10: \"2024-09\", 11: \"2024-09\", 12: \"2024-09\"}\n_a = [(1, \"2024-07\"), (2, \"2024-07\"), (3, \"2024-07\"), (4, \"2024-07\"), (1, \"2024-08\"), (2, \"2024-08\"), (4, \"2024-08\"), (1, \"2024-09\"), (4, \"2024-09\"), (5, \"2024-08\"), (6, \"2024-08\"), (7, \"2024-08\"), (8, \"2024-08\"), (9, \"2024-08\"), (5, \"2024-09\"), (8, \"2024-09\"), (9, \"2024-09\"), (10, \"2024-09\"), (11, \"2024-09\"), (12, \"2024-09\")]\n_r = cohort_retention(_u, _a)\nassert _r == {\"2024-07\": [100.0, 75.0, 50.0], \"2024-08\": [100.0, 60.0], \"2024-09\": [100.0]}, f\"Нәтиже дұрыс емес: {_r}\""
   }
  }
 ],
 "ba-5": [
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "easy",
   "xp": 10,
   "title": "Жалпы жарнама шығыны",
   "prompt": "<p><code>ad_spend</code> кестесінен бүкіл кезеңдегі жарнама шығынын <code>total_spend</code> бір мәнмен шығарыңыз.</p>",
   "starter": "",
   "solution": "SELECT SUM(spend) AS total_spend FROM ad_spend;",
   "hints": [
    "<code>SUM(spend)</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "easy",
   "xp": 10,
   "title": "Ай бойынша шығын",
   "prompt": "<p>Әр айда жарнамаға қанша жұмсалды? <code>month</code>, <code>spend</code>. Ай ретімен.</p>",
   "starter": "",
   "solution": "SELECT month, SUM(spend) AS spend FROM ad_spend GROUP BY month ORDER BY month;",
   "hints": [
    "<code>GROUP BY month ORDER BY month</code>"
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
   "title": "Арна бойынша жаңа клиенттер",
   "prompt": "<p>Әр арна неше пайдаланушы әкелді? <code>channel</code>, <code>users</code>. Саны бойынша кему ретімен, тең болса арна атауы бойынша.</p>",
   "starter": "",
   "solution": "SELECT channel, COUNT(*) AS users FROM users GROUP BY channel ORDER BY users DESC, channel;",
   "hints": [
    "<code>ORDER BY users DESC, channel</code>"
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
   "title": "Ақылы арналардың CAC-ы",
   "prompt": "<p>Органикалық клиенттер CAC-ты жасанды түрде төмендетеді. Тек ақылы арналар (<code>ad_spend</code>-та бар арналар) бойынша жалпы CAC-ты <code>cac</code> бір мәнмен шығарыңыз (бір ондық белгі): барлық шығын / сол арналардан келген пайдаланушылар.</p>",
   "starter": "",
   "solution": "SELECT ROUND((SELECT SUM(spend) FROM ad_spend) * 1.0 / (SELECT COUNT(*) FROM users WHERE channel IN (SELECT channel FROM ad_spend)), 1) AS cac;",
   "hints": [
    "Бөлім: <code>SELECT COUNT(*) FROM users WHERE channel IN (SELECT channel FROM ad_spend)</code>."
   ]
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "medium",
   "xp": 15,
   "title": "Айлық CAC",
   "prompt": "<p><code>ads</code> арнасының әр айдағы CAC-ы: <code>month</code>, <code>spend</code>, <code>new_users</code> (сол айда <code>ads</code> арқылы тіркелгендер), <code>cac</code>. Ай ретімен.</p>",
   "starter": "",
   "solution": "WITH u AS (SELECT signup_month AS month, COUNT(*) AS new_users FROM users WHERE channel = 'ads' GROUP BY signup_month) SELECT s.month, s.spend, u.new_users, s.spend * 1.0 / u.new_users AS cac FROM ad_spend s JOIN u ON u.month = s.month WHERE s.channel = 'ads' ORDER BY s.month;",
   "hints": [
    "CTE: <code>ads</code> арнасының ай бойынша жаңа пайдаланушылары.",
    "<code>ad_spend</code>-пен <code>month</code> бойынша JOIN."
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
   "title": "Арна әкелген табыс",
   "prompt": "<p>Әр арнаның пайдаланушылары бүкіл кезеңде қанша төледі? <code>channel</code>, <code>revenue</code>. Табыс бойынша кему ретімен.</p>",
   "starter": "",
   "solution": "SELECT u.channel, SUM(p.amount) AS revenue FROM users u JOIN payments p ON p.user_id = u.id GROUP BY u.channel ORDER BY revenue DESC;",
   "hints": [
    "<code>users</code> мен <code>payments</code>-ті JOIN жасап, <code>GROUP BY u.channel</code>."
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
   "title": "Табыс пен CAC салыстыру",
   "prompt": "<p>Ақылы арналар бойынша: <code>channel</code>, <code>cac</code> (шығын / пайдаланушылар), <code>rev_per_user</code> (табыс / пайдаланушылар) және <code>ratio</code> = rev_per_user / cac (екі ондық белгі). Әр клиент өз құнын ақтады ма?</p>",
   "starter": "",
   "solution": "WITH s AS (SELECT channel, SUM(spend) AS spend FROM ad_spend GROUP BY channel), u AS (SELECT channel, COUNT(*) AS n FROM users GROUP BY channel), r AS (SELECT u.channel, SUM(p.amount) AS revenue FROM users u JOIN payments p ON p.user_id = u.id GROUP BY u.channel) SELECT s.channel, s.spend * 1.0 / u.n AS cac, r.revenue * 1.0 / u.n AS rev_per_user, ROUND(r.revenue * 1.0 / s.spend, 2) AS ratio FROM s JOIN u ON u.channel = s.channel JOIN r ON r.channel = s.channel;",
   "hints": [
    "Үш CTE: шығын, пайдаланушылар саны, табыс (бәрі арна бойынша).",
    "rev_per_user / cac = табыс / шығын."
   ],
   "check": {
    "mustInclude": [
     "WITH"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "hard",
   "xp": 20,
   "title": "Payback айлары",
   "prompt": "<p>Деректе 3 ай бар. Ақылы арналар бойынша <code>channel</code>, <code>cac</code>, <code>arpu_month</code> (арна табысы / пайдаланушылар / 3, бір ондық белгі) және <code>payback</code> = cac / (arpu_month × 0.5) (маржа 50%, айлармен, бір ондық белгі) шығарыңыз. <code>payback</code> бойынша өсу ретімен.</p>",
   "starter": "",
   "solution": "WITH s AS (SELECT channel, SUM(spend) AS spend FROM ad_spend GROUP BY channel), u AS (SELECT channel, COUNT(*) AS n FROM users GROUP BY channel), r AS (SELECT u.channel, SUM(p.amount) AS revenue FROM users u JOIN payments p ON p.user_id = u.id GROUP BY u.channel), m AS (SELECT s.channel, s.spend * 1.0 / u.n AS cac, r.revenue * 1.0 / u.n / 3 AS arpu FROM s JOIN u ON u.channel = s.channel JOIN r ON r.channel = s.channel) SELECT channel, cac, ROUND(arpu, 1) AS arpu_month, ROUND(cac / (arpu * 0.5), 1) AS payback FROM m ORDER BY payback;",
   "hints": [
    "Алдыңғы тапсырмадағы CTE-лерге тағы біреуін қосыңыз: <code>cac</code> және айлық <code>arpu</code>.",
    "Payback = CAC / (ARPU × маржа)."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "WITH"
    ]
   }
  }
 ],
 "ba-6": [
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "easy",
   "xp": 10,
   "title": "Алдыңғы айдың табысы",
   "prompt": "<p><code>payments</code> бойынша <code>month</code>, <code>revenue</code> және <code>prev_revenue</code> (алдыңғы айдың табысы, <code>LAG</code>) шығарыңыз. Ай ретімен.</p>",
   "starter": "",
   "solution": "WITH m AS (SELECT month, SUM(amount) AS revenue FROM payments GROUP BY month) SELECT month, revenue, LAG(revenue) OVER (ORDER BY month) AS prev_revenue FROM m ORDER BY month;",
   "hints": [
    "<code>LAG(revenue) OVER (ORDER BY month)</code>"
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
   "level": "easy",
   "xp": 10,
   "title": "Белсенділердің абсолют өзгерісі",
   "prompt": "<p>Пайызбен бірге абсолют санды да көрсетеміз. Әр ай үшін <code>month</code>, <code>active</code> (<code>activity</code>-дегі бірегей пайдаланушылар) және <code>diff</code> (өткен аймен айырма) шығарыңыз. Ай ретімен.</p>",
   "starter": "",
   "solution": "WITH a AS (SELECT month, COUNT(DISTINCT user_id) AS active FROM activity GROUP BY month) SELECT month, active, active - LAG(active) OVER (ORDER BY month) AS diff FROM a ORDER BY month;",
   "hints": [
    "<code>active - LAG(active) OVER (ORDER BY month)</code>"
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
   "level": "easy",
   "xp": 10,
   "title": "Тамыз бен қыркүйек",
   "prompt": "<p><code>payments</code> бойынша бір жолда: <code>aug</code> (тамыз табысы), <code>sep</code> (қыркүйек табысы), <code>growth_pct</code> (өсім, %, бір ондық белгі). Шартты қосынды қолданыңыз.</p>",
   "starter": "",
   "solution": "WITH s AS (SELECT SUM(CASE WHEN month = '2024-08' THEN amount END) AS aug, SUM(CASE WHEN month = '2024-09' THEN amount END) AS sep FROM payments) SELECT aug, sep, ROUND((sep - aug) * 100.0 / aug, 1) AS growth_pct FROM s;",
   "hints": [
    "<code>SUM(CASE WHEN month = '2024-08' THEN amount END)</code>"
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
   "title": "Аймақтың күндік өзгерісі",
   "prompt": "<p>Әр аймақ үшін күндік табыстың алдыңғы күннен өзгерісі: <code>region</code>, <code>day</code>, <code>revenue</code>, <code>change</code>. Аймақ, сосын күн ретімен.</p>",
   "starter": "",
   "solution": "SELECT region, day, revenue, revenue - LAG(revenue) OVER (PARTITION BY region ORDER BY day) AS change FROM daily_sales ORDER BY region, day;",
   "hints": [
    "<code>LAG(revenue) OVER (PARTITION BY region ORDER BY day)</code>"
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "PARTITION BY"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "medium",
   "xp": 15,
   "title": "Төлеушілер санының MoM",
   "prompt": "<p>Төлеушілер саны айдан айға қалай өзгерді? <code>month</code>, <code>payers</code> (бірегей), <code>mom_pct</code> (бір ондық белгі). Ай ретімен.</p>",
   "starter": "",
   "solution": "WITH p AS (SELECT month, COUNT(DISTINCT user_id) AS payers FROM payments GROUP BY month) SELECT month, payers, ROUND((payers - LAG(payers) OVER (ORDER BY month)) * 100.0 / LAG(payers) OVER (ORDER BY month), 1) AS mom_pct FROM p ORDER BY month;",
   "hints": [
    "Сабақтағы MoM сұрауы, бірақ <code>revenue</code> орнына <code>payers</code>."
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
   "title": "Толық 7 күндік орта",
   "prompt": "<p>Жиынтық күндік табыстың 7 күндік жылжымалы орташасы <code>ma7</code> (бір ондық белгі). Тек толық 7 күн жиналған күндерді (<code>2024-09-07</code> және одан кейін) шығарыңыз: <code>day</code>, <code>revenue</code>, <code>ma7</code>. Күн ретімен.</p>",
   "starter": "",
   "solution": "WITH t AS (SELECT day, SUM(revenue) AS revenue FROM daily_sales GROUP BY day), w AS (SELECT day, revenue, ROUND(AVG(revenue) OVER (ORDER BY day ROWS 6 PRECEDING), 1) AS ma7 FROM t) SELECT day, revenue, ma7 FROM w WHERE day >= '2024-09-07' ORDER BY day;",
   "hints": [
    "Window нәтижесін сүзу үшін тағы бір CTE керек.",
    "<code>AVG(revenue) OVER (ORDER BY day ROWS 6 PRECEDING)</code>"
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "PRECEDING"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "hard",
   "xp": 20,
   "title": "Ең жақсы өсім айы",
   "prompt": "<p>MoM өсімі (<code>payments</code> табысы бойынша) ең жоғары болған айды бір жолмен шығарыңыз: <code>month</code>, <code>mom_pct</code> (бір ондық белгі).</p>",
   "starter": "",
   "solution": "WITH m AS (SELECT month, SUM(amount) AS revenue FROM payments GROUP BY month), g AS (SELECT month, ROUND((revenue - LAG(revenue) OVER (ORDER BY month)) * 100.0 / LAG(revenue) OVER (ORDER BY month), 1) AS mom_pct FROM m) SELECT month, mom_pct FROM g WHERE mom_pct IS NOT NULL ORDER BY mom_pct DESC LIMIT 1;",
   "hints": [
    "Екі CTE: айлық табыс және MoM.",
    "Бірінші айдың <code>mom_pct</code>-ы NULL: оны сүзіп, <code>ORDER BY mom_pct DESC LIMIT 1</code>."
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
   "level": "hard",
   "xp": 20,
   "title": "Аймақтың өсімге үлесі",
   "prompt": "<p>Кезеңнің бірінші күнінен соңғы күніне дейін табыс қанша өсті және оның қандай бөлігі әр аймақтан? <code>region</code>, <code>growth</code> (соңғы күн − бірінші күн), <code>share_pct</code> (аймақтың жалпы өсімдегі үлесі, %, бір ондық белгі). Бірінші және соңғы күнді <code>MIN(day)</code> мен <code>MAX(day)</code> арқылы табыңыз.</p>",
   "starter": "",
   "solution": "WITH g AS (SELECT region, SUM(CASE WHEN day = (SELECT MAX(day) FROM daily_sales) THEN revenue END) - SUM(CASE WHEN day = (SELECT MIN(day) FROM daily_sales) THEN revenue END) AS growth FROM daily_sales GROUP BY region) SELECT region, growth, ROUND(growth * 100.0 / SUM(growth) OVER (), 1) AS share_pct FROM g;",
   "hints": [
    "Шартты қосынды: <code>SUM(CASE WHEN day = (SELECT MAX(day) FROM daily_sales) THEN revenue END)</code>.",
    "Жалпы өсім: <code>SUM(growth) OVER ()</code>."
   ]
  }
 ]
});
