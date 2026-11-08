// backend practice tasks: Russian text. Code, solutions and checks are in content/practice/backend.js.
DJ.i18n.patch({ lessons: {
 "pyb-1": {
  "pr": [
   {
    "title": "Разбор строки запроса",
    "prompt": "Функция <code>parse_query(qs)</code> должна превратить query string вида <code>\"city=Алматы&page=2\"</code> в словарь: <code>{\"city\": \"Алматы\", \"page\": \"2\"}</code> (значения остаются строками). Если передана пустая строка, верните <code>{}</code>.",
    "hints": [
     "Разбейте пары через <code>qs.split(\"&\")</code>.",
     "Каждая пара: <code>key, _, value = pair.partition(\"=\")</code>"
    ],
    "check": {
     "tests": "assert parse_query(\"city=Алматы&page=2\") == {\"city\": \"Алматы\", \"page\": \"2\"}, \"parse_query('city=Алматы&page=2') должен вернуть {'city': 'Алматы', 'page': '2'}\"\nassert parse_query(\"\") == {}, \"Пустой query: {}\"\nassert parse_query(\"q=домбыра\") == {\"q\": \"домбыра\"}, \"Один параметр: {'q': 'домбыра'}\"\nassert parse_query(\"sort=-price&limit=20&city=Тараз\")[\"limit\"] == \"20\", \"Значения остаются строками: '20'\""
    }
   },
   {
    "title": "Разбор строки запроса HTTP",
    "prompt": "Первая строка HTTP-запроса (request line) состоит из трёх частей. Функция <code>parse_request_line(line)</code> должна вернуть кортеж <code>(method, path, version)</code>. <code>parse_request_line(\"GET /cafes HTTP/1.1\")</code> → <code>(\"GET\", \"/cafes\", \"HTTP/1.1\")</code>.",
    "hints": [
     "Части разделены пробелом: <code>line.split(\" \")</code>.",
     "Распакуйте в три переменные и верните кортеж."
    ],
    "check": {
     "tests": "assert parse_request_line(\"GET /cafes HTTP/1.1\") == (\"GET\", \"/cafes\", \"HTTP/1.1\"), \"parse_request_line('GET /cafes HTTP/1.1') должен вернуть ('GET', '/cafes', 'HTTP/1.1')\"\nassert parse_request_line(\"DELETE /orders/15 HTTP/2\") == (\"DELETE\", \"/orders/15\", \"HTTP/2\"), \"DELETE /orders/15 HTTP/2 должен разбираться правильно\""
    }
   },
   {
    "title": "Количество байт в body",
    "prompt": "Заголовок <code>Content-Length</code> показывает количество <b>байтов</b> в body, а не количество символов. Функция <code>content_length(body)</code> должна вернуть количество байтов строки в кодировке UTF-8. <code>content_length(\"Алматы\")</code> → <code>12</code>.",
    "hints": [
     "Превратите строку в байты: <code>body.encode(\"utf-8\")</code>.",
     "Буква кириллицы в UTF-8 занимает 2 байта."
    ],
    "check": {
     "tests": "assert content_length(\"Алматы\") == 12, \"content_length('Алматы') должен быть 12 (каждая буква 2 байта)\"\nassert content_length(\"latte\") == 5, \"Латинские буквы занимают по 1 байту: 5\"\nassert content_length('{\"city\": \"Тараз\"}') == 22, \"JSON body: 22 байта\"\nassert content_length(\"\") == 0, \"Пустой body: 0\""
    }
   },
   {
    "title": "Получить значение заголовка",
    "prompt": "Функция <code>get_header(raw, name)</code> должна вернуть значение заголовка <code>name</code> из текста полного HTTP-запроса (<code>raw</code>, строки разделены <code>\\r\\n</code>). Имя не зависит от регистра, значение обрезается через <code>strip</code>, двоеточие внутри значения сохраняется (<code>split(\":\", 1)</code>). Если заголовка нет, вернуть <code>None</code>.",
    "hints": [
     "Сначала возьмите часть с заголовками: <code>raw.split(\"\\r\\n\\r\\n\", 1)[0]</code>, затем пропустите первую строку.",
     "Сравнение: <code>key.strip().lower() == name.lower()</code>"
    ],
    "check": {
     "tests": "_raw = \"GET /menu HTTP/1.1\\r\\nHost: api.kofe.kz:8080\\r\\nAccept:  application/json \\r\\nUser-Agent: KofeApp/3.1\\r\\n\\r\\n\"\nassert get_header(_raw, \"host\") == \"api.kofe.kz:8080\", \"Порт в значении Host должен сохраняться: 'api.kofe.kz:8080'\"\nassert get_header(_raw, \"ACCEPT\") == \"application/json\", \"Имя не зависит от регистра, значение обрезается через strip\"\nassert get_header(_raw, \"Cookie\") is None, \"Если заголовка нет, None\""
    }
   },
   {
    "title": "Сборка текста запроса",
    "prompt": "Функция <code>build_request(method, path, headers, body=\"\")</code> должна собрать текст HTTP-запроса: первая строка <code>\"&lt;method&gt; &lt;path&gt; HTTP/1.1\"</code>, затем каждый заголовок в виде <code>\"Имя: значение\"</code> (в порядке словаря), все строки разделяются <code>\\r\\n</code>, после заголовков идёт пустая строка (<code>\\r\\n\\r\\n</code>), в конце — body.",
    "hints": [
     "Соберите список строк и выполните <code>\"\\r\\n\".join(lines)</code>.",
     "В конец добавьте <code>\"\\r\\n\\r\\n\" + body</code>."
    ],
    "check": {
     "tests": "_r = build_request(\"GET\", \"/cafes?city=Алматы\", {\"Host\": \"api.kofe.kz\", \"Accept\": \"application/json\"})\nassert _r == \"GET /cafes?city=Алматы HTTP/1.1\\r\\nHost: api.kofe.kz\\r\\nAccept: application/json\\r\\n\\r\\n\", \"Текст GET-запроса неверен\"\n_p = build_request(\"POST\", \"/orders\", {\"Content-Type\": \"application/json\"}, '{\"qty\": 2}')\nassert _p.endswith('\\r\\n\\r\\n{\"qty\": 2}'), \"Body должен идти после пустой строки\"\nassert _p.split(\"\\r\\n\")[0] == \"POST /orders HTTP/1.1\", \"Первая строка: 'POST /orders HTTP/1.1'\""
    }
   },
   {
    "title": "Чтение статуса ответа",
    "prompt": "Первая строка HTTP-ответа: <code>\"HTTP/1.1 404 Not Found\"</code>. Функция <code>parse_status_line(line)</code> должна вернуть кортеж <code>(code, reason)</code>: <code>code</code> — <code>int</code>, <code>reason</code> — оставшийся текст (в нём могут быть пробелы). <code>parse_status_line(\"HTTP/1.1 500 Internal Server Error\")</code> → <code>(500, \"Internal Server Error\")</code>.",
    "hints": [
     "Делите только по первым двум пробелам: <code>line.split(\" \", 2)</code>.",
     "Преобразуйте код через <code>int(code)</code>."
    ],
    "check": {
     "tests": "assert parse_status_line(\"HTTP/1.1 404 Not Found\") == (404, \"Not Found\"), \"parse_status_line('HTTP/1.1 404 Not Found') должен вернуть (404, 'Not Found')\"\nassert parse_status_line(\"HTTP/1.1 500 Internal Server Error\") == (500, \"Internal Server Error\"), \"Пробелы внутри reason должны сохраняться\"\nassert parse_status_line(\"HTTP/2 201 Created\")[0] == 201, \"code должен быть int: 201\""
    }
   },
   {
    "title": "Полный разбор ответа",
    "prompt": "Функция <code>parse_response(raw)</code> должна разобрать текст HTTP-ответа и вернуть словарь: <code>status</code> (int), <code>reason</code>, <code>headers</code> (имена в нижнем регистре, значения обрезаны через <code>strip</code>), <code>json</code> — body, прочитанный как JSON (<code>json.loads</code>); если body пустой, то <code>None</code>.",
    "hints": [
     "<code>head, _, body = raw.partition(\"\\r\\n\\r\\n\")</code>",
     "Первая строка: <code>split(\" \", 2)</code>; строки заголовков: <code>split(\":\", 1)</code>."
    ],
    "check": {
     "tests": "_raw = 'HTTP/1.1 201 Created\\r\\nContent-Type: application/json\\r\\nLocation: /v1/orders/1051\\r\\n\\r\\n{\"id\": 1051, \"status\": \"new\"}'\n_r = parse_response(_raw)\nassert _r[\"status\"] == 201 and _r[\"reason\"] == \"Created\", \"status 201, reason 'Created'\"\nassert _r[\"headers\"] == {\"content-type\": \"application/json\", \"location\": \"/v1/orders/1051\"}, \"headers: имена в нижнем регистре\"\nassert _r[\"json\"] == {\"id\": 1051, \"status\": \"new\"}, \"json: значение JSON из body\"\n_e = parse_response(\"HTTP/1.1 204 No Content\\r\\nServer: kofe\\r\\n\\r\\n\")\nassert _e[\"status\"] == 204 and _e[\"reason\"] == \"No Content\" and _e[\"json\"] is None, \"Если body пустой, json = None\""
    }
   },
   {
    "title": "Разбор cookie",
    "prompt": "Идентификатор сессии приходит в заголовке <code>Cookie</code>: <code>Cookie: sid=abc123; lang=kk</code>. Функция <code>parse_cookies(raw)</code> должна собрать cookie из текста запроса в словарь: <code>{\"sid\": \"abc123\", \"lang\": \"kk\"}</code>. Имя заголовка не зависит от регистра, пары разделены <code>;</code>, лишние пробелы убираются. Если cookie нет, вернуть <code>{}</code>.",
    "hints": [
     "Сначала найдите заголовок <code>cookie</code> (сравнивайте имя через <code>.lower()</code>).",
     "Разбейте значение через <code>split(\";\")</code> и каждую пару разбейте через <code>partition(\"=\")</code>."
    ],
    "check": {
     "tests": "_raw = \"GET /profile HTTP/1.1\\r\\nHost: kofe.kz\\r\\ncookie:  sid=abc123; lang=kk ;theme=dark\\r\\n\\r\\n\"\nassert parse_cookies(_raw) == {\"sid\": \"abc123\", \"lang\": \"kk\", \"theme\": \"dark\"}, \"parse_cookies(...) должен вернуть {'sid': 'abc123', 'lang': 'kk', 'theme': 'dark'}\"\nassert parse_cookies(\"GET / HTTP/1.1\\r\\nHost: kofe.kz\\r\\n\\r\\n\") == {}, \"Если cookie нет, {}\"\nassert parse_cookies(\"GET / HTTP/1.1\\r\\nCookie: token=a=b\\r\\n\\r\\n\") == {\"token\": \"a=b\"}, \"Знак = внутри значения должен сохраняться (деление по первому =)\""
    }
   }
  ]
 },
 "pyb-2": {
  "pr": [
   {
    "title": "Ошибка отсутствующего ключа",
    "prompt": "Функция <code>order_total(items)</code> на кассе выдаёт <code>KeyError: 'qty'</code>: у некоторого товара нет ключа <code>qty</code>. Исправьте: если <code>qty</code> нет, считайте количество равным 1 (<code>.get(\"qty\", 1)</code>).",
    "hints": [
     "Последняя строка traceback: <code>KeyError: 'qty'</code>.",
     "<code>item.get(\"qty\", 1)</code> возвращает 1, если ключа нет."
    ],
    "check": {
     "tests": "assert order_total([{\"price\": 1200, \"qty\": 2}, {\"price\": 800}]) == 3200, \"Товар без qty считается за 1 штуку: 2400 + 800\"\nassert order_total([]) == 0, \"Пустая корзина: 0\"\nassert order_total([{\"price\": 450, \"qty\": 3}]) == 1350, \"450 * 3 = 1350\""
    }
   },
   {
    "title": "Написать docstring",
    "prompt": "Напишите функцию <code>add_vat(price)</code> по PEP 8 с docstring: она должна прибавить 12% НДС к цене и вернуть целое количество тенге через <code>round(...)</code>. В docstring должно быть слово <code>ҚҚС</code>.",
    "hints": [
     "Docstring — это строка в тройных кавычках в первой строке функции.",
     "<code>\"\"\"Бағаға 12% ҚҚС қосып, бүтін теңге қайтарады.\"\"\"</code>"
    ],
    "check": {
     "tests": "assert add_vat.__doc__ and \"ҚҚС\" in add_vat.__doc__, \"Нужен docstring, и в нём должно быть слово 'ҚҚС'\"\nassert add_vat(1000) == 1120, \"add_vat(1000) должен быть 1120\"\nassert add_vat(2500) == 2800, \"add_vat(2500) должен быть 2800\""
    }
   },
   {
    "title": "Исправить ошибку типа",
    "prompt": "Функция <code>receipt_line(name, qty, price)</code> должна возвращать строку чека в виде <code>\"Латте x 2 = 2400 ₸\"</code>, но выдаёт <code>TypeError</code> (строку и число нельзя склеить через <code>+</code>). Исправьте через f-строку.",
    "hints": [
     "Тип ошибки: <code>TypeError: can only concatenate str (not \"int\") to str</code>.",
     "<code>f\"{name} x {qty} = {qty * price} ₸\"</code>"
    ],
    "check": {
     "tests": "assert receipt_line(\"Латте\", 2, 1200) == \"Латте x 2 = 2400 ₸\", \"receipt_line('Латте', 2, 1200) должен вернуть 'Латте x 2 = 2400 ₸'\"\nassert receipt_line(\"Самса\", 3, 350) == \"Самса x 3 = 1050 ₸\", \"receipt_line('Самса', 3, 350) должен вернуть 'Самса x 3 = 1050 ₸'\""
    }
   },
   {
    "title": "Последние заказы",
    "prompt": "Функция <code>last_orders(orders, n)</code> должна возвращать последние <code>n</code> заказов, но возвращает на один элемент больше, а при <code>n = 0</code> возвращает весь список. Исправьте: если <code>n</code> больше длины списка, верните все заказы.",
    "hints": [
     "Начальный индекс должен быть <code>len(orders) - n</code>, а у вас на <code>- 1</code> больше.",
     "<code>max(0, ...)</code> защищает от отрицательного индекса; <code>orders[len(orders):]</code> даёт пустой список."
    ],
    "check": {
     "tests": "_o = [101, 102, 103, 104, 105]\nassert last_orders(_o, 2) == [104, 105], \"last_orders(_o, 2) должен вернуть [104, 105]\"\nassert last_orders(_o, 0) == [], \"Если n = 0, пустой список\"\nassert last_orders(_o, 10) == _o, \"Если n больше, весь список\"\nassert last_orders([], 3) == [], \"Пустой список: []\""
    }
   },
   {
    "title": "Исправить ошибку None",
    "prompt": "Функция <code>find_user(users, login)</code> находит пользователя или возвращает <code>None</code>. Функция <code>user_city(users, login)</code> для отсутствующего пользователя выдаёт <code>TypeError: 'NoneType' object is not subscriptable</code>. Исправьте: если пользователя нет, верните <code>\"белгісіз\"</code>.",
    "hints": [
     "Сохраните результат в переменную и проверьте <code>if user is None:</code>.",
     "Ошибка не в <code>find_user</code>: он правильно возвращает <code>None</code>."
    ],
    "check": {
     "tests": "_us = [{\"login\": \"dana\", \"city\": \"Алматы\"}, {\"login\": \"erlan\", \"city\": \"Атырау\"}]\nassert user_city(_us, \"erlan\") == \"Атырау\", \"user_city(_us, 'erlan') должен вернуть 'Атырау'\"\nassert user_city(_us, \"tim\") == \"белгісіз\", \"Несуществующий пользователь: 'белгісіз'\"\nassert user_city([], \"dana\") == \"белгісіз\", \"Пустой список: 'белгісіз'\""
    }
   },
   {
    "title": "Имена по PEP 8",
    "prompt": "Код работает, но имена не соответствуют PEP 8. Переименуйте три имени: константа <code>freeLimit</code> → <code>FREE_DELIVERY_LIMIT</code>, функция <code>DeliveryCost</code> → <code>delivery_cost</code>, класс <code>order_service</code> → <code>OrderService</code>. Логика должна остаться прежней.",
    "hints": [
     "Константа — <code>UPPER_CASE</code>, функция — <code>snake_case</code>, класс — <code>CamelCase</code>.",
     "Переименуйте и в местах использования."
    ],
    "check": {
     "tests": "assert \"FREE_DELIVERY_LIMIT\" in dir() and FREE_DELIVERY_LIMIT == 10000, \"Константа FREE_DELIVERY_LIMIT должна быть 10000\"\nassert \"delivery_cost\" in dir() and \"OrderService\" in dir(), \"Нужны функция delivery_cost и класс OrderService\"\nassert \"freeLimit\" not in dir() and \"DeliveryCost\" not in dir() and \"order_service\" not in dir(), \"Старых имён быть не должно\"\nassert delivery_cost(12000) == 0 and delivery_cost(5000) == 990, \"Логика должна остаться прежней\"\nassert OrderService().total_price([{\"price\": 3000}, {\"price\": 2000}]) == 5990, \"5000 + 990 = 5990\""
    }
   },
   {
    "title": "Исправить средний рейтинг",
    "prompt": "Функция <code>average_rating(reviews)</code> должна возвращать средний рейтинг отзывов. В некоторых отзывах <code>\"rating\": None</code> (оценка не поставлена) — их не учитывайте. Если оценок нет, верните <code>None</code>. Результат округлите через <code>round(..., 1)</code>. Напишите для функции docstring, в котором есть слово <code>rating</code>. В текущем коде есть <code>TypeError</code> и <code>ZeroDivisionError</code>.",
    "hints": [
     "Сначала соберите все непустые рейтинги (не равные <code>None</code>) в отдельный список.",
     "Перед делением на пустой список сделайте <code>return None</code>."
    ],
    "check": {
     "tests": "assert average_rating.__doc__ and \"rating\" in average_rating.__doc__, \"Нужен docstring, и в нём должно быть слово 'rating'\"\n_rv = [{\"user\": \"dana\", \"rating\": 5}, {\"user\": \"ali\", \"rating\": None}, {\"user\": \"sara\", \"rating\": 4}]\nassert average_rating(_rv) == 4.5, \"None не учитывается: (5 + 4) / 2 = 4.5\"\nassert average_rating([{\"user\": \"x\", \"rating\": None}]) is None, \"Если оценок нет, None\"\nassert average_rating([]) is None, \"Пустой список: None\"\nassert average_rating([{\"rating\": 4}, {\"rating\": 4}, {\"rating\": 5}]) == 4.3, \"(4 + 4 + 5) / 3 = 4.3\""
    }
   },
   {
    "title": "Понятное сообщение об ошибке",
    "prompt": "Функция <code>parse_price(text)</code> должна получить цену из текста вида <code>\"1 200 ₸\"</code> как целое число: пробелы и знак <code>₸</code> удаляются. Если оставшийся текст не является цифрами (или пуст), функция должна выдать <code>ValueError</code>, а в сообщении должен быть исходный текст в кавычках: <code>f\"Баға қате: {text!r}\"</code>. Тогда причину будет видно сразу в traceback.",
    "hints": [
     "<code>text.replace(\" \", \"\").replace(\"₸\", \"\")</code>",
     "Проверка: <code>if not cleaned.isdigit(): raise ValueError(f\"Баға қате: {text!r}\")</code>"
    ],
    "check": {
     "tests": "assert parse_price(\"1 200 ₸\") == 1200, \"parse_price('1 200 ₸') должен вернуть 1200\"\nassert parse_price(\"450\") == 450, \"parse_price('450') должен вернуть 450\"\nfor _bad in (\"бір мың\", \"\", \"12,5 ₸\"):\n    _msg = None\n    try:\n        parse_price(_bad)\n    except ValueError as _e:\n        _msg = str(_e)\n    assert _msg == f\"Баға қате: {_bad!r}\", f\"Сообщение parse_price({_bad!r}) должно быть ValueError с текстом 'Баға қате: {_bad!r}'\""
    }
   }
  ]
 },
 "pyb-3": {
  "pr": [
   {
    "title": "Путь ресурса",
    "prompt": "Функция <code>resource_path(resource, item_id=None, version=1)</code> должна собрать путь REST: <code>resource_path(\"products\")</code> → <code>\"/v1/products\"</code>, <code>resource_path(\"products\", 42)</code> → <code>\"/v1/products/42\"</code>, <code>resource_path(\"orders\", version=2)</code> → <code>\"/v2/orders\"</code>.",
    "hints": [
     "<code>f\"/v{version}/{resource}\"</code>",
     "Добавляйте <code>/42</code> в конец только если передан <code>item_id</code>."
    ],
    "check": {
     "tests": "assert resource_path(\"products\") == \"/v1/products\", \"resource_path('products') должен быть '/v1/products'\"\nassert resource_path(\"products\", 42) == \"/v1/products/42\", \"resource_path('products', 42) должен быть '/v1/products/42'\"\nassert resource_path(\"orders\", version=2) == \"/v2/orders\", \"resource_path('orders', version=2) должен быть '/v2/orders'\"\nassert resource_path(\"gift-cards\", 0) == \"/v1/gift-cards/0\", \"id = 0 тоже должен добавляться\""
    }
   },
   {
    "title": "URL с глаголом",
    "prompt": "В REST в URL не используются глаголы. Функция <code>is_restful(path)</code> должна вернуть <code>False</code>, если какая-либо часть пути (разделённая <code>/</code>) начинается со слова <code>get</code>, <code>create</code>, <code>update</code> или <code>delete</code> (без учёта регистра), иначе <code>True</code>. <code>is_restful(\"/deleteUser/5\")</code> → <code>False</code>.",
    "hints": [
     "<code>path.strip(\"/\").split(\"/\")</code> даёт части пути.",
     "<code>startswith</code> принимает кортеж: <code>part.lower().startswith((\"get\", \"create\", ...))</code>"
    ],
    "check": {
     "tests": "assert is_restful(\"/deleteUser/5\") is False, \"/deleteUser/5 — не REST\"\nassert is_restful(\"/v1/getProducts\") is False, \"/v1/getProducts — не REST\"\nassert is_restful(\"/v1/products/42\") is True, \"/v1/products/42 — правильный путь REST\"\nassert is_restful(\"/shops/3/orders\") is True, \"/shops/3/orders — правильный путь\"\nassert is_restful(\"/gift-cards\") is True, \"/gift-cards — правильный путь\""
    }
   },
   {
    "title": "Успешный код статуса",
    "prompt": "Функция <code>success_status(method)</code> должна вернуть код успешного ответа на CRUD-запрос: <code>GET</code>, <code>PUT</code>, <code>PATCH</code> → 200, <code>POST</code> → 201, <code>DELETE</code> → 204. Для другого метода выдать <code>ValueError</code>.",
    "hints": [
     "Удобен словарь: <code>{\"GET\": 200, \"POST\": 201, ...}</code>.",
     "Для неизвестного метода: <code>raise ValueError(...)</code>."
    ],
    "check": {
     "tests": "assert success_status(\"POST\") == 201, \"POST → 201 Created\"\nassert success_status(\"DELETE\") == 204, \"DELETE → 204 No Content\"\nassert success_status(\"GET\") == 200 and success_status(\"PATCH\") == 200 and success_status(\"PUT\") == 200, \"GET, PUT, PATCH → 200\"\n_ok = False\ntry:\n    success_status(\"FETCH\")\nexcept ValueError:\n    _ok = True\nassert _ok, \"Неизвестный метод: ValueError\""
    }
   },
   {
    "title": "Параметр сортировки",
    "prompt": "По параметру <code>sort</code> из query string сортируем список: <code>\"price\"</code> — по возрастанию, <code>\"-price\"</code> — по убыванию. Функция <code>apply_sort(items, sort)</code> должна вернуть новый отсортированный список. Если <code>sort</code> равен <code>None</code>, список не меняется. Если указано поле, которого нет у объектов, — <code>ValueError</code>.",
    "hints": [
     "Проверьте знак минуса: <code>desc = sort.startswith(\"-\")</code>, поле: <code>sort.lstrip(\"-\")</code>.",
     "<code>sorted(items, key=lambda it: it[field], reverse=desc)</code>"
    ],
    "check": {
     "tests": "_p = [{\"name\": \"Шапан\", \"price\": 45000}, {\"name\": \"Кесе\", \"price\": 1500}, {\"name\": \"Домбыра\", \"price\": 30000}]\nassert [x[\"name\"] for x in apply_sort(_p, \"price\")] == [\"Кесе\", \"Домбыра\", \"Шапан\"], \"sort=price: порядок по возрастанию\"\nassert [x[\"name\"] for x in apply_sort(_p, \"-price\")] == [\"Шапан\", \"Домбыра\", \"Кесе\"], \"sort=-price: порядок по убыванию\"\nassert apply_sort(_p, None) == _p, \"Если sort нет, список не меняется\"\nassert _p[0][\"name\"] == \"Шапан\", \"Исходный список не должен меняться\"\n_ok = False\ntry:\n    apply_sort(_p, \"rating\")\nexcept ValueError:\n    _ok = True\nassert _ok, \"Сортировка по несуществующему полю: ValueError\""
    }
   },
   {
    "title": "Параметры фильтра",
    "prompt": "Функция <code>filter_items(items, query)</code> должна вернуть элементы, которые подходят под <b>все</b> условия из словаря query (значения — строки), в исходном порядке. Значение поля сравнивайте, приведя его к строке через <code>str(...)</code>. Если в элементе нет поля, он не подходит. Если <code>query</code> пустой, возвращаются все элементы.",
    "hints": [
     "Для каждого элемента проверьте все условия через <code>all(...)</code>.",
     "Условие: <code>k in it and str(it[k]) == v</code>"
    ],
    "check": {
     "tests": "_cafes = [{\"id\": 1, \"city\": \"Алматы\", \"wifi\": True}, {\"id\": 2, \"city\": \"Астана\", \"wifi\": True}, {\"id\": 3, \"city\": \"Алматы\", \"wifi\": False}, {\"id\": 4, \"name\": \"Bean\"}]\nassert [c[\"id\"] for c in filter_items(_cafes, {\"city\": \"Алматы\"})] == [1, 3], \"city=Алматы: id 1 и 3\"\nassert [c[\"id\"] for c in filter_items(_cafes, {\"city\": \"Алматы\", \"wifi\": \"True\"})] == [1], \"Два условия: только id 1\"\nassert [c[\"id\"] for c in filter_items(_cafes, {\"id\": \"2\"})] == [2], \"Число тоже сравнивается как строка: id=2\"\nassert len(filter_items(_cafes, {})) == 4, \"Без фильтра: все\""
    }
   },
   {
    "title": "Ключ идемпотентности",
    "prompt": "Платёжный API использует <code>Idempotency-Key</code>. Напишите класс <code>PaymentAPI</code>: <code>payments</code> — список созданных платежей, <code>seen</code> — ключ → ответ. Метод <code>post(key, amount)</code>: если ключ уже был, возвращает <b>тот же</b> ответ (новый платёж не создаётся); иначе создаёт платёж <code>{\"id\": n, \"amount\": amount}</code> (<code>n</code> увеличивается с 1), сохраняет ответ <code>(201, платёж)</code>, возвращает его.",
    "hints": [
     "В начале проверьте: <code>if key in self.seen: return self.seen[key]</code>.",
     "Новый ответ сохраните в <code>self.seen[key]</code>."
    ],
    "check": {
     "tests": "_api = PaymentAPI()\n_r1 = _api.post(\"k-1\", 5000)\nassert _r1 == (201, {\"id\": 1, \"amount\": 5000}), \"Первый запрос: (201, {'id': 1, 'amount': 5000})\"\nassert _api.post(\"k-1\", 5000) == _r1, \"Повторный ключ должен вернуть прежний ответ\"\nassert len(_api.payments) == 1, \"Повторный запрос не должен создавать новый платёж\"\nassert _api.post(\"k-2\", 700) == (201, {\"id\": 2, \"amount\": 700}), \"Новый ключ: новый платёж с id 2\""
    }
   },
   {
    "title": "Единый формат ошибок",
    "prompt": "Все ошибки должны возвращаться в одном формате. Функция <code>error(status, message)</code> должна вернуть <code>(status, {\"error\": {\"code\": CODES[status], \"message\": message}})</code> (<code>CODES</code> задан). Затем напишите обработчик <code>get_product(products, pid)</code>: если <code>pid</code> — не цифры, вернуть <code>error(400, \"id сан болуы керек\")</code>; если товар не найден (<code>products</code> — словарь int id → товар), вернуть <code>error(404, \"Тауар табылмады\")</code>; иначе <code>(200, товар)</code>.",
    "hints": [
     "Функция <code>error</code> возвращает вложенный словарь: <code>{\"error\": {\"code\": ..., \"message\": ...}}</code>.",
     "Сначала <code>pid.isdigit()</code>, затем <code>products.get(int(pid))</code>."
    ],
    "check": {
     "tests": "assert error(409, \"Бұл email бос емес\") == (409, {\"error\": {\"code\": \"conflict\", \"message\": \"Бұл email бос емес\"}}), \"Формат error(409, ...) неверен\"\n_ps = {7: {\"id\": 7, \"name\": \"Қымыз\", \"price\": 900}}\nassert get_product(_ps, \"7\") == (200, {\"id\": 7, \"name\": \"Қымыз\", \"price\": 900}), \"Существующий товар: 200\"\nassert get_product(_ps, \"8\") == (404, {\"error\": {\"code\": \"not_found\", \"message\": \"Тауар табылмады\"}}), \"Несуществующий товар: 404 и единый формат\"\nassert get_product(_ps, \"abc\") == (400, {\"error\": {\"code\": \"bad_request\", \"message\": \"id сан болуы керек\"}}), \"Нецифровой id: 400\""
    }
   },
   {
    "title": "Полное CRUD-хранилище",
    "prompt": "Напишите класс <code>ProductStore</code> (каждый метод возвращает <code>(status, body)</code>). <code>create(data)</code>: присваивает id (с 1), возвращает <code>(201, объект)</code>. <code>get(pid)</code>: <code>(200, объект)</code> или <code>(404, {\"error\": \"not found\"})</code>. <code>patch(pid, changes)</code>: обновляет переданные поля (не меняя <code>id</code>), возвращает <code>(200, объект)</code> или 404. <code>delete(pid)</code>: <code>(204, None)</code> или 404. <code>list(page=1, per_page=2)</code>: <code>(200, {\"items\": [...], \"total\": N})</code> в порядке id.",
    "hints": [
     "Храните данные в словаре <code>self.rows</code> (id → объект), следующий id — в <code>self.next_id</code>.",
     "Пагинация: <code>start = (page - 1) * per_page</code>, <code>items[start:start + per_page]</code>."
    ],
    "check": {
     "tests": "_s = ProductStore()\nassert _s.create({\"name\": \"Шапан\", \"price\": 45000}) == (201, {\"name\": \"Шапан\", \"price\": 45000, \"id\": 1}), \"create: 201 и id 1\"\n_s.create({\"name\": \"Кесе\", \"price\": 1500}); _s.create({\"name\": \"Тақия\", \"price\": 6000})\nassert _s.get(2) == (200, {\"name\": \"Кесе\", \"price\": 1500, \"id\": 2}), \"get(2): 200\"\nassert _s.get(9) == (404, {\"error\": \"not found\"}), \"get(9): 404\"\nassert _s.patch(2, {\"price\": 1800, \"id\": 99}) == (200, {\"name\": \"Кесе\", \"price\": 1800, \"id\": 2}), \"patch: цена меняется, id не меняется\"\nassert _s.patch(9, {\"price\": 1})[0] == 404, \"patch несуществующего объекта: 404\"\nassert _s.delete(1) == (204, None) and _s.delete(1)[0] == 404, \"delete: 204, при повторе 404\"\n_st, _b = _s.list(page=1, per_page=1)\nassert _st == 200 and _b[\"total\"] == 2 and [x[\"id\"] for x in _b[\"items\"]] == [2], \"list(1, 1): первая страница, total 2\"\nassert [x[\"id\"] for x in _s.list(page=2, per_page=1)[1][\"items\"]] == [3], \"list(2, 1): вторая страница, id 3\""
    }
   }
  ]
 },
 "pyb-4": {
  "pr": [
   {
    "title": "Части пути",
    "prompt": "Функция <code>split_path(path)</code> должна превратить путь в список частей: начальный и конечный <code>/</code> не важны. <code>split_path(\"/cafes/7/menu/\")</code> → <code>[\"cafes\", \"7\", \"menu\"]</code>. Для корня <code>\"/\"</code> вернуть <code>[]</code>.",
    "hints": [
     "<code>path.strip(\"/\")</code> убирает крайние слеши.",
     "Если разбить пустую строку, получится <code>[\"\"]</code>, поэтому проверьте её отдельно."
    ],
    "check": {
     "tests": "assert split_path(\"/cafes/7/menu/\") == [\"cafes\", \"7\", \"menu\"], \"split_path('/cafes/7/menu/') должен быть ['cafes', '7', 'menu']\"\nassert split_path(\"users/42\") == [\"users\", \"42\"], \"Работает и без / в начале\"\nassert split_path(\"/\") == [] and split_path(\"\") == [], \"Корень: []\""
    }
   },
   {
    "title": "Это параметр?",
    "prompt": "В шаблоне маршрута часть вида <code>&lt;id&gt;</code> — это параметр. Функция <code>param_name(part)</code> должна вернуть имя из скобок, если часть начинается с <code>&lt;</code> и заканчивается на <code>&gt;</code>, иначе <code>None</code>. <code>param_name(\"&lt;cafe_id&gt;\")</code> → <code>\"cafe_id\"</code>.",
    "hints": [
     "<code>part.startswith(\"<\") and part.endswith(\">\")</code>",
     "Имя внутри: <code>part[1:-1]</code>"
    ],
    "check": {
     "tests": "assert param_name(\"<cafe_id>\") == \"cafe_id\", \"param_name('<cafe_id>') должен быть 'cafe_id'\"\nassert param_name(\"menu\") is None, \"Постоянная часть: None\"\nassert param_name(\"<id\") is None, \"Если нет >: None\""
    }
   },
   {
    "title": "Регистрация маршрута",
    "prompt": "<code>ROUTES</code> — пустой словарь. Напишите декоратор <code>route(path)</code> с параметром: он регистрирует функцию в <code>ROUTES[path]</code> и возвращает саму функцию без изменений.",
    "hints": [
     "Внутри вложенной функции <code>decorator(func)</code> пишем <code>ROUTES[path] = func</code>.",
     "Не забудьте <code>return func</code>, иначе имя станет <code>None</code>."
    ],
    "check": {
     "tests": "@route(\"/health\")\ndef _health():\n    return 200, {\"status\": \"ok\"}\n@route(\"/cafes\")\ndef _cafes():\n    return 200, [\"Kofe Bar\"]\nassert _health is not None and _health() == (200, {\"status\": \"ok\"}), \"Декоратор должен возвращать функцию без изменений\"\nassert ROUTES.get(\"/health\") is _health and ROUTES.get(\"/cafes\") is _cafes, \"Функции должны регистрироваться в словаре ROUTES\""
    }
   },
   {
    "title": "Заголовок Allow",
    "prompt": "В ответе 405 заголовок <code>Allow</code> показывает разрешённые методы. <code>routes</code> — список кортежей <code>(pattern, methods)</code>. Функция <code>allowed_methods(routes, path)</code> должна объединить методы всех маршрутов, подходящих под путь <code>path</code>, и вернуть строку вида <code>\"GET, POST\"</code> в алфавитном порядке (если путь не найден — <code>\"\"</code>). Функция <code>match_path</code> уже готова.",
    "hints": [
     "Соберите методы подходящих маршрутов в одно множество: <code>methods |= set(ms)</code>.",
     "<code>\", \".join(sorted(methods))</code>"
    ],
    "check": {
     "tests": "_rs = [(\"/orders\", [\"POST\"]), (\"/orders\", [\"GET\"]), (\"/orders/<id>\", [\"GET\", \"DELETE\", \"PATCH\"]), (\"/health\", [\"GET\"])]\nassert allowed_methods(_rs, \"/orders\") == \"GET, POST\", \"Для /orders: 'GET, POST'\"\nassert allowed_methods(_rs, \"/orders/15\") == \"DELETE, GET, PATCH\", \"Для /orders/15: 'DELETE, GET, PATCH'\"\nassert allowed_methods(_rs, \"/buses\") == \"\", \"Если путь не задан, пустая строка\""
    }
   },
   {
    "title": "Порядок маршрутов",
    "prompt": "Есть маршруты <code>/users/me</code> и <code>/users/&lt;id&gt;</code>. Функция <code>resolve(routes, path)</code> должна вернуть имя обработчика и параметры первого подходящего маршрута в порядке списка в виде <code>(name, params)</code>, или <code>None</code>, если ничего не найдено. Затем заполните список <code>ROUTES</code> в <b>правильном порядке</b>: <code>/users/me</code> → <code>\"me\"</code>, <code>/users/&lt;id&gt;</code> → <code>\"user\"</code>, чтобы <code>me</code> не был принят за id.",
    "hints": [
     "Конкретный маршрут (<code>/users/me</code>) должен стоять раньше маршрута с параметром.",
     "В цикле сразу возвращайте результат, когда <code>params is not None</code>."
    ],
    "check": {
     "tests": "assert resolve(ROUTES, \"/users/me\") == (\"me\", {}), \"/users/me → ('me', {}): конкретный маршрут должен стоять первым\"\nassert resolve(ROUTES, \"/users/42\") == (\"user\", {\"id\": \"42\"}), \"/users/42 → ('user', {'id': '42'})\"\nassert resolve(ROUTES, \"/cafes\") is None, \"Если ничего не найдено, None\"\nassert resolve([(\"/a/<x>\", \"first\"), (\"/a/<y>\", \"second\")], \"/a/1\") == (\"first\", {\"x\": \"1\"}), \"Берётся первое совпадение в списке\""
    }
   },
   {
    "title": "Игнорирование query",
    "prompt": "Функция <code>route_key(method, path)</code> должна превратить запрос в ключ таблицы маршрутов: метод в верхнем регистре, из пути убирается query string (<code>?</code> и всё после него), убирается последний <code>/</code> (корень <code>\"/\"</code> остаётся как есть). <code>route_key(\"get\", \"/cafes/?city=Алматы\")</code> → <code>(\"GET\", \"/cafes\")</code>.",
    "hints": [
     "Чтобы убрать query: <code>path.split(\"?\", 1)[0]</code>.",
     "Последний <code>/</code>: <code>rstrip(\"/\")</code>, но корень сохраните."
    ],
    "check": {
     "tests": "assert route_key(\"get\", \"/cafes/?city=Алматы\") == (\"GET\", \"/cafes\"), \"route_key('get', '/cafes/?city=Алматы') должен быть ('GET', '/cafes')\"\nassert route_key(\"POST\", \"/orders\") == (\"POST\", \"/orders\"), \"Без изменений: ('POST', '/orders')\"\nassert route_key(\"get\", \"/?page=2\") == (\"GET\", \"/\"), \"Корень '/' остаётся как есть\"\nassert route_key(\"delete\", \"/orders/15/\") == (\"DELETE\", \"/orders/15\"), \"Последний / удаляется\""
    }
   },
   {
    "title": "Несколько преобразователей",
    "prompt": "Функция <code>match_conv(pattern, path)</code> должна работать как <code>match_path</code>, но понимать три преобразователя: <code>&lt;int:n&gt;</code> — только цифры, превращается в <code>int</code>; <code>&lt;slug:s&gt;</code> — строчные латинские буквы, цифры и дефис (непустая строка); <code>&lt;name&gt;</code> — любое непустое значение (строка). Если не подходит, вернуть <code>None</code>.",
    "hints": [
     "Возьмите содержимое части <code>inner = p[1:-1]</code> и проверьте префиксы <code>\"int:\"</code> и <code>\"slug:\"</code>.",
     "Проверка slug: <code>set(v) <= set(\"abc...z0123456789-\")</code>"
    ],
    "check": {
     "tests": "assert match_conv(\"/shops/<slug:shop>/orders/<int:n>\", \"/shops/almaty-1/orders/77\") == {\"shop\": \"almaty-1\", \"n\": 77}, \"slug и int вместе\"\nassert match_conv(\"/shops/<slug:shop>\", \"/shops/Almaty\") is None, \"Заглавная буква не подходит под slug\"\nassert match_conv(\"/orders/<int:n>\", \"/orders/7a\") is None, \"Не цифра: None\"\nassert match_conv(\"/cities/<name>\", \"/cities/Қостанай\") == {\"name\": \"Қостанай\"}, \"Простой параметр принимает любое значение\"\nassert match_conv(\"/cities/<name>\", \"/cities//\") is None, \"Пустое значение не подходит\"\nassert match_conv(\"/health\", \"/health\") == {}, \"Без параметров: {}\""
    }
   },
   {
    "title": "Роутер с префиксом",
    "prompt": "Напишите класс <code>Router(prefix)</code> (как Blueprint во Flask). Декоратор <code>route(pattern, methods=(\"GET\",))</code> регистрирует обработчик с шаблоном <code>prefix + pattern</code> и возвращает функцию без изменений. Метод <code>handle(method, path)</code> вызывает подходящий обработчик с <code>**params</code> и возвращает его результат; если путь есть, а метода нет — <code>(405, {\"error\": \"method not allowed\"})</code>; если пути нет — <code>(404, {\"error\": \"not found\"})</code>. Функция <code>match_path</code> уже готова.",
    "hints": [
     "При регистрации добавьте префикс к шаблону: <code>self.prefix + pattern</code>.",
     "В <code>handle</code> сохраните флаг, нашёлся ли путь, чтобы отличить 404 от 405."
    ],
    "check": {
     "tests": "_api = Router(\"/api/v1\")\n@_api.route(\"/buses/<num>\")\ndef _bus(num):\n    return 200, {\"bus\": num}\n@_api.route(\"/tickets\", methods=[\"POST\"])\ndef _buy():\n    return 201, {\"ticket\": 1}\nassert _bus(\"92\") == (200, {\"bus\": \"92\"}), \"Декоратор должен возвращать функцию без изменений\"\nassert _api.handle(\"GET\", \"/api/v1/buses/92\") == (200, {\"bus\": \"92\"}), \"Путь с префиксом: 200\"\nassert _api.handle(\"GET\", \"/buses/92\") == (404, {\"error\": \"not found\"}), \"Путь без префикса: 404\"\nassert _api.handle(\"POST\", \"/api/v1/tickets\") == (201, {\"ticket\": 1}), \"POST /api/v1/tickets: 201\"\nassert _api.handle(\"GET\", \"/api/v1/tickets\") == (405, {\"error\": \"method not allowed\"}), \"Метод не указан: 405\""
    }
   }
  ]
 },
 "pyb-5": {
  "pr": [
   {
    "title": "Прочитан ли JSON",
    "prompt": "Функция <code>read_json(raw_body)</code> должна прочитать body через <code>json.loads</code>. Если не получилось (<code>json.JSONDecodeError</code>), вернуть <code>(400, {\"error\": \"invalid json\"})</code>, если получилось — <code>(200, data)</code>.",
    "hints": [
     "<code>try: data = json.loads(raw_body)</code>",
     "<code>except json.JSONDecodeError: return 400, {\"error\": \"invalid json\"}</code>"
    ],
    "check": {
     "tests": "assert read_json('{\"name\": \"Дана\"}') == (200, {\"name\": \"Дана\"}), \"Корректный JSON: (200, data)\"\nassert read_json('{\"name\": \"Дана\",') == (400, {\"error\": \"invalid json\"}), \"Некорректный JSON: 400\"\nassert read_json(\"\") == (400, {\"error\": \"invalid json\"}), \"Пустой body: 400\"\nassert read_json(\"[1, 2]\") == (200, [1, 2]), \"Список тоже корректный JSON\""
    }
   },
   {
    "title": "Проверка целого числа",
    "prompt": "Функция <code>is_int(value)</code> должна вернуть <code>True</code>, если значение — настоящее целое число. Учтите: в Python <code>isinstance(True, int)</code> даёт <code>True</code>, поэтому <code>bool</code> нужно исключить отдельно. Число в виде строки (<code>\"5\"</code>) тоже не подходит.",
    "hints": [
     "<code>isinstance(value, int)</code> даёт True и для True, и для False.",
     "Добавьте <code>and not isinstance(value, bool)</code>."
    ],
    "check": {
     "tests": "assert is_int(5) is True and is_int(-3) is True and is_int(0) is True, \"5, -3, 0 — целые числа\"\nassert is_int(True) is False and is_int(False) is False, \"bool не считается целым числом\"\nassert is_int(\"5\") is False and is_int(5.0) is False and is_int(None) is False, \"'5', 5.0, None — не целые числа\""
    }
   },
   {
    "title": "Свой класс ошибки",
    "prompt": "Напишите класс <code>ValidationError(Exception)</code> для ошибки валидации: конструктор принимает <code>field</code> и <code>message</code>, сохраняет оба как атрибуты, а в <code>super().__init__</code> передаёт строку <code>f\"{field}: {message}\"</code>. <code>str(ValidationError(\"age\", \"теріс\"))</code> → <code>\"age: теріс\"</code>.",
    "hints": [
     "<code>def __init__(self, field, message):</code>",
     "<code>super().__init__(f\"{field}: {message}\")</code>, затем <code>self.field = field</code>."
    ],
    "check": {
     "tests": "_e = ValidationError(\"age\", \"теріс\")\nassert isinstance(_e, Exception), \"ValidationError должен наследоваться от Exception\"\nassert _e.field == \"age\" and _e.message == \"теріс\", \"Должны сохраняться field и message\"\nassert str(_e) == \"age: теріс\", \"str(e) должен быть 'age: теріс'\"\n_ok = False\ntry:\n    raise ValidationError(\"email\", \"форматы қате\")\nexcept ValidationError as _x:\n    _ok = _x.field == \"email\"\nassert _ok, \"Ошибку должно быть можно поймать через except ValidationError\""
    }
   },
   {
    "title": "Форма регистрации",
    "prompt": "Функция <code>validate_signup(data)</code> должна собрать все ошибки сразу и вернуть словарь (если ошибок нет — <code>{}</code>). Правила: <code>login</code> — строка из 3–20 символов, иначе <code>\"login\": \"3-20 таңба\"</code>; <code>password</code> — строка не короче 8 символов, иначе <code>\"password\": \"кемінде 8 таңба\"</code>; <code>age</code> — целое число от 14 до 100 (не bool), иначе <code>\"age\": \"14-100 бүтін сан\"</code>.",
    "hints": [
     "Каждое поле получайте через <code>data.get(...)</code>: если ключа нет, будет <code>None</code>.",
     "Не останавливайтесь на первой ошибке: собирайте все в словарь <code>errors</code>."
    ],
    "check": {
     "tests": "assert validate_signup({\"login\": \"dana\", \"password\": \"qwerty123\", \"age\": 19}) == {}, \"В корректных данных ошибок нет\"\nassert validate_signup({\"login\": \"ab\", \"password\": \"123\", \"age\": 10}) == {\"login\": \"3-20 таңба\", \"password\": \"кемінде 8 таңба\", \"age\": \"14-100 бүтін сан\"}, \"Три ошибки должны собраться вместе\"\nassert validate_signup({}) == {\"login\": \"3-20 таңба\", \"password\": \"кемінде 8 таңба\", \"age\": \"14-100 бүтін сан\"}, \"Пустой словарь: три ошибки\"\nassert validate_signup({\"login\": \"erlan\", \"password\": \"qwerty123\", \"age\": True}) == {\"age\": \"14-100 бүтін сан\"}, \"True не считается возрастом\""
    }
   },
   {
    "title": "Очистка текста",
    "prompt": "Функция <code>clean_profile(data)</code> должна очистить профиль пользователя: у строк <code>name</code> и <code>city</code> убрать пробелы по краям (<code>strip</code>), если <code>city</code> отсутствует или пустой — поставить <code>\"Алматы\"</code>, а <code>email</code> привести к нижнему регистру. Остальные ключи в результат не попадают. Исходный словарь не должен меняться.",
    "hints": [
     "Создайте новый словарь, не меняя исходный.",
     "<code>(data.get(\"city\") or \"\").strip()</code> — если пусто, то <code>\"Алматы\"</code>."
    ],
    "check": {
     "tests": "_in = {\"name\": \"  Айгерім \", \"city\": \" Тараз\", \"email\": \"Aigerim@Mail.KZ \", \"is_admin\": True}\nassert clean_profile(_in) == {\"name\": \"Айгерім\", \"city\": \"Тараз\", \"email\": \"aigerim@mail.kz\"}, \"Результат clean_profile(...) неверен; лишние ключи (is_admin) не попадают\"\nassert _in[\"name\"] == \"  Айгерім \", \"Исходный словарь не должен меняться\"\nassert clean_profile({\"name\": \"Нұр\", \"email\": \"N@x.kz\", \"city\": \"   \"})[\"city\"] == \"Алматы\", \"Если city пустой: 'Алматы'\"\nassert clean_profile({\"name\": \"Нұр\", \"email\": \"n@x.kz\"})[\"city\"] == \"Алматы\", \"Если city отсутствует: 'Алматы'\""
    }
   },
   {
    "title": "Превращение ошибки в ответ",
    "prompt": "Иерархия <code>ApiError</code> готова. Добавьте классы <code>Conflict</code> (409) и <code>Unprocessable</code> (422). Затем функция <code>to_response(func, *args)</code> должна вызвать <code>func(*args)</code>: если выброшен <code>ApiError</code>, вернуть <code>(e.status, {\"error\": e.message})</code>, если нет — сам результат. Другие исключения не перехватывать.",
    "hints": [
     "<code>class Conflict(ApiError): status = 409</code>",
     "<code>except ApiError as e: return e.status, {\"error\": e.message}</code>"
    ],
    "check": {
     "tests": "_users = {\"dana@mail.kz\"}\ndef _register(email):\n    if \"@\" not in email:\n        raise Unprocessable(\"email форматы қате\")\n    if email in _users:\n        raise Conflict(\"email бос емес\")\n    return 201, {\"email\": email}\nassert issubclass(Conflict, ApiError) and issubclass(Unprocessable, ApiError), \"Conflict и Unprocessable должны наследоваться от ApiError\"\nassert to_response(_register, \"ali@mail.kz\") == (201, {\"email\": \"ali@mail.kz\"}), \"Ошибки нет: результат не меняется\"\nassert to_response(_register, \"dana@mail.kz\") == (409, {\"error\": \"email бос емес\"}), \"Conflict → 409\"\nassert to_response(_register, \"dana\") == (422, {\"error\": \"email форматы қате\"}), \"Unprocessable → 422\"\n_ok = False\ntry:\n    to_response(lambda: [][1])\nexcept IndexError:\n    _ok = True\nassert _ok, \"Другие исключения не должны перехватываться\""
    }
   },
   {
    "title": "Запрос на бронирование",
    "prompt": "Напишите dataclass <code>Booking</code>: <code>hotel: str</code>, <code>nights: int</code>, <code>guests: int = 1</code>. Функция <code>create_booking(raw_body)</code>: некорректный JSON или не объект → <code>(400, {\"error\": \"invalid json\"})</code>. Валидация: <code>hotel</code> должен быть в <code>HOTELS</code>; <code>nights</code> — целое число от 1 до 30, <code>guests</code> (если передан) — целое число от 1 до 6 (не bool). При ошибках — <code>(422, {\"errors\": {...}})</code>, ключи — имена полей. Если всё верно — <code>(201, asdict(booking))</code>.",
    "hints": [
     "Сначала разбор JSON (400), затем валидация (422), в конце dataclass (201).",
     "Вынесите проверку целого числа во вспомогательную функцию: <code>isinstance(v, int) and not isinstance(v, bool) and lo <= v <= hi</code>."
    ],
    "check": {
     "tests": "from dataclasses import is_dataclass\nassert is_dataclass(Booking), \"Должен быть dataclass Booking\"\nassert create_booking('{\"hotel\": \"Rixos Borovoe\", \"nights\": 3}') == (201, {\"hotel\": \"Rixos Borovoe\", \"nights\": 3, \"guests\": 1}), \"Корректный запрос: 201, guests по умолчанию 1\"\nassert create_booking('{\"hotel\": \"Shymkent Plaza\", \"nights\": 2, \"guests\": 4}')[1][\"guests\"] == 4, \"Если guests передан, используется он\"\nassert create_booking('{\"hotel\": ') == (400, {\"error\": \"invalid json\"}), \"Некорректный JSON: 400\"\nassert create_booking('\"Rixos\"') == (400, {\"error\": \"invalid json\"}), \"JSON не объект: 400\"\n_s, _b = create_booking('{\"hotel\": \"Hilton\", \"nights\": 0, \"guests\": 9}')\nassert _s == 422 and set(_b[\"errors\"]) == {\"hotel\", \"nights\", \"guests\"}, \"Три ошибки вместе: 422\"\n_s, _b = create_booking('{\"hotel\": \"Kazakhstan Hotel\", \"nights\": true}')\nassert _s == 422 and set(_b[\"errors\"]) == {\"nights\"}, \"true не является количеством ночей\""
    }
   },
   {
    "title": "Декоратор валидации",
    "prompt": "Напишите параметрический декоратор <code>validate(**rules)</code>: каждое правило — пара «имя поля → <code>(тип, условие)</code>», где условие — функция, проверяющая значение. Обработчик принимает один аргумент: словарь <code>data</code>. Декоратор проверяет для каждого правила, что значение есть, что тип подходит (<code>bool</code> не считать <code>int</code>) и что условие выполняется; если есть ошибочные поля, обработчик не вызывается, а возвращается <code>(422, {\"errors\": [поля, по алфавиту]})</code>.",
    "hints": [
     "Три уровня: <code>validate(**rules)</code> → <code>decorator(handler)</code> → <code>wrapper(data)</code>.",
     "Перебор правил: <code>for field, (typ, cond) in rules.items():</code>"
    ],
    "check": {
     "tests": "_calls = []\n@validate(qty=(int, lambda v: 1 <= v <= 10), drink=(str, lambda v: v in {\"latte\", \"raf\"}))\ndef _order(data):\n    _calls.append(data)\n    return 201, {\"ok\": True}\nassert _order({\"qty\": 2, \"drink\": \"latte\"}) == (201, {\"ok\": True}), \"Корректные данные: результат обработчика\"\nassert _order({\"qty\": 0, \"drink\": \"kumys\"}) == (422, {\"errors\": [\"drink\", \"qty\"]}), \"Две ошибки, по алфавиту\"\nassert _order({\"drink\": \"raf\"}) == (422, {\"errors\": [\"qty\"]}), \"Нет поля: ошибка\"\nassert _order({\"qty\": True, \"drink\": \"raf\"}) == (422, {\"errors\": [\"qty\"]}), \"True не считается int\"\nassert len(_calls) == 1, \"При ошибке обработчик вызываться не должен\""
    }
   }
  ]
 },
 "pyb-6": {
  "pr": [
   {
    "title": "Модель dataclass",
    "prompt": "Импортируйте <code>dataclass</code> из модуля <code>dataclasses</code> и напишите модель <code>Bus</code>: <code>route: str</code>, <code>city: str</code>, <code>seats: int = 40</code>, <code>id: int = None</code>. Методы <code>__init__</code>, <code>__repr__</code> и <code>__eq__</code> dataclass создаёт сам.",
    "hints": [
     "Поставьте <code>@dataclass</code> над классом.",
     "Поля: <code>route: str</code>, ..., поля со значениями по умолчанию идут в конце."
    ],
    "check": {
     "tests": "from dataclasses import is_dataclass\nassert is_dataclass(Bus), \"Bus должен быть dataclass\"\n_b = Bus(\"92\", \"Алматы\")\nassert _b.route == \"92\" and _b.city == \"Алматы\" and _b.seats == 40 and _b.id is None, \"Значения по умолчанию: seats 40, id None\"\nassert Bus(\"10\", \"Астана\", 25) == Bus(\"10\", \"Астана\", 25), \"__eq__ сравнивает по полям\"\nassert repr(_b) == \"Bus(route='92', city='Алматы', seats=40, id=None)\", \"__repr__ в стиле dataclass\""
    }
   },
   {
    "title": "Получить значения полей",
    "prompt": "<code>getattr(obj, \"city\")</code> — то же самое, что <code>obj.city</code>. Функция <code>pluck(objects, field)</code> должна вернуть список значений указанного поля из списка объектов (как <code>values_list</code> в ORM).",
    "hints": [
     "Имя поля приходит строкой, поэтому используйте <code>getattr(o, field)</code>.",
     "<code>[getattr(o, field) for o in objects]</code>"
    ],
    "check": {
     "tests": "_cs = [Cafe(\"Kofe Bar\", \"Астана\", 4.6), Cafe(\"Daily Cup\", \"Алматы\", 4.8)]\nassert pluck(_cs, \"name\") == [\"Kofe Bar\", \"Daily Cup\"], \"pluck(_cs, 'name') должен быть ['Kofe Bar', 'Daily Cup']\"\nassert pluck(_cs, \"rating\") == [4.6, 4.8], \"pluck(_cs, 'rating') должен быть [4.6, 4.8]\"\nassert pluck([], \"city\") == [], \"Пустой список: []\""
    }
   },
   {
    "title": "Объект в словарь",
    "prompt": "Для ответа API модель нужно превратить в словарь. Функция <code>to_dict(obj, fields)</code> должна собрать в словарь только поля из списка <code>fields</code> в том же порядке. Например, секретное поле (<code>password_hash</code>) не попадает в ответ.",
    "hints": [
     "Словарное включение: <code>{f: getattr(obj, f) for f in fields}</code>",
     "Берутся только запрошенные поля."
    ],
    "check": {
     "tests": "_u = User(7, \"dana\", \"Павлодар\", \"9f86d0...\")\nassert to_dict(_u, [\"id\", \"login\", \"city\"]) == {\"id\": 7, \"login\": \"dana\", \"city\": \"Павлодар\"}, \"to_dict(...) должен быть {'id': 7, 'login': 'dana', 'city': 'Павлодар'}\"\nassert \"password_hash\" not in to_dict(_u, [\"id\", \"login\"]), \"Незапрошенное поле не попадает\"\nassert list(to_dict(_u, [\"city\", \"id\"])) == [\"city\", \"id\"], \"Порядок полей сохраняется\""
    }
   },
   {
    "title": "Обновление в репозитории",
    "prompt": "К готовому классу <code>Repo</code> добавьте два метода. <code>update(pk, **changes)</code> (параметр называется <code>pk</code>, а не <code>id</code>, поэтому ключ <code>id=...</code> попадёт в <code>changes</code>): если объекта нет — <code>None</code>; если есть, изменяет переданные поля через <code>setattr</code> и возвращает объект (поле <code>id</code> менять нельзя: если такой ключ передан — <code>ValueError</code>). <code>count(**kw)</code>: количество объектов, подходящих под условия <code>filter</code>.",
    "hints": [
     "<code>setattr(obj, \"free\", False)</code> — то же самое, что <code>obj.free = False</code>.",
     "Для <code>count</code> можно использовать готовый <code>filter</code>: <code>len(self.filter(**kw))</code>."
    ],
    "check": {
     "tests": "_r = Repo()\n_r.add(Taxi(\"Ерлан\", \"Шымкент\")); _r.add(Taxi(\"Дана\", \"Шымкент\")); _r.add(Taxi(\"Арман\", \"Орал\"))\nassert _r.update(2, free=False).free is False, \"update(2, free=False) меняет объект и возвращает его\"\nassert _r.rows[2].free is False, \"Изменение сохраняется в repo\"\nassert _r.update(9, free=False) is None, \"Нет такого id: None\"\nassert _r.count(city=\"Шымкент\") == 2 and _r.count(city=\"Шымкент\", free=True) == 1, \"count считает по условиям\"\n_ok = False\ntry:\n    _r.update(1, id=5)\nexcept ValueError:\n    _ok = True\nassert _ok and _r.rows[1].id == 1, \"Поле id менять нельзя: ValueError\""
    }
   },
   {
    "title": "Сбор связанных данных",
    "prompt": "Работа без N+1. <code>FakeDB</code> считает каждый запрос в <code>queries</code>. Функция <code>cafes_with_city(db)</code> должна вернуть для каждой кофейни список <code>(name, city_name)</code> (порядок кофеен сохраняется). Запросов должно быть не больше 2: <code>get_cafes()</code> и <code>get_cities(ids)</code> (он возвращает словарь id → город).",
    "hints": [
     "Соберите все <code>city_id</code> в один список и вызовите <code>db.get_cities(...)</code> один раз.",
     "Затем берите данные из словаря: <code>cities[c[\"city_id\"]][\"name\"]</code>"
    ],
    "check": {
     "tests": "_cities = {1: {\"name\": \"Алматы\"}, 2: {\"name\": \"Астана\"}, 3: {\"name\": \"Түркістан\"}}\n_cafes = [{\"name\": f\"Cafe-{i}\", \"city_id\": (i % 3) + 1} for i in range(25)]\n_db = FakeDB(_cafes, _cities)\n_res = cafes_with_city(_db)\nassert _res[:3] == [(\"Cafe-0\", \"Алматы\"), (\"Cafe-1\", \"Астана\"), (\"Cafe-2\", \"Түркістан\")], \"Результат: (name, city_name), порядок сохраняется\"\nassert len(_res) == 25, \"Нужны все 25 кофеен\"\nassert _db.queries <= 2, \"N+1: на 25 кофеен не должно уходить больше 2 запросов\""
    }
   },
   {
    "title": "Операторы lookup",
    "prompt": "Разберём ключи вида <code>rating__gte=4.5</code>, как в Django. Функция <code>matches(obj, **kw)</code> должна вернуть <code>True</code>, если объект подходит под все условия. Ключ делится через <code>__</code> на поле и оператор (<code>partition</code>). Операторы: без оператора — равенство; <code>gt</code> (&gt;), <code>lte</code> (≤), <code>in</code> (значение есть в списке), <code>startswith</code>. Неизвестный оператор — <code>ValueError</code>.",
    "hints": [
     "<code>field, _, op = key.partition(\"__\")</code>; если <code>op</code> пустой — <code>\"exact\"</code>.",
     "Удобно хранить операторы в словаре lambda-функций."
    ],
    "check": {
     "tests": "from dataclasses import dataclass\n@dataclass\nclass _Flat:\n    city: str\n    rooms: int\n    price: int\n_f = _Flat(\"Астана\", 2, 250000)\nassert matches(_f, city=\"Астана\") is True, \"Условие равенства\"\nassert matches(_f, rooms__gt=1, price__lte=250000) is True, \"gt и lte\"\nassert matches(_f, city__in=[\"Алматы\", \"Шымкент\"]) is False, \"in: нет в списке\"\nassert matches(_f, city__startswith=\"Аст\", rooms=3) is False, \"Если одно условие не выполнено, False\"\nassert matches(_f) is True, \"Без условий: True\"\n_ok = False\ntry:\n    matches(_f, price__between=1)\nexcept ValueError:\n    _ok = True\nassert _ok, \"Неизвестный оператор: ValueError\""
    }
   },
   {
    "title": "Ленивый запрос",
    "prompt": "Запрос ORM ленивый: <code>filter</code> только собирает условия, а обращение к базе происходит, когда нужен результат. Напишите <code>LazyQuery(db)</code>: <code>filter(**kw)</code> добавляет условие и возвращает <b>новый</b> <code>LazyQuery</code> (к базе не обращается); <code>all()</code> один раз вызывает <code>db.fetch_all()</code> и возвращает объекты, подходящие под все условия (только равенство); <code>count()</code> — <code>len(self.all())</code>. Исходный запрос не должен меняться.",
    "hints": [
     "Храните условия в словаре <code>self.conditions</code>; <code>filter</code> передаёт его копию новому объекту.",
     "К базе обращайтесь только внутри <code>all()</code>."
    ],
    "check": {
     "tests": "_db = FakeDB([{\"city\": \"Алматы\", \"type\": \"кофе\"}, {\"city\": \"Астана\", \"type\": \"кофе\"}, {\"city\": \"Алматы\", \"type\": \"шай\"}])\n_q = LazyQuery(_db)\n_q2 = _q.filter(city=\"Алматы\").filter(type=\"кофе\")\nassert isinstance(_q2, LazyQuery), \"filter должен возвращать новый LazyQuery\"\nassert _db.calls == 0, \"filter не должен обращаться к базе (ленивость)\"\nassert _q2.all() == [{\"city\": \"Алматы\", \"type\": \"кофе\"}], \"Два условия применяются вместе\"\nassert _db.calls == 1, \"all() обращается к базе один раз\"\nassert _q.count() == 3, \"Исходный запрос не меняется: 3\"\nassert _q.filter(city=\"Алматы\").count() == 2, \"Одно условие: 2\""
    }
   },
   {
    "title": "Применение миграций",
    "prompt": "Миграция — это описанное изменение схемы. Напишите <code>apply_migrations(schema, applied, migrations)</code>: <code>schema</code> — словарь таблица → список колонок; <code>applied</code> — множество имён уже применённых миграций; <code>migrations</code> — список кортежей <code>(имя, таблица, новая колонка)</code>. Функция должна применить ещё не применённые миграции, <b>отсортированные</b> по имени (колонка добавляется в конец таблицы; если таблицы нет — <code>ValueError</code>; если колонка уже есть — пропустить), добавить имя в <code>applied</code> и вернуть список имён, применённых в этот раз.",
    "hints": [
     "<code>sorted(migrations)</code> сортирует кортежи по первому элементу (имени).",
     "Для каждой миграции: <code>if name in applied: continue</code>, затем добавьте колонку и запишите имя в <code>applied</code>."
    ],
    "check": {
     "tests": "_schema = {\"cafe\": [\"id\", \"name\"], \"order\": [\"id\", \"cafe_id\"]}\n_applied = {\"0001_init\"}\n_ms = [(\"0003_add_phone\", \"cafe\", \"phone\"), (\"0001_init\", \"cafe\", \"id\"), (\"0002_add_city\", \"cafe\", \"city\"), (\"0004_add_total\", \"order\", \"total\")]\nassert apply_migrations(_schema, _applied, _ms) == [\"0002_add_city\", \"0003_add_phone\", \"0004_add_total\"], \"Новые миграции применяются в порядке имён\"\nassert _schema == {\"cafe\": [\"id\", \"name\", \"city\", \"phone\"], \"order\": [\"id\", \"cafe_id\", \"total\"]}, \"Колонки должны добавляться в правильном порядке\"\nassert apply_migrations(_schema, _applied, _ms) == [], \"При повторном запуске ничего не применяется\"\nassert \"0004_add_total\" in _applied, \"Применённые имена записываются в applied\"\n_ok = False\ntry:\n    apply_migrations(_schema, _applied, [(\"0005_x\", \"bus\", \"route\")])\nexcept ValueError:\n    _ok = True\nassert _ok, \"Нет таблицы: ValueError\""
    }
   }
  ]
 },
 "pyb-7": {
  "pr": [
   {
    "title": "Хэш SHA-256",
    "prompt": "Функция <code>sha256_hex(text)</code> должна вернуть хэш SHA-256 строки в виде hex-строки: <code>hashlib.sha256(text.encode()).hexdigest()</code>. Хэш односторонний: по нему нельзя восстановить исходный текст.",
    "hints": [
     "<code>import hashlib</code>",
     "Сначала переведите строку в байты: <code>text.encode()</code>."
    ],
    "check": {
     "tests": "assert sha256_hex(\"qwerty\") == \"65e84be33532fb784c48129675f9eff3a682b27168c0ea744b2cf58ee02337c5\", \"sha256_hex('qwerty') — неверный хэш\"\nassert sha256_hex(\"Алматы2026\") == \"4e7fcbbb3f18eafec365e76c166cb96e373bfdb6dc7ccc0b2c917bce71620418\", \"Кириллица тоже переводится в байты через encode()\"\nassert len(sha256_hex(\"\")) == 64, \"hex-значение SHA-256 — 64 символа\""
    }
   },
   {
    "title": "Хэш с солью",
    "prompt": "Чтобы одинаковые пароли давали разные хэши, добавляем соль (salt). Функция <code>salted_hash(password, salt)</code> должна вернуть hex-значение SHA-256 строки <code>salt + password</code>.",
    "hints": [
     "В хэш передайте строку <code>salt + password</code>.",
     "<code>hashlib.sha256((salt + password).encode()).hexdigest()</code>"
    ],
    "check": {
     "tests": "assert salted_hash(\"qwerty\", \"salt1\") == \"f41a01d156c10ea129396a991287e0277ecbe3e79b3e3b1af818d404cda1bd57\", \"salted_hash('qwerty', 'salt1') неверен: salt + password\"\nassert salted_hash(\"qwerty\", \"a\") != salted_hash(\"qwerty\", \"b\"), \"Другая соль даёт другой хэш\"\nassert salted_hash(\"qwerty\", \"x\") == salted_hash(\"qwerty\", \"x\"), \"Одинаковые соль и пароль дают одинаковый хэш\""
    }
   },
   {
    "title": "Получить bearer-токен",
    "prompt": "Функция <code>bearer_token(headers)</code> должна взять из словаря headers (имена в нижнем регистре) значение <code>authorization</code>, и если оно начинается со слова <code>\"Bearer \"</code>, вернуть токен после него. Если заголовка нет или схема другая (например <code>Basic</code>) — <code>None</code>.",
    "hints": [
     "<code>headers.get(\"authorization\", \"\")</code>",
     "Если <code>value.startswith(\"Bearer \")</code>, вернуть <code>value[7:]</code>."
    ],
    "check": {
     "tests": "assert bearer_token({\"authorization\": \"Bearer abc.def\"}) == \"abc.def\", \"Bearer abc.def → 'abc.def'\"\nassert bearer_token({\"authorization\": \"Basic dXNlcjpwdw==\"}) is None, \"Схема Basic: None\"\nassert bearer_token({}) is None, \"Заголовка нет: None\"\nassert bearer_token({\"authorization\": \"Bearer \"}) is None, \"Токен пустой: None\""
    }
   },
   {
    "title": "Сравнение за постоянное время",
    "prompt": "Функция <code>check_password(password, salt, stored)</code> должна вычислить SHA-256 hex от строки <code>salt + password</code> и сравнить его с сохранённым <code>stored</code> через <code>hmac.compare_digest</code> (а не через <code>==</code>: тот даёт информацию по времени сравнения).",
    "hints": [
     "<code>import hmac</code>",
     "<code>return hmac.compare_digest(candidate, stored)</code>"
    ],
    "check": {
     "tests": "_stored = \"f41a01d156c10ea129396a991287e0277ecbe3e79b3e3b1af818d404cda1bd57\"\nassert check_password(\"qwerty\", \"salt1\", _stored) is True, \"Верный пароль: True\"\nassert check_password(\"qwertY\", \"salt1\", _stored) is False, \"Неверный пароль: False\"\nassert check_password(\"qwerty\", \"salt2\", _stored) is False, \"Другая соль: False\""
    }
   },
   {
    "title": "HMAC-подпись",
    "prompt": "Платёжная система подписывает сообщение webhook-а. Функция <code>sign(message, secret)</code> должна вернуть <code>hmac.new(secret.encode(), message.encode(), hashlib.sha256).hexdigest()</code>. Функция <code>verify(message, secret, signature)</code> должна пересчитать подпись и проверить её через <code>hmac.compare_digest</code>.",
    "hints": [
     "<code>hmac.new(key, msg, hashlib.sha256).hexdigest()</code>",
     "В <code>verify</code> используйте <code>sign</code> повторно."
    ],
    "check": {
     "tests": "assert sign(\"order:1051:3200\", \"k3y\") == \"ceb1905247062701923093acdff9840e85e68da07969eb05cc1d89c4863ce568\", \"sign('order:1051:3200', 'k3y') неверен\"\n_s = sign(\"order:7:900\", \"k3y\")\nassert verify(\"order:7:900\", \"k3y\", _s) is True, \"Верная подпись: True\"\nassert verify(\"order:7:100\", \"k3y\", _s) is False, \"Если сообщение изменено: False\"\nassert verify(\"order:7:900\", \"other\", _s) is False, \"Другой секрет: False\""
    }
   },
   {
    "title": "Таблица сессий",
    "prompt": "Серверная сессия: класс <code>SessionStore</code> хранит таблицу <code>sid → user</code>. Метод <code>login(user)</code> создаёт новый <code>sid</code> (по порядку <code>\"s1\"</code>, <code>\"s2\"</code>, …), сохраняет его и возвращает. Метод <code>get_user(sid)</code> возвращает пользователя или <code>None</code>. Метод <code>logout(sid)</code> удаляет запись и возвращает <code>True</code>, если её не было — <code>False</code>.",
    "hints": [
     "Счётчик: <code>self.counter += 1</code>, <code>sid = f\"s{self.counter}\"</code>.",
     "<code>get_user</code>: <code>self.sessions.get(sid)</code>"
    ],
    "check": {
     "tests": "_st = SessionStore()\n_a = _st.login(\"dana\"); _b = _st.login(\"erlan\")\nassert (_a, _b) == (\"s1\", \"s2\"), \"sid по порядку: s1, s2\"\nassert _st.get_user(\"s1\") == \"dana\" and _st.get_user(\"s9\") is None, \"get_user: пользователь или None\"\nassert _st.logout(\"s1\") is True and _st.get_user(\"s1\") is None, \"logout удаляет сессию\"\nassert _st.logout(\"s1\") is False, \"Повторный logout: False\"\nassert _st.login(\"sara\") == \"s3\", \"Удалённый sid не выдаётся повторно: s3\""
    }
   },
   {
    "title": "Base64-полезная нагрузка",
    "prompt": "Тело токена — это base64. Функция <code>encode_payload(data)</code> должна превратить строку <code>json.dumps(data, sort_keys=True)</code> в <code>base64.urlsafe_b64encode</code> и убрать конечные символы <code>=</code>. Функция <code>decode_payload(body)</code> должна восстановить символы <code>=</code> (чтобы длина стала кратна 4) и вернуть словарь; для испорченного текста — <code>None</code>. Base64 — это не шифрование, его может прочитать любой.",
    "hints": [
     "Дополнение: <code>body + \"=\" * (-len(body) % 4)</code>.",
     "Для испорченного текста <code>urlsafe_b64decode</code> или <code>json.loads</code> выдают ошибку: <code>try/except (binascii.Error, ValueError)</code>."
    ],
    "check": {
     "tests": "_b = encode_payload({\"user\": 7, \"role\": \"barista\"})\nassert \"=\" not in _b and \"{\" not in _b, \"Результат должен быть base64 без символов =\"\nassert _b == \"eyJyb2xlIjogImJhcmlzdGEiLCAidXNlciI6IDd9\", \"Ключи должны сортироваться: sort_keys=True\"\nassert decode_payload(_b) == {\"user\": 7, \"role\": \"barista\"}, \"decode_payload должен выполнять обратное преобразование\"\nassert decode_payload(encode_payload({\"city\": \"Алматы\"})) == {\"city\": \"Алматы\"}, \"Работает и с кириллицей\"\nassert decode_payload(\"!!!\") is None, \"Испорченный текст: None\""
    }
   },
   {
    "title": "Иерархия ролей",
    "prompt": "Роли наследуют друг друга: в <code>ROLES</code> у каждой роли есть свои права (<code>perms</code>) и родительская роль (<code>inherits</code>, если её нет — <code>None</code>). Рекурсивная функция <code>all_perms(role)</code> должна вернуть множество всех прав роли (включая права родителя); для неизвестной роли — пустое множество. Декоратор <code>require(perm)</code>: если <code>user is None</code> → <code>(401, {\"error\": \"login required\"})</code>, если права нет → <code>(403, {\"error\": \"forbidden\"})</code>, иначе результат обработчика.",
    "hints": [
     "Рекурсия: к собственным правам добавьте результат <code>all_perms(info[\"inherits\"])</code> (через <code>|=</code>).",
     "<code>require</code> — декоратор с параметром: <code>require(perm)</code> → <code>decorator(handler)</code> → <code>wrapper(user, ...)</code>."
    ],
    "check": {
     "tests": "assert all_perms(\"owner\") == {\"orders:read\", \"menu:edit\", \"reports:read\"}, \"owner получает права всех своих предков\"\nassert all_perms(\"barista\") == {\"orders:read\"}, \"barista: только свои\"\nassert all_perms(\"intern\") == set(), \"Неизвестная роль: пустое множество\"\nassert ROLES[\"manager\"][\"perms\"] == {\"menu:edit\"}, \"Словарь ROLES не должен меняться\"\n@require(\"menu:edit\")\ndef _set_price(user, drink, price):\n    return 200, {\"drink\": drink, \"price\": price}\nassert _set_price(None, \"raf\", 1500) == (401, {\"error\": \"login required\"}), \"Не вошедший: 401\"\nassert _set_price({\"role\": \"barista\"}, \"raf\", 1500) == (403, {\"error\": \"forbidden\"}), \"barista не может менять меню: 403\"\nassert _set_price({\"role\": \"owner\"}, \"raf\", 1500) == (200, {\"drink\": \"raf\", \"price\": 1500}), \"owner получает menu:edit по наследству\""
    }
   }
  ]
 },
 "pyb-8": {
  "pr": [
   {
    "title": "Первый TestCase",
    "prompt": "Дана функция <code>km_to_m(km)</code>. Напишите класс <code>DistanceTests(unittest.TestCase)</code>: минимум 2 метода теста (имена начинаются с <code>test_</code>) с <code>assertEqual</code>, например <code>km_to_m(3)</code> = 3000 и <code>km_to_m(0)</code> = 0. Тесты запускаются также на специально сломанной версии (<code>km * 100</code>): там тесты должны падать.",
    "hints": [
     "Каждый тест — метод <code>def test_...(self):</code>.",
     "<code>self.assertEqual(km_to_m(3), 3000)</code>"
    ],
    "check": {
     "tests": "import io as _io, unittest as _ut\ndef _run(_cls):\n    return _ut.TextTestRunner(stream=_io.StringIO()).run(_ut.defaultTestLoader.loadTestsFromTestCase(_cls))\n\n_r = _run(DistanceTests)\nassert _r.testsRun >= 2, \"Нужно минимум 2 метода теста (имя начинается с test_)\"\nassert _r.wasSuccessful(), \"Тесты должны проходить на правильной функции\"\n_good = km_to_m\nkm_to_m = lambda km: km * 100\n_bad = _run(DistanceTests).wasSuccessful()\nkm_to_m = _good\nassert not _bad, \"Тесты не поймали ошибку km * 100\""
    }
   },
   {
    "title": "Тест assertRaises",
    "prompt": "<code>withdraw(balance, amount)</code> выбрасывает <code>ValueError</code>, если сумма больше баланса. Напишите <code>WithdrawTests(unittest.TestCase)</code>: один тест проверяет обычное снятие (<code>withdraw(5000, 2000) == 3000</code>), второй проверяет ошибку через <code>with self.assertRaises(ValueError):</code>. На сломанной версии, которая не выбрасывает ошибку, тесты должны падать.",
    "hints": [
     "<code>with self.assertRaises(ValueError): withdraw(1000, 5000)</code>",
     "Двух методов теста достаточно."
    ],
    "check": {
     "tests": "import io as _io, unittest as _ut\ndef _run(_cls):\n    return _ut.TextTestRunner(stream=_io.StringIO()).run(_ut.defaultTestLoader.loadTestsFromTestCase(_cls))\n\n_r = _run(WithdrawTests)\nassert _r.testsRun >= 2 and _r.wasSuccessful(), \"Минимум 2 теста, и они должны проходить на правильной функции\"\n_good = withdraw\nwithdraw = lambda balance, amount: balance - amount\n_bad = _run(WithdrawTests).wasSuccessful()\nwithdraw = _good\nassert not _bad, \"Тесты не заметили отсутствие ValueError: используйте assertRaises\""
    }
   },
   {
    "title": "Запуск тестов",
    "prompt": "Напишите функцию <code>run_tests(case_class)</code>: она должна собрать тесты класса TestCase через <code>unittest.defaultTestLoader.loadTestsFromTestCase</code>, запустить их через <code>unittest.TextTestRunner(stream=io.StringIO())</code> и вернуть кортеж <code>(testsRun, wasSuccessful)</code>.",
    "hints": [
     "<code>suite = unittest.defaultTestLoader.loadTestsFromTestCase(case_class)</code>",
     "<code>result = unittest.TextTestRunner(stream=io.StringIO()).run(suite)</code>"
    ],
    "check": {
     "tests": "import unittest as _ut\nclass _Ok(_ut.TestCase):\n    def test_a(self):\n        self.assertTrue(True)\n    def test_b(self):\n        self.assertIn(\"а\", \"ата\")\nclass _Fail(_ut.TestCase):\n    def test_a(self):\n        self.assertEqual(1, 2)\nassert run_tests(_Ok) == (2, True), \"Два успешных теста: (2, True)\"\nassert run_tests(_Fail) == (1, False), \"Один упавший тест: (1, False)\""
    }
   },
   {
    "title": "Чистый setUp",
    "prompt": "Дан класс <code>Cart</code>. Напишите <code>CartTests(unittest.TestCase)</code>: в <code>setUp</code> создавайте новую корзину для каждого теста (<code>self.cart = Cart()</code>). Минимум 2 теста: после добавления товара <code>count()</code> увеличивается на 1; <code>total()</code> новой корзины равен 0. На сломанном <code>Cart</code>, который не добавляет товары, тесты должны падать.",
    "hints": [
     "<code>def setUp(self): self.cart = Cart()</code>",
     "В тесте: <code>self.cart.add(...)</code>, затем <code>assertEqual(self.cart.count(), 1)</code>."
    ],
    "check": {
     "tests": "import io as _io, unittest as _ut\ndef _run(_cls):\n    return _ut.TextTestRunner(stream=_io.StringIO()).run(_ut.defaultTestLoader.loadTestsFromTestCase(_cls))\n\nassert \"setUp\" in CartTests.__dict__, \"Нужен метод setUp\"\n_r = _run(CartTests)\nassert _r.testsRun >= 2 and _r.wasSuccessful(), \"Минимум 2 теста, и они должны проходить на правильном Cart\"\n_Good = Cart\nclass _Broken(_Good):\n    def add(self, name, price):\n        pass\nCart = _Broken\n_bad = _run(CartTests).wasSuccessful()\nCart = _Good\nassert not _bad, \"Тесты должны падать на Cart, который не добавляет товары\""
    }
   },
   {
    "title": "Граничные значения",
    "prompt": "<code>valid_qty(q)</code> возвращает <code>True</code>, если количество — число от 1 до 10 включительно. Ошибки чаще всего возникают на границах. Напишите <code>QtyTests(unittest.TestCase)</code>: проверьте значения 0, 1, 10 и 11 (<code>assertTrue</code> / <code>assertFalse</code>). Проверка запускается на двух сломанных версиях: <code>1 &lt;= q &lt; 10</code> и <code>0 &lt;= q &lt;= 10</code>.",
    "hints": [
     "Нижняя граница: <code>assertFalse(valid_qty(0))</code>, <code>assertTrue(valid_qty(1))</code>.",
     "Верхняя граница: 10 → True, 11 → False."
    ],
    "check": {
     "tests": "import io as _io, unittest as _ut\ndef _run(_cls):\n    return _ut.TextTestRunner(stream=_io.StringIO()).run(_ut.defaultTestLoader.loadTestsFromTestCase(_cls))\n\nassert _run(QtyTests).wasSuccessful(), \"Тесты должны проходить на правильной функции\"\n_good = valid_qty\nfor _mut, _msg in ((lambda q: 1 <= q < 10, \"10 мәні тексерілмеген\"), (lambda q: 0 <= q <= 10, \"0 мәні тексерілмеген\")):\n    valid_qty = _mut\n    _bad = _run(QtyTests).wasSuccessful()\n    valid_qty = _good\n    assert not _bad, \"Тесттер шекаралық қатені ұстамады: \" + _msg"
    }
   },
   {
    "title": "Поддельные часы",
    "prompt": "Для тестирования кода, зависящего от времени, нужны поддельные часы. Напишите класс <code>FakeClock</code>: <code>FakeClock(start=0)</code>, при вызове (<code>clock()</code>, через <code>__call__</code>) возвращает текущее время, метод <code>advance(seconds)</code> сдвигает время вперёд. Он должен работать с готовым классом <code>OtpCode</code>: код действует 60 секунд.",
    "hints": [
     "<code>__call__</code> позволяет вызывать объект как функцию.",
     "<code>advance</code>: <code>self.t += seconds</code>"
    ],
    "check": {
     "tests": "_c = FakeClock(100)\nassert _c() == 100, \"FakeClock(100)() должен вернуть 100\"\n_c.advance(5)\nassert _c() == 105, \"advance(5) сдвигает время на 5 секунд\"\nassert FakeClock()() == 0, \"start по умолчанию равен 0\"\n_clock = FakeClock()\n_otp = OtpCode(\"4821\", _clock)\n_clock.advance(59)\nassert _otp.check(\"4821\") is True, \"Через 59 секунд код ещё действует\"\n_clock.advance(1)\nassert _otp.check(\"4821\") is False, \"Через 60 секунд срок истекает\""
    }
   },
   {
    "title": "Сценарий test client",
    "prompt": "<code>TicketApp</code> и <code>TestClient</code> готовы. Напишите <code>TicketApiTests(unittest.TestCase)</code>: в <code>setUp</code> создайте <code>self.client = TestClient(TicketApp())</code>. Минимум 3 теста: <code>POST /tickets</code> возвращает 201; после <code>DELETE</code> созданного билета <code>GET</code> возвращает 404; <code>DELETE</code> несуществующего билета возвращает 404. Проверка запускается на двух сломанных приложениях: (1) POST возвращает 200, (2) DELETE ничего не удаляет.",
    "hints": [
     "<code>setUp</code> даёт каждому тесту новое приложение, поэтому тесты не зависят друг от друга.",
     "Тест удаления: сначала POST, из ответа возьмите <code>id</code>, затем DELETE, затем проверьте, что GET даёт 404."
    ],
    "check": {
     "tests": "import io as _io, unittest as _ut\ndef _run(_cls):\n    return _ut.TextTestRunner(stream=_io.StringIO()).run(_ut.defaultTestLoader.loadTestsFromTestCase(_cls))\n\nassert \"setUp\" in TicketApiTests.__dict__, \"Нужен метод setUp\"\n_r = _run(TicketApiTests)\nassert _r.testsRun >= 3 and _r.wasSuccessful(), \"Минимум 3 теста, и они должны проходить на правильном приложении\"\n_Good = TicketApp\nclass _PostOk(_Good):\n    def handle(self, method, path, body=\"\"):\n        s, b = super().handle(method, path, body)\n        return (200 if s == 201 else s), b\nclass _NoDelete(_Good):\n    def handle(self, method, path, body=\"\"):\n        if method == \"DELETE\" and path.startswith(\"/tickets/\") and int(path.split(\"/\")[2]) in self.tickets:\n            return 204, \"\"\n        return super().handle(method, path, body)\nfor _cls, _msg in ((_PostOk, \"POST 201 орнына 200 қайтарады\"), (_NoDelete, \"DELETE билетті өшірмейді\")):\n    TicketApp = _cls\n    _bad = _run(TicketApiTests).wasSuccessful()\n    TicketApp = _Good\n    assert not _bad, \"Тесттер бұзылған қосымшаны ұстамады: \" + _msg"
    }
   },
   {
    "title": "Тестирование ошибочных случаев",
    "prompt": "<code>parse_age(text)</code> превращает строку в возраст: пробелы убираются; если текст не цифры или возраст вне диапазона 0–120, выбрасывается <code>ValueError</code>. Напишите <code>AgeTests(unittest.TestCase)</code> (минимум 3 теста). Проверка запускается на трёх сломанных версиях: (1) принимает отрицательный возраст (<code>\"-5\"</code>), (2) возвращает <code>None</code> для <code>\"abc\"</code>, (3) принимает значение больше 120. На каждой из них ваши тесты должны падать.",
    "hints": [
     "Отдельный тест для каждого случая ошибки: <code>with self.assertRaises(ValueError): parse_age(\"-5\")</code>.",
     "Граница: <code>\"120\"</code> допустимо, <code>\"121\"</code> недопустимо."
    ],
    "check": {
     "tests": "import io as _io, unittest as _ut\ndef _run(_cls):\n    return _ut.TextTestRunner(stream=_io.StringIO()).run(_ut.defaultTestLoader.loadTestsFromTestCase(_cls))\n\n_r = _run(AgeTests)\nassert _r.testsRun >= 3 and _r.wasSuccessful(), \"Минимум 3 теста, и они должны проходить на правильной функции\"\n_good = parse_age\ndef _m1(text):\n    age = int(text.strip())\n    if age > 120:\n        raise ValueError(\"x\")\n    return age\ndef _m2(text):\n    text = text.strip()\n    if not text.lstrip(\"-\").isdigit():\n        return None\n    age = int(text)\n    if not 0 <= age <= 120:\n        raise ValueError(\"x\")\n    return age\ndef _m3(text):\n    text = text.strip()\n    if not text.isdigit():\n        raise ValueError(\"x\")\n    return int(text)\nfor _mut, _msg in ((_m1, \"теріс жас қабылданады\"), (_m2, \"'abc' үшін ValueError жоқ\"), (_m3, \"120-дан үлкен жас қабылданады\")):\n    parse_age = _mut\n    _bad = _run(AgeTests).wasSuccessful()\n    parse_age = _good\n    assert not _bad, \"Тесттер бұзылған нұсқаны ұстамады: \" + _msg"
    }
   }
  ]
 },
 "pyb-9": {
  "pr": [
   {
    "title": "Почтовый индекс",
    "prompt": "Почтовый индекс в Казахстане — ровно 6 цифр (например, <code>050000</code>). Проверьте <code>is_postcode(s)</code> через <code>re.fullmatch</code> и верните <code>True</code> / <code>False</code>.",
    "hints": [
     "<code>re.match</code> смотрит только начало строки, поэтому <code>\"0500001\"</code> тоже пройдёт.",
     "<code>re.fullmatch(r\"\\d{6}\", s)</code>"
    ],
    "check": {
     "tests": "assert is_postcode(\"050000\") is True, \"050000 — правильный индекс\"\nassert is_postcode(\"0500001\") is False, \"7 цифр: False\"\nassert is_postcode(\"05000\") is False, \"5 цифр: False\"\nassert is_postcode(\"05 000\") is False and is_postcode(\"A50000\") is False, \"Пробел или буквы: False\""
    }
   },
   {
    "title": "Поиск чисел",
    "prompt": "Функция <code>extract_numbers(text)</code> должна найти все целые числа в тексте через <code>re.findall</code> и вернуть список <code>int</code>. <code>extract_numbers(\"2 латте, 1 раф, 3500 ₸\")</code> → <code>[2, 1, 3500]</code>.",
    "hints": [
     "<code>re.findall(r\"\\d+\", text)</code> даёт список строк.",
     "Каждую строку переведите в <code>int</code>."
    ],
    "check": {
     "tests": "assert extract_numbers(\"2 латте, 1 раф, 3500 ₸\") == [2, 1, 3500], \"extract_numbers('2 латте, 1 раф, 3500 ₸') должен быть [2, 1, 3500]\"\nassert extract_numbers(\"сан жоқ\") == [], \"Нет чисел: []\"\nassert extract_numbers(\"№12-автобус 07:45\") == [12, 7, 45], \"№12-автобус 07:45 → [12, 7, 45]\""
    }
   },
   {
    "title": "Сокращение пробелов",
    "prompt": "Функция <code>squeeze(text)</code> должна заменить любую последовательность пробельных символов (пробел, tab, перевод строки) в тексте одним пробелом (<code>re.sub</code>) и обрезать края через <code>strip</code>. <code>squeeze(\"  Абай   даңғылы\\t10 \")</code> → <code>\"Абай даңғылы 10\"</code>.",
    "hints": [
     "<code>\\s+</code> — один или несколько пробельных символов.",
     "<code>re.sub(r\"\\s+\", \" \", text).strip()</code>"
    ],
    "check": {
     "tests": "assert squeeze(\"  Абай   даңғылы\\t10 \") == \"Абай даңғылы 10\", \"squeeze('  Абай   даңғылы\\\\t10 ') должен вернуть 'Абай даңғылы 10'\"\nassert squeeze(\"Сәтпаев\\n\\nкөшесі\") == \"Сәтпаев көшесі\", \"Переводы строк тоже становятся одним пробелом\"\nassert squeeze(\"   \") == \"\", \"Только пробелы: пустая строка\""
    }
   },
   {
    "title": "Проверка ИИН",
    "prompt": "ИИН — это 12 цифр, первые шесть — дата рождения <code>ЖЖААКК</code>: месяц <code>01</code>–<code>12</code>, день <code>01</code>–<code>31</code>. Функция <code>is_iin(s)</code> должна проверить формат одним regex (<code>fullmatch</code>). Контрольную цифру мы не считаем.",
    "hints": [
     "Месяц: <code>(0[1-9]|1[0-2])</code>; день: <code>(0[1-9]|[12]\\d|3[01])</code>.",
     "В конце ещё 6 цифр: <code>\\d{6}</code>."
    ],
    "check": {
     "tests": "assert is_iin(\"990315300123\") is True, \"990315300123 — правильно: 15 марта\"\nassert is_iin(\"051231600456\") is True, \"051231600456 — правильно: 31 декабря\"\nassert is_iin(\"991315300123\") is False, \"Месяца 13 нет: False\"\nassert is_iin(\"990300300123\") is False, \"Дня 00 нет: False\"\nassert is_iin(\"99031530012\") is False and is_iin(\"9903153001234\") is False, \"11 или 13 цифр: False\""
    }
   },
   {
    "title": "Номер автомобиля",
    "prompt": "Казахстанский номер автомобиля: 3 цифры, 3 заглавные латинские буквы и двузначный код региона <code>01</code>–<code>20</code> (например, <code>123ABC02</code>; может записываться и с пробелами: <code>123 ABC 02</code>). Функция <code>parse_plate(text)</code> должна убрать пробелы и через regex с именованными группами вернуть <code>{\"number\": \"123\", \"letters\": \"ABC\", \"region\": 2}</code>, а если не подходит — <code>None</code>.",
    "hints": [
     "Именованная группа: <code>(?P&lt;number&gt;\\d{3})</code>; регион: <code>(0[1-9]|1\\d|20)</code>.",
     "<code>m.groupdict()</code>, затем переведите <code>region</code> в <code>int</code>."
    ],
    "check": {
     "tests": "assert parse_plate(\"123ABC02\") == {\"number\": \"123\", \"letters\": \"ABC\", \"region\": 2}, \"123ABC02 → number 123, letters ABC, region 2\"\nassert parse_plate(\"777 KZT 17\") == {\"number\": \"777\", \"letters\": \"KZT\", \"region\": 17}, \"Номер, записанный с пробелами\"\nassert parse_plate(\"123ABC21\") is None, \"Код региона 21 не существует: None\"\nassert parse_plate(\"123abc02\") is None, \"Строчные буквы: None\"\nassert parse_plate(\"12ABC02\") is None, \"Две цифры: None\""
    }
   },
   {
    "title": "Хэштеги",
    "prompt": "Функция <code>hashtags(text)</code> должна вернуть теги вида <code>#слово</code> из текста (после <code>#</code> идут буквы, цифры, <code>_</code>, в том числе кириллица) в нижнем регистре, без повторов, в порядке первого появления. <code>hashtags(\"#Наурыз мерекесі! #наурыз #Алматы2026\")</code> → <code>[\"наурыз\", \"алматы2026\"]</code>.",
    "hints": [
     "Если шаблон <code>#(\\w+)</code>, то <code>findall</code> возвращает только группу (без <code>#</code>).",
     "Чтобы не было повторов: <code>if tag not in result: result.append(tag)</code>"
    ],
    "check": {
     "tests": "assert hashtags(\"#Наурыз мерекесі! #наурыз #Алматы2026\") == [\"наурыз\", \"алматы2026\"], \"hashtags(...) должен быть ['наурыз', 'алматы2026']\"\nassert hashtags(\"Тег жоқ\") == [], \"Тегов нет: []\"\nassert hashtags(\"#kofe_bar, #kofe_bar #Тараз\") == [\"kofe_bar\", \"тараз\"], \"Знак _ входит в тег, запятая не входит\""
    }
   },
   {
    "title": "Смена формата даты",
    "prompt": "API отдаёт даты в ISO-формате (<code>2026-03-22</code>), а казахстанскому пользователю удобнее <code>22.03.2026</code>. Функция <code>iso_to_kz(text)</code> должна заменить все даты <code>ГГГГ-ММ-ДД</code> в тексте на вид <code>ДД.ММ.ГГГГ</code> через <code>re.sub</code> и ссылку на группу (<code>\\3.\\2.\\1</code>). Менять только отдельно стоящие даты: если рядом с датой стоит цифра (например, <code>12026-03-221</code>), она не меняется (<code>\\b</code>).",
    "hints": [
     "Три группы: <code>(\\d{4})-(\\d{2})-(\\d{2})</code>; строка замены — <code>r\"\\3.\\2.\\1\"</code>.",
     "Границы: заключите шаблон между <code>\\b</code>."
    ],
    "check": {
     "tests": "assert iso_to_kz(\"Наурыз: 2026-03-22, Жаңа жыл: 2027-01-01.\") == \"Наурыз: 22.03.2026, Жаңа жыл: 01.01.2027.\", \"Обе даты должны быть заменены\"\nassert iso_to_kz(\"Күн жоқ\") == \"Күн жоқ\", \"Если дат нет, текст не меняется\"\nassert iso_to_kz(\"код 12026-03-221\") == \"код 12026-03-221\", \"Длинная последовательность цифр — не дата\""
    }
   },
   {
    "title": "Разбор строки лога",
    "prompt": "Строка nginx access log: <code>192.168.0.7 - [16/Oct/2026:14:30:01] \"GET /cafes?city=Almaty HTTP/1.1\" 200 512</code>. Функция <code>parse_log(line)</code> должна вернуть словарь через один regex с именованными группами: <code>ip</code>, <code>time</code> (текст в квадратных скобках), <code>method</code>, <code>path</code>, <code>status</code> (int), <code>size</code> (int). Если строка не подходит — <code>None</code>.",
    "hints": [
     "IP: <code>\\d{1,3}(?:\\.\\d{1,3}){3}</code>; время: <code>\\[(?P&lt;time&gt;[^\\]]+)\\]</code>.",
     "Часть запроса: <code>\"(?P&lt;method&gt;[A-Z]+) (?P&lt;path&gt;\\S+) HTTP/[\\d.]+\"</code>"
    ],
    "check": {
     "tests": "_l = '192.168.0.7 - [16/Oct/2026:14:30:01] \"GET /cafes?city=Almaty HTTP/1.1\" 200 512'\nassert parse_log(_l) == {\"ip\": \"192.168.0.7\", \"time\": \"16/Oct/2026:14:30:01\", \"method\": \"GET\", \"path\": \"/cafes?city=Almaty\", \"status\": 200, \"size\": 512}, \"Результат parse_log(...) неверен\"\n_p = parse_log('10.0.0.1 - [17/Oct/2026:09:00:00] \"POST /v1/orders HTTP/2\" 201 48')\nassert _p[\"method\"] == \"POST\" and _p[\"status\"] == 201 and _p[\"size\"] == 48, \"Строка с POST: 201, 48\"\nassert parse_log(\"бұзық жол\") is None, \"Если не подходит: None\"\nassert parse_log('10.0.0.1 - [x] \"GET / HTTP/1.1\" 2000 1') is None, \"Status должен состоять из 3 цифр\""
    }
   }
  ]
 },
 "pyb-10": {
  "pr": [
   {
    "title": "Объект coroutine",
    "prompt": "Напишите функцию <code>async def greet(name)</code>: она должна вернуть <code>f\"Сәлем, {name}!\"</code>. Затем запишите в переменную <code>kind</code> название типа объекта, который возвращает вызов <code>greet(\"Дана\")</code> (<code>type(...).__name__</code>), и закройте coroutine через <code>.close()</code>.",
    "hints": [
     "Вызов функции <code>async def</code> её не выполняет, а возвращает объект coroutine.",
     "<code>c = greet(\"Дана\")</code>, <code>kind = type(c).__name__</code>, <code>c.close()</code>"
    ],
    "check": {
     "tests": "import inspect as _inspect\nassert _inspect.iscoroutinefunction(greet), \"greet должна быть написана через async def\"\nassert kind == \"coroutine\", \"kind должен быть 'coroutine'\"\n_c = greet(\"Ерлан\")\ntry:\n    _c.send(None)\n    _val = None\nexcept StopIteration as _e:\n    _val = _e.value\nassert _val == \"Сәлем, Ерлан!\", \"При выполнении coroutine должна возвращаться строка 'Сәлем, Ерлан!'\""
    }
   },
   {
    "title": "Время ожидания",
    "prompt": "Сервер отправляет запросы к трём внешним сервисам, каждый ждёт столько миллисекунд, сколько указано в списке <code>durations</code>. Функция <code>total_wait(durations, concurrent)</code>: при последовательных запросах (<code>concurrent=False</code>) общее время — сумма; при одновременных (<code>True</code>) — самое длительное. Для пустого списка результат 0.",
    "hints": [
     "При одновременных запросах ожидания перекрываются, поэтому нужен <code>max</code>.",
     "На пустом списке <code>max</code> выдаст ошибку: сначала проверьте."
    ],
    "check": {
     "tests": "assert total_wait([20, 300, 150], concurrent=False) == 470, \"Последовательно: 20 + 300 + 150 = 470\"\nassert total_wait([20, 300, 150], concurrent=True) == 300, \"Одновременно: самое длительное 300\"\nassert total_wait([], concurrent=True) == 0, \"Пустой список: 0\""
    }
   },
   {
    "title": "Фоновая очередь",
    "prompt": "Обработчик ставит тяжёлую работу в очередь и сразу возвращает <code>202</code>. Напишите класс <code>TaskQueue</code> (через <code>collections.deque</code>): <code>submit(name)</code> ставит задачу в конец очереди и возвращает <code>(202, {\"task_id\": n})</code> (<code>n</code> увеличивается с 1); <code>work()</code> берёт задачу из начала очереди, добавляет её в список <code>done</code> и возвращает её название (если очередь пуста — <code>None</code>).",
    "hints": [
     "<code>submit</code>: <code>self.queue.append(name)</code>, счётчик id.",
     "<code>work</code>: <code>self.queue.popleft()</code>, при пустой очереди <code>None</code>."
    ],
    "check": {
     "tests": "_q = TaskQueue()\nassert _q.submit(\"чек PDF\") == (202, {\"task_id\": 1}), \"submit: (202, {'task_id': 1})\"\nassert _q.submit(\"SMS хабар\") == (202, {\"task_id\": 2}), \"Вторая задача: task_id 2\"\nassert _q.work() == \"чек PDF\" and _q.work() == \"SMS хабар\", \"Задачи выполняются в порядке очереди\"\nassert _q.work() is None and _q.done == [\"чек PDF\", \"SMS хабар\"], \"Пустая очередь: None; список done заполнен\""
    }
   },
   {
    "title": "Кэш с TTL",
    "prompt": "Курс валюты должен храниться в кэше 60 секунд. Напишите <code>TTLCache(ttl, clock)</code>: <code>set(key, value)</code> записывает значение вместе со временем сохранения; <code>get(key)</code> возвращает значение, если оно есть и <code>clock() - сохранённое_время &lt; ttl</code>, иначе <code>None</code> (просроченную запись удаляет).",
    "hints": [
     "Сохраняйте время вместе со значением: <code>self.data[key] = (value, self.clock())</code>.",
     "<code>get</code>: если срок истёк — <code>del</code> и <code>None</code>."
    ],
    "check": {
     "tests": "class _Clock:\n    def __init__(self):\n        self.t = 0\n    def __call__(self):\n        return self.t\n_c = _Clock()\n_cache = TTLCache(60, _c)\n_cache.set(\"USD\", 470)\n_c.t = 59\nassert _cache.get(\"USD\") == 470, \"Через 59 секунд значение ещё есть\"\n_c.t = 60\nassert _cache.get(\"USD\") is None, \"Через 60 секунд срок истекает\"\nassert \"USD\" not in _cache.data, \"Просроченная запись должна удаляться\"\nassert _cache.get(\"EUR\") is None, \"Нет такого ключа: None\"\n_cache.set(\"EUR\", 510); _c.t = 100\nassert _cache.get(\"EUR\") == 510, \"Время новой записи считается с момента set\""
    }
   },
   {
    "title": "Лимит фиксированного окна",
    "prompt": "Простейший rate limiter — фиксированное окно: время делится на окна по <code>window</code> секунд (<code>int(clock() // window)</code>), и в каждом окне для одного key разрешено не более <code>limit</code> запросов. Метод <code>allow(key)</code> класса <code>FixedWindow(limit, window, clock)</code> возвращает <code>True</code>, если запрос разрешён, иначе <code>False</code> (429).",
    "hints": [
     "Ключ счётчика: <code>(key, int(self.clock() // self.window))</code>.",
     "Если лимит достигнут — <code>False</code>, иначе увеличьте счётчик и верните <code>True</code>."
    ],
    "check": {
     "tests": "class _Clock:\n    def __init__(self):\n        self.t = 0.0\n    def __call__(self):\n        return self.t\n_c = _Clock()\n_fw = FixedWindow(limit=2, window=60, clock=_c)\nassert [_fw.allow(\"ip1\") for _ in range(3)] == [True, True, False], \"В одном окне только 2 запроса\"\nassert _fw.allow(\"ip2\") is True, \"У каждого key свой счётчик\"\n_c.t = 59.9\nassert _fw.allow(\"ip1\") is False, \"59.9 секунды — ещё первое окно\"\n_c.t = 60\nassert _fw.allow(\"ip1\") is True, \"В новом окне счётчик начинается с нуля\""
    }
   },
   {
    "title": "Повторная попытка",
    "prompt": "Фоновая задача может упасть из-за временной ошибки (обрыв сети). Функция <code>retry(func, attempts)</code> должна вызвать <code>func()</code>: если выброшено исключение, попробовать снова, всего не более <code>attempts</code> раз. Если успешно — вернуть результат; если все попытки неудачны, <code>повторно выбросить</code> <b>последнее</b> исключение (<code>raise</code>).",
    "hints": [
     "В цикле: <code>try: return func()</code>, <code>except Exception as e: last = e</code>.",
     "По окончании цикла: <code>raise last</code>."
    ],
    "check": {
     "tests": "_n = {\"calls\": 0}\ndef _flaky():\n    _n[\"calls\"] += 1\n    if _n[\"calls\"] < 3:\n        raise ConnectionError(f\"әрекет {_n['calls']}\")\n    return \"SMS жіберілді\"\nassert retry(_flaky, 5) == \"SMS жіберілді\" and _n[\"calls\"] == 3, \"Третья попытка успешна: 3 вызова\"\n_n[\"calls\"] = 0\n_err = None\ntry:\n    retry(_flaky, 2)\nexcept ConnectionError as _e:\n    _err = str(_e)\nassert _err == \"әрекет 2\" and _n[\"calls\"] == 2, \"2 неудачные попытки: поднимается последнее исключение ('әрекет 2')\""
    }
   },
   {
    "title": "Порядок завершения задач",
    "prompt": "Напишите scheduler на основе поддельных часов из урока: каждая задача — генератор, <code>yield</code> отдаёт «сколько секунд я буду ждать». Функция <code>finish_order(tasks)</code> ведёт очередь <code>heapq</code> из <code>(время, индекс, генератор)</code> и возвращает список <code>(время, индекс)</code> в порядке завершения задач. При равном времени первым идёт меньший индекс.",
    "hints": [
     "В начале: <code>queue = [(0, i, t) for i, t in enumerate(tasks)]</code>, затем <code>heapq.heapify(queue)</code>.",
     "<code>next(task)</code> отдаёт время ожидания; <code>StopIteration</code> — задача завершена."
    ],
    "check": {
     "tests": "_tasks = [order([3, 1]), order([1, 1]), order([5])]\nassert finish_order(_tasks) == [(2, 1), (4, 0), (5, 2)], \"Порядок завершения: (2, 1), (4, 0), (5, 2)\"\nassert finish_order([order([2]), order([2])]) == [(2, 0), (2, 1)], \"При равном времени первым идёт меньший индекс\"\nassert finish_order([order([])]) == [(0, 0)], \"Задача без ожидания завершается в момент 0\"\nassert finish_order([]) == [], \"Нет задач: []\""
    }
   },
   {
    "title": "Скользящее окно",
    "prompt": "Фиксированное окно пропускает вдвое больше запросов на границе окон. Напишите <code>SlidingLog(limit, window, clock)</code>: для каждого key хранится в <code>deque</code> время последних запросов. <code>allow(key)</code>: сначала удаляет слева старые времена (<code>&lt;=</code>) не позже <code>now - window</code>; если оставшихся меньше <code>limit</code>, добавляет <code>now</code> и возвращает <code>True</code>, иначе <code>False</code>.",
    "hints": [
     "<code>log = self.logs.setdefault(key, deque())</code>",
     "Удаление старых: <code>while log and log[0] <= now - self.window: log.popleft()</code>"
    ],
    "check": {
     "tests": "class _Clock:\n    def __init__(self):\n        self.t = 0.0\n    def __call__(self):\n        return self.t\n_c = _Clock()\n_sl = SlidingLog(limit=2, window=10, clock=_c)\n_c.t = 9\nassert _sl.allow(\"u\") and _sl.allow(\"u\"), \"Первые 2 запроса проходят\"\n_c.t = 11\nassert _sl.allow(\"u\") is False, \"t=11: в последние 10 секунд есть 2 запроса (t=9), 429\"\n_c.t = 19\nassert _sl.allow(\"u\") is True, \"t=19: запросы t=9 вышли из окна\"\nassert _sl.allow(\"v\") is True, \"Каждый key отдельно\"\nassert len(_sl.logs[\"u\"]) == 1, \"Старые времена должны удаляться из deque\""
    }
   }
  ]
 },
 "pyb-11": {
  "pr": [
   {
    "title": "Логическое значение env",
    "prompt": "Переменные окружения всегда строки. Функция <code>env_bool(env, key)</code> должна вернуть <code>True</code>, если значение — <code>\"1\"</code>, <code>\"true\"</code>, <code>\"yes\"</code> или <code>\"on\"</code> (без учёта регистра и без пробелов), в других случаях или если ключа нет — <code>False</code>. <code>env_bool({\"DEBUG\": \"False\"}, \"DEBUG\")</code> → <code>False</code>.",
    "hints": [
     "<code>bool(\"False\")</code> — это <code>True</code>, поэтому нужно сравнивать строку.",
     "<code>env.get(key, \"\").strip().lower() in {...}</code>"
    ],
    "check": {
     "tests": "assert env_bool({\"DEBUG\": \"False\"}, \"DEBUG\") is False, \"Строка 'False' должна дать False\"\nassert env_bool({\"DEBUG\": \" TRUE \"}, \"DEBUG\") is True, \"' TRUE ' → True\"\nassert env_bool({\"USE_CACHE\": \"1\"}, \"USE_CACHE\") is True and env_bool({\"X\": \"on\"}, \"X\") is True, \"'1', 'on' → True\"\nassert env_bool({}, \"DEBUG\") is False, \"Ключа нет: False\""
    }
   },
   {
    "title": "Количество workers",
    "prompt": "Базовое правило для Gunicorn: <code>2 × ядра + 1</code>. Функция <code>workers(cores, max_workers=17)</code> должна вернуть количество workers, но не больше <code>max_workers</code>. Если ядер меньше 1, выбросить <code>ValueError</code>.",
    "hints": [
     "<code>min(2 * cores + 1, max_workers)</code>",
     "Сначала проверьте <code>cores < 1</code>."
    ],
    "check": {
     "tests": "assert workers(2) == 5, \"2 ядра: 5 workers\"\nassert workers(4) == 9, \"4 ядра: 9 workers\"\nassert workers(16) == 17 and workers(4, max_workers=6) == 6, \"Не больше max_workers\"\n_ok = False\ntry:\n    workers(0)\nexcept ValueError:\n    _ok = True\nassert _ok, \"0 ядер: ValueError\""
    }
   },
   {
    "title": "Соответствие портов",
    "prompt": "В docker-compose запись <code>ports: [\"8000:80\"]</code> означает «порт хоста : порт контейнера». Функция <code>parse_port(mapping)</code> должна вернуть кортеж целых чисел <code>(host, container)</code>. Если формат неверный (нет двоеточия, не число, порт вне диапазона 1–65535) — <code>ValueError</code>.",
    "hints": [
     "<code>parts = mapping.split(\":\")</code>, обе части должны проходить <code>isdigit()</code>.",
     "Диапазон портов: <code>1 <= p <= 65535</code>."
    ],
    "check": {
     "tests": "assert parse_port(\"8000:80\") == (8000, 80), \"parse_port('8000:80') должен быть (8000, 80)\"\nassert parse_port(\"5432:5432\") == (5432, 5432), \"Одинаковые порты\"\nfor _bad in (\"8000\", \"abc:80\", \"8000:70000\", \"0:80\", \"1:2:3\"):\n    _ok = False\n    try:\n        parse_port(_bad)\n    except ValueError:\n        _ok = True\n    assert _ok, f\"parse_port({_bad!r}) должен выбросить ValueError\""
    }
   },
   {
    "title": "Обязательные переменные",
    "prompt": "Приложение проверяет настройки перед запуском. Функция <code>missing_vars(env, required)</code> возвращает названия переменных из списка <code>required</code>, которых нет в env или чьё значение пусто (состоит только из пробелов), в заданном порядке. Функция <code>startup_check(env, required)</code>: если ничего не отсутствует — <code>\"ok\"</code>, иначе выбрасывает <code>RuntimeError(\"Жетіспейді: A, B\")</code>.",
    "hints": [
     "Проверяйте и пустое значение: <code>not env.get(k, \"\").strip()</code>.",
     "<code>raise RuntimeError(\"Жетіспейді: \" + \", \".join(missing))</code>"
    ],
    "check": {
     "tests": "_env = {\"DATABASE_URL\": \"postgres://db/kofe\", \"SECRET_KEY\": \"  \", \"DEBUG\": \"false\"}\n_req = [\"DATABASE_URL\", \"SECRET_KEY\", \"REDIS_URL\"]\nassert missing_vars(_env, _req) == [\"SECRET_KEY\", \"REDIS_URL\"], \"Пустые и отсутствующие переменные: ['SECRET_KEY', 'REDIS_URL']\"\nassert startup_check(_env, [\"DATABASE_URL\"]) == \"ok\", \"Всё есть: 'ok'\"\n_msg = None\ntry:\n    startup_check(_env, _req)\nexcept RuntimeError as _e:\n    _msg = str(_e)\nassert _msg == \"Жетіспейді: SECRET_KEY, REDIS_URL\", \"Сообщение RuntimeError: 'Жетіспейді: SECRET_KEY, REDIS_URL'\""
    }
   },
   {
    "title": "Команда Gunicorn",
    "prompt": "Соберём команду для <code>CMD</code> в Dockerfile в виде списка. Функция <code>gunicorn_cmd(app, workers=4, port=8000, host=\"0.0.0.0\")</code> должна вернуть <code>[\"gunicorn\", \"--workers\", \"4\", \"--bind\", \"0.0.0.0:8000\", \"app:app\"]</code> (все элементы — строки). Если <code>app</code> не в формате <code>\"модуль:объект\"</code>, выбросить <code>ValueError</code>.",
    "hints": [
     "Превратите числа в строки: <code>str(workers)</code>, <code>f\"{host}:{port}\"</code>.",
     "Проверка: все три части, полученные из <code>app.partition(\":\")</code>, не должны быть пустыми."
    ],
    "check": {
     "tests": "assert gunicorn_cmd(\"app:app\") == [\"gunicorn\", \"--workers\", \"4\", \"--bind\", \"0.0.0.0:8000\", \"app:app\"], \"Команда по умолчанию неверна\"\nassert gunicorn_cmd(\"kofe.wsgi:application\", workers=9, port=5000) == [\"gunicorn\", \"--workers\", \"9\", \"--bind\", \"0.0.0.0:5000\", \"kofe.wsgi:application\"], \"workers=9, port=5000\"\nfor _bad in (\"app\", \":app\", \"app:\"):\n    _ok = False\n    try:\n        gunicorn_cmd(_bad)\n    except ValueError:\n        _ok = True\n    assert _ok, f\"gunicorn_cmd({_bad!r}) должен выбрасывать ValueError\""
    }
   },
   {
    "title": "Разбор DATABASE_URL",
    "prompt": "Функция <code>parse_db_url(url)</code> разбирает адрес вида <code>postgres://kofe:pw@db:5432/kofe</code> через regex с именованными группами и возвращает словарь: <code>scheme</code>, <code>user</code>, <code>password</code>, <code>host</code>, <code>port</code> (int; если не указан — <code>5432</code>), <code>name</code>. Если адрес не подходит — <code>ValueError</code>.",
    "hints": [
     "Порт необязателен: <code>(?::(?P&lt;port&gt;\\d+))?</code>.",
     "<code>m.groupdict()</code>; если порта нет, будет <code>None</code>."
    ],
    "check": {
     "tests": "assert parse_db_url(\"postgres://kofe:pw@db:5432/kofe\") == {\"scheme\": \"postgres\", \"user\": \"kofe\", \"password\": \"pw\", \"host\": \"db\", \"port\": 5432, \"name\": \"kofe\"}, \"Результат parse_db_url(...) неверен\"\nassert parse_db_url(\"postgres://admin:s3cret@10.0.0.5/shop\")[\"port\"] == 5432, \"Порта нет: 5432\"\nassert parse_db_url(\"mysql://root:x@localhost:3306/app\")[\"port\"] == 3306, \"Порт int: 3306\"\n_ok = False\ntry:\n    parse_db_url(\"db:5432/kofe\")\nexcept ValueError:\n    _ok = True\nassert _ok, \"Неверный формат: ValueError\""
    }
   },
   {
    "title": "Слои настроек",
    "prompt": "Функция <code>load_config(defaults, env_text, overrides)</code> собирает настройки из трёх слоёв: <code>defaults</code> → текст <code>.env</code> → <code>overrides</code> (последний имеет приоритет). В <code>.env</code> пустые строки и строки с <code>#</code> пропускаются, делим по первому <code>=</code>, ключ и значение обрезаем через <code>strip</code>. Значения в файле — строки: если значение в <code>defaults</code> — <code>int</code>, его нужно превратить в <code>int</code>; если <code>bool</code>, то <code>\"true\"/\"1\"</code> → <code>True</code>, остальное → <code>False</code>. Ключи, которых нет в <code>defaults</code>, остаются строками.",
    "hints": [
     "Для преобразования типа сначала проверяйте <code>bool</code> (ведь <code>bool</code> — потомок <code>int</code>).",
     "Порядок: <code>dict(defaults)</code> → строки .env → <code>config.update(overrides)</code>."
    ],
    "check": {
     "tests": "_defaults = {\"PORT\": 8000, \"DEBUG\": False, \"WORKERS\": 4, \"CITY\": \"Алматы\"}\n_env = \"\"\"\n# production\nPORT=9000\nDEBUG = true\nSENTRY_DSN=https://key@sentry.io/1\nWORKERS=4\n\"\"\"\n_cfg = load_config(_defaults, _env, {\"WORKERS\": 9})\nassert _cfg[\"PORT\"] == 9000 and isinstance(_cfg[\"PORT\"], int), \"PORT из .env приходит и превращается в int\"\nassert _cfg[\"DEBUG\"] is True, \"DEBUG='true' → True\"\nassert _cfg[\"WORKERS\"] == 9, \"overrides самый приоритетный\"\nassert _cfg[\"CITY\"] == \"Алматы\", \"Ключ, которого нет в .env, берётся из defaults\"\nassert _cfg[\"SENTRY_DSN\"] == \"https://key@sentry.io/1\", \"Ключ, которого нет в defaults, остаётся строкой\"\nassert load_config({\"DEBUG\": True}, \"DEBUG=no\", {})[\"DEBUG\"] is False, \"DEBUG='no' → False\"\nassert _defaults[\"PORT\"] == 8000, \"defaults не должен меняться\""
    }
   },
   {
    "title": "Цепочка CI",
    "prompt": "CI/CD: если тесты падают, деплоя не будет. Функция <code>run_pipeline(steps)</code> должна выполнять шаги <code>(название, функция)</code> по порядку. Если функция возвращает <code>False</code> или выбрасывает исключение, шаг считается неудачным: цепочка останавливается на нём. Результат: <code>{\"status\": \"success\" или \"failed\", \"ran\": [названия выполненных шагов], \"failed\": название неудачного шага или None}</code>.",
    "hints": [
     "Вызывайте каждый шаг внутри <code>try/except Exception</code>.",
     "При неудачном шаге сразу <code>return {\"status\": \"failed\", ...}</code> — следующие шаги не выполняются."
    ],
    "check": {
     "tests": "_log = []\ndef _lint():\n    _log.append(\"lint\"); return True\ndef _tests():\n    _log.append(\"tests\"); raise AssertionError(\"test_order_qty құлады\")\ndef _deploy():\n    _log.append(\"deploy\"); return True\nassert run_pipeline([(\"lint\", _lint), (\"tests\", _tests), (\"deploy\", _deploy)]) == {\"status\": \"failed\", \"ran\": [\"lint\", \"tests\"], \"failed\": \"tests\"}, \"Если тесты падают, цепочка останавливается\"\nassert \"deploy\" not in _log, \"Если тесты падают, deploy не должен выполняться\"\nassert run_pipeline([(\"lint\", _lint), (\"build\", lambda: False)])[\"failed\"] == \"build\", \"Шаг, вернувший False, тоже считается неудачным\"\nassert run_pipeline([(\"lint\", _lint), (\"deploy\", _deploy)]) == {\"status\": \"success\", \"ran\": [\"lint\", \"deploy\"], \"failed\": None}, \"Если всё прошло: success\""
    }
   }
  ]
 },
 "pyb-12": {
  "pr": [
   {
    "title": "Проверка схемы URL",
    "prompt": "Сокращатель принимает только ссылки <code>http</code> и <code>https</code> (не <code>javascript:</code> и не <code>ftp://</code>). Функция <code>is_http_url(url)</code> должна вернуть <code>True</code>, если адрес начинается с <code>http://</code> или <code>https://</code> и после этого идёт непустой текст без пробелов.",
    "hints": [
     "Проверьте два префикса: <code>url.startswith(\"https://\")</code>.",
     "Часть после префикса не должна быть пустой и не должна содержать пробелов."
    ],
    "check": {
     "tests": "assert is_http_url(\"https://kaspi.kz/shop\") is True, \"Ссылка https корректна\"\nassert is_http_url(\"http://egov.kz\") is True, \"Ссылка http корректна\"\nassert is_http_url(\"ftp://files.kz\") is False, \"ftp не разрешён\"\nassert is_http_url(\"javascript:alert(1)\") is False, \"javascript: не разрешён\"\nassert is_http_url(\"https://\") is False and is_http_url(\"https://a b.kz\") is False, \"Пустой адрес или адрес с пробелами: False\""
    }
   },
   {
    "title": "Короткая ссылка",
    "prompt": "Функция <code>short_url(base, code)</code> должна собрать короткую ссылку: в <code>base</code> может быть <code>/</code> в конце или не быть, но в результате должен быть ровно один <code>/</code>. <code>short_url(\"https://tq.kz/\", \"q0U\")</code> → <code>\"https://tq.kz/q0U\"</code>.",
    "hints": [
     "<code>base.rstrip(\"/\")</code> убирает завершающий слеш.",
     "<code>base.rstrip(\"/\") + \"/\" + code</code>"
    ],
    "check": {
     "tests": "assert short_url(\"https://tq.kz/\", \"q0U\") == \"https://tq.kz/q0U\", \"short_url('https://tq.kz/', 'q0U') должен быть 'https://tq.kz/q0U'\"\nassert short_url(\"https://tq.kz\", \"nauryz\") == \"https://tq.kz/nauryz\", \"Работает и без / в конце base\""
    }
   },
   {
    "title": "Рейтинг кликов",
    "prompt": "<code>links</code> — словарь код → <code>{\"url\": ..., \"clicks\": n}</code>. Функция <code>top_links(links, n)</code> должна вернуть список <code>n</code> кодов с наибольшим числом кликов: по убыванию кликов, а при равенстве — по алфавиту кода.",
    "hints": [
     "Если отсортировать словарь, сортируются его ключи: <code>sorted(links, key=...)</code>.",
     "Ключ: <code>lambda c: (-links[c][\"clicks\"], c)</code>"
    ],
    "check": {
     "tests": "_l = {\"q0U\": {\"url\": \"https://a.kz\", \"clicks\": 5}, \"nauryz\": {\"url\": \"https://b.kz\", \"clicks\": 12}, \"abc\": {\"url\": \"https://c.kz\", \"clicks\": 5}, \"zz\": {\"url\": \"https://d.kz\", \"clicks\": 0}}\nassert top_links(_l, 3) == [\"nauryz\", \"abc\", \"q0U\"], \"top_links(_l, 3) должен быть ['nauryz', 'abc', 'q0U']\"\nassert top_links(_l, 1) == [\"nauryz\"], \"top_links(_l, 1) должен быть ['nauryz']\"\nassert top_links({}, 5) == [], \"Ссылок нет: []\""
    }
   },
   {
    "title": "Кодирование в любой системе",
    "prompt": "Обобщим идею Base62. Функция <code>encode_base(n, alphabet)</code> должна перевести неотрицательное число в систему счисления с алфавитом <code>alphabet</code> (основание = <code>len(alphabet)</code>), а функция <code>decode_base(s, alphabet)</code> — обратно. <code>encode_base(255, \"0123456789abcdef\")</code> → <code>\"ff\"</code>; <code>encode_base(0, ...)</code> → первый символ алфавита.",
    "hints": [
     "<code>divmod(n, base)</code> даёт последнюю «цифру»; соберите результат в обратном порядке.",
     "Схема Горнера: <code>n = n * base + alphabet.index(ch)</code>"
    ],
    "check": {
     "tests": "_hex = \"0123456789abcdef\"\nassert encode_base(255, _hex) == \"ff\" and decode_base(\"ff\", _hex) == 255, \"255 ↔ 'ff'\"\nassert encode_base(5, \"01\") == \"101\", \"Двоичная система: 5 → '101'\"\nassert encode_base(0, _hex) == \"0\", \"0 → первый символ алфавита\"\n_b36 = \"0123456789abcdefghijklmnopqrstuvwxyz\"\nassert encode_base(100000, _b36) == \"255s\", \"Base36: 100000 → '255s'\"\nassert all(decode_base(encode_base(_n, _b36), _b36) == _n for _n in (1, 35, 36, 99999, 10**9)), \"decode(encode(n)) должен равняться n\""
    }
   },
   {
    "title": "Проверка alias",
    "prompt": "Функция <code>check_alias(alias, taken)</code> проверяет alias, который выбрал пользователь, и возвращает текст ошибки или <code>None</code> (порядок проверок важен): если не подходит под шаблон <code>[A-Za-z0-9_-]{3,20}</code> (<code>fullmatch</code>) — <code>\"alias форматы қате\"</code>; если это зарезервированное слово (<code>RESERVED</code>, без учёта регистра) — <code>\"alias резервте\"</code>; если есть в множестве <code>taken</code> — <code>\"alias бос емес\"</code>.",
    "hints": [
     "<code>ALIAS_RE = re.compile(r\"[A-Za-z0-9_-]{3,20}\")</code>, затем <code>fullmatch</code>.",
     "Резерв: <code>alias.lower() in RESERVED</code>"
    ],
    "check": {
     "tests": "_taken = {\"nauryz\", \"q0U\"}\nassert check_alias(\"kofe-2026\", _taken) is None, \"Правильный alias: None\"\nassert check_alias(\"ab\", _taken) == \"alias форматы қате\", \"2 символа: неверный формат\"\nassert check_alias(\"наурыз\", _taken) == \"alias форматы қате\", \"Кириллица: неверный формат\"\nassert check_alias(\"Health\", _taken) == \"alias резервте\", \"Зарезервированное слово (без учёта регистра)\"\nassert check_alias(\"nauryz\", _taken) == \"alias бос емес\", \"Непустой alias\""
    }
   },
   {
    "title": "Следующий свободный код",
    "prompt": "Автоматический код <code>encode(next_id)</code> может совпасть с alias пользователя. Функция <code>next_code(next_id, taken)</code> начинает с <code>encode(next_id)</code>, пропускает занятые коды и возвращает первый свободный код и следующий id для использования в виде <code>(code, new_next_id)</code>. Функция <code>encode</code> уже готова.",
    "hints": [
     "<code>while code in taken:</code> увеличивайте id и пересчитывайте код.",
     "В конце <code>(code, next_id + 1)</code>."
    ],
    "check": {
     "tests": "assert encode(100000) == \"q0U\", \"encode не должен меняться\"\nassert next_code(100000, set()) == (\"q0U\", 100001), \"Если свободен: ('q0U', 100001)\"\nassert next_code(100000, {\"q0U\", \"q0V\"}) == (\"q0W\", 100003), \"Занятые коды пропускаются: ('q0W', 100003)\"\nassert next_code(61, {\"Z\"}) == (\"10\", 63), \"61 → 'Z' занят, 62 → '10'\""
    }
   },
   {
    "title": "Статистика кликов по дням",
    "prompt": "Класс <code>ClickLog</code> считает клики по дням для каждого кода. Метод <code>record(code, day)</code> — <code>day</code> это строка вида <code>\"2026-03-22\"</code>. Метод <code>stats(code)</code>: если кликов нет — <code>(404, {\"error\": \"not found\"})</code>; если есть — <code>(200, {\"code\": ..., \"total\": N, \"by_day\": {день: n}, \"best_day\": ...})</code>, ключи <code>by_day</code> идут по порядку дат, <code>best_day</code> — день с наибольшим числом кликов (при равенстве — более ранний).",
    "hints": [
     "<code>defaultdict(Counter)</code>: код → (день → число кликов).",
     "При равенстве берётся более ранний день: <code>max(sorted(counter), key=lambda d: counter[d])</code> — <code>max</code> возвращает первый из наибольших."
    ],
    "check": {
     "tests": "_log = ClickLog()\nfor _d in [\"2026-03-22\", \"2026-03-21\", \"2026-03-22\", \"2026-03-23\", \"2026-03-21\"]:\n    _log.record(\"nauryz\", _d)\n_s, _b = _log.stats(\"nauryz\")\nassert _s == 200 and _b[\"total\"] == 5, \"total = 5\"\nassert _b[\"by_day\"] == {\"2026-03-21\": 2, \"2026-03-22\": 2, \"2026-03-23\": 1}, \"Подсчёт по дням\"\nassert list(_b[\"by_day\"]) == [\"2026-03-21\", \"2026-03-22\", \"2026-03-23\"], \"Ключи by_day идут по порядку дат\"\nassert _b[\"best_day\"] == \"2026-03-21\" and _b[\"code\"] == \"nauryz\", \"best_day: при равенстве более ранний день\"\nassert _log.stats(\"q0U\") == (404, {\"error\": \"not found\"}), \"Кликов нет: 404\""
    }
   },
   {
    "title": "Ссылка с истечением срока",
    "prompt": "Ссылка по акции должна работать только до определённого времени. Напишите <code>ExpiringShortener</code> (метод <code>encode</code> уже готов): <code>create(url, ttl, now)</code> — код <code>encode(self.next_id)</code> (id начинается со 100000 и растёт), сохраняет ссылку как <code>{\"url\", \"expires\": now + ttl, \"clicks\": 0}</code> и возвращает <code>(201, {\"code\": code, \"url\": url})</code>; если URL не начинается с <code>http(s)://</code>, возвращает <code>(422, {\"errors\": {\"url\": \"http(s) URL керек\"}})</code>. Метод <code>resolve(code, now)</code>: нет такого кода → <code>(404, {\"error\": \"not found\"})</code>; <code>now &gt;= expires</code> → <code>(410, {\"error\": \"expired\"})</code>; иначе клик +1 и <code>(302, {\"location\": url})</code>.",
    "hints": [
     "Проверка URL: <code>re.fullmatch(r\"https?://\\S+\", url)</code>.",
     "Порядок проверок в resolve: нет кода (404) → срок (410) → клик и 302."
    ],
    "check": {
     "tests": "_s = ExpiringShortener()\nassert _s.create(\"https://kaspi.kz/sale\", ttl=3600, now=1000) == (201, {\"code\": \"q0U\", \"url\": \"https://kaspi.kz/sale\"}), \"Первый код q0U\"\nassert _s.create(\"https://halyk.kz\", ttl=10, now=1000)[1][\"code\"] == \"q0V\", \"Следующий id: q0V\"\nassert _s.create(\"ftp://files.kz\", ttl=10, now=0) == (422, {\"errors\": {\"url\": \"http(s) URL керек\"}}), \"ftp: 422\"\nassert _s.resolve(\"q0U\", now=2000) == (302, {\"location\": \"https://kaspi.kz/sale\"}), \"Срок не истёк: 302\"\nassert _s.links[\"q0U\"][\"clicks\"] == 1, \"Клик должен засчитываться\"\nassert _s.resolve(\"q0V\", now=1010) == (410, {\"error\": \"expired\"}), \"now >= expires: 410\"\nassert _s.links[\"q0V\"][\"clicks\"] == 0, \"После истечения срока клик не засчитывается\"\nassert _s.resolve(\"zzz\", now=0) == (404, {\"error\": \"not found\"}), \"Нет кода: 404\""
    }
   }
  ]
 }
} });
