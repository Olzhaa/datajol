// Practice tasks after the lessons of m4-1. Each lesson's list opens one task at a time.
DJ.addPractice('m4-1', {
 "pr-1": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Үш монета кеңістігі",
   "prompt": "<p>Монетаны 3 рет лақтырамыз: әр лақтыру <code>\"Е\"</code> (елтаңба) немесе <code>\"С\"</code> (сан). <code>itertools.product</code> арқылы sample space-ті <code>omega</code> тізіміне құрыңыз. Сосын дәл екі «елтаңба» түсу ықтималдығын <code>Fraction</code> ретінде <code>p_two</code>-ға жазыңыз.</p><p>Мысалы, <code>(\"Е\", \"Е\", \"С\")</code> — қолайлы нәтиже.</p>",
   "starter": "from itertools import product\nfrom fractions import Fraction\n\nomega = []\np_two = None\n",
   "solution": "from itertools import product\nfrom fractions import Fraction\n\nomega = list(product([\"Е\", \"С\"], repeat=3))\nfav = [w for w in omega if w.count(\"Е\") == 2]\np_two = Fraction(len(fav), len(omega))\n",
   "hints": [
    "<code>product([\"Е\", \"С\"], repeat=3)</code> 8 нәтиже береді.",
    "Кортежде <code>w.count(\"Е\") == 2</code> шартын тексеріңіз."
   ],
   "check": {
    "tests": "from fractions import Fraction as _F\nassert len(omega) == 8, \"omega-да 2 × 2 × 2 = 8 нәтиже болуы керек\"\nassert len(set(omega)) == 8, \"omega-да қайталанатын нәтиже болмауы керек\"\nassert p_two == _F(3, 8), \"Дәл екі елтаңба: ЕЕС, ЕСЕ, СЕЕ — 3 / 8\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бір сүйек оқиғасы",
   "prompt": "<p><code>p_die(event)</code> функциясын жазыңыз: <code>event</code> — бір сүйектің қолайлы беттерінің жиыны (set). Классикалық формуламен ықтималдықты <code>Fraction</code> ретінде қайтарсын. Сүйекте жоқ сандар (мысалы, 7) есепке кірмейді.</p><p>Мысалы, <code>p_die({2, 4, 6})</code> → <code>Fraction(1, 2)</code>.</p>",
   "starter": "from fractions import Fraction\n\ndef p_die(event):\n    pass\n",
   "solution": "from fractions import Fraction\n\ndef p_die(event):\n    omega = {1, 2, 3, 4, 5, 6}\n    return Fraction(len(event & omega), len(omega))\n",
   "hints": [
    "Sample space: <code>{1, 2, 3, 4, 5, 6}</code>.",
    "Қиылысу <code>event &amp; omega</code> тек сүйекте бар беттерді қалдырады."
   ],
   "check": {
    "tests": "from fractions import Fraction as _F\nassert p_die({2, 4, 6}) == _F(1, 2), \"p_die({2, 4, 6}) = 1/2 болуы керек\"\nassert p_die({5}) == _F(1, 6), \"Бір бет: 1/6\"\nassert p_die({7, 8}) == 0, \"Сүйекте 7 мен 8 жоқ: ықтималдық 0\"\nassert p_die({1, 2, 3, 4, 5, 6}) == 1, \"Барлық бет: ықтималдық 1\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Сатып алу жиілігі",
   "prompt": "<p>Frequentist көзқарас. <code>freq(events, trials)</code> функциясын жазыңыз: оқиға саны <code>events</code> мен тәжірибе саны <code>trials</code> бойынша ықтималдықтың бағасын (ондық бөлшек) қайтарсын. <code>trials</code> 0 болса, <code>0.0</code> қайтарсын.</p><p>Мысалы, Шымкенттегі дүкенге 10 000 адам кіріп, 320-сы сатып алса: <code>freq(320, 10000)</code> → <code>0.032</code>.</p>",
   "starter": "def freq(events, trials):\n    pass\n",
   "solution": "def freq(events, trials):\n    if trials == 0:\n        return 0.0\n    return events / trials\n",
   "hints": [
    "Үлес: <code>events / trials</code>.",
    "Нөлге бөлмес үшін алдымен <code>trials == 0</code> тексеріңіз."
   ],
   "check": {
    "tests": "assert abs(freq(320, 10000) - 0.032) < 1e-12, \"freq(320, 10000) = 0.032 болуы керек\"\nassert abs(freq(240, 8000) - 0.03) < 1e-12, \"freq(240, 8000) = 0.03 болуы керек\"\nassert freq(0, 0) == 0.0, \"trials = 0 болса, 0.0 қайтарыңыз\"\nassert freq(5, 5) == 1, \"Барлығы сатып алса, үлес 1\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Екі сүйек: айырма 2",
   "prompt": "<p>Екі сүйектің sample space-ін <code>omega</code> тізіміне құрыңыз. Есептеңіз (екеуі де <code>Fraction</code>):</p><ul><li><code>p_double</code> — екі сүйекте бірдей сан түсу ықтималдығы;</li><li><code>p_diff2</code> — сандардың айырмасы (модулі) дәл 2 болу ықтималдығы, мысалы (1, 3) немесе (5, 3).</li></ul>",
   "starter": "from itertools import product\nfrom fractions import Fraction\n\np_double = None\np_diff2 = None\n",
   "solution": "from itertools import product\nfrom fractions import Fraction\n\nomega = list(product(range(1, 7), repeat=2))\np_double = Fraction(len([w for w in omega if w[0] == w[1]]), len(omega))\np_diff2 = Fraction(len([w for w in omega if abs(w[0] - w[1]) == 2]), len(omega))\n",
   "hints": [
    "Айырманың модулі: <code>abs(w[0] - w[1])</code>.",
    "(1, 3) мен (3, 1) — екі бөлек нәтиже."
   ],
   "check": {
    "tests": "from fractions import Fraction as _F\nassert len(omega) == 36, \"omega-да 36 жұп болуы керек\"\nassert p_double == _F(1, 6), \"Бірдей сан: 6 жұп, 6/36 = 1/6\"\nassert p_diff2 == _F(2, 9), \"Айырма 2: (1,3), (2,4), (3,5), (4,6) және керісінше — 8/36 = 2/9\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Оқиға функциясы",
   "prompt": "<p><code>prob(omega, event)</code> функциясын жазыңыз: <code>omega</code> — бірдей ықтимал нәтижелер тізімі, <code>event</code> — нәтижені алып, <code>True</code>/<code>False</code> қайтаратын функция. Ықтималдықты <code>Fraction</code> ретінде қайтарсын.</p><p>Мысалы, екі сүйек үшін <code>prob(omega, lambda w: sum(w) == 7)</code> → <code>Fraction(1, 6)</code>.</p>",
   "starter": "from fractions import Fraction\n\ndef prob(omega, event):\n    pass\n",
   "solution": "from fractions import Fraction\n\ndef prob(omega, event):\n    fav = [w for w in omega if event(w)]\n    return Fraction(len(fav), len(omega))\n",
   "hints": [
    "Қолайлы нәтижелер: <code>[w for w in omega if event(w)]</code>."
   ],
   "check": {
    "tests": "from itertools import product as _pr\nfrom fractions import Fraction as _F\n_om = list(_pr(range(1, 7), repeat=2))\nassert prob(_om, lambda w: sum(w) == 7) == _F(1, 6), \"Қосынды 7: 1/6 болуы керек\"\nassert prob(_om, lambda w: 6 in w) == _F(11, 36), \"Кемінде бір 6: 11/36 болуы керек\"\nassert prob(list(range(1, 11)), lambda x: x % 3 == 0) == _F(3, 10), \"1..10 ішінде 3-ке бөлінетіндер: 3/10\"\nassert prob([\"Е\", \"С\"], lambda x: x == \"Q\") == 0, \"Мүмкін емес оқиға: 0\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Кафе сусындары",
   "prompt": "<p>Астанадағы кафеде бір күнгі тапсырыстар тізімі берілген. <code>shares(items)</code> функциясын жазыңыз: әр сусынның жиілігін <code>{атауы: Fraction}</code> сөздігі ретінде қайтарсын.</p><p>Мысалы, <code>shares([\"шай\", \"кофе\", \"шай\"])</code> → <code>{\"шай\": Fraction(2, 3), \"кофе\": Fraction(1, 3)}</code>.</p>",
   "starter": "from fractions import Fraction\n\ndef shares(items):\n    pass\n",
   "solution": "from fractions import Fraction\n\ndef shares(items):\n    counts = {}\n    for x in items:\n        counts[x] = counts.get(x, 0) + 1\n    return {x: Fraction(c, len(items)) for x, c in counts.items()}\n",
   "hints": [
    "Алдымен әр атауды санаңыз: <code>counts[x] = counts.get(x, 0) + 1</code>.",
    "Сосын әр санды <code>len(items)</code>-ке бөліңіз."
   ],
   "check": {
    "tests": "from fractions import Fraction as _F\nassert shares([\"шай\", \"кофе\", \"шай\"]) == {\"шай\": _F(2, 3), \"кофе\": _F(1, 3)}, \"shares(['шай', 'кофе', 'шай']) = {'шай': 2/3, 'кофе': 1/3}\"\n_s = shares([\"айран\", \"шай\", \"сок\", \"шай\", \"айран\", \"шай\"])\nassert _s[\"шай\"] == _F(1, 2) and _s[\"айран\"] == _F(1, 3) and _s[\"сок\"] == _F(1, 6), \"6 тапсырыс: шай 1/2, айран 1/3, сок 1/6\"\nassert sum(_s.values()) == 1, \"Барлық жиіліктің қосындысы 1 болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Үш сүйек қосындысы",
   "prompt": "<p><code>p_sum(s, k)</code> функциясын жазыңыз: <code>k</code> сүйек лақтырғанда қосындының дәл <code>s</code> болу ықтималдығын <code>Fraction</code> ретінде қайтарсын. Sample space-ті <code>product(range(1, 7), repeat=k)</code> арқылы құрыңыз.</p><p>Мысалы, <code>p_sum(7, 2)</code> → <code>Fraction(1, 6)</code>, <code>p_sum(3, 3)</code> → <code>Fraction(1, 216)</code>.</p>",
   "starter": "from itertools import product\nfrom fractions import Fraction\n\ndef p_sum(s, k):\n    pass\n",
   "solution": "from itertools import product\nfrom fractions import Fraction\n\ndef p_sum(s, k):\n    omega = list(product(range(1, 7), repeat=k))\n    fav = [w for w in omega if sum(w) == s]\n    return Fraction(len(fav), len(omega))\n",
   "hints": [
    "<code>repeat=k</code> — сүйек саны.",
    "Қолайлы нәтижелер: <code>sum(w) == s</code>."
   ],
   "check": {
    "tests": "from fractions import Fraction as _F\nassert p_sum(7, 2) == _F(1, 6), \"p_sum(7, 2) = 1/6 болуы керек\"\nassert p_sum(3, 3) == _F(1, 216), \"Үш сүйекте қосынды 3: тек (1, 1, 1), 1/216\"\nassert p_sum(10, 3) == _F(1, 8), \"p_sum(10, 3) = 27/216 = 1/8 болуы керек\"\nassert p_sum(19, 3) == 0, \"Үш сүйектің қосындысы 18-ден аспайды\"\nassert sum(p_sum(_s, 3) for _s in range(3, 19)) == 1, \"Барлық қосындылардың ықтималдығы бірге 1\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ең ықтимал қосынды",
   "prompt": "<p><code>most_likely_sum(k)</code> функциясын жазыңыз: <code>k</code> сүйек лақтырғанда ең жиі түсетін қосындыны қайтарсын. Бірнеше қосынды тең болса, ең кішісін алыңыз.</p><p>Мысалы, <code>most_likely_sum(2)</code> → <code>7</code>. Үш сүйекте 10 мен 11 тең ықтимал, сондықтан <code>most_likely_sum(3)</code> → <code>10</code>.</p>",
   "starter": "from itertools import product\n\ndef most_likely_sum(k):\n    pass\n",
   "solution": "from itertools import product\n\ndef most_likely_sum(k):\n    counts = {}\n    for w in product(range(1, 7), repeat=k):\n        s = sum(w)\n        counts[s] = counts.get(s, 0) + 1\n    best = max(counts.values())\n    return min(s for s, c in counts.items() if c == best)\n",
   "hints": [
    "Әр қосынды неше рет кездесетінін сөздікке жинаңыз.",
    "Ең үлкен санды тауып, оған тең қосындылардың ең кішісін алыңыз: <code>min(...)</code>."
   ],
   "check": {
    "tests": "assert most_likely_sum(2) == 7, \"Екі сүйекте ең жиі қосынды 7\"\nassert most_likely_sum(3) == 10, \"Үш сүйекте 10 мен 11 тең (27/216), ең кішісі — 10\"\nassert most_likely_sum(1) == 1, \"Бір сүйекте бәрі тең ықтимал, ең кішісі 1\"\nassert most_likely_sum(4) == 14, \"Төрт сүйекте ең жиі қосынды 14\""
   }
  }
 ],
 "pr-2": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Монета лақтыру",
   "prompt": "<p><code>count_heads(n)</code> функциясын жазыңыз: монетаны <code>n</code> рет лақтырып (<code>random.random() &lt; 0.5</code> — елтаңба), елтаңбалар <b>санын</b> (бүтін сан) қайтарсын. Функция ішінде seed қоймаңыз.</p><p>Мысалы, 10 000 лақтыруда нәтиже шамамен 5 000 болады.</p>",
   "starter": "import random\n\ndef count_heads(n):\n    pass\n",
   "solution": "import random\n\ndef count_heads(n):\n    heads = 0\n    for _ in range(n):\n        if random.random() < 0.5:\n            heads += 1\n    return heads\n",
   "hints": [
    "Санауышты 0-ден бастап, әр «иә» болғанда 1 қосыңыз."
   ],
   "check": {
    "tests": "import random as _r\n_r.seed(3)\n_v = count_heads(10000)\nassert isinstance(_v, int), \"Бүтін сан (санауыш) қайтарыңыз\"\nassert 4800 < _v < 5200, f\"10 000 лақтыруда шамамен 5 000 елтаңба болуы керек, сізде {_v}\"\nassert count_heads(0) == 0, \"0 лақтыруда 0 елтаңба\"",
    "mustInclude": [
     "def count_heads"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Алтылық үлесі",
   "prompt": "<p><code>face_share(n, face)</code> функциясын жазыңыз: сүйекті <code>n</code> рет лақтырып (<code>random.randint(1, 6)</code>), <code>face</code> саны түскен жағдайлардың үлесін (0..1) қайтарсын.</p><p>Мысалы, <code>face_share(60000, 6)</code> шамамен 1/6 ≈ 0.167 болады.</p>",
   "starter": "import random\n\ndef face_share(n, face):\n    pass\n",
   "solution": "import random\n\ndef face_share(n, face):\n    hits = 0\n    for _ in range(n):\n        if random.randint(1, 6) == face:\n            hits += 1\n    return hits / n\n",
   "hints": [
    "<code>random.randint(1, 6) == face</code> болса, санауышты арттырыңыз.",
    "Соңында <code>hits / n</code>."
   ],
   "check": {
    "tests": "import random as _r\n_r.seed(11)\n_v = face_share(60000, 6)\nassert abs(_v - 1 / 6) < 0.01, f\"60 000 лақтыруда үлес 1/6 ≈ 0.167-ге жақын болуы керек, сізде {_v}\"\nassert face_share(1000, 7) == 0, \"Сүйекте 7 жоқ: үлес 0\"",
    "mustInclude": [
     "def face_share"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Seed қайталануы",
   "prompt": "<p><code>draw5(seed)</code> функциясын жазыңыз: <code>random.seed(seed)</code> қойып, <code>random.randint(1, 100)</code> арқылы 5 кездейсоқ сан тізімін қайтарсын. Бірдей seed әрқашан бірдей тізім беруі керек.</p><p>Мысалы, <code>draw5(5) == draw5(5)</code> → <code>True</code>.</p>",
   "starter": "import random\n\ndef draw5(seed):\n    pass\n",
   "solution": "import random\n\ndef draw5(seed):\n    random.seed(seed)\n    return [random.randint(1, 100) for _ in range(5)]\n",
   "hints": [
    "Алдымен <code>random.seed(seed)</code>, сосын тізім.",
    "<code>[random.randint(1, 100) for _ in range(5)]</code>"
   ],
   "check": {
    "tests": "_a = draw5(5)\nassert isinstance(_a, list) and len(_a) == 5, \"5 саннан тұратын тізім қайтарыңыз\"\nassert all(1 <= _x <= 100 for _x in _a), \"Сандар 1..100 аралығында болуы керек\"\nassert draw5(5) == _a, \"Бірдей seed бірдей тізім беруі керек: random.seed(seed) функция ішінде\"\nassert draw5(6) != _a, \"Басқа seed басқа тізім беруі керек\"",
    "mustInclude": [
     "random.seed"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Купон қолдану",
   "prompt": "<p>Алматыдағы дүкенде әр клиент купонды <code>p</code> ықтималдықпен қолданады. <code>sim_any(n, p, k)</code> функциясын жазыңыз: <code>n</code> рет «<code>k</code> клиент келді» тәжірибесін ойнатып, ішінде <b>кемінде бір</b> клиент купон қолданған тәжірибелер үлесін қайтарсын.</p><p>Мысалы, <code>sim_any(50000, 0.2, 3)</code> шамамен 0.488 болады.</p>",
   "starter": "import random\n\ndef sim_any(n, p, k):\n    pass\n",
   "solution": "import random\n\ndef sim_any(n, p, k):\n    hits = 0\n    for _ in range(n):\n        used = False\n        for _ in range(k):\n            if random.random() < p:\n                used = True\n        if used:\n            hits += 1\n    return hits / n\n",
   "hints": [
    "Сыртқы цикл — тәжірибелер, ішкі цикл — <code>k</code> клиент.",
    "Ішкі циклде кемінде бір «иә» болса, тәжірибе сәтті."
   ],
   "check": {
    "tests": "import random as _r\n_r.seed(2)\n_v = sim_any(50000, 0.2, 3)\nassert abs(_v - (1 - 0.8 ** 3)) < 0.01, f\"Үлес шамамен 0.488 болуы керек, сізде {_v}\"\nassert sim_any(1000, 0, 5) == 0, \"p = 0 болса, ешкім қолданбайды\"\nassert sim_any(1000, 1, 1) == 1, \"p = 1 болса, әр тәжірибе сәтті\"",
    "mustInclude": [
     "def sim_any"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жинақталған үлес",
   "prompt": "<p>Үлкен сандар заңын көру үшін <code>running_share(results)</code> функциясын жазыңыз: <code>results</code> — 1 (сатып алды) мен 0 (алмады) тізімі. Әр қадамдағы жинақталған үлестер тізімін қайтарсын.</p><p>Мысалы, <code>running_share([1, 0, 1, 1])</code> → <code>[1.0, 0.5, 0.666..., 0.75]</code>.</p>",
   "starter": "def running_share(results):\n    pass\n",
   "solution": "def running_share(results):\n    out = []\n    total = 0\n    for i, r in enumerate(results, start=1):\n        total += r\n        out.append(total / i)\n    return out\n",
   "hints": [
    "Қосындыны жинап отырыңыз да, әр қадамда қадам нөміріне бөліңіз.",
    "<code>enumerate(results, start=1)</code> қадам нөмірін 1-ден береді."
   ],
   "check": {
    "tests": "_r = running_share([1, 0, 1, 1])\nassert len(_r) == 4, \"Әр элементке бір үлес: ұзындығы 4\"\nassert all(abs(_a - _b) < 1e-12 for _a, _b in zip(_r, [1.0, 0.5, 2 / 3, 0.75])), f\"running_share([1, 0, 1, 1]) = [1.0, 0.5, 0.667, 0.75] болуы керек, сізде {_r}\"\nassert running_share([0, 0]) == [0.0, 0.0], \"Бәрі 0 болса, үлестер 0\"\nassert running_share([]) == [], \"Бос тізім үшін бос тізім\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Автобус күту",
   "prompt": "<p>Қарағандыда автобус әр <code>interval</code> минут сайын келеді, сіз аялдамаға кездейсоқ сәтте келесіз: күту уақыты <code>random.random() * interval</code>. <code>sim_wait(n, interval, limit)</code> функциясын жазыңыз: <code>n</code> рет ойнатып, <code>limit</code> минуттан <b>аз</b> күткен жағдайлар үлесін қайтарсын.</p><p>Мысалы, <code>sim_wait(50000, 15, 5)</code> шамамен 1/3 болады.</p>",
   "starter": "import random\n\ndef sim_wait(n, interval, limit):\n    pass\n",
   "solution": "import random\n\ndef sim_wait(n, interval, limit):\n    hits = 0\n    for _ in range(n):\n        if random.random() * interval < limit:\n            hits += 1\n    return hits / n\n",
   "hints": [
    "Күту уақыты: <code>random.random() * interval</code>.",
    "Оны <code>limit</code>-пен салыстырып, сәттілерді санаңыз."
   ],
   "check": {
    "tests": "import random as _r\n_r.seed(4)\n_v = sim_wait(50000, 15, 5)\nassert abs(_v - 1 / 3) < 0.01, f\"15 минуттық аралықта 5 минуттан аз күту ≈ 0.333, сізде {_v}\"\n_r.seed(5)\n_v2 = sim_wait(50000, 20, 15)\nassert abs(_v2 - 0.75) < 0.01, f\"sim_wait(50000, 20, 15) ≈ 0.75 болуы керек, сізде {_v2}\"",
    "mustInclude": [
     "def sim_wait"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Қос алтылық",
   "prompt": "<p>Екі тәсілді салыстырыңыз:</p><ol><li><code>p_exact</code> — екі сүйекте де 6 түсу ықтималдығы, <code>itertools.product</code> арқылы санап, <code>Fraction</code> ретінде.</li><li><code>sim_double_six(n)</code> — екі сүйекті <code>n</code> рет лақтырып (<code>random.randint</code>), екеуі де 6 болған үлесті қайтаратын функция.</li></ol><p>Үлкен <code>n</code>-де симуляция <code>p_exact</code>-қа жақындайды.</p>",
   "starter": "import random\nfrom itertools import product\nfrom fractions import Fraction\n\np_exact = None\n\ndef sim_double_six(n):\n    pass\n",
   "solution": "import random\nfrom itertools import product\nfrom fractions import Fraction\n\nomega = list(product(range(1, 7), repeat=2))\np_exact = Fraction(len([w for w in omega if w == (6, 6)]), len(omega))\n\ndef sim_double_six(n):\n    hits = 0\n    for _ in range(n):\n        if random.randint(1, 6) == 6 and random.randint(1, 6) == 6:\n            hits += 1\n    return hits / n\n",
   "hints": [
    "Дәл жауап: 36 жұптың біреуі ғана (6, 6).",
    "Симуляцияда екі <code>randint</code>-тің екеуі де 6 болуын тексеріңіз."
   ],
   "check": {
    "tests": "import random as _r\nfrom fractions import Fraction as _F\nassert p_exact == _F(1, 36), \"p_exact = 1/36 болуы керек\"\n_r.seed(8)\n_v = sim_double_six(60000)\nassert abs(_v - 1 / 36) < 0.003, f\"Симуляция 1/36 ≈ 0.0278-ге жақын болуы керек, сізде {_v}\"",
    "mustInclude": [
     "def sim_double_six"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Пенальти сериясы",
   "prompt": "<p>Футболшы пенальтиді <code>p</code> ықтималдықпен соғады. <code>sim_series(n, p, shots, need)</code> функциясын жазыңыз: <code>n</code> рет «<code>shots</code> соққы» сериясын ойнатып, гол саны <b>кемінде</b> <code>need</code> болған сериялар үлесін қайтарсын.</p><p>Мысалы, <code>sim_series(40000, 0.75, 5, 4)</code> шамамен 0.633 болады.</p>",
   "starter": "import random\n\ndef sim_series(n, p, shots, need):\n    pass\n",
   "solution": "import random\n\ndef sim_series(n, p, shots, need):\n    hits = 0\n    for _ in range(n):\n        goals = 0\n        for _ in range(shots):\n            if random.random() < p:\n                goals += 1\n        if goals >= need:\n            hits += 1\n    return hits / n\n",
   "hints": [
    "Әр серияда голдарды санаңыз (ішкі цикл).",
    "Серия сәтті болады, егер <code>goals &gt;= need</code>."
   ],
   "check": {
    "tests": "import random as _r\n_r.seed(9)\n_v = sim_series(40000, 0.75, 5, 4)\nassert abs(_v - 0.6328) < 0.012, f\"5 соққыда кемінде 4 гол ≈ 0.633, сізде {_v}\"\nassert sim_series(500, 0.9, 3, 0) == 1, \"need = 0 болса, әр серия сәтті\"\nassert sim_series(500, 0.5, 3, 4) == 0, \"3 соққыда 4 гол болмайды\"",
    "mustInclude": [
     "def sim_series"
    ]
   }
  }
 ],
 "pr-3": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Толықтауыш",
   "prompt": "<p><code>complement(p)</code> функциясын жазыңыз: «A емес» оқиғасының ықтималдығын қайтарсын.</p><p>Мысалы, клиенттің кету ықтималдығы 0.2 болса, <code>complement(0.2)</code> → <code>0.8</code>.</p>",
   "starter": "def complement(p):\n    pass\n",
   "solution": "def complement(p):\n    return 1 - p\n",
   "hints": [
    "P(A емес) = 1 − P(A)."
   ],
   "check": {
    "tests": "assert abs(complement(0.2) - 0.8) < 1e-12, \"complement(0.2) = 0.8 болуы керек\"\nassert complement(0) == 1, \"complement(0) = 1\"\nassert complement(1) == 0, \"complement(1) = 0\"",
    "mustInclude": [
     "def complement"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Немесе ережесі",
   "prompt": "<p><code>p_or(pa, pb, pab)</code> функциясын жазыңыз: P(A немесе B) қайтарсын, мұндағы <code>pab</code> = P(A және B).</p><p>Мысалы, 40% клиент қосымшаны қолданады, 30% email ашады, 12% екеуін де: <code>p_or(0.4, 0.3, 0.12)</code> → <code>0.58</code>.</p>",
   "starter": "def p_or(pa, pb, pab):\n    pass\n",
   "solution": "def p_or(pa, pb, pab):\n    return pa + pb - pab\n",
   "hints": [
    "Қиылысуды шегеріңіз: <code>pa + pb - pab</code>."
   ],
   "check": {
    "tests": "assert abs(p_or(0.4, 0.3, 0.12) - 0.58) < 1e-12, \"p_or(0.4, 0.3, 0.12) = 0.58 болуы керек: қиылысуды шегердіңіз бе?\"\nassert abs(p_or(0.5, 0.2, 0) - 0.7) < 1e-12, \"Mutually exclusive оқиғаларда жай қосынды: 0.7\"\nassert abs(p_or(0.3, 0.3, 0.3) - 0.3) < 1e-12, \"A мен B бір оқиға болса, жауап 0.3\"",
    "mustInclude": [
     "def p_or"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ешқайсысы емес",
   "prompt": "<p><code>p_neither(pa, pb, pab)</code> функциясын жазыңыз: A да, B да болмау ықтималдығын қайтарсын (қосу ережесі мен толықтауыш).</p><p>Мысалы, <code>p_neither(0.4, 0.3, 0.12)</code> → <code>0.42</code>.</p>",
   "starter": "def p_neither(pa, pb, pab):\n    pass\n",
   "solution": "def p_neither(pa, pb, pab):\n    return 1 - (pa + pb - pab)\n",
   "hints": [
    "Алдымен P(A немесе B), сосын 1-ден шегеріңіз."
   ],
   "check": {
    "tests": "assert abs(p_neither(0.4, 0.3, 0.12) - 0.42) < 1e-12, \"p_neither(0.4, 0.3, 0.12) = 1 − 0.58 = 0.42\"\nassert abs(p_neither(0.5, 0.5, 0)) < 1e-12, \"A немесе B әрқашан болса, жауап 0\"\nassert abs(p_neither(0.1, 0.2, 0.05) - 0.75) < 1e-12, \"p_neither(0.1, 0.2, 0.05) = 0.75\"",
    "mustInclude": [
     "def p_neither"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қиылыспайтын оқиғалар",
   "prompt": "<p>Оқиғалар — нәтижелер жиыны (set). Екі функция жазыңыз:</p><ul><li><code>exclusive(a, b)</code> — A мен B бір уақытта бола алмаса (ортақ нәтиже жоқ), <code>True</code>;</li><li><code>p_union(a, b, omega)</code> — P(A немесе B), <code>Fraction</code> ретінде (бірдей ықтимал нәтижелер).</li></ul><p>Мысалы, сүйекте <code>exclusive({1, 2}, {5, 6})</code> → <code>True</code>, <code>p_union({2, 4, 6}, {4, 5, 6}, omega)</code> → <code>Fraction(2, 3)</code>.</p>",
   "starter": "from fractions import Fraction\n\ndef exclusive(a, b):\n    pass\n\ndef p_union(a, b, omega):\n    pass\n",
   "solution": "from fractions import Fraction\n\ndef exclusive(a, b):\n    return len(a & b) == 0\n\ndef p_union(a, b, omega):\n    return Fraction(len(a | b), len(omega))\n",
   "hints": [
    "Ортақ нәтижелер: <code>a &amp; b</code>, бірігуі: <code>a | b</code>.",
    "Бірігуді санағанда ортақ нәтиже бір-ақ рет саналады."
   ],
   "check": {
    "tests": "from fractions import Fraction as _F\n_om = {1, 2, 3, 4, 5, 6}\nassert exclusive({1, 2}, {5, 6}) is True, \"{1, 2} мен {5, 6}-да ортақ нәтиже жоқ: True\"\nassert exclusive({2, 4, 6}, {4, 5, 6}) is False, \"{2, 4, 6} мен {4, 5, 6}-да 4 және 6 ортақ: False\"\nassert p_union({2, 4, 6}, {4, 5, 6}, _om) == _F(2, 3), \"Бірігуі {2, 4, 5, 6}: 4/6 = 2/3\"\nassert p_union({1}, {2}, _om) == _F(1, 3), \"Қиылыспаса, жай қосынды: 1/6 + 1/6 = 1/3\"",
    "mustInclude": [
     "def exclusive",
     "def p_union"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Серверлер сенімділігі",
   "prompt": "<p>Әр сервердің бір күнде істен шығу ықтималдығы әртүрлі, олар бір-біріне тәуелсіз. <code>p_any_fail(ps)</code> функциясын жазыңыз: <code>ps</code> — ықтималдықтар тізімі; <b>кемінде бір</b> сервердің істен шығу ықтималдығын қайтарсын.</p><p>Мысалы, <code>p_any_fail([0.02, 0.02, 0.02, 0.02, 0.02])</code> ≈ <code>0.096</code>, <code>p_any_fail([0.1, 0.2])</code> → <code>0.28</code>.</p>",
   "starter": "def p_any_fail(ps):\n    pass\n",
   "solution": "def p_any_fail(ps):\n    all_ok = 1\n    for p in ps:\n        all_ok *= 1 - p\n    return 1 - all_ok\n",
   "hints": [
    "Ешқайсысы істен шықпау: барлық <code>(1 - p)</code> көбейтіндісі.",
    "Сосын толықтауыш: 1 − көбейтінді."
   ],
   "check": {
    "tests": "assert abs(p_any_fail([0.02] * 5) - (1 - 0.98 ** 5)) < 1e-12, \"Бес сервер, әрқайсысы 2%: ≈ 0.096\"\nassert abs(p_any_fail([0.1, 0.2]) - 0.28) < 1e-12, \"p_any_fail([0.1, 0.2]) = 1 − 0.9 × 0.8 = 0.28\"\nassert p_any_fail([]) == 0, \"Сервер жоқ болса, 0\"\nassert abs(p_any_fail([0.05] * 60) - (1 - 0.95 ** 60)) < 1e-12, \"60 сервер, әрқайсысы 5%: ≈ 0.954, 1-ден аспайды (жай қоспаңыз)\"",
    "mustInclude": [
     "def p_any_fail"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Неше рет тырысу",
   "prompt": "<p><code>min_trials(p, target)</code> функциясын жазыңыз: әр тәжірибеде оқиға <code>p</code> ықтималдықпен болады. «Кемінде бір рет» ықтималдығы <code>target</code>-тен кем болмайтын ең кіші n-ді қайтарсын.</p><p>Мысалы, жарнама бір көрсетілімде 2% ықтималдықпен басылады: <code>min_trials(0.02, 0.5)</code> → <code>35</code>.</p>",
   "starter": "def min_trials(p, target):\n    pass\n",
   "solution": "def min_trials(p, target):\n    n = 1\n    while 1 - (1 - p) ** n < target:\n        n += 1\n    return n\n",
   "hints": [
    "n = 1-ден бастап, <code>1 - (1 - p) ** n &lt; target</code> болғанша n-ді арттырыңыз."
   ],
   "check": {
    "tests": "assert min_trials(0.02, 0.5) == 35, \"min_trials(0.02, 0.5) = 35 болуы керек\"\nassert min_trials(0.5, 0.5) == 1, \"p = 0.5 болса, бір тәжірибе жеткілікті\"\nassert min_trials(0.1, 0.95) == 29, \"min_trials(0.1, 0.95) = 29 болуы керек\"",
    "mustInclude": [
     "def min_trials"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Алтылық немесе жұп",
   "prompt": "<p>Екі сүйек. A — «кемінде бір 6 түсті», B — «қосынды жұп». <code>itertools.product</code> арқылы санап, <code>Fraction</code> ретінде есептеңіз: <code>p_a</code>, <code>p_b</code>, <code>p_ab</code> (екеуі де), және қосу ережесімен <code>p_or</code> = P(A немесе B).</p>",
   "starter": "from itertools import product\nfrom fractions import Fraction\n\np_a = p_b = p_ab = p_or = None\n",
   "solution": "from itertools import product\nfrom fractions import Fraction\n\nomega = list(product(range(1, 7), repeat=2))\nn = len(omega)\np_a = Fraction(len([w for w in omega if 6 in w]), n)\np_b = Fraction(len([w for w in omega if sum(w) % 2 == 0]), n)\np_ab = Fraction(len([w for w in omega if 6 in w and sum(w) % 2 == 0]), n)\np_or = p_a + p_b - p_ab\n",
   "hints": [
    "A: <code>6 in w</code>, B: <code>sum(w) % 2 == 0</code>.",
    "<code>p_or = p_a + p_b - p_ab</code>"
   ],
   "check": {
    "tests": "from fractions import Fraction as _F\nassert p_a == _F(11, 36), \"Кемінде бір 6: 11/36\"\nassert p_b == _F(1, 2), \"Қосынды жұп: 18/36 = 1/2\"\nassert p_ab == _F(5, 36), \"Екеуі де: (2,6), (4,6), (6,6), (6,2), (6,4) — 5/36\"\nassert p_or == _F(2, 3), \"P(A немесе B) = 11/36 + 18/36 − 5/36 = 24/36 = 2/3\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Формуланы тексеру",
   "prompt": "<p>«Кемінде бір» формуласын симуляциямен тексеріңіз. <code>check_formula(p, n, trials)</code> функциясы <code>(formula, simulated)</code> жұбын қайтарсын:</p><ul><li><code>formula</code> = 1 − (1 − p)<sup>n</sup>;</li><li><code>simulated</code> — <code>trials</code> рет «n тәуелсіз тәжірибе» ойнатып (<code>random.random() &lt; p</code>), кемінде бір сәтті болған үлес.</li></ul>",
   "starter": "import random\n\ndef check_formula(p, n, trials):\n    pass\n",
   "solution": "import random\n\ndef check_formula(p, n, trials):\n    formula = 1 - (1 - p) ** n\n    hits = 0\n    for _ in range(trials):\n        if any(random.random() < p for _ in range(n)):\n            hits += 1\n    return formula, hits / trials\n",
   "hints": [
    "Формула бөлігі — толықтауыш.",
    "Симуляцияда әр тәжірибеде n рет <code>random.random() &lt; p</code> тексеріп, кемінде бір «иә» бар ма соны қараңыз."
   ],
   "check": {
    "tests": "import random as _r\n_r.seed(21)\n_f, _s = check_formula(0.1, 5, 30000)\nassert abs(_f - (1 - 0.9 ** 5)) < 1e-12, \"formula = 1 − 0.9⁵ ≈ 0.4095 болуы керек\"\nassert abs(_s - _f) < 0.012, f\"Симуляция формулаға жақын болуы керек: {_s} мен {_f}\"\n_f2, _s2 = check_formula(0, 3, 100)\nassert _f2 == 0 and _s2 == 0, \"p = 0 болса, екеуі де 0\"",
    "mustInclude": [
     "def check_formula"
    ]
   }
  }
 ],
 "pr-4": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Шартты ықтималдық",
   "prompt": "<p><code>cond(p_ab, p_b)</code> функциясын жазыңыз: P(A | B) = P(A және B) / P(B) қайтарсын.</p><p>Мысалы, P(сатып алу және email) = 0.06, P(email) = 0.5: <code>cond(0.06, 0.5)</code> → <code>0.12</code>.</p>",
   "starter": "def cond(p_ab, p_b):\n    pass\n",
   "solution": "def cond(p_ab, p_b):\n    return p_ab / p_b\n",
   "hints": [
    "Бөлім — шарттың ықтималдығы P(B)."
   ],
   "check": {
    "tests": "assert abs(cond(0.06, 0.5) - 0.12) < 1e-12, \"cond(0.06, 0.5) = 0.12 болуы керек\"\nassert abs(cond(0.2, 0.2) - 1) < 1e-12, \"A және B = B болса, P(A | B) = 1\"\nassert abs(cond(0.03, 0.6) - 0.05) < 1e-12, \"cond(0.03, 0.6) = 0.05 болуы керек\"",
    "mustInclude": [
     "def cond"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Тәуелсіздік тексеру",
   "prompt": "<p><code>independent(pa, pb, pab)</code> функциясын жазыңыз: P(A және B) = P(A) × P(B) болса (айырма 1e-9-дан кіші), <code>True</code> қайтарсын.</p><p>Мысалы, <code>independent(0.4, 0.3, 0.12)</code> → <code>True</code>, <code>independent(0.4, 0.3, 0.2)</code> → <code>False</code>.</p>",
   "starter": "def independent(pa, pb, pab):\n    pass\n",
   "solution": "def independent(pa, pb, pab):\n    return abs(pab - pa * pb) < 1e-9\n",
   "hints": [
    "Бөлшектерді <code>==</code>-мен салыстырмаңыз: <code>abs(pab - pa * pb) &lt; 1e-9</code>."
   ],
   "check": {
    "tests": "assert independent(0.4, 0.3, 0.12) is True, \"0.4 × 0.3 = 0.12: тәуелсіз\"\nassert independent(0.4, 0.3, 0.2) is False, \"0.2 ≠ 0.12: тәуелді\"\nassert independent(0.1, 0.7, 0.07) is True, \"0.1 × 0.7 = 0.07 (ондық бөлшек қатесіне назар аударыңыз)\"",
    "mustInclude": [
     "def independent"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "easy",
   "xp": 10,
   "title": "Себетке салу үлесі",
   "prompt": "<p><code>users</code> мен <code>events</code> кестелерінен P(cart) есептеңіз: барлық пайдаланушының ішінде <code>step = 'cart'</code> оқиғасы бар пайдаланушылар үлесі. Бір баған: <code>p_cart</code> (ондық бөлшек).</p>",
   "starter": "SELECT \nFROM users u\nLEFT JOIN events e ON e.user_id = u.id AND e.step = 'cart';",
   "solution": "SELECT AVG(CASE WHEN e.user_id IS NOT NULL THEN 1.0 ELSE 0 END) AS p_cart FROM users u LEFT JOIN events e ON e.user_id = u.id AND e.step = 'cart';",
   "hints": [
    "<code>LEFT JOIN</code> себетке салмағандарды да сақтайды.",
    "<code>AVG(CASE WHEN e.user_id IS NOT NULL THEN 1.0 ELSE 0 END)</code>"
   ]
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Кестеден шартты үлес",
   "prompt": "<p>Кесте <code>t</code> қала мен жеткізудің кешігуін көрсетеді. <code>p_given(t, row, col)</code> функциясын жазыңыз: P(col | row) қайтарсын, яғни <code>row</code> жолындағы <code>col</code> үлесі.</p><p>Мысалы, <code>p_given(t, \"Алматы\", \"кешікті\")</code> → 30 / 200 = <code>0.15</code>.</p>",
   "starter": "t = {(\"Алматы\", \"кешікті\"): 30, (\"Алматы\", \"уақытында\"): 170,\n     (\"Астана\", \"кешікті\"): 12, (\"Астана\", \"уақытында\"): 108}\n\ndef p_given(t, row, col):\n    pass\n",
   "solution": "t = {(\"Алматы\", \"кешікті\"): 30, (\"Алматы\", \"уақытында\"): 170,\n     (\"Астана\", \"кешікті\"): 12, (\"Астана\", \"уақытында\"): 108}\n\ndef p_given(t, row, col):\n    row_total = sum(v for (r, c), v in t.items() if r == row)\n    return t[(row, col)] / row_total\n",
   "hints": [
    "Жол саны: <code>row</code>-ға тиесілі барлық ұяшықтардың қосындысы.",
    "<code>sum(v for (r, c), v in t.items() if r == row)</code>"
   ],
   "check": {
    "tests": "assert abs(p_given(t, \"Алматы\", \"кешікті\") - 0.15) < 1e-12, \"P(кешікті | Алматы) = 30 / 200 = 0.15\"\nassert abs(p_given(t, \"Астана\", \"кешікті\") - 0.1) < 1e-12, \"P(кешікті | Астана) = 12 / 120 = 0.1: бөлім — Астана жолы\"\n_t2 = {(\"a\", \"x\"): 1, (\"a\", \"y\"): 3, (\"b\", \"x\"): 5, (\"b\", \"y\"): 5}\nassert abs(p_given(_t2, \"a\", \"y\") - 0.75) < 1e-12, \"Басқа кестеде де жұмыс істеуі керек: 3 / 4\"",
    "mustInclude": [
     "def p_given"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Кері шарт",
   "prompt": "<p>P(A | B) мен P(B | A) — әртүрлі сандар. <code>p_row_given_col(t, row, col)</code> функциясын жазыңыз: P(row | col) қайтарсын, яғни <code>col</code> бағанының ішіндегі <code>row</code> үлесі.</p><p>Мысалы, кешіккен жеткізулердің қаншасы Алматыда: <code>p_row_given_col(t, \"Алматы\", \"кешікті\")</code> → 30 / 42 ≈ <code>0.714</code>.</p>",
   "starter": "t = {(\"Алматы\", \"кешікті\"): 30, (\"Алматы\", \"уақытында\"): 170,\n     (\"Астана\", \"кешікті\"): 12, (\"Астана\", \"уақытында\"): 108}\n\ndef p_row_given_col(t, row, col):\n    pass\n",
   "solution": "t = {(\"Алматы\", \"кешікті\"): 30, (\"Алматы\", \"уақытында\"): 170,\n     (\"Астана\", \"кешікті\"): 12, (\"Астана\", \"уақытында\"): 108}\n\ndef p_row_given_col(t, row, col):\n    col_total = sum(v for (r, c), v in t.items() if c == col)\n    return t[(row, col)] / col_total\n",
   "hints": [
    "Енді бөлім — баған саны: <code>c == col</code> болатын ұяшықтар."
   ],
   "check": {
    "tests": "assert abs(p_row_given_col(t, \"Алматы\", \"кешікті\") - 30 / 42) < 1e-12, \"P(Алматы | кешікті) = 30 / 42 ≈ 0.714\"\nassert abs(p_row_given_col(t, \"Астана\", \"уақытында\") - 108 / 278) < 1e-12, \"P(Астана | уақытында) = 108 / 278 ≈ 0.388\"",
    "mustInclude": [
     "def p_row_given_col"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "metrics",
   "level": "medium",
   "xp": 15,
   "title": "Себеттен сатып алуға",
   "prompt": "<p>P(purchase | cart): себетке салған (<code>step = 'cart'</code>) пайдаланушылардың ішінде сатып алғандар (<code>step = 'purchase'</code>) үлесі қанша? <code>events</code> кестесін өзімен <code>LEFT JOIN</code> жасаңыз. Бір баған: <code>p_buy_given_cart</code>.</p>",
   "starter": "",
   "solution": "SELECT AVG(CASE WHEN p.user_id IS NOT NULL THEN 1.0 ELSE 0 END) AS p_buy_given_cart FROM events c LEFT JOIN events p ON p.user_id = c.user_id AND p.step = 'purchase' WHERE c.step = 'cart';",
   "hints": [
    "Шарт: <code>WHERE c.step = 'cart'</code> — тек себетке салғандар қалады.",
    "Екінші көшірмеге <code>p.step = 'purchase'</code> шартымен қосылып, <code>p.user_id IS NOT NULL</code> үлесін алыңыз."
   ],
   "check": {
    "mustInclude": [
     "LEFT JOIN"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Топ бойынша шартты үлес",
   "prompt": "<p><code>cond_by_group(records, target)</code> функциясын жазыңыз: <code>records</code> — <code>(топ, нәтиже)</code> жұптарының тізімі. Әр топ үшін P(нәтиже = target | топ) мәнін <code>{топ: үлес}</code> сөздігі ретінде қайтарсын.</p><p>Мысалы, <code>cond_by_group([(\"mobile\", \"buy\"), (\"mobile\", \"no\"), (\"web\", \"buy\")], \"buy\")</code> → <code>{\"mobile\": 0.5, \"web\": 1.0}</code>.</p>",
   "starter": "def cond_by_group(records, target):\n    pass\n",
   "solution": "def cond_by_group(records, target):\n    total = {}\n    hits = {}\n    for g, r in records:\n        total[g] = total.get(g, 0) + 1\n        if r == target:\n            hits[g] = hits.get(g, 0) + 1\n    return {g: hits.get(g, 0) / n for g, n in total.items()}\n",
   "hints": [
    "Екі сөздік: әр топтың жалпы саны және target саны.",
    "Target болмаған топқа <code>hits.get(g, 0)</code> 0 береді."
   ],
   "check": {
    "tests": "assert cond_by_group([(\"mobile\", \"buy\"), (\"mobile\", \"no\"), (\"web\", \"buy\")], \"buy\") == {\"mobile\": 0.5, \"web\": 1.0}, \"Мысалдағы нәтиже: {'mobile': 0.5, 'web': 1.0}\"\n_rec = [(\"Алматы\", \"иә\")] * 3 + [(\"Алматы\", \"жоқ\")] * 7 + [(\"Шымкент\", \"жоқ\")] * 4\n_r = cond_by_group(_rec, \"иә\")\nassert abs(_r[\"Алматы\"] - 0.3) < 1e-12, \"Алматы: 3 / 10 = 0.3\"\nassert _r[\"Шымкент\"] == 0, \"Шымкентте 'иә' жоқ: 0 болуы керек (топ сөздікте қалуы керек)\"",
    "mustInclude": [
     "def cond_by_group"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Кесте тәуелсіз бе",
   "prompt": "<p><code>is_independent(t, tol=0.001)</code> функциясын жазыңыз: <code>t</code> — <code>{(жол, баған): сан}</code> түріндегі кез келген кесте. Әр ұяшық үшін P(баған | жол) мен P(баған) айырмасы <code>tol</code>-дан кіші болса, <code>True</code> қайтарсын.</p><p>Жол мен баған атауларын кілттерден алыңыз.</p>",
   "starter": "def is_independent(t, tol=0.001):\n    pass\n",
   "solution": "def is_independent(t, tol=0.001):\n    total = sum(t.values())\n    rows = {r for r, c in t}\n    cols = {c for r, c in t}\n    for r in rows:\n        row_total = sum(t.get((r, c), 0) for c in cols)\n        for c in cols:\n            col_total = sum(t.get((x, c), 0) for x in rows)\n            if abs(t.get((r, c), 0) / row_total - col_total / total) >= tol:\n                return False\n    return True\n",
   "hints": [
    "Жолдар: <code>{r for r, c in t}</code>, бағандар: <code>{c for r, c in t}</code>.",
    "P(баған) = баған саны / барлығы; P(баған | жол) = ұяшық / жол саны."
   ],
   "check": {
    "tests": "_t1 = {(\"ер\", \"иә\"): 30, (\"ер\", \"жоқ\"): 70, (\"әйел\", \"иә\"): 45, (\"әйел\", \"жоқ\"): 105}\nassert is_independent(_t1) is True, \"Екі топта да P(иә) = 0.3: тәуелсіз\"\n_t2 = {(\"mobile\", \"churn\"): 90, (\"mobile\", \"stay\"): 510, (\"web\", \"churn\"): 40, (\"web\", \"stay\"): 360}\nassert is_independent(_t2) is False, \"0.15 ≠ 0.13: тәуелді\"\n_t3 = {(\"a\", \"x\"): 10, (\"a\", \"y\"): 20, (\"a\", \"z\"): 30, (\"b\", \"x\"): 20, (\"b\", \"y\"): 40, (\"b\", \"z\"): 60}\nassert is_independent(_t3) is True, \"2 × 3 кестеде де жұмыс істеуі керек\"",
    "mustInclude": [
     "def is_independent"
    ]
   }
  }
 ],
 "pr-5": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Оң нәтиже ықтималдығы",
   "prompt": "<p><code>p_positive(prior, sens, fpr)</code> функциясын жазыңыз: тесттің оң нәтиже беру ықтималдығын P(+) қайтарсын (ауру адамдардан да, сау адамдардан да).</p><p>Мысалы, <code>p_positive(0.01, 0.9, 0.05)</code> → 0.009 + 0.0495 = <code>0.0585</code>.</p>",
   "starter": "def p_positive(prior, sens, fpr):\n    pass\n",
   "solution": "def p_positive(prior, sens, fpr):\n    return sens * prior + fpr * (1 - prior)\n",
   "hints": [
    "P(+) = sens × prior + fpr × (1 − prior)."
   ],
   "check": {
    "tests": "assert abs(p_positive(0.01, 0.9, 0.05) - 0.0585) < 1e-12, \"p_positive(0.01, 0.9, 0.05) = 0.0585: сау адамдардың жалған оң нәтижесін қостыңыз ба?\"\nassert abs(p_positive(0.5, 1, 0) - 0.5) < 1e-12, \"Мінсіз тест: P(+) = prior\"",
    "mustInclude": [
     "def p_positive"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Bayes формуласы",
   "prompt": "<p><code>bayes(p_b_given_a, p_a, p_b)</code> функциясын жазыңыз: P(A | B) = P(B | A) × P(A) / P(B) қайтарсын.</p><p>Мысалы, <code>bayes(0.9, 0.01, 0.0585)</code> ≈ <code>0.154</code>.</p>",
   "starter": "def bayes(p_b_given_a, p_a, p_b):\n    pass\n",
   "solution": "def bayes(p_b_given_a, p_a, p_b):\n    return p_b_given_a * p_a / p_b\n",
   "hints": [
    "Формуланы тікелей жазыңыз."
   ],
   "check": {
    "tests": "assert abs(bayes(0.9, 0.01, 0.0585) - 90 / 585) < 1e-12, \"bayes(0.9, 0.01, 0.0585) ≈ 0.154\"\nassert abs(bayes(0.5, 0.4, 0.5) - 0.4) < 1e-12, \"bayes(0.5, 0.4, 0.5) = 0.4\"",
    "mustInclude": [
     "def bayes"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Табиғи жиіліктер",
   "prompt": "<p><code>counts(N, prior, sens, fpr)</code> функциясын жазыңыз: <code>N</code> адамның ішінде <code>(true_pos, false_pos)</code> жұбын қайтарсын: шын ауру әрі тест +, және сау әрі тест +.</p><p>Мысалы, <code>counts(10000, 0.01, 0.9, 0.05)</code> → <code>(90, 495)</code> (ондық бөлшек түрінде болуы мүмкін).</p>",
   "starter": "def counts(N, prior, sens, fpr):\n    pass\n",
   "solution": "def counts(N, prior, sens, fpr):\n    sick = N * prior\n    healthy = N - sick\n    return sick * sens, healthy * fpr\n",
   "hints": [
    "Ауру: <code>N * prior</code>, олардың <code>sens</code> үлесі оң.",
    "Сау: <code>N - sick</code>, олардың <code>fpr</code> үлесі қате оң."
   ],
   "check": {
    "tests": "_tp, _fp = counts(10000, 0.01, 0.9, 0.05)\nassert abs(_tp - 90) < 1e-6 and abs(_fp - 495) < 1e-6, f\"counts(10000, 0.01, 0.9, 0.05) = (90, 495) болуы керек, сізде {(_tp, _fp)}\"\n_tp2, _fp2 = counts(2000, 0.1, 0.5, 0.1)\nassert abs(_tp2 - 100) < 1e-6 and abs(_fp2 - 180) < 1e-6, \"counts(2000, 0.1, 0.5, 0.1) = (100, 180)\"",
    "mustInclude": [
     "def counts"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Теріс нәтижеден кейін",
   "prompt": "<p>Тест <b>теріс</b> шықты. Сонда да ауру болу ықтималдығы қанша? <code>posterior_neg(prior, sens, fpr)</code> функциясын жазыңыз: P(ауру | −) қайтарсын.</p><p>Кеңес: P(− | ауру) = 1 − sens, P(− | сау) = 1 − fpr. Мысалы, <code>posterior_neg(0.01, 0.9, 0.05)</code> = 10 / 9 415 ≈ <code>0.00106</code>.</p>",
   "starter": "def posterior_neg(prior, sens, fpr):\n    pass\n",
   "solution": "def posterior_neg(prior, sens, fpr):\n    p_neg = (1 - sens) * prior + (1 - fpr) * (1 - prior)\n    return (1 - sens) * prior / p_neg\n",
   "hints": [
    "Алдымен P(−) = (1 − sens) × prior + (1 − fpr) × (1 − prior).",
    "Алым: (1 − sens) × prior."
   ],
   "check": {
    "tests": "assert abs(posterior_neg(0.01, 0.9, 0.05) - 10 / 9415) < 1e-9, \"posterior_neg(0.01, 0.9, 0.05) = 10 / 9415 ≈ 0.00106 (сабақтағы кесте)\"\nassert abs(posterior_neg(0.5, 0.8, 0.2) - 0.2) < 1e-9, \"posterior_neg(0.5, 0.8, 0.2) = 0.2\"\nassert posterior_neg(0.3, 1.0, 0.1) == 0, \"sens = 1 болса, теріс нәтиже ауруды толық жоққа шығарады\"",
    "mustInclude": [
     "def posterior_neg"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Екі рет тест",
   "prompt": "<p>Бірінші тест оң шықты, адам екінші (тәуелсіз, дәл сондай) тест тапсырды, ол да оң. <code>posterior_twice(prior, sens, fpr)</code> функциясын жазыңыз: бірінші posterior-ды екінші есептің prior-ы ретінде алып, соңғы P(ауру | +, +) қайтарсын.</p><p>Мысалы, <code>posterior_twice(0.01, 0.9, 0.05)</code> ≈ <code>0.766</code>.</p>",
   "starter": "def posterior_twice(prior, sens, fpr):\n    pass\n",
   "solution": "def posterior(prior, sens, fpr):\n    return sens * prior / (sens * prior + fpr * (1 - prior))\n\ndef posterior_twice(prior, sens, fpr):\n    return posterior(posterior(prior, sens, fpr), sens, fpr)\n",
   "hints": [
    "Алдымен сабақтағы <code>posterior</code> функциясын жазыңыз.",
    "Екінші қадамда prior орнына бірінші нәтижені беріңіз."
   ],
   "check": {
    "tests": "assert abs(posterior_twice(0.01, 0.9, 0.05) - 0.7659574) < 1e-6, \"posterior_twice(0.01, 0.9, 0.05) ≈ 0.766: екі оң нәтиже сенімділікті күрт арттырады\"\nassert abs(posterior_twice(0.5, 0.8, 0.2) - 0.9411765) < 1e-6, \"posterior_twice(0.5, 0.8, 0.2) = 16/17 ≈ 0.941\"",
    "mustInclude": [
     "def posterior_twice"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Base rate әсері",
   "prompt": "<p><code>posteriors(priors, sens, fpr)</code> функциясын жазыңыз: әр prior үшін P(A | +) тізімін қайтарсын. Сол бір тест сирек оқиғада қаншалықты нашар жұмыс істейтінін көресіз.</p><p>Мысалы, <code>posteriors([0.001, 0.01, 0.1], 0.99, 0.02)</code> ≈ <code>[0.047, 0.333, 0.846]</code>.</p>",
   "starter": "def posteriors(priors, sens, fpr):\n    pass\n",
   "solution": "def posteriors(priors, sens, fpr):\n    out = []\n    for prior in priors:\n        p_pos = sens * prior + fpr * (1 - prior)\n        out.append(sens * prior / p_pos)\n    return out\n",
   "hints": [
    "Әр prior үшін сабақтағы формуланы қайталаңыз."
   ],
   "check": {
    "tests": "_r = posteriors([0.001, 0.01, 0.1], 0.99, 0.02)\nassert isinstance(_r, list) and len(_r) == 3, \"Әр prior үшін бір мән: ұзындығы 3 тізім\"\n_e = [0.99 * _p / (0.99 * _p + 0.02 * (1 - _p)) for _p in [0.001, 0.01, 0.1]]\nassert all(abs(_a - _b) < 1e-9 for _a, _b in zip(_r, _e)), f\"≈ [0.047, 0.333, 0.846] болуы керек, сізде {_r}\"\nassert _r[0] < _r[1] < _r[2], \"Prior өскен сайын posterior да өсуі керек\"",
    "mustInclude": [
     "def posteriors"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ақау қай зауыттан",
   "prompt": "<p>Тауарлардың 60%-ын Алматы зауыты, 40%-ын Шымкент зауыты шығарады. Ақау үлесі: Алматыда 2%, Шымкентте 5%. <code>p_source(shares, defects, name)</code> функциясын жазыңыз: кездейсоқ тауар ақаулы болып шықты; оның <code>name</code> зауытынан болу ықтималдығын қайтарсын. Зауыт саны кез келген болуы мүмкін.</p><p>Мысалы, <code>p_source({\"Алматы\": 0.6, \"Шымкент\": 0.4}, {\"Алматы\": 0.02, \"Шымкент\": 0.05}, \"Шымкент\")</code> → <code>0.625</code>.</p>",
   "starter": "def p_source(shares, defects, name):\n    pass\n",
   "solution": "def p_source(shares, defects, name):\n    p_defect = sum(shares[f] * defects[f] for f in shares)\n    return shares[name] * defects[name] / p_defect\n",
   "hints": [
    "P(ақау) = Σ үлес × ақау үлесі (барлық зауыт бойынша).",
    "Алым: <code>shares[name] * defects[name]</code>."
   ],
   "check": {
    "tests": "_s = {\"Алматы\": 0.6, \"Шымкент\": 0.4}\n_d = {\"Алматы\": 0.02, \"Шымкент\": 0.05}\nassert abs(p_source(_s, _d, \"Шымкент\") - 0.625) < 1e-9, \"P(Шымкент | ақау) = 0.02 / 0.032 = 0.625\"\nassert abs(p_source(_s, _d, \"Алматы\") - 0.375) < 1e-9, \"P(Алматы | ақау) = 0.012 / 0.032 = 0.375\"\n_s3 = {\"A\": 0.5, \"B\": 0.3, \"C\": 0.2}\n_d3 = {\"A\": 0.01, \"B\": 0.02, \"C\": 0.05}\nassert abs(p_source(_s3, _d3, \"C\") - 0.01 / 0.021) < 1e-9, \"Үш зауытта да жұмыс істеуі керек: 0.01 / 0.021 ≈ 0.476\"",
    "mustInclude": [
     "def p_source"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Bayes симуляциясы",
   "prompt": "<p>Формуланы симуляциямен тексеріңіз. <code>sim_posterior(n, prior, sens, fpr)</code> функциясын жазыңыз: <code>n</code> адамды ойнатыңыз — әрқайсысы <code>prior</code> ықтималдықпен ауру; ауру болса, тест <code>sens</code> ықтималдықпен оң, сау болса <code>fpr</code> ықтималдықпен оң. Оң нәтиже алғандардың ішіндегі аурулар үлесін қайтарсын.</p><p>Мысалы, <code>sim_posterior(50000, 0.1, 0.8, 0.1)</code> шамамен 0.47 болады.</p>",
   "starter": "import random\n\ndef sim_posterior(n, prior, sens, fpr):\n    pass\n",
   "solution": "import random\n\ndef sim_posterior(n, prior, sens, fpr):\n    pos = 0\n    sick_pos = 0\n    for _ in range(n):\n        sick = random.random() < prior\n        p = sens if sick else fpr\n        if random.random() < p:\n            pos += 1\n            if sick:\n                sick_pos += 1\n    return sick_pos / pos\n",
   "hints": [
    "Әр адамға екі кездейсоқ сан: біріншісі ауруды, екіншісі тест нәтижесін анықтайды.",
    "Тек оң нәтижелерді санап, олардың ішіндегі ауруларды бөлек санаңыз."
   ],
   "check": {
    "tests": "import random as _r\n_r.seed(13)\n_v = sim_posterior(50000, 0.1, 0.8, 0.1)\n_e = 0.08 / (0.08 + 0.09)\nassert abs(_v - _e) < 0.03, f\"Симуляция формулаға (≈ 0.471) жақын болуы керек, сізде {_v}\"",
    "mustInclude": [
     "def sim_posterior"
    ]
   }
  }
 ],
 "pr-6": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Түскі ас мәзірі",
   "prompt": "<p>Асханада салат, негізгі тағам және сусын таңдалады. <code>count_options(sizes)</code> функциясын жазыңыз: <code>sizes</code> — әр таңдаудағы нұсқалар саны; көбейту ережесімен барлық комбинация санын қайтарсын.</p><p>Мысалы, 3 салат, 4 тағам, 5 сусын: <code>count_options([3, 4, 5])</code> → <code>60</code>.</p>",
   "starter": "def count_options(sizes):\n    pass\n",
   "solution": "def count_options(sizes):\n    total = 1\n    for s in sizes:\n        total *= s\n    return total\n",
   "hints": [
    "1-ден бастап, әр санға көбейтіңіз."
   ],
   "check": {
    "tests": "assert count_options([3, 4, 5]) == 60, \"3 × 4 × 5 = 60 болуы керек\"\nassert count_options([3, 4]) == 12, \"Футболка: 3 түс × 4 өлшем = 12\"\nassert count_options([10] * 4) == 10000, \"4 таңбалы PIN: 10⁴\"\nassert count_options([]) == 1, \"Таңдау жоқ болса, бір ғана нұсқа (1)\"",
    "mustInclude": [
     "def count_options"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Кезекке тұру",
   "prompt": "<p><code>queue_ways(n)</code> функциясын жазыңыз: <code>n</code> адамның кассаға кезекке тұру тәсілдерінің санын (<code>math.factorial</code>) қайтарсын.</p><p>Мысалы, <code>queue_ways(3)</code> → <code>6</code>.</p>",
   "starter": "import math\n\ndef queue_ways(n):\n    pass\n",
   "solution": "import math\n\ndef queue_ways(n):\n    return math.factorial(n)\n",
   "hints": [
    "n элементті ретімен орналастыру: n!"
   ],
   "check": {
    "tests": "assert queue_ways(3) == 6, \"3! = 6\"\nassert queue_ways(5) == 120, \"5! = 120\"\nassert queue_ways(0) == 1, \"0! = 1\"",
    "mustInclude": [
     "def queue_ways"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Көлік нөмірлері",
   "prompt": "<p>Қазақстандағы көлік нөмірі «123 ABC 02» пішінінде: 3 цифр (0–9, қайталау бар) және 3 әріп (қайталау бар), аймақ коды бекітілген. <code>plates(letters)</code> функциясын жазыңыз: әліпбиде <code>letters</code> әріп болса, бір аймақтағы нөмірлер санын қайтарсын.</p><p>Мысалы, <code>plates(26)</code> → <code>17576000</code>.</p>",
   "starter": "def plates(letters):\n    pass\n",
   "solution": "def plates(letters):\n    return 10 ** 3 * letters ** 3\n",
   "hints": [
    "Көбейту ережесі: цифрлар 10³, әріптер letters³."
   ],
   "check": {
    "tests": "assert plates(26) == 17576000, \"plates(26) = 1000 × 26³ = 17 576 000\"\nassert plates(1) == 1000, \"Бір ғана әріп болса, тек цифрлар өзгереді: 1000\"\nassert plates(10) == 1000000, \"plates(10) = 10⁶\"",
    "mustInclude": [
     "def plates"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Құпиясөздер саны",
   "prompt": "<p><code>pw_counts(a, L)</code> функциясын жазыңыз: <code>a</code> таңбалы әліпбиден ұзындығы <code>L</code> құпиясөздер санын <code>(with_rep, without_rep)</code> жұбы ретінде қайтарсын: таңбалар қайталанса және қайталанбаса (<code>math.perm</code>).</p><p>Мысалы, <code>pw_counts(10, 4)</code> → <code>(10000, 5040)</code>.</p>",
   "starter": "import math\n\ndef pw_counts(a, L):\n    pass\n",
   "solution": "import math\n\ndef pw_counts(a, L):\n    return a ** L, math.perm(a, L)\n",
   "hints": [
    "Қайталау бар: <code>a ** L</code>.",
    "Қайталау жоқ, рет маңызды: <code>math.perm(a, L)</code>."
   ],
   "check": {
    "tests": "assert pw_counts(10, 4) == (10000, 5040), \"pw_counts(10, 4) = (10000, 5040)\"\nassert pw_counts(26, 2) == (676, 650), \"pw_counts(26, 2) = (676, 650)\"\nassert pw_counts(3, 4)[1] == 0, \"3 таңбадан қайталаусыз 4 таңба құрау мүмкін емес: 0\"",
    "mustInclude": [
     "def pw_counts",
     "math.perm"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Лотерея сәйкестігі",
   "prompt": "<p>«5 / 36» лотереясы: 36 саннан 5 сан ұтады, сіз де 5 сан таңдайсыз. <code>p_match(n, k, m)</code> функциясын жазыңыз: <code>n</code> саннан <code>k</code> таңдағанда дәл <code>m</code> санның сәйкес келу ықтималдығын қайтарсын (<code>math.comb</code>).</p><p>Мысалы, <code>p_match(36, 5, 5)</code> → 1 / 376 992.</p>",
   "starter": "import math\n\ndef p_match(n, k, m):\n    pass\n",
   "solution": "import math\n\ndef p_match(n, k, m):\n    return math.comb(k, m) * math.comb(n - k, k - m) / math.comb(n, k)\n",
   "hints": [
    "Ұтқан k саннан m-ін: <code>math.comb(k, m)</code>, қалған n − k саннан k − m-ін: <code>math.comb(n - k, k - m)</code>.",
    "Бөлім: <code>math.comb(n, k)</code>."
   ],
   "check": {
    "tests": "assert abs(p_match(36, 5, 5) - 1 / 376992) < 1e-15, \"Жекпот: 1 / C(36, 5) = 1 / 376 992\"\nassert abs(p_match(36, 5, 0) - 169911 / 376992) < 1e-12, \"Бірде-бір сәйкестік: C(31, 5) / C(36, 5) ≈ 0.451\"\nassert abs(sum(p_match(36, 5, _m) for _m in range(6)) - 1) < 1e-12, \"Барлық m бойынша қосынды 1 болуы керек\"",
    "mustInclude": [
     "def p_match",
     "math.comb"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бір түсті шарлар",
   "prompt": "<p>Қапта әр түсті шарлар бар. <code>p_same_color(counts, k)</code> функциясын жазыңыз: <code>counts</code> — әр түстің саны; кездейсоқ <code>k</code> шар алғанда бәрі бір түсті болу ықтималдығын қайтарсын.</p><p>Мысалы, 5 қызыл, 3 көк, 2 шар алынды: <code>p_same_color([5, 3], 2)</code> → (C(5, 2) + C(3, 2)) / C(8, 2) = 13 / 28.</p>",
   "starter": "import math\n\ndef p_same_color(counts, k):\n    pass\n",
   "solution": "import math\n\ndef p_same_color(counts, k):\n    total = sum(counts)\n    fav = sum(math.comb(c, k) for c in counts)\n    return fav / math.comb(total, k)\n",
   "hints": [
    "Қолайлы: әр түс үшін <code>math.comb(c, k)</code> қосындысы.",
    "Барлығы: <code>math.comb(sum(counts), k)</code>."
   ],
   "check": {
    "tests": "assert abs(p_same_color([5, 3], 2) - 13 / 28) < 1e-12, \"p_same_color([5, 3], 2) = 13/28 ≈ 0.464\"\nassert abs(p_same_color([4, 4, 4], 3) - 12 / 220) < 1e-12, \"Үш түс, 3 шар: 3 × C(4, 3) / C(12, 3) = 12/220\"\nassert p_same_color([2, 2], 3) == 0, \"Әр түстен 2 ғана болса, 3 бір түсті шар алу мүмкін емес\"",
    "mustInclude": [
     "def p_same_color"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Туған күн парадоксы",
   "prompt": "<p><code>p_shared_birthday(n)</code> функциясын жазыңыз: сыныпта <code>n</code> оқушы бар (жылда 365 күн, бәрі бірдей ықтимал). Кемінде екеуінің туған күні сәйкес келу ықтималдығын қайтарсын. Толықтауышты қолданыңыз: «бәрі әртүрлі» = <code>math.perm(365, n) / 365 ** n</code>.</p><p>Мысалы, <code>p_shared_birthday(23)</code> ≈ <code>0.507</code>.</p>",
   "starter": "import math\n\ndef p_shared_birthday(n):\n    pass\n",
   "solution": "import math\n\ndef p_shared_birthday(n):\n    return 1 - math.perm(365, n) / 365 ** n\n",
   "hints": [
    "«Бәрі әртүрлі күн»: бірінші оқушыға 365, екіншісіне 364, ... — бұл <code>math.perm(365, n)</code>.",
    "Жауап: 1 − perm / 365ⁿ."
   ],
   "check": {
    "tests": "assert abs(p_shared_birthday(23) - 0.5072972) < 1e-6, \"23 оқушыда ≈ 0.507\"\nassert p_shared_birthday(1) == 0, \"Бір оқушыда сәйкестік жоқ: 0\"\nassert abs(p_shared_birthday(366) - 1) < 1e-12, \"366 оқушыда сәйкестік міндетті: 1\"\nassert abs(p_shared_birthday(2) - 1 / 365) < 1e-12, \"Екі оқушы: 1/365\"",
    "mustInclude": [
     "def p_shared_birthday"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Кемінде бір ақаулы",
   "prompt": "<p><code>p_any_defect(N, D, n)</code> функциясын жазыңыз: <code>N</code> тауардың <code>D</code>-сы ақаулы, кездейсоқ <code>n</code> тауар тексерілді. Кемінде бір ақаулы табылу ықтималдығын қайтарсын (комбинаторика + толықтауыш).</p><p>Мысалы, <code>p_any_defect(12, 3, 4)</code> = 1 − C(9, 4) / C(12, 4) ≈ <code>0.745</code>.</p>",
   "starter": "import math\n\ndef p_any_defect(N, D, n):\n    pass\n",
   "solution": "import math\n\ndef p_any_defect(N, D, n):\n    return 1 - math.comb(N - D, n) / math.comb(N, n)\n",
   "hints": [
    "«Бірде-бір ақаулы жоқ» = барлық n тауар сапалылардан: <code>math.comb(N - D, n)</code>.",
    "Сосын 1-ден шегеріңіз."
   ],
   "check": {
    "tests": "assert abs(p_any_defect(12, 3, 4) - (1 - 126 / 495)) < 1e-12, \"p_any_defect(12, 3, 4) = 1 − 126/495 ≈ 0.745\"\nassert p_any_defect(10, 0, 5) == 0, \"Ақаулы жоқ болса, 0\"\nassert p_any_defect(10, 6, 5) == 1, \"Сапалы тек 4 болса, 5 тауардың біреуі міндетті ақаулы: 1\"",
    "mustInclude": [
     "def p_any_defect"
    ]
   }
  }
 ],
 "pr-7": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Нақты реттің ықтималдығы",
   "prompt": "<p><code>seq_prob(seq, p)</code> функциясын жазыңыз: <code>seq</code> — 1 (сатып алды) мен 0 (алмады) тізімі, әр келуші тәуелсіз, сатып алу ықтималдығы <code>p</code>. Дәл осы реттің ықтималдығын қайтарсын.</p><p>Мысалы, <code>seq_prob([1, 0, 0, 0], 0.1)</code> → 0.1 × 0.9³ = <code>0.0729</code>.</p>",
   "starter": "def seq_prob(seq, p):\n    pass\n",
   "solution": "def seq_prob(seq, p):\n    prob = 1\n    for x in seq:\n        prob *= p if x == 1 else 1 - p\n    return prob\n",
   "hints": [
    "1 үшін <code>p</code>-ға, 0 үшін <code>1 - p</code>-ға көбейтіңіз."
   ],
   "check": {
    "tests": "assert abs(seq_prob([1, 0, 0, 0], 0.1) - 0.0729) < 1e-12, \"seq_prob([1, 0, 0, 0], 0.1) = 0.0729\"\nassert abs(seq_prob([0, 1, 0, 0], 0.1) - 0.0729) < 1e-12, \"Реті басқа, бірақ ықтималдығы бірдей: 0.0729\"\nassert abs(seq_prob([1, 1], 0.5) - 0.25) < 1e-12, \"seq_prob([1, 1], 0.5) = 0.25\"\nassert seq_prob([], 0.3) == 1, \"Бос рет: 1\"",
    "mustInclude": [
     "def seq_prob"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Орташа және дисперсия",
   "prompt": "<p><code>binom_stats(n, p)</code> функциясын жазыңыз: X ~ Binomial(n, p) үшін <code>(mean, var)</code> жұбын қайтарсын.</p><p>Мысалы, 200 келуші, конверсия 5%: <code>binom_stats(200, 0.05)</code> → <code>(10.0, 9.5)</code>.</p>",
   "starter": "def binom_stats(n, p):\n    pass\n",
   "solution": "def binom_stats(n, p):\n    return n * p, n * p * (1 - p)\n",
   "hints": [
    "Орташа n × p, дисперсия n × p × (1 − p)."
   ],
   "check": {
    "tests": "_m, _v = binom_stats(200, 0.05)\nassert abs(_m - 10) < 1e-9 and abs(_v - 9.5) < 1e-9, \"binom_stats(200, 0.05) = (10, 9.5)\"\n_m2, _v2 = binom_stats(4, 0.5)\nassert abs(_m2 - 2) < 1e-9 and abs(_v2 - 1) < 1e-9, \"binom_stats(4, 0.5) = (2, 1)\"",
    "mustInclude": [
     "def binom_stats"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бәрі немесе ешкім",
   "prompt": "<p>Баскетболшы айып добын 80% ықтималдықпен түсіреді. Екі функция жазыңыз:</p><ul><li><code>p_all(n, p)</code> — <code>n</code> лақтырудың бәрі сәтті болу ықтималдығы;</li><li><code>p_none(n, p)</code> — бірде-бірі сәтті болмау ықтималдығы.</li></ul><p>Мысалы, <code>p_all(3, 0.8)</code> → <code>0.512</code>, <code>p_none(3, 0.8)</code> → <code>0.008</code>.</p>",
   "starter": "def p_all(n, p):\n    pass\n\ndef p_none(n, p):\n    pass\n",
   "solution": "def p_all(n, p):\n    return p ** n\n\ndef p_none(n, p):\n    return (1 - p) ** n\n",
   "hints": [
    "Бұл P(X = n) және P(X = 0): C(n, n) = C(n, 0) = 1."
   ],
   "check": {
    "tests": "assert abs(p_all(3, 0.8) - 0.512) < 1e-12, \"p_all(3, 0.8) = 0.8³ = 0.512\"\nassert abs(p_none(3, 0.8) - 0.008) < 1e-12, \"p_none(3, 0.8) = 0.2³ = 0.008\"\nassert abs(p_all(10, 0.5) - 1 / 1024) < 1e-12, \"p_all(10, 0.5) = 1/1024\"",
    "mustInclude": [
     "def p_all",
     "def p_none"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең көбі k сәтті",
   "prompt": "<p><code>p_at_most(k, n, p)</code> функциясын жазыңыз: X ~ Binomial(n, p) үшін P(X ≤ k) қайтарсын.</p><p>Мысалы, 20 email, ашылу 10%: <code>p_at_most(2, 20, 0.1)</code> ≈ <code>0.677</code>.</p>",
   "starter": "import math\n\ndef p_at_most(k, n, p):\n    pass\n",
   "solution": "import math\n\ndef binom_pmf(k, n, p):\n    return math.comb(n, k) * p ** k * (1 - p) ** (n - k)\n\ndef p_at_most(k, n, p):\n    return sum(binom_pmf(i, n, p) for i in range(k + 1))\n",
   "hints": [
    "Алдымен <code>binom_pmf</code> функциясын жазыңыз.",
    "X ≤ k үшін <code>range(k + 1)</code>."
   ],
   "check": {
    "tests": "assert abs(p_at_most(2, 20, 0.1) - 0.6769268) < 1e-6, \"p_at_most(2, 20, 0.1) ≈ 0.677: range(k + 1) қолданыңыз\"\nassert abs(p_at_most(3, 10, 0.5) - 0.171875) < 1e-9, \"p_at_most(3, 10, 0.5) = 176/1024 ≈ 0.172\"\nassert abs(p_at_most(10, 10, 0.3) - 1) < 1e-9, \"k = n болса, ықтималдық 1\"",
    "mustInclude": [
     "def p_at_most"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Таралу тізімі",
   "prompt": "<p><code>binom_dist(n, p)</code> функциясын жазыңыз: k = 0, 1, ..., n үшін P(X = k) мәндерінің тізімін қайтарсын.</p><p>Мысалы, <code>binom_dist(2, 0.5)</code> → <code>[0.25, 0.5, 0.25]</code>.</p>",
   "starter": "import math\n\ndef binom_dist(n, p):\n    pass\n",
   "solution": "import math\n\ndef binom_dist(n, p):\n    return [math.comb(n, k) * p ** k * (1 - p) ** (n - k) for k in range(n + 1)]\n",
   "hints": [
    "Тізім ұзындығы n + 1: <code>range(n + 1)</code>."
   ],
   "check": {
    "tests": "assert binom_dist(2, 0.5) == [0.25, 0.5, 0.25], \"binom_dist(2, 0.5) = [0.25, 0.5, 0.25]\"\n_d = binom_dist(4, 0.1)\nassert len(_d) == 5, \"n = 4 болса, 5 мән (k = 0..4)\"\nassert abs(_d[1] - 0.2916) < 1e-12, \"P(X = 1) = 0.2916 (сабақтағы мысал)\"\nassert abs(sum(binom_dist(15, 0.37)) - 1) < 1e-9, \"Барлық мәндердің қосындысы 1\"",
    "mustInclude": [
     "def binom_dist"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең ықтимал сан",
   "prompt": "<p><code>binom_mode(n, p)</code> функциясын жазыңыз: ең үлкен ықтималдығы бар k мәнін қайтарсын. Тең болса, ең кішісін алыңыз.</p><p>Мысалы, 20 email, ашылу 10%: <code>binom_mode(20, 0.1)</code> → <code>2</code>.</p>",
   "starter": "import math\n\ndef binom_mode(n, p):\n    pass\n",
   "solution": "import math\n\ndef binom_mode(n, p):\n    probs = [math.comb(n, k) * p ** k * (1 - p) ** (n - k) for k in range(n + 1)]\n    return probs.index(max(probs))\n",
   "hints": [
    "Барлық k үшін pmf тізімін құрыңыз.",
    "<code>probs.index(max(probs))</code> ең үлкенінің бірінші индексін береді."
   ],
   "check": {
    "tests": "assert binom_mode(20, 0.1) == 2, \"binom_mode(20, 0.1) = 2\"\nassert binom_mode(10, 0.5) == 5, \"binom_mode(10, 0.5) = 5\"\nassert binom_mode(4, 0.1) == 0, \"binom_mode(4, 0.1) = 0: 0.9⁴ ≈ 0.656 ең үлкен\"\nassert binom_mode(3, 0.5) == 1, \"1 мен 2 тең (0.375): ең кішісі 1\"",
    "mustInclude": [
     "def binom_mode"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Аралықтағы ықтималдық",
   "prompt": "<p><code>p_between(a, b, n, p)</code> функциясын жазыңыз: P(a ≤ X ≤ b) қайтарсын, X ~ Binomial(n, p).</p><p>Мысалы, Ақтөбедегі дүкенге күніне 200 адам кіреді, конверсия 5%. Сатып алулар саны 5 пен 15 аралығында болу ықтималдығы: <code>p_between(5, 15, 200, 0.05)</code> ≈ <code>0.929</code>.</p>",
   "starter": "import math\n\ndef p_between(a, b, n, p):\n    pass\n",
   "solution": "import math\n\ndef binom_pmf(k, n, p):\n    return math.comb(n, k) * p ** k * (1 - p) ** (n - k)\n\ndef p_between(a, b, n, p):\n    return sum(binom_pmf(k, n, p) for k in range(a, b + 1))\n",
   "hints": [
    "Шекаралар кіреді: <code>range(a, b + 1)</code>."
   ],
   "check": {
    "tests": "assert abs(p_between(5, 15, 200, 0.05) - 0.9291976) < 1e-6, \"p_between(5, 15, 200, 0.05) ≈ 0.929\"\nassert abs(p_between(1, 1, 4, 0.1) - 0.2916) < 1e-12, \"a = b болса, бұл P(X = a)\"\nassert abs(p_between(0, 10, 10, 0.4) - 1) < 1e-9, \"Бүкіл аралық: 1\"",
    "mustInclude": [
     "def p_between"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Овербукинг",
   "prompt": "<p>Ұшақта <code>seats</code> орын бар. Билет сатып алған әр жолаушы <code>p</code> ықтималдықпен келеді (тәуелсіз). <code>max_tickets(seats, p, risk)</code> функциясын жазыңыз: «келгендер орын санынан көп» ықтималдығы <code>risk</code>-тен аспайтын ең көп сатылатын билет санын қайтарсын.</p><p>Мысалы, <code>max_tickets(100, 0.9, 0.05)</code> → <code>106</code>.</p>",
   "starter": "import math\n\ndef max_tickets(seats, p, risk):\n    pass\n",
   "solution": "import math\n\ndef binom_pmf(k, n, p):\n    return math.comb(n, k) * p ** k * (1 - p) ** (n - k)\n\ndef p_over(n, seats, p):\n    return 1 - sum(binom_pmf(k, n, p) for k in range(seats + 1))\n\ndef max_tickets(seats, p, risk):\n    n = seats\n    while p_over(n + 1, seats, p) <= risk:\n        n += 1\n    return n\n",
   "hints": [
    "P(X &gt; seats) = 1 − P(X ≤ seats), X ~ Binomial(n, p).",
    "n = seats-тен бастап, келесі n + 1 үшін тәуекел рұқсат етілгенше арттырыңыз."
   ],
   "check": {
    "tests": "assert max_tickets(100, 0.9, 0.05) == 106, \"max_tickets(100, 0.9, 0.05) = 106 болуы керек\"\nassert max_tickets(50, 0.8, 0.1) == 58, \"max_tickets(50, 0.8, 0.1) = 58 болуы керек\"\nassert max_tickets(10, 1.0, 0.05) == 10, \"Бәрі міндетті келсе, артық сатуға болмайды\"",
    "mustInclude": [
     "def max_tickets"
    ]
   }
  }
 ],
 "pr-8": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Аралыққа λ келтіру",
   "prompt": "<p><code>lam_for(rate_per_hour, minutes)</code> функциясын жазыңыз: сағатына орташа <code>rate_per_hour</code> оқиға болса, <code>minutes</code> минуттық аралықтағы λ-ны қайтарсын.</p><p>Мысалы, <code>lam_for(4, 30)</code> → <code>2.0</code>, <code>lam_for(4, 600)</code> → <code>40.0</code>.</p>",
   "starter": "def lam_for(rate_per_hour, minutes):\n    pass\n",
   "solution": "def lam_for(rate_per_hour, minutes):\n    return rate_per_hour * minutes / 60\n",
   "hints": [
    "λ аралыққа пропорционал: <code>rate_per_hour * minutes / 60</code>."
   ],
   "check": {
    "tests": "assert abs(lam_for(4, 30) - 2) < 1e-12, \"30 минут — жарты сағат: λ = 2\"\nassert abs(lam_for(4, 600) - 40) < 1e-12, \"10 сағат: λ = 40\"\nassert abs(lam_for(9, 20) - 3) < 1e-12, \"lam_for(9, 20) = 3\"",
    "mustInclude": [
     "def lam_for"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Тапсырыс келмеу",
   "prompt": "<p><code>p_zero(lam)</code> функциясын жазыңыз: Poisson(λ) бойынша бірде-бір оқиға болмау ықтималдығын қайтарсын.</p><p>Мысалы, кафеге сағатына орташа 4 тапсырыс: <code>p_zero(4)</code> ≈ <code>0.0183</code>.</p>",
   "starter": "import math\n\ndef p_zero(lam):\n    pass\n",
   "solution": "import math\n\ndef p_zero(lam):\n    return math.exp(-lam)\n",
   "hints": [
    "P(X = 0) = λ⁰ × e^(−λ) / 0! = e^(−λ)."
   ],
   "check": {
    "tests": "import math as _m\nassert abs(p_zero(4) - _m.exp(-4)) < 1e-12, \"p_zero(4) = e^(−4) ≈ 0.0183\"\nassert p_zero(0) == 1, \"λ = 0 болса, оқиға болмайды: 1\"",
    "mustInclude": [
     "def p_zero"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "λ-ны деректен бағалау",
   "prompt": "<p>Павлодардағы такси қызметінің әр сағаттағы шақырту саны тізімде. <code>lam_hat(counts)</code> функциясын жазыңыз: Poisson таралуының λ бағасын (орташа мәнді) қайтарсын.</p><p>Мысалы, <code>lam_hat([3, 5, 4, 4])</code> → <code>4.0</code>.</p>",
   "starter": "def lam_hat(counts):\n    pass\n",
   "solution": "def lam_hat(counts):\n    return sum(counts) / len(counts)\n",
   "hints": [
    "Poisson-да λ — орташа: <code>sum(counts) / len(counts)</code>."
   ],
   "check": {
    "tests": "assert abs(lam_hat([3, 5, 4, 4]) - 4) < 1e-12, \"lam_hat([3, 5, 4, 4]) = 4\"\nassert abs(lam_hat([0, 1, 0, 2, 2]) - 1) < 1e-12, \"lam_hat([0, 1, 0, 2, 2]) = 1\"\nassert lam_hat([7]) == 7, \"Бір сағат: λ = 7\"",
    "mustInclude": [
     "def lam_hat"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Poisson CDF",
   "prompt": "<p><code>poisson_cdf(k, lam)</code> функциясын жазыңыз: P(X ≤ k) қайтарсын.</p><p>Мысалы, <code>poisson_cdf(6, 4)</code> ≈ <code>0.889</code>.</p>",
   "starter": "import math\n\ndef poisson_cdf(k, lam):\n    pass\n",
   "solution": "import math\n\ndef poisson_pmf(k, lam):\n    return lam ** k * math.exp(-lam) / math.factorial(k)\n\ndef poisson_cdf(k, lam):\n    return sum(poisson_pmf(i, lam) for i in range(k + 1))\n",
   "hints": [
    "pmf-ті 0-ден k-ға дейін қосыңыз: <code>range(k + 1)</code>."
   ],
   "check": {
    "tests": "import math as _m\nassert abs(poisson_cdf(6, 4) - 0.8893260) < 1e-6, \"poisson_cdf(6, 4) ≈ 0.889: range(k + 1)\"\nassert abs(poisson_cdf(0, 2) - _m.exp(-2)) < 1e-12, \"poisson_cdf(0, 2) = e^(−2)\"\nassert abs(poisson_cdf(60, 5) - 1) < 1e-9, \"Үлкен k-да CDF ≈ 1\"",
    "mustInclude": [
     "def poisson_cdf"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Курьерге жүктеме",
   "prompt": "<p><code>p_overload(lam, capacity)</code> функциясын жазыңыз: курьер сағатына <code>capacity</code> тапсырыс жеткізе алады, тапсырыстар Poisson(λ). Тапсырыс саны оның мүмкіндігінен <b>көп</b> болу ықтималдығын қайтарсын.</p><p>Мысалы, <code>p_overload(4, 6)</code> ≈ <code>0.111</code>.</p>",
   "starter": "import math\n\ndef p_overload(lam, capacity):\n    pass\n",
   "solution": "import math\n\ndef poisson_pmf(k, lam):\n    return lam ** k * math.exp(-lam) / math.factorial(k)\n\ndef p_overload(lam, capacity):\n    return 1 - sum(poisson_pmf(k, lam) for k in range(capacity + 1))\n",
   "hints": [
    "P(X &gt; c) = 1 − P(X ≤ c).",
    "X ≤ c үшін <code>range(capacity + 1)</code>."
   ],
   "check": {
    "tests": "assert abs(p_overload(4, 6) - 0.1106740) < 1e-6, \"p_overload(4, 6) ≈ 0.111 (сабақтағы мысал)\"\nassert abs(p_overload(5, 8) - 0.0680936) < 1e-6, \"p_overload(5, 8) ≈ 0.068\"\nassert abs(p_overload(2, 0) - (1 - 2.718281828459045 ** -2)) < 1e-9, \"capacity = 0: 1 − e^(−2)\"",
    "mustInclude": [
     "def p_overload"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Аралықтағы тапсырыс",
   "prompt": "<p><code>p_range(a, b, lam)</code> функциясын жазыңыз: P(a ≤ X ≤ b), X ~ Poisson(λ).</p><p>Мысалы, Түркістандағы дәріханаға сағатына орташа 3 клиент келеді: <code>p_range(2, 4, 3)</code> ≈ <code>0.616</code>.</p>",
   "starter": "import math\n\ndef p_range(a, b, lam):\n    pass\n",
   "solution": "import math\n\ndef poisson_pmf(k, lam):\n    return lam ** k * math.exp(-lam) / math.factorial(k)\n\ndef p_range(a, b, lam):\n    return sum(poisson_pmf(k, lam) for k in range(a, b + 1))\n",
   "hints": [
    "Шекаралар кіреді: <code>range(a, b + 1)</code>."
   ],
   "check": {
    "tests": "assert abs(p_range(2, 4, 3) - 0.6161150) < 1e-6, \"p_range(2, 4, 3) ≈ 0.616\"\nassert abs(p_range(0, 0, 4) - 2.718281828459045 ** -4) < 1e-12, \"p_range(0, 0, 4) = e^(−4)\"",
    "mustInclude": [
     "def p_range"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Неше курьер керек",
   "prompt": "<p>Бір сағатта тапсырыстар Poisson(λ), бір курьер сағатына <code>per_courier</code> тапсырыс жеткізеді. <code>couriers_needed(lam, per_courier, risk)</code> функциясын жазыңыз: тапсырыс саны барлық курьерлердің мүмкіндігінен (m × per_courier) асып кету ықтималдығы <code>risk</code>-тен аспайтын ең кіші m-ді қайтарсын.</p><p>Мысалы, <code>couriers_needed(10, 4, 0.05)</code> → <code>4</code>.</p>",
   "starter": "import math\n\ndef couriers_needed(lam, per_courier, risk):\n    pass\n",
   "solution": "import math\n\ndef poisson_pmf(k, lam):\n    return lam ** k * math.exp(-lam) / math.factorial(k)\n\ndef p_over(lam, c):\n    return 1 - sum(poisson_pmf(k, lam) for k in range(c + 1))\n\ndef couriers_needed(lam, per_courier, risk):\n    m = 1\n    while p_over(lam, m * per_courier) > risk:\n        m += 1\n    return m\n",
   "hints": [
    "m = 1-ден бастап, P(X &gt; m × per_courier) &gt; risk болғанша m-ді арттырыңыз."
   ],
   "check": {
    "tests": "assert couriers_needed(10, 4, 0.05) == 4, \"couriers_needed(10, 4, 0.05) = 4: 3 курьер (12) жеткіліксіз\"\nassert couriers_needed(6, 3, 0.1) == 3, \"couriers_needed(6, 3, 0.1) = 3\"\nassert couriers_needed(20, 5, 0.01) == 7, \"couriers_needed(20, 5, 0.01) = 7\"",
    "mustInclude": [
     "def couriers_needed"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Binomial мен Poisson",
   "prompt": "<p>n үлкен, p кіші болғанда Binomial(n, p) ≈ Poisson(λ = n × p). <code>max_gap(n, p, kmax)</code> функциясын жазыңыз: k = 0..kmax үшін екі pmf айырмасының ең үлкен модулін қайтарсын.</p><p>Мысалы, <code>max_gap(1000, 0.003, 5)</code> өте кіші (&lt; 0.001), ал <code>max_gap(10, 0.3, 5)</code> ≈ 0.043.</p>",
   "starter": "import math\n\ndef max_gap(n, p, kmax):\n    pass\n",
   "solution": "import math\n\ndef binom_pmf(k, n, p):\n    return math.comb(n, k) * p ** k * (1 - p) ** (n - k)\n\ndef poisson_pmf(k, lam):\n    return lam ** k * math.exp(-lam) / math.factorial(k)\n\ndef max_gap(n, p, kmax):\n    lam = n * p\n    return max(abs(binom_pmf(k, n, p) - poisson_pmf(k, lam)) for k in range(kmax + 1))\n",
   "hints": [
    "Екі pmf функциясын да жазыңыз (7- және 8-сабақ).",
    "<code>max(abs(...) for k in range(kmax + 1))</code>"
   ],
   "check": {
    "tests": "assert abs(max_gap(1000, 0.003, 5) - 0.00033676) < 1e-6, \"max_gap(1000, 0.003, 5) ≈ 0.00034: λ = n × p\"\nassert abs(max_gap(10, 0.3, 5) - 0.0427861) < 1e-6, \"max_gap(10, 0.3, 5) ≈ 0.043: n кіші болса, жуықтау нашар\"",
    "mustInclude": [
     "def max_gap"
    ]
   }
  }
 ],
 "pr-9": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Uniform CDF",
   "prompt": "<p><code>uniform_cdf(x, a, b)</code> функциясын жазыңыз: X ~ Uniform(a, b) үшін P(X ≤ x) қайтарсын. x &lt; a болса 0, x &gt; b болса 1.</p><p>Мысалы, автобус 20 минут сайын: <code>uniform_cdf(5, 0, 20)</code> → <code>0.25</code>.</p>",
   "starter": "def uniform_cdf(x, a, b):\n    pass\n",
   "solution": "def uniform_cdf(x, a, b):\n    if x <= a:\n        return 0.0\n    if x >= b:\n        return 1.0\n    return (x - a) / (b - a)\n",
   "hints": [
    "Ортада: <code>(x - a) / (b - a)</code>.",
    "Шетінде 0 немесе 1 қайтарыңыз."
   ],
   "check": {
    "tests": "assert abs(uniform_cdf(5, 0, 20) - 0.25) < 1e-12, \"uniform_cdf(5, 0, 20) = 0.25\"\nassert abs(uniform_cdf(12, 10, 14) - 0.5) < 1e-12, \"uniform_cdf(12, 10, 14) = 0.5\"\nassert uniform_cdf(-3, 0, 20) == 0, \"a-дан кіші x үшін 0\"\nassert uniform_cdf(25, 0, 20) == 1, \"b-дан үлкен x үшін 1\"",
    "mustInclude": [
     "def uniform_cdf"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ыстық күн ықтималдығы",
   "prompt": "<p>Шілдедегі Алматының күндізгі температурасы шамамен <code>NormalDist(mu=29, sigma=4)</code>. <code>p_above(mu, sigma, x)</code> функциясын жазыңыз: P(X &gt; x) қайтарсын.</p><p>Мысалы, <code>p_above(29, 4, 35)</code> ≈ <code>0.067</code>.</p>",
   "starter": "from statistics import NormalDist\n\ndef p_above(mu, sigma, x):\n    pass\n",
   "solution": "from statistics import NormalDist\n\ndef p_above(mu, sigma, x):\n    return 1 - NormalDist(mu, sigma).cdf(x)\n",
   "hints": [
    "«Көп» — оң құйрық: <code>1 - cdf(x)</code>."
   ],
   "check": {
    "tests": "assert abs(p_above(29, 4, 35) - 0.0668072) < 1e-6, \"p_above(29, 4, 35) ≈ 0.067: 1 − cdf(35)\"\nassert abs(p_above(40, 5, 50) - 0.0227501) < 1e-6, \"p_above(40, 5, 50) ≈ 0.0228\"\nassert abs(p_above(0, 1, 0) - 0.5) < 1e-12, \"Орташадан жоғары болу ықтималдығы 0.5\"",
    "mustInclude": [
     "def p_above"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Uniform аралығы",
   "prompt": "<p><code>uniform_between(lo, hi, a, b)</code> функциясын жазыңыз: X ~ Uniform(a, b) үшін P(lo &lt; X ≤ hi) = F(hi) − F(lo) қайтарсын. Шекаралар [a, b]-дан шығып кетсе, оларды қиыңыз.</p><p>Мысалы, курьер 0–30 минутта келеді: <code>uniform_between(10, 20, 0, 30)</code> → <code>0.333...</code>.</p>",
   "starter": "def uniform_between(lo, hi, a, b):\n    pass\n",
   "solution": "def uniform_cdf(x, a, b):\n    if x <= a:\n        return 0.0\n    if x >= b:\n        return 1.0\n    return (x - a) / (b - a)\n\ndef uniform_between(lo, hi, a, b):\n    return uniform_cdf(hi, a, b) - uniform_cdf(lo, a, b)\n",
   "hints": [
    "Алдымен <code>uniform_cdf</code> жазып алыңыз.",
    "Аралық: F(hi) − F(lo)."
   ],
   "check": {
    "tests": "assert abs(uniform_between(10, 20, 0, 30) - 1 / 3) < 1e-12, \"uniform_between(10, 20, 0, 30) = 1/3\"\nassert abs(uniform_between(-5, 6, 0, 12) - 0.5) < 1e-12, \"Сол шекара 0-ге дейін қиылады: 6/12 = 0.5\"\nassert abs(uniform_between(0, 100, 0, 30) - 1) < 1e-12, \"Бүкіл аралық: 1\"",
    "mustInclude": [
     "def uniform_between"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қалыпты аралық",
   "prompt": "<p><code>p_between(mu, sigma, lo, hi)</code> функциясын жазыңыз: X ~ Normal(mu, sigma) үшін P(lo &lt; X ≤ hi) қайтарсын.</p><p>Мысалы, ер адамдардың бойы <code>NormalDist(176, 7)</code>: <code>p_between(176, 7, 170, 185)</code> ≈ <code>0.705</code>.</p>",
   "starter": "from statistics import NormalDist\n\ndef p_between(mu, sigma, lo, hi):\n    pass\n",
   "solution": "from statistics import NormalDist\n\ndef p_between(mu, sigma, lo, hi):\n    d = NormalDist(mu, sigma)\n    return d.cdf(hi) - d.cdf(lo)\n",
   "hints": [
    "<code>d.cdf(hi) - d.cdf(lo)</code>"
   ],
   "check": {
    "tests": "from statistics import NormalDist as _N\nassert abs(p_between(176, 7, 170, 185) - (_N(176, 7).cdf(185) - _N(176, 7).cdf(170))) < 1e-12, \"p_between(176, 7, 170, 185) ≈ 0.705\"\nassert abs(p_between(40, 5, 35, 45) - 0.6826895) < 1e-6, \"±1 SD аралығы ≈ 0.683\"\nassert abs(p_between(0, 1, -1.96, 1.96) - 0.95) < 1e-3, \"±1.96 аралығы ≈ 0.95\"",
    "mustInclude": [
     "def p_between"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "ҰБТ табалдырығы",
   "prompt": "<p>ҰБТ ұпайлары шамамен <code>NormalDist(mu=70, sigma=15)</code>. <code>top_threshold(mu, sigma, top)</code> функциясын жазыңыз: ең жоғары <code>top</code> үлесіне (мысалы, 0.1 = үздік 10%) кіру үшін керек ұпайды қайтарсын.</p><p>Мысалы, <code>top_threshold(70, 15, 0.1)</code> ≈ <code>89.2</code>.</p>",
   "starter": "from statistics import NormalDist\n\ndef top_threshold(mu, sigma, top):\n    pass\n",
   "solution": "from statistics import NormalDist\n\ndef top_threshold(mu, sigma, top):\n    return NormalDist(mu, sigma).inv_cdf(1 - top)\n",
   "hints": [
    "Үздік 10% — 90-перцентильден жоғары: <code>inv_cdf(1 - top)</code>."
   ],
   "check": {
    "tests": "assert abs(top_threshold(70, 15, 0.1) - 89.2232735) < 1e-4, \"top_threshold(70, 15, 0.1) ≈ 89.2: inv_cdf(0.9)\"\nassert abs(top_threshold(40, 5, 0.05) - 48.2242681) < 1e-4, \"top_threshold(40, 5, 0.05) ≈ 48.2\"\nassert abs(top_threshold(100, 10, 0.5) - 100) < 1e-9, \"Үздік 50% — орташадан жоғары\"",
    "mustInclude": [
     "def top_threshold",
     "inv_cdf"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "z-баға және ықтималдық",
   "prompt": "<p>Екі функция жазыңыз:</p><ul><li><code>z_score(x, mu, sigma)</code> — x орташадан неше SD алыс;</li><li><code>p_below_z(z)</code> — стандартты қалыпты таралу бойынша P(Z ≤ z) (<code>NormalDist()</code>).</li></ul><p>Мысалы, <code>z_score(50, 40, 5)</code> → <code>2.0</code>, <code>p_below_z(2.0)</code> ≈ <code>0.977</code>.</p>",
   "starter": "from statistics import NormalDist\n\ndef z_score(x, mu, sigma):\n    pass\n\ndef p_below_z(z):\n    pass\n",
   "solution": "from statistics import NormalDist\n\ndef z_score(x, mu, sigma):\n    return (x - mu) / sigma\n\ndef p_below_z(z):\n    return NormalDist().cdf(z)\n",
   "hints": [
    "z = (x − μ) / σ.",
    "<code>NormalDist()</code> — μ = 0, σ = 1."
   ],
   "check": {
    "tests": "from statistics import NormalDist as _N\nassert abs(z_score(50, 40, 5) - 2) < 1e-12, \"z_score(50, 40, 5) = 2\"\nassert abs(z_score(30, 40, 5) + 2) < 1e-12, \"Орташадан төмен: z = −2\"\nassert abs(p_below_z(2.0) - 0.9772499) < 1e-6, \"p_below_z(2.0) ≈ 0.977\"\nassert abs(p_below_z(z_score(45, 40, 5)) - _N(40, 5).cdf(45)) < 1e-12, \"z арқылы алынған ықтималдық NormalDist(40, 5).cdf(45)-пен бірдей болуы керек\"",
    "mustInclude": [
     "def z_score",
     "def p_below_z"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Кепілдік мерзімі",
   "prompt": "<p>Аккумулятордың қызмет ету мерзімі (жыл) <code>NormalDist(mu=5, sigma=1.2)</code>. Екі функция жазыңыз:</p><ul><li><code>warranty(mu, sigma, risk)</code> — тауарлардың тек <code>risk</code> үлесі ғана кепілдік мерзімінен бұрын бұзылатындай мерзім (жыл);</li><li><code>claim_cost(mu, sigma, w, n, cost)</code> — <code>n</code> тауар сатылса, мерзімі <code>w</code> кепілдік бойынша күтілетін шығын: n × P(X &lt; w) × cost.</li></ul><p>Мысалы, <code>warranty(5, 1.2, 0.03)</code> ≈ <code>2.74</code> жыл.</p>",
   "starter": "from statistics import NormalDist\n\ndef warranty(mu, sigma, risk):\n    pass\n\ndef claim_cost(mu, sigma, w, n, cost):\n    pass\n",
   "solution": "from statistics import NormalDist\n\ndef warranty(mu, sigma, risk):\n    return NormalDist(mu, sigma).inv_cdf(risk)\n\ndef claim_cost(mu, sigma, w, n, cost):\n    return n * NormalDist(mu, sigma).cdf(w) * cost\n",
   "hints": [
    "Сол құйрық: <code>inv_cdf(risk)</code>.",
    "Бұзылу ықтималдығы: <code>cdf(w)</code>."
   ],
   "check": {
    "tests": "assert abs(warranty(5, 1.2, 0.03) - 2.7430477) < 1e-4, \"warranty(5, 1.2, 0.03) ≈ 2.74: inv_cdf(risk)\"\nassert abs(warranty(5, 1.2, 0.5) - 5) < 1e-9, \"risk = 0.5 болса, мерзім орташаға тең\"\nassert abs(claim_cost(5, 1.2, 5, 1000, 20000) - 10000000) < 1e-3, \"Мерзім = орташа: тауарлардың жартысы бұзылады, 1000 × 0.5 × 20 000\"\nassert abs(claim_cost(5, 1.2, warranty(5, 1.2, 0.03), 2000, 15000) - 900000) < 1, \"3% тәуекелде 2000 тауар: 2000 × 0.03 × 15 000 = 900 000\"",
    "mustInclude": [
     "def warranty",
     "def claim_cost"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Binomial-ге қалыпты жуықтау",
   "prompt": "<p>n үлкен болғанда Binomial(n, p) ≈ Normal(np, √(np(1 − p))). <code>normal_approx(k, n, p)</code> функциясын жазыңыз: P(X ≤ k) жуық мәнін <code>NormalDist</code> арқылы түзетумен қайтарсын: <code>cdf(k + 0.5)</code>.</p><p>Мысалы, <code>normal_approx(35, 100, 0.3)</code> ≈ <code>0.885</code>, ал дәл Binomial мәні ≈ 0.884.</p>",
   "starter": "import math\nfrom statistics import NormalDist\n\ndef normal_approx(k, n, p):\n    pass\n",
   "solution": "import math\nfrom statistics import NormalDist\n\ndef normal_approx(k, n, p):\n    d = NormalDist(n * p, math.sqrt(n * p * (1 - p)))\n    return d.cdf(k + 0.5)\n",
   "hints": [
    "mu = n × p, sigma = √(n × p × (1 − p)) — дисперсия емес, SD.",
    "<code>d.cdf(k + 0.5)</code>"
   ],
   "check": {
    "tests": "import math as _m\nassert abs(normal_approx(35, 100, 0.3) - 0.8849689) < 1e-5, \"normal_approx(35, 100, 0.3) ≈ 0.885: sigma = √(np(1 − p))\"\n_exact = sum(_m.comb(400, _k) * 0.1 ** _k * 0.9 ** (400 - _k) for _k in range(46))\nassert abs(normal_approx(45, 400, 0.1) - _exact) < 0.01, \"n = 400 үшін жуықтау дәл мәнге жақын болуы керек\"",
    "mustInclude": [
     "def normal_approx",
     "NormalDist"
    ]
   }
  }
 ],
 "pr-10": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Екі тізімнен E[X]",
   "prompt": "<p><code>expected(values, probs)</code> функциясын жазыңыз: мәндер мен ықтималдықтар екі бөлек тізімде; E[X] қайтарсын.</p><p>Мысалы, <code>expected([0, 4000], [0.95, 0.05])</code> → <code>200.0</code>.</p>",
   "starter": "def expected(values, probs):\n    pass\n",
   "solution": "def expected(values, probs):\n    return sum(x * p for x, p in zip(values, probs))\n",
   "hints": [
    "<code>zip(values, probs)</code> жұптарын көбейтіп қосыңыз."
   ],
   "check": {
    "tests": "assert abs(expected([0, 4000], [0.95, 0.05]) - 200) < 1e-9, \"expected([0, 4000], [0.95, 0.05]) = 200\"\nassert abs(expected([1, 2, 3, 4, 5, 6], [1 / 6] * 6) - 3.5) < 1e-9, \"Сүйек: 3.5\"\nassert expected([10], [1]) == 10, \"Бір мән: E[X] = 10\"",
    "mustInclude": [
     "def expected"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Таралу дұрыс па",
   "prompt": "<p><code>is_valid(dist)</code> функциясын жазыңыз: <code>dist</code> — <code>{мән: ықтималдық}</code>. Барлық ықтималдық 0 мен 1 аралығында және қосындысы 1-ге тең болса (айырма 1e-9-дан кіші), <code>True</code> қайтарсын.</p><p>Мысалы, <code>is_valid({0: 0.95, 4000: 0.05})</code> → <code>True</code>, <code>is_valid({0: 0.9, 1: 0.2})</code> → <code>False</code>.</p>",
   "starter": "def is_valid(dist):\n    pass\n",
   "solution": "def is_valid(dist):\n    probs = dist.values()\n    return all(0 <= p <= 1 for p in probs) and abs(sum(probs) - 1) < 1e-9\n",
   "hints": [
    "<code>all(0 &lt;= p &lt;= 1 for p in dist.values())</code>",
    "Қосындыны <code>abs(sum(...) - 1) &lt; 1e-9</code> арқылы тексеріңіз."
   ],
   "check": {
    "tests": "assert is_valid({0: 0.95, 4000: 0.05}) is True, \"{0: 0.95, 4000: 0.05} — дұрыс таралу\"\nassert is_valid({0: 0.9, 1: 0.2}) is False, \"Қосынды 1.1: дұрыс емес\"\nassert is_valid({0: 1.5, 1: -0.5}) is False, \"Теріс ықтималдық болмайды\"\nassert is_valid({1: 0.1, 2: 0.2, 3: 0.7}) is True, \"0.1 + 0.2 + 0.7 = 1 (ондық қатеге назар аударыңыз)\"",
    "mustInclude": [
     "def is_valid"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Стандартты ауытқу",
   "prompt": "<p><code>sd(dist)</code> функциясын жазыңыз: <code>{мән: ықтималдық}</code> таралуының стандартты ауытқуын (√Var) қайтарсын.</p><p>Мысалы, <code>sd({0: 0.95, 4000: 0.05})</code> ≈ <code>871.8</code>.</p>",
   "starter": "def sd(dist):\n    pass\n",
   "solution": "def sd(dist):\n    m = sum(x * p for x, p in dist.items())\n    var = sum((x - m) ** 2 * p for x, p in dist.items())\n    return var ** 0.5\n",
   "hints": [
    "Алдымен E[X], сосын Var(X), соңында <code>** 0.5</code>."
   ],
   "check": {
    "tests": "assert abs(sd({0: 0.95, 4000: 0.05}) - 760000 ** 0.5) < 1e-6, \"sd({0: 0.95, 4000: 0.05}) = √760 000 ≈ 871.8\"\nassert abs(sd({5: 1.0})) < 1e-12, \"Тұрақты шаманың SD-і 0\"\nassert abs(sd({-1: 0.5, 1: 0.5}) - 1) < 1e-12, \"sd({-1: 0.5, 1: 0.5}) = 1\"",
    "mustInclude": [
     "def sd"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Таза пайда таралуы",
   "prompt": "<p><code>net_dist(price, prizes)</code> функциясын жазыңыз: лотерея билеті <code>price</code> теңге, <code>prizes</code> — <code>{ұтыс: ықтималдық}</code>, қалған ықтималдықта ұтыс 0. Таза пайданың (ұтыс − баға) таралуын <code>{таза пайда: ықтималдық}</code> сөздігі ретінде қайтарсын.</p><p>Мысалы, <code>net_dist(500, {100000: 0.001, 5000: 0.01})</code> → <code>{99500: 0.001, 4500: 0.01, -500: 0.989}</code>.</p>",
   "starter": "def net_dist(price, prizes):\n    pass\n",
   "solution": "def net_dist(price, prizes):\n    out = {w - price: p for w, p in prizes.items()}\n    out[-price] = 1 - sum(prizes.values())\n    return out\n",
   "hints": [
    "Әр ұтыстан бағаны шегеріңіз.",
    "Ұтыссыз жағдай: таза пайда <code>-price</code>, ықтималдығы <code>1 - sum(prizes.values())</code>."
   ],
   "check": {
    "tests": "_d = net_dist(500, {100000: 0.001, 5000: 0.01})\nassert set(_d) == {99500, 4500, -500}, f\"Мәндер {{99500, 4500, -500}} болуы керек, сізде {set(_d)}\"\nassert abs(_d[-500] - 0.989) < 1e-9, \"Ұтыссыз жағдай: −500 ₸, ықтималдығы 0.989\"\nassert abs(sum(_x * _p for _x, _p in _d.items()) + 350) < 1e-6, \"Күтілетін таза пайда −350 ₸ болуы керек\"",
    "mustInclude": [
     "def net_dist"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қай нұсқа жақсы",
   "prompt": "<p><code>choose(d1, d2)</code> функциясын жазыңыз: E[X]-і үлкен таралудың нөмірін (<code>1</code> не <code>2</code>) қайтарсын. E[X] тең болса (айырма 1e-9-дан кіші), дисперсиясы кіші (тәуекелі аз) нұсқаны таңдаңыз.</p><p>Мысалы, <code>choose({100: 1.0}, {0: 0.5, 200: 0.5})</code> → <code>1</code>.</p>",
   "starter": "def choose(d1, d2):\n    pass\n",
   "solution": "def expected_value(dist):\n    return sum(x * p for x, p in dist.items())\n\ndef variance(dist):\n    m = expected_value(dist)\n    return sum((x - m) ** 2 * p for x, p in dist.items())\n\ndef choose(d1, d2):\n    e1, e2 = expected_value(d1), expected_value(d2)\n    if abs(e1 - e2) < 1e-9:\n        return 1 if variance(d1) <= variance(d2) else 2\n    return 1 if e1 > e2 else 2\n",
   "hints": [
    "Сабақтағы <code>expected_value</code> мен <code>variance</code> функцияларын қолданыңыз.",
    "Алдымен E[X]-тердің теңдігін тексеріңіз."
   ],
   "check": {
    "tests": "assert choose({100: 1.0}, {0: 0.5, 200: 0.5}) == 1, \"E[X] тең (100), бірінші тұрақтырақ: 1\"\nassert choose({0: 0.5, 200: 0.5}, {100: 1.0}) == 2, \"E[X] тең, екіншісі тұрақтырақ: 2\"\nassert choose({0: 0.95, 4000: 0.05}, {0: 0.93, 3000: 0.07}) == 2, \"210 > 200: 2\"\nassert choose({0: 0.9, 1000: 0.1}, {50: 1.0}) == 1, \"100 > 50: 1\"",
    "mustInclude": [
     "def choose"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Сызықтық түрлендіру",
   "prompt": "<p><code>transform(dist, a, b)</code> функциясын жазыңыз: X-тің таралуынан Y = a × X + b таралуын (<code>{мән: ықтималдық}</code>) қайтарсын.</p><p>Мысалы, бағасы 1 000 ₸ тауардан сатулар саны X болса, табыс Y = 1000 × X: <code>transform({0: 0.5, 1: 0.5}, 1000, 0)</code> → <code>{0: 0.5, 1000: 0.5}</code>. Тексерісте E[Y] = a × E[X] + b және Var(Y) = a² × Var(X) екенін көресіз.</p>",
   "starter": "def transform(dist, a, b):\n    pass\n",
   "solution": "def transform(dist, a, b):\n    return {a * x + b: p for x, p in dist.items()}\n",
   "hints": [
    "Әр мәнді <code>a * x + b</code>-ға ауыстырыңыз, ықтималдық өзгермейді."
   ],
   "check": {
    "tests": "assert transform({0: 0.5, 1: 0.5}, 1000, 0) == {0: 0.5, 1000: 0.5}, \"transform({0: 0.5, 1: 0.5}, 1000, 0) = {0: 0.5, 1000: 0.5}\"\ndef _ev(d): return sum(x * p for x, p in d.items())\ndef _var(d):\n    m = _ev(d)\n    return sum((x - m) ** 2 * p for x, p in d.items())\n_d = {1: 0.2, 2: 0.5, 4: 0.3}\n_y = transform(_d, 3, -2)\nassert abs(_ev(_y) - (3 * _ev(_d) - 2)) < 1e-9, \"E[Y] = a × E[X] + b болуы керек\"\nassert abs(_var(_y) - 9 * _var(_d)) < 1e-9, \"Var(Y) = a² × Var(X): b дисперсияны өзгертпейді\"",
    "mustInclude": [
     "def transform"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Binomial E мен Var",
   "prompt": "<p><code>binom_dict(n, p)</code> функциясын жазыңыз: Binomial(n, p) таралуын <code>{k: P(X = k)}</code> сөздігі ретінде қайтарсын. Сосын <code>expected_value</code> және <code>variance</code> функцияларын жазып, олар n × p және n × p × (1 − p) беретінін тексеріңіз.</p>",
   "starter": "import math\n\ndef binom_dict(n, p):\n    pass\n\ndef expected_value(dist):\n    pass\n\ndef variance(dist):\n    pass\n",
   "solution": "import math\n\ndef binom_dict(n, p):\n    return {k: math.comb(n, k) * p ** k * (1 - p) ** (n - k) for k in range(n + 1)}\n\ndef expected_value(dist):\n    return sum(x * p for x, p in dist.items())\n\ndef variance(dist):\n    m = expected_value(dist)\n    return sum((x - m) ** 2 * p for x, p in dist.items())\n",
   "hints": [
    "<code>{k: math.comb(n, k) * ... for k in range(n + 1)}</code>",
    "E мен Var — сабақтағы функциялар."
   ],
   "check": {
    "tests": "_d = binom_dict(20, 0.1)\nassert len(_d) == 21 and abs(sum(_d.values()) - 1) < 1e-9, \"binom_dict(20, 0.1): 21 мән, қосындысы 1\"\nassert abs(expected_value(_d) - 2) < 1e-9, \"E[X] = n × p = 2\"\nassert abs(variance(_d) - 1.8) < 1e-9, \"Var(X) = n × p × (1 − p) = 1.8\"\n_d2 = binom_dict(50, 0.3)\nassert abs(expected_value(_d2) - 15) < 1e-9 and abs(variance(_d2) - 10.5) < 1e-9, \"n = 50, p = 0.3: E = 15, Var = 10.5\"",
    "mustInclude": [
     "def binom_dict",
     "def expected_value",
     "def variance"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Курьердің күтілетін табысы",
   "prompt": "<p>Курьер әр тапсырысқа <code>per_order</code> ₸ алады, ал күніне кемінде <code>threshold</code> тапсырыс жеткізсе, тағы <code>bonus</code> ₸ бонус алады. Күндік тапсырыс саны — Poisson(λ). <code>expected_pay(lam, per_order, bonus, threshold)</code> функциясын жазыңыз: күтілетін күндік табысты қайтарсын.</p><p>Кеңес: E[табыс] = per_order × λ + bonus × P(X ≥ threshold). Мысалы, <code>expected_pay(8, 500, 3000, 10)</code> ≈ <code>4850.1</code> ₸.</p>",
   "starter": "import math\n\ndef expected_pay(lam, per_order, bonus, threshold):\n    pass\n",
   "solution": "import math\n\ndef poisson_pmf(k, lam):\n    return lam ** k * math.exp(-lam) / math.factorial(k)\n\ndef expected_pay(lam, per_order, bonus, threshold):\n    p_bonus = 1 - sum(poisson_pmf(k, lam) for k in range(threshold))\n    return per_order * lam + bonus * p_bonus\n",
   "hints": [
    "Poisson-ның орташасы λ: тапсырыстан табыс per_order × λ.",
    "P(X ≥ t) = 1 − P(X ≤ t − 1), яғни <code>range(threshold)</code>."
   ],
   "check": {
    "tests": "assert abs(expected_pay(8, 500, 3000, 10) - 4850.1272) < 0.01, \"expected_pay(8, 500, 3000, 10) ≈ 4850.1: P(X ≥ 10) = 1 − P(X ≤ 9)\"\nassert abs(expected_pay(5, 400, 0, 3) - 2000) < 1e-9, \"Бонус 0 болса, тек 400 × 5 = 2000\"\nassert abs(expected_pay(4, 0, 1000, 0) - 1000) < 1e-9, \"threshold = 0 болса, бонус әрқашан төленеді\"",
    "mustInclude": [
     "def expected_pay"
    ]
   }
  }
 ]
});
