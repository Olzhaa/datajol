// pyint practice tasks: English text. Code, solutions and checks are in content/practice/pyint.js.
DJ.i18n.patch({ lessons: {
 "pyi-1": {
  "pr": [
   {
    "title": "Smallest and largest",
    "prompt": "Write the function <code>min_max(xs)</code>: it must return the smallest and the largest value of a list of numbers as a <b>tuple</b>. For example, <code>min_max([12, -3, 25, 7])</code> → <code>(-3, 25)</code>.",
    "hints": [
     "If you return several values separated by commas, you get a tuple: <code>return a, b</code>.",
     "<code>return min(xs), max(xs)</code>"
    ],
    "check": {
     "tests": "assert min_max([12, -3, 25, 7]) == (-3, 25), \"min_max([12, -3, 25, 7]) must return (-3, 25)\"\nassert isinstance(min_max([1, 2]), tuple), \"The result must be a tuple\"\nassert min_max([5]) == (5, 5), \"If the list has one element, return (5, 5)\""
    }
   },
   {
    "title": "Common letters",
    "prompt": "The function <code>common_letters(a, b)</code> must return a <b>set</b> of the letters that appear in both words. For example, <code>common_letters(\"алма\", \"алмұрт\")</code> → <code>{\"а\", \"л\", \"м\"}</code>.",
    "hints": [
     "<code>set(\"алма\")</code> makes a set of the letters of the word.",
     "Intersection: <code>set(a) & set(b)</code>"
    ],
    "check": {
     "tests": "assert common_letters(\"алма\", \"алмұрт\") == {\"а\", \"л\", \"м\"}, \"common_letters('алма', 'алмұрт') must return {'а', 'л', 'м'}\"\nassert common_letters(\"Астана\", \"Атырау\") == {\"А\", \"а\", \"т\"}, \"common_letters('Астана', 'Атырау') must return {'А', 'а', 'т'}\"\nassert common_letters(\"үй\", \"ат\") == set(), \"If there are no common letters, return an empty set\""
    }
   },
   {
    "title": "Any duplicates?",
    "prompt": "The names of students have been entered into a class register. The function <code>has_duplicates(names)</code> must return <code>True</code> if at least one name appears more than once in the list, otherwise <code>False</code>. Use a set.",
    "hints": [
     "A set removes duplicates: if it is shorter than the list, there are duplicates.",
     "<code>len(set(names)) != len(names)</code>"
    ],
    "check": {
     "tests": "assert has_duplicates([\"Әли\", \"Дана\", \"Әли\"]) is True, \"has_duplicates(['Әли', 'Дана', 'Әли']) must return True\"\nassert has_duplicates([\"Әли\", \"Дана\", \"Ерлан\"]) is False, \"If there are no duplicates, it must return False\"\nassert has_duplicates([]) is False, \"Empty list: no duplicates, False\""
    }
   },
   {
    "title": "In only one",
    "prompt": "Two sets of tourists who visited two museums are given. The function <code>only_one(a, b)</code> must return an alphabetically sorted <b>list</b> of the names of those who visited <b>only one</b> of the museums. For example, <code>only_one({\"Әли\", \"Дана\"}, {\"Дана\", \"Сая\"})</code> → <code>[\"Сая\", \"Әли\"]</code> (in the Python alphabet the letter <code>Ә</code> comes at the end of the Cyrillic letters).",
    "hints": [
     "Symmetric difference: <code>a ^ b</code>.",
     "<code>sorted(...)</code> makes a sorted list from a set."
    ],
    "check": {
     "tests": "assert only_one({\"Әли\", \"Дана\"}, {\"Дана\", \"Сая\"}) == [\"Сая\", \"Әли\"], \"only_one({'Әли', 'Дана'}, {'Дана', 'Сая'}) must return ['Сая', 'Әли']\"\nassert only_one({\"Арман\", \"Бекзат\", \"Нұр\"}, {\"Бекзат\"}) == [\"Арман\", \"Нұр\"], \"Names that appear in both sets must not be in the result\"\nassert only_one({\"Дана\"}, {\"Дана\"}) == [], \"If the sets are equal, return an empty list\""
    }
   },
   {
    "title": "Free seats",
    "prompt": "In a cinema, a seat is marked by a tuple <code>(row, seat)</code>. <code>taken</code> is a dictionary of sold seats: the key is a tuple, the value is the buyer. The function <code>free_seats(rows, cols, taken)</code> must return a list of free seats: by row, and inside each row in increasing seat order (numbering starts at 1). For example, <code>free_seats(1, 3, {(1, 2): \"Дана\"})</code> → <code>[(1, 1), (1, 3)]</code>.",
    "hints": [
     "Two nested loops: <code>for r in range(1, rows + 1)</code> and <code>for c in range(1, cols + 1)</code>.",
     "Checking a tuple as a key: <code>(r, c) not in taken</code>"
    ],
    "check": {
     "tests": "assert free_seats(1, 3, {(1, 2): \"Дана\"}) == [(1, 1), (1, 3)], \"free_seats(1, 3, {(1, 2): 'Дана'}) must return [(1, 1), (1, 3)]\"\nassert free_seats(2, 2, {(1, 1): \"Әли\", (2, 2): \"Сая\"}) == [(1, 2), (2, 1)], \"Free seats in a 2x2 hall: [(1, 2), (2, 1)]\"\nassert free_seats(2, 2, {}) == [(1, 1), (1, 2), (2, 1), (2, 2)], \"If nobody bought a ticket, all seats are free\""
    }
   },
   {
    "title": "New and returning visitors",
    "prompt": "The shop's visitors from yesterday and today are given as sets. The function <code>visitors(yesterday, today)</code> must return a tuple of three sets: <code>(new, returned, lost)</code>. <code>new</code> — those who came only today, <code>returned</code> — those who came both yesterday and today, <code>lost</code> — those who came yesterday but not today.",
    "hints": [
     "The difference <code>-</code> and the intersection <code>&</code> operations are enough.",
     "<code>return today - yesterday, today & yesterday, yesterday - today</code>"
    ],
    "check": {
     "tests": "_n, _r, _l = visitors({\"Әли\", \"Дана\", \"Ерлан\"}, {\"Дана\", \"Сая\", \"Ерлан\", \"Тимур\"})\nassert _n == {\"Сая\", \"Тимур\"}, \"new: came only today {'Сая', 'Тимур'}\"\nassert _r == {\"Дана\", \"Ерлан\"}, \"returned: came both yesterday and today {'Дана', 'Ерлан'}\"\nassert _l == {\"Әли\"}, \"lost: came yesterday but not today {'Әли'}\"\nassert visitors(set(), {\"Нұр\"}) == ({\"Нұр\"}, set(), set()), \"If nobody came yesterday, all visitors are new\""
    }
   },
   {
    "title": "Score statistics",
    "prompt": "The results of an olympiad are a list of <code>(name, score)</code> tuples. The function <code>summary(results)</code> must return a tuple <code>(best, worst, avg)</code>: <code>best</code> — the name of the person with the highest score, <code>worst</code> — the name of the person with the lowest score, <code>avg</code> — the average score, <code>round(..., 1)</code>. If scores are equal, take the person who comes first in the list. For an empty list, return <code>(None, None, 0)</code>.",
    "hints": [
     "In the loop, unpack each tuple: <code>for name, score in results:</code>",
     "Keep the best and the worst result in two variables, for example <code>best_name, best = results[0]</code>."
    ],
    "check": {
     "tests": "assert summary([(\"Әли\", 78), (\"Дана\", 95), (\"Ерлан\", 61), (\"Сая\", 88)]) == (\"Дана\", \"Ерлан\", 80.5), \"summary(...) must return ('Дана', 'Ерлан', 80.5)\"\nassert summary([(\"Нұр\", 50), (\"Аян\", 50)]) == (\"Нұр\", \"Нұр\", 50.0), \"If scores are equal, take the one who comes first in the list\"\nassert summary([]) == (None, None, 0), \"For an empty list (None, None, 0)\""
    }
   },
   {
    "title": "Number of routes",
    "prompt": "Train trips are written as <code>(from, to)</code> tuples. The trip Almaty → Astana and the trip Astana → Almaty count as one route. The function <code>unique_routes(trips)</code> must return the number of different routes. For example, <code>[(\"Алматы\", \"Астана\"), (\"Астана\", \"Алматы\"), (\"Алматы\", \"Шымкент\")]</code> → <code>2</code>.",
    "hints": [
     "Write each route in one form: let the \"smaller\" of the two cities come first.",
     "Add tuples to a set with <code>.add()</code>: duplicates are removed automatically."
    ],
    "check": {
     "tests": "assert unique_routes([(\"Алматы\", \"Астана\"), (\"Астана\", \"Алматы\"), (\"Алматы\", \"Шымкент\")]) == 2, \"Almaty-Astana and Almaty-Shymkent: 2 routes\"\nassert unique_routes([(\"Атырау\", \"Ақтау\"), (\"Ақтау\", \"Атырау\"), (\"Ақтау\", \"Атырау\")]) == 1, \"If one route appears several times, it still counts as 1\"\nassert unique_routes([]) == 0, \"If there are no trips, return 0\"\nassert unique_routes([(\"Қостанай\", \"Орал\"), (\"Орал\", \"Павлодар\"), (\"Павлодар\", \"Қостанай\")]) == 3, \"Three different routes: 3\""
    }
   }
  ]
 },
 "pyi-2": {
  "pr": [
   {
    "title": "Bus ticket",
    "prompt": "Write the function <code>ticket_price(age, base=200)</code>: children up to 7 years old (age 7 is not included) ride for free (<code>0</code>), people up to 18 pay half the price (<code>base // 2</code>), and everyone else pays <code>base</code>. <code>ticket_price(10)</code> → <code>100</code>.",
    "hints": [
     "Default value: <code>base=200</code>.",
     "Check the conditions from the smallest up: first <code>age < 7</code>."
    ],
    "check": {
     "tests": "assert ticket_price(10) == 100, \"ticket_price(10) must return 100\"\nassert ticket_price(5) == 0, \"Free up to 7 years: ticket_price(5) = 0\"\nassert ticket_price(30) == 200, \"Adult pays base: ticket_price(30) = 200\"\nassert ticket_price(30, 250) == 250 and ticket_price(16, base=250) == 125, \"If base is given, that price is used\""
    }
   },
   {
    "title": "Average of numbers",
    "prompt": "The function <code>average(*nums)</code> must return the average of any number of numeric arguments. If there are no arguments, return <code>0</code>. <code>average(4, 5, 3)</code> → <code>4.0</code>.",
    "hints": [
     "<code>*nums</code> collects all arguments into a tuple.",
     "Before dividing by an empty tuple, check: <code>if not nums: return 0</code>."
    ],
    "check": {
     "tests": "assert average(4, 5, 3) == 4.0, \"average(4, 5, 3) must return 4.0\"\nassert average(10) == 10, \"average(10) must be 10\"\nassert average() == 0, \"If there are no arguments, 0\""
    }
   },
   {
    "title": "Lambda functions",
    "prompt": "Write three variables with <code>lambda</code> functions: <code>square</code> — the square of a number; <code>is_even</code> — <code>True</code> if the number is even; <code>full_name</code> — builds the string <code>\"Аты Тегі\"</code> from two arguments (<code>full_name(\"Дана\", \"Серікова\")</code> → <code>\"Дана Серікова\"</code>).",
    "hints": [
     "<code>lambda x: x * x</code> — do not write <code>return</code>.",
     "Two arguments: <code>lambda first, last: first + \" \" + last</code>"
    ],
    "check": {
     "tests": "assert callable(square) and square.__name__ == \"<lambda>\", \"square must be written with lambda\"\nassert square(7) == 49, \"square(7) must be 49\"\nassert is_even(10) is True and is_even(7) is False, \"is_even(10) True, is_even(7) False\"\nassert full_name(\"Дана\", \"Серікова\") == \"Дана Серікова\", \"full_name('Дана', 'Серікова') must be 'Дана Серікова'\"\nassert is_even.__name__ == \"<lambda>\" and full_name.__name__ == \"<lambda>\", \"Everything must be a lambda\""
    }
   },
   {
    "title": "Building a request URL",
    "prompt": "The function <code>build_url(path, **params)</code> must build a website address: if parameters are given, it adds <code>?</code> to the end of <code>path</code> and joins the <code>key=value</code> pairs with <code>&</code> in the order they were given. If there are no parameters, return only <code>path</code>. <code>build_url(\"/hotels\", city=\"Алматы\", page=2)</code> → <code>\"/hotels?city=Алматы&page=2\"</code>.",
    "hints": [
     "<code>**params</code> collects named arguments into a dictionary.",
     "<code>\"&\".join([f\"{k}={v}\" for k, v in params.items()])</code>"
    ],
    "check": {
     "tests": "assert build_url(\"/hotels\", city=\"Алматы\", page=2) == \"/hotels?city=Алматы&page=2\", \"build_url('/hotels', city='Алматы', page=2) must return '/hotels?city=Алматы&page=2'\"\nassert build_url(\"/news\") == \"/news\", \"If there are no parameters, return only path\"\nassert build_url(\"/search\", q=\"домбыра\") == \"/search?q=домбыра\", \"One parameter: '/search?q=домбыра'\""
    }
   },
   {
    "title": "Add an item to the cart",
    "prompt": "The function <code>add_item(item, cart=None)</code> adds an item to the cart and returns the cart. If <code>cart</code> is not given, each call must create a <b>new</b> empty list (do not fall into the mutable default value trap). <code>add_item(\"Нан\")</code> → <code>[\"Нан\"]</code>, and the next call <code>add_item(\"Сүт\")</code> → <code>[\"Сүт\"]</code>.",
    "hints": [
     "Use <code>None</code> as the default value.",
     "Inside: <code>if cart is None: cart = []</code>"
    ],
    "check": {
     "tests": "assert add_item(\"Нан\") == [\"Нан\"], \"add_item('Нан') must return ['Нан']\"\nassert add_item(\"Сүт\") == [\"Сүт\"], \"Each new call must start from an empty cart: ['Сүт']\"\n_c = [\"Шай\"]\nassert add_item(\"Қант\", _c) == [\"Шай\", \"Қант\"] and _c == [\"Шай\", \"Қант\"], \"If a cart is given, the item is added to it\""
    }
   },
   {
    "title": "Joining words",
    "prompt": "The function <code>join_words(*words, sep=\" \")</code> must join all the words using <code>sep</code>. <code>join_words(\"Алматы\", \"Астана\", sep=\" → \")</code> → <code>\"Алматы → Астана\"</code>. Let us also check that the words can be passed as a list: <code>join_words(*[\"а\", \"б\"])</code>.",
    "hints": [
     "<code>*words</code> is a tuple, and <code>sep.join(words)</code> joins it.",
     "The <code>sep</code> parameter is written after <code>*words</code>."
    ],
    "check": {
     "tests": "assert join_words(\"Алматы\", \"Астана\", sep=\" → \") == \"Алматы → Астана\", \"join_words('Алматы', 'Астана', sep=' → ') must return 'Алматы → Астана'\"\nassert join_words(\"Қайырлы\", \"таң\") == \"Қайырлы таң\", \"The default separator is a space\"\nassert join_words(*[\"а\", \"б\", \"в\"], sep=\"-\") == \"а-б-в\", \"A list can be passed with an asterisk: 'а-б-в'\"\nassert join_words() == \"\", \"If there are no words, an empty string\""
    }
   },
   {
    "title": "Successive discounts",
    "prompt": "The function <code>apply_discounts(price, *percents, min_price=0)</code> must apply the discounts to the price <b>one after another</b>: each percent is calculated from the result of the previous one. If the final price is less than <code>min_price</code>, return <code>min_price</code>. Round the result: <code>round(..., 2)</code>. <code>apply_discounts(10000, 10, 20)</code> → <code>7200.0</code> (10000 → 9000 → 7200).",
    "hints": [
     "Loop: <code>for p in percents: price = price * (1 - p / 100)</code>",
     "At the end, <code>max(price, min_price)</code>, then <code>round</code>."
    ],
    "check": {
     "tests": "assert apply_discounts(10000, 10, 20) == 7200.0, \"apply_discounts(10000, 10, 20) must return 7200.0\"\nassert apply_discounts(5000) == 5000, \"If there are no discounts, the price does not change\"\nassert apply_discounts(10000, 50, 50, min_price=3000) == 3000, \"2500 < 3000, so min_price = 3000\"\nassert apply_discounts(999, 15) == 849.15, \"apply_discounts(999, 15) must return 849.15\""
    }
   },
   {
    "title": "Resume profile",
    "prompt": "The function <code>make_profile(name, *skills, **contacts)</code> must return a dictionary: <code>\"name\"</code> — the name, <code>\"skills\"</code> — a <b>list</b> of skills (in the order they were given), and each pair in <code>contacts</code> is added to the dictionary as a separate key. <code>make_profile(\"Дана\", \"Python\", \"SQL\", city=\"Алматы\")</code> → <code>{\"name\": \"Дана\", \"skills\": [\"Python\", \"SQL\"], \"city\": \"Алматы\"}</code>.",
    "hints": [
     "<code>skills</code> is a tuple; turn it into a list with <code>list(skills)</code>.",
     "Loop over <code>contacts.items()</code> and add the keys."
    ],
    "check": {
     "tests": "assert make_profile(\"Дана\", \"Python\", \"SQL\", city=\"Алматы\") == {\"name\": \"Дана\", \"skills\": [\"Python\", \"SQL\"], \"city\": \"Алматы\"}, \"make_profile('Дана', 'Python', 'SQL', city='Алматы') returned a wrong result\"\nassert make_profile(\"Ерлан\") == {\"name\": \"Ерлан\", \"skills\": []}, \"If there are no skills, skills is an empty list\"\n_info = {\"phone\": \"+77011234567\", \"email\": \"aru@mail.kz\"}\nassert make_profile(\"Ару\", *[\"Excel\"], **_info) == {\"name\": \"Ару\", \"skills\": [\"Excel\"], \"phone\": \"+77011234567\", \"email\": \"aru@mail.kz\"}, \"A list and a dictionary can be unpacked with * and **\""
    }
   }
  ]
 },
 "pyi-3": {
  "pr": [
   {
    "title": "Longest city name",
    "prompt": "The function <code>longest_city(cities)</code> must return the name of the longest city (using <code>max</code> and <code>key</code>). If the lengths are equal, return the one that comes first in the list. <code>longest_city([\"Талдықорған\", \"Алматы\", \"Тараз\"])</code> → <code>\"Талдықорған\"</code>.",
    "hints": [
     "<code>key=len</code> — compare the names by length.",
     "<code>return max(cities, key=len)</code>"
    ],
    "check": {
     "tests": "assert longest_city([\"Алматы\", \"Талдықорған\", \"Тараз\"]) == \"Талдықорған\", \"longest_city(['Алматы', 'Талдықорған', 'Тараз']) must return 'Талдықорған'\"\nassert longest_city([\"Орал\", \"Ақтау\", \"Атырау\"]) == \"Атырау\", \"The longest one is 'Атырау'\"\nassert longest_city([\"Сатпаев\", \"Шымкент\"]) == \"Сатпаев\", \"If the lengths are equal, return the first one\""
    }
   },
   {
    "title": "Dollars to tenge",
    "prompt": "The function <code>to_tenge(prices, rate)</code> must convert a list of prices in dollars to tenge using <code>map</code> and return a <b>list</b>: each price becomes <code>round(p * rate)</code>. <code>to_tenge([10, 2.5], 500)</code> → <code>[5000, 1250]</code>.",
    "hints": [
     "<code>map(lambda p: ..., prices)</code> applies a function to each element.",
     "Wrap the result of <code>map</code> in <code>list(...)</code>."
    ],
    "check": {
     "tests": "assert to_tenge([10, 2.5], 500) == [5000, 1250], \"to_tenge([10, 2.5], 500) must return [5000, 1250]\"\nassert to_tenge([1.99], 480) == [955], \"round(1.99 * 480) = 955\"\nassert to_tenge([], 500) == [], \"Empty list → empty list\""
    }
   },
   {
    "title": "Warm days",
    "prompt": "The air temperatures in February are given. The function <code>warm_days(temps)</code> must use <code>filter</code> to return the temperatures above 0 as a list, in the original order. <code>warm_days([-5, 2, 0, 4, -1])</code> → <code>[2, 4]</code>.",
    "hints": [
     "<code>filter(lambda t: t > 0, temps)</code>",
     "Wrap the result in <code>list(...)</code>."
    ],
    "check": {
     "tests": "assert warm_days([-5, 2, 0, 4, -1]) == [2, 4], \"warm_days([-5, 2, 0, 4, -1]) must return [2, 4]\"\nassert warm_days([-10, -3]) == [], \"If there are no warm days, an empty list\"\nassert warm_days([1, 1, 3]) == [1, 1, 3], \"If all days are warm, the list does not change\""
    }
   },
   {
    "title": "Student ranking",
    "prompt": "Students are given as dictionaries <code>{\"name\": ..., \"grade\": ...}</code>. The function <code>rank(students)</code> must return a list of names: first by grade from high to low, and if grades are equal, by name in alphabetical order. Use <code>sorted</code> and <code>key</code>.",
    "hints": [
     "Tuple key: <code>key=lambda s: (-s[\"grade\"], s[\"name\"])</code>",
     "After sorting, take only the names."
    ],
    "check": {
     "tests": "_st = [{\"name\": \"Ерлан\", \"grade\": 4}, {\"name\": \"Айгүл\", \"grade\": 5}, {\"name\": \"Бекзат\", \"grade\": 4}, {\"name\": \"Дана\", \"grade\": 5}]\nassert rank(_st) == [\"Айгүл\", \"Дана\", \"Бекзат\", \"Ерлан\"], \"The result must be ['Айгүл', 'Дана', 'Бекзат', 'Ерлан']\"\nassert rank([{\"name\": \"Нұр\", \"grade\": 3}]) == [\"Нұр\"], \"One student: ['Нұр']\""
    }
   },
   {
    "title": "The cheapest item",
    "prompt": "The item names and their prices are in two separate lists. The function <code>cheapest(names, prices)</code> must pair them using <code>zip</code> and return the <b>name</b> of the cheapest item (<code>min</code> and <code>key</code>). <code>cheapest([\"Нан\", \"Сүт\", \"Шай\"], [250, 520, 1300])</code> → <code>\"Нан\"</code>.",
    "hints": [
     "<code>zip(names, prices)</code> gives pairs: (\"Нан\", 250), ...",
     "<code>min(..., key=lambda p: p[1])[0]</code>"
    ],
    "check": {
     "tests": "assert cheapest([\"Нан\", \"Сүт\", \"Шай\"], [250, 520, 1300]) == \"Нан\", \"cheapest(['Нан', 'Сүт', 'Шай'], [250, 520, 1300]) must return 'Нан'\"\nassert cheapest([\"Ірімшік\", \"Айран\", \"Қымыз\"], [2400, 380, 900]) == \"Айран\", \"The cheapest is 'Айран' (380)\""
    }
   },
   {
    "title": "Positions of an element",
    "prompt": "The function <code>positions(xs, target)</code> must use <code>enumerate</code> to find the indexes at which the value <code>target</code> appears in the list, and return the list of indexes (from 0). <code>positions([\"Алматы\", \"Астана\", \"Алматы\"], \"Алматы\")</code> → <code>[0, 2]</code>.",
    "hints": [
     "<code>for i, x in enumerate(xs)</code> gives both the index and the value.",
     "<code>[i for i, x in enumerate(xs) if x == target]</code>"
    ],
    "check": {
     "tests": "assert positions([\"Алматы\", \"Астана\", \"Алматы\"], \"Алматы\") == [0, 2], \"positions(['Алматы', 'Астана', 'Алматы'], 'Алматы') must return [0, 2]\"\nassert positions([5, 3, 5, 5], 5) == [0, 2, 3], \"positions([5, 3, 5, 5], 5) must return [0, 2, 3]\"\nassert positions([1, 2], 9) == [], \"If it is not found, an empty list\""
    }
   },
   {
    "title": "Top N players",
    "prompt": "<code>scores</code> is a dictionary (player → points). The function <code>top_n(scores, n)</code> must return a list of the names of the <code>n</code> players with the most points: by points from high to low, and if points are equal, by name in alphabetical order. If <code>n</code> is greater than the number of players, return all of them.",
    "hints": [
     "Sort the pairs from <code>scores.items()</code> with <code>key=lambda p: (-p[1], p[0])</code>.",
     "The slice <code>[:n]</code> does not cause an error even if it is longer than the list."
    ],
    "check": {
     "tests": "_s = {\"Әли\": 820, \"Дана\": 1450, \"Ерлан\": 990, \"Айбек\": 990, \"Сая\": 1210}\nassert top_n(_s, 3) == [\"Дана\", \"Сая\", \"Айбек\"], \"top_n(_s, 3) must return ['Дана', 'Сая', 'Айбек'] (Айбек and Ерлан are tied, so alphabetical order)\"\nassert top_n(_s, 1) == [\"Дана\"], \"top_n(_s, 1) must return ['Дана']\"\nassert top_n({\"Нұр\": 5}, 10) == [\"Нұр\"], \"If n is large, return all of them\""
    }
   },
   {
    "title": "The most profitable day",
    "prompt": "The days of the week, the income and the costs are given as three lists. The function <code>best_day(days, income, costs)</code> must use <code>zip</code> to combine them and return the day with the largest profit (income − costs) and that profit as a tuple: <code>(\"сәрсенбі\", 41000)</code>. If profits are equal, take the earlier day.",
    "hints": [
     "<code>zip</code> joins all three lists: <code>for d, i, c in zip(days, income, costs)</code>.",
     "Make a list of (day, profit) pairs and take <code>max(..., key=lambda p: p[1])</code>."
    ],
    "check": {
     "tests": "_d = [\"дүйсенбі\", \"сейсенбі\", \"сәрсенбі\"]\nassert best_day(_d, [50000, 62000, 70000], [20000, 30000, 29000]) == (\"сәрсенбі\", 41000), \"The result must be ('сәрсенбі', 41000)\"\nassert best_day([\"жұма\", \"сенбі\"], [10000, 15000], [5000, 10000]) == (\"жұма\", 5000), \"If profits are equal, take the earlier day\""
    }
   }
  ]
 },
 "pyi-4": {
  "pr": [
   {
    "title": "Squares of numbers",
    "prompt": "Write the function <code>squares(n)</code> with a dict comprehension: it must return a dictionary that maps each number from 1 to <code>n</code> to its square. <code>squares(3)</code> → <code>{1: 1, 2: 4, 3: 9}</code>.",
    "hints": [
     "<code>{i: i * i for i in ...}</code>",
     "<code>range(1, n + 1)</code> includes the last number n as well."
    ],
    "check": {
     "tests": "assert squares(3) == {1: 1, 2: 4, 3: 9}, \"squares(3) must return {1: 1, 2: 4, 3: 9}\"\nassert squares(0) == {}, \"squares(0) is an empty dictionary\"\nassert squares(10)[10] == 100 and len(squares(10)) == 10, \"squares(10) has 10 keys, 10 → 100\""
    }
   },
   {
    "title": "Set of capital letters",
    "prompt": "Write the function <code>first_letters(names)</code> with a set comprehension: it must return a set without repeats of the first letters of the names, converted to capitals (<code>.upper()</code>). <code>first_letters([\"арман\", \"Айгүл\", \"дана\"])</code> → <code>{\"А\", \"Д\"}</code>.",
    "hints": [
     "<code>n[0]</code> is the first letter.",
     "<code>{n[0].upper() for n in names}</code>"
    ],
    "check": {
     "tests": "assert first_letters([\"арман\", \"Айгүл\", \"дана\"]) == {\"А\", \"Д\"}, \"first_letters(['арман', 'Айгүл', 'дана']) must return {'А', 'Д'}\"\nassert first_letters([\"Ерлан\", \"ерке\", \"Өмір\"]) == {\"Е\", \"Ө\"}, \"first_letters(['Ерлан', 'ерке', 'Өмір']) must return {'Е', 'Ө'}\"\nassert first_letters([]) == set(), \"Empty list → empty set\""
    }
   },
   {
    "title": "Goods in stock",
    "prompt": "The function <code>in_stock(stock)</code> must take a warehouse dictionary (item → quantity) and return a new dictionary that keeps only the items with a quantity greater than 0. Use a dict comprehension.",
    "hints": [
     "<code>for name, q in stock.items()</code>",
     "The condition at the end: <code>if q > 0</code>"
    ],
    "check": {
     "tests": "assert in_stock({\"Нан\": 12, \"Сүт\": 0, \"Шай\": 4}) == {\"Нан\": 12, \"Шай\": 4}, \"in_stock({'Нан': 12, 'Сүт': 0, 'Шай': 4}) must return {'Нан': 12, 'Шай': 4}\"\nassert in_stock({\"Май\": 0}) == {}, \"If everything is sold out, an empty dictionary\""
    }
   },
   {
    "title": "Letter grades",
    "prompt": "The function <code>letters(scores)</code> must take a dictionary (name → score) and build a dictionary (name → letter): 90 and above — <code>\"A\"</code>, 75 and above — <code>\"B\"</code>, the rest — <code>\"C\"</code>. Write one dict comprehension and use an <code>if ... else</code> expression for the value.",
    "hints": [
     "A chain of choices: <code>\"A\" if s >= 90 else \"B\" if s >= 75 else \"C\"</code>",
     "Elements are not filtered; only the value is chosen."
    ],
    "check": {
     "tests": "assert letters({\"Әли\": 92, \"Дана\": 75, \"Ерлан\": 60}) == {\"Әли\": \"A\", \"Дана\": \"B\", \"Ерлан\": \"C\"}, \"letters({'Әли': 92, 'Дана': 75, 'Ерлан': 60}) must return {'Әли': 'A', 'Дана': 'B', 'Ерлан': 'C'}\"\nassert letters({\"Сая\": 90, \"Нұр\": 74}) == {\"Сая\": \"A\", \"Нұр\": \"C\"}, \"90 → A, 74 → C\"\nassert letters({}) == {}, \"Empty dictionary → empty dictionary\""
    }
   },
   {
    "title": "Cities with a million people",
    "prompt": "The function <code>millions(pop)</code> must take a dictionary (city → population), keep only the cities with 1,000,000 or more inhabitants, and show the population in millions: <code>round(p / 1_000_000, 1)</code>. <code>{\"Алматы\": 2_250_000, \"Тараз\": 380_000}</code> → <code>{\"Алматы\": 2.2}</code>.",
    "hints": [
     "The filter condition at the end: <code>if p >= 1_000_000</code>",
     "The value: <code>round(p / 1_000_000, 1)</code>"
    ],
    "check": {
     "tests": "assert millions({\"Алматы\": 2_250_000, \"Тараз\": 380_000}) == {\"Алматы\": 2.2}, \"millions(...) must return {'Алматы': 2.2}\"\nassert millions({\"Астана\": 1_420_000, \"Шымкент\": 1_200_000, \"Орал\": 330_000}) == {\"Астана\": 1.4, \"Шымкент\": 1.2}, \"Astana 1.4, Shymkent 1.2 and Oral are not included\"\nassert millions({\"Ақтау\": 260_000}) == {}, \"If there are no cities with a million people, an empty dictionary\""
    }
   },
   {
    "title": "All tags",
    "prompt": "Every blog post has a list of tags. The function <code>all_tags(posts)</code> must return a set of all the tags from all posts, converted to lower case (<code>.lower()</code>), without repeats. Write one set comprehension with two <code>for</code> clauses.",
    "hints": [
     "Two <code>for</code> clauses: <code>for tags in posts for tag in tags</code>",
     "<code>{tag.lower() for tags in posts for tag in tags}</code>"
    ],
    "check": {
     "tests": "assert all_tags([[\"Python\", \"Алматы\"], [\"python\", \"IT\"], []]) == {\"python\", \"алматы\", \"it\"}, \"all_tags(...) must return {'python', 'алматы', 'it'}\"\nassert all_tags([]) == set(), \"If there are no posts, an empty set\""
    }
   },
   {
    "title": "Number of students in a group",
    "prompt": "Students are given as <code>(name, group)</code> tuples. The function <code>group_sizes(students)</code> must return a dictionary (group → number of students). Do not use a loop; write comprehensions: first get the set of groups with a set comprehension, then count the students of each group in a dict comprehension.",
    "hints": [
     "Groups: <code>{g for _, g in students}</code>",
     "Counting: <code>sum(1 for _, gg in students if gg == g)</code>"
    ],
    "check": {
     "tests": "_st = [(\"Әли\", \"IT-21\"), (\"Дана\", \"IT-22\"), (\"Ерлан\", \"IT-21\"), (\"Сая\", \"IT-21\"), (\"Нұр\", \"IT-22\")]\nassert group_sizes(_st) == {\"IT-21\": 3, \"IT-22\": 2}, \"group_sizes(...) must return {'IT-21': 3, 'IT-22': 2}\"\nassert group_sizes([]) == {}, \"If there are no students, an empty dictionary\"\nassert group_sizes([(\"Аян\", \"ФМ-1\")]) == {\"ФМ-1\": 1}, \"One student: {'ФМ-1': 1}\""
    }
   },
   {
    "title": "Lowest prices",
    "prompt": "Prices are given in several shops: <code>shops</code> is a dictionary (shop → (item → price)). The function <code>lowest_prices(shops)</code> must return a dictionary that gives, for each item, its lowest price across all shops. An item may be missing in some shops. Use comprehensions.",
    "hints": [
     "First, the set of all item names: <code>{p for prices in shops.values() for p in prices}</code>.",
     "The lowest price: <code>min(pr[p] for pr in shops.values() if p in pr)</code>"
    ],
    "check": {
     "tests": "_shops = {\"Magnum\": {\"Нан\": 240, \"Сүт\": 520}, \"Small\": {\"Нан\": 260, \"Сүт\": 490, \"Шай\": 1300}, \"Анвар\": {\"Шай\": 1250}}\nassert lowest_prices(_shops) == {\"Нан\": 240, \"Сүт\": 490, \"Шай\": 1250}, \"lowest_prices(...) must return {'Нан': 240, 'Сүт': 490, 'Шай': 1250}\"\nassert lowest_prices({}) == {}, \"If there are no shops, an empty dictionary\""
    }
   }
  ]
 },
 "pyi-5": {
  "pr": [
   {
    "title": "Sum of numbers",
    "prompt": "Write the recursive function <code>sum_to(n)</code>: it must return the sum 1 + 2 + … + n (<code>n</code> ≥ 0, <code>sum_to(0) = 0</code>). Do not use a loop or <code>sum</code>. <code>sum_to(5)</code> → <code>15</code>.",
    "hints": [
     "Base case: <code>if n == 0: return 0</code>",
     "Recursive step: <code>n + sum_to(n - 1)</code>"
    ],
    "check": {
     "tests": "assert sum_to(5) == 15, \"sum_to(5) must return 15\"\nassert sum_to(0) == 0, \"sum_to(0) must return 0\"\nassert sum_to(100) == 5050, \"sum_to(100) must return 5050\"\nassert \"sum_to\" in sum_to.__code__.co_names, \"The function must call itself (recursion)\""
    }
   },
   {
    "title": "Reverse a string",
    "prompt": "The recursive function <code>reverse(s)</code> must return the string in reverse order. Do not use the slice <code>[::-1]</code> or a loop: an empty string is the base case, otherwise <code>reverse(s[1:]) + s[0]</code>. <code>reverse(\"Абай\")</code> → <code>\"йабА\"</code>.",
    "hints": [
     "Base case: <code>if s == \"\": return \"\"</code>",
     "<code>return reverse(s[1:]) + s[0]</code>"
    ],
    "check": {
     "tests": "assert reverse(\"Абай\") == \"йабА\", \"reverse('Абай') must return 'йабА'\"\nassert reverse(\"\") == \"\", \"Empty string → empty string\"\nassert reverse(\"қала\") == \"алақ\", \"reverse('қала') must return 'алақ'\"\nassert \"reverse\" in reverse.__code__.co_names, \"The function must call itself (recursion)\""
    }
   },
   {
    "title": "Number of digits",
    "prompt": "The recursive function <code>count_digits(n)</code> must return the number of digits of a positive integer (without <code>str</code> and without a loop). If <code>n < 10</code>, return 1, otherwise <code>1 + count_digits(n // 10)</code>. <code>count_digits(2026)</code> → <code>4</code>.",
    "hints": [
     "<code>n // 10</code> removes the last digit.",
     "Base case: <code>if n < 10: return 1</code>"
    ],
    "check": {
     "tests": "assert count_digits(2026) == 4, \"count_digits(2026) must return 4\"\nassert count_digits(7) == 1, \"count_digits(7) must return 1\"\nassert count_digits(1000000) == 7, \"count_digits(1000000) must return 7\"\nassert \"count_digits\" in count_digits.__code__.co_names, \"The function must call itself (recursion)\""
    }
   },
   {
    "title": "Largest element of a list",
    "prompt": "The recursive function <code>biggest(xs)</code> must return the largest element of a non-empty list. Do not use <code>max</code> or a loop: if one element is left, it is the answer; otherwise compare the first element with the result of <code>biggest(xs[1:])</code> and take the larger one.",
    "hints": [
     "Base case: <code>if len(xs) == 1: return xs[0]</code>",
     "<code>rest = biggest(xs[1:])</code>, then compare it with <code>xs[0]</code>."
    ],
    "check": {
     "tests": "assert biggest([3, 17, 8, 21, 5]) == 21, \"biggest([3, 17, 8, 21, 5]) must return 21\"\nassert biggest([42]) == 42, \"One element: 42\"\nassert biggest([-7, -2, -9]) == -2, \"For negative numbers: -2\"\nassert \"biggest\" in biggest.__code__.co_names, \"The function must call itself (recursion)\""
    }
   },
   {
    "title": "Palindrome check",
    "prompt": "The recursive function <code>is_palindrome(s)</code> must return <code>True</code> if the word reads the same from both ends. If the length is 0 or 1, return <code>True</code>; if the first and the last letters are different, return <code>False</code>; otherwise check the middle part (<code>s[1:-1]</code>). <code>is_palindrome(\"қазақ\")</code> → <code>True</code>.",
    "hints": [
     "Two base cases: length ≤ 1, and the end letters are different.",
     "<code>return is_palindrome(s[1:-1])</code>"
    ],
    "check": {
     "tests": "assert is_palindrome(\"қазақ\") is True, \"is_palindrome('қазақ') must return True\"\nassert is_palindrome(\"алма\") is False, \"is_palindrome('алма') must return False\"\nassert is_palindrome(\"\") is True and is_palindrome(\"а\") is True, \"An empty string and a single letter are palindromes\"\nassert is_palindrome(\"абба\") is True, \"is_palindrome('абба') must return True\"\nassert \"is_palindrome\" in is_palindrome.__code__.co_names, \"The function must call itself (recursion)\""
    }
   },
   {
    "title": "Greatest common divisor",
    "prompt": "Write Euclid's algorithm with recursion: <code>gcd(a, b)</code>. If <code>b == 0</code>, the answer is <code>a</code>; otherwise <code>gcd(b, a % b)</code>. For example, 48 apples and 36 pears are packed into identical baskets: the largest number of baskets is <code>gcd(48, 36)</code> → <code>12</code>.",
    "hints": [
     "Base case: <code>if b == 0: return a</code>",
     "<code>return gcd(b, a % b)</code>"
    ],
    "check": {
     "tests": "assert gcd(48, 36) == 12, \"gcd(48, 36) must return 12\"\nassert gcd(17, 5) == 1, \"gcd(17, 5) must return 1\"\nassert gcd(100, 0) == 100, \"gcd(100, 0) must return 100\"\nassert gcd(270, 192) == 6, \"gcd(270, 192) must return 6\"\nassert \"gcd\" in gcd.__code__.co_names, \"The function must call itself (recursion)\""
    }
   },
   {
    "title": "Sum of nested lists",
    "prompt": "The sales of a shop's branches are stored in nested lists (region → city → shop). The recursive function <code>nested_sum(items)</code> must return the sum of all numbers at any depth. <code>nested_sum([10, [20, [30]], 40])</code> → <code>100</code>.",
    "hints": [
     "Check whether an element is a list: <code>isinstance(x, list)</code>.",
     "If it is a list, add the result of <code>nested_sum(x)</code>."
    ],
    "check": {
     "tests": "assert nested_sum([10, [20, [30]], 40]) == 100, \"nested_sum([10, [20, [30]], 40]) must return 100\"\nassert nested_sum([]) == 0, \"Empty list → 0\"\nassert nested_sum([[[[5]]], [], [1, [2, 3]]]) == 11, \"Deep and empty nested lists: 11\"\nassert \"nested_sum\" in nested_sum.__code__.co_names, \"The function must call itself (recursion)\""
    }
   },
   {
    "title": "Depth of a list",
    "prompt": "The recursive function <code>depth(items)</code> must return the nesting depth of a list: a list with no lists inside has depth 1, otherwise it is 1 + the largest depth of the inner lists. <code>depth([1, 2])</code> → <code>1</code>, <code>depth([1, [2, [3]], [4]])</code> → <code>3</code>, <code>depth([])</code> → <code>1</code>.",
    "hints": [
     "Keep the largest depth of the inner lists in a variable (start with 0).",
     "At the end, <code>return 1 + deepest</code>"
    ],
    "check": {
     "tests": "assert depth([1, 2]) == 1, \"depth([1, 2]) must return 1\"\nassert depth([1, [2, [3]], [4]]) == 3, \"depth([1, [2, [3]], [4]]) must return 3\"\nassert depth([]) == 1, \"depth([]) must return 1\"\nassert depth([[[[]]]]) == 4, \"depth([[[[]]]]) must return 4\"\nassert \"depth\" in depth.__code__.co_names, \"The function must call itself (recursion)\""
    }
   }
  ]
 },
 "pyi-6": {
  "pr": [
   {
    "title": "Rectangle class",
    "prompt": "Write the <code>Rectangle</code> class: <code>__init__(self, width, height)</code> stores two attributes; the method <code>area()</code> returns the area and <code>perimeter()</code> returns the perimeter. For example, a plot of land 20 × 15 m: area 300, perimeter 70.",
    "hints": [
     "<code>self.width = width</code>, <code>self.height = height</code>",
     "Perimeter: <code>2 * (self.width + self.height)</code>"
    ],
    "check": {
     "tests": "_r = Rectangle(20, 15)\nassert _r.width == 20 and _r.height == 15, \"__init__ must store width and height\"\nassert _r.area() == 300, \"Rectangle(20, 15).area() must return 300\"\nassert _r.perimeter() == 70, \"Rectangle(20, 15).perimeter() must return 70\"\nassert Rectangle(1, 1).area() == 1, \"Each object uses its own dimensions\""
    }
   },
   {
    "title": "Thermometer",
    "prompt": "Write the <code>Thermometer</code> class: <code>__init__(self, city, celsius)</code>; the method <code>fahrenheit()</code> returns <code>celsius * 9 / 5 + 32</code>; the method <code>is_frost()</code> returns <code>True</code> if the temperature is below 0.",
    "hints": [
     "The first parameter of every method is <code>self</code>.",
     "<code>return self.celsius * 9 / 5 + 32</code>"
    ],
    "check": {
     "tests": "_t = Thermometer(\"Астана\", -20)\nassert _t.city == \"Астана\" and _t.celsius == -20, \"city and celsius must be stored\"\nassert _t.fahrenheit() == -4.0, \"-20 °C = -4.0 °F\"\nassert _t.is_frost() is True, \"-20 °C is frost: True\"\nassert Thermometer(\"Шымкент\", 35).is_frost() is False, \"35 °C is not frost: False\""
    }
   },
   {
    "title": "City description",
    "prompt": "Write the <code>City</code> class: <code>__init__(self, name, population)</code>. The <code>__str__</code> method must return the string <code>\"Алматы: 2250000 адам\"</code>, and <code>__repr__</code> must return <code>\"City('Алматы', 2250000)\"</code>.",
    "hints": [
     "<code>__str__</code> is used by <code>print</code>, <code>__repr__</code> is used when the object is shown inside a list.",
     "<code>!r</code> puts the string in quotes: <code>f\"City({self.name!r}, {self.population})\"</code>"
    ],
    "check": {
     "tests": "_c = City(\"Алматы\", 2250000)\nassert str(_c) == \"Алматы: 2250000 адам\", \"str(City('Алматы', 2250000)) must be 'Алматы: 2250000 адам'\"\nassert repr(_c) == \"City('Алматы', 2250000)\", \"repr: City('Алматы', 2250000)\"\nassert str([City(\"Орал\", 330000)]) == \"[City('Орал', 330000)]\", \"Inside a list, __repr__ is used\""
    }
   },
   {
    "title": "Shopping cart",
    "prompt": "Write the <code>Cart</code> class. Each cart has its own <code>items</code> list (empty at the start). The method <code>add(name, price, qty=1)</code> adds a <code>(name, price, qty)</code> tuple to the list; <code>total()</code> returns the total sum; <code>count()</code> returns the total number of items.",
    "hints": [
     "Create the list in <code>__init__</code> with <code>self.items = []</code>, so each cart gets its own list.",
     "<code>total</code>: for each tuple, add <code>price * qty</code>."
    ],
    "check": {
     "tests": "_a = Cart(); _b = Cart()\n_a.add(\"Нан\", 250, 2); _a.add(\"Ірімшік\", 2400)\nassert _a.items == [(\"Нан\", 250, 2), (\"Ірімшік\", 2400, 1)], \"add must add a (name, price, qty) tuple, qty is 1 by default\"\nassert _a.total() == 2900, \"total() = 250*2 + 2400 = 2900\"\nassert _a.count() == 3, \"count() = 2 + 1 = 3\"\nassert _b.items == [] and _b.total() == 0, \"Each cart's list must be separate\""
    }
   },
   {
    "title": "Car mileage",
    "prompt": "The <code>Car</code> class has a class attribute <code>total_km = 0</code> that stores the total mileage of all cars. Each car has a <code>plate</code> (number) and <code>km = 0</code>. The method <code>drive(distance)</code> increases both the car's <code>km</code> and <code>Car.total_km</code>.",
    "hints": [
     "Change the class attribute with <code>Car.total_km += distance</code>.",
     "Object attribute: <code>self.km += distance</code>"
    ],
    "check": {
     "tests": "_t0 = Car.total_km\n_x = Car(\"777ABA02\"); _y = Car(\"123KZ01\")\nassert _x.km == 0, \"Starting km = 0\"\n_x.drive(120); _y.drive(30); _x.drive(50)\nassert _x.km == 170 and _y.km == 30, \"The km of each car is counted separately\"\nassert Car.total_km == _t0 + 200, \"Car.total_km must be the sum of all the mileage\"\nassert \"total_km\" not in vars(_x), \"Change Car.total_km, not self.total_km\""
    }
   },
   {
    "title": "Pupil marks",
    "prompt": "Write the <code>Pupil</code> class: <code>__init__(self, name)</code>, each pupil has an empty list <code>marks</code>. The method <code>add_mark(m)</code> adds the mark only if it is from 1 to 5, and returns <code>True</code>; otherwise it does not add it and returns <code>False</code>. The method <code>best()</code> returns the highest mark, or <code>None</code> if there are no marks.",
    "hints": [
     "Check: <code>if 1 <= m <= 5:</code>",
     "<code>best</code>: <code>None</code> for an empty list, otherwise <code>max(self.marks)</code>."
    ],
    "check": {
     "tests": "_p = Pupil(\"Аружан\")\nassert _p.marks == [] and _p.best() is None, \"At the start marks is empty, best() is None\"\nassert _p.add_mark(4) is True and _p.add_mark(5) is True, \"A correct mark gives True\"\nassert _p.add_mark(7) is False and _p.add_mark(0) is False, \"A mark outside the range 1–5 gives False\"\nassert _p.marks == [4, 5], \"Wrong marks must not be added: [4, 5]\"\nassert _p.best() == 5, \"best() = 5\""
    }
   },
   {
    "title": "Bank card",
    "prompt": "Write the <code>Card</code> class: <code>__init__(self, owner, pin, balance=0)</code>; <code>blocked = False</code>; the number of wrong PIN entries <code>tries = 0</code>. The method <code>withdraw(pin, amount)</code>: if the card is blocked, return <code>\"бұғатталған\"</code>; if the PIN is wrong, <code>tries</code> increases, and at 3 the card is blocked, and <code>\"қате PIN\"</code> is returned; if the PIN is right, <code>tries</code> is reset to 0; if there is not enough money, return <code>\"қаражат жеткіліксіз\"</code>, otherwise reduce the balance and return <code>\"сәтті\"</code>.",
    "hints": [
     "Order of checks: block → PIN → balance.",
     "With a wrong PIN: <code>self.tries += 1</code>, <code>if self.tries >= 3: self.blocked = True</code>"
    ],
    "check": {
     "tests": "_c = Card(\"Дана\", \"1234\", 50000)\nassert _c.withdraw(\"1234\", 20000) == \"сәтті\" and _c.balance == 30000, \"Right PIN: 'сәтті', balance 30000\"\nassert _c.withdraw(\"1234\", 99999) == \"қаражат жеткіліксіз\" and _c.balance == 30000, \"Not enough money: 'қаражат жеткіліксіз', balance does not change\"\nassert _c.withdraw(\"0000\", 100) == \"қате PIN\" and _c.tries == 1, \"Wrong PIN: tries 1\"\nassert _c.withdraw(\"1234\", 1000) == \"сәтті\" and _c.tries == 0, \"A right PIN resets tries\"\nfor _ in range(3):\n    _c.withdraw(\"1111\", 100)\nassert _c.blocked is True, \"After 3 wrong PINs in a row the card is blocked\"\nassert _c.withdraw(\"1234\", 100) == \"бұғатталған\" and _c.balance == 29000, \"A blocked card does not give out money\""
    }
   },
   {
    "title": "Elevator",
    "prompt": "Write the <code>Elevator</code> class: <code>__init__(self, floors)</code>; the elevator stands on floor <code>current = 1</code>, <code>history = [1]</code>. The method <code>go(floor)</code>: if the floor is from 1 to <code>floors</code>, the elevator goes there, the floor is added to <code>history</code>, and <code>True</code> is returned; otherwise nothing changes and <code>False</code> is returned. The method <code>distance()</code> returns the total number of floors travelled (the sum of the absolute differences of neighbouring entries).",
    "hints": [
     "In <code>go</code>, check the limits first.",
     "<code>distance</code>: the sum of <code>abs(self.history[i] - self.history[i - 1])</code>."
    ],
    "check": {
     "tests": "_e = Elevator(9)\nassert _e.current == 1 and _e.history == [1], \"The elevator starts from floor 1\"\nassert _e.go(5) is True and _e.go(2) is True, \"Going to an existing floor — True\"\nassert _e.go(12) is False and _e.go(0) is False, \"Going to a non-existing floor — False\"\nassert _e.current == 2 and _e.history == [1, 5, 2], \"A wrong request does not change history\"\n_e.go(9)\nassert _e.distance() == 4 + 3 + 7, \"distance() = |5-1| + |2-5| + |9-2| = 14\"\nassert Elevator(5).distance() == 0, \"A new elevator has distance() = 0\""
    }
   }
  ]
 },
 "pyi-7": {
  "pr": [
   {
    "title": "Manager's salary",
    "prompt": "The <code>Employee</code> class is ready. Write the <code>Manager</code> class that inherits from it: <code>__init__(self, name, salary, bonus)</code> calls the parent class with <code>super()</code> and stores <code>bonus</code>. For <code>Manager</code>, override the <code>total()</code> method: <code>salary + bonus</code>.",
    "hints": [
     "<code>class Manager(Employee):</code>",
     "<code>super().__init__(name, salary)</code>, then <code>self.bonus = bonus</code>"
    ],
    "check": {
     "tests": "_m = Manager(\"Ерлан\", 450000, 100000)\nassert isinstance(_m, Employee), \"Manager must inherit from Employee\"\nassert _m.name == \"Ерлан\" and _m.salary == 450000 and _m.bonus == 100000, \"name, salary and bonus must be stored\"\nassert _m.total() == 550000, \"Manager.total() = salary + bonus = 550000\"\nassert Employee(\"Дана\", 300000).total() == 300000, \"Employee.total() does not change\""
    }
   },
   {
    "title": "Money amount",
    "prompt": "Add two dunder methods to the <code>Money</code> class: <code>__add__</code> adds two amounts and returns a <b>new</b> <code>Money</code> object; <code>__eq__</code> returns <code>True</code> if the amounts are equal. <code>Money(500) + Money(700) == Money(1200)</code> → <code>True</code>.",
    "hints": [
     "<code>def __add__(self, other): return Money(self.amount + other.amount)</code>",
     "<code>def __eq__(self, other): return self.amount == other.amount</code>"
    ],
    "check": {
     "tests": "_s = Money(500) + Money(700)\nassert isinstance(_s, Money), \"The sum must be a Money object\"\nassert _s.amount == 1200, \"The sum of Money(500) + Money(700) is 1200\"\nassert Money(1200) == _s, \"Money objects with equal amounts are equal (__eq__)\"\nassert not (Money(1) == Money(2)), \"If the amounts are different, the objects are not equal\""
    }
   },
   {
    "title": "Team members",
    "prompt": "The <code>Team</code> class stores a list of players. Add the methods <code>__len__</code> (the number of members) and <code>__contains__</code> (<code>\"Дана\" in team</code>).",
    "hints": [
     "<code>def __len__(self): return len(self.members)</code>",
     "<code>def __contains__(self, player): return player in self.members</code>"
    ],
    "check": {
     "tests": "_t = Team(\"Қайрат\", [\"Әли\", \"Дана\", \"Ерлан\"])\nassert len(_t) == 3, \"len(team) must return the number of members: 3\"\nassert \"Дана\" in _t, \"'Дана' in team must be True\"\nassert \"Тимур\" not in _t, \"'Тимур' is not a team member\"\nassert len(Team(\"Астана\", [])) == 0, \"An empty team: 0\""
    }
   },
   {
    "title": "Areas of shapes",
    "prompt": "In the parent class <code>Shape</code>, the method <code>area()</code> returns 0. Write two child classes that inherit from it: <code>Square(side)</code> and <code>Circle(r)</code> (area <code>3.14 * r * r</code>), each overriding <code>area()</code>. Then the function <code>total_area(shapes)</code> adds up the areas of all the shapes and returns <code>round(..., 2)</code>.",
    "hints": [
     "In <code>class Square(Shape):</code> write <code>__init__</code> and <code>area</code>.",
     "The function <code>total_area</code> does not know the type of the shape; it only calls <code>s.area()</code>."
    ],
    "check": {
     "tests": "assert isinstance(Square(2), Shape) and isinstance(Circle(1), Shape), \"Square and Circle must inherit from Shape\"\nassert Square(4).area() == 16, \"Square(4).area() must return 16\"\nassert Circle(10).area() == 314.0, \"Circle(10).area() must return 314.0\"\nassert total_area([Square(3), Circle(2), Shape()]) == 21.56, \"9 + 12.56 + 0 = 21.56\"\nassert total_area([]) == 0, \"If there are no shapes, 0\""
    }
   },
   {
    "title": "Vector operations",
    "prompt": "For moving a character in a game, write the <code>Vector(x, y)</code> class: <code>__add__</code> adds the coordinates and returns a new <code>Vector</code>; <code>__eq__</code> returns <code>True</code> if the coordinates are equal; <code>__repr__</code> returns <code>\"Vector(3, 4)\"</code>.",
    "hints": [
     "<code>__add__</code> returns a new object: <code>Vector(self.x + other.x, self.y + other.y)</code>.",
     "<code>__repr__</code>: <code>f\"Vector({self.x}, {self.y})\"</code>"
    ],
    "check": {
     "tests": "_v = Vector(1, 2) + Vector(2, 2)\nassert _v == Vector(3, 4), \"Vector(1, 2) + Vector(2, 2) must be equal to Vector(3, 4)\"\nassert repr(_v) == \"Vector(3, 4)\", \"repr: 'Vector(3, 4)'\"\nassert not (Vector(0, 1) == Vector(1, 0)), \"Vectors with different coordinates are not equal\"\n_p = Vector(0, 0)\nfor _step in [Vector(1, 0), Vector(1, 0), Vector(0, -1)]:\n    _p = _p + _step\nassert _p == Vector(2, -1), \"The sum of the steps is Vector(2, -1)\""
    }
   },
   {
    "title": "Comparing products",
    "prompt": "Add the <code>__lt__</code> method (comparison by price) to the <code>Product(name, price)</code> class, so that <code>sorted</code> and <code>min</code> work without <code>key</code>. Then the function <code>cheapest(products)</code> returns the <b>name</b> of the cheapest product, and the function <code>by_price(products)</code> returns the list of names in increasing order of price.",
    "hints": [
     "<code>def __lt__(self, other): return self.price < other.price</code>",
     "<code>min(products).name</code> and <code>sorted(products)</code>"
    ],
    "check": {
     "tests": "_ps = [Product(\"Шапан\", 45000), Product(\"Домбыра\", 30000), Product(\"Кесе\", 1500)]\nassert Product(\"а\", 1) < Product(\"б\", 2), \"__lt__ must compare by price\"\nassert cheapest(_ps) == \"Кесе\", \"cheapest(...) must return 'Кесе'\"\nassert by_price(_ps) == [\"Кесе\", \"Домбыра\", \"Шапан\"], \"by_price(...) must return ['Кесе', 'Домбыра', 'Шапан']\""
    }
   },
   {
    "title": "Fare cost",
    "prompt": "City transport: the parent class <code>Transport</code> (the method <code>fare(km)</code> returns 0). Write three child classes: <code>Bus</code> — 200 ₸ for any distance; <code>Metro</code> — 150 ₸; <code>Taxi</code> — a 400 ₸ boarding fee plus 150 ₸ for each km. The function <code>trip_cost(legs)</code> returns the total cost for a list of <code>(transport, km)</code> tuples.",
    "hints": [
     "Each child class overrides the method <code>fare(self, km)</code> in its own way.",
     "<code>trip_cost</code>: <code>sum(t.fare(km) for t, km in legs)</code>"
    ],
    "check": {
     "tests": "assert all(isinstance(_t, Transport) for _t in (Bus(), Metro(), Taxi())), \"Bus, Metro and Taxi must inherit from Transport\"\nassert Bus().fare(15) == 200 and Metro().fare(3) == 150, \"Bus 200, metro 150\"\nassert Taxi().fare(6) == 1300, \"Taxi().fare(6) = 400 + 6*150 = 1300\"\nassert trip_cost([(Bus(), 8), (Metro(), 5), (Taxi(), 2)]) == 1050, \"200 + 150 + 700 = 1050\"\nassert trip_cost([]) == 0, \"If there are no trips, 0\""
    }
   },
   {
    "title": "Bookshelf",
    "prompt": "The <code>Shelf</code> class stores a list of book titles. Add the dunder methods: <code>__len__</code> — the number of books; <code>__getitem__(i)</code> — the title at <code>shelf[i]</code>; <code>__contains__</code> — <code>\"Абай жолы\" in shelf</code>; <code>__add__</code> — a new <code>Shelf</code> from two shelves (first the books of the first shelf, then those of the second, without repeats).",
    "hints": [
     "In <code>__getitem__(self, i)</code> return <code>self.books[i]</code>.",
     "In <code>__add__</code>: make a copy and add the books of the second shelf in a loop (skip the ones that are already there)."
    ],
    "check": {
     "tests": "_a = Shelf([\"Абай жолы\", \"Көшпенділер\"])\n_b = Shelf([\"Көшпенділер\", \"Қан мен тер\"])\nassert len(_a) == 2 and _a[0] == \"Абай жолы\" and _a[-1] == \"Көшпенділер\", \"__len__ and __getitem__ must work correctly\"\nassert \"Абай жолы\" in _a and \"Қан мен тер\" not in _a, \"__contains__ must work correctly\"\n_c = _a + _b\nassert isinstance(_c, Shelf) and _c.books == [\"Абай жолы\", \"Көшпенділер\", \"Қан мен тер\"], \"a + b: a new Shelf without repeats\"\nassert _a.books == [\"Абай жолы\", \"Көшпенділер\"], \"Adding must not change the original shelf\""
    }
   }
  ]
 },
 "pyi-8": {
  "pr": [
   {
    "title": "Area of a circle",
    "prompt": "Import with <code>from math import pi</code> and write the function <code>circle_area(r)</code>: it must return <code>pi * r * r</code>, rounded with <code>round(..., 2)</code>. For example, a flower bed with a radius of 5 m: <code>circle_area(5)</code> → <code>78.54</code>.",
    "hints": [
     "<code>from math import pi</code> — import only the name you need.",
     "<code>round(pi * r * r, 2)</code>"
    ],
    "check": {
     "tests": "assert circle_area(5) == 78.54, \"circle_area(5) must return 78.54\"\nassert circle_area(1) == 3.14, \"circle_area(1) must return 3.14\"\nassert circle_area(0) == 0, \"circle_area(0) must return 0\""
    }
   },
   {
    "title": "Hypotenuse",
    "prompt": "Write <code>import math</code> and the function <code>hypotenuse(a, b)</code>: it must compute the hypotenuse of a right triangle with <code>math.sqrt(a * a + b * b)</code> and return it rounded with <code>round(..., 1)</code>. <code>hypotenuse(3, 4)</code> → <code>5.0</code>.",
    "hints": [
     "<code>import math</code>, then <code>math.sqrt(...)</code>.",
     "<code>round(math.sqrt(a * a + b * b), 1)</code>"
    ],
    "check": {
     "tests": "assert hypotenuse(3, 4) == 5.0, \"hypotenuse(3, 4) must return 5.0\"\nassert hypotenuse(1, 1) == 1.4, \"hypotenuse(1, 1) must return 1.4\"\nassert hypotenuse(6, 8) == 10.0, \"hypotenuse(6, 8) must return 10.0\""
    }
   },
   {
    "title": "Removing punctuation",
    "prompt": "Import <code>from string import punctuation</code> (<code>punctuation</code> is a string of punctuation marks such as <code>!\"#$%&...</code>). The function <code>clean(text)</code> must remove all these marks from the text and return the result. <code>clean(\"Сәлем, әлем!\")</code> → <code>\"Сәлем әлем\"</code>.",
    "hints": [
     "Check each character: <code>ch not in punctuation</code>.",
     "<code>\"\".join(ch for ch in text if ch not in punctuation)</code>"
    ],
    "check": {
     "tests": "assert clean(\"Сәлем, әлем!\") == \"Сәлем әлем\", \"clean('Сәлем, әлем!') must return 'Сәлем әлем'\"\nassert clean(\"Иә... (мүмкін)\") == \"Иә мүмкін\", \"clean('Иә... (мүмкін)') must return 'Иә мүмкін'\"\nassert clean(\"Алматы\") == \"Алматы\", \"A text without punctuation does not change\""
    }
   },
   {
    "title": "Packing into boxes",
    "prompt": "In a warehouse, goods are packed into boxes. Using <code>import math</code>, write the function <code>pack(items, per_box)</code>, which returns a tuple <code>(boxes, empty)</code>: <code>boxes</code> — the number of boxes needed (<code>math.ceil</code>), <code>empty</code> — the number of free places in the last box. <code>pack(23, 10)</code> → <code>(3, 7)</code>.",
    "hints": [
     "<code>boxes = math.ceil(items / per_box)</code>",
     "Free places: <code>boxes * per_box - items</code>"
    ],
    "check": {
     "tests": "assert pack(23, 10) == (3, 7), \"pack(23, 10) must return (3, 7)\"\nassert pack(20, 10) == (2, 0), \"pack(20, 10) must return (2, 0)\"\nassert pack(1, 12) == (1, 11), \"pack(1, 12) must return (1, 11)\""
    }
   },
   {
    "title": "Prize draw",
    "prompt": "A raffle at a school party. Write <code>import random</code> and the function <code>pick_winner(names, seed)</code>: first call <code>random.seed(seed)</code>, then return the result of <code>random.choice(names)</code>. The same <code>seed</code> always gives the same winner, so the result can be checked.",
    "hints": [
     "<code>random.seed(seed)</code> fixes the sequence of random numbers.",
     "<code>return random.choice(names)</code>"
    ],
    "check": {
     "tests": "import random as _random\n_names = [\"Әли\", \"Дана\", \"Ерлан\", \"Сая\", \"Тимур\", \"Мадина\"]\nfor _seed in (1, 7, 2026):\n    _random.seed(_seed)\n    _exp = _random.choice(_names)\n    assert pick_winner(_names, _seed) == _exp, f\"With seed={_seed} the winner must be {_exp}\"\nassert pick_winner([\"Нұр\"], 5) == \"Нұр\", \"If there is only one participant, that participant wins\""
    }
   },
   {
    "title": "Letter numbers",
    "prompt": "Import <code>from string import ascii_lowercase</code> — the Latin alphabet (<code>\"abc...z\"</code>). The function <code>letter_numbers(word)</code> must return a list of the alphabet position (from 1) of each letter of the word. The word may start with a capital letter: use <code>.lower()</code>. <code>letter_numbers(\"Abai\")</code> → <code>[1, 2, 1, 9]</code>.",
    "hints": [
     "<code>ascii_lowercase.index(\"c\")</code> → 2 (counting from 0), so add 1.",
     "<code>[ascii_lowercase.index(ch) + 1 for ch in word.lower()]</code>"
    ],
    "check": {
     "tests": "assert letter_numbers(\"Abai\") == [1, 2, 1, 9], \"letter_numbers('Abai') must return [1, 2, 1, 9]\"\nassert letter_numbers(\"kz\") == [11, 26], \"letter_numbers('kz') must return [11, 26]\"\nassert letter_numbers(\"\") == [], \"Empty word → empty list\""
    }
   },
   {
    "title": "Caesar cipher",
    "prompt": "Using <code>from string import ascii_lowercase</code>, write the function <code>caesar(text, shift)</code>: each lowercase Latin letter moves along the alphabet by <code>shift</code> positions (after <code>z</code> it wraps around to <code>a</code>), other characters do not change. <code>caesar(\"hello kz\", 3)</code> → <code>\"khoor nc\"</code>. A negative <code>shift</code> decrypts the text.",
    "hints": [
     "New index: <code>(ascii_lowercase.index(ch) + shift) % 26</code>.",
     "Add characters that are not letters without changing them."
    ],
    "check": {
     "tests": "assert caesar(\"hello kz\", 3) == \"khoor nc\", \"caesar('hello kz', 3) must return 'khoor nc'\"\nassert caesar(\"xyz\", 2) == \"zab\", \"After z it starts again from a: 'zab'\"\nassert caesar(caesar(\"almaty 2026!\", 5), -5) == \"almaty 2026!\", \"A negative shift must decrypt\"\nassert caesar(\"ABC\", 1) == \"ABC\", \"Capital letters and other characters do not change\""
    }
   },
   {
    "title": "Temperature statistics",
    "prompt": "Import the standard <code>import statistics</code> module: it has <code>statistics.mean(xs)</code> (the average) and <code>statistics.median(xs)</code> (the median). The function <code>weather_report(temps)</code> must return a tuple <code>(average, median, range)</code>: the average and the median are rounded with <code>round(..., 1)</code>, the range is <code>max - min</code>.",
    "hints": [
     "<code>import statistics</code>, then <code>statistics.mean(temps)</code>.",
     "Range: <code>max(temps) - min(temps)</code>"
    ],
    "check": {
     "tests": "assert weather_report([-12, -8, -15, -3, -7]) == (-9.0, -8, 12), \"weather_report([-12, -8, -15, -3, -7]) must return (-9.0, -8, 12)\"\nassert weather_report([20, 25, 31, 22]) == (24.5, 23.5, 11), \"weather_report([20, 25, 31, 22]) must return (24.5, 23.5, 11)\""
    }
   }
  ]
 },
 "pyi-9": {
  "pr": [
   {
    "title": "Cities file",
    "prompt": "Write the list <code>cities</code> to the file <code>\"cities_pr.txt\"</code>, one city per line. Then read the file: store the number of lines in the variable <code>count</code>, and the first line (after <code>.strip()</code>) in the variable <code>first</code>.",
    "hints": [
     "Writing: <code>f.write(c + \"\\n\")</code>",
     "Reading: <code>lines = f.readlines()</code>, then <code>len(lines)</code>."
    ],
    "check": {
     "tests": "assert count == 4, \"The file must have 4 lines\"\nassert first == \"Алматы\", \"The first line must be 'Алматы'\"\nwith open(\"cities_pr.txt\", encoding=\"utf-8\") as _f:\n    assert _f.read().splitlines() == cities, \"In the file each city must be on a separate line\""
    }
   },
   {
    "title": "Reading a JSON string",
    "prompt": "The server sent order data as a JSON string. Turn it into a dictionary with <code>json.loads</code> and store it in the variable <code>order</code>. Then store the sum of the item prices in the variable <code>total</code>.",
    "hints": [
     "<code>order = json.loads(raw)</code>",
     "<code>total = sum(order[\"prices\"])</code>"
    ],
    "check": {
     "tests": "assert isinstance(order, dict), \"order must be a dictionary: json.loads(raw)\"\nassert order[\"city\"] == \"Қарағанды\" and order[\"id\"] == 105, \"order must contain id and city\"\nassert total == 4650, \"total = 1200 + 450 + 3000 = 4650\""
    }
   },
   {
    "title": "Adding to a log",
    "prompt": "The code creates the file <code>\"log_pr.txt\"</code> with the line <code>\"Басталды\"</code>. Open the file in <b>append</b> mode (<code>\"a\"</code>) and add two lines to the end: <code>\"Кіру\"</code> and <code>\"Шығу\"</code>. Then read the file and collect the cleaned lines into the list <code>lines</code>.",
    "hints": [
     "<code>open(\"log_pr.txt\", \"a\", encoding=\"utf-8\")</code> keeps the old text.",
     "Reading: <code>[line.strip() for line in f]</code>"
    ],
    "starter": "with open(\"log_pr.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"Басталды\\n\")\n\n# Write your code here\n",
    "check": {
     "tests": "assert lines == [\"Басталды\", \"Кіру\", \"Шығу\"], \"lines must be ['Басталды', 'Кіру', 'Шығу']: the old line is kept, and the new ones are added to the end\""
    }
   },
   {
    "title": "Saving high scores",
    "prompt": "Let us store the game records in a file. The function <code>save_scores(scores, path)</code> must write the dictionary to the file with <code>json.dump</code> (with <code>ensure_ascii=False</code>). The function <code>load_scores(path)</code> must read the file with <code>json.load</code> and return the dictionary.",
    "hints": [
     "Writing: <code>with open(path, \"w\", encoding=\"utf-8\") as f: json.dump(scores, f, ensure_ascii=False)</code>",
     "Reading: <code>return json.load(f)</code>"
    ],
    "check": {
     "tests": "save_scores({\"Әли\": 820, \"Дана\": 1450}, \"scores_pr.json\")\nassert load_scores(\"scores_pr.json\") == {\"Әли\": 820, \"Дана\": 1450}, \"The dictionary read back after saving must match the original\"\nwith open(\"scores_pr.json\", encoding=\"utf-8\") as _f:\n    assert \"Дана\" in _f.read(), \"Cyrillic must be stored as readable text in the file: ensure_ascii=False\"\nsave_scores({}, \"scores_pr.json\")\nassert load_scores(\"scores_pr.json\") == {}, \"When the file is written again, the old content must be erased\""
    }
   },
   {
    "title": "Best student from a file",
    "prompt": "The code creates the file <code>\"results_pr.txt\"</code>: each line holds <code>name,score</code>. Read the file line by line and calculate the variables: <code>best</code> — the name of the student with the highest score, <code>avg</code> — the average score (<code>round(..., 1)</code>).",
    "hints": [
     "Each line: <code>name, score = line.strip().split(\",\")</code>, convert the score to <code>int</code>.",
     "The best one: <code>max(rows, key=lambda r: r[1])[0]</code>"
    ],
    "check": {
     "tests": "assert best == \"Дана\", \"The highest score is Дана's (95)\"\nassert avg == 80.5, \"Average score (78 + 95 + 61 + 88) / 4 = 80.5\""
    }
   },
   {
    "title": "Restoring numeric keys",
    "prompt": "JSON turns dictionary keys into strings. A dictionary \"district code → name\" was saved to JSON and read back. The function <code>restore(text)</code> must read the JSON string (<code>json.loads</code>), turn the keys back into <code>int</code>, and return the dictionary. <code>restore('{\"1\": \"Медеу\", \"2\": \"Бостандық\"}')</code> → <code>{1: \"Медеу\", 2: \"Бостандық\"}</code>.",
    "hints": [
     "<code>json.loads(text)</code> gives a dictionary whose keys are strings.",
     "Dict comprehension: <code>{int(k): v for k, v in ...items()}</code>"
    ],
    "check": {
     "tests": "import json as _json\nassert restore('{\"1\": \"Медеу\", \"2\": \"Бостандық\"}') == {1: \"Медеу\", 2: \"Бостандық\"}, \"restore(...) must return {1: 'Медеу', 2: 'Бостандық'}\"\n_d = {10: \"Алатау\", 25: \"Түрксіб\"}\nassert restore(_json.dumps(_d, ensure_ascii=False)) == _d, \"dumps → restore must return the original dictionary\""
    }
   },
   {
    "title": "Order log",
    "prompt": "The function <code>add_order(path, order)</code> must add a new order to the list of orders stored in a JSON file, save the file again, and return the new length of the list. If the file does not exist yet (<code>FileNotFoundError</code>), start from an empty list.",
    "hints": [
     "Put the reading in a <code>try</code> block and write <code>except FileNotFoundError: orders = []</code>.",
     "After adding, write the file again in <code>\"w\"</code> mode with <code>json.dump</code>."
    ],
    "check": {
     "tests": "import os as _os, json as _json\nif _os.path.exists(\"orders_pr.json\"):\n    _os.remove(\"orders_pr.json\")\nassert add_order(\"orders_pr.json\", {\"id\": 1, \"city\": \"Алматы\"}) == 1, \"If the file does not exist, start from an empty list and return 1\"\nassert add_order(\"orders_pr.json\", {\"id\": 2, \"city\": \"Тараз\"}) == 2, \"After the second order — 2\"\nwith open(\"orders_pr.json\", encoding=\"utf-8\") as _f:\n    _saved = _json.load(_f)\nassert _saved == [{\"id\": 1, \"city\": \"Алматы\"}, {\"id\": 2, \"city\": \"Тараз\"}], \"Both orders must be stored in the file as a list\""
    }
   },
   {
    "title": "Marks report",
    "prompt": "The code creates the file <code>\"marks_pr.txt\"</code>: each line holds a pupil's name and marks separated by spaces (<code>Әли 5 4 5</code>). The function <code>make_report(src, dst)</code> must read the file, build a dictionary (name → average mark, <code>round(..., 2)</code>), save it to the JSON file <code>dst</code>, and return the dictionary. Skip empty lines.",
    "hints": [
     "<code>parts = line.split()</code>: an empty line gives an empty list, so write <code>continue</code>.",
     "Marks: <code>[int(m) for m in parts[1:]]</code>, then <code>json.dump(report, f, ensure_ascii=False)</code>."
    ],
    "check": {
     "tests": "import json as _json\n_r = make_report(\"marks_pr.txt\", \"report_pr.json\")\nassert _r == {\"Әли\": 4.67, \"Дана\": 3.5, \"Ерлан\": 4.75}, \"make_report(...) must return {'Әли': 4.67, 'Дана': 3.5, 'Ерлан': 4.75}\"\nwith open(\"report_pr.json\", encoding=\"utf-8\") as _f:\n    assert _json.load(_f) == _r, \"The report must be saved to the dst file in JSON format\""
    }
   }
  ]
 },
 "pyi-10": {
  "pr": [
   {
    "title": "Generator of even numbers",
    "prompt": "Write the generator <code>evens(limit)</code> (with <code>yield</code>): it yields the even numbers from 2 to <code>limit</code>, inclusive. <code>list(evens(9))</code> → <code>[2, 4, 6, 8]</code>.",
    "hints": [
     "In <code>while n <= limit:</code>, use <code>yield n</code> inside the loop.",
     "The function must use <code>yield</code>, not <code>return</code>."
    ],
    "check": {
     "tests": "import inspect as _inspect\nassert _inspect.isgeneratorfunction(evens), \"evens must be a generator: use yield\"\nassert list(evens(9)) == [2, 4, 6, 8], \"list(evens(9)) must return [2, 4, 6, 8]\"\nassert list(evens(10)) == [2, 4, 6, 8, 10], \"If limit is even, it is included too\"\nassert list(evens(1)) == [], \"evens(1) yields nothing\""
    }
   },
   {
    "title": "First two elements",
    "prompt": "The function <code>first_two(items)</code> must use <code>iter</code> and <code>next</code> to return the first two elements of any iterable object as a tuple. <code>first_two([\"Әли\", \"Дана\", \"Ерлан\"])</code> → <code>(\"Әли\", \"Дана\")</code>. A string must work too: <code>first_two(\"Абай\")</code> → <code>(\"А\", \"б\")</code>.",
    "hints": [
     "<code>it = iter(items)</code>",
     "Call <code>next(it)</code> twice."
    ],
    "check": {
     "tests": "assert first_two([\"Әли\", \"Дана\", \"Ерлан\"]) == (\"Әли\", \"Дана\"), \"first_two(['Әли', 'Дана', 'Ерлан']) must return ('Әли', 'Дана')\"\nassert first_two(\"Абай\") == (\"А\", \"б\"), \"first_two('Абай') must return ('А', 'б')\"\nassert first_two(x * 10 for x in range(5)) == (0, 10), \"It must also work with a generator\""
    }
   },
   {
    "title": "Number of long words",
    "prompt": "The function <code>count_long(words, n)</code> must count the words longer than <code>n</code> using a generator expression and <code>sum</code> (without an intermediate list). <code>count_long([\"ат\", \"мысық\", \"жылқы\"], 3)</code> → <code>2</code>.",
    "hints": [
     "For each matching word add 1: <code>sum(1 for w in words if ...)</code>",
     "Condition: <code>len(w) > n</code>"
    ],
    "check": {
     "tests": "assert count_long([\"ат\", \"мысық\", \"жылқы\"], 3) == 2, \"count_long(['ат', 'мысық', 'жылқы'], 3) must return 2\"\nassert count_long([\"Ақтөбе\", \"Орал\"], 10) == 0, \"No long words: 0\"\nassert count_long([], 1) == 0, \"Empty list: 0\""
    }
   },
   {
    "title": "Fibonacci generator",
    "prompt": "Write the infinite generator <code>fib()</code>: it yields the Fibonacci numbers 0, 1, 1, 2, 3, 5, 8, … (each number is the sum of the two before it).",
    "hints": [
     "Two variables: <code>a, b = 0, 1</code>",
     "Inside <code>while True:</code>, <code>yield a</code>, then <code>a, b = b, a + b</code>."
    ],
    "check": {
     "tests": "import inspect as _inspect\nassert _inspect.isgeneratorfunction(fib), \"fib must be a generator\"\n_g = fib()\n_first = [next(_g) for _ in range(8)]\nassert _first == [0, 1, 1, 2, 3, 5, 8, 13], \"The first 8 numbers: [0, 1, 1, 2, 3, 5, 8, 13]\"\nfor _ in range(43):\n    _x = next(_g)\nassert _x == 12586269025, \"F(50) = 12586269025 must be obtained (the generator is infinite)\""
    }
   },
   {
    "title": "Splitting into parts",
    "prompt": "The students are divided into groups. The generator <code>chunks(items, size)</code> must split a list into parts of <code>size</code> elements each and yield them one by one; the last part may be shorter. <code>list(chunks([1, 2, 3, 4, 5], 2))</code> → <code>[[1, 2], [3, 4], [5]]</code>.",
    "hints": [
     "<code>range(0, len(items), size)</code> gives the start index of each part.",
     "<code>yield items[i:i + size]</code>"
    ],
    "check": {
     "tests": "import inspect as _inspect\nassert _inspect.isgeneratorfunction(chunks), \"chunks must be a generator\"\nassert list(chunks([1, 2, 3, 4, 5], 2)) == [[1, 2], [3, 4], [5]], \"list(chunks([1, 2, 3, 4, 5], 2)) must return [[1, 2], [3, 4], [5]]\"\nassert list(chunks([\"Әли\", \"Дана\", \"Ерлан\"], 3)) == [[\"Әли\", \"Дана\", \"Ерлан\"]], \"One full group\"\nassert list(chunks([], 4)) == [], \"An empty list yields nothing\""
    }
   },
   {
    "title": "Skipping empty lines",
    "prompt": "The lines of a settings file are given as a list. The generator <code>clean_lines(lines)</code> must strip each line with <code>.strip()</code>, skip empty lines and comments that start with <code>#</code>, and yield the rest.",
    "hints": [
     "Condition: <code>if not line or line.startswith(\"#\"): continue</code>",
     "Yield the remaining lines with <code>yield line</code>."
    ],
    "check": {
     "tests": "import inspect as _inspect\nassert _inspect.isgeneratorfunction(clean_lines), \"clean_lines must be a generator\"\n_src = [\"# баптаулар\\n\", \"city=Алматы\\n\", \"   \\n\", \"  lang=kk  \\n\", \"#port=80\\n\"]\nassert list(clean_lines(_src)) == [\"city=Алматы\", \"lang=kk\"], \"The result must be ['city=Алматы', 'lang=kk']\"\nassert list(clean_lines([])) == [], \"An empty list yields nothing\""
    }
   },
   {
    "title": "Account balance stream",
    "prompt": "The generator <code>balances(start, ops)</code> applies the operations from the list <code>ops</code> one by one to the starting balance (positive — income, negative — spending), and yields the balance after each operation. If an operation makes the balance negative, it is <b>skipped</b> (the balance does not change and nothing is yielded).",
    "hints": [
     "Keep the balance in a variable; for each operation, check first: <code>if balance + op < 0: continue</code>.",
     "Then <code>balance += op</code> and <code>yield balance</code>."
    ],
    "check": {
     "tests": "import inspect as _inspect\nassert _inspect.isgeneratorfunction(balances), \"balances must be a generator\"\nassert list(balances(1000, [500, -200, -2000, 300])) == [1500, 1300, 1600], \"list(balances(1000, [500, -200, -2000, 300])) must return [1500, 1300, 1600]\"\nassert list(balances(0, [-1])) == [], \"An operation that leads to a negative balance is skipped\"\n_g = balances(10, [5, 5])\nassert next(_g) == 15, \"The first next() must return 15\""
    }
   },
   {
    "title": "Generator pipeline",
    "prompt": "The payment log consists of lines of the form <code>\"name;amount\"</code>. Write two generators: <code>parse(lines)</code> — from each non-empty line it yields a tuple <code>(name, int(amount))</code>; <code>big(records, limit)</code> — it yields only the records whose amount is at least <code>limit</code>. Then the function <code>big_total(lines, limit)</code> must connect the pipeline and return the total of the large payments.",
    "hints": [
     "<code>parse</code>: <code>name, amount = line.split(\";\")</code>, then <code>yield name, int(amount)</code>.",
     "Pipeline: <code>big(parse(lines), limit)</code>, then <code>sum(...)</code>."
    ],
    "check": {
     "tests": "import inspect as _inspect\nassert _inspect.isgeneratorfunction(parse) and _inspect.isgeneratorfunction(big), \"parse and big must be generators\"\n_log = [\"Әли;1500\", \"Дана;300\", \"\", \"Ерлан;5000\", \"Сая;1000\"]\nassert list(parse(_log)) == [(\"Әли\", 1500), (\"Дана\", 300), (\"Ерлан\", 5000), (\"Сая\", 1000)], \"parse skips an empty line and yields (name, amount)\"\nassert list(big(parse(_log), 1000)) == [(\"Әли\", 1500), (\"Ерлан\", 5000), (\"Сая\", 1000)], \"big(..., 1000) yields only the records with an amount of at least 1000\"\nassert big_total(_log, 1000) == 7500, \"big_total(_log, 1000) must return 7500\"\nassert big_total(_log, 10000) == 0, \"If there are no large payments, 0\""
    }
   }
  ]
 },
 "pyi-11": {
  "pr": [
   {
    "title": "Double the result",
    "prompt": "Write the decorator <code>double</code>: it multiplies the result of the decorated function by 2 and returns it. For <code>price(500)</code> with the decorator <code>@double</code>, the result is <code>1000</code>.",
    "hints": [
     "Write an inner function <code>wrapper(*args, **kwargs)</code> and return it.",
     "<code>return func(*args, **kwargs) * 2</code>"
    ],
    "check": {
     "tests": "assert price(500) == 1000, \"price(500) must return 1000\"\n@double\ndef _add(a, b):\n    return a + b\nassert _add(3, 4) == 14, \"The decorator must work with any arguments: _add(3, 4) = 14\""
    }
   },
   {
    "title": "Call counter",
    "prompt": "Write the decorator <code>count_calls</code>: each time the function is called, the attribute <code>wrapper.calls</code> must increase by 1 (it starts at 0). The result of the function must not change.",
    "hints": [
     "You can add attributes to a function: <code>wrapper.calls = 0</code> (after defining wrapper).",
     "Inside: <code>wrapper.calls += 1</code>, then <code>return func(*args, **kwargs)</code>."
    ],
    "check": {
     "tests": "assert hello.calls == 0, \"At the start hello.calls = 0\"\nassert hello(\"Дана\") == \"Сәлем, Дана\", \"The result must not change\"\nhello(\"Әли\"); hello(\"Ерлан\")\nassert hello.calls == 3, \"After three calls hello.calls = 3\""
    }
   },
   {
    "title": "Adding the tenge sign",
    "prompt": "The decorator <code>tenge</code> must turn the number returned by the function into a string such as <code>\"12500 ₸\"</code> (<code>f\"{result} ₸\"</code>). For example, for <code>total(5000, 7500)</code> with the decorator <code>@tenge</code>, the result is <code>\"12500 ₸\"</code>.",
    "hints": [
     "<code>result = func(*args, **kwargs)</code>",
     "<code>return f\"{result} ₸\"</code>"
    ],
    "check": {
     "tests": "assert total(5000, 7500) == \"12500 ₸\", \"total(5000, 7500) must return '12500 ₸'\"\nassert total() == \"0 ₸\", \"total() must return '0 ₸'\""
    }
   },
   {
    "title": "Call log",
    "prompt": "<code>log</code> is an empty list. The decorator <code>logged</code> adds the string <code>f\"{func.__name__}{args}\"</code> to the list on each call, and returns the result of the function. Use <code>functools.wraps</code> so that the function name is kept. If <code>add(2, 3)</code> is called, <code>\"add(2, 3)\"</code> goes into <code>log</code>.",
    "hints": [
     "Put <code>@wraps(func)</code> above <code>wrapper</code>.",
     "<code>log.append(f\"{func.__name__}{args}\")</code>"
    ],
    "check": {
     "tests": "log.clear()\nassert add(2, 3) == 5, \"add(2, 3) must return 5\"\nadd(10, 20)\nassert log == [\"add(2, 3)\", \"add(10, 20)\"], \"log must be ['add(2, 3)', 'add(10, 20)']\"\nassert add.__name__ == \"add\", \"Use @wraps(func): the name must stay 'add'\""
    }
   },
   {
    "title": "Admin check",
    "prompt": "In a web application, only an administrator may perform some actions. Write the decorator <code>admin_only</code>: the first argument of the function is the user's dictionary. If its <code>\"role\"</code> value is not <code>\"admin\"</code>, the function is not called and <code>\"Рұқсат жоқ\"</code> is returned; otherwise the result of the function is returned.",
    "hints": [
     "<code>def wrapper(user, *args, **kwargs):</code> — take the first argument separately.",
     "<code>if user.get(\"role\") != \"admin\": return \"Рұқсат жоқ\"</code>"
    ],
    "check": {
     "tests": "assert delete_user({\"name\": \"Дана\", \"role\": \"admin\"}, \"Тимур\") == \"Тимур өшірілді\", \"The administrator has access\"\nassert delete_user({\"name\": \"Әли\", \"role\": \"user\"}, \"Тимур\") == \"Рұқсат жоқ\", \"An ordinary user gets 'Рұқсат жоқ'\"\nassert delete_user({\"name\": \"Қонақ\"}, \"Тимур\") == \"Рұқсат жоқ\", \"If there is no role, it is still 'Рұқсат жоқ'\"\n_called = []\n@admin_only\ndef _act(user):\n    _called.append(1)\n    return \"ok\"\n_act({\"role\": \"user\"})\nassert _called == [], \"If there is no access, the function must not be called at all\""
    }
   },
   {
    "title": "Stopping a negative result",
    "prompt": "The stock balance cannot be negative. The decorator <code>not_negative</code> must return <code>0</code> if the result of the function is less than 0, otherwise the result itself. Use <code>functools.wraps</code>.",
    "hints": [
     "First <code>result = func(*args, **kwargs)</code>, then check it.",
     "<code>@wraps(func)</code> keeps the name."
    ],
    "check": {
     "tests": "assert remaining(50, 20) == 30, \"remaining(50, 20) must return 30\"\nassert remaining(10, 25) == 0, \"If the result is negative, 0\"\nassert remaining(stock=5, sold=5) == 0, \"It must work with named arguments too\"\nassert remaining.__name__ == \"remaining\", \"Use @wraps(func): the name must be kept\""
    }
   },
   {
    "title": "Fibonacci with a cache",
    "prompt": "The naive recursive function <code>fib(n)</code> is very slow. Without changing it, add the standard decorator <code>@lru_cache</code> on top (<code>from functools import lru_cache</code>). Then <code>fib(90)</code> is calculated at once. <code>fib(0) = 0</code>, <code>fib(1) = 1</code>.",
    "hints": [
     "<code>from functools import lru_cache</code>",
     "Put <code>@lru_cache</code> above <code>def fib</code>."
    ],
    "check": {
     "tests": "assert fib(10) == 55, \"fib(10) must return 55\"\nassert hasattr(fib, \"cache_info\"), \"Put @lru_cache above fib\"\nassert fib(90) == 2880067194370816120, \"fib(90) must return 2880067194370816120\"\nassert \"fib\" in fib.__wrapped__.__code__.co_names, \"fib must stay recursive\""
    }
   },
   {
    "title": "Run only once",
    "prompt": "Connecting to a database must happen only once. Write the decorator <code>once</code>: the function runs only on the <b>first</b> call; later calls do not run it again, and the first result is returned (even if the arguments are different). Use <code>functools.wraps</code>.",
    "hints": [
     "Keep the state in the attributes of wrapper: <code>wrapper.done = False</code>, <code>wrapper.result = None</code>.",
     "Inside: call <code>func</code> only if <code>if not wrapper.done:</code>."
    ],
    "check": {
     "tests": "_calls = []\n@once\ndef connect(city):\n    _calls.append(city)\n    return f\"{city} серверіне қосылды\"\nassert connect(\"Алматы\") == \"Алматы серверіне қосылды\", \"The first call runs the function\"\nassert connect(\"Астана\") == \"Алматы серверіне қосылды\", \"A later call returns the first result\"\nassert _calls == [\"Алматы\"], \"The function must run only once\"\nassert connect.__name__ == \"connect\", \"Use @wraps(func)\"\n@once\ndef _other():\n    _calls.append(\"x\")\n    return 0\nassert _other() == 0 and _other() == 0 and _calls == [\"Алматы\", \"x\"], \"The state of each decorated function must be separate\""
    }
   }
  ]
 },
 "pyi-12": {
  "pr": [
   {
    "title": "Difference in days",
    "prompt": "Using <code>from datetime import date</code>, write the function <code>days_between(d1, d2)</code>: it must return the number of days between two <code>date</code> values (always positive). <code>days_between(date(2026, 9, 1), date(2026, 12, 31))</code> → <code>121</code>.",
    "hints": [
     "The difference of two dates is a <code>timedelta</code>, which has the attribute <code>.days</code>.",
     "Remove the sign: <code>abs(...)</code>"
    ],
    "check": {
     "tests": "assert days_between(date(2026, 9, 1), date(2026, 12, 31)) == 121, \"1 September to 31 December: 121 days\"\nassert days_between(date(2027, 3, 22), date(2027, 3, 1)) == 21, \"If the dates are in reverse order, the number of days is still positive: 21\"\nassert days_between(date(2026, 1, 1), date(2026, 1, 1)) == 0, \"One day: 0\""
    }
   },
   {
    "title": "Day of the week",
    "prompt": "The function <code>weekday_name(text)</code> must read a date in the <code>\"dd.mm.yyyy\"</code> format with <code>datetime.strptime</code> and return the name of the day of the week in Kazakh. The list <code>DAYS</code> is ready: 0 — дүйсенбі, …, 6 — жексенбі (<code>.weekday()</code>). <code>weekday_name(\"16.12.2026\")</code> → <code>\"сәрсенбі\"</code>.",
    "hints": [
     "<code>datetime.strptime(text, \"%d.%m.%Y\")</code>",
     "<code>DAYS[d.weekday()]</code>"
    ],
    "check": {
     "tests": "assert weekday_name(\"16.12.2026\") == \"сәрсенбі\", \"16.12.2026 — сәрсенбі\"\nassert weekday_name(\"22.03.2027\") == \"дүйсенбі\", \"22.03.2027 — дүйсенбі\"\nassert weekday_name(\"01.01.2028\") == \"сенбі\", \"01.01.2028 — сенбі\""
    }
   },
   {
    "title": "Most frequent letter",
    "prompt": "Using <code>Counter</code>, write the function <code>top_letter(word)</code>: it must return the letter that occurs most often in the word. <code>top_letter(\"қарағанды\")</code> → <code>\"а\"</code>.",
    "hints": [
     "<code>Counter(word)</code> counts each letter.",
     "<code>.most_common(1)</code> → <code>[(\"а\", 4)]</code>, so take <code>[0][0]</code>."
    ],
    "check": {
     "tests": "assert top_letter(\"қарағанды\") == \"а\", \"top_letter('қарағанды') must return 'а'\"\nassert top_letter(\"жеңешесі\") == \"е\", \"top_letter('жеңешесі') must return 'е'\"\nassert top_letter(\"ммм\") == \"м\", \"top_letter('ммм') must return 'м'\""
    }
   },
   {
    "title": "Grouping by city",
    "prompt": "The participants of an olympiad are given as <code>(name, city)</code> tuples. The function <code>by_city(people)</code> must use <code>defaultdict(list)</code> to build a dictionary (city → list of names, in the original order) and return the <code>defaultdict</code>.",
    "hints": [
     "<code>groups = defaultdict(list)</code>",
     "In the loop: <code>groups[city].append(name)</code> — there is no need to check whether the key exists."
    ],
    "check": {
     "tests": "_p = [(\"Әли\", \"Алматы\"), (\"Дана\", \"Астана\"), (\"Ерлан\", \"Алматы\"), (\"Сая\", \"Тараз\"), (\"Нұр\", \"Астана\")]\n_g = by_city(_p)\nassert type(_g).__name__ == \"defaultdict\", \"The result must be a defaultdict(list)\"\nassert dict(_g) == {\"Алматы\": [\"Әли\", \"Ерлан\"], \"Астана\": [\"Дана\", \"Нұр\"], \"Тараз\": [\"Сая\"]}, \"by_city(...) must give a dictionary city → list of names\"\nassert _g[\"Орал\"] == [], \"For a city that is not in the dictionary, an empty list must be returned (defaultdict)\""
    }
   },
   {
    "title": "Deadline",
    "prompt": "The function <code>deadline(start, days)</code> must read the start date in the <code>\"dd.mm.yyyy\"</code> format (<code>strptime</code>), add <code>days</code> days to it (<code>timedelta</code>), and return the result in the same format (<code>strftime</code>). <code>deadline(\"16.10.2026\", 45)</code> → <code>\"30.11.2026\"</code>.",
    "hints": [
     "<code>datetime.strptime(start, \"%d.%m.%Y\") + timedelta(days=days)</code>",
     "Back to a string: <code>.strftime(\"%d.%m.%Y\")</code>"
    ],
    "check": {
     "tests": "assert deadline(\"16.10.2026\", 45) == \"30.11.2026\", \"deadline('16.10.2026', 45) must return '30.11.2026'\"\nassert deadline(\"25.12.2026\", 10) == \"04.01.2027\", \"Crossing into the next year: '04.01.2027'\"\nassert deadline(\"28.02.2028\", 1) == \"29.02.2028\", \"2028 is a leap year: '29.02.2028'\""
    }
   },
   {
    "title": "Nearest city",
    "prompt": "Create <code>City = namedtuple(\"City\", [\"name\", \"x\", \"y\"])</code>. The function <code>closest(cities, x, y)</code> must return the name of the city nearest to the point <code>(x, y)</code> (distance: <code>abs(dx) + abs(dy)</code>). Access the fields by name: <code>c.x</code>, <code>c.name</code>.",
    "hints": [
     "<code>City = namedtuple(\"City\", [\"name\", \"x\", \"y\"])</code>",
     "<code>min(cities, key=lambda c: abs(c.x - x) + abs(c.y - y)).name</code>"
    ],
    "check": {
     "tests": "_cs = [City(\"Алматы\", 10, 2), City(\"Тараз\", 2, 3), City(\"Қонаев\", 11, 5)]\nassert _cs[0].name == \"Алматы\" and _cs[0][1] == 10, \"The namedtuple City fields: name, x, y\"\nassert closest(_cs, 0, 0) == \"Тараз\", \"Taraz is nearest to the point (0, 0)\"\nassert closest(_cs, 12, 6) == \"Қонаев\", \"Qonaev is nearest to the point (12, 6)\""
    }
   },
   {
    "title": "Sales by day of the week",
    "prompt": "Sales are given as <code>(\"2026-10-16\", amount)</code> tuples. The function <code>weekday_sales(sales)</code> must read the date with <code>strptime(..., \"%Y-%m-%d\")</code> and, using <code>defaultdict(int)</code>, build an ordinary <code>dict</code> (name of the day of the week → total amount). The names come from the list <code>DAYS</code> (0 — дүйсенбі).",
    "hints": [
     "<code>totals = defaultdict(int)</code>, then <code>totals[DAYS[d.weekday()]] += amount</code>.",
     "At the end return <code>dict(totals)</code>."
    ],
    "check": {
     "tests": "_s = [(\"2026-10-16\", 12000), (\"2026-10-17\", 8000), (\"2026-10-23\", 5000), (\"2026-10-19\", 3000)]\n_r = weekday_sales(_s)\nassert type(_r) is dict, \"The result must be an ordinary dict\"\nassert _r == {\"жұма\": 17000, \"сенбі\": 8000, \"дүйсенбі\": 3000}, \"weekday_sales(...) must return {'жұма': 17000, 'сенбі': 8000, 'дүйсенбі': 3000}\"\nassert weekday_sales([]) == {}, \"If there are no sales, an empty dictionary\""
    }
   },
   {
    "title": "Queue at a bus stop",
    "prompt": "Model the queue at a bus stop with a <code>deque</code>. The function <code>simulate(events)</code> must process the events in order: <code>\"кел:Аты\"</code> — a person joins the end of the queue; <code>\"vip:Аты\"</code> — a person joins the front of the queue (<code>appendleft</code>); <code>\"мін\"</code> — the person at the front of the queue boards the bus (if the queue is empty, nothing happens). The function must return a tuple <code>(list of those who boarded, list of those left in the queue)</code>.",
    "hints": [
     "<code>queue = deque()</code>; to take from the front, use <code>queue.popleft()</code>.",
     "Split an event: <code>kind, name = e.split(\":\")</code>"
    ],
    "check": {
     "tests": "_ev = [\"кел:Әли\", \"кел:Дана\", \"vip:Әже\", \"мін\", \"кел:Ерлан\", \"мін\", \"мін\", \"мін\"]\nassert simulate(_ev) == ([\"Әже\", \"Әли\", \"Дана\", \"Ерлан\"], []), \"Boarded: Әже, Әли, Дана, Ерлан; the queue is empty\"\nassert simulate([\"кел:Сая\", \"кел:Нұр\", \"мін\"]) == ([\"Сая\"], [\"Нұр\"]), \"simulate(['кел:Сая', 'кел:Нұр', 'мін']) must return (['Сая'], ['Нұр'])\"\nassert simulate([\"мін\", \"vip:Аян\"]) == ([], [\"Аян\"]), \"If the queue is empty, 'мін' does nothing\""
    }
   }
  ]
 },
 "pyi-13": {
  "pr": [
   {
    "title": "Wallet payment",
    "prompt": "Create your own error class: <code>NotEnoughMoney(Exception)</code>. The <code>Wallet</code> class has a <code>balance</code>. The method <code>pay(amount)</code>: if the amount is more than the balance, it must raise <code>NotEnoughMoney</code> (the balance does not change); otherwise it reduces the balance and returns the new balance.",
    "hints": [
     "<code>class NotEnoughMoney(Exception): pass</code>",
     "Check first, then change: <code>if amount > self.balance: raise NotEnoughMoney(...)</code>"
    ],
    "check": {
     "tests": "assert issubclass(NotEnoughMoney, Exception), \"NotEnoughMoney must inherit from Exception\"\n_w = Wallet(5000)\nassert _w.pay(1200) == 3800, \"pay(1200) must return the new balance 3800\"\n_e = None\ntry:\n    _w.pay(10000)\nexcept NotEnoughMoney:\n    _e = \"ok\"\nassert _e == \"ok\", \"If there is not enough money, NotEnoughMoney must be raised\"\nassert _w.balance == 3800, \"After a failed payment the balance must not change\""
    }
   },
   {
    "title": "List of operations",
    "prompt": "An account history consists of tuples such as <code>(\"deposit\", 5000)</code> and <code>(\"withdraw\", 3000)</code>. The function <code>format_history(history)</code> must turn it into a list of strings: a deposit — <code>\"+5000 ₸\"</code>, a withdrawal — <code>\"-3000 ₸\"</code>.",
    "hints": [
     "Unpack the tuple: <code>for kind, amount in history:</code>",
     "Sign: <code>\"+\" if kind == \"deposit\" else \"-\"</code>"
    ],
    "check": {
     "tests": "assert format_history([(\"deposit\", 5000), (\"withdraw\", 3000)]) == [\"+5000 ₸\", \"-3000 ₸\"], \"format_history(...) must return ['+5000 ₸', '-3000 ₸']\"\nassert format_history([]) == [], \"Empty history → empty list\"\nassert format_history([(\"withdraw\", 150)]) == [\"-150 ₸\"], \"Withdrawal: '-150 ₸'\""
    }
   },
   {
    "title": "Balance from history",
    "prompt": "The function <code>balance_from(history, start=0)</code> must apply all operations of the history to the starting balance and return the final balance: <code>\"deposit\"</code> adds, <code>\"withdraw\"</code> subtracts.",
    "hints": [
     "<code>balance = start</code>, then a loop.",
     "<code>if kind == \"deposit\": balance += amount</code>"
    ],
    "check": {
     "tests": "_h = [(\"deposit\", 5000), (\"withdraw\", 3000), (\"deposit\", 1500)]\nassert balance_from(_h) == 3500, \"balance_from(_h) must be 3500\"\nassert balance_from(_h, 10000) == 13500, \"With start=10000 it will be 13500\"\nassert balance_from([], 700) == 700, \"If there are no operations, return start\""
    }
   },
   {
    "title": "Savings account",
    "prompt": "The <code>BankAccount</code> class is ready. Write the <code>SavingsAccount</code> class that inherits from it: <code>__init__(self, owner, balance=0, rate=0.1)</code> calls <code>super()</code>; the method <code>add_interest()</code> calculates the interest (<code>round(balance * rate, 2)</code>), adds it to the balance, records <code>(\"interest\", amount)</code> in the history, and returns the amount.",
    "hints": [
     "<code>super().__init__(owner, balance)</code>, then <code>self.rate = rate</code>.",
     "<code>amount = round(self.balance * self.rate, 2)</code>"
    ],
    "check": {
     "tests": "_s = SavingsAccount(\"Айгерім\", 20000)\nassert _s.rate == 0.1 and _s.history == [], \"rate is 0.1 by default, the history is empty\"\n_s.deposit(5000)\nassert _s.add_interest() == 2500, \"25000 * 0.1 = 2500\"\nassert _s.balance == 27500, \"After the interest the balance is 27500\"\nassert _s.history == [(\"deposit\", 5000), (\"interest\", 2500)], \"('interest', 2500) must be recorded in the history\"\nassert SavingsAccount(\"Бек\", 1000, 0.035).add_interest() == 35.0, \"rate=0.035: 35.0\""
    }
   },
   {
    "title": "Bank report",
    "prompt": "Client accounts are given as a dictionary (name → balance). The function <code>report(accounts)</code> must return a list of strings: by balance from high to low (if equal, by name), each string in the form <code>\"1. Дана: 15000 ₸\"</code> (numbering from 1).",
    "hints": [
     "<code>sorted(accounts.items(), key=lambda p: (-p[1], p[0]))</code>",
     "<code>enumerate(ordered, start=1)</code> gives the numbering."
    ],
    "check": {
     "tests": "_acc = {\"Әли\": 12000, \"Дана\": 15000, \"Ерлан\": 3000, \"Бекзат\": 12000}\nassert report(_acc) == [\"1. Дана: 15000 ₸\", \"2. Бекзат: 12000 ₸\", \"3. Әли: 12000 ₸\", \"4. Ерлан: 3000 ₸\"], \"The result of report(...) is wrong: by balance from high to low, and if equal, by name\"\nassert report({}) == [], \"If there are no accounts, an empty list\""
    }
   },
   {
    "title": "Largest deposit",
    "prompt": "<code>histories</code> is a dictionary (client → operation history); a history consists of tuples such as <code>(\"deposit\", 5000)</code>. The function <code>largest_deposit(histories)</code> must return the largest deposit among all clients as a <code>(client, amount)</code> tuple. If there are no deposits, return <code>None</code>.",
    "hints": [
     "Collect all the deposits into one list: a comprehension with two <code>for</code> loops.",
     "<code>max(deposits, key=lambda d: d[1])</code>"
    ],
    "check": {
     "tests": "_h = {\"Әли\": [(\"deposit\", 5000), (\"withdraw\", 9000)], \"Дана\": [(\"deposit\", 7000), (\"deposit\", 2000)], \"Ерлан\": []}\nassert largest_deposit(_h) == (\"Дана\", 7000), \"largest_deposit(...) must return ('Дана', 7000): withdrawals are not counted\"\nassert largest_deposit({\"Сая\": [(\"withdraw\", 100)]}) is None, \"If there are no deposits, None\""
    }
   },
   {
    "title": "Transfer with a fee",
    "prompt": "The <code>Bank</code> class: <code>self.accounts</code> is a dictionary (name → balance). The method <code>transfer(src, dst, amount)</code> charges a 1% fee, but at least 100 ₸ (<code>max(100, round(amount * 0.01))</code>). <code>amount + fee</code> is taken from <code>src</code>, <code>amount</code> is added to <code>dst</code>, and the fee is collected in <code>self.fees</code>. If the amount is ≤ 0, raise <code>ValueError</code>; if the client does not exist, raise <code>KeyError</code>; if there is not enough money, raise <code>InsufficientFunds</code>. If there is any error, nothing must change.",
    "hints": [
     "Do all the checks (amount, clients, balance) <b>before</b> changing the data.",
     "<code>fee = max(100, round(amount * 0.01))</code>"
    ],
    "check": {
     "tests": "_b = Bank({\"Әли\": 50000, \"Дана\": 1000})\n_b.transfer(\"Әли\", \"Дана\", 20000)\nassert _b.accounts == {\"Әли\": 29800, \"Дана\": 21000} and _b.fees == 200, \"For a transfer of 20000 the fee is 200: Әли 29800, Дана 21000\"\n_b.transfer(\"Дана\", \"Әли\", 500)\nassert _b.accounts[\"Дана\"] == 20400 and _b.fees == 300, \"The minimum fee is 100 ₸\"\nfor _args, _exc in (((\"Әли\", \"Дана\", 0), ValueError), ((\"Әли\", \"Тимур\", 100), KeyError), ((\"Дана\", \"Әли\", 20400), InsufficientFunds)):\n    _e = None\n    try:\n        _b.transfer(*_args)\n    except _exc:\n        _e = \"ok\"\n    assert _e == \"ok\", f\"transfer{_args} must raise {_exc.__name__}\"\nassert _b.accounts == {\"Әли\": 30300, \"Дана\": 20400} and _b.fees == 300, \"Failed transfers must not change anything\""
    }
   },
   {
    "title": "Saving accounts to JSON",
    "prompt": "Let us save the bank data to a file. In the <code>Bank</code> class, <code>accounts</code> is (name → <code>BankAccount</code>). The method <code>save(path)</code> writes the dictionary <code>{name: balance}</code> to a JSON file. The function <code>load_bank(path)</code> reads the file and returns a new <code>Bank</code> with the same accounts (each account is a <code>BankAccount</code>).",
    "hints": [
     "<code>save</code>: <code>{name: acc.balance for name, acc in self.accounts.items()}</code>, then <code>json.dump</code>.",
     "<code>load_bank</code>: <code>json.load</code>, then for each pair <code>bank.open_account(name, balance)</code>."
    ],
    "check": {
     "tests": "import json as _json\n_b = Bank()\n_b.open_account(\"Әли\", 12000); _b.open_account(\"Дана\", 15500)\n_b.save(\"bank_pr.json\")\nwith open(\"bank_pr.json\", encoding=\"utf-8\") as _f:\n    assert _json.load(_f) == {\"Әли\": 12000, \"Дана\": 15500}, \"The file must contain {'Әли': 12000, 'Дана': 15500}\"\n_n = load_bank(\"bank_pr.json\")\nassert isinstance(_n, Bank) and _n is not _b, \"load_bank must return a new Bank\"\nassert isinstance(_n.accounts[\"Дана\"], BankAccount), \"Each account must be a BankAccount\"\nassert {k: a.balance for k, a in _n.accounts.items()} == {\"Әли\": 12000, \"Дана\": 15500}, \"The balances must match the file\"\nassert _n.accounts[\"Әли\"].owner == \"Әли\", \"owner must be restored correctly\""
    }
   }
  ]
 }
} });
