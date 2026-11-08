// Practice tasks after the lessons of dsa-1. Each lesson's list opens one task at a time.
DJ.addPractice('dsa-1', {
 "dsa-1": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ең үлкен сан",
   "prompt": "<p><code>max_value(xs)</code> тізімдегі ең үлкен санды қайтарсын, <code>max()</code> қолданбай, бір рет аралап (O(n)). Бос тізім үшін <code>None</code>.</p>\n<pre><code>max_value([3, -1, 7, 2]) → 7\nmax_value([-5, -9])      → -5\nmax_value([])            → None</code></pre>",
   "starter": "def max_value(xs):\n    pass\n",
   "solution": "def max_value(xs):\n    if not xs:\n        return None\n    best = xs[0]\n    for x in xs:\n        if x > best:\n            best = x\n    return best\n",
   "hints": [
    "Бос тізімді бірден тексеріңіз.",
    "Бастапқы мән ретінде <code>xs[0]</code> алыңыз (0 емес: барлығы теріс болуы мүмкін)."
   ],
   "check": {
    "tests": "\nassert max_value([3, -1, 7, 2]) == 7, 'max_value([3, -1, 7, 2]) 7 қайтаруы керек'\nassert max_value([-5, -9]) == -5, 'Барлығы теріс болса да ең үлкенін қайтарыңыз: -5'\nassert max_value([]) is None, 'Бос тізім үшін None'\nassert max_value([4]) == 4, 'Бір элементті тізімде сол элемент'\nassert max_value([2, 2, 2]) == 2, 'Бірдей мәндер: 2'\n_big = list(range(100000))\nassert max_value(_big) == 99999, '0..99999 тізімінде 99999'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жұп сандар саны",
   "prompt": "<p>Мектеп кезегіндегі оқушылар нөмірлері берілген. <code>count_even(xs)</code> жұп сандардың санын қайтарсын (0 да жұп, теріс сандар да болуы мүмкін).</p>\n<pre><code>count_even([1, 2, 3, 4]) → 2\ncount_even([0, -2, 5])   → 2\ncount_even([])           → 0</code></pre>",
   "starter": "def count_even(xs):\n    pass\n",
   "solution": "def count_even(xs):\n    c = 0\n    for x in xs:\n        if x % 2 == 0:\n            c += 1\n    return c\n",
   "hints": [
    "<code>x % 2 == 0</code> — жұп сан."
   ],
   "check": {
    "tests": "\nassert count_even([1, 2, 3, 4]) == 2, 'count_even([1, 2, 3, 4]) 2 қайтаруы керек'\nassert count_even([0, -2, 5]) == 2, '0 және -2 — жұп сандар: 2'\nassert count_even([]) == 0, 'Бос тізім үшін 0'\nassert count_even([1, 3, 5]) == 0, 'Жұп сан жоқ: 0'\nassert count_even(list(range(100000))) == 50000, '0..99999 ішінде 50000 жұп сан'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ортақ қалалар",
   "prompt": "<p>Екі автобус компаниясы баратын қалалар тізімі берілген (қайталанулар болуы мүмкін). <code>common_cities(a, b)</code> екеуінде де бар қалаларды <b>қайталаусыз, алфавит бойынша сұрыпталған</b> тізім ретінде қайтарсын. <code>set</code> арқылы O(n + m).</p>\n<pre><code>common_cities(['Алматы', 'Тараз', 'Алматы'], ['Тараз', 'Алматы', 'Атырау'])\n→ ['Алматы', 'Тараз']</code></pre>",
   "starter": "def common_cities(a, b):\n    pass\n",
   "solution": "def common_cities(a, b):\n    return sorted(set(a) & set(b))\n",
   "hints": [
    "Екі тізімді <code>set</code>-ке айналдырып, қиылысын <code>&amp;</code> арқылы алыңыз.",
    "Нәтижені <code>sorted(...)</code> арқылы тізімге айналдырыңыз."
   ],
   "check": {
    "tests": "\nassert common_cities(['Алматы', 'Тараз', 'Алматы'], ['Тараз', 'Алматы', 'Атырау']) == ['Алматы', 'Тараз'], \"Күтілгені ['Алматы', 'Тараз']\"\nassert common_cities([], ['Астана']) == [], 'Бір тізім бос болса, ортақ қала жоқ'\nassert common_cities(['Орал'], ['Ақтөбе']) == [], 'Ортақ қала жоқ: []'\nassert common_cities(['Шымкент', 'Шымкент'], ['Шымкент']) == ['Шымкент'], 'Қайталанбасын: бір рет қана'\n_a = [str(i) for i in range(50000)]; _b = [str(i) for i in range(25000, 75000)]\nassert len(common_cities(_a, _b)) == 25000, 'Үлкен тізімдерде 25000 ортақ мән болуы керек'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Екі есе үлкен жұп",
   "prompt": "<p><code>has_double(xs)</code>: тізімде <code>i != j</code> және <code>xs[j] == 2 * xs[i]</code> болатын екі элемент бар болса <code>True</code>. Назар аударыңыз: 0 үшін екінші 0 керек (элемент өзімен жұп құрмайды). Тест 100 000 элементпен тексереді: O(n) шешім керек.</p>\n<pre><code>has_double([10, 2, 5, 3]) → True    # 10 = 2 · 5\nhas_double([3, 1, 7, 11]) → False\nhas_double([0])           → False\nhas_double([0, 0])        → True</code></pre>",
   "starter": "def has_double(xs):\n    pass\n",
   "solution": "def has_double(xs):\n    seen = set()\n    for x in xs:\n        if 2 * x in seen or (x % 2 == 0 and x // 2 in seen):\n            return True\n        seen.add(x)\n    return False\n",
   "hints": [
    "Әр <code>x</code> үшін бұрын көрген мәндерден <code>2 * x</code> немесе <code>x / 2</code> бар ма, тексеріңіз.",
    "Элементті тексергеннен <b>кейін</b> ғана <code>seen</code>-ге қосыңыз — сонда 0 өзімен жұп құрмайды."
   ],
   "check": {
    "tests": "\nassert has_double([10, 2, 5, 3]) is True, 'has_double([10, 2, 5, 3]) True: 10 = 2 · 5'\nassert has_double([3, 1, 7, 11]) is False, 'has_double([3, 1, 7, 11]) False'\nassert has_double([0]) is False, 'Жалғыз 0 өзімен жұп құрмайды'\nassert has_double([0, 0]) is True, 'Екі 0: 0 = 2 · 0'\nassert has_double([-2, -4]) is True, '-4 = 2 · (-2)'\nassert has_double([7, 3]) is False, '7 // 2 = 3, бірақ 7 = 2 · 3.5 емес'\nassert has_double([]) is False, 'Бос тізім: False'\nimport time as _time\n_big = list(range(1, 200001, 2))\n_t0 = _time.perf_counter(); _r = has_double(_big); _dt = _time.perf_counter() - _t0\nassert _r is False, 'Тек тақ сандарда екі есе жұп жоқ'\nassert _dt < 1.0, f'100 000 элементке {_dt:.2f} с кетті: set арқылы O(n) шешім жазыңыз'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бірінші қайталанған билет",
   "prompt": "<p>Стадионға кірген билет нөмірлері келу ретімен берілген. <code>first_repeat(ids)</code> <b>екінші рет</b> ең ерте көрінген нөмірді қайтарсын; қайталану жоқ болса <code>None</code>. O(n).</p>\n<pre><code>first_repeat([5, 1, 3, 1, 5]) → 1    # 1 екінші рет 3-позицияда, 5 тек 4-те\nfirst_repeat([4, 2, 9])       → None</code></pre>",
   "starter": "def first_repeat(ids):\n    pass\n",
   "solution": "def first_repeat(ids):\n    seen = set()\n    for x in ids:\n        if x in seen:\n            return x\n        seen.add(x)\n    return None\n",
   "hints": [
    "Солдан оңға жүріп, <code>seen</code> жиынын толтырыңыз.",
    "Бұрын көрген мәнге бірінші тап болған сәтте оны қайтарыңыз."
   ],
   "check": {
    "tests": "\nassert first_repeat([5, 1, 3, 1, 5]) == 1, 'first_repeat([5, 1, 3, 1, 5]) 1 қайтаруы керек (5 емес)'\nassert first_repeat([4, 2, 9]) is None, 'Қайталану жоқ: None'\nassert first_repeat([]) is None, 'Бос тізім: None'\nassert first_repeat([7, 7]) == 7, 'first_repeat([7, 7]) 7'\nassert first_repeat([0, 1, 0]) == 0, '0 нөмірі де дұрыс жауап бола алады'\n_big = list(range(100000)) + [123]\nassert first_repeat(_big) == 123, 'Соңындағы 123 — бірінші қайталанған'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Екіге бөлу қадамдары",
   "prompt": "<p><code>halving_steps(n)</code>: <code>n</code> теріс емес бүтін сан. <code>n &gt; 1</code> болғанша <code>n //= 2</code> орындаймыз. Неше қадам жасалатынын қайтарыңыз. Бұл — O(log n) циклдің мысалы: <code>n = 10<sup>18</sup></code> үшін де лезде бітуі керек.</p>\n<pre><code>halving_steps(8)  → 3    # 8 → 4 → 2 → 1\nhalving_steps(10) → 3    # 10 → 5 → 2 → 1\nhalving_steps(1)  → 0\nhalving_steps(0)  → 0</code></pre>",
   "starter": "def halving_steps(n):\n    pass\n",
   "solution": "def halving_steps(n):\n    steps = 0\n    while n > 1:\n        n //= 2\n        steps += 1\n    return steps\n",
   "hints": [
    "<code>while n &gt; 1:</code> циклінде санауышты арттырыңыз."
   ],
   "check": {
    "tests": "\nassert halving_steps(8) == 3, 'halving_steps(8) 3 қайтаруы керек'\nassert halving_steps(10) == 3, 'halving_steps(10) 3 қайтаруы керек'\nassert halving_steps(1) == 0, 'n = 1 үшін 0 қадам'\nassert halving_steps(0) == 0, 'n = 0 үшін 0 қадам'\nassert halving_steps(2) == 1, 'n = 2 үшін 1 қадам'\nassert halving_steps(1023) == 9, 'n = 1023 үшін 9 қадам'\nassert halving_steps(1024) == 10, 'n = 1024 үшін 10 қадам'\nassert halving_steps(10**18) == 59, 'n = 10^18 үшін 59 қадам'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Қосындысы нөл жұп",
   "prompt": "<p>Банк шотындағы операциялар: кіріс оң, шығыс теріс сан. <code>has_zero_pair(ops)</code>: <code>i &lt; j</code> және <code>ops[i] + ops[j] == 0</code> болатын жұп бар болса <code>True</code>. Тест 100 000 операциямен тексереді: O(n²) өтпейді.</p>\n<pre><code>has_zero_pair([500, -200, 300, 200]) → True\nhas_zero_pair([0, 5])                → False   # 0 үшін екінші 0 керек\nhas_zero_pair([0, 5, 0])             → True</code></pre>",
   "starter": "def has_zero_pair(ops):\n    pass\n",
   "solution": "def has_zero_pair(ops):\n    seen = set()\n    for x in ops:\n        if -x in seen:\n            return True\n        seen.add(x)\n    return False\n",
   "hints": [
    "Әр <code>x</code> үшін бұрын <code>-x</code> көрдік пе — <code>set</code>-тен O(1) тексеру.",
    "Тексергеннен кейін ғана <code>x</code>-ті қосыңыз, сонда жалғыз 0 өзімен жұп құрмайды."
   ],
   "check": {
    "tests": "\nassert has_zero_pair([500, -200, 300, 200]) is True, '-200 + 200 = 0: True'\nassert has_zero_pair([0, 5]) is False, 'Жалғыз 0 жұп құрмайды'\nassert has_zero_pair([0, 5, 0]) is True, 'Екі 0: True'\nassert has_zero_pair([]) is False, 'Бос тізім: False'\nassert has_zero_pair([1, 2, 3]) is False, 'Тек оң сандар: False'\nassert has_zero_pair([-7, 7]) is True, '-7 + 7 = 0'\nimport time as _time, random as _random\n_rng = _random.Random(7)\n_big = _rng.sample(range(1, 10**6), 100000)\n_t0 = _time.perf_counter(); _r = has_zero_pair(_big); _dt = _time.perf_counter() - _t0\nassert _r is False, 'Тек оң сандарда жұп жоқ'\nassert _dt < 1.0, f'100 000 элементке {_dt:.2f} с кетті: O(n) шешім керек'\nassert has_zero_pair(_big + [-_big[500]]) is True, 'Соңына теріс мән қосылса, True'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Бір рет кездесетіндер",
   "prompt": "<p><code>count_singles(xs)</code> тізімде <b>дәл бір рет</b> кездесетін мәндердің санын қайтарсын. Екі <code>set</code> қолданыңыз: бір рет көрілгендер және қайталанғандар. Сөздік (dict) қажет емес. O(n), тест 100 000 элементпен.</p>\n<pre><code>count_singles([4, 1, 4, 2, 4, 3, 2]) → 2    # 1 және 3\ncount_singles([])                    → 0</code></pre>",
   "starter": "def count_singles(xs):\n    pass\n",
   "solution": "def count_singles(xs):\n    once = set()\n    dup = set()\n    for x in xs:\n        if x in dup:\n            continue\n        if x in once:\n            once.discard(x)\n            dup.add(x)\n        else:\n            once.add(x)\n    return len(once)\n",
   "hints": [
    "<code>once</code> — әзірге бір рет көрілгендер, <code>dup</code> — кемінде екі рет көрілгендер.",
    "Мән <code>once</code>-та болса, оны <code>dup</code>-қа көшіріңіз; үшінші рет келсе, ештеңе істемеңіз."
   ],
   "check": {
    "tests": "\nassert count_singles([4, 1, 4, 2, 4, 3, 2]) == 2, 'count_singles([4, 1, 4, 2, 4, 3, 2]) 2 қайтаруы керек (1 және 3)'\nassert count_singles([]) == 0, 'Бос тізім: 0'\nassert count_singles([9]) == 1, 'Бір элемент: 1'\nassert count_singles([5, 5, 5]) == 0, 'Үш рет кездескен мән бір рет емес: 0'\nassert count_singles([1, 2, 3]) == 3, 'Барлығы әртүрлі: 3'\nimport time as _time\n_big = list(range(60000)) + list(range(20000))\n_t0 = _time.perf_counter(); _r = count_singles(_big); _dt = _time.perf_counter() - _t0\nassert _r == 40000, f'Күтілгені 40000, сізде {_r}'\nassert _dt < 1.0, f'{_dt:.2f} с кетті: O(n) шешім керек'\n"
   }
  }
 ],
 "dsa-2": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Тізімді оңға айналдыру",
   "prompt": "<p><code>rotate_right(a, k)</code> тізімнің элементтерін <code>k</code> орынға оңға жылжытқан <b>жаңа</b> тізім қайтарсын: соңғы элементтер басына шығады. <code>k</code> тізім ұзындығынан үлкен болуы мүмкін. Бос тізім үшін <code>[]</code>.</p>\n<pre><code>rotate_right([1, 2, 3, 4, 5], 2) → [4, 5, 1, 2, 3]\nrotate_right([1, 2, 3], 4)       → [3, 1, 2]\nrotate_right([], 3)              → []</code></pre>",
   "starter": "def rotate_right(a, k):\n    pass\n",
   "solution": "def rotate_right(a, k):\n    if not a:\n        return []\n    k %= len(a)\n    return a[len(a) - k:] + a[:len(a) - k]\n",
   "hints": [
    "Алдымен <code>k %= len(a)</code> (бос тізімді бөлек тексеріңіз).",
    "Кесінділер: соңғы <code>k</code> элемент + қалғаны."
   ],
   "check": {
    "tests": "\nassert rotate_right([1, 2, 3, 4, 5], 2) == [4, 5, 1, 2, 3], 'rotate_right([1, 2, 3, 4, 5], 2) [4, 5, 1, 2, 3] болуы керек'\nassert rotate_right([1, 2, 3], 4) == [3, 1, 2], 'k > n: k % n қолданыңыз'\nassert rotate_right([], 3) == [], 'Бос тізім үшін []'\nassert rotate_right([1, 2, 3], 0) == [1, 2, 3], 'k = 0: өзгеріссіз'\nassert rotate_right([1, 2, 3], 3) == [1, 2, 3], 'k = n: өзгеріссіз'\n_a = [1, 2, 3]; rotate_right(_a, 1)\nassert _a == [1, 2, 3], 'Бастапқы тізімді өзгертпеңіз, жаңа тізім қайтарыңыз'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Айна тізім",
   "prompt": "<p><code>is_mirror(a)</code>: тізім екі жағынан бірдей оқылса (<code>a[i] == a[n-1-i]</code>) <code>True</code>. Екі көрсеткіш қолданыңыз: біреуі басынан, біреуі соңынан. Кесінді (<code>a[::-1]</code>) жасамаңыз.</p>\n<pre><code>is_mirror([1, 2, 3, 2, 1]) → True\nis_mirror([1, 2])          → False\nis_mirror([])              → True</code></pre>",
   "starter": "def is_mirror(a):\n    pass\n",
   "solution": "def is_mirror(a):\n    i, j = 0, len(a) - 1\n    while i < j:\n        if a[i] != a[j]:\n            return False\n        i += 1\n        j -= 1\n    return True\n",
   "hints": [
    "<code>i = 0</code>, <code>j = len(a) - 1</code>; <code>while i &lt; j</code>.",
    "Бір айырмашылық табылса, бірден <code>False</code>."
   ],
   "check": {
    "tests": "\nassert is_mirror([1, 2, 3, 2, 1]) is True, 'is_mirror([1, 2, 3, 2, 1]) True'\nassert is_mirror([1, 2]) is False, 'is_mirror([1, 2]) False'\nassert is_mirror([]) is True, 'Бос тізім — айна: True'\nassert is_mirror([7]) is True, 'Бір элемент: True'\nassert is_mirror([4, 4]) is True, 'is_mirror([4, 4]) True'\nassert is_mirror([1, 2, 3, 1]) is False, 'is_mirror([1, 2, 3, 1]) False'\n",
    "mustInclude": [
     "while"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жұптарды алға шығару",
   "prompt": "<p><code>evens_first(a)</code> тізімді <b>орнында</b> өзгертсін: барлық жұп сандар тақ сандардан алдын тұрсын (топ ішіндегі рет маңызды емес). Екі көрсеткішпен O(n), қосымша тізім жасамаңыз. Функция ештеңе қайтармайды.</p>\n<pre><code>a = [3, 1, 2, 4]\nevens_first(a)   # a мысалы [4, 2, 1, 3] немесе [2, 4, 3, 1]</code></pre>",
   "starter": "def evens_first(a):\n    pass\n",
   "solution": "def evens_first(a):\n    i, j = 0, len(a) - 1\n    while i < j:\n        if a[i] % 2 == 0:\n            i += 1\n        elif a[j] % 2 == 1:\n            j -= 1\n        else:\n            a[i], a[j] = a[j], a[i]\n            i += 1\n            j -= 1\n",
   "hints": [
    "Сол көрсеткіш жұп санды өткізіп жібереді, оң көрсеткіш тақ санды.",
    "Екеуі де «қате» элементте тоқтаса, оларды ауыстырыңыз."
   ],
   "check": {
    "tests": "\ndef _ok(a, orig):\n    if sorted(a) != sorted(orig):\n        return False\n    k = sum(1 for x in orig if x % 2 == 0)\n    return all(x % 2 == 0 for x in a[:k]) and all(x % 2 == 1 for x in a[k:])\nfor _orig in [[3, 1, 2, 4], [], [1], [2], [1, 3, 5], [2, 4, 6], [0, -1, -2, 7, 8], [5, 2, 5, 2, 5, 2]]:\n    _a = list(_orig); _r = evens_first(_a)\n    assert _ok(_a, _orig), f'{_orig} үшін жұптар алдымен тұруы керек, сізде {_a}'\n_a = [3, 1, 2, 4]; _id = id(_a); evens_first(_a)\nassert id(_a) == _id and _a[:2] in ([2, 4], [4, 2]), 'Тізімді орнында өзгертіңіз'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Квадраттарды сұрыптау",
   "prompt": "<p>Ауа температуралары өсу ретімен сұрыпталған (теріс те болады). <code>sorted_squares(a)</code> квадраттардың өсу ретімен сұрыпталған тізімін O(n) уақытта қайтарсын: екі көрсеткіш ең үлкен модульді шеттерден табады. <code>sorted</code> қолданбаңыз.</p>\n<pre><code>sorted_squares([-4, -1, 0, 3, 10]) → [0, 1, 9, 16, 100]\nsorted_squares([-3, -2])          → [4, 9]</code></pre>",
   "starter": "def sorted_squares(a):\n    pass\n",
   "solution": "def sorted_squares(a):\n    n = len(a)\n    res = [0] * n\n    i, j = 0, n - 1\n    for pos in range(n - 1, -1, -1):\n        if abs(a[i]) > abs(a[j]):\n            res[pos] = a[i] * a[i]\n            i += 1\n        else:\n            res[pos] = a[j] * a[j]\n            j -= 1\n    return res\n",
   "hints": [
    "Ең үлкен квадрат не ең сол жақта, не ең оң жақта тұрады.",
    "Нәтижені соңынан бастап толтырыңыз: <code>pos</code> <code>n-1</code>-ден 0-ге дейін."
   ],
   "check": {
    "tests": "\nassert sorted_squares([-4, -1, 0, 3, 10]) == [0, 1, 9, 16, 100], 'Күтілгені [0, 1, 9, 16, 100]'\nassert sorted_squares([-3, -2]) == [4, 9], 'Тек теріс сандар: [4, 9]'\nassert sorted_squares([]) == [], 'Бос тізім: []'\nassert sorted_squares([5]) == [25], 'Бір элемент: [25]'\nassert sorted_squares([-2, 2]) == [4, 4], 'Бірдей модульдер: [4, 4]'\nassert sorted_squares([1, 2, 3]) == [1, 4, 9], 'Тек оң сандар: [1, 4, 9]'\nimport random as _random\n_rng = _random.Random(3)\nfor _ in range(50):\n    _a = sorted(_rng.randint(-50, 50) for _ in range(_rng.randint(0, 30)))\n    assert sorted_squares(_a) == sorted(x * x for x in _a), f'{_a} үшін қате нәтиже'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Сұрыпталған тізімдер қиылысы",
   "prompt": "<p>Екі дүкеннің чек сомалары өсу ретімен сұрыпталған. <code>intersect_sorted(a, b)</code> екеуінде де бар мәндерді қайтарсын: мән <code>a</code>-да <code>p</code> рет, <code>b</code>-да <code>q</code> рет болса, нәтижеде <code>min(p, q)</code> рет. Екі көрсеткіш, O(n + m).</p>\n<pre><code>intersect_sorted([1, 2, 2, 3, 5], [2, 2, 2, 5, 7]) → [2, 2, 5]\nintersect_sorted([1, 3], [2, 4])                → []</code></pre>",
   "starter": "def intersect_sorted(a, b):\n    pass\n",
   "solution": "def intersect_sorted(a, b):\n    i = j = 0\n    res = []\n    while i < len(a) and j < len(b):\n        if a[i] == b[j]:\n            res.append(a[i])\n            i += 1\n            j += 1\n        elif a[i] < b[j]:\n            i += 1\n        else:\n            j += 1\n    return res\n",
   "hints": [
    "Тең болса — нәтижеге қосып, екі көрсеткішті де жылжытыңыз.",
    "Әйтпесе кішісін көрсетіп тұрған көрсеткішті жылжытыңыз."
   ],
   "check": {
    "tests": "\nassert intersect_sorted([1, 2, 2, 3, 5], [2, 2, 2, 5, 7]) == [2, 2, 5], 'Күтілгені [2, 2, 5]'\nassert intersect_sorted([1, 3], [2, 4]) == [], 'Ортақ мән жоқ: []'\nassert intersect_sorted([], [1, 2]) == [], 'Бос тізіммен қиылыс бос'\nassert intersect_sorted([4, 4, 4], [4]) == [4], 'min(3, 1) = 1 рет'\nassert intersect_sorted([1, 2, 3], [1, 2, 3]) == [1, 2, 3], 'Бірдей тізімдер'\nimport random as _random\nfrom collections import Counter as _C\n_rng = _random.Random(5)\nfor _ in range(40):\n    _a = sorted(_rng.randint(0, 10) for _ in range(_rng.randint(0, 15)))\n    _b = sorted(_rng.randint(0, 10) for _ in range(_rng.randint(0, 15)))\n    _exp = sorted((_C(_a) & _C(_b)).elements())\n    assert intersect_sorted(_a, _b) == _exp, f'{_a} және {_b}: күтілгені {_exp}'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Мәнді орнында өшіру",
   "prompt": "<p><code>remove_value(a, x)</code>: тізімнен <code>x</code>-ке тең барлық элементтерді <b>орнында</b> алып тастаңыз. Қалған элементтер ретін сақтап, тізімнің басына жиналсын. Жаңа ұзындық <code>k</code>-ны қайтарыңыз; <code>a[:k]</code> тексеріледі. Оқу және жазу көрсеткіштері, O(n). Жаңа тізім жасамаңыз, <code>remove</code> қолданбаңыз.</p>\n<pre><code>a = [3, 2, 2, 3, 4]\nremove_value(a, 3) → 3     # a[:3] == [2, 2, 4]</code></pre>",
   "starter": "def remove_value(a, x):\n    pass\n",
   "solution": "def remove_value(a, x):\n    w = 0\n    for r in range(len(a)):\n        if a[r] != x:\n            a[w] = a[r]\n            w += 1\n    return w\n",
   "hints": [
    "<code>w</code> — келесі жазылатын орын. <code>a[r] != x</code> болса, <code>a[w] = a[r]</code>, <code>w += 1</code>."
   ],
   "check": {
    "tests": "\n_a = [3, 2, 2, 3, 4]; _k = remove_value(_a, 3)\nassert _k == 3 and _a[:_k] == [2, 2, 4], f'Күтілгені k=3, [2, 2, 4]; сізде k={_k}, {_a[:_k] if isinstance(_k, int) else _a}'\n_a = []; assert remove_value(_a, 1) == 0, 'Бос тізім: 0'\n_a = [5, 5, 5]; assert remove_value(_a, 5) == 0, 'Барлығы өшірілсе: 0'\n_a = [1, 2, 3]; _k = remove_value(_a, 9)\nassert _k == 3 and _a == [1, 2, 3], 'x жоқ болса, тізім өзгермейді'\n_a = [0, 1, 0, 2, 0, 3]; _k = remove_value(_a, 0)\nassert _k == 3 and _a[:3] == [1, 2, 3], 'Рет сақталуы керек: [1, 2, 3]'\n_a = [1, 2, 1]; _id = id(_a); remove_value(_a, 1)\nassert id(_a) == _id and len(_a) == 3, 'Тізімді орнында өзгертіңіз: ұзындығын қысқартпаңыз, жаңа тізім жасамаңыз'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ең көп су сыятын ыдыс",
   "prompt": "<p>Каналдың бойында биіктіктері <code>h[i]</code> болатын қабырғалар тұр. Екі қабырға <code>i &lt; j</code> және түбі ыдыс құрайды: сыйымдылығы <code>(j - i) * min(h[i], h[j])</code>. <code>max_area(h)</code> ең үлкен сыйымдылықты қайтарсын. Екі көрсеткіш: аласа қабырғаны ішке жылжытыңыз — O(n). Қабырға 2-ден аз болса, 0.</p>\n<pre><code>max_area([1, 8, 6, 2, 5, 4, 8, 3, 7]) → 49\nmax_area([1, 1])                      → 1</code></pre>",
   "starter": "def max_area(h):\n    pass\n",
   "solution": "def max_area(h):\n    i, j = 0, len(h) - 1\n    best = 0\n    while i < j:\n        best = max(best, (j - i) * min(h[i], h[j]))\n        if h[i] < h[j]:\n            i += 1\n        else:\n            j -= 1\n    return best\n",
   "hints": [
    "Бастапқыда <code>i = 0</code>, <code>j = n - 1</code> — ең кең ыдыс.",
    "Биік қабырғаны жылжыту ешқашан пайда бермейді: ені кішірейеді, биіктік аласа қабырғамен шектеледі."
   ],
   "check": {
    "tests": "\nassert max_area([1, 8, 6, 2, 5, 4, 8, 3, 7]) == 49, 'Күтілгені 49'\nassert max_area([1, 1]) == 1, 'max_area([1, 1]) 1'\nassert max_area([5]) == 0, 'Бір қабырға: 0'\nassert max_area([]) == 0, 'Бос тізім: 0'\nassert max_area([4, 3, 2, 1, 4]) == 16, 'Шеткі қабырғалар: 16'\nassert max_area([0, 0, 0]) == 0, 'Нөлдік биіктік: 0'\nimport random as _random, time as _time\n_rng = _random.Random(11)\nfor _ in range(30):\n    _h = [_rng.randint(0, 20) for _ in range(_rng.randint(2, 25))]\n    _exp = max((j - i) * min(_h[i], _h[j]) for i in range(len(_h)) for j in range(i + 1, len(_h)))\n    assert max_area(_h) == _exp, f'{_h} үшін күтілгені {_exp}'\n_big = [_rng.randint(1, 10**4) for _ in range(100000)]\n_t0 = _time.perf_counter(); max_area(_big); _dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'100 000 қабырғаға {_dt:.2f} с: O(n) екі көрсеткіш керек'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Үш санның қосындысы",
   "prompt": "<p><code>three_sum(nums)</code>: қосындысы 0 болатын барлық <b>әртүрлі</b> үштіктерді <code>[a, b, c]</code> (<code>a ≤ b ≤ c</code>) қайтарыңыз, үштіктер тізімі өсу ретімен сұрыпталсын. Алдымен тізімді сұрыптап (<code>sorted</code>), әр <code>a</code> үшін қалғанына екі көрсеткіш қолданыңыз: O(n²). Қайталанатын үштіктерді өткізіп жіберіңіз.</p>\n<pre><code>three_sum([-1, 0, 1, 2, -1, -4]) → [[-1, -1, 2], [-1, 0, 1]]\nthree_sum([0, 0, 0, 0])          → [[0, 0, 0]]\nthree_sum([1, 2])                → []</code></pre>",
   "starter": "def three_sum(nums):\n    pass\n",
   "solution": "def three_sum(nums):\n    a = sorted(nums)\n    n = len(a)\n    res = []\n    for i in range(n - 2):\n        if i > 0 and a[i] == a[i - 1]:\n            continue\n        lo, hi = i + 1, n - 1\n        while lo < hi:\n            s = a[i] + a[lo] + a[hi]\n            if s < 0:\n                lo += 1\n            elif s > 0:\n                hi -= 1\n            else:\n                res.append([a[i], a[lo], a[hi]])\n                lo += 1\n                hi -= 1\n                while lo < hi and a[lo] == a[lo - 1]:\n                    lo += 1\n    return res\n",
   "hints": [
    "Сұрыптағаннан кейін <code>a[i]</code> бекітілсе, қалғаны — сұрыпталған тізімдегі «қосындысы <code>-a[i]</code> жұп» есебі.",
    "Қайталанбау үшін: бірдей <code>a[i]</code>-ді өткізіңіз, табылған жұптан кейін бірдей <code>a[lo]</code>-ларды да өткізіңіз."
   ],
   "check": {
    "tests": "\nassert three_sum([-1, 0, 1, 2, -1, -4]) == [[-1, -1, 2], [-1, 0, 1]], 'Күтілгені [[-1, -1, 2], [-1, 0, 1]]'\nassert three_sum([0, 0, 0, 0]) == [[0, 0, 0]], 'Төрт нөл: тек [[0, 0, 0]]'\nassert three_sum([1, 2]) == [], 'Екі элемент: []'\nassert three_sum([]) == [], 'Бос тізім: []'\nassert three_sum([1, 2, 3]) == [], 'Қосындысы 0 үштік жоқ'\nimport random as _random\nfrom itertools import combinations as _comb\n_rng = _random.Random(2)\nfor _ in range(40):\n    _x = [_rng.randint(-6, 6) for _ in range(_rng.randint(0, 12))]\n    _exp = sorted(set(tuple(sorted(c)) for c in _comb(_x, 3) if sum(c) == 0))\n    _exp = [list(c) for c in _exp]\n    assert three_sum(_x) == _exp, f'{_x} үшін күтілгені {_exp}'\n"
   }
  }
 ],
 "dsa-3": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Сөздерді кері ретпен",
   "prompt": "<p><code>reverse_words(s)</code> сөйлемдегі сөздерді кері ретпен қайтарсын. Сөздер арасында бірнеше бос орын, басында және соңында бос орын болуы мүмкін: нәтижеде сөздер бір бос орынмен бөлінсін.</p>\n<pre><code>reverse_words('Алматы әдемі қала')   → 'қала әдемі Алматы'\nreverse_words('  сәлем   әлем ')     → 'әлем сәлем'\nreverse_words('   ')                 → ''</code></pre>",
   "starter": "def reverse_words(s):\n    pass\n",
   "solution": "def reverse_words(s):\n    return ' '.join(reversed(s.split()))\n",
   "hints": [
    "<code>s.split()</code> (аргументсіз) кез келген бос орындар бойынша бөледі және бос бөліктерді тастайды.",
    "<code>' '.join(...)</code> арқылы біріктіріңіз."
   ],
   "check": {
    "tests": "\nassert reverse_words('Алматы әдемі қала') == 'қала әдемі Алматы', \"Күтілгені 'қала әдемі Алматы'\"\nassert reverse_words('  сәлем   әлем ') == 'әлем сәлем', \"Артық бос орындарды алып тастаңыз: 'әлем сәлем'\"\nassert reverse_words('   ') == '', \"Тек бос орын: ''\"\nassert reverse_words('') == '', \"Бос жол: ''\"\nassert reverse_words('жалғыз') == 'жалғыз', 'Бір сөз өзгермейді'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ең ұзын сөз",
   "prompt": "<p><code>longest_word(s)</code> сөйлемдегі ең ұзын сөзді қайтарсын (сөздер бос орынмен бөлінген). Ұзындығы бірдей бірнеше сөз болса — <b>біріншісін</b>. Сөз жоқ болса <code>''</code>.</p>\n<pre><code>longest_word('Тараз ежелгі қала')  → 'ежелгі'\nlongest_word('ит мен мысық бар')   → 'мысық'\nlongest_word('')                   → ''</code></pre>",
   "starter": "def longest_word(s):\n    pass\n",
   "solution": "def longest_word(s):\n    best = ''\n    for w in s.split():\n        if len(w) > len(best):\n            best = w\n    return best\n",
   "hints": [
    "Тек <b>қатаң</b> ұзынырақ сөз кездескенде ауыстырыңыз (<code>&gt;</code>, <code>&gt;=</code> емес)."
   ],
   "check": {
    "tests": "\nassert longest_word('Тараз ежелгі қала') == 'ежелгі', \"Күтілгені 'ежелгі'\"\nassert longest_word('ит мен мысық бар') == 'мысық', \"Күтілгені 'мысық'\"\nassert longest_word('') == '', \"Бос жол: ''\"\nassert longest_word('ақ ой') == 'ақ', \"Ұзындығы тең болса, біріншісі: 'ақ'\"\nassert longest_word('  қар  ') == 'қар', \"Бос орындарды есепке алмаңыз: 'қар'\"\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бас әріптерден қысқарту",
   "prompt": "<p><code>acronym(s)</code> әр сөздің бірінші әрпін бас әріпке айналдырып біріктірсін (сөздер бос орынмен бөлінген, артық бос орындар болуы мүмкін).</p>\n<pre><code>acronym('қазақ ұлттық университеті') → 'ҚҰУ'\nacronym('Ұлттық банк')               → 'ҰБ'\nacronym('')                          → ''</code></pre>",
   "starter": "def acronym(s):\n    pass\n",
   "solution": "def acronym(s):\n    return ''.join(w[0].upper() for w in s.split())\n",
   "hints": [
    "<code>w[0].upper()</code> — бірінші әріп бас әріппен.",
    "<code>''.join(...)</code> арқылы жинаңыз."
   ],
   "check": {
    "tests": "\nassert acronym('қазақ ұлттық университеті') == 'ҚҰУ', \"Күтілгені 'ҚҰУ'\"\nassert acronym('Ұлттық банк') == 'ҰБ', \"Күтілгені 'ҰБ'\"\nassert acronym('') == '', \"Бос жол: ''\"\nassert acronym('  еуразия   ұлттық  университеті ') == 'ЕҰУ', \"Артық бос орындар: 'ЕҰУ'\"\nassert acronym('әл-фараби') == 'Ә', \"Бір сөз: 'Ә'\"\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "RLE кодын ашу",
   "prompt": "<p>Сабақта жолды «таңба + саны» түрінде кодтадыңыз. Енді керісінше: <code>rle_decode(code)</code> кодталған жолды қалпына келтірсін. Сан бірнеше цифрдан тұруы мүмкін (<code>'a12'</code>). Тек әріптер кодталады.</p>\n<pre><code>rle_decode('a3b2c1') → 'aaabbc'\nrle_decode('x12')    → 'xxxxxxxxxxxx'\nrle_decode('')       → ''</code></pre>",
   "starter": "def rle_decode(code):\n    pass\n",
   "solution": "def rle_decode(code):\n    parts = []\n    i = 0\n    while i < len(code):\n        ch = code[i]\n        i += 1\n        j = i\n        while j < len(code) and code[j].isdigit():\n            j += 1\n        parts.append(ch * int(code[i:j]))\n        i = j\n    return ''.join(parts)\n",
   "hints": [
    "Таңбаны алғаннан кейін цифр біткенше оқыңыз: <code>code[j].isdigit()</code>.",
    "Бөліктерді тізімге жинап, соңында <code>''.join</code> — жолды циклде <code>+=</code> қылу баяу."
   ],
   "check": {
    "tests": "\nassert rle_decode('a3b2c1') == 'aaabbc', \"rle_decode('a3b2c1') 'aaabbc' болуы керек\"\nassert rle_decode('x12') == 'x' * 12, 'Көп цифрлы сан: x12 → 12 рет x'\nassert rle_decode('') == '', \"Бос жол: ''\"\nassert rle_decode('z1') == 'z', \"rle_decode('z1') 'z'\"\nassert rle_decode('a2a3') == 'aaaaa', 'Бір таңба қайта кездесуі мүмкін'\nassert rle_decode('q100w1') == 'q' * 100 + 'w', '100 рет q, сосын w'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ортақ префикс",
   "prompt": "<p><code>common_prefix(words)</code> барлық сөздерге ортақ ең ұзын префиксті қайтарсын. Тізім бос болса немесе ортақ префикс жоқ болса <code>''</code>.</p>\n<pre><code>common_prefix(['қалалар', 'қалам', 'қала']) → 'қала'\ncommon_prefix(['ит', 'құс'])               → ''\ncommon_prefix(['жол'])                     → 'жол'</code></pre>",
   "starter": "def common_prefix(words):\n    pass\n",
   "solution": "def common_prefix(words):\n    if not words:\n        return ''\n    first = words[0]\n    for i in range(len(first)):\n        for w in words[1:]:\n            if i >= len(w) or w[i] != first[i]:\n                return first[:i]\n    return first\n",
   "hints": [
    "Бірінші сөздің әр позициясын қалған сөздердің сол позициясымен салыстырыңыз.",
    "Сөз қысқа болса (<code>i &gt;= len(w)</code>) немесе таңба өзгеше болса, тоқтаңыз."
   ],
   "check": {
    "tests": "\nassert common_prefix(['қалалар', 'қалам', 'қала']) == 'қала', \"Күтілгені 'қала'\"\nassert common_prefix(['ит', 'құс']) == '', \"Ортақ префикс жоқ: ''\"\nassert common_prefix(['жол']) == 'жол', 'Бір сөз: өзі'\nassert common_prefix([]) == '', \"Бос тізім: ''\"\nassert common_prefix(['', 'а']) == '', \"Бос сөз бар болса: ''\"\nassert common_prefix(['аб', 'абв', 'абвг']) == 'аб', 'Ең қысқа сөз шектейді: аб'\nassert common_prefix(['тау', 'тау']) == 'тау', 'Бірдей сөздер: тау'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Изоморфты жолдар",
   "prompt": "<p><code>is_isomorphic(a, b)</code>: <code>a</code>-ның әр таңбасын бір таңбаға ауыстырып <code>b</code> алуға болса <code>True</code>. Ауыстыру бірмәнді болуы керек: бір таңба екі түрліге ауыспайды және екі түрлі таңба бір таңбаға ауыспайды. Ұзындықтары әртүрлі болса <code>False</code>.</p>\n<pre><code>is_isomorphic('егер', 'алма')  → False   # е→а, г→л, е→м? жоқ\nis_isomorphic('қала', 'тата')  → False   # қ→т, а→а, л→т: екі таңба т-ға\nis_isomorphic('аппақ', 'ессек') → True</code></pre>",
   "starter": "def is_isomorphic(a, b):\n    pass\n",
   "solution": "def is_isomorphic(a, b):\n    if len(a) != len(b):\n        return False\n    fwd, back = {}, {}\n    for x, y in zip(a, b):\n        if fwd.get(x, y) != y or back.get(y, x) != x:\n            return False\n        fwd[x] = y\n        back[y] = x\n    return True\n",
   "hints": [
    "Екі сөздік ұстаңыз: <code>a → b</code> және <code>b → a</code>.",
    "Әр жұпта екі бағыттағы бұрынғы сәйкестікпен қайшылық бар ма, тексеріңіз."
   ],
   "check": {
    "tests": "\nassert is_isomorphic('егер', 'алма') is False, \"is_isomorphic('егер', 'алма') False\"\nassert is_isomorphic('қала', 'тата') is False, \"Екі түрлі таңба бір таңбаға ауыспайды: False\"\nassert is_isomorphic('аппақ', 'ессек') is True, \"is_isomorphic('аппақ', 'ессек') True\"\nassert is_isomorphic('', '') is True, 'Екі бос жол: True'\nassert is_isomorphic('ab', 'a') is False, 'Ұзындықтары әртүрлі: False'\nassert is_isomorphic('paper', 'title') is True, \"is_isomorphic('paper', 'title') True\"\nassert is_isomorphic('ab', 'aa') is False, \"is_isomorphic('ab', 'aa') False\"\nassert is_isomorphic('aa', 'ab') is False, \"is_isomorphic('aa', 'ab') False\"\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ең ұзын палиндром бөлік",
   "prompt": "<p><code>longest_palindrome(s)</code> жолдың ең ұзын палиндром ішкі жолын (қатар тұрған таңбалар) қайтарсын. Бірнеше болса — ең <b>сол жақтағысын</b>. Әр центрден (таңба немесе екі таңба арасы) екі жаққа кеңейтіңіз: O(n²) уақыт, O(1) жад. Бос жол үшін <code>''</code>.</p>\n<pre><code>longest_palindrome('қазақпыз') → 'қазақ'\nlongest_palindrome('abba')     → 'abba'\nlongest_palindrome('abc')      → 'a'</code></pre>",
   "starter": "def longest_palindrome(s):\n    pass\n",
   "solution": "def longest_palindrome(s):\n    best_l, best_r = 0, 0\n    n = len(s)\n    for c in range(2 * n - 1):\n        l, r = c // 2, c // 2 + c % 2\n        while l >= 0 and r < n and s[l] == s[r]:\n            l -= 1\n            r += 1\n        if r - l - 1 > best_r - best_l:\n            best_l, best_r = l + 1, r\n    return s[best_l:best_r]\n",
   "hints": [
    "Тақ ұзындықты палиндромның центрі — бір таңба, жұп ұзындықтының центрі — екі таңба арасы: барлығы <code>2n − 1</code> центр.",
    "Кеңейту <code>s[l] == s[r]</code> болғанша; ұзындық <code>r − l − 1</code>. Тек қатаң ұзынырақ болса жаңартыңыз — сонда сол жақтағысы қалады."
   ],
   "check": {
    "tests": "\nassert longest_palindrome('қазақпыз') == 'қазақ', \"Күтілгені 'қазақ'\"\nassert longest_palindrome('abba') == 'abba', \"Жұп ұзындықты палиндром: 'abba'\"\nassert longest_palindrome('abc') == 'a', \"Барлық таңба әртүрлі: ең сол жақтағы 'a'\"\nassert longest_palindrome('') == '', \"Бос жол: ''\"\nassert longest_palindrome('z') == 'z', \"Бір таңба: 'z'\"\nassert longest_palindrome('abacdfgdcaba') == 'aba', \"Күтілгені 'aba' (сол жақтағысы)\"\nassert longest_palindrome('cbbd') == 'bb', \"Күтілгені 'bb'\"\nimport random as _random\n_rng = _random.Random(4)\ndef _ref(s):\n    best = ''\n    for i in range(len(s)):\n        for j in range(i + 1, len(s) + 1):\n            if s[i:j] == s[i:j][::-1] and j - i > len(best):\n                best = s[i:j]\n    return best\nfor _ in range(40):\n    _s = ''.join(_rng.choice('аб') for _ in range(_rng.randint(1, 14)))\n    assert longest_palindrome(_s) == _ref(_s), f'{_s!r} үшін күтілгені {_ref(_s)!r}'\n_s = 'а' * 1500\nassert longest_palindrome(_s) == _s, '1500 бірдей таңба: бүкіл жол'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Жолмен қосу",
   "prompt": "<p>Банк жүйесі өте үлкен сомаларды жол ретінде сақтайды. <code>add_strings(a, b)</code> екі теріс емес бүтін санның (цифрлар жолы) қосындысын жол ретінде қайтарсын. <code>int()</code> немесе <code>str()</code>-ді бүкіл санға қолданбаңыз: цифрларды соңынан бастап екі көрсеткішпен, «ақшаны көшіріп» (carry) қосыңыз. Жалғыз цифрды <code>ord(ch) - ord('0')</code> арқылы аударуға болады.</p>\n<pre><code>add_strings('456', '77') → '533'\nadd_strings('999', '1')  → '1000'\nadd_strings('0', '0')    → '0'</code></pre>",
   "starter": "def add_strings(a, b):\n    pass\n",
   "solution": "def add_strings(a, b):\n    i, j = len(a) - 1, len(b) - 1\n    carry = 0\n    out = []\n    while i >= 0 or j >= 0 or carry:\n        s = carry\n        if i >= 0:\n            s += ord(a[i]) - 48\n            i -= 1\n        if j >= 0:\n            s += ord(b[j]) - 48\n            j -= 1\n        out.append(chr(48 + s % 10))\n        carry = s // 10\n    return ''.join(reversed(out))\n",
   "hints": [
    "<code>i</code>, <code>j</code> көрсеткіштері соңынан басталады; цикл <code>i &gt;= 0 or j &gt;= 0 or carry</code> болғанша.",
    "Цифрды <code>s % 10</code>, тасымалды <code>s // 10</code>; нәтижені кері ретпен жинаңыз."
   ],
   "check": {
    "tests": "\nassert add_strings('456', '77') == '533', \"add_strings('456', '77') '533' болуы керек\"\nassert add_strings('999', '1') == '1000', \"Соңғы тасымал: '1000'\"\nassert add_strings('0', '0') == '0', \"add_strings('0', '0') '0'\"\nassert add_strings('1', '999') == '1000', 'Ұзындықтары әртүрлі: 1000'\nassert add_strings('12345678901234567890', '98765432109876543210') == '111111111011111111100', 'Үлкен сандар қате қосылды'\nimport random as _random\n_rng = _random.Random(9)\nfor _ in range(30):\n    _x, _y = _rng.randint(0, 10**30), _rng.randint(0, 10**5)\n    assert add_strings(str(_x), str(_y)) == str(_x + _y), f'{_x} + {_y} қате'\n"
   }
  }
 ],
 "dsa-4": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ең жиі сөз",
   "prompt": "<p>Сауалнамада тұрғындар сүйікті қаласын жазды. <code>most_common(words)</code> ең жиі кездескен сөзді қайтарсын; жиілігі тең болса — жолдарды <code>&lt;</code> арқылы салыстырғанда ең кішісін. Бос тізім үшін <code>None</code>. Сөздікпен санаңыз.</p>\n<pre><code>most_common(['Астана', 'Алматы', 'Астана']) → 'Астана'\nmost_common(['Тараз', 'Ақтау'])            → 'Ақтау'</code></pre>",
   "starter": "def most_common(words):\n    pass\n",
   "solution": "def most_common(words):\n    cnt = {}\n    for w in words:\n        cnt[w] = cnt.get(w, 0) + 1\n    best = None\n    for w, c in cnt.items():\n        if best is None or c > cnt[best] or (c == cnt[best] and w < best):\n            best = w\n    return best\n",
   "hints": [
    "<code>cnt[w] = cnt.get(w, 0) + 1</code>.",
    "Ең жақсыны таңдағанда екі шарт: жиілігі үлкен, немесе тең және сөз кішірек."
   ],
   "check": {
    "tests": "\nassert most_common(['Астана', 'Алматы', 'Астана']) == 'Астана', \"Күтілгені 'Астана'\"\nassert most_common(['Тараз', 'Ақтау']) == 'Ақтау', \"Тең жиілікте алфавит бойынша кішісі: 'Ақтау'\"\nassert most_common([]) is None, 'Бос тізім: None'\nassert most_common(['Орал']) == 'Орал', \"Бір сөз: 'Орал'\"\nassert most_common(['б', 'а', 'б', 'а', 'в']) == 'а', \"Тең жиілік (2 және 2): 'а'\"\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Таңбалар жиілігі",
   "prompt": "<p><code>char_freq(s)</code> жолдағы әр таңбаның неше рет кездесетінін сөздік ретінде қайтарсын. Бос орындар есептелмейді. Үлкен және кіші әріптер бірдей саналсын (<code>lower()</code>).</p>\n<pre><code>char_freq('Ата ана') → {'а': 4, 'т': 1, 'н': 1}\nchar_freq('')        → {}</code></pre>",
   "starter": "def char_freq(s):\n    pass\n",
   "solution": "def char_freq(s):\n    freq = {}\n    for ch in s.lower():\n        if ch == ' ':\n            continue\n        freq[ch] = freq.get(ch, 0) + 1\n    return freq\n",
   "hints": [
    "Алдымен <code>s.lower()</code>, сосын әр таңбаны санаңыз.",
    "<code>ch == ' '</code> болса өткізіп жіберіңіз."
   ],
   "check": {
    "tests": "\nassert char_freq('Ата ана') == {'а': 4, 'т': 1, 'н': 1}, \"Күтілгені {'а': 4, 'т': 1, 'н': 1}\"\nassert char_freq('') == {}, 'Бос жол: {}'\nassert char_freq('   ') == {}, 'Тек бос орын: {}'\nassert char_freq('ААа') == {'а': 3}, \"Үлкен әріп те кіші әріппен бірге саналады: {'а': 3}\"\nassert char_freq('a1a!') == {'a': 2, '1': 1, '!': 1}, 'Цифрлар мен белгілер де саналады'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жетпеген тауарлар",
   "prompt": "<p>Дүкен тапсырыс берген тауарлар <code>ordered</code> және келгені <code>delivered</code> (екеуінде де қайталану болады). <code>missing(ordered, delivered)</code> жетпеген тауарларды, жетпеген санымен қайталап, <code>sorted</code> ретімен сұрыпталған тізім ретінде қайтарсын.</p>\n<pre><code>missing(['нан', 'сүт', 'нан', 'май'], ['нан', 'сүт'])\n→ ['май', 'нан']</code></pre>",
   "starter": "def missing(ordered, delivered):\n    pass\n",
   "solution": "def missing(ordered, delivered):\n    need = {}\n    for x in ordered:\n        need[x] = need.get(x, 0) + 1\n    for x in delivered:\n        if x in need:\n            need[x] -= 1\n    res = []\n    for x, c in need.items():\n        res.extend([x] * max(c, 0))\n    return sorted(res)\n",
   "hints": [
    "Тапсырысты сөздікпен санап, келген әр тауар үшін 1 азайтыңыз.",
    "Артық келген тауар санды теріс етпесін: <code>max(c, 0)</code>."
   ],
   "check": {
    "tests": "\nassert missing(['нан', 'сүт', 'нан', 'май'], ['нан', 'сүт']) == ['май', 'нан'], \"Күтілгені ['май', 'нан']\"\nassert missing([], ['нан']) == [], 'Тапсырыс жоқ: []'\nassert missing(['шай'], []) == ['шай'], \"Ештеңе келмесе: ['шай']\"\nassert missing(['шай'], ['шай', 'шай', 'кофе']) == [], 'Артық келгені жетпегенді теріс етпейді: []'\nassert missing(['а', 'а', 'а'], ['а']) == ['а', 'а'], \"Екі дана жетпеді: ['а', 'а']\"\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бірдей жұптар саны",
   "prompt": "<p><code>equal_pairs(xs)</code>: <code>i &lt; j</code> және <code>xs[i] == xs[j]</code> болатын жұптар санын қайтарсын. O(n): мән <code>c</code> рет кездессе, ол <code>c·(c−1)/2</code> жұп береді (немесе жүріп келе жатып «бұрын неше рет көрдім» қосыңыз). Тест 100 000 элементпен.</p>\n<pre><code>equal_pairs([1, 2, 3, 1, 1, 3]) → 4\nequal_pairs([5, 6])             → 0</code></pre>",
   "starter": "def equal_pairs(xs):\n    pass\n",
   "solution": "def equal_pairs(xs):\n    seen = {}\n    total = 0\n    for x in xs:\n        c = seen.get(x, 0)\n        total += c\n        seen[x] = c + 1\n    return total\n",
   "hints": [
    "Жаңа элемент бұрын көрген әрбір тең элементпен бір жұп құрайды.",
    "<code>total += seen.get(x, 0)</code>, содан кейін санауышты арттырыңыз."
   ],
   "check": {
    "tests": "\nassert equal_pairs([1, 2, 3, 1, 1, 3]) == 4, 'equal_pairs([1, 2, 3, 1, 1, 3]) 4 қайтаруы керек'\nassert equal_pairs([5, 6]) == 0, 'Тең элемент жоқ: 0'\nassert equal_pairs([]) == 0, 'Бос тізім: 0'\nassert equal_pairs([7, 7, 7, 7]) == 6, 'Төрт бірдей элемент: 6 жұп'\nimport time as _time\n_big = [i % 10 for i in range(100000)]\n_t0 = _time.perf_counter(); _r = equal_pairs(_big); _dt = _time.perf_counter() - _t0\nassert _r == 10 * (10000 * 9999 // 2), f'Үлкен тест: күтілгені {10 * (10000 * 9999 // 2)}, сізде {_r}'\nassert _dt < 1.0, f'{_dt:.2f} с кетті: O(n) шешім керек'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ұзындық бойынша топтау",
   "prompt": "<p><code>group_by_len(words)</code> сөздерді ұзындығы бойынша топтасын: кілт — ұзындық, мән — сол ұзындықтағы сөздер <b>кездесу ретімен</b> (қайталанса, қайталап). Сөздік қайтарыңыз.</p>\n<pre><code>group_by_len(['ат', 'түйе', 'ит', 'қой', 'ат'])\n→ {2: ['ат', 'ит', 'ат'], 4: ['түйе'], 3: ['қой']}</code></pre>",
   "starter": "def group_by_len(words):\n    pass\n",
   "solution": "def group_by_len(words):\n    groups = {}\n    for w in words:\n        groups.setdefault(len(w), []).append(w)\n    return groups\n",
   "hints": [
    "<code>groups.setdefault(len(w), []).append(w)</code> — бір жолда."
   ],
   "check": {
    "tests": "\nassert group_by_len(['ат', 'түйе', 'ит', 'қой', 'ат']) == {2: ['ат', 'ит', 'ат'], 4: ['түйе'], 3: ['қой']}, 'Топтар қате'\nassert group_by_len([]) == {}, 'Бос тізім: {}'\nassert group_by_len(['']) == {0: ['']}, \"Бос сөздің ұзындығы 0: {0: ['']}\"\nassert group_by_len(['бір', 'екі', 'үш']) == {3: ['бір', 'екі'], 2: ['үш']}, 'Рет сақталуы керек'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Хабарландыруды құрастыру",
   "prompt": "<p>Газет қиындыларынан хабарландыру құрастырамыз. <code>can_build(note, magazine)</code>: <code>note</code>-тағы әр таңбаны (бос орыннан басқа) <code>magazine</code>-тағы таңбалардан алып шығуға болса <code>True</code>. Әр таңбаны бір рет қана қолдануға болады. Сөздікпен санап, O(n + m).</p>\n<pre><code>can_build('ақ', 'қара')    → True\ncan_build('аа', 'ақ')      → False\ncan_build('', 'кез келген') → True</code></pre>",
   "starter": "def can_build(note, magazine):\n    pass\n",
   "solution": "def can_build(note, magazine):\n    have = {}\n    for ch in magazine:\n        have[ch] = have.get(ch, 0) + 1\n    for ch in note:\n        if ch == ' ':\n            continue\n        if have.get(ch, 0) == 0:\n            return False\n        have[ch] -= 1\n    return True\n",
   "hints": [
    "<code>magazine</code> таңбаларын санаңыз.",
    "Хабарландырудың әр таңбасы үшін санауышты азайтыңыз; 0 болса — <code>False</code>."
   ],
   "check": {
    "tests": "\nassert can_build('ақ', 'қара') is True, \"can_build('ақ', 'қара') True\"\nassert can_build('аа', 'ақ') is False, \"Екі 'а' керек, біреу ғана бар: False\"\nassert can_build('', 'кез келген') is True, 'Бос хабарландыру: True'\nassert can_build('а а', 'аа') is True, 'Бос орындар есептелмейді: True'\nassert can_build('б', '') is False, 'Газет бос: False'\nassert can_build('Ақ', 'ақ') is False, 'Үлкен және кіші әріп әртүрлі таңба'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ең ұзын тізбекті сандар",
   "prompt": "<p>Пойыз вагондарының нөмірлері ретсіз берілген. <code>longest_run(nums)</code> қатарынан келетін (<code>x, x+1, x+2, ...</code>) ең ұзын нөмірлер тізбегінің ұзындығын қайтарсын. Сұрыптамай, <code>set</code> арқылы O(n): тек тізбектің <b>басынан</b> (<code>x − 1</code> жоқ болса) санай бастаңыз. Тест 100 000 элементпен.</p>\n<pre><code>longest_run([100, 4, 200, 1, 3, 2]) → 4    # 1, 2, 3, 4\nlongest_run([])                      → 0\nlongest_run([7, 7, 7])               → 1</code></pre>",
   "starter": "def longest_run(nums):\n    pass\n",
   "solution": "def longest_run(nums):\n    s = set(nums)\n    best = 0\n    for x in s:\n        if x - 1 not in s:\n            y = x\n            while y + 1 in s:\n                y += 1\n            best = max(best, y - x + 1)\n    return best\n",
   "hints": [
    "Барлық мәнді <code>set</code>-ке салыңыз.",
    "<code>x − 1</code> жиында жоқ болса ғана <code>x</code>-тен оңға қарай санаңыз: әр элемент бір рет қана аралады."
   ],
   "check": {
    "tests": "\nassert longest_run([100, 4, 200, 1, 3, 2]) == 4, 'Күтілгені 4 (1, 2, 3, 4)'\nassert longest_run([]) == 0, 'Бос тізім: 0'\nassert longest_run([7, 7, 7]) == 1, 'Қайталанулар тізбекті ұзартпайды: 1'\nassert longest_run([-1, 0, 1]) == 3, 'Теріс сандар: 3'\nassert longest_run([10, 5]) == 1, 'Көрші сан жоқ: 1'\nimport random as _random, time as _time\n_rng = _random.Random(1)\nfor _ in range(30):\n    _a = [_rng.randint(0, 25) for _ in range(_rng.randint(0, 20))]\n    _s = sorted(set(_a)); _best = 0; _cur = 0\n    for _i, _v in enumerate(_s):\n        _cur = _cur + 1 if _i and _s[_i - 1] == _v - 1 else 1\n        _best = max(_best, _cur)\n    assert longest_run(_a) == _best, f'{_a} үшін күтілгені {_best}'\n_big = list(range(100000)); _rng.shuffle(_big)\n_t0 = _time.perf_counter(); _r = longest_run(_big); _dt = _time.perf_counter() - _t0\nassert _r == 100000 and _dt < 1.5, f'0..99999 араласқан: 100000 болуы керек ({_dt:.2f} с)'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Төрт тізімнен нөл",
   "prompt": "<p>Төрт филиалдың күндік пайда/шығын тізімдері <code>a, b, c, d</code> (ұзындығы бірдей, <code>n ≤ 300</code>). <code>four_sum_count(a, b, c, d)</code> әр тізімнен бір элемент алғанда қосындысы 0 болатын төрттіктер <code>(i, j, k, l)</code> санын қайтарсын. O(n⁴) өтпейді: <code>a[i] + b[j]</code> қосындыларын сөздікке санап, <code>c[k] + d[l]</code> үшін <code>−(c[k] + d[l])</code>-ды іздеңіз — O(n²).</p>\n<pre><code>four_sum_count([1, 2], [-2, -1], [-1, 2], [0, 2]) → 2</code></pre>",
   "starter": "def four_sum_count(a, b, c, d):\n    pass\n",
   "solution": "def four_sum_count(a, b, c, d):\n    ab = {}\n    for x in a:\n        for y in b:\n            ab[x + y] = ab.get(x + y, 0) + 1\n    total = 0\n    for x in c:\n        for y in d:\n            total += ab.get(-(x + y), 0)\n    return total\n",
   "hints": [
    "Есепті екі жартыға бөліңіз: <code>a + b</code> және <code>c + d</code>.",
    "Бірінші жартының қосындыларын <code>{қосынды: саны}</code> сөздігіне санаңыз."
   ],
   "check": {
    "tests": "\nassert four_sum_count([1, 2], [-2, -1], [-1, 2], [0, 2]) == 2, 'Күтілгені 2'\nassert four_sum_count([0], [0], [0], [0]) == 1, 'Барлығы 0: 1'\nassert four_sum_count([], [], [], []) == 0, 'Бос тізімдер: 0'\nassert four_sum_count([1], [1], [1], [1]) == 0, 'Қосындысы 4: 0'\nimport random as _random, time as _time\n_rng = _random.Random(8)\n_s = [[_rng.randint(-3, 3) for _ in range(6)] for _ in range(4)]\n_exp = sum(1 for x in _s[0] for y in _s[1] for z in _s[2] for w in _s[3] if x + y + z + w == 0)\nassert four_sum_count(*_s) == _exp, f'Кездейсоқ тест: күтілгені {_exp}'\n_big = [[_rng.randint(-1000, 1000) for _ in range(300)] for _ in range(4)]\n_t0 = _time.perf_counter(); four_sum_count(*_big); _dt = _time.perf_counter() - _t0\nassert _dt < 2.0, f'n = 300 үшін {_dt:.2f} с кетті: O(n²) шешім керек'\n"
   }
  }
 ],
 "dsa-5": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Стекпен аудару",
   "prompt": "<p><code>reverse_stack(s)</code> жолды стек арқылы аударсын: барлық таңбаны тізімге <code>append</code> етіп, сосын <code>pop</code> арқылы алыңыз. Кесінді <code>[::-1]</code> мен <code>reversed</code> қолданбаңыз.</p>\n<pre><code>reverse_stack('Абай') → 'йабА'\nreverse_stack('')     → ''</code></pre>",
   "starter": "def reverse_stack(s):\n    stack = []\n    pass\n",
   "solution": "def reverse_stack(s):\n    stack = []\n    for ch in s:\n        stack.append(ch)\n    out = []\n    while stack:\n        out.append(stack.pop())\n    return ''.join(out)\n",
   "hints": [
    "Стектің соңғы кірген элементі бірінші шығады (LIFO)."
   ],
   "check": {
    "tests": "\nassert reverse_stack('Абай') == 'йабА', \"reverse_stack('Абай') 'йабА' болуы керек\"\nassert reverse_stack('') == '', \"Бос жол: ''\"\nassert reverse_stack('x') == 'x', 'Бір таңба өзгермейді'\nassert reverse_stack('ab cd') == 'dc ba', 'Бос орын да аударылады'\n",
    "mustInclude": [
     "pop"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Өшіру пернесі",
   "prompt": "<p>Пайдаланушы мәтін терді: <code>'#'</code> — алдыңғы таңбаны өшіретін перне (өшіретін таңба жоқ болса, ештеңе болмайды). <code>apply_backspace(s)</code> соңғы мәтінді қайтарсын. Стек қолданыңыз.</p>\n<pre><code>apply_backspace('ab#c')  → 'ac'\napply_backspace('a##b')  → 'b'\napply_backspace('###')   → ''</code></pre>",
   "starter": "def apply_backspace(s):\n    pass\n",
   "solution": "def apply_backspace(s):\n    st = []\n    for ch in s:\n        if ch == '#':\n            if st:\n                st.pop()\n        else:\n            st.append(ch)\n    return ''.join(st)\n",
   "hints": [
    "<code>'#'</code> келсе және стек бос болмаса — <code>pop()</code>, әйтпесе таңбаны <code>append</code>."
   ],
   "check": {
    "tests": "\nassert apply_backspace('ab#c') == 'ac', \"apply_backspace('ab#c') 'ac' болуы керек\"\nassert apply_backspace('a##b') == 'b', \"Бос стектен өшіру ештеңе істемейді: 'b'\"\nassert apply_backspace('###') == '', \"Тек өшіру: ''\"\nassert apply_backspace('') == '', \"Бос жол: ''\"\nassert apply_backspace('сәлем') == 'сәлем', 'Өшіру жоқ болса өзгеріссіз'\nassert apply_backspace('ab##cd#') == 'c', \"apply_backspace('ab##cd#') 'c'\"\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жақшалардың тереңдігі",
   "prompt": "<p>Тек <code>(</code> және <code>)</code> жақшаларынан тұратын дұрыс жол берілген (басқа таңбалар да болуы мүмкін, оларды елемеңіз). <code>max_depth(s)</code> жақшалардың ең үлкен ішкі деңгейін қайтарсын.</p>\n<pre><code>max_depth('(1+(2*3)+((8)/4))+1') → 3\nmax_depth('()()')                → 1\nmax_depth('abc')                 → 0</code></pre>",
   "starter": "def max_depth(s):\n    pass\n",
   "solution": "def max_depth(s):\n    depth = best = 0\n    for ch in s:\n        if ch == '(':\n            depth += 1\n            best = max(best, depth)\n        elif ch == ')':\n            depth -= 1\n    return best\n",
   "hints": [
    "Стектің өзі емес, оның өлшемі ғана керек: санауыш жеткілікті.",
    "<code>(</code> — тереңдік +1, <code>)</code> — −1; максимумды сақтаңыз."
   ],
   "check": {
    "tests": "\nassert max_depth('(1+(2*3)+((8)/4))+1') == 3, 'Күтілгені 3'\nassert max_depth('()()') == 1, \"max_depth('()()') 1\"\nassert max_depth('abc') == 0, 'Жақша жоқ: 0'\nassert max_depth('') == 0, 'Бос жол: 0'\nassert max_depth('((()))') == 3, \"max_depth('((()))') 3\"\nassert max_depth('(' * 500 + ')' * 500) == 500, '500 деңгей'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ыстық картоп",
   "prompt": "<p>Балалар шеңбер бойы тұрады (<code>names</code> ретімен). Санау бірінші баладан басталады, әр <code>k</code>-шы бала ойыннан шығады, санау келесі баладан жалғасады. <code>last_child(names, k)</code> соңғы қалған баланың атын қайтарсын. <code>collections.deque</code> және <code>rotate</code> немесе <code>popleft</code>/<code>append</code> қолданыңыз.</p>\n<pre><code>last_child(['Әли', 'Бота', 'Дана', 'Ерлан'], 2) → 'Әли'\n# Бота шығады → [Дана, Ерлан, Әли] → Ерлан шығады → [Әли, Дана] → Дана шығады\nlast_child(['Жан'], 5)                         → 'Жан'</code></pre>",
   "starter": "from collections import deque\n\ndef last_child(names, k):\n    pass\n",
   "solution": "from collections import deque\n\ndef last_child(names, k):\n    q = deque(names)\n    while len(q) > 1:\n        for _ in range(k - 1):\n            q.append(q.popleft())\n        q.popleft()\n    return q[0]\n",
   "hints": [
    "<code>k − 1</code> баланы алдынан алып, артына қойыңыз, <code>k</code>-шы баланы <code>popleft()</code> арқылы шығарыңыз.",
    "Кезекте бір бала қалғанша қайталаңыз."
   ],
   "check": {
    "tests": "\nassert last_child(['Әли', 'Бота', 'Дана', 'Ерлан'], 2) == 'Әли', \"Күтілгені 'Әли'\"\nassert last_child(['Жан'], 5) == 'Жан', 'Бір бала: сол бала'\nassert last_child(['а', 'б', 'в'], 1) == 'в', 'k = 1: ретімен шығады, соңғысы қалады'\ndef _ref(n, k):\n    r = 0\n    for m in range(2, n + 1):\n        r = (r + k) % m\n    return r\nfor _n in range(1, 12):\n    for _k in range(1, 6):\n        _names = [f'бала{i}' for i in range(_n)]\n        assert last_child(_names, _k) == _names[_ref(_n, _k)], f'n={_n}, k={_k} үшін күтілгені {_names[_ref(_n, _k)]}'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Файл жолын ықшамдау",
   "prompt": "<p>Unix файл жолы берілген. <code>simplify_path(path)</code> оны ықшамдасын: <code>'.'</code> — ағымдағы бума (өшіріледі), <code>'..'</code> — бір деңгей жоғары (түбірден жоғары шықпайды), бірнеше <code>'/'</code> бір <code>'/'</code> саналады. Нәтиже <code>'/'</code>-тан басталып, соңында <code>'/'</code> болмайды (түбірдің өзінен басқа). Стек қолданыңыз.</p>\n<pre><code>simplify_path('/home//user/./docs/../photos/') → '/home/user/photos'\nsimplify_path('/../')                          → '/'\nsimplify_path('/a/b/../../c')                  → '/c'</code></pre>",
   "starter": "def simplify_path(path):\n    pass\n",
   "solution": "def simplify_path(path):\n    st = []\n    for part in path.split('/'):\n        if part == '' or part == '.':\n            continue\n        if part == '..':\n            if st:\n                st.pop()\n        else:\n            st.append(part)\n    return '/' + '/'.join(st)\n",
   "hints": [
    "<code>path.split('/')</code> бос бөліктер де береді — оларды өткізіңіз.",
    "<code>'..'</code> — стектен <code>pop</code> (бос болмаса), басқа атау — <code>append</code>."
   ],
   "check": {
    "tests": "\nassert simplify_path('/home//user/./docs/../photos/') == '/home/user/photos', \"Күтілгені '/home/user/photos'\"\nassert simplify_path('/../') == '/', \"Түбірден жоғары шықпаймыз: '/'\"\nassert simplify_path('/a/b/../../c') == '/c', \"Күтілгені '/c'\"\nassert simplify_path('/') == '/', \"Түбір: '/'\"\nassert simplify_path('/...') == '/...', \"'...' — қарапайым бума атауы\"\nassert simplify_path('/a/./b/./') == '/a/b', \"Күтілгені '/a/b'\"\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Көрші жұптарды жою",
   "prompt": "<p><code>remove_pairs(s)</code>: жолда қатар тұрған екі бірдей таңбаны жоямыз; жойғаннан кейін жаңа жұп пайда болса, оны да жоямыз. Ешбір жұп қалмағанша. Соңғы жолды қайтарыңыз. Стекпен O(n).</p>\n<pre><code>remove_pairs('abbaca') → 'ca'     # bb жойылады → aaca → aa жойылады → ca\nremove_pairs('aabb')   → ''\nremove_pairs('abc')    → 'abc'</code></pre>",
   "starter": "def remove_pairs(s):\n    pass\n",
   "solution": "def remove_pairs(s):\n    st = []\n    for ch in s:\n        if st and st[-1] == ch:\n            st.pop()\n        else:\n            st.append(ch)\n    return ''.join(st)\n",
   "hints": [
    "Стектің төбесі жаңа таңбаға тең болса — <code>pop()</code>, әйтпесе <code>append</code>."
   ],
   "check": {
    "tests": "\nassert remove_pairs('abbaca') == 'ca', \"remove_pairs('abbaca') 'ca' болуы керек\"\nassert remove_pairs('aabb') == '', \"Барлығы жойылады: ''\"\nassert remove_pairs('abc') == 'abc', 'Жұп жоқ: өзгеріссіз'\nassert remove_pairs('') == '', \"Бос жол: ''\"\nassert remove_pairs('aaa') == 'a', \"Үш бірдей таңбадан біреуі қалады: 'a'\"\nassert remove_pairs('abccba') == '', 'Тізбекті жою: бос жол'\nimport time as _time\n_t0 = _time.perf_counter(); _r = remove_pairs('ab' * 50000 + 'ba' * 50000); _dt = _time.perf_counter() - _t0\nassert _r == '' and _dt < 1.0, f\"Үлкен тест: '' күтілді ({_dt:.2f} с), O(n) стек керек\"\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Минимумды білетін стек",
   "prompt": "<p><code>MinStack</code> класын жазыңыз: <code>push(x)</code>, <code>pop()</code> (жоғарғы элементті алып тастап, қайтарады), <code>top()</code>, <code>get_min()</code> — барлығы O(1). Стек бос болса, <code>pop</code>, <code>top</code>, <code>get_min</code> <code>None</code> қайтарсын. Кеңес: әр элементпен бірге «осы сәттегі минимумды» сақтаңыз.</p>\n<pre><code>s = MinStack()\ns.push(5); s.push(2); s.push(7)\ns.get_min() → 2\ns.pop()     → 7\ns.pop()     → 2\ns.get_min() → 5</code></pre>",
   "starter": "class MinStack:\n    def __init__(self):\n        pass\n\n    def push(self, x):\n        pass\n\n    def pop(self):\n        pass\n\n    def top(self):\n        pass\n\n    def get_min(self):\n        pass\n",
   "solution": "class MinStack:\n    def __init__(self):\n        self.st = []\n\n    def push(self, x):\n        m = x if not self.st else min(x, self.st[-1][1])\n        self.st.append((x, m))\n\n    def pop(self):\n        if not self.st:\n            return None\n        return self.st.pop()[0]\n\n    def top(self):\n        return self.st[-1][0] if self.st else None\n\n    def get_min(self):\n        return self.st[-1][1] if self.st else None\n",
   "hints": [
    "Стекке <code>(x, ағымдағы_минимум)</code> жұбын салыңыз.",
    "Жаңа минимум: <code>min(x, self.st[-1][1])</code>; pop кезінде алдыңғы минимум өзі қайтады."
   ],
   "check": {
    "tests": "\n_s = MinStack()\nassert _s.get_min() is None and _s.top() is None and _s.pop() is None, 'Бос стекте None қайтарыңыз'\n_s.push(5); _s.push(2); _s.push(7)\nassert _s.get_min() == 2, 'push 5, 2, 7 кейін минимум 2'\nassert _s.top() == 7, 'top() 7 болуы керек'\nassert _s.pop() == 7 and _s.pop() == 2, 'pop() 7, сосын 2 қайтаруы керек'\nassert _s.get_min() == 5, '2 алынған соң минимум 5'\n_s.push(5); _s.push(5)\nassert _s.pop() == 5 and _s.get_min() == 5, 'Қайталанған минимум: бір 5 алынса да минимум 5'\n_s2 = MinStack()\nfor _x in [3, -1, 4, -1, 5]:\n    _s2.push(_x)\n_exp = [-1, -1, -1, -1, 3]\nfor _e in _exp:\n    assert _s2.get_min() == _e, f'Кезекпен pop жасағанда минимумдар {_exp} болуы керек'\n    _s2.pop()\nassert _s2.get_min() is None, 'Барлығы алынған соң None'\nimport time as _time\n_s3 = MinStack(); _t0 = _time.perf_counter()\nfor _i in range(50000):\n    _s3.push(50000 - _i); _s3.get_min()\nfor _i in range(50000):\n    _s3.get_min(); _s3.pop()\nassert _time.perf_counter() - _t0 < 1.5, 'Амалдар O(1) болуы керек (min(...) бүкіл стекке жасалмасын)'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Кодталған жолды ашу",
   "prompt": "<p><code>decode(s)</code>: <code>k[мәтін]</code> жазбасы мәтінді <code>k</code> рет қайталауды білдіреді, жақшалар ішкі болуы мүмкін, <code>k</code> бірнеше цифрлы болуы мүмкін. Жолды ашып қайтарыңыз. Екі стек: сандар және «осы жақшаға дейін жиналған мәтін».</p>\n<pre><code>decode('3[a]2[bc]')   → 'aaabcbc'\ndecode('2[a2[c]]')    → 'accacc'\ndecode('қаз10[а]')    → 'қаз' + 'а' * 10</code></pre>",
   "starter": "def decode(s):\n    pass\n",
   "solution": "def decode(s):\n    nums, texts = [], []\n    cur, k = [], 0\n    for ch in s:\n        if ch.isdigit():\n            k = k * 10 + int(ch)\n        elif ch == '[':\n            nums.append(k)\n            texts.append(cur)\n            cur, k = [], 0\n        elif ch == ']':\n            rep = ''.join(cur) * nums.pop()\n            cur = texts.pop()\n            cur.append(rep)\n        else:\n            cur.append(ch)\n    return ''.join(cur)\n",
   "hints": [
    "Цифрларды <code>k = k * 10 + цифр</code> арқылы жинаңыз.",
    "<code>'['</code> — <code>k</code> мен ағымдағы мәтінді стекке салып, жаңадан бастаңыз; <code>']'</code> — ағымдағыны қайталап, алдыңғы мәтінге жалғаңыз."
   ],
   "check": {
    "tests": "\nassert decode('3[a]2[bc]') == 'aaabcbc', \"decode('3[a]2[bc]') 'aaabcbc' болуы керек\"\nassert decode('2[a2[c]]') == 'accacc', \"Ішкі жақшалар: 'accacc'\"\nassert decode('қаз10[а]') == 'қаз' + 'а' * 10, 'Көп цифрлы сан: 10'\nassert decode('') == '', \"Бос жол: ''\"\nassert decode('abc') == 'abc', 'Жақша жоқ: өзгеріссіз'\nassert decode('2[ab]cd3[e]') == 'ababcdeee', \"Күтілгені 'ababcdeee'\"\nassert decode('2[2[2[x]]]') == 'x' * 8, \"Үш деңгей: 8 рет 'x'\"\nassert decode('1[]a') == 'a', \"Бос жақша: 'a'\"\n"
   }
  }
 ],
 "dsa-6": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Тізімнің ұзындығы",
   "prompt": "<p><code>Node</code> класы берілген. <code>length(head)</code> байланысқан тізімдегі түйіндер санын қайтарсын. Бос тізім (<code>None</code>) — 0.</p>\n<pre><code>length(Node(1, Node(2, Node(3)))) → 3\nlength(None)                      → 0</code></pre>",
   "starter": "class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\ndef length(head):\n    pass\n",
   "solution": "class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\ndef length(head):\n    n = 0\n    while head:\n        n += 1\n        head = head.next\n    return n\n",
   "hints": [
    "<code>while head:</code> циклінде санауышты арттырып, <code>head = head.next</code>."
   ],
   "check": {
    "tests": "\ndef _mk(vals):\n    h = None\n    for v in reversed(vals):\n        h = Node(v, h)\n    return h\ndef _tl(h):\n    out = []\n    while h:\n        out.append(h.val); h = h.next\n        if len(out) > 10000: raise AssertionError('Тізімде цикл пайда болды')\n    return out\n\nassert length(_mk([1, 2, 3])) == 3, 'Үш түйінді тізім: 3'\nassert length(None) == 0, 'Бос тізім: 0'\nassert length(_mk([9])) == 1, 'Бір түйін: 1'\nassert length(_mk(list(range(5000)))) == 5000, '5000 түйін'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "k-шы түйіннің мәні",
   "prompt": "<p><code>value_at(head, k)</code> тізімдегі <code>k</code>-шы түйіннің (0-ден санағанда) мәнін қайтарсын. Мұндай түйін жоқ болса (<code>k</code> тым үлкен немесе теріс) — <code>None</code>.</p>\n<pre><code>value_at(1 → 5 → 9, 1) → 5\nvalue_at(1 → 5 → 9, 3) → None</code></pre>",
   "starter": "class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\ndef value_at(head, k):\n    pass\n",
   "solution": "class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\ndef value_at(head, k):\n    if k < 0:\n        return None\n    while head and k > 0:\n        head = head.next\n        k -= 1\n    return head.val if head else None\n",
   "hints": [
    "<code>k</code> рет <code>head = head.next</code> жасаңыз, жолда <code>None</code>-ға тап болсаңыз тоқтаңыз.",
    "Теріс <code>k</code>-ны бөлек тексеріңіз."
   ],
   "check": {
    "tests": "\ndef _mk(vals):\n    h = None\n    for v in reversed(vals):\n        h = Node(v, h)\n    return h\ndef _tl(h):\n    out = []\n    while h:\n        out.append(h.val); h = h.next\n        if len(out) > 10000: raise AssertionError('Тізімде цикл пайда болды')\n    return out\n\n_h = _mk([1, 5, 9])\nassert value_at(_h, 0) == 1, 'value_at(..., 0) бірінші мән 1'\nassert value_at(_h, 1) == 5, 'value_at(..., 1) 5 болуы керек'\nassert value_at(_h, 2) == 9, 'value_at(..., 2) 9 болуы керек'\nassert value_at(_h, 3) is None, 'Түйін жоқ: None'\nassert value_at(_h, -1) is None, 'Теріс k: None'\nassert value_at(None, 0) is None, 'Бос тізім: None'\nassert value_at(_mk([0]), 0) == 0, 'Мән 0 болуы мүмкін: None емес, 0 қайтарыңыз'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Тізімнің ортасы",
   "prompt": "<p><code>middle(head)</code> тізімнің ортаңғы түйінін (түйіннің өзін) қайтарсын. Түйін саны жұп болса — екі ортаның <b>екіншісін</b>. Екі жылдамдықты көрсеткіш: <code>slow</code> бір қадам, <code>fast</code> екі қадам; бір рет аралау. Бос тізім — <code>None</code>.</p>\n<pre><code>1 → 2 → 3 → 4 → 5   ⇒  3-түйін\n1 → 2 → 3 → 4       ⇒  3-түйін</code></pre>",
   "starter": "class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\ndef middle(head):\n    slow = fast = head\n    pass\n",
   "solution": "class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\ndef middle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n    return slow\n",
   "hints": [
    "<code>while fast and fast.next:</code> — fast соңына жеткенде slow ортада тұрады."
   ],
   "check": {
    "tests": "\ndef _mk(vals):\n    h = None\n    for v in reversed(vals):\n        h = Node(v, h)\n    return h\ndef _tl(h):\n    out = []\n    while h:\n        out.append(h.val); h = h.next\n        if len(out) > 10000: raise AssertionError('Тізімде цикл пайда болды')\n    return out\n\n_h = _mk([1, 2, 3, 4, 5]); _m = middle(_h)\nassert _m is _h.next.next, '5 түйінде ортасы — үшінші түйін (мәні 3)'\n_h = _mk([1, 2, 3, 4])\nassert middle(_h) is _h.next.next, 'Жұп санда екінші орта: мәні 3 түйін'\nassert middle(None) is None, 'Бос тізім: None'\n_h = _mk([7]); assert middle(_h) is _h, 'Бір түйін: өзі'\n_h = _mk([1, 2]); assert middle(_h) is _h.next, 'Екі түйін: екіншісі'\n",
    "mustInclude": [
     "fast"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Мәні бойынша өшіру",
   "prompt": "<p><code>remove_all(head, x)</code> мәні <code>x</code>-ке тең барлық түйіндерді тізімнен алып тастап, жаңа басты қайтарсын (бастың өзі де өшірілуі мүмкін). Кеңес: <code>dummy = Node(0, head)</code> жалған бас түйіні шеткі жағдайларды жеңілдетеді.</p>\n<pre><code>remove_all(1 → 2 → 6 → 3 → 6, 6) → 1 → 2 → 3\nremove_all(7 → 7 → 7, 7)         → None</code></pre>",
   "starter": "class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\ndef remove_all(head, x):\n    pass\n",
   "solution": "class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\ndef remove_all(head, x):\n    dummy = Node(0, head)\n    cur = dummy\n    while cur.next:\n        if cur.next.val == x:\n            cur.next = cur.next.next\n        else:\n            cur = cur.next\n    return dummy.next\n",
   "hints": [
    "<code>cur.next.val == x</code> болса, <code>cur.next = cur.next.next</code> (cur орнында қалады).",
    "Соңында <code>dummy.next</code> қайтарыңыз."
   ],
   "check": {
    "tests": "\ndef _mk(vals):\n    h = None\n    for v in reversed(vals):\n        h = Node(v, h)\n    return h\ndef _tl(h):\n    out = []\n    while h:\n        out.append(h.val); h = h.next\n        if len(out) > 10000: raise AssertionError('Тізімде цикл пайда болды')\n    return out\n\nassert _tl(remove_all(_mk([1, 2, 6, 3, 6]), 6)) == [1, 2, 3], 'Күтілгені [1, 2, 3]'\nassert remove_all(_mk([7, 7, 7]), 7) is None, 'Барлығы өшірілсе: None'\nassert remove_all(None, 1) is None, 'Бос тізім: None'\nassert _tl(remove_all(_mk([5, 1, 5]), 5)) == [1], 'Бас пен соңы өшіріледі: [1]'\nassert _tl(remove_all(_mk([1, 2]), 9)) == [1, 2], 'x жоқ: өзгеріссіз'\n_h = _mk([1, 2, 3]); _second = _h.next\nassert remove_all(_h, 1) is _second, 'Жаңа түйін жасамаңыз: бұрынғы екінші түйін жаңа бас'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Соңынан k-шы түйін",
   "prompt": "<p><code>kth_from_end(head, k)</code> тізімнің соңынан <code>k</code>-шы түйінін (<code>k = 1</code> — соңғы түйін) қайтарсын. Бір рет аралап: алдымен <code>fast</code>-ты <code>k</code> қадам алға жіберіп, сосын екеуін бірге жылжытыңыз. <code>k</code> ұзындықтан үлкен немесе <code>k &lt; 1</code> болса — <code>None</code>.</p>\n<pre><code>kth_from_end(1 → 2 → 3 → 4, 1) → 4-түйін\nkth_from_end(1 → 2 → 3 → 4, 4) → 1-түйін\nkth_from_end(1 → 2, 3)         → None</code></pre>",
   "starter": "class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\ndef kth_from_end(head, k):\n    pass\n",
   "solution": "class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\ndef kth_from_end(head, k):\n    if k < 1:\n        return None\n    fast = head\n    for _ in range(k):\n        if fast is None:\n            return None\n        fast = fast.next\n    slow = head\n    while fast:\n        slow = slow.next\n        fast = fast.next\n    return slow\n",
   "hints": [
    "<code>fast</code> <code>k</code> қадам алда болса, ол <code>None</code>-ға жеткенде <code>slow</code> дәл керекті түйінде.",
    "Алға жылжығанда <code>fast</code> мерзімінен бұрын <code>None</code> болса, <code>k</code> тым үлкен."
   ],
   "check": {
    "tests": "\ndef _mk(vals):\n    h = None\n    for v in reversed(vals):\n        h = Node(v, h)\n    return h\ndef _tl(h):\n    out = []\n    while h:\n        out.append(h.val); h = h.next\n        if len(out) > 10000: raise AssertionError('Тізімде цикл пайда болды')\n    return out\n\n_h = _mk([1, 2, 3, 4])\nassert kth_from_end(_h, 1) is _h.next.next.next, 'k = 1: соңғы түйін (4)'\nassert kth_from_end(_h, 4) is _h, 'k = 4: бірінші түйін'\nassert kth_from_end(_h, 2).val == 3, 'k = 2: мәні 3 түйін'\nassert kth_from_end(_mk([1, 2]), 3) is None, 'k ұзындықтан үлкен: None'\nassert kth_from_end(None, 1) is None, 'Бос тізім: None'\nassert kth_from_end(_h, 0) is None, 'k = 0: None'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Сұрыпталған тізімнен қайталау жою",
   "prompt": "<p>Тізім мәндері өсу ретімен сұрыпталған. <code>dedup(head)</code> әр мәннің тек біріншісін қалдырып, басты қайтарсын. Жаңа түйін жасамаңыз, O(n).</p>\n<pre><code>dedup(1 → 1 → 2 → 3 → 3 → 3) → 1 → 2 → 3</code></pre>",
   "starter": "class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\ndef dedup(head):\n    pass\n",
   "solution": "class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\ndef dedup(head):\n    cur = head\n    while cur and cur.next:\n        if cur.next.val == cur.val:\n            cur.next = cur.next.next\n        else:\n            cur = cur.next\n    return head\n",
   "hints": [
    "Тізім сұрыпталған: бірдей мәндер қатар тұрады.",
    "<code>cur.next.val == cur.val</code> болса, келесі түйінді аттап өтіңіз."
   ],
   "check": {
    "tests": "\ndef _mk(vals):\n    h = None\n    for v in reversed(vals):\n        h = Node(v, h)\n    return h\ndef _tl(h):\n    out = []\n    while h:\n        out.append(h.val); h = h.next\n        if len(out) > 10000: raise AssertionError('Тізімде цикл пайда болды')\n    return out\n\nassert _tl(dedup(_mk([1, 1, 2, 3, 3, 3]))) == [1, 2, 3], 'Күтілгені [1, 2, 3]'\nassert dedup(None) is None, 'Бос тізім: None'\nassert _tl(dedup(_mk([4, 4, 4]))) == [4], 'Барлығы бірдей: [4]'\nassert _tl(dedup(_mk([1, 2, 3]))) == [1, 2, 3], 'Қайталау жоқ: өзгеріссіз'\n_h = _mk([1, 1, 2]); _last = _h.next.next\ndedup(_h)\nassert _h.next is _last, 'Бұрынғы түйіндерді қолданыңыз, жаңасын жасамаңыз'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Палиндром тізім",
   "prompt": "<p><code>is_palindrome_list(head)</code>: тізім мәндері екі жақтан бірдей оқылса <code>True</code>. Қосымша жад O(1): мәндерді Python тізіміне көшірмеңіз. Ортасын тауып (slow/fast), екінші жартысын орнында аударып, екі жартыны салыстырыңыз.</p>\n<pre><code>1 → 2 → 2 → 1   ⇒ True\n1 → 2 → 3       ⇒ False</code></pre>",
   "starter": "class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\ndef is_palindrome_list(head):\n    pass\n",
   "solution": "class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\ndef is_palindrome_list(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n    prev = None\n    while slow:\n        nxt = slow.next\n        slow.next = prev\n        prev = slow\n        slow = nxt\n    a, b = head, prev\n    while b:\n        if a.val != b.val:\n            return False\n        a = a.next\n        b = b.next\n    return True\n",
   "hints": [
    "Ортаны табу: <code>while fast and fast.next</code>.",
    "Ортадан бастап аударыңыз (сабақтағы <code>reverse_list</code>), сосын бастан және аударылған жартының басынан қатар жүріңіз."
   ],
   "check": {
    "tests": "\ndef _mk(vals):\n    h = None\n    for v in reversed(vals):\n        h = Node(v, h)\n    return h\ndef _tl(h):\n    out = []\n    while h:\n        out.append(h.val); h = h.next\n        if len(out) > 10000: raise AssertionError('Тізімде цикл пайда болды')\n    return out\n\nassert is_palindrome_list(_mk([1, 2, 2, 1])) is True, '1 → 2 → 2 → 1: True'\nassert is_palindrome_list(_mk([1, 2, 3])) is False, '1 → 2 → 3: False'\nassert is_palindrome_list(None) is True, 'Бос тізім: True'\nassert is_palindrome_list(_mk([5])) is True, 'Бір түйін: True'\nassert is_palindrome_list(_mk([1, 2, 1])) is True, '1 → 2 → 1: True'\nassert is_palindrome_list(_mk([1, 2])) is False, '1 → 2: False'\nassert is_palindrome_list(_mk([1, 1, 2, 1])) is False, '1 → 1 → 2 → 1: False'\nimport random as _random\n_rng = _random.Random(6)\nfor _ in range(40):\n    _v = [_rng.randint(0, 2) for _ in range(_rng.randint(0, 9))]\n    assert is_palindrome_list(_mk(_v)) == (_v == _v[::-1]), f'{_v} үшін {_v == _v[::-1]} күтілді'\n",
    "mustInclude": [
     "next"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Екі санды тізіммен қосу",
   "prompt": "<p>Екі теріс емес сан тізім ретінде берілген: цифрлар <b>кері ретпен</b> (бірінші түйін — бірліктер). <code>add_lists(a, b)</code> қосындыны дәл сондай форматтағы жаңа тізім ретінде қайтарсын. Тізімдердің ұзындығы әртүрлі болуы мүмкін, соңында тасымал (carry) қалуы мүмкін. Санды <code>int</code>-ке жинамаңыз — цифрлап қосыңыз.</p>\n<pre><code>(2 → 4 → 3) + (5 → 6 → 4) = 7 → 0 → 8     # 342 + 465 = 807\n(9 → 9) + (1)             = 0 → 0 → 1     # 99 + 1 = 100</code></pre>",
   "starter": "class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\ndef add_lists(a, b):\n    pass\n",
   "solution": "class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\ndef add_lists(a, b):\n    dummy = Node(0)\n    tail = dummy\n    carry = 0\n    while a or b or carry:\n        s = carry\n        if a:\n            s += a.val\n            a = a.next\n        if b:\n            s += b.val\n            b = b.next\n        tail.next = Node(s % 10)\n        tail = tail.next\n        carry = s // 10\n    return dummy.next\n",
   "hints": [
    "<code>while a or b or carry:</code> — соңғы тасымалды ұмытпаңыз.",
    "<code>dummy</code> түйінінен бастап <code>tail.next = Node(s % 10)</code> арқылы жаңа тізім құрыңыз."
   ],
   "check": {
    "tests": "\ndef _mk(vals):\n    h = None\n    for v in reversed(vals):\n        h = Node(v, h)\n    return h\ndef _tl(h):\n    out = []\n    while h:\n        out.append(h.val); h = h.next\n        if len(out) > 10000: raise AssertionError('Тізімде цикл пайда болды')\n    return out\n\nassert _tl(add_lists(_mk([2, 4, 3]), _mk([5, 6, 4]))) == [7, 0, 8], '342 + 465 = 807: [7, 0, 8]'\nassert _tl(add_lists(_mk([9, 9]), _mk([1]))) == [0, 0, 1], '99 + 1 = 100: [0, 0, 1]'\nassert _tl(add_lists(_mk([0]), _mk([0]))) == [0], '0 + 0 = 0: [0]'\nassert _tl(add_lists(_mk([5]), _mk([5]))) == [0, 1], '5 + 5 = 10: [0, 1]'\nimport random as _random\n_rng = _random.Random(12)\ndef _digits(n):\n    return [int(c) for c in reversed(str(n))]\nfor _ in range(30):\n    _x, _y = _rng.randint(0, 10**20), _rng.randint(0, 10**8)\n    assert _tl(add_lists(_mk(_digits(_x)), _mk(_digits(_y)))) == _digits(_x + _y), f'{_x} + {_y} қате қосылды'\n"
   }
  }
 ],
 "dsa-7": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жылдам дәреже",
   "prompt": "<p><code>power(a, n)</code> — <code>a<sup>n</sup></code> (<code>n ≥ 0</code> бүтін) мәнін рекурсиямен есептесін, <code>**</code> және <code>pow</code> қолданбай. Жылдам әдіс: <code>a<sup>n</sup> = (a<sup>n/2</sup>)²</code>, тақ <code>n</code> үшін тағы бір <code>a</code>-ға көбейтіңіз — рекурсия тереңдігі O(log n).</p>\n<pre><code>power(2, 10) → 1024\npower(5, 0)  → 1\npower(3, 5)  → 243</code></pre>",
   "starter": "def power(a, n):\n    pass\n",
   "solution": "def power(a, n):\n    if n == 0:\n        return 1\n    half = power(a, n // 2)\n    if n % 2 == 0:\n        return half * half\n    return half * half * a\n",
   "hints": [
    "Базалық жағдай: <code>n == 0</code> → 1.",
    "<code>half = power(a, n // 2)</code> бір рет қана шақырылсын."
   ],
   "check": {
    "tests": "\nassert power(2, 10) == 1024, 'power(2, 10) 1024 болуы керек'\nassert power(5, 0) == 1, 'Нөлдік дәреже: 1'\nassert power(3, 5) == 243, 'power(3, 5) 243'\nassert power(0, 0) == 1, 'power(0, 0) 1 деп келісеміз'\nassert power(-2, 3) == -8, 'power(-2, 3) -8'\nassert power(1, 10**6) == 1, 'n = 10^6 үшін рекурсия тереңдігі log n болуы керек'\nassert power(2, 3000) == 2 ** 3000, 'power(2, 3000) қате'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ішкі тізімдер қосындысы",
   "prompt": "<p>Қоймадағы жәшіктер ішінде жәшіктер болады: тізім сандардан және басқа тізімдерден тұрады. <code>nested_sum(items)</code> барлық деңгейдегі сандардың қосындысын рекурсиямен қайтарсын. Элементтің тізім екенін <code>isinstance(x, list)</code> арқылы тексеріңіз.</p>\n<pre><code>nested_sum([1, [2, [3, 4]], 5]) → 15\nnested_sum([[], [[]]])          → 0</code></pre>",
   "starter": "def nested_sum(items):\n    pass\n",
   "solution": "def nested_sum(items):\n    total = 0\n    for x in items:\n        if isinstance(x, list):\n            total += nested_sum(x)\n        else:\n            total += x\n    return total\n",
   "hints": [
    "Тізім кездессе — сол тізімге <code>nested_sum</code>-ты қайта шақырыңыз."
   ],
   "check": {
    "tests": "\nassert nested_sum([1, [2, [3, 4]], 5]) == 15, 'Күтілгені 15'\nassert nested_sum([[], [[]]]) == 0, 'Бос жәшіктер: 0'\nassert nested_sum([]) == 0, 'Бос тізім: 0'\nassert nested_sum([7]) == 7, 'Бір сан: 7'\nassert nested_sum([[[[[-3]]]], 3]) == 0, 'Терең ішкі тізім: 0'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Рекурсиямен аудару",
   "prompt": "<p><code>reverse_rec(s)</code> жолды рекурсиямен аударсын: бос жолдың аударылғаны — бос жол; әйтпесе <code>reverse_rec(s[1:]) + s[0]</code>. Цикл, <code>[::-1]</code> және <code>reversed</code> қолданбаңыз. Жол ұзындығы 500-ден аспайды.</p>\n<pre><code>reverse_rec('Қазақ') → 'қазаҚ'\nreverse_rec('')      → ''</code></pre>",
   "starter": "def reverse_rec(s):\n    pass\n",
   "solution": "def reverse_rec(s):\n    if s == '':\n        return ''\n    return reverse_rec(s[1:]) + s[0]\n",
   "hints": [
    "Базалық жағдай: <code>s == ''</code>.",
    "Бірінші таңба нәтиженің соңына барады."
   ],
   "check": {
    "tests": "\nassert reverse_rec('Қазақ') == 'қазаҚ', \"reverse_rec('Қазақ') 'қазаҚ'\"\nassert reverse_rec('') == '', \"Бос жол: ''\"\nassert reverse_rec('a') == 'a', 'Бір таңба'\nassert reverse_rec('ab') == 'ba', \"reverse_rec('ab') 'ba'\"\nassert reverse_rec('x' * 300 + 'y') == 'y' + 'x' * 300, 'Ұзын жол қате аударылды'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Барлық орын ауыстырулар",
   "prompt": "<p><code>permutations(items)</code> әртүрлі элементтердің барлық орын ауыстыруларын backtracking арқылы құрсын (<code>itertools</code> қолданбаңыз). Нәтиже тізімдер тізімі; рет: <code>items</code> берілген ретпен таңдалады (сонда сұрыпталған кіріске лексикографиялық рет шығады).</p>\n<pre><code>permutations([1, 2, 3])\n→ [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]\npermutations([]) → [[]]</code></pre>",
   "starter": "def permutations(items):\n    pass\n",
   "solution": "def permutations(items):\n    res = []\n    used = [False] * len(items)\n    path = []\n    def bt():\n        if len(path) == len(items):\n            res.append(path[:])\n            return\n        for i, x in enumerate(items):\n            if used[i]:\n                continue\n            used[i] = True\n            path.append(x)\n            bt()\n            path.pop()\n            used[i] = False\n    bt()\n    return res\n",
   "hints": [
    "<code>used</code> тізімі қай элемент жолда тұрғанын белгілейді.",
    "Ұзындық толса — <code>path[:]</code> көшірмесін сақтаңыз; қайтқанда <code>pop()</code> және <code>used[i] = False</code>."
   ],
   "check": {
    "tests": "\nassert permutations([1, 2, 3]) == [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]], 'Рет немесе мазмұн қате'\nassert permutations([]) == [[]], 'Бос тізімнің бір орын ауыстыруы бар: [[]]'\nassert permutations(['а']) == [['а']], \"Бір элемент: [['а']]\"\n_p = permutations(['ит', 'құс', 'ат', 'бие'])\nassert len(_p) == 24 and len(set(map(tuple, _p))) == 24, '4 элементтен 24 әртүрлі орын ауыстыру'\nassert _p[0] == ['ит', 'құс', 'ат', 'бие'] and _p[-1] == ['бие', 'ат', 'құс', 'ит'], 'Элементтер берілген ретпен таңдалуы керек'\nassert len(permutations(list(range(7)))) == 5040, '7! = 5040'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "k элементті топтар",
   "prompt": "<p>Сыныпта <code>1..n</code> нөмірлі оқушылар бар. <code>combinations(n, k)</code> олардың ішінен <code>k</code> оқушыдан тұратын барлық топтарды қайтарсын: әр топ өсу ретімен, топтар лексикографиялық ретпен. Backtracking: келесі нөмірді алдыңғысынан үлкен етіп таңдаңыз.</p>\n<pre><code>combinations(4, 2) → [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]\ncombinations(3, 0) → [[]]\ncombinations(2, 3) → []</code></pre>",
   "starter": "def combinations(n, k):\n    pass\n",
   "solution": "def combinations(n, k):\n    res = []\n    path = []\n    def bt(start):\n        if len(path) == k:\n            res.append(path[:])\n            return\n        for x in range(start, n - (k - len(path)) + 2):\n            path.append(x)\n            bt(x + 1)\n            path.pop()\n    if 0 <= k <= n:\n        bt(1)\n    return res\n",
   "hints": [
    "<code>bt(start)</code>: <code>start..n</code> аралығынан келесі элементті таңдаңыз.",
    "Жеткілікті элемент қалмаса, тармақты кесуге болады: <code>x ≤ n − (k − len(path)) + 1</code>."
   ],
   "check": {
    "tests": "\nassert combinations(4, 2) == [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]], 'Күтілгені 6 жұп лексикографиялық ретпен'\nassert combinations(3, 0) == [[]], 'k = 0: [[]]'\nassert combinations(2, 3) == [], 'k > n: []'\nassert combinations(3, 3) == [[1, 2, 3]], 'k = n: [[1, 2, 3]]'\nassert len(combinations(10, 5)) == 252, 'C(10, 5) = 252'\n_c = combinations(6, 3)\nassert _c == sorted(_c) and all(a < b < c for a, b, c in _c), 'Әр топ өсу ретімен, топтар сұрыпталған болуы керек'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Телефон пернелерінің әріптері",
   "prompt": "<p>Ескі телефонда цифрлар әріптерге сәйкес: <code>2: abc, 3: def, 4: ghi, 5: jkl, 6: mno, 7: pqrs, 8: tuv, 9: wxyz</code>. <code>letter_combos(digits)</code> берілген цифрлар жолының барлық әріп комбинацияларын (пернелер ретімен) қайтарсын. Бос жол үшін <code>[]</code>.</p>\n<pre><code>letter_combos('23') → ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']\nletter_combos('')   → []</code></pre>",
   "starter": "KEYS = {'2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl', '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'}\n\ndef letter_combos(digits):\n    pass\n",
   "solution": "KEYS = {'2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl', '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'}\n\ndef letter_combos(digits):\n    if not digits:\n        return []\n    res = []\n    def bt(i, cur):\n        if i == len(digits):\n            res.append(cur)\n            return\n        for ch in KEYS[digits[i]]:\n            bt(i + 1, cur + ch)\n    bt(0, '')\n    return res\n",
   "hints": [
    "<code>bt(i, cur)</code>: <code>i</code>-цифрдың әр әрпін <code>cur</code>-қа қосып, <code>i + 1</code>-ге өтіңіз.",
    "Бос кірісті бөлек тексеріңіз: <code>[]</code>, <code>['']</code> емес."
   ],
   "check": {
    "tests": "\nassert letter_combos('23') == ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'], 'Күтілгені 9 комбинация ретімен'\nassert letter_combos('') == [], \"Бос жол: [] ([''] емес)\"\nassert letter_combos('7') == ['p', 'q', 'r', 's'], \"'7': төрт әріп\"\nassert len(letter_combos('79')) == 16, \"'79': 4 · 4 = 16\"\nassert letter_combos('22')[:3] == ['aa', 'ab', 'ac'], \"'22' басы: aa, ab, ac\"\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Қосындысы берілген жиындар",
   "prompt": "<p>Дүкенде бағалары <code>prices</code> (әртүрлі оң сандар) тауарлар бар; әр тауарды қанша рет болса да алуға болады. <code>combo_sum(prices, total)</code> жалпы бағасы дәл <code>total</code> болатын барлық әртүрлі жиындарды қайтарсын: әр жиын өсу ретімен, жиындар тізімі лексикографиялық ретпен. Backtracking: келесі тауарды алдыңғысынан кем емес етіп таңдаңыз, қосынды асып кетсе тоқтаңыз.</p>\n<pre><code>combo_sum([2, 3, 6, 7], 7) → [[2, 2, 3], [7]]\ncombo_sum([2], 1)          → []\ncombo_sum([5, 1], 0)       → [[]]</code></pre>",
   "starter": "def combo_sum(prices, total):\n    pass\n",
   "solution": "def combo_sum(prices, total):\n    ps = sorted(prices)\n    res = []\n    path = []\n    def bt(start, rem):\n        if rem == 0:\n            res.append(path[:])\n            return\n        for i in range(start, len(ps)):\n            if ps[i] > rem:\n                break\n            path.append(ps[i])\n            bt(i, rem - ps[i])\n            path.pop()\n    bt(0, total)\n    return res\n",
   "hints": [
    "Алдымен бағаларды сұрыптаңыз; <code>bt(start, rem)</code> — <code>start</code>-тан бастап таңдау, <code>rem</code> — қалған сома.",
    "Бір тауарды қайта алу үшін рекурсияға <code>i + 1</code> емес, <code>i</code> беріңіз."
   ],
   "check": {
    "tests": "\nassert combo_sum([2, 3, 6, 7], 7) == [[2, 2, 3], [7]], 'Күтілгені [[2, 2, 3], [7]]'\nassert combo_sum([2], 1) == [], 'Жинау мүмкін емес: []'\nassert combo_sum([5, 1], 0) == [[]], 'total = 0: бос жиын [[]]'\nassert combo_sum([3, 5, 2], 8) == [[2, 2, 2, 2], [2, 3, 3], [3, 5]], 'Сұрыпталмаған кіріс: [[2, 2, 2, 2], [2, 3, 3], [3, 5]]'\ndef _ways(ps, t):\n    dp = [1] + [0] * t\n    for p in ps:\n        for s in range(p, t + 1):\n            dp[s] += dp[s - p]\n    return dp[t]\n_r = combo_sum([2, 3, 5, 7], 30)\nassert len(_r) == _ways([2, 3, 5, 7], 30) and len(set(map(tuple, _r))) == len(_r), 'Жиындар саны қате немесе қайталанады'\nassert all(sum(c) == 30 and c == sorted(c) for c in _r) and _r == sorted(_r), 'Әр жиынның қосындысы 30, өсу ретімен, тізім сұрыпталған болуы керек'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ферзьдер орналастыру",
   "prompt": "<p><code>n × n</code> шахмат тақтасына бір-бірін соқпайтын <code>n</code> ферзь қоюдың неше тәсілі бар? <code>n_queens(n)</code> санын қайтарсын. Backtracking: әр жолға бір ферзь қойыңыз, бос емес бағандар мен екі диагональды (<code>r − c</code> және <code>r + c</code>) <code>set</code>-терде сақтаңыз. <code>n ≤ 9</code>.</p>\n<pre><code>n_queens(4) → 2\nn_queens(1) → 1\nn_queens(3) → 0</code></pre>",
   "starter": "def n_queens(n):\n    pass\n",
   "solution": "def n_queens(n):\n    cols, d1, d2 = set(), set(), set()\n    def bt(r):\n        if r == n:\n            return 1\n        cnt = 0\n        for c in range(n):\n            if c in cols or r - c in d1 or r + c in d2:\n                continue\n            cols.add(c); d1.add(r - c); d2.add(r + c)\n            cnt += bt(r + 1)\n            cols.remove(c); d1.remove(r - c); d2.remove(r + c)\n        return cnt\n    return bt(0)\n",
   "hints": [
    "Бір диагональдағы ұяшықтарда <code>r − c</code> тұрақты, екіншісінде <code>r + c</code> тұрақты.",
    "Қайтқанда үш жиыннан да өшіруді ұмытпаңыз."
   ],
   "check": {
    "tests": "\nassert n_queens(4) == 2, 'n_queens(4) 2 болуы керек'\nassert n_queens(1) == 1, 'n_queens(1) 1'\nassert n_queens(2) == 0 and n_queens(3) == 0, 'n = 2 және n = 3 үшін шешім жоқ'\nassert n_queens(5) == 10, 'n_queens(5) 10'\nassert n_queens(6) == 4, 'n_queens(6) 4'\nassert n_queens(8) == 92, 'n_queens(8) 92 болуы керек'\n"
   }
  }
 ],
 "dsa-8": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бүтін квадрат түбір",
   "prompt": "<p><code>isqrt(n)</code> (<code>n ≥ 0</code>) — <code>x * x ≤ n</code> болатын ең үлкен бүтін <code>x</code>. <code>math</code>, <code>** 0.5</code> қолданбай, <code>[0, n]</code> аралығында binary search жасаңыз: O(log n).</p>\n<pre><code>isqrt(16) → 4\nisqrt(15) → 3\nisqrt(0)  → 0</code></pre>",
   "starter": "def isqrt(n):\n    pass\n",
   "solution": "def isqrt(n):\n    lo, hi = 0, n\n    while lo < hi:\n        mid = (lo + hi + 1) // 2\n        if mid * mid <= n:\n            lo = mid\n        else:\n            hi = mid - 1\n    return lo\n",
   "hints": [
    "Шарт <code>mid * mid ≤ n</code> монотонды: кіші <code>x</code>-тер үшін ақиқат, сосын жалған.",
    "Ең үлкен «ақиқатты» іздегенде <code>mid = (lo + hi + 1) // 2</code> — әйтпесе шексіз цикл."
   ],
   "check": {
    "tests": "\nassert isqrt(16) == 4, 'isqrt(16) 4'\nassert isqrt(15) == 3, 'isqrt(15) 3'\nassert isqrt(0) == 0, 'isqrt(0) 0'\nassert isqrt(1) == 1, 'isqrt(1) 1'\nassert isqrt(2) == 1, 'isqrt(2) 1'\nassert isqrt(10**18) == 10**9, 'isqrt(10^18) = 10^9'\nassert isqrt(10**18 - 1) == 10**9 - 1, 'isqrt(10^18 − 1) = 10^9 − 1'\nfor _n in range(200):\n    _x = isqrt(_n)\n    assert _x * _x <= _n < (_x + 1) * (_x + 1), f'isqrt({_n}) қате: {_x}'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жоғарғы шекара",
   "prompt": "<p><code>upper_bound(a, x)</code>: сұрыпталған <code>a</code>-да <code>a[i] &gt; x</code> болатын ең кіші <code>i</code>; ондай жоқ болса <code>len(a)</code>. <code>bisect</code> қолданбай, binary search жазыңыз.</p>\n<pre><code>upper_bound([1, 2, 2, 2, 5], 2) → 4\nupper_bound([1, 2, 2, 2, 5], 0) → 0\nupper_bound([1, 2, 2, 2, 5], 9) → 5</code></pre>",
   "starter": "def upper_bound(a, x):\n    pass\n",
   "solution": "def upper_bound(a, x):\n    lo, hi = 0, len(a)\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if a[mid] <= x:\n            lo = mid + 1\n        else:\n            hi = mid\n    return lo\n",
   "hints": [
    "<code>lower_bound</code>-қа ұқсас, тек шарт <code>a[mid] &lt;= x</code> болса солға емес, оңға жылжимыз.",
    "<code>hi = len(a)</code> — жауап <code>len(a)</code> болуы мүмкін."
   ],
   "check": {
    "tests": "\nassert upper_bound([1, 2, 2, 2, 5], 2) == 4, 'upper_bound([1, 2, 2, 2, 5], 2) 4'\nassert upper_bound([1, 2, 2, 2, 5], 0) == 0, 'Барлығы үлкен: 0'\nassert upper_bound([1, 2, 2, 2, 5], 9) == 5, 'Барлығы кіші: len(a) = 5'\nassert upper_bound([], 3) == 0, 'Бос тізім: 0'\nassert upper_bound([4, 4, 4], 4) == 3, 'Барлығы тең: 3'\nimport bisect as _b, random as _random\n_rng = _random.Random(3)\nfor _ in range(100):\n    _a = sorted(_rng.randint(0, 9) for _ in range(_rng.randint(0, 12)))\n    _x = _rng.randint(-1, 10)\n    assert upper_bound(_a, _x) == _b.bisect_right(_a, _x), f'upper_bound({_a}, {_x}) {_b.bisect_right(_a, _x)} болуы керек'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Мәннің кездесу саны",
   "prompt": "<p>Емтихан балдары өсу ретімен сұрыпталған. <code>count_of(a, x)</code> <code>x</code> балының неше рет кездесетінін O(log n) уақытта қайтарсын: бірінші <code>a[i] ≥ x</code> және бірінші <code>a[i] &gt; x</code> позицияларын binary search арқылы тауып, айырмасын алыңыз.</p>\n<pre><code>count_of([50, 70, 70, 70, 90], 70) → 3\ncount_of([50, 70, 90], 60)         → 0</code></pre>",
   "starter": "def count_of(a, x):\n    pass\n",
   "solution": "def count_of(a, x):\n    def bound(strict):\n        lo, hi = 0, len(a)\n        while lo < hi:\n            mid = (lo + hi) // 2\n            if a[mid] < x or (strict and a[mid] == x):\n                lo = mid + 1\n            else:\n                hi = mid\n        return lo\n    return bound(True) - bound(False)\n",
   "hints": [
    "Бір көмекші функция екі шекараны да таба алады: салыстыру <code>&lt;</code> немесе <code>&lt;=</code>.",
    "Жауап: <code>upper − lower</code>."
   ],
   "check": {
    "tests": "\nassert count_of([50, 70, 70, 70, 90], 70) == 3, 'count_of(..., 70) 3'\nassert count_of([50, 70, 90], 60) == 0, 'Жоқ мән: 0'\nassert count_of([], 5) == 0, 'Бос тізім: 0'\nassert count_of([5, 5, 5], 5) == 3, 'Барлығы тең: 3'\nassert count_of([1, 2, 3], 3) == 1, 'Соңғы элемент: 1'\nimport time as _time\n_big = [i // 3 for i in range(300000)]\n_t0 = _time.perf_counter()\nfor _q in range(2000):\n    assert count_of(_big, _q * 37) == 3, f'count_of(_big, {_q * 37}) 3 болуы керек'\n_dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'2000 сұрауға {_dt:.2f} с: әр сұрау O(log n) болуы керек (count немесе цикл емес)'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бұрылған тізімнен іздеу",
   "prompt": "<p>Өсу ретімен сұрыпталған <b>әртүрлі</b> сандар тізімі белгісіз нүктеде «бұрылған»: <code>[4, 5, 6, 7, 0, 1, 2]</code>. <code>search_rotated(a, x)</code> <code>x</code>-тің индексін немесе <code>-1</code> қайтарсын, O(log n). Әр қадамда <code>mid</code>-тің бір жағы міндетті түрде сұрыпталған — <code>x</code> сол жақта ма, тексеріңіз.</p>\n<pre><code>search_rotated([4, 5, 6, 7, 0, 1, 2], 0) → 4\nsearch_rotated([4, 5, 6, 7, 0, 1, 2], 3) → -1</code></pre>",
   "starter": "def search_rotated(a, x):\n    pass\n",
   "solution": "def search_rotated(a, x):\n    lo, hi = 0, len(a) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if a[mid] == x:\n            return mid\n        if a[lo] <= a[mid]:\n            if a[lo] <= x < a[mid]:\n                hi = mid - 1\n            else:\n                lo = mid + 1\n        else:\n            if a[mid] < x <= a[hi]:\n                lo = mid + 1\n            else:\n                hi = mid - 1\n    return -1\n",
   "hints": [
    "<code>a[lo] ≤ a[mid]</code> болса, сол жартысы сұрыпталған; әйтпесе оң жартысы.",
    "Сұрыпталған жартыда <code>x</code> аралыққа түссе, сол жаққа барыңыз; әйтпесе екінші жаққа."
   ],
   "check": {
    "tests": "\nassert search_rotated([4, 5, 6, 7, 0, 1, 2], 0) == 4, 'Күтілгені 4'\nassert search_rotated([4, 5, 6, 7, 0, 1, 2], 3) == -1, 'Жоқ мән: -1'\nassert search_rotated([], 1) == -1, 'Бос тізім: -1'\nassert search_rotated([1], 1) == 0, 'Бір элемент: 0'\nassert search_rotated([3, 1], 1) == 1, 'search_rotated([3, 1], 1) 1'\nimport random as _random, time as _time\n_rng = _random.Random(4)\nfor _ in range(200):\n    _n = _rng.randint(1, 15); _base = sorted(_rng.sample(range(50), _n)); _k = _rng.randint(0, _n - 1)\n    _a = _base[_k:] + _base[:_k]; _x = _rng.randint(-1, 50)\n    _exp = _a.index(_x) if _x in _a else -1\n    assert search_rotated(_a, _x) == _exp, f'search_rotated({_a}, {_x}) {_exp} болуы керек'\n_big = list(range(500000, 1000000)) + list(range(500000))\n_t0 = _time.perf_counter()\nfor _q in range(0, 1000000, 997):\n    assert search_rotated(_big, _q) == (_q - 500000) % 1000000\nassert _time.perf_counter() - _t0 < 1.0, 'Әр іздеу O(log n) болуы керек'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бұрылған тізімнің минимумы",
   "prompt": "<p>Әртүрлі сандардан тұратын, бұрылған сұрыпталған тізім (бұрылмаған да болуы мүмкін). <code>find_min(a)</code> ең кіші элементті O(log n) уақытта қайтарсын. <code>a[mid]</code>-ті <code>a[hi]</code>-мен салыстырыңыз. Бос емес тізім беріледі.</p>\n<pre><code>find_min([3, 4, 5, 1, 2]) → 1\nfind_min([11, 13, 15])    → 11</code></pre>",
   "starter": "def find_min(a):\n    pass\n",
   "solution": "def find_min(a):\n    lo, hi = 0, len(a) - 1\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if a[mid] > a[hi]:\n            lo = mid + 1\n        else:\n            hi = mid\n    return a[lo]\n",
   "hints": [
    "<code>a[mid] &gt; a[hi]</code> болса, «құлау» нүктесі оң жақта: <code>lo = mid + 1</code>.",
    "Әйтпесе минимум <code>mid</code>-те немесе сол жақта: <code>hi = mid</code>."
   ],
   "check": {
    "tests": "\nassert find_min([3, 4, 5, 1, 2]) == 1, 'find_min([3, 4, 5, 1, 2]) 1'\nassert find_min([11, 13, 15]) == 11, 'Бұрылмаған тізім: 11'\nassert find_min([7]) == 7, 'Бір элемент: 7'\nassert find_min([2, 1]) == 1, 'find_min([2, 1]) 1'\nimport random as _random, time as _time\n_rng = _random.Random(5)\nfor _ in range(200):\n    _n = _rng.randint(1, 15); _base = sorted(_rng.sample(range(-30, 30), _n)); _k = _rng.randint(0, _n - 1)\n    _a = _base[_k:] + _base[:_k]\n    assert find_min(_a) == _base[0], f'find_min({_a}) {_base[0]} болуы керек'\n_big = list(range(300000, 1000000)) + list(range(300000))\n_t0 = _time.perf_counter()\nfor _ in range(3000):\n    find_min(_big)\nassert find_min(_big) == 0 and _time.perf_counter() - _t0 < 1.0, 'O(log n) шешім керек (min(a) емес)'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Тау шыңы",
   "prompt": "<p>Таудың биіктік профилі: тізім қатаң өседі, сосын қатаң кемиді (ұзындығы кемінде 3, шың шетте емес). <code>peak_index(h)</code> шыңның индексін O(log n) уақытта қайтарсын: <code>h[mid] &lt; h[mid + 1]</code> болса, шың оң жақта.</p>\n<pre><code>peak_index([1, 3, 7, 4, 2]) → 2\npeak_index([0, 10, 5])      → 1</code></pre>",
   "starter": "def peak_index(h):\n    pass\n",
   "solution": "def peak_index(h):\n    lo, hi = 0, len(h) - 1\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if h[mid] < h[mid + 1]:\n            lo = mid + 1\n        else:\n            hi = mid\n    return lo\n",
   "hints": [
    "Шарт «<code>h[i] &lt; h[i + 1]</code>» шыңға дейін ақиқат, шыңнан бастап жалған — шекараны іздеңіз."
   ],
   "check": {
    "tests": "\nassert peak_index([1, 3, 7, 4, 2]) == 2, 'peak_index([1, 3, 7, 4, 2]) 2'\nassert peak_index([0, 10, 5]) == 1, 'peak_index([0, 10, 5]) 1'\nassert peak_index([1, 2, 3, 4, 0]) == 3, 'Шың соңына жақын: 3'\nassert peak_index([5, 9, 8, 7, 6, 1]) == 1, 'Шың басына жақын: 1'\nimport time as _time\n_big = list(range(400000)) + list(range(399998, -1, -1))\n_t0 = _time.perf_counter()\nfor _ in range(3000):\n    _r = peak_index(_big)\nassert _r == 399999 and _time.perf_counter() - _t0 < 1.0, 'O(log n) шешім керек'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Алма теру жылдамдығы",
   "prompt": "<p>Бақта <code>piles[i]</code> алмасы бар ағаштар тұр. Жұмысшы сағатына <code>v</code> алма тереді: бір сағат ішінде тек бір ағашпен айналысады (ағашта <code>v</code>-дан аз қалса, сол сағаттың қалғаны бос өтеді). <code>min_speed(piles, h)</code> барлық алманы <code>h</code> сағатта теруге жететін ең кіші <code>v</code>-ны қайтарсын (<code>h ≥ len(piles)</code>). Жауап бойынша binary search: <code>v</code> жылдамдығымен кететін уақыт — <code>sum(ceil(p / v))</code>.</p>\n<pre><code>min_speed([3, 6, 7, 11], 8)      → 4\nmin_speed([30, 11, 23, 4, 20], 5) → 30\nmin_speed([30, 11, 23, 4, 20], 6) → 23</code></pre>",
   "starter": "def min_speed(piles, h):\n    pass\n",
   "solution": "def min_speed(piles, h):\n    def hours(v):\n        return sum((p + v - 1) // v for p in piles)\n    lo, hi = 1, max(piles)\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if hours(mid) <= h:\n            hi = mid\n        else:\n            lo = mid + 1\n    return lo\n",
   "hints": [
    "Жылдамдық өскен сайын уақыт кемиді — шарт монотонды. Іздеу аралығы <code>[1, max(piles)]</code>.",
    "Бүтін бөлуді жоғары дөңгелектеу: <code>(p + v − 1) // v</code>."
   ],
   "check": {
    "tests": "\nassert min_speed([3, 6, 7, 11], 8) == 4, 'Күтілгені 4'\nassert min_speed([30, 11, 23, 4, 20], 5) == 30, 'h = n: ең үлкен ағаш, 30'\nassert min_speed([30, 11, 23, 4, 20], 6) == 23, 'Күтілгені 23'\nassert min_speed([1], 1) == 1, 'Бір алма: 1'\nassert min_speed([10], 100) == 1, 'Уақыт көп: ең кіші жылдамдық 1'\nassert min_speed([10**9], 2) == 5 * 10**8, 'Үлкен сан: 5·10^8'\nimport random as _random, time as _time\n_rng = _random.Random(6)\nfor _ in range(30):\n    _p = [_rng.randint(1, 30) for _ in range(_rng.randint(1, 6))]; _h = _rng.randint(len(_p), 40)\n    _exp = next(v for v in range(1, 31) if sum((x + v - 1) // v for x in _p) <= _h)\n    assert min_speed(_p, _h) == _exp, f'min_speed({_p}, {_h}) {_exp} болуы керек'\n_big = [_rng.randint(1, 10**9) for _ in range(20000)]\n_t0 = _time.perf_counter(); min_speed(_big, 10**6); _dt = _time.perf_counter() - _t0\nassert _dt < 2.0, f'{_dt:.2f} с: жауапты binary search арқылы іздеңіз'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Дүкендер арасындағы қашықтық",
   "prompt": "<p>Көшенің бойында <code>positions</code> нүктелерінде бос орындар бар (ретсіз, әртүрлі). Бір желінің <code>k</code> дүкенін ашу керек, бір-біріне ең жақын екі дүкен арасындағы қашықтық <b>мүмкіндігінше үлкен</b> болсын. <code>max_min_gap(positions, k)</code> сол ең үлкен мүмкін қашықтықты қайтарсын (<code>2 ≤ k ≤ len(positions)</code>). Сұрыптаңыз, сосын жауап бойынша binary search: «арақашықтық кемінде <code>d</code> болатындай <code>k</code> дүкен қоя аламыз ба?» — greedy тексеру.</p>\n<pre><code>max_min_gap([1, 2, 8, 4, 9], 3) → 3     # 1, 4, 8 (немесе 1, 4, 9)\nmax_min_gap([5, 1], 2)          → 4</code></pre>",
   "starter": "def max_min_gap(positions, k):\n    pass\n",
   "solution": "def max_min_gap(positions, k):\n    p = sorted(positions)\n    def ok(d):\n        cnt, last = 1, p[0]\n        for x in p[1:]:\n            if x - last >= d:\n                cnt += 1\n                last = x\n        return cnt >= k\n    lo, hi = 0, p[-1] - p[0]\n    while lo < hi:\n        mid = (lo + hi + 1) // 2\n        if ok(mid):\n            lo = mid\n        else:\n            hi = mid - 1\n    return lo\n",
   "hints": [
    "<code>ok(d)</code>: бірінші дүкенді ең сол жаққа қойып, әр келесіні алдыңғысынан кемінде <code>d</code> қашықтықтағы бірінші орынға қойыңыз.",
    "Ең үлкен ақиқат <code>d</code> ізделеді: <code>mid = (lo + hi + 1) // 2</code>."
   ],
   "check": {
    "tests": "\nassert max_min_gap([1, 2, 8, 4, 9], 3) == 3, 'Күтілгені 3'\nassert max_min_gap([5, 1], 2) == 4, 'Екі орын: 4'\nassert max_min_gap([1, 2, 3, 4], 4) == 1, 'Барлық орынға: 1'\nassert max_min_gap([0, 100, 50, 49, 51], 3) == 50, 'Күтілгені 50'\nfrom itertools import combinations as _comb\nimport random as _random\n_rng = _random.Random(7)\nfor _ in range(40):\n    _p = _rng.sample(range(40), _rng.randint(2, 8)); _k = _rng.randint(2, len(_p))\n    _exp = max(min(b - a for a, b in zip(c, c[1:])) for c in _comb(sorted(_p), _k))\n    assert max_min_gap(_p, _k) == _exp, f'max_min_gap({_p}, {_k}) {_exp} болуы керек'\n"
   }
  }
 ],
 "dsa-9": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Кірістіру арқылы сұрыптау",
   "prompt": "<p><code>insertion_sort(a)</code> өсу ретімен сұрыпталған <b>жаңа</b> тізім қайтарсын (бастапқы тізім өзгермесін). Insertion sort-ты өзіңіз жазыңыз: әр элементті сол жағындағы сұрыпталған бөлікке оңнан солға жылжытып кірістіріңіз. <code>sorted</code> мен <code>.sort</code> қолданбаңыз.</p>\n<pre><code>insertion_sort([5, 2, 4, 6, 1, 3]) → [1, 2, 3, 4, 5, 6]</code></pre>",
   "starter": "def insertion_sort(a):\n    b = list(a)\n    pass\n",
   "solution": "def insertion_sort(a):\n    b = list(a)\n    for i in range(1, len(b)):\n        x = b[i]\n        j = i - 1\n        while j >= 0 and b[j] > x:\n            b[j + 1] = b[j]\n            j -= 1\n        b[j + 1] = x\n    return b\n",
   "hints": [
    "<code>x = b[i]</code>; <code>b[j] &gt; x</code> болғанша элементтерді бір орын оңға жылжытыңыз.",
    "Соңында <code>b[j + 1] = x</code>."
   ],
   "check": {
    "tests": "\n_a = [5, 2, 4, 6, 1, 3]\nassert insertion_sort(_a) == [1, 2, 3, 4, 5, 6], 'Күтілгені [1, 2, 3, 4, 5, 6]'\nassert _a == [5, 2, 4, 6, 1, 3], 'Бастапқы тізімді өзгертпеңіз'\nassert insertion_sort([]) == [], 'Бос тізім: []'\nassert insertion_sort([1]) == [1], 'Бір элемент'\nassert insertion_sort([3, 3, 1, 1]) == [1, 1, 3, 3], 'Қайталанулар: [1, 1, 3, 3]'\nimport random as _random\n_rng = _random.Random(1)\nfor _ in range(30):\n    _x = [_rng.randint(-20, 20) for _ in range(_rng.randint(0, 25))]\n    assert insertion_sort(_x) == sorted(_x), f'{_x} қате сұрыпталды'\n",
    "mustInclude": [
     "while"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Балл және аты бойынша",
   "prompt": "<p>Олимпиада қатысушылары <code>(аты, балл)</code> кортеждері. <code>rank(students)</code> оларды балл бойынша <b>кему</b> ретімен, балы тең болса аты бойынша <b>өсу</b> ретімен сұрыптап, тек аттар тізімін қайтарсын. <code>sorted</code> мен <code>key</code> қолданыңыз.</p>\n<pre><code>rank([('Әсем', 90), ('Берік', 95), ('Арман', 90)]) → ['Берік', 'Арман', 'Әсем']</code></pre>",
   "starter": "def rank(students):\n    pass\n",
   "solution": "def rank(students):\n    return [name for name, score in sorted(students, key=lambda s: (-s[1], s[0]))]\n",
   "hints": [
    "Кілт ретінде кортеж: <code>(-балл, аты)</code> — теріс балл кему ретін береді."
   ],
   "check": {
    "tests": "\nassert rank([('Әсем', 90), ('Берік', 95), ('Арман', 90)]) == ['Берік', 'Арман', 'Әсем'], \"Күтілгені ['Берік', 'Арман', 'Әсем']\"\nassert rank([]) == [], 'Бос тізім: []'\nassert rank([('Дана', 50)]) == ['Дана'], 'Бір қатысушы'\nassert rank([('в', 1), ('б', 1), ('а', 1)]) == ['а', 'б', 'в'], 'Барлық балл тең: аты бойынша'\nassert rank([('а', 1), ('б', 2), ('в', 3)]) == ['в', 'б', 'а'], 'Балл бойынша кему'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ұзындық бойынша тұрақты сұрыптау",
   "prompt": "<p><code>by_length(words)</code> сөздерді ұзындығы бойынша өсу ретімен сұрыптасын; ұзындығы бірдей сөздер <b>бастапқы ретін</b> сақтасын (тұрақты сұрыптау). Python-дағы <code>sorted</code> тұрақты.</p>\n<pre><code>by_length(['алма', 'ит', 'қой', 'ат', 'құс']) → ['ит', 'ат', 'қой', 'құс', 'алма']</code></pre>",
   "starter": "def by_length(words):\n    pass\n",
   "solution": "def by_length(words):\n    return sorted(words, key=len)\n",
   "hints": [
    "<code>key=len</code> жеткілікті: <code>sorted</code> тең кілттердің ретін сақтайды."
   ],
   "check": {
    "tests": "\nassert by_length(['алма', 'ит', 'қой', 'ат', 'құс']) == ['ит', 'ат', 'қой', 'құс', 'алма'], \"Күтілгені ['ит', 'ат', 'қой', 'құс', 'алма']\"\nassert by_length([]) == [], 'Бос тізім: []'\nassert by_length(['бб', 'аа']) == ['бб', 'аа'], 'Ұзындық тең: бастапқы рет сақталады (алфавит емес)'\nassert by_length(['ccc', 'b', '']) == ['', 'b', 'ccc'], 'Бос сөз бірінші'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Quicksort жазу",
   "prompt": "<p><code>quick_sort(a)</code> quicksort арқылы сұрыпталған жаңа тізім қайтарсын: тірек (pivot) ретінде ортаңғы элементті алып, тізімді үш бөлікке бөліңіз (<code>&lt; pivot</code>, <code>== pivot</code>, <code>&gt; pivot</code>), шеткі екеуін рекурсиямен сұрыптаңыз. <code>sorted</code> мен <code>.sort</code> қолданбаңыз. Тест бірдей мәндері көп тізіммен де тексереді.</p>\n<pre><code>quick_sort([3, 6, 1, 8, 2, 9, 2]) → [1, 2, 2, 3, 6, 8, 9]</code></pre>",
   "starter": "def quick_sort(a):\n    pass\n",
   "solution": "def quick_sort(a):\n    if len(a) <= 1:\n        return list(a)\n    p = a[len(a) // 2]\n    less = [x for x in a if x < p]\n    eq = [x for x in a if x == p]\n    more = [x for x in a if x > p]\n    return quick_sort(less) + eq + quick_sort(more)\n",
   "hints": [
    "Базалық жағдай: ұзындығы 0 немесе 1.",
    "Тең элементтерді бөлек топқа жинау бірдей мәндер көп болғанда рекурсияның тереңдеп кетуінен сақтайды."
   ],
   "check": {
    "tests": "\nassert quick_sort([3, 6, 1, 8, 2, 9, 2]) == [1, 2, 2, 3, 6, 8, 9], 'Күтілгені [1, 2, 2, 3, 6, 8, 9]'\nassert quick_sort([]) == [], 'Бос тізім: []'\nassert quick_sort([1]) == [1], 'Бір элемент'\n_a = [3, 1, 2]; quick_sort(_a)\nassert _a == [3, 1, 2], 'Бастапқы тізімді өзгертпеңіз'\nassert quick_sort([7] * 5000) == [7] * 5000, '5000 бірдей мән: рекурсия тереңдемеуі керек'\nassert quick_sort(list(range(3000, 0, -1))) == list(range(1, 3001)), 'Кері сұрыпталған тізім'\nimport random as _random\n_rng = _random.Random(2)\nfor _ in range(30):\n    _x = [_rng.randint(-9, 9) for _ in range(_rng.randint(0, 30))]\n    assert quick_sort(_x) == sorted(_x), f'{_x} қате сұрыпталды'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Үш түсті сұрыптау",
   "prompt": "<p>Бағдаршам түстері <code>0</code> (қызыл), <code>1</code> (сары), <code>2</code> (жасыл) тізімі. <code>sort_colors(a)</code> оны <b>орнында</b>, бір рет аралап сұрыптасын (Дейкстраның «голланд туы» әдісі): үш көрсеткіш <code>lo</code>, <code>mid</code>, <code>hi</code>. <code>sorted</code>, <code>.sort</code> және санау қолданбаңыз.</p>\n<pre><code>a = [2, 0, 2, 1, 1, 0]\nsort_colors(a)    # a == [0, 0, 1, 1, 2, 2]</code></pre>",
   "starter": "def sort_colors(a):\n    pass\n",
   "solution": "def sort_colors(a):\n    lo, mid, hi = 0, 0, len(a) - 1\n    while mid <= hi:\n        if a[mid] == 0:\n            a[lo], a[mid] = a[mid], a[lo]\n            lo += 1\n            mid += 1\n        elif a[mid] == 1:\n            mid += 1\n        else:\n            a[mid], a[hi] = a[hi], a[mid]\n            hi -= 1\n",
   "hints": [
    "<code>a[:lo]</code> — нөлдер, <code>a[lo:mid]</code> — бірлер, <code>a[hi+1:]</code> — екілер.",
    "2 келсе, оны <code>hi</code>-мен ауыстырыңыз, бірақ <code>mid</code>-ті жылжытпаңыз: келген элемент әлі тексерілмеген."
   ],
   "check": {
    "tests": "\n_a = [2, 0, 2, 1, 1, 0]; sort_colors(_a)\nassert _a == [0, 0, 1, 1, 2, 2], f'Күтілгені [0, 0, 1, 1, 2, 2], сізде {_a}'\n_a = []; sort_colors(_a); assert _a == [], 'Бос тізім'\n_a = [1]; sort_colors(_a); assert _a == [1], 'Бір элемент'\n_a = [2, 2, 0]; sort_colors(_a); assert _a == [0, 2, 2], 'Күтілгені [0, 2, 2]'\nimport random as _random\n_rng = _random.Random(3)\nfor _ in range(50):\n    _x = [_rng.randint(0, 2) for _ in range(_rng.randint(0, 20))]; _y = list(_x)\n    sort_colors(_y)\n    assert _y == sorted(_x), f'{_x} қате сұрыпталды: {_y}'\n",
    "mustInclude": [
     "while"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "k-шы ең кіші элемент",
   "prompt": "<p><code>kth_smallest(a, k)</code> тізімдегі <code>k</code>-шы ең кіші элементті (<code>k = 1</code> — минимум, қайталанулар есептеледі) қайтарсын. Quickselect: quicksort сияқты бөліңіз, бірақ тек <code>k</code>-шы элемент жатқан бөлікке ғана рекурсия жасаңыз — орташа O(n). <code>sorted</code> мен <code>.sort</code> қолданбаңыз.</p>\n<pre><code>kth_smallest([7, 10, 4, 3, 20, 15], 3) → 7\nkth_smallest([2, 2, 1], 2)             → 2</code></pre>",
   "starter": "def kth_smallest(a, k):\n    pass\n",
   "solution": "def kth_smallest(a, k):\n    while True:\n        p = a[len(a) // 2]\n        less = [x for x in a if x < p]\n        eq = [x for x in a if x == p]\n        if k <= len(less):\n            a = less\n        elif k <= len(less) + len(eq):\n            return p\n        else:\n            k -= len(less) + len(eq)\n            a = [x for x in a if x > p]\n",
   "hints": [
    "Бөлгеннен кейін: <code>k ≤ len(less)</code> — жауап <code>less</code>-те; <code>k ≤ len(less) + len(eq)</code> — жауап <code>p</code>.",
    "Әйтпесе <code>more</code>-қа өтіп, <code>k</code>-дан <code>len(less) + len(eq)</code>-ді шегеріңіз."
   ],
   "check": {
    "tests": "\nassert kth_smallest([7, 10, 4, 3, 20, 15], 3) == 7, 'Күтілгені 7'\nassert kth_smallest([2, 2, 1], 2) == 2, 'Қайталанулар есептеледі: 2'\nassert kth_smallest([5], 1) == 5, 'Бір элемент'\nassert kth_smallest([9, 8, 7], 3) == 9, 'k = n: максимум'\nimport random as _random\n_rng = _random.Random(4)\nfor _ in range(60):\n    _x = [_rng.randint(-10, 10) for _ in range(_rng.randint(1, 20))]; _k = _rng.randint(1, len(_x))\n    assert kth_smallest(list(_x), _k) == sorted(_x)[_k - 1], f'kth_smallest({_x}, {_k}) {sorted(_x)[_k - 1]} болуы керек'\n_big = [_rng.randint(0, 10**9) for _ in range(100000)]\nassert kth_smallest(list(_big), 50000) == sorted(_big)[49999], '100 000 элементтегі медиана қате'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Жиілік бойынша сұрыптау",
   "prompt": "<p><code>freq_sort(nums)</code>: сандарды кездесу жиілігі бойынша <b>өсу</b> ретімен сұрыптаңыз; жиілігі бірдей сандар мәні бойынша <b>кему</b> ретімен. Әр сан кездескен санымен қайталанып шығады. Сөздікпен санап, сосын <code>sorted</code> + <code>key</code>.</p>\n<pre><code>freq_sort([1, 1, 2, 2, 2, 3]) → [3, 1, 1, 2, 2, 2]\nfreq_sort([2, 3, 1, 3, 2])    → [1, 3, 3, 2, 2]</code></pre>",
   "starter": "def freq_sort(nums):\n    pass\n",
   "solution": "def freq_sort(nums):\n    cnt = {}\n    for x in nums:\n        cnt[x] = cnt.get(x, 0) + 1\n    return sorted(nums, key=lambda x: (cnt[x], -x))\n",
   "hints": [
    "Алдымен <code>cnt</code> сөздігі.",
    "Кілт: <code>(cnt[x], -x)</code>."
   ],
   "check": {
    "tests": "\nassert freq_sort([1, 1, 2, 2, 2, 3]) == [3, 1, 1, 2, 2, 2], 'Күтілгені [3, 1, 1, 2, 2, 2]'\nassert freq_sort([2, 3, 1, 3, 2]) == [1, 3, 3, 2, 2], 'Жиілік тең болса, үлкені алдымен: [1, 3, 3, 2, 2]'\nassert freq_sort([]) == [], 'Бос тізім: []'\nassert freq_sort([-1, 1, -6, 4, 5, -6, 1, 4, 1]) == [5, -1, 4, 4, -6, -6, 1, 1, 1], 'Теріс сандармен тест қате'\nassert freq_sort([0, 0, 0]) == [0, 0, 0], 'Бір мән'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ең жақын жұптар",
   "prompt": "<p>Спортшылардың уақыттары (әртүрлі бүтін сандар) ретсіз берілген. <code>closest_pairs(times)</code> айырмасы ең кіші болатын барлық жұптарды <code>[a, b]</code> (<code>a &lt; b</code>) түрінде, <code>a</code> бойынша өсу ретімен қайтарсын. Сұрыптағаннан кейін ең жақын жұптар — көршілер: O(n log n).</p>\n<pre><code>closest_pairs([4, 2, 1, 3])       → [[1, 2], [2, 3], [3, 4]]\nclosest_pairs([1, 3, 6, 10, 15])  → [[1, 3]]\nclosest_pairs([5])                → []</code></pre>",
   "starter": "def closest_pairs(times):\n    pass\n",
   "solution": "def closest_pairs(times):\n    a = sorted(times)\n    res = []\n    best = None\n    for x, y in zip(a, a[1:]):\n        d = y - x\n        if best is None or d < best:\n            best = d\n            res = [[x, y]]\n        elif d == best:\n            res.append([x, y])\n    return res\n",
   "hints": [
    "Сұрыпталған тізімде ең кіші айырма тек көрші элементтер арасында болады.",
    "Жаңа кіші айырма табылса, нәтижені тазалап, қайтадан бастаңыз."
   ],
   "check": {
    "tests": "\nassert closest_pairs([4, 2, 1, 3]) == [[1, 2], [2, 3], [3, 4]], 'Күтілгені [[1, 2], [2, 3], [3, 4]]'\nassert closest_pairs([1, 3, 6, 10, 15]) == [[1, 3]], 'Күтілгені [[1, 3]]'\nassert closest_pairs([5]) == [], 'Бір элемент: []'\nassert closest_pairs([]) == [], 'Бос тізім: []'\nassert closest_pairs([3, 8, -10, 23, 19, -4, -14, 27]) == [[-14, -10], [19, 23], [23, 27]], 'Теріс сандармен тест қате'\nimport random as _random, time as _time\n_rng = _random.Random(9)\nfor _ in range(30):\n    _x = _rng.sample(range(-50, 50), _rng.randint(2, 10))\n    _d = min(abs(p - q) for i, p in enumerate(_x) for q in _x[i + 1:])\n    _exp = sorted([min(p, q), max(p, q)] for i, p in enumerate(_x) for q in _x[i + 1:] if abs(p - q) == _d)\n    assert closest_pairs(_x) == _exp, f'closest_pairs({_x}) {_exp} болуы керек'\n_big = _rng.sample(range(10**9), 100000)\n_t0 = _time.perf_counter(); closest_pairs(_big); _dt = _time.perf_counter() - _t0\nassert _dt < 1.5, f'{_dt:.2f} с: сұрыптап, көршілерді салыстырыңыз (O(n log n))'\n"
   }
  }
 ],
 "dsa-10": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ағаш мәндерінің қосындысы",
   "prompt": "<p><code>tree_sum(root)</code> ағаштың барлық түйін мәндерінің қосындысын рекурсиямен қайтарсын. Бос ағаш — 0.</p>\n<pre><code>tree_sum(TreeNode(1, TreeNode(2), TreeNode(3, TreeNode(4)))) → 10\ntree_sum(None)                                              → 0</code></pre>",
   "starter": "class TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef tree_sum(root):\n    pass\n",
   "solution": "class TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef tree_sum(root):\n    if root is None:\n        return 0\n    return root.val + tree_sum(root.left) + tree_sum(root.right)\n",
   "hints": [
    "Базалық жағдай: <code>None</code> → 0.",
    "Түйін мәні + сол ішкі ағаш + оң ішкі ағаш."
   ],
   "check": {
    "tests": "\nassert tree_sum(TreeNode(1, TreeNode(2), TreeNode(3, TreeNode(4)))) == 10, 'Күтілгені 10'\nassert tree_sum(None) == 0, 'Бос ағаш: 0'\nassert tree_sum(TreeNode(-5)) == -5, 'Бір түйін: -5'\nassert tree_sum(TreeNode(0, TreeNode(-1), TreeNode(1))) == 0, 'Теріс мәндер: 0'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жапырақтар саны",
   "prompt": "<p><code>count_leaves(root)</code> ағаштағы жапырақтар (баласы жоқ түйіндер) санын қайтарсын. Бос ағашта жапырақ жоқ.</p>\n<pre><code>count_leaves(TreeNode(1, TreeNode(2), TreeNode(3, TreeNode(4)))) → 2\ncount_leaves(TreeNode(7))                                       → 1</code></pre>",
   "starter": "class TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef count_leaves(root):\n    pass\n",
   "solution": "class TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef count_leaves(root):\n    if root is None:\n        return 0\n    if root.left is None and root.right is None:\n        return 1\n    return count_leaves(root.left) + count_leaves(root.right)\n",
   "hints": [
    "Екі баласы да <code>None</code> болса — жапырақ, 1."
   ],
   "check": {
    "tests": "\nassert count_leaves(TreeNode(1, TreeNode(2), TreeNode(3, TreeNode(4)))) == 2, 'Күтілгені 2 (2 және 4)'\nassert count_leaves(TreeNode(7)) == 1, 'Жалғыз түйін — жапырақ'\nassert count_leaves(None) == 0, 'Бос ағаш: 0'\nassert count_leaves(TreeNode(1, TreeNode(2, TreeNode(3)))) == 1, 'Тізбек ағашта бір жапырақ'\nassert count_leaves(TreeNode(1, None, TreeNode(2))) == 1, 'Тек оң бала: 1'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Айналы ағаш",
   "prompt": "<p><code>mirror(root)</code> ағашты <b>орнында</b> айналы етсін: әр түйінде сол және оң балаларды ауыстырыңыз. Түбірді қайтарыңыз.</p>\n<pre><code>    4              4\n   / \\            / \\\n  2   7    →     7   2\n / \\                / \\\n1   3              3   1</code></pre>",
   "starter": "class TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef mirror(root):\n    pass\n",
   "solution": "class TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef mirror(root):\n    if root is None:\n        return None\n    root.left, root.right = mirror(root.right), mirror(root.left)\n    return root\n",
   "hints": [
    "<code>root.left, root.right = mirror(root.right), mirror(root.left)</code>."
   ],
   "check": {
    "tests": "\ndef _bst(vals):\n    root = None\n    def ins(n, v):\n        if n is None:\n            return TreeNode(v)\n        if v < n.val: n.left = ins(n.left, v)\n        else: n.right = ins(n.right, v)\n        return n\n    for v in vals:\n        root = ins(root, v)\n    return root\ndef _ino(n):\n    return _ino(n.left) + [n.val] + _ino(n.right) if n else []\n\n_t = TreeNode(4, TreeNode(2, TreeNode(1), TreeNode(3)), TreeNode(7))\n_r = mirror(_t)\nassert _r is _t, 'Сол түбірді қайтарыңыз (жаңа ағаш жасамаңыз)'\nassert _ino(_r) == [7, 4, 3, 2, 1], f'Айналы ағаштың inorder-і [7, 4, 3, 2, 1] болуы керек, сізде {_ino(_r)}'\nassert _r.left.val == 7 and _r.right.left.val == 3, 'Балалар ауыстырылмаған'\nassert mirror(None) is None, 'Бос ағаш: None'\n_one = TreeNode(5); assert mirror(_one) is _one and _one.left is None, 'Бір түйін өзгермейді'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "BST тексеру",
   "prompt": "<p><code>is_bst(root)</code>: ағаш дұрыс BST болса <code>True</code>: әр түйін үшін сол ішкі ағаштағы <b>барлық</b> мәндер одан қатаң кіші, оң ішкі ағаштағылар қатаң үлкен. Тек балаларымен салыстыру жеткіліксіз! Рекурсияға рұқсат етілген аралықты <code>(lo, hi)</code> беріңіз.</p>\n<pre><code>is_bst(TreeNode(2, TreeNode(1), TreeNode(3)))                         → True\nis_bst(TreeNode(5, TreeNode(1), TreeNode(7, TreeNode(4), TreeNode(8)))) → False   # 4 &lt; 5</code></pre>",
   "starter": "class TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef is_bst(root):\n    pass\n",
   "solution": "class TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef is_bst(root, lo=None, hi=None):\n    if root is None:\n        return True\n    if (lo is not None and root.val <= lo) or (hi is not None and root.val >= hi):\n        return False\n    return is_bst(root.left, lo, root.val) and is_bst(root.right, root.val, hi)\n",
   "hints": [
    "<code>check(node, lo, hi)</code>: <code>lo &lt; node.val &lt; hi</code> болуы керек.",
    "Солға түскенде <code>hi = node.val</code>, оңға түскенде <code>lo = node.val</code>."
   ],
   "check": {
    "tests": "\ndef _bst(vals):\n    root = None\n    def ins(n, v):\n        if n is None:\n            return TreeNode(v)\n        if v < n.val: n.left = ins(n.left, v)\n        else: n.right = ins(n.right, v)\n        return n\n    for v in vals:\n        root = ins(root, v)\n    return root\ndef _ino(n):\n    return _ino(n.left) + [n.val] + _ino(n.right) if n else []\n\nassert is_bst(TreeNode(2, TreeNode(1), TreeNode(3))) is True, 'Дұрыс BST: True'\nassert is_bst(TreeNode(5, TreeNode(1), TreeNode(7, TreeNode(4), TreeNode(8)))) is False, '4 түбірдің оң жағында, бірақ 5-тен кіші: False'\nassert is_bst(None) is True, 'Бос ағаш: True'\nassert is_bst(TreeNode(1)) is True, 'Бір түйін: True'\nassert is_bst(TreeNode(2, TreeNode(2))) is False, 'Тең мән рұқсат етілмейді: False'\nassert is_bst(TreeNode(10, TreeNode(5, None, TreeNode(12)), TreeNode(15))) is False, '12 10-ның сол жағында: False'\nassert is_bst(_bst([50, 30, 70, 20, 40, 60, 80, 35])) is True, 'Кірістіру арқылы құрылған BST: True'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Симметриялы ағаш",
   "prompt": "<p><code>is_symmetric(root)</code>: ағаш өз айнасына тең болса (сол ішкі ағаш оң ішкі ағаштың айналы көшірмесі) <code>True</code>. Екі түйінді қатар тексеретін көмекші функция жазыңыз: <code>a.left</code> мен <code>b.right</code>, <code>a.right</code> мен <code>b.left</code>.</p>\n<pre><code>    1\n   / \\\n  2   2      → True\n / \\ / \\\n3  4 4  3</code></pre>",
   "starter": "class TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef is_symmetric(root):\n    pass\n",
   "solution": "class TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef is_symmetric(root):\n    def mir(a, b):\n        if a is None or b is None:\n            return a is b\n        return a.val == b.val and mir(a.left, b.right) and mir(a.right, b.left)\n    return root is None or mir(root.left, root.right)\n",
   "hints": [
    "<code>mir(a, b)</code>: екеуі де <code>None</code> — <code>True</code>; біреуі ғана — <code>False</code>.",
    "Мәндері тең және сыртқы, ішкі жұптар айналы болуы керек."
   ],
   "check": {
    "tests": "\n_t = TreeNode(1, TreeNode(2, TreeNode(3), TreeNode(4)), TreeNode(2, TreeNode(4), TreeNode(3)))\nassert is_symmetric(_t) is True, 'Симметриялы ағаш: True'\n_t2 = TreeNode(1, TreeNode(2, None, TreeNode(3)), TreeNode(2, None, TreeNode(3)))\nassert is_symmetric(_t2) is False, 'Құрылымы симметриялы емес: False'\nassert is_symmetric(None) is True, 'Бос ағаш: True'\nassert is_symmetric(TreeNode(1)) is True, 'Бір түйін: True'\nassert is_symmetric(TreeNode(1, TreeNode(2), TreeNode(3))) is False, 'Мәндер әртүрлі: False'\nassert is_symmetric(TreeNode(1, TreeNode(2))) is False, 'Тек сол бала: False'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "BST-дегі ең жақын мән",
   "prompt": "<p><code>closest(root, target)</code> BST-дегі <code>target</code>-қа ең жақын мәнді қайтарсын (екі мән бірдей жақын болса — кішісін). Бүкіл ағашты аралаудың қажеті жоқ: BST қасиетімен түбірден бір жолмен түсіңіз — O(h).</p>\n<pre><code># BST: 4, 2, 5, 1, 3\nclosest(root, 3.7) → 4\nclosest(root, 2.5) → 2</code></pre>",
   "starter": "class TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef closest(root, target):\n    pass\n",
   "solution": "class TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef closest(root, target):\n    best = root.val\n    node = root\n    while node:\n        d, bd = abs(node.val - target), abs(best - target)\n        if d < bd or (d == bd and node.val < best):\n            best = node.val\n        node = node.left if target < node.val else node.right\n    return best\n",
   "hints": [
    "Әр түйінде ең жақсы жауапты жаңартып, <code>target &lt; node.val</code> болса солға, әйтпесе оңға түсіңіз.",
    "Тең жақындықта кішісін таңдаңыз."
   ],
   "check": {
    "tests": "\ndef _bst(vals):\n    root = None\n    def ins(n, v):\n        if n is None:\n            return TreeNode(v)\n        if v < n.val: n.left = ins(n.left, v)\n        else: n.right = ins(n.right, v)\n        return n\n    for v in vals:\n        root = ins(root, v)\n    return root\ndef _ino(n):\n    return _ino(n.left) + [n.val] + _ino(n.right) if n else []\n\n_r = _bst([4, 2, 5, 1, 3])\nassert closest(_r, 3.7) == 4, 'closest(..., 3.7) 4'\nassert closest(_r, 2.5) == 2, 'Тең жақын (2 және 3): кішісі 2'\nassert closest(_r, 100) == 5, 'Барлығынан үлкен: 5'\nassert closest(_r, -7) == 1, 'Барлығынан кіші: 1'\nassert closest(_r, 3) == 3, 'Дәл мән: 3'\nassert closest(TreeNode(10), 0) == 10, 'Бір түйін'\nimport random as _random\n_rng = _random.Random(10)\nfor _ in range(40):\n    _v = _rng.sample(range(0, 60, 2), _rng.randint(1, 12)); _root = _bst(_v); _q = _rng.uniform(-5, 65)\n    _exp = min(_v, key=lambda x: (abs(x - _q), x))\n    assert closest(_root, _q) == _exp, f'{_v} ағашында {_q:.2f}-ге ең жақыны {_exp}'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "BST-дегі ортақ ата",
   "prompt": "<p><code>lca(root, p, q)</code> BST-де <code>p</code> және <code>q</code> мәндерінің ең төменгі ортақ атасының <b>мәнін</b> қайтарсын (түйін өзінің де атасы саналады). Екі мән де ағашта бар. BST қасиеті: екеуі де кіші болса — солға, екеуі де үлкен болса — оңға, әйтпесе осы түйін — жауап. O(h).</p>\n<pre><code># BST: 6, 2, 8, 0, 4, 7, 9, 3, 5\nlca(root, 2, 8) → 6\nlca(root, 2, 4) → 2\nlca(root, 3, 5) → 4</code></pre>",
   "starter": "class TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef lca(root, p, q):\n    pass\n",
   "solution": "class TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef lca(root, p, q):\n    node = root\n    while node:\n        if p < node.val and q < node.val:\n            node = node.left\n        elif p > node.val and q > node.val:\n            node = node.right\n        else:\n            return node.val\n",
   "hints": [
    "Жол екіге айырылатын бірінші түйін — ортақ ата.",
    "Цикл жеткілікті: рекурсия міндетті емес."
   ],
   "check": {
    "tests": "\ndef _bst(vals):\n    root = None\n    def ins(n, v):\n        if n is None:\n            return TreeNode(v)\n        if v < n.val: n.left = ins(n.left, v)\n        else: n.right = ins(n.right, v)\n        return n\n    for v in vals:\n        root = ins(root, v)\n    return root\ndef _ino(n):\n    return _ino(n.left) + [n.val] + _ino(n.right) if n else []\n\n_r = _bst([6, 2, 8, 0, 4, 7, 9, 3, 5])\nassert lca(_r, 2, 8) == 6, 'lca(2, 8) 6'\nassert lca(_r, 2, 4) == 2, 'Түйін өзінің атасы: lca(2, 4) 2'\nassert lca(_r, 3, 5) == 4, 'lca(3, 5) 4'\nassert lca(_r, 5, 3) == 4, 'Рет маңызды емес: lca(5, 3) 4'\nassert lca(_r, 7, 7) == 7, 'Бір мән: 7'\nassert lca(_r, 0, 9) == 6, 'lca(0, 9) 6'\nimport random as _random\n_rng = _random.Random(11)\ndef _path(n, v):\n    out = []\n    while n:\n        out.append(n.val)\n        if v == n.val: break\n        n = n.left if v < n.val else n.right\n    return out\nfor _ in range(40):\n    _v = _rng.sample(range(100), _rng.randint(1, 15)); _root = _bst(_v)\n    _p, _q = _rng.choice(_v), _rng.choice(_v)\n    _a, _b = _path(_root, _p), _path(_root, _q)\n    _exp = [x for x, y in zip(_a, _b) if x == y][-1]\n    assert lca(_root, _p, _q) == _exp, f'{_v} BST-де lca({_p}, {_q}) {_exp} болуы керек'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ағаштың диаметрі",
   "prompt": "<p><code>diameter(root)</code> ағаштағы кез келген екі түйін арасындағы ең ұзын жолдың <b>қырлар</b> санын қайтарсын (жол түбірден өтпеуі мүмкін). Бос ағаш және бір түйін — 0. Бір рекурсиялық аралау: әр түйін биіктігін қайтарады, ал жол ұзындығын <code>сол биіктік + оң биіктік</code> арқылы жаңартады — O(n).</p>\n<pre><code>        1\n       / \\\n      2   3        → 3   (4 → 2 → 1 → 3 немесе 5 → 2 → 1 → 3)\n     / \\\n    4   5</code></pre>",
   "starter": "class TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef diameter(root):\n    pass\n",
   "solution": "class TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef diameter(root):\n    best = 0\n    def h(n):\n        nonlocal best\n        if n is None:\n            return 0\n        l, r = h(n.left), h(n.right)\n        best = max(best, l + r)\n        return 1 + max(l, r)\n    h(root)\n    return best\n",
   "hints": [
    "Көмекші <code>h(n)</code> биіктікті қайтарады (бос — 0).",
    "Әр түйінде <code>l + r</code> — осы түйін арқылы өтетін ең ұзын жолдың қыр саны; максимумды <code>nonlocal</code> айнымалыда сақтаңыз."
   ],
   "check": {
    "tests": "\n_t = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3))\nassert diameter(_t) == 3, 'Күтілгені 3'\nassert diameter(None) == 0, 'Бос ағаш: 0'\nassert diameter(TreeNode(1)) == 0, 'Бір түйін: 0'\nassert diameter(TreeNode(1, TreeNode(2))) == 1, 'Екі түйін: 1'\n_deep = TreeNode(1, TreeNode(2, TreeNode(3, TreeNode(4), None), TreeNode(5, None, TreeNode(6, None, TreeNode(7)))), TreeNode(8))\nassert diameter(_deep) == 5, 'Ең ұзын жол түбірден өтпейді: 4 → 3 → 2 → 5 → 6 → 7, 5 қыр'\n"
   }
  }
 ],
 "dsa-11": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ең кіші k сан",
   "prompt": "<p><code>smallest_k(nums, k)</code> ең кіші <code>k</code> санды <b>өсу</b> ретімен қайтарсын. <code>heapq</code> қолданыңыз (<code>heapify</code> + <code>k</code> рет <code>heappop</code>, немесе <code>nsmallest</code>). <code>k</code> тізім ұзындығынан үлкен болса — барлығы.</p>\n<pre><code>smallest_k([5, 1, 9, 3, 7], 2) → [1, 3]\nsmallest_k([4, 2], 5)          → [2, 4]</code></pre>",
   "starter": "import heapq\n\ndef smallest_k(nums, k):\n    pass\n",
   "solution": "import heapq\n\ndef smallest_k(nums, k):\n    h = list(nums)\n    heapq.heapify(h)\n    return [heapq.heappop(h) for _ in range(min(k, len(h)))]\n",
   "hints": [
    "<code>heapq.heapify(h)</code> O(n), әр <code>heappop</code> O(log n).",
    "<code>min(k, len(h))</code> рет алыңыз."
   ],
   "check": {
    "tests": "\nassert smallest_k([5, 1, 9, 3, 7], 2) == [1, 3], 'Күтілгені [1, 3]'\nassert smallest_k([4, 2], 5) == [2, 4], 'k > n: барлығы сұрыпталған'\nassert smallest_k([], 3) == [], 'Бос тізім: []'\nassert smallest_k([3, 1, 2], 0) == [], 'k = 0: []'\nassert smallest_k([2, 2, 1], 2) == [1, 2], 'Қайталанулар: [1, 2]'\n_a = [3, 1, 2]; smallest_k(_a, 2)\nassert _a == [3, 1, 2], 'Бастапқы тізімді өзгертпеңіз'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Тастарды соқтығыстыру",
   "prompt": "<p>Әр қадамда ең ауыр екі тасты (<code>x ≤ y</code>) соқтығыстырамыз: тең болса екеуі де жойылады, әйтпесе салмағы <code>y − x</code> тас қалады. <code>last_stone(stones)</code> соңғы қалған тастың салмағын (тас қалмаса 0) қайтарсын. <code>heapq</code> — min-heap, сондықтан салмақтарды теріс таңбамен сақтаңыз.</p>\n<pre><code>last_stone([2, 7, 4, 1, 8, 1]) → 1\nlast_stone([3, 3])             → 0</code></pre>",
   "starter": "import heapq\n\ndef last_stone(stones):\n    pass\n",
   "solution": "import heapq\n\ndef last_stone(stones):\n    h = [-s for s in stones]\n    heapq.heapify(h)\n    while len(h) > 1:\n        y = -heapq.heappop(h)\n        x = -heapq.heappop(h)\n        if y != x:\n            heapq.heappush(h, -(y - x))\n    return -h[0] if h else 0\n",
   "hints": [
    "Max-heap: <code>h = [-s for s in stones]</code>.",
    "Екі тас алып, айырма нөл болмаса, <code>-(y − x)</code>-ті қайта салыңыз."
   ],
   "check": {
    "tests": "\nassert last_stone([2, 7, 4, 1, 8, 1]) == 1, 'Күтілгені 1'\nassert last_stone([3, 3]) == 0, 'Тең тастар жойылады: 0'\nassert last_stone([5]) == 5, 'Бір тас: 5'\nassert last_stone([]) == 0, 'Тас жоқ: 0'\nassert last_stone([10, 4, 2, 10]) == 2, 'Күтілгені 2'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "k-шы ең үлкен",
   "prompt": "<p><code>kth_largest(nums, k)</code> <code>k</code>-шы ең үлкен элементті қайтарсын (қайталанулар есептеледі). Өлшемі <code>k</code> min-heap ұстаңыз: оның төбесі — жауап. O(n log k). <code>sorted</code> қолданбаңыз.</p>\n<pre><code>kth_largest([3, 2, 1, 5, 6, 4], 2) → 5\nkth_largest([3, 3, 3, 1], 3)       → 3</code></pre>",
   "starter": "import heapq\n\ndef kth_largest(nums, k):\n    pass\n",
   "solution": "import heapq\n\ndef kth_largest(nums, k):\n    h = []\n    for x in nums:\n        heapq.heappush(h, x)\n        if len(h) > k:\n            heapq.heappop(h)\n    return h[0]\n",
   "hints": [
    "Әр элементті салыңыз; heap <code>k</code>-дан үлкейсе, ең кішісін <code>heappop</code>.",
    "Соңында <code>h[0]</code>."
   ],
   "check": {
    "tests": "\nassert kth_largest([3, 2, 1, 5, 6, 4], 2) == 5, 'Күтілгені 5'\nassert kth_largest([3, 3, 3, 1], 3) == 3, 'Қайталанулар есептеледі: 3'\nassert kth_largest([7], 1) == 7, 'Бір элемент'\nassert kth_largest([1, 2, 3], 3) == 1, 'k = n: минимум'\nassert kth_largest([-1, -5, -3], 1) == -1, 'Теріс сандар: -1'\nimport random as _random\n_rng = _random.Random(1)\n_big = [_rng.randint(0, 10**6) for _ in range(50000)]\nassert kth_largest(_big, 100) == sorted(_big)[-100], 'Үлкен тестте қате'\n",
    "mustInclude": [
     "heap"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең жиі k сөз",
   "prompt": "<p><code>top_words(words, k)</code> ең жиі кездесетін <code>k</code> сөзді қайтарсын: жиілік бойынша кему, жиілігі тең болса — сөз бойынша өсу (жолдарды <code>&lt;</code> арқылы салыстыру). Сөздікпен санап, <code>heapq</code> арқылы <code>(-жиілік, сөз)</code> бойынша <code>k</code> элемент алыңыз.</p>\n<pre><code>top_words(['ит', 'мысық', 'ит', 'ат', 'мысық', 'ит'], 2) → ['ит', 'мысық']\ntop_words(['б', 'а', 'в'], 2)                         → ['а', 'б']</code></pre>",
   "starter": "import heapq\n\ndef top_words(words, k):\n    pass\n",
   "solution": "import heapq\n\ndef top_words(words, k):\n    cnt = {}\n    for w in words:\n        cnt[w] = cnt.get(w, 0) + 1\n    h = [(-c, w) for w, c in cnt.items()]\n    heapq.heapify(h)\n    return [heapq.heappop(h)[1] for _ in range(min(k, len(h)))]\n",
   "hints": [
    "Heap элементі <code>(-жиілік, сөз)</code>: кортеждер алдымен жиілік, сосын сөз бойынша салыстырылады."
   ],
   "check": {
    "tests": "\nassert top_words(['ит', 'мысық', 'ит', 'ат', 'мысық', 'ит'], 2) == ['ит', 'мысық'], \"Күтілгені ['ит', 'мысық']\"\nassert top_words(['б', 'а', 'в'], 2) == ['а', 'б'], \"Тең жиілік: ['а', 'б']\"\nassert top_words([], 3) == [], 'Бос тізім: []'\nassert top_words(['x', 'y'], 5) == ['x', 'y'], 'k сөз санынан көп: барлығы'\nassert top_words(['day', 'is', 'the', 'day', 'the', 'is', 'sunny', 'the', 'is', 'the'], 4) == ['the', 'is', 'day', 'sunny'], 'Күтілгені the, is, day, sunny'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Арқандарды біріктіру",
   "prompt": "<p>Ұзындықтары <code>ropes</code> арқандарды бір арқанға біріктіру керек. Екі арқанды біріктіру құны — олардың ұзындықтарының қосындысы. <code>min_cost(ropes)</code> ең аз жалпы құнды қайтарсын. Greedy + heap: әр қадамда ең қысқа екі арқанды біріктіріңіз. Бір немесе нөл арқан — 0.</p>\n<pre><code>min_cost([4, 3, 2, 6]) → 29    # 2+3=5, 4+5=9, 6+9=15; 5+9+15=29\nmin_cost([5])          → 0</code></pre>",
   "starter": "import heapq\n\ndef min_cost(ropes):\n    pass\n",
   "solution": "import heapq\n\ndef min_cost(ropes):\n    h = list(ropes)\n    heapq.heapify(h)\n    total = 0\n    while len(h) > 1:\n        a = heapq.heappop(h)\n        b = heapq.heappop(h)\n        total += a + b\n        heapq.heappush(h, a + b)\n    return total\n",
   "hints": [
    "Екі ең кішісін <code>heappop</code>, қосындысын құнға қосып, қайта <code>heappush</code>."
   ],
   "check": {
    "tests": "\nassert min_cost([4, 3, 2, 6]) == 29, 'Күтілгені 29'\nassert min_cost([5]) == 0, 'Бір арқан: 0'\nassert min_cost([]) == 0, 'Арқан жоқ: 0'\nassert min_cost([1, 1]) == 2, 'Екі арқан: 2'\nassert min_cost([1, 2, 3, 4, 5]) == 33, 'Күтілгені 33'\nimport time as _time\n_t0 = _time.perf_counter(); _r = min_cost([1] * 50000); _dt = _time.perf_counter() - _t0\nassert _dt < 1.5, f'{_dt:.2f} с: heap арқылы O(n log n) шешім керек'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең жақын k нүкте",
   "prompt": "<p>Қаланың орталығы <code>(0, 0)</code>. <code>closest_points(points, k)</code> орталыққа ең жақын <code>k</code> нүктені (Евклид қашықтығы бойынша) қайтарсын: қашықтық бойынша өсу, тең болса нүкте кортежі бойынша өсу. Түбір алудың қажеті жоқ: <code>x² + y²</code> салыстырыңыз. <code>heapq</code> қолданыңыз.</p>\n<pre><code>closest_points([(1, 3), (-2, 2), (5, 0)], 1) → [(-2, 2)]\nclosest_points([(3, 3), (5, -1), (-2, 4)], 2) → [(3, 3), (-2, 4)]</code></pre>",
   "starter": "import heapq\n\ndef closest_points(points, k):\n    pass\n",
   "solution": "import heapq\n\ndef closest_points(points, k):\n    return [p for d, p in heapq.nsmallest(k, ((x * x + y * y, (x, y)) for x, y in points))]\n",
   "hints": [
    "Кортеж <code>(x² + y², (x, y))</code> бірден дұрыс ретті береді.",
    "<code>heapq.nsmallest(k, ...)</code> — O(n log k)."
   ],
   "check": {
    "tests": "\nassert closest_points([(1, 3), (-2, 2), (5, 0)], 1) == [(-2, 2)], 'Күтілгені [(-2, 2)]'\nassert closest_points([(3, 3), (5, -1), (-2, 4)], 2) == [(3, 3), (-2, 4)], 'Күтілгені [(3, 3), (-2, 4)]'\nassert closest_points([], 2) == [], 'Нүкте жоқ: []'\nassert closest_points([(1, 0), (0, 1), (-1, 0)], 2) == [(-1, 0), (0, 1)], 'Тең қашықтық: кортеж бойынша өсу'\nassert closest_points([(2, 2)], 5) == [(2, 2)], 'k нүктеден көп: барлығы'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ағымдағы медиана",
   "prompt": "<p>Ауа райы станциясы температураны бір-бірлеп жібереді. <code>MedianFinder</code> класы: <code>add(x)</code> — санды қосады, <code>median()</code> — осы уақытқа дейінгі сандардың медианасын қайтарады (сан жұп болса — екі ортаңғының арифметикалық ортасы, <code>float</code>). Екі heap: кіші жартысы үшін max-heap (теріс таңбамен), үлкен жартысы үшін min-heap; өлшемдерін теңгеріп отырыңыз. Әр амал O(log n). Сан жоқ болса <code>median()</code> — <code>None</code>.</p>\n<pre><code>m = MedianFinder()\nm.add(5); m.median() → 5\nm.add(-3); m.median() → 1.0\nm.add(10); m.median() → 5</code></pre>",
   "starter": "import heapq\n\nclass MedianFinder:\n    def __init__(self):\n        pass\n\n    def add(self, x):\n        pass\n\n    def median(self):\n        pass\n",
   "solution": "import heapq\n\nclass MedianFinder:\n    def __init__(self):\n        self.lo = []   # max-heap (теріс)\n        self.hi = []   # min-heap\n\n    def add(self, x):\n        heapq.heappush(self.lo, -x)\n        heapq.heappush(self.hi, -heapq.heappop(self.lo))\n        if len(self.hi) > len(self.lo):\n            heapq.heappush(self.lo, -heapq.heappop(self.hi))\n\n    def median(self):\n        if not self.lo:\n            return None\n        if len(self.lo) > len(self.hi):\n            return -self.lo[0]\n        return (-self.lo[0] + self.hi[0]) / 2\n",
   "hints": [
    "Жаңа санды <code>lo</code>-ға салып, <code>lo</code>-ның ең үлкенін <code>hi</code>-ға көшіріңіз; <code>hi</code> үлкейіп кетсе, бір элементті кері қайтарыңыз.",
    "Тақ санда медиана — <code>-lo[0]</code>, жұпта — <code>(-lo[0] + hi[0]) / 2</code>."
   ],
   "check": {
    "tests": "\n_m = MedianFinder()\nassert _m.median() is None, 'Сан жоқ: None'\n_m.add(5); assert _m.median() == 5, 'Бір сан: 5'\n_m.add(-3); assert _m.median() == 1.0, '5 және -3: 1.0'\n_m.add(10); assert _m.median() == 5, '-3, 5, 10: 5'\n_m.add(7); assert _m.median() == 6.0, '-3, 5, 7, 10: 6.0'\nimport random as _random, time as _time\n_rng = _random.Random(2)\n_m2 = MedianFinder(); _seen = []\nfor _ in range(200):\n    _x = _rng.randint(-50, 50); _m2.add(_x); _seen.append(_x)\n    _s = sorted(_seen); _n = len(_s)\n    _exp = _s[_n // 2] if _n % 2 else (_s[_n // 2 - 1] + _s[_n // 2]) / 2\n    assert _m2.median() == _exp, f'{len(_seen)} сан қосылғанда медиана {_exp} болуы керек'\n_m3 = MedianFinder(); _t0 = _time.perf_counter()\nfor _i in range(30000):\n    _m3.add(_rng.randint(0, 10**6)); _m3.median()\nassert _time.perf_counter() - _t0 < 2.0, 'Әр амал O(log n) болуы керек (әр жолы сұрыптамаңыз)'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Көршілес әріптер бөлек",
   "prompt": "<p><code>rearrange(s)</code> жолдың әріптерін қатар тұрған екі таңба бірдей болмайтындай етіп қайта орналастырсын. Мүмкін болмаса <code>''</code> қайтарыңыз. Кез келген дұрыс жауап қабылданады. Greedy + max-heap: әр қадамда ең көп қалған әріпті алыңыз, бірақ алдыңғы қадамдағы әріпті бір қадам кейін ғана heap-ке қайтарыңыз.</p>\n<pre><code>rearrange('aab')  → 'aba'\nrearrange('aaab') → ''</code></pre>",
   "starter": "import heapq\n\ndef rearrange(s):\n    pass\n",
   "solution": "import heapq\n\ndef rearrange(s):\n    cnt = {}\n    for ch in s:\n        cnt[ch] = cnt.get(ch, 0) + 1\n    h = [(-c, ch) for ch, c in cnt.items()]\n    heapq.heapify(h)\n    out = []\n    prev = None\n    while h:\n        c, ch = heapq.heappop(h)\n        out.append(ch)\n        if prev:\n            heapq.heappush(h, prev)\n            prev = None\n        if c + 1 < 0:\n            prev = (c + 1, ch)\n    if prev:\n        return ''\n    return ''.join(out)\n",
   "hints": [
    "Heap: <code>(-саны, әріп)</code>.",
    "Алынған әріпті бірден қайтармай, <code>prev</code>-те ұстаңыз, келесі әріп алынғаннан кейін ғана қайтарыңыз; соңында <code>prev</code> қалса — мүмкін емес."
   ],
   "check": {
    "tests": "\ndef _valid(src, out):\n    return sorted(src) == sorted(out) and all(a != b for a, b in zip(out, out[1:]))\nassert _valid('aab', rearrange('aab')), \"rearrange('aab') 'aba' болуы керек\"\nassert rearrange('aaab') == '', \"Мүмкін емес: ''\"\nassert rearrange('') == '', \"Бос жол: ''\"\nassert rearrange('z') == 'z', 'Бір таңба'\nassert rearrange('aa') == '', \"rearrange('aa') ''\"\nimport random as _random\n_rng = _random.Random(3)\nfor _ in range(60):\n    _s = ''.join(_rng.choice('ққаб') for _ in range(_rng.randint(1, 12)))\n    _mx = max(_s.count(c) for c in set(_s))\n    _r = rearrange(_s)\n    if _mx > (len(_s) + 1) // 2:\n        assert _r == '', f'{_s!r} үшін мүмкін емес: \\'\\' күтілді'\n    else:\n        assert _valid(_s, _r), f'{_s!r} үшін дұрыс орналастыру табылмады: {_r!r}'\n"
   }
  }
 ],
 "dsa-12": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ең көп жолы бар қала",
   "prompt": "<p><code>roads</code> — қалалар арасындағы екі бағытты жолдар тізімі <code>(a, b)</code>. <code>busiest_city(roads)</code> ең көп жолға қосылған қаланы қайтарсын (дәрежесі ең үлкен төбе); тең болса — атауы бойынша ең кішісін (<code>&lt;</code>). Жол жоқ болса <code>None</code>.</p>\n<pre><code>busiest_city([('Алматы', 'Қонаев'), ('Алматы', 'Талдықорған'), ('Қонаев', 'Талдықорған'), ('Астана', 'Қарағанды')])\n→ 'Алматы'</code></pre>",
   "starter": "def busiest_city(roads):\n    pass\n",
   "solution": "def busiest_city(roads):\n    deg = {}\n    for a, b in roads:\n        deg[a] = deg.get(a, 0) + 1\n        deg[b] = deg.get(b, 0) + 1\n    best = None\n    for c in deg:\n        if best is None or deg[c] > deg[best] or (deg[c] == deg[best] and c < best):\n            best = c\n    return best\n",
   "hints": [
    "Әр жол екі қаланың дәрежесін де 1-ге арттырады.",
    "Тең дәрежеде атауы кіші қаланы таңдаңыз."
   ],
   "check": {
    "tests": "\n_r = [('Алматы', 'Қонаев'), ('Алматы', 'Талдықорған'), ('Қонаев', 'Талдықорған'), ('Астана', 'Қарағанды')]\nassert busiest_city(_r) == 'Алматы', \"Алматы, Қонаев, Талдықорған дәрежесі 2: атауы ең кіші 'Алматы'\"\nassert busiest_city([]) is None, 'Жол жоқ: None'\nassert busiest_city([('Б', 'А')]) == 'А', \"Тең дәреже: 'А'\"\nassert busiest_city([('Орал', 'Атырау'), ('Ақтөбе', 'Атырау'), ('Ақтау', 'Атырау')]) == 'Атырау', \"'Атырау' дәрежесі 3\"\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жол бар ма",
   "prompt": "<p><code>n</code> аялдама (<code>0..n−1</code>) және екі бағытты жолдар <code>edges</code>. <code>has_path(n, edges, s, t)</code>: <code>s</code>-тан <code>t</code>-ға жетуге болса <code>True</code>. BFS немесе DFS (<code>visited</code> ұмытпаңыз).</p>\n<pre><code>has_path(4, [(0, 1), (1, 2)], 0, 2) → True\nhas_path(4, [(0, 1), (1, 2)], 0, 3) → False</code></pre>",
   "starter": "from collections import deque\n\ndef has_path(n, edges, s, t):\n    pass\n",
   "solution": "from collections import deque\n\ndef has_path(n, edges, s, t):\n    adj = [[] for _ in range(n)]\n    for a, b in edges:\n        adj[a].append(b)\n        adj[b].append(a)\n    seen = [False] * n\n    seen[s] = True\n    q = deque([s])\n    while q:\n        u = q.popleft()\n        if u == t:\n            return True\n        for v in adj[u]:\n            if not seen[v]:\n                seen[v] = True\n                q.append(v)\n    return False\n",
   "hints": [
    "Көршілер тізімін құрыңыз (екі жаққа да).",
    "BFS барысында <code>t</code>-ға жетсеңіз — <code>True</code>."
   ],
   "check": {
    "tests": "\nassert has_path(4, [(0, 1), (1, 2)], 0, 2) is True, '0 → 1 → 2: True'\nassert has_path(4, [(0, 1), (1, 2)], 0, 3) is False, '3 оқшау: False'\nassert has_path(1, [], 0, 0) is True, 's = t: True'\nassert has_path(3, [(0, 1), (1, 0), (1, 2)], 2, 0) is True, 'Екі бағытты: 2 → 1 → 0'\n_n = 100000; _e = [(i, i + 1) for i in range(_n - 1)]\nassert has_path(_n, _e, 0, _n - 1) is True, '100 000 төбелі тізбек: True (рекурсия емес, стек/кезек қолданыңыз)'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Дәл k қадамдағы төбелер",
   "prompt": "<p>Әлеуметтік желі: <code>adj</code> — сөздік, адам → достар тізімі (екі жақты). <code>at_distance(adj, start, k)</code> <code>start</code>-тан ең қысқа қашықтығы <b>дәл</b> <code>k</code> болатын адамдарды сұрыпталған тізім ретінде қайтарсын. BFS.</p>\n<pre><code>adj = {'Ата': ['Бек', 'Сая'], 'Бек': ['Ата', 'Дос'], 'Сая': ['Ата', 'Дос'], 'Дос': ['Бек', 'Сая', 'Ерж'], 'Ерж': ['Дос']}\nat_distance(adj, 'Ата', 2) → ['Дос']\nat_distance(adj, 'Ата', 0) → ['Ата']</code></pre>",
   "starter": "from collections import deque\n\ndef at_distance(adj, start, k):\n    pass\n",
   "solution": "from collections import deque\n\ndef at_distance(adj, start, k):\n    dist = {start: 0}\n    q = deque([start])\n    while q:\n        u = q.popleft()\n        if dist[u] == k:\n            continue\n        for v in adj.get(u, []):\n            if v not in dist:\n                dist[v] = dist[u] + 1\n                q.append(v)\n    return sorted(v for v, d in dist.items() if d == k)\n",
   "hints": [
    "Сабақтағы <code>bfs_dist</code>: <code>dist</code> сөздігі.",
    "Нәтиже: <code>dist[v] == k</code> болатын төбелер, сұрыпталған."
   ],
   "check": {
    "tests": "\n_adj = {'Ата': ['Бек', 'Сая'], 'Бек': ['Ата', 'Дос'], 'Сая': ['Ата', 'Дос'], 'Дос': ['Бек', 'Сая', 'Ерж'], 'Ерж': ['Дос']}\nassert at_distance(_adj, 'Ата', 2) == ['Дос'], \"Дос — 2 қадам (екі жолмен де): ['Дос']\"\nassert at_distance(_adj, 'Ата', 0) == ['Ата'], \"k = 0: ['Ата']\"\nassert at_distance(_adj, 'Ата', 1) == ['Бек', 'Сая'], \"k = 1: ['Бек', 'Сая']\"\nassert at_distance(_adj, 'Ата', 3) == ['Ерж'], \"k = 3: ['Ерж']\"\nassert at_distance(_adj, 'Ата', 9) == [], 'Ондай алыс адам жоқ: []'\nassert at_distance({'Жан': []}, 'Жан', 1) == [], 'Досы жоқ адам: []'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Екі топқа бөлу",
   "prompt": "<p>Футбол турнирінде <code>n</code> команда (<code>0..n−1</code>), <code>edges</code> — бір-бірімен ойнайтын жұптар. Барлық командаларды екі лигаға бөлу керек: әр ойын <b>әртүрлі</b> лигадағы командалар арасында болсын. <code>can_split(n, edges)</code> мүмкін болса <code>True</code> (граф екі үлесті). Әр компонентті BFS-пен 0/1 түске бояңыз; көршінің түсі бірдей болса — <code>False</code>.</p>\n<pre><code>can_split(4, [(0, 1), (1, 2), (2, 3), (3, 0)]) → True\ncan_split(3, [(0, 1), (1, 2), (2, 0)])         → False</code></pre>",
   "starter": "from collections import deque\n\ndef can_split(n, edges):\n    pass\n",
   "solution": "from collections import deque\n\ndef can_split(n, edges):\n    adj = [[] for _ in range(n)]\n    for a, b in edges:\n        adj[a].append(b)\n        adj[b].append(a)\n    color = [-1] * n\n    for s in range(n):\n        if color[s] != -1:\n            continue\n        color[s] = 0\n        q = deque([s])\n        while q:\n            u = q.popleft()\n            for v in adj[u]:\n                if color[v] == -1:\n                    color[v] = 1 - color[u]\n                    q.append(v)\n                elif color[v] == color[u]:\n                    return False\n    return True\n",
   "hints": [
    "<code>color = [-1] * n</code>; әр боялмаған төбеден жаңа BFS бастаңыз (граф байланыссыз болуы мүмкін).",
    "Көршіге <code>1 − color[u]</code>; бұрын боялған көршінің түсі бірдей болса — қақтығыс."
   ],
   "check": {
    "tests": "\nassert can_split(4, [(0, 1), (1, 2), (2, 3), (3, 0)]) is True, 'Жұп цикл: True'\nassert can_split(3, [(0, 1), (1, 2), (2, 0)]) is False, 'Тақ цикл: False'\nassert can_split(1, []) is True, 'Бір команда: True'\nassert can_split(5, [(0, 1), (2, 3), (3, 4), (4, 2)]) is False, 'Екінші компонентте тақ цикл: False'\nassert can_split(2, [(0, 0)]) is False, 'Өзімен ойын: False'\nassert can_split(6, [(0, 1), (2, 3), (4, 5)]) is True, 'Бірнеше компонент: True'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бағытталған цикл",
   "prompt": "<p>Тапсырмалар арасында тәуелділіктер бар: <code>(a, b)</code> — «<code>a</code>-дан <code>b</code>-ға» бағытталған қыр. <code>has_cycle(n, edges)</code> бағытталған графта цикл болса <code>True</code>. DFS үш түспен: 0 — көрілмеген, 1 — қазір стекте (жолда), 2 — толық бітті. 1-түсті төбеге қайта келсек — цикл. Терең рекурсиядан сақ болыңыз: <code>n</code> 10 000-ға дейін.</p>\n<pre><code>has_cycle(3, [(0, 1), (1, 2), (2, 0)]) → True\nhas_cycle(3, [(0, 1), (0, 2), (1, 2)]) → False</code></pre>",
   "starter": "def has_cycle(n, edges):\n    pass\n",
   "solution": "def has_cycle(n, edges):\n    adj = [[] for _ in range(n)]\n    for a, b in edges:\n        adj[a].append(b)\n    color = [0] * n\n    for s in range(n):\n        if color[s]:\n            continue\n        stack = [(s, 0)]\n        color[s] = 1\n        while stack:\n            u, i = stack[-1]\n            if i < len(adj[u]):\n                stack[-1] = (u, i + 1)\n                v = adj[u][i]\n                if color[v] == 1:\n                    return True\n                if color[v] == 0:\n                    color[v] = 1\n                    stack.append((v, 0))\n            else:\n                color[u] = 2\n                stack.pop()\n    return False\n",
   "hints": [
    "Бағытсыз графтан айырмашылығы: бітірілген (2-түсті) төбеге келу цикл емес.",
    "Рекурсиясыз DFS: стекте <code>(төбе, келесі көршінің индексі)</code> жұбын ұстаңыз."
   ],
   "check": {
    "tests": "\nassert has_cycle(3, [(0, 1), (1, 2), (2, 0)]) is True, '0 → 1 → 2 → 0: True'\nassert has_cycle(3, [(0, 1), (0, 2), (1, 2)]) is False, 'Ромб пішінді, цикл жоқ: False'\nassert has_cycle(1, [(0, 0)]) is True, 'Өзіне қыр: True'\nassert has_cycle(4, []) is False, 'Қыр жоқ: False'\nassert has_cycle(4, [(0, 1), (2, 3), (3, 2)]) is True, 'Екінші компонентте цикл: True'\nassert has_cycle(2, [(0, 1), (0, 1)]) is False, 'Қайталанған қыр цикл емес'\n_n = 10000; _e = [(i, i + 1) for i in range(_n - 1)]\nassert has_cycle(_n, _e) is False, '10 000 төбелі тізбек: False (рекурсия шегінен асып кетпеңіз)'\nassert has_cycle(_n, _e + [(_n - 1, 0)]) is True, 'Тізбек соңы басына қосылса: True'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бұл ағаш па",
   "prompt": "<p><code>n</code> ауыл және <code>edges</code> бағытсыз жолдар. Жол желісі <b>ағаш</b> бола ма: барлық ауыл байланысқан және цикл жоқ? <code>is_tree(n, edges)</code> қайтарсын. Кеңес: ағашта дәл <code>n − 1</code> қыр бар; қыр саны дұрыс болса, байланыстылықты BFS-пен тексеру жеткілікті.</p>\n<pre><code>is_tree(5, [(0, 1), (0, 2), (0, 3), (1, 4)]) → True\nis_tree(5, [(0, 1), (1, 2), (2, 3), (1, 3), (1, 4)]) → False</code></pre>",
   "starter": "from collections import deque\n\ndef is_tree(n, edges):\n    pass\n",
   "solution": "from collections import deque\n\ndef is_tree(n, edges):\n    if len(edges) != n - 1:\n        return False\n    adj = [[] for _ in range(n)]\n    for a, b in edges:\n        adj[a].append(b)\n        adj[b].append(a)\n    seen = {0}\n    q = deque([0])\n    while q:\n        u = q.popleft()\n        for v in adj[u]:\n            if v not in seen:\n                seen.add(v)\n                q.append(v)\n    return len(seen) == n\n",
   "hints": [
    "Алдымен <code>len(edges) == n − 1</code>.",
    "0-төбеден BFS: барлық <code>n</code> төбеге жетсек — ағаш."
   ],
   "check": {
    "tests": "\nassert is_tree(5, [(0, 1), (0, 2), (0, 3), (1, 4)]) is True, 'Ағаш: True'\nassert is_tree(5, [(0, 1), (1, 2), (2, 3), (1, 3), (1, 4)]) is False, 'Цикл бар: False'\nassert is_tree(1, []) is True, 'Бір ауыл: True'\nassert is_tree(2, []) is False, 'Байланыспаған: False'\nassert is_tree(4, [(0, 1), (1, 0), (2, 3)]) is False, 'n − 1 қыр, бірақ байланыспаған: False'\nassert is_tree(3, [(0, 1), (1, 2), (0, 2)]) is False, 'Қыр саны көп: False'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Сөз баспалдағы",
   "prompt": "<p><code>begin</code> сөзінен <code>end</code> сөзіне әр қадамда бір әріпті ауыстырып жетеміз; әр аралық сөз <code>words</code> сөздігінде болуы керек (<code>begin</code> сөздікте болмауы мүмкін). <code>ladder_length(begin, end, words)</code> тізбектегі сөздер санын (екі шетін қоса) қайтарсын, мүмкін болмаса 0. BFS: көршілерді табу үшін әр позицияға әр әріпті қойып, <code>set</code>-тен тексеріңіз.</p>\n<pre><code>ladder_length('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']) → 5\n# hit → hot → dot → dog → cog\nladder_length('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log'])        → 0</code></pre>",
   "starter": "from collections import deque\n\ndef ladder_length(begin, end, words):\n    pass\n",
   "solution": "from collections import deque\n\ndef ladder_length(begin, end, words):\n    ws = set(words)\n    if end not in ws:\n        return 0\n    if begin == end:\n        return 1\n    letters = set(''.join(words))\n    dist = {begin: 1}\n    q = deque([begin])\n    while q:\n        w = q.popleft()\n        for i in range(len(w)):\n            for ch in letters:\n                nw = w[:i] + ch + w[i + 1:]\n                if nw in ws and nw not in dist:\n                    dist[nw] = dist[w] + 1\n                    if nw == end:\n                        return dist[nw]\n                    q.append(nw)\n    return 0\n",
   "hints": [
    "Әр сөз — төбе, бір әріппен ерекшеленетін сөздер — көршілер.",
    "Әріптер жиыны ретінде сөздіктегі әріптерді алыңыз: сонда кириллица да жұмыс істейді."
   ],
   "check": {
    "tests": "\nassert ladder_length('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']) == 5, 'Күтілгені 5'\nassert ladder_length('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log']) == 0, 'end сөздікте жоқ: 0'\nassert ladder_length('қар', 'тар', ['тар']) == 2, \"қар → тар: 2\"\nassert ladder_length('ат', 'ит', ['ақ', 'ик']) == 0, 'Жол жоқ: 0'\nassert ladder_length('ат', 'ит', ['ит', 'ат']) == 2, 'begin сөздікте болса да: 2'\nassert ladder_length('кел', 'кел', ['кел']) == 1, 'begin = end: 1'\nassert ladder_length('тау', 'сай', ['тай', 'сау', 'сай']) == 3, 'тау → тай → сай: 3'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ат жүрісі",
   "prompt": "<p><code>n × n</code> шахмат тақтасында ат <code>start = (r, c)</code> ұяшығынан <code>target</code>-қа ең аз неше жүрісте жетеді? <code>knight_moves(n, start, target)</code> қайтарсын; жету мүмкін болмаса <code>-1</code>. Ат «Г» әрпімен жүреді: 8 бағыт <code>(±1, ±2)</code>, <code>(±2, ±1)</code>. Тор — граф, BFS.</p>\n<pre><code>knight_moves(8, (0, 0), (7, 7)) → 6\nknight_moves(8, (0, 0), (0, 0)) → 0\nknight_moves(2, (0, 0), (1, 1)) → -1</code></pre>",
   "starter": "from collections import deque\n\ndef knight_moves(n, start, target):\n    pass\n",
   "solution": "from collections import deque\n\ndef knight_moves(n, start, target):\n    if start == target:\n        return 0\n    dist = {start: 0}\n    q = deque([start])\n    moves = ((1, 2), (2, 1), (-1, 2), (-2, 1), (1, -2), (2, -1), (-1, -2), (-2, -1))\n    while q:\n        r, c = q.popleft()\n        for dr, dc in moves:\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < n and 0 <= nc < n and (nr, nc) not in dist:\n                dist[(nr, nc)] = dist[(r, c)] + 1\n                if (nr, nc) == target:\n                    return dist[(nr, nc)]\n                q.append((nr, nc))\n    return -1\n",
   "hints": [
    "Сегіз жүрісті кортеж ретінде жазып алыңыз.",
    "Шекараны тексеріп, әр ұяшыққа бір рет кіріңіз; <code>start == target</code> жағдайы — 0."
   ],
   "check": {
    "tests": "\nassert knight_moves(8, (0, 0), (7, 7)) == 6, '8×8 тақтада бұрыштан бұрышқа 6'\nassert knight_moves(8, (0, 0), (0, 0)) == 0, 'Бір ұяшық: 0'\nassert knight_moves(2, (0, 0), (1, 1)) == -1, '2×2 тақтада ат қозғала алмайды: -1'\nassert knight_moves(3, (0, 0), (1, 1)) == -1, '3×3 тақтада ортаға жету мүмкін емес: -1'\nassert knight_moves(8, (0, 0), (1, 2)) == 1, 'Бір жүріс'\nassert knight_moves(8, (0, 0), (1, 1)) == 4, '(0, 0) → (1, 1): 4'\nassert knight_moves(1, (0, 0), (0, 0)) == 0, '1×1 тақта: 0'\nassert knight_moves(100, (0, 0), (99, 99)) == 66, '100×100: 66'\n"
   }
  }
 ],
 "dsa-13": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Трибоначчи сандары",
   "prompt": "<p><code>T(0) = 0, T(1) = 1, T(2) = 1</code>, ал <code>T(n) = T(n−1) + T(n−2) + T(n−3)</code>. <code>trib(n)</code> мәнін DP арқылы O(n) уақытта есептесін (жай рекурсия экспоненциалды!). <code>n</code> 1000-ға дейін.</p>\n<pre><code>trib(4)  → 4\ntrib(25) → 1389537</code></pre>",
   "starter": "def trib(n):\n    pass\n",
   "solution": "def trib(n):\n    a, b, c = 0, 1, 1\n    for _ in range(n):\n        a, b, c = b, c, a + b + c\n    return a\n",
   "hints": [
    "Тек соңғы үш мәнді сақтау жеткілікті.",
    "<code>a, b, c = b, c, a + b + c</code>."
   ],
   "check": {
    "tests": "\nassert trib(0) == 0 and trib(1) == 1 and trib(2) == 1, 'Бастапқы мәндер: 0, 1, 1'\nassert trib(3) == 2, 'trib(3) 2'\nassert trib(4) == 4, 'trib(4) 4'\nassert trib(25) == 1389537, 'trib(25) 1389537'\n_v = [0, 1, 1]\nfor _ in range(997):\n    _v.append(_v[-1] + _v[-2] + _v[-3])\nassert trib(999) == _v[999], 'trib(999) қате'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Көршілес емес күндер",
   "prompt": "<p>Жәрмеңке күндері <code>income[i]</code> пайда әкеледі, бірақ қатарынан екі күн жұмыс істеуге болмайды. <code>best_income(income)</code> ең үлкен жалпы пайданы қайтарсын. DP: <code>dp[i] = max(dp[i−1], dp[i−2] + income[i])</code>. Бос тізім — 0.</p>\n<pre><code>best_income([2, 7, 9, 3, 1]) → 12    # 2 + 9 + 1\nbest_income([5, 1, 1, 5])    → 10</code></pre>",
   "starter": "def best_income(income):\n    pass\n",
   "solution": "def best_income(income):\n    prev, cur = 0, 0\n    for x in income:\n        prev, cur = cur, max(cur, prev + x)\n    return cur\n",
   "hints": [
    "Екі айнымалы: «алдыңғы күнге дейінгі ең жақсы» және «одан бір күн бұрынғы ең жақсы»."
   ],
   "check": {
    "tests": "\nassert best_income([2, 7, 9, 3, 1]) == 12, 'Күтілгені 12'\nassert best_income([5, 1, 1, 5]) == 10, 'Күтілгені 10 (бірінші және соңғы күн)'\nassert best_income([]) == 0, 'Бос тізім: 0'\nassert best_income([4]) == 4, 'Бір күн: 4'\nassert best_income([1, 2]) == 2, 'Екі күн: 2'\nimport random as _random\nfrom itertools import product as _prod\n_rng = _random.Random(5)\nfor _ in range(30):\n    _a = [_rng.randint(0, 20) for _ in range(_rng.randint(0, 10))]\n    _exp = max(sum(x for x, m in zip(_a, mask) if m) for mask in _prod([0, 1], repeat=len(_a)) if all(not (p and q) for p, q in zip(mask, mask[1:])))\n    assert best_income(_a) == _exp, f'best_income({_a}) {_exp} болуы керек'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Баспалдақтың құны",
   "prompt": "<p><code>cost[i]</code> — <code>i</code>-сатыға басу құны. 0- немесе 1-сатыдан бастауға болады, әр қадамда 1 немесе 2 саты көтерілесіз. Шыңға (соңғы сатыдан кейінгі орын) жету үшін ең аз құн: <code>min_climb_cost(cost)</code>. <code>dp[i] = cost[i] + min(dp[i−1], dp[i−2])</code>.</p>\n<pre><code>min_climb_cost([10, 15, 20])                         → 15\nmin_climb_cost([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]) → 6</code></pre>",
   "starter": "def min_climb_cost(cost):\n    pass\n",
   "solution": "def min_climb_cost(cost):\n    a, b = 0, 0\n    for c in cost:\n        a, b = b, c + min(a, b)\n    return min(a, b)\n",
   "hints": [
    "Шыңға соңғы немесе соңғының алдындағы сатыдан шығуға болады: жауап <code>min(dp[n−1], dp[n−2])</code>."
   ],
   "check": {
    "tests": "\nassert min_climb_cost([10, 15, 20]) == 15, 'Күтілгені 15'\nassert min_climb_cost([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]) == 6, 'Күтілгені 6'\nassert min_climb_cost([5, 3]) == 3, 'Екі саты: 3'\nassert min_climb_cost([0, 0, 0]) == 0, 'Тегін сатылар: 0'\nassert min_climb_cost([7]) == 0, 'Бір саты: 1-сатыдан (шыңнан) бастаймыз, 0'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Тиындармен тәсілдер саны",
   "prompt": "<p><code>coin_ways(coins, amount)</code> — <code>amount</code> теңгені <code>coins</code> номиналдарымен (әрқайсысы шексіз) неше <b>тәсілмен</b> жинауға болады? Рет маңызды емес: <code>1+2</code> мен <code>2+1</code> — бір тәсіл. DP: сыртқы цикл тиындар бойынша, ішкі цикл сомалар бойынша.</p>\n<pre><code>coin_ways([1, 2, 5], 5) → 4\ncoin_ways([2], 3)       → 0\ncoin_ways([10], 0)      → 1</code></pre>",
   "starter": "def coin_ways(coins, amount):\n    pass\n",
   "solution": "def coin_ways(coins, amount):\n    dp = [1] + [0] * amount\n    for c in coins:\n        for s in range(c, amount + 1):\n            dp[s] += dp[s - c]\n    return dp[amount]\n",
   "hints": [
    "<code>dp[0] = 1</code> — бос жиын.",
    "Тиындар сыртқы циклде болса, әр жиын бір рет саналады (рет ескерілмейді)."
   ],
   "check": {
    "tests": "\nassert coin_ways([1, 2, 5], 5) == 4, 'Күтілгені 4'\nassert coin_ways([2], 3) == 0, 'Жинау мүмкін емес: 0'\nassert coin_ways([10], 0) == 1, 'amount = 0: бір тәсіл (ештеңе алмау)'\nassert coin_ways([], 0) == 1 and coin_ways([], 5) == 0, 'Тиын жоқ'\nassert coin_ways([1, 2], 4) == 3, '1111, 112, 22: 3'\ndef _ref(cs, a, i=0):\n    if a == 0: return 1\n    if i == len(cs) or a < 0: return 0\n    return _ref(cs, a - cs[i], i) + _ref(cs, a, i + 1)\nfor _c, _a in [([2, 3, 7], 20), ([1, 3, 4], 12), ([5, 10], 30)]:\n    assert coin_ways(_c, _a) == _ref(_c, _a), f'coin_ways({_c}, {_a}) {_ref(_c, _a)} болуы керек'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Кедергілі тордағы жолдар",
   "prompt": "<p>Қала картасы: <code>grid[i][j] == 1</code> — жол жабық, <code>0</code> — ашық. Курьер сол жақ жоғарғы бұрыштан оң жақ төменгі бұрышқа тек <b>оңға</b> немесе <b>төмен</b> жүреді. <code>count_paths(grid)</code> әртүрлі жолдар санын қайтарсын (бұрыштардың бірі жабық болса — 0). DP: <code>dp[i][j] = dp[i−1][j] + dp[i][j−1]</code>.</p>\n<pre><code>count_paths([[0, 0, 0],\n             [0, 1, 0],\n             [0, 0, 0]]) → 2</code></pre>",
   "starter": "def count_paths(grid):\n    pass\n",
   "solution": "def count_paths(grid):\n    R, C = len(grid), len(grid[0])\n    dp = [0] * C\n    dp[0] = 1 if grid[0][0] == 0 else 0\n    for i in range(R):\n        for j in range(C):\n            if grid[i][j] == 1:\n                dp[j] = 0\n            elif j > 0:\n                dp[j] += dp[j - 1]\n    return dp[C - 1]\n",
   "hints": [
    "Бір жолдық <code>dp</code> массиві жеткілікті: <code>dp[j]</code> — жоғарғы ұяшықтан, <code>dp[j−1]</code> — сол жақтан.",
    "Жабық ұяшықта <code>dp[j] = 0</code>."
   ],
   "check": {
    "tests": "\nassert count_paths([[0, 0, 0], [0, 1, 0], [0, 0, 0]]) == 2, 'Күтілгені 2'\nassert count_paths([[0]]) == 1, 'Бір ұяшық: 1'\nassert count_paths([[1]]) == 0, 'Бастау жабық: 0'\nassert count_paths([[0, 0], [0, 1]]) == 0, 'Соңы жабық: 0'\nassert count_paths([[0, 1], [1, 0]]) == 0, 'Жол жоқ: 0'\nassert count_paths([[0] * 5 for _ in range(5)]) == 70, '5×5 бос тор: C(8, 4) = 70'\nassert count_paths([[0, 0, 0, 0]]) == 1, 'Бір жол: 1'\nassert count_paths([[0] * 18 for _ in range(18)]) == 2333606220, '18×18 бос тор: C(34, 17)'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең ұзын ортақ ішкі тізбек",
   "prompt": "<p><code>lcs(a, b)</code> екі жолдың ең ұзын ортақ ішкі тізбегінің (таңбалар ретімен, бірақ міндетті түрде қатар емес) ұзындығын қайтарсын. 2D DP: <code>a[i] == b[j]</code> болса <code>dp[i+1][j+1] = dp[i][j] + 1</code>, әйтпесе <code>max(dp[i][j+1], dp[i+1][j])</code>. O(n·m).</p>\n<pre><code>lcs('abcde', 'ace') → 3\nlcs('абай', 'абылай') → 4\nlcs('abc', 'def')   → 0</code></pre>",
   "starter": "def lcs(a, b):\n    pass\n",
   "solution": "def lcs(a, b):\n    m = len(b)\n    prev = [0] * (m + 1)\n    for x in a:\n        cur = [0] * (m + 1)\n        for j in range(m):\n            cur[j + 1] = prev[j] + 1 if x == b[j] else max(prev[j + 1], cur[j])\n        prev = cur\n    return prev[m]\n",
   "hints": [
    "<code>dp[i][j]</code> — <code>a[:i]</code> мен <code>b[:j]</code>-ның жауабы; <code>dp[0][*] = dp[*][0] = 0</code>.",
    "Жадты үнемдеу үшін тек алдыңғы жолды сақтауға болады."
   ],
   "check": {
    "tests": "\nassert lcs('abcde', 'ace') == 3, 'Күтілгені 3'\nassert lcs('абай', 'абылай') == 4, 'Күтілгені 4 (а, б, а, й)'\nassert lcs('abc', 'def') == 0, 'Ортақ таңба жоқ: 0'\nassert lcs('', 'abc') == 0, 'Бос жол: 0'\nassert lcs('aaa', 'aa') == 2, 'Күтілгені 2'\nimport random as _random, time as _time\n_rng = _random.Random(6)\ndef _ref(a, b):\n    from functools import lru_cache\n    @lru_cache(None)\n    def f(i, j):\n        if i == len(a) or j == len(b): return 0\n        if a[i] == b[j]: return 1 + f(i + 1, j + 1)\n        return max(f(i + 1, j), f(i, j + 1))\n    return f(0, 0)\nfor _ in range(30):\n    _a = ''.join(_rng.choice('абв') for _ in range(_rng.randint(0, 9)))\n    _b = ''.join(_rng.choice('абв') for _ in range(_rng.randint(0, 9)))\n    assert lcs(_a, _b) == _ref(_a, _b), f'lcs({_a!r}, {_b!r}) {_ref(_a, _b)} болуы керек'\n_a = ''.join(_rng.choice('ACGT') for _ in range(600)); _b = ''.join(_rng.choice('ACGT') for _ in range(600))\n_t0 = _time.perf_counter(); lcs(_a, _b); _dt = _time.perf_counter() - _t0\nassert _dt < 3.0, f'600×600 үшін {_dt:.2f} с: O(n·m) DP керек'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Сөздерге бөлу",
   "prompt": "<p>Бос орынсыз жазылған хабарлама <code>s</code> және сөздік <code>words</code>. <code>can_split(s, words)</code>: <code>s</code>-ты сөздіктегі сөздерге (қайталап қолдануға болады) толық бөлуге болса <code>True</code>. DP: <code>dp[i]</code> — <code>s[:i]</code> бөлінеді ме; <code>dp[i] = True</code>, егер <code>dp[j]</code> және <code>s[j:i]</code> сөздікте болатын <code>j</code> бар болса. Сөздікті <code>set</code>-ке салыңыз.</p>\n<pre><code>can_split('алмаағаш', ['алма', 'ағаш'])         → True\ncan_split('қызылорда', ['қызыл', 'орда', 'қыз']) → True\ncan_split('ақсай', ['ақ', 'сары'])               → False</code></pre>",
   "starter": "def can_split(s, words):\n    pass\n",
   "solution": "def can_split(s, words):\n    ws = set(words)\n    lens = set(len(w) for w in ws)\n    n = len(s)\n    dp = [False] * (n + 1)\n    dp[0] = True\n    for i in range(1, n + 1):\n        for L in lens:\n            if L <= i and dp[i - L] and s[i - L:i] in ws:\n                dp[i] = True\n                break\n    return dp[n]\n",
   "hints": [
    "<code>dp[0] = True</code> — бос префикс.",
    "Тексеруді жылдамдату үшін тек сөздіктегі сөз ұзындықтарын қарастырыңыз."
   ],
   "check": {
    "tests": "\nassert can_split('алмаағаш', ['алма', 'ағаш']) is True, \"can_split('алмаағаш', ...) True\"\nassert can_split('қызылорда', ['қызыл', 'орда', 'қыз']) is True, \"can_split('қызылорда', ...) True\"\nassert can_split('ақсай', ['ақ', 'сары']) is False, \"can_split('ақсай', ...) False\"\nassert can_split('', ['а']) is True, 'Бос жол: True'\nassert can_split('aaaa', ['aa']) is True, 'Сөзді қайталауға болады'\nassert can_split('aaa', ['aa']) is False, \"can_split('aaa', ['aa']) False\"\nassert can_split('catsandog', ['cats', 'dog', 'sand', 'and', 'cat']) is False, 'catsandog: False'\nimport time as _time\n_s = 'a' * 400 + 'b'\n_t0 = _time.perf_counter(); _r = can_split(_s, ['a', 'aa', 'aaa', 'aaaa', 'aaaaa']); _dt = _time.perf_counter() - _t0\nassert _r is False and _dt < 1.0, f'Экспоненциалды рекурсия емес, DP керек ({_dt:.2f} с)'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ең үлкен шаршы",
   "prompt": "<p>Егістік картасы: <code>'1'</code> — құнарлы жер, <code>'0'</code> — тасты жер (жолдар тізімі). <code>max_square(grid)</code> тек құнарлы жерден тұратын ең үлкен шаршының <b>ауданын</b> қайтарсын. DP: <code>dp[i][j]</code> — оң жақ төменгі бұрышы <code>(i, j)</code> болатын ең үлкен шаршының қабырғасы; <code>dp[i][j] = 1 + min(жоғарғы, сол, сол-жоғарғы)</code>.</p>\n<pre><code>max_square(['10100',\n            '10111',\n            '11111',\n            '10010']) → 4</code></pre>",
   "starter": "def max_square(grid):\n    pass\n",
   "solution": "def max_square(grid):\n    if not grid:\n        return 0\n    R, C = len(grid), len(grid[0])\n    dp = [[0] * (C + 1) for _ in range(R + 1)]\n    best = 0\n    for i in range(R):\n        for j in range(C):\n            if grid[i][j] == '1':\n                dp[i + 1][j + 1] = 1 + min(dp[i][j + 1], dp[i + 1][j], dp[i][j])\n                best = max(best, dp[i + 1][j + 1])\n    return best * best\n",
   "hints": [
    "Шетінде нөлдер тұратын <code>(R+1) × (C+1)</code> кесте шекараны тексеруден құтқарады.",
    "Жауап — қабырғаның квадраты."
   ],
   "check": {
    "tests": "\nassert max_square(['10100', '10111', '11111', '10010']) == 4, 'Күтілгені 4'\nassert max_square(['0']) == 0, 'Құнарлы жер жоқ: 0'\nassert max_square(['1']) == 1, 'Бір ұяшық: 1'\nassert max_square(['11', '11']) == 4, '2×2 толық: 4'\nassert max_square(['01', '10']) == 1, 'Диагональ шаршы емес: 1'\nassert max_square(['1111', '1111', '1101']) == 4, '3×3 толық емес: 4'\nimport random as _random\n_rng = _random.Random(7)\nfor _ in range(20):\n    _R, _C = _rng.randint(1, 6), _rng.randint(1, 6)\n    _g = [''.join(_rng.choice('1110') for _ in range(_C)) for _ in range(_R)]\n    _best = 0\n    for _i in range(_R):\n        for _j in range(_C):\n            _k = 1\n            while _i + _k <= _R and _j + _k <= _C and all(_g[a][b] == '1' for a in range(_i, _i + _k) for b in range(_j, _j + _k)):\n                _best = max(_best, _k); _k += 1\n    assert max_square(_g) == _best * _best, f'{_g} үшін күтілгені {_best * _best}'\n"
   }
  }
 ],
 "dsa-p1": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жұпсыз қалған сан",
   "prompt": "<p>Гардеробтағы әр нөмірлік жұбымен қайтарылды, тек біреуі жалғыз қалды. <code>single(nums)</code>: тізімде әр сан дәл екі рет, тек біреуі бір рет кездеседі — соны қайтарыңыз. O(n) уақыт, O(1) жад: XOR (<code>^</code>) амалы — <code>x ^ x = 0</code>, <code>x ^ 0 = x</code>.</p>\n<pre><code>single([4, 1, 2, 1, 2]) → 4\nsingle([7])             → 7</code></pre>",
   "starter": "def single(nums):\n    pass\n",
   "solution": "def single(nums):\n    r = 0\n    for x in nums:\n        r ^= x\n    return r\n",
   "hints": [
    "Барлық санды XOR-лаңыз: жұптар бір-бірін жояды."
   ],
   "check": {
    "tests": "\nassert single([4, 1, 2, 1, 2]) == 4, 'Күтілгені 4'\nassert single([7]) == 7, 'Бір сан: 7'\nassert single([-3, 5, 5]) == -3, 'Теріс сан: -3'\nassert single([0, 9, 9]) == 0, 'Жалғыз сан 0 болуы мүмкін'\n_big = list(range(1, 50001)) * 2 + [123456]\nassert single(_big) == 123456, 'Үлкен тест: 123456'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Тепе-теңдік индексі",
   "prompt": "<p><code>balance_index(nums)</code> сол жағындағы элементтер қосындысы оң жағындағыға тең болатын ең кіші индексті қайтарсын (индекстегі элементтің өзі екі жаққа да кірмейді; шеттегі бос жақтың қосындысы 0). Ондай индекс жоқ болса <code>-1</code>. Prefix sum: O(n).</p>\n<pre><code>balance_index([1, 7, 3, 6, 5, 6]) → 3    # 1+7+3 = 11 = 5+6\nbalance_index([1, 2, 3])          → -1\nbalance_index([2, 1, -1])         → 0</code></pre>",
   "starter": "def balance_index(nums):\n    pass\n",
   "solution": "def balance_index(nums):\n    total = sum(nums)\n    left = 0\n    for i, x in enumerate(nums):\n        if left == total - left - x:\n            return i\n        left += x\n    return -1\n",
   "hints": [
    "Жалпы қосынды <code>total</code> белгілі болса, оң жақ = <code>total − left − nums[i]</code>."
   ],
   "check": {
    "tests": "\nassert balance_index([1, 7, 3, 6, 5, 6]) == 3, 'Күтілгені 3'\nassert balance_index([1, 2, 3]) == -1, 'Жоқ: -1'\nassert balance_index([2, 1, -1]) == 0, 'Сол жақ бос (0) = 1 + (-1): 0'\nassert balance_index([]) == -1, 'Бос тізім: -1'\nassert balance_index([5]) == 0, 'Бір элемент: екі жақ та 0'\nassert balance_index([0, 0, 0]) == 0, 'Ең кіші индекс: 0'\nimport time as _time\n_big = [1] * 100001\n_t0 = _time.perf_counter(); _r = balance_index(_big); _dt = _time.perf_counter() - _t0\nassert _r == 50000 and _dt < 1.0, f'Үлкен тест: 50000, O(n) ({_dt:.2f} с)'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Санға бір қосу",
   "prompt": "<p>Үлкен сан цифрлар тізімі ретінде берілген (бірінші — ең үлкен разряд). <code>plus_one(digits)</code> санға 1 қосылған нәтижені дәл сондай тізім ретінде қайтарсын. Санды <code>int</code>-ке айналдырмаңыз: соңынан тасымалмен жүріңіз.</p>\n<pre><code>plus_one([1, 2, 9]) → [1, 3, 0]\nplus_one([9, 9])    → [1, 0, 0]\nplus_one([0])       → [1]</code></pre>",
   "starter": "def plus_one(digits):\n    pass\n",
   "solution": "def plus_one(digits):\n    d = list(digits)\n    i = len(d) - 1\n    while i >= 0 and d[i] == 9:\n        d[i] = 0\n        i -= 1\n    if i < 0:\n        return [1] + d\n    d[i] += 1\n    return d\n",
   "hints": [
    "Соңындағы 9-дарды 0-ге айналдырып, бірінші 9 емес цифрды 1-ге арттырыңыз.",
    "Барлығы 9 болса, басына 1 қосылады."
   ],
   "check": {
    "tests": "\nassert plus_one([1, 2, 9]) == [1, 3, 0], 'Күтілгені [1, 3, 0]'\nassert plus_one([9, 9]) == [1, 0, 0], 'Күтілгені [1, 0, 0]'\nassert plus_one([0]) == [1], 'Күтілгені [1]'\nassert plus_one([4, 3, 2, 1]) == [4, 3, 2, 2], 'Күтілгені [4, 3, 2, 2]'\n_d = [1, 9]; plus_one(_d)\nassert _d == [1, 9], 'Бастапқы тізімді өзгертпеңіз'\nassert plus_one([9] * 1000) == [1] + [0] * 1000, '1000 тоғыз: 1 және 1000 нөл'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең үлкен табыс кезеңі",
   "prompt": "<p><code>profit[i]</code> — дүкеннің <code>i</code>-күнгі пайдасы (теріс — шығын). <code>max_period(profit)</code> қатарынан келетін бос емес күндер кезеңінің ең үлкен жалпы пайдасын қайтарсын. Kadane алгоритмі: O(n) — ағымдағы қосынды теріс болса, жаңадан бастаңыз.</p>\n<pre><code>max_period([-2, 1, -3, 4, -1, 2, 1, -5, 4]) → 6     # 4, -1, 2, 1\nmax_period([-3, -1, -2])                    → -1</code></pre>",
   "starter": "def max_period(profit):\n    pass\n",
   "solution": "def max_period(profit):\n    best = cur = profit[0]\n    for x in profit[1:]:\n        cur = max(x, cur + x)\n        best = max(best, cur)\n    return best\n",
   "hints": [
    "<code>cur = max(x, cur + x)</code> — осы күнде аяқталатын ең жақсы кезең.",
    "Бастапқы мән <code>profit[0]</code>: барлығы теріс болса да дұрыс."
   ],
   "check": {
    "tests": "\nassert max_period([-2, 1, -3, 4, -1, 2, 1, -5, 4]) == 6, 'Күтілгені 6'\nassert max_period([-3, -1, -2]) == -1, 'Барлығы теріс: ең кіші шығын -1'\nassert max_period([5]) == 5, 'Бір күн: 5'\nassert max_period([5, 4, -1, 7, 8]) == 23, 'Барлық күн: 23'\nimport random as _random, time as _time\n_rng = _random.Random(1)\nfor _ in range(40):\n    _a = [_rng.randint(-10, 10) for _ in range(_rng.randint(1, 12))]\n    _exp = max(sum(_a[i:j]) for i in range(len(_a)) for j in range(i + 1, len(_a) + 1))\n    assert max_period(_a) == _exp, f'max_period({_a}) {_exp} болуы керек'\n_big = [_rng.randint(-100, 100) for _ in range(200000)]\n_t0 = _time.perf_counter(); max_period(_big); _dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'{_dt:.2f} с: O(n) Kadane керек'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Спиральмен аралау",
   "prompt": "<p><code>spiral(matrix)</code> матрица элементтерін спираль бойынша қайтарсын: жоғарғы жол солдан оңға, оң баған жоғарыдан төмен, төменгі жол оңнан солға, сол баған төменнен жоғары, сосын ішке. Матрица тікбұрышты болуы мүмкін; бос матрица — <code>[]</code>. Төрт шекара: <code>top, bottom, left, right</code>.</p>\n<pre><code>spiral([[1, 2, 3],\n        [4, 5, 6],\n        [7, 8, 9]]) → [1, 2, 3, 6, 9, 8, 7, 4, 5]\nspiral([[1, 2, 3, 4]]) → [1, 2, 3, 4]</code></pre>",
   "starter": "def spiral(matrix):\n    pass\n",
   "solution": "def spiral(matrix):\n    res = []\n    if not matrix or not matrix[0]:\n        return res\n    top, bottom, left, right = 0, len(matrix) - 1, 0, len(matrix[0]) - 1\n    while top <= bottom and left <= right:\n        for j in range(left, right + 1):\n            res.append(matrix[top][j])\n        for i in range(top + 1, bottom + 1):\n            res.append(matrix[i][right])\n        if top < bottom:\n            for j in range(right - 1, left - 1, -1):\n                res.append(matrix[bottom][j])\n        if left < right:\n            for i in range(bottom - 1, top, -1):\n                res.append(matrix[i][left])\n        top += 1; bottom -= 1; left += 1; right -= 1\n    return res\n",
   "hints": [
    "Әр айналымнан кейін төрт шекараны ішке жылжытыңыз.",
    "Бір жол немесе бір баған қалғанда элементтерді екі рет алмау үшін <code>top &lt; bottom</code>, <code>left &lt; right</code> тексеріңіз."
   ],
   "check": {
    "tests": "\nassert spiral([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) == [1, 2, 3, 6, 9, 8, 7, 4, 5], 'Күтілгені [1, 2, 3, 6, 9, 8, 7, 4, 5]'\nassert spiral([[1, 2, 3, 4]]) == [1, 2, 3, 4], 'Бір жол'\nassert spiral([[1], [2], [3]]) == [1, 2, 3], 'Бір баған'\nassert spiral([]) == [], 'Бос матрица: []'\nassert spiral([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]) == [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7], '3×4 матрица қате'\nassert spiral([[1, 2], [3, 4], [5, 6]]) == [1, 2, 4, 6, 5, 3], '3×2 матрица қате'\n_m = [[i * 7 + j for j in range(7)] for i in range(5)]\n_r = spiral(_m)\nassert sorted(_r) == list(range(35)) and _r[:8] == [0, 1, 2, 3, 4, 5, 6, 13], '5×7 матрицада әр элемент бір рет болуы керек'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Паскаль үшбұрышының жолы",
   "prompt": "<p><code>pascal_row(n)</code> Паскаль үшбұрышының <code>n</code>-жолын (0-ден санағанда) қайтарсын: әр сан — үстіндегі екі санның қосындысы, шеттері 1. Тек бір жолды сақтап, O(n²) уақыт, O(n) жад. Факториал формуласын қолданбаңыз.</p>\n<pre><code>pascal_row(0) → [1]\npascal_row(4) → [1, 4, 6, 4, 1]</code></pre>",
   "starter": "def pascal_row(n):\n    pass\n",
   "solution": "def pascal_row(n):\n    row = [1]\n    for _ in range(n):\n        row = [1] + [row[i] + row[i + 1] for i in range(len(row) - 1)] + [1]\n    return row\n",
   "hints": [
    "Келесі жол: <code>[1] + [row[i] + row[i+1] ...] + [1]</code>."
   ],
   "check": {
    "tests": "\nassert pascal_row(0) == [1], 'pascal_row(0) [1]'\nassert pascal_row(1) == [1, 1], 'pascal_row(1) [1, 1]'\nassert pascal_row(4) == [1, 4, 6, 4, 1], 'pascal_row(4) [1, 4, 6, 4, 1]'\nfrom math import comb as _comb\nassert pascal_row(30) == [_comb(30, k) for k in range(31)], 'pascal_row(30) қате'\nassert sum(pascal_row(60)) == 2 ** 60, 'Жол қосындысы 2^n болуы керек'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "k-ға бөлінетін кезеңдер",
   "prompt": "<p><code>count_divisible(nums, k)</code> қосындысы <code>k</code>-ға бөлінетін (қалдығы 0) бос емес қатар ішкі тізімдер санын қайтарсын. Prefix sum + сөздік: екі префикстің <code>k</code>-ға бөлгендегі қалдықтары тең болса, олардың арасындағы ішкі тізім <code>k</code>-ға бөлінеді. Python-да <code>%</code> теріс санға да теріс емес қалдық береді. O(n).</p>\n<pre><code>count_divisible([4, 5, 0, -2, -3, 1], 5) → 7\ncount_divisible([5], 9)                  → 0</code></pre>",
   "starter": "def count_divisible(nums, k):\n    pass\n",
   "solution": "def count_divisible(nums, k):\n    seen = {0: 1}\n    s = 0\n    total = 0\n    for x in nums:\n        s = (s + x) % k\n        total += seen.get(s, 0)\n        seen[s] = seen.get(s, 0) + 1\n    return total\n",
   "hints": [
    "<code>seen = {0: 1}</code> — бос префикс.",
    "Әр қадамда: <code>total += seen.get(s, 0)</code>, сосын <code>seen[s] += 1</code>."
   ],
   "check": {
    "tests": "\nassert count_divisible([4, 5, 0, -2, -3, 1], 5) == 7, 'Күтілгені 7'\nassert count_divisible([5], 9) == 0, 'Күтілгені 0'\nassert count_divisible([], 3) == 0, 'Бос тізім: 0'\nassert count_divisible([3, 3, 3], 3) == 6, 'Барлық 6 ішкі тізім бөлінеді'\nassert count_divisible([-1, 1], 2) == 1, 'Теріс сандар: [-1, 1] қосындысы 0'\nimport random as _random, time as _time\n_rng = _random.Random(2)\nfor _ in range(40):\n    _a = [_rng.randint(-10, 10) for _ in range(_rng.randint(0, 12))]; _k = _rng.randint(1, 6)\n    _exp = sum(1 for i in range(len(_a)) for j in range(i + 1, len(_a) + 1) if sum(_a[i:j]) % _k == 0)\n    assert count_divisible(_a, _k) == _exp, f'count_divisible({_a}, {_k}) {_exp} болуы керек'\n_big = [_rng.randint(-1000, 1000) for _ in range(100000)]\n_t0 = _time.perf_counter(); count_divisible(_big, 7); _dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'{_dt:.2f} с: O(n) шешім керек'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Тең дауыс кезеңі",
   "prompt": "<p>Сайлау учаскесінде дауыстар уақыт ретімен келді: <code>'А'</code> немесе <code>'Б'</code> кандидатына. <code>longest_tie(votes)</code> екі кандидат <b>тең</b> дауыс алған ең ұзын қатар кезеңнің ұзындығын қайтарсын. <code>'А'</code> = +1, <code>'Б'</code> = −1 деп, prefix sum-ның әр мәні <b>бірінші</b> рет қай индексте кездескенін сөздікте сақтаңыз. O(n).</p>\n<pre><code>longest_tie('ААББА') → 4    # 'ААББ'\nlongest_tie('ААА')   → 0\nlongest_tie('АББААБ') → 6</code></pre>",
   "starter": "def longest_tie(votes):\n    pass\n",
   "solution": "def longest_tie(votes):\n    first = {0: -1}\n    s = 0\n    best = 0\n    for i, v in enumerate(votes):\n        s += 1 if v == 'А' else -1\n        if s in first:\n            best = max(best, i - first[s])\n        else:\n            first[s] = i\n    return best\n",
   "hints": [
    "<code>first = {0: -1}</code> — бос префикс <code>-1</code> индексте.",
    "Префикс мәні бұрын кездессе, ұзындық <code>i − first[s]</code>; бірінші индексті жаңартпаңыз."
   ],
   "check": {
    "tests": "\nassert longest_tie('ААББА') == 4, 'Күтілгені 4'\nassert longest_tie('ААА') == 0, 'Тең кезең жоқ: 0'\nassert longest_tie('АББААБ') == 6, 'Бүкіл тізбек: 6'\nassert longest_tie('') == 0, 'Бос: 0'\nassert longest_tie('АБ') == 2, 'Күтілгені 2'\nimport random as _random, time as _time\n_rng = _random.Random(3)\nfor _ in range(40):\n    _v = ''.join(_rng.choice('АБ') for _ in range(_rng.randint(0, 14)))\n    _exp = max([j - i for i in range(len(_v)) for j in range(i + 1, len(_v) + 1) if _v[i:j].count('А') * 2 == j - i] + [0])\n    assert longest_tie(_v) == _exp, f'longest_tie({_v!r}) {_exp} болуы керек'\n_big = ''.join(_rng.choice('АБ') for _ in range(200000))\n_t0 = _time.perf_counter(); longest_tie(_big); _dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'{_dt:.2f} с: O(n) шешім керек'\n"
   }
  }
 ],
 "dsa-p2": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Келесі үлкен баға",
   "prompt": "<p><code>next_greater(prices)</code> әр күн үшін одан кейінгі <b>бірінші</b> қатаң үлкен бағаны қайтарсын; ондай жоқ болса <code>-1</code>. Monotonic stack: стекте әлі жауабы табылмаған индекстерді ұстаңыз. O(n).</p>\n<pre><code>next_greater([2, 1, 2, 4, 3]) → [4, 2, 4, -1, -1]\nnext_greater([5, 5])          → [-1, -1]</code></pre>",
   "starter": "def next_greater(prices):\n    pass\n",
   "solution": "def next_greater(prices):\n    res = [-1] * len(prices)\n    st = []\n    for i, x in enumerate(prices):\n        while st and prices[st[-1]] < x:\n            res[st.pop()] = x\n        st.append(i)\n    return res\n",
   "hints": [
    "Жаңа баға стектің төбесіндегіден үлкен болса, сол индекстің жауабы — осы баға.",
    "Тең баға «үлкен» емес: салыстыру <code>&lt;</code>."
   ],
   "check": {
    "tests": "\nassert next_greater([2, 1, 2, 4, 3]) == [4, 2, 4, -1, -1], 'Күтілгені [4, 2, 4, -1, -1]'\nassert next_greater([5, 5]) == [-1, -1], 'Тең баға үлкен емес: [-1, -1]'\nassert next_greater([]) == [], 'Бос тізім: []'\nassert next_greater([1, 2, 3]) == [2, 3, -1], 'Өсуші: [2, 3, -1]'\nimport random as _random, time as _time\n_rng = _random.Random(1)\nfor _ in range(40):\n    _a = [_rng.randint(0, 9) for _ in range(_rng.randint(0, 12))]\n    _exp = [next((y for y in _a[i + 1:] if y > x), -1) for i, x in enumerate(_a)]\n    assert next_greater(_a) == _exp, f'next_greater({_a}) {_exp} болуы керек'\n_big = list(range(100000, 0, -1))\n_t0 = _time.perf_counter(); next_greater(_big); _dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'{_dt:.2f} с: monotonic stack арқылы O(n) керек'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Терезедегі дауыстылар",
   "prompt": "<p><code>max_vowels(s, k)</code> ұзындығы дәл <code>k</code> болатын ішкі жолдардағы дауысты әріптердің (<code>'аәеиоөұүыіэюяу'</code> және латынның <code>'aeiou'</code>) ең көп санын қайтарсын. Тұрақты өлшемді sliding window: терезеге кірген таңбаны қосып, шыққанын шегеріңіз. O(n). <code>k &gt; len(s)</code> болса 0.</p>\n<pre><code>max_vowels('қазақстан', 3) → 2\nmax_vowels('abciiidef', 3)  → 3</code></pre>",
   "starter": "VOWELS = set('аәеиоөұүыіэюяуaeiou')\n\ndef max_vowels(s, k):\n    pass\n",
   "solution": "VOWELS = set('аәеиоөұүыіэюяуaeiou')\n\ndef max_vowels(s, k):\n    if k > len(s) or k <= 0:\n        return 0\n    cur = sum(1 for ch in s[:k] if ch in VOWELS)\n    best = cur\n    for i in range(k, len(s)):\n        cur += (s[i] in VOWELS) - (s[i - k] in VOWELS)\n        best = max(best, cur)\n    return best\n",
   "hints": [
    "Алғашқы <code>k</code> таңбадағы санды есептеңіз.",
    "Әр қадамда <code>s[i]</code> кіреді, <code>s[i − k]</code> шығады."
   ],
   "check": {
    "tests": "\nassert max_vowels('қазақстан', 3) == 2, \"max_vowels('қазақстан', 3) 2\"\nassert max_vowels('abciiidef', 3) == 3, \"max_vowels('abciiidef', 3) 3\"\nassert max_vowels('ттт', 2) == 0, 'Дауысты жоқ: 0'\nassert max_vowels('аб', 5) == 0, 'k > len(s): 0'\nassert max_vowels('ауыл', 4) == 3, 'Бүкіл жол: 3'\nimport time as _time\n_s = 'бт' * 100000 + 'аа'\n_t0 = _time.perf_counter(); _r = max_vowels(_s, 1000); _dt = _time.perf_counter() - _t0\nassert _r == 2 and _dt < 1.0, f'Үлкен тест: 2 күтілді, O(n) терезе керек ({_dt:.2f} с)'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бастапқы пәндер",
   "prompt": "<p>Университетте <code>n</code> пән бар, <code>prereq</code> — <code>(a, b)</code> жұптары: «<code>b</code>-ны оқу үшін алдымен <code>a</code> керек». <code>starters(n, prereq)</code> бірден оқуға болатын (алғышарты жоқ, яғни кіріс дәрежесі 0) пәндерді өсу ретімен қайтарсын. Kahn алгоритмінің бірінші қадамы.</p>\n<pre><code>starters(4, [(0, 1), (1, 2), (3, 2)]) → [0, 3]\nstarters(2, [])                       → [0, 1]</code></pre>",
   "starter": "def starters(n, prereq):\n    pass\n",
   "solution": "def starters(n, prereq):\n    indeg = [0] * n\n    for a, b in prereq:\n        indeg[b] += 1\n    return [v for v in range(n) if indeg[v] == 0]\n",
   "hints": [
    "<code>indeg[b] += 1</code> әр <code>(a, b)</code> үшін."
   ],
   "check": {
    "tests": "\nassert starters(4, [(0, 1), (1, 2), (3, 2)]) == [0, 3], 'Күтілгені [0, 3]'\nassert starters(2, []) == [0, 1], 'Алғышарт жоқ: барлығы'\nassert starters(3, [(0, 1), (1, 2), (2, 0)]) == [], 'Цикл: бастайтын пән жоқ'\nassert starters(1, []) == [0], 'Бір пән: [0]'\nassert starters(3, [(0, 2), (1, 2), (0, 2)]) == [0, 1], 'Қайталанған қыр: [0, 1]'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең қысқа жеткілікті кезең",
   "prompt": "<p><code>sales</code> — оң сандар (күндік сатылым), <code>target</code> — жоспар. <code>min_days(sales, target)</code> қосындысы кемінде <code>target</code> болатын ең қысқа қатар кезеңнің ұзындығын қайтарсын; жоқ болса 0. Өзгермелі терезе: оң шекараны жылжытып, қосынды жеткілікті болғанша сол шекараны тартыңыз. O(n).</p>\n<pre><code>min_days([2, 3, 1, 2, 4, 3], 7) → 2     # [4, 3]\nmin_days([1, 1, 1], 5)          → 0</code></pre>",
   "starter": "def min_days(sales, target):\n    pass\n",
   "solution": "def min_days(sales, target):\n    best = 0\n    s = 0\n    lo = 0\n    for hi, x in enumerate(sales):\n        s += x\n        while s >= target:\n            if best == 0 or hi - lo + 1 < best:\n                best = hi - lo + 1\n            s -= sales[lo]\n            lo += 1\n    return best\n",
   "hints": [
    "Сандар оң: терезені кеңейту қосындыны арттырады, тарылту кемітеді — сондықтан терезе тәсілі дұрыс.",
    "Қосынды ≥ target болғанда ұзындықты жаңартып, сол шетті жылжытыңыз."
   ],
   "check": {
    "tests": "\nassert min_days([2, 3, 1, 2, 4, 3], 7) == 2, 'Күтілгені 2'\nassert min_days([1, 1, 1], 5) == 0, 'Жоспар орындалмайды: 0'\nassert min_days([1, 4, 4], 4) == 1, 'Бір күн жеткілікті: 1'\nassert min_days([], 1) == 0, 'Бос тізім: 0'\nassert min_days([1, 2, 3], 6) == 3, 'Барлық күн: 3'\nimport random as _random, time as _time\n_rng = _random.Random(2)\nfor _ in range(40):\n    _a = [_rng.randint(1, 9) for _ in range(_rng.randint(0, 12))]; _t = _rng.randint(1, 40)\n    _c = [j - i for i in range(len(_a)) for j in range(i + 1, len(_a) + 1) if sum(_a[i:j]) >= _t]\n    _exp = min(_c) if _c else 0\n    assert min_days(_a, _t) == _exp, f'min_days({_a}, {_t}) {_exp} болуы керек'\n_big = [_rng.randint(1, 100) for _ in range(200000)]\n_t0 = _time.perf_counter(); min_days(_big, 50000); _dt = _time.perf_counter() - _t0\nassert _dt < 1.5, f'{_dt:.2f} с: O(n) терезе керек'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "k ауыстырумен бірліктер",
   "prompt": "<p>Күн сайын жоспар орындалды (<code>1</code>) немесе орындалмады (<code>0</code>). Менеджер ең көбі <code>k</code> күнді «орындалды» деп түзете алады. <code>longest_ones(days, k)</code> түзетуден кейінгі ең ұзын қатар бірліктер кезеңінің ұзындығын қайтарсын. Sliding window: терезеде <code>k</code>-дан көп нөл болса, сол шекараны жылжытыңыз.</p>\n<pre><code>longest_ones([1, 1, 0, 0, 1, 1, 1, 0, 1], 1) → 5\nlongest_ones([0, 0, 0], 0)                   → 0</code></pre>",
   "starter": "def longest_ones(days, k):\n    pass\n",
   "solution": "def longest_ones(days, k):\n    lo = 0\n    zeros = 0\n    best = 0\n    for hi, d in enumerate(days):\n        if d == 0:\n            zeros += 1\n        while zeros > k:\n            if days[lo] == 0:\n                zeros -= 1\n            lo += 1\n        best = max(best, hi - lo + 1)\n    return best\n",
   "hints": [
    "Терезедегі нөлдер санын ұстаңыз.",
    "<code>zeros &gt; k</code> болғанша сол шетті жылжытыңыз, сосын ұзындықты жаңартыңыз."
   ],
   "check": {
    "tests": "\nassert longest_ones([1, 1, 0, 0, 1, 1, 1, 0, 1], 1) == 5, 'Күтілгені 5'\nassert longest_ones([0, 0, 0], 0) == 0, 'Түзету жоқ, бірлік жоқ: 0'\nassert longest_ones([0, 0, 0], 5) == 3, 'Барлығын түзетуге болады: 3'\nassert longest_ones([], 2) == 0, 'Бос тізім: 0'\nassert longest_ones([1, 1, 1], 0) == 3, 'Түзету керек емес: 3'\nimport random as _random\n_rng = _random.Random(3)\nfor _ in range(40):\n    _a = [_rng.randint(0, 1) for _ in range(_rng.randint(0, 14))]; _k = _rng.randint(0, 3)\n    _exp = max([j - i for i in range(len(_a)) for j in range(i + 1, len(_a) + 1) if _a[i:j].count(0) <= _k] + [0])\n    assert longest_ones(_a, _k) == _exp, f'longest_ones({_a}, {_k}) {_exp} болуы керек'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Баға аралығы",
   "prompt": "<p><code>spans(prices)</code>: әр күн үшін «бүгін қоса алғанда, артқа қарай қатарынан неше күн бағасы бүгінгіден аспады (<code>≤</code>)» — соны тізім ретінде қайтарыңыз. Monotonic stack: стекте <code>(баға, аралық)</code> жұптарын ұстап, кіші немесе тең бағаларды біріктіріңіз. O(n).</p>\n<pre><code>spans([100, 80, 60, 70, 60, 75, 85]) → [1, 1, 1, 2, 1, 4, 6]</code></pre>",
   "starter": "def spans(prices):\n    pass\n",
   "solution": "def spans(prices):\n    st = []\n    res = []\n    for p in prices:\n        span = 1\n        while st and st[-1][0] <= p:\n            span += st.pop()[1]\n        st.append((p, span))\n        res.append(span)\n    return res\n",
   "hints": [
    "Стектің төбесіндегі баға ≤ бүгінгі болса, оның аралығын бүгінгіге қосып, стектен алып тастаңыз."
   ],
   "check": {
    "tests": "\nassert spans([100, 80, 60, 70, 60, 75, 85]) == [1, 1, 1, 2, 1, 4, 6], 'Күтілгені [1, 1, 1, 2, 1, 4, 6]'\nassert spans([]) == [], 'Бос тізім: []'\nassert spans([5, 5, 5]) == [1, 2, 3], 'Тең бағалар да есептеледі: [1, 2, 3]'\nassert spans([3, 2, 1]) == [1, 1, 1], 'Кемитін бағалар: [1, 1, 1]'\nimport random as _random, time as _time\n_rng = _random.Random(4)\nfor _ in range(40):\n    _a = [_rng.randint(0, 9) for _ in range(_rng.randint(0, 12))]\n    _exp = []\n    for _i in range(len(_a)):\n        _j = _i\n        while _j >= 0 and _a[_j] <= _a[_i]: _j -= 1\n        _exp.append(_i - _j)\n    assert spans(_a) == _exp, f'spans({_a}) {_exp} болуы керек'\n_big = list(range(100000))\n_t0 = _time.perf_counter(); spans(_big); _dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'{_dt:.2f} с: O(n) стек керек'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Бөтен әліпби реті",
   "prompt": "<p>Белгісіз әліпбидегі сөздік: <code>words</code> сол әліпби бойынша сұрыпталған. <code>alien_order(words)</code> сөздерде кездесетін барлық әріптердің ретін жол ретінде қайтарсын. Көрші сөздердің бірінші айырмашылығы <code>a → b</code> қырын береді; топологиялық сұрыптау (Kahn). Бірнеше дұрыс рет болса, бірмәнді болу үшін кезекте әрқашан (Python бойынша) ең кіші әріпті алыңыз — <code>heapq</code>. Рет қайшылықты болса (цикл) немесе ұзын сөз өзінің префиксінен алдын тұрса — <code>''</code>.</p>\n<pre><code>alien_order(['wrt', 'wrf', 'er', 'ett', 'rftt']) → 'wertf'\nalien_order(['z', 'x', 'z'])                     → ''\nalien_order(['abc', 'ab'])                       → ''</code></pre>",
   "starter": "import heapq\n\ndef alien_order(words):\n    pass\n",
   "solution": "import heapq\n\ndef alien_order(words):\n    letters = set(''.join(words))\n    adj = {c: set() for c in letters}\n    indeg = {c: 0 for c in letters}\n    for w1, w2 in zip(words, words[1:]):\n        for a, b in zip(w1, w2):\n            if a != b:\n                if b not in adj[a]:\n                    adj[a].add(b)\n                    indeg[b] += 1\n                break\n        else:\n            if len(w1) > len(w2):\n                return ''\n    h = [c for c in letters if indeg[c] == 0]\n    heapq.heapify(h)\n    out = []\n    while h:\n        c = heapq.heappop(h)\n        out.append(c)\n        for d in adj[c]:\n            indeg[d] -= 1\n            if indeg[d] == 0:\n                heapq.heappush(h, d)\n    return ''.join(out) if len(out) == len(letters) else ''\n",
   "hints": [
    "Тек көрші сөздер жұбын салыстыру жеткілікті; бірінші айырмашылықтан кейін тоқтаңыз.",
    "Kahn: кіріс дәрежесі 0 әріптерді heap-ке салыңыз; соңында барлық әріп шықпаса — цикл."
   ],
   "check": {
    "tests": "\nassert alien_order(['wrt', 'wrf', 'er', 'ett', 'rftt']) == 'wertf', \"Күтілгені 'wertf'\"\nassert alien_order(['z', 'x', 'z']) == '', \"Цикл: ''\"\nassert alien_order(['abc', 'ab']) == '', \"Префикс кейін тұруы керек: ''\"\nassert alien_order(['z', 'x']) == 'zx', \"Күтілгені 'zx'\"\nassert alien_order(['ab', 'abc']) == 'abc', \"Ешқандай шектеу жоқ: әріптер ретімен 'abc'\"\nassert alien_order(['ба', 'бв', 'ав']) == 'бав', \"Күтілгені 'бав'\"\nassert alien_order([]) == '', \"Сөз жоқ: ''\"\nassert alien_order(['c', 'b', 'a']) == 'cba', \"Күтілгені 'cba'\"\n",
    "mustInclude": [
     "heapq"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Бірдей әріптердің ең ұзын бөлігі",
   "prompt": "<p><code>longest_same(s, k)</code>: жолда ең көбі <code>k</code> таңбаны кез келген басқа таңбаға ауыстыра аламыз. Ауыстырудан кейін бірдей таңбалардан тұратын ең ұзын қатар бөліктің ұзындығын қайтарыңыз. Sliding window: терезе ұзындығы − терезедегі ең жиі таңба саны ≤ <code>k</code> болуы керек. O(n · әліпби).</p>\n<pre><code>longest_same('ABAB', 2)    → 4\nlongest_same('AABABBA', 1) → 4\nlongest_same('', 3)        → 0</code></pre>",
   "starter": "def longest_same(s, k):\n    pass\n",
   "solution": "def longest_same(s, k):\n    cnt = {}\n    lo = 0\n    top = 0\n    best = 0\n    for hi, ch in enumerate(s):\n        cnt[ch] = cnt.get(ch, 0) + 1\n        top = max(top, cnt[ch])\n        while hi - lo + 1 - top > k:\n            cnt[s[lo]] -= 1\n            lo += 1\n        best = max(best, hi - lo + 1)\n    return best\n",
   "hints": [
    "Терезеде ең жиі таңбадан басқасын ауыстырамыз: ауыстыру саны = ұзындық − <code>top</code>.",
    "<code>top</code>-ты кемітудің қажеті жоқ: ол тек жауаптан үлкен терезелерді жібермейді."
   ],
   "check": {
    "tests": "\nassert longest_same('ABAB', 2) == 4, \"longest_same('ABAB', 2) 4\"\nassert longest_same('AABABBA', 1) == 4, \"longest_same('AABABBA', 1) 4\"\nassert longest_same('', 3) == 0, 'Бос жол: 0'\nassert longest_same('ABC', 0) == 1, 'Ауыстыру жоқ: 1'\nassert longest_same('ҚҚҚ', 0) == 3, 'Барлығы бірдей: 3'\nimport random as _random\n_rng = _random.Random(5)\nfor _ in range(40):\n    _s = ''.join(_rng.choice('АБВ') for _ in range(_rng.randint(0, 12))); _k = _rng.randint(0, 3)\n    _exp = max([j - i for i in range(len(_s)) for j in range(i + 1, len(_s) + 1) if (j - i) - max(_s[i:j].count(c) for c in 'АБВ') <= _k] + [0])\n    assert longest_same(_s, _k) == _exp, f'longest_same({_s!r}, {_k}) {_exp} болуы керек'\n"
   }
  }
 ],
 "dsa-p3": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Сол жақтағы кіші",
   "prompt": "<p><code>prev_smaller(a)</code> әр элемент үшін оның <b>сол</b> жағындағы ең жақын қатаң кіші элементті қайтарсын; жоқ болса <code>-1</code>. Monotonic stack: O(n).</p>\n<pre><code>prev_smaller([4, 5, 2, 10, 8]) → [-1, 4, -1, 2, 2]</code></pre>",
   "starter": "def prev_smaller(a):\n    pass\n",
   "solution": "def prev_smaller(a):\n    st = []\n    res = []\n    for x in a:\n        while st and st[-1] >= x:\n            st.pop()\n        res.append(st[-1] if st else -1)\n        st.append(x)\n    return res\n",
   "hints": [
    "Стекте өсу ретімен тұрған мәндер ғана қалады: жаңа элементтен үлкен немесе теңдерін алып тастаңыз."
   ],
   "check": {
    "tests": "\nassert prev_smaller([4, 5, 2, 10, 8]) == [-1, 4, -1, 2, 2], 'Күтілгені [-1, 4, -1, 2, 2]'\nassert prev_smaller([]) == [], 'Бос тізім: []'\nassert prev_smaller([3, 3]) == [-1, -1], 'Тең элемент кіші емес: [-1, -1]'\nimport random as _random, time as _time\n_rng = _random.Random(1)\nfor _ in range(40):\n    _x = [_rng.randint(0, 9) for _ in range(_rng.randint(0, 12))]\n    _exp = [next((y for y in reversed(_x[:i]) if y < v), -1) for i, v in enumerate(_x)]\n    assert prev_smaller(_x) == _exp, f'prev_smaller({_x}) {_exp} болуы керек'\n_big = list(range(100000))\n_t0 = _time.perf_counter(); prev_smaller(_big[::-1]); _dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'{_dt:.2f} с: O(n) стек керек'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Хабардың таралу уақыты",
   "prompt": "<p>Желіде <code>n</code> сервер (<code>1..n</code>), <code>times</code> — <code>(u, v, w)</code>: <code>u</code>-дан <code>v</code>-ға хабар <code>w</code> мс-та жетеді (бағытталған). Хабар <code>k</code> серверінен шығады. <code>delay(times, n, k)</code> барлық серверге жетуге кететін уақытты (ең алыс сервердің ең қысқа қашықтығы) қайтарсын; бір серверге жетпесе <code>-1</code>. Dijkstra + <code>heapq</code>.</p>\n<pre><code>delay([(2, 1, 1), (2, 3, 1), (3, 4, 1)], 4, 2) → 2\ndelay([(1, 2, 1)], 2, 2)                     → -1</code></pre>",
   "starter": "import heapq\n\ndef delay(times, n, k):\n    pass\n",
   "solution": "import heapq\n\ndef delay(times, n, k):\n    adj = [[] for _ in range(n + 1)]\n    for u, v, w in times:\n        adj[u].append((v, w))\n    dist = [None] * (n + 1)\n    h = [(0, k)]\n    while h:\n        d, u = heapq.heappop(h)\n        if dist[u] is not None:\n            continue\n        dist[u] = d\n        for v, w in adj[u]:\n            if dist[v] is None:\n                heapq.heappush(h, (d + w, v))\n    if any(x is None for x in dist[1:]):\n        return -1\n    return max(dist[1:])\n",
   "hints": [
    "Heap-тен шыққан төбе бірінші рет шықса, оның қашықтығы түпкілікті.",
    "Жауап — қашықтықтардың максимумы; біреуі анықталмаса — <code>-1</code>."
   ],
   "check": {
    "tests": "\nassert delay([(2, 1, 1), (2, 3, 1), (3, 4, 1)], 4, 2) == 2, 'Күтілгені 2'\nassert delay([(1, 2, 1)], 2, 2) == -1, '2-ден 1-ге жол жоқ: -1'\nassert delay([(1, 2, 1)], 2, 1) == 1, 'Күтілгені 1'\nassert delay([], 1, 1) == 0, 'Бір сервер: 0'\nassert delay([(1, 2, 10), (1, 3, 1), (3, 2, 2)], 3, 1) == 3, 'Айналма жол қысқа: 3'\n"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Теңізге қарайтын үйлер",
   "prompt": "<p>Жағалау бойында үйлер солдан оңға тұр, теңіз — оң жақта. Үй теңізді көреді, егер оның оң жағындағы барлық үйлер одан қатаң аласа болса. <code>sea_view(heights)</code> теңізді көретін үйлердің индекстерін өсу ретімен қайтарсын. Оңнан солға бір рет жүріп, максимумды сақтаңыз (немесе monotonic stack).</p>\n<pre><code>sea_view([4, 2, 3, 1]) → [0, 2, 3]\nsea_view([1, 3, 2, 4]) → [3]\nsea_view([2, 2, 2])    → [2]</code></pre>",
   "starter": "def sea_view(heights):\n    pass\n",
   "solution": "def sea_view(heights):\n    res = []\n    best = None\n    for i in range(len(heights) - 1, -1, -1):\n        if best is None or heights[i] > best:\n            res.append(i)\n            best = heights[i]\n    return res[::-1]\n",
   "hints": [
    "Оңнан солға: үй ағымдағы максимумнан қатаң биік болса, ол теңізді көреді."
   ],
   "check": {
    "tests": "\nassert sea_view([4, 2, 3, 1]) == [0, 2, 3], 'Күтілгені [0, 2, 3]'\nassert sea_view([1, 3, 2, 4]) == [3], 'Күтілгені [3]'\nassert sea_view([2, 2, 2]) == [2], 'Тең биіктік көруді жабады: [2]'\nassert sea_view([]) == [], 'Үй жоқ: []'\nassert sea_view([5]) == [0], 'Бір үй: [0]'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Шектелген ауытқу терезесі",
   "prompt": "<p>Датчик көрсеткіштері <code>a</code>. <code>longest_stable(a, limit)</code> ішіндегі максимум мен минимумның айырмасы <code>limit</code>-тен аспайтын ең ұзын қатар кезеңнің ұзындығын қайтарсын. Екі monotonic deque: біреуі максимумдар үшін (кему), біреуі минимумдар үшін (өсу). O(n).</p>\n<pre><code>longest_stable([8, 2, 4, 7], 4)            → 2\nlongest_stable([10, 1, 2, 4, 7, 2], 5)     → 4    # [2, 4, 7, 2]\nlongest_stable([4, 2, 2, 2, 4, 4, 2, 2], 0) → 3</code></pre>",
   "starter": "from collections import deque\n\ndef longest_stable(a, limit):\n    pass\n",
   "solution": "from collections import deque\n\ndef longest_stable(a, limit):\n    mx, mn = deque(), deque()\n    lo = 0\n    best = 0\n    for hi, x in enumerate(a):\n        while mx and a[mx[-1]] < x:\n            mx.pop()\n        mx.append(hi)\n        while mn and a[mn[-1]] > x:\n            mn.pop()\n        mn.append(hi)\n        while a[mx[0]] - a[mn[0]] > limit:\n            lo += 1\n            if mx[0] < lo:\n                mx.popleft()\n            if mn[0] < lo:\n                mn.popleft()\n        best = max(best, hi - lo + 1)\n    return best\n",
   "hints": [
    "Deque-те индекстерді сақтаңыз: <code>mx[0]</code> — терезе максимумы, <code>mn[0]</code> — минимумы.",
    "Айырма шектен асса, <code>lo</code>-ны жылжытып, терезеден шыққан индекстерді deque-тердің басынан алыңыз."
   ],
   "check": {
    "tests": "\nassert longest_stable([8, 2, 4, 7], 4) == 2, 'Күтілгені 2'\nassert longest_stable([10, 1, 2, 4, 7, 2], 5) == 4, 'Күтілгені 4'\nassert longest_stable([4, 2, 2, 2, 4, 4, 2, 2], 0) == 3, 'limit = 0: тең мәндер, 3'\nassert longest_stable([], 3) == 0, 'Бос тізім: 0'\nassert longest_stable([7], 0) == 1, 'Бір мән: 1'\nimport random as _random, time as _time\n_rng = _random.Random(2)\nfor _ in range(40):\n    _x = [_rng.randint(0, 9) for _ in range(_rng.randint(0, 12))]; _l = _rng.randint(0, 5)\n    _exp = max([j - i for i in range(len(_x)) for j in range(i + 1, len(_x) + 1) if max(_x[i:j]) - min(_x[i:j]) <= _l] + [0])\n    assert longest_stable(_x, _l) == _exp, f'longest_stable({_x}, {_l}) {_exp} болуы керек'\n_big = [_rng.randint(0, 10**6) for _ in range(100000)]\n_t0 = _time.perf_counter(); longest_stable(_big, 10**5); _dt = _time.perf_counter() - _t0\nassert _dt < 1.5, f'{_dt:.2f} с: monotonic deque арқылы O(n) керек'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең жеңіл тау жолы",
   "prompt": "<p>Тау картасы: <code>h[i][j]</code> — биіктік. Туристер сол жақ жоғарғы бұрыштан оң жақ төменгі бұрышқа төрт бағытта жүреді. Жолдың <b>ауырлығы</b> — көрші ұяшықтар арасындағы ең үлкен биіктік айырмасы <code>|h₁ − h₂|</code>. <code>min_effort(h)</code> ауырлығы ең аз жолдың ауырлығын қайтарсын. Dijkstra: қашықтық орнына «осы ұяшыққа дейінгі ең аз ауырлық», жаңарту <code>max(d, |айырма|)</code>.</p>\n<pre><code>min_effort([[1, 2, 2],\n            [3, 8, 2],\n            [5, 3, 5]]) → 2</code></pre>",
   "starter": "import heapq\n\ndef min_effort(h):\n    pass\n",
   "solution": "import heapq\n\ndef min_effort(h):\n    R, C = len(h), len(h[0])\n    best = [[None] * C for _ in range(R)]\n    pq = [(0, 0, 0)]\n    while pq:\n        d, r, c = heapq.heappop(pq)\n        if best[r][c] is not None:\n            continue\n        best[r][c] = d\n        if (r, c) == (R - 1, C - 1):\n            return d\n        for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):\n            if 0 <= nr < R and 0 <= nc < C and best[nr][nc] is None:\n                heapq.heappush(pq, (max(d, abs(h[nr][nc] - h[r][c])), nr, nc))\n    return 0\n",
   "hints": [
    "Heap элементі <code>(ауырлық, r, c)</code>.",
    "Көршіге өту ауырлығы: <code>max(d, abs(h[nr][nc] − h[r][c]))</code>."
   ],
   "check": {
    "tests": "\nassert min_effort([[1, 2, 2], [3, 8, 2], [5, 3, 5]]) == 2, 'Күтілгені 2'\nassert min_effort([[1, 2, 3], [3, 8, 4], [5, 3, 5]]) == 1, 'Күтілгені 1'\nassert min_effort([[7]]) == 0, 'Бір ұяшық: 0'\nassert min_effort([[1, 10, 6, 7, 9, 10, 4, 9]]) == 9, 'Бір жол: 9'\nassert min_effort([[1, 2, 1, 1, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 1, 1, 2, 1]]) == 0, 'Тегіс жол бар: 0'\n"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Секірумен ең көп ұпай",
   "prompt": "<p>Ойыншы <code>0</code>-ұяшықтан бастап соңғы ұяшыққа жетеді; бір секіргенде ең көбі <code>k</code> ұяшық алға жылжиды. Ұпай — тоқтаған барлық ұяшықтардағы мәндердің қосындысы (бірінші және соңғысын қоса; мәндер теріс болуы мүмкін). <code>max_score(nums, k)</code> ең көп ұпайды қайтарсын. DP: <code>dp[i] = nums[i] + max(dp[i−k..i−1])</code>; терезе максимумын monotonic deque арқылы: O(n).</p>\n<pre><code>max_score([1, -1, -2, 4, -7, 3], 2) → 7    # 1 → -1 → 4 → 3\nmax_score([10, -5, -2, 4, 0, 3], 3) → 17</code></pre>",
   "starter": "from collections import deque\n\ndef max_score(nums, k):\n    pass\n",
   "solution": "from collections import deque\n\ndef max_score(nums, k):\n    n = len(nums)\n    dp = [0] * n\n    dq = deque()\n    for i in range(n):\n        while dq and dq[0] < i - k:\n            dq.popleft()\n        dp[i] = nums[i] + (dp[dq[0]] if dq else 0)\n        while dq and dp[dq[-1]] <= dp[i]:\n            dq.pop()\n        dq.append(i)\n    return dp[-1]\n",
   "hints": [
    "Deque-те <code>dp</code> мәндері кему ретімен тұратын индекстер.",
    "Басындағы индекс <code>i − k</code>-дан кіші болса, оны алып тастаңыз."
   ],
   "check": {
    "tests": "\nassert max_score([1, -1, -2, 4, -7, 3], 2) == 7, 'Күтілгені 7'\nassert max_score([10, -5, -2, 4, 0, 3], 3) == 17, 'Күтілгені 17'\nassert max_score([1, -5, -20, 4, -1, 3, -6, -3], 2) == 0, 'Күтілгені 0'\nassert max_score([5], 1) == 5, 'Бір ұяшық: 5'\nassert max_score([-1, -2], 1) == -3, 'Барлық ұяшыққа тоқтау міндетті: -3'\nimport random as _random, time as _time\n_rng = _random.Random(3)\nfor _ in range(40):\n    _x = [_rng.randint(-9, 9) for _ in range(_rng.randint(1, 12))]; _k = _rng.randint(1, 4)\n    _d = [0] * len(_x)\n    for _i in range(len(_x)):\n        _d[_i] = _x[_i] + (max(_d[max(0, _i - _k):_i]) if _i else 0)\n    assert max_score(_x, _k) == _d[-1], f'max_score({_x}, {_k}) {_d[-1]} болуы керек'\n_big = [_rng.randint(-10**4, 10**4) for _ in range(100000)]\n_t0 = _time.perf_counter(); max_score(_big, 5000); _dt = _time.perf_counter() - _t0\nassert _dt < 1.5, f'k = 5000 үшін {_dt:.2f} с: терезе максимумын deque арқылы O(1)-ден алыңыз'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Теріс сандармен қысқа кезең",
   "prompt": "<p>Енді <code>profit</code> мәндері <b>теріс</b> болуы мүмкін. <code>shortest_at_least(profit, k)</code> қосындысы кемінде <code>k</code> (<code>k &gt; 0</code>) болатын ең қысқа бос емес қатар кезеңнің ұзындығын қайтарсын; жоқ болса <code>-1</code>. Қарапайым sliding window жұмыс істемейді! Prefix sum <code>P</code> және monotonic deque: <code>P[j] − P[i] ≥ k</code> болатын ең жақын <code>i</code>. O(n).</p>\n<pre><code>shortest_at_least([2, -1, 2], 3)     → 3\nshortest_at_least([1, 2], 4)         → -1\nshortest_at_least([84, -37, 32, 40, 95], 167) → 3</code></pre>",
   "starter": "from collections import deque\n\ndef shortest_at_least(profit, k):\n    pass\n",
   "solution": "from collections import deque\n\ndef shortest_at_least(profit, k):\n    P = [0]\n    for x in profit:\n        P.append(P[-1] + x)\n    best = len(profit) + 1\n    dq = deque()\n    for j in range(len(P)):\n        while dq and P[j] - P[dq[0]] >= k:\n            best = min(best, j - dq.popleft())\n        while dq and P[dq[-1]] >= P[j]:\n            dq.pop()\n        dq.append(j)\n    return best if best <= len(profit) else -1\n",
   "hints": [
    "Deque-те <code>P</code> мәндері өсу ретімен тұратын индекстер.",
    "Алдыңғы жақтан: <code>P[j] − P[dq[0]] ≥ k</code> болғанша жауапты жаңартып, алып тастаңыз. Артқы жақтан: <code>P[dq[-1]] ≥ P[j]</code> болса алып тастаңыз — ол енді ешқашан жақсы бастау болмайды."
   ],
   "check": {
    "tests": "\nassert shortest_at_least([2, -1, 2], 3) == 3, 'Күтілгені 3'\nassert shortest_at_least([1, 2], 4) == -1, 'Жоқ: -1'\nassert shortest_at_least([84, -37, 32, 40, 95], 167) == 3, 'Күтілгені 3'\nassert shortest_at_least([1], 1) == 1, 'Бір элемент: 1'\nassert shortest_at_least([], 1) == -1, 'Бос тізім: -1'\nassert shortest_at_least([-5, 10], 10) == 1, 'Теріс бастау: 1'\nimport random as _random, time as _time\n_rng = _random.Random(4)\nfor _ in range(60):\n    _x = [_rng.randint(-6, 9) for _ in range(_rng.randint(0, 12))]; _k = _rng.randint(1, 15)\n    _c = [j - i for i in range(len(_x)) for j in range(i + 1, len(_x) + 1) if sum(_x[i:j]) >= _k]\n    _exp = min(_c) if _c else -1\n    assert shortest_at_least(_x, _k) == _exp, f'shortest_at_least({_x}, {_k}) {_exp} болуы керек'\n_big = [_rng.randint(-100, 100) for _ in range(100000)]\n_t0 = _time.perf_counter(); shortest_at_least(_big, 2000); _dt = _time.perf_counter() - _t0\nassert _dt < 1.5, f'{_dt:.2f} с: O(n) шешім керек'\n"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ауысу шектеулі арзан рейс",
   "prompt": "<p><code>n</code> әуежай (<code>0..n−1</code>), <code>flights</code> — <code>(u, v, баға)</code> бағытталған рейстер. <code>cheapest(n, flights, src, dst, k)</code> <code>src</code>-тан <code>dst</code>-ға <b>ең көбі <code>k</code> аралық</b> аялдамамен (яғни ең көбі <code>k + 1</code> рейс) ең арзан бағаны қайтарсын; мүмкін болмаса <code>-1</code>. Dijkstra-ны күйге кеңейтіңіз: <code>(баға, әуежай, қолданылған рейс саны)</code>; бір әуежайға бірнеше рет, әртүрлі рейс санымен кіруге болады.</p>\n<pre><code>_f = [(0, 1, 100), (1, 2, 100), (2, 3, 100), (0, 2, 500)]\ncheapest(4, _f, 0, 3, 1) → 600     # 0 → 2 → 3\ncheapest(4, _f, 0, 3, 2) → 300     # 0 → 1 → 2 → 3\ncheapest(4, _f, 0, 3, 0) → -1</code></pre>",
   "starter": "import heapq\n\ndef cheapest(n, flights, src, dst, k):\n    pass\n",
   "solution": "import heapq\n\ndef cheapest(n, flights, src, dst, k):\n    adj = [[] for _ in range(n)]\n    for u, v, w in flights:\n        adj[u].append((v, w))\n    best_steps = [None] * n\n    pq = [(0, src, 0)]\n    while pq:\n        cost, u, used = heapq.heappop(pq)\n        if u == dst:\n            return cost\n        if best_steps[u] is not None and best_steps[u] <= used:\n            continue\n        best_steps[u] = used\n        if used == k + 1:\n            continue\n        for v, w in adj[u]:\n            heapq.heappush(pq, (cost + w, v, used + 1))\n    return -1\n",
   "hints": [
    "Heap бағамен реттейді, сондықтан <code>dst</code> бірінші рет шыққанда — жауап.",
    "Әуежайға бұрын <b>азырақ немесе тең</b> рейспен (әрі арзанырақ) келген болсақ, бұл күйді өткізіп жіберуге болады."
   ],
   "check": {
    "tests": "\n_f = [(0, 1, 100), (1, 2, 100), (2, 3, 100), (0, 2, 500)]\nassert cheapest(4, _f, 0, 3, 1) == 600, 'k = 1: 600'\nassert cheapest(4, _f, 0, 3, 2) == 300, 'k = 2: 300'\nassert cheapest(4, _f, 0, 3, 0) == -1, 'k = 0: тікелей рейс жоқ, -1'\nassert cheapest(3, [(0, 1, 100), (1, 2, 100), (0, 2, 500)], 0, 2, 1) == 200, 'Күтілгені 200'\nassert cheapest(2, [], 0, 1, 5) == -1, 'Рейс жоқ: -1'\nassert cheapest(3, [(0, 1, 5)], 1, 1, 0) == 0, 'src = dst: 0'\nimport random as _random\n_rng = _random.Random(5)\ndef _bf(n, fl, s, d, k):\n    INF = float('inf'); dist = [INF] * n; dist[s] = 0\n    for _ in range(k + 1):\n        nd = list(dist)\n        for u, v, w in fl:\n            if dist[u] + w < nd[v]: nd[v] = dist[u] + w\n        dist = nd\n    return dist[d] if dist[d] < INF else -1\nfor _ in range(60):\n    _n = _rng.randint(2, 6)\n    _fl = [(_rng.randrange(_n), _rng.randrange(_n), _rng.randint(1, 50)) for _ in range(_rng.randint(0, 12))]\n    _fl = [x for x in _fl if x[0] != x[1]]\n    _s, _d, _k = _rng.randrange(_n), _rng.randrange(_n), _rng.randint(0, 3)\n    assert cheapest(_n, _fl, _s, _d, _k) == _bf(_n, _fl, _s, _d, _k), f'cheapest({_n}, {_fl}, {_s}, {_d}, {_k}) {_bf(_n, _fl, _s, _d, _k)} болуы керек'\n"
   }
  }
 ]
});
