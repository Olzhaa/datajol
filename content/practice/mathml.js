// Practice tasks after the lessons of m4-3. Each lesson's list opens one task at a time.
DJ.addPractice('m4-3', {
 "mm-1": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Векторларды азайту",
   "prompt": "<p><code>sub(u, v)</code> функциясын жазыңыз: u − v векторын (элемент бойынша азайту) жаңа тізім ретінде қайтарсын.</p><p>Мысалы, <code>sub([5, 7, 9], [1, 2, 3])</code> → <code>[4, 5, 6]</code>.</p>",
   "starter": "def sub(u, v):\n    pass\n",
   "solution": "def sub(u, v):\n    return [a - b for a, b in zip(u, v)]\n",
   "hints": [
    "<code>zip(u, v)</code> арқылы жұп-жұп алыңыз."
   ],
   "check": {
    "tests": "assert sub([5, 7, 9], [1, 2, 3]) == [4, 5, 6], \"sub([5, 7, 9], [1, 2, 3]) = [4, 5, 6]\"\nassert sub([1, 1], [3, -2]) == [-2, 3], \"sub([1, 1], [3, -2]) = [-2, 3]\"\nassert sub([0.5], [0.5]) == [0.0], \"Өзінен азайтса, нөл вектор\"",
    "mustInclude": [
     "def sub"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Нөл вектор",
   "prompt": "<p>Екі функция жазыңыз: <code>zeros(n)</code> — ұзындығы <code>n</code> нөл вектор; <code>is_zero(v)</code> — барлық элементі 0 болса, <code>True</code>.</p><p>Мысалы, <code>zeros(3)</code> → <code>[0, 0, 0]</code>, <code>is_zero([0, 0.0])</code> → <code>True</code>.</p>",
   "starter": "def zeros(n):\n    pass\n\ndef is_zero(v):\n    pass\n",
   "solution": "def zeros(n):\n    return [0] * n\n\ndef is_zero(v):\n    return all(a == 0 for a in v)\n",
   "hints": [
    "<code>[0] * n</code>",
    "<code>all(a == 0 for a in v)</code>"
   ],
   "check": {
    "tests": "assert zeros(3) == [0, 0, 0], \"zeros(3) = [0, 0, 0]\"\nassert zeros(0) == [], \"zeros(0) — бос тізім\"\nassert is_zero([0, 0.0]) is True, \"[0, 0.0] — нөл вектор\"\nassert is_zero([0, 1]) is False, \"[0, 1] нөл вектор емес\"",
    "mustInclude": [
     "def zeros",
     "def is_zero"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Сызықтық комбинация",
   "prompt": "<p><code>lincomb(a, u, b, v)</code> функциясын жазыңыз: a·u + b·v векторын қайтарсын.</p><p>Мысалы, екі дүкеннің апталық сатылымы u мен v; бірінші дүкен 2 есе үлкейсе: <code>lincomb(2, [1, 2], 1, [10, 20])</code> → <code>[12, 24]</code>.</p>",
   "starter": "def lincomb(a, u, b, v):\n    pass\n",
   "solution": "def lincomb(a, u, b, v):\n    return [a * x + b * y for x, y in zip(u, v)]\n",
   "hints": [
    "Әр позицияда <code>a * x + b * y</code>."
   ],
   "check": {
    "tests": "assert lincomb(2, [1, 2], 1, [10, 20]) == [12, 24], \"lincomb(2, [1, 2], 1, [10, 20]) = [12, 24]\"\nassert lincomb(1, [3, 4], -1, [3, 4]) == [0, 0], \"u − u = нөл вектор\"\nassert lincomb(0.5, [2, 4, 6], 0, [9, 9, 9]) == [1, 2, 3], \"lincomb(0.5, [2, 4, 6], 0, ...) = [1, 2, 3]\"",
    "mustInclude": [
     "def lincomb"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Орташа вектор",
   "prompt": "<p><code>mean_vec(vs)</code> функциясын жазыңыз: <code>vs</code> — бірдей ұзындықтағы векторлар тізімі. Элемент бойынша орташа векторды қайтарсын.</p><p>Мысалы, үш оқушының (математика, физика) бағалары: <code>mean_vec([[4, 5], [5, 3], [3, 4]])</code> → <code>[4.0, 4.0]</code>.</p>",
   "starter": "def mean_vec(vs):\n    pass\n",
   "solution": "def mean_vec(vs):\n    n = len(vs)\n    return [sum(v[i] for v in vs) / n for i in range(len(vs[0]))]\n",
   "hints": [
    "Әр позиция i бойынша барлық векторлардың i-ші элементтерін қосыңыз.",
    "Сосын вектор санына бөліңіз."
   ],
   "check": {
    "tests": "assert mean_vec([[4, 5], [5, 3], [3, 4]]) == [4.0, 4.0], \"mean_vec([[4, 5], [5, 3], [3, 4]]) = [4.0, 4.0]\"\nassert mean_vec([[1, 2, 3]]) == [1.0, 2.0, 3.0], \"Бір вектордың орташасы — өзі\"\nassert mean_vec([[0, 10], [1, 20]]) == [0.5, 15.0], \"mean_vec([[0, 10], [1, 20]]) = [0.5, 15.0]\"",
    "mustInclude": [
     "def mean_vec"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бірлік вектор функциясы",
   "prompt": "<p><code>normalize(v)</code> функциясын жазыңыз: бағыты сондай, ұзындығы 1 векторды қайтарсын. Нөл векторды бөлуге болмайды, сондықтан ол өзгеріссіз (көшірмесі) қайтарылсын.</p><p>Мысалы, <code>normalize([3, 4])</code> → <code>[0.6, 0.8]</code>.</p>",
   "starter": "def normalize(v):\n    pass\n",
   "solution": "def normalize(v):\n    n = sum(a * a for a in v) ** 0.5\n    if n == 0:\n        return list(v)\n    return [a / n for a in v]\n",
   "hints": [
    "Алдымен ұзындық: <code>sum(a * a for a in v) ** 0.5</code>.",
    "Ұзындық 0 болса, <code>list(v)</code> қайтарыңыз."
   ],
   "check": {
    "tests": "_u = normalize([3, 4])\nassert abs(_u[0] - 0.6) < 1e-12 and abs(_u[1] - 0.8) < 1e-12, \"normalize([3, 4]) = [0.6, 0.8]\"\n_w = normalize([1, 2, 2])\nassert abs(sum(_a * _a for _a in _w) - 1) < 1e-12, \"Бірлік вектордың ұзындығы 1\"\nassert normalize([0, 0]) == [0, 0], \"Нөл вектор өзгермейді (нөлге бөлмеңіз)\"",
    "mustInclude": [
     "def normalize"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең ұзын вектор",
   "prompt": "<p><code>longest(vs)</code> функциясын жазыңыз: ұзындығы (норма) ең үлкен вектордың <b>индексін</b> қайтарсын.</p><p>Мысалы, <code>longest([[1, 1], [3, 4], [0, 2]])</code> → <code>1</code>.</p>",
   "starter": "def longest(vs):\n    pass\n",
   "solution": "def norm(v):\n    return sum(a * a for a in v) ** 0.5\n\ndef longest(vs):\n    return max(range(len(vs)), key=lambda i: norm(vs[i]))\n",
   "hints": [
    "Алдымен <code>norm</code> функциясын жазыңыз.",
    "<code>max(range(len(vs)), key=lambda i: norm(vs[i]))</code>"
   ],
   "check": {
    "tests": "assert longest([[1, 1], [3, 4], [0, 2]]) == 1, \"[3, 4]-тің ұзындығы 5, ең үлкен: индекс 1\"\nassert longest([[-10, 0], [6, 6]]) == 0, \"Теріс элементтер де ұзындыққа қосылады: [-10, 0] (10) > [6, 6] (≈ 8.49)\"\nassert longest([[7]]) == 0, \"Бір вектор: индекс 0\"",
    "mustInclude": [
     "def longest"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ортадан шашырау",
   "prompt": "<p><code>spread(vs)</code> функциясын жазыңыз: әр вектордан орташа векторды азайтып, сол айырма векторларының ұзындықтарының орташасын қайтарсын. Бұл нүктелердің ортадан қаншалықты шашыраңқы екенін көрсетеді.</p><p>Мысалы, <code>spread([[0, 0], [6, 8]])</code> → <code>5.0</code> (орта [3, 4], екі нүкте де 5 қашықтықта).</p>",
   "starter": "def spread(vs):\n    pass\n",
   "solution": "def mean_vec(vs):\n    n = len(vs)\n    return [sum(v[i] for v in vs) / n for i in range(len(vs[0]))]\n\ndef norm(v):\n    return sum(a * a for a in v) ** 0.5\n\ndef spread(vs):\n    m = mean_vec(vs)\n    return sum(norm([a - b for a, b in zip(v, m)]) for v in vs) / len(vs)\n",
   "hints": [
    "Үш қадам: орташа вектор, әр вектордан айырма, айырманың ұзындығы.",
    "Соңында ұзындықтардың орташасы."
   ],
   "check": {
    "tests": "assert abs(spread([[0, 0], [6, 8]]) - 5) < 1e-12, \"spread([[0, 0], [6, 8]]) = 5\"\nassert abs(spread([[2, 2], [2, 2], [2, 2]])) < 1e-12, \"Барлық нүкте бірдей: шашырау 0\"\nassert abs(spread([[1, 0], [-1, 0], [0, 1], [0, -1]]) - 1) < 1e-12, \"Төрт нүкте ортадан 1 қашықтықта: 1\"",
    "mustInclude": [
     "def spread"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Маршрут: орын ауыстыру",
   "prompt": "<p>Курьер қала картасында жылжиды, әр қадам — орын ауыстыру векторы (км). <code>route(steps)</code> функциясын жазыңыз: <code>(end, length)</code> жұбын қайтарсын: <code>end</code> — барлық қадамның қосындысы (соңғы нүкте, бастау [0, 0]), <code>length</code> — жүрілген жол (әр қадам ұзындығының қосындысы).</p><p>Мысалы, <code>route([[3, 4], [-3, -4]])</code> → <code>([0, 0], 10.0)</code>.</p>",
   "starter": "def route(steps):\n    pass\n",
   "solution": "def add(u, v):\n    return [a + b for a, b in zip(u, v)]\n\ndef norm(v):\n    return sum(a * a for a in v) ** 0.5\n\ndef route(steps):\n    end = [0, 0]\n    length = 0\n    for s in steps:\n        end = add(end, s)\n        length += norm(s)\n    return end, length\n",
   "hints": [
    "<code>add</code> және <code>norm</code> функцияларын қолданыңыз.",
    "Соңғы нүкте мен жол ұзындығы әртүрлі: кері қайтса, end = [0, 0], бірақ жол ұзын."
   ],
   "check": {
    "tests": "_e, _l = route([[3, 4], [-3, -4]])\nassert _e == [0, 0] and abs(_l - 10) < 1e-12, \"Барып қайтты: end = [0, 0], length = 10\"\n_e2, _l2 = route([[1, 0], [0, 2], [2, 0]])\nassert _e2 == [3, 2] and abs(_l2 - 5) < 1e-12, \"end = [3, 2], length = 1 + 2 + 2 = 5\"\nassert route([]) == ([0, 0], 0), \"Қадам жоқ: ([0, 0], 0)\"",
    "mustInclude": [
     "def route"
    ]
   }
  }
 ],
 "mm-2": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Тапсырыс сомасы",
   "prompt": "<p>Себетте тауарлар саны <code>qty</code> мен бағалары <code>price</code> (₸) векторлары бар. <code>total(qty, price)</code> функциясын жазыңыз: dot product арқылы жалпы соманы қайтарсын.</p><p>Мысалы, <code>total([2, 1, 3], [500, 1200, 300])</code> → <code>3100</code>.</p>",
   "starter": "def total(qty, price):\n    pass\n",
   "solution": "def total(qty, price):\n    return sum(q * p for q, p in zip(qty, price))\n",
   "hints": [
    "Dot product: <code>sum(a * b for a, b in zip(u, v))</code>."
   ],
   "check": {
    "tests": "assert total([2, 1, 3], [500, 1200, 300]) == 3100, \"2·500 + 1·1200 + 3·300 = 3100\"\nassert total([0, 0], [100, 200]) == 0, \"Бос себет: 0\"",
    "mustInclude": [
     "def total"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Перпендикуляр ма",
   "prompt": "<p><code>orthogonal(u, v)</code> функциясын жазыңыз: dot product 0 болса (модулі 1e-9-дан кіші), <code>True</code> қайтарсын.</p><p>Мысалы, <code>orthogonal([1, 2], [2, -1])</code> → <code>True</code>.</p>",
   "starter": "def orthogonal(u, v):\n    pass\n",
   "solution": "def orthogonal(u, v):\n    return abs(sum(a * b for a, b in zip(u, v))) < 1e-9\n",
   "hints": [
    "Dot product-ты есептеп, <code>abs(...) &lt; 1e-9</code> тексеріңіз."
   ],
   "check": {
    "tests": "assert orthogonal([1, 2], [2, -1]) is True, \"1·2 + 2·(−1) = 0: перпендикуляр\"\nassert orthogonal([1, 0, 0], [0, 0, 5]) is True, \"Осьтер перпендикуляр\"\nassert orthogonal([1, 1], [1, 0]) is False, \"dot = 1: перпендикуляр емес\"\nassert orthogonal([0.1, 0.2], [0.2, -0.1]) is True, \"Ондық бөлшекте де жұмыс істеуі керек\"",
    "mustInclude": [
     "def orthogonal"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ұзындық dot арқылы",
   "prompt": "<p><code>dot(u, v)</code> функциясын жазып, сосын ұзындықты тек <code>dot</code> арқылы есептейтін <code>norm(v)</code> функциясын жазыңыз: ‖v‖ = √(v · v).</p><p>Мысалы, <code>norm([2, 3, 6])</code> → <code>7.0</code>.</p>",
   "starter": "def dot(u, v):\n    pass\n\ndef norm(v):\n    pass\n",
   "solution": "def dot(u, v):\n    return sum(a * b for a, b in zip(u, v))\n\ndef norm(v):\n    return dot(v, v) ** 0.5\n",
   "hints": [
    "<code>norm</code> ішінде <code>dot(v, v) ** 0.5</code>."
   ],
   "check": {
    "tests": "assert dot([1, 2, 3], [4, 5, 6]) == 32, \"dot([1, 2, 3], [4, 5, 6]) = 32\"\nassert abs(norm([2, 3, 6]) - 7) < 1e-12, \"norm([2, 3, 6]) = √49 = 7\"\nassert abs(norm([1, 1]) - 2 ** 0.5) < 1e-12, \"norm([1, 1]) = √2\"",
    "mustInclude": [
     "def dot",
     "def norm"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бұрыш градуспен",
   "prompt": "<p><code>angle_deg(u, v)</code> функциясын жазыңыз: екі вектор арасындағы бұрышты градуспен қайтарсын: <code>math.degrees(math.acos(cos))</code>. Ондық қатеге бола cos 1-ден сәл асып кетуі мүмкін, сондықтан оны [−1, 1] аралығына қиыңыз.</p><p>Мысалы, <code>angle_deg([1, 0], [0, 1])</code> → <code>90.0</code>.</p>",
   "starter": "import math\n\ndef angle_deg(u, v):\n    pass\n",
   "solution": "import math\n\ndef angle_deg(u, v):\n    d = sum(a * b for a, b in zip(u, v))\n    nu = sum(a * a for a in u) ** 0.5\n    nv = sum(b * b for b in v) ** 0.5\n    c = max(-1.0, min(1.0, d / (nu * nv)))\n    return math.degrees(math.acos(c))\n",
   "hints": [
    "Алдымен cosine similarity.",
    "Қию: <code>max(-1.0, min(1.0, c))</code>."
   ],
   "check": {
    "tests": "assert abs(angle_deg([1, 0], [0, 1]) - 90) < 1e-9, \"Перпендикуляр: 90°\"\nassert abs(angle_deg([1, 0], [1, 1]) - 45) < 1e-9, \"angle_deg([1, 0], [1, 1]) = 45°\"\nassert abs(angle_deg([1, 2], [-2, -4]) - 180) < 1e-4, \"Қарама-қарсы: 180°\"\nassert abs(angle_deg([3, 3, 3], [1, 1, 1])) < 1e-4, \"Бағыты бірдей: 0° (cos-ты қидыңыз ба?)\"",
    "mustInclude": [
     "def angle_deg"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең ұқсас k фильм",
   "prompt": "<p><code>top_k(items, q, k)</code> функциясын жазыңыз: <code>items</code> — <code>{фильм: жанрлар векторы}</code>, <code>q</code> — пайдаланушы векторы. Cosine similarity бойынша ең ұқсас <code>k</code> фильмнің атын (ұқсастығы кемуі бойынша) тізім етіп қайтарсын.</p>",
   "starter": "def top_k(items, q, k):\n    pass\n",
   "solution": "def cosine(u, v):\n    d = sum(a * b for a, b in zip(u, v))\n    return d / (sum(a * a for a in u) ** 0.5 * sum(b * b for b in v) ** 0.5)\n\ndef top_k(items, q, k):\n    return sorted(items, key=lambda name: cosine(items[name], q), reverse=True)[:k]\n",
   "hints": [
    "Алдымен <code>cosine</code> функциясы.",
    "<code>sorted(items, key=..., reverse=True)[:k]</code>"
   ],
   "check": {
    "tests": "_films = {\"Көшпенділер\": [5, 1, 0], \"Бауыржан Момышұлы\": [4, 0, 1], \"Махаббат\": [0, 5, 1], \"Күлкі\": [1, 1, 5]}\nassert top_k(_films, [3, 0, 0], 2) == [\"Көшпенділер\", \"Бауыржан Момышұлы\"], \"Тарихи жанрға ең ұқсас екі фильм\"\nassert top_k(_films, [0, 0, 1], 1) == [\"Күлкі\"], \"Комедия: Күлкі\"\nassert len(top_k(_films, [1, 1, 1], 4)) == 4, \"k = 4: барлық фильм\"",
    "mustInclude": [
     "def top_k"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Сөйлемдер ұқсастығы",
   "prompt": "<p>Мәтінді векторға айналдыру (bag of words). <code>text_cosine(s1, s2)</code> функциясын жазыңыз:</p><ol><li>екі сөйлемді <code>split()</code> арқылы сөздерге бөліңіз;</li><li>сөздік — екі сөйлемдегі барлық әртүрлі сөздер (<code>sorted(set(...))</code>);</li><li>әр сөйлем үшін вектор: әр сөздің сөйлемде неше рет кездесетіні (<code>count</code>);</li><li>екі вектордың cosine similarity-сін қайтарыңыз.</li></ol><p>Мысалы, <code>text_cosine(\"алма алма нан\", \"алма нан\")</code> ≈ <code>0.949</code>.</p>",
   "starter": "def text_cosine(s1, s2):\n    pass\n",
   "solution": "def cosine(u, v):\n    d = sum(a * b for a, b in zip(u, v))\n    return d / (sum(a * a for a in u) ** 0.5 * sum(b * b for b in v) ** 0.5)\n\ndef text_cosine(s1, s2):\n    w1, w2 = s1.split(), s2.split()\n    vocab = sorted(set(w1 + w2))\n    v1 = [w1.count(w) for w in vocab]\n    v2 = [w2.count(w) for w in vocab]\n    return cosine(v1, v2)\n",
   "hints": [
    "Сөздік: <code>sorted(set(w1 + w2))</code>.",
    "Вектор: <code>[w1.count(w) for w in vocab]</code>."
   ],
   "check": {
    "tests": "assert abs(text_cosine(\"алма алма нан\", \"алма нан\") - 3 / (5 ** 0.5 * 2 ** 0.5)) < 1e-9, \"[2, 1] мен [1, 1]: 3 / (√5 · √2) ≈ 0.949\"\nassert abs(text_cosine(\"шай ішу\", \"шай ішу\") - 1) < 1e-9, \"Бірдей сөйлем: 1\"\nassert abs(text_cosine(\"қызыл алма\", \"жасыл шөп\")) < 1e-9, \"Ортақ сөз жоқ: 0\"",
    "mustInclude": [
     "def text_cosine"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ұқсастық матрицасы",
   "prompt": "<p><code>sim_matrix(vs)</code> функциясын жазыңыз: n векторлар үшін n × n матрица (тізімдер тізімі) қайтарсын, мұнда [i][j] — i-ші мен j-ші векторлардың cosine similarity-сі.</p><p>Диагональ 1-ге тең, матрица симметриялы болады.</p>",
   "starter": "def sim_matrix(vs):\n    pass\n",
   "solution": "def cosine(u, v):\n    d = sum(a * b for a, b in zip(u, v))\n    return d / (sum(a * a for a in u) ** 0.5 * sum(b * b for b in v) ** 0.5)\n\ndef sim_matrix(vs):\n    return [[cosine(u, v) for v in vs] for u in vs]\n",
   "hints": [
    "Екі қабатты list comprehension: <code>[[cosine(u, v) for v in vs] for u in vs]</code>."
   ],
   "check": {
    "tests": "_m = sim_matrix([[1, 0], [0, 1], [1, 1]])\nassert len(_m) == 3 and all(len(_r) == 3 for _r in _m), \"3 × 3 матрица болуы керек\"\nassert all(abs(_m[_i][_i] - 1) < 1e-9 for _i in range(3)), \"Диагональ 1\"\nassert abs(_m[0][1]) < 1e-9, \"[1, 0] мен [0, 1]: 0\"\nassert abs(_m[0][2] - 2 ** -0.5) < 1e-9 and abs(_m[2][0] - _m[0][2]) < 1e-12, \"[1, 0] мен [1, 1]: ≈ 0.707, матрица симметриялы\"",
    "mustInclude": [
     "def sim_matrix"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Векторды проекциялау",
   "prompt": "<p><code>project(u, v)</code> функциясын жазыңыз: u векторының v бағытына проекциясын қайтарсын: (u · v / v · v) × v. Ол dot product пен скалярға көбейтуді біріктіреді.</p><p>Мысалы, <code>project([3, 4], [1, 0])</code> → <code>[3.0, 0.0]</code>.</p>",
   "starter": "def project(u, v):\n    pass\n",
   "solution": "def dot(u, v):\n    return sum(a * b for a, b in zip(u, v))\n\ndef scale(c, v):\n    return [c * a for a in v]\n\ndef project(u, v):\n    return scale(dot(u, v) / dot(v, v), v)\n",
   "hints": [
    "Коэффициент: <code>dot(u, v) / dot(v, v)</code>.",
    "Сосын v-ны осы санға көбейтіңіз (<code>scale</code>)."
   ],
   "check": {
    "tests": "assert project([3, 4], [1, 0]) == [3.0, 0.0], \"project([3, 4], [1, 0]) = [3.0, 0.0]\"\n_p = project([2, 3], [1, 1])\nassert abs(_p[0] - 2.5) < 1e-12 and abs(_p[1] - 2.5) < 1e-12, \"project([2, 3], [1, 1]) = [2.5, 2.5]\"\n_r = [_a - _b for _a, _b in zip([2, 3], _p)]\nassert abs(sum(_a * _b for _a, _b in zip(_r, [1, 1]))) < 1e-12, \"u − проекция векторы v-ға перпендикуляр болуы керек\"",
    "mustInclude": [
     "def project"
    ]
   }
  }
 ],
 "mm-3": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бастауға дейін",
   "prompt": "<p><code>dist_origin(v)</code> функциясын жазыңыз: нүктенің бастау нүктесіне [0, 0, ...] дейінгі Евклид қашықтығын қайтарсын.</p><p>Мысалы, <code>dist_origin([6, 8])</code> → <code>10.0</code>.</p>",
   "starter": "def dist_origin(v):\n    pass\n",
   "solution": "def dist_origin(v):\n    return sum(a * a for a in v) ** 0.5\n",
   "hints": [
    "Бұл вектордың ұзындығымен бірдей."
   ],
   "check": {
    "tests": "assert abs(dist_origin([6, 8]) - 10) < 1e-12, \"dist_origin([6, 8]) = 10\"\nassert abs(dist_origin([-3, 0, 4]) - 5) < 1e-12, \"dist_origin([-3, 0, 4]) = 5\"\nassert dist_origin([0, 0]) == 0, \"Бастаудың өзі: 0\"",
    "mustInclude": [
     "def dist_origin"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Чебышев қашықтығы",
   "prompt": "<p>Тағы бір қашықтық: <b>Чебышев</b> (Chebyshev) — координаталар айырмасының ең үлкен модулі: max |uᵢ − vᵢ|. Шахматтағы король неше жүріспен жететінін көрсетеді. <code>chebyshev(u, v)</code> функциясын жазыңыз.</p><p>Мысалы, <code>chebyshev([1, 5], [4, 1])</code> → <code>4</code>.</p>",
   "starter": "def chebyshev(u, v):\n    pass\n",
   "solution": "def chebyshev(u, v):\n    return max(abs(a - b) for a, b in zip(u, v))\n",
   "hints": [
    "Манхэттендегідей <code>abs(a - b)</code>, бірақ қосынды орнына <code>max</code>."
   ],
   "check": {
    "tests": "assert chebyshev([1, 5], [4, 1]) == 4, \"|1 − 4| = 3, |5 − 1| = 4: max = 4\"\nassert chebyshev([0, 0, 0], [2, -7, 1]) == 7, \"chebyshev([0, 0, 0], [2, -7, 1]) = 7\"\nassert chebyshev([3, 3], [3, 3]) == 0, \"Бір нүкте: 0\"",
    "mustInclude": [
     "def chebyshev"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қашықтықтар тізімі",
   "prompt": "<p><code>dists(points, q)</code> функциясын жазыңыз: әр нүктеден <code>q</code>-ға дейінгі Евклид қашықтықтарының тізімін қайтарсын.</p><p>Мысалы, <code>dists([[0, 0], [3, 4]], [0, 0])</code> → <code>[0.0, 5.0]</code>.</p>",
   "starter": "def dists(points, q):\n    pass\n",
   "solution": "def euclidean(u, v):\n    return sum((a - b) ** 2 for a, b in zip(u, v)) ** 0.5\n\ndef dists(points, q):\n    return [euclidean(p, q) for p in points]\n",
   "hints": [
    "Алдымен <code>euclidean</code>, сосын <code>[euclidean(p, q) for p in points]</code>."
   ],
   "check": {
    "tests": "assert dists([[0, 0], [3, 4]], [0, 0]) == [0.0, 5.0], \"dists([[0, 0], [3, 4]], [0, 0]) = [0.0, 5.0]\"\n_d = dists([[1, 1], [4, 5], [1, 2]], [1, 1])\nassert len(_d) == 3 and abs(_d[1] - 5) < 1e-12 and abs(_d[2] - 1) < 1e-12, \"[0, 5, 1] болуы керек\"\nassert dists([], [1, 2]) == [], \"Нүкте жоқ: бос тізім\"",
    "mustInclude": [
     "def dists"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "k ең жақын көрші",
   "prompt": "<p><code>k_nearest(points, q, k)</code> функциясын жазыңыз: <code>q</code>-ға Евклид бойынша ең жақын <code>k</code> нүктенің <b>индекстерін</b> (жақыннан алысқа қарай) тізім етіп қайтарсын.</p><p>Мысалы, <code>k_nearest([[0, 0], [5, 5], [1, 1], [9, 9]], [2, 2], 2)</code> → <code>[2, 0]</code>.</p>",
   "starter": "def k_nearest(points, q, k):\n    pass\n",
   "solution": "def euclidean(u, v):\n    return sum((a - b) ** 2 for a, b in zip(u, v)) ** 0.5\n\ndef k_nearest(points, q, k):\n    return sorted(range(len(points)), key=lambda i: euclidean(points[i], q))[:k]\n",
   "hints": [
    "Индекстерді қашықтық бойынша сұрыптаңыз: <code>sorted(range(len(points)), key=...)</code>.",
    "Алғашқы k-сын алыңыз: <code>[:k]</code>."
   ],
   "check": {
    "tests": "assert k_nearest([[0, 0], [5, 5], [1, 1], [9, 9]], [2, 2], 2) == [2, 0], \"[2, 2]-ге [1, 1] (2), сосын [0, 0] (0) жақын\"\nassert k_nearest([[0, 0], [5, 5], [1, 1], [9, 9]], [8, 8], 1) == [3], \"[8, 8]-ге ең жақыны [9, 9]\"\nassert k_nearest([[1, 0], [0, 3]], [0, 0], 5) == [0, 1], \"k нүкте санынан көп болса, бәрі қайтарылады\"",
    "mustInclude": [
     "def k_nearest"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең жақын қала",
   "prompt": "<p><code>closest_city(cities, q)</code> функциясын жазыңыз: <code>cities</code> — <code>{қала: [x, y]}</code> (картадағы шартты координаталар, км), <code>q</code> — нүкте. Евклид бойынша ең жақын қаланың атын қайтарсын.</p>",
   "starter": "def closest_city(cities, q):\n    pass\n",
   "solution": "def euclidean(u, v):\n    return sum((a - b) ** 2 for a, b in zip(u, v)) ** 0.5\n\ndef closest_city(cities, q):\n    return min(cities, key=lambda c: euclidean(cities[c], q))\n",
   "hints": [
    "<code>min(cities, key=lambda c: euclidean(cities[c], q))</code>"
   ],
   "check": {
    "tests": "_c = {\"Алматы\": [1130, 230], \"Астана\": [870, 860], \"Шымкент\": [570, 210], \"Қарағанды\": [930, 720]}\nassert closest_city(_c, [900, 800]) == \"Астана\", \"[900, 800]-ге Астана жақын\"\nassert closest_city(_c, [600, 250]) == \"Шымкент\", \"[600, 250]-ге Шымкент жақын\"\nassert closest_city(_c, [1000, 300]) == \"Алматы\", \"[1000, 300]-ге Алматы жақын\"",
    "mustInclude": [
     "def closest_city"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең алыс жұп",
   "prompt": "<p><code>farthest_pair(points)</code> функциясын жазыңыз: бір-бірінен ең алыс екі нүктенің индекстерін <code>(i, j)</code>, i &lt; j, қайтарсын (Евклид).</p><p>Мысалы, <code>farthest_pair([[0, 0], [1, 1], [5, 5]])</code> → <code>(0, 2)</code>.</p>",
   "starter": "def farthest_pair(points):\n    pass\n",
   "solution": "def euclidean(u, v):\n    return sum((a - b) ** 2 for a, b in zip(u, v)) ** 0.5\n\ndef farthest_pair(points):\n    best = None\n    best_d = -1\n    for i in range(len(points)):\n        for j in range(i + 1, len(points)):\n            d = euclidean(points[i], points[j])\n            if d > best_d:\n                best, best_d = (i, j), d\n    return best\n",
   "hints": [
    "Екі қабатты цикл: <code>for i ...: for j in range(i + 1, ...)</code>.",
    "Ең үлкен қашықтықты және оның жұбын сақтап отырыңыз."
   ],
   "check": {
    "tests": "assert farthest_pair([[0, 0], [1, 1], [5, 5]]) == (0, 2), \"farthest_pair([[0, 0], [1, 1], [5, 5]]) = (0, 2)\"\nassert farthest_pair([[2, 2], [-3, 0], [4, 1], [0, 9]]) == (1, 3), \"[-3, 0] мен [0, 9] ең алыс: (1, 3)\"\nassert farthest_pair([[1, 1], [2, 2]]) == (0, 1), \"Екі нүкте: (0, 1)\"",
    "mustInclude": [
     "def farthest_pair"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Масштабтау әсері",
   "prompt": "<p>Пәтерлерде ауданы (м²) бөлме санынан әлдеқайда үлкен, сондықтан қашықтықты аудан басқарады. Екі функция жазыңыз:</p><ul><li><code>minmax(points)</code> — әр бағанды (x − min) / (max − min) арқылы 0..1-ге келтірілген нүктелер тізімін және <code>(mins, maxs)</code> жұбын қайтарсын: <code>(scaled, (mins, maxs))</code>;</li><li><code>nearest_scaled(points, q)</code> — нүктелерді масштабтап, q-ды да сол min/max-пен масштабтап, ең жақын нүктенің индексін қайтарсын.</li></ul>",
   "starter": "def minmax(points):\n    pass\n\ndef nearest_scaled(points, q):\n    pass\n",
   "solution": "def euclidean(u, v):\n    return sum((a - b) ** 2 for a, b in zip(u, v)) ** 0.5\n\ndef minmax(points):\n    cols = list(zip(*points))\n    mins = [min(c) for c in cols]\n    maxs = [max(c) for c in cols]\n    scaled = [[(x - lo) / (hi - lo) for x, lo, hi in zip(p, mins, maxs)] for p in points]\n    return scaled, (mins, maxs)\n\ndef nearest_scaled(points, q):\n    scaled, (mins, maxs) = minmax(points)\n    qs = [(x - lo) / (hi - lo) for x, lo, hi in zip(q, mins, maxs)]\n    return min(range(len(points)), key=lambda i: euclidean(scaled[i], qs))\n",
   "hints": [
    "Бағандар: <code>zip(*points)</code>, әрқайсысының <code>min</code> мен <code>max</code>-ы.",
    "q-ды нүктелердің min/max-ымен масштабтаңыз, өзінікімен емес."
   ],
   "check": {
    "tests": "_s, (_lo, _hi) = minmax([[40, 1], [60, 2], [100, 4]])\nassert _lo == [40, 1] and _hi == [100, 4], \"mins = [40, 1], maxs = [100, 4]\"\nassert _s[0] == [0.0, 0.0] and _s[2] == [1.0, 1.0], \"Ең кіші нүкте [0, 0], ең үлкені [1, 1] болуы керек\"\n_flats = [[50, 1], [58, 4], [90, 3], [40, 2]]\nassert nearest_scaled(_flats, [52, 4]) == 1, \"Масштабсыз [52, 4]-ке [50, 1] жақын көрінеді, бірақ масштабтаған соң 4 бөлмелі [58, 4] (индекс 1) жақын\"",
    "mustInclude": [
     "def minmax",
     "def nearest_scaled"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Орталыққа тағайындау",
   "prompt": "<p>k-means алгоритмінің бір қадамы. Екі функция жазыңыз:</p><ul><li><code>assign(points, centers)</code> — әр нүкте үшін ең жақын орталықтың индексі (тізім);</li><li><code>new_centers(points, labels, k)</code> — әр топтың (0..k−1) нүктелерінің орташа векторы (тізімдер тізімі).</li></ul><p>Мысалы, <code>assign([[0, 0], [10, 10], [1, 0]], [[0, 0], [9, 9]])</code> → <code>[0, 1, 0]</code>.</p>",
   "starter": "def assign(points, centers):\n    pass\n\ndef new_centers(points, labels, k):\n    pass\n",
   "solution": "def euclidean(u, v):\n    return sum((a - b) ** 2 for a, b in zip(u, v)) ** 0.5\n\ndef mean_vec(vs):\n    n = len(vs)\n    return [sum(v[i] for v in vs) / n for i in range(len(vs[0]))]\n\ndef assign(points, centers):\n    return [min(range(len(centers)), key=lambda j: euclidean(p, centers[j])) for p in points]\n\ndef new_centers(points, labels, k):\n    return [mean_vec([p for p, l in zip(points, labels) if l == j]) for j in range(k)]\n",
   "hints": [
    "<code>assign</code>: әр нүктеге 3-сабақтағы <code>nearest</code> идеясы.",
    "<code>new_centers</code>: j-ші топтың нүктелерін сүзіп, <code>mean_vec</code> (1-сабақ) есептеңіз."
   ],
   "check": {
    "tests": "_pts = [[0, 0], [10, 10], [1, 0], [9, 11], [0, 2]]\n_lab = assign(_pts, [[0, 0], [9, 9]])\nassert _lab == [0, 1, 0, 1, 0], f\"assign нәтижесі [0, 1, 0, 1, 0] болуы керек, сізде {_lab}\"\n_c = new_centers(_pts, _lab, 2)\nassert len(_c) == 2, \"k = 2 орталық\"\nassert all(abs(_a - _b) < 1e-9 for _a, _b in zip(_c[0], [1 / 3, 2 / 3])), \"0-топтың ортасы [1/3, 2/3]\"\nassert all(abs(_a - _b) < 1e-9 for _a, _b in zip(_c[1], [9.5, 10.5])), \"1-топтың ортасы [9.5, 10.5]\"",
    "mustInclude": [
     "def assign",
     "def new_centers"
    ]
   }
  }
 ],
 "mm-4": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Матрица пішіні",
   "prompt": "<p><code>shape(A)</code> функциясын жазыңыз: матрицаның пішінін <code>(жол саны, баған саны)</code> кортежі ретінде қайтарсын.</p><p>Мысалы, <code>shape([[1, 2, 3], [4, 5, 6]])</code> → <code>(2, 3)</code>.</p>",
   "starter": "def shape(A):\n    pass\n",
   "solution": "def shape(A):\n    return len(A), len(A[0])\n",
   "hints": [
    "Жолдар: <code>len(A)</code>, бағандар: <code>len(A[0])</code>."
   ],
   "check": {
    "tests": "assert shape([[1, 2, 3], [4, 5, 6]]) == (2, 3), \"shape = (2, 3)\"\nassert shape([[7]]) == (1, 1), \"shape([[7]]) = (1, 1)\"\nassert shape([[1], [2], [3], [4]]) == (4, 1), \"Баған вектор: (4, 1)\"",
    "mustInclude": [
     "def shape"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бағанды алу",
   "prompt": "<p><code>column(A, j)</code> функциясын жазыңыз: матрицаның j-ші бағанын (индекс 0-ден) тізім ретінде қайтарсын.</p><p>Мысалы, бағалар кестесінде (жол — оқушы, баған — пән): <code>column([[5, 4], [3, 5], [4, 4]], 1)</code> → <code>[4, 5, 4]</code>.</p>",
   "starter": "def column(A, j):\n    pass\n",
   "solution": "def column(A, j):\n    return [row[j] for row in A]\n",
   "hints": [
    "<code>[row[j] for row in A]</code>"
   ],
   "check": {
    "tests": "assert column([[5, 4], [3, 5], [4, 4]], 1) == [4, 5, 4], \"column(..., 1) = [4, 5, 4]\"\nassert column([[1, 2, 3], [4, 5, 6]], 0) == [1, 4], \"column(..., 0) = [1, 4]\"",
    "mustInclude": [
     "def column"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Матрицаларды қосу",
   "prompt": "<p><code>mat_add(A, B)</code> функциясын жазыңыз: пішіні бірдей екі матрицаны элемент бойынша қосып, жаңа матрица қайтарсын.</p><p>Мысалы, қаңтар мен ақпандағы сатылым (жол — дүкен, баған — тауар): <code>mat_add([[1, 2], [3, 4]], [[10, 20], [30, 40]])</code> → <code>[[11, 22], [33, 44]]</code>.</p>",
   "starter": "def mat_add(A, B):\n    pass\n",
   "solution": "def mat_add(A, B):\n    return [[a + b for a, b in zip(ra, rb)] for ra, rb in zip(A, B)]\n",
   "hints": [
    "Жолдарды жұптап (<code>zip(A, B)</code>), әр жолда элементтерді қосыңыз."
   ],
   "check": {
    "tests": "assert mat_add([[1, 2], [3, 4]], [[10, 20], [30, 40]]) == [[11, 22], [33, 44]], \"mat_add = [[11, 22], [33, 44]]\"\nassert mat_add([[1, 2, 3]], [[-1, -2, -3]]) == [[0, 0, 0]], \"Қарама-қарсы матрицалар: нөл\"",
    "mustInclude": [
     "def mat_add"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бірлік матрица",
   "prompt": "<p><code>identity(n)</code> функциясын жазыңыз: n × n бірлік матрицаны қайтарсын (диагональда 1, қалғаны 0).</p><p>Мысалы, <code>identity(2)</code> → <code>[[1, 0], [0, 1]]</code>.</p>",
   "starter": "def identity(n):\n    pass\n",
   "solution": "def identity(n):\n    return [[1 if i == j else 0 for j in range(n)] for i in range(n)]\n",
   "hints": [
    "<code>1 if i == j else 0</code>"
   ],
   "check": {
    "tests": "assert identity(2) == [[1, 0], [0, 1]], \"identity(2) = [[1, 0], [0, 1]]\"\nassert identity(3) == [[1, 0, 0], [0, 1, 0], [0, 0, 1]], \"identity(3)\"\n_I = identity(3)\n_I[0][1] = 5\nassert _I[1][1] == 1 and _I[2][1] == 0, \"Жолдар бір-бірінің көшірмесі болмауы керек ([[0] * n] * n қатесі)\"",
    "mustInclude": [
     "def identity"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Дүкендер табысы",
   "prompt": "<p><code>S</code> матрицасы: жол — дүкен, баған — тауар, мән — сатылған дана. <code>prices</code> — тауар бағалары (₸). <code>shop_revenue(S, prices)</code> функциясын жазыңыз: <code>(per_shop, total)</code> қайтарсын: әр дүкеннің табысы (матрица × вектор) және жалпы табыс.</p>",
   "starter": "def shop_revenue(S, prices):\n    pass\n",
   "solution": "def matvec(A, x):\n    return [sum(a * b for a, b in zip(row, x)) for row in A]\n\ndef shop_revenue(S, prices):\n    per_shop = matvec(S, prices)\n    return per_shop, sum(per_shop)\n",
   "hints": [
    "<code>matvec(S, prices)</code> әр дүкеннің табысын береді.",
    "Жалпы табыс — оның қосындысы."
   ],
   "check": {
    "tests": "_S = [[10, 2, 0], [5, 5, 5], [0, 1, 20]]\n_p = [300, 1500, 200]\n_ps, _t = shop_revenue(_S, _p)\nassert _ps == [6000, 10000, 5500], f\"Әр дүкен: [6000, 10000, 5500] болуы керек, сізде {_ps}\"\nassert _t == 21500, \"Жалпы табыс 21 500 ₸\"",
    "mustInclude": [
     "def shop_revenue"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Матрица дәрежесі",
   "prompt": "<p><code>mat_pow(A, k)</code> функциясын жазыңыз: квадрат матрицаның k-ші дәрежесін (A · A · ... · A, k рет) қайтарсын. k = 0 болса, бірлік матрица.</p><p>Мысалы, <code>mat_pow([[1, 1], [1, 0]], 5)</code> → <code>[[8, 5], [5, 3]]</code> (Фибоначчи сандары).</p>",
   "starter": "def mat_pow(A, k):\n    pass\n",
   "solution": "def matmul(A, B):\n    n, p = len(B), len(B[0])\n    return [[sum(A[i][t] * B[t][j] for t in range(n)) for j in range(p)] for i in range(len(A))]\n\ndef mat_pow(A, k):\n    n = len(A)\n    R = [[1 if i == j else 0 for j in range(n)] for i in range(n)]\n    for _ in range(k):\n        R = matmul(R, A)\n    return R\n",
   "hints": [
    "Бірлік матрицадан бастап, k рет A-ға көбейтіңіз.",
    "Сабақтағы <code>matmul</code> функциясын қолданыңыз."
   ],
   "check": {
    "tests": "assert mat_pow([[1, 1], [1, 0]], 5) == [[8, 5], [5, 3]], \"mat_pow([[1, 1], [1, 0]], 5) = [[8, 5], [5, 3]]\"\nassert mat_pow([[2, 0], [0, 3]], 3) == [[8, 0], [0, 27]], \"Диагональ матрица: [[8, 0], [0, 27]]\"\nassert mat_pow([[5, 7], [1, 2]], 0) == [[1, 0], [0, 1]], \"k = 0: бірлік матрица\"\nassert mat_pow([[5, 7], [1, 2]], 1) == [[5, 7], [1, 2]], \"k = 1: матрицаның өзі\"",
    "mustInclude": [
     "def mat_pow"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ауыстырымдылық",
   "prompt": "<p>Матрица көбейтуінде рет маңызды. <code>commutes(A, B)</code> функциясын жазыңыз: квадрат матрицалар үшін A · B мен B · A-ны есептеп, олар тең болса <code>True</code> қайтарсын.</p><p>Мысалы, <code>commutes([[1, 2], [3, 4]], [[0, 1], [1, 0]])</code> → <code>False</code>, ал бірлік матрица кез келген матрицамен ауыстырымды.</p>",
   "starter": "def commutes(A, B):\n    pass\n",
   "solution": "def matmul(A, B):\n    n, p = len(B), len(B[0])\n    return [[sum(A[i][t] * B[t][j] for t in range(n)) for j in range(p)] for i in range(len(A))]\n\ndef commutes(A, B):\n    return matmul(A, B) == matmul(B, A)\n",
   "hints": [
    "<code>matmul(A, B) == matmul(B, A)</code>"
   ],
   "check": {
    "tests": "assert commutes([[1, 2], [3, 4]], [[0, 1], [1, 0]]) is False, \"A·B ≠ B·A\"\nassert commutes([[1, 2], [3, 4]], [[1, 0], [0, 1]]) is True, \"Бірлік матрицамен ауыстырымды\"\nassert commutes([[2, 0], [0, 3]], [[5, 0], [0, 7]]) is True, \"Диагональ матрицалар ауыстырымды\"",
    "mustInclude": [
     "def commutes"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Маршруттар саны",
   "prompt": "<p>Қалалар арасындағы тікелей рейстер матрицасы <code>A</code>: A[i][j] = 1, егер i-ден j-ге тікелей рейс болса. Матрицаның k-ші дәрежесінің [i][j] элементі i-ден j-ге дәл k рейспен жетудің тәсілдер санын береді. <code>routes(A, i, j, k)</code> функциясын жазыңыз.</p>",
   "starter": "def routes(A, i, j, k):\n    pass\n",
   "solution": "def matmul(A, B):\n    n, p = len(B), len(B[0])\n    return [[sum(A[r][t] * B[t][c] for t in range(n)) for c in range(p)] for r in range(len(A))]\n\ndef routes(A, i, j, k):\n    n = len(A)\n    R = [[1 if r == c else 0 for c in range(n)] for r in range(n)]\n    for _ in range(k):\n        R = matmul(R, A)\n    return R[i][j]\n",
   "hints": [
    "Алдыңғы тапсырмадағы <code>mat_pow</code> идеясы.",
    "Нәтиже — дәреженің [i][j] элементі."
   ],
   "check": {
    "tests": "# 0 Алматы, 1 Астана, 2 Шымкент, 3 Ақтау\n_A = [[0, 1, 1, 0], [1, 0, 1, 1], [1, 1, 0, 0], [0, 1, 0, 0]]\nassert routes(_A, 0, 3, 1) == 0, \"Алматыдан Ақтауға тікелей рейс жоқ\"\nassert routes(_A, 0, 3, 2) == 1, \"Екі рейспен: тек Астана арқылы\"\nassert routes(_A, 0, 0, 2) == 2, \"Алматы → X → Алматы: Астана не Шымкент арқылы, 2 тәсіл\"\nassert routes(_A, 2, 3, 3) == 1, \"Шымкенттен Ақтауға 3 рейспен: 1 тәсіл (Алматы, Астана арқылы)\"",
    "mustInclude": [
     "def routes"
    ]
   }
  }
 ],
 "mm-5": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Intercept бағаны",
   "prompt": "<p><code>add_bias(features)</code> функциясын жазыңыз: әр жолдың басына 1 қосылған жаңа матрицаны қайтарсын (бастапқы тізім өзгермесін).</p><p>Мысалы, <code>add_bias([[50, 2], [70, 3]])</code> → <code>[[1, 50, 2], [1, 70, 3]]</code>.</p>",
   "starter": "def add_bias(features):\n    pass\n",
   "solution": "def add_bias(features):\n    return [[1] + row for row in features]\n",
   "hints": [
    "<code>[[1] + row for row in features]</code> жаңа тізімдер құрады."
   ],
   "check": {
    "tests": "_f = [[50, 2], [70, 3]]\nassert add_bias(_f) == [[1, 50, 2], [1, 70, 3]], \"add_bias = [[1, 50, 2], [1, 70, 3]]\"\nassert _f == [[50, 2], [70, 3]], \"Бастапқы features өзгермеуі керек\"\nassert add_bias([[7]]) == [[1, 7]], \"add_bias([[7]]) = [[1, 7]]\"",
    "mustInclude": [
     "def add_bias"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Симметриялы матрица",
   "prompt": "<p><code>is_symmetric(A)</code> функциясын жазыңыз: квадрат матрица өзінің transpose-ына тең болса, <code>True</code> қайтарсын.</p><p>Мысалы, қалалар арасындағы қашықтық кестесі симметриялы: <code>is_symmetric([[0, 5], [5, 0]])</code> → <code>True</code>.</p>",
   "starter": "def is_symmetric(A):\n    pass\n",
   "solution": "def transpose(A):\n    return [list(col) for col in zip(*A)]\n\ndef is_symmetric(A):\n    return A == transpose(A)\n",
   "hints": [
    "<code>transpose(A)</code> есептеп, <code>A</code>-мен салыстырыңыз."
   ],
   "check": {
    "tests": "assert is_symmetric([[0, 5], [5, 0]]) is True, \"[[0, 5], [5, 0]] симметриялы\"\nassert is_symmetric([[1, 2], [3, 1]]) is False, \"2 ≠ 3: симметриялы емес\"\nassert is_symmetric([[1, 7, 3], [7, 2, 4], [3, 4, 5]]) is True, \"3 × 3 симметриялы матрица\"",
    "mustInclude": [
     "def is_symmetric"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бір пәтердің бағасы",
   "prompt": "<p><code>predict_one(x, w)</code> функциясын жазыңыз: <code>x</code> — белгілер (intercept-сіз), <code>w</code> — салмақтар, w[0] — intercept. ŷ = w₀ + w₁x₁ + w₂x₂ + ... қайтарсын.</p><p>Мысалы, <code>predict_one([50, 2], [5, 0.4, 2])</code> → 5 + 20 + 4 = <code>29.0</code>.</p>",
   "starter": "def predict_one(x, w):\n    pass\n",
   "solution": "def predict_one(x, w):\n    return sum(a * b for a, b in zip([1] + x, w))\n",
   "hints": [
    "x-тің басына 1 қосыңыз да, w-мен dot product жасаңыз."
   ],
   "check": {
    "tests": "assert abs(predict_one([50, 2], [5, 0.4, 2]) - 29) < 1e-9, \"predict_one([50, 2], [5, 0.4, 2]) = 29\"\nassert abs(predict_one([85, 3], [5, 0.4, 2]) - 45) < 1e-9, \"predict_one([85, 3], ...) = 45\"\nassert predict_one([], [7]) == 7, \"Белгі жоқ: тек intercept\"",
    "mustInclude": [
     "def predict_one"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Xᵀ · X матрицасы",
   "prompt": "<p><code>gram(X)</code> функциясын жазыңыз: Xᵀ · X матрицасын қайтарсын. Оның [i][j] элементі — X-тің i-ші және j-ші бағандарының dot product-ы. Сызықтық регрессияда бұл матрица жиі кездеседі.</p><p>Мысалы, <code>gram([[1, 2], [1, 3]])</code> → <code>[[2, 5], [5, 13]]</code>.</p>",
   "starter": "def gram(X):\n    pass\n",
   "solution": "def transpose(A):\n    return [list(col) for col in zip(*A)]\n\ndef matmul(A, B):\n    n, p = len(B), len(B[0])\n    return [[sum(A[i][k] * B[k][j] for k in range(n)) for j in range(p)] for i in range(len(A))]\n\ndef gram(X):\n    return matmul(transpose(X), X)\n",
   "hints": [
    "<code>matmul(transpose(X), X)</code>",
    "Нәтиже пішіні: баған саны × баған саны."
   ],
   "check": {
    "tests": "assert gram([[1, 2], [1, 3]]) == [[2, 5], [5, 13]], \"gram([[1, 2], [1, 3]]) = [[2, 5], [5, 13]]\"\n_g = gram([[1, 50, 2], [1, 70, 3], [1, 40, 1]])\nassert len(_g) == 3 and len(_g[0]) == 3, \"3 баған: 3 × 3 матрица\"\nassert _g[0][0] == 3 and _g[1][1] == 50 ** 2 + 70 ** 2 + 40 ** 2, \"Диагональ: бағандардың квадраттар қосындысы\"\nassert _g[0][1] == _g[1][0] == 160, \"Xᵀ·X симметриялы: [0][1] = 50 + 70 + 40 = 160\"",
    "mustInclude": [
     "def gram"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қалдықтар",
   "prompt": "<p><code>residuals(X, w, y)</code> функциясын жазыңыз: әр бақылау үшін қалдық eᵢ = yᵢ − ŷᵢ тізімін қайтарсын, мұнда ŷ = X · w (X-те intercept бағаны бар).</p><p>Мысалы, <code>residuals([[1, 50], [1, 70]], [5, 0.5], [32, 38])</code> → <code>[2.0, -2.0]</code>.</p>",
   "starter": "def residuals(X, w, y):\n    pass\n",
   "solution": "def predict(X, w):\n    return [sum(a * b for a, b in zip(row, w)) for row in X]\n\ndef residuals(X, w, y):\n    return [t - p for t, p in zip(y, predict(X, w))]\n",
   "hints": [
    "Алдымен <code>predict(X, w)</code> (сабақтағы).",
    "Сосын <code>[t - p for t, p in zip(y, preds)]</code>."
   ],
   "check": {
    "tests": "assert residuals([[1, 50], [1, 70]], [5, 0.5], [32, 38]) == [2.0, -2.0], \"ŷ = [30, 40]: қалдықтар [2, −2]\"\nassert residuals([[1, 2, 3]], [1, 1, 1], [6]) == [0], \"Дәл болжам: қалдық 0\"",
    "mustInclude": [
     "def residuals"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Xᵀ · e векторы",
   "prompt": "<p><code>xt_e(X, e)</code> функциясын жазыңыз: Xᵀ · e векторын қайтарсын (transpose пен матрицаны векторға көбейту). Оның j-ші элементі Σᵢ X[i][j] · eᵢ — кейін gradient descent-те дәл осы шама керек болады.</p><p>Мысалы, <code>xt_e([[1, 2], [1, 3]], [1, -1])</code> → <code>[0, -1]</code>.</p>",
   "starter": "def xt_e(X, e):\n    pass\n",
   "solution": "def transpose(A):\n    return [list(col) for col in zip(*A)]\n\ndef matvec(A, x):\n    return [sum(a * b for a, b in zip(row, x)) for row in A]\n\ndef xt_e(X, e):\n    return matvec(transpose(X), e)\n",
   "hints": [
    "<code>matvec(transpose(X), e)</code>"
   ],
   "check": {
    "tests": "assert xt_e([[1, 2], [1, 3]], [1, -1]) == [0, -1], \"xt_e([[1, 2], [1, 3]], [1, -1]) = [0, −1]\"\nassert xt_e([[1, 50, 2], [1, 70, 3]], [2, 1]) == [3, 170, 7], \"xt_e = [3, 170, 7]: ұзындығы — баған саны\"",
    "mustInclude": [
     "def xt_e"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ең жақсы салмақтар",
   "prompt": "<p><code>best_weights(X, y, candidates)</code> функциясын жазыңыз: <code>candidates</code> — салмақтар векторларының тізімі. Абсолют қалдықтар қосындысы Σ|yᵢ − ŷᵢ| ең кіші болатын векторды қайтарсын.</p>",
   "starter": "def best_weights(X, y, candidates):\n    pass\n",
   "solution": "def predict(X, w):\n    return [sum(a * b for a, b in zip(row, w)) for row in X]\n\ndef abs_error(X, w, y):\n    return sum(abs(t - p) for t, p in zip(y, predict(X, w)))\n\ndef best_weights(X, y, candidates):\n    return min(candidates, key=lambda w: abs_error(X, w, y))\n",
   "hints": [
    "Әр кандидат үшін Σ|y − ŷ| есептейтін көмекші функция жазыңыз.",
    "<code>min(candidates, key=...)</code>"
   ],
   "check": {
    "tests": "_X = [[1, 50, 2], [1, 70, 3], [1, 40, 1], [1, 85, 3]]\n_y = [29, 39, 23, 45]\n_c = [[0, 0.5, 0], [5, 0.4, 2], [10, 0.3, 1]]\nassert best_weights(_X, _y, _c) == [5, 0.4, 2], \"[5, 0.4, 2] дәл болжайды: қате 0\"\nassert best_weights([[1, 1], [1, 2]], [3, 5], [[0, 2], [1, 2], [2, 2]]) == [1, 2], \"y = 1 + 2x: [1, 2]\"",
    "mustInclude": [
     "def best_weights"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Такси бағасы",
   "prompt": "<p>Алматыдағы такси бағасы: ŷ = w₀ + w₁ · км + w₂ · минут. <code>taxi(trips, w)</code> функциясын жазыңыз: <code>trips</code> — <code>[км, минут]</code> тізімі. intercept бағанын қосып, X матрицасын құрып, ŷ = X · w есептеп, <code>(prices, total, top)</code> қайтарсын: барлық баға тізімі, жалпы сома және ең қымбат сапардың индексі.</p>",
   "starter": "def taxi(trips, w):\n    pass\n",
   "solution": "def predict(X, w):\n    return [sum(a * b for a, b in zip(row, w)) for row in X]\n\ndef taxi(trips, w):\n    X = [[1] + t for t in trips]\n    prices = predict(X, w)\n    top = max(range(len(prices)), key=lambda i: prices[i])\n    return prices, sum(prices), top\n",
   "hints": [
    "X: <code>[[1] + t for t in trips]</code>.",
    "Ең қымбат: <code>max(range(len(prices)), key=...)</code>."
   ],
   "check": {
    "tests": "_trips = [[5, 15], [12, 30], [3, 20]]\n_w = [400, 120, 20]\n_p, _t, _top = taxi(_trips, _w)\nassert _p == [1300, 2440, 1160], f\"Бағалар [1300, 2440, 1160] болуы керек, сізде {_p}\"\nassert _t == 4900, \"Жалпы 4 900 ₸\"\nassert _top == 1, \"Ең қымбаты — 12 км сапар (индекс 1)\"",
    "mustInclude": [
     "def taxi"
    ]
   }
  }
 ],
 "mm-6": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Орташа өзгеру жылдамдығы",
   "prompt": "<p><code>avg_rate(f, a, b)</code> функциясын жазыңыз: f функциясының [a, b] аралығындағы орташа өзгеру жылдамдығын (f(b) − f(a)) / (b − a) қайтарсын.</p><p>Мысалы, <code>avg_rate(lambda x: x ** 2, 1, 3)</code> → <code>4.0</code>.</p>",
   "starter": "def avg_rate(f, a, b):\n    pass\n",
   "solution": "def avg_rate(f, a, b):\n    return (f(b) - f(a)) / (b - a)\n",
   "hints": [
    "Бұл екі нүкте арқылы өтетін түзудің көлбеулігі."
   ],
   "check": {
    "tests": "assert abs(avg_rate(lambda x: x ** 2, 1, 3) - 4) < 1e-12, \"(9 − 1) / 2 = 4\"\nassert abs(avg_rate(lambda x: 3 * x - 7, -5, 10) - 3) < 1e-12, \"Түзуде кез келген аралықта көлбеулік 3\"\nassert abs(avg_rate(lambda x: 100 - x ** 2, 0, 10) + 10) < 1e-12, \"Кемитін функция: −10\"",
    "mustInclude": [
     "def avg_rate"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Алға айырма",
   "prompt": "<p><code>forward_diff(f, x, h=1e-5)</code> функциясын жазыңыз: туындының қарапайым бағасын (f(x + h) − f(x)) / h қайтарсын.</p><p>Мысалы, <code>forward_diff(lambda x: x ** 2, 3)</code> ≈ <code>6.00001</code>.</p>",
   "starter": "def forward_diff(f, x, h=1e-5):\n    pass\n",
   "solution": "def forward_diff(f, x, h=1e-5):\n    return (f(x + h) - f(x)) / h\n",
   "hints": [
    "Жақшаларға назар аударыңыз: <code>(f(x + h) - f(x)) / h</code>."
   ],
   "check": {
    "tests": "assert abs(forward_diff(lambda x: x ** 2, 3) - 6) < 1e-3, \"(x²)′ x = 3-те ≈ 6\"\nassert abs(forward_diff(lambda x: x ** 2, 3, 0.1) - 6.1) < 1e-9, \"h = 0.1 болса, (9.61 − 9) / 0.1 = 6.1: алға айырма қатесі h-қа тең\"\nassert abs(forward_diff(lambda x: 4 * x, 10) - 4) < 1e-6, \"Түзудің туындысы 4\"",
    "mustInclude": [
     "def forward_diff"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Түзу теңдеуі",
   "prompt": "<p><code>line_through(p1, p2)</code> функциясын жазыңыз: екі нүкте арқылы өтетін y = kx + b түзуінің <code>(k, b)</code> жұбын қайтарсын.</p><p>Мысалы, <code>line_through((0, 1), (2, 5))</code> → <code>(2.0, 1.0)</code>.</p>",
   "starter": "def line_through(p1, p2):\n    pass\n",
   "solution": "def line_through(p1, p2):\n    (x1, y1), (x2, y2) = p1, p2\n    k = (y2 - y1) / (x2 - x1)\n    return k, y1 - k * x1\n",
   "hints": [
    "Алдымен көлбеулік k.",
    "b = y₁ − k · x₁."
   ],
   "check": {
    "tests": "assert line_through((0, 1), (2, 5)) == (2.0, 1.0), \"line_through((0, 1), (2, 5)) = (2, 1)\"\n_k, _b = line_through((1, 10), (3, 4))\nassert abs(_k + 3) < 1e-12 and abs(_b - 13) < 1e-12, \"line_through((1, 10), (3, 4)) = (−3, 13)\"",
    "mustInclude": [
     "def line_through"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Туындылар тізімі",
   "prompt": "<p><code>derivs(f, xs, h=1e-5)</code> функциясын жазыңыз: <code>xs</code> ішіндегі әр нүктеде орталық айырма арқылы f′(x) мәндерінің тізімін қайтарсын.</p><p>Мысалы, <code>derivs(lambda x: x ** 2, [0, 1, 2])</code> ≈ <code>[0, 2, 4]</code>.</p>",
   "starter": "def derivs(f, xs, h=1e-5):\n    pass\n",
   "solution": "def derivative(f, x, h=1e-5):\n    return (f(x + h) - f(x - h)) / (2 * h)\n\ndef derivs(f, xs, h=1e-5):\n    return [derivative(f, x, h) for x in xs]\n",
   "hints": [
    "Сабақтағы <code>derivative</code> функциясын әр x-ке қолданыңыз."
   ],
   "check": {
    "tests": "_d = derivs(lambda x: x ** 2, [0, 1, 2])\nassert len(_d) == 3 and all(abs(_a - _b) < 1e-6 for _a, _b in zip(_d, [0, 2, 4])), f\"≈ [0, 2, 4] болуы керек, сізде {_d}\"\n_d3 = derivs(lambda x: x ** 3, [-1, 0, 2])\nassert all(abs(_a - _b) < 1e-6 for _a, _b in zip(_d3, [3, 0, 12])), \"(x³)′ = 3x²: [3, 0, 12]\"",
    "mustInclude": [
     "def derivs"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Өседі ме, кемиді ме",
   "prompt": "<p><code>trend(f, x)</code> функциясын жазыңыз: x нүктесіндегі туындының таңбасы бойынша <code>\"өседі\"</code> (f′ &gt; 1e-6), <code>\"кемиді\"</code> (f′ &lt; −1e-6) немесе <code>\"тұрақты\"</code> қайтарсын.</p><p>Мысалы, <code>trend(lambda x: (x - 3) ** 2, 5)</code> → <code>\"өседі\"</code>.</p>",
   "starter": "def trend(f, x):\n    pass\n",
   "solution": "def derivative(f, x, h=1e-5):\n    return (f(x + h) - f(x - h)) / (2 * h)\n\ndef trend(f, x):\n    d = derivative(f, x)\n    if d > 1e-6:\n        return \"өседі\"\n    if d < -1e-6:\n        return \"кемиді\"\n    return \"тұрақты\"\n",
   "hints": [
    "Алдымен <code>derivative(f, x)</code>.",
    "Үш жағдайды <code>if</code> арқылы тексеріңіз."
   ],
   "check": {
    "tests": "_f = lambda x: (x - 3) ** 2\nassert trend(_f, 5) == \"өседі\", \"x = 5: f′ = 4 > 0\"\nassert trend(_f, 0) == \"кемиді\", \"x = 0: f′ = −6 < 0\"\nassert trend(_f, 3) == \"тұрақты\", \"x = 3: минимум, f′ = 0\"",
    "mustInclude": [
     "def trend"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Стационар нүктелер",
   "prompt": "<p><code>stationary(f, xs, tol=1e-3)</code> функциясын жазыңыз: <code>xs</code> ішінен |f′(x)| &lt; tol болатын нүктелердің тізімін қайтарсын (минимум не максимум «үміткерлері»).</p><p>Мысалы, f(x) = x³ − 3x үшін <code>stationary(f, [-2, -1, 0, 1, 2])</code> → <code>[-1, 1]</code>.</p>",
   "starter": "def stationary(f, xs, tol=1e-3):\n    pass\n",
   "solution": "def derivative(f, x, h=1e-5):\n    return (f(x + h) - f(x - h)) / (2 * h)\n\ndef stationary(f, xs, tol=1e-3):\n    return [x for x in xs if abs(derivative(f, x)) < tol]\n",
   "hints": [
    "<code>[x for x in xs if abs(derivative(f, x)) &lt; tol]</code>"
   ],
   "check": {
    "tests": "assert stationary(lambda x: x ** 3 - 3 * x, [-2, -1, 0, 1, 2]) == [-1, 1], \"f′ = 3x² − 3 = 0: x = ±1\"\nassert stationary(lambda x: (x - 3) ** 2, [i / 2 for i in range(13)]) == [3.0], \"Парабола минимумы x = 3\"\nassert stationary(lambda x: 2 * x, [0, 1, 2]) == [], \"Түзуде стационар нүкте жоқ\"",
    "mustInclude": [
     "def stationary"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Шекті пайда",
   "prompt": "<p>Наубайхана күніне q нан пісірсе, пайдасы P(q) = −0.02q² + 120q − 5000 ₸. Тапсырма:</p><ul><li><code>marginal(q)</code> — шекті пайда, яғни P′(q) (орталық айырма);</li><li><code>best_q</code> — 0..5000 бүтін сандарының ішінен P(q) ең үлкен болатын q.</li></ul><p>Туынды 0-ге тең жерде пайда максимум: −0.04q + 120 = 0.</p>",
   "starter": "def P(q):\n    return -0.02 * q ** 2 + 120 * q - 5000\n\ndef marginal(q):\n    pass\n\nbest_q = None\n",
   "solution": "def P(q):\n    return -0.02 * q ** 2 + 120 * q - 5000\n\ndef derivative(f, x, h=1e-5):\n    return (f(x + h) - f(x - h)) / (2 * h)\n\ndef marginal(q):\n    return derivative(P, q)\n\nbest_q = max(range(5001), key=P)\n",
   "hints": [
    "<code>marginal</code> ішінде <code>derivative(P, q)</code>.",
    "<code>best_q = max(range(5001), key=P)</code>"
   ],
   "check": {
    "tests": "assert abs(marginal(1000) - 80) < 1e-4, \"P′(1000) = −0.04 · 1000 + 120 = 80: тағы нан пісіру тиімді\"\nassert abs(marginal(4000) + 40) < 1e-4, \"P′(4000) = −40: артық өндіріс\"\nassert best_q == 3000, \"Максимум q = 3000 (P′ = 0)\"\nassert abs(marginal(best_q)) < 1e-4, \"Ең жақсы нүктеде шекті пайда ≈ 0\"",
    "mustInclude": [
     "def marginal"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Екінші туынды",
   "prompt": "<p><code>second_derivative(f, x, h=1e-4)</code> функциясын жазыңыз: (f(x + h) − 2f(x) + f(x − h)) / h². Ол функцияның «иілуін» көрсетеді: оң болса — ойыс (минимум), теріс болса — дөңес (максимум). Сосын <code>kind(f, x)</code> жазыңыз: стационар нүктеде екінші туынды &gt; 0 болса <code>\"минимум\"</code>, &lt; 0 болса <code>\"максимум\"</code>.</p>",
   "starter": "def second_derivative(f, x, h=1e-4):\n    pass\n\ndef kind(f, x):\n    pass\n",
   "solution": "def second_derivative(f, x, h=1e-4):\n    return (f(x + h) - 2 * f(x) + f(x - h)) / h ** 2\n\ndef kind(f, x):\n    return \"минимум\" if second_derivative(f, x) > 0 else \"максимум\"\n",
   "hints": [
    "Формуланы жақшалармен мұқият жазыңыз: бөлім <code>h ** 2</code>.",
    "<code>kind</code>: таңбаны тексеріңіз."
   ],
   "check": {
    "tests": "assert abs(second_derivative(lambda x: x ** 3, 2) - 12) < 1e-3, \"(x³)″ = 6x: x = 2-де 12\"\nassert abs(second_derivative(lambda x: 5 * x ** 2 - x, 7) - 10) < 1e-3, \"(5x² − x)″ = 10\"\n_f = lambda x: x ** 3 - 3 * x\nassert kind(_f, 1) == \"минимум\", \"x = 1: f″ = 6 > 0, минимум\"\nassert kind(_f, -1) == \"максимум\", \"x = −1: f″ = −6 < 0, максимум\"",
    "mustInclude": [
     "def second_derivative",
     "def kind"
    ]
   }
  }
 ],
 "mm-7": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "a бойынша дербес туынды",
   "prompt": "<p><code>partial_a(f, a, b, h=1e-5)</code> функциясын жазыңыз: екі аргументті f(a, b) функциясының a бойынша дербес туындысын (b тұрақты) орталық айырма арқылы қайтарсын.</p><p>Мысалы, f(a, b) = a² · b үшін <code>partial_a(f, 3, 2)</code> ≈ <code>12</code>.</p>",
   "starter": "def partial_a(f, a, b, h=1e-5):\n    pass\n",
   "solution": "def partial_a(f, a, b, h=1e-5):\n    return (f(a + h, b) - f(a - h, b)) / (2 * h)\n",
   "hints": [
    "Тек a-ны ±h өзгертіңіз: <code>(f(a + h, b) - f(a - h, b)) / (2 * h)</code>."
   ],
   "check": {
    "tests": "assert abs(partial_a(lambda a, b: a ** 2 * b, 3, 2) - 12) < 1e-4, \"∂(a²b)/∂a = 2ab = 12\"\nassert abs(partial_a(lambda a, b: 4 * a + b ** 3, 1, 5) - 4) < 1e-4, \"∂(4a + b³)/∂a = 4: b тұрақты\"",
    "mustInclude": [
     "def partial_a"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Градиент ұзындығы",
   "prompt": "<p><code>grad_norm(g)</code> функциясын жазыңыз: градиент векторының ұзындығын қайтарсын. Ол функцияның ең тез өсу жылдамдығын көрсетеді, ал минимумда 0-ге жақын болады.</p><p>Мысалы, <code>grad_norm([4, 3])</code> → <code>5.0</code>.</p>",
   "starter": "def grad_norm(g):\n    pass\n",
   "solution": "def grad_norm(g):\n    return sum(a * a for a in g) ** 0.5\n",
   "hints": [
    "Вектор ұзындығы: √ квадраттар қосындысы."
   ],
   "check": {
    "tests": "assert abs(grad_norm([4, 3]) - 5) < 1e-12, \"grad_norm([4, 3]) = 5\"\nassert grad_norm([0, 0, 0]) == 0, \"Минимумда градиент нөл\"",
    "mustInclude": [
     "def grad_norm"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Кері бағыт",
   "prompt": "<p><code>descent_dir(g)</code> функциясын жазыңыз: loss-ты ең тез азайтатын бағытты — антиградиентті (−∇) қайтарсын.</p><p>Мысалы, <code>descent_dir([4, -2])</code> → <code>[-4, 2]</code>.</p>",
   "starter": "def descent_dir(g):\n    pass\n",
   "solution": "def descent_dir(g):\n    return [-a for a in g]\n",
   "hints": [
    "Әр элементтің таңбасын ауыстырыңыз."
   ],
   "check": {
    "tests": "assert descent_dir([4, -2]) == [-4, 2], \"descent_dir([4, -2]) = [-4, 2]\"\nassert descent_dir([0.5]) == [-0.5], \"descent_dir([0.5]) = [-0.5]\"",
    "mustInclude": [
     "def descent_dir"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "i-ші дербес туынды",
   "prompt": "<p><code>partial(f, p, i, h=1e-5)</code> функциясын жазыңыз: <code>f</code> тізім қабылдайды; тек i-ші параметр бойынша дербес туындыны қайтарсын. Бастапқы <code>p</code> өзгермесін.</p><p>Мысалы, f(p) = p[0]² + 3·p[1] үшін <code>partial(f, [2.0, 5.0], 1)</code> ≈ <code>3</code>.</p>",
   "starter": "def partial(f, p, i, h=1e-5):\n    pass\n",
   "solution": "def partial(f, p, i, h=1e-5):\n    up = p[:]\n    down = p[:]\n    up[i] += h\n    down[i] -= h\n    return (f(up) - f(down)) / (2 * h)\n",
   "hints": [
    "<code>p[:]</code> көшірмесін алып, тек i-ші элементті өзгертіңіз."
   ],
   "check": {
    "tests": "_f = lambda p: p[0] ** 2 + 3 * p[1]\n_p = [2.0, 5.0]\nassert abs(partial(_f, _p, 0) - 4) < 1e-4, \"∂f/∂p₀ = 2·p₀ = 4\"\nassert abs(partial(_f, _p, 1) - 3) < 1e-4, \"∂f/∂p₁ = 3\"\nassert _p == [2.0, 5.0], \"Бастапқы p өзгермеуі керек: p[:] көшірмесін алыңыз\"",
    "mustInclude": [
     "def partial"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Градиент бойынша қадам",
   "prompt": "<p><code>grad_step(f, p, lr, h=1e-5)</code> функциясын жазыңыз: сандық градиентті есептеп, p − lr · ∇f(p) жаңа нүктесін (тізім) қайтарсын.</p><p>Мысалы, f(p) = p[0]² + p[1]² үшін <code>grad_step(f, [1.0, 2.0], 0.1)</code> ≈ <code>[0.8, 1.6]</code>.</p>",
   "starter": "def grad_step(f, p, lr, h=1e-5):\n    pass\n",
   "solution": "def gradient(f, p, h=1e-5):\n    g = []\n    for i in range(len(p)):\n        up = p[:]\n        down = p[:]\n        up[i] += h\n        down[i] -= h\n        g.append((f(up) - f(down)) / (2 * h))\n    return g\n\ndef grad_step(f, p, lr, h=1e-5):\n    g = gradient(f, p, h)\n    return [a - lr * b for a, b in zip(p, g)]\n",
   "hints": [
    "Сабақтағы <code>gradient</code> функциясын қолданыңыз.",
    "Минус таңбасы: <code>a - lr * b</code>."
   ],
   "check": {
    "tests": "_f = lambda p: p[0] ** 2 + p[1] ** 2\n_n = grad_step(_f, [1.0, 2.0], 0.1)\nassert len(_n) == 2 and abs(_n[0] - 0.8) < 1e-6 and abs(_n[1] - 1.6) < 1e-6, f\"≈ [0.8, 1.6] болуы керек, сізде {_n}\"\nassert _f(_n) < _f([1.0, 2.0]), \"Бір қадамнан кейін f кішіреюі керек\"",
    "mustInclude": [
     "def grad_step"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Аналитикалық градиент",
   "prompt": "<p>f(a, b) = a² · b + 3b². Қолмен дербес туындыларды табыңыз да, <code>grad_f(a, b)</code> функциясын жазыңыз: <code>[∂f/∂a, ∂f/∂b]</code> тізімін формуламен (сандық емес) қайтарсын.</p><p>Тексерісте сандық градиентпен салыстырылады.</p>",
   "starter": "def grad_f(a, b):\n    pass\n",
   "solution": "def grad_f(a, b):\n    return [2 * a * b, a ** 2 + 6 * b]\n",
   "hints": [
    "∂f/∂a: b тұрақты, (a²)′ = 2a.",
    "∂f/∂b: a² · 1 + 6b."
   ],
   "check": {
    "tests": "_f = lambda a, b: a ** 2 * b + 3 * b ** 2\nfor _a, _b in [(1.0, 2.0), (-3.0, 0.5), (2.0, -1.0)]:\n    _g = grad_f(_a, _b)\n    _h = 1e-5\n    _na = (_f(_a + _h, _b) - _f(_a - _h, _b)) / (2 * _h)\n    _nb = (_f(_a, _b + _h) - _f(_a, _b - _h)) / (2 * _h)\n    assert abs(_g[0] - _na) < 1e-4 and abs(_g[1] - _nb) < 1e-4, f\"({_a}, {_b}) нүктесінде градиент ≈ [{_na:.3f}, {_nb:.3f}] болуы керек, сізде {_g}\"",
    "mustInclude": [
     "def grad_f"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Минимумға жету",
   "prompt": "<p><code>minimize(f, p, lr, steps)</code> функциясын жазыңыз: <code>p</code> нүктесінен бастап <code>steps</code> рет p ← p − lr · ∇f(p) қадамын жасап (сандық градиент), соңғы нүктені қайтарсын. Бастапқы <code>p</code> өзгермесін.</p><p>Мысалы, f(p) = (p[0] − 1)² + (p[1] + 2)² минимумы [1, −2].</p>",
   "starter": "def minimize(f, p, lr, steps):\n    pass\n",
   "solution": "def gradient(f, p, h=1e-5):\n    g = []\n    for i in range(len(p)):\n        up = p[:]\n        down = p[:]\n        up[i] += h\n        down[i] -= h\n        g.append((f(up) - f(down)) / (2 * h))\n    return g\n\ndef minimize(f, p, lr, steps):\n    p = p[:]\n    for _ in range(steps):\n        g = gradient(f, p)\n        p = [a - lr * b for a, b in zip(p, g)]\n    return p\n",
   "hints": [
    "Циклде әр қадамда градиентті қайта есептеңіз.",
    "Басында <code>p = p[:]</code> — бастапқы тізім сақталады."
   ],
   "check": {
    "tests": "_f = lambda p: (p[0] - 1) ** 2 + (p[1] + 2) ** 2\n_p0 = [5.0, 5.0]\n_r = minimize(_f, _p0, 0.1, 200)\nassert abs(_r[0] - 1) < 1e-3 and abs(_r[1] + 2) < 1e-3, f\"Минимум ≈ [1, −2] болуы керек, сізде {_r}\"\nassert _p0 == [5.0, 5.0], \"Бастапқы p өзгермеуі керек\"\n_r2 = minimize(lambda p: (p[0] - 3) ** 2, [0.0], 0.25, 50)\nassert abs(_r2[0] - 3) < 1e-3, \"Бір параметрлі функцияда да жұмыс істеуі керек\"",
    "mustInclude": [
     "def minimize"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Градиентті тексеру",
   "prompt": "<p>Практикада қолмен жазған градиентті сандықпен тексереді (gradient check). <code>grad_check(f, grad, p, tol=1e-4)</code> функциясын жазыңыз: <code>grad(p)</code> (аналитикалық) мен сандық градиенттің әр элементінің айырмасы <code>tol</code>-дан кіші болса, <code>True</code> қайтарсын.</p>",
   "starter": "def grad_check(f, grad, p, tol=1e-4):\n    pass\n",
   "solution": "def gradient(f, p, h=1e-5):\n    g = []\n    for i in range(len(p)):\n        up = p[:]\n        down = p[:]\n        up[i] += h\n        down[i] -= h\n        g.append((f(up) - f(down)) / (2 * h))\n    return g\n\ndef grad_check(f, grad, p, tol=1e-4):\n    num = gradient(f, p)\n    return all(abs(a - b) < tol for a, b in zip(grad(p), num))\n",
   "hints": [
    "Сандық градиентті сабақтағыдай есептеңіз.",
    "<code>all(abs(a - b) &lt; tol for a, b in zip(...))</code>"
   ],
   "check": {
    "tests": "_f = lambda p: p[0] ** 2 * p[1] + p[1] ** 3\n_good = lambda p: [2 * p[0] * p[1], p[0] ** 2 + 3 * p[1] ** 2]\n_bad = lambda p: [2 * p[0], p[0] ** 2 + 3 * p[1] ** 2]\nassert grad_check(_f, _good, [1.5, -2.0]) is True, \"Дұрыс градиент тексерістен өтуі керек\"\nassert grad_check(_f, _bad, [1.5, -2.0]) is False, \"Қате градиент (∂f/∂a-да b жоқ) табылуы керек\"",
    "mustInclude": [
     "def grad_check"
    ]
   }
  }
 ],
 "mm-8": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Орташа абсолют қате",
   "prompt": "<p><code>mae(y, yhat)</code> функциясын жазыңыз: MAE = (1/n) · Σ |ŷᵢ − yᵢ|.</p><p>Мысалы, <code>mae([10, 20, 30], [12, 18, 33])</code> → <code>7/3 ≈ 2.33</code>.</p>",
   "starter": "def mae(y, yhat):\n    pass\n",
   "solution": "def mae(y, yhat):\n    return sum(abs(p - t) for t, p in zip(y, yhat)) / len(y)\n",
   "hints": [
    "<code>abs(p - t)</code> қосындысын n-ге бөліңіз."
   ],
   "check": {
    "tests": "assert abs(mae([10, 20, 30], [12, 18, 33]) - 7 / 3) < 1e-12, \"|2| + |−2| + |3| = 7, 7 / 3\"\nassert mae([1, 2], [1, 2]) == 0, \"Дәл болжам: 0\"",
    "mustInclude": [
     "def mae"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Болжамнан MSE",
   "prompt": "<p><code>mse_pred(y, yhat)</code> функциясын жазыңыз: нақты мәндер мен болжамдардан MSE қайтарсын.</p><p>Мысалы, <code>mse_pred([10, 20, 30], [12, 18, 33])</code> → <code>17/3 ≈ 5.67</code>.</p>",
   "starter": "def mse_pred(y, yhat):\n    pass\n",
   "solution": "def mse_pred(y, yhat):\n    return sum((p - t) ** 2 for t, p in zip(y, yhat)) / len(y)\n",
   "hints": [
    "<code>(p - t) ** 2</code> қосындысы / n."
   ],
   "check": {
    "tests": "assert abs(mse_pred([10, 20, 30], [12, 18, 33]) - 17 / 3) < 1e-12, \"4 + 4 + 9 = 17, 17 / 3\"\nassert mse_pred([5], [5]) == 0, \"Дәл болжам: 0\"\nassert abs(mse_pred([0, 0], [1, -1]) - 1) < 1e-12, \"Қателер квадратқа шығады: 1\"",
    "mustInclude": [
     "def mse_pred"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "RMSE",
   "prompt": "<p><code>rmse(y, yhat)</code> функциясын жазыңыз: √MSE қайтарсын. RMSE y-пен бірдей өлшем бірлігінде (мысалы, млн ₸), сондықтан түсіндіруге ыңғайлы.</p><p>Мысалы, <code>rmse([3, 5], [0, 1])</code> → √((9 + 16) / 2) ≈ <code>3.54</code>.</p>",
   "starter": "def rmse(y, yhat):\n    pass\n",
   "solution": "def rmse(y, yhat):\n    return (sum((p - t) ** 2 for t, p in zip(y, yhat)) / len(y)) ** 0.5\n",
   "hints": [
    "Алдымен MSE, сосын <code>** 0.5</code>."
   ],
   "check": {
    "tests": "assert abs(rmse([3, 5], [0, 1]) - 12.5 ** 0.5) < 1e-12, \"√12.5 ≈ 3.54\"\nassert abs(rmse([10, 20, 30], [12, 18, 33]) - (17 / 3) ** 0.5) < 1e-12, \"√(17/3) ≈ 2.38\"",
    "mustInclude": [
     "def rmse"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Шеткі мән әсері",
   "prompt": "<p><code>losses(y, yhat)</code> функциясын жазыңыз: <code>(mse, mae)</code> жұбын қайтарсын. Тексерісте бір үлкен қатенің MSE-ге MAE-ден әлдеқайда көп әсер ететінін көресіз.</p>",
   "starter": "def losses(y, yhat):\n    pass\n",
   "solution": "def losses(y, yhat):\n    n = len(y)\n    mse = sum((p - t) ** 2 for t, p in zip(y, yhat)) / n\n    mae = sum(abs(p - t) for t, p in zip(y, yhat)) / n\n    return mse, mae\n",
   "hints": [
    "Екі формуланы бір функцияда есептеңіз."
   ],
   "check": {
    "tests": "_m1, _a1 = losses([10, 10, 10, 10], [11, 9, 11, 9])\nassert abs(_m1 - 1) < 1e-12 and abs(_a1 - 1) < 1e-12, \"Барлық қате 1: MSE = MAE = 1\"\n_m2, _a2 = losses([10, 10, 10, 10], [11, 9, 11, 19])\nassert abs(_m2 - 21) < 1e-12 and abs(_a2 - 3) < 1e-12, \"Бір қате 9 болса: MSE = 21, MAE = 3\"\nassert _m2 / _m1 > 3 * (_a2 / _a1), \"MSE шеткі мәнге сезімтал\"",
    "mustInclude": [
     "def losses"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "b бойынша іздеу",
   "prompt": "<p><code>best_b(w, xs, ys, bs)</code> функциясын жазыңыз: w бекітілген; <code>bs</code> тізіміндегі әр b үшін MSE есептеп, ең кіші MSE беретін b-ны қайтарсын.</p>",
   "starter": "def best_b(w, xs, ys, bs):\n    pass\n",
   "solution": "def mse(w, b, xs, ys):\n    return sum((w * x + b - y) ** 2 for x, y in zip(xs, ys)) / len(xs)\n\ndef best_b(w, xs, ys, bs):\n    return min(bs, key=lambda b: mse(w, b, xs, ys))\n",
   "hints": [
    "Сабақтағы <code>mse</code> функциясын жазыңыз.",
    "<code>min(bs, key=lambda b: mse(w, b, xs, ys))</code>"
   ],
   "check": {
    "tests": "assert best_b(2, [1, 2, 3], [3, 5, 7], [0, 0.5, 1, 1.5]) == 1, \"y = 2x + 1: b = 1\"\nassert best_b(3, [0, 1, 2], [9.8, 13.1, 16.0], [8, 9, 10, 11]) == 10, \"b ≈ 10\"",
    "mustInclude": [
     "def best_b"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең жақсы тұрақты болжам",
   "prompt": "<p>Модельсіз ең қарапайым болжам — барлығына бір сан c. <code>best_const(ys, cands)</code> функциясын жазыңыз: <code>cands</code> ішінен MSE-сі ең кіші c-ны қайтарсын. Тексерісте MSE-ні дәл орташа минималдайтынын көресіз.</p>",
   "starter": "def best_const(ys, cands):\n    pass\n",
   "solution": "def best_const(ys, cands):\n    return min(cands, key=lambda c: sum((c - y) ** 2 for y in ys) / len(ys))\n",
   "hints": [
    "Тұрақты болжам үшін MSE = Σ (c − y)² / n."
   ],
   "check": {
    "tests": "_ys = [3, 7, 8, 12, 20]\n_c = best_const(_ys, [5, 8, 10, 12])\nassert _c == 10, f\"Орташа 10: best_const = 10 болуы керек, сізде {_c}\"\nassert best_const(_ys, [i / 10 for i in range(0, 300)]) == 10.0, \"Тор қаншалықты тығыз болса да, жауап — орташа (10.0)\"",
    "mustInclude": [
     "def best_const"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Екі өлшемді grid search",
   "prompt": "<p><code>grid_search(xs, ys, ws, bs)</code> функциясын жазыңыз: барлық (w, b) жұптарын тексеріп, MSE ең кіші болатын <code>(w, b, mse)</code> үштігін қайтарсын.</p>",
   "starter": "def grid_search(xs, ys, ws, bs):\n    pass\n",
   "solution": "def mse(w, b, xs, ys):\n    return sum((w * x + b - y) ** 2 for x, y in zip(xs, ys)) / len(xs)\n\ndef grid_search(xs, ys, ws, bs):\n    best = None\n    for w in ws:\n        for b in bs:\n            m = mse(w, b, xs, ys)\n            if best is None or m < best[2]:\n                best = (w, b, m)\n    return best\n",
   "hints": [
    "Екі қабатты цикл: <code>for w in ws: for b in bs:</code>.",
    "Ең кіші MSE-ні және оның (w, b)-сын сақтаңыз."
   ],
   "check": {
    "tests": "_xs = [1, 2, 3, 4, 5]\n_ys = [5.1, 6.9, 9.0, 11.2, 12.8]\n_w, _b, _m = grid_search(_xs, _ys, [1.5, 2.0, 2.5], [2, 3, 4])\nassert (_w, _b) == (2.0, 3), f\"y ≈ 2x + 3: (2.0, 3) болуы керек, сізде {(_w, _b)}\"\nassert abs(_m - 0.02) < 1e-9, f\"Ең кіші MSE ≈ 0.02 болуы керек, сізде {_m}\"",
    "mustInclude": [
     "def grid_search"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "MSE-нің сандық градиенті",
   "prompt": "<p><code>mse_grad(w, b, xs, ys)</code> функциясын жазыңыз: MSE-ні (w, b) параметрлерінің функциясы ретінде алып, 7-сабақтағы сандық <code>gradient</code> арқылы <code>[∂MSE/∂w, ∂MSE/∂b]</code> тізімін қайтарсын.</p><p>Тексерісте ол (2/n)·Σ eᵢxᵢ және (2/n)·Σ eᵢ формулаларымен сәйкес келеді (келесі сабақ).</p>",
   "starter": "def mse_grad(w, b, xs, ys):\n    pass\n",
   "solution": "def mse(w, b, xs, ys):\n    return sum((w * x + b - y) ** 2 for x, y in zip(xs, ys)) / len(xs)\n\ndef gradient(f, p, h=1e-5):\n    g = []\n    for i in range(len(p)):\n        up = p[:]\n        down = p[:]\n        up[i] += h\n        down[i] -= h\n        g.append((f(up) - f(down)) / (2 * h))\n    return g\n\ndef mse_grad(w, b, xs, ys):\n    return gradient(lambda p: mse(p[0], p[1], xs, ys), [w, b])\n",
   "hints": [
    "f(p) = mse(p[0], p[1], xs, ys) — тізім қабылдайтын функция.",
    "<code>gradient(lambda p: ..., [w, b])</code>"
   ],
   "check": {
    "tests": "_g = mse_grad(0.0, 0.0, [1, 2, 3], [3, 5, 7])\nassert len(_g) == 2, \"Екі элемент: [∂/∂w, ∂/∂b]\"\nassert abs(_g[0] + 68 / 3) < 1e-4 and abs(_g[1] + 10) < 1e-4, f\"w = b = 0 нүктесінде ≈ [−22.67, −10] болуы керек, сізде {_g}\"\n_g2 = mse_grad(2.0, 1.0, [1, 2, 3], [3, 5, 7])\nassert abs(_g2[0]) < 1e-4 and abs(_g2[1]) < 1e-4, \"Минимумда (w = 2, b = 1) градиент ≈ 0\"",
    "mustInclude": [
     "def mse_grad"
    ]
   }
  }
 ],
 "mm-9": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "dw есептеу",
   "prompt": "<p><code>grad_w(w, b, xs, ys)</code> функциясын жазыңыз: ∂MSE/∂w = (2/n) · Σ eᵢ · xᵢ, мұнда eᵢ = w·xᵢ + b − yᵢ.</p><p>Мысалы, <code>grad_w(0, 0, [1, 2, 3], [3, 5, 7])</code> ≈ <code>−22.67</code>.</p>",
   "starter": "def grad_w(w, b, xs, ys):\n    pass\n",
   "solution": "def grad_w(w, b, xs, ys):\n    n = len(xs)\n    return 2 / n * sum((w * x + b - y) * x for x, y in zip(xs, ys))\n",
   "hints": [
    "eᵢ · xᵢ қосындысын 2/n-ге көбейтіңіз."
   ],
   "check": {
    "tests": "assert abs(grad_w(0, 0, [1, 2, 3], [3, 5, 7]) + 68 / 3) < 1e-9, \"grad_w(0, 0, ...) = −68/3 ≈ −22.67\"\nassert abs(grad_w(2, 1, [1, 2, 3], [3, 5, 7])) < 1e-12, \"Минимумда 0\"",
    "mustInclude": [
     "def grad_w"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "db есептеу",
   "prompt": "<p><code>grad_b(w, b, xs, ys)</code> функциясын жазыңыз: ∂MSE/∂b = (2/n) · Σ eᵢ.</p><p>Мысалы, <code>grad_b(0, 0, [1, 2, 3], [3, 5, 7])</code> → <code>−10.0</code>.</p>",
   "starter": "def grad_b(w, b, xs, ys):\n    pass\n",
   "solution": "def grad_b(w, b, xs, ys):\n    n = len(xs)\n    return 2 / n * sum(w * x + b - y for x, y in zip(xs, ys))\n",
   "hints": [
    "Қателердің қосындысын 2/n-ге көбейтіңіз."
   ],
   "check": {
    "tests": "assert abs(grad_b(0, 0, [1, 2, 3], [3, 5, 7]) + 10) < 1e-9, \"grad_b(0, 0, ...) = −10\"\nassert abs(grad_b(2, 2, [1, 2, 3], [3, 5, 7]) - 2) < 1e-9, \"b бір бірлікке артық: grad_b = 2\"",
    "mustInclude": [
     "def grad_b"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Параметрді жаңарту",
   "prompt": "<p><code>update(param, grad, lr)</code> функциясын жазыңыз: gradient descent ережесі бойынша жаңа мәнді param − lr · grad қайтарсын.</p><p>Мысалы, <code>update(5, 4, 0.25)</code> → <code>4.0</code>.</p>",
   "starter": "def update(param, grad, lr):\n    pass\n",
   "solution": "def update(param, grad, lr):\n    return param - lr * grad\n",
   "hints": [
    "Градиентке қарсы жүреміз: минус."
   ],
   "check": {
    "tests": "assert update(5, 4, 0.25) == 4.0, \"5 − 0.25 · 4 = 4\"\nassert abs(update(0, -10, 0.1) - 1) < 1e-12, \"Градиент теріс болса, параметр өседі: 1\"",
    "mustInclude": [
     "def update"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Loss тарихы",
   "prompt": "<p><code>fit_history(xs, ys, lr, epochs)</code> функциясын жазыңыз: w = b = 0-ден бастап <code>epochs</code> қадам жасап, әр қадамнан <b>кейінгі</b> MSE мәндерінің тізімін қайтарсын (ұзындығы <code>epochs</code>).</p><p>Дұрыс lr кезінде loss кемиді.</p>",
   "starter": "def fit_history(xs, ys, lr, epochs):\n    pass\n",
   "solution": "def mse(w, b, xs, ys):\n    return sum((w * x + b - y) ** 2 for x, y in zip(xs, ys)) / len(xs)\n\ndef fit_history(xs, ys, lr, epochs):\n    w, b = 0.0, 0.0\n    n = len(xs)\n    hist = []\n    for _ in range(epochs):\n        errs = [w * x + b - y for x, y in zip(xs, ys)]\n        dw = 2 / n * sum(e * x for e, x in zip(errs, xs))\n        db = 2 / n * sum(errs)\n        w -= lr * dw\n        b -= lr * db\n        hist.append(mse(w, b, xs, ys))\n    return hist\n",
   "hints": [
    "Сабақтағы <code>fit</code> циклінің соңына <code>hist.append(mse(w, b, xs, ys))</code> қосыңыз."
   ],
   "check": {
    "tests": "_h = fit_history([1, 2, 3, 4, 5], [3, 5, 7, 9, 11], 0.05, 300)\nassert isinstance(_h, list) and len(_h) == 300, \"Ұзындығы epochs = 300 тізім\"\nassert all(_h[_i + 1] <= _h[_i] + 1e-12 for _i in range(299)), \"Loss әр қадамда кемуі керек\"\nassert _h[-1] < 0.01, f\"300 қадамнан кейін MSE < 0.01 болуы керек, сізде {_h[-1]:.4f}\"\n_h1 = fit_history([1, 2, 3], [3, 5, 7], 0.1, 1)\nassert abs(_h1[0] - (sum((68 / 30 * _x + 1 - _y) ** 2 for _x, _y in zip([1, 2, 3], [3, 5, 7])) / 3)) < 1e-9, \"Бірінші мән — бірінші қадамнан кейінгі MSE\"",
    "mustInclude": [
     "def fit_history"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Тек w (b = 0)",
   "prompt": "<p>Бастан өтетін модель ŷ = w · x. <code>fit_w(xs, ys, lr, epochs)</code> функциясын жазыңыз: w = 0-ден бастап, тек w-ны ∂MSE/∂w = (2/n) · Σ eᵢxᵢ бойынша жаңартып, соңғы w-ны қайтарсын.</p><p>Мысалы, Алматыдағы курьер: жол (км) мен уақыт (мин) y ≈ 3x.</p>",
   "starter": "def fit_w(xs, ys, lr, epochs):\n    pass\n",
   "solution": "def fit_w(xs, ys, lr, epochs):\n    w = 0.0\n    n = len(xs)\n    for _ in range(epochs):\n        dw = 2 / n * sum((w * x - y) * x for x, y in zip(xs, ys))\n        w -= lr * dw\n    return w\n",
   "hints": [
    "Қате: eᵢ = w·xᵢ − yᵢ (b жоқ).",
    "Тек w жаңарады."
   ],
   "check": {
    "tests": "assert abs(fit_w([2, 4, 6, 8], [6, 12, 18, 24], 0.01, 500) - 3) < 1e-6, \"y = 3x: w ≈ 3\"\n_w = fit_w([1, 2, 3, 4], [2.9, 6.1, 9.2, 11.8], 0.02, 1000)\n_best = sum(_x * _y for _x, _y in zip([1, 2, 3, 4], [2.9, 6.1, 9.2, 11.8])) / 30\nassert abs(_w - _best) < 1e-6, f\"w ≈ {_best:.4f} болуы керек, сізде {_w:.4f}\"",
    "mustInclude": [
     "def fit_w"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Divergence табу",
   "prompt": "<p><code>diverges(xs, ys, lr, epochs)</code> функциясын жазыңыз: w = b = 0-ден бастап <code>epochs</code> қадам жасап, соңғы MSE бастапқы MSE-ден (w = b = 0 кезіндегі) үлкен болса, <code>True</code> қайтарсын. Бұл lr тым үлкен екенін білдіреді.</p>",
   "starter": "def diverges(xs, ys, lr, epochs):\n    pass\n",
   "solution": "def mse(w, b, xs, ys):\n    return sum((w * x + b - y) ** 2 for x, y in zip(xs, ys)) / len(xs)\n\ndef diverges(xs, ys, lr, epochs):\n    w, b = 0.0, 0.0\n    n = len(xs)\n    start = mse(w, b, xs, ys)\n    for _ in range(epochs):\n        errs = [w * x + b - y for x, y in zip(xs, ys)]\n        dw = 2 / n * sum(e * x for e, x in zip(errs, xs))\n        db = 2 / n * sum(errs)\n        w -= lr * dw\n        b -= lr * db\n    return mse(w, b, xs, ys) > start\n",
   "hints": [
    "Бастапқы MSE-ні цикл алдында сақтаңыз.",
    "Цикл — сабақтағы <code>fit</code>."
   ],
   "check": {
    "tests": "_xs, _ys = [1, 2, 3, 4, 5], [3, 5, 7, 9, 11]\nassert diverges(_xs, _ys, 0.05, 50) is False, \"lr = 0.05: жинақталады\"\nassert diverges(_xs, _ys, 0.2, 50) is True, \"lr = 0.2: loss өседі (divergence)\"\nassert diverges(_xs, _ys, 0.001, 50) is False, \"Кіші lr баяу, бірақ жинақталады\"",
    "mustInclude": [
     "def diverges"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ерте тоқтату",
   "prompt": "<p><code>fit_tol(xs, ys, lr, tol, max_epochs)</code> функциясын жазыңыз: w = b = 0-ден бастап gradient descent жасаңыз; әр қадамнан кейін MSE-нің кемуі <code>tol</code>-дан кіші болса (|алдыңғы − жаңа| &lt; tol), тоқтаңыз. <code>(w, b, epochs_used)</code> қайтарсын, epochs_used ≤ max_epochs.</p>",
   "starter": "def fit_tol(xs, ys, lr, tol, max_epochs):\n    pass\n",
   "solution": "def mse(w, b, xs, ys):\n    return sum((w * x + b - y) ** 2 for x, y in zip(xs, ys)) / len(xs)\n\ndef fit_tol(xs, ys, lr, tol, max_epochs):\n    w, b = 0.0, 0.0\n    n = len(xs)\n    prev = mse(w, b, xs, ys)\n    for epoch in range(1, max_epochs + 1):\n        errs = [w * x + b - y for x, y in zip(xs, ys)]\n        dw = 2 / n * sum(e * x for e, x in zip(errs, xs))\n        db = 2 / n * sum(errs)\n        w -= lr * dw\n        b -= lr * db\n        cur = mse(w, b, xs, ys)\n        if abs(prev - cur) < tol:\n            return w, b, epoch\n        prev = cur\n    return w, b, max_epochs\n",
   "hints": [
    "Әр қадамнан кейін жаңа MSE-ні алдыңғымен салыстырыңыз.",
    "Қадам нөмірін 1-ден санаңыз: <code>range(1, max_epochs + 1)</code>."
   ],
   "check": {
    "tests": "_w, _b, _e = fit_tol([1, 2, 3, 4, 5], [3, 5, 7, 9, 11], 0.05, 1e-10, 5000)\nassert abs(_w - 2) < 0.01 and abs(_b - 1) < 0.02, f\"w ≈ 2, b ≈ 1 болуы керек, сізде {_w:.3f}, {_b:.3f}\"\nassert 50 < _e < 5000, f\"Ерте тоқтау керек: epochs_used = {_e}\"\n_w2, _b2, _e2 = fit_tol([1, 2, 3], [2, 4, 6], 0.01, 1e-20, 30)\nassert _e2 == 30, \"tol өте кіші болса, max_epochs-та тоқтайды\"",
    "mustInclude": [
     "def fit_tol"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Белгіні стандарттау",
   "prompt": "<p>Пәтер ауданы (40–120 м²) үлкен сан, сондықтан gradient descent баяу жүреді. Шешім — стандарттау: x′ = (x − m) / s, мұнда m — орташа, s — <code>statistics.pstdev</code>. <code>fit_scaled(xs, ys, lr, epochs)</code> функциясын жазыңыз: x′ бойынша ŷ = w′x′ + b′ оқытып (w = b = 0-ден), бастапқы бірлікке қайтарып <code>(w, b)</code> қайтарсын: w = w′ / s, b = b′ − w′ · m / s.</p>",
   "starter": "import statistics\n\ndef fit_scaled(xs, ys, lr, epochs):\n    pass\n",
   "solution": "import statistics\n\ndef fit(xs, ys, lr, epochs):\n    w, b = 0.0, 0.0\n    n = len(xs)\n    for _ in range(epochs):\n        errs = [w * x + b - y for x, y in zip(xs, ys)]\n        dw = 2 / n * sum(e * x for e, x in zip(errs, xs))\n        db = 2 / n * sum(errs)\n        w -= lr * dw\n        b -= lr * db\n    return w, b\n\ndef fit_scaled(xs, ys, lr, epochs):\n    m = statistics.mean(xs)\n    s = statistics.pstdev(xs)\n    zs = [(x - m) / s for x in xs]\n    w1, b1 = fit(zs, ys, lr, epochs)\n    return w1 / s, b1 - w1 * m / s\n",
   "hints": [
    "Алдымен сабақтағы <code>fit</code>.",
    "Стандарттап оқытып, соңында w мен b-ны бастапқы бірлікке келтіріңіз."
   ],
   "check": {
    "tests": "_xs = [40, 55, 60, 75, 90, 120]\n_ys = [0.4 * _x + 5 for _x in _xs]\n_w, _b = fit_scaled(_xs, _ys, 0.1, 300)\nassert abs(_w - 0.4) < 1e-3 and abs(_b - 5) < 0.05, f\"y = 0.4x + 5: (0.4, 5) болуы керек, сізде ({_w:.4f}, {_b:.3f})\"",
    "mustInclude": [
     "def fit_scaled"
    ]
   }
  }
 ],
 "mm-10": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Векторлы амал",
   "prompt": "<p>NumPy арқылы <code>combo(u, v, c)</code> функциясын жазыңыз: u + c · v массивін қайтарсын (циклсіз).</p><p>Мысалы, <code>combo(np.array([1, 2]), np.array([10, 20]), 0.5)</code> → <code>array([6., 12.])</code>.</p>",
   "starter": "import numpy as np\n\ndef combo(u, v, c):\n    pass\n",
   "solution": "import numpy as np\n\ndef combo(u, v, c):\n    return u + c * v\n",
   "hints": [
    "NumPy-да <code>u + c * v</code> бірден бүкіл массивке жасалады."
   ],
   "check": {
    "tests": "import numpy as _np\nassert _np.allclose(combo(_np.array([1, 2]), _np.array([10, 20]), 0.5), [6, 12]), \"combo([1, 2], [10, 20], 0.5) = [6, 12]\"\nassert _np.allclose(combo(_np.array([1.0, 1.0, 1.0]), _np.array([1.0, 2.0, 3.0]), -1), [0, -1, -2]), \"c = −1: [0, −1, −2]\"",
    "mustInclude": [
     "def combo"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Массив сипаттамасы",
   "prompt": "<p><code>describe(A)</code> функциясын жазыңыз: NumPy массиві үшін <code>(жол саны, баған саны, элементтер саны)</code> қайтарсын (<code>A.shape</code>, <code>A.size</code>).</p><p>Мысалы, 2 × 3 массив үшін → <code>(2, 3, 6)</code>.</p>",
   "starter": "import numpy as np\n\ndef describe(A):\n    pass\n",
   "solution": "import numpy as np\n\ndef describe(A):\n    rows, cols = A.shape\n    return rows, cols, A.size\n",
   "hints": [
    "<code>rows, cols = A.shape</code>",
    "<code>A.size</code> — барлық элемент саны."
   ],
   "check": {
    "tests": "import numpy as _np\nassert tuple(describe(_np.array([[1, 50, 2], [1, 70, 3]]))) == (2, 3, 6), \"(2, 3, 6) болуы керек\"\nassert tuple(describe(_np.zeros((5, 4)))) == (5, 4, 20), \"(5, 4, 20) болуы керек\"",
    "mustInclude": [
     "def describe"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "NumPy-мен қашықтық",
   "prompt": "<p><code>dist(u, v)</code> функциясын жазыңыз: екі NumPy векторы арасындағы Евклид қашықтығын <code>np.linalg.norm</code> арқылы (циклсіз) қайтарсын.</p><p>Мысалы, <code>dist(np.array([1, 2]), np.array([4, 6]))</code> → <code>5.0</code>.</p>",
   "starter": "import numpy as np\n\ndef dist(u, v):\n    pass\n",
   "solution": "import numpy as np\n\ndef dist(u, v):\n    return np.linalg.norm(u - v)\n",
   "hints": [
    "Айырма векторының ұзындығы: <code>np.linalg.norm(u - v)</code>."
   ],
   "check": {
    "tests": "import numpy as _np\nassert abs(float(dist(_np.array([1, 2]), _np.array([4, 6]))) - 5) < 1e-12, \"dist([1, 2], [4, 6]) = 5\"\nassert abs(float(dist(_np.array([0.0, 0.0, 0.0]), _np.array([1.0, 2.0, 2.0]))) - 3) < 1e-12, \"Үш өлшемде: 3\"",
    "mustInclude": [
     "def dist",
     "np.linalg.norm"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Векторланған MSE",
   "prompt": "<p><code>mse_np(w, b, x, y)</code> функциясын жазыңыз: NumPy массивтерімен циклсіз MSE қайтарсын.</p><p>Мысалы, <code>mse_np(1, 2, np.array([1, 2, 3]), np.array([3, 5, 7]))</code> → <code>5/3 ≈ 1.667</code>.</p>",
   "starter": "import numpy as np\n\ndef mse_np(w, b, x, y):\n    pass\n",
   "solution": "import numpy as np\n\ndef mse_np(w, b, x, y):\n    e = w * x + b - y\n    return (e ** 2).mean()\n",
   "hints": [
    "Қателер бірден: <code>e = w * x + b - y</code>.",
    "<code>(e ** 2).mean()</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nassert abs(float(mse_np(1, 2, _np.array([1, 2, 3]), _np.array([3, 5, 7]))) - 5 / 3) < 1e-12, \"mse_np(1, 2, ...) = 5/3\"\nassert abs(float(mse_np(2, 1, _np.array([1.0, 2.0, 3.0]), _np.array([3.0, 5.0, 7.0])))) < 1e-12, \"Дәл түзу: 0\"",
    "mustInclude": [
     "def mse_np"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең жақын нүкте NumPy-мен",
   "prompt": "<p><code>nearest_np(P, q)</code> функциясын жазыңыз: <code>P</code> — нүктелер массиві (әр жол — бір нүкте), <code>q</code> — векторы. q-ға ең жақын жолдың индексін (бүтін сан) қайтарсын. Әр нүктеге дейінгі қашықтықты <code>np.linalg.norm(p - q)</code> арқылы есептеңіз.</p>",
   "starter": "import numpy as np\n\ndef nearest_np(P, q):\n    pass\n",
   "solution": "import numpy as np\n\ndef nearest_np(P, q):\n    return min(range(len(P)), key=lambda i: np.linalg.norm(P[i] - q))\n",
   "hints": [
    "3-сабақтағы <code>min(range(len(P)), key=...)</code> тәсілі.",
    "Қашықтық: <code>np.linalg.norm(P[i] - q)</code>."
   ],
   "check": {
    "tests": "import numpy as _np\n_P = _np.array([[45, 1], [62, 2], [75, 3], [58, 2], [90, 4]], dtype=float)\nassert int(nearest_np(_P, _np.array([60.0, 2.0]))) in (1, 3), \"[60, 2]-ге [62, 2] мен [58, 2] тең қашықтықта\"\nassert int(nearest_np(_P, _np.array([88.0, 4.0]))) == 4, \"[88, 4]-ке [90, 4] жақын\"\nassert int(nearest_np(_P, _np.array([0.0, 0.0]))) == 0, \"Бастауға [45, 1] жақын\"",
    "mustInclude": [
     "def nearest_np",
     "np.linalg.norm"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Xᵀ · X NumPy-мен",
   "prompt": "<p><code>gram_np(X)</code> функциясын жазыңыз: <code>X.T @ X</code> матрицасын қайтарсын (5-сабақтағы <code>gram</code> бір жолда).</p><p>Мысалы, <code>gram_np(np.array([[1, 2], [1, 3]]))</code> → <code>[[2, 5], [5, 13]]</code>.</p>",
   "starter": "import numpy as np\n\ndef gram_np(X):\n    pass\n",
   "solution": "import numpy as np\n\ndef gram_np(X):\n    return X.T @ X\n",
   "hints": [
    "Transpose: <code>X.T</code>, көбейту: <code>@</code>."
   ],
   "check": {
    "tests": "import numpy as _np\nassert _np.allclose(gram_np(_np.array([[1, 2], [1, 3]])), [[2, 5], [5, 13]]), \"gram_np = [[2, 5], [5, 13]]\"\n_g = gram_np(_np.array([[1, 50, 2], [1, 70, 3], [1, 40, 1]], dtype=float))\nassert _g.shape == (3, 3) and _np.allclose(_g, _g.T), \"3 × 3 симметриялы матрица\"",
    "mustInclude": [
     "def gram_np",
     "@"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Матрицалық GD NumPy-мен",
   "prompt": "<p>Көп белгілі модель ŷ = X @ w (X-те intercept бағаны бар). <code>fit_np(X, y, lr, epochs)</code> функциясын жазыңыз: w нөлдерден басталып (<code>np.zeros</code>), әр қадамда <code>grad = 2 / n * X.T @ (X @ w - y)</code>, <code>w -= lr * grad</code>. Соңғы w массивін қайтарсын.</p>",
   "starter": "import numpy as np\n\ndef fit_np(X, y, lr, epochs):\n    pass\n",
   "solution": "import numpy as np\n\ndef fit_np(X, y, lr, epochs):\n    n = len(y)\n    w = np.zeros(X.shape[1])\n    for _ in range(epochs):\n        grad = 2 / n * X.T @ (X @ w - y)\n        w -= lr * grad\n    return w\n",
   "hints": [
    "<code>w = np.zeros(X.shape[1])</code> — баған санындай нөлдер.",
    "Сабақтағы бір жолдық формула: <code>2 / n * X.T @ (X @ w - y)</code>."
   ],
   "check": {
    "tests": "import numpy as _np\n_X = _np.array([[1, 1, 2], [1, 2, 0], [1, 3, 1], [1, 4, 3], [1, 0, 1]], dtype=float)\n_y = _X @ _np.array([1.0, 2.0, -1.0])\n_w = fit_np(_X, _y, 0.05, 3000)\nassert _w.shape == (3,), \"w ұзындығы — баған саны (3)\"\nassert _np.allclose(_w, [1, 2, -1], atol=1e-3), f\"w ≈ [1, 2, −1] болуы керек, сізде {_w}\"",
    "mustInclude": [
     "def fit_np",
     "@"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Cosine матрицасы NumPy-мен",
   "prompt": "<p><code>cos_matrix(M)</code> функциясын жазыңыз: <code>M</code> жолдары — векторлар. Барлық жұптың cosine similarity матрицасын қайтарсын. Тәсіл: әр жолды өз ұзындығына бөліп (бірлік векторлар), сосын <code>U @ U.T</code>.</p><p>Кеңес: жолдардың ұзындықтары <code>np.linalg.norm(M, axis=1)</code>, ал бөлу үшін <code>M / norms[:, None]</code>.</p>",
   "starter": "import numpy as np\n\ndef cos_matrix(M):\n    pass\n",
   "solution": "import numpy as np\n\ndef cos_matrix(M):\n    norms = np.linalg.norm(M, axis=1)\n    U = M / norms[:, None]\n    return U @ U.T\n",
   "hints": [
    "Бірлік векторлар: <code>U = M / norms[:, None]</code>.",
    "<code>U @ U.T</code> — барлық жұптың dot product-ы."
   ],
   "check": {
    "tests": "import numpy as _np\n_M = _np.array([[1, 0], [0, 1], [1, 1]], dtype=float)\n_C = cos_matrix(_M)\nassert _C.shape == (3, 3), \"3 × 3 матрица болуы керек\"\nassert _np.allclose(_np.diag(_C), 1), \"Диагональ 1\"\nassert abs(_C[0, 1]) < 1e-12 and abs(_C[0, 2] - 2 ** -0.5) < 1e-12, \"[1, 0]·[0, 1] = 0, [1, 0]·[1, 1] ≈ 0.707\"\n_U = _np.array([[4, 0, 2], [8, 1, 4], [0, 5, 1]], dtype=float)\nassert abs(cos_matrix(_U)[0, 1] - 40 / (20 ** 0.5 * 81 ** 0.5)) < 1e-9, \"Aigul мен Daulet ≈ 0.994\"",
    "mustInclude": [
     "def cos_matrix",
     "@"
    ]
   }
  }
 ]
});
