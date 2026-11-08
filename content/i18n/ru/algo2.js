// DSA2 Advanced Algorithms: Russian text. Code, solutions and expected output are in content/algo2.js.
DJ.i18n.patch({
  modules: {
    'dsa-2': { intro: `Следующий шаг после DSA1: систематический подход к решению задач, sliding window и prefix sum, устройство hash table, линейные сортировки и heapsort, сбалансированные деревья, union-find, Dijkstra, minimum spanning tree, greedy, более сложный DP, KMP и trie. В каждом уроке вы сами пишете алгоритм на Python, а тесты проверяют и граничные случаи, и скорость.` }
  },
  lessons: {
    'alg-1': {
      title: 'Как решать алгоритмическую задачу',
      body: `
<p>В курсе DSA1 вы изучили инструменты: hash map, два указателя, binary search, BFS, DP. Теперь вопрос другой: <b>с чего начинать, когда видишь новую задачу?</b> Опытный разработчик не пишет код сразу. Он действует по одной и той же схеме из нескольких шагов.</p>
<h3>Пять шагов</h3>
<ul>
<li><b>Прочитать условие.</b> Что на входе, что на выходе, какие ограничения? Если <code>n ≤ 10⁵</code>, то O(n²) не пройдёт. Могут ли числа быть отрицательными? Может ли прийти пустой список?</li>
<li><b>Примеры.</b> Разберите данный пример вручную, затем придумайте граничные случаи сами: пустой вход, один элемент, все значения одинаковы, максимальное значение.</li>
<li><b>Brute force.</b> Сначала назовите самое простое верное решение (иногда его стоит и записать). Оно может быть медленным, но станет «эталоном», с которым проверяется ответ.</li>
<li><b>Улучшение.</b> Какая часть brute force повторяется? Можно ли ускорить её с помощью set, dict, сортировки, prefix sum или heap?</li>
<li><b>Проверка.</b> Назовите сложность по времени и по <b>памяти</b>, проверьте граничные случаи кодом.</li>
</ul>
<h3>Время и память</h3>
<p>Big-O относится не только ко времени, но и к памяти. Если вы собираете n элементов в <code>set</code>, дополнительная память составляет O(n). Таблица DP размером n×m занимает O(n·m) памяти, а если хранить только предыдущую строку, достаточно O(m). Рекурсия тоже занимает память: при глубине d в стеке лежат d кадров.</p>
<h3>Полуоткрытый отрезок [l, r)</h3>
<p>В Python <code>range(l, r)</code> и <code>a[l:r]</code> включают левую границу и не включают правую. Это удобно: длина отрезка равна <code>r - l</code>, а отрезки <code>[0, k)</code> и <code>[k, n)</code> не перекрываются и полностью делят список. В своих функциях тоже придерживайтесь этого соглашения, и ошибок «на единицу» (off-by-one) станет меньше.</p>
<pre><code>from bisect import bisect_left

# Отсортированные суммы чеков магазина в Алматы
checks = [800, 1200, 1200, 2500, 4000, 7300]
# Количество чеков в [1000, 4000)
lo = bisect_left(checks, 1000)   # первый индекс, где значение не меньше 1000: 1
hi = bisect_left(checks, 4000)   # первый индекс, где значение не меньше 4000: 4
print(hi - lo)                   # 3 чека: 1200, 1200, 2500</code></pre>
<p>Два вызова <code>bisect_left</code> и разность <code>hi - lo</code> — классический шаблон для полуоткрытого отрезка. Каждый запрос занимает O(log n).</p>
<h3>Частые ошибки</h3>
<ul>
<li>Не прочитав ограничения, сразу написать решение за O(n²).</li>
<li>Последний индекс цикла: <code>range(len(a) - 1)</code> пропускает последний элемент.</li>
<li>Не проверить пустой вход: <code>max([])</code> выдаёт ошибку.</li>
<li>Поверить быстрому решению, не сравнив его с brute force.</li>
</ul>
<h3>Этапы собеседования</h3>
<p>Техническое собеседование обычно проходит так: уточняющие вопросы к задаче (2–3 минуты), идея brute force, улучшенная идея и её сложность, написание кода, ручной «прогон» на примере. Не молчите: вслух проговорённый ход мыслей оценивается так же, как и сам код.</p>
<div class="tip"><b>Совет:</b> когда пишете быструю версию, держите рядом brute force и на случайных маленьких входах сравнивайте оба решения. Это самый дешёвый и надёжный способ тестирования.</div>`,
      ex: [
        {
          prompt: `В онлайн-библиотеке <code>n</code> книг, на одну страницу помещается <code>size</code> книг. Функция <code>pages(n, size)</code> должна вернуть каждую страницу как полуоткрытый отрезок <code>(l, r)</code>: на странице книги с номера <code>l</code> до <code>r - 1</code>.
<pre><code>pages(10, 4) → [(0, 4), (4, 8), (8, 10)]
pages(8, 4)  → [(0, 4), (4, 8)]
pages(0, 3)  → []</code></pre>`,
          hints: ['<code>range(0, n, size)</code> даёт начало каждой страницы.', 'Правая граница последней страницы не должна превышать <code>n</code>: <code>min(l + size, n)</code>.'],
          check: { tests: String.raw`
assert pages(10, 4) == [(0, 4), (4, 8), (8, 10)], "pages(10, 4): последней должна быть страница (8, 10)"
assert pages(8, 4) == [(0, 4), (4, 8)], "pages(8, 4): пустая страница не должна добавляться"
assert pages(0, 3) == [], "Если книг нет, то и страниц нет: []"
assert pages(3, 5) == [(0, 3)], "Одной страницы достаточно: [(0, 3)]"
assert pages(5, 1) == [(i, i + 1) for i in range(5)], "При size = 1 на каждой странице по одной книге"
_p = pages(1003, 10)
assert sum(r - l for l, r in _p) == 1003 and _p[-1] == (1000, 1003), "Страницы должны ровно один раз покрывать все книги"
` } },
        {
          prompt: `<code>count_between(checks, lo, hi)</code>: в отсортированном списке <code>checks</code> количество значений, для которых <code>lo ≤ x &lt; hi</code>. Тест делает тысячи запросов, поэтому каждый раз проходить весь список нельзя: используйте <code>bisect_left</code>.
<pre><code>count_between([800, 1200, 1200, 2500, 4000], 1000, 4000) → 3
count_between([800, 1200], 5000, 9000)                   → 0
count_between([], 0, 10)                                 → 0</code></pre>`,
          starter: `from bisect import bisect_left

def count_between(checks, lo, hi):
    return 0
`,
          hints: ['Ответ: <code>bisect_left(checks, hi) - bisect_left(checks, lo)</code>.', '<code>hi ≤ lo</code> означает пустой отрезок: 0.'],
          check: { tests: String.raw`
assert count_between([800, 1200, 1200, 2500, 4000], 1000, 4000) == 3, "В отрезке [1000, 4000) три чека, 4000 не входит"
assert count_between([800, 1200, 1200, 2500, 4000], 1200, 1201) == 2, "Граничное значение 1200 должно быть посчитано дважды"
assert count_between([800, 1200], 5000, 9000) == 0, "В отрезке нет значений: 0"
assert count_between([], 0, 10) == 0, "Пустой список: 0"
assert count_between([5, 6, 7], 7, 5) == 0, "Если hi ≤ lo, отрезок пуст: 0"
assert count_between([1, 2, 3], 0, 100) == 3, "Все значения попадают в отрезок: 3"
import random as _random, time as _time
_R = _random.Random(7)
_a = sorted(_R.randint(0, 10**6) for _ in range(50000))
_qs = [(_R.randint(0, 10**6), _R.randint(0, 10**6)) for _ in range(3000)]
_t0 = _time.perf_counter()
_res = [count_between(_a, l, h) for l, h in _qs]
_dt = _time.perf_counter() - _t0
assert _res[0] == sum(1 for x in _a if _qs[0][0] <= x < _qs[0][1]), "На большом списке результат неверен"
assert _dt < 0.5, "3000 запросов слишком медленные: решайте каждый за O(log n) через bisect"
` } },
        {
          prompt: `В кофейне <code>a</code> — суммы чеков. <code>count_pairs_diff(a, k)</code> должна вернуть количество пар индексов <code>(i &lt; j)</code>, для которых разность равна ровно <code>k</code>: <code>|a[i] - a[j]| == k</code>. В стартовом коде есть эталон <code>brute</code> (O(n²)). Напишите вариант за O(n): тест сравнивает оба решения на случайных входах, затем измеряет время на 60 000 элементах.
<pre><code>count_pairs_diff([1, 5, 3, 4, 2], 2) → 3   # (1,3), (5,3), (4,2)
count_pairs_diff([7, 7, 7], 0)       → 3
count_pairs_diff([], 1)              → 0</code></pre>`,
          starter: `from collections import Counter

def brute(a, k):
    return sum(1 for i in range(len(a)) for j in range(i + 1, len(a)) if abs(a[i] - a[j]) == k)

def count_pairs_diff(a, k):
    return 0
`,
          hints: ['<code>Counter(a)</code> даёт количество каждого значения. При <code>k &gt; 0</code> для каждого <code>x</code> добавьте <code>cnt[x] * cnt[x + k]</code>: каждая пара учитывается один раз.', '<code>k == 0</code> — особый случай: из c одинаковых значений получается <code>c * (c - 1) // 2</code> пар.'],
          check: { tests: String.raw`
assert count_pairs_diff([1, 5, 3, 4, 2], 2) == 3, "[1, 5, 3, 4, 2], k=2: 3 пары"
assert count_pairs_diff([7, 7, 7], 0) == 3, "k = 0: из трёх одинаковых значений 3 пары"
assert count_pairs_diff([], 1) == 0, "Пустой список: 0"
assert count_pairs_diff([1, 1, 2, 2], 1) == 4, "Повторяющиеся значения: каждая 1 с каждой 2 даёт пару, всего 4"
import random as _random, time as _time
_R = _random.Random(3)
for _ in range(200):
    _a = [_R.randint(0, 9) for _ in range(_R.randint(0, 12))]
    _k = _R.randint(0, 4)
    assert count_pairs_diff(_a, _k) == brute(_a, _k), "Результат не совпал с brute: " + str((_a, _k))
_big = [_R.randint(0, 10**5) for _ in range(60000)]
_t0 = _time.perf_counter(); count_pairs_diff(_big, 17); _dt = _time.perf_counter() - _t0
assert _dt < 0.5, "60 000 элементов слишком медленно: решите за O(n) через Counter"
` } },
        {
          prompt: `Какова <b>сложность по дополнительной памяти</b> у этой функции (n = len(a))?<pre><code>def best_day(a):
    best, cur = 0, 0
    for x in a:
        cur = max(0, cur + x)
        best = max(best, cur)
    return best</code></pre>`,
          options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
          explain: `Из входного списка сохраняются только две переменные: <code>best</code> и <code>cur</code>. Время O(n), дополнительная память O(1).`
        }
      ]
    },
    'alg-2': {
      title: 'Sliding window и prefix sums',
      body: `
<p>В DSA1 мы видели одномерный prefix sum и задачу «самая длинная подстрока без повторяющихся символов». В этом уроке систематизируем два приёма: <b>sliding window</b> (скользящее окно) и <b>prefix sums</b>, включая двумерный вариант.</p>
<h3>Окно фиксированного размера</h3>
<p>В автобусном парке Астаны есть суточное число пассажиров. Нужно посчитать скользящую сумму за 7 дней. Наивный подход пересчитывает каждое окно заново: O(n·k). Умный способ: когда окно сдвигается на один шаг вправо, вычитаем значение, которое вышло слева, и прибавляем значение, которое вошло справа. Каждый шаг занимает O(1), всего O(n).</p>
<pre><code>def moving_sums(a, k):
    if k &gt; len(a):
        return []
    s = sum(a[:k])          # первое окно [0, k)
    out = [s]
    for r in range(k, len(a)):
        s += a[r] - a[r - k]   # a[r] вошёл, a[r - k] вышел
        out.append(s)
    return out

print(moving_sums([3, 1, 4, 1, 5], 2))   # [4, 5, 5, 6]</code></pre>
<h3>Окно переменного размера</h3>
<p>Два указателя <code>l</code> и <code>r</code> задают границы окна <code>[l, r]</code>. Указатель <code>r</code> всегда движется вправо. Если окно нарушает условие (например, символ встретился дважды или различных символов больше k), сдвигаем <code>l</code> вправо, пока условие снова не выполнится. Каждый указатель проходит не более n шагов, поэтому общее время O(n). Количество символов в окне храним в <code>dict</code> или <code>Counter</code>. Ключ, у которого количество упало до 0, нужно удалять, иначе <code>len</code> будет считаться неверно.</p>
<h3>Prefix sums: два измерения</h3>
<p>В одном измерении <code>pre[i]</code> — сумма первых i элементов, а отрезок <code>[l, r)</code> равен <code>pre[r] - pre[l]</code>. Представьте таблицу сети кофеен: строка — филиал, столбец — час. Чтобы отвечать на множество запросов вида «выручка филиалов 2–5 в часы 9–13», строим <code>P[i][j]</code> как сумму прямоугольника <code>[0, i) × [0, j)</code>:</p>
<pre><code>P[i + 1][j + 1] = g[i][j] + P[i][j + 1] + P[i + 1][j] - P[i][j]
# сумма [r1, r2) × [c1, c2):
P[r2][c2] - P[r1][c2] - P[r2][c1] + P[r1][c1]</code></pre>
<p>Угол <code>P[r1][c1]</code> вычитается дважды, поэтому его прибавляем обратно один раз (принцип включения-исключения). Построение таблицы занимает O(R·C), каждый запрос — O(1).</p>
<h3>Частые ошибки</h3>
<ul>
<li>Забыть случай, когда размер окна больше длины списка (<code>k &gt; n</code>), и не вернуть пустой результат.</li>
<li>Строить prefix-массив длиной <code>n</code>, а не <code>n + 1</code>: нужен элемент <code>pre[0] = 0</code>.</li>
<li>В списке с отрицательными числами sliding window для условия «сумма ≥ target» не работает: сужение окна не обязательно уменьшает сумму. Тогда нужны prefix sum + hash map или другой подход.</li>
<li>Не удалять из Counter ключ, количество которого упало до нуля.</li>
</ul>
<div class="tip"><b>Совет:</b> если в условии встречаются слова «соседние элементы», «подмассив», «последние k дней», сначала подумайте о sliding window. Если же есть «много запросов на сумму отрезка», постройте prefix sum.</div>`,
      ex: [
        {
          prompt: `<code>moving_average(values, k)</code>: верните список средних значений для каждого полного окна из <code>k</code> дней, округлённых до 2 знаков (<code>round(x, 2)</code>). Если <code>k &gt; len(values)</code>, верните <code>[]</code>. Тест измеряет время на 100 000 днях с окном k = 2000, поэтому не пересчитывайте каждое окно заново.
<pre><code>moving_average([10, 20, 30, 40], 2) → [15.0, 25.0, 35.0]
moving_average([5], 3)              → []</code></pre>`,
          hints: ['Сумму первого окна найдите через <code>sum(values[:k])</code>.', 'На каждом следующем шаге: <code>s += values[r] - values[r - k]</code>.'],
          check: { tests: String.raw`
assert moving_average([10, 20, 30, 40], 2) == [15.0, 25.0, 35.0], "[10, 20, 30, 40], k=2 → [15.0, 25.0, 35.0]"
assert moving_average([5], 3) == [], "Если k > len, то []"
assert moving_average([4, 8, 6], 3) == [6.0], "k = len: одно окно"
assert moving_average([1, 2], 1) == [1.0, 2.0], "k = 1: каждое значение само по себе"
assert moving_average([1, 2, 2], 3) == [1.67], "Округление: 5/3 → 1.67"
import random as _random, time as _time
_R = _random.Random(5)
_v = [_R.randint(0, 500) for _ in range(100000)]
_t0 = _time.perf_counter(); _m = moving_average(_v, 2000); _dt = _time.perf_counter() - _t0
assert len(_m) == 98001 and _m[123] == round(sum(_v[123:2123]) / 2000, 2), "На большом входе результат неверен"
assert _dt < 0.5, "100 000 дней слишком медленно: обновляйте сумму окна за O(1)"
` } },
        {
          prompt: `<code>max_sum_window(a, k)</code>: найдите окно длины ровно <code>k</code> с наибольшей суммой и верните <code>(сумма, начальный_индекс)</code>. При равных суммах берите самое левое окно. Если <code>k &gt; len(a)</code> или <code>k ≤ 0</code>, верните <code>None</code>. Числа могут быть и отрицательными.
<pre><code>max_sum_window([2, -1, 3, 5, -2, 4], 2) → (8, 2)
max_sum_window([-3, -1, -2], 1)         → (-1, 1)</code></pre>`,
          hints: ['Начальное значение <code>best</code> не должно быть 0: это должна быть сумма первого окна, ведь все числа могут быть отрицательными.', 'Обновляйте только при <code>s &gt; best</code>: тогда останется самое левое окно.'],
          check: { tests: String.raw`
assert max_sum_window([2, -1, 3, 5, -2, 4], 2) == (8, 2), "Сумма [3, 5] равна 8, начало 2"
assert max_sum_window([-3, -1, -2], 1) == (-1, 1), "Все отрицательные: (-1, 1)"
assert max_sum_window([1, 2, 3], 3) == (6, 0), "k = len: весь список"
assert max_sum_window([1, 2], 3) is None, "Если k > len, то None"
assert max_sum_window([4, 0, 4, 0], 2) == (4, 0), "При равных суммах берётся самое левое окно"
assert max_sum_window([], 1) is None, "Пустой список: None"
import random as _random, time as _time
_R = _random.Random(11)
_a = [_R.randint(-100, 100) for _ in range(100000)]
_t0 = _time.perf_counter(); _res = max_sum_window(_a, 3000); _dt = _time.perf_counter() - _t0
assert _res[0] == sum(_a[_res[1]:_res[1] + 3000]), "На большом входе сумма и индекс не совпадают"
assert _dt < 0.5, "Слишком медленно: обновляйте сумму окна на каждом шаге за O(1)"
` } },
        {
          prompt: `<code>longest_k_distinct(s, k)</code>: длина самой длинной подстроки (подряд идущие символы), в которой не больше <code>k</code> различных символов. Это общий вид задачи «без повторяющихся символов» из DSA1. Решение должно работать за O(n).
<pre><code>longest_k_distinct("eceba", 2)   → 3   # "ece"
longest_k_distinct("aaaa", 1)    → 4
longest_k_distinct("abc", 0)     → 0</code></pre>`,
          starter: `def longest_k_distinct(s, k):
    return len(s)
`,
          hints: ['Храните в словаре <code>cnt</code> количество каждого символа в окне. Двигайте <code>l</code>, пока <code>len(cnt) &gt; k</code>.', 'Символ, количество которого упало до 0, удаляйте через <code>del cnt[left]</code>.'],
          check: { tests: String.raw`
assert longest_k_distinct("eceba", 2) == 3, "eceba, k=2 → 3 (ece)"
assert longest_k_distinct("aaaa", 1) == 4, "aaaa, k=1 → 4"
assert longest_k_distinct("abc", 0) == 0, "k = 0 → 0"
assert longest_k_distinct("", 3) == 0, "Пустая строка → 0"
assert longest_k_distinct("abc", 5) == 3, "k больше числа различных символов: вся строка"
assert longest_k_distinct("aabbcc", 2) == 4, "aabbcc, k=2 → 4 (aabb)"
import random as _random, time as _time
_R = _random.Random(2)
def _brute(s, k):
    return max([j - i for i in range(len(s) + 1) for j in range(i, len(s) + 1) if len(set(s[i:j])) <= k] + [0])
for _ in range(60):
    _s = "".join(_R.choice("abc") for _ in range(_R.randint(0, 10)))
    _k = _R.randint(0, 3)
    assert longest_k_distinct(_s, _k) == _brute(_s, _k), "Ошибка при случайной проверке: " + repr((_s, _k))
_big = "".join(_R.choice("abcdefgh") for _ in range(100000))
_t0 = _time.perf_counter(); longest_k_distinct(_big, 4); _dt = _time.perf_counter() - _t0
assert _dt < 0.8, "100 000 символов слишком медленно: sliding window должен работать за O(n)"
` } },
        {
          prompt: `Сеть кофеен: <code>grid[i][j]</code> — выручка филиала <code>i</code> в час <code>j</code>. Функция <code>rect_sums(grid, queries)</code> для каждого запроса <code>(r1, c1, r2, c2)</code> возвращает сумму полуоткрытого прямоугольника <code>[r1, r2) × [c1, c2)</code>. Постройте двумерный prefix sum: тест отправляет 10 000 запросов.
<pre><code>g = [[1, 2, 3],
     [4, 5, 6]]
rect_sums(g, [(0, 0, 2, 3), (1, 1, 2, 3), (0, 1, 0, 3)]) → [21, 11, 0]</code></pre>`,
          starter: `def rect_sums(grid, queries):
    return [0 for _ in queries]
`,
          hints: ['Таблица <code>P</code> имеет размер <code>(R + 1) × (C + 1)</code> и заполняется нулями.', 'Ответ на запрос: <code>P[r2][c2] - P[r1][c2] - P[r2][c1] + P[r1][c1]</code>.'],
          check: { tests: String.raw`
_g = [[1, 2, 3], [4, 5, 6]]
assert rect_sums(_g, [(0, 0, 2, 3), (1, 1, 2, 3), (0, 1, 0, 3)]) == [21, 11, 0], "Ожидается [21, 11, 0]"
assert rect_sums(_g, [(0, 2, 2, 3)]) == [9], "Последний столбец: 3 + 6 = 9"
assert rect_sums(_g, []) == [], "Запросов нет: []"
assert rect_sums([[7]], [(0, 0, 1, 1)]) == [7], "Таблица 1×1"
import random as _random, time as _time
_R = _random.Random(9)
_G = [[_R.randint(0, 99) for _ in range(120)] for _ in range(120)]
_Q = [(0, 0, 120, 120)] * 10000
_t0 = _time.perf_counter(); _out = rect_sums(_G, _Q); _dt = _time.perf_counter() - _t0
assert _out[0] == sum(map(sum, _G)), "Сумма всей таблицы неверна"
assert _dt < 0.5, "10 000 запросов слишком медленно: постройте таблицу prefix sums, чтобы каждый запрос работал за O(1)"
` } }
      ]
    },
    'alg-3': {
      title: 'Внутри hash table',
      body: `
<p>В DSA1 мы использовали <code>dict</code> и <code>set</code> как инструмент со «средним O(1)». В этом уроке посмотрим, что у них внутри, и напишем собственную <b>hash table</b>.</p>
<h3>Hash function и bucket</h3>
<p>Hash table — это массив из <code>m</code> ячеек (bucket). Чтобы сохранить ключ, <b>hash function</b> превращает его в целое число, а затем находим индекс ячейки: <code>i = hash(key) % m</code>. Хорошая hash function равномерно распределяет ключи по ячейкам. В Python <code>hash("Алматы")</code> для строк может меняться от запуска к запуску, а для целых чисел <code>hash(42) == 42</code>.</p>
<h3>Collision: коллизия</h3>
<p>Два разных ключа могут попасть в одну ячейку: это <b>collision</b> (коллизия). Есть два основных способа её разрешить.</p>
<ul>
<li><b>Chaining (цепочки):</b> в каждой ячейке список. Ключи, попавшие в одну ячейку, добавляются в этот список. Поиск: находим ячейку и перебираем список.</li>
<li><b>Open addressing (открытая адресация, linear probing):</b> всё лежит в одном массиве. Если ячейка занята, смотрим следующую, <code>(i + 1) % m</code>. Собственный <code>dict</code> в Python использует открытую адресацию (с более сложной последовательностью проб).</li>
</ul>
<pre><code>m = 8
buckets = [[] for _ in range(m)]
for key, val in [(10, "Нан"), (18, "Сүт"), (3, "Шай")]:
    buckets[hash(key) % m].append((key, val))
# 10 % 8 = 2 и 18 % 8 = 2: коллизия, оба попадают в buckets[2]
print(buckets[2])   # [(10, 'Нан'), (18, 'Сүт')]</code></pre>
<h3>Load factor и rehashing</h3>
<p><b>Load factor</b> α = n / m, где n — количество элементов. По мере роста α цепочки становятся длиннее, и операции замедляются. Поэтому, когда α превышает заданный порог (например, 0.75), таблица делает <b>rehashing</b>: удваивает число ячеек и заново распределяет все ключи по новому <code>% m</code>. Один rehash стоит O(n), но происходит он редко, поэтому средняя (amortized) стоимость одного <code>put</code> остаётся O(1).</p>
<table>
<tr><th></th><th>Chaining</th><th>Linear probing</th></tr>
<tr><td>В ячейке</td><td>список пар</td><td>одна пара или пусто</td></tr>
<tr><td>Может ли α &gt; 1</td><td>да</td><td>нет, α обязательно &lt; 1</td></tr>
<tr><td>Удаление</td><td>удалить из списка</td><td>нужна метка «tombstone»</td></tr>
<tr><td>Удобно для кэша</td><td>хуже</td><td>да, данные лежат подряд</td></tr>
</table>
<h3>Частые ошибки</h3>
<ul>
<li>Добавить пару при <code>put</code>, не проверив, нет ли уже такого ключа: ключ будет сохранён дважды.</li>
<li>При rehash сохранять старый индекс: его нужно пересчитать по новому <code>m</code>.</li>
<li>Использовать изменяемый объект (list) как ключ: у него нет hash.</li>
<li>Забыть про худший случай: если все ключи попали в одну ячейку, операция занимает O(n).</li>
</ul>
<div class="tip"><b>Совет:</b> если на собеседовании спросят «почему dict работает за O(1)?», назовите три вещи: hash function, способ разрешения коллизий и load factor с rehashing. И обязательно уточните: «в среднем O(1), в худшем O(n)».</div>`,
      ex: [
        { prompt: 'В таблице с chaining 8 ячеек, порог rehash α &gt; 0.75. При добавлении какого по счёту элемента произойдёт первый rehash?', options: ['6-й', '7-й', '8-й', '9-й'], explain: '6 / 8 = 0.75, это не превышает порог. 7 / 8 = 0.875 &gt; 0.75, поэтому на 7-м элементе таблица увеличивается до 16 ячеек.' },
        {
          prompt: `Реализуйте класс <code>HashMap</code> с цепочками (chaining). Не используйте внутри встроенный <code>dict</code> Python.
<ul>
<li><code>self.buckets</code>: список из <code>capacity</code> (по умолчанию 8) списков, в каждом внутреннем списке пары <code>(key, value)</code>; <code>self.size</code>: количество элементов.</li>
<li><code>put(key, value)</code>: заменяет значение существующего ключа или добавляет новый. После добавления, если <code>size / len(buckets) &gt; 0.75</code>, удваивает число ячеек и перераспределяет все пары.</li>
<li><code>get(key, default=None)</code>, <code>remove(key)</code> (возвращает <code>True</code>, если ключ удалён, и <code>False</code>, если его не было), <code>__len__</code>.</li>
</ul>
Индекс ячейки: <code>hash(key) % len(self.buckets)</code>.`,
          starter: `class HashMap:
    def __init__(self, capacity=8):
        self.buckets = [[] for _ in range(capacity)]
        self.size = 0

    def put(self, key, value):
        pass

    def get(self, key, default=None):
        return default

    def remove(self, key):
        return False

    def __len__(self):
        return self.size
`,
          hints: ['Вспомогательный метод <code>_bucket(key)</code> возвращает список-ячейку. <code>put</code>, <code>get</code> и <code>remove</code> используют его.', 'Rehash: сохраните старые <code>buckets</code>, создайте новые пустые списки и заново разложите каждую пару по <code>hash(k) % m</code>.'],
          check: { tests: String.raw`
_m = HashMap()
_m.put("Алматы", 2000000); _m.put("Астана", 1400000); _m.put("Алматы", 2200000)
assert _m.get("Алматы") == 2200000, "put должен заменять значение существующего ключа"
assert len(_m) == 2, "Если ключ повторяется, size не должен расти"
assert _m.get("Шымкент") is None and _m.get("Шымкент", 0) == 0, "Для отсутствующего ключа возвращается default"
assert _m.remove("Астана") is True and _m.remove("Астана") is False, "remove: для существующего ключа True, для отсутствующего False"
assert len(_m) == 1 and _m.get("Астана") is None, "Удалённый ключ не должен находиться"
_c = HashMap()
for _i in range(6):
    _c.put(_i, _i)
assert len(_c.buckets) == 8, "При 6 элементах α = 0.75, rehash ещё не должен произойти"
_c.put(6, 6)
assert len(_c.buckets) == 16, "На 7-м элементе таблица должна вырасти до 16 ячеек"
assert all(_c.get(_i) == _i for _i in range(7)), "После rehash все ключи должны находиться"
assert all(isinstance(b, list) for b in _c.buckets), "buckets: список списков"
import time as _time
_big = HashMap()
_t0 = _time.perf_counter()
for _i in range(20000):
    _big.put(_i * 7, _i)
_ok = all(_big.get(_i * 7) == _i for _i in range(0, 20000, 3))
_dt = _time.perf_counter() - _t0
assert _ok and len(_big) == 20000, "После 20 000 ключей значения неверны"
assert max(len(b) for b in _big.buckets) <= 8, "Цепочки слишком длинные: при превышении load factor делайте rehash"
assert _dt < 1.0, "20 000 операций put/get слишком медленно"
` } },
        {
          prompt: `Linear probing. <code>table</code> — список длины <code>m</code>, свободная ячейка содержит <code>None</code>. Функция <code>probe_insert(table, key)</code> ставит целочисленный <code>key</code> в первую свободную ячейку, начиная с ячейки <code>key % m</code> (дойдя до конца, продолжает с начала), и возвращает её индекс. Если ключ уже есть в таблице, верните его индекс и ничего не меняйте. Если таблица заполнена, верните <code>-1</code>.
<pre><code>t = [None] * 5
probe_insert(t, 7)   → 2
probe_insert(t, 12)  → 3    # 12 % 5 = 2 занято
probe_insert(t, 4)   → 4
probe_insert(t, 9)   → 0    # 4 занято, вернулись к началу</code></pre>`,
          hints: ['Проверяйте не более <code>m</code> ячеек: <code>for _ in range(m)</code>.', 'Следующая ячейка: <code>i = (i + 1) % m</code>.'],
          check: { tests: String.raw`
_t = [None] * 5
assert probe_insert(_t, 7) == 2, "7 % 5 = 2: свободная ячейка"
assert probe_insert(_t, 12) == 3, "12 % 5 = 2 занято, следующая 3"
assert probe_insert(_t, 4) == 4, "4 % 5 = 4: свободна"
assert probe_insert(_t, 9) == 0, "9 % 5 = 4 занято, возвращаемся к началу: 0"
assert _t == [9, None, 7, 12, 4], "Состояние таблицы неверно: " + str(_t)
assert probe_insert(_t, 12) == 3 and _t.count(12) == 1, "Существующий ключ не должен добавляться повторно"
assert probe_insert(_t, 1) == 1, "Последняя свободная ячейка: 1"
assert probe_insert(_t, 100) == -1, "Таблица заполнена: -1"
` } }
      ]
    },
    'alg-4': {
      title: 'Линейные сортировки и heapsort',
      body: `
<p>В DSA1 мы видели insertion, merge и quick sort. Любая сортировка, основанная на сравнении, в худшем случае делает не менее <b>O(n log n)</b> сравнений. Но если значения — целые числа из небольшого диапазона, их можно отсортировать за линейное время, вообще не сравнивая элементы.</p>
<h3>Counting sort</h3>
<p>Баллы экзамена лежат в диапазоне от 0 до 100. Считаем, сколько раз встретился каждый балл, а затем выводим баллы по порядку. Время O(n + k), где k — размер диапазона значений. Если k маленькое (100), это быстрее <code>sorted</code>; если k очень большое (10⁹), массив не поместится в памяти.</p>
<pre><code>def counting_sort(a, max_value):
    count = [0] * (max_value + 1)
    for x in a:
        count[x] += 1
    out = []
    for v, c in enumerate(count):
        out.extend([v] * c)
    return out</code></pre>
<h3>Устойчивость (stability)</h3>
<p>Сортировка <b>устойчива</b>, если элементы с одинаковым ключом сохраняют исходный порядок. При сортировке студентов по баллу те, у кого одинаковый балл, должны остаться в списке в том же порядке, в каком были. Чтобы сделать counting sort устойчивым, для каждого балла создаём «корзину» — список, раскладываем студентов по очереди и затем объединяем корзины по порядку. Встроенная <code>sorted</code> в Python тоже устойчива, поэтому её можно применять несколько раз подряд по разным ключам.</p>
<h3>Heapsort</h3>
<p>В DSA1 мы использовали <code>heapq</code> как готовое средство. Теперь heap будем реализовывать сами. В массиве <b>max-heap</b> устроен так: дети узла <code>i</code> имеют индексы <code>2i + 1</code> и <code>2i + 2</code>, а значение родителя не меньше значений детей. Основная операция — <code>sift_down(a, i, n)</code>: значение на позиции <code>i</code> опускаем вниз, меняя его местами с большим из детей (считается, что heap — это только часть <code>[0, n)</code>).</p>
<pre><code>def sift_down(a, i, n):
    while True:
        big = i
        l, r = 2 * i + 1, 2 * i + 2
        if l &lt; n and a[l] &gt; a[big]: big = l
        if r &lt; n and a[r] &gt; a[big]: big = r
        if big == i:
            return
        a[i], a[big] = a[big], a[i]
        i = big</code></pre>
<p>Heapsort состоит из двух этапов: (1) строим heap, вызывая <code>sift_down</code> для индексов от <code>n // 2 - 1</code> до 0 в обратном порядке (O(n)); (2) меняем наибольший <code>a[0]</code> с последним элементом, уменьшаем размер heap на 1 и вызываем <code>sift_down</code> от корня. Результат: O(n log n) времени, O(1) дополнительной памяти, но сортировка не устойчива.</p>
<table>
<tr><th>Алгоритм</th><th>Среднее</th><th>Худшее</th><th>Память</th><th>Устойчивость</th></tr>
<tr><td>Insertion</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>да</td></tr>
<tr><td>Merge</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n)</td><td>да</td></tr>
<tr><td>Quick</td><td>O(n log n)</td><td>O(n²)</td><td>O(log n)</td><td>нет</td></tr>
<tr><td>Heapsort</td><td>O(n log n)</td><td>O(n log n)</td><td>O(1)</td><td>нет</td></tr>
<tr><td>Counting</td><td>O(n + k)</td><td>O(n + k)</td><td>O(n + k)</td><td>да (с корзинами)</td></tr>
</table>
<h3>Частые ошибки</h3>
<ul>
<li>В <code>sift_down</code> брать границу heap равной <code>len(a)</code>: уже отсортированная правая часть будет снова испорчена.</li>
<li>Строить heap, начиная с нуля: нужно идти снизу вверх, в обратном порядке.</li>
<li>Применять counting sort к отрицательным числам или к очень широкому диапазону значений.</li>
</ul>
<div class="tip"><b>Совет:</b> на практике в Python достаточно <code>sorted</code> (это Timsort: устойчивая сортировка, O(n log n)). Heapsort и counting sort нужно знать для собеседований и для особых ограничений: когда память должна быть O(1) или значения — небольшие целые числа.</div>`,
      ex: [
        {
          prompt: `<code>counting_sort(a, max_value)</code>: отсортируйте целые числа из диапазона <code>0..max_value</code> по возрастанию и верните новый список. Тест измеряет время на 200 000 баллах.
<pre><code>counting_sort([3, 0, 2, 3, 1], 3) → [0, 1, 2, 3, 3]
counting_sort([], 5)              → []</code></pre>`,
          starter: `def counting_sort(a, max_value):
    return a
`,
          hints: ['<code>count = [0] * (max_value + 1)</code>, для каждого <code>x</code> выполните <code>count[x] += 1</code>.', 'Затем: <code>out.extend([v] * c)</code>.'],
          check: { tests: String.raw`
assert counting_sort([3, 0, 2, 3, 1], 3) == [0, 1, 2, 3, 3], "Ожидается [0, 1, 2, 3, 3]"
assert counting_sort([], 5) == [], "Пустой список: []"
assert counting_sort([0, 0], 0) == [0, 0], "max_value = 0"
assert counting_sort([5, 5, 5], 9) == [5, 5, 5], "Все значения одинаковы"
_src = [2, 1]
_res = counting_sort(_src, 2)
assert _src == [2, 1] and _res == [1, 2], "Исходный список не должен меняться, нужно вернуть новый"
import random as _random, time as _time
_R = _random.Random(4)
_a = [_R.randint(0, 100) for _ in range(200000)]
_t0 = _time.perf_counter(); _s = counting_sort(_a, 100); _dt = _time.perf_counter() - _t0
assert _s == sorted(_a), "Большой список отсортирован неверно"
assert _dt < 0.8, "200 000 элементов слишком медленно"
` } },
        {
          prompt: `<code>stable_by_grade(students)</code>: <code>students</code> — пары <code>(имя, балл)</code>, балл от 0 до 100. Верните имена по возрастанию балла; при одинаковом балле сохраните исходный порядок. Напишите устойчивый counting sort с корзинами (bucket).
<pre><code>stable_by_grade([("Дана", 90), ("Әли", 75), ("Ерлан", 90), ("Сая", 60)])
→ ["Сая", "Әли", "Дана", "Ерлан"]</code></pre>`,
          starter: `def stable_by_grade(students):
    return [name for name, _ in students]
`,
          hints: ['Создайте 101 пустой список и кладите имена в корзину: <code>buckets[g].append(name)</code>.', 'Соберите корзины по порядку: <code>[name for b in buckets for name in b]</code>.'],
          check: { tests: String.raw`
assert stable_by_grade([("Дана", 90), ("Әли", 75), ("Ерлан", 90), ("Сая", 60)]) == ["Сая", "Әли", "Дана", "Ерлан"], "Дана должна стоять раньше Ерлана (устойчивость)"
assert stable_by_grade([]) == [], "Пустой список"
assert stable_by_grade([("Б", 100), ("А", 0)]) == ["А", "Б"], "Крайние баллы 0 и 100"
assert stable_by_grade([("x", 50), ("y", 50), ("z", 50)]) == ["x", "y", "z"], "Все баллы одинаковы: исходный порядок"
` } },
        {
          prompt: `Напишите heapsort сами (без <code>heapq</code> и <code>sorted</code>).
<ul>
<li><code>sift_down(a, i, n)</code>: считая часть <code>[0, n)</code> max-heap, опускает значение на позиции <code>i</code> вниз.</li>
<li><code>heapsort(a)</code>: сортирует список по возрастанию <b>на месте</b> и возвращает тот же список.</li>
</ul>
<pre><code>a = [1, 9, 8, 3, 7]
sift_down(a, 0, 5)  → a == [9, 7, 8, 3, 1]
heapsort([5, 2, 9, 1]) → [1, 2, 5, 9]</code></pre>`,
          starter: `def sift_down(a, i, n):
    pass

def heapsort(a):
    return a
`,
          hints: ['Построение heap: <code>for i in range(n // 2 - 1, -1, -1): sift_down(a, i, n)</code>.', 'Вторая фаза: поменяйте местами <code>a[0]</code> и <code>a[end]</code>, затем <code>sift_down(a, 0, end)</code>.'],
          check: { tests: String.raw`
_a = [1, 9, 8, 3, 7]
sift_down(_a, 0, 5)
assert _a == [9, 7, 8, 3, 1], "результат sift_down(a, 0, 5) должен быть [9, 7, 8, 3, 1], у вас " + str(_a)
_b = [1, 9, 8]
sift_down(_b, 0, 1)
assert _b == [1, 9, 8], "При n = 1 ничего не должно меняться"
_c = [5, 2, 9, 1]
assert heapsort(_c) == [1, 2, 5, 9] and _c == [1, 2, 5, 9], "heapsort должен сортировать список на месте"
assert heapsort([]) == [] and heapsort([4]) == [4], "Пустой список и список из одного элемента"
assert heapsort([3, 3, 1, 3]) == [1, 3, 3, 3], "Повторяющиеся значения"
import random as _random, time as _time
_R = _random.Random(8)
_x = [_R.randint(-10**6, 10**6) for _ in range(30000)]
_y = list(_x)
_t0 = _time.perf_counter(); heapsort(_y); _dt = _time.perf_counter() - _t0
assert _y == sorted(_x), "Большой список отсортирован неверно"
assert _dt < 1.0, "30 000 элементов слишком медленно: heapsort должен работать за O(n log n)"
` } },
        { prompt: 'Вы сначала отсортировали заказы по времени, а теперь сортируете их по городу. Внутри одного города порядок по времени должен сохраниться. Какой алгоритм <b>не подходит</b> для второй сортировки?', options: ['Merge sort', 'Python <code>sorted</code>', 'Heapsort', 'Counting sort с корзинами'], explain: 'Heapsort не является устойчивой сортировкой: порядок элементов с одинаковым ключом может измениться. Остальные три устойчивы.' }
      ]
    },
    'alg-5': {
      title: 'Сбалансированные деревья: AVL и повороты',
      body: `
<p>В DSA1 мы видели, что поиск и вставка в BST занимают O(h), где h — высота дерева. Если дерево «полное», то h ≈ log₂ n. Но есть проблема: если ключи приходят <b>в отсортированном порядке</b> (например, номера чеков 1, 2, 3, ...), каждый новый узел добавляется справа, и дерево превращается в список. Тогда h = n, а поиск занимает O(n).</p>
<h3>Высота и balance factor</h3>
<p>Договоримся, что высота пустого дерева равна 0, а высота одного узла — 1. <b>Balance factor</b> узла: <code>height(left) - height(right)</code>. <b>AVL-дерево</b>: в каждом узле balance factor равен -1, 0 или 1. Высота такого дерева не превышает примерно 1.44·log₂ n, поэтому поиск, вставка и удаление всегда занимают O(log n).</p>
<pre><code>class Node:
    def __init__(self, key, left=None, right=None):
        self.key, self.left, self.right = key, left, right

def height(node):
    if node is None:
        return 0
    return 1 + max(height(node.left), height(node.right))</code></pre>
<h3>Поворот (rotation)</h3>
<p>Если после вставки нового ключа balance factor какого-то узла становится 2 или -2, восстанавливаем баланс <b>поворотом</b>. Поворот не нарушает порядок BST (inorder не меняется), он лишь переставляет O(1) ссылок.</p>
<pre><code>#        y                x
#       / \              / \
#      x   C    →       A   y
#     / \                  / \
#    A   B                B   C
def rotate_right(y):
    x = y.left
    y.left = x.right    # B теперь левый ребёнок y
    x.right = y
    return x            # новый корень</code></pre>
<p>Есть четыре случая:</p>
<ul>
<li><b>LL</b> (тяжелее оказалась левая ветвь левого поддерева): один <code>rotate_right</code>.</li>
<li><b>RR</b>: один <code>rotate_left</code>.</li>
<li><b>LR</b>: сначала <code>rotate_left</code> для левого ребёнка, затем <code>rotate_right</code> для самого узла.</li>
<li><b>RL</b>: наоборот.</li>
</ul>
<p>Пример: если добавить 30, 10, 20 по порядку, то у 30 слева стоит 10, а справа от 10 — 20 (случай LR). Повернём 10 влево, затем 30 вправо: корень станет 20, его дети — 10 и 30.</p>
<h3>Red-black tree</h3>
<p>Ещё одно известное сбалансированное дерево — <b>red-black tree</b>. Каждый узел красный или чёрный, а правила цвета гарантируют, что самый длинный путь не более чем вдвое длиннее самого короткого. AVL сбалансирован строже (поиск немного быстрее), а red-black делает меньше поворотов (вставка и удаление немного быстрее). <code>TreeMap</code> в Java и <code>std::map</code> в C++ используют red-black tree. В стандартной библиотеке Python сбалансированного дерева нет: отсортированный список с <code>bisect</code> или <code>heapq</code> часто бывает достаточно.</p>
<h3>Частые ошибки</h3>
<ul>
<li>Не вернуть новый корень из функции поворота: часть дерева «теряется».</li>
<li>Забыть строку <code>y.left = x.right</code>: поддерево B пропадёт.</li>
<li>В <code>is_balanced</code> проверять только корень: баланс нужен в каждом узле.</li>
</ul>
<div class="tip"><b>Совет:</b> <code>is_balanced</code> можно написать за O(n): вспомогательная функция возвращает высоту, если поддерево сбалансировано, и -1, если нет. Тогда высота каждого узла вычисляется только один раз.</div>`,
      ex: [
        {
          prompt: `Класс <code>Node</code> дан. Напишите две функции: <code>height(node)</code> (пустое дерево — 0, один узел — 1) и <code>is_balanced(node)</code>, которая возвращает <code>True</code>, если в каждом узле высоты левого и правого поддеревьев отличаются не более чем на 1.
<pre><code>height(None)                    → 0
is_balanced(Node(2, Node(1)))   → True
is_balanced(Node(3, Node(2, Node(1)))) → False</code></pre>`,
          starter: `class Node:
    def __init__(self, key, left=None, right=None):
        self.key, self.left, self.right = key, left, right

def height(node):
    return 0

def is_balanced(node):
    return True
`,
          hints: ['<code>height</code>: <code>1 + max(height(node.left), height(node.right))</code>.', 'Для <code>is_balanced</code> вспомогательная функция возвращает -1, если баланс нарушен, иначе высоту.'],
          check: { tests: String.raw`
assert height(None) == 0 and height(Node(5)) == 1, "Пустое дерево: 0, один узел: 1"
_t = Node(8, Node(3, Node(1), Node(6, Node(4))), Node(10))
assert height(_t) == 4, "Путь 8 → 3 → 6 → 4: высота 4"
assert is_balanced(None) is True and is_balanced(Node(1)) is True, "Пустое дерево и один узел сбалансированы"
assert is_balanced(Node(2, Node(1))) is True, "Разность 1: сбалансировано"
assert is_balanced(Node(3, Node(2, Node(1)))) is False, "Левая высота 2, правая 0: не сбалансировано"
assert is_balanced(_t) is False, "В узле 8 слева 3, справа 1: не сбалансировано"
_bad = Node(50, Node(30, Node(20, Node(10))), Node(70, None, Node(80, None, Node(90))))
assert is_balanced(_bad) is False, "В корне разность 0, но в узлах 30 и 70 она 2: не сбалансировано"
_ok = Node(4, Node(2, Node(1), Node(3)), Node(6, Node(5)))
assert is_balanced(_ok) is True, "Это дерево сбалансировано"
` } },
        {
          prompt: `<code>rotate_right(y)</code> и <code>rotate_left(x)</code> — повороты. Обе функции возвращают новый корень, порядок BST сохраняется. <code>rotate_left</code>: <code>y = x.right</code>, <code>x.right = y.left</code>, <code>y.left = x</code>.
<pre><code>y = Node(30, Node(20, Node(10), Node(25)), Node(40))
r = rotate_right(y)   # r.key == 20, r.right.key == 30, r.right.left.key == 25</code></pre>`,
          starter: `class Node:
    def __init__(self, key, left=None, right=None):
        self.key, self.left, self.right = key, left, right

def rotate_right(y):
    return y

def rotate_left(x):
    return x
`,
          hints: ['Три шага: взять новый корень, переставить средний ребёнок-поддерево (B) и сделать старый корень ребёнком нового.', 'В конце верните новый корень через <code>return</code>.'],
          check: { tests: String.raw`
def _inorder(n):
    return _inorder(n.left) + [n.key] + _inorder(n.right) if n else []
_y = Node(30, Node(20, Node(10), Node(25)), Node(40))
_r = rotate_right(_y)
assert _r.key == 20 and _r.left.key == 10 and _r.right.key == 30, "rotate_right: новый корень 20, дети 10 и 30"
assert _r.right.left.key == 25 and _r.right.right.key == 40, "Теперь 25 должно быть левым ребёнком 30"
assert _inorder(_r) == [10, 20, 25, 30, 40], "После поворота порядок inorder должен сохраниться"
_x = Node(1, None, Node(2, None, Node(3)))
_l = rotate_left(_x)
assert _l.key == 2 and _l.left.key == 1 and _l.right.key == 3, "Случай RR: rotate_left делает корнем 2"
assert _l.left.right is None, "Правый ребёнок 1 теперь должен быть пустым"
_z = Node(30, Node(10, None, Node(20)))
_z.left = rotate_left(_z.left)
_z = rotate_right(_z)
assert (_z.key, _z.left.key, _z.right.key) == (20, 10, 30), "Случай LR: rotate_left, затем rotate_right, корень 20"
` } },
        {
          prompt: `Постройте <b>максимально сбалансированное</b> BST из отсортированных различных ключей: <code>build_balanced(keys)</code> возвращает корень (для пустого списка — <code>None</code>). Средний элемент становится корнем, левая и правая половины строятся рекурсивно. Тест на 10 000 ключах проверяет, что высота равна 14 (при цепочке было бы 10 000).`,
          starter: `class Node:
    def __init__(self, key, left=None, right=None):
        self.key, self.left, self.right = key, left, right

def build_balanced(keys):
    root = None
    return root
`,
          hints: ['Работайте с полуоткрытым отрезком: <code>build(l, r)</code>, при <code>l &gt;= r</code> возвращает <code>None</code>.', 'Середина: <code>m = (l + r) // 2</code>, затем <code>Node(keys[m], build(l, m), build(m + 1, r))</code>.'],
          check: { tests: String.raw`
def _h(n):
    return 0 if n is None else 1 + max(_h(n.left), _h(n.right))
def _inorder(n, out):
    if n:
        _inorder(n.left, out); out.append(n.key); _inorder(n.right, out)
    return out
assert build_balanced([]) is None, "Пустой список: None"
_one = build_balanced([7])
assert _one.key == 7 and _one.left is None and _one.right is None, "Один ключ: один узел"
_t = build_balanced([1, 2, 3, 4, 5, 6, 7])
assert _t.key == 4 and _h(_t) == 3, "7 ключей: корень 4, высота 3"
assert _inorder(_t, []) == [1, 2, 3, 4, 5, 6, 7], "inorder должен вернуть отсортированный список"
import time as _time
_keys = list(range(0, 20000, 2))
_t0 = _time.perf_counter(); _big = build_balanced(_keys); _dt = _time.perf_counter() - _t0
assert _inorder(_big, []) == _keys, "На 10 000 ключах порядок BST нарушен"
assert _h(_big) == 14, "Для 10 000 ключей минимальная высота 14, у вас " + str(_h(_big))
assert _dt < 1.0, "Построение слишком медленное"
` } },
        { prompt: '1, 2, 3, ..., 1000 ключей добавили в обычное (не сбалансированное) BST в таком порядке. Какой будет высота дерева?', options: ['10', '11', '500', '1000'], explain: 'Каждый новый ключ больше предыдущего, поэтому он попадает в правое поддерево: дерево превращается в цепочку из 1000 узлов. В AVL-дереве высота была бы около 10–11.' }
      ]
    },
    'alg-6': {
      title: 'Union-Find и связные компоненты',
      body: `
<p>В DSA1 мы считали компоненты с помощью BFS/DFS: это хорошо, когда граф известен целиком. А что, если связи <b>приходят одна за другой</b>? Например, в Карагандинской области строят новые дороги, и после каждой из них мы спрашиваем: «связаны ли Темиртау и Балхаш?» Каждый раз запускать BFS дорого. Для такой задачи есть структура <b>Disjoint Set Union</b> (DSU, union-find).</p>
<h3>Идея</h3>
<p>У каждого множества есть один «представитель» (корень). <code>parent[x]</code> — родитель x, а у корня родитель — он сам. Две операции:</p>
<ul>
<li><code>find(x)</code>: найти корень x.</li>
<li><code>union(a, b)</code>: объединить два множества, то есть подвесить один корень к другому.</li>
</ul>
<p>Чтобы два элемента были в одной компоненте, достаточно <code>find(a) == find(b)</code>.</p>
<h3>Две оптимизации</h3>
<ul>
<li><b>Path compression:</b> во время <code>find</code> все узлы на пути напрямую подвешиваются к корню. В следующий раз они находятся за один шаг.</li>
<li><b>Union by rank:</b> дерево меньшей высоты подвешивается к дереву большей высоты, а не наоборот. <code>rank</code> — верхняя оценка высоты дерева.</li>
</ul>
<p>Вместе они дают амортизированное время одной операции O(α(n)), где α — обратная функция Аккермана, которая на практике не превышает 5. То есть почти O(1).</p>
<pre><code>class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.count = n                  # количество компонент

    def find(self, x):
        root = x
        while self.parent[root] != root:
            root = self.parent[root]
        while self.parent[x] != root:   # path compression
            self.parent[x], x = root, self.parent[x]
        return root

    def union(self, a, b):
        ra, rb = self.find(a), self.find(b)
        if ra == rb:
            return False                # уже в одном множестве
        if self.rank[ra] &lt; self.rank[rb]:
            ra, rb = rb, ra
        self.parent[rb] = ra
        if self.rank[ra] == self.rank[rb]:
            self.rank[ra] += 1
        self.count -= 1
        return True</code></pre>
<p><code>find</code> записан итеративно: рекурсивная версия на длинной цепочке может упереться в ограничение глубины рекурсии Python.</p>
<h3>Поиск цикла</h3>
<p>Рёбра неориентированного графа добавляем одно за другим. Если <code>union(u, v)</code> вернул <code>False</code>, значит, u и v уже связаны, и новое ребро образует <b>цикл</b>. Это основа алгоритма Kruskal из следующего урока.</p>
<h3>Частые ошибки</h3>
<ul>
<li>Объединять не корни, а сами элементы: <code>parent[a] = b</code> вместо корней. Множества в этом случае объединяются неверно.</li>
<li>Уменьшать <code>count</code> при объединении двух элементов одного множества.</li>
<li>Работая с именами (строковыми ключами), забыть сначала перевести их в индексы: <code>idx = {name: i for i, name in enumerate(names)}</code>.</li>
</ul>
<div class="tip"><b>Совет:</b> вопросы «объединить группы», «в одной ли сети», «появится ли цикл при добавлении» — признаки DSU. А если нужен «кратчайший путь» или «в каком порядке», нужны BFS/DFS: DSU путь не знает.</div>`,
      ex: [
        {
          prompt: `Напишите класс <code>DSU</code>: поля <code>parent</code>, <code>rank</code>, <code>count</code>; метод <code>find(x)</code> с path compression (итеративно); метод <code>union(a, b)</code> с union by rank: возвращает <code>True</code>, если множества были разными, и <code>False</code>, если элементы уже в одном множестве. Поле <code>count</code> уменьшается только при объединении. Тест проверит скорость на 100 000 элементах.`,
          starter: `class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.count = n

    def find(self, x):
        return x

    def union(self, a, b):
        return True
`,
          hints: ['<code>find</code>: сначала найдите корень, затем вторым циклом поставьте <code>parent</code> каждого узла пути на корень.', '<code>union</code>: подвесьте корень с меньшим rank к корню с большим; если rank равны, увеличьте rank нового корня на 1.'],
          check: { tests: String.raw`
_d = DSU(5)
assert _d.union(0, 1) is True and _d.union(1, 2) is True, "Новое объединение возвращает True"
assert _d.union(0, 2) is False, "0 и 2 уже в одном множестве: False"
assert _d.count == 3, "{0,1,2}, {3}, {4}: 3 компоненты"
assert _d.find(2) == _d.find(0) and _d.find(3) != _d.find(0), "Корни, которые возвращает find, неверны"
_c = DSU(5)
_c.parent = [0, 0, 1, 2, 3]
assert _c.find(4) == 0, "Цепочка 4 → 3 → 2 → 1 → 0: корень 0"
assert _c.parent[4] == 0 and _c.parent[3] == 0 and _c.parent[2] == 0, "Path compression: узлы пути должны подвеситься непосредственно к корню"
_e = DSU(4)
_e.union(0, 1); _e.union(2, 3)
_e.union(0, 2)
assert max(_e.rank) == 2, "Union by rank: при объединении корней с равным rank значение rank растёт на 1"
import random as _random, time as _time
_R = _random.Random(6)
_n = 100000
_big = DSU(_n)
_t0 = _time.perf_counter()
for _i in range(1, _n):
    _big.union(_i - 1, _i)
for _ in range(100000):
    _big.find(_R.randrange(_n))
_dt = _time.perf_counter() - _t0
assert _big.count == 1, "После объединения цепочки остаётся 1 компонента"
assert _dt < 1.5, "100 000 операций union и find слишком медленные: добавьте path compression и union by rank"
` } },
        {
          prompt: `Студенты дружат между собой. <code>count_groups(names, friendships)</code>: <code>names</code> — список имён, <code>friendships</code> — пары <code>(имя1, имя2)</code>. Дружба транзитивна: друг моего друга находится в той же группе. Верните количество групп с помощью DSU.
<pre><code>count_groups(["Әли", "Дана", "Ерлан", "Сая"], [("Әли", "Дана"), ("Ерлан", "Дана")]) → 2
count_groups([], [])                                                       → 0</code></pre>`,
          starter: `def count_groups(names, friendships):
    return len(names)
`,
          hints: ['Переведите имена в индексы: <code>idx = {name: i for i, name in enumerate(names)}</code>.', 'При каждом успешном объединении количество групп уменьшается на 1.'],
          check: { tests: String.raw`
assert count_groups(["Әли", "Дана", "Ерлан", "Сая"], [("Әли", "Дана"), ("Ерлан", "Дана")]) == 2, "{Әли, Дана, Ерлан} и {Сая}: 2 группы"
assert count_groups([], []) == 0, "Нет студентов: 0"
assert count_groups(["А", "Б", "В"], []) == 3, "Дружбы нет: каждый сам по себе"
assert count_groups(["А", "Б"], [("А", "Б"), ("Б", "А"), ("А", "Б")]) == 1, "Повторная дружба не должна уменьшать число групп"
assert count_groups(["А"], [("А", "А")]) == 1, "Дружба с самим собой: 1 группа"
import random as _random, time as _time
_R = _random.Random(1)
_names = ["s" + str(i) for i in range(20000)]
_pairs = [(_names[i], _names[i + 1]) for i in range(0, 19999, 2)]
_t0 = _time.perf_counter(); _g = count_groups(_names, _pairs); _dt = _time.perf_counter() - _t0
assert _g == 10000, "20 000 студентов, по парам: 10 000 групп"
assert _dt < 1.0, "Слишком медленно: используйте DSU"
` } },
        {
          prompt: `В сеть городов рёбра добавляются по одному. <code>first_cycle_edge(n, edges)</code>: <code>n</code> городов (<code>0..n-1</code>), <code>edges</code> — неориентированные дороги <code>(u, v)</code>. Верните <b>первую</b> дорогу, которая замыкает цикл (в том виде, в каком она дана), или <code>None</code>, если цикла нет.
<pre><code>first_cycle_edge(4, [(0, 1), (1, 2), (2, 0), (2, 3)]) → (2, 0)
first_cycle_edge(3, [(0, 1), (1, 2)])                 → None</code></pre>`,
          starter: `def first_cycle_edge(n, edges):
    return None
`,
          hints: ['Если для ребра <code>find(u) == find(v)</code>, то это ребро замыкает цикл.', 'Иначе объедините корни: <code>parent[ru] = rv</code>.'],
          check: { tests: String.raw`
assert first_cycle_edge(4, [(0, 1), (1, 2), (2, 0), (2, 3)]) == (2, 0), "Третье ребро замыкает цикл 0-1-2"
assert first_cycle_edge(3, [(0, 1), (1, 2)]) is None, "В дереве нет цикла"
assert first_cycle_edge(2, [(0, 1), (1, 0)]) == (1, 0), "Второе ребро между двумя городами тоже образует цикл"
assert first_cycle_edge(1, [(0, 0)]) == (0, 0), "Ребро из вершины в неё саму: цикл"
assert first_cycle_edge(5, []) is None, "Нет рёбер: None"
import time as _time
_n = 100000
_edges = [(_i, _i + 1) for _i in range(_n - 1)] + [(_n - 1, 0)]
_t0 = _time.perf_counter(); _r = first_cycle_edge(_n, _edges); _dt = _time.perf_counter() - _t0
assert _r == (_n - 1, 0), "Последнее ребро длинной цепочки замыкает цикл"
assert _dt < 1.0, "100 000 рёбер слишком медленно: используйте path compression"
` } },
        { prompt: 'В DSU используется <b>только</b> union by rank (без path compression). Каково наихудшее время одного вызова <code>find</code>?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], explain: 'Union by rank удерживает высоту дерева на уровне O(log n): ранг k означает, что в дереве не меньше 2ᵏ узлов. Если добавить path compression, амортизированное время станет O(α(n)).' }
      ]
    },
    'alg-7': {
      title: 'Dijkstra: кратчайший путь во взвешенном графе',
      body: `
<p>В DSA1 BFS находит кратчайший путь, когда все рёбра одинаковы, а основной код Dijkstra мы уже видели в одной задаче. Теперь разберём алгоритм полностью: почему он работает, как восстановить путь и когда он <b>не подходит</b>.</p>
<h3>Взвешенный граф</h3>
<p>Автобусные маршруты между городами: <code>graph["Алматы"] = [("Қонаев", 70), ("Талдықорған", 270)]</code>. Вес каждого ребра (км, минуты, тенге) неотрицательный. Цель: для каждого города, кроме начального, найти наименьшее расстояние от начального.</p>
<h3>Алгоритм</h3>
<p>В heap лежат пары <code>(расстояние, вершина)</code>. На каждом шаге извлекаем из heap ближайшую вершину. Поскольку все веса неотрицательны, короче до неё пути уже не найти: её расстояние «зафиксировано». Затем делаем <b>relax</b> для её соседей: если новый путь короче, обновляем значение и кладём запись в heap. Одна вершина может оказаться в heap несколько раз; устаревшую запись (<code>d &gt; dist[u]</code>) пропускаем.</p>
<pre><code>import heapq

def dijkstra(graph, src):
    dist = {src: 0}
    prev = {}
    h = [(0, src)]
    while h:
        d, u = heapq.heappop(h)
        if d &gt; dist[u]:
            continue
        for v, w in graph.get(u, []):
            nd = d + w
            if v not in dist or nd &lt; dist[v]:
                dist[v] = nd
                prev[v] = u            # в v пришли через u
                heapq.heappush(h, (nd, v))
    return dist, prev</code></pre>
<p>Сложность O((V + E) log V). Поскольку используется только <code>dict</code>, вершинами могут быть любые hashable-значения: название города или кортеж <code>(r, c)</code> в сетке.</p>
<h3>Восстановление пути</h3>
<p><code>prev[v]</code> хранит, откуда мы пришли в каждую вершину. Идём от цели назад по <code>prev</code> и переворачиваем список:</p>
<pre><code>path = [dst]
while path[-1] != src:
    path.append(prev[path[-1]])
path.reverse()     # ['Алматы', 'Қонаев', ...]</code></pre>
<h3>Почему отрицательный вес ломает алгоритм</h3>
<p>Dijkstra «считает», что вершина, извлечённая из heap, больше не получит меньшего расстояния. При отрицательном ребре это неверно: если A → C = 2 уже зафиксировано, то путь A → B → C = 5 + (−4) = 1 может оказаться короче. Для такого графа нужен алгоритм <b>Bellman-Ford</b>: он relax-ит все рёбра V − 1 раз, O(V·E). Если после этого ещё один relax возможен, в графе есть <b>отрицательный цикл</b>: по нему расстояние можно уменьшать бесконечно.</p>
<h3>Частые ошибки</h3>
<ul>
<li>Класть в heap <code>(вершина, расстояние)</code> вместо <code>(расстояние, вершина)</code>: heap сортирует по названию вершины.</li>
<li>Не пропускать устаревшие записи: результат будет верным, но работа — медленнее.</li>
<li>Не учитывать вершины, которые встречаются только как соседи: используйте <code>graph.get(u, [])</code>.</li>
<li>Не проверять недостижимую вершину: если её нет в <code>prev</code>, пути нет.</li>
</ul>
<div class="tip"><b>Совет:</b> если нужен путь только до одной цели, можно остановиться, как только эта цель извлечена из heap. На больших картах это заметно ускоряет работу.</div>`,
      ex: [
        {
          prompt: `<code>dijkstra(graph, src)</code>: <code>graph</code> — словарь вершина → <code>[(сосед, вес), ...]</code>. Верните словарь кратчайших расстояний до всех достижимых вершин. Некоторые вершины встречаются только как соседи. Тест проверит скорость на сетке 100×100.
<pre><code>g = {"Алматы": [("Қонаев", 70), ("Талдықорған", 270)],
     "Қонаев": [("Талдықорған", 180)]}
dijkstra(g, "Алматы") → {"Алматы": 0, "Қонаев": 70, "Талдықорған": 250}</code></pre>`,
          starter: `import heapq

def dijkstra(graph, src):
    return {src: 0}
`,
          hints: ['В heap кладите <code>(расстояние, вершина)</code>; если <code>d &gt; dist[u]</code>, то <code>continue</code>.', 'Соседи: <code>graph.get(u, [])</code>.'],
          check: { tests: String.raw`
_g = {"Алматы": [("Қонаев", 70), ("Талдықорған", 270)], "Қонаев": [("Талдықорған", 180)]}
assert dijkstra(_g, "Алматы") == {"Алматы": 0, "Қонаев": 70, "Талдықорған": 250}, "Через Қонаев: 250 км, это короче"
assert dijkstra(_g, "Талдықорған") == {"Талдықорған": 0}, "Исходящих путей нет: только сам город"
assert dijkstra({}, "X") == {"X": 0}, "Пустой граф: {src: 0}"
_g2 = {"a": [("b", 1), ("c", 4)], "b": [("c", 1), ("d", 5)], "c": [("d", 1)], "e": [("a", 1)]}
assert dijkstra(_g2, "a") == {"a": 0, "b": 1, "c": 2, "d": 3}, "a → b → c → d = 3; до e нельзя добраться"
assert dijkstra({"a": [("b", 0)]}, "a") == {"a": 0, "b": 0}, "Нулевой вес"
import random as _random, time as _time
_R = _random.Random(10)
_N = 100
_G = {}
for _r in range(_N):
    for _c in range(_N):
        _G[(_r, _c)] = [((_r + dr, _c + dc), _R.randint(1, 9)) for dr, dc in ((1, 0), (0, 1), (-1, 0), (0, -1)) if 0 <= _r + dr < _N and 0 <= _c + dc < _N]
_t0 = _time.perf_counter(); _D = dijkstra(_G, (0, 0)); _dt = _time.perf_counter() - _t0
assert len(_D) == _N * _N, "Можно добраться до всех ячеек сетки"
assert all(_D[v] <= _D[u] + w for u in _G for v, w in _G[u]), "Расстояния не минимальны: их можно уменьшить через одно ребро"
assert _dt < 1.5, "10 000 вершин слишком медленно: используйте heapq"
` } },
        {
          prompt: `<code>shortest_route(graph, src, dst)</code>: верните <code>(расстояние, путь)</code>, где путь — список вершин от <code>src</code> до <code>dst</code>. Если добраться нельзя, верните <code>(None, [])</code>. Если <code>src == dst</code>, верните <code>(0, [src])</code>. Сохраните словарь <code>prev</code>.
<pre><code>g = {"Астана": [("Қарағанды", 220), ("Көкшетау", 300)],
     "Қарағанды": [("Балқаш", 380)], "Көкшетау": [("Балқаш", 700)]}
shortest_route(g, "Астана", "Балқаш") → (600, ["Астана", "Қарағанды", "Балқаш"])</code></pre>`,
          starter: `import heapq

def shortest_route(graph, src, dst):
    return (None, [])
`,
          hints: ['При relax записывайте <code>prev[v] = u</code>.', 'Путь: начните с <code>dst</code> и идите по <code>prev</code> до <code>src</code>, затем вызовите <code>reverse()</code> у списка.'],
          check: { tests: String.raw`
_g = {"Астана": [("Қарағанды", 220), ("Көкшетау", 300)], "Қарағанды": [("Балқаш", 380)], "Көкшетау": [("Балқаш", 700)]}
assert shortest_route(_g, "Астана", "Балқаш") == (600, ["Астана", "Қарағанды", "Балқаш"]), "Через Қарағанды: 600 км"
assert shortest_route(_g, "Астана", "Астана") == (0, ["Астана"]), "src == dst: (0, [src])"
assert shortest_route(_g, "Балқаш", "Астана") == (None, []), "В обратном направлении пути нет: (None, [])"
assert shortest_route(_g, "Астана", "Атырау") == (None, []), "Города нет в графе: (None, [])"
_g2 = {1: [(2, 7), (3, 9), (6, 14)], 2: [(3, 10), (4, 15)], 3: [(4, 11), (6, 2)], 4: [(5, 6)], 6: [(5, 9)]}
assert shortest_route(_g2, 1, 5) == (20, [1, 3, 6, 5]), "1 → 3 → 6 → 5 = 20"
assert shortest_route(_g2, 1, 4) == (20, [1, 3, 4]), "1 → 3 → 4 = 20"
import time as _time
_line = {_i: [(_i + 1, 1), (_i + 2, 3)] for _i in range(20000)}
_t0 = _time.perf_counter(); _d, _p = shortest_route(_line, 0, 20000); _dt = _time.perf_counter() - _t0
assert _d == 20000 and len(_p) == 20001, "На длинной цепочке путь неверен"
assert _dt < 1.0, "Слишком медленно"
` } },
        { prompt: 'Рёбра: A→B = 5, A→C = 2, B→C = −4. Dijkstra, запущенный из A, какое расстояние до C зафиксирует и каково истинное кратчайшее расстояние?', options: ['Зафиксирует 2, истина 2', 'Зафиксирует 2, истина 1', 'Зафиксирует 1, истина 1', 'Зафиксирует 5, истина 1'], explain: 'Из heap первым извлекается C (2), и он фиксируется. Позже через B получается путь 5 + (−4) = 1, но C уже зафиксирован. Для графа с отрицательными весами нужен Bellman-Ford.' },
        {
          prompt: `<code>bellman_ford(n, edges, src)</code>: <code>n</code> вершин, <code>edges</code> — ориентированные рёбра <code>(u, v, w)</code>, вес может быть и отрицательным. Верните список кратчайших расстояний (недостижимая вершина — <code>float("inf")</code>). Если из <code>src</code> достижим отрицательный цикл, верните <code>None</code>. Выполните relax всех рёбер <code>n - 1</code> раз, затем проверьте ещё раз.
<pre><code>bellman_ford(3, [(0, 1, 5), (0, 2, 2), (1, 2, -4)], 0) → [0, 5, 1]
bellman_ford(2, [(0, 1, 1), (1, 0, -2)], 0)            → None</code></pre>`,
          starter: `def bellman_ford(n, edges, src):
    return [0] * n
`,
          hints: ['<code>dist[src] = 0</code>, остальные — <code>float("inf")</code>. <code>inf + w</code> остаётся <code>inf</code>, поэтому недостижимые вершины не релаксируются.', 'На последней проверке, если какое-либо ребро ещё уменьшает расстояние, верните <code>None</code>.'],
          check: { tests: String.raw`
_inf = float("inf")
assert bellman_ford(3, [(0, 1, 5), (0, 2, 2), (1, 2, -4)], 0) == [0, 5, 1], "Через отрицательное ребро до C — 1"
assert bellman_ford(2, [(0, 1, 1), (1, 0, -2)], 0) is None, "Сумма цикла 0 → 1 → 0 равна -1: отрицательный цикл"
assert bellman_ford(3, [(0, 1, 4)], 0) == [0, 4, _inf], "Недостижимая вершина: inf"
assert bellman_ford(1, [], 0) == [0], "Одна вершина"
assert bellman_ford(4, [(0, 1, 1), (2, 3, -1), (3, 2, -1)], 0) == [0, 1, _inf, _inf], "Отрицательный цикл, недостижимый из src, не влияет на результат"
assert bellman_ford(4, [(2, 3, 1), (1, 2, 1), (0, 1, 1)], 0) == [0, 1, 2, 3], "Правильно, даже если рёбра заданы в обратном порядке"
import time as _time
_n = 300
_E = [(_i, _i + 1, 2) for _i in range(_n - 1)] + [(0, _i, 1000) for _i in range(1, _n)]
_t0 = _time.perf_counter(); _r = bellman_ford(_n, _E, 0); _dt = _time.perf_counter() - _t0
assert _r[-1] == 2 * (_n - 1), "На длинной цепочке расстояние неверно"
assert _dt < 1.0, "Слишком медленно: не делайте больше n - 1 проходов"
` } }
      ]
    },
    'alg-8': {
      title: 'Minimum spanning tree: Kruskal и Prim',
      body: `
<p>Областная администрация хочет соединить пять аулов асфальтовыми дорогами. Стоимость строительства дороги между любыми двумя аулами известна. Все аулы должны оказаться в одной сети (напрямую или через другой аул), а общая стоимость должна быть минимальной. Это задача о <b>minimum spanning tree</b> (MST, минимальное остовное дерево).</p>
<h3>Определение</h3>
<p><b>Остовное дерево</b> связного неориентированного графа с n вершинами — это подграф, который содержит все вершины, не имеет циклов и состоит из n − 1 ребра. MST — остовное дерево с наименьшей суммой весов рёбер. Не путайте с кратчайшим путём: MST не даёт самого короткого пути между двумя конкретными городами, он уменьшает общую стоимость всей сети.</p>
<h3>Kruskal</h3>
<p>Идея очень проста: сортируем рёбра по весу и берём самые дешёвые. Если ребро образует цикл (его концы уже связаны), пропускаем его. Проверка цикла выполняется с помощью DSU из предыдущего урока.</p>
<pre><code>def kruskal(n, roads):
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    total, used = 0, 0
    for u, v, cost in sorted(roads, key=lambda e: e[2]):
        ru, rv = find(u), find(v)
        if ru != rv:
            parent[ru] = rv
            total += cost
            used += 1
    return total if used == n - 1 else None   # None: граф не связан

roads = [(0, 1, 4), (0, 2, 1), (1, 2, 2), (1, 3, 5), (2, 3, 8), (3, 4, 3)]
print(kruskal(5, roads))   # 1 + 2 + 3 + 5 = 11</code></pre>
<p>Сложность: сортировка O(E log E), каждая операция DSU почти O(1).</p>
<h3>Prim</h3>
<p>Prim «выращивает» дерево из одной вершины. В heap лежат рёбра, выходящие из дерева. На каждом шаге берём самое дешёвое ребро; если его второй конец ещё не в дереве, добавляем его и кладём в heap его рёбра. Это похоже на Dijkstra, но в heap кладётся <code>w</code>, а не <code>d + w</code>. На плотном графе (много рёбер) удобнее Prim, на разреженном — Kruskal.</p>
<h3>Почему жадный выбор работает</h3>
<p><b>Cut property:</b> если разбить вершины на два непустых набора, то самое дешёвое ребро, соединяющее их, обязательно входит в какое-то MST. Kruskal и Prim на каждом шаге выбирают именно такое ребро. Это хороший пример доказательства для greedy-алгоритмов из следующего урока.</p>
<h3>Частые ошибки</h3>
<ul>
<li>Не проверять, связан ли граф: если за n − 1 рёбер не набрано, MST не существует.</li>
<li>В Prim не проверять, не находится ли вершина, извлечённая из heap, уже в дереве: её стоимость добавится дважды.</li>
<li>Считать MST самым коротким путём.</li>
</ul>
<div class="tip"><b>Совет:</b> если часть дорог <b>уже построена</b>, сначала объедините их в DSU (их стоимость 0), а затем продолжите Kruskal по остальным дорогам. Такие задачи часто встречаются в инфраструктурных расчётах.</div>`,
      ex: [
        {
          prompt: `<code>mst_cost(n, roads)</code>: <code>n</code> аулов (<code>0..n-1</code>), <code>roads</code>: <code>(u, v, стоимость)</code>. Верните минимальную стоимость соединения всех аулов с помощью Kruskal и DSU. Если соединить все нельзя, верните <code>None</code>. При <code>n = 1</code> верните 0.
<pre><code>mst_cost(5, [(0, 1, 4), (0, 2, 1), (1, 2, 2), (1, 3, 5), (2, 3, 8), (3, 4, 3)]) → 11
mst_cost(3, [(0, 1, 2)])                                                     → None</code></pre>`,
          starter: `def mst_cost(n, roads):
    return sum(c for _, _, c in roads)
`,
          hints: ['Отсортируйте рёбра через <code>sorted(roads, key=lambda e: e[2])</code>.', 'Посчитайте добавленные рёбра: если в конце их не <code>n - 1</code>, верните <code>None</code>.'],
          check: { tests: String.raw`
assert mst_cost(5, [(0, 1, 4), (0, 2, 1), (1, 2, 2), (1, 3, 5), (2, 3, 8), (3, 4, 3)]) == 11, "MST: 1 + 2 + 3 + 5 = 11"
assert mst_cost(3, [(0, 1, 2)]) is None, "Два аула не соединены: None"
assert mst_cost(1, []) == 0, "Один аул: 0"
assert mst_cost(2, [(0, 1, 7), (0, 1, 3)]) == 3, "Из параллельных дорог нужно взять самую дешёвую"
assert mst_cost(3, [(0, 1, 1), (1, 2, 1), (0, 2, 1)]) == 2, "Одинаковые стоимости: достаточно 2 дорог"
assert mst_cost(4, [(0, 1, 5), (2, 3, 0), (1, 2, -1)]) == 4, "Нулевые и отрицательные стоимости тоже должны работать"
import random as _random, time as _time
_R = _random.Random(13)
_n = 3000
_E = [(_i, _i + 1, 1000) for _i in range(_n - 1)] + [(_R.randrange(_n), _R.randrange(_n), _R.randint(1, 999)) for _ in range(30000)]
_t0 = _time.perf_counter(); _c = mst_cost(_n, _E); _dt = _time.perf_counter() - _t0
assert _c is not None and _c < 1000 * (_n - 1), "Большой граф: MST вычислен неверно"
assert _dt < 1.0, "30 000 рёбер слишком медленно: используйте path compression в DSU"
` } },
        {
          prompt: `Алгоритм Prim. <code>prim_cost(adj)</code>: <code>adj</code> — неориентированный граф, город → <code>[(сосед, цена), ...]</code> (каждое ребро записано с обеих сторон). Начните с любого города и с помощью <code>heapq</code> верните стоимость MST. Если граф не связан, верните <code>None</code>; для пустого графа — 0.
<pre><code>adj = {"Ақтау": [("Жаңаөзен", 150), ("Форт", 200)],
       "Жаңаөзен": [("Ақтау", 150), ("Форт", 400)],
       "Форт": [("Ақтау", 200), ("Жаңаөзен", 400)]}
prim_cost(adj) → 350</code></pre>`,
          starter: `import heapq

def prim_cost(adj):
    return 0
`,
          hints: ['Кладите в heap <code>(цена, город)</code>. Если извлечённый город уже есть в <code>seen</code>, пропустите его.', 'В конце, если <code>len(seen) == len(adj)</code> не выполняется, граф не связан.'],
          check: { tests: String.raw`
_adj = {"Ақтау": [("Жаңаөзен", 150), ("Форт", 200)], "Жаңаөзен": [("Ақтау", 150), ("Форт", 400)], "Форт": [("Ақтау", 200), ("Жаңаөзен", 400)]}
assert prim_cost(_adj) == 350, "150 + 200 = 350"
assert prim_cost({}) == 0, "Пустой граф: 0"
assert prim_cost({"А": []}) == 0, "Один город: 0"
assert prim_cost({"А": [("Б", 1)], "Б": [("А", 1)], "В": []}) is None, "V не подключён: None"
_sq = {0: [(1, 1), (3, 4), (2, 3)], 1: [(0, 1), (2, 2)], 2: [(1, 2), (3, 5), (0, 3)], 3: [(0, 4), (2, 5)]}
assert prim_cost(_sq) == 7, "1 + 2 + 4 = 7"
import random as _random, time as _time
_R = _random.Random(21)
_n = 2000
_A = {_i: [] for _i in range(_n)}
def _add(u, v, w):
    _A[u].append((v, w)); _A[v].append((u, w))
for _i in range(_n - 1):
    _add(_i, _i + 1, 500)
for _ in range(15000):
    _add(_R.randrange(_n), _R.randrange(_n), _R.randint(1, 499))
_t0 = _time.perf_counter(); _c = prim_cost(_A); _dt = _time.perf_counter() - _t0
_edges = sorted(set((min(u, v), max(u, v), w) for u in _A for v, w in _A[u]), key=lambda e: e[2])
_p = list(range(_n))
def _f(x):
    while _p[x] != x:
        _p[x] = _p[_p[x]]; x = _p[x]
    return x
_ref = 0
for u, v, w in _edges:
    if _f(u) != _f(v):
        _p[_f(u)] = _f(v); _ref += w
assert _c == _ref, "Результат Prim не совпал с результатом Kruskal"
assert _dt < 1.0, "Слишком медленно: используйте heapq"
` } },
        { prompt: 'В связном графе из 6 городов 10 дорог, все цены различны. Какое из утверждений <b>всегда</b> верно?', options: ['В MST будет 6 дорог', 'Самая дешёвая дорога обязательно войдёт в MST', 'Самая дорогая дорога никогда не войдёт в MST', 'MST даёт кратчайший путь между любыми двумя городами'], explain: 'Если один конец самой дешёвой дороги отделить как отдельную группу, по cut property эта дорога входит в MST (Kruskal берёт её первой). В MST n − 1 = 5 дорог. Самая дорогая дорога может войти, если она — единственный мост. MST не решает задачу о кратчайшем пути.' }
      ]
    },
    'alg-9': {
      title: 'Greedy-алгоритмы',
      body: `
<p><b>Greedy</b> (жадный) алгоритм на каждом шаге делает выбор, который «сейчас выглядит лучшим», и к нему не возвращается. Kruskal и Dijkstra были greedy-алгоритмами. Greedy быстрый и простой, но опасный: во многих задачах он даёт неверный ответ. Поэтому главный вопрос: <b>почему</b> здесь greedy работает?</p>
<h3>Interval scheduling</h3>
<p>В коворкинге Шымкента есть один конференц-зал. Команды просят бронь на интервалы времени <code>[start, end)</code>. Как разместить максимальное количество встреч? Есть несколько «интуитивных» правил: взять то, что начинается раньше, или взять самое короткое. Оба неверны. Правильное правило: взять то, что <b>раньше заканчивается</b>.</p>
<pre><code>def max_meetings(intervals):
    count, free_at = 0, float("-inf")
    for s, e in sorted(intervals, key=lambda x: x[1]):
        if s &gt;= free_at:         # [s, e) начинается после того, как зал освободился
            count += 1
            free_at = e
    return count

print(max_meetings([(9, 12), (10, 11), (11, 13), (12, 14)]))   # 2</code></pre>
<p>Поскольку отрезок полуоткрытый, после встречи, которая закончилась в 11:00, может начаться новая в 11:00: <code>s &gt;= free_at</code>.</p>
<h3>Exchange argument: неформальное доказательство</h3>
<p>Возьмём любое оптимальное расписание. Заменим его первую встречу на нашу выбранную (раньше всего заканчивающуюся). Наша встреча заканчивается не позже, поэтому она не мешает остальным: расписание остаётся допустимым, количество встреч не меняется. Если повторять такую замену на каждом шаге, оптимальное расписание превратится в наше greedy-расписание. Значит, greedy оптимален. Такой приём называется <b>exchange argument</b>: «если приблизить оптимальное решение к greedy-выбору, оно не станет хуже».</p>
<h3>Сдача: когда greedy работает</h3>
<p>Кассир выдаёт сдачу монетами 1, 2, 5, 10, 20, 50, 100, 200 тенге. Greedy: брать самую крупную монету, пока это возможно. В таких «канонических» системах greedy даёт наименьшее число монет. Но если система другая:</p>
<pre><code>coins = [1, 3, 4], amount = 6
greedy:  4 + 1 + 1   → 3 монеты
оптимально: 3 + 3    → 2 монеты</code></pre>
<p>Здесь greedy ошибается. Для оптимального ответа нужен DP из DSA1 (coin change). Проверить монетную систему можно, сравнив greedy и DP на многих суммах: это одно из следующих заданий.</p>
<h3>Как узнать, что задачу решает greedy</h3>
<ul>
<li>Выбор «локальный» и не мешает последующим выборам.</li>
<li>После сортировки достаточно одного прохода (интервалы, задачи, оценки).</li>
<li>Можно построить exchange argument.</li>
<li>Если контрпример не найден (сравнение с brute force на маленьких входах), доверие к greedy растёт.</li>
</ul>
<h3>Частые ошибки</h3>
<ul>
<li>Сортировать интервалы по времени начала (вместо времени окончания).</li>
<li>Применять greedy без доказательства: в 0/1 knapsack «взять предмет с наибольшей ценой за единицу веса» — ошибка (для дробного knapsack это верно).</li>
<li>Забыть про граничное равенство: разница между <code>&gt;</code> и <code>&gt;=</code>.</li>
</ul>
<div class="tip"><b>Совет:</b> когда придумали идею greedy, сразу сравните её с brute force на случайных маленьких входах. Если найдётся контрпример, задача, вероятно, ближе к DP.</div>`,
      ex: [
        {
          prompt: `<code>max_meetings(intervals)</code>: брони в виде полуоткрытых интервалов <code>(start, end)</code>, то есть <code>[start, end)</code>. Верните наибольшее число встреч, которые можно провести в одном зале так, чтобы они не пересекались. Тест проверит скорость на 100 000 бронях.
<pre><code>max_meetings([(9, 12), (10, 11), (11, 13), (12, 14)]) → 2
max_meetings([(1, 2), (2, 3), (3, 4)])                → 3
max_meetings([])                                      → 0</code></pre>`,
          starter: `def max_meetings(intervals):
    return len(intervals)
`,
          hints: ['Сортируйте по времени окончания: <code>key=lambda x: x[1]</code>.', 'Берите встречу, если она начинается после того, как зал освободился, или в тот же момент: <code>s &gt;= free_at</code>.'],
          check: { tests: String.raw`
assert max_meetings([(9, 12), (10, 11), (11, 13), (12, 14)]) == 2, "Ожидается 2: (10, 11) и (11, 13), или (12, 14)"
assert max_meetings([(1, 2), (2, 3), (3, 4)]) == 3, "Соприкасающиеся отрезки не пересекаются: 3"
assert max_meetings([]) == 0, "Бронирований нет: 0"
assert max_meetings([(0, 10), (1, 2), (2, 3), (3, 4)]) == 3, "Длинную встречу брать не нужно: 3"
assert max_meetings([(5, 6), (5, 6)]) == 1, "Из двух одинаковых броней берётся только одна"
import random as _random, time as _time
from itertools import combinations as _comb
_R = _random.Random(14)
def _ok(sel):
    sel = sorted(sel)
    return all(sel[i][1] <= sel[i + 1][0] for i in range(len(sel) - 1))
for _ in range(40):
    _iv = [(s, s + _R.randint(1, 4)) for s in (_R.randint(0, 10) for _ in range(_R.randint(1, 7)))]
    _best = max(k for k in range(len(_iv) + 1) if any(_ok(c) for c in _comb(_iv, k)))
    assert max_meetings(_iv) == _best, "Не совпало с brute force: " + str(_iv)
_big = [(s, s + _R.randint(1, 50)) for s in (_R.randint(0, 10**6) for _ in range(100000))]
_t0 = _time.perf_counter(); max_meetings(_big); _dt = _time.perf_counter() - _t0
assert _dt < 1.0, "100 000 броней слишком медленно: достаточно одной сортировки и одного прохода"
` } },
        {
          prompt: `<code>greedy_change(coins, amount)</code>: начиная с самой крупной монеты, берите её, пока это возможно, и верните список использованных монет по убыванию. Если greedy не может набрать сумму точно, верните <code>None</code>. <code>coins</code> может быть не отсортирован.
<pre><code>greedy_change([1, 5, 10, 2], 18) → [10, 5, 2, 1]
greedy_change([1, 3, 4], 6)      → [4, 1, 1]
greedy_change([5, 3], 7)         → None    # взяли 5, осталось 2</code></pre>`,
          starter: `def greedy_change(coins, amount):
    return []
`,
          hints: ['<code>sorted(coins, reverse=True)</code>, для каждой монеты <code>k = amount // c</code>.', 'В конце, если <code>amount</code> не равно 0, верните <code>None</code>.'],
          check: { tests: String.raw`
assert greedy_change([1, 5, 10, 2], 18) == [10, 5, 2, 1], "18 = 10 + 5 + 2 + 1"
assert greedy_change([1, 3, 4], 6) == [4, 1, 1], "Greedy выдаёт [4, 1, 1] (не оптимально, но жадность именно так и делает)"
assert greedy_change([5, 3], 7) is None, "После взятия 5 остаётся 2: None"
assert greedy_change([2, 1], 0) == [], "Сумма 0: []"
assert greedy_change([200, 100, 50, 20, 10, 5, 2, 1], 389) == [200, 100, 50, 20, 10, 5, 2, 2], "389 тенге: 8 монет"
` } },
        {
          prompt: `<code>first_greedy_failure(coins, limit)</code>: среди сумм <code>1..limit</code> найдите <b>наименьшую</b> сумму, для которой greedy берёт больше монет, чем оптимально (или вовсе не может набрать сумму, хотя оптимум существует). Если такой суммы нет, верните <code>None</code>. Оптимальное число монет вычисляйте через DP: <code>best[x] = min(best[x - c] + 1)</code>.
<pre><code>first_greedy_failure([1, 3, 4], 20)                 → 6
first_greedy_failure([1, 7, 10], 50)                → 14
first_greedy_failure([1, 2, 5, 10, 20, 50], 1000)   → None</code></pre>`,
          starter: `def first_greedy_failure(coins, limit):
    return None
`,
          hints: ['Сначала DP: <code>best = [0] + [inf] * limit</code>, для каждого <code>x</code> перебираем все монеты.', 'Количество монет greedy: <code>cnt += rest // c</code>, <code>rest %= c</code>. Если набрать сумму не получается, считайте число монет greedy бесконечным.'],
          check: { tests: String.raw`
assert first_greedy_failure([1, 3, 4], 20) == 6, "6: greedy 4+1+1, оптимально 3+3"
assert first_greedy_failure([1, 7, 10], 50) == 14, "14: greedy 10+1+1+1+1, оптимально 7+7"
assert first_greedy_failure([1, 2, 5, 10, 20, 50], 1000) is None, "В канонической системе greedy всегда оптимален"
assert first_greedy_failure([1, 3, 4], 5) is None, "До 5 greedy верен"
assert first_greedy_failure([4, 3], 10) == 6, "6: greedy берёт 4 и застревает, оптимально 3+3"
assert first_greedy_failure([2], 9) is None, "Нечётные суммы не собрать никак: это не ошибка greedy"
import time as _time
_t0 = _time.perf_counter(); _r = first_greedy_failure([1, 2, 5, 10, 20, 50, 100, 200], 20000); _dt = _time.perf_counter() - _t0
assert _r is None, "Тенговые монеты канонические: None"
assert _dt < 1.5, "Слишком медленно: DP должен работать за O(limit · len(coins))"
` } },
        { prompt: 'Для interval scheduling какое greedy-правило <b>всегда</b> даёт наибольшее число встреч?', options: ['Взять встречу, которая начинается раньше всех', 'Взять самую короткую встречу', 'Взять встречу, которая заканчивается раньше всех', 'Взять встречу, которая меньше всего пересекается с другими'], explain: 'Встреча, которая раньше всех заканчивается, освобождает зал раньше всех. Exchange argument: если заменить первую встречу оптимального расписания на неё, расписание не испортится. Для каждого из остальных правил есть контрпример.' }
      ]
    },
    'alg-10': {
      title: 'DP II: LIS, рюкзак, edit distance, bitmask',
      body: `
<p>В DSA1 мы освоили основы DP: состояние, переход, базовый случай. LIS мы считали за O(n log n), а edit distance — с двумерной таблицей. Теперь шаг дальше: восстановить <b>сам ответ</b>, выбрать при ограниченном ресурсе и применить DP по подмножествам.</p>
<h3>Восстановление LIS</h3>
<p><code>tails[k]</code> — наименьшее последнее значение возрастающей подпоследовательности длины k + 1. Чтобы получить саму подпоследовательность, сохраняем <code>tails_idx[k]</code> (индекс этого значения) и <code>prev[i]</code> (индекс предыдущего элемента для i). В конце идём от конца самой длинной цепочки назад по <code>prev</code>. Это та же идея, что и <code>prev</code> в Dijkstra.</p>
<h3>0/1 knapsack</h3>
<p>Студент отправляется в поход на Бурабай, рюкзак выдерживает не больше <code>W</code> кг. У каждого предмета есть вес и польза, и каждый предмет можно взять только один раз. <code>dp[w]</code> — наибольшая польза при весе не больше <code>w</code>.</p>
<pre><code>def knapsack(items, W):
    dp = [0] * (W + 1)
    for weight, value in items:
        for w in range(W, weight - 1, -1):   # в ОБРАТНОМ порядке!
            dp[w] = max(dp[w], dp[w - weight] + value)
    return dp[W]

print(knapsack([(3, 40), (4, 50), (2, 30)], 6))   # 80: 4 кг + 2 кг</code></pre>
<p>Почему внутренний цикл обратный? Если идти вперёд, то <code>dp[w - weight]</code> может уже включать этот же предмет: предмет возьмётся дважды, и получится неограниченный knapsack. Время O(n·W), память O(W).</p>
<h3>Применение edit distance</h3>
<p>Функция <code>edit_distance(a, b)</code> из DSA1 даёт число вставок, удалений и замен символов. Практическое применение: исправление опечаток в строке поиска. Если пользователь набрал «Алмты», предлагаем слово из списка городов с наименьшим расстоянием. Для длинных строк достаточно хранить только две строки таблицы, тогда память составит O(min(n, m)).</p>
<h3>Bitmask DP</h3>
<p>Курьер выходит со склада (0), должен посетить все n точек и вернуться на склад. Перебор всех порядков занимает O(n!). DP по подмножествам: <code>dp[mask][v]</code> — наименьшее время, при котором посещены точки из <code>mask</code>, и мы стоим в точке v. <code>mask</code> — целое число, биты которого обозначают посещённые точки.</p>
<pre><code>mask = 0b1011        # побывали в точках 0, 1, 3
mask &gt;&gt; 2 &amp; 1       # 0: в точку 2 ещё не заходили
mask | (1 &lt;&lt; 2)      # 0b1111: добавили точку 2</code></pre>
<p>Количество состояний 2ⁿ · n, из каждого состояния n переходов: O(2ⁿ · n²). Для n = 15 это примерно 7 млн, а 15! ≈ 1.3 трлн.</p>
<h3>Частые ошибки</h3>
<ul>
<li>В 0/1 knapsack вести внутренний цикл вперёд.</li>
<li>В LIS путать <code>bisect_left</code> (строго возрастающая последовательность) и <code>bisect_right</code> (нестрогая).</li>
<li>В bitmask неверно расставить приоритет операций: <code>mask &amp; 1 &lt;&lt; v</code> вместо <code>mask &amp; (1 &lt;&lt; v)</code>. Скобки обязательны.</li>
</ul>
<div class="tip"><b>Совет:</b> если в условии n ≤ 20, подумайте о bitmask DP. Если есть небольшая «вместимость» W ≤ 10⁴, подумайте о 1D DP, похожем на knapsack.</div>`,
      ex: [
        {
          prompt: `<code>lis_sequence(a)</code>: верните саму <b>строго возрастающую</b> подпоследовательность наибольшей длины (порядок элементов сохраняется, но они не обязательно идут подряд). Если ответов несколько, подойдёт любой. Решение за O(n log n): сохраняйте <code>tails_idx</code> и <code>prev</code>. Тест проверит 100 000 элементов.
<pre><code>lis_sequence([3, 1, 4, 1, 5, 9, 2, 6]) → [1, 4, 5, 9]  (или [1, 4, 5, 6], [3, 4, 5, 9], ...)
lis_sequence([])                       → []</code></pre>`,
          starter: `from bisect import bisect_left

def lis_sequence(a):
    return a[:1]
`,
          hints: ['Если элемент встал на позицию <code>k</code>, его предшественник — <code>tails_idx[k - 1]</code>: запишите его в <code>prev[i]</code>.', 'В конце начните с <code>tails_idx[-1]</code>, идите по <code>prev</code> и переверните список.'],
          check: { tests: String.raw`
from bisect import bisect_left as _bl
def _len(a):
    t = []
    for x in a:
        k = _bl(t, x)
        if k == len(t): t.append(x)
        else: t[k] = x
    return len(t)
def _valid(a, s):
    it = iter(a)
    return all(x in it for x in s) and all(s[i] < s[i + 1] for i in range(len(s) - 1))
_s = lis_sequence([3, 1, 4, 1, 5, 9, 2, 6])
assert len(_s) == 4 and _valid([3, 1, 4, 1, 5, 9, 2, 6], _s), "Должна быть строго возрастающая подпоследовательность длины 4, у вас " + str(_s)
assert lis_sequence([]) == [], "Пустой список: []"
assert lis_sequence([7, 7, 7]) == [7], "Строго возрастает: из одинаковых значений берётся только одно"
assert lis_sequence([5, 4, 3]) in ([5], [4], [3]), "В убывающем списке длина 1"
assert lis_sequence([1, 2, 3]) == [1, 2, 3], "Возрастающий список: сам себе"
import random as _random, time as _time
_R = _random.Random(15)
for _ in range(100):
    _a = [_R.randint(0, 9) for _ in range(_R.randint(1, 12))]
    _r = lis_sequence(_a)
    assert len(_r) == _len(_a) and _valid(_a, _r), "Ошибка в случайной проверке: " + str(_a)
_big = [_R.randint(0, 10**6) for _ in range(100000)]
_t0 = _time.perf_counter(); _r = lis_sequence(_big); _dt = _time.perf_counter() - _t0
assert len(_r) == _len(_big) and _valid(_big, _r), "На 100 000 элементах результат неверен"
assert _dt < 1.0, "Слишком медленно: должно быть O(n log n)"
` } },
        {
          prompt: `<code>knapsack(items, capacity)</code>: <code>items</code> — пары <code>(вес, польза)</code>, каждый предмет можно взять не более одного раза. Верните наибольшую пользу при суммарном весе не больше <code>capacity</code>. Используйте 1D DP, внутренний цикл — в обратном порядке.
<pre><code>knapsack([(3, 40), (4, 50), (2, 30)], 6) → 80
knapsack([(5, 10)], 4)                   → 0</code></pre>`,
          starter: `def knapsack(items, capacity):
    return sum(v for w, v in items if w <= capacity)
`,
          hints: ['<code>dp = [0] * (capacity + 1)</code>.', '<code>for w in range(capacity, weight - 1, -1): dp[w] = max(dp[w], dp[w - weight] + value)</code>.'],
          check: { tests: String.raw`
assert knapsack([(3, 40), (4, 50), (2, 30)], 6) == 80, "4 кг + 2 кг = пользы 80"
assert knapsack([(5, 10)], 4) == 0, "Предмет не помещается: 0"
assert knapsack([], 10) == 0, "Предметов нет: 0"
assert knapsack([(2, 5)], 10) == 5, "Один предмет нельзя взять дважды: 5"
assert knapsack([(1, 1), (3, 4), (4, 5), (5, 7)], 7) == 9, "3 кг + 4 кг = 9"
assert knapsack([(0, 3), (1, 1)], 0) == 3, "Предмет нулевого веса"
import random as _random, time as _time
from itertools import combinations as _comb
_R = _random.Random(16)
for _ in range(30):
    _it = [(_R.randint(1, 6), _R.randint(1, 20)) for _ in range(_R.randint(0, 6))]
    _W = _R.randint(0, 12)
    _best = max(sum(v for _, v in c) for k in range(len(_it) + 1) for c in _comb(_it, k) if sum(w for w, _ in c) <= _W)
    assert knapsack(_it, _W) == _best, "Не совпало с brute force: " + str((_it, _W))
_big = [(_R.randint(1, 100), _R.randint(1, 1000)) for _ in range(80)]
_t0 = _time.perf_counter(); knapsack(_big, 3000); _dt = _time.perf_counter() - _t0
assert _dt < 1.5, "80 предметов, вместимость 3000: слишком медленно"
` } },
        {
          prompt: `Исправление опечатки в строке поиска. <code>suggest(word, dictionary)</code>: верните слово из <code>dictionary</code> с наименьшим edit distance (вставка, удаление, замена) до <code>word</code>. При равенстве выбирайте наименьшее по алфавиту. Если словарь пуст, верните <code>None</code>. Напишите edit distance с двумя строками таблицы.
<pre><code>suggest("Алмты", ["Астана", "Алматы", "Атырау"]) → "Алматы"
suggest("кот", ["кит", "кет"])                     → "кет"</code></pre>`,
          starter: `def suggest(word, dictionary):
    return dictionary[0] if dictionary else None
`,
          hints: ['Edit distance: первая строка <code>prev</code> начинается с <code>list(range(len(b) + 1))</code>, каждая новая строка начинается с <code>[i] + ...</code>.', 'Выбор: <code>min(dictionary, key=lambda w: (edit_distance(word, w), w))</code>.'],
          check: { tests: String.raw`
assert suggest("Алмты", ["Астана", "Алматы", "Атырау"]) == "Алматы", "Алмты → Алматы (вставить один символ)"
assert suggest("кот", ["кит", "кет"]) == "кет", "Расстояние до обоих 1: по алфавиту кет"
assert suggest("x", []) is None, "Пустой словарь: None"
assert suggest("", ["аб", "а"]) == "а", "К пустой строке ближе всего самое короткое слово"
assert suggest("Шымкент", ["Шымкент", "Шемонаиха"]) == "Шымкент", "Точное совпадение: расстояние 0"
assert suggest("Kostanai", ["Qostanai", "Kokshetau"]) == "Qostanai", "Одна замена: Qostanai"
assert suggest("sitting", ["kitten", "mitten"]) == "kitten", "sitting → kitten и mitten обе на расстоянии 3: по алфавиту kitten"
import random as _random, time as _time
_R = _random.Random(17)
_words = ["".join(_R.choice("абвгдеж") for _ in range(_R.randint(5, 12))) for _ in range(400)]
_t0 = _time.perf_counter(); suggest("абвгдежабв", _words); _dt = _time.perf_counter() - _t0
assert _dt < 1.5, "400 слов слишком медленно"
` } },
        {
          prompt: `Bitmask DP. Курьер выходит со склада (точка 0), посещает каждую точку ровно один раз и возвращается на склад. <code>min_tour(dist)</code>, где <code>dist[i][j]</code> — время в пути из i в j, верните наименьшее общее время. При <code>n = 1</code> верните 0. Тест проверит n = 11 точек: перебор через <code>permutations</code> (10! порядков) слишком медленный.
<pre><code>dist = [[0, 10, 15, 20],
        [10, 0, 35, 25],
        [15, 35, 0, 30],
        [20, 25, 30, 0]]
min_tour(dist) → 80     # 0 → 1 → 3 → 2 → 0</code></pre>`,
          starter: `def min_tour(dist):
    return 0
`,
          hints: ['<code>dp[mask][v]</code>: наименьшее время, при котором посещены точки из mask и мы находимся в v. Начальное состояние <code>dp[1][0] = 0</code>.', 'Ответ: <code>min(dp[full - 1][v] + dist[v][0] for v in range(1, n))</code>.'],
          check: { tests: String.raw`
_d = [[0, 10, 15, 20], [10, 0, 35, 25], [15, 35, 0, 30], [20, 25, 30, 0]]
assert min_tour(_d) == 80, "0 → 1 → 3 → 2 → 0 = 80"
assert min_tour([[0]]) == 0, "Только склад: 0"
assert min_tour([[0, 4], [6, 0]]) == 10, "0 → 1 → 0 = 4 + 6"
assert min_tour([[0, 1, 9], [9, 0, 1], [1, 9, 0]]) == 3, "Направленный граф: 0 → 1 → 2 → 0 = 3"
from itertools import permutations as _perm
import random as _random, time as _time
_R = _random.Random(18)
for _ in range(10):
    _n = _R.randint(2, 6)
    _m = [[0 if i == j else _R.randint(1, 50) for j in range(_n)] for i in range(_n)]
    _ref = min(sum(_m[a][b] for a, b in zip((0,) + p, p + (0,))) for p in _perm(range(1, _n)))
    assert min_tour(_m) == _ref, "Не совпало с brute force: " + str(_m)
_n = 11
_m = [[0 if i == j else _R.randint(1, 100) for j in range(_n)] for i in range(_n)]
_t0 = _time.perf_counter(); _v = min_tour(_m); _dt = _time.perf_counter() - _t0
assert isinstance(_v, int) and _v > 0, "Результат на 11 точках неверен"
assert _dt < 2.0, "n = 11 слишком медленно: используйте bitmask DP за O(2ⁿ · n²)"
` } }
      ]
    },
    'alg-11': {
      title: 'Строковые алгоритмы: prefix function и KMP',
      body: `
<p>В DSA1 мы работали со строками и проверяли палиндромы и анаграммы. Теперь классическая задача: найти образец (<code>pattern</code>, длина m) в длинном тексте (<code>text</code>, длина n). Наивный подход сравнивает образец с текстом, начиная с каждой позиции: в худшем случае это O(n·m). Например, если текст <code>"aaaa...a"</code>, а образец <code>"aaa...ab"</code>, то в каждой позиции совпадают m − 1 символ, и в конце сравнение неудачно.</p>
<h3>Prefix function</h3>
<p><code>pi[i]</code> — длина самого длинного <b>собственного</b> (не равного самой строке) префикса подстроки <code>s[0..i]</code>, который одновременно является её суффиксом. Например, для <code>s = "abcabd"</code>:</p>
<table>
<tr><th>i</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr>
<tr><th>s[i]</th><td>a</td><td>b</td><td>c</td><td>a</td><td>b</td><td>d</td></tr>
<tr><th>pi[i]</th><td>0</td><td>0</td><td>0</td><td>1</td><td>2</td><td>0</td></tr>
</table>
<p>При i = 4 строка <code>"abcab"</code> начинается с <code>"ab"</code> и заканчивается на <code>"ab"</code>: pi = 2.</p>
<pre><code>def prefix_function(s):
    pi = [0] * len(s)
    for i in range(1, len(s)):
        k = pi[i - 1]
        while k &gt; 0 and s[i] != s[k]:
            k = pi[k - 1]            # прыгаем к более короткой «границе»
        if s[i] == s[k]:
            k += 1
        pi[i] = k
    return pi</code></pre>
<p>Почему это O(n)? <code>k</code> на каждом шаге увеличивается максимум на 1, а <code>while</code> только уменьшает его. Общее число уменьшений не превышает общего числа увеличений.</p>
<h3>Поиск KMP</h3>
<p>Алгоритм Knuth-Morris-Pratt: при несовпадении мы не возвращаемся назад в тексте, а прыгаем по образцу через <code>pi</code>. Самый простой способ записи: вычислить prefix function для строки <code>pattern + "#" + text</code>. Символ <code>"#"</code> должен отсутствовать в обеих строках. Там, где <code>pi[i] == m</code>, образец закончился, а его начало в тексте — <code>i - 2m</code>. Время O(n + m).</p>
<p>Практические примеры: подсчёт, сколько раз словосочетание «искусственный интеллект» встречается в сочинениях школьников, поиск кода ошибки в логах, поиск образца в цепочке ДНК.</p>
<h3>String hashing</h3>
<p>Ещё один подход: превратить строку в число. Полиномиальный hash: <code>h(s) = (s[0]·Bᵐ⁻¹ + s[1]·Bᵐ⁻² + ... + s[m−1]) mod M</code>. Когда окно сдвигается на один символ, hash можно обновить за O(1) (<b>rolling hash</b>, алгоритм Рабина-Карпа). Если hash двух строк не равен, строки различны; если равен, они <b>вероятно</b> равны, потому что возможна коллизия. Поэтому, когда hash совпал, строки сравнивают напрямую или используют два разных M.</p>
<h3>Частые ошибки</h3>
<ul>
<li>Остановить поиск после первого совпадения: перекрывающиеся вхождения пропадут (образец <code>"aa"</code> в <code>"aaa"</code> встречается 2 раза).</li>
<li>Метод <code>str.count</code> в Python считает непересекающиеся вхождения: <code>"aaa".count("aa") == 1</code>.</li>
<li>Разделитель встречается в тексте: выберите символ, которого нет в тексте, или напишите отдельный цикл KMP.</li>
<li>Не учитывать пустой образец.</li>
</ul>
<div class="tip"><b>Совет:</b> prefix function полезна не только для поиска. Она даёт и наименьший период строки: <code>p = n - pi[n - 1]</code>. Если <code>n % p == 0</code>, строка состоит из повторения блока длины p.</div>`,
      ex: [
        {
          prompt: `<code>prefix_function(s)</code>: для каждого <code>i</code> — длина самого длинного собственного префикса, который одновременно является суффиксом <code>s[0..i]</code>. O(n).
<pre><code>prefix_function("abcabd")  → [0, 0, 0, 1, 2, 0]
prefix_function("aabaaab") → [0, 1, 0, 1, 2, 2, 3]
prefix_function("")        → []</code></pre>`,
          starter: `def prefix_function(s):
    return [0] * len(s)
`,
          hints: ['Начните с <code>k = pi[i - 1]</code>; если символы не совпадают, <code>k = pi[k - 1]</code>.', 'Если <code>s[i] == s[k]</code>, то <code>k += 1</code>.'],
          check: { tests: String.raw`
assert prefix_function("abcabd") == [0, 0, 0, 1, 2, 0], "abcabd → [0, 0, 0, 1, 2, 0]"
assert prefix_function("aabaaab") == [0, 1, 0, 1, 2, 2, 3], "aabaaab → [0, 1, 0, 1, 2, 2, 3]"
assert prefix_function("") == [], "Пустая строка: []"
assert prefix_function("a") == [0], "Один символ: [0]"
assert prefix_function("aaaa") == [0, 1, 2, 3], "aaaa → [0, 1, 2, 3]"
import time as _time
_s = "ab" * 50000 + "c"
_t0 = _time.perf_counter(); _p = prefix_function(_s); _dt = _time.perf_counter() - _t0
assert _p[-2] == 99998 and _p[-1] == 0, "На длинной строке результат неверен"
assert _dt < 1.0, "100 000 символов слишком медленно: должно быть O(n)"
` } },
        {
          prompt: `<code>kmp_search(text, pattern)</code>: верните все начальные индексы, с которых встречается <code>pattern</code> (включая перекрывающиеся), в порядке возрастания. Если образец пустой, верните <code>[]</code>. В тексте может встретиться любой символ (в том числе <code>#</code>), поэтому напишите отдельный цикл KMP: вычислите prefix function образца и один раз пройдите текст.
<pre><code>kmp_search("abababa", "aba") → [0, 2, 4]
kmp_search("Алматы", "ты")   → [4]
kmp_search("abc", "")        → []</code></pre>`,
          starter: `def kmp_search(text, pattern):
    i = text.find(pattern)
    return [i] if i >= 0 and pattern else []
`,
          hints: ['Проходя по тексту, <code>k</code> — сколько символов образца совпало. При несовпадении: <code>k = pi[k - 1]</code>.', 'Если <code>k == m</code>, индекс — <code>i - m + 1</code>, затем <code>k = pi[k - 1]</code> (для перекрытий).'],
          check: { tests: String.raw`
assert kmp_search("abababa", "aba") == [0, 2, 4], "Перекрывающиеся вхождения: [0, 2, 4]"
assert kmp_search("Алматы", "ты") == [4], "В слове Алматы «ты»: [4]"
assert kmp_search("abc", "") == [], "Пустой шаблон: []"
assert kmp_search("", "a") == [], "Пустой текст: []"
assert kmp_search("ab", "abc") == [], "Шаблон длиннее текста: []"
assert kmp_search("a#b#a#b", "#b") == [1, 5], "Символ # в тексте не должен мешать работе"
assert kmp_search("aaaa", "aa") == [0, 1, 2], "aa в aaaa встречается три раза"
import random as _random, time as _time
_R = _random.Random(19)
for _ in range(100):
    _t = "".join(_R.choice("ab") for _ in range(_R.randint(0, 15)))
    _p = "".join(_R.choice("ab") for _ in range(_R.randint(1, 3)))
    assert kmp_search(_t, _p) == [i for i in range(len(_t) - len(_p) + 1) if _t[i:i + len(_p)] == _p], "Ошибка в случайной проверке: " + repr((_t, _p))
_text = "a" * 100000
_t0 = _time.perf_counter(); _r = kmp_search(_text, "a" * 300 + "b"); _r2 = kmp_search(_text, "aaa"); _dt = _time.perf_counter() - _t0
assert _r == [] and len(_r2) == 99998, "На длинном тексте результат неверен"
assert _dt < 1.5, "Слишком медленно: KMP должен работать за O(n + m)"
` } },
        {
          prompt: `<code>shortest_period(s)</code>: длина самого короткого блока, повторением которого строится строка <code>s</code>. Если строка не состоит из повторений более короткого блока, верните <code>len(s)</code>. Для пустой строки — 0. Используйте prefix function: <code>p = n - pi[n - 1]</code>.
<pre><code>shortest_period("abcabcabc") → 3
shortest_period("abab")      → 2
shortest_period("abcab")     → 5
shortest_period("zzzz")      → 1</code></pre>`,
          starter: `def shortest_period(s):
    return len(s)
`,
          hints: ['Сначала вычислите prefix function (перепишите код из предыдущего задания).', '<code>p = n - pi[-1]</code>; если <code>n % p == 0</code>, ответ p, иначе n.'],
          check: { tests: String.raw`
assert shortest_period("abcabcabc") == 3, "abc × 3: 3"
assert shortest_period("abab") == 2, "ab × 2: 2"
assert shortest_period("abcab") == 5, "Полного повтора нет: 5"
assert shortest_period("zzzz") == 1, "z × 4: 1"
assert shortest_period("") == 0, "Пустая строка: 0"
assert shortest_period("a") == 1, "Один символ: 1"
assert shortest_period("aabaab") == 3, "aab × 2: 3"
import time as _time
_s = "қазақ" * 20000
_t0 = _time.perf_counter(); _r = shortest_period(_s); _dt = _time.perf_counter() - _t0
assert _r == 5, "қазақ × 20000: 5"
assert _dt < 1.0, "Слишком медленно: prefix function за O(n)"
` } },
        { prompt: 'В поиске Рабина-Карпа hash окна текста оказался равен hash образца. Какое действие правильнее всего?', options: ['Сразу считать это совпадением', 'Сравнить окно и образец посимвольно', 'Пересчитать hash с другим B и отказаться от совпадения, даже если он равен', 'Пропустить окно'], explain: 'Равенство hash делает совпадение только вероятным: возможна коллизия. Прямое сравнение (или два независимых hash) гарантирует правильность.' }
      ]
    },
    'alg-12': {
      title: 'Trie: префиксное дерево и автодополнение',
      body: `
<p>Когда в поисковой строке магазина (в стиле Kaspi) вы вводите «сүт», должны предлагаться товары, которые начинаются с «сүт…», например «сүт» и «сүтті шоколад», а не «сүзбе». Если каждый раз полностью просматривать список слов, это O(N·L). Для таких задач есть специальная структура: <b>trie</b> (префиксное дерево).</p>
<h3>Структура</h3>
<p>Каждый узел trie соответствует одному символу, а путь от корня до узла — это префикс. В каждом узле есть дети (символ → словарь узлов) и отметка, заканчивается ли здесь слово. Слова с общим префиксом делят общие узлы.</p>
<pre><code>class TrieNode:
    def __init__(self):
        self.children = {}
        self.end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word:
            node = node.children.setdefault(ch, TrieNode())
        node.end = True

    def _walk(self, s):
        node = self.root
        for ch in s:
            node = node.children.get(ch)
            if node is None:
                return None
        return node

    def search(self, word):
        node = self._walk(word)
        return node is not None and node.end

    def starts_with(self, prefix):
        return self._walk(prefix) is not None</code></pre>
<p>Все операции занимают O(L), где L — длина слова или префикса. Количество слов N на это не влияет.</p>
<h3>Автодополнение</h3>
<p>Дойдя до узла префикса, делаем DFS вниз и собираем слова из узлов с отметкой <code>end</code>. Если обходить детей в порядке <code>sorted(node.children)</code>, слова выйдут по алфавиту, и можно остановиться после первых k слов.</p>
<h3>Счётчики</h3>
<p>Часто задают вопрос: «Сколько слов начинается с этого префикса?» Добавим каждому узлу поле <code>count</code>: при <code>insert</code> увеличиваем <code>count</code> каждого узла на пути на 1. Тогда ответ — это <code>count</code> узла префикса, за O(L).</p>
<h3>Trie, set и отсортированный список</h3>
<table>
<tr><th>Вопрос</th><th>set</th><th>Отсортированный список + bisect</th><th>Trie</th></tr>
<tr><td>Есть ли слово</td><td>O(L) в среднем</td><td>O(L log N)</td><td>O(L)</td></tr>
<tr><td>Начинаются с префикса</td><td>O(N·L)</td><td>O(L log N + k)</td><td>O(L + k)</td></tr>
<tr><td>Память</td><td>мало</td><td>мало</td><td>много (dict в каждом узле)</td></tr>
</table>
<p>В Python для небольших задач часто достаточно отсортированного списка и <code>bisect</code>. Trie выигрывает, когда префиксных запросов очень много, когда слова приходят потоком или когда для каждого префикса нужно хранить дополнительную информацию (счётчик, самое популярное слово).</p>
<h3>Частые ошибки</h3>
<ul>
<li>В <code>search</code> не проверять метку <code>end</code>: если есть слово «сүт», то «сү» тоже будет найдено.</li>
<li>Не учитывать пустую строку: <code>starts_with("")</code> всегда <code>True</code>.</li>
<li>Повторно увеличивать счётчик, если одно и то же слово добавили дважды (когда считаются уникальные слова).</li>
</ul>
<div class="tip"><b>Совет:</b> узел можно хранить не отдельным классом, а обычным словарём: <code>node = node.setdefault(ch, {})</code>, а конец слова отмечать ключом <code>"$"</code>. Код станет короче, но в словах не должно быть символа <code>"$"</code>.</div>`,
      ex: [
        {
          prompt: `Напишите класс <code>Trie</code>: <code>insert(word)</code>, <code>search(word)</code> (есть ли именно это слово) и <code>starts_with(prefix)</code> (есть ли слово с таким префиксом). Все операции должны работать за O(L): тест измеряет время на 20 000 словах и 20 000 запросах.`,
          starter: `class Trie:
    def __init__(self):
        self.words = []

    def insert(self, word):
        self.words.append(word)

    def search(self, word):
        return False

    def starts_with(self, prefix):
        return False
`,
          hints: ['Узел: словарь <code>children</code> и метка <code>end</code>. <code>insert</code>: <code>node = node.children.setdefault(ch, TrieNode())</code>.', '<code>search</code> и <code>starts_with</code> могут использовать один вспомогательный метод <code>_walk</code>; разница только в проверке <code>end</code>.'],
          check: { tests: String.raw`
_t = Trie()
for _w in ["сүт", "сүтті", "сүзбе", "нан"]:
    _t.insert(_w)
assert _t.search("сүт") and _t.search("сүзбе"), "Добавленные слова должны находиться"
assert not _t.search("сү"), "сү: префикс, но не слово"
assert _t.starts_with("сү") and _t.starts_with("сүтт"), "Префиксы должны находиться"
assert not _t.starts_with("шай") and not _t.search("сүттер"), "Для отсутствующих слова и префикса: False"
assert _t.starts_with(""), "Пустой префикс всегда True"
_e = Trie()
assert not _e.search("") and not _e.search("a"), "В пустом trie слов нет"
_e.insert("")
assert _e.search(""), "Пустое слово находится после добавления"
import random as _random, time as _time
_R = _random.Random(20)
_words = ["".join(_R.choice("абвгдежзик") for _ in range(_R.randint(4, 10))) for _ in range(20000)]
_big = Trie()
_t0 = _time.perf_counter()
for _w in _words:
    _big.insert(_w)
_hits = sum(_big.starts_with(_w[:3]) for _w in _words)
_miss = sum(_big.search(_w + "я") for _w in _words)
_dt = _time.perf_counter() - _t0
assert _hits == 20000 and _miss == 0, "Результат неверен в большом trie"
assert _dt < 1.5, "Слишком медленно: храните слова в узлах trie, а не в списке"
` } },
        {
          prompt: `Класс <code>Autocomplete(words)</code>: конструктор кладёт слова в trie. <code>suggest(prefix, limit=3)</code> возвращает первые <code>limit</code> слов с этим префиксом в алфавитном порядке. Повторяющееся слово предлагается только один раз.
<pre><code>ac = Autocomplete(["сүт", "сүзбе", "сүтті шоколад", "сода", "сүт"])
ac.suggest("сү")     → ["сүзбе", "сүт", "сүтті шоколад"]
ac.suggest("с", 2)   → ["сода", "сүзбе"]
ac.suggest("шай")    → []</code></pre>`,
          starter: `class Autocomplete:
    def __init__(self, words):
        self.words = words

    def suggest(self, prefix, limit=3):
        return []
`,
          hints: ['Спуститесь по префиксу до узла; если встретился символ, которого нет, верните <code>[]</code>.', 'DFS: сначала проверьте, заканчивается ли в текущем узле слово, затем обходите детей в порядке <code>sorted</code>; остановитесь, когда набрано <code>limit</code>.'],
          check: { tests: String.raw`
_ac = Autocomplete(["сүт", "сүзбе", "сүтті шоколад", "сода", "сүт"])
assert _ac.suggest("сү") == ["сүзбе", "сүт", "сүтті шоколад"], "сү: три слова по алфавиту"
assert _ac.suggest("с", 2) == ["сода", "сүзбе"], "limit = 2"
assert _ac.suggest("шай") == [], "Нет такого префикса: []"
assert _ac.suggest("сүт") == ["сүт", "сүтті шоколад"], "Если сам префикс — слово, он идёт первым"
assert _ac.suggest("", 10) == ["сода", "сүзбе", "сүт", "сүтті шоколад"], "Пустой префикс: все слова без повторов"
assert Autocomplete([]).suggest("а") == [], "Пустой словарь: []"
import random as _random, time as _time
_R = _random.Random(22)
_ws = ["".join(_R.choice("абвгд") for _ in range(_R.randint(3, 9))) for _ in range(20000)]
_t0 = _time.perf_counter()
_big = Autocomplete(_ws)
_res = [_big.suggest(_w[:4], 3) for _w in _ws[:3000]]
_dt = _time.perf_counter() - _t0
assert _res[0] == sorted(set(w for w in _ws if w.startswith(_ws[0][:4])))[:3], "Подсказка на большом словаре неверна"
assert _dt < 2.0, "Слишком медленно: останавливайте DFS, когда достигнут limit"
` } },
        {
          prompt: `Класс <code>PrefixCounter</code>: <code>add(word)</code> добавляет слово (даже повторное: каждое добавление считается), <code>count(prefix)</code> возвращает количество добавленных слов с этим префиксом за O(len(prefix)). В каждом узле trie храните счётчик. Тест выполняет 20 000 запросов, поэтому перебор списка не пройдёт.
<pre><code>pc = PrefixCounter()
for w in ["алма", "алмұрт", "анар", "алма"]: pc.add(w)
pc.count("ал")  → 3
pc.count("")    → 4</code></pre>`,
          starter: `class PrefixCounter:
    def __init__(self):
        self.words = []

    def add(self, word):
        self.words.append(word)

    def count(self, prefix):
        return 0
`,
          hints: ['Каждый узел: словарь, внутри счётчик (например, ключ <code>"#"</code>) и дети.', 'При <code>add</code> увеличивайте счётчик корня и каждого узла на пути на 1.'],
          check: { tests: String.raw`
_pc = PrefixCounter()
for _w in ["алма", "алмұрт", "анар", "алма"]:
    _pc.add(_w)
assert _pc.count("ал") == 3, "ал: алма, алмұрт, алма = 3"
assert _pc.count("алма") == 2, "алма добавлено дважды"
assert _pc.count("") == 4, "Пустой префикс: все слова"
assert _pc.count("б") == 0 and _pc.count("алмаз") == 0, "Нет такого префикса: 0"
assert PrefixCounter().count("а") == 0, "Пустой счётчик: 0"
import random as _random, time as _time
_R = _random.Random(23)
_ws = ["".join(_R.choice("абвгдеж") for _ in range(_R.randint(3, 8))) for _ in range(20000)]
_big = PrefixCounter()
_t0 = _time.perf_counter()
for _w in _ws:
    _big.add(_w)
_c = [_big.count(_w[:2]) for _w in _ws]
_dt = _time.perf_counter() - _t0
assert _c[0] == sum(1 for w in _ws if w.startswith(_ws[0][:2])), "Подсчёт на большом входе неверен"
assert _dt < 1.0, "20 000 запросов слишком медленно: храните счётчик в узле trie"
` } },
        { prompt: 'В trie есть N слов, самое длинное содержит L символов. Сколько времени займёт проверка, есть ли слово с префиксом длины m (<code>starts_with</code>)?', options: ['O(N)', 'O(m)', 'O(N · m)', 'O(log N)'], explain: 'От корня спускаемся по одному узлу на каждый символ префикса: m шагов. Количество слов на это не влияет.' }
      ]
    },
    'alg-gate': {
      title: 'Модуль экзамена: Advanced Algorithms',
      body: `
<p>Экзамен охватывает весь модуль: sliding window, union-find и MST, Dijkstra, KMP и выбор алгоритма. Чтобы сдать, нужно набрать не менее <b>75%</b> баллов.</p>
<ul>
<li>Названия функций и тип возвращаемого значения должны быть именно такими, как заданы.</li>
<li>В каждом задании тесты проверяют и граничные случаи (пустой вход, недостижимая вершина, один элемент), и скорость.</li>
<li>Сначала подумайте о brute force, а потом выберите структуру, которая его ускорит. Подсказок не даётся.</li>
</ul>`,
      ex: [
        {
          prompt: `В области <code>n</code> аулов (<code>0..n-1</code>). Некоторые дороги уже есть (<code>existing</code>, пары <code>(u, v)</code>, бесплатно). <code>options</code>: дороги, которые можно построить, <code>(u, v, цена)</code>. <code>min_extra_cost(n, existing, options)</code>: верните наименьшую дополнительную стоимость, чтобы соединить все аулы в одну сеть; если это невозможно, <code>None</code>.
<pre><code>min_extra_cost(4, [(0, 1)], [(1, 2, 5), (2, 3, 1), (0, 3, 2), (0, 2, 9)]) → 3
min_extra_cost(3, [(0, 1), (1, 2)], [])                                   → 0
min_extra_cost(3, [], [(0, 1, 4)])                                        → None</code></pre>`,
          starter: `def min_extra_cost(n, existing, options):
    return 0
`,
          hints: [],
          check: { tests: String.raw`
assert min_extra_cost(4, [(0, 1)], [(1, 2, 5), (2, 3, 1), (0, 3, 2), (0, 2, 9)]) == 3, "2-3 (1) и 0-3 (2): 3"
assert min_extra_cost(3, [(0, 1), (1, 2)], []) == 0, "Всё уже соединено: 0"
assert min_extra_cost(3, [], [(0, 1, 4)]) is None, "Ауыл 2 нельзя присоединить: None"
assert min_extra_cost(1, [], []) == 0, "Один аул: 0"
assert min_extra_cost(3, [(0, 1)], [(0, 1, 1), (1, 2, 6)]) == 6, "Уже существующую дорогу не нужно строить заново"
import random as _random, time as _time
_R = _random.Random(30)
_n = 5000
_ex = [(_R.randrange(_n), _R.randrange(_n)) for _ in range(3000)]
_op = [(_i, _i + 1, 100) for _i in range(_n - 1)] + [(_R.randrange(_n), _R.randrange(_n), _R.randint(1, 99)) for _ in range(30000)]
_t0 = _time.perf_counter(); _r = min_extra_cost(_n, _ex, _op); _dt = _time.perf_counter() - _t0
assert _r is not None and _r < 100 * (_n - 1), "На большом входе результат неверен"
assert _dt < 1.5, "Слишком медленно: DSU + Kruskal"
` } },
        {
          prompt: `Студент каждый день обедает в кафе, <code>prices</code> — дневные расходы (положительные числа). <code>longest_within_budget(prices, budget)</code>: верните длину самого длинного отрезка подряд идущих дней, сумма расходов на котором не превышает <code>budget</code>. O(n).
<pre><code>longest_within_budget([1200, 900, 1500, 800, 700, 2500], 3000) → 3
longest_within_budget([5000], 3000)                            → 0</code></pre>`,
          starter: `def longest_within_budget(prices, budget):
    return len(prices)
`,
          hints: [],
          check: { tests: String.raw`
assert longest_within_budget([1200, 900, 1500, 800, 700, 2500], 3000) == 3, "1500 + 800 + 700 = 3000: 3 дня"
assert longest_within_budget([5000], 3000) == 0, "Даже один день не помещается: 0"
assert longest_within_budget([], 100) == 0, "Пустой список: 0"
assert longest_within_budget([1, 1, 1], 3) == 3, "Весь список помещается"
assert longest_within_budget([4, 1, 1, 4, 1, 1, 1], 3) == 3, "Последние три дня: 3"
import random as _random, time as _time
_R = _random.Random(31)
for _ in range(80):
    _p = [_R.randint(1, 9) for _ in range(_R.randint(0, 10))]
    _b = _R.randint(0, 20)
    _ref = max([j - i for i in range(len(_p) + 1) for j in range(i, len(_p) + 1) if sum(_p[i:j]) <= _b] + [0])
    assert longest_within_budget(_p, _b) == _ref, "Не совпало с brute force: " + str((_p, _b))
_big = [_R.randint(500, 3000) for _ in range(100000)]
_t0 = _time.perf_counter(); longest_within_budget(_big, 200000); _dt = _time.perf_counter() - _t0
assert _dt < 1.0, "Слишком медленно: sliding window за O(n)"
` } },
        {
          prompt: `Курьерская служба: <code>graph</code> — ориентированный взвешенный граф (вершина → <code>[(сосед, минуты), ...]</code>). <code>delivery_total(graph, src, targets)</code>: сумма кратчайших времён от <code>src</code> до каждой цели (к каждой цели едем отдельно). Если хотя бы одна цель недостижима, верните <code>None</code>. Если список целей пуст, верните 0.
<pre><code>g = {"Қойма": [("Абай", 10), ("Сатпаев", 25)], "Абай": [("Сатпаев", 5), ("Төле би", 20)]}
delivery_total(g, "Қойма", ["Сатпаев", "Төле би"]) → 45    # 15 + 30</code></pre>`,
          starter: `import heapq

def delivery_total(graph, src, targets):
    return 0
`,
          hints: [],
          check: { tests: String.raw`
_g = {"Қойма": [("Абай", 10), ("Сатпаев", 25)], "Абай": [("Сатпаев", 5), ("Төле би", 20)]}
assert delivery_total(_g, "Қойма", ["Сатпаев", "Төле би"]) == 45, "15 + 30 = 45"
assert delivery_total(_g, "Қойма", []) == 0, "Цели нет: 0"
assert delivery_total(_g, "Қойма", ["Қойма"]) == 0, "До самой Қойма: 0"
assert delivery_total(_g, "Абай", ["Қойма"]) is None, "Обратного пути нет: None"
assert delivery_total(_g, "Қойма", ["Сатпаев", "Сатпаев"]) == 30, "Одна цель дважды: 15 + 15"
import random as _random, time as _time
_R = _random.Random(32)
_n = 8000
_G = {_i: [(_i + 1, _R.randint(1, 9)), (_R.randrange(_n), _R.randint(5, 50))] for _i in range(_n - 1)}
_t0 = _time.perf_counter(); _r = delivery_total(_G, 0, list(range(0, _n, 50))); _dt = _time.perf_counter() - _t0
assert _r is not None and _r > 0, "На большом графе результат неверен"
assert _dt < 1.5, "Слишком медленно: запустите Dijkstra один раз и используйте его для всех целей"
` } },
        {
          prompt: `<code>count_pattern(text, pattern)</code>: посчитайте, сколько раз <code>pattern</code> встречается в тексте (включая перекрывающиеся вхождения). Если образец пустой, верните 0. Решение через KMP за O(n + m). Замечание: <code>str.count</code> не считает перекрывающиеся вхождения.
<pre><code>count_pattern("ananananas", "anan") → 3
count_pattern("aaaa", "aa")         → 3
count_pattern("abc", "")            → 0</code></pre>`,
          starter: `def count_pattern(text, pattern):
    return text.count(pattern) if pattern else 0
`,
          hints: [],
          check: { tests: String.raw`
assert count_pattern("ананананас", "анан") == 3, "В слове ананананас «анан» встречается 3 раза (с перекрытием)"
assert count_pattern("aaaa", "aa") == 3, "aa в aaaa: 3"
assert count_pattern("abc", "") == 0, "Пустой образец: 0"
assert count_pattern("", "a") == 0, "Пустой текст: 0"
assert count_pattern("abcabc", "abc") == 2, "Без перекрытия: 2"
assert count_pattern("ab", "abc") == 0, "Образец длиннее: 0"
import time as _time
_t0 = _time.perf_counter(); _r = count_pattern("ab" * 50000, "abab"); _r2 = count_pattern("a" * 100000, "a" * 400 + "b"); _dt = _time.perf_counter() - _t0
assert _r == 49999 and _r2 == 0, "Подсчёт на длинном тексте неверен"
assert _dt < 1.5, "Слишком медленно: KMP за O(n + m)"
` } },
        { prompt: 'В приложении такси карта города: 50 000 перекрёстков, 120 000 улиц, время проезда каждой улицы (положительное число) известно. Нужно найти самый быстрый маршрут для пассажира. Какой алгоритм верен и достаточно быстр?', options: ['BFS', 'Dijkstra + heap', 'Bellman-Ford', 'Kruskal'], explain: 'Веса различны и неотрицательны: Dijkstra, O((V + E) log V). BFS не учитывает веса, Bellman-Ford за O(V·E) ≈ 6·10⁹ слишком медленный, Kruskal находит MST, а не кратчайший путь.' }
      ]
    }
  }
});
