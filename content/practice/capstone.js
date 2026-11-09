// Practice tasks after the lessons of m3-7. Each lesson's list opens one task at a time.
DJ.addPractice('m3-7', {
 "cap-2": [
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "easy",
   "xp": 10,
   "title": "Статустар бойынша санау",
   "prompt": "<p><code>orders</code> кестесінде қандай статустар бар және әрқайсысында неше тапсырыс? <code>status</code>, <code>n</code>.</p>",
   "starter": "",
   "solution": "SELECT status, COUNT(*) AS n FROM orders GROUP BY status;",
   "hints": [
    "<code>GROUP BY status</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "easy",
   "xp": 10,
   "title": "Клиенттер профилі",
   "prompt": "<p><code>customers</code> кестесі бойынша бір жолда: <code>n</code> (клиенттер саны), <code>first_signup</code>, <code>last_signup</code> (тіркелудің ең ерте және ең кеш күні).</p>",
   "starter": "",
   "solution": "SELECT COUNT(*) AS n, MIN(signup_date) AS first_signup, MAX(signup_date) AS last_signup FROM customers;",
   "hints": [
    "<code>MIN(signup_date)</code>, <code>MAX(signup_date)</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "easy",
   "xp": 10,
   "title": "Сомасы бос тапсырыстар",
   "prompt": "<p>Сомасы бос (<code>NULL</code>) тапсырыстарды шығарыңыз: <code>id</code>, <code>customer_id</code>, <code>order_date</code>. <code>id</code> ретімен.</p>",
   "starter": "",
   "solution": "SELECT id, customer_id, order_date FROM orders WHERE amount IS NULL ORDER BY id;",
   "hints": [
    "<code>WHERE amount IS NULL ORDER BY id</code>"
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "Ең кіші тапсырыстар",
   "prompt": "<p>Сомасы ең кіші 3 тапсырыс (бос сомаларсыз): <code>id</code>, <code>customer_id</code>, <code>amount</code>. Сома бойынша өсу ретімен, тең болса <code>id</code> бойынша. Бұлар да шеткі мән болуы мүмкін бе?</p>",
   "starter": "",
   "solution": "SELECT id, customer_id, amount FROM orders WHERE amount IS NOT NULL ORDER BY amount, id LIMIT 3;",
   "hints": [
    "<code>ORDER BY amount, id LIMIT 3</code>"
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "Қала мен арна комбинациялары",
   "prompt": "<p>Категориялық бағандарды тексеру: <code>customers</code> кестесінде қала мен арнаның әр комбинациясында неше клиент бар? <code>city</code>, <code>channel</code>, <code>n</code>. Қала, сосын арна ретімен.</p>",
   "starter": "",
   "solution": "SELECT city, channel, COUNT(*) AS n FROM customers GROUP BY city, channel ORDER BY city, channel;",
   "hints": [
    "<code>GROUP BY city, channel</code>"
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "Дубликаттарды тексеру",
   "prompt": "<p>Бір жолда шығарыңыз: <code>n</code> (тапсырыстар саны), <code>uniq_ids</code> (бірегей <code>id</code>), <code>uniq_customers</code> (тапсырыс берген бірегей клиенттер). <code>n</code> мен <code>uniq_ids</code> тең бе?</p>",
   "starter": "",
   "solution": "SELECT COUNT(*) AS n, COUNT(DISTINCT id) AS uniq_ids, COUNT(DISTINCT customer_id) AS uniq_customers FROM orders;",
   "hints": [
    "<code>COUNT(DISTINCT id)</code>, <code>COUNT(DISTINCT customer_id)</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "hard",
   "xp": 20,
   "title": "Ай бойынша профиль",
   "prompt": "<p>Әр айдың «денсаулығы»: <code>month</code> (<code>order_date</code>-тың YYYY-MM бөлігі), <code>n</code>, <code>null_amount</code>, <code>refunds</code>. Ай ретімен. Бос сомалар қай айларда шоғырланған?</p>",
   "starter": "",
   "solution": "SELECT substr(order_date, 1, 7) AS month, COUNT(*) AS n, SUM(amount IS NULL) AS null_amount, SUM(status = 'refund') AS refunds FROM orders GROUP BY month ORDER BY month;",
   "hints": [
    "<code>SUM(amount IS NULL)</code>, <code>SUM(status = 'refund')</code>, <code>GROUP BY month</code>."
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
   "title": "Орташадан тым алыс",
   "prompt": "<p>Сомасы барлық тапсырыстардың орташа сомасынан 3 еседен көп тапсырыстарды табыңыз: <code>id</code>, <code>customer_id</code>, <code>order_date</code>, <code>amount</code>. Орташаны ішкі сұраумен есептеңіз.</p>",
   "starter": "",
   "solution": "SELECT id, customer_id, order_date, amount FROM orders WHERE amount > 3 * (SELECT AVG(amount) FROM orders);",
   "hints": [
    "<code>WHERE amount &gt; 3 * (SELECT AVG(amount) FROM orders)</code>"
   ]
  }
 ],
 "cap-3": [
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "easy",
   "xp": 10,
   "title": "Төленген тапсырыстар саны",
   "prompt": "<p><code>status = 'paid'</code> тапсырыстардың санын <code>paid</code> бір мәнмен шығарыңыз.</p>",
   "starter": "",
   "solution": "SELECT COUNT(*) AS paid FROM orders WHERE status = 'paid';",
   "hints": [
    "<code>WHERE status = 'paid'</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "easy",
   "xp": 10,
   "title": "Қайтарымдар",
   "prompt": "<p>Қайтарылған (<code>refund</code>) тапсырыстар: бір жолда <code>refunds</code> (саны) және <code>refund_sum</code> (сомасы).</p>",
   "starter": "",
   "solution": "SELECT COUNT(*) AS refunds, SUM(amount) AS refund_sum FROM orders WHERE status = 'refund';",
   "hints": [
    "<code>WHERE status = 'refund'</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "easy",
   "xp": 10,
   "title": "Корпоративтік тапсырыстар",
   "prompt": "<p>Талдаудан бөлек қаралатын ірі тапсырыстар (<code>amount &gt;= 20000</code>): <code>id</code>, <code>customer_id</code>, <code>order_date</code>, <code>amount</code>.</p>",
   "starter": "",
   "solution": "SELECT id, customer_id, order_date, amount FROM orders WHERE amount >= 20000;",
   "hints": [
    "<code>WHERE amount &gt;= 20000</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "Алынған жолдар есебі",
   "prompt": "<p>Memo үшін: бір жолда <code>total</code> (барлық тапсырыс), <code>clean_orders</code> (таза тапсырыстар) және <code>removed</code> (алынғандар) шығарыңыз. <code>clean</code> CTE-ін (cap-3 ережелері) қолданыңыз.</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000) SELECT (SELECT COUNT(*) FROM orders) AS total, (SELECT COUNT(*) FROM clean) AS clean_orders, (SELECT COUNT(*) FROM orders) - (SELECT COUNT(*) FROM clean) AS removed;",
   "hints": [
    "Әр мәнді ішкі сұраумен есептеңіз: <code>(SELECT COUNT(*) FROM clean)</code>."
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
   "title": "Себеп бойынша алынғандар",
   "prompt": "<p>Таза деректе жоқ тапсырыстарды себебі бойынша санаңыз: <code>reason</code>, <code>n</code>. Себеп CASE арқылы, осы ретпен тексеріледі: <code>status = 'refund'</code> → <code>refund</code>; сома бос → <code>сома жоқ</code>; сома ≥ 20000 → <code>корпоративтік</code>.</p>",
   "starter": "",
   "solution": "SELECT CASE WHEN status = 'refund' THEN 'refund' WHEN amount IS NULL THEN 'сома жоқ' WHEN amount >= 20000 THEN 'корпоративтік' END AS reason, COUNT(*) AS n FROM orders WHERE NOT (status = 'paid' AND amount IS NOT NULL AND amount < 20000) GROUP BY reason;",
   "hints": [
    "Таза емес жолдар: <code>WHERE NOT (status = 'paid' AND amount IS NOT NULL AND amount &lt; 20000)</code>.",
    "CASE өрнегіне <code>AS reason</code> беріп, <code>GROUP BY reason</code>."
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
   "title": "Тазалауға дейін және кейін",
   "prompt": "<p>Орташа чекке корпоративтік тапсырыс қалай әсер етеді? Бір жолда: <code>raw_avg</code> (барлық <code>paid</code> және сомасы бар тапсырыстардың орташасы) және <code>clean_avg</code> (таза тапсырыстардың орташасы), екеуі де бүтінге дейін <code>ROUND</code>.</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000) SELECT (SELECT ROUND(AVG(amount)) FROM orders WHERE status = 'paid' AND amount IS NOT NULL) AS raw_avg, (SELECT ROUND(AVG(amount)) FROM clean) AS clean_avg;",
   "hints": [
    "Екі ішкі сұрау: біреуі <code>orders</code>-тан, біреуі <code>clean</code>-нан."
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
   "level": "hard",
   "xp": 20,
   "title": "Тазалаудың табысқа әсері",
   "prompt": "<p>Бір жолда: <code>revenue_paid</code> (барлық <code>paid</code> тапсырыстардың сомасы), <code>revenue_clean</code> (таза тапсырыстардың сомасы) және <code>diff_pct</code> — тазалау табысты неше пайызға азайтты (бір ондық белгі).</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000), r AS (SELECT (SELECT SUM(amount) FROM orders WHERE status = 'paid') AS revenue_paid, (SELECT SUM(amount) FROM clean) AS revenue_clean) SELECT revenue_paid, revenue_clean, ROUND((revenue_paid - revenue_clean) * 100.0 / revenue_paid, 1) AS diff_pct FROM r;",
   "hints": [
    "Екінші CTE-де екі соманы есептеп, сыртында пайызын табыңыз.",
    "<code>SUM</code> бос мәндерді өзі өткізіп жібереді."
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
   "level": "hard",
   "xp": 20,
   "title": "Тазалау әсер еткен клиенттер",
   "prompt": "<p>Тазалау кезінде кемінде бір тапсырысы алынған клиенттер: <code>customer_id</code>, <code>all_orders</code> (барлық тапсырыстары), <code>clean_orders</code> (таза тапсырыстары). <code>customer_id</code> ретімен.</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000) SELECT o.customer_id, COUNT(*) AS all_orders, COUNT(c.id) AS clean_orders FROM orders o LEFT JOIN clean c ON c.id = o.id GROUP BY o.customer_id HAVING COUNT(*) > COUNT(c.id) ORDER BY o.customer_id;",
   "hints": [
    "<code>orders o LEFT JOIN clean c ON c.id = o.id</code>: таза емес жолда <code>c.id</code> бос.",
    "<code>COUNT(c.id)</code> тек таза жолдарды санайды; <code>HAVING COUNT(*) &gt; COUNT(c.id)</code>."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "WITH"
    ]
   }
  }
 ],
 "cap-4": [
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "easy",
   "xp": 10,
   "title": "Айлық тапсырыстар",
   "prompt": "<p>Таза тапсырыстар бойынша әр айдағы тапсырыс саны: <code>month</code>, <code>orders</code>. Ай ретімен.</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000) SELECT substr(order_date, 1, 7) AS month, COUNT(*) AS orders FROM clean GROUP BY month ORDER BY month;",
   "hints": [
    "<code>clean</code> CTE-ін (cap-3 ережелері) қолданыңыз.",
    "<code>substr(order_date, 1, 7)</code>"
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
   "title": "Айлық табыс",
   "prompt": "<p>Таза тапсырыстар бойынша әр айдың табысы: <code>month</code>, <code>revenue</code>. Ай ретімен.</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000) SELECT substr(order_date, 1, 7) AS month, SUM(amount) AS revenue FROM clean GROUP BY month ORDER BY month;",
   "hints": [
    "<code>clean</code> CTE-ін (cap-3 ережелері) қолданыңыз."
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
   "title": "Айлық белсенді клиенттер",
   "prompt": "<p>Әр айда кемінде бір таза тапсырыс берген бірегей клиенттер: <code>month</code>, <code>customers</code>. Ай ретімен.</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000) SELECT substr(order_date, 1, 7) AS month, COUNT(DISTINCT customer_id) AS customers FROM clean GROUP BY month ORDER BY month;",
   "hints": [
    "<code>COUNT(DISTINCT customer_id)</code>"
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "Бір клиентке тапсырыс",
   "prompt": "<p>Клиенттер қаншалықты жиі келеді? Әр ай үшін <code>month</code> және <code>orders_per_customer</code> (тапсырыстар / бірегей клиенттер, екі ондық белгі). Ай ретімен.</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000) SELECT substr(order_date, 1, 7) AS month, ROUND(COUNT(*) * 1.0 / COUNT(DISTINCT customer_id), 2) AS orders_per_customer FROM clean GROUP BY month ORDER BY month;",
   "hints": [
    "<code>COUNT(*) * 1.0 / COUNT(DISTINCT customer_id)</code>"
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "Табыстың MoM өсімі",
   "prompt": "<p>Таза табыстың айдан айға өзгерісі: <code>month</code>, <code>revenue</code>, <code>mom_pct</code> (бір ондық белгі). Ай ретімен.</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000), m AS (SELECT substr(order_date, 1, 7) AS month, SUM(amount) AS revenue FROM clean GROUP BY month) SELECT month, revenue, ROUND((revenue - LAG(revenue) OVER (ORDER BY month)) * 100.0 / LAG(revenue) OVER (ORDER BY month), 1) AS mom_pct FROM m ORDER BY month;",
   "hints": [
    "Екінші CTE: айлық табыс.",
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
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "Айдың жаңа клиенттері",
   "prompt": "<p>Әр айда неше клиент <b>алғашқы</b> таза тапсырысын берді? <code>month</code>, <code>new_customers</code>. Ай ретімен.</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000), f AS (SELECT customer_id, MIN(order_date) AS first_order FROM clean GROUP BY customer_id) SELECT substr(first_order, 1, 7) AS month, COUNT(*) AS new_customers FROM f GROUP BY month ORDER BY month;",
   "hints": [
    "Алдымен әр клиенттің алғашқы таза тапсырысы: <code>MIN(order_date)</code>.",
    "Сосын оның айы бойынша топтаңыз."
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
   "title": "Жаңа және қайталама клиенттер",
   "prompt": "<p>Әр айдың белсенді клиенттерін екіге бөліңіз: <code>month</code>, <code>active</code> (бірегей клиенттер), <code>new_customers</code> (сол айда алғашқы таза тапсырысын бергендер), <code>returning_customers</code> (<code>active − new_customers</code>). Ай ретімен.</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000), f AS (SELECT customer_id, substr(MIN(order_date), 1, 7) AS first_month FROM clean GROUP BY customer_id), a AS (SELECT DISTINCT substr(order_date, 1, 7) AS month, customer_id FROM clean) SELECT a.month, COUNT(*) AS active, SUM(f.first_month = a.month) AS new_customers, COUNT(*) - SUM(f.first_month = a.month) AS returning_customers FROM a JOIN f ON f.customer_id = a.customer_id GROUP BY a.month ORDER BY a.month;",
   "hints": [
    "CTE <code>f</code>: әр клиенттің алғашқы айы. CTE <code>a</code>: (ай, клиент) бірегей жұптары.",
    "<code>SUM(f.first_month = a.month)</code> жаңаларды санайды."
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
   "title": "Табысты бөліктерге жіктеу",
   "prompt": "<p>Табыс = клиенттер × бір клиентке тапсырыс × орташа чек. Табыс өзгергенде қай көбейткіш өзгергенін көру үшін әр ай бойынша шығарыңыз: <code>month</code>, <code>customers</code>, <code>cust_mom_pct</code>, <code>aov</code> (бүтінге дейін), <code>aov_mom_pct</code>. Пайыздар — өткен аймен салыстырғандағы өзгеріс, бір ондық белгі. Ай ретімен.</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000), m AS (SELECT substr(order_date, 1, 7) AS month, COUNT(DISTINCT customer_id) AS customers, AVG(amount) AS aov FROM clean GROUP BY month) SELECT month, customers, ROUND((customers - LAG(customers) OVER (ORDER BY month)) * 100.0 / LAG(customers) OVER (ORDER BY month), 1) AS cust_mom_pct, ROUND(aov) AS aov, ROUND((aov - LAG(aov) OVER (ORDER BY month)) * 100.0 / LAG(aov) OVER (ORDER BY month), 1) AS aov_mom_pct FROM m ORDER BY month;",
   "hints": [
    "CTE-де айлық <code>customers</code> және <code>AVG(amount)</code>.",
    "Әр көрсеткішке бөлек <code>LAG(...) OVER (ORDER BY month)</code>."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "LAG"
    ]
   }
  }
 ],
 "cap-5": [
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "easy",
   "xp": 10,
   "title": "Арна бойынша клиенттер",
   "prompt": "<p><code>customers</code> кестесінен әр арнаның клиенттер саны: <code>channel</code>, <code>n</code>. Саны бойынша кему ретімен.</p>",
   "starter": "",
   "solution": "SELECT channel, COUNT(*) AS n FROM customers GROUP BY channel ORDER BY n DESC;",
   "hints": [
    "<code>GROUP BY channel ORDER BY n DESC</code>"
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
   "title": "Қала бойынша клиенттер",
   "prompt": "<p>Әр қалада неше клиент бар: <code>city</code>, <code>n</code>. Саны бойынша кему ретімен. Шағын қаланың көрсеткіштерін сақтықпен оқу керек екенін есте сақтаңыз.</p>",
   "starter": "",
   "solution": "SELECT city, COUNT(*) AS n FROM customers GROUP BY city ORDER BY n DESC;",
   "hints": [
    "<code>GROUP BY city ORDER BY n DESC</code>"
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
   "title": "Арна бойынша табыс",
   "prompt": "<p>Таза тапсырыстар бойынша әр арнаның табысы: <code>channel</code>, <code>revenue</code>. Табыс бойынша кему ретімен.</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000) SELECT c.channel, SUM(o.amount) AS revenue FROM customers c JOIN clean o ON o.customer_id = c.id GROUP BY c.channel ORDER BY revenue DESC;",
   "hints": [
    "<code>clean</code> CTE-ін (cap-3 ережелері) қолданыңыз.",
    "<code>customers c JOIN clean o ON o.customer_id = c.id</code>"
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "Арнаның сатып алу жиілігі",
   "prompt": "<p>Әр арнаның клиенті орта есеппен неше таза тапсырыс береді? <code>channel</code>, <code>orders_per_customer</code> (екі ондық белгі). Кему ретімен.</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000) SELECT c.channel, ROUND(COUNT(o.id) * 1.0 / COUNT(DISTINCT c.id), 2) AS orders_per_customer FROM customers c JOIN clean o ON o.customer_id = c.id GROUP BY c.channel ORDER BY orders_per_customer DESC;",
   "hints": [
    "<code>COUNT(o.id) * 1.0 / COUNT(DISTINCT c.id)</code>"
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "Арнаның орташа чегі",
   "prompt": "<p>Таза тапсырыстар бойынша әр арнаның орташа чегі: <code>channel</code>, <code>aov</code> (бүтінге дейін <code>ROUND</code>). Кему ретімен.</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000) SELECT c.channel, ROUND(AVG(o.amount)) AS aov FROM customers c JOIN clean o ON o.customer_id = c.id GROUP BY c.channel ORDER BY aov DESC;",
   "hints": [
    "<code>ROUND(AVG(o.amount))</code>"
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "Қала мен арна бірге",
   "prompt": "<p>Екі өлшемді сегмент: <code>city</code>, <code>channel</code>, <code>customers</code> (тапсырыс берген бірегей клиенттер), <code>revenue</code>. Табыс бойынша кему ретімен.</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000) SELECT c.city, c.channel, COUNT(DISTINCT c.id) AS customers, SUM(o.amount) AS revenue FROM customers c JOIN clean o ON o.customer_id = c.id GROUP BY c.city, c.channel ORDER BY revenue DESC;",
   "hints": [
    "<code>GROUP BY c.city, c.channel</code>"
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
   "title": "Арнаның табыс үлесі",
   "prompt": "<p>Әр арнаның таза табыстағы үлесі: <code>channel</code>, <code>revenue</code>, <code>share_pct</code> (%, бір ондық белгі). Табыс бойынша кему ретімен.</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000) SELECT c.channel, SUM(o.amount) AS revenue, ROUND(SUM(o.amount) * 100.0 / SUM(SUM(o.amount)) OVER (), 1) AS share_pct FROM customers c JOIN clean o ON o.customer_id = c.id GROUP BY c.channel ORDER BY revenue DESC;",
   "hints": [
    "Жалпы табыс: <code>SUM(SUM(o.amount)) OVER ()</code>."
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
   "title": "Қаладағы ең құнды арна",
   "prompt": "<p>Әр қалада бір клиенттен түсетін табысы (<code>rev_per_customer</code>, бүтінге дейін) ең жоғары арнаны табыңыз: <code>city</code>, <code>channel</code>, <code>rev_per_customer</code>. Қала ретімен.</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000), s AS (SELECT c.city, c.channel, ROUND(SUM(o.amount) * 1.0 / COUNT(DISTINCT c.id)) AS rev_per_customer FROM customers c JOIN clean o ON o.customer_id = c.id GROUP BY c.city, c.channel) SELECT city, channel, rev_per_customer FROM (SELECT *, ROW_NUMBER() OVER (PARTITION BY city ORDER BY rev_per_customer DESC) AS rn FROM s) WHERE rn = 1 ORDER BY city;",
   "hints": [
    "CTE: қала × арна бойынша <code>rev_per_customer</code>.",
    "<code>ROW_NUMBER() OVER (PARTITION BY city ORDER BY rev_per_customer DESC)</code>, сыртында <code>rn = 1</code>."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "OVER"
    ]
   }
  }
 ],
 "cap-6": [
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "easy",
   "xp": 10,
   "title": "Ең жиі келетін клиенттер",
   "prompt": "<p>Таза тапсырыстары ең көп 5 клиент: <code>customer_id</code>, <code>n</code>. Саны бойынша кему ретімен, тең болса <code>customer_id</code> бойынша.</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000) SELECT customer_id, COUNT(*) AS n FROM clean GROUP BY customer_id ORDER BY n DESC, customer_id LIMIT 5;",
   "hints": [
    "<code>ORDER BY n DESC, customer_id LIMIT 5</code>"
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
   "title": "Жалпы repeat rate",
   "prompt": "<p>Таза тапсырыс берген клиенттердің ішінде кемінде 3 таза тапсырысы барлардың үлесі: <code>repeat_rate</code> (%, бір ондық белгі), бір мән.</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000), per AS (SELECT customer_id, COUNT(*) AS n FROM clean GROUP BY customer_id) SELECT ROUND(SUM(n >= 3) * 100.0 / COUNT(*), 1) AS repeat_rate FROM per;",
   "hints": [
    "Екі CTE: <code>clean</code> және <code>per</code>.",
    "<code>SUM(n &gt;= 3) * 100.0 / COUNT(*)</code>"
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
   "level": "easy",
   "xp": 10,
   "title": "Аз келгендер",
   "prompt": "<p>Таза тапсырысы 1 немесе 2 ғана клиенттердің саны: <code>few</code>, бір мән.</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000), per AS (SELECT customer_id, COUNT(*) AS n FROM clean GROUP BY customer_id) SELECT COUNT(*) AS few FROM per WHERE n <= 2;",
   "hints": [
    "<code>per</code> CTE-інен <code>WHERE n &lt;= 2</code>."
   ]
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "Тапсырыс санының таралуы",
   "prompt": "<p>Неше клиенттің 1, 2, 3, ... таза тапсырысы бар? <code>n</code> (тапсырыс саны), <code>customers</code>. <code>n</code> ретімен.</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000), per AS (SELECT customer_id, COUNT(*) AS n FROM clean GROUP BY customer_id) SELECT n, COUNT(*) AS customers FROM per GROUP BY n ORDER BY n;",
   "hints": [
    "<code>per</code> CTE-ін <code>n</code> бойынша топтаңыз."
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "Қала бойынша repeat rate",
   "prompt": "<p>Қала бойынша repeat rate: <code>city</code>, <code>customers</code>, <code>repeat_rate</code> (≥ 3 таза тапсырыс, %, бір ондық белгі). Кему ретімен.</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000), per AS (SELECT customer_id, COUNT(*) AS n FROM clean GROUP BY customer_id) SELECT c.city, COUNT(*) AS customers, ROUND(SUM(p.n >= 3) * 100.0 / COUNT(*), 1) AS repeat_rate FROM per p JOIN customers c ON c.id = p.customer_id GROUP BY c.city ORDER BY repeat_rate DESC;",
   "hints": [
    "Сабақтағы сұрау, бірақ <code>GROUP BY c.city</code>."
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "Шекті өзгертіп көру",
   "prompt": "<p>Шек нәтижеге қалай әсер етеді? Бір жолда үш repeat rate (%, бір ондық белгі): <code>rate2</code> (≥ 2 тапсырыс), <code>rate3</code> (≥ 3), <code>rate4</code> (≥ 4).</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000), per AS (SELECT customer_id, COUNT(*) AS n FROM clean GROUP BY customer_id) SELECT ROUND(SUM(n >= 2) * 100.0 / COUNT(*), 1) AS rate2, ROUND(SUM(n >= 3) * 100.0 / COUNT(*), 1) AS rate3, ROUND(SUM(n >= 4) * 100.0 / COUNT(*), 1) AS rate4 FROM per;",
   "hints": [
    "Бір <code>per</code> CTE-інен үш бағанды есептеңіз."
   ]
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "hard",
   "xp": 20,
   "title": "Когорт бойынша repeat rate",
   "prompt": "<p>Тіркелу айы бойынша: <code>cohort</code> (<code>signup_date</code>-тың YYYY-MM бөлігі), <code>customers</code>, <code>repeat_rate</code> (≥ 3 таза тапсырыс, %, бір ондық белгі). Когорт ретімен. Кеш тіркелгендердің көрсеткіші неге төмен болуы мүмкін?</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000), per AS (SELECT customer_id, COUNT(*) AS n FROM clean GROUP BY customer_id) SELECT substr(c.signup_date, 1, 7) AS cohort, COUNT(*) AS customers, ROUND(SUM(p.n >= 3) * 100.0 / COUNT(*), 1) AS repeat_rate FROM per p JOIN customers c ON c.id = p.customer_id GROUP BY cohort ORDER BY cohort;",
   "hints": [
    "<code>substr(c.signup_date, 1, 7) AS cohort</code>, <code>GROUP BY cohort</code>."
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
   "title": "Қайта келушілер табысы",
   "prompt": "<p>Кемінде 3 таза тапсырысы бар клиенттер таза табыстың қанша пайызын әкеледі? <code>repeat_revenue_pct</code> (бір ондық белгі), бір мән.</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000), per AS (SELECT customer_id, COUNT(*) AS n FROM clean GROUP BY customer_id) SELECT ROUND(SUM(CASE WHEN p.n >= 3 THEN o.amount END) * 100.0 / SUM(o.amount), 1) AS repeat_revenue_pct FROM clean o JOIN per p ON p.customer_id = o.customer_id;",
   "hints": [
    "<code>clean</code> мен <code>per</code>-ді JOIN жасаңыз.",
    "Шартты қосынды: <code>SUM(CASE WHEN p.n &gt;= 3 THEN o.amount END)</code>."
   ],
   "check": {
    "mustInclude": [
     "WITH"
    ]
   }
  }
 ],
 "cap-7": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бір арнаның ROAS-ы",
   "prompt": "<p><code>roas(revenue, spend)</code> функциясы ROAS-ты (табыс / шығын) 2 ондық белгіге дейін <code>round</code> жасап қайтарсын. Мысалы, <code>roas(120000, 40000)</code> → <code>3.0</code>.</p>",
   "starter": "def roas(revenue, spend):\n    pass\n",
   "solution": "def roas(revenue, spend):\n    return round(revenue / spend, 2)\n",
   "hints": [
    "<code>round(revenue / spend, 2)</code>"
   ],
   "check": {
    "tests": "assert roas(120000, 40000) == 3.0, \"roas(120000, 40000) 3.0 болуы керек\"\nassert roas(410000, 300000) == 1.37, \"roas(410000, 300000) 1.37 болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Шығынды ақтамаған арналар",
   "prompt": "<p><code>losing(revenue, spend)</code> функциясы ROAS-ы 1-ден төмен арналардың атауларын әліпби ретімен (<code>sorted</code>) тізіммен қайтарсын.</p>",
   "starter": "def losing(revenue, spend):\n    pass\n",
   "solution": "def losing(revenue, spend):\n    return sorted(ch for ch in spend if revenue[ch] / spend[ch] < 1)\n",
   "hints": [
    "<code>revenue[ch] / spend[ch] &lt; 1</code>"
   ],
   "check": {
    "tests": "_rev = {\"instagram\": 150000, \"2gis\": 138800, \"referral\": 79200}\n_sp = {\"instagram\": 300000, \"2gis\": 150000, \"referral\": 40000}\nassert losing(_rev, _sp) == [\"2gis\", \"instagram\"], f\"['2gis', 'instagram'] күтілді, сізде {losing(_rev, _sp)}\"\nassert losing({\"a\": 10}, {\"a\": 5}) == [], \"Барлық арна тиімді болса, бос тізім\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жалпы ROAS",
   "prompt": "<p><code>total_roas(revenue, spend)</code> функциясы барлық арналардың жалпы ROAS-ын қайтарсын: табыстар қосындысы / шығындар қосындысы, 2 ондық белгіге дейін.</p>",
   "starter": "def total_roas(revenue, spend):\n    pass\n",
   "solution": "def total_roas(revenue, spend):\n    return round(sum(revenue.values()) / sum(spend.values()), 2)\n",
   "hints": [
    "<code>sum(revenue.values())</code>"
   ],
   "check": {
    "tests": "_rev = {\"instagram\": 150000, \"2gis\": 138800, \"referral\": 79200}\n_sp = {\"instagram\": 300000, \"2gis\": 150000, \"referral\": 40000}\nassert total_roas(_rev, _sp) == 0.75, f\"0.75 күтілді, сізде {total_roas(_rev, _sp)}\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Маржамен пайда",
   "prompt": "<p>ROAS пайданы көрсетпейді. <code>profit(revenue, spend, margin)</code> функциясы әр арнаның пайдасын сөздікпен қайтарсын: <code>revenue × margin − spend</code>, бүтінге дейін <code>round</code>. Мысалы, маржа 0.4 болса, 120 000 ₸ табыс пен 40 000 ₸ шығын → <code>8000</code>.</p>",
   "starter": "def profit(revenue, spend, margin):\n    pass\n",
   "solution": "def profit(revenue, spend, margin):\n    return {ch: round(revenue[ch] * margin - spend[ch]) for ch in spend}\n",
   "hints": [
    "Dict comprehension: <code>{ch: ... for ch in spend}</code>."
   ],
   "check": {
    "tests": "_r = profit({\"referral\": 120000, \"2gis\": 400000}, {\"referral\": 40000, \"2gis\": 150000}, 0.4)\nassert _r == {\"referral\": 8000, \"2gis\": 10000}, f\"{{'referral': 8000, '2gis': 10000}} күтілді, сізде {_r}\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бюджет үлестері",
   "prompt": "<p><code>budget_shares(spend)</code> функциясы әр арнаның жалпы бюджеттегі үлесін пайызбен (1 ондық белгі) сөздікпен қайтарсын.</p>",
   "starter": "def budget_shares(spend):\n    pass\n",
   "solution": "def budget_shares(spend):\n    total = sum(spend.values())\n    return {ch: round(v * 100 / total, 1) for ch, v in spend.items()}\n",
   "hints": [
    "Алдымен <code>total = sum(spend.values())</code>."
   ],
   "check": {
    "tests": "_r = budget_shares({\"instagram\": 300000, \"2gis\": 150000, \"referral\": 40000})\nassert _r == {\"instagram\": 61.2, \"2gis\": 30.6, \"referral\": 8.2}, f\"Нәтиже дұрыс емес: {_r}\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Табысы жоқ арна",
   "prompt": "<p>Кейбір арнадан әлі табыс түспеген болуы мүмкін. <code>roas_safe(revenue, spend)</code> функциясы <code>spend</code>-тегі әр арна үшін ROAS сөздігін қайтарсын (2 ондық белгі); <code>revenue</code>-да жоқ арнаның ROAS-ы <code>0.0</code>.</p>",
   "starter": "def roas_safe(revenue, spend):\n    pass\n",
   "solution": "def roas_safe(revenue, spend):\n    return {ch: round(revenue.get(ch, 0) / spend[ch], 2) for ch in spend}\n",
   "hints": [
    "<code>revenue.get(ch, 0)</code>"
   ],
   "check": {
    "tests": "_r = roas_safe({\"instagram\": 150000}, {\"instagram\": 300000, \"tiktok\": 50000})\nassert _r == {\"instagram\": 0.5, \"tiktok\": 0.0}, f\"{{'instagram': 0.5, 'tiktok': 0.0}} күтілді, сізде {_r}\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Бюджетті қайта бөлу",
   "prompt": "<p><code>reallocate(revenue, spend, pct)</code> функциясы ROAS-ы ең төмен арнаның бюджетінен <code>pct</code> пайызын алып, ROAS-ы ең жоғары арнаға қоссын да, <b>жаңа</b> бюджет сөздігін қайтарсын (бүтін сандар, <code>round</code>). Бастапқы <code>spend</code> өзгермеуі керек.</p>",
   "starter": "def reallocate(revenue, spend, pct):\n    pass\n",
   "solution": "def reallocate(revenue, spend, pct):\n    r = {ch: revenue[ch] / spend[ch] for ch in spend}\n    worst = min(r, key=lambda ch: r[ch])\n    best = max(r, key=lambda ch: r[ch])\n    move = round(spend[worst] * pct / 100)\n    new = dict(spend)\n    new[worst] -= move\n    new[best] += move\n    return new\n",
   "hints": [
    "Ең төмен/жоғары: <code>min(r, key=...)</code>, <code>max(r, key=...)</code>.",
    "Көшірме: <code>new = dict(spend)</code>."
   ],
   "check": {
    "tests": "_rev = {\"instagram\": 150000, \"2gis\": 138800, \"referral\": 79200}\n_sp = {\"instagram\": 300000, \"2gis\": 150000, \"referral\": 40000}\n_r = reallocate(_rev, _sp, 20)\nassert _r == {\"instagram\": 240000, \"2gis\": 150000, \"referral\": 100000}, f\"Instagram-нан 60 000 referral-ға өтуі керек, сізде {_r}\"\nassert _sp == {\"instagram\": 300000, \"2gis\": 150000, \"referral\": 40000}, \"Бастапқы spend сөздігін өзгертпеңіз\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Пайда мен шығын тізімі",
   "prompt": "<p><code>roas_report(revenue, spend, margin)</code> функциясы <code>(арна, roas, мәртебе)</code> кортеждерінің тізімін ROAS бойынша кему ретімен қайтарсын. ROAS — 2 ондық белгі. Мәртебе: <code>revenue × margin &gt; spend</code> болса <code>\"пайда\"</code>, әйтпесе <code>\"шығын\"</code>. Байқаңыз: ROAS 1-ден жоғары болса да, шығын болуы мүмкін.</p>",
   "starter": "def roas_report(revenue, spend, margin):\n    pass\n",
   "solution": "def roas_report(revenue, spend, margin):\n    rows = []\n    for ch in spend:\n        status = \"пайда\" if revenue[ch] * margin > spend[ch] else \"шығын\"\n        rows.append((ch, round(revenue[ch] / spend[ch], 2), status))\n    return sorted(rows, key=lambda r: r[1], reverse=True)\n",
   "hints": [
    "Әр арнаға кортеж жасап, тізімге қосыңыз.",
    "<code>sorted(rows, key=lambda r: r[1], reverse=True)</code>"
   ],
   "check": {
    "tests": "_rev = {\"instagram\": 150000, \"2gis\": 138800, \"referral\": 79200}\n_sp = {\"instagram\": 300000, \"2gis\": 150000, \"referral\": 40000}\n_r = roas_report(_rev, _sp, 0.6)\nassert _r == [(\"referral\", 1.98, \"пайда\"), (\"2gis\", 0.93, \"шығын\"), (\"instagram\", 0.5, \"шығын\")], f\"Нәтиже дұрыс емес: {_r}\"\nassert roas_report({\"a\": 150}, {\"a\": 100}, 0.4) == [(\"a\", 1.5, \"шығын\")], \"ROAS 1.5, бірақ маржа 40% болса, шығын\""
   }
  }
 ],
 "cap-9": [
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "easy",
   "xp": 10,
   "title": "Алғашқы тапсырыс күні",
   "prompt": "<p>Әр клиенттің алғашқы тапсырысының күні (кез келген статус): <code>customer_id</code>, <code>first_order</code>. <code>customer_id</code> ретімен.</p>",
   "starter": "",
   "solution": "SELECT customer_id, MIN(order_date) AS first_order FROM orders GROUP BY customer_id ORDER BY customer_id;",
   "hints": [
    "<code>MIN(order_date)</code>, <code>GROUP BY customer_id</code>"
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
   "title": "Екінші ең үлкен чек",
   "prompt": "<p>Таза тапсырыстардың ішіндегі екінші ең үлкен (бірегей) соманы шығарыңыз: <code>second_amount</code>.</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000) SELECT MAX(amount) AS second_amount FROM clean WHERE amount < (SELECT MAX(amount) FROM clean);",
   "hints": [
    "Классикалық үлгі: <code>MAX</code>-тан кіші мәндердің <code>MAX</code>-ы."
   ]
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "easy",
   "xp": 10,
   "title": "Қайтарымсыз клиенттер",
   "prompt": "<p>Бірде-бір <code>refund</code> тапсырысы жоқ клиенттердің санын <code>n</code> шығарыңыз. <code>NOT EXISTS</code> қолданыңыз.</p>",
   "starter": "",
   "solution": "SELECT COUNT(*) AS n FROM customers c WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id AND o.status = 'refund');",
   "hints": [
    "<code>NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id AND o.status = 'refund')</code>"
   ],
   "check": {
    "mustInclude": [
     "NOT EXISTS"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "Үшінші тапсырыс",
   "prompt": "<p>Кемінде үш тапсырысы бар клиенттердің <b>үшінші</b> тапсырысының күні (кез келген статус): <code>customer_id</code>, <code>third_order</code>.</p>",
   "starter": "",
   "solution": "SELECT customer_id, order_date AS third_order FROM (SELECT customer_id, order_date, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date, id) AS rn FROM orders) WHERE rn = 3;",
   "hints": [
    "«Екінші тапсырыс» үлгісі, бірақ <code>rn = 3</code>."
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
   "level": "medium",
   "xp": 15,
   "title": "Наурызда бар, сәуірде жоқ",
   "prompt": "<p>Наурызда (<code>2024-03</code>) кемінде бір таза тапсырыс беріп, сәуірде (<code>2024-04</code>) бірде-бір таза тапсырыс бермеген клиенттер: <code>customer_id</code>, өсу ретімен.</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000) SELECT DISTINCT m.customer_id FROM clean m WHERE substr(m.order_date, 1, 7) = '2024-03' AND NOT EXISTS (SELECT 1 FROM clean a WHERE a.customer_id = m.customer_id AND substr(a.order_date, 1, 7) = '2024-04') ORDER BY m.customer_id;",
   "hints": [
    "<code>clean</code> CTE-ін екі рет қолданыңыз: сыртқы сұрауда және <code>NOT EXISTS</code> ішінде."
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "cafe",
   "level": "medium",
   "xp": 15,
   "title": "Клиенттің ең үлкен чегі",
   "prompt": "<p>Әр клиенттің ең үлкен таза тапсырысы: <code>customer_id</code>, <code>order_date</code>, <code>amount</code>. Бір клиентке бір жол (тең болса ертерек тапсырыс). <code>customer_id</code> ретімен.</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000) SELECT customer_id, order_date, amount FROM (SELECT customer_id, order_date, amount, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY amount DESC, order_date) AS rn FROM clean) WHERE rn = 1 ORDER BY customer_id;",
   "hints": [
    "<code>ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY amount DESC, order_date)</code>"
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
   "title": "Арнадағы top-2 клиент",
   "prompt": "<p>Әр арнада таза тапсырыстары ең көп 2 клиент: <code>channel</code>, <code>customer_id</code>, <code>orders</code>. Тең болса <code>customer_id</code> кішісі алдында (<code>ROW_NUMBER</code>). Арна, сосын орны бойынша сұрыптаңыз.</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000), s AS (SELECT c.channel, c.id AS customer_id, COUNT(*) AS orders FROM customers c JOIN clean o ON o.customer_id = c.id GROUP BY c.channel, c.id), r AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY channel ORDER BY orders DESC, customer_id) AS rn FROM s) SELECT channel, customer_id, orders FROM r WHERE rn <= 2 ORDER BY channel, rn;",
   "hints": [
    "CTE: арна × клиент бойынша тапсырыс саны.",
    "<code>ROW_NUMBER() OVER (PARTITION BY channel ORDER BY orders DESC, customer_id)</code>, сыртында <code>rn &lt;= 2</code>."
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
   "title": "Үш ай қатарынан келгендер",
   "prompt": "<p>Наурыз, сәуір және мамыр (<code>2024-03</code>, <code>2024-04</code>, <code>2024-05</code>) айларының <b>әрқайсысында</b> кемінде бір таза тапсырыс берген клиенттер: <code>customer_id</code>, өсу ретімен.</p>",
   "starter": "WITH clean AS (\n  SELECT * FROM orders\n  WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000\n)\nSELECT ",
   "solution": "WITH clean AS (SELECT * FROM orders WHERE status = 'paid' AND amount IS NOT NULL AND amount < 20000) SELECT customer_id FROM clean WHERE substr(order_date, 1, 7) IN ('2024-03', '2024-04', '2024-05') GROUP BY customer_id HAVING COUNT(DISTINCT substr(order_date, 1, 7)) = 3 ORDER BY customer_id;",
   "hints": [
    "Үш айдың тапсырыстарын сүзіп, клиент бойынша топтаңыз.",
    "<code>HAVING COUNT(DISTINCT substr(order_date, 1, 7)) = 3</code>"
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "HAVING"
    ]
   }
  }
 ]
});
