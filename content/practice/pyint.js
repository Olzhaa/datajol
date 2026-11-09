// Practice tasks after the lessons of py-2. Each lesson's list opens one task at a time.
DJ.addPractice('py-2', {
 "pyi-1": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ең кіші және ең үлкен",
   "prompt": "<code>min_max(xs)</code> функциясын жазыңыз: ол сандар тізімінің ең кіші және ең үлкен мәнін <b>кортеж</b> ретінде қайтарсын. Мысалы, <code>min_max([12, -3, 25, 7])</code> → <code>(-3, 25)</code>.",
   "starter": "def min_max(xs):\n    pass\n",
   "solution": "def min_max(xs):\n    return min(xs), max(xs)\n",
   "hints": [
    "Бірнеше мәнді үтірмен қайтарсаңыз, кортеж шығады: <code>return a, b</code>.",
    "<code>return min(xs), max(xs)</code>"
   ],
   "check": {
    "tests": "assert min_max([12, -3, 25, 7]) == (-3, 25), \"min_max([12, -3, 25, 7]) (-3, 25) қайтаруы керек\"\nassert isinstance(min_max([1, 2]), tuple), \"Нәтиже кортеж (tuple) болуы керек\"\nassert min_max([5]) == (5, 5), \"Бір элемент болса, (5, 5) қайтаруы керек\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ортақ әріптер",
   "prompt": "<code>common_letters(a, b)</code> функциясы екі сөзде де кездесетін әріптердің <b>жиынын</b> қайтарсын. Мысалы, <code>common_letters(\"алма\", \"алмұрт\")</code> → <code>{\"а\", \"л\", \"м\"}</code>.",
   "starter": "def common_letters(a, b):\n    pass\n",
   "solution": "def common_letters(a, b):\n    return set(a) & set(b)\n",
   "hints": [
    "<code>set(\"алма\")</code> сөздің әріптерінен жиын жасайды.",
    "Қиылысу: <code>set(a) & set(b)</code>"
   ],
   "check": {
    "tests": "assert common_letters(\"алма\", \"алмұрт\") == {\"а\", \"л\", \"м\"}, \"common_letters('алма', 'алмұрт') {'а', 'л', 'м'} болуы керек\"\nassert common_letters(\"Астана\", \"Атырау\") == {\"А\", \"а\", \"т\"}, \"common_letters('Астана', 'Атырау') {'А', 'а', 'т'} болуы керек\"\nassert common_letters(\"үй\", \"ат\") == set(), \"Ортақ әріп жоқ болса, бос жиын қайтарыңыз\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қайталану бар ма",
   "prompt": "Сынып журналына оқушылардың аттары енгізілді. <code>has_duplicates(names)</code> функциясы тізімде кемінде бір ат қайталанса <code>True</code>, әйтпесе <code>False</code> қайтарсын. Жиынды қолданыңыз.",
   "starter": "def has_duplicates(names):\n    pass\n",
   "solution": "def has_duplicates(names):\n    return len(set(names)) != len(names)\n",
   "hints": [
    "Жиын қайталануларды жояды: оның ұзындығы тізімнен қысқа болса, қайталану бар.",
    "<code>len(set(names)) != len(names)</code>"
   ],
   "check": {
    "tests": "assert has_duplicates([\"Әли\", \"Дана\", \"Әли\"]) is True, \"has_duplicates(['Әли', 'Дана', 'Әли']) True қайтаруы керек\"\nassert has_duplicates([\"Әли\", \"Дана\", \"Ерлан\"]) is False, \"Қайталану жоқ болса, False қайтаруы керек\"\nassert has_duplicates([]) is False, \"Бос тізімде қайталану жоқ: False\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Тек біреуінде бар",
   "prompt": "Екі мұражайға барған туристердің жиындары берілген. <code>only_one(a, b)</code> функциясы тек <b>бір</b> мұражайға ғана барғандардың аттарын әліпби бойынша сұрыпталған <b>тізім</b> ретінде қайтарсын. Мысалы, <code>only_one({\"Әли\", \"Дана\"}, {\"Дана\", \"Сая\"})</code> → <code>[\"Сая\", \"Әли\"]</code> (Python әліпбиінде <code>Ә</code> кириллицаның соңында тұрады).",
   "starter": "def only_one(a, b):\n    return []\n",
   "solution": "def only_one(a, b):\n    return sorted(a ^ b)\n",
   "hints": [
    "Симметриялық айырма: <code>a ^ b</code>.",
    "<code>sorted(...)</code> жиыннан сұрыпталған тізім жасайды."
   ],
   "check": {
    "tests": "assert only_one({\"Әли\", \"Дана\"}, {\"Дана\", \"Сая\"}) == [\"Сая\", \"Әли\"], \"only_one({'Әли', 'Дана'}, {'Дана', 'Сая'}) ['Сая', 'Әли'] қайтаруы керек\"\nassert only_one({\"Арман\", \"Бекзат\", \"Нұр\"}, {\"Бекзат\"}) == [\"Арман\", \"Нұр\"], \"Екеуінде де барлар нәтижеге кірмейді\"\nassert only_one({\"Дана\"}, {\"Дана\"}) == [], \"Жиындар бірдей болса, бос тізім\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бос орындар",
   "prompt": "Кинотеатрда орын <code>(қатар, орын)</code> кортежімен белгіленеді. <code>taken</code> — сатылған орындардың сөздігі: кілті кортеж, мәні — сатып алушы. <code>free_seats(rows, cols, taken)</code> функциясы бос орындардың тізімін қайтарсын: қатар бойынша, сосын орын бойынша өсу ретімен (нөмірлеу 1-ден). Мысалы, <code>free_seats(1, 3, {(1, 2): \"Дана\"})</code> → <code>[(1, 1), (1, 3)]</code>.",
   "starter": "def free_seats(rows, cols, taken):\n    return []\n",
   "solution": "def free_seats(rows, cols, taken):\n    result = []\n    for r in range(1, rows + 1):\n        for c in range(1, cols + 1):\n            if (r, c) not in taken:\n                result.append((r, c))\n    return result\n",
   "hints": [
    "Екі кірістірілген цикл: <code>for r in range(1, rows + 1)</code> және <code>for c in range(1, cols + 1)</code>.",
    "Кортежді кілт ретінде тексеру: <code>(r, c) not in taken</code>"
   ],
   "check": {
    "tests": "assert free_seats(1, 3, {(1, 2): \"Дана\"}) == [(1, 1), (1, 3)], \"free_seats(1, 3, {(1, 2): 'Дана'}) [(1, 1), (1, 3)] болуы керек\"\nassert free_seats(2, 2, {(1, 1): \"Әли\", (2, 2): \"Сая\"}) == [(1, 2), (2, 1)], \"2x2 залда бос орындар: [(1, 2), (2, 1)]\"\nassert free_seats(2, 2, {}) == [(1, 1), (1, 2), (2, 1), (2, 2)], \"Ешкім алмаса, барлық орын бос\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жаңа және қайтқан келушілер",
   "prompt": "Дүкеннің кешегі және бүгінгі келушілері жиын ретінде берілген. <code>visitors(yesterday, today)</code> функциясы үш жиыннан тұратын кортеж қайтарсын: <code>(new, returned, lost)</code>. <code>new</code> — бүгін ғана келгендер, <code>returned</code> — екі күні де келгендер, <code>lost</code> — кеше келіп, бүгін келмегендер.",
   "starter": "def visitors(yesterday, today):\n    return set(), set(), set()\n",
   "solution": "def visitors(yesterday, today):\n    return today - yesterday, today & yesterday, yesterday - today\n",
   "hints": [
    "Айырма <code>-</code> және қиылысу <code>&</code> амалдары жеткілікті.",
    "<code>return today - yesterday, today & yesterday, yesterday - today</code>"
   ],
   "check": {
    "tests": "_n, _r, _l = visitors({\"Әли\", \"Дана\", \"Ерлан\"}, {\"Дана\", \"Сая\", \"Ерлан\", \"Тимур\"})\nassert _n == {\"Сая\", \"Тимур\"}, \"new: бүгін ғана келгендер {'Сая', 'Тимур'}\"\nassert _r == {\"Дана\", \"Ерлан\"}, \"returned: екі күні де келгендер {'Дана', 'Ерлан'}\"\nassert _l == {\"Әли\"}, \"lost: кеше келіп, бүгін келмегендер {'Әли'}\"\nassert visitors(set(), {\"Нұр\"}) == ({\"Нұр\"}, set(), set()), \"Кеше ешкім келмесе, бәрі жаңа\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ұпайлар статистикасы",
   "prompt": "Олимпиада нәтижелері <code>(аты, ұпай)</code> кортеждерінің тізімі. <code>summary(results)</code> функциясы <code>(best, worst, avg)</code> кортежін қайтарсын: <code>best</code> — ең көп ұпай алғанның аты, <code>worst</code> — ең аз ұпай алғанның аты, <code>avg</code> — орташа ұпай, <code>round(..., 1)</code>. Ұпайлар тең болса, тізімде бұрын тұрғаны алынады. Бос тізімде <code>(None, None, 0)</code> қайтарыңыз.",
   "starter": "def summary(results):\n    pass\n",
   "solution": "def summary(results):\n    if not results:\n        return None, None, 0\n    best_name, best = results[0]\n    worst_name, worst = results[0]\n    total = 0\n    for name, score in results:\n        total += score\n        if score > best:\n            best_name, best = name, score\n        if score < worst:\n            worst_name, worst = name, score\n    return best_name, worst_name, round(total / len(results), 1)\n",
   "hints": [
    "Циклде әр кортежді таратыңыз: <code>for name, score in results:</code>",
    "Ең жақсы мен ең нашарын екі айнымалы жұбында сақтаңыз, мысалы <code>best_name, best = results[0]</code>."
   ],
   "check": {
    "tests": "assert summary([(\"Әли\", 78), (\"Дана\", 95), (\"Ерлан\", 61), (\"Сая\", 88)]) == (\"Дана\", \"Ерлан\", 80.5), \"summary(...) ('Дана', 'Ерлан', 80.5) болуы керек\"\nassert summary([(\"Нұр\", 50), (\"Аян\", 50)]) == (\"Нұр\", \"Нұр\", 50.0), \"Ұпайлар тең болса, бұрын тұрғаны алынады\"\nassert summary([]) == (None, None, 0), \"Бос тізімде (None, None, 0)\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Бағыттар саны",
   "prompt": "Пойыз сапарлары <code>(қайдан, қайда)</code> кортеждерімен жазылған. Алматы → Астана мен Астана → Алматы — бір бағыт деп есептеледі. <code>unique_routes(trips)</code> функциясы қайталанбайтын бағыттар санын қайтарсын. Мысалы, <code>[(\"Алматы\", \"Астана\"), (\"Астана\", \"Алматы\"), (\"Алматы\", \"Шымкент\")]</code> → <code>2</code>.",
   "starter": "def unique_routes(trips):\n    return len(trips)\n",
   "solution": "def unique_routes(trips):\n    routes = set()\n    for a, b in trips:\n        if a < b:\n            routes.add((a, b))\n        else:\n            routes.add((b, a))\n    return len(routes)\n",
   "hints": [
    "Әр бағытты бірдей пішінге келтіріңіз: екі қаланың «кішісі» бірінші тұрсын.",
    "Кортеждерді жиынға <code>.add()</code> арқылы қосыңыз: қайталанулар өздігінен жойылады."
   ],
   "check": {
    "tests": "assert unique_routes([(\"Алматы\", \"Астана\"), (\"Астана\", \"Алматы\"), (\"Алматы\", \"Шымкент\")]) == 2, \"Алматы-Астана және Алматы-Шымкент: 2 бағыт\"\nassert unique_routes([(\"Атырау\", \"Ақтау\"), (\"Ақтау\", \"Атырау\"), (\"Ақтау\", \"Атырау\")]) == 1, \"Бір бағыт бірнеше рет кездессе де, 1\"\nassert unique_routes([]) == 0, \"Сапар жоқ болса, 0\"\nassert unique_routes([(\"Қостанай\", \"Орал\"), (\"Орал\", \"Павлодар\"), (\"Павлодар\", \"Қостанай\")]) == 3, \"Үш түрлі бағыт: 3\""
   }
  }
 ],
 "pyi-2": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Автобус билеті",
   "prompt": "<code>ticket_price(age, base=200)</code> функциясын жазыңыз: 7 жасқа дейінгі балаларға (7 кірмейді) жол тегін (<code>0</code>), 18 жасқа дейінгілерге — жарты баға (<code>base // 2</code>), қалғандарына — <code>base</code>. <code>ticket_price(10)</code> → <code>100</code>.",
   "starter": "def ticket_price(age, base):\n    pass\n",
   "solution": "def ticket_price(age, base=200):\n    if age < 7:\n        return 0\n    if age < 18:\n        return base // 2\n    return base\n",
   "hints": [
    "Әдепкі мән: <code>base=200</code>.",
    "Шарттарды кішіден бастап тексеріңіз: алдымен <code>age < 7</code>."
   ],
   "check": {
    "tests": "assert ticket_price(10) == 100, \"ticket_price(10) 100 қайтаруы керек\"\nassert ticket_price(5) == 0, \"7 жасқа дейін тегін: ticket_price(5) = 0\"\nassert ticket_price(30) == 200, \"Ересекке base: ticket_price(30) = 200\"\nassert ticket_price(30, 250) == 250 and ticket_price(16, base=250) == 125, \"base берілсе, сол баға қолданылады\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Сандардың орташасы",
   "prompt": "<code>average(*nums)</code> функциясы кез келген санды аргументтің орташа мәнін қайтарсын. Аргумент жоқ болса, <code>0</code> қайтарсын. <code>average(4, 5, 3)</code> → <code>4.0</code>.",
   "starter": "def average(nums):\n    return 0\n",
   "solution": "def average(*nums):\n    if not nums:\n        return 0\n    return sum(nums) / len(nums)\n",
   "hints": [
    "<code>*nums</code> барлық аргументті кортежге жинайды.",
    "Бос кортежде бөлмес бұрын <code>if not nums: return 0</code>."
   ],
   "check": {
    "tests": "assert average(4, 5, 3) == 4.0, \"average(4, 5, 3) 4.0 қайтаруы керек\"\nassert average(10) == 10, \"average(10) 10 болуы керек\"\nassert average() == 0, \"Аргумент жоқ болса, 0\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Lambda функциялар",
   "prompt": "Үш айнымалыға <code>lambda</code> функцияларын жазыңыз: <code>square</code> — санның квадраты; <code>is_even</code> — сан жұп болса <code>True</code>; <code>full_name</code> — екі аргументтен <code>\"Аты Тегі\"</code> жолын құрады (<code>full_name(\"Дана\", \"Серікова\")</code> → <code>\"Дана Серікова\"</code>).",
   "starter": "square = None\nis_even = None\nfull_name = None\n",
   "solution": "square = lambda x: x * x\nis_even = lambda n: n % 2 == 0\nfull_name = lambda first, last: first + \" \" + last\n",
   "hints": [
    "<code>lambda x: x * x</code> — <code>return</code> жазылмайды.",
    "Екі аргумент: <code>lambda first, last: first + \" \" + last</code>"
   ],
   "check": {
    "tests": "assert callable(square) and square.__name__ == \"<lambda>\", \"square lambda арқылы жазылуы керек\"\nassert square(7) == 49, \"square(7) 49 болуы керек\"\nassert is_even(10) is True and is_even(7) is False, \"is_even(10) True, is_even(7) False\"\nassert full_name(\"Дана\", \"Серікова\") == \"Дана Серікова\", \"full_name('Дана', 'Серікова') 'Дана Серікова' болуы керек\"\nassert is_even.__name__ == \"<lambda>\" and full_name.__name__ == \"<lambda>\", \"Барлығы lambda болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Сұрау жолын құру",
   "prompt": "<code>build_url(path, **params)</code> функциясы сайт мекенжайын құрсын: параметрлер берілсе, <code>path</code> соңына <code>?</code> қойып, <code>кілт=мән</code> жұптарын <code>&</code> арқылы берілген ретпен қосады. Параметр жоқ болса, тек <code>path</code> қайтарады. <code>build_url(\"/hotels\", city=\"Алматы\", page=2)</code> → <code>\"/hotels?city=Алматы&page=2\"</code>.",
   "starter": "def build_url(path, params):\n    return path\n",
   "solution": "def build_url(path, **params):\n    if not params:\n        return path\n    parts = [f\"{k}={v}\" for k, v in params.items()]\n    return path + \"?\" + \"&\".join(parts)\n",
   "hints": [
    "<code>**params</code> атаулы аргументтерді сөздікке жинайды.",
    "<code>\"&\".join([f\"{k}={v}\" for k, v in params.items()])</code>"
   ],
   "check": {
    "tests": "assert build_url(\"/hotels\", city=\"Алматы\", page=2) == \"/hotels?city=Алматы&page=2\", \"build_url('/hotels', city='Алматы', page=2) '/hotels?city=Алматы&page=2' болуы керек\"\nassert build_url(\"/news\") == \"/news\", \"Параметр жоқ болса, тек path\"\nassert build_url(\"/search\", q=\"домбыра\") == \"/search?q=домбыра\", \"Бір параметр: '/search?q=домбыра'\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Себетке тауар қосу",
   "prompt": "<code>add_item(item, cart=None)</code> функциясы тауарды себетке қосып, себетті қайтарсын. <code>cart</code> берілмесе, әр шақыруда <b>жаңа</b> бос тізім жасалсын (өзгермелі әдепкі мән тұзағына түспеңіз). <code>add_item(\"Нан\")</code> → <code>[\"Нан\"]</code>, ал келесі <code>add_item(\"Сүт\")</code> → <code>[\"Сүт\"]</code>.",
   "starter": "def add_item(item, cart=[]):\n    cart.append(item)\n    return cart\n",
   "solution": "def add_item(item, cart=None):\n    if cart is None:\n        cart = []\n    cart.append(item)\n    return cart\n",
   "hints": [
    "Әдепкі мән ретінде <code>None</code> беріңіз.",
    "Ішінде: <code>if cart is None: cart = []</code>"
   ],
   "check": {
    "tests": "assert add_item(\"Нан\") == [\"Нан\"], \"add_item('Нан') ['Нан'] қайтаруы керек\"\nassert add_item(\"Сүт\") == [\"Сүт\"], \"Әр жаңа шақыру бос себеттен басталуы керек: ['Сүт']\"\n_c = [\"Шай\"]\nassert add_item(\"Қант\", _c) == [\"Шай\", \"Қант\"] and _c == [\"Шай\", \"Қант\"], \"Себет берілсе, соған қосылады\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Сөздерді біріктіру",
   "prompt": "<code>join_words(*words, sep=\" \")</code> функциясы барлық сөзді <code>sep</code> арқылы біріктіріп қайтарсын. <code>join_words(\"Алматы\", \"Астана\", sep=\" → \")</code> → <code>\"Алматы → Астана\"</code>. Сөздерді тізім арқылы да беруге болатынын тексереміз: <code>join_words(*[\"а\", \"б\"])</code>.",
   "starter": "def join_words(words, sep=\" \"):\n    return \"\"\n",
   "solution": "def join_words(*words, sep=\" \"):\n    return sep.join(words)\n",
   "hints": [
    "<code>*words</code> — кортеж, оны <code>sep.join(words)</code> біріктіреді.",
    "<code>sep</code> параметрін <code>*words</code>-тан кейін жазыңыз."
   ],
   "check": {
    "tests": "assert join_words(\"Алматы\", \"Астана\", sep=\" → \") == \"Алматы → Астана\", \"join_words('Алматы', 'Астана', sep=' → ') 'Алматы → Астана' болуы керек\"\nassert join_words(\"Қайырлы\", \"таң\") == \"Қайырлы таң\", \"Әдепкі бөлгіш — бос орын\"\nassert join_words(*[\"а\", \"б\", \"в\"], sep=\"-\") == \"а-б-в\", \"Тізімді жұлдызшамен ашып беруге болады: 'а-б-в'\"\nassert join_words() == \"\", \"Сөз жоқ болса, бос жол\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Тізбекті жеңілдіктер",
   "prompt": "<code>apply_discounts(price, *percents, min_price=0)</code> функциясы бағаға жеңілдіктерді <b>кезекпен</b> қолдансын: әр пайыз алдыңғы нәтижеден есептеледі. Соңғы баға <code>min_price</code>-тан төмен болса, <code>min_price</code> қайтарылсын. Нәтиже <code>round(..., 2)</code>. <code>apply_discounts(10000, 10, 20)</code> → <code>7200.0</code> (10000 → 9000 → 7200).",
   "starter": "def apply_discounts(price, percents, min_price=0):\n    return price\n",
   "solution": "def apply_discounts(price, *percents, min_price=0):\n    for p in percents:\n        price = price * (1 - p / 100)\n    return round(max(price, min_price), 2)\n",
   "hints": [
    "Цикл: <code>for p in percents: price = price * (1 - p / 100)</code>",
    "Соңында <code>max(price, min_price)</code>, сосын <code>round</code>."
   ],
   "check": {
    "tests": "assert apply_discounts(10000, 10, 20) == 7200.0, \"apply_discounts(10000, 10, 20) 7200.0 болуы керек\"\nassert apply_discounts(5000) == 5000, \"Жеңілдік жоқ болса, баға өзгермейді\"\nassert apply_discounts(10000, 50, 50, min_price=3000) == 3000, \"2500 < 3000, сондықтан min_price = 3000\"\nassert apply_discounts(999, 15) == 849.15, \"apply_discounts(999, 15) 849.15 болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Түйіндеме профилі",
   "prompt": "<code>make_profile(name, *skills, **contacts)</code> функциясы сөздік қайтарсын: <code>\"name\"</code> — аты, <code>\"skills\"</code> — дағдылар <b>тізімі</b> (берілген ретпен), ал <code>contacts</code> ішіндегі әр жұп сөздікке жеке кілт болып қосылсын. <code>make_profile(\"Дана\", \"Python\", \"SQL\", city=\"Алматы\")</code> → <code>{\"name\": \"Дана\", \"skills\": [\"Python\", \"SQL\"], \"city\": \"Алматы\"}</code>.",
   "starter": "def make_profile(name, skills, contacts):\n    return {\"name\": name}\n",
   "solution": "def make_profile(name, *skills, **contacts):\n    profile = {\"name\": name, \"skills\": list(skills)}\n    for k, v in contacts.items():\n        profile[k] = v\n    return profile\n",
   "hints": [
    "<code>skills</code> — кортеж, оны <code>list(skills)</code> арқылы тізімге айналдырыңыз.",
    "<code>contacts.items()</code> бойынша цикл жасап, кілттерді қосыңыз."
   ],
   "check": {
    "tests": "assert make_profile(\"Дана\", \"Python\", \"SQL\", city=\"Алматы\") == {\"name\": \"Дана\", \"skills\": [\"Python\", \"SQL\"], \"city\": \"Алматы\"}, \"make_profile('Дана', 'Python', 'SQL', city='Алматы') нәтижесі дұрыс емес\"\nassert make_profile(\"Ерлан\") == {\"name\": \"Ерлан\", \"skills\": []}, \"Дағды жоқ болса, skills бос тізім\"\n_info = {\"phone\": \"+77011234567\", \"email\": \"aru@mail.kz\"}\nassert make_profile(\"Ару\", *[\"Excel\"], **_info) == {\"name\": \"Ару\", \"skills\": [\"Excel\"], \"phone\": \"+77011234567\", \"email\": \"aru@mail.kz\"}, \"Тізім мен сөздікті * және ** арқылы ашып беруге болады\""
   }
  }
 ],
 "pyi-3": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ең ұзын қала атауы",
   "prompt": "<code>longest_city(cities)</code> функциясы атауы ең ұзын қаланы қайтарсын (<code>max</code> және <code>key</code> арқылы). Ұзындықтары тең болса, тізімде бірінші тұрғаны. <code>longest_city([\"Талдықорған\", \"Алматы\", \"Тараз\"])</code> → <code>\"Талдықорған\"</code>.",
   "starter": "def longest_city(cities):\n    return cities[0]\n",
   "solution": "def longest_city(cities):\n    return max(cities, key=len)\n",
   "hints": [
    "<code>key=len</code> — әр атаудың ұзындығымен салыстыру.",
    "<code>return max(cities, key=len)</code>"
   ],
   "check": {
    "tests": "assert longest_city([\"Алматы\", \"Талдықорған\", \"Тараз\"]) == \"Талдықорған\", \"longest_city(['Алматы', 'Талдықорған', 'Тараз']) 'Талдықорған' болуы керек\"\nassert longest_city([\"Орал\", \"Ақтау\", \"Атырау\"]) == \"Атырау\", \"Ең ұзыны 'Атырау'\"\nassert longest_city([\"Сатпаев\", \"Шымкент\"]) == \"Сатпаев\", \"Ұзындық тең болса, бірінші тұрғаны\"",
    "mustInclude": [
     "key="
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Долларды теңгеге",
   "prompt": "<code>to_tenge(prices, rate)</code> функциясы доллардағы бағалар тізімін <code>map</code> арқылы теңгеге айналдырып, <b>тізім</b> қайтарсын: әр баға <code>round(p * rate)</code>. <code>to_tenge([10, 2.5], 500)</code> → <code>[5000, 1250]</code>.",
   "starter": "def to_tenge(prices, rate):\n    return prices\n",
   "solution": "def to_tenge(prices, rate):\n    return list(map(lambda p: round(p * rate), prices))\n",
   "hints": [
    "<code>map(lambda p: ..., prices)</code> әр элементке функция қолданады.",
    "<code>map</code> нәтижесін <code>list(...)</code> арқылы ораңыз."
   ],
   "check": {
    "tests": "assert to_tenge([10, 2.5], 500) == [5000, 1250], \"to_tenge([10, 2.5], 500) [5000, 1250] болуы керек\"\nassert to_tenge([1.99], 480) == [955], \"round(1.99 * 480) = 955\"\nassert to_tenge([], 500) == [], \"Бос тізім → бос тізім\"",
    "mustInclude": [
     "map("
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жылы күндер",
   "prompt": "Ақпандағы ауа температурасы берілген. <code>warm_days(temps)</code> функциясы <code>filter</code> арқылы 0-ден жоғары температураларды бастапқы ретпен тізім етіп қайтарсын. <code>warm_days([-5, 2, 0, 4, -1])</code> → <code>[2, 4]</code>.",
   "starter": "def warm_days(temps):\n    return temps\n",
   "solution": "def warm_days(temps):\n    return list(filter(lambda t: t > 0, temps))\n",
   "hints": [
    "<code>filter(lambda t: t > 0, temps)</code>",
    "Нәтижені <code>list(...)</code> етіңіз."
   ],
   "check": {
    "tests": "assert warm_days([-5, 2, 0, 4, -1]) == [2, 4], \"warm_days([-5, 2, 0, 4, -1]) [2, 4] болуы керек\"\nassert warm_days([-10, -3]) == [], \"Жылы күн жоқ болса, бос тізім\"\nassert warm_days([1, 1, 3]) == [1, 1, 3], \"Барлығы жылы болса, тізім өзгермейді\"",
    "mustInclude": [
     "filter("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Оқушылар рейтингі",
   "prompt": "Оқушылар <code>{\"name\": ..., \"grade\": ...}</code> сөздіктерімен берілген. <code>rank(students)</code> функциясы аттардың тізімін қайтарсын: алдымен баға бойынша кему, бағалар тең болса — аты бойынша әліпби ретімен. <code>sorted</code> және <code>key</code> қолданыңыз.",
   "starter": "def rank(students):\n    return [s[\"name\"] for s in students]\n",
   "solution": "def rank(students):\n    ordered = sorted(students, key=lambda s: (-s[\"grade\"], s[\"name\"]))\n    return [s[\"name\"] for s in ordered]\n",
   "hints": [
    "Кортеж кілт: <code>key=lambda s: (-s[\"grade\"], s[\"name\"])</code>",
    "Сұрыптаған соң тек аттарын алыңыз."
   ],
   "check": {
    "tests": "_st = [{\"name\": \"Ерлан\", \"grade\": 4}, {\"name\": \"Айгүл\", \"grade\": 5}, {\"name\": \"Бекзат\", \"grade\": 4}, {\"name\": \"Дана\", \"grade\": 5}]\nassert rank(_st) == [\"Айгүл\", \"Дана\", \"Бекзат\", \"Ерлан\"], \"Нәтиже ['Айгүл', 'Дана', 'Бекзат', 'Ерлан'] болуы керек\"\nassert rank([{\"name\": \"Нұр\", \"grade\": 3}]) == [\"Нұр\"], \"Бір оқушы: ['Нұр']\"",
    "mustInclude": [
     "key="
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең арзан тауар",
   "prompt": "Тауар атаулары мен бағалары екі бөлек тізімде. <code>cheapest(names, prices)</code> функциясы <code>zip</code> арқылы оларды жұптап, ең арзан тауардың <b>атауын</b> қайтарсын (<code>min</code> және <code>key</code>). <code>cheapest([\"Нан\", \"Сүт\", \"Шай\"], [250, 520, 1300])</code> → <code>\"Нан\"</code>.",
   "starter": "def cheapest(names, prices):\n    return names[0]\n",
   "solution": "def cheapest(names, prices):\n    return min(zip(names, prices), key=lambda p: p[1])[0]\n",
   "hints": [
    "<code>zip(names, prices)</code> жұптар береді: (\"Нан\", 250), ...",
    "<code>min(..., key=lambda p: p[1])[0]</code>"
   ],
   "check": {
    "tests": "assert cheapest([\"Нан\", \"Сүт\", \"Шай\"], [250, 520, 1300]) == \"Нан\", \"cheapest(['Нан', 'Сүт', 'Шай'], [250, 520, 1300]) 'Нан' болуы керек\"\nassert cheapest([\"Ірімшік\", \"Айран\", \"Қымыз\"], [2400, 380, 900]) == \"Айран\", \"Ең арзаны 'Айран' (380)\"",
    "mustInclude": [
     "zip(",
     "key="
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Элемент орындары",
   "prompt": "<code>positions(xs, target)</code> функциясы <code>target</code> мәні тізімде қай индекстерде тұрғанын <code>enumerate</code> арқылы тауып, индекстер тізімін қайтарсын (0-ден). <code>positions([\"Алматы\", \"Астана\", \"Алматы\"], \"Алматы\")</code> → <code>[0, 2]</code>.",
   "starter": "def positions(xs, target):\n    return []\n",
   "solution": "def positions(xs, target):\n    return [i for i, x in enumerate(xs) if x == target]\n",
   "hints": [
    "<code>for i, x in enumerate(xs)</code> индекс пен мәнді бірге береді.",
    "<code>[i for i, x in enumerate(xs) if x == target]</code>"
   ],
   "check": {
    "tests": "assert positions([\"Алматы\", \"Астана\", \"Алматы\"], \"Алматы\") == [0, 2], \"positions(['Алматы', 'Астана', 'Алматы'], 'Алматы') [0, 2] болуы керек\"\nassert positions([5, 3, 5, 5], 5) == [0, 2, 3], \"positions([5, 3, 5, 5], 5) [0, 2, 3] болуы керек\"\nassert positions([1, 2], 9) == [], \"Табылмаса, бос тізім\"",
    "mustInclude": [
     "enumerate("
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Үздік N ойыншы",
   "prompt": "<code>scores</code> — сөздік (ойыншы → ұпай). <code>top_n(scores, n)</code> функциясы ең көп ұпай жинаған <code>n</code> ойыншының атын тізім етіп қайтарсын: ұпай бойынша кему, тең болса — аты бойынша әліпби ретімен. <code>n</code> ойыншылар санынан көп болса, барлығын қайтарсын.",
   "starter": "def top_n(scores, n):\n    return list(scores)[:n]\n",
   "solution": "def top_n(scores, n):\n    ordered = sorted(scores.items(), key=lambda p: (-p[1], p[0]))\n    return [name for name, s in ordered[:n]]\n",
   "hints": [
    "<code>scores.items()</code> жұптарын <code>key=lambda p: (-p[1], p[0])</code> бойынша сұрыптаңыз.",
    "Кесінді <code>[:n]</code> тізімнен ұзын болса да қате бермейді."
   ],
   "check": {
    "tests": "_s = {\"Әли\": 820, \"Дана\": 1450, \"Ерлан\": 990, \"Айбек\": 990, \"Сая\": 1210}\nassert top_n(_s, 3) == [\"Дана\", \"Сая\", \"Айбек\"], \"top_n(_s, 3) ['Дана', 'Сая', 'Айбек'] болуы керек (Айбек пен Ерлан тең, әліпби бойынша)\"\nassert top_n(_s, 1) == [\"Дана\"], \"top_n(_s, 1) ['Дана'] болуы керек\"\nassert top_n({\"Нұр\": 5}, 10) == [\"Нұр\"], \"n көп болса, барлығын қайтарыңыз\"",
    "mustInclude": [
     "sorted(",
     "key="
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ең пайдалы күн",
   "prompt": "Апта күндері, түсім және шығын үш тізімде берілген. <code>best_day(days, income, costs)</code> функциясы <code>zip</code> арқылы оларды біріктіріп, пайдасы (түсім − шығын) ең көп күн мен сол пайданы кортеж ретінде қайтарсын: <code>(\"сәрсенбі\", 41000)</code>. Пайда тең болса, ертерек күн.",
   "starter": "def best_day(days, income, costs):\n    return days[0], 0\n",
   "solution": "def best_day(days, income, costs):\n    profits = [(d, i - c) for d, i, c in zip(days, income, costs)]\n    return max(profits, key=lambda p: p[1])\n",
   "hints": [
    "<code>zip</code> үш тізімді де тігеді: <code>for d, i, c in zip(days, income, costs)</code>.",
    "Пайда жұптарының тізімін құрып, <code>max(..., key=lambda p: p[1])</code>."
   ],
   "check": {
    "tests": "_d = [\"дүйсенбі\", \"сейсенбі\", \"сәрсенбі\"]\nassert best_day(_d, [50000, 62000, 70000], [20000, 30000, 29000]) == (\"сәрсенбі\", 41000), \"Нәтиже ('сәрсенбі', 41000) болуы керек\"\nassert best_day([\"жұма\", \"сенбі\"], [10000, 15000], [5000, 10000]) == (\"жұма\", 5000), \"Пайда тең болса, ертерек күн\"",
    "mustInclude": [
     "zip(",
     "key="
    ]
   }
  }
 ],
 "pyi-4": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Сандар квадраттары",
   "prompt": "Dict comprehension арқылы <code>squares(n)</code> функциясын жазыңыз: ол 1-ден <code>n</code>-ге дейінгі әр санды оның квадратына сәйкестейтін сөздік қайтарсын. <code>squares(3)</code> → <code>{1: 1, 2: 4, 3: 9}</code>.",
   "starter": "def squares(n):\n    return {}\n",
   "solution": "def squares(n):\n    return {i: i * i for i in range(1, n + 1)}\n",
   "hints": [
    "<code>{i: i * i for i in ...}</code>",
    "<code>range(1, n + 1)</code> соңғы санды да қамтиды."
   ],
   "check": {
    "tests": "assert squares(3) == {1: 1, 2: 4, 3: 9}, \"squares(3) {1: 1, 2: 4, 3: 9} болуы керек\"\nassert squares(0) == {}, \"squares(0) бос сөздік\"\nassert squares(10)[10] == 100 and len(squares(10)) == 10, \"squares(10) ішінде 10 кілт, 10 → 100\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бас әріптер жиыны",
   "prompt": "Set comprehension арқылы <code>first_letters(names)</code> функциясын жазыңыз: ол аттардың бірінші әріптерін бас әріп етіп (<code>.upper()</code>), қайталанбайтын жиын қайтарсын. <code>first_letters([\"арман\", \"Айгүл\", \"дана\"])</code> → <code>{\"А\", \"Д\"}</code>.",
   "starter": "def first_letters(names):\n    return set()\n",
   "solution": "def first_letters(names):\n    return {n[0].upper() for n in names}\n",
   "hints": [
    "<code>n[0]</code> — бірінші әріп.",
    "<code>{n[0].upper() for n in names}</code>"
   ],
   "check": {
    "tests": "assert first_letters([\"арман\", \"Айгүл\", \"дана\"]) == {\"А\", \"Д\"}, \"first_letters(['арман', 'Айгүл', 'дана']) {'А', 'Д'} болуы керек\"\nassert first_letters([\"Ерлан\", \"ерке\", \"Өмір\"]) == {\"Е\", \"Ө\"}, \"first_letters(['Ерлан', 'ерке', 'Өмір']) {'Е', 'Ө'} болуы керек\"\nassert first_letters([]) == set(), \"Бос тізім → бос жиын\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қоймадағы тауарлар",
   "prompt": "<code>in_stock(stock)</code> функциясы қойма сөздігінен (тауар → саны) тек саны 0-ден көп тауарларды қалдырып, жаңа сөздік қайтарсын. Dict comprehension қолданыңыз.",
   "starter": "def in_stock(stock):\n    return stock\n",
   "solution": "def in_stock(stock):\n    return {name: q for name, q in stock.items() if q > 0}\n",
   "hints": [
    "<code>for name, q in stock.items()</code>",
    "Соңына сүзгі: <code>if q > 0</code>"
   ],
   "check": {
    "tests": "assert in_stock({\"Нан\": 12, \"Сүт\": 0, \"Шай\": 4}) == {\"Нан\": 12, \"Шай\": 4}, \"in_stock({'Нан': 12, 'Сүт': 0, 'Шай': 4}) {'Нан': 12, 'Шай': 4} болуы керек\"\nassert in_stock({\"Май\": 0}) == {}, \"Бәрі таусылса, бос сөздік\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Баға әріптері",
   "prompt": "<code>letters(scores)</code> функциясы (аты → балл) сөздігінен (аты → әріп) сөздігін жасасын: 90 және жоғары — <code>\"A\"</code>, 75 және жоғары — <code>\"B\"</code>, қалғаны — <code>\"C\"</code>. Бір dict comprehension жазыңыз, мәнде <code>if ... else</code> өрнегін қолданыңыз.",
   "starter": "def letters(scores):\n    return {}\n",
   "solution": "def letters(scores):\n    return {n: (\"A\" if s >= 90 else \"B\" if s >= 75 else \"C\") for n, s in scores.items()}\n",
   "hints": [
    "Тізбекті таңдау: <code>\"A\" if s >= 90 else \"B\" if s >= 75 else \"C\"</code>",
    "Элементтер сүзілмейді, тек мәні таңдалады."
   ],
   "check": {
    "tests": "assert letters({\"Әли\": 92, \"Дана\": 75, \"Ерлан\": 60}) == {\"Әли\": \"A\", \"Дана\": \"B\", \"Ерлан\": \"C\"}, \"letters({'Әли': 92, 'Дана': 75, 'Ерлан': 60}) {'Әли': 'A', 'Дана': 'B', 'Ерлан': 'C'} болуы керек\"\nassert letters({\"Сая\": 90, \"Нұр\": 74}) == {\"Сая\": \"A\", \"Нұр\": \"C\"}, \"90 → A, 74 → C\"\nassert letters({}) == {}, \"Бос сөздік → бос сөздік\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Миллионер қалалар",
   "prompt": "<code>millions(pop)</code> функциясы (қала → тұрғын саны) сөздігінен тек 1 000 000 және одан көп тұрғыны бар қалаларды алып, тұрғын санын миллионмен көрсетсін: <code>round(p / 1_000_000, 1)</code>. <code>{\"Алматы\": 2_250_000, \"Тараз\": 380_000}</code> → <code>{\"Алматы\": 2.2}</code>.",
   "starter": "def millions(pop):\n    return pop\n",
   "solution": "def millions(pop):\n    return {city: round(p / 1_000_000, 1) for city, p in pop.items() if p >= 1_000_000}\n",
   "hints": [
    "Сүзгі соңында: <code>if p >= 1_000_000</code>",
    "Мән: <code>round(p / 1_000_000, 1)</code>"
   ],
   "check": {
    "tests": "assert millions({\"Алматы\": 2_250_000, \"Тараз\": 380_000}) == {\"Алматы\": 2.2}, \"millions(...) {'Алматы': 2.2} болуы керек\"\nassert millions({\"Астана\": 1_420_000, \"Шымкент\": 1_200_000, \"Орал\": 330_000}) == {\"Астана\": 1.4, \"Шымкент\": 1.2}, \"Астана 1.4, Шымкент 1.2, Орал кірмейді\"\nassert millions({\"Ақтау\": 260_000}) == {}, \"Миллионер қала жоқ болса, бос сөздік\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Барлық тегтер",
   "prompt": "Блогтағы әр жазбаның тегтер тізімі бар. <code>all_tags(posts)</code> функциясы барлық жазбадағы тегтерді кіші әріппен (<code>.lower()</code>) қайталанбайтын жиын етіп қайтарсын. Бір set comprehension ішінде екі <code>for</code> жазыңыз.",
   "starter": "def all_tags(posts):\n    return set()\n",
   "solution": "def all_tags(posts):\n    return {tag.lower() for tags in posts for tag in tags}\n",
   "hints": [
    "Екі <code>for</code>: <code>for tags in posts for tag in tags</code>",
    "<code>{tag.lower() for tags in posts for tag in tags}</code>"
   ],
   "check": {
    "tests": "assert all_tags([[\"Python\", \"Алматы\"], [\"python\", \"IT\"], []]) == {\"python\", \"алматы\", \"it\"}, \"all_tags(...) {'python', 'алматы', 'it'} болуы керек\"\nassert all_tags([]) == set(), \"Жазба жоқ болса, бос жиын\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Топтағы студент саны",
   "prompt": "Студенттер <code>(аты, тобы)</code> кортеждерімен берілген. <code>group_sizes(students)</code> функциясы (топ → студент саны) сөздігін қайтарсын. Цикл емес, comprehension жазыңыз: алдымен топтар жиынын set comprehension арқылы алыңыз, сосын dict comprehension ішінде әр топты санаңыз.",
   "starter": "def group_sizes(students):\n    return {}\n",
   "solution": "def group_sizes(students):\n    groups = {g for _, g in students}\n    return {g: sum(1 for _, gg in students if gg == g) for g in groups}\n",
   "hints": [
    "Топтар: <code>{g for _, g in students}</code>",
    "Санау: <code>sum(1 for _, gg in students if gg == g)</code>"
   ],
   "check": {
    "tests": "_st = [(\"Әли\", \"IT-21\"), (\"Дана\", \"IT-22\"), (\"Ерлан\", \"IT-21\"), (\"Сая\", \"IT-21\"), (\"Нұр\", \"IT-22\")]\nassert group_sizes(_st) == {\"IT-21\": 3, \"IT-22\": 2}, \"group_sizes(...) {'IT-21': 3, 'IT-22': 2} болуы керек\"\nassert group_sizes([]) == {}, \"Студент жоқ болса, бос сөздік\"\nassert group_sizes([(\"Аян\", \"ФМ-1\")]) == {\"ФМ-1\": 1}, \"Бір студент: {'ФМ-1': 1}\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ең төмен бағалар",
   "prompt": "Бірнеше дүкеннің бағалары берілген: <code>shops</code> — (дүкен → (тауар → баға)) сөздігі. <code>lowest_prices(shops)</code> функциясы әр тауардың барлық дүкендегі ең төмен бағасын сөздік етіп қайтарсын. Тауар кейбір дүкенде болмауы мүмкін. Comprehension қолданыңыз.",
   "starter": "def lowest_prices(shops):\n    return {}\n",
   "solution": "def lowest_prices(shops):\n    products = {p for prices in shops.values() for p in prices}\n    return {p: min(pr[p] for pr in shops.values() if p in pr) for p in products}\n",
   "hints": [
    "Алдымен барлық тауар атауларының жиыны: <code>{p for prices in shops.values() for p in prices}</code>.",
    "Ең төмен баға: <code>min(pr[p] for pr in shops.values() if p in pr)</code>"
   ],
   "check": {
    "tests": "_shops = {\"Magnum\": {\"Нан\": 240, \"Сүт\": 520}, \"Small\": {\"Нан\": 260, \"Сүт\": 490, \"Шай\": 1300}, \"Анвар\": {\"Шай\": 1250}}\nassert lowest_prices(_shops) == {\"Нан\": 240, \"Сүт\": 490, \"Шай\": 1250}, \"lowest_prices(...) {'Нан': 240, 'Сүт': 490, 'Шай': 1250} болуы керек\"\nassert lowest_prices({}) == {}, \"Дүкен жоқ болса, бос сөздік\""
   }
  }
 ],
 "pyi-5": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Сандар қосындысы",
   "prompt": "Рекурсивті <code>sum_to(n)</code> функциясын жазыңыз: ол 1 + 2 + … + n қосындысын қайтарсын (<code>n</code> ≥ 0, <code>sum_to(0) = 0</code>). Цикл мен <code>sum</code> қолданбаңыз. <code>sum_to(5)</code> → <code>15</code>.",
   "starter": "def sum_to(n):\n    return 0\n",
   "solution": "def sum_to(n):\n    if n == 0:\n        return 0\n    return n + sum_to(n - 1)\n",
   "hints": [
    "Базалық жағдай: <code>if n == 0: return 0</code>",
    "Рекурсивті қадам: <code>n + sum_to(n - 1)</code>"
   ],
   "check": {
    "tests": "assert sum_to(5) == 15, \"sum_to(5) 15 болуы керек\"\nassert sum_to(0) == 0, \"sum_to(0) 0 болуы керек\"\nassert sum_to(100) == 5050, \"sum_to(100) 5050 болуы керек\"\nassert \"sum_to\" in sum_to.__code__.co_names, \"Функция өзін-өзі шақыруы керек (рекурсия)\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жолды кері айналдыру",
   "prompt": "Рекурсивті <code>reverse(s)</code> функциясы жолды кері ретпен қайтарсын. Кесінді <code>[::-1]</code> мен циклді қолданбаңыз: бос жол — базалық жағдай, әйтпесе <code>reverse(s[1:]) + s[0]</code>. <code>reverse(\"Абай\")</code> → <code>\"йабА\"</code>.",
   "starter": "def reverse(s):\n    return s\n",
   "solution": "def reverse(s):\n    if s == \"\":\n        return \"\"\n    return reverse(s[1:]) + s[0]\n",
   "hints": [
    "Базалық жағдай: <code>if s == \"\": return \"\"</code>",
    "<code>return reverse(s[1:]) + s[0]</code>"
   ],
   "check": {
    "tests": "assert reverse(\"Абай\") == \"йабА\", \"reverse('Абай') 'йабА' болуы керек\"\nassert reverse(\"\") == \"\", \"Бос жол → бос жол\"\nassert reverse(\"қала\") == \"алақ\", \"reverse('қала') 'алақ' болуы керек\"\nassert \"reverse\" in reverse.__code__.co_names, \"Функция өзін-өзі шақыруы керек (рекурсия)\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Цифрлар саны",
   "prompt": "Рекурсивті <code>count_digits(n)</code> функциясы оң бүтін санның цифрлар санын қайтарсын (<code>str</code> мен циклсіз). <code>n < 10</code> болса — 1, әйтпесе <code>1 + count_digits(n // 10)</code>. <code>count_digits(2026)</code> → <code>4</code>.",
   "starter": "def count_digits(n):\n    return 0\n",
   "solution": "def count_digits(n):\n    if n < 10:\n        return 1\n    return 1 + count_digits(n // 10)\n",
   "hints": [
    "<code>n // 10</code> соңғы цифрды алып тастайды.",
    "Базалық жағдай: <code>if n < 10: return 1</code>"
   ],
   "check": {
    "tests": "assert count_digits(2026) == 4, \"count_digits(2026) 4 болуы керек\"\nassert count_digits(7) == 1, \"count_digits(7) 1 болуы керек\"\nassert count_digits(1000000) == 7, \"count_digits(1000000) 7 болуы керек\"\nassert \"count_digits\" in count_digits.__code__.co_names, \"Функция өзін-өзі шақыруы керек (рекурсия)\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Тізімнің ең үлкені",
   "prompt": "Рекурсивті <code>biggest(xs)</code> функциясы бос емес тізімнің ең үлкен элементін қайтарсын. <code>max</code> мен циклді қолданбаңыз: бір элемент қалса — сол, әйтпесе бірінші элемент пен <code>biggest(xs[1:])</code> нәтижесінің үлкенін алыңыз.",
   "starter": "def biggest(xs):\n    return xs[0]\n",
   "solution": "def biggest(xs):\n    if len(xs) == 1:\n        return xs[0]\n    rest = biggest(xs[1:])\n    if xs[0] > rest:\n        return xs[0]\n    return rest\n",
   "hints": [
    "Базалық жағдай: <code>if len(xs) == 1: return xs[0]</code>",
    "<code>rest = biggest(xs[1:])</code>, сосын <code>xs[0]</code>-мен салыстырыңыз."
   ],
   "check": {
    "tests": "assert biggest([3, 17, 8, 21, 5]) == 21, \"biggest([3, 17, 8, 21, 5]) 21 болуы керек\"\nassert biggest([42]) == 42, \"Бір элемент: 42\"\nassert biggest([-7, -2, -9]) == -2, \"Теріс сандарда: -2\"\nassert \"biggest\" in biggest.__code__.co_names, \"Функция өзін-өзі шақыруы керек (рекурсия)\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Палиндромды тексеру",
   "prompt": "Рекурсивті <code>is_palindrome(s)</code> функциясы сөз екі жағынан бірдей оқылса <code>True</code> қайтарсын. Ұзындығы 0 немесе 1 болса — <code>True</code>; бірінші мен соңғы әріп әртүрлі болса — <code>False</code>; әйтпесе ортасын (<code>s[1:-1]</code>) тексеріңіз. <code>is_palindrome(\"қазақ\")</code> → <code>True</code>.",
   "starter": "def is_palindrome(s):\n    return True\n",
   "solution": "def is_palindrome(s):\n    if len(s) <= 1:\n        return True\n    if s[0] != s[-1]:\n        return False\n    return is_palindrome(s[1:-1])\n",
   "hints": [
    "Екі базалық жағдай: ұзындық ≤ 1 және шеткі әріптер әртүрлі.",
    "<code>return is_palindrome(s[1:-1])</code>"
   ],
   "check": {
    "tests": "assert is_palindrome(\"қазақ\") is True, \"is_palindrome('қазақ') True болуы керек\"\nassert is_palindrome(\"алма\") is False, \"is_palindrome('алма') False болуы керек\"\nassert is_palindrome(\"\") is True and is_palindrome(\"а\") is True, \"Бос жол және бір әріп — палиндром\"\nassert is_palindrome(\"абба\") is True, \"is_palindrome('абба') True болуы керек\"\nassert \"is_palindrome\" in is_palindrome.__code__.co_names, \"Функция өзін-өзі шақыруы керек (рекурсия)\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең үлкен ортақ бөлгіш",
   "prompt": "Евклид алгоритмін рекурсиямен жазыңыз: <code>gcd(a, b)</code>. Егер <code>b == 0</code> болса, жауап <code>a</code>; әйтпесе <code>gcd(b, a % b)</code>. Мысалы, 48 алма мен 36 алмұртты бірдей себеттерге бөлгенде ең көп себет саны: <code>gcd(48, 36)</code> → <code>12</code>.",
   "starter": "def gcd(a, b):\n    return 1\n",
   "solution": "def gcd(a, b):\n    if b == 0:\n        return a\n    return gcd(b, a % b)\n",
   "hints": [
    "Базалық жағдай: <code>if b == 0: return a</code>",
    "<code>return gcd(b, a % b)</code>"
   ],
   "check": {
    "tests": "assert gcd(48, 36) == 12, \"gcd(48, 36) 12 болуы керек\"\nassert gcd(17, 5) == 1, \"gcd(17, 5) 1 болуы керек\"\nassert gcd(100, 0) == 100, \"gcd(100, 0) 100 болуы керек\"\nassert gcd(270, 192) == 6, \"gcd(270, 192) 6 болуы керек\"\nassert \"gcd\" in gcd.__code__.co_names, \"Функция өзін-өзі шақыруы керек (рекурсия)\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ішкі тізімдер қосындысы",
   "prompt": "Дүкен филиалдарының сатылымы ішкі тізімдерде сақталған (аймақ → қала → дүкен). Рекурсивті <code>nested_sum(items)</code> функциясы кез келген тереңдіктегі барлық сандардың қосындысын қайтарсын. <code>nested_sum([10, [20, [30]], 40])</code> → <code>100</code>.",
   "starter": "def nested_sum(items):\n    return 0\n",
   "solution": "def nested_sum(items):\n    total = 0\n    for x in items:\n        if isinstance(x, list):\n            total += nested_sum(x)\n        else:\n            total += x\n    return total\n",
   "hints": [
    "Әр элемент тізім бе, жоқ па: <code>isinstance(x, list)</code>.",
    "Тізім болса — <code>nested_sum(x)</code> нәтижесін қосыңыз."
   ],
   "check": {
    "tests": "assert nested_sum([10, [20, [30]], 40]) == 100, \"nested_sum([10, [20, [30]], 40]) 100 болуы керек\"\nassert nested_sum([]) == 0, \"Бос тізім → 0\"\nassert nested_sum([[[[5]]], [], [1, [2, 3]]]) == 11, \"Терең және бос ішкі тізімдер: 11\"\nassert \"nested_sum\" in nested_sum.__code__.co_names, \"Функция өзін-өзі шақыруы керек (рекурсия)\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Тізім тереңдігі",
   "prompt": "Рекурсивті <code>depth(items)</code> функциясы тізімнің кірістірілу тереңдігін қайтарсын: ішінде тізім жоқ тізімнің тереңдігі 1, ал әйтпесе 1 + ішкі тізімдердің ең үлкен тереңдігі. <code>depth([1, 2])</code> → <code>1</code>, <code>depth([1, [2, [3]], [4]])</code> → <code>3</code>, <code>depth([])</code> → <code>1</code>.",
   "starter": "def depth(items):\n    return 1\n",
   "solution": "def depth(items):\n    deepest = 0\n    for x in items:\n        if isinstance(x, list):\n            d = depth(x)\n            if d > deepest:\n                deepest = d\n    return 1 + deepest\n",
   "hints": [
    "Ішкі тізімдердің ең үлкен тереңдігін айнымалыда сақтаңыз (басында 0).",
    "Соңында <code>return 1 + deepest</code>"
   ],
   "check": {
    "tests": "assert depth([1, 2]) == 1, \"depth([1, 2]) 1 болуы керек\"\nassert depth([1, [2, [3]], [4]]) == 3, \"depth([1, [2, [3]], [4]]) 3 болуы керек\"\nassert depth([]) == 1, \"depth([]) 1 болуы керек\"\nassert depth([[[[]]]]) == 4, \"depth([[[[]]]]) 4 болуы керек\"\nassert \"depth\" in depth.__code__.co_names, \"Функция өзін-өзі шақыруы керек (рекурсия)\""
   }
  }
 ],
 "pyi-6": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Тіктөртбұрыш класы",
   "prompt": "<code>Rectangle</code> класын жазыңыз: <code>__init__(self, width, height)</code> екі атрибутты сақтасын; <code>area()</code> ауданды, <code>perimeter()</code> периметрді қайтарсын. Мысалы, 20 × 15 м жер учаскесі: ауданы 300, периметрі 70.",
   "starter": "class Rectangle:\n    pass\n",
   "solution": "class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n\n    def area(self):\n        return self.width * self.height\n\n    def perimeter(self):\n        return 2 * (self.width + self.height)\n",
   "hints": [
    "<code>self.width = width</code>, <code>self.height = height</code>",
    "Периметр: <code>2 * (self.width + self.height)</code>"
   ],
   "check": {
    "tests": "_r = Rectangle(20, 15)\nassert _r.width == 20 and _r.height == 15, \"__init__ width пен height сақтауы керек\"\nassert _r.area() == 300, \"Rectangle(20, 15).area() 300 болуы керек\"\nassert _r.perimeter() == 70, \"Rectangle(20, 15).perimeter() 70 болуы керек\"\nassert Rectangle(1, 1).area() == 1, \"Әр объект өз өлшемдерін қолданады\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Термометр",
   "prompt": "<code>Thermometer</code> класын жазыңыз: <code>__init__(self, city, celsius)</code>; <code>fahrenheit()</code> әдісі <code>celsius * 9 / 5 + 32</code> қайтарсын; <code>is_frost()</code> — температура 0-ден төмен болса <code>True</code>.",
   "starter": "class Thermometer:\n    def __init__(self, city, celsius):\n        self.city = city\n",
   "solution": "class Thermometer:\n    def __init__(self, city, celsius):\n        self.city = city\n        self.celsius = celsius\n\n    def fahrenheit(self):\n        return self.celsius * 9 / 5 + 32\n\n    def is_frost(self):\n        return self.celsius < 0\n",
   "hints": [
    "Әр әдістің бірінші параметрі — <code>self</code>.",
    "<code>return self.celsius * 9 / 5 + 32</code>"
   ],
   "check": {
    "tests": "_t = Thermometer(\"Астана\", -20)\nassert _t.city == \"Астана\" and _t.celsius == -20, \"city мен celsius сақталуы керек\"\nassert _t.fahrenheit() == -4.0, \"-20 °C = -4.0 °F\"\nassert _t.is_frost() is True, \"-20 °C — аяз: True\"\nassert Thermometer(\"Шымкент\", 35).is_frost() is False, \"35 °C аяз емес: False\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қала сипаттамасы",
   "prompt": "<code>City</code> класын жазыңыз: <code>__init__(self, name, population)</code>. <code>__str__</code> мына жолды қайтарсын: <code>\"Алматы: 2250000 адам\"</code>, ал <code>__repr__</code> — <code>\"City('Алматы', 2250000)\"</code>.",
   "starter": "class City:\n    def __init__(self, name, population):\n        self.name = name\n        self.population = population\n",
   "solution": "class City:\n    def __init__(self, name, population):\n        self.name = name\n        self.population = population\n\n    def __str__(self):\n        return f\"{self.name}: {self.population} адам\"\n\n    def __repr__(self):\n        return f\"City({self.name!r}, {self.population})\"\n",
   "hints": [
    "<code>__str__</code> — <code>print</code> үшін, <code>__repr__</code> — тізім ішінде көрсету үшін.",
    "<code>!r</code> жолды тырнақшамен береді: <code>f\"City({self.name!r}, {self.population})\"</code>"
   ],
   "check": {
    "tests": "_c = City(\"Алматы\", 2250000)\nassert str(_c) == \"Алматы: 2250000 адам\", \"str(City('Алматы', 2250000)) 'Алматы: 2250000 адам' болуы керек\"\nassert repr(_c) == \"City('Алматы', 2250000)\", \"repr: City('Алматы', 2250000)\"\nassert str([City(\"Орал\", 330000)]) == \"[City('Орал', 330000)]\", \"Тізім ішінде __repr__ қолданылады\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Сатып алу себеті",
   "prompt": "<code>Cart</code> класын жазыңыз. Әр себетте өз <code>items</code> тізімі болсын (басында бос). <code>add(name, price, qty=1)</code> тізімге <code>(name, price, qty)</code> кортежін қосады; <code>total()</code> — жалпы сома; <code>count()</code> — барлық тауар данасының саны.",
   "starter": "class Cart:\n    items = []\n",
   "solution": "class Cart:\n    def __init__(self):\n        self.items = []\n\n    def add(self, name, price, qty=1):\n        self.items.append((name, price, qty))\n\n    def total(self):\n        return sum(p * q for _, p, q in self.items)\n\n    def count(self):\n        return sum(q for _, _, q in self.items)\n",
   "hints": [
    "Тізімді <code>__init__</code> ішінде <code>self.items = []</code> деп жасаңыз, сонда әр себетте өзінікі болады.",
    "<code>total</code>: әр кортеж үшін <code>price * qty</code> қосыңыз."
   ],
   "check": {
    "tests": "_a = Cart(); _b = Cart()\n_a.add(\"Нан\", 250, 2); _a.add(\"Ірімшік\", 2400)\nassert _a.items == [(\"Нан\", 250, 2), (\"Ірімшік\", 2400, 1)], \"add (name, price, qty) кортежін қосуы керек, qty әдепкіде 1\"\nassert _a.total() == 2900, \"total() = 250*2 + 2400 = 2900\"\nassert _a.count() == 3, \"count() = 2 + 1 = 3\"\nassert _b.items == [] and _b.total() == 0, \"Әр себеттің тізімі бөлек болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Көлік жүрісі",
   "prompt": "<code>Car</code> класы: класс атрибуты <code>total_km = 0</code> барлық көліктің жалпы жүрісін сақтасын. Әр көлікте <code>plate</code> (нөмір) және <code>km = 0</code>. <code>drive(distance)</code> көліктің <code>km</code>-ін де, <code>Car.total_km</code>-ді де өсірсін.",
   "starter": "class Car:\n    total_km = 0\n\n    def __init__(self, plate):\n        self.plate = plate\n",
   "solution": "class Car:\n    total_km = 0\n\n    def __init__(self, plate):\n        self.plate = plate\n        self.km = 0\n\n    def drive(self, distance):\n        self.km += distance\n        Car.total_km += distance\n",
   "hints": [
    "Класс атрибутын <code>Car.total_km += distance</code> арқылы өзгертіңіз.",
    "Объект атрибуты: <code>self.km += distance</code>"
   ],
   "check": {
    "tests": "_t0 = Car.total_km\n_x = Car(\"777ABA02\"); _y = Car(\"123KZ01\")\nassert _x.km == 0, \"Бастапқы km = 0\"\n_x.drive(120); _y.drive(30); _x.drive(50)\nassert _x.km == 170 and _y.km == 30, \"Әр көліктің km-і бөлек есептеледі\"\nassert Car.total_km == _t0 + 200, \"Car.total_km барлық жүрістің қосындысы болуы керек\"\nassert \"total_km\" not in vars(_x), \"self.total_km емес, Car.total_km өзгертіңіз\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Оқушы бағалары",
   "prompt": "<code>Pupil</code> класын жазыңыз: <code>__init__(self, name)</code>, әр оқушыда <code>marks</code> бос тізімі. <code>add_mark(m)</code> бағаны тек 1-ден 5-ке дейін болса қосып, <code>True</code> қайтарсын; әйтпесе қоспай, <code>False</code>. <code>best()</code> — ең жоғары баға, баға жоқ болса <code>None</code>.",
   "starter": "class Pupil:\n    def __init__(self, name):\n        self.name = name\n",
   "solution": "class Pupil:\n    def __init__(self, name):\n        self.name = name\n        self.marks = []\n\n    def add_mark(self, m):\n        if 1 <= m <= 5:\n            self.marks.append(m)\n            return True\n        return False\n\n    def best(self):\n        if not self.marks:\n            return None\n        return max(self.marks)\n",
   "hints": [
    "Тексеру: <code>if 1 <= m <= 5:</code>",
    "<code>best</code>: бос тізімде <code>None</code>, әйтпесе <code>max(self.marks)</code>."
   ],
   "check": {
    "tests": "_p = Pupil(\"Аружан\")\nassert _p.marks == [] and _p.best() is None, \"Басында marks бос, best() None\"\nassert _p.add_mark(4) is True and _p.add_mark(5) is True, \"Дұрыс бағада True\"\nassert _p.add_mark(7) is False and _p.add_mark(0) is False, \"1–5 аралығынан тыс бағада False\"\nassert _p.marks == [4, 5], \"Қате бағалар қосылмауы керек: [4, 5]\"\nassert _p.best() == 5, \"best() = 5\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Банк картасы",
   "prompt": "<code>Card</code> класын жазыңыз: <code>__init__(self, owner, pin, balance=0)</code>; <code>blocked = False</code>; қате PIN саны <code>tries = 0</code>. <code>withdraw(pin, amount)</code>: карта бұғатталса <code>\"бұғатталған\"</code>; PIN қате болса <code>tries</code> өседі, 3-ке жетсе карта бұғатталады, қайтарады <code>\"қате PIN\"</code>; PIN дұрыс болса <code>tries</code> 0-ге түседі, ақша жетпесе <code>\"қаражат жеткіліксіз\"</code>, жетсе балансты азайтып <code>\"сәтті\"</code> қайтарады.",
   "starter": "class Card:\n    def __init__(self, owner, pin, balance=0):\n        self.owner = owner\n        self.pin = pin\n        self.balance = balance\n\n    def withdraw(self, pin, amount):\n        return \"сәтті\"\n",
   "solution": "class Card:\n    def __init__(self, owner, pin, balance=0):\n        self.owner = owner\n        self.pin = pin\n        self.balance = balance\n        self.blocked = False\n        self.tries = 0\n\n    def withdraw(self, pin, amount):\n        if self.blocked:\n            return \"бұғатталған\"\n        if pin != self.pin:\n            self.tries += 1\n            if self.tries >= 3:\n                self.blocked = True\n            return \"қате PIN\"\n        self.tries = 0\n        if amount > self.balance:\n            return \"қаражат жеткіліксіз\"\n        self.balance -= amount\n        return \"сәтті\"\n",
   "hints": [
    "Тексеру реті: бұғат → PIN → баланс.",
    "PIN қате болғанда: <code>self.tries += 1</code>, <code>if self.tries >= 3: self.blocked = True</code>"
   ],
   "check": {
    "tests": "_c = Card(\"Дана\", \"1234\", 50000)\nassert _c.withdraw(\"1234\", 20000) == \"сәтті\" and _c.balance == 30000, \"Дұрыс PIN: 'сәтті', баланс 30000\"\nassert _c.withdraw(\"1234\", 99999) == \"қаражат жеткіліксіз\" and _c.balance == 30000, \"Ақша жетпесе: 'қаражат жеткіліксіз', баланс өзгермейді\"\nassert _c.withdraw(\"0000\", 100) == \"қате PIN\" and _c.tries == 1, \"Қате PIN: tries 1\"\nassert _c.withdraw(\"1234\", 1000) == \"сәтті\" and _c.tries == 0, \"Дұрыс PIN tries-ті 0-ге түсіреді\"\nfor _ in range(3):\n    _c.withdraw(\"1111\", 100)\nassert _c.blocked is True, \"Қатарынан 3 қате PIN-нен кейін карта бұғатталады\"\nassert _c.withdraw(\"1234\", 100) == \"бұғатталған\" and _c.balance == 29000, \"Бұғатталған карта ақша бермейді\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Лифт",
   "prompt": "<code>Elevator</code> класын жазыңыз: <code>__init__(self, floors)</code>, лифт <code>current = 1</code> қабатта тұрады, <code>history = [1]</code>. <code>go(floor)</code>: қабат 1-ден <code>floors</code>-қа дейін болса, лифт сонда барып, қабат <code>history</code>-ге қосылады, <code>True</code> қайтарады; әйтпесе ештеңе өзгермейді, <code>False</code>. <code>distance()</code> — лифттің жүрген жалпы қабат саны (көршілес жазбалар айырмасының модульдерінің қосындысы).",
   "starter": "class Elevator:\n    def __init__(self, floors):\n        self.floors = floors\n        self.current = 1\n",
   "solution": "class Elevator:\n    def __init__(self, floors):\n        self.floors = floors\n        self.current = 1\n        self.history = [1]\n\n    def go(self, floor):\n        if 1 <= floor <= self.floors:\n            self.current = floor\n            self.history.append(floor)\n            return True\n        return False\n\n    def distance(self):\n        total = 0\n        for i in range(1, len(self.history)):\n            total += abs(self.history[i] - self.history[i - 1])\n        return total\n",
   "hints": [
    "<code>go</code> ішінде алдымен шекараны тексеріңіз.",
    "<code>distance</code>: <code>abs(self.history[i] - self.history[i - 1])</code> қосындысы."
   ],
   "check": {
    "tests": "_e = Elevator(9)\nassert _e.current == 1 and _e.history == [1], \"Лифт 1-қабаттан басталады\"\nassert _e.go(5) is True and _e.go(2) is True, \"Бар қабатқа бару True\"\nassert _e.go(12) is False and _e.go(0) is False, \"Жоқ қабатқа бару False\"\nassert _e.current == 2 and _e.history == [1, 5, 2], \"Қате сұраныс history-ді өзгертпейді\"\n_e.go(9)\nassert _e.distance() == 4 + 3 + 7, \"distance() = |5-1| + |2-5| + |9-2| = 14\"\nassert Elevator(5).distance() == 0, \"Жаңа лифтте distance() = 0\""
   }
  }
 ],
 "pyi-7": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Менеджер жалақысы",
   "prompt": "<code>Employee</code> класы дайын. Одан мұра алатын <code>Manager</code> класын жазыңыз: <code>__init__(self, name, salary, bonus)</code> <code>super()</code> арқылы ата класты шақырып, <code>bonus</code>-ты сақтасын. <code>Manager</code> үшін <code>total()</code> әдісін қайта анықтаңыз: <code>salary + bonus</code>.",
   "starter": "class Employee:\n    def __init__(self, name, salary):\n        self.name = name\n        self.salary = salary\n\n    def total(self):\n        return self.salary\n\n\nclass Manager:\n    pass\n",
   "solution": "class Employee:\n    def __init__(self, name, salary):\n        self.name = name\n        self.salary = salary\n\n    def total(self):\n        return self.salary\n\n\nclass Manager(Employee):\n    def __init__(self, name, salary, bonus):\n        super().__init__(name, salary)\n        self.bonus = bonus\n\n    def total(self):\n        return self.salary + self.bonus\n",
   "hints": [
    "<code>class Manager(Employee):</code>",
    "<code>super().__init__(name, salary)</code>, сосын <code>self.bonus = bonus</code>"
   ],
   "check": {
    "tests": "_m = Manager(\"Ерлан\", 450000, 100000)\nassert isinstance(_m, Employee), \"Manager Employee-ден мұра алуы керек\"\nassert _m.name == \"Ерлан\" and _m.salary == 450000 and _m.bonus == 100000, \"name, salary, bonus сақталуы керек\"\nassert _m.total() == 550000, \"Manager.total() = salary + bonus = 550000\"\nassert Employee(\"Дана\", 300000).total() == 300000, \"Employee.total() өзгермейді\"",
    "mustInclude": [
     "super()"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Теңге сомасы",
   "prompt": "<code>Money</code> класына екі dunder әдіс қосыңыз: <code>__add__</code> — екі соманы қосып, <b>жаңа</b> <code>Money</code> қайтарсын; <code>__eq__</code> — сомалары тең болса <code>True</code>. <code>Money(500) + Money(700) == Money(1200)</code> → <code>True</code>.",
   "starter": "class Money:\n    def __init__(self, amount):\n        self.amount = amount\n",
   "solution": "class Money:\n    def __init__(self, amount):\n        self.amount = amount\n\n    def __add__(self, other):\n        return Money(self.amount + other.amount)\n\n    def __eq__(self, other):\n        return self.amount == other.amount\n",
   "hints": [
    "<code>def __add__(self, other): return Money(self.amount + other.amount)</code>",
    "<code>def __eq__(self, other): return self.amount == other.amount</code>"
   ],
   "check": {
    "tests": "_s = Money(500) + Money(700)\nassert isinstance(_s, Money), \"Қосындысы Money объектісі болуы керек\"\nassert _s.amount == 1200, \"Money(500) + Money(700) сомасы 1200\"\nassert Money(1200) == _s, \"Сомалары бірдей Money объектілері тең (__eq__)\"\nassert not (Money(1) == Money(2)), \"Сомалары әртүрлі болса, тең емес\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Команда мүшелері",
   "prompt": "<code>Team</code> класы ойыншылар тізімін сақтайды. <code>__len__</code> (мүшелер саны) және <code>__contains__</code> (<code>\"Дана\" in team</code>) әдістерін қосыңыз.",
   "starter": "class Team:\n    def __init__(self, name, members):\n        self.name = name\n        self.members = members\n",
   "solution": "class Team:\n    def __init__(self, name, members):\n        self.name = name\n        self.members = members\n\n    def __len__(self):\n        return len(self.members)\n\n    def __contains__(self, player):\n        return player in self.members\n",
   "hints": [
    "<code>def __len__(self): return len(self.members)</code>",
    "<code>def __contains__(self, player): return player in self.members</code>"
   ],
   "check": {
    "tests": "_t = Team(\"Қайрат\", [\"Әли\", \"Дана\", \"Ерлан\"])\nassert len(_t) == 3, \"len(team) мүшелер санын беруі керек: 3\"\nassert \"Дана\" in _t, \"'Дана' in team True болуы керек\"\nassert \"Тимур\" not in _t, \"'Тимур' команда мүшесі емес\"\nassert len(Team(\"Астана\", [])) == 0, \"Бос команда: 0\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Фигуралар ауданы",
   "prompt": "<code>Shape</code> ата класында <code>area()</code> 0 қайтарады. Одан мұра алатын екі класс жазыңыз: <code>Square(side)</code> және <code>Circle(r)</code> (ауданы <code>3.14 * r * r</code>), әрқайсысы <code>area()</code>-ны қайта анықтасын. Сосын <code>total_area(shapes)</code> функциясы барлық фигураның ауданын қосып, <code>round(..., 2)</code> қайтарсын.",
   "starter": "class Shape:\n    def area(self):\n        return 0\n\n\ndef total_area(shapes):\n    return 0\n",
   "solution": "class Shape:\n    def area(self):\n        return 0\n\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n\n    def area(self):\n        return self.side * self.side\n\n\nclass Circle(Shape):\n    def __init__(self, r):\n        self.r = r\n\n    def area(self):\n        return 3.14 * self.r * self.r\n\n\ndef total_area(shapes):\n    return round(sum(s.area() for s in shapes), 2)\n",
   "hints": [
    "<code>class Square(Shape):</code> ішінде <code>__init__</code> және <code>area</code>.",
    "<code>total_area</code> фигураның түрін білмейді, тек <code>s.area()</code> шақырады."
   ],
   "check": {
    "tests": "assert isinstance(Square(2), Shape) and isinstance(Circle(1), Shape), \"Square мен Circle Shape-тен мұра алуы керек\"\nassert Square(4).area() == 16, \"Square(4).area() 16 болуы керек\"\nassert Circle(10).area() == 314.0, \"Circle(10).area() 314.0 болуы керек\"\nassert total_area([Square(3), Circle(2), Shape()]) == 21.56, \"9 + 12.56 + 0 = 21.56\"\nassert total_area([]) == 0, \"Фигура жоқ болса, 0\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Вектор амалдары",
   "prompt": "Ойындағы кейіпкердің жылжуы үшін <code>Vector(x, y)</code> класын жазыңыз: <code>__add__</code> — координаталарды қосып, жаңа <code>Vector</code>; <code>__eq__</code> — координаталары тең болса <code>True</code>; <code>__repr__</code> — <code>\"Vector(3, 4)\"</code>.",
   "starter": "class Vector:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n",
   "solution": "class Vector:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __add__(self, other):\n        return Vector(self.x + other.x, self.y + other.y)\n\n    def __eq__(self, other):\n        return self.x == other.x and self.y == other.y\n\n    def __repr__(self):\n        return f\"Vector({self.x}, {self.y})\"\n",
   "hints": [
    "<code>__add__</code> жаңа объект қайтарады: <code>Vector(self.x + other.x, self.y + other.y)</code>.",
    "<code>__repr__</code>: <code>f\"Vector({self.x}, {self.y})\"</code>"
   ],
   "check": {
    "tests": "_v = Vector(1, 2) + Vector(2, 2)\nassert _v == Vector(3, 4), \"Vector(1, 2) + Vector(2, 2) Vector(3, 4)-ке тең болуы керек\"\nassert repr(_v) == \"Vector(3, 4)\", \"repr: 'Vector(3, 4)'\"\nassert not (Vector(0, 1) == Vector(1, 0)), \"Координаталары әртүрлі векторлар тең емес\"\n_p = Vector(0, 0)\nfor _step in [Vector(1, 0), Vector(1, 0), Vector(0, -1)]:\n    _p = _p + _step\nassert _p == Vector(2, -1), \"Қадамдар қосындысы Vector(2, -1)\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Тауарларды салыстыру",
   "prompt": "<code>Product(name, price)</code> класына <code>__lt__</code> әдісін қосыңыз (баға бойынша салыстыру), сонда <code>sorted</code> пен <code>min</code> <code>key</code>-сіз жұмыс істейді. Сосын <code>cheapest(products)</code> функциясы ең арзан тауардың <b>атауын</b> қайтарсын, ал <code>by_price(products)</code> атаулар тізімін баға өсуі ретімен қайтарсын.",
   "starter": "class Product:\n    def __init__(self, name, price):\n        self.name = name\n        self.price = price\n\n\ndef cheapest(products):\n    return products[0].name\n\n\ndef by_price(products):\n    return [p.name for p in products]\n",
   "solution": "class Product:\n    def __init__(self, name, price):\n        self.name = name\n        self.price = price\n\n    def __lt__(self, other):\n        return self.price < other.price\n\n\ndef cheapest(products):\n    return min(products).name\n\n\ndef by_price(products):\n    return [p.name for p in sorted(products)]\n",
   "hints": [
    "<code>def __lt__(self, other): return self.price < other.price</code>",
    "<code>min(products).name</code> және <code>sorted(products)</code>"
   ],
   "check": {
    "tests": "_ps = [Product(\"Шапан\", 45000), Product(\"Домбыра\", 30000), Product(\"Кесе\", 1500)]\nassert Product(\"а\", 1) < Product(\"б\", 2), \"__lt__ баға бойынша салыстыруы керек\"\nassert cheapest(_ps) == \"Кесе\", \"cheapest(...) 'Кесе' болуы керек\"\nassert by_price(_ps) == [\"Кесе\", \"Домбыра\", \"Шапан\"], \"by_price(...) ['Кесе', 'Домбыра', 'Шапан'] болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Жол ақысы",
   "prompt": "Қалалық көлік: ата класс <code>Transport</code> (<code>fare(km)</code> 0 қайтарады). Үш бала класс жазыңыз: <code>Bus</code> — кез келген қашықтыққа 200 ₸; <code>Metro</code> — 150 ₸; <code>Taxi</code> — 400 ₸ отырғызу + әр км үшін 150 ₸. <code>trip_cost(legs)</code> функциясы <code>(көлік, км)</code> кортеждерінің тізімі бойынша жалпы құнды қайтарсын.",
   "starter": "class Transport:\n    def fare(self, km):\n        return 0\n\n\ndef trip_cost(legs):\n    return 0\n",
   "solution": "class Transport:\n    def fare(self, km):\n        return 0\n\n\nclass Bus(Transport):\n    def fare(self, km):\n        return 200\n\n\nclass Metro(Transport):\n    def fare(self, km):\n        return 150\n\n\nclass Taxi(Transport):\n    def fare(self, km):\n        return 400 + 150 * km\n\n\ndef trip_cost(legs):\n    return sum(t.fare(km) for t, km in legs)\n",
   "hints": [
    "Әр бала класс <code>fare(self, km)</code> әдісін өзінше қайта анықтайды.",
    "<code>trip_cost</code>: <code>sum(t.fare(km) for t, km in legs)</code>"
   ],
   "check": {
    "tests": "assert all(isinstance(_t, Transport) for _t in (Bus(), Metro(), Taxi())), \"Bus, Metro, Taxi Transport-тан мұра алуы керек\"\nassert Bus().fare(15) == 200 and Metro().fare(3) == 150, \"Автобус 200, метро 150\"\nassert Taxi().fare(6) == 1300, \"Taxi().fare(6) = 400 + 6*150 = 1300\"\nassert trip_cost([(Bus(), 8), (Metro(), 5), (Taxi(), 2)]) == 1050, \"200 + 150 + 700 = 1050\"\nassert trip_cost([]) == 0, \"Сапар жоқ болса, 0\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Кітап сөресі",
   "prompt": "<code>Shelf</code> класы кітап атауларының тізімін сақтайды. Dunder әдістерді қосыңыз: <code>__len__</code> — кітап саны; <code>__getitem__(i)</code> — <code>shelf[i]</code> атауы; <code>__contains__</code> — <code>\"Абай жолы\" in shelf</code>; <code>__add__</code> — екі сөреден жаңа <code>Shelf</code> (алдымен біріншісінің, сосын екіншісінің кітаптары, қайталанбай).",
   "starter": "class Shelf:\n    def __init__(self, books):\n        self.books = list(books)\n",
   "solution": "class Shelf:\n    def __init__(self, books):\n        self.books = list(books)\n\n    def __len__(self):\n        return len(self.books)\n\n    def __getitem__(self, i):\n        return self.books[i]\n\n    def __contains__(self, title):\n        return title in self.books\n\n    def __add__(self, other):\n        result = list(self.books)\n        for b in other.books:\n            if b not in result:\n                result.append(b)\n        return Shelf(result)\n",
   "hints": [
    "<code>__getitem__(self, i)</code> ішінде <code>return self.books[i]</code>.",
    "<code>__add__</code>: көшірме жасап, екінші сөрені циклмен қосыңыз (қайталанса өткізіп жіберіңіз)."
   ],
   "check": {
    "tests": "_a = Shelf([\"Абай жолы\", \"Көшпенділер\"])\n_b = Shelf([\"Көшпенділер\", \"Қан мен тер\"])\nassert len(_a) == 2 and _a[0] == \"Абай жолы\" and _a[-1] == \"Көшпенділер\", \"__len__ және __getitem__ дұрыс жұмыс істеуі керек\"\nassert \"Абай жолы\" in _a and \"Қан мен тер\" not in _a, \"__contains__ дұрыс жұмыс істеуі керек\"\n_c = _a + _b\nassert isinstance(_c, Shelf) and _c.books == [\"Абай жолы\", \"Көшпенділер\", \"Қан мен тер\"], \"a + b: жаңа Shelf, қайталанусыз\"\nassert _a.books == [\"Абай жолы\", \"Көшпенділер\"], \"Қосу бастапқы сөрені өзгертпеуі керек\""
   }
  }
 ],
 "pyi-8": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Шеңбер ауданы",
   "prompt": "<code>from math import pi</code> жолымен импорттап, <code>circle_area(r)</code> функциясын жазыңыз: ол <code>pi * r * r</code> мәнін <code>round(..., 2)</code> етіп қайтарсын. Мысалы, радиусы 5 м гүлзар: <code>circle_area(5)</code> → <code>78.54</code>.",
   "starter": "def circle_area(r):\n    return 3 * r * r\n",
   "solution": "from math import pi\n\ndef circle_area(r):\n    return round(pi * r * r, 2)\n",
   "hints": [
    "<code>from math import pi</code> — тек керек атауды импорттау.",
    "<code>round(pi * r * r, 2)</code>"
   ],
   "check": {
    "tests": "assert circle_area(5) == 78.54, \"circle_area(5) 78.54 болуы керек\"\nassert circle_area(1) == 3.14, \"circle_area(1) 3.14 болуы керек\"\nassert circle_area(0) == 0, \"circle_area(0) 0 болуы керек\"",
    "mustInclude": [
     "from math import"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Гипотенуза",
   "prompt": "<code>import math</code> жазып, <code>hypotenuse(a, b)</code> функциясын жазыңыз: тікбұрышты үшбұрыштың гипотенузасын <code>math.sqrt(a * a + b * b)</code> арқылы есептеп, <code>round(..., 1)</code> қайтарсын. <code>hypotenuse(3, 4)</code> → <code>5.0</code>.",
   "starter": "def hypotenuse(a, b):\n    return a + b\n",
   "solution": "import math\n\ndef hypotenuse(a, b):\n    return round(math.sqrt(a * a + b * b), 1)\n",
   "hints": [
    "<code>import math</code>, сосын <code>math.sqrt(...)</code>.",
    "<code>round(math.sqrt(a * a + b * b), 1)</code>"
   ],
   "check": {
    "tests": "assert hypotenuse(3, 4) == 5.0, \"hypotenuse(3, 4) 5.0 болуы керек\"\nassert hypotenuse(1, 1) == 1.4, \"hypotenuse(1, 1) 1.4 болуы керек\"\nassert hypotenuse(6, 8) == 10.0, \"hypotenuse(6, 8) 10.0 болуы керек\"",
    "mustInclude": [
     "import math"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Тыныс белгілерін алу",
   "prompt": "<code>from string import punctuation</code> жолымен импорттаңыз (<code>punctuation</code> — <code>!\"#$%&...</code> сияқты тыныс белгілерінің жолы). <code>clean(text)</code> функциясы мәтіннен осы белгілердің бәрін алып тастап қайтарсын. <code>clean(\"Сәлем, әлем!\")</code> → <code>\"Сәлем әлем\"</code>.",
   "starter": "def clean(text):\n    return text\n",
   "solution": "from string import punctuation\n\ndef clean(text):\n    return \"\".join(ch for ch in text if ch not in punctuation)\n",
   "hints": [
    "Әр таңбаны тексеріңіз: <code>ch not in punctuation</code>.",
    "<code>\"\".join(ch for ch in text if ch not in punctuation)</code>"
   ],
   "check": {
    "tests": "assert clean(\"Сәлем, әлем!\") == \"Сәлем әлем\", \"clean('Сәлем, әлем!') 'Сәлем әлем' болуы керек\"\nassert clean(\"Иә... (мүмкін)\") == \"Иә мүмкін\", \"clean('Иә... (мүмкін)') 'Иә мүмкін' болуы керек\"\nassert clean(\"Алматы\") == \"Алматы\", \"Тыныс белгісі жоқ мәтін өзгермейді\"",
    "mustInclude": [
     "from string import"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қорапқа буып-түю",
   "prompt": "Қоймада тауарларды қораптарға салады. <code>import math</code> қолданып, <code>pack(items, per_box)</code> функциясы <code>(boxes, empty)</code> кортежін қайтарсын: <code>boxes</code> — қажет қорап саны (<code>math.ceil</code>), <code>empty</code> — соңғы қорапта қалған бос орын саны. <code>pack(23, 10)</code> → <code>(3, 7)</code>.",
   "starter": "def pack(items, per_box):\n    return items // per_box, 0\n",
   "solution": "import math\n\ndef pack(items, per_box):\n    boxes = math.ceil(items / per_box)\n    return boxes, boxes * per_box - items\n",
   "hints": [
    "<code>boxes = math.ceil(items / per_box)</code>",
    "Бос орын: <code>boxes * per_box - items</code>"
   ],
   "check": {
    "tests": "assert pack(23, 10) == (3, 7), \"pack(23, 10) (3, 7) болуы керек\"\nassert pack(20, 10) == (2, 0), \"pack(20, 10) (2, 0) болуы керек\"\nassert pack(1, 12) == (1, 11), \"pack(1, 12) (1, 11) болуы керек\"",
    "mustInclude": [
     "math.ceil"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ұтыс ойыны",
   "prompt": "Мектеп кешіндегі ұтыс ойыны. <code>import random</code> жазып, <code>pick_winner(names, seed)</code> функциясын жазыңыз: алдымен <code>random.seed(seed)</code>, сосын <code>random.choice(names)</code> нәтижесін қайтарсын. Бірдей <code>seed</code> әрқашан бірдей жеңімпаз береді, сондықтан нәтижені тексеруге болады.",
   "starter": "def pick_winner(names, seed):\n    pass\n",
   "solution": "import random\n\ndef pick_winner(names, seed):\n    random.seed(seed)\n    return random.choice(names)\n",
   "hints": [
    "<code>random.seed(seed)</code> кездейсоқ тізбекті бекітеді.",
    "<code>return random.choice(names)</code>"
   ],
   "check": {
    "tests": "import random as _random\n_names = [\"Әли\", \"Дана\", \"Ерлан\", \"Сая\", \"Тимур\", \"Мадина\"]\nfor _seed in (1, 7, 2026):\n    _random.seed(_seed)\n    _exp = _random.choice(_names)\n    assert pick_winner(_names, _seed) == _exp, f\"seed={_seed} болғанда жеңімпаз {_exp} болуы керек\"\nassert pick_winner([\"Нұр\"], 5) == \"Нұр\", \"Бір қатысушы болса, сол жеңеді\"",
    "mustInclude": [
     "import random"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Әріп нөмірлері",
   "prompt": "<code>from string import ascii_lowercase</code> жолымен латын әліпбиін (<code>\"abc...z\"</code>) импорттаңыз. <code>letter_numbers(word)</code> функциясы сөздегі әр әріптің әліпбидегі нөмірін (1-ден) тізім етіп қайтарсын. Сөз бас әріппен келуі мүмкін: <code>.lower()</code> қолданыңыз. <code>letter_numbers(\"Abai\")</code> → <code>[1, 2, 1, 9]</code>.",
   "starter": "def letter_numbers(word):\n    return []\n",
   "solution": "from string import ascii_lowercase\n\ndef letter_numbers(word):\n    return [ascii_lowercase.index(ch) + 1 for ch in word.lower()]\n",
   "hints": [
    "<code>ascii_lowercase.index(\"c\")</code> → 2 (0-ден), сондықтан 1 қосыңыз.",
    "<code>[ascii_lowercase.index(ch) + 1 for ch in word.lower()]</code>"
   ],
   "check": {
    "tests": "assert letter_numbers(\"Abai\") == [1, 2, 1, 9], \"letter_numbers('Abai') [1, 2, 1, 9] болуы керек\"\nassert letter_numbers(\"kz\") == [11, 26], \"letter_numbers('kz') [11, 26] болуы керек\"\nassert letter_numbers(\"\") == [], \"Бос сөз → бос тізім\"",
    "mustInclude": [
     "from string import"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Цезарь шифры",
   "prompt": "<code>from string import ascii_lowercase</code> қолданып, <code>caesar(text, shift)</code> функциясын жазыңыз: әр кіші латын әрпі әліпби бойынша <code>shift</code> орынға жылжиды (<code>z</code>-дан кейін қайта <code>a</code>-дан), басқа таңбалар өзгермейді. <code>caesar(\"hello kz\", 3)</code> → <code>\"khoor nc\"</code>. Теріс <code>shift</code> шифрды ашады.",
   "starter": "def caesar(text, shift):\n    return text\n",
   "solution": "from string import ascii_lowercase\n\ndef caesar(text, shift):\n    result = \"\"\n    for ch in text:\n        if ch in ascii_lowercase:\n            i = (ascii_lowercase.index(ch) + shift) % 26\n            result += ascii_lowercase[i]\n        else:\n            result += ch\n    return result\n",
   "hints": [
    "Жаңа индекс: <code>(ascii_lowercase.index(ch) + shift) % 26</code>.",
    "Әріп емес таңбаны өзгертпей қосыңыз."
   ],
   "check": {
    "tests": "assert caesar(\"hello kz\", 3) == \"khoor nc\", \"caesar('hello kz', 3) 'khoor nc' болуы керек\"\nassert caesar(\"xyz\", 2) == \"zab\", \"z-дан кейін a-дан басталады: 'zab'\"\nassert caesar(caesar(\"almaty 2026!\", 5), -5) == \"almaty 2026!\", \"Теріс shift шифрды ашуы керек\"\nassert caesar(\"ABC\", 1) == \"ABC\", \"Бас әріптер мен басқа таңбалар өзгермейді\"",
    "mustInclude": [
     "from string import"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Температура статистикасы",
   "prompt": "Стандартты <code>statistics</code> модулін <code>import statistics</code> арқылы қосыңыз: онда <code>statistics.mean(xs)</code> (орташа) және <code>statistics.median(xs)</code> (медиана) бар. <code>weather_report(temps)</code> функциясы <code>(орташа, медиана, амплитуда)</code> кортежін қайтарсын: орташа мен медиана <code>round(..., 1)</code>, амплитуда — <code>max - min</code>.",
   "starter": "def weather_report(temps):\n    return 0, 0, 0\n",
   "solution": "import statistics\n\ndef weather_report(temps):\n    avg = round(statistics.mean(temps), 1)\n    med = round(statistics.median(temps), 1)\n    return avg, med, max(temps) - min(temps)\n",
   "hints": [
    "<code>import statistics</code>, сосын <code>statistics.mean(temps)</code>.",
    "Амплитуда: <code>max(temps) - min(temps)</code>"
   ],
   "check": {
    "tests": "assert weather_report([-12, -8, -15, -3, -7]) == (-9.0, -8, 12), \"weather_report([-12, -8, -15, -3, -7]) (-9.0, -8, 12) болуы керек\"\nassert weather_report([20, 25, 31, 22]) == (24.5, 23.5, 11), \"weather_report([20, 25, 31, 22]) (24.5, 23.5, 11) болуы керек\"",
    "mustInclude": [
     "import statistics"
    ]
   }
  }
 ],
 "pyi-9": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қалалар файлы",
   "prompt": "<code>cities</code> тізімін <code>\"cities_pr.txt\"</code> файлына әр қаланы жеке жолға жазыңыз. Сосын файлды оқып, жолдар санын <code>count</code> айнымалысына, ал бірінші жолды (<code>.strip()</code> етіп) <code>first</code> айнымалысына жазыңыз.",
   "starter": "cities = [\"Алматы\", \"Астана\", \"Шымкент\", \"Ақтөбе\"]\n",
   "solution": "cities = [\"Алматы\", \"Астана\", \"Шымкент\", \"Ақтөбе\"]\nwith open(\"cities_pr.txt\", \"w\", encoding=\"utf-8\") as f:\n    for c in cities:\n        f.write(c + \"\\n\")\n\nwith open(\"cities_pr.txt\", encoding=\"utf-8\") as f:\n    lines = f.readlines()\ncount = len(lines)\nfirst = lines[0].strip()\n",
   "hints": [
    "Жазу: <code>f.write(c + \"\\n\")</code>",
    "Оқу: <code>lines = f.readlines()</code>, сосын <code>len(lines)</code>."
   ],
   "check": {
    "tests": "assert count == 4, \"Файлда 4 жол болуы керек\"\nassert first == \"Алматы\", \"Бірінші жол 'Алматы' болуы керек\"\nwith open(\"cities_pr.txt\", encoding=\"utf-8\") as _f:\n    assert _f.read().splitlines() == cities, \"Файлда әр қала жеке жолда тұруы керек\"",
    "mustInclude": [
     "with open"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "JSON жолын оқу",
   "prompt": "Сервер тапсырыс деректерін JSON жолы түрінде жіберді. <code>json.loads</code> арқылы оны сөздікке айналдырып, <code>order</code> айнымалысына жазыңыз. Сосын <code>total</code> — тауарлар бағаларының қосындысы.",
   "starter": "import json\n\nraw = '{\"id\": 105, \"city\": \"Қарағанды\", \"prices\": [1200, 450, 3000]}'\norder = raw\ntotal = 0\n",
   "solution": "import json\n\nraw = '{\"id\": 105, \"city\": \"Қарағанды\", \"prices\": [1200, 450, 3000]}'\norder = json.loads(raw)\ntotal = sum(order[\"prices\"])\n",
   "hints": [
    "<code>order = json.loads(raw)</code>",
    "<code>total = sum(order[\"prices\"])</code>"
   ],
   "check": {
    "tests": "assert isinstance(order, dict), \"order сөздік болуы керек: json.loads(raw)\"\nassert order[\"city\"] == \"Қарағанды\" and order[\"id\"] == 105, \"order ішінде id мен city болуы керек\"\nassert total == 4650, \"total = 1200 + 450 + 3000 = 4650\"",
    "mustInclude": [
     "json.loads"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Журналға қосу",
   "prompt": "Код <code>\"log_pr.txt\"</code> файлын <code>\"Басталды\"</code> жолымен жасайды. Файлды <b>қосу</b> режимінде (<code>\"a\"</code>) ашып, соңына екі жол жазыңыз: <code>\"Кіру\"</code> және <code>\"Шығу\"</code>. Сосын файлды оқып, тазаланған жолдарды <code>lines</code> тізіміне жинаңыз.",
   "starter": "with open(\"log_pr.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"Басталды\\n\")\n\n# мұнда жазыңыз\n",
   "solution": "with open(\"log_pr.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"Басталды\\n\")\n\nwith open(\"log_pr.txt\", \"a\", encoding=\"utf-8\") as f:\n    f.write(\"Кіру\\n\")\n    f.write(\"Шығу\\n\")\n\nwith open(\"log_pr.txt\", encoding=\"utf-8\") as f:\n    lines = [line.strip() for line in f]\n",
   "hints": [
    "<code>open(\"log_pr.txt\", \"a\", encoding=\"utf-8\")</code> ескі мәтінді сақтайды.",
    "Оқу: <code>[line.strip() for line in f]</code>"
   ],
   "check": {
    "tests": "assert lines == [\"Басталды\", \"Кіру\", \"Шығу\"], \"lines ['Басталды', 'Кіру', 'Шығу'] болуы керек: ескі жол сақталып, жаңалары соңына қосылады\"",
    "mustInclude": [
     "\"a\""
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ұпайларды сақтау",
   "prompt": "Ойын рекордтарын файлда сақтайық. <code>save_scores(scores, path)</code> сөздікті <code>json.dump</code> арқылы файлға жазсын (<code>ensure_ascii=False</code>). <code>load_scores(path)</code> файлды <code>json.load</code> арқылы оқып, сөздікті қайтарсын.",
   "starter": "import json\n\ndef save_scores(scores, path):\n    pass\n\ndef load_scores(path):\n    return {}\n",
   "solution": "import json\n\ndef save_scores(scores, path):\n    with open(path, \"w\", encoding=\"utf-8\") as f:\n        json.dump(scores, f, ensure_ascii=False)\n\ndef load_scores(path):\n    with open(path, encoding=\"utf-8\") as f:\n        return json.load(f)\n",
   "hints": [
    "Жазу: <code>with open(path, \"w\", encoding=\"utf-8\") as f: json.dump(scores, f, ensure_ascii=False)</code>",
    "Оқу: <code>return json.load(f)</code>"
   ],
   "check": {
    "tests": "save_scores({\"Әли\": 820, \"Дана\": 1450}, \"scores_pr.json\")\nassert load_scores(\"scores_pr.json\") == {\"Әли\": 820, \"Дана\": 1450}, \"Сақталған сөздік қайта оқылғанда бірдей болуы керек\"\nwith open(\"scores_pr.json\", encoding=\"utf-8\") as _f:\n    assert \"Дана\" in _f.read(), \"Файлда кириллица оқылатын күйде тұруы керек: ensure_ascii=False\"\nsave_scores({}, \"scores_pr.json\")\nassert load_scores(\"scores_pr.json\") == {}, \"Қайта жазғанда ескі мазмұн өшуі керек\"",
    "mustInclude": [
     "json.dump",
     "json.load"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Файлдан үздік оқушы",
   "prompt": "Код <code>\"results_pr.txt\"</code> файлын жасайды: әр жолда <code>аты,балл</code>. Файлды жолма-жол оқып, <code>best</code> — ең жоғары балл алғанның аты, <code>avg</code> — орташа балл (<code>round(..., 1)</code>) айнымалыларын есептеңіз.",
   "starter": "with open(\"results_pr.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"Әли,78\\nДана,95\\nЕрлан,61\\nСая,88\\n\")\n\nbest = \"\"\navg = 0\n",
   "solution": "with open(\"results_pr.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"Әли,78\\nДана,95\\nЕрлан,61\\nСая,88\\n\")\n\nrows = []\nwith open(\"results_pr.txt\", encoding=\"utf-8\") as f:\n    for line in f:\n        name, score = line.strip().split(\",\")\n        rows.append((name, int(score)))\nbest = max(rows, key=lambda r: r[1])[0]\navg = round(sum(s for _, s in rows) / len(rows), 1)\n",
   "hints": [
    "Әр жол: <code>name, score = line.strip().split(\",\")</code>, балды <code>int</code> етіңіз.",
    "Ең жақсысы: <code>max(rows, key=lambda r: r[1])[0]</code>"
   ],
   "check": {
    "tests": "assert best == \"Дана\", \"Ең жоғары балл Данада (95)\"\nassert avg == 80.5, \"Орташа балл (78 + 95 + 61 + 88) / 4 = 80.5\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Сан кілттерді қалпына келтіру",
   "prompt": "JSON сөздік кілттерін жолға айналдырады. Аудан коды → атауы сөздігі JSON-ға сақталып, қайта оқылды. <code>restore(text)</code> функциясы JSON жолын оқып (<code>json.loads</code>), кілттерін қайтадан <code>int</code> етіп, сөздік қайтарсын. <code>restore('{\"1\": \"Медеу\", \"2\": \"Бостандық\"}')</code> → <code>{1: \"Медеу\", 2: \"Бостандық\"}</code>.",
   "starter": "import json\n\ndef restore(text):\n    return json.loads(text)\n",
   "solution": "import json\n\ndef restore(text):\n    return {int(k): v for k, v in json.loads(text).items()}\n",
   "hints": [
    "<code>json.loads(text)</code> кілттері жол болатын сөздік береді.",
    "Dict comprehension: <code>{int(k): v for k, v in ...items()}</code>"
   ],
   "check": {
    "tests": "import json as _json\nassert restore('{\"1\": \"Медеу\", \"2\": \"Бостандық\"}') == {1: \"Медеу\", 2: \"Бостандық\"}, \"restore(...) {1: 'Медеу', 2: 'Бостандық'} болуы керек\"\n_d = {10: \"Алатау\", 25: \"Түрксіб\"}\nassert restore(_json.dumps(_d, ensure_ascii=False)) == _d, \"dumps → restore бастапқы сөздікті қайтаруы керек\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Тапсырыстар журналы",
   "prompt": "<code>add_order(path, order)</code> функциясы JSON файлда сақталған тапсырыстар тізіміне жаңа тапсырысты қосып, файлды қайта сақтасын және тізімнің жаңа ұзындығын қайтарсын. Файл әлі жоқ болса (<code>FileNotFoundError</code>), бос тізімнен бастаңыз.",
   "starter": "import json\n\ndef add_order(path, order):\n    return 1\n",
   "solution": "import json\n\ndef add_order(path, order):\n    try:\n        with open(path, encoding=\"utf-8\") as f:\n            orders = json.load(f)\n    except FileNotFoundError:\n        orders = []\n    orders.append(order)\n    with open(path, \"w\", encoding=\"utf-8\") as f:\n        json.dump(orders, f, ensure_ascii=False)\n    return len(orders)\n",
   "hints": [
    "Оқуды <code>try</code> ішіне алып, <code>except FileNotFoundError: orders = []</code> жазыңыз.",
    "Қосқан соң файлды <code>\"w\"</code> режимінде <code>json.dump</code> арқылы қайта жазыңыз."
   ],
   "check": {
    "tests": "import os as _os, json as _json\nif _os.path.exists(\"orders_pr.json\"):\n    _os.remove(\"orders_pr.json\")\nassert add_order(\"orders_pr.json\", {\"id\": 1, \"city\": \"Алматы\"}) == 1, \"Файл жоқ болса, бос тізімнен бастап 1 қайтарыңыз\"\nassert add_order(\"orders_pr.json\", {\"id\": 2, \"city\": \"Тараз\"}) == 2, \"Екінші тапсырыстан кейін 2\"\nwith open(\"orders_pr.json\", encoding=\"utf-8\") as _f:\n    _saved = _json.load(_f)\nassert _saved == [{\"id\": 1, \"city\": \"Алматы\"}, {\"id\": 2, \"city\": \"Тараз\"}], \"Файлда екі тапсырыс та тізім ретінде сақталуы керек\"",
    "mustInclude": [
     "json.load",
     "json.dump"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Бағалар есебі",
   "prompt": "Код <code>\"marks_pr.txt\"</code> файлын жасайды: әр жолда оқушының аты мен бағалары бос орын арқылы (<code>Әли 5 4 5</code>). <code>make_report(src, dst)</code> функциясы файлды оқып, (аты → орташа баға, <code>round(..., 2)</code>) сөздігін құрсын, оны <code>dst</code> JSON файлына сақтап, сөздікті қайтарсын. Бос жолдарды өткізіп жіберіңіз.",
   "starter": "import json\n\nwith open(\"marks_pr.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"Әли 5 4 5\\nДана 3 4\\n\\nЕрлан 5 5 5 4\\n\")\n\ndef make_report(src, dst):\n    return {}\n",
   "solution": "import json\n\nwith open(\"marks_pr.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"Әли 5 4 5\\nДана 3 4\\n\\nЕрлан 5 5 5 4\\n\")\n\ndef make_report(src, dst):\n    report = {}\n    with open(src, encoding=\"utf-8\") as f:\n        for line in f:\n            parts = line.split()\n            if not parts:\n                continue\n            marks = [int(m) for m in parts[1:]]\n            report[parts[0]] = round(sum(marks) / len(marks), 2)\n    with open(dst, \"w\", encoding=\"utf-8\") as f:\n        json.dump(report, f, ensure_ascii=False)\n    return report\n",
   "hints": [
    "<code>parts = line.split()</code>: бос жолда тізім бос болады, <code>continue</code> жазыңыз.",
    "Бағалар: <code>[int(m) for m in parts[1:]]</code>, сосын <code>json.dump(report, f, ensure_ascii=False)</code>."
   ],
   "check": {
    "tests": "import json as _json\n_r = make_report(\"marks_pr.txt\", \"report_pr.json\")\nassert _r == {\"Әли\": 4.67, \"Дана\": 3.5, \"Ерлан\": 4.75}, \"make_report(...) {'Әли': 4.67, 'Дана': 3.5, 'Ерлан': 4.75} болуы керек\"\nwith open(\"report_pr.json\", encoding=\"utf-8\") as _f:\n    assert _json.load(_f) == _r, \"Есеп dst файлына JSON ретінде сақталуы керек\"",
    "mustInclude": [
     "json.dump"
    ]
   }
  }
 ],
 "pyi-10": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жұп сандар генераторы",
   "prompt": "<code>evens(limit)</code> генераторын жазыңыз (<code>yield</code>): ол 2-ден <code>limit</code>-ке дейінгі (қоса) жұп сандарды береді. <code>list(evens(9))</code> → <code>[2, 4, 6, 8]</code>.",
   "starter": "def evens(limit):\n    return [n for n in range(2, limit + 1, 2)]\n",
   "solution": "def evens(limit):\n    n = 2\n    while n <= limit:\n        yield n\n        n += 2\n",
   "hints": [
    "<code>while n <= limit:</code> ішінде <code>yield n</code>.",
    "Функцияда <code>return</code> емес, <code>yield</code> болуы керек."
   ],
   "check": {
    "tests": "import inspect as _inspect\nassert _inspect.isgeneratorfunction(evens), \"evens генератор болуы керек: yield қолданыңыз\"\nassert list(evens(9)) == [2, 4, 6, 8], \"list(evens(9)) [2, 4, 6, 8] болуы керек\"\nassert list(evens(10)) == [2, 4, 6, 8, 10], \"limit жұп болса, ол да кіреді\"\nassert list(evens(1)) == [], \"evens(1) ештеңе бермейді\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Алғашқы екі элемент",
   "prompt": "<code>first_two(items)</code> функциясы <code>iter</code> және <code>next</code> арқылы кез келген итерацияланатын объектінің алғашқы екі элементін кортеж етіп қайтарсын. <code>first_two([\"Әли\", \"Дана\", \"Ерлан\"])</code> → <code>(\"Әли\", \"Дана\")</code>. Жол да жұмыс істеуі керек: <code>first_two(\"Абай\")</code> → <code>(\"А\", \"б\")</code>.",
   "starter": "def first_two(items):\n    pass\n",
   "solution": "def first_two(items):\n    it = iter(items)\n    a = next(it)\n    b = next(it)\n    return a, b\n",
   "hints": [
    "<code>it = iter(items)</code>",
    "Екі рет <code>next(it)</code> шақырыңыз."
   ],
   "check": {
    "tests": "assert first_two([\"Әли\", \"Дана\", \"Ерлан\"]) == (\"Әли\", \"Дана\"), \"first_two(['Әли', 'Дана', 'Ерлан']) ('Әли', 'Дана') болуы керек\"\nassert first_two(\"Абай\") == (\"А\", \"б\"), \"first_two('Абай') ('А', 'б') болуы керек\"\nassert first_two(x * 10 for x in range(5)) == (0, 10), \"Генератормен де жұмыс істеуі керек\"",
    "mustInclude": [
     "next("
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ұзын сөздер саны",
   "prompt": "<code>count_long(words, n)</code> функциясы ұзындығы <code>n</code>-нен көп сөздер санын генератор өрнегі мен <code>sum</code> арқылы есептесін (аралық тізімсіз). <code>count_long([\"ат\", \"мысық\", \"жылқы\"], 3)</code> → <code>2</code>.",
   "starter": "def count_long(words, n):\n    return 0\n",
   "solution": "def count_long(words, n):\n    return sum(1 for w in words if len(w) > n)\n",
   "hints": [
    "Әр сәйкес сөз үшін 1: <code>sum(1 for w in words if ...)</code>",
    "Шарт: <code>len(w) > n</code>"
   ],
   "check": {
    "tests": "assert count_long([\"ат\", \"мысық\", \"жылқы\"], 3) == 2, \"count_long(['ат', 'мысық', 'жылқы'], 3) 2 болуы керек\"\nassert count_long([\"Ақтөбе\", \"Орал\"], 10) == 0, \"Ұзын сөз жоқ: 0\"\nassert count_long([], 1) == 0, \"Бос тізім: 0\"",
    "mustInclude": [
     "sum("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Фибоначчи генераторы",
   "prompt": "Шексіз <code>fib()</code> генераторын жазыңыз: ол Фибоначчи сандарын береді: 0, 1, 1, 2, 3, 5, 8, … (әр сан алдыңғы екеуінің қосындысы).",
   "starter": "def fib():\n    return [0, 1, 1, 2, 3]\n",
   "solution": "def fib():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n",
   "hints": [
    "Екі айнымалы: <code>a, b = 0, 1</code>",
    "<code>while True:</code> ішінде <code>yield a</code>, сосын <code>a, b = b, a + b</code>."
   ],
   "check": {
    "tests": "import inspect as _inspect\nassert _inspect.isgeneratorfunction(fib), \"fib генератор болуы керек\"\n_g = fib()\n_first = [next(_g) for _ in range(8)]\nassert _first == [0, 1, 1, 2, 3, 5, 8, 13], \"Алғашқы 8 сан: [0, 1, 1, 2, 3, 5, 8, 13]\"\nfor _ in range(43):\n    _x = next(_g)\nassert _x == 12586269025, \"F(50) = 12586269025 болуы керек (генератор шексіз)\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бөліктерге бөлу",
   "prompt": "Оқушыларды топтарға бөлеміз. <code>chunks(items, size)</code> генераторы тізімді <code>size</code> элементтен тұратын тізімдерге бөліп, оларды кезекпен берсін; соңғы бөлік қысқа болуы мүмкін. <code>list(chunks([1, 2, 3, 4, 5], 2))</code> → <code>[[1, 2], [3, 4], [5]]</code>.",
   "starter": "def chunks(items, size):\n    return [items]\n",
   "solution": "def chunks(items, size):\n    for i in range(0, len(items), size):\n        yield items[i:i + size]\n",
   "hints": [
    "<code>range(0, len(items), size)</code> әр бөліктің басталу индексін береді.",
    "<code>yield items[i:i + size]</code>"
   ],
   "check": {
    "tests": "import inspect as _inspect\nassert _inspect.isgeneratorfunction(chunks), \"chunks генератор болуы керек\"\nassert list(chunks([1, 2, 3, 4, 5], 2)) == [[1, 2], [3, 4], [5]], \"list(chunks([1, 2, 3, 4, 5], 2)) [[1, 2], [3, 4], [5]] болуы керек\"\nassert list(chunks([\"Әли\", \"Дана\", \"Ерлан\"], 3)) == [[\"Әли\", \"Дана\", \"Ерлан\"]], \"Бір толық топ\"\nassert list(chunks([], 4)) == [], \"Бос тізім ештеңе бермейді\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бос жолдарды өткізу",
   "prompt": "Баптау файлының жолдары тізім ретінде берілген. <code>clean_lines(lines)</code> генераторы әр жолды <code>.strip()</code> етіп, бос жолдар мен <code>#</code> белгісінен басталатын түсініктемелерді өткізіп жіберсін, қалғанын берсін.",
   "starter": "def clean_lines(lines):\n    return lines\n",
   "solution": "def clean_lines(lines):\n    for line in lines:\n        line = line.strip()\n        if not line or line.startswith(\"#\"):\n            continue\n        yield line\n",
   "hints": [
    "Шарт: <code>if not line or line.startswith(\"#\"): continue</code>",
    "Қалған жолдарды <code>yield line</code>."
   ],
   "check": {
    "tests": "import inspect as _inspect\nassert _inspect.isgeneratorfunction(clean_lines), \"clean_lines генератор болуы керек\"\n_src = [\"# баптаулар\\n\", \"city=Алматы\\n\", \"   \\n\", \"  lang=kk  \\n\", \"#port=80\\n\"]\nassert list(clean_lines(_src)) == [\"city=Алматы\", \"lang=kk\"], \"Нәтиже ['city=Алматы', 'lang=kk'] болуы керек\"\nassert list(clean_lines([])) == [], \"Бос тізім ештеңе бермейді\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Шот қалдығы ағыны",
   "prompt": "<code>balances(start, ops)</code> генераторы бастапқы балансқа <code>ops</code> тізіміндегі операцияларды (оң — кіріс, теріс — шығыс) кезекпен қолданып, әр операциядан кейінгі балансты берсін. Операция балансты теріс етсе, ол <b>өткізіліп</b> жіберіледі (баланс өзгермейді, ештеңе берілмейді).",
   "starter": "def balances(start, ops):\n    return []\n",
   "solution": "def balances(start, ops):\n    balance = start\n    for op in ops:\n        if balance + op < 0:\n            continue\n        balance += op\n        yield balance\n",
   "hints": [
    "Балансты айнымалыда сақтаңыз, әр операцияда алдымен тексеріңіз: <code>if balance + op < 0: continue</code>.",
    "Сосын <code>balance += op</code> және <code>yield balance</code>."
   ],
   "check": {
    "tests": "import inspect as _inspect\nassert _inspect.isgeneratorfunction(balances), \"balances генератор болуы керек\"\nassert list(balances(1000, [500, -200, -2000, 300])) == [1500, 1300, 1600], \"list(balances(1000, [500, -200, -2000, 300])) [1500, 1300, 1600] болуы керек\"\nassert list(balances(0, [-1])) == [], \"Теріс балансқа әкелетін операция өткізіледі\"\n_g = balances(10, [5, 5])\nassert next(_g) == 15, \"Бірінші next() 15 беруі керек\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Генератор конвейері",
   "prompt": "Төлемдер журналы <code>\"аты;сома\"</code> жолдарынан тұрады. Екі генератор жазыңыз: <code>parse(lines)</code> — әр бос емес жолдан <code>(аты, int(сома))</code> кортежін береді; <code>big(records, limit)</code> — тек сомасы <code>limit</code>-тен кем емес жазбаларды береді. Сосын <code>big_total(lines, limit)</code> функциясы конвейерді қосып, ірі төлемдер сомасын қайтарсын.",
   "starter": "def parse(lines):\n    pass\n\ndef big(records, limit):\n    pass\n\ndef big_total(lines, limit):\n    return 0\n",
   "solution": "def parse(lines):\n    for line in lines:\n        line = line.strip()\n        if line:\n            name, amount = line.split(\";\")\n            yield name, int(amount)\n\ndef big(records, limit):\n    for name, amount in records:\n        if amount >= limit:\n            yield name, amount\n\ndef big_total(lines, limit):\n    return sum(amount for _, amount in big(parse(lines), limit))\n",
   "hints": [
    "<code>parse</code>: <code>name, amount = line.split(\";\")</code>, сосын <code>yield name, int(amount)</code>.",
    "Конвейер: <code>big(parse(lines), limit)</code>, сосын <code>sum(...)</code>."
   ],
   "check": {
    "tests": "import inspect as _inspect\nassert _inspect.isgeneratorfunction(parse) and _inspect.isgeneratorfunction(big), \"parse пен big генератор болуы керек\"\n_log = [\"Әли;1500\", \"Дана;300\", \"\", \"Ерлан;5000\", \"Сая;1000\"]\nassert list(parse(_log)) == [(\"Әли\", 1500), (\"Дана\", 300), (\"Ерлан\", 5000), (\"Сая\", 1000)], \"parse бос жолды өткізіп, (аты, сома) береді\"\nassert list(big(parse(_log), 1000)) == [(\"Әли\", 1500), (\"Ерлан\", 5000), (\"Сая\", 1000)], \"big(..., 1000) сомасы 1000-нан кем емес жазбаларды береді\"\nassert big_total(_log, 1000) == 7500, \"big_total(_log, 1000) 7500 болуы керек\"\nassert big_total(_log, 10000) == 0, \"Ірі төлем жоқ болса, 0\""
   }
  }
 ],
 "pyi-11": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Нәтижені екі есе",
   "prompt": "<code>double</code> декораторын жазыңыз: ол безендірілген функцияның нәтижесін 2-ге көбейтіп қайтарсын. <code>@double</code> қолданылған <code>price(500)</code> → <code>1000</code>.",
   "starter": "def double(func):\n    return func\n\n@double\ndef price(x):\n    return x\n",
   "solution": "def double(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs) * 2\n    return wrapper\n\n@double\ndef price(x):\n    return x\n",
   "hints": [
    "Ішкі <code>wrapper(*args, **kwargs)</code> жазып, оны қайтарыңыз.",
    "<code>return func(*args, **kwargs) * 2</code>"
   ],
   "check": {
    "tests": "assert price(500) == 1000, \"price(500) 1000 болуы керек\"\n@double\ndef _add(a, b):\n    return a + b\nassert _add(3, 4) == 14, \"Декоратор кез келген аргументпен жұмыс істеуі керек: _add(3, 4) = 14\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Шақырулар санағышы",
   "prompt": "<code>count_calls</code> декораторын жазыңыз: функция әр шақырылғанда <code>wrapper.calls</code> атрибуты 1-ге өссін (басында 0). Функцияның нәтижесі өзгермесін.",
   "starter": "def count_calls(func):\n    return func\n\n@count_calls\ndef hello(name):\n    return \"Сәлем, \" + name\n",
   "solution": "def count_calls(func):\n    def wrapper(*args, **kwargs):\n        wrapper.calls += 1\n        return func(*args, **kwargs)\n    wrapper.calls = 0\n    return wrapper\n\n@count_calls\ndef hello(name):\n    return \"Сәлем, \" + name\n",
   "hints": [
    "Функцияға атрибут қосуға болады: <code>wrapper.calls = 0</code> (wrapper-ді анықтағаннан кейін).",
    "Ішінде: <code>wrapper.calls += 1</code>, сосын <code>return func(*args, **kwargs)</code>."
   ],
   "check": {
    "tests": "assert hello.calls == 0, \"Басында hello.calls = 0\"\nassert hello(\"Дана\") == \"Сәлем, Дана\", \"Нәтиже өзгермеуі керек\"\nhello(\"Әли\"); hello(\"Ерлан\")\nassert hello.calls == 3, \"Үш шақырудан кейін hello.calls = 3\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Теңге белгісін қосу",
   "prompt": "<code>tenge</code> декораторы функция қайтарған санды <code>\"12500 ₸\"</code> түріндегі жолға айналдырсын (<code>f\"{result} ₸\"</code>). Мысалы, <code>@tenge</code> қолданылған <code>total(5000, 7500)</code> → <code>\"12500 ₸\"</code>.",
   "starter": "def tenge(func):\n    return func\n\n@tenge\ndef total(*prices):\n    return sum(prices)\n",
   "solution": "def tenge(func):\n    def wrapper(*args, **kwargs):\n        return f\"{func(*args, **kwargs)} ₸\"\n    return wrapper\n\n@tenge\ndef total(*prices):\n    return sum(prices)\n",
   "hints": [
    "<code>result = func(*args, **kwargs)</code>",
    "<code>return f\"{result} ₸\"</code>"
   ],
   "check": {
    "tests": "assert total(5000, 7500) == \"12500 ₸\", \"total(5000, 7500) '12500 ₸' болуы керек\"\nassert total() == \"0 ₸\", \"total() '0 ₸' болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Шақыру журналы",
   "prompt": "<code>log</code> — бос тізім. <code>logged</code> декораторы әр шақыруда тізімге <code>f\"{func.__name__}{args}\"</code> жолын қосып, функцияның нәтижесін қайтарсын. <code>functools.wraps</code> қолданыңыз, сонда функция атауы сақталады. <code>add(2, 3)</code> шақырылса, <code>log</code> ішіне <code>\"add(2, 3)\"</code> түседі.",
   "starter": "from functools import wraps\n\nlog = []\n\ndef logged(func):\n    return func\n\n@logged\ndef add(a, b):\n    return a + b\n",
   "solution": "from functools import wraps\n\nlog = []\n\ndef logged(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        log.append(f\"{func.__name__}{args}\")\n        return func(*args, **kwargs)\n    return wrapper\n\n@logged\ndef add(a, b):\n    return a + b\n",
   "hints": [
    "<code>@wraps(func)</code> декораторын <code>wrapper</code> үстіне қойыңыз.",
    "<code>log.append(f\"{func.__name__}{args}\")</code>"
   ],
   "check": {
    "tests": "log.clear()\nassert add(2, 3) == 5, \"add(2, 3) 5 қайтаруы керек\"\nadd(10, 20)\nassert log == [\"add(2, 3)\", \"add(10, 20)\"], \"log ['add(2, 3)', 'add(10, 20)'] болуы керек\"\nassert add.__name__ == \"add\", \"@wraps(func) қолданыңыз: атау 'add' болып қалуы керек\"",
    "mustInclude": [
     "wraps"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Әкімші тексеруі",
   "prompt": "Веб-қосымшада кейбір әрекеттерді тек әкімші жасай алады. <code>admin_only</code> декораторын жазыңыз: функцияның бірінші аргументі — пайдаланушы сөздігі. Оның <code>\"role\"</code> мәні <code>\"admin\"</code> болмаса, функция шақырылмай, <code>\"Рұқсат жоқ\"</code> қайтарылсын; әйтпесе функцияның нәтижесі.",
   "starter": "def admin_only(func):\n    return func\n\n@admin_only\ndef delete_user(user, name):\n    return f\"{name} өшірілді\"\n",
   "solution": "def admin_only(func):\n    def wrapper(user, *args, **kwargs):\n        if user.get(\"role\") != \"admin\":\n            return \"Рұқсат жоқ\"\n        return func(user, *args, **kwargs)\n    return wrapper\n\n@admin_only\ndef delete_user(user, name):\n    return f\"{name} өшірілді\"\n",
   "hints": [
    "<code>def wrapper(user, *args, **kwargs):</code> — бірінші аргументті бөлек алыңыз.",
    "<code>if user.get(\"role\") != \"admin\": return \"Рұқсат жоқ\"</code>"
   ],
   "check": {
    "tests": "assert delete_user({\"name\": \"Дана\", \"role\": \"admin\"}, \"Тимур\") == \"Тимур өшірілді\", \"Әкімшіге рұқсат бар\"\nassert delete_user({\"name\": \"Әли\", \"role\": \"user\"}, \"Тимур\") == \"Рұқсат жоқ\", \"Қарапайым пайдаланушыға 'Рұқсат жоқ'\"\nassert delete_user({\"name\": \"Қонақ\"}, \"Тимур\") == \"Рұқсат жоқ\", \"role жоқ болса да 'Рұқсат жоқ'\"\n_called = []\n@admin_only\ndef _act(user):\n    _called.append(1)\n    return \"ok\"\n_act({\"role\": \"user\"})\nassert _called == [], \"Рұқсат жоқ болса, функция мүлдем шақырылмауы керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Теріс нәтижені тоқтату",
   "prompt": "Қоймадағы қалдық теріс бола алмайды. <code>not_negative</code> декораторы функция нәтижесі 0-ден кіші болса, <code>0</code> қайтарсын, әйтпесе нәтиженің өзін. <code>functools.wraps</code> қолданыңыз.",
   "starter": "from functools import wraps\n\ndef not_negative(func):\n    return func\n\n@not_negative\ndef remaining(stock, sold):\n    return stock - sold\n",
   "solution": "from functools import wraps\n\ndef not_negative(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        result = func(*args, **kwargs)\n        if result < 0:\n            return 0\n        return result\n    return wrapper\n\n@not_negative\ndef remaining(stock, sold):\n    return stock - sold\n",
   "hints": [
    "Алдымен <code>result = func(*args, **kwargs)</code>, сосын тексеріңіз.",
    "<code>@wraps(func)</code> атауды сақтайды."
   ],
   "check": {
    "tests": "assert remaining(50, 20) == 30, \"remaining(50, 20) 30 болуы керек\"\nassert remaining(10, 25) == 0, \"Нәтиже теріс болса, 0\"\nassert remaining(stock=5, sold=5) == 0, \"Атаулы аргументтермен де жұмыс істеуі керек\"\nassert remaining.__name__ == \"remaining\", \"@wraps(func) қолданыңыз: атау сақталуы керек\"",
    "mustInclude": [
     "wraps"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Кэшпен Фибоначчи",
   "prompt": "Аңғал рекурсивті <code>fib(n)</code> өте баяу. Оны өзгертпей, үстіне стандартты <code>@lru_cache</code> декораторын қойыңыз (<code>from functools import lru_cache</code>). Сосын <code>fib(90)</code> бірден есептеледі. <code>fib(0) = 0</code>, <code>fib(1) = 1</code>.",
   "starter": "def fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\n",
   "solution": "from functools import lru_cache\n\n@lru_cache\ndef fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\n",
   "hints": [
    "<code>from functools import lru_cache</code>",
    "<code>def fib</code> үстіне <code>@lru_cache</code> жазыңыз."
   ],
   "check": {
    "tests": "assert fib(10) == 55, \"fib(10) 55 болуы керек\"\nassert hasattr(fib, \"cache_info\"), \"fib үстіне @lru_cache қойыңыз\"\nassert fib(90) == 2880067194370816120, \"fib(90) 2880067194370816120 болуы керек\"\nassert \"fib\" in fib.__wrapped__.__code__.co_names, \"fib рекурсивті болып қалуы керек\"",
    "mustInclude": [
     "lru_cache"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Бір рет орындау",
   "prompt": "Дерекқорға қосылу бір рет қана жасалуы керек. <code>once</code> декораторын жазыңыз: функция тек <b>бірінші</b> шақыруда орындалады, кейінгі шақыруларда қайта орындалмай, бірінші нәтиже қайтарылады (аргументтер басқа болса да). <code>functools.wraps</code> қолданыңыз.",
   "starter": "from functools import wraps\n\ndef once(func):\n    return func\n",
   "solution": "from functools import wraps\n\ndef once(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        if not wrapper.done:\n            wrapper.result = func(*args, **kwargs)\n            wrapper.done = True\n        return wrapper.result\n    wrapper.done = False\n    wrapper.result = None\n    return wrapper\n",
   "hints": [
    "Күйді wrapper атрибуттарында сақтаңыз: <code>wrapper.done = False</code>, <code>wrapper.result = None</code>.",
    "Ішінде: <code>if not wrapper.done:</code> болса ғана <code>func</code>-ты шақырыңыз."
   ],
   "check": {
    "tests": "_calls = []\n@once\ndef connect(city):\n    _calls.append(city)\n    return f\"{city} серверіне қосылды\"\nassert connect(\"Алматы\") == \"Алматы серверіне қосылды\", \"Бірінші шақыру функцияны орындайды\"\nassert connect(\"Астана\") == \"Алматы серверіне қосылды\", \"Кейінгі шақыру бірінші нәтижені қайтарады\"\nassert _calls == [\"Алматы\"], \"Функция тек бір рет орындалуы керек\"\nassert connect.__name__ == \"connect\", \"@wraps(func) қолданыңыз\"\n@once\ndef _other():\n    _calls.append(\"x\")\n    return 0\nassert _other() == 0 and _other() == 0 and _calls == [\"Алматы\", \"x\"], \"Әр безендірілген функцияның күйі бөлек болуы керек\"",
    "mustInclude": [
     "wraps"
    ]
   }
  }
 ],
 "pyi-12": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Күндер айырмасы",
   "prompt": "<code>from datetime import date</code> қолданып, <code>days_between(d1, d2)</code> функциясын жазыңыз: ол екі <code>date</code> арасындағы күн санын (әрқашан оң) қайтарсын. <code>days_between(date(2026, 9, 1), date(2026, 12, 31))</code> → <code>121</code>.",
   "starter": "from datetime import date\n\ndef days_between(d1, d2):\n    return 0\n",
   "solution": "from datetime import date\n\ndef days_between(d1, d2):\n    return abs((d2 - d1).days)\n",
   "hints": [
    "Екі күннің айырмасы — <code>timedelta</code>, оның <code>.days</code> атрибуты бар.",
    "Таңбаны алып тастау: <code>abs(...)</code>"
   ],
   "check": {
    "tests": "assert days_between(date(2026, 9, 1), date(2026, 12, 31)) == 121, \"1 қыркүйектен 31 желтоқсанға дейін 121 күн\"\nassert days_between(date(2027, 3, 22), date(2027, 3, 1)) == 21, \"Рет кері болса да, оң сан: 21\"\nassert days_between(date(2026, 1, 1), date(2026, 1, 1)) == 0, \"Бір күн: 0\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Аптаның күні",
   "prompt": "<code>weekday_name(text)</code> функциясы <code>\"дд.мм.жжжж\"</code> пішіміндегі күнді <code>datetime.strptime</code> арқылы оқып, апта күнінің қазақша атауын қайтарсын. <code>DAYS</code> тізімі дайын: 0 — дүйсенбі, …, 6 — жексенбі (<code>.weekday()</code>). <code>weekday_name(\"16.12.2026\")</code> → <code>\"сәрсенбі\"</code>.",
   "starter": "from datetime import datetime\n\nDAYS = [\"дүйсенбі\", \"сейсенбі\", \"сәрсенбі\", \"бейсенбі\", \"жұма\", \"сенбі\", \"жексенбі\"]\n\ndef weekday_name(text):\n    return DAYS[0]\n",
   "solution": "from datetime import datetime\n\nDAYS = [\"дүйсенбі\", \"сейсенбі\", \"сәрсенбі\", \"бейсенбі\", \"жұма\", \"сенбі\", \"жексенбі\"]\n\ndef weekday_name(text):\n    d = datetime.strptime(text, \"%d.%m.%Y\")\n    return DAYS[d.weekday()]\n",
   "hints": [
    "<code>datetime.strptime(text, \"%d.%m.%Y\")</code>",
    "<code>DAYS[d.weekday()]</code>"
   ],
   "check": {
    "tests": "assert weekday_name(\"16.12.2026\") == \"сәрсенбі\", \"16.12.2026 — сәрсенбі\"\nassert weekday_name(\"22.03.2027\") == \"дүйсенбі\", \"22.03.2027 — дүйсенбі\"\nassert weekday_name(\"01.01.2028\") == \"сенбі\", \"01.01.2028 — сенбі\"",
    "mustInclude": [
     "strptime"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ең жиі әріп",
   "prompt": "<code>Counter</code> арқылы <code>top_letter(word)</code> функциясын жазыңыз: ол сөзде ең жиі кездесетін әріпті қайтарсын. <code>top_letter(\"қарағанды\")</code> → <code>\"а\"</code>.",
   "starter": "from collections import Counter\n\ndef top_letter(word):\n    return word[0]\n",
   "solution": "from collections import Counter\n\ndef top_letter(word):\n    return Counter(word).most_common(1)[0][0]\n",
   "hints": [
    "<code>Counter(word)</code> әр әріпті санайды.",
    "<code>.most_common(1)</code> → <code>[(\"а\", 4)]</code>, сондықтан <code>[0][0]</code>."
   ],
   "check": {
    "tests": "assert top_letter(\"қарағанды\") == \"а\", \"top_letter('қарағанды') 'а' болуы керек\"\nassert top_letter(\"жеңешесі\") == \"е\", \"top_letter('жеңешесі') 'е' болуы керек\"\nassert top_letter(\"ммм\") == \"м\", \"top_letter('ммм') 'м' болуы керек\"",
    "mustInclude": [
     "Counter("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қала бойынша топтау",
   "prompt": "Олимпиада қатысушылары <code>(аты, қаласы)</code> кортеждерімен берілген. <code>by_city(people)</code> функциясы <code>defaultdict(list)</code> арқылы (қала → аттар тізімі, бастапқы ретпен) сөздігін құрып, <code>defaultdict</code> қайтарсын.",
   "starter": "from collections import defaultdict\n\ndef by_city(people):\n    return {}\n",
   "solution": "from collections import defaultdict\n\ndef by_city(people):\n    groups = defaultdict(list)\n    for name, city in people:\n        groups[city].append(name)\n    return groups\n",
   "hints": [
    "<code>groups = defaultdict(list)</code>",
    "Циклде: <code>groups[city].append(name)</code> — кілт тексерудің қажеті жоқ."
   ],
   "check": {
    "tests": "_p = [(\"Әли\", \"Алматы\"), (\"Дана\", \"Астана\"), (\"Ерлан\", \"Алматы\"), (\"Сая\", \"Тараз\"), (\"Нұр\", \"Астана\")]\n_g = by_city(_p)\nassert type(_g).__name__ == \"defaultdict\", \"Нәтиже defaultdict(list) болуы керек\"\nassert dict(_g) == {\"Алматы\": [\"Әли\", \"Ерлан\"], \"Астана\": [\"Дана\", \"Нұр\"], \"Тараз\": [\"Сая\"]}, \"by_city(...) қала → аттар тізімі болуы керек\"\nassert _g[\"Орал\"] == [], \"Жоқ қалаға бос тізім қайтуы керек (defaultdict)\"",
    "mustInclude": [
     "defaultdict(list)"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Тапсыру мерзімі",
   "prompt": "<code>deadline(start, days)</code> функциясы <code>\"дд.мм.жжжж\"</code> пішіміндегі басталу күнін оқып (<code>strptime</code>), оған <code>days</code> күн қосып (<code>timedelta</code>), нәтижені сол пішімде (<code>strftime</code>) қайтарсын. <code>deadline(\"16.10.2026\", 45)</code> → <code>\"30.11.2026\"</code>.",
   "starter": "from datetime import datetime, timedelta\n\ndef deadline(start, days):\n    return start\n",
   "solution": "from datetime import datetime, timedelta\n\ndef deadline(start, days):\n    d = datetime.strptime(start, \"%d.%m.%Y\") + timedelta(days=days)\n    return d.strftime(\"%d.%m.%Y\")\n",
   "hints": [
    "<code>datetime.strptime(start, \"%d.%m.%Y\") + timedelta(days=days)</code>",
    "Қайта жолға: <code>.strftime(\"%d.%m.%Y\")</code>"
   ],
   "check": {
    "tests": "assert deadline(\"16.10.2026\", 45) == \"30.11.2026\", \"deadline('16.10.2026', 45) '30.11.2026' болуы керек\"\nassert deadline(\"25.12.2026\", 10) == \"04.01.2027\", \"Жыл ауысуы: '04.01.2027'\"\nassert deadline(\"28.02.2028\", 1) == \"29.02.2028\", \"2028 — кібісе жыл: '29.02.2028'\"",
    "mustInclude": [
     "timedelta"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең жақын қала",
   "prompt": "<code>City = namedtuple(\"City\", [\"name\", \"x\", \"y\"])</code> жасаңыз. <code>closest(cities, x, y)</code> функциясы <code>(x, y)</code> нүктесіне ең жақын қаланың атауын қайтарсын (қашықтық: <code>abs(dx) + abs(dy)</code>). Өрістерге атауымен жүгініңіз: <code>c.x</code>, <code>c.name</code>.",
   "starter": "from collections import namedtuple\n\ndef closest(cities, x, y):\n    return cities[0].name\n",
   "solution": "from collections import namedtuple\n\nCity = namedtuple(\"City\", [\"name\", \"x\", \"y\"])\n\ndef closest(cities, x, y):\n    return min(cities, key=lambda c: abs(c.x - x) + abs(c.y - y)).name\n",
   "hints": [
    "<code>City = namedtuple(\"City\", [\"name\", \"x\", \"y\"])</code>",
    "<code>min(cities, key=lambda c: abs(c.x - x) + abs(c.y - y)).name</code>"
   ],
   "check": {
    "tests": "_cs = [City(\"Алматы\", 10, 2), City(\"Тараз\", 2, 3), City(\"Қонаев\", 11, 5)]\nassert _cs[0].name == \"Алматы\" and _cs[0][1] == 10, \"City namedtuple өрістері: name, x, y\"\nassert closest(_cs, 0, 0) == \"Тараз\", \"(0, 0) нүктесіне Тараз жақын\"\nassert closest(_cs, 12, 6) == \"Қонаев\", \"(12, 6) нүктесіне Қонаев жақын\"",
    "mustInclude": [
     "namedtuple("
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Апта күндері бойынша сатылым",
   "prompt": "Сатылымдар <code>(\"2026-10-16\", сома)</code> кортеждерімен берілген. <code>weekday_sales(sales)</code> функциясы күнді <code>strptime(..., \"%Y-%m-%d\")</code> арқылы оқып, <code>defaultdict(int)</code> көмегімен (апта күнінің атауы → жалпы сома) кәдімгі <code>dict</code> қайтарсын. Атаулар <code>DAYS</code> тізімінде (0 — дүйсенбі).",
   "starter": "from datetime import datetime\nfrom collections import defaultdict\n\nDAYS = [\"дүйсенбі\", \"сейсенбі\", \"сәрсенбі\", \"бейсенбі\", \"жұма\", \"сенбі\", \"жексенбі\"]\n\ndef weekday_sales(sales):\n    return {}\n",
   "solution": "from datetime import datetime\nfrom collections import defaultdict\n\nDAYS = [\"дүйсенбі\", \"сейсенбі\", \"сәрсенбі\", \"бейсенбі\", \"жұма\", \"сенбі\", \"жексенбі\"]\n\ndef weekday_sales(sales):\n    totals = defaultdict(int)\n    for day, amount in sales:\n        d = datetime.strptime(day, \"%Y-%m-%d\")\n        totals[DAYS[d.weekday()]] += amount\n    return dict(totals)\n",
   "hints": [
    "<code>totals = defaultdict(int)</code>, сосын <code>totals[DAYS[d.weekday()]] += amount</code>.",
    "Соңында <code>dict(totals)</code> қайтарыңыз."
   ],
   "check": {
    "tests": "_s = [(\"2026-10-16\", 12000), (\"2026-10-17\", 8000), (\"2026-10-23\", 5000), (\"2026-10-19\", 3000)]\n_r = weekday_sales(_s)\nassert type(_r) is dict, \"Нәтиже кәдімгі dict болуы керек\"\nassert _r == {\"жұма\": 17000, \"сенбі\": 8000, \"дүйсенбі\": 3000}, \"weekday_sales(...) {'жұма': 17000, 'сенбі': 8000, 'дүйсенбі': 3000} болуы керек\"\nassert weekday_sales([]) == {}, \"Сатылым жоқ болса, бос сөздік\"",
    "mustInclude": [
     "defaultdict(int)"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Аялдамадағы кезек",
   "prompt": "Автобус аялдамасындағы кезекті <code>deque</code> арқылы модельдеңіз. <code>simulate(events)</code> функциясы оқиғаларды кезекпен өңдесін: <code>\"кел:Аты\"</code> — кезектің соңына тұрады; <code>\"vip:Аты\"</code> — кезектің басына тұрады (<code>appendleft</code>); <code>\"мін\"</code> — кезектің басындағы адам автобусқа мінеді (кезек бос болса, ештеңе болмайды). Функция <code>(мінгендер тізімі, кезекте қалғандар тізімі)</code> кортежін қайтарсын.",
   "starter": "from collections import deque\n\ndef simulate(events):\n    return [], []\n",
   "solution": "from collections import deque\n\ndef simulate(events):\n    queue = deque()\n    boarded = []\n    for e in events:\n        if e == \"мін\":\n            if queue:\n                boarded.append(queue.popleft())\n        else:\n            kind, name = e.split(\":\")\n            if kind == \"vip\":\n                queue.appendleft(name)\n            else:\n                queue.append(name)\n    return boarded, list(queue)\n",
   "hints": [
    "<code>queue = deque()</code>; басынан алу — <code>queue.popleft()</code>.",
    "Оқиғаны бөлу: <code>kind, name = e.split(\":\")</code>"
   ],
   "check": {
    "tests": "_ev = [\"кел:Әли\", \"кел:Дана\", \"vip:Әже\", \"мін\", \"кел:Ерлан\", \"мін\", \"мін\", \"мін\"]\nassert simulate(_ev) == ([\"Әже\", \"Әли\", \"Дана\", \"Ерлан\"], []), \"Мінгендер: Әже, Әли, Дана, Ерлан; кезек бос\"\nassert simulate([\"кел:Сая\", \"кел:Нұр\", \"мін\"]) == ([\"Сая\"], [\"Нұр\"]), \"simulate(['кел:Сая', 'кел:Нұр', 'мін']) (['Сая'], ['Нұр']) болуы керек\"\nassert simulate([\"мін\", \"vip:Аян\"]) == ([], [\"Аян\"]), \"Бос кезекте 'мін' ештеңе істемейді\"",
    "mustInclude": [
     "deque"
    ]
   }
  }
 ],
 "pyi-13": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Әмиян төлемі",
   "prompt": "Өз қате класыңызды жасаңыз: <code>NotEnoughMoney(Exception)</code>. <code>Wallet</code> класында <code>balance</code> бар. <code>pay(amount)</code>: сома баланстан көп болса <code>NotEnoughMoney</code> көтерсін (баланс өзгермейді), әйтпесе балансты азайтып, жаңа балансты қайтарсын.",
   "starter": "class Wallet:\n    def __init__(self, balance=0):\n        self.balance = balance\n\n    def pay(self, amount):\n        self.balance -= amount\n        return self.balance\n",
   "solution": "class NotEnoughMoney(Exception):\n    pass\n\n\nclass Wallet:\n    def __init__(self, balance=0):\n        self.balance = balance\n\n    def pay(self, amount):\n        if amount > self.balance:\n            raise NotEnoughMoney(f\"Балансыңыз: {self.balance} ₸\")\n        self.balance -= amount\n        return self.balance\n",
   "hints": [
    "<code>class NotEnoughMoney(Exception): pass</code>",
    "Алдымен тексер, сосын өзгерт: <code>if amount > self.balance: raise NotEnoughMoney(...)</code>"
   ],
   "check": {
    "tests": "assert issubclass(NotEnoughMoney, Exception), \"NotEnoughMoney Exception-нан мұра алуы керек\"\n_w = Wallet(5000)\nassert _w.pay(1200) == 3800, \"pay(1200) жаңа балансты 3800 қайтаруы керек\"\n_e = None\ntry:\n    _w.pay(10000)\nexcept NotEnoughMoney:\n    _e = \"ok\"\nassert _e == \"ok\", \"Ақша жетпесе NotEnoughMoney көтерілуі керек\"\nassert _w.balance == 3800, \"Сәтсіз төлемнен кейін баланс өзгермеуі керек\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Операциялар тізімі",
   "prompt": "Шот тарихы <code>(\"deposit\", 5000)</code> және <code>(\"withdraw\", 3000)</code> сияқты кортеждерден тұрады. <code>format_history(history)</code> функциясы оны жолдар тізіміне айналдырсын: салым <code>\"+5000 ₸\"</code>, алу <code>\"-3000 ₸\"</code>.",
   "starter": "def format_history(history):\n    return []\n",
   "solution": "def format_history(history):\n    lines = []\n    for kind, amount in history:\n        sign = \"+\" if kind == \"deposit\" else \"-\"\n        lines.append(f\"{sign}{amount} ₸\")\n    return lines\n",
   "hints": [
    "Кортежді таратыңыз: <code>for kind, amount in history:</code>",
    "Белгі: <code>\"+\" if kind == \"deposit\" else \"-\"</code>"
   ],
   "check": {
    "tests": "assert format_history([(\"deposit\", 5000), (\"withdraw\", 3000)]) == [\"+5000 ₸\", \"-3000 ₸\"], \"format_history(...) ['+5000 ₸', '-3000 ₸'] болуы керек\"\nassert format_history([]) == [], \"Бос тарих → бос тізім\"\nassert format_history([(\"withdraw\", 150)]) == [\"-150 ₸\"], \"Алу: '-150 ₸'\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Тарихтан баланс",
   "prompt": "<code>balance_from(history, start=0)</code> функциясы бастапқы балансқа тарихтағы барлық операцияны қолданып, соңғы балансты қайтарсын: <code>\"deposit\"</code> қосады, <code>\"withdraw\"</code> азайтады.",
   "starter": "def balance_from(history, start=0):\n    return start\n",
   "solution": "def balance_from(history, start=0):\n    balance = start\n    for kind, amount in history:\n        if kind == \"deposit\":\n            balance += amount\n        else:\n            balance -= amount\n    return balance\n",
   "hints": [
    "<code>balance = start</code>, сосын цикл.",
    "<code>if kind == \"deposit\": balance += amount</code>"
   ],
   "check": {
    "tests": "_h = [(\"deposit\", 5000), (\"withdraw\", 3000), (\"deposit\", 1500)]\nassert balance_from(_h) == 3500, \"balance_from(_h) 3500 болуы керек\"\nassert balance_from(_h, 10000) == 13500, \"start=10000 болса, 13500\"\nassert balance_from([], 700) == 700, \"Операция жоқ болса, start\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жинақ шоты",
   "prompt": "<code>BankAccount</code> дайын. Одан мұра алатын <code>SavingsAccount</code> жазыңыз: <code>__init__(self, owner, balance=0, rate=0.1)</code> <code>super()</code> арқылы; <code>add_interest()</code> пайызды есептеп (<code>round(balance * rate, 2)</code>), балансқа қосып, тарихқа <code>(\"interest\", сома)</code> жазып, соманы қайтарсын.",
   "starter": "class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n        self.history = []\n\n    def deposit(self, amount):\n        if amount <= 0:\n            raise ValueError(\"Сома оң болуы керек\")\n        self.balance += amount\n        self.history.append((\"deposit\", amount))\n\n\nclass SavingsAccount(BankAccount):\n    pass\n",
   "solution": "class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n        self.history = []\n\n    def deposit(self, amount):\n        if amount <= 0:\n            raise ValueError(\"Сома оң болуы керек\")\n        self.balance += amount\n        self.history.append((\"deposit\", amount))\n\n\nclass SavingsAccount(BankAccount):\n    def __init__(self, owner, balance=0, rate=0.1):\n        super().__init__(owner, balance)\n        self.rate = rate\n\n    def add_interest(self):\n        amount = round(self.balance * self.rate, 2)\n        self.balance += amount\n        self.history.append((\"interest\", amount))\n        return amount\n",
   "hints": [
    "<code>super().__init__(owner, balance)</code>, сосын <code>self.rate = rate</code>.",
    "<code>amount = round(self.balance * self.rate, 2)</code>"
   ],
   "check": {
    "tests": "_s = SavingsAccount(\"Айгерім\", 20000)\nassert _s.rate == 0.1 and _s.history == [], \"rate әдепкіде 0.1, тарих бос\"\n_s.deposit(5000)\nassert _s.add_interest() == 2500, \"25000 * 0.1 = 2500\"\nassert _s.balance == 27500, \"Пайыздан кейін баланс 27500\"\nassert _s.history == [(\"deposit\", 5000), (\"interest\", 2500)], \"Тарихқа ('interest', 2500) жазылуы керек\"\nassert SavingsAccount(\"Бек\", 1000, 0.035).add_interest() == 35.0, \"rate=0.035: 35.0\"",
    "mustInclude": [
     "super()"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Банк есебі",
   "prompt": "Банк шоттары (аты → баланс) сөздігімен берілген. <code>report(accounts)</code> функциясы жолдар тізімін қайтарсын: баланс бойынша кему ретімен (тең болса — аты бойынша), әр жол <code>\"1. Дана: 15000 ₸\"</code> пішімінде (нөмір 1-ден).",
   "starter": "def report(accounts):\n    return []\n",
   "solution": "def report(accounts):\n    ordered = sorted(accounts.items(), key=lambda p: (-p[1], p[0]))\n    return [f\"{i}. {name}: {bal} ₸\" for i, (name, bal) in enumerate(ordered, start=1)]\n",
   "hints": [
    "<code>sorted(accounts.items(), key=lambda p: (-p[1], p[0]))</code>",
    "<code>enumerate(ordered, start=1)</code> нөмірлейді."
   ],
   "check": {
    "tests": "_acc = {\"Әли\": 12000, \"Дана\": 15000, \"Ерлан\": 3000, \"Бекзат\": 12000}\nassert report(_acc) == [\"1. Дана: 15000 ₸\", \"2. Бекзат: 12000 ₸\", \"3. Әли: 12000 ₸\", \"4. Ерлан: 3000 ₸\"], \"report(...) нәтижесі дұрыс емес: баланс бойынша кему, тең болса аты бойынша\"\nassert report({}) == [], \"Шот жоқ болса, бос тізім\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең үлкен салым",
   "prompt": "<code>histories</code> — (клиент → операциялар тарихы) сөздігі; тарих <code>(\"deposit\", 5000)</code> сияқты кортеждерден тұрады. <code>largest_deposit(histories)</code> функциясы барлық клиент ішіндегі ең үлкен салымды <code>(клиент, сома)</code> кортежі ретінде қайтарсын. Бірде-бір салым болмаса, <code>None</code>.",
   "starter": "def largest_deposit(histories):\n    return None\n",
   "solution": "def largest_deposit(histories):\n    deposits = [(owner, amount) for owner, h in histories.items() for kind, amount in h if kind == \"deposit\"]\n    if not deposits:\n        return None\n    return max(deposits, key=lambda d: d[1])\n",
   "hints": [
    "Барлық салымды бір тізімге жинаңыз: екі <code>for</code> бар comprehension.",
    "<code>max(deposits, key=lambda d: d[1])</code>"
   ],
   "check": {
    "tests": "_h = {\"Әли\": [(\"deposit\", 5000), (\"withdraw\", 9000)], \"Дана\": [(\"deposit\", 7000), (\"deposit\", 2000)], \"Ерлан\": []}\nassert largest_deposit(_h) == (\"Дана\", 7000), \"largest_deposit(...) ('Дана', 7000) болуы керек: алу операциялары есептелмейді\"\nassert largest_deposit({\"Сая\": [(\"withdraw\", 100)]}) is None, \"Салым жоқ болса, None\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Комиссиямен аударым",
   "prompt": "<code>Bank</code> класы: <code>self.accounts</code> — (аты → баланс) сөздігі. <code>transfer(src, dst, amount)</code> әдісі аударымға 1% комиссия алады, бірақ кемінде 100 ₸ (<code>max(100, round(amount * 0.01))</code>). <code>src</code>-тан <code>amount + комиссия</code> алынады, <code>dst</code>-ға <code>amount</code> түседі, комиссия <code>self.fees</code>-ке жиналады. Сома ≤ 0 болса <code>ValueError</code>; клиент жоқ болса <code>KeyError</code>; ақша жетпесе <code>InsufficientFunds</code>. Қате болса, ештеңе өзгермеуі керек.",
   "starter": "class InsufficientFunds(Exception):\n    pass\n\n\nclass Bank:\n    def __init__(self, accounts):\n        self.accounts = dict(accounts)\n        self.fees = 0\n\n    def transfer(self, src, dst, amount):\n        pass\n",
   "solution": "class InsufficientFunds(Exception):\n    pass\n\n\nclass Bank:\n    def __init__(self, accounts):\n        self.accounts = dict(accounts)\n        self.fees = 0\n\n    def transfer(self, src, dst, amount):\n        if amount <= 0:\n            raise ValueError(\"Сома оң болуы керек\")\n        if src not in self.accounts or dst not in self.accounts:\n            raise KeyError(\"Мұндай клиент жоқ\")\n        fee = max(100, round(amount * 0.01))\n        if self.accounts[src] < amount + fee:\n            raise InsufficientFunds(\"Қаражат жеткіліксіз\")\n        self.accounts[src] -= amount + fee\n        self.accounts[dst] += amount\n        self.fees += fee\n",
   "hints": [
    "Барлық тексеруді өзгертуден <b>бұрын</b> жасаңыз: сома, клиенттер, баланс.",
    "<code>fee = max(100, round(amount * 0.01))</code>"
   ],
   "check": {
    "tests": "_b = Bank({\"Әли\": 50000, \"Дана\": 1000})\n_b.transfer(\"Әли\", \"Дана\", 20000)\nassert _b.accounts == {\"Әли\": 29800, \"Дана\": 21000} and _b.fees == 200, \"20000 аударымда комиссия 200: Әли 29800, Дана 21000\"\n_b.transfer(\"Дана\", \"Әли\", 500)\nassert _b.accounts[\"Дана\"] == 20400 and _b.fees == 300, \"Ең аз комиссия 100 ₸\"\nfor _args, _exc in (((\"Әли\", \"Дана\", 0), ValueError), ((\"Әли\", \"Тимур\", 100), KeyError), ((\"Дана\", \"Әли\", 20400), InsufficientFunds)):\n    _e = None\n    try:\n        _b.transfer(*_args)\n    except _exc:\n        _e = \"ok\"\n    assert _e == \"ok\", f\"transfer{_args} {_exc.__name__} көтеруі керек\"\nassert _b.accounts == {\"Әли\": 30300, \"Дана\": 20400} and _b.fees == 300, \"Сәтсіз аударымдар ештеңені өзгертпеуі керек\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Шоттарды JSON-ға сақтау",
   "prompt": "Банк деректерін файлда сақтайық. <code>Bank</code> класында <code>accounts</code> — (аты → <code>BankAccount</code>). <code>save(path)</code> әдісі <code>{аты: баланс}</code> сөздігін JSON файлға жазсын. <code>load_bank(path)</code> функциясы файлды оқып, сол шоттары бар жаңа <code>Bank</code> қайтарсын (әр шот — <code>BankAccount</code>).",
   "starter": "import json\n\n\nclass BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n\nclass Bank:\n    def __init__(self):\n        self.accounts = {}\n\n    def open_account(self, owner, balance=0):\n        self.accounts[owner] = BankAccount(owner, balance)\n        return self.accounts[owner]\n\n    def save(self, path):\n        pass\n\n\ndef load_bank(path):\n    return Bank()\n",
   "solution": "import json\n\n\nclass BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n\nclass Bank:\n    def __init__(self):\n        self.accounts = {}\n\n    def open_account(self, owner, balance=0):\n        self.accounts[owner] = BankAccount(owner, balance)\n        return self.accounts[owner]\n\n    def save(self, path):\n        data = {name: acc.balance for name, acc in self.accounts.items()}\n        with open(path, \"w\", encoding=\"utf-8\") as f:\n            json.dump(data, f, ensure_ascii=False)\n\n\ndef load_bank(path):\n    with open(path, encoding=\"utf-8\") as f:\n        data = json.load(f)\n    bank = Bank()\n    for name, balance in data.items():\n        bank.open_account(name, balance)\n    return bank\n",
   "hints": [
    "<code>save</code>: <code>{name: acc.balance for name, acc in self.accounts.items()}</code>, сосын <code>json.dump</code>.",
    "<code>load_bank</code>: <code>json.load</code>, сосын әр жұп үшін <code>bank.open_account(name, balance)</code>."
   ],
   "check": {
    "tests": "import json as _json\n_b = Bank()\n_b.open_account(\"Әли\", 12000); _b.open_account(\"Дана\", 15500)\n_b.save(\"bank_pr.json\")\nwith open(\"bank_pr.json\", encoding=\"utf-8\") as _f:\n    assert _json.load(_f) == {\"Әли\": 12000, \"Дана\": 15500}, \"Файлда {'Әли': 12000, 'Дана': 15500} сақталуы керек\"\n_n = load_bank(\"bank_pr.json\")\nassert isinstance(_n, Bank) and _n is not _b, \"load_bank жаңа Bank қайтаруы керек\"\nassert isinstance(_n.accounts[\"Дана\"], BankAccount), \"Әр шот BankAccount болуы керек\"\nassert {k: a.balance for k, a in _n.accounts.items()} == {\"Әли\": 12000, \"Дана\": 15500}, \"Баланстар файлдағыдай болуы керек\"\nassert _n.accounts[\"Әли\"].owner == \"Әли\", \"owner дұрыс қалпына келуі керек\""
   }
  }
 ]
});
