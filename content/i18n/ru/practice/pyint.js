// pyint practice tasks: Russian text. Code, solutions and checks are in content/practice/pyint.js.
DJ.i18n.patch({ lessons: {
 "pyi-1": {
  "pr": [
   {
    "title": "Наименьшее и наибольшее",
    "prompt": "Напишите функцию <code>min_max(xs)</code>: она должна вернуть наименьшее и наибольшее значение из списка чисел в виде <b>кортежа</b>. Например, <code>min_max([12, -3, 25, 7])</code> → <code>(-3, 25)</code>.",
    "hints": [
     "Если вернуть несколько значений через запятую, получится кортеж: <code>return a, b</code>.",
     "<code>return min(xs), max(xs)</code>"
    ],
    "check": {
     "tests": "assert min_max([12, -3, 25, 7]) == (-3, 25), \"min_max([12, -3, 25, 7]) должен вернуть (-3, 25)\"\nassert isinstance(min_max([1, 2]), tuple), \"Результат должен быть кортежем (tuple)\"\nassert min_max([5]) == (5, 5), \"Если в списке один элемент, вернуть (5, 5)\""
    }
   },
   {
    "title": "Общие буквы",
    "prompt": "Функция <code>common_letters(a, b)</code> должна вернуть <b>множество</b> букв, которые есть в обоих словах. Например, <code>common_letters(\"алма\", \"алмұрт\")</code> → <code>{\"а\", \"л\", \"м\"}</code>.",
    "hints": [
     "<code>set(\"алма\")</code> создаёт множество из букв слова.",
     "Пересечение: <code>set(a) & set(b)</code>"
    ],
    "check": {
     "tests": "assert common_letters(\"алма\", \"алмұрт\") == {\"а\", \"л\", \"м\"}, \"common_letters('алма', 'алмұрт') должен вернуть {'а', 'л', 'м'}\"\nassert common_letters(\"Астана\", \"Атырау\") == {\"А\", \"а\", \"т\"}, \"common_letters('Астана', 'Атырау') должен вернуть {'А', 'а', 'т'}\"\nassert common_letters(\"үй\", \"ат\") == set(), \"Если общих букв нет, вернуть пустое множество\""
    }
   },
   {
    "title": "Есть ли повторы",
    "prompt": "В классный журнал внесли имена учеников. Функция <code>has_duplicates(names)</code> должна вернуть <code>True</code>, если хотя бы одно имя повторяется в списке, иначе <code>False</code>. Используйте множество.",
    "hints": [
     "Множество убирает повторы: если его длина меньше длины списка, повторы есть.",
     "<code>len(set(names)) != len(names)</code>"
    ],
    "check": {
     "tests": "assert has_duplicates([\"Әли\", \"Дана\", \"Әли\"]) is True, \"has_duplicates(['Әли', 'Дана', 'Әли']) должен вернуть True\"\nassert has_duplicates([\"Әли\", \"Дана\", \"Ерлан\"]) is False, \"Если повторов нет, должно вернуться False\"\nassert has_duplicates([]) is False, \"Пустой список: повторов нет, False\""
    }
   },
   {
    "title": "Только в одном",
    "prompt": "Даны множества туристов, посетивших два музея. Функция <code>only_one(a, b)</code> должна вернуть список имён тех, кто побывал <b>только в одном</b> музее, отсортированный по алфавиту. Например, <code>only_one({\"Әли\", \"Дана\"}, {\"Дана\", \"Сая\"})</code> → <code>[\"Сая\", \"Әли\"]</code> (в алфавите Python буква <code>Ә</code> стоит в конце кириллицы).",
    "hints": [
     "Симметрическая разность: <code>a ^ b</code>.",
     "<code>sorted(...)</code> создаёт отсортированный список из множества."
    ],
    "check": {
     "tests": "assert only_one({\"Әли\", \"Дана\"}, {\"Дана\", \"Сая\"}) == [\"Сая\", \"Әли\"], \"only_one({'Әли', 'Дана'}, {'Дана', 'Сая'}) должен вернуть ['Сая', 'Әли']\"\nassert only_one({\"Арман\", \"Бекзат\", \"Нұр\"}, {\"Бекзат\"}) == [\"Арман\", \"Нұр\"], \"Те, кто побывал в обоих музеях, в результат не попадают\"\nassert only_one({\"Дана\"}, {\"Дана\"}) == [], \"Если множества одинаковые, вернуть пустой список\""
    }
   },
   {
    "title": "Свободные места",
    "prompt": "В кинотеатре место обозначается кортежем <code>(ряд, место)</code>. <code>taken</code> — словарь занятых мест: ключ — кортеж, значение — покупатель. Функция <code>free_seats(rows, cols, taken)</code> должна вернуть список свободных мест: по рядам, а внутри ряда по возрастанию места (нумерация с 1). Например, <code>free_seats(1, 3, {(1, 2): \"Дана\"})</code> → <code>[(1, 1), (1, 3)]</code>.",
    "hints": [
     "Два вложенных цикла: <code>for r in range(1, rows + 1)</code> и <code>for c in range(1, cols + 1)</code>.",
     "Проверка кортежа как ключа: <code>(r, c) not in taken</code>"
    ],
    "check": {
     "tests": "assert free_seats(1, 3, {(1, 2): \"Дана\"}) == [(1, 1), (1, 3)], \"free_seats(1, 3, {(1, 2): 'Дана'}) должен вернуть [(1, 1), (1, 3)]\"\nassert free_seats(2, 2, {(1, 1): \"Әли\", (2, 2): \"Сая\"}) == [(1, 2), (2, 1)], \"Свободные места в зале 2x2: [(1, 2), (2, 1)]\"\nassert free_seats(2, 2, {}) == [(1, 1), (1, 2), (2, 1), (2, 2)], \"Если никто не купил билет, все места свободны\""
    }
   },
   {
    "title": "Новые и вернувшиеся посетители",
    "prompt": "Вчерашние и сегодняшние посетители магазина заданы множествами. Функция <code>visitors(yesterday, today)</code> должна вернуть кортеж из трёх множеств: <code>(new, returned, lost)</code>. <code>new</code> — те, кто пришёл только сегодня, <code>returned</code> — те, кто был и вчера, и сегодня, <code>lost</code> — те, кто приходил вчера, но не пришёл сегодня.",
    "hints": [
     "Для этого достаточно операций разности <code>-</code> и пересечения <code>&</code>.",
     "<code>return today - yesterday, today & yesterday, yesterday - today</code>"
    ],
    "check": {
     "tests": "_n, _r, _l = visitors({\"Әли\", \"Дана\", \"Ерлан\"}, {\"Дана\", \"Сая\", \"Ерлан\", \"Тимур\"})\nassert _n == {\"Сая\", \"Тимур\"}, \"new: пришли только сегодня {'Сая', 'Тимур'}\"\nassert _r == {\"Дана\", \"Ерлан\"}, \"returned: были и вчера, и сегодня {'Дана', 'Ерлан'}\"\nassert _l == {\"Әли\"}, \"lost: приходили вчера, но не сегодня {'Әли'}\"\nassert visitors(set(), {\"Нұр\"}) == ({\"Нұр\"}, set(), set()), \"Если вчера никого не было, все посетители новые\""
    }
   },
   {
    "title": "Статистика баллов",
    "prompt": "Результаты олимпиады — список кортежей <code>(имя, балл)</code>. Функция <code>summary(results)</code> должна вернуть кортеж <code>(best, worst, avg)</code>: <code>best</code> — имя набравшего наибольший балл, <code>worst</code> — имя набравшего наименьший балл, <code>avg</code> — средний балл, <code>round(..., 1)</code>. Если баллы равны, берётся тот, кто стоит в списке раньше. Для пустого списка верните <code>(None, None, 0)</code>.",
    "hints": [
     "В цикле распаковывайте каждый кортеж: <code>for name, score in results:</code>",
     "Храните лучший и худший результат в двух переменных, например <code>best_name, best = results[0]</code>."
    ],
    "check": {
     "tests": "assert summary([(\"Әли\", 78), (\"Дана\", 95), (\"Ерлан\", 61), (\"Сая\", 88)]) == (\"Дана\", \"Ерлан\", 80.5), \"summary(...) должен вернуть ('Дана', 'Ерлан', 80.5)\"\nassert summary([(\"Нұр\", 50), (\"Аян\", 50)]) == (\"Нұр\", \"Нұр\", 50.0), \"Если баллы равны, берётся тот, кто раньше в списке\"\nassert summary([]) == (None, None, 0), \"Для пустого списка (None, None, 0)\""
    }
   },
   {
    "title": "Количество направлений",
    "prompt": "Поезда записаны кортежами <code>(откуда, куда)</code>. Маршрут Алматы → Астана и Астана → Алматы считается одним направлением. Функция <code>unique_routes(trips)</code> должна вернуть количество различных направлений. Например, <code>[(\"Алматы\", \"Астана\"), (\"Астана\", \"Алматы\"), (\"Алматы\", \"Шымкент\")]</code> → <code>2</code>.",
    "hints": [
     "Приведите каждое направление к одному виду: пусть первым стоит «меньший» из двух городов.",
     "Добавляйте кортежи в множество через <code>.add()</code>: повторы удалятся сами."
    ],
    "check": {
     "tests": "assert unique_routes([(\"Алматы\", \"Астана\"), (\"Астана\", \"Алматы\"), (\"Алматы\", \"Шымкент\")]) == 2, \"Алматы-Астана и Алматы-Шымкент: 2 направления\"\nassert unique_routes([(\"Атырау\", \"Ақтау\"), (\"Ақтау\", \"Атырау\"), (\"Ақтау\", \"Атырау\")]) == 1, \"Если одно направление встречается несколько раз, всё равно 1\"\nassert unique_routes([]) == 0, \"Если поездок нет, вернуть 0\"\nassert unique_routes([(\"Қостанай\", \"Орал\"), (\"Орал\", \"Павлодар\"), (\"Павлодар\", \"Қостанай\")]) == 3, \"Три разных направления: 3\""
    }
   }
  ]
 },
 "pyi-2": {
  "pr": [
   {
    "title": "Билет на автобус",
    "prompt": "Напишите функцию <code>ticket_price(age, base=200)</code>: детям до 7 лет (сам возраст 7 уже не входит) проезд бесплатный (<code>0</code>), людям до 18 лет — половина цены (<code>base // 2</code>), остальным — <code>base</code>. <code>ticket_price(10)</code> → <code>100</code>.",
    "hints": [
     "Значение по умолчанию: <code>base=200</code>.",
     "Проверяйте условия от меньшего к большему: сначала <code>age < 7</code>."
    ],
    "check": {
     "tests": "assert ticket_price(10) == 100, \"ticket_price(10) должен вернуть 100\"\nassert ticket_price(5) == 0, \"Бесплатно до 7 лет: ticket_price(5) = 0\"\nassert ticket_price(30) == 200, \"Взрослому base: ticket_price(30) = 200\"\nassert ticket_price(30, 250) == 250 and ticket_price(16, base=250) == 125, \"Если передан base, применяется именно он\""
    }
   },
   {
    "title": "Среднее значение чисел",
    "prompt": "Функция <code>average(*nums)</code> должна вернуть среднее значение любого количества числовых аргументов. Если аргументов нет, вернуть <code>0</code>. <code>average(4, 5, 3)</code> → <code>4.0</code>.",
    "hints": [
     "<code>*nums</code> собирает все аргументы в кортеж.",
     "Перед делением на пустой кортеж проверьте: <code>if not nums: return 0</code>."
    ],
    "check": {
     "tests": "assert average(4, 5, 3) == 4.0, \"average(4, 5, 3) должен вернуть 4.0\"\nassert average(10) == 10, \"average(10) должен быть 10\"\nassert average() == 0, \"Если аргументов нет, 0\""
    }
   },
   {
    "title": "Lambda-функции",
    "prompt": "Запишите три переменные с функциями <code>lambda</code>: <code>square</code> — квадрат числа; <code>is_even</code> — <code>True</code>, если число чётное; <code>full_name</code> — из двух аргументов составляет строку <code>\"Аты Тегі\"</code> (<code>full_name(\"Дана\", \"Серікова\")</code> → <code>\"Дана Серікова\"</code>).",
    "hints": [
     "<code>lambda x: x * x</code> — слово <code>return</code> не пишется.",
     "Два аргумента: <code>lambda first, last: first + \" \" + last</code>"
    ],
    "check": {
     "tests": "assert callable(square) and square.__name__ == \"<lambda>\", \"square должна быть записана через lambda\"\nassert square(7) == 49, \"square(7) должен быть 49\"\nassert is_even(10) is True and is_even(7) is False, \"is_even(10) True, is_even(7) False\"\nassert full_name(\"Дана\", \"Серікова\") == \"Дана Серікова\", \"full_name('Дана', 'Серікова') должен быть 'Дана Серікова'\"\nassert is_even.__name__ == \"<lambda>\" and full_name.__name__ == \"<lambda>\", \"Все функции должны быть lambda\""
    }
   },
   {
    "title": "Сборка адреса запроса",
    "prompt": "Функция <code>build_url(path, **params)</code> должна собрать адрес сайта: если параметры переданы, она добавляет к <code>path</code> символ <code>?</code> и соединяет пары <code>ключ=значение</code> через <code>&</code> в том порядке, в котором они переданы. Если параметров нет, вернуть только <code>path</code>. <code>build_url(\"/hotels\", city=\"Алматы\", page=2)</code> → <code>\"/hotels?city=Алматы&page=2\"</code>.",
    "hints": [
     "<code>**params</code> собирает именованные аргументы в словарь.",
     "<code>\"&\".join([f\"{k}={v}\" for k, v in params.items()])</code>"
    ],
    "check": {
     "tests": "assert build_url(\"/hotels\", city=\"Алматы\", page=2) == \"/hotels?city=Алматы&page=2\", \"build_url('/hotels', city='Алматы', page=2) должен вернуть '/hotels?city=Алматы&page=2'\"\nassert build_url(\"/news\") == \"/news\", \"Если параметров нет, вернуть только path\"\nassert build_url(\"/search\", q=\"домбыра\") == \"/search?q=домбыра\", \"Один параметр: '/search?q=домбыра'\""
    }
   },
   {
    "title": "Добавить товар в корзину",
    "prompt": "Функция <code>add_item(item, cart=None)</code> добавляет товар в корзину и возвращает корзину. Если <code>cart</code> не передан, при каждом вызове должен создаваться <b>новый</b> пустой список (не попадайтесь на ловушку изменяемого значения по умолчанию). <code>add_item(\"Нан\")</code> → <code>[\"Нан\"]</code>, а следующий вызов <code>add_item(\"Сүт\")</code> → <code>[\"Сүт\"]</code>.",
    "hints": [
     "В качестве значения по умолчанию укажите <code>None</code>.",
     "Внутри: <code>if cart is None: cart = []</code>"
    ],
    "check": {
     "tests": "assert add_item(\"Нан\") == [\"Нан\"], \"add_item('Нан') должен вернуть ['Нан']\"\nassert add_item(\"Сүт\") == [\"Сүт\"], \"Каждый новый вызов должен начинаться с пустой корзины: ['Сүт']\"\n_c = [\"Шай\"]\nassert add_item(\"Қант\", _c) == [\"Шай\", \"Қант\"] and _c == [\"Шай\", \"Қант\"], \"Если передана корзина, товар добавляется в неё\""
    }
   },
   {
    "title": "Объединение слов",
    "prompt": "Функция <code>join_words(*words, sep=\" \")</code> должна соединить все слова через <code>sep</code>. <code>join_words(\"Алматы\", \"Астана\", sep=\" → \")</code> → <code>\"Алматы → Астана\"</code>. Проверим, что слова можно передать и списком: <code>join_words(*[\"а\", \"б\"])</code>.",
    "hints": [
     "<code>*words</code> — это кортеж, его объединяет <code>sep.join(words)</code>.",
     "Параметр <code>sep</code> пишется после <code>*words</code>."
    ],
    "check": {
     "tests": "assert join_words(\"Алматы\", \"Астана\", sep=\" → \") == \"Алматы → Астана\", \"join_words('Алматы', 'Астана', sep=' → ') должен вернуть 'Алматы → Астана'\"\nassert join_words(\"Қайырлы\", \"таң\") == \"Қайырлы таң\", \"Разделитель по умолчанию — пробел\"\nassert join_words(*[\"а\", \"б\", \"в\"], sep=\"-\") == \"а-б-в\", \"Список можно передать со звёздочкой: 'а-б-в'\"\nassert join_words() == \"\", \"Если слов нет, пустая строка\""
    }
   },
   {
    "title": "Последовательные скидки",
    "prompt": "Функция <code>apply_discounts(price, *percents, min_price=0)</code> должна применить скидки к цене <b>по очереди</b>: каждый процент считается от результата предыдущего. Если итоговая цена меньше <code>min_price</code>, вернуть <code>min_price</code>. Результат округлить: <code>round(..., 2)</code>. <code>apply_discounts(10000, 10, 20)</code> → <code>7200.0</code> (10000 → 9000 → 7200).",
    "hints": [
     "Цикл: <code>for p in percents: price = price * (1 - p / 100)</code>",
     "В конце <code>max(price, min_price)</code>, затем <code>round</code>."
    ],
    "check": {
     "tests": "assert apply_discounts(10000, 10, 20) == 7200.0, \"apply_discounts(10000, 10, 20) должен вернуть 7200.0\"\nassert apply_discounts(5000) == 5000, \"Если скидок нет, цена не меняется\"\nassert apply_discounts(10000, 50, 50, min_price=3000) == 3000, \"2500 < 3000, поэтому min_price = 3000\"\nassert apply_discounts(999, 15) == 849.15, \"apply_discounts(999, 15) должен вернуть 849.15\""
    }
   },
   {
    "title": "Профиль резюме",
    "prompt": "Функция <code>make_profile(name, *skills, **contacts)</code> должна вернуть словарь: <code>\"name\"</code> — имя, <code>\"skills\"</code> — <b>список</b> навыков (в том порядке, в котором они переданы), а каждая пара из <code>contacts</code> добавляется в словарь как отдельный ключ. <code>make_profile(\"Дана\", \"Python\", \"SQL\", city=\"Алматы\")</code> → <code>{\"name\": \"Дана\", \"skills\": [\"Python\", \"SQL\"], \"city\": \"Алматы\"}</code>.",
    "hints": [
     "<code>skills</code> — кортеж, превратите его в список через <code>list(skills)</code>.",
     "Пройдите циклом по <code>contacts.items()</code> и добавьте ключи."
    ],
    "check": {
     "tests": "assert make_profile(\"Дана\", \"Python\", \"SQL\", city=\"Алматы\") == {\"name\": \"Дана\", \"skills\": [\"Python\", \"SQL\"], \"city\": \"Алматы\"}, \"make_profile('Дана', 'Python', 'SQL', city='Алматы') вернул неверный результат\"\nassert make_profile(\"Ерлан\") == {\"name\": \"Ерлан\", \"skills\": []}, \"Если навыков нет, skills — пустой список\"\n_info = {\"phone\": \"+77011234567\", \"email\": \"aru@mail.kz\"}\nassert make_profile(\"Ару\", *[\"Excel\"], **_info) == {\"name\": \"Ару\", \"skills\": [\"Excel\"], \"phone\": \"+77011234567\", \"email\": \"aru@mail.kz\"}, \"Список и словарь можно распаковать через * и **\""
    }
   }
  ]
 },
 "pyi-3": {
  "pr": [
   {
    "title": "Самое длинное название города",
    "prompt": "Функция <code>longest_city(cities)</code> должна вернуть название самого длинного города (через <code>max</code> и <code>key</code>). Если длины равны, вернуть тот, что стоит в списке первым. <code>longest_city([\"Талдықорған\", \"Алматы\", \"Тараз\"])</code> → <code>\"Талдықорған\"</code>.",
    "hints": [
     "<code>key=len</code> — сравнивать названия по длине.",
     "<code>return max(cities, key=len)</code>"
    ],
    "check": {
     "tests": "assert longest_city([\"Алматы\", \"Талдықорған\", \"Тараз\"]) == \"Талдықорған\", \"longest_city(['Алматы', 'Талдықорған', 'Тараз']) должен вернуть 'Талдықорған'\"\nassert longest_city([\"Орал\", \"Ақтау\", \"Атырау\"]) == \"Атырау\", \"Самое длинное — 'Атырау'\"\nassert longest_city([\"Сатпаев\", \"Шымкент\"]) == \"Сатпаев\", \"Если длины равны, вернуть первый\""
    }
   },
   {
    "title": "Доллары в тенге",
    "prompt": "Функция <code>to_tenge(prices, rate)</code> должна перевести список цен в долларах в тенге с помощью <code>map</code> и вернуть <b>список</b>: каждая цена — <code>round(p * rate)</code>. <code>to_tenge([10, 2.5], 500)</code> → <code>[5000, 1250]</code>.",
    "hints": [
     "<code>map(lambda p: ..., prices)</code> применяет функцию к каждому элементу.",
     "Результат <code>map</code> оберните в <code>list(...)</code>."
    ],
    "check": {
     "tests": "assert to_tenge([10, 2.5], 500) == [5000, 1250], \"to_tenge([10, 2.5], 500) должен вернуть [5000, 1250]\"\nassert to_tenge([1.99], 480) == [955], \"round(1.99 * 480) = 955\"\nassert to_tenge([], 500) == [], \"Пустой список → пустой список\""
    }
   },
   {
    "title": "Тёплые дни",
    "prompt": "Заданы температуры воздуха в феврале. Функция <code>warm_days(temps)</code> должна с помощью <code>filter</code> вернуть список температур выше 0 в исходном порядке. <code>warm_days([-5, 2, 0, 4, -1])</code> → <code>[2, 4]</code>.",
    "hints": [
     "<code>filter(lambda t: t > 0, temps)</code>",
     "Результат оберните в <code>list(...)</code>."
    ],
    "check": {
     "tests": "assert warm_days([-5, 2, 0, 4, -1]) == [2, 4], \"warm_days([-5, 2, 0, 4, -1]) должен вернуть [2, 4]\"\nassert warm_days([-10, -3]) == [], \"Если тёплых дней нет, пустой список\"\nassert warm_days([1, 1, 3]) == [1, 1, 3], \"Если все дни тёплые, список не меняется\""
    }
   },
   {
    "title": "Рейтинг учеников",
    "prompt": "Ученики заданы словарями <code>{\"name\": ..., \"grade\": ...}</code>. Функция <code>rank(students)</code> должна вернуть список имён: сначала по убыванию оценки, а при равных оценках — по алфавиту имени. Используйте <code>sorted</code> и <code>key</code>.",
    "hints": [
     "Ключ-кортеж: <code>key=lambda s: (-s[\"grade\"], s[\"name\"])</code>",
     "После сортировки возьмите только имена."
    ],
    "check": {
     "tests": "_st = [{\"name\": \"Ерлан\", \"grade\": 4}, {\"name\": \"Айгүл\", \"grade\": 5}, {\"name\": \"Бекзат\", \"grade\": 4}, {\"name\": \"Дана\", \"grade\": 5}]\nassert rank(_st) == [\"Айгүл\", \"Дана\", \"Бекзат\", \"Ерлан\"], \"Результат должен быть ['Айгүл', 'Дана', 'Бекзат', 'Ерлан']\"\nassert rank([{\"name\": \"Нұр\", \"grade\": 3}]) == [\"Нұр\"], \"Один ученик: ['Нұр']\""
    }
   },
   {
    "title": "Самый дешёвый товар",
    "prompt": "Названия товаров и их цены записаны в двух отдельных списках. Функция <code>cheapest(names, prices)</code> должна с помощью <code>zip</code> сопоставить их и вернуть <b>название</b> самого дешёвого товара (<code>min</code> и <code>key</code>). <code>cheapest([\"Нан\", \"Сүт\", \"Шай\"], [250, 520, 1300])</code> → <code>\"Нан\"</code>.",
    "hints": [
     "<code>zip(names, prices)</code> даёт пары: (\"Нан\", 250), ...",
     "<code>min(..., key=lambda p: p[1])[0]</code>"
    ],
    "check": {
     "tests": "assert cheapest([\"Нан\", \"Сүт\", \"Шай\"], [250, 520, 1300]) == \"Нан\", \"cheapest(['Нан', 'Сүт', 'Шай'], [250, 520, 1300]) должен вернуть 'Нан'\"\nassert cheapest([\"Ірімшік\", \"Айран\", \"Қымыз\"], [2400, 380, 900]) == \"Айран\", \"Самый дешёвый — 'Айран' (380)\""
    }
   },
   {
    "title": "Позиции элемента",
    "prompt": "Функция <code>positions(xs, target)</code> должна с помощью <code>enumerate</code> найти, на каких индексах в списке стоит значение <code>target</code>, и вернуть список индексов (с 0). <code>positions([\"Алматы\", \"Астана\", \"Алматы\"], \"Алматы\")</code> → <code>[0, 2]</code>.",
    "hints": [
     "<code>for i, x in enumerate(xs)</code> даёт и индекс, и значение.",
     "<code>[i for i, x in enumerate(xs) if x == target]</code>"
    ],
    "check": {
     "tests": "assert positions([\"Алматы\", \"Астана\", \"Алматы\"], \"Алматы\") == [0, 2], \"positions(['Алматы', 'Астана', 'Алматы'], 'Алматы') должен вернуть [0, 2]\"\nassert positions([5, 3, 5, 5], 5) == [0, 2, 3], \"positions([5, 3, 5, 5], 5) должен вернуть [0, 2, 3]\"\nassert positions([1, 2], 9) == [], \"Если не найдено, пустой список\""
    }
   },
   {
    "title": "Лучшие N игроков",
    "prompt": "<code>scores</code> — словарь (игрок → очки). Функция <code>top_n(scores, n)</code> должна вернуть список имён <code>n</code> игроков с наибольшим количеством очков: по убыванию очков, а при равенстве — по алфавиту имени. Если <code>n</code> больше числа игроков, верните всех.",
    "hints": [
     "Отсортируйте пары <code>scores.items()</code> по <code>key=lambda p: (-p[1], p[0])</code>.",
     "Срез <code>[:n]</code> не выдаёт ошибку, даже если он длиннее списка."
    ],
    "check": {
     "tests": "_s = {\"Әли\": 820, \"Дана\": 1450, \"Ерлан\": 990, \"Айбек\": 990, \"Сая\": 1210}\nassert top_n(_s, 3) == [\"Дана\", \"Сая\", \"Айбек\"], \"top_n(_s, 3) должен вернуть ['Дана', 'Сая', 'Айбек'] (Айбек и Ерлан равны, по алфавиту)\"\nassert top_n(_s, 1) == [\"Дана\"], \"top_n(_s, 1) должен вернуть ['Дана']\"\nassert top_n({\"Нұр\": 5}, 10) == [\"Нұр\"], \"Если n больше, верните всех\""
    }
   },
   {
    "title": "Самый прибыльный день",
    "prompt": "Дни недели, выручка и расходы заданы тремя списками. Функция <code>best_day(days, income, costs)</code> должна с помощью <code>zip</code> объединить их и вернуть день с наибольшей прибылью (выручка − расход) и саму прибыль в виде кортежа: <code>(\"сәрсенбі\", 41000)</code>. При равной прибыли берётся более ранний день.",
    "hints": [
     "<code>zip</code> объединяет все три списка: <code>for d, i, c in zip(days, income, costs)</code>.",
     "Составьте список пар (день, прибыль) и возьмите <code>max(..., key=lambda p: p[1])</code>."
    ],
    "check": {
     "tests": "_d = [\"дүйсенбі\", \"сейсенбі\", \"сәрсенбі\"]\nassert best_day(_d, [50000, 62000, 70000], [20000, 30000, 29000]) == (\"сәрсенбі\", 41000), \"Результат должен быть ('сәрсенбі', 41000)\"\nassert best_day([\"жұма\", \"сенбі\"], [10000, 15000], [5000, 10000]) == (\"жұма\", 5000), \"При равной прибыли берётся более ранний день\""
    }
   }
  ]
 },
 "pyi-4": {
  "pr": [
   {
    "title": "Квадраты чисел",
    "prompt": "Напишите функцию <code>squares(n)</code> с помощью dict comprehension: она должна вернуть словарь, где каждое число от 1 до <code>n</code> сопоставлено с его квадратом. <code>squares(3)</code> → <code>{1: 1, 2: 4, 3: 9}</code>.",
    "hints": [
     "<code>{i: i * i for i in ...}</code>",
     "<code>range(1, n + 1)</code> включает и последнее число n."
    ],
    "check": {
     "tests": "assert squares(3) == {1: 1, 2: 4, 3: 9}, \"squares(3) должен вернуть {1: 1, 2: 4, 3: 9}\"\nassert squares(0) == {}, \"squares(0) — пустой словарь\"\nassert squares(10)[10] == 100 and len(squares(10)) == 10, \"squares(10) содержит 10 ключей, 10 → 100\""
    }
   },
   {
    "title": "Множество заглавных букв",
    "prompt": "Напишите функцию <code>first_letters(names)</code> с помощью set comprehension: она должна вернуть множество без повторов из первых букв имён, приведённых к заглавной (<code>.upper()</code>). <code>first_letters([\"арман\", \"Айгүл\", \"дана\"])</code> → <code>{\"А\", \"Д\"}</code>.",
    "hints": [
     "<code>n[0]</code> — первая буква.",
     "<code>{n[0].upper() for n in names}</code>"
    ],
    "check": {
     "tests": "assert first_letters([\"арман\", \"Айгүл\", \"дана\"]) == {\"А\", \"Д\"}, \"first_letters(['арман', 'Айгүл', 'дана']) должен вернуть {'А', 'Д'}\"\nassert first_letters([\"Ерлан\", \"ерке\", \"Өмір\"]) == {\"Е\", \"Ө\"}, \"first_letters(['Ерлан', 'ерке', 'Өмір']) должен вернуть {'Е', 'Ө'}\"\nassert first_letters([]) == set(), \"Пустой список → пустое множество\""
    }
   },
   {
    "title": "Товары на складе",
    "prompt": "Функция <code>in_stock(stock)</code> должна по словарю склада (товар → количество) вернуть новый словарь, в котором остались только товары с количеством больше 0. Используйте dict comprehension.",
    "hints": [
     "<code>for name, q in stock.items()</code>",
     "Условие в конце: <code>if q > 0</code>"
    ],
    "check": {
     "tests": "assert in_stock({\"Нан\": 12, \"Сүт\": 0, \"Шай\": 4}) == {\"Нан\": 12, \"Шай\": 4}, \"in_stock({'Нан': 12, 'Сүт': 0, 'Шай': 4}) должен вернуть {'Нан': 12, 'Шай': 4}\"\nassert in_stock({\"Май\": 0}) == {}, \"Если всё распродано, пустой словарь\""
    }
   },
   {
    "title": "Буквенные оценки",
    "prompt": "Функция <code>letters(scores)</code> должна по словарю (имя → балл) составить словарь (имя → буква): 90 и выше — <code>\"A\"</code>, 75 и выше — <code>\"B\"</code>, остальное — <code>\"C\"</code>. Напишите один dict comprehension, в значении используйте выражение <code>if ... else</code>.",
    "hints": [
     "Цепочка выбора: <code>\"A\" if s >= 90 else \"B\" if s >= 75 else \"C\"</code>",
     "Элементы не фильтруются, выбирается только значение."
    ],
    "check": {
     "tests": "assert letters({\"Әли\": 92, \"Дана\": 75, \"Ерлан\": 60}) == {\"Әли\": \"A\", \"Дана\": \"B\", \"Ерлан\": \"C\"}, \"letters({'Әли': 92, 'Дана': 75, 'Ерлан': 60}) должен вернуть {'Әли': 'A', 'Дана': 'B', 'Ерлан': 'C'}\"\nassert letters({\"Сая\": 90, \"Нұр\": 74}) == {\"Сая\": \"A\", \"Нұр\": \"C\"}, \"90 → A, 74 → C\"\nassert letters({}) == {}, \"Пустой словарь → пустой словарь\""
    }
   },
   {
    "title": "Города-миллионники",
    "prompt": "Функция <code>millions(pop)</code> должна из словаря (город → число жителей) взять только города с 1 000 000 жителей и более и показать число жителей в миллионах: <code>round(p / 1_000_000, 1)</code>. <code>{\"Алматы\": 2_250_000, \"Тараз\": 380_000}</code> → <code>{\"Алматы\": 2.2}</code>.",
    "hints": [
     "Условие фильтра в конце: <code>if p >= 1_000_000</code>",
     "Значение: <code>round(p / 1_000_000, 1)</code>"
    ],
    "check": {
     "tests": "assert millions({\"Алматы\": 2_250_000, \"Тараз\": 380_000}) == {\"Алматы\": 2.2}, \"millions(...) должен вернуть {'Алматы': 2.2}\"\nassert millions({\"Астана\": 1_420_000, \"Шымкент\": 1_200_000, \"Орал\": 330_000}) == {\"Астана\": 1.4, \"Шымкент\": 1.2}, \"Астана 1.4, Шымкент 1.2 — в результат не попадают, Орал тоже\"\nassert millions({\"Ақтау\": 260_000}) == {}, \"Если городов-миллионников нет, пустой словарь\""
    }
   },
   {
    "title": "Все теги",
    "prompt": "В каждой записи блога есть список тегов. Функция <code>all_tags(posts)</code> должна вернуть множество всех тегов из всех записей, приведённых к нижнему регистру (<code>.lower()</code>), без повторов. Напишите один set comprehension с двумя <code>for</code>.",
    "hints": [
     "Два <code>for</code>: <code>for tags in posts for tag in tags</code>",
     "<code>{tag.lower() for tags in posts for tag in tags}</code>"
    ],
    "check": {
     "tests": "assert all_tags([[\"Python\", \"Алматы\"], [\"python\", \"IT\"], []]) == {\"python\", \"алматы\", \"it\"}, \"all_tags(...) должен вернуть {'python', 'алматы', 'it'}\"\nassert all_tags([]) == set(), \"Если записей нет, пустое множество\""
    }
   },
   {
    "title": "Количество студентов в группе",
    "prompt": "Студенты заданы кортежами <code>(имя, группа)</code>. Функция <code>group_sizes(students)</code> должна вернуть словарь (группа → количество студентов). Не используйте цикл, напишите comprehension: сначала получите множество групп с помощью set comprehension, затем в dict comprehension посчитайте студентов каждой группы.",
    "hints": [
     "Группы: <code>{g for _, g in students}</code>",
     "Подсчёт: <code>sum(1 for _, gg in students if gg == g)</code>"
    ],
    "check": {
     "tests": "_st = [(\"Әли\", \"IT-21\"), (\"Дана\", \"IT-22\"), (\"Ерлан\", \"IT-21\"), (\"Сая\", \"IT-21\"), (\"Нұр\", \"IT-22\")]\nassert group_sizes(_st) == {\"IT-21\": 3, \"IT-22\": 2}, \"group_sizes(...) должен вернуть {'IT-21': 3, 'IT-22': 2}\"\nassert group_sizes([]) == {}, \"Если студентов нет, пустой словарь\"\nassert group_sizes([(\"Аян\", \"ФМ-1\")]) == {\"ФМ-1\": 1}, \"Один студент: {'ФМ-1': 1}\""
    }
   },
   {
    "title": "Самые низкие цены",
    "prompt": "Заданы цены в нескольких магазинах: <code>shops</code> — словарь (магазин → (товар → цена)). Функция <code>lowest_prices(shops)</code> должна вернуть словарь, в котором для каждого товара указана его самая низкая цена во всех магазинах. Товар может отсутствовать в некоторых магазинах. Используйте comprehension.",
    "hints": [
     "Сначала множество всех названий товаров: <code>{p for prices in shops.values() for p in prices}</code>.",
     "Самая низкая цена: <code>min(pr[p] for pr in shops.values() if p in pr)</code>"
    ],
    "check": {
     "tests": "_shops = {\"Magnum\": {\"Нан\": 240, \"Сүт\": 520}, \"Small\": {\"Нан\": 260, \"Сүт\": 490, \"Шай\": 1300}, \"Анвар\": {\"Шай\": 1250}}\nassert lowest_prices(_shops) == {\"Нан\": 240, \"Сүт\": 490, \"Шай\": 1250}, \"lowest_prices(...) должен вернуть {'Нан': 240, 'Сүт': 490, 'Шай': 1250}\"\nassert lowest_prices({}) == {}, \"Если магазинов нет, пустой словарь\""
    }
   }
  ]
 },
 "pyi-5": {
  "pr": [
   {
    "title": "Сумма чисел",
    "prompt": "Напишите рекурсивную функцию <code>sum_to(n)</code>: она должна вернуть сумму 1 + 2 + … + n (<code>n</code> ≥ 0, <code>sum_to(0) = 0</code>). Не используйте цикл и <code>sum</code>. <code>sum_to(5)</code> → <code>15</code>.",
    "hints": [
     "Базовый случай: <code>if n == 0: return 0</code>",
     "Рекурсивный шаг: <code>n + sum_to(n - 1)</code>"
    ],
    "check": {
     "tests": "assert sum_to(5) == 15, \"sum_to(5) должен вернуть 15\"\nassert sum_to(0) == 0, \"sum_to(0) должен вернуть 0\"\nassert sum_to(100) == 5050, \"sum_to(100) должен вернуть 5050\"\nassert \"sum_to\" in sum_to.__code__.co_names, \"Функция должна вызывать сама себя (рекурсия)\""
    }
   },
   {
    "title": "Разворот строки",
    "prompt": "Рекурсивная функция <code>reverse(s)</code> должна вернуть строку в обратном порядке. Не используйте срез <code>[::-1]</code> и цикл: пустая строка — базовый случай, иначе <code>reverse(s[1:]) + s[0]</code>. <code>reverse(\"Абай\")</code> → <code>\"йабА\"</code>.",
    "hints": [
     "Базовый случай: <code>if s == \"\": return \"\"</code>",
     "<code>return reverse(s[1:]) + s[0]</code>"
    ],
    "check": {
     "tests": "assert reverse(\"Абай\") == \"йабА\", \"reverse('Абай') должен вернуть 'йабА'\"\nassert reverse(\"\") == \"\", \"Пустая строка → пустая строка\"\nassert reverse(\"қала\") == \"алақ\", \"reverse('қала') должен вернуть 'алақ'\"\nassert \"reverse\" in reverse.__code__.co_names, \"Функция должна вызывать сама себя (рекурсия)\""
    }
   },
   {
    "title": "Количество цифр",
    "prompt": "Рекурсивная функция <code>count_digits(n)</code> должна вернуть количество цифр натурального числа (без <code>str</code> и цикла). Если <code>n < 10</code> — 1, иначе <code>1 + count_digits(n // 10)</code>. <code>count_digits(2026)</code> → <code>4</code>.",
    "hints": [
     "<code>n // 10</code> отбрасывает последнюю цифру.",
     "Базовый случай: <code>if n < 10: return 1</code>"
    ],
    "check": {
     "tests": "assert count_digits(2026) == 4, \"count_digits(2026) должен вернуть 4\"\nassert count_digits(7) == 1, \"count_digits(7) должен вернуть 1\"\nassert count_digits(1000000) == 7, \"count_digits(1000000) должен вернуть 7\"\nassert \"count_digits\" in count_digits.__code__.co_names, \"Функция должна вызывать сама себя (рекурсия)\""
    }
   },
   {
    "title": "Наибольший элемент списка",
    "prompt": "Рекурсивная функция <code>biggest(xs)</code> должна вернуть наибольший элемент непустого списка. Не используйте <code>max</code> и цикл: если остался один элемент — он и есть ответ, иначе сравните первый элемент с результатом <code>biggest(xs[1:])</code> и возьмите большее.",
    "hints": [
     "Базовый случай: <code>if len(xs) == 1: return xs[0]</code>",
     "<code>rest = biggest(xs[1:])</code>, затем сравните с <code>xs[0]</code>."
    ],
    "check": {
     "tests": "assert biggest([3, 17, 8, 21, 5]) == 21, \"biggest([3, 17, 8, 21, 5]) должен вернуть 21\"\nassert biggest([42]) == 42, \"Один элемент: 42\"\nassert biggest([-7, -2, -9]) == -2, \"Для отрицательных чисел: -2\"\nassert \"biggest\" in biggest.__code__.co_names, \"Функция должна вызывать сама себя (рекурсия)\""
    }
   },
   {
    "title": "Проверка палиндрома",
    "prompt": "Рекурсивная функция <code>is_palindrome(s)</code> должна вернуть <code>True</code>, если слово читается одинаково с обоих концов. Если длина 0 или 1 — <code>True</code>; если первая и последняя буквы разные — <code>False</code>; иначе проверьте середину (<code>s[1:-1]</code>). <code>is_palindrome(\"қазақ\")</code> → <code>True</code>.",
    "hints": [
     "Два базовых случая: длина ≤ 1 и разные крайние буквы.",
     "<code>return is_palindrome(s[1:-1])</code>"
    ],
    "check": {
     "tests": "assert is_palindrome(\"қазақ\") is True, \"is_palindrome('қазақ') должен вернуть True\"\nassert is_palindrome(\"алма\") is False, \"is_palindrome('алма') должен вернуть False\"\nassert is_palindrome(\"\") is True and is_palindrome(\"а\") is True, \"Пустая строка и одна буква — палиндром\"\nassert is_palindrome(\"абба\") is True, \"is_palindrome('абба') должен вернуть True\"\nassert \"is_palindrome\" in is_palindrome.__code__.co_names, \"Функция должна вызывать сама себя (рекурсия)\""
    }
   },
   {
    "title": "Наибольший общий делитель",
    "prompt": "Напишите алгоритм Евклида с рекурсией: <code>gcd(a, b)</code>. Если <code>b == 0</code>, ответ — <code>a</code>; иначе <code>gcd(b, a % b)</code>. Например, 48 яблок и 36 груш делят на одинаковые наборы: наибольшее число наборов — <code>gcd(48, 36)</code> → <code>12</code>.",
    "hints": [
     "Базовый случай: <code>if b == 0: return a</code>",
     "<code>return gcd(b, a % b)</code>"
    ],
    "check": {
     "tests": "assert gcd(48, 36) == 12, \"gcd(48, 36) должен вернуть 12\"\nassert gcd(17, 5) == 1, \"gcd(17, 5) должен вернуть 1\"\nassert gcd(100, 0) == 100, \"gcd(100, 0) должен вернуть 100\"\nassert gcd(270, 192) == 6, \"gcd(270, 192) должен вернуть 6\"\nassert \"gcd\" in gcd.__code__.co_names, \"Функция должна вызывать сама себя (рекурсия)\""
    }
   },
   {
    "title": "Сумма вложенных списков",
    "prompt": "Продажи филиалов магазина хранятся во вложенных списках (регион → город → магазин). Рекурсивная функция <code>nested_sum(items)</code> должна вернуть сумму всех чисел на любой глубине. <code>nested_sum([10, [20, [30]], 40])</code> → <code>100</code>.",
    "hints": [
     "Проверьте, является ли элемент списком: <code>isinstance(x, list)</code>.",
     "Если это список — добавьте результат <code>nested_sum(x)</code>."
    ],
    "check": {
     "tests": "assert nested_sum([10, [20, [30]], 40]) == 100, \"nested_sum([10, [20, [30]], 40]) должен вернуть 100\"\nassert nested_sum([]) == 0, \"Пустой список → 0\"\nassert nested_sum([[[[5]]], [], [1, [2, 3]]]) == 11, \"Глубокие и пустые вложенные списки: 11\"\nassert \"nested_sum\" in nested_sum.__code__.co_names, \"Функция должна вызывать сама себя (рекурсия)\""
    }
   },
   {
    "title": "Глубина списка",
    "prompt": "Рекурсивная функция <code>depth(items)</code> должна вернуть глубину вложенности списка: глубина списка без вложенных списков равна 1, иначе 1 + наибольшая глубина вложенных списков. <code>depth([1, 2])</code> → <code>1</code>, <code>depth([1, [2, [3]], [4]])</code> → <code>3</code>, <code>depth([])</code> → <code>1</code>.",
    "hints": [
     "Сохраните наибольшую глубину вложенных списков в переменной (вначале 0).",
     "В конце <code>return 1 + deepest</code>"
    ],
    "check": {
     "tests": "assert depth([1, 2]) == 1, \"depth([1, 2]) должен вернуть 1\"\nassert depth([1, [2, [3]], [4]]) == 3, \"depth([1, [2, [3]], [4]]) должен вернуть 3\"\nassert depth([]) == 1, \"depth([]) должен вернуть 1\"\nassert depth([[[[]]]]) == 4, \"depth([[[[]]]]) должен вернуть 4\"\nassert \"depth\" in depth.__code__.co_names, \"Функция должна вызывать сама себя (рекурсия)\""
    }
   }
  ]
 },
 "pyi-6": {
  "pr": [
   {
    "title": "Класс прямоугольника",
    "prompt": "Напишите класс <code>Rectangle</code>: <code>__init__(self, width, height)</code> сохраняет два атрибута; метод <code>area()</code> возвращает площадь, <code>perimeter()</code> — периметр. Например, участок 20 × 15 м: площадь 300, периметр 70.",
    "hints": [
     "<code>self.width = width</code>, <code>self.height = height</code>",
     "Периметр: <code>2 * (self.width + self.height)</code>"
    ],
    "check": {
     "tests": "_r = Rectangle(20, 15)\nassert _r.width == 20 and _r.height == 15, \"__init__ должен сохранять width и height\"\nassert _r.area() == 300, \"Rectangle(20, 15).area() должен вернуть 300\"\nassert _r.perimeter() == 70, \"Rectangle(20, 15).perimeter() должен вернуть 70\"\nassert Rectangle(1, 1).area() == 1, \"Каждый объект использует свои размеры\""
    }
   },
   {
    "title": "Термометр",
    "prompt": "Напишите класс <code>Thermometer</code>: <code>__init__(self, city, celsius)</code>; метод <code>fahrenheit()</code> возвращает <code>celsius * 9 / 5 + 32</code>; метод <code>is_frost()</code> возвращает <code>True</code>, если температура ниже 0.",
    "hints": [
     "Первый параметр каждого метода — <code>self</code>.",
     "<code>return self.celsius * 9 / 5 + 32</code>"
    ],
    "check": {
     "tests": "_t = Thermometer(\"Астана\", -20)\nassert _t.city == \"Астана\" and _t.celsius == -20, \"Должны сохраняться city и celsius\"\nassert _t.fahrenheit() == -4.0, \"-20 °C = -4.0 °F\"\nassert _t.is_frost() is True, \"-20 °C — мороз: True\"\nassert Thermometer(\"Шымкент\", 35).is_frost() is False, \"35 °C не мороз: False\""
    }
   },
   {
    "title": "Описание города",
    "prompt": "Напишите класс <code>City</code>: <code>__init__(self, name, population)</code>. Метод <code>__str__</code> должен возвращать строку <code>\"Алматы: 2250000 адам\"</code>, а <code>__repr__</code> — <code>\"City('Алматы', 2250000)\"</code>.",
    "hints": [
     "<code>__str__</code> — для <code>print</code>, <code>__repr__</code> — для показа внутри списка.",
     "<code>!r</code> берёт строку в кавычки: <code>f\"City({self.name!r}, {self.population})\"</code>"
    ],
    "check": {
     "tests": "_c = City(\"Алматы\", 2250000)\nassert str(_c) == \"Алматы: 2250000 адам\", \"str(City('Алматы', 2250000)) должен быть 'Алматы: 2250000 адам'\"\nassert repr(_c) == \"City('Алматы', 2250000)\", \"repr: City('Алматы', 2250000)\"\nassert str([City(\"Орал\", 330000)]) == \"[City('Орал', 330000)]\", \"Внутри списка используется __repr__\""
    }
   },
   {
    "title": "Корзина покупок",
    "prompt": "Напишите класс <code>Cart</code>. У каждой корзины свой список <code>items</code> (вначале пустой). Метод <code>add(name, price, qty=1)</code> добавляет в список кортеж <code>(name, price, qty)</code>; <code>total()</code> — общая сумма; <code>count()</code> — общее количество штук товаров.",
    "hints": [
     "Создайте список в <code>__init__</code> через <code>self.items = []</code>, тогда у каждой корзины будет свой список.",
     "<code>total</code>: для каждого кортежа прибавьте <code>price * qty</code>."
    ],
    "check": {
     "tests": "_a = Cart(); _b = Cart()\n_a.add(\"Нан\", 250, 2); _a.add(\"Ірімшік\", 2400)\nassert _a.items == [(\"Нан\", 250, 2), (\"Ірімшік\", 2400, 1)], \"add должен добавлять кортеж (name, price, qty), qty по умолчанию 1\"\nassert _a.total() == 2900, \"total() = 250*2 + 2400 = 2900\"\nassert _a.count() == 3, \"count() = 2 + 1 = 3\"\nassert _b.items == [] and _b.total() == 0, \"Список каждой корзины должен быть отдельным\""
    }
   },
   {
    "title": "Пробег автомобилей",
    "prompt": "Класс <code>Car</code>: атрибут класса <code>total_km = 0</code> хранит общий пробег всех машин. У каждой машины есть <code>plate</code> (номер) и <code>km = 0</code>. Метод <code>drive(distance)</code> увеличивает и <code>km</code> машины, и <code>Car.total_km</code>.",
    "hints": [
     "Меняйте атрибут класса через <code>Car.total_km += distance</code>.",
     "Атрибут объекта: <code>self.km += distance</code>"
    ],
    "check": {
     "tests": "_t0 = Car.total_km\n_x = Car(\"777ABA02\"); _y = Car(\"123KZ01\")\nassert _x.km == 0, \"Начальный km = 0\"\n_x.drive(120); _y.drive(30); _x.drive(50)\nassert _x.km == 170 and _y.km == 30, \"km каждой машины считается отдельно\"\nassert Car.total_km == _t0 + 200, \"Car.total_km должен быть суммой всего пробега\"\nassert \"total_km\" not in vars(_x), \"Меняйте Car.total_km, а не self.total_km\""
    }
   },
   {
    "title": "Оценки учеников",
    "prompt": "Напишите класс <code>Pupil</code>: <code>__init__(self, name)</code>, у каждого ученика пустой список <code>marks</code>. Метод <code>add_mark(m)</code> добавляет оценку только если она от 1 до 5, и возвращает <code>True</code>; иначе не добавляет и возвращает <code>False</code>. Метод <code>best()</code> возвращает наивысшую оценку, а если оценок нет — <code>None</code>.",
    "hints": [
     "Проверка: <code>if 1 <= m <= 5:</code>",
     "<code>best</code>: при пустом списке <code>None</code>, иначе <code>max(self.marks)</code>."
    ],
    "check": {
     "tests": "_p = Pupil(\"Аружан\")\nassert _p.marks == [] and _p.best() is None, \"Вначале marks пуст, best() равен None\"\nassert _p.add_mark(4) is True and _p.add_mark(5) is True, \"При правильной оценке True\"\nassert _p.add_mark(7) is False and _p.add_mark(0) is False, \"При оценке вне диапазона 1–5 False\"\nassert _p.marks == [4, 5], \"Неверные оценки не должны добавляться: [4, 5]\"\nassert _p.best() == 5, \"best() = 5\""
    }
   },
   {
    "title": "Банковская карта",
    "prompt": "Напишите класс <code>Card</code>: <code>__init__(self, owner, pin, balance=0)</code>; <code>blocked = False</code>; количество неверных PIN-кодов <code>tries = 0</code>. Метод <code>withdraw(pin, amount)</code>: если карта заблокирована — возвращает <code>\"бұғатталған\"</code>; если PIN неверный — <code>tries</code> увеличивается, при 3 карта блокируется, и возвращается <code>\"қате PIN\"</code>; если PIN верный — <code>tries</code> обнуляется; если денег не хватает — возвращается <code>\"қаражат жеткіліксіз\"</code>, иначе баланс уменьшается и возвращается <code>\"сәтті\"</code>.",
    "hints": [
     "Порядок проверок: блокировка → PIN → баланс.",
     "При неверном PIN: <code>self.tries += 1</code>, <code>if self.tries >= 3: self.blocked = True</code>"
    ],
    "check": {
     "tests": "_c = Card(\"Дана\", \"1234\", 50000)\nassert _c.withdraw(\"1234\", 20000) == \"сәтті\" and _c.balance == 30000, \"Верный PIN: 'сәтті', баланс 30000\"\nassert _c.withdraw(\"1234\", 99999) == \"қаражат жеткіліксіз\" and _c.balance == 30000, \"Если денег не хватает: 'қаражат жеткіліксіз', баланс не меняется\"\nassert _c.withdraw(\"0000\", 100) == \"қате PIN\" and _c.tries == 1, \"Неверный PIN: tries 1\"\nassert _c.withdraw(\"1234\", 1000) == \"сәтті\" and _c.tries == 0, \"Верный PIN обнуляет tries\"\nfor _ in range(3):\n    _c.withdraw(\"1111\", 100)\nassert _c.blocked is True, \"После 3 неверных PIN подряд карта блокируется\"\nassert _c.withdraw(\"1234\", 100) == \"бұғатталған\" and _c.balance == 29000, \"Заблокированная карта деньги не выдаёт\""
    }
   },
   {
    "title": "Лифт",
    "prompt": "Напишите класс <code>Elevator</code>: <code>__init__(self, floors)</code>, лифт стоит на <code>current = 1</code> этаже, <code>history = [1]</code>. Метод <code>go(floor)</code>: если этаж от 1 до <code>floors</code>, лифт едет туда, этаж добавляется в <code>history</code>, возвращается <code>True</code>; иначе ничего не меняется, возвращается <code>False</code>. Метод <code>distance()</code> — общее число пройденных этажей (сумма модулей разностей соседних записей).",
    "hints": [
     "В <code>go</code> сначала проверьте границы.",
     "<code>distance</code>: сумма <code>abs(self.history[i] - self.history[i - 1])</code>."
    ],
    "check": {
     "tests": "_e = Elevator(9)\nassert _e.current == 1 and _e.history == [1], \"Лифт начинает с 1 этажа\"\nassert _e.go(5) is True and _e.go(2) is True, \"Поездка на существующий этаж — True\"\nassert _e.go(12) is False and _e.go(0) is False, \"Поездка на несуществующий этаж — False\"\nassert _e.current == 2 and _e.history == [1, 5, 2], \"Неверный запрос не меняет history\"\n_e.go(9)\nassert _e.distance() == 4 + 3 + 7, \"distance() = |5-1| + |2-5| + |9-2| = 14\"\nassert Elevator(5).distance() == 0, \"У нового лифта distance() = 0\""
    }
   }
  ]
 },
 "pyi-7": {
  "pr": [
   {
    "title": "Зарплата менеджера",
    "prompt": "Класс <code>Employee</code> готов. Напишите класс <code>Manager</code>, который наследует его: <code>__init__(self, name, salary, bonus)</code> вызывает родителя через <code>super()</code> и сохраняет <code>bonus</code>. Для <code>Manager</code> переопределите метод <code>total()</code>: <code>salary + bonus</code>.",
    "hints": [
     "<code>class Manager(Employee):</code>",
     "<code>super().__init__(name, salary)</code>, затем <code>self.bonus = bonus</code>"
    ],
    "check": {
     "tests": "_m = Manager(\"Ерлан\", 450000, 100000)\nassert isinstance(_m, Employee), \"Manager должен наследоваться от Employee\"\nassert _m.name == \"Ерлан\" and _m.salary == 450000 and _m.bonus == 100000, \"Должны сохраняться name, salary, bonus\"\nassert _m.total() == 550000, \"Manager.total() = salary + bonus = 550000\"\nassert Employee(\"Дана\", 300000).total() == 300000, \"Employee.total() не меняется\""
    }
   },
   {
    "title": "Сумма денег",
    "prompt": "Добавьте в класс <code>Money</code> два dunder-метода: <code>__add__</code> складывает две суммы и возвращает <b>новый</b> объект <code>Money</code>; <code>__eq__</code> возвращает <code>True</code>, если суммы равны. <code>Money(500) + Money(700) == Money(1200)</code> → <code>True</code>.",
    "hints": [
     "<code>def __add__(self, other): return Money(self.amount + other.amount)</code>",
     "<code>def __eq__(self, other): return self.amount == other.amount</code>"
    ],
    "check": {
     "tests": "_s = Money(500) + Money(700)\nassert isinstance(_s, Money), \"Результат сложения должен быть объектом Money\"\nassert _s.amount == 1200, \"Сумма Money(500) + Money(700) равна 1200\"\nassert Money(1200) == _s, \"Объекты Money с одинаковыми суммами равны (__eq__)\"\nassert not (Money(1) == Money(2)), \"Если суммы разные, объекты не равны\""
    }
   },
   {
    "title": "Члены команды",
    "prompt": "Класс <code>Team</code> хранит список игроков. Добавьте методы <code>__len__</code> (количество участников) и <code>__contains__</code> (<code>\"Дана\" in team</code>).",
    "hints": [
     "<code>def __len__(self): return len(self.members)</code>",
     "<code>def __contains__(self, player): return player in self.members</code>"
    ],
    "check": {
     "tests": "_t = Team(\"Қайрат\", [\"Әли\", \"Дана\", \"Ерлан\"])\nassert len(_t) == 3, \"len(team) должен возвращать количество участников: 3\"\nassert \"Дана\" in _t, \"'Дана' in team должен быть True\"\nassert \"Тимур\" not in _t, \"'Тимур' не член команды\"\nassert len(Team(\"Астана\", [])) == 0, \"Пустая команда: 0\""
    }
   },
   {
    "title": "Площади фигур",
    "prompt": "В родительском классе <code>Shape</code> метод <code>area()</code> возвращает 0. Напишите два класса-наследника: <code>Square(side)</code> и <code>Circle(r)</code> (площадь <code>3.14 * r * r</code>), каждый переопределяет <code>area()</code>. Затем функция <code>total_area(shapes)</code> складывает площади всех фигур и возвращает <code>round(..., 2)</code>.",
    "hints": [
     "В классе <code>class Square(Shape):</code> напишите <code>__init__</code> и <code>area</code>.",
     "Функция <code>total_area</code> не знает вид фигуры, она только вызывает <code>s.area()</code>."
    ],
    "check": {
     "tests": "assert isinstance(Square(2), Shape) and isinstance(Circle(1), Shape), \"Square и Circle должны наследоваться от Shape\"\nassert Square(4).area() == 16, \"Square(4).area() должен вернуть 16\"\nassert Circle(10).area() == 314.0, \"Circle(10).area() должен вернуть 314.0\"\nassert total_area([Square(3), Circle(2), Shape()]) == 21.56, \"9 + 12.56 + 0 = 21.56\"\nassert total_area([]) == 0, \"Если фигур нет, 0\""
    }
   },
   {
    "title": "Операции с векторами",
    "prompt": "Для движения персонажа в игре напишите класс <code>Vector(x, y)</code>: <code>__add__</code> складывает координаты и возвращает новый <code>Vector</code>; <code>__eq__</code> возвращает <code>True</code>, если координаты равны; <code>__repr__</code> возвращает <code>\"Vector(3, 4)\"</code>.",
    "hints": [
     "<code>__add__</code> возвращает новый объект: <code>Vector(self.x + other.x, self.y + other.y)</code>.",
     "<code>__repr__</code>: <code>f\"Vector({self.x}, {self.y})\"</code>"
    ],
    "check": {
     "tests": "_v = Vector(1, 2) + Vector(2, 2)\nassert _v == Vector(3, 4), \"Vector(1, 2) + Vector(2, 2) должен быть равен Vector(3, 4)\"\nassert repr(_v) == \"Vector(3, 4)\", \"repr: 'Vector(3, 4)'\"\nassert not (Vector(0, 1) == Vector(1, 0)), \"Векторы с разными координатами не равны\"\n_p = Vector(0, 0)\nfor _step in [Vector(1, 0), Vector(1, 0), Vector(0, -1)]:\n    _p = _p + _step\nassert _p == Vector(2, -1), \"Сумма шагов — Vector(2, -1)\""
    }
   },
   {
    "title": "Сравнение товаров",
    "prompt": "Добавьте в класс <code>Product(name, price)</code> метод <code>__lt__</code> (сравнение по цене), чтобы <code>sorted</code> и <code>min</code> работали без <code>key</code>. Затем функция <code>cheapest(products)</code> возвращает <b>название</b> самого дешёвого товара, а функция <code>by_price(products)</code> возвращает список названий по возрастанию цены.",
    "hints": [
     "<code>def __lt__(self, other): return self.price < other.price</code>",
     "<code>min(products).name</code> и <code>sorted(products)</code>"
    ],
    "check": {
     "tests": "_ps = [Product(\"Шапан\", 45000), Product(\"Домбыра\", 30000), Product(\"Кесе\", 1500)]\nassert Product(\"а\", 1) < Product(\"б\", 2), \"__lt__ должен сравнивать по цене\"\nassert cheapest(_ps) == \"Кесе\", \"cheapest(...) должен вернуть 'Кесе'\"\nassert by_price(_ps) == [\"Кесе\", \"Домбыра\", \"Шапан\"], \"by_price(...) должен вернуть ['Кесе', 'Домбыра', 'Шапан']\""
    }
   },
   {
    "title": "Стоимость проезда",
    "prompt": "Городской транспорт: родительский класс <code>Transport</code> (метод <code>fare(km)</code> возвращает 0). Напишите три дочерних класса: <code>Bus</code> — 200 ₸ за любое расстояние; <code>Metro</code> — 150 ₸; <code>Taxi</code> — посадка 400 ₸ и 150 ₸ за каждый км. Функция <code>trip_cost(legs)</code> возвращает общую стоимость по списку кортежей <code>(транспорт, км)</code>.",
    "hints": [
     "Каждый дочерний класс переопределяет метод <code>fare(self, km)</code> по-своему.",
     "<code>trip_cost</code>: <code>sum(t.fare(km) for t, km in legs)</code>"
    ],
    "check": {
     "tests": "assert all(isinstance(_t, Transport) for _t in (Bus(), Metro(), Taxi())), \"Bus, Metro, Taxi должны наследоваться от Transport\"\nassert Bus().fare(15) == 200 and Metro().fare(3) == 150, \"Автобус 200, метро 150\"\nassert Taxi().fare(6) == 1300, \"Taxi().fare(6) = 400 + 6*150 = 1300\"\nassert trip_cost([(Bus(), 8), (Metro(), 5), (Taxi(), 2)]) == 1050, \"200 + 150 + 700 = 1050\"\nassert trip_cost([]) == 0, \"Если поездок нет, 0\""
    }
   },
   {
    "title": "Книжная полка",
    "prompt": "Класс <code>Shelf</code> хранит список названий книг. Добавьте dunder-методы: <code>__len__</code> — количество книг; <code>__getitem__(i)</code> — название по <code>shelf[i]</code>; <code>__contains__</code> — <code>\"Абай жолы\" in shelf</code>; <code>__add__</code> — новая <code>Shelf</code> из двух полок (сначала книги первой, потом второй, без повторов).",
    "hints": [
     "В <code>__getitem__(self, i)</code> верните <code>return self.books[i]</code>.",
     "В <code>__add__</code>: сделайте копию и циклом добавьте книги второй полки (повторяющиеся пропускайте)."
    ],
    "check": {
     "tests": "_a = Shelf([\"Абай жолы\", \"Көшпенділер\"])\n_b = Shelf([\"Көшпенділер\", \"Қан мен тер\"])\nassert len(_a) == 2 and _a[0] == \"Абай жолы\" and _a[-1] == \"Көшпенділер\", \"__len__ и __getitem__ должны работать правильно\"\nassert \"Абай жолы\" in _a and \"Қан мен тер\" not in _a, \"__contains__ должен работать правильно\"\n_c = _a + _b\nassert isinstance(_c, Shelf) and _c.books == [\"Абай жолы\", \"Көшпенділер\", \"Қан мен тер\"], \"a + b: новая Shelf без повторов\"\nassert _a.books == [\"Абай жолы\", \"Көшпенділер\"], \"Сложение не должно менять исходную полку\""
    }
   }
  ]
 },
 "pyi-8": {
  "pr": [
   {
    "title": "Площадь круга",
    "prompt": "Импортируйте <code>from math import pi</code> и напишите функцию <code>circle_area(r)</code>: она должна вернуть <code>pi * r * r</code>, округлённое через <code>round(..., 2)</code>. Например, клумба радиусом 5 м: <code>circle_area(5)</code> → <code>78.54</code>.",
    "hints": [
     "<code>from math import pi</code> — импортируйте только нужное имя.",
     "<code>round(pi * r * r, 2)</code>"
    ],
    "check": {
     "tests": "assert circle_area(5) == 78.54, \"circle_area(5) должен вернуть 78.54\"\nassert circle_area(1) == 3.14, \"circle_area(1) должен вернуть 3.14\"\nassert circle_area(0) == 0, \"circle_area(0) должен вернуть 0\""
    }
   },
   {
    "title": "Гипотенуза",
    "prompt": "Напишите <code>import math</code> и функцию <code>hypotenuse(a, b)</code>: она должна вычислить гипотенузу прямоугольного треугольника через <code>math.sqrt(a * a + b * b)</code> и вернуть её, округлённую через <code>round(..., 1)</code>. <code>hypotenuse(3, 4)</code> → <code>5.0</code>.",
    "hints": [
     "<code>import math</code>, затем <code>math.sqrt(...)</code>.",
     "<code>round(math.sqrt(a * a + b * b), 1)</code>"
    ],
    "check": {
     "tests": "assert hypotenuse(3, 4) == 5.0, \"hypotenuse(3, 4) должен вернуть 5.0\"\nassert hypotenuse(1, 1) == 1.4, \"hypotenuse(1, 1) должен вернуть 1.4\"\nassert hypotenuse(6, 8) == 10.0, \"hypotenuse(6, 8) должен вернуть 10.0\""
    }
   },
   {
    "title": "Удаление знаков препинания",
    "prompt": "Импортируйте <code>from string import punctuation</code> (<code>punctuation</code> — строка знаков препинания вида <code>!\"#$%&...</code>). Функция <code>clean(text)</code> должна удалить из текста все эти знаки и вернуть результат. <code>clean(\"Сәлем, әлем!\")</code> → <code>\"Сәлем әлем\"</code>.",
    "hints": [
     "Проверяйте каждый символ: <code>ch not in punctuation</code>.",
     "<code>\"\".join(ch for ch in text if ch not in punctuation)</code>"
    ],
    "check": {
     "tests": "assert clean(\"Сәлем, әлем!\") == \"Сәлем әлем\", \"clean('Сәлем, әлем!') должен вернуть 'Сәлем әлем'\"\nassert clean(\"Иә... (мүмкін)\") == \"Иә мүмкін\", \"clean('Иә... (мүмкін)') должен вернуть 'Иә мүмкін'\"\nassert clean(\"Алматы\") == \"Алматы\", \"Текст без знаков препинания не меняется\""
    }
   },
   {
    "title": "Упаковка в коробки",
    "prompt": "На складе товары упаковывают в коробки. Используя <code>import math</code>, напишите функцию <code>pack(items, per_box)</code>, которая вернёт кортеж <code>(boxes, empty)</code>: <code>boxes</code> — нужное количество коробок (<code>math.ceil</code>), <code>empty</code> — количество свободных мест в последней коробке. <code>pack(23, 10)</code> → <code>(3, 7)</code>.",
    "hints": [
     "<code>boxes = math.ceil(items / per_box)</code>",
     "Свободные места: <code>boxes * per_box - items</code>"
    ],
    "check": {
     "tests": "assert pack(23, 10) == (3, 7), \"pack(23, 10) должен вернуть (3, 7)\"\nassert pack(20, 10) == (2, 0), \"pack(20, 10) должен вернуть (2, 0)\"\nassert pack(1, 12) == (1, 11), \"pack(1, 12) должен вернуть (1, 11)\""
    }
   },
   {
    "title": "Розыгрыш призов",
    "prompt": "Лотерея на школьном вечере. Напишите <code>import random</code> и функцию <code>pick_winner(names, seed)</code>: сначала вызовите <code>random.seed(seed)</code>, затем верните результат <code>random.choice(names)</code>. Одинаковый <code>seed</code> всегда даёт одного победителя, поэтому результат можно проверить.",
    "hints": [
     "<code>random.seed(seed)</code> фиксирует последовательность случайных чисел.",
     "<code>return random.choice(names)</code>"
    ],
    "check": {
     "tests": "import random as _random\n_names = [\"Әли\", \"Дана\", \"Ерлан\", \"Сая\", \"Тимур\", \"Мадина\"]\nfor _seed in (1, 7, 2026):\n    _random.seed(_seed)\n    _exp = _random.choice(_names)\n    assert pick_winner(_names, _seed) == _exp, f\"При seed={_seed} победитель должен быть {_exp}\"\nassert pick_winner([\"Нұр\"], 5) == \"Нұр\", \"Если участник один, он и побеждает\""
    }
   },
   {
    "title": "Номера букв",
    "prompt": "Импортируйте <code>from string import ascii_lowercase</code> — латинский алфавит (<code>\"abc...z\"</code>). Функция <code>letter_numbers(word)</code> должна вернуть список номеров каждой буквы слова в алфавите (с 1). Слово может быть с заглавной буквы: используйте <code>.lower()</code>. <code>letter_numbers(\"Abai\")</code> → <code>[1, 2, 1, 9]</code>.",
    "hints": [
     "<code>ascii_lowercase.index(\"c\")</code> → 2 (с 0), поэтому прибавьте 1.",
     "<code>[ascii_lowercase.index(ch) + 1 for ch in word.lower()]</code>"
    ],
    "check": {
     "tests": "assert letter_numbers(\"Abai\") == [1, 2, 1, 9], \"letter_numbers('Abai') должен вернуть [1, 2, 1, 9]\"\nassert letter_numbers(\"kz\") == [11, 26], \"letter_numbers('kz') должен вернуть [11, 26]\"\nassert letter_numbers(\"\") == [], \"Пустое слово → пустой список\""
    }
   },
   {
    "title": "Шифр Цезаря",
    "prompt": "Используя <code>from string import ascii_lowercase</code>, напишите функцию <code>caesar(text, shift)</code>: каждая строчная латинская буква сдвигается по алфавиту на <code>shift</code> позиций (после <code>z</code> снова идёт <code>a</code>), остальные символы не меняются. <code>caesar(\"hello kz\", 3)</code> → <code>\"khoor nc\"</code>. Отрицательный <code>shift</code> расшифровывает текст.",
    "hints": [
     "Новый индекс: <code>(ascii_lowercase.index(ch) + shift) % 26</code>.",
     "Символы, которые не буквы, добавляйте без изменений."
    ],
    "check": {
     "tests": "assert caesar(\"hello kz\", 3) == \"khoor nc\", \"caesar('hello kz', 3) должен вернуть 'khoor nc'\"\nassert caesar(\"xyz\", 2) == \"zab\", \"После z идёт a: 'zab'\"\nassert caesar(caesar(\"almaty 2026!\", 5), -5) == \"almaty 2026!\", \"Отрицательный shift должен расшифровывать\"\nassert caesar(\"ABC\", 1) == \"ABC\", \"Заглавные буквы и прочие символы не меняются\""
    }
   },
   {
    "title": "Статистика температуры",
    "prompt": "Подключите стандартный модуль <code>import statistics</code>: в нём есть <code>statistics.mean(xs)</code> (среднее) и <code>statistics.median(xs)</code> (медиана). Функция <code>weather_report(temps)</code> должна вернуть кортеж <code>(среднее, медиана, амплитуда)</code>: среднее и медиана округляются через <code>round(..., 1)</code>, амплитуда — <code>max - min</code>.",
    "hints": [
     "<code>import statistics</code>, затем <code>statistics.mean(temps)</code>.",
     "Амплитуда: <code>max(temps) - min(temps)</code>"
    ],
    "check": {
     "tests": "assert weather_report([-12, -8, -15, -3, -7]) == (-9.0, -8, 12), \"weather_report([-12, -8, -15, -3, -7]) должен вернуть (-9.0, -8, 12)\"\nassert weather_report([20, 25, 31, 22]) == (24.5, 23.5, 11), \"weather_report([20, 25, 31, 22]) должен вернуть (24.5, 23.5, 11)\""
    }
   }
  ]
 },
 "pyi-9": {
  "pr": [
   {
    "title": "Файл с городами",
    "prompt": "Запишите список <code>cities</code> в файл <code>\"cities_pr.txt\"</code>, по одному городу на строку. Затем прочитайте файл, количество строк сохраните в переменную <code>count</code>, а первую строку (после <code>.strip()</code>) — в переменную <code>first</code>.",
    "hints": [
     "Запись: <code>f.write(c + \"\\n\")</code>",
     "Чтение: <code>lines = f.readlines()</code>, затем <code>len(lines)</code>."
    ],
    "check": {
     "tests": "assert count == 4, \"В файле должно быть 4 строки\"\nassert first == \"Алматы\", \"Первая строка должна быть 'Алматы'\"\nwith open(\"cities_pr.txt\", encoding=\"utf-8\") as _f:\n    assert _f.read().splitlines() == cities, \"В файле каждый город должен стоять на отдельной строке\""
    }
   },
   {
    "title": "Чтение JSON-строки",
    "prompt": "Сервер прислал данные заказа в виде JSON-строки. Превратите её в словарь с помощью <code>json.loads</code> и запишите в переменную <code>order</code>. Затем в переменную <code>total</code> запишите сумму цен товаров.",
    "hints": [
     "<code>order = json.loads(raw)</code>",
     "<code>total = sum(order[\"prices\"])</code>"
    ],
    "check": {
     "tests": "assert isinstance(order, dict), \"order должен быть словарём: json.loads(raw)\"\nassert order[\"city\"] == \"Қарағанды\" and order[\"id\"] == 105, \"В order должны быть id и city\"\nassert total == 4650, \"total = 1200 + 450 + 3000 = 4650\""
    }
   },
   {
    "title": "Добавление в журнал",
    "prompt": "Код создаёт файл <code>\"log_pr.txt\"</code> со строкой <code>\"Басталды\"</code>. Откройте файл в режиме <b>добавления</b> (<code>\"a\"</code>) и допишите в конец две строки: <code>\"Кіру\"</code> и <code>\"Шығу\"</code>. Затем прочитайте файл и соберите очищенные строки в список <code>lines</code>.",
    "hints": [
     "<code>open(\"log_pr.txt\", \"a\", encoding=\"utf-8\")</code> сохраняет старый текст.",
     "Чтение: <code>[line.strip() for line in f]</code>"
    ],
    "starter": "with open(\"log_pr.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"Басталды\\n\")\n\n# Напишите код здесь\n",
    "check": {
     "tests": "assert lines == [\"Басталды\", \"Кіру\", \"Шығу\"], \"lines должен быть ['Басталды', 'Кіру', 'Шығу']: старая строка сохраняется, новые дописываются в конец\""
    }
   },
   {
    "title": "Сохранение рекордов",
    "prompt": "Сохраним рекорды игры в файл. Функция <code>save_scores(scores, path)</code> должна записать словарь в файл через <code>json.dump</code> (с <code>ensure_ascii=False</code>). Функция <code>load_scores(path)</code> должна прочитать файл через <code>json.load</code> и вернуть словарь.",
    "hints": [
     "Запись: <code>with open(path, \"w\", encoding=\"utf-8\") as f: json.dump(scores, f, ensure_ascii=False)</code>",
     "Чтение: <code>return json.load(f)</code>"
    ],
    "check": {
     "tests": "save_scores({\"Әли\": 820, \"Дана\": 1450}, \"scores_pr.json\")\nassert load_scores(\"scores_pr.json\") == {\"Әли\": 820, \"Дана\": 1450}, \"Словарь, прочитанный после сохранения, должен совпадать с исходным\"\nwith open(\"scores_pr.json\", encoding=\"utf-8\") as _f:\n    assert \"Дана\" in _f.read(), \"В файле кириллица должна читаться как текст: ensure_ascii=False\"\nsave_scores({}, \"scores_pr.json\")\nassert load_scores(\"scores_pr.json\") == {}, \"При повторной записи старое содержимое должно стираться\""
    }
   },
   {
    "title": "Лучший ученик из файла",
    "prompt": "Код создаёт файл <code>\"results_pr.txt\"</code>: в каждой строке записано <code>имя,балл</code>. Прочитайте файл построчно и вычислите переменные: <code>best</code> — имя ученика с наивысшим баллом, <code>avg</code> — средний балл (<code>round(..., 1)</code>).",
    "hints": [
     "Каждая строка: <code>name, score = line.strip().split(\",\")</code>, балл переведите в <code>int</code>.",
     "Лучший: <code>max(rows, key=lambda r: r[1])[0]</code>"
    ],
    "check": {
     "tests": "assert best == \"Дана\", \"Наивысший балл у Даны (95)\"\nassert avg == 80.5, \"Средний балл (78 + 95 + 61 + 88) / 4 = 80.5\""
    }
   },
   {
    "title": "Восстановление числовых ключей",
    "prompt": "JSON превращает ключи словаря в строки. Словарь «код района → название» был сохранён в JSON и прочитан обратно. Функция <code>restore(text)</code> должна прочитать JSON-строку (<code>json.loads</code>), превратить ключи обратно в <code>int</code> и вернуть словарь. <code>restore('{\"1\": \"Медеу\", \"2\": \"Бостандық\"}')</code> → <code>{1: \"Медеу\", 2: \"Бостандық\"}</code>.",
    "hints": [
     "<code>json.loads(text)</code> даёт словарь, где ключи — строки.",
     "Dict comprehension: <code>{int(k): v for k, v in ...items()}</code>"
    ],
    "check": {
     "tests": "import json as _json\nassert restore('{\"1\": \"Медеу\", \"2\": \"Бостандық\"}') == {1: \"Медеу\", 2: \"Бостандық\"}, \"restore(...) должен вернуть {1: 'Медеу', 2: 'Бостандық'}\"\n_d = {10: \"Алатау\", 25: \"Түрксіб\"}\nassert restore(_json.dumps(_d, ensure_ascii=False)) == _d, \"dumps → restore должен вернуть исходный словарь\""
    }
   },
   {
    "title": "Журнал заказов",
    "prompt": "Функция <code>add_order(path, order)</code> должна добавить новый заказ в список заказов, сохранённый в JSON-файле, снова сохранить файл и вернуть новую длину списка. Если файла ещё нет (<code>FileNotFoundError</code>), начните с пустого списка.",
    "hints": [
     "Чтение поместите в <code>try</code> и напишите <code>except FileNotFoundError: orders = []</code>.",
     "После добавления перезапишите файл в режиме <code>\"w\"</code> через <code>json.dump</code>."
    ],
    "check": {
     "tests": "import os as _os, json as _json\nif _os.path.exists(\"orders_pr.json\"):\n    _os.remove(\"orders_pr.json\")\nassert add_order(\"orders_pr.json\", {\"id\": 1, \"city\": \"Алматы\"}) == 1, \"Если файла нет, начните с пустого списка и верните 1\"\nassert add_order(\"orders_pr.json\", {\"id\": 2, \"city\": \"Тараз\"}) == 2, \"После второго заказа — 2\"\nwith open(\"orders_pr.json\", encoding=\"utf-8\") as _f:\n    _saved = _json.load(_f)\nassert _saved == [{\"id\": 1, \"city\": \"Алматы\"}, {\"id\": 2, \"city\": \"Тараз\"}], \"В файле оба заказа должны храниться как список\""
    }
   },
   {
    "title": "Отчёт по оценкам",
    "prompt": "Код создаёт файл <code>\"marks_pr.txt\"</code>: в каждой строке имя ученика и его оценки через пробел (<code>Әли 5 4 5</code>). Функция <code>make_report(src, dst)</code> должна прочитать файл, составить словарь (имя → средняя оценка, <code>round(..., 2)</code>), сохранить его в JSON-файл <code>dst</code> и вернуть словарь. Пустые строки пропускайте.",
    "hints": [
     "<code>parts = line.split()</code>: в пустой строке список пуст, напишите <code>continue</code>.",
     "Оценки: <code>[int(m) for m in parts[1:]]</code>, затем <code>json.dump(report, f, ensure_ascii=False)</code>."
    ],
    "check": {
     "tests": "import json as _json\n_r = make_report(\"marks_pr.txt\", \"report_pr.json\")\nassert _r == {\"Әли\": 4.67, \"Дана\": 3.5, \"Ерлан\": 4.75}, \"make_report(...) должен вернуть {'Әли': 4.67, 'Дана': 3.5, 'Ерлан': 4.75}\"\nwith open(\"report_pr.json\", encoding=\"utf-8\") as _f:\n    assert _json.load(_f) == _r, \"Отчёт должен сохраниться в файле dst в формате JSON\""
    }
   }
  ]
 },
 "pyi-10": {
  "pr": [
   {
    "title": "Генератор чётных чисел",
    "prompt": "Напишите генератор <code>evens(limit)</code> (с <code>yield</code>): он выдаёт чётные числа от 2 до <code>limit</code> включительно. <code>list(evens(9))</code> → <code>[2, 4, 6, 8]</code>.",
    "hints": [
     "В <code>while n <= limit:</code> внутри цикла <code>yield n</code>.",
     "В функции должен быть <code>yield</code>, а не <code>return</code>."
    ],
    "check": {
     "tests": "import inspect as _inspect\nassert _inspect.isgeneratorfunction(evens), \"evens должен быть генератором: используйте yield\"\nassert list(evens(9)) == [2, 4, 6, 8], \"list(evens(9)) должен вернуть [2, 4, 6, 8]\"\nassert list(evens(10)) == [2, 4, 6, 8, 10], \"Если limit чётный, он тоже входит\"\nassert list(evens(1)) == [], \"evens(1) ничего не выдаёт\""
    }
   },
   {
    "title": "Первые два элемента",
    "prompt": "Функция <code>first_two(items)</code> должна с помощью <code>iter</code> и <code>next</code> вернуть первые два элемента любого итерируемого объекта в виде кортежа. <code>first_two([\"Әли\", \"Дана\", \"Ерлан\"])</code> → <code>(\"Әли\", \"Дана\")</code>. Строка тоже должна работать: <code>first_two(\"Абай\")</code> → <code>(\"А\", \"б\")</code>.",
    "hints": [
     "<code>it = iter(items)</code>",
     "Дважды вызовите <code>next(it)</code>."
    ],
    "check": {
     "tests": "assert first_two([\"Әли\", \"Дана\", \"Ерлан\"]) == (\"Әли\", \"Дана\"), \"first_two(['Әли', 'Дана', 'Ерлан']) должен вернуть ('Әли', 'Дана')\"\nassert first_two(\"Абай\") == (\"А\", \"б\"), \"first_two('Абай') должен вернуть ('А', 'б')\"\nassert first_two(x * 10 for x in range(5)) == (0, 10), \"Должен работать и с генератором\""
    }
   },
   {
    "title": "Количество длинных слов",
    "prompt": "Функция <code>count_long(words, n)</code> должна подсчитать количество слов длиннее <code>n</code> с помощью генераторного выражения и <code>sum</code> (без промежуточного списка). <code>count_long([\"ат\", \"мысық\", \"жылқы\"], 3)</code> → <code>2</code>.",
    "hints": [
     "Для каждого подходящего слова — 1: <code>sum(1 for w in words if ...)</code>",
     "Условие: <code>len(w) > n</code>"
    ],
    "check": {
     "tests": "assert count_long([\"ат\", \"мысық\", \"жылқы\"], 3) == 2, \"count_long(['ат', 'мысық', 'жылқы'], 3) должен вернуть 2\"\nassert count_long([\"Ақтөбе\", \"Орал\"], 10) == 0, \"Длинных слов нет: 0\"\nassert count_long([], 1) == 0, \"Пустой список: 0\""
    }
   },
   {
    "title": "Генератор Фибоначчи",
    "prompt": "Напишите бесконечный генератор <code>fib()</code>: он выдаёт числа Фибоначчи: 0, 1, 1, 2, 3, 5, 8, … (каждое число равно сумме двух предыдущих).",
    "hints": [
     "Две переменные: <code>a, b = 0, 1</code>",
     "В <code>while True:</code> внутри: <code>yield a</code>, затем <code>a, b = b, a + b</code>."
    ],
    "check": {
     "tests": "import inspect as _inspect\nassert _inspect.isgeneratorfunction(fib), \"fib должен быть генератором\"\n_g = fib()\n_first = [next(_g) for _ in range(8)]\nassert _first == [0, 1, 1, 2, 3, 5, 8, 13], \"Первые 8 чисел: [0, 1, 1, 2, 3, 5, 8, 13]\"\nfor _ in range(43):\n    _x = next(_g)\nassert _x == 12586269025, \"F(50) = 12586269025 должно получаться (генератор бесконечный)\""
    }
   },
   {
    "title": "Разбивка на части",
    "prompt": "Ученики делятся на группы. Генератор <code>chunks(items, size)</code> должен разбить список на части по <code>size</code> элементов и выдавать их по очереди; последняя часть может быть короче. <code>list(chunks([1, 2, 3, 4, 5], 2))</code> → <code>[[1, 2], [3, 4], [5]]</code>.",
    "hints": [
     "<code>range(0, len(items), size)</code> даёт индекс начала каждой части.",
     "<code>yield items[i:i + size]</code>"
    ],
    "check": {
     "tests": "import inspect as _inspect\nassert _inspect.isgeneratorfunction(chunks), \"chunks должен быть генератором\"\nassert list(chunks([1, 2, 3, 4, 5], 2)) == [[1, 2], [3, 4], [5]], \"list(chunks([1, 2, 3, 4, 5], 2)) должен вернуть [[1, 2], [3, 4], [5]]\"\nassert list(chunks([\"Әли\", \"Дана\", \"Ерлан\"], 3)) == [[\"Әли\", \"Дана\", \"Ерлан\"]], \"Одна полная группа\"\nassert list(chunks([], 4)) == [], \"Пустой список ничего не выдаёт\""
    }
   },
   {
    "title": "Пропуск пустых строк",
    "prompt": "Строки конфигурационного файла заданы списком. Генератор <code>clean_lines(lines)</code> должен обрезать каждую строку через <code>.strip()</code>, пропускать пустые строки и комментарии, начинающиеся с <code>#</code>, а остальные выдавать.",
    "hints": [
     "Условие: <code>if not line or line.startswith(\"#\"): continue</code>",
     "Оставшиеся строки выдавайте через <code>yield line</code>."
    ],
    "check": {
     "tests": "import inspect as _inspect\nassert _inspect.isgeneratorfunction(clean_lines), \"clean_lines должен быть генератором\"\n_src = [\"# баптаулар\\n\", \"city=Алматы\\n\", \"   \\n\", \"  lang=kk  \\n\", \"#port=80\\n\"]\nassert list(clean_lines(_src)) == [\"city=Алматы\", \"lang=kk\"], \"Результат должен быть ['city=Алматы', 'lang=kk']\"\nassert list(clean_lines([])) == [], \"Пустой список ничего не выдаёт\""
    }
   },
   {
    "title": "Поток остатков на счёте",
    "prompt": "Генератор <code>balances(start, ops)</code> применяет к начальному балансу операции из списка <code>ops</code> по очереди (положительное — приход, отрицательное — расход) и выдаёт баланс после каждой операции. Если операция делает баланс отрицательным, она <b>пропускается</b> (баланс не меняется, ничего не выдаётся).",
    "hints": [
     "Храните баланс в переменной и на каждой операции сначала проверьте: <code>if balance + op < 0: continue</code>.",
     "Затем <code>balance += op</code> и <code>yield balance</code>."
    ],
    "check": {
     "tests": "import inspect as _inspect\nassert _inspect.isgeneratorfunction(balances), \"balances должен быть генератором\"\nassert list(balances(1000, [500, -200, -2000, 300])) == [1500, 1300, 1600], \"list(balances(1000, [500, -200, -2000, 300])) должен вернуть [1500, 1300, 1600]\"\nassert list(balances(0, [-1])) == [], \"Операция, ведущая к отрицательному балансу, пропускается\"\n_g = balances(10, [5, 5])\nassert next(_g) == 15, \"Первый next() должен вернуть 15\""
    }
   },
   {
    "title": "Конвейер генераторов",
    "prompt": "Журнал платежей состоит из строк вида <code>\"имя;сумма\"</code>. Напишите два генератора: <code>parse(lines)</code> — из каждой непустой строки выдаёт кортеж <code>(имя, int(сумма))</code>; <code>big(records, limit)</code> — выдаёт только записи, сумма которых не меньше <code>limit</code>. Затем функция <code>big_total(lines, limit)</code> должна соединить конвейер и вернуть сумму крупных платежей.",
    "hints": [
     "<code>parse</code>: <code>name, amount = line.split(\";\")</code>, затем <code>yield name, int(amount)</code>.",
     "Конвейер: <code>big(parse(lines), limit)</code>, затем <code>sum(...)</code>."
    ],
    "check": {
     "tests": "import inspect as _inspect\nassert _inspect.isgeneratorfunction(parse) and _inspect.isgeneratorfunction(big), \"parse и big должны быть генераторами\"\n_log = [\"Әли;1500\", \"Дана;300\", \"\", \"Ерлан;5000\", \"Сая;1000\"]\nassert list(parse(_log)) == [(\"Әли\", 1500), (\"Дана\", 300), (\"Ерлан\", 5000), (\"Сая\", 1000)], \"parse пропускает пустую строку и выдаёт (имя, сумма)\"\nassert list(big(parse(_log), 1000)) == [(\"Әли\", 1500), (\"Ерлан\", 5000), (\"Сая\", 1000)], \"big(..., 1000) выдаёт только записи с суммой не меньше 1000\"\nassert big_total(_log, 1000) == 7500, \"big_total(_log, 1000) должен вернуть 7500\"\nassert big_total(_log, 10000) == 0, \"Если крупных платежей нет, 0\""
    }
   }
  ]
 },
 "pyi-11": {
  "pr": [
   {
    "title": "Удвоение результата",
    "prompt": "Напишите декоратор <code>double</code>: он умножает результат декорируемой функции на 2 и возвращает его. Для <code>price(500)</code> с декоратором <code>@double</code> результат — <code>1000</code>.",
    "hints": [
     "Напишите внутреннюю функцию <code>wrapper(*args, **kwargs)</code> и верните её.",
     "<code>return func(*args, **kwargs) * 2</code>"
    ],
    "check": {
     "tests": "assert price(500) == 1000, \"price(500) должен вернуть 1000\"\n@double\ndef _add(a, b):\n    return a + b\nassert _add(3, 4) == 14, \"Декоратор должен работать с любыми аргументами: _add(3, 4) = 14\""
    }
   },
   {
    "title": "Счётчик вызовов",
    "prompt": "Напишите декоратор <code>count_calls</code>: при каждом вызове функции атрибут <code>wrapper.calls</code> должен увеличиваться на 1 (вначале 0). Результат функции не должен меняться.",
    "hints": [
     "Функции можно добавлять атрибуты: <code>wrapper.calls = 0</code> (после определения wrapper).",
     "Внутри: <code>wrapper.calls += 1</code>, затем <code>return func(*args, **kwargs)</code>."
    ],
    "check": {
     "tests": "assert hello.calls == 0, \"Вначале hello.calls = 0\"\nassert hello(\"Дана\") == \"Сәлем, Дана\", \"Результат не должен меняться\"\nhello(\"Әли\"); hello(\"Ерлан\")\nassert hello.calls == 3, \"После трёх вызовов hello.calls = 3\""
    }
   },
   {
    "title": "Добавление знака тенге",
    "prompt": "Декоратор <code>tenge</code> должен превращать число, которое вернула функция, в строку вида <code>\"12500 ₸\"</code> (<code>f\"{result} ₸\"</code>). Например, для <code>total(5000, 7500)</code> с декоратором <code>@tenge</code> результат — <code>\"12500 ₸\"</code>.",
    "hints": [
     "<code>result = func(*args, **kwargs)</code>",
     "<code>return f\"{result} ₸\"</code>"
    ],
    "check": {
     "tests": "assert total(5000, 7500) == \"12500 ₸\", \"total(5000, 7500) должен вернуть '12500 ₸'\"\nassert total() == \"0 ₸\", \"total() должен вернуть '0 ₸'\""
    }
   },
   {
    "title": "Журнал вызовов",
    "prompt": "<code>log</code> — пустой список. Декоратор <code>logged</code> при каждом вызове добавляет в список строку <code>f\"{func.__name__}{args}\"</code> и возвращает результат функции. Используйте <code>functools.wraps</code>, чтобы имя функции сохранилось. Если вызвать <code>add(2, 3)</code>, в <code>log</code> попадёт <code>\"add(2, 3)\"</code>.",
    "hints": [
     "Поставьте <code>@wraps(func)</code> над <code>wrapper</code>.",
     "<code>log.append(f\"{func.__name__}{args}\")</code>"
    ],
    "check": {
     "tests": "log.clear()\nassert add(2, 3) == 5, \"add(2, 3) должен вернуть 5\"\nadd(10, 20)\nassert log == [\"add(2, 3)\", \"add(10, 20)\"], \"log должен быть ['add(2, 3)', 'add(10, 20)']\"\nassert add.__name__ == \"add\", \"Используйте @wraps(func): имя должно остаться 'add'\""
    }
   },
   {
    "title": "Проверка администратора",
    "prompt": "В веб-приложении некоторые действия может выполнять только администратор. Напишите декоратор <code>admin_only</code>: первый аргумент функции — словарь пользователя. Если его значение <code>\"role\"</code> не равно <code>\"admin\"</code>, функция не вызывается и возвращается <code>\"Рұқсат жоқ\"</code>; иначе возвращается результат функции.",
    "hints": [
     "<code>def wrapper(user, *args, **kwargs):</code> — первый аргумент выделите отдельно.",
     "<code>if user.get(\"role\") != \"admin\": return \"Рұқсат жоқ\"</code>"
    ],
    "check": {
     "tests": "assert delete_user({\"name\": \"Дана\", \"role\": \"admin\"}, \"Тимур\") == \"Тимур өшірілді\", \"У администратора есть доступ\"\nassert delete_user({\"name\": \"Әли\", \"role\": \"user\"}, \"Тимур\") == \"Рұқсат жоқ\", \"Обычный пользователь получает 'Рұқсат жоқ'\"\nassert delete_user({\"name\": \"Қонақ\"}, \"Тимур\") == \"Рұқсат жоқ\", \"Если role нет, всё равно 'Рұқсат жоқ'\"\n_called = []\n@admin_only\ndef _act(user):\n    _called.append(1)\n    return \"ok\"\n_act({\"role\": \"user\"})\nassert _called == [], \"Если доступа нет, функция вообще не должна вызываться\""
    }
   },
   {
    "title": "Остановка отрицательного результата",
    "prompt": "Остаток на складе не может быть отрицательным. Декоратор <code>not_negative</code> должен вернуть <code>0</code>, если результат функции меньше 0, иначе сам результат. Используйте <code>functools.wraps</code>.",
    "hints": [
     "Сначала <code>result = func(*args, **kwargs)</code>, затем проверка.",
     "<code>@wraps(func)</code> сохраняет имя."
    ],
    "check": {
     "tests": "assert remaining(50, 20) == 30, \"remaining(50, 20) должен вернуть 30\"\nassert remaining(10, 25) == 0, \"Если результат отрицательный, 0\"\nassert remaining(stock=5, sold=5) == 0, \"Должен работать и с именованными аргументами\"\nassert remaining.__name__ == \"remaining\", \"Используйте @wraps(func): имя должно сохраняться\""
    }
   },
   {
    "title": "Фибоначчи с кэшем",
    "prompt": "Наивная рекурсивная функция <code>fib(n)</code> работает очень медленно. Не меняя её, добавьте стандартный декоратор <code>@lru_cache</code> (<code>from functools import lru_cache</code>). Тогда <code>fib(90)</code> вычисляется сразу. <code>fib(0) = 0</code>, <code>fib(1) = 1</code>.",
    "hints": [
     "<code>from functools import lru_cache</code>",
     "Поставьте <code>@lru_cache</code> над <code>def fib</code>."
    ],
    "check": {
     "tests": "assert fib(10) == 55, \"fib(10) должен вернуть 55\"\nassert hasattr(fib, \"cache_info\"), \"Добавьте @lru_cache над fib\"\nassert fib(90) == 2880067194370816120, \"fib(90) должен вернуть 2880067194370816120\"\nassert \"fib\" in fib.__wrapped__.__code__.co_names, \"fib должен остаться рекурсивным\""
    }
   },
   {
    "title": "Выполнить один раз",
    "prompt": "Подключение к базе данных должно устанавливаться только один раз. Напишите декоратор <code>once</code>: функция выполняется только при <b>первом</b> вызове, при последующих она не выполняется заново, а возвращается первый результат (даже если аргументы другие). Используйте <code>functools.wraps</code>.",
    "hints": [
     "Храните состояние в атрибутах wrapper: <code>wrapper.done = False</code>, <code>wrapper.result = None</code>.",
     "Внутри: вызывайте <code>func</code> только если <code>if not wrapper.done:</code>."
    ],
    "check": {
     "tests": "_calls = []\n@once\ndef connect(city):\n    _calls.append(city)\n    return f\"{city} серверіне қосылды\"\nassert connect(\"Алматы\") == \"Алматы серверіне қосылды\", \"Первый вызов выполняет функцию\"\nassert connect(\"Астана\") == \"Алматы серверіне қосылды\", \"Последующий вызов возвращает первый результат\"\nassert _calls == [\"Алматы\"], \"Функция должна выполняться только один раз\"\nassert connect.__name__ == \"connect\", \"Используйте @wraps(func)\"\n@once\ndef _other():\n    _calls.append(\"x\")\n    return 0\nassert _other() == 0 and _other() == 0 and _calls == [\"Алматы\", \"x\"], \"Состояние каждой декорированной функции должно быть отдельным\""
    }
   }
  ]
 },
 "pyi-12": {
  "pr": [
   {
    "title": "Разница в днях",
    "prompt": "Используя <code>from datetime import date</code>, напишите функцию <code>days_between(d1, d2)</code>: она должна вернуть количество дней между двумя датами <code>date</code> (всегда положительное). <code>days_between(date(2026, 9, 1), date(2026, 12, 31))</code> → <code>121</code>.",
    "hints": [
     "Разность двух дат — <code>timedelta</code>, у неё есть атрибут <code>.days</code>.",
     "Уберите знак: <code>abs(...)</code>"
    ],
    "check": {
     "tests": "assert days_between(date(2026, 9, 1), date(2026, 12, 31)) == 121, \"1 сентября — 31 декабря: 121 день\"\nassert days_between(date(2027, 3, 22), date(2027, 3, 1)) == 21, \"Если даты в обратном порядке, число дней всё равно положительное: 21\"\nassert days_between(date(2026, 1, 1), date(2026, 1, 1)) == 0, \"Один день: 0\""
    }
   },
   {
    "title": "День недели",
    "prompt": "Функция <code>weekday_name(text)</code> должна прочитать дату в формате <code>\"дд.мм.гггг\"</code> с помощью <code>datetime.strptime</code> и вернуть название дня недели на казахском языке. Список <code>DAYS</code> уже готов: 0 — дүйсенбі, …, 6 — жексенбі (<code>.weekday()</code>). <code>weekday_name(\"16.12.2026\")</code> → <code>\"сәрсенбі\"</code>.",
    "hints": [
     "<code>datetime.strptime(text, \"%d.%m.%Y\")</code>",
     "<code>DAYS[d.weekday()]</code>"
    ],
    "check": {
     "tests": "assert weekday_name(\"16.12.2026\") == \"сәрсенбі\", \"16.12.2026 — сәрсенбі\"\nassert weekday_name(\"22.03.2027\") == \"дүйсенбі\", \"22.03.2027 — дүйсенбі\"\nassert weekday_name(\"01.01.2028\") == \"сенбі\", \"01.01.2028 — сенбі\""
    }
   },
   {
    "title": "Самая частая буква",
    "prompt": "С помощью <code>Counter</code> напишите функцию <code>top_letter(word)</code>: она должна вернуть букву, которая встречается в слове чаще всего. <code>top_letter(\"қарағанды\")</code> → <code>\"а\"</code>.",
    "hints": [
     "<code>Counter(word)</code> считает каждую букву.",
     "<code>.most_common(1)</code> → <code>[(\"а\", 4)]</code>, поэтому берём <code>[0][0]</code>."
    ],
    "check": {
     "tests": "assert top_letter(\"қарағанды\") == \"а\", \"top_letter('қарағанды') должен вернуть 'а'\"\nassert top_letter(\"жеңешесі\") == \"е\", \"top_letter('жеңешесі') должен вернуть 'е'\"\nassert top_letter(\"ммм\") == \"м\", \"top_letter('ммм') должен вернуть 'м'\""
    }
   },
   {
    "title": "Группировка по городам",
    "prompt": "Участники олимпиады заданы кортежами <code>(имя, город)</code>. Функция <code>by_city(people)</code> должна с помощью <code>defaultdict(list)</code> составить словарь (город → список имён в исходном порядке) и вернуть <code>defaultdict</code>.",
    "hints": [
     "<code>groups = defaultdict(list)</code>",
     "В цикле: <code>groups[city].append(name)</code> — проверять наличие ключа не нужно."
    ],
    "check": {
     "tests": "_p = [(\"Әли\", \"Алматы\"), (\"Дана\", \"Астана\"), (\"Ерлан\", \"Алматы\"), (\"Сая\", \"Тараз\"), (\"Нұр\", \"Астана\")]\n_g = by_city(_p)\nassert type(_g).__name__ == \"defaultdict\", \"Результат должен быть defaultdict(list)\"\nassert dict(_g) == {\"Алматы\": [\"Әли\", \"Ерлан\"], \"Астана\": [\"Дана\", \"Нұр\"], \"Тараз\": [\"Сая\"]}, \"by_city(...) должен давать словарь город → список имён\"\nassert _g[\"Орал\"] == [], \"Для отсутствующего города должен вернуться пустой список (defaultdict)\""
    }
   },
   {
    "title": "Срок выполнения",
    "prompt": "Функция <code>deadline(start, days)</code> должна прочитать дату начала в формате <code>\"дд.мм.гггг\"</code> (<code>strptime</code>), прибавить к ней <code>days</code> дней (<code>timedelta</code>) и вернуть результат в том же формате (<code>strftime</code>). <code>deadline(\"16.10.2026\", 45)</code> → <code>\"30.11.2026\"</code>.",
    "hints": [
     "<code>datetime.strptime(start, \"%d.%m.%Y\") + timedelta(days=days)</code>",
     "Обратно в строку: <code>.strftime(\"%d.%m.%Y\")</code>"
    ],
    "check": {
     "tests": "assert deadline(\"16.10.2026\", 45) == \"30.11.2026\", \"deadline('16.10.2026', 45) должен вернуть '30.11.2026'\"\nassert deadline(\"25.12.2026\", 10) == \"04.01.2027\", \"Переход через год: '04.01.2027'\"\nassert deadline(\"28.02.2028\", 1) == \"29.02.2028\", \"2028 — високосный год: '29.02.2028'\""
    }
   },
   {
    "title": "Ближайший город",
    "prompt": "Создайте <code>City = namedtuple(\"City\", [\"name\", \"x\", \"y\"])</code>. Функция <code>closest(cities, x, y)</code> должна вернуть название города, ближайшего к точке <code>(x, y)</code> (расстояние: <code>abs(dx) + abs(dy)</code>). Обращайтесь к полям по имени: <code>c.x</code>, <code>c.name</code>.",
    "hints": [
     "<code>City = namedtuple(\"City\", [\"name\", \"x\", \"y\"])</code>",
     "<code>min(cities, key=lambda c: abs(c.x - x) + abs(c.y - y)).name</code>"
    ],
    "check": {
     "tests": "_cs = [City(\"Алматы\", 10, 2), City(\"Тараз\", 2, 3), City(\"Қонаев\", 11, 5)]\nassert _cs[0].name == \"Алматы\" and _cs[0][1] == 10, \"Поля namedtuple City: name, x, y\"\nassert closest(_cs, 0, 0) == \"Тараз\", \"К точке (0, 0) ближе Тараз\"\nassert closest(_cs, 12, 6) == \"Қонаев\", \"К точке (12, 6) ближе Қонаев\""
    }
   },
   {
    "title": "Продажи по дням недели",
    "prompt": "Продажи заданы кортежами <code>(\"2026-10-16\", сумма)</code>. Функция <code>weekday_sales(sales)</code> должна прочитать дату через <code>strptime(..., \"%Y-%m-%d\")</code> и с помощью <code>defaultdict(int)</code> составить обычный <code>dict</code> (название дня недели → общая сумма). Названия берутся из списка <code>DAYS</code> (0 — дүйсенбі).",
    "hints": [
     "<code>totals = defaultdict(int)</code>, затем <code>totals[DAYS[d.weekday()]] += amount</code>.",
     "В конце верните <code>dict(totals)</code>."
    ],
    "check": {
     "tests": "_s = [(\"2026-10-16\", 12000), (\"2026-10-17\", 8000), (\"2026-10-23\", 5000), (\"2026-10-19\", 3000)]\n_r = weekday_sales(_s)\nassert type(_r) is dict, \"Результат должен быть обычным dict\"\nassert _r == {\"жұма\": 17000, \"сенбі\": 8000, \"дүйсенбі\": 3000}, \"weekday_sales(...) должен вернуть {'жұма': 17000, 'сенбі': 8000, 'дүйсенбі': 3000}\"\nassert weekday_sales([]) == {}, \"Если продаж нет, пустой словарь\""
    }
   },
   {
    "title": "Очередь на остановке",
    "prompt": "Очередь на автобусной остановке смоделируйте с помощью <code>deque</code>. Функция <code>simulate(events)</code> должна обрабатывать события по порядку: <code>\"кел:Аты\"</code> — человек встаёт в конец очереди; <code>\"vip:Аты\"</code> — человек встаёт в начало очереди (<code>appendleft</code>); <code>\"мін\"</code> — человек из начала очереди садится в автобус (если очередь пуста, ничего не происходит). Функция должна вернуть кортеж <code>(список севших, список оставшихся в очереди)</code>.",
    "hints": [
     "<code>queue = deque()</code>; взять из начала — <code>queue.popleft()</code>.",
     "Разбор события: <code>kind, name = e.split(\":\")</code>"
    ],
    "check": {
     "tests": "_ev = [\"кел:Әли\", \"кел:Дана\", \"vip:Әже\", \"мін\", \"кел:Ерлан\", \"мін\", \"мін\", \"мін\"]\nassert simulate(_ev) == ([\"Әже\", \"Әли\", \"Дана\", \"Ерлан\"], []), \"Севшие: Әже, Әли, Дана, Ерлан; очередь пуста\"\nassert simulate([\"кел:Сая\", \"кел:Нұр\", \"мін\"]) == ([\"Сая\"], [\"Нұр\"]), \"simulate(['кел:Сая', 'кел:Нұр', 'мін']) должен вернуть (['Сая'], ['Нұр'])\"\nassert simulate([\"мін\", \"vip:Аян\"]) == ([], [\"Аян\"]), \"Если очередь пуста, 'мін' ничего не делает\""
    }
   }
  ]
 },
 "pyi-13": {
  "pr": [
   {
    "title": "Платёж с кошелька",
    "prompt": "Создайте собственный класс ошибки: <code>NotEnoughMoney(Exception)</code>. В классе <code>Wallet</code> есть <code>balance</code>. Метод <code>pay(amount)</code>: если сумма больше баланса, он должен вызвать <code>NotEnoughMoney</code> (баланс не меняется); иначе уменьшить баланс и вернуть новый баланс.",
    "hints": [
     "<code>class NotEnoughMoney(Exception): pass</code>",
     "Сначала проверка, потом изменение: <code>if amount > self.balance: raise NotEnoughMoney(...)</code>"
    ],
    "check": {
     "tests": "assert issubclass(NotEnoughMoney, Exception), \"NotEnoughMoney должен наследоваться от Exception\"\n_w = Wallet(5000)\nassert _w.pay(1200) == 3800, \"pay(1200) должен вернуть новый баланс 3800\"\n_e = None\ntry:\n    _w.pay(10000)\nexcept NotEnoughMoney:\n    _e = \"ok\"\nassert _e == \"ok\", \"Если денег не хватает, должна подниматься NotEnoughMoney\"\nassert _w.balance == 3800, \"После неудачного платежа баланс не должен меняться\""
    }
   },
   {
    "title": "Список операций",
    "prompt": "История счёта состоит из кортежей, например <code>(\"deposit\", 5000)</code> и <code>(\"withdraw\", 3000)</code>. Функция <code>format_history(history)</code> должна превратить её в список строк: пополнение — <code>\"+5000 ₸\"</code>, снятие — <code>\"-3000 ₸\"</code>.",
    "hints": [
     "Распакуйте кортеж: <code>for kind, amount in history:</code>",
     "Знак: <code>\"+\" if kind == \"deposit\" else \"-\"</code>"
    ],
    "check": {
     "tests": "assert format_history([(\"deposit\", 5000), (\"withdraw\", 3000)]) == [\"+5000 ₸\", \"-3000 ₸\"], \"format_history(...) должен вернуть ['+5000 ₸', '-3000 ₸']\"\nassert format_history([]) == [], \"Пустая история → пустой список\"\nassert format_history([(\"withdraw\", 150)]) == [\"-150 ₸\"], \"Снятие: '-150 ₸'\""
    }
   },
   {
    "title": "Баланс по истории",
    "prompt": "Функция <code>balance_from(history, start=0)</code> должна применить к начальному балансу все операции истории и вернуть итоговый баланс: <code>\"deposit\"</code> прибавляет, <code>\"withdraw\"</code> вычитает.",
    "hints": [
     "<code>balance = start</code>, затем цикл.",
     "<code>if kind == \"deposit\": balance += amount</code>"
    ],
    "check": {
     "tests": "_h = [(\"deposit\", 5000), (\"withdraw\", 3000), (\"deposit\", 1500)]\nassert balance_from(_h) == 3500, \"balance_from(_h) должен быть 3500\"\nassert balance_from(_h, 10000) == 13500, \"При start=10000 будет 13500\"\nassert balance_from([], 700) == 700, \"Если операций нет, вернуть start\""
    }
   },
   {
    "title": "Сберегательный счёт",
    "prompt": "Класс <code>BankAccount</code> готов. Напишите наследующий от него класс <code>SavingsAccount</code>: <code>__init__(self, owner, balance=0, rate=0.1)</code> вызывает <code>super()</code>; метод <code>add_interest()</code> считает проценты (<code>round(balance * rate, 2)</code>), прибавляет их к балансу, записывает в историю <code>(\"interest\", сумма)</code> и возвращает сумму.",
    "hints": [
     "<code>super().__init__(owner, balance)</code>, затем <code>self.rate = rate</code>.",
     "<code>amount = round(self.balance * self.rate, 2)</code>"
    ],
    "check": {
     "tests": "_s = SavingsAccount(\"Айгерім\", 20000)\nassert _s.rate == 0.1 and _s.history == [], \"rate по умолчанию 0.1, история пуста\"\n_s.deposit(5000)\nassert _s.add_interest() == 2500, \"25000 * 0.1 = 2500\"\nassert _s.balance == 27500, \"После процентов баланс 27500\"\nassert _s.history == [(\"deposit\", 5000), (\"interest\", 2500)], \"В историю должно записаться ('interest', 2500)\"\nassert SavingsAccount(\"Бек\", 1000, 0.035).add_interest() == 35.0, \"rate=0.035: 35.0\""
    }
   },
   {
    "title": "Отчёт по банку",
    "prompt": "Счета клиентов заданы словарём (имя → баланс). Функция <code>report(accounts)</code> должна вернуть список строк: по убыванию баланса (при равенстве — по имени), каждая строка в виде <code>\"1. Дана: 15000 ₸\"</code> (нумерация с 1).",
    "hints": [
     "<code>sorted(accounts.items(), key=lambda p: (-p[1], p[0]))</code>",
     "<code>enumerate(ordered, start=1)</code> даёт нумерацию."
    ],
    "check": {
     "tests": "_acc = {\"Әли\": 12000, \"Дана\": 15000, \"Ерлан\": 3000, \"Бекзат\": 12000}\nassert report(_acc) == [\"1. Дана: 15000 ₸\", \"2. Бекзат: 12000 ₸\", \"3. Әли: 12000 ₸\", \"4. Ерлан: 3000 ₸\"], \"Результат report(...) неверен: по убыванию баланса, при равенстве по имени\"\nassert report({}) == [], \"Если счетов нет, пустой список\""
    }
   },
   {
    "title": "Самый крупный вклад",
    "prompt": "<code>histories</code> — словарь (клиент → история операций); история состоит из кортежей вида <code>(\"deposit\", 5000)</code>. Функция <code>largest_deposit(histories)</code> должна вернуть самый крупный вклад среди всех клиентов в виде кортежа <code>(клиент, сумма)</code>. Если вкладов нет, вернуть <code>None</code>.",
    "hints": [
     "Соберите все вклады в один список: comprehension с двумя циклами <code>for</code>.",
     "<code>max(deposits, key=lambda d: d[1])</code>"
    ],
    "check": {
     "tests": "_h = {\"Әли\": [(\"deposit\", 5000), (\"withdraw\", 9000)], \"Дана\": [(\"deposit\", 7000), (\"deposit\", 2000)], \"Ерлан\": []}\nassert largest_deposit(_h) == (\"Дана\", 7000), \"largest_deposit(...) должен вернуть ('Дана', 7000): снятия не учитываются\"\nassert largest_deposit({\"Сая\": [(\"withdraw\", 100)]}) is None, \"Если вкладов нет, None\""
    }
   },
   {
    "title": "Перевод с комиссией",
    "prompt": "Класс <code>Bank</code>: <code>self.accounts</code> — словарь (имя → баланс). Метод <code>transfer(src, dst, amount)</code> берёт комиссию 1 %, но не меньше 100 ₸ (<code>max(100, round(amount * 0.01))</code>). Со счёта <code>src</code> списывается <code>amount + комиссия</code>, на счёт <code>dst</code> зачисляется <code>amount</code>, комиссия копится в <code>self.fees</code>. Если сумма ≤ 0 — <code>ValueError</code>; если клиента нет — <code>KeyError</code>; если денег не хватает — <code>InsufficientFunds</code>. При любой ошибке ничего не должно меняться.",
    "hints": [
     "Все проверки (сумма, клиенты, баланс) делайте <b>до</b> изменения данных.",
     "<code>fee = max(100, round(amount * 0.01))</code>"
    ],
    "check": {
     "tests": "_b = Bank({\"Әли\": 50000, \"Дана\": 1000})\n_b.transfer(\"Әли\", \"Дана\", 20000)\nassert _b.accounts == {\"Әли\": 29800, \"Дана\": 21000} and _b.fees == 200, \"При переводе 20000 комиссия 200: Әли 29800, Дана 21000\"\n_b.transfer(\"Дана\", \"Әли\", 500)\nassert _b.accounts[\"Дана\"] == 20400 and _b.fees == 300, \"Минимальная комиссия 100 ₸\"\nfor _args, _exc in (((\"Әли\", \"Дана\", 0), ValueError), ((\"Әли\", \"Тимур\", 100), KeyError), ((\"Дана\", \"Әли\", 20400), InsufficientFunds)):\n    _e = None\n    try:\n        _b.transfer(*_args)\n    except _exc:\n        _e = \"ok\"\n    assert _e == \"ok\", f\"transfer{_args} должен вызвать {_exc.__name__}\"\nassert _b.accounts == {\"Әли\": 30300, \"Дана\": 20400} and _b.fees == 300, \"Неудачные переводы не должны ничего менять\""
    }
   },
   {
    "title": "Сохранение счетов в JSON",
    "prompt": "Сохраним данные банка в файл. В классе <code>Bank</code> есть <code>accounts</code> — (имя → <code>BankAccount</code>). Метод <code>save(path)</code> записывает словарь <code>{имя: баланс}</code> в JSON-файл. Функция <code>load_bank(path)</code> читает файл и возвращает новый <code>Bank</code> с теми же счетами (каждый счёт — <code>BankAccount</code>).",
    "hints": [
     "<code>save</code>: <code>{name: acc.balance for name, acc in self.accounts.items()}</code>, затем <code>json.dump</code>.",
     "<code>load_bank</code>: <code>json.load</code>, затем для каждой пары <code>bank.open_account(name, balance)</code>."
    ],
    "check": {
     "tests": "import json as _json\n_b = Bank()\n_b.open_account(\"Әли\", 12000); _b.open_account(\"Дана\", 15500)\n_b.save(\"bank_pr.json\")\nwith open(\"bank_pr.json\", encoding=\"utf-8\") as _f:\n    assert _json.load(_f) == {\"Әли\": 12000, \"Дана\": 15500}, \"В файл должно сохраниться {'Әли': 12000, 'Дана': 15500}\"\n_n = load_bank(\"bank_pr.json\")\nassert isinstance(_n, Bank) and _n is not _b, \"load_bank должен вернуть новый Bank\"\nassert isinstance(_n.accounts[\"Дана\"], BankAccount), \"Каждый счёт должен быть BankAccount\"\nassert {k: a.balance for k, a in _n.accounts.items()} == {\"Әли\": 12000, \"Дана\": 15500}, \"Балансы должны совпадать с файлом\"\nassert _n.accounts[\"Әли\"].owner == \"Әли\", \"owner должен восстановиться правильно\""
    }
   }
  ]
 }
} });
