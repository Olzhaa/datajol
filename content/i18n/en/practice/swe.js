// swe practice tasks: English text. Code, solutions and checks are in content/practice/swe.js.
DJ.i18n.patch({ lessons: {
 "swe-1": {
  "pr": [
   {
    "title": "Clean a phone number",
    "prompt": "<p>Write the function <code>clean_phone(text)</code>. It should keep only the digits from the text and return them as a string. For example, <code>\"+7 (701) 123-45-67\"</code> → <code>\"77011234567\"</code>. The result must be returned with <code>return</code>.</p>",
    "hints": [
     "Check each character with <code>ch.isdigit()</code>.",
     "To join the digits into one string, use <code>''.join(...)</code>."
    ],
    "check": {
     "tests": "assert clean_phone('+7 (701) 123-45-67') == '77011234567', 'clean_phone(\"+7 (701) 123-45-67\") must return \"77011234567\"'\nassert clean_phone('8 777 000 11 22') == '87770001122', 'Spaces must be removed too'\nassert clean_phone('') == '', 'For an empty text, return an empty string'"
    }
   },
   {
    "title": "Price with VAT",
    "prompt": "<p>Write the function <code>price_with_vat(price, rate=0.12)</code>. It should add VAT to the price, round the result to 2 decimal places and return it. If <code>rate</code> is not passed, 12% is used. For example, <code>price_with_vat(1000)</code> → <code>1120.0</code>, <code>price_with_vat(1000, 0.1)</code> → <code>1100.0</code>.</p>",
    "hints": [
     "Default value: <code>def price_with_vat(price, rate=0.12):</code>.",
     "<code>round(price * (1 + rate), 2)</code>."
    ],
    "check": {
     "tests": "assert price_with_vat(1000) == 1120.0, 'price_with_vat(1000) must return 1120.0 (rate defaults to 0.12)'\nassert price_with_vat(1000, 0.1) == 1100.0, 'price_with_vat(1000, 0.1) must return 1100.0'\nassert price_with_vat(999, 0) == 999, 'With rate=0 the price does not change'\nassert price_with_vat(12.5) == 14.0, 'Round the result to 2 decimal places'"
    }
   },
   {
    "title": "A function with a docstring",
    "prompt": "<p>Write the function <code>normalize_city(name)</code>. It should strip the spaces at the ends, make the first letter capital and the rest lowercase (<code>\" аЛМАТЫ \"</code> → <code>\"Алматы\"</code>). Write a <b>docstring</b> that explains what the function does.</p>",
    "hints": [
     "<code>name.strip().capitalize()</code>.",
     "The docstring is written on the first line of the function inside triple quotes: <code>\"\"\"...\"\"\"</code>."
    ],
    "check": {
     "tests": "assert normalize_city(' аЛМАТЫ ') == 'Алматы', 'normalize_city(\" аЛМАТЫ \") must return \"Алматы\"'\nassert normalize_city('шымкент') == 'Шымкент', 'normalize_city(\"шымкент\") must return \"Шымкент\"'\nassert normalize_city.__doc__ and normalize_city.__doc__.strip(), 'Write a docstring for the function'"
    }
   },
   {
    "title": "Delivery cost",
    "prompt": "<p>Write the function <code>delivery_cost(weight_kg, city='Алматы')</code>. In Almaty the base price is 1000 ₸, for other cities it is 2000 ₸. If the weight is over 5 kg, 200 ₸ is added for each incomplete kilogram over 5 kg (5.5 kg → 1 kg, 7 kg → 2 kg). The result is <code>int</code>. For example, <code>delivery_cost(3)</code> → <code>1000</code>, <code>delivery_cost(7, 'Астана')</code> → <code>2400</code>.</p>",
    "hints": [
     "Base price: <code>1000 if city == 'Алматы' else 2000</code>.",
     "Round the extra kilograms up: <code>math.ceil(weight_kg - 5)</code>, and if the result is negative, use 0."
    ],
    "check": {
     "tests": "assert delivery_cost(3) == 1000, 'delivery_cost(3) must return 1000 (the default city is Almaty)'\nassert delivery_cost(5) == 1000, 'Exactly 5 kg: no extra charge'\nassert delivery_cost(7, 'Астана') == 2400, 'delivery_cost(7, \"Астана\") must return 2400'\nassert delivery_cost(5.5) == 1200, '5.5 kg: the extra 0.5 kg counts as a full 1 kg, so the total is 1200'\nassert isinstance(delivery_cost(10, 'Орал'), int), 'The result must be an int'\nassert delivery_cost(10, 'Орал') == 3000, 'delivery_cost(10, \"Орал\") must return 3000'"
    }
   },
   {
    "title": "Reusing a function",
    "prompt": "<p><code>parse_price(text)</code> is already done. Write the function <code>total_price(texts)</code>: it should return the sum of a list of prices given as strings. Do not copy the logic for handling each price, call <code>parse_price</code> instead. For example, <code>total_price([\"12 500 ₸\", \"990₸\"])</code> → <code>13490</code>.</p>",
    "hints": [
     "<code>sum(parse_price(t) for t in texts)</code>.",
     "The sum of an empty list is 0."
    ],
    "check": {
     "tests": "assert total_price(['12 500 ₸', '990₸']) == 13490, 'total_price([\"12 500 ₸\", \"990₸\"]) must return 13490'\nassert total_price([]) == 0, 'For an empty list the result is 0'\n_orig = parse_price\n_calls = []\ndef parse_price(text):\n    _calls.append(text)\n    return _orig(text)\n_r = total_price(['100 ₸', '200 ₸'])\nparse_price = _orig\nassert _r == 300 and len(_calls) == 2, 'Do not copy the logic inside total_price, call parse_price'"
    }
   },
   {
    "title": "Filtering orders",
    "prompt": "<p>Write the function <code>filter_orders(orders, min_amount=0, city=None)</code>: it should return a list of orders where <code>amount &gt;= min_amount</code>. If <code>city</code> is passed, only orders from that city remain; if <code>None</code>, orders from all cities. The order in the list must be kept.</p>",
    "hints": [
     "Set default values for both parameters: <code>min_amount=0, city=None</code>.",
     "Check the city only when <code>city is not None</code>."
    ],
    "check": {
     "tests": "_ids = lambda xs: [o['id'] for o in xs]\nassert _ids(filter_orders(orders)) == [1, 2, 3, 4], 'Without parameters all orders must be returned'\nassert _ids(filter_orders(orders, 1000)) == [1, 2, 4], 'filter_orders(orders, 1000) → orders 1, 2, 4'\nassert _ids(filter_orders(orders, city='Алматы')) == [1, 3], 'city=\"Алматы\" keeps only Almaty orders'\nassert _ids(filter_orders(orders, 1000, 'Алматы')) == [1], 'Both conditions must work together'\nassert filter_orders(orders, city='Орал') == [], 'For a city with no orders, return an empty list'"
    }
   },
   {
    "title": "Parsing a receipt",
    "prompt": "<p>The receipt text comes as lines: each line has <code>атауы — баға</code> (dash <code>—</code>). Write two functions:<br>• <code>parse_line(line)</code> → <code>(атауы, баға)</code>, with the price <code>int</code>: <code>\"Сүт — 1 290 ₸\"</code> → <code>(\"Сүт\", 1290)</code>;<br>• <code>receipt_total(text)</code> → the sum of all lines (empty lines are not counted); it must use <code>parse_line</code>.</p>",
    "hints": [
     "Split the line at the dash: <code>name, price = line.split('—')</code>, then clean both parts with <code>strip()</code>.",
     "Skip an empty line: <code>if line.strip():</code>."
    ],
    "check": {
     "tests": "assert parse_line('Сүт — 1 290 ₸') == ('Сүт', 1290), 'parse_line(\"Сүт — 1 290 ₸\") must return (\"Сүт\", 1290)'\nassert parse_line('Нан — 250₸') == ('Нан', 250), 'A price with extra spaces must also be handled'\nassert receipt_total(receipt) == 4990, 'receipt_total(receipt) must return 4990'\nassert receipt_total('') == 0, 'For an empty receipt the result is 0'\nassert receipt_total('Қант — 600 ₸\\n\\n\\nШай — 1 000 ₸') == 1600, 'Empty lines must not be counted'"
    }
   },
   {
    "title": "Sales summary",
    "prompt": "<p>Write the function <code>summary(orders, city=None)</code>: it should return a dictionary <code>{'count': саны, 'total': қосындысы, 'avg': орташасы}</code>. If <code>city</code> is passed, only the orders of that city are counted. Round the average to 2 decimal places. If there are no orders, <code>0.0</code> (without division by zero).</p>",
    "hints": [
     "First collect the needed amounts into a list: <code>[o['amount'] for o in orders if city is None or o['city'] == city]</code>.",
     "Average: <code>round(total / count, 2) if count else 0.0</code>."
    ],
    "check": {
     "tests": "assert summary(orders) == {'count': 3, 'total': 25500, 'avg': 8500.0}, 'summary(orders) for all orders must give count=3, total=25500, avg=8500.0'\nassert summary(orders, 'Алматы') == {'count': 2, 'total': 17500, 'avg': 8750.0}, 'For Almaty: count=2, total=17500, avg=8750.0'\nassert summary(orders, 'Орал') == {'count': 0, 'total': 0, 'avg': 0.0}, 'If there are no orders, avg=0.0, with no error'\nassert summary([{'city': 'Алматы', 'amount': 1}, {'city': 'Алматы', 'amount': 2}, {'city': 'Алматы', 'amount': 2}])['avg'] == 1.67, 'Round the average to 2 decimal places'"
    }
   }
  ]
 },
 "swe-2": {
  "pr": [
   {
    "title": "Types in taxi fares",
    "prompt": "<p>Add type hints to the function <code>taxi_fare(km)</code>: <code>km: float</code>, and it must return <code>int</code>. The price is 500 ₸ for boarding and 120 ₸ per kilometre; the result is converted to an integer with <code>round</code>. For example, <code>taxi_fare(4.5)</code> → <code>1040</code>.</p>",
    "hints": [
     "After the parameter write <code>: float</code>, after the bracket write <code>-&gt; int</code>.",
     "<code>round(...)</code> returns an integer."
    ],
    "check": {
     "tests": "_a = taxi_fare.__annotations__\nassert _a.get('km') is float, 'The hint for the parameter km must be float'\nassert _a.get('return') is int, 'The return hint: -> int'\nassert taxi_fare(4.5) == 1040 and isinstance(taxi_fare(4.5), int), 'taxi_fare(4.5) must return 1040 (int)'\nassert taxi_fare(0.0) == 500, 'taxi_fare(0.0) must return 500'"
    }
   },
   {
    "title": "Counting cities",
    "prompt": "<p>Write the function <code>count_cities(cities)</code> with hints. It takes <code>cities: list[str]</code> and returns <code>dict[str, int]</code> — how many times each city appeared. For example, <code>[\"Алматы\", \"Астана\", \"Алматы\"]</code> → <code>{\"Алматы\": 2, \"Астана\": 1}</code>.</p>",
    "hints": [
     "Hints: <code>cities: list[str]</code> and <code>-&gt; dict[str, int]</code>.",
     "<code>result[c] = result.get(c, 0) + 1</code>."
    ],
    "check": {
     "tests": "_a = count_cities.__annotations__\nassert _a.get('cities') == list[str], 'The hint for cities: list[str]'\nassert _a.get('return') == dict[str, int], 'The return hint: dict[str, int]'\nassert count_cities(['Алматы', 'Астана', 'Алматы']) == {'Алматы': 2, 'Астана': 1}, 'The number of cities is wrong'\nassert count_cities([]) == {}, 'For an empty list, return an empty dictionary'"
    }
   },
   {
    "title": "A function that returns nothing",
    "prompt": "<p>Write the function <code>add_reading(log, temp)</code>: it adds a temperature to the list <code>log</code> and returns nothing. Hints: <code>log: list[float]</code>, <code>temp: float</code>, the return value <code>None</code> (<code>-&gt; None</code>).</p>",
    "hints": [
     "<code>log.append(temp)</code> changes the list itself.",
     "The return hint: <code>-&gt; None</code>."
    ],
    "check": {
     "tests": "_a = add_reading.__annotations__\nassert _a.get('log') == list[float] and _a.get('temp') is float, 'Hints: log: list[float], temp: float'\nassert 'return' in _a and _a['return'] is None, 'The return hint: -> None'\n_l = [1.0]\n_r = add_reading(_l, -3.5)\nassert _l == [1.0, -3.5], 'The temperature must be added to the list log'\nassert _r is None, 'The function must not return anything'"
    }
   },
   {
    "title": "The first frost day",
    "prompt": "<p>Write the function <code>first_frost(temps)</code> with hints: it takes <code>temps: list[float]</code> and returns <code>float | None</code>. It must return the first negative temperature in the list, and if there are no negative values, <code>None</code>. For example, <code>[5.0, 1.5, -2.0, -7.0]</code> → <code>-2.0</code>.</p>",
    "hints": [
     "Inside the loop: <code>if t &lt; 0: return t</code>.",
     "When the loop ends, <code>return None</code>. Hint: <code>-&gt; float | None</code>."
    ],
    "check": {
     "tests": "import typing as _t\n_a = first_frost.__annotations__\nassert _a.get('temps') == list[float], 'The hint for temps: list[float]'\nassert set(_t.get_args(_a.get('return'))) == {float, type(None)}, 'The return hint: float | None'\nassert first_frost([5.0, 1.5, -2.0, -7.0]) == -2.0, 'first_frost([5.0, 1.5, -2.0, -7.0]) must return -2.0'\nassert first_frost([3.0, 0.0]) is None, 'If there is no negative temperature, None (0 is not negative)'\nassert first_frost([]) is None, 'For an empty list, None'"
    }
   },
   {
    "title": "Reading annotations",
    "prompt": "<p>Write the function <code>hinted_params(func)</code>: it should return a list of the names of the <b>parameters</b> from <code>func.__annotations__</code> that have a hint (do not count the key <code>'return'</code>). For example, for <code>def f(city: str, days: int) -&gt; float</code> the result is <code>[\"city\", \"days\"]</code>.</p>",
    "hints": [
     "<code>func.__annotations__</code> is a dictionary whose keys are the parameter names.",
     "<code>[n for n in func.__annotations__ if n != 'return']</code>."
    ],
    "check": {
     "tests": "def _f(city: str, days: int) -> float:\n    return 0.0\ndef _g(x, y: int):\n    return x\ndef _h():\n    pass\nassert hinted_params(_f) == ['city', 'days'], 'For f(city: str, days: int) -> float the result is [\"city\", \"days\"]'\nassert hinted_params(_g) == ['y'], 'A parameter without a hint is not added to the list'\nassert hinted_params(_h) == [], 'If there are no hints, return an empty list'"
    }
   },
   {
    "title": "Students' average grades",
    "prompt": "<p>Write the function <code>average_scores(scores)</code> with hints: it takes <code>scores: dict[str, list[int]]</code> (student → grades) and returns <code>dict[str, float]</code> — the average grade of each student, rounded to 2 decimal places. For a student with no grades, use <code>0.0</code>.</p>",
    "hints": [
     "Hints: <code>scores: dict[str, list[int]]</code>, <code>-&gt; dict[str, float]</code>.",
     "Check an empty list separately: <code>... if s else 0.0</code>."
    ],
    "check": {
     "tests": "_a = average_scores.__annotations__\nassert _a.get('scores') == dict[str, list[int]], 'The hint for scores: dict[str, list[int]]'\nassert _a.get('return') == dict[str, float], 'The return hint: dict[str, float]'\nassert average_scores({'Айгерім': [5, 4, 5], 'Ерлан': [3, 4]}) == {'Айгерім': 4.67, 'Ерлан': 3.5}, 'The average grades are wrong (round to 2 decimal places)'\nassert average_scores({'Дана': []}) == {'Дана': 0.0}, 'A student with no grades gets 0.0'"
    }
   },
   {
    "title": "Checking argument types",
    "prompt": "<p>Python does not check hints by itself. Write the function <code>check_args(func, kwargs)</code>: for each parameter (except <code>return</code>) it takes the value from <code>func.__annotations__</code> and checks it with <code>kwargs</code> <code>isinstance</code>. It must return a list of errors in the format <code>\"&lt;параметр&gt;: &lt;тип атауы&gt; күтілді\"</code>, for example <code>\"days: int күтілді\"</code>. If a parameter <code>kwargs</code> is missing, add the error <code>\"&lt;параметр&gt;: жоқ\"</code>. Assume that the hints are only simple types (<code>int</code>, <code>float</code>, <code>str</code>).</p>",
    "hints": [
     "<code>for name, tp in func.__annotations__.items():</code>, skip the key <code>return</code>.",
     "The name of the type: <code>tp.__name__</code>."
    ],
    "check": {
     "tests": "assert check_args(forecast, {'city': 'Алматы', 'days': 3, 'temp': 21.5}) == [], 'For correct arguments the list is empty'\nassert check_args(forecast, {'city': 'Алматы', 'days': '3', 'temp': 21.5}) == ['days: int күтілді'], 'The text \"3\" is not an int: [\"days: int күтілді\"]'\nassert check_args(forecast, {'city': 42, 'temp': 'жылы'}) == ['city: str күтілді', 'days: жоқ', 'temp: float күтілді'], 'Errors must come in parameter order, and the missing parameter gives \"days: жоқ\"'\ndef _g(name: str) -> None:\n    pass\nassert check_args(_g, {'name': 'Ерлан'}) == [], 'The return hint is not checked'"
    }
   },
   {
    "title": "The best month",
    "prompt": "<p>Write the function <code>best_month(sales)</code> with hints: it takes <code>sales: dict[str, list[int]]</code> (month → daily sales) and returns <code>tuple[str, int] | None</code> — the month with the highest total sales and the total for it. If <code>sales</code> is empty, return <code>None</code>. For example, <code>{\"наурыз\": [100, 200], \"сәуір\": [500]}</code> → <code>(\"сәуір\", 500)</code>.</p>",
    "hints": [
     "First count the total for each month: <code>{m: sum(d) for m, d in sales.items()}</code>, then take <code>max(totals, key=totals.get)</code>.",
     "Return value: <code>-&gt; tuple[str, int] | None</code>."
    ],
    "check": {
     "tests": "import typing as _t\n_a = best_month.__annotations__\nassert _a.get('sales') == dict[str, list[int]], 'The hint for sales: dict[str, list[int]]'\nassert set(_t.get_args(_a.get('return'))) == {tuple[str, int], type(None)}, 'The return hint: tuple[str, int] | None'\nassert best_month({'наурыз': [100, 200], 'сәуір': [500]}) == ('сәуір', 500), 'The highest sales are сәуір, 500'\nassert best_month({'мамыр': [10, 20, 30], 'маусым': [], 'шілде': [59]}) == ('мамыр', 60), 'An empty list gives a total of 0, the best month is мамыр (60)'\nassert best_month({}) is None, 'For an empty dictionary, None'"
    }
   }
  ]
 },
 "swe-3": {
  "pr": [
   {
    "title": "A wallet class",
    "prompt": "<p>Write the class <code>Wallet</code>. <code>__init__(owner, balance=0)</code> stores the owner and the balance. <code>deposit(amount)</code> adds an amount to the balance and returns the new balance. <code>withdraw(amount)</code> subtracts the amount if there is enough balance and returns <code>True</code>; if there is not enough, it changes nothing and returns <code>False</code>.</p>",
    "hints": [
     "Inside <code>__init__</code> write <code>self.owner = owner</code> and <code>self.balance = balance</code>.",
     "The check in <code>withdraw</code>: <code>if amount &gt; self.balance: return False</code>."
    ],
    "check": {
     "tests": "_w = Wallet('Ерлан')\nassert _w.owner == 'Ерлан' and _w.balance == 0, 'The default balance is 0, owner must be stored'\nassert _w.deposit(3000) == 3000, 'deposit returns the new balance'\nassert _w.withdraw(5000) is False and _w.balance == 3000, 'If there is not enough balance, False, the balance does not change'\nassert _w.withdraw(1000) is True and _w.balance == 2000, 'If there is enough balance, True, and the balance goes down'\n_w2 = Wallet('Дана', 100)\nassert _w2.balance == 100 and _w.balance == 2000, 'Each object must have its own balance'"
    }
   },
   {
    "title": "Filling with the mean",
    "prompt": "<p>Write the class <code>MeanImputer</code>: the method <code>fit(values)</code> computes the mean of the values that are not <code>None</code>, stores it in <code>self.mean_</code> and returns <code>self</code>; the method <code>transform(values)</code> returns a new list where every <code>None</code> is replaced with <code>mean_</code>.</p>",
    "hints": [
     "In <code>fit</code>: <code>known = [v for v in values if v is not None]</code>, then the mean.",
     "In <code>transform</code>: <code>[self.mean_ if v is None else v for v in values]</code>."
    ],
    "check": {
     "tests": "_m = MeanImputer()\nassert _m.fit([10, None, 30]) is _m, 'fit() must return self'\nassert _m.mean_ == 20, 'mean_ = (10 + 30) / 2 = 20 (None is not counted)'\nassert _m.transform([None, 5, None]) == [20, 5, 20], 'transform replaces None with mean_'\nassert _m.transform([1, 2]) == [1, 2], 'If there is no None, the list does not change'"
    }
   },
   {
    "title": "Shopping cart",
    "prompt": "<p>Write the class <code>Cart</code>: <code>__init__</code> creates an empty list <code>self.items</code>; <code>add(name, price, qty=1)</code> adds an item in the form <code>(name, price, qty)</code>; <code>total()</code> returns the sum of all <code>price * qty</code>.</p>",
    "hints": [
     "Inside <code>__init__</code> write <code>self.items = []</code>: each cart will have its own list.",
     "<code>sum(price * qty for _, price, qty in self.items)</code>."
    ],
    "check": {
     "tests": "_c = Cart()\nassert _c.items == [] and _c.total() == 0, 'A new cart is empty, total() is 0'\n_c.add('Нан', 250, 2)\n_c.add('Сүт', 1290)\nassert _c.items == [('Нан', 250, 2), ('Сүт', 1290, 1)], 'add adds (name, price, qty), qty defaults to 1'\nassert _c.total() == 1790, 'total() = 250*2 + 1290 = 1790'\nassert Cart().items == [], 'Each cart must have its own items list'"
    }
   },
   {
    "title": "Standardization",
    "prompt": "<p>Write the class <code>ZScaler</code>: <code>fit(values)</code> stores the mean in <code>self.mean_</code>, the standard deviation (over the whole set, dividing by <code>n</code>) in <code>self.std_</code> and returns <code>self</code>; <code>transform(values)</code> turns each value into <code>(v - mean_) / std_</code>. If <code>std_</code> is 0, all results are <code>0.0</code>.</p>",
    "hints": [
     "<code>std_ = (sum((v - mean_) ** 2 for v in values) / n) ** 0.5</code>.",
     "<code>transform</code> uses <code>mean_</code> and <code>std_</code> learned on train."
    ],
    "check": {
     "tests": "_s = ZScaler()\nassert _s.fit([2, 4, 4, 4, 5, 5, 7, 9]) is _s, 'fit() must return self'\nassert _s.mean_ == 5 and abs(_s.std_ - 2.0) < 1e-9, 'mean_ must be 5, std_ must be 2 ([2, 4, 4, 4, 5, 5, 7, 9])'\nassert _s.transform([5, 9, 1]) == [0.0, 2.0, -2.0], 'transform([5, 9, 1]) → [0.0, 2.0, -2.0]'\nassert ZScaler().fit([3, 3, 3]).transform([3, 10]) == [0.0, 0.0], 'If std_ = 0, the result is 0.0 (no division by zero)'"
    }
   },
   {
    "title": "Encoding categories",
    "prompt": "<p>Write the class <code>LabelEncoder</code>: <code>fit(values)</code> sorts the unique values, stores them in <code>self.classes_</code> and returns <code>self</code>; <code>transform(values)</code> replaces each value with its index in <code>classes_</code>, and for a value that was not in train it gives <code>-1</code>.</p>",
    "hints": [
     "<code>sorted(set(values))</code> gives the unique sorted values.",
     "The index dictionary: <code>{c: i for i, c in enumerate(self.classes_)}</code>, then <code>.get(v, -1)</code>."
    ],
    "check": {
     "tests": "_e = LabelEncoder()\nassert _e.fit(['Астана', 'Алматы', 'Астана', 'Шымкент']) is _e, 'fit() must return self'\nassert _e.classes_ == ['Алматы', 'Астана', 'Шымкент'], 'classes_ holds the unique sorted values'\nassert _e.transform(['Шымкент', 'Алматы', 'Астана']) == [2, 0, 1], 'transform turns the values into indexes'\nassert _e.transform(['Орал']) == [-1], 'A value that was not in train → -1 (there must be no error)'"
    }
   },
   {
    "title": "The fit_transform method",
    "prompt": "<p>Add the method <code>fit_transform(values)</code> to the class <code>RangeScaler</code>: it should call the existing methods <code>fit</code> and <code>transform</code> without writing them again (<code>self.fit(values).transform(values)</code>). Also clip the result of <code>transform</code> to the range from 0 to 1: a value below the train minimum → 0.0, above the maximum → 1.0.</p>",
    "hints": [
     "<code>def fit_transform(self, values): return self.fit(values).transform(values)</code>.",
     "Clipping: <code>min(1.0, max(0.0, x))</code>."
    ],
    "check": {
     "tests": "_s = RangeScaler()\nassert _s.fit_transform([100, 300, 500]) == [0.0, 0.5, 1.0], 'fit_transform([100, 300, 500]) → [0.0, 0.5, 1.0]'\nassert _s.min_ == 100 and _s.max_ == 500, 'fit_transform must call fit and store min_ and max_'\nassert _s.transform([0, 700, 200]) == [0.0, 1.0, 0.25], 'Values outside the range must be clipped to 0.0 and 1.0'"
    }
   },
   {
    "title": "A small Pipeline",
    "prompt": "<p><code>MeanImputer</code> and <code>RangeScaler</code> are already done. Write the class <code>MiniPipeline(steps)</code>: <code>fit(values)</code> calls <code>fit</code> on each step in turn, passes the result of its own <code>transform</code> to the next step and returns <code>self</code>; <code>transform(values)</code> applies <code>transform</code> of all steps in turn.</p>",
    "hints": [
     "In <code>fit</code>: <code>values = step.fit(values).transform(values)</code> — the next step gets the already processed data.",
     "In <code>transform</code> only <code>values = step.transform(values)</code>."
    ],
    "check": {
     "tests": "_p = MiniPipeline([MeanImputer(), RangeScaler()])\nassert _p.fit([10, None, 30]) is _p, 'fit() must return self'\nassert _p.steps[0].mean_ == 20, 'The first step (MeanImputer) must be fitted: mean_ = 20'\nassert _p.steps[1].min_ == 10 and _p.steps[1].max_ == 30, 'RangeScaler must be fitted on the filled data (no None)'\nassert _p.transform([None, 30, 40]) == [0.5, 1.0, 1.5], 'transform([None, 30, 40]) → [0.5, 1.0, 1.5]'\nassert MiniPipeline([]).fit([1]).transform([5]) == [5], 'If there are no steps, the data does not change'"
    }
   },
   {
    "title": "A wrapper for the flat price",
    "prompt": "<p>The data about flats in Almaty is given. Write the wrapper <code>PriceModel</code>: <code>__init__(features, version='1.0.0')</code> stores the features and the version and creates <code>LinearRegression()</code>; <code>fit(df, target)</code> trains the model only on the columns <code>self.features</code> and returns <code>self</code>; <code>predict_one(flat)</code> returns the price of one flat (mln ₸), rounded to 1 decimal place, as <code>float</code> (the dictionary may contain extra keys). Finally run <code>pm = PriceModel(FEATURES).fit(flats, 'price_mln')</code>.</p>",
    "hints": [
     "<code>predict_one</code>: <code>pd.DataFrame([flat])[self.features]</code> removes the extra keys and keeps the order.",
     "<code>round(float(self.model.predict(row)[0]), 1)</code>."
    ],
    "check": {
     "tests": "assert isinstance(pm, PriceModel), 'pm = PriceModel(FEATURES).fit(...) must work: fit() returns self'\nassert pm.features == FEATURES and pm.version == '1.0.0', '__init__ must store features and version (version defaults to 1.0.0)'\nassert hasattr(pm.model, 'coef_') and pm.model.n_features_in_ == 2, 'The model must be trained only on the features columns'\n_p = pm.predict_one({'rooms': 2, 'area': 55, 'district': 'Бостандық'})\nassert isinstance(_p, float), 'predict_one must return a float'\nassert abs(_p - 38.5) < 0.05, f'A 55 m² flat must cost ≈ 38.5 mln ₸, you have {_p}'\nassert pm.predict_one({'area': 100, 'rooms': 3}) > pm.predict_one({'area': 50, 'rooms': 3}), 'A bigger flat must cost more'\nassert PriceModel(FEATURES, version='2.0.0').version == '2.0.0', 'The version parameter must be kept'"
    }
   }
  ]
 },
 "swe-4": {
  "pr": [
   {
    "title": "A sum test",
    "prompt": "<p>The function <code>total(prices)</code> is ready. Write the test function <code>test_total()</code> that checks three cases: <code>[100, 200]</code> → 300, <code>[]</code> → 0, <code>[5]</code> → 5. The test must pass for a correct function and give <code>AssertionError</code> for wrong versions.</p>",
    "hints": [
     "One case per line: <code>assert total([100, 200]) == 300</code>.",
     "An empty list and a list with one element are edge cases, do not forget them."
    ],
    "check": {
     "tests": "test_total()\n\ndef _catches(_bad):\n    global total\n    _ok_fn = total\n    total = _bad\n    try:\n        test_total()\n        return False\n    except Exception:\n        return True\n    finally:\n        total = _ok_fn\n\nassert _catches(lambda xs: xs[0] + xs[-1] if xs else 0), 'Your test does not check the case [5]: a wrong version that adds the first and the last element passes'\nassert _catches(lambda xs: sum(xs) if xs else None), 'Your test does not check the empty list []'\nassert _catches(lambda xs: max(xs) * 2 if len(xs) > 1 else sum(xs)), 'Your test does not check the case [100, 200] → 300'"
    }
   },
   {
    "title": "An assert with a message",
    "prompt": "<p>Write the function <code>check_temperature(t)</code>: using <code>assert</code> it checks that the temperature is in the range from −60 to 60 (the boundaries are also allowed). If the condition is not met, the message of <code>AssertionError</code> must contain the word <code>\"температура\"</code>. If everything is correct, the function returns <code>t</code>.</p>",
    "hints": [
     "<code>assert шарт, 'хабар'</code> — if the condition is false, an AssertionError with a message is raised.",
     "<code>assert -60 &lt;= t &lt;= 60, f'температура аралықтан тыс: {t}'</code>."
    ],
    "check": {
     "tests": "assert check_temperature(-25) == -25 and check_temperature(60) == 60 and check_temperature(-60) == -60, 'A value in the range (including the boundaries) must be returned'\nfor _v in [75, -61]:\n    try:\n        check_temperature(_v)\n    except AssertionError as _e:\n        assert 'температура' in str(_e), 'The AssertionError message must contain the word «температура»'\n    else:\n        raise AssertionError(f'check_temperature({_v}) AssertionError беруі керек')"
    }
   },
   {
    "title": "Fixing the code by the test",
    "prompt": "<p>A colleague wrote the test <code>test_average()</code>, but the function <code>average</code> fails on an empty list. Without changing the test, fix the function: for an empty list it must return <code>0</code>, otherwise the mean.</p>",
    "hints": [
     "Check the empty list first: <code>if not xs: return 0</code>.",
     "The test is the requirement itself: we do not change it, we fix the code."
    ],
    "check": {
     "tests": "test_average()\nassert average([1, 2, 3, 4]) == 2.5, 'average([1, 2, 3, 4]) must return 2.5'\nassert average([]) == 0, 'For an empty list, 0'"
    }
   },
   {
    "title": "A table-driven test",
    "prompt": "<p>The function <code>is_valid_phone(s)</code> is ready: the number is correct if it starts with <code>\"+7\"</code> and then has exactly 10 digits. Fill the list <code>CASES</code> with <code>(кіріс, күтілетін нәтиже)</code> pairs (at least 4 cases: a correct number, a number without <code>+7</code>, a number with too few digits, a number with a non-digit character), and check them in a loop inside <code>test_is_valid_phone()</code> (the idea of <code>parametrize</code> from pytest).</p>",
    "hints": [
     "Pairs: <code>('+77011234567', True)</code>, <code>('87011234567', False)</code>, ...",
     "In the loop: <code>assert is_valid_phone(s) == expected, s</code>."
    ],
    "check": {
     "tests": "test_is_valid_phone()\nassert len(CASES) >= 4, 'CASES must have at least 4 cases'\n\ndef _catches(_bad):\n    global is_valid_phone\n    _ok_fn = is_valid_phone\n    is_valid_phone = _bad\n    try:\n        test_is_valid_phone()\n        return False\n    except Exception:\n        return True\n    finally:\n        is_valid_phone = _ok_fn\n\nassert _catches(lambda s: False), 'Your test has no correct number (the case that expects True)'\nassert _catches(lambda s: (s.startswith('+7') and len(s) == 12 and s[2:].isdigit()) or (len(s) == 11 and s.isdigit())), 'Your test does not check a number without +7'\nassert _catches(lambda s: s.startswith('+7') and s[2:].isdigit()), 'Your test does not check a number with too few digits'\nassert _catches(lambda s: s.startswith('+7') and len(s) == 12), 'Your test does not check a number with a non-digit character'"
    }
   },
   {
    "title": "A test that expects an error",
    "prompt": "<p>The function <code>parse_age(text)</code> is ready: it turns the text into <code>int</code>, and if the age is negative or greater than 120, it raises <code>ValueError</code>. Write <code>test_parse_age()</code>: (1) <code>\"25\"</code> → 25; (2) for <code>\"-3\"</code>, <code>ValueError</code> must be raised; (3) for <code>\"абв\"</code>, <code>ValueError</code> must be raised. There is no pytest, so use <code>try/except/else</code>.</p>",
    "hints": [
     "Pattern: <code>try: parse_age('-3')</code> / <code>except ValueError: pass</code> / <code>else: raise AssertionError(...)</code>.",
     "You can put two wrong inputs into a list and check them in a loop."
    ],
    "check": {
     "tests": "test_parse_age()\n\ndef _catches(_bad):\n    global parse_age\n    _ok_fn = parse_age\n    parse_age = _bad\n    try:\n        test_parse_age()\n        return False\n    except Exception:\n        return True\n    finally:\n        parse_age = _ok_fn\n\ndef _no_range(t):\n    return int(t)\ndef _no_text(t):\n    try:\n        a = int(t)\n    except ValueError:\n        return 0\n    if a < 0:\n        raise ValueError('теріс')\n    return a\nassert _catches(_no_range), 'Your test does not check ValueError for \"-3\"'\nassert _catches(_no_text), 'Your test does not check ValueError for \"абв\"'\nassert _catches(lambda t: abs(int(t)) + 1 if int(t) >= 0 else int('x')), 'Your test does not check the case \"25\" → 25'"
    }
   },
   {
    "title": "A fixture function",
    "prompt": "<p>Let's write the pytest fixture by hand. Write the function <code>sample_orders()</code>: each time it is called it returns a <b>new</b> list: <code>[{'city': 'Алматы', 'amount': 100}, {'city': 'Астана', 'amount': 40}, {'city': 'Алматы', 'amount': 60}]</code>. Then write <code>test_count_city(orders)</code> that checks that both conditions are true: <code>count_city(orders, 'Алматы') == 2</code> and <code>count_city(orders, 'Орал') == 0</code>.</p>",
    "hints": [
     "Create the list inside the function: then each call gets a new object.",
     "The test function takes the data as a parameter: <code>def test_count_city(orders):</code>."
    ],
    "check": {
     "tests": "_a = sample_orders()\nassert isinstance(_a, list) and len(_a) == 3, 'sample_orders() must return a list of 3 orders'\n_a.append({'city': 'Орал', 'amount': 1})\nassert len(sample_orders()) == 3, 'Each call must return a new list (changes in one test must not affect another)'\ntest_count_city(sample_orders())\ndef _catches(_bad):\n    global count_city\n    _ok_fn = count_city\n    count_city = _bad\n    try:\n        test_count_city(sample_orders())\n        return False\n    except Exception:\n        return True\n    finally:\n        count_city = _ok_fn\nassert _catches(lambda orders, city: 0), 'Your test does not check count_city(orders, \"Алматы\") == 2'\nassert _catches(lambda orders, city: 2), 'Your test does not check count_city(orders, \"Орал\") == 0'"
    }
   },
   {
    "title": "Catching mutants",
    "prompt": "<p>The function <code>to_gross(net, rate=0.12)</code> is ready: it adds VAT, rounds to 2 decimal places, and if <code>net</code> is negative, it raises <code>ValueError</code>. Write <code>test_to_gross()</code> that catches all these wrong versions: the wrong default rate; the parameter <code>rate</code> is ignored; there is no rounding; a negative amount is not checked. Hints: <code>to_gross(1000)</code>, <code>to_gross(1000, 0.2)</code>, <code>to_gross(10.01)</code>, <code>to_gross(-5)</code>.</p>",
    "hints": [
     "One assert per mutant: the default rate, another rate, rounding (<code>10.01 * 1.12 = 11.2112</code>), a negative amount.",
     "Check the error with <code>try/except ValueError/else: raise AssertionError</code>."
    ],
    "check": {
     "tests": "test_to_gross()\n\ndef _catches(_bad):\n    global to_gross\n    _ok_fn = to_gross\n    to_gross = _bad\n    try:\n        test_to_gross()\n        return False\n    except Exception:\n        return True\n    finally:\n        to_gross = _ok_fn\n\ndef _chk(n):\n    if n < 0:\n        raise ValueError('bad')\ndef _m1(net, rate=0.1):\n    _chk(net)\n    return round(net * (1 + rate), 2)\ndef _m2(net, rate=0.12):\n    _chk(net)\n    return round(net * 1.12, 2)\ndef _m3(net, rate=0.12):\n    _chk(net)\n    return net * (1 + rate)\ndef _m4(net, rate=0.12):\n    return round(net * (1 + rate), 2)\nassert _catches(_m1), 'Your test does not check the default rate (0.12)'\nassert _catches(_m2), 'Your test does not check the parameter rate (for example, to_gross(1000, 0.2) == 1200)'\nassert _catches(_m3), 'Your test does not check rounding (for example, to_gross(10.01) == 11.21)'\nassert _catches(_m4), 'Your test does not check ValueError for a negative amount'"
    }
   },
   {
    "title": "A small test runner",
    "prompt": "<p>Write a pytest-like <code>run_tests(tests)</code>: <code>tests</code> is a list of test functions. Call each of them and return the result as a dictionary <code>{'passed': өткендер саны, 'failed': құлаған тесттердің атаулары (<code>func.__name__</code>), 'errors': AssertionError емес қате берген тесттердің атаулары}</code>. The lists must follow the order of the tests.</p>",
    "hints": [
     "Call each test inside <code>try: t()</code>; first <code>except AssertionError</code>, then <code>except Exception</code>.",
     "The <code>else</code> block — the test passed: <code>passed += 1</code>."
    ],
    "check": {
     "tests": "def test_a():\n    assert True\ndef test_b():\n    assert 2 * 2 == 5, 'math'\ndef test_c():\n    return int('абв')\ndef test_d():\n    pass\n_r = run_tests([test_a, test_b, test_c, test_d])\nassert _r == {'passed': 2, 'failed': ['test_b'], 'errors': ['test_c']}, f'The result is wrong: {_r}'\nassert run_tests([]) == {'passed': 0, 'failed': [], 'errors': []}, 'If there are no tests, passed=0, the lists are empty'"
    }
   }
  ]
 },
 "swe-5": {
  "pr": [
   {
    "title": "Protection from division by zero",
    "prompt": "<p>Write the function <code>safe_divide(a, b)</code>: it returns <code>a / b</code>, but if <code>ZeroDivisionError</code> is raised (when <code>b == 0</code>), it returns <code>None</code>. Use <code>try/except</code>. For example, <code>safe_divide(10, 4)</code> → <code>2.5</code>, <code>safe_divide(5, 0)</code> → <code>None</code>.</p>",
    "hints": [
     "<code>try: return a / b</code>, <code>except ZeroDivisionError: return None</code>.",
     "Do not write a bare <code>except:</code>: catch only the specific error."
    ],
    "check": {
     "tests": "assert safe_divide(10, 4) == 2.5, 'safe_divide(10, 4) must return 2.5'\nassert safe_divide(5, 0) is None, 'safe_divide(5, 0) must return None'\ntry:\n    safe_divide('10', 2)\nexcept TypeError:\n    pass\nelse:\n    raise AssertionError('Тек ZeroDivisionError ұсталсын: мәтінді бөлу TypeError беруі керек')"
    }
   },
   {
    "title": "Your own error class",
    "prompt": "<p>Write the error class <code>DataQualityError</code> (it inherits from <code>Exception</code>). Then write the function <code>check_bad_share(bad, total)</code>: if the share of bad rows is more than 5% (<code>bad / total &gt; 0.05</code>), it raises <code>DataQualityError</code>, otherwise it returns the share.</p>",
    "hints": [
     "<code>class DataQualityError(Exception): pass</code>.",
     "<code>if share &gt; 0.05: raise DataQualityError(...)</code>."
    ],
    "check": {
     "tests": "assert issubclass(DataQualityError, Exception), 'DataQualityError must inherit from Exception'\nassert check_bad_share(3, 100) == 0.03, 'check_bad_share(3, 100) must return 0.03'\nassert check_bad_share(5, 100) == 0.05, 'Exactly 5% is still allowed'\ntry:\n    check_bad_share(6, 100)\nexcept DataQualityError:\n    pass\nelse:\n    raise AssertionError('6% болса DataQualityError лақтырылуы керек')"
    }
   },
   {
    "title": "Checking the age",
    "prompt": "<p>Write the function <code>parse_age(text)</code>: it turns the text into <code>int</code> (if the text is not a number, <code>int</code> itself raises <code>ValueError</code>); if the age is outside the range from 0 to 120, it raises <code>ValueError</code>, and the message contains the word <code>\"жас\"</code>.</p>",
    "hints": [
     "<code>if not 0 &lt;= age &lt;= 120: raise ValueError('жас ...')</code>.",
     "It is useful to add the value itself to the message: <code>f'...: {age}'</code>."
    ],
    "check": {
     "tests": "assert parse_age('34') == 34 and parse_age('0') == 0 and parse_age('120') == 120, 'An age in the range must be returned as an int'\nfor _v in ['-1', '150']:\n    try:\n        parse_age(_v)\n    except ValueError as _e:\n        assert 'жас' in str(_e), 'The message must contain the word «жас»'\n    else:\n        raise AssertionError(f'parse_age({_v!r}) ValueError лақтыруы керек')\ntry:\n    parse_age('отыз')\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Сан емес мәтін ValueError беруі керек')"
    }
   },
   {
    "title": "The finally block",
    "prompt": "<p>Write the function <code>process(items, journal)</code>: at the start it adds the entry <code>'start'</code> to <code>journal</code>, then converts each element with <code>int()</code> and returns the sum. Whether an error happens or not, at the end the entry <code>'end'</code> must be added to <code>journal</code> (<code>finally</code>), and the error must propagate upward.</p>",
    "hints": [
     "<code>try: return sum(...)</code>, <code>finally: journal.append('end')</code>.",
     "Do not write <code>except</code>: the error must propagate upward, and only the \"cleanup\" always runs."
    ],
    "check": {
     "tests": "_j = []\nassert process(['1', '2', '3'], _j) == 6, 'process([\"1\", \"2\", \"3\"], j) must return 6'\nassert _j == ['start', 'end'], 'In the successful case journal = [\"start\", \"end\"]'\n_j = []\ntry:\n    process(['1', 'екі'], _j)\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Қате жоғары кетуі керек (ValueError), оны жасырмаңыз')\nassert _j == ['start', 'end'], 'Even when there is an error, \"end\" must be written (finally)'"
    }
   },
   {
    "title": "Logging by level",
    "prompt": "<p>Write the function <code>report(bad, total, logger)</code>: if there are no bad rows, it writes <code>logger.info(...)</code>; if their share is not more than 5%, it writes <code>logger.warning(...)</code>; if it is more than 5%, it writes <code>logger.error(...)</code>. Each call must write exactly one record. The record must contain the number of bad rows.</p>",
    "hints": [
     "Three branches: <code>if bad == 0</code> → info, <code>elif bad / total &lt;= 0.05</code> → warning, <code>else</code> → error.",
     "Pass the number as a parameter to the message: <code>logger.warning('%s қате жол', bad)</code>."
    ],
    "check": {
     "tests": "import logging as _lg\nclass _H(_lg.Handler):\n    def __init__(self):\n        super().__init__()\n        self.records = []\n    def emit(self, record):\n        self.records.append(record)\n\n_h = _H()\n_l = _lg.getLogger('practice.report.test')\n_l.setLevel(_lg.DEBUG)\n_l.addHandler(_h)\n_l.propagate = False\nreport(0, 200, _l)\nreport(4, 100, _l)\nreport(17, 100, _l)\n_l.removeHandler(_h)\nassert len(_h.records) == 3, f'Each call must write exactly one record: 3 expected, you have {len(_h.records)}'\nassert [r.levelno for r in _h.records] == [_lg.INFO, _lg.WARNING, _lg.ERROR], 'Levels: 0 errors → INFO, 4% → WARNING, 17% → ERROR'\nassert '17' in _h.records[2].getMessage() and '4' in _h.records[1].getMessage(), 'The record must contain the number of bad rows'"
    }
   },
   {
    "title": "Weather readings",
    "prompt": "<p>Temperatures from the weather station come as text, and some of them are broken (<code>\"—\"</code>, <code>\"\"</code>, <code>\"n/a\"</code>). Write <code>parse_temps(values)</code>: it turns each value into <code>float</code>, and where that is not possible, it stores <code>None</code>. It must return <code>(temps, bad_count)</code>. Use <code>try/except ValueError</code>.</p>",
    "hints": [
     "In the loop: <code>try: temps.append(float(v))</code>, <code>except ValueError: temps.append(None)</code>.",
     "Increase the counter in the <code>except</code> block."
    ],
    "check": {
     "tests": "assert parse_temps(['-12.5', '—', '3', '']) == ([-12.5, None, 3.0, None], 2), 'parse_temps([\"-12.5\", \"—\", \"3\", \"\"]) must return ([-12.5, None, 3.0, None], 2)'\nassert parse_temps(['n/a']) == ([None], 1), '\"n/a\" → None'\nassert parse_temps([]) == ([], 0), 'For an empty list ([], 0)'"
    }
   },
   {
    "title": "The 5% rule",
    "prompt": "<p>Write <code>load_amounts(rows, max_bad_share=0.05)</code>. <code>rows</code> is the text with amounts. Convert each value to <code>float</code>; if that fails or the value is negative, skip it and write <code>logger.warning(...)</code>. After all rows are processed, if the share of errors is greater than <code>max_bad_share</code>, write <code>logger.error(...)</code> and raise <code>DataQualityError</code>. Otherwise return the list of correct amounts. Logger: <code>logging.getLogger('practice.load')</code>.</p>",
    "hints": [
     "If you also raise a negative amount as <code>ValueError</code>, one <code>except</code> catches both cases.",
     "Check the share after the loop ends: <code>bad / len(rows) &gt; max_bad_share</code>."
    ],
    "check": {
     "tests": "import logging as _lg\nclass _H(_lg.Handler):\n    def __init__(self):\n        super().__init__()\n        self.records = []\n    def emit(self, record):\n        self.records.append(record)\n\n_h = _H()\n_lg.getLogger('practice.load').addHandler(_h)\ntry:\n    _g = load_amounts(['100'] * 19 + ['—'])\n    assert _g == [100.0] * 19, 'The 19 correct amounts must be returned as floats'\n    assert len([r for r in _h.records if r.levelno == _lg.WARNING]) == 1, 'One logger.warning for each bad row'\n    _h.records.clear()\n    try:\n        load_amounts(['100', '-5', 'abc', '200'])\n    except DataQualityError:\n        pass\n    else:\n        raise AssertionError('Қате үлесі 50% > 5%: DataQualityError лақтырылуы керек')\n    assert len([r for r in _h.records if r.levelno == _lg.WARNING]) == 2, 'Both a negative amount and a text give a warning'\n    assert any(r.levelno == _lg.ERROR for r in _h.records), 'logger.error must be written before stopping'\n    assert load_amounts(['1', 'x', '2', '3'], max_bad_share=0.3) == [1.0, 2.0, 3.0], 'The max_bad_share parameter must be taken into account (25% < 30%)'\nfinally:\n    _lg.getLogger('practice.load').removeHandler(_h)"
    }
   },
   {
    "title": "Retrying",
    "prompt": "<p>The network sometimes drops. Write <code>retry(func, attempts=3, logger=None)</code>: it calls <code>func()</code>; if <code>ConnectionError</code> happens, it writes <code>logger.warning(...)</code> (if a logger is passed) and tries again. On success it returns the result. If all <code>attempts</code> attempts fail, it raises the last error again (<code>raise</code>). Do not catch other errors.</p>",
    "hints": [
     "Inside <code>for i in range(1, attempts + 1):</code> call <code>try: return func()</code>.",
     "On the last attempt, in the <code>except</code> block, just <code>raise</code>: it re-raises the same error."
    ],
    "check": {
     "tests": "import logging as _lg\nclass _H(_lg.Handler):\n    def __init__(self):\n        super().__init__()\n        self.records = []\n    def emit(self, record):\n        self.records.append(record)\n\n_h = _H()\n_l = _lg.getLogger('practice.retry.test')\n_l.addHandler(_h)\n_l.propagate = False\n_n = []\ndef _flaky():\n    _n.append(1)\n    if len(_n) < 3:\n        raise ConnectionError('үзілді')\n    return 42\nassert retry(_flaky, logger=_l) == 42 and len(_n) == 3, 'Success on the third attempt: 42 must be returned'\nassert len(_h.records) == 2 and all(r.levelno == _lg.WARNING for r in _h.records), 'A logger.warning for each failed attempt'\n_m = []\ndef _down():\n    _m.append(1)\n    raise ConnectionError('сервер жоқ')\ntry:\n    retry(_down, attempts=4)\nexcept ConnectionError:\n    pass\nelse:\n    raise AssertionError('Барлық әрекет сәтсіз болса, ConnectionError қайта лақтырылуы керек')\nassert len(_m) == 4, f'With attempts=4 there must be 4 calls, you have {len(_m)}'\n_k = []\ndef _bug():\n    _k.append(1)\n    raise KeyError('x')\ntry:\n    retry(_bug)\nexcept KeyError:\n    pass\nassert len(_k) == 1, 'Do not retry on other errors: only ConnectionError'\n_l.removeHandler(_h)"
    }
   }
  ]
 },
 "swe-6": {
  "pr": [
   {
    "title": "Is the version pinned",
    "prompt": "<p>Write the function <code>is_pinned(line)</code>: if the version in a requirements.txt line is pinned with <code>==</code>, it returns <code>True</code>, otherwise <code>False</code>. Ignore the comment at the end of the line <code>#</code>. For example, <code>\"pandas==2.2.3\"</code> → <code>True</code>, <code>\"numpy&gt;=1.26\"</code> → <code>False</code>, <code>\"joblib  # ==1.4 керек\"</code> → <code>False</code>.</p>",
    "hints": [
     "First cut off the comment: <code>line.split('#')[0]</code>.",
     "Then check <code>'==' in ...</code>."
    ],
    "check": {
     "tests": "assert is_pinned('pandas==2.2.3') is True, '\"pandas==2.2.3\" is pinned'\nassert is_pinned('numpy>=1.26') is False, '\">=\" is not a pin'\nassert is_pinned('joblib  # ==1.4 керек') is False, '\"==\" in a comment is not counted'\nassert is_pinned('fastapi==0.115.0  # API') is True, 'A pinned line with a comment at the end'"
    }
   },
   {
    "title": "The package name",
    "prompt": "<p>Write the function <code>package_name(line)</code>: from a requirements.txt line it returns only the package name: <code>\"scikit-learn==1.6.1\"</code> → <code>\"scikit-learn\"</code>, <code>\"numpy&gt;=1.26\"</code> → <code>\"numpy\"</code>, <code>\" joblib \"</code> → <code>\"joblib\"</code>.</p>",
    "hints": [
     "Split twice: <code>line.split('==')[0].split('&gt;=')[0]</code>.",
     "At the end call <code>.strip()</code>."
    ],
    "check": {
     "tests": "assert package_name('scikit-learn==1.6.1') == 'scikit-learn', '\"scikit-learn==1.6.1\" → \"scikit-learn\"'\nassert package_name('numpy>=1.26') == 'numpy', '\"numpy>=1.26\" → \"numpy\"'\nassert package_name(' joblib ') == 'joblib', 'Remove the spaces at the edges'"
    }
   },
   {
    "title": ".gitignore check",
    "prompt": "<p>Write the function <code>venv_ignored(gitignore)</code>: if the text <code>.gitignore</code> has a line <code>.venv</code> or <code>.venv/</code>, it returns <code>True</code> (spaces at the start and end of a line are ignored). A line that starts with <code>#</code> is a comment and is not counted.</p>",
    "hints": [
     "Check each line separately: <code>for line in gitignore.splitlines():</code>.",
     "<code>line.strip() in ('.venv', '.venv/')</code>."
    ],
    "check": {
     "tests": "assert venv_ignored('__pycache__/\\n.venv/\\n.env\\n') is True, 'The line \".venv/\" is present: True'\nassert venv_ignored('  .venv  \\n') is True, 'Spaces at the edges are ignored'\nassert venv_ignored('# .venv\\n.env\\n') is False, '.venv in a comment is not counted'\nassert venv_ignored('.venv_old/\\n') is False, '.venv_old is a different folder'"
    }
   },
   {
    "title": "Making requirements.txt",
    "prompt": "<p>Write the function <code>to_requirements(packages)</code>: it makes the text of requirements.txt from the dictionary <code>{пакет: нұсқа}</code>. Each line has the form <code>пакет==нұсқа</code>, the packages are sorted by name, and each line ends with <code>\\n</code>. If the version is <code>None</code>, only the package name is written.</p>",
    "hints": [
     "<code>for name in sorted(packages):</code> — sort by name.",
     "Add <code>'\\n'</code> to each line: <code>''.join(line + '\\n' for line in lines)</code>."
    ],
    "check": {
     "tests": "assert to_requirements({'pandas': '2.2.3', 'fastapi': '0.115.0'}) == 'fastapi==0.115.0\\npandas==2.2.3\\n', 'The packages must be sorted, and each line must end with \\\\n'\nassert to_requirements({'joblib': None, 'numpy': '2.1.3'}) == 'joblib\\nnumpy==2.1.3\\n', 'If the version is None, only the name'\nassert to_requirements({}) == '', 'For an empty dictionary, an empty text'"
    }
   },
   {
    "title": "Unpinned packages",
    "prompt": "<p>Write the function <code>unpinned(text)</code>: it returns a list of the names of the packages in the requirements.txt text that are not pinned with <code>==</code>, in file order. Empty lines and comments are ignored. In production such packages are dangerous: tomorrow a different version may be installed.</p>",
    "hints": [
     "Clean each line: <code>line.split('#')[0].strip()</code>; if the line is empty or contains <code>==</code>, skip it with <code>continue</code>.",
     "The name: <code>line.split('&gt;=')[0].strip()</code>."
    ],
    "check": {
     "tests": "assert unpinned(req) == ['numpy', 'joblib', 'uvicorn'], f'Expected [\"numpy\", \"joblib\", \"uvicorn\"], you have {unpinned(req)}'\nassert unpinned('pandas==2.2.3\\n# numpy\\n') == [], 'If everything is pinned, an empty list'"
    }
   },
   {
    "title": "Comparing versions",
    "prompt": "<p>Comparing version strings is hard: <code>\"1.10\" &lt; \"1.9\"</code> as text gives <code>True</code>! Write two functions: <code>version_tuple(v)</code> → a tuple of integers (<code>\"2.2.3\"</code> → <code>(2, 2, 3)</code>); <code>is_at_least(installed, minimum)</code> → whether the installed version is not lower than the minimum (<code>True/False</code>). Python compares tuples correctly by itself.</p>",
    "hints": [
     "<code>tuple(int(x) for x in v.split('.'))</code>.",
     "Tuples are compared element by element: <code>(1, 10) &gt;= (1, 9)</code> → True."
    ],
    "check": {
     "tests": "assert version_tuple('2.2.3') == (2, 2, 3), 'version_tuple(\"2.2.3\") must return (2, 2, 3)'\nassert version_tuple('1.26') == (1, 26), 'version_tuple(\"1.26\") → (1, 26)'\nassert is_at_least('1.10.0', '1.9') is True, '1.10.0 ≥ 1.9 (comparing as text gives a wrong result)'\nassert is_at_least('1.25.2', '1.26') is False, '1.25.2 < 1.26'\nassert is_at_least('2.0', '2.0') is True, 'An equal version is fine too'"
    }
   },
   {
    "title": "Checking the environment",
    "prompt": "<p>Write <code>check_env(req_text, installed)</code>. <code>installed</code> holds the installed packages as <code>{атауы: нұсқа}</code>. For each package in requirements.txt return the list of problems (in file order): the package is not installed → <code>\"missing:атауы\"</code>; the version does not match by <code>==</code> → <code>\"mismatch:атауы\"</code>; the version is too old by <code>&gt;=</code> → <code>\"too_old:атауы\"</code>. Compare the versions as numbers.</p>",
    "hints": [
     "From each line take the name, the version and the operator (<code>==</code>, <code>&gt;=</code> or none).",
     "For comparison use <code>version_tuple</code>: <code>(1, 9, 0) &lt; (1, 26)</code>."
    ],
    "check": {
     "tests": "assert check_env(req, installed) == ['too_old:numpy', 'mismatch:scikit-learn', 'missing:fastapi'], f'The result is wrong: {check_env(req, installed)}'\nassert check_env('numpy>=1.26\\n', {'numpy': '1.26.4'}) == [], '1.26.4 ≥ 1.26: no problem'\nassert check_env('# бос\\n\\n', {}) == [], 'Comments and empty lines are ignored'\nassert check_env('joblib\\n', {'joblib': '1.4.2'}) == [], 'A package without a version is enough if it is installed'"
    },
    "starter": "req = \"\"\"pandas==2.2.3\nnumpy>=1.26  # at least\nscikit-learn==1.6.1\nfastapi\n\"\"\"\ninstalled = {'pandas': '2.2.3', 'numpy': '1.9.0', 'scikit-learn': '1.5.2'}\n\ndef check_env(req_text, installed):\n    return []\n"
   },
   {
    "title": "Diff of two requirements files",
    "prompt": "<p>In the PR, requirements.txt was changed. Write <code>diff_requirements(old, new)</code>: it returns the dictionary <code>{'added': [...], 'removed': [...], 'changed': [(атауы, ескі, жаңа), ...]}</code>. The version is taken from the value after <code>==</code>; for an unpinned package the version is <code>None</code>. Each list is sorted by package name. Empty lines and comments are ignored.</p>",
    "hints": [
     "First write a helper function that turns both texts into a dictionary <code>{атауы: нұсқа}</code>.",
     "In the new but not in the old → added; the reverse → removed; in both, but the version differs → changed."
    ],
    "check": {
     "tests": "_d = diff_requirements(old, new)\nassert _d['added'] == ['fastapi', 'joblib'], f'added: [\"fastapi\", \"joblib\"], you have {_d[\"added\"]}'\nassert _d['removed'] == ['requests'], f'removed: [\"requests\"], you have {_d[\"removed\"]}'\nassert _d['changed'] == [('pandas', '2.1.4', '2.2.3')], f'changed: [(\"pandas\", \"2.1.4\", \"2.2.3\")], you have {_d[\"changed\"]}'\nassert diff_requirements('a==1\\n', 'a==1\\n') == {'added': [], 'removed': [], 'changed': []}, 'If there are no changes, all the lists are empty'\nassert diff_requirements('b==1\\nc\\n', 'c==2\\n')['changed'] == [('c', None, '2')], 'The version of an unpinned package is None'"
    }
   }
  ]
 },
 "swe-7": {
  "pr": [
   {
    "title": "Magic number to a constant",
    "prompt": "<p>The code has the number <code>+ 1500</code> — this is the delivery fee, but only the author knows that. Create the constant <code>DELIVERY_FEE = 1500</code> and write the function <code>order_total(amount)</code>: an order under 20 000 ₸ gets <code>DELIVERY_FEE</code> added, and at 20 000 ₸ or more delivery is free (the constant <code>FREE_FROM = 20000</code>).</p>",
    "hints": [
     "At the top of the file: <code>DELIVERY_FEE = 1500</code>, <code>FREE_FROM = 20000</code>.",
     "Inside the function, write these names instead of the numbers."
    ],
    "check": {
     "tests": "assert DELIVERY_FEE == 1500 and FREE_FROM == 20000, 'Define the constants DELIVERY_FEE = 1500 and FREE_FROM = 20000'\nassert order_total(8000) == 9500 and order_total(20000) == 20000, 'order_total(8000) must return 9500, order_total(20000) must return 20000'\nDELIVERY_FEE = 900\nFREE_FROM = 10000\n_a, _b = order_total(8000), order_total(12000)\nDELIVERY_FEE = 1500\nFREE_FROM = 20000\nassert _a == 8900 and _b == 12000, 'order_total must use the constants DELIVERY_FEE and FREE_FROM, not numbers'"
    }
   },
   {
    "title": "A pure function",
    "prompt": "<p>The function <code>apply_discount(prices, percent)</code> changes the input list, so it is hard to test. Make it <b>pure</b>: let it return a <b>new</b> list where the discount is applied (each price is computed as <code>round(p * (100 - percent) / 100)</code>), and the input list is not changed.</p>",
    "hints": [
     "A list comprehension creates a new list: <code>[round(p * (100 - percent) / 100) for p in prices]</code>.",
     "Get rid of changes to the input such as <code>prices[i] = ...</code>."
    ],
    "check": {
     "tests": "_p = [1000, 2500, 990]\n_r = apply_discount(_p, 10)\nassert _r == [900, 2250, 891], 'apply_discount([1000, 2500, 990], 10) must return [900, 2250, 891]'\nassert _p == [1000, 2500, 990], 'The input list must not change (pure function)'\nassert _r is not _p, 'Return a new list'"
    }
   },
   {
    "title": "Clear names",
    "prompt": "<p>In the notebook there is a function <code>def f(a, b): return a / b * 100</code>: it computes the fuel use per 100 km from the distance travelled and the fuel spent. Rewrite it with clear names: the function <code>fuel_per_100km</code>, the parameters <code>fuel_liters</code> and <code>distance_km</code> (in exactly this order), and the result is rounded to 1 decimal place. For example, <code>fuel_per_100km(36, 450)</code> → <code>8.0</code>.</p>",
    "hints": [
     "The name should say what the function does: <code>def fuel_per_100km(fuel_liters, distance_km):</code>.",
     "<code>round(fuel_liters / distance_km * 100, 1)</code>."
    ],
    "check": {
     "tests": "import inspect as _i\nassert list(_i.signature(fuel_per_100km).parameters) == ['fuel_liters', 'distance_km'], 'Parameters: fuel_liters, distance_km (in this order)'\nassert fuel_per_100km(36, 450) == 8.0, 'fuel_per_100km(36, 450) must return 8.0'\nassert fuel_per_100km(10, 120) == 8.3, 'Round the result to 1 decimal place'"
    }
   },
   {
    "title": "Repeated block into a function",
    "prompt": "<p>In the notebook there are three identical loops that count by status. Replace them with one function <code>count_by(rows, key)</code>: it returns a dictionary that shows how many times each value of the column given by <code>key</code> appeared. The values must not be written in the code: the function must work with any key and any value.</p>",
    "hints": [
     "<code>result[r[key]] = result.get(r[key], 0) + 1</code>.",
     "Because the key is a parameter, one function works for both the status and the city."
    ],
    "check": {
     "tests": "assert count_by(orders, 'status') == {'paid': 2, 'cancelled': 1, 'pending': 1}, 'Counting by status is wrong'\nassert count_by(orders, 'city') == {'Алматы': 2, 'Астана': 2}, 'count_by must work with any key'\nassert count_by([{'x': 'refund'}], 'x') == {'refund': 1}, 'Do not write the values in the code: any value must be counted'\nassert count_by([], 'status') == {}, 'For an empty list, an empty dictionary'"
    }
   },
   {
    "title": "Splitting into steps",
    "prompt": "<p>Split the long cell into steps: <code>clean(rows)</code> is a new list where in each row the value of <code>city</code> becomes <code>strip().capitalize()</code>, and only the rows where <code>amount</code> is greater than 0 remain; <code>summarize(rows)</code> is the sum of <code>amount</code> by city; <code>main(rows)</code> calls these two functions in order and returns the result. The input rows must not change.</p>",
    "hints": [
     "<code>clean</code>: <code>[dict(r, city=...) for r in rows if r['amount'] &gt; 0]</code> makes a copy.",
     "<code>main</code> only combines the calls: <code>return summarize(clean(rows))</code>."
    ],
    "check": {
     "tests": "assert clean(raw) == [{'city': 'Алматы', 'amount': 5000}, {'city': 'Алматы', 'amount': 2500}, {'city': 'Астана', 'amount': 4000}], 'clean is wrong: the cities must be cleaned, the rows with amount <= 0 must be removed'\nassert raw[0]['city'] == ' алматы', 'The input rows must not change (make a copy with dict(r, city=...))'\nassert summarize([{'city': 'Орал', 'amount': 3}, {'city': 'Орал', 'amount': 4}]) == {'Орал': 7}, 'summarize sums up by city'\nassert main(raw) == {'Алматы': 7500, 'Астана': 4000}, 'main(raw) must return {\"Алматы\": 7500, \"Астана\": 4000}'\n_orig = summarize\nsummarize = lambda rows: 'summarize шақырылды'\n_r = main(raw)\nsummarize = _orig\nassert _r == 'summarize шақырылды', 'main must not copy the logic, it must call the functions clean and summarize'"
    }
   },
   {
    "title": "A tariff dictionary",
    "prompt": "<p>The taxi price depends on the city, but the code has a chain of conditions <code>if city == ...</code>. Move the tariffs into the constant dictionary <code>TARIFFS</code>: <code>{'Алматы': (500, 130), 'Астана': (450, 120), 'Шымкент': (350, 100)}</code> — (boarding, price per 1 km). <code>fare(city, km)</code> returns the price, rounded with <code>round</code> to an integer; for a city without a tariff, <code>ValueError</code> is raised.</p>",
    "hints": [
     "<code>start, per_km = TARIFFS[city]</code>.",
     "Unknown city: <code>if city not in TARIFFS: raise ValueError(...)</code>."
    ],
    "check": {
     "tests": "assert TARIFFS['Алматы'] == (500, 130) and len(TARIFFS) == 3, 'Define the constant TARIFFS'\nassert fare('Алматы', 7.5) == 1475 and fare('Шымкент', 2) == 550, 'fare(\"Алматы\", 7.5) = 1475, fare(\"Шымкент\", 2) = 550'\nTARIFFS['Орал'] = (300, 90)\n_o = fare('Орал', 10)\ndel TARIFFS['Орал']\nassert _o == 1200, 'fare must use the TARIFFS dictionary: if a new city is added, the code does not change'\ntry:\n    fare('Париж', 3)\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Тарифі жоқ қала үшін ValueError')"
    }
   },
   {
    "title": "Refactoring: grades",
    "prompt": "<p>The old school code turns points into a grade: from 85 → 5, from 70 → 4, from 50 → 3, the rest → 2. Refactor it: move the limits into the constant <code>GRADE_LIMITS = [(85, 5), (70, 4), (50, 3)]</code>; <code>grade(score)</code> gives the grade for one score (let it use only <code>GRADE_LIMITS</code>); <code>grade_counts(scores)</code> is the dictionary <code>{баға: саны}</code> (only the grades that occur). The result must be the same as in the old code.</p>",
    "hints": [
     "<code>for limit, g in GRADE_LIMITS: if score &gt;= limit: return g</code>; when the loop ends, <code>return 2</code>.",
     "In <code>grade_counts</code> do not repeat the conditions, call <code>grade(s)</code>."
    ],
    "check": {
     "tests": "assert [grade(s) for s in [92, 85, 84, 70, 69, 50, 49, 0]] == [5, 5, 4, 4, 3, 3, 2, 2], 'The limits of grade are wrong (85→5, 70→4, 50→3)'\nassert grade_counts(scores) == {5: 3, 3: 2, 2: 2, 4: 1}, 'The result of grade_counts must match the result of the old code'\nGRADE_LIMITS = [(90, 5), (60, 4), (40, 3)]\n_g = grade(85)\nGRADE_LIMITS = [(85, 5), (70, 4), (50, 3)]\nassert _g == 4, 'grade must use the constant GRADE_LIMITS, not numbers'\nassert grade_counts([]) == {}, 'For an empty list, an empty dictionary'"
    }
   },
   {
    "title": "Building a pipeline function",
    "prompt": "<p>Write <code>make_pipeline(*steps)</code>: it must <b>return a function</b>, and that function passes the data in turn through the functions in <code>steps</code>. Then build the cleaning pipeline: <code>clean_names = make_pipeline(strip_all, drop_empty, title_all, unique)</code>, where <code>title_all</code> is a function that makes every name <code>capitalize()</code> (write it yourself).</p>",
    "hints": [
     "Write an inner function and return it: <code>def run(data): ...</code>, then <code>return run</code>.",
     "Inside <code>run</code>: <code>for step in steps: data = step(data)</code>."
    ],
    "check": {
     "tests": "assert callable(make_pipeline()), 'make_pipeline must return a function'\nassert make_pipeline()([1, 2]) == [1, 2], 'If there are no steps, the data does not change'\nassert make_pipeline(lambda x: x + 1, lambda x: x * 10)(3) == 40, 'The steps must be applied in the given order'\nassert title_all(['алматы', 'ШЫМКЕНТ']) == ['Алматы', 'Шымкент'], 'title_all must apply capitalize() to every name'\nassert clean_names(names) == ['Айгерім', 'Ерлан', 'Дана'], f'clean_names(names) is wrong: {clean_names(names)}'"
    }
   }
  ]
 },
 "swe-8": {
  "pr": [
   {
    "title": "Reading a weather response",
    "prompt": "<p>The weather API returned the text <code>raw</code>. Use <code>json.loads</code> to turn it into a dictionary and store in <code>city</code> the city name, in <code>temp</code> the current temperature (<code>temp_c</code> inside <code>current</code>), and in <code>max_tomorrow</code> the highest temperature for tomorrow (the first element of the list <code>forecast</code>).</p>",
    "hints": [
     "First <code>data = json.loads(raw)</code>, then <code>data['current']['temp_c']</code>.",
     "The first element of the list: <code>data['forecast'][0]</code>."
    ],
    "check": {
     "tests": "assert city == 'Астана', 'city = \"Астана\"'\nassert temp == -18.5, 'temp is temp_c from current (-18.5)'\nassert max_tomorrow == -12, 'max_tomorrow is max_c from forecast[0] (-12)'"
    }
   },
   {
    "title": "The kind of a status code",
    "prompt": "<p>Write the function <code>status_kind(code)</code>: 200–299 → <code>'success'</code>, 400–499 → <code>'client_error'</code>, 500–599 → <code>'server_error'</code>, anything else → <code>'other'</code>.</p>",
    "hints": [
     "Check the range: <code>if 400 &lt;= code &lt;= 499:</code>.",
     "Rule: 4xx is a client error, 5xx is a server error."
    ],
    "check": {
     "tests": "assert status_kind(200) == 'success' and status_kind(201) == 'success', '2xx → success'\nassert status_kind(404) == 'client_error' and status_kind(422) == 'client_error', '4xx → client_error'\nassert status_kind(500) == 'server_error' and status_kind(503) == 'server_error', '5xx → server_error'\nassert status_kind(302) == 'other', '3xx → other'"
    }
   },
   {
    "title": "An order as JSON",
    "prompt": "<p>Write the function <code>to_json(order)</code>: it turns the dictionary into JSON text, Kazakh letters must not turn into <code>\\u</code> codes, and the keys must be sorted alphabetically (<code>sort_keys=True</code>). For example, <code>{\"city\": \"Шымкент\", \"amount\": 5000}</code> → <code>'{\"amount\": 5000, \"city\": \"Шымкент\"}'</code>.</p>",
    "hints": [
     "<code>json.dumps(order, ensure_ascii=False, sort_keys=True)</code>.",
     "<code>str(order)</code> is not JSON: it uses single quotes."
    ],
    "check": {
     "tests": "import json as _j\nassert to_json({'city': 'Шымкент', 'amount': 5000}) == '{\"amount\": 5000, \"city\": \"Шымкент\"}', 'The keys must be sorted and the Kazakh letters kept'\nassert _j.loads(to_json({'ok': True, 'items': [1, 2]})) == {'ok': True, 'items': [1, 2]}, 'The result must be correct JSON (true, double quotes)'"
    }
   },
   {
    "title": "Requests that can be retried",
    "prompt": "<p>After a server error (5xx) the client repeats the request automatically, but only for <b>idempotent</b> methods (<code>GET</code>, <code>PUT</code>, <code>DELETE</code>). Write <code>retry_list(requests)</code>: <code>requests</code> is a list of tuples <code>(id, method, status)</code>; it returns, in order, the ids of the requests whose status is 500–599 and whose method is idempotent. <code>POST</code> is not retried: two orders could be created.</p>",
    "hints": [
     "The set of idempotent methods: <code>{'GET', 'PUT', 'DELETE'}</code>.",
     "The condition: <code>method in IDEMPOTENT and 500 &lt;= status &lt;= 599</code>."
    ],
    "check": {
     "tests": "assert retry_list(requests) == [1, 4], f'Expected [1, 4], you have {retry_list(requests)}'\nassert retry_list([(7, 'POST', 503)]) == [], 'POST is not retried'\nassert retry_list([(8, 'GET', 404), (9, 'PUT', 500)]) == [9], '404 is a client error, we do not retry'"
    }
   },
   {
    "title": "Parsing a URL",
    "prompt": "<p>Write the function <code>parse_url(url)</code>: <code>\"/cities/Алматы/weather?days=3&amp;units=c\"</code> → <code>(['cities', 'Алматы', 'weather'], {'days': '3', 'units': 'c'})</code>. The first part is the parts of the path (without empty parts), the second is the query parameters (the values are text). If there is no <code>?</code>, the dictionary is empty.</p>",
    "hints": [
     "<code>path, _, query = url.partition('?')</code>: if <code>?</code> is missing, query is empty.",
     "The parameters: <code>query.split('&amp;')</code>, each one is split with <code>pair.partition('=')</code>."
    ],
    "check": {
     "tests": "assert parse_url('/cities/Алматы/weather?days=3&units=c') == (['cities', 'Алматы', 'weather'], {'days': '3', 'units': 'c'}), 'The path parts and the query parameters are wrong'\nassert parse_url('/products/42') == (['products', '42'], {}), 'If there is no ?, an empty dictionary'\nassert parse_url('/health/') == (['health'], {}), 'Empty parts are not added to the list'\nassert parse_url('/search?q=шай') == (['search'], {'q': 'шай'}), 'A single parameter'"
    }
   },
   {
    "title": "Building an error response",
    "prompt": "<p>Write the function <code>error_response(status)</code>: it returns <code>(status, body)</code>, where <code>body</code> is the JSON <b>text</b> <code>{\"error\": хабар}</code> (Kazakh letters are kept). Messages: 400 → <code>\"Сұрау қате құрылған\"</code>, 404 → <code>\"Табылмады\"</code>, 422 → <code>\"Мәндер тексеруден өтпеді\"</code>, 500 → <code>\"Сервердің ішкі қатесі\"</code>, anything else → <code>\"Белгісіз қате\"</code>.</p>",
    "hints": [
     "Put the messages into a dictionary, and then <code>MESSAGES.get(status, 'Белгісіз қате')</code>.",
     "The body must be text: <code>json.dumps(..., ensure_ascii=False)</code>."
    ],
    "check": {
     "tests": "import json as _j\n_s, _b = error_response(404)\nassert _s == 404 and isinstance(_b, str), 'Return the status and the JSON text (str)'\nassert _j.loads(_b) == {'error': 'Табылмады'}, '404 → {\"error\": \"Табылмады\"}'\nassert 'Табылмады' in _b, 'Add ensure_ascii=False'\nassert _j.loads(error_response(422)[1])['error'] == 'Мәндер тексеруден өтпеді', 'The message for 422 is wrong'\nassert _j.loads(error_response(418)[1])['error'] == 'Белгісіз қате', 'An unknown status → \"Белгісіз қате\"'"
    }
   },
   {
    "title": "The library API",
    "prompt": "<p>Write the function <code>handle(method, path, body=None)</code> that models a library API: it returns <code>(status, data)</code>:<br>• <code>GET /books</code> → 200, the list of all books;<br>• <code>GET /books/&lt;id&gt;</code> → 200 and the book, if it is missing — 404;<br>• <code>PUT /books/&lt;id&gt;</code> → fully replaces the book with the request body (<code>id</code> is kept), 200; if the book is missing — 404; if there is no <code>title</code> in the body — 422;<br>• <code>DELETE /books/&lt;id&gt;</code> → deletes the book, 200 and <code>{'deleted': id}</code>; if it is missing — 404;<br>• other methods → 405; another path or a non-numeric id → 404.<br>In case of an error, data is <code>{'error': ...}</code>.</p>",
    "hints": [
     "Split the path: <code>parts = path.strip('/').split('/')</code>. First check the path, then the method, then the id.",
     "PUT: <code>books[book_id] = dict(body, id=book_id)</code>; DELETE: <code>del books[book_id]</code>."
    ],
    "check": {
     "tests": "books.clear()\nbooks.update({1: {'id': 1, 'title': 'Абай жолы', 'author': 'Мұхтар Әуезов'}, 2: {'id': 2, 'title': 'Көшпенділер', 'author': 'Ілияс Есенберлин'}})\n_s, _d = handle('GET', '/books')\nassert _s == 200 and len(_d) == 2, 'GET /books → 200 and 2 books'\nassert handle('GET', '/books/2') == (200, books[2]), 'GET /books/2 → 200 and the same book'\nassert handle('GET', '/books/9')[0] == 404 and handle('GET', '/books/x')[0] == 404, 'A missing or non-numeric id → 404'\n_s, _d = handle('PUT', '/books/1', {'title': 'Абай жолы', 'author': 'М. Әуезов'})\nassert _s == 200 and _d == {'title': 'Абай жолы', 'author': 'М. Әуезов', 'id': 1}, 'PUT replaces the book fully, the id is kept'\nassert handle('PUT', '/books/1', {'title': 'Абай жолы', 'author': 'М. Әуезов'}) == (_s, _d), 'PUT is idempotent: a repeat gives the same result'\nassert handle('PUT', '/books/1', {'author': 'X'})[0] == 422, 'No title → 422'\nassert handle('PUT', '/books/7', {'title': 'Y'})[0] == 404, 'PUT for a missing book → 404'\nassert handle('DELETE', '/books/2') == (200, {'deleted': 2}) and 2 not in books, 'DELETE removes the book'\nassert handle('DELETE', '/books/2')[0] == 404, 'A repeated DELETE of a deleted book → 404'\nassert handle('POST', '/books/1')[0] == 405 and handle('DELETE', '/books')[0] == 405, 'Other methods → 405'\nassert handle('GET', '/authors')[0] == 404, 'An unknown path → 404'\nassert 'error' in handle('GET', '/books/9')[1], 'An error response must have the key error'"
    }
   },
   {
    "title": "Checking the JSON body",
    "prompt": "<p>The server gets the body as raw text. Write <code>handle_forecast(raw_body)</code>: it returns <code>(status, data)</code>.<br>• If the JSON is broken → <code>400</code>, <code>{'error': 'invalid json'}</code> (<code>json.loads</code> raises <code>ValueError</code>);<br>• if the JSON is correct but is not a dictionary, or <code>city</code> is not a non-empty text, or <code>days</code> is not an integer from 1 to 7 → <code>422</code>, <code>{'error': [қате өрістердің атаулары]}</code> (in the order <code>['city', 'days']</code>; if it is not a dictionary, both kinds of errors);<br>• if everything is correct → <code>200</code>, <code>{'city': ..., 'days': ...}</code>.</p>",
    "hints": [
     "First <code>try: data = json.loads(raw_body)</code>, then <code>except ValueError: return 400, ...</code>.",
     "Then check the fields one by one and collect the names of the wrong fields in a list; do not forget that <code>bool</code> also counts as <code>int</code>."
    ],
    "check": {
     "tests": "assert handle_forecast('{\"city\": \"Алматы\", \"days\": 3}') == (200, {'city': 'Алматы', 'days': 3}), 'A correct body → 200'\nassert handle_forecast('{city: Алматы}') == (400, {'error': 'invalid json'}), 'Broken JSON → 400'\nassert handle_forecast('') == (400, {'error': 'invalid json'}), 'An empty body is broken JSON too'\nassert handle_forecast('{\"city\": \"Алматы\", \"days\": 10}') == (422, {'error': ['days']}), 'days outside 1–7 → 422'\nassert handle_forecast('{\"city\": \"\", \"days\": \"3\"}') == (422, {'error': ['city', 'days']}), 'An empty city and the text \"3\" → two errors'\nassert handle_forecast('{\"days\": 2}') == (422, {'error': ['city']}), 'No city → 422'\nassert handle_forecast('[1, 2]') == (422, {'error': ['city', 'days']}), 'JSON that is not a dictionary → 422'\nassert handle_forecast('{\"city\": \"Орал\", \"days\": true}')[0] == 422, 'true is not a number'"
    }
   }
  ]
 },
 "dep-1": {
  "pr": [
   {
    "title": "Copying with pickle",
    "prompt": "<p>The tariff dictionary <code>tariffs</code> is given. Turn it into bytes with <code>pickle.dumps</code> into <code>blob</code>, then load it back into <code>restored</code> with <code>pickle.loads</code>. <code>restored</code> must have the same content as <code>tariffs</code>, but be a separate object.</p>",
    "hints": [
     "<code>blob = pickle.dumps(tariffs)</code> — object → bytes.",
     "<code>restored = pickle.loads(blob)</code> — bytes → object."
    ],
    "check": {
     "tests": "assert isinstance(blob, bytes), 'blob must be the result of pickle.dumps(tariffs) (bytes)'\nassert restored == tariffs, 'The content of restored must match tariffs'\nassert restored is not tariffs, 'restored is the result of pickle.loads (a new object), not tariffs itsel'"
    }
   },
   {
    "title": "The bundle dictionary",
    "prompt": "<p>Write the function <code>make_bundle(model, features, version, trained_at='2026-09-30')</code>: it puts the model together with the metadata into a dictionary and returns it. The keys: <code>model</code>, <code>features</code>, <code>version</code>, <code>trained_at</code>. Keep a <b>copy</b> of the list <code>features</code> (so the bundle does not change if the original list changes).</p>",
    "hints": [
     "Return the dictionary directly: <code>{'model': model, 'features': list(features), ...}</code>.",
     "<code>list(features)</code> creates a new list."
    ],
    "check": {
     "tests": "_f = ['tenure_months', 'support_calls']\n_b = make_bundle('M', _f, '1.2.0')\nassert _b == {'model': 'M', 'features': _f, 'version': '1.2.0', 'trained_at': '2026-09-30'}, f'The keys and values of bundle are wrong: {_b}'\n_f.append('city')\nassert _b['features'] == ['tenure_months', 'support_calls'], 'Keep a copy of features: list(features)'\nassert make_bundle('M', [], '2.0.0', '2026-10-01')['trained_at'] == '2026-10-01', 'The trained_at parameter must be taken into account'"
    }
   },
   {
    "title": "Saving a scaler",
    "prompt": "<p>A <code>StandardScaler</code> has been trained on the January temperatures of Almaty. Save it to the file <code>temp_scaler.joblib</code> with <code>joblib.dump</code>, and then load it into <code>loaded</code>. The loaded scaler must remember the same <code>mean_</code>.</p>",
    "hints": [
     "<code>joblib.dump(scaler, 'temp_scaler.joblib')</code>.",
     "<code>loaded = joblib.load('temp_scaler.joblib')</code>."
    ],
    "check": {
     "tests": "import os as _os\nfrom sklearn.preprocessing import StandardScaler as _SS\nassert _os.path.exists('temp_scaler.joblib'), 'The file temp_scaler.joblib was not created'\nassert isinstance(loaded, _SS) and loaded is not scaler, 'loaded must be a StandardScaler loaded from the file'\nassert abs(float(loaded.mean_[0]) - (-8.833333)) < 1e-4, 'The mean_ value of the loaded scaler must be kept (≈ -8.83)'"
    }
   },
   {
    "title": "A file name with a version",
    "prompt": "<p>Write the function <code>bundle_filename(name, version)</code>: it returns <code>f\"{name}_v{version}.joblib\"</code>, for example <code>(\"churn\", \"1.2.0\")</code> → <code>\"churn_v1.2.0.joblib\"</code>. The version must be in the format <code>X.Y.Z</code>: exactly three parts separated by dots, and each part has only digits. Otherwise <code>ValueError</code> is raised (the message must contain the word <code>version</code>).</p>",
    "hints": [
     "First <code>parts = version.split('.')</code>, then <code>len(parts) == 3</code> and <code>all(p.isdigit() for p in parts)</code>.",
     "The file name: <code>f'{name}_v{version}.joblib'</code>."
    ],
    "check": {
     "tests": "assert bundle_filename('churn', '1.2.0') == 'churn_v1.2.0.joblib', 'bundle_filename(\"churn\", \"1.2.0\") must return \"churn_v1.2.0.joblib\"'\nassert bundle_filename('price', '10.0.3') == 'price_v10.0.3.joblib', 'A version with several digits in a part is fine too'\nfor _v in ['1.2', 'latest', '1.2.x', '1..2', '1.2.3.4']:\n    try:\n        bundle_filename('churn', _v)\n    except ValueError as _e:\n        assert 'version' in str(_e), 'The message must contain the word \"version\"'\n    else:\n        raise AssertionError(f'version={_v!r} үшін ValueError күтілді')"
    }
   },
   {
    "title": "Checking the bundle",
    "prompt": "<p>When the server starts, it checks the loaded bundle. Write <code>check_bundle(bundle)</code>: it returns a list of problems. For each key from <code>REQUIRED</code> that is missing in the bundle, add <code>\"missing:кілт\"</code> (in REQUIRED order); if <code>features</code> is there but is an empty list, add <code>\"empty:features\"</code>; if <code>model</code> has no method <code>predict_proba</code>, add <code>\"no_predict_proba\"</code>. If there are no problems, return an empty list.</p>",
    "hints": [
     "<code>[f'missing:{k}' for k in REQUIRED if k not in bundle]</code>.",
     "Is there such a method: <code>hasattr(bundle['model'], 'predict_proba')</code>."
    ],
    "check": {
     "tests": "class _M:\n    def predict_proba(self, X):\n        return [[0.5, 0.5]]\n_ok = {'model': _M(), 'features': ['a'], 'version': '1.0.0', 'trained_at': '2026-09-30'}\nassert check_bundle(_ok) == [], 'For a correct bundle, an empty list'\nassert check_bundle({'version': '1.0.0'}) == ['missing:model', 'missing:features', 'missing:trained_at'], 'The missing keys come in the REQUIRED order'\nassert check_bundle(dict(_ok, features=[])) == ['empty:features'], 'Empty features → empty:features'\nassert check_bundle(dict(_ok, model='жай мәтін')) == ['no_predict_proba'], 'A model without predict_proba → no_predict_proba'"
    }
   },
   {
    "title": "A pipeline for the flat price",
    "prompt": "<p>Train the flat price model as a Pipeline (<code>StandardScaler</code> + <code>LinearRegression</code>) and save it together with the bundle: <code>{'model': pipe, 'features': FEATURES, 'version': '1.0.0'}</code> → <code>joblib.dump(..., 'flat_price.joblib')</code>. Then load it from the file into <code>restored</code> and, through the restored bundle, compute into <code>pred</code> the price of a 60 m², 2-room flat (mln ₸, <code>float</code>).</p>",
    "hints": [
     "First <code>pipe = make_pipeline(StandardScaler(), LinearRegression())</code>, then <code>pipe.fit(flats[FEATURES], flats['price_mln'])</code>.",
     "For the prediction: <code>pd.DataFrame([{...}])[restored['features']]</code>."
    ],
    "check": {
     "tests": "import os as _os\nfrom sklearn.pipeline import Pipeline as _Pl\nassert _os.path.exists('flat_price.joblib'), 'The file flat_price.joblib was not created'\nassert isinstance(restored, dict) and restored.get('version') == '1.0.0' and restored.get('features') == FEATURES, 'restored is the bundle loaded from the file (model, features, version)'\nassert isinstance(restored['model'], _Pl) and 'standardscaler' in restored['model'].named_steps, 'The bundle must contain the whole Pipeline (scaler + model)'\nassert isinstance(pred, float) and abs(pred - 42.0) < 0.3, f'A 60 m², 2-room flat must be ≈ 42 mln ₸, you have {pred}'"
    }
   },
   {
    "title": "Keeping the order of features",
    "prompt": "<p>In the customer dictionaries the order of the keys is different, and there are extra keys. Write <code>predict_many(bundle, customers)</code>: collect all the customers into <b>one</b> DataFrame, take the columns in the order <code>bundle['features']</code>, call <code>predict_proba</code> once, and return the list of churn probabilities rounded to 3 decimal places as a list of <code>float</code>. For an empty list, <code>[]</code>.</p>",
    "hints": [
     "<code>pd.DataFrame(customers)[bundle['features']]</code> fixes the order and removes the extra columns.",
     "<code>predict_proba(rows)[:, 1]</code> — the probability of class 1 for all the rows."
    ],
    "check": {
     "tests": "_c = [{'support_calls': 5, 'tenure_months': 2, 'city': 'Алматы'}, {'tenure_months': 40, 'support_calls': 0, 'plan': 'Безлимит'}]\n_p = predict_many(bundle, _c)\n_ref = model.predict_proba(pd.DataFrame([[2, 5], [40, 0]], columns=FEATURES))[:, 1]\nassert len(_p) == 2 and all(isinstance(x, float) for x in _p), 'One float probability for each customer'\nassert _p == [round(float(x), 3) for x in _ref], 'The features must be taken in the order of bundle[\"features\"], the result rounded to 3 decimal places'\nassert predict_many(bundle, []) == [], 'For an empty list []'\nclass _Cnt:\n    def __init__(self):\n        self.calls = 0\n    def predict_proba(self, X):\n        self.calls += 1\n        return model.predict_proba(X)\n_cm = _Cnt()\npredict_many({'model': _cm, 'features': FEATURES}, _c * 5)\nassert _cm.calls == 1, 'predict_proba must be called once (all customers in one DataFrame)'"
    }
   },
   {
    "title": "Version compatibility",
    "prompt": "<p>A model may fail to load on another sklearn version. Write <code>load_bundle(blob, current_sklearn)</code>: it loads the bundle with <code>pickle.loads(blob)</code>; if the <b>major.minor</b> part of <code>sklearn_version</code> in the bundle does not match <code>current_sklearn</code>, it raises <code>RuntimeError</code> naming both versions (<code>\"1.6.1\"</code> and <code>\"1.6.0\"</code> match, <code>\"1.5.2\"</code> and <code>\"1.6.1\"</code> do not); if <code>sklearn_version</code> is missing, <code>RuntimeError</code> is raised too. If it matches, it returns the bundle.</p>",
    "hints": [
     "Major.minor: <code>tuple(int(x) for x in v.split('.')[:2])</code>.",
     "The message must contain both versions: <code>f'... {saved} ... {current_sklearn}'</code>."
    ],
    "check": {
     "tests": "import pickle as _pk\n_b = load_bundle(_pk.dumps({'model': 'M', 'sklearn_version': '1.6.1'}), '1.6.0')\nassert _b == {'model': 'M', 'sklearn_version': '1.6.1'}, 'With matching versions the bundle must be returned'\nassert load_bundle(_pk.dumps({'sklearn_version': '1.10.0'}), '1.10.2')['sklearn_version'] == '1.10.0', 'The versions 1.10.x match'\nfor _saved, _cur in [('1.5.2', '1.6.1'), ('1.1.0', '1.10.0'), ('0.24.2', '1.24.2')]:\n    try:\n        load_bundle(_pk.dumps({'sklearn_version': _saved}), _cur)\n    except RuntimeError as _e:\n        assert _saved in str(_e) and _cur in str(_e), 'The message must name both versions'\n    else:\n        raise AssertionError(f'{_saved} мен {_cur} сәйкес емес: RuntimeError күтілді')\ntry:\n    load_bundle(_pk.dumps({'model': 'M'}), '1.6.1')\nexcept RuntimeError:\n    pass\nelse:\n    raise AssertionError('sklearn_version жоқ болса RuntimeError')"
    }
   }
  ]
 },
 "dep-2": {
  "pr": [
   {
    "title": "Required fields",
    "prompt": "<p>Write the function <code>missing_fields(data, required)</code>: it returns the fields that are in the list <code>required</code> but not in the dictionary <code>data</code>, in the order of <code>required</code>. A field whose value is <code>None</code> is also considered missing.</p>",
    "hints": [
     "<code>data.get(f)</code> gives <code>None</code> both when the field is missing and when its value is <code>None</code>.",
     "<code>[f for f in required if data.get(f) is None]</code>."
    ],
    "check": {
     "tests": "assert missing_fields({'tenure_months': 3, 'city': None}, ['tenure_months', 'support_calls', 'city']) == ['support_calls', 'city'], 'Missing and None fields come in the order of required'\nassert missing_fields({'a': 0, 'b': ''}, ['a', 'b']) == [], '0 and an empty string are existing values'\nassert missing_fields({}, []) == [], 'If there are no required fields, an empty list'"
    }
   },
   {
    "title": "A non-negative integer",
    "prompt": "<p>Write the function <code>is_count(v)</code>: it returns <code>True</code> if <code>v</code> is a non-negative integer. The text <code>\"12\"</code>, the number <code>2.5</code>, <code>-1</code> and <code>True</code>/<code>False</code> are not valid (in Python <code>bool</code> is a subtype of <code>int</code>, so check it separately).</p>",
    "hints": [
     "<code>isinstance(v, int) and not isinstance(v, bool)</code>.",
     "Then <code>v &gt;= 0</code>."
    ],
    "check": {
     "tests": "assert is_count(0) is True and is_count(42) is True, '0 and 42 are valid'\nassert is_count(-1) is False, 'A negative number is not valid'\nassert is_count('12') is False and is_count(2.5) is False, 'Text and a fractional number are not valid'\nassert is_count(True) is False, 'True is a bool, not a number'"
    }
   },
   {
    "title": "The response format",
    "prompt": "<p>Write the function <code>make_response(p, version, threshold=0.5)</code>: it returns the prediction response as a dictionary: <code>{'ok': True, 'probability': p (3 таңбаға дөңгелектенген), 'label': 1 немесе 0 (p ≥ threshold), 'model_version': version}</code>.</p>",
    "hints": [
     "<code>label = int(p &gt;= threshold)</code> — True → 1, False → 0.",
     "<code>round(p, 3)</code>."
    ],
    "check": {
     "tests": "assert make_response(0.81234, '1.2.0') == {'ok': True, 'probability': 0.812, 'label': 1, 'model_version': '1.2.0'}, 'The keys or values of the response are wrong'\nassert make_response(0.5, 'v')['label'] == 1, 'If p = threshold, label is 1'\nassert make_response(0.4, 'v', threshold=0.35)['label'] == 1 and make_response(0.3, 'v', threshold=0.35)['label'] == 0, 'The threshold parameter must be taken into account'"
    }
   },
   {
    "title": "Checking flat input",
    "prompt": "<p>Write <code>validate_flat(data)</code>: it returns the list of error messages (empty if everything is correct). Rules: <code>area</code> is a number (int or float, not bool), 10 ≤ area ≤ 500; <code>rooms</code> is an integer 1–10; <code>city</code> must be in <code>CITIES</code>. A missing field is also an error. Each field gets at most one message, the message starts with the field name (<code>\"area: ...\"</code>), and the fields go in the order: area, rooms, city.</p>",
    "hints": [
     "Get each field with <code>data.get(...)</code>, first check whether it is <code>None</code>, then the type and the range.",
     "Range: <code>10 &lt;= area &lt;= 500</code>; integer: <code>isinstance(rooms, int) and not isinstance(rooms, bool)</code>."
    ],
    "check": {
     "tests": "assert validate_flat({'area': 54.5, 'rooms': 2, 'city': 'Алматы'}) == [], 'For correct data, an empty list'\nassert validate_flat({'area': 500, 'rooms': 10, 'city': 'Шымкент'}) == [], 'The boundary values are correct'\n_e = validate_flat({})\nassert len(_e) == 3 and [m.split(':')[0] for m in _e] == ['area', 'rooms', 'city'], f'All the fields are missing: 3 messages (area, rooms, city), you have {_e}'\n_e = validate_flat({'area': '60', 'rooms': 2.0, 'city': 'Париж'})\nassert [m.split(':')[0] for m in _e] == ['area', 'rooms', 'city'], f'\"60\" is text, 2.0 is a fraction, Paris is not allowed: 3 messages, you have {_e}'\nassert [m.split(':')[0] for m in validate_flat({'area': 5, 'rooms': 0, 'city': 'Астана'})] == ['area', 'rooms'], 'Values outside the range are errors'\nassert validate_flat({'area': True, 'rooms': 1, 'city': 'Астана'})[0].startswith('area'), 'True is not a number'"
    }
   },
   {
    "title": "The model is loaded once",
    "prompt": "<p><code>load_model()</code> is a slow function (it reads from the disk), and each time it is called it increases the counter <code>LOADS</code>. Write <code>get_model()</code>: load the model on the first call and keep it in the module-level variable <code>MODEL</code>, and on the next calls return the same object. <code>predict(x)</code> gets the model through <code>get_model()</code>.</p>",
    "hints": [
     "To change a module variable inside a function: <code>global MODEL</code>.",
     "<code>if MODEL is None: MODEL = load_model()</code>, then <code>return MODEL</code>."
    ],
    "check": {
     "tests": "_r = [predict(k) for k in range(6)]\nassert _r[:3] == [0.1, 0.25, 0.4], 'The results of predict must not change'\nassert LOADS == 1, f'With 6 predictions the model must be loaded once, you have {LOADS} times'\nassert get_model() is get_model() is MODEL, 'get_model() must always return the same MODEL object'"
    }
   },
   {
    "title": "Checking a batch",
    "prompt": "<p>The night job checks many rows at once. <code>validate_customer(row)</code> is already done (it returns the list of errors). Write <code>split_valid(rows)</code>: it returns <code>(valid, errors)</code>, where <code>valid</code> is the list of rows without errors (in order), and <code>errors</code> is the dictionary <code>{жолдың индексі: қате тізімі}</code>, only for the rows with errors.</p>",
    "hints": [
     "<code>for i, row in enumerate(rows):</code> — together with the index.",
     "If the list of errors is not empty, <code>errors[i] = e</code>, otherwise <code>valid.append(row)</code>."
    ],
    "check": {
     "tests": "_rows = [{'tenure_months': 3, 'support_calls': 1}, {'tenure_months': -1, 'support_calls': 2}, {'tenure_months': 12, 'support_calls': 0}, {}]\n_v, _e = split_valid(_rows)\nassert _v == [_rows[0], _rows[2]], 'Only the rows 0 and 2 must remain in the list valid'\nassert sorted(_e) == [1, 3], f'The keys of errors are the indexes of the rows with errors (1 and 3), you have {sorted(_e)}'\nassert len(_e[3]) == 2 and len(_e[1]) == 1, 'For each index, the full list returned by validate_customer'\nassert split_valid([]) == ([], {}), 'For an empty list ([], {})'"
    }
   },
   {
    "title": "A prediction with a risk level",
    "prompt": "<p>The model is already trained and available as <code>model</code>. Write <code>predict(customer)</code>. Check: <code>tenure_months</code> is an integer 0–600; <code>support_calls</code> is an integer 0–50. If there is an error, return <code>{'ok': False, 'errors': [...]}</code> (the messages start with the field name). If everything is correct, return <code>{'ok': True, 'churn_probability': p (3 таңба), 'risk': ..., 'model_version': MODEL_VERSION}</code>, where <code>risk</code>: p ≥ 0.7 → <code>'high'</code>, p ≥ 0.4 → <code>'medium'</code>, otherwise <code>'low'</code>. Extra keys are ignored.</p>",
    "hints": [
     "Split the check, the risk level and the prediction into separate functions.",
     "First compute <code>risk</code> from the unrounded probability, and only then <code>round(p, 3)</code>."
    ],
    "check": {
     "tests": "_r = predict({'tenure_months': 2, 'support_calls': 5, 'city': 'Астана'})\nassert _r.get('ok') is True and set(_r) == {'ok', 'churn_probability', 'risk', 'model_version'}, f'The keys of the response: ok, churn_probability, risk, model_version. You have {sorted(_r)}'\n_p = float(model.predict_proba(pd.DataFrame([[2, 5]], columns=FEATURES))[0, 1])\nassert _r['churn_probability'] == round(_p, 3) and _r['risk'] == 'high' and _r['model_version'] == '1.1.0', 'A new customer with many complaints: risk high'\nassert predict({'tenure_months': 50, 'support_calls': 0})['risk'] == 'low', 'A long-term customer: risk low'\n_ps = {k: float(model.predict_proba(pd.DataFrame([[k, 2]], columns=FEATURES))[0, 1]) for k in range(0, 40)}\n_mid = next(k for k, p in _ps.items() if 0.4 <= p < 0.7)\nassert predict({'tenure_months': _mid, 'support_calls': 2})['risk'] == 'medium', 'If 0.4 ≤ p < 0.7, risk medium'\n_r = predict({'tenure_months': 700, 'support_calls': -1})\nassert _r.get('ok') is False and [m.split(':')[0] for m in _r['errors']] == ['tenure_months', 'support_calls'], 'Values outside the range: two errors (starting with the field name)'\nassert predict({'tenure_months': 5, 'support_calls': 51})['ok'] is False, 'support_calls ≤ 50'\nassert predict({'tenure_months': '5', 'support_calls': 1})['ok'] is False, 'The text \"5\" is not accepted'"
    }
   },
   {
    "title": "The Predictor class",
    "prompt": "<p>Wrap the prediction logic in a class. Its constructor: <code>Predictor(model, features, threshold=0.5, version='1.0.0')</code>. The method <code>predict(data)</code> checks that each feature in <code>self.features</code> is a non-negative integer; if there is an error it returns <code>{'ok': False, 'errors': [...]}</code>, if not, <code>{'ok': True, 'churn_probability': p (3 таңба), 'label': int(p ≥ self.threshold), 'model_version': self.version}</code>. Create two objects: <code>default</code> (threshold 0.5) and <code>strict</code> (threshold 0.8, version <code>'1.0.0-strict'</code>).</p>",
    "hints": [
     "<code>__init__</code> stores all the parameters in <code>self</code>; the check can be moved to a separate method <code>validate</code>.",
     "Take the threshold from <code>self.threshold</code>: then one class works with different thresholds."
    ],
    "check": {
     "tests": "assert isinstance(default, Predictor) and isinstance(strict, Predictor), 'default and strict are Predictor objects'\nassert default.threshold == 0.5 and default.version == '1.0.0', 'default: threshold 0.5, version 1.0.0'\nassert strict.threshold == 0.8 and strict.version == '1.0.0-strict', 'strict: threshold 0.8, version 1.0.0-strict'\n_ps = {k: float(model.predict_proba(pd.DataFrame([[k, 3]], columns=FEATURES))[0, 1]) for k in range(0, 40)}\n_k = next(k for k, p in _ps.items() if 0.5 <= p < 0.8)\n_a, _b = default.predict({'tenure_months': _k, 'support_calls': 3, 'city': 'Алматы'}), strict.predict({'support_calls': 3, 'tenure_months': _k})\nassert _a['ok'] is True and _a['label'] == 1 and _b['label'] == 0, 'If 0.5 ≤ p < 0.8, default has label=1, strict has label=0'\nassert _a['churn_probability'] == round(_ps[_k], 3) == _b['churn_probability'], 'The probability is rounded to 3 decimal places, the same in both objects'\nassert _b['model_version'] == '1.0.0-strict', 'model_version is self.version'\n_r = default.predict({'tenure_months': -3})\nassert _r['ok'] is False and len(_r['errors']) == 2, 'A negative tenure and a missing support_calls: 2 errors'"
    }
   }
  ]
 },
 "dep-3": {
  "pr": [
   {
    "title": "Health and version",
    "prompt": "<p>The <code>MiniApp</code> is ready, similar to FastAPI. Using decorators, add two endpoints: <code>GET /health</code> → <code>{'status': 'ok'}</code>; <code>GET /version</code> → <code>{'model_version': MODEL_VERSION, 'name': 'churn-api'}</code>.</p>",
    "hints": [
     "The decorator goes above the function: <code>@app.get('/health')</code>, and on the next line <code>def health():</code>.",
     "The GET function takes no parameters."
    ],
    "check": {
     "tests": "assert app.handle('GET', '/health') == (200, {'status': 'ok'}), 'GET /health → 200 and {\"status\": \"ok\"}'\nassert app.handle('GET', '/version') == (200, {'model_version': '1.3.0', 'name': 'churn-api'}), 'GET /version → model_version and name'\nassert app.handle('POST', '/health')[0] == 405, '/health accepts only GET'"
    },
    "starter": "class MiniApp:\n    \"\"\"FastAPI-ге ұқсас кішкене router: (method, path) → функция.\"\"\"\n    def __init__(self):\n        self.routes = {}\n\n    def get(self, path):\n        def register(func):\n            self.routes[('GET', path)] = func\n            return func\n        return register\n\n    def post(self, path):\n        def register(func):\n            self.routes[('POST', path)] = func\n            return func\n        return register\n\n    def handle(self, method, path, body=None):\n        func = self.routes.get((method, path))\n        if func is None:\n            if any(p == path for _, p in self.routes):\n                return 405, {'detail': 'Method Not Allowed'}\n            return 404, {'detail': 'Not Found'}\n        try:\n            result = func(body) if method == 'POST' else func()\n        except ValueError as e:\n            return 422, {'detail': str(e)}\n        return 200, result\n\napp = MiniApp()\nMODEL_VERSION = '1.3.0'\n\n# register the endpoints here\n"
   },
   {
    "title": "A registration decorator",
    "prompt": "<p>Let's repeat how a decorator works. Write the decorator factory <code>route(path)</code>: it registers the function in <code>ROUTES[path]</code> and returns a decorator that returns the <b>function itself</b>. Then register the function <code>ping()</code> with <code>@route('/ping')</code>; it must return <code>'pong'</code>.</p>",
    "hints": [
     "Two levels: <code>def route(path):</code>, inside it <code>def decorator(func):</code>, at the end <code>return decorator</code>.",
     "Inside the decorator: <code>ROUTES[path] = func</code> and <code>return func</code>."
    ],
    "check": {
     "tests": "assert ROUTES.get('/ping') is ping, '@route(\"/ping\") must register the function ping in ROUTES'\nassert ping() == 'pong', 'The decorator must return the function itself (return func)'\n@route('/x')\ndef _x():\n    return 1\nassert ROUTES['/x'] is _x and _x() == 1, 'route must work with any path'"
    }
   },
   {
    "title": "A currency conversion endpoint",
    "prompt": "<p>The <code>MiniApp</code> is ready. Add the endpoint <code>POST /convert</code>: take <code>tenge</code> from the body and return <code>{'usd': round(tenge / RATE, 2)}</code>. If <code>tenge</code> is missing or negative, raise <code>ValueError</code> (MiniApp turns it into 422).</p>",
    "hints": [
     "The POST function receives the body: <code>def convert(body):</code>.",
     "If the field is missing: <code>raise ValueError('tenge: міндетті өріс')</code>."
    ],
    "check": {
     "tests": "assert app.handle('POST', '/convert', {'tenge': 12345}) == (200, {'usd': 24.69}), '12345 ₸ → 24.69 $'\nassert app.handle('POST', '/convert', {'tenge': 0}) == (200, {'usd': 0.0}), '0 ₸ → 0.0'\nassert app.handle('POST', '/convert', {})[0] == 422, 'No tenge → 422'\nassert app.handle('POST', '/convert', {'tenge': -10})[0] == 422, 'A negative amount → 422'\nassert app.handle('GET', '/convert')[0] == 405, '/convert only POST'"
    },
    "starter": "class MiniApp:\n    \"\"\"FastAPI-ге ұқсас кішкене router: (method, path) → функция.\"\"\"\n    def __init__(self):\n        self.routes = {}\n\n    def get(self, path):\n        def register(func):\n            self.routes[('GET', path)] = func\n            return func\n        return register\n\n    def post(self, path):\n        def register(func):\n            self.routes[('POST', path)] = func\n            return func\n        return register\n\n    def handle(self, method, path, body=None):\n        func = self.routes.get((method, path))\n        if func is None:\n            if any(p == path for _, p in self.routes):\n                return 405, {'detail': 'Method Not Allowed'}\n            return 404, {'detail': 'Not Found'}\n        try:\n            result = func(body) if method == 'POST' else func()\n        except ValueError as e:\n            return 422, {'detail': str(e)}\n        return 200, result\n\napp = MiniApp()\nRATE = 500\n\n# write @app.post('/convert') here\n"
   },
   {
    "title": "Finding a path parameter",
    "prompt": "<p>Write <code>match_route(pattern, path)</code> to compare patterns like <code>/customers/{customer_id}</code> in FastAPI. If the number of parts is equal and each part either matches exactly or has the form <code>{атауы}</code>, return the dictionary of parameters (the values are text); otherwise return <code>None</code>. For example, <code>(\"/customers/{customer_id}\", \"/customers/42\")</code> → <code>{\"customer_id\": \"42\"}</code>.</p>",
    "hints": [
     "Split both by <code>strip('/').split('/')</code> and go through them in pairs with <code>zip</code>.",
     "A parameter part: <code>p.startswith('{') and p.endswith('}')</code>, its name: <code>p[1:-1]</code>."
    ],
    "check": {
     "tests": "assert match_route('/customers/{customer_id}', '/customers/42') == {'customer_id': '42'}, '(\"/customers/{customer_id}\", \"/customers/42\") → {\"customer_id\": \"42\"}'\nassert match_route('/cities/{city}/weather/{day}', '/cities/Алматы/weather/3') == {'city': 'Алматы', 'day': '3'}, 'Several parameters'\nassert match_route('/health', '/health') == {}, 'A matching path without parameters → an empty dictionary'\nassert match_route('/customers/{id}', '/orders/42') is None, 'A fixed part does not match → None'\nassert match_route('/customers/{id}', '/customers/42/history') is None, 'A different number of parts → None'"
    }
   },
   {
    "title": "HTTPException",
    "prompt": "<p>In FastAPI an endpoint can raise <code>HTTPException</code> and return any status. Write the error class <code>HTTPException(status_code, detail)</code> (it inherits from <code>Exception</code> and stores two attributes). Then write <code>call(func, *args)</code>: it calls <code>func(*args)</code>; on <code>HTTPException</code> → <code>(e.status_code, {'detail': e.detail})</code>; on <code>ValueError</code> → <code>(422, {'detail': str(e)})</code>; on success → <code>(200, нәтиже)</code>. The endpoint <code>get_city(name)</code> is ready, it uses your class.</p>",
    "hints": [
     "Inside <code>class HTTPException(Exception):</code>, <code>__init__(self, status_code, detail)</code> stores the two attributes.",
     "<code>call</code>: <code>try: return 200, func(*args)</code>, then two <code>except</code>."
    ],
    "check": {
     "tests": "_e = HTTPException(403, 'рұқсат жоқ')\nassert isinstance(_e, Exception) and _e.status_code == 403 and _e.detail == 'рұқсат жоқ', 'HTTPException must store status_code and detail'\nassert call(get_city, 'Алматы') == (200, {'city': 'Алматы', 'population': 2200000}), 'A successful call → 200'\nassert call(get_city, 'Орал') == (404, {'detail': 'Қала табылмады'}), 'HTTPException(404) → (404, {\"detail\": ...})'\ndef _bad(x):\n    raise ValueError('x: сан керек')\nassert call(_bad, 'a') == (422, {'detail': 'x: сан керек'}), 'ValueError → 422'"
    }
   },
   {
    "title": "A call-counting decorator",
    "prompt": "<p>For monitoring we want to know how many times each endpoint was called. Write the decorator <code>count_calls(func)</code>: it returns the function <code>wrapper(*args)</code>, which increases the counter <code>wrapper.calls</code> by 1 and returns the result <code>func(*args)</code>. At the start <code>wrapper.calls = 0</code>.</p>",
    "hints": [
     "The inner function <code>def wrapper(*args):</code> calls <code>func(*args)</code>.",
     "A function can also have an attribute: <code>wrapper.calls = 0</code>, and in the body <code>wrapper.calls += 1</code>."
    ],
    "check": {
     "tests": "@count_calls\ndef _sq(x):\n    return x * x\nassert _sq.calls == 0, 'At the start calls = 0'\nassert _sq(3) == 9 and _sq(4) == 16, 'The wrapper must return the result of the function'\nassert _sq.calls == 2, 'After two calls, calls = 2'\n@count_calls\ndef _one():\n    return 1\n_one()\nassert _one.calls == 1 and _sq.calls == 2, 'Each function must have its own counter'"
    }
   },
   {
    "title": "A router with path parameters",
    "prompt": "<p>Write the class <code>Router</code>, which supports path parameters. The decorator <code>get(pattern)</code> adds <code>('GET', pattern, func)</code> to the list <code>self.routes</code> and returns the function. The method <code>handle(method, path)</code>: for each route it checks the match with <code>match_route</code>; if it matches, it converts the numeric values with <code>int</code>, calls <code>func(**params)</code> and returns <code>(200, нәтиже)</code>; if the path matches but the method is different, it returns <code>(405, ...)</code>; if none matches, it returns <code>(404, ...)</code>. The function <code>match_route</code> is already ready.</p>",
    "hints": [
     "The decorator: <code>self.routes.append(('GET', pattern, func))</code>, then <code>return func</code>.",
     "Conversion: <code>{k: int(v) if v.isdigit() else v for k, v in params.items()}</code>, the call: <code>func(**params)</code>."
    ],
    "check": {
     "tests": "_r = Router()\n@_r.get('/customers/{customer_id}')\ndef _c(customer_id):\n    return {'id': customer_id}\n@_r.get('/cities/{city}/weather')\ndef _w(city):\n    return {'city': city}\n@_r.get('/health')\ndef _h():\n    return {'status': 'ok'}\nassert _c(5) == {'id': 5}, 'The decorator must return the function itsel'\nassert len(_r.routes) == 3, 'Each route must be added to the list routes'\nassert _r.handle('GET', '/customers/42') == (200, {'id': 42}), 'A numeric parameter must become an int: {\"id\": 42}'\nassert _r.handle('GET', '/cities/Алматы/weather') == (200, {'city': 'Алматы'}), 'A text parameter stays as it is'\nassert _r.handle('GET', '/health') == (200, {'status': 'ok'}), 'A route without parameters'\nassert _r.handle('POST', '/customers/42')[0] == 405, 'The path matches, the method is different → 405'\nassert _r.handle('GET', '/customers')[0] == 404 and _r.handle('GET', '/orders/1')[0] == 404, 'No matching route → 404'"
    }
   },
   {
    "title": "The whole churn API",
    "prompt": "<p>The <code>MiniApp</code> and the trained model <code>model</code> are ready. Add two endpoints: <code>GET /health</code> → <code>{'status': 'ok', 'model_version': MODEL_VERSION}</code>; <code>POST /predict</code> — in the body <code>tenure_months</code> and <code>support_calls</code> must be non-negative integers (otherwise an error with the field name: <code>ValueError</code> → 422); the result is <code>{'churn_probability': p (3 таңба), 'label': int(p ≥ 0.5)}</code>. The model must use only the columns <code>FEATURES</code> (extra keys are ignored).</p>",
    "hints": [
     "In the POST function first check <code>FEATURES</code>, and if there is an error, raise <code>raise ValueError(f'{f}: ...')</code>.",
     "The prediction: <code>pd.DataFrame([body])[FEATURES]</code>, <code>model.predict_proba(row)[0, 1]</code>."
    ],
    "check": {
     "tests": "assert app.handle('GET', '/health') == (200, {'status': 'ok', 'model_version': '2.0.0'}), 'GET /health → status and model_version'\n_s, _d = app.handle('POST', '/predict', {'tenure_months': 2, 'support_calls': 5, 'city': 'Алматы'})\n_p = float(model.predict_proba(pd.DataFrame([[2, 5]], columns=FEATURES))[0, 1])\nassert _s == 200 and _d == {'churn_probability': round(_p, 3), 'label': 1}, f'The result of POST /predict is wrong: {_d}'\nassert app.handle('POST', '/predict', {'tenure_months': 48, 'support_calls': 0})[1]['label'] == 0, 'A long-term customer gets label 0'\n_s, _d = app.handle('POST', '/predict', {'tenure_months': 3})\nassert _s == 422 and 'support_calls' in _d['detail'], 'No support_calls → 422, the field name is in detail'\nassert app.handle('POST', '/predict', {'tenure_months': -1, 'support_calls': 1})[0] == 422, 'A negative value → 422'\nassert app.handle('GET', '/predict')[0] == 405, '/predict only POST'"
    },
    "starter": "import pandas as pd\nfrom sklearn.linear_model import LogisticRegression\ndata = pd.DataFrame({\n    'tenure_months': [1, 2, 3, 5, 24, 36, 48, 12, 2, 60, 4, 30],\n    'support_calls': [5, 4, 6, 3, 0, 1, 0, 1, 5, 0, 4, 1],\n    'churned':       [1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0],\n})\nFEATURES = ['tenure_months', 'support_calls']\nclass MiniApp:\n    \"\"\"FastAPI-ге ұқсас кішкене router: (method, path) → функция.\"\"\"\n    def __init__(self):\n        self.routes = {}\n\n    def get(self, path):\n        def register(func):\n            self.routes[('GET', path)] = func\n            return func\n        return register\n\n    def post(self, path):\n        def register(func):\n            self.routes[('POST', path)] = func\n            return func\n        return register\n\n    def handle(self, method, path, body=None):\n        func = self.routes.get((method, path))\n        if func is None:\n            if any(p == path for _, p in self.routes):\n                return 405, {'detail': 'Method Not Allowed'}\n            return 404, {'detail': 'Not Found'}\n        try:\n            result = func(body) if method == 'POST' else func()\n        except ValueError as e:\n            return 422, {'detail': str(e)}\n        return 200, result\n\napp = MiniApp()\nMODEL_VERSION = '2.0.0'\nmodel = LogisticRegression().fit(data[FEATURES], data['churned'])\n\n# register the endpoints here\n"
   }
  ]
 },
 "dep-4": {
  "pr": [
   {
    "title": "A dataclass schema",
    "prompt": "<p>Using <code>@dataclass</code>, write the schema <code>Order</code>: the fields <code>city: str</code>, <code>amount: int</code>, <code>qty: int = 1</code> (the default value is 1). Then create <code>o = Order('Алматы', 12500)</code>.</p>",
    "hints": [
     "Above the class <code>@dataclass</code>, inside it fields with hints: <code>city: str</code>.",
     "A field with a default value comes last: <code>qty: int = 1</code>."
    ],
    "check": {
     "tests": "from dataclasses import is_dataclass as _isdc, asdict as _ad\nassert _isdc(Order), 'Order must be a @dataclass'\nassert Order.__annotations__ == {'city': str, 'amount': int, 'qty': int}, 'Fields: city: str, amount: int, qty: int'\nassert _ad(o) == {'city': 'Алматы', 'amount': 12500, 'qty': 1}, 'o = Order(\"Алматы\", 12500), qty defaults to 1'\nassert Order('Астана', 100, 3).qty == 3, 'If qty is passed, it must be kept'"
    }
   },
   {
    "title": "Turning text into a number",
    "prompt": "<p>Data from the weather station: to the dataclass <code>Reading(station, temp)</code> add <code>__post_init__</code>: it must convert <code>temp</code> with <code>float()</code> (like coercion in Pydantic: <code>\"-12.5\"</code> → <code>-12.5</code>), and remove the spaces at the ends of <code>station</code>.</p>",
    "hints": [
     "<code>def __post_init__(self):</code> is called right after the object is created.",
     "<code>self.temp = float(self.temp)</code>, <code>self.station = self.station.strip()</code>."
    ],
    "check": {
     "tests": "_r = Reading(' Алматы-1 ', '-12.5')\nassert _r.temp == -12.5 and isinstance(_r.temp, float), 'The text \"-12.5\" must become a float'\nassert _r.station == 'Алматы-1', 'The spaces at the edges of station must be removed'\nassert Reading('Астана', 3).temp == 3.0 and isinstance(Reading('Астана', 3).temp, float), 'An int must also become a float'\ntry:\n    Reading('Орал', 'суық')\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Сан емес мәтін ValueError беруі керек')"
    }
   },
   {
    "title": "Allowed values",
    "prompt": "<p>Like <code>Literal</code> in Pydantic: add <code>__post_init__</code> to the dataclass <code>Ticket(route, seat_class)</code>. If <code>seat_class</code> is not in <code>SEAT_CLASSES</code>, raise <code>ValueError</code> with a message that contains the word <code>seat_class</code>.</p>",
    "hints": [
     "<code>if self.seat_class not in SEAT_CLASSES: raise ValueError('seat_class: ...')</code>.",
     "The check is written inside <code>__post_init__</code>."
    ],
    "check": {
     "tests": "assert Ticket('Алматы–Астана', 'econom').seat_class == 'econom', 'A correct value must be accepted'\nassert Ticket('Астана–Шымкент', 'business').route == 'Астана–Шымкент', 'route must be kept'\ntry:\n    Ticket('Алматы–Астана', 'first')\nexcept ValueError as _e:\n    assert 'seat_class' in str(_e), 'The message must contain the word seat_class'\nelse:\n    raise AssertionError('seat_class=\"first\" ValueError беруі керек')"
    }
   },
   {
    "title": "A schema with constraints",
    "prompt": "<p>Add to the dataclass <code>Flat(area, rooms, price)</code> the method <code>__post_init__</code> (like the constraints <code>Field</code> in Pydantic): <code>area</code> → <code>float</code>, must be <code>&gt; 0</code>; <code>rooms</code> → <code>int</code>, 1 ≤ rooms ≤ 10; <code>price</code> → <code>int</code>, ≥ 0. Convert with <code>float()</code>/<code>int()</code>. If a constraint is broken, raise <code>ValueError</code>, with a message that starts with the field name.</p>",
    "hints": [
     "First convert: <code>self.area = float(self.area)</code>, and so on.",
     "Then one <code>if ...: raise ValueError('өріс: ...')</code> for each constraint."
    ],
    "check": {
     "tests": "_f = Flat('54.5', '2', '38000000')\nassert _f.area == 54.5 and _f.rooms == 2 and _f.price == 38000000, 'The texts must be converted to numbers'\nassert isinstance(_f.area, float) and isinstance(_f.rooms, int) and isinstance(_f.price, int), 'Types: area float, rooms int, price int'\nfor _args, _field in [((0, 2, 100), 'area'), ((40, 0, 100), 'rooms'), ((40, 11, 100), 'rooms'), ((40, 2, -1), 'price')]:\n    try:\n        Flat(*_args)\n    except ValueError as _e:\n        assert str(_e).startswith(_field), f'The message must start with the field name ({_field}), you have: {_e}'\n    else:\n        raise AssertionError(f'Flat{_args} ValueError лақтыруы керек')\nassert Flat(10, 10, 0).rooms == 10, 'The boundary values (rooms=10, price=0) are correct'"
    }
   },
   {
    "title": "Collecting all errors",
    "prompt": "<p>Pydantic does not stop at the first error and shows all of them at once. Write <code>validate(data, schema)</code>: <code>schema</code> is <code>{өріс: (түрлендіргіш, тексеру функциясы)}</code>. For each field: if it is missing → an error; if the converter raises <code>ValueError</code> → an error; if the check returns <code>False</code> → an error. It must return <code>(clean, errors)</code>: <code>clean</code> is the dictionary of successfully converted fields, <code>errors</code> is the names of the wrong fields (in the schema order).</p>",
    "hints": [
     "For each field check whether it is there; then <code>try: conv(...)</code> → <code>ok(value)</code>; on any error <code>errors.append(field)</code> and <code>continue</code>.",
     "The loop must not stop at the first error."
    ],
    "check": {
     "tests": "assert validate({'tenure_months': '12', 'monthly_fee': '4990', 'city': 'Алматы'}, SCHEMA) == ({'tenure_months': 12, 'monthly_fee': 4990.0, 'city': 'Алматы'}, []), 'Correct data: everything is converted, no errors'\n_c, _e = validate({'tenure_months': 'он', 'monthly_fee': '0', 'city': 'Париж'}, SCHEMA)\nassert _e == ['tenure_months', 'monthly_fee', 'city'] and _c == {}, f'All three fields are wrong (conversion, constraint, allowed values), you have {_e}'\n_c, _e = validate({'tenure_months': -1, 'city': 'Астана'}, SCHEMA)\nassert _e == ['tenure_months', 'monthly_fee'] and _c == {'city': 'Астана'}, 'A negative tenure and a missing monthly_fee; city is correct'"
    }
   },
   {
    "title": "A response schema",
    "prompt": "<p>In FastAPI <code>response_model</code> also checks the output data. Add <code>__post_init__</code> to the dataclass <code>PredictionOut(probability, label, model_version)</code>: <code>probability</code> must be in the range 0..1, <code>label</code> must be 0 or 1, <code>model_version</code> must be non-empty text, otherwise raise <code>ValueError</code>. Then write <code>to_response(p, version, threshold=0.5)</code>: it returns <code>asdict(PredictionOut(round(p, 3), int(p &gt;= threshold), version))</code>.</p>",
    "hints": [
     "The three checks in the form <code>if ...: raise ValueError(...)</code> go inside <code>__post_init__</code>.",
     "<code>to_response</code> creates the schema and returns <code>asdict(...)</code>; if there is an error, it propagates upward."
    ],
    "check": {
     "tests": "assert to_response(0.8123, '1.2.0') == {'probability': 0.812, 'label': 1, 'model_version': '1.2.0'}, 'The result of to_response(0.8123, \"1.2.0\") is wrong'\nassert to_response(0.3, 'v1', threshold=0.25)['label'] == 1, 'The threshold must be taken into account'\nfor _args in [(1.7, 1, 'v'), (0.5, 2, 'v'), (0.5, 1, ''), (-0.1, 0, 'v')]:\n    try:\n        PredictionOut(*_args)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f'PredictionOut{_args} ValueError лақтыруы керек')\ntry:\n    to_response(1.5, '1.0.0')\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Модель 1.5 қайтарса, шығыс схемасы ValueError беруі керек')"
    }
   },
   {
    "title": "A nested schema",
    "prompt": "<p>An order has a list of items. <code>Item(name, price, qty=1)</code>: <code>price</code> and <code>qty</code> are converted to <code>int</code>; <code>price &gt;= 0</code> and <code>qty &gt;= 1</code> must hold, otherwise <code>ValueError</code> is raised. <code>Order(city, items)</code>: inside <code>__post_init__</code> each dictionary from the list <code>items</code> is converted to <code>Item(**d)</code> (if there is an error, it propagates upward); if there are no items, <code>ValueError</code> is raised. <code>Order.total()</code> is the sum of <code>price * qty</code>.</p>",
    "hints": [
     "In <code>Order.__post_init__</code> write <code>self.items = [Item(**d) for d in self.items]</code>: the dictionary keys become the field names.",
     "The method <code>total</code>: <code>sum(i.price * i.qty for i in self.items)</code>."
    ],
    "check": {
     "tests": "_o = Order('Алматы', [{'name': 'Нан', 'price': '250', 'qty': '2'}, {'name': 'Сүт', 'price': 1290}])\nassert all(isinstance(i, Item) for i in _o.items), 'The dictionaries in items must become Item objects'\nassert _o.items[0].price == 250 and _o.items[0].qty == 2 and _o.items[1].qty == 1, 'The fields of Item must be converted to int, qty defaults to 1'\nassert _o.total() == 1790, 'total() = 250*2 + 1290 = 1790'\nfor _items in [[], [{'name': 'Шай', 'price': -5}], [{'name': 'Шай', 'price': 500, 'qty': 0}], [{'name': 'Шай', 'price': 'тегін'}]]:\n    try:\n        Order('Астана', _items)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f'Order(\"Астана\", {_items}) ValueError лақтыруы керек')\ntry:\n    Order('Астана', [{'name': 'Шай', 'price': 500, 'color': 'жасыл'}])\nexcept TypeError:\n    pass\nelse:\n    raise AssertionError('Артық өріс TypeError беруі керек (Item(**d))')"
    }
   },
   {
    "title": "422 as in FastAPI",
    "prompt": "<p>When there is an error, FastAPI returns the list of errors for all the fields. Write <code>handle_flat(body)</code>. Rules: <code>area</code> is a number (int/float or text that turns into a number) &gt; 0; <code>rooms</code> is an integer (or text with an integer) 1–10; <code>price</code> is an integer (or its text) ≥ 0. If there is an error, return <code>(422, {'detail': [{'loc': өріс, 'msg': хабар}, ...]})</code> — all the wrong fields in order (area, rooms, price). If everything is correct, return <code>(200, {'area': ..., 'rooms': ..., 'price': ..., 'price_per_m2': round(price / area)})</code>.</p>",
    "hints": [
     "Put the rules into a list: <code>(өріс, түрлендіргіш, тексеру, хабар)</code>, then go through it with one loop.",
     "If there is an error: <code>detail.append({'loc': field, 'msg': ...})</code> and <code>continue</code> — do not stop."
    ],
    "check": {
     "tests": "assert handle_flat({'area': '54', 'rooms': '2', 'price': 37800000}) == (200, {'area': 54.0, 'rooms': 2, 'price': 37800000, 'price_per_m2': 700000}), 'A correct body → 200, the values are converted, price_per_m2 = 700000'\n_s, _d = handle_flat({'area': 0, 'rooms': 'көп'})\nassert _s == 422 and [x['loc'] for x in _d['detail']] == ['area', 'rooms', 'price'], f'Three errors (area=0, rooms is text, price is missing), in order. You have {_d}'\nassert all(isinstance(x.get('msg'), str) and x['msg'] for x in _d['detail']), 'Each error must have a msg message'\n_s, _d = handle_flat({'area': 40, 'rooms': 11, 'price': '-5'})\nassert _s == 422 and [x['loc'] for x in _d['detail']] == ['rooms', 'price'], 'rooms > 10 and a negative price'\nassert handle_flat({'area': 40, 'rooms': None, 'price': 1})[0] == 422, 'None is an error too (TypeError must be caught)'"
    }
   }
  ]
 },
 "dep-5": {
  "pr": [
   {
    "title": "Port mapping",
    "prompt": "<p><code>docker run -p 8080:8000</code> connects host port 8080 to container port 8000. Write the function <code>parse_port(mapping)</code>: <code>\"8080:8000\"</code> → <code>(8080, 8000)</code>, that is <code>(хост порты, container порты)</code>, and both numbers must be <code>int</code>.</p>",
    "hints": [
     "<code>host, container = mapping.split(':')</code>.",
     "Convert both with <code>int()</code>."
    ],
    "check": {
     "tests": "assert parse_port('8080:8000') == (8080, 8000), 'parse_port(\"8080:8000\") must return (8080, 8000)'\nassert parse_port('80:8000') == (80, 8000), 'The first number is the host port'\nassert all(isinstance(x, int) for x in parse_port('5000:5000')), 'Both numbers must be int'"
    }
   },
   {
    "title": "Dockerfile instructions",
    "prompt": "<p>Write the function <code>instructions(dockerfile)</code>: it returns, in order, a list of the names of the instructions in the Dockerfile text (the first word of the line, in uppercase). Empty lines and comments that start with <code>#</code> are ignored.</p>",
    "hints": [
     "Clean each line with <code>strip()</code>; if the line is empty or starts with <code>#</code>, do <code>continue</code>.",
     "The first word: <code>line.split()[0].upper()</code>."
    ],
    "check": {
     "tests": "assert instructions(dockerfile) == ['FROM', 'WORKDIR', 'COPY', 'RUN', 'COPY', 'EXPOSE', 'CMD'], f'The list of instructions is wrong: {instructions(dockerfile)}'\nassert instructions('# база\\nfrom python:3.12\\n\\n  run pip install x\\n') == ['FROM', 'RUN'], 'Comments and empty lines are ignored, the name is in uppercase'"
    }
   },
   {
    "title": "An image tag",
    "prompt": "<p>Write the function <code>parse_image(ref)</code>: <code>\"churn-api:1.3.0\"</code> → <code>(\"churn-api\", \"1.3.0\")</code>. If the tag is not written, Docker considers it to be <code>latest</code>: <code>\"churn-api\"</code> → <code>(\"churn-api\", \"latest\")</code>.</p>",
    "hints": [
     "If <code>if ':' in ref:</code>, split into two parts.",
     "Otherwise <code>return ref, 'latest'</code>."
    ],
    "check": {
     "tests": "assert parse_image('churn-api:1.3.0') == ('churn-api', '1.3.0'), '\"churn-api:1.3.0\" → (\"churn-api\", \"1.3.0\")'\nassert parse_image('churn-api') == ('churn-api', 'latest'), 'If there is no tag, \"latest\"'\nassert parse_image('python:3.12-slim') == ('python', '3.12-slim'), '\"python:3.12-slim\" → (\"python\", \"3.12-slim\")'"
    }
   },
   {
    "title": "The docker run command",
    "prompt": "<p>Write the function <code>run_command(image, host_port, container_port=8000, env=None)</code>: it returns the text of the command <code>docker run</code>: first <code>docker run -p ХОСТ:CONTAINER</code>, then for each variable in the dictionary <code>env</code> — <code>-e КІЛТ=МӘН</code> (the keys in alphabetical order), and at the end the image. For example, <code>run_command(\"churn-api:1.3.0\", 8080, env={\"THRESHOLD\": \"0.35\"})</code> → <code>\"docker run -p 8080:8000 -e THRESHOLD=0.35 churn-api:1.3.0\"</code>.</p>",
    "hints": [
     "Collect the parts into a list, and at the end run <code>' '.join(parts)</code>.",
     "<code>env</code> can be <code>None</code>: then use <code>sorted(env or {})</code>."
    ],
    "check": {
     "tests": "assert run_command('churn-api:1.3.0', 8080) == 'docker run -p 8080:8000 churn-api:1.3.0', 'If there is no env, only -p and image'\nassert run_command('churn-api:1.3.0', 8080, env={'THRESHOLD': '0.35'}) == 'docker run -p 8080:8000 -e THRESHOLD=0.35 churn-api:1.3.0', '-e THRESHOLD=0.35 must be added'\nassert run_command('api:2', 80, 5000, {'PORT': '5000', 'DEBUG': 'false'}) == 'docker run -p 80:5000 -e DEBUG=false -e PORT=5000 api:2', 'The variables in alphabetical order, container_port must be taken into account'"
    }
   },
   {
    "title": "Problems in a Dockerfile",
    "prompt": "<p>Write the function <code>check_dockerfile(text)</code>: it returns the list of problems (in this order): if there is no <code>EXPOSE</code> instruction — <code>'no_expose'</code>; if the last instruction is not <code>CMD</code> — <code>'cmd_not_last'</code>; if the <code>CMD</code> line has no <code>0.0.0.0</code> — <code>'bad_host'</code> (even if CMD is missing altogether); if <code>COPY . .</code> comes before the line <code>pip install</code> — <code>'bad_cache'</code>. Empty lines and comments are ignored.</p>",
    "hints": [
     "First make a list of the lines without comments and their instruction names.",
     "The index of the line: <code>next((i for i, l in enumerate(lines) if ...), None)</code>."
    ],
    "check": {
     "tests": "assert check_dockerfile(dockerfile) == [], 'A correct Dockerfile has no problems'\n_bad = \"\"\"FROM python:3.12-slim\nWORKDIR /app\nCOPY . .\nRUN pip install -r requirements.txt\nCMD [\"uvicorn\", \"main:app\", \"--host\", \"127.0.0.1\"]\n\"\"\"\nassert check_dockerfile(_bad) == ['no_expose', 'bad_host', 'bad_cache'], f'Expected no_expose, bad_host, bad_cache, you have {check_dockerfile(_bad)}'\n_bad2 = \"\"\"FROM python:3.12-slim\n# порт\nCMD [\"uvicorn\", \"main:app\", \"--host\", \"0.0.0.0\"]\nEXPOSE 8000\n\"\"\"\nassert check_dockerfile(_bad2) == ['cmd_not_last'], 'CMD is not the last'\nassert check_dockerfile('FROM python:3.12\\nEXPOSE 8000\\n') == ['cmd_not_last', 'bad_host'], 'No CMD at all: cmd_not_last and bad_host'"
    }
   },
   {
    "title": "Which layer is rebuilt",
    "prompt": "<p>Docker caches each instruction as a layer. Write the function <code>first_rebuilt(lines, changed)</code>: <code>lines</code> is the Dockerfile instructions (a list), <code>changed</code> is the set of changed files. Return the index of the first <code>COPY</code> line whose source contains a changed file: <code>COPY . .</code> includes any file, <code>COPY requirements.txt .</code> only <code>requirements.txt</code>. If there is no such line, return <code>None</code> (everything comes from the cache).</p>",
    "hints": [
     "The source of a COPY line is the second word: <code>line.split()[1]</code>.",
     "If <code>'.'</code>, any change is enough; otherwise <code>source in changed</code>."
    ],
    "check": {
     "tests": "assert first_rebuilt(lines, {'main.py'}) == 4, 'If only the code changes, COPY . . (line 4) is rebuilt, pip install comes from the cache'\nassert first_rebuilt(lines, {'requirements.txt'}) == 2, 'If requirements.txt changes, everything from line 2 onwards is rebuilt'\nassert first_rebuilt(lines, set()) is None, 'If nothing changes, None'\n_bad = ['FROM python:3.12-slim', 'COPY . .', 'RUN pip install -r requirements.txt']\nassert first_rebuilt(_bad, {'main.py'}) == 1, 'If COPY . . comes first, pip install runs again on any change'"
    }
   },
   {
    "title": "A cache map",
    "prompt": "<p>Write <code>cache_plan(lines, changed)</code>: for each instruction it returns a list of <code>'cached'</code> or <code>'rebuild'</code>. Rule: if one layer is rebuilt, then <b>all</b> the layers after it are rebuilt too. A <code>COPY</code> line is rebuilt if its source contains a changed file (<code>.</code> means any file, otherwise the list of sources: <code>COPY a.py b.py ./</code>; the last word is the target). The other instructions are rebuilt only if the previous layer is rebuilt. Then <code>rebuilt_count</code> is the number of layers that are rebuilt for <code>lines</code> when <code>{'main.py'}</code> changes.</p>",
    "hints": [
     "Keep a variable that marks that the cache is “broken”: after <code>broken = True</code> everything gets <code>rebuild</code>.",
     "The COPY sources: <code>line.split()[1:-1]</code> (the first is COPY, the last is the target)."
    ],
    "check": {
     "tests": "assert cache_plan(lines, {'main.py'}) == ['cached'] * 5 + ['rebuild'] * 3, 'If main.py changes, only COPY . . and the ones after it are rebuilt'\nassert cache_plan(lines, {'config.py'}) == ['cached'] * 4 + ['rebuild'] * 4, 'config.py is in the COPY on line 4'\nassert cache_plan(lines, {'requirements.txt'}) == ['cached'] * 2 + ['rebuild'] * 6, 'If requirements.txt changes, pip install runs again too'\nassert cache_plan(lines, set()) == ['cached'] * 8, 'No changes — everything from the cache'\nassert rebuilt_count == 3, f'rebuilt_count must be 3, you have {rebuilt_count}'"
    }
   },
   {
    "title": "A Dockerfile generator",
    "prompt": "<p>Write the function <code>make_dockerfile(python='3.12', port=8000, app='main:app')</code>: it returns the correct Dockerfile text: <code>FROM python:&lt;python&gt;-slim</code>, <code>WORKDIR /app</code>, <code>COPY requirements.txt .</code>, <code>RUN pip install --no-cache-dir -r requirements.txt</code>, <code>COPY . .</code>, <code>EXPOSE &lt;port&gt;</code>, and at the end <code>CMD</code> starts uvicorn for <code>&lt;app&gt;</code> on the host <code>0.0.0.0</code> and the port <code>&lt;port&gt;</code> in JSON form (<code>CMD [\"uvicorn\", \"main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]</code>). Each line must end with <code>\\n</code>.</p>",
    "hints": [
     "Collect the lines into a list and insert the parameters with an f-string.",
     "The JSON list for CMD is created with <code>json.dumps([...])</code>: with double quotes."
    ],
    "check": {
     "tests": "import json as _j\n_d = make_dockerfile()\nassert _d.endswith('\\n'), 'Each line must end with \\\\n'\n_L = _d.strip().splitlines()\nassert _L[0] == 'FROM python:3.12-slim', 'The first line: FROM python:3.12-slim'\nassert _L[1:5] == ['WORKDIR /app', 'COPY requirements.txt .', 'RUN pip install --no-cache-dir -r requirements.txt', 'COPY . .'], 'The order: WORKDIR → COPY requirements.txt → RUN pip install → COPY . .'\nassert _L[5] == 'EXPOSE 8000', 'EXPOSE 8000'\nassert _L[6].startswith('CMD ') and _j.loads(_L[6][4:]) == ['uvicorn', 'main:app', '--host', '0.0.0.0', '--port', '8000'], 'The JSON list for CMD is wrong'\n_L2 = make_dockerfile('3.11', 10000, 'api:app').strip().splitlines()\nassert _L2[0] == 'FROM python:3.11-slim' and _L2[5] == 'EXPOSE 10000', 'The parameters python and port must be taken into account'\nassert _j.loads(_L2[6][4:]) == ['uvicorn', 'api:app', '--host', '0.0.0.0', '--port', '10000'], 'The parameters app and port must be in CMD'"
    }
   }
  ]
 },
 "dep-6": {
  "pr": [
   {
    "title": "Text to bool",
    "prompt": "<p>An environment variable is always text, and <code>bool('false')</code> → <code>True</code>! Write the function <code>parse_bool(text)</code>: <code>'1'</code>, <code>'true'</code>, <code>'yes'</code> (any case, spaces at the ends are ignored) → <code>True</code>, everything else and <code>None</code> → <code>False</code>.</p>",
    "hints": [
     "<code>text.strip().lower() in ('1', 'true', 'yes')</code>.",
     "Check <code>None</code> separately: it has no method <code>.strip()</code>."
    ],
    "check": {
     "tests": "assert parse_bool('TRUE') is True and parse_bool(' yes ') is True and parse_bool('1') is True, 'TRUE, yes, 1 → True'\nassert parse_bool('false') is False and parse_bool('0') is False and parse_bool('') is False, 'false, 0, an empty string → False'\nassert parse_bool(None) is False, 'None → False'"
    }
   },
   {
    "title": "Reading with a default value",
    "prompt": "<p>Write the function <code>get_int(env, key, default)</code>: it reads <code>key</code> from the dictionary <code>env</code> (whose values are text), converts it to <code>int</code>; if the key is missing, it returns <code>default</code>. For example, <code>get_int({'PORT': '10000'}, 'PORT', 8000)</code> → <code>10000</code>.</p>",
    "hints": [
     "If the key is missing: <code>return default</code>.",
     "If the key is there, convert the text to <code>int(env[key])</code>."
    ],
    "check": {
     "tests": "assert get_int({'PORT': '10000'}, 'PORT', 8000) == 10000, 'get_int({\"PORT\": \"10000\"}, \"PORT\", 8000) must return 10000 (int)'\nassert isinstance(get_int({'PORT': '10000'}, 'PORT', 8000), int), 'Convert the text to int'\nassert get_int({}, 'WORKERS', 2) == 2, 'If the key is missing, default'"
    }
   },
   {
    "title": "Parsing an .env line",
    "prompt": "<p>Write the function <code>parse_env_line(line)</code>: <code>\"DB_HOST=localhost\"</code> → <code>(\"DB_HOST\", \"localhost\")</code>. Split only at the <b>first</b> <code>=</code> (the value may also contain <code>=</code>: <code>\"DB_URL=postgres://u:p@h/db?ssl=true\"</code>), and remove the spaces at the ends of the key and the value.</p>",
    "hints": [
     "<code>line.partition('=')</code> splits into three parts only at the first <code>=</code>.",
     "Or <code>line.split('=', 1)</code>."
    ],
    "check": {
     "tests": "assert parse_env_line('DB_HOST=localhost') == ('DB_HOST', 'localhost'), '\"DB_HOST=localhost\" → (\"DB_HOST\", \"localhost\")'\nassert parse_env_line('DB_URL=postgres://u:p@h/db?ssl=true') == ('DB_URL', 'postgres://u:p@h/db?ssl=true'), 'Split only at the first ='\nassert parse_env_line(' PORT = 8000 ') == ('PORT', '8000'), 'Remove the spaces at the ends'"
    }
   },
   {
    "title": "Reading an .env file",
    "prompt": "<p>Write the function <code>parse_env(text)</code> in the style of python-dotenv: it returns a dictionary from the text of the <code>.env</code> file. Empty lines and comments that start with <code>#</code> are ignored; the key and the value are split at the first <code>=</code>; if the value is in quotes (<code>\"...\"</code> or <code>'...'</code>), the quotes are removed.</p>",
    "hints": [
     "Clean each line with <code>strip()</code>; if it is empty or starts with <code>#</code>, skip it; split with <code>partition('=')</code>.",
     "Quotes: if <code>value[0] == value[-1] and value[0] in '\"\\''</code>, then <code>value[1:-1]</code>."
    ],
    "check": {
     "tests": "_e = parse_env(env_text)\nassert _e == {'MODEL_PATH': 'models/churn_v1.2.0.joblib', 'THRESHOLD': '0.35', 'DB_PASSWORD': 's3cr3t==', 'GREETING': 'Сәлем, әлем'}, f'The result is wrong: {_e}'\nassert parse_env('# тек түсініктеме\\n\\n') == {}, 'Comments and empty lines are ignored'\nassert parse_env('EMPTY=\\n') == {'EMPTY': ''}, 'An empty value is an empty string'"
    }
   },
   {
    "title": "Required variables",
    "prompt": "<p>If the server has no required variable, it must stop at once with a clear error. Write the function <code>require(env, names)</code>: find <b>all</b> the missing or empty (<code>\"\"</code>) variables from the list <code>names</code>, name them in one message and raise <code>RuntimeError</code> (each name must be in the message); if all are there, return the dictionary of only these variables.</p>",
    "hints": [
     "First collect the missing ones: <code>[n for n in names if not env.get(n)]</code>.",
     "Add all the names to the message: <code>', '.join(missing)</code>."
    ],
    "check": {
     "tests": "assert require({'MODEL_PATH': 'm.joblib', 'PORT': '8000', 'HOME': '/root'}, ['MODEL_PATH', 'PORT']) == {'MODEL_PATH': 'm.joblib', 'PORT': '8000'}, 'Only the requested variables must be returned'\ntry:\n    require({'PORT': '8000', 'DB_URL': ''}, ['MODEL_PATH', 'PORT', 'DB_URL'])\nexcept RuntimeError as _e:\n    assert 'MODEL_PATH' in str(_e) and 'DB_URL' in str(_e), 'Every missing variable must be named in the message (an empty value also counts as missing)'\n    assert 'PORT' not in str(_e).replace('MODEL_PATH', ''), 'An existing variable must not be named in the message'\nelse:\n    raise AssertionError('Айнымалы жоқ болса RuntimeError күтілді')\nassert require({}, []) == {}, 'If nothing is requested, an empty dictionary'"
    }
   },
   {
    "title": "Secrets in code",
    "prompt": "<p>In a code review we look for secrets written directly in the code. Write the function <code>find_secrets(code)</code>: it returns the numbers of the lines (from 1) of the form <code>АТАУ = '...'</code> or <code>АТАУ = \"...\"</code>, where the name (ignoring case) contains <code>KEY</code>, <code>SECRET</code>, <code>PASSWORD</code> or <code>TOKEN</code>, and the value is text in quotes. Reading through <code>os.environ</code> or <code>os.getenv</code> is correct, it is not a secret.</p>",
    "hints": [
     "Go through the lines with their numbers: <code>for n, line in enumerate(code.splitlines(), start=1):</code>.",
     "If the value starts with a quote, it is a text literal: <code>value.strip()[:1] in ('\"', \"'\")</code>."
    ],
    "check": {
     "tests": "assert find_secrets(code) == [2, 5], f'The secrets are on lines 2 and 5, you have {find_secrets(code)}'\nassert find_secrets(\"x = 1\\nAUTH_TOKEN = 'abc'\\n\") == [2], 'AUTH_TOKEN = \"abc\" is a secret'\nassert find_secrets(\"API_KEY = os.environ['API_KEY']\\n\") == [], 'Reading through os.environ is not a secret'"
    }
   },
   {
    "title": "Config by environment",
    "prompt": "<p>Write the function <code>load_settings(env)</code>. <code>APP_ENV</code> is <code>dev</code>, <code>staging</code> or <code>production</code> (the default is <code>dev</code>); any other value → <code>RuntimeError</code>. It returns: <code>{'env', 'debug', 'log_level', 'port', 'db_url'}</code>. If <code>DEBUG</code> is not set: in dev it is <code>True</code>, otherwise <code>False</code> (if set to 1/true/yes → True). If <code>LOG_LEVEL</code> is not set: in dev it is <code>'DEBUG'</code>, otherwise <code>'INFO'</code> (convert to uppercase). <code>PORT</code> is converted to int, the default is 8000. <code>DB_URL</code> is required in production (if it is missing, the message must contain DB_URL and <code>RuntimeError</code>); in other environments the default is <code>'sqlite:///dev.db'</code>. In production, even if <code>debug</code> is True, <code>RuntimeError</code> is raised.</p>",
    "hints": [
     "The default values depend on the environment: <code>is_dev = app_env == 'dev'</code>, then <code>debug = ... if 'DEBUG' in env else is_dev</code>.",
     "Do the production checks at the end: whether DB_URL is missing, whether debug is on."
    ],
    "check": {
     "tests": "assert load_settings({}) == {'env': 'dev', 'debug': True, 'log_level': 'DEBUG', 'port': 8000, 'db_url': 'sqlite:///dev.db'}, f'The default dev values are wrong: {load_settings({})}'\nassert load_settings({'APP_ENV': 'staging', 'PORT': '9000'}) == {'env': 'staging', 'debug': False, 'log_level': 'INFO', 'port': 9000, 'db_url': 'sqlite:///dev.db'}, 'staging: debug False, log_level INFO, PORT is an int'\n_p = load_settings({'APP_ENV': 'production', 'DB_URL': 'postgres://db/churn', 'LOG_LEVEL': 'warning'})\nassert _p['debug'] is False and _p['log_level'] == 'WARNING' and _p['db_url'] == 'postgres://db/churn', 'production: LOG_LEVEL in uppercase, DB_URL is kept'\nassert load_settings({'DEBUG': 'false'})['debug'] is False, 'If DEBUG is set, its value is used'\nfor _env, _w in [({'APP_ENV': 'prod'}, 'APP_ENV'), ({'APP_ENV': 'production'}, 'DB_URL'), ({'APP_ENV': 'production', 'DB_URL': 'x', 'DEBUG': 'true'}, 'DEBUG')]:\n    try:\n        load_settings(_env)\n    except RuntimeError as _e:\n        assert _w in str(_e), f'{_env}: the message must name {_w}'\n    else:\n        raise AssertionError(f'{_env} үшін RuntimeError күтілді')"
    }
   },
   {
    "title": "Making .env.example",
    "prompt": "<p>A secret-free template <code>.env.example</code> goes into the repository. Write the function <code>make_example(env_text)</code>: it makes the template text from the text of <code>.env</code>. Comments and empty lines are kept as they are; on each line of the form <code>КІЛТ=МӘН</code>, if the key (ignoring case) contains <code>KEY</code>, <code>SECRET</code>, <code>PASSWORD</code> or <code>TOKEN</code>, the line is written as <code>КІЛТ=</code> (without the value), otherwise the line does not change. The order of the lines is kept, and each line ends with <code>\\n</code>.</p>",
    "hints": [
     "Go through each line and change only the lines of the form <code>КІЛТ=МӘН</code>; keep a comment and an empty line as they are.",
     "The key: <code>line.partition('=')[0].strip()</code>; if it is a secret, then <code>key + '='</code>."
    ],
    "check": {
     "tests": "_x = make_example(env_text)\nassert _x == '# Churn API\\nMODEL_PATH=models/churn_v1.2.0.joblib\\nDB_PASSWORD=\\n\\nopenai_api_key=\\nTHRESHOLD=0.35\\n', f'The result is wrong:\\n{_x}'\nassert 's3cr3t' not in _x and 'sk-abc123' not in _x, 'Secret values must not be in the template'\nassert make_example('GITHUB_TOKEN=ghp_x\\n# PASSWORD=ескі\\n') == 'GITHUB_TOKEN=\\n# PASSWORD=ескі\\n', 'The comment does not change, TOKEN is hidden'"
    }
   }
  ]
 },
 "dep-7": {
  "pr": [
   {
    "title": "Uptime percentage",
    "prompt": "<p>Every minute the platform sent a request to <code>/health</code> and wrote the status codes into the list <code>checks</code>. Write the function <code>uptime(checks)</code>: it returns the percentage of checks with status 200, rounded to 2 decimal places. If the list is empty, <code>100.0</code>.</p>",
    "hints": [
     "<code>sum(1 for s in checks if s == 200)</code> is the number of successful checks.",
     "The percentage: <code>ok / len(checks) * 100</code>, then <code>round(..., 2)</code>."
    ],
    "check": {
     "tests": "assert uptime([200, 200, 503, 200]) == 75.0, 'uptime([200, 200, 503, 200]) must return 75.0'\nassert uptime([200] * 2 + [500]) == 66.67, 'Round the result to 2 decimal places'\nassert uptime([]) == 100.0, 'For an empty list, 100.0'"
    }
   },
   {
    "title": "Cold start",
    "prompt": "<p>Render's free service “falls asleep” when it is idle. Write the function <code>is_sleeping(last_request, now, idle_limit=900)</code> (time in seconds): if <code>idle_limit</code> or more has passed since the last request, it returns <code>True</code> — the next request will wait for a cold start.</p>",
    "hints": [
     "The elapsed time: <code>now - last_request</code>.",
     "The condition: <code>&gt;= idle_limit</code>."
    ],
    "check": {
     "tests": "assert is_sleeping(1000, 1800) is False, '800 s have passed: it is not asleep yet'\nassert is_sleeping(1000, 1900) is True, 'Exactly 900 s have passed: it is asleep'\nassert is_sleeping(0, 100, idle_limit=60) is True, 'The idle_limit parameter must be taken into account'"
    }
   },
   {
    "title": "Readiness: model and database",
    "prompt": "<p>Write the function <code>readiness(state)</code>: the service is ready when the model is loaded (<code>state['model']</code> is not <code>None</code>) <b>and</b> the database connection is there (<code>state['db_ok']</code> is True). If it is ready, it returns <code>(200, {'status': 'ready'})</code>, otherwise <code>(503, {'status': 'not ready', 'missing': [...]})</code>, where <code>missing</code> is <code>'model'</code> and/or <code>'db'</code> (in this order).</p>",
    "hints": [
     "Collect the missing ones into a list: <code>if state['model'] is None: missing.append('model')</code>.",
     "If the list is not empty — 503."
    ],
    "check": {
     "tests": "assert readiness({'model': 'm', 'db_ok': True}) == (200, {'status': 'ready'}), 'Everything is ready → 200'\nassert readiness({'model': None, 'db_ok': True}) == (503, {'status': 'not ready', 'missing': ['model']}), 'No model → 503, missing [\"model\"]'\nassert readiness({'model': None, 'db_ok': False}) == (503, {'status': 'not ready', 'missing': ['model', 'db']}), 'Both are missing → [\"model\", \"db\"]'\nassert readiness({'model': 'm', 'db_ok': False})[1]['missing'] == ['db'], 'No database → [\"db\"]'"
    }
   },
   {
    "title": "Does it need a restart",
    "prompt": "<p>The platform restarts the container if the liveness check fails <code>limit</code> times in a row (the status is not 200). Write the function <code>should_restart(history, limit=3)</code>: <code>history</code> is the list of status codes (from old to new); if all of the last <code>limit</code> checks failed, return <code>True</code>. If there are fewer checks than <code>limit</code>, return <code>False</code>.</p>",
    "hints": [
     "The last <code>limit</code> elements: <code>history[-limit:]</code>.",
     "<code>all(s != 200 for s in ...)</code>; check the length first."
    ],
    "check": {
     "tests": "assert should_restart([200, 503, 503, 503]) is True, 'The last three failed → True'\nassert should_restart([503, 503, 200, 503]) is False, 'If there is a 200 among them → False'\nassert should_restart([503, 503]) is False, 'Fewer checks than limit → False'\nassert should_restart([200, 500, 502], limit=2) is True, 'limit=2: the last two failed'"
    }
   },
   {
    "title": "Checking a deploy",
    "prompt": "<p>After a deploy we check that the new version has really started. Write the function <code>verify_deploy(handle, expected_version)</code>: <code>handle(method, path, body=None)</code> → <code>(status, data)</code>. Checks: <code>'health'</code> — <code>GET /health</code> returns 200; <code>'ready'</code> — <code>GET /ready</code> returns 200; <code>'version'</code> — in the response of <code>/ready</code> the field <code>model_version</code> equals <code>expected_version</code> (if ready does not return 200, this check fails too). Return the names of the failed checks in order.</p>",
    "hints": [
     "Send one request to <code>/ready</code> and use its status and data for both checks.",
     "The version: <code>data.get('model_version') != expected_version</code>."
    ],
    "check": {
     "tests": "assert verify_deploy(new_service, '1.3.0') == [], 'For a correct deploy, an empty list'\nassert verify_deploy(new_service, '1.4.0') == ['version'], 'The old version is running → [\"version\"]'\ndef _loading(method, path, body=None):\n    if path == '/health':\n        return 200, {}\n    return 503, {'status': 'loading'}\nassert verify_deploy(_loading, '1.3.0') == ['ready', 'version'], 'The model is still loading → ready and version'\ndef _down(method, path, body=None):\n    return 502, {}\nassert verify_deploy(_down, '1.3.0') == ['health', 'ready', 'version'], 'No service → all three'"
    }
   },
   {
    "title": "The image tag is not latest",
    "prompt": "<p>One rule of the deploy checklist: the image tag must be a version, not <code>latest</code>. Write the function <code>check_tag(image)</code>: if there is no tag or it is <code>latest</code>, return <code>'no_version'</code>; if the tag is <code>X.Y.Z</code> (three parts, each a digit), return <code>'ok'</code>; for another tag (for example <code>dev</code>, <code>1.3</code>) return <code>'not_semver'</code>.</p>",
    "hints": [
     "Split off the tag: <code>name, _, tag = image.partition(':')</code>.",
     "Check the version: <code>len(parts) == 3 and all(p.isdigit() for p in parts)</code>."
    ],
    "check": {
     "tests": "assert check_tag('churn-api:1.3.0') == 'ok', '\"churn-api:1.3.0\" → ok'\nassert check_tag('churn-api') == 'no_version' and check_tag('churn-api:latest') == 'no_version', 'No tag or latest → no_version'\nassert check_tag('churn-api:dev') == 'not_semver' and check_tag('churn-api:1.3') == 'not_semver', 'dev and 1.3 → not_semver'"
    }
   },
   {
    "title": "Release and rollback",
    "prompt": "<p>Write the function <code>release(state, new_version, smoke_failures)</code>. <code>state</code> is <code>{'active': ағымдағы нұсқа, 'history': бұрынғы белсенді нұсқалар тізімі}</code>. If the smoke test passed (<code>smoke_failures</code> is empty), the current version is added to <code>history</code>, <code>new_version</code> becomes active, and <code>('released', new_version)</code> is returned. If not, nothing changes and <code>('rolled_back', ағымдағы нұсқа)</code> is returned. Also write the function <code>rollback(state)</code>: it makes active the last version from <code>history</code> (removing it from the history) and returns it; if the history is empty, <code>ValueError</code> is raised.</p>",
    "hints": [
     "If the smoke test fails, immediately <code>return 'rolled_back', state['active']</code> — the state does not change.",
     "<code>rollback</code>: <code>state['active'] = state['history'].pop()</code>."
    ],
    "check": {
     "tests": "_s = {'active': '1.2.0', 'history': ['1.0.0', '1.1.0']}\nassert release(_s, '1.3.0', ['predict']) == ('rolled_back', '1.2.0'), 'If the smoke test fails → rolled_back, the current version'\nassert _s == {'active': '1.2.0', 'history': ['1.0.0', '1.1.0']}, 'On a failed release the state must not change'\nassert release(_s, '1.3.0', []) == ('released', '1.3.0'), 'On success → released'\nassert _s == {'active': '1.3.0', 'history': ['1.0.0', '1.1.0', '1.2.0']}, 'The previous version must be added to history'\nassert rollback(_s) == '1.2.0' and _s == {'active': '1.2.0', 'history': ['1.0.0', '1.1.0']}, 'rollback returns the last version'\n_e = {'active': '1.0.0', 'history': []}\ntry:\n    rollback(_e)\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Тарих бос болса ValueError')"
    }
   },
   {
    "title": "A health monitor",
    "prompt": "<p>We model the platform's behavior. Write the function <code>monitor(statuses, limit=3)</code>: <code>statuses</code> are the statuses of the liveness checks (in order). Count the failed checks (not 200) in a row; when their number reaches <code>limit</code>, the container is restarted: add the index of that check to the list and reset the counter. A successful check also resets the counter. Return <code>{'restarts': [индекстер], 'uptime': 200 үлесінің пайызы (2 таңба)}</code>.</p>",
    "hints": [
     "Inside <code>for i, s in enumerate(statuses):</code> keep the counter <code>fails</code>.",
     "When <code>fails == limit</code>, do <code>restarts.append(i)</code> and <code>fails = 0</code>."
    ],
    "check": {
     "tests": "assert monitor([200, 503, 503, 503, 200]) == {'restarts': [3], 'uptime': 40.0}, '3 failures in a row (1, 2, 3) → a restart at index 3'\nassert monitor([200, 500, 500, 500, 500, 500, 500])['restarts'] == [3, 6], 'After a restart the counter is reset: 3 and 6'\nassert monitor([503, 503, 200, 503, 503, 200])['restarts'] == [], 'If there is a 200 in between, the counter is reset'\nassert monitor([500, 500], limit=2) == {'restarts': [1], 'uptime': 0.0}, 'The limit parameter must be taken into account'\nassert monitor([]) == {'restarts': [], 'uptime': 100.0}, 'An empty list'\nassert monitor([200, 200, 500])['uptime'] == 66.67, 'uptime is rounded to 2 decimal places'"
    }
   }
  ]
 },
 "dep-8": {
  "pr": [
   {
    "title": "Seconds to milliseconds",
    "prompt": "<p><code>time.perf_counter()</code> gives seconds. Write the function <code>to_ms(durations)</code>: it converts a list of seconds to milliseconds, rounds each value to 1 decimal place and returns the list. For example, <code>[0.0421, 0.0035]</code> → <code>[42.1, 3.5]</code>.</p>",
    "hints": [
     "1 s = 1000 ms.",
     "<code>[round(d * 1000, 1) for d in durations]</code>."
    ],
    "check": {
     "tests": "assert to_ms([0.0421, 0.0035]) == [42.1, 3.5], 'to_ms([0.0421, 0.0035]) must return [42.1, 3.5]'\nassert to_ms([1]) == [1000.0], '1 s = 1000.0 ms'\nassert to_ms([]) == [], 'An empty list'"
    }
   },
   {
    "title": "Throughput",
    "prompt": "<p>In a load test, <code>n_requests</code> requests were processed in <code>seconds</code> seconds. Write the function <code>rps(n_requests, seconds)</code>: it returns the number of requests per second, rounded to 1 decimal place. If <code>seconds</code> is 0 or less, the function raises <code>ValueError</code>.</p>",
    "hints": [
     "<code>round(n_requests / seconds, 1)</code>.",
     "First <code>if seconds &lt;= 0: raise ValueError(...)</code>."
    ],
    "check": {
     "tests": "assert rps(12000, 60) == 200.0, 'rps(12000, 60) must return 200.0'\nassert rps(1000, 7) == 142.9, 'Round the result to 1 decimal place'\nfor _s in [0, -5]:\n    try:\n        rps(10, _s)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f'seconds={_s} үшін ValueError күтілді')"
    }
   },
   {
    "title": "Slowest requests",
    "prompt": "<p>Write the function <code>slowest(latencies, n=3)</code>: it returns the latency of the <code>n</code> slowest requests in descending order. For example, <code>[40, 610, 38, 890, 52]</code> → <code>[890, 610, 52]</code>. If there are fewer requests than <code>n</code>, return all of them.</p>",
    "hints": [
     "<code>sorted(latencies, reverse=True)</code> — in descending order.",
     "The first n elements: <code>[:n]</code>."
    ],
    "check": {
     "tests": "assert slowest([40, 610, 38, 890, 52]) == [890, 610, 52], 'slowest([40, 610, 38, 890, 52]) must return [890, 610, 52]'\nassert slowest([5, 1], n=5) == [5, 1], 'If n is greater than the list length, return all'\n_l = [3, 1, 2]\nslowest(_l, 1)\nassert _l == [3, 1, 2], 'The input list must not change'"
    }
   },
   {
    "title": "Splitting into chunks",
    "prompt": "<p>Write the function <code>chunks(rows, size)</code>: it splits the list into parts of length <code>size</code> and returns the list of parts (the last one may be shorter). If <code>size</code> is less than 1, the function raises <code>ValueError</code>. For example, <code>chunks([1, 2, 3, 4, 5], 2)</code> → <code>[[1, 2], [3, 4], [5]]</code>.</p>",
    "hints": [
     "<code>range(0, len(rows), size)</code> — the start of each part.",
     "<code>rows[i:i + size]</code>."
    ],
    "check": {
     "tests": "assert chunks([1, 2, 3, 4, 5], 2) == [[1, 2], [3, 4], [5]], 'chunks([1, 2, 3, 4, 5], 2) must return [[1, 2], [3, 4], [5]]'\nassert chunks(list(range(10)), 5) == [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9]], 'If it divides evenly, the last part is full'\nassert chunks([], 3) == [], 'For an empty list, []'\ntry:\n    chunks([1], 0)\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('size=0 үшін ValueError')"
    }
   },
   {
    "title": "SLO report",
    "prompt": "<p>Write the function <code>slo_report(latencies, slo_ms=200, q=95)</code>: it returns a dictionary of the form <code>{'p50': медиана, 'pq': q-перцентиль, 'ok': pq &lt;= slo_ms}</code>, computing the percentiles with <code>numpy.percentile</code>. The numbers are rounded to 1 decimal place and have type <code>float</code>; <code>ok</code> has type <code>bool</code>.</p>",
    "hints": [
     "Use <code>np.percentile(latencies, q)</code>.",
     "The numpy type <code>bool_</code> is converted to a plain bool with <code>bool(...)</code>."
    ],
    "check": {
     "tests": "import numpy as _np\n_r = slo_report(latencies)\nassert _r == {'p50': 40.5, 'pq': round(float(_np.percentile(latencies, 95)), 1), 'ok': False}, f'slo_report(latencies) is wrong: {_r}'\nassert type(_r['ok']) is bool and type(_r['p50']) is float, 'ok is bool, the numbers are float'\nassert slo_report(latencies, q=90)['ok'] is True, 'q=90: p90 ≈ 52.6 ms ≤ 200, ok True'\nassert slo_report([100, 300], slo_ms=300, q=50) == {'p50': 200.0, 'pq': 200.0, 'ok': True}, 'The slo_ms and q parameters must be used'"
    }
   },
   {
    "title": "Batch endpoint limit",
    "prompt": "<p>Endpoint <code>POST /predict_batch</code> must not accept too many rows in one request. Write the function <code>handle_batch(rows, max_rows=100)</code>: if <code>rows</code> is empty, return <code>(400, {'error': 'бос сұрау'})</code>; if there are more than <code>max_rows</code> rows, return <code>(413, {'error': ...})</code> (the message must contain the limit); otherwise return <code>(200, {'predictions': [score(r) for r in rows], 'count': жол саны})</code>.</p>",
    "hints": [
     "Two checks in order: first whether it is empty, then <code>len(rows) &gt; max_rows</code>.",
     "Add the limit to the 413 message with an f-string."
    ],
    "check": {
     "tests": "assert handle_batch([{'support_calls': 2}, {'support_calls': 9}]) == (200, {'predictions': [0.3, 1.0], 'count': 2}), 'A valid request → 200, predictions and count'\nassert handle_batch([]) == (400, {'error': 'бос сұрау'}), 'An empty list → 400'\n_s, _d = handle_batch([{'support_calls': 1}] * 101)\nassert _s == 413 and '100' in _d['error'], '101 rows → 413, the message contains the limit (100)'\nassert handle_batch([{'support_calls': 1}] * 100)[0] == 200, 'Exactly 100 rows — allowed'\nassert handle_batch([{'support_calls': 1}] * 6, max_rows=5)[0] == 413, 'The max_rows parameter must be used'"
    }
   },
   {
    "title": "Choosing the batch size",
    "prompt": "<p>The cost of a model call: each <code>predict_proba</code> call costs <code>overhead_ms</code> plus <code>per_row_ms</code> per row. <code>total_ms(n_rows, batch_size, overhead_ms=5, per_row_ms=0.02)</code> is the time to predict all rows in batches (the number of calls is <code>ceil(n_rows / batch_size)</code>), rounded to 2 decimal places. <code>best_batch(n_rows, sizes, max_call_ms)</code> chooses, among the sizes whose single-call time (<code>overhead_ms + per_row_ms * batch_size</code>) does not exceed <code>max_call_ms</code>, the size with the smallest total time; if there is no such size, it returns <code>None</code>.</p>",
    "hints": [
     "Number of calls: <code>math.ceil(n_rows / batch_size)</code>; time: <code>calls * overhead_ms + n_rows * per_row_ms</code>.",
     "First filter out the sizes that exceed the limit, then choose <code>min(ok, key=...)</code>."
    ],
    "check": {
     "tests": "assert total_ms(1000, 1) == 5020.0, 'One by one: 1000 calls × 5 ms + 20 ms = 5020.0'\nassert total_ms(1000, 1000) == 25.0, 'One batch: 5 + 20 = 25.0 ms'\nassert total_ms(2500, 1000) == 65.0, '2500 rows, batch 1000 → 3 calls: 15 + 50 = 65.0'\nassert best_batch(2_000_000, [1, 100, 10_000, 100_000], 300) == 10_000, 'Limit 300 ms: 100 000 rows take 2005 ms, the best size is 10 000'\nassert best_batch(100, [500, 1000], 6) is None, 'If no size fits the limit, None'\nassert best_batch(50, [10, 50, 100], 1000) in (50, 100), 'For 50 rows: 50 or 100 — one call'"
    }
   },
   {
    "title": "Measuring latency",
    "prompt": "<p>Write the function <code>measure(func, rows)</code>: for each row, measure the time of one call <code>func(row)</code> using <code>time.perf_counter()</code> and collect the list of milliseconds. Return <code>{'n': шақыру саны, 'p50': ..., 'p95': ..., 'max': ...}</code> (percentiles computed with <code>np.percentile</code>, values of type <code>float</code>, in ms). The return value of <code>func</code> is not needed. For an empty <code>rows</code>, raise <code>ValueError</code>.</p>",
    "hints": [
     "Measure each call between <code>t0 = time.perf_counter()</code> and <code>(time.perf_counter() - t0) * 1000</code>.",
     "Return the result as <code>float(np.percentile(latencies, 95))</code>."
    ],
    "check": {
     "tests": "_calls = []\ndef _f(r):\n    _calls.append(r)\n    if r == 'slow':\n        _t = time.perf_counter()\n        while time.perf_counter() - _t < 0.02:\n            pass\n_r = measure(_f, ['fast'] * 19 + ['slow'])\nassert len(_calls) == 20 and _r['n'] == 20, 'For each row, func must be called once'\nassert set(_r) == {'n', 'p50', 'p95', 'max'}, 'Keys: n, p50, p95, max'\nassert all(isinstance(_r[k], float) for k in ('p50', 'p95', 'max')), 'The times must be float'\nassert _r['max'] >= 19, f'A slow call ≈ 20 ms: max must be in milliseconds, you have {_r[\"max\"]}'\nassert 0 <= _r['p50'] < 5 and _r['p50'] <= _r['p95'] <= _r['max'], 'p50 ≤ p95 ≤ max, fast calls take fractions of a ms'\ntry:\n    measure(_f, [])\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Бос rows үшін ValueError')"
    }
   }
  ]
 }
} });
