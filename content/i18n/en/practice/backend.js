// backend practice tasks: English text. Code, solutions and checks are in content/practice/backend.js.
DJ.i18n.patch({ lessons: {
 "pyb-1": {
  "pr": [
   {
    "title": "Parsing a query string",
    "prompt": "The function <code>parse_query(qs)</code> must turn a query string like <code>\"city=Алматы&page=2\"</code> into a dictionary: <code>{\"city\": \"Алматы\", \"page\": \"2\"}</code> (the values stay as strings). If an empty string is given, return <code>{}</code>.",
    "hints": [
     "Split the pairs with <code>qs.split(\"&\")</code>.",
     "Each pair: <code>key, _, value = pair.partition(\"=\")</code>"
    ],
    "check": {
     "tests": "assert parse_query(\"city=Алматы&page=2\") == {\"city\": \"Алматы\", \"page\": \"2\"}, \"parse_query('city=Алматы&page=2') must return {'city': 'Алматы', 'page': '2'}\"\nassert parse_query(\"\") == {}, \"Empty query: {}\"\nassert parse_query(\"q=домбыра\") == {\"q\": \"домбыра\"}, \"One parameter: {'q': 'домбыра'}\"\nassert parse_query(\"sort=-price&limit=20&city=Тараз\")[\"limit\"] == \"20\", \"Values stay as strings: '20'\""
    }
   },
   {
    "title": "Splitting a request line",
    "prompt": "The first line of an HTTP request (the request line) has three parts. The function <code>parse_request_line(line)</code> must return a tuple <code>(method, path, version)</code>. <code>parse_request_line(\"GET /cafes HTTP/1.1\")</code> → <code>(\"GET\", \"/cafes\", \"HTTP/1.1\")</code>.",
    "hints": [
     "The parts are separated by a space: <code>line.split(\" \")</code>.",
     "Unpack into three variables and return a tuple."
    ],
    "check": {
     "tests": "assert parse_request_line(\"GET /cafes HTTP/1.1\") == (\"GET\", \"/cafes\", \"HTTP/1.1\"), \"parse_request_line('GET /cafes HTTP/1.1') must return ('GET', '/cafes', 'HTTP/1.1')\"\nassert parse_request_line(\"DELETE /orders/15 HTTP/2\") == (\"DELETE\", \"/orders/15\", \"HTTP/2\"), \"DELETE /orders/15 HTTP/2 must be split correctly\""
    }
   },
   {
    "title": "Body size in bytes",
    "prompt": "The <code>Content-Length</code> header gives the number of <b>bytes</b> in the body, not the number of characters. The function <code>content_length(body)</code> must return the number of bytes of the string in UTF-8 encoding. <code>content_length(\"Алматы\")</code> → <code>12</code>.",
    "hints": [
     "Turn the string into bytes: <code>body.encode(\"utf-8\")</code>.",
     "A Cyrillic letter takes 2 bytes in UTF-8."
    ],
    "check": {
     "tests": "assert content_length(\"Алматы\") == 12, \"content_length('Алматы') must be 12 (each letter is 2 bytes)\"\nassert content_length(\"latte\") == 5, \"Latin letters take 1 byte each: 5\"\nassert content_length('{\"city\": \"Тараз\"}') == 22, \"JSON body: 22 bytes\"\nassert content_length(\"\") == 0, \"Empty body: 0\""
    }
   },
   {
    "title": "Getting a header value",
    "prompt": "The function <code>get_header(raw, name)</code> must return the value of the header <code>name</code> from the text of a full HTTP request (<code>raw</code>, lines separated by <code>\\r\\n</code>). The name is case-insensitive, the value is trimmed with <code>strip</code>, and a colon inside the value is kept (<code>split(\":\", 1)</code>). If there is no such header, return <code>None</code>.",
    "hints": [
     "First take the headers part: <code>raw.split(\"\\r\\n\\r\\n\", 1)[0]</code>, then skip the first line.",
     "Comparison: <code>key.strip().lower() == name.lower()</code>"
    ],
    "check": {
     "tests": "_raw = \"GET /menu HTTP/1.1\\r\\nHost: api.kofe.kz:8080\\r\\nAccept:  application/json \\r\\nUser-Agent: KofeApp/3.1\\r\\n\\r\\n\"\nassert get_header(_raw, \"host\") == \"api.kofe.kz:8080\", \"The port in the Host value must be kept: 'api.kofe.kz:8080'\"\nassert get_header(_raw, \"ACCEPT\") == \"application/json\", \"The name is case-insensitive, the value is stripped\"\nassert get_header(_raw, \"Cookie\") is None, \"If there is no header, None\""
    }
   },
   {
    "title": "Building a request text",
    "prompt": "The function <code>build_request(method, path, headers, body=\"\")</code> must build the text of an HTTP request: the first line is <code>\"&lt;method&gt; &lt;path&gt; HTTP/1.1\"</code>, then each header as <code>\"Name: value\"</code> (in dictionary order), all lines are separated by <code>\\r\\n</code>, after the headers there is an empty line (<code>\\r\\n\\r\\n</code>), and at the end the body.",
    "hints": [
     "Collect the list of lines and do <code>\"\\r\\n\".join(lines)</code>.",
     "Add <code>\"\\r\\n\\r\\n\" + body</code> at the end."
    ],
    "check": {
     "tests": "_r = build_request(\"GET\", \"/cafes?city=Алматы\", {\"Host\": \"api.kofe.kz\", \"Accept\": \"application/json\"})\nassert _r == \"GET /cafes?city=Алматы HTTP/1.1\\r\\nHost: api.kofe.kz\\r\\nAccept: application/json\\r\\n\\r\\n\", \"The text of the GET request is wrong\"\n_p = build_request(\"POST\", \"/orders\", {\"Content-Type\": \"application/json\"}, '{\"qty\": 2}')\nassert _p.endswith('\\r\\n\\r\\n{\"qty\": 2}'), \"The body must come after the empty line\"\nassert _p.split(\"\\r\\n\")[0] == \"POST /orders HTTP/1.1\", \"First line: 'POST /orders HTTP/1.1'\""
    }
   },
   {
    "title": "Reading a response status",
    "prompt": "The first line of an HTTP response is <code>\"HTTP/1.1 404 Not Found\"</code>. The function <code>parse_status_line(line)</code> must return a tuple <code>(code, reason)</code>: <code>code</code> is an <code>int</code>, <code>reason</code> is the rest of the text (it may contain spaces). <code>parse_status_line(\"HTTP/1.1 500 Internal Server Error\")</code> → <code>(500, \"Internal Server Error\")</code>.",
    "hints": [
     "Split only at the first two spaces: <code>line.split(\" \", 2)</code>.",
     "Convert the code with <code>int(code)</code>."
    ],
    "check": {
     "tests": "assert parse_status_line(\"HTTP/1.1 404 Not Found\") == (404, \"Not Found\"), \"parse_status_line('HTTP/1.1 404 Not Found') must return (404, 'Not Found')\"\nassert parse_status_line(\"HTTP/1.1 500 Internal Server Error\") == (500, \"Internal Server Error\"), \"Spaces inside the reason must be kept\"\nassert parse_status_line(\"HTTP/2 201 Created\")[0] == 201, \"code must be an int: 201\""
    }
   },
   {
    "title": "Full response parsing",
    "prompt": "The function <code>parse_response(raw)</code> must parse the text of an HTTP response and return a dictionary: <code>status</code> (int), <code>reason</code>, <code>headers</code> (names in lower case, values trimmed with <code>strip</code>), <code>json</code> — the body read as JSON (<code>json.loads</code>); if the body is empty, <code>None</code>.",
    "hints": [
     "<code>head, _, body = raw.partition(\"\\r\\n\\r\\n\")</code>",
     "First line: <code>split(\" \", 2)</code>; header lines: <code>split(\":\", 1)</code>."
    ],
    "check": {
     "tests": "_raw = 'HTTP/1.1 201 Created\\r\\nContent-Type: application/json\\r\\nLocation: /v1/orders/1051\\r\\n\\r\\n{\"id\": 1051, \"status\": \"new\"}'\n_r = parse_response(_raw)\nassert _r[\"status\"] == 201 and _r[\"reason\"] == \"Created\", \"status 201, reason 'Created'\"\nassert _r[\"headers\"] == {\"content-type\": \"application/json\", \"location\": \"/v1/orders/1051\"}, \"headers: names in lower case\"\nassert _r[\"json\"] == {\"id\": 1051, \"status\": \"new\"}, \"json: the JSON value of the body\"\n_e = parse_response(\"HTTP/1.1 204 No Content\\r\\nServer: kofe\\r\\n\\r\\n\")\nassert _e[\"status\"] == 204 and _e[\"reason\"] == \"No Content\" and _e[\"json\"] is None, \"If the body is empty, json = None\""
    }
   },
   {
    "title": "Parsing cookies",
    "prompt": "The session ID comes in the <code>Cookie</code> header: <code>Cookie: sid=abc123; lang=kk</code>. The function <code>parse_cookies(raw)</code> must collect the cookies from the request text into a dictionary: <code>{\"sid\": \"abc123\", \"lang\": \"kk\"}</code>. The header name is case-insensitive, the pairs are separated by <code>;</code>, and extra spaces are removed. If there are no cookies, return <code>{}</code>.",
    "hints": [
     "First find the <code>cookie</code> header (compare the name with <code>.lower()</code>).",
     "Split the value with <code>split(\";\")</code> and split each pair with <code>partition(\"=\")</code>."
    ],
    "check": {
     "tests": "_raw = \"GET /profile HTTP/1.1\\r\\nHost: kofe.kz\\r\\ncookie:  sid=abc123; lang=kk ;theme=dark\\r\\n\\r\\n\"\nassert parse_cookies(_raw) == {\"sid\": \"abc123\", \"lang\": \"kk\", \"theme\": \"dark\"}, \"parse_cookies(...) must return {'sid': 'abc123', 'lang': 'kk', 'theme': 'dark'}\"\nassert parse_cookies(\"GET / HTTP/1.1\\r\\nHost: kofe.kz\\r\\n\\r\\n\") == {}, \"If there are no cookies, {}\"\nassert parse_cookies(\"GET / HTTP/1.1\\r\\nCookie: token=a=b\\r\\n\\r\\n\") == {\"token\": \"a=b\"}, \"An = sign inside a value must be kept (split at the first =)\""
    }
   }
  ]
 },
 "pyb-2": {
  "pr": [
   {
    "title": "Missing key error",
    "prompt": "The function <code>order_total(items)</code> at the checkout gives <code>KeyError: 'qty'</code>: some item has no <code>qty</code> key. Fix it: if <code>qty</code> is missing, count it as 1 (<code>.get(\"qty\", 1)</code>).",
    "hints": [
     "The last line of the traceback: <code>KeyError: 'qty'</code>.",
     "<code>item.get(\"qty\", 1)</code> returns 1 if the key is missing."
    ],
    "check": {
     "tests": "assert order_total([{\"price\": 1200, \"qty\": 2}, {\"price\": 800}]) == 3200, \"An item without qty counts as 1 piece: 2400 + 800\"\nassert order_total([]) == 0, \"Empty cart: 0\"\nassert order_total([{\"price\": 450, \"qty\": 3}]) == 1350, \"450 * 3 = 1350\""
    }
   },
   {
    "title": "Write a docstring",
    "prompt": "Write the function <code>add_vat(price)</code> according to PEP 8, with a docstring: it must add 12% VAT to the price and return a whole number of tenge using <code>round(...)</code>. The docstring must contain the word <code>ҚҚС</code>.",
    "hints": [
     "A docstring is a triple-quoted string on the first line of the function.",
     "<code>\"\"\"Бағаға 12% ҚҚС қосып, бүтін теңге қайтарады.\"\"\"</code>"
    ],
    "check": {
     "tests": "assert add_vat.__doc__ and \"ҚҚС\" in add_vat.__doc__, \"A docstring is needed, and it must contain the word 'ҚҚС'\"\nassert add_vat(1000) == 1120, \"add_vat(1000) must be 1120\"\nassert add_vat(2500) == 2800, \"add_vat(2500) must be 2800\""
    }
   },
   {
    "title": "Fix the type error",
    "prompt": "The function <code>receipt_line(name, qty, price)</code> must return a receipt line like <code>\"Латте x 2 = 2400 ₸\"</code>, but it raises <code>TypeError</code> (a string and a number cannot be joined with <code>+</code>). Fix it with an f-string.",
    "hints": [
     "The error type: <code>TypeError: can only concatenate str (not \"int\") to str</code>.",
     "<code>f\"{name} x {qty} = {qty * price} ₸\"</code>"
    ],
    "check": {
     "tests": "assert receipt_line(\"Латте\", 2, 1200) == \"Латте x 2 = 2400 ₸\", \"receipt_line('Латте', 2, 1200) must return 'Латте x 2 = 2400 ₸'\"\nassert receipt_line(\"Самса\", 3, 350) == \"Самса x 3 = 1050 ₸\", \"receipt_line('Самса', 3, 350) must return 'Самса x 3 = 1050 ₸'\""
    }
   },
   {
    "title": "Last orders",
    "prompt": "The function <code>last_orders(orders, n)</code> must return the last <code>n</code> orders, but it returns one element too many, and with <code>n = 0</code> it returns the whole list. Fix it: if <code>n</code> is greater than the length of the list, return all the orders.",
    "hints": [
     "The start index must be <code>len(orders) - n</code>, and yours is 1 too big: <code>- 1</code>.",
     "<code>max(0, ...)</code> protects against a negative index; <code>orders[len(orders):]</code> gives an empty list."
    ],
    "check": {
     "tests": "_o = [101, 102, 103, 104, 105]\nassert last_orders(_o, 2) == [104, 105], \"last_orders(_o, 2) must return [104, 105]\"\nassert last_orders(_o, 0) == [], \"If n = 0, an empty list\"\nassert last_orders(_o, 10) == _o, \"If n is big, the whole list\"\nassert last_orders([], 3) == [], \"Empty list: []\""
    }
   },
   {
    "title": "Fix the None error",
    "prompt": "The function <code>find_user(users, login)</code> finds a user or returns <code>None</code>. The function <code>user_city(users, login)</code> raises <code>TypeError: 'NoneType' object is not subscriptable</code> for a user who does not exist. Fix it: if the user does not exist, return <code>\"белгісіз\"</code>.",
    "hints": [
     "Store the result in a variable and check <code>if user is None:</code>.",
     "The error is not in <code>find_user</code>: it correctly returns <code>None</code>."
    ],
    "check": {
     "tests": "_us = [{\"login\": \"dana\", \"city\": \"Алматы\"}, {\"login\": \"erlan\", \"city\": \"Атырау\"}]\nassert user_city(_us, \"erlan\") == \"Атырау\", \"user_city(_us, 'erlan') must return 'Атырау'\"\nassert user_city(_us, \"tim\") == \"белгісіз\", \"A user who does not exist: 'белгісіз'\"\nassert user_city([], \"dana\") == \"белгісіз\", \"Empty list: 'белгісіз'\""
    }
   },
   {
    "title": "Names according to PEP 8",
    "prompt": "The code works, but the names do not follow PEP 8. Rename three names: the constant <code>freeLimit</code> → <code>FREE_DELIVERY_LIMIT</code>, the function <code>DeliveryCost</code> → <code>delivery_cost</code>, the class <code>order_service</code> → <code>OrderService</code>. The logic must stay the same.",
    "hints": [
     "A constant is <code>UPPER_CASE</code>, a function is <code>snake_case</code>, a class is <code>CamelCase</code>.",
     "Rename the names everywhere they are used."
    ],
    "check": {
     "tests": "assert \"FREE_DELIVERY_LIMIT\" in dir() and FREE_DELIVERY_LIMIT == 10000, \"The constant FREE_DELIVERY_LIMIT must be 10000\"\nassert \"delivery_cost\" in dir() and \"OrderService\" in dir(), \"The function delivery_cost and the class OrderService are needed\"\nassert \"freeLimit\" not in dir() and \"DeliveryCost\" not in dir() and \"order_service\" not in dir(), \"The old names must not remain\"\nassert delivery_cost(12000) == 0 and delivery_cost(5000) == 990, \"The logic must stay the same\"\nassert OrderService().total_price([{\"price\": 3000}, {\"price\": 2000}]) == 5990, \"5000 + 990 = 5990\""
    }
   },
   {
    "title": "Fix the average rating",
    "prompt": "The function <code>average_rating(reviews)</code> must return the average rating of the reviews. In some reviews <code>\"rating\": None</code> (no rating given) — do not count them. If there are no ratings, return <code>None</code>. Round the result with <code>round(..., 1)</code>. Write a docstring for the function that contains the word <code>rating</code>. The current code has a <code>TypeError</code> and a <code>ZeroDivisionError</code>.",
    "hints": [
     "First collect all the ratings that are not <code>None</code> into a separate list.",
     "Before dividing by an empty list, write <code>return None</code>."
    ],
    "check": {
     "tests": "assert average_rating.__doc__ and \"rating\" in average_rating.__doc__, \"A docstring is needed, and it must contain the word 'rating'\"\n_rv = [{\"user\": \"dana\", \"rating\": 5}, {\"user\": \"ali\", \"rating\": None}, {\"user\": \"sara\", \"rating\": 4}]\nassert average_rating(_rv) == 4.5, \"None is not counted: (5 + 4) / 2 = 4.5\"\nassert average_rating([{\"user\": \"x\", \"rating\": None}]) is None, \"If there are no ratings, None\"\nassert average_rating([]) is None, \"Empty list: None\"\nassert average_rating([{\"rating\": 4}, {\"rating\": 4}, {\"rating\": 5}]) == 4.3, \"(4 + 4 + 5) / 3 = 4.3\""
    }
   },
   {
    "title": "A clear error message",
    "prompt": "The function <code>parse_price(text)</code> must get the price as a whole number from text like <code>\"1 200 ₸\"</code>: spaces and the <code>₸</code> sign are removed. If the remaining text is not digits (or is empty), the function must raise <code>ValueError</code>, and the message must show the original text in quotes: <code>f\"Баға қате: {text!r}\"</code>. Then the cause is clear at once from the traceback.",
    "hints": [
     "<code>text.replace(\" \", \"\").replace(\"₸\", \"\")</code>",
     "Check: <code>if not cleaned.isdigit(): raise ValueError(f\"Баға қате: {text!r}\")</code>"
    ],
    "check": {
     "tests": "assert parse_price(\"1 200 ₸\") == 1200, \"parse_price('1 200 ₸') must return 1200\"\nassert parse_price(\"450\") == 450, \"parse_price('450') must return 450\"\nfor _bad in (\"бір мың\", \"\", \"12,5 ₸\"):\n    _msg = None\n    try:\n        parse_price(_bad)\n    except ValueError as _e:\n        _msg = str(_e)\n    assert _msg == f\"Баға қате: {_bad!r}\", f\"parse_price({_bad!r}) must raise ValueError with the message 'Баға қате: {_bad!r}'\""
    }
   }
  ]
 },
 "pyb-3": {
  "pr": [
   {
    "title": "Resource path",
    "prompt": "The function <code>resource_path(resource, item_id=None, version=1)</code> must build a REST path: <code>resource_path(\"products\")</code> → <code>\"/v1/products\"</code>, <code>resource_path(\"products\", 42)</code> → <code>\"/v1/products/42\"</code>, <code>resource_path(\"orders\", version=2)</code> → <code>\"/v2/orders\"</code>.",
    "hints": [
     "<code>f\"/v{version}/{resource}\"</code>",
     "Add <code>/42</code> at the end only if <code>item_id</code> is given."
    ],
    "check": {
     "tests": "assert resource_path(\"products\") == \"/v1/products\", \"resource_path('products') must be '/v1/products'\"\nassert resource_path(\"products\", 42) == \"/v1/products/42\", \"resource_path('products', 42) must be '/v1/products/42'\"\nassert resource_path(\"orders\", version=2) == \"/v2/orders\", \"resource_path('orders', version=2) must be '/v2/orders'\"\nassert resource_path(\"gift-cards\", 0) == \"/v1/gift-cards/0\", \"id = 0 must be added too\""
    }
   },
   {
    "title": "URL with a verb",
    "prompt": "In REST, URLs do not contain verbs. The function <code>is_restful(path)</code> must return <code>False</code> if any part of the path (separated by <code>/</code>) starts with <code>get</code>, <code>create</code>, <code>update</code> or <code>delete</code> (case-insensitive), otherwise <code>True</code>. <code>is_restful(\"/deleteUser/5\")</code> → <code>False</code>.",
    "hints": [
     "<code>path.strip(\"/\").split(\"/\")</code> gives the parts of the path.",
     "<code>startswith</code> accepts a tuple: <code>part.lower().startswith((\"get\", \"create\", ...))</code>"
    ],
    "check": {
     "tests": "assert is_restful(\"/deleteUser/5\") is False, \"/deleteUser/5 is not REST\"\nassert is_restful(\"/v1/getProducts\") is False, \"/v1/getProducts is not REST\"\nassert is_restful(\"/v1/products/42\") is True, \"/v1/products/42 is a correct REST path\"\nassert is_restful(\"/shops/3/orders\") is True, \"/shops/3/orders is correct\"\nassert is_restful(\"/gift-cards\") is True, \"/gift-cards is correct\""
    }
   },
   {
    "title": "Successful status code",
    "prompt": "The function <code>success_status(method)</code> must return the code of a successful response to a CRUD request: <code>GET</code>, <code>PUT</code>, <code>PATCH</code> → 200, <code>POST</code> → 201, <code>DELETE</code> → 204. For any other method, raise <code>ValueError</code>.",
    "hints": [
     "A dictionary is convenient: <code>{\"GET\": 200, \"POST\": 201, ...}</code>.",
     "For an unknown method: <code>raise ValueError(...)</code>."
    ],
    "check": {
     "tests": "assert success_status(\"POST\") == 201, \"POST → 201 Created\"\nassert success_status(\"DELETE\") == 204, \"DELETE → 204 No Content\"\nassert success_status(\"GET\") == 200 and success_status(\"PATCH\") == 200 and success_status(\"PUT\") == 200, \"GET, PUT, PATCH → 200\"\n_ok = False\ntry:\n    success_status(\"FETCH\")\nexcept ValueError:\n    _ok = True\nassert _ok, \"Unknown method: ValueError\""
    }
   },
   {
    "title": "Sort parameter",
    "prompt": "The list is sorted by the <code>sort</code> parameter from the query string: <code>\"price\"</code> — ascending, <code>\"-price\"</code> — descending. The function <code>apply_sort(items, sort)</code> must return a new sorted list. If <code>sort</code> is <code>None</code>, the list does not change. If a field is given that the objects do not have, raise <code>ValueError</code>.",
    "hints": [
     "Check the minus sign: <code>desc = sort.startswith(\"-\")</code>, the field: <code>sort.lstrip(\"-\")</code>.",
     "<code>sorted(items, key=lambda it: it[field], reverse=desc)</code>"
    ],
    "check": {
     "tests": "_p = [{\"name\": \"Шапан\", \"price\": 45000}, {\"name\": \"Кесе\", \"price\": 1500}, {\"name\": \"Домбыра\", \"price\": 30000}]\nassert [x[\"name\"] for x in apply_sort(_p, \"price\")] == [\"Кесе\", \"Домбыра\", \"Шапан\"], \"sort=price: ascending order\"\nassert [x[\"name\"] for x in apply_sort(_p, \"-price\")] == [\"Шапан\", \"Домбыра\", \"Кесе\"], \"sort=-price: descending order\"\nassert apply_sort(_p, None) == _p, \"If there is no sort, the list does not change\"\nassert _p[0][\"name\"] == \"Шапан\", \"The original list must not change\"\n_ok = False\ntry:\n    apply_sort(_p, \"rating\")\nexcept ValueError:\n    _ok = True\nassert _ok, \"Sorting by a field that does not exist: ValueError\""
    }
   },
   {
    "title": "Filter parameters",
    "prompt": "The function <code>filter_items(items, query)</code> must return, in the original order, the items that match <b>all</b> the conditions in the query dictionary (the values are strings). Compare a field value by converting it with <code>str(...)</code>. If an item has no such field, it does not match. If <code>query</code> is empty, all items are returned.",
    "hints": [
     "For each item, check all the conditions with <code>all(...)</code>.",
     "Condition: <code>k in it and str(it[k]) == v</code>"
    ],
    "check": {
     "tests": "_cafes = [{\"id\": 1, \"city\": \"Алматы\", \"wifi\": True}, {\"id\": 2, \"city\": \"Астана\", \"wifi\": True}, {\"id\": 3, \"city\": \"Алматы\", \"wifi\": False}, {\"id\": 4, \"name\": \"Bean\"}]\nassert [c[\"id\"] for c in filter_items(_cafes, {\"city\": \"Алматы\"})] == [1, 3], \"city=Алматы: ids 1 and 3\"\nassert [c[\"id\"] for c in filter_items(_cafes, {\"city\": \"Алматы\", \"wifi\": \"True\"})] == [1], \"Two conditions: only id 1\"\nassert [c[\"id\"] for c in filter_items(_cafes, {\"id\": \"2\"})] == [2], \"A number is also compared as a string: id=2\"\nassert len(filter_items(_cafes, {})) == 4, \"No filter: all of them\""
    }
   },
   {
    "title": "Idempotency key",
    "prompt": "A payment API uses an <code>Idempotency-Key</code>. Write the class <code>PaymentAPI</code>: <code>payments</code> is the list of created payments, <code>seen</code> maps a key to a response. The method <code>post(key, amount)</code>: if the key was seen before, it returns the <b>same</b> response (no new payment is created); otherwise it creates the payment <code>{\"id\": n, \"amount\": amount}</code> (<code>n</code> increases from 1), stores the response <code>(201, payment)</code>, and returns it.",
    "hints": [
     "At the start, check: <code>if key in self.seen: return self.seen[key]</code>.",
     "Store the new response in <code>self.seen[key]</code>."
    ],
    "check": {
     "tests": "_api = PaymentAPI()\n_r1 = _api.post(\"k-1\", 5000)\nassert _r1 == (201, {\"id\": 1, \"amount\": 5000}), \"The first request: (201, {'id': 1, 'amount': 5000})\"\nassert _api.post(\"k-1\", 5000) == _r1, \"A repeated key must return the earlier response\"\nassert len(_api.payments) == 1, \"A repeated request must not create a new payment\"\nassert _api.post(\"k-2\", 700) == (201, {\"id\": 2, \"amount\": 700}), \"A new key: a new payment with id 2\""
    }
   },
   {
    "title": "Error response format",
    "prompt": "All errors must be returned in one format. The function <code>error(status, message)</code> must return <code>(status, {\"error\": {\"code\": CODES[status], \"message\": message}})</code> (<code>CODES</code> is given). Then write the handler <code>get_product(products, pid)</code>: if <code>pid</code> is not digits, return <code>error(400, \"id сан болуы керек\")</code>; if the product is not found (<code>products</code> maps an int id to a product), return <code>error(404, \"Тауар табылмады\")</code>; otherwise <code>(200, product)</code>.",
    "hints": [
     "The <code>error</code> function returns a nested dictionary: <code>{\"error\": {\"code\": ..., \"message\": ...}}</code>.",
     "First <code>pid.isdigit()</code>, then <code>products.get(int(pid))</code>."
    ],
    "check": {
     "tests": "assert error(409, \"Бұл email бос емес\") == (409, {\"error\": {\"code\": \"conflict\", \"message\": \"Бұл email бос емес\"}}), \"The format of error(409, ...) is wrong\"\n_ps = {7: {\"id\": 7, \"name\": \"Қымыз\", \"price\": 900}}\nassert get_product(_ps, \"7\") == (200, {\"id\": 7, \"name\": \"Қымыз\", \"price\": 900}), \"An existing product: 200\"\nassert get_product(_ps, \"8\") == (404, {\"error\": {\"code\": \"not_found\", \"message\": \"Тауар табылмады\"}}), \"A missing product: 404 and the same format\"\nassert get_product(_ps, \"abc\") == (400, {\"error\": {\"code\": \"bad_request\", \"message\": \"id сан болуы керек\"}}), \"A non-numeric id: 400\""
    }
   },
   {
    "title": "Full CRUD store",
    "prompt": "Write the class <code>ProductStore</code> (each method returns <code>(status, body)</code>). <code>create(data)</code>: assigns an id (from 1), returns <code>(201, object)</code>. <code>get(pid)</code>: <code>(200, object)</code> or <code>(404, {\"error\": \"not found\"})</code>. <code>patch(pid, changes)</code>: updates the given fields (without changing <code>id</code>), returns <code>(200, object)</code> or 404. <code>delete(pid)</code>: <code>(204, None)</code> or 404. <code>list(page=1, per_page=2)</code>: <code>(200, {\"items\": [...], \"total\": N})</code> in id order.",
    "hints": [
     "Keep the data in the dictionary <code>self.rows</code> (id → object), and the next id in <code>self.next_id</code>.",
     "Pagination: <code>start = (page - 1) * per_page</code>, <code>items[start:start + per_page]</code>."
    ],
    "check": {
     "tests": "_s = ProductStore()\nassert _s.create({\"name\": \"Шапан\", \"price\": 45000}) == (201, {\"name\": \"Шапан\", \"price\": 45000, \"id\": 1}), \"create: 201 and id 1\"\n_s.create({\"name\": \"Кесе\", \"price\": 1500}); _s.create({\"name\": \"Тақия\", \"price\": 6000})\nassert _s.get(2) == (200, {\"name\": \"Кесе\", \"price\": 1500, \"id\": 2}), \"get(2): 200\"\nassert _s.get(9) == (404, {\"error\": \"not found\"}), \"get(9): 404\"\nassert _s.patch(2, {\"price\": 1800, \"id\": 99}) == (200, {\"name\": \"Кесе\", \"price\": 1800, \"id\": 2}), \"patch: the price changes, the id does not change\"\nassert _s.patch(9, {\"price\": 1})[0] == 404, \"patch of a missing object: 404\"\nassert _s.delete(1) == (204, None) and _s.delete(1)[0] == 404, \"delete: 204, a repeat gives 404\"\n_st, _b = _s.list(page=1, per_page=1)\nassert _st == 200 and _b[\"total\"] == 2 and [x[\"id\"] for x in _b[\"items\"]] == [2], \"list(1, 1): first page, total 2\"\nassert [x[\"id\"] for x in _s.list(page=2, per_page=1)[1][\"items\"]] == [3], \"list(2, 1): second page, id 3\""
    }
   }
  ]
 },
 "pyb-4": {
  "pr": [
   {
    "title": "Path parts",
    "prompt": "The function <code>split_path(path)</code> must turn a path into a list of parts: the leading and trailing <code>/</code> do not matter. <code>split_path(\"/cafes/7/menu/\")</code> → <code>[\"cafes\", \"7\", \"menu\"]</code>. For the root <code>\"/\"</code>, return <code>[]</code>.",
    "hints": [
     "<code>path.strip(\"/\")</code> removes the slashes at the edges.",
     "If you split an empty string, you get <code>[\"\"]</code>, so check it separately."
    ],
    "check": {
     "tests": "assert split_path(\"/cafes/7/menu/\") == [\"cafes\", \"7\", \"menu\"], \"split_path('/cafes/7/menu/') must be ['cafes', '7', 'menu']\"\nassert split_path(\"users/42\") == [\"users\", \"42\"], \"It works without a / at the start\"\nassert split_path(\"/\") == [] and split_path(\"\") == [], \"Root: []\""
    }
   },
   {
    "title": "Is it a parameter?",
    "prompt": "In a route pattern, a part like <code>&lt;id&gt;</code> is a parameter. The function <code>param_name(part)</code> must return the name inside the brackets if the part starts with <code>&lt;</code> and ends with <code>&gt;</code>, otherwise <code>None</code>. <code>param_name(\"&lt;cafe_id&gt;\")</code> → <code>\"cafe_id\"</code>.",
    "hints": [
     "<code>part.startswith(\"<\") and part.endswith(\">\")</code>",
     "The name inside: <code>part[1:-1]</code>"
    ],
    "check": {
     "tests": "assert param_name(\"<cafe_id>\") == \"cafe_id\", \"param_name('<cafe_id>') must be 'cafe_id'\"\nassert param_name(\"menu\") is None, \"A fixed part: None\"\nassert param_name(\"<id\") is None, \"If there is no >: None\""
    }
   },
   {
    "title": "Registering a route",
    "prompt": "<code>ROUTES</code> is an empty dictionary. Write a decorator with a parameter, <code>route(path)</code>: it registers the function in <code>ROUTES[path]</code> and returns the function itself, unchanged.",
    "hints": [
     "Inside the inner function <code>decorator(func)</code>, write <code>ROUTES[path] = func</code>.",
     "Do not forget <code>return func</code>, otherwise the name becomes <code>None</code>."
    ],
    "check": {
     "tests": "@route(\"/health\")\ndef _health():\n    return 200, {\"status\": \"ok\"}\n@route(\"/cafes\")\ndef _cafes():\n    return 200, [\"Kofe Bar\"]\nassert _health is not None and _health() == (200, {\"status\": \"ok\"}), \"The decorator must return the function unchanged\"\nassert ROUTES.get(\"/health\") is _health and ROUTES.get(\"/cafes\") is _cafes, \"Functions must be registered in the ROUTES dictionary\""
    }
   },
   {
    "title": "The Allow header",
    "prompt": "In a 405 response, the <code>Allow</code> header lists the allowed methods. <code>routes</code> is a list of <code>(pattern, methods)</code> tuples. The function <code>allowed_methods(routes, path)</code> must combine the methods of all routes that match the given <code>path</code> and return a string like <code>\"GET, POST\"</code> in alphabetical order (if no route matches — <code>\"\"</code>). The function <code>match_path</code> is ready.",
    "hints": [
     "Collect the methods of the matching routes into one set: <code>methods |= set(ms)</code>.",
     "<code>\", \".join(sorted(methods))</code>"
    ],
    "check": {
     "tests": "_rs = [(\"/orders\", [\"POST\"]), (\"/orders\", [\"GET\"]), (\"/orders/<id>\", [\"GET\", \"DELETE\", \"PATCH\"]), (\"/health\", [\"GET\"])]\nassert allowed_methods(_rs, \"/orders\") == \"GET, POST\", \"For /orders: 'GET, POST'\"\nassert allowed_methods(_rs, \"/orders/15\") == \"DELETE, GET, PATCH\", \"For /orders/15: 'DELETE, GET, PATCH'\"\nassert allowed_methods(_rs, \"/buses\") == \"\", \"If the path is empty, an empty string\""
    }
   },
   {
    "title": "Route order",
    "prompt": "There are routes <code>/users/me</code> and <code>/users/&lt;id&gt;</code>. The function <code>resolve(routes, path)</code> must return the handler name and the parameters of the first matching route in list order, as <code>(name, params)</code>, or <code>None</code> if nothing matches. Then fill the <code>ROUTES</code> list in the <b>correct order</b>: <code>/users/me</code> → <code>\"me\"</code>, <code>/users/&lt;id&gt;</code> → <code>\"user\"</code>, so that <code>me</code> is not caught as an id.",
    "hints": [
     "The specific route (<code>/users/me</code>) must come before the parameter route.",
     "In the loop, return at once when <code>params is not None</code>."
    ],
    "check": {
     "tests": "assert resolve(ROUTES, \"/users/me\") == (\"me\", {}), \"/users/me → ('me', {}): the specific route must come first\"\nassert resolve(ROUTES, \"/users/42\") == (\"user\", {\"id\": \"42\"}), \"/users/42 → ('user', {'id': '42'})\"\nassert resolve(ROUTES, \"/cafes\") is None, \"If nothing matches, None\"\nassert resolve([(\"/a/<x>\", \"first\"), (\"/a/<y>\", \"second\")], \"/a/1\") == (\"first\", {\"x\": \"1\"}), \"The first match in the list is taken\""
    }
   },
   {
    "title": "Ignoring the query",
    "prompt": "The function <code>route_key(method, path)</code> must turn a request into a key for the routing table: the method in upper case, the query string (<code>?</code> and everything after it) is removed from the path, and the last <code>/</code> is removed (the root <code>\"/\"</code> stays as it is). <code>route_key(\"get\", \"/cafes/?city=Алматы\")</code> → <code>(\"GET\", \"/cafes\")</code>.",
    "hints": [
     "To remove the query: <code>path.split(\"?\", 1)[0]</code>.",
     "The last <code>/</code>: <code>rstrip(\"/\")</code>, but keep the root."
    ],
    "check": {
     "tests": "assert route_key(\"get\", \"/cafes/?city=Алматы\") == (\"GET\", \"/cafes\"), \"route_key('get', '/cafes/?city=Алматы') must be ('GET', '/cafes')\"\nassert route_key(\"POST\", \"/orders\") == (\"POST\", \"/orders\"), \"Unchanged: ('POST', '/orders')\"\nassert route_key(\"get\", \"/?page=2\") == (\"GET\", \"/\"), \"The root '/' stays as it is\"\nassert route_key(\"delete\", \"/orders/15/\") == (\"DELETE\", \"/orders/15\"), \"The last / is removed\""
    }
   },
   {
    "title": "Several converters",
    "prompt": "The function <code>match_conv(pattern, path)</code> must work like <code>match_path</code>, but support three converters: <code>&lt;int:n&gt;</code> — digits only, converted to <code>int</code>; <code>&lt;slug:s&gt;</code> — lowercase Latin letters, digits and hyphens (a non-empty string); <code>&lt;name&gt;</code> — any non-empty value (a string). If it does not match, return <code>None</code>.",
    "hints": [
     "Take the inside of the part, <code>inner = p[1:-1]</code>, and check the prefixes <code>\"int:\"</code> and <code>\"slug:\"</code>.",
     "Slug check: <code>set(v) <= set(\"abc...z0123456789-\")</code>"
    ],
    "check": {
     "tests": "assert match_conv(\"/shops/<slug:shop>/orders/<int:n>\", \"/shops/almaty-1/orders/77\") == {\"shop\": \"almaty-1\", \"n\": 77}, \"slug and int together\"\nassert match_conv(\"/shops/<slug:shop>\", \"/shops/Almaty\") is None, \"A capital letter does not match slug\"\nassert match_conv(\"/orders/<int:n>\", \"/orders/7a\") is None, \"Not a digit: None\"\nassert match_conv(\"/cities/<name>\", \"/cities/Қостанай\") == {\"name\": \"Қостанай\"}, \"A simple parameter accepts any value\"\nassert match_conv(\"/cities/<name>\", \"/cities//\") is None, \"An empty value does not match\"\nassert match_conv(\"/health\", \"/health\") == {}, \"No parameters: {}\""
    }
   },
   {
    "title": "Router with a prefix",
    "prompt": "Write the class <code>Router(prefix)</code> (like a Blueprint in Flask). The decorator <code>route(pattern, methods=(\"GET\",))</code> registers the handler with the pattern <code>prefix + pattern</code> and returns the function unchanged. The method <code>handle(method, path)</code> calls the matching handler with <code>**params</code> and returns its result; if the path exists but the method does not — <code>(405, {\"error\": \"method not allowed\"})</code>; if the path does not exist — <code>(404, {\"error\": \"not found\"})</code>. The function <code>match_path</code> is ready.",
    "hints": [
     "When registering, add the prefix to the pattern: <code>self.prefix + pattern</code>.",
     "In <code>handle</code>, keep a flag for whether the path was found, so that you can tell 404 from 405."
    ],
    "check": {
     "tests": "_api = Router(\"/api/v1\")\n@_api.route(\"/buses/<num>\")\ndef _bus(num):\n    return 200, {\"bus\": num}\n@_api.route(\"/tickets\", methods=[\"POST\"])\ndef _buy():\n    return 201, {\"ticket\": 1}\nassert _bus(\"92\") == (200, {\"bus\": \"92\"}), \"The decorator must return the function unchanged\"\nassert _api.handle(\"GET\", \"/api/v1/buses/92\") == (200, {\"bus\": \"92\"}), \"A path with the prefix: 200\"\nassert _api.handle(\"GET\", \"/buses/92\") == (404, {\"error\": \"not found\"}), \"A path without the prefix: 404\"\nassert _api.handle(\"POST\", \"/api/v1/tickets\") == (201, {\"ticket\": 1}), \"POST /api/v1/tickets: 201\"\nassert _api.handle(\"GET\", \"/api/v1/tickets\") == (405, {\"error\": \"method not allowed\"}), \"No method given: 405\""
    }
   }
  ]
 },
 "pyb-5": {
  "pr": [
   {
    "title": "Is the JSON valid?",
    "prompt": "The function <code>read_json(raw_body)</code> must read the body with <code>json.loads</code>. If it fails (<code>json.JSONDecodeError</code>), return <code>(400, {\"error\": \"invalid json\"})</code>; if it succeeds, return <code>(200, data)</code>.",
    "hints": [
     "<code>try: data = json.loads(raw_body)</code>",
     "<code>except json.JSONDecodeError: return 400, {\"error\": \"invalid json\"}</code>"
    ],
    "check": {
     "tests": "assert read_json('{\"name\": \"Дана\"}') == (200, {\"name\": \"Дана\"}), \"Valid JSON: (200, data)\"\nassert read_json('{\"name\": \"Дана\",') == (400, {\"error\": \"invalid json\"}), \"Invalid JSON: 400\"\nassert read_json(\"\") == (400, {\"error\": \"invalid json\"}), \"Empty body: 400\"\nassert read_json(\"[1, 2]\") == (200, [1, 2]), \"A list is valid JSON too\""
    }
   },
   {
    "title": "Integer check",
    "prompt": "The function <code>is_int(value)</code> must return <code>True</code> if the value is a real integer. Keep in mind: in Python <code>isinstance(True, int)</code> gives <code>True</code>, so <code>bool</code> must be excluded separately. A number written as a string (<code>\"5\"</code>) is not accepted either.",
    "hints": [
     "<code>isinstance(value, int)</code> gives True for both True and False.",
     "Add <code>and not isinstance(value, bool)</code>."
    ],
    "check": {
     "tests": "assert is_int(5) is True and is_int(-3) is True and is_int(0) is True, \"5, -3, 0 are integers\"\nassert is_int(True) is False and is_int(False) is False, \"bool is not counted as an integer\"\nassert is_int(\"5\") is False and is_int(5.0) is False and is_int(None) is False, \"'5', 5.0, None are not integers\""
    }
   },
   {
    "title": "Your own error class",
    "prompt": "Write the class <code>ValidationError(Exception)</code> for validation errors: the constructor takes <code>field</code> and <code>message</code>, stores both as attributes, and passes the string <code>f\"{field}: {message}\"</code> to <code>super().__init__</code>. <code>str(ValidationError(\"age\", \"теріс\"))</code> → <code>\"age: теріс\"</code>.",
    "hints": [
     "<code>def __init__(self, field, message):</code>",
     "<code>super().__init__(f\"{field}: {message}\")</code>, then <code>self.field = field</code>."
    ],
    "check": {
     "tests": "_e = ValidationError(\"age\", \"теріс\")\nassert isinstance(_e, Exception), \"ValidationError must inherit from Exception\"\nassert _e.field == \"age\" and _e.message == \"теріс\", \"field and message must be stored\"\nassert str(_e) == \"age: теріс\", \"str(e) must be 'age: теріс'\"\n_ok = False\ntry:\n    raise ValidationError(\"email\", \"форматы қате\")\nexcept ValidationError as _x:\n    _ok = _x.field == \"email\"\nassert _ok, \"The error must be catchable with except ValidationError\""
    }
   },
   {
    "title": "Sign-up form",
    "prompt": "The function <code>validate_signup(data)</code> must collect all the errors together and return a dictionary (if there are no errors — <code>{}</code>). Rules: <code>login</code> — a string of 3–20 characters, otherwise <code>\"login\": \"3-20 таңба\"</code>; <code>password</code> — a string of at least 8 characters, otherwise <code>\"password\": \"кемінде 8 таңба\"</code>; <code>age</code> — an integer from 14 to 100 (not a bool), otherwise <code>\"age\": \"14-100 бүтін сан\"</code>.",
    "hints": [
     "Get each field with <code>data.get(...)</code>: if the key is missing, you get <code>None</code>.",
     "Do not stop at the first error: collect all of them in the <code>errors</code> dictionary."
    ],
    "check": {
     "tests": "assert validate_signup({\"login\": \"dana\", \"password\": \"qwerty123\", \"age\": 19}) == {}, \"Correct data has no errors\"\nassert validate_signup({\"login\": \"ab\", \"password\": \"123\", \"age\": 10}) == {\"login\": \"3-20 таңба\", \"password\": \"кемінде 8 таңба\", \"age\": \"14-100 бүтін сан\"}, \"Three errors must be collected together\"\nassert validate_signup({}) == {\"login\": \"3-20 таңба\", \"password\": \"кемінде 8 таңба\", \"age\": \"14-100 бүтін сан\"}, \"An empty dictionary: three errors\"\nassert validate_signup({\"login\": \"erlan\", \"password\": \"qwerty123\", \"age\": True}) == {\"age\": \"14-100 бүтін сан\"}, \"True is not an age\""
    }
   },
   {
    "title": "Cleaning text",
    "prompt": "The function <code>clean_profile(data)</code> must clean a user profile: remove the spaces at the edges of the <code>name</code> and <code>city</code> strings (<code>strip</code>), if <code>city</code> is missing or empty set it to <code>\"Алматы\"</code>, and convert <code>email</code> to lower case. The other keys must not be in the result. The original dictionary must not change.",
    "hints": [
     "Create a new dictionary, do not change the original.",
     "<code>(data.get(\"city\") or \"\").strip()</code> — if it is empty, then <code>\"Алматы\"</code>."
    ],
    "check": {
     "tests": "_in = {\"name\": \"  Айгерім \", \"city\": \" Тараз\", \"email\": \"Aigerim@Mail.KZ \", \"is_admin\": True}\nassert clean_profile(_in) == {\"name\": \"Айгерім\", \"city\": \"Тараз\", \"email\": \"aigerim@mail.kz\"}, \"The result of clean_profile(...) is wrong; extra keys (is_admin) are not included\"\nassert _in[\"name\"] == \"  Айгерім \", \"The original dictionary must not change\"\nassert clean_profile({\"name\": \"Нұр\", \"email\": \"N@x.kz\", \"city\": \"   \"})[\"city\"] == \"Алматы\", \"If city is empty: 'Алматы'\"\nassert clean_profile({\"name\": \"Нұр\", \"email\": \"n@x.kz\"})[\"city\"] == \"Алматы\", \"If city is missing: 'Алматы'\""
    }
   },
   {
    "title": "Turning an error into a response",
    "prompt": "The <code>ApiError</code> hierarchy is ready. Add the classes <code>Conflict</code> (409) and <code>Unprocessable</code> (422). Then the function <code>to_response(func, *args)</code> must call <code>func(*args)</code>: if an <code>ApiError</code> is raised, return <code>(e.status, {\"error\": e.message})</code>; if not, return the result itself. Do not catch other exceptions.",
    "hints": [
     "<code>class Conflict(ApiError): status = 409</code>",
     "<code>except ApiError as e: return e.status, {\"error\": e.message}</code>"
    ],
    "check": {
     "tests": "_users = {\"dana@mail.kz\"}\ndef _register(email):\n    if \"@\" not in email:\n        raise Unprocessable(\"email форматы қате\")\n    if email in _users:\n        raise Conflict(\"email бос емес\")\n    return 201, {\"email\": email}\nassert issubclass(Conflict, ApiError) and issubclass(Unprocessable, ApiError), \"Conflict and Unprocessable must inherit from ApiError\"\nassert to_response(_register, \"ali@mail.kz\") == (201, {\"email\": \"ali@mail.kz\"}), \"No error: the result does not change\"\nassert to_response(_register, \"dana@mail.kz\") == (409, {\"error\": \"email бос емес\"}), \"Conflict → 409\"\nassert to_response(_register, \"dana\") == (422, {\"error\": \"email форматы қате\"}), \"Unprocessable → 422\"\n_ok = False\ntry:\n    to_response(lambda: [][1])\nexcept IndexError:\n    _ok = True\nassert _ok, \"Other exceptions must not be caught\""
    }
   },
   {
    "title": "Booking request",
    "prompt": "Write the dataclass <code>Booking</code>: <code>hotel: str</code>, <code>nights: int</code>, <code>guests: int = 1</code>. The function <code>create_booking(raw_body)</code>: invalid JSON or a value that is not an object → <code>(400, {\"error\": \"invalid json\"})</code>. Validation: <code>hotel</code> must be in <code>HOTELS</code>; <code>nights</code> — an integer from 1 to 30; <code>guests</code> (if given) — an integer from 1 to 6 (not a bool). If there are errors — <code>(422, {\"errors\": {...}})</code>, where the keys are the field names. If everything is correct — <code>(201, asdict(booking))</code>.",
    "hints": [
     "First parse the JSON (400), then validate (422), and at the end create the dataclass (201).",
     "Move the integer check into a helper function: <code>isinstance(v, int) and not isinstance(v, bool) and lo <= v <= hi</code>."
    ],
    "check": {
     "tests": "from dataclasses import is_dataclass\nassert is_dataclass(Booking), \"There must be a Booking dataclass\"\nassert create_booking('{\"hotel\": \"Rixos Borovoe\", \"nights\": 3}') == (201, {\"hotel\": \"Rixos Borovoe\", \"nights\": 3, \"guests\": 1}), \"A correct request: 201, guests is 1 by default\"\nassert create_booking('{\"hotel\": \"Shymkent Plaza\", \"nights\": 2, \"guests\": 4}')[1][\"guests\"] == 4, \"If guests is given, that value is used\"\nassert create_booking('{\"hotel\": ') == (400, {\"error\": \"invalid json\"}), \"Invalid JSON: 400\"\nassert create_booking('\"Rixos\"') == (400, {\"error\": \"invalid json\"}), \"JSON that is not an object: 400\"\n_s, _b = create_booking('{\"hotel\": \"Hilton\", \"nights\": 0, \"guests\": 9}')\nassert _s == 422 and set(_b[\"errors\"]) == {\"hotel\", \"nights\", \"guests\"}, \"Three errors together: 422\"\n_s, _b = create_booking('{\"hotel\": \"Kazakhstan Hotel\", \"nights\": true}')\nassert _s == 422 and set(_b[\"errors\"]) == {\"nights\"}, \"true is not a number of nights\""
    }
   },
   {
    "title": "Validation decorator",
    "prompt": "Write the parameterised decorator <code>validate(**rules)</code>: each rule is a pair \"field name → <code>(type, condition)</code>\", where the condition is a function that checks the value. The handler takes one argument: the dictionary <code>data</code>. For each rule, the decorator checks that the value is present, that its type matches (do not count <code>bool</code> as <code>int</code>), and that the condition passes; if there are any faulty fields, the handler is not called, and <code>(422, {\"errors\": [fields, in alphabetical order]})</code> is returned.",
    "hints": [
     "Three levels: <code>validate(**rules)</code> → <code>decorator(handler)</code> → <code>wrapper(data)</code>.",
     "Looping over the rules: <code>for field, (typ, cond) in rules.items():</code>"
    ],
    "check": {
     "tests": "_calls = []\n@validate(qty=(int, lambda v: 1 <= v <= 10), drink=(str, lambda v: v in {\"latte\", \"raf\"}))\ndef _order(data):\n    _calls.append(data)\n    return 201, {\"ok\": True}\nassert _order({\"qty\": 2, \"drink\": \"latte\"}) == (201, {\"ok\": True}), \"Correct data: the result of the handler\"\nassert _order({\"qty\": 0, \"drink\": \"kumys\"}) == (422, {\"errors\": [\"drink\", \"qty\"]}), \"Two errors, in alphabetical order\"\nassert _order({\"drink\": \"raf\"}) == (422, {\"errors\": [\"qty\"]}), \"A missing field: an error\"\nassert _order({\"qty\": True, \"drink\": \"raf\"}) == (422, {\"errors\": [\"qty\"]}), \"True is not counted as an int\"\nassert len(_calls) == 1, \"If there is an error, the handler must not be called\""
    }
   }
  ]
 },
 "pyb-6": {
  "pr": [
   {
    "title": "Dataclass model",
    "prompt": "Import <code>dataclass</code> from the <code>dataclasses</code> module and write the model <code>Bus</code>: <code>route: str</code>, <code>city: str</code>, <code>seats: int = 40</code>, <code>id: int = None</code>. The <code>dataclass</code> creates the <code>__init__</code>, <code>__repr__</code> and <code>__eq__</code> methods itself.",
    "hints": [
     "Put <code>@dataclass</code> above the class.",
     "Fields: <code>route: str</code>, ..., the fields with default values go at the end."
    ],
    "check": {
     "tests": "from dataclasses import is_dataclass\nassert is_dataclass(Bus), \"Bus must be a dataclass\"\n_b = Bus(\"92\", \"Алматы\")\nassert _b.route == \"92\" and _b.city == \"Алматы\" and _b.seats == 40 and _b.id is None, \"Default values: seats 40, id None\"\nassert Bus(\"10\", \"Астана\", 25) == Bus(\"10\", \"Астана\", 25), \"__eq__ compares by fields\"\nassert repr(_b) == \"Bus(route='92', city='Алматы', seats=40, id=None)\", \"__repr__ in the dataclass style\""
    }
   },
   {
    "title": "Getting field values",
    "prompt": "<code>getattr(obj, \"city\")</code> is the same as <code>obj.city</code>. The function <code>pluck(objects, field)</code> must return a list of the values of the given field from a list of objects (like <code>values_list</code> in an ORM).",
    "hints": [
     "The field name comes as a string, so use <code>getattr(o, field)</code>.",
     "<code>[getattr(o, field) for o in objects]</code>"
    ],
    "check": {
     "tests": "_cs = [Cafe(\"Kofe Bar\", \"Астана\", 4.6), Cafe(\"Daily Cup\", \"Алматы\", 4.8)]\nassert pluck(_cs, \"name\") == [\"Kofe Bar\", \"Daily Cup\"], \"pluck(_cs, 'name') must be ['Kofe Bar', 'Daily Cup']\"\nassert pluck(_cs, \"rating\") == [4.6, 4.8], \"pluck(_cs, 'rating') must be [4.6, 4.8]\"\nassert pluck([], \"city\") == [], \"Empty list: []\""
    }
   },
   {
    "title": "Object to dictionary",
    "prompt": "For an API response, the model must be turned into a dictionary. The function <code>to_dict(obj, fields)</code> must collect into a dictionary only the fields from the <code>fields</code> list, in the same order. For example, a secret field (<code>password_hash</code>) must not appear in the response.",
    "hints": [
     "Dict comprehension: <code>{f: getattr(obj, f) for f in fields}</code>",
     "Only the requested fields are taken."
    ],
    "check": {
     "tests": "_u = User(7, \"dana\", \"Павлодар\", \"9f86d0...\")\nassert to_dict(_u, [\"id\", \"login\", \"city\"]) == {\"id\": 7, \"login\": \"dana\", \"city\": \"Павлодар\"}, \"to_dict(...) must be {'id': 7, 'login': 'dana', 'city': 'Павлодар'}\"\nassert \"password_hash\" not in to_dict(_u, [\"id\", \"login\"]), \"A field that was not requested is not included\"\nassert list(to_dict(_u, [\"city\", \"id\"])) == [\"city\", \"id\"], \"The order of the fields is kept\""
    }
   },
   {
    "title": "Repository update",
    "prompt": "Add two methods to the ready <code>Repo</code> class. <code>update(pk, **changes)</code> (the parameter is called <code>pk</code>, not <code>id</code>, so the key <code>id=...</code> goes into <code>changes</code>): if the object does not exist, return <code>None</code>; if it exists, change the given fields with <code>setattr</code> and return the object (the <code>id</code> field cannot be changed: if such a key is passed, raise <code>ValueError</code>). <code>count(**kw)</code>: the number of objects that match the <code>filter</code> conditions.",
    "hints": [
     "<code>setattr(obj, \"free\", False)</code> is the same as <code>obj.free = False</code>.",
     "<code>count</code> can use the existing <code>filter</code>: <code>len(self.filter(**kw))</code>."
    ],
    "check": {
     "tests": "_r = Repo()\n_r.add(Taxi(\"Ерлан\", \"Шымкент\")); _r.add(Taxi(\"Дана\", \"Шымкент\")); _r.add(Taxi(\"Арман\", \"Орал\"))\nassert _r.update(2, free=False).free is False, \"update(2, free=False) changes the object and returns it\"\nassert _r.rows[2].free is False, \"The change is kept in the repo\"\nassert _r.update(9, free=False) is None, \"No such id: None\"\nassert _r.count(city=\"Шымкент\") == 2 and _r.count(city=\"Шымкент\", free=True) == 1, \"count counts by the conditions\"\n_ok = False\ntry:\n    _r.update(1, id=5)\nexcept ValueError:\n    _ok = True\nassert _ok and _r.rows[1].id == 1, \"The id field cannot be changed: ValueError\""
    }
   },
   {
    "title": "Collecting related data",
    "prompt": "Work without N+1. <code>FakeDB</code> counts each query in <code>queries</code>. The function <code>cafes_with_city(db)</code> must return a list of <code>(name, city_name)</code> for each cafe (the order of the cafes is kept). There must be no more than 2 queries: <code>get_cafes()</code> and <code>get_cities(ids)</code> (it returns a dictionary id → city).",
    "hints": [
     "Collect all the <code>city_id</code> values in one list and call <code>db.get_cities(...)</code> once.",
     "Then take the data from the dictionary: <code>cities[c[\"city_id\"]][\"name\"]</code>"
    ],
    "check": {
     "tests": "_cities = {1: {\"name\": \"Алматы\"}, 2: {\"name\": \"Астана\"}, 3: {\"name\": \"Түркістан\"}}\n_cafes = [{\"name\": f\"Cafe-{i}\", \"city_id\": (i % 3) + 1} for i in range(25)]\n_db = FakeDB(_cafes, _cities)\n_res = cafes_with_city(_db)\nassert _res[:3] == [(\"Cafe-0\", \"Алматы\"), (\"Cafe-1\", \"Астана\"), (\"Cafe-2\", \"Түркістан\")], \"Result: (name, city_name), the order is kept\"\nassert len(_res) == 25, \"All 25 cafes are needed\"\nassert _db.queries <= 2, \"N+1: for 25 cafes there must be no more than 2 queries\""
    }
   },
   {
    "title": "Lookup operators",
    "prompt": "Let us parse keys like <code>rating__gte=4.5</code>, as in Django. The function <code>matches(obj, **kw)</code> must return <code>True</code> if the object meets all the conditions. The key is split by <code>__</code> into a field and an operator (<code>partition</code>). Operators: no operator — equality; <code>gt</code> (&gt;), <code>lte</code> (≤), <code>in</code> (the value is in the list), <code>startswith</code>. An unknown operator — <code>ValueError</code>.",
    "hints": [
     "<code>field, _, op = key.partition(\"__\")</code>; if <code>op</code> is empty — <code>\"exact\"</code>.",
     "It is convenient to keep the operators in a dictionary of lambda functions."
    ],
    "check": {
     "tests": "from dataclasses import dataclass\n@dataclass\nclass _Flat:\n    city: str\n    rooms: int\n    price: int\n_f = _Flat(\"Астана\", 2, 250000)\nassert matches(_f, city=\"Астана\") is True, \"An equality condition\"\nassert matches(_f, rooms__gt=1, price__lte=250000) is True, \"gt and lte\"\nassert matches(_f, city__in=[\"Алматы\", \"Шымкент\"]) is False, \"in: not in the list\"\nassert matches(_f, city__startswith=\"Аст\", rooms=3) is False, \"If one condition fails, False\"\nassert matches(_f) is True, \"No conditions: True\"\n_ok = False\ntry:\n    matches(_f, price__between=1)\nexcept ValueError:\n    _ok = True\nassert _ok, \"Unknown operator: ValueError\""
    }
   },
   {
    "title": "Lazy query",
    "prompt": "An ORM query is lazy: <code>filter</code> only collects the conditions, and the database is queried only when the result is needed. Write <code>LazyQuery(db)</code>: <code>filter(**kw)</code> adds a condition and returns a <b>new</b> <code>LazyQuery</code> (it does not go to the database); <code>all()</code> calls <code>db.fetch_all()</code> once and returns the objects that match all the conditions (equality only); <code>count()</code> — <code>len(self.all())</code>. The original query must not change.",
    "hints": [
     "Keep the conditions in the dictionary <code>self.conditions</code>; <code>filter</code> gives a copy of it to the new object.",
     "Go to the database only inside <code>all()</code>."
    ],
    "check": {
     "tests": "_db = FakeDB([{\"city\": \"Алматы\", \"type\": \"кофе\"}, {\"city\": \"Астана\", \"type\": \"кофе\"}, {\"city\": \"Алматы\", \"type\": \"шай\"}])\n_q = LazyQuery(_db)\n_q2 = _q.filter(city=\"Алматы\").filter(type=\"кофе\")\nassert isinstance(_q2, LazyQuery), \"filter must return a new LazyQuery\"\nassert _db.calls == 0, \"filter must not go to the database (lazy)\"\nassert _q2.all() == [{\"city\": \"Алматы\", \"type\": \"кофе\"}], \"Two conditions are applied together\"\nassert _db.calls == 1, \"all() goes to the database once\"\nassert _q.count() == 3, \"The original query does not change: 3\"\nassert _q.filter(city=\"Алматы\").count() == 2, \"One condition: 2\""
    }
   },
   {
    "title": "Applying migrations",
    "prompt": "A migration is a described change to the schema. Write <code>apply_migrations(schema, applied, migrations)</code>: <code>schema</code> — a dictionary table → list of columns; <code>applied</code> — a set of the names of migrations already applied; <code>migrations</code> — a list of <code>(name, table, new column)</code> tuples. The function must apply the migrations that are not yet applied, <b>sorted</b> by name (the column is added to the end of the table; if the table does not exist — <code>ValueError</code>; if the column already exists — skip it), add the name to <code>applied</code>, and return the list of names applied this time.",
    "hints": [
     "<code>sorted(migrations)</code> sorts the tuples by the first element (the name).",
     "For each migration: <code>if name in applied: continue</code>, then add the column and write the name into <code>applied</code>."
    ],
    "check": {
     "tests": "_schema = {\"cafe\": [\"id\", \"name\"], \"order\": [\"id\", \"cafe_id\"]}\n_applied = {\"0001_init\"}\n_ms = [(\"0003_add_phone\", \"cafe\", \"phone\"), (\"0001_init\", \"cafe\", \"id\"), (\"0002_add_city\", \"cafe\", \"city\"), (\"0004_add_total\", \"order\", \"total\")]\nassert apply_migrations(_schema, _applied, _ms) == [\"0002_add_city\", \"0003_add_phone\", \"0004_add_total\"], \"New migrations are applied in name order\"\nassert _schema == {\"cafe\": [\"id\", \"name\", \"city\", \"phone\"], \"order\": [\"id\", \"cafe_id\", \"total\"]}, \"Columns must be added in the right order\"\nassert apply_migrations(_schema, _applied, _ms) == [], \"On a repeated run nothing is applied\"\nassert \"0004_add_total\" in _applied, \"Applied names are written to applied\"\n_ok = False\ntry:\n    apply_migrations(_schema, _applied, [(\"0005_x\", \"bus\", \"route\")])\nexcept ValueError:\n    _ok = True\nassert _ok, \"No table: ValueError\""
    }
   }
  ]
 },
 "pyb-7": {
  "pr": [
   {
    "title": "SHA-256 hash",
    "prompt": "The function <code>sha256_hex(text)</code> must return the SHA-256 hash of a string as a hex string: <code>hashlib.sha256(text.encode()).hexdigest()</code>. A hash works in one direction: the original text cannot be recovered from it.",
    "hints": [
     "<code>import hashlib</code>",
     "First turn the string into bytes: <code>text.encode()</code>."
    ],
    "check": {
     "tests": "assert sha256_hex(\"qwerty\") == \"65e84be33532fb784c48129675f9eff3a682b27168c0ea744b2cf58ee02337c5\", \"sha256_hex('qwerty') is not the correct hash\"\nassert sha256_hex(\"Алматы2026\") == \"4e7fcbbb3f18eafec365e76c166cb96e373bfdb6dc7ccc0b2c917bce71620418\", \"Cyrillic is also turned into bytes by encode()\"\nassert len(sha256_hex(\"\")) == 64, \"The hex value of SHA-256 is 64 characters\""
    }
   },
   {
    "title": "Salted hash",
    "prompt": "So that identical passwords do not give identical hashes, we add a salt. The function <code>salted_hash(password, salt)</code> must return the SHA-256 hex value of the string <code>salt + password</code>.",
    "hints": [
     "Pass the string <code>salt + password</code> to the hash.",
     "<code>hashlib.sha256((salt + password).encode()).hexdigest()</code>"
    ],
    "check": {
     "tests": "assert salted_hash(\"qwerty\", \"salt1\") == \"f41a01d156c10ea129396a991287e0277ecbe3e79b3e3b1af818d404cda1bd57\", \"salted_hash('qwerty', 'salt1') is wrong: salt + password\"\nassert salted_hash(\"qwerty\", \"a\") != salted_hash(\"qwerty\", \"b\"), \"A different salt gives a different hash\"\nassert salted_hash(\"qwerty\", \"x\") == salted_hash(\"qwerty\", \"x\"), \"The same salt and password give the same hash\""
    }
   },
   {
    "title": "Getting a bearer token",
    "prompt": "The function <code>bearer_token(headers)</code> must take the value of <code>authorization</code> from the headers dictionary (names in lower case), and if it starts with <code>\"Bearer \"</code>, return the token after it. If the header is missing or the scheme is different (for example <code>Basic</code>) — <code>None</code>.",
    "hints": [
     "<code>headers.get(\"authorization\", \"\")</code>",
     "If <code>value.startswith(\"Bearer \")</code>, return <code>value[7:]</code>."
    ],
    "check": {
     "tests": "assert bearer_token({\"authorization\": \"Bearer abc.def\"}) == \"abc.def\", \"Bearer abc.def → 'abc.def'\"\nassert bearer_token({\"authorization\": \"Basic dXNlcjpwdw==\"}) is None, \"Basic scheme: None\"\nassert bearer_token({}) is None, \"No header: None\"\nassert bearer_token({\"authorization\": \"Bearer \"}) is None, \"Empty token: None\""
    }
   },
   {
    "title": "Constant-time comparison",
    "prompt": "The function <code>check_password(password, salt, stored)</code> must compute the SHA-256 hex value of the string <code>salt + password</code> and compare it with the saved <code>stored</code> using <code>hmac.compare_digest</code> (not <code>==</code>: that leaks information through timing).",
    "hints": [
     "<code>import hmac</code>",
     "<code>return hmac.compare_digest(candidate, stored)</code>"
    ],
    "check": {
     "tests": "_stored = \"f41a01d156c10ea129396a991287e0277ecbe3e79b3e3b1af818d404cda1bd57\"\nassert check_password(\"qwerty\", \"salt1\", _stored) is True, \"Correct password: True\"\nassert check_password(\"qwertY\", \"salt1\", _stored) is False, \"Wrong password: False\"\nassert check_password(\"qwerty\", \"salt2\", _stored) is False, \"A different salt: False\""
    }
   },
   {
    "title": "HMAC signature",
    "prompt": "A payment system signs the message of a webhook. The function <code>sign(message, secret)</code> must return <code>hmac.new(secret.encode(), message.encode(), hashlib.sha256).hexdigest()</code>. The function <code>verify(message, secret, signature)</code> must recompute the signature and check it with <code>hmac.compare_digest</code>.",
    "hints": [
     "<code>hmac.new(key, msg, hashlib.sha256).hexdigest()</code>",
     "In <code>verify</code>, reuse <code>sign</code>."
    ],
    "check": {
     "tests": "assert sign(\"order:1051:3200\", \"k3y\") == \"ceb1905247062701923093acdff9840e85e68da07969eb05cc1d89c4863ce568\", \"sign('order:1051:3200', 'k3y') is wrong\"\n_s = sign(\"order:7:900\", \"k3y\")\nassert verify(\"order:7:900\", \"k3y\", _s) is True, \"A correct signature: True\"\nassert verify(\"order:7:100\", \"k3y\", _s) is False, \"If the message is changed: False\"\nassert verify(\"order:7:900\", \"other\", _s) is False, \"A different secret: False\""
    }
   },
   {
    "title": "Session table",
    "prompt": "Server-side session: the class <code>SessionStore</code> keeps a table <code>sid → user</code>. The method <code>login(user)</code> creates a new <code>sid</code> (in the order <code>\"s1\"</code>, <code>\"s2\"</code>, …), saves it, and returns it. The method <code>get_user(sid)</code> returns the user or <code>None</code>. The method <code>logout(sid)</code> deletes the record and returns <code>True</code>; if there was no such record, <code>False</code>.",
    "hints": [
     "Counter: <code>self.counter += 1</code>, <code>sid = f\"s{self.counter}\"</code>.",
     "<code>get_user</code>: <code>self.sessions.get(sid)</code>"
    ],
    "check": {
     "tests": "_st = SessionStore()\n_a = _st.login(\"dana\"); _b = _st.login(\"erlan\")\nassert (_a, _b) == (\"s1\", \"s2\"), \"sid in order: s1, s2\"\nassert _st.get_user(\"s1\") == \"dana\" and _st.get_user(\"s9\") is None, \"get_user: the user or None\"\nassert _st.logout(\"s1\") is True and _st.get_user(\"s1\") is None, \"logout deletes the session\"\nassert _st.logout(\"s1\") is False, \"A repeated logout: False\"\nassert _st.login(\"sara\") == \"s3\", \"A deleted sid is not issued again: s3\""
    }
   },
   {
    "title": "Base64 payload",
    "prompt": "The body part of a token is base64. The function <code>encode_payload(data)</code> must turn the string <code>json.dumps(data, sort_keys=True)</code> into <code>base64.urlsafe_b64encode</code> and remove the trailing <code>=</code> characters. The function <code>decode_payload(body)</code> must restore the <code>=</code> characters (so that the length is a multiple of 4) and return a dictionary; for broken text, <code>None</code>. Base64 is not encryption: anyone can read it.",
    "hints": [
     "Padding: <code>body + \"=\" * (-len(body) % 4)</code>.",
     "For broken text, <code>urlsafe_b64decode</code> or <code>json.loads</code> raises an error: <code>try/except (binascii.Error, ValueError)</code>."
    ],
    "check": {
     "tests": "_b = encode_payload({\"user\": 7, \"role\": \"barista\"})\nassert \"=\" not in _b and \"{\" not in _b, \"The result must be base64 without = characters\"\nassert _b == \"eyJyb2xlIjogImJhcmlzdGEiLCAidXNlciI6IDd9\", \"The keys must be sorted: sort_keys=True\"\nassert decode_payload(_b) == {\"user\": 7, \"role\": \"barista\"}, \"decode_payload must do the reverse conversion\"\nassert decode_payload(encode_payload({\"city\": \"Алматы\"})) == {\"city\": \"Алматы\"}, \"It also works with Cyrillic\"\nassert decode_payload(\"!!!\") is None, \"Broken text: None\""
    }
   },
   {
    "title": "Role hierarchy",
    "prompt": "Roles inherit from one another: in <code>ROLES</code>, each role has its own permissions (<code>perms</code>) and a parent role (<code>inherits</code>, or <code>None</code> if there is none). The recursive function <code>all_perms(role)</code> must return a set of all the permissions of the role (including its parent's); for an unknown role, an empty set. The decorator <code>require(perm)</code>: if <code>user is None</code> → <code>(401, {\"error\": \"login required\"})</code>; if the permission is missing → <code>(403, {\"error\": \"forbidden\"})</code>; otherwise the result of the handler.",
    "hints": [
     "Recursion: add the result of <code>all_perms(info[\"inherits\"])</code> to its own permissions (with <code>|=</code>).",
     "<code>require</code> is a decorator with a parameter: <code>require(perm)</code> → <code>decorator(handler)</code> → <code>wrapper(user, ...)</code>."
    ],
    "check": {
     "tests": "assert all_perms(\"owner\") == {\"orders:read\", \"menu:edit\", \"reports:read\"}, \"The owner gets the permissions of all its ancestors\"\nassert all_perms(\"barista\") == {\"orders:read\"}, \"barista: only its own\"\nassert all_perms(\"intern\") == set(), \"Unknown role: an empty set\"\nassert ROLES[\"manager\"][\"perms\"] == {\"menu:edit\"}, \"The ROLES dictionary must not change\"\n@require(\"menu:edit\")\ndef _set_price(user, drink, price):\n    return 200, {\"drink\": drink, \"price\": price}\nassert _set_price(None, \"raf\", 1500) == (401, {\"error\": \"login required\"}), \"Not logged in: 401\"\nassert _set_price({\"role\": \"barista\"}, \"raf\", 1500) == (403, {\"error\": \"forbidden\"}), \"barista cannot change the menu: 403\"\nassert _set_price({\"role\": \"owner\"}, \"raf\", 1500) == (200, {\"drink\": \"raf\", \"price\": 1500}), \"owner gets menu:edit by inheritance\""
    }
   }
  ]
 },
 "pyb-8": {
  "pr": [
   {
    "title": "The first TestCase",
    "prompt": "The function <code>km_to_m(km)</code> is given. Write the class <code>DistanceTests(unittest.TestCase)</code>: at least 2 test methods (names start with <code>test_</code>) using <code>assertEqual</code>, for example <code>km_to_m(3)</code> = 3000 and <code>km_to_m(0)</code> = 0. Your tests are also run on a deliberately broken version (<code>km * 100</code>): there the tests must fail.",
    "hints": [
     "Each test is a method <code>def test_...(self):</code>.",
     "<code>self.assertEqual(km_to_m(3), 3000)</code>"
    ],
    "check": {
     "tests": "import io as _io, unittest as _ut\ndef _run(_cls):\n    return _ut.TextTestRunner(stream=_io.StringIO()).run(_ut.defaultTestLoader.loadTestsFromTestCase(_cls))\n\n_r = _run(DistanceTests)\nassert _r.testsRun >= 2, \"At least 2 test methods are needed (the name starts with test_)\"\nassert _r.wasSuccessful(), \"The tests must pass on the correct function\"\n_good = km_to_m\nkm_to_m = lambda km: km * 100\n_bad = _run(DistanceTests).wasSuccessful()\nkm_to_m = _good\nassert not _bad, \"The tests did not catch the km * 100 error\""
    }
   },
   {
    "title": "An assertRaises test",
    "prompt": "<code>withdraw(balance, amount)</code> raises <code>ValueError</code> if the amount is more than the balance. Write <code>WithdrawTests(unittest.TestCase)</code>: one test checks a normal withdrawal (<code>withdraw(5000, 2000) == 3000</code>), and the second checks the error with <code>with self.assertRaises(ValueError):</code>. On a broken version that does not raise the error, the tests must fail.",
    "hints": [
     "<code>with self.assertRaises(ValueError): withdraw(1000, 5000)</code>",
     "Two test methods are enough."
    ],
    "check": {
     "tests": "import io as _io, unittest as _ut\ndef _run(_cls):\n    return _ut.TextTestRunner(stream=_io.StringIO()).run(_ut.defaultTestLoader.loadTestsFromTestCase(_cls))\n\n_r = _run(WithdrawTests)\nassert _r.testsRun >= 2 and _r.wasSuccessful(), \"At least 2 tests, and they must pass on the correct function\"\n_good = withdraw\nwithdraw = lambda balance, amount: balance - amount\n_bad = _run(WithdrawTests).wasSuccessful()\nwithdraw = _good\nassert not _bad, \"The tests did not notice the missing ValueError: use assertRaises\""
    }
   },
   {
    "title": "Running the tests",
    "prompt": "Write the function <code>run_tests(case_class)</code>: it must collect the tests of a TestCase class with <code>unittest.defaultTestLoader.loadTestsFromTestCase</code>, run them with <code>unittest.TextTestRunner(stream=io.StringIO())</code>, and return a tuple <code>(testsRun, wasSuccessful)</code>.",
    "hints": [
     "<code>suite = unittest.defaultTestLoader.loadTestsFromTestCase(case_class)</code>",
     "<code>result = unittest.TextTestRunner(stream=io.StringIO()).run(suite)</code>"
    ],
    "check": {
     "tests": "import unittest as _ut\nclass _Ok(_ut.TestCase):\n    def test_a(self):\n        self.assertTrue(True)\n    def test_b(self):\n        self.assertIn(\"а\", \"ата\")\nclass _Fail(_ut.TestCase):\n    def test_a(self):\n        self.assertEqual(1, 2)\nassert run_tests(_Ok) == (2, True), \"Two passing tests: (2, True)\"\nassert run_tests(_Fail) == (1, False), \"One failing test: (1, False)\""
    }
   },
   {
    "title": "Clean setUp",
    "prompt": "The class <code>Cart</code> is given. Write <code>CartTests(unittest.TestCase)</code>: in <code>setUp</code>, create a new cart for each test (<code>self.cart = Cart()</code>). At least 2 tests: after adding an item, <code>count()</code> increases by 1; the <code>total()</code> of a new cart is 0. On a broken <code>Cart</code> that does not add items, the tests must fail.",
    "hints": [
     "<code>def setUp(self): self.cart = Cart()</code>",
     "In a test: <code>self.cart.add(...)</code>, then <code>assertEqual(self.cart.count(), 1)</code>."
    ],
    "check": {
     "tests": "import io as _io, unittest as _ut\ndef _run(_cls):\n    return _ut.TextTestRunner(stream=_io.StringIO()).run(_ut.defaultTestLoader.loadTestsFromTestCase(_cls))\n\nassert \"setUp\" in CartTests.__dict__, \"A setUp method is needed\"\n_r = _run(CartTests)\nassert _r.testsRun >= 2 and _r.wasSuccessful(), \"At least 2 tests, and they must pass on the correct Cart\"\n_Good = Cart\nclass _Broken(_Good):\n    def add(self, name, price):\n        pass\nCart = _Broken\n_bad = _run(CartTests).wasSuccessful()\nCart = _Good\nassert not _bad, \"The tests must fail on a Cart that does not add items\""
    }
   },
   {
    "title": "Boundary values",
    "prompt": "<code>valid_qty(q)</code> returns <code>True</code> if the quantity is a number from 1 to 10 inclusive. Bugs most often happen at the boundaries. Write <code>QtyTests(unittest.TestCase)</code>: check the values 0, 1, 10 and 11 (<code>assertTrue</code> / <code>assertFalse</code>). The check runs on two broken versions: <code>1 &lt;= q &lt; 10</code> and <code>0 &lt;= q &lt;= 10</code>.",
    "hints": [
     "Lower boundary: <code>assertFalse(valid_qty(0))</code>, <code>assertTrue(valid_qty(1))</code>.",
     "Upper boundary: 10 → True, 11 → False."
    ],
    "check": {
     "tests": "import io as _io, unittest as _ut\ndef _run(_cls):\n    return _ut.TextTestRunner(stream=_io.StringIO()).run(_ut.defaultTestLoader.loadTestsFromTestCase(_cls))\n\nassert _run(QtyTests).wasSuccessful(), \"The tests must pass on the correct function\"\n_good = valid_qty\nfor _mut, _msg in ((lambda q: 1 <= q < 10, \"10 мәні тексерілмеген\"), (lambda q: 0 <= q <= 10, \"0 мәні тексерілмеген\")):\n    valid_qty = _mut\n    _bad = _run(QtyTests).wasSuccessful()\n    valid_qty = _good\n    assert not _bad, \"Тесттер шекаралық қатені ұстамады: \" + _msg"
    }
   },
   {
    "title": "Fake clock",
    "prompt": "To test code that depends on time, a fake clock is needed. Write the class <code>FakeClock</code>: <code>FakeClock(start=0)</code>; when called (<code>clock()</code>, through <code>__call__</code>) it returns the current time; the method <code>advance(seconds)</code> moves the time forward. It must work with the ready class <code>OtpCode</code>: a code is valid for 60 seconds.",
    "hints": [
     "<code>__call__</code> lets you call the object like a function.",
     "<code>advance</code>: <code>self.t += seconds</code>"
    ],
    "check": {
     "tests": "_c = FakeClock(100)\nassert _c() == 100, \"FakeClock(100)() must return 100\"\n_c.advance(5)\nassert _c() == 105, \"advance(5) moves the time by 5 seconds\"\nassert FakeClock()() == 0, \"start is 0 by default\"\n_clock = FakeClock()\n_otp = OtpCode(\"4821\", _clock)\n_clock.advance(59)\nassert _otp.check(\"4821\") is True, \"After 59 seconds the code is still valid\"\n_clock.advance(1)\nassert _otp.check(\"4821\") is False, \"After 60 seconds it expires\""
    }
   },
   {
    "title": "Test client scenario",
    "prompt": "<code>TicketApp</code> and <code>TestClient</code> are ready. Write <code>TicketApiTests(unittest.TestCase)</code>: in <code>setUp</code>, write <code>self.client = TestClient(TicketApp())</code>. At least 3 tests: <code>POST /tickets</code> returns 201; after <code>DELETE</code> of a created ticket, <code>GET</code> returns 404; <code>DELETE</code> of a missing ticket returns 404. The check runs on two broken apps: (1) POST returns 200, (2) DELETE deletes nothing.",
    "hints": [
     "<code>setUp</code> gives each test a new app, so the tests do not depend on one another.",
     "Delete test: first POST, take the <code>id</code> from the response, then DELETE, then check that GET gives 404."
    ],
    "check": {
     "tests": "import io as _io, unittest as _ut\ndef _run(_cls):\n    return _ut.TextTestRunner(stream=_io.StringIO()).run(_ut.defaultTestLoader.loadTestsFromTestCase(_cls))\n\nassert \"setUp\" in TicketApiTests.__dict__, \"A setUp method is needed\"\n_r = _run(TicketApiTests)\nassert _r.testsRun >= 3 and _r.wasSuccessful(), \"At least 3 tests, and they must pass on the correct app\"\n_Good = TicketApp\nclass _PostOk(_Good):\n    def handle(self, method, path, body=\"\"):\n        s, b = super().handle(method, path, body)\n        return (200 if s == 201 else s), b\nclass _NoDelete(_Good):\n    def handle(self, method, path, body=\"\"):\n        if method == \"DELETE\" and path.startswith(\"/tickets/\") and int(path.split(\"/\")[2]) in self.tickets:\n            return 204, \"\"\n        return super().handle(method, path, body)\nfor _cls, _msg in ((_PostOk, \"POST 201 орнына 200 қайтарады\"), (_NoDelete, \"DELETE билетті өшірмейді\")):\n    TicketApp = _cls\n    _bad = _run(TicketApiTests).wasSuccessful()\n    TicketApp = _Good\n    assert not _bad, \"Тесттер бұзылған қосымшаны ұстамады: \" + _msg"
    }
   },
   {
    "title": "Testing error cases",
    "prompt": "<code>parse_age(text)</code> turns a string into an age: spaces are removed; if the text is not digits or the age is outside the range 0–120, it raises <code>ValueError</code>. Write <code>AgeTests(unittest.TestCase)</code> (at least 3 tests). The check runs on three broken versions: (1) it accepts a negative age (<code>\"-5\"</code>), (2) it returns <code>None</code> for <code>\"abc\"</code>, (3) it accepts a value above 120. Your tests must fail on each of them.",
    "hints": [
     "A separate test for each error case: <code>with self.assertRaises(ValueError): parse_age(\"-5\")</code>.",
     "Boundary: <code>\"120\"</code> is valid, <code>\"121\"</code> is not."
    ],
    "check": {
     "tests": "import io as _io, unittest as _ut\ndef _run(_cls):\n    return _ut.TextTestRunner(stream=_io.StringIO()).run(_ut.defaultTestLoader.loadTestsFromTestCase(_cls))\n\n_r = _run(AgeTests)\nassert _r.testsRun >= 3 and _r.wasSuccessful(), \"At least 3 tests, and they must pass on the correct function\"\n_good = parse_age\ndef _m1(text):\n    age = int(text.strip())\n    if age > 120:\n        raise ValueError(\"x\")\n    return age\ndef _m2(text):\n    text = text.strip()\n    if not text.lstrip(\"-\").isdigit():\n        return None\n    age = int(text)\n    if not 0 <= age <= 120:\n        raise ValueError(\"x\")\n    return age\ndef _m3(text):\n    text = text.strip()\n    if not text.isdigit():\n        raise ValueError(\"x\")\n    return int(text)\nfor _mut, _msg in ((_m1, \"теріс жас қабылданады\"), (_m2, \"'abc' үшін ValueError жоқ\"), (_m3, \"120-дан үлкен жас қабылданады\")):\n    parse_age = _mut\n    _bad = _run(AgeTests).wasSuccessful()\n    parse_age = _good\n    assert not _bad, \"Тесттер бұзылған нұсқаны ұстамады: \" + _msg"
    }
   }
  ]
 },
 "pyb-9": {
  "pr": [
   {
    "title": "Postcode",
    "prompt": "A postcode in Kazakhstan is exactly 6 digits (for example, <code>050000</code>). Check <code>is_postcode(s)</code> with <code>re.fullmatch</code> and return <code>True</code> / <code>False</code>.",
    "hints": [
     "<code>re.match</code> checks only the start, so <code>\"0500001\"</code> would also pass.",
     "<code>re.fullmatch(r\"\\d{6}\", s)</code>"
    ],
    "check": {
     "tests": "assert is_postcode(\"050000\") is True, \"050000 is a valid postcode\"\nassert is_postcode(\"0500001\") is False, \"7 digits: False\"\nassert is_postcode(\"05000\") is False, \"5 digits: False\"\nassert is_postcode(\"05 000\") is False and is_postcode(\"A50000\") is False, \"A space or letters: False\""
    }
   },
   {
    "title": "Finding numbers",
    "prompt": "The function <code>extract_numbers(text)</code> must find all the integers in the text with <code>re.findall</code> and return a list of <code>int</code>. <code>extract_numbers(\"2 латте, 1 раф, 3500 ₸\")</code> → <code>[2, 1, 3500]</code>.",
    "hints": [
     "<code>re.findall(r\"\\d+\", text)</code> gives a list of strings.",
     "Convert each one to an <code>int</code>."
    ],
    "check": {
     "tests": "assert extract_numbers(\"2 латте, 1 раф, 3500 ₸\") == [2, 1, 3500], \"extract_numbers('2 латте, 1 раф, 3500 ₸') must be [2, 1, 3500]\"\nassert extract_numbers(\"сан жоқ\") == [], \"No numbers: []\"\nassert extract_numbers(\"№12-автобус 07:45\") == [12, 7, 45], \"№12-автобус 07:45 → [12, 7, 45]\""
    }
   },
   {
    "title": "Squeezing spaces",
    "prompt": "The function <code>squeeze(text)</code> must replace any run of whitespace characters (space, tab, newline) in the text with one space (<code>re.sub</code>) and trim the ends with <code>strip</code>. <code>squeeze(\"  Абай   даңғылы\\t10 \")</code> → <code>\"Абай даңғылы 10\"</code>.",
    "hints": [
     "<code>\\s+</code> means one or more whitespace characters.",
     "<code>re.sub(r\"\\s+\", \" \", text).strip()</code>"
    ],
    "check": {
     "tests": "assert squeeze(\"  Абай   даңғылы\\t10 \") == \"Абай даңғылы 10\", \"squeeze('  Абай   даңғылы\\\\t10 ') must return 'Абай даңғылы 10'\"\nassert squeeze(\"Сәтпаев\\n\\nкөшесі\") == \"Сәтпаев көшесі\", \"Line breaks also become one space\"\nassert squeeze(\"   \") == \"\", \"Only spaces: an empty string\""
    }
   },
   {
    "title": "Checking an IIN",
    "prompt": "An IIN is 12 digits; the first six are the date of birth <code>YYMMDD</code>: the month <code>01</code>–<code>12</code>, the day <code>01</code>–<code>31</code>. The function <code>is_iin(s)</code> must check the format with one regex (<code>fullmatch</code>). We do not compute the check digit.",
    "hints": [
     "Month: <code>(0[1-9]|1[0-2])</code>; day: <code>(0[1-9]|[12]\\d|3[01])</code>.",
     "At the end, 6 more digits: <code>\\d{6}</code>."
    ],
    "check": {
     "tests": "assert is_iin(\"990315300123\") is True, \"990315300123 is correct: 15 March\"\nassert is_iin(\"051231600456\") is True, \"051231600456 is correct: 31 December\"\nassert is_iin(\"991315300123\") is False, \"No month 13: False\"\nassert is_iin(\"990300300123\") is False, \"No day 00: False\"\nassert is_iin(\"99031530012\") is False and is_iin(\"9903153001234\") is False, \"11 or 13 digits: False\""
    }
   },
   {
    "title": "Car number plate",
    "prompt": "A Kazakhstani car number plate: 3 digits, 3 capital Latin letters and a two-digit region code <code>01</code>–<code>20</code> (for example, <code>123ABC02</code>; it may also be written with spaces: <code>123 ABC 02</code>). The function <code>parse_plate(text)</code> must remove the spaces and, using a regex with named groups, return <code>{\"number\": \"123\", \"letters\": \"ABC\", \"region\": 2}</code>; if it does not match, <code>None</code>.",
    "hints": [
     "Named group: <code>(?P&lt;number&gt;\\d{3})</code>; region: <code>(0[1-9]|1\\d|20)</code>.",
     "<code>m.groupdict()</code>, then convert <code>region</code> to an <code>int</code>."
    ],
    "check": {
     "tests": "assert parse_plate(\"123ABC02\") == {\"number\": \"123\", \"letters\": \"ABC\", \"region\": 2}, \"123ABC02 → number 123, letters ABC, region 2\"\nassert parse_plate(\"777 KZT 17\") == {\"number\": \"777\", \"letters\": \"KZT\", \"region\": 17}, \"A number written with spaces\"\nassert parse_plate(\"123ABC21\") is None, \"Region code 21 does not exist: None\"\nassert parse_plate(\"123abc02\") is None, \"Lowercase letters: None\"\nassert parse_plate(\"12ABC02\") is None, \"Two digits: None\""
    }
   },
   {
    "title": "Hashtags",
    "prompt": "The function <code>hashtags(text)</code> must return the tags of the form <code>#word</code> from the text (after <code>#</code> come letters, digits, <code>_</code>, Cyrillic too), in lower case, without repeats, in the order of first appearance. <code>hashtags(\"#Наурыз мерекесі! #наурыз #Алматы2026\")</code> → <code>[\"наурыз\", \"алматы2026\"]</code>.",
    "hints": [
     "If the pattern is <code>#(\\w+)</code>, then <code>findall</code> returns only the group (without <code>#</code>).",
     "To avoid repeats: <code>if tag not in result: result.append(tag)</code>"
    ],
    "check": {
     "tests": "assert hashtags(\"#Наурыз мерекесі! #наурыз #Алматы2026\") == [\"наурыз\", \"алматы2026\"], \"hashtags(...) must be ['наурыз', 'алматы2026']\"\nassert hashtags(\"Тег жоқ\") == [], \"No tags: []\"\nassert hashtags(\"#kofe_bar, #kofe_bar #Тараз\") == [\"kofe_bar\", \"тараз\"], \"The _ sign is part of a tag, a comma is not\""
    }
   },
   {
    "title": "Changing the date format",
    "prompt": "The API gives dates in ISO format (<code>2026-03-22</code>), while a Kazakhstani user finds <code>22.03.2026</code> more convenient. The function <code>iso_to_kz(text)</code> must replace all the <code>YYYY-MM-DD</code> dates in the text with the form <code>DD.MM.YYYY</code> using <code>re.sub</code> and a group reference (<code>\\3.\\2.\\1</code>). Only change dates that stand alone: if a digit is next to a date (for example, <code>12026-03-221</code>), it must not change (<code>\\b</code>).",
    "hints": [
     "Three groups: <code>(\\d{4})-(\\d{2})-(\\d{2})</code>; the replacement string is <code>r\"\\3.\\2.\\1\"</code>.",
     "Boundaries: put the pattern between <code>\\b</code>."
    ],
    "check": {
     "tests": "assert iso_to_kz(\"Наурыз: 2026-03-22, Жаңа жыл: 2027-01-01.\") == \"Наурыз: 22.03.2026, Жаңа жыл: 01.01.2027.\", \"Both dates must be replaced\"\nassert iso_to_kz(\"Күн жоқ\") == \"Күн жоқ\", \"If there are no dates, the text does not change\"\nassert iso_to_kz(\"код 12026-03-221\") == \"код 12026-03-221\", \"A long sequence of digits is not a date\""
    }
   },
   {
    "title": "Parsing a log line",
    "prompt": "An nginx access log line: <code>192.168.0.7 - [16/Oct/2026:14:30:01] \"GET /cafes?city=Almaty HTTP/1.1\" 200 512</code>. The function <code>parse_log(line)</code> must return a dictionary using one regex with named groups: <code>ip</code>, <code>time</code> (the text inside the square brackets), <code>method</code>, <code>path</code>, <code>status</code> (int), <code>size</code> (int). If the line does not match, <code>None</code>.",
    "hints": [
     "IP: <code>\\d{1,3}(?:\\.\\d{1,3}){3}</code>; time: <code>\\[(?P&lt;time&gt;[^\\]]+)\\]</code>.",
     "Request part: <code>\"(?P&lt;method&gt;[A-Z]+) (?P&lt;path&gt;\\S+) HTTP/[\\d.]+\"</code>"
    ],
    "check": {
     "tests": "_l = '192.168.0.7 - [16/Oct/2026:14:30:01] \"GET /cafes?city=Almaty HTTP/1.1\" 200 512'\nassert parse_log(_l) == {\"ip\": \"192.168.0.7\", \"time\": \"16/Oct/2026:14:30:01\", \"method\": \"GET\", \"path\": \"/cafes?city=Almaty\", \"status\": 200, \"size\": 512}, \"The result of parse_log(...) is wrong\"\n_p = parse_log('10.0.0.1 - [17/Oct/2026:09:00:00] \"POST /v1/orders HTTP/2\" 201 48')\nassert _p[\"method\"] == \"POST\" and _p[\"status\"] == 201 and _p[\"size\"] == 48, \"A POST line: 201, 48\"\nassert parse_log(\"бұзық жол\") is None, \"If it does not match: None\"\nassert parse_log('10.0.0.1 - [x] \"GET / HTTP/1.1\" 2000 1') is None, \"The status must be 3 digits\""
    }
   }
  ]
 },
 "pyb-10": {
  "pr": [
   {
    "title": "Coroutine object",
    "prompt": "Write the function <code>async def greet(name)</code>: it must return <code>f\"Сәлем, {name}!\"</code>. Then write into the variable <code>kind</code> the name of the type of the object returned by the call <code>greet(\"Дана\")</code> (<code>type(...).__name__</code>), and close the coroutine with <code>.close()</code>.",
    "hints": [
     "Calling an <code>async def</code> function does not run it; it returns a coroutine object.",
     "<code>c = greet(\"Дана\")</code>, <code>kind = type(c).__name__</code>, <code>c.close()</code>"
    ],
    "check": {
     "tests": "import inspect as _inspect\nassert _inspect.iscoroutinefunction(greet), \"greet must be written with async def\"\nassert kind == \"coroutine\", \"kind must be 'coroutine'\"\n_c = greet(\"Ерлан\")\ntry:\n    _c.send(None)\n    _val = None\nexcept StopIteration as _e:\n    _val = _e.value\nassert _val == \"Сәлем, Ерлан!\", \"When the coroutine runs, it must return 'Сәлем, Ерлан!'\""
    }
   },
   {
    "title": "Waiting time",
    "prompt": "A server sends requests to three external services, and each waits for the number of milliseconds given in the list <code>durations</code>. The function <code>total_wait(durations, concurrent)</code>: for sequential requests (<code>concurrent=False</code>) the total time is the sum; for simultaneous requests (<code>True</code>) it is the longest. For an empty list the result is 0.",
    "hints": [
     "For simultaneous requests the waits overlap, so you need <code>max</code>.",
     "On an empty list <code>max</code> raises an error: check it first."
    ],
    "check": {
     "tests": "assert total_wait([20, 300, 150], concurrent=False) == 470, \"Sequentially: 20 + 300 + 150 = 470\"\nassert total_wait([20, 300, 150], concurrent=True) == 300, \"Simultaneously: the longest is 300\"\nassert total_wait([], concurrent=True) == 0, \"Empty list: 0\""
    }
   },
   {
    "title": "Background queue",
    "prompt": "A handler puts heavy work into a queue and returns <code>202</code> straight away. Write the class <code>TaskQueue</code> (using <code>collections.deque</code>): <code>submit(name)</code> puts the task at the end of the queue and returns <code>(202, {\"task_id\": n})</code> (<code>n</code> increases from 1); <code>work()</code> takes the task at the front of the queue, adds it to the list <code>done</code>, and returns its name (if the queue is empty — <code>None</code>).",
    "hints": [
     "<code>submit</code>: <code>self.queue.append(name)</code>, an id counter.",
     "<code>work</code>: <code>self.queue.popleft()</code>, on an empty queue <code>None</code>."
    ],
    "check": {
     "tests": "_q = TaskQueue()\nassert _q.submit(\"чек PDF\") == (202, {\"task_id\": 1}), \"submit: (202, {'task_id': 1})\"\nassert _q.submit(\"SMS хабар\") == (202, {\"task_id\": 2}), \"The second task: task_id 2\"\nassert _q.work() == \"чек PDF\" and _q.work() == \"SMS хабар\", \"Tasks run in queue order\"\nassert _q.work() is None and _q.done == [\"чек PDF\", \"SMS хабар\"], \"Empty queue: None; the done list is filled\""
    }
   },
   {
    "title": "TTL cache",
    "prompt": "An exchange rate must be kept in a cache for 60 seconds. Write <code>TTLCache(ttl, clock)</code>: <code>set(key, value)</code> stores the value together with the time it was saved; <code>get(key)</code> returns the value if it exists and <code>clock() - saved_time &lt; ttl</code>, otherwise <code>None</code> (it deletes the expired record).",
    "hints": [
     "Store the time together with the value: <code>self.data[key] = (value, self.clock())</code>.",
     "<code>get</code>: if it has expired — <code>del</code> and <code>None</code>."
    ],
    "check": {
     "tests": "class _Clock:\n    def __init__(self):\n        self.t = 0\n    def __call__(self):\n        return self.t\n_c = _Clock()\n_cache = TTLCache(60, _c)\n_cache.set(\"USD\", 470)\n_c.t = 59\nassert _cache.get(\"USD\") == 470, \"After 59 seconds the value is still there\"\n_c.t = 60\nassert _cache.get(\"USD\") is None, \"After 60 seconds it expires\"\nassert \"USD\" not in _cache.data, \"An expired record must be deleted\"\nassert _cache.get(\"EUR\") is None, \"No such key: None\"\n_cache.set(\"EUR\", 510); _c.t = 100\nassert _cache.get(\"EUR\") == 510, \"The time of a new record is counted from the moment of set\""
    }
   },
   {
    "title": "Fixed window limit",
    "prompt": "The simplest rate limiter is the fixed window: time is divided into windows of <code>window</code> seconds (<code>int(clock() // window)</code>), and in each window, no more than <code>limit</code> requests are allowed for one key. The method <code>allow(key)</code> of the class <code>FixedWindow(limit, window, clock)</code> returns <code>True</code> if the request is allowed, otherwise <code>False</code> (429).",
    "hints": [
     "The counter key: <code>(key, int(self.clock() // self.window))</code>.",
     "If the limit is reached, return <code>False</code>; otherwise increase the counter and return <code>True</code>."
    ],
    "check": {
     "tests": "class _Clock:\n    def __init__(self):\n        self.t = 0.0\n    def __call__(self):\n        return self.t\n_c = _Clock()\n_fw = FixedWindow(limit=2, window=60, clock=_c)\nassert [_fw.allow(\"ip1\") for _ in range(3)] == [True, True, False], \"Only 2 requests in one window\"\nassert _fw.allow(\"ip2\") is True, \"Each key has its own counter\"\n_c.t = 59.9\nassert _fw.allow(\"ip1\") is False, \"At 59.9 seconds it is still the first window\"\n_c.t = 60\nassert _fw.allow(\"ip1\") is True, \"In a new window the counter starts from zero\""
    }
   },
   {
    "title": "Retry",
    "prompt": "A background task can fail because of a temporary error (a network break). The function <code>retry(func, attempts)</code> must call <code>func()</code>: if an exception is raised, try again, up to <code>attempts</code> times in total. If it succeeds, return the result; if all attempts fail, <code>re-raise</code> the <b>last</b> exception (<code>raise</code>).",
    "hints": [
     "In the loop: <code>try: return func()</code>, <code>except Exception as e: last = e</code>.",
     "After the loop: <code>raise last</code>."
    ],
    "check": {
     "tests": "_n = {\"calls\": 0}\ndef _flaky():\n    _n[\"calls\"] += 1\n    if _n[\"calls\"] < 3:\n        raise ConnectionError(f\"әрекет {_n['calls']}\")\n    return \"SMS жіберілді\"\nassert retry(_flaky, 5) == \"SMS жіберілді\" and _n[\"calls\"] == 3, \"The third attempt succeeds: 3 calls\"\n_n[\"calls\"] = 0\n_err = None\ntry:\n    retry(_flaky, 2)\nexcept ConnectionError as _e:\n    _err = str(_e)\nassert _err == \"әрекет 2\" and _n[\"calls\"] == 2, \"2 failed attempts: the last exception ('әрекет 2') is raised\""
    }
   },
   {
    "title": "Order of task completion",
    "prompt": "Write the scheduler with the fake clock from the lesson: each task is a generator, and <code>yield</code> gives \"how many seconds I will wait\". The function <code>finish_order(tasks)</code> runs a <code>heapq</code> queue of <code>(time, index, generator)</code> and returns the list of <code>(time, index)</code> in the order the tasks finish. If the times are equal, the smaller index goes first.",
    "hints": [
     "At the start: <code>queue = [(0, i, t) for i, t in enumerate(tasks)]</code>, then <code>heapq.heapify(queue)</code>.",
     "<code>next(task)</code> gives the waiting time; <code>StopIteration</code> means the task has finished."
    ],
    "check": {
     "tests": "_tasks = [order([3, 1]), order([1, 1]), order([5])]\nassert finish_order(_tasks) == [(2, 1), (4, 0), (5, 2)], \"Finishing order: (2, 1), (4, 0), (5, 2)\"\nassert finish_order([order([2]), order([2])]) == [(2, 0), (2, 1)], \"If the times are equal, the smaller index goes first\"\nassert finish_order([order([])]) == [(0, 0)], \"A task without waiting finishes at 0\"\nassert finish_order([]) == [], \"No tasks: []\""
    }
   },
   {
    "title": "Sliding window",
    "prompt": "A fixed window lets through twice as many requests at the boundary. Write <code>SlidingLog(limit, window, clock)</code>: for each key it keeps the times of recent requests in a <code>deque</code>. <code>allow(key)</code>: first remove from the left the old times (<code>&lt;=</code>) that are not later than <code>now - window</code>; if fewer than <code>limit</code> remain, add <code>now</code> and return <code>True</code>, otherwise <code>False</code>.",
    "hints": [
     "<code>log = self.logs.setdefault(key, deque())</code>",
     "Removing old ones: <code>while log and log[0] <= now - self.window: log.popleft()</code>"
    ],
    "check": {
     "tests": "class _Clock:\n    def __init__(self):\n        self.t = 0.0\n    def __call__(self):\n        return self.t\n_c = _Clock()\n_sl = SlidingLog(limit=2, window=10, clock=_c)\n_c.t = 9\nassert _sl.allow(\"u\") and _sl.allow(\"u\"), \"The first 2 requests pass\"\n_c.t = 11\nassert _sl.allow(\"u\") is False, \"t=11: there are 2 requests in the last 10 seconds (t=9), 429\"\n_c.t = 19\nassert _sl.allow(\"u\") is True, \"t=19: the requests from t=9 have left the window\"\nassert _sl.allow(\"v\") is True, \"Each key separately\"\nassert len(_sl.logs[\"u\"]) == 1, \"Old times must be removed from the deque\""
    }
   }
  ]
 },
 "pyb-11": {
  "pr": [
   {
    "title": "Boolean value of an env variable",
    "prompt": "Environment variables are always strings. The function <code>env_bool(env, key)</code> must return <code>True</code> if the value is <code>\"1\"</code>, <code>\"true\"</code>, <code>\"yes\"</code> or <code>\"on\"</code> (case-insensitive, without spaces), and <code>False</code> for any other value or if the key is missing. <code>env_bool({\"DEBUG\": \"False\"}, \"DEBUG\")</code> → <code>False</code>.",
    "hints": [
     "<code>bool(\"False\")</code> is <code>True</code>, so the string must be compared.",
     "<code>env.get(key, \"\").strip().lower() in {...}</code>"
    ],
    "check": {
     "tests": "assert env_bool({\"DEBUG\": \"False\"}, \"DEBUG\") is False, \"The string 'False' must give False\"\nassert env_bool({\"DEBUG\": \" TRUE \"}, \"DEBUG\") is True, \"' TRUE ' → True\"\nassert env_bool({\"USE_CACHE\": \"1\"}, \"USE_CACHE\") is True and env_bool({\"X\": \"on\"}, \"X\") is True, \"'1', 'on' → True\"\nassert env_bool({}, \"DEBUG\") is False, \"Key missing: False\""
    }
   },
   {
    "title": "Number of workers",
    "prompt": "The basic rule for Gunicorn: <code>2 × cores + 1</code>. The function <code>workers(cores, max_workers=17)</code> must return the number of workers, but not more than <code>max_workers</code>. If the number of cores is less than 1, raise <code>ValueError</code>.",
    "hints": [
     "<code>min(2 * cores + 1, max_workers)</code>",
     "First check <code>cores < 1</code>."
    ],
    "check": {
     "tests": "assert workers(2) == 5, \"2 cores: 5 workers\"\nassert workers(4) == 9, \"4 cores: 9 workers\"\nassert workers(16) == 17 and workers(4, max_workers=6) == 6, \"Not more than max_workers\"\n_ok = False\ntry:\n    workers(0)\nexcept ValueError:\n    _ok = True\nassert _ok, \"0 cores: ValueError\""
    }
   },
   {
    "title": "Port mapping",
    "prompt": "In docker-compose, <code>ports: [\"8000:80\"]</code> means \"host port : container port\". The function <code>parse_port(mapping)</code> must return a tuple of integers <code>(host, container)</code>. If the format is wrong (no colon, not a number, a port outside the range 1–65535) — <code>ValueError</code>.",
    "hints": [
     "<code>parts = mapping.split(\":\")</code>, both parts must pass <code>isdigit()</code>.",
     "Port range: <code>1 <= p <= 65535</code>."
    ],
    "check": {
     "tests": "assert parse_port(\"8000:80\") == (8000, 80), \"parse_port('8000:80') must be (8000, 80)\"\nassert parse_port(\"5432:5432\") == (5432, 5432), \"The same ports\"\nfor _bad in (\"8000\", \"abc:80\", \"8000:70000\", \"0:80\", \"1:2:3\"):\n    _ok = False\n    try:\n        parse_port(_bad)\n    except ValueError:\n        _ok = True\n    assert _ok, f\"parse_port({_bad!r}) must raise ValueError\""
    }
   },
   {
    "title": "Required variables",
    "prompt": "The application checks its settings before it starts. The function <code>missing_vars(env, required)</code> returns the names of the variables from the <code>required</code> list that are missing from env or whose value is empty (only spaces), in the given order. The function <code>startup_check(env, required)</code>: if nothing is missing — <code>\"ok\"</code>; otherwise it raises <code>RuntimeError(\"Жетіспейді: A, B\")</code>.",
    "hints": [
     "Check the empty value too: <code>not env.get(k, \"\").strip()</code>.",
     "<code>raise RuntimeError(\"Жетіспейді: \" + \", \".join(missing))</code>"
    ],
    "check": {
     "tests": "_env = {\"DATABASE_URL\": \"postgres://db/kofe\", \"SECRET_KEY\": \"  \", \"DEBUG\": \"false\"}\n_req = [\"DATABASE_URL\", \"SECRET_KEY\", \"REDIS_URL\"]\nassert missing_vars(_env, _req) == [\"SECRET_KEY\", \"REDIS_URL\"], \"Empty and missing variables: ['SECRET_KEY', 'REDIS_URL']\"\nassert startup_check(_env, [\"DATABASE_URL\"]) == \"ok\", \"Everything is there: 'ok'\"\n_msg = None\ntry:\n    startup_check(_env, _req)\nexcept RuntimeError as _e:\n    _msg = str(_e)\nassert _msg == \"Жетіспейді: SECRET_KEY, REDIS_URL\", \"The RuntimeError message: 'Жетіспейді: SECRET_KEY, REDIS_URL'\""
    }
   },
   {
    "title": "Gunicorn command",
    "prompt": "Let us build the command for <code>CMD</code> in a Dockerfile as a list. The function <code>gunicorn_cmd(app, workers=4, port=8000, host=\"0.0.0.0\")</code> must return <code>[\"gunicorn\", \"--workers\", \"4\", \"--bind\", \"0.0.0.0:8000\", \"app:app\"]</code> (all items are strings). If <code>app</code> is not in the form <code>\"module:object\"</code>, raise <code>ValueError</code>.",
    "hints": [
     "Turn the numbers into strings: <code>str(workers)</code>, <code>f\"{host}:{port}\"</code>.",
     "Check: all three parts from <code>app.partition(\":\")</code> must be non-empty."
    ],
    "check": {
     "tests": "assert gunicorn_cmd(\"app:app\") == [\"gunicorn\", \"--workers\", \"4\", \"--bind\", \"0.0.0.0:8000\", \"app:app\"], \"The default command is wrong\"\nassert gunicorn_cmd(\"kofe.wsgi:application\", workers=9, port=5000) == [\"gunicorn\", \"--workers\", \"9\", \"--bind\", \"0.0.0.0:5000\", \"kofe.wsgi:application\"], \"workers=9, port=5000\"\nfor _bad in (\"app\", \":app\", \"app:\"):\n    _ok = False\n    try:\n        gunicorn_cmd(_bad)\n    except ValueError:\n        _ok = True\n    assert _ok, f\"gunicorn_cmd({_bad!r}) must raise ValueError\""
    }
   },
   {
    "title": "Parsing DATABASE_URL",
    "prompt": "The function <code>parse_db_url(url)</code> parses an address like <code>postgres://kofe:pw@db:5432/kofe</code> with a regex with named groups and returns a dictionary: <code>scheme</code>, <code>user</code>, <code>password</code>, <code>host</code>, <code>port</code> (int; if not given — <code>5432</code>), <code>name</code>. If the address does not match — <code>ValueError</code>.",
    "hints": [
     "The port is optional: <code>(?::(?P&lt;port&gt;\\d+))?</code>.",
     "<code>m.groupdict()</code>; if there is no port, you get <code>None</code>."
    ],
    "check": {
     "tests": "assert parse_db_url(\"postgres://kofe:pw@db:5432/kofe\") == {\"scheme\": \"postgres\", \"user\": \"kofe\", \"password\": \"pw\", \"host\": \"db\", \"port\": 5432, \"name\": \"kofe\"}, \"The result of parse_db_url(...) is wrong\"\nassert parse_db_url(\"postgres://admin:s3cret@10.0.0.5/shop\")[\"port\"] == 5432, \"No port: 5432\"\nassert parse_db_url(\"mysql://root:x@localhost:3306/app\")[\"port\"] == 3306, \"Port as int: 3306\"\n_ok = False\ntry:\n    parse_db_url(\"db:5432/kofe\")\nexcept ValueError:\n    _ok = True\nassert _ok, \"Wrong format: ValueError\""
    }
   },
   {
    "title": "Configuration layers",
    "prompt": "The function <code>load_config(defaults, env_text, overrides)</code> collects the settings from three layers: <code>defaults</code> → the <code>.env</code> text → <code>overrides</code> (the last one wins). In <code>.env</code>, empty lines and <code>#</code> lines are skipped; split at the first <code>=</code>; the key and the value are trimmed with <code>strip</code>. Values in the file are strings: if the value in <code>defaults</code> is an <code>int</code>, convert it to <code>int</code>; if it is a <code>bool</code>, then <code>\"true\"/\"1\"</code> → <code>True</code>, anything else → <code>False</code>. Keys that are not in <code>defaults</code> stay as strings.",
    "hints": [
     "For type conversion, check <code>bool</code> first (because <code>bool</code> is a subclass of <code>int</code>).",
     "Order: <code>dict(defaults)</code> → the .env strings → <code>config.update(overrides)</code>."
    ],
    "check": {
     "tests": "_defaults = {\"PORT\": 8000, \"DEBUG\": False, \"WORKERS\": 4, \"CITY\": \"Алматы\"}\n_env = \"\"\"\n# production\nPORT=9000\nDEBUG = true\nSENTRY_DSN=https://key@sentry.io/1\nWORKERS=4\n\"\"\"\n_cfg = load_config(_defaults, _env, {\"WORKERS\": 9})\nassert _cfg[\"PORT\"] == 9000 and isinstance(_cfg[\"PORT\"], int), \"PORT comes from .env and is converted to int\"\nassert _cfg[\"DEBUG\"] is True, \"DEBUG='true' → True\"\nassert _cfg[\"WORKERS\"] == 9, \"overrides has the highest priority\"\nassert _cfg[\"CITY\"] == \"Алматы\", \"A key missing from .env is taken from defaults\"\nassert _cfg[\"SENTRY_DSN\"] == \"https://key@sentry.io/1\", \"A key missing from defaults stays a string\"\nassert load_config({\"DEBUG\": True}, \"DEBUG=no\", {})[\"DEBUG\"] is False, \"DEBUG='no' → False\"\nassert _defaults[\"PORT\"] == 8000, \"defaults must not change\""
    }
   },
   {
    "title": "CI pipeline",
    "prompt": "CI/CD: if the tests fail, there is no deploy. The function <code>run_pipeline(steps)</code> must run the steps <code>(name, function)</code> in order. If the function returns <code>False</code> or raises an exception, the step has failed: the pipeline stops there. Result: <code>{\"status\": \"success\" or \"failed\", \"ran\": [names of the steps that ran], \"failed\": the name of the failed step or None}</code>.",
    "hints": [
     "Call each step inside <code>try/except Exception</code>.",
     "On a failed step, <code>return {\"status\": \"failed\", ...}</code> right away — the next steps are not run."
    ],
    "check": {
     "tests": "_log = []\ndef _lint():\n    _log.append(\"lint\"); return True\ndef _tests():\n    _log.append(\"tests\"); raise AssertionError(\"test_order_qty құлады\")\ndef _deploy():\n    _log.append(\"deploy\"); return True\nassert run_pipeline([(\"lint\", _lint), (\"tests\", _tests), (\"deploy\", _deploy)]) == {\"status\": \"failed\", \"ran\": [\"lint\", \"tests\"], \"failed\": \"tests\"}, \"If the tests fail, the pipeline stops\"\nassert \"deploy\" not in _log, \"If the tests fail, deploy must not run\"\nassert run_pipeline([(\"lint\", _lint), (\"build\", lambda: False)])[\"failed\"] == \"build\", \"A step that returns False also fails\"\nassert run_pipeline([(\"lint\", _lint), (\"deploy\", _deploy)]) == {\"status\": \"success\", \"ran\": [\"lint\", \"deploy\"], \"failed\": None}, \"If everything passes: success\""
    }
   }
  ]
 },
 "pyb-12": {
  "pr": [
   {
    "title": "Checking the URL scheme",
    "prompt": "The shortener accepts only <code>http</code> and <code>https</code> links (not <code>javascript:</code> or <code>ftp://</code>). The function <code>is_http_url(url)</code> must return <code>True</code> if the address starts with <code>http://</code> or <code>https://</code> and is followed by non-empty text without spaces.",
    "hints": [
     "Check the two prefixes: <code>url.startswith(\"https://\")</code>.",
     "The part after the prefix must not be empty and must not contain spaces."
    ],
    "check": {
     "tests": "assert is_http_url(\"https://kaspi.kz/shop\") is True, \"An https link is correct\"\nassert is_http_url(\"http://egov.kz\") is True, \"An http link is correct\"\nassert is_http_url(\"ftp://files.kz\") is False, \"ftp is not allowed\"\nassert is_http_url(\"javascript:alert(1)\") is False, \"javascript: is not allowed\"\nassert is_http_url(\"https://\") is False and is_http_url(\"https://a b.kz\") is False, \"An empty address or an address with spaces: False\""
    }
   },
   {
    "title": "Short link",
    "prompt": "The function <code>short_url(base, code)</code> must build a short link: <code>base</code> may or may not end with <code>/</code>, but the result must contain exactly one <code>/</code>. <code>short_url(\"https://tq.kz/\", \"q0U\")</code> → <code>\"https://tq.kz/q0U\"</code>.",
    "hints": [
     "<code>base.rstrip(\"/\")</code> removes the trailing slash.",
     "<code>base.rstrip(\"/\") + \"/\" + code</code>"
    ],
    "check": {
     "tests": "assert short_url(\"https://tq.kz/\", \"q0U\") == \"https://tq.kz/q0U\", \"short_url('https://tq.kz/', 'q0U') must be 'https://tq.kz/q0U'\"\nassert short_url(\"https://tq.kz\", \"nauryz\") == \"https://tq.kz/nauryz\", \"It works when base does not end with /\""
    }
   },
   {
    "title": "Click ranking",
    "prompt": "<code>links</code> is a dictionary of code → <code>{\"url\": ..., \"clicks\": n}</code>. The function <code>top_links(links, n)</code> must return a list of the <code>n</code> codes with the most clicks: by clicks from high to low, and if clicks are equal, by code in alphabetical order.",
    "hints": [
     "If you sort a dictionary, its keys are sorted: <code>sorted(links, key=...)</code>.",
     "Key: <code>lambda c: (-links[c][\"clicks\"], c)</code>"
    ],
    "check": {
     "tests": "_l = {\"q0U\": {\"url\": \"https://a.kz\", \"clicks\": 5}, \"nauryz\": {\"url\": \"https://b.kz\", \"clicks\": 12}, \"abc\": {\"url\": \"https://c.kz\", \"clicks\": 5}, \"zz\": {\"url\": \"https://d.kz\", \"clicks\": 0}}\nassert top_links(_l, 3) == [\"nauryz\", \"abc\", \"q0U\"], \"top_links(_l, 3) must be ['nauryz', 'abc', 'q0U']\"\nassert top_links(_l, 1) == [\"nauryz\"], \"top_links(_l, 1) must be ['nauryz']\"\nassert top_links({}, 5) == [], \"No links: []\""
    }
   },
   {
    "title": "Encoding in any base",
    "prompt": "Let us generalise Base62. The function <code>encode_base(n, alphabet)</code> must convert a non-negative number into the number system with the given alphabet (the base is <code>len(alphabet)</code>), and the function <code>decode_base(s, alphabet)</code> must convert it back. <code>encode_base(255, \"0123456789abcdef\")</code> → <code>\"ff\"</code>; <code>encode_base(0, ...)</code> → the first character of the alphabet.",
    "hints": [
     "<code>divmod(n, base)</code> gives the last \"digit\"; put the result together in reverse order.",
     "Horner's scheme: <code>n = n * base + alphabet.index(ch)</code>"
    ],
    "check": {
     "tests": "_hex = \"0123456789abcdef\"\nassert encode_base(255, _hex) == \"ff\" and decode_base(\"ff\", _hex) == 255, \"255 ↔ 'ff'\"\nassert encode_base(5, \"01\") == \"101\", \"Binary: 5 → '101'\"\nassert encode_base(0, _hex) == \"0\", \"0 → the first character of the alphabet\"\n_b36 = \"0123456789abcdefghijklmnopqrstuvwxyz\"\nassert encode_base(100000, _b36) == \"255s\", \"Base36: 100000 → '255s'\"\nassert all(decode_base(encode_base(_n, _b36), _b36) == _n for _n in (1, 35, 36, 99999, 10**9)), \"decode(encode(n)) must equal n\""
    }
   },
   {
    "title": "Checking an alias",
    "prompt": "The function <code>check_alias(alias, taken)</code> checks the alias chosen by the user and returns an error text or <code>None</code> (the order of the checks matters): if it does not match the pattern <code>[A-Za-z0-9_-]{3,20}</code> (<code>fullmatch</code>) — <code>\"alias форматы қате\"</code>; if it is a reserved word (<code>RESERVED</code>, case-insensitive) — <code>\"alias резервте\"</code>; if it is in the set <code>taken</code> — <code>\"alias бос емес\"</code>.",
    "hints": [
     "<code>ALIAS_RE = re.compile(r\"[A-Za-z0-9_-]{3,20}\")</code>, then <code>fullmatch</code>.",
     "Reserved: <code>alias.lower() in RESERVED</code>"
    ],
    "check": {
     "tests": "_taken = {\"nauryz\", \"q0U\"}\nassert check_alias(\"kofe-2026\", _taken) is None, \"A correct alias: None\"\nassert check_alias(\"ab\", _taken) == \"alias форматы қате\", \"2 characters: wrong format\"\nassert check_alias(\"наурыз\", _taken) == \"alias форматы қате\", \"Cyrillic: wrong format\"\nassert check_alias(\"Health\", _taken) == \"alias резервте\", \"A reserved word (case-insensitive)\"\nassert check_alias(\"nauryz\", _taken) == \"alias бос емес\", \"A non-empty alias\""
    }
   },
   {
    "title": "Next free code",
    "prompt": "The automatic code <code>encode(next_id)</code> may clash with a user's alias. The function <code>next_code(next_id, taken)</code> starts from <code>encode(next_id)</code>, skips the codes that are taken, and returns the first free code and the next id to use as <code>(code, new_next_id)</code>. The function <code>encode</code> is ready.",
    "hints": [
     "<code>while code in taken:</code> increase the id and recalculate the code.",
     "At the end, <code>(code, next_id + 1)</code>."
    ],
    "check": {
     "tests": "assert encode(100000) == \"q0U\", \"encode must not change\"\nassert next_code(100000, set()) == (\"q0U\", 100001), \"If it is free: ('q0U', 100001)\"\nassert next_code(100000, {\"q0U\", \"q0V\"}) == (\"q0W\", 100003), \"Taken codes are skipped: ('q0W', 100003)\"\nassert next_code(61, {\"Z\"}) == (\"10\", 63), \"61 → 'Z' is taken, 62 → '10'\""
    }
   },
   {
    "title": "Clicks statistics by day",
    "prompt": "The <code>ClickLog</code> class counts the clicks for each code by day. The method <code>record(code, day)</code> — <code>day</code> is a string like <code>\"2026-03-22\"</code>. The method <code>stats(code)</code>: if there are no clicks — <code>(404, {\"error\": \"not found\"})</code>; if there are — <code>(200, {\"code\": ..., \"total\": N, \"by_day\": {day: n}, \"best_day\": ...})</code>, the keys of <code>by_day</code> are in date order, and <code>best_day</code> is the day with the most clicks (if tied — the earlier day).",
    "hints": [
     "<code>defaultdict(Counter)</code>: code → (day → number of clicks).",
     "In a tie, the earlier day wins: <code>max(sorted(counter), key=lambda d: counter[d])</code> — <code>max</code> returns the first of the largest."
    ],
    "check": {
     "tests": "_log = ClickLog()\nfor _d in [\"2026-03-22\", \"2026-03-21\", \"2026-03-22\", \"2026-03-23\", \"2026-03-21\"]:\n    _log.record(\"nauryz\", _d)\n_s, _b = _log.stats(\"nauryz\")\nassert _s == 200 and _b[\"total\"] == 5, \"total = 5\"\nassert _b[\"by_day\"] == {\"2026-03-21\": 2, \"2026-03-22\": 2, \"2026-03-23\": 1}, \"Counting by day\"\nassert list(_b[\"by_day\"]) == [\"2026-03-21\", \"2026-03-22\", \"2026-03-23\"], \"The keys of by_day are in date order\"\nassert _b[\"best_day\"] == \"2026-03-21\" and _b[\"code\"] == \"nauryz\", \"best_day: in a tie, the earlier day\"\nassert _log.stats(\"q0U\") == (404, {\"error\": \"not found\"}), \"No clicks: 404\""
    }
   },
   {
    "title": "Link with an expiry date",
    "prompt": "A promotional link must work only until a certain time. Write <code>ExpiringShortener</code> (the method <code>encode</code> is ready): <code>create(url, ttl, now)</code> — the code is <code>encode(self.next_id)</code> (the id starts at 100000 and grows); it saves the link as <code>{\"url\", \"expires\": now + ttl, \"clicks\": 0}</code> and returns <code>(201, {\"code\": code, \"url\": url})</code>; if the URL does not start with <code>http(s)://</code>, it returns <code>(422, {\"errors\": {\"url\": \"http(s) URL керек\"}})</code>. The method <code>resolve(code, now)</code>: an unknown code → <code>(404, {\"error\": \"not found\"})</code>; <code>now &gt;= expires</code> → <code>(410, {\"error\": \"expired\"})</code>; otherwise one click is added and <code>(302, {\"location\": url})</code>.",
    "hints": [
     "URL check: <code>re.fullmatch(r\"https?://\\S+\", url)</code>.",
     "The order of checks in resolve: unknown code (404) → expiry (410) → click and 302."
    ],
    "check": {
     "tests": "_s = ExpiringShortener()\nassert _s.create(\"https://kaspi.kz/sale\", ttl=3600, now=1000) == (201, {\"code\": \"q0U\", \"url\": \"https://kaspi.kz/sale\"}), \"The first code q0U\"\nassert _s.create(\"https://halyk.kz\", ttl=10, now=1000)[1][\"code\"] == \"q0V\", \"The next id: q0V\"\nassert _s.create(\"ftp://files.kz\", ttl=10, now=0) == (422, {\"errors\": {\"url\": \"http(s) URL керек\"}}), \"ftp: 422\"\nassert _s.resolve(\"q0U\", now=2000) == (302, {\"location\": \"https://kaspi.kz/sale\"}), \"Not expired: 302\"\nassert _s.links[\"q0U\"][\"clicks\"] == 1, \"The click must be counted\"\nassert _s.resolve(\"q0V\", now=1010) == (410, {\"error\": \"expired\"}), \"now >= expires: 410\"\nassert _s.links[\"q0V\"][\"clicks\"] == 0, \"After expiry the click is not counted\"\nassert _s.resolve(\"zzz\", now=0) == (404, {\"error\": \"not found\"}), \"No code: 404\""
    }
   }
  ]
 }
} });
