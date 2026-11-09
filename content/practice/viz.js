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
 ]
});
