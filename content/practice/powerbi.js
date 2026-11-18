// Practice tasks after the lessons of m3-5. Each lesson's list opens one task at a time.
DJ.addPractice('m3-5', {
 "pbi-2": [
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "easy",
   "xp": 10,
   "title": "Қайтарылған тапсырыстар",
   "prompt": "Power Query-дегі Filter Rows қадамын SQL-де жасаңыз: статусы <code>refund</code> тапсырыстардың <code>id</code>, <code>customer_id</code> және <code>amount</code> бағандарын шығарыңыз.",
   "starter": "SELECT id, customer_id, amount\nFROM orders\nWHERE ",
   "solution": "SELECT id, customer_id, amount FROM orders WHERE status = 'refund';",
   "hints": [
    "<code>WHERE status = 'refund'</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "easy",
   "xp": 10,
   "title": "Сомасы бос тапсырыстар",
   "prompt": "Тазалаудан бұрын мәселені табайық: сомасы (<code>amount</code>) бос тапсырыстардың <code>id</code> мен <code>customer_id</code> бағандарын шығарыңыз.",
   "starter": "SELECT id, customer_id\nFROM orders\nWHERE ",
   "solution": "SELECT id, customer_id FROM orders WHERE amount IS NULL;",
   "hints": [
    "Бос мән: <code>amount IS NULL</code>."
   ]
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "easy",
   "xp": 10,
   "title": "Қалалар сөздігі",
   "prompt": "Анықтамалық кесте жасау үшін клиенттер тұратын қалалардың қайталанбайтын тізімін шығарыңыз (Remove Duplicates қадамы).",
   "starter": "SELECT city\nFROM customers;",
   "solution": "SELECT DISTINCT city FROM customers;",
   "hints": [
    "<code>SELECT DISTINCT city</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "Бос соманы толтыру",
   "prompt": "18-клиенттің барлық тапсырысын шығарыңыз: <code>id</code>, <code>order_date</code> және <code>amount</code>, бірақ бос сома орнына 0 тұрсын (Replace Values қадамы). <code>COALESCE</code> қолданыңыз.",
   "starter": "SELECT id, order_date, amount\nFROM orders\nWHERE customer_id = 18;",
   "solution": "SELECT id, order_date, COALESCE(amount, 0) AS amount FROM orders WHERE customer_id = 18;",
   "hints": [
    "<code>COALESCE(amount, 0)</code>"
   ],
   "check": {
    "mustInclude": [
     "COALESCE"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "Тапсырысқа қала қосу",
   "prompt": "Merge Queries қадамын SQL-де жасаңыз: таза тапсырыстарға клиенттің қаласын қосып, тек Шымкент тапсырыстарының <code>id</code>, <code>city</code> және <code>amount</code> бағандарын шығарыңыз. Таза тапсырыс: <code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші.",
   "starter": "SELECT o.id, c.city, o.amount\nFROM orders o\nJOIN ",
   "solution": "SELECT o.id, c.city, o.amount FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000 AND c.city = 'Шымкент';",
   "hints": [
    "Merge = JOIN: <code>orders o JOIN customers c ON c.id = o.customer_id</code>.",
    "Таза деректің үш шартына қала шартын қосыңыз."
   ],
   "check": {
    "mustInclude": [
     "JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "Лас жолдарды табу",
   "prompt": "Тазалау кезінде түсіп қалатын жолдардың бәрін шығарыңыз: статусы <code>paid</code> емес, <b>немесе</b> сомасы бос, <b>немесе</b> сомасы 20 000 және одан көп. Бағандар: <code>id</code>, <code>status</code>, <code>amount</code>.",
   "starter": "SELECT id, status, amount\nFROM orders\nWHERE ",
   "solution": "SELECT id, status, amount FROM orders WHERE status <> 'paid' OR amount IS NULL OR amount >= 20000;",
   "hints": [
    "Таза шарттың «теріс» нұсқасы: үш шартты <code>OR</code>-мен біріктіріңіз."
   ]
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "hard",
   "xp": 20,
   "title": "Филиал бойынша таза табыс",
   "prompt": "Таза тапсырыстар бойынша Group By қадамын жасаңыз: әр қала үшін <code>city</code>, тапсырыс саны <code>orders</code> және сома <code>revenue</code>. Табыстың кемуі бойынша сұрыптаңыз. Таза тапсырыс: <code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші.",
   "starter": "SELECT c.city, COUNT(*) AS orders, SUM(o.amount) AS revenue\nFROM orders o\nJOIN ",
   "solution": "SELECT c.city, COUNT(*) AS orders, SUM(o.amount) AS revenue FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000 GROUP BY c.city ORDER BY revenue DESC;",
   "hints": [
    "Алдымен сүзу (WHERE), сосын JOIN-мен қала, соңында <code>GROUP BY c.city</code>."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "GROUP BY"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "hard",
   "xp": 20,
   "title": "Кең кестені ұзын ету",
   "prompt": "Unpivot-ты SQL-де қайталаңыз. CTE-де таза тапсырыстардан «кең» кесте жасаңыз: әр қала үшін <code>jan</code> (2024-01 табысы) және <code>feb</code> (2024-02 табысы). Сосын оны <code>UNION ALL</code> арқылы «ұзын» етіңіз: <code>city</code>, <code>month</code> (<code>'2024-01'</code> немесе <code>'2024-02'</code>), <code>amount</code>. Таза тапсырыс: <code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші.",
   "starter": "WITH wide AS (\n  \n)\nSELECT ",
   "solution": "WITH wide AS (SELECT c.city, SUM(CASE WHEN o.order_date LIKE '2024-01%' THEN o.amount ELSE 0 END) AS jan, SUM(CASE WHEN o.order_date LIKE '2024-02%' THEN o.amount ELSE 0 END) AS feb FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000 GROUP BY c.city) SELECT city, '2024-01' AS month, jan AS amount FROM wide UNION ALL SELECT city, '2024-02', feb FROM wide;",
   "hints": [
    "Кең кесте: <code>SUM(CASE WHEN o.order_date LIKE '2024-01%' THEN o.amount ELSE 0 END) AS jan</code>.",
    "Ұзын кесте: <code>SELECT city, '2024-01' AS month, jan AS amount FROM wide UNION ALL SELECT city, '2024-02', feb FROM wide</code>."
   ],
   "check": {
    "mustInclude": [
     "UNION ALL"
    ]
   }
  }
 ],
 "pbi-4": [
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "easy",
   "xp": 10,
   "title": "Revenue өлшемі",
   "prompt": "<code>Revenue = SUM(orders[amount])</code> өлшемінің SQL баламасын таза тапсырыстар бойынша шығарыңыз: бір сан. Таза тапсырыс: <code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші.",
   "starter": "SELECT \nFROM orders\nWHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000;",
   "solution": "SELECT SUM(amount) FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000;",
   "hints": [
    "<code>SUM(amount)</code> және таза деректің үш шарты."
   ]
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "easy",
   "xp": 10,
   "title": "Клиенттер саны",
   "prompt": "<code>COUNTROWS(customers)</code> өлшемінің SQL баламасын шығарыңыз: <code>customers</code> кестесіндегі жолдар саны.",
   "starter": "SELECT \nFROM customers;",
   "solution": "SELECT COUNT(*) FROM customers;",
   "hints": [
    "<code>COUNTROWS</code> ≈ <code>COUNT(*)</code>."
   ]
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "easy",
   "xp": 10,
   "title": "Size есептелген бағаны",
   "prompt": "Есептелген бағанды SQL-де жасаңыз: <code>Size = IF(orders[amount] &gt;= 2500, \"Үлкен\", \"Кіші\")</code>. 29-клиенттің таза тапсырыстары үшін <code>id</code>, <code>amount</code> және <code>size</code> шығарыңыз. Таза тапсырыс: <code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші.",
   "starter": "SELECT id, amount,\n  \nFROM orders\nWHERE customer_id = 29 AND status = 'paid' AND amount IS NOT NULL AND amount < 20000;",
   "solution": "SELECT id, amount, CASE WHEN amount >= 2500 THEN 'Үлкен' ELSE 'Кіші' END AS size FROM orders WHERE customer_id = 29 AND status = 'paid' AND amount IS NOT NULL AND amount < 20000;",
   "hints": [
    "DAX-тағы <code>IF</code> ≈ SQL-дегі <code>CASE WHEN ... THEN ... ELSE ... END</code>."
   ],
   "check": {
    "mustInclude": [
     "CASE"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "Қала бойынша өлшемдер",
   "prompt": "Матрица визуалындағыдай әр қала бойынша екі өлшемді шығарыңыз: <code>city</code>, <code>revenue</code> (сома) және <code>orders</code> (тапсырыс саны). Таза тапсырыс: <code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші.",
   "starter": "SELECT c.city,\n  \nFROM orders o\nJOIN customers c ON c.id = o.customer_id\nWHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000\nGROUP BY c.city;",
   "solution": "SELECT c.city, SUM(o.amount) AS revenue, COUNT(*) AS orders FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000 GROUP BY c.city;",
   "hints": [
    "Визуалдағы қала — <code>GROUP BY c.city</code>."
   ],
   "check": {
    "mustInclude": [
     "GROUP BY"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "Арна бойынша бірегей клиенттер",
   "prompt": "<code>DISTINCTCOUNT(orders[customer_id])</code> өлшемін әр арна (<code>customers.channel</code>) бойынша шығарыңыз: <code>channel</code>, <code>customers</code>. Таза тапсырыс: <code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші.",
   "starter": "SELECT c.channel,\n  \nFROM orders o\nJOIN customers c ON c.id = o.customer_id\nWHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000\nGROUP BY c.channel;",
   "solution": "SELECT c.channel, COUNT(DISTINCT o.customer_id) AS customers FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000 GROUP BY c.channel;",
   "hints": [
    "<code>DISTINCTCOUNT</code> ≈ <code>COUNT(DISTINCT ...)</code>."
   ],
   "check": {
    "mustInclude": [
     "DISTINCT"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "Size бойынша қорытынды",
   "prompt": "Есептелген баған бойынша топтаңыз: таза тапсырыстарды <code>size</code> бағанына бөліңіз (<code>amount &gt;= 2500</code> — <code>Үлкен</code>, әйтпесе <code>Кіші</code>) және әр топ үшін <code>size</code>, тапсырыс саны және сома шығарыңыз. Таза тапсырыс: <code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші.",
   "starter": "SELECT\n  \nFROM orders\nWHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000;",
   "solution": "SELECT CASE WHEN amount >= 2500 THEN 'Үлкен' ELSE 'Кіші' END AS size, COUNT(*), SUM(amount) FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000 GROUP BY size;",
   "hints": [
    "CASE бағанына <code>size</code> деп ат беріп, <code>GROUP BY size</code>."
   ],
   "check": {
    "mustInclude": [
     "CASE",
     "GROUP BY"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "hard",
   "xp": 20,
   "title": "Қала бойынша AOV",
   "prompt": "<code>AOV = DIVIDE([Revenue], [Orders])</code> өлшемін әр қала бойынша шығарыңыз: <code>city</code> және бүтінге дөңгелектенген <code>aov</code>. AOV-тың кемуі бойынша сұрыптаңыз. Таза тапсырыс: <code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші.",
   "starter": "SELECT c.city,\n  \nFROM orders o\nJOIN ",
   "solution": "SELECT c.city, ROUND(SUM(o.amount) * 1.0 / COUNT(*)) AS aov FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000 GROUP BY c.city ORDER BY aov DESC;",
   "hints": [
    "<code>ROUND(SUM(o.amount) * 1.0 / COUNT(*))</code>",
    "Соңында <code>ORDER BY aov DESC</code>."
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "hard",
   "xp": 20,
   "title": "Клиентке шаққандағы тапсырыс",
   "prompt": "Жаңа өлшем: <code>Orders per Customer = DIVIDE([Orders], [Customers])</code>. Әр арна үшін <code>channel</code> және осы өлшемді (екі ондық таңбаға дейін) шығарыңыз. Таза тапсырыс: <code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші.",
   "starter": "SELECT c.channel,\n  \nFROM orders o\nJOIN ",
   "solution": "SELECT c.channel, ROUND(COUNT(*) * 1.0 / COUNT(DISTINCT o.customer_id), 2) AS orders_per_customer FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000 GROUP BY c.channel;",
   "hints": [
    "<code>[Orders]</code> = <code>COUNT(*)</code>, <code>[Customers]</code> = <code>COUNT(DISTINCT o.customer_id)</code>.",
    "Бүтін бөлуден сақтану: <code>* 1.0</code>."
   ],
   "check": {
    "mustInclude": [
     "DISTINCT"
    ]
   }
  }
 ],
 "pbi-5": [
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "easy",
   "xp": 10,
   "title": "Instagram табысы",
   "prompt": "<code>CALCULATE([Revenue], customers[channel] = \"instagram\")</code> өлшемінің SQL баламасын шығарыңыз: instagram арнасының таза тапсырыстар сомасы, бір сан. Таза тапсырыс: <code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші.",
   "starter": "SELECT SUM(o.amount)\nFROM orders o\nJOIN customers c ON c.id = o.customer_id\nWHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000;",
   "solution": "SELECT SUM(o.amount) FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000 AND c.channel = 'instagram';",
   "hints": [
    "CALCULATE-тің сүзгісі ≈ WHERE-ге қосылған шарт."
   ],
   "check": {
    "mustInclude": [
     "JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "easy",
   "xp": 10,
   "title": "Алматы табысы",
   "prompt": "<code>CALCULATE([Revenue], customers[city] = \"Алматы\")</code> өлшемінің SQL баламасын шығарыңыз: Алматы клиенттерінің таза тапсырыстар сомасы. Таза тапсырыс: <code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші.",
   "starter": "SELECT SUM(o.amount)\nFROM orders o\nJOIN customers c ON c.id = o.customer_id\nWHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000;",
   "solution": "SELECT SUM(o.amount) FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000 AND c.city = 'Алматы';",
   "hints": [
    "<code>AND c.city = 'Алматы'</code>"
   ],
   "check": {
    "mustInclude": [
     "JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "easy",
   "xp": 10,
   "title": "Қаңтар табысы",
   "prompt": "Уақыт бойынша сүзгісі бар өлшем: 2024 жылғы қаңтардағы таза тапсырыстар сомасын шығарыңыз. Күнге функция қолданбай, аралықпен жазыңыз. Таза тапсырыс: <code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші.",
   "starter": "SELECT SUM(amount)\nFROM orders\nWHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000;",
   "solution": "SELECT SUM(amount) FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000 AND order_date >= '2024-01-01' AND order_date < '2024-02-01';",
   "hints": [
    "<code>order_date &gt;= '2024-01-01' AND order_date &lt; '2024-02-01'</code>"
   ],
   "check": {
    "mustInclude": [
     ">="
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "Қала үлесі",
   "prompt": "<code>Share % = DIVIDE([Revenue], CALCULATE([Revenue], ALL(customers[city])))</code> өлшемін SQL-де қайталаңыз: <code>city</code>, <code>revenue</code> және <code>share_pct</code> (жалпы табыстағы үлес, %, бір ондық таңба). Табыстың кемуі бойынша. Таза тапсырыс: <code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші.",
   "starter": "SELECT c.city, SUM(o.amount) AS revenue,\n  \nFROM orders o\nJOIN ",
   "solution": "SELECT c.city, SUM(o.amount) AS revenue, ROUND(SUM(o.amount) * 100.0 / SUM(SUM(o.amount)) OVER (), 1) AS share_pct FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000 GROUP BY c.city ORDER BY revenue DESC;",
   "hints": [
    "<code>ALL</code> сүзгіні алып тастайды ≈ <code>SUM(SUM(o.amount)) OVER ()</code>."
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
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "Instagram мен жалпы қатар",
   "prompt": "Матрицада әр қала үшін екі өлшем тұр: <code>[Instagram Revenue]</code> және <code>[Revenue]</code>. Сол кестені шығарыңыз: <code>city</code>, <code>insta_rev</code> (instagram арнасының сомасы, болмаса 0), <code>revenue</code>. Таза тапсырыс: <code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші.",
   "starter": "SELECT c.city,\n  \nFROM orders o\nJOIN ",
   "solution": "SELECT c.city, SUM(CASE WHEN c.channel = 'instagram' THEN o.amount ELSE 0 END) AS insta_rev, SUM(o.amount) AS revenue FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000 GROUP BY c.city;",
   "hints": [
    "Бір жолда екі түрлі сүзгі: <code>SUM(CASE WHEN c.channel = 'instagram' THEN o.amount ELSE 0 END)</code>."
   ],
   "check": {
    "mustInclude": [
     "CASE"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "Әр жолда жалпы табыс",
   "prompt": "<code>Total Revenue = CALCULATE([Revenue], ALL(customers[channel]))</code> өлшемін көрсетіңіз: әр арна үшін <code>channel</code>, <code>revenue</code> және барлық арналардың жалпы табысы <code>total_revenue</code> (әр жолда бірдей). Таза тапсырыс: <code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші.",
   "starter": "SELECT c.channel, SUM(o.amount) AS revenue,\n  \nFROM orders o\nJOIN ",
   "solution": "SELECT c.channel, SUM(o.amount) AS revenue, SUM(SUM(o.amount)) OVER () AS total_revenue FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000 GROUP BY c.channel;",
   "hints": [
    "<code>SUM(SUM(o.amount)) OVER ()</code> — топтардың бәрінің қосындысы."
   ],
   "check": {
    "mustInclude": [
     "OVER"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "hard",
   "xp": 20,
   "title": "Қала ішіндегі арна үлесі",
   "prompt": "Сүзгінің бір бөлігін ғана алып тастаймыз: <code>DIVIDE([Revenue], CALCULATE([Revenue], ALL(customers[channel])))</code> — қала сүзгісі сақталады. Әр қала мен арна үшін <code>city</code>, <code>channel</code>, <code>revenue</code> және қала табысындағы үлес <code>share_pct</code> (%, бір ондық таңба) шығарыңыз. Реті: қала, сосын арна. Таза тапсырыс: <code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші.",
   "starter": "SELECT c.city, c.channel, SUM(o.amount) AS revenue,\n  \nFROM orders o\nJOIN ",
   "solution": "SELECT c.city, c.channel, SUM(o.amount) AS revenue, ROUND(SUM(o.amount) * 100.0 / SUM(SUM(o.amount)) OVER (PARTITION BY c.city), 1) AS share_pct FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000 GROUP BY c.city, c.channel ORDER BY c.city, c.channel;",
   "hints": [
    "Қала сүзгісі қалсын: <code>OVER (PARTITION BY c.city)</code>.",
    "<code>GROUP BY c.city, c.channel</code>"
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
   "dataset": "cafe",
   "level": "hard",
   "xp": 20,
   "title": "Instagram үлесі қалада",
   "prompt": "Әр қалада табыстың қанша пайызы instagram арнасынан келеді? <code>city</code> және <code>insta_share</code> (%, бір ондық таңба) шығарыңыз, үлестің кемуі бойынша. Таза тапсырыс: <code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші.",
   "starter": "SELECT c.city,\n  \nFROM orders o\nJOIN ",
   "solution": "SELECT c.city, ROUND(SUM(CASE WHEN c.channel = 'instagram' THEN o.amount ELSE 0 END) * 100.0 / SUM(o.amount), 1) AS insta_share FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000 GROUP BY c.city ORDER BY insta_share DESC;",
   "hints": [
    "Алым — instagram сомасы (CASE), бөлім — қаланың барлық сомасы.",
    "Соңында <code>ORDER BY insta_share DESC</code>."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "CASE"
    ]
   }
  }
 ],
 "pbi-6": [
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "easy",
   "xp": 10,
   "title": "Айлық табыс",
   "prompt": "Таза тапсырыстар бойынша әр айдың табысын шығарыңыз: <code>month</code> (<code>substr(order_date, 1, 7)</code>) және <code>revenue</code>. Ай ретімен. Таза тапсырыс: <code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші.",
   "starter": "SELECT substr(order_date, 1, 7) AS month,\n  \nFROM orders\nWHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000;",
   "solution": "SELECT substr(order_date, 1, 7) AS month, SUM(amount) AS revenue FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000 GROUP BY month ORDER BY month;",
   "hints": [
    "<code>substr(order_date, 1, 7)</code> күннен «2024-03» түріндегі айды алады."
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "easy",
   "xp": 10,
   "title": "Айлық тапсырыс саны",
   "prompt": "Таза тапсырыстар бойынша әр айдағы тапсырыс санын шығарыңыз: <code>month</code> және <code>orders</code>. Ай ретімен. Таза тапсырыс: <code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші.",
   "starter": "SELECT substr(order_date, 1, 7) AS month,\n  \nFROM orders\nWHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000;",
   "solution": "SELECT substr(order_date, 1, 7) AS month, COUNT(*) AS orders FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000 GROUP BY month ORDER BY month;",
   "hints": [
    "<code>COUNT(*)</code> және <code>GROUP BY month ORDER BY month</code>."
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "easy",
   "xp": 10,
   "title": "Бірінші тоқсан табысы",
   "prompt": "2024 жылғы бірінші тоқсанның (қаңтар–наурыз) таза табысын бір санмен шығарыңыз. Күн аралығымен сүзіңіз. Таза тапсырыс: <code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші.",
   "starter": "SELECT SUM(amount)\nFROM orders\nWHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000;",
   "solution": "SELECT SUM(amount) FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000 AND order_date >= '2024-01-01' AND order_date < '2024-04-01';",
   "hints": [
    "<code>order_date &gt;= '2024-01-01' AND order_date &lt; '2024-04-01'</code>"
   ],
   "check": {
    "mustInclude": [
     ">="
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "MoM айырмасы",
   "prompt": "Айлық табысқа өткен аймен айырманы қосыңыз: <code>month</code>, <code>revenue</code>, <code>diff</code> (<code>revenue − Revenue PM</code>). Ай ретімен. Starter-дегі CTE дайын.",
   "starter": "WITH m AS (\n  SELECT substr(order_date, 1, 7) AS month, SUM(amount) AS revenue\n  FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n  GROUP BY month\n)\nSELECT month, revenue\nFROM m\nORDER BY month;",
   "solution": "WITH m AS (SELECT substr(order_date, 1, 7) AS month, SUM(amount) AS revenue FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000 GROUP BY month) SELECT month, revenue, revenue - LAG(revenue) OVER (ORDER BY month) AS diff FROM m ORDER BY month;",
   "hints": [
    "<code>Revenue PM</code> ≈ <code>LAG(revenue) OVER (ORDER BY month)</code>."
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
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "MoM пайызы",
   "prompt": "<code>MoM % = DIVIDE([Revenue] - [Revenue PM], [Revenue PM])</code> өлшемін пайызбен шығарыңыз: <code>month</code>, <code>mom_pct</code> (бір ондық таңба). Бірінші айда бос болады. Ай ретімен.",
   "starter": "WITH m AS (\n  SELECT substr(order_date, 1, 7) AS month, SUM(amount) AS revenue\n  FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n  GROUP BY month\n)\nSELECT month, revenue\nFROM m\nORDER BY month;",
   "solution": "WITH m AS (SELECT substr(order_date, 1, 7) AS month, SUM(amount) AS revenue FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000 GROUP BY month) SELECT month, ROUND((revenue - LAG(revenue) OVER (ORDER BY month)) * 100.0 / LAG(revenue) OVER (ORDER BY month), 1) AS mom_pct FROM m ORDER BY month;",
   "hints": [
    "Бөлгіш әрқашан өткен ай: <code>LAG(revenue) OVER (ORDER BY month)</code>.",
    "<code>* 100.0</code> бүтін бөлуден сақтайды."
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
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "Жинақты тапсырыс саны",
   "prompt": "Таза тапсырыстардың айлық санын CTE-де есептеп (<code>month</code>, <code>orders</code>), жыл басынан жинақты санды <code>ytd_orders</code> қосыңыз. Ай ретімен. Таза тапсырыс: <code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші.",
   "starter": "WITH m AS (\n  \n)\nSELECT ",
   "solution": "WITH m AS (SELECT substr(order_date, 1, 7) AS month, COUNT(*) AS orders FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000 GROUP BY month) SELECT month, orders, SUM(orders) OVER (ORDER BY month) AS ytd_orders FROM m ORDER BY month;",
   "hints": [
    "<code>TOTALYTD</code> ≈ <code>SUM(...) OVER (ORDER BY month)</code>."
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
   "dataset": "cafe",
   "level": "hard",
   "xp": 20,
   "title": "Қала бойынша YTD",
   "prompt": "Әр қала үшін айлық таза табысты CTE-де есептеп (<code>city</code>, <code>month</code>, <code>revenue</code>), әр қаланың өз жинақты табысын <code>ytd</code> қосыңыз. Реті: қала, сосын ай. Таза тапсырыс: <code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші.",
   "starter": "WITH m AS (\n  \n)\nSELECT ",
   "solution": "WITH m AS (SELECT c.city, substr(o.order_date, 1, 7) AS month, SUM(o.amount) AS revenue FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000 GROUP BY c.city, month) SELECT city, month, revenue, SUM(revenue) OVER (PARTITION BY city ORDER BY month) AS ytd FROM m ORDER BY city, month;",
   "hints": [
    "CTE ішінде <code>GROUP BY c.city, month</code>.",
    "Әр қала нөлден басталсын: <code>OVER (PARTITION BY city ORDER BY month)</code>."
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
   "dataset": "cafe",
   "level": "hard",
   "xp": 20,
   "title": "Ең жақсы өсім айы",
   "prompt": "Табысы өткен аймен салыстырғанда ең көп пайызға өскен айды табыңыз: <code>month</code>, <code>revenue</code>, <code>mom_pct</code> (бір ондық таңба). Бір жол. Таза тапсырыс: <code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші.",
   "starter": "WITH m AS (\n  SELECT substr(order_date, 1, 7) AS month, SUM(amount) AS revenue\n  FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n  GROUP BY month\n)\nSELECT month, revenue\nFROM m\nORDER BY month;",
   "solution": "WITH m AS (SELECT substr(order_date, 1, 7) AS month, SUM(amount) AS revenue FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000 GROUP BY month) SELECT month, revenue, mom_pct FROM (SELECT month, revenue, ROUND((revenue - LAG(revenue) OVER (ORDER BY month)) * 100.0 / LAG(revenue) OVER (ORDER BY month), 1) AS mom_pct FROM m) WHERE mom_pct IS NOT NULL ORDER BY mom_pct DESC LIMIT 1;",
   "hints": [
    "Алдымен әр айдың <code>mom_pct</code>-ын subquery-де есептеңіз.",
    "Сосын <code>ORDER BY mom_pct DESC LIMIT 1</code>; бірінші айдағы NULL-ды алып тастаңыз."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "LAG"
    ]
   }
  }
 ],
 "pbi-9": [
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "easy",
   "xp": 10,
   "title": "SUM және AVERAGE",
   "prompt": "<code>Revenue = SUM(orders[amount])</code> және <code>Avg Check = AVERAGE(orders[amount])</code> өлшемдерін SQL-де қайталаңыз. Таза тапсырыстар (<code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші) бойынша бір жол: <code>revenue</code>, <code>avg_check</code> (бүтінге дейін <code>ROUND</code>).",
   "starter": "SELECT \nFROM orders o\nWHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000;",
   "solution": "SELECT SUM(o.amount) AS revenue, ROUND(AVG(o.amount)) AS avg_check FROM orders o WHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000;",
   "hints": [
    "<code>SUM(o.amount)</code> және <code>ROUND(AVG(o.amount))</code>. Жауап: 334 850 және 2 409."
   ]
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "easy",
   "xp": 10,
   "title": "COUNTROWS(FILTER(...))",
   "prompt": "<code>Big Orders = COUNTROWS(FILTER(orders, orders[amount] &gt;= 3000))</code> өлшемін SQL-де есептеңіз: Таза тапсырыстар (<code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші) бойынша сомасы 3 000 және одан көп тапсырыстар саны. Баған: <code>big_orders</code>.",
   "starter": "",
   "solution": "SELECT COUNT(*) AS big_orders FROM orders o WHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000 AND o.amount >= 3000;",
   "hints": [
    "<code>FILTER</code> → <code>WHERE</code>, <code>COUNTROWS</code> → <code>COUNT(*)</code>.",
    "Тазалау шартына <code>AND o.amount &gt;= 3000</code> қосыңыз."
   ]
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "easy",
   "xp": 10,
   "title": "MAXX пен MINX арна бойынша",
   "prompt": "Матрицада арна (<code>customers[channel]</code>) жолдарында <code>MAXX(orders, orders[amount])</code> және <code>MINX(orders, orders[amount])</code> не көрсетеді? Таза тапсырыстар (<code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші) бойынша: <code>channel</code>, <code>max_amount</code>, <code>min_amount</code>.",
   "starter": "SELECT \nFROM orders o\nJOIN customers c ON c.id = o.customer_id\nWHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000\n",
   "solution": "SELECT c.channel, MAX(o.amount) AS max_amount, MIN(o.amount) AS min_amount FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000 GROUP BY c.channel;",
   "hints": [
    "Арна <code>customers</code>-та, сондықтан <code>JOIN</code> керек (<code>RELATED</code> сияқты).",
    "<code>MAX(o.amount)</code>, <code>MIN(o.amount)</code>, <code>GROUP BY c.channel</code>."
   ],
   "check": {
    "mustInclude": [
     "JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "Net Revenue арна бойынша",
   "prompt": "Сабақтағы <code>Net Revenue</code> өлшемі (referral × 0.90, 2gis × 0.95, қалғаны × 1) арна бойынша матрицада қандай сан көрсетеді? Таза тапсырыстар (<code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші) бойынша: <code>channel</code>, <code>revenue</code>, <code>net_revenue</code> (бүтінге дейін <code>ROUND</code>).",
   "starter": "SELECT \nFROM orders o\nJOIN customers c ON c.id = o.customer_id\nWHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000\n",
   "solution": "SELECT c.channel, SUM(o.amount) AS revenue, ROUND(SUM(o.amount * CASE c.channel WHEN 'referral' THEN 0.90 WHEN '2gis' THEN 0.95 ELSE 1 END)) AS net_revenue FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000 GROUP BY c.channel;",
   "hints": [
    "<code>SWITCH</code> → <code>CASE c.channel WHEN 'referral' THEN 0.90 WHEN '2gis' THEN 0.95 ELSE 1 END</code>",
    "Матрица жолы = <code>GROUP BY c.channel</code>. Үш жолдың <code>net_revenue</code> қосындысы 320 465 болуы керек."
   ],
   "check": {
    "mustInclude": [
     "CASE"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "Ірі клиенттер қала бойынша",
   "prompt": "<pre><code>Big Customers =\nVAR Threshold = 10000\nRETURN COUNTROWS(FILTER(VALUES(orders[customer_id]), [Revenue] &gt;= Threshold))</code></pre>Бұл өлшем қала бойынша матрицада не көрсетеді? Таза тапсырыстар (<code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші) бойынша: <code>city</code>, <code>big_customers</code> (таза табысы 10 000 ₸ және одан көп клиенттер саны).",
   "starter": "WITH per AS (\n  -- әр клиенттің [Revenue]-і\n  \n)\nSELECT ",
   "solution": "WITH per AS (SELECT c.id, c.city, SUM(o.amount) AS spent FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000 GROUP BY c.id, c.city) SELECT city, SUM(CASE WHEN spent >= 10000 THEN 1 ELSE 0 END) AS big_customers FROM per GROUP BY city;",
   "hints": [
    "<code>VALUES(orders[customer_id])</code> + <code>[Revenue]</code> → CTE-де <code>GROUP BY c.id, c.city</code>.",
    "<code>COUNTROWS(FILTER(...))</code> → <code>SUM(CASE WHEN spent &gt;= 10000 THEN 1 ELSE 0 END)</code>, <code>GROUP BY city</code>."
   ],
   "check": {
    "mustInclude": [
     "WITH"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "Share of All %",
   "prompt": "<code>Share of All % = DIVIDE([Revenue], CALCULATE([Revenue], ALL(customers[city])))</code> өлшемін slicer жоқ кездегі қала матрицасы үшін есептеңіз. Таза тапсырыстар (<code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші) бойынша: <code>city</code>, <code>revenue</code>, <code>share_pct</code> (%, 1 таңба).",
   "starter": "SELECT \nFROM orders o\nJOIN customers c ON c.id = o.customer_id\nWHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000\n",
   "solution": "SELECT c.city, SUM(o.amount) AS revenue, ROUND(100.0 * SUM(o.amount) / SUM(SUM(o.amount)) OVER (), 1) AS share_pct FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000 GROUP BY c.city;",
   "hints": [
    "<code>ALL</code>-дың бөлгіші — барлық қаланың табысы: <code>SUM(SUM(o.amount)) OVER ()</code> немесе subquery.",
    "<code>ROUND(100.0 * SUM(o.amount) / SUM(SUM(o.amount)) OVER (), 1)</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "hard",
   "xp": 20,
   "title": "ALLSELECTED: slicer-де екі қала",
   "prompt": "Slicer-де Астана мен Шымкент таңдалған. <code>Share of Selected % = DIVIDE([Revenue], CALCULATE([Revenue], ALLSELECTED(customers[city])))</code> матрицада не көрсетеді? Таза тапсырыстар (<code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші) бойынша, тек таңдалған қалалар: <code>city</code>, <code>revenue</code>, <code>share_selected</code> (%, 1 таңба).",
   "starter": "",
   "solution": "SELECT c.city, SUM(o.amount) AS revenue, ROUND(100.0 * SUM(o.amount) / SUM(SUM(o.amount)) OVER (), 1) AS share_selected FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000 AND c.city IN ('Астана', 'Шымкент') GROUP BY c.city;",
   "hints": [
    "Slicer — бұл <code>WHERE c.city IN ('Астана', 'Шымкент')</code>: ол бөлгішке де әсер етеді.",
    "Сүзгіден кейін <code>SUM(SUM(o.amount)) OVER ()</code> тек көрініп тұрған екі қаланы қосады. Пайыздардың қосындысы 100 болуы керек."
   ]
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "hard",
   "xp": 20,
   "title": "Айлық орташа: AVERAGEX(VALUES(month))",
   "prompt": "<pre><code>Avg Monthly Revenue =\nAVERAGEX(VALUES('Date'[Month]), [Revenue])</code></pre>Бұл өлшем қала бойынша матрицада не көрсетеді? Таза тапсырыстар (<code>status = 'paid'</code>, <code>amount</code> бос емес және 20 000-нан кіші) бойынша: <code>city</code>, <code>months</code> (сатылымы бар айлар саны), <code>avg_monthly</code> (айлық табыстардың орташасы, бүтінге дейін <code>ROUND</code>). Ай: <code>substr(order_date, 1, 7)</code>.",
   "starter": "",
   "solution": "WITH m AS (SELECT c.city, substr(o.order_date, 1, 7) AS month, SUM(o.amount) AS revenue FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000 GROUP BY c.city, month) SELECT city, COUNT(*) AS months, ROUND(AVG(revenue)) AS avg_monthly FROM m GROUP BY city;",
   "hints": [
    "1-қадам (<code>VALUES</code> + <code>[Revenue]</code>): әр «қала × ай» табысы, <code>GROUP BY c.city, month</code>.",
    "2-қадам (<code>AVERAGEX</code>): <code>SELECT city, COUNT(*), ROUND(AVG(revenue)) FROM m GROUP BY city</code>."
   ],
   "check": {
    "mustInclude": [
     "AVG"
    ]
   }
  }
 ]
});
