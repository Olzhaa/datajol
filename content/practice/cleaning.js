// Practice tasks after the lessons of m3-2. Each lesson's list opens one task at a time.
DJ.addPractice('m3-2', {
 "cl-1": [
  {
   "type": "sql",
   "dataset": "raw",
   "level": "easy",
   "xp": 10,
   "title": "Тапсырыстар профилі",
   "prompt": "<p><code>raw_orders</code> кестесі үшін бір жолда шығарыңыз: <code>n</code> (жол саны), <code>null_amount</code> (сомасы бос жолдар), <code>uniq_customers</code> (бірегей <code>customer_id</code> саны).</p>",
   "starter": "",
   "solution": "SELECT COUNT(*) AS n, SUM(amount IS NULL) AS null_amount, COUNT(DISTINCT customer_id) AS uniq_customers FROM raw_orders;",
   "hints": [
    "<code>SUM(amount IS NULL)</code>, <code>COUNT(DISTINCT customer_id)</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "easy",
   "xp": 10,
   "title": "Тіркелу күндерінің ауқымы",
   "prompt": "<p><code>raw_customers</code> кестесінен <code>first_signup</code> (<code>MIN(signup)</code>) және <code>last_signup</code> (<code>MAX(signup)</code>) шығарыңыз. Нәтиже қисынды ма? Неге?</p>",
   "starter": "",
   "solution": "SELECT MIN(signup) AS first_signup, MAX(signup) AS last_signup FROM raw_customers;",
   "hints": [
    "<code>MIN(signup)</code>, <code>MAX(signup)</code>. Күндер мәтін ретінде салыстырылады, сондықтан форматы әртүрлі күндер қате ретке түседі."
   ]
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "easy",
   "xp": 10,
   "title": "Қайталанатын аттар",
   "prompt": "<p><code>raw_customers</code> кестесінде бірнеше рет кездесетін аттарды шығарыңыз: <code>name</code>, <code>n</code>. Аттарды өзгертпей, қалай жазылса солай топтаңыз.</p>",
   "starter": "",
   "solution": "SELECT name, COUNT(*) AS n FROM raw_customers GROUP BY name HAVING COUNT(*) > 1;",
   "hints": [
    "<code>GROUP BY name HAVING COUNT(*) &gt; 1</code>"
   ],
   "check": {
    "mustInclude": [
     "HAVING"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "medium",
   "xp": 15,
   "title": "Бос мәндер пайызы",
   "prompt": "<p><code>raw_customers</code> үшін бір жолда әр бағандағы бос мәндердің үлесін пайызбен шығарыңыз (бір ондық белгі): <code>pct_email</code>, <code>pct_city</code>, <code>pct_phone</code>.</p>",
   "starter": "",
   "solution": "SELECT ROUND(100.0 * SUM(email IS NULL) / COUNT(*), 1) AS pct_email, ROUND(100.0 * SUM(city IS NULL) / COUNT(*), 1) AS pct_city, ROUND(100.0 * SUM(phone IS NULL) / COUNT(*), 1) AS pct_phone FROM raw_customers;",
   "hints": [
    "<code>ROUND(100.0 * SUM(email IS NULL) / COUNT(*), 1)</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "medium",
   "xp": 15,
   "title": "Айлар бойынша тапсырыстар",
   "prompt": "<p><code>raw_orders</code> кестесінде әр айда неше тапсырыс бар: <code>month</code> (<code>order_date</code>-тың алғашқы 7 таңбасы), <code>n</code>. Ай ретімен.</p>",
   "starter": "",
   "solution": "SELECT substr(order_date, 1, 7) AS month, COUNT(*) AS n FROM raw_orders GROUP BY month ORDER BY month;",
   "hints": [
    "<code>substr(order_date, 1, 7)</code>"
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "medium",
   "xp": 15,
   "title": "Толық емес жазбалар",
   "prompt": "<p>Email, қала немесе телефон бағандарының кемінде біреуі бос клиенттерді шығарыңыз: <code>id</code>, <code>name</code>.</p>",
   "starter": "",
   "solution": "SELECT id, name FROM raw_customers WHERE email IS NULL OR city IS NULL OR phone IS NULL;",
   "hints": [
    "Үш шартты <code>OR</code> арқылы біріктіріңіз."
   ]
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "hard",
   "xp": 20,
   "title": "Тапсырысы жоқ клиенттер",
   "prompt": "<p>Бірде-бір тапсырысы жоқ клиенттерді табыңыз: <code>id</code>, <code>name</code>, <code>email</code>. <code>LEFT JOIN</code> қолданыңыз. Нәтижедегі жазбаларға қараңыз: олар кімдер болуы мүмкін?</p>",
   "starter": "",
   "solution": "SELECT c.id, c.name, c.email FROM raw_customers c LEFT JOIN raw_orders o ON o.customer_id = c.id WHERE o.id IS NULL;",
   "hints": [
    "<code>LEFT JOIN raw_orders o ON o.customer_id = c.id</code>",
    "Сәйкес тапсырыс жоқ жолдарда <code>o.id IS NULL</code>."
   ],
   "check": {
    "mustInclude": [
     "LEFT JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "hard",
   "xp": 20,
   "title": "Бағандар профилі бір кестеде",
   "prompt": "<p><code>raw_customers</code> бағандарының профилін бір кестеде шығарыңыз: <code>col</code> (бағанның аты: <code>email</code>, <code>city</code>, <code>phone</code>), <code>nulls</code> (бос мәндер), <code>uniq</code> (бірегей мәндер). Үш сұрауды <code>UNION ALL</code> арқылы біріктіріңіз.</p>",
   "starter": "",
   "solution": "SELECT 'email' AS col, SUM(email IS NULL) AS nulls, COUNT(DISTINCT email) AS uniq FROM raw_customers UNION ALL SELECT 'city', SUM(city IS NULL), COUNT(DISTINCT city) FROM raw_customers UNION ALL SELECT 'phone', SUM(phone IS NULL), COUNT(DISTINCT phone) FROM raw_customers;",
   "hints": [
    "Әр бөлік: <code>SELECT 'email' AS col, SUM(email IS NULL) AS nulls, COUNT(DISTINCT email) AS uniq FROM raw_customers</code>.",
    "Бөліктердің арасына <code>UNION ALL</code>."
   ],
   "check": {
    "mustInclude": [
     "UNION ALL"
    ]
   }
  }
 ],
 "cl-2": [
  {
   "type": "sql",
   "dataset": "raw",
   "level": "easy",
   "xp": 10,
   "title": "Email орнына белгі",
   "prompt": "<p>Әр клиенттің <code>id</code>, <code>name</code> және <code>email</code> бағанын шығарыңыз. Email бос болса, <code>email жоқ</code> деп жазылсын.</p>",
   "starter": "",
   "solution": "SELECT id, name, COALESCE(email, 'email жоқ') AS email FROM raw_customers;",
   "hints": [
    "<code>COALESCE(email, 'email жоқ')</code>"
   ],
   "check": {
    "mustInclude": [
     "COALESCE"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бос мәндерді санау",
   "prompt": "<p><code>count_missing(xs)</code> функциясы тізімдегі бос мәндерді санасын: <code>None</code> да, бос немесе тек бос орыннан тұратын мәтін де (<code>\"\"</code>, <code>\"  \"</code>) бос саналады. Мысалы, <code>count_missing([\"Алматы\", None, \"\", \" \", \"Астана\"])</code> → <code>3</code>.</p>",
   "starter": "def count_missing(xs):\n    pass\n",
   "solution": "def count_missing(xs):\n    return sum(1 for x in xs if x is None or (isinstance(x, str) and x.strip() == \"\"))\n",
   "hints": [
    "<code>x is None</code> немесе <code>x.strip() == \"\"</code>.",
    "Сан үшін <code>strip</code> жоқ: алдымен <code>isinstance(x, str)</code> тексеріңіз."
   ],
   "check": {
    "tests": "assert count_missing([\"Алматы\", None, \"\", \" \", \"Астана\"]) == 3, \"count_missing(['Алматы', None, '', ' ', 'Астана']) 3 болуы керек\"\nassert count_missing([1, 2, None]) == 1, \"Сандар тізімінде None ғана бос: 1\"\nassert count_missing([]) == 0, \"Бос тізім: 0\""
   }
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "easy",
   "xp": 10,
   "title": "Сомасы жоқ тапсырыстар",
   "prompt": "<p><code>raw_orders</code> кестесінен сомасы бос тапсырыстарды шығарыңыз: <code>id</code>, <code>customer_id</code>, <code>order_date</code>.</p>",
   "starter": "",
   "solution": "SELECT id, customer_id, order_date FROM raw_orders WHERE amount IS NULL;",
   "hints": [
    "<code>WHERE amount IS NULL</code> (<code>= NULL</code> жұмыс істемейді)."
   ]
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Белгісізбен толтыру",
   "prompt": "<p><code>fill_unknown(cities)</code> функциясы <b>жаңа</b> тізім қайтарсын: <code>None</code> және бос мәтін (бос орындармен бірге) <code>\"Белгісіз\"</code> болсын, қалғаны өзгермесін. Мысалы, <code>fill_unknown([\"Алматы\", None, \" \"])</code> → <code>[\"Алматы\", \"Белгісіз\", \"Белгісіз\"]</code>.</p>",
   "starter": "def fill_unknown(cities):\n    pass\n",
   "solution": "def fill_unknown(cities):\n    return [\"Белгісіз\" if c is None or c.strip() == \"\" else c for c in cities]\n",
   "hints": [
    "<code>c is None or c.strip() == \"\"</code> шартын қолданыңыз (реті маңызды: алдымен None)."
   ],
   "check": {
    "tests": "_src = [\"Алматы\", None, \" \", \"Ақтөбе\", \"\"]\n_r = fill_unknown(_src)\nassert _r == [\"Алматы\", \"Белгісіз\", \"Белгісіз\", \"Ақтөбе\", \"Белгісіз\"], f\"Нәтиже дұрыс емес: {_r}\"\nassert _src == [\"Алматы\", None, \" \", \"Ақтөбе\", \"\"], \"Бастапқы тізімді өзгертпеңіз\""
   }
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "medium",
   "xp": 15,
   "title": "Бос қала белгісі",
   "prompt": "<p>Әр клиент үшін <code>id</code>, <code>city</code> және <code>city_missing</code> шығарыңыз: қала <code>NULL</code> немесе бос мәтін болса 1, әйтпесе 0.</p>",
   "starter": "",
   "solution": "SELECT id, city, (city IS NULL OR TRIM(city) = '') AS city_missing FROM raw_customers;",
   "hints": [
    "<code>(city IS NULL OR TRIM(city) = '')</code> өрнегі 1 не 0 береді."
   ]
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Модамен толтыру",
   "prompt": "<p>Категориялық бағанды модамен толтырамыз. <code>fill_mode(xs)</code> функциясы <code>None</code> мәндерін қалған мәндердің модасымен (<code>statistics.mode</code>) ауыстырған жаңа тізім қайтарсын. Мысалы, <code>fill_mode([\"iOS\", None, \"Android\", \"iOS\"])</code> → <code>[\"iOS\", \"iOS\", \"Android\", \"iOS\"]</code>.</p>",
   "starter": "import statistics\n\ndef fill_mode(xs):\n    pass\n",
   "solution": "import statistics\n\ndef fill_mode(xs):\n    m = statistics.mode([x for x in xs if x is not None])\n    return [m if x is None else x for x in xs]\n",
   "hints": [
    "Модаға <code>None</code>-ды кіргізбеңіз: алдымен сүзіңіз."
   ],
   "check": {
    "tests": "assert fill_mode([\"iOS\", None, \"Android\", \"iOS\"]) == [\"iOS\", \"iOS\", \"Android\", \"iOS\"], \"fill_mode(['iOS', None, 'Android', 'iOS']) дұрыс емес\"\nassert fill_mode([None, \"Астана\", \"Алматы\", \"Астана\", None]) == [\"Астана\", \"Астана\", \"Алматы\", \"Астана\", \"Астана\"], \"Модасы Астана болуы керек\"\nassert fill_mode([\"a\", \"b\"]) == [\"a\", \"b\"], \"Бос мән жоқ болса, өзгермейді\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Толтыру және белгі қою",
   "prompt": "<p><code>fill_with_flag(rows, key)</code> функциясы сөздіктер тізімін алып, <b>жаңа</b> сөздіктер тізімін қайтарсын: <code>key</code> бағанындағы <code>None</code> мәндері қалғандарының медианасымен толтырылсын, әрі әр жолға <code>key + \"_missing\"</code> кілті қосылсын (<code>True</code>, егер бастапқыда бос болса). Бастапқы сөздіктер өзгермеуі керек.</p><p>Мысалы, <code>[{\"id\": 1, \"age\": 30}, {\"id\": 2, \"age\": None}, {\"id\": 3, \"age\": 40}]</code> → екінші жол <code>{\"id\": 2, \"age\": 35.0, \"age_missing\": True}</code>.</p>",
   "starter": "import statistics\n\ndef fill_with_flag(rows, key):\n    pass\n",
   "solution": "import statistics\n\ndef fill_with_flag(rows, key):\n    med = statistics.median([r[key] for r in rows if r[key] is not None])\n    out = []\n    for r in rows:\n        new = dict(r)\n        new[key + \"_missing\"] = r[key] is None\n        if r[key] is None:\n            new[key] = med\n        out.append(new)\n    return out\n",
   "hints": [
    "Көшірме: <code>new = dict(r)</code>.",
    "Белгіні толтырудан <b>бұрын</b> қойыңыз."
   ],
   "check": {
    "tests": "_rows = [{\"id\": 1, \"age\": 30}, {\"id\": 2, \"age\": None}, {\"id\": 3, \"age\": 40}]\n_r = fill_with_flag(_rows, \"age\")\nassert _r == [{\"id\": 1, \"age\": 30, \"age_missing\": False}, {\"id\": 2, \"age\": 35, \"age_missing\": True}, {\"id\": 3, \"age\": 40, \"age_missing\": False}], f\"Нәтиже дұрыс емес: {_r}\"\nassert _rows[1] == {\"id\": 2, \"age\": None}, \"Бастапқы сөздіктерді өзгертпеңіз: dict(r) арқылы көшірме жасаңыз\""
   }
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "hard",
   "xp": 20,
   "title": "Қала бойынша бос байланыстар",
   "prompt": "<p>Қала бойынша байланыс деректерінің толықтығын тексеріңіз: <code>city</code> (бос болса <code>Белгісіз</code>), <code>n</code> (клиенттер саны), <code>no_contact</code> (email немесе телефоны бос клиенттер саны). Қаланы өзгертпей (TRIM-сыз) топтаңыз.</p>",
   "starter": "",
   "solution": "SELECT COALESCE(city, 'Белгісіз') AS city, COUNT(*) AS n, SUM(email IS NULL OR phone IS NULL) AS no_contact FROM raw_customers GROUP BY COALESCE(city, 'Белгісіз');",
   "hints": [
    "<code>GROUP BY COALESCE(city, 'Белгісіз')</code>",
    "<code>SUM(email IS NULL OR phone IS NULL)</code>"
   ],
   "check": {
    "mustInclude": [
     "COALESCE"
    ]
   }
  }
 ],
 "cl-3": [
  {
   "type": "sql",
   "dataset": "raw",
   "level": "easy",
   "xp": 10,
   "title": "Телефондағы бос орындар",
   "prompt": "<p>Телефоны бар клиенттердің <code>id</code> және бос орындары алынған <code>phone</code> бағанын шығарыңыз.</p>",
   "starter": "",
   "solution": "SELECT id, REPLACE(phone, ' ', '') AS phone FROM raw_customers WHERE phone IS NOT NULL;",
   "hints": [
    "<code>REPLACE(phone, ' ', '')</code>"
   ],
   "check": {
    "mustInclude": [
     "REPLACE"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Атты тазалау",
   "prompt": "<p><code>clean_name(s)</code> функциясы атты тазаласын: басы мен соңындағы бос орындарды алып, бірінші әрпін бас әріп, қалғанын кіші әріп етсін (<code>str.capitalize()</code>). Мысалы, <code>clean_name(\"  айГЕРІМ \")</code> → <code>\"Айгерім\"</code>.</p>",
   "starter": "def clean_name(s):\n    pass\n",
   "solution": "def clean_name(s):\n    return s.strip().capitalize()\n",
   "hints": [
    "<code>s.strip().capitalize()</code>"
   ],
   "check": {
    "tests": "assert clean_name(\"  айГЕРІМ \") == \"Айгерім\", \"clean_name('  айГЕРІМ ') Айгерім болуы керек\"\nassert clean_name(\"НҰРЛАН\") == \"Нұрлан\", \"clean_name('НҰРЛАН') Нұрлан болуы керек\"\nassert clean_name(\"Дана\") == \"Дана\", \"Таза ат өзгермейді\""
   }
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "easy",
   "xp": 10,
   "title": "Қаланың барлық нұсқалары",
   "prompt": "<p>Бос орындары алынған қала атауларының бірегей тізімін шығарыңыз: <code>city</code> (<code>TRIM</code>, <code>DISTINCT</code>). Бос қалаларды қоспаңыз.</p>",
   "starter": "",
   "solution": "SELECT DISTINCT TRIM(city) AS city FROM raw_customers WHERE city IS NOT NULL;",
   "hints": [
    "<code>SELECT DISTINCT TRIM(city) ...</code>"
   ],
   "check": {
    "mustInclude": [
     "TRIM"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қала сөздігімен тазалау",
   "prompt": "<p><code>clean_city(s)</code> функциясы қаланы <code>CITY_MAP</code> арқылы стандарттасын: кілт — бос орынсыз, кіші әріпті мәтін. Сөздікте жоқ болса, бос орыны алынған мәтінді қайтарсын; <code>None</code> → <code>None</code>.</p>",
   "starter": "CITY_MAP = {\"алматы\": \"Алматы\", \"almaty\": \"Алматы\", \"астана\": \"Астана\", \"astana\": \"Астана\", \"шымкент\": \"Шымкент\", \"shymkent\": \"Шымкент\"}\n\ndef clean_city(s):\n    pass\n",
   "solution": "CITY_MAP = {\"алматы\": \"Алматы\", \"almaty\": \"Алматы\", \"астана\": \"Астана\", \"astana\": \"Астана\", \"шымкент\": \"Шымкент\", \"shymkent\": \"Шымкент\"}\n\ndef clean_city(s):\n    if s is None:\n        return None\n    s = s.strip()\n    return CITY_MAP.get(s.lower(), s)\n",
   "hints": [
    "<code>CITY_MAP.get(s.strip().lower(), s.strip())</code>"
   ],
   "check": {
    "tests": "assert clean_city(\" АЛМАТЫ \") == \"Алматы\", \"clean_city(' АЛМАТЫ ') Алматы болуы керек\"\nassert clean_city(\"Shymkent\") == \"Шымкент\", \"clean_city('Shymkent') Шымкент болуы керек\"\nassert clean_city(\"Ақтөбе \") == \"Ақтөбе\", \"Сөздікте жоқ қала: Ақтөбе (бос орынсыз)\"\nassert clean_city(None) is None, \"None → None\""
   }
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "medium",
   "xp": 15,
   "title": "Тазаланған қалалар саны",
   "prompt": "<p>Қалаларды біріктіріп, әрқайсысында неше клиент бар екенін шығарыңыз: <code>city_clean</code>, <code>n</code>. Ережелер: <code>Алматы</code>, <code>алматы</code>, <code>Almaty</code> → <code>Алматы</code>; <code>Астана</code>, <code>Astana</code> → <code>Астана</code>; қалғаны <code>TRIM</code> жасалған күйі (бос қала да бір топ болып шығады).</p>",
   "starter": "",
   "solution": "SELECT CASE WHEN TRIM(city) IN ('Алматы', 'алматы', 'Almaty') THEN 'Алматы' WHEN TRIM(city) IN ('Астана', 'Astana') THEN 'Астана' ELSE TRIM(city) END AS city_clean, COUNT(*) AS n FROM raw_customers GROUP BY city_clean;",
   "hints": [
    "CASE өрнегіне <code>AS city_clean</code> атын беріп, <code>GROUP BY city_clean</code>."
   ],
   "check": {
    "mustInclude": [
     "CASE"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Телефон дұрыс па",
   "prompt": "<p><code>valid_phone(p)</code> функциясы телефоннан тек цифрларды қалдырып (<code>re.sub(r\"\\D\", \"\", p)</code>), басындағы <code>8</code>-ді <code>7</code>-ге ауыстырсын да, нөмір <code>7</code>-ден басталып, барлығы 11 цифр болса <code>True</code>, әйтпесе <code>False</code> қайтарсын. <code>None</code> → <code>False</code>.</p>",
   "starter": "import re\n\ndef valid_phone(p):\n    pass\n",
   "solution": "import re\n\ndef valid_phone(p):\n    if p is None:\n        return False\n    d = re.sub(r\"\\D\", \"\", p)\n    if d.startswith(\"8\"):\n        d = \"7\" + d[1:]\n    return d.startswith(\"7\") and len(d) == 11\n",
   "hints": [
    "<code>len(d) == 11</code> және <code>d.startswith(\"7\")</code>."
   ],
   "check": {
    "tests": "assert valid_phone(\"8 (701) 333-44-55\") is True, \"8 (701) 333-44-55 дұрыс нөмір\"\nassert valid_phone(\"+7 701 111 2233\") is True, \"+7 701 111 2233 дұрыс нөмір\"\nassert valid_phone(\"8701222\") is False, \"Цифрлар аз: False\"\nassert valid_phone(\"+1 202 555 0147\") is False, \"+1-ден басталатын нөмір: False\"\nassert valid_phone(None) is False, \"None → False\""
   }
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "hard",
   "xp": 20,
   "title": "Телефонды бір форматқа",
   "prompt": "<p>Телефоны бар клиенттер үшін <code>id</code> және <code>phone_clean</code> шығарыңыз: бос орын, жақша, сызықша және <code>+</code> алынсын, басындағы <code>8</code> <code>7</code>-ге ауыстырылсын, соңында алдына <code>+</code> қойылсын. Мысалы, <code>8 (701) 333-44-55</code> → <code>+77013334455</code>.</p>",
   "starter": "",
   "solution": "WITH d AS (SELECT id, REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(phone, ' ', ''), '(', ''), ')', ''), '-', ''), '+', '') AS digits FROM raw_customers WHERE phone IS NOT NULL) SELECT id, '+' || CASE WHEN substr(digits, 1, 1) = '8' THEN '7' || substr(digits, 2) ELSE digits END AS phone_clean FROM d;",
   "hints": [
    "Бірнеше <code>REPLACE</code>-ті бір-бірінің ішіне салыңыз.",
    "Бірінші цифр: <code>substr(digits, 1, 1)</code>, қалғаны: <code>substr(digits, 2)</code>. Мәтінді <code>||</code> біріктіреді."
   ],
   "check": {
    "mustInclude": [
     "REPLACE",
     "CASE"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Қалалар бойынша есеп",
   "prompt": "<p><code>city_counts(cities)</code> функциясы қалалар тізімін тазалап, <code>{таза_қала: саны}</code> сөздігін қайтарсын. Тазалау: <code>strip</code>, сосын кіші әріппен <code>CITY_MAP</code>-тан іздеу (табылмаса strip жасалған мәтін). <code>None</code> және бос мәтінді есепке алмаңыз.</p>",
   "starter": "CITY_MAP = {\"алматы\": \"Алматы\", \"almaty\": \"Алматы\", \"астана\": \"Астана\", \"astana\": \"Астана\"}\n\ndef city_counts(cities):\n    pass\n",
   "solution": "CITY_MAP = {\"алматы\": \"Алматы\", \"almaty\": \"Алматы\", \"астана\": \"Астана\", \"astana\": \"Астана\"}\n\ndef city_counts(cities):\n    out = {}\n    for c in cities:\n        if c is None or c.strip() == \"\":\n            continue\n        c = c.strip()\n        c = CITY_MAP.get(c.lower(), c)\n        out[c] = out.get(c, 0) + 1\n    return out\n",
   "hints": [
    "Алдымен бос мәндерді <code>continue</code> арқылы өткізіп жіберіңіз.",
    "Санау: <code>out[c] = out.get(c, 0) + 1</code>."
   ],
   "check": {
    "tests": "_c = [\"Алматы\", \"алматы\", \"Almaty \", \"АСТАНА\", None, \"Ақтөбе\", \"\", \"astana\", \"Қарағанды \"]\n_r = city_counts(_c)\nassert _r == {\"Алматы\": 3, \"Астана\": 2, \"Ақтөбе\": 1, \"Қарағанды\": 1}, f\"Нәтиже дұрыс емес: {_r}\""
   }
  }
 ],
 "cl-4": [
  {
   "type": "sql",
   "dataset": "raw",
   "level": "easy",
   "xp": 10,
   "title": "Қайталанған аттар",
   "prompt": "<p>Бос орындарын алып тастағанда бірнеше рет кездесетін аттарды шығарыңыз: <code>name</code> (<code>TRIM</code>), <code>n</code>.</p>",
   "starter": "",
   "solution": "SELECT TRIM(name) AS name, COUNT(*) AS n FROM raw_customers GROUP BY TRIM(name) HAVING COUNT(*) > 1;",
   "hints": [
    "<code>GROUP BY TRIM(name) HAVING COUNT(*) &gt; 1</code>"
   ],
   "check": {
    "mustInclude": [
     "HAVING"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "easy",
   "xp": 10,
   "title": "Email-дер есебі",
   "prompt": "<p>Бір жолда шығарыңыз: <code>n</code> (барлық жол), <code>with_email</code> (email-і бар жолдар, <code>COUNT(email)</code>), <code>uniq_email</code> (регистрге қарамай бірегей email-дер).</p>",
   "starter": "",
   "solution": "SELECT COUNT(*) AS n, COUNT(email) AS with_email, COUNT(DISTINCT LOWER(email)) AS uniq_email FROM raw_customers;",
   "hints": [
    "<code>COUNT(DISTINCT LOWER(email))</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "easy",
   "xp": 10,
   "title": "Қайталанған телефондар",
   "prompt": "<p>Дәл бірдей жазылған телефондарды табыңыз: <code>phone</code>, <code>n</code> (тек 1-ден көп). Бос телефондарды қоспаңыз.</p>",
   "starter": "",
   "solution": "SELECT phone, COUNT(*) AS n FROM raw_customers WHERE phone IS NOT NULL GROUP BY phone HAVING COUNT(*) > 1;",
   "hints": [
    "<code>WHERE phone IS NOT NULL GROUP BY phone HAVING COUNT(*) &gt; 1</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "medium",
   "xp": 15,
   "title": "Дубликат жазбалардың өзі",
   "prompt": "<p>Email-і (регистрге қарамай) басқа жазбамен қайталанатын барлық клиенттерді шығарыңыз: <code>id</code>, <code>name</code>, <code>email</code>. Кіші әріптегі email, сосын <code>id</code> бойынша сұрыптаңыз.</p>",
   "starter": "",
   "solution": "SELECT id, name, email FROM raw_customers WHERE LOWER(email) IN (SELECT LOWER(email) FROM raw_customers WHERE email IS NOT NULL GROUP BY LOWER(email) HAVING COUNT(*) > 1) ORDER BY LOWER(email), id;",
   "hints": [
    "Ішкі сұрау қайталанған email-дерді береді (сабақтағы 1-қадам).",
    "<code>WHERE LOWER(email) IN (...)</code>"
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "medium",
   "xp": 15,
   "title": "Артық жазбалар саны",
   "prompt": "<p>Email-і бар жолдардың ішінде неше жазба артық (дубликат)? Бір мән шығарыңыз: <code>extra</code> = жолдар саны − бірегей email саны (регистрге қарамай).</p>",
   "starter": "",
   "solution": "SELECT COUNT(*) - COUNT(DISTINCT LOWER(email)) AS extra FROM raw_customers WHERE email IS NOT NULL;",
   "hints": [
    "<code>COUNT(*) - COUNT(DISTINCT LOWER(email))</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "medium",
   "xp": 15,
   "title": "Ең соңғы жазбаны қалдыру",
   "prompt": "<p>Бұл жолы әр email үшін ең <b>үлкен</b> <code>id</code>-ге ие (ең соңғы тіркелген) жазбаны қалдырыңыз. Email-і бар клиенттердің <code>id</code>, <code>name</code> және кіші әріптегі <code>email</code>-ін шығарыңыз.</p>",
   "starter": "",
   "solution": "SELECT id, name, LOWER(email) AS email FROM (SELECT id, name, email, ROW_NUMBER() OVER (PARTITION BY LOWER(email) ORDER BY id DESC) AS rn FROM raw_customers WHERE email IS NOT NULL) WHERE rn = 1;",
   "hints": [
    "<code>ORDER BY id DESC</code> ішінде <code>ROW_NUMBER()</code>."
   ],
   "check": {
    "mustInclude": [
     "ROW_NUMBER"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "hard",
   "xp": 20,
   "title": "Телефон бойынша дубликат",
   "prompt": "<p>Телефонды бір түрге келтірген соң дубликаттарды табыңыз. Тазалау: бос орын, жақша, сызықша, <code>+</code> алынсын, басындағы <code>8</code> → <code>7</code>. Шығарыңыз: <code>phone_clean</code> (тек цифрлар), <code>n</code> (тек 1-ден көп).</p>",
   "starter": "",
   "solution": "WITH d AS (SELECT REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(phone, ' ', ''), '(', ''), ')', ''), '-', ''), '+', '') AS digits FROM raw_customers WHERE phone IS NOT NULL), c AS (SELECT CASE WHEN substr(digits, 1, 1) = '8' THEN '7' || substr(digits, 2) ELSE digits END AS phone_clean FROM d) SELECT phone_clean, COUNT(*) AS n FROM c GROUP BY phone_clean HAVING COUNT(*) > 1;",
   "hints": [
    "Алдымен CTE-де тазалаңыз (бірнеше <code>REPLACE</code> және <code>CASE</code>), сосын <code>GROUP BY ... HAVING</code>."
   ],
   "check": {
    "mustInclude": [
     "HAVING"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "hard",
   "xp": 20,
   "title": "Тапсырысты негізгі жазбаға",
   "prompt": "<p>Компания әр клиенттің ең соңғы тіркелген жазбасын қалдыруды шешті. Дубликатты өшірмес бұрын тапсырыстарды сол жазбаға ауыстырамыз. Әр тапсырыс үшін <code>id</code>, <code>customer_id</code> және <code>keep_id</code> шығарыңыз: клиенттің email-імен (регистрге қарамай) бірдей жазбалардың ең үлкен <code>id</code>-і. Клиенттің email-і бос болса, <code>keep_id = customer_id</code>.</p>",
   "starter": "",
   "solution": "SELECT o.id, o.customer_id, COALESCE((SELECT MAX(c2.id) FROM raw_customers c2 WHERE LOWER(c2.email) = LOWER(c.email)), o.customer_id) AS keep_id FROM raw_orders o JOIN raw_customers c ON c.id = o.customer_id;",
   "hints": [
    "<code>raw_orders</code> мен <code>raw_customers</code>-ті JOIN жасаңыз.",
    "Ішкі сұрау: <code>SELECT MAX(c2.id) FROM raw_customers c2 WHERE LOWER(c2.email) = LOWER(c.email)</code>, бос email үшін <code>COALESCE</code>."
   ],
   "check": {
    "mustInclude": [
     "COALESCE"
    ]
   }
  }
 ],
 "cl-5": [
  {
   "type": "sql",
   "dataset": "raw",
   "level": "easy",
   "xp": 10,
   "title": "Ірі тапсырыстар",
   "prompt": "<p>Сомасын санға айналдырып, 10 000-нан үлкен тапсырыстарды шығарыңыз: <code>id</code>, <code>amount_num</code>.</p>",
   "starter": "",
   "solution": "SELECT id, CAST(REPLACE(amount, ' ', '') AS INTEGER) AS amount_num FROM raw_orders WHERE CAST(REPLACE(amount, ' ', '') AS INTEGER) > 10000;",
   "hints": [
    "<code>CAST(REPLACE(amount, ' ', '') AS INTEGER)</code> өрнегін <code>WHERE</code>-де де қолданыңыз."
   ],
   "check": {
    "mustInclude": [
     "CAST"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Мәтінді санға айналдыру",
   "prompt": "<p><code>to_int(s)</code> функциясы бос орындары бар мәтінді бүтін санға айналдырсын: <code>\"12 500\"</code> → <code>12500</code>. Айналмаса (<code>\"abc\"</code>) немесе <code>None</code> берілсе, <code>None</code> қайтарсын.</p>",
   "starter": "def to_int(s):\n    pass\n",
   "solution": "def to_int(s):\n    if s is None:\n        return None\n    try:\n        return int(s.replace(\" \", \"\"))\n    except ValueError:\n        return None\n",
   "hints": [
    "<code>try: int(...) except ValueError: return None</code>"
   ],
   "check": {
    "tests": "assert to_int(\"12 500\") == 12500, \"to_int('12 500') 12500 болуы керек\"\nassert to_int(\"-500\") == -500, \"to_int('-500') -500 болуы керек\"\nassert to_int(\"abc\") is None, \"to_int('abc') None болуы керек\"\nassert to_int(None) is None, \"to_int(None) None болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Нүктелі күнді ISO-ға",
   "prompt": "<p><code>dmy_to_iso(s)</code> функциясы <code>DD.MM.YYYY</code> күнін <code>YYYY-MM-DD</code> мәтініне айналдырсын. Мысалы, <code>dmy_to_iso(\"15.02.2024\")</code> → <code>\"2024-02-15\"</code>.</p>",
   "starter": "from datetime import datetime\n\ndef dmy_to_iso(s):\n    pass\n",
   "solution": "from datetime import datetime\n\ndef dmy_to_iso(s):\n    return datetime.strptime(s, \"%d.%m.%Y\").strftime(\"%Y-%m-%d\")\n",
   "hints": [
    "<code>datetime.strptime(s, \"%d.%m.%Y\").strftime(\"%Y-%m-%d\")</code>"
   ],
   "check": {
    "tests": "assert dmy_to_iso(\"15.02.2024\") == \"2024-02-15\", \"dmy_to_iso('15.02.2024') 2024-02-15 болуы керек\"\nassert dmy_to_iso(\"01.12.2023\") == \"2023-12-01\", \"dmy_to_iso('01.12.2023') 2023-12-01 болуы керек\""
   }
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "medium",
   "xp": 15,
   "title": "Күн форматтарын санау",
   "prompt": "<p><code>signup</code> бағанында қандай форматтар бар? <code>fmt</code> және <code>n</code> шығарыңыз. <code>fmt</code>: <code>signup GLOB '[0-9][0-9][0-9][0-9]-*'</code> болса <code>ISO</code>, ішінде нүкте болса (<code>LIKE '%.%'</code>) <code>нүкте</code>, әйтпесе <code>басқа</code>.</p>",
   "starter": "",
   "solution": "SELECT CASE WHEN signup GLOB '[0-9][0-9][0-9][0-9]-*' THEN 'ISO' WHEN signup LIKE '%.%' THEN 'нүкте' ELSE 'басқа' END AS fmt, COUNT(*) AS n FROM raw_customers GROUP BY fmt;",
   "hints": [
    "CASE өрнегіне <code>AS fmt</code> атын беріп, <code>GROUP BY fmt</code>."
   ],
   "check": {
    "mustInclude": [
     "GLOB"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жарамды сомалар қосындысы",
   "prompt": "<p><code>total_amount(values)</code> функциясы мәтін сомалар тізімінен санға айналатындарын (бос орындары алынған соң) қосып, қосындыны қайтарсын. <code>None</code> және айналмайтын мәндер өткізіліп жіберіледі. Мысалы, <code>total_amount([\"12 500\", None, \"abc\", \"8000\"])</code> → <code>20500</code>.</p>",
   "starter": "def total_amount(values):\n    pass\n",
   "solution": "def total_amount(values):\n    total = 0\n    for v in values:\n        if v is None:\n            continue\n        try:\n            total += int(v.replace(\" \", \"\"))\n        except ValueError:\n            pass\n    return total\n",
   "hints": [
    "Циклде <code>try / except ValueError</code>."
   ],
   "check": {
    "tests": "assert total_amount([\"12 500\", None, \"abc\", \"8000\"]) == 20500, \"total_amount(['12 500', None, 'abc', '8000']) 20500 болуы керек\"\nassert total_amount([]) == 0, \"Бос тізім: 0\"\nassert total_amount([\"7 200\", \"-200\"]) == 7000, \"Теріс сан да сан: 7000\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Екі күннің арасы",
   "prompt": "<p><code>days_between(a, b)</code> функциясы <code>DD.MM.YYYY</code> форматындағы екі күннің арасындағы күн санын қайтарсын (<code>b − a</code>). Екі <code>datetime</code>-ті азайтсаңыз, нәтиженің <code>.days</code> қасиеті күн санын береді. Мысалы, <code>days_between(\"25.12.2024\", \"01.01.2025\")</code> → <code>7</code>.</p>",
   "starter": "from datetime import datetime\n\ndef days_between(a, b):\n    pass\n",
   "solution": "from datetime import datetime\n\ndef days_between(a, b):\n    d1 = datetime.strptime(a, \"%d.%m.%Y\")\n    d2 = datetime.strptime(b, \"%d.%m.%Y\")\n    return (d2 - d1).days\n",
   "hints": [
    "<code>(d2 - d1).days</code>"
   ],
   "check": {
    "tests": "assert days_between(\"25.12.2024\", \"01.01.2025\") == 7, \"days_between('25.12.2024', '01.01.2025') 7 болуы керек\"\nassert days_between(\"01.02.2024\", \"01.03.2024\") == 29, \"2024 жылы ақпан 29 күн: 29\"\nassert days_between(\"10.05.2024\", \"10.05.2024\") == 0, \"Бір күн: 0\""
   }
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "hard",
   "xp": 20,
   "title": "Күндерді ISO-ға келтіру",
   "prompt": "<p>Әр клиенттің <code>id</code> және <code>signup_iso</code> бағанын шығарыңыз: <code>DD.MM.YYYY</code> күндері <code>substr</code> арқылы <code>YYYY-MM-DD</code>-ге айналсын, <code>YYYY/MM/DD</code> күндерінде <code>/</code> → <code>-</code>, ISO күндері өзгермесін.</p>",
   "starter": "",
   "solution": "SELECT id, CASE WHEN signup LIKE '%.%' THEN substr(signup, 7, 4) || '-' || substr(signup, 4, 2) || '-' || substr(signup, 1, 2) WHEN signup LIKE '%/%' THEN REPLACE(signup, '/', '-') ELSE signup END AS signup_iso FROM raw_customers;",
   "hints": [
    "<code>15.02.2024</code>: жыл <code>substr(signup, 7, 4)</code>, ай <code>substr(signup, 4, 2)</code>, күн <code>substr(signup, 1, 2)</code>.",
    "Бөліктерді <code>||</code> арқылы біріктіріңіз."
   ],
   "check": {
    "mustInclude": [
     "CASE"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "hard",
   "xp": 20,
   "title": "Айлық таза сома",
   "prompt": "<p>Тек дұрыс сандарды есептеңіз: бос орындары алынған сома тек цифрлардан тұрса (<code>NOT GLOB '*[^0-9]*'</code>) және 0-ден үлкен болса. Әр ай үшін <code>month</code> (YYYY-MM) және <code>total</code> шығарыңыз, ай ретімен.</p>",
   "starter": "",
   "solution": "WITH o AS (SELECT substr(order_date, 1, 7) AS month, REPLACE(amount, ' ', '') AS a FROM raw_orders WHERE amount IS NOT NULL) SELECT month, SUM(CAST(a AS INTEGER)) AS total FROM o WHERE a NOT GLOB '*[^0-9]*' AND CAST(a AS INTEGER) > 0 GROUP BY month ORDER BY month;",
   "hints": [
    "CTE-де <code>REPLACE(amount, ' ', '') AS a</code> және айды бөліп алыңыз.",
    "Сыртында <code>WHERE a NOT GLOB '*[^0-9]*'</code>, сосын <code>GROUP BY month</code>."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "GLOB"
    ]
   }
  }
 ],
 "cl-6": [
  {
   "type": "sql",
   "dataset": "raw",
   "level": "easy",
   "xp": 10,
   "title": "Теріс сомалар",
   "prompt": "<p>Сомасы (санға айналдырылған) нөлден кіші тапсырыстарды шығарыңыз: <code>id</code>, <code>amount</code> (бастапқы мәтін).</p>",
   "starter": "",
   "solution": "SELECT id, amount FROM raw_orders WHERE CAST(REPLACE(amount, ' ', '') AS INTEGER) < 0;",
   "hints": [
    "<code>WHERE CAST(REPLACE(amount, ' ', '') AS INTEGER) &lt; 0</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "easy",
   "xp": 10,
   "title": "Тым үлкен тапсырыстар",
   "prompt": "<p>Бизнес шегі: бір тапсырыс 200 000 ₸-ден аспайды. Шектен асқан тапсырыстарды шығарыңыз: <code>id</code>, <code>customer_id</code>, <code>amount_num</code>.</p>",
   "starter": "",
   "solution": "SELECT id, customer_id, CAST(REPLACE(amount, ' ', '') AS INTEGER) AS amount_num FROM raw_orders WHERE CAST(REPLACE(amount, ' ', '') AS INTEGER) > 200000;",
   "hints": [
    "Алдымен санға айналдырыңыз, сосын <code>&gt; 200000</code>."
   ]
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "easy",
   "xp": 10,
   "title": "Сома бар ма",
   "prompt": "<p>Әр тапсырыс үшін <code>id</code> және <code>has_amount</code> шығарыңыз: сома бос болса <code>жоқ</code>, әйтпесе <code>бар</code>.</p>",
   "starter": "",
   "solution": "SELECT id, CASE WHEN amount IS NULL THEN 'жоқ' ELSE 'бар' END AS has_amount FROM raw_orders;",
   "hints": [
    "<code>CASE WHEN amount IS NULL THEN 'жоқ' ELSE 'бар' END</code>"
   ],
   "check": {
    "mustInclude": [
     "CASE"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "medium",
   "xp": 15,
   "title": "Белгілер бойынша санау",
   "prompt": "<p>Сабақтағы ережелермен (NULL → <code>жоқ</code>; ≤ 0 → <code>қате</code>; &gt; 200 000 → <code>күдікті</code>; әйтпесе <code>ok</code>) әр белгіде неше тапсырыс бар екенін шығарыңыз: <code>flag</code>, <code>n</code>.</p>",
   "starter": "WITH o AS (\n  SELECT id, customer_id, amount, CAST(REPLACE(amount, ' ', '') AS INTEGER) AS amount_num\n  FROM raw_orders\n)\nSELECT ",
   "solution": "WITH o AS (SELECT id, customer_id, amount, CAST(REPLACE(amount, ' ', '') AS INTEGER) AS amount_num FROM raw_orders) SELECT CASE WHEN amount IS NULL THEN 'жоқ' WHEN amount_num <= 0 THEN 'қате' WHEN amount_num > 200000 THEN 'күдікті' ELSE 'ok' END AS flag, COUNT(*) AS n FROM o GROUP BY flag;",
   "hints": [
    "CTE-де <code>amount_num</code>, сыртында CASE және <code>GROUP BY flag</code>."
   ],
   "check": {
    "mustInclude": [
     "CASE"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "medium",
   "xp": 15,
   "title": "Таза орташа чек",
   "prompt": "<p>Тек <code>ok</code> белгісі бар тапсырыстардың (сома бар, 0-ден үлкен, 200 000-нан аспайды) орташа сомасын <code>avg_ok</code> бір мәнмен шығарыңыз.</p>",
   "starter": "",
   "solution": "WITH o AS (SELECT id, customer_id, amount, CAST(REPLACE(amount, ' ', '') AS INTEGER) AS amount_num FROM raw_orders) SELECT AVG(amount_num) AS avg_ok FROM o WHERE amount IS NOT NULL AND amount_num > 0 AND amount_num <= 200000;",
   "hints": [
    "Үш шартты <code>AND</code> арқылы біріктіріңіз."
   ]
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "medium",
   "xp": 15,
   "title": "Мәселелі тапсырыс иелері",
   "prompt": "<p>Кемінде бір тапсырысы <code>ok</code> емес (сома жоқ, ≤ 0 немесе 200 000-нан көп) клиенттерді шығарыңыз: <code>id</code>, <code>name</code> (<code>TRIM</code>). Әр клиент бір рет.</p>",
   "starter": "",
   "solution": "WITH o AS (SELECT id, customer_id, amount, CAST(REPLACE(amount, ' ', '') AS INTEGER) AS amount_num FROM raw_orders) SELECT DISTINCT c.id, TRIM(c.name) AS name FROM raw_customers c JOIN o ON o.customer_id = c.id WHERE CASE WHEN amount IS NULL THEN 'жоқ' WHEN amount_num <= 0 THEN 'қате' WHEN amount_num > 200000 THEN 'күдікті' ELSE 'ok' END <> 'ok';",
   "hints": [
    "CTE-ні <code>raw_customers</code>-пен JOIN жасаңыз.",
    "<code>DISTINCT</code> бір клиентті бір рет қалдырады."
   ]
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "hard",
   "xp": 20,
   "title": "Мәселелі жолдар үлесі",
   "prompt": "<p><code>ok</code> емес тапсырыстардың үлесін пайызбен <code>bad_pct</code> (бір ондық белгі) бір мәнмен шығарыңыз. Екі CTE қолданыңыз: біріншісінде <code>amount_num</code>, екіншісінде <code>flag</code>.</p>",
   "starter": "",
   "solution": "WITH o AS (SELECT id, customer_id, amount, CAST(REPLACE(amount, ' ', '') AS INTEGER) AS amount_num FROM raw_orders), f AS (SELECT CASE WHEN amount IS NULL THEN 'жоқ' WHEN amount_num <= 0 THEN 'қате' WHEN amount_num > 200000 THEN 'күдікті' ELSE 'ok' END AS flag FROM o) SELECT ROUND(100.0 * SUM(flag <> 'ok') / COUNT(*), 1) AS bad_pct FROM f;",
   "hints": [
    "Екінші CTE: <code>f AS (SELECT CASE ... END AS flag FROM o)</code>.",
    "<code>ROUND(100.0 * SUM(flag &lt;&gt; 'ok') / COUNT(*), 1)</code>"
   ],
   "check": {
    "mustInclude": [
     "WITH"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "raw",
   "level": "hard",
   "xp": 20,
   "title": "Клиент бойынша сапа",
   "prompt": "<p>Әр клиент (<code>customer_id</code>) үшін шығарыңыз: <code>orders</code> (тапсырыстар саны), <code>bad</code> (<code>ok</code> емес тапсырыстар), <code>ok_total</code> (тек <code>ok</code> тапсырыстардың сомасы, жоқ болса 0). <code>customer_id</code> ретімен.</p>",
   "starter": "",
   "solution": "WITH o AS (SELECT id, customer_id, amount, CAST(REPLACE(amount, ' ', '') AS INTEGER) AS amount_num FROM raw_orders), f AS (SELECT customer_id, amount_num, CASE WHEN amount IS NULL THEN 'жоқ' WHEN amount_num <= 0 THEN 'қате' WHEN amount_num > 200000 THEN 'күдікті' ELSE 'ok' END AS flag FROM o) SELECT customer_id, COUNT(*) AS orders, SUM(flag <> 'ok') AS bad, COALESCE(SUM(CASE WHEN flag = 'ok' THEN amount_num END), 0) AS ok_total FROM f GROUP BY customer_id ORDER BY customer_id;",
   "hints": [
    "Шартты қосынды: <code>SUM(CASE WHEN flag = 'ok' THEN amount_num END)</code>.",
    "Бос нәтижені <code>COALESCE(..., 0)</code> 0-ге айналдырады."
   ],
   "check": {
    "ordered": true
   }
  }
 ],
 "cl-7": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "CSV жолдарын санау",
   "prompt": "<p><code>count_rows(text)</code> функциясы CSV мәтініндегі дерек жолдарының санын қайтарсын (тақырып жолын санамай). <code>csv.DictReader</code> қолданыңыз.</p>",
   "starter": "import csv, io\n\ndef count_rows(text):\n    pass\n",
   "solution": "import csv, io\n\ndef count_rows(text):\n    return sum(1 for _ in csv.DictReader(io.StringIO(text)))\n",
   "hints": [
    "<code>for row in csv.DictReader(io.StringIO(text))</code>"
   ],
   "check": {
    "tests": "assert count_rows(\"city,amount\\nАлматы,1\\nАстана,2\") == 2, \"2 дерек жолы бар\"\nassert count_rows(\"a,b\\n1,2\\n3,4\\n5,6\") == 3, \"3 дерек жолы бар\"\nassert count_rows(\"a,b\") == 0, \"Тек тақырып: 0\"",
    "mustInclude": [
     "DictReader"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бағанды тізімге алу",
   "prompt": "<p><code>column(text, name)</code> функциясы CSV-дегі <code>name</code> бағанының мәндерін (мәтін күйінде) ретімен тізіммен қайтарсын. Мысалы, <code>column(\"city,amount\\nАлматы,12000\\nАстана,8000\", \"city\")</code> → <code>[\"Алматы\", \"Астана\"]</code>.</p>",
   "starter": "import csv, io\n\ndef column(text, name):\n    pass\n",
   "solution": "import csv, io\n\ndef column(text, name):\n    return [row[name] for row in csv.DictReader(io.StringIO(text))]\n",
   "hints": [
    "<code>[row[name] for row in ...]</code>"
   ],
   "check": {
    "tests": "_t = \"city,amount\\nАлматы,12000\\nАстана,8000\"\nassert column(_t, \"city\") == [\"Алматы\", \"Астана\"], \"city бағаны: ['Алматы', 'Астана']\"\nassert column(_t, \"amount\") == [\"12000\", \"8000\"], \"amount мәндері мәтін күйінде: ['12000', '8000']\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бірегей қалалар",
   "prompt": "<p><code>unique_cities(text)</code> функциясы CSV-дегі <code>city</code> бағанының бірегей мәндерін әліпби ретімен (<code>sorted</code>) тізіммен қайтарсын.</p>",
   "starter": "import csv, io\n\ndef unique_cities(text):\n    pass\n",
   "solution": "import csv, io\n\ndef unique_cities(text):\n    return sorted({row[\"city\"] for row in csv.DictReader(io.StringIO(text))})\n",
   "hints": [
    "Бірегей мәндерге <code>set</code>, сосын <code>sorted(...)</code>."
   ],
   "check": {
    "tests": "_t = \"city,amount\\nАлматы,12000\\nАстана,8000\\nАлматы,2000\\nШымкент,6000\\nАстана,10000\\nАлматы,9000\\nАстана,7000\"\nassert unique_cities(_t) == sorted([\"Алматы\", \"Астана\", \"Шымкент\"]), f\"Нәтиже дұрыс емес: {unique_cities(_t)}\"\nassert unique_cities(\"city\\nА\\nА\") == [\"А\"], \"Қайталанған мән бір рет\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қала бойынша медиана",
   "prompt": "<p>Шеткі мәндер болса, медиана сенімдірек. <code>median_by_city(text)</code> функциясы <code>{қала: amount медианасы}</code> сөздігін қайтарсын (<code>statistics.median</code>). Сомалар — мәтін, оларды <code>int</code>-ке айналдырыңыз.</p>",
   "starter": "import csv, io, statistics\n\ndef median_by_city(text):\n    pass\n",
   "solution": "import csv, io, statistics\n\ndef median_by_city(text):\n    groups = {}\n    for row in csv.DictReader(io.StringIO(text)):\n        groups.setdefault(row[\"city\"], []).append(int(row[\"amount\"]))\n    return {c: statistics.median(v) for c, v in groups.items()}\n",
   "hints": [
    "Әр қаланың сомаларын тізімге жинаңыз: <code>groups.setdefault(city, []).append(...)</code>."
   ],
   "check": {
    "tests": "_t = \"city,amount\\nАлматы,12000\\nАстана,8000\\nАлматы,2000\\nШымкент,6000\\nАстана,10000\\nАлматы,9000\\nАстана,7000\"\n_r = median_by_city(_t)\nassert _r == {\"Алматы\": 9000, \"Астана\": 8000, \"Шымкент\": 6000}, f\"Алматы 9000, Астана 8000, Шымкент 6000 болуы керек, сізде {_r}\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Демалыс күнгі чек",
   "prompt": "<p>CSV-де <code>day</code> (апта күні) және <code>amount</code> бағандары бар. <code>weekend_check(text)</code> функциясы <code>{\"демалыс\": медиана, \"жұмыс\": медиана}</code> сөздігін қайтарсын: <code>сенбі</code> мен <code>жексенбі</code> — демалыс, қалғаны — жұмыс күні.</p>",
   "starter": "import csv, io, statistics\n\ndef weekend_check(text):\n    pass\n",
   "solution": "import csv, io, statistics\n\ndef weekend_check(text):\n    groups = {\"демалыс\": [], \"жұмыс\": []}\n    for row in csv.DictReader(io.StringIO(text)):\n        key = \"демалыс\" if row[\"day\"] in (\"сенбі\", \"жексенбі\") else \"жұмыс\"\n        groups[key].append(int(row[\"amount\"]))\n    return {k: statistics.median(v) for k, v in groups.items()}\n",
   "hints": [
    "<code>row[\"day\"] in (\"сенбі\", \"жексенбі\")</code>"
   ],
   "check": {
    "tests": "_t = \"day,amount\\nдүйсенбі,2000\\nсенбі,3000\\nсәрсенбі,2200\\nжексенбі,2800\\nжұма,40000\\nсенбі,2900\"\n_r = weekend_check(_t)\nassert _r == {\"демалыс\": 2900, \"жұмыс\": 2200}, f\"демалыс 2900, жұмыс 2200 болуы керек, сізде {_r}\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең көп табыс әкелген қала",
   "prompt": "<p><code>top_city(text)</code> функциясы <code>amount</code> қосындысы ең үлкен қаланы және оның қосындысын <code>(қала, қосынды)</code> жұбымен қайтарсын.</p>",
   "starter": "import csv, io\n\ndef top_city(text):\n    pass\n",
   "solution": "import csv, io\n\ndef top_city(text):\n    totals = {}\n    for row in csv.DictReader(io.StringIO(text)):\n        totals[row[\"city\"]] = totals.get(row[\"city\"], 0) + int(row[\"amount\"])\n    best = max(totals, key=lambda c: totals[c])\n    return (best, totals[best])\n",
   "hints": [
    "Алдымен қала бойынша қосындылар сөздігі.",
    "<code>max(totals, key=lambda c: totals[c])</code>"
   ],
   "check": {
    "tests": "_t = \"city,amount\\nАлматы,12000\\nАстана,8000\\nАлматы,2000\\nШымкент,6000\\nАстана,10000\\nАлматы,9000\\nАстана,7000\"\nassert top_city(_t) == (\"Астана\", 25000), f\"('Астана', 25000) күтілді, сізде {top_city(_t)}\"\nassert top_city(\"city,amount\\nАқтау,5\") == (\"Ақтау\", 5), \"Бір жол: ('Ақтау', 5)\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Өскен айлар",
   "prompt": "<p>CSV-де <code>date</code> (YYYY-MM-DD) және <code>amount</code> бар. <code>growth_months(text)</code> функциясы айлық қосындыны есептеп, табысы алдыңғы айдан <b>үлкен</b> болған айлардың (YYYY-MM) тізімін ай ретімен қайтарсын. Бірінші айды салыстыратын ай жоқ, сондықтан ол тізімге кірмейді.</p>",
   "starter": "import csv, io\n\ndef growth_months(text):\n    pass\n",
   "solution": "import csv, io\n\ndef growth_months(text):\n    totals = {}\n    for row in csv.DictReader(io.StringIO(text)):\n        m = row[\"date\"][:7]\n        totals[m] = totals.get(m, 0) + int(row[\"amount\"])\n    months = sorted(totals)\n    return [months[i] for i in range(1, len(months)) if totals[months[i]] > totals[months[i - 1]]]\n",
   "hints": [
    "Ай: <code>row[\"date\"][:7]</code>.",
    "Айларды <code>sorted</code> етіп, көрші айларды индекспен салыстырыңыз."
   ],
   "check": {
    "tests": "_t = \"date,amount\\n2024-03-02,500\\n2024-01-05,100\\n2024-02-10,300\\n2024-02-20,100\\n2024-03-15,100\\n2024-04-01,200\"\nassert growth_months(_t) == [\"2024-02\", \"2024-03\"], f\"['2024-02', '2024-03'] күтілді, сізде {growth_months(_t)}\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "EDA қысқа есебі",
   "prompt": "<p><code>eda_summary(text)</code> функциясы <code>city,amount</code> CSV-і бойынша сөздік қайтарсын:</p><ul><li><code>n</code> — жолдар саны;</li><li><code>mean</code> — орташа сома (бүтінге дейін <code>round</code>);</li><li><code>median</code> — медиана;</li><li><code>top_city</code> — сомасының <b>медианасы</b> ең үлкен қала.</li></ul>",
   "starter": "import csv, io, statistics\n\ndef eda_summary(text):\n    pass\n",
   "solution": "import csv, io, statistics\n\ndef eda_summary(text):\n    rows = list(csv.DictReader(io.StringIO(text)))\n    amounts = [int(r[\"amount\"]) for r in rows]\n    groups = {}\n    for r in rows:\n        groups.setdefault(r[\"city\"], []).append(int(r[\"amount\"]))\n    top = max(groups, key=lambda c: statistics.median(groups[c]))\n    return {\"n\": len(rows), \"mean\": round(statistics.mean(amounts)), \"median\": statistics.median(amounts), \"top_city\": top}\n",
   "hints": [
    "Жолдарды бір рет <code>list(...)</code> етіп сақтаңыз, сосын бірнеше рет қолданасыз.",
    "Қаланы таңдау: <code>max(groups, key=lambda c: statistics.median(groups[c]))</code>."
   ],
   "check": {
    "tests": "_t = \"city,amount\\nАлматы,12000\\nАстана,8000\\nАлматы,2000\\nШымкент,6000\\nАстана,10000\\nАлматы,9000\\nАстана,7000\\nШымкент,40000\"\n_r = eda_summary(_t)\nassert isinstance(_r, dict), \"Сөздік қайтарыңыз\"\nassert _r.get(\"n\") == 8, \"n = 8 болуы керек\"\nassert _r.get(\"mean\") == 11750, \"mean = 11750 болуы керек\"\nassert _r.get(\"median\") == 8500, \"median = 8500 болуы керек\"\nassert _r.get(\"top_city\") == \"Шымкент\", \"Медианасы ең үлкен қала: Шымкент\""
   }
  }
 ],
 "cl-8": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Теңге белгісі бар сома",
   "prompt": "<p><code>clean_amount(s)</code> функциясы <code>\"12 500 ₸\"</code> сияқты мәтінді санға айналдырсын: бос орындар мен <code>₸</code> белгісін алып, тек цифрлар қалса <code>int</code>, әйтпесе <code>None</code> қайтарсын. <code>None</code> берілсе де <code>None</code>.</p>",
   "starter": "def clean_amount(s):\n    pass\n",
   "solution": "def clean_amount(s):\n    s = (s or \"\").replace(\" \", \"\").replace(\"₸\", \"\")\n    return int(s) if s.isdigit() else None\n",
   "hints": [
    "<code>(s or \"\")</code> None-ды бос жолға айналдырады.",
    "<code>s.isdigit()</code>"
   ],
   "check": {
    "tests": "assert clean_amount(\"12 500 ₸\") == 12500, \"clean_amount('12 500 ₸') 12500 болуы керек\"\nassert clean_amount(\"8000\") == 8000, \"clean_amount('8000') 8000 болуы керек\"\nassert clean_amount(\"abc\") is None, \"clean_amount('abc') None болуы керек\"\nassert clean_amount(\"\") is None and clean_amount(None) is None, \"Бос мән → None\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Аттағы артық бос орындар",
   "prompt": "<p><code>clean_name(s)</code> функциясы аттың басындағы, соңындағы және ортасындағы артық бос орындарды алып тастасын: сөздер арасында бір ғана бос орын қалсын. Мысалы, <code>clean_name(\"  Айгерім   Сапарова \")</code> → <code>\"Айгерім Сапарова\"</code>.</p>",
   "starter": "def clean_name(s):\n    pass\n",
   "solution": "def clean_name(s):\n    return \" \".join(s.split())\n",
   "hints": [
    "<code>s.split()</code> бос орындар бойынша бөледі, <code>\" \".join(...)</code> қайта біріктіреді."
   ],
   "check": {
    "tests": "assert clean_name(\"  Айгерім   Сапарова \") == \"Айгерім Сапарова\", \"clean_name('  Айгерім   Сапарова ') Айгерім Сапарова болуы керек\"\nassert clean_name(\"Дана\") == \"Дана\", \"Таза ат өзгермейді\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Шымкент нұсқалары",
   "prompt": "<p><code>CITY_MAP</code>-қа Шымкент нұсқалары қосылды. <code>clean_city(s)</code> функциясы қаланы strip жасап, кіші әріппен сөздіктен іздесін; табылмаса strip жасалған мәтінді қайтарсын.</p>",
   "starter": "CITY_MAP = {\"алматы\": \"Алматы\", \"almaty\": \"Алматы\", \"астана\": \"Астана\", \"astana\": \"Астана\", \"шымкент\": \"Шымкент\", \"shymkent\": \"Шымкент\"}\n\ndef clean_city(s):\n    pass\n",
   "solution": "CITY_MAP = {\"алматы\": \"Алматы\", \"almaty\": \"Алматы\", \"астана\": \"Астана\", \"astana\": \"Астана\", \"шымкент\": \"Шымкент\", \"shymkent\": \"Шымкент\"}\n\ndef clean_city(s):\n    key = s.strip().lower()\n    return CITY_MAP.get(key, s.strip())\n",
   "hints": [
    "<code>CITY_MAP.get(key, s.strip())</code>"
   ],
   "check": {
    "tests": "assert clean_city(\" SHYMKENT\") == \"Шымкент\", \"clean_city(' SHYMKENT') Шымкент болуы керек\"\nassert clean_city(\"ШЫМКЕНТ \") == \"Шымкент\", \"clean_city('ШЫМКЕНТ ') Шымкент болуы керек\"\nassert clean_city(\" Тараз \") == \"Тараз\", \"Сөздікте жоқ: Тараз\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Тасталған жолдар саны",
   "prompt": "<p><code>count_dropped(text)</code> функциясы <code>name,city,amount</code> CSV-інде сомасы жарамсыз (бос, мәтін, нөл немесе теріс) жолдардың санын қайтарсын. Бос орындарды алып тастаған соң санға айналатын оң сома — жарамды.</p>",
   "starter": "import csv, io\n\ndef count_dropped(text):\n    pass\n",
   "solution": "import csv, io\n\ndef count_dropped(text):\n    dropped = 0\n    for row in csv.DictReader(io.StringIO(text)):\n        raw = (row[\"amount\"] or \"\").replace(\" \", \"\")\n        try:\n            ok = int(raw) > 0\n        except ValueError:\n            ok = False\n        if not ok:\n            dropped += 1\n    return dropped\n",
   "hints": [
    "<code>try: int(raw) except ValueError</code>",
    "Нөл мен теріс сан да жарамсыз."
   ],
   "check": {
    "tests": "_t = \"name,city,amount\\nАйгерім,алматы,12 500\\nДана,Almaty,\\nЕржан,Шымкент,-300\\nТимур,Ақтөбе,abc\\nӘсем,astana,7 200\\nБек,Тараз,0\"\nassert count_dropped(_t) == 4, f\"4 жол тасталуы керек, сізде {count_dropped(_t)}\"\nassert count_dropped(\"name,city,amount\\nА,Б,100\") == 0, \"Жарамды жол тасталмайды\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Тазалау есебі",
   "prompt": "<p><code>clean_report(text)</code> функциясы <code>{\"in\": кірген_жолдар, \"out\": таза_жолдар, \"dropped_pct\": тасталған_үлес}</code> сөздігін қайтарсын. Таза жол — сомасы оң бүтін сан (бос орындары алынған соң). <code>dropped_pct</code> — пайыз, 1 ондық белгіге дейін <code>round</code>.</p>",
   "starter": "import csv, io\n\ndef clean_report(text):\n    pass\n",
   "solution": "import csv, io\n\ndef clean_report(text):\n    n_in, n_out = 0, 0\n    for row in csv.DictReader(io.StringIO(text)):\n        n_in += 1\n        raw = (row[\"amount\"] or \"\").replace(\" \", \"\")\n        try:\n            if int(raw) > 0:\n                n_out += 1\n        except ValueError:\n            pass\n    return {\"in\": n_in, \"out\": n_out, \"dropped_pct\": round((n_in - n_out) * 100 / n_in, 1)}\n",
   "hints": [
    "Екі санауыш: кірген және таза жолдар.",
    "<code>round((n_in - n_out) * 100 / n_in, 1)</code>"
   ],
   "check": {
    "tests": "_t = \"name,city,amount\\nАйгерім,алматы,12 500\\nДана,Almaty,\\nЕржан,Шымкент,-300\\nӘсем,astana,7 200\\nНұрлан,Астана,9000\\nБек,Тараз,1 000\"\n_r = clean_report(_t)\nassert _r == {\"in\": 6, \"out\": 4, \"dropped_pct\": 33.3}, f\"{{'in': 6, 'out': 4, 'dropped_pct': 33.3}} күтілді, сізде {_r}\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қала бойынша таза сома",
   "prompt": "<p><code>totals_by_city(text)</code> функциясы <code>name,city,amount</code> CSV-ін тазалап, <code>{таза_қала: сома_қосындысы}</code> сөздігін қайтарсын. Қала <code>CITY_MAP</code> арқылы (strip, кіші әріп; табылмаса strip жасалған мәтін), сомасы жарамсыз жолдар (бос, мәтін, ≤ 0) тасталады.</p>",
   "starter": "import csv, io\n\nCITY_MAP = {\"алматы\": \"Алматы\", \"almaty\": \"Алматы\", \"астана\": \"Астана\", \"astana\": \"Астана\"}\n\ndef totals_by_city(text):\n    pass\n",
   "solution": "import csv, io\n\nCITY_MAP = {\"алматы\": \"Алматы\", \"almaty\": \"Алматы\", \"астана\": \"Астана\", \"astana\": \"Астана\"}\n\ndef totals_by_city(text):\n    out = {}\n    for row in csv.DictReader(io.StringIO(text)):\n        raw = (row[\"amount\"] or \"\").replace(\" \", \"\")\n        try:\n            amount = int(raw)\n        except ValueError:\n            continue\n        if amount <= 0:\n            continue\n        city = row[\"city\"].strip()\n        city = CITY_MAP.get(city.lower(), city)\n        out[city] = out.get(city, 0) + amount\n    return out\n",
   "hints": [
    "Сабақтағы <code>clean_rows</code> логикасы, бірақ тізімнің орнына сөздікке қосасыз."
   ],
   "check": {
    "tests": "_t = \"name,city,amount\\nАйгерім,алматы,12 500\\nНұрлан,АСТАНА,8000\\nДана,Almaty,\\nЕржан, Almaty ,3 000\\nТимур, Ақтөбе ,abc\\nӘсем,astana,7 200\\nБек,Ақтөбе,4000\"\n_r = totals_by_city(_t)\nassert _r == {\"Алматы\": 15500, \"Астана\": 15200, \"Ақтөбе\": 4000}, f\"Нәтиже дұрыс емес: {_r}\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Дубликатсыз таза жолдар",
   "prompt": "<p><code>clean_unique(text)</code> функциясы <code>name,city,amount</code> CSV-ін тазалап, <code>{\"name\", \"city\", \"amount\"}</code> сөздіктерінің тізімін қайтарсын (ат — <code>strip</code>, қала — <code>CITY_MAP</code> арқылы, сома — <code>int</code>; жарамсыз сома тасталады). Бір ат (кіші әріппен салыстырғанда) бірнеше рет кездессе, тек <b>бірінші</b> таза жолы қалсын.</p>",
   "starter": "import csv, io\n\nCITY_MAP = {\"алматы\": \"Алматы\", \"almaty\": \"Алматы\", \"астана\": \"Астана\", \"astana\": \"Астана\"}\n\ndef clean_unique(text):\n    pass\n",
   "solution": "import csv, io\n\nCITY_MAP = {\"алматы\": \"Алматы\", \"almaty\": \"Алматы\", \"астана\": \"Астана\", \"astana\": \"Астана\"}\n\ndef clean_unique(text):\n    out, seen = [], set()\n    for row in csv.DictReader(io.StringIO(text)):\n        raw = (row[\"amount\"] or \"\").replace(\" \", \"\")\n        try:\n            amount = int(raw)\n        except ValueError:\n            continue\n        if amount <= 0:\n            continue\n        name = row[\"name\"].strip()\n        if name.lower() in seen:\n            continue\n        seen.add(name.lower())\n        city = row[\"city\"].strip()\n        out.append({\"name\": name, \"city\": CITY_MAP.get(city.lower(), city), \"amount\": amount})\n    return out\n",
   "hints": [
    "Көрілген аттарды <code>seen = set()</code> ішінде кіші әріппен сақтаңыз.",
    "Дубликатты соманы тексергеннен <b>кейін</b> тексеріңіз: жарамсыз жол «бірінші» болып саналмайды."
   ],
   "check": {
    "tests": "_t = \"name,city,amount\\n Айгерім ,алматы,12 500\\nНұрлан,АСТАНА,abc\\nАЙГЕРІМ,Almaty,12 500\\nНұрлан,astana,8000\\nДана,Ақтөбе,5000\"\n_r = clean_unique(_t)\nassert isinstance(_r, list), \"Тізім қайтарыңыз\"\nassert _r == [{\"name\": \"Айгерім\", \"city\": \"Алматы\", \"amount\": 12500}, {\"name\": \"Нұрлан\", \"city\": \"Астана\", \"amount\": 8000}, {\"name\": \"Дана\", \"city\": \"Ақтөбе\", \"amount\": 5000}], f\"Нәтиже дұрыс емес: {_r}\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Сөздікке кірмеген қалалар",
   "prompt": "<p>Тазалағаннан кейін тексеру: <code>unknown_cities(text, city_map)</code> функциясы CSV-дегі қалалардың ішінен сөздікте <b>кілт ретінде</b> де (кіші әріппен), <b>стандарт мән ретінде</b> де жоқтарын (strip жасалған күйінде) бірегей, әліпби ретімен тізіммен қайтарсын. Бұлар — сөздікке қосу керек жаңа нұсқалар.</p>",
   "starter": "import csv, io\n\ndef unknown_cities(text, city_map):\n    pass\n",
   "solution": "import csv, io\n\ndef unknown_cities(text, city_map):\n    known = set(city_map.values())\n    out = set()\n    for row in csv.DictReader(io.StringIO(text)):\n        c = row[\"city\"].strip()\n        if c.lower() not in city_map and c not in known:\n            out.add(c)\n    return sorted(out)\n",
   "hints": [
    "Стандарт мәндер: <code>set(city_map.values())</code>.",
    "Бірегей мәндерді <code>set</code>-ке жинап, соңында <code>sorted</code>."
   ],
   "check": {
    "tests": "_m = {\"алматы\": \"Алматы\", \"almaty\": \"Алматы\", \"астана\": \"Астана\", \"astana\": \"Астана\"}\n_t = \"name,city,amount\\nА,алматы,1\\nБ,Алматы,2\\nВ, Nur-Sultan ,3\\nГ,Алмата,4\\nД,ASTANA,5\\nЕ,Nur-Sultan,6\"\n_r = unknown_cities(_t, _m)\nassert _r == sorted([\"Nur-Sultan\", \"Алмата\"]), f\"Жаңа нұсқалар: Nur-Sultan, Алмата; сізде {_r}\""
   }
  }
 ]
});
