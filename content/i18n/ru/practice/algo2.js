// algo2 practice tasks: Russian text. Code, solutions and checks are in content/practice/algo2.js.
DJ.i18n.patch({ lessons: {
 "alg-1": {
  "pr": [
   {
    "title": "Второе по величине значение",
    "prompt": "<p><code>second_largest(xs)</code> должна вернуть второе по величине из <b>различных</b> значений списка; если его нет (список пуст или все значения равны), вернуть <code>None</code>. Пройдите список один раз, держа две переменные. Сначала продумайте граничные случаи.</p>\n<pre><code>second_largest([3, 9, 7, 9]) → 7\nsecond_largest([5, 5])       → None\nsecond_largest([])           → None</code></pre>",
    "hints": [
     "Если появляется новый максимум, старый максимум становится вторым по величине.",
     "Значение, равное максимуму, не должно менять второе место."
    ],
    "check": {
     "tests": "\nassert second_largest([3, 9, 7, 9]) == 7, 'second_largest([3, 9, 7, 9]) 7'\nassert second_largest([5, 5]) is None, 'Все равны: None'\nassert second_largest([]) is None, 'Пустой список: None'\nassert second_largest([4]) is None, 'Один элемент: None'\nassert second_largest([-1, -2]) == -2, 'Отрицательные числа: -2'\nassert second_largest([1, 2, 3]) == 2, 'В порядке возрастания: 2'\nassert second_largest([0, 0, -5]) == -5, 'Второе по величине: -5'\n"
    }
   },
   {
    "title": "Пересечение интервалов",
    "prompt": "<p>Два бронирования заданы полуоткрытыми интервалами: <code>[l, r)</code> — <code>l</code> входит, <code>r</code> не входит. <code>overlap(a, b)</code> должна вернуть длину их общей части (если пересечения нет, 0). Касание (<code>[1, 3)</code> и <code>[3, 5)</code>) пересечением не считается.</p>\n<pre><code>overlap((1, 5), (3, 8)) → 2\noverlap((1, 3), (3, 5)) → 0\noverlap((2, 9), (4, 6)) → 2</code></pre>",
    "hints": [
     "Общая часть: <code>[max(l₁, l₂), min(r₁, r₂))</code>.",
     "Отрицательную длину приведите к 0."
    ],
    "check": {
     "tests": "\nassert overlap((1, 5), (3, 8)) == 2, 'overlap((1, 5), (3, 8)) 2'\nassert overlap((1, 3), (3, 5)) == 0, 'Касание — не пересечение: 0'\nassert overlap((2, 9), (4, 6)) == 2, 'Один внутри другого: 2'\nassert overlap((5, 8), (1, 2)) == 0, 'Далёкие интервалы: 0'\nassert overlap((3, 3), (0, 10)) == 0, 'Пустой интервал: 0'\nassert overlap((0, 10), (0, 10)) == 10, 'Одинаковые интервалы: 10'\n"
    }
   },
   {
    "title": "Равное разбиение интервала",
    "prompt": "<p>В библиотеке нужно разделить книги с номерами <code>[lo, hi)</code> между <code>k</code> сотрудниками. <code>split_range(lo, hi, k)</code> <code>k</code> должна вернуть список полуоткрытых интервалов <code>(l, r)</code>: они идут подряд, полностью покрывают весь <code>[lo, hi)</code>, их длины отличаются не больше чем на 1, более длинные идут первыми. Интервал может быть пустым.</p>\n<pre><code>split_range(0, 10, 3) → [(0, 4), (4, 7), (7, 10)]\nsplit_range(5, 7, 4)  → [(5, 6), (6, 7), (7, 7), (7, 7)]</code></pre>",
    "hints": [
     "<code>q, r = divmod(hi − lo, k)</code>: первые <code>r</code> частей имеют длину <code>q + 1</code>, остальные — <code>q</code>.",
     "Следующая часть начинается там, где закончилась предыдущая — в этом преимущество полуоткрытых интервалов."
    ],
    "check": {
     "tests": "\nassert split_range(0, 10, 3) == [(0, 4), (4, 7), (7, 10)], 'Ожидалось [(0, 4), (4, 7), (7, 10)]'\nassert split_range(5, 7, 4) == [(5, 6), (6, 7), (7, 7), (7, 7)], 'Пустые части тоже бывают'\nassert split_range(0, 0, 2) == [(0, 0), (0, 0)], 'Пустой интервал'\nassert split_range(3, 9, 1) == [(3, 9)], 'Одна часть — весь интервал'\nassert split_range(0, 9, 3) == [(0, 3), (3, 6), (6, 9)], 'Делится поровну'\n"
    }
   },
   {
    "title": "Пересечение двух расписаний",
    "prompt": "<p>Свободное время двух врачей: <code>a</code> и <code>b</code> — списки непересекающихся <code>[l, r)</code> интервалов, отсортированных по началу. <code>common_free(a, b)</code> должна вернуть отсортированный список интервалов, в которых свободны оба врача (интервалы нулевой длины не включайте). Два указателя: сдвигайте указатель того интервала, у которого меньше <code>r</code>. O(n + m).</p>\n<pre><code>common_free([(0, 2), (5, 10), (13, 23)], [(1, 5), (8, 12), (15, 24)])\n→ [(1, 2), (8, 10), (15, 23)]</code></pre>",
    "hints": [
     "Пересечение каждой пары: <code>[max(l), min(r))</code>; добавляйте, только если <code>lo &lt; hi</code>.",
     "Интервал, который заканчивается раньше, уже не пересечётся ни с чем другим — сдвиньте его указатель."
    ],
    "check": {
     "tests": "\nassert common_free([(0, 2), (5, 10), (13, 23)], [(1, 5), (8, 12), (15, 24)]) == [(1, 2), (8, 10), (15, 23)], 'Ожидалось [(1, 2), (8, 10), (15, 23)]'\nassert common_free([], [(1, 2)]) == [], 'Одно расписание пусто: []'\nassert common_free([(1, 3)], [(3, 5)]) == [], 'Касание — не пересечение: []'\nassert common_free([(0, 10)], [(1, 2), (4, 6)]) == [(1, 2), (4, 6)], 'Один длинный интервал: [(1, 2), (4, 6)]'\nimport random as _random\n_rng = _random.Random(1)\ndef _mk():\n    pts = sorted(_rng.sample(range(40), 2 * _rng.randint(0, 5)))\n    return [(pts[i], pts[i + 1]) for i in range(0, len(pts), 2)]\nfor _ in range(60):\n    _a, _b = _mk(), _mk()\n    _cells = [x for x in range(40) if any(l <= x < r for l, r in _a) and any(l <= x < r for l, r in _b)]\n    _got = common_free(_a, _b)\n    _gc = [x for l, r in _got for x in range(l, r)]\n    assert _gc == _cells and all(l < r for l, r in _got), f'common_free({_a}, {_b}) қате: {_got}'\n"
    }
   },
   {
    "title": "Диапазоны непроданных номеров",
    "prompt": "<p>Номера билетов на поезд должны находиться в диапазоне <code>[lo, hi)</code>. Проданные <code>sold</code> — по возрастанию, без повторов, все внутри диапазона. <code>gaps(sold, lo, hi)</code> должна вернуть промежутки непроданных номеров в виде полуоткрытых интервалов <code>(l, r)</code> в порядке возрастания.</p>\n<pre><code>gaps([0, 1, 3, 50, 75], 0, 100) → [(2, 3), (4, 50), (51, 75), (76, 100)]\ngaps([], 1, 5)                  → [(1, 5)]\ngaps([1, 2, 3], 1, 4)           → []</code></pre>",
    "hints": [
     "<code>prev</code> — следующий номер, который может быть свободен. Для каждого проданного <code>x</code>: если <code>[prev, x)</code> свободен, добавьте интервал.",
     "Чтобы не забыть последний интервал, добавьте в конец списка <code>hi</code> как «ворота»."
    ],
    "check": {
     "tests": "\nassert gaps([0, 1, 3, 50, 75], 0, 100) == [(2, 3), (4, 50), (51, 75), (76, 100)], 'Ожидалось [(2, 3), (4, 50), (51, 75), (76, 100)]'\nassert gaps([], 1, 5) == [(1, 5)], 'Если ничего не продано: весь диапазон'\nassert gaps([1, 2, 3], 1, 4) == [], 'Всё продано: []'\nassert gaps([], 3, 3) == [], 'Пустой диапазон: []'\nassert gaps([9], 0, 10) == [(0, 9)], 'Последний номер продан: [(0, 9)]'\nassert gaps([0], 0, 10) == [(1, 10)], 'Первый номер продан: [(1, 10)]'\n_s = [1, 2, 3]; gaps(_s, 0, 5)\nassert _s == [1, 2, 3], 'Не меняйте входной список'\n"
    }
   },
   {
    "title": "Сумма, ближайшая к цели",
    "prompt": "<p>Подарочный сертификат — <code>target</code> тенге. Цены в магазине <code>prices</code> отсортированы по возрастанию (товаров не меньше двух). <code>closest_sum(prices, target)</code> должна вернуть наименьшую разницу между суммой цен двух <b>разных</b> товаров и <code>target</code>: <code>|қосынды − target|</code>. Два указателя: O(n).</p>\n<pre><code>closest_sum([500, 1200, 3000, 4500], 5000) → 0       # 500 + 4500 = 5000\nclosest_sum([100, 200, 900], 1250)         → 150     # 200 + 900 = 1100</code></pre>",
    "hints": [
     "Если сумма меньше <code>target</code> — сдвиньте левый указатель, если больше — правый.",
     "На каждом шаге обновляйте разницу; если она равна нулю, сразу верните 0."
    ],
    "check": {
     "tests": "\nassert closest_sum([500, 1200, 3000, 4500], 5000) == 0, '500 + 4500 = 5000: разница 0'\nassert closest_sum([100, 200, 900], 1250) == 150, '200 + 900 = 1100: разница 150'\nassert closest_sum([1, 2], 100) == 97, 'Два товара: 97'\nassert closest_sum([5, 5], 10) == 0, 'Равные цены: 0'\nassert closest_sum([10, 20, 30], 5) == 25, 'Наименьшая пара: 30 − 5 = 25'\nimport random as _random, time as _time\n_rng = _random.Random(2)\nfor _ in range(50):\n    _p = sorted(_rng.randint(0, 50) for _ in range(_rng.randint(2, 10))); _t = _rng.randint(0, 110)\n    _exp = min(abs(_p[i] + _p[j] - _t) for i in range(len(_p)) for j in range(i + 1, len(_p)))\n    assert closest_sum(_p, _t) == _exp, f'closest_sum({_p}, {_t}) {_exp} болуы керек'\n_big = sorted(_rng.randint(0, 10**9) for _ in range(100000))\n_t0 = _time.perf_counter(); closest_sum(_big, 7 * 10**8 + 3); _dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'{_dt:.2f} с: нужен O(n) с двумя указателями'\n"
    }
   },
   {
    "title": "Вставка нового бронирования",
    "prompt": "<p>Брони конференц-зала <code>bookings</code> — интервалы <code>[l, r)</code>, отсортированные по началу, которые не пересекаются и не касаются друг друга. <code>insert_booking(bookings, new)</code> должна добавить новый <code>new</code> интервал и вернуть отсортированный список, в котором интервалы, которые <b>пересекаются или касаются</b>, объединены. Не сортируя, пройдите список за один проход O(n): сначала те, что полностью левее <code>new</code>, затем объединяемые, затем правее.</p>\n<pre><code>insert_booking([(1, 3), (6, 9)], (2, 5))          → [(1, 5), (6, 9)]\ninsert_booking([(1, 2), (3, 5), (6, 7), (8, 10)], (4, 8)) → [(1, 2), (3, 10)]\ninsert_booking([(1, 3)], (3, 4))                 → [(1, 4)]     # түйісу</code></pre>",
    "hints": [
     "Полностью слева находятся те, у которых <code>b.r &lt; new.l</code> (касание объединяется, поэтому <code>&lt;</code>).",
     "Условие объединения: <code>b.l ≤ r</code>; расширяйте границы через <code>min</code>/<code>max</code>."
    ],
    "check": {
     "tests": "\nassert insert_booking([(1, 3), (6, 9)], (2, 5)) == [(1, 5), (6, 9)], 'Ожидалось [(1, 5), (6, 9)]'\nassert insert_booking([(1, 2), (3, 5), (6, 7), (8, 10)], (4, 8)) == [(1, 2), (3, 10)], 'Ожидалось [(1, 2), (3, 10)]'\nassert insert_booking([(1, 3)], (3, 4)) == [(1, 4)], 'Касание объединяется: [(1, 4)]'\nassert insert_booking([], (2, 4)) == [(2, 4)], 'Пустое расписание: [(2, 4)]'\nassert insert_booking([(5, 7)], (1, 2)) == [(1, 2), (5, 7)], 'Добавить в начало'\nassert insert_booking([(1, 2)], (5, 7)) == [(1, 2), (5, 7)], 'Добавить в конец'\nassert insert_booking([(1, 5)], (2, 3)) == [(1, 5)], 'Внутри: без изменений'\nimport random as _random\n_rng = _random.Random(3)\ndef _merge(iv):\n    out = []\n    for l, r in sorted(iv):\n        if out and l <= out[-1][1]:\n            out[-1] = (out[-1][0], max(out[-1][1], r))\n        else:\n            out.append((l, r))\n    return out\nfor _ in range(80):\n    _pts = sorted(_rng.sample(range(1, 60), 2 * _rng.randint(0, 5)))\n    _b = _merge([(_pts[i], _pts[i + 1]) for i in range(0, len(_pts), 2)])\n    _l = _rng.randint(0, 59); _n = (_l, _rng.randint(_l + 1, 61))\n    assert insert_booking(_b, _n) == _merge(_b + [_n]), f'insert_booking({_b}, {_n}) {_merge(_b + [_n])} болуы керек'\n"
    }
   },
   {
    "title": "Общее свободное время всех",
    "prompt": "<p>Занятое время каждого члена команды — список <code>schedules[i]</code> — <code>[l, r)</code> интервалов (в произвольном порядке). Рабочий день — <code>[day_start, day_end)</code>. <code>team_free(schedules, day_start, day_end)</code> должна вернуть отсортированный список интервалов, в которых <b>все</b> свободны в течение рабочего дня. Соберите все занятые интервалы в один список, отсортируйте и объедините; затем найдите «окна» внутри дня.</p>\n<pre><code>team_free([[(9, 10), (12, 13)], [(9, 11)], [(15, 17)]], 9, 18)\n→ [(11, 12), (13, 15), (17, 18)]</code></pre>",
    "hints": [
     "Можно не строить объединение отдельно, а просто двигать границу <code>cur</code> — «до этого момента всё занято».",
     "Обрежьте интервалы, выходящие за пределы дня, по <code>[day_start, day_end)</code>."
    ],
    "check": {
     "tests": "\nassert team_free([[(9, 10), (12, 13)], [(9, 11)], [(15, 17)]], 9, 18) == [(11, 12), (13, 15), (17, 18)], 'Ожидалось [(11, 12), (13, 15), (17, 18)]'\nassert team_free([], 9, 18) == [(9, 18)], 'Занятости нет: весь день свободен'\nassert team_free([[(8, 19)]], 9, 18) == [], 'День полностью занят: []'\nassert team_free([[(9, 12)], [(12, 18)]], 9, 18) == [], 'Касающиеся интервалы не оставляют окон: []'\nassert team_free([[(13, 14)], [(10, 11)]], 9, 18) == [(9, 10), (11, 13), (14, 18)], 'Неотсортированный вход'\nassert team_free([[(5, 7), (20, 22)]], 9, 18) == [(9, 18)], 'Интервалы вне дня: весь день свободен'\nimport random as _random\n_rng = _random.Random(4)\nfor _ in range(60):\n    _sch = [[(l, l + _rng.randint(1, 4)) for l in _rng.sample(range(0, 24), _rng.randint(0, 3))] for _ in range(_rng.randint(0, 3))]\n    _ds, _de = 6, 20\n    _free = [x for x in range(_ds, _de) if not any(l <= x < r for s in _sch for l, r in s)]\n    _got = team_free(_sch, _ds, _de)\n    assert [x for l, r in _got for x in range(l, r)] == _free and all(a[1] < b[0] for a, b in zip(_got, _got[1:])), f'team_free({_sch}, 6, 20) қате: {_got}'\n"
    }
   }
  ]
 },
 "alg-2": {
  "pr": [
   {
    "title": "Префиксные суммы",
    "prompt": "<p><code>prefix_sums(a)</code> должна вернуть список длины <code>len(a) + 1</code>: <code>P[0] = 0</code>, <code>P[i] = a[0] + ... + a[i−1]</code>. Тогда сумма отрезка <code>[l, r)</code> равна <code>P[r] − P[l]</code>.</p>\n<pre><code>prefix_sums([3, 1, 4, 1]) → [0, 3, 4, 8, 9]\nprefix_sums([])           → [0]</code></pre>",
    "hints": [
     "<code>P = [0]</code>, затем для каждого элемента <code>P.append(P[-1] + x)</code>."
    ],
    "check": {
     "tests": "\nassert prefix_sums([3, 1, 4, 1]) == [0, 3, 4, 8, 9], 'Ожидалось [0, 3, 4, 8, 9]'\nassert prefix_sums([]) == [0], 'Пустой список: [0]'\nassert prefix_sums([-2, 2]) == [0, -2, 0], 'Отрицательные числа: [0, -2, 0]'\n_P = prefix_sums(list(range(1, 101)))\nassert len(_P) == 101 and _P[100] - _P[50] == sum(range(51, 101)), 'Должна выдаваться сумма отрезка P[r] − P[l]'\n"
    }
   },
   {
    "title": "Окна выше плана",
    "prompt": "<p><code>count_windows(sales, k, goal)</code> должна вернуть количество непрерывных окон длины ровно <code>k</code>, сумма которых не меньше <code>goal</code>. Окно фиксированного размера: O(n). Если <code>k &gt; len(sales)</code>, ответ 0.</p>\n<pre><code>count_windows([2, 2, 2, 2, 5, 5, 5, 8], 3, 12) → 3\ncount_windows([1, 1], 3, 0)                   → 0</code></pre>",
    "hints": [
     "Сумму первого окна посчитайте один раз, затем на каждом шаге <code>+ sales[i] − sales[i − k]</code>."
    ],
    "check": {
     "tests": "\nassert count_windows([2, 2, 2, 2, 5, 5, 5, 8], 3, 12) == 3, 'Ожидалось 3'\nassert count_windows([1, 1], 3, 0) == 0, 'k > n: 0'\nassert count_windows([5], 1, 5) == 1, 'Одно окно на границе: 1'\nassert count_windows([1, 2, 3], 3, 7) == 0, 'План не выполняется: 0'\nassert count_windows([-1, 4, -1, 4], 2, 3) == 3, 'Отрицательные значения: 3'\nimport time as _time\n_big = list(range(200000))\n_t0 = _time.perf_counter(); _r = count_windows(_big, 1000, 10**8); _dt = _time.perf_counter() - _t0\nassert _r == 99500 and _dt < 1.0, f'Большой тест: ожидалось 99500, нужно O(n) окно ({_dt:.2f} с)'\n"
    }
   },
   {
    "title": "Самая холодная неделя",
    "prompt": "<p><code>temps</code> — суточные температуры в Астане. <code>coldest_week(temps)</code> должна вернуть наибольшее число дней <b>мороза</b> (температура &lt; 0) внутри 7-дневных окон. Если дней меньше 7, вернуть 0. Скользящее окно: прибавьте вошедший в окно день и вычтите вышедший.</p>\n<pre><code>coldest_week([-5, -3, 2, -1, -7, 0, 1, -2, -4, -6]) → 5</code></pre>",
    "hints": [
     "<code>(x &lt; 0)</code> — это <code>True</code>/<code>False</code>, то есть 1/0: его можно складывать напрямую."
    ],
    "check": {
     "tests": "\nassert coldest_week([-5, -3, 2, -1, -7, 0, 1, -2, -4, -6]) == 5, 'Ожидалось 5'\nassert coldest_week([-5, -3, 2, -1, -7, 0, 1, -2, -4]) == 4, 'Ожидалось 4'\nassert coldest_week([1, 2, 3]) == 0, 'Меньше 7 дней: 0'\nassert coldest_week([-1] * 7) == 7, 'Вся неделя — мороз: 7'\nassert coldest_week([0] * 10) == 0, '0 — не мороз: 0'\nassert coldest_week([-1, 5, 5, 5, 5, 5, 5, -1]) == 1, 'Ожидалось 1'\n"
    }
   },
   {
    "title": "Позиции анаграмм",
    "prompt": "<p><code>anagram_starts(s, p)</code> должна вернуть в порядке возрастания начальные индексы подстрок в <code>s</code>, которые являются анаграммами <code>p</code> (то есть содержат те же символы в том же количестве). Окно фиксированной длины <code>len(p)</code> и счётчики символов: O(n).</p>\n<pre><code>anagram_starts('cbaebabacd', 'abc') → [0, 6]\nanagram_starts('абаба', 'аб')       → [0, 1, 2, 3]</code></pre>",
    "hints": [
     "Счётчик окна <code>win</code> и счётчик образца <code>need</code>; если счётчик равен 0, удалите ключ, тогда сравнение <code>win == need</code> будет верным.",
     "Сравнение словарей занимает O(алфавит) — это константа."
    ],
    "check": {
     "tests": "\nassert anagram_starts('cbaebabacd', 'abc') == [0, 6], 'Ожидалось [0, 6]'\nassert anagram_starts('абаба', 'аб') == [0, 1, 2, 3], 'Ожидалось [0, 1, 2, 3]'\nassert anagram_starts('a', 'ab') == [], 'p длиннее: []'\nassert anagram_starts('aaa', 'a') == [0, 1, 2], 'Ожидалось [0, 1, 2]'\nassert anagram_starts('abc', 'd') == [], 'Нет: []'\nimport random as _random, time as _time\n_rng = _random.Random(1)\nfor _ in range(40):\n    _s = ''.join(_rng.choice('аб') for _ in range(_rng.randint(0, 12))); _p = ''.join(_rng.choice('аб') for _ in range(_rng.randint(1, 4)))\n    _exp = [i for i in range(len(_s) - len(_p) + 1) if sorted(_s[i:i + len(_p)]) == sorted(_p)]\n    assert anagram_starts(_s, _p) == _exp, f'anagram_starts({_s!r}, {_p!r}) {_exp} болуы керек'\n_s = ''.join(_rng.choice('abcde') for _ in range(100000))\n_t0 = _time.perf_counter(); anagram_starts(_s, 'abcdeabcde' * 50); _dt = _time.perf_counter() - _t0\nassert _dt < 2.0, f'{_dt:.2f} с: сдвигайте окно и не пересчитывайте на каждой позиции'\n"
    }
   },
   {
    "title": "Различные значения в окне",
    "prompt": "<p>Товары, которые каждый день приходили в магазин: <code>a</code>. <code>distinct_in_windows(a, k)</code> должна вернуть список количеств <b>различных</b> значений в каждом окне длины <code>k</code>. Словарь-счётчик: при входе в окно добавьте элемент, при выходе уменьшите (если 0 — удалите), <code>len(сөздік)</code> — ответ. O(n).</p>\n<pre><code>distinct_in_windows([1, 2, 1, 3, 4, 2, 3], 4) → [3, 4, 4, 3]\ndistinct_in_windows([5, 5], 3)              → []</code></pre>",
    "hints": [
     "Если счётчик вышедшего из окна значения стал 0, удалите его из словаря через <code>del</code>."
    ],
    "check": {
     "tests": "\nassert distinct_in_windows([1, 2, 1, 3, 4, 2, 3], 4) == [3, 4, 4, 3], 'Ожидалось [3, 4, 4, 3]'\nassert distinct_in_windows([5, 5], 3) == [], 'k > n: []'\nassert distinct_in_windows([7, 7, 7], 2) == [1, 1], 'Одинаковые значения: [1, 1]'\nassert distinct_in_windows([1, 2, 3], 1) == [1, 1, 1], 'k = 1: [1, 1, 1]'\nimport random as _random, time as _time\n_rng = _random.Random(2)\nfor _ in range(40):\n    _x = [_rng.randint(0, 5) for _ in range(_rng.randint(0, 12))]; _k = _rng.randint(1, 5)\n    _exp = [len(set(_x[i:i + _k])) for i in range(len(_x) - _k + 1)] if _k <= len(_x) else []\n    assert distinct_in_windows(_x, _k) == _exp, f'distinct_in_windows({_x}, {_k}) {_exp} болуы керек'\n_big = [_rng.randint(0, 1000) for _ in range(100000)]\n_t0 = _time.perf_counter(); distinct_in_windows(_big, 5000); _dt = _time.perf_counter() - _t0\nassert _dt < 1.5, f'{_dt:.2f} с: не создавайте set для каждого окна, двигайте счётчик'\n"
    }
   },
   {
    "title": "Скидка на диапазон",
    "prompt": "<p>В магазине <code>n</code> товаров (<code>0..n−1</code>), в начале все цены равны 0. Операция <code>updates</code> — <code>(l, r, v)</code>: <code>v</code> прибавляется к ценам товаров <code>[l, r)</code>. <code>apply_updates(n, updates)</code> должна вернуть список конечных цен. Применять каждую операцию циклом — O(n·q), медленно. Разностный массив: <code>diff[l] += v</code>, <code>diff[r] −= v</code>, в конце prefix sum. O(n + q).</p>\n<pre><code>apply_updates(5, [(1, 4, 2), (0, 2, 3), (3, 5, -1)]) → [3, 5, 2, 1, -1]</code></pre>",
    "hints": [
     "<code>diff</code> длиной <code>n + 1</code>: даже при <code>r = n</code> вы не выйдете за границу.",
     "Итоговая цена — префиксная сумма <code>diff</code>."
    ],
    "check": {
     "tests": "\nassert apply_updates(5, [(1, 4, 2), (0, 2, 3), (3, 5, -1)]) == [3, 5, 2, 1, -1], 'Ожидалось [3, 5, 2, 1, -1]'\nassert apply_updates(3, []) == [0, 0, 0], 'Обновлений нет: нули'\nassert apply_updates(0, []) == [], 'n = 0: []'\nassert apply_updates(4, [(2, 2, 5)]) == [0, 0, 0, 0], 'Пустой отрезок ничего не меняет'\nassert apply_updates(3, [(0, 3, 1), (0, 3, 1)]) == [2, 2, 2], 'Весь отрезок дважды'\nimport random as _random, time as _time\n_rng = _random.Random(3)\nfor _ in range(30):\n    _n = _rng.randint(1, 10); _u = []\n    for _ in range(_rng.randint(0, 6)):\n        _l = _rng.randint(0, _n); _u.append((_l, _rng.randint(_l, _n), _rng.randint(-5, 5)))\n    _exp = [sum(v for l, r, v in _u if l <= i < r) for i in range(_n)]\n    assert apply_updates(_n, _u) == _exp, f'apply_updates({_n}, {_u}) {_exp} болуы керек'\n_u = [(0, 100000, 1)] * 100000\n_t0 = _time.perf_counter(); _r = apply_updates(100000, _u); _dt = _time.perf_counter() - _t0\nassert _r[0] == 100000 and _dt < 1.0, f'10^5 обновлений, n = 10^5: нужен разностный массив ({_dt:.2f} с)'\n"
    }
   },
   {
    "title": "Самый длинный отрезок с суммой k",
    "prompt": "<p><code>balance</code> — ежедневный доход/расход (может быть отрицательным). <code>longest_sum(balance, k)</code> должна вернуть длину самого длинного непрерывного отрезка, сумма которого ровно <code>k</code>; если его нет — 0. Так как есть отрицательные числа, скользящее окно не работает: нужны префиксная сумма и словарь, где хранится <b>первый</b> индекс каждого значения префикса. O(n).</p>\n<pre><code>longest_sum([1, -1, 5, -2, 3], 3) → 4    # [1, -1, 5, -2]\nlongest_sum([-2, -1, 2, 1], 1)    → 2\nlongest_sum([1, 2], 7)            → 0</code></pre>",
    "hints": [
     "<code>P[j] − P[i] = k</code> ⇔ <code>P[i] = P[j] − k</code>.",
     "Для самого длинного отрезка храните <b>самый первый</b> индекс каждого значения префикса; <code>first = {0: -1}</code>."
    ],
    "check": {
     "tests": "\nassert longest_sum([1, -1, 5, -2, 3], 3) == 4, 'Ожидалось 4'\nassert longest_sum([-2, -1, 2, 1], 1) == 2, 'Ожидалось 2'\nassert longest_sum([1, 2], 7) == 0, 'Нет: 0'\nassert longest_sum([], 0) == 0, 'Пустой список: 0'\nassert longest_sum([0, 0, 0], 0) == 3, 'Нули: 3'\nassert longest_sum([3], 3) == 1, 'Один элемент: 1'\nimport random as _random, time as _time\n_rng = _random.Random(4)\nfor _ in range(60):\n    _x = [_rng.randint(-4, 4) for _ in range(_rng.randint(0, 12))]; _k = _rng.randint(-4, 6)\n    _exp = max([j - i for i in range(len(_x)) for j in range(i + 1, len(_x) + 1) if sum(_x[i:j]) == _k] + [0])\n    assert longest_sum(_x, _k) == _exp, f'longest_sum({_x}, {_k}) {_exp} болуы керек'\n_big = [_rng.randint(-100, 100) for _ in range(200000)]\n_t0 = _time.perf_counter(); longest_sum(_big, 50); _dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'{_dt:.2f} с: нужно решение O(n)'\n"
    }
   },
   {
    "title": "Прямоугольники с заданной суммой",
    "prompt": "<p>Урожайность участков поля — <code>grid</code> (<code>R × C</code>, может быть отрицательной, <code>R, C ≤ 30</code>). <code>count_rects(grid, target)</code> должна вернуть количество прямоугольных подматриц, сумма которых ровно <code>target</code>. Для каждой пары строк <code>(top, bottom)</code> соберите суммы столбцов в одномерный список и посчитайте «количество подсписков с суммой k» через префиксную сумму и словарь: O(R²·C).</p>\n<pre><code>count_rects([[0, 1, 0],\n             [1, 1, 1],\n             [0, 1, 0]], 0) → 4\ncount_rects([[1, -1],\n             [-1, 1]], 0)   → 5</code></pre>",
    "hints": [
     "Когда <code>top</code> зафиксирован, двигайте <code>bottom</code> вниз и обновляйте суммы столбцов <code>col[j]</code>.",
     "Для каждого <code>(top, bottom)</code> <code>col</code> — одномерная задача: <code>seen = {0: 1}</code> и <code>total += seen.get(s − target, 0)</code>."
    ],
    "check": {
     "tests": "\nassert count_rects([[0, 1, 0], [1, 1, 1], [0, 1, 0]], 0) == 4, 'Ожидалось 4 (четыре угловых нуля)'\nassert count_rects([[1, -1], [-1, 1]], 0) == 5, 'Ожидалось 5'\nassert count_rects([[904]], 0) == 0, 'Одна ячейка: 0'\nassert count_rects([[5]], 5) == 1, 'Одна ячейка: 1'\nassert count_rects([], 0) == 0, 'Пустая сетка: 0'\nimport random as _random, time as _time\n_rng = _random.Random(5)\nfor _ in range(25):\n    _R, _C = _rng.randint(1, 4), _rng.randint(1, 4)\n    _g = [[_rng.randint(-2, 2) for _ in range(_C)] for _ in range(_R)]; _t = _rng.randint(-2, 3)\n    _exp = sum(1 for a in range(_R) for b in range(a, _R) for c in range(_C) for d in range(c, _C)\n               if sum(_g[i][j] for i in range(a, b + 1) for j in range(c, d + 1)) == _t)\n    assert count_rects(_g, _t) == _exp, f'count_rects({_g}, {_t}) {_exp} болуы керек'\n_g = [[_rng.randint(-5, 5) for _ in range(30)] for _ in range(30)]\n_t0 = _time.perf_counter(); count_rects(_g, 3); _dt = _time.perf_counter() - _t0\nassert _dt < 2.0, f'Для 30×30: {_dt:.2f} с — нужно решение O(R²·C)'\n"
    }
   }
  ]
 },
 "alg-3": {
  "pr": [
   {
    "title": "Полиномиальный хэш",
    "prompt": "<p>Напишем собственную хэш-функцию. <code>poly_hash(s, base, m)</code>: <code>h = 0</code>, для каждого символа <code>h = (h * base + ord(ch)) % m</code> (схема Горнера). Верните результат. Не используйте встроенный <code>hash()</code> Python: для строк он меняется при каждом запуске.</p>\n<pre><code>poly_hash('ab', 31, 1000)  → 135    # (97 · 31 + 98) % 1000\npoly_hash('', 31, 1000)    → 0</code></pre>",
    "hints": [
     "На каждом шаге берите остаток от <code>% m</code> — число не будет бесконечно расти."
    ],
    "check": {
     "tests": "\nassert poly_hash('ab', 31, 1000) == (97 * 31 + 98) % 1000, \"poly_hash('ab', 31, 1000) должен быть 135\"\nassert poly_hash('', 31, 1000) == 0, 'Пустая строка: 0'\nassert poly_hash('a', 31, 1000) == 97, \"poly_hash('a', 31, 1000) 97\"\nassert poly_hash('абай', 131, 10**9 + 7) == ((((1072 * 131 + 1073) * 131 + 1072) * 131 + 1081) % (10**9 + 7)), 'Хэш кириллицы неверен'\nassert poly_hash('ab', 31, 1000) != poly_hash('ba', 31, 1000), 'Порядок символов должен влиять на хэш'\nassert 0 <= poly_hash('x' * 5000, 257, 97) < 97, 'Результат должен быть в диапазоне [0, m)'\n"
    }
   },
   {
    "title": "Заполнение корзин",
    "prompt": "<p>Целые ключи <code>m</code> распределяются по ячейкам таблицы по правилу <code>key % m</code>. <code>bucket_sizes(keys, m)</code> должна вернуть список длины <code>m</code>: сколько ключей попадает в ячейку <code>i</code>. Для отрицательных ключей Python-оператор <code>%</code> даёт неотрицательный остаток.</p>\n<pre><code>bucket_sizes([10, 18, 3, 26, 5], 8) → [0, 0, 3, 1, 0, 1, 0, 0]</code></pre>",
    "hints": [
     "<code>sizes = [0] * m</code>; для каждого ключа <code>sizes[k % m] += 1</code>."
    ],
    "check": {
     "tests": "\nassert bucket_sizes([10, 18, 3, 26, 5], 8) == [0, 0, 3, 1, 0, 1, 0, 0], '10, 18, 26 — все в ячейке 2'\nassert bucket_sizes([], 3) == [0, 0, 0], 'Нет ключей: нули'\nassert bucket_sizes([-1, 7], 4) == [0, 0, 0, 2], '-1 % 4 = 3 и 7 % 4 = 3'\nassert bucket_sizes([0, 1, 2], 1) == [3], 'Одна ячейка'\n"
    }
   },
   {
    "title": "Количество коллизий",
    "prompt": "<p><code>collisions(keys, m)</code>: ключи по порядку добавляются в хэш-таблицу с цепочками на <code>m</code> ячеек по правилу <code>key % m</code>. Количество ключей, которые попали в непустую ячейку в момент добавления, — это коллизии. Верните это число. Повторный ключ не считается новым элементом (он обновляется, коллизии нет).</p>\n<pre><code>collisions([10, 18, 3, 26, 10], 8) → 2     # 18 және 26; екінші 10 — бар кілт\ncollisions([1, 2, 3], 8)           → 0</code></pre>",
    "hints": [
     "Для каждой ячейки храните множество ключей.",
     "Если ключ уже есть — пропустите; если в ячейке есть другой ключ — это коллизия."
    ],
    "check": {
     "tests": "\nassert collisions([10, 18, 3, 26, 10], 8) == 2, 'Ожидалось 2'\nassert collisions([1, 2, 3], 8) == 0, 'Коллизий нет: 0'\nassert collisions([], 4) == 0, 'Ключей нет: 0'\nassert collisions([5, 5, 5], 2) == 0, 'Если один ключ повторяется: 0'\nassert collisions([0, 4, 8, 12], 4) == 3, 'Все в ячейке 0: 3'\nassert collisions([0, 4, 8, 12], 1) == 3, 'm = 1: 3'\n"
    }
   },
   {
    "title": "Поиск при линейном пробировании",
    "prompt": "<p>Таблица с линейным пробированием <code>table</code>: список длины <code>m</code>, в каждой ячейке <code>None</code> (пусто) или <code>(key, value)</code>. Начальная ячейка целого ключа — <code>key % m</code>. <code>probe_get(table, key)</code> должна вернуть значение или <code>None</code>, если ключа нет. Идите от начальной ячейки, шагая по <code>(i + 1) % m</code>: если дошли до пустой ячейки или обошли всю таблицу — ключа нет.</p>\n<pre><code>table = [(8, 'Тараз'), None, (2, 'Орал'), (10, 'Атырау'), None, None, None, (7, 'Жезқазған')]\nprobe_get(table, 10) → 'Атырау'    # 10 % 8 = 2 — бос емес, 3-те табылды\nprobe_get(table, 15) → None        # 7 → 0 → 1 (бос)</code></pre>",
    "hints": [
     "Пустая ячейка <code>None</code> — конец цепочки: дальше искать бессмысленно.",
     "Чтобы не зациклиться в полной таблице, делайте не больше <code>m</code> шагов."
    ],
    "check": {
     "tests": "\n_t = [(8, 'Тараз'), None, (2, 'Орал'), (10, 'Атырау'), None, None, None, (7, 'Жезқазған')]\nassert probe_get(_t, 10) == 'Атырау', \"probe_get(table, 10) 'Атырау'\"\nassert probe_get(_t, 15) is None, '15 нет: None'\nassert probe_get(_t, 8) == 'Тараз', \"8 % 8 = 0: 'Тараз'\"\nassert probe_get(_t, 7) == 'Жезқазған', \"probe_get(table, 7) 'Жезқазған'\"\nassert probe_get(_t, 18) is None, '18: 2 → 3 → 4 (пусто), None'\n_full = [(0, 'a'), (1, 'b'), (2, 'c')]\nassert probe_get(_full, 5) is None, 'Ключа нет в полной таблице: бесконечного цикла быть не должно, None'\nassert probe_get(_full, 2) == 'c', \"probe_get(_full, 2) 'c'\"\nassert probe_get([None] * 4, 3) is None, 'Пустая таблица: None'\n_wrap = [(3, 'x'), None, None, (7, 'y')]\nassert probe_get(_wrap, 7) == 'y' and probe_get(_wrap, 3) == 'x', 'Переход из конца в начало'\n"
    }
   },
   {
    "title": "Перестройка таблицы",
    "prompt": "<p>Таблица с цепочками <code>buckets</code> — список списков; в каждой ячейке <code>(key, value)</code> пар (целые ключи). <code>rehash(buckets, new_m)</code> должна скопировать все пары в новую таблицу из <code>new_m</code> ячеек по правилу <code>key % new_m</code>. Обходите старые ячейки по порядку от 0, внутри каждой ячейки — тоже по порядку (тогда порядок в каждой новой ячейке определён). Старую таблицу не меняйте.</p>\n<pre><code>rehash([[(4, 'a')], [(1, 'b'), (5, 'c')], [], []], 8)\n→ [[], [(1, 'b')], [], [], [(4, 'a')], [(5, 'c')], [], []]</code></pre>",
    "hints": [
     "<code>[[] for _ in range(new_m)]</code> — это не <code>[[]] * new_m</code> (иначе все ячейки станут копиями одного списка!).",
     "Пересчитайте индекс по новому <code>new_m</code>."
    ],
    "check": {
     "tests": "\nassert rehash([[(4, 'a')], [(1, 'b'), (5, 'c')], [], []], 8) == [[], [(1, 'b')], [], [], [(4, 'a')], [(5, 'c')], [], []], 'Новая таблица неверна'\nassert rehash([[], []], 3) == [[], [], []], 'Пустая таблица'\n_old = [[(2, 'x'), (6, 'y')], []]\n_new = rehash(_old, 2)\nassert _new == [[(2, 'x'), (6, 'y')], []], 'new_m = 2: всё в ячейке 0, порядок сохранён'\nassert _old == [[(2, 'x'), (6, 'y')], []], 'Старую таблицу не меняйте'\n_n = rehash([[(1, 1)]], 4); _n[0].append(9)\nassert _n[1] == [(1, 1)] and _n[2] == [] and _n[3] == [], 'Ячейки должны быть отдельными списками (ошибка [[]] * m)'\n_old = [[(k, k) for k in range(i, 100, 4)] for i in range(4)]\n_new = rehash(_old, 16)\nassert all(k % 16 == i for i, b in enumerate(_new) for k, v in b) and sum(map(len, _new)) == 100, 'Каждый ключ должен быть в своей ячейке'\n"
    }
   },
   {
    "title": "Квадратичное пробирование",
    "prompt": "<p>Ещё один вид открытой адресации — <b>квадратичное пробирование</b>. <code>i</code>-я проба ключа смотрит в ячейку <code>(key % m + i * i) % m</code> (<code>i = 0, 1, 2, ..., m−1</code>). <code>quad_insert(table, key)</code> записывает ключ в первую свободную (<code>None</code>) ячейку и возвращает её индекс; если ключ уже есть — возвращает его индекс (не перезаписывая); если ни одна проба не нашла места — <code>-1</code>.</p>\n<pre><code>t = [None] * 7\nquad_insert(t, 10) → 3\nquad_insert(t, 17) → 4     # 3 бос емес, (3 + 1) % 7 = 4\nquad_insert(t, 24) → 0     # 3, 4 бос емес, (3 + 4) % 7 = 0</code></pre>",
    "hints": [
     "<code>h = key % m</code>, проба: <code>(h + i * i) % m</code>.",
     "Если натолкнулись на существующий ключ, верните его индекс."
    ],
    "check": {
     "tests": "\n_t = [None] * 7\nassert quad_insert(_t, 10) == 3, 'quad_insert(t, 10) 3'\nassert quad_insert(_t, 17) == 4, 'quad_insert(t, 17) 4'\nassert quad_insert(_t, 24) == 0, 'quad_insert(t, 24) 0'\nassert _t == [24, None, None, 10, 17, None, None], f'Состояние таблицы неверно: {_t}'\nassert quad_insert(_t, 17) == 4 and _t.count(17) == 1, 'Существующий ключ не перезаписывается'\n_t2 = [None] * 4\nfor _k in (0, 4, 8):\n    quad_insert(_t2, _k)\nassert _t2 == [0, 4, None, None] or _t2.count(None) == 2, 'm = 4: пробы 0, 1, 0, 1 — только два места'\nassert quad_insert([None] * 4, 2) == 2, 'Пустая таблица: начальная ячейка'\n_t3 = [0, 4, None, None]\nassert quad_insert(_t3, 8) == -1 and _t3 == [0, 4, None, None], 'm = 4: для 8 места не найдётся: -1, таблица не меняется'\n"
    }
   },
   {
    "title": "Множество с надгробиями (tombstone)",
    "prompt": "<p>Напишите с помощью линейного пробирования <code>ProbingSet</code> (множество целых чисел), не используя <code>set</code>/<code>dict</code>. Начальная ёмкость — 8. Методы: <code>add(x)</code>, <code>contains(x)</code>, <code>remove(x)</code> (если элемента нет — ничего не делает), <code>__len__</code>. При удалении не ставьте <code>None</code> в ячейку, а отметьте её специальной меткой <b>tombstone</b> (например, <code>DELETED = object()</code>) — иначе следующие ключи «потеряются». Если число элементов и tombstone-меток больше половины ёмкости, увеличьте ёмкость вдвое и заново распределите живые элементы.</p>\n<pre><code>s = ProbingSet()\ns.add(1); s.add(9)          # екеуі де 1-ұяшыққа ұмтылады\ns.remove(1)\ns.contains(9) → True        # tombstone арқылы өтеміз\nlen(s)        → 1</code></pre>",
    "hints": [
     "Поиск останавливается на <code>None</code>, но проходит мимо tombstone; добавление может переиспользовать tombstone.",
     "При rehash tombstone-метки отбрасываются: в новую таблицу добавляйте только живые элементы."
    ],
    "check": {
     "tests": "\n_s = ProbingSet()\nassert len(_s) == 0 and _s.contains(5) is False, 'Пустое множество'\n_s.add(1); _s.add(9)\nassert _s.contains(1) and _s.contains(9) and len(_s) == 2, 'Добавлены 1 и 9'\n_s.remove(1)\nassert _s.contains(9) is True, 'Нужно пройти через tombstone и найти 9'\nassert _s.contains(1) is False and len(_s) == 1, '1 удалён'\n_s.remove(1); _s.remove(100)\nassert len(_s) == 1, 'Удаление отсутствующего элемента ничего не меняет'\n_s.add(9)\nassert len(_s) == 1, 'Повторное добавление не меняет размер'\n_s.add(-3)\nassert _s.contains(-3), 'Отрицательные числа тоже должны работать'\nimport random as _random\n_rng = _random.Random(6)\n_ps = ProbingSet(); _ref = set()\nfor _ in range(1500):\n    _x = _rng.randint(-200, 200); _op = _rng.random()\n    if _op < 0.5: _ps.add(_x); _ref.add(_x)\n    elif _op < 0.8: _ps.remove(_x); _ref.discard(_x)\n    else: assert _ps.contains(_x) == (_x in _ref), f'contains({_x}) қате'\n    assert len(_ps) == len(_ref), 'len() қате'\nassert all(_ps.contains(_x) for _x in _ref), 'Некоторые элементы потерялись'\n_big = ProbingSet()\nfor _x in range(8000):\n    _big.add(_x * 8)\nassert len(_big) == 8000 and _big.contains(8 * 7999), 'Много элементов: не забудьте увеличить таблицу'\n"
    }
   },
   {
    "title": "Кэш LRU",
    "prompt": "<p>Кэш сайта: <code>LRUCache(capacity)</code>. <code>get(key)</code> возвращает значение (если его нет — <code>-1</code>) и делает ключ «недавно использованным». <code>put(key, value)</code> записывает или обновляет значение; если кэш полон, удаляет ключ, которым <b>дольше всего не пользовались</b>. Обе операции должны работать за O(1). Подсказка: <code>dict</code> в Python помнит порядок вставки — если удалить ключ <code>pop</code> и вставить заново, он уйдёт в конец; самый старый — <code>next(iter(d))</code>.</p>\n<pre><code>c = LRUCache(2)\nc.put(1, 'Алматы'); c.put(2, 'Астана')\nc.get(1)            → 'Алматы'\nc.put(3, 'Шымкент') # 2 шығады\nc.get(2)            → -1</code></pre>",
    "hints": [
     "<code>get</code>: удалите ключ через <code>pop</code> и вставьте заново — он станет «самым новым».",
     "<code>put</code>: при обновлении существующего ключа никто не удаляется; если новый ключ приходит в полный кэш, удаляется <code>next(iter(self.d))</code>."
    ],
    "check": {
     "tests": "\n_c = LRUCache(2)\n_c.put(1, 'Алматы'); _c.put(2, 'Астана')\nassert _c.get(1) == 'Алматы', \"get(1) 'Алматы'\"\n_c.put(3, 'Шымкент')\nassert _c.get(2) == -1, '2 — дольше всех не использовался: должен удалиться'\nassert _c.get(3) == 'Шымкент' and _c.get(1) == 'Алматы', 'Остаются 1 и 3'\n_c.put(1, 'Алматы-2')\n_c.put(4, 'Тараз')\nassert _c.get(3) == -1, 'put обновил 1, он считается новым, 3 удаляется'\nassert _c.get(1) == 'Алматы-2' and _c.get(4) == 'Тараз', 'Обновлённое значение сохраняется'\n_c1 = LRUCache(1)\n_c1.put('а', 1); _c1.put('б', 2)\nassert _c1.get('а') == -1 and _c1.get('б') == 2, 'Ёмкость 1'\nfrom collections import OrderedDict as _OD\nimport random as _random, time as _time\n_rng = _random.Random(7)\n_lru = LRUCache(5); _ref = _OD()\nfor _ in range(2000):\n    _k = _rng.randint(0, 9)\n    if _rng.random() < 0.5:\n        _v = _rng.randint(0, 99); _lru.put(_k, _v)\n        if _k in _ref: _ref.move_to_end(_k)\n        _ref[_k] = _v\n        if len(_ref) > 5: _ref.popitem(last=False)\n    else:\n        _e = _ref.get(_k, -1)\n        if _k in _ref: _ref.move_to_end(_k)\n        assert _lru.get(_k) == _e, f'get({_k}) {_e} болуы керек'\n_big = LRUCache(20000); _t0 = _time.perf_counter()\nfor _i in range(40000):\n    _big.put(_i, _i); _big.get(_i // 2)\nassert _time.perf_counter() - _t0 < 2.0, 'Операции должны выполняться за O(1)'\n"
    }
   }
  ]
 },
 "alg-4": {
  "pr": [
   {
    "title": "Массив подсчёта",
    "prompt": "<p>Первый шаг counting sort. <code>count_array(a, max_value)</code> должна вернуть список длины <code>max_value + 1</code>: <code>c[v]</code> — сколько раз значение <code>v</code> встречается в <code>a</code> (все значения лежат в диапазоне <code>0..max_value</code>).</p>\n<pre><code>count_array([2, 0, 2, 3, 0, 2], 4) → [2, 0, 3, 1, 0]</code></pre>",
    "hints": [
     "<code>c = [0] * (max_value + 1)</code>, затем <code>c[x] += 1</code>."
    ],
    "check": {
     "tests": "\nassert count_array([2, 0, 2, 3, 0, 2], 4) == [2, 0, 3, 1, 0], 'Ожидалось [2, 0, 3, 1, 0]'\nassert count_array([], 2) == [0, 0, 0], 'Пустой список: нули'\nassert count_array([0, 0], 0) == [2], 'max_value = 0: [2]'\nassert count_array([5], 5) == [0, 0, 0, 0, 0, 1], 'Последнее значение: [0, 0, 0, 0, 0, 1]'\n"
    }
   },
   {
    "title": "Это max-куча?",
    "prompt": "<p>Дерево, хранящееся в виде массива: дети узла <code>i</code> — <code>2i + 1</code> и <code>2i + 2</code>. <code>is_max_heap(a)</code>: если каждый узел не меньше своих детей (<code>a[i] ≥ a[бала]</code>), то <code>True</code>.</p>\n<pre><code>is_max_heap([9, 5, 8, 1, 2, 7]) → True\nis_max_heap([9, 5, 8, 6])       → False    # 5 &lt; 6\nis_max_heap([])                 → True</code></pre>",
    "hints": [
     "Достаточно сравнивать родителей с детьми; только если индекс ребёнка меньше <code>n</code>."
    ],
    "check": {
     "tests": "\nassert is_max_heap([9, 5, 8, 1, 2, 7]) is True, 'is_max_heap([9, 5, 8, 1, 2, 7]) True'\nassert is_max_heap([9, 5, 8, 6]) is False, 'Ребёнок у 5 — 6: False'\nassert is_max_heap([]) is True, 'Пустой массив: True'\nassert is_max_heap([1]) is True, 'Один элемент: True'\nassert is_max_heap([3, 3, 3]) is True, 'Равные значения: True'\nassert is_max_heap([5, 6]) is False, 'Ребёнок больше корня: False'\nassert is_max_heap([10, 9, 8, 7, 6, 5, 11]) is False, 'Последний ребёнок 11 > 8: False'\n"
    }
   },
   {
    "title": "Сортировка баллов подсчётом",
    "prompt": "<p>Баллы ЕНТ лежат в диапазоне <code>0..140</code>. <code>sort_scores(scores)</code> должна вернуть новый список баллов, отсортированный по <b>убыванию</b>. Counting sort: не используйте <code>sorted</code> и <code>.sort</code>. O(n + 141).</p>\n<pre><code>sort_scores([95, 120, 95, 60]) → [120, 95, 95, 60]</code></pre>",
    "hints": [
     "Проходите массив подсчёта от конца к началу."
    ],
    "check": {
     "tests": "\nassert sort_scores([95, 120, 95, 60]) == [120, 95, 95, 60], 'Ожидалось [120, 95, 95, 60]'\nassert sort_scores([]) == [], 'Пустой список: []'\nassert sort_scores([0, 140]) == [140, 0], 'Крайние значения: [140, 0]'\nimport random as _random\n_rng = _random.Random(1)\n_x = [_rng.randint(0, 140) for _ in range(5000)]\nassert sort_scores(_x) == sorted(_x, reverse=True), 'Балл 5000 отсортирован неверно'\n"
    }
   },
   {
    "title": "Просеивание вниз",
    "prompt": "<p>Основная операция heapsort. <code>sift_down(a, i, n)</code>: <code>a[0:n]</code> — max-heap, только узел <code>i</code> может стоять не на своём месте. Меняйте его с большим из детей и опускайте вниз, пока он не займёт своё место (на месте, ничего не возвращает). Не трогайте элементы после <code>n</code>.</p>\n<pre><code>a = [1, 9, 8, 5, 6]\nsift_down(a, 0, 5)    # a == [9, 6, 8, 5, 1]</code></pre>",
    "hints": [
     "Найдите наибольший из трёх элементов (узел, левый, правый); если сам узел наибольший — остановитесь.",
     "Индекс ребёнка сравнивайте с <code>n</code>, а не с <code>len(a)</code>."
    ],
    "check": {
     "tests": "\n_a = [1, 9, 8, 5, 6]; sift_down(_a, 0, 5)\nassert _a == [9, 6, 8, 5, 1], f'Ожидалось [9, 6, 8, 5, 1], у вас {_a}'\n_a = [3, 2, 1]; sift_down(_a, 0, 3)\nassert _a == [3, 2, 1], 'Если стоит на месте, не меняется'\n_a = [1, 5, 4, 100]; sift_down(_a, 0, 3)\nassert _a == [5, 1, 4, 100], 'Не трогайте элементы после n: [5, 1, 4, 100]'\n_a = [7]; sift_down(_a, 0, 1); assert _a == [7], 'Бір элемент'\n_a = [5, 1, 4, 3, 2]; sift_down(_a, 1, 5)\nassert _a == [5, 3, 4, 1, 2], 'Опускание внутреннего узла: [5, 3, 4, 1, 2]'\n"
    }
   },
   {
    "title": "Поразрядная сортировка",
    "prompt": "<p>Radix sort (LSD): неотрицательные целые числа сортируем сначала по цифре единиц, затем по десяткам и так далее, каждый раз <b>устойчивой</b> counting sort. <code>radix_sort(a)</code> должна вернуть новый отсортированный список, не используя <code>sorted</code>/<code>.sort</code>. Для каждого разряда достаточно 10 «корзин» (списков): собирать их по порядку — значит сохранять устойчивость.</p>\n<pre><code>radix_sort([170, 45, 75, 90, 802, 24, 2, 66]) → [2, 24, 45, 66, 75, 90, 170, 802]</code></pre>",
    "hints": [
     "Цифра разряда: <code>(x // exp) % 10</code>, <code>exp = 1, 10, 100, ...</code>.",
     "Повторяйте, пока не закончатся разряды самого большого числа; учитывайте пустой список и списки только из нулей."
    ],
    "check": {
     "tests": "\nassert radix_sort([170, 45, 75, 90, 802, 24, 2, 66]) == [2, 24, 45, 66, 75, 90, 170, 802], 'Сортировка неверна'\nassert radix_sort([]) == [], 'Пустой список: []'\nassert radix_sort([0, 0]) == [0, 0], 'Нули: [0, 0]'\n_a = [3, 1, 2]; radix_sort(_a)\nassert _a == [3, 1, 2], 'Не меняйте исходный список'\nimport random as _random\n_rng = _random.Random(2)\nfor _ in range(20):\n    _x = [_rng.randint(0, 10**_rng.randint(1, 7)) for _ in range(_rng.randint(1, 60))]\n    assert radix_sort(_x) == sorted(_x), f'{_x[:6]}... қате сұрыпталды'\n"
    }
   },
   {
    "title": "Построение кучи",
    "prompt": "<p><code>build_heap(a)</code> должна превратить массив в max-heap <b>на месте</b>: начиная с последнего родительского узла (<code>n // 2 − 1</code>) и до 0, выполните sift down для каждого узла. Это O(n) — быстрее, чем добавлять элементы по одному (O(n log n)). Не используйте <code>heapq</code> (это min-heap).</p>\n<pre><code>a = [3, 1, 6, 5, 2, 4]\nbuild_heap(a)    # a == [6, 5, 4, 1, 2, 3]</code></pre>",
    "hints": [
     "Листья сами по себе являются кучей: опускайте только узлы от <code>n // 2 − 1</code> до 0.",
     "Напишите sift down так же, как в предыдущем задании."
    ],
    "check": {
     "tests": "\ndef _is_heap(a):\n    return all(a[(i - 1) // 2] >= a[i] for i in range(1, len(a)))\n_a = [3, 1, 6, 5, 2, 4]; build_heap(_a)\nassert _a == [6, 5, 4, 1, 2, 3], f'Ожидалось [6, 5, 4, 1, 2, 3], у вас {_a}'\n_a = []; build_heap(_a); assert _a == [], 'Бос массив'\n_a = [1]; build_heap(_a); assert _a == [1], 'Бір элемент'\nimport random as _random\n_rng = _random.Random(3)\nfor _ in range(40):\n    _x = [_rng.randint(0, 20) for _ in range(_rng.randint(0, 25))]; _y = list(_x)\n    build_heap(_y)\n    assert _is_heap(_y) and sorted(_y) == sorted(_x), f'{_x}: нәтиже max-heap емес немесе элементтер өзгерді'\n"
    }
   },
   {
    "title": "Почти отсортированный список",
    "prompt": "<p>Временные метки с датчика «почти отсортированы»: каждый элемент отстоит от своей позиции в отсортированном списке не более чем на <code>k</code> позиций. <code>sort_nearly(a, k)</code> должна вернуть новый отсортированный список за O(n log k): держите min-heap размера <code>k + 1</code> (<code>heapq</code>) — его минимум всегда подходит на следующее место. Не используйте <code>sorted</code>/<code>.sort</code>.</p>\n<pre><code>sort_nearly([6, 5, 3, 2, 8, 10, 9], 3) → [2, 3, 5, 6, 8, 9, 10]</code></pre>",
    "hints": [
     "Когда в heap набрано <code>k + 1</code> элементов, извлекайте минимум.",
     "В конце извлеките оставшиеся в heap элементы по порядку."
    ],
    "check": {
     "tests": "\nassert sort_nearly([6, 5, 3, 2, 8, 10, 9], 3) == [2, 3, 5, 6, 8, 9, 10], 'Ожидалось [2, 3, 5, 6, 8, 9, 10]'\nassert sort_nearly([], 2) == [], 'Пустой список: []'\nassert sort_nearly([1, 2, 3], 0) == [1, 2, 3], 'k = 0: список уже отсортирован'\nassert sort_nearly([2, 1], 5) == [1, 2], 'k больше длины списка'\nimport random as _random, time as _time\n_rng = _random.Random(4)\nfor _ in range(40):\n    _n = _rng.randint(0, 20); _k = _rng.randint(0, 4)\n    _s = sorted(_rng.randint(0, 50) for _ in range(_n)); _x = list(_s)\n    for _i in range(0, _n, _k + 1):\n        _blk = _x[_i:_i + _k + 1]; _rng.shuffle(_blk); _x[_i:_i + _k + 1] = _blk\n    assert sort_nearly(_x, _k) == _s, f'sort_nearly({_x}, {_k}) {_s} болуы керек'\n_big = list(range(200000))\nfor _i in range(0, 200000 - 10, 10):\n    _big[_i], _big[_i + 9] = _big[_i + 9], _big[_i]\n_t0 = _time.perf_counter(); _r = sort_nearly(_big, 9); _dt = _time.perf_counter() - _t0\nassert _r == list(range(200000)) and _dt < 2.0, f'200 000 элементов, k = 9: нужно O(n log k) ({_dt:.2f} с)'\n"
    }
   },
   {
    "title": "Наибольший промежуток",
    "prompt": "<p>Координаты заправок на трассе — <code>xs</code> (в произвольном порядке, целые, неотрицательные). <code>max_gap(xs)</code> должна вернуть наибольшее расстояние между двумя соседними заправками в отсортированном порядке; если заправок меньше двух, вернуть 0. Линейное время: идея корзин (bucket). Если заправок <code>n</code>, <code>lo = min</code> и <code>hi = max</code>, то наибольший промежуток не меньше <code>⌈(hi − lo) / (n − 1)⌉</code>; поэтому в корзинах такого размера достаточно хранить только min и max и проверять промежутки между соседними непустыми корзинами. Не используйте <code>sorted</code>/<code>.sort</code>.</p>\n<pre><code>max_gap([3, 6, 9, 1]) → 3\nmax_gap([10])         → 0\nmax_gap([5, 5, 5])    → 0</code></pre>",
    "hints": [
     "Разница внутри одной корзины меньше <code>size</code>, поэтому ответ всегда между двумя корзинами: min следующей непустой корзины − max предыдущей.",
     "Индекс корзины: <code>(x − lo) // size</code>."
    ],
    "check": {
     "tests": "\nassert max_gap([3, 6, 9, 1]) == 3, 'Ожидалось 3'\nassert max_gap([10]) == 0, 'Одна заправка: 0'\nassert max_gap([]) == 0, 'Заправок нет: 0'\nassert max_gap([5, 5, 5]) == 0, 'Все в одной точке: 0'\nassert max_gap([1, 10000000]) == 9999999, 'Две заправки'\nassert max_gap([1, 1, 1, 5, 5]) == 4, 'Повторы: 4'\nimport random as _random, time as _time\n_rng = _random.Random(5)\nfor _ in range(60):\n    _x = [_rng.randint(0, 100) for _ in range(_rng.randint(0, 15))]\n    _s = sorted(_x)\n    _exp = max([b - a for a, b in zip(_s, _s[1:])] + [0])\n    assert max_gap(_x) == _exp, f'max_gap({_x}) {_exp} болуы керек'\n_big = [_rng.randint(0, 10**9) for _ in range(100000)]\n_s = sorted(_big)\nassert max_gap(_big) == max(b - a for a, b in zip(_s, _s[1:])), 'Ошибка на большом тесте'\n"
    }
   }
  ]
 },
 "alg-5": {
  "pr": [
   {
    "title": "Коэффициент баланса",
    "prompt": "<p><code>balance_factor(node)</code> = <code>height(left) − height(right)</code> (высота пустого дерева равна 0). Для пустого узла — 0. Напишите вспомогательную функцию, которая вычисляет высоту рекурсивно.</p>\n<pre><code>balance_factor(Node(3, Node(2, Node(1)))) → 2\nbalance_factor(Node(1, None, Node(2)))    → -1</code></pre>",
    "hints": [
     "Используйте функцию <code>height</code> из урока."
    ],
    "check": {
     "tests": "\nassert balance_factor(Node(3, Node(2, Node(1)))) == 2, 'Левая высота 2, правая 0: 2'\nassert balance_factor(Node(1, None, Node(2))) == -1, 'Только правый ребёнок: -1'\nassert balance_factor(None) == 0, 'Пустой узел: 0'\nassert balance_factor(Node(5)) == 0, 'Лист: 0'\nassert balance_factor(Node(4, Node(2, Node(1), Node(3)), Node(6))) == 1, 'Ожидалось 1'\n"
    }
   },
   {
    "title": "Вставка ключа в BST",
    "prompt": "<p><code>bst_insert(root, key)</code> должна вставить ключ в BST (простое дерево без балансировки) и вернуть корень. При вставке в пустое дерево новый узел становится корнем. Если ключ уже есть — ничего не добавляйте.</p>\n<pre><code>root = None\nfor k in [50, 30, 70, 30]:\n    root = bst_insert(root, k)\n# inorder: [30, 50, 70]</code></pre>",
    "hints": [
     "<code>key &lt; root.key</code> — влево, <code>key &gt; root.key</code> — вправо, равно — ничего.",
     "Перепишите результат рекурсии в <code>root.left</code>/<code>root.right</code>."
    ],
    "check": {
     "tests": "\ndef _h(n):\n    return 0 if n is None else 1 + max(_h(n.left), _h(n.right))\ndef _ino(n):\n    return _ino(n.left) + [n.key] + _ino(n.right) if n else []\ndef _bst(keys):\n    root = None\n    def ins(n, k):\n        if n is None: return Node(k)\n        if k < n.key: n.left = ins(n.left, k)\n        elif k > n.key: n.right = ins(n.right, k)\n        return n\n    for k in keys:\n        root = ins(root, k)\n    return root\n\n_r = None\nfor _k in [50, 30, 70, 30]:\n    _r = bst_insert(_r, _k)\nassert _ino(_r) == [30, 50, 70], f'Inorder должен быть [30, 50, 70], у вас {_ino(_r)}'\nassert _r.key == 50 and _r.left.key == 30 and _r.right.key == 70, 'Неверная структура'\n_one = bst_insert(None, 5)\nassert _one.key == 5 and _one.left is None and _one.right is None, 'Вставка в пустое дерево: новый узел'\n_r2 = None\nfor _k in [1, 2, 3, 4]:\n    _r2 = bst_insert(_r2, _k)\nassert _h(_r2) == 4, 'Вставка по возрастанию в небалансированное BST — высота 4'\n"
    }
   },
   {
    "title": "Наименьший и наибольший ключ",
    "prompt": "<p><code>min_max(root)</code> должна вернуть наименьший и наибольший ключ BST в виде кортежа <code>(min, max)</code>. Пустое дерево — <code>None</code>. Обходить всё дерево не нужно: спуститесь до самого левого и самого правого узла — O(h).</p>\n<pre><code># BST: 8, 3, 10, 1, 6, 14\nmin_max(root) → (1, 14)</code></pre>",
    "hints": [
     "<code>while node.left:</code> — наименьший находится в самом левом узле."
    ],
    "check": {
     "tests": "\ndef _h(n):\n    return 0 if n is None else 1 + max(_h(n.left), _h(n.right))\ndef _ino(n):\n    return _ino(n.left) + [n.key] + _ino(n.right) if n else []\ndef _bst(keys):\n    root = None\n    def ins(n, k):\n        if n is None: return Node(k)\n        if k < n.key: n.left = ins(n.left, k)\n        elif k > n.key: n.right = ins(n.right, k)\n        return n\n    for k in keys:\n        root = ins(root, k)\n    return root\n\nassert min_max(_bst([8, 3, 10, 1, 6, 14])) == (1, 14), 'Ожидалось (1, 14)'\nassert min_max(None) is None, 'Пустое дерево: None'\nassert min_max(Node(7)) == (7, 7), 'Один узел: (7, 7)'\nassert min_max(_bst([5, 4, 3, 2])) == (2, 5), 'Только левое поддерево: (2, 5)'\nassert min_max(_bst([-1, 0, 1])) == (-1, 1), 'Только правое поддерево: (-1, 1)'\n"
    }
   },
   {
    "title": "Несбалансированные узлы",
    "prompt": "<p><code>unbalanced(root)</code> должна вернуть ключи всех узлов, у которых коэффициент баланса — <code>|bf| &gt; 1</code>, в порядке inorder. O(n): вычисляйте высоты снизу вверх за один проход (в каждом узле не вызывайте <code>height</code> повторно).</p>\n<pre><code># 30 → сол 20 → сол 10,  30 → оң 40\nunbalanced(Node(30, Node(20, Node(10, Node(5))), Node(40))) → [20, 30]</code></pre>",
    "hints": [
     "Вспомогательная функция <code>(биіктік, кілттер_тізімі)</code> возвращает пару.",
     "Inorder: левый список + (этот узел, если он несбалансирован) + правый список."
    ],
    "check": {
     "tests": "\ndef _h(n):\n    return 0 if n is None else 1 + max(_h(n.left), _h(n.right))\ndef _ino(n):\n    return _ino(n.left) + [n.key] + _ino(n.right) if n else []\ndef _bst(keys):\n    root = None\n    def ins(n, k):\n        if n is None: return Node(k)\n        if k < n.key: n.left = ins(n.left, k)\n        elif k > n.key: n.right = ins(n.right, k)\n        return n\n    for k in keys:\n        root = ins(root, k)\n    return root\n\nassert unbalanced(Node(30, Node(20, Node(10, Node(5))), Node(40))) == [20, 30], 'Ожидалось [20, 30]'\nassert unbalanced(None) == [], 'Пустое дерево: []'\nassert unbalanced(_bst([4, 2, 6, 1, 3, 5, 7])) == [], 'Полное дерево сбалансировано: []'\nassert unbalanced(_bst([1, 2, 3, 4])) == [1, 2], 'Цепочка, растущая вправо: [1, 2]'\nassert unbalanced(Node(1, None, Node(2))) == [], 'Разница 1: []'\nimport time as _time\n_big = _bst(list(range(500)))\n_t0 = _time.perf_counter(); _r = unbalanced(_big); _dt = _time.perf_counter() - _t0\nassert _r == list(range(498)), 'В цепочке из 500 узлов несбалансированы все, кроме двух последних'\nassert _dt < 1.0, f'{_dt:.2f} с: не пересчитывайте высоту в каждом узле (O(n²))'\n"
    }
   },
   {
    "title": "Тип поворота",
    "prompt": "<p>После вставки ключа <code>node</code> дерево может стать несбалансированным. <code>rotation_case(node)</code> должна вернуть, какой поворот нужен. Если <code>bf(node) &gt; 1</code>, то: при <code>bf ≥ 0</code> левого ребёнка — <code>'LL'</code>, иначе — <code>'LR'</code>. Если <code>bf(node) &lt; −1</code>, то: при <code>bf ≤ 0</code> правого ребёнка — <code>'RR'</code>, иначе — <code>'RL'</code>. Если дерево сбалансировано — <code>None</code>.</p>\n<pre><code>rotation_case(Node(30, Node(10, None, Node(20)))) → 'LR'\nrotation_case(Node(10, None, Node(20, None, Node(30)))) → 'RR'</code></pre>",
    "hints": [
     "Сначала вспомогательные функции <code>height</code> и <code>bf</code>.",
     "Пример из урока: 30, 10, 20 — LR."
    ],
    "check": {
     "tests": "\nassert rotation_case(Node(30, Node(10, None, Node(20)))) == 'LR', \"30, 10, 20: 'LR'\"\nassert rotation_case(Node(10, None, Node(20, None, Node(30)))) == 'RR', \"10, 20, 30: 'RR'\"\nassert rotation_case(Node(30, Node(20, Node(10)))) == 'LL', \"30, 20, 10: 'LL'\"\nassert rotation_case(Node(10, None, Node(30, Node(20)))) == 'RL', \"10, 30, 20: 'RL'\"\nassert rotation_case(Node(2, Node(1), Node(3))) is None, 'Сбалансировано: None'\nassert rotation_case(None) is None, 'Пустой узел: None'\nassert rotation_case(Node(5, Node(3, Node(2), Node(4)))) == 'LL', \"bf левого ребёнка = 0: 'LL'\"\n"
    }
   },
   {
    "title": "Это AVL-дерево?",
    "prompt": "<p><code>is_avl(root)</code>: дерево одновременно (1) является строгим BST (в каждом узле <b>все</b> ключи слева меньше, а справа больше) и (2) в каждом узле, если <code>|bf| ≤ 1</code>, то <code>True</code>. Проверьте оба условия за один рекурсивный обход: O(n).</p>\n<pre><code>is_avl(Node(2, Node(1), Node(3)))          → True\nis_avl(Node(2, Node(3), Node(1)))          → False   # BST емес\nis_avl(Node(3, Node(2, Node(1))))          → False   # теңгерімсіз</code></pre>",
    "hints": [
     "Вспомогательная функция принимает допустимый интервал <code>(lo, hi)</code> и возвращает высоту или <code>−1</code>, если есть ошибка."
    ],
    "check": {
     "tests": "\ndef _h(n):\n    return 0 if n is None else 1 + max(_h(n.left), _h(n.right))\ndef _ino(n):\n    return _ino(n.left) + [n.key] + _ino(n.right) if n else []\ndef _bst(keys):\n    root = None\n    def ins(n, k):\n        if n is None: return Node(k)\n        if k < n.key: n.left = ins(n.left, k)\n        elif k > n.key: n.right = ins(n.right, k)\n        return n\n    for k in keys:\n        root = ins(root, k)\n    return root\n\nassert is_avl(Node(2, Node(1), Node(3))) is True, 'Правильное AVL: True'\nassert is_avl(Node(2, Node(3), Node(1))) is False, 'Не BST: False'\nassert is_avl(Node(3, Node(2, Node(1)))) is False, 'Несбалансировано: False'\nassert is_avl(None) is True, 'Пустое дерево: True'\nassert is_avl(Node(10, Node(5, None, Node(12)), Node(15))) is False, '12 слева от 10: False'\nassert is_avl(_bst([4, 2, 6, 1, 3, 5, 7])) is True, 'Полное BST: True'\nassert is_avl(Node(5, Node(5))) is False, 'Равный ключ: False'\n"
    }
   },
   {
    "title": "Вставка ключа в AVL-дерево",
    "prompt": "<p>В узле хранится высота: <code>Node(key)</code>, <code>height = 1</code>. <code>avl_insert(root, key)</code> должна вставить ключ и вернуть новый корень, сохраняя баланс (если ключ уже есть — без изменений). После вставки обновите высоту в каждом узле пути, а если <code>|bf| &gt; 1</code>, то выполните поворот одного из четырёх случаев (LL, LR, RR, RL). Не забудьте после поворота обновить высоты снизу вверх. Каждая вставка O(log n).</p>\n<pre><code>root = None\nfor k in [10, 20, 30, 40, 50, 25]:\n    root = avl_insert(root, k)\nroot.key → 30</code></pre>",
    "hints": [
     "После поворота сначала обновите высоту узла, который опустился ниже, затем высоту нового корня.",
     "LR: <code>root.left = rotate_left(root.left)</code>, затем <code>rotate_right(root)</code>; RL — наоборот."
    ],
    "check": {
     "tests": "\ndef _ino(n):\n    return _ino(n.left) + [n.key] + _ino(n.right) if n else []\ndef _check(n):\n    if n is None: return 0\n    hl, hr = _check(n.left), _check(n.right)\n    assert abs(hl - hr) <= 1, f'{n.key} түйінінде теңгерім бұзылған'\n    assert n.height == 1 + max(hl, hr), f'{n.key} түйінінің height өрісі қате'\n    return 1 + max(hl, hr)\n_r = None\nfor _k in [10, 20, 30, 40, 50, 25]:\n    _r = avl_insert(_r, _k)\nassert _r.key == 30, f'Корень должен быть 30, у вас {_r.key}'\nassert _ino(_r) == [10, 20, 25, 30, 40, 50], 'Ошибка inorder'\n_check(_r)\n_r = None\nfor _k in [30, 10, 20]:\n    _r = avl_insert(_r, _k)\nassert _r.key == 20 and _r.left.key == 10 and _r.right.key == 30, 'Случай LR: корень 20'\n_r = None\nfor _k in [10, 30, 20]:\n    _r = avl_insert(_r, _k)\nassert _r.key == 20, 'Случай RL: корень 20'\n_r = avl_insert(avl_insert(None, 5), 5)\nassert _ino(_r) == [5], 'Существующий ключ не добавляется повторно'\n_r = None\nfor _k in range(2000):\n    _r = avl_insert(_r, _k)\nassert _check(_r) <= 12, '2000 ключей в порядке возрастания: высота должна быть ≤ 12'\nassert _ino(_r) == list(range(2000)), 'Inorder должен быть 0..1999'\nimport random as _random\n_rng = _random.Random(1)\n_r = None; _keys = set()\nfor _ in range(1500):\n    _k = _rng.randint(0, 3000); _keys.add(_k); _r = avl_insert(_r, _k)\n_check(_r)\nassert _ino(_r) == sorted(_keys), 'Случайные ключи: ошибка inorder'\n"
    }
   },
   {
    "title": "Максимальная высота AVL-дерева",
    "prompt": "<p>В AVL-дереве высоты <code>h</code> есть не меньше <code>N(h)</code> узлов: <code>N(0) = 0</code>, <code>N(1) = 1</code>, <code>N(h) = N(h−1) + N(h−2) + 1</code> (высота одного поддерева <code>h−1</code>, другого <code>h−2</code>). <code>max_avl_height(n)</code> должна вернуть наибольшую высоту, которую может иметь AVL-дерево из <code>n</code> узлов: наибольшее <code>h</code>, при котором <code>N(h) ≤ n</code>. <code>n</code> может быть очень большим (<code>10<sup>18</sup></code>).</p>\n<pre><code>max_avl_height(0)  → 0\nmax_avl_height(4)  → 3\nmax_avl_height(7)  → 4</code></pre>",
    "hints": [
     "Вычисляйте значения <code>N</code> по DP по порядку и увеличивайте <code>h</code>, пока не станет <code>N(h) ≤ n</code>.",
     "<code>N(h)</code> растёт экспоненциально, как Фибоначчи: для 10<sup>18</sup> нужно около 90 шагов."
    ],
    "check": {
     "tests": "\nassert max_avl_height(0) == 0, 'n = 0: 0'\nassert max_avl_height(1) == 1, 'n = 1: 1'\nassert max_avl_height(2) == 2 and max_avl_height(3) == 2, 'n = 2, 3: 2'\nassert max_avl_height(4) == 3, 'n = 4: 3'\nassert max_avl_height(6) == 3, 'n = 6: 3'\nassert max_avl_height(7) == 4, 'n = 7: 4'\nassert max_avl_height(12) == 5 and max_avl_height(11) == 4, 'N(5) = 12'\n_N = [0, 1]\nwhile len(_N) < 100:\n    _N.append(_N[-1] + _N[-2] + 1)\nfor _h in range(1, 90):\n    assert max_avl_height(_N[_h]) == _h and max_avl_height(_N[_h] - 1) == _h - 1, f'N({_h}) = {_N[_h]} шекарасында қате'\nimport math as _math\nassert max_avl_height(10**18) <= 1.45 * _math.log2(10**18) + 2, 'Высота не должна превышать примерно 1.44·log₂ n'\n"
    }
   }
  ]
 },
 "alg-6": {
  "pr": [
   {
    "title": "find со сжатием пути",
    "prompt": "<p><code>parent</code> — массив union-find (если <code>parent[x] == x</code>, то <code>x</code> — корень). <code>find(parent, x)</code> должна вернуть корень <code>x</code> и <b>сжать путь</b>: каждую вершину пути направить прямо на корень через <code>parent</code>. На длинной цепочке рекурсия может быть глубокой: используйте цикл.</p>\n<pre><code>p = [0, 0, 1, 2]\nfind(p, 3) → 0      # p == [0, 0, 0, 0]</code></pre>",
    "hints": [
     "Первый цикл находит корень, второй проходит путь заново и направляет каждую вершину на корень."
    ],
    "check": {
     "tests": "\n_p = [0, 0, 1, 2]\nassert find(_p, 3) == 0, 'find(p, 3) должен быть 0'\nassert _p == [0, 0, 0, 0], f'Путь должен сжаться: [0, 0, 0, 0], у вас {_p}'\n_p = [0, 1, 2]\nassert find(_p, 2) == 2 and _p == [0, 1, 2], 'Сам корень: без изменений'\n_p = [1, 1, 1, 0, 3]\nassert find(_p, 4) == 1 and _p == [1, 1, 1, 1, 1], 'Ожидалось [1, 1, 1, 1, 1]'\n_n = 100000; _p = [max(0, i - 1) for i in range(_n)]\nassert find(_p, _n - 1) == 0 and _p[_n - 1] == 0 and _p[_n // 2] == 0, 'Цепочка из 100 000 звеньев: без рекурсии, путь должен сжаться'\n"
    }
   },
   {
    "title": "В одной группе?",
    "prompt": "<p>В школе <code>n</code> учеников, <code>pairs</code> — пары друзей (друзья друзей тоже в одной группе). <code>same_group(n, pairs, a, b)</code>: если <code>a</code> и <code>b</code> в одной группе, то <code>True</code>. Union-find: для каждой пары <code>union</code>, затем <code>find(a) == find(b)</code>.</p>\n<pre><code>same_group(5, [(0, 1), (1, 2), (3, 4)], 0, 2) → True\nsame_group(5, [(0, 1), (1, 2), (3, 4)], 0, 4) → False</code></pre>",
    "hints": [
     "<code>parent = list(range(n))</code>.",
     "<code>union</code>: <code>parent[find(x)] = find(y)</code>."
    ],
    "check": {
     "tests": "\nassert same_group(5, [(0, 1), (1, 2), (3, 4)], 0, 2) is True, '0 — 1 — 2: True'\nassert same_group(5, [(0, 1), (1, 2), (3, 4)], 0, 4) is False, 'Разные группы: False'\nassert same_group(1, [], 0, 0) is True, 'Сам с собой: True'\nassert same_group(3, [], 0, 1) is False, 'Нет пар: False'\n_n = 50000; _pairs = [(i, i + 1) for i in range(_n - 1)]\nassert same_group(_n, _pairs, 0, _n - 1) is True, 'Длинная цепочка: True'\n"
    }
   },
   {
    "title": "Самая большая группа",
    "prompt": "<p><code>largest_group(n, pairs)</code> возвращает размер самой большой группы (связной компоненты) с помощью union-find. Union by size: в каждом корне храните размер группы, меньшую группу присоединяйте к большей. <code>n ≥ 1</code>.</p>\n<pre><code>largest_group(6, [(0, 1), (1, 2), (3, 4)]) → 3\nlargest_group(3, [])                       → 1</code></pre>",
    "hints": [
     "При объединении <code>size[ra] += size[rb]</code>.",
     "Не объединяйте повторно пару из одной группы — размер прибавится дважды."
    ],
    "check": {
     "tests": "\nassert largest_group(6, [(0, 1), (1, 2), (3, 4)]) == 3, 'Ожидалось 3'\nassert largest_group(3, []) == 1, 'Пар нет: 1'\nassert largest_group(3, [(0, 1), (1, 0), (0, 1)]) == 2, 'Повторная пара не увеличивает размер: 2'\nassert largest_group(4, [(0, 1), (2, 3), (1, 3)]) == 4, 'Все в одной группе: 4'\nassert largest_group(2, [(1, 1)]) == 1, 'Пара с самим собой: 1'\n"
    }
   },
   {
    "title": "Система равенств",
    "prompt": "<p>Переменные — одна строчная латинская буква. <code>eqs</code> — строки вида <code>'a==b'</code> или <code>'a!=b'</code>. <code>consistent(eqs)</code> должна вернуть <code>True</code>, если существуют значения, при которых выполняются все условия сразу. Сначала объедините с помощью union-find все <code>==</code>, затем проверьте каждое <code>!=</code>.</p>\n<pre><code>consistent(['a==b', 'b!=a'])          → False\nconsistent(['a==b', 'b==c', 'a!=d'])  → True\nconsistent(['a!=a'])                  → False</code></pre>",
    "hints": [
     "Структура строки фиксирована: <code>e[0]</code>, <code>e[1:3]</code>, <code>e[3]</code>.",
     "Два прохода: сначала <code>==</code>, затем <code>!=</code> — порядок важен."
    ],
    "check": {
     "tests": "\nassert consistent(['a==b', 'b!=a']) is False, \"['a==b', 'b!=a']: False\"\nassert consistent(['a==b', 'b==c', 'a!=d']) is True, 'Должно быть True'\nassert consistent(['a!=a']) is False, \"'a!=a': False\"\nassert consistent([]) is True, 'Условий нет: True'\nassert consistent(['a!=b', 'b==c', 'c==a']) is False, 'Даже если != идёт первым: False'\nassert consistent(['a==a', 'b!=c']) is True, 'Должно быть True'\nassert consistent(['c==c', 'b==d', 'x!=z']) is True, 'Должно быть True'\n"
    }
   },
   {
    "title": "Соединение сети",
    "prompt": "<p>В офисе <code>n</code> компьютеров, <code>cables</code> — имеющиеся кабели. Кабель можно снять с одной пары и подключить к другой паре. Какое наименьшее число кабелей нужно переставить, чтобы соединить все компьютеры в одну сеть? <code>moves_needed(n, cables)</code> должна вернуть его; если кабелей не хватает — <code>-1</code>. Подсказка: если кабелей меньше <code>n − 1</code>, это невозможно; иначе ответ — число компонент − 1.</p>\n<pre><code>moves_needed(4, [(0, 1), (0, 2), (1, 2)])                 → 1\nmoves_needed(6, [(0, 1), (0, 2), (0, 3), (1, 2)])         → -1</code></pre>",
    "hints": [
     "Начните счётчик компонент с <code>n</code> и уменьшайте его на 1 при каждом успешном <code>union</code> объединении."
    ],
    "check": {
     "tests": "\nassert moves_needed(4, [(0, 1), (0, 2), (1, 2)]) == 1, 'Ожидалось 1'\nassert moves_needed(6, [(0, 1), (0, 2), (0, 3), (1, 2)]) == -1, 'Кабелей не хватает: -1'\nassert moves_needed(6, [(0, 1), (0, 2), (0, 3), (1, 2), (1, 3)]) == 2, 'Ожидалось 2'\nassert moves_needed(1, []) == 0, 'Один компьютер: 0'\nassert moves_needed(3, [(0, 1), (1, 2)]) == 0, 'Все уже соединены: 0'\n"
    }
   },
   {
    "title": "Удаляемые камни",
    "prompt": "<p>На доске — камни <code>stones</code> с координатами <code>(жол, баған)</code> (все разные). Камень можно убрать, если в его строке или столбце есть <b>ещё один</b> камень. <code>max_removed(stones)</code> должна вернуть, сколько камней максимум можно убрать. Объединяйте камни с общей строкой или столбцом через union-find: из каждой группы можно убрать все камни, кроме одного, — ответ <code>тас саны − топ саны</code>.</p>\n<pre><code>max_removed([(0, 0), (0, 1), (1, 0), (1, 2), (2, 1), (2, 2)]) → 5\nmax_removed([(0, 0), (0, 2), (1, 1), (2, 0), (2, 2)])         → 3</code></pre>",
    "hints": [
     "Вершинами делайте не сам камень, а его строку и столбец: <code>('r', r)</code> и <code>('c', c)</code> — каждый камень объединяет эти две вершины.",
     "Количество групп — это число различных корней строк камней."
    ],
    "check": {
     "tests": "\nassert max_removed([(0, 0), (0, 1), (1, 0), (1, 2), (2, 1), (2, 2)]) == 5, 'Ожидалось 5'\nassert max_removed([(0, 0), (0, 2), (1, 1), (2, 0), (2, 2)]) == 3, 'Ожидалось 3'\nassert max_removed([(0, 0)]) == 0, 'Один камень: 0'\nassert max_removed([]) == 0, 'Камней нет: 0'\nassert max_removed([(0, 0), (1, 1), (2, 2)]) == 0, 'Общей строки/столбца нет: 0'\nassert max_removed([(0, 1), (1, 0)]) == 0, 'Общей строки/столбца нет: 0'\nassert max_removed([(5, 1), (5, 9), (3, 9)]) == 2, 'Цепочка: 2'\n"
    }
   },
   {
    "title": "Появление островов",
    "prompt": "<p>В море — сетка <code>R × C</code>, вначале всё вода. По списку <code>positions</code> по очереди появляется суша. <code>islands_over_time(R, C, positions)</code> должна вернуть список количества островов после каждого добавления (остров — группа соседних клеток суши по четырём направлениям). Одна позиция может повторяться. Union-find: новая клетка — +1 остров, каждое успешное объединение с соседней сушей — −1. Всего O(k·α).</p>\n<pre><code>islands_over_time(3, 3, [(0, 0), (0, 1), (1, 2), (2, 1), (1, 1)]) → [1, 1, 2, 3, 1]</code></pre>",
    "hints": [
     "<code>parent</code> в словаре содержит только клетки суши; ключа нет — вода.",
     "Повторная позиция не меняет количество."
    ],
    "check": {
     "tests": "\nassert islands_over_time(3, 3, [(0, 0), (0, 1), (1, 2), (2, 1), (1, 1)]) == [1, 1, 2, 3, 1], 'Ожидалось [1, 1, 2, 3, 1]'\nassert islands_over_time(1, 1, [(0, 0), (0, 0)]) == [1, 1], 'Повторная позиция: [1, 1]'\nassert islands_over_time(2, 2, []) == [], 'Нет позиций: []'\nassert islands_over_time(1, 3, [(0, 0), (0, 2), (0, 1)]) == [1, 2, 1], 'Клетка в середине соединяет два острова'\nassert islands_over_time(2, 2, [(0, 0), (1, 1)]) == [1, 2], 'Диагональ — не сосед: [1, 2]'\nimport random as _random, time as _time\n_rng = _random.Random(2)\ndef _count(land):\n    seen = set(); c = 0\n    for s in land:\n        if s in seen: continue\n        c += 1; st = [s]; seen.add(s)\n        while st:\n            r, cc = st.pop()\n            for q in ((r + 1, cc), (r - 1, cc), (r, cc + 1), (r, cc - 1)):\n                if q in land and q not in seen: seen.add(q); st.append(q)\n    return c\nfor _ in range(20):\n    _R, _C = _rng.randint(1, 5), _rng.randint(1, 5)\n    _pos = [(_rng.randrange(_R), _rng.randrange(_C)) for _ in range(_rng.randint(0, 15))]\n    _exp = [_count(set(_pos[:i + 1])) for i in range(len(_pos))]\n    assert islands_over_time(_R, _C, _pos) == _exp, f'islands_over_time({_R}, {_C}, {_pos}) {_exp} болуы керек'\n_pos = [(r, c) for r in range(200) for c in range(200)]; _rng.shuffle(_pos)\n_t0 = _time.perf_counter(); _r = islands_over_time(200, 200, _pos); _dt = _time.perf_counter() - _t0\nassert _r[-1] == 1 and _dt < 2.0, f'200×200: в конце 1 остров, нужен union-find ({_dt:.2f} с)'\n"
    }
   },
   {
    "title": "Время, когда все знакомы",
    "prompt": "<p>В лагере <code>n</code> детей (<code>0..n−1</code>). <code>logs</code> — <code>(уақыт, a, b)</code>: в это время <code>a</code> и <code>b</code> познакомились (записи даны в произвольном порядке). Знакомство транзитивно. <code>all_connected_time(n, logs)</code> должна вернуть <b>самое раннее</b> время, когда все дети объединяются в одну группу; если так и не объединятся — <code>-1</code>. Отсортируйте логи по времени и с помощью union-find следите за количеством компонент.</p>\n<pre><code>all_connected_time(4, [(20, 0, 1), (10, 1, 2), (30, 2, 3), (25, 0, 2)]) → 30\nall_connected_time(3, [(5, 0, 1)])                                   → -1</code></pre>",
    "hints": [
     "Кортежи <code>sorted(logs)</code> сначала сортируются по времени.",
     "Время, когда количество компонент стало 1, — ответ. Если один ребёнок — 0."
    ],
    "check": {
     "tests": "\nassert all_connected_time(4, [(20, 0, 1), (10, 1, 2), (30, 2, 3), (25, 0, 2)]) == 30, 'Ожидалось 30'\nassert all_connected_time(3, [(5, 0, 1)]) == -1, 'Не объединятся: -1'\nassert all_connected_time(1, []) == 0, 'Один ребёнок: 0'\nassert all_connected_time(2, [(7, 1, 0), (3, 0, 1)]) == 3, 'Самое раннее время: 3'\nassert all_connected_time(3, [(1, 0, 1), (2, 1, 0), (9, 2, 1)]) == 9, 'Ожидалось 9'\nimport random as _random\n_rng = _random.Random(3)\nfor _ in range(30):\n    _n = _rng.randint(2, 6)\n    _logs = [(_rng.randint(0, 50), _rng.randrange(_n), _rng.randrange(_n)) for _ in range(_rng.randint(0, 10))]\n    _exp = -1\n    for _t in sorted(set(x[0] for x in _logs)):\n        _p = list(range(_n))\n        def _f(x):\n            while _p[x] != x: x = _p[x]\n            return x\n        for t2, a, b in _logs:\n            if t2 <= _t: _p[_f(a)] = _f(b)\n        if len({_f(i) for i in range(_n)}) == 1:\n            _exp = _t; break\n    assert all_connected_time(_n, _logs) == _exp, f'all_connected_time({_n}, {_logs}) {_exp} болуы керек'\n"
    }
   }
  ]
 },
 "alg-7": {
  "pr": [
   {
    "title": "Построение словаря графа",
    "prompt": "<p><code>build_graph(edges, directed)</code>: <code>edges</code> — <code>(u, v, w)</code> рёбер. Верните словарь: вершина → список <code>[(көрші, салмақ)]</code> (рёбра в заданном порядке). Если <code>directed=False</code>, каждое ребро добавляется в обе стороны. Каждая встреченная <b>вершина</b> должна быть ключом (даже если у неё нет исходящих рёбер — с пустым списком).</p>\n<pre><code>build_graph([('A', 'B', 5), ('B', 'C', 2)], True)\n→ {'A': [('B', 5)], 'B': [('C', 2)], 'C': []}</code></pre>",
    "hints": [
     "<code>g.setdefault(v, [])</code> — вершина, у которой есть только входящее ребро, тоже становится ключом."
    ],
    "check": {
     "tests": "\nassert build_graph([('A', 'B', 5), ('B', 'C', 2)], True) == {'A': [('B', 5)], 'B': [('C', 2)], 'C': []}, 'Ошибка ориентированного графа'\nassert build_graph([('A', 'B', 5)], False) == {'A': [('B', 5)], 'B': [('A', 5)]}, 'Неориентированный граф: в обе стороны'\nassert build_graph([], False) == {}, 'Нет рёбер: {}'\nassert build_graph([(1, 2, 3), (1, 3, 4)], False) == {1: [(2, 3), (3, 4)], 2: [(1, 3)], 3: [(1, 4)]}, 'Целые вершины, порядок сохраняется'\n"
    }
   },
   {
    "title": "Стоимость маршрута",
    "prompt": "<p><code>graph</code> — вершина → <code>[(көрші, салмақ)]</code>. <code>route_cost(graph, route)</code> должна вернуть общее расстояние по маршруту. Если между двумя вершинами несколько рёбер — берите самое короткое. Если на маршруте нет ребра, вернуть <code>None</code>. Маршрут из одной вершины — 0.</p>\n<pre><code>g = {'Алматы': [('Қонаев', 70), ('Талдықорған', 270)], 'Қонаев': [('Талдықорған', 210)]}\nroute_cost(g, ['Алматы', 'Қонаев', 'Талдықорған']) → 280\nroute_cost(g, ['Қонаев', 'Алматы'])                → None</code></pre>",
    "hints": [
     "Берите соседние пары через <code>zip(route, route[1:])</code>.",
     "<code>graph.get(u, [])</code> — вершина может и не быть ключом."
    ],
    "check": {
     "tests": "\n_g = {'Алматы': [('Қонаев', 70), ('Талдықорған', 270)], 'Қонаев': [('Талдықорған', 210)]}\nassert route_cost(_g, ['Алматы', 'Қонаев', 'Талдықорған']) == 280, 'Ожидалось 280'\nassert route_cost(_g, ['Қонаев', 'Алматы']) is None, 'Ориентированный: обратного ребра нет, None'\nassert route_cost(_g, ['Алматы']) == 0, 'Одна вершина: 0'\nassert route_cost(_g, ['Талдықорған', 'Алматы']) is None, 'Вершина без исходящих рёбер: None'\nassert route_cost({'a': [('b', 9), ('b', 4)]}, ['a', 'b']) == 4, 'Несколько рёбер: самое короткое — 4'\n"
    }
   },
   {
    "title": "Ближайший соседний город",
    "prompt": "<p><code>nearest(graph, u)</code> из <code>u</code> должна вернуть соседа с наименьшим весом среди исходящих рёбер; при равенстве — соседа с меньшим названием (<code>&lt;</code>). Если исходящих рёбер нет — <code>None</code>.</p>\n<pre><code>nearest({'A': [('B', 5), ('C', 2), ('D', 2)]}, 'A') → 'C'\nnearest({'A': []}, 'A')                          → None</code></pre>",
    "hints": [
     "Сравнение кортежа <code>(салмақ, көрші)</code> правильно решает и случай равного веса."
    ],
    "check": {
     "tests": "\nassert nearest({'A': [('B', 5), ('C', 2), ('D', 2)]}, 'A') == 'C', \"Ожидалось 'C'\"\nassert nearest({'A': []}, 'A') is None, 'Ребра нет: None'\nassert nearest({}, 'X') is None, 'Вершины нет: None'\nassert nearest({'A': [('Z', 0)]}, 'A') == 'Z', \"Вес 0: 'Z'\"\n"
    }
   },
   {
    "title": "Ближайшая пожарная часть",
    "prompt": "<p>Карта города <code>graph</code> (неориентированная, каждое ребро записано в обе стороны), <code>stations</code> — вершины, где находятся пожарные части. <code>nearest_station(graph, stations)</code> должна вернуть словарь: для каждой достижимой вершины → <b>расстояние до ближайшей</b> части. Multi-source Dijkstra: положите все части в heap с расстоянием 0 сразу — одного запуска достаточно.</p>\n<pre><code>g = {'A': [('B', 4)], 'B': [('A', 4), ('C', 1)], 'C': [('B', 1)], 'D': []}\nnearest_station(g, ['A', 'C']) → {'A': 0, 'C': 0, 'B': 1}</code></pre>",
    "hints": [
     "Начальная heap: <code>[(0, s) for s in stations]</code>.",
     "Остальное — обычный Dijkstra; расстояние, первым вынутое из heap, окончательно."
    ],
    "check": {
     "tests": "\n_g = {'A': [('B', 4)], 'B': [('A', 4), ('C', 1)], 'C': [('B', 1)], 'D': []}\nassert nearest_station(_g, ['A', 'C']) == {'A': 0, 'C': 0, 'B': 1}, \"Ожидалось {'A': 0, 'C': 0, 'B': 1}\"\nassert nearest_station(_g, []) == {}, 'Нет станций: {}'\nassert nearest_station(_g, ['D']) == {'D': 0}, 'Изолированная станция'\n_g2 = {0: [(1, 5), (2, 1)], 1: [(0, 5), (2, 1)], 2: [(0, 1), (1, 1), (3, 10)], 3: [(2, 10)]}\nassert nearest_station(_g2, [0, 3]) == {0: 0, 3: 0, 2: 1, 1: 2}, 'Ожидалось {0: 0, 3: 0, 2: 1, 1: 2}'\nimport random as _random, time as _time\n_rng = _random.Random(1)\n_n = 20000; _G = {i: [] for i in range(_n)}\nfor _ in range(60000):\n    _a, _b, _w = _rng.randrange(_n), _rng.randrange(_n), _rng.randint(1, 100)\n    _G[_a].append((_b, _w)); _G[_b].append((_a, _w))\n_t0 = _time.perf_counter(); nearest_station(_G, list(range(0, _n, 100))); _dt = _time.perf_counter() - _t0\nassert _dt < 3.0, f'{_dt:.2f} с: запускайте Dijkstra один раз, а не отдельно для каждой станции'\n"
    }
   },
   {
    "title": "Самый надёжный путь",
    "prompt": "<p>Сеть связи: <code>n</code> узлов, <code>edges[i] = (u, v)</code> — неориентированные каналы, <code>probs[i]</code> — вероятность доставки сообщения по нему (0..1). <code>best_prob(n, edges, probs, s, t)</code> должна вернуть наибольшее значение пути от <code>s</code> до <code>t</code> по <b>произведению</b> вероятностей (если пути нет, 0.0). Вариант Dijkstra: max-heap (со знаком минус), вместо расстояния — произведение. При умножении вероятность никогда не растёт, поэтому жадный подход верен.</p>\n<pre><code>best_prob(3, [(0, 1), (1, 2), (0, 2)], [0.5, 0.5, 0.2], 0, 2) → 0.25</code></pre>",
    "hints": [
     "В heap <code>(−ықтималдық, төбе)</code>: самая большая вероятность выходит первой.",
     "<code>t</code> — ответ, когда выходит из heap."
    ],
    "check": {
     "tests": "\nassert abs(best_prob(3, [(0, 1), (1, 2), (0, 2)], [0.5, 0.5, 0.2], 0, 2) - 0.25) < 1e-9, 'Ожидалось 0.25'\nassert abs(best_prob(3, [(0, 1), (1, 2), (0, 2)], [0.5, 0.5, 0.3], 0, 2) - 0.3) < 1e-9, 'Прямой канал лучше: 0.3'\nassert best_prob(3, [(0, 1)], [0.5], 0, 2) == 0.0, 'Пути нет: 0.0'\nassert best_prob(2, [], [], 1, 1) == 1.0, 's = t: 1.0'\n_e = [(0, 1), (1, 2), (2, 3), (0, 3)]\nassert abs(best_prob(4, _e, [0.9, 0.9, 0.9, 0.7], 0, 3) - 0.729) < 1e-9, 'Длинный путь надёжнее: 0.729'\n"
    }
   },
   {
    "title": "Количество кратчайших путей",
    "prompt": "<p>Город <code>n</code>, <code>roads</code> — <code>(u, v, w)</code> двусторонних дорог (<code>w &gt; 0</code>). <code>count_shortest(n, roads, s, t)</code> должна вернуть количество различных путей от <code>s</code> до <code>t</code> наименьшей длины (если пути нет — 0). Во время Dijkstra ведите счётчик <code>ways[v]</code>: если найден более короткий путь — <code>ways[v] = ways[u]</code>, если равный — <code>ways[v] += ways[u]</code>.</p>\n<pre><code>count_shortest(4, [(0, 1, 1), (0, 2, 1), (1, 3, 1), (2, 3, 1)], 0, 3) → 2</code></pre>",
    "hints": [
     "Пропускайте устаревшие записи heap через <code>d &gt; dist[u]</code> — иначе пути одной вершины посчитаются дважды.",
     "Так как вес положительный, <code>ways[u]</code> становится окончательным, когда <code>u</code> выходит из heap."
    ],
    "check": {
     "tests": "\nassert count_shortest(4, [(0, 1, 1), (0, 2, 1), (1, 3, 1), (2, 3, 1)], 0, 3) == 2, 'Ожидалось 2'\nassert count_shortest(3, [(0, 1, 1)], 0, 2) == 0, 'Пути нет: 0'\nassert count_shortest(1, [], 0, 0) == 1, 's = t: 1'\nassert count_shortest(3, [(0, 1, 1), (1, 2, 1), (0, 2, 2)], 0, 2) == 2, 'Прямой и обходной равны: 2'\nassert count_shortest(3, [(0, 1, 1), (0, 1, 1), (1, 2, 5)], 0, 2) == 2, 'Параллельные пути: 2'\n_r = []\nfor _i in range(10):\n    _r += [(2 * _i, 2 * _i + 1, 1), (2 * _i, 2 * _i + 2, 2), (2 * _i + 1, 2 * _i + 2, 1)]\nassert count_shortest(21, _r, 0, 20) == 2 ** 10, 'Цепочка из 10 «ромбов»: 2^10 путей'\nimport random as _random\n_rng = _random.Random(4)\nfor _ in range(30):\n    _n = _rng.randint(2, 6)\n    _rd = [(_rng.randrange(_n), _rng.randrange(_n), _rng.randint(1, 3)) for _ in range(_rng.randint(0, 9))]\n    _rd = [x for x in _rd if x[0] != x[1]]\n    # brute force: DFS over simple paths with edge multiplicity\n    _adj = [[] for _ in range(_n)]\n    for _u, _v, _w in _rd: _adj[_u].append((_v, _w)); _adj[_v].append((_u, _w))\n    _lens = []\n    def _dfs(u, seen, L):\n        if u == _n - 1: _lens.append(L); return\n        for v, w in _adj[u]:\n            if v not in seen: _dfs(v, seen | {v}, L + w)\n    _dfs(0, {0}, 0)\n    _exp = _lens.count(min(_lens)) if _lens else 0\n    assert count_shortest(_n, _rd, 0, _n - 1) == _exp, f'count_shortest({_n}, {_rd}, 0, {_n - 1}) {_exp} болуы керек'\n"
    }
   },
   {
    "title": "Один купон на скидку",
    "prompt": "<p>Дороги такси — <code>roads</code> — <code>(u, v, баға)</code> неориентированные. У пассажира есть один купон: он уменьшает цену одной дороги вдвое (<code>баға // 2</code>). <code>cheapest_with_coupon(n, roads, s, t)</code> должна вернуть наименьшую цену при наиболее выгодном использовании купона (или при неиспользовании); если пути нет — <code>-1</code>. Пространство состояний: <code>(төбе, купон_қолданылды_ма)</code> — Dijkstra на 2n состояниях.</p>\n<pre><code>cheapest_with_coupon(3, [(0, 1, 100), (1, 2, 30), (0, 2, 150)], 0, 2) → 75    # 150 // 2\ncheapest_with_coupon(3, [(0, 1, 100), (1, 2, 30)], 0, 2)              → 80    # 50 + 30</code></pre>",
    "hints": [
     "Из каждого ребра два перехода: без купона (состояние не меняется) и с купоном (только если <code>used == 0</code>, то <code>used</code> становится 1).",
     "Когда <code>t</code> в любом состоянии первым выходит из heap — это ответ."
    ],
    "check": {
     "tests": "\nassert cheapest_with_coupon(3, [(0, 1, 100), (1, 2, 30), (0, 2, 150)], 0, 2) == 75, 'Ожидалось 75'\nassert cheapest_with_coupon(3, [(0, 1, 100), (1, 2, 30)], 0, 2) == 80, 'Ожидалось 80'\nassert cheapest_with_coupon(3, [(0, 1, 5)], 0, 2) == -1, 'Пути нет: -1'\nassert cheapest_with_coupon(2, [], 1, 1) == 0, 's = t: 0'\nassert cheapest_with_coupon(2, [(0, 1, 7)], 0, 1) == 3, '7 // 2 = 3'\nimport random as _random\n_rng = _random.Random(5)\nfor _ in range(40):\n    _n = _rng.randint(2, 6)\n    _rd = [(_rng.randrange(_n), _rng.randrange(_n), _rng.randint(1, 40)) for _ in range(_rng.randint(0, 9))]\n    _best = -1\n    for _ci in range(-1, len(_rd)):\n        _adj = [[] for _ in range(_n)]\n        for _i, (_u, _v, _w) in enumerate(_rd):\n            _ww = _w // 2 if _i == _ci else _w\n            _adj[_u].append((_v, _ww)); _adj[_v].append((_u, _ww))\n        _D = [None] * _n; _pq = [(0, 0)]\n        while _pq:\n            _d, _x = heapq.heappop(_pq)\n            if _D[_x] is not None: continue\n            _D[_x] = _d\n            for _y, _w in _adj[_x]: heapq.heappush(_pq, (_d + _w, _y))\n        if _D[_n - 1] is not None and (_best < 0 or _D[_n - 1] < _best): _best = _D[_n - 1]\n    assert cheapest_with_coupon(_n, _rd, 0, _n - 1) == _best, f'cheapest_with_coupon({_n}, {_rd}, 0, {_n - 1}) {_best} болуы керек'\n"
    }
   },
   {
    "title": "Добраться по расписанию поездов",
    "prompt": "<p>Расписание <code>trains</code> — <code>(u, v, жөнелту, жол_уақыты)</code>: поезд отправляется из <code>u</code> ровно в <code>жөнелту</code> часов и прибывает на <code>v</code> в <code>жөнелту + жол_уақыты</code> часов. На станции можно ждать сколько угодно. Вы выходите в <code>start</code> часов из <code>src</code>. <code>earliest_arrival(trains, src, dst, start)</code> должна вернуть самое раннее время прибытия в <code>dst</code> (если добраться невозможно — <code>-1</code>). Dijkstra по времени: если мы прибыли на <code>u</code> в момент <code>T</code>, то можем сесть только на поезда <code>жөнелту ≥ T</code>.</p>\n<pre><code>tr = [('Астана', 'Қарағанды', 8, 3), ('Қарағанды', 'Балқаш', 10, 5), ('Қарағанды', 'Балқаш', 12, 4), ('Астана', 'Балқаш', 9, 9)]\nearliest_arrival(tr, 'Астана', 'Балқаш', 7) → 16    # 8 → 11, 10-дағы кетті, 12 → 16\nearliest_arrival(tr, 'Астана', 'Балқаш', 9) → 18</code></pre>",
    "hints": [
     "В heap <code>(келу_уақыты, бекет)</code>: ранний приезд всегда лучше, потому что можно дождаться и более поздних поездов.",
     "Рассматривайте только поезда <code>жөнелту ≥ T</code>."
    ],
    "check": {
     "tests": "\n_tr = [('Астана', 'Қарағанды', 8, 3), ('Қарағанды', 'Балқаш', 10, 5), ('Қарағанды', 'Балқаш', 12, 4), ('Астана', 'Балқаш', 9, 9)]\nassert earliest_arrival(_tr, 'Астана', 'Балқаш', 7) == 16, 'Ожидалось 16 (поезд в 8, затем в 12)'\nassert earliest_arrival(_tr, 'Астана', 'Балқаш', 9) == 18, 'Поезд в 8 ушёл: 18'\nassert earliest_arrival(_tr, 'Астана', 'Балқаш', 10) == -1, 'Все поезда ушли: -1'\nassert earliest_arrival(_tr, 'Астана', 'Астана', 5) == 5, 'src = dst: start'\nassert earliest_arrival([('A', 'B', 5, 1)], 'A', 'B', 5) == 6, 'Сесть точно в час отправления можно'\n_tr2 = [('A', 'B', 1, 10), ('A', 'C', 2, 1), ('C', 'B', 4, 1)]\nassert earliest_arrival(_tr2, 'A', 'B', 0) == 5, 'Пересадки ускоряют: 5'\nimport random as _random\n_rng = _random.Random(6)\nfor _ in range(40):\n    _st = 'PQRS'\n    _T = [(_rng.choice(_st), _rng.choice(_st), _rng.randint(0, 12), _rng.randint(1, 4)) for _ in range(_rng.randint(0, 10))]\n    _s0 = _rng.randint(0, 5)\n    _arr = {'P': _s0}\n    for _ in range(12):\n        for u, v, dep, dur in _T:\n            if u in _arr and _arr[u] <= dep and dep + dur < _arr.get(v, 10**9):\n                _arr[v] = dep + dur\n    _exp = _arr.get('S', -1)\n    assert earliest_arrival(_T, 'P', 'S', _s0) == _exp, f'earliest_arrival({_T}, P, S, {_s0}) {_exp} болуы керек'\n"
    }
   }
  ]
 },
 "alg-8": {
  "pr": [
   {
    "title": "Это остовное дерево?",
    "prompt": "<p>Деревень <code>n</code> (<code>0..n−1</code>), <code>edges</code> — <code>(u, v, w)</code> построенных дорог. Образуют ли они <b>spanning tree</b>: все деревни связаны и циклов нет? <code>is_spanning_tree(n, edges)</code> должна вернуть ответ. Union-find: при добавлении каждого ребра, если оба конца уже в одной группе, — цикл; в конце число рёбер должно быть <code>n − 1</code>.</p>\n<pre><code>is_spanning_tree(3, [(0, 1, 4), (1, 2, 5)])            → True\nis_spanning_tree(3, [(0, 1, 4), (1, 2, 5), (0, 2, 1)]) → False</code></pre>",
    "hints": [
     "Если рёбер <code>n − 1</code> и цикла нет, граф обязательно связан."
    ],
    "check": {
     "tests": "\nassert is_spanning_tree(3, [(0, 1, 4), (1, 2, 5)]) is True, 'Дерево: True'\nassert is_spanning_tree(3, [(0, 1, 4), (1, 2, 5), (0, 2, 1)]) is False, 'Рёбер слишком много: False'\nassert is_spanning_tree(1, []) is True, 'Одна деревня: True'\nassert is_spanning_tree(4, [(0, 1, 1), (1, 0, 2), (2, 3, 1)]) is False, 'n − 1 ребро, но есть цикл: False'\nassert is_spanning_tree(2, []) is False, 'Не связан: False'\n"
    }
   },
   {
    "title": "Рёбра, которые выбирает Крускал",
    "prompt": "<p><code>kruskal_edges(n, edges)</code> должна вернуть рёбра, которые выбирает алгоритм Крускала, <b>в порядке выбора</b>. Чтобы ответ был однозначным, отсортируйте рёбра по <code>(w, u, v)</code> (возвращайте кортежи без изменений). Если граф несвязен, получится minimum spanning <b>forest</b> из рёбер.</p>\n<pre><code>kruskal_edges(4, [(0, 1, 3), (1, 2, 1), (2, 3, 4), (0, 2, 2), (1, 3, 5)])\n→ [(1, 2, 1), (0, 2, 2), (2, 3, 4)]</code></pre>",
    "hints": [
     "<code>sorted(edges, key=lambda e: (e[2], e[0], e[1]))</code>.",
     "Ребро берём только тогда, когда его концы в разных группах."
    ],
    "check": {
     "tests": "\nassert kruskal_edges(4, [(0, 1, 3), (1, 2, 1), (2, 3, 4), (0, 2, 2), (1, 3, 5)]) == [(1, 2, 1), (0, 2, 2), (2, 3, 4)], 'Выбранные рёбра неверны'\nassert kruskal_edges(1, []) == [], 'Одна вершина: []'\nassert kruskal_edges(4, [(0, 1, 1), (2, 3, 1)]) == [(0, 1, 1), (2, 3, 1)], 'Лес: два ребра'\nassert kruskal_edges(3, [(0, 1, 2), (1, 2, 2), (0, 2, 2)]) == [(0, 1, 2), (0, 2, 2)], 'При равном весе — по (u, v)'\nassert kruskal_edges(2, [(0, 0, 1), (0, 1, 9)]) == [(0, 1, 9)], 'Ребро на самого себя не берётся'\n"
    }
   },
   {
    "title": "Самый дешёвый лес",
    "prompt": "<p>Соединить все деревни в одну сеть может быть невозможно. <code>forest_cost(n, roads)</code> должна вернуть общий вес minimum spanning <b>forest</b>: сумму весов MST каждой связной компоненты. Крускал даёт его сам: не останавливайтесь, даже если не набрали <code>n − 1</code> рёбер.</p>\n<pre><code>forest_cost(5, [(0, 1, 4), (1, 2, 2), (0, 2, 3), (3, 4, 7)]) → 12</code></pre>",
    "hints": [
     "Отсортируйте рёбра по весу и добавляйте ацикличные с помощью union-find."
    ],
    "check": {
     "tests": "\nassert forest_cost(5, [(0, 1, 4), (1, 2, 2), (0, 2, 3), (3, 4, 7)]) == 12, 'Ожидалось 12 (2 + 3 + 7)'\nassert forest_cost(3, []) == 0, 'Пути нет: 0'\nassert forest_cost(2, [(0, 1, 5), (0, 1, 3)]) == 3, 'Параллельные пути: 3'\nassert forest_cost(4, [(0, 1, 1), (1, 2, 1), (2, 0, 1), (2, 3, 10)]) == 12, 'Ожидалось 12'\n"
    }
   },
   {
    "title": "Соединение точек",
    "prompt": "<p>Точки <code>points</code> в городе нужно соединить кабелем; стоимость кабеля между двумя точками — манхэттенское расстояние <code>|x₁ − x₂| + |y₁ − y₂|</code>. <code>connect_cost(points)</code> должна вернуть наименьшую стоимость соединения всех точек. Граф полный (<code>n²</code> рёбер), поэтому удобен Prim за O(n²) без heap: храните в массиве <code>dist</code> наименьшее расстояние каждой точки до дерева.</p>\n<pre><code>connect_cost([(0, 0), (2, 2), (3, 10), (5, 2), (7, 0)]) → 20\nconnect_cost([(1, 1)])                                → 0</code></pre>",
    "hints": [
     "На каждом шаге берите не вошедшую в дерево точку с наименьшим <code>dist</code>.",
     "После её добавления обновите <code>dist</code> оставшихся точек."
    ],
    "check": {
     "tests": "\nassert connect_cost([(0, 0), (2, 2), (3, 10), (5, 2), (7, 0)]) == 20, 'Ожидалось 20'\nassert connect_cost([(1, 1)]) == 0, 'Одна точка: 0'\nassert connect_cost([]) == 0, 'Точек нет: 0'\nassert connect_cost([(3, 12), (-2, 5), (-4, 1)]) == 18, 'Ожидалось 18'\nassert connect_cost([(0, 0), (0, 0)]) == 0, 'Точки в одном месте: 0'\nimport random as _random, time as _time\n_rng = _random.Random(1)\n_pts = [(_rng.randint(-10**4, 10**4), _rng.randint(-10**4, 10**4)) for _ in range(500)]\n_t0 = _time.perf_counter(); connect_cost(_pts); _dt = _time.perf_counter() - _t0\nassert _dt < 3.0, f'500 точек, {_dt:.2f} с: нужен O(n²) Prim'\n"
    }
   },
   {
    "title": "Самое тяжёлое ребро в MST",
    "prompt": "<p><code>mst_bottleneck(n, roads)</code> должна вернуть вес самого тяжёлого (с наибольшим весом) ребра в minimum spanning tree. Это — наименьший допустимый «порог качества дороги», при котором можно соединить все деревни. Если граф несвязен, <code>-1</code>; если одна деревня — 0.</p>\n<pre><code>mst_bottleneck(4, [(0, 1, 3), (1, 2, 1), (2, 3, 4), (0, 2, 2), (1, 3, 5)]) → 4\nmst_bottleneck(3, [(0, 1, 1)])                                       → -1</code></pre>",
    "hints": [
     "Kruskal добавляет рёбра по возрастанию веса: последнее добавленное ребро — самое тяжёлое.",
     "Остановитесь, когда число компонент станет равным 1."
    ],
    "check": {
     "tests": "\nassert mst_bottleneck(4, [(0, 1, 3), (1, 2, 1), (2, 3, 4), (0, 2, 2), (1, 3, 5)]) == 4, 'Ожидалось 4'\nassert mst_bottleneck(3, [(0, 1, 1)]) == -1, 'Не связан: -1'\nassert mst_bottleneck(1, []) == 0, 'Одна деревня: 0'\nassert mst_bottleneck(2, [(0, 1, 7), (1, 0, 2)]) == 2, 'Параллельные пути: 2'\n"
    }
   },
   {
    "title": "Колодец и труба",
    "prompt": "<p>Все деревни (<code>n</code>) нуждаются в воде. <code>wells[i]</code> — стоимость копания колодца в деревне <code>i</code>, <code>pipes</code> — <code>(u, v, баға)</code>: стоимость соединения двух деревень трубой. Деревня может получить воду из своего колодца или по трубе из другой деревни. <code>water_cost(wells, pipes)</code> должна вернуть наименьшую общую стоимость. Хитрость: добавьте виртуальную вершину <code>n</code> — «подземный источник» — и соедините её с каждой деревней рёбрами веса <code>wells[i]</code>: тогда ответ — обычный MST.</p>\n<pre><code>water_cost([1, 2, 2], [(0, 1, 1), (1, 2, 1)]) → 3     # 0-ге құдық, екі құбыр</code></pre>",
    "hints": [
     "Виртуальная вершина <code>n</code>: рёбра <code>(n, i, wells[i])</code>.",
     "Теперь MST-вес графа с вершиной <code>n + 1</code> — ответ."
    ],
    "check": {
     "tests": "\nassert water_cost([1, 2, 2], [(0, 1, 1), (1, 2, 1)]) == 3, 'Ожидалось 3'\nassert water_cost([5], []) == 5, 'Одна деревня: копать колодец'\nassert water_cost([1, 1], [(0, 1, 100)]) == 2, 'Труба дорогая: два колодца, 2'\nassert water_cost([10, 10, 10], [(0, 1, 1), (1, 2, 1), (0, 2, 1)]) == 12, 'Один колодец + две трубы: 12'\nassert water_cost([], []) == 0, 'Деревень нет: 0'\nimport random as _random\nfrom itertools import product as _prod\n_rng = _random.Random(2)\nfor _ in range(25):\n    _n = _rng.randint(1, 4); _w = [_rng.randint(1, 20) for _ in range(_n)]\n    _p = [(_rng.randrange(_n), _rng.randrange(_n), _rng.randint(1, 20)) for _ in range(_rng.randint(0, 5))]\n    _best = None\n    for _mask in _prod([0, 1], repeat=_n):\n        if not any(_mask): continue\n        _cost = sum(_w[i] for i in range(_n) if _mask[i])\n        _par = list(range(_n + 1))\n        def _f(x):\n            while _par[x] != x: x = _par[x]\n            return x\n        for i in range(_n):\n            if _mask[i]: _par[_f(i)] = _f(_n)\n        for _ww, _u, _v in sorted((w, u, v) for u, v, w in _p):\n            if _f(_u) != _f(_v): _par[_f(_u)] = _f(_v); _cost += _ww\n        if len({_f(i) for i in range(_n + 1)}) == 1 and (_best is None or _cost < _best): _best = _cost\n    assert water_cost(_w, _p) == _best, f'water_cost({_w}, {_p}) {_best} болуы керек'\n"
    }
   },
   {
    "title": "Важные дороги",
    "prompt": "<p><code>n</code> деревень и <code>roads</code> — <code>(u, v, w)</code>; граф связан. Дорога <b>важна</b>, если при её удалении вес MST увеличивается (или граф становится несвязным). <code>critical_roads(n, roads)</code> должна вернуть индексы важных дорог в порядке возрастания. <code>n ≤ 30</code>, если дорог ≤ 60: достаточно удалять каждую дорогу по очереди и заново запускать Kruskal.</p>\n<pre><code>critical_roads(5, [(0, 1, 1), (1, 2, 1), (2, 3, 2), (0, 3, 2), (0, 4, 3), (3, 4, 3), (1, 4, 6)])\n→ [0, 1]</code></pre>",
    "hints": [
     "Запишите Kruskal с вариантом «без ребра с индексом <code>skip</code>»; если граф становится несвязным, верните бесконечность.",
     "Сортировку сделайте один раз и сохраняйте порядок индексов."
    ],
    "check": {
     "tests": "\nassert critical_roads(5, [(0, 1, 1), (1, 2, 1), (2, 3, 2), (0, 3, 2), (0, 4, 3), (3, 4, 3), (1, 4, 6)]) == [0, 1], 'Ожидалось [0, 1]'\nassert critical_roads(4, [(0, 1, 1), (1, 2, 1), (2, 3, 1), (0, 3, 1)]) == [], 'Все в равном цикле: []'\nassert critical_roads(2, [(0, 1, 5)]) == [0], 'Единственная дорога: [0]'\nassert critical_roads(3, [(0, 1, 1), (1, 2, 1), (0, 2, 5)]) == [0, 1], 'Ожидалось [0, 1]'\nassert critical_roads(1, []) == [], 'Одна деревня: []'\n"
    }
   },
   {
    "title": "Разбиение на k кластеров",
    "prompt": "<p>Магазины: <code>n</code> вершин, <code>dists</code> — <code>(u, v, қашықтық)</code>. Разобьём их на <code>k</code> кластеров (районов) так, чтобы <b>наименьшее</b> расстояние между кластерами (spacing) было как можно больше. Kruskal: объединяйте рёбра, пока число компонент не станет равным <code>k</code>; затем самое лёгкое следующее ребро, соединяющее разные компоненты, — и есть ответ. <code>max_spacing(n, dists, k)</code> должна вернуть это значение; если такого ребра нет (между кластерами нет рёбер) — <code>-1</code>. <code>1 ≤ k ≤ n</code>.</p>\n<pre><code>_d = [(0, 1, 1), (1, 2, 2), (2, 3, 10), (3, 4, 1), (0, 4, 12)]\nmax_spacing(5, _d, 2) → 10\nmax_spacing(5, _d, 3) → 2</code></pre>",
    "hints": [
     "Первое ребро «разных групп», встреченное после того, как компонент стало <code>k</code>, — ответ.",
     "Рёбра внутри одной группы (образующие цикл) не межкластерные — пропускайте их."
    ],
    "check": {
     "tests": "\n_d = [(0, 1, 1), (1, 2, 2), (2, 3, 10), (3, 4, 1), (0, 4, 12)]\nassert max_spacing(5, _d, 2) == 10, 'k = 2: 10'\nassert max_spacing(5, _d, 3) == 2, 'k = 3: 2'\nassert max_spacing(5, _d, 5) == 1, 'k = n: самое лёгкое ребро — 1'\nassert max_spacing(5, _d, 1) == -1, 'k = 1: межкластерных рёбер нет, -1'\nassert max_spacing(4, [(0, 1, 3)], 2) == -1, 'Если между кластерами не осталось рёбер: -1'\nassert max_spacing(3, [(0, 1, 5), (1, 2, 5), (0, 2, 5)], 2) == 5, 'Равные веса: 5'\n"
    }
   }
  ]
 },
 "alg-9": {
  "pr": [
   {
    "title": "Дойти до конца",
    "prompt": "<p>Камни на склоне горы: <code>jumps[i]</code> — наибольший прыжок вперёд с камня <code>i</code> (в камнях). Начинаем с камня 0. <code>can_reach(jumps)</code> должна вернуть <code>True</code>, если можно добраться до последнего камня. Greedy: поддерживайте в <code>far</code> самый дальний достижимый индекс; если <code>i &gt; far</code>, то это тупик. O(n).</p>\n<pre><code>can_reach([2, 3, 1, 1, 4]) → True\ncan_reach([3, 2, 1, 0, 4]) → False</code></pre>",
    "hints": [
     "<code>far = max(far, i + jumps[i])</code>."
    ],
    "check": {
     "tests": "\nassert can_reach([2, 3, 1, 1, 4]) is True, 'Должно быть True'\nassert can_reach([3, 2, 1, 0, 4]) is False, 'Пройти от 0 через камень 3 нельзя: False'\nassert can_reach([0]) is True, 'Один камень: True'\nassert can_reach([0, 1]) is False, 'Начальный камень 0: False'\nassert can_reach([1, 0, 1]) is False, 'Ожидалось False'\nimport random as _random, time as _time\n_rng = _random.Random(1)\nfor _ in range(40):\n    _x = [_rng.randint(0, 3) for _ in range(_rng.randint(1, 10))]\n    _ok = [False] * len(_x); _ok[0] = True\n    for _i in range(len(_x)):\n        if _ok[_i]:\n            for _k in range(1, _x[_i] + 1):\n                if _i + _k < len(_x): _ok[_i + _k] = True\n    assert can_reach(_x) == _ok[-1], f'can_reach({_x}) {_ok[-1]} болуы керек'\n_big = [1] * 200000\n_t0 = _time.perf_counter(); _r = can_reach(_big); _dt = _time.perf_counter() - _t0\nassert _r is True and _dt < 1.0, f'Нужен O(n) greedy ({_dt:.2f} с)'\n"
    }
   },
   {
    "title": "Раздача булочек",
    "prompt": "<p>В детском саду у каждого ребёнка свой аппетит <code>need[i]</code>, а количество булочек на тарелках — <code>plates[j]</code>. Каждому ребёнку дают не больше одной тарелки, и ребёнок наедается, только если <code>plates[j] ≥ need[i]</code>. <code>fed_children(need, plates)</code> должна вернуть, сколько детей максимум наедятся. Greedy: отсортируйте оба списка и самому маленькому аппетиту отдавайте самую маленькую тарелку, которая его насытит.</p>\n<pre><code>fed_children([1, 2, 3], [1, 1])    → 1\nfed_children([1, 2], [1, 2, 3])    → 2</code></pre>",
    "hints": [
     "Обходите тарелки от самой маленькой: если тарелка насыщает текущего ребёнка, переходите к следующему ребёнку."
    ],
    "check": {
     "tests": "\nassert fed_children([1, 2, 3], [1, 1]) == 1, 'Ожидалось 1'\nassert fed_children([1, 2], [1, 2, 3]) == 2, 'Ожидалось 2'\nassert fed_children([], [5]) == 0, 'Детей нет: 0'\nassert fed_children([3], []) == 0, 'Тарелок нет: 0'\nassert fed_children([10, 9, 8, 7], [5, 6, 7, 8]) == 2, 'Неотсортированный вход: 2'\nimport random as _random\nfrom itertools import permutations as _perm\n_rng = _random.Random(2)\nfor _ in range(30):\n    _g = [_rng.randint(1, 6) for _ in range(_rng.randint(0, 4))]; _s = [_rng.randint(1, 6) for _ in range(_rng.randint(0, 4))]\n    _best = 0\n    for _p in _perm(range(len(_s))):\n        _best = max(_best, sum(1 for i, j in zip(range(len(_g)), _p) if _s[j] >= _g[i]))\n    assert fed_children(_g, _s) == _best, f'fed_children({_g}, {_s}) {_best} болуы керек'\n"
    }
   },
   {
    "title": "Киоск кумыса",
    "prompt": "<p>Одна чашка кумыса стоит 500 тенге. Покупатели в очереди платят купюрами 500, 1000 или 2000 тенге, в порядке <code>bills</code>. Вначале в кассе денег нет. <code>can_change(bills)</code> должна вернуть <code>True</code>, если каждому покупателю можно дать правильную сдачу. Greedy: при сдаче с 2000 (1500) сначала отдавайте 1000 + 500, если нет — 500 × 3; купюры по 500 универсальны, их стоит беречь.</p>\n<pre><code>can_change([500, 500, 1000, 2000]) → True\ncan_change([1000])                 → False\ncan_change([500, 500, 500, 2000, 1000]) → False</code></pre>",
    "hints": [
     "Достаточно хранить количество купюр 500 и 1000 (2000 никогда не идёт на сдачу)."
    ],
    "check": {
     "tests": "\nassert can_change([500, 500, 1000, 2000]) is True, 'Должно быть True'\nassert can_change([1000]) is False, 'Сдачи нет: False'\nassert can_change([500, 500, 500, 2000, 1000]) is False, 'На 2000 ушли три 500: False'\nassert can_change([]) is True, 'Нет покупателей: True'\nassert can_change([500, 1000, 500, 2000]) is True, 'Сдача 1000 + 500: True'\nassert can_change([500, 500, 1000, 500, 2000, 1000]) is True, 'Если greedy выберет 1000 + 500, на последнюю 1000 останется 500: True'\n"
    }
   },
   {
    "title": "Минимум стрел",
    "prompt": "<p>На празднике синие шары подвешены на горизонтальной линии: каждый шар покрывает отрезок <code>[start, end]</code> (замкнутый). Вертикальная стрела, выпущенная из точки <code>x</code>, лопает все шары, у которых <code>start ≤ x ≤ end</code>. <code>min_arrows(balloons)</code> должна вернуть наименьшее число стрел, которыми лопаются все шары. Greedy: отсортируйте по концу и выпускайте каждую стрелу в <b>конец</b> текущего шара.</p>\n<pre><code>min_arrows([[10, 16], [2, 8], [1, 6], [7, 12]]) → 2\nmin_arrows([[1, 2], [2, 3], [3, 4], [4, 5]])     → 2\nmin_arrows([])                                   → 0</code></pre>",
    "hints": [
     "Сортировка по концу — как в задаче о расписании интервалов.",
     "Если следующий шар начинается после последней стрелы (<code>s &gt; last</code>), нужна новая стрела."
    ],
    "check": {
     "tests": "\nassert min_arrows([[10, 16], [2, 8], [1, 6], [7, 12]]) == 2, 'Ожидалось 2'\nassert min_arrows([[1, 2], [2, 3], [3, 4], [4, 5]]) == 2, 'Замкнутый отрезок: точка касания одной стрелой, 2'\nassert min_arrows([]) == 0, 'Шаров нет: 0'\nassert min_arrows([[1, 2], [3, 4], [5, 6]]) == 3, 'Не пересекаются: 3'\nassert min_arrows([[1, 10], [2, 3], [4, 5]]) == 2, 'Ожидалось 2'\nimport random as _random\n_rng = _random.Random(3)\nfor _ in range(40):\n    _b = []\n    for _ in range(_rng.randint(0, 7)):\n        _s = _rng.randint(0, 15); _b.append([_s, _s + _rng.randint(0, 5)])\n    _best = None\n    from itertools import combinations as _comb\n    _pts = sorted(set(e for s, e in _b))\n    for _k in range(len(_pts) + 1):\n        if any(all(any(s <= x <= e for x in c) for s, e in _b) for c in _comb(_pts, _k)):\n            _best = _k; break\n    assert min_arrows(_b) == (_best or 0), f'min_arrows({_b}) {_best} болуы керек'\n"
    }
   },
   {
    "title": "Заправки",
    "prompt": "<p>На кольцевой дороге <code>n</code> заправок. <code>fuel[i]</code> — топливо, которое заливают на заправке <code>i</code>, <code>cost[i]</code> — расход на путь от <code>i</code> до <code>i+1</code>. Бак вначале пуст. <code>start_station(fuel, cost)</code> должна вернуть индекс начальной заправки, с которой можно полностью объехать круг (если ответ есть, он единственный), иначе <code>-1</code>. Greedy за O(n): если общая сумма отрицательна — <code>-1</code>; иначе начинайте заново с заправки после того места, где бак стал отрицательным.</p>\n<pre><code>start_station([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]) → 3\nstart_station([2, 3, 4], [3, 4, 3])             → -1</code></pre>",
    "hints": [
     "Если, начиная с <code>a</code>, бак становится отрицательным на <code>b</code>, то ни одна заправка между <code>a..b</code> не подходит.",
     "Если общий баланс неотрицательный, последняя точка «перезапуска» — ответ."
    ],
    "check": {
     "tests": "\nassert start_station([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]) == 3, 'Ожидалось 3'\nassert start_station([2, 3, 4], [3, 4, 3]) == -1, 'Топлива не хватает: -1'\nassert start_station([5], [4]) == 0, 'Одна заправка: 0'\nassert start_station([4], [5]) == -1, 'Одна заправка, не хватает: -1'\nassert start_station([3, 1, 1], [1, 2, 2]) == 0, 'Ожидалось 0'\nimport random as _random, time as _time\n_rng = _random.Random(4)\nfor _ in range(60):\n    _n = _rng.randint(1, 7); _f = [_rng.randint(0, 6) for _ in range(_n)]; _c = [_rng.randint(0, 6) for _ in range(_n)]\n    _ok = [s for s in range(_n) if all(sum(_f[(s + j) % _n] - _c[(s + j) % _n] for j in range(k + 1)) >= 0 for k in range(_n))]\n    _got = start_station(_f, _c)\n    if _ok:\n        assert _got in _ok, f'start_station({_f}, {_c}): {_got} жарамайды, мысалы {_ok[0]} болуы мүмкін'\n    else:\n        assert _got == -1, f'start_station({_f}, {_c}) -1 болуы керек'\n_n = 200000; _f = [1] * _n; _c = [1] * _n; _c[0] = 2; _f[-1] = 2\n_t0 = _time.perf_counter(); _r = start_station(_f, _c); _dt = _time.perf_counter() - _t0\nassert _r == 1 and _dt < 1.0, f'Нужно O(n) решение ({_dt:.2f} с)'\n"
    }
   },
   {
    "title": "Минимум прыжков",
    "prompt": "<p><code>jumps[i]</code> — с камня <code>i</code> можно прыгнуть вперёд не более чем на столько камней; до последнего камня всегда можно добраться. <code>min_jumps(jumps)</code> должна вернуть минимальное число прыжков до конца. Greedy (как уровни BFS): когда текущий прыжок доходит до границы своего диапазона, прыгайте на следующую, самую дальнюю границу. O(n).</p>\n<pre><code>min_jumps([2, 3, 1, 1, 4]) → 2\nmin_jumps([0])             → 0</code></pre>",
    "hints": [
     "<code>end</code> — самый дальний индекс, достижимый текущим числом прыжков; <code>far</code> — самый дальний индекс, достижимый следующим прыжком.",
     "Когда <code>i == end</code>, увеличьте число прыжков и присвойте <code>end = far</code>."
    ],
    "check": {
     "tests": "\nassert min_jumps([2, 3, 1, 1, 4]) == 2, 'Ожидалось 2'\nassert min_jumps([0]) == 0, 'Один камень: 0'\nassert min_jumps([1, 1, 1, 1]) == 3, 'Ожидалось 3'\nassert min_jumps([5, 1, 1, 1]) == 1, 'Достаточно одного прыжка: 1'\nassert min_jumps([2, 3, 0, 1, 4]) == 2, 'Ожидалось 2'\nimport random as _random\n_rng = _random.Random(5)\nfor _ in range(40):\n    _x = [_rng.randint(1, 3) for _ in range(_rng.randint(1, 12))]\n    _d = [0] + [10**9] * (len(_x) - 1)\n    for _i in range(len(_x)):\n        for _k in range(1, _x[_i] + 1):\n            if _i + _k < len(_x): _d[_i + _k] = min(_d[_i + _k], _d[_i] + 1)\n    assert min_jumps(_x) == _d[-1], f'min_jumps({_x}) {_d[-1]} болуы керек'\n"
    }
   },
   {
    "title": "Делимый груз",
    "prompt": "<p>В машину помещается не более <code>cap</code> кг груза. <code>goods</code> — <code>(салмақ, құн)</code> пар: груз можно взять любой частью (мука, рис, сахар). <code>max_value(goods, cap)</code> должна вернуть наибольшую общую стоимость <code>float</code>. Greedy: берите по убыванию «цены за 1 кг» (<code>құн / салмақ</code>), последний — частично. В этой задаче greedy верен, а для варианта 0/1 — нет.</p>\n<pre><code>max_value([(10, 600), (20, 1000), (30, 1200)], 50) → 2400.0</code></pre>",
    "hints": [
     "Сортировка по плотности: <code>key=lambda g: g[1] / g[0]</code>, <code>reverse=True</code>.",
     "Если помещается — берите целиком, если не помещается — возьмите часть <code>cap / w</code>."
    ],
    "check": {
     "tests": "\nassert abs(max_value([(10, 600), (20, 1000), (30, 1200)], 50) - 2400.0) < 1e-6, 'Ожидалось 2400.0'\nassert max_value([], 10) == 0, 'Груза нет: 0'\nassert max_value([(5, 100)], 0) == 0, 'Вместимость 0: 0'\nassert abs(max_value([(4, 100)], 1) - 25.0) < 1e-6, 'Часть: 25.0'\nassert abs(max_value([(1, 1), (1, 1)], 5) - 2.0) < 1e-6, 'Всё помещается: 2.0'\nassert abs(max_value([(10, 10), (1, 5)], 2) - 6.0) < 1e-6, 'Сначала плотный груз: 5 + 1 = 6.0'\n"
    }
   },
   {
    "title": "Заказы с дедлайнами",
    "prompt": "<p>Швейный цех выполняет по одному заказу в день (дни 1, 2, 3, ...). <code>orders</code> — <code>(мерзім, пайда)</code>: если заказ выполнен не позже <code>мерзім</code>-го дня, приносит прибыль, иначе от него отказываемся. <code>max_profit(orders)</code> должна вернуть наибольшую общую прибыль. Greedy: начинайте с заказов с наибольшей прибылью и ставьте каждый на <b>самый поздний</b> свободный день не позже дедлайна. Чтобы быстро находить свободный день, используйте union-find: <code>find(d)</code> — первый свободный день, начиная с <code>d</code> влево (0 — свободного дня нет). Всего O(n log n).</p>\n<pre><code>max_profit([(2, 100), (1, 19), (2, 27), (1, 25), (3, 15)]) → 142   # 100 + 27 + 15</code></pre>",
    "hints": [
     "После занятия дня <code>parent[day] = day − 1</code> следующий поиск автоматически сдвигается влево.",
     "Заказ с дедлайном больше <code>n</code> можно ограничить днём <code>n</code> — всё равно больше <code>n</code> дней не нужно."
    ],
    "check": {
     "tests": "\nassert max_profit([(2, 100), (1, 19), (2, 27), (1, 25), (3, 15)]) == 142, 'Ожидалось 142'\nassert max_profit([]) == 0, 'Заказов нет: 0'\nassert max_profit([(1, 5), (1, 7), (1, 3)]) == 7, 'Все дедлайны — 1: только один, 7'\nassert max_profit([(10**9, 4), (10**9, 6)]) == 10, 'Большой дедлайн: оба, 10'\nassert max_profit([(4, 20), (1, 10), (1, 40), (1, 30)]) == 60, 'Ожидалось 60'\nimport random as _random, time as _time\nfrom itertools import permutations as _perm\n_rng = _random.Random(6)\nfor _ in range(30):\n    _o = [(_rng.randint(1, 4), _rng.randint(1, 30)) for _ in range(_rng.randint(0, 6))]\n    _best = 0\n    for _p in _perm(range(len(_o))):\n        _day, _s = 0, 0\n        for _i in _p:\n            if _day + 1 <= _o[_i][0]: _day += 1; _s += _o[_i][1]\n        _best = max(_best, _s)\n    assert max_profit(_o) == _best, f'max_profit({_o}) {_best} болуы керек'\n_big = [(_rng.randint(1, 50000), _rng.randint(1, 10**6)) for _ in range(100000)]\n_t0 = _time.perf_counter(); max_profit(_big); _dt = _time.perf_counter() - _t0\nassert _dt < 2.0, f'{_dt:.2f} с: ищите свободный день через union-find'\n"
    }
   }
  ]
 },
 "alg-10": {
  "pr": [
   {
    "title": "Набрать точную сумму",
    "prompt": "<p>В кошельке есть купюры номиналов <code>coins</code>, каждая используется <b>один раз</b>. <code>can_pay(coins, total)</code> должна вернуть <code>True</code>, если можно набрать ровно сумму <code>total</code>. DP как у 0/1 knapsack: <code>ok[s]</code> — можно ли набрать сумму <code>s</code>; для каждой купюры обновляйте суммы в <b>обратном</b> порядке.</p>\n<pre><code>can_pay([500, 200, 1000, 200], 1400) → True\ncan_pay([500, 500], 600)             → False</code></pre>",
    "hints": [
     "<code>ok[0] = True</code>.",
     "Перебирайте суммы от большей к меньшей, тогда одна купюра не используется дважды."
    ],
    "check": {
     "tests": "\nassert can_pay([500, 200, 1000, 200], 1400) is True, '1000 + 200 + 200: True'\nassert can_pay([500, 500], 600) is False, 'Должно быть False'\nassert can_pay([], 0) is True, 'total = 0: True'\nassert can_pay([5], 10) is False, 'Купюру нельзя использовать дважды: False'\nassert can_pay([3, 34, 4, 12, 5, 2], 9) is True, '4 + 5: True'\nassert can_pay([3, 34, 4, 12, 5, 2], 30) is False, 'Должно быть False'\nimport random as _random\nfrom itertools import combinations as _comb\n_rng = _random.Random(1)\nfor _ in range(30):\n    _c = [_rng.randint(1, 15) for _ in range(_rng.randint(0, 7))]; _t = _rng.randint(0, 40)\n    _exp = any(sum(x) == _t for k in range(len(_c) + 1) for x in _comb(_c, k))\n    assert can_pay(_c, _t) == _exp, f'can_pay({_c}, {_t}) {_exp} болуы керек'\n"
    }
   },
   {
    "title": "Самая длинная общая подстрока",
    "prompt": "<p><code>common_substring(a, b)</code> должна вернуть длину самой длинной <b>непрерывной</b> общей подстроки двух строк. DP: <code>dp[i][j]</code> — длина общей части, оканчивающейся в <code>a[i−1]</code> и <code>b[j−1]</code>; если символы равны, <code>dp[i−1][j−1] + 1</code>, иначе 0. O(n·m).</p>\n<pre><code>common_substring('abcde', 'xbcdy') → 3    # 'bcd'\ncommon_substring('алматы', 'алма') → 4</code></pre>",
    "hints": [
     "Достаточно хранить только предыдущую строку.",
     "Отличие от LCS (подпоследовательности): если символы не равны, 0, а не max."
    ],
    "check": {
     "tests": "\nassert common_substring('abcde', 'xbcdy') == 3, \"Общая 'bcd': 3\"\nassert common_substring('abc', 'def') == 0, 'Общих символов нет: 0'\nassert common_substring('', 'abc') == 0, 'Пустая строка: 0'\nassert common_substring('алматы', 'алма') == 4, \"'алма': 4\"\nassert common_substring('aaaa', 'aa') == 2, 'Ожидалось 2'\nimport random as _random\n_rng = _random.Random(2)\nfor _ in range(40):\n    _a = ''.join(_rng.choice('аб') for _ in range(_rng.randint(0, 9))); _b = ''.join(_rng.choice('аб') for _ in range(_rng.randint(0, 9)))\n    _exp = max([j - i for i in range(len(_a)) for j in range(i + 1, len(_a) + 1) if _a[i:j] in _b] + [0])\n    assert common_substring(_a, _b) == _exp, f'common_substring({_a!r}, {_b!r}) {_exp} болуы керек'\n"
    }
   },
   {
    "title": "Неограниченный склад",
    "prompt": "<p>На оптовом складе каждого товара <code>(салмақ, пайда)</code> — бесконечно много. В машину помещается <code>cap</code> кг. <code>unbounded_best(items, cap)</code> должна вернуть наибольшую общую прибыль (товар нельзя делить, но любое количество каждого вида взять можно). DP: <code>best[c] = max(best[c − w] + v)</code>; суммы веса проходите в <b>возрастающем</b> порядке — тогда один товар берётся повторно.</p>\n<pre><code>unbounded_best([(2, 3), (3, 5), (4, 7)], 10) → 17     # 4 + 4 + 2</code></pre>",
    "hints": [
     "Отличие от 0/1 knapsack — перебирать вместимости в возрастающем порядке."
    ],
    "check": {
     "tests": "\nassert unbounded_best([(2, 3), (3, 5), (4, 7)], 10) == 17, 'Ожидалось 17'\nassert unbounded_best([], 10) == 0, 'Товара нет: 0'\nassert unbounded_best([(5, 10)], 4) == 0, 'Ничего не помещается: 0'\nassert unbounded_best([(1, 1), (3, 4)], 7) == 9, '3 + 3 + 1: 9'\nassert unbounded_best([(6, 30), (3, 14), (4, 16), (2, 9)], 10) == 48, 'Ожидалось 48'\n"
    }
   },
   {
    "title": "Операции вставки и удаления",
    "prompt": "<p>Разрешены только <b>удаление символа</b> и <b>вставка символа</b> (замены нет). <code>min_ops(a, b)</code> должна вернуть наименьшее число операций, чтобы превратить <code>a</code> в <code>b</code>. Подсказка: наибольшая общая подпоследовательность (LCS) остаётся без изменений; остальное удаляем из <code>a</code> и вставляем в <code>b</code>: <code>len(a) + len(b) − 2·LCS</code>.</p>\n<pre><code>min_ops('қала', 'қалам') → 1\nmin_ops('sea', 'eat')    → 2\nmin_ops('abc', '')       → 3</code></pre>",
    "hints": [
     "Сначала напишите DP для LCS из задачи DSA1."
    ],
    "check": {
     "tests": "\nassert min_ops('қала', 'қалам') == 1, \"min_ops('қала', 'қалам') 1\"\nassert min_ops('sea', 'eat') == 2, \"min_ops('sea', 'eat') 2\"\nassert min_ops('abc', '') == 3, 'Удалить всё: 3'\nassert min_ops('', '') == 0, 'Пустые строки: 0'\nassert min_ops('ab', 'ba') == 2, 'Замен нет: 2'\nassert min_ops('leetcode', 'etco') == 4, 'Ожидалось 4'\n"
    }
   },
   {
    "title": "Количество самых длинных возрастающих подпоследовательностей",
    "prompt": "<p><code>count_lis(a)</code> должна вернуть <b>количество</b> самых длинных строго возрастающих подпоследовательностей (различных по наборам индексов). O(n²) DP: для каждого <code>i</code> — <code>length[i]</code> (длина самой длинной цепочки, заканчивающейся на этом элементе) и <code>count[i]</code> (число таких цепочек). Пустой список — 0.</p>\n<pre><code>count_lis([1, 3, 5, 4, 7]) → 2      # 1,3,5,7 және 1,3,4,7\ncount_lis([2, 2, 2])       → 3</code></pre>",
    "hints": [
     "Если найдена более длинная цепочка, присвойте <code>count[i] = count[j]</code>; если найдена равная длина — <code>count[i] += count[j]</code>.",
     "Ответ — сумма <code>count</code> по всем <code>i</code>, у которых длина максимальна."
    ],
    "check": {
     "tests": "\nassert count_lis([1, 3, 5, 4, 7]) == 2, 'Ожидалось 2'\nassert count_lis([2, 2, 2]) == 3, 'Каждый элемент — цепочка длины 1: 3'\nassert count_lis([]) == 0, 'Пустой список: 0'\nassert count_lis([5]) == 1, 'Один элемент: 1'\nassert count_lis([1, 2, 4, 3, 5, 4, 7, 2]) == 3, 'Ожидалось 3'\nimport random as _random\nfrom itertools import combinations as _comb\n_rng = _random.Random(3)\nfor _ in range(30):\n    _x = [_rng.randint(0, 6) for _ in range(_rng.randint(1, 9))]\n    for _L in range(len(_x), 0, -1):\n        _c = sum(1 for idx in _comb(range(len(_x)), _L) if all(_x[idx[k]] < _x[idx[k + 1]] for k in range(_L - 1)))\n        if _c: break\n    assert count_lis(_x) == _c, f'count_lis({_x}) {_c} болуы керек'\n"
    }
   },
   {
    "title": "Распределение работы: bitmask",
    "prompt": "<p><code>n</code> курьеров и <code>n</code> заказов (<code>n ≤ 12</code>). <code>cost[i][j]</code> — время доставки заказа <code>j</code> курьером <code>i</code>. Каждый курьер получает ровно один заказ. <code>min_assign(cost)</code> должна вернуть наименьшее общее время. Bitmask DP: <code>dp[mask]</code> — наименьшее время, когда первые <code>popcount(mask)</code> курьеров взяли заказы из набора <code>mask</code>. O(2ⁿ·n).</p>\n<pre><code>min_assign([[9, 2, 7], [6, 4, 3], [5, 8, 1]]) → 9     # 0→1 (2), 1→0 (6), 2→2 (1)</code></pre>",
    "hints": [
     "Номер следующего курьера — число единиц в <code>mask</code>: <code>bin(mask).count('1')</code>.",
     "Добавление непустого заказа <code>j</code>: <code>mask | (1 &lt;&lt; j)</code>."
    ],
    "check": {
     "tests": "\nassert min_assign([[9, 2, 7], [6, 4, 3], [5, 8, 1]]) == 9, 'Ожидалось 9 (2 + 6 + 1)'\nassert min_assign([[5]]) == 5, 'Один курьер: 5'\nassert min_assign([]) == 0, 'Курьеров нет: 0'\nassert min_assign([[1, 2], [2, 1]]) == 2, 'Ожидалось 2'\nimport random as _random, time as _time\nfrom itertools import permutations as _perm\n_rng = _random.Random(4)\nfor _ in range(15):\n    _n = _rng.randint(1, 6); _c = [[_rng.randint(1, 30) for _ in range(_n)] for _ in range(_n)]\n    _exp = min(sum(_c[i][p[i]] for i in range(_n)) for p in _perm(range(_n)))\n    assert min_assign(_c) == _exp, f'min_assign({_c}) {_exp} болуы керек'\n_c = [[_rng.randint(1, 100) for _ in range(11)] for _ in range(11)]\n_t0 = _time.perf_counter(); min_assign(_c); _dt = _time.perf_counter() - _t0\nassert _dt < 4.0, f'Для n = 11: {_dt:.2f} с, нужен bitmask DP (не n!)'\n"
    }
   },
   {
    "title": "Выбранные предметы",
    "prompt": "<p>0/1 knapsack, но теперь нужно знать не только значение, но и <b>какие предметы</b> взяты. <code>items</code> — <code>(салмақ, пайда)</code>, <code>cap</code> — вместимость. <code>pick_items(items, cap)</code> должна вернуть <code>(ең_үлкен_пайда, индекстер)</code>, индексы в порядке возрастания; если оптимальных наборов несколько — любой. Постройте 2D-таблицу <code>dp[i][c]</code> и восстановите ответ, идя назад: если <code>dp[i][c] != dp[i−1][c]</code>, то предмет <code>i</code> взят.</p>\n<pre><code>pick_items([(1, 1), (3, 4), (4, 5), (5, 7)], 7) → (9, [1, 2])</code></pre>",
    "hints": [
     "Для восстановления одномерной DP недостаточно: нужна полная таблица <code>(n + 1) × (cap + 1)</code>.",
     "Идя назад, если предмет взят, вычтите из <code>c</code> его вес."
    ],
    "check": {
     "tests": "\n_v, _idx = pick_items([(1, 1), (3, 4), (4, 5), (5, 7)], 7)\nassert _v == 9 and _idx == [1, 2], f'Ожидалось (9, [1, 2]), у вас {(_v, _idx)}'\nassert pick_items([], 5) == (0, []), 'Предметов нет: (0, [])'\nassert pick_items([(10, 100)], 5) == (0, []), 'Ничего не помещается: (0, [])'\nassert pick_items([(2, 3)], 2) == (3, [0]), 'Один предмет: (3, [0])'\nimport random as _random\nfrom itertools import combinations as _comb\n_rng = _random.Random(5)\nfor _ in range(40):\n    _it = [(_rng.randint(1, 8), _rng.randint(0, 20)) for _ in range(_rng.randint(0, 7))]; _cap = _rng.randint(0, 20)\n    _best = max(sum(_it[i][1] for i in c) for k in range(len(_it) + 1) for c in _comb(range(len(_it)), k) if sum(_it[i][0] for i in c) <= _cap)\n    _v, _idx = pick_items(_it, _cap)\n    assert _v == _best, f'pick_items({_it}, {_cap}): пайда {_best} болуы керек'\n    assert _idx == sorted(set(_idx)) and all(0 <= i < len(_it) for i in _idx), 'Индекстер өсу ретімен, қайталанусыз болуы керек'\n    assert sum(_it[i][0] for i in _idx) <= _cap and sum(_it[i][1] for i in _idx) == _best, f'Таңдалған заттар {_idx} жарамсыз немесе пайдасы сәйкес емес'\n"
    }
   },
   {
    "title": "Вложенные коробки",
    "prompt": "<p>Подарочные коробки <code>(ені, биіктігі)</code>. Одну коробку можно положить в другую, если обе её стороны <b>строго</b> меньше (поворачивать нельзя). <code>max_nested(boxes)</code> должна вернуть наибольшее число коробок, вложенных одна в другую. Хитрость: отсортируйте по ширине по возрастанию, а при равной ширине — по высоте по <b>убыванию</b>, и примените LIS к высотам (тогда коробки равной ширины не попадут в одну цепочку). O(n log n) — <code>bisect</code>.</p>\n<pre><code>max_nested([(5, 4), (6, 4), (6, 7), (2, 3)]) → 3     # (2,3) → (5,4) → (6,7)\nmax_nested([(1, 1), (1, 1)])                 → 1</code></pre>",
    "hints": [
     "Ключ сортировки: <code>(w, -h)</code>.",
     "Метод <code>tails</code> из задачи DSA1: <code>bisect_left</code> — для строго возрастающей цепочки."
    ],
    "check": {
     "tests": "\nassert max_nested([(5, 4), (6, 4), (6, 7), (2, 3)]) == 3, 'Ожидалось 3'\nassert max_nested([(1, 1), (1, 1)]) == 1, 'Одинаковые коробки: 1'\nassert max_nested([]) == 0, 'Коробок нет: 0'\nassert max_nested([(1, 3), (1, 2), (1, 1)]) == 1, 'Ширина одинаковая: 1'\nassert max_nested([(4, 5), (4, 6), (6, 7), (2, 3), (1, 1)]) == 4, 'Ожидалось 4'\nimport random as _random, time as _time\n_rng = _random.Random(6)\nfor _ in range(40):\n    _b = [(_rng.randint(1, 6), _rng.randint(1, 6)) for _ in range(_rng.randint(0, 9))]\n    _s = sorted(_b); _d = [1] * len(_s)\n    for _i in range(len(_s)):\n        for _j in range(_i):\n            if _s[_j][0] < _s[_i][0] and _s[_j][1] < _s[_i][1]: _d[_i] = max(_d[_i], _d[_j] + 1)\n    assert max_nested(_b) == max(_d + [0]), f'max_nested({_b}) {max(_d + [0])} болуы керек'\n_big = [(_rng.randint(1, 10**6), _rng.randint(1, 10**6)) for _ in range(50000)]\n_t0 = _time.perf_counter(); max_nested(_big); _dt = _time.perf_counter() - _t0\nassert _dt < 2.0, f'50 000 коробок, {_dt:.2f} с: нужен O(n log n) LIS'\n"
    }
   }
  ]
 },
 "alg-11": {
  "pr": [
   {
    "title": "Самая длинная граница",
    "prompt": "<p>Строка <b>граница</b> — это подстрока, не равная самой строке, которая одновременно является и префиксом, и суффиксом. <code>longest_border(s)</code> должна вернуть саму самую длинную границу (как строку); если её нет — <code>''</code>. Последнее значение prefix function <code>pi[-1]</code> — её длина.</p>\n<pre><code>longest_border('abacaba') → 'aba'\nlongest_border('aaaa')    → 'aaa'\nlongest_border('abc')     → ''</code></pre>",
    "hints": [
     "Напишите <code>prefix_function</code> по образцу из урока.",
     "Пустую строку проверьте отдельно."
    ],
    "check": {
     "tests": "\nassert longest_border('abacaba') == 'aba', \"Ожидалось 'aba'\"\nassert longest_border('aaaa') == 'aaa', \"Граница может перекрываться: 'aaa'\"\nassert longest_border('abc') == '', \"Границы нет: ''\"\nassert longest_border('') == '', \"Пустая строка: ''\"\nassert longest_border('a') == '', \"Один символ: ''\"\nassert longest_border('ананана') == 'анана', \"Ожидалось 'анана'\"\nimport time as _time\n_s = 'ab' * 50000\n_t0 = _time.perf_counter(); _r = longest_border(_s); _dt = _time.perf_counter() - _t0\nassert _r == 'ab' * 49999 and _dt < 1.0, f'Нужен O(n) prefix function ({_dt:.2f} с)'\n"
    }
   },
   {
    "title": "Циклический сдвиг",
    "prompt": "<p><code>is_rotation(a, b)</code>: строка <code>b</code> является циклическим сдвигом <code>a</code> (когда несколько символов переносятся из начала в конец) — <code>True</code>. Длины должны совпадать. Хитрость: <code>b</code> встречается внутри <code>a + a</code>. Ищите через KMP: есть ли в prefix function строки <code>b + '#' + a + a</code> значение <code>len(b)</code> (значение <code>'#'</code> в строках не встречается).</p>\n<pre><code>is_rotation('алматы', 'атыалм') → True\nis_rotation('ab', 'ab')         → True\nis_rotation('ab', 'aa')         → False</code></pre>",
    "hints": [
     "Сначала сравните длины.",
     "В месте, где значение prefix function равно <code>len(b)</code>, <code>b</code> полностью найдено."
    ],
    "check": {
     "tests": "\nassert is_rotation('алматы', 'атыалм') is True, \"'атыалм' — сдвиг: True\"\nassert is_rotation('ab', 'ab') is True, 'Несдвинутая строка тоже сдвиг: True'\nassert is_rotation('ab', 'aa') is False, 'Должно быть False'\nassert is_rotation('', '') is True, 'Пустые строки: True'\nassert is_rotation('abc', 'ab') is False, 'Длина разная: False'\nassert is_rotation('aab', 'aba') is True and is_rotation('aab', 'bba') is False, 'Сдвиги aab'\n"
    }
   },
   {
    "title": "Первое вхождение",
    "prompt": "<p><code>first_index(text, pattern)</code> в тексте <code>pattern</code> должна вернуть индекс первого вхождения, а если его нет — <code>-1</code>; пустой образец — 0. Через KMP за O(n + m): для <code>i</code>, на котором <code>len(pattern)</code> впервые встречается в prefix function строки <code>pattern + '#' + text</code>, ответ — <code>i − 2·len(pattern)</code>. Не используйте <code>find</code>, <code>index</code>, <code>in</code>. В тексте нет <code>'#'</code>.</p>\n<pre><code>first_index('сәлем әлем', 'әлем') → 1\nfirst_index('aaa', 'b')           → -1</code></pre>",
    "hints": [
     "Если в строке <code>pattern + '#' + text</code> на позиции <code>i</code> стоит <code>pi[i] == m</code>, образец начинается с <code>i − m + 1</code>; индекс в тексте — <code>i − 2m</code>."
    ],
    "check": {
     "tests": "\nassert first_index('сәлем әлем', 'әлем') == 1, \"first_index('сәлем әлем', 'әлем') 1\"\nassert first_index('aaa', 'b') == -1, 'Нет: -1'\nassert first_index('abc', '') == 0, 'Пустой образец: 0'\nassert first_index('', 'a') == -1, 'Пустой текст: -1'\nassert first_index('ababcabab', 'abab') == 0, 'В начале: 0'\nassert first_index('xxabab', 'abab') == 2, 'Ожидалось 2'\nimport random as _random\n_rng = _random.Random(1)\nfor _ in range(60):\n    _t = ''.join(_rng.choice('аб') for _ in range(_rng.randint(0, 12))); _p = ''.join(_rng.choice('аб') for _ in range(_rng.randint(1, 4)))\n    assert first_index(_t, _p) == _t.find(_p), f'first_index({_t!r}, {_p!r}) {_t.find(_p)} болуы керек'\n"
    }
   },
   {
    "title": "Подсчёт вхождений префиксов",
    "prompt": "<p><code>prefix_counts(s)</code> должна вернуть список длины <code>len(s)</code>: <code>res[L−1]</code> — сколько раз префикс длины <code>L</code> встречается в <code>s</code> (включая перекрывающиеся вхождения). Классическое применение prefix function, O(n): для каждого <code>i</code> — <code>cnt[pi[i]] += 1</code>, затем от длинного к короткому распределите счётчик <code>cnt[pi[L−1]] += cnt[L]</code>; в конце каждый префикс тоже встречается один раз сам по себе.</p>\n<pre><code>prefix_counts('abab') → [2, 2, 1, 1]\nprefix_counts('aaa')  → [3, 2, 1]</code></pre>",
    "hints": [
     "Если <code>pi[i] = k</code>, то префикс длины <code>k</code> заканчивается на <code>i</code>; его границы тоже заканчиваются там.",
     "Поэтому счётчик нужно распределить от <code>L</code> к <code>pi[L − 1]</code>; сначала — самые длинные."
    ],
    "check": {
     "tests": "\nassert prefix_counts('abab') == [2, 2, 1, 1], 'Ожидалось [2, 2, 1, 1]'\nassert prefix_counts('aaa') == [3, 2, 1], 'Ожидалось [3, 2, 1]'\nassert prefix_counts('') == [], 'Пустая строка: []'\nassert prefix_counts('abc') == [1, 1, 1], 'Ожидалось [1, 1, 1]'\nimport random as _random, time as _time\n_rng = _random.Random(2)\nfor _ in range(40):\n    _s = ''.join(_rng.choice('аб') for _ in range(_rng.randint(1, 12)))\n    _exp = [sum(1 for i in range(len(_s) - L + 1) if _s[i:i + L] == _s[:L]) for L in range(1, len(_s) + 1)]\n    assert prefix_counts(_s) == _exp, f'prefix_counts({_s!r}) {_exp} болуы керек'\n_s = 'a' * 100000\n_t0 = _time.perf_counter(); _r = prefix_counts(_s); _dt = _time.perf_counter() - _t0\nassert _r[0] == 100000 and _r[-1] == 1 and _dt < 1.5, f'Нужно O(n) решение ({_dt:.2f} с)'\n"
    }
   },
   {
    "title": "Сравнение частей через хэш",
    "prompt": "<p>String hashing: класс <code>SubHash(s)</code> в конструкторе вычисляет префиксные хэши (<code>h[i+1] = (h[i] · B + ord(s[i])) % M</code>, <code>B = 131</code>, <code>M = 2<sup>61</sup> − 1</code>) и степени <code>B</code>. <code>get(i, j)</code> — получить хэш <code>s[i:j]</code> за O(1): <code>(h[j] − h[i] · B<sup>j−i</sup>) % M</code>. <code>same(i, j, L)</code> — если хэши <code>s[i:i+L]</code> и <code>s[j:j+L]</code> равны, то <code>True</code>. Не создавайте срезы: каждый запрос O(1).</p>\n<pre><code>h = SubHash('абракадабра')\nh.same(0, 7, 4) → True     # 'абра' == 'абра'\nh.same(0, 3, 2) → False</code></pre>",
    "hints": [
     "Заранее вычислите массив <code>p[k] = B<sup>k</sup> % M</code>.",
     "В Python <code>%</code> даёт неотрицательный результат даже для отрицательного числа."
    ],
    "check": {
     "tests": "\n_h = SubHash('абракадабра')\nassert _h.same(0, 7, 4) is True, \"'абра' == 'абра': True\"\nassert _h.same(0, 3, 2) is False, \"'аб' != 'ак': False\"\nassert _h.same(2, 2, 5) is True, 'Одна позиция: True'\nassert _h.same(0, 5, 0) is True, 'Пустые части равны: True'\nassert _h.get(0, 1) == ord('а'), 'Хэш одного символа — его код'\nassert _h.get(1, 3) == (ord('б') * 131 + ord('р')) % ((1 << 61) - 1), 'get(1, 3) неверен'\nimport random as _random, time as _time\n_rng = _random.Random(3)\n_s = ''.join(_rng.choice('ab') for _ in range(300))\n_hh = SubHash(_s)\nfor _ in range(300):\n    _L = _rng.randint(0, 20); _i = _rng.randint(0, 300 - _L); _j = _rng.randint(0, 300 - _L)\n    assert _hh.same(_i, _j, _L) == (_s[_i:_i + _L] == _s[_j:_j + _L]), f'same({_i}, {_j}, {_L}) қате'\n_big = SubHash('x' * 200000)\n_t0 = _time.perf_counter()\nfor _q in range(50000):\n    _big.same(_q, _q + 1, 100000)\nassert _time.perf_counter() - _t0 < 1.5, 'Каждый запрос должен быть O(1) (не создавайте срезы)'\n"
    }
   },
   {
    "title": "Перекрытие префикса и суффикса",
    "prompt": "<p>Когда объединяем два слова, хотим записать повторяющуюся часть один раз. <code>overlap_len(a, b)</code> должна вернуть длину самого длинного <b>префикса</b> <code>b</code>, который является <b>суффиксом</b> <code>a</code>. KMP: последнее значение prefix function строки <code>b + '#' + a</code> (<code>'#'</code> не встречается в словах).</p>\n<pre><code>overlap_len('қазақ', 'ақсу')  → 2      # 'ақ'\noverlap_len('abc', 'xyz')     → 0\noverlap_len('aaa', 'aaaa')    → 3</code></pre>",
    "hints": [
     "Разделитель <code>'#'</code> не даёт значению превысить <code>len(b)</code>."
    ],
    "check": {
     "tests": "\nassert overlap_len('қазақ', 'ақсу') == 2, \"'ақ': 2\"\nassert overlap_len('abc', 'xyz') == 0, 'Соединения нет: 0'\nassert overlap_len('aaa', 'aaaa') == 3, 'Ожидалось 3'\nassert overlap_len('', 'abc') == 0 and overlap_len('abc', '') == 0, 'Пустая строка: 0'\nassert overlap_len('abab', 'abab') == 4, 'Одинаковые слова: 4'\nimport random as _random\n_rng = _random.Random(4)\nfor _ in range(60):\n    _a = ''.join(_rng.choice('аб') for _ in range(_rng.randint(0, 8))); _b = ''.join(_rng.choice('аб') for _ in range(_rng.randint(0, 8)))\n    _exp = max([L for L in range(0, min(len(_a), len(_b)) + 1) if _a.endswith(_b[:L])])\n    assert overlap_len(_a, _b) == _exp, f'overlap_len({_a!r}, {_b!r}) {_exp} болуы керек'\n"
    }
   },
   {
    "title": "Кратчайший палиндром",
    "prompt": "<p><code>shortest_palindrome(s)</code>: добавьте как можно меньше символов <b>в начало</b> строки, чтобы получился палиндром; верните результат. Для этого нужно найти самый длинный палиндромный префикс <code>s</code>: последнее значение prefix function строки <code>s + '#' + reversed(s)</code> как раз его и даёт. Затем переверните оставшийся суффикс и поставьте его в начало. O(n).</p>\n<pre><code>shortest_palindrome('aacecaaa') → 'aaacecaaa'\nshortest_palindrome('abcd')     → 'dcbabcd'\nshortest_palindrome('')         → ''</code></pre>",
    "hints": [
     "Палиндромный префикс — это префикс <code>s</code> и суффикс <code>reversed(s)</code>.",
     "Ответ: <code>s[k:][::-1] + s</code>."
    ],
    "check": {
     "tests": "\nassert shortest_palindrome('aacecaaa') == 'aaacecaaa', \"Ожидалось 'aaacecaaa'\"\nassert shortest_palindrome('abcd') == 'dcbabcd', \"Ожидалось 'dcbabcd'\"\nassert shortest_palindrome('') == '', \"Пустая строка: ''\"\nassert shortest_palindrome('a') == 'a', 'Один символ'\nassert shortest_palindrome('қазақ') == 'қазақ', 'Палиндром не меняется'\nassert shortest_palindrome('ab') == 'bab', \"Ожидалось 'bab'\"\nimport random as _random, time as _time\n_rng = _random.Random(5)\nfor _ in range(60):\n    _s = ''.join(_rng.choice('аб') for _ in range(_rng.randint(1, 10)))\n    _k = max(L for L in range(1, len(_s) + 1) if _s[:L] == _s[:L][::-1])\n    _exp = _s[_k:][::-1] + _s\n    assert shortest_palindrome(_s) == _exp, f'shortest_palindrome({_s!r}) {_exp!r} болуы керек'\n_s = 'a' * 49999 + 'b' + 'a' * 50000\n_t0 = _time.perf_counter(); _r = shortest_palindrome(_s); _dt = _time.perf_counter() - _t0\nassert _r == 'a' + _s and _dt < 1.5, f'Нужно O(n) решение ({_dt:.2f} с)'\n"
    }
   },
   {
    "title": "Самый длинный повторяющийся фрагмент",
    "prompt": "<p><code>longest_repeat(s)</code> должна вернуть <b>длину</b> самой длинной подстроки, которая встречается в строке не меньше двух раз (с разных начальных позиций; пересекаться могут). Бинарный поиск по длине: условие «есть ли повторяющийся фрагмент длины <code>L</code>» монотонно. Проверку делайте через rolling hash за O(n): соберите хэши всех фрагментов длины <code>L</code> в <code>set</code>. Всего O(n log n). <code>len(s) ≤ 20 000</code>.</p>\n<pre><code>longest_repeat('banana') → 3      # 'ana'\nlongest_repeat('abcd')   → 0\nlongest_repeat('aaaa')   → 3</code></pre>",
    "hints": [
     "Если повторяется фрагмент длины <code>L</code>, то повторяется и фрагмент длины <code>L − 1</code>: бинарный поиск подходит.",
     "Префиксные хэши посчитайте один раз, и внутри <code>has(L)</code> для каждого фрагмента возьмите хэш за O(1)."
    ],
    "check": {
     "tests": "\nassert longest_repeat('banana') == 3, \"longest_repeat('banana') 3\"\nassert longest_repeat('abcd') == 0, 'Повторов нет: 0'\nassert longest_repeat('aaaa') == 3, 'Перекрытие разрешено: 3'\nassert longest_repeat('') == 0 and longest_repeat('a') == 0, 'Пустая или из одного символа: 0'\nassert longest_repeat('абабаб') == 4, \"'абаб' дважды: 4\"\nimport random as _random, time as _time\n_rng = _random.Random(6)\nfor _ in range(40):\n    _s = ''.join(_rng.choice('аб') for _ in range(_rng.randint(0, 12)))\n    _exp = max([L for L in range(1, len(_s)) if len(set(_s[i:i + L] for i in range(len(_s) - L + 1))) < len(_s) - L + 1] + [0])\n    assert longest_repeat(_s) == _exp, f'longest_repeat({_s!r}) {_exp} болуы керек'\n_s = ''.join(_rng.choice('abcdefgh') for _ in range(20000)); _s = _s + _s[5000:5600]\n_t0 = _time.perf_counter(); _r = longest_repeat(_s); _dt = _time.perf_counter() - _t0\nassert _r >= 600 and _dt < 4.0, f'Большой тест: не меньше 600, нужны binary search + hash ({_dt:.2f} с)'\n"
    }
   }
  ]
 },
 "alg-12": {
  "pr": [
   {
    "title": "Количество узлов trie",
    "prompt": "<p><code>trie_size(words)</code> должна вернуть, сколько узлов (кроме корня) появится в trie при добавлении слов. Это — количество различных непустых префиксов слов. Постройте trie и увеличивайте счётчик при каждом создании нового узла.</p>\n<pre><code>trie_size(['ат', 'ата', 'ару']) → 5     # а, ат, ата, ар, ару\ntrie_size([])                   → 0</code></pre>",
    "hints": [
     "Узел можно записать как обычный словарь: <code>node = node.setdefault(ch, {})</code>.",
     "Считайте только тогда, когда создаётся новый узел."
    ],
    "check": {
     "tests": "\nassert trie_size(['ат', 'ата', 'ару']) == 5, 'Ожидалось 5'\nassert trie_size([]) == 0, 'Слов нет: 0'\nassert trie_size(['', '']) == 0, 'Пустое слово узлов не добавляет: 0'\nassert trie_size(['абв', 'абв']) == 3, 'Повторное слово: 3'\nassert trie_size(['a', 'b', 'c']) == 3, 'Общего префикса нет: 3'\nimport random as _random\n_rng = _random.Random(1)\n_w = [''.join(_rng.choice('аб') for _ in range(_rng.randint(0, 6))) for _ in range(40)]\nassert trie_size(_w) == len({w[:i] for w in _w for i in range(1, len(w) + 1)}), 'Случайный тест: число различных префиксов'\n"
    }
   },
   {
    "title": "Слова с данным префиксом",
    "prompt": "<p>Поиск в магазине: <code>with_prefix(words, p)</code> должна вернуть слова, начинающиеся с <code>p</code>, без повторов, в виде отсортированного списка. Постройте trie, спуститесь к узлу <code>p</code> и сделайте от него DFS: обходите детей в порядке <code>sorted(...)</code> — тогда результат сортируется сам собой. Пустой <code>p</code> — все слова.</p>\n<pre><code>with_prefix(['сүт', 'сүзбе', 'сүтті шоколад', 'сағыз'], 'сүт') → ['сүт', 'сүтті шоколад']</code></pre>",
    "hints": [
     "Если узел префикса не найден — <code>[]</code>.",
     "В DFS сначала сам узел (<code>end</code>), потом его дети — тогда «сүт» идёт раньше «сүтті»."
    ],
    "check": {
     "tests": "\nassert with_prefix(['сүт', 'сүзбе', 'сүтті шоколад', 'сағыз'], 'сүт') == ['сүт', 'сүтті шоколад'], \"Ожидалось ['сүт', 'сүтті шоколад']\"\nassert with_prefix(['нан', 'нан'], 'на') == ['нан'], 'Без повторов'\nassert with_prefix(['ет'], 'шай') == [], 'Нет: []'\nassert with_prefix(['б', 'а', 'ав'], '') == ['а', 'ав', 'б'], 'Пустой префикс: всё отсортировано'\nassert with_prefix([], 'а') == [], 'Слов нет: []'\n"
    }
   },
   {
    "title": "Замена слов корнями",
    "prompt": "<p><code>roots</code> — список корней, <code>sentence</code> — предложение из слов, разделённых пробелом. <code>replace_roots(roots, sentence)</code> должна заменить каждое слово его самым <b>коротким</b> корнем (корень, который является префиксом слова); слово без корня не меняется. Постройте trie из корней, и для каждого слова идите по trie, пока не дойдёте впервые до узла <code>end</code>.</p>\n<pre><code>replace_roots(['кітап', 'оқы'], 'кітаптар оқылды мектепте') → 'кітап оқы мектепте'</code></pre>",
    "hints": [
     "Идя по слову через trie, остановитесь на первом узле <code>end</code> — это самый короткий корень."
    ],
    "check": {
     "tests": "\nassert replace_roots(['кітап', 'оқы'], 'кітаптар оқылды мектепте') == 'кітап оқы мектепте', 'Ожидалось \"кітап оқы мектепте\"'\nassert replace_roots(['a', 'aa'], 'aaa ab b') == 'a a b', 'Самый короткий корень: \"a a b\"'\nassert replace_roots([], 'сәлем әлем') == 'сәлем әлем', 'Корня нет: без изменений'\nassert replace_roots(['cat', 'bat', 'rat'], 'the cattle was rattled by the battery') == 'the cat was rat by the bat', 'Английский пример неверен'\nassert replace_roots(['ата'], 'ат') == 'ат', 'Слово короче корня: без изменений'\n"
    }
   },
   {
    "title": "Поиск с точкой",
    "prompt": "<p>Класс <code>WordDictionary</code>: метод <code>add(word)</code> добавляет слово; <code>search(pattern)</code> возвращает <code>True</code>, если есть слово, подходящее под шаблон. В шаблоне <code>'.'</code> обозначает <b>ровно один</b> любой символ. Trie + DFS: встретив <code>'.'</code>, проверьте всех детей.</p>\n<pre><code>d = WordDictionary()\nd.add('бал'); d.add('бас'); d.add('мал')\nd.search('ба.') → True\nd.search('.ал') → True\nd.search('б..с') → False</code></pre>",
    "hints": [
     "<code>dfs(node, i)</code>: когда шаблон закончился, верните <code>node.end</code>.",
     "<code>'.'</code> для <code>any(...)</code> — по всем детям."
    ],
    "check": {
     "tests": "\n_d = WordDictionary()\n_d.add('бал'); _d.add('бас'); _d.add('мал')\nassert _d.search('ба.') is True, \"'ба.': True\"\nassert _d.search('.ал') is True, \"'.ал': True\"\nassert _d.search('б..с') is False, \"'б..с': False (длина 4)\"\nassert _d.search('бал') is True and _d.search('ба') is False, \"'ба' — только префикс, не слово\"\nassert _d.search('...') is True and _d.search('..') is False, 'Только точки'\n_e = WordDictionary()\nassert _e.search('') is False and _e.search('.') is False, 'Пустой словарь: False'\n_e.add('')\nassert _e.search('') is True, 'Если добавлено пустое слово: True'\n"
    }
   },
   {
    "title": "Кратчайший уникальный префикс",
    "prompt": "<p>Чтобы быстро находить контакты в телефоне, для каждого имени нужен самый короткий <b>уникальный</b> префикс (его не начинает ни одно другое имя). <code>unique_prefixes(words)</code> должна вернуть список таких префиксов (в том же порядке). Имена различны, и ни одно не является префиксом другого. В trie добавьте поле <code>count</code> (сколько слов проходят через этот узел): идя по слову, остановитесь, когда впервые дойдёте до узла с <code>count == 1</code>.</p>\n<pre><code>unique_prefixes(['айгүл', 'айдос', 'берік', 'бота']) → ['айг', 'айд', 'бе', 'бо']</code></pre>",
    "hints": [
     "При построении <code>insert</code> в каждом узле пути увеличивайте счётчик.",
     "Во втором проходе обрежьте префикс на первой позиции, где счётчик равен 1."
    ],
    "check": {
     "tests": "\nassert unique_prefixes(['айгүл', 'айдос', 'берік', 'бота']) == ['айг', 'айд', 'бе', 'бо'], \"Ожидалось ['айг', 'айд', 'бе', 'бо']\"\nassert unique_prefixes(['зере']) == ['з'], 'Одно слово: первая буква'\nassert unique_prefixes([]) == [], 'Слов нет: []'\nassert unique_prefixes(['zebra', 'dog', 'duck', 'dove']) == ['z', 'dog', 'du', 'dov'], 'Английский пример неверен'\nimport random as _random\n_rng = _random.Random(2)\n_w = list({''.join(_rng.choice('абв') for _ in range(6)) for _ in range(30)})\n_r = unique_prefixes(_w)\nfor _x, _p in zip(_w, _r):\n    assert _x.startswith(_p) and sum(1 for y in _w if y.startswith(_p)) == 1, f'{_x}: {_p} бірегей емес'\n    assert sum(1 for y in _w if y.startswith(_p[:-1])) > 1, f'{_x}: {_p} ең қысқа емес'\n"
    }
   },
   {
    "title": "Сумма по префиксу",
    "prompt": "<p>Товары магазина и их цены: класс <code>PriceSum</code>. Метод <code>insert(name, price)</code> добавляет товар (если он уже есть, <b>заменяет</b> цену); метод <code>total(prefix)</code> возвращает сумму цен товаров, названия которых начинаются с <code>prefix</code>. Храните в узле trie «сумму для этого префикса»; при замене цены прибавьте разницу ко всем узлам пути — <code>жаңа − ескі</code>. Обе операции — O(L).</p>\n<pre><code>s = PriceSum()\ns.insert('алма', 300); s.insert('алмұрт', 500)\ns.total('ал')   → 800\ns.insert('алма', 200)\ns.total('алм')  → 700</code></pre>",
    "hints": [
     "Старые цены храните в отдельном словаре: <code>delta = price − old</code>.",
     "Добавьте <code>delta</code> к каждому узлу пути (включая корень)."
    ],
    "check": {
     "tests": "\n_s = PriceSum()\n_s.insert('алма', 300); _s.insert('алмұрт', 500)\nassert _s.total('ал') == 800, \"total('ал') 800\"\n_s.insert('алма', 200)\nassert _s.total('алм') == 700, 'Цена заменена: 700'\nassert _s.total('алма') == 200, \"total('алма') 200\"\nassert _s.total('б') == 0, 'Нет такого префикса: 0'\nassert _s.total('') == 700, 'Пустой префикс: всё'\n_s.insert('ал', 50)\nassert _s.total('ал') == 750 and _s.total('алм') == 700, 'Префикс как слово тоже учитывается'\nimport random as _random, time as _time\n_rng = _random.Random(3)\n_ps = PriceSum(); _ref = {}\nfor _ in range(500):\n    _nm = ''.join(_rng.choice('аб') for _ in range(_rng.randint(1, 4)))\n    if _rng.random() < 0.6:\n        _v = _rng.randint(0, 100); _ps.insert(_nm, _v); _ref[_nm] = _v\n    else:\n        _pre = _nm[:_rng.randint(0, len(_nm))]\n        assert _ps.total(_pre) == sum(v for k, v in _ref.items() if k.startswith(_pre)), f'total({_pre!r}) қате'\n"
    }
   },
   {
    "title": "Наибольшая пара с XOR",
    "prompt": "<p><code>max_xor(nums)</code> (<code>0 ≤ x &lt; 2<sup>31</sup></code>) должна вернуть максимум значения <code>a ^ b</code> для двух чисел из списка (число может образовать пару само с собой, тогда результат 0). O(n²) — медленно. Битовый trie: вставьте каждое число в trie, начиная с 30-го бита до 0-го; для каждого числа на каждом уровне пытайтесь идти в <b>противоположный</b> бит — тогда старшие биты XOR будут равны 1. O(31·n).</p>\n<pre><code>max_xor([3, 10, 5, 25, 2, 8]) → 28     # 5 ^ 25\nmax_xor([7])                  → 0</code></pre>",
    "hints": [
     "Бит: <code>(x &gt;&gt; b) &amp; 1</code>; узел trie — словарь <code>{0: ..., 1: ...}</code>.",
     "Если есть противоположный бит, прибавьте <code>1 &lt;&lt; b</code> к ответу и спуститесь туда."
    ],
    "check": {
     "tests": "\nassert max_xor([3, 10, 5, 25, 2, 8]) == 28, 'Ожидалось 28'\nassert max_xor([7]) == 0, 'Одно число: 0'\nassert max_xor([0, 0]) == 0, 'Нули: 0'\nassert max_xor([1, 2]) == 3, '1 ^ 2 = 3'\nassert max_xor([2**31 - 1, 0]) == 2**31 - 1, 'Наибольший бит'\nimport random as _random, time as _time\n_rng = _random.Random(4)\nfor _ in range(30):\n    _x = [_rng.randint(0, 200) for _ in range(_rng.randint(1, 12))]\n    _exp = max(a ^ b for a in _x for b in _x)\n    assert max_xor(_x) == _exp, f'max_xor({_x}) {_exp} болуы керек'\n_big = [_rng.randint(0, 2**31 - 1) for _ in range(20000)]\n_t0 = _time.perf_counter(); max_xor(_big); _dt = _time.perf_counter() - _t0\nassert _dt < 3.0, f'20 000 чисел, {_dt:.2f} с: нужен битовый trie (не O(n²))'\n"
    }
   },
   {
    "title": "Слова на сетке",
    "prompt": "<p>Сетка букв <code>board</code> (список строк) и слова <code>words</code>. Слово можно составить из соседних (вверх/вниз/влево/вправо) клеток, и в одном слове каждая клетка используется не более одного раза. <code>find_words(board, words)</code> должна вернуть найденные на сетке слова как отсортированный список без повторов. Искать каждое слово отдельно медленно: постройте trie из слов и от каждой клетки идите по trie с backtracking — префикс, которого нет в trie, сразу отсекается.</p>\n<pre><code>find_words(['oaan', 'etae', 'ihkr', 'iflv'], ['oath', 'pea', 'eat', 'rain']) → ['eat', 'oath']</code></pre>",
    "hints": [
     "В узле конца слова храните само слово под ключом <code>'$'</code>.",
     "Backtracking: клетку пометьте <code>used</code>, а при возврате снимите метку."
    ],
    "check": {
     "tests": "\nassert find_words(['oaan', 'etae', 'ihkr', 'iflv'], ['oath', 'pea', 'eat', 'rain']) == ['eat', 'oath'], \"Ожидалось ['eat', 'oath']\"\nassert find_words(['ab', 'cd'], ['abcb']) == [], 'Одну клетку нельзя использовать повторно: []'\nassert find_words(['a'], ['a', 'a', 'b']) == ['a'], \"Без повторов: ['a']\"\nassert find_words(['ата', 'ұлы'], ['ата', 'атұ', 'тұл', 'ұлы', 'аталы', 'тлы']) == ['ата', 'тлы', 'ұлы'], \"Кириллическая сетка: ['ата', 'тлы', 'ұлы']\"\nassert find_words(['ab'], []) == [], 'Нет слов: []'\nimport time as _time\n_b = ['a' * 4] * 4\n_ws = ['a' * k for k in range(1, 9)] + ['a' * 7 + 'b']\n_t0 = _time.perf_counter(); _r = find_words(_b, _ws); _dt = _time.perf_counter() - _t0\nassert _r == sorted('a' * k for k in range(1, 9)), \"На сетке 4×4 из 'a' должны найтись слова длиной 1..8\"\nassert _dt < 4.0, f'{_dt:.2f} с: отсекайте префиксы через trie раньше'\n"
    }
   }
  ]
 }
} });
