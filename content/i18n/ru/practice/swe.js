// swe practice tasks: Russian text. Code, solutions and checks are in content/practice/swe.js.
DJ.i18n.patch({ lessons: {
 "swe-1": {
  "pr": [
   {
    "title": "Очистка номера телефона",
    "prompt": "<p>Напишите функцию <code>clean_phone(text)</code>: она должна оставить в тексте только цифры и вернуть их строкой. Например, <code>\"+7 (701) 123-45-67\"</code> → <code>\"77011234567\"</code>. Результат нужно вернуть через <code>return</code>.</p>",
    "hints": [
     "Проверяйте каждый символ с помощью <code>ch.isdigit()</code>.",
     "Чтобы склеить цифры в одну строку, используйте <code>''.join(...)</code>."
    ],
    "check": {
     "tests": "assert clean_phone('+7 (701) 123-45-67') == '77011234567', 'clean_phone(\"+7 (701) 123-45-67\") должна вернуть \"77011234567\"'\nassert clean_phone('8 777 000 11 22') == '87770001122', 'Пробелы тоже должны удаляться'\nassert clean_phone('') == '', 'Для пустого текста должна возвращаться пустая строка'"
    }
   },
   {
    "title": "Цена с НДС",
    "prompt": "<p>Напишите функцию <code>price_with_vat(price, rate=0.12)</code>: она должна прибавить к цене НДС, округлить результат до 2 знаков и вернуть его. Если <code>rate</code> не передан, используется 12%. Например, <code>price_with_vat(1000)</code> → <code>1120.0</code>, <code>price_with_vat(1000, 0.1)</code> → <code>1100.0</code>.</p>",
    "hints": [
     "Значение по умолчанию: <code>def price_with_vat(price, rate=0.12):</code>.",
     "<code>round(price * (1 + rate), 2)</code>."
    ],
    "check": {
     "tests": "assert price_with_vat(1000) == 1120.0, 'price_with_vat(1000) должна вернуть 1120.0 (rate по умолчанию 0.12)'\nassert price_with_vat(1000, 0.1) == 1100.0, 'price_with_vat(1000, 0.1) должна вернуть 1100.0'\nassert price_with_vat(999, 0) == 999, 'При rate=0 цена не меняется'\nassert price_with_vat(12.5) == 14.0, 'Округлите результат до 2 знаков'"
    }
   },
   {
    "title": "Функция с docstring",
    "prompt": "<p>Напишите функцию <code>normalize_city(name)</code>: она должна убрать пробелы по краям, сделать первую букву заглавной, а остальные строчными (<code>\" аЛМАТЫ \"</code> → <code>\"Алматы\"</code>). Напишите <b>docstring</b>, который объясняет, что делает функция.</p>",
    "hints": [
     "<code>name.strip().capitalize()</code>.",
     "Docstring пишется в первой строке функции в три кавычки: <code>\"\"\"...\"\"\"</code>."
    ],
    "check": {
     "tests": "assert normalize_city(' аЛМАТЫ ') == 'Алматы', 'normalize_city(\" аЛМАТЫ \") должна вернуть \"Алматы\"'\nassert normalize_city('шымкент') == 'Шымкент', 'normalize_city(\"шымкент\") должна вернуть \"Шымкент\"'\nassert normalize_city.__doc__ and normalize_city.__doc__.strip(), 'Напишите docstring для функции'"
    }
   },
   {
    "title": "Стоимость доставки",
    "prompt": "<p>Напишите функцию <code>delivery_cost(weight_kg, city='Алматы')</code>. В Алматы базовая цена 1000 ₸, в другие города 2000 ₸. Если вес больше 5 кг, за каждый неполный килограмм сверх 5 кг добавляется 200 ₸ (5.5 кг → 1 кг, 7 кг → 2 кг). Результат — <code>int</code>. Например, <code>delivery_cost(3)</code> → <code>1000</code>, <code>delivery_cost(7, 'Астана')</code> → <code>2400</code>.</p>",
    "hints": [
     "Базовая цена: <code>1000 if city == 'Алматы' else 2000</code>.",
     "Округлите перевес вверх: <code>math.ceil(weight_kg - 5)</code>, а если результат отрицательный, то 0."
    ],
    "check": {
     "tests": "assert delivery_cost(3) == 1000, 'delivery_cost(3) должна вернуть 1000 (город по умолчанию Алматы)'\nassert delivery_cost(5) == 1000, 'Ровно 5 кг: доплаты нет'\nassert delivery_cost(7, 'Астана') == 2400, 'delivery_cost(7, \"Астана\") должна вернуть 2400'\nassert delivery_cost(5.5) == 1200, '5.5 кг: перевес 0.5 кг считается как полный 1 кг, итого 1200'\nassert isinstance(delivery_cost(10, 'Орал'), int), 'Результат должен быть int'\nassert delivery_cost(10, 'Орал') == 3000, 'delivery_cost(10, \"Орал\") должна вернуть 3000'"
    }
   },
   {
    "title": "Повторное использование функции",
    "prompt": "<p><code>parse_price(text)</code> уже готова. Напишите функцию <code>total_price(texts)</code>: она должна вернуть сумму списка цен, заданных строками. Не копируйте логику обработки каждой цены, а вызывайте <code>parse_price</code>. Например, <code>total_price([\"12 500 ₸\", \"990₸\"])</code> → <code>13490</code>.</p>",
    "hints": [
     "<code>sum(parse_price(t) for t in texts)</code>.",
     "Сумма пустого списка равна 0."
    ],
    "check": {
     "tests": "assert total_price(['12 500 ₸', '990₸']) == 13490, 'total_price([\"12 500 ₸\", \"990₸\"]) должна вернуть 13490'\nassert total_price([]) == 0, 'Для пустого списка результат 0'\n_orig = parse_price\n_calls = []\ndef parse_price(text):\n    _calls.append(text)\n    return _orig(text)\n_r = total_price(['100 ₸', '200 ₸'])\nparse_price = _orig\nassert _r == 300 and len(_calls) == 2, 'Внутри total_price не копируйте логику, вызовите parse_price'"
    }
   },
   {
    "title": "Фильтрация заказов",
    "prompt": "<p>Напишите функцию <code>filter_orders(orders, min_amount=0, city=None)</code>: она должна вернуть список заказов, у которых <code>amount &gt;= min_amount</code>. Если передан <code>city</code>, остаются только заказы этого города; если <code>None</code>, то заказы всех городов. Порядок в списке должен сохраниться.</p>",
    "hints": [
     "Задайте значения по умолчанию для обоих параметров: <code>min_amount=0, city=None</code>.",
     "Проверяйте город только тогда, когда <code>city is not None</code>."
    ],
    "check": {
     "tests": "_ids = lambda xs: [o['id'] for o in xs]\nassert _ids(filter_orders(orders)) == [1, 2, 3, 4], 'Без параметров должны вернуться все заказы'\nassert _ids(filter_orders(orders, 1000)) == [1, 2, 4], 'filter_orders(orders, 1000) → заказы 1, 2, 4'\nassert _ids(filter_orders(orders, city='Алматы')) == [1, 3], 'city=\"Алматы\" оставляет только заказы Алматы'\nassert _ids(filter_orders(orders, 1000, 'Алматы')) == [1], 'Оба условия должны работать вместе'\nassert filter_orders(orders, city='Орал') == [], 'Для города без заказов — пустой список'"
    }
   },
   {
    "title": "Разбор чека",
    "prompt": "<p>Текст чека приходит в виде строк: в каждой строке <code>атауы — баға</code> (тире <code>—</code>). Напишите две функции:<br>• <code>parse_line(line)</code> → <code>(атауы, баға)</code>, цена <code>int</code>: <code>\"Сүт — 1 290 ₸\"</code> → <code>(\"Сүт\", 1290)</code>;<br>• <code>receipt_total(text)</code> → сумма всех строк (пустые строки не учитываются), она должна использовать <code>parse_line</code>.</p>",
    "hints": [
     "Разделите строку по тире: <code>name, price = line.split('—')</code>, затем очистите обе части с помощью <code>strip()</code>.",
     "Пропускайте пустую строку: <code>if line.strip():</code>."
    ],
    "check": {
     "tests": "assert parse_line('Сүт — 1 290 ₸') == ('Сүт', 1290), 'parse_line(\"Сүт — 1 290 ₸\") должна вернуть (\"Сүт\", 1290)'\nassert parse_line('Нан — 250₸') == ('Нан', 250), 'Цена с лишними пробелами тоже должна обрабатываться'\nassert receipt_total(receipt) == 4990, 'receipt_total(receipt) должна вернуть 4990'\nassert receipt_total('') == 0, 'Для пустого чека результат 0'\nassert receipt_total('Қант — 600 ₸\\n\\n\\nШай — 1 000 ₸') == 1600, 'Пустые строки не должны учитываться'"
    }
   },
   {
    "title": "Итоги продаж",
    "prompt": "<p>Напишите функцию <code>summary(orders, city=None)</code>: она должна вернуть словарь <code>{'count': саны, 'total': қосындысы, 'avg': орташасы}</code>. Если передан <code>city</code>, считаются только заказы этого города. Среднее значение округлите до 2 знаков. Если заказов нет, <code>0.0</code> (без деления на ноль).</p>",
    "hints": [
     "Сначала соберите нужные суммы в список: <code>[o['amount'] for o in orders if city is None or o['city'] == city]</code>.",
     "Среднее: <code>round(total / count, 2) if count else 0.0</code>."
    ],
    "check": {
     "tests": "assert summary(orders) == {'count': 3, 'total': 25500, 'avg': 8500.0}, 'summary(orders) по всем заказам должна дать count=3, total=25500, avg=8500.0'\nassert summary(orders, 'Алматы') == {'count': 2, 'total': 17500, 'avg': 8750.0}, 'По Алматы: count=2, total=17500, avg=8750.0'\nassert summary(orders, 'Орал') == {'count': 0, 'total': 0, 'avg': 0.0}, 'Если заказов нет, avg=0.0, без ошибки'\nassert summary([{'city': 'Алматы', 'amount': 1}, {'city': 'Алматы', 'amount': 2}, {'city': 'Алматы', 'amount': 2}])['avg'] == 1.67, 'Округлите среднее до 2 знаков'"
    }
   }
  ]
 },
 "swe-2": {
  "pr": [
   {
    "title": "Типы в цене такси",
    "prompt": "<p>Добавьте type hints к функции <code>taxi_fare(km)</code>: <code>km: float</code>, а возвращать она должна <code>int</code>. Цена: 500 ₸ посадка и 120 ₸ за каждый километр, результат через <code>round</code> приводится к целому числу. Например, <code>taxi_fare(4.5)</code> → <code>1040</code>.</p>",
    "hints": [
     "После параметра пишем <code>: float</code>, после скобки — <code>-&gt; int</code>.",
     "<code>round(...)</code> возвращает целое число."
    ],
    "check": {
     "tests": "_a = taxi_fare.__annotations__\nassert _a.get('km') is float, 'Для параметра km hint должен быть float'\nassert _a.get('return') is int, 'Hint для возвращаемого значения: -> int'\nassert taxi_fare(4.5) == 1040 and isinstance(taxi_fare(4.5), int), 'taxi_fare(4.5) должна вернуть 1040 (int)'\nassert taxi_fare(0.0) == 500, 'taxi_fare(0.0) должна вернуть 500'"
    }
   },
   {
    "title": "Подсчёт городов",
    "prompt": "<p>Напишите функцию <code>count_cities(cities)</code> с hints. Она принимает <code>cities: list[str]</code> и возвращает <code>dict[str, int]</code> — сколько раз встретился каждый город. Например, <code>[\"Алматы\", \"Астана\", \"Алматы\"]</code> → <code>{\"Алматы\": 2, \"Астана\": 1}</code>.</p>",
    "hints": [
     "Hints: <code>cities: list[str]</code> и <code>-&gt; dict[str, int]</code>.",
     "<code>result[c] = result.get(c, 0) + 1</code>."
    ],
    "check": {
     "tests": "_a = count_cities.__annotations__\nassert _a.get('cities') == list[str], 'Hint для cities: list[str]'\nassert _a.get('return') == dict[str, int], 'Hint для возвращаемого значения: dict[str, int]'\nassert count_cities(['Алматы', 'Астана', 'Алматы']) == {'Алматы': 2, 'Астана': 1}, 'Неверное количество городов'\nassert count_cities([]) == {}, 'Для пустого списка — пустой словарь'"
    }
   },
   {
    "title": "Функция, которая ничего не возвращает",
    "prompt": "<p>Напишите функцию <code>add_reading(log, temp)</code>: она добавляет температуру в список <code>log</code> и ничего не возвращает. Hints: <code>log: list[float]</code>, <code>temp: float</code>, возвращаемое значение <code>None</code> (<code>-&gt; None</code>).</p>",
    "hints": [
     "<code>log.append(temp)</code> меняет сам список.",
     "Hint для возвращаемого значения: <code>-&gt; None</code>."
    ],
    "check": {
     "tests": "_a = add_reading.__annotations__\nassert _a.get('log') == list[float] and _a.get('temp') is float, 'Hints: log: list[float], temp: float'\nassert 'return' in _a and _a['return'] is None, 'Hint для возвращаемого значения: -> None'\n_l = [1.0]\n_r = add_reading(_l, -3.5)\nassert _l == [1.0, -3.5], 'Температура должна добавиться в список log'\nassert _r is None, 'Функция не должна ничего возвращать'"
    }
   },
   {
    "title": "Первый мороз",
    "prompt": "<p>Напишите функцию <code>first_frost(temps)</code> с hints: она принимает <code>temps: list[float]</code> и возвращает <code>float | None</code>. Она должна вернуть первую отрицательную температуру из списка, а если отрицательных нет, <code>None</code>. Например, <code>[5.0, 1.5, -2.0, -7.0]</code> → <code>-2.0</code>.</p>",
    "hints": [
     "Внутри цикла <code>if t &lt; 0: return t</code>.",
     "Когда цикл закончится, <code>return None</code>. Hint: <code>-&gt; float | None</code>."
    ],
    "check": {
     "tests": "import typing as _t\n_a = first_frost.__annotations__\nassert _a.get('temps') == list[float], 'Hint для temps: list[float]'\nassert set(_t.get_args(_a.get('return'))) == {float, type(None)}, 'Hint для возвращаемого значения: float | None'\nassert first_frost([5.0, 1.5, -2.0, -7.0]) == -2.0, 'first_frost([5.0, 1.5, -2.0, -7.0]) должна вернуть -2.0'\nassert first_frost([3.0, 0.0]) is None, 'Если нет отрицательной температуры, None (0 не отрицательный)'\nassert first_frost([]) is None, 'Для пустого списка None'"
    }
   },
   {
    "title": "Чтение аннотаций",
    "prompt": "<p>Напишите функцию <code>hinted_params(func)</code>: она должна вернуть список имён <b>параметров</b> из <code>func.__annotations__</code>, у которых есть hint (ключ <code>'return'</code> не учитывать). Например, для <code>def f(city: str, days: int) -&gt; float</code> результат <code>[\"city\", \"days\"]</code>.</p>",
    "hints": [
     "<code>func.__annotations__</code> — это словарь, его ключи — имена параметров.",
     "<code>[n for n in func.__annotations__ if n != 'return']</code>."
    ],
    "check": {
     "tests": "def _f(city: str, days: int) -> float:\n    return 0.0\ndef _g(x, y: int):\n    return x\ndef _h():\n    pass\nassert hinted_params(_f) == ['city', 'days'], 'Для f(city: str, days: int) -> float результат [\"city\", \"days\"]'\nassert hinted_params(_g) == ['y'], 'Параметр без hint в список не попадает'\nassert hinted_params(_h) == [], 'Если hint нет, вернуть пустой список'"
    }
   },
   {
    "title": "Средние оценки учеников",
    "prompt": "<p>Напишите функцию <code>average_scores(scores)</code> с hints: она принимает <code>scores: dict[str, list[int]]</code> (ученик → оценки) и возвращает <code>dict[str, float]</code> — средний балл каждого ученика, округлённый до 2 знаков. Ученику без оценок — <code>0.0</code>.</p>",
    "hints": [
     "Hints: <code>scores: dict[str, list[int]]</code>, <code>-&gt; dict[str, float]</code>.",
     "Пустой список проверяйте отдельно: <code>... if s else 0.0</code>."
    ],
    "check": {
     "tests": "_a = average_scores.__annotations__\nassert _a.get('scores') == dict[str, list[int]], 'Hint для scores: dict[str, list[int]]'\nassert _a.get('return') == dict[str, float], 'Hint для возвращаемого значения: dict[str, float]'\nassert average_scores({'Айгерім': [5, 4, 5], 'Ерлан': [3, 4]}) == {'Айгерім': 4.67, 'Ерлан': 3.5}, 'Неверные средние баллы (округлите до 2 знаков)'\nassert average_scores({'Дана': []}) == {'Дана': 0.0}, 'Ученику без оценок — 0.0'"
    }
   },
   {
    "title": "Проверка типов аргументов",
    "prompt": "<p>Python сам не проверяет hints. Напишите функцию <code>check_args(func, kwargs)</code>: для каждого параметра (кроме <code>return</code>) она берёт значение из <code>func.__annotations__</code> и проверяет его через <code>kwargs</code> <code>isinstance</code>. Она должна вернуть список ошибок в формате <code>\"&lt;параметр&gt;: &lt;тип атауы&gt; күтілді\"</code>, например <code>\"days: int күтілді\"</code>. Если параметра <code>kwargs</code> нет, добавьте ошибку <code>\"&lt;параметр&gt;: жоқ\"</code>. Считайте, что hint-ы — это только простые типы (<code>int</code>, <code>float</code>, <code>str</code>).</p>",
    "hints": [
     "<code>for name, tp in func.__annotations__.items():</code>, пропустите ключ <code>return</code>.",
     "Название типа: <code>tp.__name__</code>."
    ],
    "check": {
     "tests": "assert check_args(forecast, {'city': 'Алматы', 'days': 3, 'temp': 21.5}) == [], 'Для правильных аргументов список пустой'\nassert check_args(forecast, {'city': 'Алматы', 'days': '3', 'temp': 21.5}) == ['days: int күтілді'], 'Текст \"3\" — не int: [\"days: int күтілді\"]'\nassert check_args(forecast, {'city': 42, 'temp': 'жылы'}) == ['city: str күтілді', 'days: жоқ', 'temp: float күтілді'], 'Ошибки должны идти в порядке параметров, а отсутствующий параметр — \"days: жоқ\"'\ndef _g(name: str) -> None:\n    pass\nassert check_args(_g, {'name': 'Ерлан'}) == [], 'Hint для return не проверяется'"
    }
   },
   {
    "title": "Лучший месяц",
    "prompt": "<p>Напишите функцию <code>best_month(sales)</code> с hints: она принимает <code>sales: dict[str, list[int]]</code> (месяц → продажи по дням) и возвращает <code>tuple[str, int] | None</code> — месяц с самыми большими общими продажами и сумму за него. Если <code>sales</code> пуст, верните <code>None</code>. Например, <code>{\"наурыз\": [100, 200], \"сәуір\": [500]}</code> → <code>(\"сәуір\", 500)</code>.</p>",
    "hints": [
     "Сначала считаем сумму за каждый месяц: <code>{m: sum(d) for m, d in sales.items()}</code>, потом берём <code>max(totals, key=totals.get)</code>.",
     "Возвращаемое значение: <code>-&gt; tuple[str, int] | None</code>."
    ],
    "check": {
     "tests": "import typing as _t\n_a = best_month.__annotations__\nassert _a.get('sales') == dict[str, list[int]], 'Hint для sales: dict[str, list[int]]'\nassert set(_t.get_args(_a.get('return'))) == {tuple[str, int], type(None)}, 'Hint для возвращаемого значения: tuple[str, int] | None'\nassert best_month({'наурыз': [100, 200], 'сәуір': [500]}) == ('сәуір', 500), 'Самые большие продажи — сәуір, 500'\nassert best_month({'мамыр': [10, 20, 30], 'маусым': [], 'шілде': [59]}) == ('мамыр', 60), 'Пустой список даёт сумму 0, лучший месяц — мамыр (60)'\nassert best_month({}) is None, 'Для пустого словаря None'"
    }
   }
  ]
 },
 "swe-3": {
  "pr": [
   {
    "title": "Класс кошелька",
    "prompt": "<p>Напишите класс <code>Wallet</code>. <code>__init__(owner, balance=0)</code> хранит владельца и баланс. <code>deposit(amount)</code> добавляет сумму к балансу и возвращает новый баланс. <code>withdraw(amount)</code> списывает сумму, если баланса хватает, и возвращает <code>True</code>; если не хватает, ничего не меняет и возвращает <code>False</code>.</p>",
    "hints": [
     "Внутри <code>__init__</code> запишите <code>self.owner = owner</code> и <code>self.balance = balance</code>.",
     "В <code>withdraw</code> проверка: <code>if amount &gt; self.balance: return False</code>."
    ],
    "check": {
     "tests": "_w = Wallet('Ерлан')\nassert _w.owner == 'Ерлан' and _w.balance == 0, 'Баланс по умолчанию 0, owner должен сохраняться'\nassert _w.deposit(3000) == 3000, 'deposit возвращает новый баланс'\nassert _w.withdraw(5000) is False and _w.balance == 3000, 'Если баланса не хватает, False, баланс не меняется'\nassert _w.withdraw(1000) is True and _w.balance == 2000, 'Если баланса хватает, True, и баланс уменьшается'\n_w2 = Wallet('Дана', 100)\nassert _w2.balance == 100 and _w.balance == 2000, 'У каждого объекта должен быть свой баланс'"
    }
   },
   {
    "title": "Заполнение средним",
    "prompt": "<p>Напишите класс <code>MeanImputer</code>: метод <code>fit(values)</code> вычисляет среднее значений, которые не равны <code>None</code>, сохраняет его в <code>self.mean_</code> и возвращает <code>self</code>; метод <code>transform(values)</code> возвращает новый список, где каждый <code>None</code> заменён на <code>mean_</code>.</p>",
    "hints": [
     "В <code>fit</code>: <code>known = [v for v in values if v is not None]</code>, затем среднее.",
     "В <code>transform</code>: <code>[self.mean_ if v is None else v for v in values]</code>."
    ],
    "check": {
     "tests": "_m = MeanImputer()\nassert _m.fit([10, None, 30]) is _m, 'fit() должен возвращать self'\nassert _m.mean_ == 20, 'mean_ = (10 + 30) / 2 = 20 (None не учитывается)'\nassert _m.transform([None, 5, None]) == [20, 5, 20], 'transform заменяет None на mean_'\nassert _m.transform([1, 2]) == [1, 2], 'Если None нет, список не меняется'"
    }
   },
   {
    "title": "Корзина покупок",
    "prompt": "<p>Напишите класс <code>Cart</code>: <code>__init__</code> создаёт пустой список <code>self.items</code>; <code>add(name, price, qty=1)</code> добавляет товар в виде <code>(name, price, qty)</code>; <code>total()</code> возвращает сумму всех <code>price * qty</code>.</p>",
    "hints": [
     "В <code>__init__</code> запишите <code>self.items = []</code>: у каждой корзины будет свой список.",
     "<code>sum(price * qty for _, price, qty in self.items)</code>."
    ],
    "check": {
     "tests": "_c = Cart()\nassert _c.items == [] and _c.total() == 0, 'Новая корзина пустая, total() равно 0'\n_c.add('Нан', 250, 2)\n_c.add('Сүт', 1290)\nassert _c.items == [('Нан', 250, 2), ('Сүт', 1290, 1)], 'add добавляет (name, price, qty), qty по умолчанию равно 1'\nassert _c.total() == 1790, 'total() = 250*2 + 1290 = 1790'\nassert Cart().items == [], 'У каждой корзины должен быть свой список items'"
    }
   },
   {
    "title": "Стандартизация",
    "prompt": "<p>Напишите класс <code>ZScaler</code>: <code>fit(values)</code> сохраняет среднее в <code>self.mean_</code>, стандартное отклонение (по всему набору, деля на <code>n</code>) в <code>self.std_</code> и возвращает <code>self</code>; <code>transform(values)</code> преобразует каждое значение в <code>(v - mean_) / std_</code>. Если <code>std_</code> равно 0, все результаты равны <code>0.0</code>.</p>",
    "hints": [
     "<code>std_ = (sum((v - mean_) ** 2 for v in values) / n) ** 0.5</code>.",
     "<code>transform</code> использует <code>mean_</code> и <code>std_</code>, полученные на train."
    ],
    "check": {
     "tests": "_s = ZScaler()\nassert _s.fit([2, 4, 4, 4, 5, 5, 7, 9]) is _s, 'fit() должен возвращать self'\nassert _s.mean_ == 5 and abs(_s.std_ - 2.0) < 1e-9, 'mean_ должен быть 5, std_ должен быть 2 ([2, 4, 4, 4, 5, 5, 7, 9])'\nassert _s.transform([5, 9, 1]) == [0.0, 2.0, -2.0], 'transform([5, 9, 1]) → [0.0, 2.0, -2.0]'\nassert ZScaler().fit([3, 3, 3]).transform([3, 10]) == [0.0, 0.0], 'Если std_ = 0, результат 0.0 (без деления на ноль)'"
    }
   },
   {
    "title": "Кодирование категорий",
    "prompt": "<p>Напишите класс <code>LabelEncoder</code>: <code>fit(values)</code> сортирует неповторяющиеся значения, сохраняет их в <code>self.classes_</code> и возвращает <code>self</code>; <code>transform(values)</code> заменяет каждое значение его индексом в <code>classes_</code>, а для значения, которого не было в train, ставит <code>-1</code>.</p>",
    "hints": [
     "<code>sorted(set(values))</code> — уникальные отсортированные значения.",
     "Словарь индексов: <code>{c: i for i, c in enumerate(self.classes_)}</code>, затем <code>.get(v, -1)</code>."
    ],
    "check": {
     "tests": "_e = LabelEncoder()\nassert _e.fit(['Астана', 'Алматы', 'Астана', 'Шымкент']) is _e, 'fit() должен возвращать self'\nassert _e.classes_ == ['Алматы', 'Астана', 'Шымкент'], 'classes_ — уникальные отсортированные значения'\nassert _e.transform(['Шымкент', 'Алматы', 'Астана']) == [2, 0, 1], 'transform заменяет значения индексами'\nassert _e.transform(['Орал']) == [-1], 'Значение, которого не было в train, → -1 (ошибки быть не должно)'"
    }
   },
   {
    "title": "Метод fit_transform",
    "prompt": "<p>Добавьте в класс <code>RangeScaler</code> метод <code>fit_transform(values)</code>: он должен вызывать существующие методы <code>fit</code> и <code>transform</code>, не записывая их заново (<code>self.fit(values).transform(values)</code>). Кроме того, результат <code>transform</code> обрежьте (clip) до диапазона от 0 до 1: значение меньше минимума из train → 0.0, больше максимума → 1.0.</p>",
    "hints": [
     "<code>def fit_transform(self, values): return self.fit(values).transform(values)</code>.",
     "Обрезка: <code>min(1.0, max(0.0, x))</code>."
    ],
    "check": {
     "tests": "_s = RangeScaler()\nassert _s.fit_transform([100, 300, 500]) == [0.0, 0.5, 1.0], 'fit_transform([100, 300, 500]) → [0.0, 0.5, 1.0]'\nassert _s.min_ == 100 and _s.max_ == 500, 'fit_transform должен вызывать fit и сохранять min_ и max_'\nassert _s.transform([0, 700, 200]) == [0.0, 1.0, 0.25], 'Значения вне диапазона должны обрезаться до 0.0 и 1.0'"
    }
   },
   {
    "title": "Маленький Pipeline",
    "prompt": "<p><code>MeanImputer</code> и <code>RangeScaler</code> уже готовы. Напишите класс <code>MiniPipeline(steps)</code>: <code>fit(values)</code> по очереди вызывает <code>fit</code> у каждого шага, передаёт следующему шагу результат своего <code>transform</code> и возвращает <code>self</code>; <code>transform(values)</code> по очереди применяет <code>transform</code> всех шагов.</p>",
    "hints": [
     "В <code>fit</code>: <code>values = step.fit(values).transform(values)</code> — следующий шаг получает уже обработанные данные.",
     "В <code>transform</code> только <code>values = step.transform(values)</code>."
    ],
    "check": {
     "tests": "_p = MiniPipeline([MeanImputer(), RangeScaler()])\nassert _p.fit([10, None, 30]) is _p, 'fit() должен возвращать self'\nassert _p.steps[0].mean_ == 20, 'Первый шаг (MeanImputer) должен быть обучен: mean_ = 20'\nassert _p.steps[1].min_ == 10 and _p.steps[1].max_ == 30, 'RangeScaler должен обучаться на заполненных данных (без None)'\nassert _p.transform([None, 30, 40]) == [0.5, 1.0, 1.5], 'transform([None, 30, 40]) → [0.5, 1.0, 1.5]'\nassert MiniPipeline([]).fit([1]).transform([5]) == [5], 'Если шагов нет, данные не меняются'"
    }
   },
   {
    "title": "Обёртка для цены квартиры",
    "prompt": "<p>Даны данные о квартирах в Алматы. Напишите обёртку <code>PriceModel</code>: <code>__init__(features, version='1.0.0')</code> сохраняет признаки и версию и создаёт <code>LinearRegression()</code>; <code>fit(df, target)</code> обучает модель только на колонках <code>self.features</code> и возвращает <code>self</code>; <code>predict_one(flat)</code> возвращает цену одной квартиры (млн ₸), округлённую до 1 знака, как <code>float</code> (в словаре могут быть лишние ключи). В конце выполните <code>pm = PriceModel(FEATURES).fit(flats, 'price_mln')</code>.</p>",
    "hints": [
     "<code>predict_one</code>: <code>pd.DataFrame([flat])[self.features]</code> убирает лишние ключи и сохраняет порядок.",
     "<code>round(float(self.model.predict(row)[0]), 1)</code>."
    ],
    "check": {
     "tests": "assert isinstance(pm, PriceModel), 'pm = PriceModel(FEATURES).fit(...) должен работать: fit() возвращает self'\nassert pm.features == FEATURES and pm.version == '1.0.0', '__init__ должен сохранять features и version (version по умолчанию 1.0.0)'\nassert hasattr(pm.model, 'coef_') and pm.model.n_features_in_ == 2, 'Модель должна обучаться только на колонках features'\n_p = pm.predict_one({'rooms': 2, 'area': 55, 'district': 'Бостандық'})\nassert isinstance(_p, float), 'predict_one должен возвращать float'\nassert abs(_p - 38.5) < 0.05, f'Цена квартиры 55 м² должна быть ≈ 38.5 млн ₸, у вас {_p}'\nassert pm.predict_one({'area': 100, 'rooms': 3}) > pm.predict_one({'area': 50, 'rooms': 3}), 'Большая квартира должна стоить дороже'\nassert PriceModel(FEATURES, version='2.0.0').version == '2.0.0', 'Параметр version должен сохраняться'"
    }
   }
  ]
 },
 "swe-4": {
  "pr": [
   {
    "title": "Тест суммы",
    "prompt": "<p>Функция <code>total(prices)</code> готова. Напишите тестовую функцию <code>test_total()</code>, которая проверит три случая: <code>[100, 200]</code> → 300, <code>[]</code> → 0, <code>[5]</code> → 5. На правильной функции тест должен проходить, а на неверных вариантах выдавать <code>AssertionError</code>.</p>",
    "hints": [
     "Один случай — одна строка: <code>assert total([100, 200]) == 300</code>.",
     "Пустой список и список из одного элемента — граничные случаи, не забудьте о них."
    ],
    "check": {
     "tests": "test_total()\n\ndef _catches(_bad):\n    global total\n    _ok_fn = total\n    total = _bad\n    try:\n        test_total()\n        return False\n    except Exception:\n        return True\n    finally:\n        total = _ok_fn\n\nassert _catches(lambda xs: xs[0] + xs[-1] if xs else 0), 'Ваш тест не проверяет случай [5]: неверная версия, которая складывает первый и последний элемент, проходит'\nassert _catches(lambda xs: sum(xs) if xs else None), 'Ваш тест не проверяет пустой список []'\nassert _catches(lambda xs: max(xs) * 2 if len(xs) > 1 else sum(xs)), 'Ваш тест не проверяет случай [100, 200] → 300'"
    }
   },
   {
    "title": "Assert с сообщением",
    "prompt": "<p>Напишите функцию <code>check_temperature(t)</code>: с помощью <code>assert</code> она проверяет, что температура находится в диапазоне от −60 до 60 (границы тоже допустимы). Если условие не выполнено, в сообщении <code>AssertionError</code> должно быть слово <code>\"температура\"</code>. Если всё верно, функция возвращает <code>t</code>.</p>",
    "hints": [
     "<code>assert шарт, 'хабар'</code> — если условие ложно, выбрасывается AssertionError с сообщением.",
     "<code>assert -60 &lt;= t &lt;= 60, f'температура аралықтан тыс: {t}'</code>."
    ],
    "check": {
     "tests": "assert check_temperature(-25) == -25 and check_temperature(60) == 60 and check_temperature(-60) == -60, 'Значение в диапазоне (включая границы) должно возвращаться'\nfor _v in [75, -61]:\n    try:\n        check_temperature(_v)\n    except AssertionError as _e:\n        assert 'температура' in str(_e), 'В сообщении AssertionError должно быть слово «температура»'\n    else:\n        raise AssertionError(f'check_temperature({_v}) AssertionError беруі керек')"
    }
   },
   {
    "title": "Исправление по тесту",
    "prompt": "<p>Коллега написал тест <code>test_average()</code>, но функция <code>average</code> падает на пустом списке. Не меняя тест, исправьте функцию: для пустого списка она должна возвращать <code>0</code>, в остальных случаях — среднее значение.</p>",
    "hints": [
     "Сначала проверьте пустой список: <code>if not xs: return 0</code>.",
     "Тест — это и есть требование: его не меняем, исправляем код."
    ],
    "check": {
     "tests": "test_average()\nassert average([1, 2, 3, 4]) == 2.5, 'average([1, 2, 3, 4]) должна вернуть 2.5'\nassert average([]) == 0, 'Для пустого списка 0'"
    }
   },
   {
    "title": "Тест по таблице",
    "prompt": "<p>Функция <code>is_valid_phone(s)</code> готова: номер правильный, если он начинается с <code>\"+7\"</code> и после этого идут ровно 10 цифр. Заполните список <code>CASES</code> парами <code>(кіріс, күтілетін нәтиже)</code> (не меньше 4 случаев: правильный номер, номер без <code>+7</code>, номер с меньшим количеством цифр, номер с нецифровым символом), а в <code>test_is_valid_phone()</code> проверьте их циклом (идея <code>parametrize</code> из pytest).</p>",
    "hints": [
     "Пары: <code>('+77011234567', True)</code>, <code>('87011234567', False)</code>, ...",
     "В цикле: <code>assert is_valid_phone(s) == expected, s</code>."
    ],
    "check": {
     "tests": "test_is_valid_phone()\nassert len(CASES) >= 4, 'В CASES должно быть не меньше 4 случаев'\n\ndef _catches(_bad):\n    global is_valid_phone\n    _ok_fn = is_valid_phone\n    is_valid_phone = _bad\n    try:\n        test_is_valid_phone()\n        return False\n    except Exception:\n        return True\n    finally:\n        is_valid_phone = _ok_fn\n\nassert _catches(lambda s: False), 'В вашем тесте нет правильного номера (случай с ожидаемым True)'\nassert _catches(lambda s: (s.startswith('+7') and len(s) == 12 and s[2:].isdigit()) or (len(s) == 11 and s.isdigit())), 'Ваш тест не проверяет номер без +7'\nassert _catches(lambda s: s.startswith('+7') and s[2:].isdigit()), 'Ваш тест не проверяет номер с меньшим количеством цифр'\nassert _catches(lambda s: s.startswith('+7') and len(s) == 12), 'Ваш тест не проверяет номер с нецифровым символом'"
    }
   },
   {
    "title": "Тест, который ждёт ошибку",
    "prompt": "<p>Функция <code>parse_age(text)</code> готова: она превращает текст в <code>int</code>, а если возраст отрицательный или больше 120, выбрасывает <code>ValueError</code>. Напишите <code>test_parse_age()</code>: (1) <code>\"25\"</code> → 25; (2) для <code>\"-3\"</code> должно выбрасываться <code>ValueError</code>; (3) для <code>\"абв\"</code> должно выбрасываться <code>ValueError</code>. pytest нет, поэтому используйте <code>try/except/else</code>.</p>",
    "hints": [
     "Шаблон: <code>try: parse_age('-3')</code> / <code>except ValueError: pass</code> / <code>else: raise AssertionError(...)</code>.",
     "Можно сложить два неверных входа в список и проверить их циклом."
    ],
    "check": {
     "tests": "test_parse_age()\n\ndef _catches(_bad):\n    global parse_age\n    _ok_fn = parse_age\n    parse_age = _bad\n    try:\n        test_parse_age()\n        return False\n    except Exception:\n        return True\n    finally:\n        parse_age = _ok_fn\n\ndef _no_range(t):\n    return int(t)\ndef _no_text(t):\n    try:\n        a = int(t)\n    except ValueError:\n        return 0\n    if a < 0:\n        raise ValueError('теріс')\n    return a\nassert _catches(_no_range), 'Ваш тест не проверяет ValueError для \"-3\"'\nassert _catches(_no_text), 'Ваш тест не проверяет ValueError для \"абв\"'\nassert _catches(lambda t: abs(int(t)) + 1 if int(t) >= 0 else int('x')), 'Ваш тест не проверяет случай \"25\" → 25'"
    }
   },
   {
    "title": "Функция fixture",
    "prompt": "<p>Сделаем fixture из pytest вручную. Напишите функцию <code>sample_orders()</code>: при каждом вызове она возвращает <b>новый</b> список: <code>[{'city': 'Алматы', 'amount': 100}, {'city': 'Астана', 'amount': 40}, {'city': 'Алматы', 'amount': 60}]</code>. Затем напишите <code>test_count_city(orders)</code>, которая проверяет, что верны оба условия: <code>count_city(orders, 'Алматы') == 2</code> и <code>count_city(orders, 'Орал') == 0</code>.</p>",
    "hints": [
     "Создавайте список внутри функции: тогда при каждом вызове будет новый объект.",
     "Тестовая функция получает данные как параметр: <code>def test_count_city(orders):</code>."
    ],
    "check": {
     "tests": "_a = sample_orders()\nassert isinstance(_a, list) and len(_a) == 3, 'sample_orders() должна возвращать список из 3 заказов'\n_a.append({'city': 'Орал', 'amount': 1})\nassert len(sample_orders()) == 3, 'Каждый вызов должен возвращать новый список (изменения одного теста не влияют на другой)'\ntest_count_city(sample_orders())\ndef _catches(_bad):\n    global count_city\n    _ok_fn = count_city\n    count_city = _bad\n    try:\n        test_count_city(sample_orders())\n        return False\n    except Exception:\n        return True\n    finally:\n        count_city = _ok_fn\nassert _catches(lambda orders, city: 0), 'Ваш тест не проверяет count_city(orders, \"Алматы\") == 2'\nassert _catches(lambda orders, city: 2), 'Ваш тест не проверяет count_city(orders, \"Орал\") == 0'"
    }
   },
   {
    "title": "Поиск мутантов",
    "prompt": "<p>Функция <code>to_gross(net, rate=0.12)</code> готова: она добавляет НДС, округляет до 2 знаков, а если <code>net</code> отрицательная, выбрасывает <code>ValueError</code>. Напишите <code>test_to_gross()</code>, который поймает все эти неверные версии: неверная ставка по умолчанию; параметр <code>rate</code> игнорируется; нет округления; отрицательная сумма не проверяется. Подсказка: <code>to_gross(1000)</code>, <code>to_gross(1000, 0.2)</code>, <code>to_gross(10.01)</code>, <code>to_gross(-5)</code>.</p>",
    "hints": [
     "По одному assert на каждый мутант: ставка по умолчанию, другая ставка, округление (<code>10.01 * 1.12 = 11.2112</code>), отрицательная сумма.",
     "Проверяйте ошибку через <code>try/except ValueError/else: raise AssertionError</code>."
    ],
    "check": {
     "tests": "test_to_gross()\n\ndef _catches(_bad):\n    global to_gross\n    _ok_fn = to_gross\n    to_gross = _bad\n    try:\n        test_to_gross()\n        return False\n    except Exception:\n        return True\n    finally:\n        to_gross = _ok_fn\n\ndef _chk(n):\n    if n < 0:\n        raise ValueError('bad')\ndef _m1(net, rate=0.1):\n    _chk(net)\n    return round(net * (1 + rate), 2)\ndef _m2(net, rate=0.12):\n    _chk(net)\n    return round(net * 1.12, 2)\ndef _m3(net, rate=0.12):\n    _chk(net)\n    return net * (1 + rate)\ndef _m4(net, rate=0.12):\n    return round(net * (1 + rate), 2)\nassert _catches(_m1), 'Ваш тест не проверяет ставку по умолчанию (0.12)'\nassert _catches(_m2), 'Ваш тест не проверяет параметр rate (например, to_gross(1000, 0.2) == 1200)'\nassert _catches(_m3), 'Ваш тест не проверяет округление (например, to_gross(10.01) == 11.21)'\nassert _catches(_m4), 'Ваш тест не проверяет ValueError для отрицательной суммы'"
    }
   },
   {
    "title": "Маленький запускатель тестов",
    "prompt": "<p>Напишите аналог pytest <code>run_tests(tests)</code>: <code>tests</code> — список тестовых функций. Вызовите каждую и верните результат в виде словаря <code>{'passed': өткендер саны, 'failed': құлаған тесттердің атаулары (<code>func.__name__</code>), 'errors': AssertionError емес қате берген тесттердің атаулары}</code>. Списки должны идти в порядке тестов.</p>",
    "hints": [
     "Вызовите каждый тест внутри <code>try: t()</code>; сначала <code>except AssertionError</code>, потом <code>except Exception</code>.",
     "Блок <code>else</code> — тест прошёл: <code>passed += 1</code>."
    ],
    "check": {
     "tests": "def test_a():\n    assert True\ndef test_b():\n    assert 2 * 2 == 5, 'математика'\ndef test_c():\n    return int('абв')\ndef test_d():\n    pass\n_r = run_tests([test_a, test_b, test_c, test_d])\nassert _r == {'passed': 2, 'failed': ['test_b'], 'errors': ['test_c']}, f'Результат неверный: {_r}'\nassert run_tests([]) == {'passed': 0, 'failed': [], 'errors': []}, 'Если тестов нет, passed=0, списки пустые'"
    }
   }
  ]
 },
 "swe-5": {
  "pr": [
   {
    "title": "Защита от деления на ноль",
    "prompt": "<p>Напишите функцию <code>safe_divide(a, b)</code>: она возвращает <code>a / b</code>, а если возникает <code>ZeroDivisionError</code> (когда <code>b == 0</code>), возвращает <code>None</code>. Используйте <code>try/except</code>. Например, <code>safe_divide(10, 4)</code> → <code>2.5</code>, <code>safe_divide(5, 0)</code> → <code>None</code>.</p>",
    "hints": [
     "<code>try: return a / b</code>, <code>except ZeroDivisionError: return None</code>.",
     "Не пишите голый <code>except:</code>: ловите только конкретную ошибку."
    ],
    "check": {
     "tests": "assert safe_divide(10, 4) == 2.5, 'safe_divide(10, 4) должна вернуть 2.5'\nassert safe_divide(5, 0) is None, 'safe_divide(5, 0) должна вернуть None'\ntry:\n    safe_divide('10', 2)\nexcept TypeError:\n    pass\nelse:\n    raise AssertionError('Тек ZeroDivisionError ұсталсын: мәтінді бөлу TypeError беруі керек')"
    }
   },
   {
    "title": "Собственный класс ошибки",
    "prompt": "<p>Напишите класс ошибки <code>DataQualityError</code> (он наследуется от <code>Exception</code>). Затем напишите функцию <code>check_bad_share(bad, total)</code>: если доля ошибочных строк больше 5% (<code>bad / total &gt; 0.05</code>), она выбрасывает <code>DataQualityError</code>, иначе возвращает долю.</p>",
    "hints": [
     "<code>class DataQualityError(Exception): pass</code>.",
     "<code>if share &gt; 0.05: raise DataQualityError(...)</code>."
    ],
    "check": {
     "tests": "assert issubclass(DataQualityError, Exception), 'DataQualityError должен наследоваться от Exception'\nassert check_bad_share(3, 100) == 0.03, 'check_bad_share(3, 100) должна вернуть 0.03'\nassert check_bad_share(5, 100) == 0.05, 'Ровно 5% — ещё допустимо'\ntry:\n    check_bad_share(6, 100)\nexcept DataQualityError:\n    pass\nelse:\n    raise AssertionError('6% болса DataQualityError лақтырылуы керек')"
    }
   },
   {
    "title": "Проверка возраста",
    "prompt": "<p>Напишите функцию <code>parse_age(text)</code>: она превращает текст в <code>int</code> (если текст не число, <code>int</code> сама выбрасывает <code>ValueError</code>); если возраст вне диапазона от 0 до 120, она выбрасывает <code>ValueError</code>, а в сообщении есть слово <code>\"жас\"</code>.</p>",
    "hints": [
     "<code>if not 0 &lt;= age &lt;= 120: raise ValueError('жас ...')</code>.",
     "Полезно добавить в сообщение само значение: <code>f'...: {age}'</code>."
    ],
    "check": {
     "tests": "assert parse_age('34') == 34 and parse_age('0') == 0 and parse_age('120') == 120, 'Возраст из диапазона должен возвращаться как int'\nfor _v in ['-1', '150']:\n    try:\n        parse_age(_v)\n    except ValueError as _e:\n        assert 'жас' in str(_e), 'В сообщении должно быть слово «жас»'\n    else:\n        raise AssertionError(f'parse_age({_v!r}) ValueError лақтыруы керек')\ntry:\n    parse_age('отыз')\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Сан емес мәтін ValueError беруі керек')"
    }
   },
   {
    "title": "Блок finally",
    "prompt": "<p>Напишите функцию <code>process(items, journal)</code>: в начале она добавляет в <code>journal</code> запись <code>'start'</code>, затем превращает каждый элемент в <code>int()</code> и возвращает сумму. Даже если ошибка возникла или не возникла, в конце в <code>journal</code> должна добавиться запись <code>'end'</code> (<code>finally</code>), а ошибка пусть поднимается выше.</p>",
    "hints": [
     "<code>try: return sum(...)</code>, <code>finally: journal.append('end')</code>.",
     "Не пишите <code>except</code>: ошибка должна подниматься выше, и только «очистка» выполняется всегда."
    ],
    "check": {
     "tests": "_j = []\nassert process(['1', '2', '3'], _j) == 6, 'process([\"1\", \"2\", \"3\"], j) должна вернуть 6'\nassert _j == ['start', 'end'], 'В успешном случае journal = [\"start\", \"end\"]'\n_j = []\ntry:\n    process(['1', 'екі'], _j)\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Қате жоғары кетуі керек (ValueError), оны жасырмаңыз')\nassert _j == ['start', 'end'], 'Даже при ошибке должна записываться \"end\" (finally)'"
    }
   },
   {
    "title": "Журнал по уровню",
    "prompt": "<p>Напишите функцию <code>report(bad, total, logger)</code>: если ошибочных строк нет, она пишет <code>logger.info(...)</code>; если их доля не больше 5%, пишет <code>logger.warning(...)</code>; если больше 5%, пишет <code>logger.error(...)</code>. При каждом вызове должна записываться ровно одна запись. В записи должно быть количество ошибочных строк.</p>",
    "hints": [
     "Три ветки: <code>if bad == 0</code> → info, <code>elif bad / total &lt;= 0.05</code> → warning, <code>else</code> → error.",
     "Передайте число как параметр в сообщение: <code>logger.warning('%s қате жол', bad)</code>."
    ],
    "check": {
     "tests": "import logging as _lg\nclass _H(_lg.Handler):\n    def __init__(self):\n        super().__init__()\n        self.records = []\n    def emit(self, record):\n        self.records.append(record)\n\n_h = _H()\n_l = _lg.getLogger('practice.report.test')\n_l.setLevel(_lg.DEBUG)\n_l.addHandler(_h)\n_l.propagate = False\nreport(0, 200, _l)\nreport(4, 100, _l)\nreport(17, 100, _l)\n_l.removeHandler(_h)\nassert len(_h.records) == 3, f'При каждом вызове должна записываться ровно одна запись: ожидалось 3, у вас {len(_h.records)}'\nassert [r.levelno for r in _h.records] == [_lg.INFO, _lg.WARNING, _lg.ERROR], 'Уровни: 0 ошибок → INFO, 4% → WARNING, 17% → ERROR'\nassert '17' in _h.records[2].getMessage() and '4' in _h.records[1].getMessage(), 'В записи должно быть количество ошибочных строк'"
    }
   },
   {
    "title": "Показания погоды",
    "prompt": "<p>Температуры с метеостанции приходят в виде текста, некоторые из них испорчены (<code>\"—\"</code>, <code>\"\"</code>, <code>\"n/a\"</code>). Напишите <code>parse_temps(values)</code>: каждое значение он превращает в <code>float</code>, а если это не получается, записывает <code>None</code>. Он должен вернуть <code>(temps, bad_count)</code>. Используйте <code>try/except ValueError</code>.</p>",
    "hints": [
     "В цикле: <code>try: temps.append(float(v))</code>, <code>except ValueError: temps.append(None)</code>.",
     "Увеличивайте счётчик в блоке <code>except</code>."
    ],
    "check": {
     "tests": "assert parse_temps(['-12.5', '—', '3', '']) == ([-12.5, None, 3.0, None], 2), 'parse_temps([\"-12.5\", \"—\", \"3\", \"\"]) должна вернуть ([-12.5, None, 3.0, None], 2)'\nassert parse_temps(['n/a']) == ([None], 1), '\"n/a\" → None'\nassert parse_temps([]) == ([], 0), 'Для пустого списка ([], 0)'"
    }
   },
   {
    "title": "Правило 5%",
    "prompt": "<p>Напишите <code>load_amounts(rows, max_bad_share=0.05)</code>. <code>rows</code> — текст с суммами. Превращайте каждое значение в <code>float</code>; если не получилось или значение отрицательное, пропустите его и запишите <code>logger.warning(...)</code>. Когда все строки обработаны, если доля ошибок больше <code>max_bad_share</code>, запишите <code>logger.error(...)</code> и выбросьте <code>DataQualityError</code>. Иначе верните список правильных сумм. Logger: <code>logging.getLogger('practice.load')</code>.</p>",
    "hints": [
     "Если отрицательную сумму тоже выбрасывать как <code>ValueError</code>, один <code>except</code> поймает оба случая.",
     "Проверяйте долю после окончания цикла: <code>bad / len(rows) &gt; max_bad_share</code>."
    ],
    "check": {
     "tests": "import logging as _lg\nclass _H(_lg.Handler):\n    def __init__(self):\n        super().__init__()\n        self.records = []\n    def emit(self, record):\n        self.records.append(record)\n\n_h = _H()\n_lg.getLogger('practice.load').addHandler(_h)\ntry:\n    _g = load_amounts(['100'] * 19 + ['—'])\n    assert _g == [100.0] * 19, '19 правильных сумм должны вернуться как float'\n    assert len([r for r in _h.records if r.levelno == _lg.WARNING]) == 1, 'На каждую ошибочную строку — один logger.warning'\n    _h.records.clear()\n    try:\n        load_amounts(['100', '-5', 'abc', '200'])\n    except DataQualityError:\n        pass\n    else:\n        raise AssertionError('Қате үлесі 50% > 5%: DataQualityError лақтырылуы керек')\n    assert len([r for r in _h.records if r.levelno == _lg.WARNING]) == 2, 'И отрицательная сумма, и текст дают warning'\n    assert any(r.levelno == _lg.ERROR for r in _h.records), 'Перед остановкой должна записываться logger.error'\n    assert load_amounts(['1', 'x', '2', '3'], max_bad_share=0.3) == [1.0, 2.0, 3.0], 'Параметр max_bad_share должен учитываться (25% < 30%)'\nfinally:\n    _lg.getLogger('practice.load').removeHandler(_h)"
    }
   },
   {
    "title": "Повторить попытку",
    "prompt": "<p>Сеть иногда обрывается. Напишите <code>retry(func, attempts=3, logger=None)</code>: она вызывает <code>func()</code>; если возникает <code>ConnectionError</code>, записывает <code>logger.warning(...)</code> (если передан logger) и пробует снова. При успехе возвращает результат. Если все <code>attempts</code> попыток неудачны, выбрасывает последнюю ошибку (<code>raise</code>). Другие ошибки не перехватывайте.</p>",
    "hints": [
     "Внутри <code>for i in range(1, attempts + 1):</code> вызовите <code>try: return func()</code>.",
     "В последней попытке в блоке <code>except</code> просто <code>raise</code> — он снова выбросит ту же ошибку."
    ],
    "check": {
     "tests": "import logging as _lg\nclass _H(_lg.Handler):\n    def __init__(self):\n        super().__init__()\n        self.records = []\n    def emit(self, record):\n        self.records.append(record)\n\n_h = _H()\n_l = _lg.getLogger('practice.retry.test')\n_l.addHandler(_h)\n_l.propagate = False\n_n = []\ndef _flaky():\n    _n.append(1)\n    if len(_n) < 3:\n        raise ConnectionError('үзілді')\n    return 42\nassert retry(_flaky, logger=_l) == 42 and len(_n) == 3, 'Успех на третьей попытке: должно вернуться 42'\nassert len(_h.records) == 2 and all(r.levelno == _lg.WARNING for r in _h.records), 'Для каждой неудачной попытки — logger.warning'\n_m = []\ndef _down():\n    _m.append(1)\n    raise ConnectionError('сервер жоқ')\ntry:\n    retry(_down, attempts=4)\nexcept ConnectionError:\n    pass\nelse:\n    raise AssertionError('Барлық әрекет сәтсіз болса, ConnectionError қайта лақтырылуы керек')\nassert len(_m) == 4, f'При attempts=4 должно быть 4 вызова, у вас {len(_m)}'\n_k = []\ndef _bug():\n    _k.append(1)\n    raise KeyError('x')\ntry:\n    retry(_bug)\nexcept KeyError:\n    pass\nassert len(_k) == 1, 'При других ошибках не повторяйте: только ConnectionError'\n_l.removeHandler(_h)"
    }
   }
  ]
 },
 "swe-6": {
  "pr": [
   {
    "title": "Зафиксирована ли версия",
    "prompt": "<p>Напишите функцию <code>is_pinned(line)</code>: если в строке requirements.txt версия зафиксирована через <code>==</code>, она возвращает <code>True</code>, иначе <code>False</code>. Комментарий в конце строки <code>#</code> не учитывайте. Например, <code>\"pandas==2.2.3\"</code> → <code>True</code>, <code>\"numpy&gt;=1.26\"</code> → <code>False</code>, <code>\"joblib  # ==1.4 керек\"</code> → <code>False</code>.</p>",
    "hints": [
     "Сначала отрежьте комментарий: <code>line.split('#')[0]</code>.",
     "Затем проверьте <code>'==' in ...</code>."
    ],
    "check": {
     "tests": "assert is_pinned('pandas==2.2.3') is True, '\"pandas==2.2.3\" зафиксирован'\nassert is_pinned('numpy>=1.26') is False, '\">=\" не является фиксацией'\nassert is_pinned('joblib  # ==1.4 керек') is False, '\"==\" в комментарии не учитывается'\nassert is_pinned('fastapi==0.115.0  # API') is True, 'Зафиксированная строка с комментарием в конце'"
    }
   },
   {
    "title": "Имя пакета",
    "prompt": "<p>Напишите функцию <code>package_name(line)</code>: из строки requirements.txt она возвращает только имя пакета: <code>\"scikit-learn==1.6.1\"</code> → <code>\"scikit-learn\"</code>, <code>\"numpy&gt;=1.26\"</code> → <code>\"numpy\"</code>, <code>\" joblib \"</code> → <code>\"joblib\"</code>.</p>",
    "hints": [
     "Разделите строку дважды: <code>line.split('==')[0].split('&gt;=')[0]</code>.",
     "В конце вызовите <code>.strip()</code>."
    ],
    "check": {
     "tests": "assert package_name('scikit-learn==1.6.1') == 'scikit-learn', '\"scikit-learn==1.6.1\" → \"scikit-learn\"'\nassert package_name('numpy>=1.26') == 'numpy', '\"numpy>=1.26\" → \"numpy\"'\nassert package_name(' joblib ') == 'joblib', 'Уберите пробелы по краям'"
    }
   },
   {
    "title": "Проверка .gitignore",
    "prompt": "<p>Напишите функцию <code>venv_ignored(gitignore)</code>: если в тексте <code>.gitignore</code> есть строка <code>.venv</code> или <code>.venv/</code>, она возвращает <code>True</code> (пробелы в начале и в конце строки не учитываются). Строка, которая начинается с <code>#</code>, — это комментарий, она не учитывается.</p>",
    "hints": [
     "Проверяйте каждую строку отдельно: <code>for line in gitignore.splitlines():</code>.",
     "<code>line.strip() in ('.venv', '.venv/')</code>."
    ],
    "check": {
     "tests": "assert venv_ignored('__pycache__/\\n.venv/\\n.env\\n') is True, 'Есть строка \".venv/\": True'\nassert venv_ignored('  .venv  \\n') is True, 'Пробелы по краям не учитываются'\nassert venv_ignored('# .venv\\n.env\\n') is False, '.venv в комментарии не учитывается'\nassert venv_ignored('.venv_old/\\n') is False, '.venv_old — другая папка'"
    }
   },
   {
    "title": "Создание requirements.txt",
    "prompt": "<p>Напишите функцию <code>to_requirements(packages)</code>: она делает текст requirements.txt из словаря <code>{пакет: нұсқа}</code>. Каждая строка имеет вид <code>пакет==нұсқа</code>, пакеты отсортированы по имени, каждая строка заканчивается <code>\\n</code>. Если версия <code>None</code>, в строке пишется только имя пакета.</p>",
    "hints": [
     "<code>for name in sorted(packages):</code> — сортировка по имени.",
     "Добавьте <code>'\\n'</code> к каждой строке: <code>''.join(line + '\\n' for line in lines)</code>."
    ],
    "check": {
     "tests": "assert to_requirements({'pandas': '2.2.3', 'fastapi': '0.115.0'}) == 'fastapi==0.115.0\\npandas==2.2.3\\n', 'Пакеты должны быть отсортированы, и каждая строка должна заканчиваться \\\\n'\nassert to_requirements({'joblib': None, 'numpy': '2.1.3'}) == 'joblib\\nnumpy==2.1.3\\n', 'Если версия None, только имя'\nassert to_requirements({}) == '', 'Для пустого словаря — пустой текст'"
    }
   },
   {
    "title": "Незакреплённые пакеты",
    "prompt": "<p>Напишите функцию <code>unpinned(text)</code>: она возвращает список имён пакетов из текста requirements.txt, которые не зафиксированы через <code>==</code>, в порядке файла. Пустые строки и комментарии не учитываются. В продакшене такие пакеты опасны: завтра может установиться другая версия.</p>",
    "hints": [
     "Очистите каждую строку: <code>line.split('#')[0].strip()</code>; если строка пустая или содержит <code>==</code>, пропустите её через <code>continue</code>.",
     "Имя: <code>line.split('&gt;=')[0].strip()</code>."
    ],
    "check": {
     "tests": "assert unpinned(req) == ['numpy', 'joblib', 'uvicorn'], f'Ожидалось [\"numpy\", \"joblib\", \"uvicorn\"], у вас {unpinned(req)}'\nassert unpinned('pandas==2.2.3\\n# numpy\\n') == [], 'Если всё зафиксировано, пустой список'"
    }
   },
   {
    "title": "Сравнение версий",
    "prompt": "<p>Сравнивать тексты версий сложно: <code>\"1.10\" &lt; \"1.9\"</code> как текст даёт <code>True</code>! Напишите две функции: <code>version_tuple(v)</code> → кортеж целых чисел (<code>\"2.2.3\"</code> → <code>(2, 2, 3)</code>); <code>is_at_least(installed, minimum)</code> → не ниже ли установленная версия минимальной (<code>True/False</code>). Кортежи Python сравнивает правильно сам.</p>",
    "hints": [
     "<code>tuple(int(x) for x in v.split('.'))</code>.",
     "Кортежи сравниваются поэлементно: <code>(1, 10) &gt;= (1, 9)</code> → True."
    ],
    "check": {
     "tests": "assert version_tuple('2.2.3') == (2, 2, 3), 'version_tuple(\"2.2.3\") должна вернуть (2, 2, 3)'\nassert version_tuple('1.26') == (1, 26), 'version_tuple(\"1.26\") → (1, 26)'\nassert is_at_least('1.10.0', '1.9') is True, '1.10.0 ≥ 1.9 (при сравнении как текста будет ошибка)'\nassert is_at_least('1.25.2', '1.26') is False, '1.25.2 < 1.26'\nassert is_at_least('2.0', '2.0') is True, 'Равная версия тоже подходит'"
    }
   },
   {
    "title": "Проверка окружения",
    "prompt": "<p>Напишите <code>check_env(req_text, installed)</code>. <code>installed</code> — установленные пакеты в виде <code>{атауы: нұсқа}</code>. Для каждого пакета из requirements.txt верните список проблем (в порядке файла): пакет не установлен → <code>\"missing:атауы\"</code>; нет совпадения по <code>==</code> → <code>\"mismatch:атауы\"</code>; версия слишком старая по <code>&gt;=</code> → <code>\"too_old:атауы\"</code>. Сравнивайте версии как числа.</p>",
    "hints": [
     "Из каждой строки возьмите имя, версию и оператор (<code>==</code>, <code>&gt;=</code> или ничего).",
     "Для сравнения используйте <code>version_tuple</code>: <code>(1, 9, 0) &lt; (1, 26)</code>."
    ],
    "check": {
     "tests": "assert check_env(req, installed) == ['too_old:numpy', 'mismatch:scikit-learn', 'missing:fastapi'], f'Результат неверный: {check_env(req, installed)}'\nassert check_env('numpy>=1.26\\n', {'numpy': '1.26.4'}) == [], '1.26.4 ≥ 1.26: проблем нет'\nassert check_env('# бос\\n\\n', {}) == [], 'Комментарии и пустые строки не учитываются'\nassert check_env('joblib\\n', {'joblib': '1.4.2'}) == [], 'Пакета без версии достаточно, если он установлен'"
    },
    "starter": "req = \"\"\"pandas==2.2.3\nnumpy>=1.26  # не меньше\nscikit-learn==1.6.1\nfastapi\n\"\"\"\ninstalled = {'pandas': '2.2.3', 'numpy': '1.9.0', 'scikit-learn': '1.5.2'}\n\ndef check_env(req_text, installed):\n    return []\n"
   },
   {
    "title": "Разница двух requirements",
    "prompt": "<p>В PR изменился requirements.txt. Напишите <code>diff_requirements(old, new)</code>: он возвращает словарь <code>{'added': [...], 'removed': [...], 'changed': [(атауы, ескі, жаңа), ...]}</code>. Версия берётся из значения после <code>==</code>, у незафиксированного пакета версия <code>None</code>. Каждый список сортируется по имени пакета. Пустые строки и комментарии не учитываются.</p>",
    "hints": [
     "Сначала напишите вспомогательную функцию, которая превращает оба текста в словарь <code>{атауы: нұсқа}</code>.",
     "Есть в новом, но нет в старом → added; наоборот → removed; есть в обоих, но версия другая → changed."
    ],
    "check": {
     "tests": "_d = diff_requirements(old, new)\nassert _d['added'] == ['fastapi', 'joblib'], f'added: [\"fastapi\", \"joblib\"], у вас {_d[\"added\"]}'\nassert _d['removed'] == ['requests'], f'removed: [\"requests\"], у вас {_d[\"removed\"]}'\nassert _d['changed'] == [('pandas', '2.1.4', '2.2.3')], f'changed: [(\"pandas\", \"2.1.4\", \"2.2.3\")], у вас {_d[\"changed\"]}'\nassert diff_requirements('a==1\\n', 'a==1\\n') == {'added': [], 'removed': [], 'changed': []}, 'Если изменений нет, все списки пустые'\nassert diff_requirements('b==1\\nc\\n', 'c==2\\n')['changed'] == [('c', None, '2')], 'Версия незафиксированного пакета — None'"
    }
   }
  ]
 },
 "swe-7": {
  "pr": [
   {
    "title": "Волшебное число в константу",
    "prompt": "<p>В коде стоит число <code>+ 1500</code> — это стоимость доставки, но понятно это только автору. Создайте константу <code>DELIVERY_FEE = 1500</code> и напишите функцию <code>order_total(amount)</code>: к заказу меньше 20 000 ₸ прибавляется <code>DELIVERY_FEE</code>, а при 20 000 ₸ и больше доставка бесплатная (константа <code>FREE_FROM = 20000</code>).</p>",
    "hints": [
     "В начале файла: <code>DELIVERY_FEE = 1500</code>, <code>FREE_FROM = 20000</code>.",
     "Внутри функции вместо чисел пишите эти имена."
    ],
    "check": {
     "tests": "assert DELIVERY_FEE == 1500 and FREE_FROM == 20000, 'Определите константы DELIVERY_FEE = 1500 и FREE_FROM = 20000'\nassert order_total(8000) == 9500 and order_total(20000) == 20000, 'order_total(8000) должна вернуть 9500, order_total(20000) — 20000'\nDELIVERY_FEE = 900\nFREE_FROM = 10000\n_a, _b = order_total(8000), order_total(12000)\nDELIVERY_FEE = 1500\nFREE_FROM = 20000\nassert _a == 8900 and _b == 12000, 'order_total должна использовать константы DELIVERY_FEE и FREE_FROM, а не числа'"
    }
   },
   {
    "title": "Чистая функция",
    "prompt": "<p>Функция <code>apply_discount(prices, percent)</code> меняет входной список, поэтому её трудно тестировать. Сделайте её <b>чистой</b>: пусть она возвращает <b>новый</b> список, где скидка применена (каждая цена считается как <code>round(p * (100 - percent) / 100)</code>), а входной список не меняется.</p>",
    "hints": [
     "List comprehension создаёт новый список: <code>[round(p * (100 - percent) / 100) for p in prices]</code>.",
     "Избавьтесь от таких изменений входных данных, как <code>prices[i] = ...</code>."
    ],
    "check": {
     "tests": "_p = [1000, 2500, 990]\n_r = apply_discount(_p, 10)\nassert _r == [900, 2250, 891], 'apply_discount([1000, 2500, 990], 10) должна вернуть [900, 2250, 891]'\nassert _p == [1000, 2500, 990], 'Входной список не должен меняться (чистая функция)'\nassert _r is not _p, 'Верните новый список'"
    }
   },
   {
    "title": "Понятные имена",
    "prompt": "<p>В ноутбуке есть функция <code>def f(a, b): return a / b * 100</code>: она считает расход на 100 км по пройденному пути и потраченному топливу. Перепишите её с понятными именами: функция <code>fuel_per_100km</code>, параметры <code>fuel_liters</code> и <code>distance_km</code> (именно в таком порядке), результат округляется до 1 знака. Например, <code>fuel_per_100km(36, 450)</code> → <code>8.0</code>.</p>",
    "hints": [
     "Имя должно говорить, что делает функция: <code>def fuel_per_100km(fuel_liters, distance_km):</code>.",
     "<code>round(fuel_liters / distance_km * 100, 1)</code>."
    ],
    "check": {
     "tests": "import inspect as _i\nassert list(_i.signature(fuel_per_100km).parameters) == ['fuel_liters', 'distance_km'], 'Параметры: fuel_liters, distance_km (в этом порядке)'\nassert fuel_per_100km(36, 450) == 8.0, 'fuel_per_100km(36, 450) должна вернуть 8.0'\nassert fuel_per_100km(10, 120) == 8.3, 'Округлите результат до 1 знака'"
    }
   },
   {
    "title": "Повторяющийся блок в функцию",
    "prompt": "<p>В ноутбуке есть три одинаковых цикла, которые считают по статусу. Замените их одной функцией <code>count_by(rows, key)</code>: она возвращает словарь, в котором для каждого значения столбца, заданного через <code>key</code>, указано, сколько раз оно встретилось. Значения не должны быть записаны в коде: функция должна работать с любым ключом и любым значением.</p>",
    "hints": [
     "<code>result[r[key]] = result.get(r[key], 0) + 1</code>.",
     "Так как ключ — параметр, одна функция подходит и для статуса, и для города."
    ],
    "check": {
     "tests": "assert count_by(orders, 'status') == {'paid': 2, 'cancelled': 1, 'pending': 1}, 'Подсчёт по статусу неверен'\nassert count_by(orders, 'city') == {'Алматы': 2, 'Астана': 2}, 'count_by должна работать с любым ключом'\nassert count_by([{'x': 'refund'}], 'x') == {'refund': 1}, 'Не записывайте значения в код: должно считаться любое значение'\nassert count_by([], 'status') == {}, 'Для пустого списка — пустой словарь'"
    }
   },
   {
    "title": "Разбиение на шаги",
    "prompt": "<p>Разбейте длинную ячейку на шаги: <code>clean(rows)</code> — новый список, в котором у каждой строки значение <code>city</code> становится <code>strip().capitalize()</code>, и остаются только строки, где <code>amount</code> больше 0; <code>summarize(rows)</code> — сумма <code>amount</code> по городам; <code>main(rows)</code> — вызывает эти две функции по порядку и возвращает результат. Входные строки не должны меняться.</p>",
    "hints": [
     "<code>clean</code>: <code>[dict(r, city=...) for r in rows if r['amount'] &gt; 0]</code> делает копию.",
     "<code>main</code> только объединяет вызовы: <code>return summarize(clean(rows))</code>."
    ],
    "check": {
     "tests": "assert clean(raw) == [{'city': 'Алматы', 'amount': 5000}, {'city': 'Алматы', 'amount': 2500}, {'city': 'Астана', 'amount': 4000}], 'clean работает неверно: города должны очищаться, строки с amount <= 0 должны удаляться'\nassert raw[0]['city'] == ' алматы', 'Входные строки не должны меняться (создайте копию через dict(r, city=...))'\nassert summarize([{'city': 'Орал', 'amount': 3}, {'city': 'Орал', 'amount': 4}]) == {'Орал': 7}, 'summarize суммирует по городам'\nassert main(raw) == {'Алматы': 7500, 'Астана': 4000}, 'main(raw) должна вернуть {\"Алматы\": 7500, \"Астана\": 4000}'\n_orig = summarize\nsummarize = lambda rows: 'summarize шақырылды'\n_r = main(raw)\nsummarize = _orig\nassert _r == 'summarize шақырылды', 'main не должна копировать логику, а должна вызывать функции clean и summarize'"
    }
   },
   {
    "title": "Словарь тарифов",
    "prompt": "<p>Цена такси зависит от города, но в коде стоит цепочка условий <code>if city == ...</code>. Вынесите тарифы в константу-словарь <code>TARIFFS</code>: <code>{'Алматы': (500, 130), 'Астана': (450, 120), 'Шымкент': (350, 100)}</code> — (посадка, цена за 1 км). <code>fare(city, km)</code> возвращает цену, округлённую через <code>round</code> до целого; для города без тарифа выбрасывается <code>ValueError</code>.</p>",
    "hints": [
     "<code>start, per_km = TARIFFS[city]</code>.",
     "Неизвестный город: <code>if city not in TARIFFS: raise ValueError(...)</code>."
    ],
    "check": {
     "tests": "assert TARIFFS['Алматы'] == (500, 130) and len(TARIFFS) == 3, 'Определите константу TARIFFS'\nassert fare('Алматы', 7.5) == 1475 and fare('Шымкент', 2) == 550, 'fare(\"Алматы\", 7.5) = 1475, fare(\"Шымкент\", 2) = 550'\nTARIFFS['Орал'] = (300, 90)\n_o = fare('Орал', 10)\ndel TARIFFS['Орал']\nassert _o == 1200, 'fare должна использовать словарь TARIFFS: если добавляется новый город, код не меняется'\ntry:\n    fare('Париж', 3)\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Тарифі жоқ қала үшін ValueError')"
    }
   },
   {
    "title": "Рефакторинг: оценки",
    "prompt": "<p>Старый школьный код переводит баллы в оценку: от 85 → 5, от 70 → 4, от 50 → 3, остальное → 2. Выполните рефакторинг: вынесите границы в константу <code>GRADE_LIMITS = [(85, 5), (70, 4), (50, 3)]</code>; <code>grade(score)</code> возвращает оценку за один балл (пусть использует только <code>GRADE_LIMITS</code>); <code>grade_counts(scores)</code> — словарь <code>{баға: саны}</code> (только встречавшиеся оценки). Результат должен совпадать со старым кодом.</p>",
    "hints": [
     "<code>for limit, g in GRADE_LIMITS: if score &gt;= limit: return g</code>; когда цикл закончился, <code>return 2</code>.",
     "В <code>grade_counts</code> не повторяйте условия, а вызовите <code>grade(s)</code>."
    ],
    "check": {
     "tests": "assert [grade(s) for s in [92, 85, 84, 70, 69, 50, 49, 0]] == [5, 5, 4, 4, 3, 3, 2, 2], 'Границы grade неверны (85→5, 70→4, 50→3)'\nassert grade_counts(scores) == {5: 3, 3: 2, 2: 2, 4: 1}, 'Результат grade_counts должен совпадать с результатом старого кода'\nGRADE_LIMITS = [(90, 5), (60, 4), (40, 3)]\n_g = grade(85)\nGRADE_LIMITS = [(85, 5), (70, 4), (50, 3)]\nassert _g == 4, 'grade должна использовать константу GRADE_LIMITS, а не числа'\nassert grade_counts([]) == {}, 'Для пустого списка — пустой словарь'"
    }
   },
   {
    "title": "Сборка функции pipeline",
    "prompt": "<p>Напишите <code>make_pipeline(*steps)</code>: она должна <b>возвращать функцию</b>, а эта функция пропускает данные по очереди через функции из <code>steps</code>. Затем соберите pipeline очистки: <code>clean_names = make_pipeline(strip_all, drop_empty, title_all, unique)</code>, где <code>title_all</code> — функция, которая делает каждое имя <code>capitalize()</code> (напишите её сами).</p>",
    "hints": [
     "Напишите внутреннюю функцию и верните её: <code>def run(data): ...</code>, затем <code>return run</code>.",
     "Внутри <code>run</code>: <code>for step in steps: data = step(data)</code>."
    ],
    "check": {
     "tests": "assert callable(make_pipeline()), 'make_pipeline должна возвращать функцию'\nassert make_pipeline()([1, 2]) == [1, 2], 'Если шагов нет, данные не меняются'\nassert make_pipeline(lambda x: x + 1, lambda x: x * 10)(3) == 40, 'Шаги должны применяться в заданном порядке'\nassert title_all(['алматы', 'ШЫМКЕНТ']) == ['Алматы', 'Шымкент'], 'title_all должна делать capitalize() для каждого имени'\nassert clean_names(names) == ['Айгерім', 'Ерлан', 'Дана'], f'clean_names(names) работает неверно: {clean_names(names)}'"
    }
   }
  ]
 },
 "swe-8": {
  "pr": [
   {
    "title": "Чтение ответа о погоде",
    "prompt": "<p>API погоды вернул текст <code>raw</code>. С помощью <code>json.loads</code> превратите его в словарь и запишите в <code>city</code> название города, в <code>temp</code> — текущую температуру (<code>temp_c</code> внутри <code>current</code>), а в <code>max_tomorrow</code> — самую высокую температуру на завтра (первый элемент списка <code>forecast</code>).</p>",
    "hints": [
     "Сначала <code>data = json.loads(raw)</code>, затем <code>data['current']['temp_c']</code>.",
     "Первый элемент списка: <code>data['forecast'][0]</code>."
    ],
    "check": {
     "tests": "assert city == 'Астана', 'city = \"Астана\"'\nassert temp == -18.5, 'temp — это temp_c из current (-18.5)'\nassert max_tomorrow == -12, 'max_tomorrow — это max_c из forecast[0] (-12)'"
    }
   },
   {
    "title": "Тип кода статуса",
    "prompt": "<p>Напишите функцию <code>status_kind(code)</code>: 200–299 → <code>'success'</code>, 400–499 → <code>'client_error'</code>, 500–599 → <code>'server_error'</code>, остальное → <code>'other'</code>.</p>",
    "hints": [
     "Проверка диапазона: <code>if 400 &lt;= code &lt;= 499:</code>.",
     "Правило: 4xx — ошибка клиента, 5xx — ошибка сервера."
    ],
    "check": {
     "tests": "assert status_kind(200) == 'success' and status_kind(201) == 'success', '2xx → success'\nassert status_kind(404) == 'client_error' and status_kind(422) == 'client_error', '4xx → client_error'\nassert status_kind(500) == 'server_error' and status_kind(503) == 'server_error', '5xx → server_error'\nassert status_kind(302) == 'other', '3xx → other'"
    }
   },
   {
    "title": "Заказ в JSON",
    "prompt": "<p>Напишите функцию <code>to_json(order)</code>: она превращает словарь в текст JSON, казахские буквы не должны превращаться в коды <code>\\u</code>, а ключи должны быть отсортированы по алфавиту (<code>sort_keys=True</code>). Например, <code>{\"city\": \"Шымкент\", \"amount\": 5000}</code> → <code>'{\"amount\": 5000, \"city\": \"Шымкент\"}'</code>.</p>",
    "hints": [
     "<code>json.dumps(order, ensure_ascii=False, sort_keys=True)</code>.",
     "<code>str(order)</code> — не JSON: там используются одинарные кавычки."
    ],
    "check": {
     "tests": "import json as _j\nassert to_json({'city': 'Шымкент', 'amount': 5000}) == '{\"amount\": 5000, \"city\": \"Шымкент\"}', 'Ключи должны быть отсортированы, казахские буквы сохранены'\nassert _j.loads(to_json({'ok': True, 'items': [1, 2]})) == {'ok': True, 'items': [1, 2]}, 'Результат должен быть правильным JSON (true, двойные кавычки)'"
    }
   },
   {
    "title": "Запросы, которые можно повторить",
    "prompt": "<p>Клиент автоматически повторяет запрос после ошибки сервера (5xx), но только для <b>идемпотентных</b> методов (<code>GET</code>, <code>PUT</code>, <code>DELETE</code>). Напишите <code>retry_list(requests)</code>: <code>requests</code> — список кортежей вида <code>(id, method, status)</code>; она возвращает id запросов по порядку, у которых статус 500–599 и метод идемпотентный. <code>POST</code> не повторяется: могут создаться два заказа.</p>",
    "hints": [
     "Множество идемпотентных методов: <code>{'GET', 'PUT', 'DELETE'}</code>.",
     "Условие: <code>method in IDEMPOTENT and 500 &lt;= status &lt;= 599</code>."
    ],
    "check": {
     "tests": "assert retry_list(requests) == [1, 4], f'Ожидалось [1, 4], у вас {retry_list(requests)}'\nassert retry_list([(7, 'POST', 503)]) == [], 'POST не повторяется'\nassert retry_list([(8, 'GET', 404), (9, 'PUT', 500)]) == [9], '404 — ошибка клиента, мы не повторяем'"
    }
   },
   {
    "title": "Разбор URL",
    "prompt": "<p>Напишите функцию <code>parse_url(url)</code>: <code>\"/cities/Алматы/weather?days=3&amp;units=c\"</code> → <code>(['cities', 'Алматы', 'weather'], {'days': '3', 'units': 'c'})</code>. Первая часть — части path (без пустых частей), вторая — параметры query (значения — текст). Если <code>?</code> нет, словарь пустой.</p>",
    "hints": [
     "<code>path, _, query = url.partition('?')</code>: если <code>?</code> нет, query пустой.",
     "Параметры: <code>query.split('&amp;')</code>, каждый разбирается через <code>pair.partition('=')</code>."
    ],
    "check": {
     "tests": "assert parse_url('/cities/Алматы/weather?days=3&units=c') == (['cities', 'Алматы', 'weather'], {'days': '3', 'units': 'c'}), 'Части path и параметры query неверны'\nassert parse_url('/products/42') == (['products', '42'], {}), 'Если ? нет, пустой словарь'\nassert parse_url('/health/') == (['health'], {}), 'Пустые части не попадают в список'\nassert parse_url('/search?q=шай') == (['search'], {'q': 'шай'}), 'Один параметр'"
    }
   },
   {
    "title": "Составление ответа об ошибке",
    "prompt": "<p>Напишите функцию <code>error_response(status)</code>: она возвращает <code>(status, body)</code>, где <code>body</code> — JSON-<b>текст</b> <code>{\"error\": хабар}</code> (казахские буквы сохраняются). Сообщения: 400 → <code>\"Сұрау қате құрылған\"</code>, 404 → <code>\"Табылмады\"</code>, 422 → <code>\"Мәндер тексеруден өтпеді\"</code>, 500 → <code>\"Сервердің ішкі қатесі\"</code>, остальное → <code>\"Белгісіз қате\"</code>.</p>",
    "hints": [
     "Положите сообщения в словарь и затем <code>MESSAGES.get(status, 'Белгісіз қате')</code>.",
     "Body должен быть текстом: <code>json.dumps(..., ensure_ascii=False)</code>."
    ],
    "check": {
     "tests": "import json as _j\n_s, _b = error_response(404)\nassert _s == 404 and isinstance(_b, str), 'Верните статус и текст JSON (str)'\nassert _j.loads(_b) == {'error': 'Табылмады'}, '404 → {\"error\": \"Табылмады\"}'\nassert 'Табылмады' in _b, 'Добавьте ensure_ascii=False'\nassert _j.loads(error_response(422)[1])['error'] == 'Мәндер тексеруден өтпеді', 'Сообщение для 422 неверно'\nassert _j.loads(error_response(418)[1])['error'] == 'Белгісіз қате', 'Неизвестный статус → \"Белгісіз қате\"'"
    }
   },
   {
    "title": "Библиотечный API",
    "prompt": "<p>Напишите функцию <code>handle(method, path, body=None)</code>, которая моделирует API библиотеки: она возвращает <code>(status, data)</code>:<br>• <code>GET /books</code> → 200, список всех книг;<br>• <code>GET /books/&lt;id&gt;</code> → 200 и книгу, если её нет — 404;<br>• <code>PUT /books/&lt;id&gt;</code> → полностью заменяет книгу телом запроса (<code>id</code> сохраняется), 200; если книги нет — 404; если в body нет <code>title</code> — 422;<br>• <code>DELETE /books/&lt;id&gt;</code> → удаляет книгу, 200 и <code>{'deleted': id}</code>; если её нет — 404;<br>• другие методы → 405; другой path или нечисловой id → 404.<br>В случае ошибки data — <code>{'error': ...}</code>.</p>",
    "hints": [
     "Разбейте path: <code>parts = path.strip('/').split('/')</code>. Сначала проверьте path, затем метод, затем id.",
     "PUT: <code>books[book_id] = dict(body, id=book_id)</code>; DELETE: <code>del books[book_id]</code>."
    ],
    "check": {
     "tests": "books.clear()\nbooks.update({1: {'id': 1, 'title': 'Абай жолы', 'author': 'Мұхтар Әуезов'}, 2: {'id': 2, 'title': 'Көшпенділер', 'author': 'Ілияс Есенберлин'}})\n_s, _d = handle('GET', '/books')\nassert _s == 200 and len(_d) == 2, 'GET /books → 200 и 2 книги'\nassert handle('GET', '/books/2') == (200, books[2]), 'GET /books/2 → 200 и эта же книга'\nassert handle('GET', '/books/9')[0] == 404 and handle('GET', '/books/x')[0] == 404, 'Несуществующий или нечисловой id → 404'\n_s, _d = handle('PUT', '/books/1', {'title': 'Абай жолы', 'author': 'М. Әуезов'})\nassert _s == 200 and _d == {'title': 'Абай жолы', 'author': 'М. Әуезов', 'id': 1}, 'PUT полностью заменяет книгу, id сохраняется'\nassert handle('PUT', '/books/1', {'title': 'Абай жолы', 'author': 'М. Әуезов'}) == (_s, _d), 'PUT идемпотентен: повтор даёт тот же результат'\nassert handle('PUT', '/books/1', {'author': 'X'})[0] == 422, 'Нет title → 422'\nassert handle('PUT', '/books/7', {'title': 'Y'})[0] == 404, 'PUT несуществующей книги → 404'\nassert handle('DELETE', '/books/2') == (200, {'deleted': 2}) and 2 not in books, 'DELETE удаляет книгу'\nassert handle('DELETE', '/books/2')[0] == 404, 'Повторный DELETE удалённой книги → 404'\nassert handle('POST', '/books/1')[0] == 405 and handle('DELETE', '/books')[0] == 405, 'Другие методы → 405'\nassert handle('GET', '/authors')[0] == 404, 'Неизвестный path → 404'\nassert 'error' in handle('GET', '/books/9')[1], 'В ответе с ошибкой должен быть ключ error'"
    }
   },
   {
    "title": "Проверка тела JSON",
    "prompt": "<p>Сервер получает body как сырой текст. Напишите <code>handle_forecast(raw_body)</code>: она возвращает <code>(status, data)</code>.<br>• Если JSON испорчен → <code>400</code>, <code>{'error': 'invalid json'}</code> (<code>json.loads</code> выбрасывает <code>ValueError</code>);<br>• если JSON правильный, но это не словарь, или <code>city</code> не является непустым текстом, или <code>days</code> не является целым числом от 1 до 7 → <code>422</code>, <code>{'error': [қате өрістердің атаулары]}</code> (в порядке <code>['city', 'days']</code>; если это не словарь, то ошибки обоих видов);<br>• всё правильно → <code>200</code>, <code>{'city': ..., 'days': ...}</code>.</p>",
    "hints": [
     "Сначала <code>try: data = json.loads(raw_body)</code>, затем <code>except ValueError: return 400, ...</code>.",
     "Затем проверьте поля отдельно и соберите названия ошибочных полей в список; не забудьте, что <code>bool</code> тоже считается <code>int</code>."
    ],
    "check": {
     "tests": "assert handle_forecast('{\"city\": \"Алматы\", \"days\": 3}') == (200, {'city': 'Алматы', 'days': 3}), 'Правильный body → 200'\nassert handle_forecast('{city: Алматы}') == (400, {'error': 'invalid json'}), 'Испорченный JSON → 400'\nassert handle_forecast('') == (400, {'error': 'invalid json'}), 'Пустой body тоже испорченный JSON'\nassert handle_forecast('{\"city\": \"Алматы\", \"days\": 10}') == (422, {'error': ['days']}), 'days вне диапазона 1–7 → 422'\nassert handle_forecast('{\"city\": \"\", \"days\": \"3\"}') == (422, {'error': ['city', 'days']}), 'Пустой city и текст \"3\" → две ошибки'\nassert handle_forecast('{\"days\": 2}') == (422, {'error': ['city']}), 'Нет city → 422'\nassert handle_forecast('[1, 2]') == (422, {'error': ['city', 'days']}), 'JSON, который не словарь → 422'\nassert handle_forecast('{\"city\": \"Орал\", \"days\": true}')[0] == 422, 'true — не число'"
    }
   }
  ]
 },
 "dep-1": {
  "pr": [
   {
    "title": "Копирование через pickle",
    "prompt": "<p>Дан словарь тарифов <code>tariffs</code>. Превратите его в байты с помощью <code>pickle.dumps</code> в <code>blob</code>, затем загрузите обратно в <code>restored</code> с помощью <code>pickle.loads</code>. <code>restored</code> должен совпадать с <code>tariffs</code> по содержимому, но быть отдельным объектом.</p>",
    "hints": [
     "<code>blob = pickle.dumps(tariffs)</code> — объект → bytes.",
     "<code>restored = pickle.loads(blob)</code> — bytes → объект."
    ],
    "check": {
     "tests": "assert isinstance(blob, bytes), 'blob должен быть результатом pickle.dumps(tariffs) (bytes)'\nassert restored == tariffs, 'Содержимое restored должно совпадать с tariffs'\nassert restored is not tariffs, 'restored — результат pickle.loads (новый объект), а не сам tariffs'"
    }
   },
   {
    "title": "Словарь bundle",
    "prompt": "<p>Напишите функцию <code>make_bundle(model, features, version, trained_at='2026-09-30')</code>: она кладёт модель вместе с metadata в словарь и возвращает его. Ключи: <code>model</code>, <code>features</code>, <code>version</code>, <code>trained_at</code>. Сохраните <b>копию</b> списка <code>features</code> (чтобы bundle не менялся, если исходный список изменится).</p>",
    "hints": [
     "Верните словарь сразу: <code>{'model': model, 'features': list(features), ...}</code>.",
     "<code>list(features)</code> создаёт новый список."
    ],
    "check": {
     "tests": "_f = ['tenure_months', 'support_calls']\n_b = make_bundle('M', _f, '1.2.0')\nassert _b == {'model': 'M', 'features': _f, 'version': '1.2.0', 'trained_at': '2026-09-30'}, f'Ключи и значения bundle неверны: {_b}'\n_f.append('city')\nassert _b['features'] == ['tenure_months', 'support_calls'], 'Сохраните копию features: list(features)'\nassert make_bundle('M', [], '2.0.0', '2026-10-01')['trained_at'] == '2026-10-01', 'Параметр trained_at должен учитываться'"
    }
   },
   {
    "title": "Сохранение scaler",
    "prompt": "<p>По температурам Алматы за январь обучен <code>StandardScaler</code>. Сохраните его через <code>joblib.dump</code> в файл <code>temp_scaler.joblib</code>, а затем загрузите в <code>loaded</code>. Загруженный scaler должен помнить те же <code>mean_</code>.</p>",
    "hints": [
     "<code>joblib.dump(scaler, 'temp_scaler.joblib')</code>.",
     "<code>loaded = joblib.load('temp_scaler.joblib')</code>."
    ],
    "check": {
     "tests": "import os as _os\nfrom sklearn.preprocessing import StandardScaler as _SS\nassert _os.path.exists('temp_scaler.joblib'), 'Файл temp_scaler.joblib не создан'\nassert isinstance(loaded, _SS) and loaded is not scaler, 'loaded должен быть StandardScaler, загруженным из файла'\nassert abs(float(loaded.mean_[0]) - (-8.833333)) < 1e-4, 'Значение mean_ загруженного scaler должно сохраниться (≈ -8.83)'"
    }
   },
   {
    "title": "Имя файла с версией",
    "prompt": "<p>Напишите функцию <code>bundle_filename(name, version)</code>: она возвращает <code>f\"{name}_v{version}.joblib\"</code>, например <code>(\"churn\", \"1.2.0\")</code> → <code>\"churn_v1.2.0.joblib\"</code>. Версия должна быть в формате <code>X.Y.Z</code>: ровно три части, разделённые точкой, и в каждой только цифры. Иначе выбрасывается <code>ValueError</code> (в сообщении должно быть слово <code>version</code>).</p>",
    "hints": [
     "Сначала <code>parts = version.split('.')</code>, затем <code>len(parts) == 3</code> и <code>all(p.isdigit() for p in parts)</code>.",
     "Имя файла: <code>f'{name}_v{version}.joblib'</code>."
    ],
    "check": {
     "tests": "assert bundle_filename('churn', '1.2.0') == 'churn_v1.2.0.joblib', 'bundle_filename(\"churn\", \"1.2.0\") должна вернуть \"churn_v1.2.0.joblib\"'\nassert bundle_filename('price', '10.0.3') == 'price_v10.0.3.joblib', 'Версия из нескольких цифр в каждой части тоже подходит'\nfor _v in ['1.2', 'latest', '1.2.x', '1..2', '1.2.3.4']:\n    try:\n        bundle_filename('churn', _v)\n    except ValueError as _e:\n        assert 'version' in str(_e), 'В сообщении должно быть слово \"version\"'\n    else:\n        raise AssertionError(f'version={_v!r} үшін ValueError күтілді')"
    }
   },
   {
    "title": "Проверка bundle",
    "prompt": "<p>Сервер при запуске проверяет загруженный bundle. Напишите <code>check_bundle(bundle)</code>: она возвращает список проблем. Для каждого ключа из <code>REQUIRED</code>, которого нет в bundle, добавьте <code>\"missing:кілт\"</code> (в порядке REQUIRED); если <code>features</code> есть, но это пустой список, добавьте <code>\"empty:features\"</code>; если в <code>model</code> нет метода <code>predict_proba</code>, добавьте <code>\"no_predict_proba\"</code>. Если проблем нет, верните пустой список.</p>",
    "hints": [
     "<code>[f'missing:{k}' for k in REQUIRED if k not in bundle]</code>.",
     "Есть ли метод: <code>hasattr(bundle['model'], 'predict_proba')</code>."
    ],
    "check": {
     "tests": "class _M:\n    def predict_proba(self, X):\n        return [[0.5, 0.5]]\n_ok = {'model': _M(), 'features': ['a'], 'version': '1.0.0', 'trained_at': '2026-09-30'}\nassert check_bundle(_ok) == [], 'Для правильного bundle — пустой список'\nassert check_bundle({'version': '1.0.0'}) == ['missing:model', 'missing:features', 'missing:trained_at'], 'Отсутствующие ключи — в порядке REQUIRED'\nassert check_bundle(dict(_ok, features=[])) == ['empty:features'], 'Пустые features → empty:features'\nassert check_bundle(dict(_ok, model='жай мәтін')) == ['no_predict_proba'], 'Модель без predict_proba → no_predict_proba'"
    }
   },
   {
    "title": "Pipeline цены квартиры",
    "prompt": "<p>Обучите модель цены квартиры как Pipeline (<code>StandardScaler</code> + <code>LinearRegression</code>) и сохраните её вместе с bundle: <code>{'model': pipe, 'features': FEATURES, 'version': '1.0.0'}</code> → <code>joblib.dump(..., 'flat_price.joblib')</code>. Затем загрузите из файла в <code>restored</code> и через restored bundle вычислите в <code>pred</code> цену квартиры 60 м², 2 комнаты (млн ₸, <code>float</code>).</p>",
    "hints": [
     "Сначала <code>pipe = make_pipeline(StandardScaler(), LinearRegression())</code>, затем <code>pipe.fit(flats[FEATURES], flats['price_mln'])</code>.",
     "Для прогноза: <code>pd.DataFrame([{...}])[restored['features']]</code>."
    ],
    "check": {
     "tests": "import os as _os\nfrom sklearn.pipeline import Pipeline as _Pl\nassert _os.path.exists('flat_price.joblib'), 'Файл flat_price.joblib не создан'\nassert isinstance(restored, dict) and restored.get('version') == '1.0.0' and restored.get('features') == FEATURES, 'restored — bundle, загруженный из файла (model, features, version)'\nassert isinstance(restored['model'], _Pl) and 'standardscaler' in restored['model'].named_steps, 'В bundle должен быть весь Pipeline (scaler + модель)'\nassert isinstance(pred, float) and abs(pred - 42.0) < 0.3, f'60 м², 2 комнаты ≈ 42 млн ₸, у вас {pred}'"
    }
   },
   {
    "title": "Сохранение порядка признаков",
    "prompt": "<p>В словарях клиентов порядок ключей разный, и есть лишние ключи. Напишите <code>predict_many(bundle, customers)</code>: соберите всех клиентов в <b>один</b> DataFrame, возьмите столбцы в порядке <code>bundle['features']</code>, вызовите <code>predict_proba</code> один раз и верните список вероятностей оттока, округлённых до 3 знаков, как список <code>float</code>. Для пустого списка <code>[]</code>.</p>",
    "hints": [
     "<code>pd.DataFrame(customers)[bundle['features']]</code> — исправляет порядок и убирает лишние столбцы.",
     "<code>predict_proba(rows)[:, 1]</code> — вероятность класса 1 для всех строк."
    ],
    "check": {
     "tests": "_c = [{'support_calls': 5, 'tenure_months': 2, 'city': 'Алматы'}, {'tenure_months': 40, 'support_calls': 0, 'plan': 'Безлимит'}]\n_p = predict_many(bundle, _c)\n_ref = model.predict_proba(pd.DataFrame([[2, 5], [40, 0]], columns=FEATURES))[:, 1]\nassert len(_p) == 2 and all(isinstance(x, float) for x in _p), 'Каждому клиенту — одна float-вероятность'\nassert _p == [round(float(x), 3) for x in _ref], 'Признаки нужно брать в порядке bundle[\"features\"], результат округлить до 3 знаков'\nassert predict_many(bundle, []) == [], 'Для пустого списка []'\nclass _Cnt:\n    def __init__(self):\n        self.calls = 0\n    def predict_proba(self, X):\n        self.calls += 1\n        return model.predict_proba(X)\n_cm = _Cnt()\npredict_many({'model': _cm, 'features': FEATURES}, _c * 5)\nassert _cm.calls == 1, 'predict_proba нужно вызвать один раз (все клиенты в одном DataFrame)'"
    }
   },
   {
    "title": "Совместимость версий",
    "prompt": "<p>Модель может не открыться на другой версии sklearn. Напишите <code>load_bundle(blob, current_sklearn)</code>: она загружает bundle через <code>pickle.loads(blob)</code>; если часть <b>major.minor</b> у <code>sklearn_version</code> из bundle не совпадает с <code>current_sklearn</code>, она выбрасывает <code>RuntimeError</code>, называя обе версии (<code>\"1.6.1\"</code> и <code>\"1.6.0\"</code> — совпадают, <code>\"1.5.2\"</code> и <code>\"1.6.1\"</code> — не совпадают); если <code>sklearn_version</code> нет, тоже выбрасывается <code>RuntimeError</code>. Если совпадает, она возвращает bundle.</p>",
    "hints": [
     "Major.minor: <code>tuple(int(x) for x in v.split('.')[:2])</code>.",
     "В сообщении должны быть обе версии: <code>f'... {saved} ... {current_sklearn}'</code>."
    ],
    "check": {
     "tests": "import pickle as _pk\n_b = load_bundle(_pk.dumps({'model': 'M', 'sklearn_version': '1.6.1'}), '1.6.0')\nassert _b == {'model': 'M', 'sklearn_version': '1.6.1'}, 'При совпадении версий нужно вернуть bundle'\nassert load_bundle(_pk.dumps({'sklearn_version': '1.10.0'}), '1.10.2')['sklearn_version'] == '1.10.0', 'Версии 1.10.x совпадают'\nfor _saved, _cur in [('1.5.2', '1.6.1'), ('1.1.0', '1.10.0'), ('0.24.2', '1.24.2')]:\n    try:\n        load_bundle(_pk.dumps({'sklearn_version': _saved}), _cur)\n    except RuntimeError as _e:\n        assert _saved in str(_e) and _cur in str(_e), 'В сообщении должны быть названы обе версии'\n    else:\n        raise AssertionError(f'{_saved} мен {_cur} сәйкес емес: RuntimeError күтілді')\ntry:\n    load_bundle(_pk.dumps({'model': 'M'}), '1.6.1')\nexcept RuntimeError:\n    pass\nelse:\n    raise AssertionError('sklearn_version жоқ болса RuntimeError')"
    }
   }
  ]
 },
 "dep-2": {
  "pr": [
   {
    "title": "Обязательные поля",
    "prompt": "<p>Напишите функцию <code>missing_fields(data, required)</code>: она возвращает поля из списка <code>required</code>, которых нет в словаре <code>data</code>, в порядке <code>required</code>. Поле, значение которого <code>None</code>, тоже считается отсутствующим.</p>",
    "hints": [
     "<code>data.get(f)</code> даёт <code>None</code> и если поля нет, и если его значение <code>None</code>.",
     "<code>[f for f in required if data.get(f) is None]</code>."
    ],
    "check": {
     "tests": "assert missing_fields({'tenure_months': 3, 'city': None}, ['tenure_months', 'support_calls', 'city']) == ['support_calls', 'city'], 'Отсутствующие и None-поля — в порядке required'\nassert missing_fields({'a': 0, 'b': ''}, ['a', 'b']) == [], '0 и пустая строка — это существующие значения'\nassert missing_fields({}, []) == [], 'Если обязательных полей нет, пустой список'"
    }
   },
   {
    "title": "Неотрицательное целое число",
    "prompt": "<p>Напишите функцию <code>is_count(v)</code>: она возвращает <code>True</code>, если <code>v</code> — неотрицательное целое число. Текст <code>\"12\"</code>, число <code>2.5</code>, <code>-1</code> и <code>True</code>/<code>False</code> не подходят (в Python <code>bool</code> — подвид <code>int</code>, проверьте его отдельно).</p>",
    "hints": [
     "<code>isinstance(v, int) and not isinstance(v, bool)</code>.",
     "Затем <code>v &gt;= 0</code>."
    ],
    "check": {
     "tests": "assert is_count(0) is True and is_count(42) is True, '0 и 42 — правильные'\nassert is_count(-1) is False, 'Отрицательное число не подходит'\nassert is_count('12') is False and is_count(2.5) is False, 'Текст и дробное число не подходят'\nassert is_count(True) is False, 'True — это bool, а не число'"
    }
   },
   {
    "title": "Формат ответа",
    "prompt": "<p>Напишите функцию <code>make_response(p, version, threshold=0.5)</code>: она возвращает ответ прогноза как словарь: <code>{'ok': True, 'probability': p (3 таңбаға дөңгелектенген), 'label': 1 немесе 0 (p ≥ threshold), 'model_version': version}</code>.</p>",
    "hints": [
     "<code>label = int(p &gt;= threshold)</code> — True → 1, False → 0.",
     "<code>round(p, 3)</code>."
    ],
    "check": {
     "tests": "assert make_response(0.81234, '1.2.0') == {'ok': True, 'probability': 0.812, 'label': 1, 'model_version': '1.2.0'}, 'Ключи или значения ответа неверны'\nassert make_response(0.5, 'v')['label'] == 1, 'Если p = threshold, label равно 1'\nassert make_response(0.4, 'v', threshold=0.35)['label'] == 1 and make_response(0.3, 'v', threshold=0.35)['label'] == 0, 'Параметр threshold должен учитываться'"
    }
   },
   {
    "title": "Проверка входа квартиры",
    "prompt": "<p>Напишите <code>validate_flat(data)</code>: она возвращает список сообщений об ошибках (если всё верно, пустой). Правила: <code>area</code> — число (int или float, не bool), 10 ≤ area ≤ 500; <code>rooms</code> — целое число 1–10; <code>city</code> — должен быть в <code>CITIES</code>. Отсутствие поля тоже ошибка. Для каждого поля не больше одного сообщения, сообщение начинается с имени поля (<code>\"area: ...\"</code>), поля идут в порядке: area, rooms, city.</p>",
    "hints": [
     "Берите каждое поле через <code>data.get(...)</code>, сначала проверяйте, есть ли <code>None</code>, потом тип и диапазон.",
     "Диапазон: <code>10 &lt;= area &lt;= 500</code>; целое число: <code>isinstance(rooms, int) and not isinstance(rooms, bool)</code>."
    ],
    "check": {
     "tests": "assert validate_flat({'area': 54.5, 'rooms': 2, 'city': 'Алматы'}) == [], 'Для правильных данных — пустой список'\nassert validate_flat({'area': 500, 'rooms': 10, 'city': 'Шымкент'}) == [], 'Граничные значения правильные'\n_e = validate_flat({})\nassert len(_e) == 3 and [m.split(':')[0] for m in _e] == ['area', 'rooms', 'city'], f'Все поля отсутствуют: 3 сообщения (area, rooms, city), у вас {_e}'\n_e = validate_flat({'area': '60', 'rooms': 2.0, 'city': 'Париж'})\nassert [m.split(':')[0] for m in _e] == ['area', 'rooms', 'city'], f'\"60\" — текст, 2.0 — дробь, Париж не разрешён: 3 сообщения, у вас {_e}'\nassert [m.split(':')[0] for m in validate_flat({'area': 5, 'rooms': 0, 'city': 'Астана'})] == ['area', 'rooms'], 'Значения вне диапазона — ошибка'\nassert validate_flat({'area': True, 'rooms': 1, 'city': 'Астана'})[0].startswith('area'), 'True — не число'"
    }
   },
   {
    "title": "Модель загружается один раз",
    "prompt": "<p><code>load_model()</code> — медленная функция (читает с диска), и при каждом вызове она увеличивает счётчик <code>LOADS</code>. Напишите <code>get_model()</code>: при первом вызове модель загружается и сохраняется в переменной уровня модуля <code>MODEL</code>, а при следующих вызовах возвращается тот же объект. <code>predict(x)</code> получает модель через <code>get_model()</code>.</p>",
    "hints": [
     "Чтобы изменить переменную модуля внутри функции: <code>global MODEL</code>.",
     "<code>if MODEL is None: MODEL = load_model()</code>, затем <code>return MODEL</code>."
    ],
    "check": {
     "tests": "_r = [predict(k) for k in range(6)]\nassert _r[:3] == [0.1, 0.25, 0.4], 'Результаты predict не должны меняться'\nassert LOADS == 1, f'При 6 прогнозах модель должна загрузиться один раз, у вас {LOADS} раз'\nassert get_model() is get_model() is MODEL, 'get_model() всегда должна возвращать один и тот же объект MODEL'"
    }
   },
   {
    "title": "Проверка пакета",
    "prompt": "<p>Ночная job проверяет сразу много строк. <code>validate_customer(row)</code> уже готова (она возвращает список ошибок). Напишите <code>split_valid(rows)</code>: она возвращает <code>(valid, errors)</code>, где <code>valid</code> — список строк без ошибок (в исходном порядке), а <code>errors</code> — словарь <code>{жолдың индексі: қате тізімі}</code> только для строк с ошибками.</p>",
    "hints": [
     "<code>for i, row in enumerate(rows):</code> — вместе с индексом.",
     "Если список ошибок не пустой, <code>errors[i] = e</code>, иначе <code>valid.append(row)</code>."
    ],
    "check": {
     "tests": "_rows = [{'tenure_months': 3, 'support_calls': 1}, {'tenure_months': -1, 'support_calls': 2}, {'tenure_months': 12, 'support_calls': 0}, {}]\n_v, _e = split_valid(_rows)\nassert _v == [_rows[0], _rows[2]], 'В списке valid должны остаться только строки 0 и 2'\nassert sorted(_e) == [1, 3], f'Ключи errors — индексы строк с ошибками (1 и 3), у вас {sorted(_e)}'\nassert len(_e[3]) == 2 and len(_e[1]) == 1, 'Для каждого индекса — полный список, который вернула validate_customer'\nassert split_valid([]) == ([], {}), 'Для пустого списка ([], {})'"
    }
   },
   {
    "title": "Прогноз с уровнем риска",
    "prompt": "<p>Модель уже обучена и доступна как <code>model</code>. Напишите <code>predict(customer)</code>. Проверка: <code>tenure_months</code> — целое число 0–600; <code>support_calls</code> — целое число 0–50. При ошибке верните <code>{'ok': False, 'errors': [...]}</code> (сообщения начинаются с имени поля). Если всё верно, верните <code>{'ok': True, 'churn_probability': p (3 таңба), 'risk': ..., 'model_version': MODEL_VERSION}</code>, где <code>risk</code>: p ≥ 0.7 → <code>'high'</code>, p ≥ 0.4 → <code>'medium'</code>, иначе <code>'low'</code>. Лишние ключи игнорируются.</p>",
    "hints": [
     "Разделите проверку, уровень риска и прогноз на отдельные функции.",
     "Сначала вычислите <code>risk</code> по неокругленной вероятности, а потом <code>round(p, 3)</code>."
    ],
    "check": {
     "tests": "_r = predict({'tenure_months': 2, 'support_calls': 5, 'city': 'Астана'})\nassert _r.get('ok') is True and set(_r) == {'ok', 'churn_probability', 'risk', 'model_version'}, f'Ключи ответа: ok, churn_probability, risk, model_version. У вас {sorted(_r)}'\n_p = float(model.predict_proba(pd.DataFrame([[2, 5]], columns=FEATURES))[0, 1])\nassert _r['churn_probability'] == round(_p, 3) and _r['risk'] == 'high' and _r['model_version'] == '1.1.0', 'Новый клиент с большим числом жалоб: risk high'\nassert predict({'tenure_months': 50, 'support_calls': 0})['risk'] == 'low', 'Давний клиент: risk low'\n_ps = {k: float(model.predict_proba(pd.DataFrame([[k, 2]], columns=FEATURES))[0, 1]) for k in range(0, 40)}\n_mid = next(k for k, p in _ps.items() if 0.4 <= p < 0.7)\nassert predict({'tenure_months': _mid, 'support_calls': 2})['risk'] == 'medium', 'Если 0.4 ≤ p < 0.7, risk medium'\n_r = predict({'tenure_months': 700, 'support_calls': -1})\nassert _r.get('ok') is False and [m.split(':')[0] for m in _r['errors']] == ['tenure_months', 'support_calls'], 'Значения вне диапазона: две ошибки (начинаются с имени поля)'\nassert predict({'tenure_months': 5, 'support_calls': 51})['ok'] is False, 'support_calls ≤ 50'\nassert predict({'tenure_months': '5', 'support_calls': 1})['ok'] is False, 'Текст \"5\" не принимается'"
    }
   },
   {
    "title": "Класс Predictor",
    "prompt": "<p>Оберните логику прогноза в класс. Его конструктор: <code>Predictor(model, features, threshold=0.5, version='1.0.0')</code>. Метод <code>predict(data)</code> проверяет, что каждый признак из <code>self.features</code> — неотрицательное целое число; при ошибке возвращает <code>{'ok': False, 'errors': [...]}</code>, при успехе <code>{'ok': True, 'churn_probability': p (3 таңба), 'label': int(p ≥ self.threshold), 'model_version': self.version}</code>. Создайте два объекта: <code>default</code> (порог 0.5) и <code>strict</code> (порог 0.8, версия <code>'1.0.0-strict'</code>).</p>",
    "hints": [
     "<code>__init__</code> сохраняет все параметры в <code>self</code>; проверку можно вынести в отдельный метод <code>validate</code>.",
     "Берите порог из <code>self.threshold</code>: тогда один класс работает с разными порогами."
    ],
    "check": {
     "tests": "assert isinstance(default, Predictor) and isinstance(strict, Predictor), 'default и strict — объекты Predictor'\nassert default.threshold == 0.5 and default.version == '1.0.0', 'default: порог 0.5, версия 1.0.0'\nassert strict.threshold == 0.8 and strict.version == '1.0.0-strict', 'strict: порог 0.8, версия 1.0.0-strict'\n_ps = {k: float(model.predict_proba(pd.DataFrame([[k, 3]], columns=FEATURES))[0, 1]) for k in range(0, 40)}\n_k = next(k for k, p in _ps.items() if 0.5 <= p < 0.8)\n_a, _b = default.predict({'tenure_months': _k, 'support_calls': 3, 'city': 'Алматы'}), strict.predict({'support_calls': 3, 'tenure_months': _k})\nassert _a['ok'] is True and _a['label'] == 1 and _b['label'] == 0, 'Если 0.5 ≤ p < 0.8, у default label=1, у strict label=0'\nassert _a['churn_probability'] == round(_ps[_k], 3) == _b['churn_probability'], 'Вероятность округляется до 3 знаков, в обоих объектах одинаково'\nassert _b['model_version'] == '1.0.0-strict', 'model_version — это self.version'\n_r = default.predict({'tenure_months': -3})\nassert _r['ok'] is False and len(_r['errors']) == 2, 'Отрицательный tenure и отсутствующий support_calls: 2 ошибки'"
    }
   }
  ]
 },
 "dep-3": {
  "pr": [
   {
    "title": "Health и version",
    "prompt": "<p>Готов <code>MiniApp</code>, похожий на FastAPI. С помощью декораторов добавьте два endpoint: <code>GET /health</code> → <code>{'status': 'ok'}</code>; <code>GET /version</code> → <code>{'model_version': MODEL_VERSION, 'name': 'churn-api'}</code>.</p>",
    "hints": [
     "Декоратор пишется над функцией: <code>@app.get('/health')</code>, а на следующей строке <code>def health():</code>.",
     "Функция GET не принимает параметров."
    ],
    "check": {
     "tests": "assert app.handle('GET', '/health') == (200, {'status': 'ok'}), 'GET /health → 200 и {\"status\": \"ok\"}'\nassert app.handle('GET', '/version') == (200, {'model_version': '1.3.0', 'name': 'churn-api'}), 'GET /version → model_version и name'\nassert app.handle('POST', '/health')[0] == 405, '/health принимает только GET'"
    },
    "starter": "class MiniApp:\n    \"\"\"FastAPI-ге ұқсас кішкене router: (method, path) → функция.\"\"\"\n    def __init__(self):\n        self.routes = {}\n\n    def get(self, path):\n        def register(func):\n            self.routes[('GET', path)] = func\n            return func\n        return register\n\n    def post(self, path):\n        def register(func):\n            self.routes[('POST', path)] = func\n            return func\n        return register\n\n    def handle(self, method, path, body=None):\n        func = self.routes.get((method, path))\n        if func is None:\n            if any(p == path for _, p in self.routes):\n                return 405, {'detail': 'Method Not Allowed'}\n            return 404, {'detail': 'Not Found'}\n        try:\n            result = func(body) if method == 'POST' else func()\n        except ValueError as e:\n            return 422, {'detail': str(e)}\n        return 200, result\n\napp = MiniApp()\nMODEL_VERSION = '1.3.0'\n\n# здесь регистрируйте endpoint-ы\n"
   },
   {
    "title": "Декоратор регистрации",
    "prompt": "<p>Повторим, как работает декоратор. Напишите фабрику декораторов <code>route(path)</code>: она регистрирует функцию в <code>ROUTES[path]</code> и возвращает декоратор, который возвращает <b>саму</b> функцию. Затем зарегистрируйте функцию <code>ping()</code> с помощью <code>@route('/ping')</code>: она должна возвращать <code>'pong'</code>.</p>",
    "hints": [
     "Два уровня: <code>def route(path):</code>, внутри него <code>def decorator(func):</code>, в конце <code>return decorator</code>.",
     "Внутри декоратора: <code>ROUTES[path] = func</code> и <code>return func</code>."
    ],
    "check": {
     "tests": "assert ROUTES.get('/ping') is ping, '@route(\"/ping\") должен регистрировать функцию ping в ROUTES'\nassert ping() == 'pong', 'Декоратор должен возвращать саму функцию (return func)'\n@route('/x')\ndef _x():\n    return 1\nassert ROUTES['/x'] is _x and _x() == 1, 'route должен работать с любым path'"
    }
   },
   {
    "title": "Endpoint обмена валюты",
    "prompt": "<p>Готов <code>MiniApp</code>. Добавьте endpoint <code>POST /convert</code>: возьмите из body <code>tenge</code> и возвращайте <code>{'usd': round(tenge / RATE, 2)}</code>. Если <code>tenge</code> нет или он отрицательный, выбрасывайте <code>ValueError</code> (MiniApp превратит её в 422).</p>",
    "hints": [
     "Функция POST получает body: <code>def convert(body):</code>.",
     "Если поля нет: <code>raise ValueError('tenge: міндетті өріс')</code>."
    ],
    "check": {
     "tests": "assert app.handle('POST', '/convert', {'tenge': 12345}) == (200, {'usd': 24.69}), '12345 ₸ → 24.69 $'\nassert app.handle('POST', '/convert', {'tenge': 0}) == (200, {'usd': 0.0}), '0 ₸ → 0.0'\nassert app.handle('POST', '/convert', {})[0] == 422, 'Нет tenge → 422'\nassert app.handle('POST', '/convert', {'tenge': -10})[0] == 422, 'Отрицательная сумма → 422'\nassert app.handle('GET', '/convert')[0] == 405, '/convert только POST'"
    },
    "starter": "class MiniApp:\n    \"\"\"FastAPI-ге ұқсас кішкене router: (method, path) → функция.\"\"\"\n    def __init__(self):\n        self.routes = {}\n\n    def get(self, path):\n        def register(func):\n            self.routes[('GET', path)] = func\n            return func\n        return register\n\n    def post(self, path):\n        def register(func):\n            self.routes[('POST', path)] = func\n            return func\n        return register\n\n    def handle(self, method, path, body=None):\n        func = self.routes.get((method, path))\n        if func is None:\n            if any(p == path for _, p in self.routes):\n                return 405, {'detail': 'Method Not Allowed'}\n            return 404, {'detail': 'Not Found'}\n        try:\n            result = func(body) if method == 'POST' else func()\n        except ValueError as e:\n            return 422, {'detail': str(e)}\n        return 200, result\n\napp = MiniApp()\nRATE = 500\n\n# напишите здесь @app.post('/convert')\n"
   },
   {
    "title": "Поиск path-параметра",
    "prompt": "<p>Напишите <code>match_route(pattern, path)</code> для сравнения шаблонов, похожих на <code>/customers/{customer_id}</code> из FastAPI. Если число частей одинаково и каждая часть либо точно совпадает, либо имеет вид <code>{атауы}</code>, верните словарь параметров (значения — текст); иначе верните <code>None</code>. Например, <code>(\"/customers/{customer_id}\", \"/customers/42\")</code> → <code>{\"customer_id\": \"42\"}</code>.</p>",
    "hints": [
     "Разбейте оба по <code>strip('/').split('/')</code> и пройдите их парами с помощью <code>zip</code>.",
     "Часть-параметр: <code>p.startswith('{') and p.endswith('}')</code>, её имя: <code>p[1:-1]</code>."
    ],
    "check": {
     "tests": "assert match_route('/customers/{customer_id}', '/customers/42') == {'customer_id': '42'}, '(\"/customers/{customer_id}\", \"/customers/42\") → {\"customer_id\": \"42\"}'\nassert match_route('/cities/{city}/weather/{day}', '/cities/Алматы/weather/3') == {'city': 'Алматы', 'day': '3'}, 'Несколько параметров'\nassert match_route('/health', '/health') == {}, 'Совпадающий path без параметров → пустой словарь'\nassert match_route('/customers/{id}', '/orders/42') is None, 'Фиксированная часть не совпадает → None'\nassert match_route('/customers/{id}', '/customers/42/history') is None, 'Другое число частей → None'"
    }
   },
   {
    "title": "HTTPException",
    "prompt": "<p>В FastAPI endpoint может выбросить <code>HTTPException</code> и вернуть любой статус. Напишите класс ошибки <code>HTTPException(status_code, detail)</code> (он наследуется от <code>Exception</code> и хранит два атрибута). Затем напишите <code>call(func, *args)</code>: он вызывает <code>func(*args)</code>; при <code>HTTPException</code> → <code>(e.status_code, {'detail': e.detail})</code>; при <code>ValueError</code> → <code>(422, {'detail': str(e)})</code>; при успехе → <code>(200, нәтиже)</code>. Endpoint <code>get_city(name)</code> уже готов, он использует ваш класс.</p>",
    "hints": [
     "Внутри <code>class HTTPException(Exception):</code> <code>__init__(self, status_code, detail)</code> сохраняет два атрибута.",
     "<code>call</code>: <code>try: return 200, func(*args)</code>, затем два <code>except</code>."
    ],
    "check": {
     "tests": "_e = HTTPException(403, 'рұқсат жоқ')\nassert isinstance(_e, Exception) and _e.status_code == 403 and _e.detail == 'рұқсат жоқ', 'HTTPException должен сохранять status_code и detail'\nassert call(get_city, 'Алматы') == (200, {'city': 'Алматы', 'population': 2200000}), 'Успешный вызов → 200'\nassert call(get_city, 'Орал') == (404, {'detail': 'Қала табылмады'}), 'HTTPException(404) → (404, {\"detail\": ...})'\ndef _bad(x):\n    raise ValueError('x: сан керек')\nassert call(_bad, 'a') == (422, {'detail': 'x: сан керек'}), 'ValueError → 422'"
    }
   },
   {
    "title": "Декоратор-счётчик",
    "prompt": "<p>Для мониторинга хотим знать, сколько раз вызвали каждый endpoint. Напишите декоратор <code>count_calls(func)</code>: он возвращает функцию <code>wrapper(*args)</code>, которая увеличивает счётчик <code>wrapper.calls</code> на 1 и возвращает результат <code>func(*args)</code>. Вначале <code>wrapper.calls = 0</code>.</p>",
    "hints": [
     "Внутренняя функция <code>def wrapper(*args):</code> вызывает <code>func(*args)</code>.",
     "У функции тоже есть атрибут: <code>wrapper.calls = 0</code>, а в теле — <code>wrapper.calls += 1</code>."
    ],
    "check": {
     "tests": "@count_calls\ndef _sq(x):\n    return x * x\nassert _sq.calls == 0, 'Вначале calls = 0'\nassert _sq(3) == 9 and _sq(4) == 16, 'Wrapper должен возвращать результат функции'\nassert _sq.calls == 2, 'После двух вызовов calls = 2'\n@count_calls\ndef _one():\n    return 1\n_one()\nassert _one.calls == 1 and _sq.calls == 2, 'У каждой функции должен быть свой счётчик'"
    }
   },
   {
    "title": "Router с параметрами пути",
    "prompt": "<p>Напишите класс <code>Router</code>, который поддерживает параметры пути. Декоратор <code>get(pattern)</code> добавляет <code>('GET', pattern, func)</code> в список <code>self.routes</code> и возвращает функцию. Метод <code>handle(method, path)</code>: для каждого маршрута проверяет совпадение через <code>match_route</code>; если совпало, переводит цифровые значения в <code>int</code>, вызывает <code>func(**params)</code> и возвращает <code>(200, нәтиже)</code>; если path совпал, а метод другой, возвращает <code>(405, ...)</code>; если ни один не совпал, возвращает <code>(404, ...)</code>. Функция <code>match_route</code> уже готова.</p>",
    "hints": [
     "Декоратор: <code>self.routes.append(('GET', pattern, func))</code>, затем <code>return func</code>.",
     "Преобразование: <code>{k: int(v) if v.isdigit() else v for k, v in params.items()}</code>, вызов: <code>func(**params)</code>."
    ],
    "check": {
     "tests": "_r = Router()\n@_r.get('/customers/{customer_id}')\ndef _c(customer_id):\n    return {'id': customer_id}\n@_r.get('/cities/{city}/weather')\ndef _w(city):\n    return {'city': city}\n@_r.get('/health')\ndef _h():\n    return {'status': 'ok'}\nassert _c(5) == {'id': 5}, 'Декоратор должен возвращать саму функцию'\nassert len(_r.routes) == 3, 'Каждый маршрут должен добавляться в список routes'\nassert _r.handle('GET', '/customers/42') == (200, {'id': 42}), 'Числовой параметр должен становиться int: {\"id\": 42}'\nassert _r.handle('GET', '/cities/Алматы/weather') == (200, {'city': 'Алматы'}), 'Текстовый параметр остаётся как есть'\nassert _r.handle('GET', '/health') == (200, {'status': 'ok'}), 'Маршрут без параметров'\nassert _r.handle('POST', '/customers/42')[0] == 405, 'Path совпал, метод другой → 405'\nassert _r.handle('GET', '/customers')[0] == 404 and _r.handle('GET', '/orders/1')[0] == 404, 'Нет подходящего маршрута → 404'"
    }
   },
   {
    "title": "Churn API целиком",
    "prompt": "<p>Готовы <code>MiniApp</code> и обученная модель <code>model</code>. Добавьте два endpoint: <code>GET /health</code> → <code>{'status': 'ok', 'model_version': MODEL_VERSION}</code>; <code>POST /predict</code> — в body <code>tenure_months</code> и <code>support_calls</code> должны быть неотрицательными целыми числами (иначе ошибка с именем поля: <code>ValueError</code> → 422); результат <code>{'churn_probability': p (3 таңба), 'label': int(p ≥ 0.5)}</code>. Модель должна использовать только столбцы <code>FEATURES</code> (лишние ключи игнорируются).</p>",
    "hints": [
     "В функции POST сначала проверьте <code>FEATURES</code>, а если есть ошибка — выбросьте <code>raise ValueError(f'{f}: ...')</code>.",
     "Прогноз: <code>pd.DataFrame([body])[FEATURES]</code>, <code>model.predict_proba(row)[0, 1]</code>."
    ],
    "check": {
     "tests": "assert app.handle('GET', '/health') == (200, {'status': 'ok', 'model_version': '2.0.0'}), 'GET /health → status и model_version'\n_s, _d = app.handle('POST', '/predict', {'tenure_months': 2, 'support_calls': 5, 'city': 'Алматы'})\n_p = float(model.predict_proba(pd.DataFrame([[2, 5]], columns=FEATURES))[0, 1])\nassert _s == 200 and _d == {'churn_probability': round(_p, 3), 'label': 1}, f'Результат POST /predict неверен: {_d}'\nassert app.handle('POST', '/predict', {'tenure_months': 48, 'support_calls': 0})[1]['label'] == 0, 'Давнему клиенту label 0'\n_s, _d = app.handle('POST', '/predict', {'tenure_months': 3})\nassert _s == 422 and 'support_calls' in _d['detail'], 'Нет support_calls → 422, в detail — имя поля'\nassert app.handle('POST', '/predict', {'tenure_months': -1, 'support_calls': 1})[0] == 422, 'Отрицательное значение → 422'\nassert app.handle('GET', '/predict')[0] == 405, '/predict только POST'"
    },
    "starter": "import pandas as pd\nfrom sklearn.linear_model import LogisticRegression\ndata = pd.DataFrame({\n    'tenure_months': [1, 2, 3, 5, 24, 36, 48, 12, 2, 60, 4, 30],\n    'support_calls': [5, 4, 6, 3, 0, 1, 0, 1, 5, 0, 4, 1],\n    'churned':       [1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0],\n})\nFEATURES = ['tenure_months', 'support_calls']\nclass MiniApp:\n    \"\"\"FastAPI-ге ұқсас кішкене router: (method, path) → функция.\"\"\"\n    def __init__(self):\n        self.routes = {}\n\n    def get(self, path):\n        def register(func):\n            self.routes[('GET', path)] = func\n            return func\n        return register\n\n    def post(self, path):\n        def register(func):\n            self.routes[('POST', path)] = func\n            return func\n        return register\n\n    def handle(self, method, path, body=None):\n        func = self.routes.get((method, path))\n        if func is None:\n            if any(p == path for _, p in self.routes):\n                return 405, {'detail': 'Method Not Allowed'}\n            return 404, {'detail': 'Not Found'}\n        try:\n            result = func(body) if method == 'POST' else func()\n        except ValueError as e:\n            return 422, {'detail': str(e)}\n        return 200, result\n\napp = MiniApp()\nMODEL_VERSION = '2.0.0'\nmodel = LogisticRegression().fit(data[FEATURES], data['churned'])\n\n# здесь регистрируйте endpoint-ы\n"
   }
  ]
 },
 "dep-4": {
  "pr": [
   {
    "title": "Dataclass-схема",
    "prompt": "<p>С помощью <code>@dataclass</code> напишите схему <code>Order</code>: поля <code>city: str</code>, <code>amount: int</code>, <code>qty: int = 1</code> (значение по умолчанию 1). Затем создайте <code>o = Order('Алматы', 12500)</code>.</p>",
    "hints": [
     "Над классом <code>@dataclass</code>, внутри поля с hint-ами: <code>city: str</code>.",
     "Поле со значением по умолчанию стоит в конце: <code>qty: int = 1</code>."
    ],
    "check": {
     "tests": "from dataclasses import is_dataclass as _isdc, asdict as _ad\nassert _isdc(Order), 'Order должен быть @dataclass'\nassert Order.__annotations__ == {'city': str, 'amount': int, 'qty': int}, 'Поля: city: str, amount: int, qty: int'\nassert _ad(o) == {'city': 'Алматы', 'amount': 12500, 'qty': 1}, 'o = Order(\"Алматы\", 12500), qty по умолчанию равно 1'\nassert Order('Астана', 100, 3).qty == 3, 'Если передан qty, он должен сохраниться'"
    }
   },
   {
    "title": "Превращение текста в число",
    "prompt": "<p>Данные со метеостанции: в dataclass <code>Reading(station, temp)</code> добавьте <code>__post_init__</code>: он должен превращать <code>temp</code> через <code>float()</code> (как coercion в Pydantic: <code>\"-12.5\"</code> → <code>-12.5</code>), а у <code>station</code> убирать пробелы по краям.</p>",
    "hints": [
     "<code>def __post_init__(self):</code> вызывается сразу после создания объекта.",
     "<code>self.temp = float(self.temp)</code>, <code>self.station = self.station.strip()</code>."
    ],
    "check": {
     "tests": "_r = Reading(' Алматы-1 ', '-12.5')\nassert _r.temp == -12.5 and isinstance(_r.temp, float), 'Текст \"-12.5\" должен превращаться во float'\nassert _r.station == 'Алматы-1', 'Пробелы по краям station должны убираться'\nassert Reading('Астана', 3).temp == 3.0 and isinstance(Reading('Астана', 3).temp, float), 'int тоже должен превращаться во float'\ntry:\n    Reading('Орал', 'суық')\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Сан емес мәтін ValueError беруі керек')"
    }
   },
   {
    "title": "Допустимые значения",
    "prompt": "<p>Как <code>Literal</code> в Pydantic: в dataclass <code>Ticket(route, seat_class)</code> добавьте <code>__post_init__</code>. Если <code>seat_class</code> нет в <code>SEAT_CLASSES</code>, выбрасывайте <code>ValueError</code> с сообщением, в котором есть слово <code>seat_class</code>.</p>",
    "hints": [
     "<code>if self.seat_class not in SEAT_CLASSES: raise ValueError('seat_class: ...')</code>.",
     "Проверка пишется внутри <code>__post_init__</code>."
    ],
    "check": {
     "tests": "assert Ticket('Алматы–Астана', 'econom').seat_class == 'econom', 'Правильное значение должно приниматься'\nassert Ticket('Астана–Шымкент', 'business').route == 'Астана–Шымкент', 'route должен сохраняться'\ntry:\n    Ticket('Алматы–Астана', 'first')\nexcept ValueError as _e:\n    assert 'seat_class' in str(_e), 'В сообщении должно быть слово seat_class'\nelse:\n    raise AssertionError('seat_class=\"first\" ValueError беруі керек')"
    }
   },
   {
    "title": "Схема с ограничениями",
    "prompt": "<p>Добавьте в dataclass <code>Flat(area, rooms, price)</code> метод <code>__post_init__</code> (как ограничения <code>Field</code> в Pydantic): <code>area</code> → <code>float</code>, должно быть <code>&gt; 0</code>; <code>rooms</code> → <code>int</code>, 1 ≤ rooms ≤ 10; <code>price</code> → <code>int</code>, ≥ 0. Преобразование через <code>float()</code>/<code>int()</code>. Если ограничение нарушено, выбрасывается <code>ValueError</code>, сообщение которой начинается с имени поля.</p>",
    "hints": [
     "Сначала преобразуйте: <code>self.area = float(self.area)</code> и так далее.",
     "Затем для каждого ограничения — отдельный <code>if ...: raise ValueError('өріс: ...')</code>."
    ],
    "check": {
     "tests": "_f = Flat('54.5', '2', '38000000')\nassert _f.area == 54.5 and _f.rooms == 2 and _f.price == 38000000, 'Тексты должны превращаться в числа'\nassert isinstance(_f.area, float) and isinstance(_f.rooms, int) and isinstance(_f.price, int), 'Типы: area float, rooms int, price int'\nfor _args, _field in [((0, 2, 100), 'area'), ((40, 0, 100), 'rooms'), ((40, 11, 100), 'rooms'), ((40, 2, -1), 'price')]:\n    try:\n        Flat(*_args)\n    except ValueError as _e:\n        assert str(_e).startswith(_field), f'Сообщение должно начинаться с имени поля ({_field}), у вас: {_e}'\n    else:\n        raise AssertionError(f'Flat{_args} ValueError лақтыруы керек')\nassert Flat(10, 10, 0).rooms == 10, 'Граничные значения (rooms=10, price=0) правильные'"
    }
   },
   {
    "title": "Сбор всех ошибок",
    "prompt": "<p>Pydantic не останавливается на первой ошибке и показывает все сразу. Напишите <code>validate(data, schema)</code>: <code>schema</code> — <code>{өріс: (түрлендіргіш, тексеру функциясы)}</code>. Для каждого поля: если его нет → ошибка; если преобразователь выбрасывает <code>ValueError</code> → ошибка; если проверка возвращает <code>False</code> → ошибка. Функция должна возвращать <code>(clean, errors)</code>: <code>clean</code> — словарь успешно преобразованных полей, <code>errors</code> — имена ошибочных полей (в порядке schema).</p>",
    "hints": [
     "Для каждого поля проверьте, есть ли оно; затем <code>try: conv(...)</code> → <code>ok(value)</code>; при любой ошибке <code>errors.append(field)</code> и <code>continue</code>.",
     "Цикл не должен останавливаться на первой ошибке."
    ],
    "check": {
     "tests": "assert validate({'tenure_months': '12', 'monthly_fee': '4990', 'city': 'Алматы'}, SCHEMA) == ({'tenure_months': 12, 'monthly_fee': 4990.0, 'city': 'Алматы'}, []), 'Правильные данные: всё преобразовано, ошибок нет'\n_c, _e = validate({'tenure_months': 'он', 'monthly_fee': '0', 'city': 'Париж'}, SCHEMA)\nassert _e == ['tenure_months', 'monthly_fee', 'city'] and _c == {}, f'Все три поля с ошибкой (преобразование, ограничение, допуск), у вас {_e}'\n_c, _e = validate({'tenure_months': -1, 'city': 'Астана'}, SCHEMA)\nassert _e == ['tenure_months', 'monthly_fee'] and _c == {'city': 'Астана'}, 'Отрицательный tenure и отсутствующий monthly_fee; city правильный'"
    }
   },
   {
    "title": "Схема ответа",
    "prompt": "<p>В FastAPI <code>response_model</code> проверяет и ответ. В dataclass <code>PredictionOut(probability, label, model_version)</code> добавьте <code>__post_init__</code>: <code>probability</code> должен быть в диапазоне 0..1, <code>label</code> — 0 или 1, <code>model_version</code> — непустой текст, иначе выбрасывайте <code>ValueError</code>. Затем напишите <code>to_response(p, version, threshold=0.5)</code>: она возвращает <code>asdict(PredictionOut(round(p, 3), int(p &gt;= threshold), version))</code>.</p>",
    "hints": [
     "Три проверки вида <code>if ...: raise ValueError(...)</code> записываются внутри <code>__post_init__</code>.",
     "<code>to_response</code> создаёт схему и возвращает <code>asdict(...)</code>; если возникает ошибка, она поднимается выше."
    ],
    "check": {
     "tests": "assert to_response(0.8123, '1.2.0') == {'probability': 0.812, 'label': 1, 'model_version': '1.2.0'}, 'Результат to_response(0.8123, \"1.2.0\") неверен'\nassert to_response(0.3, 'v1', threshold=0.25)['label'] == 1, 'Параметр threshold должен учитываться'\nfor _args in [(1.7, 1, 'v'), (0.5, 2, 'v'), (0.5, 1, ''), (-0.1, 0, 'v')]:\n    try:\n        PredictionOut(*_args)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f'PredictionOut{_args} ValueError лақтыруы керек')\ntry:\n    to_response(1.5, '1.0.0')\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Модель 1.5 қайтарса, шығыс схемасы ValueError беруі керек')"
    }
   },
   {
    "title": "Вложенная схема",
    "prompt": "<p>Внутри заказа есть список товаров. <code>Item(name, price, qty=1)</code>: <code>price</code> и <code>qty</code> преобразуются в <code>int</code>; должны выполняться <code>price &gt;= 0</code> и <code>qty &gt;= 1</code>, иначе выбрасывается <code>ValueError</code>. <code>Order(city, items)</code>: внутри <code>__post_init__</code> каждый словарь из списка <code>items</code> превращается в <code>Item(**d)</code> (если ошибка, она поднимается выше); если товаров нет, выбрасывается <code>ValueError</code>. <code>Order.total()</code> — это сумма <code>price * qty</code>.</p>",
    "hints": [
     "В <code>Order.__post_init__</code> запишите <code>self.items = [Item(**d) for d in self.items]</code>: ключи словарей становятся именами полей.",
     "<code>total</code>: <code>sum(i.price * i.qty for i in self.items)</code>."
    ],
    "check": {
     "tests": "_o = Order('Алматы', [{'name': 'Нан', 'price': '250', 'qty': '2'}, {'name': 'Сүт', 'price': 1290}])\nassert all(isinstance(i, Item) for i in _o.items), 'Словари в items должны превращаться в объекты Item'\nassert _o.items[0].price == 250 and _o.items[0].qty == 2 and _o.items[1].qty == 1, 'Поля Item должны преобразовываться в int, qty по умолчанию 1'\nassert _o.total() == 1790, 'total() = 250*2 + 1290 = 1790'\nfor _items in [[], [{'name': 'Шай', 'price': -5}], [{'name': 'Шай', 'price': 500, 'qty': 0}], [{'name': 'Шай', 'price': 'тегін'}]]:\n    try:\n        Order('Астана', _items)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f'Order(\"Астана\", {_items}) ValueError лақтыруы керек')\ntry:\n    Order('Астана', [{'name': 'Шай', 'price': 500, 'color': 'жасыл'}])\nexcept TypeError:\n    pass\nelse:\n    raise AssertionError('Артық өріс TypeError беруі керек (Item(**d))')"
    }
   },
   {
    "title": "422 как в FastAPI",
    "prompt": "<p>При ошибке FastAPI возвращает список ошибок по всем полям. Напишите <code>handle_flat(body)</code>. Правила: <code>area</code> — число (int/float или текст, который превращается в число) &gt; 0; <code>rooms</code> — целое число (или текст с целым числом) 1–10; <code>price</code> — целое число (или его текст) ≥ 0. Если есть ошибка, верните <code>(422, {'detail': [{'loc': өріс, 'msg': хабар}, ...]})</code> — все ошибочные поля по порядку (area, rooms, price). Если всё верно, верните <code>(200, {'area': ..., 'rooms': ..., 'price': ..., 'price_per_m2': round(price / area)})</code>.</p>",
    "hints": [
     "Положите правила в список: <code>(өріс, түрлендіргіш, тексеру, хабар)</code>, затем пройдите по нему одним циклом.",
     "Если есть ошибка: <code>detail.append({'loc': field, 'msg': ...})</code> и <code>continue</code> — не останавливайтесь."
    ],
    "check": {
     "tests": "assert handle_flat({'area': '54', 'rooms': '2', 'price': 37800000}) == (200, {'area': 54.0, 'rooms': 2, 'price': 37800000, 'price_per_m2': 700000}), 'Правильный body → 200, значения преобразованы, price_per_m2 = 700000'\n_s, _d = handle_flat({'area': 0, 'rooms': 'көп'})\nassert _s == 422 and [x['loc'] for x in _d['detail']] == ['area', 'rooms', 'price'], f'Три ошибки (area=0, rooms — текст, price нет), по порядку. У вас {_d}'\nassert all(isinstance(x.get('msg'), str) and x['msg'] for x in _d['detail']), 'В каждой ошибке должно быть сообщение msg'\n_s, _d = handle_flat({'area': 40, 'rooms': 11, 'price': '-5'})\nassert _s == 422 and [x['loc'] for x in _d['detail']] == ['rooms', 'price'], 'rooms > 10 и отрицательный price'\nassert handle_flat({'area': 40, 'rooms': None, 'price': 1})[0] == 422, 'Значение None тоже ошибка (TypeError должен перехватываться)'"
    }
   }
  ]
 },
 "dep-5": {
  "pr": [
   {
    "title": "Соответствие портов",
    "prompt": "<p><code>docker run -p 8080:8000</code> — порт 8080 хоста подключается к порту 8000 контейнера. Напишите функцию <code>parse_port(mapping)</code>: <code>\"8080:8000\"</code> → <code>(8080, 8000)</code>, то есть <code>(хост порты, container порты)</code>, и оба числа должны быть <code>int</code>.</p>",
    "hints": [
     "<code>host, container = mapping.split(':')</code>.",
     "Превратите оба в числа с помощью <code>int()</code>."
    ],
    "check": {
     "tests": "assert parse_port('8080:8000') == (8080, 8000), 'parse_port(\"8080:8000\") должна вернуть (8080, 8000)'\nassert parse_port('80:8000') == (80, 8000), 'Первое число — порт хоста'\nassert all(isinstance(x, int) for x in parse_port('5000:5000')), 'Оба числа должны быть int'"
    }
   },
   {
    "title": "Инструкции Dockerfile",
    "prompt": "<p>Напишите функцию <code>instructions(dockerfile)</code>: она возвращает по порядку список имён инструкций из текста Dockerfile (первое слово строки, в верхнем регистре). Пустые строки и комментарии, которые начинаются с <code>#</code>, не учитываются.</p>",
    "hints": [
     "Очистите каждую строку через <code>strip()</code>; если строка пустая или начинается с <code>#</code>, выполните <code>continue</code>.",
     "Первое слово: <code>line.split()[0].upper()</code>."
    ],
    "check": {
     "tests": "assert instructions(dockerfile) == ['FROM', 'WORKDIR', 'COPY', 'RUN', 'COPY', 'EXPOSE', 'CMD'], f'Список инструкций неверен: {instructions(dockerfile)}'\nassert instructions('# база\\nfrom python:3.12\\n\\n  run pip install x\\n') == ['FROM', 'RUN'], 'Комментарии и пустые строки не учитываются, имя — в верхнем регистре'"
    }
   },
   {
    "title": "Тег образа",
    "prompt": "<p>Напишите функцию <code>parse_image(ref)</code>: <code>\"churn-api:1.3.0\"</code> → <code>(\"churn-api\", \"1.3.0\")</code>. Если тег не указан, Docker считает, что это <code>latest</code>: <code>\"churn-api\"</code> → <code>(\"churn-api\", \"latest\")</code>.</p>",
    "hints": [
     "Если <code>if ':' in ref:</code>, разделите на две части.",
     "Иначе <code>return ref, 'latest'</code>."
    ],
    "check": {
     "tests": "assert parse_image('churn-api:1.3.0') == ('churn-api', '1.3.0'), '\"churn-api:1.3.0\" → (\"churn-api\", \"1.3.0\")'\nassert parse_image('churn-api') == ('churn-api', 'latest'), 'Если тега нет, \"latest\"'\nassert parse_image('python:3.12-slim') == ('python', '3.12-slim'), '\"python:3.12-slim\" → (\"python\", \"3.12-slim\")'"
    }
   },
   {
    "title": "Команда docker run",
    "prompt": "<p>Напишите функцию <code>run_command(image, host_port, container_port=8000, env=None)</code>: она возвращает текст команды <code>docker run</code>: сначала <code>docker run -p ХОСТ:CONTAINER</code>, затем для каждой переменной из словаря <code>env</code> — <code>-e КІЛТ=МӘН</code> (ключи по алфавиту), в конце image. Например, <code>run_command(\"churn-api:1.3.0\", 8080, env={\"THRESHOLD\": \"0.35\"})</code> → <code>\"docker run -p 8080:8000 -e THRESHOLD=0.35 churn-api:1.3.0\"</code>.</p>",
    "hints": [
     "Соберите части в список, а в конце выполните <code>' '.join(parts)</code>.",
     "<code>env</code> может быть <code>None</code>: тогда используйте <code>sorted(env or {})</code>."
    ],
    "check": {
     "tests": "assert run_command('churn-api:1.3.0', 8080) == 'docker run -p 8080:8000 churn-api:1.3.0', 'Если env нет, только -p и image'\nassert run_command('churn-api:1.3.0', 8080, env={'THRESHOLD': '0.35'}) == 'docker run -p 8080:8000 -e THRESHOLD=0.35 churn-api:1.3.0', 'Должно добавляться -e THRESHOLD=0.35'\nassert run_command('api:2', 80, 5000, {'PORT': '5000', 'DEBUG': 'false'}) == 'docker run -p 80:5000 -e DEBUG=false -e PORT=5000 api:2', 'Переменные по алфавиту, container_port должен учитываться'"
    }
   },
   {
    "title": "Проблемы в Dockerfile",
    "prompt": "<p>Напишите функцию <code>check_dockerfile(text)</code>: она возвращает список проблем (в таком порядке): если нет инструкции <code>EXPOSE</code> — <code>'no_expose'</code>; если последняя инструкция не <code>CMD</code> — <code>'cmd_not_last'</code>; если в строке <code>CMD</code> нет <code>0.0.0.0</code> — <code>'bad_host'</code> (даже если CMD вообще нет); если <code>COPY . .</code> стоит раньше строки <code>pip install</code> — <code>'bad_cache'</code>. Пустые строки и комментарии не учитываются.</p>",
    "hints": [
     "Сначала составьте список строк без комментариев и их имён инструкций.",
     "Индекс строки: <code>next((i for i, l in enumerate(lines) if ...), None)</code>."
    ],
    "check": {
     "tests": "assert check_dockerfile(dockerfile) == [], 'В правильном Dockerfile нет проблем'\n_bad = \"\"\"FROM python:3.12-slim\nWORKDIR /app\nCOPY . .\nRUN pip install -r requirements.txt\nCMD [\"uvicorn\", \"main:app\", \"--host\", \"127.0.0.1\"]\n\"\"\"\nassert check_dockerfile(_bad) == ['no_expose', 'bad_host', 'bad_cache'], f'Ожидалось no_expose, bad_host, bad_cache, у вас {check_dockerfile(_bad)}'\n_bad2 = \"\"\"FROM python:3.12-slim\n# порт\nCMD [\"uvicorn\", \"main:app\", \"--host\", \"0.0.0.0\"]\nEXPOSE 8000\n\"\"\"\nassert check_dockerfile(_bad2) == ['cmd_not_last'], 'CMD не последний'\nassert check_dockerfile('FROM python:3.12\\nEXPOSE 8000\\n') == ['cmd_not_last', 'bad_host'], 'CMD вообще нет: cmd_not_last и bad_host'"
    }
   },
   {
    "title": "Какой слой пересобирается",
    "prompt": "<p>Docker кэширует каждую инструкцию как слой. Напишите функцию <code>first_rebuilt(lines, changed)</code>: <code>lines</code> — инструкции Dockerfile (список), <code>changed</code> — множество изменённых файлов. Верните индекс первой строки <code>COPY</code>, источник которой содержит изменённый файл: <code>COPY . .</code> включает любой файл, <code>COPY requirements.txt .</code> — только <code>requirements.txt</code>. Если такой строки нет, верните <code>None</code> (всё берётся из кэша).</p>",
    "hints": [
     "Источник строки COPY — второе слово: <code>line.split()[1]</code>.",
     "Если <code>'.'</code>, достаточно любого изменения; иначе <code>source in changed</code>."
    ],
    "check": {
     "tests": "assert first_rebuilt(lines, {'main.py'}) == 4, 'Если меняется только код, COPY . . (строка 4) пересобирается, pip install берётся из кэша'\nassert first_rebuilt(lines, {'requirements.txt'}) == 2, 'Если меняется requirements.txt, пересобирается всё, начиная со строки 2'\nassert first_rebuilt(lines, set()) is None, 'Если ничего не меняется, None'\n_bad = ['FROM python:3.12-slim', 'COPY . .', 'RUN pip install -r requirements.txt']\nassert first_rebuilt(_bad, {'main.py'}) == 1, 'Если COPY . . стоит первым, при любом изменении pip install запускается заново'"
    }
   },
   {
    "title": "Карта кэша",
    "prompt": "<p>Напишите <code>cache_plan(lines, changed)</code>: для каждой инструкции она возвращает список <code>'cached'</code> или <code>'rebuild'</code>. Правило: если один слой пересобирается, то <b>все</b> следующие слои тоже пересобираются. Строка <code>COPY</code>, если её источник содержит изменённый файл (<code>.</code> означает любой файл, иначе список источников: <code>COPY a.py b.py ./</code>; последнее слово — цель), пересобирается. Остальные инструкции пересобираются, только если пересобран предыдущий слой. Затем <code>rebuilt_count</code> — количество слоёв, которые пересобираются для <code>lines</code>, когда изменился <code>{'main.py'}</code>.</p>",
    "hints": [
     "Заведите переменную, которая отмечает, что кэш «сломан»: после <code>broken = True</code> всё получает <code>rebuild</code>.",
     "Источники COPY: <code>line.split()[1:-1]</code> (первое — COPY, последнее — цель)."
    ],
    "check": {
     "tests": "assert cache_plan(lines, {'main.py'}) == ['cached'] * 5 + ['rebuild'] * 3, 'Если меняется main.py, пересобираются только COPY . . и следующие за ним'\nassert cache_plan(lines, {'config.py'}) == ['cached'] * 4 + ['rebuild'] * 4, 'config.py есть в COPY на строке 4'\nassert cache_plan(lines, {'requirements.txt'}) == ['cached'] * 2 + ['rebuild'] * 6, 'Если меняется requirements.txt, pip install тоже запускается заново'\nassert cache_plan(lines, set()) == ['cached'] * 8, 'Нет изменений — всё из кэша'\nassert rebuilt_count == 3, f'rebuilt_count должен быть 3, у вас {rebuilt_count}'"
    }
   },
   {
    "title": "Генератор Dockerfile",
    "prompt": "<p>Напишите функцию <code>make_dockerfile(python='3.12', port=8000, app='main:app')</code>: она возвращает правильный текст Dockerfile: <code>FROM python:&lt;python&gt;-slim</code>, <code>WORKDIR /app</code>, <code>COPY requirements.txt .</code>, <code>RUN pip install --no-cache-dir -r requirements.txt</code>, <code>COPY . .</code>, <code>EXPOSE &lt;port&gt;</code>, в конце <code>CMD</code> запускает uvicorn для <code>&lt;app&gt;</code> на хосте <code>0.0.0.0</code> и порту <code>&lt;port&gt;</code> в формате JSON (<code>CMD [\"uvicorn\", \"main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]</code>). Каждая строка должна заканчиваться <code>\\n</code>.</p>",
    "hints": [
     "Соберите строки в список и подставьте параметры через f-string.",
     "Список JSON для CMD создаёт <code>json.dumps([...])</code>: с двойными кавычками."
    ],
    "check": {
     "tests": "import json as _j\n_d = make_dockerfile()\nassert _d.endswith('\\n'), 'Каждая строка должна заканчиваться \\\\n'\n_L = _d.strip().splitlines()\nassert _L[0] == 'FROM python:3.12-slim', 'Первая строка: FROM python:3.12-slim'\nassert _L[1:5] == ['WORKDIR /app', 'COPY requirements.txt .', 'RUN pip install --no-cache-dir -r requirements.txt', 'COPY . .'], 'Порядок: WORKDIR → COPY requirements.txt → RUN pip install → COPY . .'\nassert _L[5] == 'EXPOSE 8000', 'EXPOSE 8000'\nassert _L[6].startswith('CMD ') and _j.loads(_L[6][4:]) == ['uvicorn', 'main:app', '--host', '0.0.0.0', '--port', '8000'], 'Список JSON для CMD неверен'\n_L2 = make_dockerfile('3.11', 10000, 'api:app').strip().splitlines()\nassert _L2[0] == 'FROM python:3.11-slim' and _L2[5] == 'EXPOSE 10000', 'Параметры python и port должны учитываться'\nassert _j.loads(_L2[6][4:]) == ['uvicorn', 'api:app', '--host', '0.0.0.0', '--port', '10000'], 'В CMD должны быть параметры app и port'"
    }
   }
  ]
 },
 "dep-6": {
  "pr": [
   {
    "title": "Текст в bool",
    "prompt": "<p>Переменная окружения всегда текст, а <code>bool('false')</code> → <code>True</code>! Напишите функцию <code>parse_bool(text)</code>: <code>'1'</code>, <code>'true'</code>, <code>'yes'</code> (любой регистр, пробелы по краям не учитываются) → <code>True</code>, всё остальное и <code>None</code> → <code>False</code>.</p>",
    "hints": [
     "<code>text.strip().lower() in ('1', 'true', 'yes')</code>.",
     "Проверьте <code>None</code> отдельно: у него нет метода <code>.strip()</code>."
    ],
    "check": {
     "tests": "assert parse_bool('TRUE') is True and parse_bool(' yes ') is True and parse_bool('1') is True, 'TRUE, yes, 1 → True'\nassert parse_bool('false') is False and parse_bool('0') is False and parse_bool('') is False, 'false, 0, пустая строка → False'\nassert parse_bool(None) is False, 'None → False'"
    }
   },
   {
    "title": "Чтение со значением по умолчанию",
    "prompt": "<p>Напишите функцию <code>get_int(env, key, default)</code>: она читает <code>key</code> из словаря <code>env</code> (значения которого — текст), превращает его в <code>int</code>; если ключа нет, возвращает <code>default</code>. Например, <code>get_int({'PORT': '10000'}, 'PORT', 8000)</code> → <code>10000</code>.</p>",
    "hints": [
     "Если ключа нет: <code>return default</code>.",
     "Если ключ есть, превратите текст в <code>int(env[key])</code>."
    ],
    "check": {
     "tests": "assert get_int({'PORT': '10000'}, 'PORT', 8000) == 10000, 'get_int({\"PORT\": \"10000\"}, \"PORT\", 8000) должна вернуть 10000 (int)'\nassert isinstance(get_int({'PORT': '10000'}, 'PORT', 8000), int), 'Превратите текст в int'\nassert get_int({}, 'WORKERS', 2) == 2, 'Если ключа нет, default'"
    }
   },
   {
    "title": "Разбор строки .env",
    "prompt": "<p>Напишите функцию <code>parse_env_line(line)</code>: <code>\"DB_HOST=localhost\"</code> → <code>(\"DB_HOST\", \"localhost\")</code>. Делите только по <b>первому</b> <code>=</code> (внутри значения тоже может быть <code>=</code>: <code>\"DB_URL=postgres://u:p@h/db?ssl=true\"</code>), пробелы по краям ключа и значения уберите.</p>",
    "hints": [
     "<code>line.partition('=')</code> делит на три части только по первому <code>=</code>.",
     "Или <code>line.split('=', 1)</code>."
    ],
    "check": {
     "tests": "assert parse_env_line('DB_HOST=localhost') == ('DB_HOST', 'localhost'), '\"DB_HOST=localhost\" → (\"DB_HOST\", \"localhost\")'\nassert parse_env_line('DB_URL=postgres://u:p@h/db?ssl=true') == ('DB_URL', 'postgres://u:p@h/db?ssl=true'), 'Делите только по первому ='\nassert parse_env_line(' PORT = 8000 ') == ('PORT', '8000'), 'Уберите пробелы по краям'"
    }
   },
   {
    "title": "Чтение файла .env",
    "prompt": "<p>Напишите функцию <code>parse_env(text)</code> по образцу python-dotenv: она возвращает словарь из текста файла <code>.env</code>. Пустые строки и комментарии, начинающиеся с <code>#</code>, не учитываются; ключ и значение делятся по первому <code>=</code>; если значение в кавычках (<code>\"...\"</code> или <code>'...'</code>), кавычки убираются.</p>",
    "hints": [
     "Очистите каждую строку через <code>strip()</code>; если она пустая или начинается с <code>#</code>, пропустите её; делите через <code>partition('=')</code>.",
     "Кавычки: если <code>value[0] == value[-1] and value[0] in '\"\\''</code>, то <code>value[1:-1]</code>."
    ],
    "check": {
     "tests": "_e = parse_env(env_text)\nassert _e == {'MODEL_PATH': 'models/churn_v1.2.0.joblib', 'THRESHOLD': '0.35', 'DB_PASSWORD': 's3cr3t==', 'GREETING': 'Сәлем, әлем'}, f'Результат неверен: {_e}'\nassert parse_env('# тек түсініктеме\\n\\n') == {}, 'Комментарии и пустые строки не учитываются'\nassert parse_env('EMPTY=\\n') == {'EMPTY': ''}, 'Пустое значение — пустая строка'"
    }
   },
   {
    "title": "Обязательные переменные",
    "prompt": "<p>Если у сервера нет обязательной переменной, он должен сразу остановиться с понятной ошибкой. Напишите функцию <code>require(env, names)</code>: найдите <b>все</b> отсутствующие или пустые (<code>\"\"</code>) переменные из списка <code>names</code>, назовите их в одном сообщении и выбросьте <code>RuntimeError</code> (в сообщении должно быть каждое имя); если все есть, верните словарь только из этих переменных.</p>",
    "hints": [
     "Сначала соберите отсутствующие: <code>[n for n in names if not env.get(n)]</code>.",
     "Добавьте все имена в сообщение: <code>', '.join(missing)</code>."
    ],
    "check": {
     "tests": "assert require({'MODEL_PATH': 'm.joblib', 'PORT': '8000', 'HOME': '/root'}, ['MODEL_PATH', 'PORT']) == {'MODEL_PATH': 'm.joblib', 'PORT': '8000'}, 'Возвращаться должны только запрошенные переменные'\ntry:\n    require({'PORT': '8000', 'DB_URL': ''}, ['MODEL_PATH', 'PORT', 'DB_URL'])\nexcept RuntimeError as _e:\n    assert 'MODEL_PATH' in str(_e) and 'DB_URL' in str(_e), 'В сообщении должна быть названа каждая отсутствующая переменная (пустое значение тоже считается отсутствующим)'\n    assert 'PORT' not in str(_e).replace('MODEL_PATH', ''), 'Существующая переменная не должна называться в сообщении'\nelse:\n    raise AssertionError('Айнымалы жоқ болса RuntimeError күтілді')\nassert require({}, []) == {}, 'Если ничего не запрошено, пустой словарь'"
    }
   },
   {
    "title": "Секреты в коде",
    "prompt": "<p>На code review мы ищем секреты, записанные прямо в код. Напишите функцию <code>find_secrets(code)</code>: она возвращает номера строк (с 1) вида <code>АТАУ = '...'</code> или <code>АТАУ = \"...\"</code>, где в имени (без учёта регистра) есть <code>KEY</code>, <code>SECRET</code>, <code>PASSWORD</code> или <code>TOKEN</code>, а значение — текст в кавычках. Чтение через <code>os.environ</code> или <code>os.getenv</code> — правильно, это не секрет.</p>",
    "hints": [
     "Перебирайте строки с номерами: <code>for n, line in enumerate(code.splitlines(), start=1):</code>.",
     "Если значение начинается с кавычки — это текстовый литерал: <code>value.strip()[:1] in ('\"', \"'\")</code>."
    ],
    "check": {
     "tests": "assert find_secrets(code) == [2, 5], f'Секреты в строках 2 и 5, у вас {find_secrets(code)}'\nassert find_secrets(\"x = 1\\nAUTH_TOKEN = 'abc'\\n\") == [2], 'AUTH_TOKEN = \"abc\" — секрет'\nassert find_secrets(\"API_KEY = os.environ['API_KEY']\\n\") == [], 'Чтение через os.environ — не секрет'"
    }
   },
   {
    "title": "Конфиг по окружению",
    "prompt": "<p>Напишите функцию <code>load_settings(env)</code>. <code>APP_ENV</code> — <code>dev</code>, <code>staging</code> или <code>production</code> (по умолчанию <code>dev</code>), другое значение → <code>RuntimeError</code>. Возвращает: <code>{'env', 'debug', 'log_level', 'port', 'db_url'}</code>. Если <code>DEBUG</code> не задан: в dev — <code>True</code>, иначе <code>False</code> (если задан 1/true/yes → True). Если <code>LOG_LEVEL</code> не задан: в dev — <code>'DEBUG'</code>, иначе <code>'INFO'</code> (переведите в верхний регистр). <code>PORT</code> → int, по умолчанию 8000. <code>DB_URL</code> обязателен в production (если его нет, в сообщении должны быть DB_URL и <code>RuntimeError</code>), в других средах по умолчанию <code>'sqlite:///dev.db'</code>. В production, даже если <code>debug</code> равен True, выбрасывается <code>RuntimeError</code>.</p>",
    "hints": [
     "Значения по умолчанию зависят от среды: <code>is_dev = app_env == 'dev'</code>, затем <code>debug = ... if 'DEBUG' in env else is_dev</code>.",
     "Проверки для production делайте в конце: есть ли DB_URL, включён ли debug."
    ],
    "check": {
     "tests": "assert load_settings({}) == {'env': 'dev', 'debug': True, 'log_level': 'DEBUG', 'port': 8000, 'db_url': 'sqlite:///dev.db'}, f'Значения dev по умолчанию неверны: {load_settings({})}'\nassert load_settings({'APP_ENV': 'staging', 'PORT': '9000'}) == {'env': 'staging', 'debug': False, 'log_level': 'INFO', 'port': 9000, 'db_url': 'sqlite:///dev.db'}, 'staging: debug False, log_level INFO, PORT — int'\n_p = load_settings({'APP_ENV': 'production', 'DB_URL': 'postgres://db/churn', 'LOG_LEVEL': 'warning'})\nassert _p['debug'] is False and _p['log_level'] == 'WARNING' and _p['db_url'] == 'postgres://db/churn', 'production: LOG_LEVEL — заглавными буквами, DB_URL сохраняется'\nassert load_settings({'DEBUG': 'false'})['debug'] is False, 'Если DEBUG задан, используется его значение'\nfor _env, _w in [({'APP_ENV': 'prod'}, 'APP_ENV'), ({'APP_ENV': 'production'}, 'DB_URL'), ({'APP_ENV': 'production', 'DB_URL': 'x', 'DEBUG': 'true'}, 'DEBUG')]:\n    try:\n        load_settings(_env)\n    except RuntimeError as _e:\n        assert _w in str(_e), f'{_env}: в сообщении должно быть названо {_w}'\n    else:\n        raise AssertionError(f'{_env} үшін RuntimeError күтілді')"
    }
   },
   {
    "title": "Создание .env.example",
    "prompt": "<p>В репозиторий кладут шаблон <code>.env.example</code> без секретов. Напишите функцию <code>make_example(env_text)</code>: она делает текст шаблона из текста <code>.env</code>. Комментарии и пустые строки сохраняются как есть; в каждой строке <code>КІЛТ=МӘН</code>, если в ключе (без учёта регистра) есть <code>KEY</code>, <code>SECRET</code>, <code>PASSWORD</code> или <code>TOKEN</code>, строка записывается как <code>КІЛТ=</code> (без значения), иначе строка не меняется. Порядок строк сохраняется, каждая строка заканчивается <code>\\n</code>.</p>",
    "hints": [
     "Просмотрите каждую строку и меняйте только строки вида <code>КІЛТ=МӘН</code>; комментарий и пустую строку оставляйте как есть.",
     "Ключ: <code>line.partition('=')[0].strip()</code>; если это секрет, то <code>key + '='</code>."
    ],
    "check": {
     "tests": "_x = make_example(env_text)\nassert _x == '# Churn API\\nMODEL_PATH=models/churn_v1.2.0.joblib\\nDB_PASSWORD=\\n\\nopenai_api_key=\\nTHRESHOLD=0.35\\n', f'Результат неверен:\\n{_x}'\nassert 's3cr3t' not in _x and 'sk-abc123' not in _x, 'Секретные значения не должны быть в шаблоне'\nassert make_example('GITHUB_TOKEN=ghp_x\\n# PASSWORD=ескі\\n') == 'GITHUB_TOKEN=\\n# PASSWORD=ескі\\n', 'Комментарий не меняется, TOKEN скрывается'"
    }
   }
  ]
 },
 "dep-7": {
  "pr": [
   {
    "title": "Процент uptime",
    "prompt": "<p>Платформа каждую минуту отправляла запрос на <code>/health</code> и записывала статус-коды в список <code>checks</code>. Напишите функцию <code>uptime(checks)</code>: она возвращает процент проверок со статусом 200, округлённый до 2 знаков. Если список пустой, <code>100.0</code>.</p>",
    "hints": [
     "<code>sum(1 for s in checks if s == 200)</code> — количество успешных проверок.",
     "Процент: <code>ok / len(checks) * 100</code>, затем <code>round(..., 2)</code>."
    ],
    "check": {
     "tests": "assert uptime([200, 200, 503, 200]) == 75.0, 'uptime([200, 200, 503, 200]) должна вернуть 75.0'\nassert uptime([200] * 2 + [500]) == 66.67, 'Округлите результат до 2 знаков'\nassert uptime([]) == 100.0, 'Для пустого списка 100.0'"
    }
   },
   {
    "title": "Холодный старт",
    "prompt": "<p>Бесплатный сервис Render «засыпает», если простаивает. Напишите функцию <code>is_sleeping(last_request, now, idle_limit=900)</code> (время в секундах): если с последнего запроса прошло <code>idle_limit</code> или больше, она возвращает <code>True</code> — следующий запрос будет ждать холодного старта.</p>",
    "hints": [
     "Прошедшее время: <code>now - last_request</code>.",
     "Условие: <code>&gt;= idle_limit</code>."
    ],
    "check": {
     "tests": "assert is_sleeping(1000, 1800) is False, 'Прошло 800 с: ещё не спит'\nassert is_sleeping(1000, 1900) is True, 'Ровно 900 с прошло: спит'\nassert is_sleeping(0, 100, idle_limit=60) is True, 'Параметр idle_limit должен учитываться'"
    }
   },
   {
    "title": "Readiness: модель и база",
    "prompt": "<p>Напишите функцию <code>readiness(state)</code>: сервис готов, когда модель загружена (<code>state['model']</code> — не <code>None</code>) <b>и</b> подключение к базе есть (<code>state['db_ok']</code> равно True). Если готов, она возвращает <code>(200, {'status': 'ready'})</code>, иначе <code>(503, {'status': 'not ready', 'missing': [...]})</code>, где <code>missing</code> — <code>'model'</code> и/или <code>'db'</code> (в этом порядке).</p>",
    "hints": [
     "Соберите отсутствующие в список: <code>if state['model'] is None: missing.append('model')</code>.",
     "Если список не пуст — 503."
    ],
    "check": {
     "tests": "assert readiness({'model': 'm', 'db_ok': True}) == (200, {'status': 'ready'}), 'Всё готово → 200'\nassert readiness({'model': None, 'db_ok': True}) == (503, {'status': 'not ready', 'missing': ['model']}), 'Нет модели → 503, missing [\"model\"]'\nassert readiness({'model': None, 'db_ok': False}) == (503, {'status': 'not ready', 'missing': ['model', 'db']}), 'Нет обоих → [\"model\", \"db\"]'\nassert readiness({'model': 'm', 'db_ok': False})[1]['missing'] == ['db'], 'Нет базы → [\"db\"]'"
    }
   },
   {
    "title": "Нужен ли перезапуск",
    "prompt": "<p>Платформа перезапускает container, если liveness-проверка подряд <code>limit</code> раз не прошла (статус не 200). Напишите функцию <code>should_restart(history, limit=3)</code>: <code>history</code> — список статус-кодов (от старых к новым); если все последние <code>limit</code> проверок не прошли, верните <code>True</code>. Если проверок меньше <code>limit</code>, верните <code>False</code>.</p>",
    "hints": [
     "Последние <code>limit</code> элемента: <code>history[-limit:]</code>.",
     "<code>all(s != 200 for s in ...)</code>; сначала проверьте длину."
    ],
    "check": {
     "tests": "assert should_restart([200, 503, 503, 503]) is True, 'Последние три не прошли → True'\nassert should_restart([503, 503, 200, 503]) is False, 'Если между ними есть 200 → False'\nassert should_restart([503, 503]) is False, 'Проверок меньше limit → False'\nassert should_restart([200, 500, 502], limit=2) is True, 'limit=2: последние два не прошли'"
    }
   },
   {
    "title": "Проверка деплоя",
    "prompt": "<p>После деплоя проверяем, что новая версия действительно запустилась. Напишите функцию <code>verify_deploy(handle, expected_version)</code>: <code>handle(method, path, body=None)</code> → <code>(status, data)</code>. Проверки: <code>'health'</code> — <code>GET /health</code> возвращает 200; <code>'ready'</code> — <code>GET /ready</code> возвращает 200; <code>'version'</code> — в ответе <code>/ready</code> поле <code>model_version</code> равно <code>expected_version</code> (если ready не вернул 200, эта проверка тоже не проходит). Верните названия непрошедших проверок в порядке их следования.</p>",
    "hints": [
     "Отправьте один запрос на <code>/ready</code> и используйте его статус и data для обеих проверок.",
     "Версия: <code>data.get('model_version') != expected_version</code>."
    ],
    "check": {
     "tests": "assert verify_deploy(new_service, '1.3.0') == [], 'Для правильного деплоя — пустой список'\nassert verify_deploy(new_service, '1.4.0') == ['version'], 'Запущена старая версия → [\"version\"]'\ndef _loading(method, path, body=None):\n    if path == '/health':\n        return 200, {}\n    return 503, {'status': 'loading'}\nassert verify_deploy(_loading, '1.3.0') == ['ready', 'version'], 'Модель ещё загружается → ready и version'\ndef _down(method, path, body=None):\n    return 502, {}\nassert verify_deploy(_down, '1.3.0') == ['health', 'ready', 'version'], 'Сервиса нет → все три'"
    }
   },
   {
    "title": "Тег образа не latest",
    "prompt": "<p>Одно правило чек-листа деплоя: в теге image должна быть версия, а не <code>latest</code>. Напишите функцию <code>check_tag(image)</code>: если тега нет или он <code>latest</code>, верните <code>'no_version'</code>; если тег <code>X.Y.Z</code> (три части, каждая — цифры), верните <code>'ok'</code>; для другого тега (например <code>dev</code>, <code>1.3</code>) верните <code>'not_semver'</code>.</p>",
    "hints": [
     "Отделите тег: <code>name, _, tag = image.partition(':')</code>.",
     "Проверка версии: <code>len(parts) == 3 and all(p.isdigit() for p in parts)</code>."
    ],
    "check": {
     "tests": "assert check_tag('churn-api:1.3.0') == 'ok', '\"churn-api:1.3.0\" → ok'\nassert check_tag('churn-api') == 'no_version' and check_tag('churn-api:latest') == 'no_version', 'Тега нет или latest → no_version'\nassert check_tag('churn-api:dev') == 'not_semver' and check_tag('churn-api:1.3') == 'not_semver', 'dev и 1.3 → not_semver'"
    }
   },
   {
    "title": "Выпуск и откат",
    "prompt": "<p>Напишите функцию <code>release(state, new_version, smoke_failures)</code>. <code>state</code> — <code>{'active': ағымдағы нұсқа, 'history': бұрынғы белсенді нұсқалар тізімі}</code>. Если smoke test прошёл (<code>smoke_failures</code> пуст), текущая версия добавляется в <code>history</code>, <code>new_version</code> становится активной, возвращается <code>('released', new_version)</code>. Если нет, ничего не меняется и возвращается <code>('rolled_back', ағымдағы нұсқа)</code>. Также напишите функцию <code>rollback(state)</code>: она делает активной последнюю версию из <code>history</code> (удаляя её из истории) и возвращает её; если история пуста, выбрасывается <code>ValueError</code>.</p>",
    "hints": [
     "При неудачном smoke test сразу <code>return 'rolled_back', state['active']</code> — state не меняется.",
     "<code>rollback</code>: <code>state['active'] = state['history'].pop()</code>."
    ],
    "check": {
     "tests": "_s = {'active': '1.2.0', 'history': ['1.0.0', '1.1.0']}\nassert release(_s, '1.3.0', ['predict']) == ('rolled_back', '1.2.0'), 'Если smoke test не прошёл → rolled_back, текущая версия'\nassert _s == {'active': '1.2.0', 'history': ['1.0.0', '1.1.0']}, 'При неудачном выпуске state не должен меняться'\nassert release(_s, '1.3.0', []) == ('released', '1.3.0'), 'При успехе → released'\nassert _s == {'active': '1.3.0', 'history': ['1.0.0', '1.1.0', '1.2.0']}, 'Прежняя версия должна добавляться в history'\nassert rollback(_s) == '1.2.0' and _s == {'active': '1.2.0', 'history': ['1.0.0', '1.1.0']}, 'rollback возвращает последнюю версию'\n_e = {'active': '1.0.0', 'history': []}\ntry:\n    rollback(_e)\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Тарих бос болса ValueError')"
    }
   },
   {
    "title": "Монитор health",
    "prompt": "<p>Моделируем поведение платформы. Напишите функцию <code>monitor(statuses, limit=3)</code>: <code>statuses</code> — статусы liveness-проверок (по порядку). Считайте подряд идущие неудачные проверки (не 200); когда их число достигает <code>limit</code>, container перезапускается: добавьте индекс этой проверки в список и обнулите счётчик. Удачная проверка тоже обнуляет счётчик. Верните <code>{'restarts': [индекстер], 'uptime': 200 үлесінің пайызы (2 таңба)}</code>.</p>",
    "hints": [
     "Внутри <code>for i, s in enumerate(statuses):</code> ведите счётчик <code>fails</code>.",
     "Когда <code>fails == limit</code>, выполните <code>restarts.append(i)</code> и <code>fails = 0</code>."
    ],
    "check": {
     "tests": "assert monitor([200, 503, 503, 503, 200]) == {'restarts': [3], 'uptime': 40.0}, '3 неудачи подряд (1, 2, 3) → restart на индексе 3'\nassert monitor([200, 500, 500, 500, 500, 500, 500])['restarts'] == [3, 6], 'После restart счётчик обнуляется: 3 и 6'\nassert monitor([503, 503, 200, 503, 503, 200])['restarts'] == [], 'Если между ними есть 200, счётчик обнуляется'\nassert monitor([500, 500], limit=2) == {'restarts': [1], 'uptime': 0.0}, 'Параметр limit должен учитываться'\nassert monitor([]) == {'restarts': [], 'uptime': 100.0}, 'Пустой список'\nassert monitor([200, 200, 500])['uptime'] == 66.67, 'uptime округляется до 2 знаков'"
    }
   }
  ]
 },
 "dep-8": {
  "pr": [
   {
    "title": "Из секунд в миллисекунды",
    "prompt": "<p><code>time.perf_counter()</code> возвращает секунды. Напишите функцию <code>to_ms(durations)</code>: она переводит список секунд в миллисекунды, округляет каждое значение до 1 знака после запятой и возвращает список. Например, <code>[0.0421, 0.0035]</code> → <code>[42.1, 3.5]</code>.</p>",
    "hints": [
     "1 с = 1000 мс.",
     "<code>[round(d * 1000, 1) for d in durations]</code>."
    ],
    "check": {
     "tests": "assert to_ms([0.0421, 0.0035]) == [42.1, 3.5], 'to_ms([0.0421, 0.0035]) должна вернуть [42.1, 3.5]'\nassert to_ms([1]) == [1000.0], '1 с = 1000.0 мс'\nassert to_ms([]) == [], 'Пустой список'"
    }
   },
   {
    "title": "Пропускная способность",
    "prompt": "<p>В нагрузочном тесте за <code>seconds</code> секунд обработано <code>n_requests</code> запросов. Напишите функцию <code>rps(n_requests, seconds)</code>: она возвращает число запросов в секунду, округлённое до 1 знака после запятой. Если <code>seconds</code> равно 0 или меньше, функция выбрасывает <code>ValueError</code>.</p>",
    "hints": [
     "<code>round(n_requests / seconds, 1)</code>.",
     "Сначала <code>if seconds &lt;= 0: raise ValueError(...)</code>."
    ],
    "check": {
     "tests": "assert rps(12000, 60) == 200.0, 'rps(12000, 60) должна вернуть 200.0'\nassert rps(1000, 7) == 142.9, 'Округлите результат до 1 знака'\nfor _s in [0, -5]:\n    try:\n        rps(10, _s)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f'seconds={_s} үшін ValueError күтілді')"
    }
   },
   {
    "title": "Самые медленные запросы",
    "prompt": "<p>Напишите функцию <code>slowest(latencies, n=3)</code>: она возвращает время <code>n</code> самых медленных запросов в порядке убывания. Например, <code>[40, 610, 38, 890, 52]</code> → <code>[890, 610, 52]</code>. Если запросов меньше, чем <code>n</code>, верните все.</p>",
    "hints": [
     "<code>sorted(latencies, reverse=True)</code> — по убыванию.",
     "Первые n элементов: <code>[:n]</code>."
    ],
    "check": {
     "tests": "assert slowest([40, 610, 38, 890, 52]) == [890, 610, 52], 'slowest([40, 610, 38, 890, 52]) должна вернуть [890, 610, 52]'\nassert slowest([5, 1], n=5) == [5, 1], 'Если n больше длины списка, вернуть все'\n_l = [3, 1, 2]\nslowest(_l, 1)\nassert _l == [3, 1, 2], 'Входной список не должен меняться'"
    }
   },
   {
    "title": "Разбиение на части",
    "prompt": "<p>Напишите функцию <code>chunks(rows, size)</code>: она делит список на части длиной <code>size</code> и возвращает список частей (последняя может быть короче). Если <code>size</code> меньше 1, функция выбрасывает <code>ValueError</code>. Например, <code>chunks([1, 2, 3, 4, 5], 2)</code> → <code>[[1, 2], [3, 4], [5]]</code>.</p>",
    "hints": [
     "<code>range(0, len(rows), size)</code> — начало каждой части.",
     "<code>rows[i:i + size]</code>."
    ],
    "check": {
     "tests": "assert chunks([1, 2, 3, 4, 5], 2) == [[1, 2], [3, 4], [5]], 'chunks([1, 2, 3, 4, 5], 2) должна вернуть [[1, 2], [3, 4], [5]]'\nassert chunks(list(range(10)), 5) == [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9]], 'Если делится ровно, последняя часть полная'\nassert chunks([], 3) == [], 'Для пустого списка []'\ntry:\n    chunks([1], 0)\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('size=0 үшін ValueError')"
    }
   },
   {
    "title": "Отчёт SLO",
    "prompt": "<p>Напишите функцию <code>slo_report(latencies, slo_ms=200, q=95)</code>: она возвращает словарь вида <code>{'p50': медиана, 'pq': q-перцентиль, 'ok': pq &lt;= slo_ms}</code>, вычисляя перцентили через <code>numpy.percentile</code>. Числа округлены до 1 знака и имеют тип <code>float</code>; <code>ok</code> — тип <code>bool</code>.</p>",
    "hints": [
     "Используйте <code>np.percentile(latencies, q)</code>.",
     "Тип <code>bool_</code> из numpy превращается в обычный bool при помощи <code>bool(...)</code>."
    ],
    "check": {
     "tests": "import numpy as _np\n_r = slo_report(latencies)\nassert _r == {'p50': 40.5, 'pq': round(float(_np.percentile(latencies, 95)), 1), 'ok': False}, f'slo_report(latencies) неверен: {_r}'\nassert type(_r['ok']) is bool and type(_r['p50']) is float, 'ok — bool, числа — float'\nassert slo_report(latencies, q=90)['ok'] is True, 'q=90: p90 ≈ 52.6 мс ≤ 200, ok True'\nassert slo_report([100, 300], slo_ms=300, q=50) == {'p50': 200.0, 'pq': 200.0, 'ok': True}, 'Параметры slo_ms и q должны учитываться'"
    }
   },
   {
    "title": "Лимит batch-эндпоинта",
    "prompt": "<p>Эндпоинт <code>POST /predict_batch</code> не должен принимать слишком много строк в одном запросе. Напишите функцию <code>handle_batch(rows, max_rows=100)</code>: если <code>rows</code> пуст, верните <code>(400, {'error': 'бос сұрау'})</code>; если строк больше <code>max_rows</code>, верните <code>(413, {'error': ...})</code> (в сообщении должен быть лимит); иначе верните <code>(200, {'predictions': [score(r) for r in rows], 'count': жол саны})</code>.</p>",
    "hints": [
     "Две проверки по порядку: сначала пуст ли он, затем <code>len(rows) &gt; max_rows</code>.",
     "Добавьте лимит в сообщение 413 через f-строку."
    ],
    "check": {
     "tests": "assert handle_batch([{'support_calls': 2}, {'support_calls': 9}]) == (200, {'predictions': [0.3, 1.0], 'count': 2}), 'Правильный запрос → 200, predictions и count'\nassert handle_batch([]) == (400, {'error': 'бос сұрау'}), 'Пустой список → 400'\n_s, _d = handle_batch([{'support_calls': 1}] * 101)\nassert _s == 413 and '100' in _d['error'], '101 строка → 413, в сообщении лимит (100)'\nassert handle_batch([{'support_calls': 1}] * 100)[0] == 200, 'Ровно 100 строк — разрешено'\nassert handle_batch([{'support_calls': 1}] * 6, max_rows=5)[0] == 413, 'Параметр max_rows должен учитываться'"
    }
   },
   {
    "title": "Выбор размера batch",
    "prompt": "<p>Стоимость вызова модели: каждый вызов <code>predict_proba</code> стоит <code>overhead_ms</code> плюс <code>per_row_ms</code> на каждую строку. <code>total_ms(n_rows, batch_size, overhead_ms=5, per_row_ms=0.02)</code> — время предсказания всех строк пакетами (число вызовов <code>ceil(n_rows / batch_size)</code>), округлённое до 2 знаков. <code>best_batch(n_rows, sizes, max_call_ms)</code> — из размеров, у которых время одного вызова (<code>overhead_ms + per_row_ms * batch_size</code>) не больше <code>max_call_ms</code>, возвращает размер с наименьшим общим временем; если таких размеров нет, возвращает <code>None</code>.</p>",
    "hints": [
     "Число вызовов: <code>math.ceil(n_rows / batch_size)</code>; время: <code>calls * overhead_ms + n_rows * per_row_ms</code>.",
     "Сначала отфильтруйте размеры, не превышающие лимит, затем выберите <code>min(ok, key=...)</code>."
    ],
    "check": {
     "tests": "assert total_ms(1000, 1) == 5020.0, 'Поштучно: 1000 вызовов × 5 мс + 20 мс = 5020.0'\nassert total_ms(1000, 1000) == 25.0, 'Один batch: 5 + 20 = 25.0 мс'\nassert total_ms(2500, 1000) == 65.0, '2500 строк, batch 1000 → 3 вызова: 15 + 50 = 65.0'\nassert best_batch(2_000_000, [1, 100, 10_000, 100_000], 300) == 10_000, 'Лимит 300 мс: 100 000 строк займут 2005 мс, лучший размер — 10 000'\nassert best_batch(100, [500, 1000], 6) is None, 'Если ни один размер не укладывается в лимит, None'\nassert best_batch(50, [10, 50, 100], 1000) in (50, 100), 'Для 50 строк: 50 или 100 — один вызов'"
    }
   },
   {
    "title": "Измерение latency",
    "prompt": "<p>Напишите <code>measure(func, rows)</code>: для каждой строки измерьте время вызова <code>func(row)</code> с помощью <code>time.perf_counter()</code> и соберите список миллисекунд. Верните <code>{'n': шақыру саны, 'p50': ..., 'p95': ..., 'max': ...}</code> (перцентили через <code>np.percentile</code>, значения типа <code>float</code>, в мс). Результат <code>func</code> не нужен. Для пустого <code>rows</code> выбросите <code>ValueError</code>.</p>",
    "hints": [
     "Каждый вызов замерьте между <code>t0 = time.perf_counter()</code> и <code>(time.perf_counter() - t0) * 1000</code>.",
     "Верните результат в виде <code>float(np.percentile(latencies, 95))</code>."
    ],
    "check": {
     "tests": "_calls = []\ndef _f(r):\n    _calls.append(r)\n    if r == 'slow':\n        _t = time.perf_counter()\n        while time.perf_counter() - _t < 0.02:\n            pass\n_r = measure(_f, ['fast'] * 19 + ['slow'])\nassert len(_calls) == 20 and _r['n'] == 20, 'Для каждой строки func должна быть вызвана один раз'\nassert set(_r) == {'n', 'p50', 'p95', 'max'}, 'Ключи: n, p50, p95, max'\nassert all(isinstance(_r[k], float) for k in ('p50', 'p95', 'max')), 'Времена должны быть float'\nassert _r['max'] >= 19, f'Медленный вызов ≈ 20 мс: max должен быть в миллисекундах, у вас {_r[\"max\"]}'\nassert 0 <= _r['p50'] < 5 and _r['p50'] <= _r['p95'] <= _r['max'], 'p50 ≤ p95 ≤ max, быстрые вызовы занимают доли мс'\ntry:\n    measure(_f, [])\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Бос rows үшін ValueError')"
    }
   }
  ]
 }
} });
