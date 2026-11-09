// Practice tasks after the lessons of m1-2 (SQL Core). Each lesson's list opens one task at a time.
DJ.addPractice('m1-2', {
 "sql-1": [
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Тауар санаттары",
   "prompt": "<code>products</code> кестесінен әр тауардың атауын (<code>name</code>) және санатын (<code>category</code>) шығарыңыз.",
   "starter": "SELECT \nFROM products;",
   "solution": "SELECT name, category FROM products;",
   "hints": [
    "Екі бағанды үтірмен бөліп жазыңыз: <code>SELECT name, category</code>."
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Барлық тапсырыстар",
   "prompt": "<code>orders</code> кестесіндегі барлық бағандар мен барлық жолдарды шығарыңыз.",
   "starter": "SELECT \nFROM orders;",
   "solution": "SELECT * FROM orders;",
   "hints": [
    "Барлық бағандар үшін <code>*</code> белгісі қолданылады."
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Тапсырыс құрамы",
   "prompt": "<code>order_items</code> кестесінен тапсырыс нөмірін (<code>order_id</code>), тауар нөмірін (<code>product_id</code>) және санын (<code>quantity</code>) шығарыңыз.",
   "starter": "SELECT \nFROM order_items;",
   "solution": "SELECT order_id, product_id, quantity FROM order_items;",
   "hints": [
    "Үш бағанды осы ретпен атаңыз."
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Алдымен баға",
   "prompt": "Тауарлардың бағасын (<code>price</code>) және атауын (<code>name</code>) шығарыңыз. Бағандар дәл осы ретпен тұруы керек: алдымен баға, сосын атау.",
   "starter": "SELECT name, price\nFROM products;",
   "solution": "SELECT price, name FROM products;",
   "hints": [
    "Бағандар <code>SELECT</code>-те қалай жазылса, нәтижеде солай тұрады."
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Тіркелу күндері",
   "prompt": "Әр клиенттің нөмірін (<code>id</code>), атын (<code>name</code>) және тіркелген күнін (<code>signup_date</code>) шығарыңыз.",
   "starter": "SELECT \nFROM customers;",
   "solution": "SELECT id, name, signup_date FROM customers;",
   "hints": [
    "Кесте: <code>customers</code>."
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Тапсырыс иелері",
   "prompt": "Әр тапсырыстың нөмірін (<code>id</code>), клиенттің нөмірін (<code>customer_id</code>) және статусын (<code>status</code>) шығарыңыз.",
   "starter": "SELECT \nFROM orders;",
   "solution": "SELECT id, customer_id, status FROM orders;",
   "hints": [
    "Кесте: <code>orders</code>. Бағандарды үтірмен бөліңіз."
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Алғашқы бес клиент",
   "prompt": "Кестемен танысу үшін <code>customers</code> кестесінен тек алғашқы 5 жолды шығарыңыз: <code>id</code> және <code>name</code> бағандары.",
   "starter": "SELECT id, name\nFROM customers;",
   "solution": "SELECT id, name FROM customers LIMIT 5;",
   "hints": [
    "Сұрау соңына <code>LIMIT 5</code> қосыңыз."
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Төрт баған қатаң ретпен",
   "prompt": "<code>orders</code> кестесінен төрт бағанды дәл осы ретпен шығарыңыз: <code>status</code>, <code>order_date</code>, <code>customer_id</code>, <code>id</code>.",
   "starter": "SELECT *\nFROM orders;",
   "solution": "SELECT status, order_date, customer_id, id FROM orders;",
   "hints": [
    "Бағандардың реті кестедегі реттен басқа болуы мүмкін: оларды өзіңіз қалаған ретпен атайсыз."
   ]
  }
 ],
 "sql-2": [
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Арзан тауарлар",
   "prompt": "Бағасы 5 000 теңгеден төмен тауарлардың атауы мен бағасын шығарыңыз.",
   "starter": "SELECT name, price\nFROM products\nWHERE ",
   "solution": "SELECT name, price FROM products WHERE price < 5000;",
   "hints": [
    "<code>WHERE price &lt; 5000</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Шымкенттік клиенттер",
   "prompt": "Шымкент қаласынан келген клиенттердің атын (<code>name</code>) шығарыңыз.",
   "starter": "SELECT name\nFROM customers\nWHERE ",
   "solution": "SELECT name FROM customers WHERE city = 'Шымкент';",
   "hints": [
    "Мәтінді бір тырнақшаға алыңыз: <code>'Шымкент'</code>."
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Бас тартылған тапсырыстар",
   "prompt": "Статусы <code>cancelled</code> тапсырыстардың <code>id</code> және <code>customer_id</code> бағандарын шығарыңыз.",
   "starter": "SELECT id, customer_id\nFROM orders\nWHERE ",
   "solution": "SELECT id, customer_id FROM orders WHERE status = 'cancelled';",
   "hints": [
    "<code>WHERE status = 'cancelled'</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Кітаптар санаты",
   "prompt": "«Кітаптар» санатындағы тауарлардың атауы мен бағасын шығарыңыз.",
   "starter": "SELECT name, price\nFROM products\nWHERE ",
   "solution": "SELECT name, price FROM products WHERE category = 'Кітаптар';",
   "hints": [
    "Санат <code>category</code> бағанында: <code>category = 'Кітаптар'</code>."
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Жаздан бері тіркелгендер",
   "prompt": "2024 жылғы 1 мамырдан бастап (сол күнді қоса) тіркелген клиенттердің аты мен тіркелу күнін (<code>signup_date</code>) шығарыңыз.",
   "starter": "SELECT name, signup_date\nFROM customers\nWHERE ",
   "solution": "SELECT name, signup_date FROM customers WHERE signup_date >= '2024-05-01';",
   "hints": [
    "Күндер мәтін ретінде салыстырылады: <code>signup_date &gt;= '2024-05-01'</code>."
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Көп данамен сатылғандар",
   "prompt": "<code>order_items</code> кестесінен саны (<code>quantity</code>) 3 немесе одан көп жолдарды шығарыңыз: <code>order_id</code>, <code>product_id</code>, <code>quantity</code>.",
   "starter": "SELECT order_id, product_id, quantity\nFROM order_items\nWHERE ",
   "solution": "SELECT order_id, product_id, quantity FROM order_items WHERE quantity >= 3;",
   "hints": [
    "«3 немесе одан көп» — <code>&gt;=</code> белгісі."
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Электроника емес тауарлар",
   "prompt": "«Электроника» санатына жатпайтын барлық тауарлардың атауы мен санатын шығарыңыз.",
   "starter": "SELECT name, category\nFROM products\nWHERE ",
   "solution": "SELECT name, category FROM products WHERE category <> 'Электроника';",
   "hints": [
    "«Тең емес» белгісі: <code>&lt;&gt;</code> немесе <code>!=</code>."
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Қазанға дейінгі тапсырыстар",
   "prompt": "2024 жылғы 1 қазанға дейін (1 қазанның өзі кірмейді) жасалған тапсырыстардың <code>id</code>, <code>order_date</code> және <code>status</code> бағандарын шығарыңыз.",
   "starter": "SELECT id, order_date, status\nFROM orders\nWHERE ",
   "solution": "SELECT id, order_date, status FROM orders WHERE order_date < '2024-10-01';",
   "hints": [
    "<code>order_date &lt; '2024-10-01'</code> — қыркүйектің соңына дейінгі барлық күн."
   ]
  }
 ],
 "sql-3": [
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Аксессуар мен кеңсе",
   "prompt": "«Аксессуарлар» немесе «Кеңсе» санатындағы тауарлардың атауы мен санатын шығарыңыз. <code>IN</code> қолданыңыз.",
   "starter": "SELECT name, category\nFROM products\nWHERE ",
   "solution": "SELECT name, category FROM products WHERE category IN ('Аксессуарлар', 'Кеңсе');",
   "hints": [
    "<code>category IN ('Аксессуарлар', 'Кеңсе')</code>"
   ],
   "check": {
    "mustInclude": [
     "IN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Баға аралығы",
   "prompt": "Бағасы 7 000 мен 30 000 теңге аралығындағы (шеттерін қоса) тауарлардың атауы мен бағасын шығарыңыз. <code>BETWEEN</code> қолданыңыз.",
   "starter": "SELECT name, price\nFROM products\nWHERE ",
   "solution": "SELECT name, price FROM products WHERE price BETWEEN 7000 AND 30000;",
   "hints": [
    "<code>BETWEEN 7000 AND 30000</code> шеткі мәндерді де қосады."
   ],
   "check": {
    "mustInclude": [
     "BETWEEN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Жолдағы күзгі тапсырыстар",
   "prompt": "Статусы <code>shipped</code> және 2024 жылғы 1 қазаннан бастап жасалған тапсырыстардың <code>id</code> мен <code>order_date</code> бағандарын шығарыңыз.",
   "starter": "SELECT id, order_date\nFROM orders\nWHERE ",
   "solution": "SELECT id, order_date FROM orders WHERE status = 'shipped' AND order_date >= '2024-10-01';",
   "hints": [
    "Екі шартты <code>AND</code>-пен біріктіріңіз."
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Екі астанадан тыс",
   "prompt": "Қаласы Алматы да, Астана да емес клиенттердің аты мен қаласын шығарыңыз. Қаласы көрсетілмеген клиент нәтижеге кірмеуі керек. <code>NOT IN</code> қолданыңыз.",
   "starter": "SELECT name, city\nFROM customers\nWHERE ",
   "solution": "SELECT name, city FROM customers WHERE city NOT IN ('Алматы', 'Астана');",
   "hints": [
    "<code>city NOT IN ('Алматы', 'Астана')</code>. NULL мәні бар жол бұл шартпен өздігінен түсіп қалады."
   ],
   "check": {
    "mustInclude": [
     "NOT IN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Қазанда жеткізілгендер",
   "prompt": "2024 жылғы қазанда (1–31 қазан) жасалған және статусы <code>delivered</code> тапсырыстардың <code>id</code> мен <code>order_date</code> бағандарын шығарыңыз.",
   "starter": "SELECT id, order_date\nFROM orders\nWHERE ",
   "solution": "SELECT id, order_date FROM orders WHERE order_date BETWEEN '2024-10-01' AND '2024-10-31' AND status = 'delivered';",
   "hints": [
    "<code>order_date BETWEEN '2024-10-01' AND '2024-10-31'</code>, сосын <code>AND status = 'delivered'</code>."
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Кітап немесе қымбат",
   "prompt": "«Кітаптар» санатындағы немесе бағасы 100 000 теңгеден жоғары тауарлардың атауы мен бағасын шығарыңыз.",
   "starter": "SELECT name, price\nFROM products\nWHERE ",
   "solution": "SELECT name, price FROM products WHERE category = 'Кітаптар' OR price > 100000;",
   "hints": [
    "«Немесе» — <code>OR</code>."
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Жақшамен шарт",
   "prompt": "Алматы немесе Шымкент клиенттерінің ішінен 2024 жылғы 1 наурыздан бастап тіркелгендерін шығарыңыз: <code>name</code>, <code>city</code>, <code>signup_date</code>.",
   "starter": "SELECT name, city, signup_date\nFROM customers\nWHERE ",
   "solution": "SELECT name, city, signup_date FROM customers WHERE (city = 'Алматы' OR city = 'Шымкент') AND signup_date >= '2024-03-01';",
   "hints": [
    "<code>AND</code> <code>OR</code>-дан бұрын орындалады, сондықтан <code>OR</code> бөлігін жақшаға алыңыз.",
    "Немесе <code>city IN ('Алматы', 'Шымкент')</code> жазыңыз."
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Орта бағадан тыс электроника",
   "prompt": "«Электроника» санатындағы, бірақ бағасы 50 000 мен 200 000 аралығына <b>кірмейтін</b> тауарлардың атауы мен бағасын шығарыңыз. <code>NOT</code> және <code>BETWEEN</code> қолданыңыз.",
   "starter": "SELECT name, price\nFROM products\nWHERE ",
   "solution": "SELECT name, price FROM products WHERE category = 'Электроника' AND price NOT BETWEEN 50000 AND 200000;",
   "hints": [
    "<code>price NOT BETWEEN 50000 AND 200000</code>",
    "Санат шартын <code>AND</code>-пен қосыңыз."
   ],
   "check": {
    "mustInclude": [
     "NOT",
     "BETWEEN"
    ]
   }
  }
 ],
 "sql-4": [
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "А әрпінен басталатын аттар",
   "prompt": "Аты «А» әрпінен басталатын клиенттердің атын шығарыңыз.",
   "starter": "SELECT name\nFROM customers\nWHERE ",
   "solution": "SELECT name FROM customers WHERE name LIKE 'А%';",
   "hints": [
    "<code>%</code> — кез келген таңбалар тізбегі: <code>LIKE 'А%'</code>."
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Қаласы бар клиенттер",
   "prompt": "Қаласы көрсетілген (бос емес) клиенттердің аты мен қаласын шығарыңыз.",
   "starter": "SELECT name, city\nFROM customers\nWHERE ",
   "solution": "SELECT name, city FROM customers WHERE city IS NOT NULL;",
   "hints": [
    "NULL-ды <code>=</code> арқылы емес, <code>IS NOT NULL</code> арқылы тексереміз."
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Н-мен аяқталатын аттар",
   "prompt": "Аты «н» әрпімен аяқталатын клиенттердің атын шығарыңыз (мысалы, Нұрлан).",
   "starter": "SELECT name\nFROM customers\nWHERE ",
   "solution": "SELECT name FROM customers WHERE name LIKE '%н';",
   "hints": [
    "Соңы бойынша іздеу: <code>LIKE '%н'</code>."
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Бос қаланы толтыру",
   "prompt": "Әр клиенттің атын және қаласын шығарыңыз. Қаласы көрсетілмесе, оның орнына <code>жоқ</code> сөзі тұрсын. <code>COALESCE</code> қолданыңыз.",
   "starter": "SELECT name, city\nFROM customers;",
   "solution": "SELECT name, COALESCE(city, 'жоқ') AS city FROM customers;",
   "hints": [
    "<code>COALESCE(city, 'жоқ')</code> бірінші бос емес мәнді қайтарады."
   ],
   "check": {
    "mustInclude": [
     "COALESCE"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Бес әріпті аттар",
   "prompt": "Аты дәл 5 әріптен тұратын клиенттердің атын шығарыңыз. <code>_</code> белгісін қолданыңыз.",
   "starter": "SELECT name\nFROM customers\nWHERE ",
   "solution": "SELECT name FROM customers WHERE name LIKE '_____';",
   "hints": [
    "<code>_</code> дәл бір таңбаны білдіреді, сондықтан бес <code>_</code> жазыңыз."
   ],
   "check": {
    "mustInclude": [
     "_"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "А-дан басталатын қалалар",
   "prompt": "Қаласы «А» әрпінен басталатын клиенттердің аты мен қаласын шығарыңыз (Алматы, Астана, Ақтөбе...).",
   "starter": "SELECT name, city\nFROM customers\nWHERE ",
   "solution": "SELECT name, city FROM customers WHERE city LIKE 'А%';",
   "hints": [
    "<code>city LIKE 'А%'</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "NULL-ды ұмытпаңыз",
   "prompt": "Қаласы «А» әрпінен басталмайтын клиенттердің атын шығарыңыз. Қаласы көрсетілмеген клиент те нәтижеге кіруі керек.",
   "starter": "SELECT name\nFROM customers\nWHERE ",
   "solution": "SELECT name FROM customers WHERE city NOT LIKE 'А%' OR city IS NULL;",
   "hints": [
    "<code>NOT LIKE 'А%'</code> NULL жолдарды алып тастайды.",
    "Оларды <code>OR city IS NULL</code> арқылы қосыңыз."
   ],
   "check": {
    "mustInclude": [
     "IS NULL"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Көп сөзді арзан тауарлар",
   "prompt": "Атауында бос орын бар (кемінде екі сөзден тұратын) және бағасы 7 000 теңгеден төмен тауарлардың атауы мен бағасын шығарыңыз.",
   "starter": "SELECT name, price\nFROM products\nWHERE ",
   "solution": "SELECT name, price FROM products WHERE name LIKE '% %' AND price < 7000;",
   "hints": [
    "Бос орынды іздеу: <code>LIKE '% %'</code>.",
    "Баға шартын <code>AND</code>-пен қосыңыз."
   ]
  }
 ],
 "sql-5": [
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Ең арзан тауар",
   "prompt": "Ең арзан тауардың атауы мен бағасын шығарыңыз (бір жол).",
   "starter": "SELECT name, price\nFROM products;",
   "solution": "SELECT name, price FROM products ORDER BY price LIMIT 1;",
   "hints": [
    "Бағаны өсу ретімен сұрыптап, <code>LIMIT 1</code> алыңыз."
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Статустар тізімі",
   "prompt": "Тапсырыстарда кездесетін статустардың қайталанбайтын тізімін шығарыңыз.",
   "starter": "SELECT status\nFROM orders;",
   "solution": "SELECT DISTINCT status FROM orders;",
   "hints": [
    "<code>SELECT DISTINCT status</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Әліпби бойынша клиенттер",
   "prompt": "Клиенттердің атын әліпби ретімен (өсу бойынша) шығарыңыз.",
   "starter": "SELECT name\nFROM customers;",
   "solution": "SELECT name FROM customers ORDER BY name;",
   "hints": [
    "<code>ORDER BY name</code> — әдепкі бойынша өсу реті (ASC).",
    "SQLite әріптерді кодтары бойынша салыстырады, сондықтан Ә, Ғ, Қ сияқты әріптер тізім соңында тұрады."
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
   "title": "Соңғы үш тапсырыс",
   "prompt": "Ең соңғы жасалған 3 тапсырыстың <code>id</code> мен <code>order_date</code> бағандарын, жаңасынан бастап шығарыңыз.",
   "starter": "SELECT id, order_date\nFROM orders;",
   "solution": "SELECT id, order_date FROM orders ORDER BY order_date DESC LIMIT 3;",
   "hints": [
    "<code>ORDER BY order_date DESC</code>, сосын <code>LIMIT 3</code>."
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
   "title": "Қала, сосын ат",
   "prompt": "Клиенттердің аты мен қаласын шығарыңыз: алдымен қала бойынша, бір қаланың ішінде ат бойынша әліпби ретімен сұрыптаңыз.",
   "starter": "SELECT name, city\nFROM customers;",
   "solution": "SELECT name, city FROM customers ORDER BY city, name;",
   "hints": [
    "Бірнеше бағанмен сұрыптау: <code>ORDER BY city, name</code>.",
    "SQLite-та NULL мәні өсу ретінде бірінші тұрады."
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
   "title": "Тапсырыс берген клиенттер",
   "prompt": "<code>orders</code> кестесінде кездесетін клиент нөмірлерінің (<code>customer_id</code>) қайталанбайтын тізімін өсу ретімен шығарыңыз.",
   "starter": "SELECT customer_id\nFROM orders;",
   "solution": "SELECT DISTINCT customer_id FROM orders ORDER BY customer_id;",
   "hints": [
    "<code>DISTINCT</code> мен <code>ORDER BY</code> бірге қолданылады."
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Кеңсенің қымбат екеуі",
   "prompt": "«Кеңсе» санатындағы ең қымбат 2 тауардың атауы мен бағасын, қымбаттан арзанға қарай шығарыңыз.",
   "starter": "SELECT name, price\nFROM products\nWHERE category = 'Кеңсе';",
   "solution": "SELECT name, price FROM products WHERE category = 'Кеңсе' ORDER BY price DESC LIMIT 2;",
   "hints": [
    "Реті: <code>WHERE</code> → <code>ORDER BY</code> → <code>LIMIT</code>."
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Ең үлкен үш жол",
   "prompt": "<code>order_items</code> кестесінен саны (<code>quantity</code>) ең көп 3 жолды шығарыңыз: <code>order_id</code>, <code>product_id</code>, <code>quantity</code>. Саны тең болса, <code>order_id</code> кішісі бірінші тұрсын.",
   "starter": "SELECT order_id, product_id, quantity\nFROM order_items;",
   "solution": "SELECT order_id, product_id, quantity FROM order_items ORDER BY quantity DESC, order_id LIMIT 3;",
   "hints": [
    "<code>ORDER BY quantity DESC, order_id</code>",
    "Соңында <code>LIMIT 3</code>."
   ],
   "check": {
    "ordered": true
   }
  }
 ],
 "sql-6": [
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Екі дана құны",
   "prompt": "Әр тауардың атауын және екі данасының құнын <code>two_items</code> деген атпен шығарыңыз.",
   "starter": "SELECT name,\nFROM products;",
   "solution": "SELECT name, price * 2 AS two_items FROM products;",
   "hints": [
    "<code>price * 2 AS two_items</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Жеткізумен баға",
   "prompt": "Әр тауардың атауын және жеткізу құнын (1 500 теңге) қосқандағы бағасын <code>total</code> деген атпен шығарыңыз.",
   "starter": "SELECT name,\nFROM products;",
   "solution": "SELECT name, price + 1500 AS total FROM products;",
   "hints": [
    "<code>price + 1500 AS total</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Атау мен санат бірге",
   "prompt": "Әр тауар үшін бір мәтіндік бағанды <code>label</code> деген атпен шығарыңыз: атауы, сосын <code> / </code>, сосын санаты. Мысалы: <code>Термос / Аксессуарлар</code>.",
   "starter": "SELECT \nFROM products;",
   "solution": "SELECT name || ' / ' || category AS label FROM products;",
   "hints": [
    "Мәтінді <code>||</code> біріктіреді: <code>name || ' / ' || category</code>."
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Доллармен баға",
   "prompt": "1 доллар = 500 теңге деп алып, әр тауардың атауын және долларлық бағасын <code>price_usd</code> деген атпен, бір ондық таңбаға дейін дөңгелектеп шығарыңыз. Мысалы, 6500 → 13.0, 1200 → 2.4.",
   "starter": "SELECT name,\nFROM products;",
   "solution": "SELECT name, ROUND(price / 500.0, 1) AS price_usd FROM products;",
   "hints": [
    "Бүтін бөлуден сақтану үшін <code>500.0</code> деп жазыңыз.",
    "<code>ROUND(x, 1)</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "ҚҚС-сыз баға",
   "prompt": "Бағалардың ішінде 12% ҚҚС бар. Әр тауардың атауын және ҚҚС-сыз бағасын (<code>price / 1.12</code>, бүтінге дейін дөңгелектеп) <code>no_vat</code> деген атпен шығарыңыз.",
   "starter": "SELECT name,\nFROM products;",
   "solution": "SELECT name, ROUND(price / 1.12) AS no_vat FROM products;",
   "hints": [
    "<code>ROUND(price / 1.12) AS no_vat</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Мың теңгелер бүтін бөлігі",
   "prompt": "Әр тауардың атауын және бағасының толық мыңдар санын <code>thousands</code> деген атпен шығарыңыз: бөлшек бөлігі тасталсын. Мысалы, 6500 → 6, 25000 → 25.",
   "starter": "SELECT name,\nFROM products;",
   "solution": "SELECT name, price / 1000 AS thousands FROM products;",
   "hints": [
    "SQLite-та бүтін санды бүтін санға бөлсеңіз, бөлшек бөлігі тасталады: <code>price / 1000</code>."
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Жеңілдік бойынша үздік үштік",
   "prompt": "Барлық тауарға 20% жеңілдік берілді. Атауын және жеңілдіктен кейінгі бағасын (<code>ROUND(price * 0.8)</code>) <code>sale</code> деген атпен шығарыңыз. Тек ең қымбат 3 тауар, <code>sale</code> бойынша кему ретімен.",
   "starter": "SELECT name,\nFROM products;",
   "solution": "SELECT name, ROUND(price * 0.8) AS sale FROM products ORDER BY sale DESC LIMIT 3;",
   "hints": [
    "Alias-ты <code>ORDER BY</code>-да қолдануға болады: <code>ORDER BY sale DESC</code>."
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Жеңілдікпен 10 мыңнан арзан",
   "prompt": "Әр тауарға 25% жеңілдік берілсе (<code>price * 0.75</code>), жеңілдіктен кейінгі бағасы 10 000 теңгеден төмен болатын тауарлардың атауын және сол бағаны <code>sale_price</code> деген атпен шығарыңыз. <code>sale_price</code> өсу ретімен сұрыптаңыз.",
   "starter": "SELECT name,\nFROM products;",
   "solution": "SELECT name, price * 0.75 AS sale_price FROM products WHERE price * 0.75 < 10000 ORDER BY sale_price;",
   "hints": [
    "<code>WHERE</code>-де alias жұмыс істемейді: есептеуді қайта жазыңыз, <code>WHERE price * 0.75 &lt; 10000</code>.",
    "Ал <code>ORDER BY sale_price</code> жұмыс істейді."
   ],
   "check": {
    "ordered": true
   }
  }
 ],
 "sql-7": [
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Тапсырыстар саны",
   "prompt": "Барлығы қанша тапсырыс бар? Бір санды шығарыңыз.",
   "starter": "SELECT \nFROM orders;",
   "solution": "SELECT COUNT(*) FROM orders;",
   "hints": [
    "<code>COUNT(*)</code> жолдарды санайды."
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Бағалар қосындысы",
   "prompt": "Әр тауардан бір данадан алсақ, барлығы қанша теңге болады? Барлық тауар бағаларының қосындысын шығарыңыз.",
   "starter": "SELECT \nFROM products;",
   "solution": "SELECT SUM(price) FROM products;",
   "hints": [
    "<code>SUM(price)</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Кеңсе тауарлары саны",
   "prompt": "«Кеңсе» санатында неше тауар бар? Бір санды шығарыңыз.",
   "starter": "SELECT \nFROM products;",
   "solution": "SELECT COUNT(*) FROM products WHERE category = 'Кеңсе';",
   "hints": [
    "Алдымен <code>WHERE</code>-мен сүзіңіз, сосын <code>COUNT(*)</code>."
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Қалалар саны",
   "prompt": "Клиенттер неше түрлі қаладан келген? Қайталанбайтын қалалар санын шығарыңыз (NULL саналмайды).",
   "starter": "SELECT \nFROM customers;",
   "solution": "SELECT COUNT(DISTINCT city) FROM customers;",
   "hints": [
    "<code>COUNT(DISTINCT city)</code> NULL-ды өздігінен санамайды."
   ],
   "check": {
    "mustInclude": [
     "DISTINCT"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Орташа дана саны",
   "prompt": "<code>order_items</code> кестесіндегі бір жолдағы орташа дана санын (<code>quantity</code>) бір ондық таңбаға дейін дөңгелектеп шығарыңыз.",
   "starter": "SELECT \nFROM order_items;",
   "solution": "SELECT ROUND(AVG(quantity), 1) FROM order_items;",
   "hints": [
    "<code>ROUND(AVG(quantity), 1)</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Алғашқы және соңғы күн",
   "prompt": "Ең алғашқы тапсырыстың күнін және ең соңғы тапсырыстың күнін бір жолда, осы ретпен шығарыңыз.",
   "starter": "SELECT \nFROM orders;",
   "solution": "SELECT MIN(order_date), MAX(order_date) FROM orders;",
   "hints": [
    "<code>MIN</code> мен <code>MAX</code> мәтіндік күндермен де жұмыс істейді."
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Электроника статистикасы",
   "prompt": "«Электроника» санаты бойынша бір жолда төрт мән шығарыңыз: тауар саны, ең төмен баға, ең жоғары баға және бүтінге дейін дөңгелектенген орташа баға.",
   "starter": "SELECT \nFROM products;",
   "solution": "SELECT COUNT(*), MIN(price), MAX(price), ROUND(AVG(price)) FROM products WHERE category = 'Электроника';",
   "hints": [
    "Төрт агрегатты үтірмен жазыңыз.",
    "<code>WHERE category = ...</code> агрегаттардан бұрын орындалады."
   ]
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Баға шашырауы",
   "prompt": "Электроникадан басқа тауарлар бойынша бір жолда екі мән шығарыңыз: ең қымбат пен ең арзан бағаның айырмасы (<code>spread</code>) және бүтінге дөңгелектенген орташа баға (<code>avg_price</code>).",
   "starter": "SELECT \nFROM products;",
   "solution": "SELECT MAX(price) - MIN(price) AS spread, ROUND(AVG(price)) AS avg_price FROM products WHERE category <> 'Электроника';",
   "hints": [
    "Агрегаттардың өзімен арифметика жасауға болады: <code>MAX(price) - MIN(price)</code>."
   ]
  }
 ],
 "sql-8": [
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Статус бойынша сан",
   "prompt": "Әр статус бойынша тапсырыстар санын шығарыңыз: <code>status</code> және сан.",
   "starter": "SELECT status, COUNT(*)\nFROM orders;",
   "solution": "SELECT status, COUNT(*) FROM orders GROUP BY status;",
   "hints": [
    "<code>GROUP BY status</code>"
   ],
   "check": {
    "mustInclude": [
     "GROUP BY"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Санаттың ең қымбаты",
   "prompt": "Әр санаттағы ең жоғары бағаны шығарыңыз: <code>category</code> және ең жоғары баға.",
   "starter": "SELECT category, MAX(price)\nFROM products;",
   "solution": "SELECT category, MAX(price) FROM products GROUP BY category;",
   "hints": [
    "<code>MAX(price)</code> және <code>GROUP BY category</code>."
   ],
   "check": {
    "mustInclude": [
     "GROUP BY"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Тапсырыстағы дана",
   "prompt": "Әр тапсырыста барлығы неше дана тауар бар? <code>order_id</code> және <code>quantity</code> қосындысын шығарыңыз.",
   "starter": "SELECT order_id, SUM(quantity)\nFROM order_items;",
   "solution": "SELECT order_id, SUM(quantity) FROM order_items GROUP BY order_id;",
   "hints": [
    "<code>SUM(quantity)</code> және <code>GROUP BY order_id</code>."
   ],
   "check": {
    "mustInclude": [
     "GROUP BY"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Белсенді клиенттер реті",
   "prompt": "Әр клиенттің (<code>customer_id</code>) тапсырыс санын шығарыңыз. Тапсырысы көптер бірінші, сан тең болса, <code>customer_id</code> кішісі бірінші.",
   "starter": "SELECT customer_id, COUNT(*)\nFROM orders\nGROUP BY customer_id;",
   "solution": "SELECT customer_id, COUNT(*) FROM orders GROUP BY customer_id ORDER BY COUNT(*) DESC, customer_id;",
   "hints": [
    "<code>ORDER BY COUNT(*) DESC, customer_id</code>"
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
   "title": "Жақсы сатылған тауарлар",
   "prompt": "Барлығы кемінде 3 дана сатылған тауарлардың <code>product_id</code> мен сатылған дана санын шығарыңыз.",
   "starter": "SELECT product_id, SUM(quantity)\nFROM order_items\nGROUP BY product_id;",
   "solution": "SELECT product_id, SUM(quantity) FROM order_items GROUP BY product_id HAVING SUM(quantity) >= 3;",
   "hints": [
    "Топтарды сүзу: <code>HAVING SUM(quantity) &gt;= 3</code>."
   ],
   "check": {
    "mustInclude": [
     "HAVING"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Қымбат санаттар",
   "prompt": "Тауар бағаларының қосындысы 20 000 теңгеден асатын санаттарды шығарыңыз: <code>category</code> және бағалар қосындысы.",
   "starter": "SELECT category, SUM(price)\nFROM products\nGROUP BY category;",
   "solution": "SELECT category, SUM(price) FROM products GROUP BY category HAVING SUM(price) > 20000;",
   "hints": [
    "<code>HAVING SUM(price) &gt; 20000</code>"
   ],
   "check": {
    "mustInclude": [
     "HAVING"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Тұрақты сатып алушылар",
   "prompt": "Тек <code>delivered</code> тапсырыстарды санаңыз. Кемінде 2 жеткізілген тапсырысы бар клиенттердің <code>customer_id</code> мен сол тапсырыстар санын шығарыңыз.",
   "starter": "SELECT customer_id, COUNT(*)\nFROM orders\nGROUP BY customer_id;",
   "solution": "SELECT customer_id, COUNT(*) FROM orders WHERE status = 'delivered' GROUP BY customer_id HAVING COUNT(*) >= 2;",
   "hints": [
    "Жолдарды <code>WHERE</code> топтаудан бұрын, топтарды <code>HAVING</code> топтаудан кейін сүзеді."
   ],
   "check": {
    "mustInclude": [
     "WHERE",
     "HAVING"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Үлкен қалалар рейтингі",
   "prompt": "Қаласы көрсетілген клиенттер бойынша, кемінде 2 клиенті бар қалаларды шығарыңыз: <code>city</code> және клиент саны. Клиенті көп қала бірінші, сан тең болса, қала атауы бойынша әліпби ретімен.",
   "starter": "SELECT city, COUNT(*)\nFROM customers\nGROUP BY city;",
   "solution": "SELECT city, COUNT(*) FROM customers WHERE city IS NOT NULL GROUP BY city HAVING COUNT(*) >= 2 ORDER BY COUNT(*) DESC, city;",
   "hints": [
    "Реті: WHERE → GROUP BY → HAVING → ORDER BY."
   ],
   "check": {
    "ordered": true
   }
  }
 ],
 "sql-9": [
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Мегаполис пе, өңір ме",
   "prompt": "Әр клиенттің атын және <code>zone</code> бағанын шығарыңыз: қаласы Алматы немесе Астана болса <code>мегаполис</code>, әйтпесе (қала көрсетілмесе де) <code>өңір</code>.",
   "starter": "SELECT name,\n  CASE\n    WHEN \n  END AS zone\nFROM customers;",
   "solution": "SELECT name, CASE WHEN city IN ('Алматы', 'Астана') THEN 'мегаполис' ELSE 'өңір' END AS zone FROM customers;",
   "hints": [
    "<code>CASE WHEN city IN ('Алматы', 'Астана') THEN 'мегаполис' ELSE 'өңір' END</code>"
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
   "title": "Статус қазақша",
   "prompt": "Әр тапсырыстың <code>id</code> мен қазақша статусын <code>status_kz</code> деген атпен шығарыңыз: <code>delivered</code> → <code>жеткізілді</code>, <code>shipped</code> → <code>жолда</code>, қалғаны → <code>бас тартылды</code>.",
   "starter": "SELECT id,\n  CASE\n    WHEN \n  END AS status_kz\nFROM orders;",
   "solution": "SELECT id, CASE WHEN status = 'delivered' THEN 'жеткізілді' WHEN status = 'shipped' THEN 'жолда' ELSE 'бас тартылды' END AS status_kz FROM orders;",
   "hints": [
    "Екі <code>WHEN</code> және бір <code>ELSE</code> жазыңыз."
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
   "title": "Көтерме ме, бөлшек пе",
   "prompt": "<code>order_items</code> кестесінен <code>order_id</code>, <code>product_id</code> және <code>sale_type</code> бағанын шығарыңыз: саны 3 және одан көп болса <code>көтерме</code>, әйтпесе <code>бөлшек</code>.",
   "starter": "SELECT order_id, product_id,\n  CASE\n  END AS sale_type\nFROM order_items;",
   "solution": "SELECT order_id, product_id, CASE WHEN quantity >= 3 THEN 'көтерме' ELSE 'бөлшек' END AS sale_type FROM order_items;",
   "hints": [
    "<code>CASE WHEN quantity &gt;= 3 THEN 'көтерме' ELSE 'бөлшек' END</code>"
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
   "level": "medium",
   "xp": 15,
   "title": "Белгісіз қала CASE-пен",
   "prompt": "Әр клиенттің атын және <code>city_label</code> бағанын шығарыңыз: қаласы бос болса <code>белгісіз</code>, әйтпесе қаланың өз атауы. <code>CASE</code> қолданыңыз.",
   "starter": "SELECT name,\n  CASE\n  END AS city_label\nFROM customers;",
   "solution": "SELECT name, CASE WHEN city IS NULL THEN 'белгісіз' ELSE city END AS city_label FROM customers;",
   "hints": [
    "<code>WHEN city IS NULL THEN ...</code>",
    "<code>ELSE city</code> — бағанның өз мәнін қайтарады."
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
   "level": "medium",
   "xp": 15,
   "title": "Премиум тауарлар саны",
   "prompt": "Тауарларды екі топқа бөліп санаңыз: бағасы 50 000 және одан жоғары болса <code>премиум</code>, әйтпесе <code>қарапайым</code>. Бағандар: топ атауы және тауар саны.",
   "starter": "SELECT\n  CASE\n  END AS seg,\n  COUNT(*)\nFROM products;",
   "solution": "SELECT CASE WHEN price >= 50000 THEN 'премиум' ELSE 'қарапайым' END AS seg, COUNT(*) FROM products GROUP BY seg;",
   "hints": [
    "CASE бағанына alias беріп, сол бойынша <code>GROUP BY</code> жасаңыз."
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
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Тоқсанды анықтау",
   "prompt": "Әр тапсырыстың <code>id</code>, <code>order_date</code> және <code>quarter</code> бағанын шығарыңыз: 2024 жылғы 1 қазанға дейін болса <code>Q3</code>, әйтпесе <code>Q4</code>.",
   "starter": "SELECT id, order_date,\n  CASE\n  END AS quarter\nFROM orders;",
   "solution": "SELECT id, order_date, CASE WHEN order_date < '2024-10-01' THEN 'Q3' ELSE 'Q4' END AS quarter FROM orders;",
   "hints": [
    "<code>CASE WHEN order_date &lt; '2024-10-01' THEN 'Q3' ELSE 'Q4' END</code>"
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
   "title": "Тоқсан бойынша тапсырыстар",
   "prompt": "Бас тартылған (<code>cancelled</code>) тапсырыстарды есептемей, әр тоқсандағы тапсырыс санын шығарыңыз: 1 қазанға дейін <code>Q3</code>, қалғаны <code>Q4</code>. Бағандар: <code>quarter</code> және сан.",
   "starter": "SELECT\n  CASE\n  END AS quarter,\n  COUNT(*)\nFROM orders;",
   "solution": "SELECT CASE WHEN order_date < '2024-10-01' THEN 'Q3' ELSE 'Q4' END AS quarter, COUNT(*) FROM orders WHERE status <> 'cancelled' GROUP BY quarter;",
   "hints": [
    "Алдымен <code>WHERE status &lt;&gt; ...</code>, сосын CASE бағаны бойынша <code>GROUP BY</code>."
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
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Санатқа сай жеңілдік",
   "prompt": "Жаңа бағаны <code>new_price</code> деген атпен есептеңіз: Электроникаға 10% жеңілдік (<code>ROUND(price * 0.9)</code>), Кітаптарға 20% жеңілдік (<code>ROUND(price * 0.8)</code>), қалғанының бағасы өзгермейді. Атауы мен <code>new_price</code>-ты шығарыңыз, тек ең қымбат 5 тауар, <code>new_price</code> кему ретімен.",
   "starter": "SELECT name,\n  CASE\n  END AS new_price\nFROM products;",
   "solution": "SELECT name, CASE WHEN category = 'Электроника' THEN ROUND(price * 0.9) WHEN category = 'Кітаптар' THEN ROUND(price * 0.8) ELSE price END AS new_price FROM products ORDER BY new_price DESC LIMIT 5;",
   "hints": [
    "THEN ішінде есептеу жазуға болады.",
    "<code>ORDER BY new_price DESC LIMIT 5</code>"
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "CASE"
    ]
   }
  }
 ],
 "sql-10": [
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Тапсырыс және қала",
   "prompt": "Әр тапсырыстың <code>id</code> мен клиенттің қаласын (<code>city</code>) шығарыңыз.",
   "starter": "SELECT o.id, c.city\nFROM orders o\nJOIN ",
   "solution": "SELECT o.id, c.city FROM orders o JOIN customers c ON o.customer_id = c.id;",
   "hints": [
    "<code>orders o JOIN customers c ON o.customer_id = c.id</code>"
   ],
   "check": {
    "mustInclude": [
     "JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Тауар атауы мен саны",
   "prompt": "<code>order_items</code> кестесінің әр жолы үшін <code>order_id</code>, тауардың атауын және санын (<code>quantity</code>) шығарыңыз.",
   "starter": "SELECT oi.order_id, p.name, oi.quantity\nFROM order_items oi\nJOIN ",
   "solution": "SELECT oi.order_id, p.name, oi.quantity FROM order_items oi JOIN products p ON p.id = oi.product_id;",
   "hints": [
    "<code>JOIN products p ON p.id = oi.product_id</code>"
   ],
   "check": {
    "mustInclude": [
     "JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Айгерімнің тапсырыстары",
   "prompt": "Айгерім есімді клиенттің тапсырыстарының <code>id</code> мен <code>order_date</code> бағандарын шығарыңыз.",
   "starter": "SELECT o.id, o.order_date\nFROM orders o\nJOIN ",
   "solution": "SELECT o.id, o.order_date FROM orders o JOIN customers c ON o.customer_id = c.id WHERE c.name = 'Айгерім';",
   "hints": [
    "JOIN-нан кейін <code>WHERE c.name = 'Айгерім'</code> қосыңыз."
   ],
   "check": {
    "mustInclude": [
     "JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Электроника сатылымы",
   "prompt": "Электроника санатындағы тауарлар сатылған жолдарды шығарыңыз: <code>order_id</code>, тауар атауы, <code>quantity</code>.",
   "starter": "SELECT oi.order_id, p.name, oi.quantity\nFROM order_items oi\nJOIN ",
   "solution": "SELECT oi.order_id, p.name, oi.quantity FROM order_items oi JOIN products p ON p.id = oi.product_id WHERE p.category = 'Электроника';",
   "hints": [
    "<code>WHERE p.category = 'Электроника'</code>"
   ],
   "check": {
    "mustInclude": [
     "JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Тауар бойынша дана",
   "prompt": "Әр тауардың атауын және барлығы сатылған дана санын шығарыңыз (сатылмаған тауарлар керек емес).",
   "starter": "SELECT p.name, SUM(oi.quantity)\nFROM order_items oi\nJOIN ",
   "solution": "SELECT p.name, SUM(oi.quantity) FROM order_items oi JOIN products p ON p.id = oi.product_id GROUP BY p.id, p.name;",
   "hints": [
    "JOIN-нан кейін <code>GROUP BY p.id, p.name</code>."
   ],
   "check": {
    "mustInclude": [
     "JOIN",
     "GROUP BY"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Қала бойынша тапсырыстар",
   "prompt": "Әр қала бойынша тапсырыстар санын шығарыңыз: клиенттің қаласы және тапсырыс саны.",
   "starter": "SELECT c.city, COUNT(*)\nFROM orders o\nJOIN ",
   "solution": "SELECT c.city, COUNT(*) FROM orders o JOIN customers c ON o.customer_id = c.id GROUP BY c.city;",
   "hints": [
    "Қала <code>customers</code>-та, тапсырыс <code>orders</code>-та: біріктіріп, <code>GROUP BY c.city</code>."
   ],
   "check": {
    "mustInclude": [
     "JOIN",
     "GROUP BY"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Санат табысы",
   "prompt": "Әр санаттың табысын (<code>quantity × price</code> қосындысы) <code>revenue</code> деген атпен, табыстың кемуі бойынша шығарыңыз: <code>category</code>, <code>revenue</code>. Барлық статустағы тапсырыстар саналады.",
   "starter": "SELECT p.category, SUM(oi.quantity * p.price) AS revenue\nFROM order_items oi\nJOIN ",
   "solution": "SELECT p.category, SUM(oi.quantity * p.price) AS revenue FROM order_items oi JOIN products p ON p.id = oi.product_id GROUP BY p.category ORDER BY revenue DESC;",
   "hints": [
    "<code>SUM(oi.quantity * p.price)</code>",
    "<code>GROUP BY p.category ORDER BY revenue DESC</code>"
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "JOIN",
     "GROUP BY"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Ірі тапсырыстар",
   "prompt": "Табысы (<code>quantity × price</code> қосындысы) 200 000 теңгеден асатын тапсырыстардың <code>order_id</code> мен табысын, табыстың кемуі бойынша шығарыңыз.",
   "starter": "SELECT oi.order_id, SUM(oi.quantity * p.price) AS revenue\nFROM order_items oi\nJOIN ",
   "solution": "SELECT oi.order_id, SUM(oi.quantity * p.price) AS revenue FROM order_items oi JOIN products p ON p.id = oi.product_id GROUP BY oi.order_id HAVING SUM(oi.quantity * p.price) > 200000 ORDER BY revenue DESC;",
   "hints": [
    "Топтан кейін сүзу үшін <code>HAVING</code>.",
    "Соңында <code>ORDER BY revenue DESC</code>."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "JOIN",
     "HAVING"
    ]
   }
  }
 ],
 "sql-11": [
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Сатылмаған тауарлар",
   "prompt": "Бірде-бір рет сатылмаған тауарлардың атауын <code>LEFT JOIN</code> арқылы табыңыз.",
   "starter": "SELECT p.name\nFROM products p\nLEFT JOIN ",
   "solution": "SELECT p.name FROM products p LEFT JOIN order_items oi ON oi.product_id = p.id WHERE oi.order_id IS NULL;",
   "hints": [
    "<code>products p LEFT JOIN order_items oi ON oi.product_id = p.id</code>",
    "Жұбы жоқ жолдар: <code>WHERE oi.order_id IS NULL</code>."
   ],
   "check": {
    "mustInclude": [
     "LEFT JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Барлық клиент пен күн",
   "prompt": "Әр клиенттің атын және оның тапсырыс күндерін шығарыңыз. Тапсырысы жоқ клиент те бір рет көрінсін (күні бос болады).",
   "starter": "SELECT c.name, o.order_date\nFROM customers c\nLEFT JOIN ",
   "solution": "SELECT c.name, o.order_date FROM customers c LEFT JOIN orders o ON o.customer_id = c.id;",
   "hints": [
    "Барлық клиент керек болғандықтан, <code>customers</code> сол жақта тұрсын."
   ],
   "check": {
    "mustInclude": [
     "LEFT JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "106-тапсырыс құрамы",
   "prompt": "106-тапсырыс үшін клиенттің атын және тауарлардың атауын шығарыңыз. Төрт кестені біріктіріңіз: <code>orders</code>, <code>customers</code>, <code>order_items</code>, <code>products</code>.",
   "starter": "SELECT c.name, p.name\nFROM orders o\nJOIN customers c ON \nJOIN order_items oi ON \nJOIN products p ON \nWHERE o.id = 106;",
   "solution": "SELECT c.name, p.name FROM orders o JOIN customers c ON c.id = o.customer_id JOIN order_items oi ON oi.order_id = o.id JOIN products p ON p.id = oi.product_id WHERE o.id = 106;",
   "hints": [
    "JOIN-дарды тізбектеп жазыңыз, әрқайсысына өз <code>ON</code> шарты.",
    "Соңында <code>WHERE o.id = 106</code>."
   ],
   "check": {
    "mustInclude": [
     "JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Әр тауар неше рет сатылды",
   "prompt": "Әр тауардың атауын және ол кездескен тапсырыс жолдарының санын шығарыңыз. Сатылмаған тауар 0-мен көрінсін.",
   "starter": "SELECT p.name, COUNT(oi.order_id)\nFROM products p\nLEFT JOIN ",
   "solution": "SELECT p.name, COUNT(oi.order_id) FROM products p LEFT JOIN order_items oi ON oi.product_id = p.id GROUP BY p.id, p.name;",
   "hints": [
    "<code>COUNT(*)</code> емес, <code>COUNT(oi.order_id)</code>: ол NULL-ды санамайды."
   ],
   "check": {
    "mustInclude": [
     "LEFT JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Клиенттің жалпы данасы",
   "prompt": "Әр клиенттің атын және сатып алған тауарларының жалпы дана санын шығарыңыз. Тапсырысы жоқ клиентте 0 тұрсын (<code>COALESCE</code>).",
   "starter": "SELECT c.name, \nFROM customers c\nLEFT JOIN ",
   "solution": "SELECT c.name, COALESCE(SUM(oi.quantity), 0) FROM customers c LEFT JOIN orders o ON o.customer_id = c.id LEFT JOIN order_items oi ON oi.order_id = o.id GROUP BY c.id, c.name;",
   "hints": [
    "Екі <code>LEFT JOIN</code>: customers → orders → order_items.",
    "<code>COALESCE(SUM(oi.quantity), 0)</code>"
   ],
   "check": {
    "mustInclude": [
     "LEFT JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Алматылықтар не алды",
   "prompt": "Алматы клиенттері сатып алған тауарлардың қайталанбайтын атауларын шығарыңыз.",
   "starter": "SELECT DISTINCT p.name\nFROM orders o\nJOIN ",
   "solution": "SELECT DISTINCT p.name FROM orders o JOIN customers c ON c.id = o.customer_id JOIN order_items oi ON oi.order_id = o.id JOIN products p ON p.id = oi.product_id WHERE c.city = 'Алматы';",
   "hints": [
    "Төрт кестені біріктіріп, <code>WHERE c.city = ...</code>.",
    "Қайталанбас үшін <code>DISTINCT</code>."
   ],
   "check": {
    "mustInclude": [
     "JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Санат бойынша сатып алушылар",
   "prompt": "Әр санаттың тауарларын неше түрлі клиент сатып алғанын шығарыңыз: <code>category</code> және бірегей клиенттер саны.",
   "starter": "SELECT p.category, COUNT(DISTINCT o.customer_id)\nFROM orders o\nJOIN ",
   "solution": "SELECT p.category, COUNT(DISTINCT o.customer_id) FROM orders o JOIN order_items oi ON oi.order_id = o.id JOIN products p ON p.id = oi.product_id GROUP BY p.category;",
   "hints": [
    "<code>COUNT(DISTINCT o.customer_id)</code>",
    "orders → order_items → products."
   ],
   "check": {
    "mustInclude": [
     "JOIN",
     "GROUP BY"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Әр клиенттің табысы",
   "prompt": "Әр клиенттің атын және оның барлық тапсырыстарының табысын (<code>quantity × price</code> қосындысы) <code>revenue</code> деген атпен шығарыңыз. Тапсырысы жоқ клиентте 0 тұрсын. Табыстың кемуі бойынша, тең болса, ат бойынша әліпби ретімен сұрыптаңыз.",
   "starter": "SELECT c.name, \nFROM customers c\nLEFT JOIN ",
   "solution": "SELECT c.name, COALESCE(SUM(oi.quantity * p.price), 0) AS revenue FROM customers c LEFT JOIN orders o ON o.customer_id = c.id LEFT JOIN order_items oi ON oi.order_id = o.id LEFT JOIN products p ON p.id = oi.product_id GROUP BY c.id, c.name ORDER BY revenue DESC, c.name;",
   "hints": [
    "Барлық клиент сақталуы үшін тізбектің бәрі <code>LEFT JOIN</code> болсын.",
    "<code>COALESCE(SUM(...), 0)</code> және <code>ORDER BY revenue DESC, c.name</code>."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "LEFT JOIN"
    ]
   }
  }
 ],
 "sql-12": [
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Ең қымбат тауар",
   "prompt": "Бағасы ең жоғары бағаға тең тауардың атауы мен бағасын subquery арқылы табыңыз.",
   "starter": "SELECT name, price\nFROM products\nWHERE price = ",
   "solution": "SELECT name, price FROM products WHERE price = (SELECT MAX(price) FROM products);",
   "hints": [
    "<code>WHERE price = (SELECT MAX(price) FROM products)</code>"
   ],
   "check": {
    "mustInclude": [
     "SELECT MAX"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Жолдағы тапсырыс иелері",
   "prompt": "Статусы <code>shipped</code> тапсырысы бар клиенттердің атын шығарыңыз. <code>IN</code> және subquery қолданыңыз.",
   "starter": "SELECT name\nFROM customers\nWHERE id IN ",
   "solution": "SELECT name FROM customers WHERE id IN (SELECT customer_id FROM orders WHERE status = 'shipped');",
   "hints": [
    "<code>id IN (SELECT customer_id FROM orders WHERE ...)</code>"
   ],
   "check": {
    "mustInclude": [
     "IN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Ең алғашқы тапсырыс",
   "prompt": "Ең ерте күні жасалған тапсырыстың барлық бағандарын шығарыңыз. Subquery қолданыңыз.",
   "starter": "SELECT *\nFROM orders\nWHERE order_date = ",
   "solution": "SELECT * FROM orders WHERE order_date = (SELECT MIN(order_date) FROM orders);",
   "hints": [
    "<code>(SELECT MIN(order_date) FROM orders)</code>"
   ],
   "check": {
    "mustInclude": [
     "SELECT MIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "EXISTS арқылы сатып алушылар",
   "prompt": "Кемінде бір тапсырысы бар клиенттердің атын <code>EXISTS</code> арқылы шығарыңыз.",
   "starter": "SELECT c.name\nFROM customers c\nWHERE ",
   "solution": "SELECT c.name FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);",
   "hints": [
    "<code>WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id)</code>"
   ],
   "check": {
    "mustInclude": [
     "EXISTS"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Кітап сатып алғандар",
   "prompt": "Кемінде бір «Кітаптар» санатындағы тауар сатып алған клиенттердің атын шығарыңыз. JOIN-сыз, тізбектелген <code>IN</code> subquery арқылы жазыңыз.",
   "starter": "SELECT name\nFROM customers\nWHERE id IN ",
   "solution": "SELECT name FROM customers WHERE id IN (SELECT customer_id FROM orders WHERE id IN (SELECT order_id FROM order_items WHERE product_id IN (SELECT id FROM products WHERE category = 'Кітаптар')));",
   "hints": [
    "Ішінен бастаңыз: кітаптардың id → сол кітаптар бар тапсырыстар → сол тапсырыстардың клиенттері."
   ],
   "check": {
    "mustInclude": [
     "IN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Кеңседегі арзандар",
   "prompt": "«Кеңсе» санатындағы, бағасы осы санаттың орташа бағасынан төмен тауарлардың атауы мен бағасын шығарыңыз.",
   "starter": "SELECT name, price\nFROM products\nWHERE category = 'Кеңсе' AND price < ",
   "solution": "SELECT name, price FROM products WHERE category = 'Кеңсе' AND price < (SELECT AVG(price) FROM products WHERE category = 'Кеңсе');",
   "hints": [
    "Subquery ішінде де <code>WHERE category = 'Кеңсе'</code> болуы керек."
   ],
   "check": {
    "mustInclude": [
     "SELECT AVG"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Өз санатынан қымбат",
   "prompt": "Бағасы <b>өз санатының</b> орташа бағасынан жоғары тауарлардың атауы, санаты және бағасын шығарыңыз. Корреляцияланған subquery қолданыңыз.",
   "starter": "SELECT p.name, p.category, p.price\nFROM products p\nWHERE p.price > ",
   "solution": "SELECT p.name, p.category, p.price FROM products p WHERE p.price > (SELECT AVG(p2.price) FROM products p2 WHERE p2.category = p.category);",
   "hints": [
    "Ішкі сұрау сыртқы жолдың санатына сілтейді: <code>WHERE p2.category = p.category</code>."
   ],
   "check": {
    "mustInclude": [
     "SELECT AVG"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Электроника алмағандар",
   "prompt": "Кемінде бір тапсырысы бар, бірақ ешқашан «Электроника» санатындағы тауар алмаған клиенттердің атын шығарыңыз. <code>EXISTS</code> және <code>NOT EXISTS</code> қолданыңыз.",
   "starter": "SELECT c.name\nFROM customers c\nWHERE ",
   "solution": "SELECT c.name FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id) AND NOT EXISTS (SELECT 1 FROM orders o JOIN order_items oi ON oi.order_id = o.id JOIN products p ON p.id = oi.product_id WHERE o.customer_id = c.id AND p.category = 'Электроника');",
   "hints": [
    "Бірінші шарт: <code>EXISTS</code> тапсырыс бар.",
    "Екінші шарт: <code>NOT EXISTS</code> ішінде orders → order_items → products JOIN, <code>p.category = 'Электроника'</code>."
   ],
   "check": {
    "mustInclude": [
     "NOT EXISTS"
    ]
   }
  }
 ],
 "sql-13": [
  {
   "type": "sql",
   "dataset": "empty",
   "level": "easy",
   "xp": 10,
   "title": "Қалалар кестесі",
   "prompt": "Бос дерекқорда <code>cities</code> кестесін құрыңыз: <code>id INTEGER PRIMARY KEY</code>, <code>name TEXT NOT NULL</code>, <code>population INTEGER</code>. Үш жол қосыңыз: (1, 'Алматы', 2200000), (2, 'Астана', 1400000), (3, 'Шымкент', 1200000).",
   "starter": "CREATE TABLE cities (\n  \n);\n\nINSERT INTO cities VALUES ",
   "solution": "CREATE TABLE cities (id INTEGER PRIMARY KEY, name TEXT NOT NULL, population INTEGER); INSERT INTO cities VALUES (1, 'Алматы', 2200000), (2, 'Астана', 1400000), (3, 'Шымкент', 1200000);",
   "hints": [
    "Бір <code>INSERT</code>-пен бірнеше жол: <code>VALUES (...), (...), (...)</code>."
   ],
   "check": {
    "after": "SELECT * FROM cities ORDER BY id;",
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Жаңа клиент",
   "prompt": "<code>customers</code> кестесіне жаңа клиент қосыңыз: id 11, аты Ғалым, қаласы Павлодар, тіркелген күні 2024-12-05.",
   "starter": "INSERT INTO customers (id, name, city, signup_date)\nVALUES ",
   "solution": "INSERT INTO customers (id, name, city, signup_date) VALUES (11, 'Ғалым', 'Павлодар', '2024-12-05');",
   "hints": [
    "<code>INSERT INTO customers (id, name, city, signup_date) VALUES (...)</code>"
   ],
   "check": {
    "after": "SELECT * FROM customers ORDER BY id;",
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Термостың жаңа бағасы",
   "prompt": "Термостың бағасын 10 000 теңгеге өзгертіңіз.",
   "starter": "UPDATE products\nSET ",
   "solution": "UPDATE products SET price = 10000 WHERE name = 'Термос';",
   "hints": [
    "<code>UPDATE products SET price = 10000 WHERE name = 'Термос'</code>",
    "WHERE-ді ұмытпаңыз, әйтпесе барлық тауар өзгереді."
   ],
   "check": {
    "after": "SELECT id, price FROM products ORDER BY id;",
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Көтерме жолдарды өшіру",
   "prompt": "<code>order_items</code> кестесінен саны 5 және одан көп жолдарды өшіріңіз.",
   "starter": "DELETE FROM order_items\nWHERE ",
   "solution": "DELETE FROM order_items WHERE quantity >= 5;",
   "hints": [
    "<code>DELETE FROM order_items WHERE quantity &gt;= 5</code>"
   ],
   "check": {
    "after": "SELECT * FROM order_items ORDER BY order_id, product_id;",
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "empty",
   "level": "medium",
   "xp": 15,
   "title": "DEFAULT мәні",
   "prompt": "Бос дерекқорда <code>students</code> кестесін құрыңыз: <code>id INTEGER PRIMARY KEY</code>, <code>name TEXT NOT NULL</code>, <code>grade INTEGER</code> (әдепкі мәні 1). Сосын тек <code>id</code> мен <code>name</code> беріп, екі оқушы қосыңыз: (1, 'Аружан') және (2, 'Мирас'). Олардың <code>grade</code> мәні өздігінен 1 болуы керек.",
   "starter": "CREATE TABLE students (\n  \n);\n\nINSERT INTO students (id, name) VALUES ",
   "solution": "CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT NOT NULL, grade INTEGER DEFAULT 1); INSERT INTO students (id, name) VALUES (1, 'Аружан'), (2, 'Мирас');",
   "hints": [
    "<code>grade INTEGER DEFAULT 1</code>",
    "INSERT-те бағандарды атаңыз: <code>INSERT INTO students (id, name) VALUES ...</code>"
   ],
   "check": {
    "after": "SELECT * FROM students ORDER BY id;",
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Бос қаланы толтыру",
   "prompt": "Қаласы көрсетілмеген клиенттердің қаласын Павлодар деп жаңартыңыз.",
   "starter": "UPDATE customers\nSET ",
   "solution": "UPDATE customers SET city = 'Павлодар' WHERE city IS NULL;",
   "hints": [
    "NULL-ды <code>IS NULL</code> арқылы табамыз: <code>WHERE city IS NULL</code>."
   ],
   "check": {
    "after": "SELECT id, city FROM customers ORDER BY id;",
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "empty",
   "level": "hard",
   "xp": 20,
   "title": "Мектеп пен оқушылар",
   "prompt": "Бос дерекқорда екі кесте құрыңыз. <code>schools</code>: <code>id INTEGER PRIMARY KEY</code>, <code>name TEXT NOT NULL</code>. <code>pupils</code>: <code>id INTEGER PRIMARY KEY</code>, <code>name TEXT</code>, <code>school_id INTEGER</code> — <code>schools(id)</code>-ға сілтеме (<code>REFERENCES</code>). Мектептер: (1, '№12 мектеп'), (2, 'НЗМ'), (3, '№5 лицей'). Оқушылар: (1, 'Әлия', 1), (2, 'Санжар', 1), (3, 'Томирис', 2).",
   "starter": "CREATE TABLE schools (\n  \n);\n\nCREATE TABLE pupils (\n  \n);\n",
   "solution": "CREATE TABLE schools (id INTEGER PRIMARY KEY, name TEXT NOT NULL); CREATE TABLE pupils (id INTEGER PRIMARY KEY, name TEXT, school_id INTEGER REFERENCES schools(id)); INSERT INTO schools VALUES (1, '№12 мектеп'), (2, 'НЗМ'), (3, '№5 лицей'); INSERT INTO pupils VALUES (1, 'Әлия', 1), (2, 'Санжар', 1), (3, 'Томирис', 2);",
   "hints": [
    "Алдымен <code>schools</code>, сосын оған сілтейтін <code>pupils</code> құрылады.",
    "<code>school_id INTEGER REFERENCES schools(id)</code>"
   ],
   "check": {
    "after": "SELECT s.name, COUNT(p.id) FROM schools s LEFT JOIN pupils p ON p.school_id = s.id GROUP BY s.id ORDER BY s.id;",
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "VIP белгісі",
   "prompt": "<code>customers</code> кестесіне <code>vip INTEGER</code> бағанын әдепкі мәні 0 етіп қосыңыз. Сосын кемінде 2 тапсырысы бар клиенттердің <code>vip</code> мәнін 1 етіңіз (subquery қолданыңыз).",
   "starter": "ALTER TABLE customers ADD COLUMN \n\nUPDATE customers\nSET vip = 1\nWHERE ",
   "solution": "ALTER TABLE customers ADD COLUMN vip INTEGER DEFAULT 0; UPDATE customers SET vip = 1 WHERE id IN (SELECT customer_id FROM orders GROUP BY customer_id HAVING COUNT(*) >= 2);",
   "hints": [
    "<code>ALTER TABLE customers ADD COLUMN vip INTEGER DEFAULT 0;</code>",
    "<code>WHERE id IN (SELECT customer_id FROM orders GROUP BY customer_id HAVING COUNT(*) &gt;= 2)</code>"
   ],
   "check": {
    "after": "SELECT id, vip FROM customers ORDER BY id;",
    "ordered": true
   }
  }
 ],
 "sql-14": [
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "Қымбат тауарлар VIEW",
   "prompt": "<code>expensive_products</code> атты VIEW құрыңыз: бағасы 50 000 теңгеден жоғары тауарлардың <code>name</code> және <code>price</code> бағандары.",
   "starter": "CREATE VIEW expensive_products AS\n",
   "solution": "CREATE VIEW expensive_products AS SELECT name, price FROM products WHERE price > 50000;",
   "hints": [
    "<code>CREATE VIEW expensive_products AS SELECT ...</code>"
   ],
   "check": {
    "after": "SELECT * FROM expensive_products ORDER BY price;",
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "COMMIT-пен бекіту",
   "prompt": "Транзакция ашып, 109-тапсырыстың статусын <code>delivered</code> етіп өзгертіңіз және өзгерісті <code>COMMIT</code> арқылы бекітіңіз.",
   "starter": "BEGIN;\n\n",
   "solution": "BEGIN; UPDATE orders SET status = 'delivered' WHERE id = 109; COMMIT;",
   "hints": [
    "<code>BEGIN;</code> → <code>UPDATE ...;</code> → <code>COMMIT;</code>"
   ],
   "check": {
    "after": "SELECT id, status FROM orders ORDER BY id;",
    "ordered": true,
    "mustInclude": [
     "COMMIT"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "easy",
   "xp": 10,
   "title": "VIEW-ден санау",
   "prompt": "<code>almaty_customers</code> атты VIEW құрыңыз (Алматы клиенттерінің <code>id</code> мен <code>name</code>), сосын сол VIEW-дегі жолдар санын шығарыңыз.",
   "starter": "CREATE VIEW almaty_customers AS\n\n;\nSELECT COUNT(*) FROM almaty_customers;",
   "solution": "CREATE VIEW almaty_customers AS SELECT id, name FROM customers WHERE city = 'Алматы'; SELECT COUNT(*) FROM almaty_customers;",
   "hints": [
    "VIEW кесте сияқты оқылады: <code>SELECT COUNT(*) FROM almaty_customers;</code>"
   ],
   "check": {
    "mustInclude": [
     "CREATE VIEW"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Тапсырысты толық өшіру",
   "prompt": "112-тапсырыс бас тартылған. Бір транзакцияда алдымен оның <code>order_items</code>-тағы жолдарын, сосын <code>orders</code>-тағы жолын өшіріп, <code>COMMIT</code> жасаңыз.",
   "starter": "BEGIN;\n\nCOMMIT;",
   "solution": "BEGIN; DELETE FROM order_items WHERE order_id = 112; DELETE FROM orders WHERE id = 112; COMMIT;",
   "hints": [
    "Екі <code>DELETE</code> бір <code>BEGIN ... COMMIT</code> ішінде.",
    "Алдымен тәуелді кесте (<code>order_items</code>) тазаланады."
   ],
   "check": {
    "after": "SELECT (SELECT COUNT(*) FROM orders), (SELECT COUNT(*) FROM order_items);",
    "mustInclude": [
     "BEGIN",
     "COMMIT"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "SAVEPOINT-қа қайту",
   "prompt": "Транзакцияда: «Кеңсе» тауарларының бағасын 1 000 теңгеге көтеріңіз, сосын <code>SAVEPOINT s1</code> қойыңыз. Кейін қателесіп, сол тауарлардың бағасын 0 етіңіз де, <code>ROLLBACK TO s1</code> арқылы қайтарыңыз. Соңында <code>COMMIT</code>. Нәтижеде тек 1 000 теңгелік көтеру қалуы керек.",
   "starter": "BEGIN;\nUPDATE products SET price = price + 1000 WHERE category = 'Кеңсе';\n\nUPDATE products SET price = 0 WHERE category = 'Кеңсе';\n\nCOMMIT;",
   "solution": "BEGIN; UPDATE products SET price = price + 1000 WHERE category = 'Кеңсе'; SAVEPOINT s1; UPDATE products SET price = 0 WHERE category = 'Кеңсе'; ROLLBACK TO s1; COMMIT;",
   "hints": [
    "<code>ROLLBACK TO s1</code> тек SAVEPOINT-тан кейінгі өзгерісті болдырмайды."
   ],
   "check": {
    "after": "SELECT id, price FROM products ORDER BY id;",
    "ordered": true,
    "mustInclude": [
     "SAVEPOINT",
     "ROLLBACK TO"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "medium",
   "xp": 15,
   "title": "Санат статистикасы VIEW",
   "prompt": "<code>category_stats</code> атты VIEW құрыңыз: әр санат үшін <code>category</code>, тауар саны <code>n</code> және ең жоғары баға <code>max_price</code>.",
   "starter": "CREATE VIEW category_stats AS\n",
   "solution": "CREATE VIEW category_stats AS SELECT category, COUNT(*) AS n, MAX(price) AS max_price FROM products GROUP BY category;",
   "hints": [
    "VIEW ішінде <code>GROUP BY</code> қолдануға болады."
   ],
   "check": {
    "after": "SELECT * FROM category_stats ORDER BY category;",
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "Тапсырыс табысы VIEW",
   "prompt": "<code>order_revenue</code> атты VIEW құрыңыз: әр тапсырыс үшін <code>order_id</code>, клиенттің аты <code>name</code> және табысы <code>revenue</code> (<code>quantity × price</code> қосындысы). orders, customers, order_items, products кестелерін біріктіріңіз.",
   "starter": "CREATE VIEW order_revenue AS\nSELECT o.id AS order_id, c.name, SUM(oi.quantity * p.price) AS revenue\nFROM orders o\n",
   "solution": "CREATE VIEW order_revenue AS SELECT o.id AS order_id, c.name, SUM(oi.quantity * p.price) AS revenue FROM orders o JOIN customers c ON c.id = o.customer_id JOIN order_items oi ON oi.order_id = o.id JOIN products p ON p.id = oi.product_id GROUP BY o.id, c.name;",
   "hints": [
    "VIEW ішіндегі сұрау — кәдімгі SELECT: JOIN және GROUP BY.",
    "Бағандарға <code>AS order_id</code>, <code>AS revenue</code> деп ат беріңіз."
   ],
   "check": {
    "after": "SELECT * FROM order_revenue ORDER BY order_id;",
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "shop",
   "level": "hard",
   "xp": 20,
   "title": "VIEW жаңа деректі көреді",
   "prompt": "<code>delivered_count</code> атты VIEW құрыңыз: <code>delivered</code> тапсырыстар бойынша әр <code>customer_id</code> және сан <code>n</code>. Сосын барлық <code>shipped</code> тапсырысты <code>delivered</code> етіп жаңартыңыз. Соңында VIEW-ді <code>customer_id</code> бойынша сұрыптап шығарыңыз: ол жаңартудан кейінгі деректі көрсетуі керек.",
   "starter": "CREATE VIEW delivered_count AS\n\n;\n\nSELECT * FROM delivered_count ORDER BY customer_id;",
   "solution": "CREATE VIEW delivered_count AS SELECT customer_id, COUNT(*) AS n FROM orders WHERE status = 'delivered' GROUP BY customer_id; UPDATE orders SET status = 'delivered' WHERE status = 'shipped'; SELECT * FROM delivered_count ORDER BY customer_id;",
   "hints": [
    "VIEW дерек сақтамайды: әр оқылғанда сұрау қайта орындалады.",
    "Үш команда: <code>CREATE VIEW</code>, <code>UPDATE</code>, <code>SELECT</code>."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "CREATE VIEW",
     "UPDATE"
    ]
   }
  }
 ]
});
