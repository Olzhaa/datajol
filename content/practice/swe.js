// Practice tasks after the lessons of m6-1, m6-2. Each lesson's list opens one task at a time.
DJ.addPractice('m6-1', {
 "swe-1": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Телефон нөмірін тазалау",
   "prompt": "<p><code>clean_phone(text)</code> функциясын жазыңыз: мәтіннен тек цифрларды қалдырып, жол ретінде қайтарсын. Мысалы, <code>\"+7 (701) 123-45-67\"</code> → <code>\"77011234567\"</code>. Нәтиже <code>return</code> арқылы қайтарылсын.</p>",
   "starter": "def clean_phone(text):\n    pass\n",
   "solution": "def clean_phone(text):\n    \"\"\"Мәтіннен тек цифрларды қалдырады.\"\"\"\n    return ''.join(ch for ch in text if ch.isdigit())\n\nprint(clean_phone('+7 (701) 123-45-67'))\n",
   "hints": [
    "Әр таңбаны <code>ch.isdigit()</code> арқылы тексеріңіз.",
    "Цифрларды біріктіру: <code>''.join(...)</code>."
   ],
   "check": {
    "tests": "assert clean_phone('+7 (701) 123-45-67') == '77011234567', 'clean_phone(\"+7 (701) 123-45-67\") \"77011234567\" қайтаруы керек'\nassert clean_phone('8 777 000 11 22') == '87770001122', 'Бос орындар да алынып тасталуы керек'\nassert clean_phone('') == '', 'Бос мәтін үшін бос жол қайтарыңыз'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "ҚҚС қосылған баға",
   "prompt": "<p><code>price_with_vat(price, rate=0.12)</code> функциясын жазыңыз: бағаға ҚҚС қосып, 2 таңбаға дейін дөңгелектеп қайтарсын. <code>rate</code> берілмесе, 12% қолданылады. Мысалы, <code>price_with_vat(1000)</code> → <code>1120.0</code>, <code>price_with_vat(1000, 0.1)</code> → <code>1100.0</code>.</p>",
   "starter": "def price_with_vat(price, rate):\n    return price\n",
   "solution": "def price_with_vat(price, rate=0.12):\n    \"\"\"Бағаға ҚҚС қосады.\"\"\"\n    return round(price * (1 + rate), 2)\n\nprint(price_with_vat(1000), price_with_vat(1000, 0.1))\n",
   "hints": [
    "Әдепкі мән: <code>def price_with_vat(price, rate=0.12):</code>.",
    "<code>round(price * (1 + rate), 2)</code>."
   ],
   "check": {
    "tests": "assert price_with_vat(1000) == 1120.0, 'price_with_vat(1000) 1120.0 қайтаруы керек (rate әдепкі мәні 0.12)'\nassert price_with_vat(1000, 0.1) == 1100.0, 'price_with_vat(1000, 0.1) 1100.0 қайтаруы керек'\nassert price_with_vat(999, 0) == 999, 'rate=0 болса баға өзгермейді'\nassert price_with_vat(12.5) == 14.0, 'Нәтижені 2 таңбаға дөңгелектеңіз'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Docstring бар функция",
   "prompt": "<p><code>normalize_city(name)</code> функциясын жазыңыз: шеттегі бос орындарды алып, бірінші әріпті бас әріп, қалғанын кіші әріп етсін (<code>\" аЛМАТЫ \"</code> → <code>\"Алматы\"</code>). Функцияға не істейтінін түсіндіретін <b>docstring</b> жазыңыз.</p>",
   "starter": "def normalize_city(name):\n    return name\n",
   "solution": "def normalize_city(name):\n    \"\"\"Қала атауын бір форматқа келтіреді: ' аЛМАТЫ ' -> 'Алматы'.\"\"\"\n    return name.strip().capitalize()\n\nprint(normalize_city(' аЛМАТЫ '))\n",
   "hints": [
    "<code>name.strip().capitalize()</code>.",
    "Docstring функцияның бірінші жолында үш тырнақшамен жазылады: <code>\"\"\"...\"\"\"</code>."
   ],
   "check": {
    "tests": "assert normalize_city(' аЛМАТЫ ') == 'Алматы', 'normalize_city(\" аЛМАТЫ \") \"Алматы\" қайтаруы керек'\nassert normalize_city('шымкент') == 'Шымкент', 'normalize_city(\"шымкент\") \"Шымкент\" қайтаруы керек'\nassert normalize_city.__doc__ and normalize_city.__doc__.strip(), 'Функцияға docstring жазыңыз'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жеткізу құны",
   "prompt": "<p><code>delivery_cost(weight_kg, city='Алматы')</code> функциясын жазыңыз. Алматы ішінде негізгі баға 1000 ₸, басқа қалаларға 2000 ₸. Салмақ 5 кг-нан асса, асқан әр толық емес килограмм үшін 200 ₸ қосылады (5.5 кг → 1 кг, 7 кг → 2 кг). Нәтиже <code>int</code>. Мысалы, <code>delivery_cost(3)</code> → <code>1000</code>, <code>delivery_cost(7, 'Астана')</code> → <code>2400</code>.</p>",
   "starter": "def delivery_cost(weight_kg, city):\n    return 1000\n",
   "solution": "import math\n\ndef delivery_cost(weight_kg, city='Алматы'):\n    \"\"\"Жеткізу құнын теңгемен есептейді.\"\"\"\n    base = 1000 if city == 'Алматы' else 2000\n    extra_kg = max(0, math.ceil(weight_kg - 5))\n    return int(base + 200 * extra_kg)\n\nprint(delivery_cost(3), delivery_cost(7, 'Астана'))\n",
   "hints": [
    "Негізгі баға: <code>1000 if city == 'Алматы' else 2000</code>.",
    "Асқан килограмды жоғары қарай дөңгелектеңіз: <code>math.ceil(weight_kg - 5)</code>, теріс болса 0."
   ],
   "check": {
    "tests": "assert delivery_cost(3) == 1000, 'delivery_cost(3) 1000 қайтаруы керек (қала әдепкі мәні Алматы)'\nassert delivery_cost(5) == 1000, '5 кг дәл шекте: қосымша ақы жоқ'\nassert delivery_cost(7, 'Астана') == 2400, 'delivery_cost(7, \"Астана\") 2400 қайтаруы керек'\nassert delivery_cost(5.5) == 1200, '5.5 кг: асқан 0.5 кг толық 1 кг ретінде саналады, 1200'\nassert isinstance(delivery_cost(10, 'Орал'), int), 'Нәтиже int болсын'\nassert delivery_cost(10, 'Орал') == 3000, 'delivery_cost(10, \"Орал\") 3000 қайтаруы керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Функцияны қайта қолдану",
   "prompt": "<p><code>parse_price(text)</code> дайын. <code>total_price(texts)</code> функциясын жазыңыз: мәтін түріндегі бағалар тізімінің қосындысын қайтарсын. Әр бағаны өңдеу үшін логиканы көшірмей, <code>parse_price</code>-ты шақырыңыз. Мысалы, <code>total_price([\"12 500 ₸\", \"990₸\"])</code> → <code>13490</code>.</p>",
   "starter": "def parse_price(text):\n    \"\"\"'12 500 ₸' сияқты мәтінді бүтін санға айналдырады.\"\"\"\n    return int(text.replace('₸', '').replace(' ', '').strip())\n\ndef total_price(texts):\n    pass\n",
   "solution": "def parse_price(text):\n    \"\"\"'12 500 ₸' сияқты мәтінді бүтін санға айналдырады.\"\"\"\n    return int(text.replace('₸', '').replace(' ', '').strip())\n\ndef total_price(texts):\n    \"\"\"Бағалар тізімінің қосындысы.\"\"\"\n    return sum(parse_price(t) for t in texts)\n\nprint(total_price(['12 500 ₸', '990₸']))\n",
   "hints": [
    "<code>sum(parse_price(t) for t in texts)</code>.",
    "Бос тізімнің қосындысы 0."
   ],
   "check": {
    "tests": "assert total_price(['12 500 ₸', '990₸']) == 13490, 'total_price([\"12 500 ₸\", \"990₸\"]) 13490 қайтаруы керек'\nassert total_price([]) == 0, 'Бос тізім үшін 0'\n_orig = parse_price\n_calls = []\ndef parse_price(text):\n    _calls.append(text)\n    return _orig(text)\n_r = total_price(['100 ₸', '200 ₸'])\nparse_price = _orig\nassert _r == 300 and len(_calls) == 2, 'total_price ішінде логиканы көшірмей, parse_price функциясын шақырыңыз'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Тапсырыстарды сүзу",
   "prompt": "<p><code>filter_orders(orders, min_amount=0, city=None)</code> функциясын жазыңыз: <code>amount &gt;= min_amount</code> болатын тапсырыстардың тізімін қайтарсын. <code>city</code> берілсе, тек сол қаланың тапсырыстары қалады; <code>None</code> болса, барлық қала. Тізімнің реті сақталсын.</p>",
   "starter": "orders = [\n    {'id': 1, 'city': 'Алматы', 'amount': 12000},\n    {'id': 2, 'city': 'Астана', 'amount': 3000},\n    {'id': 3, 'city': 'Алматы', 'amount': 800},\n    {'id': 4, 'city': 'Шымкент', 'amount': 5000},\n]\n\ndef filter_orders(orders, min_amount, city):\n    return orders\n",
   "solution": "orders = [\n    {'id': 1, 'city': 'Алматы', 'amount': 12000},\n    {'id': 2, 'city': 'Астана', 'amount': 3000},\n    {'id': 3, 'city': 'Алматы', 'amount': 800},\n    {'id': 4, 'city': 'Шымкент', 'amount': 5000},\n]\n\ndef filter_orders(orders, min_amount=0, city=None):\n    \"\"\"Сома мен қала бойынша сүзеді.\"\"\"\n    result = []\n    for o in orders:\n        if o['amount'] < min_amount:\n            continue\n        if city is not None and o['city'] != city:\n            continue\n        result.append(o)\n    return result\n\nprint([o['id'] for o in filter_orders(orders, 1000)])\n",
   "hints": [
    "Екі параметрге де әдепкі мән беріңіз: <code>min_amount=0, city=None</code>.",
    "Қаланы тек <code>city is not None</code> болғанда тексеріңіз."
   ],
   "check": {
    "tests": "_ids = lambda xs: [o['id'] for o in xs]\nassert _ids(filter_orders(orders)) == [1, 2, 3, 4], 'Параметрсіз шақырғанда барлық тапсырыс қайтуы керек'\nassert _ids(filter_orders(orders, 1000)) == [1, 2, 4], 'filter_orders(orders, 1000) → 1, 2, 4 тапсырыстар'\nassert _ids(filter_orders(orders, city='Алматы')) == [1, 3], 'city=\"Алматы\" болса, тек Алматы тапсырыстары'\nassert _ids(filter_orders(orders, 1000, 'Алматы')) == [1], 'Екі шарт бірге қолданылуы керек'\nassert filter_orders(orders, city='Орал') == [], 'Тапсырыс жоқ қала үшін бос тізім'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Чекті талдау",
   "prompt": "<p>Дүкен чегі мәтін түрінде келеді: әр жолда <code>атауы — баға</code> (сызықша <code>—</code>). Екі функция жазыңыз:<br>• <code>parse_line(line)</code> → <code>(атауы, баға)</code>, баға <code>int</code>: <code>\"Сүт — 1 290 ₸\"</code> → <code>(\"Сүт\", 1290)</code>;<br>• <code>receipt_total(text)</code> → барлық жолдардың қосындысы (бос жолдар еленбейді), ол <code>parse_line</code>-ды қолдансын.</p>",
   "starter": "receipt = \"\"\"Нан — 250 ₸\nСүт — 1 290 ₸\n\nІрімшік — 3 450 ₸\n\"\"\"\n\ndef parse_line(line):\n    pass\n\ndef receipt_total(text):\n    pass\n",
   "solution": "receipt = \"\"\"Нан — 250 ₸\nСүт — 1 290 ₸\n\nІрімшік — 3 450 ₸\n\"\"\"\n\ndef parse_price(text):\n    \"\"\"'1 290 ₸' -> 1290.\"\"\"\n    return int(text.replace('₸', '').replace(' ', '').strip())\n\ndef parse_line(line):\n    \"\"\"'Сүт — 1 290 ₸' -> ('Сүт', 1290).\"\"\"\n    name, price = line.split('—')\n    return name.strip(), parse_price(price)\n\ndef receipt_total(text):\n    \"\"\"Чектегі барлық тауарлардың қосындысы.\"\"\"\n    total = 0\n    for line in text.splitlines():\n        if line.strip():\n            total += parse_line(line)[1]\n    return total\n\nprint(receipt_total(receipt))\n",
   "hints": [
    "Жолды сызықшамен бөліңіз: <code>name, price = line.split('—')</code>, сосын екеуін де <code>strip()</code>.",
    "Бос жолды өткізу: <code>if line.strip():</code>."
   ],
   "check": {
    "tests": "assert parse_line('Сүт — 1 290 ₸') == ('Сүт', 1290), 'parse_line(\"Сүт — 1 290 ₸\") (\"Сүт\", 1290) қайтаруы керек'\nassert parse_line('Нан — 250₸') == ('Нан', 250), 'Бос орынсыз баға да өңделуі керек'\nassert receipt_total(receipt) == 4990, 'receipt_total(receipt) 4990 қайтаруы керек'\nassert receipt_total('') == 0, 'Бос чек үшін 0'\nassert receipt_total('Қант — 600 ₸\\n\\n\\nШай — 1 000 ₸') == 1600, 'Бос жолдар еленбеуі керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Сатылым қорытындысы",
   "prompt": "<p><code>summary(orders, city=None)</code> функциясын жазыңыз: сөздік қайтарсын <code>{'count': саны, 'total': қосындысы, 'avg': орташасы}</code>. <code>city</code> берілсе, тек сол қаланың тапсырыстары есептеледі. Орташа 2 таңбаға дөңгелектенсін, тапсырыс жоқ болса <code>0.0</code> (нөлге бөлу болмасын).</p>",
   "starter": "orders = [\n    {'city': 'Алматы', 'amount': 12000},\n    {'city': 'Астана', 'amount': 8000},\n    {'city': 'Алматы', 'amount': 5500},\n]\n\ndef summary(orders, city=None):\n    return {}\n",
   "solution": "orders = [\n    {'city': 'Алматы', 'amount': 12000},\n    {'city': 'Астана', 'amount': 8000},\n    {'city': 'Алматы', 'amount': 5500},\n]\n\ndef summary(orders, city=None):\n    \"\"\"Тапсырыстар саны, қосындысы және орташасы.\"\"\"\n    amounts = [o['amount'] for o in orders if city is None or o['city'] == city]\n    count = len(amounts)\n    total = sum(amounts)\n    avg = round(total / count, 2) if count else 0.0\n    return {'count': count, 'total': total, 'avg': avg}\n\nprint(summary(orders), summary(orders, 'Алматы'))\n",
   "hints": [
    "Алдымен керек сомаларды тізімге жинаңыз: <code>[o['amount'] for o in orders if city is None or o['city'] == city]</code>.",
    "Орташа: <code>round(total / count, 2) if count else 0.0</code>."
   ],
   "check": {
    "tests": "assert summary(orders) == {'count': 3, 'total': 25500, 'avg': 8500.0}, 'summary(orders) барлық тапсырыс бойынша count=3, total=25500, avg=8500.0 болуы керек'\nassert summary(orders, 'Алматы') == {'count': 2, 'total': 17500, 'avg': 8750.0}, 'Алматы бойынша count=2, total=17500, avg=8750.0'\nassert summary(orders, 'Орал') == {'count': 0, 'total': 0, 'avg': 0.0}, 'Тапсырыс жоқ болса avg=0.0, қате шықпауы керек'\nassert summary([{'city': 'Алматы', 'amount': 1}, {'city': 'Алматы', 'amount': 2}, {'city': 'Алматы', 'amount': 2}])['avg'] == 1.67, 'Орташаны 2 таңбаға дөңгелектеңіз'"
   }
  }
 ],
 "swe-2": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Такси бағасының типтері",
   "prompt": "<p><code>taxi_fare(km)</code> функциясына type hints қосыңыз: <code>km: float</code>, қайтаратыны <code>int</code>. Баға: 500 ₸ отырғызу + әр км үшін 120 ₸, нәтиже <code>round</code> арқылы бүтін санға айналсын. Мысалы, <code>taxi_fare(4.5)</code> → <code>1040</code>.</p>",
   "starter": "def taxi_fare(km):\n    return 500 + 120 * km\n",
   "solution": "def taxi_fare(km: float) -> int:\n    return round(500 + 120 * km)\n\nprint(taxi_fare(4.5))\n",
   "hints": [
    "Параметрдің артынан <code>: float</code>, жақшадан кейін <code>-&gt; int</code>.",
    "<code>round(...)</code> бүтін сан береді."
   ],
   "check": {
    "tests": "_a = taxi_fare.__annotations__\nassert _a.get('km') is float, 'km параметрінің hint-і float болуы керек'\nassert _a.get('return') is int, 'Қайтару hint-і: -> int'\nassert taxi_fare(4.5) == 1040 and isinstance(taxi_fare(4.5), int), 'taxi_fare(4.5) 1040 (int) қайтаруы керек'\nassert taxi_fare(0.0) == 500, 'taxi_fare(0.0) 500 қайтаруы керек'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қалаларды санау",
   "prompt": "<p><code>count_cities(cities)</code> функциясын hints-пен жазыңыз: <code>cities: list[str]</code>, қайтаратыны <code>dict[str, int]</code> — әр қала неше рет кездескені. Мысалы, <code>[\"Алматы\", \"Астана\", \"Алматы\"]</code> → <code>{\"Алматы\": 2, \"Астана\": 1}</code>.</p>",
   "starter": "def count_cities(cities):\n    return {}\n",
   "solution": "def count_cities(cities: list[str]) -> dict[str, int]:\n    result = {}\n    for c in cities:\n        result[c] = result.get(c, 0) + 1\n    return result\n\nprint(count_cities(['Алматы', 'Астана', 'Алматы']))\n",
   "hints": [
    "Hint-тер: <code>cities: list[str]</code> және <code>-&gt; dict[str, int]</code>.",
    "<code>result[c] = result.get(c, 0) + 1</code>."
   ],
   "check": {
    "tests": "_a = count_cities.__annotations__\nassert _a.get('cities') == list[str], 'cities hint-і: list[str]'\nassert _a.get('return') == dict[str, int], 'Қайтару hint-і: dict[str, int]'\nassert count_cities(['Алматы', 'Астана', 'Алматы']) == {'Алматы': 2, 'Астана': 1}, 'Қалалар саны дұрыс емес'\nassert count_cities([]) == {}, 'Бос тізім үшін бос сөздік'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ештеңе қайтармайтын функция",
   "prompt": "<p><code>add_reading(log, temp)</code> функциясын жазыңыз: ол <code>log</code> тізіміне температураны қосады және ештеңе қайтармайды. Hints: <code>log: list[float]</code>, <code>temp: float</code>, қайтаратыны <code>None</code> (<code>-&gt; None</code>).</p>",
   "starter": "def add_reading(log, temp):\n    return log + [temp]\n",
   "solution": "def add_reading(log: list[float], temp: float) -> None:\n    log.append(temp)\n\nreadings = []\nadd_reading(readings, -12.5)\nprint(readings)\n",
   "hints": [
    "<code>log.append(temp)</code> тізімнің өзін өзгертеді.",
    "Қайтару hint-і: <code>-&gt; None</code>."
   ],
   "check": {
    "tests": "_a = add_reading.__annotations__\nassert _a.get('log') == list[float] and _a.get('temp') is float, 'Hint-тер: log: list[float], temp: float'\nassert 'return' in _a and _a['return'] is None, 'Қайтару hint-і: -> None'\n_l = [1.0]\n_r = add_reading(_l, -3.5)\nassert _l == [1.0, -3.5], 'Температура log тізіміне қосылуы керек'\nassert _r is None, 'Функция ештеңе қайтармауы керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бірінші аяз күні",
   "prompt": "<p><code>first_frost(temps)</code> функциясын hints-пен жазыңыз: <code>temps: list[float]</code>, қайтаратыны <code>float | None</code>. Ол тізімдегі бірінші теріс температураны қайтарсын, теріс мән жоқ болса <code>None</code>. Мысалы, <code>[5.0, 1.5, -2.0, -7.0]</code> → <code>-2.0</code>.</p>",
   "starter": "def first_frost(temps):\n    return min(temps)\n",
   "solution": "def first_frost(temps: list[float]) -> float | None:\n    for t in temps:\n        if t < 0:\n            return t\n    return None\n\nprint(first_frost([5.0, 1.5, -2.0, -7.0]))\n",
   "hints": [
    "Цикл ішінде <code>if t &lt; 0: return t</code>.",
    "Цикл біткенде <code>return None</code>. Hint: <code>-&gt; float | None</code>."
   ],
   "check": {
    "tests": "import typing as _t\n_a = first_frost.__annotations__\nassert _a.get('temps') == list[float], 'temps hint-і: list[float]'\nassert set(_t.get_args(_a.get('return'))) == {float, type(None)}, 'Қайтару hint-і: float | None'\nassert first_frost([5.0, 1.5, -2.0, -7.0]) == -2.0, 'first_frost([5.0, 1.5, -2.0, -7.0]) -2.0 қайтаруы керек'\nassert first_frost([3.0, 0.0]) is None, 'Теріс мән жоқ болса None (0 теріс емес)'\nassert first_frost([]) is None, 'Бос тізім үшін None'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Аннотацияларды оқу",
   "prompt": "<p><code>hinted_params(func)</code> функциясын жазыңыз: <code>func.__annotations__</code> ішінен hint-і бар <b>параметрлердің</b> атауларын тізім ретінде қайтарсын (<code>'return'</code> кілтін есептемеңіз). Мысалы, <code>def f(city: str, days: int) -&gt; float</code> үшін <code>[\"city\", \"days\"]</code>.</p>",
   "starter": "def hinted_params(func):\n    return list(func.__annotations__)\n",
   "solution": "def hinted_params(func):\n    return [name for name in func.__annotations__ if name != 'return']\n\ndef forecast(city: str, days: int) -> float:\n    return 0.0\n\nprint(hinted_params(forecast))\n",
   "hints": [
    "<code>func.__annotations__</code> — сөздік, оның кілттері параметр атаулары.",
    "<code>[n for n in func.__annotations__ if n != 'return']</code>."
   ],
   "check": {
    "tests": "def _f(city: str, days: int) -> float:\n    return 0.0\ndef _g(x, y: int):\n    return x\ndef _h():\n    pass\nassert hinted_params(_f) == ['city', 'days'], 'f(city: str, days: int) -> float үшін [\"city\", \"days\"]'\nassert hinted_params(_g) == ['y'], 'Hint-і жоқ параметр тізімге кірмейді'\nassert hinted_params(_h) == [], 'Hint жоқ болса бос тізім'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Оқушылардың орташа бағасы",
   "prompt": "<p><code>average_scores(scores)</code> функциясын hints-пен жазыңыз: <code>scores: dict[str, list[int]]</code> (оқушы → бағалары), қайтаратыны <code>dict[str, float]</code> — әр оқушының орташа бағасы, 2 таңбаға дөңгелектенген. Бағасы жоқ оқушыға <code>0.0</code>.</p>",
   "starter": "def average_scores(scores):\n    return {name: sum(s) / len(s) for name, s in scores.items()}\n",
   "solution": "def average_scores(scores: dict[str, list[int]]) -> dict[str, float]:\n    result = {}\n    for name, s in scores.items():\n        result[name] = round(sum(s) / len(s), 2) if s else 0.0\n    return result\n\nprint(average_scores({'Айгерім': [5, 4, 5], 'Ерлан': []}))\n",
   "hints": [
    "Hint-тер: <code>scores: dict[str, list[int]]</code>, <code>-&gt; dict[str, float]</code>.",
    "Бос тізімді бөлек тексеріңіз: <code>... if s else 0.0</code>."
   ],
   "check": {
    "tests": "_a = average_scores.__annotations__\nassert _a.get('scores') == dict[str, list[int]], 'scores hint-і: dict[str, list[int]]'\nassert _a.get('return') == dict[str, float], 'Қайтару hint-і: dict[str, float]'\nassert average_scores({'Айгерім': [5, 4, 5], 'Ерлан': [3, 4]}) == {'Айгерім': 4.67, 'Ерлан': 3.5}, 'Орташа бағалар дұрыс емес (2 таңбаға дөңгелектеңіз)'\nassert average_scores({'Дана': []}) == {'Дана': 0.0}, 'Бағасы жоқ оқушыға 0.0'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Аргумент типтерін тексеру",
   "prompt": "<p>Python hints-ті өзі тексермейді. <code>check_args(func, kwargs)</code> функциясын жазыңыз: <code>func.__annotations__</code> бойынша әр параметрдің (<code>return</code>-нан басқа) мәнін <code>kwargs</code>-тан алып, <code>isinstance</code> арқылы тексерсін. Қате тізімін қайтарсын: <code>\"&lt;параметр&gt;: &lt;тип атауы&gt; күтілді\"</code>, мысалы <code>\"days: int күтілді\"</code>. Параметр <code>kwargs</code>-та жоқ болса: <code>\"&lt;параметр&gt;: жоқ\"</code>. Hint-тер тек қарапайым типтер (<code>int</code>, <code>float</code>, <code>str</code>) деп есептеңіз.</p>",
   "starter": "def forecast(city: str, days: int, temp: float) -> str:\n    return f'{city}: {days} күн, {temp}°C'\n\ndef check_args(func, kwargs):\n    return []\n",
   "solution": "def forecast(city: str, days: int, temp: float) -> str:\n    return f'{city}: {days} күн, {temp}°C'\n\ndef check_args(func, kwargs):\n    errors = []\n    for name, tp in func.__annotations__.items():\n        if name == 'return':\n            continue\n        if name not in kwargs:\n            errors.append(f'{name}: жоқ')\n        elif not isinstance(kwargs[name], tp):\n            errors.append(f'{name}: {tp.__name__} күтілді')\n    return errors\n\nprint(check_args(forecast, {'city': 'Алматы', 'days': '3', 'temp': 21.5}))\n",
   "hints": [
    "<code>for name, tp in func.__annotations__.items():</code>, <code>return</code> кілтін өткізіңіз.",
    "Типтің атауы: <code>tp.__name__</code>."
   ],
   "check": {
    "tests": "assert check_args(forecast, {'city': 'Алматы', 'days': 3, 'temp': 21.5}) == [], 'Дұрыс аргументтерде бос тізім'\nassert check_args(forecast, {'city': 'Алматы', 'days': '3', 'temp': 21.5}) == ['days: int күтілді'], '\"3\" мәтіні int емес: [\"days: int күтілді\"]'\nassert check_args(forecast, {'city': 42, 'temp': 'жылы'}) == ['city: str күтілді', 'days: жоқ', 'temp: float күтілді'], 'Қателер параметрлер ретімен шығуы керек, жоқ параметр — \"days: жоқ\"'\ndef _g(name: str) -> None:\n    pass\nassert check_args(_g, {'name': 'Ерлан'}) == [], 'return hint-і тексерілмейді'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ең жақсы ай",
   "prompt": "<p><code>best_month(sales)</code> функциясын hints-пен жазыңыз: <code>sales: dict[str, list[int]]</code> (ай → күндік сатылымдар), қайтаратыны <code>tuple[str, int] | None</code> — жалпы сатылымы ең көп ай және оның қосындысы. <code>sales</code> бос болса <code>None</code>. Мысалы, <code>{\"наурыз\": [100, 200], \"сәуір\": [500]}</code> → <code>(\"сәуір\", 500)</code>.</p>",
   "starter": "def best_month(sales):\n    pass\n",
   "solution": "def best_month(sales: dict[str, list[int]]) -> tuple[str, int] | None:\n    if not sales:\n        return None\n    totals = {month: sum(days) for month, days in sales.items()}\n    month = max(totals, key=totals.get)\n    return month, totals[month]\n\nprint(best_month({'наурыз': [100, 200], 'сәуір': [500]}))\n",
   "hints": [
    "Алдымен әр айдың қосындысы: <code>{m: sum(d) for m, d in sales.items()}</code>, сосын <code>max(totals, key=totals.get)</code>.",
    "Қайтару hint-і: <code>-&gt; tuple[str, int] | None</code>."
   ],
   "check": {
    "tests": "import typing as _t\n_a = best_month.__annotations__\nassert _a.get('sales') == dict[str, list[int]], 'sales hint-і: dict[str, list[int]]'\nassert set(_t.get_args(_a.get('return'))) == {tuple[str, int], type(None)}, 'Қайтару hint-і: tuple[str, int] | None'\nassert best_month({'наурыз': [100, 200], 'сәуір': [500]}) == ('сәуір', 500), 'Ең көп сатылым — сәуір, 500'\nassert best_month({'мамыр': [10, 20, 30], 'маусым': [], 'шілде': [59]}) == ('мамыр', 60), 'Бос тізімнің қосындысы 0, ең жақсысы мамыр (60)'\nassert best_month({}) is None, 'Бос сөздік үшін None'"
   }
  }
 ],
 "swe-3": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Әмиян класы",
   "prompt": "<p><code>Wallet</code> класын жазыңыз: <code>__init__(owner, balance=0)</code> иесі мен балансты сақтайды; <code>deposit(amount)</code> балансқа қосып, жаңа балансты қайтарады; <code>withdraw(amount)</code> баланс жетсе азайтып <code>True</code>, жетпесе ештеңе өзгертпей <code>False</code> қайтарады.</p>",
   "starter": "class Wallet:\n    def __init__(self, owner, balance=0):\n        pass\n",
   "solution": "class Wallet:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n        return self.balance\n\n    def withdraw(self, amount):\n        if amount > self.balance:\n            return False\n        self.balance -= amount\n        return True\n\nw = Wallet('Айгерім', 5000)\nprint(w.deposit(2000), w.withdraw(10000), w.balance)\n",
   "hints": [
    "<code>__init__</code> ішінде <code>self.owner = owner</code> және <code>self.balance = balance</code>.",
    "<code>withdraw</code>: <code>if amount &gt; self.balance: return False</code>."
   ],
   "check": {
    "tests": "_w = Wallet('Ерлан')\nassert _w.owner == 'Ерлан' and _w.balance == 0, 'Әдепкі баланс 0, owner сақталуы керек'\nassert _w.deposit(3000) == 3000, 'deposit жаңа балансты қайтарады'\nassert _w.withdraw(5000) is False and _w.balance == 3000, 'Баланс жетпесе False, баланс өзгермейді'\nassert _w.withdraw(1000) is True and _w.balance == 2000, 'Баланс жетсе True және азаяды'\n_w2 = Wallet('Дана', 100)\nassert _w2.balance == 100 and _w.balance == 2000, 'Әр объектінің өз балансы болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Орташамен толтыру",
   "prompt": "<p><code>MeanImputer</code> класын жазыңыз: <code>fit(values)</code> <code>None</code> емес мәндердің орташасын <code>self.mean_</code>-ге сақтап, <code>self</code> қайтарады; <code>transform(values)</code> әр <code>None</code>-ды <code>mean_</code>-мен ауыстырған жаңа тізім қайтарады.</p>",
   "starter": "class MeanImputer:\n    def fit(self, values):\n        pass\n\n    def transform(self, values):\n        pass\n",
   "solution": "class MeanImputer:\n    def fit(self, values):\n        known = [v for v in values if v is not None]\n        self.mean_ = sum(known) / len(known)\n        return self\n\n    def transform(self, values):\n        return [self.mean_ if v is None else v for v in values]\n\nprint(MeanImputer().fit([10, None, 30]).transform([None, 5]))\n",
   "hints": [
    "<code>fit</code>: <code>known = [v for v in values if v is not None]</code>, сосын орташасы.",
    "<code>transform</code>: <code>[self.mean_ if v is None else v for v in values]</code>."
   ],
   "check": {
    "tests": "_m = MeanImputer()\nassert _m.fit([10, None, 30]) is _m, 'fit() self қайтаруы керек'\nassert _m.mean_ == 20, 'mean_ = (10 + 30) / 2 = 20 (None есептелмейді)'\nassert _m.transform([None, 5, None]) == [20, 5, 20], 'transform None-дарды mean_-мен ауыстырады'\nassert _m.transform([1, 2]) == [1, 2], 'None жоқ болса тізім өзгермейді'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Сауда себеті",
   "prompt": "<p><code>Cart</code> класын жазыңыз: <code>__init__</code> бос <code>self.items</code> тізімін жасайды; <code>add(name, price, qty=1)</code> тауарды <code>(name, price, qty)</code> түрінде қосады; <code>total()</code> барлық <code>price * qty</code> қосындысын қайтарады.</p>",
   "starter": "class Cart:\n    pass\n",
   "solution": "class Cart:\n    def __init__(self):\n        self.items = []\n\n    def add(self, name, price, qty=1):\n        self.items.append((name, price, qty))\n\n    def total(self):\n        return sum(price * qty for _, price, qty in self.items)\n\ncart = Cart()\ncart.add('Нан', 250, 2)\ncart.add('Сүт', 1290)\nprint(cart.total())\n",
   "hints": [
    "<code>__init__</code> ішінде <code>self.items = []</code>: әр себеттің өз тізімі болады.",
    "<code>sum(price * qty for _, price, qty in self.items)</code>."
   ],
   "check": {
    "tests": "_c = Cart()\nassert _c.items == [] and _c.total() == 0, 'Жаңа себет бос, total() 0'\n_c.add('Нан', 250, 2)\n_c.add('Сүт', 1290)\nassert _c.items == [('Нан', 250, 2), ('Сүт', 1290, 1)], 'add (name, price, qty) қосады, qty әдепкі мәні 1'\nassert _c.total() == 1790, 'total() = 250*2 + 1290 = 1790'\nassert Cart().items == [], 'Әр себеттің өз items тізімі болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Стандарттау класы",
   "prompt": "<p><code>ZScaler</code> класын жазыңыз: <code>fit(values)</code> орташаны <code>self.mean_</code>-ге, стандартты ауытқуды (бүкіл жиын бойынша, <code>n</code>-ге бөліп) <code>self.std_</code>-ге сақтап, <code>self</code> қайтарады; <code>transform(values)</code> әр мәнді <code>(v - mean_) / std_</code> етеді. <code>std_</code> 0 болса, барлық нәтиже <code>0.0</code>.</p>",
   "starter": "class ZScaler:\n    def fit(self, values):\n        return self\n\n    def transform(self, values):\n        return values\n",
   "solution": "class ZScaler:\n    def fit(self, values):\n        n = len(values)\n        self.mean_ = sum(values) / n\n        self.std_ = (sum((v - self.mean_) ** 2 for v in values) / n) ** 0.5\n        return self\n\n    def transform(self, values):\n        if self.std_ == 0:\n            return [0.0 for _ in values]\n        return [(v - self.mean_) / self.std_ for v in values]\n\nprint(ZScaler().fit([2, 4, 6]).transform([4, 8]))\n",
   "hints": [
    "<code>std_ = (sum((v - mean_) ** 2 for v in values) / n) ** 0.5</code>.",
    "<code>transform</code> train-нен үйренген <code>mean_</code>, <code>std_</code>-ты қолданады."
   ],
   "check": {
    "tests": "_s = ZScaler()\nassert _s.fit([2, 4, 4, 4, 5, 5, 7, 9]) is _s, 'fit() self қайтаруы керек'\nassert _s.mean_ == 5 and abs(_s.std_ - 2.0) < 1e-9, 'mean_ = 5, std_ = 2 болуы керек ([2, 4, 4, 4, 5, 5, 7, 9])'\nassert _s.transform([5, 9, 1]) == [0.0, 2.0, -2.0], 'transform([5, 9, 1]) → [0.0, 2.0, -2.0]'\nassert ZScaler().fit([3, 3, 3]).transform([3, 10]) == [0.0, 0.0], 'std_ = 0 болса нәтиже 0.0 (нөлге бөлу болмасын)'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Категорияны кодтау",
   "prompt": "<p><code>LabelEncoder</code> класын жазыңыз: <code>fit(values)</code> қайталанбайтын мәндерді сұрыптап <code>self.classes_</code> тізіміне сақтайды және <code>self</code> қайтарады; <code>transform(values)</code> әр мәнді оның <code>classes_</code>-тағы индексіне айналдырады, train-де болмаған мән үшін <code>-1</code>.</p>",
   "starter": "class LabelEncoder:\n    def fit(self, values):\n        self.classes_ = values\n        return self\n\n    def transform(self, values):\n        return [self.classes_.index(v) for v in values]\n",
   "solution": "class LabelEncoder:\n    def fit(self, values):\n        self.classes_ = sorted(set(values))\n        return self\n\n    def transform(self, values):\n        index = {c: i for i, c in enumerate(self.classes_)}\n        return [index.get(v, -1) for v in values]\n\nenc = LabelEncoder().fit(['Астана', 'Алматы', 'Астана', 'Шымкент'])\nprint(enc.classes_, enc.transform(['Шымкент', 'Орал']))\n",
   "hints": [
    "<code>sorted(set(values))</code> — қайталанбайтын, сұрыпталған мәндер.",
    "Индекс сөздігі: <code>{c: i for i, c in enumerate(self.classes_)}</code>, сосын <code>.get(v, -1)</code>."
   ],
   "check": {
    "tests": "_e = LabelEncoder()\nassert _e.fit(['Астана', 'Алматы', 'Астана', 'Шымкент']) is _e, 'fit() self қайтаруы керек'\nassert _e.classes_ == ['Алматы', 'Астана', 'Шымкент'], 'classes_ — қайталанбайтын, сұрыпталған мәндер'\nassert _e.transform(['Шымкент', 'Алматы', 'Астана']) == [2, 0, 1], 'transform мәндерді индекске айналдырады'\nassert _e.transform(['Орал']) == [-1], 'Train-де болмаған мән → -1 (қате шықпауы керек)'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "fit_transform әдісі",
   "prompt": "<p><code>RangeScaler</code> класына <code>fit_transform(values)</code> әдісін қосыңыз: ол <code>fit</code> пен <code>transform</code>-ды өзі жазбай, бар әдістерді шақырсын (<code>self.fit(values).transform(values)</code>). Сонымен бірге <code>transform</code> нәтижесін 0 мен 1 аралығына қиып (clip) қойсын: train-нен кіші мән → 0.0, үлкені → 1.0.</p>",
   "starter": "class RangeScaler:\n    def fit(self, values):\n        self.min_ = min(values)\n        self.max_ = max(values)\n        return self\n\n    def transform(self, values):\n        span = self.max_ - self.min_\n        return [(v - self.min_) / span for v in values]\n",
   "solution": "class RangeScaler:\n    def fit(self, values):\n        self.min_ = min(values)\n        self.max_ = max(values)\n        return self\n\n    def transform(self, values):\n        span = self.max_ - self.min_\n        return [min(1.0, max(0.0, (v - self.min_) / span)) for v in values]\n\n    def fit_transform(self, values):\n        return self.fit(values).transform(values)\n\nprint(RangeScaler().fit_transform([100, 300, 500]))\n",
   "hints": [
    "<code>def fit_transform(self, values): return self.fit(values).transform(values)</code>.",
    "Қию: <code>min(1.0, max(0.0, x))</code>."
   ],
   "check": {
    "tests": "_s = RangeScaler()\nassert _s.fit_transform([100, 300, 500]) == [0.0, 0.5, 1.0], 'fit_transform([100, 300, 500]) → [0.0, 0.5, 1.0]'\nassert _s.min_ == 100 and _s.max_ == 500, 'fit_transform fit-ті шақырып, min_ мен max_-ты сақтауы керек'\nassert _s.transform([0, 700, 200]) == [0.0, 1.0, 0.25], 'Аралықтан тыс мәндер 0.0 және 1.0-ге қиылуы керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Кішкене Pipeline",
   "prompt": "<p><code>MeanImputer</code> мен <code>RangeScaler</code> дайын. <code>MiniPipeline(steps)</code> класын жазыңыз: <code>fit(values)</code> әр қадамды ретімен <code>fit</code> етіп, оның <code>transform</code> нәтижесін келесі қадамға береді және <code>self</code> қайтарады; <code>transform(values)</code> барлық қадамдардың <code>transform</code>-ын ретімен қолданады.</p>",
   "starter": "class MeanImputer:\n    def fit(self, values):\n        known = [v for v in values if v is not None]\n        self.mean_ = sum(known) / len(known)\n        return self\n\n    def transform(self, values):\n        return [self.mean_ if v is None else v for v in values]\n\nclass RangeScaler:\n    def fit(self, values):\n        self.min_ = min(values)\n        self.max_ = max(values)\n        return self\n\n    def transform(self, values):\n        span = self.max_ - self.min_\n        return [(v - self.min_) / span for v in values]\n\nclass MiniPipeline:\n    def __init__(self, steps):\n        self.steps = steps\n\n    def fit(self, values):\n        return self\n\n    def transform(self, values):\n        return values\n",
   "solution": "class MeanImputer:\n    def fit(self, values):\n        known = [v for v in values if v is not None]\n        self.mean_ = sum(known) / len(known)\n        return self\n\n    def transform(self, values):\n        return [self.mean_ if v is None else v for v in values]\n\nclass RangeScaler:\n    def fit(self, values):\n        self.min_ = min(values)\n        self.max_ = max(values)\n        return self\n\n    def transform(self, values):\n        span = self.max_ - self.min_\n        return [(v - self.min_) / span for v in values]\n\nclass MiniPipeline:\n    def __init__(self, steps):\n        self.steps = steps\n\n    def fit(self, values):\n        for step in self.steps:\n            values = step.fit(values).transform(values)\n        return self\n\n    def transform(self, values):\n        for step in self.steps:\n            values = step.transform(values)\n        return values\n\npipe = MiniPipeline([MeanImputer(), RangeScaler()]).fit([10, None, 30])\nprint(pipe.transform([None, 30, 40]))\n",
   "hints": [
    "<code>fit</code> ішінде: <code>values = step.fit(values).transform(values)</code> — келесі қадам өңделген деректі көреді.",
    "<code>transform</code>-да тек <code>values = step.transform(values)</code>."
   ],
   "check": {
    "tests": "_p = MiniPipeline([MeanImputer(), RangeScaler()])\nassert _p.fit([10, None, 30]) is _p, 'fit() self қайтаруы керек'\nassert _p.steps[0].mean_ == 20, 'Бірінші қадам (MeanImputer) fit болуы керек: mean_ = 20'\nassert _p.steps[1].min_ == 10 and _p.steps[1].max_ == 30, 'RangeScaler толтырылған деректе fit болуы керек (None емес)'\nassert _p.transform([None, 30, 40]) == [0.5, 1.0, 1.5], 'transform([None, 30, 40]) → [0.5, 1.0, 1.5]'\nassert MiniPipeline([]).fit([1]).transform([5]) == [5], 'Қадам жоқ болса дерек өзгермейді'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Пәтер бағасының wrapper-і",
   "prompt": "<p>Алматыдағы пәтерлер дерегі берілген. <code>PriceModel</code> wrapper-ін жазыңыз: <code>__init__(features, version='1.0.0')</code> белгілер мен нұсқаны сақтап, <code>LinearRegression()</code> жасайды; <code>fit(df, target)</code> модельді тек <code>self.features</code> бағандарында үйретіп, <code>self</code> қайтарады; <code>predict_one(flat)</code> бір пәтердің бағасын (млн ₸) 1 таңбаға дөңгелектеп <code>float</code> қайтарады (сөздікте артық кілттер болуы мүмкін). Соңында <code>pm = PriceModel(FEATURES).fit(flats, 'price_mln')</code>.</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.DataFrame({\n    'area':      [35, 42, 50, 60, 75, 90, 110, 48],\n    'rooms':     [1, 1, 2, 2, 3, 3, 4, 2],\n    'price_mln': [24.5, 29.4, 35.0, 42.0, 52.5, 63.0, 77.0, 33.6],\n})\nFEATURES = ['area', 'rooms']\n\nclass PriceModel:\n    def __init__(self, features, version='1.0.0'):\n        pass\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nflats = pd.DataFrame({\n    'area':      [35, 42, 50, 60, 75, 90, 110, 48],\n    'rooms':     [1, 1, 2, 2, 3, 3, 4, 2],\n    'price_mln': [24.5, 29.4, 35.0, 42.0, 52.5, 63.0, 77.0, 33.6],\n})\nFEATURES = ['area', 'rooms']\n\nclass PriceModel:\n    def __init__(self, features, version='1.0.0'):\n        self.features = features\n        self.version = version\n        self.model = LinearRegression()\n\n    def fit(self, df, target):\n        self.model.fit(df[self.features], df[target])\n        return self\n\n    def predict_one(self, flat):\n        row = pd.DataFrame([flat])[self.features]\n        return round(float(self.model.predict(row)[0]), 1)\n\npm = PriceModel(FEATURES).fit(flats, 'price_mln')\nprint(pm.predict_one({'rooms': 2, 'area': 55, 'district': 'Бостандық'}))\n",
   "hints": [
    "<code>predict_one</code>: <code>pd.DataFrame([flat])[self.features]</code> артық кілттерді алып тастап, ретті сақтайды.",
    "<code>round(float(self.model.predict(row)[0]), 1)</code>."
   ],
   "check": {
    "tests": "assert isinstance(pm, PriceModel), 'pm = PriceModel(FEATURES).fit(...) болуы керек: fit() self қайтарсын'\nassert pm.features == FEATURES and pm.version == '1.0.0', '__init__ features пен version-ды сақтауы керек (version әдепкі мәні 1.0.0)'\nassert hasattr(pm.model, 'coef_') and pm.model.n_features_in_ == 2, 'Модель тек features бағандарында үйретілуі керек'\n_p = pm.predict_one({'rooms': 2, 'area': 55, 'district': 'Бостандық'})\nassert isinstance(_p, float), 'predict_one float қайтаруы керек'\nassert abs(_p - 38.5) < 0.05, f'55 м² пәтердің бағасы ≈ 38.5 млн ₸ болуы керек, сізде {_p}'\nassert pm.predict_one({'area': 100, 'rooms': 3}) > pm.predict_one({'area': 50, 'rooms': 3}), 'Үлкен пәтер қымбатырақ болуы керек'\nassert PriceModel(FEATURES, version='2.0.0').version == '2.0.0', 'version параметрі сақталуы керек'"
   }
  }
 ],
 "swe-4": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қосынды тесті",
   "prompt": "<p><code>total(prices)</code> функциясы дайын. <code>test_total()</code> тест функциясын жазыңыз, ол үш жағдайды тексерсін: <code>[100, 200]</code> → 300, <code>[]</code> → 0, <code>[5]</code> → 5. Дұрыс функцияда тест өтсін, қате нұсқаларда <code>AssertionError</code> берсін.</p>",
   "starter": "def total(prices):\n    return sum(prices)\n\ndef test_total():\n    pass\n\ntest_total()\nprint('тест өтті')\n",
   "solution": "def total(prices):\n    return sum(prices)\n\ndef test_total():\n    assert total([100, 200]) == 300\n    assert total([]) == 0\n    assert total([5]) == 5\n\ntest_total()\nprint('тест өтті')\n",
   "hints": [
    "Әр жағдайға бір жол: <code>assert total([100, 200]) == 300</code>.",
    "Бос тізім мен бір элемент — шекаралық жағдайлар, оларды ұмытпаңыз."
   ],
   "check": {
    "tests": "test_total()\n\ndef _catches(_bad):\n    global total\n    _ok_fn = total\n    total = _bad\n    try:\n        test_total()\n        return False\n    except Exception:\n        return True\n    finally:\n        total = _ok_fn\n\nassert _catches(lambda xs: xs[0] + xs[-1] if xs else 0), 'Тестіңіз [5] жағдайын тексермейді: бірінші мен соңғыны қосатын қате нұсқа өтіп кетті'\nassert _catches(lambda xs: sum(xs) if xs else None), 'Тестіңіз бос тізім [] жағдайын тексермейді'\nassert _catches(lambda xs: max(xs) * 2 if len(xs) > 1 else sum(xs)), 'Тестіңіз [100, 200] → 300 жағдайын тексермейді'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Хабары бар assert",
   "prompt": "<p><code>check_temperature(t)</code> функциясын жазыңыз: <code>assert</code> арқылы температура −60 пен 60 аралығында екенін тексерсін (шекаралар да дұрыс). Шарт орындалмаса, <code>AssertionError</code> хабарында <code>\"температура\"</code> сөзі болсын. Дұрыс болса, функция <code>t</code>-ны қайтарсын.</p>",
   "starter": "def check_temperature(t):\n    return t\n",
   "solution": "def check_temperature(t):\n    assert -60 <= t <= 60, f'температура аралықтан тыс: {t}'\n    return t\n\nprint(check_temperature(-25))\n",
   "hints": [
    "<code>assert шарт, 'хабар'</code> — шарт жалған болса, хабармен AssertionError шығады.",
    "<code>assert -60 &lt;= t &lt;= 60, f'температура аралықтан тыс: {t}'</code>."
   ],
   "check": {
    "tests": "assert check_temperature(-25) == -25 and check_temperature(60) == 60 and check_temperature(-60) == -60, 'Аралықтағы мән (шекаралар да) қайтарылуы керек'\nfor _v in [75, -61]:\n    try:\n        check_temperature(_v)\n    except AssertionError as _e:\n        assert 'температура' in str(_e), 'AssertionError хабарында «температура» сөзі болсын'\n    else:\n        raise AssertionError(f'check_temperature({_v}) AssertionError беруі керек')"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Тест бойынша түзету",
   "prompt": "<p>Әріптес <code>test_average()</code> тестін жазды, бірақ <code>average</code> функциясы бос тізімде құлайды. Тестті өзгертпей, функцияны түзетіңіз: бос тізім үшін <code>0</code> қайтарсын, басқа жағдайда орташаны.</p>",
   "starter": "def average(xs):\n    return sum(xs) / len(xs)\n\ndef test_average():\n    assert average([2, 4]) == 3\n    assert average([5]) == 5\n    assert average([]) == 0\n\ntest_average()\nprint('тест өтті')\n",
   "solution": "def average(xs):\n    if not xs:\n        return 0\n    return sum(xs) / len(xs)\n\ndef test_average():\n    assert average([2, 4]) == 3\n    assert average([5]) == 5\n    assert average([]) == 0\n\ntest_average()\nprint('тест өтті')\n",
   "hints": [
    "Бос тізімді алдымен тексеріңіз: <code>if not xs: return 0</code>.",
    "Тест — талаптың өзі: оны өзгертпей, кодты түзетеміз."
   ],
   "check": {
    "tests": "test_average()\nassert average([1, 2, 3, 4]) == 2.5, 'average([1, 2, 3, 4]) 2.5 қайтаруы керек'\nassert average([]) == 0, 'Бос тізім үшін 0'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Кесте бойынша тест",
   "prompt": "<p><code>is_valid_phone(s)</code> функциясы дайын: нөмір <code>\"+7\"</code>-ден басталып, одан кейін дәл 10 цифр болса дұрыс. <code>CASES</code> тізімін <code>(кіріс, күтілетін нәтиже)</code> жұптарымен толтырыңыз (кемінде 4 жағдай: дұрыс нөмір, <code>+7</code>-сіз нөмір, цифры аз нөмір, цифр емес таңбасы бар нөмір) және <code>test_is_valid_phone()</code> ішінде оларды циклмен тексеріңіз (pytest-тің <code>parametrize</code> идеясы).</p>",
   "starter": "def is_valid_phone(s):\n    return s.startswith('+7') and len(s) == 12 and s[2:].isdigit()\n\nCASES = []\n\ndef test_is_valid_phone():\n    for s, expected in CASES:\n        pass\n\ntest_is_valid_phone()\nprint('тест өтті')\n",
   "solution": "def is_valid_phone(s):\n    return s.startswith('+7') and len(s) == 12 and s[2:].isdigit()\n\nCASES = [\n    ('+77011234567', True),\n    ('87011234567', False),\n    ('+7701123456', False),\n    ('+7701123456a', False),\n]\n\ndef test_is_valid_phone():\n    for s, expected in CASES:\n        assert is_valid_phone(s) == expected, s\n\ntest_is_valid_phone()\nprint('тест өтті')\n",
   "hints": [
    "Жұптар: <code>('+77011234567', True)</code>, <code>('87011234567', False)</code>, ...",
    "Цикл ішінде: <code>assert is_valid_phone(s) == expected, s</code>."
   ],
   "check": {
    "tests": "test_is_valid_phone()\nassert len(CASES) >= 4, 'CASES-та кемінде 4 жағдай болсын'\n\ndef _catches(_bad):\n    global is_valid_phone\n    _ok_fn = is_valid_phone\n    is_valid_phone = _bad\n    try:\n        test_is_valid_phone()\n        return False\n    except Exception:\n        return True\n    finally:\n        is_valid_phone = _ok_fn\n\nassert _catches(lambda s: False), 'Тестіңізде дұрыс нөмір (True күтілетін жағдай) жоқ'\nassert _catches(lambda s: (s.startswith('+7') and len(s) == 12 and s[2:].isdigit()) or (len(s) == 11 and s.isdigit())), 'Тестіңіз +7-сіз нөмірді тексермейді'\nassert _catches(lambda s: s.startswith('+7') and s[2:].isdigit()), 'Тестіңіз цифры аз нөмірді тексермейді'\nassert _catches(lambda s: s.startswith('+7') and len(s) == 12), 'Тестіңіз цифр емес таңбасы бар нөмірді тексермейді'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қатені күтетін тест",
   "prompt": "<p><code>parse_age(text)</code> дайын: мәтінді <code>int</code>-ке айналдырады, теріс немесе 120-дан үлкен болса <code>ValueError</code>. <code>test_parse_age()</code> жазыңыз: (1) <code>\"25\"</code> → 25; (2) <code>\"-3\"</code> үшін <code>ValueError</code>; (3) <code>\"абв\"</code> үшін <code>ValueError</code>. pytest жоқ, сондықтан <code>try/except/else</code> қолданыңыз.</p>",
   "starter": "def parse_age(text):\n    age = int(text)\n    if not 0 <= age <= 120:\n        raise ValueError('жас 0 мен 120 аралығында болуы керек')\n    return age\n\ndef test_parse_age():\n    assert parse_age('25') == 25\n\ntest_parse_age()\n",
   "solution": "def parse_age(text):\n    age = int(text)\n    if not 0 <= age <= 120:\n        raise ValueError('жас 0 мен 120 аралығында болуы керек')\n    return age\n\ndef test_parse_age():\n    assert parse_age('25') == 25\n    for bad in ['-3', 'абв']:\n        try:\n            parse_age(bad)\n        except ValueError:\n            pass\n        else:\n            raise AssertionError(f'{bad} үшін ValueError күтілді')\n\ntest_parse_age()\nprint('тест өтті')\n",
   "hints": [
    "Үлгі: <code>try: parse_age('-3')</code> / <code>except ValueError: pass</code> / <code>else: raise AssertionError(...)</code>.",
    "Екі қате кірісті тізімге салып, циклмен тексеруге болады."
   ],
   "check": {
    "tests": "test_parse_age()\n\ndef _catches(_bad):\n    global parse_age\n    _ok_fn = parse_age\n    parse_age = _bad\n    try:\n        test_parse_age()\n        return False\n    except Exception:\n        return True\n    finally:\n        parse_age = _ok_fn\n\ndef _no_range(t):\n    return int(t)\ndef _no_text(t):\n    try:\n        a = int(t)\n    except ValueError:\n        return 0\n    if a < 0:\n        raise ValueError('теріс')\n    return a\nassert _catches(_no_range), 'Тестіңіз \"-3\" үшін ValueError-ды тексермейді'\nassert _catches(_no_text), 'Тестіңіз \"абв\" үшін ValueError-ды тексермейді'\nassert _catches(lambda t: abs(int(t)) + 1 if int(t) >= 0 else int('x')), 'Тестіңіз \"25\" → 25 жағдайын тексермейді'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Fixture функциясы",
   "prompt": "<p>pytest-тегі fixture-ді қолмен жасаймыз. <code>sample_orders()</code> функциясын жазыңыз: ол әр шақырылғанда <b>жаңа</b> тізім қайтарсын: <code>[{'city': 'Алматы', 'amount': 100}, {'city': 'Астана', 'amount': 40}, {'city': 'Алматы', 'amount': 60}]</code>. Сосын <code>test_count_city(orders)</code> жазыңыз: <code>count_city(orders, 'Алматы') == 2</code> және <code>count_city(orders, 'Орал') == 0</code> екенін тексерсін.</p>",
   "starter": "def count_city(orders, city):\n    return sum(1 for o in orders if o['city'] == city)\n\ndef sample_orders():\n    pass\n\ndef test_count_city(orders):\n    pass\n\ntest_count_city(sample_orders())\n",
   "solution": "def count_city(orders, city):\n    return sum(1 for o in orders if o['city'] == city)\n\ndef sample_orders():\n    return [\n        {'city': 'Алматы', 'amount': 100},\n        {'city': 'Астана', 'amount': 40},\n        {'city': 'Алматы', 'amount': 60},\n    ]\n\ndef test_count_city(orders):\n    assert count_city(orders, 'Алматы') == 2\n    assert count_city(orders, 'Орал') == 0\n\ntest_count_city(sample_orders())\nprint('тест өтті')\n",
   "hints": [
    "Тізімді функцияның ішінде жасаңыз: сонда әр шақыруда жаңа объект болады.",
    "Тест функциясы дерекді параметр ретінде алады: <code>def test_count_city(orders):</code>."
   ],
   "check": {
    "tests": "_a = sample_orders()\nassert isinstance(_a, list) and len(_a) == 3, 'sample_orders() 3 тапсырыс тізімін қайтаруы керек'\n_a.append({'city': 'Орал', 'amount': 1})\nassert len(sample_orders()) == 3, 'Әр шақыруда жаңа тізім қайтуы керек (бір тесттің өзгерісі екіншісіне әсер етпесін)'\ntest_count_city(sample_orders())\ndef _catches(_bad):\n    global count_city\n    _ok_fn = count_city\n    count_city = _bad\n    try:\n        test_count_city(sample_orders())\n        return False\n    except Exception:\n        return True\n    finally:\n        count_city = _ok_fn\nassert _catches(lambda orders, city: 0), 'Тестіңіз count_city(orders, \"Алматы\") == 2 жағдайын тексермейді'\nassert _catches(lambda orders, city: 2), 'Тестіңіз count_city(orders, \"Орал\") == 0 жағдайын тексермейді'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Мутанттарды ұстау",
   "prompt": "<p><code>to_gross(net, rate=0.12)</code> дайын: ҚҚС қосып, 2 таңбаға дөңгелектейді, теріс <code>net</code> болса <code>ValueError</code>. <code>test_to_gross()</code> жазыңыз, ол мына қате нұсқалардың бәрін ұстасын: әдепкі ставка дұрыс емес; <code>rate</code> параметрі еленбейді; дөңгелектеу жоқ; теріс сома тексерілмейді. Кеңес: <code>to_gross(1000)</code>, <code>to_gross(1000, 0.2)</code>, <code>to_gross(10.01)</code>, <code>to_gross(-5)</code>.</p>",
   "starter": "def to_gross(net, rate=0.12):\n    if net < 0:\n        raise ValueError('net теріс болмауы керек')\n    return round(net * (1 + rate), 2)\n\ndef test_to_gross():\n    assert to_gross(1000) == 1120\n\ntest_to_gross()\n",
   "solution": "def to_gross(net, rate=0.12):\n    if net < 0:\n        raise ValueError('net теріс болмауы керек')\n    return round(net * (1 + rate), 2)\n\ndef test_to_gross():\n    assert to_gross(1000) == 1120\n    assert to_gross(1000, 0.2) == 1200\n    assert to_gross(10.01) == 11.21\n    try:\n        to_gross(-5)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError('теріс net үшін ValueError күтілді')\n\ntest_to_gross()\nprint('тест өтті')\n",
   "hints": [
    "Әр мутантқа бір assert: әдепкі ставка, басқа ставка, дөңгелектеу (<code>10.01 * 1.12 = 11.2112</code>), теріс сома.",
    "Қатені <code>try/except ValueError/else: raise AssertionError</code> арқылы тексеріңіз."
   ],
   "check": {
    "tests": "test_to_gross()\n\ndef _catches(_bad):\n    global to_gross\n    _ok_fn = to_gross\n    to_gross = _bad\n    try:\n        test_to_gross()\n        return False\n    except Exception:\n        return True\n    finally:\n        to_gross = _ok_fn\n\ndef _chk(n):\n    if n < 0:\n        raise ValueError('bad')\ndef _m1(net, rate=0.1):\n    _chk(net)\n    return round(net * (1 + rate), 2)\ndef _m2(net, rate=0.12):\n    _chk(net)\n    return round(net * 1.12, 2)\ndef _m3(net, rate=0.12):\n    _chk(net)\n    return net * (1 + rate)\ndef _m4(net, rate=0.12):\n    return round(net * (1 + rate), 2)\nassert _catches(_m1), 'Тестіңіз әдепкі ставканы (0.12) тексермейді'\nassert _catches(_m2), 'Тестіңіз rate параметрін тексермейді (мысалы to_gross(1000, 0.2) == 1200)'\nassert _catches(_m3), 'Тестіңіз дөңгелектеуді тексермейді (мысалы to_gross(10.01) == 11.21)'\nassert _catches(_m4), 'Тестіңіз теріс сомада ValueError-ды тексермейді'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Кішкене тест жүргізуші",
   "prompt": "<p>pytest-ке ұқсас <code>run_tests(tests)</code> жазыңыз: <code>tests</code> — тест функцияларының тізімі. Әрқайсысын шақырып, нәтижені сөздік ретінде қайтарсын: <code>{'passed': өткендер саны, 'failed': құлаған тесттердің атаулары (<code>func.__name__</code>), 'errors': AssertionError емес қате берген тесттердің атаулары}</code>. Тізімдер тесттер ретімен болсын.</p>",
   "starter": "def run_tests(tests):\n    for t in tests:\n        t()\n    return {'passed': len(tests), 'failed': [], 'errors': []}\n",
   "solution": "def run_tests(tests):\n    result = {'passed': 0, 'failed': [], 'errors': []}\n    for t in tests:\n        try:\n            t()\n        except AssertionError:\n            result['failed'].append(t.__name__)\n        except Exception:\n            result['errors'].append(t.__name__)\n        else:\n            result['passed'] += 1\n    return result\n\ndef test_ok():\n    assert 1 + 1 == 2\n\ndef test_bad():\n    assert 'Алматы'.upper() == 'алматы'\n\nprint(run_tests([test_ok, test_bad]))\n",
   "hints": [
    "Әр тестті <code>try: t()</code> ішінде шақырыңыз; алдымен <code>except AssertionError</code>, сосын <code>except Exception</code>.",
    "<code>else</code> блогы — тест өтті: <code>passed += 1</code>."
   ],
   "check": {
    "tests": "def test_a():\n    assert True\ndef test_b():\n    assert 2 * 2 == 5, 'математика'\ndef test_c():\n    return int('абв')\ndef test_d():\n    pass\n_r = run_tests([test_a, test_b, test_c, test_d])\nassert _r == {'passed': 2, 'failed': ['test_b'], 'errors': ['test_c']}, f'Нәтиже дұрыс емес: {_r}'\nassert run_tests([]) == {'passed': 0, 'failed': [], 'errors': []}, 'Тест жоқ болса passed=0, тізімдер бос'"
   }
  }
 ],
 "swe-5": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Нөлге бөлуден қорғау",
   "prompt": "<p><code>safe_divide(a, b)</code> функциясын жазыңыз: <code>a / b</code> қайтарсын, ал <code>b == 0</code> болып <code>ZeroDivisionError</code> шықса, <code>None</code> қайтарсын. <code>try/except</code> қолданыңыз. Мысалы, <code>safe_divide(10, 4)</code> → <code>2.5</code>, <code>safe_divide(5, 0)</code> → <code>None</code>.</p>",
   "starter": "def safe_divide(a, b):\n    return a / b\n",
   "solution": "def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return None\n\nprint(safe_divide(10, 4), safe_divide(5, 0))\n",
   "hints": [
    "<code>try: return a / b</code>, <code>except ZeroDivisionError: return None</code>.",
    "Жай <code>except:</code> жазбаңыз: тек нақты қатені ұстаңыз."
   ],
   "check": {
    "tests": "assert safe_divide(10, 4) == 2.5, 'safe_divide(10, 4) 2.5 қайтаруы керек'\nassert safe_divide(5, 0) is None, 'safe_divide(5, 0) None қайтаруы керек'\ntry:\n    safe_divide('10', 2)\nexcept TypeError:\n    pass\nelse:\n    raise AssertionError('Тек ZeroDivisionError ұсталсын: мәтінді бөлу TypeError беруі керек')"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Өз қате класы",
   "prompt": "<p><code>DataQualityError</code> қате класын жазыңыз (<code>Exception</code>-нан мұра алады). Сосын <code>check_bad_share(bad, total)</code> функциясын жазыңыз: қате жолдар үлесі 5%-дан көп болса (<code>bad / total &gt; 0.05</code>), <code>DataQualityError</code> лақтырсын, әйтпесе үлесті қайтарсын.</p>",
   "starter": "def check_bad_share(bad, total):\n    return bad / total\n",
   "solution": "class DataQualityError(Exception):\n    pass\n\ndef check_bad_share(bad, total):\n    share = bad / total\n    if share > 0.05:\n        raise DataQualityError(f'Қате жолдар тым көп: {share:.1%}')\n    return share\n\nprint(check_bad_share(3, 100))\n",
   "hints": [
    "<code>class DataQualityError(Exception): pass</code>.",
    "<code>if share &gt; 0.05: raise DataQualityError(...)</code>."
   ],
   "check": {
    "tests": "assert issubclass(DataQualityError, Exception), 'DataQualityError Exception-нан мұра алуы керек'\nassert check_bad_share(3, 100) == 0.03, 'check_bad_share(3, 100) 0.03 қайтаруы керек'\nassert check_bad_share(5, 100) == 0.05, 'Дәл 5% — әлі рұқсат'\ntry:\n    check_bad_share(6, 100)\nexcept DataQualityError:\n    pass\nelse:\n    raise AssertionError('6% болса DataQualityError лақтырылуы керек')"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жасты тексеру",
   "prompt": "<p><code>parse_age(text)</code> функциясын жазыңыз: мәтінді <code>int</code>-ке айналдырсын (сан емес мәтінде <code>int</code> өзі <code>ValueError</code> береді); жас 0 мен 120 аралығынан тыс болса, хабарында <code>\"жас\"</code> сөзі бар <code>ValueError</code> лақтырсын.</p>",
   "starter": "def parse_age(text):\n    return int(text)\n",
   "solution": "def parse_age(text):\n    age = int(text)\n    if not 0 <= age <= 120:\n        raise ValueError(f'жас 0 мен 120 аралығында болуы керек: {age}')\n    return age\n\nprint(parse_age('34'))\n",
   "hints": [
    "<code>if not 0 &lt;= age &lt;= 120: raise ValueError('жас ...')</code>.",
    "Хабарға мәннің өзін қосу пайдалы: <code>f'...: {age}'</code>."
   ],
   "check": {
    "tests": "assert parse_age('34') == 34 and parse_age('0') == 0 and parse_age('120') == 120, 'Аралықтағы жас int ретінде қайтарылуы керек'\nfor _v in ['-1', '150']:\n    try:\n        parse_age(_v)\n    except ValueError as _e:\n        assert 'жас' in str(_e), 'Хабарда «жас» сөзі болсын'\n    else:\n        raise AssertionError(f'parse_age({_v!r}) ValueError лақтыруы керек')\ntry:\n    parse_age('отыз')\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Сан емес мәтін ValueError беруі керек')"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "finally блогы",
   "prompt": "<p><code>process(items, journal)</code> функциясын жазыңыз: басында <code>journal</code>-ға <code>'start'</code> қосады, сосын әр элементті <code>int()</code>-ке айналдырып, қосындысын қайтарады. Қате шықса да, шықпаса да, соңында <code>journal</code>-ға <code>'end'</code> қосылуы керек (<code>finally</code>), ал қате жоғары қарай кете берсін.</p>",
   "starter": "def process(items, journal):\n    journal.append('start')\n    total = sum(int(x) for x in items)\n    journal.append('end')\n    return total\n",
   "solution": "def process(items, journal):\n    journal.append('start')\n    try:\n        return sum(int(x) for x in items)\n    finally:\n        journal.append('end')\n\nj = []\nprint(process(['1', '2'], j), j)\n",
   "hints": [
    "<code>try: return sum(...)</code>, <code>finally: journal.append('end')</code>.",
    "<code>except</code> жазбаңыз: қате жоғары кетуі керек, тек «тазалау» әрқашан орындалады."
   ],
   "check": {
    "tests": "_j = []\nassert process(['1', '2', '3'], _j) == 6, 'process([\"1\", \"2\", \"3\"], j) 6 қайтаруы керек'\nassert _j == ['start', 'end'], 'Сәтті жағдайда journal = [\"start\", \"end\"]'\n_j = []\ntry:\n    process(['1', 'екі'], _j)\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Қате жоғары кетуі керек (ValueError), оны жасырмаңыз')\nassert _j == ['start', 'end'], 'Қате шықса да \"end\" жазылуы керек (finally)'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Деңгей бойынша журнал",
   "prompt": "<p><code>report(bad, total, logger)</code> функциясын жазыңыз: қате жол жоқ болса <code>logger.info(...)</code>; қате жолдар үлесі 5%-дан аспаса <code>logger.warning(...)</code>; 5%-дан көп болса <code>logger.error(...)</code>. Әр шақыруда дәл бір хабар жазылсын. Хабарда қате жолдар саны болсын.</p>",
   "starter": "import logging\nlogger = logging.getLogger('practice.report')\n\ndef report(bad, total, logger):\n    print(bad, 'қате жол')\n",
   "solution": "import logging\nlogger = logging.getLogger('practice.report')\n\ndef report(bad, total, logger):\n    share = bad / total\n    if bad == 0:\n        logger.info('Қате жол жоқ, барлығы %s', total)\n    elif share <= 0.05:\n        logger.warning('%s қате жол өткізілді', bad)\n    else:\n        logger.error('%s қате жол: үлесі %.1f%%', bad, share * 100)\n\nreport(3, 100, logger)\n",
   "hints": [
    "Үш тармақ: <code>if bad == 0</code> → info, <code>elif bad / total &lt;= 0.05</code> → warning, <code>else</code> → error.",
    "Хабарға санды параметр ретінде беріңіз: <code>logger.warning('%s қате жол', bad)</code>."
   ],
   "check": {
    "tests": "import logging as _lg\nclass _H(_lg.Handler):\n    def __init__(self):\n        super().__init__()\n        self.records = []\n    def emit(self, record):\n        self.records.append(record)\n\n_h = _H()\n_l = _lg.getLogger('practice.report.test')\n_l.setLevel(_lg.DEBUG)\n_l.addHandler(_h)\n_l.propagate = False\nreport(0, 200, _l)\nreport(4, 100, _l)\nreport(17, 100, _l)\n_l.removeHandler(_h)\nassert len(_h.records) == 3, f'Әр шақыруда дәл бір хабар жазылсын: 3 күтілді, сізде {len(_h.records)}'\nassert [r.levelno for r in _h.records] == [_lg.INFO, _lg.WARNING, _lg.ERROR], 'Деңгейлер: 0 қате → INFO, 4% → WARNING, 17% → ERROR'\nassert '17' in _h.records[2].getMessage() and '4' in _h.records[1].getMessage(), 'Хабарда қате жолдар саны болсын'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ауа райы көрсеткіштері",
   "prompt": "<p>Метеостанциядан температуралар мәтін түрінде келеді, кейбірі бұзық (<code>\"—\"</code>, <code>\"\"</code>, <code>\"n/a\"</code>). <code>parse_temps(values)</code> жазыңыз: әр мәнді <code>float</code>-қа айналдырсын, айналмайтынын <code>None</code> етсін. <code>(temps, bad_count)</code> қайтарсын. <code>try/except ValueError</code> қолданыңыз.</p>",
   "starter": "def parse_temps(values):\n    temps = [float(v) for v in values]\n    return temps, 0\n",
   "solution": "def parse_temps(values):\n    temps, bad = [], 0\n    for v in values:\n        try:\n            temps.append(float(v))\n        except ValueError:\n            temps.append(None)\n            bad += 1\n    return temps, bad\n\nprint(parse_temps(['-12.5', '—', '3', '']))\n",
   "hints": [
    "Цикл ішінде: <code>try: temps.append(float(v))</code>, <code>except ValueError: temps.append(None)</code>.",
    "Санауышты <code>except</code> ішінде арттырыңыз."
   ],
   "check": {
    "tests": "assert parse_temps(['-12.5', '—', '3', '']) == ([-12.5, None, 3.0, None], 2), 'parse_temps([\"-12.5\", \"—\", \"3\", \"\"]) ([-12.5, None, 3.0, None], 2) қайтаруы керек'\nassert parse_temps(['n/a']) == ([None], 1), '\"n/a\" → None'\nassert parse_temps([]) == ([], 0), 'Бос тізім үшін ([], 0)'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "5% ережесі",
   "prompt": "<p><code>load_amounts(rows, max_bad_share=0.05)</code> жазыңыз. <code>rows</code> — сомалар мәтіні. Әр мәнді <code>float</code>-қа айналдырыңыз; айналмаса немесе теріс болса, оны өткізіп, <code>logger.warning(...)</code> жазыңыз. Барлық жол өңделгеннен кейін қате үлесі <code>max_bad_share</code>-тен көп болса, <code>logger.error(...)</code> жазып, <code>DataQualityError</code> лақтырыңыз. Әйтпесе дұрыс сомалар тізімін қайтарыңыз. Logger: <code>logging.getLogger('practice.load')</code>.</p>",
   "starter": "import logging\nlogger = logging.getLogger('practice.load')\n\nclass DataQualityError(Exception):\n    pass\n\ndef load_amounts(rows, max_bad_share=0.05):\n    return [float(r) for r in rows]\n",
   "solution": "import logging\nlogger = logging.getLogger('practice.load')\n\nclass DataQualityError(Exception):\n    pass\n\ndef load_amounts(rows, max_bad_share=0.05):\n    good, bad = [], 0\n    for r in rows:\n        try:\n            amount = float(r)\n            if amount < 0:\n                raise ValueError(f'теріс сома: {amount}')\n        except ValueError as e:\n            bad += 1\n            logger.warning('Жол өткізілді: %r (%s)', r, e)\n            continue\n        good.append(amount)\n    if rows and bad / len(rows) > max_bad_share:\n        logger.error('Қате жолдар үлесі %.1f%%', bad / len(rows) * 100)\n        raise DataQualityError(f'{bad} қате жол {len(rows)} жолдың ішінде')\n    return good\n\nprint(load_amounts(['100'] * 19 + ['—']))\n",
   "hints": [
    "Теріс соманы да <code>ValueError</code> ретінде лақтырсаңыз, бір <code>except</code> екеуін де ұстайды.",
    "Үлесті цикл біткен соң тексеріңіз: <code>bad / len(rows) &gt; max_bad_share</code>."
   ],
   "check": {
    "tests": "import logging as _lg\nclass _H(_lg.Handler):\n    def __init__(self):\n        super().__init__()\n        self.records = []\n    def emit(self, record):\n        self.records.append(record)\n\n_h = _H()\n_lg.getLogger('practice.load').addHandler(_h)\ntry:\n    _g = load_amounts(['100'] * 19 + ['—'])\n    assert _g == [100.0] * 19, '19 дұрыс сома float ретінде қайтуы керек'\n    assert len([r for r in _h.records if r.levelno == _lg.WARNING]) == 1, 'Әр қате жол үшін бір logger.warning'\n    _h.records.clear()\n    try:\n        load_amounts(['100', '-5', 'abc', '200'])\n    except DataQualityError:\n        pass\n    else:\n        raise AssertionError('Қате үлесі 50% > 5%: DataQualityError лақтырылуы керек')\n    assert len([r for r in _h.records if r.levelno == _lg.WARNING]) == 2, 'Теріс сома да, мәтін де warning береді'\n    assert any(r.levelno == _lg.ERROR for r in _h.records), 'Тоқтамас бұрын logger.error жазылсын'\n    assert load_amounts(['1', 'x', '2', '3'], max_bad_share=0.3) == [1.0, 2.0, 3.0], 'max_bad_share параметрі ескерілуі керек (25% < 30%)'\nfinally:\n    _lg.getLogger('practice.load').removeHandler(_h)"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Қайталап көру",
   "prompt": "<p>Желі кейде үзіледі. <code>retry(func, attempts=3, logger=None)</code> жазыңыз: <code>func()</code>-ты шақырады; <code>ConnectionError</code> шықса, <code>logger.warning(...)</code> жазып (logger берілсе), қайта көреді. Сәтті болса нәтижені қайтарады. Барлық <code>attempts</code> әрекет сәтсіз болса, соңғы қатені қайта лақтырады (<code>raise</code>). Басқа қателерді ұстамаңыз.</p>",
   "starter": "def retry(func, attempts=3, logger=None):\n    return func()\n",
   "solution": "def retry(func, attempts=3, logger=None):\n    for i in range(1, attempts + 1):\n        try:\n            return func()\n        except ConnectionError as e:\n            if logger is not None:\n                logger.warning('%s-әрекет сәтсіз: %s', i, e)\n            if i == attempts:\n                raise\n\ncalls = []\ndef flaky():\n    calls.append(1)\n    if len(calls) < 3:\n        raise ConnectionError('байланыс үзілді')\n    return 'ok'\n\nprint(retry(flaky), len(calls))\n",
   "hints": [
    "<code>for i in range(1, attempts + 1):</code> ішінде <code>try: return func()</code>.",
    "Соңғы әрекетте <code>except</code> ішінде жай <code>raise</code> — сол қатені қайта лақтырады."
   ],
   "check": {
    "tests": "import logging as _lg\nclass _H(_lg.Handler):\n    def __init__(self):\n        super().__init__()\n        self.records = []\n    def emit(self, record):\n        self.records.append(record)\n\n_h = _H()\n_l = _lg.getLogger('practice.retry.test')\n_l.addHandler(_h)\n_l.propagate = False\n_n = []\ndef _flaky():\n    _n.append(1)\n    if len(_n) < 3:\n        raise ConnectionError('үзілді')\n    return 42\nassert retry(_flaky, logger=_l) == 42 and len(_n) == 3, 'Үшінші әрекетте сәтті: 42 қайтуы керек'\nassert len(_h.records) == 2 and all(r.levelno == _lg.WARNING for r in _h.records), 'Әр сәтсіз әрекет үшін logger.warning'\n_m = []\ndef _down():\n    _m.append(1)\n    raise ConnectionError('сервер жоқ')\ntry:\n    retry(_down, attempts=4)\nexcept ConnectionError:\n    pass\nelse:\n    raise AssertionError('Барлық әрекет сәтсіз болса, ConnectionError қайта лақтырылуы керек')\nassert len(_m) == 4, f'attempts=4 болса 4 рет шақырылуы керек, сізде {len(_m)}'\n_k = []\ndef _bug():\n    _k.append(1)\n    raise KeyError('x')\ntry:\n    retry(_bug)\nexcept KeyError:\n    pass\nassert len(_k) == 1, 'Басқа қателерде қайталамаңыз: тек ConnectionError'\n_l.removeHandler(_h)"
   }
  }
 ],
 "swe-6": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Нұсқа бекітілген бе",
   "prompt": "<p><code>is_pinned(line)</code> функциясын жазыңыз: requirements.txt жолында нұсқа <code>==</code> арқылы бекітілсе <code>True</code>, әйтпесе <code>False</code>. Жол соңындағы <code>#</code> түсініктемесін еленбеңіз. Мысалы, <code>\"pandas==2.2.3\"</code> → <code>True</code>, <code>\"numpy&gt;=1.26\"</code> → <code>False</code>, <code>\"joblib  # ==1.4 керек\"</code> → <code>False</code>.</p>",
   "starter": "def is_pinned(line):\n    return '==' in line\n",
   "solution": "def is_pinned(line):\n    return '==' in line.split('#')[0]\n\nprint(is_pinned('pandas==2.2.3'), is_pinned('joblib  # ==1.4 керек'))\n",
   "hints": [
    "Алдымен түсініктемені кесіңіз: <code>line.split('#')[0]</code>.",
    "Сосын <code>'==' in ...</code>."
   ],
   "check": {
    "tests": "assert is_pinned('pandas==2.2.3') is True, '\"pandas==2.2.3\" бекітілген'\nassert is_pinned('numpy>=1.26') is False, '\">=\" бекіту емес'\nassert is_pinned('joblib  # ==1.4 керек') is False, 'Түсініктемедегі \"==\" есептелмейді'\nassert is_pinned('fastapi==0.115.0  # API') is True, 'Соңында түсініктемесі бар бекітілген жол'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Пакет атауы",
   "prompt": "<p><code>package_name(line)</code> функциясын жазыңыз: requirements.txt жолынан тек пакет атауын қайтарсын: <code>\"scikit-learn==1.6.1\"</code> → <code>\"scikit-learn\"</code>, <code>\"numpy&gt;=1.26\"</code> → <code>\"numpy\"</code>, <code>\" joblib \"</code> → <code>\"joblib\"</code>.</p>",
   "starter": "def package_name(line):\n    return line.split('==')[0]\n",
   "solution": "def package_name(line):\n    return line.split('==')[0].split('>=')[0].strip()\n\nprint(package_name('numpy>=1.26'))\n",
   "hints": [
    "Екі рет бөліңіз: <code>line.split('==')[0].split('&gt;=')[0]</code>.",
    "Соңында <code>.strip()</code>."
   ],
   "check": {
    "tests": "assert package_name('scikit-learn==1.6.1') == 'scikit-learn', '\"scikit-learn==1.6.1\" → \"scikit-learn\"'\nassert package_name('numpy>=1.26') == 'numpy', '\"numpy>=1.26\" → \"numpy\"'\nassert package_name(' joblib ') == 'joblib', 'Бос орындарды алып тастаңыз'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": ".gitignore тексеру",
   "prompt": "<p><code>venv_ignored(gitignore)</code> функциясын жазыңыз: <code>.gitignore</code> мәтінінде <code>.venv</code> немесе <code>.venv/</code> жолы бар болса <code>True</code> қайтарсын (жолдың шетіндегі бос орындар еленбейді). <code>#</code>-пен басталатын жол — түсініктеме, ол есептелмейді.</p>",
   "starter": "def venv_ignored(gitignore):\n    return '.venv' in gitignore\n",
   "solution": "def venv_ignored(gitignore):\n    for line in gitignore.splitlines():\n        if line.strip() in ('.venv', '.venv/'):\n            return True\n    return False\n\nprint(venv_ignored('__pycache__/\\n.venv/\\n.env\\n'))\n",
   "hints": [
    "Әр жолды бөлек қараңыз: <code>for line in gitignore.splitlines():</code>.",
    "<code>line.strip() in ('.venv', '.venv/')</code>."
   ],
   "check": {
    "tests": "assert venv_ignored('__pycache__/\\n.venv/\\n.env\\n') is True, '\".venv/\" жолы бар: True'\nassert venv_ignored('  .venv  \\n') is True, 'Шеттегі бос орындар еленбейді'\nassert venv_ignored('# .venv\\n.env\\n') is False, 'Түсініктемедегі .venv есептелмейді'\nassert venv_ignored('.venv_old/\\n') is False, '.venv_old басқа папка'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "requirements.txt жасау",
   "prompt": "<p><code>to_requirements(packages)</code> функциясын жазыңыз: <code>{пакет: нұсқа}</code> сөздігінен requirements.txt мәтінін жасасын. Әр жол <code>пакет==нұсқа</code>, пакеттер атауы бойынша сұрыпталсын, әр жол <code>\\n</code>-мен аяқталсын. Нұсқасы <code>None</code> пакет атауымен ғана жазылады.</p>",
   "starter": "def to_requirements(packages):\n    return ''\n",
   "solution": "def to_requirements(packages):\n    lines = []\n    for name in sorted(packages):\n        version = packages[name]\n        lines.append(name if version is None else f'{name}=={version}')\n    return ''.join(line + '\\n' for line in lines)\n\nprint(to_requirements({'pandas': '2.2.3', 'fastapi': '0.115.0', 'joblib': None}))\n",
   "hints": [
    "<code>for name in sorted(packages):</code> — атау бойынша сұрыптау.",
    "Әр жолға <code>'\\n'</code> қосыңыз: <code>''.join(line + '\\n' for line in lines)</code>."
   ],
   "check": {
    "tests": "assert to_requirements({'pandas': '2.2.3', 'fastapi': '0.115.0'}) == 'fastapi==0.115.0\\npandas==2.2.3\\n', 'Пакеттер сұрыпталып, әр жол \\\\n-мен аяқталуы керек'\nassert to_requirements({'joblib': None, 'numpy': '2.1.3'}) == 'joblib\\nnumpy==2.1.3\\n', 'Нұсқасы None болса тек атауы'\nassert to_requirements({}) == '', 'Бос сөздік үшін бос мәтін'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бекітілмеген пакеттер",
   "prompt": "<p><code>unpinned(text)</code> функциясын жазыңыз: requirements.txt мәтініндегі <code>==</code> арқылы бекітілмеген пакеттердің атауларын файлдағы ретпен тізім етіп қайтарсын. Бос жолдар мен түсініктемелер еленбейді. Өнімде мұндай пакеттер қауіпті: ертең басқа нұсқа орнатылуы мүмкін.</p>",
   "starter": "req = \"\"\"# API\npandas==2.2.3\nnumpy>=1.26\n\nscikit-learn==1.6.1  # модель\njoblib\nuvicorn>=0.30  # сервер\n\"\"\"\n\ndef unpinned(text):\n    return []\n",
   "solution": "req = \"\"\"# API\npandas==2.2.3\nnumpy>=1.26\n\nscikit-learn==1.6.1  # модель\njoblib\nuvicorn>=0.30  # сервер\n\"\"\"\n\ndef unpinned(text):\n    result = []\n    for line in text.splitlines():\n        line = line.split('#')[0].strip()\n        if not line or '==' in line:\n            continue\n        result.append(line.split('>=')[0].strip())\n    return result\n\nprint(unpinned(req))\n",
   "hints": [
    "Әр жолды тазалаңыз: <code>line.split('#')[0].strip()</code>; бос немесе <code>==</code> бар болса <code>continue</code>.",
    "Атауы: <code>line.split('&gt;=')[0].strip()</code>."
   ],
   "check": {
    "tests": "assert unpinned(req) == ['numpy', 'joblib', 'uvicorn'], f'Күтілгені [\"numpy\", \"joblib\", \"uvicorn\"], сізде {unpinned(req)}'\nassert unpinned('pandas==2.2.3\\n# numpy\\n') == [], 'Барлығы бекітілген болса бос тізім'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Нұсқаларды салыстыру",
   "prompt": "<p>Нұсқа мәтінін салыстыру қиын: <code>\"1.10\" &lt; \"1.9\"</code> мәтін ретінде <code>True</code>! Екі функция жазыңыз: <code>version_tuple(v)</code> → бүтін сандар кортежі (<code>\"2.2.3\"</code> → <code>(2, 2, 3)</code>); <code>is_at_least(installed, minimum)</code> → орнатылған нұсқа ең төменгісінен кем емес пе (<code>True/False</code>). Кортеждерді Python өзі дұрыс салыстырады.</p>",
   "starter": "def version_tuple(v):\n    return v\n\ndef is_at_least(installed, minimum):\n    return installed >= minimum\n",
   "solution": "def version_tuple(v):\n    return tuple(int(x) for x in v.split('.'))\n\ndef is_at_least(installed, minimum):\n    return version_tuple(installed) >= version_tuple(minimum)\n\nprint(version_tuple('2.2.3'), is_at_least('1.10.0', '1.9'))\n",
   "hints": [
    "<code>tuple(int(x) for x in v.split('.'))</code>.",
    "Кортеждер элемент бойынша салыстырылады: <code>(1, 10) &gt;= (1, 9)</code> → True."
   ],
   "check": {
    "tests": "assert version_tuple('2.2.3') == (2, 2, 3), 'version_tuple(\"2.2.3\") (2, 2, 3) қайтаруы керек'\nassert version_tuple('1.26') == (1, 26), 'version_tuple(\"1.26\") (1, 26)'\nassert is_at_least('1.10.0', '1.9') is True, '1.10.0 ≥ 1.9 (мәтін ретінде салыстырсаңыз қате шығады)'\nassert is_at_least('1.25.2', '1.26') is False, '1.25.2 < 1.26'\nassert is_at_least('2.0', '2.0') is True, 'Тең нұсқа да жарайды'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ортаны тексеру",
   "prompt": "<p><code>check_env(req_text, installed)</code> жазыңыз. <code>installed</code> — орнатылған пакеттер <code>{атауы: нұсқа}</code>. requirements.txt-тегі әр пакет үшін мәселелер тізімін (файл ретімен) қайтарсын: пакет орнатылмаған → <code>\"missing:атауы\"</code>; <code>==</code> бойынша нұсқа сәйкес емес → <code>\"mismatch:атауы\"</code>; <code>&gt;=</code> бойынша нұсқа тым ескі → <code>\"too_old:атауы\"</code>. Нұсқаларды сан ретінде салыстырыңыз.</p>",
   "starter": "req = \"\"\"pandas==2.2.3\nnumpy>=1.26  # кемінде\nscikit-learn==1.6.1\nfastapi\n\"\"\"\ninstalled = {'pandas': '2.2.3', 'numpy': '1.9.0', 'scikit-learn': '1.5.2'}\n\ndef check_env(req_text, installed):\n    return []\n",
   "solution": "req = \"\"\"pandas==2.2.3\nnumpy>=1.26  # кемінде\nscikit-learn==1.6.1\nfastapi\n\"\"\"\ninstalled = {'pandas': '2.2.3', 'numpy': '1.9.0', 'scikit-learn': '1.5.2'}\n\ndef version_tuple(v):\n    return tuple(int(x) for x in v.split('.'))\n\ndef check_env(req_text, installed):\n    problems = []\n    for line in req_text.splitlines():\n        line = line.split('#')[0].strip()\n        if not line:\n            continue\n        if '==' in line:\n            name, version = [p.strip() for p in line.split('==')]\n            op = '=='\n        elif '>=' in line:\n            name, version = [p.strip() for p in line.split('>=')]\n            op = '>='\n        else:\n            name, version, op = line, None, None\n        if name not in installed:\n            problems.append(f'missing:{name}')\n        elif op == '==' and version_tuple(installed[name]) != version_tuple(version):\n            problems.append(f'mismatch:{name}')\n        elif op == '>=' and version_tuple(installed[name]) < version_tuple(version):\n            problems.append(f'too_old:{name}')\n    return problems\n\nprint(check_env(req, installed))\n",
   "hints": [
    "Әр жолдан атау, нұсқа және операторды (<code>==</code>, <code>&gt;=</code> немесе жоқ) алыңыз.",
    "Салыстыру үшін <code>version_tuple</code>: <code>(1, 9, 0) &lt; (1, 26)</code>."
   ],
   "check": {
    "tests": "assert check_env(req, installed) == ['too_old:numpy', 'mismatch:scikit-learn', 'missing:fastapi'], f'Нәтиже дұрыс емес: {check_env(req, installed)}'\nassert check_env('numpy>=1.26\\n', {'numpy': '1.26.4'}) == [], '1.26.4 ≥ 1.26: мәселе жоқ'\nassert check_env('# бос\\n\\n', {}) == [], 'Түсініктеме мен бос жолдар еленбейді'\nassert check_env('joblib\\n', {'joblib': '1.4.2'}) == [], 'Нұсқасыз пакет орнатылған болса жеткілікті'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Екі requirements айырмасы",
   "prompt": "<p>PR-да requirements.txt өзгерді. <code>diff_requirements(old, new)</code> жазыңыз: сөздік қайтарсын <code>{'added': [...], 'removed': [...], 'changed': [(атауы, ескі, жаңа), ...]}</code>. Нұсқа ретінде <code>==</code>-дан кейінгі мән алынады, бекітілмеген пакеттің нұсқасы <code>None</code>. Әр тізім пакет атауы бойынша сұрыпталсын. Бос жолдар мен түсініктемелер еленбейді.</p>",
   "starter": "old = \"\"\"pandas==2.1.4\nnumpy==1.26.4\nrequests==2.31.0\n\"\"\"\nnew = \"\"\"pandas==2.2.3\nnumpy==1.26.4\nfastapi==0.115.0  # API\njoblib\n\"\"\"\n\ndef diff_requirements(old, new):\n    return {'added': [], 'removed': [], 'changed': []}\n",
   "solution": "old = \"\"\"pandas==2.1.4\nnumpy==1.26.4\nrequests==2.31.0\n\"\"\"\nnew = \"\"\"pandas==2.2.3\nnumpy==1.26.4\nfastapi==0.115.0  # API\njoblib\n\"\"\"\n\ndef parse_requirements(text):\n    result = {}\n    for line in text.splitlines():\n        line = line.split('#')[0].strip()\n        if not line:\n            continue\n        if '==' in line:\n            name, version = line.split('==')\n            result[name.strip()] = version.strip()\n        else:\n            result[line.split('>=')[0].strip()] = None\n    return result\n\ndef diff_requirements(old, new):\n    a, b = parse_requirements(old), parse_requirements(new)\n    return {\n        'added': sorted(n for n in b if n not in a),\n        'removed': sorted(n for n in a if n not in b),\n        'changed': sorted((n, a[n], b[n]) for n in a if n in b and a[n] != b[n]),\n    }\n\nprint(diff_requirements(old, new))\n",
   "hints": [
    "Алдымен екі мәтінді де <code>{атауы: нұсқа}</code> сөздігіне айналдыратын көмекші функция жазыңыз.",
    "Жаңасында бар, ескісінде жоқ → added; керісінше → removed; екеуінде де бар, нұсқасы басқа → changed."
   ],
   "check": {
    "tests": "_d = diff_requirements(old, new)\nassert _d['added'] == ['fastapi', 'joblib'], f'added: [\"fastapi\", \"joblib\"], сізде {_d[\"added\"]}'\nassert _d['removed'] == ['requests'], f'removed: [\"requests\"], сізде {_d[\"removed\"]}'\nassert _d['changed'] == [('pandas', '2.1.4', '2.2.3')], f'changed: [(\"pandas\", \"2.1.4\", \"2.2.3\")], сізде {_d[\"changed\"]}'\nassert diff_requirements('a==1\\n', 'a==1\\n') == {'added': [], 'removed': [], 'changed': []}, 'Өзгеріс жоқ болса барлық тізім бос'\nassert diff_requirements('b==1\\nc\\n', 'c==2\\n')['changed'] == [('c', None, '2')], 'Бекітілмеген пакеттің нұсқасы None'"
   }
  }
 ],
 "swe-7": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Сиқырлы санды константаға",
   "prompt": "<p>Кодта <code>+ 1500</code> деген сан тұр: бұл жеткізу ақысы, бірақ оны тек автор біледі. <code>DELIVERY_FEE = 1500</code> константасын жасаңыз және <code>order_total(amount)</code> функциясын жазыңыз: 20 000 ₸-ден аз тапсырысқа <code>DELIVERY_FEE</code> қосылады, 20 000 ₸ және одан көп болса жеткізу тегін (<code>FREE_FROM = 20000</code> константасы).</p>",
   "starter": "def order_total(amount):\n    if amount < 20000:\n        return amount + 1500\n    return amount\n",
   "solution": "DELIVERY_FEE = 1500\nFREE_FROM = 20000\n\ndef order_total(amount):\n    \"\"\"Жеткізу ақысымен бірге жалпы сома.\"\"\"\n    if amount < FREE_FROM:\n        return amount + DELIVERY_FEE\n    return amount\n\nprint(order_total(8000), order_total(25000))\n",
   "hints": [
    "Файлдың басында: <code>DELIVERY_FEE = 1500</code>, <code>FREE_FROM = 20000</code>.",
    "Функция ішінде сандардың орнына осы атауларды жазыңыз."
   ],
   "check": {
    "tests": "assert DELIVERY_FEE == 1500 and FREE_FROM == 20000, 'DELIVERY_FEE = 1500 және FREE_FROM = 20000 константаларын анықтаңыз'\nassert order_total(8000) == 9500 and order_total(20000) == 20000, 'order_total(8000) 9500, order_total(20000) 20000 болуы керек'\nDELIVERY_FEE = 900\nFREE_FROM = 10000\n_a, _b = order_total(8000), order_total(12000)\nDELIVERY_FEE = 1500\nFREE_FROM = 20000\nassert _a == 8900 and _b == 12000, 'order_total сандарды емес, DELIVERY_FEE мен FREE_FROM константаларын қолдануы керек'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Таза функция",
   "prompt": "<p><code>apply_discount(prices, percent)</code> кіріс тізімді өзгертіп жібереді, сондықтан оны тестілеу қиын. Оны <b>таза</b> функцияға айналдырыңыз: жеңілдік қолданылған <b>жаңа</b> тізім қайтарсын (әр баға <code>round(p * (100 - percent) / 100)</code>), ал кіріс тізім өзгермесін.</p>",
   "starter": "def apply_discount(prices, percent):\n    for i in range(len(prices)):\n        prices[i] = round(prices[i] * (100 - percent) / 100)\n    return prices\n",
   "solution": "def apply_discount(prices, percent):\n    \"\"\"Жеңілдік қолданылған жаңа тізім.\"\"\"\n    return [round(p * (100 - percent) / 100) for p in prices]\n\nbase = [1000, 2500]\nprint(apply_discount(base, 10), base)\n",
   "hints": [
    "List comprehension жаңа тізім жасайды: <code>[round(p * (100 - percent) / 100) for p in prices]</code>.",
    "Кірістегі <code>prices[i] = ...</code> сияқты өзгерістерден арылыңыз."
   ],
   "check": {
    "tests": "_p = [1000, 2500, 990]\n_r = apply_discount(_p, 10)\nassert _r == [900, 2250, 891], 'apply_discount([1000, 2500, 990], 10) [900, 2250, 891] қайтаруы керек'\nassert _p == [1000, 2500, 990], 'Кіріс тізім өзгермеуі керек (таза функция)'\nassert _r is not _p, 'Жаңа тізім қайтарыңыз'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Мағыналы атаулар",
   "prompt": "<p>Ноутбукта <code>def f(a, b): return a / b * 100</code> деген функция бар: ол жүрілген жол мен жұмсалған жанармайдан 100 км-ге шығынды есептейді. Оны түсінікті атаулармен қайта жазыңыз: функция <code>fuel_per_100km</code>, параметрлері <code>fuel_liters</code> және <code>distance_km</code> (осы ретпен), нәтиже 1 таңбаға дөңгелектенсін. Мысалы, <code>fuel_per_100km(36, 450)</code> → <code>8.0</code>.</p>",
   "starter": "def f(a, b):\n    return a / b * 100\n",
   "solution": "def fuel_per_100km(fuel_liters, distance_km):\n    \"\"\"100 км-ге жұмсалған жанармай (литр).\"\"\"\n    return round(fuel_liters / distance_km * 100, 1)\n\nprint(fuel_per_100km(36, 450))\n",
   "hints": [
    "Атау не істейтінін айтсын: <code>def fuel_per_100km(fuel_liters, distance_km):</code>.",
    "<code>round(fuel_liters / distance_km * 100, 1)</code>."
   ],
   "check": {
    "tests": "import inspect as _i\nassert list(_i.signature(fuel_per_100km).parameters) == ['fuel_liters', 'distance_km'], 'Параметрлер: fuel_liters, distance_km (осы ретпен)'\nassert fuel_per_100km(36, 450) == 8.0, 'fuel_per_100km(36, 450) 8.0 қайтаруы керек'\nassert fuel_per_100km(10, 120) == 8.3, 'Нәтижені 1 таңбаға дөңгелектеңіз'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қайталанған блокты функцияға",
   "prompt": "<p>Ноутбукта статус бойынша санайтын үш бірдей цикл бар. Оларды бір <code>count_by(rows, key)</code> функциясымен ауыстырыңыз: ол <code>key</code> бағанының әр мәні неше рет кездескенін сөздік ретінде қайтарсын. Мәндер кодта жазылмасын: функция кез келген кілтпен және мәнмен жұмыс істесін.</p>",
   "starter": "orders = [\n    {'status': 'paid', 'city': 'Алматы'},\n    {'status': 'cancelled', 'city': 'Астана'},\n    {'status': 'paid', 'city': 'Астана'},\n    {'status': 'pending', 'city': 'Алматы'},\n]\npaid = 0\nfor o in orders:\n    if o['status'] == 'paid':\n        paid += 1\ncancelled = 0\nfor o in orders:\n    if o['status'] == 'cancelled':\n        cancelled += 1\npending = 0\nfor o in orders:\n    if o['status'] == 'pending':\n        pending += 1\nprint(paid, cancelled, pending)\n",
   "solution": "orders = [\n    {'status': 'paid', 'city': 'Алматы'},\n    {'status': 'cancelled', 'city': 'Астана'},\n    {'status': 'paid', 'city': 'Астана'},\n    {'status': 'pending', 'city': 'Алматы'},\n]\n\ndef count_by(rows, key):\n    \"\"\"key бағанының әр мәні неше рет кездесетінін санайды.\"\"\"\n    result = {}\n    for r in rows:\n        result[r[key]] = result.get(r[key], 0) + 1\n    return result\n\nprint(count_by(orders, 'status'), count_by(orders, 'city'))\n",
   "hints": [
    "<code>result[r[key]] = result.get(r[key], 0) + 1</code>.",
    "Кілт параметр болғандықтан, бір функция статусқа да, қалаға да жарайды."
   ],
   "check": {
    "tests": "assert count_by(orders, 'status') == {'paid': 2, 'cancelled': 1, 'pending': 1}, 'Статус бойынша санау дұрыс емес'\nassert count_by(orders, 'city') == {'Алматы': 2, 'Астана': 2}, 'count_by кез келген кілтпен жұмыс істеуі керек'\nassert count_by([{'x': 'refund'}], 'x') == {'refund': 1}, 'Мәндерді кодта жазбаңыз: кез келген мән саналуы керек'\nassert count_by([], 'status') == {}, 'Бос тізім үшін бос сөздік'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қадамдарға бөлу",
   "prompt": "<p>Ұзын ұяшықты қадамдарға бөліңіз: <code>clean(rows)</code> — әр жолдың <code>city</code> мәнін <code>strip().capitalize()</code> етіп, <code>amount</code> 0-ден үлкен жолдарды ғана қалдырған жаңа тізім; <code>summarize(rows)</code> — қала бойынша <code>amount</code> қосындысы; <code>main(rows)</code> — осы екеуін ретімен шақырып, нәтижені қайтарады. Кіріс жолдар өзгермесін.</p>",
   "starter": "raw = [\n    {'city': ' алматы', 'amount': 5000},\n    {'city': 'АСТАНА ', 'amount': 0},\n    {'city': 'Алматы', 'amount': 2500},\n    {'city': 'астана', 'amount': 4000},\n]\n\ndef main(rows):\n    pass\n",
   "solution": "raw = [\n    {'city': ' алматы', 'amount': 5000},\n    {'city': 'АСТАНА ', 'amount': 0},\n    {'city': 'Алматы', 'amount': 2500},\n    {'city': 'астана', 'amount': 4000},\n]\n\ndef clean(rows):\n    return [dict(r, city=r['city'].strip().capitalize()) for r in rows if r['amount'] > 0]\n\ndef summarize(rows):\n    result = {}\n    for r in rows:\n        result[r['city']] = result.get(r['city'], 0) + r['amount']\n    return result\n\ndef main(rows):\n    return summarize(clean(rows))\n\nprint(main(raw))\n",
   "hints": [
    "<code>clean</code>: <code>[dict(r, city=...) for r in rows if r['amount'] &gt; 0]</code> — көшірме жасайды.",
    "<code>main</code> тек біріктіреді: <code>return summarize(clean(rows))</code>."
   ],
   "check": {
    "tests": "assert clean(raw) == [{'city': 'Алматы', 'amount': 5000}, {'city': 'Алматы', 'amount': 2500}, {'city': 'Астана', 'amount': 4000}], 'clean дұрыс емес: қалалар тазалансын, amount <= 0 жолдар алынсын'\nassert raw[0]['city'] == ' алматы', 'Кіріс жолдар өзгермеуі керек (dict(r, city=...) көшірмесін жасаңыз)'\nassert summarize([{'city': 'Орал', 'amount': 3}, {'city': 'Орал', 'amount': 4}]) == {'Орал': 7}, 'summarize қала бойынша қосады'\nassert main(raw) == {'Алматы': 7500, 'Астана': 4000}, 'main(raw) {\"Алматы\": 7500, \"Астана\": 4000} қайтаруы керек'\n_orig = summarize\nsummarize = lambda rows: 'summarize шақырылды'\n_r = main(raw)\nsummarize = _orig\nassert _r == 'summarize шақырылды', 'main логиканы көшірмей, clean және summarize функцияларын шақыруы керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Тарифтер сөздігі",
   "prompt": "<p>Такси бағасы қалаға байланысты, бірақ кодта <code>if city == ...</code> тізбегі тұр. Тарифтерді <code>TARIFFS</code> константа-сөздігіне шығарыңыз: <code>{'Алматы': (500, 130), 'Астана': (450, 120), 'Шымкент': (350, 100)}</code> — (отырғызу, 1 км бағасы). <code>fare(city, km)</code> бағаны <code>round</code> арқылы бүтін санға айналдырып қайтарсын; тарифі жоқ қала үшін <code>ValueError</code>.</p>",
   "starter": "def fare(city, km):\n    if city == 'Алматы':\n        return round(500 + 130 * km)\n    if city == 'Астана':\n        return round(450 + 120 * km)\n    return round(350 + 100 * km)\n",
   "solution": "TARIFFS = {'Алматы': (500, 130), 'Астана': (450, 120), 'Шымкент': (350, 100)}\n\ndef fare(city, km):\n    \"\"\"Такси бағасы теңгемен.\"\"\"\n    if city not in TARIFFS:\n        raise ValueError(f'Тариф жоқ: {city}')\n    start, per_km = TARIFFS[city]\n    return round(start + per_km * km)\n\nprint(fare('Алматы', 7.5))\n",
   "hints": [
    "<code>start, per_km = TARIFFS[city]</code>.",
    "Белгісіз қала: <code>if city not in TARIFFS: raise ValueError(...)</code>."
   ],
   "check": {
    "tests": "assert TARIFFS['Алматы'] == (500, 130) and len(TARIFFS) == 3, 'TARIFFS константасын анықтаңыз'\nassert fare('Алматы', 7.5) == 1475 and fare('Шымкент', 2) == 550, 'fare(\"Алматы\", 7.5) 1475, fare(\"Шымкент\", 2) 550'\nTARIFFS['Орал'] = (300, 90)\n_o = fare('Орал', 10)\ndel TARIFFS['Орал']\nassert _o == 1200, 'fare TARIFFS сөздігін қолдануы керек: жаңа қала қосылса, код өзгермейді'\ntry:\n    fare('Париж', 3)\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Тарифі жоқ қала үшін ValueError')"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Рефакторинг: бағалар",
   "prompt": "<p>Мектептің ескі коды балды бағаға айналдырады: 85-тен бастап → 5, 70-тен → 4, 50-ден → 3, қалғаны → 2. Оны рефакторинг жасаңыз: шектерді <code>GRADE_LIMITS = [(85, 5), (70, 4), (50, 3)]</code> константасына шығарыңыз; <code>grade(score)</code> — бір балдың бағасы (тек <code>GRADE_LIMITS</code>-ті қолдансын); <code>grade_counts(scores)</code> — <code>{баға: саны}</code> сөздігі (тек кездескен бағалар). Нәтиже ескі кодпен бірдей болуы керек.</p>",
   "starter": "scores = [92, 67, 85, 49, 70, 50, 88, 31]\nr = {}\nfor s in scores:\n    if s >= 85:\n        g = 5\n    elif s >= 70:\n        g = 4\n    elif s >= 50:\n        g = 3\n    else:\n        g = 2\n    r[g] = r.get(g, 0) + 1\nprint(r)\n",
   "solution": "scores = [92, 67, 85, 49, 70, 50, 88, 31]\n\nGRADE_LIMITS = [(85, 5), (70, 4), (50, 3)]\n\ndef grade(score):\n    \"\"\"Балды 2–5 бағасына айналдырады.\"\"\"\n    for limit, g in GRADE_LIMITS:\n        if score >= limit:\n            return g\n    return 2\n\ndef grade_counts(scores):\n    result = {}\n    for s in scores:\n        g = grade(s)\n        result[g] = result.get(g, 0) + 1\n    return result\n\nprint(grade_counts(scores))\n",
   "hints": [
    "<code>for limit, g in GRADE_LIMITS: if score &gt;= limit: return g</code>, цикл біткенде <code>return 2</code>.",
    "<code>grade_counts</code> ішінде шартты қайталамай, <code>grade(s)</code>-ті шақырыңыз."
   ],
   "check": {
    "tests": "assert [grade(s) for s in [92, 85, 84, 70, 69, 50, 49, 0]] == [5, 5, 4, 4, 3, 3, 2, 2], 'grade шектері дұрыс емес (85→5, 70→4, 50→3)'\nassert grade_counts(scores) == {5: 3, 3: 2, 2: 2, 4: 1}, 'grade_counts ескі кодтың нәтижесімен бірдей болуы керек'\nGRADE_LIMITS = [(90, 5), (60, 4), (40, 3)]\n_g = grade(85)\nGRADE_LIMITS = [(85, 5), (70, 4), (50, 3)]\nassert _g == 4, 'grade сандарды емес, GRADE_LIMITS константасын қолдануы керек'\nassert grade_counts([]) == {}, 'Бос тізім үшін бос сөздік'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Pipeline функциясын құрастыру",
   "prompt": "<p><code>make_pipeline(*steps)</code> жазыңыз: ол <b>функция қайтарсын</b>, ал сол функция деректі <code>steps</code> ішіндегі функциялар арқылы ретімен өткізсін. Сосын тазалау pipeline-ын жинаңыз: <code>clean_names = make_pipeline(strip_all, drop_empty, title_all, unique)</code>, мұндағы <code>title_all</code> — әр атауды <code>capitalize()</code> ететін функция (оны өзіңіз жазыңыз).</p>",
   "starter": "names = [' айгерім', 'ЕРЛАН ', '', 'Айгерім', '  ', 'дана']\n\ndef strip_all(items):\n    return [s.strip() for s in items]\n\ndef drop_empty(items):\n    return [s for s in items if s]\n\ndef unique(items):\n    return list(dict.fromkeys(items))\n\ndef make_pipeline(*steps):\n    pass\n",
   "solution": "names = [' айгерім', 'ЕРЛАН ', '', 'Айгерім', '  ', 'дана']\n\ndef strip_all(items):\n    return [s.strip() for s in items]\n\ndef drop_empty(items):\n    return [s for s in items if s]\n\ndef unique(items):\n    return list(dict.fromkeys(items))\n\ndef title_all(items):\n    return [s.capitalize() for s in items]\n\ndef make_pipeline(*steps):\n    def run(data):\n        for step in steps:\n            data = step(data)\n        return data\n    return run\n\nclean_names = make_pipeline(strip_all, drop_empty, title_all, unique)\nprint(clean_names(names))\n",
   "hints": [
    "Ішкі функция жазып, соны қайтарыңыз: <code>def run(data): ...</code>, сосын <code>return run</code>.",
    "<code>run</code> ішінде: <code>for step in steps: data = step(data)</code>."
   ],
   "check": {
    "tests": "assert callable(make_pipeline()), 'make_pipeline функция қайтаруы керек'\nassert make_pipeline()([1, 2]) == [1, 2], 'Қадам жоқ болса дерек өзгермейді'\nassert make_pipeline(lambda x: x + 1, lambda x: x * 10)(3) == 40, 'Қадамдар берілген ретпен қолданылуы керек'\nassert title_all(['алматы', 'ШЫМКЕНТ']) == ['Алматы', 'Шымкент'], 'title_all әр атауды capitalize() етуі керек'\nassert clean_names(names) == ['Айгерім', 'Ерлан', 'Дана'], f'clean_names(names) дұрыс емес: {clean_names(names)}'"
   }
  }
 ],
 "swe-8": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ауа райы жауабын оқу",
   "prompt": "<p>Ауа райы API-і <code>raw</code> мәтінін қайтарды. <code>json.loads</code> арқылы оны сөздікке айналдырып, <code>city</code>-ге қала атауын, <code>temp</code>-ке ағымдағы температураны (<code>current</code> ішіндегі <code>temp_c</code>), <code>max_tomorrow</code>-ға ертеңгі (<code>forecast</code> тізімінің бірінші элементі) ең жоғары температураны жазыңыз.</p>",
   "starter": "import json\nraw = '{\"city\": \"Астана\", \"current\": {\"temp_c\": -18.5, \"wind_ms\": 7}, \"forecast\": [{\"day\": \"сейсенбі\", \"max_c\": -12}, {\"day\": \"сәрсенбі\", \"max_c\": -9}]}'\n",
   "solution": "import json\nraw = '{\"city\": \"Астана\", \"current\": {\"temp_c\": -18.5, \"wind_ms\": 7}, \"forecast\": [{\"day\": \"сейсенбі\", \"max_c\": -12}, {\"day\": \"сәрсенбі\", \"max_c\": -9}]}'\ndata = json.loads(raw)\ncity = data['city']\ntemp = data['current']['temp_c']\nmax_tomorrow = data['forecast'][0]['max_c']\nprint(city, temp, max_tomorrow)\n",
   "hints": [
    "<code>data = json.loads(raw)</code>, сосын <code>data['current']['temp_c']</code>.",
    "Тізімнің бірінші элементі: <code>data['forecast'][0]</code>."
   ],
   "check": {
    "tests": "assert city == 'Астана', 'city = \"Астана\"'\nassert temp == -18.5, 'temp — current ішіндегі temp_c (-18.5)'\nassert max_tomorrow == -12, 'max_tomorrow — forecast[0] ішіндегі max_c (-12)'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Статус кодының түрі",
   "prompt": "<p><code>status_kind(code)</code> функциясын жазыңыз: 200–299 → <code>'success'</code>, 400–499 → <code>'client_error'</code>, 500–599 → <code>'server_error'</code>, басқасы → <code>'other'</code>.</p>",
   "starter": "def status_kind(code):\n    return 'success'\n",
   "solution": "def status_kind(code):\n    if 200 <= code <= 299:\n        return 'success'\n    if 400 <= code <= 499:\n        return 'client_error'\n    if 500 <= code <= 599:\n        return 'server_error'\n    return 'other'\n\nprint(status_kind(404), status_kind(503))\n",
   "hints": [
    "Аралықты тексеру: <code>if 400 &lt;= code &lt;= 499:</code>.",
    "Ереже: 4xx — клиенттің қатесі, 5xx — сервердің қатесі."
   ],
   "check": {
    "tests": "assert status_kind(200) == 'success' and status_kind(201) == 'success', '2xx → success'\nassert status_kind(404) == 'client_error' and status_kind(422) == 'client_error', '4xx → client_error'\nassert status_kind(500) == 'server_error' and status_kind(503) == 'server_error', '5xx → server_error'\nassert status_kind(302) == 'other', '3xx → other'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Тапсырысты JSON-ға",
   "prompt": "<p><code>to_json(order)</code> функциясын жазыңыз: сөздікті JSON мәтініне айналдырсын, қазақ әріптері <code>\\u</code> кодтарына айналмасын және кілттер алфавит бойынша сұрыпталсын (<code>sort_keys=True</code>). Мысалы, <code>{\"city\": \"Шымкент\", \"amount\": 5000}</code> → <code>'{\"amount\": 5000, \"city\": \"Шымкент\"}'</code>.</p>",
   "starter": "import json\n\ndef to_json(order):\n    return str(order)\n",
   "solution": "import json\n\ndef to_json(order):\n    return json.dumps(order, ensure_ascii=False, sort_keys=True)\n\nprint(to_json({'city': 'Шымкент', 'amount': 5000}))\n",
   "hints": [
    "<code>json.dumps(order, ensure_ascii=False, sort_keys=True)</code>.",
    "<code>str(order)</code> JSON емес: онда бір тырнақша қолданылады."
   ],
   "check": {
    "tests": "import json as _j\nassert to_json({'city': 'Шымкент', 'amount': 5000}) == '{\"amount\": 5000, \"city\": \"Шымкент\"}', 'Кілттер сұрыпталып, қазақ әріптері сақталуы керек'\nassert _j.loads(to_json({'ok': True, 'items': [1, 2]})) == {'ok': True, 'items': [1, 2]}, 'Нәтиже дұрыс JSON болуы керек (true, екі тырнақша)'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қайталауға болатын сұраулар",
   "prompt": "<p>Клиент сервер қатесінен (5xx) кейін сұрауды автоматты қайталайды, бірақ тек <b>идемпотентті</b> әдістерде (<code>GET</code>, <code>PUT</code>, <code>DELETE</code>). <code>retry_list(requests)</code> жазыңыз: <code>requests</code> — <code>(id, method, status)</code> кортеждері; статусы 500–599 және әдісі идемпотентті сұраулардың id-ларын ретімен қайтарсын. <code>POST</code> қайталанбайды: екі тапсырыс жасалып кетуі мүмкін.</p>",
   "starter": "requests = [\n    (1, 'GET', 503),\n    (2, 'POST', 500),\n    (3, 'PUT', 200),\n    (4, 'DELETE', 502),\n    (5, 'GET', 404),\n]\n\ndef retry_list(requests):\n    return [r[0] for r in requests if r[2] >= 500]\n",
   "solution": "requests = [\n    (1, 'GET', 503),\n    (2, 'POST', 500),\n    (3, 'PUT', 200),\n    (4, 'DELETE', 502),\n    (5, 'GET', 404),\n]\n\nIDEMPOTENT = {'GET', 'PUT', 'DELETE'}\n\ndef retry_list(requests):\n    return [rid for rid, method, status in requests\n            if method in IDEMPOTENT and 500 <= status <= 599]\n\nprint(retry_list(requests))\n",
   "hints": [
    "Идемпотентті әдістер жиыны: <code>{'GET', 'PUT', 'DELETE'}</code>.",
    "Шарт: <code>method in IDEMPOTENT and 500 &lt;= status &lt;= 599</code>."
   ],
   "check": {
    "tests": "assert retry_list(requests) == [1, 4], f'Күтілгені [1, 4], сізде {retry_list(requests)}'\nassert retry_list([(7, 'POST', 503)]) == [], 'POST қайталанбайды'\nassert retry_list([(8, 'GET', 404), (9, 'PUT', 500)]) == [9], '404 — клиент қатесі, қайталамаймыз'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "URL-ды талдау",
   "prompt": "<p><code>parse_url(url)</code> функциясын жазыңыз: <code>\"/cities/Алматы/weather?days=3&amp;units=c\"</code> → <code>(['cities', 'Алматы', 'weather'], {'days': '3', 'units': 'c'})</code>. Бірінші бөлік — path бөліктері (бос бөліктер жоқ), екіншісі — query параметрлері (мәндері мәтін). <code>?</code> жоқ болса, сөздік бос.</p>",
   "starter": "def parse_url(url):\n    return url.split('/'), {}\n",
   "solution": "def parse_url(url):\n    path, _, query = url.partition('?')\n    parts = [p for p in path.split('/') if p]\n    params = {}\n    for pair in query.split('&'):\n        if pair:\n            key, _, value = pair.partition('=')\n            params[key] = value\n    return parts, params\n\nprint(parse_url('/cities/Алматы/weather?days=3&units=c'))\n",
   "hints": [
    "<code>path, _, query = url.partition('?')</code> — <code>?</code> жоқ болса query бос.",
    "Параметрлер: <code>query.split('&amp;')</code>, әрқайсысы <code>pair.partition('=')</code>."
   ],
   "check": {
    "tests": "assert parse_url('/cities/Алматы/weather?days=3&units=c') == (['cities', 'Алматы', 'weather'], {'days': '3', 'units': 'c'}), 'Path бөліктері мен query параметрлері дұрыс емес'\nassert parse_url('/products/42') == (['products', '42'], {}), '? жоқ болса бос сөздік'\nassert parse_url('/health/') == (['health'], {}), 'Бос бөліктер тізімге кірмейді'\nassert parse_url('/search?q=шай') == (['search'], {'q': 'шай'}), 'Бір параметр'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қате жауабын құрастыру",
   "prompt": "<p><code>error_response(status)</code> функциясын жазыңыз: <code>(status, body)</code> қайтарсын, мұндағы <code>body</code> — JSON <b>мәтіні</b> <code>{\"error\": хабар}</code> (қазақ әріптері сақталсын). Хабарлар: 400 → <code>\"Сұрау қате құрылған\"</code>, 404 → <code>\"Табылмады\"</code>, 422 → <code>\"Мәндер тексеруден өтпеді\"</code>, 500 → <code>\"Сервердің ішкі қатесі\"</code>, басқасы → <code>\"Белгісіз қате\"</code>.</p>",
   "starter": "import json\n\ndef error_response(status):\n    return status, {'error': 'қате'}\n",
   "solution": "import json\n\nMESSAGES = {\n    400: 'Сұрау қате құрылған',\n    404: 'Табылмады',\n    422: 'Мәндер тексеруден өтпеді',\n    500: 'Сервердің ішкі қатесі',\n}\n\ndef error_response(status):\n    message = MESSAGES.get(status, 'Белгісіз қате')\n    return status, json.dumps({'error': message}, ensure_ascii=False)\n\nprint(error_response(404))\n",
   "hints": [
    "Хабарларды сөздікке салыңыз да, <code>MESSAGES.get(status, 'Белгісіз қате')</code>.",
    "Body мәтін болуы керек: <code>json.dumps(..., ensure_ascii=False)</code>."
   ],
   "check": {
    "tests": "import json as _j\n_s, _b = error_response(404)\nassert _s == 404 and isinstance(_b, str), 'Статус пен JSON мәтінін (str) қайтарыңыз'\nassert _j.loads(_b) == {'error': 'Табылмады'}, '404 → {\"error\": \"Табылмады\"}'\nassert 'Табылмады' in _b, 'ensure_ascii=False қосыңыз'\nassert _j.loads(error_response(422)[1])['error'] == 'Мәндер тексеруден өтпеді', '422 хабары дұрыс емес'\nassert _j.loads(error_response(418)[1])['error'] == 'Белгісіз қате', 'Белгісіз статус → \"Белгісіз қате\"'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Кітапхана API-і",
   "prompt": "<p>Кітапхана API-ін модельдейтін <code>handle(method, path, body=None)</code> жазыңыз, ол <code>(status, data)</code> қайтарсын:<br>• <code>GET /books</code> → 200, барлық кітаптар тізімі;<br>• <code>GET /books/&lt;id&gt;</code> → 200 және кітап, жоқ болса 404;<br>• <code>PUT /books/&lt;id&gt;</code> → кітапты body-мен толық ауыстырады (<code>id</code> сақталады), 200; кітап жоқ болса 404; body-де <code>title</code> болмаса 422;<br>• <code>DELETE /books/&lt;id&gt;</code> → кітапты жояды, 200 және <code>{'deleted': id}</code>; жоқ болса 404;<br>• басқа әдістер → 405; басқа path немесе сан емес id → 404.<br>Қате жағдайда data — <code>{'error': ...}</code>.</p>",
   "starter": "books = {\n    1: {'id': 1, 'title': 'Абай жолы', 'author': 'Мұхтар Әуезов'},\n    2: {'id': 2, 'title': 'Көшпенділер', 'author': 'Ілияс Есенберлин'},\n}\n\ndef handle(method, path, body=None):\n    return 500, {'error': 'әзірге жазылмаған'}\n",
   "solution": "books = {\n    1: {'id': 1, 'title': 'Абай жолы', 'author': 'Мұхтар Әуезов'},\n    2: {'id': 2, 'title': 'Көшпенділер', 'author': 'Ілияс Есенберлин'},\n}\n\ndef handle(method, path, body=None):\n    parts = path.strip('/').split('/')\n    if parts[0] != 'books' or len(parts) > 2:\n        return 404, {'error': 'not found'}\n    if len(parts) == 1:\n        if method == 'GET':\n            return 200, list(books.values())\n        return 405, {'error': 'method not allowed'}\n    if method not in ('GET', 'PUT', 'DELETE'):\n        return 405, {'error': 'method not allowed'}\n    if not parts[1].isdigit() or int(parts[1]) not in books:\n        return 404, {'error': 'not found'}\n    book_id = int(parts[1])\n    if method == 'GET':\n        return 200, books[book_id]\n    if method == 'PUT':\n        if not body or not body.get('title'):\n            return 422, {'error': 'title міндетті'}\n        books[book_id] = dict(body, id=book_id)\n        return 200, books[book_id]\n    del books[book_id]\n    return 200, {'deleted': book_id}\n\nprint(handle('PUT', '/books/1', {'title': 'Абай жолы', 'author': 'М. Әуезов'}))\n",
   "hints": [
    "Path-ты бөліңіз: <code>parts = path.strip('/').split('/')</code>. Алдымен path-ты, сосын әдісті, сосын id-ны тексеріңіз.",
    "PUT: <code>books[book_id] = dict(body, id=book_id)</code>; DELETE: <code>del books[book_id]</code>."
   ],
   "check": {
    "tests": "books.clear()\nbooks.update({1: {'id': 1, 'title': 'Абай жолы', 'author': 'Мұхтар Әуезов'}, 2: {'id': 2, 'title': 'Көшпенділер', 'author': 'Ілияс Есенберлин'}})\n_s, _d = handle('GET', '/books')\nassert _s == 200 and len(_d) == 2, 'GET /books → 200 және 2 кітап'\nassert handle('GET', '/books/2') == (200, books[2]), 'GET /books/2 → 200 және сол кітап'\nassert handle('GET', '/books/9')[0] == 404 and handle('GET', '/books/x')[0] == 404, 'Жоқ немесе сан емес id → 404'\n_s, _d = handle('PUT', '/books/1', {'title': 'Абай жолы', 'author': 'М. Әуезов'})\nassert _s == 200 and _d == {'title': 'Абай жолы', 'author': 'М. Әуезов', 'id': 1}, 'PUT кітапты толық ауыстырады, id сақталады'\nassert handle('PUT', '/books/1', {'title': 'Абай жолы', 'author': 'М. Әуезов'}) == (_s, _d), 'PUT идемпотентті: қайталау сол нәтижені береді'\nassert handle('PUT', '/books/1', {'author': 'X'})[0] == 422, 'title жоқ → 422'\nassert handle('PUT', '/books/7', {'title': 'Y'})[0] == 404, 'Жоқ кітапты PUT → 404'\nassert handle('DELETE', '/books/2') == (200, {'deleted': 2}) and 2 not in books, 'DELETE кітапты жояды'\nassert handle('DELETE', '/books/2')[0] == 404, 'Жойылған кітапты қайта DELETE → 404'\nassert handle('POST', '/books/1')[0] == 405 and handle('DELETE', '/books')[0] == 405, 'Басқа әдістер → 405'\nassert handle('GET', '/authors')[0] == 404, 'Белгісіз path → 404'\nassert 'error' in handle('GET', '/books/9')[1], 'Қате жауапта error кілті болсын'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "JSON body-ді тексеру",
   "prompt": "<p>Сервер body-ді шикі мәтін ретінде алады. <code>handle_forecast(raw_body)</code> жазыңыз: <code>(status, data)</code> қайтарсын.<br>• JSON бұзық болса → <code>400</code>, <code>{'error': 'invalid json'}</code> (<code>json.loads</code> <code>ValueError</code> береді);<br>• JSON дұрыс, бірақ сөздік емес, <code>city</code> бос емес мәтін емес немесе <code>days</code> 1–7 аралығындағы бүтін сан емес болса → <code>422</code>, <code>{'error': [қате өрістердің атаулары]}</code> (<code>['city', 'days']</code> ретімен; сөздік емес болса екеуі де);<br>• бәрі дұрыс → <code>200</code>, <code>{'city': ..., 'days': ...}</code>.</p>",
   "starter": "import json\n\ndef handle_forecast(raw_body):\n    data = json.loads(raw_body)\n    return 200, data\n",
   "solution": "import json\n\ndef handle_forecast(raw_body):\n    try:\n        data = json.loads(raw_body)\n    except ValueError:\n        return 400, {'error': 'invalid json'}\n    if not isinstance(data, dict):\n        return 422, {'error': ['city', 'days']}\n    errors = []\n    city = data.get('city')\n    if not isinstance(city, str) or not city.strip():\n        errors.append('city')\n    days = data.get('days')\n    if not isinstance(days, int) or isinstance(days, bool) or not 1 <= days <= 7:\n        errors.append('days')\n    if errors:\n        return 422, {'error': errors}\n    return 200, {'city': city, 'days': days}\n\nprint(handle_forecast('{\"city\": \"Алматы\", \"days\": 3}'))\nprint(handle_forecast('{city: Алматы}'))\n",
   "hints": [
    "Алдымен <code>try: data = json.loads(raw_body)</code>, <code>except ValueError: return 400, ...</code>.",
    "Сосын өрістерді бөлек тексеріп, қате атауларын тізімге жинаңыз; <code>bool</code> да <code>int</code> болып саналатынын ұмытпаңыз."
   ],
   "check": {
    "tests": "assert handle_forecast('{\"city\": \"Алматы\", \"days\": 3}') == (200, {'city': 'Алматы', 'days': 3}), 'Дұрыс body → 200'\nassert handle_forecast('{city: Алматы}') == (400, {'error': 'invalid json'}), 'Бұзық JSON → 400'\nassert handle_forecast('') == (400, {'error': 'invalid json'}), 'Бос body де бұзық JSON'\nassert handle_forecast('{\"city\": \"Алматы\", \"days\": 10}') == (422, {'error': ['days']}), 'days 1–7 аралығынан тыс → 422'\nassert handle_forecast('{\"city\": \"\", \"days\": \"3\"}') == (422, {'error': ['city', 'days']}), 'Бос city және мәтін \"3\" → екі қате'\nassert handle_forecast('{\"days\": 2}') == (422, {'error': ['city']}), 'city жоқ → 422'\nassert handle_forecast('[1, 2]') == (422, {'error': ['city', 'days']}), 'Сөздік емес JSON → 422'\nassert handle_forecast('{\"city\": \"Орал\", \"days\": true}')[0] == 422, 'true — сан емес'"
   }
  }
 ]
});
DJ.addPractice('m6-2', {
 "dep-1": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "pickle арқылы көшіру",
   "prompt": "<p>Тарифтер сөздігі <code>tariffs</code> берілген. Оны <code>pickle.dumps</code> арқылы <code>blob</code> байттарына айналдырыңыз, сосын <code>pickle.loads</code> арқылы <code>restored</code>-ке қайта жүктеңіз. <code>restored</code> мазмұны бойынша <code>tariffs</code>-пен бірдей, бірақ бөлек объект болуы керек.</p>",
   "starter": "import pickle\ntariffs = {'Алматы': (500, 130), 'Астана': (450, 120), 'version': '2026-01'}\n",
   "solution": "import pickle\ntariffs = {'Алматы': (500, 130), 'Астана': (450, 120), 'version': '2026-01'}\nblob = pickle.dumps(tariffs)\nrestored = pickle.loads(blob)\nprint(type(blob), restored)\n",
   "hints": [
    "<code>blob = pickle.dumps(tariffs)</code> — объект → bytes.",
    "<code>restored = pickle.loads(blob)</code> — bytes → объект."
   ],
   "check": {
    "tests": "assert isinstance(blob, bytes), 'blob = pickle.dumps(tariffs) (bytes) болуы керек'\nassert restored == tariffs, 'restored мазмұны tariffs-пен бірдей болуы керек'\nassert restored is not tariffs, 'restored — pickle.loads нәтижесі (жаңа объект), tariffs-тың өзі емес'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Bundle сөздігі",
   "prompt": "<p><code>make_bundle(model, features, version, trained_at='2026-09-30')</code> функциясын жазыңыз: модельді metadata-мен бірге сөздікке салып қайтарсын. Кілттер: <code>model</code>, <code>features</code>, <code>version</code>, <code>trained_at</code>. <code>features</code> тізімінің <b>көшірмесі</b> сақталсын (кейін бастапқы тізім өзгерсе, bundle өзгермесін).</p>",
   "starter": "def make_bundle(model, features, version, trained_at='2026-09-30'):\n    return {'model': model}\n",
   "solution": "def make_bundle(model, features, version, trained_at='2026-09-30'):\n    return {\n        'model': model,\n        'features': list(features),\n        'version': version,\n        'trained_at': trained_at,\n    }\n\nprint(make_bundle('модель', ['tenure_months'], '1.0.0'))\n",
   "hints": [
    "Сөздікті тікелей қайтарыңыз: <code>{'model': model, 'features': list(features), ...}</code>.",
    "<code>list(features)</code> жаңа тізім жасайды."
   ],
   "check": {
    "tests": "_f = ['tenure_months', 'support_calls']\n_b = make_bundle('M', _f, '1.2.0')\nassert _b == {'model': 'M', 'features': _f, 'version': '1.2.0', 'trained_at': '2026-09-30'}, f'Bundle кілттері мен мәндері дұрыс емес: {_b}'\n_f.append('city')\nassert _b['features'] == ['tenure_months', 'support_calls'], 'features көшірмесін сақтаңыз: list(features)'\nassert make_bundle('M', [], '2.0.0', '2026-10-01')['trained_at'] == '2026-10-01', 'trained_at параметрі ескерілуі керек'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Scaler-ді сақтау",
   "prompt": "<p>Алматының қаңтардағы температуралары бойынша <code>StandardScaler</code> үйретілген. Оны <code>joblib.dump</code> арқылы <code>temp_scaler.joblib</code> файлына сақтаңыз, сосын <code>loaded</code>-қа жүктеңіз. Жүктелген scaler дәл сол <code>mean_</code>-ды есте сақтауы керек.</p>",
   "starter": "import numpy as np\nimport joblib\nfrom sklearn.preprocessing import StandardScaler\ntemps = np.array([[-8.0], [-12.5], [-5.0], [-15.0], [-9.5], [-3.0]])\nscaler = StandardScaler().fit(temps)\n",
   "solution": "import numpy as np\nimport joblib\nfrom sklearn.preprocessing import StandardScaler\ntemps = np.array([[-8.0], [-12.5], [-5.0], [-15.0], [-9.5], [-3.0]])\nscaler = StandardScaler().fit(temps)\njoblib.dump(scaler, 'temp_scaler.joblib')\nloaded = joblib.load('temp_scaler.joblib')\nprint(loaded.mean_)\n",
   "hints": [
    "<code>joblib.dump(scaler, 'temp_scaler.joblib')</code>.",
    "<code>loaded = joblib.load('temp_scaler.joblib')</code>."
   ],
   "check": {
    "tests": "import os as _os\nfrom sklearn.preprocessing import StandardScaler as _SS\nassert _os.path.exists('temp_scaler.joblib'), 'temp_scaler.joblib файлы жасалмаған'\nassert isinstance(loaded, _SS) and loaded is not scaler, 'loaded — файлдан жүктелген StandardScaler болуы керек'\nassert abs(float(loaded.mean_[0]) - (-8.833333)) < 1e-4, 'Жүктелген scaler-дің mean_ мәні сақталуы керек (≈ -8.83)'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Нұсқасы бар файл аты",
   "prompt": "<p><code>bundle_filename(name, version)</code> функциясын жазыңыз: <code>f\"{name}_v{version}.joblib\"</code> қайтарсын, мысалы <code>(\"churn\", \"1.2.0\")</code> → <code>\"churn_v1.2.0.joblib\"</code>. Нұсқа <code>X.Y.Z</code> форматында болуы керек: нүктемен бөлінген дәл үш бөлік, әрқайсысы тек цифрлар. Әйтпесе <code>ValueError</code> (хабарында <code>version</code> сөзі).</p>",
   "starter": "def bundle_filename(name, version):\n    return name + '.joblib'\n",
   "solution": "def bundle_filename(name, version):\n    parts = version.split('.')\n    if len(parts) != 3 or not all(p.isdigit() for p in parts):\n        raise ValueError(f'version X.Y.Z форматында болуы керек: {version!r}')\n    return f'{name}_v{version}.joblib'\n\nprint(bundle_filename('churn', '1.2.0'))\n",
   "hints": [
    "<code>parts = version.split('.')</code>, сосын <code>len(parts) == 3</code> және <code>all(p.isdigit() for p in parts)</code>.",
    "Файл аты: <code>f'{name}_v{version}.joblib'</code>."
   ],
   "check": {
    "tests": "assert bundle_filename('churn', '1.2.0') == 'churn_v1.2.0.joblib', 'bundle_filename(\"churn\", \"1.2.0\") \"churn_v1.2.0.joblib\" қайтаруы керек'\nassert bundle_filename('price', '10.0.3') == 'price_v10.0.3.joblib', 'Көп таңбалы нұсқа да дұрыс'\nfor _v in ['1.2', 'latest', '1.2.x', '1..2', '1.2.3.4']:\n    try:\n        bundle_filename('churn', _v)\n    except ValueError as _e:\n        assert 'version' in str(_e), 'Хабарда \"version\" сөзі болсын'\n    else:\n        raise AssertionError(f'version={_v!r} үшін ValueError күтілді')"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Bundle-ды тексеру",
   "prompt": "<p>Сервер іске қосылғанда жүктелген bundle-ды тексереді. <code>check_bundle(bundle)</code> жазыңыз: мәселелер тізімін қайтарсын. <code>REQUIRED</code> ішіндегі әр жоқ кілт үшін <code>\"missing:кілт\"</code> (REQUIRED ретімен); <code>features</code> бар, бірақ бос тізім болса <code>\"empty:features\"</code>; <code>model</code>-де <code>predict_proba</code> әдісі болмаса <code>\"no_predict_proba\"</code>. Мәселе жоқ болса бос тізім.</p>",
   "starter": "REQUIRED = ['model', 'features', 'version', 'trained_at']\n\ndef check_bundle(bundle):\n    return []\n",
   "solution": "REQUIRED = ['model', 'features', 'version', 'trained_at']\n\ndef check_bundle(bundle):\n    problems = [f'missing:{k}' for k in REQUIRED if k not in bundle]\n    if 'features' in bundle and not bundle['features']:\n        problems.append('empty:features')\n    if 'model' in bundle and not hasattr(bundle['model'], 'predict_proba'):\n        problems.append('no_predict_proba')\n    return problems\n\nprint(check_bundle({'version': '1.0.0'}))\n",
   "hints": [
    "<code>[f'missing:{k}' for k in REQUIRED if k not in bundle]</code>.",
    "Әдіс бар ма: <code>hasattr(bundle['model'], 'predict_proba')</code>."
   ],
   "check": {
    "tests": "class _M:\n    def predict_proba(self, X):\n        return [[0.5, 0.5]]\n_ok = {'model': _M(), 'features': ['a'], 'version': '1.0.0', 'trained_at': '2026-09-30'}\nassert check_bundle(_ok) == [], 'Дұрыс bundle үшін бос тізім'\nassert check_bundle({'version': '1.0.0'}) == ['missing:model', 'missing:features', 'missing:trained_at'], 'Жоқ кілттер REQUIRED ретімен'\nassert check_bundle(dict(_ok, features=[])) == ['empty:features'], 'Бос features → empty:features'\nassert check_bundle(dict(_ok, model='жай мәтін')) == ['no_predict_proba'], 'predict_proba жоқ модель → no_predict_proba'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Пәтер бағасының Pipeline-ы",
   "prompt": "<p>Пәтер бағасының моделін (<code>StandardScaler</code> + <code>LinearRegression</code>) Pipeline ретінде үйретіңіз де, bundle-мен сақтаңыз: <code>{'model': pipe, 'features': FEATURES, 'version': '1.0.0'}</code> → <code>joblib.dump(..., 'flat_price.joblib')</code>. Сосын файлдан <code>restored</code>-қа жүктеп, <code>pred</code>-ке 60 м², 2 бөлмелі пәтердің бағасын (млн ₸, <code>float</code>) restored bundle арқылы есептеңіз.</p>",
   "starter": "import pandas as pd\nimport joblib\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LinearRegression\nflats = pd.DataFrame({\n    'area':      [35, 42, 50, 60, 75, 90, 110, 48],\n    'rooms':     [1, 1, 2, 2, 3, 3, 4, 2],\n    'price_mln': [24.5, 29.4, 35.0, 42.0, 52.5, 63.0, 77.0, 33.6],\n})\nFEATURES = ['area', 'rooms']\n",
   "solution": "import pandas as pd\nimport joblib\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LinearRegression\nflats = pd.DataFrame({\n    'area':      [35, 42, 50, 60, 75, 90, 110, 48],\n    'rooms':     [1, 1, 2, 2, 3, 3, 4, 2],\n    'price_mln': [24.5, 29.4, 35.0, 42.0, 52.5, 63.0, 77.0, 33.6],\n})\nFEATURES = ['area', 'rooms']\n\npipe = make_pipeline(StandardScaler(), LinearRegression())\npipe.fit(flats[FEATURES], flats['price_mln'])\njoblib.dump({'model': pipe, 'features': FEATURES, 'version': '1.0.0'}, 'flat_price.joblib')\nrestored = joblib.load('flat_price.joblib')\nrow = pd.DataFrame([{'rooms': 2, 'area': 60}])[restored['features']]\npred = float(restored['model'].predict(row)[0])\nprint(round(pred, 2))\n",
   "hints": [
    "<code>pipe = make_pipeline(StandardScaler(), LinearRegression())</code>, сосын <code>pipe.fit(flats[FEATURES], flats['price_mln'])</code>.",
    "Болжам үшін: <code>pd.DataFrame([{...}])[restored['features']]</code>."
   ],
   "check": {
    "tests": "import os as _os\nfrom sklearn.pipeline import Pipeline as _Pl\nassert _os.path.exists('flat_price.joblib'), 'flat_price.joblib файлы жасалмаған'\nassert isinstance(restored, dict) and restored.get('version') == '1.0.0' and restored.get('features') == FEATURES, 'restored — файлдан жүктелген bundle (model, features, version)'\nassert isinstance(restored['model'], _Pl) and 'standardscaler' in restored['model'].named_steps, 'Bundle-да бүкіл Pipeline (scaler + модель) болуы керек'\nassert isinstance(pred, float) and abs(pred - 42.0) < 0.3, f'60 м², 2 бөлме ≈ 42 млн ₸ болуы керек, сізде {pred}'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Белгілер ретін сақтау",
   "prompt": "<p>Клиенттер сөздіктерінде кілттердің реті әр түрлі және артық кілттер бар. <code>predict_many(bundle, customers)</code> жазыңыз: барлық клиентті <b>бір</b> DataFrame-ге жинап, бағандарды <code>bundle['features']</code> ретімен алыңыз, <code>predict_proba</code>-ны бір рет шақырып, кету ықтималдықтарын 3 таңбаға дөңгелектенген <code>float</code> тізімі етіп қайтарыңыз. Бос тізім үшін <code>[]</code>.</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LogisticRegression\ndata = pd.DataFrame({\n    'tenure_months': [1, 2, 3, 5, 24, 36, 48, 12, 2, 60, 4, 30],\n    'support_calls': [5, 4, 6, 3, 0, 1, 0, 1, 5, 0, 4, 1],\n    'churned':       [1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0],\n})\nFEATURES = ['tenure_months', 'support_calls']\n\nmodel = LogisticRegression().fit(data[FEATURES], data['churned'])\nbundle = {'model': model, 'features': FEATURES, 'version': '1.0.0'}\n\ndef predict_many(bundle, customers):\n    return [float(bundle['model'].predict_proba([list(c.values())])[0, 1]) for c in customers]\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LogisticRegression\ndata = pd.DataFrame({\n    'tenure_months': [1, 2, 3, 5, 24, 36, 48, 12, 2, 60, 4, 30],\n    'support_calls': [5, 4, 6, 3, 0, 1, 0, 1, 5, 0, 4, 1],\n    'churned':       [1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0],\n})\nFEATURES = ['tenure_months', 'support_calls']\n\nmodel = LogisticRegression().fit(data[FEATURES], data['churned'])\nbundle = {'model': model, 'features': FEATURES, 'version': '1.0.0'}\n\ndef predict_many(bundle, customers):\n    if not customers:\n        return []\n    rows = pd.DataFrame(customers)[bundle['features']]\n    probs = bundle['model'].predict_proba(rows)[:, 1]\n    return [round(float(p), 3) for p in probs]\n\nprint(predict_many(bundle, [{'support_calls': 5, 'tenure_months': 2, 'city': 'Алматы'}, {'tenure_months': 40, 'support_calls': 0}]))\n",
   "hints": [
    "<code>pd.DataFrame(customers)[bundle['features']]</code> — ретті түзеп, артық бағандарды алып тастайды.",
    "<code>predict_proba(rows)[:, 1]</code> — барлық жолдың 1-класс ықтималдығы."
   ],
   "check": {
    "tests": "_c = [{'support_calls': 5, 'tenure_months': 2, 'city': 'Алматы'}, {'tenure_months': 40, 'support_calls': 0, 'plan': 'Безлимит'}]\n_p = predict_many(bundle, _c)\n_ref = model.predict_proba(pd.DataFrame([[2, 5], [40, 0]], columns=FEATURES))[:, 1]\nassert len(_p) == 2 and all(isinstance(x, float) for x in _p), 'Әр клиентке бір float ықтималдық'\nassert _p == [round(float(x), 3) for x in _ref], 'Белгілер bundle[\"features\"] ретімен алынуы керек, нәтиже 3 таңбаға дөңгелектенсін'\nassert predict_many(bundle, []) == [], 'Бос тізім үшін []'\nclass _Cnt:\n    def __init__(self):\n        self.calls = 0\n    def predict_proba(self, X):\n        self.calls += 1\n        return model.predict_proba(X)\n_cm = _Cnt()\npredict_many({'model': _cm, 'features': FEATURES}, _c * 5)\nassert _cm.calls == 1, 'predict_proba бір рет шақырылуы керек (барлық клиент бір DataFrame-де)'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Нұсқа сәйкестігі",
   "prompt": "<p>Модель sklearn-нің басқа нұсқасында ашылмауы мүмкін. <code>load_bundle(blob, current_sklearn)</code> жазыңыз: <code>pickle.loads(blob)</code> арқылы bundle-ды жүктейді; bundle-дағы <code>sklearn_version</code>-ның <b>major.minor</b> бөлігі <code>current_sklearn</code>-нікімен сәйкес келмесе, екі нұсқаны да атап <code>RuntimeError</code> лақтырады (<code>\"1.6.1\"</code> мен <code>\"1.6.0\"</code> — сәйкес, <code>\"1.5.2\"</code> мен <code>\"1.6.1\"</code> — сәйкес емес); <code>sklearn_version</code> жоқ болса да <code>RuntimeError</code>. Сәйкес болса bundle-ды қайтарады.</p>",
   "starter": "import pickle\n\ndef load_bundle(blob, current_sklearn):\n    return pickle.loads(blob)\n",
   "solution": "import pickle\n\ndef major_minor(version):\n    return tuple(int(x) for x in version.split('.')[:2])\n\ndef load_bundle(blob, current_sklearn):\n    bundle = pickle.loads(blob)\n    saved = bundle.get('sklearn_version')\n    if saved is None:\n        raise RuntimeError('bundle-да sklearn_version жоқ')\n    if major_minor(saved) != major_minor(current_sklearn):\n        raise RuntimeError(f'Модель sklearn {saved} нұсқасында сақталған, ағымдағы нұсқа {current_sklearn}')\n    return bundle\n\nblob = pickle.dumps({'model': 'M', 'sklearn_version': '1.6.1'})\nprint(load_bundle(blob, '1.6.0'))\n",
   "hints": [
    "Major.minor: <code>tuple(int(x) for x in v.split('.')[:2])</code>.",
    "Хабарда екі нұсқа да болсын: <code>f'... {saved} ... {current_sklearn}'</code>."
   ],
   "check": {
    "tests": "import pickle as _pk\n_b = load_bundle(_pk.dumps({'model': 'M', 'sklearn_version': '1.6.1'}), '1.6.0')\nassert _b == {'model': 'M', 'sklearn_version': '1.6.1'}, 'Сәйкес нұсқада bundle қайтарылуы керек'\nassert load_bundle(_pk.dumps({'sklearn_version': '1.10.0'}), '1.10.2')['sklearn_version'] == '1.10.0', '1.10.x нұсқалары сәйкес'\nfor _saved, _cur in [('1.5.2', '1.6.1'), ('1.1.0', '1.10.0'), ('0.24.2', '1.24.2')]:\n    try:\n        load_bundle(_pk.dumps({'sklearn_version': _saved}), _cur)\n    except RuntimeError as _e:\n        assert _saved in str(_e) and _cur in str(_e), 'Хабарда екі нұсқа да аталсын'\n    else:\n        raise AssertionError(f'{_saved} мен {_cur} сәйкес емес: RuntimeError күтілді')\ntry:\n    load_bundle(_pk.dumps({'model': 'M'}), '1.6.1')\nexcept RuntimeError:\n    pass\nelse:\n    raise AssertionError('sklearn_version жоқ болса RuntimeError')"
   }
  }
 ],
 "dep-2": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Міндетті өрістер",
   "prompt": "<p><code>missing_fields(data, required)</code> функциясын жазыңыз: <code>required</code> тізіміндегі, бірақ <code>data</code> сөздігінде жоқ өрістерді <code>required</code> ретімен қайтарсын. Мәні <code>None</code> өріс те жоқ деп есептеледі.</p>",
   "starter": "def missing_fields(data, required):\n    return []\n",
   "solution": "def missing_fields(data, required):\n    return [f for f in required if data.get(f) is None]\n\nprint(missing_fields({'tenure_months': 3, 'city': None}, ['tenure_months', 'support_calls', 'city']))\n",
   "hints": [
    "<code>data.get(f)</code> өріс жоқ болса да, мәні <code>None</code> болса да <code>None</code> береді.",
    "<code>[f for f in required if data.get(f) is None]</code>."
   ],
   "check": {
    "tests": "assert missing_fields({'tenure_months': 3, 'city': None}, ['tenure_months', 'support_calls', 'city']) == ['support_calls', 'city'], 'Жоқ және None өрістер required ретімен'\nassert missing_fields({'a': 0, 'b': ''}, ['a', 'b']) == [], '0 мен бос мәтін — бар мәндер'\nassert missing_fields({}, []) == [], 'Міндетті өріс жоқ болса бос тізім'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Теріс емес бүтін сан",
   "prompt": "<p><code>is_count(v)</code> функциясын жазыңыз: <code>v</code> теріс емес бүтін сан болса <code>True</code>. <code>\"12\"</code> мәтіні, <code>2.5</code>, <code>-1</code> және <code>True</code>/<code>False</code> жарамайды (Python-да <code>bool</code> — <code>int</code>-тің түрі, оны бөлек тексеріңіз).</p>",
   "starter": "def is_count(v):\n    return v >= 0\n",
   "solution": "def is_count(v):\n    return isinstance(v, int) and not isinstance(v, bool) and v >= 0\n\nprint(is_count(3), is_count('3'), is_count(True))\n",
   "hints": [
    "<code>isinstance(v, int) and not isinstance(v, bool)</code>.",
    "Сосын <code>v &gt;= 0</code>."
   ],
   "check": {
    "tests": "assert is_count(0) is True and is_count(42) is True, '0 және 42 — дұрыс'\nassert is_count(-1) is False, 'Теріс сан жарамайды'\nassert is_count('12') is False and is_count(2.5) is False, 'Мәтін мен бөлшек сан жарамайды'\nassert is_count(True) is False, 'True — bool, сан емес'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жауап форматы",
   "prompt": "<p><code>make_response(p, version, threshold=0.5)</code> функциясын жазыңыз: болжам жауабын сөздік ретінде қайтарсын: <code>{'ok': True, 'probability': p (3 таңбаға дөңгелектенген), 'label': 1 немесе 0 (p ≥ threshold), 'model_version': version}</code>.</p>",
   "starter": "def make_response(p, version, threshold=0.5):\n    return {'probability': p}\n",
   "solution": "def make_response(p, version, threshold=0.5):\n    return {'ok': True, 'probability': round(p, 3), 'label': int(p >= threshold), 'model_version': version}\n\nprint(make_response(0.81234, '1.2.0'))\n",
   "hints": [
    "<code>label = int(p &gt;= threshold)</code> — True → 1, False → 0.",
    "<code>round(p, 3)</code>."
   ],
   "check": {
    "tests": "assert make_response(0.81234, '1.2.0') == {'ok': True, 'probability': 0.812, 'label': 1, 'model_version': '1.2.0'}, 'Жауап кілттері немесе мәндері дұрыс емес'\nassert make_response(0.5, 'v')['label'] == 1, 'p = threshold болса label 1'\nassert make_response(0.4, 'v', threshold=0.35)['label'] == 1 and make_response(0.3, 'v', threshold=0.35)['label'] == 0, 'threshold параметрі ескерілуі керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Пәтер кірісін тексеру",
   "prompt": "<p><code>validate_flat(data)</code> жазыңыз: қате хабарларының тізімін қайтарсын (бәрі дұрыс болса бос). Ережелер: <code>area</code> — сан (int немесе float, bool емес), 10 ≤ area ≤ 500; <code>rooms</code> — бүтін сан 1–10; <code>city</code> — <code>CITIES</code> ішінде. Өріс жоқ болса да қате. Әр өріске ең көбі бір хабар, хабар өріс атауынан басталсын (<code>\"area: ...\"</code>), өрістер ретпен: area, rooms, city.</p>",
   "starter": "CITIES = {'Алматы', 'Астана', 'Шымкент'}\n\ndef validate_flat(data):\n    errors = []\n    if data['area'] < 10:\n        errors.append('area: тым кіші')\n    return errors\n",
   "solution": "CITIES = {'Алматы', 'Астана', 'Шымкент'}\n\ndef is_number(v):\n    return isinstance(v, (int, float)) and not isinstance(v, bool)\n\ndef validate_flat(data):\n    errors = []\n    area = data.get('area')\n    if area is None:\n        errors.append('area: міндетті өріс')\n    elif not is_number(area) or not 10 <= area <= 500:\n        errors.append(f'area: 10 мен 500 аралығындағы сан керек ({area!r})')\n    rooms = data.get('rooms')\n    if rooms is None:\n        errors.append('rooms: міндетті өріс')\n    elif not isinstance(rooms, int) or isinstance(rooms, bool) or not 1 <= rooms <= 10:\n        errors.append(f'rooms: 1 мен 10 аралығындағы бүтін сан керек ({rooms!r})')\n    city = data.get('city')\n    if city is None:\n        errors.append('city: міндетті өріс')\n    elif city not in CITIES:\n        errors.append(f'city: рұқсат етілмеген қала ({city!r})')\n    return errors\n\nprint(validate_flat({'area': 54.5, 'rooms': 2, 'city': 'Алматы'}))\n",
   "hints": [
    "Әр өрісті <code>data.get(...)</code> арқылы алып, алдымен <code>None</code> ба, сосын типі мен аралығын тексеріңіз.",
    "Аралық: <code>10 &lt;= area &lt;= 500</code>; бүтін сан: <code>isinstance(rooms, int) and not isinstance(rooms, bool)</code>."
   ],
   "check": {
    "tests": "assert validate_flat({'area': 54.5, 'rooms': 2, 'city': 'Алматы'}) == [], 'Дұрыс дерек үшін бос тізім'\nassert validate_flat({'area': 500, 'rooms': 10, 'city': 'Шымкент'}) == [], 'Шекаралық мәндер дұрыс'\n_e = validate_flat({})\nassert len(_e) == 3 and [m.split(':')[0] for m in _e] == ['area', 'rooms', 'city'], f'Барлық өріс жоқ: 3 хабар (area, rooms, city), сізде {_e}'\n_e = validate_flat({'area': '60', 'rooms': 2.0, 'city': 'Париж'})\nassert [m.split(':')[0] for m in _e] == ['area', 'rooms', 'city'], f'\"60\" мәтін, 2.0 бөлшек, Париж рұқсатсыз: 3 хабар, сізде {_e}'\nassert [m.split(':')[0] for m in validate_flat({'area': 5, 'rooms': 0, 'city': 'Астана'})] == ['area', 'rooms'], 'Аралықтан тыс мәндер қате'\nassert validate_flat({'area': True, 'rooms': 1, 'city': 'Астана'})[0].startswith('area'), 'True — сан емес'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Модель бір рет жүктеледі",
   "prompt": "<p><code>load_model()</code> — баяу функция (дискіден оқиды), ол әр шақырылғанда <code>LOADS</code> санауышын арттырады. <code>get_model()</code> жазыңыз: модельді бірінші шақыруда жүктеп, модуль деңгейіндегі <code>MODEL</code> айнымалысында сақтасын, келесі шақыруларда сол объектіні қайтарсын. <code>predict(x)</code> модельді <code>get_model()</code> арқылы алсын.</p>",
   "starter": "LOADS = 0\n\ndef load_model():\n    global LOADS\n    LOADS += 1\n    return {'weight': 0.15, 'bias': 0.1}\n\nMODEL = None\n\ndef get_model():\n    return load_model()\n\ndef predict(support_calls):\n    m = get_model()\n    return round(min(1.0, m['bias'] + m['weight'] * support_calls), 2)\n",
   "solution": "LOADS = 0\n\ndef load_model():\n    global LOADS\n    LOADS += 1\n    return {'weight': 0.15, 'bias': 0.1}\n\nMODEL = None\n\ndef get_model():\n    global MODEL\n    if MODEL is None:\n        MODEL = load_model()\n    return MODEL\n\ndef predict(support_calls):\n    m = get_model()\n    return round(min(1.0, m['bias'] + m['weight'] * support_calls), 2)\n\nprint([predict(k) for k in range(4)], LOADS)\n",
   "hints": [
    "Функция ішінде модуль айнымалысын өзгерту үшін: <code>global MODEL</code>.",
    "<code>if MODEL is None: MODEL = load_model()</code>, сосын <code>return MODEL</code>."
   ],
   "check": {
    "tests": "_r = [predict(k) for k in range(6)]\nassert _r[:3] == [0.1, 0.25, 0.4], 'predict нәтижелері өзгермеуі керек'\nassert LOADS == 1, f'6 болжамда модель бір рет жүктелуі керек, сізде {LOADS} рет'\nassert get_model() is get_model() is MODEL, 'get_model() әрқашан сол бір MODEL объектісін қайтарсын'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Пакетті тексеру",
   "prompt": "<p>Түнгі job бір мезетте көп жол тексереді. <code>validate_customer(row)</code> дайын (қате тізімін қайтарады). <code>split_valid(rows)</code> жазыңыз: <code>(valid, errors)</code> қайтарсын, мұндағы <code>valid</code> — қатесі жоқ жолдар тізімі (ретімен), <code>errors</code> — <code>{жолдың индексі: қате тізімі}</code> сөздігі, тек қате жолдар үшін.</p>",
   "starter": "def validate_customer(row):\n    errors = []\n    for f in ['tenure_months', 'support_calls']:\n        v = row.get(f)\n        if not isinstance(v, int) or isinstance(v, bool) or v < 0:\n            errors.append(f'{f}: теріс емес бүтін сан керек')\n    return errors\n\ndef split_valid(rows):\n    return rows, {}\n",
   "solution": "def validate_customer(row):\n    errors = []\n    for f in ['tenure_months', 'support_calls']:\n        v = row.get(f)\n        if not isinstance(v, int) or isinstance(v, bool) or v < 0:\n            errors.append(f'{f}: теріс емес бүтін сан керек')\n    return errors\n\ndef split_valid(rows):\n    valid, errors = [], {}\n    for i, row in enumerate(rows):\n        e = validate_customer(row)\n        if e:\n            errors[i] = e\n        else:\n            valid.append(row)\n    return valid, errors\n\nprint(split_valid([{'tenure_months': 3, 'support_calls': 1}, {'tenure_months': -1}]))\n",
   "hints": [
    "<code>for i, row in enumerate(rows):</code> — индекспен бірге.",
    "Қате тізімі бос болмаса <code>errors[i] = e</code>, әйтпесе <code>valid.append(row)</code>."
   ],
   "check": {
    "tests": "_rows = [{'tenure_months': 3, 'support_calls': 1}, {'tenure_months': -1, 'support_calls': 2}, {'tenure_months': 12, 'support_calls': 0}, {}]\n_v, _e = split_valid(_rows)\nassert _v == [_rows[0], _rows[2]], 'valid тізімінде тек 0 және 2 жолдар қалуы керек'\nassert sorted(_e) == [1, 3], f'errors кілттері — қате жолдардың индекстері (1 және 3), сізде {sorted(_e)}'\nassert len(_e[3]) == 2 and len(_e[1]) == 1, 'Әр индекс үшін validate_customer қайтарған толық тізім'\nassert split_valid([]) == ([], {}), 'Бос тізім үшін ([], {})'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Тәуекел деңгейі бар болжам",
   "prompt": "<p>Модель бір рет үйретілген (<code>model</code>). <code>predict(customer)</code> жазыңыз. Тексеру: <code>tenure_months</code> — бүтін сан 0–600; <code>support_calls</code> — бүтін сан 0–50. Қате болса <code>{'ok': False, 'errors': [...]}</code> (хабарлар өріс атауынан басталсын). Дұрыс болса <code>{'ok': True, 'churn_probability': p (3 таңба), 'risk': ..., 'model_version': MODEL_VERSION}</code>, мұндағы <code>risk</code>: p ≥ 0.7 → <code>'high'</code>, p ≥ 0.4 → <code>'medium'</code>, әйтпесе <code>'low'</code>. Артық кілттер еленбейді.</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LogisticRegression\ndata = pd.DataFrame({\n    'tenure_months': [1, 2, 3, 5, 24, 36, 48, 12, 2, 60, 4, 30],\n    'support_calls': [5, 4, 6, 3, 0, 1, 0, 1, 5, 0, 4, 1],\n    'churned':       [1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0],\n})\nFEATURES = ['tenure_months', 'support_calls']\nMODEL_VERSION = '1.1.0'\nmodel = LogisticRegression().fit(data[FEATURES], data['churned'])\n\ndef predict(customer):\n    p = float(model.predict_proba(pd.DataFrame([customer])[FEATURES])[0, 1])\n    return {'ok': True, 'churn_probability': p}\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LogisticRegression\ndata = pd.DataFrame({\n    'tenure_months': [1, 2, 3, 5, 24, 36, 48, 12, 2, 60, 4, 30],\n    'support_calls': [5, 4, 6, 3, 0, 1, 0, 1, 5, 0, 4, 1],\n    'churned':       [1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0],\n})\nFEATURES = ['tenure_months', 'support_calls']\nMODEL_VERSION = '1.1.0'\nmodel = LogisticRegression().fit(data[FEATURES], data['churned'])\nLIMITS = {'tenure_months': 600, 'support_calls': 50}\n\ndef validate(customer):\n    errors = []\n    for field, hi in LIMITS.items():\n        v = customer.get(field)\n        if not isinstance(v, int) or isinstance(v, bool) or not 0 <= v <= hi:\n            errors.append(f'{field}: 0 мен {hi} аралығындағы бүтін сан керек')\n    return errors\n\ndef risk_level(p):\n    if p >= 0.7:\n        return 'high'\n    if p >= 0.4:\n        return 'medium'\n    return 'low'\n\ndef predict(customer):\n    errors = validate(customer)\n    if errors:\n        return {'ok': False, 'errors': errors}\n    p = float(model.predict_proba(pd.DataFrame([customer])[FEATURES])[0, 1])\n    return {'ok': True, 'churn_probability': round(p, 3), 'risk': risk_level(p), 'model_version': MODEL_VERSION}\n\nprint(predict({'tenure_months': 2, 'support_calls': 5, 'city': 'Астана'}))\n",
   "hints": [
    "Тексеруді, тәуекел деңгейін және болжамды бөлек функцияларға бөліңіз.",
    "Ықтималдықты дөңгелектемей тұрып <code>risk</code>-ті есептеңіз, сосын <code>round(p, 3)</code>."
   ],
   "check": {
    "tests": "_r = predict({'tenure_months': 2, 'support_calls': 5, 'city': 'Астана'})\nassert _r.get('ok') is True and set(_r) == {'ok', 'churn_probability', 'risk', 'model_version'}, f'Жауап кілттері: ok, churn_probability, risk, model_version. Сізде {sorted(_r)}'\n_p = float(model.predict_proba(pd.DataFrame([[2, 5]], columns=FEATURES))[0, 1])\nassert _r['churn_probability'] == round(_p, 3) and _r['risk'] == 'high' and _r['model_version'] == '1.1.0', 'Жаңа, шағымы көп клиент: risk high'\nassert predict({'tenure_months': 50, 'support_calls': 0})['risk'] == 'low', 'Ұзақ клиент: risk low'\n_ps = {k: float(model.predict_proba(pd.DataFrame([[k, 2]], columns=FEATURES))[0, 1]) for k in range(0, 40)}\n_mid = next(k for k, p in _ps.items() if 0.4 <= p < 0.7)\nassert predict({'tenure_months': _mid, 'support_calls': 2})['risk'] == 'medium', '0.4 ≤ p < 0.7 болса risk medium'\n_r = predict({'tenure_months': 700, 'support_calls': -1})\nassert _r.get('ok') is False and [m.split(':')[0] for m in _r['errors']] == ['tenure_months', 'support_calls'], 'Аралықтан тыс мәндер: екі қате (өріс атауынан басталсын)'\nassert predict({'tenure_months': 5, 'support_calls': 51})['ok'] is False, 'support_calls ≤ 50'\nassert predict({'tenure_months': '5', 'support_calls': 1})['ok'] is False, 'Мәтін \"5\" қабылданбайды'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Predictor класы",
   "prompt": "<p>Болжам логикасын класқа ораңыз. <code>Predictor(model, features, threshold=0.5, version='1.0.0')</code>: <code>predict(data)</code> әдісі <code>self.features</code>-тегі әр өріс теріс емес бүтін сан екенін тексереді; қате болса <code>{'ok': False, 'errors': [...]}</code>, дұрыс болса <code>{'ok': True, 'churn_probability': p (3 таңба), 'label': int(p ≥ self.threshold), 'model_version': self.version}</code>. Екі нысан жасаңыз: <code>default</code> (шек 0.5) және <code>strict</code> (шек 0.8, нұсқа <code>'1.0.0-strict'</code>).</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LogisticRegression\ndata = pd.DataFrame({\n    'tenure_months': [1, 2, 3, 5, 24, 36, 48, 12, 2, 60, 4, 30],\n    'support_calls': [5, 4, 6, 3, 0, 1, 0, 1, 5, 0, 4, 1],\n    'churned':       [1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0],\n})\nFEATURES = ['tenure_months', 'support_calls']\nmodel = LogisticRegression().fit(data[FEATURES], data['churned'])\n\nclass Predictor:\n    def __init__(self, model, features, threshold=0.5, version='1.0.0'):\n        pass\n\n    def predict(self, data):\n        pass\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LogisticRegression\ndata = pd.DataFrame({\n    'tenure_months': [1, 2, 3, 5, 24, 36, 48, 12, 2, 60, 4, 30],\n    'support_calls': [5, 4, 6, 3, 0, 1, 0, 1, 5, 0, 4, 1],\n    'churned':       [1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0],\n})\nFEATURES = ['tenure_months', 'support_calls']\nmodel = LogisticRegression().fit(data[FEATURES], data['churned'])\n\nclass Predictor:\n    def __init__(self, model, features, threshold=0.5, version='1.0.0'):\n        self.model = model\n        self.features = features\n        self.threshold = threshold\n        self.version = version\n\n    def validate(self, data):\n        errors = []\n        for f in self.features:\n            v = data.get(f)\n            if not isinstance(v, int) or isinstance(v, bool) or v < 0:\n                errors.append(f'{f}: теріс емес бүтін сан керек')\n        return errors\n\n    def predict(self, data):\n        errors = self.validate(data)\n        if errors:\n            return {'ok': False, 'errors': errors}\n        row = pd.DataFrame([data])[self.features]\n        p = float(self.model.predict_proba(row)[0, 1])\n        return {'ok': True, 'churn_probability': round(p, 3), 'label': int(p >= self.threshold), 'model_version': self.version}\n\ndefault = Predictor(model, FEATURES)\nstrict = Predictor(model, FEATURES, threshold=0.8, version='1.0.0-strict')\nprint(default.predict({'tenure_months': 4, 'support_calls': 3}), strict.predict({'tenure_months': 4, 'support_calls': 3}))\n",
   "hints": [
    "<code>__init__</code> барлық параметрді <code>self</code>-ке сақтайды; тексеруді бөлек <code>validate</code> әдісіне шығаруға болады.",
    "Шекті <code>self.threshold</code>-тан алыңыз: сонда бір класс әр түрлі шекпен жұмыс істейді."
   ],
   "check": {
    "tests": "assert isinstance(default, Predictor) and isinstance(strict, Predictor), 'default және strict — Predictor нысандары'\nassert default.threshold == 0.5 and default.version == '1.0.0', 'default: шек 0.5, нұсқа 1.0.0'\nassert strict.threshold == 0.8 and strict.version == '1.0.0-strict', 'strict: шек 0.8, нұсқа 1.0.0-strict'\n_ps = {k: float(model.predict_proba(pd.DataFrame([[k, 3]], columns=FEATURES))[0, 1]) for k in range(0, 40)}\n_k = next(k for k, p in _ps.items() if 0.5 <= p < 0.8)\n_a, _b = default.predict({'tenure_months': _k, 'support_calls': 3, 'city': 'Алматы'}), strict.predict({'support_calls': 3, 'tenure_months': _k})\nassert _a['ok'] is True and _a['label'] == 1 and _b['label'] == 0, '0.5 ≤ p < 0.8 болса default label=1, strict label=0'\nassert _a['churn_probability'] == round(_ps[_k], 3) == _b['churn_probability'], 'Ықтималдық 3 таңбаға дөңгелектенсін, екеуінде бірдей'\nassert _b['model_version'] == '1.0.0-strict', 'model_version — self.version'\n_r = default.predict({'tenure_months': -3})\nassert _r['ok'] is False and len(_r['errors']) == 2, 'Теріс tenure және жоқ support_calls: 2 қате'"
   }
  }
 ],
 "dep-3": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Health және version",
   "prompt": "<p>FastAPI-ге ұқсас <code>MiniApp</code> дайын. Декораторлар арқылы екі endpoint тіркеңіз: <code>GET /health</code> → <code>{'status': 'ok'}</code>; <code>GET /version</code> → <code>{'model_version': MODEL_VERSION, 'name': 'churn-api'}</code>.</p>",
   "starter": "class MiniApp:\n    \"\"\"FastAPI-ге ұқсас кішкене router: (method, path) → функция.\"\"\"\n    def __init__(self):\n        self.routes = {}\n\n    def get(self, path):\n        def register(func):\n            self.routes[('GET', path)] = func\n            return func\n        return register\n\n    def post(self, path):\n        def register(func):\n            self.routes[('POST', path)] = func\n            return func\n        return register\n\n    def handle(self, method, path, body=None):\n        func = self.routes.get((method, path))\n        if func is None:\n            if any(p == path for _, p in self.routes):\n                return 405, {'detail': 'Method Not Allowed'}\n            return 404, {'detail': 'Not Found'}\n        try:\n            result = func(body) if method == 'POST' else func()\n        except ValueError as e:\n            return 422, {'detail': str(e)}\n        return 200, result\n\napp = MiniApp()\nMODEL_VERSION = '1.3.0'\n\n# осында endpoint-терді тіркеңіз\n",
   "solution": "class MiniApp:\n    \"\"\"FastAPI-ге ұқсас кішкене router: (method, path) → функция.\"\"\"\n    def __init__(self):\n        self.routes = {}\n\n    def get(self, path):\n        def register(func):\n            self.routes[('GET', path)] = func\n            return func\n        return register\n\n    def post(self, path):\n        def register(func):\n            self.routes[('POST', path)] = func\n            return func\n        return register\n\n    def handle(self, method, path, body=None):\n        func = self.routes.get((method, path))\n        if func is None:\n            if any(p == path for _, p in self.routes):\n                return 405, {'detail': 'Method Not Allowed'}\n            return 404, {'detail': 'Not Found'}\n        try:\n            result = func(body) if method == 'POST' else func()\n        except ValueError as e:\n            return 422, {'detail': str(e)}\n        return 200, result\n\napp = MiniApp()\nMODEL_VERSION = '1.3.0'\n\n@app.get('/health')\ndef health():\n    return {'status': 'ok'}\n\n@app.get('/version')\ndef version():\n    return {'model_version': MODEL_VERSION, 'name': 'churn-api'}\n\nprint(app.handle('GET', '/version'))\n",
   "hints": [
    "Декоратор функцияның үстінде: <code>@app.get('/health')</code>, келесі жолда <code>def health():</code>.",
    "GET функциясы параметр алмайды."
   ],
   "check": {
    "tests": "assert app.handle('GET', '/health') == (200, {'status': 'ok'}), 'GET /health → 200 және {\"status\": \"ok\"}'\nassert app.handle('GET', '/version') == (200, {'model_version': '1.3.0', 'name': 'churn-api'}), 'GET /version → model_version мен name'\nassert app.handle('POST', '/health')[0] == 405, '/health тек GET қабылдайды'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Тіркеу декораторы",
   "prompt": "<p>Декоратордың қалай жұмыс істейтінін қайталайық. <code>route(path)</code> декоратор фабрикасын жазыңыз: ол функцияны <code>ROUTES[path]</code>-ке тіркеп, функцияның <b>өзін</b> қайтаратын декоратор қайтарсын. Сосын <code>@route('/ping')</code> арқылы <code>ping()</code> функциясын тіркеңіз, ол <code>'pong'</code> қайтарсын.</p>",
   "starter": "ROUTES = {}\n\ndef route(path):\n    pass\n",
   "solution": "ROUTES = {}\n\ndef route(path):\n    def decorator(func):\n        ROUTES[path] = func\n        return func\n    return decorator\n\n@route('/ping')\ndef ping():\n    return 'pong'\n\nprint(ROUTES, ping())\n",
   "hints": [
    "Екі деңгей: <code>def route(path):</code> ішінде <code>def decorator(func):</code>, соңында <code>return decorator</code>.",
    "Декоратор ішінде <code>ROUTES[path] = func</code> және <code>return func</code>."
   ],
   "check": {
    "tests": "assert ROUTES.get('/ping') is ping, '@route(\"/ping\") ping функциясын ROUTES-қа тіркеуі керек'\nassert ping() == 'pong', 'Декоратор функцияның өзін қайтаруы керек (return func)'\n@route('/x')\ndef _x():\n    return 1\nassert ROUTES['/x'] is _x and _x() == 1, 'route кез келген path-пен жұмыс істеуі керек'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Валюта айырбастау endpoint-і",
   "prompt": "<p><code>MiniApp</code> дайын. <code>POST /convert</code> endpoint-ін тіркеңіз: body-ден <code>tenge</code> алып, <code>{'usd': round(tenge / RATE, 2)}</code> қайтарсын. <code>tenge</code> жоқ болса немесе теріс болса, <code>ValueError</code> лақтырсын (MiniApp оны 422-ге айналдырады).</p>",
   "starter": "class MiniApp:\n    \"\"\"FastAPI-ге ұқсас кішкене router: (method, path) → функция.\"\"\"\n    def __init__(self):\n        self.routes = {}\n\n    def get(self, path):\n        def register(func):\n            self.routes[('GET', path)] = func\n            return func\n        return register\n\n    def post(self, path):\n        def register(func):\n            self.routes[('POST', path)] = func\n            return func\n        return register\n\n    def handle(self, method, path, body=None):\n        func = self.routes.get((method, path))\n        if func is None:\n            if any(p == path for _, p in self.routes):\n                return 405, {'detail': 'Method Not Allowed'}\n            return 404, {'detail': 'Not Found'}\n        try:\n            result = func(body) if method == 'POST' else func()\n        except ValueError as e:\n            return 422, {'detail': str(e)}\n        return 200, result\n\napp = MiniApp()\nRATE = 500\n\n# осында @app.post('/convert') жазыңыз\n",
   "solution": "class MiniApp:\n    \"\"\"FastAPI-ге ұқсас кішкене router: (method, path) → функция.\"\"\"\n    def __init__(self):\n        self.routes = {}\n\n    def get(self, path):\n        def register(func):\n            self.routes[('GET', path)] = func\n            return func\n        return register\n\n    def post(self, path):\n        def register(func):\n            self.routes[('POST', path)] = func\n            return func\n        return register\n\n    def handle(self, method, path, body=None):\n        func = self.routes.get((method, path))\n        if func is None:\n            if any(p == path for _, p in self.routes):\n                return 405, {'detail': 'Method Not Allowed'}\n            return 404, {'detail': 'Not Found'}\n        try:\n            result = func(body) if method == 'POST' else func()\n        except ValueError as e:\n            return 422, {'detail': str(e)}\n        return 200, result\n\napp = MiniApp()\nRATE = 500\n\n@app.post('/convert')\ndef convert(body):\n    if 'tenge' not in body:\n        raise ValueError('tenge: міндетті өріс')\n    if body['tenge'] < 0:\n        raise ValueError('tenge: теріс болмауы керек')\n    return {'usd': round(body['tenge'] / RATE, 2)}\n\nprint(app.handle('POST', '/convert', {'tenge': 12345}))\n",
   "hints": [
    "POST функциясы body алады: <code>def convert(body):</code>.",
    "Өріс жоқ болса: <code>raise ValueError('tenge: міндетті өріс')</code>."
   ],
   "check": {
    "tests": "assert app.handle('POST', '/convert', {'tenge': 12345}) == (200, {'usd': 24.69}), '12345 ₸ → 24.69 $'\nassert app.handle('POST', '/convert', {'tenge': 0}) == (200, {'usd': 0.0}), '0 ₸ → 0.0'\nassert app.handle('POST', '/convert', {})[0] == 422, 'tenge жоқ → 422'\nassert app.handle('POST', '/convert', {'tenge': -10})[0] == 422, 'Теріс сома → 422'\nassert app.handle('GET', '/convert')[0] == 405, '/convert тек POST'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Path параметрін табу",
   "prompt": "<p>FastAPI-дегі <code>/customers/{customer_id}</code> сияқты үлгілерді салыстыру үшін <code>match_route(pattern, path)</code> жазыңыз. Бөліктер саны тең болса және әр бөлік не дәл сәйкес, не <code>{атауы}</code> түрінде болса, параметрлер сөздігін қайтарсын (мәндер мәтін); сәйкес келмесе <code>None</code>. Мысалы, <code>(\"/customers/{customer_id}\", \"/customers/42\")</code> → <code>{\"customer_id\": \"42\"}</code>.</p>",
   "starter": "def match_route(pattern, path):\n    return None\n",
   "solution": "def match_route(pattern, path):\n    p_parts = pattern.strip('/').split('/')\n    parts = path.strip('/').split('/')\n    if len(p_parts) != len(parts):\n        return None\n    params = {}\n    for p, v in zip(p_parts, parts):\n        if p.startswith('{') and p.endswith('}'):\n            params[p[1:-1]] = v\n        elif p != v:\n            return None\n    return params\n\nprint(match_route('/customers/{customer_id}', '/customers/42'))\n",
   "hints": [
    "Екеуін де <code>strip('/').split('/')</code> арқылы бөліңіз да, <code>zip</code>-пен жұптап өтіңіз.",
    "Параметр бөлігі: <code>p.startswith('{') and p.endswith('}')</code>, атауы <code>p[1:-1]</code>."
   ],
   "check": {
    "tests": "assert match_route('/customers/{customer_id}', '/customers/42') == {'customer_id': '42'}, '(\"/customers/{customer_id}\", \"/customers/42\") → {\"customer_id\": \"42\"}'\nassert match_route('/cities/{city}/weather/{day}', '/cities/Алматы/weather/3') == {'city': 'Алматы', 'day': '3'}, 'Бірнеше параметр'\nassert match_route('/health', '/health') == {}, 'Параметрсіз сәйкес path → бос сөздік'\nassert match_route('/customers/{id}', '/orders/42') is None, 'Бекітілген бөлік сәйкес емес → None'\nassert match_route('/customers/{id}', '/customers/42/history') is None, 'Бөліктер саны басқа → None'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "HTTPException",
   "prompt": "<p>FastAPI-де endpoint <code>HTTPException</code> лақтырып, кез келген статус қайтара алады. <code>HTTPException(status_code, detail)</code> қате класын жазыңыз (<code>Exception</code>-нан мұра, екі атрибутты сақтайды). Сосын <code>call(func, *args)</code> жазыңыз: <code>func(*args)</code> шақырады; <code>HTTPException</code> → <code>(e.status_code, {'detail': e.detail})</code>; <code>ValueError</code> → <code>(422, {'detail': str(e)})</code>; сәтті → <code>(200, нәтиже)</code>. <code>get_city(name)</code> endpoint-і дайын, ол сіздің класыңызды қолданады.</p>",
   "starter": "CITIES = {'Алматы': 2_200_000, 'Астана': 1_400_000}\n\ndef get_city(name):\n    if name not in CITIES:\n        raise HTTPException(404, 'Қала табылмады')\n    return {'city': name, 'population': CITIES[name]}\n\ndef call(func, *args):\n    return 200, func(*args)\n",
   "solution": "CITIES = {'Алматы': 2_200_000, 'Астана': 1_400_000}\n\nclass HTTPException(Exception):\n    def __init__(self, status_code, detail):\n        super().__init__(detail)\n        self.status_code = status_code\n        self.detail = detail\n\ndef get_city(name):\n    if name not in CITIES:\n        raise HTTPException(404, 'Қала табылмады')\n    return {'city': name, 'population': CITIES[name]}\n\ndef call(func, *args):\n    try:\n        return 200, func(*args)\n    except HTTPException as e:\n        return e.status_code, {'detail': e.detail}\n    except ValueError as e:\n        return 422, {'detail': str(e)}\n\nprint(call(get_city, 'Алматы'), call(get_city, 'Орал'))\n",
   "hints": [
    "<code>class HTTPException(Exception):</code> ішінде <code>__init__(self, status_code, detail)</code> екі атрибутты сақтайды.",
    "<code>call</code>: <code>try: return 200, func(*args)</code>, сосын екі <code>except</code>."
   ],
   "check": {
    "tests": "_e = HTTPException(403, 'рұқсат жоқ')\nassert isinstance(_e, Exception) and _e.status_code == 403 and _e.detail == 'рұқсат жоқ', 'HTTPException status_code пен detail-ді сақтауы керек'\nassert call(get_city, 'Алматы') == (200, {'city': 'Алматы', 'population': 2200000}), 'Сәтті шақыру → 200'\nassert call(get_city, 'Орал') == (404, {'detail': 'Қала табылмады'}), 'HTTPException(404) → (404, {\"detail\": ...})'\ndef _bad(x):\n    raise ValueError('x: сан керек')\nassert call(_bad, 'a') == (422, {'detail': 'x: сан керек'}), 'ValueError → 422'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Шақыруларды санайтын декоратор",
   "prompt": "<p>Мониторинг үшін әр endpoint неше рет шақырылғанын білгіміз келеді. <code>count_calls(func)</code> декораторын жазыңыз: ол <code>wrapper(*args)</code> функциясын қайтарсын, wrapper <code>wrapper.calls</code> санауышын 1-ге арттырып, <code>func(*args)</code> нәтижесін қайтарсын. Бастапқыда <code>wrapper.calls = 0</code>.</p>",
   "starter": "def count_calls(func):\n    return func\n",
   "solution": "def count_calls(func):\n    def wrapper(*args):\n        wrapper.calls += 1\n        return func(*args)\n    wrapper.calls = 0\n    return wrapper\n\n@count_calls\ndef health():\n    return {'status': 'ok'}\n\nhealth()\nhealth()\nprint(health.calls)\n",
   "hints": [
    "Ішкі <code>def wrapper(*args):</code> функциясы <code>func(*args)</code>-ты шақырады.",
    "Функцияның да атрибуты болады: <code>wrapper.calls = 0</code>, ішінде <code>wrapper.calls += 1</code>."
   ],
   "check": {
    "tests": "@count_calls\ndef _sq(x):\n    return x * x\nassert _sq.calls == 0, 'Бастапқыда calls = 0'\nassert _sq(3) == 9 and _sq(4) == 16, 'Wrapper функцияның нәтижесін қайтаруы керек'\nassert _sq.calls == 2, 'Екі шақырудан кейін calls = 2'\n@count_calls\ndef _one():\n    return 1\n_one()\nassert _one.calls == 1 and _sq.calls == 2, 'Әр функцияның өз санауышы болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Path параметрлі router",
   "prompt": "<p>Path параметрлерін қолдайтын <code>Router</code> жазыңыз. <code>get(pattern)</code> декораторы <code>('GET', pattern, func)</code>-ті <code>self.routes</code> тізіміне қосып, функцияны қайтарады. <code>handle(method, path)</code>: әр маршрут үшін <code>match_route</code> арқылы сәйкестікті тексереді; сәйкес болса, цифрлардан тұратын мәндерді <code>int</code>-ке айналдырып, <code>func(**params)</code> шақырады және <code>(200, нәтиже)</code> қайтарады; path сәйкес, бірақ әдіс басқа болса <code>(405, ...)</code>; ешқайсысы сәйкес болмаса <code>(404, ...)</code>. <code>match_route</code> дайын.</p>",
   "starter": "def match_route(pattern, path):\n    p_parts = pattern.strip('/').split('/')\n    parts = path.strip('/').split('/')\n    if len(p_parts) != len(parts):\n        return None\n    params = {}\n    for p, v in zip(p_parts, parts):\n        if p.startswith('{') and p.endswith('}'):\n            params[p[1:-1]] = v\n        elif p != v:\n            return None\n    return params\n\nclass Router:\n    def __init__(self):\n        self.routes = []\n\n    def get(self, pattern):\n        pass\n\n    def handle(self, method, path):\n        return 404, {'detail': 'Not Found'}\n",
   "solution": "def match_route(pattern, path):\n    p_parts = pattern.strip('/').split('/')\n    parts = path.strip('/').split('/')\n    if len(p_parts) != len(parts):\n        return None\n    params = {}\n    for p, v in zip(p_parts, parts):\n        if p.startswith('{') and p.endswith('}'):\n            params[p[1:-1]] = v\n        elif p != v:\n            return None\n    return params\n\nclass Router:\n    def __init__(self):\n        self.routes = []\n\n    def get(self, pattern):\n        def decorator(func):\n            self.routes.append(('GET', pattern, func))\n            return func\n        return decorator\n\n    def handle(self, method, path):\n        path_found = False\n        for m, pattern, func in self.routes:\n            params = match_route(pattern, path)\n            if params is None:\n                continue\n            path_found = True\n            if m != method:\n                continue\n            params = {k: int(v) if v.isdigit() else v for k, v in params.items()}\n            return 200, func(**params)\n        if path_found:\n            return 405, {'detail': 'Method Not Allowed'}\n        return 404, {'detail': 'Not Found'}\n\nrouter = Router()\n\n@router.get('/customers/{customer_id}')\ndef get_customer(customer_id):\n    return {'id': customer_id, 'is_int': isinstance(customer_id, int)}\n\nprint(router.handle('GET', '/customers/42'))\n",
   "hints": [
    "Декоратор: <code>self.routes.append(('GET', pattern, func))</code>, сосын <code>return func</code>.",
    "Түрлендіру: <code>{k: int(v) if v.isdigit() else v for k, v in params.items()}</code>, шақыру: <code>func(**params)</code>."
   ],
   "check": {
    "tests": "_r = Router()\n@_r.get('/customers/{customer_id}')\ndef _c(customer_id):\n    return {'id': customer_id}\n@_r.get('/cities/{city}/weather')\ndef _w(city):\n    return {'city': city}\n@_r.get('/health')\ndef _h():\n    return {'status': 'ok'}\nassert _c(5) == {'id': 5}, 'Декоратор функцияның өзін қайтаруы керек'\nassert len(_r.routes) == 3, 'Әр маршрут routes тізіміне қосылуы керек'\nassert _r.handle('GET', '/customers/42') == (200, {'id': 42}), 'Цифрлы параметр int-ке айналуы керек: {\"id\": 42}'\nassert _r.handle('GET', '/cities/Алматы/weather') == (200, {'city': 'Алматы'}), 'Мәтін параметр сол күйінде'\nassert _r.handle('GET', '/health') == (200, {'status': 'ok'}), 'Параметрсіз маршрут'\nassert _r.handle('POST', '/customers/42')[0] == 405, 'Path сәйкес, әдіс басқа → 405'\nassert _r.handle('GET', '/customers')[0] == 404 and _r.handle('GET', '/orders/1')[0] == 404, 'Сәйкес маршрут жоқ → 404'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Churn API толық",
   "prompt": "<p><code>MiniApp</code> мен үйретілген <code>model</code> дайын. Екі endpoint тіркеңіз: <code>GET /health</code> → <code>{'status': 'ok', 'model_version': MODEL_VERSION}</code>; <code>POST /predict</code> → body-дегі <code>tenure_months</code> пен <code>support_calls</code> теріс емес бүтін сан болуы керек (әйтпесе өріс атауы бар <code>ValueError</code> → 422); нәтиже <code>{'churn_probability': p (3 таңба), 'label': int(p ≥ 0.5)}</code>. Модель тек <code>FEATURES</code> бағандарын көрсін (артық кілттер еленбейді).</p>",
   "starter": "import pandas as pd\nfrom sklearn.linear_model import LogisticRegression\ndata = pd.DataFrame({\n    'tenure_months': [1, 2, 3, 5, 24, 36, 48, 12, 2, 60, 4, 30],\n    'support_calls': [5, 4, 6, 3, 0, 1, 0, 1, 5, 0, 4, 1],\n    'churned':       [1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0],\n})\nFEATURES = ['tenure_months', 'support_calls']\nclass MiniApp:\n    \"\"\"FastAPI-ге ұқсас кішкене router: (method, path) → функция.\"\"\"\n    def __init__(self):\n        self.routes = {}\n\n    def get(self, path):\n        def register(func):\n            self.routes[('GET', path)] = func\n            return func\n        return register\n\n    def post(self, path):\n        def register(func):\n            self.routes[('POST', path)] = func\n            return func\n        return register\n\n    def handle(self, method, path, body=None):\n        func = self.routes.get((method, path))\n        if func is None:\n            if any(p == path for _, p in self.routes):\n                return 405, {'detail': 'Method Not Allowed'}\n            return 404, {'detail': 'Not Found'}\n        try:\n            result = func(body) if method == 'POST' else func()\n        except ValueError as e:\n            return 422, {'detail': str(e)}\n        return 200, result\n\napp = MiniApp()\nMODEL_VERSION = '2.0.0'\nmodel = LogisticRegression().fit(data[FEATURES], data['churned'])\n\n# осында endpoint-терді тіркеңіз\n",
   "solution": "import pandas as pd\nfrom sklearn.linear_model import LogisticRegression\ndata = pd.DataFrame({\n    'tenure_months': [1, 2, 3, 5, 24, 36, 48, 12, 2, 60, 4, 30],\n    'support_calls': [5, 4, 6, 3, 0, 1, 0, 1, 5, 0, 4, 1],\n    'churned':       [1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0],\n})\nFEATURES = ['tenure_months', 'support_calls']\nclass MiniApp:\n    \"\"\"FastAPI-ге ұқсас кішкене router: (method, path) → функция.\"\"\"\n    def __init__(self):\n        self.routes = {}\n\n    def get(self, path):\n        def register(func):\n            self.routes[('GET', path)] = func\n            return func\n        return register\n\n    def post(self, path):\n        def register(func):\n            self.routes[('POST', path)] = func\n            return func\n        return register\n\n    def handle(self, method, path, body=None):\n        func = self.routes.get((method, path))\n        if func is None:\n            if any(p == path for _, p in self.routes):\n                return 405, {'detail': 'Method Not Allowed'}\n            return 404, {'detail': 'Not Found'}\n        try:\n            result = func(body) if method == 'POST' else func()\n        except ValueError as e:\n            return 422, {'detail': str(e)}\n        return 200, result\n\napp = MiniApp()\nMODEL_VERSION = '2.0.0'\nmodel = LogisticRegression().fit(data[FEATURES], data['churned'])\n\n@app.get('/health')\ndef health():\n    return {'status': 'ok', 'model_version': MODEL_VERSION}\n\n@app.post('/predict')\ndef predict(body):\n    for f in FEATURES:\n        v = body.get(f)\n        if not isinstance(v, int) or isinstance(v, bool) or v < 0:\n            raise ValueError(f'{f}: теріс емес бүтін сан керек')\n    row = pd.DataFrame([body])[FEATURES]\n    p = float(model.predict_proba(row)[0, 1])\n    return {'churn_probability': round(p, 3), 'label': int(p >= 0.5)}\n\nprint(app.handle('POST', '/predict', {'tenure_months': 2, 'support_calls': 5, 'city': 'Алматы'}))\n",
   "hints": [
    "POST функциясында алдымен <code>FEATURES</code> бойынша тексеру, қате болса <code>raise ValueError(f'{f}: ...')</code>.",
    "Болжам: <code>pd.DataFrame([body])[FEATURES]</code>, <code>model.predict_proba(row)[0, 1]</code>."
   ],
   "check": {
    "tests": "assert app.handle('GET', '/health') == (200, {'status': 'ok', 'model_version': '2.0.0'}), 'GET /health → status және model_version'\n_s, _d = app.handle('POST', '/predict', {'tenure_months': 2, 'support_calls': 5, 'city': 'Алматы'})\n_p = float(model.predict_proba(pd.DataFrame([[2, 5]], columns=FEATURES))[0, 1])\nassert _s == 200 and _d == {'churn_probability': round(_p, 3), 'label': 1}, f'POST /predict нәтижесі дұрыс емес: {_d}'\nassert app.handle('POST', '/predict', {'tenure_months': 48, 'support_calls': 0})[1]['label'] == 0, 'Ұзақ клиентке label 0'\n_s, _d = app.handle('POST', '/predict', {'tenure_months': 3})\nassert _s == 422 and 'support_calls' in _d['detail'], 'support_calls жоқ → 422, detail-де өріс атауы'\nassert app.handle('POST', '/predict', {'tenure_months': -1, 'support_calls': 1})[0] == 422, 'Теріс мән → 422'\nassert app.handle('GET', '/predict')[0] == 405, '/predict тек POST'"
   }
  }
 ],
 "dep-4": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Dataclass схемасы",
   "prompt": "<p><code>@dataclass</code> арқылы <code>Order</code> схемасын жазыңыз: өрістері <code>city: str</code>, <code>amount: int</code>, <code>qty: int = 1</code> (әдепкі мәні 1). Сосын <code>o = Order('Алматы', 12500)</code> жасаңыз.</p>",
   "starter": "from dataclasses import dataclass\n",
   "solution": "from dataclasses import dataclass, asdict\n\n@dataclass\nclass Order:\n    city: str\n    amount: int\n    qty: int = 1\n\no = Order('Алматы', 12500)\nprint(o, asdict(o))\n",
   "hints": [
    "Класстың үстіне <code>@dataclass</code>, ішінде өрістер hint-пен: <code>city: str</code>.",
    "Әдепкі мәні бар өріс соңында тұрады: <code>qty: int = 1</code>."
   ],
   "check": {
    "tests": "from dataclasses import is_dataclass as _isdc, asdict as _ad\nassert _isdc(Order), 'Order — @dataclass болуы керек'\nassert Order.__annotations__ == {'city': str, 'amount': int, 'qty': int}, 'Өрістер: city: str, amount: int, qty: int'\nassert _ad(o) == {'city': 'Алматы', 'amount': 12500, 'qty': 1}, 'o = Order(\"Алматы\", 12500), qty әдепкі мәні 1'\nassert Order('Астана', 100, 3).qty == 3, 'qty берілсе сақталуы керек'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Мәтінді санға түрлендіру",
   "prompt": "<p>Метеостанциядан келген дерек: <code>Reading(station, temp)</code> dataclass-ына <code>__post_init__</code> қосыңыз: <code>temp</code>-ті <code>float()</code> арқылы түрлендірсін (Pydantic-тегі coercion сияқты: <code>\"-12.5\"</code> → <code>-12.5</code>), ал <code>station</code>-нің шетіндегі бос орындарды алып тастасын.</p>",
   "starter": "from dataclasses import dataclass\n\n@dataclass\nclass Reading:\n    station: str\n    temp: float\n",
   "solution": "from dataclasses import dataclass\n\n@dataclass\nclass Reading:\n    station: str\n    temp: float\n\n    def __post_init__(self):\n        self.station = self.station.strip()\n        self.temp = float(self.temp)\n\nprint(Reading(' Алматы-1 ', '-12.5'))\n",
   "hints": [
    "<code>def __post_init__(self):</code> объект жасалған соң бірден шақырылады.",
    "<code>self.temp = float(self.temp)</code>, <code>self.station = self.station.strip()</code>."
   ],
   "check": {
    "tests": "_r = Reading(' Алматы-1 ', '-12.5')\nassert _r.temp == -12.5 and isinstance(_r.temp, float), '\"-12.5\" мәтіні float-қа айналуы керек'\nassert _r.station == 'Алматы-1', 'station шетіндегі бос орындар алынсын'\nassert Reading('Астана', 3).temp == 3.0 and isinstance(Reading('Астана', 3).temp, float), 'int те float-қа айналсын'\ntry:\n    Reading('Орал', 'суық')\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Сан емес мәтін ValueError беруі керек')"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Рұқсат етілген мәндер",
   "prompt": "<p>Pydantic-тегі <code>Literal</code> сияқты: <code>Ticket(route, seat_class)</code> dataclass-ына <code>__post_init__</code> қосыңыз. <code>seat_class</code> <code>SEAT_CLASSES</code> ішінде болмаса, хабарында <code>seat_class</code> сөзі бар <code>ValueError</code> лақтырсын.</p>",
   "starter": "from dataclasses import dataclass\n\nSEAT_CLASSES = {'econom', 'business'}\n\n@dataclass\nclass Ticket:\n    route: str\n    seat_class: str\n",
   "solution": "from dataclasses import dataclass\n\nSEAT_CLASSES = {'econom', 'business'}\n\n@dataclass\nclass Ticket:\n    route: str\n    seat_class: str\n\n    def __post_init__(self):\n        if self.seat_class not in SEAT_CLASSES:\n            raise ValueError(f'seat_class: {self.seat_class!r} рұқсат етілмеген')\n\nprint(Ticket('Алматы–Астана', 'econom'))\n",
   "hints": [
    "<code>if self.seat_class not in SEAT_CLASSES: raise ValueError('seat_class: ...')</code>.",
    "Тексеру <code>__post_init__</code> ішінде жазылады."
   ],
   "check": {
    "tests": "assert Ticket('Алматы–Астана', 'econom').seat_class == 'econom', 'Дұрыс мән қабылдануы керек'\nassert Ticket('Астана–Шымкент', 'business').route == 'Астана–Шымкент', 'route сақталуы керек'\ntry:\n    Ticket('Алматы–Астана', 'first')\nexcept ValueError as _e:\n    assert 'seat_class' in str(_e), 'Хабарда seat_class сөзі болсын'\nelse:\n    raise AssertionError('seat_class=\"first\" ValueError беруі керек')"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Шектеулері бар схема",
   "prompt": "<p><code>Flat(area, rooms, price)</code> dataclass-ына <code>__post_init__</code> жазыңыз (Pydantic <code>Field</code> шектеулері сияқты): <code>area</code> → <code>float</code>, <code>&gt; 0</code> болуы керек; <code>rooms</code> → <code>int</code>, 1 ≤ rooms ≤ 10; <code>price</code> → <code>int</code>, ≥ 0. Түрлендіру <code>float()</code>/<code>int()</code> арқылы. Шектеу бұзылса, хабары өріс атауынан басталатын <code>ValueError</code>.</p>",
   "starter": "from dataclasses import dataclass\n\n@dataclass\nclass Flat:\n    area: float\n    rooms: int\n    price: int\n",
   "solution": "from dataclasses import dataclass\n\n@dataclass\nclass Flat:\n    area: float\n    rooms: int\n    price: int\n\n    def __post_init__(self):\n        self.area = float(self.area)\n        self.rooms = int(self.rooms)\n        self.price = int(self.price)\n        if self.area <= 0:\n            raise ValueError('area: 0-ден үлкен болуы керек')\n        if not 1 <= self.rooms <= 10:\n            raise ValueError('rooms: 1 мен 10 аралығында болуы керек')\n        if self.price < 0:\n            raise ValueError('price: теріс болмауы керек')\n\nprint(Flat('54.5', '2', 38000000))\n",
   "hints": [
    "Алдымен түрлендіріңіз: <code>self.area = float(self.area)</code>, т.с.с.",
    "Сосын әр шектеуге бір <code>if ...: raise ValueError('өріс: ...')</code>."
   ],
   "check": {
    "tests": "_f = Flat('54.5', '2', '38000000')\nassert _f.area == 54.5 and _f.rooms == 2 and _f.price == 38000000, 'Мәтіндер санға түрлендірілуі керек'\nassert isinstance(_f.area, float) and isinstance(_f.rooms, int) and isinstance(_f.price, int), 'Типтер: area float, rooms int, price int'\nfor _args, _field in [((0, 2, 100), 'area'), ((40, 0, 100), 'rooms'), ((40, 11, 100), 'rooms'), ((40, 2, -1), 'price')]:\n    try:\n        Flat(*_args)\n    except ValueError as _e:\n        assert str(_e).startswith(_field), f'Хабар өріс атауынан ({_field}) басталсын, сізде: {_e}'\n    else:\n        raise AssertionError(f'Flat{_args} ValueError лақтыруы керек')\nassert Flat(10, 10, 0).rooms == 10, 'Шекаралық мәндер (rooms=10, price=0) дұрыс'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Барлық қатені жинау",
   "prompt": "<p>Pydantic бірінші қатеде тоқтамай, барлық қатені бірден көрсетеді. <code>validate(data, schema)</code> жазыңыз: <code>schema</code> — <code>{өріс: (түрлендіргіш, тексеру функциясы)}</code>. Әр өріс үшін: жоқ болса → қате; түрлендіргіш <code>ValueError</code> берсе → қате; тексеру <code>False</code> қайтарса → қате. <code>(clean, errors)</code> қайтарсын: <code>clean</code> — сәтті түрлендірілген өрістер сөздігі, <code>errors</code> — қате өрістердің атаулары (schema ретімен).</p>",
   "starter": "SCHEMA = {\n    'tenure_months': (int, lambda v: v >= 0),\n    'monthly_fee': (float, lambda v: v > 0),\n    'city': (str, lambda v: v in {'Алматы', 'Астана', 'Шымкент'}),\n}\n\ndef validate(data, schema):\n    clean = {k: conv(data[k]) for k, (conv, ok) in schema.items()}\n    return clean, []\n",
   "solution": "SCHEMA = {\n    'tenure_months': (int, lambda v: v >= 0),\n    'monthly_fee': (float, lambda v: v > 0),\n    'city': (str, lambda v: v in {'Алматы', 'Астана', 'Шымкент'}),\n}\n\ndef validate(data, schema):\n    clean, errors = {}, []\n    for field, (conv, ok) in schema.items():\n        if field not in data:\n            errors.append(field)\n            continue\n        try:\n            value = conv(data[field])\n        except ValueError:\n            errors.append(field)\n            continue\n        if not ok(value):\n            errors.append(field)\n            continue\n        clean[field] = value\n    return clean, errors\n\nprint(validate({'tenure_months': '12', 'monthly_fee': '0', 'city': 'Париж'}, SCHEMA))\n",
   "hints": [
    "Әр өрістің үш тексерісі: жоқ па → <code>try: conv(...)</code> → <code>ok(value)</code>; кез келген қатеде <code>errors.append(field)</code> және <code>continue</code>.",
    "Цикл бірінші қатеде тоқтамауы керек."
   ],
   "check": {
    "tests": "assert validate({'tenure_months': '12', 'monthly_fee': '4990', 'city': 'Алматы'}, SCHEMA) == ({'tenure_months': 12, 'monthly_fee': 4990.0, 'city': 'Алматы'}, []), 'Дұрыс дерек: барлығы түрлендірілген, қате жоқ'\n_c, _e = validate({'tenure_months': 'он', 'monthly_fee': '0', 'city': 'Париж'}, SCHEMA)\nassert _e == ['tenure_months', 'monthly_fee', 'city'] and _c == {}, f'Үш өріс те қате (түрлендіру, шектеу, рұқсат), сізде {_e}'\n_c, _e = validate({'tenure_months': -1, 'city': 'Астана'}, SCHEMA)\nassert _e == ['tenure_months', 'monthly_fee'] and _c == {'city': 'Астана'}, 'Теріс tenure және жоқ monthly_fee; city дұрыс'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жауап схемасы",
   "prompt": "<p>FastAPI-де <code>response_model</code> шығысты да тексереді. <code>PredictionOut(probability, label, model_version)</code> dataclass-ына <code>__post_init__</code> жазыңыз: <code>probability</code> 0..1 аралығында, <code>label</code> 0 немесе 1, <code>model_version</code> бос емес мәтін болмаса <code>ValueError</code>. Сосын <code>to_response(p, version, threshold=0.5)</code> жазыңыз: <code>asdict(PredictionOut(round(p, 3), int(p &gt;= threshold), version))</code> қайтарсын.</p>",
   "starter": "from dataclasses import dataclass, asdict\n\n@dataclass\nclass PredictionOut:\n    probability: float\n    label: int\n    model_version: str\n\ndef to_response(p, version, threshold=0.5):\n    return {'probability': p}\n",
   "solution": "from dataclasses import dataclass, asdict\n\n@dataclass\nclass PredictionOut:\n    probability: float\n    label: int\n    model_version: str\n\n    def __post_init__(self):\n        if not 0 <= self.probability <= 1:\n            raise ValueError(f'probability: 0..1 аралығында болуы керек ({self.probability})')\n        if self.label not in (0, 1):\n            raise ValueError(f'label: 0 немесе 1 болуы керек ({self.label})')\n        if not isinstance(self.model_version, str) or not self.model_version:\n            raise ValueError('model_version: бос болмауы керек')\n\ndef to_response(p, version, threshold=0.5):\n    return asdict(PredictionOut(round(p, 3), int(p >= threshold), version))\n\nprint(to_response(0.8123, '1.2.0'))\n",
   "hints": [
    "Үш <code>if ...: raise ValueError(...)</code> тексерісі <code>__post_init__</code> ішінде.",
    "<code>to_response</code> схеманы жасап, <code>asdict(...)</code> қайтарады: қате шықса, ол жоғары кетеді."
   ],
   "check": {
    "tests": "assert to_response(0.8123, '1.2.0') == {'probability': 0.812, 'label': 1, 'model_version': '1.2.0'}, 'to_response(0.8123, \"1.2.0\") нәтижесі дұрыс емес'\nassert to_response(0.3, 'v1', threshold=0.25)['label'] == 1, 'threshold ескерілуі керек'\nfor _args in [(1.7, 1, 'v'), (0.5, 2, 'v'), (0.5, 1, ''), (-0.1, 0, 'v')]:\n    try:\n        PredictionOut(*_args)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f'PredictionOut{_args} ValueError лақтыруы керек')\ntry:\n    to_response(1.5, '1.0.0')\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Модель 1.5 қайтарса, шығыс схемасы ValueError беруі керек')"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ішкі схема",
   "prompt": "<p>Тапсырыстың ішінде тауарлар тізімі бар. <code>Item(name, price, qty=1)</code>: <code>price</code> мен <code>qty</code> <code>int</code>-ке түрлендіріледі, <code>price &gt;= 0</code>, <code>qty &gt;= 1</code>, әйтпесе <code>ValueError</code>. <code>Order(city, items)</code>: <code>__post_init__</code> ішінде <code>items</code> тізіміндегі әр сөздікті <code>Item(**d)</code>-ке айналдырады (қате болса жоғары кетеді); тауар жоқ болса <code>ValueError</code>. <code>Order.total()</code> — <code>price * qty</code> қосындысы.</p>",
   "starter": "from dataclasses import dataclass\n\n@dataclass\nclass Item:\n    name: str\n    price: int\n    qty: int = 1\n\n@dataclass\nclass Order:\n    city: str\n    items: list\n\n    def total(self):\n        return 0\n",
   "solution": "from dataclasses import dataclass\n\n@dataclass\nclass Item:\n    name: str\n    price: int\n    qty: int = 1\n\n    def __post_init__(self):\n        self.price = int(self.price)\n        self.qty = int(self.qty)\n        if self.price < 0:\n            raise ValueError('price: теріс болмауы керек')\n        if self.qty < 1:\n            raise ValueError('qty: кемінде 1')\n\n@dataclass\nclass Order:\n    city: str\n    items: list\n\n    def __post_init__(self):\n        if not self.items:\n            raise ValueError('items: кемінде бір тауар керек')\n        self.items = [Item(**d) for d in self.items]\n\n    def total(self):\n        return sum(i.price * i.qty for i in self.items)\n\norder = Order('Алматы', [{'name': 'Нан', 'price': '250', 'qty': 2}, {'name': 'Сүт', 'price': 1290}])\nprint(order, order.total())\n",
   "hints": [
    "<code>Order.__post_init__</code>: <code>self.items = [Item(**d) for d in self.items]</code> — сөздік кілттері өріс атауларына айналады.",
    "<code>total</code>: <code>sum(i.price * i.qty for i in self.items)</code>."
   ],
   "check": {
    "tests": "_o = Order('Алматы', [{'name': 'Нан', 'price': '250', 'qty': '2'}, {'name': 'Сүт', 'price': 1290}])\nassert all(isinstance(i, Item) for i in _o.items), 'items ішіндегі сөздіктер Item нысандарына айналуы керек'\nassert _o.items[0].price == 250 and _o.items[0].qty == 2 and _o.items[1].qty == 1, 'Item өрістері int-ке түрлендірілсін, qty әдепкі мәні 1'\nassert _o.total() == 1790, 'total() = 250*2 + 1290 = 1790'\nfor _items in [[], [{'name': 'Шай', 'price': -5}], [{'name': 'Шай', 'price': 500, 'qty': 0}], [{'name': 'Шай', 'price': 'тегін'}]]:\n    try:\n        Order('Астана', _items)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f'Order(\"Астана\", {_items}) ValueError лақтыруы керек')\ntry:\n    Order('Астана', [{'name': 'Шай', 'price': 500, 'color': 'жасыл'}])\nexcept TypeError:\n    pass\nelse:\n    raise AssertionError('Артық өріс TypeError беруі керек (Item(**d))')"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "FastAPI сияқты 422",
   "prompt": "<p>FastAPI қате болғанда барлық өрістің қатесін тізіммен қайтарады. <code>handle_flat(body)</code> жазыңыз. Ережелер: <code>area</code> — сан (int/float немесе санға айналатын мәтін) &gt; 0; <code>rooms</code> — бүтін сан (немесе бүтін санның мәтіні) 1–10; <code>price</code> — бүтін сан (немесе мәтіні) ≥ 0. Қате болса <code>(422, {'detail': [{'loc': өріс, 'msg': хабар}, ...]})</code> — барлық қате өріс ретімен (area, rooms, price). Сәтті болса <code>(200, {'area': ..., 'rooms': ..., 'price': ..., 'price_per_m2': round(price / area)})</code>.</p>",
   "starter": "def handle_flat(body):\n    area = float(body['area'])\n    return 200, {'area': area}\n",
   "solution": "RULES = [\n    ('area', float, lambda v: v > 0, '0-ден үлкен сан керек'),\n    ('rooms', int, lambda v: 1 <= v <= 10, '1 мен 10 аралығындағы бүтін сан керек'),\n    ('price', int, lambda v: v >= 0, 'теріс емес бүтін сан керек'),\n]\n\ndef handle_flat(body):\n    clean, detail = {}, []\n    for field, conv, ok, msg in RULES:\n        if field not in body:\n            detail.append({'loc': field, 'msg': 'міндетті өріс'})\n            continue\n        try:\n            value = conv(body[field])\n        except (TypeError, ValueError):\n            detail.append({'loc': field, 'msg': msg})\n            continue\n        if not ok(value):\n            detail.append({'loc': field, 'msg': msg})\n            continue\n        clean[field] = value\n    if detail:\n        return 422, {'detail': detail}\n    clean['price_per_m2'] = round(clean['price'] / clean['area'])\n    return 200, clean\n\nprint(handle_flat({'area': '54', 'rooms': '2', 'price': 37800000}))\nprint(handle_flat({'area': 0, 'rooms': 'көп'}))\n",
   "hints": [
    "Ережелерді тізімге салыңыз: <code>(өріс, түрлендіргіш, тексеру, хабар)</code>, сосын бір циклмен өтіңіз.",
    "Қате болса <code>detail.append({'loc': field, 'msg': ...})</code> және <code>continue</code>: тоқтамаңыз."
   ],
   "check": {
    "tests": "assert handle_flat({'area': '54', 'rooms': '2', 'price': 37800000}) == (200, {'area': 54.0, 'rooms': 2, 'price': 37800000, 'price_per_m2': 700000}), 'Дұрыс body → 200, мәндер түрлендірілген, price_per_m2 = 700000'\n_s, _d = handle_flat({'area': 0, 'rooms': 'көп'})\nassert _s == 422 and [x['loc'] for x in _d['detail']] == ['area', 'rooms', 'price'], f'Үш қате (area=0, rooms мәтін, price жоқ), ретімен. Сізде {_d}'\nassert all(isinstance(x.get('msg'), str) and x['msg'] for x in _d['detail']), 'Әр қатеде msg хабары болсын'\n_s, _d = handle_flat({'area': 40, 'rooms': 11, 'price': '-5'})\nassert _s == 422 and [x['loc'] for x in _d['detail']] == ['rooms', 'price'], 'rooms > 10 және теріс price'\nassert handle_flat({'area': 40, 'rooms': None, 'price': 1})[0] == 422, 'None мәні де қате (TypeError ұсталсын)'"
   }
  }
 ],
 "dep-5": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Порт сәйкестігі",
   "prompt": "<p><code>docker run -p 8080:8000</code> — хосттың 8080 порты container-дің 8000 портына жалғанады. <code>parse_port(mapping)</code> функциясын жазыңыз: <code>\"8080:8000\"</code> → <code>(8080, 8000)</code>, яғни <code>(хост порты, container порты)</code>, екеуі де <code>int</code>.</p>",
   "starter": "def parse_port(mapping):\n    return mapping\n",
   "solution": "def parse_port(mapping):\n    host, container = mapping.split(':')\n    return int(host), int(container)\n\nprint(parse_port('8080:8000'))\n",
   "hints": [
    "<code>host, container = mapping.split(':')</code>.",
    "Екеуін де <code>int()</code>-ке айналдырыңыз."
   ],
   "check": {
    "tests": "assert parse_port('8080:8000') == (8080, 8000), 'parse_port(\"8080:8000\") (8080, 8000) қайтаруы керек'\nassert parse_port('80:8000') == (80, 8000), 'Бірінші сан — хост порты'\nassert all(isinstance(x, int) for x in parse_port('5000:5000')), 'Екі сан да int болсын'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Dockerfile нұсқаулары",
   "prompt": "<p><code>instructions(dockerfile)</code> функциясын жазыңыз: Dockerfile мәтініндегі әр нұсқаудың атауын (жолдың бірінші сөзі, бас әріппен) ретімен тізім етіп қайтарсын. Бос жолдар мен <code>#</code>-пен басталатын түсініктемелер еленбейді.</p>",
   "starter": "dockerfile = \"\"\"\nFROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nEXPOSE 8000\nCMD [\"uvicorn\", \"main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]\n\"\"\"\n\ndef instructions(dockerfile):\n    return dockerfile.split()\n",
   "solution": "dockerfile = \"\"\"\nFROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nEXPOSE 8000\nCMD [\"uvicorn\", \"main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]\n\"\"\"\n\ndef instructions(dockerfile):\n    result = []\n    for line in dockerfile.splitlines():\n        line = line.strip()\n        if not line or line.startswith('#'):\n            continue\n        result.append(line.split()[0].upper())\n    return result\n\nprint(instructions(dockerfile))\n",
   "hints": [
    "Әр жолды <code>strip()</code> етіп, бос немесе <code>#</code>-пен басталса <code>continue</code>.",
    "Бірінші сөз: <code>line.split()[0].upper()</code>."
   ],
   "check": {
    "tests": "assert instructions(dockerfile) == ['FROM', 'WORKDIR', 'COPY', 'RUN', 'COPY', 'EXPOSE', 'CMD'], f'Нұсқаулар тізімі дұрыс емес: {instructions(dockerfile)}'\nassert instructions('# база\\nfrom python:3.12\\n\\n  run pip install x\\n') == ['FROM', 'RUN'], 'Түсініктеме мен бос жолдар еленбейді, атау бас әріппен'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Image тегі",
   "prompt": "<p><code>parse_image(ref)</code> функциясын жазыңыз: <code>\"churn-api:1.3.0\"</code> → <code>(\"churn-api\", \"1.3.0\")</code>. Тег жазылмаса, Docker <code>latest</code> деп есептейді: <code>\"churn-api\"</code> → <code>(\"churn-api\", \"latest\")</code>.</p>",
   "starter": "def parse_image(ref):\n    return tuple(ref.split(':'))\n",
   "solution": "def parse_image(ref):\n    if ':' in ref:\n        name, tag = ref.split(':')\n        return name, tag\n    return ref, 'latest'\n\nprint(parse_image('churn-api:1.3.0'), parse_image('churn-api'))\n",
   "hints": [
    "<code>if ':' in ref:</code> болса екіге бөліңіз.",
    "Әйтпесе <code>return ref, 'latest'</code>."
   ],
   "check": {
    "tests": "assert parse_image('churn-api:1.3.0') == ('churn-api', '1.3.0'), '\"churn-api:1.3.0\" → (\"churn-api\", \"1.3.0\")'\nassert parse_image('churn-api') == ('churn-api', 'latest'), 'Тег жоқ болса \"latest\"'\nassert parse_image('python:3.12-slim') == ('python', '3.12-slim'), '\"python:3.12-slim\" → (\"python\", \"3.12-slim\")'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "docker run командасы",
   "prompt": "<p><code>run_command(image, host_port, container_port=8000, env=None)</code> функциясын жазыңыз: <code>docker run</code> командасының мәтінін қайтарсын: <code>docker run -p ХОСТ:CONTAINER</code>, сосын <code>env</code> сөздігіндегі әр айнымалы үшін <code>-e КІЛТ=МӘН</code> (кілттер алфавит ретімен), соңында image. Мысалы, <code>run_command(\"churn-api:1.3.0\", 8080, env={\"THRESHOLD\": \"0.35\"})</code> → <code>\"docker run -p 8080:8000 -e THRESHOLD=0.35 churn-api:1.3.0\"</code>.</p>",
   "starter": "def run_command(image, host_port, container_port=8000, env=None):\n    return f'docker run {image}'\n",
   "solution": "def run_command(image, host_port, container_port=8000, env=None):\n    parts = ['docker', 'run', '-p', f'{host_port}:{container_port}']\n    for key in sorted(env or {}):\n        parts += ['-e', f'{key}={env[key]}']\n    parts.append(image)\n    return ' '.join(parts)\n\nprint(run_command('churn-api:1.3.0', 8080, env={'THRESHOLD': '0.35', 'DEBUG': 'false'}))\n",
   "hints": [
    "Бөліктерді тізімге жинап, соңында <code>' '.join(parts)</code>.",
    "<code>env</code> <code>None</code> болуы мүмкін: <code>sorted(env or {})</code>."
   ],
   "check": {
    "tests": "assert run_command('churn-api:1.3.0', 8080) == 'docker run -p 8080:8000 churn-api:1.3.0', 'env жоқ болса тек -p және image'\nassert run_command('churn-api:1.3.0', 8080, env={'THRESHOLD': '0.35'}) == 'docker run -p 8080:8000 -e THRESHOLD=0.35 churn-api:1.3.0', '-e THRESHOLD=0.35 қосылуы керек'\nassert run_command('api:2', 80, 5000, {'PORT': '5000', 'DEBUG': 'false'}) == 'docker run -p 80:5000 -e DEBUG=false -e PORT=5000 api:2', 'Айнымалылар алфавит ретімен, container_port ескерілсін'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Dockerfile мәселелері",
   "prompt": "<p><code>check_dockerfile(text)</code> жазыңыз: мәселелер тізімін қайтарсын (осы ретпен): <code>EXPOSE</code> нұсқауы жоқ болса <code>'no_expose'</code>; соңғы нұсқау <code>CMD</code> емес болса <code>'cmd_not_last'</code>; <code>CMD</code> жолында <code>0.0.0.0</code> жоқ болса <code>'bad_host'</code> (CMD мүлде жоқ болса да); <code>COPY . .</code> <code>pip install</code> жолынан бұрын тұрса <code>'bad_cache'</code>. Бос жолдар мен түсініктемелер еленбейді.</p>",
   "starter": "dockerfile = \"\"\"\nFROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nEXPOSE 8000\nCMD [\"uvicorn\", \"main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]\n\"\"\"\n\ndef check_dockerfile(text):\n    return []\n",
   "solution": "dockerfile = \"\"\"\nFROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nEXPOSE 8000\nCMD [\"uvicorn\", \"main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]\n\"\"\"\n\ndef check_dockerfile(text):\n    lines = [l.strip() for l in text.splitlines() if l.strip() and not l.strip().startswith('#')]\n    names = [l.split()[0].upper() for l in lines]\n    problems = []\n    if 'EXPOSE' not in names:\n        problems.append('no_expose')\n    if not names or names[-1] != 'CMD':\n        problems.append('cmd_not_last')\n    cmd = [l for l in lines if l.split()[0].upper() == 'CMD']\n    if not cmd or '0.0.0.0' not in cmd[-1]:\n        problems.append('bad_host')\n    copy_all = next((i for i, l in enumerate(lines) if l.split() == ['COPY', '.', '.']), None)\n    pip = next((i for i, l in enumerate(lines) if 'pip install' in l), None)\n    if copy_all is not None and pip is not None and copy_all < pip:\n        problems.append('bad_cache')\n    return problems\n\nprint(check_dockerfile(dockerfile))\n",
   "hints": [
    "Алдымен түсініктемесіз жолдар мен олардың нұсқау атауларының тізімін жасаңыз.",
    "Жолдың индексі: <code>next((i for i, l in enumerate(lines) if ...), None)</code>."
   ],
   "check": {
    "tests": "assert check_dockerfile(dockerfile) == [], 'Дұрыс Dockerfile-да мәселе жоқ'\n_bad = \"\"\"FROM python:3.12-slim\nWORKDIR /app\nCOPY . .\nRUN pip install -r requirements.txt\nCMD [\"uvicorn\", \"main:app\", \"--host\", \"127.0.0.1\"]\n\"\"\"\nassert check_dockerfile(_bad) == ['no_expose', 'bad_host', 'bad_cache'], f'Күтілгені no_expose, bad_host, bad_cache. Сізде {check_dockerfile(_bad)}'\n_bad2 = \"\"\"FROM python:3.12-slim\n# порт\nCMD [\"uvicorn\", \"main:app\", \"--host\", \"0.0.0.0\"]\nEXPOSE 8000\n\"\"\"\nassert check_dockerfile(_bad2) == ['cmd_not_last'], 'CMD соңғы емес'\nassert check_dockerfile('FROM python:3.12\\nEXPOSE 8000\\n') == ['cmd_not_last', 'bad_host'], 'CMD мүлде жоқ: cmd_not_last және bad_host'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қай қабат қайта құрылады",
   "prompt": "<p>Docker әр нұсқауды layer ретінде кэштейді. <code>first_rebuilt(lines, changed)</code> жазыңыз: <code>lines</code> — Dockerfile нұсқаулары (тізім), <code>changed</code> — өзгерген файлдар жиыны. Бірінші <code>COPY</code> жолының индексін қайтарсын, оның көзі өзгерген файлды қамтиды: <code>COPY . .</code> кез келген файлды қамтиды, <code>COPY requirements.txt .</code> — тек <code>requirements.txt</code>-ті. Ондай жол жоқ болса <code>None</code> (бәрі кэштен алынады).</p>",
   "starter": "lines = [\n    'FROM python:3.12-slim',\n    'WORKDIR /app',\n    'COPY requirements.txt .',\n    'RUN pip install --no-cache-dir -r requirements.txt',\n    'COPY . .',\n    'CMD [\"uvicorn\", \"main:app\", \"--host\", \"0.0.0.0\"]',\n]\n\ndef first_rebuilt(lines, changed):\n    return 0\n",
   "solution": "lines = [\n    'FROM python:3.12-slim',\n    'WORKDIR /app',\n    'COPY requirements.txt .',\n    'RUN pip install --no-cache-dir -r requirements.txt',\n    'COPY . .',\n    'CMD [\"uvicorn\", \"main:app\", \"--host\", \"0.0.0.0\"]',\n]\n\ndef first_rebuilt(lines, changed):\n    for i, line in enumerate(lines):\n        parts = line.split()\n        if parts[0].upper() != 'COPY':\n            continue\n        source = parts[1]\n        if source == '.' and changed:\n            return i\n        if source in changed:\n            return i\n    return None\n\nprint(first_rebuilt(lines, {'main.py'}), first_rebuilt(lines, {'requirements.txt'}))\n",
   "hints": [
    "COPY жолының көзі — екінші сөз: <code>line.split()[1]</code>.",
    "<code>'.'</code> болса кез келген өзгеріс жеткілікті; әйтпесе <code>source in changed</code>."
   ],
   "check": {
    "tests": "assert first_rebuilt(lines, {'main.py'}) == 4, 'Тек код өзгерсе, COPY . . (4-жол) қайта құрылады, pip install кэштен'\nassert first_rebuilt(lines, {'requirements.txt'}) == 2, 'requirements.txt өзгерсе, 2-жолдан бастап қайта құрылады'\nassert first_rebuilt(lines, set()) is None, 'Ештеңе өзгермесе None'\n_bad = ['FROM python:3.12-slim', 'COPY . .', 'RUN pip install -r requirements.txt']\nassert first_rebuilt(_bad, {'main.py'}) == 1, 'COPY . . бірінші тұрса, кез келген өзгерісте pip install қайта жүреді'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Кэш картасы",
   "prompt": "<p><code>cache_plan(lines, changed)</code> жазыңыз: әр нұсқау үшін <code>'cached'</code> немесе <code>'rebuild'</code> тізімін қайтарсын. Ереже: бір қабат қайта құрылса, одан кейінгі <b>барлық</b> қабат қайта құрылады. <code>COPY</code> жолы өзі көзі өзгерген файлды қамтыса (<code>.</code> — кез келген файл, әйтпесе көздер тізімі: <code>COPY a.py b.py ./</code>, соңғы сөз — мақсат) қайта құрылады. Басқа нұсқаулар тек алдыңғы қабат қайта құрылса ғана. Сосын <code>rebuilt_count</code> — <code>lines</code> үшін <code>{'main.py'}</code> өзгергенде қайта құрылатын қабаттар саны.</p>",
   "starter": "lines = [\n    'FROM python:3.12-slim',\n    'WORKDIR /app',\n    'COPY requirements.txt .',\n    'RUN pip install --no-cache-dir -r requirements.txt',\n    'COPY model.joblib config.py ./',\n    'COPY . .',\n    'EXPOSE 8000',\n    'CMD [\"uvicorn\", \"main:app\", \"--host\", \"0.0.0.0\"]',\n]\n\ndef cache_plan(lines, changed):\n    return ['cached'] * len(lines)\n\nrebuilt_count = None\n",
   "solution": "lines = [\n    'FROM python:3.12-slim',\n    'WORKDIR /app',\n    'COPY requirements.txt .',\n    'RUN pip install --no-cache-dir -r requirements.txt',\n    'COPY model.joblib config.py ./',\n    'COPY . .',\n    'EXPOSE 8000',\n    'CMD [\"uvicorn\", \"main:app\", \"--host\", \"0.0.0.0\"]',\n]\n\ndef copy_touches(line, changed):\n    parts = line.split()\n    sources = parts[1:-1]\n    if '.' in sources:\n        return bool(changed)\n    return any(s in changed for s in sources)\n\ndef cache_plan(lines, changed):\n    plan = []\n    broken = False\n    for line in lines:\n        if not broken and line.split()[0].upper() == 'COPY' and copy_touches(line, changed):\n            broken = True\n        plan.append('rebuild' if broken else 'cached')\n    return plan\n\nrebuilt_count = cache_plan(lines, {'main.py'}).count('rebuild')\nprint(cache_plan(lines, {'config.py'}), rebuilt_count)\n",
   "hints": [
    "Кэш «бұзылғанын» белгілейтін айнымалы ұстаңыз: <code>broken = True</code> болғаннан кейін бәрі <code>rebuild</code>.",
    "COPY көздері: <code>line.split()[1:-1]</code> (бірінші — COPY, соңғысы — мақсат)."
   ],
   "check": {
    "tests": "assert cache_plan(lines, {'main.py'}) == ['cached'] * 5 + ['rebuild'] * 3, 'main.py өзгерсе тек COPY . . және одан кейінгілер қайта құрылады'\nassert cache_plan(lines, {'config.py'}) == ['cached'] * 4 + ['rebuild'] * 4, 'config.py 4-жолдағы COPY-да бар'\nassert cache_plan(lines, {'requirements.txt'}) == ['cached'] * 2 + ['rebuild'] * 6, 'requirements.txt өзгерсе pip install да қайта жүреді'\nassert cache_plan(lines, set()) == ['cached'] * 8, 'Өзгеріс жоқ — бәрі кэштен'\nassert rebuilt_count == 3, f'rebuilt_count = 3 болуы керек, сізде {rebuilt_count}'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Dockerfile генераторы",
   "prompt": "<p><code>make_dockerfile(python='3.12', port=8000, app='main:app')</code> жазыңыз: дұрыс Dockerfile мәтінін қайтарсын: <code>FROM python:&lt;python&gt;-slim</code>, <code>WORKDIR /app</code>, <code>COPY requirements.txt .</code>, <code>RUN pip install --no-cache-dir -r requirements.txt</code>, <code>COPY . .</code>, <code>EXPOSE &lt;port&gt;</code>, соңында <code>CMD</code> uvicorn-ды <code>&lt;app&gt;</code> үшін <code>0.0.0.0</code> хостында <code>&lt;port&gt;</code> портта JSON түрінде іске қосады (<code>CMD [\"uvicorn\", \"main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]</code>). Әр жол <code>\\n</code>-мен аяқталсын.</p>",
   "starter": "def make_dockerfile(python='3.12', port=8000, app='main:app'):\n    return 'FROM python\\n'\n",
   "solution": "import json\n\ndef make_dockerfile(python='3.12', port=8000, app='main:app'):\n    cmd = json.dumps(['uvicorn', app, '--host', '0.0.0.0', '--port', str(port)])\n    lines = [\n        f'FROM python:{python}-slim',\n        'WORKDIR /app',\n        'COPY requirements.txt .',\n        'RUN pip install --no-cache-dir -r requirements.txt',\n        'COPY . .',\n        f'EXPOSE {port}',\n        f'CMD {cmd}',\n    ]\n    return ''.join(l + '\\n' for l in lines)\n\nprint(make_dockerfile())\n",
   "hints": [
    "Жолдарды тізімге жинап, f-string арқылы параметрлерді қойыңыз.",
    "CMD-дің JSON тізімін <code>json.dumps([...])</code> жасайды: екі тырнақшамен."
   ],
   "check": {
    "tests": "import json as _j\n_d = make_dockerfile()\nassert _d.endswith('\\n'), 'Әр жол \\\\n-мен аяқталсын'\n_L = _d.strip().splitlines()\nassert _L[0] == 'FROM python:3.12-slim', 'Бірінші жол: FROM python:3.12-slim'\nassert _L[1:5] == ['WORKDIR /app', 'COPY requirements.txt .', 'RUN pip install --no-cache-dir -r requirements.txt', 'COPY . .'], 'Рет: WORKDIR → COPY requirements.txt → RUN pip install → COPY . .'\nassert _L[5] == 'EXPOSE 8000', 'EXPOSE 8000'\nassert _L[6].startswith('CMD ') and _j.loads(_L[6][4:]) == ['uvicorn', 'main:app', '--host', '0.0.0.0', '--port', '8000'], 'CMD JSON тізімі дұрыс емес'\n_L2 = make_dockerfile('3.11', 10000, 'api:app').strip().splitlines()\nassert _L2[0] == 'FROM python:3.11-slim' and _L2[5] == 'EXPOSE 10000', 'python және port параметрлері ескерілсін'\nassert _j.loads(_L2[6][4:]) == ['uvicorn', 'api:app', '--host', '0.0.0.0', '--port', '10000'], 'CMD-де app пен port параметрлері'"
   }
  }
 ],
 "dep-6": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Мәтінді bool-ға",
   "prompt": "<p>Environment variable әрқашан мәтін, ал <code>bool('false')</code> → <code>True</code>! <code>parse_bool(text)</code> функциясын жазыңыз: <code>'1'</code>, <code>'true'</code>, <code>'yes'</code> (кез келген регистр, шеттегі бос орындар еленбейді) → <code>True</code>, қалғаны және <code>None</code> → <code>False</code>.</p>",
   "starter": "def parse_bool(text):\n    return bool(text)\n",
   "solution": "def parse_bool(text):\n    if text is None:\n        return False\n    return text.strip().lower() in ('1', 'true', 'yes')\n\nprint(parse_bool('TRUE'), parse_bool('false'))\n",
   "hints": [
    "<code>text.strip().lower() in ('1', 'true', 'yes')</code>.",
    "<code>None</code>-ды бөлек тексеріңіз: оның <code>.strip()</code> әдісі жоқ."
   ],
   "check": {
    "tests": "assert parse_bool('TRUE') is True and parse_bool(' yes ') is True and parse_bool('1') is True, 'TRUE, yes, 1 → True'\nassert parse_bool('false') is False and parse_bool('0') is False and parse_bool('') is False, 'false, 0, бос мәтін → False'\nassert parse_bool(None) is False, 'None → False'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Әдепкі мәнмен оқу",
   "prompt": "<p><code>get_int(env, key, default)</code> функциясын жазыңыз: <code>env</code> (мәндері мәтін болатын сөздік) ішінен <code>key</code>-ті оқып, <code>int</code>-ке айналдырсын; кілт жоқ болса <code>default</code>-ты қайтарсын. Мысалы, <code>get_int({'PORT': '10000'}, 'PORT', 8000)</code> → <code>10000</code>.</p>",
   "starter": "def get_int(env, key, default):\n    return env.get(key, default)\n",
   "solution": "def get_int(env, key, default):\n    if key not in env:\n        return default\n    return int(env[key])\n\nprint(get_int({'PORT': '10000'}, 'PORT', 8000), get_int({}, 'WORKERS', 2))\n",
   "hints": [
    "Кілт жоқ болса <code>return default</code>.",
    "Бар болса мәтінді <code>int(env[key])</code> етіп айналдырыңыз."
   ],
   "check": {
    "tests": "assert get_int({'PORT': '10000'}, 'PORT', 8000) == 10000, 'get_int({\"PORT\": \"10000\"}, \"PORT\", 8000) 10000 (int) қайтаруы керек'\nassert isinstance(get_int({'PORT': '10000'}, 'PORT', 8000), int), 'Мәтінді int-ке айналдырыңыз'\nassert get_int({}, 'WORKERS', 2) == 2, 'Кілт жоқ болса default'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": ".env жолын талдау",
   "prompt": "<p><code>parse_env_line(line)</code> функциясын жазыңыз: <code>\"DB_HOST=localhost\"</code> → <code>(\"DB_HOST\", \"localhost\")</code>. Тек <b>бірінші</b> <code>=</code> бойынша бөліңіз (мәннің ішінде де <code>=</code> болуы мүмкін: <code>\"DB_URL=postgres://u:p@h/db?ssl=true\"</code>), кілт пен мәннің шетіндегі бос орындарды алып тастаңыз.</p>",
   "starter": "def parse_env_line(line):\n    key, value = line.split('=')\n    return key, value\n",
   "solution": "def parse_env_line(line):\n    key, _, value = line.partition('=')\n    return key.strip(), value.strip()\n\nprint(parse_env_line('DB_URL=postgres://u:p@h/db?ssl=true'))\n",
   "hints": [
    "<code>line.partition('=')</code> тек бірінші <code>=</code> бойынша үшке бөледі.",
    "Немесе <code>line.split('=', 1)</code>."
   ],
   "check": {
    "tests": "assert parse_env_line('DB_HOST=localhost') == ('DB_HOST', 'localhost'), '\"DB_HOST=localhost\" → (\"DB_HOST\", \"localhost\")'\nassert parse_env_line('DB_URL=postgres://u:p@h/db?ssl=true') == ('DB_URL', 'postgres://u:p@h/db?ssl=true'), 'Тек бірінші = бойынша бөліңіз'\nassert parse_env_line(' PORT = 8000 ') == ('PORT', '8000'), 'Шеттегі бос орындарды алып тастаңыз'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": ".env файлын оқу",
   "prompt": "<p>python-dotenv сияқты <code>parse_env(text)</code> жазыңыз: <code>.env</code> мәтінінен сөздік қайтарсын. Бос жолдар мен <code>#</code>-пен басталатын түсініктемелер еленбейді; кілт пен мән бірінші <code>=</code> бойынша бөлінеді; мән тырнақшада (<code>\"...\"</code> немесе <code>'...'</code>) болса, тырнақшалар алынады.</p>",
   "starter": "env_text = \"\"\"# локал баптаулар\nMODEL_PATH=models/churn_v1.2.0.joblib\nTHRESHOLD = 0.35\n\nDB_PASSWORD=\"s3cr3t==\"\nGREETING='Сәлем, әлем'\n\"\"\"\n\ndef parse_env(text):\n    return {}\n",
   "solution": "env_text = \"\"\"# локал баптаулар\nMODEL_PATH=models/churn_v1.2.0.joblib\nTHRESHOLD = 0.35\n\nDB_PASSWORD=\"s3cr3t==\"\nGREETING='Сәлем, әлем'\n\"\"\"\n\ndef parse_env(text):\n    result = {}\n    for line in text.splitlines():\n        line = line.strip()\n        if not line or line.startswith('#'):\n            continue\n        key, _, value = line.partition('=')\n        value = value.strip()\n        if len(value) >= 2 and value[0] == value[-1] and value[0] in '\"\\'':\n            value = value[1:-1]\n        result[key.strip()] = value\n    return result\n\nprint(parse_env(env_text))\n",
   "hints": [
    "Әр жолды <code>strip()</code> етіп, бос немесе <code>#</code>-пен басталса өткізіңіз; <code>partition('=')</code> арқылы бөліңіз.",
    "Тырнақша: <code>value[0] == value[-1] and value[0] in '\"\\''</code> болса <code>value[1:-1]</code>."
   ],
   "check": {
    "tests": "_e = parse_env(env_text)\nassert _e == {'MODEL_PATH': 'models/churn_v1.2.0.joblib', 'THRESHOLD': '0.35', 'DB_PASSWORD': 's3cr3t==', 'GREETING': 'Сәлем, әлем'}, f'Нәтиже дұрыс емес: {_e}'\nassert parse_env('# тек түсініктеме\\n\\n') == {}, 'Түсініктемелер мен бос жолдар еленбейді'\nassert parse_env('EMPTY=\\n') == {'EMPTY': ''}, 'Бос мән — бос мәтін'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Міндетті айнымалылар",
   "prompt": "<p>Сервер міндетті айнымалысы жоқ болса, бірден түсінікті қатемен тоқтауы керек. <code>require(env, names)</code> жазыңыз: <code>names</code> ішіндегі жоқ немесе бос (<code>\"\"</code>) айнымалылардың <b>бәрін</b> бір хабарда атап <code>RuntimeError</code> лақтырсын (хабарда әр атау болсын); бәрі бар болса, тек сол айнымалылардан тұратын сөздік қайтарсын.</p>",
   "starter": "def require(env, names):\n    return {n: env[n] for n in names}\n",
   "solution": "def require(env, names):\n    missing = [n for n in names if not env.get(n)]\n    if missing:\n        raise RuntimeError('Міндетті айнымалылар жоқ: ' + ', '.join(missing))\n    return {n: env[n] for n in names}\n\nprint(require({'MODEL_PATH': 'm.joblib', 'PORT': '8000', 'HOME': '/root'}, ['MODEL_PATH', 'PORT']))\n",
   "hints": [
    "Алдымен жоқтарын жинаңыз: <code>[n for n in names if not env.get(n)]</code>.",
    "Хабарға бәрін қосыңыз: <code>', '.join(missing)</code>."
   ],
   "check": {
    "tests": "assert require({'MODEL_PATH': 'm.joblib', 'PORT': '8000', 'HOME': '/root'}, ['MODEL_PATH', 'PORT']) == {'MODEL_PATH': 'm.joblib', 'PORT': '8000'}, 'Тек сұралған айнымалылар қайтарылсын'\ntry:\n    require({'PORT': '8000', 'DB_URL': ''}, ['MODEL_PATH', 'PORT', 'DB_URL'])\nexcept RuntimeError as _e:\n    assert 'MODEL_PATH' in str(_e) and 'DB_URL' in str(_e), 'Хабарда барлық жоқ айнымалы аталсын (бос мән де жоқ деп саналады)'\n    assert 'PORT' not in str(_e).replace('MODEL_PATH', ''), 'Бар айнымалы хабарда аталмасын'\nelse:\n    raise AssertionError('Айнымалы жоқ болса RuntimeError күтілді')\nassert require({}, []) == {}, 'Ештеңе сұралмаса бос сөздік'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Кодтағы құпиялар",
   "prompt": "<p>Code review кезінде кодқа жазылған құпияларды іздейміз. <code>find_secrets(code)</code> жазыңыз: <code>АТАУ = '...'</code> немесе <code>АТАУ = \"...\"</code> түріндегі жолдардың нөмірлерін (1-ден бастап) қайтарсын, мұндағы атауда (регистрге қарамай) <code>KEY</code>, <code>SECRET</code>, <code>PASSWORD</code> немесе <code>TOKEN</code> бар және мәні тырнақшадағы мәтін. <code>os.environ</code> немесе <code>os.getenv</code> арқылы оқу — дұрыс, ол құпия емес.</p>",
   "starter": "code = \"\"\"import os\nAPI_KEY = 'sk-live-123'\nDB_PASSWORD = os.environ['DB_PASSWORD']\nPORT = '8000'\ntelegram_token = \"7000:AAH\"\nSECRET_SALT = os.getenv('SECRET_SALT')\n\"\"\"\n\ndef find_secrets(code):\n    return []\n",
   "solution": "code = \"\"\"import os\nAPI_KEY = 'sk-live-123'\nDB_PASSWORD = os.environ['DB_PASSWORD']\nPORT = '8000'\ntelegram_token = \"7000:AAH\"\nSECRET_SALT = os.getenv('SECRET_SALT')\n\"\"\"\n\nMARKERS = ('KEY', 'SECRET', 'PASSWORD', 'TOKEN')\n\ndef find_secrets(code):\n    found = []\n    for n, line in enumerate(code.splitlines(), start=1):\n        if '=' not in line:\n            continue\n        name, _, value = line.partition('=')\n        value = value.strip()\n        if any(m in name.upper() for m in MARKERS) and value[:1] in ('\"', \"'\"):\n            found.append(n)\n    return found\n\nprint(find_secrets(code))\n",
   "hints": [
    "Жолдарды нөмірімен: <code>for n, line in enumerate(code.splitlines(), start=1):</code>.",
    "Мән тырнақшадан басталса — мәтін литералы: <code>value.strip()[:1] in ('\"', \"'\")</code>."
   ],
   "check": {
    "tests": "assert find_secrets(code) == [2, 5], f'Құпиялар 2 және 5-жолдарда, сізде {find_secrets(code)}'\nassert find_secrets(\"x = 1\\nAUTH_TOKEN = 'abc'\\n\") == [2], 'AUTH_TOKEN = \"abc\" — құпия'\nassert find_secrets(\"API_KEY = os.environ['API_KEY']\\n\") == [], 'os.environ арқылы оқу — құпия емес'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Орта бойынша config",
   "prompt": "<p><code>load_settings(env)</code> жазыңыз. <code>APP_ENV</code> — <code>dev</code>, <code>staging</code> немесе <code>production</code> (әдепкі <code>dev</code>), басқа мән → <code>RuntimeError</code>. Қайтаратыны: <code>{'env', 'debug', 'log_level', 'port', 'db_url'}</code>. <code>DEBUG</code> берілмесе: dev-те <code>True</code>, басқасында <code>False</code> (берілсе 1/true/yes → True). <code>LOG_LEVEL</code> берілмесе: dev-те <code>'DEBUG'</code>, басқасында <code>'INFO'</code> (бас әріпке айналдырыңыз). <code>PORT</code> → int, әдепкі 8000. <code>DB_URL</code> production-да міндетті (жоқ болса хабарында DB_URL бар <code>RuntimeError</code>), басқа ортада әдепкі <code>'sqlite:///dev.db'</code>. Production-да <code>debug</code> True болса да <code>RuntimeError</code>.</p>",
   "starter": "def load_settings(env):\n    return {'env': env.get('APP_ENV', 'dev')}\n",
   "solution": "ENVS = ('dev', 'staging', 'production')\n\ndef parse_bool(text):\n    return text.strip().lower() in ('1', 'true', 'yes')\n\ndef load_settings(env):\n    app_env = env.get('APP_ENV', 'dev')\n    if app_env not in ENVS:\n        raise RuntimeError(f'APP_ENV белгісіз: {app_env}')\n    is_dev = app_env == 'dev'\n    debug = parse_bool(env['DEBUG']) if 'DEBUG' in env else is_dev\n    log_level = env.get('LOG_LEVEL', 'DEBUG' if is_dev else 'INFO').upper()\n    if app_env == 'production':\n        if not env.get('DB_URL'):\n            raise RuntimeError('production-да DB_URL міндетті')\n        if debug:\n            raise RuntimeError('production-да DEBUG қосуға болмайды')\n    return {\n        'env': app_env,\n        'debug': debug,\n        'log_level': log_level,\n        'port': int(env.get('PORT', '8000')),\n        'db_url': env.get('DB_URL', 'sqlite:///dev.db'),\n    }\n\nprint(load_settings({}))\nprint(load_settings({'APP_ENV': 'production', 'DB_URL': 'postgres://db/churn'}))\n",
   "hints": [
    "Әдепкі мәндер ортаға тәуелді: <code>is_dev = app_env == 'dev'</code>, сосын <code>debug = ... if 'DEBUG' in env else is_dev</code>.",
    "Production тексерістерін соңында жасаңыз: DB_URL жоқ па, debug қосулы ма."
   ],
   "check": {
    "tests": "assert load_settings({}) == {'env': 'dev', 'debug': True, 'log_level': 'DEBUG', 'port': 8000, 'db_url': 'sqlite:///dev.db'}, f'dev әдепкі мәндері дұрыс емес: {load_settings({})}'\nassert load_settings({'APP_ENV': 'staging', 'PORT': '9000'}) == {'env': 'staging', 'debug': False, 'log_level': 'INFO', 'port': 9000, 'db_url': 'sqlite:///dev.db'}, 'staging: debug False, log_level INFO, PORT int'\n_p = load_settings({'APP_ENV': 'production', 'DB_URL': 'postgres://db/churn', 'LOG_LEVEL': 'warning'})\nassert _p['debug'] is False and _p['log_level'] == 'WARNING' and _p['db_url'] == 'postgres://db/churn', 'production: LOG_LEVEL бас әріппен, DB_URL сақталады'\nassert load_settings({'DEBUG': 'false'})['debug'] is False, 'DEBUG берілсе, сол мән қолданылады'\nfor _env, _w in [({'APP_ENV': 'prod'}, 'APP_ENV'), ({'APP_ENV': 'production'}, 'DB_URL'), ({'APP_ENV': 'production', 'DB_URL': 'x', 'DEBUG': 'true'}, 'DEBUG')]:\n    try:\n        load_settings(_env)\n    except RuntimeError as _e:\n        assert _w in str(_e), f'{_env}: хабарда {_w} аталсын'\n    else:\n        raise AssertionError(f'{_env} үшін RuntimeError күтілді')"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": ".env.example жасау",
   "prompt": "<p>Репозиторийге құпиясыз үлгі <code>.env.example</code> салынады. <code>make_example(env_text)</code> жазыңыз: <code>.env</code> мәтінінен үлгі мәтінін жасасын. Түсініктемелер мен бос жолдар сол күйінде сақталады; әр <code>КІЛТ=МӘН</code> жолында кілтінде (регистрге қарамай) <code>KEY</code>, <code>SECRET</code>, <code>PASSWORD</code> немесе <code>TOKEN</code> бар болса <code>КІЛТ=</code> (мәнсіз) жазылады, әйтпесе жол өзгермейді. Жолдардың реті сақталып, әрқайсысы <code>\\n</code>-мен аяқталсын.</p>",
   "starter": "env_text = \"\"\"# Churn API\nMODEL_PATH=models/churn_v1.2.0.joblib\nDB_PASSWORD=s3cr3t\n\nopenai_api_key=sk-abc123\nTHRESHOLD=0.35\n\"\"\"\n\ndef make_example(env_text):\n    return env_text\n",
   "solution": "env_text = \"\"\"# Churn API\nMODEL_PATH=models/churn_v1.2.0.joblib\nDB_PASSWORD=s3cr3t\n\nopenai_api_key=sk-abc123\nTHRESHOLD=0.35\n\"\"\"\n\nMARKERS = ('KEY', 'SECRET', 'PASSWORD', 'TOKEN')\n\ndef make_example(env_text):\n    out = []\n    for line in env_text.splitlines():\n        s = line.strip()\n        if s and not s.startswith('#') and '=' in s:\n            key = s.partition('=')[0].strip()\n            if any(m in key.upper() for m in MARKERS):\n                line = key + '='\n        out.append(line)\n    return ''.join(l + '\\n' for l in out)\n\nprint(make_example(env_text))\n",
   "hints": [
    "Әр жолды қарап, тек <code>КІЛТ=МӘН</code> жолдарын өзгертіңіз; түсініктеме мен бос жолды сол күйінде қосыңыз.",
    "Кілт: <code>line.partition('=')[0].strip()</code>; құпия болса <code>key + '='</code>."
   ],
   "check": {
    "tests": "_x = make_example(env_text)\nassert _x == '# Churn API\\nMODEL_PATH=models/churn_v1.2.0.joblib\\nDB_PASSWORD=\\n\\nopenai_api_key=\\nTHRESHOLD=0.35\\n', f'Нәтиже дұрыс емес:\\n{_x}'\nassert 's3cr3t' not in _x and 'sk-abc123' not in _x, 'Құпия мәндер үлгіде болмауы керек'\nassert make_example('GITHUB_TOKEN=ghp_x\\n# PASSWORD=ескі\\n') == 'GITHUB_TOKEN=\\n# PASSWORD=ескі\\n', 'Түсініктеме өзгермейді, TOKEN жасырылады'"
   }
  }
 ],
 "dep-7": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Uptime пайызы",
   "prompt": "<p>Платформа әр минут сайын <code>/health</code>-ке сұрау жіберіп, статус кодтарын <code>checks</code> тізіміне жазды. <code>uptime(checks)</code> функциясын жазыңыз: 200 болған тексерістердің пайызын 2 таңбаға дөңгелектеп қайтарсын. Тізім бос болса <code>100.0</code>.</p>",
   "starter": "def uptime(checks):\n    return 100.0\n",
   "solution": "def uptime(checks):\n    if not checks:\n        return 100.0\n    ok = sum(1 for s in checks if s == 200)\n    return round(ok / len(checks) * 100, 2)\n\nprint(uptime([200, 200, 503, 200]))\n",
   "hints": [
    "<code>sum(1 for s in checks if s == 200)</code> — сәтті тексерістер саны.",
    "Пайыз: <code>ok / len(checks) * 100</code>, сосын <code>round(..., 2)</code>."
   ],
   "check": {
    "tests": "assert uptime([200, 200, 503, 200]) == 75.0, 'uptime([200, 200, 503, 200]) 75.0 қайтаруы керек'\nassert uptime([200] * 2 + [500]) == 66.67, 'Нәтижені 2 таңбаға дөңгелектеңіз'\nassert uptime([]) == 100.0, 'Бос тізім үшін 100.0'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Cold start",
   "prompt": "<p>Render-дің тегін сервисі бос тұрса «ұйықтайды». <code>is_sleeping(last_request, now, idle_limit=900)</code> функциясын жазыңыз (уақыт секундпен): соңғы сұраудан бері <code>idle_limit</code> немесе одан көп уақыт өтсе <code>True</code> — келесі сұрау cold start-ты күтеді.</p>",
   "starter": "def is_sleeping(last_request, now, idle_limit=900):\n    return False\n",
   "solution": "def is_sleeping(last_request, now, idle_limit=900):\n    return now - last_request >= idle_limit\n\nprint(is_sleeping(1000, 1800), is_sleeping(1000, 1900))\n",
   "hints": [
    "Өткен уақыт: <code>now - last_request</code>.",
    "Шарт: <code>&gt;= idle_limit</code>."
   ],
   "check": {
    "tests": "assert is_sleeping(1000, 1800) is False, '800 с өтті: әлі ұйықтамайды'\nassert is_sleeping(1000, 1900) is True, 'Дәл 900 с өтті: ұйықтайды'\nassert is_sleeping(0, 100, idle_limit=60) is True, 'idle_limit параметрі ескерілсін'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Readiness: модель және база",
   "prompt": "<p><code>readiness(state)</code> функциясын жазыңыз: сервис модель жүктелгенде (<code>state['model']</code> <code>None</code> емес) <b>және</b> дерекқорға қосылғанда (<code>state['db_ok']</code> True) дайын. Дайын болса <code>(200, {'status': 'ready'})</code>, әйтпесе <code>(503, {'status': 'not ready', 'missing': [...]})</code>, мұндағы <code>missing</code> — <code>'model'</code> және/немесе <code>'db'</code> (осы ретпен).</p>",
   "starter": "def readiness(state):\n    return 200, {'status': 'ready'}\n",
   "solution": "def readiness(state):\n    missing = []\n    if state['model'] is None:\n        missing.append('model')\n    if not state['db_ok']:\n        missing.append('db')\n    if missing:\n        return 503, {'status': 'not ready', 'missing': missing}\n    return 200, {'status': 'ready'}\n\nprint(readiness({'model': None, 'db_ok': True}))\n",
   "hints": [
    "Жетіспейтіндерді тізімге жинаңыз: <code>if state['model'] is None: missing.append('model')</code>.",
    "Тізім бос болмаса — 503."
   ],
   "check": {
    "tests": "assert readiness({'model': 'm', 'db_ok': True}) == (200, {'status': 'ready'}), 'Бәрі дайын → 200'\nassert readiness({'model': None, 'db_ok': True}) == (503, {'status': 'not ready', 'missing': ['model']}), 'Модель жоқ → 503, missing [\"model\"]'\nassert readiness({'model': None, 'db_ok': False}) == (503, {'status': 'not ready', 'missing': ['model', 'db']}), 'Екеуі де жоқ → [\"model\", \"db\"]'\nassert readiness({'model': 'm', 'db_ok': False})[1]['missing'] == ['db'], 'База жоқ → [\"db\"]'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қайта іске қосу керек пе",
   "prompt": "<p>Платформа liveness тексерісі қатарынан <code>limit</code> рет сәтсіз болса (статус 200 емес), container-ді қайта іске қосады. <code>should_restart(history, limit=3)</code> жазыңыз: <code>history</code> — статус кодтарының тізімі (ескіден жаңаға); соңғы <code>limit</code> тексерістің бәрі сәтсіз болса <code>True</code>. Тексеріс <code>limit</code>-тен аз болса <code>False</code>.</p>",
   "starter": "def should_restart(history, limit=3):\n    return 503 in history\n",
   "solution": "def should_restart(history, limit=3):\n    if len(history) < limit:\n        return False\n    return all(s != 200 for s in history[-limit:])\n\nprint(should_restart([200, 503, 503, 503]), should_restart([503, 503, 200, 503]))\n",
   "hints": [
    "Соңғы <code>limit</code> элемент: <code>history[-limit:]</code>.",
    "<code>all(s != 200 for s in ...)</code>; ұзындықты алдымен тексеріңіз."
   ],
   "check": {
    "tests": "assert should_restart([200, 503, 503, 503]) is True, 'Соңғы үшеуі сәтсіз → True'\nassert should_restart([503, 503, 200, 503]) is False, 'Арада 200 бар → False'\nassert should_restart([503, 503]) is False, 'Тексеріс limit-тен аз → False'\nassert should_restart([200, 500, 502], limit=2) is True, 'limit=2: соңғы екеуі сәтсіз'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Деплойды тексеру",
   "prompt": "<p>Деплойдан кейін жаңа нұсқа шынымен іске қосылғанын тексереміз. <code>verify_deploy(handle, expected_version)</code> жазыңыз: <code>handle(method, path, body=None)</code> → <code>(status, data)</code>. Тексерістер: <code>'health'</code> — <code>GET /health</code> 200 береді; <code>'ready'</code> — <code>GET /ready</code> 200 береді; <code>'version'</code> — <code>/ready</code> жауабындағы <code>model_version</code> <code>expected_version</code>-ге тең (ready 200 бермесе, бұл да өтпейді). Өтпегендердің атауларын ретімен қайтарыңыз.</p>",
   "starter": "def new_service(method, path, body=None):\n    if path == '/health':\n        return 200, {'status': 'alive'}\n    if path == '/ready':\n        return 200, {'status': 'ready', 'model_version': '1.3.0'}\n    return 404, {}\n\ndef verify_deploy(handle, expected_version):\n    return []\n",
   "solution": "def new_service(method, path, body=None):\n    if path == '/health':\n        return 200, {'status': 'alive'}\n    if path == '/ready':\n        return 200, {'status': 'ready', 'model_version': '1.3.0'}\n    return 404, {}\n\ndef verify_deploy(handle, expected_version):\n    failed = []\n    status, _ = handle('GET', '/health')\n    if status != 200:\n        failed.append('health')\n    status, data = handle('GET', '/ready')\n    if status != 200:\n        failed.append('ready')\n    if status != 200 or data.get('model_version') != expected_version:\n        failed.append('version')\n    return failed\n\nprint(verify_deploy(new_service, '1.3.0'), verify_deploy(new_service, '1.4.0'))\n",
   "hints": [
    "<code>/ready</code>-ге бір рет сұрау жіберіп, статусы мен data-сын екі тексеріске де қолданыңыз.",
    "Нұсқа: <code>data.get('model_version') != expected_version</code>."
   ],
   "check": {
    "tests": "assert verify_deploy(new_service, '1.3.0') == [], 'Дұрыс деплойда бос тізім'\nassert verify_deploy(new_service, '1.4.0') == ['version'], 'Ескі нұсқа іске қосылып тұр → [\"version\"]'\ndef _loading(method, path, body=None):\n    if path == '/health':\n        return 200, {}\n    return 503, {'status': 'loading'}\nassert verify_deploy(_loading, '1.3.0') == ['ready', 'version'], 'Модель жүктеліп жатыр → ready және version'\ndef _down(method, path, body=None):\n    return 502, {}\nassert verify_deploy(_down, '1.3.0') == ['health', 'ready', 'version'], 'Сервис жоқ → үшеуі де'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Image тегі latest емес",
   "prompt": "<p>Деплой чек-листінің бір ережесі: image тегіне нұсқа жазылсын, <code>latest</code> емес. <code>check_tag(image)</code> жазыңыз: тег жоқ немесе <code>latest</code> болса <code>'no_version'</code>; тег <code>X.Y.Z</code> (үш бөлік, әрқайсысы цифр) болса <code>'ok'</code>; басқа тег (мысалы <code>dev</code>, <code>1.3</code>) болса <code>'not_semver'</code> қайтарсын.</p>",
   "starter": "def check_tag(image):\n    return 'ok'\n",
   "solution": "def check_tag(image):\n    name, _, tag = image.partition(':')\n    if tag in ('', 'latest'):\n        return 'no_version'\n    parts = tag.split('.')\n    if len(parts) == 3 and all(p.isdigit() for p in parts):\n        return 'ok'\n    return 'not_semver'\n\nprint(check_tag('churn-api:1.3.0'), check_tag('churn-api'))\n",
   "hints": [
    "Тегін бөліп алыңыз: <code>name, _, tag = image.partition(':')</code>.",
    "Нұсқаны тексеру: <code>len(parts) == 3 and all(p.isdigit() for p in parts)</code>."
   ],
   "check": {
    "tests": "assert check_tag('churn-api:1.3.0') == 'ok', '\"churn-api:1.3.0\" → ok'\nassert check_tag('churn-api') == 'no_version' and check_tag('churn-api:latest') == 'no_version', 'Тег жоқ немесе latest → no_version'\nassert check_tag('churn-api:dev') == 'not_semver' and check_tag('churn-api:1.3') == 'not_semver', 'dev және 1.3 → not_semver'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Шығару және rollback",
   "prompt": "<p><code>release(state, new_version, smoke_failures)</code> жазыңыз. <code>state</code> — <code>{'active': ағымдағы нұсқа, 'history': бұрынғы белсенді нұсқалар тізімі}</code>. Smoke test сәтті болса (<code>smoke_failures</code> бос): ағымдағы нұсқа <code>history</code>-ге қосылады, <code>new_version</code> белсенді болады, <code>('released', new_version)</code> қайтарылады. Сәтсіз болса: ештеңе өзгермейді, <code>('rolled_back', ағымдағы нұсқа)</code>. Сонымен қатар <code>rollback(state)</code> жазыңыз: <code>history</code>-дің соңғы нұсқасын белсенді етеді (тарихтан алып тастайды) және соны қайтарады; тарих бос болса <code>ValueError</code>.</p>",
   "starter": "state = {'active': '1.2.0', 'history': ['1.0.0', '1.1.0']}\n\ndef release(state, new_version, smoke_failures):\n    state['active'] = new_version\n    return 'released', new_version\n\ndef rollback(state):\n    pass\n",
   "solution": "state = {'active': '1.2.0', 'history': ['1.0.0', '1.1.0']}\n\ndef release(state, new_version, smoke_failures):\n    if smoke_failures:\n        return 'rolled_back', state['active']\n    state['history'].append(state['active'])\n    state['active'] = new_version\n    return 'released', new_version\n\ndef rollback(state):\n    if not state['history']:\n        raise ValueError('Қайтаратын нұсқа жоқ')\n    state['active'] = state['history'].pop()\n    return state['active']\n\nprint(release(state, '1.3.0', []), state)\nprint(rollback(state), state)\n",
   "hints": [
    "Сәтсіз smoke test-те бірден <code>return 'rolled_back', state['active']</code> — state өзгермейді.",
    "<code>rollback</code>: <code>state['active'] = state['history'].pop()</code>."
   ],
   "check": {
    "tests": "_s = {'active': '1.2.0', 'history': ['1.0.0', '1.1.0']}\nassert release(_s, '1.3.0', ['predict']) == ('rolled_back', '1.2.0'), 'Smoke test өтпесе → rolled_back, ағымдағы нұсқа'\nassert _s == {'active': '1.2.0', 'history': ['1.0.0', '1.1.0']}, 'Сәтсіз шығаруда state өзгермеуі керек'\nassert release(_s, '1.3.0', []) == ('released', '1.3.0'), 'Сәтті → released'\nassert _s == {'active': '1.3.0', 'history': ['1.0.0', '1.1.0', '1.2.0']}, 'Бұрынғы нұсқа history-ге қосылуы керек'\nassert rollback(_s) == '1.2.0' and _s == {'active': '1.2.0', 'history': ['1.0.0', '1.1.0']}, 'rollback соңғы нұсқаны қайтарады'\n_e = {'active': '1.0.0', 'history': []}\ntry:\n    rollback(_e)\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Тарих бос болса ValueError')"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Health монитор",
   "prompt": "<p>Платформаның мінез-құлқын модельдейміз. <code>monitor(statuses, limit=3)</code> жазыңыз: <code>statuses</code> — liveness тексерістерінің статустары (ретімен). Қатарынан сәтсіз (200 емес) тексерістерді санаңыз; сан <code>limit</code>-ке жеткенде container қайта іске қосылады: сол тексерістің индексін тізімге қосып, санауышты нөлдеңіз. Сәтті тексеріс санауышты нөлдейді. <code>{'restarts': [индекстер], 'uptime': 200 үлесінің пайызы (2 таңба)}</code> қайтарыңыз.</p>",
   "starter": "def monitor(statuses, limit=3):\n    return {'restarts': [], 'uptime': 100.0}\n",
   "solution": "def monitor(statuses, limit=3):\n    restarts = []\n    fails = 0\n    for i, s in enumerate(statuses):\n        if s == 200:\n            fails = 0\n            continue\n        fails += 1\n        if fails == limit:\n            restarts.append(i)\n            fails = 0\n    ok = sum(1 for s in statuses if s == 200)\n    uptime = round(ok / len(statuses) * 100, 2) if statuses else 100.0\n    return {'restarts': restarts, 'uptime': uptime}\n\nprint(monitor([200, 503, 503, 503, 200, 500, 500, 500, 500, 500, 500]))\n",
   "hints": [
    "<code>for i, s in enumerate(statuses):</code> ішінде <code>fails</code> санауышын жүргізіңіз.",
    "<code>fails == limit</code> болғанда <code>restarts.append(i)</code> және <code>fails = 0</code>."
   ],
   "check": {
    "tests": "assert monitor([200, 503, 503, 503, 200]) == {'restarts': [3], 'uptime': 40.0}, 'Қатарынан 3 сәтсіздік (1, 2, 3) → 3-индексте restart'\nassert monitor([200, 500, 500, 500, 500, 500, 500])['restarts'] == [3, 6], 'Restart-тан кейін санауыш нөлденеді: 3 және 6'\nassert monitor([503, 503, 200, 503, 503, 200])['restarts'] == [], 'Арада 200 болса санауыш нөлденеді'\nassert monitor([500, 500], limit=2) == {'restarts': [1], 'uptime': 0.0}, 'limit параметрі ескерілсін'\nassert monitor([]) == {'restarts': [], 'uptime': 100.0}, 'Бос тізім'\nassert monitor([200, 200, 500])['uptime'] == 66.67, 'uptime 2 таңбаға дөңгелектенсін'"
   }
  }
 ],
 "dep-8": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Секундтан миллисекундқа",
   "prompt": "<p><code>time.perf_counter()</code> секунд береді. <code>to_ms(durations)</code> функциясын жазыңыз: секундтар тізімін миллисекундқа айналдырып, әрқайсысын 1 таңбаға дөңгелектеп қайтарсын. Мысалы, <code>[0.0421, 0.0035]</code> → <code>[42.1, 3.5]</code>.</p>",
   "starter": "def to_ms(durations):\n    return durations\n",
   "solution": "def to_ms(durations):\n    return [round(d * 1000, 1) for d in durations]\n\nprint(to_ms([0.0421, 0.0035]))\n",
   "hints": [
    "1 с = 1000 мс.",
    "<code>[round(d * 1000, 1) for d in durations]</code>."
   ],
   "check": {
    "tests": "assert to_ms([0.0421, 0.0035]) == [42.1, 3.5], 'to_ms([0.0421, 0.0035]) [42.1, 3.5] қайтаруы керек'\nassert to_ms([1]) == [1000.0], '1 с = 1000.0 мс'\nassert to_ms([]) == [], 'Бос тізім'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Throughput",
   "prompt": "<p>Жүктеме тестінде <code>n_requests</code> сұрау <code>seconds</code> секундта өңделді. <code>rps(n_requests, seconds)</code> функциясын жазыңыз: секундына сұрау санын 1 таңбаға дөңгелектеп қайтарсын. <code>seconds</code> 0 немесе теріс болса <code>ValueError</code>.</p>",
   "starter": "def rps(n_requests, seconds):\n    return n_requests / seconds\n",
   "solution": "def rps(n_requests, seconds):\n    if seconds <= 0:\n        raise ValueError('seconds оң сан болуы керек')\n    return round(n_requests / seconds, 1)\n\nprint(rps(12000, 60))\n",
   "hints": [
    "<code>round(n_requests / seconds, 1)</code>.",
    "Алдымен <code>if seconds &lt;= 0: raise ValueError(...)</code>."
   ],
   "check": {
    "tests": "assert rps(12000, 60) == 200.0, 'rps(12000, 60) 200.0 қайтаруы керек'\nassert rps(1000, 7) == 142.9, 'Нәтижені 1 таңбаға дөңгелектеңіз'\nfor _s in [0, -5]:\n    try:\n        rps(10, _s)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f'seconds={_s} үшін ValueError күтілді')"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ең баяу сұраулар",
   "prompt": "<p><code>slowest(latencies, n=3)</code> функциясын жазыңыз: ең баяу <code>n</code> сұраудың уақытын кему ретімен қайтарсын. Мысалы, <code>[40, 610, 38, 890, 52]</code> → <code>[890, 610, 52]</code>. Сұраулар <code>n</code>-нен аз болса, бәрін қайтарсын.</p>",
   "starter": "def slowest(latencies, n=3):\n    return latencies[:n]\n",
   "solution": "def slowest(latencies, n=3):\n    return sorted(latencies, reverse=True)[:n]\n\nprint(slowest([40, 610, 38, 890, 52]))\n",
   "hints": [
    "<code>sorted(latencies, reverse=True)</code> — кему ретімен.",
    "Алғашқы n элемент: <code>[:n]</code>."
   ],
   "check": {
    "tests": "assert slowest([40, 610, 38, 890, 52]) == [890, 610, 52], 'slowest([40, 610, 38, 890, 52]) [890, 610, 52] қайтаруы керек'\nassert slowest([5, 1], n=5) == [5, 1], 'n тізімнен үлкен болса, бәрі'\n_l = [3, 1, 2]\nslowest(_l, 1)\nassert _l == [3, 1, 2], 'Кіріс тізім өзгермеуі керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бөліктерге бөлу",
   "prompt": "<p><code>chunks(rows, size)</code> функциясын жазыңыз: тізімді ұзындығы <code>size</code> болатын бөліктерге бөліп, бөліктер тізімін қайтарсын (соңғысы қысқа болуы мүмкін). <code>size</code> 1-ден кіші болса <code>ValueError</code>. Мысалы, <code>chunks([1, 2, 3, 4, 5], 2)</code> → <code>[[1, 2], [3, 4], [5]]</code>.</p>",
   "starter": "def chunks(rows, size):\n    return [rows]\n",
   "solution": "def chunks(rows, size):\n    if size < 1:\n        raise ValueError('size кемінде 1')\n    return [rows[i:i + size] for i in range(0, len(rows), size)]\n\nprint(chunks([1, 2, 3, 4, 5], 2))\n",
   "hints": [
    "<code>range(0, len(rows), size)</code> — әр бөліктің басы.",
    "<code>rows[i:i + size]</code>."
   ],
   "check": {
    "tests": "assert chunks([1, 2, 3, 4, 5], 2) == [[1, 2], [3, 4], [5]], 'chunks([1, 2, 3, 4, 5], 2) [[1, 2], [3, 4], [5]] қайтаруы керек'\nassert chunks(list(range(10)), 5) == [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9]], 'Тең бөлінсе, соңғы бөлік толық'\nassert chunks([], 3) == [], 'Бос тізім үшін []'\ntry:\n    chunks([1], 0)\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('size=0 үшін ValueError')"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "SLO есебі",
   "prompt": "<p><code>slo_report(latencies, slo_ms=200, q=95)</code> жазыңыз: <code>numpy.percentile</code> арқылы сөздік қайтарсын: <code>{'p50': медиана, 'pq': q-перцентиль, 'ok': pq &lt;= slo_ms}</code>. Сандар 1 таңбаға дөңгелектенген <code>float</code>, <code>ok</code> — <code>bool</code>.</p>",
   "starter": "import numpy as np\nlatencies = [38, 41, 35, 44, 39, 52, 40, 37, 43, 36, 42, 39, 610, 41, 38, 45, 40, 37, 890, 42]\n\ndef slo_report(latencies, slo_ms=200, q=95):\n    return {'p50': float(np.mean(latencies)), 'pq': 0.0, 'ok': True}\n",
   "solution": "import numpy as np\nlatencies = [38, 41, 35, 44, 39, 52, 40, 37, 43, 36, 42, 39, 610, 41, 38, 45, 40, 37, 890, 42]\n\ndef slo_report(latencies, slo_ms=200, q=95):\n    p50 = float(np.percentile(latencies, 50))\n    pq = float(np.percentile(latencies, q))\n    return {'p50': round(p50, 1), 'pq': round(pq, 1), 'ok': bool(pq <= slo_ms)}\n\nprint(slo_report(latencies), slo_report(latencies, slo_ms=700, q=90))\n",
   "hints": [
    "<code>np.percentile(latencies, q)</code>.",
    "<code>bool(...)</code> numpy-дың <code>bool_</code> типін кәдімгі bool-ға айналдырады."
   ],
   "check": {
    "tests": "import numpy as _np\n_r = slo_report(latencies)\nassert _r == {'p50': 40.5, 'pq': round(float(_np.percentile(latencies, 95)), 1), 'ok': False}, f'slo_report(latencies) дұрыс емес: {_r}'\nassert type(_r['ok']) is bool and type(_r['p50']) is float, 'ok — bool, сандар — float'\nassert slo_report(latencies, q=90)['ok'] is True, 'q=90 болса p90 ≈ 52.6 мс ≤ 200: ok True'\nassert slo_report([100, 300], slo_ms=300, q=50) == {'p50': 200.0, 'pq': 200.0, 'ok': True}, 'slo_ms және q параметрлері ескерілсін'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Batch endpoint шегі",
   "prompt": "<p><code>POST /predict_batch</code> бір сұрауда тым көп жол алмауы керек. <code>handle_batch(rows, max_rows=100)</code> жазыңыз: <code>rows</code> бос болса <code>(400, {'error': 'бос сұрау'})</code>; <code>max_rows</code>-тан көп болса <code>(413, {'error': ...})</code> (хабарда шек саны болсын); әйтпесе <code>(200, {'predictions': [score(r) for r in rows], 'count': жол саны})</code>.</p>",
   "starter": "def score(row):\n    return round(min(1.0, 0.15 * row['support_calls']), 2)\n\ndef handle_batch(rows, max_rows=100):\n    return 200, {'predictions': [score(r) for r in rows]}\n",
   "solution": "def score(row):\n    return round(min(1.0, 0.15 * row['support_calls']), 2)\n\ndef handle_batch(rows, max_rows=100):\n    if not rows:\n        return 400, {'error': 'бос сұрау'}\n    if len(rows) > max_rows:\n        return 413, {'error': f'бір сұрауда ең көбі {max_rows} жол'}\n    return 200, {'predictions': [score(r) for r in rows], 'count': len(rows)}\n\nprint(handle_batch([{'support_calls': 2}, {'support_calls': 9}]))\n",
   "hints": [
    "Екі тексеріс ретімен: бос па, сосын <code>len(rows) &gt; max_rows</code>.",
    "413 хабарына шекті f-string арқылы қосыңыз."
   ],
   "check": {
    "tests": "assert handle_batch([{'support_calls': 2}, {'support_calls': 9}]) == (200, {'predictions': [0.3, 1.0], 'count': 2}), 'Дұрыс сұрау → 200, predictions және count'\nassert handle_batch([]) == (400, {'error': 'бос сұрау'}), 'Бос тізім → 400'\n_s, _d = handle_batch([{'support_calls': 1}] * 101)\nassert _s == 413 and '100' in _d['error'], '101 жол → 413, хабарда шек (100)'\nassert handle_batch([{'support_calls': 1}] * 100)[0] == 200, 'Дәл 100 жол — рұқсат'\nassert handle_batch([{'support_calls': 1}] * 6, max_rows=5)[0] == 413, 'max_rows параметрі ескерілсін'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Batch өлшемін таңдау",
   "prompt": "<p>Модельді шақырудың құны: әр <code>predict_proba</code> шақыруы <code>overhead_ms</code> + әр жолға <code>per_row_ms</code>. <code>total_ms(n_rows, batch_size, overhead_ms=5, per_row_ms=0.02)</code> — барлық жолды бөліктермен болжауға кететін уақыт (шақырулар саны <code>ceil(n_rows / batch_size)</code>), 2 таңбаға дөңгелектенген. <code>best_batch(n_rows, sizes, max_call_ms)</code> — бір шақыру уақыты (<code>overhead_ms + per_row_ms * batch_size</code>) <code>max_call_ms</code>-тан аспайтын өлшемдердің ішінен жалпы уақыты ең аз болатынын қайтарсын; ондай өлшем жоқ болса <code>None</code>.</p>",
   "starter": "import math\n\ndef total_ms(n_rows, batch_size, overhead_ms=5, per_row_ms=0.02):\n    return n_rows * (overhead_ms + per_row_ms)\n\ndef best_batch(n_rows, sizes, max_call_ms):\n    return sizes[0]\n",
   "solution": "import math\n\ndef total_ms(n_rows, batch_size, overhead_ms=5, per_row_ms=0.02):\n    calls = math.ceil(n_rows / batch_size)\n    return round(calls * overhead_ms + n_rows * per_row_ms, 2)\n\ndef best_batch(n_rows, sizes, max_call_ms, overhead_ms=5, per_row_ms=0.02):\n    ok = [s for s in sizes if overhead_ms + per_row_ms * s <= max_call_ms]\n    if not ok:\n        return None\n    return min(ok, key=lambda s: total_ms(n_rows, s, overhead_ms, per_row_ms))\n\nprint(total_ms(1000, 1), total_ms(1000, 1000), best_batch(2_000_000, [1, 100, 10_000, 100_000], 300))\n",
   "hints": [
    "Шақырулар саны: <code>math.ceil(n_rows / batch_size)</code>; уақыт: <code>calls * overhead_ms + n_rows * per_row_ms</code>.",
    "Алдымен шектен өтпейтін өлшемдерді сүзіп, сосын <code>min(ok, key=...)</code>."
   ],
   "check": {
    "tests": "assert total_ms(1000, 1) == 5020.0, 'Бір-бірден: 1000 шақыру × 5 мс + 20 мс = 5020.0'\nassert total_ms(1000, 1000) == 25.0, 'Бір batch: 5 + 20 = 25.0 мс'\nassert total_ms(2500, 1000) == 65.0, '2500 жол, batch 1000 → 3 шақыру: 15 + 50 = 65.0'\nassert best_batch(2_000_000, [1, 100, 10_000, 100_000], 300) == 10_000, 'Шек 300 мс: 100 000 жол 2005 мс алады, ең жақсысы 10 000'\nassert best_batch(100, [500, 1000], 6) is None, 'Бірде-бір өлшем шекке сыймаса None'\nassert best_batch(50, [10, 50, 100], 1000) in (50, 100), '50 жол үшін 50 немесе 100 — бір шақыру'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Latency өлшеу",
   "prompt": "<p><code>measure(func, rows)</code> жазыңыз: әр жол үшін <code>func(row)</code> шақыруын <code>time.perf_counter()</code> арқылы өлшеп, миллисекундтар тізімін жинаңыз. <code>{'n': шақыру саны, 'p50': ..., 'p95': ..., 'max': ...}</code> қайтарыңыз (<code>np.percentile</code>, барлығы <code>float</code>, мс). <code>func</code> нәтижесі керек емес. Бос <code>rows</code> үшін <code>ValueError</code>.</p>",
   "starter": "import time\nimport numpy as np\n\ndef measure(func, rows):\n    return {'n': len(rows)}\n",
   "solution": "import time\nimport numpy as np\n\ndef measure(func, rows):\n    if not rows:\n        raise ValueError('rows бос')\n    latencies = []\n    for row in rows:\n        t0 = time.perf_counter()\n        func(row)\n        latencies.append((time.perf_counter() - t0) * 1000)\n    return {\n        'n': len(latencies),\n        'p50': float(np.percentile(latencies, 50)),\n        'p95': float(np.percentile(latencies, 95)),\n        'max': float(max(latencies)),\n    }\n\nprint(measure(lambda r: sum(range(r)), [100] * 50))\n",
   "hints": [
    "Әр шақыруды <code>t0 = time.perf_counter()</code> мен <code>(time.perf_counter() - t0) * 1000</code> арасына алыңыз.",
    "Нәтижені <code>float(np.percentile(latencies, 95))</code> түрінде қайтарыңыз."
   ],
   "check": {
    "tests": "_calls = []\ndef _f(r):\n    _calls.append(r)\n    if r == 'slow':\n        _t = time.perf_counter()\n        while time.perf_counter() - _t < 0.02:\n            pass\n_r = measure(_f, ['fast'] * 19 + ['slow'])\nassert len(_calls) == 20 and _r['n'] == 20, 'Әр жол үшін func бір рет шақырылуы керек'\nassert set(_r) == {'n', 'p50', 'p95', 'max'}, 'Кілттер: n, p50, p95, max'\nassert all(isinstance(_r[k], float) for k in ('p50', 'p95', 'max')), 'Уақыттар float болсын'\nassert _r['max'] >= 19, f'Баяу шақыру ≈ 20 мс: max миллисекундпен болуы керек, сізде {_r[\"max\"]}'\nassert 0 <= _r['p50'] < 5 and _r['p50'] <= _r['p95'] <= _r['max'], 'p50 ≤ p95 ≤ max, жылдам шақырулар мс-тың бөлігі'\ntry:\n    measure(_f, [])\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Бос rows үшін ValueError')"
   }
  }
 ]
});
