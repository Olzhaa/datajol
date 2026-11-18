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
 ],
 "ba-9": [
  {
   "type": "sql",
   "dataset": "qazaq",
   "level": "easy",
   "xp": 10,
   "title": "Бір жылдан бері келмегендер",
   "prompt": "Тек <code>delivered</code> тапсырыстар бойынша («бүгін» = <code>2026-07-01</code>) соңғы сатып алуынан бері 365 күннен көп өткен клиенттерді шығарыңыз: <code>customer_id</code>, <code>recency_days</code>. <code>recency_days</code> кемуімен, тең болса <code>customer_id</code> бойынша.",
   "starter": "",
   "solution": "SELECT o.customer_id, CAST(julianday('2026-07-01') - julianday(MAX(o.order_date)) AS INTEGER) AS recency_days FROM orders o WHERE o.status = 'delivered' GROUP BY o.customer_id HAVING recency_days > 365 ORDER BY recency_days DESC, o.customer_id;",
   "hints": [
    "<code>CAST(julianday('2026-07-01') - julianday(MAX(o.order_date)) AS INTEGER)</code>",
    "Агрегат бойынша сүзгі: <code>HAVING recency_days &gt; 365</code>. Recency үшін <code>order_items</code> керек емес."
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "qazaq",
   "level": "easy",
   "xp": 10,
   "title": "Жиіліктің таралуы",
   "prompt": "<code>delivered</code> тапсырыстар бойынша клиенттер жиілікке қарай қалай таралған? <code>frequency</code> (клиенттің тапсырыс саны), <code>customers</code> (осындай клиенттер саны). <code>frequency</code> бойынша.",
   "starter": "WITH rfm AS (\n  SELECT o.customer_id,\n    CAST(julianday('2026-07-01') - julianday(MAX(o.order_date)) AS INTEGER) AS recency_days,\n    COUNT(DISTINCT o.order_id) AS frequency,\n    SUM(oi.quantity * oi.unit_price) AS monetary\n  FROM orders o JOIN order_items oi ON oi.order_id = o.order_id\n  WHERE o.status = 'delivered'\n  GROUP BY o.customer_id\n)\nSELECT ",
   "solution": "WITH rfm AS (SELECT o.customer_id, CAST(julianday('2026-07-01') - julianday(MAX(o.order_date)) AS INTEGER) AS recency_days, COUNT(DISTINCT o.order_id) AS frequency, SUM(oi.quantity * oi.unit_price) AS monetary FROM orders o JOIN order_items oi ON oi.order_id = o.order_id WHERE o.status = 'delivered' GROUP BY o.customer_id) SELECT frequency, COUNT(*) AS customers FROM rfm GROUP BY frequency ORDER BY frequency;",
   "hints": [
    "Дайын <code>rfm</code> CTE-ін <code>frequency</code> бойынша тағы бір рет топтаңыз."
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "qazaq",
   "level": "easy",
   "xp": 10,
   "title": "Monetary бойынша бестік",
   "prompt": "Ең көп ақша әкелген 5 клиент (тек <code>delivered</code>): <code>customer_id</code>, <code>monetary</code> (quantity × unit_price сомасы). <code>monetary</code> кемуімен.",
   "starter": "WITH rfm AS (\n  SELECT o.customer_id,\n    CAST(julianday('2026-07-01') - julianday(MAX(o.order_date)) AS INTEGER) AS recency_days,\n    COUNT(DISTINCT o.order_id) AS frequency,\n    SUM(oi.quantity * oi.unit_price) AS monetary\n  FROM orders o JOIN order_items oi ON oi.order_id = o.order_id\n  WHERE o.status = 'delivered'\n  GROUP BY o.customer_id\n)\nSELECT ",
   "solution": "WITH rfm AS (SELECT o.customer_id, CAST(julianday('2026-07-01') - julianday(MAX(o.order_date)) AS INTEGER) AS recency_days, COUNT(DISTINCT o.order_id) AS frequency, SUM(oi.quantity * oi.unit_price) AS monetary FROM orders o JOIN order_items oi ON oi.order_id = o.order_id WHERE o.status = 'delivered' GROUP BY o.customer_id) SELECT customer_id, monetary FROM rfm ORDER BY monetary DESC LIMIT 5;",
   "hints": [
    "<code>ORDER BY monetary DESC LIMIT 5</code>"
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "qazaq",
   "level": "medium",
   "xp": 15,
   "title": "«333» клиенттері",
   "prompt": "Үш өлшемнің бәрінде ең жоғары балл (r = 3, f = 3, m = 3) алған клиенттердің <code>customer_id</code>-ін шығарыңыз. Балл лекциядағыдай: <code>NTILE(3)</code>, recency кемуімен, frequency мен monetary өсуімен, әр терезеде екінші баған <code>customer_id</code>. <code>customer_id</code> бойынша сұрыптаңыз.",
   "starter": "WITH rfm AS (\n  SELECT o.customer_id,\n    CAST(julianday('2026-07-01') - julianday(MAX(o.order_date)) AS INTEGER) AS recency_days,\n    COUNT(DISTINCT o.order_id) AS frequency,\n    SUM(oi.quantity * oi.unit_price) AS monetary\n  FROM orders o JOIN order_items oi ON oi.order_id = o.order_id\n  WHERE o.status = 'delivered'\n  GROUP BY o.customer_id\n)\nSELECT ",
   "solution": "WITH rfm AS (SELECT o.customer_id, CAST(julianday('2026-07-01') - julianday(MAX(o.order_date)) AS INTEGER) AS recency_days, COUNT(DISTINCT o.order_id) AS frequency, SUM(oi.quantity * oi.unit_price) AS monetary FROM orders o JOIN order_items oi ON oi.order_id = o.order_id WHERE o.status = 'delivered' GROUP BY o.customer_id), s AS (SELECT customer_id, monetary, NTILE(3) OVER (ORDER BY recency_days DESC, customer_id) AS r, NTILE(3) OVER (ORDER BY frequency, customer_id) AS f, NTILE(3) OVER (ORDER BY monetary, customer_id) AS m FROM rfm) SELECT customer_id FROM s WHERE r = 3 AND f = 3 AND m = 3 ORDER BY customer_id;",
   "hints": [
    "Балдарды екінші CTE-де есептеңіз: терезе функциясын <code>WHERE</code>-де тікелей қолдануға болмайды.",
    "<code>NTILE(3) OVER (ORDER BY recency_days DESC, customer_id) AS r</code>, т.с.с.; сосын <code>WHERE r = 3 AND f = 3 AND m = 3</code>."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "NTILE"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "qazaq",
   "level": "medium",
   "xp": 15,
   "title": "ABC топтарының қорытындысы",
   "prompt": "Тауарлардың ABC талдауын (тек <code>delivered</code>; табыс кемуімен жинақталған үлес ≤ 80 — A, ≤ 95 — B, әйтпесе C) топ бойынша жинаңыз: <code>abc</code>, <code>products</code> (тауар саны), <code>revenue_pct</code> (топтың табыстағы үлесі, %, 1 таңба). <code>abc</code> бойынша.",
   "starter": "",
   "solution": "WITH p AS (SELECT pr.product_id, pr.name, SUM(oi.quantity * oi.unit_price) AS revenue, SUM(oi.quantity) AS qty FROM order_items oi JOIN orders o ON o.order_id = oi.order_id JOIN products pr ON pr.product_id = oi.product_id WHERE o.status = 'delivered' GROUP BY pr.product_id, pr.name), c AS (SELECT name, revenue, ROUND(100.0 * SUM(revenue) OVER (ORDER BY revenue DESC) / SUM(revenue) OVER (), 1) AS cum_pct FROM p), a AS (SELECT name, revenue, CASE WHEN cum_pct <= 80 THEN 'A' WHEN cum_pct <= 95 THEN 'B' ELSE 'C' END AS abc FROM c) SELECT abc, COUNT(*) AS products, ROUND(100.0 * SUM(revenue) / (SELECT SUM(revenue) FROM a), 1) AS revenue_pct FROM a GROUP BY abc ORDER BY abc;",
   "hints": [
    "Сабақтағы ABC сұрауын CTE-ге салыңыз (<code>name</code>, <code>revenue</code>, <code>abc</code>), сосын <code>GROUP BY abc</code>.",
    "Үлес: <code>100.0 * SUM(revenue) / (SELECT SUM(revenue) FROM a)</code>. A тобы 7 тауар, 77.5% болуы керек."
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "qazaq",
   "level": "medium",
   "xp": 15,
   "title": "Санаттар бойынша Парето",
   "prompt": "Парето талдауын тауар емес, санат деңгейінде жасаңыз (тек <code>delivered</code>): <code>category</code>, <code>revenue</code>, <code>cum_pct</code> (табыс кемуімен жинақталған үлес, %, 1 таңба). Табыс кемуімен.",
   "starter": "",
   "solution": "WITH cat AS (SELECT pr.category, SUM(oi.quantity * oi.unit_price) AS revenue FROM order_items oi JOIN orders o ON o.order_id = oi.order_id JOIN products pr ON pr.product_id = oi.product_id WHERE o.status = 'delivered' GROUP BY pr.category) SELECT category, revenue, ROUND(100.0 * SUM(revenue) OVER (ORDER BY revenue DESC) / SUM(revenue) OVER (), 1) AS cum_pct FROM cat ORDER BY revenue DESC;",
   "hints": [
    "CTE: <code>GROUP BY pr.category</code>.",
    "<code>ROUND(100.0 * SUM(revenue) OVER (ORDER BY revenue DESC) / SUM(revenue) OVER (), 1)</code>"
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "OVER"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "qazaq",
   "level": "hard",
   "xp": 20,
   "title": "Сегменттердің салмағы",
   "prompt": "Сабақтағы сегмент кестесін SQL-мен қайта құрыңыз. Балл лекциядағыдай: <code>NTILE(3)</code>, recency кемуімен, frequency мен monetary өсуімен, әр терезеде екінші баған <code>customer_id</code>. Сегменттер: r = 3 және f = 3 — <code>'champions'</code>; r = 1 және f ≥ 2 — <code>'at_risk'</code>; r = 3 және f = 1 — <code>'new'</code>; қалғаны — <code>'other'</code>. Бағандар: <code>segment</code>, <code>customers</code>, <code>revenue_pct</code> (monetary үлесі, %, 1 таңба). <code>revenue_pct</code> кемуімен.",
   "starter": "WITH rfm AS (\n  SELECT o.customer_id,\n    CAST(julianday('2026-07-01') - julianday(MAX(o.order_date)) AS INTEGER) AS recency_days,\n    COUNT(DISTINCT o.order_id) AS frequency,\n    SUM(oi.quantity * oi.unit_price) AS monetary\n  FROM orders o JOIN order_items oi ON oi.order_id = o.order_id\n  WHERE o.status = 'delivered'\n  GROUP BY o.customer_id\n)\nSELECT ",
   "solution": "WITH rfm AS (SELECT o.customer_id, CAST(julianday('2026-07-01') - julianday(MAX(o.order_date)) AS INTEGER) AS recency_days, COUNT(DISTINCT o.order_id) AS frequency, SUM(oi.quantity * oi.unit_price) AS monetary FROM orders o JOIN order_items oi ON oi.order_id = o.order_id WHERE o.status = 'delivered' GROUP BY o.customer_id), s AS (SELECT customer_id, monetary, NTILE(3) OVER (ORDER BY recency_days DESC, customer_id) AS r, NTILE(3) OVER (ORDER BY frequency, customer_id) AS f, NTILE(3) OVER (ORDER BY monetary, customer_id) AS m FROM rfm), g AS (SELECT CASE WHEN r = 3 AND f = 3 THEN 'champions' WHEN r = 1 AND f >= 2 THEN 'at_risk' WHEN r = 3 AND f = 1 THEN 'new' ELSE 'other' END AS segment, monetary FROM s) SELECT segment, COUNT(*) AS customers, ROUND(100.0 * SUM(monetary) / (SELECT SUM(monetary) FROM g), 1) AS revenue_pct FROM g GROUP BY segment ORDER BY revenue_pct DESC;",
   "hints": [
    "Үш қабат: <code>rfm</code> → балдар (<code>NTILE</code>) → сегмент (<code>CASE</code>).",
    "<code>CASE</code>-те ереженің реті маңызды: бірінші сәйкес келген тармақ алынады.",
    "Сандар сабақтағы кестемен сәйкес келуі керек: 41, 14, 10, 5 клиент."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "NTILE",
     "CASE"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "qazaq",
   "level": "hard",
   "xp": 20,
   "title": "Табыс бойынша және дана бойынша ABC",
   "prompt": "Тауарлардың ABC тобы табыс бойынша және сатылған дана (<code>quantity</code> қосындысы) бойынша есептелсін (тек <code>delivered</code>, шекаралар 80 және 95). Жинақталған үлес жол-жолмен есептелсін: <code>ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>, рет — мән кемуімен, тең болса <code>product_id</code>. Екі тобы әртүрлі тауарларды шығарыңыз: <code>name</code>, <code>abc_revenue</code>, <code>abc_qty</code>. <code>name</code> бойынша.",
   "starter": "",
   "solution": "WITH p AS (SELECT pr.product_id, pr.name, SUM(oi.quantity * oi.unit_price) AS revenue, SUM(oi.quantity) AS qty FROM order_items oi JOIN orders o ON o.order_id = oi.order_id JOIN products pr ON pr.product_id = oi.product_id WHERE o.status = 'delivered' GROUP BY pr.product_id, pr.name), r AS (SELECT name, ROUND(100.0 * SUM(revenue) OVER (ORDER BY revenue DESC, product_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) / SUM(revenue) OVER (), 1) AS cr, ROUND(100.0 * SUM(qty) OVER (ORDER BY qty DESC, product_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) / SUM(qty) OVER (), 1) AS cq FROM p), g AS (SELECT name, CASE WHEN cr <= 80 THEN 'A' WHEN cr <= 95 THEN 'B' ELSE 'C' END AS abc_revenue, CASE WHEN cq <= 80 THEN 'A' WHEN cq <= 95 THEN 'B' ELSE 'C' END AS abc_qty FROM r) SELECT name, abc_revenue, abc_qty FROM g WHERE abc_revenue <> abc_qty ORDER BY name;",
   "hints": [
    "Бір CTE-де әр тауардың <code>revenue</code> мен <code>qty</code> (<code>SUM(oi.quantity)</code>) бағандары.",
    "Дана бойынша тең мәндер бар, сондықтан <code>ORDER BY qty DESC, product_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>.",
    "Екі <code>CASE</code>, соңында <code>WHERE abc_revenue &lt;&gt; abc_qty</code>."
   ],
   "check": {
    "ordered": true
   }
  }
 ],
 "ba-10": [
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "easy",
   "xp": 10,
   "title": "MAU және пайдаланушы-күндер",
   "prompt": "<b>metrics.</b> Қыркүйек бойынша бір жол: <code>mau</code> (бірегей пайдаланушылар) және <code>user_days</code> (барлық «пайдаланушы-күн» жазбалары). Екі санның айырмасы — MAU-ды DAU-лардың қосындысынан неге есептеуге болмайтынының жауабы.",
   "starter": "",
   "solution": "SELECT COUNT(DISTINCT user_id) AS mau, COUNT(*) AS user_days FROM daily_active;",
   "hints": [
    "<code>COUNT(DISTINCT user_id)</code> және <code>COUNT(*)</code>."
   ],
   "check": {
    "mustInclude": [
     "DISTINCT"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "easy",
   "xp": 10,
   "title": "Кім неше күн кірді",
   "prompt": "<b>metrics.</b> Әр пайдаланушының қыркүйектегі белсенді күн саны: <code>user_id</code>, <code>active_days</code>. <code>active_days</code> кемуімен, тең болса <code>user_id</code> бойынша.",
   "starter": "",
   "solution": "SELECT user_id, COUNT(DISTINCT day) AS active_days FROM daily_active GROUP BY user_id ORDER BY active_days DESC, user_id;",
   "hints": [
    "<code>COUNT(DISTINCT day)</code>, <code>GROUP BY user_id</code>."
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
   "title": "Ең белсенді күн",
   "prompt": "<b>metrics.</b> DAU ең жоғары болған күнді (немесе күндерді) шығарыңыз: <code>day</code>, <code>dau</code>.",
   "starter": "",
   "solution": "WITH d AS (SELECT day, COUNT(DISTINCT user_id) AS dau FROM daily_active GROUP BY day) SELECT day, dau FROM d WHERE dau = (SELECT MAX(dau) FROM d);",
   "hints": [
    "CTE-де күндік DAU, сосын <code>WHERE dau = (SELECT MAX(dau) FROM d)</code>.",
    "<code>ORDER BY ... LIMIT 1</code> тең мәндер болса бір күнді жоғалтады."
   ]
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "medium",
   "xp": 15,
   "title": "Апталық WAU",
   "prompt": "<b>metrics.</b> Әр аптаның WAU-ы: <code>week_start</code> (аптаның дүйсенбісі, <code>date(day, 'weekday 0', '-6 days')</code>), <code>wau</code> (сол аптада кемінде бір рет кірген бірегей пайдаланушылар). <code>week_start</code> бойынша. Айдың шетіндегі толық емес апталар да кіреді.",
   "starter": "",
   "solution": "SELECT date(day, 'weekday 0', '-6 days') AS week_start, COUNT(DISTINCT user_id) AS wau FROM daily_active GROUP BY week_start ORDER BY week_start;",
   "hints": [
    "<code>'weekday 0'</code> күнді жексенбіге дейін жылжытады, <code>'-6 days'</code> сол аптаның дүйсенбісін береді.",
    "WAU — бірегей сан: <code>COUNT(DISTINCT user_id)</code>, DAU-лардың қосындысы емес."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "DISTINCT"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "medium",
   "xp": 15,
   "title": "Күнделікті әдет",
   "prompt": "<b>metrics.</b> Айдың кемінде жартысында (30 күннің ≥ 50%-ында) кірген пайдаланушылар: <code>user_id</code>, <code>active_days</code>, <code>pct</code> (30 күннің неше пайызы, 1 таңба). <code>pct</code> кемуімен, тең болса <code>user_id</code> бойынша.",
   "starter": "",
   "solution": "SELECT user_id, COUNT(*) AS active_days, ROUND(COUNT(*) * 100.0 / 30, 1) AS pct FROM daily_active GROUP BY user_id HAVING COUNT(*) * 100.0 / 30 >= 50 ORDER BY pct DESC, user_id;",
   "hints": [
    "Бөлгіш — күнтізбедегі 30 күн: <code>COUNT(*) * 100.0 / 30</code>.",
    "<code>HAVING COUNT(*) * 100.0 / 30 &gt;= 50</code>"
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
   "title": "Жаңа пайдаланушылар күні",
   "prompt": "<b>metrics.</b> Әр пайдаланушының қыркүйектегі бірінші белсенді күнін табыңыз да, күн бойынша санаңыз: <code>first_day</code>, <code>new_users</code>. <code>first_day</code> бойынша. MAU осы жаңалардан жиналады.",
   "starter": "",
   "solution": "WITH f AS (SELECT user_id, MIN(day) AS first_day FROM daily_active GROUP BY user_id) SELECT first_day, COUNT(*) AS new_users FROM f GROUP BY first_day ORDER BY first_day;",
   "hints": [
    "CTE: <code>SELECT user_id, MIN(day) AS first_day ... GROUP BY user_id</code>.",
    "Сосын <code>GROUP BY first_day</code>. <code>new_users</code> қосындысы MAU-ға тең."
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
   "title": "Жұмыс күні және демалыс",
   "prompt": "<b>metrics.</b> Жұмыс күндері мен демалыс күндерінің орташа DAU-ын салыстырыңыз: <code>day_type</code> (<code>'weekday'</code> немесе <code>'weekend'</code>; демалыс — сенбі мен жексенбі, <code>strftime('%w', day)</code> 6 немесе 0), <code>days</code> (күнтізбедегі күн саны), <code>avg_dau</code> (2 таңба). Ешкім кірмеген күн де есептеледі. <code>day_type</code> бойынша.",
   "starter": "WITH RECURSIVE cal(day) AS (\n  SELECT '2024-09-01'\n  UNION ALL\n  SELECT date(day, '+1 day') FROM cal WHERE day < '2024-09-30'\n)\nSELECT ",
   "solution": "WITH RECURSIVE cal(day) AS (SELECT '2024-09-01' UNION ALL SELECT date(day, '+1 day') FROM cal WHERE day < '2024-09-30'), d AS (SELECT c.day, COUNT(a.user_id) AS dau FROM cal c LEFT JOIN daily_active a ON a.day = c.day GROUP BY c.day) SELECT CASE WHEN strftime('%w', day) IN ('0', '6') THEN 'weekend' ELSE 'weekday' END AS day_type, COUNT(*) AS days, ROUND(AVG(dau), 2) AS avg_dau FROM d GROUP BY day_type ORDER BY day_type;",
   "hints": [
    "Алдымен күнтізбе + <code>LEFT JOIN</code> арқылы нөлмен толтырылған күндік DAU.",
    "<code>strftime('%w', day)</code> мәтін қайтарады: <code>IN ('0', '6')</code>.",
    "Демалыс күндері 9, жұмыс күндері 21 болуы керек."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "LEFT JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "hard",
   "xp": 20,
   "title": "Ай ішіндегі stickiness",
   "prompt": "<b>metrics.</b> Айдың екі жартысын салыстырыңыз: 1–15 және 16–30 қыркүйек (әрқайсысы 15 күн). Бағандар: <code>half</code> (<code>'1-15'</code> немесе <code>'16-30'</code>), <code>avg_dau</code> (пайдаланушы-күндер / 15, 2 таңба), <code>users</code> (сол жартыда бірегей пайдаланушылар), <code>stickiness_pct</code> (avg_dau / users, %, 1 таңба). <code>half</code> бойынша.",
   "starter": "",
   "solution": "SELECT CASE WHEN day <= '2024-09-15' THEN '1-15' ELSE '16-30' END AS half, ROUND(COUNT(*) * 1.0 / 15, 2) AS avg_dau, COUNT(DISTINCT user_id) AS users, ROUND(COUNT(*) * 100.0 / 15 / COUNT(DISTINCT user_id), 1) AS stickiness_pct FROM daily_active GROUP BY half ORDER BY half;",
   "hints": [
    "Топ белгісі: <code>CASE WHEN day &lt;= '2024-09-15' THEN '1-15' ELSE '16-30' END</code>.",
    "Бөлгіш — күнтізбедегі 15 күн, дерегі бар күндер емес: <code>COUNT(*) * 1.0 / 15</code>.",
    "<code>ROUND(COUNT(*) * 100.0 / 15 / COUNT(DISTINCT user_id), 1)</code>"
   ],
   "check": {
    "ordered": true
   }
  }
 ],
 "ba-ab": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Конверсия",
   "prompt": "<p><code>conv_rate(users, conversions)</code> функциясы конверсияны пайызбен, 2 таңбаға дейін <code>round</code> жасап қайтарсын. Пайдаланушы 0 болса, <code>0.0</code> қайтарсын.</p>",
   "starter": "def conv_rate(users, conversions):\n    pass\n",
   "solution": "def conv_rate(users, conversions):\n    if users == 0:\n        return 0.0\n    return round(conversions / users * 100, 2)\n",
   "hints": [
    "<code>conversions / users * 100</code>",
    "Нөлге бөлмеу үшін алдымен <code>if users == 0</code>."
   ],
   "check": {
    "tests": "assert conv_rate(10000, 500) == 5.0, \"conv_rate(10000, 500) = 5.0 болуы керек\"\nassert conv_rate(3000, 100) == 3.33, f\"conv_rate(3000, 100) = 3.33 болуы керек, сізде {conv_rate(3000, 100)}\"\nassert conv_rate(0, 0) == 0.0, \"0 пайдаланушыда 0.0 қайтарыңыз\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Пункт пен пайыз",
   "prompt": "<p><code>lifts(cr_a, cr_b)</code> функциясы екі конверсиядан (екеуі де %) <code>(abs_pp, rel_pct)</code> жұбын қайтарсын: абсолютті өсім пайыздық пунктпен және салыстырмалы өсім пайызбен. Екеуі де 2 таңбаға дейін <code>round</code>.</p>",
   "starter": "def lifts(cr_a, cr_b):\n    pass\n",
   "solution": "def lifts(cr_a, cr_b):\n    return round(cr_b - cr_a, 2), round((cr_b - cr_a) / cr_a * 100, 2)\n",
   "hints": [
    "Абсолютті: <code>cr_b - cr_a</code>. Салыстырмалы: <code>(cr_b - cr_a) / cr_a * 100</code>."
   ],
   "check": {
    "tests": "assert tuple(lifts(5.0, 5.6)) == (0.6, 12.0), f\"lifts(5.0, 5.6) = (0.6, 12.0) болуы керек, сізде {lifts(5.0, 5.6)}\"\nassert tuple(lifts(4.0, 3.0)) == (-1.0, -25.0), \"Төмендеу теріс сан береді: lifts(4.0, 3.0) = (-1.0, -25.0)\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Интервал не айтады",
   "prompt": "<p><code>ci_verdict(low, high)</code> функциясы айырманың сенімділік интервалы бойынша қорытынды қайтарсын: интервал толығымен нөлден жоғары болса <code>'positive'</code>, толығымен нөлден төмен болса <code>'negative'</code>, нөлді қамтыса <code>'inconclusive'</code>.</p>",
   "starter": "def ci_verdict(low, high):\n    pass\n",
   "solution": "def ci_verdict(low, high):\n    if low > 0:\n        return 'positive'\n    if high < 0:\n        return 'negative'\n    return 'inconclusive'\n",
   "hints": [
    "Төменгі шек нөлден жоғары болса, интервалдың бәрі нөлден жоғары: <code>if low &gt; 0</code>."
   ],
   "check": {
    "tests": "assert ci_verdict(-0.02, 1.22) == 'inconclusive', \"Сабақтағы интервал (−0.02 … 1.22) нөлді қамтиды: 'inconclusive'\"\nassert ci_verdict(0.1, 0.9) == 'positive', \"0.1 … 0.9: 'positive' болуы керек\"\nassert ci_verdict(-0.8, -0.2) == 'negative', \"-0.8 … -0.2: 'negative' болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "50/50 емес бөлу",
   "prompt": "<p>Кейде тест 50/50 емес, мысалы 90/10 бөлінеді. <code>srm(n_a, n_b, share_a=0.5)</code> функциясы <code>(chi2, has_srm)</code> жұбын қайтарсын: күтілетін көлемдер e_a = (n_a + n_b) × share_a, e_b = (n_a + n_b) × (1 − share_a); chi2 = (n_a − e_a)² / e_a + (n_b − e_b)² / e_b, 2 таңбаға дейін <code>round</code>; <code>has_srm</code> — chi2 &gt; 3.84.</p>",
   "starter": "def srm(n_a, n_b, share_a=0.5):\n    pass\n",
   "solution": "def srm(n_a, n_b, share_a=0.5):\n    total = n_a + n_b\n    e_a = total * share_a\n    e_b = total * (1 - share_a)\n    chi2 = round((n_a - e_a) ** 2 / e_a + (n_b - e_b) ** 2 / e_b, 2)\n    return chi2, chi2 > 3.84\n",
   "hints": [
    "<code>e_a = total * share_a</code>, <code>e_b = total * (1 - share_a)</code>",
    "<code>share_a=0.5</code> болғанда сабақтағы формула шығады."
   ],
   "check": {
    "tests": "_c, _f = srm(10000, 9400)\nassert abs(_c - 18.56) < 0.011 and _f is True, f\"srm(10000, 9400): (18.56, True) болуы керек, сізде {(_c, _f)}\"\n_c, _f = srm(9000, 1000, 0.9)\nassert abs(_c) < 0.011 and _f is False, \"90/10 жоспары дәл орындалды: chi2 = 0, has_srm False\"\n_c, _f = srm(9100, 900, 0.9)\nassert abs(_c - 11.11) < 0.011 and _f is True, f\"srm(9100, 900, 0.9): (11.11, True) болуы керек, сізде {(_c, _f)}\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Шешім кестесі",
   "prompt": "<p>Сабақтағы шешім кестесін функция етіп жазыңыз. <code>decide(srm, ci_low, ci_high, lift, mde, guardrail_ok=True)</code>: SRM бар болса — <code>'rerun'</code>; қорғаушы метрика нашарласа (<code>guardrail_ok</code> False) — <code>'investigate'</code>; CI толығымен нөлден жоғары және <code>lift &gt;= mde</code> болса — <code>'ship'</code>; қалған жағдайда — <code>'no_ship'</code>. Тексеру реті осындай.</p>",
   "starter": "def decide(srm, ci_low, ci_high, lift, mde, guardrail_ok=True):\n    return 'ship'\n",
   "solution": "def decide(srm, ci_low, ci_high, lift, mde, guardrail_ok=True):\n    if srm:\n        return 'rerun'\n    if not guardrail_ok:\n        return 'investigate'\n    if ci_low > 0 and lift >= mde:\n        return 'ship'\n    return 'no_ship'\n",
   "hints": [
    "Төрт <code>if</code>, әрқайсысы бірден <code>return</code> жасайды: SRM ең бірінші тексеріледі.",
    "CI нөлден жоғары: <code>ci_low &gt; 0</code>."
   ],
   "check": {
    "tests": "assert decide(True, 0.5, 1.5, 1.0, 0.3) == 'rerun', \"SRM бар кезде нәтиже қолданылмайды: 'rerun'\"\nassert decide(False, 0.5, 1.5, 1.0, 0.3, guardrail_ok=False) == 'investigate', \"Қорғаушы метрика нашарласа: 'investigate'\"\nassert decide(False, 0.5, 1.5, 1.0, 0.3) == 'ship', \"CI > 0 және lift ≥ MDE: 'ship'\"\nassert decide(False, -0.02, 1.22, 0.6, 0.3) == 'no_ship', \"CI нөлді қамтиды: 'no_ship'\"\nassert decide(False, 0.05, 0.2, 0.1, 0.3) == 'no_ship', \"Әсер мәнді, бірақ MDE-ден кіші: 'no_ship'\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ерте тоқтату қақпаны",
   "prompt": "<p>Аналитик тестке күнде қарап отыр. <code>peeking_stop(pvalues, alpha=0.05)</code> функциясы күндік p-value тізімінен p &lt; alpha болған <b>бірінші</b> күннің нөмірін (1-ден бастап) қайтарсын; ондай күн болмаса <code>None</code>. Осы күні тоқтату — peeking: сабақтағыдай, жалған жеңістердің үлесін көбейтеді.</p>",
   "starter": "def peeking_stop(pvalues, alpha=0.05):\n    pass\n",
   "solution": "def peeking_stop(pvalues, alpha=0.05):\n    for day, p in enumerate(pvalues, start=1):\n        if p < alpha:\n            return day\n    return None\n",
   "hints": [
    "<code>for day, p in enumerate(pvalues, start=1):</code>"
   ],
   "check": {
    "tests": "assert peeking_stop([0.4, 0.2, 0.04, 0.09, 0.06]) == 3, \"Бірінші p < 0.05 үшінші күні: 3\"\nassert peeking_stop([0.3, 0.12, 0.07]) is None, \"Шектен ешқашан өтпесе: None\"\nassert peeking_stop([0.02, 0.5], alpha=0.01) is None, \"alpha параметрін қолданыңыз\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Бір бақылау, бірнеше нұсқа",
   "prompt": "<p>A/B/C тест: <code>variants(groups)</code> функциясы <code>{'A': (пайдаланушы, сатып_алу), 'B': ..., ...}</code> сөздігін алып, бақылаудан (<code>'A'</code>) басқа әр нұсқа үшін <code>(атауы, cr, rel_lift)</code> үштігін қайтарсын: <code>cr</code> — конверсия, %; <code>rel_lift</code> — A-ға қарағанда салыстырмалы өсім, %. Екеуі де 2 таңбаға дейін <code>round</code>. Тізім <code>rel_lift</code> кемуімен сұрыпталсын.</p>",
   "starter": "def variants(groups):\n    pass\n",
   "solution": "def variants(groups):\n    a_users, a_conv = groups['A']\n    cr_a = a_conv / a_users * 100\n    out = []\n    for name, (users, conv) in groups.items():\n        if name == 'A':\n            continue\n        cr = conv / users * 100\n        out.append((name, round(cr, 2), round((cr - cr_a) / cr_a * 100, 2)))\n    return sorted(out, key=lambda r: r[2], reverse=True)\n",
   "hints": [
    "Алдымен A-ның конверсиясы, сосын <code>for name, (users, conv) in groups.items():</code>, <code>'A'</code>-ны өткізіп жіберіңіз.",
    "Өсімді дөңгелектенбеген конверсиядан есептеңіз, сосын барып <code>round</code>.",
    "<code>sorted(out, key=lambda r: r[2], reverse=True)</code>"
   ],
   "check": {
    "tests": "_r = variants({'A': (10000, 500), 'B': (10000, 560), 'C': (10000, 470)})\nassert isinstance(_r, list) and len(_r) == 2, \"A-дан басқа екі нұсқаның тізімі күтілді\"\nassert [tuple(x) for x in _r] == [('B', 5.6, 12.0), ('C', 4.7, -6.0)], f\"[('B', 5.6, 12.0), ('C', 4.7, -6.0)] күтілді, сізде {_r}\"\n_r = variants({'C': (3000, 99), 'A': (3000, 90), 'B': (3000, 120)})\nassert [x[0] for x in _r] == ['B', 'C'] and [x[2] for x in _r] == [33.33, 10.0], f\"Бақылау сөздіктің кез келген жерінде тұруы мүмкін; B 33.33, C 10.0 болуы керек, сізде {_r}\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Күн сайынғы SRM",
   "prompt": "<p>Бөлу қатесі кейде бір күні ғана болады (мысалы, релиз күні). <code>srm_days(days)</code> функциясы 50/50 тесттің күндік <code>(n_a, n_b)</code> жұптарының тізімін алып, SRM бар (chi2 &gt; 3.84) күндердің нөмірлерін (1-ден бастап) тізіммен қайтарсын. chi2 сабақтағыдай: e = (n_a + n_b) / 2.</p>",
   "starter": "def srm_days(days):\n    return []\n",
   "solution": "def srm_days(days):\n    out = []\n    for i, (n_a, n_b) in enumerate(days, start=1):\n        e = (n_a + n_b) / 2\n        chi2 = (n_a - e) ** 2 / e + (n_b - e) ** 2 / e\n        if chi2 > 3.84:\n            out.append(i)\n    return out\n",
   "hints": [
    "Сабақтағы chi2 формуласын әр күнге бөлек қолданыңыз: <code>for i, (n_a, n_b) in enumerate(days, start=1):</code>."
   ],
   "check": {
    "tests": "assert srm_days([(1000, 1010), (1020, 990), (1100, 900), (995, 1005)]) == [3], \"Тек 3-күні SRM бар (1100 мен 900): [3]\"\nassert srm_days([(500, 500), (510, 490)]) == [], \"Ауытқу кіші болса, бос тізім\"\nassert srm_days([(1200, 1000), (1000, 1000), (800, 1000)]) == [1, 3], f\"Бірнеше күн: [1, 3] күтілді, сізде {srm_days([(1200, 1000), (1000, 1000), (800, 1000)])}\""
   }
  }
 ]
});
