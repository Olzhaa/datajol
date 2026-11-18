// Practice tasks after the lessons of m3-4. Each lesson's list opens one task at a time.
DJ.addPractice('m3-4', {
 "viz-3": [
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Санаттағы тауарлар саны",
   "prompt": "<p>Bar chart үшін: әр санатта неше тауар бар? <code>category</code>, <code>n</code>. Саны бойынша кему ретімен, тең болса санат атауы бойынша.</p>",
   "starter": "",
   "solution": "SELECT category, COUNT(*) AS n FROM products GROUP BY category ORDER BY n DESC, category;",
   "hints": [
    "<code>ORDER BY n DESC, category</code>"
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Мән бойынша сұрыптау",
   "prompt": "<p><code>sort_desc(data)</code> функциясы сөздікті <code>(атау, мән)</code> жұптарының тізіміне айналдырып, мән бойынша кему ретімен қайтарсын. Мысалы, <code>sort_desc({\"Астана\": 310, \"Алматы\": 420})</code> → <code>[(\"Алматы\", 420), (\"Астана\", 310)]</code>.</p>",
   "starter": "def sort_desc(data):\n    pass\n",
   "solution": "def sort_desc(data):\n    return sorted(data.items(), key=lambda kv: kv[1], reverse=True)\n",
   "hints": [
    "<code>sorted(data.items(), key=lambda kv: kv[1], reverse=True)</code>"
   ],
   "check": {
    "tests": "assert sort_desc({\"Астана\": 310, \"Алматы\": 420}) == [(\"Алматы\", 420), (\"Астана\", 310)], \"Кему ретімен: [('Алматы', 420), ('Астана', 310)]\"\nassert sort_desc({\"а\": 1, \"ә\": 3, \"б\": 2}) == [(\"ә\", 3), (\"б\", 2), (\"а\", 1)], \"sort_desc({'а': 1, 'ә': 3, 'б': 2}) дұрыс емес\""
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Қала бойынша тапсырыстар",
   "prompt": "<p>Әр қаланың клиенттері неше тапсырыс берді? <code>city</code>, <code>orders</code>. Тапсырыс саны бойынша кему ретімен, тең болса қала атауы бойынша.</p>",
   "starter": "",
   "solution": "SELECT c.city, COUNT(*) AS orders FROM customers c JOIN orders o ON o.customer_id = c.id GROUP BY c.city ORDER BY orders DESC, c.city;",
   "hints": [
    "<code>customers c JOIN orders o ON o.customer_id = c.id</code>"
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Пропорционал ұзындық",
   "prompt": "<p><code>bar_len(v, max_v, width)</code> функциясы бағанның белгілер санын қайтарсын: <code>round(v / max_v * width)</code>. Ось нөлден басталғандықтан ұзындық мәнге пропорционал. Мысалы, <code>bar_len(310, 420, 8)</code> → <code>6</code>.</p>",
   "starter": "def bar_len(v, max_v, width):\n    pass\n",
   "solution": "def bar_len(v, max_v, width):\n    return round(v / max_v * width)\n",
   "hints": [
    "<code>round(...)</code> бүтін сан береді."
   ],
   "check": {
    "tests": "assert bar_len(310, 420, 8) == 6, \"bar_len(310, 420, 8) 6 болуы керек\"\nassert bar_len(420, 420, 8) == 8, \"Ең үлкен мәнге толық ен: 8\"\nassert bar_len(0, 420, 8) == 0, \"Нөл мәнге баған жоқ: 0\"\nassert isinstance(bar_len(100, 300, 10), int), \"Бүтін сан қайтарыңыз\""
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Ең көп сатылған тауарлар",
   "prompt": "<p>Delivered тапсырыстар бойынша ең көп сатылған (дана саны) 5 тауар: <code>name</code>, <code>qty</code>. Кему ретімен, тең болса атауы бойынша.</p>",
   "starter": "",
   "solution": "SELECT p.name, SUM(oi.quantity) AS qty FROM orders o JOIN order_items oi ON oi.order_id = o.id JOIN products p ON p.id = oi.product_id WHERE o.status = 'delivered' GROUP BY p.name ORDER BY qty DESC, p.name LIMIT 5;",
   "hints": [
    "Үш кестені JOIN жасап, <code>SUM(oi.quantity)</code>.",
    "<code>ORDER BY qty DESC, p.name LIMIT 5</code>"
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Үлесті пайызбен жазу",
   "prompt": "<p>Баған жанына үлесін жазу үшін <code>shares(data)</code> функциясы <code>{атау: үлес}</code> сөздігін қайтарсын: үлес — жалпы қосындыдағы пайыз, 1 ондық белгіге дейін <code>round</code>. Мысалы, <code>shares({\"Алматы\": 3, \"Астана\": 1})</code> → <code>{\"Алматы\": 75.0, \"Астана\": 25.0}</code>.</p>",
   "starter": "def shares(data):\n    pass\n",
   "solution": "def shares(data):\n    total = sum(data.values())\n    return {k: round(v * 100 / total, 1) for k, v in data.items()}\n",
   "hints": [
    "Алдымен <code>total = sum(data.values())</code>."
   ],
   "check": {
    "tests": "assert shares({\"Алматы\": 3, \"Астана\": 1}) == {\"Алматы\": 75.0, \"Астана\": 25.0}, \"shares({'Алматы': 3, 'Астана': 1}) дұрыс емес\"\nassert shares({\"а\": 1, \"ә\": 2}) == {\"а\": 33.3, \"ә\": 66.7}, \"shares({'а': 1, 'ә': 2}) {'а': 33.3, 'ә': 66.7} болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Топталған бағандар",
   "prompt": "<p><code>grouped_bars(data, width)</code> функциясы <code>{қала: (биыл, былтыр)}</code> сөздігінен мәтіндік топталған график жасасын. Қалалар <b>биылғы</b> мән бойынша кему ретімен. Әр қалаға екі жол:</p><ul><li><code>f\"{қала:&lt;8}{'█' * n1} {биыл}\"</code></li><li><code>f\"{'':&lt;8}{'░' * n2} {былтыр}\"</code></li></ul><p>Ұзындықтар бір масштабта: <code>n = round(мән / ең_үлкен_мән * width)</code>, мұнда ең үлкен мән екі жылдың бәрінен алынады. Жолдар тізімін қайтарыңыз.</p>",
   "starter": "def grouped_bars(data, width):\n    lines = []\n    return lines\n",
   "solution": "def grouped_bars(data, width):\n    top = max(max(a, b) for a, b in data.values())\n    lines = []\n    for city, (a, b) in sorted(data.items(), key=lambda kv: kv[1][0], reverse=True):\n        lines.append(f\"{city:<8}{'█' * round(a / top * width)} {a}\")\n        lines.append(f\"{'':<8}{'░' * round(b / top * width)} {b}\")\n    return lines\n",
   "hints": [
    "Ең үлкен мән: <code>max(max(a, b) for a, b in data.values())</code>.",
    "Сұрыптау кілті: <code>kv[1][0]</code> (биылғы мән)."
   ],
   "check": {
    "tests": "_r = grouped_bars({\"Астана\": (300, 200), \"Алматы\": (400, 300)}, 4)\nassert isinstance(_r, list) and len(_r) == 4, \"Әр қалаға екі жол: 4 жол\"\nassert _r == [\"Алматы  ████ 400\", \"        ░░░ 300\", \"Астана  ███ 300\", \"        ░░ 200\"], f\"Жолдар дұрыс емес: {_r}\""
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Ай мен санат қабаттары",
   "prompt": "<p>Қабатталған (stacked) график үшін дерек: delivered тапсырыстар бойынша әр ай мен санаттың табысы. <code>month</code> (<code>order_date</code>-тың YYYY-MM бөлігі), <code>category</code>, <code>revenue</code>. Ай ретімен, ай ішінде табыс бойынша кему ретімен.</p>",
   "starter": "",
   "solution": "SELECT substr(o.order_date, 1, 7) AS month, p.category, SUM(oi.quantity * p.price) AS revenue FROM orders o JOIN order_items oi ON oi.order_id = o.id JOIN products p ON p.id = oi.product_id WHERE o.status = 'delivered' GROUP BY month, p.category ORDER BY month, revenue DESC;",
   "hints": [
    "<code>GROUP BY month, p.category</code>",
    "<code>ORDER BY month, revenue DESC</code>"
   ],
   "check": {
    "ordered": true
   }
  }
 ],
 "viz-4": [
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "easy",
   "xp": 10,
   "title": "Алматының күндік табысы",
   "prompt": "<p>Line chart үшін тек Алматы аймағының күндік табысы: <code>day</code>, <code>revenue</code>, күн ретімен.</p>",
   "starter": "",
   "solution": "SELECT day, revenue FROM daily_sales WHERE region = 'Алматы' ORDER BY day;",
   "hints": [
    "<code>WHERE region = 'Алматы' ORDER BY day</code>"
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
   "title": "Айлық төлемдер сызығы",
   "prompt": "<p><code>payments</code> кестесінен айлық табыс: <code>month</code>, <code>revenue</code>, ай ретімен.</p>",
   "starter": "",
   "solution": "SELECT month, SUM(amount) AS revenue FROM payments GROUP BY month ORDER BY month;",
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
   "title": "Айлық белсенді пайдаланушылар",
   "prompt": "<p><code>activity</code> кестесінен әр айдағы белсенді пайдаланушылар саны: <code>month</code>, <code>active_users</code> (бірегей). Ай ретімен.</p>",
   "starter": "",
   "solution": "SELECT month, COUNT(DISTINCT user_id) AS active_users FROM activity GROUP BY month ORDER BY month;",
   "hints": [
    "<code>COUNT(DISTINCT user_id)</code>"
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
   "title": "Екі аймақ қатар",
   "prompt": "<p>Екі сызықты графикке «кең» кесте: <code>day</code>, <code>almaty</code>, <code>astana</code> (әр аймақтың сол күнгі табысы). Күн ретімен.</p>",
   "starter": "",
   "solution": "SELECT day, SUM(CASE WHEN region = 'Алматы' THEN revenue END) AS almaty, SUM(CASE WHEN region = 'Астана' THEN revenue END) AS astana FROM daily_sales GROUP BY day ORDER BY day;",
   "hints": [
    "<code>SUM(CASE WHEN region = 'Алматы' THEN revenue END)</code>"
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
   "title": "3 күндік жылжымалы орта",
   "prompt": "<p>Шуды тегістеу: жиынтық күндік табыс және 3 күндік жылжымалы орташа. <code>day</code>, <code>revenue</code>, <code>ma3</code> (ағымдағы және алдыңғы 2 күн, бір ондық белгі). Күн ретімен.</p>",
   "starter": "",
   "solution": "WITH t AS (SELECT day, SUM(revenue) AS revenue FROM daily_sales GROUP BY day) SELECT day, revenue, ROUND(AVG(revenue) OVER (ORDER BY day ROWS 2 PRECEDING), 1) AS ma3 FROM t ORDER BY day;",
   "hints": [
    "Алдымен CTE-де күндік қосынды.",
    "<code>AVG(revenue) OVER (ORDER BY day ROWS 2 PRECEDING)</code>"
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
   "dataset": "metrics",
   "level": "medium",
   "xp": 15,
   "title": "Жинақталған табыс",
   "prompt": "<p>Айдың басынан бергі жинақталған табыс сызығы: <code>day</code>, <code>revenue</code> (күндік жиынтық), <code>running</code> (сол күнге дейінгі барлық табыс). Күн ретімен.</p>",
   "starter": "",
   "solution": "WITH t AS (SELECT day, SUM(revenue) AS revenue FROM daily_sales GROUP BY day) SELECT day, revenue, SUM(revenue) OVER (ORDER BY day) AS running FROM t ORDER BY day;",
   "hints": [
    "<code>SUM(revenue) OVER (ORDER BY day)</code>"
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
   "dataset": "metrics",
   "level": "hard",
   "xp": 20,
   "title": "Аймақ ішіндегі жылжымалы орта",
   "prompt": "<p>Әр аймақтың өз 3 күндік жылжымалы орташасы: <code>region</code>, <code>day</code>, <code>revenue</code>, <code>ma3</code> (бір ондық белгі). Аймақ, сосын күн ретімен.</p>",
   "starter": "",
   "solution": "SELECT region, day, revenue, ROUND(AVG(revenue) OVER (PARTITION BY region ORDER BY day ROWS 2 PRECEDING), 1) AS ma3 FROM daily_sales ORDER BY region, day;",
   "hints": [
    "<code>OVER (PARTITION BY region ORDER BY day ROWS 2 PRECEDING)</code>"
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
   "level": "hard",
   "xp": 20,
   "title": "Аннотацияға белгі",
   "prompt": "<p>Графикке аннотация қою үшін: <code>day</code>, <code>revenue</code> (жиынтық), <code>change</code> (алдыңғы күннен айырма), <code>trend</code>: өссе <code>өсу</code>, түссе <code>түсу</code>, өзгермесе <code>тең</code>. Бірінші күнде <code>change</code> мен <code>trend</code> бос (NULL). Күн ретімен.</p>",
   "starter": "",
   "solution": "WITH t AS (SELECT day, SUM(revenue) AS revenue FROM daily_sales GROUP BY day), l AS (SELECT day, revenue, revenue - LAG(revenue) OVER (ORDER BY day) AS change FROM t) SELECT day, revenue, change, CASE WHEN change > 0 THEN 'өсу' WHEN change < 0 THEN 'түсу' WHEN change = 0 THEN 'тең' END AS trend FROM l ORDER BY day;",
   "hints": [
    "<code>revenue - LAG(revenue) OVER (ORDER BY day)</code>",
    "CASE-те <code>ELSE</code> жазбасаңыз, NULL үшін нәтиже NULL болады."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "LAG"
    ]
   }
  }
 ],
 "viz-9": [
  {
   "type": "sql",
   "dataset": "qazaq",
   "level": "easy",
   "xp": 10,
   "title": "Статустар бойынша айлық dataset",
   "prompt": "<b>qazaq.</b> «Тапсырыстар статус бойынша» бағаналы диаграммасына ұзын форматтағы dataset: 2026 жылғы барлық тапсырыс бойынша <code>month</code> (айдың бірінші күні, <code>date(order_date, 'start of month')</code>), <code>status</code>, <code>orders</code> (тапсырыс саны). <code>month</code>, <code>status</code> бойынша сұрыптаңыз.",
   "starter": "",
   "solution": "SELECT date(order_date, 'start of month') AS month, status, COUNT(*) AS orders FROM orders WHERE order_date >= '2026-01-01' GROUP BY month, status ORDER BY month, status;",
   "hints": [
    "Статус баған атауында емес, жолда тұрады: <code>GROUP BY month, status</code>.",
    "<code>WHERE order_date &gt;= '2026-01-01'</code>"
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
   "title": "Қатынас емес, бөліктері",
   "prompt": "<b>qazaq.</b> Қала бойынша орташа чек карточкасына dataset дайындаңыз, бірақ орташаның өзін емес, оның бөліктерін сақтаңыз: <code>delivered</code> тапсырыстар бойынша <code>city</code>, <code>orders</code> (бірегей тапсырыстар), <code>revenue</code> (quantity × unit_price сомасы). <code>city</code> бойынша сұрыптаңыз.",
   "starter": "",
   "solution": "SELECT c.city, COUNT(DISTINCT o.order_id) AS orders, SUM(oi.quantity * oi.unit_price) AS revenue FROM orders o JOIN customers c ON c.customer_id = o.customer_id JOIN order_items oi ON oi.order_id = o.order_id WHERE o.status = 'delivered' GROUP BY c.city ORDER BY c.city;",
   "hints": [
    "<code>order_items</code>-пен біріктіргенде тапсырыс қайталанады: <code>COUNT(DISTINCT o.order_id)</code>.",
    "BI орташа чекті кейін <code>SUM(revenue) / SUM(orders)</code> деп өзі есептейді."
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
   "title": "Тіркелулер уақыт осінде",
   "prompt": "<b>qazaq.</b> «Айлық тіркелулер» сызықтық диаграммасына dataset: <code>month</code> — нақты күн (айдың бірінші күні, <code>'2025-03'</code> мәтіні емес), <code>new_customers</code> — сол айда тіркелген клиенттер. <code>month</code> бойынша сұрыптаңыз.",
   "starter": "",
   "solution": "SELECT date(registered_at, 'start of month') AS month, COUNT(*) AS new_customers FROM customers GROUP BY month ORDER BY month;",
   "hints": [
    "<code>date(registered_at, 'start of month')</code>"
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "start of month"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "qazaq",
   "level": "medium",
   "xp": 15,
   "title": "Түйіршігі — клиент",
   "prompt": "<b>qazaq.</b> Клиенттер дашбордының dataset-і, бір жол — бір клиент: <code>customer_id</code>, <code>city</code>, <code>registered_at</code>, <code>orders</code> (<code>delivered</code> тапсырыстар саны), <code>revenue</code> (олардың quantity × unit_price сомасы). Сатып алмаған клиенттер де кірсін, оларда <code>orders</code> мен <code>revenue</code> 0. 80 жол, <code>customer_id</code> бойынша.",
   "starter": "",
   "solution": "WITH d AS (SELECT o.customer_id, COUNT(DISTINCT o.order_id) AS orders, SUM(oi.quantity * oi.unit_price) AS revenue FROM orders o JOIN order_items oi ON oi.order_id = o.order_id WHERE o.status = 'delivered' GROUP BY o.customer_id) SELECT c.customer_id, c.city, c.registered_at, COALESCE(d.orders, 0) AS orders, COALESCE(d.revenue, 0) AS revenue FROM customers c LEFT JOIN d ON d.customer_id = c.customer_id ORDER BY c.customer_id;",
   "hints": [
    "Алдымен CTE-де әр сатып алушының <code>orders</code> мен <code>revenue</code>-і, сосын <code>customers c LEFT JOIN</code> сол CTE.",
    "Жұбы жоқ жолда NULL шығады: <code>COALESCE(d.orders, 0)</code>."
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
   "dataset": "qazaq",
   "level": "medium",
   "xp": 15,
   "title": "Орташалардың орташасы",
   "prompt": "<b>qazaq.</b> 2026 жылғы <code>delivered</code> тапсырыстардан «ай × қала» деңгейінде <code>orders</code> пен <code>revenue</code> есептеңіз. Сосын бір жолмен екі санды салыстырыңыз: <code>right_avg</code> = <code>SUM(revenue) / SUM(orders)</code> және <code>wrong_avg</code> = әр жолдың орташа чегінің орташасы. Екеуін де бүтінге дейін <code>ROUND</code>.",
   "starter": "",
   "solution": "WITH m AS (SELECT date(o.order_date, 'start of month') AS month, c.city, COUNT(DISTINCT o.order_id) AS orders, SUM(oi.quantity * oi.unit_price) AS revenue FROM orders o JOIN customers c ON c.customer_id = o.customer_id JOIN order_items oi ON oi.order_id = o.order_id WHERE o.status = 'delivered' AND o.order_date >= '2026-01-01' GROUP BY month, c.city) SELECT ROUND(SUM(revenue) * 1.0 / SUM(orders)) AS right_avg, ROUND(AVG(revenue * 1.0 / orders)) AS wrong_avg FROM m;",
   "hints": [
    "CTE: <code>GROUP BY month, c.city</code>, ішінде <code>COUNT(DISTINCT o.order_id)</code> және сома.",
    "<code>ROUND(SUM(revenue) * 1.0 / SUM(orders))</code> және <code>ROUND(AVG(revenue * 1.0 / orders))</code>. <code>* 1.0</code> бүтін бөлуден сақтайды."
   ],
   "check": {
    "mustInclude": [
     "WITH"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "qazaq",
   "level": "medium",
   "xp": 15,
   "title": "Қала × статус",
   "prompt": "<b>qazaq.</b> Үйілген (stacked) бағаналы диаграммаға dataset: барлық тапсырыс бойынша <code>city</code> (клиенттің қаласы), <code>status</code>, <code>orders</code> (тапсырыс саны). Тек бар комбинациялар. <code>city</code>, <code>status</code> бойынша сұрыптаңыз.",
   "starter": "",
   "solution": "SELECT c.city, o.status, COUNT(*) AS orders FROM orders o JOIN customers c ON c.customer_id = o.customer_id GROUP BY c.city, o.status ORDER BY c.city, o.status;",
   "hints": [
    "<code>orders o JOIN customers c ON c.customer_id = o.customer_id</code>, <code>GROUP BY c.city, o.status</code>."
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "qazaq",
   "level": "hard",
   "xp": 20,
   "title": "Бос ұяшықсыз тор",
   "prompt": "<b>qazaq.</b> Тапсырысы жоқ «ай × қала» ұяшығы dataset-те мүлде болмаса, сызық үзіліп, BI оны 0 деп көрсетпейді. 2026 жылдың алты айы мен <code>customers</code>-тағы барлық қаланың толық торын құрыңыз: <code>month</code> (айдың бірінші күні), <code>city</code>, <code>orders</code> (<code>delivered</code> тапсырыстар саны, жоқ болса 0). 48 жол, <code>month</code>, <code>city</code> бойынша.",
   "starter": "",
   "solution": "WITH m AS (SELECT DISTINCT date(order_date, 'start of month') AS month FROM orders WHERE order_date >= '2026-01-01'), ct AS (SELECT DISTINCT city FROM customers), f AS (SELECT date(o.order_date, 'start of month') AS month, c.city, COUNT(*) AS orders FROM orders o JOIN customers c ON c.customer_id = o.customer_id WHERE o.status = 'delivered' AND o.order_date >= '2026-01-01' GROUP BY month, c.city) SELECT m.month, ct.city, COALESCE(f.orders, 0) AS orders FROM m CROSS JOIN ct LEFT JOIN f ON f.month = m.month AND f.city = ct.city ORDER BY m.month, ct.city;",
   "hints": [
    "Үш CTE: айлар тізімі (<code>DISTINCT</code>), қалалар тізімі (<code>DISTINCT city FROM customers</code>), нақты сандар.",
    "Тор: <code>m CROSS JOIN ct</code>, сосын <code>LEFT JOIN f ON f.month = m.month AND f.city = ct.city</code> және <code>COALESCE(f.orders, 0)</code>."
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
   "dataset": "qazaq",
   "level": "hard",
   "xp": 20,
   "title": "Бірінші тапсырыс белгісі",
   "prompt": "<b>qazaq.</b> «Жаңа және қайталанған клиенттер табысы» диаграммасына тапсырыс деңгейіндегі dataset: <code>delivered</code> тапсырыстар бойынша <code>order_id</code>, <code>order_date</code>, <code>customer_id</code>, <code>is_first</code> (клиенттің бірінші жеткізілген тапсырысы болса 1, әйтпесе 0; бір күнде екеу болса, <code>order_id</code>-і кішісі бірінші), <code>order_total</code>. <code>order_id</code> бойынша.",
   "starter": "",
   "solution": "WITH t AS (SELECT o.order_id, o.order_date, o.customer_id, SUM(oi.quantity * oi.unit_price) AS order_total FROM orders o JOIN order_items oi ON oi.order_id = o.order_id WHERE o.status = 'delivered' GROUP BY o.order_id, o.order_date, o.customer_id) SELECT order_id, order_date, customer_id, CASE WHEN ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date, order_id) = 1 THEN 1 ELSE 0 END AS is_first, order_total FROM t ORDER BY order_id;",
   "hints": [
    "Алдымен CTE-де тапсырыс деңгейіне жеткізіңіз: <code>GROUP BY o.order_id, o.order_date, o.customer_id</code>.",
    "<code>ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date, order_id) = 1</code> болса — бірінші."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "OVER"
    ]
   }
  }
 ],
 "viz-10": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Айлық тапсырыс саны",
   "prompt": "<p>Сызықтық диаграммаға дерек: таза тапсырыстардан әр айдың тапсырыс <b>санын</b> есептеп, <code>counts</code> Series-іне жазыңыз: индексі — <code>'YYYY-MM'</code> ай (өсу ретімен), мәні — тапсырыс саны.</p>",
   "starter": "import pandas as pd\n\ndf = pd.read_csv('orders.csv')\nclean = df[(df['status'] == 'paid') & df['amount'].notna() & (df['amount'] < 20000)]\n\n# counts = ...\n",
   "solution": "import pandas as pd\n\ndf = pd.read_csv('orders.csv')\nclean = df[(df['status'] == 'paid') & df['amount'].notna() & (df['amount'] < 20000)]\n\ncounts = clean.groupby(clean['order_date'].str[:7]).size()\nprint(counts)\n",
   "hints": [
    "Ай: <code>clean['order_date'].str[:7]</code>.",
    "<code>.size()</code> немесе <code>['id'].count()</code> жол санын береді."
   ],
   "check": {
    "tests": "import pandas as _pd\n_df = _pd.read_csv('orders.csv')\n_cl = _df[(_df['status'] == 'paid') & _df['amount'].notna() & (_df['amount'] < 20000)]\nassert 'counts' in globals() and getattr(counts, 'ndim', 0) == 1, \"counts pandas Series болуы керек\"\nassert [str(i) for i in counts.index] == ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06'], f\"Индекс: 2024-01 … 2024-06, сізде {list(counts.index)}\"\nassert [int(v) for v in counts.values] == [int(x) for x in _cl.groupby(_cl['order_date'].str[:7]).size().values], \"Айлық тапсырыс саны дұрыс емес: тек таза тапсырыстар саналады\"\nassert int(counts.sum()) == 139, f\"Барлығы 139 таза тапсырыс болуы керек, сізде {int(counts.sum())}\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Арна бойынша бағандар",
   "prompt": "<p>Тік бағаналы диаграммаға (<code>ax.bar</code>) дерек: таза тапсырыстардан әр арнаның (<code>channel</code>) табысын есептеп, <b>кему ретімен</b> сұрыпталған <code>by_channel</code> Series-іне жазыңыз.</p>",
   "starter": "import pandas as pd\n\ndf = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv').rename(columns={'id': 'customer_id'})\nclean = df[(df['status'] == 'paid') & df['amount'].notna() & (df['amount'] < 20000)]\n\n# by_channel = ...\n",
   "solution": "import pandas as pd\n\ndf = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv').rename(columns={'id': 'customer_id'})\nclean = df[(df['status'] == 'paid') & df['amount'].notna() & (df['amount'] < 20000)]\n\nby_channel = clean.merge(customers, on='customer_id').groupby('channel')['amount'].sum().sort_values(ascending=False)\nprint(by_channel)\n",
   "hints": [
    "Арна <code>customers</code>-та: <code>clean.merge(customers, on='customer_id')</code>.",
    "<code>.groupby('channel')['amount'].sum().sort_values(ascending=False)</code>"
   ],
   "check": {
    "tests": "assert 'by_channel' in globals() and getattr(by_channel, 'ndim', 0) == 1, \"by_channel pandas Series болуы керек\"\nassert list(by_channel.index) == ['2gis', 'instagram', 'referral'], f\"Рет кемуімен: 2gis, instagram, referral; сізде {list(by_channel.index)}\"\nassert [float(v) for v in by_channel.values] == [133900.0, 124050.0, 76900.0], f\"Табыс: 133 900, 124 050, 76 900; сізде {list(by_channel.values)}\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Үлеске айналдыру",
   "prompt": "<p>100%-дық бағанға дерек: таза тапсырыстардан әр арнаның табыстағы үлесін пайызбен (1 таңбаға дейін <code>round</code>) <code>share</code> Series-іне жазыңыз. Индексі — арна, рет кез келген.</p>",
   "starter": "import pandas as pd\n\ndf = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv').rename(columns={'id': 'customer_id'})\nclean = df[(df['status'] == 'paid') & df['amount'].notna() & (df['amount'] < 20000)]\nm = clean.merge(customers, on='customer_id')\n\n# share = ...\n",
   "solution": "import pandas as pd\n\ndf = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv').rename(columns={'id': 'customer_id'})\nclean = df[(df['status'] == 'paid') & df['amount'].notna() & (df['amount'] < 20000)]\nm = clean.merge(customers, on='customer_id')\n\nrev = m.groupby('channel')['amount'].sum()\nshare = (rev / rev.sum() * 100).round(1)\nprint(share)\n",
   "hints": [
    "Алдымен арна бойынша қосынды, сосын оны жалпы қосындыға бөліңіз: <code>rev / rev.sum() * 100</code>.",
    "<code>.round(1)</code>"
   ],
   "check": {
    "tests": "assert 'share' in globals() and getattr(share, 'ndim', 0) == 1, \"share pandas Series болуы керек\"\nassert {k: float(v) for k, v in share.items()} == {'2gis': 40.0, 'instagram': 37.0, 'referral': 23.0}, f\"Үлестер: 2gis 40.0, instagram 37.0, referral 23.0; сізде {dict(share)}\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "seaborn-ға ұзын кесте",
   "prompt": "<p><code>sns.lineplot(data=long_df, x='month', y='revenue', hue='channel')</code> үшін ұзын форматтағы DataFrame дайындаңыз: <code>long_df</code> бағандары дәл осы ретпен <code>month</code>, <code>channel</code>, <code>revenue</code> (таза табыс қосындысы); жолдар <code>month</code>, <code>channel</code> бойынша сұрыпталған, индекс 0-ден.</p>",
   "starter": "import pandas as pd\n\ndf = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv').rename(columns={'id': 'customer_id'})\nclean = df[(df['status'] == 'paid') & df['amount'].notna() & (df['amount'] < 20000)]\nm = clean.merge(customers, on='customer_id')\nm['month'] = m['order_date'].str[:7]\n\n# long_df = ...\n",
   "solution": "import pandas as pd\n\ndf = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv').rename(columns={'id': 'customer_id'})\nclean = df[(df['status'] == 'paid') & df['amount'].notna() & (df['amount'] < 20000)]\nm = clean.merge(customers, on='customer_id')\nm['month'] = m['order_date'].str[:7]\n\nlong_df = m.groupby(['month', 'channel'], as_index=False)['amount'].sum().rename(columns={'amount': 'revenue'})\nlong_df = long_df.sort_values(['month', 'channel']).reset_index(drop=True)\nprint(long_df)\n",
   "hints": [
    "<code>m.groupby(['month', 'channel'], as_index=False)['amount'].sum()</code> топтау бағандарын қалыпты баған етіп қалдырады.",
    "<code>.rename(columns={'amount': 'revenue'})</code>, сосын <code>.reset_index(drop=True)</code>."
   ],
   "check": {
    "tests": "assert 'long_df' in globals() and getattr(long_df, 'ndim', 0) == 2, \"long_df DataFrame болуы керек\"\nassert list(long_df.columns) == ['month', 'channel', 'revenue'], f\"Бағандар: month, channel, revenue; сізде {list(long_df.columns)}\"\nassert len(long_df) == 18 and list(long_df.index) == list(range(18)), \"18 жол (6 ай × 3 арна), индекс 0-ден 17-ге дейін\"\nassert list(long_df['month'])[:3] == ['2024-01'] * 3 and list(long_df['channel'])[:3] == ['2gis', 'instagram', 'referral'], \"Жолдар month, сосын channel бойынша сұрыпталуы керек\"\nassert float(long_df.loc[(long_df['month'] == '2024-03') & (long_df['channel'] == 'instagram'), 'revenue'].iloc[0]) == 47750.0, \"instagram, 2024-03: 47 750 болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Scatter-ге клиенттер",
   "prompt": "<p><code>ax.scatter(per_cust['orders'], per_cust['total'])</code> үшін дерек: таза тапсырыстардан әр клиенттің тапсырыс санын және жалпы сомасын <code>per_cust</code> DataFrame-іне жазыңыз. Бағандар: <code>customer_id</code>, <code>orders</code>, <code>total</code>; <code>customer_id</code> бойынша сұрыпталған, индекс 0-ден.</p>",
   "starter": "import pandas as pd\n\ndf = pd.read_csv('orders.csv')\nclean = df[(df['status'] == 'paid') & df['amount'].notna() & (df['amount'] < 20000)]\n\n# per_cust = ...\n",
   "solution": "import pandas as pd\n\ndf = pd.read_csv('orders.csv')\nclean = df[(df['status'] == 'paid') & df['amount'].notna() & (df['amount'] < 20000)]\n\nper_cust = clean.groupby('customer_id', as_index=False).agg(orders=('id', 'count'), total=('amount', 'sum'))\nper_cust = per_cust.sort_values('customer_id').reset_index(drop=True)\nprint(per_cust.head())\n",
   "hints": [
    "Атаулы агрегат: <code>.agg(orders=('id', 'count'), total=('amount', 'sum'))</code>.",
    "<code>groupby('customer_id', as_index=False)</code> клиент нөмірін баған етіп қалдырады."
   ],
   "check": {
    "tests": "import pandas as _pd\n_df = _pd.read_csv('orders.csv')\n_cl = _df[(_df['status'] == 'paid') & _df['amount'].notna() & (_df['amount'] < 20000)]\nassert 'per_cust' in globals() and list(per_cust.columns) == ['customer_id', 'orders', 'total'], \"Бағандар: customer_id, orders, total\"\nassert len(per_cust) == _cl['customer_id'].nunique() and list(per_cust['customer_id']) == sorted(_cl['customer_id'].unique().tolist()), \"Таза тапсырысы бар әр клиентке бір жол, customer_id бойынша сұрыпталған\"\nassert int(per_cust['orders'].sum()) == 139 and float(per_cust['total'].sum()) == 334850.0, \"orders қосындысы 139, total қосындысы 334 850 болуы керек\"\nassert int(per_cust.loc[per_cust['customer_id'] == 1, 'orders'].iloc[0]) == int((_cl['customer_id'] == 1).sum()), \"1-клиенттің тапсырыс саны дұрыс емес\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жинақталған табыс",
   "prompt": "<p>«Жыл басынан бергі табыс» сызығына дерек: таза тапсырыстардың айлық табысынан жинақталған қосындыны <code>cum</code> Series-іне жазыңыз (индексі — <code>'YYYY-MM'</code> ай, өсу ретімен). Соңғы мән — жарты жылдың жалпы табысы.</p>",
   "starter": "import pandas as pd\n\ndf = pd.read_csv('orders.csv')\nclean = df[(df['status'] == 'paid') & df['amount'].notna() & (df['amount'] < 20000)]\n\n# cum = ...\n",
   "solution": "import pandas as pd\n\ndf = pd.read_csv('orders.csv')\nclean = df[(df['status'] == 'paid') & df['amount'].notna() & (df['amount'] < 20000)]\n\nmonthly = clean.groupby(clean['order_date'].str[:7])['amount'].sum()\ncum = monthly.cumsum()\nprint(cum)\n",
   "hints": [
    "Алдымен айлық қосынды (сабақтағы <code>monthly</code>), сосын <code>.cumsum()</code>."
   ],
   "check": {
    "tests": "assert 'cum' in globals() and getattr(cum, 'ndim', 0) == 1, \"cum pandas Series болуы керек\"\nassert [str(i) for i in cum.index] == ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06'], \"Индекс: 2024-01 … 2024-06\"\nassert [float(v) for v in cum.values] == [31950.0, 98600.0, 188250.0, 254250.0, 302950.0, 334850.0], f\"Жинақталған сома: 31 950, 98 600, …, 334 850; сізде {list(cum.values)}\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Апта күндерінің жылу картасы",
   "prompt": "<p><code>sns.heatmap</code>-қа кең кесте: таза тапсырыстардың санын <code>heat</code> DataFrame-іне жазыңыз: жолдары — қала (<code>city</code>), бағандары — апта күні <code>0</code>–<code>6</code> (<code>pd.to_datetime(...).dt.dayofweek</code>, 0 — дүйсенбі), мәндері — тапсырыс саны. Тапсырысы жоқ ұяшық 0 болсын (NaN емес).</p>",
   "starter": "import pandas as pd\n\ndf = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv').rename(columns={'id': 'customer_id'})\nclean = df[(df['status'] == 'paid') & df['amount'].notna() & (df['amount'] < 20000)]\nm = clean.merge(customers, on='customer_id')\nm['month'] = m['order_date'].str[:7]\n\n# heat = ...\n",
   "solution": "import pandas as pd\n\ndf = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv').rename(columns={'id': 'customer_id'})\nclean = df[(df['status'] == 'paid') & df['amount'].notna() & (df['amount'] < 20000)]\nm = clean.merge(customers, on='customer_id')\nm['month'] = m['order_date'].str[:7]\n\nm['dow'] = pd.to_datetime(m['order_date']).dt.dayofweek\nheat = m.pivot_table(index='city', columns='dow', values='id', aggfunc='count', fill_value=0)\nprint(heat)\n",
   "hints": [
    "<code>m['dow'] = pd.to_datetime(m['order_date']).dt.dayofweek</code>",
    "<code>m.pivot_table(index='city', columns='dow', values='id', aggfunc='count', fill_value=0)</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\n_df = _pd.read_csv('orders.csv')\n_cl = _df[(_df['status'] == 'paid') & _df['amount'].notna() & (_df['amount'] < 20000)]\n_cu = _pd.read_csv('customers.csv').rename(columns={'id': 'customer_id'})\n_m = _cl.merge(_cu, on='customer_id')\n_m = _m.assign(dow=_pd.to_datetime(_m['order_date']).dt.dayofweek)\nassert 'heat' in globals() and getattr(heat, 'ndim', 0) == 2, \"heat DataFrame болуы керек\"\nassert sorted(heat.index) == sorted(_m['city'].unique()) and sorted(int(c) for c in heat.columns) == sorted(_m['dow'].unique().tolist()), \"Жолдар — қалалар, бағандар — апта күндері болуы керек\"\nassert not heat.isna().any().any(), \"Бос ұяшық NaN емес, 0 болуы керек: fill_value=0\"\nassert int(heat.values.sum()) == 139, f\"Барлық ұяшықтың қосындысы 139 тапсырыс болуы керек, сізде {int(heat.values.sum())}\"\nassert all(int(heat.loc[c, d]) == int(((_m['city'] == c) & (_m['dow'] == d)).sum()) for c in heat.index for d in heat.columns), \"Мәндер тапсырыс саны болуы керек (aggfunc='count')\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Үздік бестік және «басқалар»",
   "prompt": "<p>Bar chart-та 40 баған оқылмайды. Таза тапсырыстар бойынша ең көп жұмсаған 5 клиентті қалдырып, қалғандарын бір жолға жинаңыз: <code>top</code> Series-інің индексі — клиент нөмірі мәтін ретінде (<code>'33'</code>), соңғы жолы <code>'other'</code>; мәндері — сома. Бестік соманың кемуімен тұрсын, тең болса <code>customer_id</code> кішісі бірінші.</p>",
   "starter": "import pandas as pd\n\ndf = pd.read_csv('orders.csv')\nclean = df[(df['status'] == 'paid') & df['amount'].notna() & (df['amount'] < 20000)]\n\n# top = ...\n",
   "solution": "import pandas as pd\n\ndf = pd.read_csv('orders.csv')\nclean = df[(df['status'] == 'paid') & df['amount'].notna() & (df['amount'] < 20000)]\n\nper = clean.groupby('customer_id')['amount'].sum().reset_index()\nper = per.sort_values(['amount', 'customer_id'], ascending=[False, True])\nbest = per.head(5)\ntop = pd.Series(best['amount'].values, index=best['customer_id'].astype(str).tolist())\ntop['other'] = per['amount'].iloc[5:].sum()\nprint(top)\n",
   "hints": [
    "Әр клиенттің сомасы, сосын <code>sort_values(['amount', 'customer_id'], ascending=[False, True])</code>.",
    "Бестік: <code>.head(5)</code>; қалғаны: <code>.iloc[5:]</code>-тің қосындысы. Индексті <code>astype(str)</code> арқылы мәтінге айналдырыңыз."
   ],
   "check": {
    "tests": "import pandas as _pd\n_df = _pd.read_csv('orders.csv')\n_cl = _df[(_df['status'] == 'paid') & _df['amount'].notna() & (_df['amount'] < 20000)]\n_p = _cl.groupby('customer_id')['amount'].sum().reset_index().sort_values(['amount', 'customer_id'], ascending=[False, True])\nassert 'top' in globals() and getattr(top, 'ndim', 0) == 1 and len(top) == 6, \"top — 6 жолдық Series (5 клиент + other)\"\nassert [str(i) for i in top.index] == [str(x) for x in _p['customer_id'].head(5)] + ['other'], f\"Индекс: {[str(x) for x in _p['customer_id'].head(5)] + ['other']}, сізде {list(top.index)}\"\nassert [float(v) for v in top.values[:5]] == [float(x) for x in _p['amount'].head(5)], \"Бестіктің сомалары дұрыс емес\"\nassert float(top.sum()) == 334850.0, \"Барлық жолдың қосындысы жалпы табысқа (334 850) тең болуы керек\""
   }
  }
 ]
});
