// Practice tasks after the lessons of py-3. Each lesson's list opens one task at a time.
DJ.addPractice('py-3', {
 "pyb-1": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Query жолын талдау",
   "prompt": "<code>parse_query(qs)</code> функциясы <code>\"city=Алматы&page=2\"</code> түріндегі query string-ті сөздікке айналдырсын: <code>{\"city\": \"Алматы\", \"page\": \"2\"}</code> (мәндер жол күйінде). Бос жол берілсе, <code>{}</code> қайтарсын.",
   "starter": "def parse_query(qs):\n    return {}\n",
   "solution": "def parse_query(qs):\n    result = {}\n    if not qs:\n        return result\n    for pair in qs.split(\"&\"):\n        key, _, value = pair.partition(\"=\")\n        result[key] = value\n    return result\n",
   "hints": [
    "Жұптарды <code>qs.split(\"&\")</code> арқылы бөліңіз.",
    "Әр жұп: <code>key, _, value = pair.partition(\"=\")</code>"
   ],
   "check": {
    "tests": "assert parse_query(\"city=Алматы&page=2\") == {\"city\": \"Алматы\", \"page\": \"2\"}, \"parse_query('city=Алматы&page=2') {'city': 'Алматы', 'page': '2'} болуы керек\"\nassert parse_query(\"\") == {}, \"Бос query: {}\"\nassert parse_query(\"q=домбыра\") == {\"q\": \"домбыра\"}, \"Бір параметр: {'q': 'домбыра'}\"\nassert parse_query(\"sort=-price&limit=20&city=Тараз\")[\"limit\"] == \"20\", \"Мәндер жол күйінде қалады: '20'\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Сұрау жолын бөлу",
   "prompt": "HTTP сұраудың бірінші жолы (request line) үш бөліктен тұрады. <code>parse_request_line(line)</code> функциясы <code>(method, path, version)</code> кортежін қайтарсын. <code>parse_request_line(\"GET /cafes HTTP/1.1\")</code> → <code>(\"GET\", \"/cafes\", \"HTTP/1.1\")</code>.",
   "starter": "def parse_request_line(line):\n    return line\n",
   "solution": "def parse_request_line(line):\n    method, path, version = line.split(\" \")\n    return method, path, version\n",
   "hints": [
    "Бөліктер бос орынмен бөлінген: <code>line.split(\" \")</code>.",
    "Үш айнымалыға таратып, кортеж қайтарыңыз."
   ],
   "check": {
    "tests": "assert parse_request_line(\"GET /cafes HTTP/1.1\") == (\"GET\", \"/cafes\", \"HTTP/1.1\"), \"parse_request_line('GET /cafes HTTP/1.1') ('GET', '/cafes', 'HTTP/1.1') болуы керек\"\nassert parse_request_line(\"DELETE /orders/15 HTTP/2\") == (\"DELETE\", \"/orders/15\", \"HTTP/2\"), \"DELETE /orders/15 HTTP/2 дұрыс бөлінуі керек\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Body байт саны",
   "prompt": "<code>Content-Length</code> header-і body-дің <b>байт</b> санын көрсетеді, таңба санын емес. <code>content_length(body)</code> функциясы жолдың UTF-8 кодтауындағы байт санын қайтарсын. <code>content_length(\"Алматы\")</code> → <code>12</code>.",
   "starter": "def content_length(body):\n    return len(body)\n",
   "solution": "def content_length(body):\n    return len(body.encode(\"utf-8\"))\n",
   "hints": [
    "Жолды байттарға айналдыру: <code>body.encode(\"utf-8\")</code>.",
    "Кириллица әрпі UTF-8-де 2 байт алады."
   ],
   "check": {
    "tests": "assert content_length(\"Алматы\") == 12, \"content_length('Алматы') 12 болуы керек (әр әріп 2 байт)\"\nassert content_length(\"latte\") == 5, \"Латын әріптері 1 байттан: 5\"\nassert content_length('{\"city\": \"Тараз\"}') == 22, \"JSON body: 22 байт\"\nassert content_length(\"\") == 0, \"Бос body: 0\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Header мәнін алу",
   "prompt": "<code>get_header(raw, name)</code> функциясы толық HTTP сұрау мәтінінен (<code>raw</code>, жолдар <code>\\r\\n</code> арқылы бөлінген) берілген header-дің мәнін қайтарсын. Атау регистрге тәуелсіз, мән <code>strip</code> етілсін, мәндегі қос нүкте сақталсын (<code>split(\":\", 1)</code>). Header жоқ болса, <code>None</code>.",
   "starter": "def get_header(raw, name):\n    return None\n",
   "solution": "def get_header(raw, name):\n    head = raw.split(\"\\r\\n\\r\\n\", 1)[0]\n    for line in head.split(\"\\r\\n\")[1:]:\n        key, value = line.split(\":\", 1)\n        if key.strip().lower() == name.lower():\n            return value.strip()\n    return None\n",
   "hints": [
    "Алдымен headers бөлігін алыңыз: <code>raw.split(\"\\r\\n\\r\\n\", 1)[0]</code>, сосын бірінші жолды өткізіңіз.",
    "Салыстыру: <code>key.strip().lower() == name.lower()</code>"
   ],
   "check": {
    "tests": "_raw = \"GET /menu HTTP/1.1\\r\\nHost: api.kofe.kz:8080\\r\\nAccept:  application/json \\r\\nUser-Agent: KofeApp/3.1\\r\\n\\r\\n\"\nassert get_header(_raw, \"host\") == \"api.kofe.kz:8080\", \"Host мәніндегі порт сақталуы керек: 'api.kofe.kz:8080'\"\nassert get_header(_raw, \"ACCEPT\") == \"application/json\", \"Атау регистрге тәуелсіз, мән strip етіледі\"\nassert get_header(_raw, \"Cookie\") is None, \"Header жоқ болса, None\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Сұрау мәтінін құру",
   "prompt": "<code>build_request(method, path, headers, body=\"\")</code> функциясы HTTP сұрау мәтінін құрсын: бірінші жол <code>\"&lt;method&gt; &lt;path&gt; HTTP/1.1\"</code>, сосын әр header <code>\"Аты: мәні\"</code> (сөздіктегі ретпен), барлық жол <code>\\r\\n</code> арқылы бөлінеді, headers-тен кейін бос жол (<code>\\r\\n\\r\\n</code>), соңында body.",
   "starter": "def build_request(method, path, headers, body=\"\"):\n    return method + \" \" + path\n",
   "solution": "def build_request(method, path, headers, body=\"\"):\n    lines = [f\"{method} {path} HTTP/1.1\"]\n    for name, value in headers.items():\n        lines.append(f\"{name}: {value}\")\n    return \"\\r\\n\".join(lines) + \"\\r\\n\\r\\n\" + body\n",
   "hints": [
    "Жолдар тізімін жинап, <code>\"\\r\\n\".join(lines)</code> жасаңыз.",
    "Соңына <code>\"\\r\\n\\r\\n\" + body</code> қосыңыз."
   ],
   "check": {
    "tests": "_r = build_request(\"GET\", \"/cafes?city=Алматы\", {\"Host\": \"api.kofe.kz\", \"Accept\": \"application/json\"})\nassert _r == \"GET /cafes?city=Алматы HTTP/1.1\\r\\nHost: api.kofe.kz\\r\\nAccept: application/json\\r\\n\\r\\n\", \"GET сұрауының мәтіні дұрыс емес\"\n_p = build_request(\"POST\", \"/orders\", {\"Content-Type\": \"application/json\"}, '{\"qty\": 2}')\nassert _p.endswith('\\r\\n\\r\\n{\"qty\": 2}'), \"Body бос жолдан кейін тұруы керек\"\nassert _p.split(\"\\r\\n\")[0] == \"POST /orders HTTP/1.1\", \"Бірінші жол: 'POST /orders HTTP/1.1'\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жауап статусын оқу",
   "prompt": "HTTP жауаптың бірінші жолы: <code>\"HTTP/1.1 404 Not Found\"</code>. <code>parse_status_line(line)</code> функциясы <code>(code, reason)</code> кортежін қайтарсын: <code>code</code> — <code>int</code>, <code>reason</code> — қалған мәтін (бос орындары бар болуы мүмкін). <code>parse_status_line(\"HTTP/1.1 500 Internal Server Error\")</code> → <code>(500, \"Internal Server Error\")</code>.",
   "starter": "def parse_status_line(line):\n    parts = line.split(\" \")\n    return parts[1], parts[2]\n",
   "solution": "def parse_status_line(line):\n    _version, code, reason = line.split(\" \", 2)\n    return int(code), reason\n",
   "hints": [
    "Тек алғашқы екі бос орын бойынша бөліңіз: <code>line.split(\" \", 2)</code>.",
    "Кодты <code>int(code)</code> етіңіз."
   ],
   "check": {
    "tests": "assert parse_status_line(\"HTTP/1.1 404 Not Found\") == (404, \"Not Found\"), \"parse_status_line('HTTP/1.1 404 Not Found') (404, 'Not Found') болуы керек\"\nassert parse_status_line(\"HTTP/1.1 500 Internal Server Error\") == (500, \"Internal Server Error\"), \"reason ішіндегі бос орындар сақталуы керек\"\nassert parse_status_line(\"HTTP/2 201 Created\")[0] == 201, \"code int болуы керек: 201\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Жауапты толық талдау",
   "prompt": "<code>parse_response(raw)</code> HTTP жауап мәтінін талдап, сөздік қайтарсын: <code>status</code> (int), <code>reason</code>, <code>headers</code> (атаулары кіші әріппен, мәндері <code>strip</code>), <code>json</code> — body JSON ретінде оқылған мән (<code>json.loads</code>), body бос болса <code>None</code>.",
   "starter": "import json\n\ndef parse_response(raw):\n    return {}\n",
   "solution": "import json\n\ndef parse_response(raw):\n    head, _, body = raw.partition(\"\\r\\n\\r\\n\")\n    lines = head.split(\"\\r\\n\")\n    _version, code, reason = lines[0].split(\" \", 2)\n    headers = {}\n    for line in lines[1:]:\n        name, value = line.split(\":\", 1)\n        headers[name.strip().lower()] = value.strip()\n    return {\"status\": int(code), \"reason\": reason, \"headers\": headers,\n            \"json\": json.loads(body) if body else None}\n",
   "hints": [
    "<code>head, _, body = raw.partition(\"\\r\\n\\r\\n\")</code>",
    "Бірінші жол: <code>split(\" \", 2)</code>; header жолдары: <code>split(\":\", 1)</code>."
   ],
   "check": {
    "tests": "_raw = 'HTTP/1.1 201 Created\\r\\nContent-Type: application/json\\r\\nLocation: /v1/orders/1051\\r\\n\\r\\n{\"id\": 1051, \"status\": \"new\"}'\n_r = parse_response(_raw)\nassert _r[\"status\"] == 201 and _r[\"reason\"] == \"Created\", \"status 201, reason 'Created'\"\nassert _r[\"headers\"] == {\"content-type\": \"application/json\", \"location\": \"/v1/orders/1051\"}, \"headers: атаулары кіші әріппен\"\nassert _r[\"json\"] == {\"id\": 1051, \"status\": \"new\"}, \"json: body-дің JSON мәні\"\n_e = parse_response(\"HTTP/1.1 204 No Content\\r\\nServer: kofe\\r\\n\\r\\n\")\nassert _e[\"status\"] == 204 and _e[\"reason\"] == \"No Content\" and _e[\"json\"] is None, \"Body бос болса, json = None\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Cookie талдау",
   "prompt": "Сессия идентификаторы <code>Cookie</code> header-інде келеді: <code>Cookie: sid=abc123; lang=kk</code>. <code>parse_cookies(raw)</code> функциясы сұрау мәтінінен cookie-лерді сөздікке жинасын: <code>{\"sid\": \"abc123\", \"lang\": \"kk\"}</code>. Header атауы регистрге тәуелсіз, жұптар <code>;</code> арқылы бөлінеді, бос орындар алынады. Cookie жоқ болса, <code>{}</code>.",
   "starter": "def parse_cookies(raw):\n    return {}\n",
   "solution": "def parse_cookies(raw):\n    head = raw.split(\"\\r\\n\\r\\n\", 1)[0]\n    cookies = {}\n    for line in head.split(\"\\r\\n\")[1:]:\n        name, value = line.split(\":\", 1)\n        if name.strip().lower() != \"cookie\":\n            continue\n        for pair in value.split(\";\"):\n            pair = pair.strip()\n            if not pair:\n                continue\n            k, _, v = pair.partition(\"=\")\n            cookies[k.strip()] = v.strip()\n    return cookies\n",
   "hints": [
    "Алдымен <code>cookie</code> header-ін табыңыз (атауды <code>.lower()</code> етіп салыстырыңыз).",
    "Мәнді <code>split(\";\")</code> арқылы бөліп, әр жұпты <code>partition(\"=\")</code> етіңіз."
   ],
   "check": {
    "tests": "_raw = \"GET /profile HTTP/1.1\\r\\nHost: kofe.kz\\r\\ncookie:  sid=abc123; lang=kk ;theme=dark\\r\\n\\r\\n\"\nassert parse_cookies(_raw) == {\"sid\": \"abc123\", \"lang\": \"kk\", \"theme\": \"dark\"}, \"parse_cookies(...) {'sid': 'abc123', 'lang': 'kk', 'theme': 'dark'} болуы керек\"\nassert parse_cookies(\"GET / HTTP/1.1\\r\\nHost: kofe.kz\\r\\n\\r\\n\") == {}, \"Cookie жоқ болса, {}\"\nassert parse_cookies(\"GET / HTTP/1.1\\r\\nCookie: token=a=b\\r\\n\\r\\n\") == {\"token\": \"a=b\"}, \"Мәндегі = сақталуы керек (бірінші = бойынша бөлу)\""
   }
  }
 ],
 "pyb-2": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жоқ кілт қатесі",
   "prompt": "Кассадағы <code>order_total(items)</code> функциясы <code>KeyError: 'qty'</code> береді: кейбір тауарда <code>qty</code> кілті жоқ. Түзетіңіз: <code>qty</code> жоқ болса, 1 деп есептелсін (<code>.get(\"qty\", 1)</code>).",
   "starter": "def order_total(items):\n    total = 0\n    for item in items:\n        total += item[\"price\"] * item[\"qty\"]\n    return total\n",
   "solution": "def order_total(items):\n    total = 0\n    for item in items:\n        total += item[\"price\"] * item.get(\"qty\", 1)\n    return total\n",
   "hints": [
    "Traceback-тің ең төменгі жолы: <code>KeyError: 'qty'</code>.",
    "<code>item.get(\"qty\", 1)</code> кілт жоқ болса 1 қайтарады."
   ],
   "check": {
    "tests": "assert order_total([{\"price\": 1200, \"qty\": 2}, {\"price\": 800}]) == 3200, \"qty жоқ тауар 1 дана деп есептеледі: 2400 + 800\"\nassert order_total([]) == 0, \"Бос себет: 0\"\nassert order_total([{\"price\": 450, \"qty\": 3}]) == 1350, \"450 * 3 = 1350\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Docstring жазу",
   "prompt": "PEP 8 бойынша <code>add_vat(price)</code> функциясын docstring-пен жазыңыз: ол бағаға 12% ҚҚС қосып, <code>round(...)</code> арқылы бүтін теңге қайтарсын. Docstring ішінде <code>ҚҚС</code> сөзі болсын.",
   "starter": "def add_vat(price):\n    return round(price * 1.12)\n",
   "solution": "def add_vat(price):\n    \"\"\"Бағаға 12% ҚҚС қосып, бүтін теңге қайтарады.\"\"\"\n    return round(price * 1.12)\n",
   "hints": [
    "Docstring — функцияның бірінші жолындағы үш тырнақшалы мәтін.",
    "<code>\"\"\"Бағаға 12% ҚҚС қосып, бүтін теңге қайтарады.\"\"\"</code>"
   ],
   "check": {
    "tests": "assert add_vat.__doc__ and \"ҚҚС\" in add_vat.__doc__, \"Docstring керек және онда 'ҚҚС' сөзі болсын\"\nassert add_vat(1000) == 1120, \"add_vat(1000) 1120 болуы керек\"\nassert add_vat(2500) == 2800, \"add_vat(2500) 2800 болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Тип қатесін түзету",
   "prompt": "<code>receipt_line(name, qty, price)</code> чектің бір жолын <code>\"Латте x 2 = 2400 ₸\"</code> түрінде қайтаруы керек, бірақ <code>TypeError</code> береді (жол мен санды <code>+</code> арқылы қосуға болмайды). f-string арқылы түзетіңіз.",
   "starter": "def receipt_line(name, qty, price):\n    return name + \" x \" + qty + \" = \" + qty * price + \" ₸\"\n",
   "solution": "def receipt_line(name, qty, price):\n    return f\"{name} x {qty} = {qty * price} ₸\"\n",
   "hints": [
    "Қате түрі: <code>TypeError: can only concatenate str (not \"int\") to str</code>.",
    "<code>f\"{name} x {qty} = {qty * price} ₸\"</code>"
   ],
   "check": {
    "tests": "assert receipt_line(\"Латте\", 2, 1200) == \"Латте x 2 = 2400 ₸\", \"receipt_line('Латте', 2, 1200) 'Латте x 2 = 2400 ₸' болуы керек\"\nassert receipt_line(\"Самса\", 3, 350) == \"Самса x 3 = 1050 ₸\", \"receipt_line('Самса', 3, 350) 'Самса x 3 = 1050 ₸' болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Соңғы тапсырыстар",
   "prompt": "<code>last_orders(orders, n)</code> соңғы <code>n</code> тапсырысты қайтаруы керек, бірақ бір артық элемент береді, ал <code>n = 0</code> болса бүкіл тізімді қайтарып жібереді. Түзетіңіз: <code>n</code> тізім ұзындығынан көп болса, барлығын қайтарсын.",
   "starter": "def last_orders(orders, n):\n    return orders[len(orders) - n - 1:]\n",
   "solution": "def last_orders(orders, n):\n    return orders[max(0, len(orders) - n):]\n",
   "hints": [
    "Басталу индексі <code>len(orders) - n</code> болуы керек, <code>- 1</code> артық.",
    "<code>max(0, ...)</code> теріс индекстен сақтайды; <code>orders[len(orders):]</code> бос тізім береді."
   ],
   "check": {
    "tests": "_o = [101, 102, 103, 104, 105]\nassert last_orders(_o, 2) == [104, 105], \"last_orders(_o, 2) [104, 105] болуы керек\"\nassert last_orders(_o, 0) == [], \"n = 0 болса, бос тізім\"\nassert last_orders(_o, 10) == _o, \"n көп болса, бүкіл тізім\"\nassert last_orders([], 3) == [], \"Бос тізім: []\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "None қатесін түзету",
   "prompt": "<code>find_user(users, login)</code> пайдаланушыны табады немесе <code>None</code> қайтарады. <code>user_city(users, login)</code> жоқ пайдаланушыда <code>TypeError: 'NoneType' object is not subscriptable</code> береді. Түзетіңіз: пайдаланушы жоқ болса, <code>\"белгісіз\"</code> қайтарсын.",
   "starter": "def find_user(users, login):\n    for u in users:\n        if u[\"login\"] == login:\n            return u\n    return None\n\ndef user_city(users, login):\n    return find_user(users, login)[\"city\"]\n",
   "solution": "def find_user(users, login):\n    for u in users:\n        if u[\"login\"] == login:\n            return u\n    return None\n\ndef user_city(users, login):\n    user = find_user(users, login)\n    if user is None:\n        return \"белгісіз\"\n    return user[\"city\"]\n",
   "hints": [
    "Нәтижені айнымалыға сақтап, <code>if user is None:</code> тексеріңіз.",
    "Қате <code>find_user</code>-та емес: ол <code>None</code>-ды дұрыс қайтарады."
   ],
   "check": {
    "tests": "_us = [{\"login\": \"dana\", \"city\": \"Алматы\"}, {\"login\": \"erlan\", \"city\": \"Атырау\"}]\nassert user_city(_us, \"erlan\") == \"Атырау\", \"user_city(_us, 'erlan') 'Атырау' болуы керек\"\nassert user_city(_us, \"tim\") == \"белгісіз\", \"Жоқ пайдаланушы: 'белгісіз'\"\nassert user_city([], \"dana\") == \"белгісіз\", \"Бос тізім: 'белгісіз'\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "PEP 8 бойынша атау",
   "prompt": "Код жұмыс істейді, бірақ атаулары PEP 8-ге сай емес. Үш атауды өзгертіңіз: константа <code>freeLimit</code> → <code>FREE_DELIVERY_LIMIT</code>, функция <code>DeliveryCost</code> → <code>delivery_cost</code>, класс <code>order_service</code> → <code>OrderService</code>. Логика өзгермесін.",
   "starter": "freeLimit = 10000\n\ndef DeliveryCost(total):\n    if total >= freeLimit:\n        return 0\n    return 990\n\nclass order_service:\n    def total_price(self, items):\n        s = sum(i[\"price\"] for i in items)\n        return s + DeliveryCost(s)\n",
   "solution": "FREE_DELIVERY_LIMIT = 10000\n\ndef delivery_cost(total):\n    if total >= FREE_DELIVERY_LIMIT:\n        return 0\n    return 990\n\nclass OrderService:\n    def total_price(self, items):\n        s = sum(i[\"price\"] for i in items)\n        return s + delivery_cost(s)\n",
   "hints": [
    "Константа — <code>UPPER_CASE</code>, функция — <code>snake_case</code>, класс — <code>CamelCase</code>.",
    "Атауды қолданылған жерлерде де ауыстырыңыз."
   ],
   "check": {
    "tests": "assert \"FREE_DELIVERY_LIMIT\" in dir() and FREE_DELIVERY_LIMIT == 10000, \"Константа FREE_DELIVERY_LIMIT = 10000 болуы керек\"\nassert \"delivery_cost\" in dir() and \"OrderService\" in dir(), \"delivery_cost функциясы және OrderService класы керек\"\nassert \"freeLimit\" not in dir() and \"DeliveryCost\" not in dir() and \"order_service\" not in dir(), \"Ескі атаулар қалмауы керек\"\nassert delivery_cost(12000) == 0 and delivery_cost(5000) == 990, \"Логика өзгермеуі керек\"\nassert OrderService().total_price([{\"price\": 3000}, {\"price\": 2000}]) == 5990, \"5000 + 990 = 5990\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Орташа рейтингті түзету",
   "prompt": "<code>average_rating(reviews)</code> пікірлердің орташа рейтингін қайтаруы керек. Кейбір пікірде <code>\"rating\": None</code> (баға қойылмаған) — оларды есептемеңіз. Баға қойылған пікір жоқ болса, <code>None</code> қайтарсын. Нәтиже <code>round(..., 1)</code>. Функцияға docstring жазыңыз, онда <code>rating</code> сөзі болсын. Қазіргі кодта <code>TypeError</code> және <code>ZeroDivisionError</code> бар.",
   "starter": "def average_rating(reviews):\n    total = 0\n    for r in reviews:\n        total += r[\"rating\"]\n    return round(total / len(reviews), 1)\n",
   "solution": "def average_rating(reviews):\n    \"\"\"Пікірлердің орташа rating мәнін қайтарады.\n\n    rating = None пікірлер есептелмейді; ондай болмаса None.\n    \"\"\"\n    ratings = [r[\"rating\"] for r in reviews if r[\"rating\"] is not None]\n    if not ratings:\n        return None\n    return round(sum(ratings) / len(ratings), 1)\n",
   "hints": [
    "Алдымен <code>None</code> емес рейтингтерді бөлек тізімге жинаңыз.",
    "Бос тізімде бөлуден бұрын <code>return None</code>."
   ],
   "check": {
    "tests": "assert average_rating.__doc__ and \"rating\" in average_rating.__doc__, \"Docstring керек және онда 'rating' сөзі болсын\"\n_rv = [{\"user\": \"dana\", \"rating\": 5}, {\"user\": \"ali\", \"rating\": None}, {\"user\": \"sara\", \"rating\": 4}]\nassert average_rating(_rv) == 4.5, \"None есептелмейді: (5 + 4) / 2 = 4.5\"\nassert average_rating([{\"user\": \"x\", \"rating\": None}]) is None, \"Баға қойылмаса, None\"\nassert average_rating([]) is None, \"Бос тізім: None\"\nassert average_rating([{\"rating\": 4}, {\"rating\": 4}, {\"rating\": 5}]) == 4.3, \"(4 + 4 + 5) / 3 = 4.3\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Түсінікті қате хабары",
   "prompt": "<code>parse_price(text)</code> <code>\"1 200 ₸\"</code> сияқты мәтіннен бағаны бүтін сан етіп алсын: бос орындар мен <code>₸</code> белгісі алынады. Қалған мәтін цифр болмаса (немесе бос болса), <code>ValueError</code> көтерсін, ал хабарламада бастапқы мәтін тырнақшамен көрінсін: <code>f\"Баға қате: {text!r}\"</code>. Сонда traceback-тен себеп бірден түсінікті болады.",
   "starter": "def parse_price(text):\n    return int(text)\n",
   "solution": "def parse_price(text):\n    cleaned = text.replace(\" \", \"\").replace(\"₸\", \"\")\n    if not cleaned.isdigit():\n        raise ValueError(f\"Баға қате: {text!r}\")\n    return int(cleaned)\n",
   "hints": [
    "<code>text.replace(\" \", \"\").replace(\"₸\", \"\")</code>",
    "Тексеру: <code>if not cleaned.isdigit(): raise ValueError(f\"Баға қате: {text!r}\")</code>"
   ],
   "check": {
    "tests": "assert parse_price(\"1 200 ₸\") == 1200, \"parse_price('1 200 ₸') 1200 болуы керек\"\nassert parse_price(\"450\") == 450, \"parse_price('450') 450 болуы керек\"\nfor _bad in (\"бір мың\", \"\", \"12,5 ₸\"):\n    _msg = None\n    try:\n        parse_price(_bad)\n    except ValueError as _e:\n        _msg = str(_e)\n    assert _msg == f\"Баға қате: {_bad!r}\", f\"parse_price({_bad!r}) хабарламасы 'Баға қате: {_bad!r}' болатын ValueError беруі керек\""
   }
  }
 ],
 "pyb-3": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ресурс жолы",
   "prompt": "<code>resource_path(resource, item_id=None, version=1)</code> REST жолын құрсын: <code>resource_path(\"products\")</code> → <code>\"/v1/products\"</code>, <code>resource_path(\"products\", 42)</code> → <code>\"/v1/products/42\"</code>, <code>resource_path(\"orders\", version=2)</code> → <code>\"/v2/orders\"</code>.",
   "starter": "def resource_path(resource, item_id=None, version=1):\n    return \"/\" + resource\n",
   "solution": "def resource_path(resource, item_id=None, version=1):\n    path = f\"/v{version}/{resource}\"\n    if item_id is not None:\n        path += f\"/{item_id}\"\n    return path\n",
   "hints": [
    "<code>f\"/v{version}/{resource}\"</code>",
    "<code>item_id</code> берілсе ғана соңына <code>/42</code> қосыңыз."
   ],
   "check": {
    "tests": "assert resource_path(\"products\") == \"/v1/products\", \"resource_path('products') '/v1/products' болуы керек\"\nassert resource_path(\"products\", 42) == \"/v1/products/42\", \"resource_path('products', 42) '/v1/products/42' болуы керек\"\nassert resource_path(\"orders\", version=2) == \"/v2/orders\", \"resource_path('orders', version=2) '/v2/orders' болуы керек\"\nassert resource_path(\"gift-cards\", 0) == \"/v1/gift-cards/0\", \"id = 0 да жазылуы керек\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Етістік бар URL",
   "prompt": "REST-те URL-да етістік болмайды. <code>is_restful(path)</code> функциясы path-тің кез келген бөлігі (<code>/</code> арқылы бөлінген) <code>get</code>, <code>create</code>, <code>update</code> немесе <code>delete</code> сөзінен басталса (регистрге қарамай) <code>False</code>, әйтпесе <code>True</code> қайтарсын. <code>is_restful(\"/deleteUser/5\")</code> → <code>False</code>.",
   "starter": "def is_restful(path):\n    return True\n",
   "solution": "VERBS = (\"get\", \"create\", \"update\", \"delete\")\n\ndef is_restful(path):\n    for part in path.strip(\"/\").split(\"/\"):\n        if part.lower().startswith(VERBS):\n            return False\n    return True\n",
   "hints": [
    "<code>path.strip(\"/\").split(\"/\")</code> бөліктерді береді.",
    "<code>startswith</code> кортеж қабылдайды: <code>part.lower().startswith((\"get\", \"create\", ...))</code>"
   ],
   "check": {
    "tests": "assert is_restful(\"/deleteUser/5\") is False, \"/deleteUser/5 — REST емес\"\nassert is_restful(\"/v1/getProducts\") is False, \"/v1/getProducts — REST емес\"\nassert is_restful(\"/v1/products/42\") is True, \"/v1/products/42 — дұрыс REST жолы\"\nassert is_restful(\"/shops/3/orders\") is True, \"/shops/3/orders — дұрыс\"\nassert is_restful(\"/gift-cards\") is True, \"/gift-cards — дұрыс\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Сәтті status code",
   "prompt": "<code>success_status(method)</code> CRUD сұрауына сәтті жауаптың кодын қайтарсын: <code>GET</code>, <code>PUT</code>, <code>PATCH</code> → 200, <code>POST</code> → 201, <code>DELETE</code> → 204. Басқа метод болса <code>ValueError</code>.",
   "starter": "def success_status(method):\n    return 200\n",
   "solution": "CODES = {\"GET\": 200, \"PUT\": 200, \"PATCH\": 200, \"POST\": 201, \"DELETE\": 204}\n\ndef success_status(method):\n    if method not in CODES:\n        raise ValueError(\"белгісіз метод: \" + method)\n    return CODES[method]\n",
   "hints": [
    "Сөздік ыңғайлы: <code>{\"GET\": 200, \"POST\": 201, ...}</code>.",
    "Жоқ метод үшін <code>raise ValueError(...)</code>."
   ],
   "check": {
    "tests": "assert success_status(\"POST\") == 201, \"POST → 201 Created\"\nassert success_status(\"DELETE\") == 204, \"DELETE → 204 No Content\"\nassert success_status(\"GET\") == 200 and success_status(\"PATCH\") == 200 and success_status(\"PUT\") == 200, \"GET, PUT, PATCH → 200\"\n_ok = False\ntry:\n    success_status(\"FETCH\")\nexcept ValueError:\n    _ok = True\nassert _ok, \"Белгісіз метод: ValueError\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Сұрыптау параметрі",
   "prompt": "Query string-тегі <code>sort</code> параметрі бойынша тізімді сұрыптаймыз: <code>\"price\"</code> — өсу ретімен, <code>\"-price\"</code> — кему ретімен. <code>apply_sort(items, sort)</code> жаңа сұрыпталған тізім қайтарсын. <code>sort</code> <code>None</code> болса, тізім өзгермейді. Объектілерде жоқ өріс берілсе — <code>ValueError</code>.",
   "starter": "def apply_sort(items, sort):\n    return items\n",
   "solution": "def apply_sort(items, sort):\n    if sort is None:\n        return list(items)\n    desc = sort.startswith(\"-\")\n    field = sort.lstrip(\"-\")\n    if items and field not in items[0]:\n        raise ValueError(\"белгісіз өріс: \" + field)\n    return sorted(items, key=lambda it: it[field], reverse=desc)\n",
   "hints": [
    "Минус белгісін тексеріңіз: <code>desc = sort.startswith(\"-\")</code>, өріс: <code>sort.lstrip(\"-\")</code>.",
    "<code>sorted(items, key=lambda it: it[field], reverse=desc)</code>"
   ],
   "check": {
    "tests": "_p = [{\"name\": \"Шапан\", \"price\": 45000}, {\"name\": \"Кесе\", \"price\": 1500}, {\"name\": \"Домбыра\", \"price\": 30000}]\nassert [x[\"name\"] for x in apply_sort(_p, \"price\")] == [\"Кесе\", \"Домбыра\", \"Шапан\"], \"sort=price: өсу реті\"\nassert [x[\"name\"] for x in apply_sort(_p, \"-price\")] == [\"Шапан\", \"Домбыра\", \"Кесе\"], \"sort=-price: кему реті\"\nassert apply_sort(_p, None) == _p, \"sort жоқ болса, тізім өзгермейді\"\nassert _p[0][\"name\"] == \"Шапан\", \"Бастапқы тізім өзгермеуі керек\"\n_ok = False\ntry:\n    apply_sort(_p, \"rating\")\nexcept ValueError:\n    _ok = True\nassert _ok, \"Жоқ өріс бойынша сұрыптау: ValueError\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Сүзгі параметрлері",
   "prompt": "<code>filter_items(items, query)</code> query сөздігіндегі (мәндері жол) <b>барлық</b> шартқа сай элементтерді бастапқы ретпен қайтарсын: элементтегі өріс мәнін <code>str(...)</code> етіп салыстырыңыз. Элементте өріс жоқ болса, ол сәйкес келмейді. <code>query</code> бос болса, бәрі қайтады.",
   "starter": "def filter_items(items, query):\n    return items\n",
   "solution": "def filter_items(items, query):\n    result = []\n    for it in items:\n        if all(k in it and str(it[k]) == v for k, v in query.items()):\n            result.append(it)\n    return result\n",
   "hints": [
    "Әр элемент үшін <code>all(...)</code> арқылы барлық шартты тексеріңіз.",
    "Шарт: <code>k in it and str(it[k]) == v</code>"
   ],
   "check": {
    "tests": "_cafes = [{\"id\": 1, \"city\": \"Алматы\", \"wifi\": True}, {\"id\": 2, \"city\": \"Астана\", \"wifi\": True}, {\"id\": 3, \"city\": \"Алматы\", \"wifi\": False}, {\"id\": 4, \"name\": \"Bean\"}]\nassert [c[\"id\"] for c in filter_items(_cafes, {\"city\": \"Алматы\"})] == [1, 3], \"city=Алматы: id 1 және 3\"\nassert [c[\"id\"] for c in filter_items(_cafes, {\"city\": \"Алматы\", \"wifi\": \"True\"})] == [1], \"Екі шарт: тек id 1\"\nassert [c[\"id\"] for c in filter_items(_cafes, {\"id\": \"2\"})] == [2], \"Сан да жол ретінде салыстырылады: id=2\"\nassert len(filter_items(_cafes, {})) == 4, \"Сүзгісіз: барлығы\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Идемпотенттілік кілті",
   "prompt": "Төлем API-ы <code>Idempotency-Key</code> қолданады. <code>PaymentAPI</code> класын жазыңыз: <code>payments</code> — жасалған төлемдер тізімі, <code>seen</code> — кілт → жауап. <code>post(key, amount)</code>: кілт бұрын келсе, <b>сол</b> жауапты қайтарады (жаңа төлем жасалмайды); әйтпесе <code>{\"id\": n, \"amount\": amount}</code> төлемін жасап (<code>n</code> 1-ден өседі), <code>(201, төлем)</code> жауабын сақтап, қайтарады.",
   "starter": "class PaymentAPI:\n    def __init__(self):\n        self.payments = []\n\n    def post(self, key, amount):\n        payment = {\"id\": len(self.payments) + 1, \"amount\": amount}\n        self.payments.append(payment)\n        return 201, payment\n",
   "solution": "class PaymentAPI:\n    def __init__(self):\n        self.payments = []\n        self.seen = {}\n\n    def post(self, key, amount):\n        if key in self.seen:\n            return self.seen[key]\n        payment = {\"id\": len(self.payments) + 1, \"amount\": amount}\n        self.payments.append(payment)\n        response = (201, payment)\n        self.seen[key] = response\n        return response\n",
   "hints": [
    "Басында тексеріңіз: <code>if key in self.seen: return self.seen[key]</code>.",
    "Жаңа жауапты <code>self.seen[key]</code>-ге сақтаңыз."
   ],
   "check": {
    "tests": "_api = PaymentAPI()\n_r1 = _api.post(\"k-1\", 5000)\nassert _r1 == (201, {\"id\": 1, \"amount\": 5000}), \"Бірінші сұрау: (201, {'id': 1, 'amount': 5000})\"\nassert _api.post(\"k-1\", 5000) == _r1, \"Қайталанған кілт бұрынғы жауапты қайтаруы керек\"\nassert len(_api.payments) == 1, \"Қайталау жаңа төлем жасамауы керек\"\nassert _api.post(\"k-2\", 700) == (201, {\"id\": 2, \"amount\": 700}), \"Жаңа кілт: жаңа төлем id 2\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Қате жауап үлгісі",
   "prompt": "Барлық қате бір үлгіде қайтсын. <code>error(status, message)</code> <code>(status, {\"error\": {\"code\": CODES[status], \"message\": message}})</code> қайтарсын (<code>CODES</code> берілген). Сосын <code>get_product(products, pid)</code> handler-ін жазыңыз: <code>pid</code> жолы цифр болмаса <code>error(400, \"id сан болуы керек\")</code>; тауар (<code>products</code> — int id → тауар) табылмаса <code>error(404, \"Тауар табылмады\")</code>; әйтпесе <code>(200, тауар)</code>.",
   "starter": "CODES = {400: \"bad_request\", 404: \"not_found\", 409: \"conflict\", 422: \"validation_error\"}\n\ndef error(status, message):\n    return status, {\"error\": message}\n\ndef get_product(products, pid):\n    return 200, products[int(pid)]\n",
   "solution": "CODES = {400: \"bad_request\", 404: \"not_found\", 409: \"conflict\", 422: \"validation_error\"}\n\ndef error(status, message):\n    return status, {\"error\": {\"code\": CODES[status], \"message\": message}}\n\ndef get_product(products, pid):\n    if not pid.isdigit():\n        return error(400, \"id сан болуы керек\")\n    product = products.get(int(pid))\n    if product is None:\n        return error(404, \"Тауар табылмады\")\n    return 200, product\n",
   "hints": [
    "<code>error</code> ішкі сөздік қайтарады: <code>{\"error\": {\"code\": ..., \"message\": ...}}</code>.",
    "Алдымен <code>pid.isdigit()</code>, сосын <code>products.get(int(pid))</code>."
   ],
   "check": {
    "tests": "assert error(409, \"Бұл email бос емес\") == (409, {\"error\": {\"code\": \"conflict\", \"message\": \"Бұл email бос емес\"}}), \"error(409, ...) үлгісі дұрыс емес\"\n_ps = {7: {\"id\": 7, \"name\": \"Қымыз\", \"price\": 900}}\nassert get_product(_ps, \"7\") == (200, {\"id\": 7, \"name\": \"Қымыз\", \"price\": 900}), \"Бар тауар: 200\"\nassert get_product(_ps, \"8\") == (404, {\"error\": {\"code\": \"not_found\", \"message\": \"Тауар табылмады\"}}), \"Жоқ тауар: 404 және бірыңғай үлгі\"\nassert get_product(_ps, \"abc\") == (400, {\"error\": {\"code\": \"bad_request\", \"message\": \"id сан болуы керек\"}}), \"Сан емес id: 400\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Толық CRUD қоймасы",
   "prompt": "<code>ProductStore</code> класын жазыңыз (әр әдіс <code>(status, body)</code> қайтарады). <code>create(data)</code>: id береді (1-ден), <code>(201, объект)</code>. <code>get(pid)</code>: <code>(200, объект)</code> немесе <code>(404, {\"error\": \"not found\"})</code>. <code>patch(pid, changes)</code>: берілген өрістерді жаңартады (<code>id</code>-ді өзгертпейді), <code>(200, объект)</code> немесе 404. <code>delete(pid)</code>: <code>(204, None)</code> немесе 404. <code>list(page=1, per_page=2)</code>: <code>(200, {\"items\": [...], \"total\": N})</code> id реті бойынша.",
   "starter": "class ProductStore:\n    def __init__(self):\n        self.rows = {}\n",
   "solution": "class ProductStore:\n    NOT_FOUND = (404, {\"error\": \"not found\"})\n\n    def __init__(self):\n        self.rows = {}\n        self.next_id = 1\n\n    def create(self, data):\n        obj = dict(data)\n        obj[\"id\"] = self.next_id\n        self.rows[self.next_id] = obj\n        self.next_id += 1\n        return 201, obj\n\n    def get(self, pid):\n        if pid not in self.rows:\n            return self.NOT_FOUND\n        return 200, self.rows[pid]\n\n    def patch(self, pid, changes):\n        if pid not in self.rows:\n            return self.NOT_FOUND\n        for k, v in changes.items():\n            if k != \"id\":\n                self.rows[pid][k] = v\n        return 200, self.rows[pid]\n\n    def delete(self, pid):\n        if pid not in self.rows:\n            return self.NOT_FOUND\n        del self.rows[pid]\n        return 204, None\n\n    def list(self, page=1, per_page=2):\n        items = [self.rows[k] for k in sorted(self.rows)]\n        start = (page - 1) * per_page\n        return 200, {\"items\": items[start:start + per_page], \"total\": len(items)}\n",
   "hints": [
    "Деректерді <code>self.rows</code> сөздігінде (id → объект), келесі id-ді <code>self.next_id</code>-де сақтаңыз.",
    "Пагинация: <code>start = (page - 1) * per_page</code>, <code>items[start:start + per_page]</code>."
   ],
   "check": {
    "tests": "_s = ProductStore()\nassert _s.create({\"name\": \"Шапан\", \"price\": 45000}) == (201, {\"name\": \"Шапан\", \"price\": 45000, \"id\": 1}), \"create: 201 және id 1\"\n_s.create({\"name\": \"Кесе\", \"price\": 1500}); _s.create({\"name\": \"Тақия\", \"price\": 6000})\nassert _s.get(2) == (200, {\"name\": \"Кесе\", \"price\": 1500, \"id\": 2}), \"get(2): 200\"\nassert _s.get(9) == (404, {\"error\": \"not found\"}), \"get(9): 404\"\nassert _s.patch(2, {\"price\": 1800, \"id\": 99}) == (200, {\"name\": \"Кесе\", \"price\": 1800, \"id\": 2}), \"patch: бағасы өзгереді, id өзгермейді\"\nassert _s.patch(9, {\"price\": 1})[0] == 404, \"Жоқ объектіні patch: 404\"\nassert _s.delete(1) == (204, None) and _s.delete(1)[0] == 404, \"delete: 204, қайталанса 404\"\n_st, _b = _s.list(page=1, per_page=1)\nassert _st == 200 and _b[\"total\"] == 2 and [x[\"id\"] for x in _b[\"items\"]] == [2], \"list(1, 1): бірінші бет, total 2\"\nassert [x[\"id\"] for x in _s.list(page=2, per_page=1)[1][\"items\"]] == [3], \"list(2, 1): екінші бет id 3\""
   }
  }
 ],
 "pyb-4": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Path бөліктері",
   "prompt": "<code>split_path(path)</code> path-ты бөліктер тізіміне айналдырсын: басы мен соңындағы <code>/</code> маңызды емес. <code>split_path(\"/cafes/7/menu/\")</code> → <code>[\"cafes\", \"7\", \"menu\"]</code>. Түбір <code>\"/\"</code> үшін <code>[]</code> қайтарсын.",
   "starter": "def split_path(path):\n    return path.split(\"/\")\n",
   "solution": "def split_path(path):\n    stripped = path.strip(\"/\")\n    if not stripped:\n        return []\n    return stripped.split(\"/\")\n",
   "hints": [
    "<code>path.strip(\"/\")</code> шеткі қиғаш сызықтарды алады.",
    "Бос жолды бөлсеңіз <code>[\"\"]</code> шығады, сондықтан оны бөлек тексеріңіз."
   ],
   "check": {
    "tests": "assert split_path(\"/cafes/7/menu/\") == [\"cafes\", \"7\", \"menu\"], \"split_path('/cafes/7/menu/') ['cafes', '7', 'menu'] болуы керек\"\nassert split_path(\"users/42\") == [\"users\", \"42\"], \"Басында / болмаса да жұмыс істейді\"\nassert split_path(\"/\") == [] and split_path(\"\") == [], \"Түбір: []\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Параметр бөлігі ме",
   "prompt": "Маршрут үлгісінде <code>&lt;id&gt;</code> сияқты бөлік — параметр. <code>param_name(part)</code> функциясы бөлік <code>&lt;</code> белгісінен басталып, <code>&gt;</code> белгісімен аяқталса, ішіндегі атауды қайтарсын, әйтпесе <code>None</code>. <code>param_name(\"&lt;cafe_id&gt;\")</code> → <code>\"cafe_id\"</code>.",
   "starter": "def param_name(part):\n    return part\n",
   "solution": "def param_name(part):\n    if part.startswith(\"<\") and part.endswith(\">\"):\n        return part[1:-1]\n    return None\n",
   "hints": [
    "<code>part.startswith(\"<\") and part.endswith(\">\")</code>",
    "Ішіндегі атау: <code>part[1:-1]</code>"
   ],
   "check": {
    "tests": "assert param_name(\"<cafe_id>\") == \"cafe_id\", \"param_name('<cafe_id>') 'cafe_id' болуы керек\"\nassert param_name(\"menu\") is None, \"Тұрақты бөлік: None\"\nassert param_name(\"<id\") is None, \"> жоқ болса: None\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Маршрут тіркеу",
   "prompt": "<code>ROUTES</code> — бос сөздік. Параметрлі <code>route(path)</code> декораторын жазыңыз: ол функцияны <code>ROUTES[path]</code>-ке тіркеп, функцияның <b>өзін</b> өзгертпей қайтарсын.",
   "starter": "ROUTES = {}\n\ndef route(path):\n    def decorator(func):\n        pass\n    return decorator\n",
   "solution": "ROUTES = {}\n\ndef route(path):\n    def decorator(func):\n        ROUTES[path] = func\n        return func\n    return decorator\n",
   "hints": [
    "Ішкі <code>decorator(func)</code> ішінде <code>ROUTES[path] = func</code>.",
    "<code>return func</code>-ты ұмытпаңыз, әйтпесе атау <code>None</code> болып қалады."
   ],
   "check": {
    "tests": "@route(\"/health\")\ndef _health():\n    return 200, {\"status\": \"ok\"}\n@route(\"/cafes\")\ndef _cafes():\n    return 200, [\"Kofe Bar\"]\nassert _health is not None and _health() == (200, {\"status\": \"ok\"}), \"Декоратор функцияны өзгертпей қайтаруы керек\"\nassert ROUTES.get(\"/health\") is _health and ROUTES.get(\"/cafes\") is _cafes, \"Функциялар ROUTES сөздігіне тіркелуі керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Allow header-і",
   "prompt": "405 жауабында <code>Allow</code> header-і рұқсат етілген методтарды айтады. <code>routes</code> — <code>(pattern, methods)</code> кортеждерінің тізімі. <code>allowed_methods(routes, path)</code> берілген path-қа сәйкес келетін барлық маршруттардың методтарын біріктіріп, әліпби бойынша <code>\"GET, POST\"</code> түріндегі жол етіп қайтарсын (path жоқ болса — <code>\"\"</code>). <code>match_path</code> дайын.",
   "starter": "def match_path(pattern, path):\n    p_parts = pattern.strip(\"/\").split(\"/\")\n    parts = path.strip(\"/\").split(\"/\")\n    if len(p_parts) != len(parts):\n        return None\n    params = {}\n    for p, v in zip(p_parts, parts):\n        if p.startswith(\"<\") and p.endswith(\">\"):\n            params[p[1:-1]] = v\n        elif p != v:\n            return None\n    return params\n\ndef allowed_methods(routes, path):\n    return \"\"\n",
   "solution": "def match_path(pattern, path):\n    p_parts = pattern.strip(\"/\").split(\"/\")\n    parts = path.strip(\"/\").split(\"/\")\n    if len(p_parts) != len(parts):\n        return None\n    params = {}\n    for p, v in zip(p_parts, parts):\n        if p.startswith(\"<\") and p.endswith(\">\"):\n            params[p[1:-1]] = v\n        elif p != v:\n            return None\n    return params\n\ndef allowed_methods(routes, path):\n    methods = set()\n    for pattern, ms in routes:\n        if match_path(pattern, path) is not None:\n            methods |= set(ms)\n    return \", \".join(sorted(methods))\n",
   "hints": [
    "Сәйкес келетін маршруттардың методтарын бір жиынға жинаңыз: <code>methods |= set(ms)</code>.",
    "<code>\", \".join(sorted(methods))</code>"
   ],
   "check": {
    "tests": "_rs = [(\"/orders\", [\"POST\"]), (\"/orders\", [\"GET\"]), (\"/orders/<id>\", [\"GET\", \"DELETE\", \"PATCH\"]), (\"/health\", [\"GET\"])]\nassert allowed_methods(_rs, \"/orders\") == \"GET, POST\", \"/orders үшін 'GET, POST'\"\nassert allowed_methods(_rs, \"/orders/15\") == \"DELETE, GET, PATCH\", \"/orders/15 үшін 'DELETE, GET, PATCH'\"\nassert allowed_methods(_rs, \"/buses\") == \"\", \"Path жоқ болса, бос жол\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Маршрут реті",
   "prompt": "<code>/users/me</code> мен <code>/users/&lt;id&gt;</code> маршруттары бар. <code>resolve(routes, path)</code> тізімдегі ретпен бірінші сәйкес келген маршруттың handler атауын және параметрлерін <code>(name, params)</code> ретінде қайтарсын, табылмаса <code>None</code>. Сосын <code>ROUTES</code> тізімін <b>дұрыс ретпен</b> толтырыңыз: <code>/users/me</code> → <code>\"me\"</code>, <code>/users/&lt;id&gt;</code> → <code>\"user\"</code>, сонда <code>me</code> id ретінде ұсталмайды.",
   "starter": "def match_path(pattern, path):\n    p_parts = pattern.strip(\"/\").split(\"/\")\n    parts = path.strip(\"/\").split(\"/\")\n    if len(p_parts) != len(parts):\n        return None\n    params = {}\n    for p, v in zip(p_parts, parts):\n        if p.startswith(\"<\") and p.endswith(\">\"):\n            params[p[1:-1]] = v\n        elif p != v:\n            return None\n    return params\n\nROUTES = [(\"/users/<id>\", \"user\"), (\"/users/me\", \"me\")]\n\ndef resolve(routes, path):\n    return None\n",
   "solution": "def match_path(pattern, path):\n    p_parts = pattern.strip(\"/\").split(\"/\")\n    parts = path.strip(\"/\").split(\"/\")\n    if len(p_parts) != len(parts):\n        return None\n    params = {}\n    for p, v in zip(p_parts, parts):\n        if p.startswith(\"<\") and p.endswith(\">\"):\n            params[p[1:-1]] = v\n        elif p != v:\n            return None\n    return params\n\nROUTES = [(\"/users/me\", \"me\"), (\"/users/<id>\", \"user\")]\n\ndef resolve(routes, path):\n    for pattern, name in routes:\n        params = match_path(pattern, path)\n        if params is not None:\n            return name, params\n    return None\n",
   "hints": [
    "Нақты маршрут (<code>/users/me</code>) параметрлі маршруттан бұрын тұруы керек.",
    "Циклде бірінші <code>params is not None</code> болғанда бірден қайтарыңыз."
   ],
   "check": {
    "tests": "assert resolve(ROUTES, \"/users/me\") == (\"me\", {}), \"/users/me → ('me', {}): нақты маршрут бірінші тұруы керек\"\nassert resolve(ROUTES, \"/users/42\") == (\"user\", {\"id\": \"42\"}), \"/users/42 → ('user', {'id': '42'})\"\nassert resolve(ROUTES, \"/cafes\") is None, \"Табылмаса, None\"\nassert resolve([(\"/a/<x>\", \"first\"), (\"/a/<y>\", \"second\")], \"/a/1\") == (\"first\", {\"x\": \"1\"}), \"Тізімдегі бірінші сәйкестік алынады\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Query-ді елемеу",
   "prompt": "<code>route_key(method, path)</code> сұрауды роутер кестесінің кілтіне айналдырсын: метод бас әріппен, path-тан query string (<code>?</code> және одан кейінгі бөлік) алынсын, соңғы <code>/</code> алынсын (түбір <code>\"/\"</code> күйінде қалады). <code>route_key(\"get\", \"/cafes/?city=Алматы\")</code> → <code>(\"GET\", \"/cafes\")</code>.",
   "starter": "def route_key(method, path):\n    return method, path\n",
   "solution": "def route_key(method, path):\n    clean = path.split(\"?\", 1)[0]\n    if clean != \"/\":\n        clean = clean.rstrip(\"/\")\n    return method.upper(), clean or \"/\"\n",
   "hints": [
    "Query-ді алу: <code>path.split(\"?\", 1)[0]</code>.",
    "Соңғы <code>/</code>: <code>rstrip(\"/\")</code>, бірақ түбірді сақтаңыз."
   ],
   "check": {
    "tests": "assert route_key(\"get\", \"/cafes/?city=Алматы\") == (\"GET\", \"/cafes\"), \"route_key('get', '/cafes/?city=Алматы') ('GET', '/cafes') болуы керек\"\nassert route_key(\"POST\", \"/orders\") == (\"POST\", \"/orders\"), \"Өзгеріссіз: ('POST', '/orders')\"\nassert route_key(\"get\", \"/?page=2\") == (\"GET\", \"/\"), \"Түбір '/' күйінде қалады\"\nassert route_key(\"delete\", \"/orders/15/\") == (\"DELETE\", \"/orders/15\"), \"Соңғы / алынады\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Бірнеше түрлендіргіш",
   "prompt": "<code>match_conv(pattern, path)</code> <code>match_path</code> сияқты жұмыс істесін, бірақ үш түрлендіргішті қолдасын: <code>&lt;int:n&gt;</code> — тек цифрлар, <code>int</code>-ке айналады; <code>&lt;slug:s&gt;</code> — кіші латын әріптері, цифрлар және дефис (бос емес); <code>&lt;name&gt;</code> — кез келген бос емес мән (жол). Сәйкес келмесе <code>None</code>.",
   "starter": "def match_conv(pattern, path):\n    return None\n",
   "solution": "SLUG_CHARS = set(\"abcdefghijklmnopqrstuvwxyz0123456789-\")\n\ndef match_conv(pattern, path):\n    p_parts = pattern.strip(\"/\").split(\"/\")\n    parts = path.strip(\"/\").split(\"/\")\n    if len(p_parts) != len(parts):\n        return None\n    params = {}\n    for p, v in zip(p_parts, parts):\n        if p.startswith(\"<\") and p.endswith(\">\"):\n            inner = p[1:-1]\n            if v == \"\":\n                return None\n            if inner.startswith(\"int:\"):\n                if not v.isdigit():\n                    return None\n                params[inner[4:]] = int(v)\n            elif inner.startswith(\"slug:\"):\n                if not set(v) <= SLUG_CHARS:\n                    return None\n                params[inner[5:]] = v\n            else:\n                params[inner] = v\n        elif p != v:\n            return None\n    return params\n",
   "hints": [
    "Бөліктің ішін <code>inner = p[1:-1]</code> алып, <code>\"int:\"</code> және <code>\"slug:\"</code> префикстерін тексеріңіз.",
    "Slug тексеру: <code>set(v) <= set(\"abc...z0123456789-\")</code>"
   ],
   "check": {
    "tests": "assert match_conv(\"/shops/<slug:shop>/orders/<int:n>\", \"/shops/almaty-1/orders/77\") == {\"shop\": \"almaty-1\", \"n\": 77}, \"slug және int бірге\"\nassert match_conv(\"/shops/<slug:shop>\", \"/shops/Almaty\") is None, \"Бас әріп slug-қа жатпайды\"\nassert match_conv(\"/orders/<int:n>\", \"/orders/7a\") is None, \"Цифр емес: None\"\nassert match_conv(\"/cities/<name>\", \"/cities/Қостанай\") == {\"name\": \"Қостанай\"}, \"Қарапайым параметр кез келген мәнді алады\"\nassert match_conv(\"/cities/<name>\", \"/cities//\") is None, \"Бос мән сәйкес келмейді\"\nassert match_conv(\"/health\", \"/health\") == {}, \"Параметрсіз: {}\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Префиксті роутер",
   "prompt": "<code>Router(prefix)</code> класын жазыңыз (Flask-тағы Blueprint сияқты). <code>route(pattern, methods=(\"GET\",))</code> декораторы handler-ді <code>prefix + pattern</code> үлгісімен тіркеп, функцияны өзгертпей қайтарсын. <code>handle(method, path)</code> сәйкес handler-ді <code>**params</code> арқылы шақырып, нәтижесін қайтарсын; path бар, метод жоқ болса <code>(405, {\"error\": \"method not allowed\"})</code>; path жоқ болса <code>(404, {\"error\": \"not found\"})</code>. <code>match_path</code> дайын.",
   "starter": "def match_path(pattern, path):\n    p_parts = pattern.strip(\"/\").split(\"/\")\n    parts = path.strip(\"/\").split(\"/\")\n    if len(p_parts) != len(parts):\n        return None\n    params = {}\n    for p, v in zip(p_parts, parts):\n        if p.startswith(\"<\") and p.endswith(\">\"):\n            params[p[1:-1]] = v\n        elif p != v:\n            return None\n    return params\n\nclass Router:\n    def __init__(self, prefix):\n        self.prefix = prefix\n        self.routes = []\n",
   "solution": "def match_path(pattern, path):\n    p_parts = pattern.strip(\"/\").split(\"/\")\n    parts = path.strip(\"/\").split(\"/\")\n    if len(p_parts) != len(parts):\n        return None\n    params = {}\n    for p, v in zip(p_parts, parts):\n        if p.startswith(\"<\") and p.endswith(\">\"):\n            params[p[1:-1]] = v\n        elif p != v:\n            return None\n    return params\n\nclass Router:\n    def __init__(self, prefix):\n        self.prefix = prefix\n        self.routes = []\n\n    def route(self, pattern, methods=(\"GET\",)):\n        def decorator(func):\n            self.routes.append((self.prefix + pattern, set(methods), func))\n            return func\n        return decorator\n\n    def handle(self, method, path):\n        found = False\n        for pattern, methods, func in self.routes:\n            params = match_path(pattern, path)\n            if params is None:\n                continue\n            found = True\n            if method in methods:\n                return func(**params)\n        if found:\n            return 405, {\"error\": \"method not allowed\"}\n        return 404, {\"error\": \"not found\"}\n",
   "hints": [
    "Тіркегенде үлгіге префиксті жалғаңыз: <code>self.prefix + pattern</code>.",
    "<code>handle</code>: path табылды ма деген жалаушаны сақтап, 404 мен 405-ті ажыратыңыз."
   ],
   "check": {
    "tests": "_api = Router(\"/api/v1\")\n@_api.route(\"/buses/<num>\")\ndef _bus(num):\n    return 200, {\"bus\": num}\n@_api.route(\"/tickets\", methods=[\"POST\"])\ndef _buy():\n    return 201, {\"ticket\": 1}\nassert _bus(\"92\") == (200, {\"bus\": \"92\"}), \"Декоратор функцияны өзгертпей қайтаруы керек\"\nassert _api.handle(\"GET\", \"/api/v1/buses/92\") == (200, {\"bus\": \"92\"}), \"Префикс қосылған жол: 200\"\nassert _api.handle(\"GET\", \"/buses/92\") == (404, {\"error\": \"not found\"}), \"Префикссіз жол: 404\"\nassert _api.handle(\"POST\", \"/api/v1/tickets\") == (201, {\"ticket\": 1}), \"POST /api/v1/tickets: 201\"\nassert _api.handle(\"GET\", \"/api/v1/tickets\") == (405, {\"error\": \"method not allowed\"}), \"Метод жоқ: 405\""
   }
  }
 ],
 "pyb-5": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "JSON оқылды ма",
   "prompt": "<code>read_json(raw_body)</code> body-ді <code>json.loads</code> арқылы оқысын. Оқылмаса (<code>json.JSONDecodeError</code>) <code>(400, {\"error\": \"invalid json\"})</code>, оқылса <code>(200, data)</code> қайтарсын.",
   "starter": "import json\n\ndef read_json(raw_body):\n    return 200, json.loads(raw_body)\n",
   "solution": "import json\n\ndef read_json(raw_body):\n    try:\n        data = json.loads(raw_body)\n    except json.JSONDecodeError:\n        return 400, {\"error\": \"invalid json\"}\n    return 200, data\n",
   "hints": [
    "<code>try: data = json.loads(raw_body)</code>",
    "<code>except json.JSONDecodeError: return 400, {\"error\": \"invalid json\"}</code>"
   ],
   "check": {
    "tests": "assert read_json('{\"name\": \"Дана\"}') == (200, {\"name\": \"Дана\"}), \"Дұрыс JSON: (200, data)\"\nassert read_json('{\"name\": \"Дана\",') == (400, {\"error\": \"invalid json\"}), \"Бұзық JSON: 400\"\nassert read_json(\"\") == (400, {\"error\": \"invalid json\"}), \"Бос body: 400\"\nassert read_json(\"[1, 2]\") == (200, [1, 2]), \"Тізім де дұрыс JSON\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бүтін сан тексеру",
   "prompt": "<code>is_int(value)</code> мән шын бүтін сан болса <code>True</code> қайтарсын. Есіңізде болсын: <code>isinstance(True, int)</code> Python-да <code>True</code>, сондықтан <code>bool</code>-ды бөлек алып тастаңыз. Жол түріндегі сан (<code>\"5\"</code>) да жарамайды.",
   "starter": "def is_int(value):\n    return isinstance(value, int)\n",
   "solution": "def is_int(value):\n    return isinstance(value, int) and not isinstance(value, bool)\n",
   "hints": [
    "<code>isinstance(value, int)</code> True мен False үшін де <code>True</code> береді.",
    "<code>and not isinstance(value, bool)</code> қосыңыз."
   ],
   "check": {
    "tests": "assert is_int(5) is True and is_int(-3) is True and is_int(0) is True, \"5, -3, 0 бүтін сан\"\nassert is_int(True) is False and is_int(False) is False, \"bool бүтін сан деп есептелмейді\"\nassert is_int(\"5\") is False and is_int(5.0) is False and is_int(None) is False, \"'5', 5.0, None бүтін сан емес\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Өз қате класы",
   "prompt": "Валидация қатесіне арналған <code>ValidationError(Exception)</code> класын жазыңыз: конструкторы <code>field</code> және <code>message</code> қабылдап, екеуін де атрибут етіп сақтасын, ал <code>super().__init__</code>-ке <code>f\"{field}: {message}\"</code> жолын берсін. <code>str(ValidationError(\"age\", \"теріс\"))</code> → <code>\"age: теріс\"</code>.",
   "starter": "class ValidationError(Exception):\n    pass\n",
   "solution": "class ValidationError(Exception):\n    def __init__(self, field, message):\n        super().__init__(f\"{field}: {message}\")\n        self.field = field\n        self.message = message\n",
   "hints": [
    "<code>def __init__(self, field, message):</code>",
    "<code>super().__init__(f\"{field}: {message}\")</code>, сосын <code>self.field = field</code>."
   ],
   "check": {
    "tests": "_e = ValidationError(\"age\", \"теріс\")\nassert isinstance(_e, Exception), \"ValidationError Exception-нан мұра алуы керек\"\nassert _e.field == \"age\" and _e.message == \"теріс\", \"field пен message сақталуы керек\"\nassert str(_e) == \"age: теріс\", \"str(e) 'age: теріс' болуы керек\"\n_ok = False\ntry:\n    raise ValidationError(\"email\", \"форматы қате\")\nexcept ValidationError as _x:\n    _ok = _x.field == \"email\"\nassert _ok, \"Қатені except ValidationError арқылы ұстауға болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Тіркелу формасы",
   "prompt": "<code>validate_signup(data)</code> барлық қатені бірге жинап, сөздік қайтарсын (қате жоқ болса <code>{}</code>). Ережелер: <code>login</code> — 3–20 таңбалы жол, әйтпесе <code>\"login\": \"3-20 таңба\"</code>; <code>password</code> — кемінде 8 таңбалы жол, әйтпесе <code>\"password\": \"кемінде 8 таңба\"</code>; <code>age</code> — 14–100 бүтін сан (bool емес), әйтпесе <code>\"age\": \"14-100 бүтін сан\"</code>.",
   "starter": "def validate_signup(data):\n    if len(data[\"login\"]) < 3:\n        return {\"login\": \"3-20 таңба\"}\n    return {}\n",
   "solution": "def validate_signup(data):\n    errors = {}\n    login = data.get(\"login\")\n    if not isinstance(login, str) or not 3 <= len(login) <= 20:\n        errors[\"login\"] = \"3-20 таңба\"\n    pw = data.get(\"password\")\n    if not isinstance(pw, str) or len(pw) < 8:\n        errors[\"password\"] = \"кемінде 8 таңба\"\n    age = data.get(\"age\")\n    if not isinstance(age, int) or isinstance(age, bool) or not 14 <= age <= 100:\n        errors[\"age\"] = \"14-100 бүтін сан\"\n    return errors\n",
   "hints": [
    "Әр өрісті <code>data.get(...)</code> арқылы алыңыз: кілт жоқ болса <code>None</code> келеді.",
    "Бірінші қатеде тоқтамаңыз: барлығын <code>errors</code> сөздігіне жинаңыз."
   ],
   "check": {
    "tests": "assert validate_signup({\"login\": \"dana\", \"password\": \"qwerty123\", \"age\": 19}) == {}, \"Дұрыс деректе қате жоқ\"\nassert validate_signup({\"login\": \"ab\", \"password\": \"123\", \"age\": 10}) == {\"login\": \"3-20 таңба\", \"password\": \"кемінде 8 таңба\", \"age\": \"14-100 бүтін сан\"}, \"Үш қате бірге жиналуы керек\"\nassert validate_signup({}) == {\"login\": \"3-20 таңба\", \"password\": \"кемінде 8 таңба\", \"age\": \"14-100 бүтін сан\"}, \"Бос сөздік: үш қате\"\nassert validate_signup({\"login\": \"erlan\", \"password\": \"qwerty123\", \"age\": True}) == {\"age\": \"14-100 бүтін сан\"}, \"True жас емес\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Мәтінді тазалау",
   "prompt": "<code>clean_profile(data)</code> пайдаланушы профилін тазаласын: <code>name</code> және <code>city</code> жолдарының шетіндегі бос орындарды алып тастасын (<code>strip</code>), <code>city</code> жоқ немесе бос болса <code>\"Алматы\"</code> қойсын, <code>email</code>-ды кіші әріпке келтірсін. Басқа кілттер нәтижеге кірмесін. Бастапқы сөздік өзгермесін.",
   "starter": "def clean_profile(data):\n    return data\n",
   "solution": "def clean_profile(data):\n    city = (data.get(\"city\") or \"\").strip()\n    return {\n        \"name\": data[\"name\"].strip(),\n        \"city\": city or \"Алматы\",\n        \"email\": data[\"email\"].strip().lower(),\n    }\n",
   "hints": [
    "Жаңа сөздік құрыңыз, бастапқысын өзгертпеңіз.",
    "<code>(data.get(\"city\") or \"\").strip()</code> — бос болса <code>\"Алматы\"</code>."
   ],
   "check": {
    "tests": "_in = {\"name\": \"  Айгерім \", \"city\": \" Тараз\", \"email\": \"Aigerim@Mail.KZ \", \"is_admin\": True}\nassert clean_profile(_in) == {\"name\": \"Айгерім\", \"city\": \"Тараз\", \"email\": \"aigerim@mail.kz\"}, \"clean_profile(...) нәтижесі дұрыс емес; артық кілттер (is_admin) кірмейді\"\nassert _in[\"name\"] == \"  Айгерім \", \"Бастапқы сөздік өзгермеуі керек\"\nassert clean_profile({\"name\": \"Нұр\", \"email\": \"N@x.kz\", \"city\": \"   \"})[\"city\"] == \"Алматы\", \"city бос болса: 'Алматы'\"\nassert clean_profile({\"name\": \"Нұр\", \"email\": \"n@x.kz\"})[\"city\"] == \"Алматы\", \"city жоқ болса: 'Алматы'\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қатені жауапқа айналдыру",
   "prompt": "<code>ApiError</code> иерархиясы дайын. <code>Conflict</code> (409) және <code>Unprocessable</code> (422) класстарын қосыңыз. Сосын <code>to_response(func, *args)</code> функциясы <code>func(*args)</code> шақырсын: <code>ApiError</code> шықса <code>(e.status, {\"error\": e.message})</code>, шықпаса нәтиженің өзін қайтарсын. Басқа exception-дар ұсталмасын.",
   "starter": "class ApiError(Exception):\n    status = 500\n\n    def __init__(self, message):\n        super().__init__(message)\n        self.message = message\n\n\ndef to_response(func, *args):\n    return func(*args)\n",
   "solution": "class ApiError(Exception):\n    status = 500\n\n    def __init__(self, message):\n        super().__init__(message)\n        self.message = message\n\n\nclass Conflict(ApiError):\n    status = 409\n\n\nclass Unprocessable(ApiError):\n    status = 422\n\n\ndef to_response(func, *args):\n    try:\n        return func(*args)\n    except ApiError as e:\n        return e.status, {\"error\": e.message}\n",
   "hints": [
    "<code>class Conflict(ApiError): status = 409</code>",
    "<code>except ApiError as e: return e.status, {\"error\": e.message}</code>"
   ],
   "check": {
    "tests": "_users = {\"dana@mail.kz\"}\ndef _register(email):\n    if \"@\" not in email:\n        raise Unprocessable(\"email форматы қате\")\n    if email in _users:\n        raise Conflict(\"email бос емес\")\n    return 201, {\"email\": email}\nassert issubclass(Conflict, ApiError) and issubclass(Unprocessable, ApiError), \"Conflict пен Unprocessable ApiError-дан мұра алуы керек\"\nassert to_response(_register, \"ali@mail.kz\") == (201, {\"email\": \"ali@mail.kz\"}), \"Қате жоқ: нәтиже өзгермейді\"\nassert to_response(_register, \"dana@mail.kz\") == (409, {\"error\": \"email бос емес\"}), \"Conflict → 409\"\nassert to_response(_register, \"dana\") == (422, {\"error\": \"email форматы қате\"}), \"Unprocessable → 422\"\n_ok = False\ntry:\n    to_response(lambda: [][1])\nexcept IndexError:\n    _ok = True\nassert _ok, \"Басқа exception ұсталмауы керек\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Брондау сұрауы",
   "prompt": "<code>Booking</code> dataclass-ын жазыңыз: <code>hotel: str</code>, <code>nights: int</code>, <code>guests: int = 1</code>. <code>create_booking(raw_body)</code>: бұзық JSON немесе объект емес → <code>(400, {\"error\": \"invalid json\"})</code>. Валидация: <code>hotel</code> <code>HOTELS</code> ішінде болуы керек; <code>nights</code> 1–30, <code>guests</code> (берілсе) 1–6 бүтін сан (bool емес). Қате болса <code>(422, {\"errors\": {...}})</code>, кілттері өріс атаулары. Дұрыс болса <code>(201, asdict(booking))</code>.",
   "starter": "import json\nfrom dataclasses import dataclass, asdict\n\nHOTELS = {\"Rixos Borovoe\", \"Kazakhstan Hotel\", \"Shymkent Plaza\"}\n\ndef create_booking(raw_body):\n    data = json.loads(raw_body)\n    return 201, data\n",
   "solution": "import json\nfrom dataclasses import dataclass, asdict\n\nHOTELS = {\"Rixos Borovoe\", \"Kazakhstan Hotel\", \"Shymkent Plaza\"}\n\n@dataclass\nclass Booking:\n    hotel: str\n    nights: int\n    guests: int = 1\n\ndef _int_between(v, lo, hi):\n    return isinstance(v, int) and not isinstance(v, bool) and lo <= v <= hi\n\ndef create_booking(raw_body):\n    try:\n        data = json.loads(raw_body)\n    except json.JSONDecodeError:\n        return 400, {\"error\": \"invalid json\"}\n    if not isinstance(data, dict):\n        return 400, {\"error\": \"invalid json\"}\n    errors = {}\n    if data.get(\"hotel\") not in HOTELS:\n        errors[\"hotel\"] = \"мұндай қонақүй жоқ\"\n    if not _int_between(data.get(\"nights\"), 1, 30):\n        errors[\"nights\"] = \"1-30 бүтін сан\"\n    if \"guests\" in data and not _int_between(data[\"guests\"], 1, 6):\n        errors[\"guests\"] = \"1-6 бүтін сан\"\n    if errors:\n        return 422, {\"errors\": errors}\n    booking = Booking(data[\"hotel\"], data[\"nights\"], data.get(\"guests\", 1))\n    return 201, asdict(booking)\n",
   "hints": [
    "Алдымен JSON оқу (400), сосын валидация (422), соңында dataclass (201).",
    "Бүтін сан тексеруін көмекші функцияға шығарыңыз: <code>isinstance(v, int) and not isinstance(v, bool) and lo <= v <= hi</code>."
   ],
   "check": {
    "tests": "from dataclasses import is_dataclass\nassert is_dataclass(Booking), \"Booking dataclass болуы керек\"\nassert create_booking('{\"hotel\": \"Rixos Borovoe\", \"nights\": 3}') == (201, {\"hotel\": \"Rixos Borovoe\", \"nights\": 3, \"guests\": 1}), \"Дұрыс сұрау: 201, guests әдепкіде 1\"\nassert create_booking('{\"hotel\": \"Shymkent Plaza\", \"nights\": 2, \"guests\": 4}')[1][\"guests\"] == 4, \"guests берілсе, сол қолданылады\"\nassert create_booking('{\"hotel\": ') == (400, {\"error\": \"invalid json\"}), \"Бұзық JSON: 400\"\nassert create_booking('\"Rixos\"') == (400, {\"error\": \"invalid json\"}), \"Объект емес JSON: 400\"\n_s, _b = create_booking('{\"hotel\": \"Hilton\", \"nights\": 0, \"guests\": 9}')\nassert _s == 422 and set(_b[\"errors\"]) == {\"hotel\", \"nights\", \"guests\"}, \"Үш қате бірге: 422\"\n_s, _b = create_booking('{\"hotel\": \"Kazakhstan Hotel\", \"nights\": true}')\nassert _s == 422 and set(_b[\"errors\"]) == {\"nights\"}, \"true түн саны емес\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Тексеру декораторы",
   "prompt": "<code>validate(**rules)</code> параметрлі декораторын жазыңыз: әр ереже — өріс атауы → <code>(тип, шарт)</code> жұбы, мұндағы шарт — мәнді тексеретін функция. Handler бір аргумент алады: <code>data</code> сөздігі. Декоратор әр ереже бойынша мән бар екенін, типі сай екенін (<code>bool</code>-ды <code>int</code> деп санамаңыз) және шарттан өтетінін тексерсін; қате өрістер болса, handler шақырылмай <code>(422, {\"errors\": [өрістер, әліпби ретімен]})</code> қайтарылсын.",
   "starter": "def validate(**rules):\n    def decorator(handler):\n        return handler\n    return decorator\n",
   "solution": "def validate(**rules):\n    def decorator(handler):\n        def wrapper(data):\n            bad = []\n            for field, (typ, cond) in rules.items():\n                value = data.get(field)\n                ok = isinstance(value, typ) and not (typ is int and isinstance(value, bool))\n                if not ok or not cond(value):\n                    bad.append(field)\n            if bad:\n                return 422, {\"errors\": sorted(bad)}\n            return handler(data)\n        return wrapper\n    return decorator\n",
   "hints": [
    "Үш деңгей: <code>validate(**rules)</code> → <code>decorator(handler)</code> → <code>wrapper(data)</code>.",
    "Ережені тарату: <code>for field, (typ, cond) in rules.items():</code>"
   ],
   "check": {
    "tests": "_calls = []\n@validate(qty=(int, lambda v: 1 <= v <= 10), drink=(str, lambda v: v in {\"latte\", \"raf\"}))\ndef _order(data):\n    _calls.append(data)\n    return 201, {\"ok\": True}\nassert _order({\"qty\": 2, \"drink\": \"latte\"}) == (201, {\"ok\": True}), \"Дұрыс дерек: handler нәтижесі\"\nassert _order({\"qty\": 0, \"drink\": \"kumys\"}) == (422, {\"errors\": [\"drink\", \"qty\"]}), \"Екі қате, әліпби ретімен\"\nassert _order({\"drink\": \"raf\"}) == (422, {\"errors\": [\"qty\"]}), \"Өріс жоқ: қате\"\nassert _order({\"qty\": True, \"drink\": \"raf\"}) == (422, {\"errors\": [\"qty\"]}), \"True int деп саналмайды\"\nassert len(_calls) == 1, \"Қате болса, handler шақырылмауы керек\""
   }
  }
 ],
 "pyb-6": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Dataclass моделі",
   "prompt": "<code>dataclasses</code> модулінен <code>dataclass</code> импорттап, <code>Bus</code> моделін жазыңыз: <code>route: str</code>, <code>city: str</code>, <code>seats: int = 40</code>, <code>id: int = None</code>. <code>__init__</code>, <code>__repr__</code> және <code>__eq__</code> әдістерін dataclass өзі жасайды.",
   "starter": "class Bus:\n    pass\n",
   "solution": "from dataclasses import dataclass\n\n@dataclass\nclass Bus:\n    route: str\n    city: str\n    seats: int = 40\n    id: int = None\n",
   "hints": [
    "Класс үстіне <code>@dataclass</code> қойыңыз.",
    "Өрістер: <code>route: str</code>, ..., әдепкі мәні барлары соңында."
   ],
   "check": {
    "tests": "from dataclasses import is_dataclass\nassert is_dataclass(Bus), \"Bus dataclass болуы керек\"\n_b = Bus(\"92\", \"Алматы\")\nassert _b.route == \"92\" and _b.city == \"Алматы\" and _b.seats == 40 and _b.id is None, \"Әдепкі мәндер: seats 40, id None\"\nassert Bus(\"10\", \"Астана\", 25) == Bus(\"10\", \"Астана\", 25), \"__eq__ өрістер бойынша салыстырады\"\nassert repr(_b) == \"Bus(route='92', city='Алматы', seats=40, id=None)\", \"__repr__ dataclass стилінде\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Өріс мәндерін алу",
   "prompt": "<code>getattr(obj, \"city\")</code> — <code>obj.city</code> дегенмен бірдей. <code>pluck(objects, field)</code> функциясы объектілер тізімінен берілген өрістің мәндерін тізім етіп қайтарсын (ORM-дағы <code>values_list</code> сияқты).",
   "starter": "from dataclasses import dataclass\n\n@dataclass\nclass Cafe:\n    name: str\n    city: str\n    rating: float\n\ndef pluck(objects, field):\n    return []\n",
   "solution": "from dataclasses import dataclass\n\n@dataclass\nclass Cafe:\n    name: str\n    city: str\n    rating: float\n\ndef pluck(objects, field):\n    return [getattr(o, field) for o in objects]\n",
   "hints": [
    "Өріс атауы жол түрінде келеді, сондықтан <code>getattr(o, field)</code>.",
    "<code>[getattr(o, field) for o in objects]</code>"
   ],
   "check": {
    "tests": "_cs = [Cafe(\"Kofe Bar\", \"Астана\", 4.6), Cafe(\"Daily Cup\", \"Алматы\", 4.8)]\nassert pluck(_cs, \"name\") == [\"Kofe Bar\", \"Daily Cup\"], \"pluck(_cs, 'name') ['Kofe Bar', 'Daily Cup'] болуы керек\"\nassert pluck(_cs, \"rating\") == [4.6, 4.8], \"pluck(_cs, 'rating') [4.6, 4.8] болуы керек\"\nassert pluck([], \"city\") == [], \"Бос тізім: []\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Объектіні сөздікке",
   "prompt": "API жауабы үшін модельді сөздікке айналдыру керек. <code>to_dict(obj, fields)</code> функциясы тек <code>fields</code> тізіміндегі өрістерді сол ретпен сөздікке жинасын. Мысалы, құпия өріс (<code>password_hash</code>) жауапқа кірмейді.",
   "starter": "from dataclasses import dataclass\n\n@dataclass\nclass User:\n    id: int\n    login: str\n    city: str\n    password_hash: str\n\ndef to_dict(obj, fields):\n    return {}\n",
   "solution": "from dataclasses import dataclass\n\n@dataclass\nclass User:\n    id: int\n    login: str\n    city: str\n    password_hash: str\n\ndef to_dict(obj, fields):\n    return {f: getattr(obj, f) for f in fields}\n",
   "hints": [
    "Dict comprehension: <code>{f: getattr(obj, f) for f in fields}</code>",
    "Тек сұралған өрістер алынады."
   ],
   "check": {
    "tests": "_u = User(7, \"dana\", \"Павлодар\", \"9f86d0...\")\nassert to_dict(_u, [\"id\", \"login\", \"city\"]) == {\"id\": 7, \"login\": \"dana\", \"city\": \"Павлодар\"}, \"to_dict(...) {'id': 7, 'login': 'dana', 'city': 'Павлодар'} болуы керек\"\nassert \"password_hash\" not in to_dict(_u, [\"id\", \"login\"]), \"Сұралмаған өріс кірмейді\"\nassert list(to_dict(_u, [\"city\", \"id\"])) == [\"city\", \"id\"], \"Өрістер реті сақталады\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Repository жаңарту",
   "prompt": "Дайын <code>Repo</code> класына екі әдіс қосыңыз. <code>update(pk, **changes)</code> (параметр <code>id</code> емес, <code>pk</code> деп аталады, сонда <code>id=...</code> кілті <code>changes</code>-ке түседі): объект жоқ болса <code>None</code>; бар болса, берілген өрістерді <code>setattr</code> арқылы өзгертіп, объектіні қайтарсын (<code>id</code> өрісін өзгертуге болмайды: ондай кілт келсе — <code>ValueError</code>). <code>count(**kw)</code>: <code>filter</code> шарттарына сай объектілер саны.",
   "starter": "from dataclasses import dataclass\n\n@dataclass\nclass Taxi:\n    driver: str\n    city: str\n    free: bool = True\n    id: int = None\n\nclass Repo:\n    def __init__(self):\n        self.rows, self.next_id = {}, 1\n\n    def add(self, obj):\n        obj.id = self.next_id\n        self.rows[obj.id] = obj\n        self.next_id += 1\n        return obj\n\n    def filter(self, **kw):\n        return [o for o in self.rows.values() if all(getattr(o, k) == v for k, v in kw.items())]\n",
   "solution": "from dataclasses import dataclass\n\n@dataclass\nclass Taxi:\n    driver: str\n    city: str\n    free: bool = True\n    id: int = None\n\nclass Repo:\n    def __init__(self):\n        self.rows, self.next_id = {}, 1\n\n    def add(self, obj):\n        obj.id = self.next_id\n        self.rows[obj.id] = obj\n        self.next_id += 1\n        return obj\n\n    def filter(self, **kw):\n        return [o for o in self.rows.values() if all(getattr(o, k) == v for k, v in kw.items())]\n\n    def update(self, pk, **changes):\n        if \"id\" in changes:\n            raise ValueError(\"id өзгертуге болмайды\")\n        obj = self.rows.get(pk)\n        if obj is None:\n            return None\n        for k, v in changes.items():\n            setattr(obj, k, v)\n        return obj\n\n    def count(self, **kw):\n        return len(self.filter(**kw))\n",
   "hints": [
    "<code>setattr(obj, \"free\", False)</code> — <code>obj.free = False</code> дегенмен бірдей.",
    "<code>count</code> дайын <code>filter</code>-ді қолдана алады: <code>len(self.filter(**kw))</code>."
   ],
   "check": {
    "tests": "_r = Repo()\n_r.add(Taxi(\"Ерлан\", \"Шымкент\")); _r.add(Taxi(\"Дана\", \"Шымкент\")); _r.add(Taxi(\"Арман\", \"Орал\"))\nassert _r.update(2, free=False).free is False, \"update(2, free=False) объектіні өзгертіп қайтарады\"\nassert _r.rows[2].free is False, \"Өзгеріс repo ішінде сақталады\"\nassert _r.update(9, free=False) is None, \"Жоқ id: None\"\nassert _r.count(city=\"Шымкент\") == 2 and _r.count(city=\"Шымкент\", free=True) == 1, \"count шарттар бойынша санайды\"\n_ok = False\ntry:\n    _r.update(1, id=5)\nexcept ValueError:\n    _ok = True\nassert _ok and _r.rows[1].id == 1, \"id өзгертуге болмайды: ValueError\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Байланысты деректі жинау",
   "prompt": "N+1-сыз жұмыс. <code>FakeDB</code> әр сұрауды <code>queries</code>-те санайды. <code>cafes_with_city(db)</code> әр кофехана үшін <code>(name, city_name)</code> тізімін қайтарсын (кофеханалар реті сақталсын). Барлығы 2 сұраудан аспасын: <code>get_cafes()</code> және <code>get_cities(ids)</code> (ол id → қала сөздігін қайтарады).",
   "starter": "class FakeDB:\n    def __init__(self, cafes, cities):\n        self._cafes, self._cities, self.queries = cafes, cities, 0\n    def get_cafes(self):\n        self.queries += 1\n        return list(self._cafes)\n    def get_city(self, cid):\n        self.queries += 1\n        return self._cities[cid]\n    def get_cities(self, ids):\n        self.queries += 1\n        return {i: self._cities[i] for i in set(ids)}\n\ndef cafes_with_city(db):\n    return [(c[\"name\"], db.get_city(c[\"city_id\"])[\"name\"]) for c in db.get_cafes()]\n",
   "solution": "class FakeDB:\n    def __init__(self, cafes, cities):\n        self._cafes, self._cities, self.queries = cafes, cities, 0\n    def get_cafes(self):\n        self.queries += 1\n        return list(self._cafes)\n    def get_city(self, cid):\n        self.queries += 1\n        return self._cities[cid]\n    def get_cities(self, ids):\n        self.queries += 1\n        return {i: self._cities[i] for i in set(ids)}\n\ndef cafes_with_city(db):\n    cafes = db.get_cafes()\n    cities = db.get_cities([c[\"city_id\"] for c in cafes])\n    return [(c[\"name\"], cities[c[\"city_id\"]][\"name\"]) for c in cafes]\n",
   "hints": [
    "Барлық <code>city_id</code>-ді бір тізімге жинап, <code>db.get_cities(...)</code>-ді бір рет шақырыңыз.",
    "Сосын сөздіктен алыңыз: <code>cities[c[\"city_id\"]][\"name\"]</code>"
   ],
   "check": {
    "tests": "_cities = {1: {\"name\": \"Алматы\"}, 2: {\"name\": \"Астана\"}, 3: {\"name\": \"Түркістан\"}}\n_cafes = [{\"name\": f\"Cafe-{i}\", \"city_id\": (i % 3) + 1} for i in range(25)]\n_db = FakeDB(_cafes, _cities)\n_res = cafes_with_city(_db)\nassert _res[:3] == [(\"Cafe-0\", \"Алматы\"), (\"Cafe-1\", \"Астана\"), (\"Cafe-2\", \"Түркістан\")], \"Нәтиже: (name, city_name), реті сақталады\"\nassert len(_res) == 25, \"Барлық 25 кофехана керек\"\nassert _db.queries <= 2, \"N+1: 25 кофеханаға 2-ден көп сұрау кетпеуі керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Lookup операторлары",
   "prompt": "Django-дағы <code>rating__gte=4.5</code> сияқты кілтті талдаймыз. <code>matches(obj, **kw)</code> объект барлық шартқа сай болса <code>True</code> қайтарсын. Кілт <code>__</code> арқылы өріс пен операторға бөлінеді (<code>partition</code>). Операторлар: оператор жоқ — тең; <code>gt</code> (&gt;), <code>lte</code> (≤), <code>in</code> (мән тізімде), <code>startswith</code>. Белгісіз оператор — <code>ValueError</code>.",
   "starter": "def matches(obj, **kw):\n    return all(getattr(obj, k) == v for k, v in kw.items())\n",
   "solution": "OPS = {\n    \"exact\": lambda a, b: a == b,\n    \"gt\": lambda a, b: a > b,\n    \"lte\": lambda a, b: a <= b,\n    \"in\": lambda a, b: a in b,\n    \"startswith\": lambda a, b: a.startswith(b),\n}\n\ndef matches(obj, **kw):\n    for key, value in kw.items():\n        field, _, op = key.partition(\"__\")\n        op = op or \"exact\"\n        if op not in OPS:\n            raise ValueError(\"белгісіз оператор: \" + op)\n        if not OPS[op](getattr(obj, field), value):\n            return False\n    return True\n",
   "hints": [
    "<code>field, _, op = key.partition(\"__\")</code>; <code>op</code> бос болса — <code>\"exact\"</code>.",
    "Операторларды lambda сөздігінде сақтау ыңғайлы."
   ],
   "check": {
    "tests": "from dataclasses import dataclass\n@dataclass\nclass _Flat:\n    city: str\n    rooms: int\n    price: int\n_f = _Flat(\"Астана\", 2, 250000)\nassert matches(_f, city=\"Астана\") is True, \"Тең шарт\"\nassert matches(_f, rooms__gt=1, price__lte=250000) is True, \"gt және lte\"\nassert matches(_f, city__in=[\"Алматы\", \"Шымкент\"]) is False, \"in: тізімде жоқ\"\nassert matches(_f, city__startswith=\"Аст\", rooms=3) is False, \"Бір шарт орындалмаса, False\"\nassert matches(_f) is True, \"Шартсыз: True\"\n_ok = False\ntry:\n    matches(_f, price__between=1)\nexcept ValueError:\n    _ok = True\nassert _ok, \"Белгісіз оператор: ValueError\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Жалқау сұрау",
   "prompt": "ORM сұрауы жалқау: <code>filter</code> тек шартты жинайды, дерекқорға нәтиже керек болғанда ғана барады. <code>LazyQuery(db)</code> жазыңыз: <code>filter(**kw)</code> шартты қосып, <b>жаңа</b> <code>LazyQuery</code> қайтарады (дерекқорға бармайды); <code>all()</code> — <code>db.fetch_all()</code>-ды бір рет шақырып, барлық шартқа (тек теңдік) сай объектілерді қайтарады; <code>count()</code> — <code>len(self.all())</code>. Бастапқы сұрау өзгермеуі керек.",
   "starter": "class FakeDB:\n    def __init__(self, rows):\n        self.rows, self.calls = rows, 0\n    def fetch_all(self):\n        self.calls += 1\n        return list(self.rows)\n\nclass LazyQuery:\n    def __init__(self, db, conditions=None):\n        self.db = db\n\n    def filter(self, **kw):\n        rows = self.db.fetch_all()\n        return [r for r in rows if all(r[k] == v for k, v in kw.items())]\n",
   "solution": "class FakeDB:\n    def __init__(self, rows):\n        self.rows, self.calls = rows, 0\n    def fetch_all(self):\n        self.calls += 1\n        return list(self.rows)\n\nclass LazyQuery:\n    def __init__(self, db, conditions=None):\n        self.db = db\n        self.conditions = dict(conditions or {})\n\n    def filter(self, **kw):\n        merged = dict(self.conditions)\n        merged.update(kw)\n        return LazyQuery(self.db, merged)\n\n    def all(self):\n        rows = self.db.fetch_all()\n        return [r for r in rows if all(r[k] == v for k, v in self.conditions.items())]\n\n    def count(self):\n        return len(self.all())\n",
   "hints": [
    "Шарттарды <code>self.conditions</code> сөздігінде сақтаңыз; <code>filter</code> оның көшірмесін жаңа объектіге береді.",
    "Дерекқорға тек <code>all()</code> ішінде барыңыз."
   ],
   "check": {
    "tests": "_db = FakeDB([{\"city\": \"Алматы\", \"type\": \"кофе\"}, {\"city\": \"Астана\", \"type\": \"кофе\"}, {\"city\": \"Алматы\", \"type\": \"шай\"}])\n_q = LazyQuery(_db)\n_q2 = _q.filter(city=\"Алматы\").filter(type=\"кофе\")\nassert isinstance(_q2, LazyQuery), \"filter жаңа LazyQuery қайтаруы керек\"\nassert _db.calls == 0, \"filter дерекқорға бармауы керек (жалқау)\"\nassert _q2.all() == [{\"city\": \"Алматы\", \"type\": \"кофе\"}], \"Екі шарт бірге қолданылады\"\nassert _db.calls == 1, \"all() дерекқорға бір рет барады\"\nassert _q.count() == 3, \"Бастапқы сұрау өзгермейді: 3\"\nassert _q.filter(city=\"Алматы\").count() == 2, \"Бір шарт: 2\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Migration қолдану",
   "prompt": "Migration — схеманың нұсқаланған өзгерісі. <code>apply_migrations(schema, applied, migrations)</code> жазыңыз: <code>schema</code> — кесте → бағандар тізімі; <code>applied</code> — бұрын қолданылған migration атауларының жиыны; <code>migrations</code> — <code>(атау, кесте, жаңа баған)</code> кортеждерінің тізімі. Функция әлі қолданылмаған migration-дарды атауы бойынша <b>сұрыптап</b> қолдансын (бағанды кесте соңына қосады, кесте жоқ болса — <code>ValueError</code>, баған бар болса — өткізіп жібереді), <code>applied</code>-ке атауын қосып, жаңадан қолданылған атаулар тізімін қайтарсын.",
   "starter": "def apply_migrations(schema, applied, migrations):\n    for name, table, column in migrations:\n        schema[table].append(column)\n    return [m[0] for m in migrations]\n",
   "solution": "def apply_migrations(schema, applied, migrations):\n    done = []\n    for name, table, column in sorted(migrations):\n        if name in applied:\n            continue\n        if table not in schema:\n            raise ValueError(\"кесте жоқ: \" + table)\n        if column not in schema[table]:\n            schema[table].append(column)\n        applied.add(name)\n        done.append(name)\n    return done\n",
   "hints": [
    "<code>sorted(migrations)</code> кортеждерді бірінші элемент (атау) бойынша сұрыптайды.",
    "Әр migration үшін: <code>if name in applied: continue</code>, сосын бағанды қосып, атауды <code>applied</code>-ке жазыңыз."
   ],
   "check": {
    "tests": "_schema = {\"cafe\": [\"id\", \"name\"], \"order\": [\"id\", \"cafe_id\"]}\n_applied = {\"0001_init\"}\n_ms = [(\"0003_add_phone\", \"cafe\", \"phone\"), (\"0001_init\", \"cafe\", \"id\"), (\"0002_add_city\", \"cafe\", \"city\"), (\"0004_add_total\", \"order\", \"total\")]\nassert apply_migrations(_schema, _applied, _ms) == [\"0002_add_city\", \"0003_add_phone\", \"0004_add_total\"], \"Жаңа migration-дар атау ретімен қолданылады\"\nassert _schema == {\"cafe\": [\"id\", \"name\", \"city\", \"phone\"], \"order\": [\"id\", \"cafe_id\", \"total\"]}, \"Бағандар дұрыс ретпен қосылуы керек\"\nassert apply_migrations(_schema, _applied, _ms) == [], \"Қайта іске қосқанда ештеңе қолданылмайды\"\nassert \"0004_add_total\" in _applied, \"Қолданылған атаулар applied-ке жазылады\"\n_ok = False\ntry:\n    apply_migrations(_schema, _applied, [(\"0005_x\", \"bus\", \"route\")])\nexcept ValueError:\n    _ok = True\nassert _ok, \"Жоқ кесте: ValueError\""
   }
  }
 ],
 "pyb-7": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "SHA-256 hash",
   "prompt": "<code>sha256_hex(text)</code> жолдың SHA-256 hash-ын hex жол етіп қайтарсын: <code>hashlib.sha256(text.encode()).hexdigest()</code>. Hash бір бағытты: одан бастапқы мәтінді қайтару мүмкін емес.",
   "starter": "def sha256_hex(text):\n    return text\n",
   "solution": "import hashlib\n\ndef sha256_hex(text):\n    return hashlib.sha256(text.encode()).hexdigest()\n",
   "hints": [
    "<code>import hashlib</code>",
    "Жолды алдымен байтқа айналдырыңыз: <code>text.encode()</code>."
   ],
   "check": {
    "tests": "assert sha256_hex(\"qwerty\") == \"65e84be33532fb784c48129675f9eff3a682b27168c0ea744b2cf58ee02337c5\", \"sha256_hex('qwerty') дұрыс hash емес\"\nassert sha256_hex(\"Алматы2026\") == \"4e7fcbbb3f18eafec365e76c166cb96e373bfdb6dc7ccc0b2c917bce71620418\", \"Кириллица да encode() арқылы байтқа айналады\"\nassert len(sha256_hex(\"\")) == 64, \"SHA-256 hex мәні 64 таңба\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Тұзды hash",
   "prompt": "Бірдей құпия сөздердің hash-ы бірдей болмауы үшін salt қосамыз. <code>salted_hash(password, salt)</code> <code>salt + password</code> жолының SHA-256 hex мәнін қайтарсын.",
   "starter": "import hashlib\n\ndef salted_hash(password, salt):\n    return hashlib.sha256(password.encode()).hexdigest()\n",
   "solution": "import hashlib\n\ndef salted_hash(password, salt):\n    return hashlib.sha256((salt + password).encode()).hexdigest()\n",
   "hints": [
    "Hash-қа <code>salt + password</code> жолын беріңіз.",
    "<code>hashlib.sha256((salt + password).encode()).hexdigest()</code>"
   ],
   "check": {
    "tests": "assert salted_hash(\"qwerty\", \"salt1\") == \"f41a01d156c10ea129396a991287e0277ecbe3e79b3e3b1af818d404cda1bd57\", \"salted_hash('qwerty', 'salt1') дұрыс емес: salt + password\"\nassert salted_hash(\"qwerty\", \"a\") != salted_hash(\"qwerty\", \"b\"), \"Басқа salt басқа hash береді\"\nassert salted_hash(\"qwerty\", \"x\") == salted_hash(\"qwerty\", \"x\"), \"Бірдей salt пен құпия сөз бірдей hash береді\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Bearer token алу",
   "prompt": "<code>bearer_token(headers)</code> headers сөздігінен (атаулары кіші әріппен) <code>authorization</code> мәнін алып, ол <code>\"Bearer \"</code> сөзімен басталса, одан кейінгі token-ді қайтарсын. Header жоқ немесе басқа схема (мысалы <code>Basic</code>) болса — <code>None</code>.",
   "starter": "def bearer_token(headers):\n    return headers.get(\"authorization\")\n",
   "solution": "def bearer_token(headers):\n    value = headers.get(\"authorization\", \"\")\n    if not value.startswith(\"Bearer \"):\n        return None\n    return value[len(\"Bearer \"):].strip() or None\n",
   "hints": [
    "<code>headers.get(\"authorization\", \"\")</code>",
    "<code>value.startswith(\"Bearer \")</code> болса, <code>value[7:]</code>."
   ],
   "check": {
    "tests": "assert bearer_token({\"authorization\": \"Bearer abc.def\"}) == \"abc.def\", \"Bearer abc.def → 'abc.def'\"\nassert bearer_token({\"authorization\": \"Basic dXNlcjpwdw==\"}) is None, \"Basic схемасы: None\"\nassert bearer_token({}) is None, \"Header жоқ: None\"\nassert bearer_token({\"authorization\": \"Bearer \"}) is None, \"Token бос: None\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Тұрақты уақытпен салыстыру",
   "prompt": "<code>check_password(password, salt, stored)</code> құпия сөздің <code>salt + password</code> SHA-256 hex мәнін есептеп, сақталған <code>stored</code>-пен <code>hmac.compare_digest</code> арқылы салыстырсын (<code>==</code> емес: ол уақыт бойынша ақпарат береді).",
   "starter": "import hashlib\n\ndef check_password(password, salt, stored):\n    return hashlib.sha256((salt + password).encode()).hexdigest() == stored\n",
   "solution": "import hashlib, hmac\n\ndef check_password(password, salt, stored):\n    candidate = hashlib.sha256((salt + password).encode()).hexdigest()\n    return hmac.compare_digest(candidate, stored)\n",
   "hints": [
    "<code>import hmac</code>",
    "<code>return hmac.compare_digest(candidate, stored)</code>"
   ],
   "check": {
    "tests": "_stored = \"f41a01d156c10ea129396a991287e0277ecbe3e79b3e3b1af818d404cda1bd57\"\nassert check_password(\"qwerty\", \"salt1\", _stored) is True, \"Дұрыс құпия сөз: True\"\nassert check_password(\"qwertY\", \"salt1\", _stored) is False, \"Қате құпия сөз: False\"\nassert check_password(\"qwerty\", \"salt2\", _stored) is False, \"Басқа salt: False\"",
    "mustInclude": [
     "compare_digest"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "HMAC қолтаңба",
   "prompt": "Төлем жүйесі webhook жібергенде хабарға қол қояды. <code>sign(message, secret)</code> <code>hmac.new(secret.encode(), message.encode(), hashlib.sha256).hexdigest()</code> қайтарсын. <code>verify(message, secret, signature)</code> қолтаңбаны қайта есептеп, <code>hmac.compare_digest</code> арқылы тексерсін.",
   "starter": "import hashlib, hmac\n\ndef sign(message, secret):\n    return \"\"\n\ndef verify(message, secret, signature):\n    return True\n",
   "solution": "import hashlib, hmac\n\ndef sign(message, secret):\n    return hmac.new(secret.encode(), message.encode(), hashlib.sha256).hexdigest()\n\ndef verify(message, secret, signature):\n    return hmac.compare_digest(sign(message, secret), signature)\n",
   "hints": [
    "<code>hmac.new(key, msg, hashlib.sha256).hexdigest()</code>",
    "<code>verify</code> ішінде <code>sign</code>-ды қайта қолданыңыз."
   ],
   "check": {
    "tests": "assert sign(\"order:1051:3200\", \"k3y\") == \"ceb1905247062701923093acdff9840e85e68da07969eb05cc1d89c4863ce568\", \"sign('order:1051:3200', 'k3y') дұрыс емес\"\n_s = sign(\"order:7:900\", \"k3y\")\nassert verify(\"order:7:900\", \"k3y\", _s) is True, \"Дұрыс қолтаңба: True\"\nassert verify(\"order:7:100\", \"k3y\", _s) is False, \"Хабар өзгерсе: False\"\nassert verify(\"order:7:900\", \"other\", _s) is False, \"Басқа секрет: False\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Сессия кестесі",
   "prompt": "Сервер жақтағы сессия: <code>SessionStore</code> класы <code>sid → user</code> кестесін сақтайды. <code>login(user)</code> жаңа <code>sid</code> жасап (<code>\"s1\"</code>, <code>\"s2\"</code>, … ретімен), сақтап, қайтарсын. <code>get_user(sid)</code> пайдаланушыны немесе <code>None</code>. <code>logout(sid)</code> жазбаны өшіріп <code>True</code>, жоқ болса <code>False</code>.",
   "starter": "class SessionStore:\n    def __init__(self):\n        self.sessions = {}\n",
   "solution": "class SessionStore:\n    def __init__(self):\n        self.sessions = {}\n        self.counter = 0\n\n    def login(self, user):\n        self.counter += 1\n        sid = f\"s{self.counter}\"\n        self.sessions[sid] = user\n        return sid\n\n    def get_user(self, sid):\n        return self.sessions.get(sid)\n\n    def logout(self, sid):\n        if sid in self.sessions:\n            del self.sessions[sid]\n            return True\n        return False\n",
   "hints": [
    "Санауыш: <code>self.counter += 1</code>, <code>sid = f\"s{self.counter}\"</code>.",
    "<code>get_user</code>: <code>self.sessions.get(sid)</code>"
   ],
   "check": {
    "tests": "_st = SessionStore()\n_a = _st.login(\"dana\"); _b = _st.login(\"erlan\")\nassert (_a, _b) == (\"s1\", \"s2\"), \"sid ретімен: s1, s2\"\nassert _st.get_user(\"s1\") == \"dana\" and _st.get_user(\"s9\") is None, \"get_user: пайдаланушы немесе None\"\nassert _st.logout(\"s1\") is True and _st.get_user(\"s1\") is None, \"logout сессияны өшіреді\"\nassert _st.logout(\"s1\") is False, \"Қайта logout: False\"\nassert _st.login(\"sara\") == \"s3\", \"Өшірілген sid қайта берілмейді: s3\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Base64 payload",
   "prompt": "Token-нің body бөлігі — base64. <code>encode_payload(data)</code>: <code>json.dumps(data, sort_keys=True)</code> жолын <code>base64.urlsafe_b64encode</code> етіп, соңындағы <code>=</code> белгілерін алып тастасын. <code>decode_payload(body)</code>: <code>=</code> толықтырғышын қалпына келтіріп (ұзындық 4-ке еселі болсын), сөздікке қайтарсын; бұзық мәтінде <code>None</code>. Base64 — шифр емес, оны кез келген адам оқиды.",
   "starter": "import base64, json\n\ndef encode_payload(data):\n    return json.dumps(data)\n\ndef decode_payload(body):\n    return json.loads(body)\n",
   "solution": "import base64, binascii, json\n\ndef encode_payload(data):\n    raw = json.dumps(data, sort_keys=True).encode()\n    return base64.urlsafe_b64encode(raw).decode().rstrip(\"=\")\n\ndef decode_payload(body):\n    padded = body + \"=\" * (-len(body) % 4)\n    try:\n        return json.loads(base64.urlsafe_b64decode(padded))\n    except (binascii.Error, ValueError):\n        return None\n",
   "hints": [
    "Толықтырғыш: <code>body + \"=\" * (-len(body) % 4)</code>.",
    "Бұзық мәтінде <code>urlsafe_b64decode</code> немесе <code>json.loads</code> қате береді: <code>try/except (binascii.Error, ValueError)</code>."
   ],
   "check": {
    "tests": "_b = encode_payload({\"user\": 7, \"role\": \"barista\"})\nassert \"=\" not in _b and \"{\" not in _b, \"Нәтиже base64 болуы керек, = белгілерісіз\"\nassert _b == \"eyJyb2xlIjogImJhcmlzdGEiLCAidXNlciI6IDd9\", \"Кілттер сұрыпталуы керек: sort_keys=True\"\nassert decode_payload(_b) == {\"user\": 7, \"role\": \"barista\"}, \"decode_payload кері түрлендіруі керек\"\nassert decode_payload(encode_payload({\"city\": \"Алматы\"})) == {\"city\": \"Алматы\"}, \"Кириллицамен де жұмыс істейді\"\nassert decode_payload(\"!!!\") is None, \"Бұзық мәтін: None\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Рөлдер иерархиясы",
   "prompt": "Рөлдер бір-бірінен мұра алады: <code>ROLES</code> ішінде әр рөлдің өз рұқсаттары (<code>perms</code>) және ата рөлі (<code>inherits</code>, жоқ болса <code>None</code>) бар. Рекурсивті <code>all_perms(role)</code> рөлдің барлық рұқсатын (атасынікін қоса) жиын етіп қайтарсын, белгісіз рөлде бос жиын. <code>require(perm)</code> декораторы: <code>user is None</code> → <code>(401, {\"error\": \"login required\"})</code>, рұқсат жоқ → <code>(403, {\"error\": \"forbidden\"})</code>, әйтпесе handler нәтижесі.",
   "starter": "ROLES = {\n    \"barista\": {\"perms\": {\"orders:read\"}, \"inherits\": None},\n    \"manager\": {\"perms\": {\"menu:edit\"}, \"inherits\": \"barista\"},\n    \"owner\": {\"perms\": {\"reports:read\"}, \"inherits\": \"manager\"},\n}\n\ndef all_perms(role):\n    return ROLES[role][\"perms\"]\n\ndef require(perm):\n    def decorator(handler):\n        return handler\n    return decorator\n",
   "solution": "ROLES = {\n    \"barista\": {\"perms\": {\"orders:read\"}, \"inherits\": None},\n    \"manager\": {\"perms\": {\"menu:edit\"}, \"inherits\": \"barista\"},\n    \"owner\": {\"perms\": {\"reports:read\"}, \"inherits\": \"manager\"},\n}\n\ndef all_perms(role):\n    if role not in ROLES:\n        return set()\n    info = ROLES[role]\n    perms = set(info[\"perms\"])\n    if info[\"inherits\"]:\n        perms |= all_perms(info[\"inherits\"])\n    return perms\n\ndef require(perm):\n    def decorator(handler):\n        def wrapper(user, *args, **kwargs):\n            if user is None:\n                return 401, {\"error\": \"login required\"}\n            if perm not in all_perms(user.get(\"role\")):\n                return 403, {\"error\": \"forbidden\"}\n            return handler(user, *args, **kwargs)\n        return wrapper\n    return decorator\n",
   "hints": [
    "Рекурсия: өз рұқсаттарына <code>all_perms(info[\"inherits\"])</code> нәтижесін қосыңыз (<code>|=</code>).",
    "<code>require</code> — параметрлі декоратор: <code>require(perm)</code> → <code>decorator(handler)</code> → <code>wrapper(user, ...)</code>."
   ],
   "check": {
    "tests": "assert all_perms(\"owner\") == {\"orders:read\", \"menu:edit\", \"reports:read\"}, \"owner барлық атасының рұқсатын алады\"\nassert all_perms(\"barista\") == {\"orders:read\"}, \"barista: тек өзінікі\"\nassert all_perms(\"intern\") == set(), \"Белгісіз рөл: бос жиын\"\nassert ROLES[\"manager\"][\"perms\"] == {\"menu:edit\"}, \"ROLES сөздігі өзгермеуі керек\"\n@require(\"menu:edit\")\ndef _set_price(user, drink, price):\n    return 200, {\"drink\": drink, \"price\": price}\nassert _set_price(None, \"raf\", 1500) == (401, {\"error\": \"login required\"}), \"Кірмеген: 401\"\nassert _set_price({\"role\": \"barista\"}, \"raf\", 1500) == (403, {\"error\": \"forbidden\"}), \"barista мәзірді өзгерте алмайды: 403\"\nassert _set_price({\"role\": \"owner\"}, \"raf\", 1500) == (200, {\"drink\": \"raf\", \"price\": 1500}), \"owner мұра арқылы menu:edit алады\""
   }
  }
 ],
 "pyb-8": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Алғашқы TestCase",
   "prompt": "<code>km_to_m(km)</code> функциясы берілген. <code>DistanceTests(unittest.TestCase)</code> класын жазыңыз: кемінде 2 тест әдісі (<code>test_</code> деп басталсын), <code>assertEqual</code> арқылы, мысалы <code>km_to_m(3)</code> = 3000 және <code>km_to_m(0)</code> = 0. Тексеру тесттеріңізді әдейі бұзылған нұсқада (<code>km * 100</code>) да іске қосады: сонда тест құлауы керек.",
   "starter": "import unittest\n\ndef km_to_m(km):\n    return km * 1000\n\nclass DistanceTests(unittest.TestCase):\n    pass\n",
   "solution": "import unittest\n\ndef km_to_m(km):\n    return km * 1000\n\nclass DistanceTests(unittest.TestCase):\n    def test_three_km(self):\n        self.assertEqual(km_to_m(3), 3000)\n\n    def test_zero(self):\n        self.assertEqual(km_to_m(0), 0)\n",
   "hints": [
    "Әр тест — <code>def test_...(self):</code> әдісі.",
    "<code>self.assertEqual(km_to_m(3), 3000)</code>"
   ],
   "check": {
    "tests": "import io as _io, unittest as _ut\ndef _run(_cls):\n    return _ut.TextTestRunner(stream=_io.StringIO()).run(_ut.defaultTestLoader.loadTestsFromTestCase(_cls))\n\n_r = _run(DistanceTests)\nassert _r.testsRun >= 2, \"Кемінде 2 тест әдісі керек (атауы test_ деп басталсын)\"\nassert _r.wasSuccessful(), \"Тесттер дұрыс функцияда өтуі керек\"\n_good = km_to_m\nkm_to_m = lambda km: km * 100\n_bad = _run(DistanceTests).wasSuccessful()\nkm_to_m = _good\nassert not _bad, \"Тесттер km * 100 қатесін ұстамады\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "assertRaises тесті",
   "prompt": "<code>withdraw(balance, amount)</code> сома баланстан көп болса <code>ValueError</code> көтереді. <code>WithdrawTests(unittest.TestCase)</code> жазыңыз: бір тест қалыпты алуды (<code>withdraw(5000, 2000) == 3000</code>), екіншісі <code>with self.assertRaises(ValueError):</code> арқылы қатені тексерсін. Қате көтермейтін бұзылған нұсқада тесттер құлауы керек.",
   "starter": "import unittest\n\ndef withdraw(balance, amount):\n    if amount > balance:\n        raise ValueError(\"қаражат жеткіліксіз\")\n    return balance - amount\n\nclass WithdrawTests(unittest.TestCase):\n    pass\n",
   "solution": "import unittest\n\ndef withdraw(balance, amount):\n    if amount > balance:\n        raise ValueError(\"қаражат жеткіліксіз\")\n    return balance - amount\n\nclass WithdrawTests(unittest.TestCase):\n    def test_normal(self):\n        self.assertEqual(withdraw(5000, 2000), 3000)\n\n    def test_too_much(self):\n        with self.assertRaises(ValueError):\n            withdraw(1000, 5000)\n",
   "hints": [
    "<code>with self.assertRaises(ValueError): withdraw(1000, 5000)</code>",
    "Екі тест әдісі жеткілікті."
   ],
   "check": {
    "tests": "import io as _io, unittest as _ut\ndef _run(_cls):\n    return _ut.TextTestRunner(stream=_io.StringIO()).run(_ut.defaultTestLoader.loadTestsFromTestCase(_cls))\n\n_r = _run(WithdrawTests)\nassert _r.testsRun >= 2 and _r.wasSuccessful(), \"Кемінде 2 тест және олар дұрыс функцияда өтуі керек\"\n_good = withdraw\nwithdraw = lambda balance, amount: balance - amount\n_bad = _run(WithdrawTests).wasSuccessful()\nwithdraw = _good\nassert not _bad, \"Тесттер ValueError жоқтығын ұстамады: assertRaises қолданыңыз\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Тесттерді іске қосу",
   "prompt": "<code>run_tests(case_class)</code> функциясын жазыңыз: ол TestCase класының тесттерін <code>unittest.defaultTestLoader.loadTestsFromTestCase</code> арқылы жинап, <code>unittest.TextTestRunner(stream=io.StringIO())</code> арқылы іске қосып, <code>(testsRun, wasSuccessful)</code> кортежін қайтарсын.",
   "starter": "import io, unittest\n\ndef run_tests(case_class):\n    return 0, True\n",
   "solution": "import io, unittest\n\ndef run_tests(case_class):\n    suite = unittest.defaultTestLoader.loadTestsFromTestCase(case_class)\n    result = unittest.TextTestRunner(stream=io.StringIO()).run(suite)\n    return result.testsRun, result.wasSuccessful()\n",
   "hints": [
    "<code>suite = unittest.defaultTestLoader.loadTestsFromTestCase(case_class)</code>",
    "<code>result = unittest.TextTestRunner(stream=io.StringIO()).run(suite)</code>"
   ],
   "check": {
    "tests": "import unittest as _ut\nclass _Ok(_ut.TestCase):\n    def test_a(self):\n        self.assertTrue(True)\n    def test_b(self):\n        self.assertIn(\"а\", \"ата\")\nclass _Fail(_ut.TestCase):\n    def test_a(self):\n        self.assertEqual(1, 2)\nassert run_tests(_Ok) == (2, True), \"Екі сәтті тест: (2, True)\"\nassert run_tests(_Fail) == (1, False), \"Бір құлаған тест: (1, False)\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "setUp тазалығы",
   "prompt": "<code>Cart</code> класы берілген. <code>CartTests(unittest.TestCase)</code> жазыңыз: <code>setUp</code> ішінде әр тестке жаңа себет жасаңыз (<code>self.cart = Cart()</code>). Кемінде 2 тест: тауар қосқаннан кейін <code>count()</code> 1-ге өседі; жаңа себеттің <code>total()</code> 0. Тауар қоспайтын бұзылған <code>Cart</code>-та тесттер құлауы керек.",
   "starter": "import unittest\n\nclass Cart:\n    def __init__(self):\n        self.items = []\n\n    def add(self, name, price):\n        self.items.append((name, price))\n\n    def count(self):\n        return len(self.items)\n\n    def total(self):\n        return sum(p for _, p in self.items)\n\nclass CartTests(unittest.TestCase):\n    pass\n",
   "solution": "import unittest\n\nclass Cart:\n    def __init__(self):\n        self.items = []\n\n    def add(self, name, price):\n        self.items.append((name, price))\n\n    def count(self):\n        return len(self.items)\n\n    def total(self):\n        return sum(p for _, p in self.items)\n\nclass CartTests(unittest.TestCase):\n    def setUp(self):\n        self.cart = Cart()\n\n    def test_add_increases_count(self):\n        self.cart.add(\"Нан\", 250)\n        self.assertEqual(self.cart.count(), 1)\n        self.assertEqual(self.cart.total(), 250)\n\n    def test_new_cart_is_empty(self):\n        self.assertEqual(self.cart.total(), 0)\n",
   "hints": [
    "<code>def setUp(self): self.cart = Cart()</code>",
    "Тестте <code>self.cart.add(...)</code>, сосын <code>assertEqual(self.cart.count(), 1)</code>."
   ],
   "check": {
    "tests": "import io as _io, unittest as _ut\ndef _run(_cls):\n    return _ut.TextTestRunner(stream=_io.StringIO()).run(_ut.defaultTestLoader.loadTestsFromTestCase(_cls))\n\nassert \"setUp\" in CartTests.__dict__, \"setUp әдісі керек\"\n_r = _run(CartTests)\nassert _r.testsRun >= 2 and _r.wasSuccessful(), \"Кемінде 2 тест және олар дұрыс Cart-та өтуі керек\"\n_Good = Cart\nclass _Broken(_Good):\n    def add(self, name, price):\n        pass\nCart = _Broken\n_bad = _run(CartTests).wasSuccessful()\nCart = _Good\nassert not _bad, \"Тауар қоспайтын Cart-та тесттер құлауы керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Шекаралық мәндер",
   "prompt": "<code>valid_qty(q)</code> сан 1-ден 10-ға дейін (қоса) болса <code>True</code>. Bug-тар көбіне шекарада болады. <code>QtyTests(unittest.TestCase)</code> жазыңыз: 0, 1, 10 және 11 мәндерін тексеріңіз (<code>assertTrue</code> / <code>assertFalse</code>). Тексеру екі бұзылған нұсқада іске қосады: <code>1 &lt;= q &lt; 10</code> және <code>0 &lt;= q &lt;= 10</code>.",
   "starter": "import unittest\n\ndef valid_qty(q):\n    return 1 <= q <= 10\n\nclass QtyTests(unittest.TestCase):\n    def test_middle(self):\n        self.assertTrue(valid_qty(5))\n",
   "solution": "import unittest\n\ndef valid_qty(q):\n    return 1 <= q <= 10\n\nclass QtyTests(unittest.TestCase):\n    def test_middle(self):\n        self.assertTrue(valid_qty(5))\n\n    def test_lower_bound(self):\n        self.assertFalse(valid_qty(0))\n        self.assertTrue(valid_qty(1))\n\n    def test_upper_bound(self):\n        self.assertTrue(valid_qty(10))\n        self.assertFalse(valid_qty(11))\n",
   "hints": [
    "Төменгі шекара: <code>assertFalse(valid_qty(0))</code>, <code>assertTrue(valid_qty(1))</code>.",
    "Жоғарғы шекара: 10 → True, 11 → False."
   ],
   "check": {
    "tests": "import io as _io, unittest as _ut\ndef _run(_cls):\n    return _ut.TextTestRunner(stream=_io.StringIO()).run(_ut.defaultTestLoader.loadTestsFromTestCase(_cls))\n\nassert _run(QtyTests).wasSuccessful(), \"Тесттер дұрыс функцияда өтуі керек\"\n_good = valid_qty\nfor _mut, _msg in ((lambda q: 1 <= q < 10, \"10 мәні тексерілмеген\"), (lambda q: 0 <= q <= 10, \"0 мәні тексерілмеген\")):\n    valid_qty = _mut\n    _bad = _run(QtyTests).wasSuccessful()\n    valid_qty = _good\n    assert not _bad, \"Тесттер шекаралық қатені ұстамады: \" + _msg"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жалған сағат",
   "prompt": "Уақытқа тәуелді кодты тестілеу үшін жалған сағат керек. <code>FakeClock</code> класын жазыңыз: <code>FakeClock(start=0)</code>, шақырылғанда (<code>clock()</code>, <code>__call__</code>) ағымдағы уақытты қайтарады, <code>advance(seconds)</code> уақытты алға жылжытады. Ол берілген <code>OtpCode</code> класымен жұмыс істеуі керек: код 60 секунд жарамды.",
   "starter": "class OtpCode:\n    def __init__(self, code, clock, ttl=60):\n        self.code, self.clock, self.ttl = code, clock, ttl\n        self.created = clock()\n\n    def check(self, code):\n        return code == self.code and self.clock() - self.created < self.ttl\n\nclass FakeClock:\n    pass\n",
   "solution": "class OtpCode:\n    def __init__(self, code, clock, ttl=60):\n        self.code, self.clock, self.ttl = code, clock, ttl\n        self.created = clock()\n\n    def check(self, code):\n        return code == self.code and self.clock() - self.created < self.ttl\n\nclass FakeClock:\n    def __init__(self, start=0):\n        self.t = start\n\n    def __call__(self):\n        return self.t\n\n    def advance(self, seconds):\n        self.t += seconds\n",
   "hints": [
    "<code>__call__</code> объектіні функция сияқты шақыруға мүмкіндік береді.",
    "<code>advance</code>: <code>self.t += seconds</code>"
   ],
   "check": {
    "tests": "_c = FakeClock(100)\nassert _c() == 100, \"FakeClock(100)() 100 қайтаруы керек\"\n_c.advance(5)\nassert _c() == 105, \"advance(5) уақытты 5 секундқа жылжытады\"\nassert FakeClock()() == 0, \"start әдепкіде 0\"\n_clock = FakeClock()\n_otp = OtpCode(\"4821\", _clock)\n_clock.advance(59)\nassert _otp.check(\"4821\") is True, \"59 секундта код әлі жарамды\"\n_clock.advance(1)\nassert _otp.check(\"4821\") is False, \"60 секундта мерзімі бітеді\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Test client сценарийі",
   "prompt": "<code>TicketApp</code> мен <code>TestClient</code> дайын. <code>TicketApiTests(unittest.TestCase)</code> жазыңыз: <code>setUp</code>-та <code>self.client = TestClient(TicketApp())</code>. Кемінде 3 тест: <code>POST /tickets</code> 201 береді; жасалған билетті <code>DELETE</code> еткен соң <code>GET</code> 404 береді; жоқ билетті <code>DELETE</code> 404 береді. Тексеру екі бұзылған қосымшада іске қосады: (1) POST 200 қайтарады, (2) DELETE ештеңе өшірмейді.",
   "starter": "import json, unittest\nfrom dataclasses import dataclass\n\n@dataclass\nclass Response:\n    status: int\n    json: object\n\nclass TicketApp:\n    def __init__(self):\n        self.tickets, self.next_id = {}, 1\n\n    def handle(self, method, path, body=\"\"):\n        if path == \"/tickets\" and method == \"POST\":\n            t = {\"id\": self.next_id, **json.loads(body or \"{}\")}\n            self.tickets[t[\"id\"]] = t\n            self.next_id += 1\n            return 201, json.dumps(t, ensure_ascii=False)\n        if path.startswith(\"/tickets/\"):\n            tid = int(path.split(\"/\")[2])\n            if tid not in self.tickets:\n                return 404, json.dumps({\"error\": \"not found\"})\n            if method == \"GET\":\n                return 200, json.dumps(self.tickets[tid], ensure_ascii=False)\n            if method == \"DELETE\":\n                del self.tickets[tid]\n                return 204, \"\"\n        return 404, json.dumps({\"error\": \"not found\"})\n\nclass TestClient:\n    def __init__(self, app):\n        self.app = app\n\n    def request(self, method, path, json_body=None):\n        raw = \"\" if json_body is None else json.dumps(json_body)\n        status, body = self.app.handle(method, path, raw)\n        return Response(status, json.loads(body) if body else None)\n\nclass TicketApiTests(unittest.TestCase):\n    pass\n",
   "solution": "import json, unittest\nfrom dataclasses import dataclass\n\n@dataclass\nclass Response:\n    status: int\n    json: object\n\nclass TicketApp:\n    def __init__(self):\n        self.tickets, self.next_id = {}, 1\n\n    def handle(self, method, path, body=\"\"):\n        if path == \"/tickets\" and method == \"POST\":\n            t = {\"id\": self.next_id, **json.loads(body or \"{}\")}\n            self.tickets[t[\"id\"]] = t\n            self.next_id += 1\n            return 201, json.dumps(t, ensure_ascii=False)\n        if path.startswith(\"/tickets/\"):\n            tid = int(path.split(\"/\")[2])\n            if tid not in self.tickets:\n                return 404, json.dumps({\"error\": \"not found\"})\n            if method == \"GET\":\n                return 200, json.dumps(self.tickets[tid], ensure_ascii=False)\n            if method == \"DELETE\":\n                del self.tickets[tid]\n                return 204, \"\"\n        return 404, json.dumps({\"error\": \"not found\"})\n\nclass TestClient:\n    def __init__(self, app):\n        self.app = app\n\n    def request(self, method, path, json_body=None):\n        raw = \"\" if json_body is None else json.dumps(json_body)\n        status, body = self.app.handle(method, path, raw)\n        return Response(status, json.loads(body) if body else None)\n\nclass TicketApiTests(unittest.TestCase):\n    def setUp(self):\n        self.client = TestClient(TicketApp())\n\n    def test_create_returns_201(self):\n        r = self.client.request(\"POST\", \"/tickets\", {\"route\": \"Алматы-Астана\"})\n        self.assertEqual(r.status, 201)\n\n    def test_deleted_ticket_is_gone(self):\n        tid = self.client.request(\"POST\", \"/tickets\", {\"route\": \"Орал-Ақтөбе\"}).json[\"id\"]\n        self.assertEqual(self.client.request(\"DELETE\", f\"/tickets/{tid}\").status, 204)\n        self.assertEqual(self.client.request(\"GET\", f\"/tickets/{tid}\").status, 404)\n\n    def test_delete_missing_returns_404(self):\n        self.assertEqual(self.client.request(\"DELETE\", \"/tickets/999\").status, 404)\n",
   "hints": [
    "<code>setUp</code> әр тестке жаңа қосымша береді, сондықтан тесттер бір-біріне тәуелсіз.",
    "Жою тесті: алдымен POST, жауаптан <code>id</code> алып, DELETE, сосын GET 404 екенін тексеріңіз."
   ],
   "check": {
    "tests": "import io as _io, unittest as _ut\ndef _run(_cls):\n    return _ut.TextTestRunner(stream=_io.StringIO()).run(_ut.defaultTestLoader.loadTestsFromTestCase(_cls))\n\nassert \"setUp\" in TicketApiTests.__dict__, \"setUp әдісі керек\"\n_r = _run(TicketApiTests)\nassert _r.testsRun >= 3 and _r.wasSuccessful(), \"Кемінде 3 тест және олар дұрыс қосымшада өтуі керек\"\n_Good = TicketApp\nclass _PostOk(_Good):\n    def handle(self, method, path, body=\"\"):\n        s, b = super().handle(method, path, body)\n        return (200 if s == 201 else s), b\nclass _NoDelete(_Good):\n    def handle(self, method, path, body=\"\"):\n        if method == \"DELETE\" and path.startswith(\"/tickets/\") and int(path.split(\"/\")[2]) in self.tickets:\n            return 204, \"\"\n        return super().handle(method, path, body)\nfor _cls, _msg in ((_PostOk, \"POST 201 орнына 200 қайтарады\"), (_NoDelete, \"DELETE билетті өшірмейді\")):\n    TicketApp = _cls\n    _bad = _run(TicketApiTests).wasSuccessful()\n    TicketApp = _Good\n    assert not _bad, \"Тесттер бұзылған қосымшаны ұстамады: \" + _msg"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Қате жолдарын тестілеу",
   "prompt": "<code>parse_age(text)</code> жолды жасқа айналдырады: бос орындар алынады, мәтін цифр болмаса немесе жас 0–120 аралығынан тыс болса <code>ValueError</code>. <code>AgeTests(unittest.TestCase)</code> жазыңыз (кемінде 3 тест). Тексеру үш бұзылған нұсқада іске қосады: (1) теріс жасты (<code>\"-5\"</code>) қабылдайды, (2) <code>\"abc\"</code> үшін <code>None</code> қайтарады, (3) 120-дан үлкенді қабылдайды. Әрқайсысында тесттеріңіз құлауы керек.",
   "starter": "import unittest\n\ndef parse_age(text):\n    text = text.strip()\n    if not text.isdigit():\n        raise ValueError(\"жас сан болуы керек\")\n    age = int(text)\n    if age > 120:\n        raise ValueError(\"жас 0-120 аралығында\")\n    return age\n\nclass AgeTests(unittest.TestCase):\n    def test_ok(self):\n        self.assertEqual(parse_age(\" 25 \"), 25)\n",
   "solution": "import unittest\n\ndef parse_age(text):\n    text = text.strip()\n    if not text.isdigit():\n        raise ValueError(\"жас сан болуы керек\")\n    age = int(text)\n    if age > 120:\n        raise ValueError(\"жас 0-120 аралығында\")\n    return age\n\nclass AgeTests(unittest.TestCase):\n    def test_ok(self):\n        self.assertEqual(parse_age(\" 25 \"), 25)\n\n    def test_negative(self):\n        with self.assertRaises(ValueError):\n            parse_age(\"-5\")\n\n    def test_not_a_number(self):\n        with self.assertRaises(ValueError):\n            parse_age(\"abc\")\n\n    def test_too_old(self):\n        self.assertEqual(parse_age(\"120\"), 120)\n        with self.assertRaises(ValueError):\n            parse_age(\"121\")\n",
   "hints": [
    "Әр қате жолына бөлек тест: <code>with self.assertRaises(ValueError): parse_age(\"-5\")</code>.",
    "Шекара: <code>\"120\"</code> жарамды, <code>\"121\"</code> жарамсыз."
   ],
   "check": {
    "tests": "import io as _io, unittest as _ut\ndef _run(_cls):\n    return _ut.TextTestRunner(stream=_io.StringIO()).run(_ut.defaultTestLoader.loadTestsFromTestCase(_cls))\n\n_r = _run(AgeTests)\nassert _r.testsRun >= 3 and _r.wasSuccessful(), \"Кемінде 3 тест және олар дұрыс функцияда өтуі керек\"\n_good = parse_age\ndef _m1(text):\n    age = int(text.strip())\n    if age > 120:\n        raise ValueError(\"x\")\n    return age\ndef _m2(text):\n    text = text.strip()\n    if not text.lstrip(\"-\").isdigit():\n        return None\n    age = int(text)\n    if not 0 <= age <= 120:\n        raise ValueError(\"x\")\n    return age\ndef _m3(text):\n    text = text.strip()\n    if not text.isdigit():\n        raise ValueError(\"x\")\n    return int(text)\nfor _mut, _msg in ((_m1, \"теріс жас қабылданады\"), (_m2, \"'abc' үшін ValueError жоқ\"), (_m3, \"120-дан үлкен жас қабылданады\")):\n    parse_age = _mut\n    _bad = _run(AgeTests).wasSuccessful()\n    parse_age = _good\n    assert not _bad, \"Тесттер бұзылған нұсқаны ұстамады: \" + _msg"
   }
  }
 ],
 "pyb-9": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Пошта индексі",
   "prompt": "Қазақстандағы пошта индексі — дәл 6 цифр (мысалы, <code>050000</code>). <code>is_postcode(s)</code> <code>re.fullmatch</code> арқылы тексеріп, <code>True</code> / <code>False</code> қайтарсын.",
   "starter": "import re\n\ndef is_postcode(s):\n    return re.match(r\"\\d{6}\", s) is not None\n",
   "solution": "import re\n\ndef is_postcode(s):\n    return re.fullmatch(r\"\\d{6}\", s) is not None\n",
   "hints": [
    "<code>re.match</code> тек басын қарайды, сондықтан <code>\"0500001\"</code> да өтіп кетеді.",
    "<code>re.fullmatch(r\"\\d{6}\", s)</code>"
   ],
   "check": {
    "tests": "assert is_postcode(\"050000\") is True, \"050000 дұрыс индекс\"\nassert is_postcode(\"0500001\") is False, \"7 цифр: False\"\nassert is_postcode(\"05000\") is False, \"5 цифр: False\"\nassert is_postcode(\"05 000\") is False and is_postcode(\"A50000\") is False, \"Бос орын не әріп: False\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Сандарды табу",
   "prompt": "<code>extract_numbers(text)</code> мәтіндегі барлық бүтін сандарды <code>re.findall</code> арқылы тауып, <code>int</code> тізімі етіп қайтарсын. <code>extract_numbers(\"2 латте, 1 раф, 3500 ₸\")</code> → <code>[2, 1, 3500]</code>.",
   "starter": "import re\n\ndef extract_numbers(text):\n    return []\n",
   "solution": "import re\n\ndef extract_numbers(text):\n    return [int(x) for x in re.findall(r\"\\d+\", text)]\n",
   "hints": [
    "<code>re.findall(r\"\\d+\", text)</code> жолдар тізімін береді.",
    "Әрқайсысын <code>int</code> етіңіз."
   ],
   "check": {
    "tests": "assert extract_numbers(\"2 латте, 1 раф, 3500 ₸\") == [2, 1, 3500], \"extract_numbers('2 латте, 1 раф, 3500 ₸') [2, 1, 3500] болуы керек\"\nassert extract_numbers(\"сан жоқ\") == [], \"Сан жоқ: []\"\nassert extract_numbers(\"№12-автобус 07:45\") == [12, 7, 45], \"№12-автобус 07:45 → [12, 7, 45]\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бос орындарды қысқарту",
   "prompt": "<code>squeeze(text)</code> мәтіндегі кез келген бос орын тізбегін (бос орын, tab, жаңа жол) бір бос орынға ауыстырып (<code>re.sub</code>), шеттерін <code>strip</code> етсін. <code>squeeze(\"  Абай   даңғылы\\t10 \")</code> → <code>\"Абай даңғылы 10\"</code>.",
   "starter": "import re\n\ndef squeeze(text):\n    return text.strip()\n",
   "solution": "import re\n\ndef squeeze(text):\n    return re.sub(r\"\\s+\", \" \", text).strip()\n",
   "hints": [
    "<code>\\s+</code> — бір немесе одан көп бос таңба.",
    "<code>re.sub(r\"\\s+\", \" \", text).strip()</code>"
   ],
   "check": {
    "tests": "assert squeeze(\"  Абай   даңғылы\\t10 \") == \"Абай даңғылы 10\", \"squeeze('  Абай   даңғылы\\\\t10 ') 'Абай даңғылы 10' болуы керек\"\nassert squeeze(\"Сәтпаев\\n\\nкөшесі\") == \"Сәтпаев көшесі\", \"Жаңа жолдар да бір бос орынға айналады\"\nassert squeeze(\"   \") == \"\", \"Тек бос орын: бос жол\"",
    "mustInclude": [
     "re.sub"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "ЖСН тексеру",
   "prompt": "ЖСН (ИИН) — 12 цифр, алғашқы алтауы туған күн <code>ЖЖААКК</code>: ай <code>01</code>–<code>12</code>, күн <code>01</code>–<code>31</code>. <code>is_iin(s)</code> бір regex (<code>fullmatch</code>) арқылы тексерсін. Нақты бақылау цифрын есептемейміз.",
   "starter": "import re\n\ndef is_iin(s):\n    return re.fullmatch(r\"\\d{12}\", s) is not None\n",
   "solution": "import re\n\nIIN = re.compile(r\"\\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\\d|3[01])\\d{6}\")\n\ndef is_iin(s):\n    return IIN.fullmatch(s) is not None\n",
   "hints": [
    "Ай: <code>(0[1-9]|1[0-2])</code>; күн: <code>(0[1-9]|[12]\\d|3[01])</code>.",
    "Соңында тағы 6 цифр: <code>\\d{6}</code>."
   ],
   "check": {
    "tests": "assert is_iin(\"990315300123\") is True, \"990315300123 дұрыс: 15 наурыз\"\nassert is_iin(\"051231600456\") is True, \"051231600456 дұрыс: 31 желтоқсан\"\nassert is_iin(\"991315300123\") is False, \"13-ай жоқ: False\"\nassert is_iin(\"990300300123\") is False, \"00 күн жоқ: False\"\nassert is_iin(\"99031530012\") is False and is_iin(\"9903153001234\") is False, \"11 не 13 цифр: False\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Көлік нөмірі",
   "prompt": "Қазақстандық көлік нөмірі: 3 цифр, 3 бас латын әрпі, 2 цифрлы аймақ коды <code>01</code>–<code>20</code> (мысалы, <code>123ABC02</code>; бос орынмен де жазылуы мүмкін: <code>123 ABC 02</code>). <code>parse_plate(text)</code> бос орындарды алып, атаулы топтары бар regex арқылы <code>{\"number\": \"123\", \"letters\": \"ABC\", \"region\": 2}</code> қайтарсын, сәйкес келмесе <code>None</code>.",
   "starter": "import re\n\ndef parse_plate(text):\n    return None\n",
   "solution": "import re\n\nPLATE = re.compile(r\"(?P<number>\\d{3})(?P<letters>[A-Z]{3})(?P<region>0[1-9]|1\\d|20)\")\n\ndef parse_plate(text):\n    m = PLATE.fullmatch(text.replace(\" \", \"\"))\n    if not m:\n        return None\n    d = m.groupdict()\n    return {\"number\": d[\"number\"], \"letters\": d[\"letters\"], \"region\": int(d[\"region\"])}\n",
   "hints": [
    "Атаулы топ: <code>(?P&lt;number&gt;\\d{3})</code>; аймақ: <code>(0[1-9]|1\\d|20)</code>.",
    "<code>m.groupdict()</code>, сосын <code>region</code>-ды <code>int</code> етіңіз."
   ],
   "check": {
    "tests": "assert parse_plate(\"123ABC02\") == {\"number\": \"123\", \"letters\": \"ABC\", \"region\": 2}, \"123ABC02 → number 123, letters ABC, region 2\"\nassert parse_plate(\"777 KZT 17\") == {\"number\": \"777\", \"letters\": \"KZT\", \"region\": 17}, \"Бос орынмен жазылған нөмір\"\nassert parse_plate(\"123ABC21\") is None, \"21 аймақ коды жоқ: None\"\nassert parse_plate(\"123abc02\") is None, \"Кіші әріп: None\"\nassert parse_plate(\"12ABC02\") is None, \"2 цифр: None\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Хэштегтер",
   "prompt": "<code>hashtags(text)</code> мәтіндегі <code>#сөз</code> түріндегі тегтерді (<code>#</code> және одан кейін әріп, цифр, <code>_</code>, кириллица да) кіші әріппен, қайталанбай, алғаш кездескен ретпен тізім етіп қайтарсын. <code>hashtags(\"#Наурыз мерекесі! #наурыз #Алматы2026\")</code> → <code>[\"наурыз\", \"алматы2026\"]</code>.",
   "starter": "import re\n\ndef hashtags(text):\n    return re.findall(r\"#\\w+\", text)\n",
   "solution": "import re\n\ndef hashtags(text):\n    result = []\n    for tag in re.findall(r\"#(\\w+)\", text):\n        tag = tag.lower()\n        if tag not in result:\n            result.append(tag)\n    return result\n",
   "hints": [
    "Топ <code>#(\\w+)</code> болса, <code>findall</code> тек топты қайтарады (<code>#</code>-сіз).",
    "Қайталанбау үшін: <code>if tag not in result: result.append(tag)</code>"
   ],
   "check": {
    "tests": "assert hashtags(\"#Наурыз мерекесі! #наурыз #Алматы2026\") == [\"наурыз\", \"алматы2026\"], \"hashtags(...) ['наурыз', 'алматы2026'] болуы керек\"\nassert hashtags(\"Тег жоқ\") == [], \"Тег жоқ: []\"\nassert hashtags(\"#kofe_bar, #kofe_bar #Тараз\") == [\"kofe_bar\", \"тараз\"], \"_ белгісі тегке кіреді, үтір кірмейді\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Күн форматын ауыстыру",
   "prompt": "API күндерді ISO (<code>2026-03-22</code>) түрінде береді, ал қазақстандық пайдаланушыға <code>22.03.2026</code> ыңғайлы. <code>iso_to_kz(text)</code> мәтіндегі барлық <code>ЖЖЖЖ-АА-КК</code> күндерін <code>re.sub</code> және топқа сілтеме (<code>\\3.\\2.\\1</code>) арқылы <code>КК.АА.ЖЖЖЖ</code> түріне ауыстырсын. Тек жеке тұрған күндер ауыссын: алдында не артында цифр болса (мысалы, <code>12026-03-221</code>), өзгермейді (<code>\\b</code>).",
   "starter": "import re\n\ndef iso_to_kz(text):\n    return text\n",
   "solution": "import re\n\ndef iso_to_kz(text):\n    return re.sub(r\"\\b(\\d{4})-(\\d{2})-(\\d{2})\\b\", r\"\\3.\\2.\\1\", text)\n",
   "hints": [
    "Үш топ: <code>(\\d{4})-(\\d{2})-(\\d{2})</code>; ауыстыру жолы <code>r\"\\3.\\2.\\1\"</code>.",
    "Шекара: үлгіні <code>\\b</code> арасына алыңыз."
   ],
   "check": {
    "tests": "assert iso_to_kz(\"Наурыз: 2026-03-22, Жаңа жыл: 2027-01-01.\") == \"Наурыз: 22.03.2026, Жаңа жыл: 01.01.2027.\", \"Екі күн де ауысуы керек\"\nassert iso_to_kz(\"Күн жоқ\") == \"Күн жоқ\", \"Күн жоқ болса, мәтін өзгермейді\"\nassert iso_to_kz(\"код 12026-03-221\") == \"код 12026-03-221\", \"Ұзын сан тізбегі күн емес\"",
    "mustInclude": [
     "re.sub"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Лог жолын талдау",
   "prompt": "Nginx access log жолы: <code>192.168.0.7 - [16/Oct/2026:14:30:01] \"GET /cafes?city=Almaty HTTP/1.1\" 200 512</code>. <code>parse_log(line)</code> атаулы топтары бар бір regex арқылы сөздік қайтарсын: <code>ip</code>, <code>time</code> (жақшаның ішіндегі мәтін), <code>method</code>, <code>path</code>, <code>status</code> (int), <code>size</code> (int). Сәйкес келмесе <code>None</code>.",
   "starter": "import re\n\ndef parse_log(line):\n    return None\n",
   "solution": "import re\n\nLOG = re.compile(r'(?P<ip>\\d{1,3}(?:\\.\\d{1,3}){3}) - \\[(?P<time>[^\\]]+)\\] \"(?P<method>[A-Z]+) (?P<path>\\S+) HTTP/[\\d.]+\" (?P<status>\\d{3}) (?P<size>\\d+)')\n\ndef parse_log(line):\n    m = LOG.fullmatch(line.strip())\n    if not m:\n        return None\n    d = m.groupdict()\n    d[\"status\"] = int(d[\"status\"])\n    d[\"size\"] = int(d[\"size\"])\n    return d\n",
   "hints": [
    "IP: <code>\\d{1,3}(?:\\.\\d{1,3}){3}</code>; уақыт: <code>\\[(?P&lt;time&gt;[^\\]]+)\\]</code>.",
    "Сұрау бөлігі: <code>\"(?P&lt;method&gt;[A-Z]+) (?P&lt;path&gt;\\S+) HTTP/[\\d.]+\"</code>"
   ],
   "check": {
    "tests": "_l = '192.168.0.7 - [16/Oct/2026:14:30:01] \"GET /cafes?city=Almaty HTTP/1.1\" 200 512'\nassert parse_log(_l) == {\"ip\": \"192.168.0.7\", \"time\": \"16/Oct/2026:14:30:01\", \"method\": \"GET\", \"path\": \"/cafes?city=Almaty\", \"status\": 200, \"size\": 512}, \"parse_log(...) нәтижесі дұрыс емес\"\n_p = parse_log('10.0.0.1 - [17/Oct/2026:09:00:00] \"POST /v1/orders HTTP/2\" 201 48')\nassert _p[\"method\"] == \"POST\" and _p[\"status\"] == 201 and _p[\"size\"] == 48, \"POST жолы: 201, 48\"\nassert parse_log(\"бұзық жол\") is None, \"Сәйкес келмесе: None\"\nassert parse_log('10.0.0.1 - [x] \"GET / HTTP/1.1\" 2000 1') is None, \"Status 3 цифр болуы керек\""
   }
  }
 ],
 "pyb-10": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Coroutine объектісі",
   "prompt": "<code>async def greet(name)</code> функциясын жазыңыз: ол <code>f\"Сәлем, {name}!\"</code> қайтарсын. Сосын <code>kind</code> айнымалысына <code>greet(\"Дана\")</code> шақыруы қайтаратын объектінің типінің атауын жазыңыз (<code>type(...).__name__</code>), ал coroutine-ды <code>.close()</code> арқылы жабыңыз.",
   "starter": "def greet(name):\n    return f\"Сәлем, {name}!\"\n\nkind = \"\"\n",
   "solution": "async def greet(name):\n    return f\"Сәлем, {name}!\"\n\n_coro = greet(\"Дана\")\nkind = type(_coro).__name__\n_coro.close()\n",
   "hints": [
    "<code>async def</code> функциясын шақыру оны орындамайды, coroutine объектісін береді.",
    "<code>c = greet(\"Дана\")</code>, <code>kind = type(c).__name__</code>, <code>c.close()</code>"
   ],
   "check": {
    "tests": "import inspect as _inspect\nassert _inspect.iscoroutinefunction(greet), \"greet async def арқылы жазылуы керек\"\nassert kind == \"coroutine\", \"kind = 'coroutine' болуы керек\"\n_c = greet(\"Ерлан\")\ntry:\n    _c.send(None)\n    _val = None\nexcept StopIteration as _e:\n    _val = _e.value\nassert _val == \"Сәлем, Ерлан!\", \"Coroutine орындалғанда 'Сәлем, Ерлан!' қайтаруы керек\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Күту уақыты",
   "prompt": "Сервер үш сыртқы сервиске сұрау жібереді, әрқайсысы <code>durations</code> тізіміндегі миллисекунд күтеді. <code>total_wait(durations, concurrent)</code>: кезекпен (<code>concurrent=False</code>) жалпы уақыт — қосынды; бір мезгілде (<code>True</code>) — ең ұзағы. Бос тізімде 0.",
   "starter": "def total_wait(durations, concurrent):\n    return sum(durations)\n",
   "solution": "def total_wait(durations, concurrent):\n    if not durations:\n        return 0\n    return max(durations) if concurrent else sum(durations)\n",
   "hints": [
    "Concurrent: күтулер бір-бірін жабады, сондықтан <code>max</code>.",
    "Бос тізімде <code>max</code> қате береді: алдымен тексеріңіз."
   ],
   "check": {
    "tests": "assert total_wait([20, 300, 150], concurrent=False) == 470, \"Кезекпен: 20 + 300 + 150 = 470\"\nassert total_wait([20, 300, 150], concurrent=True) == 300, \"Бір мезгілде: ең ұзағы 300\"\nassert total_wait([], concurrent=True) == 0, \"Бос тізім: 0\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Фондық кезек",
   "prompt": "Handler ауыр жұмысты кезекке салып, бірден <code>202</code> қайтарады. <code>TaskQueue</code> класын жазыңыз (<code>collections.deque</code>): <code>submit(name)</code> тапсырманы кезек соңына қойып, <code>(202, {\"task_id\": n})</code> қайтарады (<code>n</code> 1-ден өседі); <code>work()</code> кезектің басындағы тапсырманы алып, <code>done</code> тізіміне қосып, атауын қайтарады (кезек бос болса — <code>None</code>).",
   "starter": "from collections import deque\n\nclass TaskQueue:\n    def __init__(self):\n        self.queue = deque()\n        self.done = []\n",
   "solution": "from collections import deque\n\nclass TaskQueue:\n    def __init__(self):\n        self.queue = deque()\n        self.done = []\n        self.next_id = 1\n\n    def submit(self, name):\n        self.queue.append(name)\n        task_id = self.next_id\n        self.next_id += 1\n        return 202, {\"task_id\": task_id}\n\n    def work(self):\n        if not self.queue:\n            return None\n        name = self.queue.popleft()\n        self.done.append(name)\n        return name\n",
   "hints": [
    "<code>submit</code>: <code>self.queue.append(name)</code>, id санауышы.",
    "<code>work</code>: <code>self.queue.popleft()</code>, бос кезекте <code>None</code>."
   ],
   "check": {
    "tests": "_q = TaskQueue()\nassert _q.submit(\"чек PDF\") == (202, {\"task_id\": 1}), \"submit: (202, {'task_id': 1})\"\nassert _q.submit(\"SMS хабар\") == (202, {\"task_id\": 2}), \"Екінші тапсырма: task_id 2\"\nassert _q.work() == \"чек PDF\" and _q.work() == \"SMS хабар\", \"Тапсырмалар кезек ретімен орындалады\"\nassert _q.work() is None and _q.done == [\"чек PDF\", \"SMS хабар\"], \"Бос кезек: None; done тізімі толы\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "TTL кэш",
   "prompt": "Валюта бағамы 60 секунд кэште тұрсын. <code>TTLCache(ttl, clock)</code> жазыңыз: <code>set(key, value)</code> мәнді сақтау уақытымен бірге жазады; <code>get(key)</code> мән бар және <code>clock() - сақталған_уақыт &lt; ttl</code> болса мәнді, әйтпесе <code>None</code> қайтарады (мерзімі біткенін өшіреді).",
   "starter": "class TTLCache:\n    def __init__(self, ttl, clock):\n        self.ttl, self.clock = ttl, clock\n        self.data = {}\n\n    def set(self, key, value):\n        self.data[key] = value\n\n    def get(self, key):\n        return self.data.get(key)\n",
   "solution": "class TTLCache:\n    def __init__(self, ttl, clock):\n        self.ttl, self.clock = ttl, clock\n        self.data = {}\n\n    def set(self, key, value):\n        self.data[key] = (value, self.clock())\n\n    def get(self, key):\n        if key not in self.data:\n            return None\n        value, saved = self.data[key]\n        if self.clock() - saved >= self.ttl:\n            del self.data[key]\n            return None\n        return value\n",
   "hints": [
    "Мәнмен бірге уақытты сақтаңыз: <code>self.data[key] = (value, self.clock())</code>.",
    "<code>get</code>: мерзімі біткен болса <code>del</code> және <code>None</code>."
   ],
   "check": {
    "tests": "class _Clock:\n    def __init__(self):\n        self.t = 0\n    def __call__(self):\n        return self.t\n_c = _Clock()\n_cache = TTLCache(60, _c)\n_cache.set(\"USD\", 470)\n_c.t = 59\nassert _cache.get(\"USD\") == 470, \"59 секундта мән әлі бар\"\n_c.t = 60\nassert _cache.get(\"USD\") is None, \"60 секундта мерзімі бітеді\"\nassert \"USD\" not in _cache.data, \"Мерзімі біткен жазба өшірілуі керек\"\nassert _cache.get(\"EUR\") is None, \"Жоқ кілт: None\"\n_cache.set(\"EUR\", 510); _c.t = 100\nassert _cache.get(\"EUR\") == 510, \"Жаңа жазбаның уақыты set кезінен саналады\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Тұрақты терезе лимиті",
   "prompt": "Ең қарапайым rate limiter — тұрақты терезе: уақыт <code>window</code> секундтық терезелерге бөлінеді (<code>int(clock() // window)</code>), әр терезеде бір key үшін ең көбі <code>limit</code> сұрау. <code>FixedWindow(limit, window, clock)</code> класының <code>allow(key)</code> әдісі сұрау рұқсат етілсе <code>True</code>, әйтпесе <code>False</code> (429) қайтарсын.",
   "starter": "class FixedWindow:\n    def __init__(self, limit, window, clock):\n        self.limit, self.window, self.clock = limit, window, clock\n\n    def allow(self, key):\n        return True\n",
   "solution": "class FixedWindow:\n    def __init__(self, limit, window, clock):\n        self.limit, self.window, self.clock = limit, window, clock\n        self.counts = {}\n\n    def allow(self, key):\n        slot = int(self.clock() // self.window)\n        k = (key, slot)\n        n = self.counts.get(k, 0)\n        if n >= self.limit:\n            return False\n        self.counts[k] = n + 1\n        return True\n",
   "hints": [
    "Санауыш кілті: <code>(key, int(self.clock() // self.window))</code>.",
    "Шекке жетсе <code>False</code>, әйтпесе санауышты өсіріп <code>True</code>."
   ],
   "check": {
    "tests": "class _Clock:\n    def __init__(self):\n        self.t = 0.0\n    def __call__(self):\n        return self.t\n_c = _Clock()\n_fw = FixedWindow(limit=2, window=60, clock=_c)\nassert [_fw.allow(\"ip1\") for _ in range(3)] == [True, True, False], \"Бір терезеде 2 сұрау ғана\"\nassert _fw.allow(\"ip2\") is True, \"Әр key өз санауышымен\"\n_c.t = 59.9\nassert _fw.allow(\"ip1\") is False, \"59.9 секунд әлі бірінші терезе\"\n_c.t = 60\nassert _fw.allow(\"ip1\") is True, \"Жаңа терезеде санауыш нөлден басталады\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қайталап көру",
   "prompt": "Фондық тапсырма уақытша қатемен құлауы мүмкін (желі үзілді). <code>retry(func, attempts)</code> <code>func()</code>-ты шақырсын: exception шықса, тағы көрсін, барлығы <code>attempts</code> ретке дейін. Сәтті болса нәтижені қайтарсын; барлық әрекет сәтсіз болса, <b>соңғы</b> exception-ды қайта көтерсін (<code>raise</code>).",
   "starter": "def retry(func, attempts):\n    return func()\n",
   "solution": "def retry(func, attempts):\n    last = None\n    for _ in range(attempts):\n        try:\n            return func()\n        except Exception as e:\n            last = e\n    raise last\n",
   "hints": [
    "Цикл ішінде <code>try: return func()</code>, <code>except Exception as e: last = e</code>.",
    "Цикл біткенде <code>raise last</code>."
   ],
   "check": {
    "tests": "_n = {\"calls\": 0}\ndef _flaky():\n    _n[\"calls\"] += 1\n    if _n[\"calls\"] < 3:\n        raise ConnectionError(f\"әрекет {_n['calls']}\")\n    return \"SMS жіберілді\"\nassert retry(_flaky, 5) == \"SMS жіберілді\" and _n[\"calls\"] == 3, \"Үшінші әрекет сәтті: 3 шақыру\"\n_n[\"calls\"] = 0\n_err = None\ntry:\n    retry(_flaky, 2)\nexcept ConnectionError as _e:\n    _err = str(_e)\nassert _err == \"әрекет 2\" and _n[\"calls\"] == 2, \"2 әрекет сәтсіз: соңғы exception ('әрекет 2') көтеріледі\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Тапсырмалар біту реті",
   "prompt": "Сабақтағы жалған сағатты scheduler-ді жазыңыз. Әр тапсырма — генератор: <code>yield</code> «қанша секунд күтемін» дегенді береді. <code>finish_order(tasks)</code> <code>heapq</code> кезегімен <code>(уақыт, индекс, генератор)</code> жүргізіп, тапсырмалар біткен ретпен <code>(уақыт, индекс)</code> тізімін қайтарсын. Уақыттар тең болса, кіші индекс бірінші.",
   "starter": "import heapq\n\ndef order(steps):\n    for seconds in steps:\n        yield seconds\n\ndef finish_order(tasks):\n    return []\n",
   "solution": "import heapq\n\ndef order(steps):\n    for seconds in steps:\n        yield seconds\n\ndef finish_order(tasks):\n    queue = [(0, i, t) for i, t in enumerate(tasks)]\n    heapq.heapify(queue)\n    done = []\n    while queue:\n        clock, i, task = heapq.heappop(queue)\n        try:\n            delay = next(task)\n            heapq.heappush(queue, (clock + delay, i, task))\n        except StopIteration:\n            done.append((clock, i))\n    return done\n",
   "hints": [
    "Басында: <code>queue = [(0, i, t) for i, t in enumerate(tasks)]</code>, <code>heapq.heapify(queue)</code>.",
    "<code>next(task)</code> күту уақытын береді; <code>StopIteration</code> — тапсырма бітті."
   ],
   "check": {
    "tests": "_tasks = [order([3, 1]), order([1, 1]), order([5])]\nassert finish_order(_tasks) == [(2, 1), (4, 0), (5, 2)], \"Біту реті: (2, 1), (4, 0), (5, 2)\"\nassert finish_order([order([2]), order([2])]) == [(2, 0), (2, 1)], \"Уақыт тең: кіші индекс бірінші\"\nassert finish_order([order([])]) == [(0, 0)], \"Күтусіз тапсырма 0-де бітеді\"\nassert finish_order([]) == [], \"Тапсырма жоқ: []\"",
    "mustInclude": [
     "heapq"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Жылжымалы терезе",
   "prompt": "Тұрақты терезе шекарада екі есе сұрау өткізіп жібереді. <code>SlidingLog(limit, window, clock)</code> жазыңыз: әр key үшін соңғы сұраулардың уақытын <code>deque</code>-та сақтайды. <code>allow(key)</code>: алдымен <code>now - window</code>-дан ескі (<code>&lt;=</code>) уақыттарды сол жақтан өшіреді; қалғаны <code>limit</code>-тен аз болса, <code>now</code>-ды қосып <code>True</code>, әйтпесе <code>False</code>.",
   "starter": "from collections import deque\n\nclass SlidingLog:\n    def __init__(self, limit, window, clock):\n        self.limit, self.window, self.clock = limit, window, clock\n        self.logs = {}\n\n    def allow(self, key):\n        return True\n",
   "solution": "from collections import deque\n\nclass SlidingLog:\n    def __init__(self, limit, window, clock):\n        self.limit, self.window, self.clock = limit, window, clock\n        self.logs = {}\n\n    def allow(self, key):\n        now = self.clock()\n        log = self.logs.setdefault(key, deque())\n        while log and log[0] <= now - self.window:\n            log.popleft()\n        if len(log) < self.limit:\n            log.append(now)\n            return True\n        return False\n",
   "hints": [
    "<code>log = self.logs.setdefault(key, deque())</code>",
    "Ескілерін өшіру: <code>while log and log[0] <= now - self.window: log.popleft()</code>"
   ],
   "check": {
    "tests": "class _Clock:\n    def __init__(self):\n        self.t = 0.0\n    def __call__(self):\n        return self.t\n_c = _Clock()\n_sl = SlidingLog(limit=2, window=10, clock=_c)\n_c.t = 9\nassert _sl.allow(\"u\") and _sl.allow(\"u\"), \"Алғашқы 2 сұрау өтеді\"\n_c.t = 11\nassert _sl.allow(\"u\") is False, \"t=11: соңғы 10 секундта 2 сұрау бар (t=9), 429\"\n_c.t = 19\nassert _sl.allow(\"u\") is True, \"t=19: t=9 сұраулары терезеден шықты\"\nassert _sl.allow(\"v\") is True, \"Әр key бөлек\"\nassert len(_sl.logs[\"u\"]) == 1, \"Ескі уақыттар deque-тан өшірілуі керек\"",
    "mustInclude": [
     "deque"
    ]
   }
  }
 ],
 "pyb-11": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Env логикалық мәні",
   "prompt": "Env айнымалылары әрқашан жол. <code>env_bool(env, key)</code> мән <code>\"1\"</code>, <code>\"true\"</code>, <code>\"yes\"</code> немесе <code>\"on\"</code> болса (регистрге қарамай, бос орындарсыз) <code>True</code>, басқа мәнде немесе кілт жоқ болса <code>False</code> қайтарсын. <code>env_bool({\"DEBUG\": \"False\"}, \"DEBUG\")</code> → <code>False</code>.",
   "starter": "def env_bool(env, key):\n    return bool(env.get(key))\n",
   "solution": "def env_bool(env, key):\n    return env.get(key, \"\").strip().lower() in {\"1\", \"true\", \"yes\", \"on\"}\n",
   "hints": [
    "<code>bool(\"False\")</code> — <code>True</code>, сондықтан жолды салыстыру керек.",
    "<code>env.get(key, \"\").strip().lower() in {...}</code>"
   ],
   "check": {
    "tests": "assert env_bool({\"DEBUG\": \"False\"}, \"DEBUG\") is False, \"'False' жолы False болуы керек\"\nassert env_bool({\"DEBUG\": \" TRUE \"}, \"DEBUG\") is True, \"' TRUE ' → True\"\nassert env_bool({\"USE_CACHE\": \"1\"}, \"USE_CACHE\") is True and env_bool({\"X\": \"on\"}, \"X\") is True, \"'1', 'on' → True\"\nassert env_bool({}, \"DEBUG\") is False, \"Кілт жоқ: False\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Worker саны",
   "prompt": "Gunicorn үшін бастапқы ереже: <code>2 × ядро + 1</code>. <code>workers(cores, max_workers=17)</code> worker санын қайтарсын, бірақ <code>max_workers</code>-тен аспасын. Ядро саны 1-ден кіші болса, <code>ValueError</code>.",
   "starter": "def workers(cores, max_workers=17):\n    return cores\n",
   "solution": "def workers(cores, max_workers=17):\n    if cores < 1:\n        raise ValueError(\"ядро саны кемінде 1\")\n    return min(2 * cores + 1, max_workers)\n",
   "hints": [
    "<code>min(2 * cores + 1, max_workers)</code>",
    "Алдымен <code>cores < 1</code> тексеріңіз."
   ],
   "check": {
    "tests": "assert workers(2) == 5, \"2 ядро: 5 worker\"\nassert workers(4) == 9, \"4 ядро: 9 worker\"\nassert workers(16) == 17 and workers(4, max_workers=6) == 6, \"max_workers-тен аспайды\"\n_ok = False\ntry:\n    workers(0)\nexcept ValueError:\n    _ok = True\nassert _ok, \"0 ядро: ValueError\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Порт сәйкестігі",
   "prompt": "docker-compose-та <code>ports: [\"8000:80\"]</code> — «хост порты : container порты». <code>parse_port(mapping)</code> <code>(host, container)</code> бүтін сандар кортежін қайтарсын. Пішім қате болса (қос нүкте жоқ, сан емес, порт 1–65535 аралығынан тыс) — <code>ValueError</code>.",
   "starter": "def parse_port(mapping):\n    host, container = mapping.split(\":\")\n    return host, container\n",
   "solution": "def parse_port(mapping):\n    parts = mapping.split(\":\")\n    if len(parts) != 2 or not all(p.isdigit() for p in parts):\n        raise ValueError(\"пішім: HOST:CONTAINER\")\n    host, container = int(parts[0]), int(parts[1])\n    if not (1 <= host <= 65535 and 1 <= container <= 65535):\n        raise ValueError(\"порт 1-65535\")\n    return host, container\n",
   "hints": [
    "<code>parts = mapping.split(\":\")</code>, екі бөлік те <code>isdigit()</code> болуы керек.",
    "Порт аралығы: <code>1 <= p <= 65535</code>."
   ],
   "check": {
    "tests": "assert parse_port(\"8000:80\") == (8000, 80), \"parse_port('8000:80') (8000, 80) болуы керек\"\nassert parse_port(\"5432:5432\") == (5432, 5432), \"Бірдей порттар\"\nfor _bad in (\"8000\", \"abc:80\", \"8000:70000\", \"0:80\", \"1:2:3\"):\n    _ok = False\n    try:\n        parse_port(_bad)\n    except ValueError:\n        _ok = True\n    assert _ok, f\"parse_port({_bad!r}) ValueError беруі керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Міндетті айнымалылар",
   "prompt": "Қосымша іске қосылмас бұрын баптауларды тексереді. <code>missing_vars(env, required)</code> <code>required</code> тізіміндегі, env-те жоқ немесе мәні бос (бос орындардан ғана тұратын) айнымалылар атауларын берілген ретпен қайтарсын. <code>startup_check(env, required)</code>: ештеңе жетіспесе <code>\"ok\"</code>, әйтпесе <code>RuntimeError(\"Жетіспейді: A, B\")</code> көтерсін.",
   "starter": "def missing_vars(env, required):\n    return [k for k in required if k not in env]\n\ndef startup_check(env, required):\n    return \"ok\"\n",
   "solution": "def missing_vars(env, required):\n    return [k for k in required if not env.get(k, \"\").strip()]\n\ndef startup_check(env, required):\n    missing = missing_vars(env, required)\n    if missing:\n        raise RuntimeError(\"Жетіспейді: \" + \", \".join(missing))\n    return \"ok\"\n",
   "hints": [
    "Бос мәнді де тексеріңіз: <code>not env.get(k, \"\").strip()</code>.",
    "<code>raise RuntimeError(\"Жетіспейді: \" + \", \".join(missing))</code>"
   ],
   "check": {
    "tests": "_env = {\"DATABASE_URL\": \"postgres://db/kofe\", \"SECRET_KEY\": \"  \", \"DEBUG\": \"false\"}\n_req = [\"DATABASE_URL\", \"SECRET_KEY\", \"REDIS_URL\"]\nassert missing_vars(_env, _req) == [\"SECRET_KEY\", \"REDIS_URL\"], \"Бос және жоқ айнымалылар: ['SECRET_KEY', 'REDIS_URL']\"\nassert startup_check(_env, [\"DATABASE_URL\"]) == \"ok\", \"Бәрі бар: 'ok'\"\n_msg = None\ntry:\n    startup_check(_env, _req)\nexcept RuntimeError as _e:\n    _msg = str(_e)\nassert _msg == \"Жетіспейді: SECRET_KEY, REDIS_URL\", \"RuntimeError хабары: 'Жетіспейді: SECRET_KEY, REDIS_URL'\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Gunicorn командасы",
   "prompt": "Dockerfile-дағы <code>CMD</code> үшін команданы тізім етіп құрайық. <code>gunicorn_cmd(app, workers=4, port=8000, host=\"0.0.0.0\")</code> мынаны қайтарсын: <code>[\"gunicorn\", \"--workers\", \"4\", \"--bind\", \"0.0.0.0:8000\", \"app:app\"]</code> (барлық элемент — жол). <code>app</code> <code>\"модуль:объект\"</code> пішімінде болмаса, <code>ValueError</code>.",
   "starter": "def gunicorn_cmd(app, workers=4, port=8000, host=\"0.0.0.0\"):\n    return [\"gunicorn\", app]\n",
   "solution": "def gunicorn_cmd(app, workers=4, port=8000, host=\"0.0.0.0\"):\n    module, sep, obj = app.partition(\":\")\n    if not sep or not module or not obj:\n        raise ValueError(\"app пішімі: модуль:объект\")\n    return [\"gunicorn\", \"--workers\", str(workers), \"--bind\", f\"{host}:{port}\", app]\n",
   "hints": [
    "Сандарды жолға айналдырыңыз: <code>str(workers)</code>, <code>f\"{host}:{port}\"</code>.",
    "Тексеру: <code>app.partition(\":\")</code> үш бөлігі де бос болмауы керек."
   ],
   "check": {
    "tests": "assert gunicorn_cmd(\"app:app\") == [\"gunicorn\", \"--workers\", \"4\", \"--bind\", \"0.0.0.0:8000\", \"app:app\"], \"Әдепкі команда дұрыс емес\"\nassert gunicorn_cmd(\"kofe.wsgi:application\", workers=9, port=5000) == [\"gunicorn\", \"--workers\", \"9\", \"--bind\", \"0.0.0.0:5000\", \"kofe.wsgi:application\"], \"workers=9, port=5000\"\nfor _bad in (\"app\", \":app\", \"app:\"):\n    _ok = False\n    try:\n        gunicorn_cmd(_bad)\n    except ValueError:\n        _ok = True\n    assert _ok, f\"gunicorn_cmd({_bad!r}) ValueError беруі керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "DATABASE_URL талдау",
   "prompt": "<code>parse_db_url(url)</code> <code>postgres://kofe:pw@db:5432/kofe</code> түріндегі мекенжайды regex (атаулы топтар) арқылы талдап, сөздік қайтарсын: <code>scheme</code>, <code>user</code>, <code>password</code>, <code>host</code>, <code>port</code> (int; берілмесе <code>5432</code>), <code>name</code>. Сәйкес келмесе <code>ValueError</code>.",
   "starter": "import re\n\ndef parse_db_url(url):\n    return {}\n",
   "solution": "import re\n\nDB_URL = re.compile(r\"(?P<scheme>[a-z]+)://(?P<user>[^:@/]+):(?P<password>[^@/]+)@(?P<host>[^:/]+)(?::(?P<port>\\d+))?/(?P<name>\\w+)\")\n\ndef parse_db_url(url):\n    m = DB_URL.fullmatch(url)\n    if not m:\n        raise ValueError(\"DATABASE_URL пішімі қате\")\n    d = m.groupdict()\n    d[\"port\"] = int(d[\"port\"]) if d[\"port\"] else 5432\n    return d\n",
   "hints": [
    "Порт міндетті емес: <code>(?::(?P&lt;port&gt;\\d+))?</code>.",
    "<code>m.groupdict()</code>; порт жоқ болса <code>None</code> келеді."
   ],
   "check": {
    "tests": "assert parse_db_url(\"postgres://kofe:pw@db:5432/kofe\") == {\"scheme\": \"postgres\", \"user\": \"kofe\", \"password\": \"pw\", \"host\": \"db\", \"port\": 5432, \"name\": \"kofe\"}, \"parse_db_url(...) нәтижесі дұрыс емес\"\nassert parse_db_url(\"postgres://admin:s3cret@10.0.0.5/shop\")[\"port\"] == 5432, \"Порт жоқ: 5432\"\nassert parse_db_url(\"mysql://root:x@localhost:3306/app\")[\"port\"] == 3306, \"Порт int: 3306\"\n_ok = False\ntry:\n    parse_db_url(\"db:5432/kofe\")\nexcept ValueError:\n    _ok = True\nassert _ok, \"Пішім қате: ValueError\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Баптаулар қабаттары",
   "prompt": "<code>load_config(defaults, env_text, overrides)</code> баптауларды үш қабаттан жинасын: <code>defaults</code> → <code>.env</code> мәтіні → <code>overrides</code> (кейінгісі басым). <code>.env</code>: бос жолдар мен <code>#</code> жолдары өткізіледі, бірінші <code>=</code> бойынша бөлінеді, кілт пен мән <code>strip</code>. Мән жол болып келеді: <code>defaults</code>-тағы мән <code>int</code> болса — <code>int</code>-ке, <code>bool</code> болса — <code>\"true\"/\"1\"</code> → <code>True</code>, басқасы → <code>False</code> болып түрленсін. <code>defaults</code>-та жоқ кілттер жол күйінде қалады.",
   "starter": "def load_config(defaults, env_text, overrides):\n    config = dict(defaults)\n    config.update(overrides)\n    return config\n",
   "solution": "def _cast(value, sample):\n    if isinstance(sample, bool):\n        return value.strip().lower() in (\"true\", \"1\")\n    if isinstance(sample, int):\n        return int(value)\n    return value\n\ndef load_config(defaults, env_text, overrides):\n    config = dict(defaults)\n    for raw in env_text.splitlines():\n        line = raw.strip()\n        if not line or line.startswith(\"#\"):\n            continue\n        key, value = line.split(\"=\", 1)\n        key, value = key.strip(), value.strip()\n        config[key] = _cast(value, defaults[key]) if key in defaults else value\n    config.update(overrides)\n    return config\n",
   "hints": [
    "Тип түрлендіру үшін көмекші функция: алдымен <code>bool</code>-ды тексеріңіз (себебі <code>bool</code> — <code>int</code>-тің ұрпағы).",
    "Рет: <code>dict(defaults)</code> → .env жолдары → <code>config.update(overrides)</code>."
   ],
   "check": {
    "tests": "_defaults = {\"PORT\": 8000, \"DEBUG\": False, \"WORKERS\": 4, \"CITY\": \"Алматы\"}\n_env = \"\"\"\n# production\nPORT=9000\nDEBUG = true\nSENTRY_DSN=https://key@sentry.io/1\nWORKERS=4\n\"\"\"\n_cfg = load_config(_defaults, _env, {\"WORKERS\": 9})\nassert _cfg[\"PORT\"] == 9000 and isinstance(_cfg[\"PORT\"], int), \"PORT .env-тен келіп, int-ке түрленеді\"\nassert _cfg[\"DEBUG\"] is True, \"DEBUG='true' → True\"\nassert _cfg[\"WORKERS\"] == 9, \"overrides ең басым\"\nassert _cfg[\"CITY\"] == \"Алматы\", \".env-те жоқ кілт defaults-тан\"\nassert _cfg[\"SENTRY_DSN\"] == \"https://key@sentry.io/1\", \"defaults-та жоқ кілт жол күйінде\"\nassert load_config({\"DEBUG\": True}, \"DEBUG=no\", {})[\"DEBUG\"] is False, \"DEBUG='no' → False\"\nassert _defaults[\"PORT\"] == 8000, \"defaults өзгермеуі керек\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "CI тізбегі",
   "prompt": "CI/CD: тест құласа, деплой болмайды. <code>run_pipeline(steps)</code> <code>(атау, функция)</code> қадамдарын ретімен орындасын. Функция <code>False</code> қайтарса немесе exception шығарса, қадам сәтсіз: тізбек сол жерде тоқтайды. Нәтиже: <code>{\"status\": \"success\" немесе \"failed\", \"ran\": [орындалған қадамдар атаулары], \"failed\": сәтсіз қадам атауы немесе None}</code>.",
   "starter": "def run_pipeline(steps):\n    ran = []\n    for name, fn in steps:\n        fn()\n        ran.append(name)\n    return {\"status\": \"success\", \"ran\": ran, \"failed\": None}\n",
   "solution": "def run_pipeline(steps):\n    ran = []\n    for name, fn in steps:\n        ran.append(name)\n        try:\n            ok = fn()\n        except Exception:\n            ok = False\n        if ok is False:\n            return {\"status\": \"failed\", \"ran\": ran, \"failed\": name}\n    return {\"status\": \"success\", \"ran\": ran, \"failed\": None}\n",
   "hints": [
    "Әр қадамды <code>try/except Exception</code> ішінде шақырыңыз.",
    "Сәтсіз қадамда бірден <code>return {\"status\": \"failed\", ...}</code> — келесі қадамдар орындалмайды."
   ],
   "check": {
    "tests": "_log = []\ndef _lint():\n    _log.append(\"lint\"); return True\ndef _tests():\n    _log.append(\"tests\"); raise AssertionError(\"test_order_qty құлады\")\ndef _deploy():\n    _log.append(\"deploy\"); return True\nassert run_pipeline([(\"lint\", _lint), (\"tests\", _tests), (\"deploy\", _deploy)]) == {\"status\": \"failed\", \"ran\": [\"lint\", \"tests\"], \"failed\": \"tests\"}, \"Тест құласа, тізбек тоқтайды\"\nassert \"deploy\" not in _log, \"Тест құласа, deploy орындалмауы керек\"\nassert run_pipeline([(\"lint\", _lint), (\"build\", lambda: False)])[\"failed\"] == \"build\", \"False қайтарған қадам да сәтсіз\"\nassert run_pipeline([(\"lint\", _lint), (\"deploy\", _deploy)]) == {\"status\": \"success\", \"ran\": [\"lint\", \"deploy\"], \"failed\": None}, \"Бәрі өтсе: success\""
   }
  }
 ],
 "pyb-12": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "URL схемасын тексеру",
   "prompt": "Қысқартқыш тек <code>http</code> және <code>https</code> сілтемелерін қабылдайды (<code>javascript:</code> немесе <code>ftp://</code> емес). <code>is_http_url(url)</code> мекенжай <code>http://</code> немесе <code>https://</code>-тен басталып, одан кейін бос емес, бос орынсыз мәтін болса <code>True</code> қайтарсын.",
   "starter": "def is_http_url(url):\n    return \"://\" in url\n",
   "solution": "def is_http_url(url):\n    for prefix in (\"http://\", \"https://\"):\n        if url.startswith(prefix):\n            rest = url[len(prefix):]\n            return rest != \"\" and \" \" not in rest\n    return False\n",
   "hints": [
    "Екі префиксті тексеріңіз: <code>url.startswith(\"https://\")</code>.",
    "Префикстен кейінгі бөлік бос болмауы және бос орынсыз болуы керек."
   ],
   "check": {
    "tests": "assert is_http_url(\"https://kaspi.kz/shop\") is True, \"https сілтемесі дұрыс\"\nassert is_http_url(\"http://egov.kz\") is True, \"http сілтемесі дұрыс\"\nassert is_http_url(\"ftp://files.kz\") is False, \"ftp рұқсат етілмейді\"\nassert is_http_url(\"javascript:alert(1)\") is False, \"javascript: рұқсат етілмейді\"\nassert is_http_url(\"https://\") is False and is_http_url(\"https://a b.kz\") is False, \"Бос немесе бос орынды мекенжай: False\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қысқа сілтеме",
   "prompt": "<code>short_url(base, code)</code> қысқа сілтемені құрсын: <code>base</code> соңындағы <code>/</code> болса да, болмаса да, нәтижеде бір ғана <code>/</code> тұрсын. <code>short_url(\"https://tq.kz/\", \"q0U\")</code> → <code>\"https://tq.kz/q0U\"</code>.",
   "starter": "def short_url(base, code):\n    return base + \"/\" + code\n",
   "solution": "def short_url(base, code):\n    return base.rstrip(\"/\") + \"/\" + code\n",
   "hints": [
    "<code>base.rstrip(\"/\")</code> соңғы қиғаш сызықты алады.",
    "<code>base.rstrip(\"/\") + \"/\" + code</code>"
   ],
   "check": {
    "tests": "assert short_url(\"https://tq.kz/\", \"q0U\") == \"https://tq.kz/q0U\", \"short_url('https://tq.kz/', 'q0U') 'https://tq.kz/q0U' болуы керек\"\nassert short_url(\"https://tq.kz\", \"nauryz\") == \"https://tq.kz/nauryz\", \"base соңында / жоқ болса да дұрыс\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Кліктер рейтингі",
   "prompt": "<code>links</code> — код → <code>{\"url\": ..., \"clicks\": n}</code> сөздігі. <code>top_links(links, n)</code> кліктері ең көп <code>n</code> кодты тізім етіп қайтарсын: кліктер бойынша кему, тең болса — код бойынша әліпби ретімен.",
   "starter": "def top_links(links, n):\n    return list(links)[:n]\n",
   "solution": "def top_links(links, n):\n    ordered = sorted(links, key=lambda c: (-links[c][\"clicks\"], c))\n    return ordered[:n]\n",
   "hints": [
    "Сөздікті сұрыптасаңыз, кілттері сұрыпталады: <code>sorted(links, key=...)</code>.",
    "Кілт: <code>lambda c: (-links[c][\"clicks\"], c)</code>"
   ],
   "check": {
    "tests": "_l = {\"q0U\": {\"url\": \"https://a.kz\", \"clicks\": 5}, \"nauryz\": {\"url\": \"https://b.kz\", \"clicks\": 12}, \"abc\": {\"url\": \"https://c.kz\", \"clicks\": 5}, \"zz\": {\"url\": \"https://d.kz\", \"clicks\": 0}}\nassert top_links(_l, 3) == [\"nauryz\", \"abc\", \"q0U\"], \"top_links(_l, 3) ['nauryz', 'abc', 'q0U'] болуы керек\"\nassert top_links(_l, 1) == [\"nauryz\"], \"top_links(_l, 1) ['nauryz']\"\nassert top_links({}, 5) == [], \"Сілтеме жоқ: []\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Кез келген негізде кодтау",
   "prompt": "Base62 идеясын жалпылаймыз. <code>encode_base(n, alphabet)</code> теріс емес санды берілген алфавиттегі жүйеге айналдырсын (негіз = <code>len(alphabet)</code>), <code>decode_base(s, alphabet)</code> кері айналдырсын. <code>encode_base(255, \"0123456789abcdef\")</code> → <code>\"ff\"</code>; <code>encode_base(0, ...)</code> → алфавиттің бірінші таңбасы.",
   "starter": "def encode_base(n, alphabet):\n    return str(n)\n\ndef decode_base(s, alphabet):\n    return int(s)\n",
   "solution": "def encode_base(n, alphabet):\n    base = len(alphabet)\n    if n == 0:\n        return alphabet[0]\n    out = []\n    while n:\n        n, r = divmod(n, base)\n        out.append(alphabet[r])\n    return \"\".join(reversed(out))\n\ndef decode_base(s, alphabet):\n    base = len(alphabet)\n    n = 0\n    for ch in s:\n        n = n * base + alphabet.index(ch)\n    return n\n",
   "hints": [
    "<code>divmod(n, base)</code> соңғы «цифрды» береді; нәтижені кері ретпен біріктіріңіз.",
    "Горнер схемасы: <code>n = n * base + alphabet.index(ch)</code>"
   ],
   "check": {
    "tests": "_hex = \"0123456789abcdef\"\nassert encode_base(255, _hex) == \"ff\" and decode_base(\"ff\", _hex) == 255, \"255 ↔ 'ff'\"\nassert encode_base(5, \"01\") == \"101\", \"Екілік жүйе: 5 → '101'\"\nassert encode_base(0, _hex) == \"0\", \"0 → алфавиттің бірінші таңбасы\"\n_b36 = \"0123456789abcdefghijklmnopqrstuvwxyz\"\nassert encode_base(100000, _b36) == \"255s\", \"Base36: 100000 → '255s'\"\nassert all(decode_base(encode_base(_n, _b36), _b36) == _n for _n in (1, 35, 36, 99999, 10**9)), \"decode(encode(n)) = n болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Alias тексеру",
   "prompt": "<code>check_alias(alias, taken)</code> пайдаланушы таңдаған alias-ты тексеріп, қате хабарын немесе <code>None</code> қайтарсын (тексеру реті маңызды): <code>[A-Za-z0-9_-]{3,20}</code> үлгісіне (<code>fullmatch</code>) сай болмаса — <code>\"alias форматы қате\"</code>; резервтегі сөз болса (<code>RESERVED</code>, регистрге қарамай) — <code>\"alias резервте\"</code>; <code>taken</code> жиынында болса — <code>\"alias бос емес\"</code>.",
   "starter": "import re\n\nRESERVED = {\"links\", \"health\", \"api\", \"admin\"}\n\ndef check_alias(alias, taken):\n    return None\n",
   "solution": "import re\n\nRESERVED = {\"links\", \"health\", \"api\", \"admin\"}\nALIAS_RE = re.compile(r\"[A-Za-z0-9_-]{3,20}\")\n\ndef check_alias(alias, taken):\n    if not ALIAS_RE.fullmatch(alias):\n        return \"alias форматы қате\"\n    if alias.lower() in RESERVED:\n        return \"alias резервте\"\n    if alias in taken:\n        return \"alias бос емес\"\n    return None\n",
   "hints": [
    "<code>ALIAS_RE = re.compile(r\"[A-Za-z0-9_-]{3,20}\")</code>, сосын <code>fullmatch</code>.",
    "Резерв: <code>alias.lower() in RESERVED</code>"
   ],
   "check": {
    "tests": "_taken = {\"nauryz\", \"q0U\"}\nassert check_alias(\"kofe-2026\", _taken) is None, \"Дұрыс alias: None\"\nassert check_alias(\"ab\", _taken) == \"alias форматы қате\", \"2 таңба: форматы қате\"\nassert check_alias(\"наурыз\", _taken) == \"alias форматы қате\", \"Кириллица: форматы қате\"\nassert check_alias(\"Health\", _taken) == \"alias резервте\", \"Резерв сөз (регистрге қарамай)\"\nassert check_alias(\"nauryz\", _taken) == \"alias бос емес\", \"Бос емес alias\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Келесі бос код",
   "prompt": "Автоматты код <code>encode(next_id)</code> пайдаланушы alias-ымен соқтығысуы мүмкін. <code>next_code(next_id, taken)</code> <code>encode(next_id)</code>-дан бастап бос емес кодтарды өткізіп, бірінші бос кодты және келесі қолданылатын id-ді <code>(code, new_next_id)</code> ретінде қайтарсын. <code>encode</code> дайын.",
   "starter": "ALPHABET = \"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\"\n\ndef encode(n):\n    if n == 0:\n        return ALPHABET[0]\n    out = []\n    while n:\n        n, r = divmod(n, 62)\n        out.append(ALPHABET[r])\n    return \"\".join(reversed(out))\n\ndef next_code(next_id, taken):\n    return encode(next_id), next_id + 1\n",
   "solution": "ALPHABET = \"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\"\n\ndef encode(n):\n    if n == 0:\n        return ALPHABET[0]\n    out = []\n    while n:\n        n, r = divmod(n, 62)\n        out.append(ALPHABET[r])\n    return \"\".join(reversed(out))\n\ndef next_code(next_id, taken):\n    code = encode(next_id)\n    while code in taken:\n        next_id += 1\n        code = encode(next_id)\n    return code, next_id + 1\n",
   "hints": [
    "<code>while code in taken:</code> id-ді өсіріп, кодты қайта есептеңіз.",
    "Соңында <code>(code, next_id + 1)</code>."
   ],
   "check": {
    "tests": "assert encode(100000) == \"q0U\", \"encode өзгермеуі керек\"\nassert next_code(100000, set()) == (\"q0U\", 100001), \"Бос болса: ('q0U', 100001)\"\nassert next_code(100000, {\"q0U\", \"q0V\"}) == (\"q0W\", 100003), \"Бос емес кодтар өткізіледі: ('q0W', 100003)\"\nassert next_code(61, {\"Z\"}) == (\"10\", 63), \"61 → 'Z' бос емес, 62 → '10'\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Күндік клик статистикасы",
   "prompt": "<code>ClickLog</code> класы әр кодқа келген кліктерді күн бойынша санасын. <code>record(code, day)</code> — <code>day</code> <code>\"2026-03-22\"</code> түріндегі жол. <code>stats(code)</code>: клик болмаса <code>(404, {\"error\": \"not found\"})</code>; болса <code>(200, {\"code\": ..., \"total\": N, \"by_day\": {күн: n}, \"best_day\": ...})</code>, <code>by_day</code> кілттері күн ретімен, <code>best_day</code> — ең көп кликті күн (тең болса — ертерегі).",
   "starter": "class ClickLog:\n    def __init__(self):\n        self.clicks = {}\n\n    def record(self, code, day):\n        self.clicks[code] = day\n\n    def stats(self, code):\n        return 404, {\"error\": \"not found\"}\n",
   "solution": "from collections import defaultdict, Counter\n\nclass ClickLog:\n    def __init__(self):\n        self.clicks = defaultdict(Counter)\n\n    def record(self, code, day):\n        self.clicks[code][day] += 1\n\n    def stats(self, code):\n        if code not in self.clicks:\n            return 404, {\"error\": \"not found\"}\n        counter = self.clicks[code]\n        by_day = {d: counter[d] for d in sorted(counter)}\n        best = max(sorted(counter), key=lambda d: counter[d])\n        return 200, {\"code\": code, \"total\": sum(counter.values()), \"by_day\": by_day, \"best_day\": best}\n",
   "hints": [
    "<code>defaultdict(Counter)</code>: код → (күн → клик саны).",
    "Тең жағдайда ертерек күн: <code>max(sorted(counter), key=lambda d: counter[d])</code> — <code>max</code> бірінші кездескен ең үлкенді алады."
   ],
   "check": {
    "tests": "_log = ClickLog()\nfor _d in [\"2026-03-22\", \"2026-03-21\", \"2026-03-22\", \"2026-03-23\", \"2026-03-21\"]:\n    _log.record(\"nauryz\", _d)\n_s, _b = _log.stats(\"nauryz\")\nassert _s == 200 and _b[\"total\"] == 5, \"total = 5\"\nassert _b[\"by_day\"] == {\"2026-03-21\": 2, \"2026-03-22\": 2, \"2026-03-23\": 1}, \"by_day күн бойынша санау\"\nassert list(_b[\"by_day\"]) == [\"2026-03-21\", \"2026-03-22\", \"2026-03-23\"], \"by_day кілттері күн ретімен\"\nassert _b[\"best_day\"] == \"2026-03-21\" and _b[\"code\"] == \"nauryz\", \"best_day: тең болса, ертерек күн\"\nassert _log.stats(\"q0U\") == (404, {\"error\": \"not found\"}), \"Клик жоқ: 404\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Мерзімді сілтеме",
   "prompt": "Акция сілтемесі белгілі уақытқа дейін ғана жұмыс істесін. <code>ExpiringShortener</code> жазыңыз (<code>encode</code> дайын): <code>create(url, ttl, now)</code> — код <code>encode(self.next_id)</code> (id 100000-нан басталып өседі), сілтемені <code>{\"url\", \"expires\": now + ttl, \"clicks\": 0}</code> күйінде сақтап, <code>(201, {\"code\": code, \"url\": url})</code> қайтарады; URL <code>http(s)://</code>-тен басталмаса <code>(422, {\"errors\": {\"url\": \"http(s) URL керек\"}})</code>. <code>resolve(code, now)</code>: жоқ код → <code>(404, {\"error\": \"not found\"})</code>; <code>now &gt;= expires</code> → <code>(410, {\"error\": \"expired\"})</code>; әйтпесе клик +1 және <code>(302, {\"location\": url})</code>.",
   "starter": "ALPHABET = \"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\"\n\ndef encode(n):\n    if n == 0:\n        return ALPHABET[0]\n    out = []\n    while n:\n        n, r = divmod(n, 62)\n        out.append(ALPHABET[r])\n    return \"\".join(reversed(out))\n\nclass ExpiringShortener:\n    def __init__(self):\n        self.links = {}\n        self.next_id = 100000\n",
   "solution": "ALPHABET = \"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\"\n\ndef encode(n):\n    if n == 0:\n        return ALPHABET[0]\n    out = []\n    while n:\n        n, r = divmod(n, 62)\n        out.append(ALPHABET[r])\n    return \"\".join(reversed(out))\n\nimport re\n\nURL_RE = re.compile(r\"https?://\\S+\")\n\nclass ExpiringShortener:\n    def __init__(self):\n        self.links = {}\n        self.next_id = 100000\n\n    def create(self, url, ttl, now):\n        if not URL_RE.fullmatch(url):\n            return 422, {\"errors\": {\"url\": \"http(s) URL керек\"}}\n        code = encode(self.next_id)\n        self.next_id += 1\n        self.links[code] = {\"url\": url, \"expires\": now + ttl, \"clicks\": 0}\n        return 201, {\"code\": code, \"url\": url}\n\n    def resolve(self, code, now):\n        link = self.links.get(code)\n        if link is None:\n            return 404, {\"error\": \"not found\"}\n        if now >= link[\"expires\"]:\n            return 410, {\"error\": \"expired\"}\n        link[\"clicks\"] += 1\n        return 302, {\"location\": link[\"url\"]}\n",
   "hints": [
    "URL тексеру: <code>re.fullmatch(r\"https?://\\S+\", url)</code>.",
    "Тексеру реті: жоқ код (404) → мерзім (410) → клик және 302."
   ],
   "check": {
    "tests": "_s = ExpiringShortener()\nassert _s.create(\"https://kaspi.kz/sale\", ttl=3600, now=1000) == (201, {\"code\": \"q0U\", \"url\": \"https://kaspi.kz/sale\"}), \"Бірінші код q0U\"\nassert _s.create(\"https://halyk.kz\", ttl=10, now=1000)[1][\"code\"] == \"q0V\", \"Келесі id: q0V\"\nassert _s.create(\"ftp://files.kz\", ttl=10, now=0) == (422, {\"errors\": {\"url\": \"http(s) URL керек\"}}), \"ftp: 422\"\nassert _s.resolve(\"q0U\", now=2000) == (302, {\"location\": \"https://kaspi.kz/sale\"}), \"Мерзімі бітпеген: 302\"\nassert _s.links[\"q0U\"][\"clicks\"] == 1, \"Клик саналуы керек\"\nassert _s.resolve(\"q0V\", now=1010) == (410, {\"error\": \"expired\"}), \"now >= expires: 410\"\nassert _s.links[\"q0V\"][\"clicks\"] == 0, \"Мерзімі біткенде клик саналмайды\"\nassert _s.resolve(\"zzz\", now=0) == (404, {\"error\": \"not found\"}), \"Жоқ код: 404\""
   }
  }
 ]
});
