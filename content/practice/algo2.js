// Practice tasks after the lessons of dsa-2. Each lesson's list opens one task at a time.
DJ.addPractice('dsa-2', {
 "alg-1": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Екінші үлкен мән",
   "prompt": "<p><code>second_largest(xs)</code> тізімдегі <b>әртүрлі</b> мәндердің ішіндегі екінші үлкенін қайтарсын; ондай жоқ болса (тізім бос немесе барлық мән тең) <code>None</code>. Бір рет аралап, екі айнымалы ұстаңыз. Алдымен шеткі жағдайларды жазып алыңыз.</p>\n<pre><code>second_largest([3, 9, 7, 9]) → 7\nsecond_largest([5, 5])       → None\nsecond_largest([])           → None</code></pre>",
   "starter": "def second_largest(xs):\n    pass\n",
   "solution": "def second_largest(xs):\n    first = second = None\n    for x in xs:\n        if first is None or x > first:\n            first, second = x, first\n        elif x != first and (second is None or x > second):\n            second = x\n    return second\n",
   "hints": [
    "Жаңа максимум келсе, ескі максимум екінші орынға түседі.",
    "Максимумға тең мән екінші орынды өзгертпеуі керек."
   ],
   "check": {
    "tests": "\nassert second_largest([3, 9, 7, 9]) == 7, 'second_largest([3, 9, 7, 9]) 7'\nassert second_largest([5, 5]) is None, 'Барлығы тең: None'\nassert second_largest([]) is None, 'Бос тізім: None'\nassert second_largest([4]) is None, 'Бір элемент: None'\nassert second_largest([-1, -2]) == -2, 'Теріс сандар: -2'\nassert second_largest([1, 2, 3]) == 2, 'Өсу ретімен: 2'\nassert second_largest([0, 0, -5]) == -5, 'Екінші үлкен -5'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Аралықтардың қиылысы",
   "prompt": "<p>Екі брондау жартылай ашық аралықтармен берілген: <code>[l, r)</code> — <code>l</code> кіреді, <code>r</code> кірмейді. <code>overlap(a, b)</code> олардың ортақ бөлігінің ұзындығын қайтарсын (қиылыспаса 0). Түйісу (<code>[1, 3)</code> және <code>[3, 5)</code>) қиылыс емес.</p>\n<pre><code>overlap((1, 5), (3, 8)) → 2\noverlap((1, 3), (3, 5)) → 0\noverlap((2, 9), (4, 6)) → 2</code></pre>",
   "starter": "def overlap(a, b):\n    pass\n",
   "solution": "def overlap(a, b):\n    return max(0, min(a[1], b[1]) - max(a[0], b[0]))\n",
   "hints": [
    "Ортақ бөлік: <code>[max(l₁, l₂), min(r₁, r₂))</code>.",
    "Теріс ұзындықты 0-ге дейін көтеріңіз."
   ],
   "check": {
    "tests": "\nassert overlap((1, 5), (3, 8)) == 2, 'overlap((1, 5), (3, 8)) 2'\nassert overlap((1, 3), (3, 5)) == 0, 'Түйісу қиылыс емес: 0'\nassert overlap((2, 9), (4, 6)) == 2, 'Бірі екіншісінің ішінде: 2'\nassert overlap((5, 8), (1, 2)) == 0, 'Алыс аралықтар: 0'\nassert overlap((3, 3), (0, 10)) == 0, 'Бос аралық: 0'\nassert overlap((0, 10), (0, 10)) == 10, 'Бірдей аралықтар: 10'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Аралықты тең бөлу",
   "prompt": "<p>Кітапханада <code>[lo, hi)</code> нөмірлі кітаптарды <code>k</code> қызметкерге бөлу керек. <code>split_range(lo, hi, k)</code> <code>k</code> жартылай ашық аралық <code>(l, r)</code> тізімін қайтарсын: олар қатар тұрады, бүкіл <code>[lo, hi)</code>-ты жабады, ұзындықтары ең көбі 1-ге ерекшеленеді, ұзынырақтары алдымен тұрады. Аралық бос болуы мүмкін.</p>\n<pre><code>split_range(0, 10, 3) → [(0, 4), (4, 7), (7, 10)]\nsplit_range(5, 7, 4)  → [(5, 6), (6, 7), (7, 7), (7, 7)]</code></pre>",
   "starter": "def split_range(lo, hi, k):\n    pass\n",
   "solution": "def split_range(lo, hi, k):\n    n = hi - lo\n    q, r = divmod(n, k)\n    res = []\n    start = lo\n    for i in range(k):\n        size = q + (1 if i < r else 0)\n        res.append((start, start + size))\n        start += size\n    return res\n",
   "hints": [
    "<code>q, r = divmod(hi − lo, k)</code>: алғашқы <code>r</code> бөліктің ұзындығы <code>q + 1</code>, қалғаны <code>q</code>.",
    "Келесі бөлік алдыңғысы біткен жерден басталады — жартылай ашық аралықтың артықшылығы."
   ],
   "check": {
    "tests": "\nassert split_range(0, 10, 3) == [(0, 4), (4, 7), (7, 10)], 'Күтілгені [(0, 4), (4, 7), (7, 10)]'\nassert split_range(5, 7, 4) == [(5, 6), (6, 7), (7, 7), (7, 7)], 'Бос бөліктер де болады'\nassert split_range(0, 0, 2) == [(0, 0), (0, 0)], 'Бос аралық'\nassert split_range(3, 9, 1) == [(3, 9)], 'Бір бөлік — бүкіл аралық'\nassert split_range(0, 9, 3) == [(0, 3), (3, 6), (6, 9)], 'Тең бөлінеді'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Екі кестенің қиылысы",
   "prompt": "<p>Екі дәрігердің бос уақыттары: <code>a</code> және <code>b</code> — басы бойынша сұрыпталған, ішінде қиылыспайтын <code>[l, r)</code> аралықтар тізімі. <code>common_free(a, b)</code> екеуі де бос болатын аралықтарды сұрыпталған тізім ретінде қайтарсын (ұзындығы 0 аралықтарды қоспаңыз). Екі көрсеткіш: <code>r</code>-і кіші аралықтың көрсеткішін жылжытыңыз. O(n + m).</p>\n<pre><code>common_free([(0, 2), (5, 10), (13, 23)], [(1, 5), (8, 12), (15, 24)])\n→ [(1, 2), (8, 10), (15, 23)]</code></pre>",
   "starter": "def common_free(a, b):\n    pass\n",
   "solution": "def common_free(a, b):\n    i = j = 0\n    res = []\n    while i < len(a) and j < len(b):\n        lo = max(a[i][0], b[j][0])\n        hi = min(a[i][1], b[j][1])\n        if lo < hi:\n            res.append((lo, hi))\n        if a[i][1] < b[j][1]:\n            i += 1\n        else:\n            j += 1\n    return res\n",
   "hints": [
    "Әр жұп үшін қиылыс: <code>[max(l), min(r))</code>, тек <code>lo &lt; hi</code> болса қосыңыз.",
    "Ертерек бітетін аралық енді басқа ешнәрсемен қиылыспайды — соның көрсеткішін жылжытыңыз."
   ],
   "check": {
    "tests": "\nassert common_free([(0, 2), (5, 10), (13, 23)], [(1, 5), (8, 12), (15, 24)]) == [(1, 2), (8, 10), (15, 23)], 'Күтілгені [(1, 2), (8, 10), (15, 23)]'\nassert common_free([], [(1, 2)]) == [], 'Бір кесте бос: []'\nassert common_free([(1, 3)], [(3, 5)]) == [], 'Түйісу қиылыс емес: []'\nassert common_free([(0, 10)], [(1, 2), (4, 6)]) == [(1, 2), (4, 6)], 'Бір ұзын аралық: [(1, 2), (4, 6)]'\nimport random as _random\n_rng = _random.Random(1)\ndef _mk():\n    pts = sorted(_rng.sample(range(40), 2 * _rng.randint(0, 5)))\n    return [(pts[i], pts[i + 1]) for i in range(0, len(pts), 2)]\nfor _ in range(60):\n    _a, _b = _mk(), _mk()\n    _cells = [x for x in range(40) if any(l <= x < r for l, r in _a) and any(l <= x < r for l, r in _b)]\n    _got = common_free(_a, _b)\n    _gc = [x for l, r in _got for x in range(l, r)]\n    assert _gc == _cells and all(l < r for l, r in _got), f'common_free({_a}, {_b}) қате: {_got}'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жетпейтін нөмірлер аралығы",
   "prompt": "<p>Пойыз билеттерінің нөмірлері <code>[lo, hi)</code> аралығында болуы керек. Сатылғандары <code>sold</code> — өсу ретімен, қайталанусыз, бәрі аралық ішінде. <code>gaps(sold, lo, hi)</code> сатылмаған нөмірлердің аралықтарын <code>(l, r)</code> жартылай ашық түрде, ретімен қайтарсын.</p>\n<pre><code>gaps([0, 1, 3, 50, 75], 0, 100) → [(2, 3), (4, 50), (51, 75), (76, 100)]\ngaps([], 1, 5)                  → [(1, 5)]\ngaps([1, 2, 3], 1, 4)           → []</code></pre>",
   "starter": "def gaps(sold, lo, hi):\n    pass\n",
   "solution": "def gaps(sold, lo, hi):\n    res = []\n    prev = lo\n    for x in sold + [hi]:\n        if x > prev:\n            res.append((prev, x))\n        prev = x + 1\n    return res\n",
   "hints": [
    "<code>prev</code> — келесі бос болуы мүмкін нөмір. Әр сатылған <code>x</code> үшін <code>[prev, x)</code> бос болса, қосыңыз.",
    "Соңғы аралықты ұмытпау үшін тізімнің соңына <code>hi</code>-ді «қақпа» ретінде қосыңыз."
   ],
   "check": {
    "tests": "\nassert gaps([0, 1, 3, 50, 75], 0, 100) == [(2, 3), (4, 50), (51, 75), (76, 100)], 'Күтілгені [(2, 3), (4, 50), (51, 75), (76, 100)]'\nassert gaps([], 1, 5) == [(1, 5)], 'Ештеңе сатылмаса: бүкіл аралық'\nassert gaps([1, 2, 3], 1, 4) == [], 'Барлығы сатылды: []'\nassert gaps([], 3, 3) == [], 'Бос аралық: []'\nassert gaps([9], 0, 10) == [(0, 9)], 'Соңғы нөмір сатылған: [(0, 9)]'\nassert gaps([0], 0, 10) == [(1, 10)], 'Бірінші нөмір сатылған: [(1, 10)]'\n_s = [1, 2, 3]; gaps(_s, 0, 5)\nassert _s == [1, 2, 3], 'Кіріс тізімін өзгертпеңіз'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Мақсатқа ең жақын қосынды",
   "prompt": "<p>Сыйлық сертификаты <code>target</code> теңге. Дүкендегі бағалар <code>prices</code> өсу ретімен сұрыпталған (кемінде 2 тауар). <code>closest_sum(prices, target)</code> екі <b>әртүрлі</b> тауар бағасының қосындысы мен <code>target</code> арасындағы ең кіші айырманы <code>|қосынды − target|</code> қайтарсын. Екі көрсеткіш: O(n).</p>\n<pre><code>closest_sum([500, 1200, 3000, 4500], 5000) → 0       # 500 + 4500 = 5000\nclosest_sum([100, 200, 900], 1250)         → 150     # 200 + 900 = 1100</code></pre>",
   "starter": "def closest_sum(prices, target):\n    pass\n",
   "solution": "def closest_sum(prices, target):\n    i, j = 0, len(prices) - 1\n    best = None\n    while i < j:\n        s = prices[i] + prices[j]\n        d = abs(s - target)\n        if best is None or d < best:\n            best = d\n        if s < target:\n            i += 1\n        elif s > target:\n            j -= 1\n        else:\n            return 0\n    return best\n",
   "hints": [
    "Қосынды <code>target</code>-тен кіші болса — сол көрсеткішті, үлкен болса — оң көрсеткішті жылжытыңыз.",
    "Әр қадамда айырманы жаңартыңыз; тең болса бірден 0."
   ],
   "check": {
    "tests": "\nassert closest_sum([500, 1200, 3000, 4500], 5000) == 0, '500 + 4500 = 5000: айырма 0'\nassert closest_sum([100, 200, 900], 1250) == 150, '200 + 900 = 1100: айырма 150'\nassert closest_sum([1, 2], 100) == 97, 'Екі тауар: 97'\nassert closest_sum([5, 5], 10) == 0, 'Тең бағалар: 0'\nassert closest_sum([10, 20, 30], 5) == 25, 'Ең кіші жұп: 30 − 5 = 25'\nimport random as _random, time as _time\n_rng = _random.Random(2)\nfor _ in range(50):\n    _p = sorted(_rng.randint(0, 50) for _ in range(_rng.randint(2, 10))); _t = _rng.randint(0, 110)\n    _exp = min(abs(_p[i] + _p[j] - _t) for i in range(len(_p)) for j in range(i + 1, len(_p)))\n    assert closest_sum(_p, _t) == _exp, f'closest_sum({_p}, {_t}) {_exp} болуы керек'\n_big = sorted(_rng.randint(0, 10**9) for _ in range(100000))\n_t0 = _time.perf_counter(); closest_sum(_big, 7 * 10**8 + 3); _dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'{_dt:.2f} с: O(n) екі көрсеткіш керек'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Жаңа брондауды кірістіру",
   "prompt": "<p>Конференц-залдың брондаулары <code>bookings</code> — басы бойынша сұрыпталған, қиылыспайтын және түйіспейтін <code>[l, r)</code> аралықтар. <code>insert_booking(bookings, new)</code> жаңа <code>new</code> аралығын қосып, қиылысатын <b>немесе түйісетін</b> аралықтарды біріктірген сұрыпталған тізімді қайтарсын. Сұрыптамай, бір рет аралап O(n): алдымен <code>new</code>-дан толық сол жақтағыларды, сосын біріктірілгенін, сосын оң жақтағыларды.</p>\n<pre><code>insert_booking([(1, 3), (6, 9)], (2, 5))          → [(1, 5), (6, 9)]\ninsert_booking([(1, 2), (3, 5), (6, 7), (8, 10)], (4, 8)) → [(1, 2), (3, 10)]\ninsert_booking([(1, 3)], (3, 4))                 → [(1, 4)]     # түйісу</code></pre>",
   "starter": "def insert_booking(bookings, new):\n    pass\n",
   "solution": "def insert_booking(bookings, new):\n    l, r = new\n    res = []\n    i, n = 0, len(bookings)\n    while i < n and bookings[i][1] < l:\n        res.append(tuple(bookings[i]))\n        i += 1\n    while i < n and bookings[i][0] <= r:\n        l = min(l, bookings[i][0])\n        r = max(r, bookings[i][1])\n        i += 1\n    res.append((l, r))\n    while i < n:\n        res.append(tuple(bookings[i]))\n        i += 1\n    return res\n",
   "hints": [
    "Сол жақта толық тұрады: <code>b.r &lt; new.l</code> (түйісу біріктіріледі, сондықтан <code>&lt;</code>).",
    "Біріктіру шарты: <code>b.l ≤ r</code>; шекараларды <code>min</code>/<code>max</code> арқылы кеңейтіңіз."
   ],
   "check": {
    "tests": "\nassert insert_booking([(1, 3), (6, 9)], (2, 5)) == [(1, 5), (6, 9)], 'Күтілгені [(1, 5), (6, 9)]'\nassert insert_booking([(1, 2), (3, 5), (6, 7), (8, 10)], (4, 8)) == [(1, 2), (3, 10)], 'Күтілгені [(1, 2), (3, 10)]'\nassert insert_booking([(1, 3)], (3, 4)) == [(1, 4)], 'Түйісу біріктіріледі: [(1, 4)]'\nassert insert_booking([], (2, 4)) == [(2, 4)], 'Бос кесте: [(2, 4)]'\nassert insert_booking([(5, 7)], (1, 2)) == [(1, 2), (5, 7)], 'Басына қосу'\nassert insert_booking([(1, 2)], (5, 7)) == [(1, 2), (5, 7)], 'Соңына қосу'\nassert insert_booking([(1, 5)], (2, 3)) == [(1, 5)], 'Ішінде: өзгеріссіз'\nimport random as _random\n_rng = _random.Random(3)\ndef _merge(iv):\n    out = []\n    for l, r in sorted(iv):\n        if out and l <= out[-1][1]:\n            out[-1] = (out[-1][0], max(out[-1][1], r))\n        else:\n            out.append((l, r))\n    return out\nfor _ in range(80):\n    _pts = sorted(_rng.sample(range(1, 60), 2 * _rng.randint(0, 5)))\n    _b = _merge([(_pts[i], _pts[i + 1]) for i in range(0, len(_pts), 2)])\n    _l = _rng.randint(0, 59); _n = (_l, _rng.randint(_l + 1, 61))\n    assert insert_booking(_b, _n) == _merge(_b + [_n]), f'insert_booking({_b}, {_n}) {_merge(_b + [_n])} болуы керек'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Барлығына ортақ бос уақыт",
   "prompt": "<p>Команданың әр мүшесінің бос емес уақыттары <code>schedules[i]</code> — <code>[l, r)</code> аралықтар тізімі (ретсіз болуы мүмкін). Жұмыс күні <code>[day_start, day_end)</code>. <code>team_free(schedules, day_start, day_end)</code> күн ішінде <b>барлығы</b> бос болатын аралықтарды сұрыпталған тізім ретінде қайтарсын. Барлық бос емес аралықтарды бір тізімге жинап, сұрыптап, біріктіріңіз; сосын күн ішіндегі «тесіктерді» табыңыз.</p>\n<pre><code>team_free([[(9, 10), (12, 13)], [(9, 11)], [(15, 17)]], 9, 18)\n→ [(11, 12), (13, 15), (17, 18)]</code></pre>",
   "starter": "def team_free(schedules, day_start, day_end):\n    pass\n",
   "solution": "def team_free(schedules, day_start, day_end):\n    busy = sorted(iv for s in schedules for iv in s)\n    res = []\n    cur = day_start\n    for l, r in busy:\n        l, r = max(l, day_start), min(r, day_end)\n        if l >= r:\n            continue\n        if l > cur:\n            res.append((cur, l))\n        cur = max(cur, r)\n    if cur < day_end:\n        res.append((cur, day_end))\n    return res\n",
   "hints": [
    "Біріктіруді бөлек жасамай-ақ, «осы уақытқа дейін бәрі бос емес» деген <code>cur</code> шекарасын жылжытуға болады.",
    "Күннен тыс аралықтарды <code>[day_start, day_end)</code> ішіне қиып алыңыз."
   ],
   "check": {
    "tests": "\nassert team_free([[(9, 10), (12, 13)], [(9, 11)], [(15, 17)]], 9, 18) == [(11, 12), (13, 15), (17, 18)], 'Күтілгені [(11, 12), (13, 15), (17, 18)]'\nassert team_free([], 9, 18) == [(9, 18)], 'Кесте жоқ: бүкіл күн бос'\nassert team_free([[(8, 19)]], 9, 18) == [], 'Күн толық бос емес: []'\nassert team_free([[(9, 12)], [(12, 18)]], 9, 18) == [], 'Түйіскен аралықтар тесік қалдырмайды: []'\nassert team_free([[(13, 14)], [(10, 11)]], 9, 18) == [(9, 10), (11, 13), (14, 18)], 'Ретсіз кіріс'\nassert team_free([[(5, 7), (20, 22)]], 9, 18) == [(9, 18)], 'Күннен тыс аралықтар: бүкіл күн бос'\nimport random as _random\n_rng = _random.Random(4)\nfor _ in range(60):\n    _sch = [[(l, l + _rng.randint(1, 4)) for l in _rng.sample(range(0, 24), _rng.randint(0, 3))] for _ in range(_rng.randint(0, 3))]\n    _ds, _de = 6, 20\n    _free = [x for x in range(_ds, _de) if not any(l <= x < r for s in _sch for l, r in s)]\n    _got = team_free(_sch, _ds, _de)\n    assert [x for l, r in _got for x in range(l, r)] == _free and all(a[1] < b[0] for a, b in zip(_got, _got[1:])), f'team_free({_sch}, 6, 20) қате: {_got}'\n"
   }
  }
 ],
 "alg-2": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Префикс қосындылар",
   "prompt": "<p><code>prefix_sums(a)</code> ұзындығы <code>len(a) + 1</code> тізім қайтарсын: <code>P[0] = 0</code>, <code>P[i] = a[0] + ... + a[i−1]</code>. Сонда <code>[l, r)</code> аралығының қосындысы — <code>P[r] − P[l]</code>.</p>\n<pre><code>prefix_sums([3, 1, 4, 1]) → [0, 3, 4, 8, 9]\nprefix_sums([])           → [0]</code></pre>",
   "starter": "def prefix_sums(a):\n    pass\n",
   "solution": "def prefix_sums(a):\n    P = [0]\n    for x in a:\n        P.append(P[-1] + x)\n    return P\n",
   "hints": [
    "<code>P = [0]</code>, сосын әр элемент үшін <code>P.append(P[-1] + x)</code>."
   ],
   "check": {
    "tests": "\nassert prefix_sums([3, 1, 4, 1]) == [0, 3, 4, 8, 9], 'Күтілгені [0, 3, 4, 8, 9]'\nassert prefix_sums([]) == [0], 'Бос тізім: [0]'\nassert prefix_sums([-2, 2]) == [0, -2, 0], 'Теріс сандар: [0, -2, 0]'\n_P = prefix_sums(list(range(1, 101)))\nassert len(_P) == 101 and _P[100] - _P[50] == sum(range(51, 101)), 'P[r] − P[l] аралық қосындысын беруі керек'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жоспардан асқан терезелер",
   "prompt": "<p><code>count_windows(sales, k, goal)</code> ұзындығы дәл <code>k</code> болатын қатар терезелердің ішінен қосындысы кемінде <code>goal</code> болатындарының санын қайтарсын. Тұрақты терезе: O(n). <code>k &gt; len(sales)</code> болса 0.</p>\n<pre><code>count_windows([2, 2, 2, 2, 5, 5, 5, 8], 3, 12) → 3\ncount_windows([1, 1], 3, 0)                   → 0</code></pre>",
   "starter": "def count_windows(sales, k, goal):\n    pass\n",
   "solution": "def count_windows(sales, k, goal):\n    if k > len(sales) or k <= 0:\n        return 0\n    s = sum(sales[:k])\n    cnt = 1 if s >= goal else 0\n    for i in range(k, len(sales)):\n        s += sales[i] - sales[i - k]\n        if s >= goal:\n            cnt += 1\n    return cnt\n",
   "hints": [
    "Алғашқы терезе қосындысын бір рет есептеңіз, сосын әр қадамда <code>+ sales[i] − sales[i − k]</code>."
   ],
   "check": {
    "tests": "\nassert count_windows([2, 2, 2, 2, 5, 5, 5, 8], 3, 12) == 3, 'Күтілгені 3'\nassert count_windows([1, 1], 3, 0) == 0, 'k > n: 0'\nassert count_windows([5], 1, 5) == 1, 'Бір терезе, шекарада: 1'\nassert count_windows([1, 2, 3], 3, 7) == 0, 'Жоспар орындалмайды: 0'\nassert count_windows([-1, 4, -1, 4], 2, 3) == 3, 'Теріс мәндер: 3'\nimport time as _time\n_big = list(range(200000))\n_t0 = _time.perf_counter(); _r = count_windows(_big, 1000, 10**8); _dt = _time.perf_counter() - _t0\nassert _r == 99500 and _dt < 1.0, f'Үлкен тест: 99500 күтілді, O(n) терезе ({_dt:.2f} с)'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ең суық апта",
   "prompt": "<p><code>temps</code> — Астанадағы күндік температура. <code>coldest_week(temps)</code> 7 күндік терезелердің ішінде <b>аяздың</b> (температура &lt; 0) ең көп күнін қайтарсын. 7 күннен аз болса 0. Тұрақты терезе: санауышқа кірген күнді қосып, шыққанын шегеріңіз.</p>\n<pre><code>coldest_week([-5, -3, 2, -1, -7, 0, 1, -2, -4, -6]) → 5</code></pre>",
   "starter": "def coldest_week(temps):\n    pass\n",
   "solution": "def coldest_week(temps):\n    k = 7\n    if len(temps) < k:\n        return 0\n    cur = sum(1 for x in temps[:k] if x < 0)\n    best = cur\n    for i in range(k, len(temps)):\n        cur += (temps[i] < 0) - (temps[i - k] < 0)\n        best = max(best, cur)\n    return best\n",
   "hints": [
    "<code>(x &lt; 0)</code> — <code>True</code>/<code>False</code>, яғни 1/0: оны тікелей қосуға болады."
   ],
   "check": {
    "tests": "\nassert coldest_week([-5, -3, 2, -1, -7, 0, 1, -2, -4, -6]) == 5, 'Күтілгені 5'\nassert coldest_week([-5, -3, 2, -1, -7, 0, 1, -2, -4]) == 4, 'Күтілгені 4'\nassert coldest_week([1, 2, 3]) == 0, '7 күннен аз: 0'\nassert coldest_week([-1] * 7) == 7, 'Бүкіл апта аяз: 7'\nassert coldest_week([0] * 10) == 0, '0 аяз емес: 0'\nassert coldest_week([-1, 5, 5, 5, 5, 5, 5, -1]) == 1, 'Күтілгені 1'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Анаграмма орындары",
   "prompt": "<p><code>anagram_starts(s, p)</code> <code>s</code>-та <code>p</code>-ның анаграммасы (сол таңбалардан сол санмен) болатын ішкі жолдардың бастапқы индекстерін өсу ретімен қайтарсын. Ұзындығы <code>len(p)</code> тұрақты терезе және таңба санауыштары: O(n).</p>\n<pre><code>anagram_starts('cbaebabacd', 'abc') → [0, 6]\nanagram_starts('абаба', 'аб')       → [0, 1, 2, 3]</code></pre>",
   "starter": "def anagram_starts(s, p):\n    pass\n",
   "solution": "def anagram_starts(s, p):\n    k = len(p)\n    if k == 0 or k > len(s):\n        return []\n    need = {}\n    for ch in p:\n        need[ch] = need.get(ch, 0) + 1\n    win = {}\n    res = []\n    for i, ch in enumerate(s):\n        win[ch] = win.get(ch, 0) + 1\n        if i >= k:\n            out = s[i - k]\n            win[out] -= 1\n            if win[out] == 0:\n                del win[out]\n        if i >= k - 1 and win == need:\n            res.append(i - k + 1)\n    return res\n",
   "hints": [
    "Терезе санауышы <code>win</code> және үлгі санауышы <code>need</code>; санауыш 0 болса кілтті өшіріңіз, сонда <code>win == need</code> салыстыруы дұрыс.",
    "Сөздікті салыстыру O(әліпби), бұл тұрақты."
   ],
   "check": {
    "tests": "\nassert anagram_starts('cbaebabacd', 'abc') == [0, 6], 'Күтілгені [0, 6]'\nassert anagram_starts('абаба', 'аб') == [0, 1, 2, 3], 'Күтілгені [0, 1, 2, 3]'\nassert anagram_starts('a', 'ab') == [], 'p ұзынырақ: []'\nassert anagram_starts('aaa', 'a') == [0, 1, 2], 'Күтілгені [0, 1, 2]'\nassert anagram_starts('abc', 'd') == [], 'Жоқ: []'\nimport random as _random, time as _time\n_rng = _random.Random(1)\nfor _ in range(40):\n    _s = ''.join(_rng.choice('аб') for _ in range(_rng.randint(0, 12))); _p = ''.join(_rng.choice('аб') for _ in range(_rng.randint(1, 4)))\n    _exp = [i for i in range(len(_s) - len(_p) + 1) if sorted(_s[i:i + len(_p)]) == sorted(_p)]\n    assert anagram_starts(_s, _p) == _exp, f'anagram_starts({_s!r}, {_p!r}) {_exp} болуы керек'\n_s = ''.join(_rng.choice('abcde') for _ in range(100000))\n_t0 = _time.perf_counter(); anagram_starts(_s, 'abcdeabcde' * 50); _dt = _time.perf_counter() - _t0\nassert _dt < 2.0, f'{_dt:.2f} с: терезені жылжытыңыз, әр позицияда қайта санамаңыз'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Терезедегі әртүрлі сандар",
   "prompt": "<p>Дүкенге күн сайын келген тауар түрлері <code>a</code>. <code>distinct_in_windows(a, k)</code> ұзындығы <code>k</code> әр терезедегі <b>әртүрлі</b> мәндер санының тізімін қайтарсын. Сөздік-санауыш: терезеге кіргенді қосып, шыққанын азайтыңыз (0 болса өшіріңіз), <code>len(сөздік)</code> — жауап. O(n).</p>\n<pre><code>distinct_in_windows([1, 2, 1, 3, 4, 2, 3], 4) → [3, 4, 4, 3]\ndistinct_in_windows([5, 5], 3)              → []</code></pre>",
   "starter": "def distinct_in_windows(a, k):\n    pass\n",
   "solution": "def distinct_in_windows(a, k):\n    if k <= 0 or k > len(a):\n        return []\n    cnt = {}\n    res = []\n    for i, x in enumerate(a):\n        cnt[x] = cnt.get(x, 0) + 1\n        if i >= k:\n            y = a[i - k]\n            cnt[y] -= 1\n            if cnt[y] == 0:\n                del cnt[y]\n        if i >= k - 1:\n            res.append(len(cnt))\n    return res\n",
   "hints": [
    "Терезеден шыққан мәннің санауышы 0 болса, оны сөздіктен <code>del</code> арқылы өшіріңіз."
   ],
   "check": {
    "tests": "\nassert distinct_in_windows([1, 2, 1, 3, 4, 2, 3], 4) == [3, 4, 4, 3], 'Күтілгені [3, 4, 4, 3]'\nassert distinct_in_windows([5, 5], 3) == [], 'k > n: []'\nassert distinct_in_windows([7, 7, 7], 2) == [1, 1], 'Бірдей мәндер: [1, 1]'\nassert distinct_in_windows([1, 2, 3], 1) == [1, 1, 1], 'k = 1: [1, 1, 1]'\nimport random as _random, time as _time\n_rng = _random.Random(2)\nfor _ in range(40):\n    _x = [_rng.randint(0, 5) for _ in range(_rng.randint(0, 12))]; _k = _rng.randint(1, 5)\n    _exp = [len(set(_x[i:i + _k])) for i in range(len(_x) - _k + 1)] if _k <= len(_x) else []\n    assert distinct_in_windows(_x, _k) == _exp, f'distinct_in_windows({_x}, {_k}) {_exp} болуы керек'\n_big = [_rng.randint(0, 1000) for _ in range(100000)]\n_t0 = _time.perf_counter(); distinct_in_windows(_big, 5000); _dt = _time.perf_counter() - _t0\nassert _dt < 1.5, f'{_dt:.2f} с: әр терезеге set құрмаңыз, санауышты жылжытыңыз'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Аралыққа жеңілдік қосу",
   "prompt": "<p>Дүкенде <code>n</code> тауар (<code>0..n−1</code>), басында бағалары 0. <code>updates</code> — <code>(l, r, v)</code>: <code>[l, r)</code> тауарларының бағасына <code>v</code> қосылады. <code>apply_updates(n, updates)</code> соңғы бағалар тізімін қайтарсын. Әр жаңартуды циклмен қолдану O(n·q) — баяу. Айырма массиві: <code>diff[l] += v</code>, <code>diff[r] −= v</code>, соңында prefix sum. O(n + q).</p>\n<pre><code>apply_updates(5, [(1, 4, 2), (0, 2, 3), (3, 5, -1)]) → [3, 5, 2, 1, -1]</code></pre>",
   "starter": "def apply_updates(n, updates):\n    pass\n",
   "solution": "def apply_updates(n, updates):\n    diff = [0] * (n + 1)\n    for l, r, v in updates:\n        diff[l] += v\n        diff[r] -= v\n    res = []\n    s = 0\n    for i in range(n):\n        s += diff[i]\n        res.append(s)\n    return res\n",
   "hints": [
    "<code>diff</code> ұзындығы <code>n + 1</code>: <code>r = n</code> болғанда да шекарадан шықпайсыз.",
    "Соңғы баға — <code>diff</code>-тің префикс қосындысы."
   ],
   "check": {
    "tests": "\nassert apply_updates(5, [(1, 4, 2), (0, 2, 3), (3, 5, -1)]) == [3, 5, 2, 1, -1], 'Күтілгені [3, 5, 2, 1, -1]'\nassert apply_updates(3, []) == [0, 0, 0], 'Жаңарту жоқ: нөлдер'\nassert apply_updates(0, []) == [], 'n = 0: []'\nassert apply_updates(4, [(2, 2, 5)]) == [0, 0, 0, 0], 'Бос аралық ештеңе өзгертпейді'\nassert apply_updates(3, [(0, 3, 1), (0, 3, 1)]) == [2, 2, 2], 'Бүкіл аралық екі рет'\nimport random as _random, time as _time\n_rng = _random.Random(3)\nfor _ in range(30):\n    _n = _rng.randint(1, 10); _u = []\n    for _ in range(_rng.randint(0, 6)):\n        _l = _rng.randint(0, _n); _u.append((_l, _rng.randint(_l, _n), _rng.randint(-5, 5)))\n    _exp = [sum(v for l, r, v in _u if l <= i < r) for i in range(_n)]\n    assert apply_updates(_n, _u) == _exp, f'apply_updates({_n}, {_u}) {_exp} болуы керек'\n_u = [(0, 100000, 1)] * 100000\n_t0 = _time.perf_counter(); _r = apply_updates(100000, _u); _dt = _time.perf_counter() - _t0\nassert _r[0] == 100000 and _dt < 1.0, f'10^5 жаңарту, n = 10^5: айырма массиві керек ({_dt:.2f} с)'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Қосындысы k ең ұзын кезең",
   "prompt": "<p><code>balance</code> — күндік кіріс/шығын (теріс болуы мүмкін). <code>longest_sum(balance, k)</code> қосындысы дәл <code>k</code> болатын ең ұзын қатар кезеңнің ұзындығын қайтарсын; жоқ болса 0. Теріс сандар болғандықтан sliding window жарамайды: prefix sum + әр префикс мәнінің <b>бірінші</b> индексі сақталған сөздік. O(n).</p>\n<pre><code>longest_sum([1, -1, 5, -2, 3], 3) → 4    # [1, -1, 5, -2]\nlongest_sum([-2, -1, 2, 1], 1)    → 2\nlongest_sum([1, 2], 7)            → 0</code></pre>",
   "starter": "def longest_sum(balance, k):\n    pass\n",
   "solution": "def longest_sum(balance, k):\n    first = {0: -1}\n    s = 0\n    best = 0\n    for i, x in enumerate(balance):\n        s += x\n        if s - k in first:\n            best = max(best, i - first[s - k])\n        if s not in first:\n            first[s] = i\n    return best\n",
   "hints": [
    "<code>P[j] − P[i] = k</code> ⇔ <code>P[i] = P[j] − k</code>.",
    "Ең ұзын кезең үшін әр префикс мәнінің <b>ең бірінші</b> индексін сақтаңыз; <code>first = {0: -1}</code>."
   ],
   "check": {
    "tests": "\nassert longest_sum([1, -1, 5, -2, 3], 3) == 4, 'Күтілгені 4'\nassert longest_sum([-2, -1, 2, 1], 1) == 2, 'Күтілгені 2'\nassert longest_sum([1, 2], 7) == 0, 'Жоқ: 0'\nassert longest_sum([], 0) == 0, 'Бос тізім: 0'\nassert longest_sum([0, 0, 0], 0) == 3, 'Нөлдер: 3'\nassert longest_sum([3], 3) == 1, 'Бір элемент: 1'\nimport random as _random, time as _time\n_rng = _random.Random(4)\nfor _ in range(60):\n    _x = [_rng.randint(-4, 4) for _ in range(_rng.randint(0, 12))]; _k = _rng.randint(-4, 6)\n    _exp = max([j - i for i in range(len(_x)) for j in range(i + 1, len(_x) + 1) if sum(_x[i:j]) == _k] + [0])\n    assert longest_sum(_x, _k) == _exp, f'longest_sum({_x}, {_k}) {_exp} болуы керек'\n_big = [_rng.randint(-100, 100) for _ in range(200000)]\n_t0 = _time.perf_counter(); longest_sum(_big, 50); _dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'{_dt:.2f} с: O(n) шешім керек'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Қосындысы берілген тіктөртбұрыштар",
   "prompt": "<p>Егістік учаскелерінің өнімі <code>grid</code> (<code>R × C</code>, теріс болуы мүмкін, <code>R, C ≤ 30</code>). <code>count_rects(grid, target)</code> қосындысы дәл <code>target</code> болатын тікбұрышты ішкі матрицалардың санын қайтарсын. Жолдардың әр жұбы <code>(top, bottom)</code> үшін бағандар қосындыларын бір өлшемді тізімге жинап, «қосындысы k ішкі тізімдер санын» prefix sum + сөздікпен санаңыз: O(R²·C).</p>\n<pre><code>count_rects([[0, 1, 0],\n             [1, 1, 1],\n             [0, 1, 0]], 0) → 4\ncount_rects([[1, -1],\n             [-1, 1]], 0)   → 5</code></pre>",
   "starter": "def count_rects(grid, target):\n    pass\n",
   "solution": "def count_rects(grid, target):\n    R = len(grid)\n    C = len(grid[0]) if R else 0\n    total = 0\n    for top in range(R):\n        col = [0] * C\n        for bottom in range(top, R):\n            row = grid[bottom]\n            for j in range(C):\n                col[j] += row[j]\n            seen = {0: 1}\n            s = 0\n            for v in col:\n                s += v\n                total += seen.get(s - target, 0)\n                seen[s] = seen.get(s, 0) + 1\n    return total\n",
   "hints": [
    "<code>top</code> бекітілгенде <code>bottom</code>-ды төмен жылжытып, <code>col[j]</code> баған қосындыларын жаңартып отырыңыз.",
    "Әр <code>(top, bottom)</code> үшін <code>col</code> — бір өлшемді есеп: <code>seen = {0: 1}</code> және <code>total += seen.get(s − target, 0)</code>."
   ],
   "check": {
    "tests": "\nassert count_rects([[0, 1, 0], [1, 1, 1], [0, 1, 0]], 0) == 4, 'Күтілгені 4 (төрт бұрыштағы 0)'\nassert count_rects([[1, -1], [-1, 1]], 0) == 5, 'Күтілгені 5'\nassert count_rects([[904]], 0) == 0, 'Бір ұяшық: 0'\nassert count_rects([[5]], 5) == 1, 'Бір ұяшық: 1'\nassert count_rects([], 0) == 0, 'Бос тор: 0'\nimport random as _random, time as _time\n_rng = _random.Random(5)\nfor _ in range(25):\n    _R, _C = _rng.randint(1, 4), _rng.randint(1, 4)\n    _g = [[_rng.randint(-2, 2) for _ in range(_C)] for _ in range(_R)]; _t = _rng.randint(-2, 3)\n    _exp = sum(1 for a in range(_R) for b in range(a, _R) for c in range(_C) for d in range(c, _C)\n               if sum(_g[i][j] for i in range(a, b + 1) for j in range(c, d + 1)) == _t)\n    assert count_rects(_g, _t) == _exp, f'count_rects({_g}, {_t}) {_exp} болуы керек'\n_g = [[_rng.randint(-5, 5) for _ in range(30)] for _ in range(30)]\n_t0 = _time.perf_counter(); count_rects(_g, 3); _dt = _time.perf_counter() - _t0\nassert _dt < 2.0, f'30×30 үшін {_dt:.2f} с: O(R²·C) шешім керек'\n"
   }
  }
 ],
 "alg-3": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Полиномдық хэш",
   "prompt": "<p>Өз hash function-ымызды жазамыз. <code>poly_hash(s, base, m)</code>: <code>h = 0</code>, әр таңба үшін <code>h = (h * base + ord(ch)) % m</code> (Горнер схемасы). Нәтижені қайтарыңыз. Python-ның <code>hash()</code>-ін қолданбаңыз: жолдар үшін ол әр іске қосылғанда өзгереді.</p>\n<pre><code>poly_hash('ab', 31, 1000)  → 135    # (97 · 31 + 98) % 1000\npoly_hash('', 31, 1000)    → 0</code></pre>",
   "starter": "def poly_hash(s, base, m):\n    pass\n",
   "solution": "def poly_hash(s, base, m):\n    h = 0\n    for ch in s:\n        h = (h * base + ord(ch)) % m\n    return h\n",
   "hints": [
    "Әр қадамда <code>% m</code> алыңыз — сан шексіз өсіп кетпейді."
   ],
   "check": {
    "tests": "\nassert poly_hash('ab', 31, 1000) == (97 * 31 + 98) % 1000, \"poly_hash('ab', 31, 1000) 135 болуы керек\"\nassert poly_hash('', 31, 1000) == 0, 'Бос жол: 0'\nassert poly_hash('a', 31, 1000) == 97, \"poly_hash('a', 31, 1000) 97\"\nassert poly_hash('абай', 131, 10**9 + 7) == ((((1072 * 131 + 1073) * 131 + 1072) * 131 + 1081) % (10**9 + 7)), 'Кириллица хэші қате'\nassert poly_hash('ab', 31, 1000) != poly_hash('ba', 31, 1000), 'Таңбалар реті хэшке әсер етуі керек'\nassert 0 <= poly_hash('x' * 5000, 257, 97) < 97, 'Нәтиже [0, m) аралығында болуы керек'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ұяшықтардың толуы",
   "prompt": "<p>Бүтін кілттер <code>m</code> ұяшықты кестеге <code>key % m</code> бойынша таратылады. <code>bucket_sizes(keys, m)</code> ұзындығы <code>m</code> тізім қайтарсын: <code>i</code>-ұяшыққа неше кілт түседі. Теріс кілттер үшін Python-ның <code>%</code> теріс емес қалдық береді.</p>\n<pre><code>bucket_sizes([10, 18, 3, 26, 5], 8) → [0, 0, 3, 1, 0, 1, 0, 0]</code></pre>",
   "starter": "def bucket_sizes(keys, m):\n    pass\n",
   "solution": "def bucket_sizes(keys, m):\n    sizes = [0] * m\n    for k in keys:\n        sizes[k % m] += 1\n    return sizes\n",
   "hints": [
    "<code>sizes = [0] * m</code>; әр кілт үшін <code>sizes[k % m] += 1</code>."
   ],
   "check": {
    "tests": "\nassert bucket_sizes([10, 18, 3, 26, 5], 8) == [0, 0, 3, 1, 0, 1, 0, 0], '10, 18, 26 — бәрі 2-ұяшықта'\nassert bucket_sizes([], 3) == [0, 0, 0], 'Кілт жоқ: нөлдер'\nassert bucket_sizes([-1, 7], 4) == [0, 0, 0, 2], '-1 % 4 = 3 және 7 % 4 = 3'\nassert bucket_sizes([0, 1, 2], 1) == [3], 'Бір ұяшық'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Соқтығысулар саны",
   "prompt": "<p><code>collisions(keys, m)</code>: кілттер ретімен <code>m</code> ұяшықты chaining кестесіне <code>key % m</code> бойынша қосылады. Қосылған сәтте ұяшығы бос емес болатын кілттер саны — соқтығысулар. Соны қайтарыңыз. Қайталанған кілт жаңа элемент саналмайды (өзгертіледі, соқтығыс емес).</p>\n<pre><code>collisions([10, 18, 3, 26, 10], 8) → 2     # 18 және 26; екінші 10 — бар кілт\ncollisions([1, 2, 3], 8)           → 0</code></pre>",
   "starter": "def collisions(keys, m):\n    pass\n",
   "solution": "def collisions(keys, m):\n    buckets = [set() for _ in range(m)]\n    c = 0\n    for k in keys:\n        b = buckets[k % m]\n        if k in b:\n            continue\n        if b:\n            c += 1\n        b.add(k)\n    return c\n",
   "hints": [
    "Әр ұяшықта кілттер жиынын ұстаңыз.",
    "Кілт бұрыннан бар болса — өткізіңіз; ұяшықта басқа кілт бар болса — соқтығыс."
   ],
   "check": {
    "tests": "\nassert collisions([10, 18, 3, 26, 10], 8) == 2, 'Күтілгені 2'\nassert collisions([1, 2, 3], 8) == 0, 'Соқтығыс жоқ: 0'\nassert collisions([], 4) == 0, 'Кілт жоқ: 0'\nassert collisions([5, 5, 5], 2) == 0, 'Бір кілт қайталанса: 0'\nassert collisions([0, 4, 8, 12], 4) == 3, 'Барлығы 0-ұяшықта: 3'\nassert collisions([0, 4, 8, 12], 1) == 3, 'm = 1: 3'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Linear probing іздеу",
   "prompt": "<p>Linear probing кестесі <code>table</code>: ұзындығы <code>m</code> тізім, әр ұяшықта <code>None</code> (бос) немесе <code>(key, value)</code>. Бүтін кілттің бастапқы ұяшығы — <code>key % m</code>. <code>probe_get(table, key)</code> мәнді қайтарсын, кілт жоқ болса <code>None</code>. Бастапқы ұяшықтан бастап <code>(i + 1) % m</code> жүріңіз: бос ұяшыққа жетсеңіз немесе бүкіл кестені айналып шықсаңыз — кілт жоқ.</p>\n<pre><code>table = [(8, 'Тараз'), None, (2, 'Орал'), (10, 'Атырау'), None, None, None, (7, 'Жезқазған')]\nprobe_get(table, 10) → 'Атырау'    # 10 % 8 = 2 — бос емес, 3-те табылды\nprobe_get(table, 15) → None        # 7 → 0 → 1 (бос)</code></pre>",
   "starter": "def probe_get(table, key):\n    pass\n",
   "solution": "def probe_get(table, key):\n    m = len(table)\n    i = key % m\n    for _ in range(m):\n        cell = table[i]\n        if cell is None:\n            return None\n        if cell[0] == key:\n            return cell[1]\n        i = (i + 1) % m\n    return None\n",
   "hints": [
    "Бос ұяшық <code>None</code> — тізбектің соңы: одан әрі іздеу мағынасыз.",
    "Толық кестеде шексіз айналмау үшін ең көбі <code>m</code> қадам."
   ],
   "check": {
    "tests": "\n_t = [(8, 'Тараз'), None, (2, 'Орал'), (10, 'Атырау'), None, None, None, (7, 'Жезқазған')]\nassert probe_get(_t, 10) == 'Атырау', \"probe_get(table, 10) 'Атырау'\"\nassert probe_get(_t, 15) is None, '15 жоқ: None'\nassert probe_get(_t, 8) == 'Тараз', \"8 % 8 = 0: 'Тараз'\"\nassert probe_get(_t, 7) == 'Жезқазған', \"probe_get(table, 7) 'Жезқазған'\"\nassert probe_get(_t, 18) is None, '18: 2 → 3 → 4 (бос), None'\n_full = [(0, 'a'), (1, 'b'), (2, 'c')]\nassert probe_get(_full, 5) is None, 'Толық кестеде жоқ кілт: шексіз цикл болмауы керек, None'\nassert probe_get(_full, 2) == 'c', \"probe_get(_full, 2) 'c'\"\nassert probe_get([None] * 4, 3) is None, 'Бос кесте: None'\n_wrap = [(3, 'x'), None, None, (7, 'y')]\nassert probe_get(_wrap, 7) == 'y' and probe_get(_wrap, 3) == 'x', 'Соңынан басына айналу'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Кестені қайта құру",
   "prompt": "<p>Chaining кестесі <code>buckets</code> — тізімдер тізімі, әр ұяшықта <code>(key, value)</code> жұптары (бүтін кілттер). <code>rehash(buckets, new_m)</code> барлық жұпты <code>new_m</code> ұяшықты жаңа кестеге <code>key % new_m</code> бойынша көшірсін. Ескі ұяшықтарды 0-ден бастап ретімен, әр ұяшық ішін ретімен аралаңыз (сонда әр жаңа ұяшықта рет анықталған). Ескі кестені өзгертпеңіз.</p>\n<pre><code>rehash([[(4, 'a')], [(1, 'b'), (5, 'c')], [], []], 8)\n→ [[], [(1, 'b')], [], [], [(4, 'a')], [(5, 'c')], [], []]</code></pre>",
   "starter": "def rehash(buckets, new_m):\n    pass\n",
   "solution": "def rehash(buckets, new_m):\n    new = [[] for _ in range(new_m)]\n    for b in buckets:\n        for k, v in b:\n            new[k % new_m].append((k, v))\n    return new\n",
   "hints": [
    "<code>[[] for _ in range(new_m)]</code> — <code>[[]] * new_m</code> емес (бір тізімнің көшірмелері болып кетеді!).",
    "Индексті жаңа <code>new_m</code> бойынша қайта есептеңіз."
   ],
   "check": {
    "tests": "\nassert rehash([[(4, 'a')], [(1, 'b'), (5, 'c')], [], []], 8) == [[], [(1, 'b')], [], [], [(4, 'a')], [(5, 'c')], [], []], 'Жаңа кесте қате'\nassert rehash([[], []], 3) == [[], [], []], 'Бос кесте'\n_old = [[(2, 'x'), (6, 'y')], []]\n_new = rehash(_old, 2)\nassert _new == [[(2, 'x'), (6, 'y')], []], 'new_m = 2: бәрі 0-ұяшықта, рет сақталады'\nassert _old == [[(2, 'x'), (6, 'y')], []], 'Ескі кестені өзгертпеңіз'\n_n = rehash([[(1, 1)]], 4); _n[0].append(9)\nassert _n[1] == [(1, 1)] and _n[2] == [] and _n[3] == [], 'Ұяшықтар бөлек тізімдер болуы керек ([[]] * m қатесі)'\n_old = [[(k, k) for k in range(i, 100, 4)] for i in range(4)]\n_new = rehash(_old, 16)\nassert all(k % 16 == i for i, b in enumerate(_new) for k, v in b) and sum(map(len, _new)) == 100, 'Әр кілт өз ұяшығында болуы керек'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Квадраттық probing",
   "prompt": "<p>Open addressing-тің тағы бір түрі: <b>quadratic probing</b>. Кілттің <code>i</code>-сынағы <code>(key % m + i * i) % m</code> ұяшығына қарайды (<code>i = 0, 1, 2, ..., m−1</code>). <code>quad_insert(table, key)</code> кілтті бірінші бос (<code>None</code>) ұяшыққа жазып, индексін қайтарсын; кілт бұрыннан бар болса — оның индексін (қайта жазбай); ешбір сынақта орын табылмаса — <code>-1</code>.</p>\n<pre><code>t = [None] * 7\nquad_insert(t, 10) → 3\nquad_insert(t, 17) → 4     # 3 бос емес, (3 + 1) % 7 = 4\nquad_insert(t, 24) → 0     # 3, 4 бос емес, (3 + 4) % 7 = 0</code></pre>",
   "starter": "def quad_insert(table, key):\n    pass\n",
   "solution": "def quad_insert(table, key):\n    m = len(table)\n    h = key % m\n    for i in range(m):\n        j = (h + i * i) % m\n        if table[j] is None:\n            table[j] = key\n            return j\n        if table[j] == key:\n            return j\n    return -1\n",
   "hints": [
    "<code>h = key % m</code>, сынақ: <code>(h + i * i) % m</code>.",
    "Бар кілтке тап болсаңыз, оның индексін қайтарыңыз."
   ],
   "check": {
    "tests": "\n_t = [None] * 7\nassert quad_insert(_t, 10) == 3, 'quad_insert(t, 10) 3'\nassert quad_insert(_t, 17) == 4, 'quad_insert(t, 17) 4'\nassert quad_insert(_t, 24) == 0, 'quad_insert(t, 24) 0'\nassert _t == [24, None, None, 10, 17, None, None], f'Кесте күйі қате: {_t}'\nassert quad_insert(_t, 17) == 4 and _t.count(17) == 1, 'Бар кілт қайта жазылмайды'\n_t2 = [None] * 4\nfor _k in (0, 4, 8):\n    quad_insert(_t2, _k)\nassert _t2 == [0, 4, None, None] or _t2.count(None) == 2, 'm = 4: сынақтар 0, 1, 0, 1 — тек екі орын'\nassert quad_insert([None] * 4, 2) == 2, 'Бос кестеде бастапқы ұяшық'\n_t3 = [0, 4, None, None]\nassert quad_insert(_t3, 8) == -1 and _t3 == [0, 4, None, None], 'm = 4 үшін 8-ге орын табылмайды: -1, кесте өзгермейді'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Tombstone-ды жиын",
   "prompt": "<p>Linear probing арқылы <code>ProbingSet</code> (бүтін сандар жиыны) жазыңыз, <code>set</code>/<code>dict</code> қолданбай. Бастапқы сыйымдылық 8. Әдістер: <code>add(x)</code>, <code>contains(x)</code>, <code>remove(x)</code> (жоқ болса ештеңе істемейді), <code>__len__</code>. Өшіргенде ұяшықты <code>None</code> емес, арнайы <b>tombstone</b> белгісімен (мысалы, <code>DELETED = object()</code>) белгілеңіз — әйтпесе одан кейінгі кілттер «жоғалады». Элементтер мен tombstone-дар саны сыйымдылықтың жартысынан асса, сыйымдылықты екі есе үлкейтіп, тірі элементтерді қайта таратыңыз.</p>\n<pre><code>s = ProbingSet()\ns.add(1); s.add(9)          # екеуі де 1-ұяшыққа ұмтылады\ns.remove(1)\ns.contains(9) → True        # tombstone арқылы өтеміз\nlen(s)        → 1</code></pre>",
   "starter": "class ProbingSet:\n    def __init__(self):\n        pass\n\n    def add(self, x):\n        pass\n\n    def contains(self, x):\n        pass\n\n    def remove(self, x):\n        pass\n\n    def __len__(self):\n        pass\n",
   "solution": "DELETED = object()\n\nclass ProbingSet:\n    def __init__(self, cap=8):\n        self.table = [None] * cap\n        self.n = 0        # тірі элементтер\n        self.used = 0     # тірі + tombstone\n\n    def _find(self, x):\n        m = len(self.table)\n        i = x % m\n        for _ in range(m):\n            c = self.table[i]\n            if c is None:\n                return -1\n            if c is not DELETED and c == x:\n                return i\n            i = (i + 1) % m\n        return -1\n\n    def contains(self, x):\n        return self._find(x) >= 0\n\n    def add(self, x):\n        if self.contains(x):\n            return\n        if (self.used + 1) * 2 > len(self.table):\n            self._resize(len(self.table) * 2)\n        m = len(self.table)\n        i = x % m\n        while self.table[i] is not None and self.table[i] is not DELETED:\n            i = (i + 1) % m\n        if self.table[i] is None:\n            self.used += 1\n        self.table[i] = x\n        self.n += 1\n\n    def remove(self, x):\n        i = self._find(x)\n        if i >= 0:\n            self.table[i] = DELETED\n            self.n -= 1\n\n    def _resize(self, cap):\n        old = [c for c in self.table if c is not None and c is not DELETED]\n        self.table = [None] * cap\n        self.n = self.used = 0\n        for c in old:\n            self.add(c)\n\n    def __len__(self):\n        return self.n\n",
   "hints": [
    "Іздеу <code>None</code>-да тоқтайды, бірақ tombstone-нан өтіп кетеді; қосу tombstone-ды қайта қолдана алады.",
    "Rehash кезінде tombstone-дар тасталады: тек тірі элементтерді жаңа кестеге қосыңыз."
   ],
   "check": {
    "tests": "\n_s = ProbingSet()\nassert len(_s) == 0 and _s.contains(5) is False, 'Бос жиын'\n_s.add(1); _s.add(9)\nassert _s.contains(1) and _s.contains(9) and len(_s) == 2, '1 және 9 қосылды'\n_s.remove(1)\nassert _s.contains(9) is True, 'Tombstone арқылы өтіп, 9-ды табу керек'\nassert _s.contains(1) is False and len(_s) == 1, '1 өшірілді'\n_s.remove(1); _s.remove(100)\nassert len(_s) == 1, 'Жоқ элементті өшіру ештеңе өзгертпейді'\n_s.add(9)\nassert len(_s) == 1, 'Қайта қосу өлшемді өзгертпейді'\n_s.add(-3)\nassert _s.contains(-3), 'Теріс сандар да жұмыс істеуі керек'\nimport random as _random\n_rng = _random.Random(6)\n_ps = ProbingSet(); _ref = set()\nfor _ in range(1500):\n    _x = _rng.randint(-200, 200); _op = _rng.random()\n    if _op < 0.5: _ps.add(_x); _ref.add(_x)\n    elif _op < 0.8: _ps.remove(_x); _ref.discard(_x)\n    else: assert _ps.contains(_x) == (_x in _ref), f'contains({_x}) қате'\n    assert len(_ps) == len(_ref), 'len() қате'\nassert all(_ps.contains(_x) for _x in _ref), 'Кейбір элементтер жоғалды'\n_big = ProbingSet()\nfor _x in range(8000):\n    _big.add(_x * 8)\nassert len(_big) == 8000 and _big.contains(8 * 7999), 'Көп элемент: кестені үлкейтуді ұмытпаңыз'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "LRU кэш",
   "prompt": "<p>Сайттың кэші: <code>LRUCache(capacity)</code>. <code>get(key)</code> — мәнді қайтарады (жоқ болса <code>-1</code>) және кілтті «жаңа қолданылған» етеді. <code>put(key, value)</code> — мәнді жазады/жаңартады; кэш толса, <b>ең ұзақ қолданылмаған</b> кілтті шығарады. Екі амал да O(1) болсын. Кеңес: Python <code>dict</code>-і кірістіру ретін сақтайды — кілтті <code>pop</code> жасап қайта қоссаңыз, ол соңына кетеді; ең ескісі — <code>next(iter(d))</code>.</p>\n<pre><code>c = LRUCache(2)\nc.put(1, 'Алматы'); c.put(2, 'Астана')\nc.get(1)            → 'Алматы'\nc.put(3, 'Шымкент') # 2 шығады\nc.get(2)            → -1</code></pre>",
   "starter": "class LRUCache:\n    def __init__(self, capacity):\n        pass\n\n    def get(self, key):\n        pass\n\n    def put(self, key, value):\n        pass\n",
   "solution": "class LRUCache:\n    def __init__(self, capacity):\n        self.cap = capacity\n        self.d = {}\n\n    def get(self, key):\n        if key not in self.d:\n            return -1\n        v = self.d.pop(key)\n        self.d[key] = v\n        return v\n\n    def put(self, key, value):\n        if key in self.d:\n            self.d.pop(key)\n        elif len(self.d) >= self.cap:\n            self.d.pop(next(iter(self.d)))\n        self.d[key] = value\n",
   "hints": [
    "<code>get</code>: кілтті <code>pop</code> жасап, қайта қойыңыз — ол «ең жаңа» болады.",
    "<code>put</code>: бар кілтті жаңартқанда ешкім шықпайды; жаңа кілт толы кэшке келсе, <code>next(iter(self.d))</code> шығады."
   ],
   "check": {
    "tests": "\n_c = LRUCache(2)\n_c.put(1, 'Алматы'); _c.put(2, 'Астана')\nassert _c.get(1) == 'Алматы', \"get(1) 'Алматы'\"\n_c.put(3, 'Шымкент')\nassert _c.get(2) == -1, '2 ең ұзақ қолданылмаған: шығуы керек'\nassert _c.get(3) == 'Шымкент' and _c.get(1) == 'Алматы', '1 мен 3 қалады'\n_c.put(1, 'Алматы-2')\n_c.put(4, 'Тараз')\nassert _c.get(3) == -1, 'put арқылы жаңартылған 1 жаңа саналады, 3 шығады'\nassert _c.get(1) == 'Алматы-2' and _c.get(4) == 'Тараз', 'Жаңартылған мән сақталады'\n_c1 = LRUCache(1)\n_c1.put('а', 1); _c1.put('б', 2)\nassert _c1.get('а') == -1 and _c1.get('б') == 2, 'Сыйымдылық 1'\nfrom collections import OrderedDict as _OD\nimport random as _random, time as _time\n_rng = _random.Random(7)\n_lru = LRUCache(5); _ref = _OD()\nfor _ in range(2000):\n    _k = _rng.randint(0, 9)\n    if _rng.random() < 0.5:\n        _v = _rng.randint(0, 99); _lru.put(_k, _v)\n        if _k in _ref: _ref.move_to_end(_k)\n        _ref[_k] = _v\n        if len(_ref) > 5: _ref.popitem(last=False)\n    else:\n        _e = _ref.get(_k, -1)\n        if _k in _ref: _ref.move_to_end(_k)\n        assert _lru.get(_k) == _e, f'get({_k}) {_e} болуы керек'\n_big = LRUCache(20000); _t0 = _time.perf_counter()\nfor _i in range(40000):\n    _big.put(_i, _i); _big.get(_i // 2)\nassert _time.perf_counter() - _t0 < 2.0, 'Амалдар O(1) болуы керек'\n"
   }
  }
 ],
 "alg-4": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Санау массиві",
   "prompt": "<p>Counting sort-тың бірінші қадамы. <code>count_array(a, max_value)</code> ұзындығы <code>max_value + 1</code> тізім қайтарсын: <code>c[v]</code> — <code>v</code> мәні <code>a</code>-да неше рет кездеседі (барлық мән <code>0..max_value</code> аралығында).</p>\n<pre><code>count_array([2, 0, 2, 3, 0, 2], 4) → [2, 0, 3, 1, 0]</code></pre>",
   "starter": "def count_array(a, max_value):\n    pass\n",
   "solution": "def count_array(a, max_value):\n    c = [0] * (max_value + 1)\n    for x in a:\n        c[x] += 1\n    return c\n",
   "hints": [
    "<code>c = [0] * (max_value + 1)</code>, сосын <code>c[x] += 1</code>."
   ],
   "check": {
    "tests": "\nassert count_array([2, 0, 2, 3, 0, 2], 4) == [2, 0, 3, 1, 0], 'Күтілгені [2, 0, 3, 1, 0]'\nassert count_array([], 2) == [0, 0, 0], 'Бос тізім: нөлдер'\nassert count_array([0, 0], 0) == [2], 'max_value = 0: [2]'\nassert count_array([5], 5) == [0, 0, 0, 0, 0, 1], 'Соңғы мән: [0, 0, 0, 0, 0, 1]'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Max-heap ме",
   "prompt": "<p>Массив ретінде сақталған ағаш: <code>i</code>-түйіннің балалары <code>2i + 1</code> және <code>2i + 2</code>. <code>is_max_heap(a)</code>: әр түйін өз балаларынан кіші болмаса (<code>a[i] ≥ a[бала]</code>) <code>True</code>.</p>\n<pre><code>is_max_heap([9, 5, 8, 1, 2, 7]) → True\nis_max_heap([9, 5, 8, 6])       → False    # 5 &lt; 6\nis_max_heap([])                 → True</code></pre>",
   "starter": "def is_max_heap(a):\n    pass\n",
   "solution": "def is_max_heap(a):\n    n = len(a)\n    for i in range(n):\n        for c in (2 * i + 1, 2 * i + 2):\n            if c < n and a[c] > a[i]:\n                return False\n    return True\n",
   "hints": [
    "Тек ата-ана мен балаларды салыстыру жеткілікті; бала индексі <code>n</code>-нен кіші болса ғана."
   ],
   "check": {
    "tests": "\nassert is_max_heap([9, 5, 8, 1, 2, 7]) is True, 'is_max_heap([9, 5, 8, 1, 2, 7]) True'\nassert is_max_heap([9, 5, 8, 6]) is False, '5-тің баласы 6: False'\nassert is_max_heap([]) is True, 'Бос массив: True'\nassert is_max_heap([1]) is True, 'Бір элемент: True'\nassert is_max_heap([3, 3, 3]) is True, 'Тең мәндер: True'\nassert is_max_heap([5, 6]) is False, 'Түбірден үлкен бала: False'\nassert is_max_heap([10, 9, 8, 7, 6, 5, 11]) is False, 'Соңғы бала 11 > 8: False'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Балдарды санаумен сұрыптау",
   "prompt": "<p>ҰБТ балдары <code>0..140</code> аралығында. <code>sort_scores(scores)</code> балдарды <b>кему</b> ретімен сұрыпталған жаңа тізім ретінде қайтарсын. Counting sort: <code>sorted</code> мен <code>.sort</code> қолданбаңыз. O(n + 141).</p>\n<pre><code>sort_scores([95, 120, 95, 60]) → [120, 95, 95, 60]</code></pre>",
   "starter": "def sort_scores(scores):\n    pass\n",
   "solution": "def sort_scores(scores):\n    c = [0] * 141\n    for s in scores:\n        c[s] += 1\n    res = []\n    for v in range(140, -1, -1):\n        res.extend([v] * c[v])\n    return res\n",
   "hints": [
    "Санау массивін соңынан басына қарай аралаңыз."
   ],
   "check": {
    "tests": "\nassert sort_scores([95, 120, 95, 60]) == [120, 95, 95, 60], 'Күтілгені [120, 95, 95, 60]'\nassert sort_scores([]) == [], 'Бос тізім: []'\nassert sort_scores([0, 140]) == [140, 0], 'Шеткі мәндер: [140, 0]'\nimport random as _random\n_rng = _random.Random(1)\n_x = [_rng.randint(0, 140) for _ in range(5000)]\nassert sort_scores(_x) == sorted(_x, reverse=True), '5000 балл қате сұрыпталды'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Төмен батыру",
   "prompt": "<p>Heapsort-тың негізгі амалы. <code>sift_down(a, i, n)</code>: <code>a[0:n]</code> max-heap, тек <code>i</code>-түйін өз орнында болмауы мүмкін. Оны үлкен баласымен ауыстыра отырып, орнына жеткенше төмен түсіріңіз (орнында, ештеңе қайтармайды). <code>n</code>-нен кейінгі элементтерге тимеңіз.</p>\n<pre><code>a = [1, 9, 8, 5, 6]\nsift_down(a, 0, 5)    # a == [9, 6, 8, 5, 1]</code></pre>",
   "starter": "def sift_down(a, i, n):\n    pass\n",
   "solution": "def sift_down(a, i, n):\n    while True:\n        big = i\n        l, r = 2 * i + 1, 2 * i + 2\n        if l < n and a[l] > a[big]:\n            big = l\n        if r < n and a[r] > a[big]:\n            big = r\n        if big == i:\n            return\n        a[i], a[big] = a[big], a[i]\n        i = big\n",
   "hints": [
    "Үш элементтің (түйін, сол, оң) ең үлкенін табыңыз; түйін өзі ең үлкен болса — тоқтаңыз.",
    "Бала индексін <code>n</code>-мен салыстырыңыз, <code>len(a)</code>-мен емес."
   ],
   "check": {
    "tests": "\n_a = [1, 9, 8, 5, 6]; sift_down(_a, 0, 5)\nassert _a == [9, 6, 8, 5, 1], f'Күтілгені [9, 6, 8, 5, 1], сізде {_a}'\n_a = [3, 2, 1]; sift_down(_a, 0, 3)\nassert _a == [3, 2, 1], 'Орнында тұрса өзгермейді'\n_a = [1, 5, 4, 100]; sift_down(_a, 0, 3)\nassert _a == [5, 1, 4, 100], 'n-нен кейінгі элементке тимеңіз: [5, 1, 4, 100]'\n_a = [7]; sift_down(_a, 0, 1); assert _a == [7], 'Бір элемент'\n_a = [5, 1, 4, 3, 2]; sift_down(_a, 1, 5)\nassert _a == [5, 3, 4, 1, 2], 'Ішкі түйінді түсіру: [5, 3, 4, 1, 2]'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Разрядтық сұрыптау",
   "prompt": "<p>Radix sort (LSD): теріс емес бүтін сандарды алдымен бірліктер цифры бойынша, сосын ондықтар бойынша және т.с.с. <b>тұрақты</b> counting sort-пен сұрыптаймыз. <code>radix_sort(a)</code> сұрыпталған жаңа тізім қайтарсын, <code>sorted</code>/<code>.sort</code> қолданбай. Әр разряд үшін 10 «қалташа» (тізім) жеткілікті: оларды ретімен жинау тұрақтылықты сақтайды.</p>\n<pre><code>radix_sort([170, 45, 75, 90, 802, 24, 2, 66]) → [2, 24, 45, 66, 75, 90, 170, 802]</code></pre>",
   "starter": "def radix_sort(a):\n    pass\n",
   "solution": "def radix_sort(a):\n    res = list(a)\n    if not res:\n        return res\n    exp = 1\n    mx = max(res)\n    while mx // exp > 0:\n        buckets = [[] for _ in range(10)]\n        for x in res:\n            buckets[(x // exp) % 10].append(x)\n        res = [x for b in buckets for x in b]\n        exp *= 10\n    return res\n",
   "hints": [
    "Разряд цифры: <code>(x // exp) % 10</code>, <code>exp = 1, 10, 100, ...</code>.",
    "Ең үлкен санның разрядтары біткенше қайталаңыз; бос тізім мен тек нөлдерді ескеріңіз."
   ],
   "check": {
    "tests": "\nassert radix_sort([170, 45, 75, 90, 802, 24, 2, 66]) == [2, 24, 45, 66, 75, 90, 170, 802], 'Сұрыптау қате'\nassert radix_sort([]) == [], 'Бос тізім: []'\nassert radix_sort([0, 0]) == [0, 0], 'Нөлдер: [0, 0]'\n_a = [3, 1, 2]; radix_sort(_a)\nassert _a == [3, 1, 2], 'Бастапқы тізімді өзгертпеңіз'\nimport random as _random\n_rng = _random.Random(2)\nfor _ in range(20):\n    _x = [_rng.randint(0, 10**_rng.randint(1, 7)) for _ in range(_rng.randint(1, 60))]\n    assert radix_sort(_x) == sorted(_x), f'{_x[:6]}... қате сұрыпталды'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Heap құру",
   "prompt": "<p><code>build_heap(a)</code> массивті <b>орнында</b> max-heap-ке айналдырсын: соңғы ата-ана түйіннен (<code>n // 2 − 1</code>) бастап 0-ге дейін әр түйінге sift down жасаңыз. Бұл O(n), әр элементті бір-бірлеп қосудан (O(n log n)) жылдамырақ. <code>heapq</code> қолданбаңыз (ол min-heap).</p>\n<pre><code>a = [3, 1, 6, 5, 2, 4]\nbuild_heap(a)    # a == [6, 5, 4, 1, 2, 3]</code></pre>",
   "starter": "def build_heap(a):\n    pass\n",
   "solution": "def build_heap(a):\n    n = len(a)\n    for i in range(n // 2 - 1, -1, -1):\n        j = i\n        while True:\n            big = j\n            l, r = 2 * j + 1, 2 * j + 2\n            if l < n and a[l] > a[big]:\n                big = l\n            if r < n and a[r] > a[big]:\n                big = r\n            if big == j:\n                break\n            a[j], a[big] = a[big], a[j]\n            j = big\n",
   "hints": [
    "Жапырақтар өздігінен heap: тек <code>n // 2 − 1</code>-ден 0-ге дейінгі түйіндерді түсіріңіз.",
    "Sift down-ды алдыңғы тапсырмадағыдай жазыңыз."
   ],
   "check": {
    "tests": "\ndef _is_heap(a):\n    return all(a[(i - 1) // 2] >= a[i] for i in range(1, len(a)))\n_a = [3, 1, 6, 5, 2, 4]; build_heap(_a)\nassert _a == [6, 5, 4, 1, 2, 3], f'Күтілгені [6, 5, 4, 1, 2, 3], сізде {_a}'\n_a = []; build_heap(_a); assert _a == [], 'Бос массив'\n_a = [1]; build_heap(_a); assert _a == [1], 'Бір элемент'\nimport random as _random\n_rng = _random.Random(3)\nfor _ in range(40):\n    _x = [_rng.randint(0, 20) for _ in range(_rng.randint(0, 25))]; _y = list(_x)\n    build_heap(_y)\n    assert _is_heap(_y) and sorted(_y) == sorted(_x), f'{_x}: нәтиже max-heap емес немесе элементтер өзгерді'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Жуық сұрыпталған тізім",
   "prompt": "<p>Датчиктен келген уақыт белгілері «жуық сұрыпталған»: әр элемент өзінің сұрыпталған орнынан ең көбі <code>k</code> позиция алыс. <code>sort_nearly(a, k)</code> сұрыпталған жаңа тізім қайтарсын, O(n log k): өлшемі <code>k + 1</code> min-heap (<code>heapq</code>) ұстаңыз — оның минимумы әрқашан келесі орынға лайық. <code>sorted</code>/<code>.sort</code> қолданбаңыз.</p>\n<pre><code>sort_nearly([6, 5, 3, 2, 8, 10, 9], 3) → [2, 3, 5, 6, 8, 9, 10]</code></pre>",
   "starter": "import heapq\n\ndef sort_nearly(a, k):\n    pass\n",
   "solution": "import heapq\n\ndef sort_nearly(a, k):\n    h = []\n    res = []\n    for x in a:\n        heapq.heappush(h, x)\n        if len(h) > k:\n            res.append(heapq.heappop(h))\n    while h:\n        res.append(heapq.heappop(h))\n    return res\n",
   "hints": [
    "Heap-те <code>k + 1</code> элемент жиналғанда минимумды шығарыңыз.",
    "Соңында heap-те қалғандарын ретімен алыңыз."
   ],
   "check": {
    "tests": "\nassert sort_nearly([6, 5, 3, 2, 8, 10, 9], 3) == [2, 3, 5, 6, 8, 9, 10], 'Күтілгені [2, 3, 5, 6, 8, 9, 10]'\nassert sort_nearly([], 2) == [], 'Бос тізім: []'\nassert sort_nearly([1, 2, 3], 0) == [1, 2, 3], 'k = 0: тізім сұрыпталған'\nassert sort_nearly([2, 1], 5) == [1, 2], 'k тізімнен ұзын'\nimport random as _random, time as _time\n_rng = _random.Random(4)\nfor _ in range(40):\n    _n = _rng.randint(0, 20); _k = _rng.randint(0, 4)\n    _s = sorted(_rng.randint(0, 50) for _ in range(_n)); _x = list(_s)\n    for _i in range(0, _n, _k + 1):\n        _blk = _x[_i:_i + _k + 1]; _rng.shuffle(_blk); _x[_i:_i + _k + 1] = _blk\n    assert sort_nearly(_x, _k) == _s, f'sort_nearly({_x}, {_k}) {_s} болуы керек'\n_big = list(range(200000))\nfor _i in range(0, 200000 - 10, 10):\n    _big[_i], _big[_i + 9] = _big[_i + 9], _big[_i]\n_t0 = _time.perf_counter(); _r = sort_nearly(_big, 9); _dt = _time.perf_counter() - _t0\nassert _r == list(range(200000)) and _dt < 2.0, f'200 000 элемент, k = 9: O(n log k) керек ({_dt:.2f} с)'\n",
    "mustInclude": [
     "heapq"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ең үлкен аралық",
   "prompt": "<p>Трасса бойындағы жанармай бекеттерінің координаттары <code>xs</code> (ретсіз, бүтін, теріс емес). <code>max_gap(xs)</code> сұрыпталған ретте көрші екі бекет арасындағы ең үлкен қашықтықты қайтарсын; бекет 2-ден аз болса 0. Сызықтық уақыт: bucket идеясы. <code>n</code> бекет, <code>lo = min</code>, <code>hi = max</code> болса, ең үлкен аралық кемінде <code>⌈(hi − lo) / (n − 1)⌉</code>; сондықтан осы өлшемдегі қалташаларда тек min/max сақтап, көрші бос емес қалташалар арасын тексеру жеткілікті. <code>sorted</code>/<code>.sort</code> қолданбаңыз.</p>\n<pre><code>max_gap([3, 6, 9, 1]) → 3\nmax_gap([10])         → 0\nmax_gap([5, 5, 5])    → 0</code></pre>",
   "starter": "def max_gap(xs):\n    pass\n",
   "solution": "def max_gap(xs):\n    n = len(xs)\n    if n < 2:\n        return 0\n    lo, hi = min(xs), max(xs)\n    if lo == hi:\n        return 0\n    size = max(1, (hi - lo + n - 2) // (n - 1))\n    cnt = (hi - lo) // size + 1\n    bmin = [None] * cnt\n    bmax = [None] * cnt\n    for x in xs:\n        b = (x - lo) // size\n        if bmin[b] is None or x < bmin[b]:\n            bmin[b] = x\n        if bmax[b] is None or x > bmax[b]:\n            bmax[b] = x\n    best = 0\n    prev = None\n    for b in range(cnt):\n        if bmin[b] is None:\n            continue\n        if prev is not None:\n            best = max(best, bmin[b] - prev)\n        prev = bmax[b]\n    return best\n",
   "hints": [
    "Бір қалташаның ішіндегі айырма <code>size</code>-тан кіші, сондықтан жауап әрқашан екі қалташа арасында: келесі бос емес қалташаның min-і − алдыңғысының max-і.",
    "Қалташа индексі: <code>(x − lo) // size</code>."
   ],
   "check": {
    "tests": "\nassert max_gap([3, 6, 9, 1]) == 3, 'Күтілгені 3'\nassert max_gap([10]) == 0, 'Бір бекет: 0'\nassert max_gap([]) == 0, 'Бекет жоқ: 0'\nassert max_gap([5, 5, 5]) == 0, 'Барлығы бір нүктеде: 0'\nassert max_gap([1, 10000000]) == 9999999, 'Екі бекет'\nassert max_gap([1, 1, 1, 5, 5]) == 4, 'Қайталанулар: 4'\nimport random as _random, time as _time\n_rng = _random.Random(5)\nfor _ in range(60):\n    _x = [_rng.randint(0, 100) for _ in range(_rng.randint(0, 15))]\n    _s = sorted(_x)\n    _exp = max([b - a for a, b in zip(_s, _s[1:])] + [0])\n    assert max_gap(_x) == _exp, f'max_gap({_x}) {_exp} болуы керек'\n_big = [_rng.randint(0, 10**9) for _ in range(100000)]\n_s = sorted(_big)\nassert max_gap(_big) == max(b - a for a, b in zip(_s, _s[1:])), 'Үлкен тестте қате'\n"
   }
  }
 ],
 "alg-5": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Теңгерім коэффициенті",
   "prompt": "<p><code>balance_factor(node)</code> = <code>height(left) − height(right)</code> (бос ағаштың биіктігі 0). Бос түйін үшін 0. Биіктікті рекурсиямен есептейтін көмекші функция жазыңыз.</p>\n<pre><code>balance_factor(Node(3, Node(2, Node(1)))) → 2\nbalance_factor(Node(1, None, Node(2)))    → -1</code></pre>",
   "starter": "class Node:\n    def __init__(self, key, left=None, right=None):\n        self.key, self.left, self.right = key, left, right\n\ndef balance_factor(node):\n    pass\n",
   "solution": "class Node:\n    def __init__(self, key, left=None, right=None):\n        self.key, self.left, self.right = key, left, right\n\ndef height(node):\n    if node is None:\n        return 0\n    return 1 + max(height(node.left), height(node.right))\n\ndef balance_factor(node):\n    if node is None:\n        return 0\n    return height(node.left) - height(node.right)\n",
   "hints": [
    "Сабақтағы <code>height</code> функциясын қолданыңыз."
   ],
   "check": {
    "tests": "\nassert balance_factor(Node(3, Node(2, Node(1)))) == 2, 'Сол жақ биіктігі 2, оң жақ 0: 2'\nassert balance_factor(Node(1, None, Node(2))) == -1, 'Тек оң бала: -1'\nassert balance_factor(None) == 0, 'Бос түйін: 0'\nassert balance_factor(Node(5)) == 0, 'Жапырақ: 0'\nassert balance_factor(Node(4, Node(2, Node(1), Node(3)), Node(6))) == 1, 'Күтілгені 1'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "BST-ге кілт қосу",
   "prompt": "<p><code>bst_insert(root, key)</code> кілтті BST-ге (теңгерімсіз, қарапайым) қосып, түбірді қайтарсын. Бос ағашқа қосқанда жаңа түйін түбір болады. Кілт бар болса, ештеңе қоспаңыз.</p>\n<pre><code>root = None\nfor k in [50, 30, 70, 30]:\n    root = bst_insert(root, k)\n# inorder: [30, 50, 70]</code></pre>",
   "starter": "class Node:\n    def __init__(self, key, left=None, right=None):\n        self.key, self.left, self.right = key, left, right\n\ndef bst_insert(root, key):\n    pass\n",
   "solution": "class Node:\n    def __init__(self, key, left=None, right=None):\n        self.key, self.left, self.right = key, left, right\n\ndef bst_insert(root, key):\n    if root is None:\n        return Node(key)\n    if key < root.key:\n        root.left = bst_insert(root.left, key)\n    elif key > root.key:\n        root.right = bst_insert(root.right, key)\n    return root\n",
   "hints": [
    "<code>key &lt; root.key</code> — солға, <code>key &gt; root.key</code> — оңға, тең — ештеңе.",
    "Рекурсия нәтижесін <code>root.left</code>/<code>root.right</code>-қа қайта жазыңыз."
   ],
   "check": {
    "tests": "\ndef _h(n):\n    return 0 if n is None else 1 + max(_h(n.left), _h(n.right))\ndef _ino(n):\n    return _ino(n.left) + [n.key] + _ino(n.right) if n else []\ndef _bst(keys):\n    root = None\n    def ins(n, k):\n        if n is None: return Node(k)\n        if k < n.key: n.left = ins(n.left, k)\n        elif k > n.key: n.right = ins(n.right, k)\n        return n\n    for k in keys:\n        root = ins(root, k)\n    return root\n\n_r = None\nfor _k in [50, 30, 70, 30]:\n    _r = bst_insert(_r, _k)\nassert _ino(_r) == [30, 50, 70], f'Inorder [30, 50, 70] болуы керек, сізде {_ino(_r)}'\nassert _r.key == 50 and _r.left.key == 30 and _r.right.key == 70, 'Құрылым қате'\n_one = bst_insert(None, 5)\nassert _one.key == 5 and _one.left is None and _one.right is None, 'Бос ағашқа қосу: жаңа түйін'\n_r2 = None\nfor _k in [1, 2, 3, 4]:\n    _r2 = bst_insert(_r2, _k)\nassert _h(_r2) == 4, 'Өсу ретімен қосқанда теңгерімсіз BST — биіктігі 4'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ең кіші және ең үлкен кілт",
   "prompt": "<p><code>min_max(root)</code> BST-дегі ең кіші және ең үлкен кілтті <code>(min, max)</code> кортежі ретінде қайтарсын. Бос ағаш — <code>None</code>. Бүкіл ағашты аралаудың қажеті жоқ: ең сол жақ және ең оң жақ түйінге түсіңіз — O(h).</p>\n<pre><code># BST: 8, 3, 10, 1, 6, 14\nmin_max(root) → (1, 14)</code></pre>",
   "starter": "class Node:\n    def __init__(self, key, left=None, right=None):\n        self.key, self.left, self.right = key, left, right\n\ndef min_max(root):\n    pass\n",
   "solution": "class Node:\n    def __init__(self, key, left=None, right=None):\n        self.key, self.left, self.right = key, left, right\n\ndef min_max(root):\n    if root is None:\n        return None\n    lo = root\n    while lo.left:\n        lo = lo.left\n    hi = root\n    while hi.right:\n        hi = hi.right\n    return (lo.key, hi.key)\n",
   "hints": [
    "<code>while node.left:</code> — ең кішісі ең сол жақта."
   ],
   "check": {
    "tests": "\ndef _h(n):\n    return 0 if n is None else 1 + max(_h(n.left), _h(n.right))\ndef _ino(n):\n    return _ino(n.left) + [n.key] + _ino(n.right) if n else []\ndef _bst(keys):\n    root = None\n    def ins(n, k):\n        if n is None: return Node(k)\n        if k < n.key: n.left = ins(n.left, k)\n        elif k > n.key: n.right = ins(n.right, k)\n        return n\n    for k in keys:\n        root = ins(root, k)\n    return root\n\nassert min_max(_bst([8, 3, 10, 1, 6, 14])) == (1, 14), 'Күтілгені (1, 14)'\nassert min_max(None) is None, 'Бос ағаш: None'\nassert min_max(Node(7)) == (7, 7), 'Бір түйін: (7, 7)'\nassert min_max(_bst([5, 4, 3, 2])) == (2, 5), 'Тек сол жақ: (2, 5)'\nassert min_max(_bst([-1, 0, 1])) == (-1, 1), 'Тек оң жақ: (-1, 1)'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Теңгерімсіз түйіндер",
   "prompt": "<p><code>unbalanced(root)</code> balance factor-ы <code>|bf| &gt; 1</code> болатын барлық түйіндердің кілттерін inorder ретімен қайтарсын. O(n): биіктіктерді төменнен жоғары бір рет есептеңіз (әр түйінде <code>height</code>-ты қайта шақырмаңыз).</p>\n<pre><code># 30 → сол 20 → сол 10,  30 → оң 40\nunbalanced(Node(30, Node(20, Node(10, Node(5))), Node(40))) → [20, 30]</code></pre>",
   "starter": "class Node:\n    def __init__(self, key, left=None, right=None):\n        self.key, self.left, self.right = key, left, right\n\ndef unbalanced(root):\n    pass\n",
   "solution": "class Node:\n    def __init__(self, key, left=None, right=None):\n        self.key, self.left, self.right = key, left, right\n\ndef unbalanced(root):\n    def go(n):\n        if n is None:\n            return 0, []\n        hl, a = go(n.left)\n        hr, b = go(n.right)\n        mid = [n.key] if abs(hl - hr) > 1 else []\n        return 1 + max(hl, hr), a + mid + b\n    return go(root)[1]\n",
   "hints": [
    "Көмекші функция <code>(биіктік, кілттер_тізімі)</code> жұбын қайтарсын.",
    "Inorder: сол тізім + (осы түйін, егер теңгерімсіз) + оң тізім."
   ],
   "check": {
    "tests": "\ndef _h(n):\n    return 0 if n is None else 1 + max(_h(n.left), _h(n.right))\ndef _ino(n):\n    return _ino(n.left) + [n.key] + _ino(n.right) if n else []\ndef _bst(keys):\n    root = None\n    def ins(n, k):\n        if n is None: return Node(k)\n        if k < n.key: n.left = ins(n.left, k)\n        elif k > n.key: n.right = ins(n.right, k)\n        return n\n    for k in keys:\n        root = ins(root, k)\n    return root\n\nassert unbalanced(Node(30, Node(20, Node(10, Node(5))), Node(40))) == [20, 30], 'Күтілгені [20, 30]'\nassert unbalanced(None) == [], 'Бос ағаш: []'\nassert unbalanced(_bst([4, 2, 6, 1, 3, 5, 7])) == [], 'Толық ағаш теңгерімді: []'\nassert unbalanced(_bst([1, 2, 3, 4])) == [1, 2], 'Оңға созылған тізбек: [1, 2]'\nassert unbalanced(Node(1, None, Node(2))) == [], 'Айырма 1: []'\nimport time as _time\n_big = _bst(list(range(500)))\n_t0 = _time.perf_counter(); _r = unbalanced(_big); _dt = _time.perf_counter() - _t0\nassert _r == list(range(498)), '500 түйінді тізбекте соңғы екеуінен басқасы теңгерімсіз'\nassert _dt < 1.0, f'{_dt:.2f} с: биіктікті әр түйінде қайта есептемеңіз (O(n²))'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Айналдыру түрі",
   "prompt": "<p>Кілт қосқаннан кейін <code>node</code> теңгерімсіз болуы мүмкін. <code>rotation_case(node)</code> қай айналдыру керек екенін қайтарсын: <code>bf(node) &gt; 1</code> болса — сол баланың <code>bf ≥ 0</code> кезде <code>'LL'</code>, әйтпесе <code>'LR'</code>; <code>bf(node) &lt; −1</code> болса — оң баланың <code>bf ≤ 0</code> кезде <code>'RR'</code>, әйтпесе <code>'RL'</code>; теңгерімді болса <code>None</code>.</p>\n<pre><code>rotation_case(Node(30, Node(10, None, Node(20)))) → 'LR'\nrotation_case(Node(10, None, Node(20, None, Node(30)))) → 'RR'</code></pre>",
   "starter": "class Node:\n    def __init__(self, key, left=None, right=None):\n        self.key, self.left, self.right = key, left, right\n\ndef rotation_case(node):\n    pass\n",
   "solution": "class Node:\n    def __init__(self, key, left=None, right=None):\n        self.key, self.left, self.right = key, left, right\n\ndef height(n):\n    return 0 if n is None else 1 + max(height(n.left), height(n.right))\n\ndef bf(n):\n    return 0 if n is None else height(n.left) - height(n.right)\n\ndef rotation_case(node):\n    b = bf(node)\n    if b > 1:\n        return 'LL' if bf(node.left) >= 0 else 'LR'\n    if b < -1:\n        return 'RR' if bf(node.right) <= 0 else 'RL'\n    return None\n",
   "hints": [
    "Алдымен <code>height</code> және <code>bf</code> көмекші функциялары.",
    "Сабақтағы мысал: 30, 10, 20 — LR."
   ],
   "check": {
    "tests": "\nassert rotation_case(Node(30, Node(10, None, Node(20)))) == 'LR', \"30, 10, 20: 'LR'\"\nassert rotation_case(Node(10, None, Node(20, None, Node(30)))) == 'RR', \"10, 20, 30: 'RR'\"\nassert rotation_case(Node(30, Node(20, Node(10)))) == 'LL', \"30, 20, 10: 'LL'\"\nassert rotation_case(Node(10, None, Node(30, Node(20)))) == 'RL', \"10, 30, 20: 'RL'\"\nassert rotation_case(Node(2, Node(1), Node(3))) is None, 'Теңгерімді: None'\nassert rotation_case(None) is None, 'Бос түйін: None'\nassert rotation_case(Node(5, Node(3, Node(2), Node(4)))) == 'LL', \"Сол баланың bf = 0: 'LL'\"\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "AVL ағашы ма",
   "prompt": "<p><code>is_avl(root)</code>: ағаш бір мезгілде (1) қатаң BST (әр түйінде сол жақтағы <b>барлық</b> кілттер кіші, оң жақтағылар үлкен) және (2) әр түйінде <code>|bf| ≤ 1</code> болса <code>True</code>. Бір рекурсиялық аралауда екеуін де тексеріңіз: O(n).</p>\n<pre><code>is_avl(Node(2, Node(1), Node(3)))          → True\nis_avl(Node(2, Node(3), Node(1)))          → False   # BST емес\nis_avl(Node(3, Node(2, Node(1))))          → False   # теңгерімсіз</code></pre>",
   "starter": "class Node:\n    def __init__(self, key, left=None, right=None):\n        self.key, self.left, self.right = key, left, right\n\ndef is_avl(root):\n    pass\n",
   "solution": "class Node:\n    def __init__(self, key, left=None, right=None):\n        self.key, self.left, self.right = key, left, right\n\ndef is_avl(root):\n    def go(n, lo, hi):\n        if n is None:\n            return 0\n        if (lo is not None and n.key <= lo) or (hi is not None and n.key >= hi):\n            return -1\n        hl = go(n.left, lo, n.key)\n        if hl < 0:\n            return -1\n        hr = go(n.right, n.key, hi)\n        if hr < 0 or abs(hl - hr) > 1:\n            return -1\n        return 1 + max(hl, hr)\n    return go(root, None, None) >= 0\n",
   "hints": [
    "Көмекші функция рұқсат етілген аралықты <code>(lo, hi)</code> алып, биіктікті немесе қате болса <code>−1</code> қайтарсын."
   ],
   "check": {
    "tests": "\ndef _h(n):\n    return 0 if n is None else 1 + max(_h(n.left), _h(n.right))\ndef _ino(n):\n    return _ino(n.left) + [n.key] + _ino(n.right) if n else []\ndef _bst(keys):\n    root = None\n    def ins(n, k):\n        if n is None: return Node(k)\n        if k < n.key: n.left = ins(n.left, k)\n        elif k > n.key: n.right = ins(n.right, k)\n        return n\n    for k in keys:\n        root = ins(root, k)\n    return root\n\nassert is_avl(Node(2, Node(1), Node(3))) is True, 'Дұрыс AVL: True'\nassert is_avl(Node(2, Node(3), Node(1))) is False, 'BST емес: False'\nassert is_avl(Node(3, Node(2, Node(1)))) is False, 'Теңгерімсіз: False'\nassert is_avl(None) is True, 'Бос ағаш: True'\nassert is_avl(Node(10, Node(5, None, Node(12)), Node(15))) is False, '12 10-ның сол жағында: False'\nassert is_avl(_bst([4, 2, 6, 1, 3, 5, 7])) is True, 'Толық BST: True'\nassert is_avl(Node(5, Node(5))) is False, 'Тең кілт: False'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "AVL-ге кілт қосу",
   "prompt": "<p>Түйінде биіктік сақталады: <code>Node(key)</code>, <code>height = 1</code>. <code>avl_insert(root, key)</code> кілтті қосып, теңгерімді сақтайтын жаңа түбірді қайтарсын (кілт бар болса, өзгеріссіз). Қосқаннан кейін жолдағы әр түйінде биіктікті жаңартыңыз, <code>|bf| &gt; 1</code> болса төрт жағдайдың (LL, LR, RR, RL) айналдыруын жасаңыз. Айналдыруда биіктікті төменнен жоғары жаңартуды ұмытпаңыз. Әр қосу O(log n).</p>\n<pre><code>root = None\nfor k in [10, 20, 30, 40, 50, 25]:\n    root = avl_insert(root, k)\nroot.key → 30</code></pre>",
   "starter": "class Node:\n    def __init__(self, key):\n        self.key = key\n        self.left = None\n        self.right = None\n        self.height = 1\n\ndef avl_insert(root, key):\n    pass\n",
   "solution": "class Node:\n    def __init__(self, key):\n        self.key = key\n        self.left = None\n        self.right = None\n        self.height = 1\n\ndef _ht(n):\n    return n.height if n else 0\n\ndef _upd(n):\n    n.height = 1 + max(_ht(n.left), _ht(n.right))\n\ndef _rot_right(y):\n    x = y.left\n    y.left = x.right\n    x.right = y\n    _upd(y)\n    _upd(x)\n    return x\n\ndef _rot_left(x):\n    y = x.right\n    x.right = y.left\n    y.left = x\n    _upd(x)\n    _upd(y)\n    return y\n\ndef avl_insert(root, key):\n    if root is None:\n        return Node(key)\n    if key < root.key:\n        root.left = avl_insert(root.left, key)\n    elif key > root.key:\n        root.right = avl_insert(root.right, key)\n    else:\n        return root\n    _upd(root)\n    b = _ht(root.left) - _ht(root.right)\n    if b > 1:\n        if _ht(root.left.left) < _ht(root.left.right):\n            root.left = _rot_left(root.left)\n        return _rot_right(root)\n    if b < -1:\n        if _ht(root.right.right) < _ht(root.right.left):\n            root.right = _rot_right(root.right)\n        return _rot_left(root)\n    return root\n",
   "hints": [
    "Айналдырудан кейін алдымен төмен түскен түйіннің, сосын жаңа түбірдің биіктігін жаңартыңыз.",
    "LR: <code>root.left = rotate_left(root.left)</code>, сосын <code>rotate_right(root)</code>; RL — керісінше."
   ],
   "check": {
    "tests": "\ndef _ino(n):\n    return _ino(n.left) + [n.key] + _ino(n.right) if n else []\ndef _check(n):\n    if n is None: return 0\n    hl, hr = _check(n.left), _check(n.right)\n    assert abs(hl - hr) <= 1, f'{n.key} түйінінде теңгерім бұзылған'\n    assert n.height == 1 + max(hl, hr), f'{n.key} түйінінің height өрісі қате'\n    return 1 + max(hl, hr)\n_r = None\nfor _k in [10, 20, 30, 40, 50, 25]:\n    _r = avl_insert(_r, _k)\nassert _r.key == 30, f'Түбір 30 болуы керек, сізде {_r.key}'\nassert _ino(_r) == [10, 20, 25, 30, 40, 50], 'Inorder қате'\n_check(_r)\n_r = None\nfor _k in [30, 10, 20]:\n    _r = avl_insert(_r, _k)\nassert _r.key == 20 and _r.left.key == 10 and _r.right.key == 30, 'LR жағдайы: түбір 20'\n_r = None\nfor _k in [10, 30, 20]:\n    _r = avl_insert(_r, _k)\nassert _r.key == 20, 'RL жағдайы: түбір 20'\n_r = avl_insert(avl_insert(None, 5), 5)\nassert _ino(_r) == [5], 'Бар кілт қайта қосылмайды'\n_r = None\nfor _k in range(2000):\n    _r = avl_insert(_r, _k)\nassert _check(_r) <= 12, '2000 кілт өсу ретімен: биіктік ≤ 12 болуы керек'\nassert _ino(_r) == list(range(2000)), 'Inorder 0..1999 болуы керек'\nimport random as _random\n_rng = _random.Random(1)\n_r = None; _keys = set()\nfor _ in range(1500):\n    _k = _rng.randint(0, 3000); _keys.add(_k); _r = avl_insert(_r, _k)\n_check(_r)\nassert _ino(_r) == sorted(_keys), 'Кездейсоқ кілттер: inorder қате'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "AVL ағашының ең үлкен биіктігі",
   "prompt": "<p>Биіктігі <code>h</code> AVL ағашында ең аз дегенде <code>N(h)</code> түйін бар: <code>N(0) = 0</code>, <code>N(1) = 1</code>, <code>N(h) = N(h−1) + N(h−2) + 1</code> (бір ішкі ағаш биіктігі <code>h−1</code>, екіншісі <code>h−2</code>). <code>max_avl_height(n)</code> <code>n</code> түйінді AVL ағашының болуы мүмкін ең үлкен биіктігін қайтарсын: <code>N(h) ≤ n</code> болатын ең үлкен <code>h</code>. <code>n</code> өте үлкен болуы мүмкін (<code>10<sup>18</sup></code>).</p>\n<pre><code>max_avl_height(0)  → 0\nmax_avl_height(4)  → 3\nmax_avl_height(7)  → 4</code></pre>",
   "starter": "def max_avl_height(n):\n    pass\n",
   "solution": "def max_avl_height(n):\n    a, b = 0, 1   # N(h-1), N(h)\n    h = 0\n    while b <= n:\n        h += 1\n        a, b = b, a + b + 1\n    return h\n",
   "hints": [
    "<code>N</code> мәндерін DP-мен ретімен есептеп, <code>N(h) ≤ n</code> болғанша <code>h</code>-ты арттырыңыз.",
    "<code>N(h)</code> Фибоначчи сияқты экспоненциалды өседі: 10<sup>18</sup> үшін 90-ға жуық қадам."
   ],
   "check": {
    "tests": "\nassert max_avl_height(0) == 0, 'n = 0: 0'\nassert max_avl_height(1) == 1, 'n = 1: 1'\nassert max_avl_height(2) == 2 and max_avl_height(3) == 2, 'n = 2, 3: 2'\nassert max_avl_height(4) == 3, 'n = 4: 3'\nassert max_avl_height(6) == 3, 'n = 6: 3'\nassert max_avl_height(7) == 4, 'n = 7: 4'\nassert max_avl_height(12) == 5 and max_avl_height(11) == 4, 'N(5) = 12'\n_N = [0, 1]\nwhile len(_N) < 100:\n    _N.append(_N[-1] + _N[-2] + 1)\nfor _h in range(1, 90):\n    assert max_avl_height(_N[_h]) == _h and max_avl_height(_N[_h] - 1) == _h - 1, f'N({_h}) = {_N[_h]} шекарасында қате'\nimport math as _math\nassert max_avl_height(10**18) <= 1.45 * _math.log2(10**18) + 2, 'Биіктік шамамен 1.44·log₂ n-нан аспауы керек'\n"
   }
  }
 ],
 "alg-6": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жол сығатын find",
   "prompt": "<p><code>parent</code> — union-find массиві (<code>parent[x] == x</code> болса, <code>x</code> — түбір). <code>find(parent, x)</code> <code>x</code>-тің түбірін қайтарсын және <b>жолды сығып</b>, жолдағы барлық төбелердің <code>parent</code>-ын тікелей түбірге бағыттасын. Ұзын тізбекте рекурсия терең болуы мүмкін: цикл қолданыңыз.</p>\n<pre><code>p = [0, 0, 1, 2]\nfind(p, 3) → 0      # p == [0, 0, 0, 0]</code></pre>",
   "starter": "def find(parent, x):\n    pass\n",
   "solution": "def find(parent, x):\n    root = x\n    while parent[root] != root:\n        root = parent[root]\n    while parent[x] != root:\n        parent[x], x = root, parent[x]\n    return root\n",
   "hints": [
    "Бірінші цикл түбірді табады, екінші цикл жолды қайта жүріп, әр төбені түбірге бағыттайды."
   ],
   "check": {
    "tests": "\n_p = [0, 0, 1, 2]\nassert find(_p, 3) == 0, 'find(p, 3) 0 болуы керек'\nassert _p == [0, 0, 0, 0], f'Жол сығылуы керек: [0, 0, 0, 0], сізде {_p}'\n_p = [0, 1, 2]\nassert find(_p, 2) == 2 and _p == [0, 1, 2], 'Түбірдің өзі: өзгеріссіз'\n_p = [1, 1, 1, 0, 3]\nassert find(_p, 4) == 1 and _p == [1, 1, 1, 1, 1], 'Күтілгені [1, 1, 1, 1, 1]'\n_n = 100000; _p = [max(0, i - 1) for i in range(_n)]\nassert find(_p, _n - 1) == 0 and _p[_n - 1] == 0 and _p[_n // 2] == 0, '100 000 ұзын тізбек: рекурсиясыз, жол сығылсын'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бір топта ма",
   "prompt": "<p>Мектепте <code>n</code> оқушы, <code>pairs</code> — дос жұптары (достықтың досы да бір топта). <code>same_group(n, pairs, a, b)</code>: <code>a</code> мен <code>b</code> бір топта болса <code>True</code>. Union-find: әр жұпқа <code>union</code>, сосын <code>find(a) == find(b)</code>.</p>\n<pre><code>same_group(5, [(0, 1), (1, 2), (3, 4)], 0, 2) → True\nsame_group(5, [(0, 1), (1, 2), (3, 4)], 0, 4) → False</code></pre>",
   "starter": "def same_group(n, pairs, a, b):\n    pass\n",
   "solution": "def same_group(n, pairs, a, b):\n    parent = list(range(n))\n    def find(x):\n        while parent[x] != x:\n            parent[x] = parent[parent[x]]\n            x = parent[x]\n        return x\n    for x, y in pairs:\n        parent[find(x)] = find(y)\n    return find(a) == find(b)\n",
   "hints": [
    "<code>parent = list(range(n))</code>.",
    "<code>union</code>: <code>parent[find(x)] = find(y)</code>."
   ],
   "check": {
    "tests": "\nassert same_group(5, [(0, 1), (1, 2), (3, 4)], 0, 2) is True, '0 — 1 — 2: True'\nassert same_group(5, [(0, 1), (1, 2), (3, 4)], 0, 4) is False, 'Әртүрлі топ: False'\nassert same_group(1, [], 0, 0) is True, 'Өзімен: True'\nassert same_group(3, [], 0, 1) is False, 'Жұп жоқ: False'\n_n = 50000; _pairs = [(i, i + 1) for i in range(_n - 1)]\nassert same_group(_n, _pairs, 0, _n - 1) is True, 'Ұзын тізбек: True'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ең үлкен топ",
   "prompt": "<p><code>largest_group(n, pairs)</code> union-find арқылы ең үлкен топтың (байланысқан компоненттің) өлшемін қайтарсын. Union by size: әр түбірде топ өлшемін сақтаңыз, кіші топты үлкеніне қосыңыз. <code>n ≥ 1</code>.</p>\n<pre><code>largest_group(6, [(0, 1), (1, 2), (3, 4)]) → 3\nlargest_group(3, [])                       → 1</code></pre>",
   "starter": "def largest_group(n, pairs):\n    pass\n",
   "solution": "def largest_group(n, pairs):\n    parent = list(range(n))\n    size = [1] * n\n    def find(x):\n        while parent[x] != x:\n            parent[x] = parent[parent[x]]\n            x = parent[x]\n        return x\n    for a, b in pairs:\n        ra, rb = find(a), find(b)\n        if ra == rb:\n            continue\n        if size[ra] < size[rb]:\n            ra, rb = rb, ra\n        parent[rb] = ra\n        size[ra] += size[rb]\n    return max(size[find(x)] for x in range(n))\n",
   "hints": [
    "Біріктіргенде <code>size[ra] += size[rb]</code>.",
    "Бір топтағы жұпты қайта біріктірмеңіз — өлшем екі рет қосылып кетеді."
   ],
   "check": {
    "tests": "\nassert largest_group(6, [(0, 1), (1, 2), (3, 4)]) == 3, 'Күтілгені 3'\nassert largest_group(3, []) == 1, 'Жұп жоқ: 1'\nassert largest_group(3, [(0, 1), (1, 0), (0, 1)]) == 2, 'Қайталанған жұп өлшемді арттырмайды: 2'\nassert largest_group(4, [(0, 1), (2, 3), (1, 3)]) == 4, 'Барлығы бір топта: 4'\nassert largest_group(2, [(1, 1)]) == 1, 'Өзімен жұп: 1'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Теңдіктер жүйесі",
   "prompt": "<p>Айнымалылар — бір кіші латын әрпі. <code>eqs</code> — <code>'a==b'</code> немесе <code>'a!=b'</code> түріндегі жолдар. <code>consistent(eqs)</code> барлық шартты бір мезгілде орындайтын мәндер бар болса <code>True</code>. Алдымен барлық <code>==</code>-ді union-find арқылы біріктіріп, сосын әр <code>!=</code>-ті тексеріңіз.</p>\n<pre><code>consistent(['a==b', 'b!=a'])          → False\nconsistent(['a==b', 'b==c', 'a!=d'])  → True\nconsistent(['a!=a'])                  → False</code></pre>",
   "starter": "def consistent(eqs):\n    pass\n",
   "solution": "def consistent(eqs):\n    parent = {}\n    def find(x):\n        parent.setdefault(x, x)\n        while parent[x] != x:\n            parent[x] = parent[parent[x]]\n            x = parent[x]\n        return x\n    for e in eqs:\n        if e[1:3] == '==':\n            parent[find(e[0])] = find(e[3])\n    for e in eqs:\n        if e[1:3] == '!=' and find(e[0]) == find(e[3]):\n            return False\n    return True\n",
   "hints": [
    "Жолдың құрылымы бекітілген: <code>e[0]</code>, <code>e[1:3]</code>, <code>e[3]</code>.",
    "Екі өту: бірінші <code>==</code>, екінші <code>!=</code> — рет маңызды."
   ],
   "check": {
    "tests": "\nassert consistent(['a==b', 'b!=a']) is False, \"['a==b', 'b!=a']: False\"\nassert consistent(['a==b', 'b==c', 'a!=d']) is True, 'True болуы керек'\nassert consistent(['a!=a']) is False, \"'a!=a': False\"\nassert consistent([]) is True, 'Шарт жоқ: True'\nassert consistent(['a!=b', 'b==c', 'c==a']) is False, '!= бірінші тұрса да: False'\nassert consistent(['a==a', 'b!=c']) is True, 'True болуы керек'\nassert consistent(['c==c', 'b==d', 'x!=z']) is True, 'True болуы керек'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Желіні қосу",
   "prompt": "<p>Кеңседе <code>n</code> компьютер, <code>cables</code> — бар кабельдер. Кабельді бір жұптан алып, басқа жұпқа қайта қосуға болады. Барлық компьютерді бір желіге қосу үшін ең аз неше кабельді жылжыту керек? <code>moves_needed(n, cables)</code> қайтарсын; кабель жеткіліксіз болса <code>-1</code>. Кеңес: кабель саны <code>n − 1</code>-ден аз болса мүмкін емес; әйтпесе жауап — компоненттер саны − 1.</p>\n<pre><code>moves_needed(4, [(0, 1), (0, 2), (1, 2)])                 → 1\nmoves_needed(6, [(0, 1), (0, 2), (0, 3), (1, 2)])         → -1</code></pre>",
   "starter": "def moves_needed(n, cables):\n    pass\n",
   "solution": "def moves_needed(n, cables):\n    if len(cables) < n - 1:\n        return -1\n    parent = list(range(n))\n    def find(x):\n        while parent[x] != x:\n            parent[x] = parent[parent[x]]\n            x = parent[x]\n        return x\n    comps = n\n    for a, b in cables:\n        ra, rb = find(a), find(b)\n        if ra != rb:\n            parent[ra] = rb\n            comps -= 1\n    return comps - 1\n",
   "hints": [
    "Компоненттер санын <code>n</code>-нен бастап, әр сәтті <code>union</code> кезінде 1-ге азайтыңыз."
   ],
   "check": {
    "tests": "\nassert moves_needed(4, [(0, 1), (0, 2), (1, 2)]) == 1, 'Күтілгені 1'\nassert moves_needed(6, [(0, 1), (0, 2), (0, 3), (1, 2)]) == -1, 'Кабель жеткіліксіз: -1'\nassert moves_needed(6, [(0, 1), (0, 2), (0, 3), (1, 2), (1, 3)]) == 2, 'Күтілгені 2'\nassert moves_needed(1, []) == 0, 'Бір компьютер: 0'\nassert moves_needed(3, [(0, 1), (1, 2)]) == 0, 'Бәрі қосылған: 0'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Алынатын тастар",
   "prompt": "<p>Тақтада <code>stones</code> — <code>(жол, баған)</code> координаталарындағы тастар (әртүрлі). Бір тасты алуға болады, егер оның жолында немесе бағанында <b>тағы бір</b> тас тұрса. <code>max_removed(stones)</code> ең көп неше тасты алуға болатынын қайтарсын. Ортақ жолы немесе бағаны бар тастарды union-find арқылы біріктіріңіз: әр топтан бір тастан басқасының бәрін алуға болады, жауап — <code>тас саны − топ саны</code>.</p>\n<pre><code>max_removed([(0, 0), (0, 1), (1, 0), (1, 2), (2, 1), (2, 2)]) → 5\nmax_removed([(0, 0), (0, 2), (1, 1), (2, 0), (2, 2)])         → 3</code></pre>",
   "starter": "def max_removed(stones):\n    pass\n",
   "solution": "def max_removed(stones):\n    parent = {}\n    def find(x):\n        parent.setdefault(x, x)\n        while parent[x] != x:\n            parent[x] = parent[parent[x]]\n            x = parent[x]\n        return x\n    for r, c in stones:\n        parent[find(('r', r))] = find(('c', c))\n    roots = {find(('r', r)) for r, c in stones}\n    return len(stones) - len(roots)\n",
   "hints": [
    "Тастың өзін емес, оның жолы мен бағанын төбе етіңіз: <code>('r', r)</code> және <code>('c', c)</code> — әр тас олардың екеуін біріктіреді.",
    "Топ саны — тастардың жолдарының әртүрлі түбірлері саны."
   ],
   "check": {
    "tests": "\nassert max_removed([(0, 0), (0, 1), (1, 0), (1, 2), (2, 1), (2, 2)]) == 5, 'Күтілгені 5'\nassert max_removed([(0, 0), (0, 2), (1, 1), (2, 0), (2, 2)]) == 3, 'Күтілгені 3'\nassert max_removed([(0, 0)]) == 0, 'Бір тас: 0'\nassert max_removed([]) == 0, 'Тас жоқ: 0'\nassert max_removed([(0, 0), (1, 1), (2, 2)]) == 0, 'Ортақ жол/баған жоқ: 0'\nassert max_removed([(0, 1), (1, 0)]) == 0, 'Ортақ жол/баған жоқ: 0'\nassert max_removed([(5, 1), (5, 9), (3, 9)]) == 2, 'Тізбек: 2'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Аралдар пайда болуы",
   "prompt": "<p>Теңізде <code>R × C</code> тор, басында бәрі су. <code>positions</code> бойынша кезекпен құрлық пайда болады. <code>islands_over_time(R, C, positions)</code> әр қосылудан кейінгі аралдар (төрт бағытта көршілес құрлық ұяшықтарының топтары) санының тізімін қайтарсын. Бір позиция қайталануы мүмкін. Union-find: жаңа ұяшық +1 арал, әр құрлық көршімен сәтті біріктіру −1. Барлығы O(k·α).</p>\n<pre><code>islands_over_time(3, 3, [(0, 0), (0, 1), (1, 2), (2, 1), (1, 1)]) → [1, 1, 2, 3, 1]</code></pre>",
   "starter": "def islands_over_time(R, C, positions):\n    pass\n",
   "solution": "def islands_over_time(R, C, positions):\n    parent = {}\n    def find(x):\n        while parent[x] != x:\n            parent[x] = parent[parent[x]]\n            x = parent[x]\n        return x\n    count = 0\n    res = []\n    for r, c in positions:\n        if (r, c) not in parent:\n            parent[(r, c)] = (r, c)\n            count += 1\n            for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):\n                if (nr, nc) in parent:\n                    a, b = find((r, c)), find((nr, nc))\n                    if a != b:\n                        parent[a] = b\n                        count -= 1\n        res.append(count)\n    return res\n",
   "hints": [
    "<code>parent</code> сөздігінде тек құрлық ұяшықтары бар; кілт жоқ — су.",
    "Қайталанған позиция санды өзгертпейді."
   ],
   "check": {
    "tests": "\nassert islands_over_time(3, 3, [(0, 0), (0, 1), (1, 2), (2, 1), (1, 1)]) == [1, 1, 2, 3, 1], 'Күтілгені [1, 1, 2, 3, 1]'\nassert islands_over_time(1, 1, [(0, 0), (0, 0)]) == [1, 1], 'Қайталанған позиция: [1, 1]'\nassert islands_over_time(2, 2, []) == [], 'Позиция жоқ: []'\nassert islands_over_time(1, 3, [(0, 0), (0, 2), (0, 1)]) == [1, 2, 1], 'Ортадағы ұяшық екі аралды біріктіреді'\nassert islands_over_time(2, 2, [(0, 0), (1, 1)]) == [1, 2], 'Диагональ көрші емес: [1, 2]'\nimport random as _random, time as _time\n_rng = _random.Random(2)\ndef _count(land):\n    seen = set(); c = 0\n    for s in land:\n        if s in seen: continue\n        c += 1; st = [s]; seen.add(s)\n        while st:\n            r, cc = st.pop()\n            for q in ((r + 1, cc), (r - 1, cc), (r, cc + 1), (r, cc - 1)):\n                if q in land and q not in seen: seen.add(q); st.append(q)\n    return c\nfor _ in range(20):\n    _R, _C = _rng.randint(1, 5), _rng.randint(1, 5)\n    _pos = [(_rng.randrange(_R), _rng.randrange(_C)) for _ in range(_rng.randint(0, 15))]\n    _exp = [_count(set(_pos[:i + 1])) for i in range(len(_pos))]\n    assert islands_over_time(_R, _C, _pos) == _exp, f'islands_over_time({_R}, {_C}, {_pos}) {_exp} болуы керек'\n_pos = [(r, c) for r in range(200) for c in range(200)]; _rng.shuffle(_pos)\n_t0 = _time.perf_counter(); _r = islands_over_time(200, 200, _pos); _dt = _time.perf_counter() - _t0\nassert _r[-1] == 1 and _dt < 2.0, f'200×200: соңында 1 арал, union-find керек ({_dt:.2f} с)'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Бәрі танысқан уақыт",
   "prompt": "<p>Лагерьде <code>n</code> бала (<code>0..n−1</code>). <code>logs</code> — <code>(уақыт, a, b)</code>: осы уақытта <code>a</code> мен <code>b</code> танысты (ретсіз берілген). Таныстық транзитивті. <code>all_connected_time(n, logs)</code> барлық балалар бір топқа бірігетін <b>ең ерте</b> уақытты қайтарсын; ешқашан бірікпесе <code>-1</code>. Логтарды уақыт бойынша сұрыптап, union-find-та компоненттер санын қадағалаңыз.</p>\n<pre><code>all_connected_time(4, [(20, 0, 1), (10, 1, 2), (30, 2, 3), (25, 0, 2)]) → 30\nall_connected_time(3, [(5, 0, 1)])                                   → -1</code></pre>",
   "starter": "def all_connected_time(n, logs):\n    pass\n",
   "solution": "def all_connected_time(n, logs):\n    if n <= 1:\n        return 0\n    parent = list(range(n))\n    def find(x):\n        while parent[x] != x:\n            parent[x] = parent[parent[x]]\n            x = parent[x]\n        return x\n    comps = n\n    for t, a, b in sorted(logs):\n        ra, rb = find(a), find(b)\n        if ra != rb:\n            parent[ra] = rb\n            comps -= 1\n            if comps == 1:\n                return t\n    return -1\n",
   "hints": [
    "<code>sorted(logs)</code> кортеждерді алдымен уақыт бойынша сұрыптайды.",
    "Компоненттер саны 1-ге жеткен сәттегі уақыт — жауап. Бір бала болса — 0."
   ],
   "check": {
    "tests": "\nassert all_connected_time(4, [(20, 0, 1), (10, 1, 2), (30, 2, 3), (25, 0, 2)]) == 30, 'Күтілгені 30'\nassert all_connected_time(3, [(5, 0, 1)]) == -1, 'Бірікпейді: -1'\nassert all_connected_time(1, []) == 0, 'Бір бала: 0'\nassert all_connected_time(2, [(7, 1, 0), (3, 0, 1)]) == 3, 'Ең ерте уақыт: 3'\nassert all_connected_time(3, [(1, 0, 1), (2, 1, 0), (9, 2, 1)]) == 9, 'Күтілгені 9'\nimport random as _random\n_rng = _random.Random(3)\nfor _ in range(30):\n    _n = _rng.randint(2, 6)\n    _logs = [(_rng.randint(0, 50), _rng.randrange(_n), _rng.randrange(_n)) for _ in range(_rng.randint(0, 10))]\n    _exp = -1\n    for _t in sorted(set(x[0] for x in _logs)):\n        _p = list(range(_n))\n        def _f(x):\n            while _p[x] != x: x = _p[x]\n            return x\n        for t2, a, b in _logs:\n            if t2 <= _t: _p[_f(a)] = _f(b)\n        if len({_f(i) for i in range(_n)}) == 1:\n            _exp = _t; break\n    assert all_connected_time(_n, _logs) == _exp, f'all_connected_time({_n}, {_logs}) {_exp} болуы керек'\n"
   }
  }
 ],
 "alg-7": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Граф сөздігін құру",
   "prompt": "<p><code>build_graph(edges, directed)</code>: <code>edges</code> — <code>(u, v, w)</code> қырлары. Сөздік қайтарыңыз: төбе → <code>[(көрші, салмақ)]</code> тізімі (қырлар берілген ретпен). <code>directed=False</code> болса, әр қыр екі жаққа қосылады. Кездескен <b>әр</b> төбе кілт болсын (шығатын қыры жоқ болса да, бос тізіммен).</p>\n<pre><code>build_graph([('A', 'B', 5), ('B', 'C', 2)], True)\n→ {'A': [('B', 5)], 'B': [('C', 2)], 'C': []}</code></pre>",
   "starter": "def build_graph(edges, directed):\n    pass\n",
   "solution": "def build_graph(edges, directed):\n    g = {}\n    for u, v, w in edges:\n        g.setdefault(u, []).append((v, w))\n        g.setdefault(v, [])\n        if not directed:\n            g[v].append((u, w))\n    return g\n",
   "hints": [
    "<code>g.setdefault(v, [])</code> — тек кіріс қыры бар төбе де кілт болады."
   ],
   "check": {
    "tests": "\nassert build_graph([('A', 'B', 5), ('B', 'C', 2)], True) == {'A': [('B', 5)], 'B': [('C', 2)], 'C': []}, 'Бағытталған граф қате'\nassert build_graph([('A', 'B', 5)], False) == {'A': [('B', 5)], 'B': [('A', 5)]}, 'Бағытсыз граф: екі жаққа'\nassert build_graph([], False) == {}, 'Қыр жоқ: {}'\nassert build_graph([(1, 2, 3), (1, 3, 4)], False) == {1: [(2, 3), (3, 4)], 2: [(1, 3)], 3: [(1, 4)]}, 'Бүтін төбелер, рет сақталады'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Маршрут құны",
   "prompt": "<p><code>graph</code> — төбе → <code>[(көрші, салмақ)]</code>. <code>route_cost(graph, route)</code> маршрут бойынша жалпы қашықтықты қайтарсын. Екі төбе арасында бірнеше қыр болса — ең қысқасы. Маршрутта жоқ қыр болса <code>None</code>. Бір төбеден тұратын маршрут — 0.</p>\n<pre><code>g = {'Алматы': [('Қонаев', 70), ('Талдықорған', 270)], 'Қонаев': [('Талдықорған', 210)]}\nroute_cost(g, ['Алматы', 'Қонаев', 'Талдықорған']) → 280\nroute_cost(g, ['Қонаев', 'Алматы'])                → None</code></pre>",
   "starter": "def route_cost(graph, route):\n    pass\n",
   "solution": "def route_cost(graph, route):\n    total = 0\n    for u, v in zip(route, route[1:]):\n        ws = [w for x, w in graph.get(u, []) if x == v]\n        if not ws:\n            return None\n        total += min(ws)\n    return total\n",
   "hints": [
    "Көрші жұптарды <code>zip(route, route[1:])</code> арқылы алыңыз.",
    "<code>graph.get(u, [])</code> — төбе кілт болмауы да мүмкін."
   ],
   "check": {
    "tests": "\n_g = {'Алматы': [('Қонаев', 70), ('Талдықорған', 270)], 'Қонаев': [('Талдықорған', 210)]}\nassert route_cost(_g, ['Алматы', 'Қонаев', 'Талдықорған']) == 280, 'Күтілгені 280'\nassert route_cost(_g, ['Қонаев', 'Алматы']) is None, 'Бағытталған: кері қыр жоқ, None'\nassert route_cost(_g, ['Алматы']) == 0, 'Бір төбе: 0'\nassert route_cost(_g, ['Талдықорған', 'Алматы']) is None, 'Шығатын қыры жоқ төбе: None'\nassert route_cost({'a': [('b', 9), ('b', 4)]}, ['a', 'b']) == 4, 'Бірнеше қыр: ең қысқасы 4'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ең жақын көрші қала",
   "prompt": "<p><code>nearest(graph, u)</code> <code>u</code>-дан шығатын қырлардың ішіндегі салмағы ең кішісінің көршісін қайтарсын; тең болса — атауы кіші (<code>&lt;</code>) көршіні. Шығатын қыр жоқ болса <code>None</code>.</p>\n<pre><code>nearest({'A': [('B', 5), ('C', 2), ('D', 2)]}, 'A') → 'C'\nnearest({'A': []}, 'A')                          → None</code></pre>",
   "starter": "def nearest(graph, u):\n    pass\n",
   "solution": "def nearest(graph, u):\n    best = None\n    for v, w in graph.get(u, []):\n        if best is None or (w, v) < best:\n            best = (w, v)\n    return best[1] if best else None\n",
   "hints": [
    "<code>(салмақ, көрші)</code> кортежін салыстыру тең салмақты да дұрыс шешеді."
   ],
   "check": {
    "tests": "\nassert nearest({'A': [('B', 5), ('C', 2), ('D', 2)]}, 'A') == 'C', \"Күтілгені 'C'\"\nassert nearest({'A': []}, 'A') is None, 'Қыр жоқ: None'\nassert nearest({}, 'X') is None, 'Төбе жоқ: None'\nassert nearest({'A': [('Z', 0)]}, 'A') == 'Z', \"Салмақ 0: 'Z'\"\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең жақын өрт сөндіру бөлімі",
   "prompt": "<p>Қала картасы <code>graph</code> (бағытсыз, әр қыр екі жақта да жазылған), <code>stations</code> — өрт сөндіру бөлімдері орналасқан төбелер. <code>nearest_station(graph, stations)</code> сөздік қайтарсын: әр жетуге болатын төбе → <b>ең жақын</b> бөлімге дейінгі қашықтық. Көп көзді Dijkstra: барлық бөлімді heap-ке 0 қашықтықпен бірден салыңыз — бір рет іске қосу жеткілікті.</p>\n<pre><code>g = {'A': [('B', 4)], 'B': [('A', 4), ('C', 1)], 'C': [('B', 1)], 'D': []}\nnearest_station(g, ['A', 'C']) → {'A': 0, 'C': 0, 'B': 1}</code></pre>",
   "starter": "import heapq\n\ndef nearest_station(graph, stations):\n    pass\n",
   "solution": "import heapq\n\ndef nearest_station(graph, stations):\n    dist = {}\n    pq = [(0, s) for s in stations]\n    heapq.heapify(pq)\n    while pq:\n        d, u = heapq.heappop(pq)\n        if u in dist:\n            continue\n        dist[u] = d\n        for v, w in graph.get(u, []):\n            if v not in dist:\n                heapq.heappush(pq, (d + w, v))\n    return dist\n",
   "hints": [
    "Бастапқы heap: <code>[(0, s) for s in stations]</code>.",
    "Қалғаны — кәдімгі Dijkstra; heap-тен бірінші шыққан қашықтық түпкілікті."
   ],
   "check": {
    "tests": "\n_g = {'A': [('B', 4)], 'B': [('A', 4), ('C', 1)], 'C': [('B', 1)], 'D': []}\nassert nearest_station(_g, ['A', 'C']) == {'A': 0, 'C': 0, 'B': 1}, \"Күтілгені {'A': 0, 'C': 0, 'B': 1}\"\nassert nearest_station(_g, []) == {}, 'Бөлім жоқ: {}'\nassert nearest_station(_g, ['D']) == {'D': 0}, 'Оқшау бөлім'\n_g2 = {0: [(1, 5), (2, 1)], 1: [(0, 5), (2, 1)], 2: [(0, 1), (1, 1), (3, 10)], 3: [(2, 10)]}\nassert nearest_station(_g2, [0, 3]) == {0: 0, 3: 0, 2: 1, 1: 2}, 'Күтілгені {0: 0, 3: 0, 2: 1, 1: 2}'\nimport random as _random, time as _time\n_rng = _random.Random(1)\n_n = 20000; _G = {i: [] for i in range(_n)}\nfor _ in range(60000):\n    _a, _b, _w = _rng.randrange(_n), _rng.randrange(_n), _rng.randint(1, 100)\n    _G[_a].append((_b, _w)); _G[_b].append((_a, _w))\n_t0 = _time.perf_counter(); nearest_station(_G, list(range(0, _n, 100))); _dt = _time.perf_counter() - _t0\nassert _dt < 3.0, f'{_dt:.2f} с: Dijkstra-ны бір рет іске қосыңыз (әр бөлімге бөлек емес)'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең сенімді жол",
   "prompt": "<p>Байланыс желісі: <code>n</code> түйін, <code>edges[i] = (u, v)</code> бағытсыз арна, <code>probs[i]</code> — оның хабарды жеткізу ықтималдығы (0..1). <code>best_prob(n, edges, probs, s, t)</code> <code>s</code>-тан <code>t</code>-ға ықтималдықтардың <b>көбейтіндісі</b> ең үлкен жолдың мәнін қайтарсын (жол жоқ болса 0.0). Dijkstra-ның нұсқасы: max-heap (теріс таңбамен), қашықтық орнына көбейтінді. Көбейткенде ықтималдық ешқашан өспейді, сондықтан greedy дұрыс.</p>\n<pre><code>best_prob(3, [(0, 1), (1, 2), (0, 2)], [0.5, 0.5, 0.2], 0, 2) → 0.25</code></pre>",
   "starter": "import heapq\n\ndef best_prob(n, edges, probs, s, t):\n    pass\n",
   "solution": "import heapq\n\ndef best_prob(n, edges, probs, s, t):\n    adj = [[] for _ in range(n)]\n    for (u, v), p in zip(edges, probs):\n        adj[u].append((v, p))\n        adj[v].append((u, p))\n    done = [False] * n\n    pq = [(-1.0, s)]\n    while pq:\n        np_, u = heapq.heappop(pq)\n        if done[u]:\n            continue\n        done[u] = True\n        if u == t:\n            return -np_\n        for v, p in adj[u]:\n            if not done[v]:\n                heapq.heappush(pq, (np_ * p, v))\n    return 0.0\n",
   "hints": [
    "Heap-те <code>(−ықтималдық, төбе)</code>: ең үлкен ықтималдық бірінші шығады.",
    "<code>t</code> heap-тен шыққанда — жауап."
   ],
   "check": {
    "tests": "\nassert abs(best_prob(3, [(0, 1), (1, 2), (0, 2)], [0.5, 0.5, 0.2], 0, 2) - 0.25) < 1e-9, 'Күтілгені 0.25'\nassert abs(best_prob(3, [(0, 1), (1, 2), (0, 2)], [0.5, 0.5, 0.3], 0, 2) - 0.3) < 1e-9, 'Тікелей арна жақсы: 0.3'\nassert best_prob(3, [(0, 1)], [0.5], 0, 2) == 0.0, 'Жол жоқ: 0.0'\nassert best_prob(2, [], [], 1, 1) == 1.0, 's = t: 1.0'\n_e = [(0, 1), (1, 2), (2, 3), (0, 3)]\nassert abs(best_prob(4, _e, [0.9, 0.9, 0.9, 0.7], 0, 3) - 0.729) < 1e-9, 'Ұзын жол сенімдірек: 0.729'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең қысқа жолдар саны",
   "prompt": "<p><code>n</code> қала, <code>roads</code> — <code>(u, v, w)</code> бағытсыз жолдар (<code>w &gt; 0</code>). <code>count_shortest(n, roads, s, t)</code> <code>s</code>-тан <code>t</code>-ға <b>ең қысқа</b> ұзындықтағы әртүрлі жолдардың санын қайтарсын (жол жоқ болса 0). Dijkstra кезінде <code>ways[v]</code> санауышын жүргізіңіз: қысқарақ жол табылса <code>ways[v] = ways[u]</code>, тең жол табылса <code>ways[v] += ways[u]</code>.</p>\n<pre><code>count_shortest(4, [(0, 1, 1), (0, 2, 1), (1, 3, 1), (2, 3, 1)], 0, 3) → 2</code></pre>",
   "starter": "import heapq\n\ndef count_shortest(n, roads, s, t):\n    pass\n",
   "solution": "import heapq\n\ndef count_shortest(n, roads, s, t):\n    adj = [[] for _ in range(n)]\n    for u, v, w in roads:\n        adj[u].append((v, w))\n        adj[v].append((u, w))\n    INF = float('inf')\n    dist = [INF] * n\n    ways = [0] * n\n    dist[s] = 0\n    ways[s] = 1\n    pq = [(0, s)]\n    while pq:\n        d, u = heapq.heappop(pq)\n        if d > dist[u]:\n            continue\n        for v, w in adj[u]:\n            nd = d + w\n            if nd < dist[v]:\n                dist[v] = nd\n                ways[v] = ways[u]\n                heapq.heappush(pq, (nd, v))\n            elif nd == dist[v]:\n                ways[v] += ways[u]\n    return ways[t]\n",
   "hints": [
    "Ескірген heap жазбаларын <code>d &gt; dist[u]</code> арқылы өткізіңіз — әйтпесе бір төбенің жолдары екі рет қосылады.",
    "Салмақ оң болғандықтан, <code>u</code> heap-тен шыққанда <code>ways[u]</code> түпкілікті."
   ],
   "check": {
    "tests": "\nassert count_shortest(4, [(0, 1, 1), (0, 2, 1), (1, 3, 1), (2, 3, 1)], 0, 3) == 2, 'Күтілгені 2'\nassert count_shortest(3, [(0, 1, 1)], 0, 2) == 0, 'Жол жоқ: 0'\nassert count_shortest(1, [], 0, 0) == 1, 's = t: 1'\nassert count_shortest(3, [(0, 1, 1), (1, 2, 1), (0, 2, 2)], 0, 2) == 2, 'Тікелей және айналма тең: 2'\nassert count_shortest(3, [(0, 1, 1), (0, 1, 1), (1, 2, 5)], 0, 2) == 2, 'Параллель жолдар: 2'\n_r = []\nfor _i in range(10):\n    _r += [(2 * _i, 2 * _i + 1, 1), (2 * _i, 2 * _i + 2, 2), (2 * _i + 1, 2 * _i + 2, 1)]\nassert count_shortest(21, _r, 0, 20) == 2 ** 10, '10 «ромб» тізбегі: 2^10 жол'\nimport random as _random\n_rng = _random.Random(4)\nfor _ in range(30):\n    _n = _rng.randint(2, 6)\n    _rd = [(_rng.randrange(_n), _rng.randrange(_n), _rng.randint(1, 3)) for _ in range(_rng.randint(0, 9))]\n    _rd = [x for x in _rd if x[0] != x[1]]\n    # brute force: DFS over simple paths with edge multiplicity\n    _adj = [[] for _ in range(_n)]\n    for _u, _v, _w in _rd: _adj[_u].append((_v, _w)); _adj[_v].append((_u, _w))\n    _lens = []\n    def _dfs(u, seen, L):\n        if u == _n - 1: _lens.append(L); return\n        for v, w in _adj[u]:\n            if v not in seen: _dfs(v, seen | {v}, L + w)\n    _dfs(0, {0}, 0)\n    _exp = _lens.count(min(_lens)) if _lens else 0\n    assert count_shortest(_n, _rd, 0, _n - 1) == _exp, f'count_shortest({_n}, {_rd}, 0, {_n - 1}) {_exp} болуы керек'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Бір жеңілдік купоны",
   "prompt": "<p>Такси жолдары <code>roads</code> — <code>(u, v, баға)</code> бағытсыз. Жолаушыда бір купон бар: бір жолдың бағасын екі есе азайтады (<code>баға // 2</code>). <code>cheapest_with_coupon(n, roads, s, t)</code> купонды ең тиімді қолданғандағы (немесе қолданбағандағы) ең аз бағаны қайтарсын; жол жоқ болса <code>-1</code>. Күй кеңістігі: <code>(төбе, купон_қолданылды_ма)</code> — Dijkstra 2n күйде.</p>\n<pre><code>cheapest_with_coupon(3, [(0, 1, 100), (1, 2, 30), (0, 2, 150)], 0, 2) → 75    # 150 // 2\ncheapest_with_coupon(3, [(0, 1, 100), (1, 2, 30)], 0, 2)              → 80    # 50 + 30</code></pre>",
   "starter": "import heapq\n\ndef cheapest_with_coupon(n, roads, s, t):\n    pass\n",
   "solution": "import heapq\n\ndef cheapest_with_coupon(n, roads, s, t):\n    adj = [[] for _ in range(n)]\n    for u, v, w in roads:\n        adj[u].append((v, w))\n        adj[v].append((u, w))\n    done = set()\n    pq = [(0, s, 0)]\n    while pq:\n        d, u, used = heapq.heappop(pq)\n        if (u, used) in done:\n            continue\n        done.add((u, used))\n        if u == t:\n            return d\n        for v, w in adj[u]:\n            if (v, used) not in done:\n                heapq.heappush(pq, (d + w, v, used))\n            if not used and (v, 1) not in done:\n                heapq.heappush(pq, (d + w // 2, v, 1))\n    return -1\n",
   "hints": [
    "Әр қырдан екі өту: купонсыз (күй өзгермейді) және купонмен (тек <code>used == 0</code> болса, <code>used</code> 1-ге айналады).",
    "<code>t</code> кез келген күйде heap-тен бірінші шыққанда — жауап."
   ],
   "check": {
    "tests": "\nassert cheapest_with_coupon(3, [(0, 1, 100), (1, 2, 30), (0, 2, 150)], 0, 2) == 75, 'Күтілгені 75'\nassert cheapest_with_coupon(3, [(0, 1, 100), (1, 2, 30)], 0, 2) == 80, 'Күтілгені 80'\nassert cheapest_with_coupon(3, [(0, 1, 5)], 0, 2) == -1, 'Жол жоқ: -1'\nassert cheapest_with_coupon(2, [], 1, 1) == 0, 's = t: 0'\nassert cheapest_with_coupon(2, [(0, 1, 7)], 0, 1) == 3, '7 // 2 = 3'\nimport random as _random\n_rng = _random.Random(5)\nfor _ in range(40):\n    _n = _rng.randint(2, 6)\n    _rd = [(_rng.randrange(_n), _rng.randrange(_n), _rng.randint(1, 40)) for _ in range(_rng.randint(0, 9))]\n    _best = -1\n    for _ci in range(-1, len(_rd)):\n        _adj = [[] for _ in range(_n)]\n        for _i, (_u, _v, _w) in enumerate(_rd):\n            _ww = _w // 2 if _i == _ci else _w\n            _adj[_u].append((_v, _ww)); _adj[_v].append((_u, _ww))\n        _D = [None] * _n; _pq = [(0, 0)]\n        while _pq:\n            _d, _x = heapq.heappop(_pq)\n            if _D[_x] is not None: continue\n            _D[_x] = _d\n            for _y, _w in _adj[_x]: heapq.heappush(_pq, (_d + _w, _y))\n        if _D[_n - 1] is not None and (_best < 0 or _D[_n - 1] < _best): _best = _D[_n - 1]\n    assert cheapest_with_coupon(_n, _rd, 0, _n - 1) == _best, f'cheapest_with_coupon({_n}, {_rd}, 0, {_n - 1}) {_best} болуы керек'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Пойыз кестесімен жету",
   "prompt": "<p>Пойыздар кестесі <code>trains</code> — <code>(u, v, жөнелту, жол_уақыты)</code>: пойыз <code>u</code>-дан дәл <code>жөнелту</code> сағатында шығып, <code>v</code>-ға <code>жөнелту + жол_уақыты</code> сағатта келеді. Бекетте кез келген уақыт күтуге болады. <code>start</code> сағатта <code>src</code>-тамыз. <code>earliest_arrival(trains, src, dst, start)</code> <code>dst</code>-ға ең ерте келу уақытын қайтарсын (жету мүмкін болмаса <code>-1</code>). Dijkstra уақыт бойынша: <code>u</code>-ға <code>T</code> уақытта жетсек, тек <code>жөнелту ≥ T</code> пойыздарына отыра аламыз.</p>\n<pre><code>tr = [('Астана', 'Қарағанды', 8, 3), ('Қарағанды', 'Балқаш', 10, 5), ('Қарағанды', 'Балқаш', 12, 4), ('Астана', 'Балқаш', 9, 9)]\nearliest_arrival(tr, 'Астана', 'Балқаш', 7) → 16    # 8 → 11, 10-дағы кетті, 12 → 16\nearliest_arrival(tr, 'Астана', 'Балқаш', 9) → 18</code></pre>",
   "starter": "import heapq\n\ndef earliest_arrival(trains, src, dst, start):\n    pass\n",
   "solution": "import heapq\n\ndef earliest_arrival(trains, src, dst, start):\n    out = {}\n    for u, v, dep, dur in trains:\n        out.setdefault(u, []).append((dep, v, dur))\n    best = {}\n    pq = [(start, src)]\n    while pq:\n        T, u = heapq.heappop(pq)\n        if u in best:\n            continue\n        best[u] = T\n        if u == dst:\n            return T\n        for dep, v, dur in out.get(u, []):\n            if dep >= T and v not in best:\n                heapq.heappush(pq, (dep + dur, v))\n    return -1\n",
   "hints": [
    "Heap-те <code>(келу_уақыты, бекет)</code>: ерте келу әрқашан жақсы, өйткені кейінірек пойыздарды да күтуге болады.",
    "Тек <code>жөнелту ≥ T</code> пойыздарын қарастырыңыз."
   ],
   "check": {
    "tests": "\n_tr = [('Астана', 'Қарағанды', 8, 3), ('Қарағанды', 'Балқаш', 10, 5), ('Қарағанды', 'Балқаш', 12, 4), ('Астана', 'Балқаш', 9, 9)]\nassert earliest_arrival(_tr, 'Астана', 'Балқаш', 7) == 16, 'Күтілгені 16 (8-дегі пойыз, сосын 12-дегі)'\nassert earliest_arrival(_tr, 'Астана', 'Балқаш', 9) == 18, '8-дегі пойыз кетіп қалды: 18'\nassert earliest_arrival(_tr, 'Астана', 'Балқаш', 10) == -1, 'Барлық пойыз кетті: -1'\nassert earliest_arrival(_tr, 'Астана', 'Астана', 5) == 5, 'src = dst: start'\nassert earliest_arrival([('A', 'B', 5, 1)], 'A', 'B', 5) == 6, 'Дәл жөнелту сағатында отыруға болады'\n_tr2 = [('A', 'B', 1, 10), ('A', 'C', 2, 1), ('C', 'B', 4, 1)]\nassert earliest_arrival(_tr2, 'A', 'B', 0) == 5, 'Ауысып жүру тездеу: 5'\nimport random as _random\n_rng = _random.Random(6)\nfor _ in range(40):\n    _st = 'PQRS'\n    _T = [(_rng.choice(_st), _rng.choice(_st), _rng.randint(0, 12), _rng.randint(1, 4)) for _ in range(_rng.randint(0, 10))]\n    _s0 = _rng.randint(0, 5)\n    _arr = {'P': _s0}\n    for _ in range(12):\n        for u, v, dep, dur in _T:\n            if u in _arr and _arr[u] <= dep and dep + dur < _arr.get(v, 10**9):\n                _arr[v] = dep + dur\n    _exp = _arr.get('S', -1)\n    assert earliest_arrival(_T, 'P', 'S', _s0) == _exp, f'earliest_arrival({_T}, P, S, {_s0}) {_exp} болуы керек'\n"
   }
  }
 ],
 "alg-8": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қаңқалық ағаш па",
   "prompt": "<p><code>n</code> ауыл (<code>0..n−1</code>), <code>edges</code> — салынған <code>(u, v, w)</code> жолдар. Олар <b>spanning tree</b> құрай ма: барлық ауыл байланысқан және цикл жоқ? <code>is_spanning_tree(n, edges)</code> қайтарсын. Union-find: әр қырды қосқанда екі ұшы бұрыннан бір топта болса — цикл; соңында қыр саны <code>n − 1</code> болуы керек.</p>\n<pre><code>is_spanning_tree(3, [(0, 1, 4), (1, 2, 5)])            → True\nis_spanning_tree(3, [(0, 1, 4), (1, 2, 5), (0, 2, 1)]) → False</code></pre>",
   "starter": "def is_spanning_tree(n, edges):\n    pass\n",
   "solution": "def is_spanning_tree(n, edges):\n    if len(edges) != n - 1:\n        return False\n    parent = list(range(n))\n    def find(x):\n        while parent[x] != x:\n            parent[x] = parent[parent[x]]\n            x = parent[x]\n        return x\n    for u, v, w in edges:\n        a, b = find(u), find(v)\n        if a == b:\n            return False\n        parent[a] = b\n    return True\n",
   "hints": [
    "<code>n − 1</code> қыр және цикл жоқ болса, граф міндетті түрде байланысқан."
   ],
   "check": {
    "tests": "\nassert is_spanning_tree(3, [(0, 1, 4), (1, 2, 5)]) is True, 'Ағаш: True'\nassert is_spanning_tree(3, [(0, 1, 4), (1, 2, 5), (0, 2, 1)]) is False, 'Қыр көп: False'\nassert is_spanning_tree(1, []) is True, 'Бір ауыл: True'\nassert is_spanning_tree(4, [(0, 1, 1), (1, 0, 2), (2, 3, 1)]) is False, 'n − 1 қыр, бірақ цикл бар: False'\nassert is_spanning_tree(2, []) is False, 'Байланыспаған: False'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Kruskal таңдаған қырлар",
   "prompt": "<p><code>kruskal_edges(n, edges)</code> Kruskal алгоритмі таңдайтын қырларды <b>таңдалу ретімен</b> қайтарсын. Бірмәнді болу үшін қырларды <code>(w, u, v)</code> бойынша сұрыптаңыз (кортежді өзгертпей қайтарыңыз). Граф байланыспаған болса, minimum spanning <b>forest</b> қырлары шығады.</p>\n<pre><code>kruskal_edges(4, [(0, 1, 3), (1, 2, 1), (2, 3, 4), (0, 2, 2), (1, 3, 5)])\n→ [(1, 2, 1), (0, 2, 2), (2, 3, 4)]</code></pre>",
   "starter": "def kruskal_edges(n, edges):\n    pass\n",
   "solution": "def kruskal_edges(n, edges):\n    parent = list(range(n))\n    def find(x):\n        while parent[x] != x:\n            parent[x] = parent[parent[x]]\n            x = parent[x]\n        return x\n    res = []\n    for u, v, w in sorted(edges, key=lambda e: (e[2], e[0], e[1])):\n        a, b = find(u), find(v)\n        if a != b:\n            parent[a] = b\n            res.append((u, v, w))\n    return res\n",
   "hints": [
    "<code>sorted(edges, key=lambda e: (e[2], e[0], e[1]))</code>.",
    "Екі ұшы әртүрлі топта болса ғана қырды аламыз."
   ],
   "check": {
    "tests": "\nassert kruskal_edges(4, [(0, 1, 3), (1, 2, 1), (2, 3, 4), (0, 2, 2), (1, 3, 5)]) == [(1, 2, 1), (0, 2, 2), (2, 3, 4)], 'Таңдалған қырлар қате'\nassert kruskal_edges(1, []) == [], 'Бір төбе: []'\nassert kruskal_edges(4, [(0, 1, 1), (2, 3, 1)]) == [(0, 1, 1), (2, 3, 1)], 'Орман: екі қыр'\nassert kruskal_edges(3, [(0, 1, 2), (1, 2, 2), (0, 2, 2)]) == [(0, 1, 2), (0, 2, 2)], 'Тең салмақта (u, v) бойынша'\nassert kruskal_edges(2, [(0, 0, 1), (0, 1, 9)]) == [(0, 1, 9)], 'Өзіне қыр алынбайды'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ең арзан орман",
   "prompt": "<p>Ауылдардың бәрін бір желіге қосу мүмкін болмауы мүмкін. <code>forest_cost(n, roads)</code> minimum spanning <b>forest</b>-тың жалпы салмағын қайтарсын: әр байланысқан компоненттің MST салмақтарының қосындысы. Kruskal бұны өздігінен береді: <code>n − 1</code> қырға жетпесе де тоқтамаңыз.</p>\n<pre><code>forest_cost(5, [(0, 1, 4), (1, 2, 2), (0, 2, 3), (3, 4, 7)]) → 12</code></pre>",
   "starter": "def forest_cost(n, roads):\n    pass\n",
   "solution": "def forest_cost(n, roads):\n    parent = list(range(n))\n    def find(x):\n        while parent[x] != x:\n            parent[x] = parent[parent[x]]\n            x = parent[x]\n        return x\n    total = 0\n    for u, v, w in sorted(roads, key=lambda e: e[2]):\n        a, b = find(u), find(v)\n        if a != b:\n            parent[a] = b\n            total += w\n    return total\n",
   "hints": [
    "Қырларды салмақ бойынша сұрыптап, union-find-пен циклсіздерін қосыңыз."
   ],
   "check": {
    "tests": "\nassert forest_cost(5, [(0, 1, 4), (1, 2, 2), (0, 2, 3), (3, 4, 7)]) == 12, 'Күтілгені 12 (2 + 3 + 7)'\nassert forest_cost(3, []) == 0, 'Жол жоқ: 0'\nassert forest_cost(2, [(0, 1, 5), (0, 1, 3)]) == 3, 'Параллель жолдар: 3'\nassert forest_cost(4, [(0, 1, 1), (1, 2, 1), (2, 0, 1), (2, 3, 10)]) == 12, 'Күтілгені 12'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Нүктелерді қосу",
   "prompt": "<p>Қаладағы <code>points</code> нүктелерін кабельмен қосу керек; екі нүкте арасындағы кабель құны — Манхэттен қашықтығы <code>|x₁ − x₂| + |y₁ − y₂|</code>. <code>connect_cost(points)</code> барлық нүктені қосудың ең аз құнын қайтарсын. Граф толық (<code>n²</code> қыр), сондықтан heap-сіз Prim O(n²) ыңғайлы: әр нүктенің ағашқа дейінгі ең аз қашықтығын <code>dist</code> массивінде ұстаңыз.</p>\n<pre><code>connect_cost([(0, 0), (2, 2), (3, 10), (5, 2), (7, 0)]) → 20\nconnect_cost([(1, 1)])                                → 0</code></pre>",
   "starter": "def connect_cost(points):\n    pass\n",
   "solution": "def connect_cost(points):\n    n = len(points)\n    if n == 0:\n        return 0\n    INF = float('inf')\n    dist = [INF] * n\n    used = [False] * n\n    dist[0] = 0\n    total = 0\n    for _ in range(n):\n        u = -1\n        for i in range(n):\n            if not used[i] and (u < 0 or dist[i] < dist[u]):\n                u = i\n        used[u] = True\n        total += dist[u]\n        ux, uy = points[u]\n        for i in range(n):\n            if not used[i]:\n                d = abs(ux - points[i][0]) + abs(uy - points[i][1])\n                if d < dist[i]:\n                    dist[i] = d\n    return total\n",
   "hints": [
    "Әр қадамда ағашқа кірмеген, <code>dist</code>-і ең кіші нүктені алыңыз.",
    "Оны қосқаннан кейін қалған нүктелердің <code>dist</code>-ін жаңартыңыз."
   ],
   "check": {
    "tests": "\nassert connect_cost([(0, 0), (2, 2), (3, 10), (5, 2), (7, 0)]) == 20, 'Күтілгені 20'\nassert connect_cost([(1, 1)]) == 0, 'Бір нүкте: 0'\nassert connect_cost([]) == 0, 'Нүкте жоқ: 0'\nassert connect_cost([(3, 12), (-2, 5), (-4, 1)]) == 18, 'Күтілгені 18'\nassert connect_cost([(0, 0), (0, 0)]) == 0, 'Бір орындағы нүктелер: 0'\nimport random as _random, time as _time\n_rng = _random.Random(1)\n_pts = [(_rng.randint(-10**4, 10**4), _rng.randint(-10**4, 10**4)) for _ in range(500)]\n_t0 = _time.perf_counter(); connect_cost(_pts); _dt = _time.perf_counter() - _t0\nassert _dt < 3.0, f'500 нүктеге {_dt:.2f} с: O(n²) Prim керек'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "MST-тегі ең ауыр жол",
   "prompt": "<p><code>mst_bottleneck(n, roads)</code> minimum spanning tree-дегі ең ауыр (салмағы ең үлкен) қырдың салмағын қайтарсын. Бұл — барлық ауылды байланыстыру үшін рұқсат етілетін ең кіші «жол сапасы шегі». Граф байланыспаған болса <code>-1</code>, бір ауыл болса 0.</p>\n<pre><code>mst_bottleneck(4, [(0, 1, 3), (1, 2, 1), (2, 3, 4), (0, 2, 2), (1, 3, 5)]) → 4\nmst_bottleneck(3, [(0, 1, 1)])                                       → -1</code></pre>",
   "starter": "def mst_bottleneck(n, roads):\n    pass\n",
   "solution": "def mst_bottleneck(n, roads):\n    if n <= 1:\n        return 0\n    parent = list(range(n))\n    def find(x):\n        while parent[x] != x:\n            parent[x] = parent[parent[x]]\n            x = parent[x]\n        return x\n    comps = n\n    for u, v, w in sorted(roads, key=lambda e: e[2]):\n        a, b = find(u), find(v)\n        if a != b:\n            parent[a] = b\n            comps -= 1\n            if comps == 1:\n                return w\n    return -1\n",
   "hints": [
    "Kruskal салмақ өсу ретімен қосады: соңғы қосылған қыр — ең ауыры.",
    "Компоненттер саны 1-ге жеткенде тоқтаңыз."
   ],
   "check": {
    "tests": "\nassert mst_bottleneck(4, [(0, 1, 3), (1, 2, 1), (2, 3, 4), (0, 2, 2), (1, 3, 5)]) == 4, 'Күтілгені 4'\nassert mst_bottleneck(3, [(0, 1, 1)]) == -1, 'Байланыспаған: -1'\nassert mst_bottleneck(1, []) == 0, 'Бір ауыл: 0'\nassert mst_bottleneck(2, [(0, 1, 7), (1, 0, 2)]) == 2, 'Параллель жолдар: 2'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Құдық пен құбыр",
   "prompt": "<p><code>n</code> ауылға су керек. <code>wells[i]</code> — <code>i</code>-ауылда құдық қазу құны, <code>pipes</code> — <code>(u, v, баға)</code>: екі ауылды құбырмен қосу құны. Ауыл суды өз құдығынан немесе құбыр арқылы басқа ауылдан ала алады. <code>water_cost(wells, pipes)</code> ең аз жалпы құнды қайтарсын. Айла: виртуалды «жер асты көзі» <code>n</code>-төбесін қосып, оны әр ауылмен <code>wells[i]</code> салмақты қырмен байланыстырыңыз — сонда жауап кәдімгі MST.</p>\n<pre><code>water_cost([1, 2, 2], [(0, 1, 1), (1, 2, 1)]) → 3     # 0-ге құдық, екі құбыр</code></pre>",
   "starter": "def water_cost(wells, pipes):\n    pass\n",
   "solution": "def water_cost(wells, pipes):\n    n = len(wells)\n    edges = [(w, n, i) for i, w in enumerate(wells)] + [(w, u, v) for u, v, w in pipes]\n    edges.sort()\n    parent = list(range(n + 1))\n    def find(x):\n        while parent[x] != x:\n            parent[x] = parent[parent[x]]\n            x = parent[x]\n        return x\n    total = 0\n    for w, u, v in edges:\n        a, b = find(u), find(v)\n        if a != b:\n            parent[a] = b\n            total += w\n    return total\n",
   "hints": [
    "Виртуалды төбе <code>n</code>: қырлар <code>(n, i, wells[i])</code>.",
    "Енді <code>n + 1</code> төбелі графтың MST салмағы — жауап."
   ],
   "check": {
    "tests": "\nassert water_cost([1, 2, 2], [(0, 1, 1), (1, 2, 1)]) == 3, 'Күтілгені 3'\nassert water_cost([5], []) == 5, 'Бір ауыл: құдық қазу'\nassert water_cost([1, 1], [(0, 1, 100)]) == 2, 'Құбыр қымбат: екі құдық, 2'\nassert water_cost([10, 10, 10], [(0, 1, 1), (1, 2, 1), (0, 2, 1)]) == 12, 'Бір құдық + екі құбыр: 12'\nassert water_cost([], []) == 0, 'Ауыл жоқ: 0'\nimport random as _random\nfrom itertools import product as _prod\n_rng = _random.Random(2)\nfor _ in range(25):\n    _n = _rng.randint(1, 4); _w = [_rng.randint(1, 20) for _ in range(_n)]\n    _p = [(_rng.randrange(_n), _rng.randrange(_n), _rng.randint(1, 20)) for _ in range(_rng.randint(0, 5))]\n    _best = None\n    for _mask in _prod([0, 1], repeat=_n):\n        if not any(_mask): continue\n        _cost = sum(_w[i] for i in range(_n) if _mask[i])\n        _par = list(range(_n + 1))\n        def _f(x):\n            while _par[x] != x: x = _par[x]\n            return x\n        for i in range(_n):\n            if _mask[i]: _par[_f(i)] = _f(_n)\n        for _ww, _u, _v in sorted((w, u, v) for u, v, w in _p):\n            if _f(_u) != _f(_v): _par[_f(_u)] = _f(_v); _cost += _ww\n        if len({_f(i) for i in range(_n + 1)}) == 1 and (_best is None or _cost < _best): _best = _cost\n    assert water_cost(_w, _p) == _best, f'water_cost({_w}, {_p}) {_best} болуы керек'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Маңызды жолдар",
   "prompt": "<p><code>n</code> ауыл және <code>roads</code> — <code>(u, v, w)</code>, граф байланысқан. Жол <b>маңызды</b>, егер оны алып тастағанда MST салмағы өссе (немесе граф байланыссыз болып қалса). <code>critical_roads(n, roads)</code> маңызды жолдардың индекстерін өсу ретімен қайтарсын. <code>n ≤ 30</code>, жолдар ≤ 60: әр жолды алып тастап, Kruskal-ды қайта іске қосу жеткілікті.</p>\n<pre><code>critical_roads(5, [(0, 1, 1), (1, 2, 1), (2, 3, 2), (0, 3, 2), (0, 4, 3), (3, 4, 3), (1, 4, 6)])\n→ [0, 1]</code></pre>",
   "starter": "def critical_roads(n, roads):\n    pass\n",
   "solution": "def critical_roads(n, roads):\n    order = sorted(range(len(roads)), key=lambda i: roads[i][2])\n    def mst(skip):\n        parent = list(range(n))\n        def find(x):\n            while parent[x] != x:\n                parent[x] = parent[parent[x]]\n                x = parent[x]\n            return x\n        total, cnt = 0, 0\n        for i in order:\n            if i == skip:\n                continue\n            u, v, w = roads[i]\n            a, b = find(u), find(v)\n            if a != b:\n                parent[a] = b\n                total += w\n                cnt += 1\n        return total if cnt == n - 1 else float('inf')\n    base = mst(-1)\n    return [i for i in range(len(roads)) if mst(i) > base]\n",
   "hints": [
    "Kruskal-ды «<code>skip</code> индексті қырсыз» нұсқамен жазыңыз; байланыспаса шексіздік қайтарсын.",
    "Сұрыптауды бір рет жасап, индекстер ретін сақтаңыз."
   ],
   "check": {
    "tests": "\nassert critical_roads(5, [(0, 1, 1), (1, 2, 1), (2, 3, 2), (0, 3, 2), (0, 4, 3), (3, 4, 3), (1, 4, 6)]) == [0, 1], 'Күтілгені [0, 1]'\nassert critical_roads(4, [(0, 1, 1), (1, 2, 1), (2, 3, 1), (0, 3, 1)]) == [], 'Барлығы тең цикл: []'\nassert critical_roads(2, [(0, 1, 5)]) == [0], 'Жалғыз жол: [0]'\nassert critical_roads(3, [(0, 1, 1), (1, 2, 1), (0, 2, 5)]) == [0, 1], 'Күтілгені [0, 1]'\nassert critical_roads(1, []) == [], 'Бір ауыл: []'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "k кластерге бөлу",
   "prompt": "<p>Дүкендер <code>n</code> төбе, <code>dists</code> — <code>(u, v, қашықтық)</code>. Оларды <code>k</code> кластерге (аймаққа) бөлеміз, кластерлер арасындағы <b>ең кіші</b> қашықтық (spacing) мүмкіндігінше үлкен болсын. Kruskal: компоненттер саны <code>k</code>-ға жеткенше қырларды біріктіріңіз; сосын әртүрлі компоненттерді қосатын келесі ең жеңіл қырдың салмағы — жауап. <code>max_spacing(n, dists, k)</code> осы мәнді қайтарсын; ондай қыр қалмаса (кластерлер арасында қыр жоқ) <code>-1</code>. <code>1 ≤ k ≤ n</code>.</p>\n<pre><code>_d = [(0, 1, 1), (1, 2, 2), (2, 3, 10), (3, 4, 1), (0, 4, 12)]\nmax_spacing(5, _d, 2) → 10\nmax_spacing(5, _d, 3) → 2</code></pre>",
   "starter": "def max_spacing(n, dists, k):\n    pass\n",
   "solution": "def max_spacing(n, dists, k):\n    parent = list(range(n))\n    def find(x):\n        while parent[x] != x:\n            parent[x] = parent[parent[x]]\n            x = parent[x]\n        return x\n    comps = n\n    for u, v, w in sorted(dists, key=lambda e: e[2]):\n        a, b = find(u), find(v)\n        if a == b:\n            continue\n        if comps == k:\n            return w\n        parent[a] = b\n        comps -= 1\n    return -1\n",
   "hints": [
    "Компоненттер саны <code>k</code> болғаннан кейін кездескен бірінші «әртүрлі топ» қыры — жауап.",
    "Бір топтағы қырлар (цикл жасайтындар) кластер аралық емес — оларды өткізіңіз."
   ],
   "check": {
    "tests": "\n_d = [(0, 1, 1), (1, 2, 2), (2, 3, 10), (3, 4, 1), (0, 4, 12)]\nassert max_spacing(5, _d, 2) == 10, 'k = 2: 10'\nassert max_spacing(5, _d, 3) == 2, 'k = 3: 2'\nassert max_spacing(5, _d, 5) == 1, 'k = n: ең жеңіл қыр 1'\nassert max_spacing(5, _d, 1) == -1, 'k = 1: кластер аралық қыр жоқ, -1'\nassert max_spacing(4, [(0, 1, 3)], 2) == -1, 'Кластерлер арасында қыр қалмаса: -1'\nassert max_spacing(3, [(0, 1, 5), (1, 2, 5), (0, 2, 5)], 2) == 5, 'Тең салмақтар: 5'\n"
   }
  }
 ],
 "alg-9": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Соңына жету",
   "prompt": "<p>Тау бөктеріндегі тастар: <code>jumps[i]</code> — <code>i</code>-тастан алға қарай ең көбі неше тасқа секіруге болады. 0-тастан бастаймыз. <code>can_reach(jumps)</code> соңғы тасқа жетуге болса <code>True</code>. Greedy: қол жететін ең алыс индексті <code>far</code> жаңартып отырыңыз; <code>i &gt; far</code> болса — тұйық. O(n).</p>\n<pre><code>can_reach([2, 3, 1, 1, 4]) → True\ncan_reach([3, 2, 1, 0, 4]) → False</code></pre>",
   "starter": "def can_reach(jumps):\n    pass\n",
   "solution": "def can_reach(jumps):\n    far = 0\n    for i, j in enumerate(jumps):\n        if i > far:\n            return False\n        far = max(far, i + j)\n    return True\n",
   "hints": [
    "<code>far = max(far, i + jumps[i])</code>."
   ],
   "check": {
    "tests": "\nassert can_reach([2, 3, 1, 1, 4]) is True, 'True болуы керек'\nassert can_reach([3, 2, 1, 0, 4]) is False, '3-тастағы 0-ден өту мүмкін емес: False'\nassert can_reach([0]) is True, 'Бір тас: True'\nassert can_reach([0, 1]) is False, 'Бастапқы тас 0: False'\nassert can_reach([1, 0, 1]) is False, 'Күтілгені False'\nimport random as _random, time as _time\n_rng = _random.Random(1)\nfor _ in range(40):\n    _x = [_rng.randint(0, 3) for _ in range(_rng.randint(1, 10))]\n    _ok = [False] * len(_x); _ok[0] = True\n    for _i in range(len(_x)):\n        if _ok[_i]:\n            for _k in range(1, _x[_i] + 1):\n                if _i + _k < len(_x): _ok[_i + _k] = True\n    assert can_reach(_x) == _ok[-1], f'can_reach({_x}) {_ok[-1]} болуы керек'\n_big = [1] * 200000\n_t0 = _time.perf_counter(); _r = can_reach(_big); _dt = _time.perf_counter() - _t0\nassert _r is True and _dt < 1.0, f'O(n) greedy керек ({_dt:.2f} с)'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бауырсақ тарату",
   "prompt": "<p>Балабақшада әр баланың тәбеті <code>need[i]</code>, табақтардағы бауырсақ саны <code>plates[j]</code>. Әр балаға ең көбі бір табақ беріледі, бала <code>plates[j] ≥ need[i]</code> болса ғана тояды. <code>fed_children(need, plates)</code> ең көп неше бала тоятынын қайтарсын. Greedy: екеуін сұрыптап, ең кішкентай тәбетті балаға оны тойдыратын ең кіші табақты беріңіз.</p>\n<pre><code>fed_children([1, 2, 3], [1, 1])    → 1\nfed_children([1, 2], [1, 2, 3])    → 2</code></pre>",
   "starter": "def fed_children(need, plates):\n    pass\n",
   "solution": "def fed_children(need, plates):\n    g = sorted(need)\n    s = sorted(plates)\n    i = 0\n    for p in s:\n        if i < len(g) and p >= g[i]:\n            i += 1\n    return i\n",
   "hints": [
    "Табақтарды кішісінен бастап аралаңыз: табақ ағымдағы баланы тойдырса, келесі балаға өтіңіз."
   ],
   "check": {
    "tests": "\nassert fed_children([1, 2, 3], [1, 1]) == 1, 'Күтілгені 1'\nassert fed_children([1, 2], [1, 2, 3]) == 2, 'Күтілгені 2'\nassert fed_children([], [5]) == 0, 'Бала жоқ: 0'\nassert fed_children([3], []) == 0, 'Табақ жоқ: 0'\nassert fed_children([10, 9, 8, 7], [5, 6, 7, 8]) == 2, 'Ретсіз кіріс: 2'\nimport random as _random\nfrom itertools import permutations as _perm\n_rng = _random.Random(2)\nfor _ in range(30):\n    _g = [_rng.randint(1, 6) for _ in range(_rng.randint(0, 4))]; _s = [_rng.randint(1, 6) for _ in range(_rng.randint(0, 4))]\n    _best = 0\n    for _p in _perm(range(len(_s))):\n        _best = max(_best, sum(1 for i, j in zip(range(len(_g)), _p) if _s[j] >= _g[i]))\n    assert fed_children(_g, _s) == _best, f'fed_children({_g}, {_s}) {_best} болуы керек'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қымыз дүңгіршегі",
   "prompt": "<p>Бір кесе қымыз 500 теңге. Кезектегі сатып алушылар <code>bills</code> ретімен 500, 1000 немесе 2000 теңгелік купюра береді. Басында кассада ақша жоқ. <code>can_change(bills)</code> әр сатып алушыға дұрыс қайтарым беруге болса <code>True</code>. Greedy: 2000-ға қайтарым (1500) бергенде алдымен 1000 + 500 беріңіз, жоқ болса 500 × 3 — 500-дік купюралар әмбебап, оларды сақтаған жөн.</p>\n<pre><code>can_change([500, 500, 1000, 2000]) → True\ncan_change([1000])                 → False\ncan_change([500, 500, 500, 2000, 1000]) → False</code></pre>",
   "starter": "def can_change(bills):\n    pass\n",
   "solution": "def can_change(bills):\n    c500 = c1000 = 0\n    for b in bills:\n        if b == 500:\n            c500 += 1\n        elif b == 1000:\n            if c500 == 0:\n                return False\n            c500 -= 1\n            c1000 += 1\n        else:\n            if c1000 > 0 and c500 > 0:\n                c1000 -= 1\n                c500 -= 1\n            elif c500 >= 3:\n                c500 -= 3\n            else:\n                return False\n    return True\n",
   "hints": [
    "Тек 500 және 1000 купюраларының санын сақтау жеткілікті (2000 ешқашан қайтарымға жүрмейді)."
   ],
   "check": {
    "tests": "\nassert can_change([500, 500, 1000, 2000]) is True, 'True болуы керек'\nassert can_change([1000]) is False, 'Қайтарым жоқ: False'\nassert can_change([500, 500, 500, 2000, 1000]) is False, '2000-ға үш 500 кетті: False'\nassert can_change([]) is True, 'Сатып алушы жоқ: True'\nassert can_change([500, 1000, 500, 2000]) is True, '1000 + 500 қайтарым: True'\nassert can_change([500, 500, 1000, 500, 2000, 1000]) is True, 'Greedy 1000 + 500 таңдаса, соңғы 1000-ға 500 қалады: True'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең аз оқ",
   "prompt": "<p>Мерекеде көк шарлар көлденең сызыққа ілінген: әр шар <code>[start, end]</code> (тұйық аралық) жабады. <code>x</code> нүктесіне атылған тік оқ <code>start ≤ x ≤ end</code> болатын барлық шарды жарады. <code>min_arrows(balloons)</code> барлық шарды жаруға қажет ең аз оқ санын қайтарсын. Greedy: соңы бойынша сұрыптап, әр оқты ағымдағы шардың <b>соңына</b> атыңыз.</p>\n<pre><code>min_arrows([[10, 16], [2, 8], [1, 6], [7, 12]]) → 2\nmin_arrows([[1, 2], [2, 3], [3, 4], [4, 5]])     → 2\nmin_arrows([])                                   → 0</code></pre>",
   "starter": "def min_arrows(balloons):\n    pass\n",
   "solution": "def min_arrows(balloons):\n    arrows = 0\n    last = None\n    for s, e in sorted(balloons, key=lambda b: b[1]):\n        if last is None or s > last:\n            arrows += 1\n            last = e\n    return arrows\n",
   "hints": [
    "Соңы бойынша сұрыптау — interval scheduling-тегідей.",
    "Келесі шар соңғы оқтан кейін басталса (<code>s &gt; last</code>), жаңа оқ керек."
   ],
   "check": {
    "tests": "\nassert min_arrows([[10, 16], [2, 8], [1, 6], [7, 12]]) == 2, 'Күтілгені 2'\nassert min_arrows([[1, 2], [2, 3], [3, 4], [4, 5]]) == 2, 'Тұйық аралық: түйісу нүктесі бір оқпен, 2'\nassert min_arrows([]) == 0, 'Шар жоқ: 0'\nassert min_arrows([[1, 2], [3, 4], [5, 6]]) == 3, 'Қиылыспайды: 3'\nassert min_arrows([[1, 10], [2, 3], [4, 5]]) == 2, 'Күтілгені 2'\nimport random as _random\n_rng = _random.Random(3)\nfor _ in range(40):\n    _b = []\n    for _ in range(_rng.randint(0, 7)):\n        _s = _rng.randint(0, 15); _b.append([_s, _s + _rng.randint(0, 5)])\n    _best = None\n    from itertools import combinations as _comb\n    _pts = sorted(set(e for s, e in _b))\n    for _k in range(len(_pts) + 1):\n        if any(all(any(s <= x <= e for x in c) for s, e in _b) for c in _comb(_pts, _k)):\n            _best = _k; break\n    assert min_arrows(_b) == (_best or 0), f'min_arrows({_b}) {_best} болуы керек'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жанармай бекеттері",
   "prompt": "<p>Сақиналы жолда <code>n</code> бекет. <code>fuel[i]</code> — <code>i</code>-бекетте құйылатын жанармай, <code>cost[i]</code> — <code>i</code>-ден <code>i+1</code>-ге жүруге кететіні. Бак басында бос. <code>start_station(fuel, cost)</code> толық айналып шығуға болатын бастапқы бекет индексін қайтарсын (жауап бар болса, ол жалғыз), болмаса <code>-1</code>. Greedy O(n): жалпы қосынды теріс болса — <code>-1</code>; әйтпесе бак теріс бола қалған жерден кейінгі бекеттен қайта бастаңыз.</p>\n<pre><code>start_station([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]) → 3\nstart_station([2, 3, 4], [3, 4, 3])             → -1</code></pre>",
   "starter": "def start_station(fuel, cost):\n    pass\n",
   "solution": "def start_station(fuel, cost):\n    if sum(fuel) < sum(cost):\n        return -1\n    tank = 0\n    start = 0\n    for i in range(len(fuel)):\n        tank += fuel[i] - cost[i]\n        if tank < 0:\n            start = i + 1\n            tank = 0\n    return start\n",
   "hints": [
    "Егер <code>a</code>-дан бастап <code>b</code>-да бак теріс болса, <code>a..b</code> арасындағы ешбір бекет жарамайды.",
    "Жалпы баланс теріс емес болса, соңғы «қайта бастау» нүктесі — жауап."
   ],
   "check": {
    "tests": "\nassert start_station([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]) == 3, 'Күтілгені 3'\nassert start_station([2, 3, 4], [3, 4, 3]) == -1, 'Жанармай жетпейді: -1'\nassert start_station([5], [4]) == 0, 'Бір бекет: 0'\nassert start_station([4], [5]) == -1, 'Бір бекет, жетпейді: -1'\nassert start_station([3, 1, 1], [1, 2, 2]) == 0, 'Күтілгені 0'\nimport random as _random, time as _time\n_rng = _random.Random(4)\nfor _ in range(60):\n    _n = _rng.randint(1, 7); _f = [_rng.randint(0, 6) for _ in range(_n)]; _c = [_rng.randint(0, 6) for _ in range(_n)]\n    _ok = [s for s in range(_n) if all(sum(_f[(s + j) % _n] - _c[(s + j) % _n] for j in range(k + 1)) >= 0 for k in range(_n))]\n    _got = start_station(_f, _c)\n    if _ok:\n        assert _got in _ok, f'start_station({_f}, {_c}): {_got} жарамайды, мысалы {_ok[0]} болуы мүмкін'\n    else:\n        assert _got == -1, f'start_station({_f}, {_c}) -1 болуы керек'\n_n = 200000; _f = [1] * _n; _c = [1] * _n; _c[0] = 2; _f[-1] = 2\n_t0 = _time.perf_counter(); _r = start_station(_f, _c); _dt = _time.perf_counter() - _t0\nassert _r == 1 and _dt < 1.0, f'O(n) шешім керек ({_dt:.2f} с)'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең аз секіру",
   "prompt": "<p><code>jumps[i]</code> — <code>i</code>-тастан алға ең көбі неше тасқа секіруге болады; соңғы тасқа әрқашан жетуге болады. <code>min_jumps(jumps)</code> соңына жетудің ең аз секіру санын қайтарсын. Greedy (BFS деңгейлері сияқты): ағымдағы секіру жететін аралықтың шегіне келгенде, келесі ең алыс шекке секіріңіз. O(n).</p>\n<pre><code>min_jumps([2, 3, 1, 1, 4]) → 2\nmin_jumps([0])             → 0</code></pre>",
   "starter": "def min_jumps(jumps):\n    pass\n",
   "solution": "def min_jumps(jumps):\n    n = len(jumps)\n    steps = 0\n    end = 0\n    far = 0\n    for i in range(n - 1):\n        far = max(far, i + jumps[i])\n        if i == end:\n            steps += 1\n            end = far\n    return steps\n",
   "hints": [
    "<code>end</code> — ағымдағы секіру санымен жететін ең алыс индекс, <code>far</code> — келесі секірумен жететін ең алыс индекс.",
    "<code>i == end</code> болғанда секіру санын арттырып, <code>end = far</code>."
   ],
   "check": {
    "tests": "\nassert min_jumps([2, 3, 1, 1, 4]) == 2, 'Күтілгені 2'\nassert min_jumps([0]) == 0, 'Бір тас: 0'\nassert min_jumps([1, 1, 1, 1]) == 3, 'Күтілгені 3'\nassert min_jumps([5, 1, 1, 1]) == 1, 'Бір секіру жеткілікті: 1'\nassert min_jumps([2, 3, 0, 1, 4]) == 2, 'Күтілгені 2'\nimport random as _random\n_rng = _random.Random(5)\nfor _ in range(40):\n    _x = [_rng.randint(1, 3) for _ in range(_rng.randint(1, 12))]\n    _d = [0] + [10**9] * (len(_x) - 1)\n    for _i in range(len(_x)):\n        for _k in range(1, _x[_i] + 1):\n            if _i + _k < len(_x): _d[_i + _k] = min(_d[_i + _k], _d[_i] + 1)\n    assert min_jumps(_x) == _d[-1], f'min_jumps({_x}) {_d[-1]} болуы керек'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Бөлінетін жүк",
   "prompt": "<p>Көлікке ең көбі <code>cap</code> кг жүк сыяды. <code>goods</code> — <code>(салмақ, құн)</code> жұптары, жүкті кез келген бөлігімен алуға болады (ұн, күріш, қант). <code>max_value(goods, cap)</code> алынатын ең үлкен жалпы құнды <code>float</code> ретінде қайтарсын. Greedy: «1 кг бағасы» (<code>құн / салмақ</code>) бойынша кему ретімен алыңыз, соңғысын бөлшектеп. Бұл есепте greedy дұрыс, ал 0/1 нұсқасында — жоқ.</p>\n<pre><code>max_value([(10, 600), (20, 1000), (30, 1200)], 50) → 2400.0</code></pre>",
   "starter": "def max_value(goods, cap):\n    pass\n",
   "solution": "def max_value(goods, cap):\n    total = 0.0\n    for w, v in sorted(goods, key=lambda g: g[1] / g[0], reverse=True):\n        if cap <= 0:\n            break\n        take = min(w, cap)\n        total += v * take / w\n        cap -= take\n    return total\n",
   "hints": [
    "Тығыздық бойынша сұрыптау: <code>key=lambda g: g[1] / g[0]</code>, <code>reverse=True</code>.",
    "Сыйса — толық, сыймаса — <code>cap / w</code> бөлігін алыңыз."
   ],
   "check": {
    "tests": "\nassert abs(max_value([(10, 600), (20, 1000), (30, 1200)], 50) - 2400.0) < 1e-6, 'Күтілгені 2400.0'\nassert max_value([], 10) == 0, 'Жүк жоқ: 0'\nassert max_value([(5, 100)], 0) == 0, 'Сыйымдылық 0: 0'\nassert abs(max_value([(4, 100)], 1) - 25.0) < 1e-6, 'Бөлігі: 25.0'\nassert abs(max_value([(1, 1), (1, 1)], 5) - 2.0) < 1e-6, 'Бәрі сыяды: 2.0'\nassert abs(max_value([(10, 10), (1, 5)], 2) - 6.0) < 1e-6, 'Алдымен тығыз жүк: 5 + 1 = 6.0'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Мерзімді тапсырыстар",
   "prompt": "<p>Тігін цехы күніне бір тапсырыс орындайды (күндер 1, 2, 3, ...). <code>orders</code> — <code>(мерзім, пайда)</code>: тапсырыс <code>мерзім</code>-күннен кешікпей орындалса, пайда түседі, әйтпесе одан бас тартамыз. <code>max_profit(orders)</code> ең үлкен жалпы пайданы қайтарсын. Greedy: пайдасы көп тапсырыстан бастап, әрқайсысын мерзімге дейінгі <b>ең кеш</b> бос күнге қойыңыз. Бос күнді тез табу үшін union-find: <code>find(d)</code> — <code>d</code>-ден бастап солға қарай бірінші бос күн (0 — бос күн жоқ). Барлығы O(n log n).</p>\n<pre><code>max_profit([(2, 100), (1, 19), (2, 27), (1, 25), (3, 15)]) → 142   # 100 + 27 + 15</code></pre>",
   "starter": "def max_profit(orders):\n    pass\n",
   "solution": "def max_profit(orders):\n    if not orders:\n        return 0\n    D = min(max(d for d, p in orders), len(orders))\n    parent = list(range(D + 1))\n    def find(x):\n        while parent[x] != x:\n            parent[x] = parent[parent[x]]\n            x = parent[x]\n        return x\n    total = 0\n    for d, p in sorted(orders, key=lambda o: -o[1]):\n        day = find(min(d, D))\n        if day > 0:\n            total += p\n            parent[day] = day - 1\n    return total\n",
   "hints": [
    "Күнді алғаннан кейін <code>parent[day] = day − 1</code>: келесі іздеу автоматты түрде солға өтеді.",
    "Мерзімі <code>n</code>-нен үлкен тапсырысты <code>n</code>-күнге шектеуге болады — бәрібір <code>n</code>-нен көп күн керек емес."
   ],
   "check": {
    "tests": "\nassert max_profit([(2, 100), (1, 19), (2, 27), (1, 25), (3, 15)]) == 142, 'Күтілгені 142'\nassert max_profit([]) == 0, 'Тапсырыс жоқ: 0'\nassert max_profit([(1, 5), (1, 7), (1, 3)]) == 7, 'Бәрінің мерзімі 1: тек біреуі, 7'\nassert max_profit([(10**9, 4), (10**9, 6)]) == 10, 'Үлкен мерзім: екеуі де, 10'\nassert max_profit([(4, 20), (1, 10), (1, 40), (1, 30)]) == 60, 'Күтілгені 60'\nimport random as _random, time as _time\nfrom itertools import permutations as _perm\n_rng = _random.Random(6)\nfor _ in range(30):\n    _o = [(_rng.randint(1, 4), _rng.randint(1, 30)) for _ in range(_rng.randint(0, 6))]\n    _best = 0\n    for _p in _perm(range(len(_o))):\n        _day, _s = 0, 0\n        for _i in _p:\n            if _day + 1 <= _o[_i][0]: _day += 1; _s += _o[_i][1]\n        _best = max(_best, _s)\n    assert max_profit(_o) == _best, f'max_profit({_o}) {_best} болуы керек'\n_big = [(_rng.randint(1, 50000), _rng.randint(1, 10**6)) for _ in range(100000)]\n_t0 = _time.perf_counter(); max_profit(_big); _dt = _time.perf_counter() - _t0\nassert _dt < 2.0, f'{_dt:.2f} с: бос күнді union-find арқылы іздеңіз'\n"
   }
  }
 ],
 "alg-10": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Дәл соманы жинау",
   "prompt": "<p>Әмиянда номиналдары <code>coins</code> купюралар бар, әрқайсысы <b>бір рет</b> қолданылады. <code>can_pay(coins, total)</code> дәл <code>total</code> соманы жинауға болса <code>True</code>. 0/1 knapsack сияқты DP: <code>ok[s]</code> — <code>s</code> соманы жинауға бола ма; әр купюра үшін сомаларды <b>кері</b> ретпен жаңартыңыз.</p>\n<pre><code>can_pay([500, 200, 1000, 200], 1400) → True\ncan_pay([500, 500], 600)             → False</code></pre>",
   "starter": "def can_pay(coins, total):\n    pass\n",
   "solution": "def can_pay(coins, total):\n    ok = [False] * (total + 1)\n    ok[0] = True\n    for c in coins:\n        for s in range(total, c - 1, -1):\n            if ok[s - c]:\n                ok[s] = True\n    return ok[total]\n",
   "hints": [
    "<code>ok[0] = True</code>.",
    "Сомаларды үлкенінен кішісіне қарай аралаңыз, сонда бір купюра екі рет қолданылмайды."
   ],
   "check": {
    "tests": "\nassert can_pay([500, 200, 1000, 200], 1400) is True, '1000 + 200 + 200: True'\nassert can_pay([500, 500], 600) is False, 'False болуы керек'\nassert can_pay([], 0) is True, 'total = 0: True'\nassert can_pay([5], 10) is False, 'Купюраны екі рет қолдануға болмайды: False'\nassert can_pay([3, 34, 4, 12, 5, 2], 9) is True, '4 + 5: True'\nassert can_pay([3, 34, 4, 12, 5, 2], 30) is False, 'False болуы керек'\nimport random as _random\nfrom itertools import combinations as _comb\n_rng = _random.Random(1)\nfor _ in range(30):\n    _c = [_rng.randint(1, 15) for _ in range(_rng.randint(0, 7))]; _t = _rng.randint(0, 40)\n    _exp = any(sum(x) == _t for k in range(len(_c) + 1) for x in _comb(_c, k))\n    assert can_pay(_c, _t) == _exp, f'can_pay({_c}, {_t}) {_exp} болуы керек'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ең ұзын ортақ бөлік",
   "prompt": "<p><code>common_substring(a, b)</code> екі жолға ортақ ең ұзын <b>қатар</b> ішкі жолдың ұзындығын қайтарсын. DP: <code>dp[i][j]</code> — <code>a[i−1]</code> және <code>b[j−1]</code>-де аяқталатын ортақ бөліктің ұзындығы; таңбалар тең болса <code>dp[i−1][j−1] + 1</code>, әйтпесе 0. O(n·m).</p>\n<pre><code>common_substring('abcde', 'xbcdy') → 3    # 'bcd'\ncommon_substring('алматы', 'алма') → 4</code></pre>",
   "starter": "def common_substring(a, b):\n    pass\n",
   "solution": "def common_substring(a, b):\n    best = 0\n    prev = [0] * (len(b) + 1)\n    for i in range(1, len(a) + 1):\n        cur = [0] * (len(b) + 1)\n        for j in range(1, len(b) + 1):\n            if a[i - 1] == b[j - 1]:\n                cur[j] = prev[j - 1] + 1\n                if cur[j] > best:\n                    best = cur[j]\n        prev = cur\n    return best\n",
   "hints": [
    "Тек алдыңғы жолды сақтау жеткілікті.",
    "Ішкі тізбектен (LCS) айырмашылығы: таңбалар тең болмаса 0, max емес."
   ],
   "check": {
    "tests": "\nassert common_substring('abcde', 'xbcdy') == 3, \"Ортақ 'bcd': 3\"\nassert common_substring('abc', 'def') == 0, 'Ортақ таңба жоқ: 0'\nassert common_substring('', 'abc') == 0, 'Бос жол: 0'\nassert common_substring('алматы', 'алма') == 4, \"'алма': 4\"\nassert common_substring('aaaa', 'aa') == 2, 'Күтілгені 2'\nimport random as _random\n_rng = _random.Random(2)\nfor _ in range(40):\n    _a = ''.join(_rng.choice('аб') for _ in range(_rng.randint(0, 9))); _b = ''.join(_rng.choice('аб') for _ in range(_rng.randint(0, 9)))\n    _exp = max([j - i for i in range(len(_a)) for j in range(i + 1, len(_a) + 1) if _a[i:j] in _b] + [0])\n    assert common_substring(_a, _b) == _exp, f'common_substring({_a!r}, {_b!r}) {_exp} болуы керек'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Шексіз қойма",
   "prompt": "<p>Көтерме қоймада әр тауар <code>(салмақ, пайда)</code> шексіз көп. Көлікке <code>cap</code> кг сыяды. <code>unbounded_best(items, cap)</code> ең үлкен жалпы пайданы қайтарсын (тауарды бөлшектеуге болмайды, бірақ кез келген санын алуға болады). DP: <code>best[c] = max(best[c − w] + v)</code>; сомаларды <b>өсу</b> ретімен — сонда бір тауар қайта алынады.</p>\n<pre><code>unbounded_best([(2, 3), (3, 5), (4, 7)], 10) → 17     # 4 + 4 + 2</code></pre>",
   "starter": "def unbounded_best(items, cap):\n    pass\n",
   "solution": "def unbounded_best(items, cap):\n    best = [0] * (cap + 1)\n    for c in range(1, cap + 1):\n        for w, v in items:\n            if w <= c and best[c - w] + v > best[c]:\n                best[c] = best[c - w] + v\n    return best[cap]\n",
   "hints": [
    "0/1 knapsack-тан айырмашылығы — сыйымдылықтарды өсу ретімен аралау."
   ],
   "check": {
    "tests": "\nassert unbounded_best([(2, 3), (3, 5), (4, 7)], 10) == 17, 'Күтілгені 17'\nassert unbounded_best([], 10) == 0, 'Тауар жоқ: 0'\nassert unbounded_best([(5, 10)], 4) == 0, 'Ештеңе сыймайды: 0'\nassert unbounded_best([(1, 1), (3, 4)], 7) == 9, '3 + 3 + 1: 9'\nassert unbounded_best([(6, 30), (3, 14), (4, 16), (2, 9)], 10) == 48, 'Күтілгені 48'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қосу және өшіру амалдары",
   "prompt": "<p>Тек <b>таңба өшіру</b> және <b>таңба қосу</b> рұқсат етілген (ауыстыру жоқ). <code>min_ops(a, b)</code> <code>a</code>-ны <code>b</code>-ға айналдыратын ең аз амал санын қайтарсын. Кеңес: ортақ ең ұзын ішкі тізбек (LCS) өзгеріссіз қалады, қалғанын <code>a</code>-дан өшіріп, <code>b</code>-ға қосамыз: <code>len(a) + len(b) − 2·LCS</code>.</p>\n<pre><code>min_ops('қала', 'қалам') → 1\nmin_ops('sea', 'eat')    → 2\nmin_ops('abc', '')       → 3</code></pre>",
   "starter": "def min_ops(a, b):\n    pass\n",
   "solution": "def min_ops(a, b):\n    m = len(b)\n    prev = [0] * (m + 1)\n    for x in a:\n        cur = [0] * (m + 1)\n        for j in range(m):\n            cur[j + 1] = prev[j] + 1 if x == b[j] else max(prev[j + 1], cur[j])\n        prev = cur\n    return len(a) + len(b) - 2 * prev[m]\n",
   "hints": [
    "Алдымен DSA1-дегі LCS DP-ын жазыңыз."
   ],
   "check": {
    "tests": "\nassert min_ops('қала', 'қалам') == 1, \"min_ops('қала', 'қалам') 1\"\nassert min_ops('sea', 'eat') == 2, \"min_ops('sea', 'eat') 2\"\nassert min_ops('abc', '') == 3, 'Бәрін өшіру: 3'\nassert min_ops('', '') == 0, 'Бос жолдар: 0'\nassert min_ops('ab', 'ba') == 2, 'Ауыстыру жоқ: 2'\nassert min_ops('leetcode', 'etco') == 4, 'Күтілгені 4'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең ұзын өспелі тізбектер саны",
   "prompt": "<p><code>count_lis(a)</code> ұзындығы ең үлкен қатаң өспелі ішкі тізбектердің (индекстер жиыны бойынша әртүрлі) <b>санын</b> қайтарсын. O(n²) DP: әр <code>i</code> үшін <code>length[i]</code> (осы элементте аяқталатын ең ұзын тізбек) және <code>count[i]</code> (сондай тізбектер саны). Бос тізім — 0.</p>\n<pre><code>count_lis([1, 3, 5, 4, 7]) → 2      # 1,3,5,7 және 1,3,4,7\ncount_lis([2, 2, 2])       → 3</code></pre>",
   "starter": "def count_lis(a):\n    pass\n",
   "solution": "def count_lis(a):\n    n = len(a)\n    if n == 0:\n        return 0\n    length = [1] * n\n    count = [1] * n\n    for i in range(n):\n        for j in range(i):\n            if a[j] < a[i]:\n                if length[j] + 1 > length[i]:\n                    length[i] = length[j] + 1\n                    count[i] = count[j]\n                elif length[j] + 1 == length[i]:\n                    count[i] += count[j]\n    best = max(length)\n    return sum(c for l, c in zip(length, count) if l == best)\n",
   "hints": [
    "Ұзынырақ тізбек табылса <code>count[i] = count[j]</code>, тең ұзындық табылса <code>count[i] += count[j]</code>.",
    "Жауап — ұзындығы максимал барлық <code>i</code> бойынша <code>count</code> қосындысы."
   ],
   "check": {
    "tests": "\nassert count_lis([1, 3, 5, 4, 7]) == 2, 'Күтілгені 2'\nassert count_lis([2, 2, 2]) == 3, 'Әр элемент — ұзындығы 1 тізбек: 3'\nassert count_lis([]) == 0, 'Бос тізім: 0'\nassert count_lis([5]) == 1, 'Бір элемент: 1'\nassert count_lis([1, 2, 4, 3, 5, 4, 7, 2]) == 3, 'Күтілгені 3'\nimport random as _random\nfrom itertools import combinations as _comb\n_rng = _random.Random(3)\nfor _ in range(30):\n    _x = [_rng.randint(0, 6) for _ in range(_rng.randint(1, 9))]\n    for _L in range(len(_x), 0, -1):\n        _c = sum(1 for idx in _comb(range(len(_x)), _L) if all(_x[idx[k]] < _x[idx[k + 1]] for k in range(_L - 1)))\n        if _c: break\n    assert count_lis(_x) == _c, f'count_lis({_x}) {_c} болуы керек'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жұмысты бөлу bitmask",
   "prompt": "<p><code>n</code> курьер және <code>n</code> тапсырыс (<code>n ≤ 12</code>). <code>cost[i][j]</code> — <code>i</code>-курьердің <code>j</code>-тапсырысты жеткізу уақыты. Әр курьер дәл бір тапсырыс алады. <code>min_assign(cost)</code> ең аз жалпы уақытты қайтарсын. Bitmask DP: <code>dp[mask]</code> — алғашқы <code>popcount(mask)</code> курьер <code>mask</code> тапсырыстарын алғандағы ең аз уақыт. O(2ⁿ·n).</p>\n<pre><code>min_assign([[9, 2, 7], [6, 4, 3], [5, 8, 1]]) → 9     # 0→1 (2), 1→0 (6), 2→2 (1)</code></pre>",
   "starter": "def min_assign(cost):\n    pass\n",
   "solution": "def min_assign(cost):\n    n = len(cost)\n    INF = float('inf')\n    dp = [INF] * (1 << n)\n    dp[0] = 0\n    for mask in range(1 << n):\n        if dp[mask] == INF:\n            continue\n        i = bin(mask).count('1')\n        if i == n:\n            continue\n        for j in range(n):\n            if not mask & (1 << j):\n                nm = mask | (1 << j)\n                if dp[mask] + cost[i][j] < dp[nm]:\n                    dp[nm] = dp[mask] + cost[i][j]\n    return dp[(1 << n) - 1]\n",
   "hints": [
    "Келесі курьердің нөмірі — <code>mask</code>-тағы бірліктер саны: <code>bin(mask).count('1')</code>.",
    "Бос емес <code>j</code> тапсырысын қосу: <code>mask | (1 &lt;&lt; j)</code>."
   ],
   "check": {
    "tests": "\nassert min_assign([[9, 2, 7], [6, 4, 3], [5, 8, 1]]) == 9, 'Күтілгені 9 (2 + 6 + 1)'\nassert min_assign([[5]]) == 5, 'Бір курьер: 5'\nassert min_assign([]) == 0, 'Курьер жоқ: 0'\nassert min_assign([[1, 2], [2, 1]]) == 2, 'Күтілгені 2'\nimport random as _random, time as _time\nfrom itertools import permutations as _perm\n_rng = _random.Random(4)\nfor _ in range(15):\n    _n = _rng.randint(1, 6); _c = [[_rng.randint(1, 30) for _ in range(_n)] for _ in range(_n)]\n    _exp = min(sum(_c[i][p[i]] for i in range(_n)) for p in _perm(range(_n)))\n    assert min_assign(_c) == _exp, f'min_assign({_c}) {_exp} болуы керек'\n_c = [[_rng.randint(1, 100) for _ in range(11)] for _ in range(11)]\n_t0 = _time.perf_counter(); min_assign(_c); _dt = _time.perf_counter() - _t0\nassert _dt < 4.0, f'n = 11 үшін {_dt:.2f} с: bitmask DP керек (n! емес)'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Таңдалған заттар",
   "prompt": "<p>0/1 knapsack, бірақ енді тек мән емес, <b>қай заттар</b> алынатыны да керек. <code>items</code> — <code>(салмақ, пайда)</code>, <code>cap</code> — сыйымдылық. <code>pick_items(items, cap)</code> <code>(ең_үлкен_пайда, индекстер)</code> қайтарсын, индекстер өсу ретімен; бірнеше оңтайлы жиын болса, кез келгені. 2D кесте <code>dp[i][c]</code> құрып, соңынан артқа жүріп қалпына келтіріңіз: <code>dp[i][c] != dp[i−1][c]</code> болса, <code>i</code>-зат алынған.</p>\n<pre><code>pick_items([(1, 1), (3, 4), (4, 5), (5, 7)], 7) → (9, [1, 2])</code></pre>",
   "starter": "def pick_items(items, cap):\n    pass\n",
   "solution": "def pick_items(items, cap):\n    n = len(items)\n    dp = [[0] * (cap + 1) for _ in range(n + 1)]\n    for i in range(1, n + 1):\n        w, v = items[i - 1]\n        for c in range(cap + 1):\n            dp[i][c] = dp[i - 1][c]\n            if w <= c and dp[i - 1][c - w] + v > dp[i][c]:\n                dp[i][c] = dp[i - 1][c - w] + v\n    chosen = []\n    c = cap\n    for i in range(n, 0, -1):\n        if dp[i][c] != dp[i - 1][c]:\n            chosen.append(i - 1)\n            c -= items[i - 1][0]\n    return dp[n][cap], sorted(chosen)\n",
   "hints": [
    "Қалпына келтіру үшін бір өлшемді DP жеткіліксіз: толық <code>(n + 1) × (cap + 1)</code> кесте керек.",
    "Артқа жүргенде зат алынса, <code>c</code>-дан оның салмағын шегеріңіз."
   ],
   "check": {
    "tests": "\n_v, _idx = pick_items([(1, 1), (3, 4), (4, 5), (5, 7)], 7)\nassert _v == 9 and _idx == [1, 2], f'Күтілгені (9, [1, 2]), сізде {(_v, _idx)}'\nassert pick_items([], 5) == (0, []), 'Зат жоқ: (0, [])'\nassert pick_items([(10, 100)], 5) == (0, []), 'Ештеңе сыймайды: (0, [])'\nassert pick_items([(2, 3)], 2) == (3, [0]), 'Бір зат: (3, [0])'\nimport random as _random\nfrom itertools import combinations as _comb\n_rng = _random.Random(5)\nfor _ in range(40):\n    _it = [(_rng.randint(1, 8), _rng.randint(0, 20)) for _ in range(_rng.randint(0, 7))]; _cap = _rng.randint(0, 20)\n    _best = max(sum(_it[i][1] for i in c) for k in range(len(_it) + 1) for c in _comb(range(len(_it)), k) if sum(_it[i][0] for i in c) <= _cap)\n    _v, _idx = pick_items(_it, _cap)\n    assert _v == _best, f'pick_items({_it}, {_cap}): пайда {_best} болуы керек'\n    assert _idx == sorted(set(_idx)) and all(0 <= i < len(_it) for i in _idx), 'Индекстер өсу ретімен, қайталанусыз болуы керек'\n    assert sum(_it[i][0] for i in _idx) <= _cap and sum(_it[i][1] for i in _idx) == _best, f'Таңдалған заттар {_idx} жарамсыз немесе пайдасы сәйкес емес'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Қораптарды салу",
   "prompt": "<p>Сыйлық қораптары <code>(ені, биіктігі)</code>. Бір қорапты екіншісінің ішіне салуға болады, егер екі өлшемі де <b>қатаң</b> кіші болса (бұруға болмайды). <code>max_nested(boxes)</code> бір-бірінің ішіне салынған ең көп қорап санын қайтарсын. Айла: енi бойынша өсу, ені тең болса биіктігі бойынша <b>кему</b> ретімен сұрыптап, биіктіктерге LIS қолданыңыз (сонда ені тең екі қорап бір тізбекке түспейді). O(n log n) — <code>bisect</code>.</p>\n<pre><code>max_nested([(5, 4), (6, 4), (6, 7), (2, 3)]) → 3     # (2,3) → (5,4) → (6,7)\nmax_nested([(1, 1), (1, 1)])                 → 1</code></pre>",
   "starter": "from bisect import bisect_left\n\ndef max_nested(boxes):\n    pass\n",
   "solution": "from bisect import bisect_left\n\ndef max_nested(boxes):\n    tails = []\n    for w, h in sorted(boxes, key=lambda b: (b[0], -b[1])):\n        i = bisect_left(tails, h)\n        if i == len(tails):\n            tails.append(h)\n        else:\n            tails[i] = h\n    return len(tails)\n",
   "hints": [
    "Сұрыптау кілті: <code>(w, -h)</code>.",
    "DSA1-дегі <code>tails</code> әдісі: <code>bisect_left</code> — қатаң өспелі тізбек үшін."
   ],
   "check": {
    "tests": "\nassert max_nested([(5, 4), (6, 4), (6, 7), (2, 3)]) == 3, 'Күтілгені 3'\nassert max_nested([(1, 1), (1, 1)]) == 1, 'Бірдей қораптар: 1'\nassert max_nested([]) == 0, 'Қорап жоқ: 0'\nassert max_nested([(1, 3), (1, 2), (1, 1)]) == 1, 'Ені тең: 1'\nassert max_nested([(4, 5), (4, 6), (6, 7), (2, 3), (1, 1)]) == 4, 'Күтілгені 4'\nimport random as _random, time as _time\n_rng = _random.Random(6)\nfor _ in range(40):\n    _b = [(_rng.randint(1, 6), _rng.randint(1, 6)) for _ in range(_rng.randint(0, 9))]\n    _s = sorted(_b); _d = [1] * len(_s)\n    for _i in range(len(_s)):\n        for _j in range(_i):\n            if _s[_j][0] < _s[_i][0] and _s[_j][1] < _s[_i][1]: _d[_i] = max(_d[_i], _d[_j] + 1)\n    assert max_nested(_b) == max(_d + [0]), f'max_nested({_b}) {max(_d + [0])} болуы керек'\n_big = [(_rng.randint(1, 10**6), _rng.randint(1, 10**6)) for _ in range(50000)]\n_t0 = _time.perf_counter(); max_nested(_big); _dt = _time.perf_counter() - _t0\nassert _dt < 2.0, f'50 000 қорапқа {_dt:.2f} с: O(n log n) LIS керек'\n"
   }
  }
 ],
 "alg-11": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ең ұзын шекара",
   "prompt": "<p>Жолдың <b>шекарасы</b> — өзіне тең емес, бір мезгілде префикс те, суффикс те болатын ішкі жол. <code>longest_border(s)</code> ең ұзын шекараның өзін (жол ретінде) қайтарсын; жоқ болса <code>''</code>. Prefix function-ның соңғы мәні <code>pi[-1]</code> — оның ұзындығы.</p>\n<pre><code>longest_border('abacaba') → 'aba'\nlongest_border('aaaa')    → 'aaa'\nlongest_border('abc')     → ''</code></pre>",
   "starter": "def longest_border(s):\n    pass\n",
   "solution": "def prefix_function(s):\n    pi = [0] * len(s)\n    for i in range(1, len(s)):\n        k = pi[i - 1]\n        while k > 0 and s[i] != s[k]:\n            k = pi[k - 1]\n        if s[i] == s[k]:\n            k += 1\n        pi[i] = k\n    return pi\n\ndef longest_border(s):\n    if not s:\n        return ''\n    return s[:prefix_function(s)[-1]]\n",
   "hints": [
    "Сабақтағы <code>prefix_function</code>-ды жазыңыз.",
    "Бос жолды бөлек тексеріңіз."
   ],
   "check": {
    "tests": "\nassert longest_border('abacaba') == 'aba', \"Күтілгені 'aba'\"\nassert longest_border('aaaa') == 'aaa', \"Шекара қабаттасуы мүмкін: 'aaa'\"\nassert longest_border('abc') == '', \"Шекара жоқ: ''\"\nassert longest_border('') == '', \"Бос жол: ''\"\nassert longest_border('a') == '', \"Бір таңба: ''\"\nassert longest_border('ананана') == 'анана', \"Күтілгені 'анана'\"\nimport time as _time\n_s = 'ab' * 50000\n_t0 = _time.perf_counter(); _r = longest_border(_s); _dt = _time.perf_counter() - _t0\nassert _r == 'ab' * 49999 and _dt < 1.0, f'O(n) prefix function керек ({_dt:.2f} с)'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Циклдік ығысу",
   "prompt": "<p><code>is_rotation(a, b)</code>: <code>b</code> жолы <code>a</code>-ның циклдік ығысуы болса (бірнеше таңбаны басынан соңына көшіргенде) <code>True</code>. Ұзындықтары тең болуы керек. Айла: <code>b</code> — <code>a + a</code> ішінде кездеседі. Іздеуді KMP арқылы жасаңыз: <code>b + '#' + a + a</code> жолының prefix function-ында <code>len(b)</code> мәні бар ма (<code>'#'</code> жолдарда кездеспейді).</p>\n<pre><code>is_rotation('алматы', 'атыалм') → True\nis_rotation('ab', 'ab')         → True\nis_rotation('ab', 'aa')         → False</code></pre>",
   "starter": "def is_rotation(a, b):\n    pass\n",
   "solution": "def prefix_function(s):\n    pi = [0] * len(s)\n    for i in range(1, len(s)):\n        k = pi[i - 1]\n        while k > 0 and s[i] != s[k]:\n            k = pi[k - 1]\n        if s[i] == s[k]:\n            k += 1\n        pi[i] = k\n    return pi\n\ndef is_rotation(a, b):\n    if len(a) != len(b):\n        return False\n    if not a:\n        return True\n    return len(b) in prefix_function(b + '#' + a + a)\n",
   "hints": [
    "Ұзындықтарды алдымен салыстырыңыз.",
    "Prefix function мәні <code>len(b)</code>-ға тең болған жерде <code>b</code> толық кездескен."
   ],
   "check": {
    "tests": "\nassert is_rotation('алматы', 'атыалм') is True, \"'атыалм' — ығысу: True\"\nassert is_rotation('ab', 'ab') is True, 'Ығыспаған да ығысу: True'\nassert is_rotation('ab', 'aa') is False, 'False болуы керек'\nassert is_rotation('', '') is True, 'Бос жолдар: True'\nassert is_rotation('abc', 'ab') is False, 'Ұзындық әртүрлі: False'\nassert is_rotation('aab', 'aba') is True and is_rotation('aab', 'bba') is False, 'aab ығысулары'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бірінші кездесу",
   "prompt": "<p><code>first_index(text, pattern)</code> <code>pattern</code> мәтінде бірінші кездесетін индексті қайтарсын, жоқ болса <code>-1</code>; бос үлгі — 0. KMP арқылы O(n + m): <code>pattern + '#' + text</code> жолының prefix function-ында бірінші рет <code>len(pattern)</code> болған <code>i</code> үшін жауап — <code>i − 2·len(pattern)</code>. <code>find</code>, <code>index</code>, <code>in</code> қолданбаңыз. Мәтінде <code>'#'</code> жоқ.</p>\n<pre><code>first_index('сәлем әлем', 'әлем') → 1\nfirst_index('aaa', 'b')           → -1</code></pre>",
   "starter": "def first_index(text, pattern):\n    pass\n",
   "solution": "def prefix_function(s):\n    pi = [0] * len(s)\n    for i in range(1, len(s)):\n        k = pi[i - 1]\n        while k > 0 and s[i] != s[k]:\n            k = pi[k - 1]\n        if s[i] == s[k]:\n            k += 1\n        pi[i] = k\n    return pi\n\ndef first_index(text, pattern):\n    m = len(pattern)\n    if m == 0:\n        return 0\n    pi = prefix_function(pattern + '#' + text)\n    for i in range(2 * m, len(pi)):\n        if pi[i] == m:\n            return i - 2 * m\n    return -1\n",
   "hints": [
    "<code>pattern + '#' + text</code> жолында <code>i</code>-позицияда <code>pi[i] == m</code> болса, үлгі <code>i − m + 1</code>-ден басталады; text ішіндегі индекс <code>i − 2m</code>."
   ],
   "check": {
    "tests": "\nassert first_index('сәлем әлем', 'әлем') == 1, \"first_index('сәлем әлем', 'әлем') 1\"\nassert first_index('aaa', 'b') == -1, 'Жоқ: -1'\nassert first_index('abc', '') == 0, 'Бос үлгі: 0'\nassert first_index('', 'a') == -1, 'Бос мәтін: -1'\nassert first_index('ababcabab', 'abab') == 0, 'Басында: 0'\nassert first_index('xxabab', 'abab') == 2, 'Күтілгені 2'\nimport random as _random\n_rng = _random.Random(1)\nfor _ in range(60):\n    _t = ''.join(_rng.choice('аб') for _ in range(_rng.randint(0, 12))); _p = ''.join(_rng.choice('аб') for _ in range(_rng.randint(1, 4)))\n    assert first_index(_t, _p) == _t.find(_p), f'first_index({_t!r}, {_p!r}) {_t.find(_p)} болуы керек'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Префикстердің кездесу саны",
   "prompt": "<p><code>prefix_counts(s)</code> ұзындығы <code>len(s)</code> тізім қайтарсын: <code>res[L−1]</code> — ұзындығы <code>L</code> префикс <code>s</code>-та неше рет кездеседі (қабаттасқанын қоса). Prefix function-ның классикалық қолданысы, O(n): әр <code>i</code> үшін <code>cnt[pi[i]] += 1</code>, сосын ұзыннан қысқаға қарай <code>cnt[pi[L−1]] += cnt[L]</code> таратыңыз, соңында әр префикс өзі де бір рет кездеседі.</p>\n<pre><code>prefix_counts('abab') → [2, 2, 1, 1]\nprefix_counts('aaa')  → [3, 2, 1]</code></pre>",
   "starter": "def prefix_counts(s):\n    pass\n",
   "solution": "def prefix_function(s):\n    pi = [0] * len(s)\n    for i in range(1, len(s)):\n        k = pi[i - 1]\n        while k > 0 and s[i] != s[k]:\n            k = pi[k - 1]\n        if s[i] == s[k]:\n            k += 1\n        pi[i] = k\n    return pi\n\ndef prefix_counts(s):\n    n = len(s)\n    if n == 0:\n        return []\n    pi = prefix_function(s)\n    cnt = [0] * (n + 1)\n    for p in pi:\n        cnt[p] += 1\n    for L in range(n, 0, -1):\n        cnt[pi[L - 1]] += cnt[L]\n    return [cnt[L] + 1 for L in range(1, n + 1)]\n",
   "hints": [
    "<code>pi[i] = k</code> болса, ұзындығы <code>k</code> префикс <code>i</code>-де аяқталады; оның шекаралары да сонда аяқталады.",
    "Сондықтан санауышты <code>L</code>-ден <code>pi[L − 1]</code>-ге тарату керек; ұзындары бірінші."
   ],
   "check": {
    "tests": "\nassert prefix_counts('abab') == [2, 2, 1, 1], 'Күтілгені [2, 2, 1, 1]'\nassert prefix_counts('aaa') == [3, 2, 1], 'Күтілгені [3, 2, 1]'\nassert prefix_counts('') == [], 'Бос жол: []'\nassert prefix_counts('abc') == [1, 1, 1], 'Күтілгені [1, 1, 1]'\nimport random as _random, time as _time\n_rng = _random.Random(2)\nfor _ in range(40):\n    _s = ''.join(_rng.choice('аб') for _ in range(_rng.randint(1, 12)))\n    _exp = [sum(1 for i in range(len(_s) - L + 1) if _s[i:i + L] == _s[:L]) for L in range(1, len(_s) + 1)]\n    assert prefix_counts(_s) == _exp, f'prefix_counts({_s!r}) {_exp} болуы керек'\n_s = 'a' * 100000\n_t0 = _time.perf_counter(); _r = prefix_counts(_s); _dt = _time.perf_counter() - _t0\nassert _r[0] == 100000 and _r[-1] == 1 and _dt < 1.5, f'O(n) шешім керек ({_dt:.2f} с)'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Хэшпен бөліктерді салыстыру",
   "prompt": "<p>String hashing: <code>SubHash(s)</code> класы конструкторда префикс хэштерін есептейді (<code>h[i+1] = (h[i] · B + ord(s[i])) % M</code>, <code>B = 131</code>, <code>M = 2<sup>61</sup> − 1</code>) және <code>B</code> дәрежелерін. <code>get(i, j)</code> — <code>s[i:j]</code> хэшін O(1)-де: <code>(h[j] − h[i] · B<sup>j−i</sup>) % M</code>. <code>same(i, j, L)</code> — <code>s[i:i+L]</code> мен <code>s[j:j+L]</code> хэштері тең болса <code>True</code>. Кесінді жасамаңыз: әр сұрау O(1).</p>\n<pre><code>h = SubHash('абракадабра')\nh.same(0, 7, 4) → True     # 'абра' == 'абра'\nh.same(0, 3, 2) → False</code></pre>",
   "starter": "class SubHash:\n    def __init__(self, s):\n        pass\n\n    def get(self, i, j):\n        pass\n\n    def same(self, i, j, L):\n        pass\n",
   "solution": "class SubHash:\n    B = 131\n    M = (1 << 61) - 1\n\n    def __init__(self, s):\n        n = len(s)\n        self.h = [0] * (n + 1)\n        self.p = [1] * (n + 1)\n        for i, ch in enumerate(s):\n            self.h[i + 1] = (self.h[i] * self.B + ord(ch)) % self.M\n            self.p[i + 1] = self.p[i] * self.B % self.M\n\n    def get(self, i, j):\n        return (self.h[j] - self.h[i] * self.p[j - i]) % self.M\n\n    def same(self, i, j, L):\n        return self.get(i, i + L) == self.get(j, j + L)\n",
   "hints": [
    "<code>p[k] = B<sup>k</sup> % M</code> массивін алдын ала есептеңіз.",
    "Python-да <code>%</code> теріс санға да теріс емес нәтиже береді."
   ],
   "check": {
    "tests": "\n_h = SubHash('абракадабра')\nassert _h.same(0, 7, 4) is True, \"'абра' == 'абра': True\"\nassert _h.same(0, 3, 2) is False, \"'аб' != 'ак': False\"\nassert _h.same(2, 2, 5) is True, 'Бір орын: True'\nassert _h.same(0, 5, 0) is True, 'Бос бөліктер тең: True'\nassert _h.get(0, 1) == ord('а'), 'Бір таңбаның хэші — оның коды'\nassert _h.get(1, 3) == (ord('б') * 131 + ord('р')) % ((1 << 61) - 1), 'get(1, 3) қате'\nimport random as _random, time as _time\n_rng = _random.Random(3)\n_s = ''.join(_rng.choice('ab') for _ in range(300))\n_hh = SubHash(_s)\nfor _ in range(300):\n    _L = _rng.randint(0, 20); _i = _rng.randint(0, 300 - _L); _j = _rng.randint(0, 300 - _L)\n    assert _hh.same(_i, _j, _L) == (_s[_i:_i + _L] == _s[_j:_j + _L]), f'same({_i}, {_j}, {_L}) қате'\n_big = SubHash('x' * 200000)\n_t0 = _time.perf_counter()\nfor _q in range(50000):\n    _big.same(_q, _q + 1, 100000)\nassert _time.perf_counter() - _t0 < 1.5, 'Әр сұрау O(1) болуы керек (кесінді жасамаңыз)'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Префикс пен суффикс жапсары",
   "prompt": "<p>Екі сөзді біріктіргенде қайталанатын бөлікті бір рет жазғымыз келеді. <code>overlap_len(a, b)</code> <code>a</code>-ның <b>суффиксі</b> болатын <code>b</code>-ның ең ұзын <b>префиксінің</b> ұзындығын қайтарсын. KMP: <code>b + '#' + a</code> жолының соңғы prefix function мәні (<code>'#'</code> сөздерде кездеспейді).</p>\n<pre><code>overlap_len('қазақ', 'ақсу')  → 2      # 'ақ'\noverlap_len('abc', 'xyz')     → 0\noverlap_len('aaa', 'aaaa')    → 3</code></pre>",
   "starter": "def overlap_len(a, b):\n    pass\n",
   "solution": "def prefix_function(s):\n    pi = [0] * len(s)\n    for i in range(1, len(s)):\n        k = pi[i - 1]\n        while k > 0 and s[i] != s[k]:\n            k = pi[k - 1]\n        if s[i] == s[k]:\n            k += 1\n        pi[i] = k\n    return pi\n\ndef overlap_len(a, b):\n    if not a or not b:\n        return 0\n    return prefix_function(b + '#' + a)[-1]\n",
   "hints": [
    "<code>'#'</code> бөлгіш мәннің <code>len(b)</code>-дан асып кетуіне жол бермейді."
   ],
   "check": {
    "tests": "\nassert overlap_len('қазақ', 'ақсу') == 2, \"'ақ': 2\"\nassert overlap_len('abc', 'xyz') == 0, 'Жапсар жоқ: 0'\nassert overlap_len('aaa', 'aaaa') == 3, 'Күтілгені 3'\nassert overlap_len('', 'abc') == 0 and overlap_len('abc', '') == 0, 'Бос жол: 0'\nassert overlap_len('abab', 'abab') == 4, 'Бірдей сөздер: 4'\nimport random as _random\n_rng = _random.Random(4)\nfor _ in range(60):\n    _a = ''.join(_rng.choice('аб') for _ in range(_rng.randint(0, 8))); _b = ''.join(_rng.choice('аб') for _ in range(_rng.randint(0, 8)))\n    _exp = max([L for L in range(0, min(len(_a), len(_b)) + 1) if _a.endswith(_b[:L])])\n    assert overlap_len(_a, _b) == _exp, f'overlap_len({_a!r}, {_b!r}) {_exp} болуы керек'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ең қысқа палиндром",
   "prompt": "<p><code>shortest_palindrome(s)</code>: жолдың <b>алдына</b> ең аз таңба қосып, палиндром жасаңыз; нәтижені қайтарыңыз. Ол үшін <code>s</code>-тың ең ұзын палиндром префиксін табу керек: <code>s + '#' + reversed(s)</code> жолының соңғы prefix function мәні дәл соны береді. Сосын қалған суффиксті аударып, алдына қойыңыз. O(n).</p>\n<pre><code>shortest_palindrome('aacecaaa') → 'aaacecaaa'\nshortest_palindrome('abcd')     → 'dcbabcd'\nshortest_palindrome('')         → ''</code></pre>",
   "starter": "def shortest_palindrome(s):\n    pass\n",
   "solution": "def prefix_function(s):\n    pi = [0] * len(s)\n    for i in range(1, len(s)):\n        k = pi[i - 1]\n        while k > 0 and s[i] != s[k]:\n            k = pi[k - 1]\n        if s[i] == s[k]:\n            k += 1\n        pi[i] = k\n    return pi\n\ndef shortest_palindrome(s):\n    if not s:\n        return s\n    k = prefix_function(s + '#' + s[::-1])[-1]\n    return s[k:][::-1] + s\n",
   "hints": [
    "Палиндром префикс — <code>s</code>-тың префиксі және <code>reversed(s)</code>-тың суффиксі.",
    "Жауап: <code>s[k:][::-1] + s</code>."
   ],
   "check": {
    "tests": "\nassert shortest_palindrome('aacecaaa') == 'aaacecaaa', \"Күтілгені 'aaacecaaa'\"\nassert shortest_palindrome('abcd') == 'dcbabcd', \"Күтілгені 'dcbabcd'\"\nassert shortest_palindrome('') == '', \"Бос жол: ''\"\nassert shortest_palindrome('a') == 'a', 'Бір таңба'\nassert shortest_palindrome('қазақ') == 'қазақ', 'Палиндром өзгермейді'\nassert shortest_palindrome('ab') == 'bab', \"Күтілгені 'bab'\"\nimport random as _random, time as _time\n_rng = _random.Random(5)\nfor _ in range(60):\n    _s = ''.join(_rng.choice('аб') for _ in range(_rng.randint(1, 10)))\n    _k = max(L for L in range(1, len(_s) + 1) if _s[:L] == _s[:L][::-1])\n    _exp = _s[_k:][::-1] + _s\n    assert shortest_palindrome(_s) == _exp, f'shortest_palindrome({_s!r}) {_exp!r} болуы керек'\n_s = 'a' * 49999 + 'b' + 'a' * 50000\n_t0 = _time.perf_counter(); _r = shortest_palindrome(_s); _dt = _time.perf_counter() - _t0\nassert _r == 'a' + _s and _dt < 1.5, f'O(n) шешім керек ({_dt:.2f} с)'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ең ұзын қайталанатын бөлік",
   "prompt": "<p><code>longest_repeat(s)</code> жолда кемінде екі рет (әртүрлі позициядан басталатын, қабаттасуы мүмкін) кездесетін ең ұзын ішкі жолдың <b>ұзындығын</b> қайтарсын. Ұзындық бойынша binary search: «ұзындығы <code>L</code> қайталанатын бөлік бар ма?» шарты монотонды. Тексеруді rolling hash арқылы O(n): ұзындығы <code>L</code> барлық бөліктердің хэшін <code>set</code>-ке жинаңыз. Барлығы O(n log n). <code>len(s) ≤ 20 000</code>.</p>\n<pre><code>longest_repeat('banana') → 3      # 'ana'\nlongest_repeat('abcd')   → 0\nlongest_repeat('aaaa')   → 3</code></pre>",
   "starter": "def longest_repeat(s):\n    pass\n",
   "solution": "def longest_repeat(s):\n    n = len(s)\n    B, M = 131, (1 << 61) - 1\n    h = [0] * (n + 1)\n    p = [1] * (n + 1)\n    for i, ch in enumerate(s):\n        h[i + 1] = (h[i] * B + ord(ch)) % M\n        p[i + 1] = p[i] * B % M\n    def has(L):\n        seen = set()\n        for i in range(n - L + 1):\n            x = (h[i + L] - h[i] * p[L]) % M\n            if x in seen:\n                return True\n            seen.add(x)\n        return False\n    lo, hi = 0, n - 1 if n else 0\n    while lo < hi:\n        mid = (lo + hi + 1) // 2\n        if has(mid):\n            lo = mid\n        else:\n            hi = mid - 1\n    return lo\n",
   "hints": [
    "Ұзындығы <code>L</code> бөлік қайталанса, ұзындығы <code>L − 1</code> бөлік те қайталанады: binary search жарайды.",
    "Префикс хэштерін бір рет есептеп, <code>has(L)</code> ішінде әр бөліктің хэшін O(1)-де алыңыз."
   ],
   "check": {
    "tests": "\nassert longest_repeat('banana') == 3, \"longest_repeat('banana') 3\"\nassert longest_repeat('abcd') == 0, 'Қайталану жоқ: 0'\nassert longest_repeat('aaaa') == 3, 'Қабаттасу рұқсат: 3'\nassert longest_repeat('') == 0 and longest_repeat('a') == 0, 'Бос немесе бір таңба: 0'\nassert longest_repeat('абабаб') == 4, \"'абаб' екі рет: 4\"\nimport random as _random, time as _time\n_rng = _random.Random(6)\nfor _ in range(40):\n    _s = ''.join(_rng.choice('аб') for _ in range(_rng.randint(0, 12)))\n    _exp = max([L for L in range(1, len(_s)) if len(set(_s[i:i + L] for i in range(len(_s) - L + 1))) < len(_s) - L + 1] + [0])\n    assert longest_repeat(_s) == _exp, f'longest_repeat({_s!r}) {_exp} болуы керек'\n_s = ''.join(_rng.choice('abcdefgh') for _ in range(20000)); _s = _s + _s[5000:5600]\n_t0 = _time.perf_counter(); _r = longest_repeat(_s); _dt = _time.perf_counter() - _t0\nassert _r >= 600 and _dt < 4.0, f'Үлкен тест: кемінде 600, binary search + hash керек ({_dt:.2f} с)'\n"
   }
  }
 ],
 "alg-12": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Trie түйіндерінің саны",
   "prompt": "<p><code>trie_size(words)</code> сөздерді trie-ге салғанда түбірден басқа неше түйін пайда болатынын қайтарсын. Бұл — сөздердің әртүрлі бос емес префикстерінің саны. Trie құрып, жаңа түйін жасалған сайын санауышты арттырыңыз.</p>\n<pre><code>trie_size(['ат', 'ата', 'ару']) → 5     # а, ат, ата, ар, ару\ntrie_size([])                   → 0</code></pre>",
   "starter": "def trie_size(words):\n    pass\n",
   "solution": "def trie_size(words):\n    root = {}\n    count = 0\n    for w in words:\n        node = root\n        for ch in w:\n            if ch not in node:\n                node[ch] = {}\n                count += 1\n            node = node[ch]\n    return count\n",
   "hints": [
    "Түйінді жай сөздік ретінде жазуға болады: <code>node = node.setdefault(ch, {})</code>.",
    "Тек жаңа түйін жасалғанда санаңыз."
   ],
   "check": {
    "tests": "\nassert trie_size(['ат', 'ата', 'ару']) == 5, 'Күтілгені 5'\nassert trie_size([]) == 0, 'Сөз жоқ: 0'\nassert trie_size(['', '']) == 0, 'Бос сөз түйін қоспайды: 0'\nassert trie_size(['абв', 'абв']) == 3, 'Қайталанған сөз: 3'\nassert trie_size(['a', 'b', 'c']) == 3, 'Ортақ префикс жоқ: 3'\nimport random as _random\n_rng = _random.Random(1)\n_w = [''.join(_rng.choice('аб') for _ in range(_rng.randint(0, 6))) for _ in range(40)]\nassert trie_size(_w) == len({w[:i] for w in _w for i in range(1, len(w) + 1)}), 'Кездейсоқ тест: әртүрлі префикстер саны'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Префикспен басталатындар",
   "prompt": "<p>Дүкен іздеуі: <code>with_prefix(words, p)</code> <code>p</code>-дан басталатын сөздерді қайталаусыз, сұрыпталған тізім ретінде қайтарсын. Trie құрып, <code>p</code> түйініне түсіп, одан DFS жасаңыз: балаларды <code>sorted(...)</code> ретімен аралаңыз — сонда нәтиже өздігінен сұрыпталады. Бос <code>p</code> — барлық сөздер.</p>\n<pre><code>with_prefix(['сүт', 'сүзбе', 'сүтті шоколад', 'сағыз'], 'сүт') → ['сүт', 'сүтті шоколад']</code></pre>",
   "starter": "def with_prefix(words, p):\n    pass\n",
   "solution": "class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.end = False\n\ndef with_prefix(words, p):\n    root = TrieNode()\n    for w in words:\n        node = root\n        for ch in w:\n            node = node.children.setdefault(ch, TrieNode())\n        node.end = True\n    node = root\n    for ch in p:\n        node = node.children.get(ch)\n        if node is None:\n            return []\n    res = []\n    def dfs(n, path):\n        if n.end:\n            res.append(path)\n        for ch in sorted(n.children):\n            dfs(n.children[ch], path + ch)\n    dfs(node, p)\n    return res\n",
   "hints": [
    "Префикс түйіні табылмаса — <code>[]</code>.",
    "DFS-те алдымен түйіннің өзі (<code>end</code>), сосын балалары — сонда «сүт» «сүтті»-ден алдын тұрады."
   ],
   "check": {
    "tests": "\nassert with_prefix(['сүт', 'сүзбе', 'сүтті шоколад', 'сағыз'], 'сүт') == ['сүт', 'сүтті шоколад'], \"Күтілгені ['сүт', 'сүтті шоколад']\"\nassert with_prefix(['нан', 'нан'], 'на') == ['нан'], 'Қайталанбасын'\nassert with_prefix(['ет'], 'шай') == [], 'Жоқ: []'\nassert with_prefix(['б', 'а', 'ав'], '') == ['а', 'ав', 'б'], 'Бос префикс: барлығы сұрыпталған'\nassert with_prefix([], 'а') == [], 'Сөз жоқ: []'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Сөздерді түбірмен алмастыру",
   "prompt": "<p><code>roots</code> — түбірлер тізімі, <code>sentence</code> — бос орынмен бөлінген сөйлем. <code>replace_roots(roots, sentence)</code> әр сөзді оның ең <b>қысқа</b> түбірімен (сөздің префиксі болатын түбір) алмастырсын; түбірі жоқ сөз өзгермейді. Түбірлерден trie құрып, әр сөз бойымен <code>end</code> түйініне бірінші жеткенде тоқтаңыз.</p>\n<pre><code>replace_roots(['кітап', 'оқы'], 'кітаптар оқылды мектепте') → 'кітап оқы мектепте'</code></pre>",
   "starter": "def replace_roots(roots, sentence):\n    pass\n",
   "solution": "class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.end = False\n\ndef replace_roots(roots, sentence):\n    root = TrieNode()\n    for r in roots:\n        node = root\n        for ch in r:\n            node = node.children.setdefault(ch, TrieNode())\n        node.end = True\n    out = []\n    for w in sentence.split():\n        node = root\n        rep = w\n        for i, ch in enumerate(w):\n            node = node.children.get(ch)\n            if node is None:\n                break\n            if node.end:\n                rep = w[:i + 1]\n                break\n        out.append(rep)\n    return ' '.join(out)\n",
   "hints": [
    "Сөз бойымен trie-де жүріп, бірінші <code>end</code> түйінінде тоқтаңыз — бұл ең қысқа түбір."
   ],
   "check": {
    "tests": "\nassert replace_roots(['кітап', 'оқы'], 'кітаптар оқылды мектепте') == 'кітап оқы мектепте', 'Күтілгені \"кітап оқы мектепте\"'\nassert replace_roots(['a', 'aa'], 'aaa ab b') == 'a a b', 'Ең қысқа түбір: \"a a b\"'\nassert replace_roots([], 'сәлем әлем') == 'сәлем әлем', 'Түбір жоқ: өзгеріссіз'\nassert replace_roots(['cat', 'bat', 'rat'], 'the cattle was rattled by the battery') == 'the cat was rat by the bat', 'Ағылшын мысалы қате'\nassert replace_roots(['ата'], 'ат') == 'ат', 'Сөз түбірден қысқа: өзгеріссіз'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Нүктелі іздеу",
   "prompt": "<p><code>WordDictionary</code> класы: <code>add(word)</code> сөзді қосады; <code>search(pattern)</code> үлгіге сәйкес сөз бар болса <code>True</code>. Үлгіде <code>'.'</code> кез келген <b>бір</b> таңбаны білдіреді. Trie + DFS: <code>'.'</code> кездессе, барлық балаларды тексеріңіз.</p>\n<pre><code>d = WordDictionary()\nd.add('бал'); d.add('бас'); d.add('мал')\nd.search('ба.') → True\nd.search('.ал') → True\nd.search('б..с') → False</code></pre>",
   "starter": "class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.end = False\n\nclass WordDictionary:\n    def __init__(self):\n        pass\n\n    def add(self, word):\n        pass\n\n    def search(self, pattern):\n        pass\n",
   "solution": "class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.end = False\n\nclass WordDictionary:\n    def __init__(self):\n        self.root = TrieNode()\n\n    def add(self, word):\n        node = self.root\n        for ch in word:\n            node = node.children.setdefault(ch, TrieNode())\n        node.end = True\n\n    def search(self, pattern):\n        def dfs(node, i):\n            if i == len(pattern):\n                return node.end\n            ch = pattern[i]\n            if ch == '.':\n                return any(dfs(c, i + 1) for c in node.children.values())\n            nxt = node.children.get(ch)\n            return nxt is not None and dfs(nxt, i + 1)\n        return dfs(self.root, 0)\n",
   "hints": [
    "<code>dfs(node, i)</code>: үлгі біткенде <code>node.end</code>-ті қайтарыңыз.",
    "<code>'.'</code> үшін <code>any(...)</code> барлық балалар бойынша."
   ],
   "check": {
    "tests": "\n_d = WordDictionary()\n_d.add('бал'); _d.add('бас'); _d.add('мал')\nassert _d.search('ба.') is True, \"'ба.': True\"\nassert _d.search('.ал') is True, \"'.ал': True\"\nassert _d.search('б..с') is False, \"'б..с': False (ұзындық 4)\"\nassert _d.search('бал') is True and _d.search('ба') is False, \"'ба' — префикс қана, сөз емес\"\nassert _d.search('...') is True and _d.search('..') is False, 'Тек нүктелер'\n_e = WordDictionary()\nassert _e.search('') is False and _e.search('.') is False, 'Бос сөздік: False'\n_e.add('')\nassert _e.search('') is True, 'Бос сөз қосылса: True'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең қысқа бірегей префикс",
   "prompt": "<p>Телефондағы контактілерді жылдам табу үшін әр есімнің ең қысқа <b>бірегей</b> префиксі керек (басқа ешбір есім ол префикспен басталмайды). <code>unique_prefixes(words)</code> әр сөз үшін сондай префикстер тізімін (сол ретпен) қайтарсын. Сөздер әртүрлі және бірі екіншісінің префиксі емес. Trie-ге <code>count</code> өрісін қосыңыз (осы түйіннен өтетін сөздер саны): сөз бойымен <code>count == 1</code> түйінге бірінші жеткенде тоқтаңыз.</p>\n<pre><code>unique_prefixes(['айгүл', 'айдос', 'берік', 'бота']) → ['айг', 'айд', 'бе', 'бо']</code></pre>",
   "starter": "def unique_prefixes(words):\n    pass\n",
   "solution": "def unique_prefixes(words):\n    root = {}\n    for w in words:\n        node = root\n        for ch in w:\n            node = node.setdefault(ch, {'#': 0})\n            node['#'] += 1\n    res = []\n    for w in words:\n        node = root\n        for i, ch in enumerate(w):\n            node = node[ch]\n            if node['#'] == 1:\n                res.append(w[:i + 1])\n                break\n    return res\n",
   "hints": [
    "<code>insert</code> кезінде жолдағы әр түйіннің санауышын арттырыңыз.",
    "Екінші өтуде санауышы 1 болған бірінші позицияда префиксті кесіңіз."
   ],
   "check": {
    "tests": "\nassert unique_prefixes(['айгүл', 'айдос', 'берік', 'бота']) == ['айг', 'айд', 'бе', 'бо'], \"Күтілгені ['айг', 'айд', 'бе', 'бо']\"\nassert unique_prefixes(['зере']) == ['з'], 'Бір сөз: бірінші әріп'\nassert unique_prefixes([]) == [], 'Сөз жоқ: []'\nassert unique_prefixes(['zebra', 'dog', 'duck', 'dove']) == ['z', 'dog', 'du', 'dov'], 'Ағылшын мысалы қате'\nimport random as _random\n_rng = _random.Random(2)\n_w = list({''.join(_rng.choice('абв') for _ in range(6)) for _ in range(30)})\n_r = unique_prefixes(_w)\nfor _x, _p in zip(_w, _r):\n    assert _x.startswith(_p) and sum(1 for y in _w if y.startswith(_p)) == 1, f'{_x}: {_p} бірегей емес'\n    assert sum(1 for y in _w if y.startswith(_p[:-1])) > 1, f'{_x}: {_p} ең қысқа емес'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Префикс бойынша қосынды",
   "prompt": "<p>Дүкен тауарлары мен бағалары: <code>PriceSum</code> класы. <code>insert(name, price)</code> — тауарды қосады (бар болса, бағасын <b>ауыстырады</b>); <code>total(prefix)</code> — атауы <code>prefix</code>-тен басталатын тауарлар бағаларының қосындысы. Trie түйінінде «осы префикстегі қосынды» сақтаңыз; бағаны ауыстырғанда жолдағы түйіндерге <code>жаңа − ескі</code> айырманы қосыңыз. Екі амал да O(L).</p>\n<pre><code>s = PriceSum()\ns.insert('алма', 300); s.insert('алмұрт', 500)\ns.total('ал')   → 800\ns.insert('алма', 200)\ns.total('алм')  → 700</code></pre>",
   "starter": "class PriceSum:\n    def __init__(self):\n        pass\n\n    def insert(self, name, price):\n        pass\n\n    def total(self, prefix):\n        pass\n",
   "solution": "class PriceSum:\n    def __init__(self):\n        self.root = {'#': 0}\n        self.prices = {}\n\n    def insert(self, name, price):\n        delta = price - self.prices.get(name, 0)\n        self.prices[name] = price\n        node = self.root\n        node['#'] += delta\n        for ch in name:\n            node = node.setdefault(ch, {'#': 0})\n            node['#'] += delta\n\n    def total(self, prefix):\n        node = self.root\n        for ch in prefix:\n            if ch not in node:\n                return 0\n            node = node[ch]\n        return node['#']\n",
   "hints": [
    "Ескі бағаларды бөлек сөздікте сақтаңыз: <code>delta = price − old</code>.",
    "Жолдағы әр түйінге (түбірді қоса) <code>delta</code> қосыңыз."
   ],
   "check": {
    "tests": "\n_s = PriceSum()\n_s.insert('алма', 300); _s.insert('алмұрт', 500)\nassert _s.total('ал') == 800, \"total('ал') 800\"\n_s.insert('алма', 200)\nassert _s.total('алм') == 700, 'Баға ауыстырылды: 700'\nassert _s.total('алма') == 200, \"total('алма') 200\"\nassert _s.total('б') == 0, 'Жоқ префикс: 0'\nassert _s.total('') == 700, 'Бос префикс: барлығы'\n_s.insert('ал', 50)\nassert _s.total('ал') == 750 and _s.total('алм') == 700, 'Префикс сөз ретінде де қосылады'\nimport random as _random, time as _time\n_rng = _random.Random(3)\n_ps = PriceSum(); _ref = {}\nfor _ in range(500):\n    _nm = ''.join(_rng.choice('аб') for _ in range(_rng.randint(1, 4)))\n    if _rng.random() < 0.6:\n        _v = _rng.randint(0, 100); _ps.insert(_nm, _v); _ref[_nm] = _v\n    else:\n        _pre = _nm[:_rng.randint(0, len(_nm))]\n        assert _ps.total(_pre) == sum(v for k, v in _ref.items() if k.startswith(_pre)), f'total({_pre!r}) қате'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ең үлкен XOR жұбы",
   "prompt": "<p><code>max_xor(nums)</code> (<code>0 ≤ x &lt; 2<sup>31</sup></code>) тізімдегі екі санның <code>a ^ b</code> мәнінің максимумын қайтарсын (сан өзімен жұп құра алады, нәтиже 0). O(n²) баяу. Бит trie: әр санды 30-биттен 0-битке дейін trie-ге салыңыз; әр сан үшін әр деңгейде <b>қарама-қарсы</b> битке баруға тырысыңыз — сонда XOR-дың жоғарғы биттері 1 болады. O(31·n).</p>\n<pre><code>max_xor([3, 10, 5, 25, 2, 8]) → 28     # 5 ^ 25\nmax_xor([7])                  → 0</code></pre>",
   "starter": "def max_xor(nums):\n    pass\n",
   "solution": "def max_xor(nums):\n    root = {}\n    for x in nums:\n        node = root\n        for b in range(30, -1, -1):\n            bit = (x >> b) & 1\n            node = node.setdefault(bit, {})\n    best = 0\n    for x in nums:\n        node = root\n        cur = 0\n        for b in range(30, -1, -1):\n            bit = (x >> b) & 1\n            if 1 - bit in node:\n                cur |= 1 << b\n                node = node[1 - bit]\n            else:\n                node = node[bit]\n        best = max(best, cur)\n    return best\n",
   "hints": [
    "Бит: <code>(x &gt;&gt; b) &amp; 1</code>; trie түйіні — <code>{0: ..., 1: ...}</code> сөздігі.",
    "Қарама-қарсы бит бар болса, жауапқа <code>1 &lt;&lt; b</code> қосып, сол жаққа түсіңіз."
   ],
   "check": {
    "tests": "\nassert max_xor([3, 10, 5, 25, 2, 8]) == 28, 'Күтілгені 28'\nassert max_xor([7]) == 0, 'Бір сан: 0'\nassert max_xor([0, 0]) == 0, 'Нөлдер: 0'\nassert max_xor([1, 2]) == 3, '1 ^ 2 = 3'\nassert max_xor([2**31 - 1, 0]) == 2**31 - 1, 'Ең үлкен бит'\nimport random as _random, time as _time\n_rng = _random.Random(4)\nfor _ in range(30):\n    _x = [_rng.randint(0, 200) for _ in range(_rng.randint(1, 12))]\n    _exp = max(a ^ b for a in _x for b in _x)\n    assert max_xor(_x) == _exp, f'max_xor({_x}) {_exp} болуы керек'\n_big = [_rng.randint(0, 2**31 - 1) for _ in range(20000)]\n_t0 = _time.perf_counter(); max_xor(_big); _dt = _time.perf_counter() - _t0\nassert _dt < 3.0, f'20 000 санға {_dt:.2f} с: бит trie керек (O(n²) емес)'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Тордағы сөздер",
   "prompt": "<p>Әріптер торы <code>board</code> (жолдар тізімі) және сөздер <code>words</code>. Сөзді торда көрші (жоғары/төмен/солға/оңға) ұяшықтар арқылы құрауға болады, бір сөзде бір ұяшық бір рет қана. <code>find_words(board, words)</code> торда табылған сөздерді қайталаусыз, сұрыпталған тізім ретінде қайтарсын. Әр сөзді бөлек іздеу баяу: сөздерден trie құрып, әр ұяшықтан trie бойымен backtracking жасаңыз — trie-де жоқ префикс бірден кесіледі.</p>\n<pre><code>find_words(['oaan', 'etae', 'ihkr', 'iflv'], ['oath', 'pea', 'eat', 'rain']) → ['eat', 'oath']</code></pre>",
   "starter": "def find_words(board, words):\n    pass\n",
   "solution": "def find_words(board, words):\n    root = {}\n    for w in words:\n        node = root\n        for ch in w:\n            node = node.setdefault(ch, {})\n        node['$'] = w\n    R = len(board)\n    C = len(board[0]) if R else 0\n    found = set()\n    used = [[False] * C for _ in range(R)]\n    def dfs(r, c, node):\n        ch = board[r][c]\n        nxt = node.get(ch)\n        if nxt is None:\n            return\n        if '$' in nxt:\n            found.add(nxt['$'])\n        used[r][c] = True\n        for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):\n            if 0 <= nr < R and 0 <= nc < C and not used[nr][nc]:\n                dfs(nr, nc, nxt)\n        used[r][c] = False\n    for r in range(R):\n        for c in range(C):\n            dfs(r, c, root)\n    return sorted(found)\n",
   "hints": [
    "Сөз соңындағы түйінде <code>'$'</code> кілтімен сөздің өзін сақтаңыз.",
    "Backtracking: ұяшықты <code>used</code> деп белгілеп, қайтқанда белгіні алыңыз."
   ],
   "check": {
    "tests": "\nassert find_words(['oaan', 'etae', 'ihkr', 'iflv'], ['oath', 'pea', 'eat', 'rain']) == ['eat', 'oath'], \"Күтілгені ['eat', 'oath']\"\nassert find_words(['ab', 'cd'], ['abcb']) == [], 'Бір ұяшықты қайта қолдануға болмайды: []'\nassert find_words(['a'], ['a', 'a', 'b']) == ['a'], \"Қайталанбасын: ['a']\"\nassert find_words(['ата', 'ұлы'], ['ата', 'атұ', 'тұл', 'ұлы', 'аталы', 'тлы']) == ['ата', 'тлы', 'ұлы'], \"Кириллица торы: ['ата', 'тлы', 'ұлы']\"\nassert find_words(['ab'], []) == [], 'Сөз жоқ: []'\nimport time as _time\n_b = ['a' * 4] * 4\n_ws = ['a' * k for k in range(1, 9)] + ['a' * 7 + 'b']\n_t0 = _time.perf_counter(); _r = find_words(_b, _ws); _dt = _time.perf_counter() - _t0\nassert _r == sorted('a' * k for k in range(1, 9)), \"4×4 'a' торында ұзындығы 1..8 сөздер табылуы керек\"\nassert _dt < 4.0, f'{_dt:.2f} с: trie арқылы префиксті ертерек кесіңіз'\n"
   }
  }
 ]
});
