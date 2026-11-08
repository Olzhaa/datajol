// DSA-1 Data Structures & Algorithms: Russian text. Code, solutions and expected output are in content/dsa.js.
DJ.i18n.patch({
  modules: {
    'dsa-1': { intro: 'Алгоритмы и структуры данных: Big-O, массив и два указателя, hash map, stack/queue, linked list, рекурсия, binary search, сортировка, деревья, heap, графы и динамическое программирование. После каждой темы вы сами реализуете всё на Python, а в конце решаете сборник задач уровней Лёгкие / Средние / Сложные.' }
  },
  lessons: {
    'dsa-1': {
      title: 'Big-O: оцениваем стоимость алгоритма',
      body: `
<p>Одну задачу можно решить двумя разными программами: обе дают правильный ответ, но одна на 1 000 заказов работает полсекунды, а на 1 000 000 заказов — часами. <b>Big-O</b> — обозначение, которое описывает, как растёт объём работы при росте размера входа <code>n</code>. Важны не конкретные секунды, а <b>форма роста</b>.</p>
<h3>Считаем операции</h3>
<p>В магазине в стиле Kaspi есть <code>n</code> заказов. Вопрос: встречается ли один и тот же <code>order_id</code> дважды?</p>
<pre><code># Вариант 1: сравниваем каждую пару
def has_dup_slow(ids):
    for i in range(len(ids)):
        for j in range(i + 1, len(ids)):
            if ids[i] == ids[j]:
                return True
    return False

# Вариант 2: собираем увиденное в set
def has_dup_fast(ids):
    seen = set()
    for x in ids:
        if x in seen:
            return True
        seen.add(x)
    return False</code></pre>
<p>В первом варианте внутренний цикл выполняется <code>(n−1) + (n−2) + … + 1 = n(n−1)/2</code> раз — это <b>O(n²)</b>. Во втором мы смотрим на каждый элемент один раз, а проверка в set в среднем занимает постоянное время — <b>O(n)</b>. При n = 100 000 первый вариант делает около 5 млрд сравнений, второй — 100 тысяч.</p>
<h3>Основные классы роста</h3>
<table>
<tr><th>Big-O</th><th>Пример</th><th>Примерно при n = 10⁶</th></tr>
<tr><td>O(1)</td><td>получение значения из dict по ключу</td><td>1</td></tr>
<tr><td>O(log n)</td><td>binary search</td><td>20</td></tr>
<tr><td>O(n)</td><td>один проход по списку</td><td>10⁶</td></tr>
<tr><td>O(n log n)</td><td>хорошая сортировка (merge sort, <code>sorted</code>)</td><td>2·10⁷</td></tr>
<tr><td>O(n²)</td><td>два вложенных цикла</td><td>10¹²</td></tr>
<tr><td>O(2ⁿ)</td><td>перебор всех подмножеств</td><td>невозможно</td></tr>
</table>
<p>Правила: постоянные множители и младшие слагаемые отбрасываются (<code>3n + 5</code> → O(n), <code>n² + n</code> → O(n²)). Последовательные циклы складываются, вложенные — перемножаются. Так же оцениваем и память: set <code>seen</code> занимает O(n) дополнительной памяти — мы «купили» время за счёт памяти.</p>
<div class="tip"><b>Практический ориентир:</b> Python выполняет примерно 10⁷ простых операций в секунду (в браузере ещё медленнее). При n = 10⁵ O(n²) ≈ 10¹⁰ — провал, O(n log n) ≈ 2·10⁶ — мгновенно.</div>`,
      ex: [
        { prompt: `Какова временная сложность этого кода?<pre><code>total = 0
for i in range(n):
    for j in range(n):
        total += a[i] * a[j]</code></pre>`, explain: 'Внешний цикл выполняется n раз, и на каждой итерации внутренний цикл — ещё n раз: n · n = n².' },
        { prompt: `Сколько раз выполнится строка <code>count += 1</code> при n = 100?<pre><code>count = 0
for i in range(n):
    for j in range(i + 1, n):
        count += 1</code></pre>`, explain: 'Каждая пара (i, j), i &lt; j, считается один раз: n(n−1)/2 = 100 · 99 / 2 = 4950.' },
        { prompt: 'Какова сложность этого цикла?<pre><code>steps = 0\nwhile n &gt; 1:\n    n //= 2\n    steps += 1</code></pre>', explain: 'На каждом шаге n уменьшается вдвое, поэтому число шагов ≈ log₂ n.' },
        { prompt: `Напишите функцию <code>has_duplicate(ids)</code>: она возвращает <code>True</code>, если хотя бы одно значение встречается в списке дважды, иначе <code>False</code>. Тест проверяет и список из 100 000 элементов, поэтому попарное сравнение за O(n²) не пройдёт — используйте <code>set</code>.
<pre><code>has_duplicate([101, 205, 101])  → True
has_duplicate([7, 8, 9])        → False
has_duplicate([])               → False</code></pre>`, hints: ['Создайте пустой <code>seen = set()</code> и проверяйте каждый элемент через <code>x in seen</code>.', 'Добавляйте новый элемент через <code>seen.add(x)</code>; если до конца повторов не нашлось — <code>False</code>.'], check: { tests: `
assert has_duplicate([101, 205, 101]) is True, 'has_duplicate([101, 205, 101]) должна вернуть True'
assert has_duplicate([7, 8, 9]) is False, 'has_duplicate([7, 8, 9]) должна вернуть False'
assert has_duplicate([]) is False, 'Для пустого списка верните False'
assert has_duplicate([5]) is False, 'В списке из одного элемента повторов нет'
import time as _time
_big = list(range(5000))
_t0 = _time.perf_counter(); _r = has_duplicate(_big); _dt = _time.perf_counter() - _t0
assert _r is False, 'В списке 0..4999 повторов нет'
assert _dt < 0.15, f'Для n=5000 ушло {_dt:.2f} с — это O(n²). Напишите решение за O(n) через set'
_big = list(range(100000)) + [99999]
assert has_duplicate(_big) is True, 'Для списка из 100 000 элементов с повтором в конце должно быть True'
` } }
      ]
    },
    'dsa-2': {
      title: 'Массив, список и два указателя',
      body: `
<p>Python <code>list</code> — динамический массив: элементы лежат в памяти подряд. Поэтому доступ по индексу <code>a[i]</code> — O(1), добавление в конец <code>append</code> — в среднем O(1). А вставка в начало <code>a.insert(0, x)</code> или <code>a.pop(0)</code> — O(n): все остальные элементы сдвигаются на одну позицию.</p>
<table>
<tr><th>Операция</th><th>Сложность</th></tr>
<tr><td><code>a[i]</code>, <code>a[i] = x</code>, <code>len(a)</code></td><td>O(1)</td></tr>
<tr><td><code>a.append(x)</code>, <code>a.pop()</code></td><td>O(1) в среднем</td></tr>
<tr><td><code>a.insert(0, x)</code>, <code>a.pop(0)</code>, <code>x in a</code></td><td>O(n)</td></tr>
<tr><td><code>a[l:r]</code> (срез)</td><td>O(r − l) — создаёт копию</td></tr>
</table>
<h3>Два указателя (two pointers)</h3>
<p>Во многих задачах мы держим два индекса и двигаем их навстречу друг другу. Пример: список цен <b>отсортирован</b>, бюджет покупателя — 10 000 ₸. Есть ли два товара, сумма которых ровно равна бюджету?</p>
<pre><code>def pair_with_sum(prices, budget):
    i, j = 0, len(prices) - 1
    while i &lt; j:
        s = prices[i] + prices[j]
        if s == budget:
            return (i, j)
        if s &lt; budget:
            i += 1      # сумма мала — заменяем дешёвый товар на более дорогой
        else:
            j -= 1      # сумма велика — заменяем дорогой на более дешёвый
    return None</code></pre>
<p>Почему это верно? Если <code>prices[i] + prices[j] &lt; budget</code>, то <code>prices[i]</code> с любым <code>j' ≤ j</code> тоже даст меньше, поэтому <code>i</code> можно отбросить. На каждом шаге сдвигается один указатель — всего O(n), а перебор всех пар был бы O(n²).</p>
<p>Ещё один шаблон — <b>указатели чтения/записи</b>: удаление повторов из отсортированного списка на месте (in place). <code>w</code> — следующая позиция для записи, <code>r</code> — позиция, которую читаем. Встретилось новое значение — <code>a[w] = a[r]</code>, <code>w += 1</code>.</p>
<div class="tip"><b>Частые ошибки:</b> (1) <code>a.pop(0)</code> внутри цикла — незаметно получается O(n²). (2) Удаление элементов из списка во время прохода по нему — индексы сдвигаются, и элементы пропускаются. (3) Забыть, что два указателя работают только на отсортированном списке.</div>`,
      ex: [
        { prompt: 'Если вынимать все элементы списка из 100 000 элементов по одному с начала через <code>a.pop(0)</code>, какова общая сложность?', explain: 'Каждый pop(0) сдвигает оставшиеся элементы: n + (n−1) + … ≈ n²/2. В такой ситуации нужен collections.deque.' },
        { prompt: `Функция <code>reverse_in_place(a)</code> должна развернуть список <b>на месте</b>: меняйте элементы местами двумя указателями (с начала и с конца). Не создавайте новый список и ничего не возвращайте.
<pre><code>a = [1, 2, 3, 4]
reverse_in_place(a)   # a == [4, 3, 2, 1]</code></pre>`, hints: ['Внутри цикла <code>while i &lt; j:</code> — <code>a[i], a[j] = a[j], a[i]</code>.', 'Затем <code>i += 1</code>, <code>j -= 1</code>.'], starter: 'def reverse_in_place(a):\n    i, j = 0, len(a) - 1\n    # пока i < j, меняйте местами a[i] и a[j]\n', check: { tests: `
_a = [1, 2, 3, 4]; _id = id(_a)
_r = reverse_in_place(_a)
assert _a == [4, 3, 2, 1], f'[1, 2, 3, 4] → должно стать [4, 3, 2, 1], у вас {_a}'
assert id(_a) == _id and _r is None, 'Измените список на месте и ничего не возвращайте'
_b = [5, 6, 7]; reverse_in_place(_b)
assert _b == [7, 6, 5], 'Список нечётной длины тоже должен разворачиваться правильно'
_c = []; reverse_in_place(_c)
assert _c == [], 'Пустой список должен остаться пустым'
` } },
        { prompt: `Цены отсортированы <b>по возрастанию</b>. <code>pair_with_sum(prices, budget)</code> должна вернуть индексы <code>(i, j)</code>, <code>i &lt; j</code>, двух товаров, сумма которых ровно равна <code>budget</code>; если такой пары нет — <code>None</code>. Напишите O(n) с двумя указателями: тест проверяет 100 000 цен.
<pre><code>pair_with_sum([1500, 2500, 4000, 6000, 9000], 10000) → (2, 3)
pair_with_sum([1000, 2000], 5000)                     → None</code></pre>`, hints: ['Начните с <code>i = 0</code>, <code>j = len(prices) - 1</code>.', 'Если сумма мала — <code>i += 1</code>, если велика — <code>j -= 1</code>.'], check: { tests: `
_r = pair_with_sum([1500, 2500, 4000, 6000, 9000], 10000)
assert _r is not None and tuple(_r) == (2, 3), f'Ожидалось (2, 3), у вас {_r}'
assert pair_with_sum([1000, 2000], 5000) is None, 'Если пары нет, верните None'
assert pair_with_sum([], 10) is None, 'Для пустого списка — None'
assert pair_with_sum([5000], 10000) is None, 'Товар нельзя ставить в пару с самим собой'
_r = pair_with_sum([1, 3, 3, 9], 6)
assert _r is not None and tuple(_r) == (1, 2), 'Два разных товара с одинаковой ценой тоже могут быть парой'
import time as _time
_p = list(range(0, 10000, 2))
_t0 = _time.perf_counter(); _r = pair_with_sum(_p, 1); _dt = _time.perf_counter() - _t0
assert _r is None, 'Сумма чётных чисел не может быть нечётной — ожидалось None'
assert _dt < 0.15, f'Для n=5000 — {_dt:.2f} с, это O(n²). Напишите O(n) с двумя указателями'
_p = list(range(100000))
_r = pair_with_sum(_p, 199997)
assert _r is not None and _p[_r[0]] + _p[_r[1]] == 199997 and _r[0] < _r[1], 'При n = 100 000 правильная пара не найдена'
` } },
        { prompt: `Удалите повторы из отсортированного списка <b>на месте</b> (указатели чтения/записи). <code>dedup_sorted(a)</code> должна вернуть число уникальных значений <code>k</code>, а <code>a[:k]</code> должны быть этими уникальными значениями (остаток списка не важен).
<pre><code>a = [1, 1, 2, 3, 3, 3]
k = dedup_sorted(a)   # k == 3, a[:3] == [1, 2, 3]</code></pre>`, hints: ['<code>for r in range(1, len(a)):</code> — сравнивайте <code>a[r]</code> с последним записанным <code>a[w - 1]</code>.', 'Если отличается — <code>a[w] = a[r]</code>, <code>w += 1</code>.'], starter: `def dedup_sorted(a):
    if not a:
        return 0
    w = 1
    # r от 1 до конца: если a[r] отличается от последнего записанного, запишите его в a[w]
    return w
`, check: { tests: `
_a = [1, 1, 2, 3, 3, 3]; _id = id(_a)
_k = dedup_sorted(_a)
assert _k == 3, f'Для [1, 1, 2, 3, 3, 3] k = 3, у вас {_k}'
assert _a[:3] == [1, 2, 3] and id(_a) == _id, f'Должно быть a[:3] == [1, 2, 3] (на месте), у вас {_a[:3]}'
assert dedup_sorted([]) == 0, 'Для пустого списка — 0'
_b = [4, 4, 4]
assert dedup_sorted(_b) == 1 and _b[0] == 4, 'Для [4, 4, 4] k = 1'
_c = [1, 2, 3]
assert dedup_sorted(_c) == 3 and _c == [1, 2, 3], 'Список без повторов не должен измениться'
` } }
      ]
    },
    'dsa-3': {
      title: 'Строки (strings)',
      body: `
<p>В Python <code>str</code> — <b>неизменяемая</b> (immutable) последовательность символов. <code>s[i]</code> — O(1), <code>len(s)</code> — O(1), но написать <code>s[i] = 'а'</code> нельзя: любое «изменение» создаёт новую строку. Отсюда важное следствие:</p>
<pre><code># Медленно: каждый += создаёт новую строку и копирует старую → может быть O(n²)
out = ''
for ch in text:
    out += ch.upper()

# Правильно: собрать части в список и в конце один раз склеить → O(n)
parts = []
for ch in text:
    parts.append(ch.upper())
out = ''.join(parts)</code></pre>
<h3>Частые методы</h3>
<ul>
<li><code>s.lower()</code>, <code>s.upper()</code> — работают и с казахскими буквами: <code>'ҚАЗАҚ'.lower() == 'қазақ'</code>.</li>
<li><code>ch.isalnum()</code>, <code>ch.isalpha()</code>, <code>ch.isdigit()</code> — проверка вида символа.</li>
<li><code>s.split()</code>, <code>' '.join(words)</code>, <code>s.strip()</code>, <code>s[::-1]</code> (перевёрнутая копия).</li>
</ul>
<h3>Пример: палиндром</h3>
<p>Слово «Қазақ» читается одинаково с обеих сторон — это палиндром. Чтобы проверять, не обращая внимания на знаки препинания и пробелы, используем два указателя: слева и справа пропускаем символы, которые не являются буквами или цифрами, затем приводим к нижнему регистру и сравниваем.</p>
<pre><code>def is_palindrome(s):
    i, j = 0, len(s) - 1
    while i &lt; j:
        if not s[i].isalnum():
            i += 1
        elif not s[j].isalnum():
            j -= 1
        else:
            if s[i].lower() != s[j].lower():
                return False
            i += 1
            j -= 1
    return True</code></pre>
<p>Это O(n) по времени и O(1) дополнительной памяти. Короткий вариант <code>t = ''.join(c.lower() for c in s if c.isalnum()); t == t[::-1]</code> тоже O(n), но занимает O(n) памяти — во многих случаях это тоже подходит.</p>
<h3>Анаграмма</h3>
<p>Если два слова состоят из одних и тех же букв, это анаграммы: «аспан» и «панас». Проверить можно двумя способами: <code>sorted(a) == sorted(b)</code> (O(n log n)) или подсчётом частот букв <code>Counter(a) == Counter(b)</code> (O(n)). Подсчёт частот — первое применение hash map из следующего урока.</p>
<div class="tip"><b>Частые ошибки:</b> (1) Наращивание строки через <code>+=</code> внутри цикла. (2) Неучёт регистра: <code>'А' != 'а'</code>. (3) Забыть разницу между <code>s.split(' ')</code> и <code>s.split()</code>: второй вариант пропускает подряд идущие пробелы вместе.</div>`,
      ex: [
        { prompt: 'Почему при сборке длинной строки <code>\'\'.join(parts)</code> лучше, чем <code>out += ch</code> внутри цикла?', options: ['join работает только с английскими буквами', 'str неизменяема, поэтому += на каждом шаге может создавать новую строку и копировать её; join склеивает один раз за O(n)', '+= вызывает синтаксическую ошибку', 'Разницы нет, это вопрос стиля'], explain: 'Строки immutable: каждый += может копировать прежнее содержимое в новую строку, в сумме получается O(n²). Собрать в список и один раз сделать join — O(n).' },
        { prompt: `Напишите <code>is_palindrome(s)</code>: является ли строка палиндромом, если игнорировать все символы, кроме букв и цифр (пробелы, запятые, восклицательные знаки), и не учитывать регистр?
<pre><code>is_palindrome('Қазақ')          → True
is_palindrome('Алма, алма!')      → False
is_palindrome('А роза упала на лапу Азора') → True
is_palindrome('')                → True</code></pre>`, hints: ['Два указателя: <code>i = 0</code>, <code>j = len(s) - 1</code>; пропускайте символы, для которых не выполняется <code>isalnum()</code>.', 'Перед сравнением — <code>.lower()</code>.'], check: { tests: `
assert is_palindrome('Қазақ') is True, "'Қазақ' — палиндром"
assert is_palindrome('Алма, алма!') is False, "'Алма, алма!' → 'алмаалма' не палиндром"
assert is_palindrome('А роза упала на лапу Азора') is True, 'Игнорируйте пробелы и регистр'
assert is_palindrome('') is True, 'Пустая строка считается палиндромом'
assert is_palindrome('.,!') is True, 'Строка только из знаков препинания — палиндром'
assert is_palindrome('12321') is True and is_palindrome('123') is False, 'Цифры тоже учитываются'
` } },
        { prompt: `<code>is_anagram(a, b)</code>: <code>True</code>, если два слова состоят из одних и тех же букв (в том же количестве). Регистр не учитывайте.
<pre><code>is_anagram('аспан', 'панас')  → True
is_anagram('Арман', 'намра')  → True
is_anagram('ала', 'алла')     → False</code></pre>`, hints: ['<code>from collections import Counter</code> — считает частоты букв.', 'Или <code>sorted(a.lower()) == sorted(b.lower())</code>.'], check: { tests: `
assert is_anagram('аспан', 'панас') is True, "'аспан' и 'панас' — анаграммы"
assert is_anagram('Арман', 'намра') is True, 'Не учитывайте регистр'
assert is_anagram('ала', 'алла') is False, 'Количество букв тоже должно совпадать'
assert is_anagram('', '') is True, 'Две пустые строки — анаграммы'
assert is_anagram('abc', 'abd') is False, "'abc' и 'abd' не анаграммы"
` } },
        { prompt: `Кодирование длин серий (run-length): сожмите подряд идущие одинаковые символы в вид «символ + количество»; если количество равно 1, число не пишется. <code>compress(s)</code> должна собирать строку в список и в конце возвращать её через <code>''.join</code>.
<pre><code>compress('ааабвв')  → 'а3бв2'
compress('xyz')     → 'xyz'
compress('')        → ''</code></pre>`, hints: ['<code>i</code> — начало группы; двигайте <code>j</code>, пока <code>s[j] == s[i]</code>.', 'Длина группы — <code>j - i</code>; добавляйте число, только если она больше 1, затем <code>i = j</code>.'], starter: 'def compress(s):\n    parts = []\n    # посчитайте подряд идущие одинаковые символы\n    return \'\'.join(parts)\n', check: { tests: `
assert compress('ааабвв') == 'а3бв2', f"'ааабвв' → 'а3бв2', у вас {compress('ааабвв')!r}"
assert compress('xyz') == 'xyz', "Строка без повторов не меняется"
assert compress('zzzzzzzzzzzz') == 'z12', 'Двузначное число тоже должно записываться правильно'
assert compress('aabaa') == 'a2ba2', 'Одинаковые символы объединяются, только если стоят подряд'
assert compress('q') == 'q', 'Строка из одного символа не меняется'
` } }
      ]
    },
    'dsa-4': {
      title: 'Hash map и set: частоты и пары',
      body: `
<p><code>dict</code> и <code>set</code> — это <b>hash table</b>. Hash-функция вычисляет по ключу число, и по этому числу ключ сразу попадает на своё место в таблице. Поэтому поиск, добавление и удаление — <b>в среднем O(1)</b>. В списке <code>x in a</code> — O(n), в set <code>x in s</code> — O(1). Ключ должен быть хешируемым (неизменяемым): <code>str</code>, <code>int</code>, <code>tuple</code> — можно, <code>list</code> — нельзя.</p>
<h3>Шаблон 1: подсчёт частот</h3>
<pre><code>orders = ['Алматы', 'Астана', 'Алматы', 'Шымкент', 'Алматы']
freq = {}
for city in orders:
    freq[city] = freq.get(city, 0) + 1
# {'Алматы': 3, 'Астана': 1, 'Шымкент': 1}

from collections import Counter
Counter(orders).most_common(1)   # [('Алматы', 3)]</code></pre>
<h3>Шаблон 2: «что я видел раньше?» (two-sum)</h3>
<p>Нужно найти в неотсортированном списке индексы двух чисел с суммой <code>target</code>. Для каждого <code>x</code> нам нужно <code>target − x</code>. Встречали ли мы его раньше — спрашиваем у dict за O(1):</p>
<pre><code>def two_sum(nums, target):
    pos = {}                       # значение → индекс
    for i, x in enumerate(nums):
        need = target - x
        if need in pos:
            return (pos[need], i)
        pos[x] = i
    return None

two_sum([3000, 7000, 1500, 5500], 7000)   # (2, 3)</code></pre>
<p>Почему <code>pos[x] = i</code> стоит <b>после</b> проверки? Иначе при <code>x + x = target</code> мы поставим элемент в пару с самим собой. Это O(n) по времени и O(n) по памяти; два цикла дали бы O(n²).</p>
<h3>Шаблон 3: группировка</h3>
<p>Берём в качестве ключа «подпись» и собираем в список всё, что к ней относится: например, при группировке анаграмм ключ — <code>''.join(sorted(word))</code>. <code>collections.defaultdict(list)</code> сам создаёт пустой список.</p>
<div class="tip"><b>Частые ошибки:</b> (1) <code>freq[k] += 1</code> — KeyError, если ключа ещё нет; используйте <code>get(k, 0)</code> или <code>Counter</code>. (2) Список в качестве ключа — TypeError: сделайте <code>tuple(lst)</code>. (3) Забыть, что set не упорядочен: если нужен «первый встретившийся», работайте со списком или индексом.</div>`,
      ex: [
        { prompt: `<code>two_sum(nums, target)</code> должна вернуть индексы <code>(i, j)</code>, <code>i &lt; j</code>, двух элементов с суммой <code>target</code> (считайте, что ответ единственный); если их нет — <code>None</code>. Тест проверяет 100 000 элементов — используйте dict.
<pre><code>two_sum([3000, 7000, 1500, 5500], 7000) → (2, 3)
two_sum([4, 4], 8)                     → (0, 1)
two_sum([1, 2], 10)                    → None</code></pre>`, hints: ['<code>pos = {}</code> — уже виденное значение → его индекс.', 'Сначала проверьте <code>target - x in pos</code>, и только потом <code>pos[x] = i</code>.'], check: { tests: `
_r = two_sum([3000, 7000, 1500, 5500], 7000)
assert _r is not None and tuple(_r) == (2, 3), f'Ожидалось (2, 3), у вас {_r}'
_r = two_sum([4, 4], 8)
assert _r is not None and tuple(_r) == (0, 1), 'Два одинаковых числа: (0, 1)'
assert two_sum([1, 2], 10) is None, 'Если ответа нет — None'
assert two_sum([5], 10) is None, 'Не ставьте элемент в пару с самим собой'
import time as _time
_n = list(range(1, 5001))
_t0 = _time.perf_counter(); _r = two_sum(_n, 20000); _dt = _time.perf_counter() - _t0
assert _r is None and _dt < 0.15, f'Для n=5000 — {_dt:.2f} с, похоже на O(n²). Напишите O(n) через dict'
_n = list(range(0, 300000, 3)) + [1]
_r = two_sum(_n, 299998)
assert _r is not None and tuple(_r) == (99999, 100000), 'При n = 100 000 правильная пара не найдена'
` } },
        { prompt: `<code>first_unique(s)</code> должна вернуть индекс <b>первого</b> символа, который встречается в строке только один раз; если такого символа нет — <code>-1</code>.
<pre><code>first_unique('алматы')  → 1   # 'л'
first_unique('аабб')    → -1</code></pre>`, hints: ['Сначала посчитайте частоты всех символов (<code>Counter(s)</code>).', 'Затем пройдите строку заново с начала и верните первый индекс с частотой 1.'], check: { tests: `
assert first_unique('алматы') == 1, f"Для 'алматы' — 1 ('л'), у вас {first_unique('алматы')}"
assert first_unique('аабб') == -1, 'Если уникального символа нет — -1'
assert first_unique('') == -1, 'Для пустой строки — -1'
assert first_unique('z') == 0, 'Для строки из одного символа — 0'
assert first_unique('ababc') == 4, "Для 'ababc' — 4"
` } },
        { prompt: 'Какой ключ <b>нельзя</b> положить в Python <code>dict</code>?', explain: 'list изменяем, поэтому не хешируется (TypeError: unhashable type). tuple, str, int — можно.' },
        { prompt: `Сгруппируйте анаграммы. <code>group_anagrams(words)</code> должна вернуть список групп: каждая группа — слова, которые являются анаграммами друг друга, в порядке их следования во входе; группы — в порядке появления их первого слова во входе.
<pre><code>group_anagrams(['аспан', 'тал', 'панас', 'лат', 'нан'])
→ [['аспан', 'панас'], ['тал', 'лат'], ['нан']]</code></pre>`, hints: ['<code>key = \'\'.join(sorted(w))</code> — у анаграмм одинаковый.', '<code>groups.setdefault(key, []).append(w)</code>; dict сохраняет порядок вставки.'], starter: `def group_anagrams(words):
    groups = {}
    # ключ: строка из отсортированных букв слова
    return list(groups.values())
`, check: { tests: `
_r = group_anagrams(['аспан', 'тал', 'панас', 'лат', 'нан'])
assert _r == [['аспан', 'панас'], ['тал', 'лат'], ['нан']], f'Ожидалось [[аспан, панас], [тал, лат], [нан]], у вас {_r}'
assert group_anagrams(['a', 'a']) == [['a', 'a']], 'Одинаковые слова — в одной группе'
assert group_anagrams(['ab', 'ba', 'c']) == [['ab', 'ba'], ['c']], "['ab', 'ba', 'c'] → [['ab', 'ba'], ['c']]"
` } }
      ]
    },
    'dsa-5': {
      title: 'Stack и queue (deque)',
      body: `
<p><b>Stack</b> (стек) — «последним пришёл, первым ушёл» (LIFO): как стопка тарелок, кладём и берём только сверху. В Python стек — обычный <code>list</code>: <code>append(x)</code> кладёт, <code>pop()</code> забирает, <code>st[-1]</code> показывает верхний элемент — всё за O(1).</p>
<p><b>Queue</b> (очередь) — «первым пришёл, первым ушёл» (FIFO): как очередь в ЦОНе. <code>list.pop(0)</code> — O(n), поэтому используем <code>collections.deque</code>: <code>append(x)</code> добавляет в конец, <code>popleft()</code> забирает из начала — обе операции O(1).</p>
<pre><code>from collections import deque
q = deque()
q.append('Айгүл'); q.append('Ерлан'); q.append('Дана')
q.popleft()      # 'Айгүл' — кто пришёл первым, того первым и обслуживают
len(q)           # 2</code></pre>
<h3>Пример: баланс скобок</h3>
<p>Правильно ли закрыты скобки <code>( [ { } ] )</code> в формуле? Открывающую скобку кладём в стек. Когда приходит закрывающая, на вершине стека должна лежать её пара. В конце стек должен быть пуст.</p>
<pre><code>def is_valid(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    st = []
    for ch in s:
        if ch in '([{':
            st.append(ch)
        elif ch in pairs:
            if not st or st.pop() != pairs[ch]:
                return False
    return not st

is_valid('{[()]}')   # True
is_valid('([)]')     # False — открылась (, но пришла ]</code></pre>
<h3>Пример: очередь скользящего окна</h3>
<p>Колл-центр хочет знать число звонков за последние 3 секунды (3000 мс). Время звонков приходит по возрастанию. Каждый новый звонок добавляем в очередь, а устаревшие (раньше <code>t − 3000</code>) убираем из начала через <code>popleft</code>. Каждый звонок один раз входит в очередь и один раз выходит — всего O(n).</p>
<div class="tip"><b>Где встречается:</b> стек — вызовы функций (call stack), кнопка «Назад» в браузере, undo, вычисление выражений, DFS. Очередь — очереди задач (Celery, Kafka), BFS, rate limiting. <b>Частая ошибка:</b> <code>pop()</code> из пустого стека — IndexError; сначала проверьте <code>if st</code>.</div>`,
      ex: [
        { prompt: 'Нужно смоделировать очередь в ЦОНе: люди встают в конец, обслуживают их с начала. Какая структура выполняет обе операции за O(1)?', options: ['list: append + pop(0)', 'collections.deque: append + popleft', 'set: add + pop', 'str: + и [1:]'], explain: 'deque даёт добавление/удаление за O(1) с обоих концов. list.pop(0) — O(n), set не упорядочен.' },
        { prompt: `<code>is_valid(s)</code>: <code>True</code>, если скобки <code>()</code>, <code>[]</code>, <code>{}</code> в строке правильно открываются и закрываются. Остальные символы игнорируйте. Используйте стек.
<pre><code>is_valid('{[()]}')      → True
is_valid('([)]')        → False
is_valid('f(x[0]) + 1') → True
is_valid('((')          → False</code></pre>`, hints: ['Открывающую скобку — <code>st.append(ch)</code>; на закрывающей проверьте, не пуст ли стек и лежит ли сверху её пара.', 'В конце <code>return not st</code> — незакрытых скобок остаться не должно.'], check: { tests: `
assert is_valid('{[()]}') is True, "'{[()]}' — правильно"
assert is_valid('([)]') is False, "'([)]' — неправильно: нарушен порядок закрытия"
assert is_valid('f(x[0]) + 1') is True, 'Игнорируйте остальные символы'
assert is_valid('((') is False, 'Если осталась незакрытая скобка — False'
assert is_valid(')') is False, 'Закрывающая скобка при пустом стеке — False (а не IndexError)'
assert is_valid('') is True, 'Пустая строка — правильная'
` } },
        { prompt: `Обратная польская запись (RPN): <code>['2', '3', '+', '4', '*']</code> = (2 + 3) × 4 = 20. Кладите числа в стек; когда приходит операция, снимите два числа и положите результат обратно. <code>eval_rpn(tokens)</code> должна вернуть целое число. Деление отсекается в сторону нуля: <code>int(a / b)</code>.
<pre><code>eval_rpn(['2', '3', '+', '4', '*'])       → 20
eval_rpn(['10', '3', '-'])                → 7
eval_rpn(['7', '-2', '/'])                → -3</code></pre>`, hints: ['На операции сначала <code>b = st.pop()</code>, затем <code>a = st.pop()</code> — порядок важен (<code>a - b</code>).', 'Число кладите через <code>int(t)</code>; \'-2\' — отрицательное число, а не операция.'], check: { tests: `
assert eval_rpn(['2', '3', '+', '4', '*']) == 20, 'Ожидалось 20'
assert eval_rpn(['10', '3', '-']) == 7, "['10', '3', '-'] → 7 (10 − 3, а не наоборот)"
assert eval_rpn(['7', '-2', '/']) == -3, '7 / −2 = −3.5 → в сторону нуля −3'
assert eval_rpn(['42']) == 42, 'Одно число — оно само'
assert eval_rpn(['4', '13', '5', '/', '+']) == 6, '4 + 13 / 5 = 4 + 2 = 6'
` } },
        { prompt: `Напишите для колл-центра класс <code>CallCounter</code>. <code>ping(t)</code> — звонок поступил в момент <code>t</code> миллисекунд (время приходит по возрастанию); метод возвращает число звонков в интервале <code>[t − 3000, t]</code> (включая этот). Используйте <code>deque</code>: тест отправляет 100 000 звонков.
<pre><code>c = CallCounter()
c.ping(1)     → 1
c.ping(100)   → 2
c.ping(3001)  → 3
c.ping(3002)  → 3   # звонок в 1 мс вышел из окна</code></pre>`, hints: ['Новое время — <code>self.q.append(t)</code>.', '<code>while self.q[0] &lt; t - 3000: self.q.popleft()</code>, затем <code>len(self.q)</code>.'], check: { tests: `
_c = CallCounter()
_r = [_c.ping(1), _c.ping(100), _c.ping(3001), _c.ping(3002)]
assert _r == [1, 2, 3, 3], f'Ожидалось [1, 2, 3, 3], у вас {_r}'
_c = CallCounter()
assert _c.ping(5000) == 1 and _c.ping(9000) == 1, 'Звонок, вышедший из окна, не считается'
_c = CallCounter()
assert _c.ping(10) == 1 and _c.ping(10) == 2, 'Два звонка в один момент считаются оба'
import time as _time
_c = CallCounter(); _t0 = _time.perf_counter()
for _t in range(0, 5000000, 1000):
    _c.ping(_t)
_dt = _time.perf_counter() - _t0
assert _dt < 0.15, f'5000 звонков заняли {_dt:.2f} с — ping не должен просматривать всю историю. Убирайте старые из deque через popleft()'
_c = CallCounter()
_t0 = _time.perf_counter()
for _t in range(0, 100000):
    _last = _c.ping(_t)
_dt = _time.perf_counter() - _t0
assert _last == 3001, f'После 100 000 звонков в окне должно быть 3001, у вас {_last}'
assert _dt < 3, f'{_dt:.2f} с — слишком медленно. Убирайте старые моменты через deque.popleft()'
` } }
      ]
    },
    'dsa-6': {
      title: 'Linked list: связный список',
      body: `
<p><b>Linked list</b> — цепочка, в которой каждый узел (node) хранит значение и ссылку на следующий узел. Отличие от массива: элементы не лежат в памяти подряд, поэтому чтобы дойти до <code>k</code>-го элемента, нужно пройти <code>k</code> шагов от начала — O(n). Зато вставка в начало, вставка после известного узла или удаление — O(1): меняем только ссылки.</p>
<pre><code>class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

# 1 → 2 → 3
head = Node(1, Node(2, Node(3)))
cur = head
while cur:               # обход: O(n)
    print(cur.val)
    cur = cur.next</code></pre>
<table>
<tr><th>Операция</th><th>list (массив)</th><th>linked list</th></tr>
<tr><td>k-й элемент</td><td>O(1)</td><td>O(k)</td></tr>
<tr><td>Вставка в начало</td><td>O(n)</td><td>O(1)</td></tr>
<tr><td>Вставка в конец</td><td>O(1)</td><td>O(1), если хранить <code>tail</code></td></tr>
</table>
<h3>Пример: разворот списка</h3>
<p>Классическая задача — развернуть ссылки в обратную сторону. Держим три переменные: <code>prev</code> (начало уже развёрнутой части), <code>cur</code> (текущий узел), <code>nxt</code> (чтобы не потерять следующий).</p>
<pre><code>def reverse_list(head):
    prev = None
    cur = head
    while cur:
        nxt = cur.next     # 1) сохраняем следующий
        cur.next = prev    # 2) разворачиваем ссылку
        prev = cur         # 3) prev вперёд
        cur = nxt          # 4) cur вперёд
    return prev            # новая голова</code></pre>
<h3>Указатели с разной скоростью</h3>
<p>Есть ли в списке цикл (ссылается ли последний узел на один из прежних)? Метод Флойда: <code>slow</code> делает один шаг, <code>fast</code> — два. Если цикл есть, они обязательно встретятся; если нет, <code>fast</code> дойдёт до <code>None</code>. Дополнительная память — O(1). Тем же приёмом находят и середину списка: когда <code>fast</code> доходит до конца, <code>slow</code> стоит посередине.</p>
<div class="tip"><b>В реальной жизни:</b> в Python linked list редко пишут самостоятельно — <code>deque</code> внутри устроен похоже. Но его часто спрашивают на собеседованиях (interview), и он лежит в основе таких структур, как LRU-кэш и история браузера. <b>Частая ошибка:</b> не сохранить <code>cur.next</code> перед <code>cur.next = prev</code> — остаток списка теряется.</div>`,
      ex: [
        { prompt: 'Какова сложность получения 500 000-го элемента linked list из 1 000 000 узлов?', explain: 'Индекса нет: нужно пройти k шагов по ссылкам от начала, то есть O(k) = O(n).' },
        { prompt: `Допишите класс <code>LinkedList</code>. Храните <code>head</code> и <code>tail</code> — тогда все методы будут O(1) (кроме <code>to_list</code>):
<ul><li><code>push_front(x)</code> — вставка в начало;</li><li><code>push_back(x)</code> — вставка в конец;</li><li><code>pop_front()</code> — удалить первое значение и вернуть его (если список пуст — <code>None</code>);</li><li><code>__len__()</code> и <code>to_list()</code>.</li></ul>
<pre><code>ll = LinkedList()
ll.push_back(2); ll.push_back(3); ll.push_front(1)
ll.to_list()     → [1, 2, 3]
ll.pop_front()   → 1
len(ll)          → 2</code></pre>`, hints: ['Когда в пустой список добавляется первый элемент, и <code>head</code>, и <code>tail</code> становятся этим узлом.', 'Не забудьте сделать <code>tail = None</code>, если после <code>pop_front</code> список опустел.'], check: { tests: `
_l = LinkedList()
_l.push_back(2); _l.push_back(3); _l.push_front(1)
assert _l.to_list() == [1, 2, 3], f'Ожидалось [1, 2, 3], у вас {_l.to_list()}'
assert len(_l) == 3, 'len должен быть 3'
assert _l.pop_front() == 1 and _l.to_list() == [2, 3] and len(_l) == 2, 'pop_front должен вернуть 1 и оставить [2, 3]'
assert _l.pop_front() == 2 and _l.pop_front() == 3, 'pop_front по очереди: 2, 3'
assert _l.pop_front() is None and len(_l) == 0, 'pop_front из пустого списка возвращает None'
_l.push_back(9)
assert _l.to_list() == [9] and _l.head is _l.tail, 'push_back в опустевший список: head и tail — один узел'
_l2 = LinkedList(); _l2.push_front(5); _l2.push_back(6)
assert _l2.to_list() == [5, 6], 'После push_front push_back должен работать правильно (tail должен быть установлен)'
import time as _time
_l3 = LinkedList(); _t0 = _time.perf_counter()
for _i in range(8000):
    _l3.push_back(_i)
_dt = _time.perf_counter() - _t0
assert _dt < 0.15, f'8000 push_back заняли {_dt:.2f} с — вы проходите список с начала. Используйте ссылку tail, чтобы было O(1)'
_l3 = LinkedList(); _t0 = _time.perf_counter()
for _i in range(50000):
    _l3.push_back(_i)
assert _time.perf_counter() - _t0 < 2 and len(_l3) == 50000, 'push_back должен быть O(1): используйте ссылку tail'
` } },
        { prompt: `<code>reverse_list(head)</code> должна развернуть список <b>на месте</b> и вернуть новую голову (новые узлы не создавайте). Для пустого списка (<code>None</code>) — <code>None</code>.
<pre><code>1 → 2 → 3 → None   ⇒   3 → 2 → 1 → None</code></pre>`, hints: ['Внутри цикла: <code>nxt = cur.next</code>, <code>cur.next = prev</code>, <code>prev = cur</code>, <code>cur = nxt</code>.', 'В конце <code>prev</code> — новая голова.'], starter: `class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    prev = None
    cur = head
    # разверните ссылки в обратную сторону
    return head
`, check: { tests: `
def _mk(vals):
    h = None
    for v in reversed(vals):
        h = Node(v, h)
    return h
def _tl(h):
    out = []
    while h:
        out.append(h.val); h = h.next
    return out
_h = _mk([1, 2, 3]); _nodes = [_h, _h.next, _h.next.next]
_r = reverse_list(_h)
assert _tl(_r) == [3, 2, 1], f'Ожидалось [3, 2, 1], у вас {_tl(_r)}'
assert _r is _nodes[2], 'Не создавайте новые узлы: бывший последний узел должен стать новой головой'
assert reverse_list(None) is None, 'Для пустого списка — None'
assert _tl(reverse_list(_mk([7]))) == [7], 'Список из одного узла не меняется'
` } },
        { prompt: '<code>has_cycle(head)</code>: <code>True</code>, если в списке есть цикл. Используйте метод Флойда: <code>slow</code> — один шаг, <code>fast</code> — два; если они встретились — цикл есть. Дополнительная память должна быть O(1) (не собирайте узлы в set).', hints: ['<code>while fast and fast.next:</code> — если fast дошёл до конца, цикла нет.', 'Сравнивайте <code>slow is fast</code> (один ли это узел), а не по значению.'], check: { tests: `
_a = Node(1, Node(2, Node(3, Node(4))))
assert has_cycle(_a) is False, 'В списке 1→2→3→4 цикла нет'
_last = _a.next.next.next; _last.next = _a.next
assert has_cycle(_a) is True, 'Ссылка 4 → 2 создаёт цикл'
assert has_cycle(None) is False, 'В пустом списке цикла нет'
_s = Node(1); _s.next = _s
assert has_cycle(_s) is True, 'Узел, ссылающийся сам на себя, — цикл'
_d = Node(5, Node(5, Node(5)))
assert has_cycle(_d) is False, 'Значения одинаковые, но цикла нет: сравнивайте узлы через is'
` } }
      ]
    },
    'dsa-7': {
      title: 'Рекурсия и backtracking',
      body: `
<p><b>Рекурсия</b> — вызов функцией самой себя. В каждой рекурсивной функции две части: <b>базовый случай</b> (маленькая задача, которая дальше не делится и ответ на которую известен) и <b>рекурсивный шаг</b> (сведение задачи к такой же, но меньшей).</p>
<pre><code>def digit_sum(n):
    if n &lt; 10:                       # базовый случай
        return n
    return n % 10 + digit_sum(n // 10)  # последняя цифра + сумма остальных

digit_sum(2026)   # 6 + digit_sum(202) = 6 + 2 + digit_sum(20) = … = 10</code></pre>
<p>Каждый вызов добавляет в <b>call stack</b> новый «слой». Если базового случая нет или мы до него не доходим, стек переполняется — <code>RecursionError</code>. В Python предел глубины около 1000, поэтому вместо рекурсии глубиной 10⁵ пишем цикл.</p>
<h3>Backtracking: построение всех вариантов</h3>
<p>Backtracking — строим решение шаг за шагом: на каждом шаге делаем выбор, уходим вглубь, а затем <b>отменяем</b> выбор. Пример: перечислить все наборы покупки из 3 товаров в Kaspi Red {телефон, наушники, чехол}. Для каждого товара два выбора: берём / не берём → 2³ = 8 подмножеств.</p>
<pre><code>def subsets(items):
    res, cur = [], []
    def go(i):
        if i == len(items):          # решили по всем товарам
            res.append(cur[:])       # сохраняем копию!
            return
        cur.append(items[i])         # выбор: берём
        go(i + 1)
        cur.pop()                    # отменяем выбор
        go(i + 1)                    # выбор: не берём
    go(0)
    return res</code></pre>
<p>Подмножеств 2ⁿ, поэтому это O(n · 2ⁿ) — подходит только примерно до n = 20. Сила backtracking — в <b>отсечении</b> (pruning): останавливаемся, не заходя в заведомо негодную ветку. Например, при генерации скобок не ставим закрывающих больше, чем открытых.</p>
<div class="tip"><b>Частые ошибки:</b> (1) <code>res.append(cur)</code> — это не копия, а ссылка на один и тот же список; в конце все окажутся пустыми. Пишите <code>cur[:]</code>. (2) Не отменить выбор (<code>cur.pop()</code>). (3) Забыть базовый случай.</div>`,
      ex: [
        { prompt: 'Что произойдёт, если вызвать эту функцию как <code>f(5)</code>?<pre><code>def f(n):\n    return n * f(n - 1)</code></pre>', options: ['Вернёт 120', 'Вернёт 0', 'RecursionError: нет базового случая', 'Вернёт None'], explain: 'Нет условия остановки: f(5) → f(4) → … → f(−1000) … стек переполняется, и возникает RecursionError. Нужно if n &lt;= 1: return 1.' },
        { prompt: `<code>digit_sum(n)</code> должна вычислять сумму цифр неотрицательного целого числа <b>рекурсией</b> (без циклов и <code>str</code>).
<pre><code>digit_sum(2026) → 10
digit_sum(7)    → 7
digit_sum(0)    → 0</code></pre>`, hints: ['Базовый случай: если <code>n &lt; 10</code>, то само <code>n</code>.', 'Рекурсивный шаг: <code>n % 10 + digit_sum(n // 10)</code>.'], check: { tests: `
assert digit_sum(2026) == 10, f'digit_sum(2026) = 10, у вас {digit_sum(2026)}'
assert digit_sum(7) == 7 and digit_sum(0) == 0, 'Однозначное число — оно само'
assert digit_sum(99999) == 45, 'digit_sum(99999) = 45'
assert 'digit_sum' in digit_sum.__code__.co_names, 'Функция должна вызывать сама себя (рекурсия)'
` } },
        { prompt: `<code>subsets(items)</code> должна вернуть все подмножества списка с помощью backtracking (каждое подмножество — список, элементы в исходном порядке). Порядок самих подмножеств не важен.
<pre><code>subsets(['телефон', 'қап'])
→ [['телефон', 'қап'], ['телефон'], ['қап'], []]   # в любом порядке</code></pre>`, hints: ['Базовый случай <code>i == len(items)</code>: <code>res.append(cur[:])</code>.', 'Сначала <code>cur.append(items[i]); go(i + 1); cur.pop()</code>, затем без элемента <code>go(i + 1)</code>.'], check: { tests: `
_r = subsets(['телефон', 'қап'])
assert sorted(map(tuple, _r)) == sorted([('телефон', 'қап'), ('телефон',), ('қап',), ()]), f'Ожидалось четыре подмножества, у вас {_r}'
assert subsets([]) == [[]], 'Единственное подмножество пустого списка — []'
_r = subsets([1, 2, 3, 4])
assert len(_r) == 16 and len(set(map(tuple, _r))) == 16, f'Из 4 элементов — 16 разных подмножеств, у вас {len(_r)}. Сохраняйте копию cur[:]'
assert all(list(s) == sorted(s) for s in _r), 'Элементы должны стоять в исходном порядке'
` } },
        { prompt: `<code>gen_parens(n)</code> — вернуть все правильные последовательности из <code>n</code> пар скобок в виде <b>отсортированного</b> списка. Правило отсечения: <code>(</code> можно поставить, если открытых <code>&lt; n</code>; <code>)</code> можно поставить, если закрытых меньше, чем открытых.
<pre><code>gen_parens(2) → ['(())', '()()']
gen_parens(3) → ['((()))', '(()())', '(())()', '()(())', '()()()']</code></pre>`, hints: ['Базовый случай: <code>len(s) == 2 * n</code>.', 'Две ветки: <code>if opened &lt; n</code> и <code>if closed &lt; opened</code>.'], check: { tests: `
assert gen_parens(2) == ['(())', '()()'], f'gen_parens(2) = [(()), ()()], у вас {gen_parens(2)}'
assert gen_parens(3) == ['((()))', '(()())', '(())()', '()(())', '()()()'], 'gen_parens(3) даёт пять последовательностей'
assert gen_parens(1) == ['()'], "gen_parens(1) = ['()']"
assert len(gen_parens(8)) == 1430, 'Для n = 8 должно быть 1430 последовательностей (число Каталана)'
` } }
      ]
    },
    'dsa-8': {
      title: 'Binary search: поиск делением пополам',
      body: `
<p>Чтобы найти значение в отсортированном списке, не обязательно просматривать каждый элемент (O(n)). <b>Binary search</b> смотрит на средний элемент: если искомое больше — ищем в правой половине, если меньше — в левой. На каждом шаге область поиска сокращается вдвое, поэтому на 1 000 000 элементов нужно не больше ~20 шагов: O(log n).</p>
<pre><code>def binary_search(a, x):
    lo, hi = 0, len(a) - 1
    while lo &lt;= hi:
        mid = (lo + hi) // 2
        if a[mid] == x:
            return mid
        if a[mid] &lt; x:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1</code></pre>
<h3>Поиск границы (lower bound)</h3>
<p>Чаще спрашивают не «есть ли?», а «где первый элемент, не меньший <code>x</code>?». Например, первый из отсортированных по цене товаров, начиная с 15 000 ₸. Удобно писать с полуоткрытым интервалом <code>[lo, hi)</code>:</p>
<pre><code>def lower_bound(a, x):
    lo, hi = 0, len(a)
    while lo &lt; hi:
        mid = (lo + hi) // 2
        if a[mid] &lt; x:
            lo = mid + 1
        else:
            hi = mid
    return lo        # если все меньше x — len(a)</code></pre>
<p>В Python есть готовый вариант: <code>bisect.bisect_left(a, x)</code> — ровно это, <code>bisect_right</code> — первая позиция элемента, большего <code>x</code>.</p>
<h3>Binary search по ответу</h3>
<p>Самое мощное применение: не ищем ответ напрямую, а пишем функцию-проверку «подходит ли значение <code>C</code>?». Если из того, что <code>C</code> подходит, следует, что подходят и все большие значения (монотонность), то наименьшее подходящее <code>C</code> находим бинарным поиском. Пример: грузы из Алматы в Астану нужно доставить <b>в заданном порядке</b> за <code>D</code> дней; какова минимальная дневная вместимость? При заданной вместимости <code>C</code> число нужных дней считаем жадно (greedy) за O(n). Интервал поиска: <code>[max(weights), sum(weights)]</code>. Всего O(n log S).</p>
<div class="tip"><b>Частые ошибки:</b> (1) Путать <code>lo &lt;= hi</code> и <code>lo &lt; hi</code>, <code>hi = mid</code> и <code>hi = mid − 1</code> — получается бесконечный цикл. Выберите один шаблон и придерживайтесь его. (2) Применять binary search к неотсортированному списку.</div>`,
      ex: [
        { prompt: 'Какое наибольшее число сравнений (обращений к среднему элементу) сделает binary search на 1 000 000 отсортированных элементов? Запишите целым числом.', explain: '2²⁰ = 1 048 576 ≥ 1 000 000, поэтому достаточно ⌈log₂ 1 000 000⌉ = 20 шагов.' },
        { prompt: `<code>binary_search(a, x)</code>: вернуть индекс <code>x</code> в отсортированном <code>a</code>, а если его нет — <code>-1</code>. Напишите сами, без <code>in</code>, <code>index</code>, <code>bisect</code>. Тест проверяет тысячами запросов на 100 000 элементах.
<pre><code>binary_search([1200, 3400, 5600, 9900], 5600) → 2
binary_search([1200, 3400], 1000)             → -1</code></pre>`, hints: ['<code>while lo &lt;= hi:</code>, <code>mid = (lo + hi) // 2</code>.', 'Если <code>a[mid] &lt; x</code>, то <code>lo = mid + 1</code>, если больше — <code>hi = mid - 1</code>.'], check: { tests: `
assert binary_search([1200, 3400, 5600, 9900], 5600) == 2, 'Ожидалось 2'
assert binary_search([1200, 3400], 1000) == -1, 'Для отсутствующего значения — -1'
assert binary_search([], 5) == -1, 'Для пустого списка — -1'
assert binary_search([7], 7) == 0 and binary_search([7], 8) == -1, 'Список из одного элемента'
assert binary_search([1, 3, 5, 7, 9], 1) == 0 and binary_search([1, 3, 5, 7, 9], 9) == 4, 'Крайние элементы тоже должны находиться'
import time as _time, random as _random
_R = _random.Random(1)
_a = list(range(0, 200000, 2))
_qs = [_R.randrange(0, 200000) for _ in range(300)]
_t0 = _time.perf_counter()
for _q in _qs:
    binary_search(_a, _q)
_dt = _time.perf_counter() - _t0
assert _dt < 0.15, f'300 запросов заняли {_dt:.2f} с — похоже на линейный поиск. Напишите binary search за O(log n)'
_qs = [_R.randrange(0, 200000) for _ in range(5000)]
_t0 = _time.perf_counter()
_res = [binary_search(_a, _q) for _q in _qs]
_dt = _time.perf_counter() - _t0
assert all((_r == _q // 2) if _q % 2 == 0 else _r == -1 for _r, _q in zip(_res, _qs)), 'На большом списке ответы неверны'
assert _dt < 1.0, f'5000 запросов заняли {_dt:.2f} с — похоже на линейный поиск. Напишите binary search за O(log n)'
` } },
        { prompt: `<code>lower_bound(a, x)</code>: вернуть <b>наименьший</b> <code>i</code>, при котором <code>a[i] &gt;= x</code> в отсортированном <code>a</code>; если такого нет — <code>len(a)</code>. Значения могут повторяться.
<pre><code>lower_bound([5000, 8000, 8000, 15000, 22000], 8000)  → 1
lower_bound([5000, 8000, 8000, 15000, 22000], 9000)  → 3
lower_bound([5000, 8000], 30000)                     → 2</code></pre>`, hints: ['Полуоткрытый интервал: <code>while lo &lt; hi</code>.', 'Если <code>a[mid] &lt; x</code>, то <code>lo = mid + 1</code>, иначе <code>hi = mid</code>; в конце — <code>lo</code>.'], check: { tests: `
_a = [5000, 8000, 8000, 15000, 22000]
assert lower_bound(_a, 8000) == 1, f'Для 8000 — 1 (первое 8000), у вас {lower_bound(_a, 8000)}'
assert lower_bound(_a, 9000) == 3, 'Для 9000 — 3'
assert lower_bound(_a, 1) == 0, 'Для x меньше всех — 0'
assert lower_bound([5000, 8000], 30000) == 2, 'Для x больше всех — len(a)'
assert lower_bound([], 3) == 0, 'Для пустого списка — 0'
assert lower_bound([2, 2, 2, 2], 2) == 0, 'Если все элементы одинаковы — 0'
import bisect as _bisect, random as _random
_R = _random.Random(2)
_b = sorted(_R.randrange(100) for _ in range(300))
assert all(lower_bound(_b, _x) == _bisect.bisect_left(_b, _x) for _x in range(-1, 102)), 'На случайном списке не совпадает с bisect_left'
` } },
        { prompt: `Грузы отправляются из Алматы в Астану <b>в заданном порядке</b> (менять порядок нельзя). За один день грузовик забирает подряд идущие грузы общим весом не больше <code>C</code>. <code>min_capacity(weights, days)</code> — наименьшее <code>C</code>, при котором все грузы можно доставить за <code>days</code> дней. Используйте binary search по ответу: тест проверяет 100 000 грузов.
<pre><code>min_capacity([3, 2, 2, 4, 1, 4], 3)            → 6   # [3,2] [2,4] [1,4]
min_capacity([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5) → 15
min_capacity([10, 50], 5)                      → 50</code></pre>`, hints: ['<code>days_needed(cap)</code>: складывайте грузы по порядку и начинайте новый день, если сумма превышает <code>cap</code>.', 'Binary search на интервале <code>[max(weights), sum(weights)]</code>: если <code>days_needed(mid) &lt;= days</code>, то <code>hi = mid</code>, иначе <code>lo = mid + 1</code>.'], check: { tests: `
assert min_capacity([3, 2, 2, 4, 1, 4], 3) == 6, f'Ожидалось 6, у вас {min_capacity([3, 2, 2, 4, 1, 4], 3)}'
assert min_capacity([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5) == 15, 'Ожидалось 15'
assert min_capacity([10, 50], 5) == 50, 'Не может быть меньше самого тяжёлого груза'
assert min_capacity([5, 5, 5], 1) == 15, 'Всё за один день: сумма'
import time as _time, random as _random
_R = _random.Random(3)
_w = [_R.randint(1, 1000) for _ in range(200)]
_t0 = _time.perf_counter(); _c = min_capacity(_w, 2); _dt = _time.perf_counter() - _t0
assert _dt < 0.15, f'Для 200 грузов — {_dt:.2f} с. Используйте binary search, а не проверку вместимостей по одной'
_w = [_R.randint(1, 10000) for _ in range(100000)]
_t0 = _time.perf_counter(); _c = min_capacity(_w, 700); _dt = _time.perf_counter() - _t0
def _need(cap):
    d, load = 1, 0
    for w in _w:
        if load + w > cap:
            d += 1; load = 0
        load += w
    return d
assert _need(_c) <= 700 and _need(_c - 1) > 700, 'При n = 100 000 найденное C не наименьшее или не подходит'
assert _dt < 5, f'{_dt:.2f} с — слишком медленно. Используйте binary search, а не проверку вместимостей по одной'
` } }
      ]
    },
    'dsa-9': {
      title: 'Сортировка: insertion, merge, quick и key',
      body: `
<p>Сортировка — первый шаг многих алгоритмов: в отсортированном списке легко применять binary search, два указателя, искать повторы. Важно знать основные идеи, а на практике используют <code>sorted</code> / <code>list.sort</code> из Python (Timsort, O(n log n), устойчивая).</p>
<h3>Простые методы за O(n²)</h3>
<p><b>Bubble sort</b> сравнивает соседей и «всплывает» больший вправо. <b>Insertion sort</b> работает как с картами в руке: каждый новый элемент вставляется на своё место в уже отсортированной левой части. Оба в худшем случае O(n²), но insertion sort на почти отсортированном списке работает близко к O(n).</p>
<h3>Merge sort: разделяй и властвуй</h3>
<pre><code>def merge_sort(a):
    if len(a) &lt;= 1:
        return a
    mid = len(a) // 2
    left = merge_sort(a[:mid])
    right = merge_sort(a[mid:])
    out, i, j = [], 0, 0
    while i &lt; len(left) and j &lt; len(right):   # слияние двух отсортированных списков
        if left[i] &lt;= right[j]:
            out.append(left[i]); i += 1
        else:
            out.append(right[j]); j += 1
    out.extend(left[i:]); out.extend(right[j:])
    return out</code></pre>
<p>Список делится пополам log n раз, слияние на каждом уровне в сумме даёт O(n) — итого <b>O(n log n)</b>, всегда. Знак <code>&lt;=</code> сохраняет исходный порядок равных элементов — это <b>устойчивость</b> (stability).</p>
<h3>Quicksort</h3>
<p>Выбирает опорный элемент (pivot), делит список на «меньшие / равные / большие» и рекурсивно сортирует части. В среднем O(n log n), но если pivot всегда оказывается наименьшим/наибольшим (например, если брать первый элемент отсортированного списка) — O(n²). Поэтому pivot выбирают случайно.</p>
<h3>Сортировка по key в Python</h3>
<pre><code>students = [('Айгерім', 92), ('Бауыржан', 85), ('Әлия', 92), ('Данияр', 78)]
# По баллам по убыванию, при равенстве — по имени по возрастанию
sorted(students, key=lambda r: (-r[1], r[0]))
# [('Айгерім', 92), ('Әлия', 92), ('Бауыржан', 85), ('Данияр', 78)]</code></pre>
<p>Ключ-кортеж сравнивается по первому элементу, а при равенстве — по второму. Чтобы взять числовое поле по убыванию, ставим перед ним минус. Замечание: порядок казахских букв в Unicode не полностью совпадает с алфавитным (коды <code>'Ә'</code> стоят после кириллицы), в реальном проекте нужен специальный ключ.</p>
<div class="tip"><b>Запомните:</b> любая сортировка на сравнениях в худшем случае делает не меньше ~n log n сравнений. А если значения лежат в небольшом диапазоне (например, баллы 0–100), <b>counting sort</b> сортирует за O(n + k).</div>`,
      ex: [
        { prompt: 'Quicksort всегда берёт в качестве pivot <b>первый</b> элемент. На каком входе он работает медленнее всего (O(n²))?', options: ['Случайно перемешанный список', 'Уже отсортированный список', 'Список, где все элементы разные', 'Список чётной длины'], explain: 'В отсортированном списке первый элемент — наименьший: одна часть пуста, в другой остаётся n−1 элемент. Глубина n, итого O(n²).' },
        { prompt: 'Сколько раз insertion sort поменяет местами соседей при сортировке [4, 3, 2, 1]? (Это число инверсий в списке — пар, где i &lt; j, но a[i] &gt; a[j].)', explain: 'Каждая пара стоит в обратном порядке: 4·3/2 = 6 инверсий, insertion sort исправляет каждую одним обменом.' },
        { prompt: `Результаты олимпиады даны кортежами <code>(имя, баллы)</code>. <code>rank(rows)</code> должна вернуть новый список, отсортированный по баллам по <b>убыванию</b>, а при равных баллах — по имени по <b>возрастанию</b>. Используйте <code>sorted</code> и <code>key</code>.
<pre><code>rank([('Бауыржан', 85), ('Ерлан', 92), ('Айгерім', 92)])
→ [('Айгерім', 92), ('Ерлан', 92), ('Бауыржан', 85)]</code></pre>`, hints: ['<code>key=lambda r: (...)</code> — ключ-кортеж.', 'Чтобы баллы шли по убыванию — <code>-r[1]</code>, затем <code>r[0]</code>.'], check: { tests: `
_r = rank([('Бауыржан', 85), ('Ерлан', 92), ('Айгерім', 92)])
assert _r == [('Айгерім', 92), ('Ерлан', 92), ('Бауыржан', 85)], f'Ожидалось Айгерім, Ерлан, Бауыржан, у вас {_r}'
assert rank([]) == [], 'Для пустого списка — []'
_x = [('b', 1), ('a', 1), ('c', 3)]
assert rank(_x) == [('c', 3), ('a', 1), ('b', 1)] and _x == [('b', 1), ('a', 1), ('c', 3)], 'Верните новый список, исходный не меняйте'
` } },
        { prompt: `Напишите <code>merge_sort(a)</code>: она должна вернуть <b>новый</b> отсортированный список. <code>sorted</code> и <code>.sort</code> использовать нельзя. Тест проверяет 50 000 элементов — метод за O(n²) не пройдёт.
<pre><code>merge_sort([5, 2, 9, 1, 5]) → [1, 2, 5, 5, 9]</code></pre>`, hints: ['<code>left = merge_sort(a[:mid])</code>, <code>right = merge_sort(a[mid:])</code>.', 'Слияние: два указателя <code>i</code>, <code>j</code>; добавляйте меньший в <code>out</code>, а в конце остатки через <code>extend</code>.'], starter: `def merge_sort(a):
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    # отсортируйте обе половины и слейте их
    return a
`, check: { tests: `
assert merge_sort([5, 2, 9, 1, 5]) == [1, 2, 5, 5, 9], f'Ожидалось [1, 2, 5, 5, 9], у вас {merge_sort([5, 2, 9, 1, 5])}'
assert merge_sort([]) == [] and merge_sort([3]) == [3], 'Пустой список и список из одного элемента'
_names = merge_sort.__code__.co_names
assert 'sorted' not in _names and 'sort' not in _names, 'Не используйте sorted / .sort — напишите слияние сами'
import random as _random, time as _time
_R = _random.Random(4)
_a = [_R.randint(-1000, 1000) for _ in range(2000)]
assert merge_sort(_a) == sorted(_a), 'На случайных 2000 элементах результат неверен'
_a = [_R.randint(0, 10**9) for _ in range(8000)]
_t0 = _time.perf_counter(); merge_sort(_a); _dt = _time.perf_counter() - _t0
assert _dt < 0.5, f'8000 элементов заняли {_dt:.2f} с — похоже на сортировку за O(n²). Делите пополам и сливайте (O(n log n))'
_a = [_R.randint(0, 10**9) for _ in range(50000)]
_t0 = _time.perf_counter(); _s = merge_sort(_a); _dt = _time.perf_counter() - _t0
assert _s == sorted(_a), 'На 50 000 элементах результат неверен'
assert _dt < 4, f'50 000 элементов заняли {_dt:.2f} с — должно быть O(n log n)'
` } }
      ]
    },
    'dsa-10': {
      title: 'Деревья: binary tree и BST',
      body: `
<p><b>Дерево</b> (tree) — иерархия узлов: один корень (root), у каждого узла есть дети, циклов нет. Файловая система, оргструктура, HTML DOM — всё это деревья. В <b>binary tree</b> у каждого узла не больше двух детей: <code>left</code> и <code>right</code>.</p>
<pre><code>class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

#        8
#       / \\
#      3   10
#     / \\    \\
#    1   6    14
root = TreeNode(8, TreeNode(3, TreeNode(1), TreeNode(6)), TreeNode(10, None, TreeNode(14)))</code></pre>
<h3>Обход (traversal)</h3>
<ul>
<li><b>Preorder</b> (корень, левое, правое): 8, 3, 1, 6, 10, 14 — для копирования дерева.</li>
<li><b>Inorder</b> (левое, корень, правое): 1, 3, 6, 8, 10, 14 — в BST даёт отсортированный порядок.</li>
<li><b>Postorder</b> (левое, правое, корень): 1, 6, 3, 14, 10, 8 — удаление, подсчёт размера папок.</li>
<li><b>Level order</b> (по уровням, BFS, через <code>deque</code>): [8], [3, 10], [1, 6, 14].</li>
</ul>
<pre><code>def height(node):
    if node is None:
        return 0
    return 1 + max(height(node.left), height(node.right))</code></pre>
<h3>Binary Search Tree (BST)</h3>
<p>Правило BST: значения в левом поддереве каждого узла меньше его, в правом — больше. Тогда поиск похож на binary search: начинаем с корня, если меньше — идём влево, если больше — вправо. Если дерево сбалансировано, его высота ≈ log n, поиск и вставка — O(log n). Но если вставлять отсортированные значения по порядку, дерево превращается в «список» — высота n, операции O(n). Поэтому в продакшене используют самобалансирующиеся деревья (red-black, AVL, B-tree — индексы баз данных).</p>
<pre><code>def bst_insert(node, x):
    if node is None:
        return TreeNode(x)
    if x &lt; node.val:
        node.left = bst_insert(node.left, x)
    elif x &gt; node.val:
        node.right = bst_insert(node.right, x)
    return node            # равное значение повторно не добавляется</code></pre>
<div class="tip"><b>Частые ошибки:</b> (1) Обращаться к <code>node.left</code>, не проверив узел на <code>None</code>, — AttributeError. (2) Не сохранять результат рекурсивной вставки через <code>node.left = ...</code> — новый узел не прикрепляется к дереву.</div>`,
      ex: [
        { prompt: 'Каков <b>postorder</b>-обход дерева из урока (корень 8)?', explain: 'Postorder: сначала левое поддерево (1, 6, 3), затем правое (14, 10), в конце корень 8.' },
        { prompt: `<code>height(node)</code> должна рекурсивно вернуть высоту дерева (число узлов от корня до самого глубокого листа). Пустое дерево (<code>None</code>) — 0.
<pre><code>height(TreeNode(1, TreeNode(2, TreeNode(3)))) → 3
height(None)                                  → 0</code></pre>`, hints: ['Базовый случай: <code>node is None</code> → 0.', '<code>1 + max(height(node.left), height(node.right))</code>.'], check: { tests: `
assert height(None) == 0, 'Высота пустого дерева — 0'
assert height(TreeNode(5)) == 1, 'Один узел — 1'
assert height(TreeNode(1, TreeNode(2, TreeNode(3)))) == 3, '3 узла, вытянутые влево, — 3'
_t = TreeNode(8, TreeNode(3, TreeNode(1), TreeNode(6, TreeNode(4))), TreeNode(10, None, TreeNode(14)))
assert height(_t) == 4, f'Дерево из урока с добавленным 4-м уровнем: 4, у вас {height(_t)}'
` } },
        { prompt: `Допишите класс <code>BST</code>:
<ul><li><code>insert(x)</code> — добавить значение (существующее повторно не добавляется);</li><li><code>contains(x)</code> — <code>True</code>/<code>False</code>, проходя дерево от корня вниз <b>по одному пути</b>;</li><li><code>inorder()</code> — отсортированный список значений.</li></ul>
<pre><code>t = BST()
for x in [8, 3, 10, 1, 6, 14]: t.insert(x)
t.contains(6)   → True
t.contains(7)   → False
t.inorder()     → [1, 3, 6, 8, 10, 14]</code></pre>`, hints: ['<code>insert</code>: от корня идите влево, если меньше, и вправо, если больше, и прикрепите новый <code>TreeNode</code> на свободное место.', '<code>inorder</code>: внутренняя функция <code>go(node)</code> — левое, узел, правое.'], check: { tests: `
_t = BST()
for _x in [8, 3, 10, 1, 6, 14]:
    _t.insert(_x)
assert _t.inorder() == [1, 3, 6, 8, 10, 14], f'inorder должен быть отсортирован, у вас {_t.inorder()}'
assert _t.contains(6) is True and _t.contains(7) is False, 'contains(6) True, contains(7) False'
assert _t.root.val == 8 and _t.root.left.val == 3 and _t.root.right.right.val == 14, 'Неверная структура BST: меньшее значение — влево, большее — вправо'
_t.insert(6)
assert _t.inorder() == [1, 3, 6, 8, 10, 14], 'Не добавляйте существующее значение повторно'
assert BST().contains(1) is False and BST().inorder() == [], 'Пустое дерево'
import random as _random
_R = _random.Random(5); _vals = _R.sample(range(100000), 3000)
_b = BST()
for _x in _vals:
    _b.insert(_x)
assert _b.inorder() == sorted(_vals), 'На 3000 случайных значениях inorder неверен'
_seen = set(_vals)
assert all(_b.contains(_q) == (_q in _seen) for _q in range(0, 100000, 37)), 'В дереве из 3000 значений contains работает неверно'
` } },
        { prompt: `<code>level_order(root)</code> должна обойти дерево по уровням и вернуть список значений каждого уровня (используйте <code>deque</code>).
<pre><code>#      8
#     / \\
#    3   10
#   / \\    \\
#  1   6    14
level_order(root) → [[8], [3, 10], [1, 6, 14]]
level_order(None) → []</code></pre>`, hints: ['<code>q = deque([root])</code>; в каждом проходе <code>len(q)</code> — число узлов на одном уровне.', 'Снимайте узлы этого уровня через <code>popleft</code> и добавляйте их детей в очередь.'], check: { tests: `
_t = TreeNode(8, TreeNode(3, TreeNode(1), TreeNode(6)), TreeNode(10, None, TreeNode(14)))
assert level_order(_t) == [[8], [3, 10], [1, 6, 14]], f'Ожидалось [[8], [3, 10], [1, 6, 14]], у вас {level_order(_t)}'
assert level_order(None) == [], 'Для пустого дерева — []'
assert level_order(TreeNode(1, None, TreeNode(2, TreeNode(3)))) == [[1], [2], [3]], 'Однобокое дерево'
` } }
      ]
    },
    'dsa-11': {
      title: 'Heap и priority queue: top-k',
      body: `
<p><b>Heap</b> (куча) — структура, которая всегда за O(1) показывает наименьший (или наибольший) элемент, а добавление и извлечение выполняет за O(log n). Это «полное» binary tree, но хранится оно в массиве: дети узла <code>i</code> — <code>2i+1</code> и <code>2i+2</code>. Правило: родитель меньше своих детей (min-heap).</p>
<p>В Python модуль <code>heapq</code> управляет обычным списком как min-heap:</p>
<pre><code>import heapq
h = []
heapq.heappush(h, 5000)
heapq.heappush(h, 1200)
heapq.heappush(h, 3400)
h[0]                 # 1200 — наименьший, O(1)
heapq.heappop(h)     # 1200, O(log n)
heapq.heapify(arr)   # превратить список в heap на месте, O(n)</code></pre>
<p>Если нужен max-heap, кладём значения со знаком минус: <code>heappush(h, -x)</code>. Можно класть и кортежи: <code>(приоритет, имя)</code> — сравнение идёт по первому элементу.</p>
<h3>Пример: top-k</h3>
<p>Нужно найти 10 самых продаваемых из 1 000 000 товаров Kaspi. Сортировать всё — O(n log n). Лучше: держим <b>min-heap</b> размера <code>k</code>. Корень heap — «самый слабый из лучших k». Если новое число больше него, выбрасываем слабейшего и кладём новое. Всего O(n log k).</p>
<pre><code>def top_k(nums, k):
    h = []
    for x in nums:
        if len(h) &lt; k:
            heapq.heappush(h, x)
        elif x &gt; h[0]:
            heapq.heapreplace(h, x)   # pop + push за один шаг
    return sorted(h, reverse=True)</code></pre>
<p>Готовые варианты: <code>heapq.nlargest(k, nums)</code>, <code>heapq.nsmallest(k, nums)</code>. Heap также используется в алгоритме Дейкстры, в планировщиках задач, при слиянии k отсортированных списков.</p>
<div class="tip"><b>Частые ошибки:</b> (1) <code>heapq</code> — только min-heap; для max — знак минус. (2) Список-heap не отсортирован полностью: <code>h[1]</code> не обязательно второй по величине снизу. (3) Если в кортежах первые поля равны, сравниваются вторые — если это несравнимые объекты, будет ошибка; поставьте между ними порядковый номер.</div>`,
      ex: [
        { prompt: 'Какова сложность добавления элемента в min-heap <code>heapq</code> (<code>heappush</code>) и извлечения наименьшего (<code>heappop</code>)?', options: ['O(1) и O(1)', 'O(log n) и O(log n)', 'O(n) и O(1)', 'O(n log n) и O(n)'], explain: 'Новый элемент поднимается вверх по высоте дерева (log n); при извлечении последний элемент ставится в корень и опускается вниз за log n шагов.' },
        { prompt: `<code>top_k(nums, k)</code> — вернуть <code>k</code> наибольших чисел в порядке <b>убывания</b>. Используйте min-heap размера k (тест проверяет 100 000 чисел). Если <code>k</code> больше длины, верните все.
<pre><code>top_k([120, 450, 90, 450, 300], 2) → [450, 450]
top_k([5, 1], 5)                   → [5, 1]</code></pre>`, hints: ['Если в heap меньше k элементов — <code>heappush</code>; иначе, когда <code>x &gt; h[0]</code>, — <code>heapreplace</code>.', 'В конце — <code>sorted(h, reverse=True)</code>.'], check: { tests: `
assert top_k([120, 450, 90, 450, 300], 2) == [450, 450], f'Ожидалось [450, 450], у вас {top_k([120, 450, 90, 450, 300], 2)}'
assert top_k([5, 1], 5) == [5, 1], 'Если k больше длины — все по убыванию'
assert top_k([], 3) == [] and top_k([4, 2], 0) == [], 'Случаи с пустым результатом'
import random as _random
_R = _random.Random(6)
_a = [_R.randint(0, 10**6) for _ in range(100000)]
assert top_k(_a, 10) == sorted(_a, reverse=True)[:10], 'На 100 000 чисел top-10 неверен'
` } },
        { prompt: `Магазины в трёх городах прислали продажи в виде списков, отсортированных по времени. <code>merge_k(lists)</code> должна слить их в один отсортированный список. Держите в heap <code>(значение, номер_списка, индекс)</code>: O(N log k).
<pre><code>merge_k([[1, 4, 9], [2, 3], [5]]) → [1, 2, 3, 4, 5, 9]
merge_k([[], [7]])                 → [7]</code></pre>`, hints: ['Положите в heap первый элемент каждого непустого списка в виде <code>(lst[0], i, 0)</code>.', 'Извлеките наименьший через <code>heappop</code> и положите следующий элемент того же списка (<code>j + 1</code>).'], check: { tests: `
assert merge_k([[1, 4, 9], [2, 3], [5]]) == [1, 2, 3, 4, 5, 9], f'Ожидалось [1, 2, 3, 4, 5, 9], у вас {merge_k([[1, 4, 9], [2, 3], [5]])}'
assert merge_k([[], [7]]) == [7], 'Пропускайте пустые списки'
assert merge_k([]) == [] and merge_k([[], []]) == [], 'Если все пусты — []'
assert merge_k([[1, 1], [1]]) == [1, 1, 1], 'Равные значения'
import random as _random
_R = _random.Random(7)
_ls = [sorted(_R.randint(0, 1000) for _ in range(_R.randint(0, 50))) for _ in range(200)]
assert merge_k(_ls) == sorted(x for l in _ls for x in l), 'Ошибка при слиянии 200 списков'
` } }
      ]
    },
    'dsa-12': {
      title: 'Графы: BFS, DFS, кратчайший путь',
      body: `
<p><b>Граф</b> — вершины (vertices) и соединяющие их рёбра (edges). Города и дороги, друзья в социальной сети, зависимости — всё это графы. Чаще всего храним его как <b>adjacency list</b>: для каждой вершины — список соседей. Память — O(V + E).</p>
<pre><code>roads = [('Алматы', 'Қонаев'), ('Алматы', 'Талдықорған'), ('Қонаев', 'Талдықорған'), ('Астана', 'Қарағанды')]
from collections import defaultdict
adj = defaultdict(list)
for a, b in roads:          # неориентированный граф: в обе стороны
    adj[a].append(b)
    adj[b].append(a)</code></pre>
<h3>BFS — поиск в ширину</h3>
<p>Из начальной вершины расходится по уровням через очередь (<code>deque</code>): сначала вершины на расстоянии 1 шага, потом 2 шагов… Поэтому в <b>невзвешенном</b> графе BFS даёт кратчайший путь (по числу шагов). Сложность O(V + E).</p>
<pre><code>from collections import deque
def bfs_dist(adj, start):
    dist = {start: 0}
    q = deque([start])
    while q:
        u = q.popleft()
        for v in adj[u]:
            if v not in dist:           # в каждую вершину заходим один раз
                dist[v] = dist[u] + 1
                q.append(v)
    return dist</code></pre>
<h3>DFS — поиск в глубину</h3>
<p>Идёт по одному пути как можно глубже, а упёршись в тупик, возвращается назад (стек или рекурсия). Используется для подсчёта компонент связности, поиска циклов, топологической сортировки. Не забывайте отмечать каждую вершину в <code>visited</code> — иначе в цикле будете ходить бесконечно.</p>
<h3>Сетка (grid) — тоже граф</h3>
<p>Если карта города задана символами <code>'.'</code> (дорога) и <code>'#'</code> (здание), каждая клетка — вершина, а соседи сверху/снизу/слева/справа — рёбра. Путь курьера из (0, 0) в правый нижний угол за наименьшее число шагов — задача на BFS. Соседей обходим через <code>for dr, dc in ((1,0), (-1,0), (0,1), (0,-1))</code> и проверяем, что не вышли за границу.</p>
<div class="tip">Для <b>взвешенного графа</b> (дороги разной длины) BFS не подходит — нужен алгоритм <b>Дейкстры</b>: похож на BFS, но вместо deque — heap, который выдаёт ближайшую вершину. Вы напишете его в сборнике задач «Сложные».</div>`,
      ex: [
        { prompt: 'На карте метро (считаем, что все перегоны одинаковые) нужно найти путь от станции А до станции Б с наименьшим числом остановок. Какой алгоритм?', explain: 'В невзвешенном графе BFS открывает вершины в порядке расстояния, поэтому даёт кратчайший путь. DFS кратчайший путь не гарантирует.' },
        { prompt: `<code>count_components(n, edges)</code>: даны вершины <code>0..n−1</code> и неориентированные рёбра. Верните число компонент связности (DFS или BFS). Например, сёла и дороги между ними: сколько отдельных «островов»?
<pre><code>count_components(5, [(0, 1), (1, 2), (3, 4)]) → 2
count_components(3, [])                       → 3</code></pre>`, hints: ['<code>seen = [False] * n</code>; с каждой непосещённой вершины начинается новая компонента.', 'DFS со стеком (или deque): отмечайте соседей в <code>seen</code> и кладите в стек. Остерегайтесь глубокой рекурсии.'], check: { tests: `
assert count_components(5, [(0, 1), (1, 2), (3, 4)]) == 2, 'Ожидалось 2'
assert count_components(3, []) == 3, 'Если рёбер нет, каждая вершина — отдельная компонента'
assert count_components(1, []) == 1, 'Одна вершина — одна компонента'
assert count_components(4, [(0, 1), (1, 2), (2, 0), (3, 3)]) == 2, 'Цикл и петля'
_n = 100000
_e = [(i, i + 1) for i in range(0, _n - 1) if i % 1000 != 999]
assert count_components(_n, _e) == 100, f'В цепочках из 100 000 вершин должно быть 100 компонент, у вас {count_components(_n, _e)}'
` } },
        { prompt: `Карта курьера — список строк: <code>'.'</code> — можно пройти, <code>'#'</code> — здание. <code>shortest_path(grid)</code> должна вернуть наименьшее число шагов от левого верхнего угла до правого нижнего (ходить можно вверх/вниз/влево/вправо); если пути нет или один из углов — <code>'#'</code>, вернуть <code>-1</code>.
<pre><code>shortest_path(['..#',
               '#..',
               '#..'])   → 4
shortest_path(['.#',
               '#.'])    → -1</code></pre>`, hints: ['Матрица <code>dist</code> (-1 — ещё не посещено), <code>q = deque([(0, 0)])</code>.', 'Четыре направления; проверяйте границу, <code>\'#\'</code> и посещённость.'], check: { tests: `
assert shortest_path(['..#', '#..', '#..']) == 4, f'Ожидалось 4, у вас {shortest_path(["..#", "#..", "#.."])}'
assert shortest_path(['.#', '#.']) == -1, 'Если пути нет — -1'
assert shortest_path(['.']) == 0, 'Старт и финиш — одна клетка: 0'
assert shortest_path(['#.', '..']) == -1, 'Если стартовая клетка — здание, -1'
assert shortest_path(['....', '.##.', '....']) == 5, 'На карте 3×4 — 5 шагов'
from collections import deque as _dq
def _ref(g):
    R, C = len(g), len(g[0]); d = {(0, 0): 0}; q = _dq([(0, 0)])
    while q:
        r, c = q.popleft()
        for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
            if 0 <= nr < R and 0 <= nc < C and g[nr][nc] == '.' and (nr, nc) not in d:
                d[(nr, nc)] = d[(r, c)] + 1; q.append((nr, nc))
    return d.get((R - 1, C - 1), -1)
_g = [('#' * 199 + '.') if i % 4 == 1 else ('.' + '#' * 199) if i % 4 == 3 else '.' * 200 for i in range(201)]
assert shortest_path(_g) == _ref(_g), f'В большом лабиринте-«змейке» ожидалось {_ref(_g)}, у вас {shortest_path(_g)}'
` } }
      ]
    },
    'dsa-13': {
      title: 'Динамическое программирование',
      body: `
<p><b>Динамическое программирование</b> (DP) — если задача разбивается на одинаковые подзадачи, которые встречаются снова и снова, мы решаем каждую подзадачу <b>один раз</b> и сохраняем ответ. Есть два способа: <b>memoization</b> (сверху вниз: рекурсия + кэш) и <b>tabulation</b> (снизу вверх: заполнение таблицы, начиная с маленьких задач).</p>
<h3>Пример 1: лестница</h3>
<p>На лестнице к Кок-Тобе <code>n</code> ступенек, за один шаг поднимаемся на 1 или 2 ступеньки. Сколько есть способов? Если последний шаг — 1 ступенька, то перед ним — способы дойти до <code>n−1</code>; если 2 ступеньки — до <code>n−2</code>. Значит, <code>ways(n) = ways(n−1) + ways(n−2)</code>.</p>
<pre><code># Наивная рекурсия: O(2ⁿ) — ways(40) очень медленно, одна подзадача решается миллион раз
from functools import lru_cache
@lru_cache(maxsize=None)            # memoization: O(n)
def ways(n):
    if n &lt;= 1:
        return 1
    return ways(n - 1) + ways(n - 2)

def ways_tab(n):                    # tabulation: O(n), без рекурсии
    a, b = 1, 1                     # ways(0), ways(1)
    for _ in range(n - 1):
        a, b = b, a + b
    return b if n &gt;= 1 else 1</code></pre>
<h3>Пример 2: монеты (coin change)</h3>
<p>Даны номиналы монет, нужно набрать <code>amount</code> тенге наименьшим числом монет. Жадный способ (начинать с самой крупной монеты) не всегда верен: монетами [1, 3, 4] 6 = 4+1+1 (3 монеты), а правильно 3+3 (2 монеты). DP: <code>dp[x]</code> — наименьшее число монет для суммы <code>x</code>. <code>dp[0] = 0</code>, <code>dp[x] = min(dp[x − c] + 1)</code> по всем <code>c ≤ x</code>. Сложность O(amount · число монет).</p>
<h3>Пример 3: наибольшая возрастающая подпоследовательность (LIS)</h3>
<p>Самая длинная строго возрастающая последовательность (не обязательно подряд) из дневных значений курса тенге. DP за O(n²): <code>dp[i] = 1 + max(dp[j])</code>, где <code>j &lt; i</code> и <code>a[j] &lt; a[i]</code>. Более быстрый метод за O(n log n): <code>tails[k]</code> — наименьший последний элемент среди возрастающих последовательностей длины <code>k+1</code>. Для каждого нового <code>x</code> находим позицию <code>bisect_left(tails, x)</code> и заменяем элемент или добавляем в конец; ответ — <code>len(tails)</code>.</p>
<div class="tip"><b>Рецепт решения задачи на DP:</b> (1) определите состояние (что означает <code>dp[i]</code>?); (2) запишите формулу перехода; (3) базовые значения; (4) порядок заполнения; (5) в какой ячейке ответ. В Python глубина рекурсии ограничена — для больших n tabulation надёжнее.</div>`,
      ex: [
        { prompt: 'В чём разница между memoization и tabulation?', options: ['Memoization работает только со строками, tabulation — только с числами', 'Memoization — рекурсия + кэш (сверху вниз), tabulation — заполнение таблицы циклом, начиная с маленьких задач (снизу вверх)', 'Tabulation всегда O(2ⁿ)', 'Разницы нет'], explain: 'Оба способа решают каждую подзадачу один раз; разница — в направлении заполнения и наличии рекурсии.' },
        { prompt: `<code>climb(n)</code> — число способов подняться по лестнице из <code>n</code> ступенек шагами по 1 или 2. <code>climb(0) = 1</code>. Тест проверяет n = 90, поэтому наивная рекурсия не пройдёт — используйте tabulation или memoization.
<pre><code>climb(3) → 3    # 1+1+1, 1+2, 2+1
climb(5) → 8</code></pre>`, hints: ['<code>a, b = 1, 1</code> — climb(0), climb(1).', 'В цикле — <code>a, b = b, a + b</code>.'], check: { tests: `
assert climb(0) == 1 and climb(1) == 1, 'climb(0) = climb(1) = 1'
assert climb(3) == 3 and climb(5) == 8, 'climb(3) = 3, climb(5) = 8'
import time as _time
_t0 = _time.perf_counter(); _v = climb(32); _dt = _time.perf_counter() - _t0
assert _v == 3524578, 'climb(32) = 3524578'
assert _dt < 0.05, f'climb(32) занял {_dt:.2f} с — это экспоненциальная рекурсия. Вычисляйте каждое значение один раз (DP)'
assert climb(90) == 4660046610375530309, 'climb(90) = 4660046610375530309'
` } },
        { prompt: `<code>coin_change(coins, amount)</code> — наименьшее число монет, чтобы набрать <code>amount</code> тенге; если набрать нельзя — <code>-1</code>. Монет каждого номинала бесконечно много. Жадный способ не подходит — напишите DP.
<pre><code>coin_change([1, 3, 4], 6)              → 2    # 3 + 3
coin_change([10, 20, 50, 100, 200], 370) → 4  # 200 + 100 + 50 + 20
coin_change([5, 10], 3)                → -1</code></pre>`, hints: ['<code>for x in range(1, amount + 1)</code>, а внутри для каждой монеты <code>c &lt;= x</code> — <code>dp[x] = min(dp[x], dp[x - c] + 1)</code>.', 'Если в конце <code>dp[amount]</code> бесконечно — -1.'], check: { tests: `
assert coin_change([1, 3, 4], 6) == 2, f'Монетами [1, 3, 4] 6 = 3 + 3: 2 монеты, у вас {coin_change([1, 3, 4], 6)}'
assert coin_change([10, 20, 50, 100, 200], 370) == 4, '370 = 200 + 100 + 50 + 20'
assert coin_change([5, 10], 3) == -1, 'Если набрать нельзя — -1'
assert coin_change([7], 0) == 0, '0 тенге — 0 монет'
assert coin_change([2], 3) == -1, 'Монетами [2] 3 не набрать'
assert coin_change([1, 5, 10, 20, 50, 100, 200], 9999) == 58, '9999 тенге можно набрать 58 монетами'
` } },
        { prompt: `<code>lis_length(a)</code> — длина наибольшей строго возрастающей подпоследовательности (не обязательно подряд). Тест проверяет 100 000 элементов: O(n²) не пройдёт — используйте метод <code>tails</code> + <code>bisect_left</code>.
<pre><code>lis_length([10, 9, 2, 5, 3, 7, 101, 18]) → 4   # 2, 3, 7, 18
lis_length([7, 7, 7])                    → 1
lis_length([])                           → 0</code></pre>`, hints: ['Для каждого <code>x</code> — <code>i = bisect_left(tails, x)</code>.', 'Если <code>i == len(tails)</code> — <code>append</code>, иначе <code>tails[i] = x</code>; ответ — <code>len(tails)</code>.'], check: { tests: `
assert lis_length([10, 9, 2, 5, 3, 7, 101, 18]) == 4, f'Ожидалось 4, у вас {lis_length([10, 9, 2, 5, 3, 7, 101, 18])}'
assert lis_length([7, 7, 7]) == 1, 'Строгое возрастание: равные значения не считаются'
assert lis_length([]) == 0, 'Для пустого списка — 0'
assert lis_length([1, 2, 3, 4]) == 4 and lis_length([4, 3, 2, 1]) == 1, 'Возрастающий и убывающий списки'
import time as _time, random as _random
_R = _random.Random(8)
_a = [_R.randint(0, 10**6) for _ in range(6000)]
_t0 = _time.perf_counter(); lis_length(_a); _dt = _time.perf_counter() - _t0
assert _dt < 0.15, f'Для n=6000 — {_dt:.2f} с, это O(n²). Напишите O(n log n) через bisect'
_a = list(range(0, 200000, 2))
assert lis_length(_a) == 100000, 'На возрастающих 100 000 элементах — 100 000'
_a = [(_i % 1000) * 1000 + _i // 1000 for _i in range(100000)]
assert lis_length(_a) == 1099, f'Тест n = 100 000: ожидалось 1099, у вас {lis_length(_a)}'
` } }
      ]
    },
    'dsa-p1': {
      title: 'Задачи: Лёгкие',
      body: `
<p>Этот урок — сборник задач в стиле LeetCode. Все они <b>лёгкого</b> уровня: один проход (O(n)), hash map, два указателя, prefix sum. В каждой задаче дана сигнатура функции; тесты проверяют крайние случаи (пустой список, один элемент, все одинаковые), а некоторые — вход из 100 000 элементов.</p>
<h3>Порядок решения задачи</h3>
<ol>
<li><b>Перескажите условие своими словами.</b> Что на входе, что на выходе? Проверьте примеры вручную.</li>
<li><b>Крайние случаи:</b> пустой вход, один элемент, отрицательные числа, повторы.</li>
<li><b>Сначала наивное решение</b> — оцените его сложность. При n = 10⁵ O(n²) не подходит.</li>
<li><b>Улучшайте:</b> «что я видел раньше?» → set/dict; «отсортировано» → два указателя или binary search; «сумма на отрезке» → prefix sum.</li>
<li><b>После кода</b> прогоните примеры и проверьте кнопкой «Запустить».</li>
</ol>
<h3>Prefix sum — новый инструмент</h3>
<p>Если много запросов спрашивают «чему равна сумма от <code>l</code> до <code>r</code>?», цикл на каждый запрос — это O(n) на каждый. Вместо этого один раз строим массив <code>pre[i+1] = pre[i] + a[i]</code>; тогда <code>sum(a[l..r]) = pre[r+1] − pre[l]</code> — O(1).</p>
<pre><code>a   = [5, 2, 7, 1]
pre = [0, 5, 7, 14, 15]
# a[1..2] = 2 + 7 = pre[3] - pre[1] = 14 - 5 = 9</code></pre>`,
      ex: [
        { prompt: `<b>1. Нули в конец.</b> В складском учёте товары с остатком 0 должны переместиться в конец списка, а относительный порядок остальных сохраняется. <code>move_zeros(nums)</code> должна изменить список <b>на месте</b> (не создавайте новый список).
<pre><code>a = [0, 12, 0, 3, 5]
move_zeros(a)   # a == [12, 3, 5, 0, 0]
a = [0]         # → [0]</code></pre>`, hints: ['Указатель записи <code>w</code>: перемещайте ненулевой элемент в <code>nums[w]</code>.', 'Обмен <code>nums[w], nums[r] = nums[r], nums[w]</code> сам сдвигает нули назад.'], check: { tests: `
_a = [0, 12, 0, 3, 5]; _id = id(_a); move_zeros(_a)
assert _a == [12, 3, 5, 0, 0] and id(_a) == _id, f'Ожидалось [12, 3, 5, 0, 0] (на месте), у вас {_a}'
_b = [0]; move_zeros(_b); assert _b == [0], '[0] не меняется'
_c = []; move_zeros(_c); assert _c == [], 'Пустой список'
_d = [1, 2, 3]; move_zeros(_d); assert _d == [1, 2, 3], 'Список без нулей не меняется'
_e = [0, 0, 7]; move_zeros(_e); assert _e == [7, 0, 0], '[0, 0, 7] → [7, 0, 0]'
_big = [(_i % 3) * _i for _i in range(100000)]
_exp = [x for x in _big if x != 0] + [0] * _big.count(0)
move_zeros(_big); assert _big == _exp, 'На 100 000 элементах результат неверен'
` } },
        { prompt: `<b>2. Самая длинная серия.</b> Даны дневные продажи магазина. <code>max_streak(sales)</code> должна вернуть наибольшее число <b>подряд идущих</b> дней с продажами больше нуля.
<pre><code>max_streak([3, 5, 0, 2, 4, 1, 0, 8]) → 3
max_streak([0, 0])                   → 0
max_streak([])                       → 0</code></pre>`, hints: ['Две переменные: текущая серия <code>cur</code> и лучшая <code>best</code>.', 'Встретился ноль — <code>cur = 0</code>.'], check: { tests: `
assert max_streak([3, 5, 0, 2, 4, 1, 0, 8]) == 3, f'Ожидалось 3, у вас {max_streak([3, 5, 0, 2, 4, 1, 0, 8])}'
assert max_streak([0, 0]) == 0 and max_streak([]) == 0, 'Если продаж нет — 0'
assert max_streak([1, 1, 1]) == 3, 'Если все дни положительные — длина списка'
assert max_streak([0, 4]) == 1, 'Серия в конце тоже считается'
` } },
        { prompt: `<b>3. Торговля валютой.</b> <code>rates[i]</code> — курс доллара (₸) в день <code>i</code>. Можно один раз купить и позже один раз продать. <code>best_profit(rates)</code> должна вернуть наибольшую прибыль; если прибыли нет — 0. Тест проверяет 100 000 дней — напишите O(n).
<pre><code>best_profit([470, 465, 480, 462, 475, 490]) → 28   # купить по 462, продать по 490
best_profit([500, 490, 480])               → 0</code></pre>`, hints: ['Храните наименьший курс <code>low</code> до текущего дня.', 'Каждый день сравнивайте прибыль <code>r - low</code> с <code>best</code>.'], check: { tests: `
assert best_profit([470, 465, 480, 462, 475, 490]) == 28, f'Ожидалось 28, у вас {best_profit([470, 465, 480, 462, 475, 490])}'
assert best_profit([500, 490, 480]) == 0, 'Если курс только падает — 0'
assert best_profit([]) == 0 and best_profit([470]) == 0, 'Пустой список или один день — 0'
assert best_profit([3, 1, 4, 1, 5]) == 4, 'Самая низкая точка может быть в середине'
import time as _time
_r = list(range(5000, 0, -1))
_t0 = _time.perf_counter(); _v = best_profit(_r); _dt = _time.perf_counter() - _t0
assert _v == 0 and _dt < 0.15, f'Для n=5000 — {_dt:.2f} с, похоже на O(n²). Решите за один проход'
_r = [(_i * 7919) % 100003 for _i in range(100000)]
_lo, _best = 10**9, 0
for _x in _r:
    _lo = min(_lo, _x); _best = max(_best, _x - _lo)
assert best_profit(_r) == _best, f'При n = 100 000 ожидалось {_best}, у вас {best_profit(_r)}'
` } },
        { prompt: `<b>4. Слияние двух отсортированных списков.</b> Время заказов филиалов в Алматы и Астане отсортировано по возрастанию. <code>merge_sorted(a, b)</code> должна вернуть один отсортированный список. Не используйте <code>sorted</code> / <code>.sort</code> — два указателя.
<pre><code>merge_sorted([1, 4, 9], [2, 3, 10]) → [1, 2, 3, 4, 9, 10]
merge_sorted([], [5])               → [5]</code></pre>`, hints: ['<code>while i &lt; len(a) and j &lt; len(b)</code>: добавляйте меньший и сдвигайте его указатель.', 'В конце остаток — через <code>extend</code>.'], check: { tests: `
assert merge_sorted([1, 4, 9], [2, 3, 10]) == [1, 2, 3, 4, 9, 10], f'Ожидалось [1, 2, 3, 4, 9, 10], у вас {merge_sorted([1, 4, 9], [2, 3, 10])}'
assert merge_sorted([], [5]) == [5] and merge_sorted([5], []) == [5], 'Если один список пуст'
assert merge_sorted([], []) == [], 'Оба пусты'
assert merge_sorted([1, 1], [1]) == [1, 1, 1], 'Равные значения'
assert 'sorted' not in merge_sorted.__code__.co_names and 'sort' not in merge_sorted.__code__.co_names, 'Не используйте sorted / .sort'
_a = list(range(0, 200000, 2)); _b = list(range(1, 200000, 2))
assert merge_sorted(_a, _b) == list(range(200000)), 'На 100 000 + 100 000 элементах результат неверен'
` } },
        { prompt: `<b>5. Потерянный чек.</b> В кассе должно было быть <code>n + 1</code> чеков с номерами <code>0..n</code>, но один потерялся; номера оставшихся <code>n</code> чеков даны в произвольном порядке. <code>missing_number(nums)</code> должна найти потерянный номер за O(n).
<pre><code>missing_number([3, 0, 1]) → 2
missing_number([0])       → 1
missing_number([1])       → 0</code></pre>`, hints: ['Сумма чисел от 0 до n — <code>n * (n + 1) // 2</code>.', 'Вычтите из неё сумму данных чисел.'], check: { tests: `
assert missing_number([3, 0, 1]) == 2, f'Ожидалось 2, у вас {missing_number([3, 0, 1])}'
assert missing_number([0]) == 1 and missing_number([1]) == 0, 'Крайние случаи: [0] → 1, [1] → 0'
assert missing_number([9, 6, 4, 2, 3, 5, 7, 0, 1]) == 8, 'Ожидалось 8'
import random as _random, time as _time
_R = _random.Random(11)
_n = list(range(100001)); _gone = _n.pop(73519); _R.shuffle(_n)
_t0 = _time.perf_counter(); _v = missing_number(_n); _dt = _time.perf_counter() - _t0
assert _v == _gone, f'При n = 100 000 ожидалось {_gone}, у вас {_v}'
assert _dt < 1, f'{_dt:.2f} с — слишком медленно; не ищите каждое число в списке через in'
` } },
        { prompt: `<b>6. Выборы в ауле.</b> Известно, что один кандидат получил <b>больше</b> половины голосов. <code>majority(votes)</code> должна вернуть этого кандидата. Дополнительно: попробуйте написать методом Бойера–Мура с памятью O(1) (не обязательно).
<pre><code>majority(['Асан', 'Үсен', 'Асан']) → 'Асан'
majority([7, 7, 5, 7, 5, 7, 7])     → 7</code></pre>`, hints: ['Простой способ: <code>Counter(votes).most_common(1)[0][0]</code>.', 'Бойер–Мур: если счётчик равен 0, берём нового кандидата; совпал — +1, не совпал — −1.'], check: { tests: `
assert majority(['Асан', 'Үсен', 'Асан']) == 'Асан', "Ожидалось 'Асан'"
assert majority([7, 7, 5, 7, 5, 7, 7]) == 7, 'Ожидалось 7'
assert majority(['Дана']) == 'Дана', 'Один голос'
_v = ['B'] * 49999 + ['A'] * 50001
assert majority(_v) == 'A', 'Ошибка на 100 000 голосов'
` } },
        { prompt: `<b>7. Гласные.</b> <code>count_vowels(text)</code> должна вернуть число гласных букв в тексте. Гласные (и строчные, и заглавные) — буквы казахского алфавита: <code>а ә е ё и і о ө у ұ ү ы э ю я</code>. Используйте set.
<pre><code>count_vowels('Қазақстан')   → 3
count_vowels('Өскемен!')    → 3
count_vowels('')            → 0</code></pre>`, hints: ['<code>text.lower()</code> — чтобы считать и заглавные.', '<code>sum(1 for ch in ... if ch in VOWELS)</code>.'], check: { tests: `
assert count_vowels('Қазақстан') == 3, f"'Қазақстан' — 3 гласных, у вас {count_vowels('Қазақстан')}"
assert count_vowels('Өскемен!') == 3, "'Өскемен!' — Ө, е, е: 3"
assert count_vowels('') == 0 and count_vowels('бмт 123') == 0, 'Текст без гласных — 0'
assert count_vowels('ҮЙ ІШІ') == 3, 'Заглавные буквы тоже считаются'
` } },
        { prompt: `<b>8. Суммы на отрезках.</b> <code>sales</code> — дневные продажи, <code>queries</code> — пары <code>(l, r)</code> (оба конца включительно). <code>range_sums(sales, queries)</code> должна вернуть список сумм для каждого запроса. Тест проверяет 100 000 дней и 100 000 запросов — постройте prefix sum.
<pre><code>range_sums([5, 2, 7, 1], [(1, 2), (0, 3), (3, 3)]) → [9, 15, 1]</code></pre>`, hints: ['<code>pre[i + 1] = pre[i] + sales[i]</code>.', 'Ответ на запрос: <code>pre[r + 1] - pre[l]</code>.'], check: { tests: `
assert range_sums([5, 2, 7, 1], [(1, 2), (0, 3), (3, 3)]) == [9, 15, 1], f'Ожидалось [9, 15, 1], у вас {range_sums([5, 2, 7, 1], [(1, 2), (0, 3), (3, 3)])}'
assert range_sums([4], [(0, 0)]) == [4], 'Один день'
assert range_sums([1, 2], []) == [], 'Если запросов нет — []'
import random as _random, time as _time
_R = _random.Random(12)
_s = [_R.randint(0, 1000) for _ in range(10000)]
_q = [(0, 9999)] * 10000
_t0 = _time.perf_counter(); _v = range_sums(_s, _q); _dt = _time.perf_counter() - _t0
assert _v[0] == sum(_s), 'Неверная сумма полного отрезка'
assert _dt < 0.15, f'10 000 запросов заняли {_dt:.2f} с — не пересчитывайте сумму на каждый запрос, постройте prefix sum'
_s = [_R.randint(0, 1000) for _ in range(100000)]
_q = [(_i, 99999) for _i in range(0, 100000)]
_v = range_sums(_s, _q)
assert len(_v) == 100000 and _v[0] == sum(_s) and _v[-1] == _s[-1] and _v[50000] == sum(_s[50000:]), 'На 100 000 запросах результат неверен'
` } }
      ]
    },
    'dsa-p2': {
      title: 'Задачи: Средние',
      body: `
<p>В задачах <b>среднего</b> уровня одного инструмента мало: sliding window, prefix sum + hash map, monotonic stack, топологическая сортировка, BFS по сетке и 2D DP. Часто наивное решение за O(n²) приходит в голову легко, но тесты проверяют объёмы порядка 10⁵.</p>
<h3>Sliding window (скользящее окно)</h3>
<p>В вопросах о подстроке/подмассиве (самый длинный, самый короткий, удовлетворяющий условию) два указателя <code>l</code>, <code>r</code> задают окно. <code>r</code> двигается вправо и добавляет элемент; если условие нарушено, <code>l</code> двигается вправо и убирает элемент. Каждый элемент один раз входит в окно и один раз выходит — O(n).</p>
<pre><code># Самая длинная подстрока без повторяющихся символов
last = {}; l = best = 0
for r, ch in enumerate(s):
    if ch in last and last[ch] &gt;= l:
        l = last[ch] + 1          # начинаем окно после повтора
    last[ch] = r
    best = max(best, r - l + 1)</code></pre>
<h3>Monotonic stack</h3>
<p>«Где для каждого элемента первый больший справа?» — держим в стеке индексы, для которых ответ ещё не найден, в порядке <b>убывания</b> значений. Если новый элемент больше верхнего в стеке, то ответ для верхнего — этот элемент; снимаем его. Каждый индекс один раз входит и один раз выходит — O(n).</p>
<h3>Топологическая сортировка (Kahn)</h3>
<p>Предметы и пререквизиты — ориентированный граф. Предметы с входящей степенью (in-degree) 0 кладём в очередь; каждый раз, забирая один, уменьшаем степень его соседей. Если вышли не все предметы — есть циклическая зависимость.</p>`,
      ex: [
        { prompt: `<b>1. Самая длинная подстрока без повторов.</b> <code>longest_unique(s)</code> — длина самой длинной <b>непрерывной</b> подстроки, в которой символы не повторяются. Sliding window, O(n).
<pre><code>longest_unique('абвабвбб') → 3   # 'абв'
longest_unique('ққққ')     → 1
longest_unique('')         → 0</code></pre>`, hints: ['<code>last[ch]</code> — последний индекс символа; <code>l</code> — левая граница окна.', 'Если повтор внутри окна (<code>last[ch] &gt;= l</code>), то <code>l = last[ch] + 1</code>.'], check: { tests: `
assert longest_unique('абвабвбб') == 3, f"'абвабвбб' → 3, у вас {longest_unique('абвабвбб')}"
assert longest_unique('ққққ') == 1 and longest_unique('') == 0, 'Крайние случаи'
assert longest_unique('pwwkew') == 3, "'pwwkew' → 3 ('wke')"
assert longest_unique('abba') == 2, "'abba' → 2: l не должен сдвигаться обратно влево"
import time as _time
_s = ''.join(chr(0x4e00 + _i) for _i in range(5000))
_t0 = _time.perf_counter(); _v = longest_unique(_s); _dt = _time.perf_counter() - _t0
assert _v == 5000, 'В строке из разных символов — её длина'
assert _dt < 0.15, f'Для n=5000 — {_dt:.2f} с, это O(n²). Напишите sliding window'
_s = ''.join(chr(0x4e00 + (_i * 37) % 2000) for _i in range(100000))
assert longest_unique(_s) == 2000, 'На строке из 100 000 символов результат неверен'
` } },
        { prompt: `<b>2. Произведение всех, кроме себя.</b> <code>product_except_self(nums)</code> — <code>out[i]</code> = произведение всех элементов, кроме <code>i</code>-го. <b>Не используйте деление</b> (может быть ноль); O(n): произведения слева и справа.
<pre><code>product_except_self([1, 2, 3, 4]) → [24, 12, 8, 6]
product_except_self([2, 0, 5])    → [0, 10, 0]</code></pre>`, hints: ['Первый проход: <code>out[i]</code> = произведение элементов слева.', 'Второй проход справа налево: <code>out[i] *= right</code>, затем <code>right *= nums[i]</code>.'], check: { tests: `
assert product_except_self([1, 2, 3, 4]) == [24, 12, 8, 6], f'Ожидалось [24, 12, 8, 6], у вас {product_except_self([1, 2, 3, 4])}'
assert product_except_self([2, 0, 5]) == [0, 10, 0], 'При наличии нуля деление не годится'
assert product_except_self([0, 0, 3]) == [0, 0, 0], 'Два нуля'
assert product_except_self([-1, 2]) == [2, -1], 'Два элемента'
import time as _time
_a = [1, -1] * 2500
_t0 = _time.perf_counter(); _v = product_except_self(_a); _dt = _time.perf_counter() - _t0
assert _v[0] == 1 and _v[1] == -1 and _dt < 0.15, f'Для n=5000 — {_dt:.2f} с, это O(n²). Напишите O(n) через произведения слева/справа'
_a = [1] * 100000; _a[777] = 3
_v = product_except_self(_a)
assert _v[777] == 1 and _v[0] == 3 and len(_v) == 100000, 'На 100 000 элементах результат неверен'
` } },
        { prompt: `<b>3. Подмассивы с суммой k.</b> <code>count_subarrays(nums, k)</code> — число <b>непрерывных</b> подмассивов с суммой ровно <code>k</code>. Числа могут быть отрицательными (поэтому sliding window не подходит). Prefix sum + dict: O(n).
<pre><code>count_subarrays([1, 1, 1], 2)       → 2
count_subarrays([3, 4, -7, 5, 1], 0) → 1   # [3, 4, -7]
count_subarrays([1, 2, 3], 3)       → 2   # [1, 2], [3]</code></pre>`, hints: ['Текущая prefix-сумма <code>s</code>. Сколько раз раньше встречалась сумма <code>s - k</code> — столько подмассивов заканчивается здесь.', '<code>seen = {0: 1}</code> — пустой префикс; на каждом шаге <code>seen[s] += 1</code>.'], check: { tests: `
assert count_subarrays([1, 1, 1], 2) == 2, f'Ожидалось 2, у вас {count_subarrays([1, 1, 1], 2)}'
assert count_subarrays([3, 4, -7, 5, 1], 0) == 1, 'С отрицательными числами: [3, 4, -7]'
assert count_subarrays([1, 2, 3], 3) == 2, '[1, 2] и [3]'
assert count_subarrays([], 0) == 0, 'Для пустого списка — 0'
assert count_subarrays([0, 0, 0], 0) == 6, 'В [0, 0, 0] — 6 подмассивов с суммой 0'
import time as _time
_a = [1] * 5000
_t0 = _time.perf_counter(); _v = count_subarrays(_a, 10**9); _dt = _time.perf_counter() - _t0
assert _v == 0 and _dt < 0.15, f'Для n=5000 — {_dt:.2f} с, это O(n²). Напишите prefix sum + dict'
_a = [(1 if _i % 2 == 0 else -1) for _i in range(100000)]
assert count_subarrays(_a, 0) == 2500000000, f'На 100 000 элементах ожидалось 2500000000, у вас {count_subarrays(_a, 0)}'
` } },
        { prompt: `<b>4. Бронирование зала.</b> Бронирования зала Astana Hub даны в виде <code>[start, end]</code> (в часах). Объедините пересекающиеся или соприкасающиеся (конец одного — начало другого) интервалы; <code>merge_intervals(intervals)</code> должна вернуть список, отсортированный по началу.
<pre><code>merge_intervals([[9, 11], [10, 12], [14, 15], [15, 17]]) → [[9, 12], [14, 17]]
merge_intervals([[13, 14], [8, 9]])                     → [[8, 9], [13, 14]]</code></pre>`, hints: ['Сначала отсортируйте по началу.', 'Если начало нового интервала не больше <code>out[-1][1]</code>, продлите конец через <code>max</code>; иначе добавьте новый.'], check: { tests: `
assert merge_intervals([[9, 11], [10, 12], [14, 15], [15, 17]]) == [[9, 12], [14, 17]], f'Ожидалось [[9, 12], [14, 17]], у вас {merge_intervals([[9, 11], [10, 12], [14, 15], [15, 17]])}'
assert merge_intervals([[13, 14], [8, 9]]) == [[8, 9], [13, 14]], 'Неотсортированный вход'
assert merge_intervals([]) == [], 'Пустой список'
assert merge_intervals([[1, 10], [2, 3], [4, 5]]) == [[1, 10]], 'Вложенные интервалы поглощаются'
assert merge_intervals([[5, 5]]) == [[5, 5]], 'Интервал нулевой длины'
_iv = [[_i * 3, _i * 3 + 2] for _i in range(100000)][::-1]
_r = merge_intervals(_iv)
assert len(_r) == 100000 and _r[0] == [0, 2], '100 000 раздельных интервалов не должны объединяться'
_iv = [[_i, _i + 1] for _i in range(100000)]
assert merge_intervals(_iv) == [[0, 100000]], 'Цепочка соприкасающихся интервалов должна стать одним'
` } },
        { prompt: `<b>5. Озёра на карте.</b> Карта — список строк: <code>'~'</code> — вода, <code>'.'</code> — суша. Озеро — группа клеток воды, соединённых сверху/снизу/слева/справа. <code>count_lakes(grid)</code> должна вернуть число озёр. На большой карте глубины рекурсии не хватит — используйте стек или <code>deque</code>.
<pre><code>count_lakes(['~~..',
             '~...',
             '..~~',
             '...~'])  → 2</code></pre>`, hints: ['С каждой непосещённой клетки <code>\'~\'</code> начинается новое озеро: увеличьте счётчик и отметьте всё озеро.', 'Отметка: DFS со стеком, четыре соседа, проверка границы и <code>seen</code>.'], check: { tests: `
assert count_lakes(['~~..', '~...', '..~~', '...~']) == 2, f'Ожидалось 2, у вас {count_lakes(["~~..", "~...", "..~~", "...~"])}'
assert count_lakes([]) == 0 and count_lakes(['...']) == 0, 'Воды нет — 0'
assert count_lakes(['~.~', '.~.', '~.~']) == 5, 'Соседи по диагонали — не одно озеро'
assert count_lakes(['~']) == 1, 'Одна клетка'
_g = ['~' * 300 for _ in range(300)]
assert count_lakes(_g) == 1, '300×300 сплошной воды — одно озеро (остерегайтесь глубины рекурсии)'
_g = [''.join('~' if (_i + _j) % 2 == 0 and _i % 2 == 0 else '.' for _j in range(300)) for _i in range(300)]
assert count_lakes(_g) == 150 * 150, 'На карте 300×300 в шахматном порядке результат неверен'
` } },
        { prompt: `<b>6. Ожидание более тёплого дня.</b> <code>temps[i]</code> — температура в Астане в день <code>i</code>. <code>days_until_warmer(temps)</code> должна вернуть для каждого дня, через сколько дней наступит <b>строго более тёплый</b> день; если не наступит — 0. Monotonic stack, O(n).
<pre><code>days_until_warmer([-5, -3, -8, 0, -1, 2]) → [1, 2, 1, 2, 1, 0]
days_until_warmer([3, 2, 1])             → [0, 0, 0]</code></pre>`, hints: ['В стеке — индексы дней, для которых ответ ещё не найден.', 'Если новая <code>t</code> теплее дня на вершине стека, снимите его и запишите <code>ans[j] = i - j</code>.'], check: { tests: `
assert days_until_warmer([-5, -3, -8, 0, -1, 2]) == [1, 2, 1, 2, 1, 0], f'Ожидалось [1, 2, 1, 2, 1, 0], у вас {days_until_warmer([-5, -3, -8, 0, -1, 2])}'
assert days_until_warmer([3, 2, 1]) == [0, 0, 0], 'Если только холодает — все 0'
assert days_until_warmer([]) == [] and days_until_warmer([5]) == [0], 'Пустой список и один день'
assert days_until_warmer([1, 1, 2]) == [2, 1, 0], 'Равная температура — не теплее'
import time as _time
_t = list(range(5000, 0, -1))
_t0 = _time.perf_counter(); days_until_warmer(_t); _dt = _time.perf_counter() - _t0
assert _dt < 0.15, f'Для n=5000 — {_dt:.2f} с, это O(n²). Напишите monotonic stack'
_t = list(range(50000, 0, -1)) + [10**6] * 50000
_v = days_until_warmer(_t)
assert _v[0] == 50000 and _v[49999] == 1 and _v[-1] == 0, 'На 100 000 днях результат неверен'
` } },
        { prompt: `<b>7. Порядок предметов.</b> В университете <code>n</code> предметов (<code>0..n−1</code>); <code>prereqs</code> — пары <code>(a, b)</code>: чтобы изучать <code>a</code>, сначала нужен <code>b</code>. <code>course_order(n, prereqs)</code> должна вернуть любой порядок, в котором можно изучить все предметы; если есть цикл — <code>[]</code>. Алгоритм Кана.
<pre><code>course_order(3, [(1, 0), (2, 1)]) → [0, 1, 2]
course_order(2, [(0, 1), (1, 0)]) → []</code></pre>`, hints: ['Ребро <code>b → a</code>; <code>indeg[a] += 1</code>. Начинайте с предметов степени 0.', 'Забирая предмет, уменьшайте степень его соседей; если в конце не <code>len(order) == n</code> — есть цикл.'], check: { tests: `
def _valid(n, pr, order):
    if sorted(order) != list(range(n)):
        return False
    pos = {c: i for i, c in enumerate(order)}
    return all(pos[b] < pos[a] for a, b in pr)
assert course_order(3, [(1, 0), (2, 1)]) == [0, 1, 2], f'Ожидалось [0, 1, 2], у вас {course_order(3, [(1, 0), (2, 1)])}'
assert course_order(2, [(0, 1), (1, 0)]) == [], 'Если есть цикл — []'
_o = course_order(4, [(1, 0), (2, 0), (3, 1), (3, 2)])
assert _valid(4, [(1, 0), (2, 0), (3, 1), (3, 2)], _o), f'Порядок нарушает пререквизиты: {_o}'
assert sorted(course_order(3, [])) == [0, 1, 2], 'Зависимостей нет — любой порядок, но все предметы'
assert course_order(1, [(0, 0)]) == [], 'Предмет, зависящий от себя, — цикл'
_n = 50000; _pr = [(_i, _i - 1) for _i in range(1, _n)] + [(_i, _i // 2) for _i in range(2, _n)]
_o = course_order(_n, _pr)
assert _valid(_n, _pr, _o), 'На 50 000 предметах порядок неверен'
` } },
        { prompt: `<b>8. Маршрут такси.</b> Сетка улиц Алматы: <code>grid[i][j]</code> — стоимость проезда через этот перекрёсток (₸). Такси едет из левого верхнего угла в правый нижний только <b>вправо</b> или <b>вниз</b>. <code>min_path_cost(grid)</code> — наименьшая сумма стоимостей всех клеток пути (включая начальную и конечную). 2D DP.
<pre><code>min_path_cost([[1, 3, 1],
               [1, 5, 1],
               [4, 2, 1]]) → 7    # 1→3→1→1→1</code></pre>`, hints: ['<code>dp[i][j]</code> — наименьшая стоимость пути до (i, j); прийти туда можно только сверху или слева.', 'Первую строку и первый столбец заполните отдельно.'], check: { tests: `
assert min_path_cost([[1, 3, 1], [1, 5, 1], [4, 2, 1]]) == 7, f'Ожидалось 7, у вас {min_path_cost([[1, 3, 1], [1, 5, 1], [4, 2, 1]])}'
assert min_path_cost([[5]]) == 5, 'Одна клетка'
assert min_path_cost([[1, 2, 3]]) == 6 and min_path_cost([[1], [2], [3]]) == 6, 'Одна строка / один столбец'
import random as _random
_R = _random.Random(13)
_g = [[_R.randint(1, 9) for _ in range(300)] for _ in range(300)]
_d = [row[:] for row in _g]
for _i in range(300):
    for _j in range(300):
        if _i or _j:
            _d[_i][_j] += min(_d[_i - 1][_j] if _i else 10**9, _d[_i][_j - 1] if _j else 10**9)
assert min_path_cost(_g) == _d[-1][-1], 'На сетке 300×300 результат неверен'
` } }
      ]
    },
    'dsa-p3': {
      title: 'Задачи: Сложные',
      body: `
<p>Задачи <b>сложного</b> уровня объединяют несколько идей, и наивное решение здесь совсем не подходит. В основе каждой задачи лежит проверенный шаблон — узнаете его, и половина задачи решена.</p>
<table>
<tr><th>Задача</th><th>Основная идея</th><th>Целевая сложность</th></tr>
<tr><td>Дождевая вода</td><td>два указателя + максимум слева/справа</td><td>O(n)</td></tr>
<tr><td>Максимум в окне</td><td>monotonic deque</td><td>O(n)</td></tr>
<tr><td>Кратчайшее окно</td><td>sliding window + dict частот</td><td>O(n)</td></tr>
<tr><td>Редакционное расстояние</td><td>2D DP</td><td>O(n·m)</td></tr>
<tr><td>Путь между городами</td><td>Dijkstra + heap</td><td>O((V + E) log V)</td></tr>
<tr><td>Наибольший прямоугольник</td><td>monotonic stack</td><td>O(n)</td></tr>
</table>
<h3>Monotonic deque</h3>
<p>Чтобы поддерживать максимум в окне, храним в deque индексы со значениями в порядке <b>убывания</b>. Когда приходит новый элемент, снимаем с конца меньшие значения (они уже никогда не станут максимумом). Если передний индекс вышел из окна, снимаем его с начала. Тогда <code>dq[0]</code> — всегда максимум окна.</p>
<h3>Dijkstra</h3>
<p>Кратчайший путь в графе с неотрицательными весами: в heap лежат <code>(расстояние, вершина)</code>. Берём ближайшую вершину и «релаксируем» (relax) её соседей: если <code>d + w &lt; dist[v]</code>, обновляем и кладём в heap. Устаревшие записи из heap (<code>d &gt; dist[u]</code>) пропускаем.</p>
<pre><code>dist = [INF] * n; dist[src] = 0
h = [(0, src)]
while h:
    d, u = heapq.heappop(h)
    if d &gt; dist[u]:
        continue
    for v, w in adj[u]:
        if d + w &lt; dist[v]:
            dist[v] = d + w
            heapq.heappush(h, (dist[v], v))</code></pre>
<div class="tip"><b>Совет:</b> сначала пройдите маленький пример по шагам на бумаге. Большинство ошибок в сложных задачах — на границах: пустой вход, <code>k = 1</code>, все значения одинаковы, недостижимая вершина.</div>`,
      ex: [
        { prompt: `<b>1. Дождевая вода в ущелье.</b> <code>heights[i]</code> — высота скалы шириной 1. Сколько воды соберётся между скалами после дождя? <code>trap_water(heights)</code>, O(n): два указателя или массивы максимумов слева/справа.
<pre><code>trap_water([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]) → 6
trap_water([4, 2, 0, 3, 2, 5])                   → 9
trap_water([])                                   → 0</code></pre>`, hints: ['Вода над столбцом = min(максимум слева, максимум справа) − высота.', 'Два указателя: решает граница с более низкой стороны; двигая левый, обновляйте <code>lmax</code>, двигая правый — <code>rmax</code>.'], check: { tests: `
assert trap_water([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]) == 6, f'Ожидалось 6, у вас {trap_water([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])}'
assert trap_water([4, 2, 0, 3, 2, 5]) == 9, 'Ожидалось 9'
assert trap_water([]) == 0 and trap_water([5]) == 0 and trap_water([1, 2, 3]) == 0, 'Случаи, когда вода не собирается'
assert trap_water([3, 0, 3]) == 3, '[3, 0, 3] → 3'
import time as _time
_h = [0] * 10000; _h[0] = _h[-1] = 5
_t0 = _time.perf_counter(); _v = trap_water(_h); _dt = _time.perf_counter() - _t0
assert _v == 5 * 9998, 'На 10 000 столбцах результат неверен'
assert _dt < 0.15, f'Для n=10 000 — {_dt:.2f} с: max(...) пересчитывается для каждого столбца (O(n²)). Напишите O(n)'
_h = [(_i * 7919) % 1000 for _i in range(100000)]
_l = [0] * 100000; _r = [0] * 100000; _m = 0
for _i in range(100000):
    _m = max(_m, _h[_i]); _l[_i] = _m
_m = 0
for _i in range(99999, -1, -1):
    _m = max(_m, _h[_i]); _r[_i] = _m
_exp = sum(min(_l[_i], _r[_i]) - _h[_i] for _i in range(100000))
assert trap_water(_h) == _exp, f'При n = 100 000 ожидалось {_exp}, у вас {trap_water(_h)}'
` } },
        { prompt: `<b>2. Максимум в окне на бирже.</b> <code>prices</code> — поминутная цена акции. <code>window_max(prices, k)</code> должна вернуть максимум каждого скользящего окна длины <code>k</code> (<code>len − k + 1</code> значений). Monotonic deque, O(n).
<pre><code>window_max([1, 3, -1, -3, 5, 3, 6, 7], 3) → [3, 3, 5, 5, 6, 7]
window_max([9, 4], 1)                     → [9, 4]</code></pre>`, hints: ['В deque — индексы со значениями по убыванию: значения меньше или равные новому <code>x</code> снимайте с конца через <code>pop</code>.', 'Если передний индекс не больше <code>i - k</code> — <code>popleft</code>; когда <code>i &gt;= k - 1</code>, записывайте <code>prices[dq[0]]</code>.'], check: { tests: `
assert window_max([1, 3, -1, -3, 5, 3, 6, 7], 3) == [3, 3, 5, 5, 6, 7], f'Ожидалось [3, 3, 5, 5, 6, 7], у вас {window_max([1, 3, -1, -3, 5, 3, 6, 7], 3)}'
assert window_max([9, 4], 1) == [9, 4], 'k = 1 — каждый элемент сам по себе'
assert window_max([2, 2, 2], 3) == [2], 'Одно окно'
assert window_max([1, 2, 3, 4], 2) == [2, 3, 4] and window_max([4, 3, 2, 1], 2) == [4, 3, 2], 'Возрастающий и убывающий'
import time as _time, random as _random
_R = _random.Random(21)
_p = [_R.randint(0, 10**6) for _ in range(20000)]
_t0 = _time.perf_counter(); _v = window_max(_p, 10000); _dt = _time.perf_counter() - _t0
assert len(_v) == 10001 and _v[0] == max(_p[:10000]) and _v[-1] == max(_p[-10000:]), 'При n = 20 000, k = 10 000 результат неверен'
assert _dt < 0.3, f'Для n=20 000, k=10 000 — {_dt:.2f} с: max() пересчитывается для каждого окна. Напишите monotonic deque'
_p = [_R.randint(0, 10**6) for _ in range(100000)]
_v = window_max(_p, 50)
assert len(_v) == 99951 and all(_v[_i] == max(_p[_i:_i + 50]) for _i in range(0, 99951, 997)), 'На 100 000 элементах результат неверен'
` } },
        { prompt: `<b>3. Кратчайшее покрывающее окно.</b> <code>min_window(s, t)</code> — кратчайшая <b>непрерывная</b> подстрока <code>s</code>, содержащая все символы <code>t</code> (с учётом повторов). Если такой нет — <code>''</code>; если таких несколько одинаковой длины — самая левая. Sliding window + счётчик частот, O(|s| + |t|).
<pre><code>min_window('ADOBECODEBANC', 'ABC') → 'BANC'
min_window('алматыастана', 'тас')  → 'аст'
min_window('a', 'aa')              → ''</code></pre>`, hints: ['<code>need</code> — сколько ещё нужно каждого символа, <code>missing</code> — сколько всего не хватает. Двигайте <code>r</code> и расширяйте окно, пока не станет <code>missing == 0</code>.', 'Затем отбросьте слева лишние символы (<code>need[...] &lt; 0</code>), запишите окно, выбросьте один нужный символ и продолжайте поиск.'], check: { tests: `
assert min_window('ADOBECODEBANC', 'ABC') == 'BANC', f"Ожидалось 'BANC', у вас {min_window('ADOBECODEBANC', 'ABC')!r}"
assert min_window('алматыастана', 'тас') == 'аст', "Ожидалось 'аст'"
assert min_window('алматыастана', 'ата') == 'атыа', "Для 'ата' нужны две 'а' и одна 'т': 'атыа'"
assert min_window('a', 'aa') == '', 'Если символов не хватает — пустая строка'
assert min_window('a', 'a') == 'a' and min_window('ab', 'b') == 'b', 'Маленькие случаи'
assert min_window('abcab', 'ab') == 'ab', 'При равной длине — самое левое'
assert min_window('xyz', '') == '', 'Если t пуста — пустая строка'
import time as _time
_s = 'x' * 1000 + 'ab'
_t0 = _time.perf_counter(); _v = min_window(_s, 'ab'); _dt = _time.perf_counter() - _t0
assert _v == 'ab', "Должно находиться 'ab' в конце"
assert _dt < 0.1, f'Для n=1000 — {_dt:.2f} с: не ищите заново от каждой стартовой точки, напишите sliding window'
_s = ''.join('абвгд'[(_i * _i) % 5] for _i in range(100000)) + 'е' + 'а' * 50 + 'ж'
assert min_window(_s, 'еж') == 'е' + 'а' * 50 + 'ж', 'На строке из 100 000 символов результат неверен'
` } },
        { prompt: `<b>4. Ошибки транслитерации.</b> При переходе на латиницу одно слово пишут по-разному. <code>edit_distance(a, b)</code> — наименьшее число операций, чтобы превратить <code>a</code> в <code>b</code> (вставка, удаление или замена одного символа; расстояние Левенштейна). 2D DP, O(n·m).
<pre><code>edit_distance('qazaq', 'kazakh')  → 3
edit_distance('kitten', 'sitting') → 3
edit_distance('', 'abc')           → 3</code></pre>`, hints: ['<code>dp[i][j]</code> — стоимость превращения <code>a[:i]</code> в <code>b[:j]</code>; <code>dp[i][0] = i</code>, <code>dp[0][j] = j</code>.', 'Если символы равны — <code>dp[i-1][j-1]</code>, иначе <code>1 + min(удаление, вставка, замена)</code>.'], check: { tests: `
assert edit_distance('qazaq', 'kazakh') == 3, f"Ожидалось 3, у вас {edit_distance('qazaq', 'kazakh')}"
assert edit_distance('kitten', 'sitting') == 3, 'Ожидалось 3'
assert edit_distance('', 'abc') == 3 and edit_distance('abc', '') == 3, 'Из пустой строки / в пустую строку'
assert edit_distance('алма', 'алма') == 0, 'Одинаковые слова — 0'
assert edit_distance('шәй', 'шай') == 1, 'Одна замена'
import time as _time
_t0 = _time.perf_counter(); _v = edit_distance('abcdefghi', 'jklmnopqr'); _dt = _time.perf_counter() - _t0
assert _v == 9, 'Слова из 9 букв без общих символов — 9'
assert _dt < 0.1, f'{_dt:.2f} с — рекурсия без мемоизации экспоненциальна. Заполните таблицу DP'
_a = ''.join('абвгд'[_i % 5] for _i in range(700)); _b = ''.join('абвгд'[_i % 5] for _i in range(1, 701))
assert edit_distance(_a, _b) == 2, 'На строках из 700 символов результат неверен (одно удаление + одна вставка = 2)'
` } },
        { prompt: `<b>5. Кратчайший путь между городами.</b> <code>n</code> городов (<code>0..n−1</code>), <code>roads</code> — двусторонние дороги <code>(u, v, km)</code>. <code>shortest_km(n, roads, src)</code> должна вернуть список кратчайших расстояний от <code>src</code> до каждого города; если город недостижим — <code>-1</code>. Dijkstra + <code>heapq</code>.
<pre><code># 0 Алматы, 1 Конаев, 2 Талдыкорган, 3 Балхаш, 4 Актау
roads = [(0, 1, 70), (1, 2, 200), (0, 2, 280), (2, 3, 450)]
shortest_km(5, roads, 0) → [0, 70, 270, 720, -1]</code></pre>`, hints: ['<code>dist = [inf] * n</code>, <code>dist[src] = 0</code>, в heap — <code>(0, src)</code>.', 'Если извлечённое <code>d &gt; dist[u]</code> — пропустите; если для соседа <code>d + w &lt; dist[v]</code> — обновите и положите в heap. В конце inf → -1.'], check: { tests: `
_roads = [(0, 1, 70), (1, 2, 200), (0, 2, 280), (2, 3, 450)]
assert shortest_km(5, _roads, 0) == [0, 70, 270, 720, -1], f'Ожидалось [0, 70, 270, 720, -1], у вас {shortest_km(5, _roads, 0)}'
assert shortest_km(5, _roads, 3) == [720, 650, 450, 0, -1], 'Из другого стартового города'
assert shortest_km(1, [], 0) == [0], 'Один город'
assert shortest_km(3, [(0, 1, 5), (0, 1, 2), (1, 2, 0)], 0) == [0, 2, 2], 'Параллельные дороги и нулевая длина'
import random as _random, time as _time
_R = _random.Random(31)
def _mk(n, m):
    e = [(_i, _i + 1, 1) for _i in range(n - 1)]
    for _ in range(m):
        u = _R.randrange(n); v = _R.randrange(n)
        if u > v: u, v = v, u
        e.append((u, v, (v - u) + _R.randint(0, 5)))
    return e
_e = _mk(6000, 20000)
_t0 = _time.perf_counter(); _d = shortest_km(6000, _e, 0); _dt = _time.perf_counter() - _t0
assert _d == list(range(6000)), 'На 6000 городах расстояния неверны'
assert _dt < 0.3, f'Для 6000 городов — {_dt:.2f} с: поиск ближайшего города в списке — это O(V²). Используйте heapq'
_e = _mk(20000, 80000)
assert shortest_km(20000, _e, 0) == list(range(20000)), 'На 20 000 городов и 100 000 дорог результат неверен'
` } },
        { prompt: `<b>6. Самый большой билборд.</b> Здания вдоль улицы шириной 1, их высоты — <code>heights</code>. Какова площадь самого большого прямоугольного билборда, который можно повесить на их стены (прямоугольник охватывает подряд стоящие здания, а его высота не больше самого низкого из них)? <code>largest_rectangle(heights)</code>, monotonic stack, O(n).
<pre><code>largest_rectangle([2, 1, 5, 6, 2, 3]) → 10   # 5 и 6: 2 × 5
largest_rectangle([2, 4])             → 4
largest_rectangle([])                 → 0</code></pre>`, hints: ['В стеке — <code>(индекс_начала, высота)</code> в порядке возрастания. Добавьте в конец высоту 0, чтобы «закрыть» всё.', 'Если новая <code>h</code> ниже верхней, снимите её и посчитайте площадь <code>hh * (i - idx)</code>; новый элемент начинается с <code>idx</code>.'], check: { tests: `
assert largest_rectangle([2, 1, 5, 6, 2, 3]) == 10, f'Ожидалось 10, у вас {largest_rectangle([2, 1, 5, 6, 2, 3])}'
assert largest_rectangle([2, 4]) == 4 and largest_rectangle([]) == 0, 'Маленькие случаи'
assert largest_rectangle([5]) == 5 and largest_rectangle([3, 3, 3]) == 9, 'Одно здание и одинаковые высоты'
assert largest_rectangle([6, 2, 5, 4, 5, 1, 6]) == 12, 'Ожидалось 12'
import time as _time
_h = list(range(1, 3001))
_t0 = _time.perf_counter(); _v = largest_rectangle(_h); _dt = _time.perf_counter() - _t0
assert _v == 1500 * 1501, 'Для 1..3000 результат неверен'
assert _dt < 0.15, f'Для n=3000 — {_dt:.2f} с, это O(n²). Напишите monotonic stack'
_n = 100000
assert largest_rectangle([7] * _n) == 7 * _n, 'На 100 000 одинаковых зданиях результат неверен'
assert largest_rectangle(list(range(_n, 0, -1))) == 50000 * 50001, 'На 100 000 убывающих зданиях результат неверен'
` } }
      ]
    },
    'dsa-gate': {
      title: 'Экзамен модуля: Data Structures & Algorithms',
      body: `
<p>Итоговый экзамен модуля: выбор структуры, оценка сложности и три алгоритмические задачи (heap, DP, подсчёт на основе merge sort). Порог прохождения — 75%. В заданиях на Python тесты проверяют и большой вход, поэтому сначала подумайте о сложности.</p>
<ul>
<li>Перед тем как писать решение: каков размер входа, какого Big-O достаточно?</li>
<li>Крайние случаи: пустой вход, один элемент, равные значения.</li>
<li>Сначала проверьте маленький пример вручную, затем запускайте.</li>
</ul>`,
      ex: [
        { prompt: 'В системе регистрации 2 000 000 ИИН. При каждой новой заявке нужно тысячи раз в секунду проверять: «зарегистрирован ли уже этот ИИН?». Какая структура?', options: ['Неотсортированный list и <code>in</code>', 'set', 'Linked list', 'Сортировать list на каждый запрос и делать binary search'], explain: 'Проверка в set в среднем O(1). in в list — O(n), сортировка на каждый запрос — O(n log n).' },
        { prompt: 'Merge sort делит список из 1024 элементов пополам до частей из одного элемента. Сколько будет уровней деления (глубина рекурсии)?', explain: '1024 = 2¹⁰: 1024 → 512 → … → 1, то есть 10 уровней. Слияние на каждом уровне O(n), итого O(n log n).' },
        { prompt: 'Какова временная сложность BFS на сетке карты из R строк и C столбцов?', explain: 'Каждая клетка (вершина) один раз попадает в очередь, и для каждой проверяется не больше 4 соседей: O(V + E) = O(R · C).' },
        { prompt: `<b>Переговорные комнаты.</b> Встречи в офисе даны в виде <code>(start, end)</code> (в момент <code>end</code> комната освобождается, поэтому <code>(9, 10)</code> и <code>(10, 11)</code> могут пройти в одной комнате). <code>min_rooms(meetings)</code> — наименьшее число комнат для всех встреч. Отсортируйте по началу и держите min-heap времён окончания: O(n log n). Тест проверяет 100 000 встреч.
<pre><code>min_rooms([(9, 10), (9, 12), (11, 13)]) → 2
min_rooms([(1, 5), (5, 6)])             → 1
min_rooms([])                           → 0</code></pre>`, hints: ['В heap — время освобождения каждой комнаты. Если раньше всех освобождающаяся <code>h[0] &lt;= s</code>, используйте эту комнату повторно (<code>heapreplace</code>).', 'Иначе новая комната: <code>heappush</code>. Ответ — размер heap.'], check: { tests: `
assert min_rooms([(9, 10), (9, 12), (11, 13)]) == 2, f'Ожидалось 2, у вас {min_rooms([(9, 10), (9, 12), (11, 13)])}'
assert min_rooms([(1, 5), (5, 6)]) == 1, 'Вторая встреча может начаться в момент окончания первой'
assert min_rooms([]) == 0, 'Встреч нет — 0'
assert min_rooms([(1, 10), (2, 9), (3, 8)]) == 3, 'Если все пересекаются — 3'
assert min_rooms([(5, 8), (1, 3), (2, 6)]) == 2, 'Неотсортированный вход'
import time as _time
_m = [(_i, _i + 10**6) for _i in range(5000)]
_t0 = _time.perf_counter(); _v = min_rooms(_m); _dt = _time.perf_counter() - _t0
assert _v == 5000 and _dt < 0.15, f'Для n=5000 — {_dt:.2f} с, похоже на O(n²). Используйте сортировку + heap'
_m = [((_i * 37) % 100000, (_i * 37) % 100000 + 10) for _i in range(100000)]
assert min_rooms(_m) == 10, f'На 100 000 встреч ожидалось 10, у вас {min_rooms(_m)}'
` } },
        { prompt: `<b>Рекламные слоты.</b> Телеканал спрогнозировал доход от рекламы на каждый день: <code>income[i]</code> тыс. ₸. Чтобы зрители не уставали, нельзя ставить рекламу <b>в два дня подряд</b>. <code>best_income(income)</code> — наибольший общий доход. DP: O(n), тест проверяет 100 000 дней.
<pre><code>best_income([2, 7, 9, 3, 1]) → 12   # 2 + 9 + 1
best_income([2, 1, 1, 2])    → 4    # 2 + 2
best_income([])              → 0</code></pre>`, hints: ['Два состояния: сегодня рекламу поставили (<code>take</code>) / не поставили (<code>skip</code>).', '<code>take = skip + x</code> (вчера мы не должны были ставить), <code>skip = max(take, skip)</code> — обновляйте одновременно.'], check: { tests: `
assert best_income([2, 7, 9, 3, 1]) == 12, f'Ожидалось 12, у вас {best_income([2, 7, 9, 3, 1])}'
assert best_income([2, 1, 1, 2]) == 4, 'Ожидалось 4 (первый и последний)'
assert best_income([]) == 0 and best_income([5]) == 5, 'Пустой список и один день'
assert best_income([1, 100, 1]) == 100, 'Большой день посередине'
import time as _time
_t0 = _time.perf_counter(); _v = best_income(list(range(32))); _dt = _time.perf_counter() - _t0
assert _v == sum(range(1, 32, 2)), 'Для 0..31 результат неверен'
assert _dt < 0.05, f'{_dt:.2f} с — экспоненциальная рекурсия. Напишите DP, которое обрабатывает каждый день один раз'
_inc = [(_i * 31) % 97 for _i in range(100000)]
_a, _b = 0, 0
for _x in _inc:
    _a, _b = _b + _x, max(_a, _b)
assert best_income(_inc) == max(_a, _b), 'На 100 000 днях результат неверен'
` } },
        { prompt: `<b>Инверсии.</b> В списке рейтингов пары, где <code>i &lt; j</code>, но <code>a[i] &gt; a[j]</code>, — это инверсии; они показывают, «насколько беспорядочен» список. <code>count_inversions(a)</code> должна посчитать их за O(n log n): считайте во время слияния в merge sort (когда берётся элемент справа, все оставшиеся слева больше него). Тест проверяет 100 000 элементов.
<pre><code>count_inversions([2, 4, 1, 3, 5]) → 3    # (2,1), (4,1), (4,3)
count_inversions([5, 4, 3, 2, 1]) → 10
count_inversions([])              → 0</code></pre>`, hints: ['<code>sort_count</code> — как merge sort: рекурсивно обработайте обе половины и сложите их инверсии.', 'Если при слиянии берётся <code>right[j]</code>, то <code>inv += len(left) - i</code>. Равные значения — не инверсия: <code>&lt;=</code>.'], starter: `def count_inversions(a):
    def sort_count(arr):
        # должна вернуть (отсортированный список, число инверсий)
        pass
    return 0
`, check: { tests: `
assert count_inversions([2, 4, 1, 3, 5]) == 3, f'Ожидалось 3, у вас {count_inversions([2, 4, 1, 3, 5])}'
assert count_inversions([5, 4, 3, 2, 1]) == 10, '5 убывающих элементов — 10'
assert count_inversions([]) == 0 and count_inversions([7]) == 0, 'Пустой список и один элемент'
assert count_inversions([1, 1, 1]) == 0, 'Равные значения — не инверсия'
import time as _time, random as _random
_R = _random.Random(41)
_a = [_R.randint(0, 50) for _ in range(300)]
assert count_inversions(_a) == sum(1 for _i in range(300) for _j in range(_i + 1, 300) if _a[_i] > _a[_j]), 'На случайных 300 элементах результат неверен'
_a = list(range(8000, 0, -1))
_t0 = _time.perf_counter(); _v = count_inversions(_a); _dt = _time.perf_counter() - _t0
assert _v == 8000 * 7999 // 2, 'На 8000 убывающих элементах результат неверен'
assert _dt < 0.5, f'Для n=8000 — {_dt:.2f} с, это O(n²). Считайте через merge sort'
_a = [(_i * 7) % 100000 for _i in range(100000)]
_v = count_inversions(_a)
_bit = [0] * 100001; _exp = 0
for _k, _x in enumerate(_a):
    _p = _x + 1; _s = 0
    while _p > 0:
        _s += _bit[_p]; _p -= _p & -_p
    _exp += _k - _s
    _p = _x + 1
    while _p <= 100000:
        _bit[_p] += 1; _p += _p & -_p
assert _v == _exp, f'На 100 000 элементах ожидалось {_exp}, у вас {_v}'
` } }
      ]
    }
  }
});
