// Practice tasks after the lessons of m3-3. Each lesson's list opens one task at a time.
DJ.addPractice('m3-3', {
 "adv-1": [
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Арзан электроника",
   "prompt": "CTE-де «Электроника» санатындағы тауарлардың <code>name</code> мен <code>price</code> бағандарын алыңыз. Сосын сол CTE-ден бағасы 100 000 теңгеден төмен тауарлардың атауын шығарыңыз.",
   "starter": "WITH el AS (\n  \n)\nSELECT ",
   "solution": "WITH el AS (SELECT name, price FROM products WHERE category = 'Электроника') SELECT name FROM el WHERE price < 100000;",
   "hints": [
    "<code>WITH el AS (SELECT ... WHERE category = 'Электроника')</code>",
    "Негізгі сұрау: <code>SELECT name FROM el WHERE ...</code>"
   ],
   "check": {
    "mustInclude": [
     "WITH"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Тапсырыс саны CTE-мен",
   "prompt": "CTE-де әр клиенттің (<code>customer_id</code>) тапсырыс санын <code>n</code> деген атпен есептеңіз. Сосын <code>n</code> кемінде 2 болатын клиенттердің <code>customer_id</code> мен <code>n</code> бағандарын шығарыңыз.",
   "starter": "WITH cnt AS (\n  \n)\nSELECT ",
   "solution": "WITH cnt AS (SELECT customer_id, COUNT(*) AS n FROM orders GROUP BY customer_id) SELECT customer_id, n FROM cnt WHERE n >= 2;",
   "hints": [
    "CTE ішінде <code>GROUP BY customer_id</code>.",
    "CTE-ден кейін <code>HAVING</code> емес, кәдімгі <code>WHERE n &gt;= 2</code> жазуға болады."
   ],
   "check": {
    "mustInclude": [
     "WITH"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Жеткізілгендер және клиент",
   "prompt": "CTE-де тек <code>delivered</code> тапсырыстарды алыңыз. Сосын оны <code>customers</code>-пен біріктіріп, клиенттің атын және тапсырыс күнін шығарыңыз.",
   "starter": "WITH d AS (\n  \n)\nSELECT ",
   "solution": "WITH d AS (SELECT * FROM orders WHERE status = 'delivered') SELECT c.name, d.order_date FROM d JOIN customers c ON c.id = d.customer_id;",
   "hints": [
    "CTE-ні кесте сияқты JOIN-ға қоюға болады: <code>FROM d JOIN customers c ON c.id = d.customer_id</code>."
   ],
   "check": {
    "mustInclude": [
     "WITH"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Орташа чек",
   "prompt": "CTE-де әр тапсырыстың сомасын (<code>quantity × price</code> қосындысы) <code>total</code> деген атпен есептеңіз. Сосын барлық тапсырыстың орташа сомасын бүтінге дейін дөңгелектеп шығарыңыз.",
   "starter": "WITH t AS (\n  \n)\nSELECT ",
   "solution": "WITH t AS (SELECT oi.order_id, SUM(oi.quantity * p.price) AS total FROM order_items oi JOIN products p ON p.id = oi.product_id GROUP BY oi.order_id) SELECT ROUND(AVG(total)) FROM t;",
   "hints": [
    "Алдымен әр тапсырыстың сомасы, сосын соның орташасы: <code>SELECT ROUND(AVG(total)) FROM t</code>."
   ],
   "check": {
    "mustInclude": [
     "WITH"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Екі CTE бірге",
   "prompt": "Екі CTE жазыңыз: <code>n</code> — әр клиенттің тапсырыс саны (<code>customer_id</code>, <code>cnt</code>), <code>r</code> — әр клиенттің жалпы сатып алу сомасы (<code>customer_id</code>, <code>total</code>). Кемінде 2 тапсырысы бар клиенттердің атын, <code>cnt</code> және <code>total</code> бағандарын шығарыңыз.",
   "starter": "WITH n AS (\n  \n),\nr AS (\n  \n)\nSELECT ",
   "solution": "WITH n AS (SELECT customer_id, COUNT(*) AS cnt FROM orders GROUP BY customer_id), r AS (SELECT o.customer_id, SUM(oi.quantity * p.price) AS total FROM orders o JOIN order_items oi ON oi.order_id = o.id JOIN products p ON p.id = oi.product_id GROUP BY o.customer_id) SELECT c.name, n.cnt, r.total FROM customers c JOIN n ON n.customer_id = c.id JOIN r ON r.customer_id = c.id WHERE n.cnt >= 2;",
   "hints": [
    "CTE-лер үтірмен бөлінеді: <code>WITH n AS (...), r AS (...)</code>.",
    "Соңында customers-ты екеуімен де JOIN жасаңыз."
   ],
   "check": {
    "mustInclude": [
     "WITH"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Қала бойынша сатылым",
   "prompt": "CTE-де әр клиенттің сатып алу сомасын (<code>customer_id</code>, <code>total</code>) есептеңіз. Сосын клиенттің қаласы бойынша қосып, <code>city</code> және қала сомасын, соманың кемуі бойынша шығарыңыз.",
   "starter": "WITH r AS (\n  \n)\nSELECT ",
   "solution": "WITH r AS (SELECT o.customer_id, SUM(oi.quantity * p.price) AS total FROM orders o JOIN order_items oi ON oi.order_id = o.id JOIN products p ON p.id = oi.product_id GROUP BY o.customer_id) SELECT c.city, SUM(r.total) AS city_total FROM r JOIN customers c ON c.id = r.customer_id GROUP BY c.city ORDER BY city_total DESC;",
   "hints": [
    "CTE нәтижесін тағы бір рет топтауға болады: <code>GROUP BY c.city</code>."
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
   "title": "Орташадан ірі тапсырыстар",
   "prompt": "CTE-де әр тапсырыстың сомасын (<code>order_id</code>, <code>total</code>) есептеңіз. Сомасы барлық тапсырыстың орташа сомасынан жоғары тапсырыстарды <code>order_id</code> және <code>total</code> бағандарымен, соманың кемуі бойынша шығарыңыз.",
   "starter": "WITH t AS (\n  \n)\nSELECT ",
   "solution": "WITH t AS (SELECT oi.order_id, SUM(oi.quantity * p.price) AS total FROM order_items oi JOIN products p ON p.id = oi.product_id GROUP BY oi.order_id) SELECT order_id, total FROM t WHERE total > (SELECT AVG(total) FROM t) ORDER BY total DESC;",
   "hints": [
    "Бір CTE-ге екі рет сүйенуге болады: негізгі сұрауда және subquery-де.",
    "<code>WHERE total &gt; (SELECT AVG(total) FROM t)</code>"
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
   "title": "Ең көп сатылған санат",
   "prompt": "Екі CTE жазыңыз: <code>sold</code> — әр тауардың сатылған данасы (<code>product_id</code>, <code>q</code>), <code>cat</code> — әр санаттың сатылған данасы (<code>category</code>, <code>q</code>). Ең көп дана сатылған санатты <code>category</code> және <code>q</code> бағандарымен шығарыңыз.",
   "starter": "WITH sold AS (\n  \n),\ncat AS (\n  \n)\nSELECT ",
   "solution": "WITH sold AS (SELECT product_id, SUM(quantity) AS q FROM order_items GROUP BY product_id), cat AS (SELECT p.category, SUM(s.q) AS q FROM sold s JOIN products p ON p.id = s.product_id GROUP BY p.category) SELECT category, q FROM cat WHERE q = (SELECT MAX(q) FROM cat);",
   "hints": [
    "Екінші CTE біріншісіне сүйенеді: <code>FROM sold s JOIN products p ...</code>.",
    "Соңында <code>WHERE q = (SELECT MAX(q) FROM cat)</code>."
   ],
   "check": {
    "mustInclude": [
     "WITH"
    ]
   }
  }
 ],
 "adv-2": [
  {
   "type": "sql",
   "dataset": "staff",
   "level": "easy",
   "xp": 10,
   "title": "Компания орташасы қатар",
   "prompt": "Әр қызметкердің аты, жалақысы және бүкіл компанияның орташа жалақысын <code>company_avg</code> деген атпен шығарыңыз. <code>OVER ()</code> қолданыңыз.",
   "starter": "SELECT name, salary,\n  \nFROM employees;",
   "solution": "SELECT name, salary, AVG(salary) OVER () AS company_avg FROM employees;",
   "hints": [
    "Бос <code>OVER ()</code> — бүкіл кесте бір терезе."
   ],
   "check": {
    "mustInclude": [
     "OVER"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "staff",
   "level": "easy",
   "xp": 10,
   "title": "Жалақы бойынша нөмір",
   "prompt": "Әр қызметкерге жалақы бойынша (жоғарыдан төмен) реттік нөмір беріңіз: <code>name</code>, <code>salary</code>, <code>rn</code>. Жалақы тең болса, <code>id</code> кішісі бірінші. <code>ROW_NUMBER</code> қолданыңыз.",
   "starter": "SELECT name, salary,\n  ROW_NUMBER() OVER (\n  ) AS rn\nFROM employees;",
   "solution": "SELECT name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC, id) AS rn FROM employees;",
   "hints": [
    "<code>ROW_NUMBER() OVER (ORDER BY salary DESC, id)</code>"
   ],
   "check": {
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
   "title": "Бөлімдегі адам саны",
   "prompt": "Әр қызметкердің аты, бөлімі және өз бөліміндегі қызметкерлер санын <code>dept_size</code> деген атпен шығарыңыз. Жолдар жиналмауы керек.",
   "starter": "SELECT name, department,\n  \nFROM employees;",
   "solution": "SELECT name, department, COUNT(*) OVER (PARTITION BY department) AS dept_size FROM employees;",
   "hints": [
    "<code>COUNT(*) OVER (PARTITION BY department)</code>"
   ],
   "check": {
    "mustInclude": [
     "OVER"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "staff",
   "level": "medium",
   "xp": 15,
   "title": "Бөлімдегі жалақы үлесі",
   "prompt": "Әр қызметкердің аты, бөлімі және оның жалақысының өз бөлімінің жалақы қорындағы үлесін пайызбен (<code>share</code>, бір ондық таңба) шығарыңыз.",
   "starter": "SELECT name, department,\n  \nFROM employees;",
   "solution": "SELECT name, department, ROUND(salary * 100.0 / SUM(salary) OVER (PARTITION BY department), 1) AS share FROM employees;",
   "hints": [
    "<code>salary * 100.0 / SUM(salary) OVER (PARTITION BY department)</code>",
    "Сыртынан <code>ROUND(..., 1)</code>."
   ],
   "check": {
    "mustInclude": [
     "OVER"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "staff",
   "level": "medium",
   "xp": 15,
   "title": "RANK пен DENSE_RANK",
   "prompt": "Әр қызметкердің аты, жалақысы және компания бойынша жалақы рейтингін екі тәсілмен шығарыңыз: <code>rnk</code> (<code>RANK</code>) және <code>drnk</code> (<code>DENSE_RANK</code>), жоғарыдан төмен.",
   "starter": "SELECT name, salary,\n  \nFROM employees;",
   "solution": "SELECT name, salary, RANK() OVER (ORDER BY salary DESC) AS rnk, DENSE_RANK() OVER (ORDER BY salary DESC) AS drnk FROM employees;",
   "hints": [
    "Екі терезе функциясы бір SELECT-те қатар тұра алады.",
    "Тең жалақыдан кейін <code>RANK</code> нөмірді өткізіп жібереді, <code>DENSE_RANK</code> жібермейді."
   ],
   "check": {
    "mustInclude": [
     "RANK",
     "DENSE_RANK"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "staff",
   "level": "medium",
   "xp": 15,
   "title": "Бөлім көшбасшысына дейін",
   "prompt": "Әр қызметкердің аты, бөлімі, жалақысы және өз бөліміндегі ең жоғары жалақыдан қаншаға аз алатынын <code>gap</code> деген атпен шығарыңыз (көшбасшыда 0).",
   "starter": "SELECT name, department, salary,\n  \nFROM employees;",
   "solution": "SELECT name, department, salary, MAX(salary) OVER (PARTITION BY department) - salary AS gap FROM employees;",
   "hints": [
    "<code>MAX(salary) OVER (PARTITION BY department) - salary</code>"
   ],
   "check": {
    "mustInclude": [
     "OVER"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "staff",
   "level": "hard",
   "xp": 20,
   "title": "Бөлімдегі екінші орын",
   "prompt": "Әр бөлімде жалақы бойынша екінші орындағы қызметкерлерді (<code>DENSE_RANK</code> = 2, жоғарыдан төмен) шығарыңыз: <code>department</code>, <code>name</code>, <code>salary</code>. Тең жалақы алатындар бірдей орында тұрады.",
   "starter": "SELECT department, name, salary\nFROM (\n  \n)\nWHERE ",
   "solution": "SELECT department, name, salary FROM (SELECT department, name, salary, DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS r FROM employees) WHERE r = 2;",
   "hints": [
    "Терезе функциясын <code>WHERE</code>-де қолдануға болмайды: алдымен subquery-де <code>r</code> есептеңіз.",
    "Сыртқы сұрауда <code>WHERE r = 2</code>."
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
   "level": "hard",
   "xp": 20,
   "title": "Бөлім орташасынан жоғары",
   "prompt": "Жалақысы өз бөлімінің орташа жалақысынан жоғары қызметкерлерді шығарыңыз: <code>department</code>, <code>name</code>, <code>salary</code> және бүтінге дөңгелектенген бөлім орташасы <code>dept_avg</code>.",
   "starter": "SELECT department, name, salary, dept_avg\nFROM (\n  \n)\nWHERE ",
   "solution": "SELECT department, name, salary, ROUND(dept_avg) AS dept_avg FROM (SELECT department, name, salary, AVG(salary) OVER (PARTITION BY department) AS dept_avg FROM employees) WHERE salary > dept_avg;",
   "hints": [
    "Ішкі сұрауда <code>AVG(salary) OVER (PARTITION BY department)</code>.",
    "Сыртқы сұрауда сүзіп, <code>ROUND</code> жасаңыз."
   ],
   "check": {
    "mustInclude": [
     "OVER"
    ]
   }
  }
 ],
 "adv-3": [
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "easy",
   "xp": 10,
   "title": "Астананың жинақты табысы",
   "prompt": "<code>daily_sales</code> кестесінен Астана бойынша <code>day</code>, <code>revenue</code> және жинақты сома <code>running</code> бағандарын күн ретімен шығарыңыз.",
   "starter": "SELECT day, revenue,\n  \nFROM daily_sales\nWHERE region = 'Астана'\nORDER BY day;",
   "solution": "SELECT day, revenue, SUM(revenue) OVER (ORDER BY day) AS running FROM daily_sales WHERE region = 'Астана' ORDER BY day;",
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
   "level": "easy",
   "xp": 10,
   "title": "Аймақ бойынша жинақ",
   "prompt": "Әр аймақтың ішінде жинақты табысты есептеңіз: <code>region</code>, <code>day</code>, <code>running</code>. Реті: аймақ, сосын күн.",
   "starter": "SELECT region, day,\n  \nFROM daily_sales\nORDER BY region, day;",
   "solution": "SELECT region, day, SUM(revenue) OVER (PARTITION BY region ORDER BY day) AS running FROM daily_sales ORDER BY region, day;",
   "hints": [
    "<code>OVER (PARTITION BY region ORDER BY day)</code> әр аймақта қосындыны нөлден бастайды."
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
   "level": "easy",
   "xp": 10,
   "title": "Аймақтың жалпы табысы",
   "prompt": "Әр жол үшін <code>region</code>, <code>day</code>, <code>revenue</code> және сол аймақтың барлық күндердегі жалпы табысын <code>region_total</code> деген атпен шығарыңыз.",
   "starter": "SELECT region, day, revenue,\n  \nFROM daily_sales;",
   "solution": "SELECT region, day, revenue, SUM(revenue) OVER (PARTITION BY region) AS region_total FROM daily_sales;",
   "hints": [
    "<code>ORDER BY</code>-сыз <code>OVER (PARTITION BY region)</code> бүкіл топтың қосындысын береді."
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
   "title": "Екі күндік орташа",
   "prompt": "Астана бойынша <code>day</code>, <code>revenue</code> және 2 күндік жылжымалы орташа <code>ma2</code> (өткен күн және бүгін) күн ретімен шығарыңыз.",
   "starter": "SELECT day, revenue,\n  \nFROM daily_sales\nWHERE region = 'Астана'\nORDER BY day;",
   "solution": "SELECT day, revenue, AVG(revenue) OVER (ORDER BY day ROWS BETWEEN 1 PRECEDING AND CURRENT ROW) AS ma2 FROM daily_sales WHERE region = 'Астана' ORDER BY day;",
   "hints": [
    "<code>ROWS BETWEEN 1 PRECEDING AND CURRENT ROW</code>"
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "ROWS"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "medium",
   "xp": 15,
   "title": "Жоспардың орындалуы",
   "prompt": "Алматы бойынша <code>day</code> және сол күнге дейін жиналған табыстың Алматының 10 күндік жалпы табысындағы үлесін пайызбен (<code>pct</code>, бір ондық таңба) күн ретімен шығарыңыз.",
   "starter": "SELECT day,\n  \nFROM daily_sales\nWHERE region = 'Алматы'\nORDER BY day;",
   "solution": "SELECT day, ROUND(SUM(revenue) OVER (ORDER BY day) * 100.0 / SUM(revenue) OVER (), 1) AS pct FROM daily_sales WHERE region = 'Алматы' ORDER BY day;",
   "hints": [
    "Алым: <code>SUM(revenue) OVER (ORDER BY day)</code>, бөлім: <code>SUM(revenue) OVER ()</code>."
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
   "title": "Үш күндік максимум",
   "prompt": "Алматы бойынша <code>day</code>, <code>revenue</code> және соңғы 3 күндегі (бүгінді қоса) ең жоғары табысты <code>max3</code> деген атпен күн ретімен шығарыңыз.",
   "starter": "SELECT day, revenue,\n  \nFROM daily_sales\nWHERE region = 'Алматы'\nORDER BY day;",
   "solution": "SELECT day, revenue, MAX(revenue) OVER (ORDER BY day ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS max3 FROM daily_sales WHERE region = 'Алматы' ORDER BY day;",
   "hints": [
    "Жылжымалы терезе тек <code>AVG</code>-пен емес, <code>MAX</code>-пен де жұмыс істейді."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "ROWS"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "hard",
   "xp": 20,
   "title": "Күндік жалпы жинақ",
   "prompt": "Алдымен CTE-де әр күннің екі аймақ бойынша жалпы табысын (<code>day</code>, <code>total</code>) есептеңіз. Сосын <code>day</code>, <code>total</code> және жинақты сома <code>running</code> бағандарын күн ретімен шығарыңыз.",
   "starter": "WITH d AS (\n  \n)\nSELECT ",
   "solution": "WITH d AS (SELECT day, SUM(revenue) AS total FROM daily_sales GROUP BY day) SELECT day, total, SUM(total) OVER (ORDER BY day) AS running FROM d ORDER BY day;",
   "hints": [
    "CTE ішінде <code>GROUP BY day</code>, сыртында терезе функциясы."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "WITH",
     "OVER"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "hard",
   "xp": 20,
   "title": "Орташадан жақсы күндер",
   "prompt": "Алматы бойынша табысы өзінің 3 күндік жылжымалы орташасынан (<code>ma3</code>, өткен екі күн және бүгін) жоғары болған күндерді шығарыңыз: <code>day</code>, <code>revenue</code>, <code>ma3</code> (бір ондық таңба). Күн ретімен.",
   "starter": "SELECT day, revenue, ma3\nFROM (\n  \n)\nWHERE ",
   "solution": "SELECT day, revenue, ROUND(ma3, 1) AS ma3 FROM (SELECT day, revenue, AVG(revenue) OVER (ORDER BY day ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS ma3 FROM daily_sales WHERE region = 'Алматы') WHERE revenue > ma3 ORDER BY day;",
   "hints": [
    "<code>ma3</code>-ті subquery-де есептеңіз: терезе функциясы <code>WHERE</code>-де жұмыс істемейді.",
    "Сыртқы сұрауда <code>WHERE revenue &gt; ma3</code>."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "ROWS"
    ]
   }
  }
 ],
 "adv-4": [
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Келесі тапсырыс күні",
   "prompt": "Барлық тапсырыстар үшін <code>id</code>, <code>order_date</code> және келесі тапсырыстың күнін <code>next_date</code> (<code>LEAD</code>) уақыт ретімен шығарыңыз.",
   "starter": "SELECT id, order_date,\n  \nFROM orders\nORDER BY order_date;",
   "solution": "SELECT id, order_date, LEAD(order_date) OVER (ORDER BY order_date) AS next_date FROM orders ORDER BY order_date;",
   "hints": [
    "<code>LEAD(order_date) OVER (ORDER BY order_date)</code>"
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "LEAD"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "easy",
   "xp": 10,
   "title": "Алматының кешегі табысы",
   "prompt": "Алматы бойынша <code>day</code>, <code>revenue</code> және алдыңғы күннің табысын <code>prev</code> деген атпен күн ретімен шығарыңыз.",
   "starter": "SELECT day, revenue,\n  \nFROM daily_sales\nWHERE region = 'Алматы'\nORDER BY day;",
   "solution": "SELECT day, revenue, LAG(revenue) OVER (ORDER BY day) AS prev FROM daily_sales WHERE region = 'Алматы' ORDER BY day;",
   "hints": [
    "<code>LAG(revenue) OVER (ORDER BY day)</code>; бірінші күнде NULL болады."
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
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Арзанырақ көрші",
   "prompt": "Тауарларды бағасы бойынша өсу ретімен сұрыптап, әр тауардың атауын, бағасын және одан бір саты арзан тауардың бағасын <code>cheaper</code> деген атпен шығарыңыз.",
   "starter": "SELECT name, price,\n  \nFROM products\nORDER BY price;",
   "solution": "SELECT name, price, LAG(price) OVER (ORDER BY price) AS cheaper FROM products ORDER BY price;",
   "hints": [
    "<code>LAG(price) OVER (ORDER BY price)</code>"
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
   "title": "Күндік өзгеріс",
   "prompt": "Алматы бойынша <code>day</code>, <code>revenue</code> және алдыңғы күнге қарағандағы айырманы <code>diff</code> деген атпен күн ретімен шығарыңыз.",
   "starter": "SELECT day, revenue,\n  \nFROM daily_sales\nWHERE region = 'Алматы'\nORDER BY day;",
   "solution": "SELECT day, revenue, revenue - LAG(revenue) OVER (ORDER BY day) AS diff FROM daily_sales WHERE region = 'Алматы' ORDER BY day;",
   "hints": [
    "<code>revenue - LAG(revenue) OVER (ORDER BY day)</code>"
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
   "title": "Аймақ ішінде LAG",
   "prompt": "Екі аймақ үшін бірге: <code>region</code>, <code>day</code>, <code>revenue</code> және сол аймақтың алдыңғы күнгі табысы <code>prev</code>. Әр аймақтың бірінші күнінде <code>prev</code> бос болуы керек. Реті: аймақ, сосын күн.",
   "starter": "SELECT region, day, revenue,\n  \nFROM daily_sales\nORDER BY region, day;",
   "solution": "SELECT region, day, revenue, LAG(revenue) OVER (PARTITION BY region ORDER BY day) AS prev FROM daily_sales ORDER BY region, day;",
   "hints": [
    "Аймақтар араласпауы үшін <code>PARTITION BY region</code> қосыңыз."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "LAG",
     "PARTITION BY"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Клиенттің алдыңғы тапсырысы",
   "prompt": "Әр тапсырыс үшін <code>customer_id</code>, <code>id</code>, <code>order_date</code> және <b>сол клиенттің</b> алдыңғы тапсырыс күнін <code>prev_date</code> деген атпен шығарыңыз. Реті: <code>customer_id</code>, сосын күн.",
   "starter": "SELECT customer_id, id, order_date,\n  \nFROM orders\nORDER BY customer_id, order_date;",
   "solution": "SELECT customer_id, id, order_date, LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date) AS prev_date FROM orders ORDER BY customer_id, order_date;",
   "hints": [
    "<code>LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date)</code>"
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
   "title": "Төмендеген күндер",
   "prompt": "Астана бойынша табысы алдыңғы күннен төмен болған күндерді шығарыңыз: <code>day</code>, <code>revenue</code>, <code>prev</code>. Күн ретімен.",
   "starter": "SELECT day, revenue, prev\nFROM (\n  \n)\nWHERE ",
   "solution": "SELECT day, revenue, prev FROM (SELECT day, revenue, LAG(revenue) OVER (ORDER BY day) AS prev FROM daily_sales WHERE region = 'Астана') WHERE revenue < prev ORDER BY day;",
   "hints": [
    "<code>prev</code>-ті subquery-де LAG арқылы есептеңіз.",
    "Сыртында <code>WHERE revenue &lt; prev</code>."
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
   "title": "Айлық төлем өсімі",
   "prompt": "<code>payments</code> кестесінен CTE-де әр айдың төлемдер қосындысын (<code>month</code>, <code>total</code>) есептеңіз. Сосын <code>month</code>, <code>total</code> және алдыңғы аймен салыстырғандағы өсімді пайызбен (<code>growth</code>, бір ондық таңба) ай ретімен шығарыңыз.",
   "starter": "WITH m AS (\n  \n)\nSELECT ",
   "solution": "WITH m AS (SELECT month, SUM(amount) AS total FROM payments GROUP BY month) SELECT month, total, ROUND((total - LAG(total) OVER (ORDER BY month)) * 100.0 / LAG(total) OVER (ORDER BY month), 1) AS growth FROM m ORDER BY month;",
   "hints": [
    "Өсім % = (ағымдағы − өткен) × 100.0 / өткен.",
    "Бөлгіш — өткен ай: <code>LAG(total) OVER (ORDER BY month)</code>."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "WITH",
     "LAG"
    ]
   }
  }
 ],
 "adv-5": [
  {
   "type": "sql",
   "dataset": "staff",
   "level": "easy",
   "xp": 10,
   "title": "Бөлімнің ең жаңа маманы",
   "prompt": "Әр бөлімге ең соңғы жұмысқа қабылданған қызметкерді шығарыңыз: <code>department</code>, <code>name</code>, <code>hire_date</code>.",
   "starter": "SELECT department, name, hire_date\nFROM (\n  \n)\nWHERE rn = 1;",
   "solution": "SELECT department, name, hire_date FROM (SELECT department, name, hire_date, ROW_NUMBER() OVER (PARTITION BY department ORDER BY hire_date DESC) AS rn FROM employees) WHERE rn = 1;",
   "hints": [
    "<code>ROW_NUMBER() OVER (PARTITION BY department ORDER BY hire_date DESC)</code>",
    "Сыртында <code>WHERE rn = 1</code>."
   ],
   "check": {
    "mustInclude": [
     "OVER"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Санаттың ең арзаны",
   "prompt": "Әр санаттың ең арзан тауарын шығарыңыз: <code>category</code>, <code>name</code>, <code>price</code>.",
   "starter": "SELECT category, name, price\nFROM (\n  \n)\nWHERE rn = 1;",
   "solution": "SELECT category, name, price FROM (SELECT category, name, price, ROW_NUMBER() OVER (PARTITION BY category ORDER BY price) AS rn FROM products) WHERE rn = 1;",
   "hints": [
    "Арзаннан бастау үшін <code>ORDER BY price</code> (ASC)."
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
   "level": "easy",
   "xp": 10,
   "title": "Аймақтың ең әлсіз күні",
   "prompt": "Әр аймақтың табысы ең төмен болған күнін шығарыңыз: <code>region</code>, <code>day</code>, <code>revenue</code>.",
   "starter": "SELECT region, day, revenue\nFROM (\n  \n)\nWHERE rn = 1;",
   "solution": "SELECT region, day, revenue FROM (SELECT region, day, revenue, ROW_NUMBER() OVER (PARTITION BY region ORDER BY revenue) AS rn FROM daily_sales) WHERE rn = 1;",
   "hints": [
    "<code>PARTITION BY region ORDER BY revenue</code>"
   ],
   "check": {
    "mustInclude": [
     "OVER"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "staff",
   "level": "medium",
   "xp": 15,
   "title": "Тең жалақымен үздік екеу",
   "prompt": "Әр бөлімде жалақы бойынша алғашқы 2 орынды алатын қызметкерлерді шығарыңыз: <code>department</code>, <code>name</code>, <code>salary</code>. Тең жалақы алатындар бірдей орынды бөліссін, сондықтан <code>RANK</code> қолданыңыз.",
   "starter": "SELECT department, name, salary\nFROM (\n  \n)\nWHERE ",
   "solution": "SELECT department, name, salary FROM (SELECT department, name, salary, RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS r FROM employees) WHERE r <= 2;",
   "hints": [
    "<code>ROW_NUMBER</code> тең мәндерге әртүрлі нөмір береді, <code>RANK</code> бірдей береді.",
    "Сыртында <code>WHERE r &lt;= 2</code>."
   ],
   "check": {
    "mustInclude": [
     "RANK"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Клиенттің бірінші тапсырысы",
   "prompt": "Әр клиенттің ең алғашқы тапсырысын шығарыңыз: <code>customer_id</code>, <code>id</code>, <code>order_date</code>.",
   "starter": "SELECT customer_id, id, order_date\nFROM (\n  \n)\nWHERE ",
   "solution": "SELECT customer_id, id, order_date FROM (SELECT customer_id, id, order_date, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS rn FROM orders) WHERE rn = 1;",
   "hints": [
    "Ең ертесі бірінші болу үшін <code>ORDER BY order_date</code> (ASC)."
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
   "title": "Ең үлкен төлем",
   "prompt": "<code>payments</code> кестесінен әр пайдаланушының ең үлкен төлемін бір жолмен шығарыңыз: <code>user_id</code>, <code>month</code>, <code>amount</code>. Сомалар тең болса, ең ерте ай алынсын.",
   "starter": "SELECT user_id, month, amount\nFROM (\n  \n)\nWHERE ",
   "solution": "SELECT user_id, month, amount FROM (SELECT user_id, month, amount, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY amount DESC, month) AS rn FROM payments) WHERE rn = 1;",
   "hints": [
    "Теңдікті шешу үшін екінші сұрыптау: <code>ORDER BY amount DESC, month</code>."
   ],
   "check": {
    "mustInclude": [
     "OVER"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Тапсырыстағы ең қымбат тауар",
   "prompt": "Әр тапсырыстағы ең қымбат тауарды шығарыңыз: <code>order_id</code>, тауардың атауы <code>name</code> және бағасы <code>price</code>. <code>order_items</code> мен <code>products</code>-ты біріктіріңіз.",
   "starter": "SELECT order_id, name, price\nFROM (\n  \n)\nWHERE ",
   "solution": "SELECT order_id, name, price FROM (SELECT oi.order_id, p.name, p.price, ROW_NUMBER() OVER (PARTITION BY oi.order_id ORDER BY p.price DESC) AS rn FROM order_items oi JOIN products p ON p.id = oi.product_id) WHERE rn = 1;",
   "hints": [
    "Subquery ішінде JOIN жасап, терезе функциясын қосыңыз.",
    "<code>PARTITION BY oi.order_id ORDER BY p.price DESC</code>"
   ],
   "check": {
    "mustInclude": [
     "OVER",
     "JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Қаланың белсенді клиенті",
   "prompt": "Әр қаланың ең көп тапсырыс берген клиентін шығарыңыз: <code>city</code>, <code>name</code> және тапсырыс саны <code>n</code>. Сан тең болса, <code>id</code> кішісі алынсын. Тапсырысы жоқ клиенттер есептелмейді.",
   "starter": "WITH cnt AS (\n  \n)\nSELECT city, name, n\nFROM (\n  \n)\nWHERE ",
   "solution": "WITH cnt AS (SELECT c.id, c.name, c.city, COUNT(*) AS n FROM customers c JOIN orders o ON o.customer_id = c.id GROUP BY c.id, c.name, c.city) SELECT city, name, n FROM (SELECT city, name, n, ROW_NUMBER() OVER (PARTITION BY city ORDER BY n DESC, id) AS rn FROM cnt) WHERE rn = 1;",
   "hints": [
    "Алдымен CTE-де әр клиенттің тапсырыс саны.",
    "Сосын <code>ROW_NUMBER() OVER (PARTITION BY city ORDER BY n DESC, id)</code>."
   ],
   "check": {
    "mustInclude": [
     "OVER"
    ]
   }
  }
 ],
 "adv-6": [
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "easy",
   "xp": 10,
   "title": "Арна атауы қазақша",
   "prompt": "<code>users</code> кестесінен <code>id</code> және арнаның қазақша атауын <code>channel_kz</code> деген атпен шығарыңыз: <code>ads</code> → <code>жарнама</code>, <code>organic</code> → <code>органикалық</code>, қалғаны → <code>ұсыныс</code>.",
   "starter": "SELECT id,\n  CASE\n  END AS channel_kz\nFROM users;",
   "solution": "SELECT id, CASE WHEN channel = 'ads' THEN 'жарнама' WHEN channel = 'organic' THEN 'органикалық' ELSE 'ұсыныс' END AS channel_kz FROM users;",
   "hints": [
    "Екі <code>WHEN</code> және бір <code>ELSE</code>."
   ],
   "check": {
    "mustInclude": [
     "CASE"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Санаттар бір жолда",
   "prompt": "Бір жолда үш баған шығарыңыз: <code>electronics</code>, <code>books</code>, <code>office</code> — «Электроника», «Кітаптар» және «Кеңсе» санаттарындағы тауарлар саны.",
   "starter": "SELECT\n  \nFROM products;",
   "solution": "SELECT SUM(CASE WHEN category = 'Электроника' THEN 1 ELSE 0 END) AS electronics, SUM(CASE WHEN category = 'Кітаптар' THEN 1 ELSE 0 END) AS books, SUM(CASE WHEN category = 'Кеңсе' THEN 1 ELSE 0 END) AS office FROM products;",
   "hints": [
    "<code>SUM(CASE WHEN category = 'Электроника' THEN 1 ELSE 0 END)</code>"
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
   "level": "easy",
   "xp": 10,
   "title": "Арналар бір жолда",
   "prompt": "<code>users</code> кестесінен бір жолда үш баған шығарыңыз: <code>ads</code>, <code>organic</code>, <code>referral</code> — әр арнадан келген пайдаланушылар саны.",
   "starter": "SELECT\n  \nFROM users;",
   "solution": "SELECT SUM(CASE WHEN channel = 'ads' THEN 1 ELSE 0 END) AS ads, SUM(CASE WHEN channel = 'organic' THEN 1 ELSE 0 END) AS organic, SUM(CASE WHEN channel = 'referral' THEN 1 ELSE 0 END) AS referral FROM users;",
   "hints": [
    "Әр баған — өз шарты бар бір <code>SUM(CASE ...)</code>."
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
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Қала бойынша статустар",
   "prompt": "Әр қала үшін бір жол шығарыңыз: <code>city</code>, <code>delivered</code> (жеткізілген тапсырыстар саны) және <code>not_delivered</code> (қалған тапсырыстар саны). <code>orders</code> мен <code>customers</code>-ты біріктіріңіз.",
   "starter": "SELECT c.city,\n  \nFROM orders o\nJOIN customers c ON c.id = o.customer_id\nGROUP BY c.city;",
   "solution": "SELECT c.city, SUM(CASE WHEN o.status = 'delivered' THEN 1 ELSE 0 END) AS delivered, SUM(CASE WHEN o.status <> 'delivered' THEN 1 ELSE 0 END) AS not_delivered FROM orders o JOIN customers c ON c.id = o.customer_id GROUP BY c.city;",
   "hints": [
    "JOIN, сосын <code>GROUP BY c.city</code> және екі <code>SUM(CASE ...)</code>."
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
   "title": "Айлар бағанға",
   "prompt": "<code>payments</code> кестесін pivot етіңіз: әр <code>user_id</code> үшін <code>jul</code>, <code>aug</code>, <code>sep</code> бағандары — 2024-07, 2024-08, 2024-09 айларындағы төлем сомасы (төлем болмаса 0). <code>user_id</code> бойынша сұрыптаңыз.",
   "starter": "SELECT user_id,\n  \nFROM payments\nGROUP BY user_id\nORDER BY user_id;",
   "solution": "SELECT user_id, SUM(CASE WHEN month = '2024-07' THEN amount ELSE 0 END) AS jul, SUM(CASE WHEN month = '2024-08' THEN amount ELSE 0 END) AS aug, SUM(CASE WHEN month = '2024-09' THEN amount ELSE 0 END) AS sep FROM payments GROUP BY user_id ORDER BY user_id;",
   "hints": [
    "<code>SUM(CASE WHEN month = '2024-07' THEN amount ELSE 0 END) AS jul</code>"
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
   "title": "Воронка конверсиясы",
   "prompt": "Бір жолда екі пайыз шығарыңыз (бір ондық таңба): <code>cart_rate</code> — cart қадамына жеткен бірегей пайдаланушылардың visit-тегілерге үлесі, <code>buy_rate</code> — purchase жасағандардың cart-тағыларға үлесі.",
   "starter": "SELECT\n  \nFROM events;",
   "solution": "SELECT ROUND(100.0 * COUNT(DISTINCT CASE WHEN step = 'cart' THEN user_id END) / COUNT(DISTINCT CASE WHEN step = 'visit' THEN user_id END), 1) AS cart_rate, ROUND(100.0 * COUNT(DISTINCT CASE WHEN step = 'purchase' THEN user_id END) / COUNT(DISTINCT CASE WHEN step = 'cart' THEN user_id END), 1) AS buy_rate FROM events;",
   "hints": [
    "Қадам саны: <code>COUNT(DISTINCT CASE WHEN step = 'cart' THEN user_id END)</code>.",
    "Бүтін бөлуден сақтану үшін <code>100.0 *</code> деп бастаңыз."
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
   "level": "hard",
   "xp": 20,
   "title": "Арна бойынша воронка",
   "prompt": "<code>events</code> пен <code>users</code>-ты біріктіріп, әр арна үшін воронканы шығарыңыз: <code>channel</code>, <code>visit</code>, <code>cart</code>, <code>purchase</code> — әр қадамға жеткен бірегей пайдаланушылар саны.",
   "starter": "SELECT u.channel,\n  \nFROM events e\nJOIN users u ON u.id = e.user_id\nGROUP BY u.channel;",
   "solution": "SELECT u.channel, COUNT(DISTINCT CASE WHEN e.step = 'visit' THEN e.user_id END) AS visit, COUNT(DISTINCT CASE WHEN e.step = 'cart' THEN e.user_id END) AS cart, COUNT(DISTINCT CASE WHEN e.step = 'purchase' THEN e.user_id END) AS purchase FROM events e JOIN users u ON u.id = e.user_id GROUP BY u.channel;",
   "hints": [
    "<code>JOIN users u ON u.id = e.user_id</code>, сосын <code>GROUP BY u.channel</code>."
   ],
   "check": {
    "mustInclude": [
     "CASE"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Санат табысы статус бойынша",
   "prompt": "Әр санат үшін бір жол шығарыңыз: <code>category</code>, <code>delivered_rev</code> (жеткізілген тапсырыстардың табысы) және <code>other_rev</code> (қалған тапсырыстардың табысы). Табыс = <code>quantity × price</code>. Санат атауы бойынша сұрыптаңыз.",
   "starter": "SELECT p.category,\n  \nFROM orders o\nJOIN ",
   "solution": "SELECT p.category, SUM(CASE WHEN o.status = 'delivered' THEN oi.quantity * p.price ELSE 0 END) AS delivered_rev, SUM(CASE WHEN o.status <> 'delivered' THEN oi.quantity * p.price ELSE 0 END) AS other_rev FROM orders o JOIN order_items oi ON oi.order_id = o.id JOIN products p ON p.id = oi.product_id GROUP BY p.category ORDER BY p.category;",
   "hints": [
    "Үш кестені біріктіріңіз: orders → order_items → products.",
    "THEN ішінде есептеу: <code>THEN oi.quantity * p.price ELSE 0</code>."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "CASE"
    ]
   }
  }
 ],
 "adv-7": [
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "easy",
   "xp": 10,
   "title": "Арна бойынша тіркелу",
   "prompt": "Әр арнадан қанша пайдаланушы тіркелгенін шығарыңыз: <code>channel</code> және сан.",
   "starter": "SELECT channel, COUNT(*)\nFROM users;",
   "solution": "SELECT channel, COUNT(*) FROM users GROUP BY channel;",
   "hints": [
    "<code>GROUP BY channel</code>"
   ],
   "check": {
    "mustInclude": [
     "GROUP BY"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "easy",
   "xp": 10,
   "title": "Ай сайынғы белсенділер",
   "prompt": "<code>activity</code> кестесінен әр айдағы бірегей белсенді пайдаланушылар санын шығарыңыз: <code>month</code> және <code>active</code>. Ай ретімен.",
   "starter": "SELECT month,\n  \nFROM activity\nGROUP BY month\nORDER BY month;",
   "solution": "SELECT month, COUNT(DISTINCT user_id) AS active FROM activity GROUP BY month ORDER BY month;",
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
   "level": "easy",
   "xp": 10,
   "title": "Когорт пен арна",
   "prompt": "Әр когорт (<code>signup_month</code>) пен арна (<code>channel</code>) жұбы үшін пайдаланушылар санын шығарыңыз: <code>signup_month</code>, <code>channel</code>, <code>n</code>.",
   "starter": "SELECT signup_month, channel,\n  \nFROM users;",
   "solution": "SELECT signup_month, channel, COUNT(*) AS n FROM users GROUP BY signup_month, channel;",
   "hints": [
    "Екі баған бойынша топтау: <code>GROUP BY signup_month, channel</code>."
   ],
   "check": {
    "mustInclude": [
     "GROUP BY"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "medium",
   "xp": 15,
   "title": "Кейін қайтып келгендер",
   "prompt": "Әр когорт үшін тіркелген айынан кейінгі айларда кемінде бір рет белсенді болған бірегей пайдаланушылар санын шығарыңыз: <code>cohort</code>, <code>returned</code>. Ондай пайдаланушысы жоқ когорт көрінбейді.",
   "starter": "SELECT u.signup_month AS cohort,\n  \nFROM users u\nJOIN activity a ON a.user_id = u.id\n",
   "solution": "SELECT u.signup_month AS cohort, COUNT(DISTINCT a.user_id) AS returned FROM users u JOIN activity a ON a.user_id = u.id WHERE a.month > u.signup_month GROUP BY u.signup_month;",
   "hints": [
    "Ай мәтін ('2024-08') болса да, салыстыруға болады: <code>a.month &gt; u.signup_month</code>."
   ],
   "check": {
    "mustInclude": [
     "JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "medium",
   "xp": 15,
   "title": "Шілде когортының retention-ы",
   "prompt": "Тек 2024-07 когорты үшін әр айдың retention-ын шығарыңыз: <code>month</code> және <code>retention</code> (белсенділер / когорт өлшемі × 100, бір ондық таңба). Когорт өлшемін subquery арқылы табыңыз. Ай ретімен.",
   "starter": "SELECT a.month,\n  \nFROM users u\nJOIN activity a ON a.user_id = u.id\nWHERE u.signup_month = '2024-07'\nGROUP BY a.month\nORDER BY a.month;",
   "solution": "SELECT a.month, ROUND(100.0 * COUNT(DISTINCT a.user_id) / (SELECT COUNT(*) FROM users WHERE signup_month = '2024-07'), 1) AS retention FROM users u JOIN activity a ON a.user_id = u.id WHERE u.signup_month = '2024-07' GROUP BY a.month ORDER BY a.month;",
   "hints": [
    "Бөлгіш: <code>(SELECT COUNT(*) FROM users WHERE signup_month = '2024-07')</code>."
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
   "title": "Когорт табысы",
   "prompt": "<code>payments</code> мен <code>users</code>-ты біріктіріп, әр когорттың барлық айлардағы жалпы төлем сомасын шығарыңыз: <code>cohort</code>, <code>revenue</code>. Когорт ретімен.",
   "starter": "SELECT u.signup_month AS cohort,\n  \nFROM payments p\n",
   "solution": "SELECT u.signup_month AS cohort, SUM(p.amount) AS revenue FROM payments p JOIN users u ON u.id = p.user_id GROUP BY u.signup_month ORDER BY cohort;",
   "hints": [
    "<code>JOIN users u ON u.id = p.user_id</code>, сосын <code>GROUP BY u.signup_month</code>."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "hard",
   "xp": 20,
   "title": "Арна бойынша retention",
   "prompt": "2024-09-ға дейін тіркелген пайдаланушылар үшін (<code>signup_month &lt; '2024-09'</code>) әр арнаның 2024-09 айындағы retention-ын шығарыңыз: <code>channel</code>, <code>retention</code> — сол айда белсенді болғандардың үлесі, %, бір ондық таңба.",
   "starter": "SELECT u.channel,\n  \nFROM users u\nLEFT JOIN activity a ON a.user_id = u.id\n",
   "solution": "SELECT u.channel, ROUND(100.0 * COUNT(DISTINCT CASE WHEN a.month = '2024-09' THEN u.id END) / COUNT(DISTINCT u.id), 1) AS retention FROM users u LEFT JOIN activity a ON a.user_id = u.id WHERE u.signup_month < '2024-09' GROUP BY u.channel;",
   "hints": [
    "Алым: <code>COUNT(DISTINCT CASE WHEN a.month = '2024-09' THEN u.id END)</code>.",
    "Бөлгіш: арнадағы барлық пайдаланушы, <code>COUNT(DISTINCT u.id)</code>."
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
   "level": "hard",
   "xp": 20,
   "title": "Когорт бойынша ARPU",
   "prompt": "Әр когорт үшін <code>cohort</code>, когорт өлшемі <code>size</code>, когорттың жалпы төлемі <code>revenue</code> және бір пайдаланушыға шаққандағы табыс <code>arpu</code> (<code>revenue / size</code>, бүтінге дейін) шығарыңыз. Екі CTE қолданыңыз. Когорт ретімен.",
   "starter": "WITH size AS (\n  \n),\nrev AS (\n  \n)\nSELECT ",
   "solution": "WITH size AS (SELECT signup_month, COUNT(*) AS n FROM users GROUP BY signup_month), rev AS (SELECT u.signup_month, SUM(p.amount) AS revenue FROM payments p JOIN users u ON u.id = p.user_id GROUP BY u.signup_month) SELECT s.signup_month AS cohort, s.n AS size, r.revenue, ROUND(r.revenue * 1.0 / s.n) AS arpu FROM size s JOIN rev r ON r.signup_month = s.signup_month ORDER BY cohort;",
   "hints": [
    "<code>WITH size AS (...), rev AS (...)</code>",
    "Бүтін бөлуден сақтану: <code>r.revenue * 1.0 / s.n</code>."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "WITH"
    ]
   }
  }
 ],
 "adv-8": [
  {
   "type": "sql",
   "dataset": "empty",
   "level": "easy",
   "xp": 10,
   "title": "Тауар өлшемі",
   "prompt": "Бос дерекқорда тауар dimension кестесін құрыңыз: <code>dim_product</code>, бағандары <code>product_key INTEGER PRIMARY KEY</code>, <code>name TEXT</code>, <code>category TEXT</code>.",
   "starter": "CREATE TABLE dim_product (\n  \n);",
   "solution": "CREATE TABLE dim_product (product_key INTEGER PRIMARY KEY, name TEXT, category TEXT);",
   "hints": [
    "<code>CREATE TABLE dim_product (product_key INTEGER PRIMARY KEY, ...)</code>"
   ],
   "check": {
    "after": "SELECT name, UPPER(type), pk FROM pragma_table_info('dim_product')"
   }
  },
  {
   "type": "sql",
   "dataset": "empty",
   "level": "easy",
   "xp": 10,
   "title": "Күн өлшемі",
   "prompt": "Бос дерекқорда күн dimension кестесін құрыңыз: <code>dim_date</code>, бағандары <code>date_key INTEGER PRIMARY KEY</code>, <code>full_date TEXT</code>, <code>month INTEGER</code>, <code>year INTEGER</code>.",
   "starter": "CREATE TABLE dim_date (\n  \n);",
   "solution": "CREATE TABLE dim_date (date_key INTEGER PRIMARY KEY, full_date TEXT, month INTEGER, year INTEGER);",
   "hints": [
    "Бағандарды дәл осы ретпен жазыңыз."
   ],
   "check": {
    "after": "SELECT name, UPPER(type), pk FROM pragma_table_info('dim_date')"
   }
  },
  {
   "type": "sql",
   "dataset": "empty",
   "level": "easy",
   "xp": 10,
   "title": "Дүкендер өлшемі",
   "prompt": "Бос дерекқорда <code>dim_store</code> кестесін құрыңыз (<code>store_key INTEGER PRIMARY KEY</code>, <code>city TEXT</code>) және үш дүкен қосыңыз: (1, 'Алматы'), (2, 'Астана'), (3, 'Шымкент').",
   "starter": "CREATE TABLE dim_store (\n  \n);\n\nINSERT INTO dim_store VALUES ",
   "solution": "CREATE TABLE dim_store (store_key INTEGER PRIMARY KEY, city TEXT); INSERT INTO dim_store VALUES (1, 'Алматы'), (2, 'Астана'), (3, 'Шымкент');",
   "hints": [
    "Алдымен <code>CREATE TABLE</code>, сосын бір <code>INSERT</code>-пен үш жол."
   ],
   "check": {
    "ordered": true,
    "after": "SELECT * FROM dim_store ORDER BY store_key"
   }
  },
  {
   "type": "sql",
   "dataset": "empty",
   "level": "medium",
   "xp": 15,
   "title": "Fact кестесінің сілтемесі",
   "prompt": "Бос дерекқорда екі кесте құрыңыз: <code>dim_city</code> (<code>city_key INTEGER PRIMARY KEY</code>, <code>name TEXT</code>) және <code>fact_orders</code> (<code>order_id INTEGER PRIMARY KEY</code>, <code>city_key INTEGER</code> — <code>dim_city(city_key)</code>-ға сілтеме, <code>amount INTEGER</code>).",
   "starter": "CREATE TABLE dim_city (\n  \n);\n\nCREATE TABLE fact_orders (\n  \n);",
   "solution": "CREATE TABLE dim_city (city_key INTEGER PRIMARY KEY, name TEXT); CREATE TABLE fact_orders (order_id INTEGER PRIMARY KEY, city_key INTEGER REFERENCES dim_city(city_key), amount INTEGER);",
   "hints": [
    "Fact кестесіндегі кілт dimension-ға сілтейді: <code>city_key INTEGER REFERENCES dim_city(city_key)</code>."
   ],
   "check": {
    "after": "SELECT \"table\", \"from\", \"to\" FROM pragma_foreign_key_list('fact_orders')"
   }
  },
  {
   "type": "sql",
   "dataset": "empty",
   "level": "medium",
   "xp": 15,
   "title": "Санат бойынша сатылым",
   "prompt": "Starter-де star schema дайын: <code>dim_product</code> және <code>fact_sales</code>. Оларды біріктіріп, әр санаттың сатылым сомасын шығарыңыз: <code>category</code>, <code>total</code> (<code>amount</code> қосындысы).",
   "starter": "CREATE TABLE dim_product (product_key INTEGER PRIMARY KEY, name TEXT, category TEXT);\nINSERT INTO dim_product VALUES (1, 'Латте', 'Кофе'), (2, 'Американо', 'Кофе'), (3, 'Самса', 'Тағам'), (4, 'Шай', 'Шай');\nCREATE TABLE fact_sales (sale_id INTEGER PRIMARY KEY, date_key INTEGER, product_key INTEGER, quantity INTEGER, amount INTEGER);\nINSERT INTO fact_sales VALUES (1, 20240101, 1, 2, 2400), (2, 20240101, 3, 3, 1500), (3, 20240102, 2, 1, 900), (4, 20240102, 1, 1, 1200), (5, 20240201, 4, 4, 1600), (6, 20240201, 3, 2, 1000), (7, 20240202, 1, 3, 3600);\n\nSELECT ",
   "solution": "CREATE TABLE dim_product (product_key INTEGER PRIMARY KEY, name TEXT, category TEXT);\nINSERT INTO dim_product VALUES (1, 'Латте', 'Кофе'), (2, 'Американо', 'Кофе'), (3, 'Самса', 'Тағам'), (4, 'Шай', 'Шай');\nCREATE TABLE fact_sales (sale_id INTEGER PRIMARY KEY, date_key INTEGER, product_key INTEGER, quantity INTEGER, amount INTEGER);\nINSERT INTO fact_sales VALUES (1, 20240101, 1, 2, 2400), (2, 20240101, 3, 3, 1500), (3, 20240102, 2, 1, 900), (4, 20240102, 1, 1, 1200), (5, 20240201, 4, 4, 1600), (6, 20240201, 3, 2, 1000), (7, 20240202, 1, 3, 3600);\nSELECT d.category, SUM(f.amount) AS total FROM fact_sales f JOIN dim_product d ON d.product_key = f.product_key GROUP BY d.category;",
   "hints": [
    "Fact пен dimension кілт арқылы біріктіріледі: <code>ON d.product_key = f.product_key</code>."
   ],
   "check": {
    "mustInclude": [
     "JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "empty",
   "level": "medium",
   "xp": 15,
   "title": "Ай бойынша сатылым",
   "prompt": "Starter-де <code>dim_date</code> мен <code>fact_sales</code> дайын. Әр айдың сатылған данасын (<code>quantity</code> қосындысы) және сомасын (<code>amount</code> қосындысы) шығарыңыз: <code>month</code>, <code>qty</code>, <code>total</code>. Ай ретімен.",
   "starter": "CREATE TABLE dim_date (date_key INTEGER PRIMARY KEY, full_date TEXT, month TEXT);\nINSERT INTO dim_date VALUES (20240101, '2024-01-01', '2024-01'), (20240102, '2024-01-02', '2024-01'), (20240201, '2024-02-01', '2024-02'), (20240202, '2024-02-02', '2024-02');\nCREATE TABLE fact_sales (sale_id INTEGER PRIMARY KEY, date_key INTEGER, product_key INTEGER, quantity INTEGER, amount INTEGER);\nINSERT INTO fact_sales VALUES (1, 20240101, 1, 2, 2400), (2, 20240101, 3, 3, 1500), (3, 20240102, 2, 1, 900), (4, 20240102, 1, 1, 1200), (5, 20240201, 4, 4, 1600), (6, 20240201, 3, 2, 1000), (7, 20240202, 1, 3, 3600);\n\nSELECT ",
   "solution": "CREATE TABLE dim_date (date_key INTEGER PRIMARY KEY, full_date TEXT, month TEXT);\nINSERT INTO dim_date VALUES (20240101, '2024-01-01', '2024-01'), (20240102, '2024-01-02', '2024-01'), (20240201, '2024-02-01', '2024-02'), (20240202, '2024-02-02', '2024-02');\nCREATE TABLE fact_sales (sale_id INTEGER PRIMARY KEY, date_key INTEGER, product_key INTEGER, quantity INTEGER, amount INTEGER);\nINSERT INTO fact_sales VALUES (1, 20240101, 1, 2, 2400), (2, 20240101, 3, 3, 1500), (3, 20240102, 2, 1, 900), (4, 20240102, 1, 1, 1200), (5, 20240201, 4, 4, 1600), (6, 20240201, 3, 2, 1000), (7, 20240202, 1, 3, 3600);\nSELECT d.month, SUM(f.quantity) AS qty, SUM(f.amount) AS total FROM fact_sales f JOIN dim_date d ON d.date_key = f.date_key GROUP BY d.month ORDER BY d.month;",
   "hints": [
    "<code>JOIN dim_date d ON d.date_key = f.date_key</code>, сосын <code>GROUP BY d.month</code>."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "empty",
   "level": "hard",
   "xp": 20,
   "title": "Екі өлшемді есеп",
   "prompt": "Starter-де <code>dim_store</code>, <code>dim_product</code> және <code>fact_sales</code> дайын. Әр қала мен санат жұбы бойынша сатылым сомасын шығарыңыз: <code>city</code>, <code>category</code>, <code>total</code>. Реті: қала, сосын санат.",
   "starter": "CREATE TABLE dim_store (store_key INTEGER PRIMARY KEY, city TEXT);\nINSERT INTO dim_store VALUES (1, 'Алматы'), (2, 'Астана');\nCREATE TABLE dim_product (product_key INTEGER PRIMARY KEY, name TEXT, category TEXT);\nINSERT INTO dim_product VALUES (1, 'Латте', 'Кофе'), (2, 'Самса', 'Тағам'), (3, 'Шай', 'Шай');\nCREATE TABLE fact_sales (sale_id INTEGER PRIMARY KEY, store_key INTEGER, product_key INTEGER, amount INTEGER);\nINSERT INTO fact_sales VALUES (1, 1, 1, 2400), (2, 1, 2, 1500), (3, 2, 1, 1200), (4, 2, 1, 3600), (5, 2, 3, 1600), (6, 1, 3, 800), (7, 2, 2, 1000);\n\nSELECT ",
   "solution": "CREATE TABLE dim_store (store_key INTEGER PRIMARY KEY, city TEXT);\nINSERT INTO dim_store VALUES (1, 'Алматы'), (2, 'Астана');\nCREATE TABLE dim_product (product_key INTEGER PRIMARY KEY, name TEXT, category TEXT);\nINSERT INTO dim_product VALUES (1, 'Латте', 'Кофе'), (2, 'Самса', 'Тағам'), (3, 'Шай', 'Шай');\nCREATE TABLE fact_sales (sale_id INTEGER PRIMARY KEY, store_key INTEGER, product_key INTEGER, amount INTEGER);\nINSERT INTO fact_sales VALUES (1, 1, 1, 2400), (2, 1, 2, 1500), (3, 2, 1, 1200), (4, 2, 1, 3600), (5, 2, 3, 1600), (6, 1, 3, 800), (7, 2, 2, 1000);\nSELECT s.city, p.category, SUM(f.amount) AS total FROM fact_sales f JOIN dim_store s ON s.store_key = f.store_key JOIN dim_product p ON p.product_key = f.product_key GROUP BY s.city, p.category ORDER BY s.city, p.category;",
   "hints": [
    "Fact кестесін екі dimension-мен біріктіріңіз.",
    "<code>GROUP BY s.city, p.category</code>"
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "empty",
   "level": "hard",
   "xp": 20,
   "title": "Жетім fact жолдары",
   "prompt": "Starter-дегі <code>fact_sales</code> кестесінде <code>dim_product</code>-та жоқ <code>product_key</code> бар жолдар кездеседі. Деректер сапасын тексеру үшін сондай жолдардың <code>sale_id</code>, <code>product_key</code> және <code>amount</code> бағандарын шығарыңыз.",
   "starter": "CREATE TABLE dim_product (product_key INTEGER PRIMARY KEY, name TEXT);\nINSERT INTO dim_product VALUES (1, 'Латте'), (2, 'Самса'), (3, 'Шай');\nCREATE TABLE fact_sales (sale_id INTEGER PRIMARY KEY, product_key INTEGER, amount INTEGER);\nINSERT INTO fact_sales VALUES (1, 1, 1200), (2, 2, 500), (3, 5, 900), (4, 3, 400), (5, 7, 1100), (6, 1, 2400);\n\nSELECT ",
   "solution": "CREATE TABLE dim_product (product_key INTEGER PRIMARY KEY, name TEXT);\nINSERT INTO dim_product VALUES (1, 'Латте'), (2, 'Самса'), (3, 'Шай');\nCREATE TABLE fact_sales (sale_id INTEGER PRIMARY KEY, product_key INTEGER, amount INTEGER);\nINSERT INTO fact_sales VALUES (1, 1, 1200), (2, 2, 500), (3, 5, 900), (4, 3, 400), (5, 7, 1100), (6, 1, 2400);\nSELECT f.sale_id, f.product_key, f.amount FROM fact_sales f LEFT JOIN dim_product d ON d.product_key = f.product_key WHERE d.product_key IS NULL;",
   "hints": [
    "<code>fact_sales f LEFT JOIN dim_product d ON ...</code>",
    "Жұбы жоқтар: <code>WHERE d.product_key IS NULL</code>."
   ],
   "check": {
    "mustInclude": [
     "LEFT JOIN"
    ]
   }
  }
 ],
 "adv-9": [
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Санатқа индекс",
   "prompt": "<code>products</code> кестесінің <code>category</code> бағанына индекс құрыңыз (атауы кез келген).",
   "starter": "",
   "solution": "CREATE INDEX idx_products_category ON products(category);",
   "hints": [
    "<code>CREATE INDEX атауы ON кесте(баған);</code>"
   ],
   "check": {
    "mustInclude": [
     "CREATE INDEX"
    ],
    "after": "SELECT COUNT(*) FROM sqlite_master WHERE type = 'index' AND tbl_name = 'products' AND sql LIKE '%category%'"
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Күнге индекс",
   "prompt": "<code>orders</code> кестесінің <code>order_date</code> бағанына индекс құрыңыз (атауы кез келген).",
   "starter": "",
   "solution": "CREATE INDEX idx_orders_date ON orders(order_date);",
   "hints": [
    "<code>CREATE INDEX idx_orders_date ON orders(order_date);</code>"
   ],
   "check": {
    "mustInclude": [
     "CREATE INDEX"
    ],
    "after": "SELECT COUNT(*) FROM sqlite_master WHERE type = 'index' AND tbl_name = 'orders' AND sql LIKE '%order_date%'"
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "JOIN бағанына индекс",
   "prompt": "<code>order_items</code> кестесі <code>products</code>-пен <code>product_id</code> арқылы жиі біріктіріледі. Осы бағанға индекс құрыңыз.",
   "starter": "",
   "solution": "CREATE INDEX idx_items_product ON order_items(product_id);",
   "hints": [
    "Индекс <code>JOIN ... ON</code>-да қолданылатын бағанға пайдалы."
   ],
   "check": {
    "mustInclude": [
     "CREATE INDEX"
    ],
    "after": "SELECT COUNT(*) FROM sqlite_master WHERE type = 'index' AND tbl_name = 'order_items' AND sql LIKE '%product_id%'"
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Индексті өшірмейтін сүзгі",
   "prompt": "2024 жылғы қазандағы тапсырыстардың <code>id</code> мен <code>order_date</code> бағандарын шығарыңыз. Бағанға функция қолданбай, күн аралығымен жазыңыз: <code>&gt;=</code> және <code>&lt;</code>.",
   "starter": "SELECT id, order_date\nFROM orders\nWHERE substr(order_date, 1, 7) = '2024-09';",
   "solution": "SELECT id, order_date FROM orders WHERE order_date >= '2024-10-01' AND order_date < '2024-11-01';",
   "hints": [
    "<code>substr(order_date, 1, 7) = '2024-10'</code> индексті «өшіреді».",
    "Орнына: <code>order_date &gt;= '2024-10-01' AND order_date &lt; '2024-11-01'</code>."
   ],
   "check": {
    "mustInclude": [
     ">=",
     "<"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Индекс және JOIN",
   "prompt": "Алдымен <code>customers</code> кестесінің <code>city</code> бағанына индекс құрыңыз. Сосын Алматы клиенттерінің тапсырыстарын шығарыңыз: тек <code>o.id</code> және <code>c.name</code> (<code>SELECT *</code> емес).",
   "starter": "CREATE INDEX \n\nSELECT o.id, c.name\nFROM orders o\n",
   "solution": "CREATE INDEX idx_customers_city ON customers(city); SELECT o.id, c.name FROM orders o JOIN customers c ON c.id = o.customer_id WHERE c.city = 'Алматы';",
   "hints": [
    "Екі команда: <code>CREATE INDEX ...;</code> және <code>SELECT ...;</code>",
    "Тек керекті бағандарды алыңыз."
   ],
   "check": {
    "mustInclude": [
     "CREATE INDEX",
     "JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Құрама индекс",
   "prompt": "<code>order_items</code> кестесіне екі баған бойынша бір құрама индекс құрыңыз: алдымен <code>order_id</code>, сосын <code>product_id</code>.",
   "starter": "",
   "solution": "CREATE INDEX idx_items_order_product ON order_items(order_id, product_id);",
   "hints": [
    "Жақша ішінде бағандарды үтірмен жазыңыз: <code>ON order_items(order_id, product_id)</code>."
   ],
   "check": {
    "mustInclude": [
     "CREATE INDEX"
    ],
    "after": "SELECT COUNT(*) FROM sqlite_master WHERE type = 'index' AND tbl_name = 'order_items' AND sql LIKE '%order_id%product_id%'"
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Индекс және күн аралығы",
   "prompt": "<code>orders</code> кестесінің <code>order_date</code> бағанына индекс құрыңыз. Сосын 2024 жылғы қыркүйек пен қазандағы (1 қыркүйек – 31 қазан) тапсырыстарды статус бойынша санаңыз: <code>status</code>, сан. Күнге функция қолданбаңыз.",
   "starter": "CREATE INDEX \n\nSELECT status, COUNT(*)\nFROM orders\n",
   "solution": "CREATE INDEX idx_orders_date ON orders(order_date); SELECT status, COUNT(*) FROM orders WHERE order_date >= '2024-09-01' AND order_date < '2024-11-01' GROUP BY status;",
   "hints": [
    "Аралық: <code>order_date &gt;= '2024-09-01' AND order_date &lt; '2024-11-01'</code>.",
    "Сосын <code>GROUP BY status</code>."
   ],
   "check": {
    "mustInclude": [
     "CREATE INDEX",
     ">=",
     "GROUP BY"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Алдымен сүз, сосын біріктір",
   "prompt": "<code>order_items</code> кестесінің <code>product_id</code> бағанына индекс құрыңыз. Сосын CTE-де тек жеткізілген (<code>delivered</code>) тапсырыстарды алып, сол тапсырыстар бойынша әр тауардың табысын (<code>quantity × price</code>) есептеңіз. Табысы 100 000 теңгеден асатын тауарлардың <code>name</code> мен <code>revenue</code> бағандарын шығарыңыз.",
   "starter": "CREATE INDEX \n\nWITH d AS (\n  \n)\nSELECT ",
   "solution": "CREATE INDEX idx_items_product ON order_items(product_id); WITH d AS (SELECT id FROM orders WHERE status = 'delivered') SELECT p.name, SUM(oi.quantity * p.price) AS revenue FROM d JOIN order_items oi ON oi.order_id = d.id JOIN products p ON p.id = oi.product_id GROUP BY p.id, p.name HAVING SUM(oi.quantity * p.price) > 100000;",
   "hints": [
    "CTE: <code>WITH d AS (SELECT id FROM orders WHERE status = ...)</code> — аз жолмен жұмыс істейміз.",
    "Сосын <code>d</code> → order_items → products және <code>HAVING</code>."
   ],
   "check": {
    "mustInclude": [
     "CREATE INDEX",
     "WITH"
    ]
   }
  }
 ]
});
