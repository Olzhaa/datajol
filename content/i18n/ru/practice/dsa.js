// dsa practice tasks: Russian text. Code, solutions and checks are in content/practice/dsa.js.
DJ.i18n.patch({ lessons: {
 "dsa-1": {
  "pr": [
   {
    "title": "Наибольшее число",
    "prompt": "<p>Функция <code>max_value(xs)</code> должна вернуть наибольшее число в списке, не используя <code>max()</code>, а проходя список один раз (O(n)). Для пустого списка — <code>None</code>.</p>\n<pre><code>max_value([3, -1, 7, 2]) → 7\nmax_value([-5, -9])      → -5\nmax_value([])            → None</code></pre>",
    "hints": [
     "Сначала проверьте пустой список.",
     "За начальное значение возьмите <code>xs[0]</code> (не 0: все числа могут быть отрицательными)."
    ],
    "check": {
     "tests": "\nassert max_value([3, -1, 7, 2]) == 7, 'max_value([3, -1, 7, 2]) должна вернуть 7'\nassert max_value([-5, -9]) == -5, 'Даже если все числа отрицательные, верните наибольшее: -5'\nassert max_value([]) is None, 'Для пустого списка — None'\nassert max_value([4]) == 4, 'В списке из одного элемента — сам этот элемент'\nassert max_value([2, 2, 2]) == 2, 'Одинаковые значения: 2'\n_big = list(range(100000))\nassert max_value(_big) == 99999, 'В списке 0..99999 должно быть 99999'\n"
    }
   },
   {
    "title": "Количество чётных чисел",
    "prompt": "<p>Даны номера учеников в школьной очереди. <code>count_even(xs)</code> должна вернуть количество чётных чисел (0 тоже чётное, отрицательные числа тоже могут встречаться).</p>\n<pre><code>count_even([1, 2, 3, 4]) → 2\ncount_even([0, -2, 5])   → 2\ncount_even([])           → 0</code></pre>",
    "hints": [
     "<code>x % 2 == 0</code> — чётное число."
    ],
    "check": {
     "tests": "\nassert count_even([1, 2, 3, 4]) == 2, 'count_even([1, 2, 3, 4]) должна вернуть 2'\nassert count_even([0, -2, 5]) == 2, '0 и -2 — чётные числа: 2'\nassert count_even([]) == 0, 'Для пустого списка — 0'\nassert count_even([1, 3, 5]) == 0, 'Чётных чисел нет: 0'\nassert count_even(list(range(100000))) == 50000, 'В диапазоне 0..99999 должно быть 50000 чётных чисел'\n"
    }
   },
   {
    "title": "Общие города",
    "prompt": "<p>Даны списки городов, куда ездят две автобусные компании (повторы возможны). <code>common_cities(a, b)</code> должна вернуть города, которые есть в обоих списках, <b>без повторов и отсортированные по алфавиту</b>. Решение должно работать за O(n + m) — с помощью <code>set</code>.</p>\n<pre><code>common_cities(['Алматы', 'Тараз', 'Алматы'], ['Тараз', 'Алматы', 'Атырау'])\n→ ['Алматы', 'Тараз']</code></pre>",
    "hints": [
     "Переведите оба списка в <code>set</code> и найдите их пересечение через <code>&amp;</code>.",
     "Превратите результат в список с помощью <code>sorted(...)</code>."
    ],
    "check": {
     "tests": "\nassert common_cities(['Алматы', 'Тараз', 'Алматы'], ['Тараз', 'Алматы', 'Атырау']) == ['Алматы', 'Тараз'], \"Ожидалось ['Алматы', 'Тараз']\"\nassert common_cities([], ['Астана']) == [], 'Если один из списков пуст, общих городов нет'\nassert common_cities(['Орал'], ['Ақтөбе']) == [], 'Общих городов нет: []'\nassert common_cities(['Шымкент', 'Шымкент'], ['Шымкент']) == ['Шымкент'], 'Без повторов: только один раз'\n_a = [str(i) for i in range(50000)]; _b = [str(i) for i in range(25000, 75000)]\nassert len(common_cities(_a, _b)) == 25000, 'В больших списках должно быть 25000 общих значений'\n"
    }
   },
   {
    "title": "Число и его удвоенное",
    "prompt": "<p><code>has_double(xs)</code>: если в списке есть два элемента вида <code>i != j</code> и <code>xs[j] == 2 * xs[i]</code>, верните <code>True</code>. Обратите внимание: для 0 нужен второй 0 (элемент сам с собой пару не образует). Тест проверяет 100 000 элементов: нужно решение за O(n).</p>\n<pre><code>has_double([10, 2, 5, 3]) → True    # 10 = 2 · 5\nhas_double([3, 1, 7, 11]) → False\nhas_double([0])           → False\nhas_double([0, 0])        → True</code></pre>",
    "hints": [
     "Для каждого <code>x</code> проверьте, есть ли среди уже встреченных значений <code>2 * x</code> или <code>x / 2</code>.",
     "Добавляйте элемент в <code>seen</code> только <b>после</b> проверки — тогда 0 не образует пару сам с собой."
    ],
    "check": {
     "tests": "\nassert has_double([10, 2, 5, 3]) is True, 'has_double([10, 2, 5, 3]) должна вернуть True: 10 = 2 · 5'\nassert has_double([3, 1, 7, 11]) is False, 'has_double([3, 1, 7, 11]) должна вернуть False'\nassert has_double([0]) is False, 'Одинокий 0 сам с собой пару не образует'\nassert has_double([0, 0]) is True, 'Два нуля: 0 = 2 · 0'\nassert has_double([-2, -4]) is True, '-4 = 2 · (-2)'\nassert has_double([7, 3]) is False, '7 // 2 = 3, но 7 не равно 2 · 3.5'\nassert has_double([]) is False, 'Пустой список: False'\nimport time as _time\n_big = list(range(1, 200001, 2))\n_t0 = _time.perf_counter(); _r = has_double(_big); _dt = _time.perf_counter() - _t0\nassert _r is False, 'Среди одних нечётных чисел пары вида 2·x нет'\nassert _dt < 1.0, f'На 100 000 элементов ушло {_dt:.2f} с: напишите решение за O(n) с помощью set'\n"
    }
   },
   {
    "title": "Первый повторившийся билет",
    "prompt": "<p>Номера билетов, по которым вошли на стадион, даны в порядке прихода. <code>first_repeat(ids)</code> должна вернуть номер, который <b>во второй раз</b> встретился раньше всех остальных; если повторов нет, верните <code>None</code>. O(n).</p>\n<pre><code>first_repeat([5, 1, 3, 1, 5]) → 1    # 1 екінші рет 3-позицияда, 5 тек 4-те\nfirst_repeat([4, 2, 9])       → None</code></pre>",
    "hints": [
     "Идите слева направо и заполняйте <code>seen</code>.",
     "Как только встретите уже виденное значение — верните его."
    ],
    "check": {
     "tests": "\nassert first_repeat([5, 1, 3, 1, 5]) == 1, 'first_repeat([5, 1, 3, 1, 5]) должна вернуть 1 (не 5)'\nassert first_repeat([4, 2, 9]) is None, 'Повторов нет: None'\nassert first_repeat([]) is None, 'Пустой список: None'\nassert first_repeat([7, 7]) == 7, 'first_repeat([7, 7]) должна вернуть 7'\nassert first_repeat([0, 1, 0]) == 0, 'Номер 0 тоже может быть правильным ответом'\n_big = list(range(100000)) + [123]\nassert first_repeat(_big) == 123, 'Число 123 в конце — первое повторившееся'\n"
    }
   },
   {
    "title": "Шаги деления пополам",
    "prompt": "<p><code>halving_steps(n)</code>: <code>n</code> — неотрицательное целое число. Пока <code>n &gt; 1</code> не станет верным, выполняем <code>n //= 2</code>. Верните количество выполненных шагов. Это пример цикла за O(log n): и для <code>n = 10<sup>18</sup></code> он должен мгновенно завершиться.</p>\n<pre><code>halving_steps(8)  → 3    # 8 → 4 → 2 → 1\nhalving_steps(10) → 3    # 10 → 5 → 2 → 1\nhalving_steps(1)  → 0\nhalving_steps(0)  → 0</code></pre>",
    "hints": [
     "В цикле <code>while n &gt; 1:</code> увеличивайте счётчик шагов."
    ],
    "check": {
     "tests": "\nassert halving_steps(8) == 3, 'halving_steps(8) должна вернуть 3'\nassert halving_steps(10) == 3, 'halving_steps(10) должна вернуть 3'\nassert halving_steps(1) == 0, 'n = 1: 0 шагов'\nassert halving_steps(0) == 0, 'n = 0: 0 шагов'\nassert halving_steps(2) == 1, 'n = 2: 1 шаг'\nassert halving_steps(1023) == 9, 'n = 1023: 9 шагов'\nassert halving_steps(1024) == 10, 'n = 1024: 10 шагов'\nassert halving_steps(10**18) == 59, 'n = 10^18: 59 шагов'\n"
    }
   },
   {
    "title": "Сумма равна нулю",
    "prompt": "<p>Операции по банковскому счёту: поступления — положительные числа, списания — отрицательные. <code>has_zero_pair(ops)</code>: если есть пара вида <code>i &lt; j</code> и <code>ops[i] + ops[j] == 0</code>, то <code>True</code>. Тест проверяет 100 000 операций: решение за O(n²) не пройдёт.</p>\n<pre><code>has_zero_pair([500, -200, 300, 200]) → True\nhas_zero_pair([0, 5])                → False   # 0 үшін екінші 0 керек\nhas_zero_pair([0, 5, 0])             → True</code></pre>",
    "hints": [
     "Для каждого <code>x</code> проверьте за O(1), видели ли мы раньше <code>-x</code> — через <code>set</code>.",
     "Добавляйте <code>x</code> только после проверки, тогда одинокий 0 сам с собой пару не образует."
    ],
    "check": {
     "tests": "\nassert has_zero_pair([500, -200, 300, 200]) is True, '-200 + 200 = 0: True'\nassert has_zero_pair([0, 5]) is False, 'Одинокий 0 пару не образует'\nassert has_zero_pair([0, 5, 0]) is True, 'Два нуля: True'\nassert has_zero_pair([]) is False, 'Пустой список: False'\nassert has_zero_pair([1, 2, 3]) is False, 'Только положительные числа: False'\nassert has_zero_pair([-7, 7]) is True, '-7 + 7 = 0'\nimport time as _time, random as _random\n_rng = _random.Random(7)\n_big = _rng.sample(range(1, 10**6), 100000)\n_t0 = _time.perf_counter(); _r = has_zero_pair(_big); _dt = _time.perf_counter() - _t0\nassert _r is False, 'Среди одних положительных чисел пары нет'\nassert _dt < 1.0, f'На 100 000 операций ушло {_dt:.2f} с: нужно решение за O(n)'\nassert has_zero_pair(_big + [-_big[500]]) is True, 'Если добавить отрицательное значение в конец, то True'\n"
    }
   },
   {
    "title": "Встречаются один раз",
    "prompt": "<p><code>count_singles(xs)</code> должна вернуть количество значений, которые встречаются в списке <b>ровно один раз</b>. Используйте два <code>set</code>: для однократно встреченных и для повторяющихся. Словарь (dict) не нужен. O(n), тест на 100 000 элементов.</p>\n<pre><code>count_singles([4, 1, 4, 2, 4, 3, 2]) → 2    # 1 және 3\ncount_singles([])                    → 0</code></pre>",
    "hints": [
     "<code>once</code> — значения, встреченные пока один раз; <code>dup</code> — значения, встреченные хотя бы дважды.",
     "Если значение есть в <code>once</code>, переносите его в <code>dup</code>; если оно встретилось в третий раз, ничего не делайте."
    ],
    "check": {
     "tests": "\nassert count_singles([4, 1, 4, 2, 4, 3, 2]) == 2, 'count_singles([4, 1, 4, 2, 4, 3, 2]) должна вернуть 2 (1 и 3)'\nassert count_singles([]) == 0, 'Пустой список: 0'\nassert count_singles([9]) == 1, 'Один элемент: 1'\nassert count_singles([5, 5, 5]) == 0, 'Значение, встретившееся трижды, не одиночное: 0'\nassert count_singles([1, 2, 3]) == 3, 'Все различны: 3'\nimport time as _time\n_big = list(range(60000)) + list(range(20000))\n_t0 = _time.perf_counter(); _r = count_singles(_big); _dt = _time.perf_counter() - _t0\nassert _r == 40000, f'Ожидалось 40000, получено {_r}'\nassert _dt < 1.0, f'Заняло {_dt:.2f} с: нужно решение за O(n)'\n"
    }
   }
  ]
 },
 "dsa-2": {
  "pr": [
   {
    "title": "Сдвиг списка вправо",
    "prompt": "<p><code>rotate_right(a, k)</code> должна вернуть <b>новый</b> список, где элементы сдвинуты вправо на <code>k</code> позиций: последние элементы переходят в начало. <code>k</code> может быть больше длины списка. Для пустого списка — <code>[]</code>.</p>\n<pre><code>rotate_right([1, 2, 3, 4, 5], 2) → [4, 5, 1, 2, 3]\nrotate_right([1, 2, 3], 4)       → [3, 1, 2]\nrotate_right([], 3)              → []</code></pre>",
    "hints": [
     "Сначала <code>k %= len(a)</code> (пустой список проверьте отдельно).",
     "Срезы: последние <code>k</code> элемента + всё остальное."
    ],
    "check": {
     "tests": "\nassert rotate_right([1, 2, 3, 4, 5], 2) == [4, 5, 1, 2, 3], 'rotate_right([1, 2, 3, 4, 5], 2) должна вернуть [4, 5, 1, 2, 3]'\nassert rotate_right([1, 2, 3], 4) == [3, 1, 2], 'k > n: используйте k % n'\nassert rotate_right([], 3) == [], 'Для пустого списка []'\nassert rotate_right([1, 2, 3], 0) == [1, 2, 3], 'k = 0: без изменений'\nassert rotate_right([1, 2, 3], 3) == [1, 2, 3], 'k = n: без изменений'\n_a = [1, 2, 3]; rotate_right(_a, 1)\nassert _a == [1, 2, 3], 'Исходный список не меняйте, верните новый'\n"
    }
   },
   {
    "title": "Зеркальный список",
    "prompt": "<p><code>is_mirror(a)</code>: список одинаково читается с обеих сторон (<code>a[i] == a[n-1-i]</code>), тогда верните <code>True</code>. Используйте два указателя: один с начала, другой с конца. Срезы (<code>a[::-1]</code>) не делайте.</p>\n<pre><code>is_mirror([1, 2, 3, 2, 1]) → True\nis_mirror([1, 2])          → False\nis_mirror([])              → True</code></pre>",
    "hints": [
     "<code>i = 0</code>, <code>j = len(a) - 1</code>; <code>while i &lt; j</code>.",
     "Если найдено хотя бы одно различие, сразу верните <code>False</code>."
    ],
    "check": {
     "tests": "\nassert is_mirror([1, 2, 3, 2, 1]) is True, 'is_mirror([1, 2, 3, 2, 1]) должна вернуть True'\nassert is_mirror([1, 2]) is False, 'is_mirror([1, 2]) должна вернуть False'\nassert is_mirror([]) is True, 'Пустой список — зеркальный: True'\nassert is_mirror([7]) is True, 'Один элемент: True'\nassert is_mirror([4, 4]) is True, 'is_mirror([4, 4]) должна вернуть True'\nassert is_mirror([1, 2, 3, 1]) is False, 'is_mirror([1, 2, 3, 1]) должна вернуть False'\n"
    }
   },
   {
    "title": "Чётные вперёд",
    "prompt": "<p><code>evens_first(a)</code> должна изменить список <b>на месте</b>: все чётные числа должны стоять перед нечётными (порядок внутри групп не важен). Используйте два указателя за O(n), не создавайте новый список. Функция ничего не возвращает.</p>\n<pre><code>a = [3, 1, 2, 4]\nevens_first(a)   # a мысалы [4, 2, 1, 3] немесе [2, 4, 3, 1]</code></pre>",
    "hints": [
     "Левый указатель пропускает чётное число, правый — нечётное.",
     "Если оба остановились на «неправильных» элементах, поменяйте их местами."
    ],
    "check": {
     "tests": "\ndef _ok(a, orig):\n    if sorted(a) != sorted(orig):\n        return False\n    k = sum(1 for x in orig if x % 2 == 0)\n    return all(x % 2 == 0 for x in a[:k]) and all(x % 2 == 1 for x in a[k:])\nfor _orig in [[3, 1, 2, 4], [], [1], [2], [1, 3, 5], [2, 4, 6], [0, -1, -2, 7, 8], [5, 2, 5, 2, 5, 2]]:\n    _a = list(_orig); _r = evens_first(_a)\n    assert _ok(_a, _orig), f'{_orig} үшін жұптар алдымен тұруы керек, сізде {_a}'\n_a = [3, 1, 2, 4]; _id = id(_a); evens_first(_a)\nassert id(_a) == _id and _a[:2] in ([2, 4], [4, 2]), 'Измените список на месте'\n"
    }
   },
   {
    "title": "Сортировка квадратов",
    "prompt": "<p>Температуры воздуха отсортированы по возрастанию (могут быть и отрицательные). <code>sorted_squares(a)</code> должна вернуть список квадратов, отсортированный по возрастанию, за O(n): два указателя берут наибольший модуль с краёв. Не используйте <code>sorted</code>.</p>\n<pre><code>sorted_squares([-4, -1, 0, 3, 10]) → [0, 1, 9, 16, 100]\nsorted_squares([-3, -2])          → [4, 9]</code></pre>",
    "hints": [
     "Наибольший квадрат находится либо в самом левом, либо в самом правом элементе.",
     "Заполняйте результат с конца: <code>pos</code> от <code>n-1</code> до 0."
    ],
    "check": {
     "tests": "\nassert sorted_squares([-4, -1, 0, 3, 10]) == [0, 1, 9, 16, 100], 'Ожидалось [0, 1, 9, 16, 100]'\nassert sorted_squares([-3, -2]) == [4, 9], 'Только отрицательные числа: [4, 9]'\nassert sorted_squares([]) == [], 'Пустой список: []'\nassert sorted_squares([5]) == [25], 'Один элемент: [25]'\nassert sorted_squares([-2, 2]) == [4, 4], 'Одинаковые модули: [4, 4]'\nassert sorted_squares([1, 2, 3]) == [1, 4, 9], 'Только положительные числа: [1, 4, 9]'\nimport random as _random\n_rng = _random.Random(3)\nfor _ in range(50):\n    _a = sorted(_rng.randint(-50, 50) for _ in range(_rng.randint(0, 30)))\n    assert sorted_squares(_a) == sorted(x * x for x in _a), f'{_a} үшін қате нәтиже'\n"
    }
   },
   {
    "title": "Пересечение отсортированных списков",
    "prompt": "<p>Суммы чеков двух магазинов отсортированы по возрастанию. <code>intersect_sorted(a, b)</code> должна вернуть значения, которые есть в обоих списках: если значение встречается в <code>a</code> <code>p</code> раз, а в <code>b</code> <code>q</code> раз, то в результате оно будет <code>min(p, q)</code> раз. Два указателя, O(n + m).</p>\n<pre><code>intersect_sorted([1, 2, 2, 3, 5], [2, 2, 2, 5, 7]) → [2, 2, 5]\nintersect_sorted([1, 3], [2, 4])                → []</code></pre>",
    "hints": [
     "Если значения равны — добавьте его в результат и сдвиньте оба указателя.",
     "Иначе сдвигайте указатель на меньшем значении."
    ],
    "check": {
     "tests": "\nassert intersect_sorted([1, 2, 2, 3, 5], [2, 2, 2, 5, 7]) == [2, 2, 5], 'Ожидалось [2, 2, 5]'\nassert intersect_sorted([1, 3], [2, 4]) == [], 'Общих значений нет: []'\nassert intersect_sorted([], [1, 2]) == [], 'Пересечение с пустым списком пусто'\nassert intersect_sorted([4, 4, 4], [4]) == [4], 'min(3, 1) = 1 раз'\nassert intersect_sorted([1, 2, 3], [1, 2, 3]) == [1, 2, 3], 'Одинаковые списки'\nimport random as _random\nfrom collections import Counter as _C\n_rng = _random.Random(5)\nfor _ in range(40):\n    _a = sorted(_rng.randint(0, 10) for _ in range(_rng.randint(0, 15)))\n    _b = sorted(_rng.randint(0, 10) for _ in range(_rng.randint(0, 15)))\n    _exp = sorted((_C(_a) & _C(_b)).elements())\n    assert intersect_sorted(_a, _b) == _exp, f'{_a} және {_b}: күтілгені {_exp}'\n"
    }
   },
   {
    "title": "Удаление значения на месте",
    "prompt": "<p><code>remove_value(a, x)</code>: удалите из списка <b>на месте</b> все элементы, равные <code>x</code>. Остальные элементы сохраняют порядок и собираются в начале списка. Верните новую длину: <code>k</code>. Проверяется <code>a[:k]</code>. Два указателя (чтения и записи), O(n). Новый список не создавайте, не используйте <code>remove</code>.</p>\n<pre><code>a = [3, 2, 2, 3, 4]\nremove_value(a, 3) → 3     # a[:3] == [2, 2, 4]</code></pre>",
    "hints": [
     "<code>w</code> — следующее место для записи. Если <code>a[r] != x</code>, то <code>a[w] = a[r]</code>, <code>w += 1</code>."
    ],
    "check": {
     "tests": "\n_a = [3, 2, 2, 3, 4]; _k = remove_value(_a, 3)\nassert _k == 3 and _a[:_k] == [2, 2, 4], f'Ожидалось k=3, [2, 2, 4]; получено k={_k}, {_a[:_k] if isinstance(_k, int) else _a}'\n_a = []; assert remove_value(_a, 1) == 0, 'Бос тізім: 0'\n_a = [5, 5, 5]; assert remove_value(_a, 5) == 0, 'Барлығы өшірілсе: 0'\n_a = [1, 2, 3]; _k = remove_value(_a, 9)\nassert _k == 3 and _a == [1, 2, 3], 'Если x нет в списке, список не меняется'\n_a = [0, 1, 0, 2, 0, 3]; _k = remove_value(_a, 0)\nassert _k == 3 and _a[:3] == [1, 2, 3], 'Порядок должен сохраниться: [1, 2, 3]'\n_a = [1, 2, 1]; _id = id(_a); remove_value(_a, 1)\nassert id(_a) == _id and len(_a) == 3, 'Измените список на месте: не создавайте новый список'\n"
    }
   },
   {
    "title": "Контейнер с наибольшим объёмом",
    "prompt": "<p>Вдоль канала стоят стенки высотой <code>h[i]</code>. Две стенки <code>i &lt; j</code> и дно образуют сосуд ёмкостью <code>(j - i) * min(h[i], h[j])</code>. <code>max_area(h)</code> должна вернуть наибольшую ёмкость. Два указателя: сдвигайте более низкую стенку внутрь — O(n). Если стенок меньше двух, верните 0.</p>\n<pre><code>max_area([1, 8, 6, 2, 5, 4, 8, 3, 7]) → 49\nmax_area([1, 1])                      → 1</code></pre>",
    "hints": [
     "В начале <code>i = 0</code>, <code>j = n - 1</code> — самый широкий сосуд.",
     "Сдвигать высокую стенку никогда не выгодно: ширина уменьшится, а высота ограничена низкой стенкой."
    ],
    "check": {
     "tests": "\nassert max_area([1, 8, 6, 2, 5, 4, 8, 3, 7]) == 49, 'Ожидалось 49'\nassert max_area([1, 1]) == 1, 'max_area([1, 1]) должна вернуть 1'\nassert max_area([5]) == 0, 'Одна стенка: 0'\nassert max_area([]) == 0, 'Пустой список: 0'\nassert max_area([4, 3, 2, 1, 4]) == 16, 'Крайние стенки: 16'\nassert max_area([0, 0, 0]) == 0, 'Нулевая высота: 0'\nimport random as _random, time as _time\n_rng = _random.Random(11)\nfor _ in range(30):\n    _h = [_rng.randint(0, 20) for _ in range(_rng.randint(2, 25))]\n    _exp = max((j - i) * min(_h[i], _h[j]) for i in range(len(_h)) for j in range(i + 1, len(_h)))\n    assert max_area(_h) == _exp, f'{_h} үшін күтілгені {_exp}'\n_big = [_rng.randint(1, 10**4) for _ in range(100000)]\n_t0 = _time.perf_counter(); max_area(_big); _dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'На 100 000 стенок ушло {_dt:.2f} с: нужны два указателя за O(n)'\n"
    }
   },
   {
    "title": "Сумма трёх чисел",
    "prompt": "<p><code>three_sum(nums)</code>: верните все <b>различные</b> тройки с суммой 0, <code>[a, b, c]</code> (<code>a ≤ b ≤ c</code>). Список троек должен быть отсортирован по возрастанию. Сначала отсортируйте список (<code>sorted</code>), затем для каждого <code>a</code> применяйте два указателя к оставшимся элементам: O(n²). Повторяющиеся тройки пропускайте.</p>\n<pre><code>three_sum([-1, 0, 1, 2, -1, -4]) → [[-1, -1, 2], [-1, 0, 1]]\nthree_sum([0, 0, 0, 0])          → [[0, 0, 0]]\nthree_sum([1, 2])                → []</code></pre>",
    "hints": [
     "После фиксации <code>a[i]</code> остальное — задача на поиск пары с суммой <code>-a[i]</code> в отсортированном списке.",
     "Чтобы не было повторов: пропускайте одинаковое <code>a[i]</code>, а после найденной пары пропускайте и одинаковые <code>a[lo]</code>."
    ],
    "check": {
     "tests": "\nassert three_sum([-1, 0, 1, 2, -1, -4]) == [[-1, -1, 2], [-1, 0, 1]], 'Ожидалось [[-1, -1, 2], [-1, 0, 1]]'\nassert three_sum([0, 0, 0, 0]) == [[0, 0, 0]], 'Четыре нуля: только [[0, 0, 0]]'\nassert three_sum([1, 2]) == [], 'Два элемента: []'\nassert three_sum([]) == [], 'Пустой список: []'\nassert three_sum([1, 2, 3]) == [], 'Троек с суммой 0 нет'\nimport random as _random\nfrom itertools import combinations as _comb\n_rng = _random.Random(2)\nfor _ in range(40):\n    _x = [_rng.randint(-6, 6) for _ in range(_rng.randint(0, 12))]\n    _exp = sorted(set(tuple(sorted(c)) for c in _comb(_x, 3) if sum(c) == 0))\n    _exp = [list(c) for c in _exp]\n    assert three_sum(_x) == _exp, f'{_x} үшін күтілгені {_exp}'\n"
    }
   }
  ]
 },
 "dsa-3": {
  "pr": [
   {
    "title": "Слова в обратном порядке",
    "prompt": "<p>Функция <code>reverse_words(s)</code> должна вернуть слова предложения в обратном порядке. Между словами может быть несколько пробелов, в начале и в конце тоже могут быть пробелы: в результате слова должны разделяться одним пробелом.</p>\n<pre><code>reverse_words('Алматы әдемі қала')   → 'қала әдемі Алматы'\nreverse_words('  сәлем   әлем ')     → 'әлем сәлем'\nreverse_words('   ')                 → ''</code></pre>",
    "hints": [
     "<code>s.split()</code> (без аргументов) делит строку по любым пробелам и отбрасывает пустые части.",
     "Соедините с помощью <code>' '.join(...)</code>."
    ],
    "check": {
     "tests": "\nassert reverse_words('Алматы әдемі қала') == 'қала әдемі Алматы', \"Ожидалось 'қала әдемі Алматы'\"\nassert reverse_words('  сәлем   әлем ') == 'әлем сәлем', \"Уберите лишние пробелы: 'әлем сәлем'\"\nassert reverse_words('   ') == '', \"Только пробелы: ''\"\nassert reverse_words('') == '', \"Пустая строка: ''\"\nassert reverse_words('жалғыз') == 'жалғыз', 'Одно слово не меняется'\n"
    }
   },
   {
    "title": "Самое длинное слово",
    "prompt": "<p>Функция <code>longest_word(s)</code> должна вернуть самое длинное слово в предложении (слова разделены пробелами). Если таких слов несколько одинаковой длины — <b>первое из них</b>. Если слов нет — <code>''</code>.</p>\n<pre><code>longest_word('Тараз ежелгі қала')  → 'ежелгі'\nlongest_word('ит мен мысық бар')   → 'мысық'\nlongest_word('')                   → ''</code></pre>",
    "hints": [
     "Заменяйте ответ только тогда, когда встретилось <b>строго</b> более длинное слово (а не <code>&gt;</code>, <code>&gt;=</code>)."
    ],
    "check": {
     "tests": "\nassert longest_word('Тараз ежелгі қала') == 'ежелгі', \"Ожидалось 'ежелгі'\"\nassert longest_word('ит мен мысық бар') == 'мысық', \"Ожидалось 'мысық'\"\nassert longest_word('') == '', \"Пустая строка: ''\"\nassert longest_word('ақ ой') == 'ақ', \"При одинаковой длине — первое: 'ақ'\"\nassert longest_word('  қар  ') == 'қар', \"Пробелы не учитывайте: 'қар'\"\n"
    }
   },
   {
    "title": "Аббревиатура из заглавных букв",
    "prompt": "<p>Функция <code>acronym(s)</code> должна составить строку из первых букв каждого слова, переведённых в заглавные (слова разделены пробелами, лишние пробелы возможны).</p>\n<pre><code>acronym('қазақ ұлттық университеті') → 'ҚҰУ'\nacronym('Ұлттық банк')               → 'ҰБ'\nacronym('')                          → ''</code></pre>",
    "hints": [
     "<code>w[0].upper()</code> — первая буква с заглавной буквы.",
     "Соберите с помощью <code>''.join(...)</code>."
    ],
    "check": {
     "tests": "\nassert acronym('қазақ ұлттық университеті') == 'ҚҰУ', \"Ожидалось 'ҚҰУ'\"\nassert acronym('Ұлттық банк') == 'ҰБ', \"Ожидалось 'ҰБ'\"\nassert acronym('') == '', \"Пустая строка: ''\"\nassert acronym('  еуразия   ұлттық  университеті ') == 'ЕҰУ', \"Лишние пробелы: 'ЕҰУ'\"\nassert acronym('әл-фараби') == 'Ә', \"Одно слово: 'Ә'\"\n"
    }
   },
   {
    "title": "Декодирование RLE",
    "prompt": "<p>На уроке вы кодировали строку в виде «символ + число». Теперь наоборот: функция <code>rle_decode(code)</code> должна восстановить закодированную строку. Число может состоять из нескольких цифр (<code>'a12'</code>). Кодируются только буквы.</p>\n<pre><code>rle_decode('a3b2c1') → 'aaabbc'\nrle_decode('x12')    → 'xxxxxxxxxxxx'\nrle_decode('')       → ''</code></pre>",
    "hints": [
     "После символа читайте цифры до конца: <code>code[j].isdigit()</code>.",
     "Собирайте части в список и в конце объединяйте их через <code>''.join</code>: склеивать строку <code>+=</code> в цикле медленно."
    ],
    "check": {
     "tests": "\nassert rle_decode('a3b2c1') == 'aaabbc', \"rle_decode('a3b2c1') должна вернуть 'aaabbc'\"\nassert rle_decode('x12') == 'x' * 12, 'Число из нескольких цифр: x12 → 12 раз x'\nassert rle_decode('') == '', \"Пустая строка: ''\"\nassert rle_decode('z1') == 'z', \"rle_decode('z1') должна вернуть 'z'\"\nassert rle_decode('a2a3') == 'aaaaa', 'Один и тот же символ может встретиться снова'\nassert rle_decode('q100w1') == 'q' * 100 + 'w', '100 раз q, затем w'\n"
    }
   },
   {
    "title": "Общий префикс",
    "prompt": "<p>Функция <code>common_prefix(words)</code> должна вернуть самый длинный префикс, общий для всех слов. Если список пуст или общего префикса нет — <code>''</code>.</p>\n<pre><code>common_prefix(['қалалар', 'қалам', 'қала']) → 'қала'\ncommon_prefix(['ит', 'құс'])               → ''\ncommon_prefix(['жол'])                     → 'жол'</code></pre>",
    "hints": [
     "Сравнивайте каждую позицию первого слова с той же позицией остальных слов.",
     "Остановитесь, если слово короче (<code>i &gt;= len(w)</code>) или символ отличается."
    ],
    "check": {
     "tests": "\nassert common_prefix(['қалалар', 'қалам', 'қала']) == 'қала', \"Ожидалось 'қала'\"\nassert common_prefix(['ит', 'құс']) == '', \"Общего префикса нет: ''\"\nassert common_prefix(['жол']) == 'жол', 'Одно слово: само оно'\nassert common_prefix([]) == '', \"Пустой список: ''\"\nassert common_prefix(['', 'а']) == '', \"Если есть пустое слово: ''\"\nassert common_prefix(['аб', 'абв', 'абвг']) == 'аб', 'Самое короткое слово ограничивает: аб'\nassert common_prefix(['тау', 'тау']) == 'тау', 'Одинаковые слова: тау'\n"
    }
   },
   {
    "title": "Изоморфные строки",
    "prompt": "<p>Функция <code>is_isomorphic(a, b)</code>: если, заменив каждый символ <code>a</code> на один символ, можно получить <code>b</code>, то верните <code>True</code>. Замена должна быть однозначной: один символ не заменяется на два разных, и два разных символа не заменяются на один. Если длины разные, верните <code>False</code>.</p>\n<pre><code>is_isomorphic('егер', 'алма')  → False   # е→а, г→л, е→м? жоқ\nis_isomorphic('қала', 'тата')  → False   # қ→т, а→а, л→т: екі таңба т-ға\nis_isomorphic('аппақ', 'ессек') → True</code></pre>",
    "hints": [
     "Заведите два словаря: <code>a → b</code> и <code>b → a</code>.",
     "Для каждой пары проверьте, нет ли противоречия с прежним соответствием в обе стороны."
    ],
    "check": {
     "tests": "\nassert is_isomorphic('егер', 'алма') is False, \"is_isomorphic('егер', 'алма') должна вернуть False\"\nassert is_isomorphic('қала', 'тата') is False, \"Два разных символа не заменяются на один: False\"\nassert is_isomorphic('аппақ', 'ессек') is True, \"is_isomorphic('аппақ', 'ессек') должна вернуть True\"\nassert is_isomorphic('', '') is True, 'Две пустые строки: True'\nassert is_isomorphic('ab', 'a') is False, 'Разные длины: False'\nassert is_isomorphic('paper', 'title') is True, \"is_isomorphic('paper', 'title') должна вернуть True\"\nassert is_isomorphic('ab', 'aa') is False, \"is_isomorphic('ab', 'aa') должна вернуть False\"\nassert is_isomorphic('aa', 'ab') is False, \"is_isomorphic('aa', 'ab') должна вернуть False\"\n"
    }
   },
   {
    "title": "Самая длинная палиндромная подстрока",
    "prompt": "<p>Функция <code>longest_palindrome(s)</code> должна вернуть самую длинную палиндромную подстроку (подряд идущие символы). Если таких несколько — ту, что <b>левее</b>. Раздвигайте от каждого центра (символ или промежуток между двумя символами) в обе стороны: время O(n²), память O(1). Для пустой строки — <code>''</code>.</p>\n<pre><code>longest_palindrome('қазақпыз') → 'қазақ'\nlongest_palindrome('abba')     → 'abba'\nlongest_palindrome('abc')      → 'a'</code></pre>",
    "hints": [
     "Центр нечётного палиндрома — один символ, центр чётного — промежуток между двумя символами: всего <code>2n − 1</code> центров.",
     "Расширяйте, пока <code>s[l] == s[r]</code>; длина <code>r − l − 1</code>. Обновляйте ответ, только если он строго длиннее — тогда останется самый левый."
    ],
    "check": {
     "tests": "\nassert longest_palindrome('қазақпыз') == 'қазақ', \"Ожидалось 'қазақ'\"\nassert longest_palindrome('abba') == 'abba', \"Палиндром чётной длины: 'abba'\"\nassert longest_palindrome('abc') == 'a', \"Все символы разные: самый левый 'a'\"\nassert longest_palindrome('') == '', \"Пустая строка: ''\"\nassert longest_palindrome('z') == 'z', \"Один символ: 'z'\"\nassert longest_palindrome('abacdfgdcaba') == 'aba', \"Ожидалось 'aba' (левый)\"\nassert longest_palindrome('cbbd') == 'bb', \"Ожидалось 'bb'\"\nimport random as _random\n_rng = _random.Random(4)\ndef _ref(s):\n    best = ''\n    for i in range(len(s)):\n        for j in range(i + 1, len(s) + 1):\n            if s[i:j] == s[i:j][::-1] and j - i > len(best):\n                best = s[i:j]\n    return best\nfor _ in range(40):\n    _s = ''.join(_rng.choice('аб') for _ in range(_rng.randint(1, 14)))\n    assert longest_palindrome(_s) == _ref(_s), f'{_s!r} үшін күтілгені {_ref(_s)!r}'\n_s = 'а' * 1500\nassert longest_palindrome(_s) == _s, '1500 одинаковых символов: вся строка'\n"
    }
   },
   {
    "title": "Сложение строкой",
    "prompt": "<p>Банковская система хранит очень большие суммы в виде строк. Функция <code>add_strings(a, b)</code> должна вернуть сумму двух неотрицательных целых чисел (строк цифр) в виде строки. Не применяйте <code>int()</code> или <code>str()</code> ко всему числу: складывайте цифры с конца двумя указателями, «перенося единицу» (carry). Отдельную цифру можно перевести с помощью <code>ord(ch) - ord('0')</code>.</p>\n<pre><code>add_strings('456', '77') → '533'\nadd_strings('999', '1')  → '1000'\nadd_strings('0', '0')    → '0'</code></pre>",
    "hints": [
     "Указатели <code>i</code> и <code>j</code> начинаются с конца; цикл работает, пока <code>i &gt;= 0 or j &gt;= 0 or carry</code>.",
     "Цифру получайте через <code>s % 10</code>, перенос — через <code>s // 10</code>; результат собирайте в обратном порядке."
    ],
    "check": {
     "tests": "\nassert add_strings('456', '77') == '533', \"add_strings('456', '77') должна вернуть '533'\"\nassert add_strings('999', '1') == '1000', \"Последний перенос: '1000'\"\nassert add_strings('0', '0') == '0', \"add_strings('0', '0') должна вернуть '0'\"\nassert add_strings('1', '999') == '1000', 'Разные длины: 1000'\nassert add_strings('12345678901234567890', '98765432109876543210') == '111111111011111111100', 'Большие числа сложены неверно'\nimport random as _random\n_rng = _random.Random(9)\nfor _ in range(30):\n    _x, _y = _rng.randint(0, 10**30), _rng.randint(0, 10**5)\n    assert add_strings(str(_x), str(_y)) == str(_x + _y), f'{_x} + {_y} қате'\n"
    }
   }
  ]
 },
 "dsa-4": {
  "pr": [
   {
    "title": "Самое частое слово",
    "prompt": "<p>В опросе жители написали свой любимый город. Функция <code>most_common(words)</code> должна вернуть самое частое слово; если частоты равны — наименьшее при сравнении строк через <code>&lt;</code>. Для пустого списка — <code>None</code>. Считайте с помощью словаря.</p>\n<pre><code>most_common(['Астана', 'Алматы', 'Астана']) → 'Астана'\nmost_common(['Тараз', 'Ақтау'])            → 'Ақтау'</code></pre>",
    "hints": [
     "<code>cnt[w] = cnt.get(w, 0) + 1</code>.",
     "При выборе лучшего слова два условия: частота больше, или частота равна и слово меньше."
    ],
    "check": {
     "tests": "\nassert most_common(['Астана', 'Алматы', 'Астана']) == 'Астана', \"Ожидалось 'Астана'\"\nassert most_common(['Тараз', 'Ақтау']) == 'Ақтау', \"При равной частоте меньшее по алфавиту: 'Ақтау'\"\nassert most_common([]) is None, 'Пустой список: None'\nassert most_common(['Орал']) == 'Орал', \"Одно слово: 'Орал'\"\nassert most_common(['б', 'а', 'б', 'а', 'в']) == 'а', \"Равная частота (2 и 2): 'а'\"\n"
    }
   },
   {
    "title": "Частота символов",
    "prompt": "<p>Функция <code>char_freq(s)</code> должна вернуть словарь: сколько раз встречается каждый символ строки. Пробелы не учитываются. Заглавные и строчные буквы считаются одинаковыми (<code>lower()</code>).</p>\n<pre><code>char_freq('Ата ана') → {'а': 4, 'т': 1, 'н': 1}\nchar_freq('')        → {}</code></pre>",
    "hints": [
     "Сначала <code>s.lower()</code>, затем посчитайте каждый символ.",
     "Если <code>ch == ' '</code>, пропустите."
    ],
    "check": {
     "tests": "\nassert char_freq('Ата ана') == {'а': 4, 'т': 1, 'н': 1}, \"Ожидалось {'а': 4, 'т': 1, 'н': 1}\"\nassert char_freq('') == {}, 'Пустая строка: {}'\nassert char_freq('   ') == {}, 'Только пробелы: {}'\nassert char_freq('ААа') == {'а': 3}, \"Заглавная буква тоже считается вместе со строчной: {'а': 3}\"\nassert char_freq('a1a!') == {'a': 2, '1': 1, '!': 1}, 'Цифры и знаки тоже считаются'\n"
    }
   },
   {
    "title": "Недостающие товары",
    "prompt": "<p>Магазин заказал товары <code>ordered</code>, а пришли <code>delivered</code> (в обоих списках могут быть повторы). Функция <code>missing(ordered, delivered)</code> должна вернуть список недостающих товаров, повторяя каждый товар столько раз, сколько его не хватает, в порядке <code>sorted</code>.</p>\n<pre><code>missing(['нан', 'сүт', 'нан', 'май'], ['нан', 'сүт'])\n→ ['май', 'нан']</code></pre>",
    "hints": [
     "Посчитайте заказ в словаре и для каждого пришедшего товара уменьшайте счётчик на 1.",
     "Чтобы лишние товары не сделали количество отрицательным: <code>max(c, 0)</code>."
    ],
    "check": {
     "tests": "\nassert missing(['нан', 'сүт', 'нан', 'май'], ['нан', 'сүт']) == ['май', 'нан'], \"Ожидалось ['май', 'нан']\"\nassert missing([], ['нан']) == [], 'Заказа нет: []'\nassert missing(['шай'], []) == ['шай'], \"Если ничего не пришло: ['шай']\"\nassert missing(['шай'], ['шай', 'шай', 'кофе']) == [], 'Лишние товары не компенсируют недостающие: []'\nassert missing(['а', 'а', 'а'], ['а']) == ['а', 'а'], \"Не хватает двух штук: ['а', 'а']\"\n"
    }
   },
   {
    "title": "Количество одинаковых пар",
    "prompt": "<p>Функция <code>equal_pairs(xs)</code> должна вернуть количество пар вида <code>i &lt; j</code> и <code>xs[i] == xs[j]</code>. Решение за O(n): если значение встречается <code>c</code> раз, оно даёт <code>c·(c−1)/2</code> пар (или, идя по списку, прибавляйте «сколько раз я уже видел это значение»). Тест — 100 000 элементов.</p>\n<pre><code>equal_pairs([1, 2, 3, 1, 1, 3]) → 4\nequal_pairs([5, 6])             → 0</code></pre>",
    "hints": [
     "Каждый новый элемент образует пару с каждым уже встреченным равным ему элементом.",
     "Сначала <code>total += seen.get(x, 0)</code>, затем увеличьте счётчик."
    ],
    "check": {
     "tests": "\nassert equal_pairs([1, 2, 3, 1, 1, 3]) == 4, 'equal_pairs([1, 2, 3, 1, 1, 3]) должна вернуть 4'\nassert equal_pairs([5, 6]) == 0, 'Равных элементов нет: 0'\nassert equal_pairs([]) == 0, 'Пустой список: 0'\nassert equal_pairs([7, 7, 7, 7]) == 6, 'Четыре одинаковых элемента: 6 пар'\nimport time as _time\n_big = [i % 10 for i in range(100000)]\n_t0 = _time.perf_counter(); _r = equal_pairs(_big); _dt = _time.perf_counter() - _t0\nassert _r == 10 * (10000 * 9999 // 2), f'Большой тест: ожидалось {10 * (10000 * 9999 // 2)}, получено {_r}'\nassert _dt < 1.0, f'Заняло {_dt:.2f} с: нужно решение за O(n)'\n"
    }
   },
   {
    "title": "Группировка по длине",
    "prompt": "<p>Функция <code>group_by_len(words)</code> должна сгруппировать слова по длине: ключ — длина, значение — слова этой длины в <b>порядке их появления</b> (если слово повторяется, оно повторяется и в группе). Верните словарь.</p>\n<pre><code>group_by_len(['ат', 'түйе', 'ит', 'қой', 'ат'])\n→ {2: ['ат', 'ит', 'ат'], 4: ['түйе'], 3: ['қой']}</code></pre>",
    "hints": [
     "<code>groups.setdefault(len(w), []).append(w)</code> — в одну строку."
    ],
    "check": {
     "tests": "\nassert group_by_len(['ат', 'түйе', 'ит', 'қой', 'ат']) == {2: ['ат', 'ит', 'ат'], 4: ['түйе'], 3: ['қой']}, 'Группы неверны'\nassert group_by_len([]) == {}, 'Пустой список: {}'\nassert group_by_len(['']) == {0: ['']}, \"Длина пустого слова 0: {0: ['']}\"\nassert group_by_len(['бір', 'екі', 'үш']) == {3: ['бір', 'екі'], 2: ['үш']}, 'Порядок должен сохраниться'\n"
    }
   },
   {
    "title": "Составить объявление",
    "prompt": "<p>Составим объявление из кусочков газет. Функция <code>can_build(note, magazine)</code>: если каждый символ <code>note</code> (кроме пробелов) можно взять из символов <code>magazine</code>, то верните <code>True</code>. Каждый символ можно использовать только один раз. Считайте словарём, O(n + m).</p>\n<pre><code>can_build('ақ', 'қара')    → True\ncan_build('аа', 'ақ')      → False\ncan_build('', 'кез келген') → True</code></pre>",
    "hints": [
     "Посчитайте символы <code>magazine</code>.",
     "Для каждого символа объявления уменьшайте счётчик; если он стал 0 — верните <code>False</code>."
    ],
    "check": {
     "tests": "\nassert can_build('ақ', 'қара') is True, \"can_build('ақ', 'қара') должна вернуть True\"\nassert can_build('аа', 'ақ') is False, \"Нужны две 'а', а есть только одна: False\"\nassert can_build('', 'кез келген') is True, 'Пустое объявление: True'\nassert can_build('а а', 'аа') is True, 'Пробелы не учитываются: True'\nassert can_build('б', '') is False, 'Газета пуста: False'\nassert can_build('Ақ', 'ақ') is False, 'Заглавная и строчная буквы — разные символы'\n"
    }
   },
   {
    "title": "Самая длинная последовательность чисел",
    "prompt": "<p>Номера вагонов поезда даны в случайном порядке. Функция <code>longest_run(nums)</code> должна вернуть длину самой длинной последовательности идущих подряд номеров (<code>x, x+1, x+2, ...</code>). Не сортируйте, решение за O(n) с помощью <code>set</code>: начинайте счёт только с <b>начала</b> цепочки (если <code>x − 1</code> нет). Тест — 100 000 элементов.</p>\n<pre><code>longest_run([100, 4, 200, 1, 3, 2]) → 4    # 1, 2, 3, 4\nlongest_run([])                      → 0\nlongest_run([7, 7, 7])               → 1</code></pre>",
    "hints": [
     "Положите все значения в <code>set</code>.",
     "Считайте вправо от <code>x</code> только тогда, когда <code>x − 1</code> нет в наборе: каждый элемент обходится лишь один раз."
    ],
    "check": {
     "tests": "\nassert longest_run([100, 4, 200, 1, 3, 2]) == 4, 'Ожидалось 4 (1, 2, 3, 4)'\nassert longest_run([]) == 0, 'Пустой список: 0'\nassert longest_run([7, 7, 7]) == 1, 'Повторы не удлиняют цепочку: 1'\nassert longest_run([-1, 0, 1]) == 3, 'Отрицательные числа: 3'\nassert longest_run([10, 5]) == 1, 'Соседнего числа нет: 1'\nimport random as _random, time as _time\n_rng = _random.Random(1)\nfor _ in range(30):\n    _a = [_rng.randint(0, 25) for _ in range(_rng.randint(0, 20))]\n    _s = sorted(set(_a)); _best = 0; _cur = 0\n    for _i, _v in enumerate(_s):\n        _cur = _cur + 1 if _i and _s[_i - 1] == _v - 1 else 1\n        _best = max(_best, _cur)\n    assert longest_run(_a) == _best, f'{_a} үшін күтілгені {_best}'\n_big = list(range(100000)); _rng.shuffle(_big)\n_t0 = _time.perf_counter(); _r = longest_run(_big); _dt = _time.perf_counter() - _t0\nassert _r == 100000 and _dt < 1.5, f'Перемешанные 0..99999: должно быть 100000 ({_dt:.2f} с)'\n"
    }
   },
   {
    "title": "Ноль из четырёх списков",
    "prompt": "<p>Ежедневные списки прибыли и убытков четырёх филиалов <code>a, b, c, d</code> (одинаковой длины, <code>n ≤ 300</code>). Функция <code>four_sum_count(a, b, c, d)</code> должна вернуть количество четвёрок <code>(i, j, k, l)</code>, сумма которых равна 0, если взять по одному элементу из каждого списка. Перебор O(n⁴) не пройдёт: суммы <code>a[i] + b[j]</code> посчитайте в словаре, а для <code>c[k] + d[l]</code> ищите <code>−(c[k] + d[l])</code> — O(n²).</p>\n<pre><code>four_sum_count([1, 2], [-2, -1], [-1, 2], [0, 2]) → 2</code></pre>",
    "hints": [
     "Разбейте задачу на две половины: <code>a + b</code> и <code>c + d</code>.",
     "Суммы первой половины подсчитайте в словаре <code>{қосынды: саны}</code>."
    ],
    "check": {
     "tests": "\nassert four_sum_count([1, 2], [-2, -1], [-1, 2], [0, 2]) == 2, 'Ожидалось 2'\nassert four_sum_count([0], [0], [0], [0]) == 1, 'Все нули: 1'\nassert four_sum_count([], [], [], []) == 0, 'Пустые списки: 0'\nassert four_sum_count([1], [1], [1], [1]) == 0, 'Сумма 4: 0'\nimport random as _random, time as _time\n_rng = _random.Random(8)\n_s = [[_rng.randint(-3, 3) for _ in range(6)] for _ in range(4)]\n_exp = sum(1 for x in _s[0] for y in _s[1] for z in _s[2] for w in _s[3] if x + y + z + w == 0)\nassert four_sum_count(*_s) == _exp, f'Случайный тест: ожидалось {_exp}'\n_big = [[_rng.randint(-1000, 1000) for _ in range(300)] for _ in range(4)]\n_t0 = _time.perf_counter(); four_sum_count(*_big); _dt = _time.perf_counter() - _t0\nassert _dt < 2.0, f'Для n = 300 заняло {_dt:.2f} с: нужно решение за O(n²)'\n"
    }
   }
  ]
 },
 "dsa-5": {
  "pr": [
   {
    "title": "Переворот строки через стек",
    "prompt": "<p>Функция <code>reverse_stack(s)</code> должна перевернуть строку с помощью стека: положите все символы в список как <code>append</code>, а затем достаньте их через <code>pop</code>. Не используйте срезы <code>[::-1]</code> и <code>reversed</code>.</p>\n<pre><code>reverse_stack('Абай') → 'йабА'\nreverse_stack('')     → ''</code></pre>",
    "hints": [
     "Последний вошедший элемент стека выходит первым (LIFO)."
    ],
    "check": {
     "tests": "\nassert reverse_stack('Абай') == 'йабА', \"reverse_stack('Абай') должна вернуть 'йабА'\"\nassert reverse_stack('') == '', \"Пустая строка: ''\"\nassert reverse_stack('x') == 'x', 'Один символ не меняется'\nassert reverse_stack('ab cd') == 'dc ba', 'Пробел тоже переворачивается'\n"
    }
   },
   {
    "title": "Клавиша Backspace",
    "prompt": "<p>Пользователь набирает текст: <code>'#'</code> — клавиша, которая удаляет предыдущий символ (если удалять нечего, ничего не происходит). Функция <code>apply_backspace(s)</code> должна вернуть итоговый текст. Используйте стек.</p>\n<pre><code>apply_backspace('ab#c')  → 'ac'\napply_backspace('a##b')  → 'b'\napply_backspace('###')   → ''</code></pre>",
    "hints": [
     "Если пришла <code>'#'</code> и стек не пуст — <code>pop()</code>, иначе добавьте символ: <code>append</code>."
    ],
    "check": {
     "tests": "\nassert apply_backspace('ab#c') == 'ac', \"apply_backspace('ab#c') должна вернуть 'ac'\"\nassert apply_backspace('a##b') == 'b', \"Удаление из пустого стека ничего не меняет: 'b'\"\nassert apply_backspace('###') == '', \"Только удаление: ''\"\nassert apply_backspace('') == '', \"Пустая строка: ''\"\nassert apply_backspace('сәлем') == 'сәлем', 'Если удалять нечего, строка не меняется'\nassert apply_backspace('ab##cd#') == 'c', \"apply_backspace('ab##cd#') должна вернуть 'c'\"\n"
    }
   },
   {
    "title": "Глубина скобок",
    "prompt": "<p>Дана правильная строка, состоящая только из скобок <code>(</code> и <code>)</code> (могут встречаться и другие символы — их пропускайте). Функция <code>max_depth(s)</code> должна вернуть наибольшую глубину вложенности скобок.</p>\n<pre><code>max_depth('(1+(2*3)+((8)/4))+1') → 3\nmax_depth('()()')                → 1\nmax_depth('abc')                 → 0</code></pre>",
    "hints": [
     "Нужен не сам стек, а только его размер: достаточно счётчика.",
     "<code>(</code> — глубина +1, <code>)</code> — −1; сохраняйте максимум."
    ],
    "check": {
     "tests": "\nassert max_depth('(1+(2*3)+((8)/4))+1') == 3, 'Ожидалось 3'\nassert max_depth('()()') == 1, \"max_depth('()()') должна вернуть 1\"\nassert max_depth('abc') == 0, 'Скобок нет: 0'\nassert max_depth('') == 0, 'Пустая строка: 0'\nassert max_depth('((()))') == 3, \"max_depth('((()))') должна вернуть 3\"\nassert max_depth('(' * 500 + ')' * 500) == 500, '500 уровней'\n"
    }
   },
   {
    "title": "Горячая картошка",
    "prompt": "<p>Дети стоят по кругу (в порядке <code>names</code>). Счёт начинается с первого ребёнка, каждый <code>k</code>-й ребёнок выбывает из игры, счёт продолжается со следующего. Функция <code>last_child(names, k)</code> должна вернуть имя последнего оставшегося ребёнка. Используйте <code>collections.deque</code> и <code>rotate</code> или <code>popleft</code>/<code>append</code>.</p>\n<pre><code>last_child(['Әли', 'Бота', 'Дана', 'Ерлан'], 2) → 'Әли'\n# Бота шығады → [Дана, Ерлан, Әли] → Ерлан шығады → [Әли, Дана] → Дана шығады\nlast_child(['Жан'], 5)                         → 'Жан'</code></pre>",
    "hints": [
     "<code>k − 1</code> — возьмите ребёнка спереди и поставьте его сзади; ребёнка <code>k</code> выведите с помощью <code>popleft()</code>.",
     "Повторяйте, пока в очереди не останется один ребёнок."
    ],
    "check": {
     "tests": "\nassert last_child(['Әли', 'Бота', 'Дана', 'Ерлан'], 2) == 'Әли', \"Ожидалось 'Әли'\"\nassert last_child(['Жан'], 5) == 'Жан', 'Один ребёнок: он и остаётся'\nassert last_child(['а', 'б', 'в'], 1) == 'в', 'k = 1: выбывают по порядку, последний остаётся'\ndef _ref(n, k):\n    r = 0\n    for m in range(2, n + 1):\n        r = (r + k) % m\n    return r\nfor _n in range(1, 12):\n    for _k in range(1, 6):\n        _names = [f'бала{i}' for i in range(_n)]\n        assert last_child(_names, _k) == _names[_ref(_n, _k)], f'n={_n}, k={_k} үшін күтілгені {_names[_ref(_n, _k)]}'\n"
    }
   },
   {
    "title": "Упрощение пути к файлу",
    "prompt": "<p>Дан Unix-путь к файлу. Функция <code>simplify_path(path)</code> должна его упростить: <code>'.'</code> — текущая папка (удаляется), <code>'..'</code> — на уровень вверх (из корня выше не выходим), несколько <code>'/'</code> подряд считаются одним <code>'/'</code>. Результат начинается с <code>'/'</code> и не заканчивается на <code>'/'</code> (кроме самого корня). Используйте стек.</p>\n<pre><code>simplify_path('/home//user/./docs/../photos/') → '/home/user/photos'\nsimplify_path('/../')                          → '/'\nsimplify_path('/a/b/../../c')                  → '/c'</code></pre>",
    "hints": [
     "<code>path.split('/')</code> тоже даёт пустые части — пропускайте их.",
     "<code>'..'</code> — выньте из стека <code>pop</code> (если он не пуст), иное имя — <code>append</code>."
    ],
    "check": {
     "tests": "\nassert simplify_path('/home//user/./docs/../photos/') == '/home/user/photos', \"Ожидалось '/home/user/photos'\"\nassert simplify_path('/../') == '/', \"Из корня выше не выходим: '/'\"\nassert simplify_path('/a/b/../../c') == '/c', \"Ожидалось '/c'\"\nassert simplify_path('/') == '/', \"Корень: '/'\"\nassert simplify_path('/...') == '/...', \"'...' — обычное имя папки\"\nassert simplify_path('/a/./b/./') == '/a/b', \"Ожидалось '/a/b'\"\n"
    }
   },
   {
    "title": "Удаление соседних пар",
    "prompt": "<p>Функция <code>remove_pairs(s)</code>: в строке удаляем два одинаковых символа, стоящих рядом; если после удаления появилась новая пара, удаляем и её. Так делаем, пока пар не останется. Верните итоговую строку. Стеком за O(n).</p>\n<pre><code>remove_pairs('abbaca') → 'ca'     # bb жойылады → aaca → aa жойылады → ca\nremove_pairs('aabb')   → ''\nremove_pairs('abc')    → 'abc'</code></pre>",
    "hints": [
     "Если верхний элемент стека равен новому символу — <code>pop()</code>, иначе <code>append</code>."
    ],
    "check": {
     "tests": "\nassert remove_pairs('abbaca') == 'ca', \"remove_pairs('abbaca') должна вернуть 'ca'\"\nassert remove_pairs('aabb') == '', \"Всё удаляется: ''\"\nassert remove_pairs('abc') == 'abc', 'Пар нет: без изменений'\nassert remove_pairs('') == '', \"Пустая строка: ''\"\nassert remove_pairs('aaa') == 'a', \"Из трёх одинаковых символов один остаётся: 'a'\"\nassert remove_pairs('abccba') == '', 'Удаление цепочки: пустая строка'\nimport time as _time\n_t0 = _time.perf_counter(); _r = remove_pairs('ab' * 50000 + 'ba' * 50000); _dt = _time.perf_counter() - _t0\nassert _r == '' and _dt < 1.0, f\"Большой тест: ожидалось '' ({_dt:.2f} с), нужен стек за O(n)\"\n"
    }
   },
   {
    "title": "Стек с минимумом",
    "prompt": "<p>Напишите класс <code>MinStack</code> с методами <code>push(x)</code>, <code>pop()</code> (удаляет верхний элемент и возвращает его), <code>top()</code>, <code>get_min()</code> — все за O(1). Если стек пуст, <code>pop</code>, <code>top</code>, <code>get_min</code> должны возвращать <code>None</code>. Совет: вместе с каждым элементом сохраняйте «минимум на этот момент».</p>\n<pre><code>s = MinStack()\ns.push(5); s.push(2); s.push(7)\ns.get_min() → 2\ns.pop()     → 7\ns.pop()     → 2\ns.get_min() → 5</code></pre>",
    "hints": [
     "Кладите в стек пару <code>(x, ағымдағы_минимум)</code>.",
     "Новый минимум: <code>min(x, self.st[-1][1])</code>; при pop предыдущий минимум возвращается сам."
    ],
    "check": {
     "tests": "\n_s = MinStack()\nassert _s.get_min() is None and _s.top() is None and _s.pop() is None, 'На пустом стеке верните None'\n_s.push(5); _s.push(2); _s.push(7)\nassert _s.get_min() == 2, 'После push 5, 2, 7 минимум 2'\nassert _s.top() == 7, 'top() должна вернуть 7'\nassert _s.pop() == 7 and _s.pop() == 2, 'pop() должен вернуть 7, затем 2'\nassert _s.get_min() == 5, 'После извлечения 2 минимум равен 5'\n_s.push(5); _s.push(5)\nassert _s.pop() == 5 and _s.get_min() == 5, 'Повторяющийся минимум: после извлечения одной 5 минимум всё ещё 5'\n_s2 = MinStack()\nfor _x in [3, -1, 4, -1, 5]:\n    _s2.push(_x)\n_exp = [-1, -1, -1, -1, 3]\nfor _e in _exp:\n    assert _s2.get_min() == _e, f'Кезекпен pop жасағанда минимумдар {_exp} болуы керек'\n    _s2.pop()\nassert _s2.get_min() is None, 'После извлечения всех элементов None'\nimport time as _time\n_s3 = MinStack(); _t0 = _time.perf_counter()\nfor _i in range(50000):\n    _s3.push(50000 - _i); _s3.get_min()\nfor _i in range(50000):\n    _s3.get_min(); _s3.pop()\nassert _time.perf_counter() - _t0 < 1.5, 'Операции должны выполняться за O(1) (min(...) не должен проходить весь стек)'\n"
    }
   },
   {
    "title": "Раскодирование строки",
    "prompt": "<p>Функция <code>decode(s)</code>: запись <code>k[мәтін]</code> означает, что текст повторяется <code>k</code> раз; скобки могут быть вложенными, <code>k</code> может состоять из нескольких цифр. Раскодируйте строку и верните результат. Два стека: для чисел и для «текста, собранного до этой скобки».</p>\n<pre><code>decode('3[a]2[bc]')   → 'aaabcbc'\ndecode('2[a2[c]]')    → 'accacc'\ndecode('қаз10[а]')    → 'қаз' + 'а' * 10</code></pre>",
    "hints": [
     "Собирайте цифры через <code>k = k * 10 + цифр</code>.",
     "<code>'['</code> — положите в стек <code>k</code> и текущий текст и начните заново; <code>']'</code> — повторите текущий текст и добавьте его к предыдущему."
    ],
    "check": {
     "tests": "\nassert decode('3[a]2[bc]') == 'aaabcbc', \"decode('3[a]2[bc]') должна вернуть 'aaabcbc'\"\nassert decode('2[a2[c]]') == 'accacc', \"Вложенные скобки: 'accacc'\"\nassert decode('қаз10[а]') == 'қаз' + 'а' * 10, 'Число из нескольких цифр: 10'\nassert decode('') == '', \"Пустая строка: ''\"\nassert decode('abc') == 'abc', 'Скобок нет: без изменений'\nassert decode('2[ab]cd3[e]') == 'ababcdeee', \"Ожидалось 'ababcdeee'\"\nassert decode('2[2[2[x]]]') == 'x' * 8, \"Три уровня: 8 раз 'x'\"\nassert decode('1[]a') == 'a', \"Пустые скобки: 'a'\"\n"
    }
   }
  ]
 },
 "dsa-6": {
  "pr": [
   {
    "title": "Длина списка",
    "prompt": "<p>Дан класс <code>Node</code>. Функция <code>length(head)</code> должна вернуть количество узлов в связном списке. Пустой список (<code>None</code>) — 0.</p>\n<pre><code>length(Node(1, Node(2, Node(3)))) → 3\nlength(None)                      → 0</code></pre>",
    "hints": [
     "В цикле <code>while head:</code> увеличивайте счётчик и переходите к <code>head = head.next</code>."
    ],
    "check": {
     "tests": "\ndef _mk(vals):\n    h = None\n    for v in reversed(vals):\n        h = Node(v, h)\n    return h\ndef _tl(h):\n    out = []\n    while h:\n        out.append(h.val); h = h.next\n        if len(out) > 10000: raise AssertionError('Тізімде цикл пайда болды')\n    return out\n\nassert length(_mk([1, 2, 3])) == 3, 'Список из трёх узлов: 3'\nassert length(None) == 0, 'Пустой список: 0'\nassert length(_mk([9])) == 1, 'Один узел: 1'\nassert length(_mk(list(range(5000)))) == 5000, '5000 узлов'\n"
    }
   },
   {
    "title": "Значение k-го узла",
    "prompt": "<p>Функция <code>value_at(head, k)</code> должна вернуть значение узла с номером <code>k</code> (счёт с 0). Если такого узла нет (<code>k</code> слишком большой или отрицательный) — <code>None</code>.</p>\n<pre><code>value_at(1 → 5 → 9, 1) → 5\nvalue_at(1 → 5 → 9, 3) → None</code></pre>",
    "hints": [
     "Сделайте <code>k</code> раз <code>head = head.next</code>; если по пути встретите <code>None</code>, остановитесь.",
     "Отрицательное <code>k</code> проверьте отдельно."
    ],
    "check": {
     "tests": "\ndef _mk(vals):\n    h = None\n    for v in reversed(vals):\n        h = Node(v, h)\n    return h\ndef _tl(h):\n    out = []\n    while h:\n        out.append(h.val); h = h.next\n        if len(out) > 10000: raise AssertionError('Тізімде цикл пайда болды')\n    return out\n\n_h = _mk([1, 5, 9])\nassert value_at(_h, 0) == 1, 'value_at(..., 0) — первое значение 1'\nassert value_at(_h, 1) == 5, 'value_at(..., 1) должна вернуть 5'\nassert value_at(_h, 2) == 9, 'value_at(..., 2) должна вернуть 9'\nassert value_at(_h, 3) is None, 'Узла нет: None'\nassert value_at(_h, -1) is None, 'Отрицательный k: None'\nassert value_at(None, 0) is None, 'Пустой список: None'\nassert value_at(_mk([0]), 0) == 0, 'Значение может быть 0: не None, верните 0'\n"
    }
   },
   {
    "title": "Середина списка",
    "prompt": "<p>Функция <code>middle(head)</code> должна вернуть средний узел списка (сам узел). Если узлов чётное число — <b>второй</b> из двух средних. Используйте два указателя с разной скоростью: <code>slow</code> делает один шаг, <code>fast</code> — два шага; проход один. Для пустого списка — <code>None</code>.</p>\n<pre><code>1 → 2 → 3 → 4 → 5   ⇒  3-түйін\n1 → 2 → 3 → 4       ⇒  3-түйін</code></pre>",
    "hints": [
     "<code>while fast and fast.next:</code> — когда fast дойдёт до конца, slow стоит в середине."
    ],
    "check": {
     "tests": "\ndef _mk(vals):\n    h = None\n    for v in reversed(vals):\n        h = Node(v, h)\n    return h\ndef _tl(h):\n    out = []\n    while h:\n        out.append(h.val); h = h.next\n        if len(out) > 10000: raise AssertionError('Тізімде цикл пайда болды')\n    return out\n\n_h = _mk([1, 2, 3, 4, 5]); _m = middle(_h)\nassert _m is _h.next.next, 'В списке из 5 узлов середина — третий узел (значение 3)'\n_h = _mk([1, 2, 3, 4])\nassert middle(_h) is _h.next.next, 'При чётном числе узлов — второй средний: узел со значением 3'\nassert middle(None) is None, 'Пустой список: None'\n_h = _mk([7]); assert middle(_h) is _h, 'Бір түйін: өзі'\n_h = _mk([1, 2]); assert middle(_h) is _h.next, 'Екі түйін: екіншісі'\n"
    }
   },
   {
    "title": "Удаление по значению",
    "prompt": "<p>Удалите из списка все узлы, у которых <code>remove_all(head, x)</code> равно <code>x</code>, и верните новую голову (сама голова тоже может быть удалена). Совет: <code>dummy = Node(0, head)</code> — фиктивный головной узел упрощает крайние случаи.</p>\n<pre><code>remove_all(1 → 2 → 6 → 3 → 6, 6) → 1 → 2 → 3\nremove_all(7 → 7 → 7, 7)         → None</code></pre>",
    "hints": [
     "Если <code>cur.next.val == x</code>, то <code>cur.next = cur.next.next</code> (cur остаётся на месте).",
     "В конце верните <code>dummy.next</code>."
    ],
    "check": {
     "tests": "\ndef _mk(vals):\n    h = None\n    for v in reversed(vals):\n        h = Node(v, h)\n    return h\ndef _tl(h):\n    out = []\n    while h:\n        out.append(h.val); h = h.next\n        if len(out) > 10000: raise AssertionError('Тізімде цикл пайда болды')\n    return out\n\nassert _tl(remove_all(_mk([1, 2, 6, 3, 6]), 6)) == [1, 2, 3], 'Ожидалось [1, 2, 3]'\nassert remove_all(_mk([7, 7, 7]), 7) is None, 'Если удалить все значения: None'\nassert remove_all(None, 1) is None, 'Пустой список: None'\nassert _tl(remove_all(_mk([5, 1, 5]), 5)) == [1], 'Удаляются голова и хвост: [1]'\nassert _tl(remove_all(_mk([1, 2]), 9)) == [1, 2], 'x нет: без изменений'\n_h = _mk([1, 2, 3]); _second = _h.next\nassert remove_all(_h, 1) is _second, 'Не создавайте новый узел: прежний второй узел становится новой головой'\n"
    }
   },
   {
    "title": "k-й узел с конца",
    "prompt": "<p>Функция <code>kth_from_end(head, k)</code> должна вернуть <code>k</code>-й узел с конца списка (<code>k = 1</code> — последний узел). За один проход: сначала отправьте <code>fast</code> вперёд на <code>k</code> шагов, а потом двигайте оба указателя вместе. Если <code>k</code> больше длины списка или <code>k &lt; 1</code> — верните <code>None</code>.</p>\n<pre><code>kth_from_end(1 → 2 → 3 → 4, 1) → 4-түйін\nkth_from_end(1 → 2 → 3 → 4, 4) → 1-түйін\nkth_from_end(1 → 2, 3)         → None</code></pre>",
    "hints": [
     "Если <code>fast</code> опережает на <code>k</code> шагов, то когда он дойдёт до <code>None</code>, <code>slow</code> окажется ровно на нужном узле.",
     "Если <code>fast</code> становится <code>None</code> раньше срока, значит <code>k</code> слишком велико."
    ],
    "check": {
     "tests": "\ndef _mk(vals):\n    h = None\n    for v in reversed(vals):\n        h = Node(v, h)\n    return h\ndef _tl(h):\n    out = []\n    while h:\n        out.append(h.val); h = h.next\n        if len(out) > 10000: raise AssertionError('Тізімде цикл пайда болды')\n    return out\n\n_h = _mk([1, 2, 3, 4])\nassert kth_from_end(_h, 1) is _h.next.next.next, 'k = 1: последний узел (4)'\nassert kth_from_end(_h, 4) is _h, 'k = 4: первый узел'\nassert kth_from_end(_h, 2).val == 3, 'k = 2: узел со значением 3'\nassert kth_from_end(_mk([1, 2]), 3) is None, 'k больше длины списка: None'\nassert kth_from_end(None, 1) is None, 'Пустой список: None'\nassert kth_from_end(_h, 0) is None, 'k = 0: None'\n"
    }
   },
   {
    "title": "Удаление дублей в отсортированном списке",
    "prompt": "<p>Значения списка отсортированы по возрастанию. Функция <code>dedup(head)</code> должна оставить от каждого значения только первый узел и вернуть голову. Новые узлы не создавайте, O(n).</p>\n<pre><code>dedup(1 → 1 → 2 → 3 → 3 → 3) → 1 → 2 → 3</code></pre>",
    "hints": [
     "Список отсортирован: одинаковые значения стоят рядом.",
     "Если <code>cur.next.val == cur.val</code>, пропустите следующий узел."
    ],
    "check": {
     "tests": "\ndef _mk(vals):\n    h = None\n    for v in reversed(vals):\n        h = Node(v, h)\n    return h\ndef _tl(h):\n    out = []\n    while h:\n        out.append(h.val); h = h.next\n        if len(out) > 10000: raise AssertionError('Тізімде цикл пайда болды')\n    return out\n\nassert _tl(dedup(_mk([1, 1, 2, 3, 3, 3]))) == [1, 2, 3], 'Ожидалось [1, 2, 3]'\nassert dedup(None) is None, 'Пустой список: None'\nassert _tl(dedup(_mk([4, 4, 4]))) == [4], 'Все одинаковые: [4]'\nassert _tl(dedup(_mk([1, 2, 3]))) == [1, 2, 3], 'Повторов нет: без изменений'\n_h = _mk([1, 1, 2]); _last = _h.next.next\ndedup(_h)\nassert _h.next is _last, 'Используйте прежние узлы, новые не создавайте'\n"
    }
   },
   {
    "title": "Палиндромный список",
    "prompt": "<p><code>is_palindrome_list(head)</code>: значения списка одинаково читаются с обеих сторон, то <code>True</code>. Дополнительная память O(1): не копируйте значения в список Python. Найдите середину (slow/fast), переверните вторую половину на месте и сравните обе половины.</p>\n<pre><code>1 → 2 → 2 → 1   ⇒ True\n1 → 2 → 3       ⇒ False</code></pre>",
    "hints": [
     "Поиск середины: <code>while fast and fast.next</code>.",
     "Переверните вторую половину, начиная с середины (<code>reverse_list</code> из урока), затем идите параллельно от начала и от начала перевёрнутой половины."
    ],
    "check": {
     "tests": "\ndef _mk(vals):\n    h = None\n    for v in reversed(vals):\n        h = Node(v, h)\n    return h\ndef _tl(h):\n    out = []\n    while h:\n        out.append(h.val); h = h.next\n        if len(out) > 10000: raise AssertionError('Тізімде цикл пайда болды')\n    return out\n\nassert is_palindrome_list(_mk([1, 2, 2, 1])) is True, '1 → 2 → 2 → 1: True'\nassert is_palindrome_list(_mk([1, 2, 3])) is False, '1 → 2 → 3: False'\nassert is_palindrome_list(None) is True, 'Пустой список: True'\nassert is_palindrome_list(_mk([5])) is True, 'Один узел: True'\nassert is_palindrome_list(_mk([1, 2, 1])) is True, '1 → 2 → 1: True'\nassert is_palindrome_list(_mk([1, 2])) is False, '1 → 2: False'\nassert is_palindrome_list(_mk([1, 1, 2, 1])) is False, '1 → 1 → 2 → 1: False'\nimport random as _random\n_rng = _random.Random(6)\nfor _ in range(40):\n    _v = [_rng.randint(0, 2) for _ in range(_rng.randint(0, 9))]\n    assert is_palindrome_list(_mk(_v)) == (_v == _v[::-1]), f'{_v} үшін {_v == _v[::-1]} күтілді'\n"
    }
   },
   {
    "title": "Сложение двух чисел списками",
    "prompt": "<p>Два неотрицательных числа заданы списками: цифры идут <b>в обратном порядке</b> (первый узел — единицы). <code>add_lists(a, b)</code> должна вернуть сумму в виде нового списка такого же формата. Длины списков могут различаться, в конце может остаться перенос (carry). Не собирайте число в <code>int</code> — складывайте цифры по одной.</p>\n<pre><code>(2 → 4 → 3) + (5 → 6 → 4) = 7 → 0 → 8     # 342 + 465 = 807\n(9 → 9) + (1)             = 0 → 0 → 1     # 99 + 1 = 100</code></pre>",
    "hints": [
     "<code>while a or b or carry:</code> — не забудьте последний перенос.",
     "Начиная с узла <code>dummy</code>, постройте новый список через <code>tail.next = Node(s % 10)</code>."
    ],
    "check": {
     "tests": "\ndef _mk(vals):\n    h = None\n    for v in reversed(vals):\n        h = Node(v, h)\n    return h\ndef _tl(h):\n    out = []\n    while h:\n        out.append(h.val); h = h.next\n        if len(out) > 10000: raise AssertionError('Тізімде цикл пайда болды')\n    return out\n\nassert _tl(add_lists(_mk([2, 4, 3]), _mk([5, 6, 4]))) == [7, 0, 8], '342 + 465 = 807: [7, 0, 8]'\nassert _tl(add_lists(_mk([9, 9]), _mk([1]))) == [0, 0, 1], '99 + 1 = 100: [0, 0, 1]'\nassert _tl(add_lists(_mk([0]), _mk([0]))) == [0], '0 + 0 = 0: [0]'\nassert _tl(add_lists(_mk([5]), _mk([5]))) == [0, 1], '5 + 5 = 10: [0, 1]'\nimport random as _random\n_rng = _random.Random(12)\ndef _digits(n):\n    return [int(c) for c in reversed(str(n))]\nfor _ in range(30):\n    _x, _y = _rng.randint(0, 10**20), _rng.randint(0, 10**8)\n    assert _tl(add_lists(_mk(_digits(_x)), _mk(_digits(_y)))) == _digits(_x + _y), f'{_x} + {_y} қате қосылды'\n"
    }
   }
  ]
 },
 "dsa-7": {
  "pr": [
   {
    "title": "Быстрая степень",
    "prompt": "<p>Функция <code>power(a, n)</code> должна рекурсией вычислить <code>a<sup>n</sup></code> (<code>n ≥ 0</code> — целое число), не используя <code>**</code> и <code>pow</code>. Быстрый способ: <code>a<sup>n</sup> = (a<sup>n/2</sup>)²</code>; для нечётного <code>n</code> умножьте ещё раз на <code>a</code> — глубина рекурсии O(log n).</p>\n<pre><code>power(2, 10) → 1024\npower(5, 0)  → 1\npower(3, 5)  → 243</code></pre>",
    "hints": [
     "Базовый случай: <code>n == 0</code> → 1.",
     "Вызывайте <code>half = power(a, n // 2)</code> только один раз."
    ],
    "check": {
     "tests": "\nassert power(2, 10) == 1024, 'power(2, 10) должна вернуть 1024'\nassert power(5, 0) == 1, 'Нулевая степень: 1'\nassert power(3, 5) == 243, 'power(3, 5) должна вернуть 243'\nassert power(0, 0) == 1, 'Считаем, что power(0, 0) равно 1'\nassert power(-2, 3) == -8, 'power(-2, 3) должна вернуть -8'\nassert power(1, 10**6) == 1, 'Для n = 10^6 глубина рекурсии должна быть log n'\nassert power(2, 3000) == 2 ** 3000, 'power(2, 3000) вычислено неверно'\n"
    }
   },
   {
    "title": "Сумма вложенных списков",
    "prompt": "<p>В кладовой ящики содержат ящики: список состоит из чисел и других списков. <code>nested_sum(items)</code> должна рекурсией вернуть сумму всех чисел на всех уровнях. Проверяйте, является ли элемент списком, с помощью <code>isinstance(x, list)</code>.</p>\n<pre><code>nested_sum([1, [2, [3, 4]], 5]) → 15\nnested_sum([[], [[]]])          → 0</code></pre>",
    "hints": [
     "Если встретился список — вызовите <code>nested_sum</code> для него снова."
    ],
    "check": {
     "tests": "\nassert nested_sum([1, [2, [3, 4]], 5]) == 15, 'Ожидалось 15'\nassert nested_sum([[], [[]]]) == 0, 'Пустые ящики: 0'\nassert nested_sum([]) == 0, 'Пустой список: 0'\nassert nested_sum([7]) == 7, 'Одно число: 7'\nassert nested_sum([[[[[-3]]]], 3]) == 0, 'Глубокий вложенный список: 0'\n"
    }
   },
   {
    "title": "Переворот строки рекурсией",
    "prompt": "<p>Функция <code>reverse_rec(s)</code> должна перевернуть строку рекурсией: перевёрнутая пустая строка — пустая строка; иначе <code>reverse_rec(s[1:]) + s[0]</code>. Не используйте цикл, <code>[::-1]</code> и <code>reversed</code>. Длина строки не превышает 500.</p>\n<pre><code>reverse_rec('Қазақ') → 'қазаҚ'\nreverse_rec('')      → ''</code></pre>",
    "hints": [
     "Базовый случай: <code>s == ''</code>.",
     "Первый символ уходит в конец результата."
    ],
    "check": {
     "tests": "\nassert reverse_rec('Қазақ') == 'қазаҚ', \"reverse_rec('Қазақ') должна вернуть 'қазаҚ'\"\nassert reverse_rec('') == '', \"Пустая строка: ''\"\nassert reverse_rec('a') == 'a', 'Один символ'\nassert reverse_rec('ab') == 'ba', \"reverse_rec('ab') должна вернуть 'ba'\"\nassert reverse_rec('x' * 300 + 'y') == 'y' + 'x' * 300, 'Длинная строка перевёрнута неверно'\n"
    }
   },
   {
    "title": "Все перестановки",
    "prompt": "<p>Функция <code>permutations(items)</code> должна с помощью backtracking построить все перестановки различных элементов (не используйте <code>itertools</code>). Результат — список списков. Порядок: <code>items</code> выбираются в заданном порядке (тогда при отсортированном входе результат будет в лексикографическом порядке).</p>\n<pre><code>permutations([1, 2, 3])\n→ [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]\npermutations([]) → [[]]</code></pre>",
    "hints": [
     "Список <code>used</code> отмечает, какие элементы уже стоят на пути.",
     "Когда длина станет полной — сохраните копию <code>path[:]</code>; при возврате — <code>pop()</code> и <code>used[i] = False</code>."
    ],
    "check": {
     "tests": "\nassert permutations([1, 2, 3]) == [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]], 'Порядок или содержимое неверны'\nassert permutations([]) == [[]], 'Пустой список имеет одну перестановку: [[]]'\nassert permutations(['а']) == [['а']], \"Один элемент: [['а']]\"\n_p = permutations(['ит', 'құс', 'ат', 'бие'])\nassert len(_p) == 24 and len(set(map(tuple, _p))) == 24, 'Из 4 элементов получается 24 различные перестановки'\nassert _p[0] == ['ит', 'құс', 'ат', 'бие'] and _p[-1] == ['бие', 'ат', 'құс', 'ит'], 'Элементы должны выбираться в заданном порядке'\nassert len(permutations(list(range(7)))) == 5040, '7! = 5040'\n"
    }
   },
   {
    "title": "Группы из k элементов",
    "prompt": "<p>В классе есть ученики с номерами <code>1..n</code>. Функция <code>combinations(n, k)</code> должна вернуть все группы из <code>k</code> учеников среди них: каждая группа по возрастанию, группы в лексикографическом порядке. Backtracking: выбирайте следующий номер больше предыдущего.</p>\n<pre><code>combinations(4, 2) → [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]\ncombinations(3, 0) → [[]]\ncombinations(2, 3) → []</code></pre>",
    "hints": [
     "<code>bt(start)</code>: выберите следующий элемент из диапазона <code>start..n</code>.",
     "Если элементов не хватает, ветку можно отсечь: <code>x ≤ n − (k − len(path)) + 1</code>."
    ],
    "check": {
     "tests": "\nassert combinations(4, 2) == [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]], 'Ожидалось 6 групп в лексикографическом порядке'\nassert combinations(3, 0) == [[]], 'k = 0: [[]]'\nassert combinations(2, 3) == [], 'k > n: []'\nassert combinations(3, 3) == [[1, 2, 3]], 'k = n: [[1, 2, 3]]'\nassert len(combinations(10, 5)) == 252, 'C(10, 5) = 252'\n_c = combinations(6, 3)\nassert _c == sorted(_c) and all(a < b < c for a, b, c in _c), 'Каждая группа по возрастанию, группы отсортированы'\n"
    }
   },
   {
    "title": "Буквы телефонных кнопок",
    "prompt": "<p>В старом телефоне цифры соответствуют буквам: <code>2: abc, 3: def, 4: ghi, 5: jkl, 6: mno, 7: pqrs, 8: tuv, 9: wxyz</code>. Функция <code>letter_combos(digits)</code> должна вернуть все комбинации букв для заданной строки цифр (в порядке нажатия кнопок). Для пустой строки — <code>[]</code>.</p>\n<pre><code>letter_combos('23') → ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']\nletter_combos('')   → []</code></pre>",
    "hints": [
     "<code>bt(i, cur)</code>: добавьте каждую букву цифры <code>i</code> к <code>cur</code> и переходите к <code>i + 1</code>.",
     "Пустой ввод проверьте отдельно: <code>[]</code>, а не <code>['']</code>."
    ],
    "check": {
     "tests": "\nassert letter_combos('23') == ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'], 'Ожидалось 9 комбинаций в нужном порядке'\nassert letter_combos('') == [], \"Пустая строка: [] (а не [''])\"\nassert letter_combos('7') == ['p', 'q', 'r', 's'], \"'7': четыре буквы\"\nassert len(letter_combos('79')) == 16, \"'79': 4 · 4 = 16\"\nassert letter_combos('22')[:3] == ['aa', 'ab', 'ac'], \"Начало '22': aa, ab, ac\"\n"
    }
   },
   {
    "title": "Суммы из заданных чисел",
    "prompt": "<p>В магазине есть товары с ценами <code>prices</code> (различные положительные числа); каждый товар можно брать сколько угодно раз. Функция <code>combo_sum(prices, total)</code> должна вернуть все различные наборы, общая стоимость которых в точности равна <code>total</code>: каждый набор по возрастанию, наборы — в лексикографическом порядке. Backtracking: выбирайте следующий товар не меньше предыдущего, при превышении суммы останавливайтесь.</p>\n<pre><code>combo_sum([2, 3, 6, 7], 7) → [[2, 2, 3], [7]]\ncombo_sum([2], 1)          → []\ncombo_sum([5, 1], 0)       → [[]]</code></pre>",
    "hints": [
     "Сначала отсортируйте цены; <code>bt(start, rem)</code> — выбор, начиная с <code>start</code>, <code>rem</code> — оставшаяся сумма.",
     "Чтобы можно было взять один товар повторно, в рекурсию передайте <code>i</code>, а не <code>i + 1</code>."
    ],
    "check": {
     "tests": "\nassert combo_sum([2, 3, 6, 7], 7) == [[2, 2, 3], [7]], 'Ожидалось [[2, 2, 3], [7]]'\nassert combo_sum([2], 1) == [], 'Собрать нельзя: []'\nassert combo_sum([5, 1], 0) == [[]], 'total = 0: пустой набор [[]]'\nassert combo_sum([3, 5, 2], 8) == [[2, 2, 2, 2], [2, 3, 3], [3, 5]], 'Несортированный ввод: [[2, 2, 2, 2], [2, 3, 3], [3, 5]]'\ndef _ways(ps, t):\n    dp = [1] + [0] * t\n    for p in ps:\n        for s in range(p, t + 1):\n            dp[s] += dp[s - p]\n    return dp[t]\n_r = combo_sum([2, 3, 5, 7], 30)\nassert len(_r) == _ways([2, 3, 5, 7], 30) and len(set(map(tuple, _r))) == len(_r), 'Количество наборов неверно или есть повторы'\nassert all(sum(c) == 30 and c == sorted(c) for c in _r) and _r == sorted(_r), 'Сумма каждого набора равна 30; наборы по возрастанию, список отсортирован'\n"
    }
   },
   {
    "title": "Расстановка ферзей",
    "prompt": "<p>Сколько есть способов поставить <code>n</code> ферзей на шахматную доску <code>n × n</code> так, чтобы они не били друг друга? Верните число <code>n_queens(n)</code>. Backtracking: ставьте по одному ферзю в каждую строку и храните занятые столбцы и две диагонали (<code>r − c</code> и <code>r + c</code>) в множествах <code>set</code>. <code>n ≤ 9</code>.</p>\n<pre><code>n_queens(4) → 2\nn_queens(1) → 1\nn_queens(3) → 0</code></pre>",
    "hints": [
     "На клетках одной диагонали <code>r − c</code> постоянно, на другой — <code>r + c</code> постоянно.",
     "При возврате не забудьте удалить значения из всех трёх множеств."
    ],
    "check": {
     "tests": "\nassert n_queens(4) == 2, 'n_queens(4) должна вернуть 2'\nassert n_queens(1) == 1, 'n_queens(1) должна вернуть 1'\nassert n_queens(2) == 0 and n_queens(3) == 0, 'Для n = 2 и n = 3 решений нет'\nassert n_queens(5) == 10, 'n_queens(5) должна вернуть 10'\nassert n_queens(6) == 4, 'n_queens(6) должна вернуть 4'\nassert n_queens(8) == 92, 'n_queens(8) должна вернуть 92'\n"
    }
   }
  ]
 },
 "dsa-8": {
  "pr": [
   {
    "title": "Целый квадратный корень",
    "prompt": "<p>Функция <code>isqrt(n)</code> (<code>n ≥ 0</code>) — наибольшее целое <code>x</code>, для которого <code>x * x ≤ n</code>. Не используя <code>math</code> и <code>** 0.5</code>, выполните binary search на отрезке <code>[0, n]</code>: O(log n).</p>\n<pre><code>isqrt(16) → 4\nisqrt(15) → 3\nisqrt(0)  → 0</code></pre>",
    "hints": [
     "Условие <code>mid * mid ≤ n</code> монотонно: для малых <code>x</code> оно истинно, затем становится ложным.",
     "При поиске наибольшего «истинного» значения <code>mid = (lo + hi + 1) // 2</code> — иначе получится бесконечный цикл."
    ],
    "check": {
     "tests": "\nassert isqrt(16) == 4, 'isqrt(16) должна вернуть 4'\nassert isqrt(15) == 3, 'isqrt(15) должна вернуть 3'\nassert isqrt(0) == 0, 'isqrt(0) должна вернуть 0'\nassert isqrt(1) == 1, 'isqrt(1) должна вернуть 1'\nassert isqrt(2) == 1, 'isqrt(2) должна вернуть 1'\nassert isqrt(10**18) == 10**9, 'isqrt(10^18) = 10^9'\nassert isqrt(10**18 - 1) == 10**9 - 1, 'isqrt(10^18 − 1) = 10^9 − 1'\nfor _n in range(200):\n    _x = isqrt(_n)\n    assert _x * _x <= _n < (_x + 1) * (_x + 1), f'isqrt({_n}) қате: {_x}'\n"
    }
   },
   {
    "title": "Верхняя граница",
    "prompt": "<p><code>upper_bound(a, x)</code>: в отсортированном <code>a</code> найдите наименьший <code>i</code>, для которого <code>a[i] &gt; x</code>; если такого нет — <code>len(a)</code>. Не используя <code>bisect</code>, напишите binary search.</p>\n<pre><code>upper_bound([1, 2, 2, 2, 5], 2) → 4\nupper_bound([1, 2, 2, 2, 5], 0) → 0\nupper_bound([1, 2, 2, 2, 5], 9) → 5</code></pre>",
    "hints": [
     "Похоже на <code>lower_bound</code>, только если условие <code>a[mid] &lt;= x</code> истинно, двигаемся не влево, а вправо.",
     "<code>hi = len(a)</code> — ответ может быть <code>len(a)</code>."
    ],
    "check": {
     "tests": "\nassert upper_bound([1, 2, 2, 2, 5], 2) == 4, 'upper_bound([1, 2, 2, 2, 5], 2) должна вернуть 4'\nassert upper_bound([1, 2, 2, 2, 5], 0) == 0, 'Все значения больше: 0'\nassert upper_bound([1, 2, 2, 2, 5], 9) == 5, 'Все значения меньше: len(a) = 5'\nassert upper_bound([], 3) == 0, 'Пустой список: 0'\nassert upper_bound([4, 4, 4], 4) == 3, 'Все равны: 3'\nimport bisect as _b, random as _random\n_rng = _random.Random(3)\nfor _ in range(100):\n    _a = sorted(_rng.randint(0, 9) for _ in range(_rng.randint(0, 12)))\n    _x = _rng.randint(-1, 10)\n    assert upper_bound(_a, _x) == _b.bisect_right(_a, _x), f'upper_bound({_a}, {_x}) {_b.bisect_right(_a, _x)} болуы керек'\n"
    }
   },
   {
    "title": "Сколько раз встречается значение",
    "prompt": "<p>Баллы на экзамене отсортированы по возрастанию. Функция <code>count_of(a, x)</code> должна за O(log n) вернуть, сколько раз встречается балл <code>x</code>: найдите с помощью binary search первую позицию <code>a[i] ≥ x</code> и первую позицию <code>a[i] &gt; x</code> и возьмите их разность.</p>\n<pre><code>count_of([50, 70, 70, 70, 90], 70) → 3\ncount_of([50, 70, 90], 60)         → 0</code></pre>",
    "hints": [
     "Одна вспомогательная функция может найти обе границы — сравнение через <code>&lt;</code> или <code>&lt;=</code>.",
     "Ответ: <code>upper − lower</code>."
    ],
    "check": {
     "tests": "\nassert count_of([50, 70, 70, 70, 90], 70) == 3, 'count_of(..., 70) должна вернуть 3'\nassert count_of([50, 70, 90], 60) == 0, 'Нет такого значения: 0'\nassert count_of([], 5) == 0, 'Пустой список: 0'\nassert count_of([5, 5, 5], 5) == 3, 'Все равны: 3'\nassert count_of([1, 2, 3], 3) == 1, 'Последний элемент: 1'\nimport time as _time\n_big = [i // 3 for i in range(300000)]\n_t0 = _time.perf_counter()\nfor _q in range(2000):\n    assert count_of(_big, _q * 37) == 3, f'count_of(_big, {_q * 37}) 3 болуы керек'\n_dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'На 2000 запросов ушло {_dt:.2f} с: каждый запрос должен быть O(log n) (без count и цикла)'\n"
    }
   },
   {
    "title": "Поиск в повёрнутом списке",
    "prompt": "<p>Список различных чисел, отсортированный по возрастанию, в неизвестной точке «повёрнут»: <code>[4, 5, 6, 7, 0, 1, 2]</code>. Функция <code>search_rotated(a, x)</code> должна вернуть индекс <code>x</code> или <code>-1</code> за O(log n). На каждом шаге одна из половин <code>mid</code> обязательно отсортирована — проверьте, находится ли <code>x</code> слева.</p>\n<pre><code>search_rotated([4, 5, 6, 7, 0, 1, 2], 0) → 4\nsearch_rotated([4, 5, 6, 7, 0, 1, 2], 3) → -1</code></pre>",
    "hints": [
     "Если <code>a[lo] ≤ a[mid]</code>, левая половина отсортирована; иначе — правая.",
     "Если в отсортированной половине <code>x</code> попадает в диапазон, переходите в неё; иначе — в другую."
    ],
    "check": {
     "tests": "\nassert search_rotated([4, 5, 6, 7, 0, 1, 2], 0) == 4, 'Ожидалось 4'\nassert search_rotated([4, 5, 6, 7, 0, 1, 2], 3) == -1, 'Нет такого значения: -1'\nassert search_rotated([], 1) == -1, 'Пустой список: -1'\nassert search_rotated([1], 1) == 0, 'Один элемент: 0'\nassert search_rotated([3, 1], 1) == 1, 'search_rotated([3, 1], 1) должна вернуть 1'\nimport random as _random, time as _time\n_rng = _random.Random(4)\nfor _ in range(200):\n    _n = _rng.randint(1, 15); _base = sorted(_rng.sample(range(50), _n)); _k = _rng.randint(0, _n - 1)\n    _a = _base[_k:] + _base[:_k]; _x = _rng.randint(-1, 50)\n    _exp = _a.index(_x) if _x in _a else -1\n    assert search_rotated(_a, _x) == _exp, f'search_rotated({_a}, {_x}) {_exp} болуы керек'\n_big = list(range(500000, 1000000)) + list(range(500000))\n_t0 = _time.perf_counter()\nfor _q in range(0, 1000000, 997):\n    assert search_rotated(_big, _q) == (_q - 500000) % 1000000\nassert _time.perf_counter() - _t0 < 1.0, 'Каждый поиск должен быть O(log n)'\n"
    }
   },
   {
    "title": "Минимум повёрнутого списка",
    "prompt": "<p>Отсортированный по возрастанию список различных чисел, который может быть повёрнут (а может и не быть). Функция <code>find_min(a)</code> должна вернуть наименьший элемент за O(log n). Сравните <code>a[mid]</code> с <code>a[hi]</code>. Дан непустой список.</p>\n<pre><code>find_min([3, 4, 5, 1, 2]) → 1\nfind_min([11, 13, 15])    → 11</code></pre>",
    "hints": [
     "Если <code>a[mid] &gt; a[hi]</code>, точка «обрыва» справа: <code>lo = mid + 1</code>.",
     "Иначе минимум — в <code>mid</code> или слева: <code>hi = mid</code>."
    ],
    "check": {
     "tests": "\nassert find_min([3, 4, 5, 1, 2]) == 1, 'find_min([3, 4, 5, 1, 2]) должна вернуть 1'\nassert find_min([11, 13, 15]) == 11, 'Не повёрнутый список: 11'\nassert find_min([7]) == 7, 'Один элемент: 7'\nassert find_min([2, 1]) == 1, 'find_min([2, 1]) должна вернуть 1'\nimport random as _random, time as _time\n_rng = _random.Random(5)\nfor _ in range(200):\n    _n = _rng.randint(1, 15); _base = sorted(_rng.sample(range(-30, 30), _n)); _k = _rng.randint(0, _n - 1)\n    _a = _base[_k:] + _base[:_k]\n    assert find_min(_a) == _base[0], f'find_min({_a}) {_base[0]} болуы керек'\n_big = list(range(300000, 1000000)) + list(range(300000))\n_t0 = _time.perf_counter()\nfor _ in range(3000):\n    find_min(_big)\nassert find_min(_big) == 0 and _time.perf_counter() - _t0 < 1.0, 'Нужно решение за O(log n), а не min(a)'\n"
    }
   },
   {
    "title": "Вершина горы",
    "prompt": "<p>Профиль высот горы: список строго возрастает, затем строго убывает (длина не меньше 3, вершина не на краю). Функция <code>peak_index(h)</code> должна вернуть индекс вершины за O(log n): если <code>h[mid] &lt; h[mid + 1]</code>, вершина справа.</p>\n<pre><code>peak_index([1, 3, 7, 4, 2]) → 2\npeak_index([0, 10, 5])      → 1</code></pre>",
    "hints": [
     "Условие «<code>h[i] &lt; h[i + 1]</code>» истинно до вершины и ложно начиная с неё — ищите эту границу."
    ],
    "check": {
     "tests": "\nassert peak_index([1, 3, 7, 4, 2]) == 2, 'peak_index([1, 3, 7, 4, 2]) должна вернуть 2'\nassert peak_index([0, 10, 5]) == 1, 'peak_index([0, 10, 5]) должна вернуть 1'\nassert peak_index([1, 2, 3, 4, 0]) == 3, 'Вершина близко к концу: 3'\nassert peak_index([5, 9, 8, 7, 6, 1]) == 1, 'Вершина близко к началу: 1'\nimport time as _time\n_big = list(range(400000)) + list(range(399998, -1, -1))\n_t0 = _time.perf_counter()\nfor _ in range(3000):\n    _r = peak_index(_big)\nassert _r == 399999 and _time.perf_counter() - _t0 < 1.0, 'Нужно решение за O(log n)'\n"
    }
   },
   {
    "title": "Скорость сбора яблок",
    "prompt": "<p>В саду стоят деревья, на которых есть яблоки: <code>piles[i]</code>. Работник за час собирает <code>v</code> яблок: за один час он работает только с одним деревом (если на дереве осталось меньше <code>v</code>, остаток часа пропадает). Функция <code>min_speed(piles, h)</code> должна вернуть наименьшую <code>v</code>, при которой все яблоки удаётся собрать за <code>h</code> часов (<code>h ≥ len(piles)</code>). Ищите ответ binary search'ем: время при скорости <code>v</code> — <code>sum(ceil(p / v))</code>.</p>\n<pre><code>min_speed([3, 6, 7, 11], 8)      → 4\nmin_speed([30, 11, 23, 4, 20], 5) → 30\nmin_speed([30, 11, 23, 4, 20], 6) → 23</code></pre>",
    "hints": [
     "С ростом скорости время уменьшается — условие монотонно. Диапазон поиска: <code>[1, max(piles)]</code>.",
     "Округляйте целое деление вверх: <code>(p + v − 1) // v</code>."
    ],
    "check": {
     "tests": "\nassert min_speed([3, 6, 7, 11], 8) == 4, 'Ожидалось 4'\nassert min_speed([30, 11, 23, 4, 20], 5) == 30, 'h = n: самое большое дерево, 30'\nassert min_speed([30, 11, 23, 4, 20], 6) == 23, 'Ожидалось 23'\nassert min_speed([1], 1) == 1, 'Одно яблоко: 1'\nassert min_speed([10], 100) == 1, 'Времени много: наименьшая скорость 1'\nassert min_speed([10**9], 2) == 5 * 10**8, 'Большое число: 5·10^8'\nimport random as _random, time as _time\n_rng = _random.Random(6)\nfor _ in range(30):\n    _p = [_rng.randint(1, 30) for _ in range(_rng.randint(1, 6))]; _h = _rng.randint(len(_p), 40)\n    _exp = next(v for v in range(1, 31) if sum((x + v - 1) // v for x in _p) <= _h)\n    assert min_speed(_p, _h) == _exp, f'min_speed({_p}, {_h}) {_exp} болуы керек'\n_big = [_rng.randint(1, 10**9) for _ in range(20000)]\n_t0 = _time.perf_counter(); min_speed(_big, 10**6); _dt = _time.perf_counter() - _t0\nassert _dt < 2.0, f'{_dt:.2f} с: ищите ответ через binary search'\n"
    }
   },
   {
    "title": "Расстояние между магазинами",
    "prompt": "<p>На улице в точках <code>positions</code> есть свободные места (расположены в беспорядке, все различны). Нужно открыть <code>k</code> магазинов на одной линии, чтобы расстояние между двумя ближайшими магазинами было <b>как можно больше</b>. Функция <code>max_min_gap(positions, k)</code> должна вернуть это наибольшее возможное расстояние (<code>2 ≤ k ≤ len(positions)</code>). Отсортируйте, затем binary search по ответу: «можно ли расставить <code>k</code> магазинов так, чтобы расстояние между ними было не меньше <code>d</code>?» — жадная проверка.</p>\n<pre><code>max_min_gap([1, 2, 8, 4, 9], 3) → 3     # 1, 4, 8 (немесе 1, 4, 9)\nmax_min_gap([5, 1], 2)          → 4</code></pre>",
    "hints": [
     "<code>ok(d)</code>: первый магазин ставим самым левым, а каждый следующий — на первое место, которое находится от предыдущего не ближе <code>d</code>.",
     "Ищем наибольшее истинное <code>d</code>: <code>mid = (lo + hi + 1) // 2</code>."
    ],
    "check": {
     "tests": "\nassert max_min_gap([1, 2, 8, 4, 9], 3) == 3, 'Ожидалось 3'\nassert max_min_gap([5, 1], 2) == 4, 'Два места: 4'\nassert max_min_gap([1, 2, 3, 4], 4) == 1, 'Все места заняты: 1'\nassert max_min_gap([0, 100, 50, 49, 51], 3) == 50, 'Ожидалось 50'\nfrom itertools import combinations as _comb\nimport random as _random\n_rng = _random.Random(7)\nfor _ in range(40):\n    _p = _rng.sample(range(40), _rng.randint(2, 8)); _k = _rng.randint(2, len(_p))\n    _exp = max(min(b - a for a, b in zip(c, c[1:])) for c in _comb(sorted(_p), _k))\n    assert max_min_gap(_p, _k) == _exp, f'max_min_gap({_p}, {_k}) {_exp} болуы керек'\n"
    }
   }
  ]
 },
 "dsa-9": {
  "pr": [
   {
    "title": "Сортировка вставками",
    "prompt": "<p>Функция <code>insertion_sort(a)</code> должна вернуть <b>новый</b> список, отсортированный по возрастанию (исходный список не меняйте). Напишите insertion sort сами: вставляйте каждый элемент в отсортированную левую часть, сдвигая элементы справа налево. Не используйте <code>sorted</code> и <code>.sort</code>.</p>\n<pre><code>insertion_sort([5, 2, 4, 6, 1, 3]) → [1, 2, 3, 4, 5, 6]</code></pre>",
    "hints": [
     "<code>x = b[i]</code>; пока не выполнится <code>b[j] &gt; x</code>, сдвигайте элементы на одно место вправо.",
     "В конце <code>b[j + 1] = x</code>."
    ],
    "check": {
     "tests": "\n_a = [5, 2, 4, 6, 1, 3]\nassert insertion_sort(_a) == [1, 2, 3, 4, 5, 6], 'Ожидалось [1, 2, 3, 4, 5, 6]'\nassert _a == [5, 2, 4, 6, 1, 3], 'Исходный список не меняйте'\nassert insertion_sort([]) == [], 'Пустой список: []'\nassert insertion_sort([1]) == [1], 'Один элемент'\nassert insertion_sort([3, 3, 1, 1]) == [1, 1, 3, 3], 'Повторы: [1, 1, 3, 3]'\nimport random as _random\n_rng = _random.Random(1)\nfor _ in range(30):\n    _x = [_rng.randint(-20, 20) for _ in range(_rng.randint(0, 25))]\n    assert insertion_sort(_x) == sorted(_x), f'{_x} қате сұрыпталды'\n"
    }
   },
   {
    "title": "По баллам и по имени",
    "prompt": "<p>Участники олимпиады — кортежи вида <code>(аты, балл)</code>. Функция <code>rank(students)</code> должна отсортировать их по баллам по <b>убыванию</b>, а при равных баллах — по имени по <b>возрастанию</b>, и вернуть только список имён. Используйте <code>sorted</code> и <code>key</code>.</p>\n<pre><code>rank([('Әсем', 90), ('Берік', 95), ('Арман', 90)]) → ['Берік', 'Арман', 'Әсем']</code></pre>",
    "hints": [
     "Ключ — кортеж: <code>(-балл, аты)</code> — отрицательный балл даёт убывание."
    ],
    "check": {
     "tests": "\nassert rank([('Әсем', 90), ('Берік', 95), ('Арман', 90)]) == ['Берік', 'Арман', 'Әсем'], \"Ожидалось ['Берік', 'Арман', 'Әсем']\"\nassert rank([]) == [], 'Пустой список: []'\nassert rank([('Дана', 50)]) == ['Дана'], 'Один участник'\nassert rank([('в', 1), ('б', 1), ('а', 1)]) == ['а', 'б', 'в'], 'Все баллы равны: по имени'\nassert rank([('а', 1), ('б', 2), ('в', 3)]) == ['в', 'б', 'а'], 'По убыванию баллов'\n"
    }
   },
   {
    "title": "Устойчивая сортировка по длине",
    "prompt": "<p>Функция <code>by_length(words)</code> должна отсортировать слова по длине по возрастанию; слова одинаковой длины должны <b>сохранять исходный порядок</b> (устойчивая сортировка). В Python <code>sorted</code> устойчива.</p>\n<pre><code>by_length(['алма', 'ит', 'қой', 'ат', 'құс']) → ['ит', 'ат', 'қой', 'құс', 'алма']</code></pre>",
    "hints": [
     "<code>key=len</code> достаточно: <code>sorted</code> сохраняет порядок равных ключей."
    ],
    "check": {
     "tests": "\nassert by_length(['алма', 'ит', 'қой', 'ат', 'құс']) == ['ит', 'ат', 'қой', 'құс', 'алма'], \"Ожидалось ['ит', 'ат', 'қой', 'құс', 'алма']\"\nassert by_length([]) == [], 'Пустой список: []'\nassert by_length(['бб', 'аа']) == ['бб', 'аа'], 'Одинаковая длина: исходный порядок сохраняется (а не алфавит)'\nassert by_length(['ccc', 'b', '']) == ['', 'b', 'ccc'], 'Пустое слово первое'\n"
    }
   },
   {
    "title": "Напишите quicksort",
    "prompt": "<p>Функция <code>quick_sort(a)</code> должна вернуть новый список, отсортированный quicksort'ом: в качестве опорного (pivot) возьмите средний элемент, разбейте список на три части (<code>&lt; pivot</code>, <code>== pivot</code>, <code>&gt; pivot</code>) и рекурсией отсортируйте крайние две. Не используйте <code>sorted</code> и <code>.sort</code>. Тест проверит также список с большим количеством одинаковых значений.</p>\n<pre><code>quick_sort([3, 6, 1, 8, 2, 9, 2]) → [1, 2, 2, 3, 6, 8, 9]</code></pre>",
    "hints": [
     "Базовый случай: длина 0 или 1.",
     "Собирая равные элементы в отдельную группу, вы защищаете рекурсию от чрезмерной глубины, когда одинаковых значений много."
    ],
    "check": {
     "tests": "\nassert quick_sort([3, 6, 1, 8, 2, 9, 2]) == [1, 2, 2, 3, 6, 8, 9], 'Ожидалось [1, 2, 2, 3, 6, 8, 9]'\nassert quick_sort([]) == [], 'Пустой список: []'\nassert quick_sort([1]) == [1], 'Один элемент'\n_a = [3, 1, 2]; quick_sort(_a)\nassert _a == [3, 1, 2], 'Исходный список не меняйте'\nassert quick_sort([7] * 5000) == [7] * 5000, '5000 одинаковых значений: глубина рекурсии не должна расти'\nassert quick_sort(list(range(3000, 0, -1))) == list(range(1, 3001)), 'Обратно отсортированный список'\nimport random as _random\n_rng = _random.Random(2)\nfor _ in range(30):\n    _x = [_rng.randint(-9, 9) for _ in range(_rng.randint(0, 30))]\n    assert quick_sort(_x) == sorted(_x), f'{_x} қате сұрыпталды'\n"
    }
   },
   {
    "title": "Сортировка трёх цветов",
    "prompt": "<p>Список цветов светофора — <code>0</code> (красный), <code>1</code> (жёлтый), <code>2</code> (зелёный). Функция <code>sort_colors(a)</code> должна отсортировать его <b>на месте</b> за один проход (метод «голландского флага» Дейкстры): три указателя <code>lo</code>, <code>mid</code>, <code>hi</code>. Не используйте <code>sorted</code>, <code>.sort</code> и подсчёт.</p>\n<pre><code>a = [2, 0, 2, 1, 1, 0]\nsort_colors(a)    # a == [0, 0, 1, 1, 2, 2]</code></pre>",
    "hints": [
     "<code>a[:lo]</code> — нули, <code>a[lo:mid]</code> — единицы, <code>a[hi+1:]</code> — двойки.",
     "Если пришла 2, поменяйте её местами с <code>hi</code>, но <code>mid</code> не сдвигайте: пришедший элемент ещё не проверен."
    ],
    "check": {
     "tests": "\n_a = [2, 0, 2, 1, 1, 0]; sort_colors(_a)\nassert _a == [0, 0, 1, 1, 2, 2], f'Ожидалось [0, 0, 1, 1, 2, 2], получено {_a}'\n_a = []; sort_colors(_a); assert _a == [], 'Бос тізім'\n_a = [1]; sort_colors(_a); assert _a == [1], 'Бір элемент'\n_a = [2, 2, 0]; sort_colors(_a); assert _a == [0, 2, 2], 'Күтілгені [0, 2, 2]'\nimport random as _random\n_rng = _random.Random(3)\nfor _ in range(50):\n    _x = [_rng.randint(0, 2) for _ in range(_rng.randint(0, 20))]; _y = list(_x)\n    sort_colors(_y)\n    assert _y == sorted(_x), f'{_x} қате сұрыпталды: {_y}'\n"
    }
   },
   {
    "title": "k-й наименьший элемент",
    "prompt": "<p>Функция <code>kth_smallest(a, k)</code> должна вернуть <code>k</code>-й по величине наименьший элемент списка (<code>k = 1</code> — минимум; повторы считаются). Quickselect: делите как в quicksort, но рекурсия только в ту часть, где лежит <code>k</code>-й элемент — в среднем O(n). Не используйте <code>sorted</code> и <code>.sort</code>.</p>\n<pre><code>kth_smallest([7, 10, 4, 3, 20, 15], 3) → 7\nkth_smallest([2, 2, 1], 2)             → 2</code></pre>",
    "hints": [
     "После разбиения: <code>k ≤ len(less)</code> — ответ в <code>less</code>; <code>k ≤ len(less) + len(eq)</code> — ответ в <code>p</code>.",
     "Иначе перейдите к <code>more</code> и вычтите <code>len(less) + len(eq)</code> из <code>k</code>."
    ],
    "check": {
     "tests": "\nassert kth_smallest([7, 10, 4, 3, 20, 15], 3) == 7, 'Ожидалось 7'\nassert kth_smallest([2, 2, 1], 2) == 2, 'Повторы считаются: 2'\nassert kth_smallest([5], 1) == 5, 'Один элемент'\nassert kth_smallest([9, 8, 7], 3) == 9, 'k = n: максимум'\nimport random as _random\n_rng = _random.Random(4)\nfor _ in range(60):\n    _x = [_rng.randint(-10, 10) for _ in range(_rng.randint(1, 20))]; _k = _rng.randint(1, len(_x))\n    assert kth_smallest(list(_x), _k) == sorted(_x)[_k - 1], f'kth_smallest({_x}, {_k}) {sorted(_x)[_k - 1]} болуы керек'\n_big = [_rng.randint(0, 10**9) for _ in range(100000)]\nassert kth_smallest(list(_big), 50000) == sorted(_big)[49999], 'Медиана на 100 000 элементах неверна'\n"
    }
   },
   {
    "title": "Сортировка по частоте",
    "prompt": "<p><code>freq_sort(nums)</code>: отсортируйте числа по частоте появления по <b>возрастанию</b>; числа с одинаковой частотой — по значению по <b>убыванию</b>. Каждое число повторяется столько раз, сколько встречалось. Посчитайте словарём, затем <code>sorted</code> + <code>key</code>.</p>\n<pre><code>freq_sort([1, 1, 2, 2, 2, 3]) → [3, 1, 1, 2, 2, 2]\nfreq_sort([2, 3, 1, 3, 2])    → [1, 3, 3, 2, 2]</code></pre>",
    "hints": [
     "Сначала словарь <code>cnt</code>.",
     "Ключ: <code>(cnt[x], -x)</code>."
    ],
    "check": {
     "tests": "\nassert freq_sort([1, 1, 2, 2, 2, 3]) == [3, 1, 1, 2, 2, 2], 'Ожидалось [3, 1, 1, 2, 2, 2]'\nassert freq_sort([2, 3, 1, 3, 2]) == [1, 3, 3, 2, 2], 'При одинаковой частоте сначала большее: [1, 3, 3, 2, 2]'\nassert freq_sort([]) == [], 'Пустой список: []'\nassert freq_sort([-1, 1, -6, 4, 5, -6, 1, 4, 1]) == [5, -1, 4, 4, -6, -6, 1, 1, 1], 'Тест с отрицательными числами неверен'\nassert freq_sort([0, 0, 0]) == [0, 0, 0], 'Одно значение'\n"
    }
   },
   {
    "title": "Ближайшие пары",
    "prompt": "<p>Времена спортсменов (различные целые числа) даны в беспорядке. Функция <code>closest_pairs(times)</code> должна вернуть все пары с наименьшей разностью в виде <code>[a, b]</code> (<code>a &lt; b</code>), отсортированных по <code>a</code> по возрастанию. После сортировки ближайшие пары — соседи: O(n log n).</p>\n<pre><code>closest_pairs([4, 2, 1, 3])       → [[1, 2], [2, 3], [3, 4]]\nclosest_pairs([1, 3, 6, 10, 15])  → [[1, 3]]\nclosest_pairs([5])                → []</code></pre>",
    "hints": [
     "В отсортированном списке наименьшая разность бывает только между соседними элементами.",
     "Если найдена меньшая разность, очистите результат и начните заново."
    ],
    "check": {
     "tests": "\nassert closest_pairs([4, 2, 1, 3]) == [[1, 2], [2, 3], [3, 4]], 'Ожидалось [[1, 2], [2, 3], [3, 4]]'\nassert closest_pairs([1, 3, 6, 10, 15]) == [[1, 3]], 'Ожидалось [[1, 3]]'\nassert closest_pairs([5]) == [], 'Один элемент: []'\nassert closest_pairs([]) == [], 'Пустой список: []'\nassert closest_pairs([3, 8, -10, 23, 19, -4, -14, 27]) == [[-14, -10], [19, 23], [23, 27]], 'Тест с отрицательными числами неверен'\nimport random as _random, time as _time\n_rng = _random.Random(9)\nfor _ in range(30):\n    _x = _rng.sample(range(-50, 50), _rng.randint(2, 10))\n    _d = min(abs(p - q) for i, p in enumerate(_x) for q in _x[i + 1:])\n    _exp = sorted([min(p, q), max(p, q)] for i, p in enumerate(_x) for q in _x[i + 1:] if abs(p - q) == _d)\n    assert closest_pairs(_x) == _exp, f'closest_pairs({_x}) {_exp} болуы керек'\n_big = _rng.sample(range(10**9), 100000)\n_t0 = _time.perf_counter(); closest_pairs(_big); _dt = _time.perf_counter() - _t0\nassert _dt < 1.5, f'{_dt:.2f} с: сортируйте и сравнивайте соседей (O(n log n))'\n"
    }
   }
  ]
 },
 "dsa-10": {
  "pr": [
   {
    "title": "Сумма значений дерева",
    "prompt": "<p>Функция <code>tree_sum(root)</code> должна рекурсией вернуть сумму значений всех узлов дерева. Пустое дерево — 0.</p>\n<pre><code>tree_sum(TreeNode(1, TreeNode(2), TreeNode(3, TreeNode(4)))) → 10\ntree_sum(None)                                              → 0</code></pre>",
    "hints": [
     "Базовый случай: <code>None</code> → 0.",
     "Значение узла + левое поддерево + правое поддерево."
    ],
    "check": {
     "tests": "\nassert tree_sum(TreeNode(1, TreeNode(2), TreeNode(3, TreeNode(4)))) == 10, 'Ожидалось 10'\nassert tree_sum(None) == 0, 'Пустое дерево: 0'\nassert tree_sum(TreeNode(-5)) == -5, 'Один узел: -5'\nassert tree_sum(TreeNode(0, TreeNode(-1), TreeNode(1))) == 0, 'Отрицательные значения: 0'\n"
    }
   },
   {
    "title": "Количество листьев",
    "prompt": "<p>Функция <code>count_leaves(root)</code> должна вернуть количество листьев дерева (узлов без детей). В пустом дереве листьев нет.</p>\n<pre><code>count_leaves(TreeNode(1, TreeNode(2), TreeNode(3, TreeNode(4)))) → 2\ncount_leaves(TreeNode(7))                                       → 1</code></pre>",
    "hints": [
     "Если оба ребёнка равны <code>None</code>, это лист: 1."
    ],
    "check": {
     "tests": "\nassert count_leaves(TreeNode(1, TreeNode(2), TreeNode(3, TreeNode(4)))) == 2, 'Ожидалось 2 (2 и 4)'\nassert count_leaves(TreeNode(7)) == 1, 'Один узел — лист'\nassert count_leaves(None) == 0, 'Пустое дерево: 0'\nassert count_leaves(TreeNode(1, TreeNode(2, TreeNode(3)))) == 1, 'Цепочка в дереве — один лист'\nassert count_leaves(TreeNode(1, None, TreeNode(2))) == 1, 'Только правый ребёнок: 1'\n"
    }
   },
   {
    "title": "Зеркальное дерево",
    "prompt": "<p>Функция <code>mirror(root)</code> должна <b>на месте</b> отзеркалить дерево: в каждом узле поменяйте местами левого и правого детей. Верните корень.</p>\n<pre><code>    4              4\n   / \\            / \\\n  2   7    →     7   2\n / \\                / \\\n1   3              3   1</code></pre>",
    "hints": [
     "<code>root.left, root.right = mirror(root.right), mirror(root.left)</code>."
    ],
    "check": {
     "tests": "\ndef _bst(vals):\n    root = None\n    def ins(n, v):\n        if n is None:\n            return TreeNode(v)\n        if v < n.val: n.left = ins(n.left, v)\n        else: n.right = ins(n.right, v)\n        return n\n    for v in vals:\n        root = ins(root, v)\n    return root\ndef _ino(n):\n    return _ino(n.left) + [n.val] + _ino(n.right) if n else []\n\n_t = TreeNode(4, TreeNode(2, TreeNode(1), TreeNode(3)), TreeNode(7))\n_r = mirror(_t)\nassert _r is _t, 'Верните тот же корень (новое дерево не создавайте)'\nassert _ino(_r) == [7, 4, 3, 2, 1], f'Инверсия дерева должна давать inorder [7, 4, 3, 2, 1], получено {_ino(_r)}'\nassert _r.left.val == 7 and _r.right.left.val == 3, 'Дети не поменяны местами'\nassert mirror(None) is None, 'Пустое дерево: None'\n_one = TreeNode(5); assert mirror(_one) is _one and _one.left is None, 'Бір түйін өзгермейді'\n"
    }
   },
   {
    "title": "Проверка BST",
    "prompt": "<p>Функция <code>is_bst(root)</code>: если дерево — правильное BST, верните <code>True</code>: для каждого узла <b>все</b> значения в левом поддереве строго меньше него, а в правом — строго больше. Проверять только детей недостаточно! Передайте в рекурсию допустимый интервал <code>(lo, hi)</code>.</p>\n<pre><code>is_bst(TreeNode(2, TreeNode(1), TreeNode(3)))                         → True\nis_bst(TreeNode(5, TreeNode(1), TreeNode(7, TreeNode(4), TreeNode(8)))) → False   # 4 &lt; 5</code></pre>",
    "hints": [
     "<code>check(node, lo, hi)</code>: должно быть <code>lo &lt; node.val &lt; hi</code>.",
     "При спуске влево обновляйте <code>hi = node.val</code>, при спуске вправо — <code>lo = node.val</code>."
    ],
    "check": {
     "tests": "\ndef _bst(vals):\n    root = None\n    def ins(n, v):\n        if n is None:\n            return TreeNode(v)\n        if v < n.val: n.left = ins(n.left, v)\n        else: n.right = ins(n.right, v)\n        return n\n    for v in vals:\n        root = ins(root, v)\n    return root\ndef _ino(n):\n    return _ino(n.left) + [n.val] + _ino(n.right) if n else []\n\nassert is_bst(TreeNode(2, TreeNode(1), TreeNode(3))) is True, 'Правильное BST: True'\nassert is_bst(TreeNode(5, TreeNode(1), TreeNode(7, TreeNode(4), TreeNode(8)))) is False, '4 стоит справа от корня, но меньше 5: False'\nassert is_bst(None) is True, 'Пустое дерево: True'\nassert is_bst(TreeNode(1)) is True, 'Один узел: True'\nassert is_bst(TreeNode(2, TreeNode(2))) is False, 'Равное значение не допускается: False'\nassert is_bst(TreeNode(10, TreeNode(5, None, TreeNode(12)), TreeNode(15))) is False, '12 слева от 10: False'\nassert is_bst(_bst([50, 30, 70, 20, 40, 60, 80, 35])) is True, 'BST, построенное вставками: True'\n"
    }
   },
   {
    "title": "Симметричное дерево",
    "prompt": "<p><code>is_symmetric(root)</code>: если дерево равно своему отражению (левое поддерево — зеркальная копия правого), верните <code>True</code>. Напишите вспомогательную функцию, которая сравнивает пары узлов: <code>a.left</code> и <code>b.right</code>, <code>a.right</code> и <code>b.left</code>.</p>\n<pre><code>    1\n   / \\\n  2   2      → True\n / \\ / \\\n3  4 4  3</code></pre>",
    "hints": [
     "<code>mir(a, b)</code>: если оба узла <code>None</code> — <code>True</code>; если только один — <code>False</code>.",
     "Значения должны совпадать, а внешние и внутренние пары должны быть зеркальными."
    ],
    "check": {
     "tests": "\n_t = TreeNode(1, TreeNode(2, TreeNode(3), TreeNode(4)), TreeNode(2, TreeNode(4), TreeNode(3)))\nassert is_symmetric(_t) is True, 'Симметричное дерево: True'\n_t2 = TreeNode(1, TreeNode(2, None, TreeNode(3)), TreeNode(2, None, TreeNode(3)))\nassert is_symmetric(_t2) is False, 'Структура несимметрична: False'\nassert is_symmetric(None) is True, 'Пустое дерево: True'\nassert is_symmetric(TreeNode(1)) is True, 'Один узел: True'\nassert is_symmetric(TreeNode(1, TreeNode(2), TreeNode(3))) is False, 'Значения различны: False'\nassert is_symmetric(TreeNode(1, TreeNode(2))) is False, 'Только левый ребёнок: False'\n"
    }
   },
   {
    "title": "Ближайшее значение в BST",
    "prompt": "<p>Функция <code>closest(root, target)</code> должна вернуть значение из BST, ближайшее к <code>target</code> (если два значения одинаково близки — меньшее). Не нужно обходить всё дерево: используя свойство BST, спускайтесь от корня по одному пути — O(h).</p>\n<pre><code># BST: 4, 2, 5, 1, 3\nclosest(root, 3.7) → 4\nclosest(root, 2.5) → 2</code></pre>",
    "hints": [
     "В каждом узле обновляйте лучший ответ и идите влево, если <code>target &lt; node.val</code>, иначе вправо.",
     "При равной близости выбирайте меньшее."
    ],
    "check": {
     "tests": "\ndef _bst(vals):\n    root = None\n    def ins(n, v):\n        if n is None:\n            return TreeNode(v)\n        if v < n.val: n.left = ins(n.left, v)\n        else: n.right = ins(n.right, v)\n        return n\n    for v in vals:\n        root = ins(root, v)\n    return root\ndef _ino(n):\n    return _ino(n.left) + [n.val] + _ino(n.right) if n else []\n\n_r = _bst([4, 2, 5, 1, 3])\nassert closest(_r, 3.7) == 4, 'closest(..., 3.7) должна вернуть 4'\nassert closest(_r, 2.5) == 2, 'Равно близкие (2 и 3): меньшее — 2'\nassert closest(_r, 100) == 5, 'Больше всех: 5'\nassert closest(_r, -7) == 1, 'Меньше всех: 1'\nassert closest(_r, 3) == 3, 'Точное значение: 3'\nassert closest(TreeNode(10), 0) == 10, 'Один узел'\nimport random as _random\n_rng = _random.Random(10)\nfor _ in range(40):\n    _v = _rng.sample(range(0, 60, 2), _rng.randint(1, 12)); _root = _bst(_v); _q = _rng.uniform(-5, 65)\n    _exp = min(_v, key=lambda x: (abs(x - _q), x))\n    assert closest(_root, _q) == _exp, f'{_v} ағашында {_q:.2f}-ге ең жақыны {_exp}'\n"
    }
   },
   {
    "title": "Общий предок в BST",
    "prompt": "<p>Функция <code>lca(root, p, q)</code> должна вернуть <b>значение</b> наименьшего общего предка узлов со значениями <code>p</code> и <code>q</code> в BST (сам узел считается своим предком). Оба значения есть в дереве. Свойство BST: если оба меньше — влево, если оба больше — вправо, иначе этот узел — ответ. O(h).</p>\n<pre><code># BST: 6, 2, 8, 0, 4, 7, 9, 3, 5\nlca(root, 2, 8) → 6\nlca(root, 2, 4) → 2\nlca(root, 3, 5) → 4</code></pre>",
    "hints": [
     "Первый узел, где пути расходятся, — общий предок.",
     "Цикла достаточно: рекурсия не обязательна."
    ],
    "check": {
     "tests": "\ndef _bst(vals):\n    root = None\n    def ins(n, v):\n        if n is None:\n            return TreeNode(v)\n        if v < n.val: n.left = ins(n.left, v)\n        else: n.right = ins(n.right, v)\n        return n\n    for v in vals:\n        root = ins(root, v)\n    return root\ndef _ino(n):\n    return _ino(n.left) + [n.val] + _ino(n.right) if n else []\n\n_r = _bst([6, 2, 8, 0, 4, 7, 9, 3, 5])\nassert lca(_r, 2, 8) == 6, 'lca(2, 8) должна вернуть 6'\nassert lca(_r, 2, 4) == 2, 'Узел — предок самого себя: lca(2, 4) должна вернуть 2'\nassert lca(_r, 3, 5) == 4, 'lca(3, 5) должна вернуть 4'\nassert lca(_r, 5, 3) == 4, 'Порядок не важен: lca(5, 3) должна вернуть 4'\nassert lca(_r, 7, 7) == 7, 'Одно значение: 7'\nassert lca(_r, 0, 9) == 6, 'lca(0, 9) должна вернуть 6'\nimport random as _random\n_rng = _random.Random(11)\ndef _path(n, v):\n    out = []\n    while n:\n        out.append(n.val)\n        if v == n.val: break\n        n = n.left if v < n.val else n.right\n    return out\nfor _ in range(40):\n    _v = _rng.sample(range(100), _rng.randint(1, 15)); _root = _bst(_v)\n    _p, _q = _rng.choice(_v), _rng.choice(_v)\n    _a, _b = _path(_root, _p), _path(_root, _q)\n    _exp = [x for x, y in zip(_a, _b) if x == y][-1]\n    assert lca(_root, _p, _q) == _exp, f'{_v} BST-де lca({_p}, {_q}) {_exp} болуы керек'\n"
    }
   },
   {
    "title": "Диаметр дерева",
    "prompt": "<p>Функция <code>diameter(root)</code> должна вернуть количество <b>рёбер</b> в самом длинном пути между любыми двумя узлами дерева (путь может не проходить через корень). Пустое дерево и одиночный узел — 0. Один рекурсивный обход: каждый узел возвращает свою высоту, а длину пути обновляет через <code>сол биіктік + оң биіктік</code> — O(n).</p>\n<pre><code>        1\n       / \\\n      2   3        → 3   (4 → 2 → 1 → 3 немесе 5 → 2 → 1 → 3)\n     / \\\n    4   5</code></pre>",
    "hints": [
     "Вспомогательная <code>h(n)</code> возвращает высоту (пустое — 0).",
     "В каждом узле <code>l + r</code> — число рёбер самого длинного пути через этот узел; максимум храните в переменной <code>nonlocal</code>."
    ],
    "check": {
     "tests": "\n_t = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3))\nassert diameter(_t) == 3, 'Ожидалось 3'\nassert diameter(None) == 0, 'Пустое дерево: 0'\nassert diameter(TreeNode(1)) == 0, 'Один узел: 0'\nassert diameter(TreeNode(1, TreeNode(2))) == 1, 'Два узла: 1'\n_deep = TreeNode(1, TreeNode(2, TreeNode(3, TreeNode(4), None), TreeNode(5, None, TreeNode(6, None, TreeNode(7)))), TreeNode(8))\nassert diameter(_deep) == 5, 'Самый длинный путь не проходит через корень: 4 → 3 → 2 → 5 → 6 → 7, 5 рёбер'\n"
    }
   }
  ]
 },
 "dsa-11": {
  "pr": [
   {
    "title": "Наименьшие k чисел",
    "prompt": "<p>Функция <code>smallest_k(nums, k)</code> должна вернуть <code>k</code> наименьших чисел в порядке <b>возрастания</b>. Используйте <code>heapq</code> (<code>heapify</code> + <code>k</code> раз <code>heappop</code>, или <code>nsmallest</code>). Если <code>k</code> больше длины списка — верните все элементы.</p>\n<pre><code>smallest_k([5, 1, 9, 3, 7], 2) → [1, 3]\nsmallest_k([4, 2], 5)          → [2, 4]</code></pre>",
    "hints": [
     "<code>heapq.heapify(h)</code> — O(n), каждый <code>heappop</code> — O(log n).",
     "Возьмите <code>min(k, len(h))</code> раз."
    ],
    "check": {
     "tests": "\nassert smallest_k([5, 1, 9, 3, 7], 2) == [1, 3], 'Ожидалось [1, 3]'\nassert smallest_k([4, 2], 5) == [2, 4], 'k > n: все отсортированы'\nassert smallest_k([], 3) == [], 'Пустой список: []'\nassert smallest_k([3, 1, 2], 0) == [], 'k = 0: []'\nassert smallest_k([2, 2, 1], 2) == [1, 2], 'Повторы: [1, 2]'\n_a = [3, 1, 2]; smallest_k(_a, 2)\nassert _a == [3, 1, 2], 'Исходный список не меняйте'\n"
    }
   },
   {
    "title": "Столкновение камней",
    "prompt": "<p>На каждом шаге сталкиваем два самых тяжёлых камня (<code>x ≤ y</code>): если они равны, оба уничтожаются, иначе остаётся камень весом <code>y − x</code>. Функция <code>last_stone(stones)</code> должна вернуть вес последнего оставшегося камня (если камней не осталось — 0). <code>heapq</code> — min-heap, поэтому храните веса с минусом.</p>\n<pre><code>last_stone([2, 7, 4, 1, 8, 1]) → 1\nlast_stone([3, 3])             → 0</code></pre>",
    "hints": [
     "Max-heap: <code>h = [-s for s in stones]</code>.",
     "Возьмите два камня; если разность не ноль, снова положите <code>-(y − x)</code> в кучу."
    ],
    "check": {
     "tests": "\nassert last_stone([2, 7, 4, 1, 8, 1]) == 1, 'Ожидалось 1'\nassert last_stone([3, 3]) == 0, 'Равные камни уничтожаются: 0'\nassert last_stone([5]) == 5, 'Один камень: 5'\nassert last_stone([]) == 0, 'Камней нет: 0'\nassert last_stone([10, 4, 2, 10]) == 2, 'Ожидалось 2'\n"
    }
   },
   {
    "title": "k-й наибольший",
    "prompt": "<p>Функция <code>kth_largest(nums, k)</code> должна вернуть <code>k</code>-й по величине наибольший элемент (повторы считаются). Держите min-heap размера <code>k</code>: его вершина — ответ. O(n log k). Не используйте <code>sorted</code>.</p>\n<pre><code>kth_largest([3, 2, 1, 5, 6, 4], 2) → 5\nkth_largest([3, 3, 3, 1], 3)       → 3</code></pre>",
    "hints": [
     "Добавляйте каждый элемент; если куча стала больше <code>k</code>, извлеките наименьший через <code>heappop</code>.",
     "В конце <code>h[0]</code>."
    ],
    "check": {
     "tests": "\nassert kth_largest([3, 2, 1, 5, 6, 4], 2) == 5, 'Ожидалось 5'\nassert kth_largest([3, 3, 3, 1], 3) == 3, 'Повторы считаются: 3'\nassert kth_largest([7], 1) == 7, 'Один элемент'\nassert kth_largest([1, 2, 3], 3) == 1, 'k = n: минимум'\nassert kth_largest([-1, -5, -3], 1) == -1, 'Отрицательные числа: -1'\nimport random as _random\n_rng = _random.Random(1)\n_big = [_rng.randint(0, 10**6) for _ in range(50000)]\nassert kth_largest(_big, 100) == sorted(_big)[-100], 'Неверно на большом тесте'\n"
    }
   },
   {
    "title": "Самые частые k слов",
    "prompt": "<p>Функция <code>top_words(words, k)</code> должна вернуть <code>k</code> самых частых слов: по убыванию частоты, при равной частоте — по слову по возрастанию (строки сравниваются через <code>&lt;</code>). Посчитайте словарём, затем возьмите <code>k</code> элементов через <code>heapq</code> по <code>(-жиілік, сөз)</code>.</p>\n<pre><code>top_words(['ит', 'мысық', 'ит', 'ат', 'мысық', 'ит'], 2) → ['ит', 'мысық']\ntop_words(['б', 'а', 'в'], 2)                         → ['а', 'б']</code></pre>",
    "hints": [
     "Элемент кучи — <code>(-жиілік, сөз)</code>: кортежи сравниваются сначала по частоте, затем по слову."
    ],
    "check": {
     "tests": "\nassert top_words(['ит', 'мысық', 'ит', 'ат', 'мысық', 'ит'], 2) == ['ит', 'мысық'], \"Ожидалось ['ит', 'мысық']\"\nassert top_words(['б', 'а', 'в'], 2) == ['а', 'б'], \"Равная частота: ['а', 'б']\"\nassert top_words([], 3) == [], 'Пустой список: []'\nassert top_words(['x', 'y'], 5) == ['x', 'y'], 'k больше количества слов: все'\nassert top_words(['day', 'is', 'the', 'day', 'the', 'is', 'sunny', 'the', 'is', 'the'], 4) == ['the', 'is', 'day', 'sunny'], 'Ожидалось the, is, day, sunny'\n"
    }
   },
   {
    "title": "Объединение верёвок",
    "prompt": "<p>Верёвки с длинами <code>ropes</code> нужно объединить в одну. Стоимость объединения двух верёвок — сумма их длин. Функция <code>min_cost(ropes)</code> должна вернуть наименьшую общую стоимость. Greedy + heap: на каждом шаге объединяйте две самые короткие верёвки. Одна или ноль верёвок — 0.</p>\n<pre><code>min_cost([4, 3, 2, 6]) → 29    # 2+3=5, 4+5=9, 6+9=15; 5+9+15=29\nmin_cost([5])          → 0</code></pre>",
    "hints": [
     "Извлеките два самых коротких через <code>heappop</code>, добавьте их сумму к стоимости и снова положите через <code>heappush</code>."
    ],
    "check": {
     "tests": "\nassert min_cost([4, 3, 2, 6]) == 29, 'Ожидалось 29'\nassert min_cost([5]) == 0, 'Одна верёвка: 0'\nassert min_cost([]) == 0, 'Верёвок нет: 0'\nassert min_cost([1, 1]) == 2, 'Две верёвки: 2'\nassert min_cost([1, 2, 3, 4, 5]) == 33, 'Ожидалось 33'\nimport time as _time\n_t0 = _time.perf_counter(); _r = min_cost([1] * 50000); _dt = _time.perf_counter() - _t0\nassert _dt < 1.5, f'{_dt:.2f} с: нужно решение через heap за O(n log n)'\n"
    }
   },
   {
    "title": "k ближайших точек",
    "prompt": "<p>Центр города — <code>(0, 0)</code>. Функция <code>closest_points(points, k)</code> должна вернуть <code>k</code> ближайших к центру точек (по евклидову расстоянию): по возрастанию расстояния, при равенстве — по кортежу точки по возрастанию. Не нужно извлекать корень: сравнивайте <code>x² + y²</code>. Используйте <code>heapq</code>.</p>\n<pre><code>closest_points([(1, 3), (-2, 2), (5, 0)], 1) → [(-2, 2)]\nclosest_points([(3, 3), (5, -1), (-2, 4)], 2) → [(3, 3), (-2, 4)]</code></pre>",
    "hints": [
     "Кортеж <code>(x² + y², (x, y))</code> сразу даёт правильный порядок.",
     "<code>heapq.nsmallest(k, ...)</code> — O(n log k)."
    ],
    "check": {
     "tests": "\nassert closest_points([(1, 3), (-2, 2), (5, 0)], 1) == [(-2, 2)], 'Ожидалось [(-2, 2)]'\nassert closest_points([(3, 3), (5, -1), (-2, 4)], 2) == [(3, 3), (-2, 4)], 'Ожидалось [(3, 3), (-2, 4)]'\nassert closest_points([], 2) == [], 'Нет точек: []'\nassert closest_points([(1, 0), (0, 1), (-1, 0)], 2) == [(-1, 0), (0, 1)], 'Равное расстояние: по кортежу по возрастанию'\nassert closest_points([(2, 2)], 5) == [(2, 2)], 'k больше числа точек: все'\n"
    }
   },
   {
    "title": "Текущая медиана",
    "prompt": "<p>Метеостанция передаёт температуру по одной. Класс <code>MedianFinder</code>: <code>add(x)</code> добавляет число, <code>median()</code> возвращает медиану чисел на текущий момент (если чисел чётное количество — среднее двух центральных, <code>float</code>). Используйте две кучи: для меньшей половины — max-heap (с минусом), для большей — min-heap; выравнивайте их размеры. Каждая операция O(log n). Если чисел нет, <code>median()</code> — <code>None</code>.</p>\n<pre><code>m = MedianFinder()\nm.add(5); m.median() → 5\nm.add(-3); m.median() → 1.0\nm.add(10); m.median() → 5</code></pre>",
    "hints": [
     "Положите новое число в <code>lo</code>, наибольший из <code>lo</code> перенесите в <code>hi</code>; если <code>hi</code> стала больше, верните один элемент обратно.",
     "При нечётном количестве медиана — <code>-lo[0]</code>, при чётном — <code>(-lo[0] + hi[0]) / 2</code>."
    ],
    "check": {
     "tests": "\n_m = MedianFinder()\nassert _m.median() is None, 'Чисел нет: None'\n_m.add(5); assert _m.median() == 5, 'Бір сан: 5'\n_m.add(-3); assert _m.median() == 1.0, '5 және -3: 1.0'\n_m.add(10); assert _m.median() == 5, '-3, 5, 10: 5'\n_m.add(7); assert _m.median() == 6.0, '-3, 5, 7, 10: 6.0'\nimport random as _random, time as _time\n_rng = _random.Random(2)\n_m2 = MedianFinder(); _seen = []\nfor _ in range(200):\n    _x = _rng.randint(-50, 50); _m2.add(_x); _seen.append(_x)\n    _s = sorted(_seen); _n = len(_s)\n    _exp = _s[_n // 2] if _n % 2 else (_s[_n // 2 - 1] + _s[_n // 2]) / 2\n    assert _m2.median() == _exp, f'{len(_seen)} сан қосылғанда медиана {_exp} болуы керек'\n_m3 = MedianFinder(); _t0 = _time.perf_counter()\nfor _i in range(30000):\n    _m3.add(_rng.randint(0, 10**6)); _m3.median()\nassert _time.perf_counter() - _t0 < 2.0, 'Каждая операция должна быть O(log n) (не сортируйте каждый раз)'\n"
    }
   },
   {
    "title": "Соседние буквы разные",
    "prompt": "<p>Функция <code>rearrange(s)</code> должна переставить буквы строки так, чтобы никакие две соседние не были одинаковыми. Если это невозможно, верните <code>''</code>. Подойдёт любой правильный ответ. Greedy + max-heap: на каждом шаге берите самую частую оставшуюся букву, но букву предыдущего шага возвращайте в heap только через один шаг.</p>\n<pre><code>rearrange('aab')  → 'aba'\nrearrange('aaab') → ''</code></pre>",
    "hints": [
     "Куча: <code>(-саны, әріп)</code>.",
     "Не возвращайте взятую букву сразу: держите её в <code>prev</code> и верните только после того, как возьмёте следующую букву; если в конце останется <code>prev</code> — это невозможно."
    ],
    "check": {
     "tests": "\ndef _valid(src, out):\n    return sorted(src) == sorted(out) and all(a != b for a, b in zip(out, out[1:]))\nassert _valid('aab', rearrange('aab')), \"rearrange('aab') должна вернуть 'aba'\"\nassert rearrange('aaab') == '', \"Невозможно: ''\"\nassert rearrange('') == '', \"Пустая строка: ''\"\nassert rearrange('z') == 'z', 'Один символ'\nassert rearrange('aa') == '', \"rearrange('aa') должна вернуть ''\"\nimport random as _random\n_rng = _random.Random(3)\nfor _ in range(60):\n    _s = ''.join(_rng.choice('ққаб') for _ in range(_rng.randint(1, 12)))\n    _mx = max(_s.count(c) for c in set(_s))\n    _r = rearrange(_s)\n    if _mx > (len(_s) + 1) // 2:\n        assert _r == '', f'{_s!r} үшін мүмкін емес: \\'\\' күтілді'\n    else:\n        assert _valid(_s, _r), f'{_s!r} үшін дұрыс орналастыру табылмады: {_r!r}'\n"
    }
   }
  ]
 },
 "dsa-12": {
  "pr": [
   {
    "title": "Город с наибольшим числом дорог",
    "prompt": "<p><code>roads</code> — список двусторонних дорог между городами: <code>(a, b)</code>. Функция <code>busiest_city(roads)</code> должна вернуть город, к которому подведено больше всего дорог (степень вершины наибольшая); при равенстве — тот, чьё название меньше по алфавиту (<code>&lt;</code>). Если дорог нет — <code>None</code>.</p>\n<pre><code>busiest_city([('Алматы', 'Қонаев'), ('Алматы', 'Талдықорған'), ('Қонаев', 'Талдықорған'), ('Астана', 'Қарағанды')])\n→ 'Алматы'</code></pre>",
    "hints": [
     "Каждая дорога увеличивает степень обоих городов на 1.",
     "При равной степени выбирайте город с меньшим названием."
    ],
    "check": {
     "tests": "\n_r = [('Алматы', 'Қонаев'), ('Алматы', 'Талдықорған'), ('Қонаев', 'Талдықорған'), ('Астана', 'Қарағанды')]\nassert busiest_city(_r) == 'Алматы', \"Алматы, Қонаев, Талдықорған: степень 2, наименьшее название — 'Алматы'\"\nassert busiest_city([]) is None, 'Дорог нет: None'\nassert busiest_city([('Б', 'А')]) == 'А', \"Равная степень: 'А'\"\nassert busiest_city([('Орал', 'Атырау'), ('Ақтөбе', 'Атырау'), ('Ақтау', 'Атырау')]) == 'Атырау', \"'Атырау' со степенью 3\"\n"
    }
   },
   {
    "title": "Есть ли путь",
    "prompt": "<p>Даны <code>n</code> остановок (<code>0..n−1</code>) и двусторонние дороги <code>edges</code>. Функция <code>has_path(n, edges, s, t)</code>: если из <code>s</code> можно добраться до <code>t</code>, верните <code>True</code>. Используйте BFS или DFS (не забудьте <code>visited</code>).</p>\n<pre><code>has_path(4, [(0, 1), (1, 2)], 0, 2) → True\nhas_path(4, [(0, 1), (1, 2)], 0, 3) → False</code></pre>",
    "hints": [
     "Постройте список соседей (для обоих направлений).",
     "Если во время BFS вы дошли до <code>t</code>, верните <code>True</code>."
    ],
    "check": {
     "tests": "\nassert has_path(4, [(0, 1), (1, 2)], 0, 2) is True, '0 → 1 → 2: True'\nassert has_path(4, [(0, 1), (1, 2)], 0, 3) is False, '3 изолирован: False'\nassert has_path(1, [], 0, 0) is True, 's = t: True'\nassert has_path(3, [(0, 1), (1, 0), (1, 2)], 2, 0) is True, 'Двусторонняя: 2 → 1 → 0'\n_n = 100000; _e = [(i, i + 1) for i in range(_n - 1)]\nassert has_path(_n, _e, 0, _n - 1) is True, 'Цепочка из 100 000 вершин: True (без рекурсии, используйте стек или очередь)'\n"
    }
   },
   {
    "title": "Вершины на расстоянии ровно k",
    "prompt": "<p>Социальная сеть: <code>adj</code> — словарь «человек → список друзей» (двусторонний). Функция <code>at_distance(adj, start, k)</code> должна вернуть отсортированный список людей, чьё кратчайшее расстояние от <code>start</code> в точности равно <code>k</code>. BFS.</p>\n<pre><code>adj = {'Ата': ['Бек', 'Сая'], 'Бек': ['Ата', 'Дос'], 'Сая': ['Ата', 'Дос'], 'Дос': ['Бек', 'Сая', 'Ерж'], 'Ерж': ['Дос']}\nat_distance(adj, 'Ата', 2) → ['Дос']\nat_distance(adj, 'Ата', 0) → ['Ата']</code></pre>",
    "hints": [
     "<code>bfs_dist</code> из урока: словарь <code>dist</code>.",
     "Результат — вершины с расстоянием <code>dist[v] == k</code>, отсортированные."
    ],
    "check": {
     "tests": "\n_adj = {'Ата': ['Бек', 'Сая'], 'Бек': ['Ата', 'Дос'], 'Сая': ['Ата', 'Дос'], 'Дос': ['Бек', 'Сая', 'Ерж'], 'Ерж': ['Дос']}\nassert at_distance(_adj, 'Ата', 2) == ['Дос'], \"Друг — 2 шага (обоими путями): ['Дос']\"\nassert at_distance(_adj, 'Ата', 0) == ['Ата'], \"k = 0: ['Ата']\"\nassert at_distance(_adj, 'Ата', 1) == ['Бек', 'Сая'], \"k = 1: ['Бек', 'Сая']\"\nassert at_distance(_adj, 'Ата', 3) == ['Ерж'], \"k = 3: ['Ерж']\"\nassert at_distance(_adj, 'Ата', 9) == [], 'Такого далёкого человека нет: []'\nassert at_distance({'Жан': []}, 'Жан', 1) == [], 'Человек без друзей: []'\n"
    }
   },
   {
    "title": "Разделение на две группы",
    "prompt": "<p>В футбольном турнире <code>n</code> команд (<code>0..n−1</code>), <code>edges</code> — пары команд, которые играют друг с другом. Нужно разделить все команды на две лиги так, чтобы каждая игра была между командами <b>из разных</b> лиг. Функция <code>can_split(n, edges)</code> должна вернуть <code>True</code>, если это возможно (граф двудольный). Раскрасьте каждую компоненту BFS-ом в цвета 0 и 1; если у соседа тот же цвет — <code>False</code>.</p>\n<pre><code>can_split(4, [(0, 1), (1, 2), (2, 3), (3, 0)]) → True\ncan_split(3, [(0, 1), (1, 2), (2, 0)])         → False</code></pre>",
    "hints": [
     "<code>color = [-1] * n</code>; из каждой ещё не окрашенной вершины запускайте новый BFS (граф может быть несвязным).",
     "Соседу назначайте <code>1 − color[u]</code>; если уже окрашенный сосед имеет тот же цвет — конфликт."
    ],
    "check": {
     "tests": "\nassert can_split(4, [(0, 1), (1, 2), (2, 3), (3, 0)]) is True, 'Чётный цикл: True'\nassert can_split(3, [(0, 1), (1, 2), (2, 0)]) is False, 'Нечётный цикл: False'\nassert can_split(1, []) is True, 'Одна команда: True'\nassert can_split(5, [(0, 1), (2, 3), (3, 4), (4, 2)]) is False, 'Во второй компоненте нечётный цикл: False'\nassert can_split(2, [(0, 0)]) is False, 'Игра с самим собой: False'\nassert can_split(6, [(0, 1), (2, 3), (4, 5)]) is True, 'Несколько компонент: True'\n"
    }
   },
   {
    "title": "Цикл в ориентированном графе",
    "prompt": "<p>Между задачами есть зависимости: <code>(a, b)</code> — ребро «из <code>a</code> в <code>b</code>». Функция <code>has_cycle(n, edges)</code> должна вернуть <code>True</code>, если в ориентированном графе есть цикл. Используйте DFS с тремя цветами: 0 — не посещена, 1 — сейчас в стеке (на пути), 2 — полностью обработана. Если вернулись к вершине цвета 1 — цикл. Остерегайтесь глубокой рекурсии: <code>n</code> до 10 000.</p>\n<pre><code>has_cycle(3, [(0, 1), (1, 2), (2, 0)]) → True\nhas_cycle(3, [(0, 1), (0, 2), (1, 2)]) → False</code></pre>",
    "hints": [
     "В отличие от неориентированного графа, приход в уже завершённую вершину (цвета 2) — не цикл.",
     "DFS без рекурсии: в стеке храните пары <code>(төбе, келесі көршінің индексі)</code>."
    ],
    "check": {
     "tests": "\nassert has_cycle(3, [(0, 1), (1, 2), (2, 0)]) is True, '0 → 1 → 2 → 0: True'\nassert has_cycle(3, [(0, 1), (0, 2), (1, 2)]) is False, 'Ромб, цикла нет: False'\nassert has_cycle(1, [(0, 0)]) is True, 'Ребро в себя: True'\nassert has_cycle(4, []) is False, 'Рёбер нет: False'\nassert has_cycle(4, [(0, 1), (2, 3), (3, 2)]) is True, 'Цикл во второй компоненте: True'\nassert has_cycle(2, [(0, 1), (0, 1)]) is False, 'Повторное ребро не является циклом'\n_n = 10000; _e = [(i, i + 1) for i in range(_n - 1)]\nassert has_cycle(_n, _e) is False, 'Цепочка из 10 000 вершин: False (не выходите за предел рекурсии)'\nassert has_cycle(_n, _e + [(_n - 1, 0)]) is True, 'Если конец цепочки соединить с началом: True'\n"
    }
   },
   {
    "title": "Это дерево?",
    "prompt": "<p>Есть <code>n</code> посёлков и <code>edges</code> двусторонних дорог. Является ли дорожная сеть <b>деревом</b>: все посёлки связаны и цикла нет? Верните <code>is_tree(n, edges)</code>. Подсказка: в дереве ровно <code>n − 1</code> рёбер; если их число верно, достаточно проверить связность через BFS.</p>\n<pre><code>is_tree(5, [(0, 1), (0, 2), (0, 3), (1, 4)]) → True\nis_tree(5, [(0, 1), (1, 2), (2, 3), (1, 3), (1, 4)]) → False</code></pre>",
    "hints": [
     "Сначала <code>len(edges) == n − 1</code>.",
     "BFS из вершины 0: если достигли всех <code>n</code> вершин — дерево."
    ],
    "check": {
     "tests": "\nassert is_tree(5, [(0, 1), (0, 2), (0, 3), (1, 4)]) is True, 'Дерево: True'\nassert is_tree(5, [(0, 1), (1, 2), (2, 3), (1, 3), (1, 4)]) is False, 'Есть цикл: False'\nassert is_tree(1, []) is True, 'Один посёлок: True'\nassert is_tree(2, []) is False, 'Не связан: False'\nassert is_tree(4, [(0, 1), (1, 0), (2, 3)]) is False, 'n − 1 рёбер, но не связан: False'\nassert is_tree(3, [(0, 1), (1, 2), (0, 2)]) is False, 'Рёбер слишком много: False'\n"
    }
   },
   {
    "title": "Лестница из слов",
    "prompt": "<p>Из слова <code>begin</code> в слово <code>end</code> переходим, меняя за каждый шаг одну букву; каждое промежуточное слово должно быть в словаре <code>words</code> (<code>begin</code> может не быть в словаре). Функция <code>ladder_length(begin, end, words)</code> должна вернуть количество слов в цепочке (включая оба конца) или 0, если путь невозможен. BFS: чтобы найти соседей, ставьте на каждую позицию каждую букву и проверяйте, есть ли результат в <code>set</code>.</p>\n<pre><code>ladder_length('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']) → 5\n# hit → hot → dot → dog → cog\nladder_length('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log'])        → 0</code></pre>",
    "hints": [
     "Каждое слово — вершина, слова, отличающиеся одной буквой, — соседи.",
     "В качестве набора букв берите буквы из словаря: тогда кириллица тоже сработает."
    ],
    "check": {
     "tests": "\nassert ladder_length('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']) == 5, 'Ожидалось 5'\nassert ladder_length('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log']) == 0, 'end нет в словаре: 0'\nassert ladder_length('қар', 'тар', ['тар']) == 2, \"қар → тар: 2\"\nassert ladder_length('ат', 'ит', ['ақ', 'ик']) == 0, 'Пути нет: 0'\nassert ladder_length('ат', 'ит', ['ит', 'ат']) == 2, 'Даже если begin есть в словаре: 2'\nassert ladder_length('кел', 'кел', ['кел']) == 1, 'begin = end: 1'\nassert ladder_length('тау', 'сай', ['тай', 'сау', 'сай']) == 3, 'тау → тай → сай: 3'\n"
    }
   },
   {
    "title": "Ход коня",
    "prompt": "<p>На шахматной доске <code>n × n</code> за какое наименьшее число ходов конь доберётся с клетки <code>start = (r, c)</code> до <code>target</code>? Функция <code>knight_moves(n, start, target)</code> должна вернуть это число; если добраться нельзя — <code>-1</code>. Конь ходит буквой «Г»: 8 направлений <code>(±1, ±2)</code>, <code>(±2, ±1)</code>. Доска — граф, BFS.</p>\n<pre><code>knight_moves(8, (0, 0), (7, 7)) → 6\nknight_moves(8, (0, 0), (0, 0)) → 0\nknight_moves(2, (0, 0), (1, 1)) → -1</code></pre>",
    "hints": [
     "Выпишите восемь ходов как кортежи.",
     "Проверяйте границы доски и заходите в каждую клетку один раз; случай <code>start == target</code> — ответ 0."
    ],
    "check": {
     "tests": "\nassert knight_moves(8, (0, 0), (7, 7)) == 6, 'На доске 8×8 из угла в угол: 6'\nassert knight_moves(8, (0, 0), (0, 0)) == 0, 'Одна клетка: 0'\nassert knight_moves(2, (0, 0), (1, 1)) == -1, 'На доске 2×2 конь не может ходить: -1'\nassert knight_moves(3, (0, 0), (1, 1)) == -1, 'На доске 3×3 добраться до центра нельзя: -1'\nassert knight_moves(8, (0, 0), (1, 2)) == 1, 'Один ход'\nassert knight_moves(8, (0, 0), (1, 1)) == 4, '(0, 0) → (1, 1): 4'\nassert knight_moves(1, (0, 0), (0, 0)) == 0, 'Доска 1×1: 0'\nassert knight_moves(100, (0, 0), (99, 99)) == 66, '100×100: 66'\n"
    }
   }
  ]
 },
 "dsa-13": {
  "pr": [
   {
    "title": "Числа Трибоначчи",
    "prompt": "<p><code>T(0) = 0, T(1) = 1, T(2) = 1</code>, а <code>T(n) = T(n−1) + T(n−2) + T(n−3)</code>. Вычислите <code>trib(n)</code> через DP за O(n) (простая рекурсия экспоненциальна!). <code>n</code> — до 1000.</p>\n<pre><code>trib(4)  → 4\ntrib(25) → 1389537</code></pre>",
    "hints": [
     "Достаточно хранить только последние три значения.",
     "<code>a, b, c = b, c, a + b + c</code>."
    ],
    "check": {
     "tests": "\nassert trib(0) == 0 and trib(1) == 1 and trib(2) == 1, 'Начальные значения: 0, 1, 1'\nassert trib(3) == 2, 'trib(3) должна вернуть 2'\nassert trib(4) == 4, 'trib(4) должна вернуть 4'\nassert trib(25) == 1389537, 'trib(25) должна вернуть 1389537'\n_v = [0, 1, 1]\nfor _ in range(997):\n    _v.append(_v[-1] + _v[-2] + _v[-3])\nassert trib(999) == _v[999], 'trib(999) вычислено неверно'\n"
    }
   },
   {
    "title": "Несмежные дни",
    "prompt": "<p>Прибыль в дни ярмарки — <code>income[i]</code>, но два дня подряд работать нельзя. Функция <code>best_income(income)</code> должна вернуть наибольшую общую прибыль. DP: <code>dp[i] = max(dp[i−1], dp[i−2] + income[i])</code>. Пустой список — 0.</p>\n<pre><code>best_income([2, 7, 9, 3, 1]) → 12    # 2 + 9 + 1\nbest_income([5, 1, 1, 5])    → 10</code></pre>",
    "hints": [
     "Две переменные: «лучший результат до предыдущего дня» и «лучший результат до дня перед ним»."
    ],
    "check": {
     "tests": "\nassert best_income([2, 7, 9, 3, 1]) == 12, 'Ожидалось 12'\nassert best_income([5, 1, 1, 5]) == 10, 'Ожидалось 10 (первый и последний день)'\nassert best_income([]) == 0, 'Пустой список: 0'\nassert best_income([4]) == 4, 'Один день: 4'\nassert best_income([1, 2]) == 2, 'Два дня: 2'\nimport random as _random\nfrom itertools import product as _prod\n_rng = _random.Random(5)\nfor _ in range(30):\n    _a = [_rng.randint(0, 20) for _ in range(_rng.randint(0, 10))]\n    _exp = max(sum(x for x, m in zip(_a, mask) if m) for mask in _prod([0, 1], repeat=len(_a)) if all(not (p and q) for p, q in zip(mask, mask[1:])))\n    assert best_income(_a) == _exp, f'best_income({_a}) {_exp} болуы керек'\n"
    }
   },
   {
    "title": "Стоимость лестницы",
    "prompt": "<p><code>cost[i]</code> — стоимость шага на ступеньку <code>i</code>. Можно начать с 0-й или 1-й ступеньки и на каждом шаге подниматься на 1 или 2 ступеньки. Наименьшая стоимость, чтобы добраться до вершины (места после последней ступеньки): <code>min_climb_cost(cost)</code>. <code>dp[i] = cost[i] + min(dp[i−1], dp[i−2])</code>.</p>\n<pre><code>min_climb_cost([10, 15, 20])                         → 15\nmin_climb_cost([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]) → 6</code></pre>",
    "hints": [
     "На вершину можно выйти с последней или предпоследней ступеньки: ответ <code>min(dp[n−1], dp[n−2])</code>."
    ],
    "check": {
     "tests": "\nassert min_climb_cost([10, 15, 20]) == 15, 'Ожидалось 15'\nassert min_climb_cost([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]) == 6, 'Ожидалось 6'\nassert min_climb_cost([5, 3]) == 3, 'Две ступеньки: 3'\nassert min_climb_cost([0, 0, 0]) == 0, 'Бесплатные ступеньки: 0'\nassert min_climb_cost([7]) == 0, 'Одна ступенька: начинаем с 1-й (вершины), 0'\n"
    }
   },
   {
    "title": "Число способов набрать монетами",
    "prompt": "<p>Функция <code>coin_ways(coins, amount)</code> должна вернуть, сколькими <b>способами</b> можно набрать <code>amount</code> тенге монетами номиналов <code>coins</code> (каждого номинала — сколько угодно). Порядок не важен: <code>1+2</code> и <code>2+1</code> — один способ. DP: внешний цикл — по монетам, внутренний — по суммам.</p>\n<pre><code>coin_ways([1, 2, 5], 5) → 4\ncoin_ways([2], 3)       → 0\ncoin_ways([10], 0)      → 1</code></pre>",
    "hints": [
     "<code>dp[0] = 1</code> — пустой набор.",
     "Если монеты во внешнем цикле, каждый набор считается один раз (порядок не учитывается)."
    ],
    "check": {
     "tests": "\nassert coin_ways([1, 2, 5], 5) == 4, 'Ожидалось 4'\nassert coin_ways([2], 3) == 0, 'Набрать нельзя: 0'\nassert coin_ways([10], 0) == 1, 'amount = 0: один способ (ничего не брать)'\nassert coin_ways([], 0) == 1 and coin_ways([], 5) == 0, 'Монет нет'\nassert coin_ways([1, 2], 4) == 3, '1111, 112, 22: 3'\ndef _ref(cs, a, i=0):\n    if a == 0: return 1\n    if i == len(cs) or a < 0: return 0\n    return _ref(cs, a - cs[i], i) + _ref(cs, a, i + 1)\nfor _c, _a in [([2, 3, 7], 20), ([1, 3, 4], 12), ([5, 10], 30)]:\n    assert coin_ways(_c, _a) == _ref(_c, _a), f'coin_ways({_c}, {_a}) {_ref(_c, _a)} болуы керек'\n"
    }
   },
   {
    "title": "Пути в сетке с препятствиями",
    "prompt": "<p>Карта города: <code>grid[i][j] == 1</code> — дорога закрыта, <code>0</code> — открыта. Курьер идёт из левого верхнего угла в правый нижний, двигаясь только <b>вправо</b> или <b>вниз</b>. Функция <code>count_paths(grid)</code> должна вернуть количество различных путей (если один из углов закрыт — 0). DP: <code>dp[i][j] = dp[i−1][j] + dp[i][j−1]</code>.</p>\n<pre><code>count_paths([[0, 0, 0],\n             [0, 1, 0],\n             [0, 0, 0]]) → 2</code></pre>",
    "hints": [
     "Достаточно одномерного массива <code>dp</code>: <code>dp[j]</code> — из верхней клетки, <code>dp[j−1]</code> — из левой.",
     "В закрытой клетке <code>dp[j] = 0</code>."
    ],
    "check": {
     "tests": "\nassert count_paths([[0, 0, 0], [0, 1, 0], [0, 0, 0]]) == 2, 'Ожидалось 2'\nassert count_paths([[0]]) == 1, 'Одна клетка: 1'\nassert count_paths([[1]]) == 0, 'Начало закрыто: 0'\nassert count_paths([[0, 0], [0, 1]]) == 0, 'Конец закрыт: 0'\nassert count_paths([[0, 1], [1, 0]]) == 0, 'Пути нет: 0'\nassert count_paths([[0] * 5 for _ in range(5)]) == 70, 'Пустая сетка 5×5: C(8, 4) = 70'\nassert count_paths([[0, 0, 0, 0]]) == 1, 'Одна строка: 1'\nassert count_paths([[0] * 18 for _ in range(18)]) == 2333606220, 'Пустая сетка 18×18: C(34, 17)'\n"
    }
   },
   {
    "title": "Наибольшая общая подпоследовательность",
    "prompt": "<p>Функция <code>lcs(a, b)</code> должна вернуть длину наибольшей общей подпоследовательности двух строк (символы в том же порядке, но не обязательно подряд). 2D DP: если <code>a[i] == b[j]</code>, то <code>dp[i+1][j+1] = dp[i][j] + 1</code>, иначе <code>max(dp[i][j+1], dp[i+1][j])</code>. O(n·m).</p>\n<pre><code>lcs('abcde', 'ace') → 3\nlcs('абай', 'абылай') → 4\nlcs('abc', 'def')   → 0</code></pre>",
    "hints": [
     "<code>dp[i][j]</code> — ответ для <code>a[:i]</code> и <code>b[:j]</code>; <code>dp[0][*] = dp[*][0] = 0</code>.",
     "Чтобы сэкономить память, достаточно хранить только предыдущую строку."
    ],
    "check": {
     "tests": "\nassert lcs('abcde', 'ace') == 3, 'Ожидалось 3'\nassert lcs('абай', 'абылай') == 4, 'Ожидалось 4 (а, б, а, й)'\nassert lcs('abc', 'def') == 0, 'Общего символа нет: 0'\nassert lcs('', 'abc') == 0, 'Пустая строка: 0'\nassert lcs('aaa', 'aa') == 2, 'Ожидалось 2'\nimport random as _random, time as _time\n_rng = _random.Random(6)\ndef _ref(a, b):\n    from functools import lru_cache\n    @lru_cache(None)\n    def f(i, j):\n        if i == len(a) or j == len(b): return 0\n        if a[i] == b[j]: return 1 + f(i + 1, j + 1)\n        return max(f(i + 1, j), f(i, j + 1))\n    return f(0, 0)\nfor _ in range(30):\n    _a = ''.join(_rng.choice('абв') for _ in range(_rng.randint(0, 9)))\n    _b = ''.join(_rng.choice('абв') for _ in range(_rng.randint(0, 9)))\n    assert lcs(_a, _b) == _ref(_a, _b), f'lcs({_a!r}, {_b!r}) {_ref(_a, _b)} болуы керек'\n_a = ''.join(_rng.choice('ACGT') for _ in range(600)); _b = ''.join(_rng.choice('ACGT') for _ in range(600))\n_t0 = _time.perf_counter(); lcs(_a, _b); _dt = _time.perf_counter() - _t0\nassert _dt < 3.0, f'Для 600×600 заняло {_dt:.2f} с: нужен DP за O(n·m)'\n"
    }
   },
   {
    "title": "Разбиение на слова",
    "prompt": "<p>Сообщение, записанное без пробелов: <code>s</code>, и словарь <code>words</code>. Функция <code>can_split(s, words)</code>: если <code>s</code> можно полностью разбить на слова из словаря (слова можно использовать повторно), верните <code>True</code>. DP: <code>dp[i]</code> — можно ли разбить префикс длиной <code>s[:i]</code>; <code>dp[i] = True</code>, если найдутся <code>dp[j]</code> и <code>s[j:i]</code>, при которых <code>j</code> есть в словаре. Положите словарь в <code>set</code>.</p>\n<pre><code>can_split('алмаағаш', ['алма', 'ағаш'])         → True\ncan_split('қызылорда', ['қызыл', 'орда', 'қыз']) → True\ncan_split('ақсай', ['ақ', 'сары'])               → False</code></pre>",
    "hints": [
     "<code>dp[0] = True</code> — пустой префикс.",
     "Чтобы ускорить проверку, рассматривайте только длины слов из словаря."
    ],
    "check": {
     "tests": "\nassert can_split('алмаағаш', ['алма', 'ағаш']) is True, \"can_split('алмаағаш', ...) True\"\nassert can_split('қызылорда', ['қызыл', 'орда', 'қыз']) is True, \"can_split('қызылорда', ...) True\"\nassert can_split('ақсай', ['ақ', 'сары']) is False, \"can_split('ақсай', ...) False\"\nassert can_split('', ['а']) is True, 'Пустая строка: True'\nassert can_split('aaaa', ['aa']) is True, 'Слово можно повторять'\nassert can_split('aaa', ['aa']) is False, \"can_split('aaa', ['aa']) False\"\nassert can_split('catsandog', ['cats', 'dog', 'sand', 'and', 'cat']) is False, 'catsandog: False'\nimport time as _time\n_s = 'a' * 400 + 'b'\n_t0 = _time.perf_counter(); _r = can_split(_s, ['a', 'aa', 'aaa', 'aaaa', 'aaaaa']); _dt = _time.perf_counter() - _t0\nassert _r is False and _dt < 1.0, f'Не экспоненциальная рекурсия: нужен DP ({_dt:.2f} с)'\n"
    }
   },
   {
    "title": "Наибольший квадрат",
    "prompt": "<p>Карта поля: <code>'1'</code> — плодородная земля, <code>'0'</code> — каменистая земля (список строк). Функция <code>max_square(grid)</code> должна вернуть <b>площадь</b> наибольшего квадрата, состоящего только из плодородной земли. DP: <code>dp[i][j]</code> — сторона наибольшего квадрата, у которого правый нижний угол в <code>(i, j)</code>; <code>dp[i][j] = 1 + min(жоғарғы, сол, сол-жоғарғы)</code>.</p>\n<pre><code>max_square(['10100',\n            '10111',\n            '11111',\n            '10010']) → 4</code></pre>",
    "hints": [
     "Таблица <code>(R+1) × (C+1)</code> с нулями по краям избавит от проверки границ.",
     "Ответ — квадрат стороны."
    ],
    "check": {
     "tests": "\nassert max_square(['10100', '10111', '11111', '10010']) == 4, 'Ожидалось 4'\nassert max_square(['0']) == 0, 'Плодородной земли нет: 0'\nassert max_square(['1']) == 1, 'Одна клетка: 1'\nassert max_square(['11', '11']) == 4, '2×2 полностью: 4'\nassert max_square(['01', '10']) == 1, 'Диагональ не квадрат: 1'\nassert max_square(['1111', '1111', '1101']) == 4, '3×3 не полностью: 4'\nimport random as _random\n_rng = _random.Random(7)\nfor _ in range(20):\n    _R, _C = _rng.randint(1, 6), _rng.randint(1, 6)\n    _g = [''.join(_rng.choice('1110') for _ in range(_C)) for _ in range(_R)]\n    _best = 0\n    for _i in range(_R):\n        for _j in range(_C):\n            _k = 1\n            while _i + _k <= _R and _j + _k <= _C and all(_g[a][b] == '1' for a in range(_i, _i + _k) for b in range(_j, _j + _k)):\n                _best = max(_best, _k); _k += 1\n    assert max_square(_g) == _best * _best, f'{_g} үшін күтілгені {_best * _best}'\n"
    }
   }
  ]
 },
 "dsa-p1": {
  "pr": [
   {
    "title": "Число без пары",
    "prompt": "<p>Номерки из гардероба возвращались парами, и только один остался без пары. Функция <code>single(nums)</code>: в списке каждое число встречается ровно дважды, и только одно — один раз; верните его. Время O(n), память O(1): операция XOR (<code>^</code>): <code>x ^ x = 0</code>, <code>x ^ 0 = x</code>.</p>\n<pre><code>single([4, 1, 2, 1, 2]) → 4\nsingle([7])             → 7</code></pre>",
    "hints": [
     "Примените XOR ко всем числам: пары взаимно уничтожатся."
    ],
    "check": {
     "tests": "\nassert single([4, 1, 2, 1, 2]) == 4, 'Ожидалось 4'\nassert single([7]) == 7, 'Одно число: 7'\nassert single([-3, 5, 5]) == -3, 'Отрицательное число: -3'\nassert single([0, 9, 9]) == 0, 'Единственное число может быть 0'\n_big = list(range(1, 50001)) * 2 + [123456]\nassert single(_big) == 123456, 'Большой тест: 123456'\n"
    }
   },
   {
    "title": "Индекс равновесия",
    "prompt": "<p>Функция <code>balance_index(nums)</code> должна вернуть наименьший индекс, для которого сумма элементов слева от него равна сумме справа (сам элемент по индексу не входит ни в одну из сторон; сумма пустой левой части — 0). Если такого индекса нет — <code>-1</code>. Prefix sum: O(n).</p>\n<pre><code>balance_index([1, 7, 3, 6, 5, 6]) → 3    # 1+7+3 = 11 = 5+6\nbalance_index([1, 2, 3])          → -1\nbalance_index([2, 1, -1])         → 0</code></pre>",
    "hints": [
     "Если общая сумма <code>total</code> известна, то правая часть = <code>total − left − nums[i]</code>."
    ],
    "check": {
     "tests": "\nassert balance_index([1, 7, 3, 6, 5, 6]) == 3, 'Ожидалось 3'\nassert balance_index([1, 2, 3]) == -1, 'Нет такого: -1'\nassert balance_index([2, 1, -1]) == 0, 'Левая часть пуста (0) = 1 + (-1): 0'\nassert balance_index([]) == -1, 'Пустой список: -1'\nassert balance_index([5]) == 0, 'Один элемент: обе стороны по 0'\nassert balance_index([0, 0, 0]) == 0, 'Наименьший индекс: 0'\nimport time as _time\n_big = [1] * 100001\n_t0 = _time.perf_counter(); _r = balance_index(_big); _dt = _time.perf_counter() - _t0\nassert _r == 50000 and _dt < 1.0, f'Большой тест: 50000, O(n) ({_dt:.2f} с)'\n"
    }
   },
   {
    "title": "Прибавить единицу к числу",
    "prompt": "<p>Большое число задано списком цифр (первая — старший разряд). Функция <code>plus_one(digits)</code> должна вернуть результат прибавления 1 к числу в виде такого же списка. Не переводите число в <code>int</code>: идите с конца и учитывайте перенос.</p>\n<pre><code>plus_one([1, 2, 9]) → [1, 3, 0]\nplus_one([9, 9])    → [1, 0, 0]\nplus_one([0])       → [1]</code></pre>",
    "hints": [
     "Превратите последние девятки в нули и увеличьте на 1 первую цифру, не равную 9.",
     "Если все цифры 9, в начало добавляется 1."
    ],
    "check": {
     "tests": "\nassert plus_one([1, 2, 9]) == [1, 3, 0], 'Ожидалось [1, 3, 0]'\nassert plus_one([9, 9]) == [1, 0, 0], 'Ожидалось [1, 0, 0]'\nassert plus_one([0]) == [1], 'Ожидалось [1]'\nassert plus_one([4, 3, 2, 1]) == [4, 3, 2, 2], 'Ожидалось [4, 3, 2, 2]'\n_d = [1, 9]; plus_one(_d)\nassert _d == [1, 9], 'Исходный список не меняйте'\nassert plus_one([9] * 1000) == [1] + [0] * 1000, '1000 девяток: 1 и 1000 нулей'\n"
    }
   },
   {
    "title": "Период с наибольшей прибылью",
    "prompt": "<p><code>profit[i]</code> — прибыль магазина в день <code>i</code> (отрицательная — убыток). Функция <code>max_period(profit)</code> должна вернуть наибольшую общую прибыль непустого периода из подряд идущих дней. Алгоритм Кадане: O(n) — если текущая сумма отрицательна, начните заново.</p>\n<pre><code>max_period([-2, 1, -3, 4, -1, 2, 1, -5, 4]) → 6     # 4, -1, 2, 1\nmax_period([-3, -1, -2])                    → -1</code></pre>",
    "hints": [
     "<code>cur = max(x, cur + x)</code> — лучший период, заканчивающийся в этот день.",
     "Начальное значение <code>profit[0]</code>: верно, даже если все числа отрицательные."
    ],
    "check": {
     "tests": "\nassert max_period([-2, 1, -3, 4, -1, 2, 1, -5, 4]) == 6, 'Ожидалось 6'\nassert max_period([-3, -1, -2]) == -1, 'Все отрицательные: наименьший убыток -1'\nassert max_period([5]) == 5, 'Один день: 5'\nassert max_period([5, 4, -1, 7, 8]) == 23, 'Все дни: 23'\nimport random as _random, time as _time\n_rng = _random.Random(1)\nfor _ in range(40):\n    _a = [_rng.randint(-10, 10) for _ in range(_rng.randint(1, 12))]\n    _exp = max(sum(_a[i:j]) for i in range(len(_a)) for j in range(i + 1, len(_a) + 1))\n    assert max_period(_a) == _exp, f'max_period({_a}) {_exp} болуы керек'\n_big = [_rng.randint(-100, 100) for _ in range(200000)]\n_t0 = _time.perf_counter(); max_period(_big); _dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'{_dt:.2f} с: нужен O(n) Кадане'\n"
    }
   },
   {
    "title": "Обход по спирали",
    "prompt": "<p>Функция <code>spiral(matrix)</code> должна вернуть элементы матрицы по спирали: верхняя строка слева направо, правый столбец сверху вниз, нижняя строка справа налево, левый столбец снизу вверх, затем внутрь. Матрица может быть прямоугольной; пустая матрица — <code>[]</code>. Четыре границы: <code>top, bottom, left, right</code>.</p>\n<pre><code>spiral([[1, 2, 3],\n        [4, 5, 6],\n        [7, 8, 9]]) → [1, 2, 3, 6, 9, 8, 7, 4, 5]\nspiral([[1, 2, 3, 4]]) → [1, 2, 3, 4]</code></pre>",
    "hints": [
     "После каждого круга сдвигайте четыре границы внутрь.",
     "Чтобы не брать элементы дважды, когда остаётся одна строка или один столбец, проверьте <code>top &lt; bottom</code>, <code>left &lt; right</code>."
    ],
    "check": {
     "tests": "\nassert spiral([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) == [1, 2, 3, 6, 9, 8, 7, 4, 5], 'Ожидалось [1, 2, 3, 6, 9, 8, 7, 4, 5]'\nassert spiral([[1, 2, 3, 4]]) == [1, 2, 3, 4], 'Одна строка'\nassert spiral([[1], [2], [3]]) == [1, 2, 3], 'Один столбец'\nassert spiral([]) == [], 'Пустая матрица: []'\nassert spiral([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]) == [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7], 'Матрица 3×4 неверна'\nassert spiral([[1, 2], [3, 4], [5, 6]]) == [1, 2, 4, 6, 5, 3], 'Матрица 3×2 неверна'\n_m = [[i * 7 + j for j in range(7)] for i in range(5)]\n_r = spiral(_m)\nassert sorted(_r) == list(range(35)) and _r[:8] == [0, 1, 2, 3, 4, 5, 6, 13], 'В матрице 5×7 каждый элемент должен встретиться один раз'\n"
    }
   },
   {
    "title": "Строка треугольника Паскаля",
    "prompt": "<p>Функция <code>pascal_row(n)</code> должна вернуть <code>n</code>-ю строку треугольника Паскаля (отсчёт с 0): каждое число — сумма двух чисел над ним, края равны 1. Храните только одну строку: O(n²) времени, O(n) памяти. Формулу с факториалами не используйте.</p>\n<pre><code>pascal_row(0) → [1]\npascal_row(4) → [1, 4, 6, 4, 1]</code></pre>",
    "hints": [
     "Следующая строка: <code>[1] + [row[i] + row[i+1] ...] + [1]</code>."
    ],
    "check": {
     "tests": "\nassert pascal_row(0) == [1], 'pascal_row(0): [1]'\nassert pascal_row(1) == [1, 1], 'pascal_row(1): [1, 1]'\nassert pascal_row(4) == [1, 4, 6, 4, 1], 'pascal_row(4): [1, 4, 6, 4, 1]'\nfrom math import comb as _comb\nassert pascal_row(30) == [_comb(30, k) for k in range(31)], 'pascal_row(30) вычислено неверно'\nassert sum(pascal_row(60)) == 2 ** 60, 'Сумма строки должна быть 2^n'\n"
    }
   },
   {
    "title": "Отрезки, делящиеся на k",
    "prompt": "<p>Функция <code>count_divisible(nums, k)</code> должна вернуть количество непустых подряд идущих подсписков, сумма которых делится на <code>k</code> (остаток 0). Prefix sum + словарь: если у двух префиксов одинаковые остатки от деления на <code>k</code>, то отрезок между ними делится на <code>k</code>. В Python <code>%</code> даёт неотрицательный остаток и для отрицательного числа. O(n).</p>\n<pre><code>count_divisible([4, 5, 0, -2, -3, 1], 5) → 7\ncount_divisible([5], 9)                  → 0</code></pre>",
    "hints": [
     "<code>seen = {0: 1}</code> — пустой префикс.",
     "На каждом шаге: <code>total += seen.get(s, 0)</code>, затем <code>seen[s] += 1</code>."
    ],
    "check": {
     "tests": "\nassert count_divisible([4, 5, 0, -2, -3, 1], 5) == 7, 'Ожидалось 7'\nassert count_divisible([5], 9) == 0, 'Ожидалось 0'\nassert count_divisible([], 3) == 0, 'Пустой список: 0'\nassert count_divisible([3, 3, 3], 3) == 6, 'Все 6 подсписков делятся'\nassert count_divisible([-1, 1], 2) == 1, 'Отрицательные числа: [-1, 1] с суммой 0'\nimport random as _random, time as _time\n_rng = _random.Random(2)\nfor _ in range(40):\n    _a = [_rng.randint(-10, 10) for _ in range(_rng.randint(0, 12))]; _k = _rng.randint(1, 6)\n    _exp = sum(1 for i in range(len(_a)) for j in range(i + 1, len(_a) + 1) if sum(_a[i:j]) % _k == 0)\n    assert count_divisible(_a, _k) == _exp, f'count_divisible({_a}, {_k}) {_exp} болуы керек'\n_big = [_rng.randint(-1000, 1000) for _ in range(100000)]\n_t0 = _time.perf_counter(); count_divisible(_big, 7); _dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'{_dt:.2f} с: нужен O(n) алгоритм'\n"
    }
   },
   {
    "title": "Период равных голосов",
    "prompt": "<p>На избирательном участке голоса поступали в порядке очереди: за кандидата <code>'А'</code> или <code>'Б'</code>. Функция <code>longest_tie(votes)</code> должна вернуть длину самого длинного непрерывного периода, в котором два кандидата получили <b>равное</b> число голосов. Считайте <code>'А'</code> = +1, <code>'Б'</code> = −1 и храните в словаре, на каком индексе <b>впервые</b> встретилось каждое значение префиксной суммы. O(n).</p>\n<pre><code>longest_tie('ААББА') → 4    # 'ААББ'\nlongest_tie('ААА')   → 0\nlongest_tie('АББААБ') → 6</code></pre>",
    "hints": [
     "<code>first = {0: -1}</code> — пустой префикс на индексе <code>-1</code>.",
     "Если значение префикса встречалось раньше, длина равна <code>i − first[s]</code>; первый индекс не обновляйте."
    ],
    "check": {
     "tests": "\nassert longest_tie('ААББА') == 4, 'Ожидалось 4'\nassert longest_tie('ААА') == 0, 'Равного периода нет: 0'\nassert longest_tie('АББААБ') == 6, 'Весь список: 6'\nassert longest_tie('') == 0, 'Пусто: 0'\nassert longest_tie('АБ') == 2, 'Ожидалось 2'\nimport random as _random, time as _time\n_rng = _random.Random(3)\nfor _ in range(40):\n    _v = ''.join(_rng.choice('АБ') for _ in range(_rng.randint(0, 14)))\n    _exp = max([j - i for i in range(len(_v)) for j in range(i + 1, len(_v) + 1) if _v[i:j].count('А') * 2 == j - i] + [0])\n    assert longest_tie(_v) == _exp, f'longest_tie({_v!r}) {_exp} болуы керек'\n_big = ''.join(_rng.choice('АБ') for _ in range(200000))\n_t0 = _time.perf_counter(); longest_tie(_big); _dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'{_dt:.2f} с: нужно решение за O(n)'\n"
    }
   }
  ]
 },
 "dsa-p2": {
  "pr": [
   {
    "title": "Следующая большая цена",
    "prompt": "<p>Функция <code>next_greater(prices)</code> должна для каждого дня вернуть <b>первую</b> строго большую цену после него; если такой нет — <code>-1</code>. Monotonic stack: храните в стеке индексы, для которых ещё не найден ответ. O(n).</p>\n<pre><code>next_greater([2, 1, 2, 4, 3]) → [4, 2, 4, -1, -1]\nnext_greater([5, 5])          → [-1, -1]</code></pre>",
    "hints": [
     "Если новая цена больше цены на вершине стека, то ответ для этого индекса — именно эта цена.",
     "Равная цена не «больше»: сравнивайте через <code>&lt;</code>."
    ],
    "check": {
     "tests": "\nassert next_greater([2, 1, 2, 4, 3]) == [4, 2, 4, -1, -1], 'Ожидалось [4, 2, 4, -1, -1]'\nassert next_greater([5, 5]) == [-1, -1], 'Равная цена не больше: [-1, -1]'\nassert next_greater([]) == [], 'Пустой список: []'\nassert next_greater([1, 2, 3]) == [2, 3, -1], 'Возрастающие: [2, 3, -1]'\nimport random as _random, time as _time\n_rng = _random.Random(1)\nfor _ in range(40):\n    _a = [_rng.randint(0, 9) for _ in range(_rng.randint(0, 12))]\n    _exp = [next((y for y in _a[i + 1:] if y > x), -1) for i, x in enumerate(_a)]\n    assert next_greater(_a) == _exp, f'next_greater({_a}) {_exp} болуы керек'\n_big = list(range(100000, 0, -1))\n_t0 = _time.perf_counter(); next_greater(_big); _dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'{_dt:.2f} с: нужен O(n) с monotonic stack'\n"
    }
   },
   {
    "title": "Гласные в окне",
    "prompt": "<p>Функция <code>max_vowels(s, k)</code> должна вернуть наибольшее количество гласных букв (<code>'аәеиоөұүыіэюяу'</code> и латинские <code>'aeiou'</code>) в подстроках длиной ровно <code>k</code>. Скользящее окно фиксированного размера: добавьте символ, вошедший в окно, и вычтите вышедший. O(n). Если <code>k &gt; len(s)</code>, то 0.</p>\n<pre><code>max_vowels('қазақстан', 3) → 2\nmax_vowels('abciiidef', 3)  → 3</code></pre>",
    "hints": [
     "Посчитайте количество гласных в первых <code>k</code> символах.",
     "На каждом шаге <code>s[i]</code> входит в окно, <code>s[i − k]</code> выходит."
    ],
    "check": {
     "tests": "\nassert max_vowels('қазақстан', 3) == 2, \"max_vowels('қазақстан', 3) должна вернуть 2\"\nassert max_vowels('abciiidef', 3) == 3, \"max_vowels('abciiidef', 3) должна вернуть 3\"\nassert max_vowels('ттт', 2) == 0, 'Гласных нет: 0'\nassert max_vowels('аб', 5) == 0, 'k > len(s): 0'\nassert max_vowels('ауыл', 4) == 3, 'Всё слово: 3'\nimport time as _time\n_s = 'бт' * 100000 + 'аа'\n_t0 = _time.perf_counter(); _r = max_vowels(_s, 1000); _dt = _time.perf_counter() - _t0\nassert _r == 2 and _dt < 1.0, f'Большой тест: ожидалось 2, нужно окно O(n) ({_dt:.2f} с)'\n"
    }
   },
   {
    "title": "Исходные предметы",
    "prompt": "<p>В университете <code>n</code> предметов, <code>prereq</code> — список из <code>(a, b)</code> пар: «чтобы изучить <code>b</code>, сначала нужно <code>a</code>». Функция <code>starters(n, prereq)</code> должна вернуть в порядке возрастания предметы, которые можно изучать сразу (без предварительных требований, то есть со входящей степенью 0). Это первый шаг алгоритма Kahn.</p>\n<pre><code>starters(4, [(0, 1), (1, 2), (3, 2)]) → [0, 3]\nstarters(2, [])                       → [0, 1]</code></pre>",
    "hints": [
     "<code>indeg[b] += 1</code> для каждого <code>(a, b)</code>."
    ],
    "check": {
     "tests": "\nassert starters(4, [(0, 1), (1, 2), (3, 2)]) == [0, 3], 'Ожидалось [0, 3]'\nassert starters(2, []) == [0, 1], 'Предварительных требований нет: все'\nassert starters(3, [(0, 1), (1, 2), (2, 0)]) == [], 'Цикл: нет предмета, с которого можно начать'\nassert starters(1, []) == [0], 'Один предмет: [0]'\nassert starters(3, [(0, 2), (1, 2), (0, 2)]) == [0, 1], 'Повторённое ребро: [0, 1]'\n"
    }
   },
   {
    "title": "Самый короткий достаточный период",
    "prompt": "<p><code>sales</code> — положительные числа (дневные продажи), <code>target</code> — план. Функция <code>min_days(sales, target)</code> должна вернуть длину самого короткого непрерывного периода, сумма которого не меньше <code>target</code>; если такого нет — 0. Переменное окно: двигайте правую границу, а левую сдвигайте вперёд, пока сумма достаточна. O(n).</p>\n<pre><code>min_days([2, 3, 1, 2, 4, 3], 7) → 2     # [4, 3]\nmin_days([1, 1, 1], 5)          → 0</code></pre>",
    "hints": [
     "Числа положительные: расширение окна увеличивает сумму, сужение уменьшает — поэтому подход с окном верен.",
     "Когда сумма ≥ target, обновите длину и сдвиньте левую границу."
    ],
    "check": {
     "tests": "\nassert min_days([2, 3, 1, 2, 4, 3], 7) == 2, 'Ожидалось 2'\nassert min_days([1, 1, 1], 5) == 0, 'План не выполняется: 0'\nassert min_days([1, 4, 4], 4) == 1, 'Одного дня достаточно: 1'\nassert min_days([], 1) == 0, 'Пустой список: 0'\nassert min_days([1, 2, 3], 6) == 3, 'Все дни: 3'\nimport random as _random, time as _time\n_rng = _random.Random(2)\nfor _ in range(40):\n    _a = [_rng.randint(1, 9) for _ in range(_rng.randint(0, 12))]; _t = _rng.randint(1, 40)\n    _c = [j - i for i in range(len(_a)) for j in range(i + 1, len(_a) + 1) if sum(_a[i:j]) >= _t]\n    _exp = min(_c) if _c else 0\n    assert min_days(_a, _t) == _exp, f'min_days({_a}, {_t}) {_exp} болуы керек'\n_big = [_rng.randint(1, 100) for _ in range(200000)]\n_t0 = _time.perf_counter(); min_days(_big, 50000); _dt = _time.perf_counter() - _t0\nassert _dt < 1.5, f'{_dt:.2f} с: нужно окно O(n)'\n"
    }
   },
   {
    "title": "Единицы с k заменами",
    "prompt": "<p>Каждый день план выполнен (<code>1</code>) или нет (<code>0</code>). Менеджер может исправить в отчёте не более <code>k</code> дней, отметив их как «выполнено». Функция <code>longest_ones(days, k)</code> должна вернуть длину самого длинного подряд идущего периода выполненных дней после исправлений. Скользящее окно: если в окне больше <code>k</code> нулей, сдвигайте левую границу.</p>\n<pre><code>longest_ones([1, 1, 0, 0, 1, 1, 1, 0, 1], 1) → 5\nlongest_ones([0, 0, 0], 0)                   → 0</code></pre>",
    "hints": [
     "Храните количество нулей в окне.",
     "Двигайте левую границу, пока <code>zeros &gt; k</code>, затем обновите длину."
    ],
    "check": {
     "tests": "\nassert longest_ones([1, 1, 0, 0, 1, 1, 1, 0, 1], 1) == 5, 'Ожидалось 5'\nassert longest_ones([0, 0, 0], 0) == 0, 'Исправлений нет, единиц нет: 0'\nassert longest_ones([0, 0, 0], 5) == 3, 'Все можно исправить: 3'\nassert longest_ones([], 2) == 0, 'Пустой список: 0'\nassert longest_ones([1, 1, 1], 0) == 3, 'Исправлять не нужно: 3'\nimport random as _random\n_rng = _random.Random(3)\nfor _ in range(40):\n    _a = [_rng.randint(0, 1) for _ in range(_rng.randint(0, 14))]; _k = _rng.randint(0, 3)\n    _exp = max([j - i for i in range(len(_a)) for j in range(i + 1, len(_a) + 1) if _a[i:j].count(0) <= _k] + [0])\n    assert longest_ones(_a, _k) == _exp, f'longest_ones({_a}, {_k}) {_exp} болуы керек'\n"
    }
   },
   {
    "title": "Диапазон цены",
    "prompt": "<p>Функция <code>spans(prices)</code>: для каждого дня верните, сколько дней подряд назад, включая сегодняшний, цена не превышала сегодняшнюю (<code>≤</code>). Monotonic stack: храните в стеке пары <code>(баға, аралық)</code> и объединяйте меньшие или равные цены. O(n).</p>\n<pre><code>spans([100, 80, 60, 70, 60, 75, 85]) → [1, 1, 1, 2, 1, 4, 6]</code></pre>",
    "hints": [
     "Если цена на вершине стека ≤ сегодняшней, добавьте её промежуток к сегодняшнему и удалите её из стека."
    ],
    "check": {
     "tests": "\nassert spans([100, 80, 60, 70, 60, 75, 85]) == [1, 1, 1, 2, 1, 4, 6], 'Ожидалось [1, 1, 1, 2, 1, 4, 6]'\nassert spans([]) == [], 'Пустой список: []'\nassert spans([5, 5, 5]) == [1, 2, 3], 'Равные цены тоже считаются: [1, 2, 3]'\nassert spans([3, 2, 1]) == [1, 1, 1], 'Убывающие цены: [1, 1, 1]'\nimport random as _random, time as _time\n_rng = _random.Random(4)\nfor _ in range(40):\n    _a = [_rng.randint(0, 9) for _ in range(_rng.randint(0, 12))]\n    _exp = []\n    for _i in range(len(_a)):\n        _j = _i\n        while _j >= 0 and _a[_j] <= _a[_i]: _j -= 1\n        _exp.append(_i - _j)\n    assert spans(_a) == _exp, f'spans({_a}) {_exp} болуы керек'\n_big = list(range(100000))\n_t0 = _time.perf_counter(); spans(_big); _dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'{_dt:.2f} с: нужен O(n) стек'\n"
    }
   },
   {
    "title": "Порядок букв чужого алфавита",
    "prompt": "<p>Словарь на неизвестном алфавите: <code>words</code> отсортирован по этому алфавиту. Функция <code>alien_order(words)</code> должна вернуть строку из всех букв, встречающихся в словах, в порядке алфавита. Первое различие соседних слов даёт ребро <code>a → b</code> графа; топологическая сортировка (Kahn). Если правильных порядков несколько, для однозначности всегда берите наименьшую букву из очереди — <code>heapq</code>. Если есть противоречие (цикл) или длинное слово стоит раньше своего префикса — верните <code>''</code>.</p>\n<pre><code>alien_order(['wrt', 'wrf', 'er', 'ett', 'rftt']) → 'wertf'\nalien_order(['z', 'x', 'z'])                     → ''\nalien_order(['abc', 'ab'])                       → ''</code></pre>",
    "hints": [
     "Достаточно сравнить пары соседних слов; после первого различия остановитесь.",
     "Kahn: буквы со входящей степенью 0 кладите в heap; если в конце вышли не все буквы — цикл."
    ],
    "check": {
     "tests": "\nassert alien_order(['wrt', 'wrf', 'er', 'ett', 'rftt']) == 'wertf', \"Ожидалось 'wertf'\"\nassert alien_order(['z', 'x', 'z']) == '', \"Цикл: ''\"\nassert alien_order(['abc', 'ab']) == '', \"Префикс должен стоять раньше: ''\"\nassert alien_order(['z', 'x']) == 'zx', \"Ожидалось 'zx'\"\nassert alien_order(['ab', 'abc']) == 'abc', \"Ограничений нет: буквы в порядке 'abc'\"\nassert alien_order(['ба', 'бв', 'ав']) == 'бав', \"Ожидалось 'бав'\"\nassert alien_order([]) == '', \"Слов нет: ''\"\nassert alien_order(['c', 'b', 'a']) == 'cba', \"Ожидалось 'cba'\"\n"
    }
   },
   {
    "title": "Самая длинная часть из одинаковых букв",
    "prompt": "<p>Функция <code>longest_same(s, k)</code>: в строке можно заменить не более <code>k</code> символов на любой другой. После замен верните длину самой длинной подряд идущей части из одинаковых символов. Скользящее окно: длина окна − количество самого частого символа в окне должно быть ≤ <code>k</code>. O(n · алфавит).</p>\n<pre><code>longest_same('ABAB', 2)    → 4\nlongest_same('AABABBA', 1) → 4\nlongest_same('', 3)        → 0</code></pre>",
    "hints": [
     "В окне заменяем все символы, кроме самого частого: количество замен = длина − <code>top</code>.",
     "Уменьшать <code>top</code> не нужно: он лишь не пропускает окна больше ответа."
    ],
    "check": {
     "tests": "\nassert longest_same('ABAB', 2) == 4, \"longest_same('ABAB', 2) должна вернуть 4\"\nassert longest_same('AABABBA', 1) == 4, \"longest_same('AABABBA', 1) должна вернуть 4\"\nassert longest_same('', 3) == 0, 'Пустая строка: 0'\nassert longest_same('ABC', 0) == 1, 'Замен не нужно: 1'\nassert longest_same('ҚҚҚ', 0) == 3, 'Все одинаковые: 3'\nimport random as _random\n_rng = _random.Random(5)\nfor _ in range(40):\n    _s = ''.join(_rng.choice('АБВ') for _ in range(_rng.randint(0, 12))); _k = _rng.randint(0, 3)\n    _exp = max([j - i for i in range(len(_s)) for j in range(i + 1, len(_s) + 1) if (j - i) - max(_s[i:j].count(c) for c in 'АБВ') <= _k] + [0])\n    assert longest_same(_s, _k) == _exp, f'longest_same({_s!r}, {_k}) {_exp} болуы керек'\n"
    }
   }
  ]
 },
 "dsa-p3": {
  "pr": [
   {
    "title": "Меньший слева",
    "prompt": "<p>Функция <code>prev_smaller(a)</code> должна для каждого элемента вернуть ближайший <b>слева</b> строго меньший элемент; если его нет — <code>-1</code>. Monotonic stack: O(n).</p>\n<pre><code>prev_smaller([4, 5, 2, 10, 8]) → [-1, 4, -1, 2, 2]</code></pre>",
    "hints": [
     "В стеке остаются только значения в порядке возрастания: удаляйте из него элементы, большие или равные новому."
    ],
    "check": {
     "tests": "\nassert prev_smaller([4, 5, 2, 10, 8]) == [-1, 4, -1, 2, 2], 'Ожидалось [-1, 4, -1, 2, 2]'\nassert prev_smaller([]) == [], 'Пустой список: []'\nassert prev_smaller([3, 3]) == [-1, -1], 'Равный элемент не меньше: [-1, -1]'\nimport random as _random, time as _time\n_rng = _random.Random(1)\nfor _ in range(40):\n    _x = [_rng.randint(0, 9) for _ in range(_rng.randint(0, 12))]\n    _exp = [next((y for y in reversed(_x[:i]) if y < v), -1) for i, v in enumerate(_x)]\n    assert prev_smaller(_x) == _exp, f'prev_smaller({_x}) {_exp} болуы керек'\n_big = list(range(100000))\n_t0 = _time.perf_counter(); prev_smaller(_big[::-1]); _dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'{_dt:.2f} с: нужен O(n) стек'\n"
    }
   },
   {
    "title": "Время распространения сообщения",
    "prompt": "<p>В сети <code>n</code> серверов (<code>1..n</code>), <code>times</code> — <code>(u, v, w)</code>: из <code>u</code> в <code>v</code> сообщение доходит за <code>w</code> мс (направленно). Сообщение выходит с сервера <code>k</code>. Функция <code>delay(times, n, k)</code> должна вернуть время, за которое оно дойдёт до всех серверов (кратчайшее расстояние до самого дальнего сервера); если хотя бы до одного не дойдёт — <code>-1</code>. Dijkstra + <code>heapq</code>.</p>\n<pre><code>delay([(2, 1, 1), (2, 3, 1), (3, 4, 1)], 4, 2) → 2\ndelay([(1, 2, 1)], 2, 2)                     → -1</code></pre>",
    "hints": [
     "Вершина, извлечённая из heap впервые, имеет окончательное расстояние.",
     "Ответ — максимум расстояний; если хотя бы одно не определено — <code>-1</code>."
    ],
    "check": {
     "tests": "\nassert delay([(2, 1, 1), (2, 3, 1), (3, 4, 1)], 4, 2) == 2, 'Ожидалось 2'\nassert delay([(1, 2, 1)], 2, 2) == -1, 'Пути из 2 в 1 нет: -1'\nassert delay([(1, 2, 1)], 2, 1) == 1, 'Ожидалось 1'\nassert delay([], 1, 1) == 0, 'Один сервер: 0'\nassert delay([(1, 2, 10), (1, 3, 1), (3, 2, 2)], 3, 1) == 3, 'Объездной путь короче: 3'\n"
    }
   },
   {
    "title": "Дома с видом на море",
    "prompt": "<p>Вдоль берега дома стоят слева направо, море — справа. Дом видит море, если все дома справа от него строго ниже. Функция <code>sea_view(heights)</code> должна вернуть индексы домов, которые видят море, в порядке возрастания. Пройдите справа налево один раз, сохраняя максимум (или monotonic stack).</p>\n<pre><code>sea_view([4, 2, 3, 1]) → [0, 2, 3]\nsea_view([1, 3, 2, 4]) → [3]\nsea_view([2, 2, 2])    → [2]</code></pre>",
    "hints": [
     "Справа налево: если дом строго выше текущего максимума, он видит море."
    ],
    "check": {
     "tests": "\nassert sea_view([4, 2, 3, 1]) == [0, 2, 3], 'Ожидалось [0, 2, 3]'\nassert sea_view([1, 3, 2, 4]) == [3], 'Ожидалось [3]'\nassert sea_view([2, 2, 2]) == [2], 'Равная высота закрывает вид: [2]'\nassert sea_view([]) == [], 'Домов нет: []'\nassert sea_view([5]) == [0], 'Один дом: [0]'\n"
    }
   },
   {
    "title": "Окно ограниченного разброса",
    "prompt": "<p>Показания датчика — <code>a</code>. Функция <code>longest_stable(a, limit)</code> должна вернуть длину самого длинного непрерывного периода, в котором разность между максимумом и минимумом не превышает <code>limit</code>. Два monotonic deque: один для максимумов (убывающий), другой для минимумов (возрастающий). O(n).</p>\n<pre><code>longest_stable([8, 2, 4, 7], 4)            → 2\nlongest_stable([10, 1, 2, 4, 7, 2], 5)     → 4    # [2, 4, 7, 2]\nlongest_stable([4, 2, 2, 2, 4, 4, 2, 2], 0) → 3</code></pre>",
    "hints": [
     "Храните в deque индексы: <code>mx[0]</code> — для максимума окна, <code>mn[0]</code> — для минимума.",
     "Если разность превышает предел, сдвигайте <code>lo</code> и убирайте из начала deque индексы, вышедшие из окна."
    ],
    "check": {
     "tests": "\nassert longest_stable([8, 2, 4, 7], 4) == 2, 'Ожидалось 2'\nassert longest_stable([10, 1, 2, 4, 7, 2], 5) == 4, 'Ожидалось 4'\nassert longest_stable([4, 2, 2, 2, 4, 4, 2, 2], 0) == 3, 'limit = 0: равные значения, 3'\nassert longest_stable([], 3) == 0, 'Пустой список: 0'\nassert longest_stable([7], 0) == 1, 'Одно значение: 1'\nimport random as _random, time as _time\n_rng = _random.Random(2)\nfor _ in range(40):\n    _x = [_rng.randint(0, 9) for _ in range(_rng.randint(0, 12))]; _l = _rng.randint(0, 5)\n    _exp = max([j - i for i in range(len(_x)) for j in range(i + 1, len(_x) + 1) if max(_x[i:j]) - min(_x[i:j]) <= _l] + [0])\n    assert longest_stable(_x, _l) == _exp, f'longest_stable({_x}, {_l}) {_exp} болуы керек'\n_big = [_rng.randint(0, 10**6) for _ in range(100000)]\n_t0 = _time.perf_counter(); longest_stable(_big, 10**5); _dt = _time.perf_counter() - _t0\nassert _dt < 1.5, f'{_dt:.2f} с: нужен O(n) с monotonic deque'\n"
    }
   },
   {
    "title": "Самый лёгкий горный путь",
    "prompt": "<p>Карта гор: <code>h[i][j]</code> — высота. Туристы идут из левого верхнего угла в правый нижний, двигаясь в четырёх направлениях. <b>Трудность</b> пути — наибольшая разность высот между соседними клетками, то есть <code>|h₁ − h₂|</code>. Функция <code>min_effort(h)</code> должна вернуть трудность наименее трудного пути. Dijkstra: вместо расстояния используйте «наименьшую трудность до этой клетки», обновление <code>max(d, |айырма|)</code>.</p>\n<pre><code>min_effort([[1, 2, 2],\n            [3, 8, 2],\n            [5, 3, 5]]) → 2</code></pre>",
    "hints": [
     "Элемент heap — <code>(ауырлық, r, c)</code>.",
     "Трудность перехода к соседу: <code>max(d, abs(h[nr][nc] − h[r][c]))</code>."
    ],
    "check": {
     "tests": "\nassert min_effort([[1, 2, 2], [3, 8, 2], [5, 3, 5]]) == 2, 'Ожидалось 2'\nassert min_effort([[1, 2, 3], [3, 8, 4], [5, 3, 5]]) == 1, 'Ожидалось 1'\nassert min_effort([[7]]) == 0, 'Одна клетка: 0'\nassert min_effort([[1, 10, 6, 7, 9, 10, 4, 9]]) == 9, 'Одна строка: 9'\nassert min_effort([[1, 2, 1, 1, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 1, 1, 2, 1]]) == 0, 'Ровный путь есть: 0'\n"
    }
   },
   {
    "title": "Максимум очков с прыжками",
    "prompt": "<p>Игрок начинает с ячейки <code>0</code> и доходит до последней; за один прыжок он продвигается вперёд не более чем на <code>k</code> ячеек. Очки — сумма значений всех посещённых ячеек (включая первую и последнюю; значения могут быть отрицательными). Функция <code>max_score(nums, k)</code> должна вернуть наибольшее количество очков. DP: <code>dp[i] = nums[i] + max(dp[i−k..i−1])</code>; максимум окна через monotonic deque: O(n).</p>\n<pre><code>max_score([1, -1, -2, 4, -7, 3], 2) → 7    # 1 → -1 → 4 → 3\nmax_score([10, -5, -2, 4, 0, 3], 3) → 17</code></pre>",
    "hints": [
     "В deque храните индексы, у которых значения <code>dp</code> идут по убыванию.",
     "Если индекс в начале меньше <code>i − k</code>, удалите его."
    ],
    "check": {
     "tests": "\nassert max_score([1, -1, -2, 4, -7, 3], 2) == 7, 'Ожидалось 7'\nassert max_score([10, -5, -2, 4, 0, 3], 3) == 17, 'Ожидалось 17'\nassert max_score([1, -5, -20, 4, -1, 3, -6, -3], 2) == 0, 'Ожидалось 0'\nassert max_score([5], 1) == 5, 'Одна ячейка: 5'\nassert max_score([-1, -2], 1) == -3, 'Остановка на всех ячейках обязательна: -3'\nimport random as _random, time as _time\n_rng = _random.Random(3)\nfor _ in range(40):\n    _x = [_rng.randint(-9, 9) for _ in range(_rng.randint(1, 12))]; _k = _rng.randint(1, 4)\n    _d = [0] * len(_x)\n    for _i in range(len(_x)):\n        _d[_i] = _x[_i] + (max(_d[max(0, _i - _k):_i]) if _i else 0)\n    assert max_score(_x, _k) == _d[-1], f'max_score({_x}, {_k}) {_d[-1]} болуы керек'\n_big = [_rng.randint(-10**4, 10**4) for _ in range(100000)]\n_t0 = _time.perf_counter(); max_score(_big, 5000); _dt = _time.perf_counter() - _t0\nassert _dt < 1.5, f'k = 5000: {_dt:.2f} с; максимум окна берите из deque за O(1)'\n"
    }
   },
   {
    "title": "Короткий отрезок с отрицательными числами",
    "prompt": "<p>Теперь значения <code>profit</code> могут быть <b>отрицательными</b>. Функция <code>shortest_at_least(profit, k)</code> должна вернуть длину самого короткого непустого непрерывного отрезка, сумма которого не меньше <code>k</code> (<code>k &gt; 0</code>); если такого нет — <code>-1</code>. Простое sliding window не работает! Префиксные суммы <code>P</code> и monotonic deque: ищите ближайший <code>i</code>, для которого <code>P[j] − P[i] ≥ k</code>. O(n).</p>\n<pre><code>shortest_at_least([2, -1, 2], 3)     → 3\nshortest_at_least([1, 2], 4)         → -1\nshortest_at_least([84, -37, 32, 40, 95], 167) → 3</code></pre>",
    "hints": [
     "В deque храните индексы, у которых значения <code>P</code> идут по возрастанию.",
     "С начала: пока <code>P[j] − P[dq[0]] ≥ k</code>, обновляйте ответ и удаляйте. С конца: если <code>P[dq[-1]] ≥ P[j]</code>, удаляйте — такой индекс больше никогда не станет хорошим началом."
    ],
    "check": {
     "tests": "\nassert shortest_at_least([2, -1, 2], 3) == 3, 'Ожидалось 3'\nassert shortest_at_least([1, 2], 4) == -1, 'Нет: -1'\nassert shortest_at_least([84, -37, 32, 40, 95], 167) == 3, 'Ожидалось 3'\nassert shortest_at_least([1], 1) == 1, 'Один элемент: 1'\nassert shortest_at_least([], 1) == -1, 'Пустой список: -1'\nassert shortest_at_least([-5, 10], 10) == 1, 'Отрицательное начало: 1'\nimport random as _random, time as _time\n_rng = _random.Random(4)\nfor _ in range(60):\n    _x = [_rng.randint(-6, 9) for _ in range(_rng.randint(0, 12))]; _k = _rng.randint(1, 15)\n    _c = [j - i for i in range(len(_x)) for j in range(i + 1, len(_x) + 1) if sum(_x[i:j]) >= _k]\n    _exp = min(_c) if _c else -1\n    assert shortest_at_least(_x, _k) == _exp, f'shortest_at_least({_x}, {_k}) {_exp} болуы керек'\n_big = [_rng.randint(-100, 100) for _ in range(100000)]\n_t0 = _time.perf_counter(); shortest_at_least(_big, 2000); _dt = _time.perf_counter() - _t0\nassert _dt < 1.5, f'{_dt:.2f} с: нужно решение за O(n)'\n"
    }
   },
   {
    "title": "Дешёвый рейс с ограничением пересадок",
    "prompt": "<p>Есть <code>n</code> аэропортов (<code>0..n−1</code>), <code>flights</code> — <code>(u, v, баға)</code> направленных рейсов. Функция <code>cheapest(n, flights, src, dst, k)</code> должна вернуть самую низкую цену от <code>src</code> до <code>dst</code> с <b>не более чем <code>k</code> остановками</b> (то есть не более <code>k + 1</code> рейсами); если это невозможно — <code>-1</code>. Dijkstra, расширенный состояниями: <code>(баға, әуежай, қолданылған рейс саны)</code>; в один аэропорт можно прийти несколько раз с разным числом рейсов.</p>\n<pre><code>_f = [(0, 1, 100), (1, 2, 100), (2, 3, 100), (0, 2, 500)]\ncheapest(4, _f, 0, 3, 1) → 600     # 0 → 2 → 3\ncheapest(4, _f, 0, 3, 2) → 300     # 0 → 1 → 2 → 3\ncheapest(4, _f, 0, 3, 0) → -1</code></pre>",
    "hints": [
     "Heap упорядочивает по цене, поэтому первое извлечение <code>dst</code> даёт ответ.",
     "Если в аэропорт уже пришли <b>с не большим или равным</b> числом рейсов (и дешевле), это состояние можно пропустить."
    ],
    "check": {
     "tests": "\n_f = [(0, 1, 100), (1, 2, 100), (2, 3, 100), (0, 2, 500)]\nassert cheapest(4, _f, 0, 3, 1) == 600, 'k = 1: 600'\nassert cheapest(4, _f, 0, 3, 2) == 300, 'k = 2: 300'\nassert cheapest(4, _f, 0, 3, 0) == -1, 'k = 0: прямого рейса нет, -1'\nassert cheapest(3, [(0, 1, 100), (1, 2, 100), (0, 2, 500)], 0, 2, 1) == 200, 'Ожидалось 200'\nassert cheapest(2, [], 0, 1, 5) == -1, 'Рейса нет: -1'\nassert cheapest(3, [(0, 1, 5)], 1, 1, 0) == 0, 'src = dst: 0'\nimport random as _random\n_rng = _random.Random(5)\ndef _bf(n, fl, s, d, k):\n    INF = float('inf'); dist = [INF] * n; dist[s] = 0\n    for _ in range(k + 1):\n        nd = list(dist)\n        for u, v, w in fl:\n            if dist[u] + w < nd[v]: nd[v] = dist[u] + w\n        dist = nd\n    return dist[d] if dist[d] < INF else -1\nfor _ in range(60):\n    _n = _rng.randint(2, 6)\n    _fl = [(_rng.randrange(_n), _rng.randrange(_n), _rng.randint(1, 50)) for _ in range(_rng.randint(0, 12))]\n    _fl = [x for x in _fl if x[0] != x[1]]\n    _s, _d, _k = _rng.randrange(_n), _rng.randrange(_n), _rng.randint(0, 3)\n    assert cheapest(_n, _fl, _s, _d, _k) == _bf(_n, _fl, _s, _d, _k), f'cheapest({_n}, {_fl}, {_s}, {_d}, {_k}) {_bf(_n, _fl, _s, _d, _k)} болуы керек'\n"
    }
   }
  ]
 }
} });
